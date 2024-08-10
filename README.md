# Polytope

To install dependencies:

```bash
bun install
```

To run:

```bash
bun test
```

## Goals

```typescript
import { Polytope } from "polytope";

const data = [{ price: 100 }, { price: 200 }];

const polytope = new Polytope({ data, functions: [] });

const formula = "=SUM({price})";
const result = polytope.execute(formula);
```
