from pathlib import Path

path = Path('textbook/volumes/00_foundations/F0_00C2_コンパクト性の応用_最大最小_最近点/index.md')
text = path.read_text(encoding='utf-8')

replacements = [
    (
        'この集合は閉かつ有界なのでコンパクトです。',
        'この集合は閉かつ有界なので、[Heine–Borel](../F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md#thm-f0-00c1-02)よりコンパクトです。',
    ),
    (
        'したがって部分列 $x_{n_k}\\to p$ を取れます。$C$ は閉なので $p\\in C$、距離関数は連続なので\n\n$$\n\\|z-p\\|_2',
        'したがって部分列 $x_{n_k}\\to p$ を取れます。[閉集合の点列特徴付け](../F0_00B_距離空間_開集合_閉集合_収束/index.md#thm-f0-00b-01)より、$C$ は閉なので $p\\in C$ です。\n\nさらに[距離空間の定義](../F0_00B_距離空間_開集合_閉集合_収束/index.md#def-f0-00b-01)から得られる逆三角不等式\n\n$$\n\\left|\\|z-x\\|_2-\\|z-y\\|_2\\right|\n\\le \\|x-y\\|_2\n$$\n\nより、$x\\mapsto\\|z-x\\|_2$ は1-Lipschitz、したがって連続です。よって\n\n$$\n\\|z-p\\|_2',
    ),
]

for old, new in replacements:
    count = text.count(old)
    if count != 1:
        raise SystemExit(f'expected exactly one match, got {count}: {old[:80]!r}')
    text = text.replace(old, new, 1)

path.write_text(text, encoding='utf-8')
print(f'updated {path}')
