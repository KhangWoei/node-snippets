import { describe, expect, test } from "vitest"
import { IngrediantTester } from "./ingrediantTester.js"

describe("ingrediantTester", () => {
    test("i can't think of a test name", async () => {
        const tester = new IngrediantTester();

        const result = await tester.calculateFreshIngrediants(inputGenerator());

        expect(result.part1).toBe(3);
        expect(result.part2).toBe(14);

        async function* inputGenerator(): AsyncGenerator<string> {
            yield "3-5";
            yield "10-14";
            yield "16-20";
            yield "12-18";
            yield "";
            yield "1";
            yield "5";
            yield "8";
            yield "11";
            yield "17";
            yield "32";
        }
    });
})
