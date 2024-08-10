import { booleanParser } from "../src/boolean";
import { describe, it, expect } from "bun:test";

describe("booleanParser", () => {
	it("parses TRUE", () => {
		expect(booleanParser.run("TRUE")).toMatchObject({
			result: {
				type: "boolean",
				value: "TRUE",
			},
			isError: false,
			index: 4,
		});
	});

	it("parses FALSE", () => {
		expect(booleanParser.run("FALSE")).toMatchObject({
			result: {
				type: "boolean",
				value: "FALSE",
			},
			isError: false,
			index: 5,
		});
	});
});
