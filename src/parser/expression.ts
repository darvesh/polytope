import {
	between,
	char,
	choice,
	optionalWhitespace,
	recursiveParser,
	sepBy,
	sequenceOf,
	type Parser,
} from "arcsecond";
import { formulaParser, type FormulaType } from ".";
import { ends, whitespaceSurrounded } from "./util";

type BinaryOperator = "+" | "-" | "*" | "/" | "^";

type BinaryExpression = {
	type: "binary";
	operator: BinaryOperator;
	left: Expression;
	right: Expression;
};

const createBinary = (
	operator: BinaryOperator,
	left: Expression,
	right: Expression
): BinaryExpression => ({
	type: "binary",
	operator,
	left,
	right,
});

type Expression = FormulaType | BinaryExpression;

const parentheses = between(char("("))(char(")"));

const exponentParser: Parser<Expression> = sepBy(
	whitespaceSurrounded(char("^"))
)(formulaParser).map((values) => {
	return values.reduce((acc, curr, index) => {
		if (index === 0) return acc;
		return createBinary("^", acc as Expression, curr as Expression);
	}, values[0]) as Expression;
});

const multiplicationParser: Parser<Expression> = sepBy(
	sequenceOf([optionalWhitespace, char("*"), optionalWhitespace])
)(exponentParser).map((values) => {
	return values.reduce((acc, curr, index) => {
		if (index === 0) return acc;
		return createBinary("*", acc as Expression, curr as Expression);
	}, values[0]) as Expression;
});

const divisionParser: Parser<Expression> = sepBy(
	sequenceOf([optionalWhitespace, char("/"), optionalWhitespace])
)(exponentParser).map((values) => {
	return values.reduce((acc, curr, index) => {
		if (index === 0) return acc;
		return createBinary("/", acc as Expression, curr as Expression);
	}, values[0]) as Expression;
});

const additionParser: Parser<Expression> = sepBy(
	sequenceOf([optionalWhitespace, char("+"), optionalWhitespace])
)(multiplicationParser).map((values) => {
	return values.reduce((acc, curr, index) => {
		if (index === 0) return acc;
		return createBinary("+", acc as Expression, curr as Expression);
	}, values[0]) as Expression;
});

const expressionParser: Parser<Expression> = choice([
	recursiveParser(() => ends(additionParser)),
	recursiveParser(() => ends(divisionParser)),
	recursiveParser(() => ends(multiplicationParser)),
	recursiveParser(() => ends(exponentParser)),
	recursiveParser(() => expressionParser),
]);

export const mathExpressionParser: Parser<Expression> = sequenceOf([
	optionalWhitespace,
	expressionParser,
	optionalWhitespace,
]).map(([, expression]) => expression);

const exp = "(100+2)*10+MAX(TEN,2,3)^4";
const res = mathExpressionParser.run(exp);
console.log(exp);
console.dir(res, { depth: null });
