from pathlib import Path
import json

# package.json: source validator is blocking in both normal and Pages validation.
p = Path('package.json')
data = json.loads(p.read_text())
scripts = data['scripts']
scripts['validate:formal-references'] = 'node scripts/validate-formal-reference-links.mjs'
if 'npm run validate:formal-references' not in scripts['validate']:
    scripts['validate'] = scripts['validate'] + ' && npm run validate:formal-references'
if 'npm run validate:formal-references' not in scripts['validate:pages']:
    scripts['validate:pages'] = scripts['validate:pages'].replace(
        'npm run validate:dream-theater-index && npm run validate:proof-folding',
        'npm run validate:dream-theater-index && npm run validate:proof-folding && npm run validate:formal-references',
        1,
    )
p.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
print('updated package.json')

# Textbook workflow: make the source-level theorem/reference check visible as its own CI step.
p = Path('.github/workflows/validate-textbook.yml')
s = p.read_text()
needle = '''      - name: Validate collapsible proof sections\n        run: npm run validate:proof-folding\n'''
replacement = needle + '''\n      - name: Validate formal theorem references\n        run: npm run validate:formal-references\n'''
if 'Validate formal theorem references' not in s:
    if needle not in s:
        raise SystemExit('validate-textbook workflow insertion point not found')
    s = s.replace(needle, replacement, 1)
p.write_text(s)
print('updated validate-textbook workflow')

# Generated Pages check: ordinary link validation checked only the target file and
# deliberately discarded fragments. Stable formal references need a second layer
# that verifies the explicit thm-/ref- anchor survives the Pages build.
p = Path('scripts/validate-pages-links.mjs')
s = p.read_text()
insert_point = '''}\n\nawait Promise.all([access(sidebarPath), access(indexPath), access(homePath)]);\n'''
helper = r''' }

async function validateFormalReferenceFragments(markdown, siteRelativeFile, sourceLabel, errors) {
  let checked = 0;
  for (const href of extractLinks(markdown)) {
    const hashIndex = href.indexOf('#');
    if (hashIndex < 0) continue;

    const fragment = href.slice(hashIndex + 1).split('?', 1)[0];
    if (!/^(?:thm|ref)-[a-z0-9][a-z0-9-]*$/.test(fragment)) continue;
    checked += 1;

    if (/^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(href)) {
      errors.push(`${sourceLabel}: stable formal reference must be an internal textbook link: ${href}`);
      continue;
    }

    const pathPart = href.slice(0, hashIndex).split('?', 1)[0];
    let targetRelative;
    if (!pathPart) {
      targetRelative = siteRelativeFile;
    } else {
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
      errors.push(`${sourceLabel}: formal reference target file does not exist after Pages assembly: ${href}`);
      continue;
    }

    const targetMarkdown = await readFile(target, 'utf8');
    const doubleQuoted = `<a id="${fragment}"></a>`;
    const singleQuoted = `<a id='${fragment}'></a>`;
    if (!targetMarkdown.includes(doubleQuoted) && !targetMarkdown.includes(singleQuoted)) {
      errors.push(`${sourceLabel}: formal reference fragment #${fragment} is missing from generated target ${targetRelative}`);
    }
  }
  return checked;
}

await Promise.all([access(sidebarPath), access(indexPath), access(homePath)]);
'''
# The raw string starts with a spacer before }, normalize it to the exact preceding brace.
helper = helper.replace('''' }\n\nasync''', '''}\n\nasync''', 1)
if 'async function validateFormalReferenceFragments' not in s:
    if insert_point not in s:
        raise SystemExit('validate-pages-links helper insertion point not found')
    s = s.replace(insert_point, helper, 1)

needle = '''let textbookLinkCount = 0;\n\nconst textbookIndex = await readFile(path.join(textbookDir, 'index.md'), 'utf8');\n'''
replacement = '''let textbookLinkCount = 0;\nlet formalReferenceFragmentCount = 0;\n\nconst textbookIndex = await readFile(path.join(textbookDir, 'index.md'), 'utf8');\n'''
if 'let formalReferenceFragmentCount = 0;' not in s:
    if needle not in s:
        raise SystemExit('formal fragment counter insertion point not found')
    s = s.replace(needle, replacement, 1)

needle = '''textbookLinkCount += await validateRootOrientedLinks(\n  textbookIndex,\n  'textbook/index.md',\n  errors,\n  textbookNavigationTargets,\n);\n\nfor (const relative of textbookVolumeFiles) {\n'''
replacement = needle.replace(
    '\n\nfor (const relative of textbookVolumeFiles) {',
    "\nformalReferenceFragmentCount += await validateFormalReferenceFragments(\n  textbookIndex,\n  'textbook/index.md',\n  'textbook/index.md',\n  errors,\n);\n\nfor (const relative of textbookVolumeFiles) {",
)
if "formalReferenceFragmentCount += await validateFormalReferenceFragments(\n  textbookIndex" not in s:
    if needle not in s:
        raise SystemExit('textbook index formal fragment insertion point not found')
    s = s.replace(needle, replacement, 1)

needle = '''  textbookLinkCount += await validateRootOrientedLinks(markdown, siteRelative, errors);\n\n  if (relative.endsWith('/index.md')) {\n'''
replacement = '''  textbookLinkCount += await validateRootOrientedLinks(markdown, siteRelative, errors);\n  formalReferenceFragmentCount += await validateFormalReferenceFragments(\n    markdown,\n    siteRelative,\n    siteRelative,\n    errors,\n  );\n\n  if (relative.endsWith('/index.md')) {\n'''
if 'formalReferenceFragmentCount += await validateFormalReferenceFragments(\n    markdown' not in s:
    if needle not in s:
        raise SystemExit('volume formal fragment insertion point not found')
    s = s.replace(needle, replacement, 1)

needle = '''console.log(\n  `Textbook validation passed: ${expectedTextbookPages.length} chapter pages, ${textbookLinkCount} checked Markdown links.`,\n);\n'''
replacement = needle + '''console.log(\n  `Formal reference fragment validation passed: ${formalReferenceFragmentCount} generated thm-/ref- link(s).`,\n);\n'''
if 'Formal reference fragment validation passed:' not in s:
    if needle not in s:
        raise SystemExit('formal fragment summary insertion point not found')
    s = s.replace(needle, replacement, 1)
p.write_text(s)
print('updated validate-pages-links.mjs')

# Document the contract so future authors know chapter-top links are navigation,
# while theorem/proof dependencies require stable explicit anchors.
p = Path('textbook/style-guide.md')
s = p.read_text()
section = r'''

### 7.1 定理・証明・導出への参照リンク

「前章の○○定理から」「この証明はF0-02Bへ分離した」のように、**別の場所にある特定の定理・補題・証明・導出を論理的依存先として参照する場合、章トップへのリンクだけでは不十分**とする。読者がクリック1回で該当箇所へ着地できるよう、参照先に明示的な安定anchorを置く。

- 定理・補題など単一のformal result: `<a id="thm-...02B/index.md#ref-farkas-from-separation)`

`#` のない章トップリンクは「次章」「関連章」「章全体を読む」のような通常ナビゲーションには使用してよいが、「この定理を使う」「証明はここ」「導出はここ」という依存参照には使用しない。

CIでは `validate:formal-references` がsource Markdown上で、formal dependencyの章トップ止まり、存在しないanchor、安定anchorなしの高確度な定理参照を検出する。さらに `validate:pages` が生成後のMarkdownにも `thm-` / `ref-` anchorが実在することを確認し、**sourceでは正しく見えてもPages上では飛べない**状態を防ぐ。
'''
if '### 7.1 定理・証明・導出への参照リンク' not in s:
    s = s.rstrip() + section + '\n'
p.write_text(s)
print('updated textbook/style-guide.md')
