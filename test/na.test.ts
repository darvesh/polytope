import { naParser } from "../src/na";
import { describe, it, expect } from "bun:test";

describe.only("NAParser", () => {
	it("parses #N/A", () => {
		expect(naParser.run("#N/A")).toMatchObject({
			result: {
				type: "#N/A",
				value: undefined,
			},
			isError: false,
			index: 4,
		});
	});
});
