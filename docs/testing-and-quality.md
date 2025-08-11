### Testing and Quality

#### Test runner
- Jest with JSDOM environment
- Example test at `tests/home.test.js`

```bash
npm test
```

#### Writing tests
- Prefer testing utilities and page helpers.
- Keep tests deterministic and independent of external services.

#### Linting and formatting
- ESLint with `eslint-config-next` and `eslint-config-prettier`
- Prettier for formatting

Useful scripts
```jsonc
// package.json (scripts)
{
  "lint": "next lint",
  "test": "jest"
}
```

#### Git hooks (optional)
- Husky is installed; add hooks as needed, e.g., `pre-commit` to run lint/tests. 