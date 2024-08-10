import { recursiveParser, sequenceOf, type Parser } from "arcsecond";
import { argumentsParser, type ArgumentType } from "./arguments";
import { identifierParser } from "./identifier";

export type FunctionType = {
	type: "function";
	name: string;
	value: ArgumentType;
	toString: () => string;
};

export const functionCallParser: Parser<FunctionType> = sequenceOf([
	identifierParser,
	recursiveParser(() => argumentsParser),
]).map(([name, args]) => ({
	type: "function",
	name: name.value,
	value: args,
}));
