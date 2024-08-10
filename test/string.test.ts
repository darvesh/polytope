import { describe, it, expect } from "bun:test";
import { stringParser } from "../src/string";

describe("string", () => {
	it("should parse string", () => {
		const res = stringParser.run(`"hello, world"`);
		expect(res).toMatchObject({
			isError: false,
			result: { type: "string", value: "hello, world" },
		});
	});
	it("should parse string with escape", () => {
		const res = stringParser.run(`"hello, \\"world\\""`);
		expect(res).toMatchObject({
			isError: false,
			result: { type: "string", value: 'hello, "world"' },
		});
	});
	it("should parse string with escape", () => {
		const res = stringParser.run(`"hello, \\"world\\" \\"again\\""`);
		expect(res).toMatchObject({
			isError: false,
			result: { type: "string", value: 'hello, "world" "again"' },
		});
	});
	it("should not parse", () => {
		const res1 = stringParser.run(`"hello, world`);
		expect(res1).toMatchObject({ isError: true });
		const res2 = stringParser.run(`hello, "world"`);
		expect(res2).toMatchObject({ isError: true });
	});
});
