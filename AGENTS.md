# AGENTS.md

## Cursor Cloud specific instructions

### Overview

CFnew is a **Cloudflare Workers** serverless application (single JS file, not a Node.js project). The main source is `明文源吗` (~4,700 lines of JavaScript). An obfuscated build output goes to `少年你相信光吗`. A simplified variant lives in `snippets`.

### Running locally

- `npm run dev` starts the worker via `wrangler dev` on port 8787. The admin/subscription UI is at `http://localhost:8787/{UUID}` (default UUID: `351c9981-04b6-4103-aa4b-864aa9c91469`, configured in `wrangler.toml` as the `u` variable).
- The source file `明文源吗` has no `.js` extension. The entry point `src/index.js` re-exports from it so wrangler's bundler can resolve it.
- KV storage features show a warning ("KV存储未启用或未配置") locally since no KV namespace is bound. This is expected and does not block testing the core UI or subscription generation.

### Build (obfuscation)

- `npm run build` runs `node obfuscate.js`, replicating the CI pipeline from `.github/workflows/obfuscate.yml`.

### Lint

- `npm run lint` runs ESLint on `明文源吗` and `snippets`. The 6 errors (e.g. `generateClashConfig is not defined`) are pre-existing source code issues, not config problems.

### Key gotchas

- The source file name contains Chinese characters (`明文源吗`). Always quote it when passing to shell commands.
- `cloudflare:sockets` import only resolves inside the wrangler runtime; Node.js cannot execute the file directly.
- There are no automated tests in this repository. Validation is done by running the worker locally and checking HTTP responses or the browser UI.
