import { describe, test, expect } from "vitest"
import { Connector } from "../app/connector.js"

describe("Connector", () => {

    test("connect shoud return circuit consisting of the top 10 shortest pair of connections", () => {
        const input = [
            "162, 817, 812",
            "57, 618, 57",
            "906, 360, 560",
            "592, 479, 940",
            "352, 342, 300",
            "466, 668, 158",
            "542, 29, 236",
            "431, 825, 988",
            "739, 650, 466",
            "52, 470, 668",
            "216, 146, 977",
            "819, 987, 18",
            "117, 168, 530",
            "805, 96, 715",
            "346, 949, 466",
            "970, 615, 88",
            "941, 993, 340",
            "862, 61, 35",
            "984, 92, 344",
            "425, 690, 689"
        ];
        const connector = new Connector();

        const result = connector.connect(input, 10);

        expect(result.part1).toBe(40);
    });

    test("connect should return the product of the 'x' coordinate last two junction boxes that unifies all the circuits", () => {
        const input = [
            "162, 817, 812",
            "57, 618, 57",
            "906, 360, 560",
            "592, 479, 940",
            "352, 342, 300",
            "466, 668, 158",
            "542, 29, 236",
            "431, 825, 988",
            "739, 650, 466",
            "52, 470, 668",
            "216, 146, 977",
            "819, 987, 18",
            "117, 168, 530",
            "805, 96, 715",
            "346, 949, 466",
            "970, 615, 88",
            "941, 993, 340",
            "862, 61, 35",
            "984, 92, 344",
            "425, 690, 689"
        ];
        const connector = new Connector();

        const result = connector.connect(input, 10);

        expect(result.part2).toBe(25272);
    });
});
