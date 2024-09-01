import {
	between,
	char,
	choice,
	optionalWhitespace,
	recursiveParser,
	sepBy1,
	sequenceOf,
	type Parser,
} from "arcsecond";
import { formulaParser, type FormulaType } from ".";
import { whitespaceSurrounded } from "./util";

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

function operatorParser(operator: string, parser: Parser<Expression>) {
	return sepBy1<unknown, Expression>(whitespaceSurrounded(char(operator)))(
		parser
	).map((values) => {
		return values.reduce((acc, curr, index) => {
			if (index === 0) return acc;
			return createBinary(operator as BinaryOperator, acc, curr);
		}, values[0]);
	});
}

const topLevelParser: Parser<Expression | FormulaType> = choice([
	formulaParser,
	between(char("("))(char(")"))(
		recursiveParser(() => expressionParser)
	) as Parser<Expression>,
]);

const exponentParser: Parser<Expression> = operatorParser("^", topLevelParser);
const multiplicationParser: Parser<Expression> = operatorParser(
	"*",
	exponentParser
);
const divisionParser: Parser<Expression> = operatorParser(
	"/",
	multiplicationParser
);
const additionParser: Parser<Expression> = operatorParser("+", divisionParser);
const subtractionParser: Parser<Expression> = operatorParser(
	"-",
	additionParser
);

const expressionParser: Parser<Expression> = choice([
	recursiveParser(() => subtractionParser),
	recursiveParser(() => additionParser),
	recursiveParser(() => multiplicationParser),
	recursiveParser(() => divisionParser),
	recursiveParser(() => exponentParser),
	recursiveParser(() => expressionParser),
]);

export const mathExpressionParser: Parser<Expression> = sequenceOf([
	optionalWhitespace,
	expressionParser,
	optionalWhitespace,
]).map(([, expression]) => expression);
