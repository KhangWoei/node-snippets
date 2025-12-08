import { defineConfig } from "vitest/config"

export default defineConfig({
    test: {
        environment: "jsdom",
        include: ['src/**/*tests*/**/*.tsx'],
        setupFiles: ["src/app.tests/cleanup.ts"]
    }
});
