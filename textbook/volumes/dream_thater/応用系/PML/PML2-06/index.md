# PML2-06 PINNの強形式残差はどう定義されるか

## 1. 解のラベルが少なくても方程式を使えるか

[前講の製造解](../PML2-05/index.md#def-pml2-05-manufactured)では、正しいPDE解と数値・観測ラベルを区別した。ラベルが少ないときにも利用できる情報は、未知関数が満たす方程式そのものである。例えば零DirichletのPoisson問題

$$
-u''(x)=2\quad(0<x<1),\qquad u(0)=u(1)=0
$$

ならば真の解は $u_*(x)=x(1-x)$ である。これを[古典解の定義](../PML2-01/index.md#def-pml2-01-classical)に代入すれば、$u_*\in C^2([0,1])$、$-u_*''=2$、両端零を確かめられる。

数値差分法は格子値の連立方程式を解いた。一方、**物理情報を組み込んだニューラルネットワーク（Physics-Informed Neural Network; PINN）**は、パラメータ $\theta$ を持つ関数 $v_\theta(x)$ にPDE演算子を直接作用させ、方程式からのずれを損失として最小化する。ここで「物理」はPDEや境界条件として与えたモデルのことで、学習だけで新しい物理法則が保証されるという意味ではない。

本講ではネットワークを**滑らかな候補関数を作る仕組み**として扱う。具体的な自動微分の連鎖律と活性化関数の正則性は次講で扱い、本講で導関数を既知とする例はすべて手で微分する。

## 2. 連続領域の強形式残差

まず「強形式」とは、[古典解](../PML2-01/index.md#def-pml2-01-classical)のように、必要な導関数が各内部点に存在し、その点でPDEを等式として要求する書き方である。弱形式で試験関数に積分してから条件を課す方法とは区別する。

領域 $\Omega=(0,1)$ における二階微分演算子 $\mathcal L v=-v''$ と右辺 $f$ を考える。内部点 $x$ で候補 $v_\theta$ のPDE左辺を計算し、右辺を引いた

$$
r_\theta(x)=(\mathcal L v_\theta)(x)-f(x)
$$

を**強形式残差**と呼ぶ。$r_\theta(x)=0$ はその点で方程式を満たすことを意味するが、それだけで境界条件や他の点での等式が成立するとは限らない。

<a id="def-pml2-06-strong-residual"></a>

<!-- formal-statement-start -->
> **定義（PDEの強形式残差）**  
> $\Omega=(0,1)$、$f\in C([0,1])$、$v_\theta\in C^2([0,1])$ とする。$\mathcal L=-d^2/dx^2$ に対し、各 $x\in\Omega$ での強形式残差を

$$
r_\theta(x)=-v_\theta''(x)-f(x)
$$

> と定義する。$r_\theta$ は内部方程式だけの差であり、端点に課すDirichlet条件は含まない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml2-06-strong-residual -->
**定義の確認**。 $f=2$、$q(x)=x(1-x)$、$v_\theta(x)=\theta q(x)+c$（$\theta,c\in\mathbb R$）と置く。$q''=-2$ だから

$$
v_\theta''=-2\theta,\qquad r_\theta(x)=2(\theta-1).
$$

多項式なので $C^2([0,1])$ の仮定を満たし、どの内部点でも残差が定義される。$\theta=1,c=1/10$ では $r_\theta=0$ だが、端点値は両方とも $1/10$。**方程式の残差ゼロと境界条件の成立は別**である。
<!-- definition-example-end -->

一般の時間依存問題では、例えば $v_t-v_{xx}=0$ の演算子を $\mathcal L v=v_t-v_{xx}$ と指定して同様に残差を作る。時間・空間のどの変数で微分するかを先に確定する必要がある。

## 3. collocation点と物理損失

全点での残差を一度に計算する代わりに、内部の有限個の評価点 $X_{\mathrm r}=\{x_1,\ldots,x_N\}\subset(0,1)$ を選ぶ。この点を**collocation点（選点）**と呼ぶ。$x_i$ は格子の差分演算子を定義する点ではなく、**滑らかな候補関数の導関数を評価する場所**である。

各残差を二乗して平均したものが**物理損失**である。二乗を使うと符号が相殺されず、非負量として最小化できる。

<a id="def-pml2-06-collocation"></a>

<!-- formal-statement-start -->
> **定義（collocation点と経験物理損失）**  
> [強形式残差](#def-pml2-06-strong-residual)が定義される候補 $v_\theta$ と、任意の整数 $N\ge1$、内部評価点 $x_1,\ldots,x_N\in(0,1)$ を指定する。経験物理損失を

$$
L_{\mathrm{phys}}(\theta)
=\frac1N\sum_{i=1}^N |r_\theta(x_i)|^2
$$

> と定義する。同じ位置を重複して選べば、その点を重複して平均へ含める。$L_{\mathrm{phys}}=0$ は指定された全点での残差ゼロと同値である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml2-06-collocation -->
**定義の確認**。 $f=2$、$v_\theta(x)=\theta x(1-x)$、$X_{\mathrm r}=\{1/4,1/2,3/4\}$ とする。前節の微分により各点で $r_\theta=2(\theta-1)$。従って

$$
L_{\mathrm{phys}}(\theta)
=\frac{3\cdot4(\theta-1)^2}{3}
=4(\theta-1)^2.
$$

$\theta=3/2$ なら各残差は $1$、損失は $1$。$\theta=1$ なら全点で零である。ここでは導関数を直接評価したので、[三点差分の計算残差](../PML2-04/index.md#def-pml2-04-residual)を測ったわけではない。
<!-- definition-example-end -->

点が空間中でどれだけ代表的かは、数式の定義とは別の問題である。全点で小さいかどうかを評価する場合、連続量

$$
L_{\mathrm{cont}}(\theta)=\int_0^1 |r_\theta(x)|^2\,dx
$$

を比較対象にできる。有限和と積分がいつ対応するかは標本法によって決まる。

## 4. 有限和が連続損失を表す条件

均一な乱数で内部点を選ぶ場合は、固定した候補関数について統計的な検算ができる。$X_i$ が互いに独立で $(0,1)$ 上の一様分布なら、任意の積分可能な関数 $g$ の標本平均の期待値は $\int_0^1 g(x)\,dx$ となる。ただし**同じ点を見ながらパラメータを訓練した後**の損失について、固定パラメータの等式を無条件に当てはめてはならない。

<a id="thm-pml2-06-unbiased"></a>

<!-- formal-statement-start -->
> **定理（固定候補に対する物理損失の標本平均）**  
> $\theta$ を評価点の抽出に先立って固定し、$f\in C([0,1])$、$v_\theta\in C^2([0,1])$ とする。$X_1,\ldots,X_N$ が互いに独立で $(0,1)$ 上の一様分布に従うとき、$g(x)=|r_\theta(x)|^2$、$\mu=\int_0^1g(x)\,dx$、$\sigma_g^2=\int_0^1(g(x)-\mu)^2\,dx$ と置けば

$$
\mathbb E[L_{\mathrm{phys}}(\theta)]=\mu,\qquad
\operatorname{Var}(L_{\mathrm{phys}}(\theta))
=\frac{\sigma_g^2}{N}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

候補を固定すれば $g$ は決まった連続関数であり、標本平均の線形性と、独立な変数の和の分散が各分散の和になる性質を使える。

<!-- proof-start -->
### 証明

$f$ と $v_\theta''$ はコンパクト区間上連続だから $g$ も連続かつ有界であり、$\mu$ と $\sigma_g^2$ は有限である。一様分布の定義から各 $i$ について

$$
\mathbb E[g(X_i)]=\int_0^1g(x)\,dx=\mu,
\quad
\mathbb E[(g(X_i)-\mu)^2]=\sigma_g^2.
$$

線形性により

$$
\mathbb E\!\left[\frac1N\sum_{i=1}^Ng(X_i)\right]
=\frac1N\sum_{i=1}^N\mu=\mu.
$$

また $X_i$ の独立性から $g(X_i)$ も独立であり、異なる $i,j$ の共分散は零。よって

$$
\operatorname{Var}\!\left(\frac1N\sum_{i=1}^Ng(X_i)\right)
=\frac1{N^2}\sum_{i=1}^N\operatorname{Var}(g(X_i))
=\frac{N\sigma_g^2}{N^2}.
$$

これが主張である。
<!-- proof-end -->

**使い方と限界。** 独立一様抽出なら固定モデルの平均残差二乗を推定できる。一方、選点に依存して得た $\widehat\theta(X_1,\ldots,X_N)$ では、$g_{\widehat\theta}$ 自身が点の関数になる。独立な検証用collocation点を別に用意し、固定した学習済みモデルを評価する理由がここにある。

## 5. 境界損失・観測損失と何が違うか

PDEの内部方程式だけを満たしても、正しい境界条件を持つとは限らない。そこで既知の端点値 $g_0,g_1$ に対して**境界損失**を作る。さらに観測位置 $z_k$ と観測値 $y_k$ を持つ場合は**データ損失**を作れる。$z_k$ はcollocation点と同じである必要はない。

<a id="def-pml2-06-composite-loss"></a>

<!-- formal-statement-start -->
> **定義（内部・境界・観測の複合損失）**  
> $\Omega=(0,1)$ のPoisson問題に対し、内部点 $x_i\in\Omega$（$1\le i\le N$）、端点値 $g_0,g_1\in\mathbb R$、観測位置 $z_k\in[0,1]$ と値 $y_k\in\mathbb R$（$1\le k\le M$）、$N,M\ge1$ を与える。$v_\theta\in C^2([0,1])$ に対し、上記の $L_{\mathrm{phys}}$ と

$$
L_{\mathrm{bdry}}(\theta)
=\frac{|v_\theta(0)-g_0|^2+|v_\theta(1)-g_1|^2}{2},
$$

$$
L_{\mathrm{data}}(\theta)
=\frac1M\sum_{k=1}^M|v_\theta(z_k)-y_k|^2
$$

> を定義する。非負の重み $\lambda_{\mathrm p},\lambda_{\mathrm b},\lambda_{\mathrm d}$ による複合損失は

$$
L(\theta)=\lambda_{\mathrm p}L_{\mathrm{phys}}(\theta)
+\lambda_{\mathrm b}L_{\mathrm{bdry}}(\theta)
+\lambda_{\mathrm d}L_{\mathrm{data}}(\theta)
$$

> である。データがない問題ではデータ項を省略する。重みの大小は各条件の相対的な寄与を変える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml2-06-composite-loss -->
**定義の確認**。 $f=2$、両端値零、観測 $z_1=1/2,y_1=1/4$、$v_{\alpha,c}(x)=\alpha x(1-x)+c$、内部の選点は任意の三点とする。直接代入して

$$
L_{\mathrm{phys}}=4(\alpha-1)^2,\quad
L_{\mathrm{bdry}}=c^2,\quad
L_{\mathrm{data}}=(\alpha/4+c-1/4)^2.
$$

$\alpha=1,c=0$ では三項がすべて零。$\alpha=1,c=1/10$ では、順に $0,1/100,1/100$。一方 $\alpha=0,c=1/4$ ではデータ損失だけが零で、内部損失は $4$、境界損失は $1/16$ となる。各項は異なる条件を測っている。
<!-- definition-example-end -->

観測値に雑音がある場合、$L_{\mathrm{data}}$ を零にすることが真値に近いことと同じではない。[独立な評価用雑音の誤差分解](../PML2-05/index.md#thm-pml2-05-noise-mse)を適用するには評価用雑音と予測の独立性が必要であり、学習に使用した同じラベルを評価に流用できない。物理量の単位や領域長が異なる場合、単なる数値の大小で重みを決めないことも重要である（詳細は後続講）。

## 6. 手で解けるPINNの損失最小化

ネットワークの複雑な構造がなくても、PDEを損失にする仕組みは計算できる。多項式の候補空間

$$
v_{\boldsymbol a}(x)=a_0+a_1x+a_2x(1-x),
\qquad \boldsymbol a=(a_0,a_1,a_2)\in\mathbb R^3
$$

を使う。基底 $1,x,x(1-x)$ は一次独立で、任意の係数に対して $C^2([0,1])$ の関数を作る。ここでは内部方程式の残差を $2(a_2-1)$、端点値を $a_0,a_0+a_1$ として読み出せる。

<a id="thm-pml2-06-trial-identification"></a>

<!-- formal-statement-start -->
> **定理（三係数の候補空間における零損失の一意性）**  
> $f(x)=2$、零Dirichlet境界のPoisson問題を $\Omega=(0,1)$ で考える。上記の $v_{\boldsymbol a}$、任意の $N\ge1$ 個の内部選点、正の重み $\lambda_{\mathrm p},\lambda_{\mathrm b}>0$ に対して

$$
L(\boldsymbol a)
=\lambda_{\mathrm p}L_{\mathrm{phys}}(\boldsymbol a)
+\lambda_{\mathrm b}L_{\mathrm{bdry}}(\boldsymbol a)
$$

> は非負であり、その最小値は零、最小化する係数はただ一つ

$$
(a_0,a_1,a_2)=(0,0,1)
$$

> である。このとき候補関数は真の解 $x(1-x)$ に一致する。
<!-- formal-statement-end -->

### 証明の見取り図

候補の二階微分と両端値を計算し、重みが正であるため、二つの損失項がそれぞれ零となる係数を連立して求める。

<!-- proof-start -->
### 証明

$x(1-x)=x-x^2$ の二階微分は $-2$ なので

$$
v_{\boldsymbol a}''(x)=-2a_2,\qquad
r_{\boldsymbol a}(x)=2a_2-2.
$$

残差は位置に依らず一定だから

$$
L_{\mathrm{phys}}=\frac1N\sum_{i=1}^N4(a_2-1)^2
=4(a_2-1)^2.
$$

端点を代入すると $v_{\boldsymbol a}(0)=a_0$、$v_{\boldsymbol a}(1)=a_0+a_1$。従って

$$
L_{\mathrm{bdry}}=\frac{a_0^2+(a_0+a_1)^2}{2}.
$$

全項は非負で、$(0,0,1)$ を代入すれば零を達成する。逆に $L=0$ なら重みは正だから二つの非負損失がともに零である。まず $(a_2-1)^2=0$ から $a_2=1$。次に $a_0^2+(a_0+a_1)^2=0$ は二つの平方がともに零であることを意味し、$a_0=0$、$a_0+a_1=0$、従って $a_1=0$。ほかに最小化係数はない。
<!-- proof-end -->

この例で零損失が一意なのは、**候補関数の形と二つの境界条件**が十分な制約を与えたからである。有限点での残差ゼロだけから、一般のニューラルネットワークで同じ結論が出るわけではない。

## 7. collocation点を通り抜ける誤り

内部選点を一つ $x_1=1/2$ として、真解に次の滑らかな摂動を加える。

$$
v_\varepsilon(x)
=x(1-x)+\varepsilon x(1-x)(x-1/2)^3,
\qquad \varepsilon\ne0.
$$

$w(x)=x(1-x)(x-1/2)^3$ と置き、$p(x)=x(1-x)$、$h(x)=(x-1/2)^3$ の積として二回微分する。

$$
w''=p''h+2p'h'+ph''.
$$

$x=1/2$ では $h=h'=h''=0$ なので $w''(1/2)=0$。そのため、$f=2$ に対する強形式残差は

$$
r_\varepsilon(1/2)
=-v_\varepsilon''(1/2)-2
=-(-2+\varepsilon\cdot0)-2=0.
$$

しかも $w(0)=w(1)=0$ なので境界損失も零。しかし $x=1/4$ での真解との差は

$$
v_\varepsilon(1/4)-u_*(1/4)
=\varepsilon\frac3{16}\left(-\frac14\right)^3
=-\frac{3\varepsilon}{1024}\ne0.
$$

この反例では失った条件は「内部の全点で方程式が成立する」という要請である。**選点上の有限和では、選点外での曲率のずれを検出できない**。より一般の点集合の構成と解誤差の関係は後続講で検討する。

## 8. 時間依存PDEにも同じ考え方を使う

[前講の熱方程式製造解](../PML2-05/index.md#def-pml2-05-manufactured)と同じ発想で、$0\le t\le1$、$0\le x\le1$、拡散係数 $\kappa>0$、零境界条件を考える。ここでの強形式演算子は $\mathcal L=\partial_t-\kappa\partial_{xx}$ であり、内部残差は

$$
r_\theta(t,x)=\partial_t v_\theta(t,x)
-\kappa\partial_{xx}v_\theta(t,x).
$$

例えば $v(t,x)=e^{-\kappa\pi^2t}\sin(\pi x)$ とすれば

$$
\partial_tv=-\kappa\pi^2 e^{-\kappa\pi^2t}\sin(\pi x),
\quad
\partial_{xx}v=-\pi^2e^{-\kappa\pi^2t}\sin(\pi x),
$$

だから $r=0$。しかし、初期条件 $v(0,x)=\sin(\pi x)$ と境界条件 $v(t,0)=v(t,1)=0$ は残差とは**別途**検査する。時空間の選点 $(t_i,x_i)$ で内部の平均残差を作る場合も、初期面 $t=0$ と空間境界 $x=0,1$ のデータを別に与える。

## 9. 演習と詳細解答

<a id="ex-pml2-06-a01"></a>

### PML2-06-A01：残差の符号を確かめる
- Level: A

$-u''=2$、$v_\alpha(x)=\alpha x(1-x)$、$\alpha=3/2$ とする。任意の内部点での強形式残差と、$N=4$ 個の内部collocation点での物理損失を求めよ。

<!-- solution-start -->
**詳細解答。** $x(1-x)$ の二階微分は $-2$ なので $v_\alpha''=-3$。よって $r_\alpha=-(-3)-2=1$。どの選点でも二乗残差が $1$ で、$L_{\mathrm{phys}}=(1+1+1+1)/4=1$。$v''-2$ と誤って計算すると符号が逆になる。
<!-- solution-end -->

<a id="ex-pml2-06-a02"></a>

### PML2-06-A02：残差ゼロでも境界違反
- Level: A

$-u''=2$、両端零とする。$v(x)=x(1-x)+1/5$ について内部残差、物理損失、境界損失を求めよ。

<!-- solution-start -->
**詳細解答。** 定数の二階微分は零だから $v''=-2$、従って $r=2-2=0$ で全選点について $L_{\mathrm{phys}}=0$。端点は $v(0)=v(1)=1/5$、指定値は零なので

$$
L_{\mathrm{bdry}}=\frac{(1/5)^2+(1/5)^2}{2}=\frac1{25}.
$$

内部方程式は満たすが零Dirichlet境界を満たさない。
<!-- solution-end -->

<a id="ex-pml2-06-a03"></a>

### PML2-06-A03：データ損失だけが小さい例
- Level: A

$f=2$、両端零、観測点 $z=1/2$ で値 $y=1/4$ とする。候補 $v(x)=1/4$ の物理・境界・データ損失をそれぞれ求めよ。

<!-- solution-start -->
**詳細解答。** $v''=0$ より $r=-2$、従って $L_{\mathrm{phys}}=4$。両端値は $1/4$ なので $L_{\mathrm{bdry}}=((1/4)^2+(1/4)^2)/2=1/16$。観測点で $v(1/2)=y$ だから $L_{\mathrm{data}}=0$。一つの観測値への一致からPDEの充足は結論できない。
<!-- solution-end -->

<a id="ex-pml2-06-a04"></a>

### PML2-06-A04：位置ごとに変わる残差
- Level: A

$f=2$、$v_\varepsilon(x)=x(1-x)+\varepsilon\sin(\pi x)$ とする。選点 $1/4,3/4$ での物理損失と端点の境界損失を求めよ。

<!-- solution-start -->
**詳細解答。** $v_\varepsilon''=-2-\varepsilon\pi^2\sin(\pi x)$ だから $r_\varepsilon(x)=\varepsilon\pi^2\sin(\pi x)$。二選点とも $\sin(\pi/4)=\sin(3\pi/4)=\sqrt2/2$ なので

$$
L_{\mathrm{phys}}
=\frac{\varepsilon^2\pi^4/2+\varepsilon^2\pi^4/2}{2}
=\frac{\varepsilon^2\pi^4}{2}.
$$

両端で多項式も正弦も零だから $L_{\mathrm{bdry}}=0$。
<!-- solution-end -->

<a id="ex-pml2-06-a05"></a>

### PML2-06-A05：熱方程式の残差
- Level: A

$\kappa>0$ とし、$v(t,x)=e^{-\kappa\pi^2t}\sin(\pi x)$ の $\partial_tv-\kappa\partial_{xx}v$ を計算して、初期値と端点値も検査せよ。

<!-- solution-start -->
**詳細解答。** $\partial_tv=-\kappa\pi^2e^{-\kappa\pi^2t}\sin(\pi x)$、$\partial_{xx}v=-\pi^2e^{-\kappa\pi^2t}\sin(\pi x)$。後者に $\kappa$ を掛けて引けば零。$t=0$ で指数は1だから初期値は $\sin(\pi x)$。$\sin0=\sin\pi=0$ なので空間端点は全時刻で零。内部残差・初期・境界の三つを別々に確認した。
<!-- solution-end -->

<a id="ex-pml2-06-b01"></a>

### PML2-06-B01：三係数の零損失を再構成する
- Level: B

$f=2$、両端零とし、$v(x)=a_0+a_1x+a_2x(1-x)$ を候補にする。任意の非空な内部選点集合に対する $L_{\mathrm{phys}}+L_{\mathrm{bdry}}$ を導出し、零になる係数が一意であることを示せ。

<!-- solution-start -->
**詳細解答。** $v''=-2a_2$ だから $r=2(a_2-1)$ は全選点で一定。したがって $L_{\mathrm{phys}}=4(a_2-1)^2$。端点では $v(0)=a_0$、$v(1)=a_0+a_1$ より

$$
L_{\mathrm{phys}}+L_{\mathrm{bdry}}
=4(a_2-1)^2+\frac{a_0^2+(a_0+a_1)^2}{2}.
$$

三つの平方の和は非負であり、零なら $a_2=1,a_0=0,a_0+a_1=0$。よって $a_1=0$。逆に $(0,0,1)$ を代入すると全項零だから一意の最小値である。[零損失の定理](#thm-pml2-06-trial-identification)と同じ結論を式の出発点から確かめた。
<!-- solution-end -->

<a id="ex-pml2-06-b02"></a>

### PML2-06-B02：選点を通り抜ける摂動
- Level: B

唯一のcollocation点を $x_1=1/2$ とする。$v_\varepsilon(x)=x(1-x)+\varepsilon x(1-x)(x-1/2)^3$、$\varepsilon\ne0$ の境界損失と選点物理損失が零であること、$x=1/4$ の真解との差が零でないことを計算せよ。

<!-- solution-start -->
**詳細解答。** $p=x(1-x),h=(x-1/2)^3$ とおくと $(ph)''=p''h+2p'h'+ph''$。$x=1/2$ では $h=h'=h''=0$ で摂動の二階微分が零なので $v_\varepsilon''(1/2)=-2$、残差 $r(1/2)=0$。$p(0)=p(1)=0$ で端点は両方零だから境界損失も零。一方

$$
v_\varepsilon(1/4)-u_*(1/4)
=\varepsilon(1/4)(3/4)(-1/4)^3
=-\frac{3\varepsilon}{1024}\ne0.
$$

破綻するのは「有限選点で零なら全内部点でも零」という推論である。
<!-- solution-end -->

<a id="ex-pml2-06-b03"></a>

### PML2-06-B03：ランダム選点の期待値と分散
- Level: B

$f=2$、$v(x)=x(1-x)+(x-x^3)/6$ とする。$X_i$ を独立な一様分布 $(0,1)$ とし、$L_{\mathrm{phys}}=N^{-1}\sum_i r(X_i)^2$ の期待値と分散を求めよ。

<!-- solution-start -->
**詳細解答。** $(x-x^3)'=1-3x^2$、$(x-x^3)''=-6x$ なので $v''=-2-x$。従って $r(x)=-v''-2=x$、$r(x)^2=x^2$。一様分布について

$$
\mathbb E[X^2]=\int_0^1x^2\,dx=\frac13,\qquad
\mathbb E[X^4]=\int_0^1x^4\,dx=\frac15.
$$

よって $\operatorname{Var}(X^2)=1/5-(1/3)^2=4/45$。[固定候補の標本平均定理](#thm-pml2-06-unbiased)で各 $X_i$ の独立性を用い、期待値 $1/3$、分散 $4/(45N)$ を得る。
<!-- solution-end -->

<a id="ex-pml2-06-b04"></a>

### PML2-06-B04：観測雑音と損失の重み
- Level: B

$f=2$、$v_\alpha(x)=\alpha x(1-x)$、内部選点は任意の非空集合、端点は零とする。中央の観測ラベルが $y=1/4+\eta$ とずれ、重み $\lambda_{\mathrm p},\lambda_{\mathrm d}>0$ で物理損失とデータ損失だけを足す。最適な $\alpha$ を導き、$\lambda_{\mathrm p}\to\infty$ の極限を求めよ。

<!-- solution-start -->
**詳細解答。** $\delta=\alpha-1$ と置けば残差 $2\delta$、中央の予測値 $(1+\delta)/4$。従って

$$
L=4\lambda_{\mathrm p}\delta^2+
\lambda_{\mathrm d}(\delta/4-\eta)^2.
$$

$\delta$ で微分すると

$$
\frac{dL}{d\delta}
=8\lambda_{\mathrm p}\delta+
\frac{\lambda_{\mathrm d}}2(\delta/4-\eta).
$$

これを零にし両辺を8倍すると $(64\lambda_{\mathrm p}+\lambda_{\mathrm d})\delta=4\lambda_{\mathrm d}\eta$。二階微分は $8\lambda_{\mathrm p}+\lambda_{\mathrm d}/8>0$ だから一意の最小化係数は

$$
\alpha_*=1+\frac{4\lambda_{\mathrm d}\eta}
{64\lambda_{\mathrm p}+\lambda_{\mathrm d}}.
$$

$\lambda_{\mathrm d}$ と $\eta$ を固定して $\lambda_{\mathrm p}\to\infty$ とすれば $\alpha_*\to1$。雑音ラベルだけを完全に合わせることより内部方程式の制約が優先される。
<!-- solution-end -->

<a id="ex-pml2-06-c01"></a>

### PML2-06-C01：内部・境界・観測を同時に最適化する
- Level: C

零Dirichlet Poisson問題 $-u''=2$ に対し、$v_{\alpha,c}(x)=\alpha x(1-x)+c$、内部選点 $1/4,1/2,3/4$、中央の観測ラベル $y=7/20$ を用いる。三損失の重みをすべて1とし、次を示せ。

1. $L(\alpha,c)$ を一つの二次式として導出する。
2. 損失を最小化する係数が一意であることを示し、その値を厳密な分数で求める。
3. 厳密解 $(\alpha,c)=(1,0)$ と、ラベルを完全に合わせる $(1,1/10)$ の損失を比較し、最適化結果がどの条件を妥協するか説明する。

<!-- solution-start -->
**詳細解答。** (1) 内部残差は $2(\alpha-1)$、境界は両端とも $c$、観測予測値は $\alpha/4+c$。ゆえに

$$
L(\alpha,c)=4(\alpha-1)^2+c^2+
(\alpha/4+c-7/20)^2.
$$

(2) $\delta=\alpha-1$、$\Delta=\delta/4+c-1/10$ と置くと $L=4\delta^2+c^2+\Delta^2$ である。偏微分は

$$
\frac{\partial L}{\partial\delta}=8\delta+\frac12\Delta,
\qquad
\frac{\partial L}{\partial c}=2c+2\Delta.
$$

これを零とすると $\delta=-\Delta/16$、$c=-\Delta$。$\Delta$ の定義に戻すと

$$
\Delta=-\frac{\Delta}{64}-\Delta-\frac1{10},
\qquad
\frac{129}{64}\Delta=-\frac1{10}.
$$

従って $\Delta=-32/645$、$\delta=2/645$、$c=32/645$。すなわち

$$
(\alpha_*,c_*)=\left(\frac{647}{645},\frac{32}{645}\right).
$$

二次式の二階方向変化は、零でない $(h,k)$ に対し $4h^2+k^2+(h/4+k)^2>0$ である。従って停留点は一意の大域最小点である。

(3) 厳密解では内部損失と境界損失が零、観測差が $1/4-7/20=-1/10$ なので $L(1,0)=1/100$。$(1,1/10)$ では内部と観測は零、境界損失が $(1/10)^2$ だから $L(1,1/10)=1/100$。一方、一意最適点では $\delta,c,\Delta$ がいずれも零ではないため、方程式・境界・観測の三項が少しずつ非零となる。観測にずれがあると複合損失最小化が真の解と必ず一致するわけではない。
<!-- solution-end -->

## 10. 次の講義へ

強形式PINNの基本設計は、微分可能な候補関数を用意して $r_\theta=\mathcal Lv_\theta-f$ を計算し、内部のcollocation損失、境界・初期条件、必要なら観測損失を別々に構成することだった。次講では、ネットワーク内の連鎖律を追い、二階導関数を自動微分で正しく得るための条件を確かめる。