import { describe, test, expect, vi } from "vitest"
import { act, renderHook, waitFor } from "@testing-library/react"
import { useCustomHook } from "../app/CustomHook";

/**
 * ============================================================================
 * UNDERSTANDING act() IN REACT TESTING
 * ============================================================================
 * 
 * What is act()?
 * --------------
 * act() is a testing utility that ensures all updates related to a "unit" of 
 * interaction have been processed and applied to the DOM before you make assertions.
 * 
 * Why do we need act()?
 * ---------------------
 * React batches state updates and schedules re-renders asynchronously for performance.
 * Without act(), your test assertions might run BEFORE React has finished updating,
 * leading to flaky tests or false negatives.
 * 
 * When to use act()?
 * ------------------
 * - When calling functions that trigger state updates (setState, dispatch, etc.)
 * - When simulating user interactions (click, type, etc.)
 * - When advancing timers (jest.advanceTimersByTime, vi.advanceTimersByTime)
 * - When resolving promises that trigger state updates
 */

describe("Custom Hook Tests - Understanding act()", () => {

    describe("Basic State Management", () => {
        test("default state should be empty array", () => {
            const { result } = renderHook(useCustomHook);

            expect(result.current.names).toEqual([]);
            expect(result.current.isLoading).toBe(false);
            expect(result.current.error).toBe(null);
        });

        test("addName should add a single name", () => {
            const { result } = renderHook(useCustomHook);

            // act() simulates a complete render cycle
            // The state only reflects changes AFTER the act block completes
            act(() => {
                result.current.addName("John");
            });

            expect(result.current.names).toEqual(["John"]);
        });

        test("addName should validate empty names", () => {
            const { result } = renderHook(useCustomHook);

            act(() => {
                result.current.addName("");
            });

            expect(result.current.names).toEqual([]);
            expect(result.current.error).toBe("Name cannot be empty");
        });

        test("removeName should remove existing name", () => {
            const { result } = renderHook(useCustomHook);

            act(() => {
                result.current.addName("John");
                result.current.addName("Jane");
            });

            act(() => {
                result.current.removeName("John");
            });

            expect(result.current.names).toEqual(["Jane"]);
        });

        test("clearNames should remove all names", () => {
            const { result } = renderHook(useCustomHook);

            act(() => {
                result.current.addName("John");
                result.current.addName("Jane");
            });

            act(() => {
                result.current.clearNames();
            });

            expect(result.current.names).toEqual([]);
        });
    });

    describe("Stale Closure Problem - Why Separate act() Blocks Matter", () => {

        /**
         * THE STALE CLOSURE PROBLEM
         * -------------------------
         * When you define a function inside a React component/hook, it "closes over"
         * the current state values. If you call multiple functions within the SAME
         * render cycle, they all see the SAME (potentially stale) state.
         * 
         */

        test("stale closure: addName then removeName in same act()", () => {
            const { result } = renderHook(useCustomHook);

            act(() => {
                result.current.addName("John");    // names is [] → setNames(["John"])
                result.current.removeName("John"); // names is STILL [] → setNames([]) (filters empty array)
            });

            // 1. addName runs: [...[], "John"] = ["John"] → queues setNames(["John"])
            // 2. removeName runs: [].filter(n => n !== "John") = [] → queues setNames([])
            // 3. React batches these updates, and the LAST setNames([]) wins
            expect(result.current.names).toEqual([]);
        });

        test("use separate act() blocks for dependent operations", () => {
            const { result } = renderHook(useCustomHook);

            act(() => {
                result.current.addName("John");
            });

            act(() => {
                result.current.removeName("John");
            });

            expect(result.current.names).toEqual([]);
        });
    });

    describe("Async Operations - act() with Promises and Timers", () => {
        test("async operation with await act()", async () => {
            const { result } = renderHook(useCustomHook);

            await act(async () => {
                await result.current.addNameAsync("AsyncJohn", 50);
            });

            expect(result.current.names).toEqual(["AsyncJohn"]);
            expect(result.current.isLoading).toBe(false);
        });

        test("isLoading state during async operation", async () => {
            const { result } = renderHook(useCustomHook);

            let promise: Promise<void>;
            act(() => {
                promise = result.current.addNameAsync("AsyncJohn", 100);
            });

            expect(result.current.isLoading).toBe(true);

            await act(async () => {
                await promise!;
            });

            expect(result.current.isLoading).toBe(false);
            expect(result.current.names).toEqual(["AsyncJohn"]);
        });

        test("using fake timers with act()", async () => {
            vi.useFakeTimers();

            const { result } = renderHook(useCustomHook);

            act(() => {
                result.current.addNameAsync("TimerJohn", 1000);
            });

            expect(result.current.isLoading).toBe(true);
            expect(result.current.names).toEqual([]);

            await act(async () => {
                vi.advanceTimersByTime(1000);
            });

            expect(result.current.isLoading).toBe(false);
            expect(result.current.names).toEqual(["TimerJohn"]);

            vi.useRealTimers();
        });

        test("multiple async operations", async () => {
            const { result } = renderHook(useCustomHook);

            await act(async () => {
                await Promise.all([
                    result.current.addNameAsync("Async1", 50),
                    result.current.addNameAsync("Async2", 30),
                    result.current.addNameAsync("Async3", 10),
                ]);
            });

            expect(result.current.names).toContain("Async1");
            expect(result.current.names).toContain("Async2");
            expect(result.current.names).toContain("Async3");
            expect(result.current.names).toHaveLength(3);
        });
    });

    describe("Using waitFor for Async Assertions", () => {

        /**
         * waitFor vs act()
         * ----------------
         * - act(): Wraps code that causes state updates
         * - waitFor(): Waits for a condition to become true (polling)
         * 
         * Use waitFor when you need to wait for async side effects
         * that you don't have direct control over.
         */
        test("waitFor polls until condition is met", async () => {
            const { result } = renderHook(useCustomHook);

            act(() => {
                result.current.addNameAsync("WaitForJohn", 100);
            });

            await waitFor(() => {
                expect(result.current.names).toContain("WaitForJohn");
            });

            expect(result.current.isLoading).toBe(false);
        });

        test("waitFor with timeout", async () => {
            const { result } = renderHook(useCustomHook);

            act(() => {
                result.current.addNameAsync("SlowJohn", 50);
            });

            await waitFor(
                () => {
                    expect(result.current.names).toContain("SlowJohn");
                },
                { timeout: 1000 }
            );
        });
    });
});
