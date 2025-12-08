import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Label } from "../app/Label";

describe("Label", () => {
    test("renders value prop", () => {
        render(<Label value="Hello" color="blue" />);

        expect(screen.getByText("Hello").textContent).toBe("Hello");
    });

    test("applies color style", () => {
        render(<Label value="Hello" color="blue" />);

        const element = screen.getByText("Hello");
        expect(element.style.color).toBe("blue");
    });
});
