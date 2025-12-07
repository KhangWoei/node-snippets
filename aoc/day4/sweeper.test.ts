import { describe, test, expect } from 'vitest'
import { Sweeper } from './sweeper.js';

describe('Sweeper', () => {
    test.each([
        {
            input: [
                ".",
            ],
            expected: 0
        },
        {
            input: [
                "@"
            ],
            expected: 1
        },
        {
            input: [
                "@@"
            ],
            expected: 2
        },
        {
            input: [
                "@@@"
            ],
            expected: 3
        },
        {
            input: [
                "@",
                "@",
            ],
            expected: 2
        },
        {
            input: [
                "@@",
                "@@"
            ],
            expected: 4
        },
        {
            input: [
                "@@@",
                "@@@"
            ],
            expected: 4
        },
        {
            input: [
                "@",
                "@",
                "@"
            ],
            expected: 3
        },
        {
            input: [
                "@@",
                "@@",
                "@@"
            ],
            expected: 4
        },
        {
            input: [
                "@@@",
                "@@@",
                "@@@"
            ],
            expected: 4
        },
    ])("sweep, return number of rolls with less than 4 rolls: $input, $expected", ({ input, expected }) => {
        const sweeper = new Sweeper();

        const actual = sweeper.sweep(input);

        expect(actual.part1).toBe(expected);
    });

    test.each([
        {
            input: [
                ".",
            ],
            expected: 0
        },
        {
            input: [
                "@"
            ],
            expected: 1
        },
        {
            input: [
                "@@"
            ],
            expected: 2
        },
        {
            input: [
                "@@@"
            ],
            expected: 3
        },
        {
            input: [
                "@",
                "@",
            ],
            expected: 2
        },
        {
            input: [
                "@@",
                "@@"
            ],
            expected: 4
        },
        {
            input: [
                "@@@",
                "@@@"
            ],
            expected: 6
        },
        {
            input: [
                "@",
                "@",
                "@"
            ],
            expected: 3
        },
        {
            input: [
                "@@",
                "@@",
                "@@"
            ],
            expected: 6
        },
        {
            input: [
                "@@@",
                "@@@",
                "@@@"
            ],
            expected: 9
        },

        {
            input: [
                "..@@.@@@@.",
                "@@@.@.@.@@",
                "@@@@@.@.@@",
                "@.@@@@..@.",
                "@@.@@@@.@@",
                ".@@@@@@@.@",
                ".@.@.@.@@@",
                "@.@@@.@@@@",
                ".@@@@@@@@.",
                "@.@.@@@.@."
            ],
            expected: 43
        },
    ])("sweep, return number of rolls with less than 4 rolls, removing accessible ones and recalculating each time: $input, $expected", ({ input, expected }) => {
        const sweeper = new Sweeper();

        const actual = sweeper.sweep(input);

        expect(actual.part2).toBe(expected);
    });

});
