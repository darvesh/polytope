import {
	between,
	many,
	possibly,
	sequenceOf,
	whitespace,
	type Parser,
} from "arcsecond";

export const orEmptyString = (parser: Parser<string, string, string>) =>
	possibly(parser).map((x: any) => (x ? x : ""));

export const joinedSequence = (parsers: Parser<string, string, string>[]) =>
	sequenceOf(parsers).map((x) => x.join(""));
export function isStringType(value: any): value is string {
	return typeof value === "string";
}
export function isNumberType(value: any): value is number {
	return typeof value === "number" && !Number.isNaN(value);
}
export const whitespaceSurrounded = between(possibly(many(whitespace)))(
	possibly(whitespace)
);
