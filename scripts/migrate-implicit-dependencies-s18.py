from pathlib import Path

path = Path('textbook/volumes/00_foundations/F0_00C2_コンパクト性の応用_最大最小_最近点/index.md')
text = path.read_text(encoding='utf-8')

old = '''さらに[距離空間の定義](../F0_00B_距離空間_開集合_閉集合_収束/index.md#def-f0-00b-01)から得られる逆三角不等式

$$
\\left|\\|z-x\\|_2-\\|z-y\\|_2\\right|
\\le \\|x-y\\|_2
$$

より、$x\\mapsto\\|z-x\\|_2$ は1-Lipschitz、したがって連続です。よって
'''

new = '''さらに[距離空間の定義](../F0_00B_距離空間_開集合_閉集合_収束/index.md#def-f0-00b-01)から、

$$
\\|z-x\\|_2
\\le \\|z-y\\|_2+\\|y-x\\|_2,
\\qquad
\\|z-y\\|_2
\\le \\|z-x\\|_2+\\|x-y\\|_2.
$$

したがって

$$
\\left|\\|z-x\\|_2-\\|z-y\\|_2\\right|
\\le \\|x-y\\|_2.
$$

よって $x\\mapsto\\|z-x\\|_2$ は1-Lipschitz、特に連続です。したがって
'''

count = text.count(old)
if count != 1:
    raise SystemExit(f'expected exactly one match, got {count}')

text = text.replace(old, new, 1)
path.write_text(text, encoding='utf-8')
print(f'updated {path}')
