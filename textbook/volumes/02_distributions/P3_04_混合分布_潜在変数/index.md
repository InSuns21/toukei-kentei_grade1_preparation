# P3-04 混合分布と潜在変数

観測値の背後に「どの成分から発生したか」という見えない変数を置くと、条件付きでは単純な分布でも、成分を観測しない周辺分布は複数の分布が混ざった形になります。本章では有限混合から連続混合、観測後の成分確率、尤度までを一つの流れで扱います。

本章は [通常教材の執筆スタイルガイド](../../../style-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md)、[共通記号ガイド](../../../../references/notation-guide.md)、[共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md) に従います。

## この章で解けるようになる問題

- 有限混合分布を全確率公式から作る。
- 観測値から成分確率をベイズの定理で更新する。
- 全期待値・全分散で混合分布の平均と分散を求める。
- ポアソン–ガンマ混合を積分し、負の二項型の周辺分布を導く。
- 正規混合の平均・分散を成分内変動と成分間変動に分ける。
- 潜在成分が観測できる場合とできない場合の尤度を区別する。
- ラベルの入れ替えによる識別可能性の問題を説明する。

## 公式出題範囲との対応

| 範囲 | 本章の内容 |
|---|---|
| 混合分布 | 有限混合、周辺分布、観測後の成分確率 |
| 条件付き期待値・分散 | 全期待値、全分散、成分内・成分間変動 |
| 連続混合 | ポアソン–ガンマ混合 |
| 潜在変数モデル | 潜在指標、観測尤度、識別可能性 |

## 前提知識チェック

1. P1-02: 全確率公式とベイズの定理を使う。
2. P2-02: 全期待値・全分散と期待値・分散の計算を使う。
3. P3-01: ポアソン分布・負の二項分布を使う。
4. P3-02: ガンマ分布・正規分布を使う。
5. F0-00: ガンマ積分と基本的な積分変形を確認する。

---

## 1. 有限混合分布

$Z\in\{1,\ldots,m\}$ を成分を表す確率変数とし、

$$
P(Z=j)=\pi_j,\qquad \pi_j\ge0,\qquad \sum_{j=1}^m\pi_j=1
$$

とする。$Z=j$ のときの $X$ の確率質量関数または確率密度関数を $g_j(x)$ と書く。

$Z$ を観測しないとき、$X$ の周辺分布は全確率公式から

$$
\boxed{
 g(x)=\sum_{j=1}^m\pi_j g_j(x)
}
$$

となる。

例えば二成分なら

$$
g(x)=\pi g_1(x)+(1-\pi)g_2(x).
$$

「成分を選ぶ確率」×「その成分から $x$ が出る確率または密度」を足している。

---

## 2. 観測後の成分確率

二成分混合で、観測 $X=x$ が得られた後に「成分1だった確率」を考える。周辺質量または密度が正なら、ベイズの定理から

$$
\boxed{
P(Z=1\mid X=x)
=
\frac{\pi g_1(x)}{\pi g_1(x)+(1-\pi)g_2(x)}
}
$$

である。

一般の $m$ 成分なら

$$
\boxed{
\tau_j(x):=P(Z=j\mid X=x)
=
\frac{\pi_jg_j(x)}{\sum_{\ell=1}^m\pi_\ell g_\ell(x)}
}
$$

と書ける。$\tau_j(x)$ は観測後の成分確率で、混合モデルでは責務とも呼ばれる。

分子は「成分 $j$ を選び、その成分から $x$ が出る」重み、分母はそれを全成分について足したものである。したがって

$$
\sum_{j=1}^m\tau_j(x)=1.
$$

---

## 3. 混合分布の平均と分散

$E[|X|]<\infty$ とする。全期待値公式より

$$
\boxed{
E[X]
=
\sum_{j=1}^m\pi_jE[X\mid Z=j]
}
$$

である。

さらに $E[X^2]<\infty$ とする。全分散公式

$$
\operatorname{Var}(X)
=E\{\operatorname{Var}(X\mid Z)\}
+\operatorname{Var}\{E[X\mid Z]\}
$$

を有限和で書けば

$$
\boxed{
\operatorname{Var}(X)
=
\sum_{j=1}^m\pi_j\operatorname{Var}(X\mid Z=j)
+
\sum_{j=1}^m\pi_j\{E[X\mid Z=j]-E[X]\}^2
}
$$

となる。

第1項は各成分の内部にあるばらつき、第2項は成分平均どうしの違いによるばらつきである。

### 3.1 全分散公式の分解

$$
X-E[X]
=
\{X-E[X\mid Z]\}+\{E[X\mid Z]-E[X]\}
$$

と分けて二乗する。交差項の期待値は

$$
\begin{aligned}
&E[\{X-E[X\mid Z]\}\{E[X\mid Z]-E[X]\}]\\
&=E\left[
\{E[X\mid Z]-E[X]\}
E\{X-E[X\mid Z]\mid Z\}
\right]\\
&=0
\end{aligned}
$$

で消える。残る二項が

$$
E\{\operatorname{Var}(X\mid Z)\}
\quad\text{と}\quad
\operatorname{Var}\{E[X\mid Z]\}
$$

である。

---

## 4. ポアソン分布とガンマ分布の混合

潜在率 $\Lambda$ を

$$
\Lambda\sim\operatorname{Gamma}(\alpha,\beta),
\qquad \alpha>0,\ \beta>0
$$

とする。ここで $\alpha$ は形状母数、$\beta$ は率母数で、確率密度関数は

$$
f_\Lambda(\lambda)
=
\frac{\beta^\alpha}{\Gamma(\alpha)}
\lambda^{\alpha-1}e^{-\beta\lambda},
\qquad \lambda>0.
$$

$\Lambda=\lambda$ の下で

$$
X\mid\Lambda=\lambda\sim\operatorname{Poisson}(\lambda),
$$

すなわち

$$
P(X=k\mid\Lambda=\lambda)
=e^{-\lambda}\frac{\lambda^k}{k!},
\qquad k=0,1,2,\ldots
$$

とする。

$\Lambda$ を積分して消すと

$$
\begin{aligned}
P(X=k)
&=\int_0^\infty
P(X=k\mid\Lambda=\lambda)f_\Lambda(\lambda)\,d\lambda\\
&=\frac{\beta^\alpha}{k!\Gamma(\alpha)}
\int_0^\infty
\lambda^{k+\alpha-1}e^{-(\beta+1)\lambda}\,d\lambda.
\end{aligned}
$$

$t=(\beta+1)\lambda$ と置くと

$$
\begin{aligned}
&\int_0^\infty
\lambda^{k+\alpha-1}e^{-(\beta+1)\lambda}\,d\lambda\\
&=\frac{1}{(\beta+1)^{k+\alpha}}
\int_0^\infty t^{k+\alpha-1}e^{-t}\,dt\\
&=\frac{\Gamma(k+\alpha)}{(\beta+1)^{k+\alpha}}.
\end{aligned}
$$

したがって

$$
\boxed{
P(X=k)
=
\frac{\beta^\alpha\Gamma(k+\alpha)}
{k!\Gamma(\alpha)(\beta+1)^{k+\alpha}}
}
$$

を得る。

平均と分散は周辺確率質量関数から和を計算するより、階層表現を使う方が短い。

$$
E[X]=E[\Lambda]=\frac{\alpha}{\beta},
$$

$$
\begin{aligned}
\operatorname{Var}(X)
&=E[\Lambda]+\operatorname{Var}(\Lambda)\\
&=\frac{\alpha}{\beta}+\frac{\alpha}{\beta^2}.
\end{aligned}
$$

ポアソン分布単独では平均と分散が等しいが、潜在率が変動すると

$$
\operatorname{Var}(X)-E[X]=\frac{\alpha}{\beta^2}>0
$$

となる。このように分散がポアソン分布の基準より大きくなる現象を過分散という。

---

## 5. 二成分正規混合

$Z\in\{1,2\}$、

$$
P(Z=1)=\pi,\qquad P(Z=2)=1-\pi,
\qquad 0\le\pi\le1
$$

とする。条件付き分布を

$$
X\mid Z=j\sim N(\mu_j,\sigma_j^2),
\qquad \sigma_j>0
$$

とする。成分 $j$ の確率密度関数は

$$
f_j(x)
=
\frac{1}{\sigma_j\sqrt{2\pi}}
\exp\left\{-\frac{(x-\mu_j)^2}{2\sigma_j^2}\right\},
\qquad x\in\mathbb R.
$$

全期待値公式より

$$
\boxed{
E[X]=\pi\mu_1+(1-\pi)\mu_2
}
$$

である。

全分散公式の成分内項は

$$
\pi\sigma_1^2+(1-\pi)\sigma_2^2.
$$

$\mu=E[X]$ とすると成分間項は

$$
\pi(\mu_1-\mu)^2+(1-\pi)(\mu_2-\mu)^2.
$$

ここで

$$
\mu_1-\mu=(1-\pi)(\mu_1-\mu_2),
$$

$$
\mu_2-\mu=-\pi(\mu_1-\mu_2)
$$

だから

$$
\boxed{
\operatorname{Var}(X)
=
\pi\sigma_1^2+(1-\pi)\sigma_2^2
+\pi(1-\pi)(\mu_1-\mu_2)^2
}
$$

となる。

---

## 6. 潜在指標が見える尤度と見えない尤度

独立な観測 $(X_i,Z_i)$、$i=1,\ldots,n$ を考える。成分 $j$ の混合比を $\pi_j$、条件付き密度を $g_j(x_i;\vartheta_j)$ とする。

$$
I_{ij}:=\boldsymbol{1}_{\{Z_i=j\}}
$$

と置くと、$I_{ij}$ は $Z_i=j$ なら1、それ以外なら0である。

$Z_i$ まで観測される場合の尤度は

$$
\boxed{
L_c
=
\prod_{i=1}^n\prod_{j=1}^m
\{\pi_jg_j(x_i;\vartheta_j)\}^{I_{ij}}
}
$$

である。

一方、$Z_i$ が観測されない場合は、各 $x_i$ について可能な成分を足して

$$
p(x_i)=\sum_{j=1}^m\pi_jg_j(x_i;\vartheta_j)
$$

とする。観測が独立なら

$$
\boxed{
L
=
\prod_{i=1}^n
\left\{
\sum_{j=1}^m\pi_jg_j(x_i;\vartheta_j)
\right\}
}
$$

となる。

また

$$
E[I_{ij}\mid X_i=x_i]
=P(Z_i=j\mid X_i=x_i)
=\tau_{ij}
$$

である。責務 $\tau_{ij}$ は、見えない成分指示変数の条件付き期待値としても読める。

---

## 7. 識別可能性とラベル交換

モデルの異なる母数値が同じ観測分布を与えると、観測だけから母数を一意に決められない。

二成分混合では

$$
\pi f_1(x)+(1-\pi)f_2(x)
$$

に対して

$$
(\pi,f_1,f_2)
\longmapsto
(1-\pi,f_2,f_1)
$$

と成分名を入れ替えても同じ密度になる。これをラベル交換という。

正規混合で

$$
\mu_1<\mu_2
$$

のような順序制約を置けば、単なる成分名の交換による重複を除ける。

ただし、ラベル交換を除いても、平均・分散など少数のモーメントだけで全母数が一意に決まるとは限らない。

---

## 8. 例題

### 8.1 二成分ポアソン混合

$$
P(Z=1)=\frac13,\qquad P(Z=2)=\frac23,
$$

$$
X\mid Z=1\sim\operatorname{Poisson}(1),\qquad
X\mid Z=2\sim\operatorname{Poisson}(4)
$$

とする。

$k=0,1,2,\ldots$ に対して

$$
P(X=k)
=
\frac13e^{-1}\frac{1^k}{k!}
+\frac23e^{-4}\frac{4^k}{k!}.
$$

平均は

$$
E[X]=\frac13\cdot1+\frac23\cdot4=3.
$$

条件付き分散の平均は3、成分平均の分散は

$$
\frac13(1-3)^2+\frac23(4-3)^2=2
$$

だから

$$
\operatorname{Var}(X)=3+2=5.
$$

### 8.2 ポアソン–ガンマ混合

$$
X\mid\Lambda=\lambda\sim\operatorname{Poisson}(\lambda),
\qquad
\Lambda\sim\operatorname{Gamma}(2,3)
$$

とする。ガンマ分布の形状母数は2、率母数は3である。

$$
\begin{aligned}
P(X=k)
&=\int_0^\infty
e^{-\lambda}\frac{\lambda^k}{k!}
9\lambda e^{-3\lambda}\,d\lambda\\
&=\frac9{k!}\int_0^\infty\lambda^{k+1}e^{-4\lambda}\,d\lambda\\
&=\frac{9\Gamma(k+2)}{k!4^{k+2}}\\
&=\frac{9(k+1)}{4^{k+2}}.
\end{aligned}
$$

また

$$
E[X]=\frac23,\qquad
\operatorname{Var}(X)=\frac23+\frac29=\frac89.
$$

### 8.3 正規混合の観測後成分確率

$$
P(Z=1)=\frac14,\qquad P(Z=2)=\frac34,
$$

$$
X\mid Z=1\sim N(0,1),\qquad
X\mid Z=2\sim N(3,1)
$$

とし、$X=1$ を観測する。標準正規分布の密度を

$$
\phi(t)=\frac1{\sqrt{2\pi}}e^{-t^2/2}
$$

とすると

$$
\begin{aligned}
P(Z=1\mid X=1)
&=\frac{(1/4)\phi(1)}{(1/4)\phi(1)+(3/4)\phi(-2)}\\
&=\frac{\phi(1)}{\phi(1)+3\phi(-2)}\\
&\approx0.599.
\end{aligned}
$$

観測前の成分1の確率は $1/4$ だったが、$x=1$ は成分1の平均0に近いため、観測後の確率は約0.599へ上がる。

---

## 9. 演習

### Level A

#### P3L-A01 全確率

成分を表す確率変数 $Z\in\{1,2\}$ について

$$
P(Z=1)=0.4,\qquad P(Z=2)=0.6
$$

とする。離散型確率変数 $X$ が

$$
P(X=0\mid Z=1)=0.2,\qquad
P(X=0\mid Z=2)=0.5
$$

を満たすとき、$P(X=0)$ を求めよ。

<!-- solution-start -->

**詳細解答**

$Z=1,2$ は排反で全体を尽くすので

$$
\begin{aligned}
P(X=0)
&=P(Z=1)P(X=0\mid Z=1)
+P(Z=2)P(X=0\mid Z=2)\\
&=0.4\cdot0.2+0.6\cdot0.5\\
&=0.38.
\end{aligned}
$$

**本番答案**

$$P(X=0)=0.4\cdot0.2+0.6\cdot0.5=0.38.$$

**採点基準（20点）**

全確率公式10点、代入と結論10点。

<!-- solution-end -->

#### P3L-A02 全期待値

成分を表す確率変数 $Z\in\{1,2\}$ について

$$
P(Z=1)=\frac14,\qquad P(Z=2)=\frac34
$$

とする。確率変数 $X$ の条件付き平均が

$$
E[X\mid Z=1]=2,\qquad E[X\mid Z=2]=6
$$

であるとき、$E[X]$ を求めよ。

<!-- solution-start -->

**詳細解答**

全期待値公式より

$$
\begin{aligned}
E[X]
&=\frac14E[X\mid Z=1]+\frac34E[X\mid Z=2]\\
&=\frac14\cdot2+\frac34\cdot6=5.
\end{aligned}
$$

**本番答案**

$$E[X]=\frac14\cdot2+\frac34\cdot6=5.$$

**採点基準（20点）**

全期待値公式10点、計算10点。

<!-- solution-end -->

#### P3L-A03 全分散

成分を表す確率変数 $Z\in\{1,2\}$ について $P(Z=1)=P(Z=2)=1/2$ とする。確率変数 $X$ が

$$
\operatorname{Var}(X\mid Z=1)=1,\qquad
\operatorname{Var}(X\mid Z=2)=4,
$$

$$
E[X\mid Z=1]=0,\qquad E[X\mid Z=2]=2
$$

を満たすとき、$\operatorname{Var}(X)$ を求めよ。

<!-- solution-start -->

**詳細解答**

条件付き分散の平均は

$$
E\{\operatorname{Var}(X\mid Z)\}
=\frac12\cdot1+\frac12\cdot4=\frac52.
$$

また $E[X]=1$ だから

$$
\operatorname{Var}\{E[X\mid Z]\}
=\frac12(0-1)^2+\frac12(2-1)^2=1.
$$

したがって

$$
\operatorname{Var}(X)=\frac52+1=\frac72.
$$

**本番答案**

$$
\operatorname{Var}(X)
=\frac12(1+4)+\frac12(0-1)^2+\frac12(2-1)^2
=\frac72.
$$

**採点基準（20点）**

成分内分散6点、成分間分散8点、結論6点。

<!-- solution-end -->

#### P3L-A04 観測後の成分確率

成分を表す確率変数 $Z\in\{1,2\}$ について

$$
P(Z=1)=\frac13,\qquad P(Z=2)=\frac23
$$

とする。観測値 $x$ における条件付き確率質量または密度が

$$
g_1(x)=\frac12,\qquad g_2(x)=\frac14
$$

であるとき、$P(Z=1\mid X=x)$ を求めよ。

<!-- solution-start -->

**詳細解答**

ベイズの定理より

$$
\begin{aligned}
P(Z=1\mid X=x)
&=\frac{(1/3)(1/2)}{(1/3)(1/2)+(2/3)(1/4)}\\
&=\frac{1/6}{1/3}=\frac12.
\end{aligned}
$$

**本番答案**

$$P(Z=1\mid X=x)=\frac{(1/3)(1/2)}{(1/3)(1/2)+(2/3)(1/4)}=\frac12.$$

**採点基準（20点）**

分子6点、周辺分母8点、結論6点。

<!-- solution-end -->

### Level B

#### P3L-B01 二成分ポアソン混合

$Z\in\{1,2\}$、$P(Z=1)=1/3$、$P(Z=2)=2/3$ とする。条件付き分布を

$$
X\mid Z=1\sim\operatorname{Poisson}(1),\qquad
X\mid Z=2\sim\operatorname{Poisson}(4)
$$

とする。ポアソン分布の確率質量関数は

$$
P(X=k\mid\lambda)=e^{-\lambda}\frac{\lambda^k}{k!},
\qquad k=0,1,2,\ldots,\ \lambda>0
$$

であり、平均・分散はいずれも $\lambda$ である。

1. $P(X=k)$ を求めよ。
2. $E[X]$ を求めよ。
3. $\operatorname{Var}(X)$ を求めよ。

<!-- solution-start -->

**詳細解答**

全確率公式より

$$
P(X=k)
=\frac13e^{-1}\frac{1^k}{k!}
+\frac23e^{-4}\frac{4^k}{k!}.
$$

全期待値公式より

$$E[X]=\frac13\cdot1+\frac23\cdot4=3.$$

全分散公式では

$$
E\{\operatorname{Var}(X\mid Z)\}=3
$$

であり、成分平均の分散は

$$
\frac13(1-3)^2+\frac23(4-3)^2=2.
$$

したがって

$$\operatorname{Var}(X)=3+2=5.$$

**本番答案**

$$
P(X=k)=\frac13e^{-1}\frac1{k!}+\frac23e^{-4}\frac{4^k}{k!},
\quad E[X]=3,\quad \operatorname{Var}(X)=5.
$$

**採点基準（20点）**

周辺確率質量関数7点、平均5点、全分散8点。

<!-- solution-end -->

#### P3L-B02 ポアソン–ガンマ混合

潜在率 $\Lambda$ が形状母数2、率母数3のガンマ分布に従い、

$$
f_\Lambda(\lambda)=9\lambda e^{-3\lambda},\qquad \lambda>0
$$

とする。$\Lambda=\lambda$ の下で

$$
P(X=k\mid\Lambda=\lambda)
=e^{-\lambda}\frac{\lambda^k}{k!},
\qquad k=0,1,2,\ldots
$$

とする。

1. $P(X=k)$ を積分で表せ。
2. 積分を実行して $P(X=k)$ を求めよ。
3. $E[X]$ と $\operatorname{Var}(X)$ を求めよ。なお $E[\Lambda]=2/3$、$\operatorname{Var}(\Lambda)=2/9$ を用いてよい。

<!-- solution-start -->

**詳細解答**

$$
\begin{aligned}
P(X=k)
&=\int_0^\infty e^{-\lambda}\frac{\lambda^k}{k!}
9\lambda e^{-3\lambda}\,d\lambda\\
&=\frac9{k!}\int_0^\infty\lambda^{k+1}e^{-4\lambda}\,d\lambda.
\end{aligned}
$$

$t=4\lambda$ と置けば

$$
\int_0^\infty\lambda^{k+1}e^{-4\lambda}\,d\lambda
=\frac{\Gamma(k+2)}{4^{k+2}}.
$$

よって

$$
P(X=k)
=\frac{9\Gamma(k+2)}{k!4^{k+2}}
=\frac{9(k+1)}{4^{k+2}}.
$$

また

$$E[X]=E[\Lambda]=\frac23,$$

$$
\operatorname{Var}(X)
=E[\Lambda]+\operatorname{Var}(\Lambda)
=\frac23+\frac29=\frac89.
$$

**本番答案**

$$
P(X=k)=\frac{9(k+1)}{4^{k+2}},\qquad
E[X]=\frac23,\qquad
\operatorname{Var}(X)=\frac89.
$$

**採点基準（20点）**

積分の立式6点、ガンマ積分6点、平均4点、分散4点。

<!-- solution-end -->

#### P3L-B03 正規混合の平均・分散

$Z\in\{1,2\}$、$P(Z=1)=\pi$、$P(Z=2)=1-\pi$、$0\le\pi\le1$ とする。条件付き分布を

$$
X\mid Z=1\sim N(0,1),\qquad X\mid Z=2\sim N(3,1)
$$

とする。$N(\mu,1)$ の確率密度関数は

$$
f(x)=\frac1{\sqrt{2\pi}}e^{-(x-\mu)^2/2},\qquad x\in\mathbb R
$$

で、平均は $\mu$、分散は1である。

1. $E[X]$ と $\operatorname{Var}(X)$ を求めよ。
2. $\operatorname{Var}(X)>1$ となる $\pi$ の範囲を求めよ。
3. $E[X]=1$ となる $\pi$ を求めよ。

<!-- solution-start -->

**詳細解答**

$$E[X]=\pi\cdot0+(1-\pi)\cdot3=3(1-\pi).$$

全分散公式より

$$
\operatorname{Var}(X)
=1+\pi(1-\pi)(0-3)^2
=1+9\pi(1-\pi).
$$

したがって $\operatorname{Var}(X)>1$ は

$$\pi(1-\pi)>0$$

と同値なので

$$0<\pi<1.$$

また $3(1-\pi)=1$ から

$$\pi=\frac23.$$

**本番答案**

$$E[X]=3(1-\pi),\qquad \operatorname{Var}(X)=1+9\pi(1-\pi).$$

従って $0<\pi<1$ で分散は1より大きく、$E[X]=1$ なら $\pi=2/3$。

**採点基準（20点）**

平均5点、全分散8点、範囲3点、$\pi=2/3$ 4点。

<!-- solution-end -->

#### P3L-B04 正規混合の観測後成分確率

$Z\in\{1,2\}$、$P(Z=1)=1/4$、$P(Z=2)=3/4$ とする。条件付き分布を

$$
X\mid Z=1\sim N(0,1),\qquad X\mid Z=2\sim N(3,1)
$$

とする。標準正規分布の密度を

$$
\phi(t)=\frac1{\sqrt{2\pi}}e^{-t^2/2}
$$

とする。

1. $\tau_1(x)=P(Z=1\mid X=x)$ を求めよ。
2. $\tau_1(0)$ と $\tau_1(3)$ の大小を比較せよ。
3. $\tau_1(3/2)$ を求め、$1/2$ にならない理由を述べよ。

<!-- solution-start -->

**詳細解答**

ベイズの定理から

$$
\tau_1(x)
=\frac{(1/4)\phi(x)}{(1/4)\phi(x)+(3/4)\phi(x-3)}
=\frac{\phi(x)}{\phi(x)+3\phi(x-3)}.
$$

$x=0$ では

$$
\tau_1(0)
=\frac1{1+3e^{-9/2}}
\approx0.9677.
$$

$x=3$ では

$$
\tau_1(3)
=\frac{e^{-9/2}}{e^{-9/2}+3}
\approx0.00369.
$$

したがって $\tau_1(0)>\tau_1(3)$ である。

$x=3/2$ では二成分の密度が等しいため

$$
\tau_1(3/2)=\frac{1/4}{1/4+3/4}=\frac14.
$$

尤度が等しくても、観測前の成分確率が $1/4$ と $3/4$ で異なるので、観測後の確率は $1/2$ にならない。

**本番答案**

$$
\tau_1(x)=\frac{\phi(x)}{\phi(x)+3\phi(x-3)},
\quad
\tau_1(0)>\tau_1(3),
\quad
\tau_1(3/2)=\frac14.
$$

**採点基準（20点）**

ベイズ公式8点、$x=0,3$ の比較7点、$x=3/2$ と理由5点。

<!-- solution-end -->

### Level C

#### P3L-C01 ポアソン–ガンマ混合から推定へ

$\Lambda_1,\ldots,\Lambda_n$ は独立で同じガンマ分布に従い、その確率密度関数を

$$
f_\Lambda(\lambda)
=\frac{\beta^\alpha}{\Gamma(\alpha)}
\lambda^{\alpha-1}e^{-\beta\lambda},
\qquad \lambda>0,\ \alpha>0,\ \beta>0
$$

とする。各 $i$ について、$\Lambda_i$ を与えたとき $X_i$ は互いに条件付き独立で

$$
P(X_i=k\mid\Lambda_i=\lambda)
=e^{-\lambda}\frac{\lambda^k}{k!},
\qquad k=0,1,2,\ldots
$$

とする。$\overline X=n^{-1}\sum_{i=1}^nX_i$ と定義する。

1. $P(X_i=k)$ を求めよ。
2. $E[X_i]$ と $\operatorname{Var}(X_i)$ を求めよ。ただし $E[\Lambda_i]=\alpha/\beta$、$\operatorname{Var}(\Lambda_i)=\alpha/\beta^2$ を用いてよい。
3. $\overline X$ が $E[X_i]$ の不偏推定量であることを示せ。
4. $\beta$ が既知のとき、$\alpha$ のモーメント推定量を求めよ。
5. $\operatorname{Var}(\overline X)$ を求め、チェビシェフの不等式
$$
P(|Y-E[Y]|\ge\varepsilon)
\le\frac{\operatorname{Var}(Y)}{\varepsilon^2}
$$
を用いて $\overline X\xrightarrow{p}\alpha/\beta$ を示せ。

<!-- solution-start -->

**詳細解答**

周辺確率質量関数は

$$
\begin{aligned}
P(X_i=k)
&=\int_0^\infty e^{-\lambda}\frac{\lambda^k}{k!}
\frac{\beta^\alpha}{\Gamma(\alpha)}
\lambda^{\alpha-1}e^{-\beta\lambda}\,d\lambda\\
&=\frac{\beta^\alpha\Gamma(k+\alpha)}
{k!\Gamma(\alpha)(\beta+1)^{k+\alpha}}.
\end{aligned}
$$

全期待値・全分散から

$$
E[X_i]=\frac{\alpha}{\beta},
$$

$$
\operatorname{Var}(X_i)
=\frac{\alpha}{\beta}+\frac{\alpha}{\beta^2}.
$$

よって

$$
E[\overline X]
=\frac1n\sum_{i=1}^nE[X_i]
=\frac{\alpha}{\beta},
$$

したがって $\overline X$ は $E[X_i]$ の不偏推定量である。

モーメント方程式 $\overline X=\alpha/\beta$ を $\alpha$ について解けば

$$
\widehat\alpha=\beta\overline X.
$$

$X_i$ は独立なので

$$
\operatorname{Var}(\overline X)
=\frac1n\left(
\frac{\alpha}{\beta}+\frac{\alpha}{\beta^2}
\right)
=\frac{\alpha(\beta+1)}{n\beta^2}.
$$

任意の $\varepsilon>0$ に対して

$$
P\left(
\left|\overline X-\frac{\alpha}{\beta}\right|\ge\varepsilon
\right)
\le
\frac{\alpha(\beta+1)}{n\beta^2\varepsilon^2}
\to0.
$$

従って $\overline X\xrightarrow{p}\alpha/\beta$ である。

**本番答案**

$$
P(X_i=k)=
\frac{\beta^\alpha\Gamma(k+\alpha)}
{k!\Gamma(\alpha)(\beta+1)^{k+\alpha}},
$$

$$
E[X_i]=\frac\alpha\beta,\quad
\operatorname{Var}(X_i)=\frac\alpha\beta+\frac\alpha{\beta^2},\quad
\widehat\alpha=\beta\overline X,
$$

$$
\operatorname{Var}(\overline X)
=\frac{\alpha(\beta+1)}{n\beta^2}
$$

よりチェビシェフの不等式の右辺は0へ収束する。

**採点基準（20点）**

周辺化5点、モーメント4点、不偏性3点、推定量3点、分散と確率収束5点。

<!-- solution-end -->

#### P3L-C02 二成分ポアソン混合と予測

$Z\in\{1,2\}$、$P(Z=1)=\pi$、$P(Z=2)=1-\pi$ とする。$Z$ を与えたとき $X,Y$ は条件付き独立で、共通の成分に従うとする。具体的に

$$
P(X=k\mid Z=1)=e^{-2}\frac{2^k}{k!},
\qquad
P(X=k\mid Z=2)=e^{-5}\frac{5^k}{k!}
$$

であり、$Y$ も $Z=1$ なら率2、$Z=2$ なら率5のポアソン分布に従う。

1. $P(X=3)$ を求めよ。
2. $\tau_1=P(Z=1\mid X=3)$ を求めよ。
3. $P(Y=0\mid X=3)$ を $\tau_1$ で表せ。
4. $\pi=1/2$ のとき $P(Y=0\mid X=3)$ を求めよ。
5. 観測後の予測で観測前の混合比をそのまま使えない理由を説明せよ。

<!-- solution-start -->

**詳細解答**

$$
P(X=3)
=\pi e^{-2}\frac{2^3}{3!}
+(1-\pi)e^{-5}\frac{5^3}{3!}.
$$

ベイズの定理から

$$
\tau_1
=\frac{\pi e^{-2}2^3}{\pi e^{-2}2^3+(1-\pi)e^{-5}5^3}.
$$

$X,Y$ は $Z$ を与えれば独立なので

$$
P(Y=0\mid X=3)
=\tau_1e^{-2}+(1-\tau_1)e^{-5}.
$$

$\pi=1/2$ では

$$
\tau_1=\frac{8e^3}{8e^3+125}.
$$

従って

$$
\begin{aligned}
P(Y=0\mid X=3)
&=\frac{8e^3}{8e^3+125}e^{-2}
+\frac{125}{8e^3+125}e^{-5}\\
&=\frac{8e+125e^{-5}}{8e^3+125}\\
&\approx0.0791.
\end{aligned}
$$

観測 $X=3$ の出やすさは二成分で異なるので、観測後の成分確率は $\pi,1-\pi$ から $\tau_1,1-\tau_1$ へ更新される。

**本番答案**

$$
\tau_1
=\frac{\pi e^{-2}2^3}{\pi e^{-2}2^3+(1-\pi)e^{-5}5^3},
$$

$$
P(Y=0\mid X=3)=\tau_1e^{-2}+(1-\tau_1)e^{-5}.
$$

$\pi=1/2$ では $P(Y=0\mid X=3)\approx0.0791$。

**採点基準（20点）**

周辺確率4点、観測後成分確率5点、予測式5点、数値計算4点、説明2点。

<!-- solution-end -->

#### P3L-C03 正規混合と分類

$Z\in\{1,2\}$、$P(Z=1)=P(Z=2)=1/2$ とする。条件付き分布を

$$
X\mid Z=1\sim N(-1,1),\qquad
X\mid Z=2\sim N(1,1)
$$

とする。$N(\mu,1)$ の密度は

$$
f(x)=\frac1{\sqrt{2\pi}}e^{-(x-\mu)^2/2}
$$

である。標準正規分布の累積分布関数を

$$
\Phi(t)=P(W\le t),\qquad W\sim N(0,1)
$$

とする。標本平均を $\overline X=n^{-1}\sum_{i=1}^nX_i$ とする。

1. $\tau_2(x)=P(Z=2\mid X=x)$ を求めよ。
2. $\tau_2(x)>1/2$ となる $x$ の範囲を求めよ。
3. $\tau_2(x)>1/2$ なら成分2、それ以外なら成分1と分類するとき、誤分類確率を $\Phi$ で表せ。
4. $E[X]$ と $\operatorname{Var}(X)$ を求めよ。
5. 成分平均 $-1,1$ が既知で混合比 $\pi=P(Z=1)$ が未知の場合、$\overline X$ を使うモーメント推定量を求め、$[0,1]$ に制約する形も書け。

<!-- solution-start -->

**詳細解答**

等しい混合比なので

$$
\tau_2(x)
=\frac{\phi(x-1)}{\phi(x+1)+\phi(x-1)}.
$$

従って

$$
\tau_2(x)>\frac12
\iff \phi(x-1)>\phi(x+1)
\iff (x-1)^2<(x+1)^2
\iff x>0.
$$

成分1を成分2へ誤分類する確率は

$$
P_{N(-1,1)}(X>0)=1-\Phi(1)=\Phi(-1).
$$

成分2側も対称性から $\Phi(-1)$ なので、混合比が1/2ずつの全誤分類確率も

$$\Phi(-1).$$

全期待値・全分散から

$$E[X]=0,$$

$$
\operatorname{Var}(X)=1+\frac12\frac12(-1-1)^2=2.
$$

一般の混合比 $\pi=P(Z=1)$ では

$$E[X]=-\pi+(1-\pi)=1-2\pi.$$

よって形式的なモーメント推定量は

$$
\widehat\pi_0=\frac{1-\overline X}{2}.
$$

母数範囲へ制約するなら

$$
\widehat\pi
=\min\{1,\max\{0,\widehat\pi_0\}\}.
$$

**本番答案**

$$
\tau_2(x)=\frac{\phi(x-1)}{\phi(x+1)+\phi(x-1)},
\qquad \tau_2(x)>1/2\iff x>0.
$$

誤分類確率は $\Phi(-1)$、$E[X]=0$、$\operatorname{Var}(X)=2$、

$$\widehat\pi_0=(1-\overline X)/2.$$

**採点基準（20点）**

観測後成分確率4点、境界4点、誤分類4点、モーメント4点、推定量4点。

<!-- solution-end -->

#### P3L-C04 潜在指標が観測される場合とされない場合

$(X_i,Z_i)$、$i=1,\ldots,n$ は互いに独立で同じ分布に従うとする。$Z_i\in\{1,2\}$、$P(Z_i=1)=\pi$、$P(Z_i=2)=1-\pi$ とする。条件付き分布は

$$
X_i\mid Z_i=j\sim N(\mu_j,1),
\qquad \mu_1=0,\ \mu_2=2
$$

で、成分 $j$ の密度を

$$
f_j(x)=\frac1{\sqrt{2\pi}}e^{-(x-\mu_j)^2/2}
$$

とする。また

$$I_i:=\boldsymbol{1}_{\{Z_i=1\}}$$

と定義する。

1. $Z_i$ まで観測されたときの完全データ尤度を書け。
2. 成分1の観測数を $n_1=\sum_{i=1}^nI_i$ とする。$\pi$ の最尤推定量を、$n_1=0,n$ の場合も含めて求めよ。
3. $Z_i$ が観測されないときの観測データ尤度を書け。
4. 現在の $\pi=1/2$ の下で $X_i=x_i$ を観測したとき、$\tau_{i1}=P(Z_i=1\mid X_i=x_i)$ を求めよ。
5. $I_i$ を $\tau_{i1}$ に置き換える意味を説明せよ。

<!-- solution-start -->

**詳細解答**

完全データ尤度は独立性から

$$
L_c(\pi)
=\prod_{i=1}^n
\{\pi f_1(x_i)\}^{I_i}
\{(1-\pi)f_2(x_i)\}^{1-I_i}.
$$

対数尤度のうち $\pi$ を含む部分は

$$
\ell_c(\pi)
=n_1\log\pi+(n-n_1)\log(1-\pi).
$$

$0<n_1<n$ では

$$
\ell_c'(\pi)
=\frac{n_1}{\pi}-\frac{n-n_1}{1-\pi}=0
$$

より

$$\widehat\pi=\frac{n_1}{n}.$$

$n_1=0$ なら $\widehat\pi=0$、$n_1=n$ なら $\widehat\pi=1$ である。

$Z_i$ が見えない場合、各観測の周辺密度は

$$
\pi f_1(x_i)+(1-\pi)f_2(x_i)
$$

だから

$$
L(\pi)=\prod_{i=1}^n
\{\pi f_1(x_i)+(1-\pi)f_2(x_i)\}.
$$

$\pi=1/2$ では

$$
\tau_{i1}
=\frac{f_1(x_i)}{f_1(x_i)+f_2(x_i)}.
$$

さらに

$$
E[I_i\mid X_i=x_i]
=P(Z_i=1\mid X_i=x_i)
=\tau_{i1}.
$$

従って責務は、観測できない所属指示変数を観測値から推定した条件付き平均である。

**本番答案**

$$
L_c=\prod_i\{\pi f_1(x_i)\}^{I_i}\{(1-\pi)f_2(x_i)\}^{1-I_i},
\qquad
\widehat\pi=\frac{n_1}{n},
$$

$$
L=\prod_i\{\pi f_1(x_i)+(1-\pi)f_2(x_i)\},
\qquad
\tau_{i1}=\frac{f_1(x_i)}{f_1(x_i)+f_2(x_i)}.
$$

**採点基準（20点）**

完全尤度4点、最尤推定5点、境界2点、観測尤度4点、責務と解釈5点。

<!-- solution-end -->

#### P3L-C05 混合モデルの識別可能性

二成分正規混合

$$
\pi N(\mu_1,1)+(1-\pi)N(\mu_2,1),
\qquad 0<\pi<1
$$

を考える。$N(\mu,1)$ の密度は

$$
f(x;\mu)=\frac1{\sqrt{2\pi}}e^{-(x-\mu)^2/2}
$$

である。

1. 成分1と成分2を交換しても同じ混合密度になることを示せ。
2. $\mu_1<\mu_2$ という制約がラベル交換を除く理由を説明せよ。
3. $E[X]$ と $\operatorname{Var}(X)$ を求めよ。
4. 平均と分散だけでは一般に $\pi,\mu_1,\mu_2$ を一意に定められないことを、異なる二組の母数で同じ平均0・分散2を作って示せ。
5. 実データへ正規混合を当てはめる際に確認したいモデル上の注意を2つ挙げよ。

<!-- solution-start -->

**詳細解答**

混合密度は

$$
g(x)=\pi f(x;\mu_1)+(1-\pi)f(x;\mu_2).
$$

$(\pi,\mu_1,\mu_2)$ を $(1-\pi,\mu_2,\mu_1)$ へ交換すると

$$
(1-\pi)f(x;\mu_2)+\pi f(x;\mu_1)=g(x)
$$

で変わらない。$\mu_1<\mu_2$ と順序を固定すれば、この単なる名前交換を除ける。

全期待値・全分散から

$$
E[X]=\pi\mu_1+(1-\pi)\mu_2,
$$

$$
\operatorname{Var}(X)
=1+\pi(1-\pi)(\mu_1-\mu_2)^2.
$$

まず

$$
(\pi,\mu_1,\mu_2)=\left(\frac12,-1,1\right)
$$

は平均0、分散2を与える。

次に

$$
\pi=\frac14,\qquad d=\frac4{\sqrt3},\qquad
\mu_1=-\frac{3d}{4},\qquad \mu_2=\frac d4
$$

とする。このとき

$$
\frac14\mu_1+\frac34\mu_2=0
$$

であり、$\mu_1-\mu_2=-d$ だから

$$
\operatorname{Var}(X)
=1+\frac14\frac34d^2
=1+\frac3{16}\frac{16}{3}=2.
$$

異なる母数が同じ平均・分散を与えるので、二つのモーメントだけでは三母数を一意に定められない。

モデル上の注意として、例えば次がある。

- 成分数を増やしすぎると、偶然の小集団や外れ値を別成分として拾うことがある。
- 各成分を正規分布とする仮定や、共通分散などの制約がデータに合っているか確認する必要がある。

**本番答案**

ラベル交換

$$
(\pi,\mu_1,\mu_2)\mapsto(1-\pi,\mu_2,\mu_1)
$$

で混合密度は不変。

$$
E[X]=\pi\mu_1+(1-\pi)\mu_2,\qquad
\operatorname{Var}(X)=1+\pi(1-\pi)(\mu_1-\mu_2)^2.
$$

$(1/2,-1,1)$ と $(1/4,-3d/4,d/4)$、$d=4/\sqrt3$ はともに平均0・分散2を与える。

**採点基準（20点）**

ラベル交換4点、順序制約3点、モーメント5点、反例5点、モデル上の注意3点。

<!-- solution-end -->

### Level D

#### P3L-D01 ポアソン–ガンマ混合の総合問題

$\Lambda_1,\ldots,\Lambda_n$ は独立で同じガンマ分布に従い、

$$
f_\Lambda(\lambda)
=\frac{\beta^\alpha}{\Gamma(\alpha)}
\lambda^{\alpha-1}e^{-\beta\lambda},
\qquad \lambda>0,\ \alpha>0,\ \beta>0
$$

とする。各 $i$ について、$\Lambda_i$ を与えたとき $X_i$ は互いに条件付き独立で

$$
P(X_i=k\mid\Lambda_i=\lambda)
=e^{-\lambda}\frac{\lambda^k}{k!},
\qquad k=0,1,2,\ldots
$$

とする。$\overline X=n^{-1}\sum_{i=1}^nX_i$ とし、まず $\beta$ は既知とする。

さらに第4問では、$X_1$ と同じ潜在率 $\Lambda_1$ を共有する再観測 $Y$ を考え、$\Lambda_1=\lambda$ を与えたとき $X_1,Y$ は条件付き独立で

$$
P(Y=k\mid\Lambda_1=\lambda)
=e^{-\lambda}\frac{\lambda^k}{k!}
$$

とする。

1. $X_i$ の周辺確率質量関数を求めよ。
2. $E[X_i]$、$\operatorname{Var}(X_i)$、$\operatorname{Var}(\overline X)$ を求めよ。
3. $\widehat\alpha=\beta\overline X$ が不偏で、$\alpha$ に確率収束することを示せ。チェビシェフの不等式を用いてよい。
4. $X_1=x$ を観測した後の $P(Y=0\mid X_1=x)$ を求めよ。
5. $\beta$ も未知とする。平均だけでは $\alpha,\beta$ を分離できないことを説明し、平均 $m=E[X]$ と分散 $v=\operatorname{Var}(X)$ が分かるとき、$\alpha,\beta$ を $m,v$ で表せ。

<!-- solution-start -->

**詳細解答**

第1問は潜在率を積分して

$$
\begin{aligned}
P(X_i=k)
&=\int_0^\infty e^{-\lambda}\frac{\lambda^k}{k!}
\frac{\beta^\alpha}{\Gamma(\alpha)}
\lambda^{\alpha-1}e^{-\beta\lambda}\,d\lambda\\
&=\frac{\beta^\alpha\Gamma(k+\alpha)}
{k!\Gamma(\alpha)(\beta+1)^{k+\alpha}}.
\end{aligned}
$$

全期待値・全分散から

$$
E[X_i]=\frac\alpha\beta,\qquad
\operatorname{Var}(X_i)=\frac\alpha\beta+\frac\alpha{\beta^2}.
$$

$X_i$ は独立なので

$$
\operatorname{Var}(\overline X)
=\frac{\alpha(\beta+1)}{n\beta^2}.
$$

$\widehat\alpha=\beta\overline X$ について

$$
E[\widehat\alpha]=\alpha,
$$

$$
\operatorname{Var}(\widehat\alpha)
=\beta^2\operatorname{Var}(\overline X)
=\frac{\alpha(\beta+1)}n.
$$

したがって任意の $\varepsilon>0$ に対して

$$
P(|\widehat\alpha-\alpha|\ge\varepsilon)
\le\frac{\alpha(\beta+1)}{n\varepsilon^2}
\to0.
$$

第4問では、$X_1=x$ の尤度とガンマ事前密度の積は

$$
\lambda^xe^{-\lambda}\lambda^{\alpha-1}e^{-\beta\lambda}
=\lambda^{\alpha+x-1}e^{-(\beta+1)\lambda}
$$

に比例する。正規化すると

$$
\Lambda_1\mid X_1=x
\sim\operatorname{Gamma}(\alpha+x,\beta+1).
$$

よって

$$
\begin{aligned}
P(Y=0\mid X_1=x)
&=E[e^{-\Lambda_1}\mid X_1=x]\\
&=\int_0^\infty e^{-\lambda}
\frac{(\beta+1)^{\alpha+x}}{\Gamma(\alpha+x)}
\lambda^{\alpha+x-1}e^{-(\beta+1)\lambda}\,d\lambda\\
&=\left(\frac{\beta+1}{\beta+2}\right)^{\alpha+x}.
\end{aligned}
$$

第5問で

$$
m=E[X]=\frac\alpha\beta,
$$

$$
v=\operatorname{Var}(X)
=\frac\alpha\beta+\frac\alpha{\beta^2}
$$

と置く。平均だけでは比 $\alpha/\beta$ しか分からない。

$$
q:=v-m=\frac\alpha{\beta^2}>0
$$

とすると

$$
\beta=\frac{m}{q}=\frac{m}{v-m},
$$

$$
\alpha=m\beta=\frac{m^2}{v-m}.
$$

**本番答案**

$$
P(X_i=k)
=\frac{\beta^\alpha\Gamma(k+\alpha)}{k!\Gamma(\alpha)(\beta+1)^{k+\alpha}},
$$

$$
E[X_i]=\frac\alpha\beta,\quad
\operatorname{Var}(X_i)=\frac\alpha\beta+\frac\alpha{\beta^2},\quad
\operatorname{Var}(\overline X)=\frac{\alpha(\beta+1)}{n\beta^2}.
$$

$\widehat\alpha=\beta\overline X$ は不偏で、チェビシェフの不等式により $\widehat\alpha\xrightarrow{p}\alpha$。

$$
P(Y=0\mid X_1=x)
=\left(\frac{\beta+1}{\beta+2}\right)^{\alpha+x}.
$$

また

$$
\beta=\frac{m}{v-m},\qquad
\alpha=\frac{m^2}{v-m}.
$$

**採点基準（20点）**

周辺化4点、モーメント4点、不偏性・一致性4点、事後予測5点、二母数の分離3点。

<!-- solution-end -->

---

## 10. 30分ドリル

### P3L-DRILL-01

$\Lambda_1,\ldots,\Lambda_n$ は独立で同じガンマ分布に従い、

$$
f_\Lambda(\lambda)
=\frac{\beta^\alpha}{\Gamma(\alpha)}
\lambda^{\alpha-1}e^{-\beta\lambda},
\qquad \lambda>0,\ \alpha>0,\ \beta>0
$$

とする。各 $i$ について、$\Lambda_i$ を与えたとき $X_i$ は互いに条件付き独立で

$$
P(X_i=k\mid\Lambda_i=\lambda)
=e^{-\lambda}\frac{\lambda^k}{k!},
\qquad k=0,1,2,\ldots
$$

とする。$\overline X=n^{-1}\sum_{i=1}^nX_i$ とし、$\beta$ は既知とする。

第5問では、$X_1$ と同じ潜在率 $\Lambda_1$ を共有する $Y$ を考え、$\Lambda_1$ を与えたとき $X_1,Y$ は条件付き独立で、$Y$ も率 $\Lambda_1$ のポアソン分布に従う。

1. $P(X_i=k)$ を求めよ。（20点）
2. $E[X_i]$ と $\operatorname{Var}(X_i)$ を求めよ。（20点）
3. $\widehat\alpha=\beta\overline X$ と定義する。$E[\widehat\alpha]$ と $\operatorname{Var}(\widehat\alpha)$ を求めよ。（20点）
4. チェビシェフの不等式を用いて $\widehat\alpha\xrightarrow{p}\alpha$ を示せ。（20点）
5. $X_1=x$ を観測した後の $P(Y=0\mid X_1=x)$ を求めよ。（20点）

<!-- solution-start -->

**詳細解答**

第1問は

$$
\begin{aligned}
P(X_i=k)
&=\frac{\beta^\alpha}{k!\Gamma(\alpha)}
\int_0^\infty\lambda^{k+\alpha-1}e^{-(\beta+1)\lambda}\,d\lambda\\
&=\frac{\beta^\alpha\Gamma(k+\alpha)}{k!\Gamma(\alpha)(\beta+1)^{k+\alpha}}.
\end{aligned}
$$

第2問は

$$
E[X_i]=\frac\alpha\beta,\qquad
\operatorname{Var}(X_i)=\frac\alpha\beta+\frac\alpha{\beta^2}.
$$

第3問は

$$
E[\widehat\alpha]=\alpha,
$$

$$
\operatorname{Var}(\widehat\alpha)
=\frac{\alpha(\beta+1)}n.
$$

第4問は

$$
P(|\widehat\alpha-\alpha|\ge\varepsilon)
\le\frac{\alpha(\beta+1)}{n\varepsilon^2}\to0.
$$

第5問では

$$
\Lambda_1\mid X_1=x
\sim\operatorname{Gamma}(\alpha+x,\beta+1)
$$

となるので

$$
P(Y=0\mid X_1=x)
=\left(\frac{\beta+1}{\beta+2}\right)^{\alpha+x}.
$$

**完成形答案**

$$
P(X_i=k)
=\frac{\beta^\alpha\Gamma(k+\alpha)}{k!\Gamma(\alpha)(\beta+1)^{k+\alpha}},
$$

$$
E[X_i]=\frac\alpha\beta,\quad
\operatorname{Var}(X_i)=\frac\alpha\beta+\frac\alpha{\beta^2},
$$

$$
E[\widehat\alpha]=\alpha,\quad
\operatorname{Var}(\widehat\alpha)=\frac{\alpha(\beta+1)}n,
$$

$$
\widehat\alpha\xrightarrow{p}\alpha,\qquad
P(Y=0\mid X_1=x)=\left(\frac{\beta+1}{\beta+2}\right)^{\alpha+x}.
$$

<!-- solution-end -->

---

## 11. 過去問演習への接続

混合分布では、条件付き分布から周辺分布へ移る計算と、得られた分布のモーメントを後続小問で再利用する流れが重要になる。

| 参照 | 確認する論点 |
|---|---|
| MATH-2022-Q3 | ポアソン分布とガンマ分布の混合、周辺化、平均・分散 |
| MATH-2024-Q4 | 混合分布、潜在成分を消去した周辺分布の解釈 |

公式問題集または公式問題ページの問題文を使い、条件付き分布、周辺化、モーメントの順に自分で立式する。