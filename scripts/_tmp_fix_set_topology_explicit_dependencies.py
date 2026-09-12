from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / 'textbook/volumes/00_foundations'

def patch(dirname, replacements):
    p = ROOT / dirname / 'index.md'
    text = p.read_text(encoding='utf-8')
    for old, new in replacements:
        if old not in text:
            raise SystemExit(f'missing pattern in {dirname}: {old!r}')
        text = text.replace(old, new, 1)
    p.write_text(text, encoding='utf-8')

patch('F0_00C_連続写像_コンパクト性_最大最小', [
    ('$\\delta=\\varepsilon$ と取り、問題文で与えた不等式を使えば直ちに従う。',
     '$\\delta=\\varepsilon$ と取れば $\\bigl||x|-|x_0|\\bigr|\\le |x-x_0|<\\varepsilon$ となる。'),
    ('不連続性の否定定義から固定 $\\varepsilon_0>0$ を取り、$\\delta=1/n$ ごとに反例 $x_n$ を選ぶ。すると $x_n\\to x$ だが像は $\\varepsilon_0$ 以上離れ続ける。',
     'ある $\\varepsilon_0>0$ があり、各 $n$ で $d_X(x_n,x)<1/n$ かつ $d_Y(f(x_n),f(x))\\ge\\varepsilon_0$ となる $x_n$ を選べる。従って $x_n\\to x$ だが像は $\\varepsilon_0$ 以上離れ続ける。'),
])

patch('F0_00C2_コンパクト性の応用_最大最小_最近点', [
    ('距離の三角不等式から\n$$\n|d(z,x)-d(z,y)|\\le d(x,y)\n$$\nなので $f$ は連続である。',
     '$d(z,x)\\le d(z,y)+d(y,x)$ と $d(z,y)\\le d(z,x)+d(x,y)$ から\n$$\n|d(z,x)-d(z,y)|\\le d(x,y)\n$$\nを得るので $f$ は連続である。'),
])

patch('F0_00D_Cauchy列_完備性_無限次元', [
    ('極限 $x$ を中継して三角不等式を使い、両側を $\\varepsilon/2$ にする。',
     '$m,n\\ge N$ なら $d(x_m,x_n)\\le d(x_m,x)+d(x,x_n)<\\varepsilon/2+\\varepsilon/2=\\varepsilon$。'),
])

print('explicit dependency wording fixes applied')
