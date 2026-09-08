from pathlib import Path
import json

p = Path('textbook/dream-theater-standard-math-core.yaml')
s = p.read_text(encoding='utf-8')
old = """  - id: CA2
    title: 複素線積分・原始関数・Cauchy–Goursat
    area: complex-analysis
    tier: core
    status: planned
    prerequisites: [CA1, RA4, TOP3]
"""
new = """  - id: CA2
    title: 複素線積分・原始関数・Cauchy–Goursat
    area: complex-analysis
    tier: core
    status: implemented
    implemented_at: 2026-09-09
    implementation_path: textbook/volumes/00_foundations/CA2/index.md
    prerequisites: [CA1, RA4, TOP3, TOP5]
"""
if old not in s:
    raise SystemExit('CA2 planned block not found')
p.write_text(s.replace(old, new, 1), encoding='utf-8')

p = Path('textbook/dream-theater-index.json')
data = json.loads(p.read_text(encoding='utf-8'))
paths = next(sec['paths'] for sec in data['sections'] if sec['name'] == 'DREAM THEATER 本編')
ca1 = 'textbook/volumes/00_foundations/CA1/index.md'
ca2 = 'textbook/volumes/00_foundations/CA2/index.md'
if ca2 not in paths:
    paths.insert(paths.index(ca1) + 1, ca2)
p.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

p = Path('textbook/dream-theater.md')
s = p.read_text(encoding='utf-8')
old_line = '1. [CA1 複素微分・Cauchy–Riemann・初等正則関数](textbook/volumes/00_foundations/CA1/index.md)\n'
new_lines = old_line + '2. [CA2 複素線積分・原始関数・Cauchy–Goursat](textbook/volumes/00_foundations/CA2/index.md)\n'
if '2. [CA2 複素線積分' not in s:
    if old_line not in s:
        raise SystemExit('CA1 facade line not found')
    s = s.replace(old_line, new_lines, 1)
p.write_text(s, encoding='utf-8')
