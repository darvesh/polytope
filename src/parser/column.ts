import { between, char, type Parser } from "arcsecond";
import { identifierParser } from "./identifier";
import { isStringType, whitespaceSurrounded } from "./util";

export type ColumnType = {
	type: "column";
	value: string;
	toString: () => string;
};
const betweenCurlyBraces = between(whitespaceSurrounded(char("{")))(
	whitespaceSurrounded(char("}"))
);

export const columnParser: Parser<ColumnType> = betweenCurlyBraces(
	whitespaceSurrounded(identifierParser.map((value) => value.value))
).map((value) => {
	console.log("columnParser", value);
	if (!isStringType(value)) {
		throw new Error(`Expected string as column name, but got ${value}`);
	}
	return {
		type: "column",
		value: value,
		toString: () => `column(${value})`,
	};
});
