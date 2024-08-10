import { str } from "arcsecond";

const NAType = () => ({
	type: "#N/A",
	value: undefined,
	toString: () => "#N/A",
});

export const naParser = str("#N/A").map(NAType);
