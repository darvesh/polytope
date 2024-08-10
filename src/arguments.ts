import {
	between,
	char,
	many,
	possibly,
	recursiveParser,
	sepBy,
	whitespace,
	type Parser,
} from "arcsecond";
import { formulaParser, type FormulaType } from ".";
export type ArgumentType = {
	type: "arguments";
	value: FormulaType;
	toString: () => string;
};

const whitespaceSurrounded = between(possibly(many(whitespace)))(
	possibly(whitespace)
);
const betweenBrackets = between(whitespaceSurrounded(char("(")))(
	whitespaceSurrounded(char(")"))
);
const commaSeparated = sepBy(whitespaceSurrounded(char(",")));

export const argumentsParser: Parser<ArgumentType> = betweenBrackets(
	commaSeparated(recursiveParser(() => formulaParser))
).map((value) => {
	return {
		type: "arguments",
		value: value as FormulaType,
		toString: () => `arguments(${value})`,
	};
});
