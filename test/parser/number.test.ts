import { describe, it, expect } from "bun:test";

import { numberParser } from "../../src/parser/number";

describe("Number Parser", () => {
	it("should parse positive integer", () => {
		const res = numberParser.run("1234");
		expect(res).toMatchObject({
			isError: false,
			result: { type: "number", value: 1234 },
		});
	});
	it("should parse negative integer", () => {
		const res = numberParser.run("-1234");
		expect(res).toMatchObject({
			isError: false,
			result: { type: "number", value: -1234 },
		});
	});
	it("should parse positive float", () => {
		const res = numberParser.run("1234.5678");
		expect(res).toMatchObject({
			isError: false,
			result: { type: "number", value: 1234.5678 },
		});
	});
	it("should parse negative float", () => {
		const res = numberParser.run("-1234.5678");
		expect(res).toMatchObject({
			isError: false,
			result: { type: "number", value: -1234.5678 },
		});
	});
	it("should not parse", () => {
		const res3 = numberParser.run("-s1");
		expect(res3).toMatchObject({ isError: true });
		const res4 = numberParser.run("w1.1");
		expect(res4).toMatchObject({ isError: true });
	});
});
