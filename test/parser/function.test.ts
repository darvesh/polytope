import { functionCallParser } from "../../src/parser/function";
import { describe, it, expect } from "bun:test";

describe("Function Parser", () => {
	it("parses function with no arguments", () => {
		expect(functionCallParser.run("FOO()")).toMatchObject({
			isError: false,
			result: {
				type: "function",
				name: "FOO",
				value: {
					type: "arguments",
					value: [],
				},
			},
		});
	});
	it("parses function with 1 argument", () => {
		expect(functionCallParser.run("FOO(1)")).toMatchObject({
			isError: false,
			result: {
				type: "function",
				name: "FOO",
				value: {
					type: "arguments",
					value: [
						{
							type: "number",
							value: 1,
						},
					],
				},
			},
		});
	});
	it("parses function with 2 arguments", () => {
		expect(functionCallParser.run("FOO(1, 2)")).toMatchObject({
			isError: false,
			result: {
				type: "function",
				name: "FOO",
				value: {
					type: "arguments",
					value: [
						{
							type: "number",
							value: 1,
						},
						{
							type: "number",
							value: 2,
						},
					],
				},
			},
		});
	});
	it("parses function with different mixed type arguments", () => {
		expect(
			functionCallParser.run(`FOO(1, "hello", TRUE, {date})`)
		).toMatchObject({
			isError: false,
			result: {
				type: "function",
				name: "FOO",
				value: {
					type: "arguments",
					value: [
						{
							type: "number",
							value: 1,
						},
						{
							type: "string",
							value: "hello",
						},
						{
							type: "boolean",
							value: true,
						},
						{
							type: "column",
							value: "date",
						},
					],
				},
			},
		});
	});
	it("parses function with identifier as argument", () => {
		expect(functionCallParser.run(`FOO(HUNDRED)`)).toMatchObject({
			isError: false,
			result: {
				type: "function",
				name: "FOO",
				value: {
					type: "arguments",
					value: [
						{
							type: "identifier",
							value: "HUNDRED",
						},
					],
				},
			},
		});
	});
	it("parses function with another function as argument", () => {
		expect(functionCallParser.run(`FOO(BAR(1))`)).toMatchObject({
			isError: false,
			result: {
				type: "function",
				name: "FOO",
				value: {
					type: "arguments",
					value: [
						{
							type: "function",
							name: "BAR",
							value: {
								type: "arguments",
								value: [
									{
										type: "number",
										value: 1,
									},
								],
							},
						},
					],
				},
			},
		});
	});
	it("parses function with another function and column as arguments", () => {
		expect(functionCallParser.run(`FOO(BAR(1), {date})`)).toMatchObject({
			isError: false,
			result: {
				type: "function",
				name: "FOO",
				value: {
					type: "arguments",
					value: [
						{
							type: "function",
							name: "BAR",
							value: {
								type: "arguments",
								value: [
									{
										type: "number",
										value: 1,
									},
								],
							},
						},
						{
							type: "column",
							value: "date",
						},
					],
				},
			},
		});
	});
});
