import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "../app/Debounce";

describe("useDebounce", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
    });

    test("returns initial value immediately", () => {
        const { result } = renderHook(() => useDebounce("initial", 500));

        expect(result.current).toBe("initial");
    });

    test("delays updating value", () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: "initial", delay: 500 } }
        );

        expect(result.current).toBe("initial");

        // Pass new props to rerender
        rerender({ value: "updated", delay: 500 });
        expect(result.current).toBe("initial");

        act(() => { vi.advanceTimersByTime(499) });
        expect(result.current).toBe("initial");

        act(() => { vi.advanceTimersByTime(1) });
        expect(result.current).toBe("updated");
    });

    test("cancels previous timeout when value changes", () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: "first", delay: 500 } }
        );

        rerender({ value: "second", delay: 500 });
        act(() => vi.advanceTimersByTime(200));
        rerender({ value: "third", delay: 500 });
        act(() => vi.advanceTimersByTime(200));
        rerender({ value: "fourth", delay: 500 });
        expect(result.current).toBe("first");
        act(() => vi.advanceTimersByTime(500));
        expect(result.current).toBe("fourth");
    });
});
