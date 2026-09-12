from pathlib import Path

root = Path('textbook/volumes/00_foundations')

patches = {
    'LA3A': (
        "> $V,W$ を有限次元ベクトル空間、$T:V\\to W$ を線形写像とする。このとき\n> $$\n> \\ker T^*=(\\operatorname{im}T)^\\circ,\n> \\qquad\n> \\operatorname{im}T^*=(\\ker T)^\\circ.\n> $$\n> 特に\n> $$\n> \\operatorname{rank}T^*=\\operatorname{rank}T.\n> $$",
        "> $V,W$ を有限次元ベクトル空間、$T:V\\to W$ を線形写像とする。このとき\n\n$$\n\\ker T^*=(\\operatorname{im}T)^\\circ,\n\\qquad\n\\operatorname{im}T^*=(\\ker T)^\\circ.\n$$\n\n> 特に\n\n$$\n\\operatorname{rank}T^*=\\operatorname{rank}T.\n$$",
    ),
    'LA3C': (
        "> 任意の正方行列 $A$ に対して\n> $$\n> A\\operatorname{adj}(A)\n> =\\operatorname{adj}(A)A\n> =(\\det A)I.\n> $$",
        "> 任意の正方行列 $A$ に対して\n\n$$\nA\\operatorname{adj}(A)\n=\\operatorname{adj}(A)A\n=(\\det A)I.\n$$",
    ),
    'LA3D': (
        "> 有限次元ベクトル空間 $V$ の線形写像 $T:V\\to V$ に対して\n> $$\n> \\det T=0\n> \\Longleftrightarrow\n> T\\text{ は可逆でない}.\n> $$",
        "> 有限次元ベクトル空間 $V$ の線形写像 $T:V\\to V$ に対して\n\n$$\n\\det T=0\n\\Longleftrightarrow\nT\\text{ は可逆でない}.\n$$",
    ),
}

for chapter, (old, new) in patches.items():
    p = root / chapter / 'index.md'
    s = p.read_text(encoding='utf-8')
    n = s.count(old)
    if n != 1:
        raise SystemExit(f'{chapter}: expected one formal block, got {n}')
    p.write_text(s.replace(old, new, 1), encoding='utf-8')

print('formal display math moved outside blockquotes')
