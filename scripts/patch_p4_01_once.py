from pathlib import Path

p = Path('textbook/volumes/02_distributions/P4_01_変数変換_順序統計量/index.md')
s = p.read_text(encoding='utf-8')

s = s.replace(
    '通常教材では、数学的な専門語を先に覚えるのではなく、まず次の手順で解きます。',
    '変数変換は、まず次の手順で処理します。'
)
s = s.replace(
    '\nプログラミング関数名などを覚える必要はありません。試験では、上の極座標の式と範囲が書ければ十分です。\n',
    '\n'
)
s = s.replace(
    '試験では次の3点をセットで書きます。',
    '2変数変換では次の3点をセットで確認します。'
)
s = s.replace(
    '短い区間に2個以上入る確率は $h^2$ 程度なので、$h$ で割って極限を取ると消えます。通常教材ではこの理解で十分です。',
    '短い区間に2個以上入る確率は $h^2$ 程度なので、$h$ で割って極限を取ると消えます。'
)
s = s.replace(
    '\n以下では、各問題を単独で読んでも立式できるよう、必要な分布・記号・使用してよい公式を問題文の近くに書きます。\n',
    '\n'
)
s = s.replace(
    '5. 得られた密度が全確率を表している理由を、標本配置の数え上げと結び付けて説明せよ。積分の特殊名称を答える必要はない。',
    '5. 得られた密度が全確率を表している理由を、標本配置の数え上げと結び付けて説明せよ。'
)

start = s.index('## 4.4 最小値と最大値の同時密度')
end = s.index('\n---\n\n# 5. 典型例', start)
new_order = r'''## 4.4 累積分布関数で一様分布へ直す

$F$ が連続で、考えている範囲で狭義単調増加とします。各標本について
$$
U_i=F(X_i)
$$
と置きます。$0<u<1$ で
$$
\begin{aligned}
P(U_i\le u)
&=P\{F(X_i)\le u\}\\
&=P\{X_i\le F^{-1}(u)\}\\
&=u
\end{aligned}
$$
なので
$$
U_i\sim\operatorname{Unif}(0,1).
$$

$F$ は単調増加なので、$X_1,\ldots,X_n$ を小さい順に並べてから $F$ を作用させても順序は変わりません。したがって
$$
U_{(k)}=F\{X_{(k)}\}.
$$

4.3 の第 $k$ 順序統計量の公式を一様分布 $F(u)=u$, $f(u)=1$ に適用すると
$$
f_{U_{(k)}}(u)
=\frac{n!}{(k-1)!(n-k)!}
u^{k-1}(1-u)^{n-k},
\qquad0<u<1.
$$
これはベータ分布の確率密度関数なので
$$
F\{X_{(k)}\}
\sim\operatorname{Beta}(k,n-k+1).
$$

## 4.5 最小値と最大値の同時密度

$U=X_{(1)}$, $V=X_{(n)}$ とします。$u<v$ のとき

- 最小値を取る標本を1個選ぶ。
- 最大値を取る標本を1個選ぶ。
- 残り $n-2$ 個を $(u,v)$ に入れる。

最小値と最大値を取る標本の選び方は $n(n-1)$ 通りなので
$$
f_{U,V}(u,v)
=n(n-1)\{F(v)-F(u)\}^{n-2}f(u)f(v),
\qquad u<v.
$$
'''
s = s[:start] + new_order + s[end:]

marker = '### P4-B02 指数分布の比\n'
assert marker in s
b05 = r'''### P4-B05 一様分布3個・4個の和

- level: B
- minutes: 15
- topics: 和, 畳込み, 区分的な確率密度関数

$X_1,X_2,X_3,X_4$ は互いに独立で、それぞれ一様分布 $\operatorname{Unif}(0,1)$ に従い、
$$
f_X(x)=\boldsymbol{1}_{(0,1)}(x)
$$
とする。$m=2,3,4$ に対して
$$
S_m=X_1+\cdots+X_m
$$
と置く。

$S_2=X_1+X_2$ の確率密度関数は
$$
f_{S_2}(s)=
\begin{cases}
s,&0<s<1,\\
2-s,&1\le s<2,\\
0,&\text{otherwise}
\end{cases}
$$
であるとしてよい。

1. $m=3,4$ について $S_m$ と $m-S_m$ が同じ分布をもつことを示せ。
2. $S_3$ の確率密度関数を求めよ。
3. $S_4$ の確率密度関数を求めよ。

<!-- solution-start -->

#### 詳細解答

まず $1-X_i$ も $\operatorname{Unif}(0,1)$ に従い、互いに独立です。したがって
$$
m-S_m=(1-X_1)+\cdots+(1-X_m)
$$
は $S_m$ と同じ分布をもちます。よって
$$
f_{S_m}(s)=f_{S_m}(m-s)
$$
です。

$S_3=S_2+X_3$ なので、畳み込みから
$$
f_{S_3}(s)=\int_0^1 f_{S_2}(s-x)\,dx.
$$
$t=s-x$ と見れば、積分しているのは
$$
s-1<t<s
$$
の範囲にある $f_{S_2}(t)$ です。

$0<s<1$ では $0<t<s$ なので
$$
f_{S_3}(s)=\int_0^s t\,dt=\frac{s^2}{2}.
$$

$1\le s<2$ では区分点 $t=1$ をまたぐので
$$
\begin{aligned}
f_{S_3}(s)
&=\int_{s-1}^1 t\,dt+\int_1^s(2-t)\,dt\\
&=\frac{1-(s-1)^2}{2}
+\left(2s-\frac{s^2}{2}-\frac32\right)\\
&=-s^2+3s-\frac32.
\end{aligned}
$$

$2\le s<3$ では対称性から
$$
f_{S_3}(s)=f_{S_3}(3-s)=\frac{(3-s)^2}{2}.
$$
したがって
$$
f_{S_3}(s)=
\begin{cases}
\dfrac{s^2}{2},&0<s<1,\\[4pt]
-s^2+3s-\dfrac32,&1\le s<2,\\[4pt]
\dfrac{(3-s)^2}{2},&2\le s<3,\\[4pt]
0,&\text{otherwise}.
\end{cases}
$$

次に $S_4=S_3+X_4$ なので
$$
f_{S_4}(s)=\int_0^1 f_{S_3}(s-x)\,dx.
$$
対称性
$$
f_{S_4}(s)=f_{S_4}(4-s)
$$
があるため、$0<s<2$ だけ計算すれば残りも得られます。

$0<s<1$ では
$$
f_{S_4}(s)
=\int_0^s\frac{t^2}{2}\,dt
=\frac{s^3}{6}.
$$

$1\le s<2$ では $t=1$ で分けて
$$
\begin{aligned}
f_{S_4}(s)
&=\int_{s-1}^1\frac{t^2}{2}\,dt
+\int_1^s\left(-t^2+3t-\frac32\right)dt\\
&=\frac{1-(s-1)^3}{6}
+\left[-\frac{t^3}{3}+\frac{3t^2}{2}-\frac{3t}{2}\right]_1^s\\
&=\frac{1-(s-1)^3}{6}
-\frac{s^3}{3}+\frac{3s^2}{2}-\frac{3s}{2}+\frac13\\
&=-\frac{s^3}{2}+2s^2-2s+\frac23.
\end{aligned}
$$

$2\le s<3$ は $4-s\in(1,2]$ なので
$$
f_{S_4}(s)
=-\frac{(4-s)^3}{2}
+2(4-s)^2-2(4-s)+\frac23.
$$

$3\le s<4$ は $4-s\in(0,1]$ なので
$$
f_{S_4}(s)=\frac{(4-s)^3}{6}.
$$

よって
$$
f_{S_4}(s)=
\begin{cases}
\dfrac{s^3}{6},&0<s<1,\\[4pt]
-\dfrac{s^3}{2}+2s^2-2s+\dfrac23,&1\le s<2,\\[4pt]
-\dfrac{(4-s)^3}{2}+2(4-s)^2-2(4-s)+\dfrac23,&2\le s<3,\\[4pt]
\dfrac{(4-s)^3}{6},&3\le s<4,\\[4pt]
0,&\text{otherwise}.
\end{cases}
$$

#### 本番答案

$1-X_i\sim\operatorname{Unif}(0,1)$ より $S_m\overset{d}=m-S_m$。

$$
f_{S_3}(s)=
\begin{cases}
s^2/2,&0<s<1,\\
-s^2+3s-3/2,&1\le s<2,\\
(3-s)^2/2,&2\le s<3,\\
0,&\text{otherwise}.
\end{cases}
$$

また $0<s<2$ だけ畳み込みを計算し、$f_{S_4}(s)=f_{S_4}(4-s)$ を使うと
$$
f_{S_4}(s)=
\begin{cases}
s^3/6,&0<s<1,\\
-s^3/2+2s^2-2s+2/3,&1\le s<2,\\
f_{S_4}(4-s),&2\le s<4,\\
0,&\text{otherwise}.
\end{cases}
$$

#### 採点基準

対称性4点、$S_3$ の畳み込みと区間分け7点、$S_3$ の密度3点、$S_4$ の畳み込みと区間分け4点、$S_4$ の密度2点。合計20点。

<!-- solution-end -->

'''
s = s.replace(marker, b05 + marker, 1)
p.write_text(s, encoding='utf-8')

cp = Path('textbook/volumes/02_distributions/P4_01_変数変換_順序統計量/chapter.yaml')
c = cp.read_text(encoding='utf-8')
c = c.replace(
    'canonical_examples: [平方変換, 畳込み, 極座標変換, 最大最小, 標本中央値, 標本範囲]',
    'canonical_examples: [平方変換, 畳込み, 一様分布3個・4個の和, 極座標変換, 最大最小, 標本中央値, 標本範囲]'
)
c = c.replace(
    'exercise_counts: { level_a: 4, level_b: 4, level_c: 5, level_d: 1 }',
    'exercise_counts: { level_a: 4, level_b: 5, level_c: 5, level_d: 1 }'
)
cp.write_text(c, encoding='utf-8')

sp = Path('textbook/style-guide.md')
style = sp.read_text(encoding='utf-8')
anchor = '**問題文の自己完結性も読者粒度の一部とする。**'
rule = (
    '**本文には、執筆者側の取捨選択を説明するメタコメントを書かない。** '
    '「〜を覚える必要はない」「試験では〜で十分」「本章の目的ではない」'
    '「通常教材では〜まででよい」のような文は置かず、不要な事項は単に本文へ出さない。'
    '必要な式・条件・注意点だけを内容として直接記述する。\n\n'
)
assert anchor in style
style = style.replace(anchor, rule + anchor, 1)
sp.write_text(style, encoding='utf-8')

final = p.read_text(encoding='utf-8')
for phrase in [
    'プログラミング関数名などを覚える必要はありません',
    '通常教材ではこの理解で十分です',
    '名称暗記は本章の目的ではありません',
    '積分の特殊名称を答える必要はない',
]:
    assert phrase not in final, phrase
assert '### P4-B05 一様分布3個・4個の和' in final
assert '## 4.4 累積分布関数で一様分布へ直す' in final
assert '## 4.5 最小値と最大値の同時密度' in final
