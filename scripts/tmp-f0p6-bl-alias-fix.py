from pathlib import Path

p = Path('textbook/volumes/00_foundations/F0_00P6_特性関数_中心極限定理/index.md')
s = p.read_text(encoding='utf-8')
repls = {
    'が成り立つことをいいます。第1条件が有界性、第2条件がLipschitz条件です。': 'が成り立つことをいいます。第1の不等式が有界性、第2の不等式が入力の変化に対する出力の変化量を一様に抑える条件です。',
    'この章で必要なのはこの二つの不等式だけです。Lipschitz条件は「入力を $|x-y|$ だけ動かしたとき、出力の変化がその定数倍を超えない」という一様な変化率の上限を表します。': 'この章で必要なのはこの二つの不等式だけです。第2の不等式は「入力を $|x-y|$ だけ動かしたとき、出力の変化がその定数倍を超えない」という一様な変化率の上限を表します。',
    '次に $x\\le y$ として Lipschitz 条件を確認します。': '次に $x\\le y$ として第2の不等式を確認します。',
}
for old, new in repls.items():
    if old not in s:
        raise SystemExit(f'missing target: {old}')
    s = s.replace(old, new, 1)
p.write_text(s, encoding='utf-8')
