import {
	anyChar,
	between,
	char,
	choice,
	many,
	possibly,
	recursiveParser,
	regex,
	sepBy,
	sequenceOf,
	whitespace,
	type Parser,
} from "arcsecond";
import { makeBasicType, makeMultiType } from "./util";
import { nullParser } from "./null";
import { booleanParser } from "./boolean";
import { numberParser } from "./number";
import { stringParser } from "./string";
import { naParser } from "./na";

const argType = makeMultiType("arguments");
const whitespaceSurrounded = between(possibly(many(whitespace)))(
	possibly(whitespace)
);
const betweenBrackets = between(whitespaceSurrounded(char("(")))(
	whitespaceSurrounded(char(")"))
);
const commaSeparated = sepBy(whitespaceSurrounded(char(",")));

const valueParser = choice([
	nullParser,
	naParser,
	booleanParser,
	numberParser,
	stringParser,
	recursiveParser(() => functionCallParser),
]);

const argParser = betweenBrackets(commaSeparated(valueParser)).map(argType);

const identifierType = makeBasicType("identifier");
const identifier = regex(/^[a-zA-Z_][a-zA-Z0-9_]*/).map((x) =>
	identifierType(x)
);

export const functionCallParser = sequenceOf([identifier, argParser]).map(
	([name, args]) => ({
		type: "function_call",
		name: name.value,
		arguments: args,
	})
);

const k = valueParser.run("#N/A");

console.dir(k, { depth: null });
