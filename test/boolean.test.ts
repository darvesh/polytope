import { booleanParser } from "../src/boolean";
import { describe, it, expect } from "bun:test";

describe("Boolean Parser", () => {
	it("parses TRUE", () => {
		expect(booleanParser.run("TRUE")).toMatchObject({
			result: {
				type: "boolean",
				value: true,
			},
			isError: false,
			index: 4,
		});
	});

	it("parses FALSE", () => {
		expect(booleanParser.run("FALSE")).toMatchObject({
			result: {
				type: "boolean",
				value: false,
			},
			isError: false,
			index: 5,
		});
	});
});
