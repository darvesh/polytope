import { describe, it, expect } from "bun:test";
import { identifierParser } from "../../src/parser/identifier";

describe("Identifier Parser", () => {
	it("should parse identifier with only letters", () => {
		expect(identifierParser.run("abc")).toMatchObject({
			result: {
				type: "identifier",
				value: "abc",
			},
			isError: false,
			index: 3,
		});
	});
	it("should parse identifier with only letters and digits", () => {
		expect(identifierParser.run("abc123")).toMatchObject({
			result: {
				type: "identifier",
				value: "abc123",
			},
			isError: false,
			index: 6,
		});
	});
	it("should parse identifier with only letters, digits and _", () => {
		expect(identifierParser.run("abc123_")).toMatchObject({
			result: {
				type: "identifier",
				value: "abc123_",
			},
			isError: false,
			index: 7,
		});
	});
	it("should parse identifier starts with _", () => {
		expect(identifierParser.run("_abc123")).toMatchObject({
			result: {
				type: "identifier",
				value: "_abc123",
			},
			isError: false,
			index: 7,
		});
	});
	it("should not parse identifier starts digits", () => {
		expect(identifierParser.run("1abc")).toMatchObject({
			isError: true,
			index: 0,
		});
	});
});
