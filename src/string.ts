import { isStringType, joinedSequence, makeBasicType } from "./util";

import {
	anythingExcept,
	between,
	char,
	choice,
	many,
	type Parser,
} from "arcsecond";

export type StringType = {
	type: "string";
	value: string;
	toString: () => string;
};

const joinedMany = (parser: Parser<string | number, string, any>) =>
	many(parser).map((x) =>
		x.map((c) => (typeof c === "number" ? String.fromCharCode(c) : c)).join("")
	);

const betweenQuotes = between(char('"'))(char('"'));

export const stringParser: Parser<StringType> = betweenQuotes(
	joinedMany(
		choice([
			joinedSequence([char("\\"), char('"')]).map(() => '"'),
			anythingExcept(char('"')),
		])
	)
).map((value) => {
	if (!isStringType(value)) {
		throw new Error(`Expected a string, but got ${value}`);
	}
	return {
		type: "string",
		value,
		toString: () => `string(${value})`,
	};
});
