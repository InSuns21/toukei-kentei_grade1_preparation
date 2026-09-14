from pathlib import Path

p = Path('scripts/audit-dream-theater-undefined-terms.mjs')
s = p.read_text(encoding='utf-8')

old = """if (selfTest) {\n  runSelfTest();\n  process.exit(0);\n}\n"""
new = """if (selfTest) {\n  process.exit(runSelfTest() ? 0 : 1);\n}\n"""
if new not in s:
    if old not in s:
        raise SystemExit('self-test entry block not found')
    s = s.replace(old, new, 1)

old = "const re = new RegExp(`[A-Za-z0-9一-龯ぁ-んァ-ヶ・^+\\\\-]{2,48}?${suffix}`, 'gu');"
new = "const re = new RegExp(`[A-Za-z0-9一-龯ぁ-んァ-ヶ・^+\\\\-\\\\s]{2,48}?${suffix}`, 'gu');"
if new not in s:
    if old not in s:
        raise SystemExit('technical candidate regex not found')
    s = s.replace(old, new, 1)

old = """  if (failures.length) {\n    console.error(`DREAM THEATER concept audit self-test failed: ${failures.join(', ')}`);\n    process.exitCode = 1;\n    return;\n  }\n  console.log('DREAM THEATER concept audit self-test passed.');\n}\n"""
new = """  if (failures.length) {\n    console.error(`DREAM THEATER concept audit self-test failed: ${failures.join(', ')}`);\n    return false;\n  }\n  console.log('DREAM THEATER concept audit self-test passed.');\n  return true;\n}\n"""
if new not in s:
    if old not in s:
        raise SystemExit('self-test result block not found')
    s = s.replace(old, new, 1)

p.write_text(s, encoding='utf-8')
