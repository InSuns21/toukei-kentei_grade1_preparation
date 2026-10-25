# ML2-08 変分推論の基礎・ELBO恒等式

<!-- definition-example-audit: strict -->

[混合模型の周辺化](../ML2-05/index.md#prop-ml2-05-marginal)では、観測値 $x$ の確率を、見えないカテゴリ $z$ に関する和として求めた。[EMの補助関数](../ML2-06/index.md#def-ml2-06-auxiliary)では、その和の対数を計算しやすい下界で扱った。一方、連続した潜在変数や多数のカテゴリを持つ模型では、周辺化そのものが難しい。観測の確率を求めるために、すべての潜在状態を足す・積分する必要があるからだ。

そこで、事後分布を別の計算しやすい分布 $q$ で近似する。$q$ を選ぶことで計算できる**対数周辺尤度の下界**が ELBO（evidence lower bound）である。ただし下界を最大にすることと、真の事後分布を求めたことは同じではない。本講では有限集合で恒等式を導き、零確率の落とし穴を調べてから連続密度へ拡張し、最後に実際の数値で三つの項を照合する。

## 1. 見えない状態を足し合わせる計算と、その代わり

固定した観測値 $x$ と模型の母数 $\theta$ を考え、潜在状態 $z$ を動かす。まず潜在集合を有限集合 $\mathcal Z$ とし、同時確率質量または $x$ に関する同時密度の値を $f(z)=p_\theta(x,z)\ge0$ と書く。$x$ が連続値の場合、$f(z)$ は確率ではなく密度の値でよい。**周辺尤度**（evidence）とは

$$
e=p_\theta(x)=\sum_{z\in\mathcal Z}f(z)
$$

であり、以下では $0<e<\infty$ を仮定する。[責務のBayes公式と正規化](../ML2-05/index.md#thm-ml2-05-responsibility)と同様に、正の観測尤度で条件付けた真の事後確率を $r(z)=p_\theta(z\mid x)=f(z)/e$ とする。$f(z)=0$ なら $r(z)=0$ である。

例えば $\mathcal Z=\{1,2\}$、$f(1)=1/4$、$f(2)=1/2$ なら、$e=3/4$、$r=(1/3,2/3)$。この例は足し算2回で終わるが、状態が指数的に増えると事情が変わる。真の $r$ を先に計算せずとも評価できる候補として、別の分布 $q$ を導入する。この候補を**変分分布**、候補として許す分布全体を**変分族**と呼び、まず有限の状態で正規化と零確率の条件を確かめる。

<a id="def-ml2-08-variational-family"></a>

<!-- formal-statement-start -->
> **定義（有限潜在変数の変分分布と変分族）**
> 非空有限集合 $\mathcal Z$ 上の確率ベクトル $q=(q(z))$、すなわち $q(z)\ge0$、$\sum_zq(z)=1$ を**変分分布**という。計算上許容する変分分布の非空集合 $\mathcal Q$ を**変分族**という。$f(z)=0$ の状態に $q(z)>0$ を割り当てない、すなわち

$$
q(z)>0\ \Longrightarrow\ f(z)>0
$$

> が成り立つとき、$q$ は事後分布 $r$ に絶対連続（記号 $q\ll r$）という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-08-variational-family -->
**定義の確認**。先ほどの $f=(1/4,1/2)$ では両成分が正だから、$q=(1/2,1/2)$ も $q=(1,0)$ も正規化された変分分布であり $q\ll r$ を満たす。$\mathcal Q=\{(t,1-t):1/4\le t\le3/4\}$ も空でない変分族である。ところが $f=(1/4,0)$ と置き直すと $r=(1,0)$ になり、$q=(1/2,1/2)$ は第2状態で $q>0,r=0$ となるため、絶対連続ではない。単なる非負性・総和1と台の条件は別々に検査する。
<!-- definition-example-end -->

$q(z)=0$ の状態は期待値に寄与しない。したがって $q$ の台 $S_q=\{z:q(z)>0\}$ だけで和を取れば、$0/0$ の対数を作らずに済む。この限定した和が次の下界を定義する。

<a id="def-ml2-08-elbo-finite"></a>

<!-- formal-statement-start -->
> **定義（有限状態の ELBO）**
> $0<e<\infty$ とし、有限集合 $\mathcal Z$ の変分分布 $q$ が $q\ll r$ を満たすとする。このとき

$$
\mathcal L(q)=\sum_{z\in S_q}q(z)\log\frac{f(z)}{q(z)}
$$

> を $q$ の**証拠下界**（ELBO）という。対数は自然対数とする。有限集合では $f(z)>0$ が $S_q$ 上で保証されるため、各項は有限な実数である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-08-elbo-finite -->
**定義の確認**。$f=(1/4,1/2)$、$q=(1/2,1/2)$ では、$S_q=\{1,2\}$ で両方の分子が正。各比は $1/2$ と $1$ なので

$$
\mathcal L(q)=\frac12\log\frac12+\frac12\log1=-\frac12\log2.
$$

$q=(1,0)$ なら和は第1状態だけで、$\mathcal L(q)=\log(1/4)$。第2状態の $0\log(0)$ を計算する必要はない。$f=(1/4,0)$、$q=(1/2,1/2)$ では台条件を満たさないため、この有限値の定義の対象外となる。
<!-- definition-example-end -->

## 2. 周辺尤度・ELBO・KL の三角関係

[INFO2の相対エントロピー（KL）](../../INFO/INFO2/index.md#def-info2-relative-entropy)は二分布のずれを非対称に測る量だった。ここで使う向きは $D(q\|r)$ であって $D(r\|q)$ ではない。$r(z)=f(z)/e$ を代入して、$q$ に関する和の中で定数 $\log e$ を取り出そう。

<a id="thm-ml2-08-elbo-identity"></a>

<!-- formal-statement-start -->
> **定理（有限状態の ELBO 恒等式と等号条件）**
> 有限集合 $\mathcal Z$、非負関数 $f$、$e=\sum_zf(z)\in(0,\infty)$、$r(z)=f(z)/e$ を固定する。$q$ が確率分布で $q\ll r$ を満たせば、

$$
\boxed{\log e=\mathcal L(q)+D(q\|r)}
$$

> が有限な実数の恒等式として成り立つ。従って $\mathcal L(q)\le\log e$ で、**等号成立は $q(z)=r(z)$ がすべての $z$ で成り立つ場合に限る**。
<!-- formal-statement-end -->

### 証明の見取り図

比 $q/r$ の $r$ に事後確率 $f/e$ を代入し、対数の差を展開する。KL の非負性と等号条件を用いて下界と一致条件を得る。$q$ が零の状態を和へ入れず、$r$ の台から外れる $q$ は仮定で除いていることが重要である。

<!-- proof-start -->
### 証明

$S_q=\{z:q(z)>0\}$ とする。$q\ll r$ によりこの集合では $f(z)>0$ かつ $r(z)>0$ なので、すべての対数が定義される。[相対エントロピーの定義](../../INFO/INFO2/index.md#def-info2-relative-entropy)から

$$
\begin{aligned}
D(q\|r)
&=\sum_{z\in S_q}q(z)\log\frac{q(z)}{r(z)}\\
&=\sum_{z\in S_q}q(z)\log\frac{q(z)e}{f(z)}\\
&=\sum_{z\in S_q}q(z)\log\frac{q(z)}{f(z)}
  +\sum_{z\in S_q}q(z)\log e\\
&=-\mathcal L(q)+\log e.
\end{aligned}
$$

最後の等号には $\sum_{z\in S_q}q(z)=1$ を使った。[Gibbs不等式](../../INFO/INFO2/index.md#thm-info2-gibbs)より $D(q\|r)\ge0$、かつ等号は $q=r$ の場合だけである。$q=r$ なら $q\ll r$ も満たし、$\mathcal L(r)=\log e$。逆に $\mathcal L(q)=\log e$ なら $D(q\|r)=0$ だから $q=r$。$\square$
<!-- proof-end -->

冒頭の二状態模型で $q=(1/2,1/2)$ を選ぶと、

$$
\begin{aligned}
D(q\|r)&=\frac12\log\frac{1/2}{1/3}
 +\frac12\log\frac{1/2}{2/3}
 =\frac12\log\frac98,\\
\mathcal L(q)+D(q\|r)&=-\frac12\log2+\frac12\log\frac98
=\log\frac34.
\end{aligned}
$$

差 $\log e-\mathcal L(q)$ は **約 $0.05889$ nat**。$q=r=(1/3,2/3)$ に変えれば KL は0になり、ELBOが $\log(3/4)$ まで上昇する。一方、$q=(1,0)$ は $q\ll r$ でも $r(2)>0$ を覆わない。KL は $\log3$ であり、下界と周辺尤度の差は大きい。**$q\ll r$ は $r\ll q$ を意味しない**。

## 3. 零確率と下界の定義域

先の定理は数式上で両辺が有限であることを保証していた。これを落として、$f(z)=0$ なのに $q(z)>0$ を許したらどうなるだろうか。$\log f(z)=-\infty$ と拡張し、$q>0$ の係数を掛ければ、ELBOは $-\infty$ と定義できる。しかし $D(q\|r)=+\infty$ となるので、$\mathcal L+D$ は $-\infty+\infty$ で**未定義**である。通常の実数恒等式とは書けない。

<a id="prop-ml2-08-support"></a>

<!-- formal-statement-start -->
> **命題（台を外れる変分分布と拡張下界）**
> 前定理の $f,e,r$ に対し、有限集合上の任意の確率分布 $q$ を考える。$q\not\ll r$ の場合、対数比の期待値を拡張実数で $\mathcal L(q)=-\infty$ と定めれば、$\mathcal L(q)\le\log e$ は成立する。しかし $D(q\|r)=+\infty$ であり、有限値の ELBO 恒等式は使えない。
<!-- formal-statement-end -->

### 証明の見取り図

$q$ が正で $r$ が零の状態を一つ取れば、対数尤度に $\log0$ が現れる。KL には逆向きの比が現れるので、その状態で正の無限大になる。

<!-- proof-start -->
### 証明

$q\not\ll r$ なら $q(z_0)>0,r(z_0)=0$ となる $z_0$ がある。$e>0$ から $f(z_0)=er(z_0)=0$。従って $q(z_0)\log(f(z_0)/q(z_0))=-\infty$ であり、他の有限個の項は正の無限大にならないから $\mathcal L(q)=-\infty$。一方、KL の $z_0$ の項は $q(z_0)\log(q(z_0)/0)=+\infty$ である。$\log e$ は有限なので下界の不等式だけが成立する。$\square$
<!-- proof-end -->

**反例としての役割**。$f=(1/4,0)$、$e=1/4$、$r=(1,0)$、$q=(1/2,1/2)$ とする。第2状態の $q$ は正で $f$ は零だから $\mathcal L(q)=-\infty$、$D(q\|r)=+\infty$。壊れたのは「ELBO が下界である」という結論ではなく、有限な二つの項を足す操作である。プログラムでも `-Infinity + Infinity` は数として扱えない。実際には $q$ の台を模型の台の中に保つか、拡張値の不等式のみを使う。

## 4. 連続潜在変数への拡張

潜在因子が連続なら和を積分に置き換える。[ML2-07の連続Gaussian因子](../ML2-07/index.md#def-ml2-07-factor-model)はその具体例である。ただし離散と違い、密度の零集合を**ほとんど至る所**で扱い、対数比の可積分性が必要になる。

ここでは $\Omega\subset\mathbb R^d$ を可測集合とし、すべての密度は同じLebesgue測度 $dz$ に関して定義されるとする。固定した $x$ について $f_x(z)=p_\theta(x,z)\ge0$ を可測な同時密度の断面とし、$e=\int_\Omega f_x(z)\,dz\in(0,\infty)$ と仮定する。$r_x(z)=f_x(z)/e$ は積分1の事後密度である。$q$ も $\Omega$ 上の確率密度で、$q(z)>0$ なら $f_x(z)>0$ がほとんど至る所で成り立つ場合、$q\ll r_x$ と書く。

<a id="def-ml2-08-elbo-density"></a>

<!-- formal-statement-start -->
> **定義（連続密度の ELBO）**
> $\Omega\subset\mathbb R^d$ 上で $e\in(0,\infty)$、$q\ll r_x$ とし、$\{q>0\}$ 上の対数比が次を満たすとする。

$$
\int_{\{q>0\}}q(z)\left|\log\frac{f_x(z)}{q(z)}\right|\,dz<\infty.
$$

> このとき実数

$$
\mathcal L(q)=\int_{\{q>0\}}q(z)\log\frac{f_x(z)}{q(z)}\,dz
$$

> を連続密度の ELBO という。密度は測度零集合上で異なっていても同じ分布を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-08-elbo-density -->
**定義の確認**。$\Omega=[0,1]$、$f_x(z)=2z$、$e=\int_0^1 2z\,dz=1$、$q(z)=1$（$0\le z\le1$）とする。$f_x(0)=0$ だが零点は測度0で、$q\ll r_x$ は成立する。さらに

$$
\int_0^1\left|\log(2z)\right|dz
=\int_0^{1/2}-\log(2z)dz+\int_{1/2}^1\log(2z)dz
=\log2<\infty.
$$

よって ELBO は定義され、$\int_0^1\log(2z)dz=\log2-1$ となる。**一点で密度が零**というだけで、正の質量を持つ禁制状態と混同してはならない。
<!-- definition-example-end -->

<a id="thm-ml2-08-elbo-density-identity"></a>

<!-- formal-statement-start -->
> **定理（連続密度の ELBO 恒等式）**
> 前定義の可測性、$0<e<\infty$、$q\ll r_x$ および対数比の絶対可積分性を満たすとき、

$$
\boxed{\log p_\theta(x)=\mathcal L(q)+D(q\|r_x)}
$$

> が有限な実数の恒等式として成り立つ。$D(q\|r_x)\ge0$、等号 $\mathcal L(q)=\log p_\theta(x)$ は $q=r_x$ がほとんど至る所で成り立つ場合、かつその場合に限る。
<!-- formal-statement-end -->

### 証明の見取り図

密度比の中へ $r_x=f_x/e$ を代入する。定数 $\log e$ を積分の外に出すには $q$ が積分1であることを使う。可積分性があるので差の分解は不定形を生まない。

<!-- proof-start -->
### 証明

$q\ll r_x$ だから $\{q>0\}$ で $q/r_x$ の対数がほとんど至る所定義される。また

$$
\log\frac{q(z)}{r_x(z)}
=-\log\frac{f_x(z)}{q(z)}+\log e.
$$

右辺第一項は仮定で $q$ に関して絶対可積分、第二項は定数で $\int q=1$ だから積分可能。従って[連続密度のKLの扱い](../ML2-01/index.md#thm-ml2-01-density-kl-identity)と同じ積分規則で

$$
\begin{aligned}
D(q\|r_x)
&=\int_{\{q>0\}}q(z)\log\frac{q(z)}{r_x(z)}\,dz\\
&=-\int_{\{q>0\}}q(z)\log\frac{f_x(z)}{q(z)}\,dz
+\log e\int_\Omega q(z)\,dz\\
&=-\mathcal L(q)+\log e.
\end{aligned}
$$

非負性と等号条件をこの $d$ 次元の場合にも確認する。$A=\{z:q(z)>0\}$ とし、正の比 $u(z)=r_x(z)/q(z)$ に $\log u\le u-1$ を適用すると

$$
q(z)\log\frac{q(z)}{r_x(z)}\ge q(z)-r_x(z)\qquad(z\in A).
$$

両辺を積分して

$$
D(q\|r_x)\ge\int_A(q-r_x)\,dz
=1-\int_A r_x\,dz\ge0.
$$

最初の不等号で差を積分した非負量が零なら、$\log u=u-1$ の等号条件により $q=r_x$ が $A$ 上ほとんど至る所で成り立つ。最後の不等号が等号なら $r_x$ は $A$ の外に質量を持たない。二条件を合わせると $q=r_x$ が $\Omega$ 上ほとんど至る所である。逆向きは対数比が1となるため直ちに成り立つ。$\square$
<!-- proof-end -->

具体例で $r_x(z)=2z$、$q(z)=1$ なら $\log e=0$、$\mathcal L(q)=\log2-1$。ゆえに

$$
D(q\|r_x)=\int_0^1\log\frac1{2z}\,dz=1-\log2,
$$

となり、和は0である。積分の端点は広義積分として扱い、$\lim_{\varepsilon\downarrow0}\varepsilon\log\varepsilon=0$ を使う。

**もう一つの重要な書き換え**。$f_x(z)=p_\theta(x\mid z)p_\theta(z)$ と因子分解でき、$q\ll p_\theta(z)$、かつ $\log p_\theta(x\mid z)$ と $\log(p_\theta(z)/q(z))$ がともに $q$ に関して絶対可積分なら、

$$
\mathcal L(q)=E_q[\log p_\theta(x\mid Z)]-D(q\|p_\theta(z)).
$$

ここで右辺第1項は**観測の適合度**、第2項は**事前分布からのずれへの罰則**である。これは単なる対数の分解だが、二つの項を別々に書くにはそれぞれの可積分性を確認する必要がある。$q\ll p_\theta(z)$ だけでは観測尤度が零になる状態を避けたことにはならない。

## 5. 最適化の意味：近似事後分布を選ぶ

母数 $\theta$ と観測値 $x$ を固定すると $\log e$ は $q$ に依存しない。[ELBO恒等式](#thm-ml2-08-elbo-identity)は、$\mathcal L(q)$ を増やすことが **$D(q\|r)$ を減らすこと**と同じであることを示す。ただしこれは $D(r\|q)$ を最小化する話ではない。$q$ を簡単な変分族 $\mathcal Q$ に制限した場合、真の事後分布 $r$ が $\mathcal Q$ に含まれるとは限らない。

<a id="prop-ml2-08-variational-optimum"></a>

<!-- formal-statement-start -->
> **命題（変分最適化と近似の残差）**
> 有限状態の[ELBO恒等式](#thm-ml2-08-elbo-identity)の仮定の下、$q\ll r$ を満たす非空変分族 $\mathcal Q$ を考える。このとき

$$
\sup_{q\in\mathcal Q}\mathcal L(q)
=\log e-\inf_{q\in\mathcal Q}D(q\|r)\le\log e.
$$

> 変分族に $r$ が含まれるなら上限は $\log e$ で達成される。逆に上限が達成される $q^*$ について $\mathcal L(q^*)=\log e$ なら $q^*=r$ である。一般の非閉な変分族に最大点の存在を仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

各 $q$ で $\mathcal L(q)=\log e-D(q\|r)$ を使い、上限と下限を対応させる。最大点の存在は別問題であり、無条件には主張しない。

<!-- proof-start -->
### 証明

各 $q\in\mathcal Q$ に[有限状態のELBO恒等式](#thm-ml2-08-elbo-identity)を適用する。

$$
\mathcal L(q)=\log e-D(q\|r).
$$

集合 $\{D(q\|r):q\in\mathcal Q\}$ の下限を $d_*$ とする。下限の定義から、すべての $q$ に対し

$$
D(q\|r)\ge d_*,\qquad \mathcal L(q)\le\log e-d_*
$$

であり、ELBO の上限も右辺以下となる。一方、任意の $\varepsilon>0$ に対し、下限に十分近い $q_\varepsilon\in\mathcal Q$ を選べる。その選び方と ELBO への代入を順に書くと

$$
\begin{aligned}
D(q_\varepsilon\|r)&<d_*+\varepsilon,\\
\mathcal L(q_\varepsilon)
&=\log e-D(q_\varepsilon\|r)
>\log e-d_*-\varepsilon.
\end{aligned}
$$

$\varepsilon\downarrow0$ として上限の等式を得る。[Gibbs不等式](../../INFO/INFO2/index.md#thm-info2-gibbs)から $d_*\ge0$。$r\in\mathcal Q$ なら $D(r\|r)=0$ で上限を達成する。最大点が上界へ達した場合は[ELBOの等号条件](#thm-ml2-08-elbo-identity)から $q^*=r$。$\square$
<!-- proof-end -->

例えば先の $r(1)=1/3$ で、$q_t=(t,1-t)$ に対して $1/2\le t\le3/4$ だけを許す。この変分族は真の $r$ を含まない。$f_1=1/4,f_2=1/2$ の式を展開すると

$$
\mathcal L(t)=t\log\frac{1/4}{t}+(1-t)\log\frac{1/2}{1-t},
$$

$$
\mathcal L'(t)=\log\frac{1-t}{2t},\qquad
\mathcal L''(t)=-\frac1t-\frac1{1-t}<0.
$$

$t\ge1/2$ では $\mathcal L'(t)\le\log(1/2)<0$ なので、許容区間の最大点は端点 $t=1/2$。そこでの ELBO は $-\tfrac12\log2$ であり、$\log(3/4)$ より厳密に小さい。**変分最適化が収束しても、制約された族の中で最良なだけ**という現象である。

## 6. 計算ラボ：三つの数が毎回一致するか

二状態の非正規化重み $f_1,f_2>0$ と候補 $q=(t,1-t)$（$0<t<1$）を入力し、対数周辺尤度、ELBO、KL を独立の式で計算する。下の Python は疑似乱数を用いず、入力を変更すれば結果が再計算される。最初の組は $f=(1/4,1/2)$、$t=1/2$。次に $t=1/3$ と変え、KL が0になることを検査する。

```python
import math

def elbo_check(f1, f2, t):
    assert f1 > 0 and f2 > 0 and 0 < t < 1
    evidence = f1 + f2
    r1, r2 = f1 / evidence, f2 / evidence
    q1, q2 = t, 1 - t
    elbo = q1 * math.log(f1 / q1) + q2 * math.log(f2 / q2)
    kl = q1 * math.log(q1 / r1) + q2 * math.log(q2 / r2)
    log_evidence = math.log(evidence)
    assert abs(log_evidence - elbo - kl) < 1e-12
    assert kl >= -1e-12
    return log_evidence, elbo, kl

for t in [0.5, 1 / 3, 0.7]:
    print(t, elbo_check(0.25, 0.5, t))
```

期待する三つ組（小数第6位まで）は $t=1/2$ で $(-0.287682,-0.346574,0.058892)$、$t=1/3$ で $(-0.287682,-0.287682,0)$。$t=0.7$ では KL が再び正になる。このラボは事後分布を計算して検算するもので、複雑な模型の周辺化そのものを高速化するわけではない。禁制状態 $f_2=0$ を試す場合は、上の正値専用関数へ無理に入れず、[台の命題](#prop-ml2-08-support)で拡張値を判定する。

## 7. 演習

### ML2-08-A01 二状態の証拠と事後分布

- Level: A

$f=(1/6,1/3)$ とする。$e$、$r$、$q=(1/2,1/2)$ の ELBO と KL を求め、恒等式を直接照合せよ。

<!-- solution-start -->
#### 詳細解答

$e=1/6+1/3=1/2$、$r=((1/6)/(1/2),(1/3)/(1/2))=(1/3,2/3)$。$q$ は両成分が正で、$f$ も正なので[ELBOの定義](#def-ml2-08-elbo-finite)の台条件を満たす。

$$
\mathcal L(q)=\frac12\log\frac{1/6}{1/2}+\frac12\log\frac{1/3}{1/2}
=\frac12\log\frac13+\frac12\log\frac23=\frac12\log\frac29.
$$

[相対エントロピーの定義](../../INFO/INFO2/index.md#def-info2-relative-entropy)から

$$
D(q\|r)=\frac12\log\frac{1/2}{1/3}+\frac12\log\frac{1/2}{2/3}
=\frac12\log\frac98.
$$

和は $\tfrac12\log(2/9\cdot9/8)=\tfrac12\log(1/4)=\log(1/2)=\log e$ となる。
<!-- solution-end -->

### ML2-08-A02 欠けた台を持つ分布

- Level: A

$f=(2,1,0)$、$q=(1,0,0)$ と $q'=(1/2,0,1/2)$ について、有限な ELBO 恒等式を使えるか判定せよ。使える方では三項を求めよ。

<!-- solution-start -->
#### 詳細解答

$e=3$、$r=(2/3,1/3,0)$。$q$ は台が第1状態だけなので $q\ll r$。$\mathcal L(q)=\log2$、$D(q\|r)=\log(1/(2/3))=\log(3/2)$。従って $\log2+\log(3/2)=\log3$。$q'$ は第3状態に質量 $1/2$ を持ち、$r(3)=0$ に反するので $q'\not\ll r$。[台の命題](#prop-ml2-08-support)により $\mathcal L(q')=-\infty$、$D(q'\|r)=+\infty$ で、有限な恒等式を計算してはならない。
<!-- solution-end -->

### ML2-08-A03 真の事後分布を代入する

- Level: A

$f=(3/10,1/5)$ について $q=r$ とした ELBO が $\log e$ と一致することを比から直接示せ。

<!-- solution-start -->
#### 詳細解答

$e=3/10+2/10=1/2$、$r=(3/5,2/5)$。各 $z$ で $f(z)/r(z)=e=1/2$ なので、[ELBOの定義](#def-ml2-08-elbo-finite)に代入して

$$
\mathcal L(r)=\frac35\log\frac12+\frac25\log\frac12
=\left(\frac35+\frac25\right)\log\frac12=\log e.
$$

また $D(r\|r)=\sum_zr(z)\log1=0$。この等号の理由は各比が同じ周辺尤度になることにある。
<!-- solution-end -->

### ML2-08-A04 連続密度と零集合

- Level: A

$\Omega=[0,1]$、$f_x(z)=2z$、$q(z)=1$ とする。$e$、ELBO、KL を広義積分で求め、$z=0$ における $f_x(0)=0$ が絶対連続性を破らない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

$e=\int_0^1 2z\,dz=[z^2]_0^1=1$、$r_x(z)=2z$。零点集合 $\{0\}$ はLebesgue測度0で、$q$ はそこに確率質量を持たない。$q\ll r_x$ は成立し、$\int_0^1|\log(2z)|dz=\log2<\infty$ だから[連続ELBOの定義](#def-ml2-08-elbo-density)を満たす。

$$
\begin{aligned}
\mathcal L(q)
&=\lim_{\varepsilon\downarrow0}\int_\varepsilon^1\log(2z)\,dz\\
&=\lim_{\varepsilon\downarrow0}[z\log(2z)-z]_\varepsilon^1
=\log2-1,
\end{aligned}
$$

ここでは $\varepsilon\log(2\varepsilon)\to0$ を用いた。同様に密度比の対数を展開すれば $D(q\|r_x)=\int_0^1-\log(2z)dz=1-\log2$。和は0で $\log e=0$ と一致する。
<!-- solution-end -->

### ML2-08-B01 一般有限集合で式を再導出する

- Level: B

$\mathcal Z=\{1,\ldots,K\}$、$f(z)>0$、$q(z)\ge0$、$\sum_zq(z)=1$ とする。$q(z)=0$ の項の扱いを明示し、ELBO 恒等式と等号条件を出発点から証明せよ。

<!-- solution-start -->
#### 詳細解答

$e=\sum_zf(z)>0$、$r(z)=f(z)/e>0$ と置く。$S_q=\{z:q(z)>0\}$ だけで和を取れば、分子分母は正でありすべての対数が有限。$q(z)=0$ の状態は両期待値で寄与0とする。[相対エントロピーの定義](../../INFO/INFO2/index.md#def-info2-relative-entropy)から

$$
\begin{aligned}
D(q\|r)
&=\sum_{S_q}q(z)\log\frac{q(z)}{f(z)/e}\\
&=\sum_{S_q}q(z)\log\frac{q(z)}{f(z)}
+\log e\sum_{S_q}q(z)\\
&=-\mathcal L(q)+\log e.
\end{aligned}
$$

$\sum_{S_q}q(z)=1$ を使用した。[Gibbs不等式](../../INFO/INFO2/index.md#thm-info2-gibbs)より KL は非負で、零になるのは $q=r$ の場合だけ。従って ELBO は下界で、等号条件も得られる。$K$ が有限かつ全 $f>0$ なので収束問題や禁制状態は発生しない。
<!-- solution-end -->

### ML2-08-B02 変分族の端点最適化

- Level: B

$f=(1/4,1/2)$、$q_t=(t,1-t)$ とする。$1/2\le t\le3/4$ の範囲で ELBO を最大にする $t$、KL の最小値、真の事後分布を求め、最大点と事後分布が一致しない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

$e=3/4$、$r=(1/3,2/3)$。[変分最適化の式](#prop-ml2-08-variational-optimum)に出てくる関数を $t$ で直接微分すると

$$
\begin{aligned}
\mathcal L'(t)&=\log(1/4)-\log t-1
-\log(1/2)+\log(1-t)+1
=\log\frac{1-t}{2t},\\
\mathcal L''(t)&=-\frac1{1-t}-\frac1t<0.
\end{aligned}
$$

$1/2\le t\le3/4$ では $(1-t)/(2t)\le1/2<1$ なので $\mathcal L'(t)<0$。従って最大点は $t=1/2$ で、$\mathcal L=-\tfrac12\log2$、KL の最小値は $\log(3/4)+\tfrac12\log2=\tfrac12\log(9/8)$。真の事後分布の第1成分 $1/3$ は制約 $t\ge1/2$ に入らないため、KL=0 へ到達できない。
<!-- solution-end -->

### ML2-08-B03 観測適合度と事前KLの分解

- Level: B

$Z\in\{0,1\}$、$p(Z=0)=p(Z=1)=1/2$、$p(x\mid0)=1/4$、$p(x\mid1)=3/4$ とする。$q=(1/4,3/4)$ で $E_q\log p(x\mid Z)$、$D(q\|p(Z))$、ELBO を求め、周辺尤度と KL の差を照合せよ。

<!-- solution-start -->
#### 詳細解答

両状態で事前も尤度も正だから、[ELBOの事前・尤度分解](#thm-ml2-08-elbo-density-identity)の有限和版を使える。同時値は $f=(1/8,3/8)$、$e=1/2$、事後分布は $r=(1/4,3/4)$ であり、選んだ $q=r$ である。第一項は

$$
E_q\log p(x\mid Z)=\frac14\log\frac14+\frac34\log\frac34.
$$

第二項は

$$
D(q\|p(Z))=\frac14\log\frac{1/4}{1/2}
+\frac34\log\frac{3/4}{1/2}
=\frac14\log\frac12+\frac34\log\frac32.
$$

差を各状態ごとにまとめると

$$
\begin{aligned}
\mathcal L(q)
&=\frac14\log\frac{(1/4)(1/2)}{1/4}
+\frac34\log\frac{(3/4)(1/2)}{3/4}\\
&=\frac14\log\frac12+\frac34\log\frac12=\log\frac12.
\end{aligned}
$$

$q=r$ なので $D(q\|r)=0$ となり、$\log e=\mathcal L(q)+0$ を満たす。事前分布との KL は一般に零ではないことに注意する。
<!-- solution-end -->

### ML2-08-C01 零確率を持つ三状態模型と制約族

- Level: C

$f=(1/6,1/3,0)$、$e=\sum_zf(z)$、$r=f/e$ とする。候補族 $q_t=(t,1-t,0)$（$1/2\le t\le1$）を考える。

1. $r$ と $q_t$ の台条件を確認し、$t=1$ を含めた ELBO を式として定めよ。
2. $\mathcal L(q_t)$ の最大点と、そこでの KL の値を求めよ。
3. $q'=(1/4,1/2,1/4)$ を候補に加えた場合に「$\log e=\mathcal L(q')+D(q'\|r)$」と書けない理由を説明せよ。
4. $f$ の第3成分を $\varepsilon>0$ へ変えた場合、$q'$ による ELBO と KL は $\varepsilon\downarrow0$ でどう動くか調べよ。

<!-- solution-start -->
#### 詳細解答

**（1）** $e=1/6+1/3=1/2$、$r=(1/3,2/3,0)$。$q_t$ は第3成分が0なので、$r$ が正の第1・第2状態にだけ質量を持ち $q_t\ll r$ となる。$t<1$ なら

$$
\mathcal L(t)=t\log\frac{1/6}{t}+(1-t)\log\frac{1/3}{1-t}.
$$

$t=1$ では第2項は台から除き、$\mathcal L(1)=\log(1/6)$ とする。

**（2）** $1/2\le t<1$ において対数を微分すると

$$
\mathcal L'(t)=\log\frac{1-t}{2t},\qquad
\mathcal L''(t)=-\frac1t-\frac1{1-t}<0.
$$

$1/2\le t<1$ では $\mathcal L'(t)<0$ だから最大点は $t=1/2$。ELBO は

$$
\mathcal L(1/2)=\frac12\log\frac13+\frac12\log\frac23
=\frac12\log\frac29.
$$

従って[恒等式](#thm-ml2-08-elbo-identity)より $D(q_{1/2}\|r)=\log(1/2)-\tfrac12\log(2/9)=\tfrac12\log(9/8)>0$。$t=1$ の値 $\log(1/6)$ はこれより小さい。

**（3）** $q'(3)=1/4>0$ に対し $r(3)=0$ だから、[台の命題](#prop-ml2-08-support)より $\mathcal L(q')=-\infty$、$D(q'\|r)=+\infty$。右辺の和は未定義で、有限実数 $\log(1/2)$ と等置できない。

**（4）** $f_\varepsilon=(1/6,1/3,\varepsilon)$、$e_\varepsilon=1/2+\varepsilon$、$r_\varepsilon=f_\varepsilon/e_\varepsilon$ とする。$q'$ の各成分は正で、$f_\varepsilon$ の各成分も正だから恒等式を使える。第3項だけを分けると

$$
\mathcal L_\varepsilon(q')
=\frac14\log\frac{1/6}{1/4}
+\frac12\log\frac{1/3}{1/2}
+\frac14\log\frac{\varepsilon}{1/4}
=\frac34\log\frac23+\frac14\log(4\varepsilon).
$$

$\varepsilon\downarrow0$ で最終項が $-\infty$ へ向かい、ELBOも $-\infty$。一方 $\log e_\varepsilon\to\log(1/2)$ は有限だから

$$
D(q'\|r_\varepsilon)=\log(1/2+\varepsilon)-\mathcal L_\varepsilon(q')\longrightarrow+\infty.
$$

正の $\varepsilon$ ごとには恒等式が成り立つが、極限で $-\infty+\infty$ を足すことはできない。有限値の恒等式と極限での拡張値の扱いを区別する例である。
<!-- solution-end -->

## 8. ここから先へ

ELBO の最大化は、周辺尤度そのものが計算できない状況でも、同時密度と選んだ $q$ の期待値を使って事後近似を進める動機になる。ただし本講では、変分分布 $q$ をどういう計算しやすい形へ制限し、どう更新するかはまだ定めていない。次の ML2-09 で変数ごとに分けた変分族と更新式を扱う。ここで使った等号条件・台・可積分性は、その更新が何を最適化しているかを判断する基準となる。
