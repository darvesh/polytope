import { choice, str, type Parser } from "arcsecond";

export type BooleanType = {
	type: "boolean";
	value: boolean;
	toString: () => string;
};
export const booleanParser: Parser<BooleanType> = choice([
	str("TRUE"),
	str("FALSE"),
]).map((value) => {
	if (value === "TRUE") {
		return {
			type: "boolean",
			value: true,
			toString: () => `boolean(${value})`,
		};
	} else if (value === "FALSE") {
		return {
			type: "boolean",
			value: false,
			toString: () => `boolean(${value})`,
		};
	}
	throw new Error(`Expected TRUE/FALSE, but got ${value}`);
});
