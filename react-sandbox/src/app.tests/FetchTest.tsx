import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Fetch } from "../app/Fetch";


describe("Fetch", () => {
    const mockFetch = vi.fn();

    beforeEach(() => {
        vi.stubGlobal("fetch", mockFetch);
        vi.resetAllMocks();
    });

    test("display loading", () => {
        mockFetch.mockImplementation(() => new Promise(() => { }));
        render(<Fetch />);

        const actual = screen.getByTestId("loading");
        expect(actual).not.toBeNull();
    });

    test('displays data state after successful fetch', async () => {
        const mockData = [{ id: 1 }, { id: 2 }];

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        render(<Fetch />);

        await waitFor(() => {
            expect(screen.getByTestId('data')).not.toBeNull();
        });
    });

    test('displays data state after successful fetch', async () => {
        const mockData = [{ id: 1, name: "John" }, { id: 2, name: "Jane" }];

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        render(<Fetch />);

        await waitFor(() => {
            expect(screen.getByText(mockData[0].name)).not.toBeNull();
            expect(screen.getByText(mockData[1].name)).not.toBeNull();
        });
    });

    test('displays error state when response is not ok', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 404,
        });

        render(<Fetch />);

        await waitFor(() => {
            expect(screen.getByTestId('error')).not.toBeNull();
        });
    });
});

