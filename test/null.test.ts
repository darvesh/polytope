import { nullParser } from "../src/null";
import { describe, it, expect } from "bun:test";

describe("Null Parser", () => {
	it("parses NULL", () => {
		expect(nullParser.run("NULL")).toMatchObject({
			result: {
				type: "Null",
				value: null,
			},
			isError: false,
			index: 4,
		});
	});
});
