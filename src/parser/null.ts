import { str, type Parser } from "arcsecond";

export type NullType = {
	type: "Null";
	value: null;
	toString: () => string;
};

export const nullParser: Parser<NullType> = str("NULL").map((value) => {
	return {
		type: "Null",
		value: null,
		toString: () => "null",
	};
});
