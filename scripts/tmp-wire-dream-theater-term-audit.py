from pathlib import Path
import json

root = Path('.')

# package.json
p = root / 'package.json'
data = json.loads(p.read_text(encoding='utf-8'))
scripts = data['scripts']
scripts['audit:dream-theater-undefined-terms'] = 'node scripts/audit-dream-theater-undefined-terms.mjs'
scripts['validate:dream-theater-undefined-terms'] = 'node scripts/audit-dream-theater-undefined-terms.mjs --strict'
scripts['validate:dream-theater-undefined-terms:changed'] = 'node scripts/audit-dream-theater-undefined-terms.mjs --strict --changed-only'
scripts['test:dream-theater-concept-audits'] = 'node scripts/audit-dream-theater-undefined-terms.mjs --self-test'
scripts['audit:dream-theater-concepts'] = 'node scripts/audit-dream-theater-concepts.mjs && node scripts/audit-dream-theater-formal-order.mjs && node scripts/audit-dream-theater-explicit-dependencies.mjs && node scripts/audit-dream-theater-implicit-dependencies.mjs && node scripts/audit-dream-theater-undefined-terms.mjs'
scripts['validate:dream-theater-concepts:changed'] = 'node scripts/validate-dream-theater-concepts-changed.mjs && node scripts/audit-dream-theater-undefined-terms.mjs --strict --changed-only && node scripts/audit-dream-theater-formal-order.mjs --strict --changed-only && node scripts/audit-dream-theater-explicit-dependencies.mjs --strict --changed-only && node scripts/audit-dream-theater-implicit-dependencies.mjs --strict --changed-only'
p.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

# validate-dream-theater-concepts workflow
p = root / '.github/workflows/validate-dream-theater-concepts.yml'
s = p.read_text(encoding='utf-8')
for needle in [
    "      - 'scripts/audit-dream-theater-implicit-dependencies.mjs'\n",
]:
    replacement = needle + "      - 'scripts/audit-dream-theater-undefined-terms.mjs'\n      - 'scripts/lib/dream-theater-concept-resolution.mjs'\n      - 'scripts/validate-dream-theater-concepts-changed.mjs'\n"
    if replacement not in s:
        if s.count(needle) != 2:
            raise SystemExit(f'unexpected workflow path occurrences: {s.count(needle)}')
        s = s.replace(needle, replacement)
step = "      - name: Validate changed DREAM THEATER pages\n"
test_step = "      - name: Self-test DREAM THEATER concept audits\n        run: npm run test:dream-theater-concept-audits\n\n"
if test_step not in s:
    if step not in s:
        raise SystemExit('workflow validation step not found')
    s = s.replace(step, test_step + step, 1)
p.write_text(s, encoding='utf-8')

# Chronological local shadowing in changed validator.
p = root / 'scripts/validate-dream-theater-concepts-changed.mjs'
s = p.read_text(encoding='utf-8')
import_line = "import YAML from 'yaml';\n"
helper_import = "import { buildLocalAliasIntroductions, normalizeAlias as normalizeResolvedAlias } from './lib/dream-theater-concept-resolution.mjs';\n"
if helper_import not in s:
    if import_line not in s:
        raise SystemExit('YAML import not found')
    s = s.replace(import_line, import_line + helper_import, 1)
old_cache = """  let localAliases = aliasCache.get(file);\n  if (localAliases === undefined) {\n    const knowledgePath = path.join(process.cwd(), path.dirname(file), 'knowledge.yaml');\n    localAliases = new Set();\n    if (fs.existsSync(knowledgePath)) {\n      const doc = YAML.parse(fs.readFileSync(knowledgePath, 'utf8')) ?? {};\n      for (const raw of doc.concepts ?? []) {\n        for (const alias of [raw?.name, ...(raw?.aliases ?? [])]) {\n          const value = String(alias ?? '').trim();\n          if (value) localAliases.add(normalizeAlias(value));\n        }\n      }\n    }\n    aliasCache.set(file, localAliases);\n  }\n"""
new_cache = """  let localAliases = aliasCache.get(file);\n  if (localAliases === undefined) {\n    const knowledgePath = path.join(process.cwd(), path.dirname(file), 'knowledge.yaml');\n    localAliases = new Map();\n    if (fs.existsSync(knowledgePath)) {\n      const doc = YAML.parse(fs.readFileSync(knowledgePath, 'utf8')) ?? {};\n      try {\n        const rawSource = fs.readFileSync(path.join(process.cwd(), file), 'utf8');\n        localAliases = buildLocalAliasIntroductions(rawSource, doc);\n      } catch {\n        localAliases = new Map();\n      }\n    }\n    aliasCache.set(file, localAliases);\n  }\n"""
if new_cache not in s:
    if old_cache not in s:
        raise SystemExit('local alias cache block not found')
    s = s.replace(old_cache, new_cache, 1)
old_return = """  return remoteAliases.some((alias) => {\n    const normalized = normalizeAlias(alias);\n    return localAliases.has(normalized) && aliasAppears(sourceLine, alias);\n  });\n"""
new_return = """  return remoteAliases.some((alias) => {\n    const entries = localAliases.get(normalizeResolvedAlias(alias)) ?? [];\n    const introduced = entries.some((entry) => entry.line != null && entry.line <= lineNumber);\n    return introduced && aliasAppears(sourceLine, alias);\n  });\n"""
if new_return not in s:
    if old_return not in s:
        raise SystemExit('local alias return block not found')
    s = s.replace(old_return, new_return, 1)
p.write_text(s, encoding='utf-8')

# Policy wording: document the stronger changed-only gate.
p = root / 'textbook/dream-theater-knowledge.yaml'
s = p.read_text(encoding='utf-8')
old = "# v1 の blocking 対象は登録概念・formal statement・requires 依存関係。\n# 自由文の未知語候補は audit から始め、確認済みパターンを順次 blocking へ昇格する。\n"
new = "# 登録概念・formal statement・requires 依存関係に加え、changed-only CI では\n# 高信頼の未定義専門語候補、local concept の first-use、曖昧 alias 使用も blocking する。\n# 既存違反は audit/WARN に残し、新しく持ち込む違反だけを merge blocker にする。\n"
if new not in s:
    if old not in s:
        raise SystemExit('knowledge policy comment not found')
    s = s.replace(old, new, 1)
p.write_text(s, encoding='utf-8')
