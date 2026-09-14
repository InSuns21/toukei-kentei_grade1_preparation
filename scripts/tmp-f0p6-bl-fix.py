from pathlib import Path

p = Path('textbook/volumes/00_foundations/F0_00P6_特性関数_中心極限定理/index.md')
s = p.read_text(encoding='utf-8')
old = 'ここで最後は逆三角不等式を使いました。'
new = 'ここで最後は [逆三角不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-reverse-triangle-inequality) を使いました。'
if old in s:
    s = s.replace(old, new, 1)
elif new not in s:
    raise SystemExit('reverse triangle reference location not found')
p.write_text(s, encoding='utf-8')
