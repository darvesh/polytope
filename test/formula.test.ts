import { describe, it, expect } from "bun:test";
import { formulaParser } from "../src";

describe("Formula Parser", () => {
	it("should parse integer", () => {
		expect(formulaParser.run("123")).toMatchObject({
			result: {
				type: "number",
				value: 123,
			},
			isError: false,
			index: 3,
		});
	});
	it("should parse float", () => {
		expect(formulaParser.run("123.456")).toMatchObject({
			result: {
				type: "number",
				value: 123.456,
			},
			isError: false,
			index: 7,
		});
	});
	it("should parse string", () => {
		expect(formulaParser.run(`"hello"`)).toMatchObject({
			result: {
				type: "string",
				value: "hello",
			},
			isError: false,
			index: 7,
		});
	});
	it("should parse boolean:TRUE", () => {
		expect(formulaParser.run("TRUE")).toMatchObject({
			result: {
				type: "boolean",
				value: true,
			},
			isError: false,
			index: 4,
		});
	});
	it("should parse boolean:FALSE", () => {
		expect(formulaParser.run("FALSE")).toMatchObject({
			result: {
				type: "boolean",
				value: false,
			},
			isError: false,
			index: 5,
		});
	});
	it("should parse NULL", () => {
		expect(formulaParser.run("NULL")).toMatchObject({
			result: {
				type: "Null",
				value: null,
			},
			isError: false,
			index: 4,
		});
	});
	it("should parse #N/A", () => {
		expect(formulaParser.run("#N/A")).toMatchObject({
			result: {
				type: "#N/A",
				value: undefined,
			},
			isError: false,
			index: 4,
		});
	});
	it("should parse identifier", () => {
		expect(formulaParser.run("FOO")).toMatchObject({
			result: {
				type: "identifier",
				value: "FOO",
			},
			isError: false,
			index: 3,
		});
	});
});
