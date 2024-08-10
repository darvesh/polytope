import { joinedSequence, makeBasicType } from "./util";

import {
	anythingExcept,
	between,
	char,
	choice,
	many,
	type Parser,
} from "arcsecond";

const stringType = makeBasicType("string");

const joinedMany = (parser: Parser<string | number, string, any>) =>
	many(parser).map((x) =>
		x.map((c) => (typeof c === "number" ? String.fromCharCode(c) : c)).join("")
	);

const betweenQuotes = between(char('"'))(char('"'));

export const stringParser = betweenQuotes(
	joinedMany(
		choice([
			joinedSequence([char("\\"), char('"')]).map(() => '"'),
			anythingExcept(char('"')),
		])
	)
).map(stringType);
