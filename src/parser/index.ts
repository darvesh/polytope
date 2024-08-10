import { choice, recursiveParser } from "arcsecond";
import { booleanParser, type BooleanType } from "./boolean";
import { functionCallParser, type FunctionType } from "./function";
import { identifierParser, type IdentifierType } from "./identifier";
import { naParser } from "./na";
import { nullParser, type NullType } from "./null";
import { numberParser, type NumberType } from "./number";
import { stringParser, type StringType } from "./string";

export type FormulaType =
	| NullType
	| BooleanType
	| NumberType
	| StringType
	| FunctionType
	| IdentifierType;

export const formulaParser = choice([
	nullParser,
	naParser,
	booleanParser,
	numberParser,
	stringParser,
	recursiveParser(() => functionCallParser),
	identifierParser,
]);
