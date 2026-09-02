from pathlib import Path
p = Path('textbook/volumes/00_foundations/F0_02C6_Hahn_Banach_分離定理/index.md')
s = p.read_text()
old = '実際にはZornの補題を使います。'
new = '実際には[F0-00A3のZornの補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)を使います。'
if old in s:
    p.write_text(s.replace(old, new, 1))
elif new not in s:
    raise SystemExit('Zorn application sentence not found')
print('fixed remaining Zorn application link')
