import { between, char, recursiveParser, sepBy, type Parser } from "arcsecond";
import { formulaParser, type FormulaType } from ".";
import { whitespaceSurrounded } from "./util";
export type ArgumentType = {
	type: "arguments";
	value: FormulaType;
	toString: () => string;
};

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
