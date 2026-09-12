from pathlib import Path

root = Path('textbook/volumes/00_foundations')


def edit(path, replacements):
    p = root / path / 'index.md'
    s = p.read_text(encoding='utf-8')
    for old, new, expected in replacements:
        n = s.count(old)
        if n != expected:
            raise RuntimeError(f'{path}: {old!r}: expected {expected}, got {n}')
        s = s.replace(old, new)
    p.write_text(s, encoding='utf-8')

edit('LA3A', [
    ('annihilator の次元公式', '[annihilator の次元公式](#thm-la3a-annihilator-dimension)', 3),
    ('標準埋め込み $J:V\\to V^{**}$ に対して', '上で定義した写像 $J:V\\to V^{**}$ に対して', 1),
    ('標準埋め込み $J$ で同一視している点', '写像 $J$ を通して同一視している点', 1),
])

edit('LA3B', [
    ('Leibniz 公式を使って $\\det P$ を求めよ。', '[Leibniz 公式](#def-la3b-matrix-determinant)を使って $\\det P$ を求めよ。', 1),
])

edit('LA3C', [
    ('列添字集合から $j$ を除いたもの', '列番号 $1,\\dots,n$ から $j$ を除いた集合', 1),
    ('行添字集合から $i$ を除いたもの', '行番号 $1,\\dots,n$ から $i$ を除いた集合', 1),
    ('ここで最後の等号は指数が2だけ違うためです。', 'ここで最後の等号は、$i+j$ と $(i-1)+(j-1)$ が2だけ違い、$(-1)^2=1$ だからです。', 1),
])

print('LA3A-D CI wording/reference fixes applied')
