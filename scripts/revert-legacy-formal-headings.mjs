import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const files = [
  'textbook/volumes/00_foundations/F0_00C_連続写像_コンパクト性_最大最小/index.md',
  'textbook/volumes/00_foundations/F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影/index.md',
];
const base = 'ef5cf408507a3d72b3bedde24c5f82b904dac8a4';
for (const file of files) {
  const original = execFileSync('git', ['show', `${base}:${file}`], { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
  fs.writeFileSync(file, original);
}

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
fs.unlinkSync('scripts/revert-legacy-formal-headings.mjs');

execFileSync('git', ['config', 'user.name', 'github-actions[bot]']);
execFileSync('git', ['config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com']);
execFileSync('git', ['add', '-A']);
execFileSync('git', ['commit', '-m', 'chore: keep legacy chapter prose out of TOP1 diff'], { stdio: 'inherit' });
execFileSync('git', ['push', 'origin', 'HEAD:feature/dream-theater-topology-core'], { stdio: 'inherit' });
