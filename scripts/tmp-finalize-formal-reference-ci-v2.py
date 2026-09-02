from pathlib import Path
import json

# package.json
p = Path('package.json')
data = json.loads(p.read_text())
s = data['scripts']
s['validate:formal-references'] = 'node scripts/validate-formal-reference-links.mjs'
if 'npm run validate:formal-references' not in s['validate']:
    s['validate'] += ' && npm run validate:formal-references'
if 'npm run validate:formal-references' not in s['validate:pages']:
    s['validate:pages'] = s['validate:pages'].replace(
        'npm run validate:dream-theater-index && npm run validate:proof-folding',
        'npm run validate:dream-theater-index && npm run validate:proof-folding && npm run validate:formal-references',
        1,
    )
p.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
print('package.json updated')

# visible textbook CI step
p = Path('.github/workflows/validate-textbook.yml')
t = p.read_text()
needle = "      - name: Validate collapsible proof sections\n        run: npm run validate:proof-folding\n"
if 'Validate formal theorem references' not in t:
    if needle not in t:
        raise SystemExit('validate-textbook insertion point missing')
    t = t.replace(needle, needle + "\n      - name: Validate formal theorem references\n        run: npm run validate:formal-references\n", 1)
p.write_text(t)
print('validate-textbook workflow updated')

# generated Pages fragment validation
p = Path('scripts/validate-pages-links.mjs')
t = p.read_text()
marker = "\nawait Promise.all([access(sidebarPath), access(indexPath), access(homePath)]);\n"
helper = r'''

async function validateFormalReferenceFragments(markdown, siteRelativeFile, sourceLabel, errors) {
  let checked = 0;
  for (const href of extractLinks(markdown)) {
    const hashIndex = href.indexOf('#');
    if (hashIndex < 0) continue;

    const fragment = href.slice(hashIndex + 1).split('?', 1)[0];
    if (!/^(?:thm|ref)-[a-z0-9][a-z0-9-]*$/.test(fragment)) continue;
    checked += 1;

    if (/^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(href)) {
      errors.push(`${sourceLabel}: stable formal reference must be internal: ${href}`);
      continue;
    }

    const pathPart = href.slice(0, hashIndex).split('?', 1)[0];
    let targetRelative = siteRelativeFile;
    if (pathPart) {
      try {
        targetRelative = normalizeInternalHref(href);
      } catch (error) {
        errors.push(`${sourceLabel}: ${error.message}`);
        continue;
      }
    }
    if (!targetRelative) targetRelative = siteRelativeFile;

    const target = path.resolve(siteDir, ...targetRelative.split('/'));
    const siteRoot = path.resolve(siteDir) + path.sep;
    if (target !== path.resolve(siteDir) && !target.startsWith(siteRoot)) {
      errors.push(`${sourceLabel}: formal reference escapes _site: ${href}`);
      continue;
    }
    if (!(await exists(target))) {
      errors.push(`${sourceLabel}: formal reference target file is missing after Pages assembly: ${href}`);
      continue;
    }

    const targetMarkdown = await readFile(target, 'utf8');
    if (
      !targetMarkdown.includes(`<a id="${fragment}"></a>`) &&
      !targetMarkdown.includes(`<a id='${fragment}'></a>`)
    ) {
      errors.push(`${sourceLabel}: formal reference #${fragment} is missing from generated target ${targetRelative}`);
    }
  }
  return checked;
}
'''
if 'async function validateFormalReferenceFragments' not in t:
    if marker not in t:
        raise SystemExit('pages helper insertion marker missing')
    t = t.replace(marker, helper + marker, 1)

needle = "let textbookLinkCount = 0;\n\nconst textbookIndex = await readFile(path.join(textbookDir, 'index.md'), 'utf8');\n"
if 'let formalReferenceFragmentCount = 0;' not in t:
    if needle not in t:
        raise SystemExit('pages counter marker missing')
    t = t.replace(needle, "let textbookLinkCount = 0;\nlet formalReferenceFragmentCount = 0;\n\nconst textbookIndex = await readFile(path.join(textbookDir, 'index.md'), 'utf8');\n", 1)

needle = """textbookLinkCount += await validateRootOrientedLinks(
  textbookIndex,
  'textbook/index.md',
  errors,
  textbookNavigationTargets,
);

for (const relative of textbookVolumeFiles) {
"""
if "validateFormalReferenceFragments(\n  textbookIndex" not in t:
    if needle not in t:
        raise SystemExit('pages textbook-index marker missing')
    repl = needle.replace(
        "\n\nfor (const relative of textbookVolumeFiles) {\n",
        "\nformalReferenceFragmentCount += await validateFormalReferenceFragments(\n  textbookIndex,\n  'textbook/index.md',\n  'textbook/index.md',\n  errors,\n);\n\nfor (const relative of textbookVolumeFiles) {\n",
    )
    t = t.replace(needle, repl, 1)

needle = "  textbookLinkCount += await validateRootOrientedLinks(markdown, siteRelative, errors);\n\n  if (relative.endsWith('/index.md')) {\n"
if "validateFormalReferenceFragments(\n    markdown" not in t:
    if needle not in t:
        raise SystemExit('pages volume marker missing')
    repl = "  textbookLinkCount += await validateRootOrientedLinks(markdown, siteRelative, errors);\n  formalReferenceFragmentCount += await validateFormalReferenceFragments(\n    markdown,\n    siteRelative,\n    siteRelative,\n    errors,\n  );\n\n  if (relative.endsWith('/index.md')) {\n"
    t = t.replace(needle, repl, 1)

needle = """console.log(
  `Textbook validation passed: ${expectedTextbookPages.length} chapter pages, ${textbookLinkCount} checked Markdown links.`,
);
"""
if 'Formal reference fragment validation passed:' not in t:
    if needle not in t:
        raise SystemExit('pages summary marker missing')
    t = t.replace(needle, needle + "console.log(\n  `Formal reference fragment validation passed: ${formalReferenceFragmentCount} generated thm-/ref- link(s).`,\n);\n", 1)
p.write_text(t)
print('validate-pages-links.mjs updated')

# authoring contract
p = Path('textbook/style-guide.md')
t = p.read_text()
section = '''

### 7.1 定理・証明・導出への参照リンク

「前章の○○定理から」「この証明はF0-02Bへ分離した」のように、**別の場所にある特定の定理・補題・証明・導出を論理的依存先として参照する場合、章トップへのリンクだけでは不十分**とする。読者がクリック1回で該当箇所へ着地できるよう、参照先に明示的な安定anchorを置く。

- 定理・補題など単一のformal result: `<a id="thm-...02B/index.md#ref-farkas-from-separation)`

`#` のない章トップリンクは「次章」「関連章」「章全体を読む」のような通常ナビゲーションには使用してよいが、「この定理を使う」「証明はここ」「導出はここ」という依存参照には使用しない。

CIでは `validate:formal-references` がsource Markdown上で、formal dependencyの章トップ止まり、存在しないanchor、**リンクすべきなのに生テキストのまま残った高確度な定理参照**を検出する。さらに `validate:pages` が生成後のMarkdownにも `thm-` / `ref-` anchorが実在することを確認し、sourceでは正しく見えてもPages上では飛べない状態を防ぐ。
'''
if '### 7.1 定理・証明・導出への参照リンク' not in t:
    t = t.rstrip() + section + '\n'
p.write_text(t)
print('style guide updated')
