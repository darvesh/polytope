import { columnParser } from "../../src/parser/column";
import { describe, it, expect } from "bun:test";

describe("Column Parser", () => {
	it("should parse column name", () => {
		const res = columnParser.run("{rate}");
		expect(res).toMatchObject({
			result: {
				type: "column",
				value: "rate",
			},
			isError: false,
			index: 6,
		});
	});
	it("should not parse column", () => {
		const res = columnParser.run("{2amount}");
		expect(res).toMatchObject({
			isError: true,
		});
	});
});
