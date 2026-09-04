# P3-05 重尾・切断・寿命派生分布

裾の減衰が遅いパレート分布、左右対称なLaplace分布、Rayleigh分布を扱い、そこから寿命データの切断・打切り、生存関数、ハザード、累積ハザード、平均残存寿命へ進みます。分布の式を並べるのではなく、尾確率・条件付き分布・尤度寄与の違いを計算から確認します。

本章は [通常教材の執筆スタイルガイド](../../../style-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md)、[共通記号ガイド](../../../../references/notation-guide.md)、[共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md) に従います。

## この章で解けるようになる問題

- パレート分布の尾確率からモーメントの存在条件を判定する。
- Laplace分布とRayleigh分布の累積分布関数・モーメントを導く。
- 切断分布を条件付き分布として正規化する。
- 打切りデータで故障と生存の尤度寄与を区別する。
- 生存関数から確率密度関数、ハザード、累積ハザードを相互に変換する。
- 平均残存寿命を生存関数から計算する。
- ワイブル分布の形状母数とハザードの増減を結び付ける。

## 公式出題範囲との対応

| 範囲 | 本章の内容 |
|---|---|
| 重い尾をもつ分布 | パレート分布、モーメントの存在条件 |
| 派生的な連続分布 | Laplace分布、Rayleigh分布 |
| 切断・打切り | 条件付き密度、右打切り尤度 |
| 寿命分布 | 生存関数、ハザード、累積ハザード、平均残存寿命 |
| ワイブル分布 | ハザードの増減と形状母数 |

## 前提知識チェック

1. P2-01: 累積分布関数・確率密度関数と条件付き分布を使う。
2. P2-02: 期待値、モーメント、尤度の積に必要な基本計算を使う。
3. P3-02: 指数分布・ワイブル分布とハザードの基本を使う。
4. F0-00: 広義積分、置換積分、ガンマ関数を確認する。

---

## 1. パレート分布と重い尾

$X\sim\operatorname{Pareto}(x_m,\alpha)$、$x_m>0,\alpha>0$ とする。確率密度関数を

$$
f(x)=\alpha x_m^\alpha x^{-(\alpha+1)},\qquad x\ge x_m
$$

とする。$x<x_m$ では密度は0である。

$x\ge x_m$ について、生存関数は

$$
\begin{aligned}
S(x)&=P(X>x)\\
&=\int_x^\infty \alpha x_m^\alpha u^{-(\alpha+1)}\,du\\
&=\left(\frac{x_m}{x}\right)^\alpha.
\end{aligned}
$$

したがって累積分布関数は

$$
F(x)=1-\left(\frac{x_m}{x}\right)^\alpha,\qquad x\ge x_m.
$$

### 1.1 モーメントの存在条件

$r>0$ とする。

$$
\begin{aligned}
E[X^r]
&=\alpha x_m^\alpha\int_{x_m}^\infty x^{r-\alpha-1}\,dx.
\end{aligned}
$$

$r<\alpha$ なら

$$
\begin{aligned}
E[X^r]
&=\alpha x_m^\alpha
\left[\frac{x^{r-\alpha}}{r-\alpha}\right]_{x_m}^{\infty}\\
&=\frac{\alpha x_m^r}{\alpha-r}.
\end{aligned}
$$

$r=\alpha$ では $1/x$ の積分となり発散し、$r>\alpha$ でも発散する。したがって

- 平均が有限：$\alpha>1$
- 分散が有限：$\alpha>2$

である。

---

## 2. Laplace分布

$X\sim\operatorname{Laplace}(\mu,b)$、$\mu\in\mathbb R,b>0$ とし、

$$
f(x)=\frac1{2b}\exp\left(-\frac{|x-\mu|}{b}\right),\qquad x\in\mathbb R
$$

とする。

$x\le\mu$ では $|x-\mu|=\mu-x$ なので

$$
F(x)=\int_{-\infty}^x\frac1{2b}e^{(u-\mu)/b}\,du
=\frac12e^{(x-\mu)/b}.
$$

$x>\mu$ では右尾を積分して

$$
F(x)=1-\frac12e^{-(x-\mu)/b}.
$$

また、左右それぞれの密度積分は $1/2$ だから全積分は1である。

$Y=X-\mu$ と置くと $Y$ の密度は0について対称なので $E[Y]=0$。さらに

$$
\begin{aligned}
E[Y^2]
&=2\int_0^\infty y^2\frac1{2b}e^{-y/b}\,dy\\
&=b^2\int_0^\infty z^2e^{-z}\,dz\qquad(z=y/b)\\
&=b^2\Gamma(3)=2b^2.
\end{aligned}
$$

したがって

$$
E[X]=\mu,\qquad \operatorname{Var}(X)=2b^2.
$$

---

## 3. Rayleigh分布

$X\sim\operatorname{Rayleigh}(\sigma)$、$\sigma>0$ とし、

$$
f(x)=\frac{x}{\sigma^2}e^{-x^2/(2\sigma^2)},\qquad x\ge0
$$

とする。

$U=X^2/(2\sigma^2)$ と置く。$u\ge0$ なら

$$
\begin{aligned}
P(U\le u)
&=P\left(X\le\sigma\sqrt{2u}\right)\\
&=\int_0^{\sigma\sqrt{2u}}\frac{x}{\sigma^2}e^{-x^2/(2\sigma^2)}\,dx\\
&=1-e^{-u}.
\end{aligned}
$$

$u<0$ では確率は0である。よって $U$ は率1の指数分布に従う。

この関係から

$$
\begin{aligned}
E[X]
&=\sigma\sqrt2\,E[U^{1/2}]\\
&=\sigma\sqrt2\int_0^\infty u^{1/2}e^{-u}\,du\\
&=\sigma\sqrt2\,\Gamma(3/2)
=\sigma\sqrt{\frac\pi2}.
\end{aligned}
$$

---

## 4. 切断と打切り

この二つは観測の仕組みが異なる。

### 4.1 右切断

密度 $f_\theta$ をもつ $X$ について $F_\theta(c)=P_\theta(X\le c)>0$ とする。$X\le c$ の個体だけを標本へ入れるなら、観測される密度は条件付き密度

$$
\boxed{
 f_\theta(x\mid X\le c)
 =\frac{f_\theta(x)}{F_\theta(c)}\boldsymbol1_{\{x\le c\}}
}
$$

である。実際、

$$
\int_{-\infty}^c\frac{f_\theta(x)}{F_\theta(c)}\,dx=1.
$$

### 4.2 右打切り

寿命 $X_i$ と打切り時刻 $c_i$ を考える。観測値を

$$
y_i=\min(X_i,c_i),\qquad
\delta_i=\boldsymbol1_{\{X_i\le c_i\}}
$$

とする。

- $\delta_i=1$：故障時刻 $y_i=X_i$ が観測され、尤度寄与は $f_\theta(y_i)$。
- $\delta_i=0$：分かるのは $X_i>c_i$ だけなので、尤度寄与は $S_\theta(c_i)$。

個体間が独立なら

$$
\boxed{
L(\theta)=\prod_{i=1}^n
f_\theta(y_i)^{\delta_i}S_\theta(c_i)^{1-\delta_i}
}
$$

となる。打切り時刻を故障時刻として $f_\theta(c_i)$ を掛けてはいけない。

---

## 5. 生存関数・ハザード・累積ハザード

非負の寿命変数 $X$ について

$$
S(x)=P(X>x)=1-F(x)
$$

とする。$S(x)>0$ で密度 $f$ が存在すれば

$$
h(x)=\frac{f(x)}{S(x)}.
$$

$S'(x)=-f(x)$ なので

$$
h(x)=-\frac{S'(x)}{S(x)}=-\frac{d}{dx}\log S(x).
$$

累積ハザードを

$$
H(x)=\int_0^x h(u)\,du
$$

とし、$S(0)=1$ とすれば

$$
\boxed{H(x)=-\log S(x)},\qquad
\boxed{S(x)=e^{-H(x)}}.
$$

---

## 6. 平均残存寿命

時刻 $x$ まで生存した個体について、その後あと何時間生きるかの平均を

$$
m(x)=E[X-x\mid X>x]
$$

とする。尾積分公式から

$$
\begin{aligned}
m(x)
&=\int_0^\infty P(X-x>t\mid X>x)\,dt\\
&=\frac1{S(x)}\int_0^\infty S(x+t)\,dt\\
&=\boxed{\frac{\int_x^\infty S(u)\,du}{S(x)}}.
\end{aligned}
$$

---

## 7. ワイブル分布による寿命モデル

$X\sim\operatorname{Weibull}(c,\eta)$、$c>0,\eta>0$ とし、

$$
S(x)=e^{-(x/\eta)^c},\qquad x>0
$$

とする。微分して

$$
f(x)=\frac{c x^{c-1}}{\eta^c}e^{-(x/\eta)^c}.
$$

したがって

$$
\boxed{h(x)=\frac{c x^{c-1}}{\eta^c}},\qquad
\boxed{H(x)=\left(\frac{x}{\eta}\right)^c}.
$$

さらに

$$
h'(x)=\frac{c(c-1)x^{c-2}}{\eta^c}.
$$

よって

- $c>1$：ハザードは増加
- $c=1$：ハザードは一定
- $0<c<1$：ハザードは減少

となる。$c=1$ では指数分布になり、平均残存寿命は常に $\eta$ である。

---

## 8. 例題

### 8.1 パレート分布

$X\sim\operatorname{Pareto}(1,3)$ とする。

$$
P(X>2)=\left(\frac12\right)^3=\frac18.
$$

また

$$
E[X]=\frac32,\qquad
E[X^2]=3,
$$

なので

$$
\operatorname{Var}(X)=3-\left(\frac32\right)^2=\frac34.
$$

### 8.2 指数寿命の右打切り

率 $\lambda>0$ の指数分布で、故障時刻 $t_1,t_2$ と、時刻 $c$ まで故障しなかった1個体を観測する。

$$
\begin{aligned}
L(\lambda)
&=(\lambda e^{-\lambda t_1})(\lambda e^{-\lambda t_2})e^{-\lambda c}\\
&=\lambda^2e^{-\lambda(t_1+t_2+c)}.
\end{aligned}
$$

$T=t_1+t_2+c$ と置けば

$$
\ell'(\lambda)=\frac2\lambda-T
$$

だから

$$
\widehat\lambda=\frac2{t_1+t_2+c}.
$$

### 8.3 ワイブル分布のハザード

$X\sim\operatorname{Weibull}(2,5)$ なら

$$
h(x)=\frac{2x}{25},\qquad
H(x)=\left(\frac{x}{5}\right)^2,
$$

$$
S(5)=e^{-1}.
$$

また

$$
m(5)=e\int_5^\infty e^{-(u/5)^2}\,du
=5e\int_1^\infty e^{-v^2}\,dv.
$$

---

## 9. 問題を解くときの流れ

1. 台と母数範囲を確認する。
2. パレート分布では尾確率を先に求め、べき積分の収束条件を見る。
3. 寿命問題では $S\to f\to h,H$ の順に式を作ると整理しやすい。
4. 切断では条件付き密度を正規化する。
5. 打切りでは故障には密度、打切りには生存確率を割り当てる。

---

## 10. 演習

### Level A

#### P3T-A01 パレート分布の尾

確率変数 $X$ は $x_m=2,\alpha=3$ のパレート分布に従い、

$$
f_X(x)=3\cdot2^3x^{-4},\qquad x\ge2
$$

とする。$P(X>4)$ を求めよ。

<!-- solution-start -->

**詳細解答**

$$
P(X>4)=\int_4^\infty 24x^{-4}\,dx
=\left(\frac24\right)^3=\frac18.
$$

**本番答案**

$$P(X>4)=(2/4)^3=1/8.$$

**採点基準（20点）**

尾確率の式10点、計算10点。

<!-- solution-end -->

#### P3T-A02 パレート分布のモーメント条件

確率変数 $X$ は

$$
f_X(x)=\alpha x_m^\alpha x^{-(\alpha+1)},\qquad x\ge x_m,
$$

$x_m>0,\alpha>0$ のパレート分布に従う。平均が有限となる条件と、分散が有限となる条件をそれぞれ求めよ。

<!-- solution-start -->

**詳細解答**

$r$ 次モーメントでは

$$
E[X^r]=\alpha x_m^\alpha\int_{x_m}^\infty x^{r-\alpha-1}\,dx
$$

が収束する必要がある。これは $r<\alpha$ のときに限る。したがって平均には $\alpha>1$、分散には二次モーメントが必要なので $\alpha>2$ が必要である。

**本番答案**

平均有限は $\alpha>1$、分散有限は $\alpha>2$。

**採点基準（20点）**

$r<\alpha$ の収束条件12点、平均・分散への適用8点。

<!-- solution-end -->

#### P3T-A03 生存関数からハザードへ

非負の寿命変数 $X$ の生存関数が

$$
S(x)=e^{-x/5},\qquad x\ge0
$$

で与えられる。$f(x)=-S'(x)$、$h(x)=f(x)/S(x)$、$H(x)=-\log S(x)$ とする。$f(x),h(x),H(x)$ を求めよ。

<!-- solution-start -->

**詳細解答**

$$
f(x)=-\frac{d}{dx}e^{-x/5}=\frac15e^{-x/5}.
$$

よって

$$
h(x)=\frac15,\qquad H(x)=\frac{x}{5}.
$$

**本番答案**

$$f(x)=\frac15e^{-x/5},\quad h(x)=\frac15,\quad H(x)=x/5.$$

**採点基準（20点）**

密度8点、ハザード6点、累積ハザード6点。

<!-- solution-end -->

#### P3T-A04 指数分布の平均残存寿命

$X$ は率 $1/4$ の指数分布に従い、

$$
f_X(x)=\frac14e^{-x/4},\qquad x\ge0
$$

とする。生存関数を $S(x)=P(X>x)$ とし、平均残存寿命を

$$
m(x)=\frac{\int_x^\infty S(u)\,du}{S(x)}
$$

と定義する。$m(x)$ を求めよ。

<!-- solution-start -->

**詳細解答**

$S(x)=e^{-x/4}$ なので

$$
\begin{aligned}
m(x)
&=\frac{\int_x^\infty e^{-u/4}\,du}{e^{-x/4}}\\
&=\frac{4e^{-x/4}}{e^{-x/4}}=4.
\end{aligned}
$$

**本番答案**

$$m(x)=4.$$

**採点基準（20点）**

生存関数6点、積分8点、結論6点。

<!-- solution-end -->

### Level B

#### P3T-B01 パレート分布のモーメント導出

$X$ は

$$
f_X(x)=\alpha x_m^\alpha x^{-(\alpha+1)},\qquad x\ge x_m,
$$

$x_m>0,\alpha>0$ のパレート分布に従う。$r>0$ とする。

1. 生存関数 $S(x)$ を求めよ。
2. $E[X^r]$ が有限となる条件と、その値を求めよ。
3. $\alpha=3$ のとき平均と分散を求めよ。

<!-- solution-start -->

**詳細解答**

$x\ge x_m$ では

$$
S(x)=\int_x^\infty\alpha x_m^\alpha u^{-(\alpha+1)}\,du
=\left(\frac{x_m}{x}\right)^\alpha.
$$

また

$$
E[X^r]=\alpha x_m^\alpha\int_{x_m}^\infty x^{r-\alpha-1}\,dx.
$$

$r<\alpha$ のときだけ収束し、

$$
E[X^r]=\frac{\alpha x_m^r}{\alpha-r}.
$$

$\alpha=3$ では

$$
E[X]=\frac32x_m,\qquad E[X^2]=3x_m^2,
$$

したがって

$$
\operatorname{Var}(X)=3x_m^2-\frac94x_m^2=\frac34x_m^2.
$$

**本番答案**

$$S(x)=(x_m/x)^\alpha,$$

$$E[X^r]=\frac{\alpha x_m^r}{\alpha-r}\quad(r<\alpha),$$

$$E[X]=3x_m/2,\quad \operatorname{Var}(X)=3x_m^2/4.$$

**採点基準（20点）**

生存関数5点、収束条件と一般モーメント9点、平均・分散6点。

<!-- solution-end -->

#### P3T-B02 Laplace分布

$X\sim\operatorname{Laplace}(\mu,b)$、$\mu\in\mathbb R,b>0$ とし、

$$
f_X(x)=\frac1{2b}e^{-|x-\mu|/b},\qquad x\in\mathbb R
$$

とする。$t\ge0$ とする。

1. 密度の全積分が1であることを示し、累積分布関数 $F(x)=P(X\le x)$ を導出せよ。
2. $E[X]$ と $\operatorname{Var}(X)$ を求めよ。
3. $P(|X-\mu|>t)$ を求めよ。

<!-- solution-start -->

**詳細解答**

左側では

$$
\int_{-\infty}^{\mu}\frac1{2b}e^{(x-\mu)/b}\,dx=\frac12,
$$

右側では

$$
\int_{\mu}^{\infty}\frac1{2b}e^{-(x-\mu)/b}\,dx=\frac12.
$$

よって全積分は1。さらに

$$
F(x)=
\begin{cases}
\frac12e^{(x-\mu)/b},&x\le\mu,\\
1-\frac12e^{-(x-\mu)/b},&x>\mu.
\end{cases}
$$

$Y=X-\mu$ とすると対称性から $E[Y]=0$。また

$$
E[Y^2]=b^2\int_0^\infty z^2e^{-z}\,dz=2b^2.
$$

よって

$$E[X]=\mu,\qquad \operatorname{Var}(X)=2b^2.$$

最後に左右の尾を足して

$$P(|X-\mu|>t)=e^{-t/b}.$$

**本番答案**

$$F(x)=\begin{cases}\frac12e^{(x-\mu)/b},&x\le\mu,\\1-\frac12e^{-(x-\mu)/b},&x>\mu,\end{cases}$$

$$E[X]=\mu,\quad \operatorname{Var}(X)=2b^2,\quad P(|X-\mu|>t)=e^{-t/b}.$$

**採点基準（20点）**

正規化・分布関数8点、平均分散7点、尾確率5点。

<!-- solution-end -->

#### P3T-B03 Rayleigh分布の変換

$X\sim\operatorname{Rayleigh}(\sigma)$、$\sigma>0$ とし、

$$
f_X(x)=\frac{x}{\sigma^2}e^{-x^2/(2\sigma^2)},\qquad x\ge0
$$

とする。$U=X^2/(2\sigma^2)$ と置く。

1. $U$ の累積分布関数を求めよ。
2. $U$ が率1の指数分布に従うことを示せ。
3. $E[X]$ を求めよ。$\Gamma(3/2)=\sqrt\pi/2$ を用いてよい。

<!-- solution-start -->

**詳細解答**

$u<0$ では $P(U\le u)=0$。$u\ge0$ では

$$
P(U\le u)=P(X\le\sigma\sqrt{2u})=1-e^{-u}.
$$

これは率1の指数分布の累積分布関数である。

また $X=\sigma\sqrt{2U}$ なので

$$
\begin{aligned}
E[X]
&=\sigma\sqrt2\int_0^\infty u^{1/2}e^{-u}\,du\\
&=\sigma\sqrt2\Gamma(3/2)
=\sigma\sqrt{\frac\pi2}.
\end{aligned}
$$

**本番答案**

$$F_U(u)=0\ (u<0),\quad F_U(u)=1-e^{-u}\ (u\ge0),$$

$$U\sim\operatorname{Exp}(1),\qquad E[X]=\sigma\sqrt{\pi/2}.$$

**採点基準（20点）**

分布関数8点、指数分布同定4点、期待値8点。

<!-- solution-end -->

#### P3T-B04 指数分布の右切断

$X$ は率 $\lambda>0$ の指数分布に従い、

$$
f_X(x)=\lambda e^{-\lambda x},\qquad x\ge0
$$

とする。$c>0$ とし、$X\le c$ の個体だけを観測する。

1. 観測される条件付き密度を求めよ。
2. $0\le t\le c$ に対する条件付き累積分布関数を求めよ。
3. $c\to\infty$ で元の指数分布へ戻ることを確認せよ。

<!-- solution-start -->

**詳細解答**

$$P(X\le c)=1-e^{-\lambda c}$$

なので

$$
f(x\mid X\le c)=\frac{\lambda e^{-\lambda x}}{1-e^{-\lambda c}},\qquad0\le x\le c.
$$

また

$$
P(X\le t\mid X\le c)
=\frac{1-e^{-\lambda t}}{1-e^{-\lambda c}}.
$$

$c\to\infty$ では $e^{-\lambda c}\to0$ だから、密度は $\lambda e^{-\lambda x}$ に戻る。

**本番答案**

$$f_{\mathrm{tr}}(x)=\frac{\lambda e^{-\lambda x}}{1-e^{-\lambda c}},\ 0\le x\le c,$$

$$F_{\mathrm{tr}}(t)=\frac{1-e^{-\lambda t}}{1-e^{-\lambda c}}.$$

**採点基準（20点）**

正規化密度9点、累積分布関数7点、極限4点。

<!-- solution-end -->

### Level C

#### P3T-C01 パレート標本の最小値と推定

$X_1,\ldots,X_n$ は独立で、それぞれ

$$
f(x\mid x_m,\alpha)=\alpha x_m^\alpha x^{-(\alpha+1)}\boldsymbol1_{\{x\ge x_m\}},
$$

$x_m>0$ のパレート分布に従う。$\alpha>0$ は既知、$x_m$ は未知とし、

$$M=\min_{1\le i\le n}X_i$$

と置く。

1. $P(M>t)$ を求めよ。
2. $M$ の確率密度関数を求めよ。
3. $E[M]$ とその存在条件を求めよ。
4. $x_m$ の尤度と最尤推定量を求めよ。
5. $M$ を定数倍して $x_m$ の不偏推定量を作れ。

<!-- solution-start -->

**詳細解答**

$t<x_m$ では $P(M>t)=1$。$t\ge x_m$ では独立性より

$$
P(M>t)=\prod_{i=1}^nP(X_i>t)=\left(\frac{x_m}{t}\right)^{n\alpha}.
$$

したがって

$$
f_M(t)=
\begin{cases}
0,&t<x_m,\\
n\alpha x_m^{n\alpha}t^{-(n\alpha+1)},&t\ge x_m.
\end{cases}
$$

よって $M$ はパレート$(x_m,n\alpha)$ 型であり、$n\alpha>1$ のとき

$$E[M]=\frac{n\alpha}{n\alpha-1}x_m.$$

観測値を $x_1,\ldots,x_n$ とすると

$$
L(x_m)=\alpha^n x_m^{n\alpha}\prod_{i=1}^n x_i^{-(\alpha+1)}
\boldsymbol1_{\{0<x_m\le M\}}.
$$

許される範囲で $x_m^{n\alpha}$ は増加するので

$$\widehat x_m=M.$$

また $n\alpha>1$ なら

$$
\widetilde x_m=\frac{n\alpha-1}{n\alpha}M
$$

は不偏である。

**本番答案**

$$P(M>t)=1\ (t<x_m),\quad (x_m/t)^{n\alpha}\ (t\ge x_m),$$

$$\widehat x_m=M,\qquad \widetilde x_m=\frac{n\alpha-1}{n\alpha}M.$$

**採点基準（20点）**

最小値の分布6点、密度4点、期待値4点、尤度と最尤推定4点、不偏補正2点。

<!-- solution-end -->

#### P3T-C02 ワイブル分布と寿命量

$X\sim\operatorname{Weibull}(c,\eta)$、$c>0,\eta>0$ とし、生存関数を

$$S(x)=e^{-(x/\eta)^c},\qquad x>0$$

とする。$f=-S'$、$h=f/S$、$H=-\log S$ とする。

1. $f(x),h(x),H(x)$ を求めよ。
2. $c>1,c=1,0<c<1$ でハザードの増減を比較せよ。
3. $c=1$ の平均残存寿命を求めよ。
4. $c=2,\eta=5$ の $S(5),H(5),h(5)$ を求めよ。
5. ハザードが増加することを寿命データの言葉で説明せよ。

<!-- solution-start -->

**詳細解答**

$$
f(x)=\frac{cx^{c-1}}{\eta^c}e^{-(x/\eta)^c},
$$

$$h(x)=\frac{cx^{c-1}}{\eta^c},\qquad H(x)=(x/\eta)^c.$$

$$h'(x)=\frac{c(c-1)x^{c-2}}{\eta^c}$$

より、$c>1$ で増加、$c=1$ で一定、$0<c<1$ で減少する。

$c=1$ では $S(u)=e^{-u/\eta}$ だから

$$
m(x)=\frac{\int_x^\infty e^{-u/\eta}\,du}{e^{-x/\eta}}=\eta.
$$

$c=2,\eta=5$ なら

$$S(5)=e^{-1},\qquad H(5)=1,\qquad h(5)=\frac25.$$

ハザード増加は、長く生存した個体ほど直後の短い区間で故障する率が高くなることを表す。

**本番答案**

$$f=\frac{cx^{c-1}}{\eta^c}e^{-(x/\eta)^c},\quad h=\frac{cx^{c-1}}{\eta^c},\quad H=(x/\eta)^c.$$

$c>1$ で増加、$c=1$ で一定、$c<1$ で減少。$c=1$ では $m(x)=\eta$。

**採点基準（20点）**

$f,h,H$ 7点、増減4点、平均残存寿命4点、数値3点、解釈2点。

<!-- solution-end -->

#### P3T-C03 指数寿命の右打切り尤度

寿命は率 $\lambda>0$ の指数分布に従い、

$$f_\lambda(x)=\lambda e^{-\lambda x},\qquad
S_\lambda(x)=e^{-\lambda x},\qquad x\ge0$$

とする。互いに独立な4個体から、故障時刻 $t_1,t_2$ と右打切り時刻 $c_1,c_2$ を観測した。

1. 尤度を求めよ。
2. $\lambda$ の最尤推定量を求めよ。
3. 打切りを故障として扱うと推定量がどちら向きに変わるか説明せよ。
4. 新たな故障時刻 $t_3$ が1件加わった場合の尤度を書け。
5. 観測がすべて打切りであった場合、$\lambda>0$ の範囲で最尤推定量が存在するか述べよ。

<!-- solution-start -->

**詳細解答**

故障には密度、打切りには生存確率を掛けるので

$$
L(\lambda)=\lambda^2
\exp\{-\lambda(t_1+t_2+c_1+c_2)\}.
$$

$T=t_1+t_2+c_1+c_2$ と置くと

$$
\ell(\lambda)=2\log\lambda-\lambda T,
$$

$$
\ell'(\lambda)=\frac2\lambda-T,\qquad
\ell''(\lambda)=-\frac2{\lambda^2}<0.
$$

したがって

$$\widehat\lambda=\frac2T.$$

打切りを故障と誤認すると $\lambda$ の次数を余分に増やすため、率を過大推定する方向に働く。

故障 $t_3$ が加わると

$$L(\lambda)=\lambda^3e^{-\lambda(T+t_3)}.$$

全件打切りなら $L(\lambda)=e^{-\lambda\sum c_i}$。$\lambda\downarrow0$ で上限1へ近づくが、$\lambda>0$ では最大値を取らないため内部の最尤推定量は存在しない。

**本番答案**

$$L=\lambda^2e^{-\lambda T},\quad \widehat\lambda=2/T.$$

全件打切りでは $\lambda>0$ 内に最尤推定量は存在しない。

**採点基準（20点）**

尤度6点、微分と最尤推定6点、誤処理の方向3点、追加故障2点、全打切り3点。

<!-- solution-end -->

#### P3T-C04 Laplace分布の位置・尺度推定

$X_1,\ldots,X_n$ は独立で、

$$
f(x\mid\mu,b)=\frac1{2b}\exp\left(-\frac{|x-\mu|}{b}\right),
\qquad \mu\in\mathbb R,\ b>0
$$

に従うとする。

1. 尤度と対数尤度を書け。
2. $b$ が既知のとき、$\mu$ の最尤推定量を求めよ。
3. $\mu$ が既知のとき、$b$ の最尤推定量を求めよ。
4. 二乗偏差を最小化する平均と、絶対偏差を最小化する中央値の違いを述べよ。
5. 外れ値に対する絶対偏差の特徴を説明せよ。

<!-- solution-start -->

**詳細解答**

$$
L(\mu,b)=(2b)^{-n}\exp\left\{-\frac1b\sum_{i=1}^n|x_i-\mu|\right\}.
$$

したがって

$$
\ell(\mu,b)=-n\log(2b)-\frac1b\sum_i|x_i-\mu|.
$$

$b$ 固定では $\sum_i|x_i-\mu|$ を最小化すればよい。標本を $x_{(1)}\le\cdots\le x_{(n)}$ と並べ、$x_{(k)}<\mu<x_{(k+1)}$ なら

$$
\frac{d}{d\mu}\sum_i|x_i-\mu|=2k-n.
$$

中央値より左では負、右では正へ変わるため、標本中央値が最小化する。偶数標本では中央2点の間の任意の値が最小点になる。

$\mu$ 固定で $A=\sum_i|x_i-\mu|>0$ と置けば

$$
\ell'(b)=-\frac nb+\frac{A}{b^2}.
$$

よって

$$\widehat b=\frac1n\sum_i|x_i-\mu|.$$

二乗偏差は極端な値を二乗で強く重く見る一方、絶対偏差の増え方は線形なので外れ値の影響が比較的小さい。

**本番答案**

$$\widehat\mu=\text{標本中央値},\qquad
\widehat b=\frac1n\sum_i|x_i-\mu|.$$

**採点基準（20点）**

尤度4点、中央値導出7点、尺度推定5点、比較・解釈4点。

<!-- solution-end -->

#### P3T-C05 右切断と右打切りの比較

$X$ は率 $\lambda>0$ の指数分布に従い、

$$f_\lambda(x)=\lambda e^{-\lambda x},\qquad
S_\lambda(x)=e^{-\lambda x},\qquad x\ge0$$

とする。$c>0$ とする。

(A) $X\le c$ の個体だけを標本へ入れる右切断、(B) 全個体を追跡し $X>c$ の個体を時刻 $c$ で右打切りにする観測を比較する。

1. (A)で観測される密度を求めよ。
2. (B)で故障時刻 $t\le c$ を観測した個体と、時刻 $c$ で打切られた個体の尤度寄与をそれぞれ書け。
3. (A)と(B)で観測から得ている情報がどう違うか説明せよ。
4. $c$ が小さい場合、寿命分布のどの部分の情報が失われやすいか述べよ。
5. 未知の $\lambda$ について、故障時刻2を1件、時刻4の右打切りを1件観測した。正しい尤度と、打切りを誤って「時刻4で故障」と扱った尤度を求め、それぞれの最尤推定量と推定生存確率 $S(4)$ を比較せよ。

<!-- solution-start -->

**詳細解答**

(A)では

$$
P(X\le c)=1-e^{-\lambda c}
$$

だから

$$
f_A(x)=\frac{\lambda e^{-\lambda x}}{1-e^{-\lambda c}},\qquad0\le x\le c.
$$

(B)では故障 $t$ の寄与は

$$f_\lambda(t)=\lambda e^{-\lambda t},$$

打切りの寄与は

$$S_\lambda(c)=e^{-\lambda c}.$$

右切断では $X>c$ の個体は標本に入らず、観測密度そのものを条件付きで正規化する。右打切りでは個体は標本に残り、「$X>c$」という情報を生存確率として使う。$c$ が小さいほど長寿側の尾の情報が弱くなる。

数値例では正しい尤度は

$$
L(\lambda)=(\lambda e^{-2\lambda})e^{-4\lambda}
=\lambda e^{-6\lambda}.
$$

よって

$$
\ell'(\lambda)=\frac1\lambda-6=0
$$

から

$$\widehat\lambda=\frac16,\qquad \widehat S(4)=e^{-4/6}=e^{-2/3}.$$

打切りを故障と誤認すると

$$
\widetilde L(\lambda)=(\lambda e^{-2\lambda})(\lambda e^{-4\lambda})
=\lambda^2e^{-6\lambda},
$$

$$
\widetilde\ell'(\lambda)=\frac2\lambda-6=0
$$

なので

$$\widetilde\lambda=\frac13,\qquad \widetilde S(4)=e^{-4/3}.$$

したがって故障と誤認すると率を過大に、生存確率を過小に推定する。

**本番答案**

$$f_A(x)=\frac{\lambda e^{-\lambda x}}{1-e^{-\lambda c}},\ 0\le x\le c.$$

右打切りでは故障に $f(t)$、打切りに $S(c)$ を掛ける。数値例では

$$\widehat\lambda=1/6,\quad \widehat S(4)=e^{-2/3},$$

誤解析では

$$\widetilde\lambda=1/3,\quad \widetilde S(4)=e^{-4/3}.$$

**採点基準（20点）**

切断密度4点、打切り寄与4点、情報差3点、尾情報2点、数値尤度・推定比較7点。

<!-- solution-end -->

### Level D

#### P3T-D01 ワイブル寿命と右打切り

$X_1,\ldots,X_n$ は独立で、形状母数 $c>0$ が既知、尺度母数 $\eta>0$ が未知のワイブル分布に従う。生存関数と密度は

$$
S_\eta(x)=e^{-(x/\eta)^c},\qquad
f_\eta(x)=\frac{cx^{c-1}}{\eta^c}e^{-(x/\eta)^c},\qquad x>0
$$

とする。個体 $i$ の打切り時刻を $c_i$ とし、

$$
y_i=\min(X_i,c_i),\qquad
\delta_i=\boldsymbol1_{\{X_i\le c_i\}}
$$

を観測する。

1. 個体 $i$ の尤度寄与と、全観測の尤度を求めよ。
2. 故障数 $d=\sum_i\delta_i$ と適当な和 $A$ を定義し、$d>0$ のとき $\eta$ の最尤推定量を求めよ。
3. $d=0$ の場合に有限な最尤推定量が存在するか述べよ。
4. $c>1,c=1,0<c<1$ で推定されたハザードの増減を説明せよ。
5. $c=1$ と $c=2$ で平均残存寿命の振る舞いを比較せよ。

<!-- solution-start -->

**詳細解答**

$\delta_i=1$ なら $f_\eta(y_i)$、$\delta_i=0$ なら $S_\eta(c_i)$ が寄与するので

$$
L(\eta)=\prod_{i=1}^n
f_\eta(y_i)^{\delta_i}S_\eta(c_i)^{1-\delta_i}.
$$

故障数を

$$d=\sum_i\delta_i$$

とし、

$$
A=\sum_i\{\delta_i y_i^c+(1-\delta_i)c_i^c\}
$$

と置く。$\eta$ に依存しない項を除けば

$$
\ell(\eta)=\text{定数}-dc\log\eta-\frac{A}{\eta^c}.
$$

したがって

$$
\ell'(\eta)
=-\frac{dc}{\eta}+\frac{cA}{\eta^{c+1}}
=\frac{c}{\eta^{c+1}}(A-d\eta^c).
$$

$d>0$ なら

$$
\boxed{\widehat\eta^c=\frac Ad},\qquad
\boxed{\widehat\eta=(A/d)^{1/c}}.
$$

$d=0$ では尤度は $\eta\to\infty$ で上限へ近づき、有限の内部最尤推定量は存在しない。

ハザードは

$$h(x)=\frac{cx^{c-1}}{\eta^c}$$

だから $c>1$ で増加、$c=1$ で一定、$0<c<1$ で減少する。

$c=1$ では $m(x)=\eta$ で一定。一方 $c=2$ では

$$
m(x)=e^{(x/\eta)^2}\int_x^\infty e^{-(u/\eta)^2}\,du.
$$

$a=x/\eta>0$ と置けば

$$
\int_a^\infty e^{-v^2}\,dv
<\frac1a\int_a^\infty ve^{-v^2}\,dv
=\frac{e^{-a^2}}{2a}.
$$

したがって

$$m(x)<\frac{\eta^2}{2x}.$$

$c=2$ では $h(x)=2x/\eta^2$ なので $h(x)m(x)<1$。また

$$m'(x)=h(x)m(x)-1<0,$$

よって長く生存した個体ほど平均残存寿命は短くなる。

**本番答案**

$$L(\eta)=\prod_i f_\eta(y_i)^{\delta_i}S_\eta(c_i)^{1-\delta_i},$$

$$A=\sum_i\{\delta_i y_i^c+(1-\delta_i)c_i^c\},\quad d=\sum_i\delta_i,$$

$$\widehat\eta=(A/d)^{1/c}\quad(d>0).$$

$d=0$ では有限の内部最尤推定量なし。$c>1$ で増加ハザード、$c=1$ で一定、$c<1$ で減少。

**採点基準（20点）**

尤度5点、対数尤度と最尤推定7点、全打切り2点、ハザード3点、平均残存寿命3点。

<!-- solution-end -->

---

## 11. 30分ドリル

### P3T-DRILL-01 ワイブル分布と右打切り

寿命 $X_i$ は形状母数 $c=2$、尺度母数 $\eta>0$ のワイブル分布に従い、

$$
S_\eta(x)=e^{-(x/\eta)^2},\qquad
f_\eta(x)=\frac{2x}{\eta^2}e^{-(x/\eta)^2},\qquad x>0
$$

とする。独立な個体から故障時刻 $2,4$ と、時刻5での右打切り1件を観測した。

1. $h_\eta(x),H_\eta(x)$ を求めよ。（20点）
2. 尤度 $L(\eta)$ を求めよ。（20点）
3. $\eta$ の最尤推定量を求めよ。（20点）
4. 推定値を用いて $h(5),S(5)$ を求めよ。（20点）
5. $c=2$ のハザードの意味と、打切り寄与が $S(5)$ になる理由を説明せよ。（20点）

<!-- solution-start -->

**詳細解答**

$$h_\eta(x)=\frac{f_\eta(x)}{S_\eta(x)}=\frac{2x}{\eta^2},$$

$$H_\eta(x)=-\log S_\eta(x)=\frac{x^2}{\eta^2}.$$

尤度は

$$
\begin{aligned}
L(\eta)
&=f_\eta(2)f_\eta(4)S_\eta(5)\\
&=\frac{32}{\eta^4}e^{-45/\eta^2}.
\end{aligned}
$$

対数尤度は

$$
\ell(\eta)=\log32-4\log\eta-\frac{45}{\eta^2}
$$

だから

$$
\ell'(\eta)=-\frac4\eta+\frac{90}{\eta^3}=0.
$$

よって

$$\widehat\eta^2=\frac{45}{2},\qquad \widehat\eta=\sqrt{45/2}.$$

したがって

$$
\widehat h(5)=\frac{10}{45/2}=\frac49,
$$

$$
\widehat S(5)=\exp\left(-\frac{25}{45/2}\right)=e^{-10/9}.
$$

$c=2$ ではハザードが時刻とともに増加する。時刻5で打切られた個体について分かるのは $X>5$ であり、時刻5で故障したわけではないので、尤度寄与は $P(X>5)=S(5)$ になる。

**本番答案**

$$h(x)=2x/\eta^2,\quad H(x)=x^2/\eta^2,$$

$$L(\eta)=32\eta^{-4}e^{-45/\eta^2},$$

$$\widehat\eta^2=45/2,\quad \widehat h(5)=4/9,\quad \widehat S(5)=e^{-10/9}.$$

**採点基準（100点）**

各小問20点。

<!-- solution-end -->

---

## 12. 過去問との接続

寿命分布では、生存関数・ハザードを求めるだけで終わらず、右打切り尤度や尺度母数の推定へ続く形が重要である。またパレート分布では、最小値の分布と台に依存する尤度を組み合わせる問題につながる。
