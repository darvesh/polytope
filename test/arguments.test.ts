import { describe, it, expect } from "bun:test";
import { argumentsParser } from "../src/arguments";

describe("Arguments Parser", () => {
	it("should parse arguments with integer", () => {
		expect(argumentsParser.run("(1)")).toMatchObject({
			isError: false,
			result: {
				type: "arguments",
				value: [
					{
						type: "number",
						value: 1,
					},
				],
			},
		});
	});
	it("should parse arguments with float", () => {
		expect(argumentsParser.run("(1.1)")).toMatchObject({
			isError: false,
			result: {
				type: "arguments",
				value: [
					{
						type: "number",
						value: 1.1,
					},
				],
			},
		});
	});
	it("should parse arguments with string", () => {
		expect(argumentsParser.run(`("hello, world")`)).toMatchObject({
			isError: false,
			result: {
				type: "arguments",
				value: [
					{
						type: "string",
						value: "hello, world",
					},
				],
			},
		});
	});
	it("should parse arguments with multiple integer", () => {
		expect(argumentsParser.run(`(1, 2, 3)`)).toMatchObject({
			isError: false,
			result: {
				type: "arguments",
				value: [
					{ type: "number", value: 1 },
					{ type: "number", value: 2 },
					{ type: "number", value: 3 },
				],
			},
		});
	});
	it("should parse arguments with multiple float", () => {
		expect(argumentsParser.run(`(1.1, 2.2, 3.3)`)).toMatchObject({
			isError: false,
			result: {
				type: "arguments",
				value: [
					{ type: "number", value: 1.1 },
					{ type: "number", value: 2.2 },
					{ type: "number", value: 3.3 },
				],
			},
		});
	});
	it("should parse arguments with multiple string", () => {
		expect(argumentsParser.run(`("hello", "world")`)).toMatchObject({
			isError: false,
			result: {
				type: "arguments",
				value: [
					{ type: "string", value: "hello" },
					{ type: "string", value: "world" },
				],
			},
		});
	});
	it("should parse arguments with mixed types", () => {
		expect(argumentsParser.run(`(1, 2.2, "hello")`)).toMatchObject({
			isError: false,
			result: {
				type: "arguments",
				value: [
					{ type: "number", value: 1 },
					{ type: "number", value: 2.2 },
					{ type: "string", value: "hello" },
				],
			},
		});
	});

	it("should parse arguments with mixed types and spaces in between", () => {
		expect(argumentsParser.run(`(    1,    2.2,    "hello"   )`)).toMatchObject(
			{
				isError: false,
				result: {
					type: "arguments",
					value: [
						{ type: "number", value: 1 },
						{ type: "number", value: 2.2 },
						{ type: "string", value: "hello" },
					],
				},
			}
		);
	});

	it("should parse if no arguments", () => {
		expect(argumentsParser.run(`()`)).toMatchObject({
			isError: false,
			result: {
				type: "arguments",
				value: [],
			},
		});
	});
	it("should not parse with no values in between comma", () => {
		expect(argumentsParser.run(`(1,,4.4)`)).toMatchObject({
			isError: true,
		});
	});
});
