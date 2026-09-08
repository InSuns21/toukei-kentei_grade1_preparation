from pathlib import Path
p = Path('textbook/volumes/00_foundations/MT4/index.md')
s = p.read_text(encoding='utf-8')
old = '有限部分和を増やし、測度の下からの連続性を使えば'
new = '有限部分和を増やし、[測度の下からの連続性](../F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md#thm-f0-00d2-01)を使えば'
count = s.count(old)
if count != 1:
    raise SystemExit(f'expected one occurrence, got {count}')
p.write_text(s.replace(old, new, 1), encoding='utf-8')
