import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from '../app/Context';

function TestComponent() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div>
            <span data-testid="theme">{theme}</span>
            <button data-testid="toggler" onClick={toggleTheme}>Toggle</button>
        </div>
    );
}

describe("Context", () => {

    test("default theme is light", () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        const theme = screen.getByTestId("theme");
        expect(theme.textContent).toBe("light");
    });

    test("toggles theme", async () => {
        const user = userEvent.setup();

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        const theme = screen.getByTestId("theme");
        expect(theme.textContent).toBe("light");

        const button = screen.getByTestId("toggler");
        await user.click(button);
        expect(theme.textContent).toBe("dark");
    });
});
