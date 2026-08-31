# Advanced 75 乱数生成・bootstrap・jackknife

- 安定ID: `RIKOU-ADVANCED-75`
- 80大問 No.: 75
- 演習価値: A
- 難度: A
- 目安時間: 25〜30分
- 電卓: 平方根の小数化は概算でよい

## 前提とこの問題の狙い

- **既知としてよい**: 累積分布関数、確率密度関数、一様分布、条件付き確率、標本平均・標本分散。
- **この問題で扱う**: 逆関数法、棄却法、bootstrap、jackknife。
- **1級での扱い**: 計算機指向手法を手順暗記にせず、「なぜ目的分布になるか」「何を再標本化して何を近似するか」「jackknife のバイアス補正がどう働くか」まで確認する。

## 問題

1. 連続で狭義単調増加な累積分布関数 $F$ を持つ分布について、$U\sim U(0,1)$ とし

$$
X=F^{-1}(U)
$$

とおけば $X$ の累積分布関数が $F$ になることを示せ。その結果を使って率 $\lambda$ の指数乱数を生成する式を求めよ。
2. 密度

$$
f(x)=2x,\qquad0<x<1
$$

を逆関数法で生成せよ。
3. 同じ $f$ を提案密度

$$
g(x)=1,\qquad0<x<1
$$

で棄却法生成する。$f(x)\le Mg(x)$ を満たす最小の $M$ を求め、候補 $X\sim g$ と独立な $V\sim U(0,1)$ を用いた具体的な採択条件を書け。また平均採択確率を求めよ。
4. 一般に候補 $X\sim g$ を

$$
V\le\frac{f(X)}{Mg(X)}
$$

のとき採択する棄却法について、採択された $X$ の密度が $f$ になることを示せ。
5. 観測 $X_1,\ldots,X_n$ から統計量 $T$ の標準誤差を評価したい。非母数 bootstrap では、元の $n$ 個の観測から**復元抽出で $n$ 個を取り直す**操作を繰り返す。ある統計量について $B=5$ 回の bootstrap 推定値が

$$
1.2,\ 1.7,\ 2.0,\ 2.3,\ 2.8
$$

であった。bootstrap 標準誤差を

$$
\widehat{\operatorname{se}}_{\mathrm{boot}}
=
\sqrt{
\frac{1}{B-1}
\sum_{b=1}^{B}
\left(T^{*(b)}-\overline T^*\right)^2
}
$$

で定義するとき、これを求めよ。また、なぜ復元抽出するのかを「経験分布から標本を取り直す」という観点から説明せよ。
6. データ

$$
1,\ 2,\ 4
$$

について、分母を $n$ とする分散推定量

$$
T_n
=\frac1n\sum_{i=1}^n(X_i-\overline X)^2
$$

を考える。1観測ずつ削除して計算した推定量を $T_{(-i)}$、その平均を

$$
\overline T_{(-\cdot)}
=\frac1n\sum_{i=1}^nT_{(-i)}
$$

とする。jackknife のバイアス推定量と補正推定量を

$$
\widehat{\operatorname{Bias}}_{\mathrm{jack}}
=(n-1)\left(\overline T_{(-\cdot)}-T_n\right),
$$

$$
T_{\mathrm{jack}}
=T_n-\widehat{\operatorname{Bias}}_{\mathrm{jack}}
$$

で定義する。$T_n$、3個の $T_{(-i)}$、$T_{\mathrm{jack}}$ を求め、通常の不偏標本分散との関係を確認せよ。

## 詳細解答

### 1. 逆関数法はなぜ正しいか

$F$ が連続で狭義単調増加とする。このとき

$$
X=F^{-1}(U)
$$

とおけば、任意の $x$ について、単調性より

$$
F^{-1}(U)\le x
\iff
U\le F(x).
$$

従って

$$
\begin{aligned}
P(X\le x)
&=P\{U\le F(x)\}\\
&=F(x).
\end{aligned}
$$

よって

$$
\boxed{X\sim F}.
$$

率 $\lambda$ の指数分布では

$$
F(x)=1-e^{-\lambda x},
\qquad x\ge0.
$$

$U=F(X)$ とおくと

$$
U=1-e^{-\lambda X}
$$

だから

$$
\boxed{
X=-\frac1\lambda\log(1-U)
}.
$$

$1-U$ も $U(0,1)$ に従うので

$$
\boxed{
X=-\frac1\lambda\log U
}
$$

としてもよい。

### 2. 密度 $f(x)=2x$ の逆関数法

累積分布関数は

$$
F(x)=\int_0^x2s\,ds=x^2,
\qquad0<x<1.
$$

従って

$$
U=X^2
$$

から

$$
\boxed{X=\sqrt U}.
$$

### 3. 棄却法の定数・採択条件・採択率

$$
g(x)=1,
\qquad0<x<1
$$

なので

$$
\frac{f(x)}{g(x)}=2x.
$$

この上限は2だから

$$
\boxed{M=2}.
$$

具体的な採択確率は

$$
\frac{f(X)}{Mg(X)}
=\frac{2X}{2}=X
$$

なので

$$
\boxed{V\le X}
$$

なら採択する。

平均採択確率は

$$
\begin{aligned}
P(\text{accept})
&=E_g\left[\frac{f(X)}{Mg(X)}\right]\\
&=\frac1M\int f(x)\,dx\\
&=\frac1M.
\end{aligned}
$$

従って本問では

$$
\boxed{P(\text{accept})=\frac12}.
$$

### 4. 棄却法はなぜ目的密度 $f$ を生成するか

$X=x$ が与えられたときの採択確率は

$$
P(\text{accept}\mid X=x)
=\frac{f(x)}{Mg(x)}.
$$

したがって

$$
\begin{aligned}
P(X\in dx,\text{accept})
&=g(x)\,dx\,
\frac{f(x)}{Mg(x)}\\
&=\frac1M f(x)\,dx.
\end{aligned}
$$

全採択確率は

$$
P(\text{accept})
=\int\frac1M f(x)\,dx
=\frac1M.
$$

よって採択を条件とした密度は

$$
\begin{aligned}
f_{X\mid\text{accept}}(x)
&=\frac{(1/M)f(x)}{1/M}\\
&=\boxed{f(x)}.
\end{aligned}
$$

棄却法では、提案密度 $g$ から出た候補を $f/g$ に比例する確率で残すことにより、採択後の分布を $f$ へ変換している。

### 5. bootstrap 標準誤差

bootstrap 推定値の平均は

$$
\overline T^*
=\frac{1.2+1.7+2.0+2.3+2.8}{5}
=\boxed{2.0}.
$$

平均との差は

$$
-0.8,\ -0.3,\ 0,\ 0.3,\ 0.8
$$

なので、平方和は

$$
0.64+0.09+0+0.09+0.64
=1.46.
$$

従って

$$
\begin{aligned}
\widehat{\operatorname{se}}_{\mathrm{boot}}
&=\sqrt{\frac{1.46}{4}}\\
&=\sqrt{0.365}\\
&\approx\boxed{0.604}.
\end{aligned}
$$

非母数 bootstrap では、未知の母集団分布 $F$ の代わりに、観測点 $X_1,\ldots,X_n$ にそれぞれ確率 $1/n$ を置く**経験分布** $\widehat F_n$ を使う。

経験分布から独立に $n$ 回抽出すれば、同じ観測が複数回選ばれることがある。したがって実装は「元データから復元抽出で $n$ 個を取り直す」ことになる。

もし非復元抽出で元の $n$ 個を全て取り直せば、並び順が変わるだけで毎回同じ標本になり、統計量の標本変動を再現できない。

従って要点は

$$
\boxed{
\text{bootstrapは経験分布を母集団の代用として再標本化する}
}.
$$

### 6. jackknife によるバイアス補正

データは

$$
1,2,4,
\qquad
\overline X=\frac73.
$$

偏差平方和は

$$
\left(1-\frac73\right)^2
+\left(2-\frac73\right)^2
+\left(4-\frac73\right)^2
=\frac{14}{3}.
$$

従って分母を $n=3$ とする分散推定量は

$$
\boxed{
T_n=\frac13\cdot\frac{14}{3}=\frac{14}{9}
}.
$$

1を削除するとデータは $2,4$、平均3なので

$$
T_{(-1)}
=\frac{(2-3)^2+(4-3)^2}{2}
=\boxed1.
$$

2を削除するとデータは $1,4$、平均 $5/2$ なので

$$
T_{(-2)}
=\frac{(1-5/2)^2+(4-5/2)^2}{2}
=\boxed{\frac94}.
$$

4を削除するとデータは $1,2$、平均 $3/2$ なので

$$
T_{(-3)}
=\frac{(1-3/2)^2+(2-3/2)^2}{2}
=\boxed{\frac14}.
$$

したがって削除推定量の平均は

$$
\begin{aligned}
\overline T_{(-\cdot)}
&=\frac13\left(1+\frac94+\frac14\right)\\
&=\frac13\cdot\frac72\\
&=\boxed{\frac76}.
\end{aligned}
$$

jackknife のバイアス推定量は

$$
\begin{aligned}
\widehat{\operatorname{Bias}}_{\mathrm{jack}}
&=(3-1)\left(\frac76-\frac{14}{9}\right)\\
&=2\left(-\frac7{18}\right)\\
&=\boxed{-\frac79}.
\end{aligned}
$$

よって補正推定量は

$$
\begin{aligned}
T_{\mathrm{jack}}
&=\frac{14}{9}-\left(-\frac79\right)\\
&=\boxed{\frac73}.
\end{aligned}
$$

一方、通常の不偏標本分散は分母を $n-1=2$ として

$$
S^2
=\frac{1}{2}\cdot\frac{14}{3}
=\boxed{\frac73}.
$$

したがって本例では

$$
\boxed{T_{\mathrm{jack}}=S^2}.
$$

分母 $n$ の標本分散が持つ下方バイアスを、delete-one jackknife がちょうど補正したことになる。

## 方法の位置付け

4手法は同じ「計算統計」でも役割が異なる。

- **逆関数法**: 一様乱数を目的分布へ変換する。
- **棄却法**: 生成しやすい提案分布から候補を出し、一部を捨てて目的分布へ変換する。
- **bootstrap**: 観測データの経験分布から再標本化し、推定量の標本分布・標準誤差などを近似する。
- **jackknife**: 1観測ずつ削除した推定値の変化から、バイアスや分散を評価する。

特に、乱数生成法は**指定した確率分布から標本を作る側**、bootstrap / jackknife は**既に得た標本から推定量の不確実性を評価する側**である。

## 本番答案

逆関数法では

$$
P\{F^{-1}(U)\le x\}
=P\{U\le F(x)\}
=F(x).
$$

指数分布なら

$$
X=-\log(1-U)/\lambda.
$$

$f(x)=2x$ では $F(x)=x^2$ より $X=\sqrt U$。

一様提案の棄却法では

$$
M=\sup_{0<x<1}2x=2,
$$

採択条件は $V\le X$、平均採択率は $1/2$。一般に

$$
P(X\in dx,\text{accept})
=\frac1M f(x)dx
$$

なので、採択後は密度 $f$ となる。

bootstrap 推定値の平均は2.0で

$$
\widehat{\operatorname{se}}_{\mathrm{boot}}
=\sqrt{1.46/4}
\approx0.604.
$$

bootstrap は経験分布からの復元再標本化である。

データ $1,2,4$ の分母 $n$ の分散は

$$
T_n=14/9.
$$

delete-one 推定値は

$$
1,\ 9/4,\ 1/4,
$$

その平均は $7/6$。よって

$$
\widehat{\operatorname{Bias}}_{\mathrm{jack}}=-7/9,
\qquad
T_{\mathrm{jack}}=7/3,
$$

であり、不偏標本分散と一致する。

## 採点基準

- 逆関数法の正当化と指数乱数: 4点
- $f(x)=2x$ の逆関数法: 2点
- 棄却法の $M$・採択条件・採択率: 3点
- 条件付き密度から棄却法の正当性を示す: 3点
- bootstrap 標準誤差と復元抽出の意味: 4点
- jackknife バイアス補正の計算・解釈: 4点

25分経過時は、乱数生成について

$$
P\{F^{-1}(U)\le x\}=F(x),
\qquad
g(x)\frac{f(x)}{Mg(x)}=\frac1M f(x)
$$

を残し、再標本化については「bootstrap = 経験分布から復元抽出」「jackknife = delete-one による補正」を明記する。
