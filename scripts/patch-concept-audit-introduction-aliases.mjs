import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const auditPath = 'scripts/audit-dream-theater-concepts.mjs';
let audit = fs.readFileSync(auditPath, 'utf8');
const from = `    const matched = localFormalConcepts.some((concept) => concept.aliases.some((alias) => aliasAppears(line, alias)));`;
const to = `    const matched = localFormalConcepts.some((concept) =>\n      [...concept.aliases, ...concept.introductionAliases].some((alias) => aliasAppears(line, alias))\n    );`;
if (!audit.includes(from)) throw new Error('formal declaration alias matcher not found');
audit = audit.replace(from, to);
fs.writeFileSync(auditPath, audit);

const normalPagesWorkflow = `name: Validate Pages assembly

on:
  pull_request:
    paths:
      - 'pages/**'
      - 'textbook/**'
      - 'statistical-mathematics/**'
      - 'applied-rikou-80/**'
      - 'anki/**'
      - 'scripts/**'
      - 'package.json'
      - 'package-lock.json'
      - '.github/workflows/validate-pages.yml'
  workflow_dispatch:

jobs:
  validate-pages:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v6

      - name: Setup Node.js
        uses: actions/setup-node@v6
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Assemble and validate Pages site
        run: npm run validate:pages
`;
fs.writeFileSync('.github/workflows/validate-pages.yml', normalPagesWorkflow);
fs.unlinkSync('scripts/patch-concept-audit-introduction-aliases.mjs');

execFileSync('git', ['config', 'user.name', 'github-actions[bot]']);
execFileSync('git', ['config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com']);
execFileSync('git', ['add', '-A']);
execFileSync('git', ['commit', '-m', 'fix: honor introduction aliases in concept audit'], { stdio: 'inherit' });
execFileSync('git', ['push', 'origin', 'HEAD:feature/dream-theater-topology-core'], { stdio: 'inherit' });
