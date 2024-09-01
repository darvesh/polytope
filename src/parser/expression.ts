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

function parentheses(parser: Parser<Expression>): Parser<Expression> {
	return between(char("("))(parser)(char(")")) as Parser<Expression>;
}

const exponentParser: Parser<Expression> = sepBy(
	whitespaceSurrounded(char("^"))
)(formulaParser).map((values) => {
	return values.reduce((acc, curr, index) => {
		if (index === 0) return acc;
		return createBinary("^", acc as Expression, curr as Expression);
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

const multiplicationParser: Parser<Expression> = sepBy(
	sequenceOf([optionalWhitespace, char("*"), optionalWhitespace])
)(divisionParser).map((values) => {
	return values.reduce((acc, curr, index) => {
		if (index === 0) return acc;
		return createBinary("*", acc as Expression, curr as Expression);
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

const subtractionParser: Parser<Expression> = sepBy(
	sequenceOf([optionalWhitespace, char("-"), optionalWhitespace])
)(additionParser).map((values) => {
	return values.reduce((acc, curr, index) => {
		if (index === 0) return acc;
		return createBinary("-", acc as Expression, curr as Expression);
	}, values[0]) as Expression;
});

const expressionParser: Parser<Expression> = choice([
	recursiveParser(() => ends(subtractionParser)),
	recursiveParser(() => ends(additionParser)),
	recursiveParser(() => ends(multiplicationParser)),
	recursiveParser(() => ends(divisionParser)),
	recursiveParser(() => ends(exponentParser)),
	recursiveParser(() => expressionParser),
]);

export const mathExpressionParser: Parser<Expression> = sequenceOf([
	optionalWhitespace,
	expressionParser,
	optionalWhitespace,
]).map(([, expression]) => expression);

const exp = "100*10/4-89";


const res = mathExpressionParser.run(exp);
console.log(exp);
console.dir(res, { depth: null });
