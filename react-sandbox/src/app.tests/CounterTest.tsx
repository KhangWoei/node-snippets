import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Counter } from "../app/Counter"

describe("Counter", () => {
    test("onClick increments count", async () => {
        const user = userEvent.setup();

        render(<Counter />);
        const counter = screen.getByTestId("counter");
        const before = parseInt(counter.textContent.split(":")[1]);
        expect(before).toBe(0);

        await user.click(counter);

        const actual = parseInt(counter.textContent.split(":")[1]);
        expect(actual).toBe(1);
    });
});
