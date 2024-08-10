import { str, type Parser } from "arcsecond";

export type NAType = {
	type: "#N/A";
	value: undefined;
	toString: () => string;
};

export const naParser: Parser<NAType> = str("#N/A").map((value) => {
	return {
		type: "#N/A",
		value: undefined,
		toString: () => "#N/A",
	};
});
