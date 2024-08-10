import { str } from "arcsecond";

const nullType = () => ({
	type: "Null",
	value: null,
	toString: () => "Null",
});

export const nullParser = str("NULL").map(nullType);
