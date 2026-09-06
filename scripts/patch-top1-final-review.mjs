import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

function replaceRequired(source, from, to, label) {
  if (!source.includes(from)) throw new Error(`replacement point not found: ${label}`);
  return source.replace(from, to);
}

const top1Path = 'textbook/volumes/00_foundations/TOP1/index.md';
let top1 = fs.readFileSync(top1Path, 'utf8');
top1 = replaceRequired(
  top1,
  '従って全ての開区間が有限交差として得られ、それらの任意和から通常の開集合が全て得られます。',
  `従って全ての開区間が有限交差として得られ、それらの任意和から通常の開集合が全て生成位相に入ります。通常位相を $\\tau_{\\mathrm{std}}$ と書けば\n$$\n\\tau_{\\mathrm{std}}\\subseteq\\tau(\\mathcal S).\n$$\n逆に、部分基底をなす各半直線 $(-\\infty,a)$ と $(b,\\infty)$ はもともと $\\tau_{\\mathrm{std}}$ の開集合です。$\\tau_{\\mathrm{std}}$ は有限交差と任意和に閉じているため、$\\mathcal S$ の有限交差とその任意和で作られる全ての集合も $\\tau_{\\mathrm{std}}$ に属します。従って\n$$\n\\tau(\\mathcal S)\\subseteq\\tau_{\\mathrm{std}}.\n$$\n二つの包含から $\\tau(\\mathcal S)=\\tau_{\\mathrm{std}}$ です。`,
  'subbasis reverse inclusion'
);
top1 = replaceRequired(
  top1,
  'したがって生成位相の最小性から $\\tau(\\mathcal S)\\subseteq\\rho$。',
  'したがって[部分基底から生成される位相の最小性](#thm-top1-subbasis-generates)から $\\tau(\\mathcal S)\\subseteq\\rho$。',
  'named formal link'
);
fs.writeFileSync(top1Path, top1);

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
fs.unlinkSync('scripts/patch-top1-final-review.mjs');

execFileSync('git', ['config', 'user.name', 'github-actions[bot]']);
execFileSync('git', ['config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com']);
execFileSync('git', ['add', '-A']);
execFileSync('git', ['commit', '-m', 'fix: complete TOP1 final proof review'], { stdio: 'inherit' });
execFileSync('git', ['push', 'origin', 'HEAD:feature/dream-theater-topology-core'], { stdio: 'inherit' });
