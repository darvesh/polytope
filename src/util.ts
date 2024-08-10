import { possibly, sequenceOf, type Parser } from "arcsecond";

export const makeBasicType =
	(typeName: string) =>
	<T>(value: T) => ({
		type: typeName,
		value,
		toString: () => `${typeName}(${value})`,
	});

export const orEmptyString = (parser: Parser<string, string, string>) =>
	possibly(parser).map((x: any) => (x ? x : ""));

export const joinedSequence = (parsers: Parser<string, string, string>[]) =>
	sequenceOf(parsers).map((x) => x.join(""));

export const makeMultiType =
	(typeName: string) =>
	<T>(values: unknown) => ({
		type: typeName,
		value: values,
		toString: () => `${typeName}(${values})`,
	});

export function isStringType(value: any): value is string {
	return typeof value === "string";
}
export function isNumberType(value: any): value is number {
	return typeof value === "number" && !Number.isNaN(value);
}
