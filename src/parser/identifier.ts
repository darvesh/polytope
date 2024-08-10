import { regex, type Parser } from "arcsecond";
import { isStringType } from "./util";

export type IdentifierType = {
	type: "identifier";
	value: string;
	toString: () => string;
};

export const identifierParser: Parser<IdentifierType> = regex(
	/^[a-zA-Z_][a-zA-Z0-9_]*/
).map((value) => {
	if (!isStringType(value)) {
		throw new Error(`Expected a string as identifier, but got ${value}`);
	}
	return {
		type: "identifier",
		value: value,
		toString: () => `identifier(${value})`,
	};
});
