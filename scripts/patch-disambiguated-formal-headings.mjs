import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

function replaceRequired(file, from, to) {
  let source = fs.readFileSync(file, 'utf8');
  if (!source.includes(from)) throw new Error(`replacement point not found: ${file}`);
  source = source.replace(from, to);
  fs.writeFileSync(file, source);
}

replaceRequired(
  'textbook/volumes/00_foundations/F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影/index.md',
  '> **定義（基底）**  ',
  '> **定義（線形代数の基底）**  '
);
replaceRequired(
  'textbook/volumes/00_foundations/F0_00C_連続写像_コンパクト性_最大最小/index.md',
  '> **定義（連続写像）**  ',
  '> **定義（距離空間の連続写像）**  '
);

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
fs.unlinkSync('scripts/patch-disambiguated-formal-headings.mjs');

execFileSync('git', ['config', 'user.name', 'github-actions[bot]']);
execFileSync('git', ['config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com']);
execFileSync('git', ['add', '-A']);
execFileSync('git', ['commit', '-m', 'fix: disambiguate shared formal headings'], { stdio: 'inherit' });
execFileSync('git', ['push', 'origin', 'HEAD:feature/dream-theater-topology-core'], { stdio: 'inherit' });
