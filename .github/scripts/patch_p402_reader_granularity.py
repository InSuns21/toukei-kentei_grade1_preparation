from pathlib import Path

path = Path('textbook/volumes/02_distributions/P4_02_確率変数の収束_大数則_中心極限定理/index.md')
text = path.read_text(encoding='utf-8')

replacements = {
'''強大数の法則の完全な証明は本章の試験範囲を超えるため、ここでは定理として用います。一方、有限分散の場合の弱大数則は上のChebyshev不等式から自力で再現できるようにします。''': '''有限分散の場合の弱大数則は、上のChebyshev不等式から直接導けます。''',
'''中心極限定理そのものの一般証明は深い定理なので、本教材では証明暗記を要求しません。その代わり、各問題で次の三点を必ず確認します。''': '''中心極限定理を適用するときは、次の三点を確認します。''',
'''概収束するなら確率収束するので、これだけでも概収束しないことが従います。直接には、独立性と
$$
\\sum_nP(X_n=1)=\\sum_nP(X_n=-1)=\\infty
$$
から第二Borel--Cantelliの補題により、確率1で$1$も$-1$も無限回現れます。従って各標本点で値は最終的に固定されず、極限をもちません。''': '''概収束するなら確率収束するので、上で確率収束しないことを示した時点で、概収束もしないことが従います。''',
'''GitHub Pagesでは各「解答を表示」を開くと、詳細解答・本番答案・採点基準を確認できます。\n\n''': '''''',
}

for old, new in replacements.items():
    if old not in text:
        raise SystemExit(f'expected text not found: {old[:60]!r}')
    text = text.replace(old, new)

for banned in ['試験範囲を超えるため', '証明暗記を要求しません', '第二Borel--Cantelli']:
    if banned in text:
        raise SystemExit(f'banned phrase remains: {banned}')

path.write_text(text, encoding='utf-8')
