import { choice, char, digits, regex, anyOfString } from "arcsecond";
import { joinedSequence, makeBasicType, orEmptyString } from "./util";

const numberType = makeBasicType("number");

export const numberParser = joinedSequence([
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
]).map((x) => numberType(Number(x)));
