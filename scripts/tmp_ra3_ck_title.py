from pathlib import Path
p = Path('textbook/volumes/00_foundations/RA3/index.md')
s = p.read_text(encoding='utf-8')
old = '> **定義（$C^k$ 級・$C^\\infty$ 級）**'
new = '> **定義（C^k級・C∞級）**'
if old not in s and new not in s:
    raise SystemExit('target title not found')
s = s.replace(old, new, 1)
p.write_text(s, encoding='utf-8')
