import { choice, str } from "arcsecond";
import { makeBasicType } from "./util";

const booleanType = makeBasicType("boolean");

export const booleanParser = choice([str("TRUE"), str("FALSE")]).map((x) =>
	x === "TRUE" ? booleanType(true) : booleanType(false)
);
