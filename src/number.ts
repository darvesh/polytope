import {
	anyOfString,
	char,
	choice,
	digits,
	regex,
	type Parser,
} from "arcsecond";
import { isNumberType, joinedSequence, orEmptyString } from "./util";

export type NumberType = {
	type: "number";
	value: number;
	toString: () => string;
};

export const numberParser: Parser<NumberType> = joinedSequence([
	orEmptyString(char("-")),
	choice([char("0"), regex(/^[1-9][0-9]*/)]),
	orEmptyString(joinedSequence([char("."), digits])),
	orEmptyString(
		joinedSequence([
			anyOfString("eE"),
			orEmptyString(anyOfString("-+")),
			digits,
		])
	),
]).map((value) => {
	const num = Number(value);
	if (!isNumberType(num)) {
		throw new Error(`Expected a number, but got ${value}`);
	}
	return {
		type: "number",
		value: num,
		toString: () => `number(${num})`,
	};
});
