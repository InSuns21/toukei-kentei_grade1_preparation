import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const file = 'textbook/volumes/00_foundations/TOP1/index.md';
let source = fs.readFileSync(file, 'utf8');
const count = (source.match(/^\$$/gm) ?? []).length;
if (count !== 4) throw new Error(`expected 4 standalone dollar delimiters, found ${count}`);
source = source.replace(/^\$$/gm, '$$$$');
fs.writeFileSync(file, source);

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
fs.unlinkSync('scripts/patch-top1-display-delimiters.mjs');

execFileSync('git', ['config', 'user.name', 'github-actions[bot]']);
execFileSync('git', ['config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com']);
execFileSync('git', ['add', '-A']);
execFileSync('git', ['commit', '-m', 'fix: normalize TOP1 display delimiters'], { stdio: 'inherit' });
execFileSync('git', ['push', 'origin', 'HEAD:feature/dream-theater-topology-core'], { stdio: 'inherit' });
