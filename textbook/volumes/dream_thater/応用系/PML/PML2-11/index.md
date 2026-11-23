# PML2-11 残差から解誤差を評価できるのはいつか

## 1. 小さい残差は、どの意味で正解に近いか

[PML2-10で見た学習未達成と表現限界](../PML2-10/index.md#def-pml2-10-training-outcome)は、候補関数を作る過程の問題だった。候補が一つ得られた後にも、別の問いがある。**方程式に代入したずれ（残差）が小さければ、真の解に近いと言えるか。**

本講では区間 $(0,1)$ の零Dirichlet Poisson問題を一貫して考える。以下のプライム $u'$、$u''$ は空間変数 $x$ に関する一階・二階微分であり、滑らかな関数では $du/dx$、$d^2u/dx^2$ と同じ意味になる。弱解では必要に応じて弱微分として解釈する。

$$
-u''=f\quad (0<x<1),\qquad u(0)=u(1)=0.
$$

ここで $f\in L^2(0,1)$ とする。[Dirichlet Poisson問題の存在・一意性・安定性](../PML2-01/index.md#thm-pml2-01-energy)により、エネルギー弱解 $u\in H_0^1(0,1)$ がただ一つある。さらに[PML2-01の一次元Dirichlet Poisson問題の解の構成](../PML2-01/index.md#thm-pml2-01-construction)から、この一次元問題の $u$ は弱二階微分 $u''=-f$ を持つ。

例えば $f=2$ の真解は $u(x)=x(1-x)$ である。候補を $v(x)=u(x)+1$ とすると $-v''-f=0$ なのに、端点で $v(0)=v(1)=1$、真の解との差は恒等的に $1$ になる。残差が完全に零でも、**境界条件を忘れると解は確定しない**。

そこで次の三つを区別する。

1. 内部の残差を有限個の点で測った量。
2. 区間全体で残差を二乗積分した量。
3. 内部の残差に加え、端点のずれを考慮した量。

本講で上界を証明するのは2と3である。1だけで十分かどうかは次講で詳しく扱う。

## 2. 連続領域の強形式残差を測る

[PML2-06の強形式残差](../PML2-06/index.md#def-pml2-06-strong-residual)は、連続な $f$ と二階連続微分可能な候補に対して各点で $r_v(x)=-v''(x)-f(x)$ を測るものだった。ここではより広く、区間全体で二乗積分できる残差を扱う。$L^2(0,1)$ は二乗可積分関数の空間で、$\|g\|_2=(\int_0^1|g|^2\,dx)^{1/2}$ がそのノルムである。

$H^2(0,1)$ は、関数 $v$ とその一階・二階の**弱微分** $v',v''$ がすべて $L^2(0,1)$ に属する空間である。$f\in L^2$、$v\in H^2$ なら $r_v=-v''-f$ は $L^2$ の元として定まる。$L^2$ では関数はほとんど至る所で一致すれば同じ元と扱うため、個々の点の値は一意でなくても、二乗積分とそのノルムは一意に定まる。

<a id="def-pml2-11-continuous-residual"></a>

<!-- formal-statement-start -->
> **定義（Poisson強形式残差の連続ノルム）**  
> $f\in L^2(0,1)$ と、弱二階微分を持つ候補 $v\in H^2(0,1)$ を取る。強形式残差 $r_v=-v''-f\in L^2(0,1)$ と、その連続残差ノルム $\rho(v)$ を次で定める。

$$
\rho(v)=\|r_v\|_2
=\left(\int_0^1|-v''(x)-f(x)|^2\,dx\right)^{1/2}.
$$

> ここでは端点値の条件を課さない。$v\in C^2([0,1])$ なら二階微分は通常の意味で計算できる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml2-11-continuous-residual -->
**定義の確認**。 $f=2$ は $L^2(0,1)$ に属する。$v(x)=\frac32x(1-x)$ は多項式であり、$v$ と一階・二階微分がすべて $L^2$ に属するので $v\in H^2(0,1)$、両端で零となる。$v'=\frac32(1-2x)$、$v''=-3$ だから $r_v=3-2=1\in L^2$。よって $\rho(v)^2=\int_0^1 1\,dx=1$、$\rho(v)=1$ である。この例は滑らかなので点ごとの残差も定義できるが、一般の $L^2$ 残差にはその性質を要求しない。
<!-- definition-example-end -->

一方、[PML2-06の経験物理損失](../PML2-06/index.md#def-pml2-06-collocation)は、$f\in C([0,1])$、$v\in C^2([0,1])$ などの点評価が可能な条件を置き、$N\ge1$ 個の内部点 $x_i\in(0,1)$ で残差を測る。

$$
L_{\mathrm{phys}}(v)=\frac1N\sum_{i=1}^N|r_v(x_i)|^2.
$$

一般の $f\in L^2$、$v\in H^2$ に対しては、$r_v$ の代表元を変えると点値が変わり得るので、この有限和を無条件には定義できない。点評価を保証する追加条件のもとでも、有限和が $\rho(v)^2$ と一致するとは限らない。定積分を数値積分で求める場合も、その積分誤差を別途評価する必要がある。したがって以下の定理に学習損失を代入するには、まず**連続残差ノルムの上界**を得る工程が要る。

## 3. Dirichlet条件を満たす候補の誤差保証

まず近似候補 $v$ にも $v(0)=v(1)=0$ を課す。[PML2-08のhard試行関数](../PML2-08/index.md#def-pml2-08-hard-trial)はこの条件を満たす候補の作り方を与えていた。

真解との差 $e=v-u$ を考える。$e$ は両端で零となり、$-e''=r_v$ である。これは、**残差を右辺とするもう一つの零Dirichlet Poisson問題**にほかならない。

必要な道具は、$w\in H_0^1(0,1)$ に対する[PML2-01で導いたPoincaré評価](../PML2-01/index.md#thm-pml2-01-energy)である。

$$
\|w\|_2\le C_P\|w'\|_2,\qquad C_P=\frac1{\sqrt2}.
$$

この値は使いやすい有効な定数であり、最良定数とは主張しない。導出の元になる一般的な[Poincaré不等式](../../../解析系/GPDE/GPDE4/index.md#thm-gpde4-poincare)も既習である。

<a id="thm-pml2-11-energy-error"></a>

<!-- formal-statement-start -->
> **定理（零Dirichlet Poissonの強残差からの誤差評価）**  
> $f\in L^2(0,1)$ とし、$u\in H_0^1(0,1)$ を $-u''=f$ の一意なエネルギー弱解とする。候補 $v\in H^2(0,1)\cap H_0^1(0,1)$ に対し、$r_v=-v''-f$、$e=v-u$ と置く。$C_P=1/\sqrt2$ とすると、次が成立する。

$$
\|e'\|_2\le C_P\|r_v\|_2
=\frac1{\sqrt2}\rho(v).
$$

$$
\|e\|_2\le C_P^2\|r_v\|_2
=\frac12\rho(v).
$$

> したがって、端点条件を厳密に満たし、連続残差ノルムの上界が既知なら、導関数の誤差と関数値の誤差をともに評価できる。
<!-- formal-statement-end -->

**証明の見取り図。** 真解と候補の弱形式を引き、試験関数として誤差 $e$ 自身を入れる。左辺が $\|e'\|_2^2$ になったらCauchy–Schwarz不等式とPoincaré評価を順に使う。最後にもう一度Poincaré評価を使って $\|e\|_2$ に戻す。

<!-- proof-start -->
### 証明

[零Dirichlet Poisson問題のエネルギー弱解](../PML2-01/index.md#def-pml2-01-weak)により、任意の $\varphi\in H_0^1(0,1)$ について

$$
\int_0^1u'\varphi'\,dx=\int_0^1f\varphi\,dx
$$

が成立する。$v\in H^2\cap H_0^1$ なので、端点で $\varphi=0$ を用いる部分積分から

$$
\int_0^1v'\varphi'\,dx
=-\int_0^1v''\varphi\,dx
=\int_0^1(f+r_v)\varphi\,dx
$$

を得る。二式を引き $e=v-u$ とすれば、

$$
\int_0^1e'\varphi'\,dx=\int_0^1r_v\varphi\,dx.
$$

両者が $H_0^1$ に属するので $e\in H_0^1$ であり、$\varphi=e$ を選べる。ここで[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)と直前の[Poincaré評価](../PML2-01/index.md#thm-pml2-01-energy)を適用すると、

$$
\begin{aligned}
\|e'\|_2^2
&=\int_0^1r_ve\,dx\\
&\le\|r_v\|_2\|e\|_2\\
&\le C_P\|r_v\|_2\|e'\|_2.
\end{aligned}
$$

$\|e'\|_2=0$ なら最初の上界が成立する。$\|e'\|_2>0$ なら両辺を $\|e'\|_2$ で割って $\|e'\|_2\le C_P\|r_v\|_2$。もう一度Poincaré評価を使えば、

$$
\|e\|_2\le C_P\|e'\|_2
\le C_P^2\|r_v\|_2.
$$

最後に $C_P=1/\sqrt2$ を代入して所望の二式を得た。
<!-- proof-end -->

### 具体例：保証値と真の誤差を分ける

$f=2$、$u=x(1-x)$、$v=(1+\delta)x(1-x)$（$\delta\in\mathbb R$）を取る。両端は零、残差は $r_v=2\delta$ だから $\rho(v)=2|\delta|$ である。一方、

$$
e=\delta x(1-x),\qquad e'=\delta(1-2x).
$$

直接積分して

$$
\int_0^1(1-2x)^2\,dx=\frac13,\qquad
\int_0^1x^2(1-x)^2\,dx=\frac1{30}
$$

だから

$$
\|e'\|_2=\frac{|\delta|}{\sqrt3},\qquad
\|e\|_2=\frac{|\delta|}{\sqrt{30}}.
$$

定理による上界はそれぞれ $\sqrt2|\delta|$、$|\delta|$ で、実際の誤差以上になっている。**誤差の上界は誤差の正確な値ではない**。この余裕は選んだPoincaré定数や不等式によるものである。

## 4. 二階微分できない候補でも残差は測れるか

前節の強形式残差には $v''$ が必要だった。しかし有限要素法の区分一次関数など、$v\in H_0^1(0,1)$ でも通常の二階微分を関数として扱いにくい近似がある。そこで[PML2-01のエネルギー弱解](../PML2-01/index.md#def-pml2-01-weak)と同じ試験関数で方程式からのずれを測る。

$H_0^1(0,1)$ は[区間上の零トレース条件](../../../解析系/GPDE/GPDE4/index.md#thm-gpde4-h01-trace-kernel-interval)により、両端で零となり一階弱微分が二乗可積分な関数の空間であり、$\|\varphi'\|_2$ はこの空間上のノルムである。試験関数 $\varphi$ ごとに実数を割り当て、$\varphi$ に関して線形な写像を**線形汎関数**という。ずれを表す線形汎関数を、試験関数のノルムで割って上限を取ることで、その大きさを測る。

<a id="def-pml2-11-weak-defect"></a>

<!-- formal-statement-start -->
> **定義（エネルギー弱残差とその双対ノルム）**  
> $f\in L^2(0,1)$、$v\in H_0^1(0,1)$ に対し、任意の $\varphi\in H_0^1(0,1)$ へ作用する線形汎関数 $R_v$ と、その双対ノルムを定める。

$$
R_v(\varphi)
=\int_0^1v'(x)\varphi'(x)\,dx-\int_0^1f(x)\varphi(x)\,dx.
$$

$$
\|R_v\|_{-1}
=\sup_{\substack{\varphi\in H_0^1(0,1)\\\|\varphi'\|_2>0}}
\frac{|R_v(\varphi)|}{\|\varphi'\|_2}.
$$

> ここで $\|\cdot\|_{-1}$ は、分母に一階微分の $L^2$ ノルムを用いた双対ノルムを表す。この定義には $v''$ は必要ない。
<!-- formal-statement-end -->

この $R_v$ は、[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)と[Poincaré評価](../PML2-01/index.md#thm-pml2-01-energy)により、任意の $\varphi\in H_0^1(0,1)$ に対して

$$
\begin{aligned}
|R_v(\varphi)|
&\le \|v'\|_2\|\varphi'\|_2+\|f\|_2\|\varphi\|_2\\
&\le\bigl(\|v'\|_2+C_P\|f\|_2\bigr)\|\varphi'\|_2
\end{aligned}
$$

を満たす。よって $\|R_v\|_{-1}$ は有限で、全試験関数に対する上限を意味する。

<!-- definition-example-start: def-pml2-11-weak-defect -->
**定義の確認**。 $f=0\in L^2$、$v(x)=x(1-x)$、$\varphi(x)=x(1-x)$ とする。$v,\varphi$ は一階微分が $L^2$ に属する多項式で、端点値が零なので[区間上の零トレース条件](../../../解析系/GPDE/GPDE4/index.md#thm-gpde4-h01-trace-kernel-interval)からともに $H_0^1$ に属する。従って

$$
R_v(\varphi)
=\int_0^1(1-2x)^2\,dx
=\frac13,\qquad
\|\varphi'\|_2=\frac1{\sqrt3}.
$$

よって定義の比は $1/\sqrt3$ であり、$\|R_v\|_{-1}\ge1/\sqrt3$ だと分かる。$\varphi$ を一つ選んだだけでは上限を確定できないが、次の定理で逆向きも示せる。
<!-- definition-example-end -->

<a id="thm-pml2-11-dual-error"></a>

<!-- formal-statement-start -->
> **定理（弱残差ノルムとエネルギー誤差の一致）**  
> $f\in L^2(0,1)$、$-u''=f$ の零Dirichlet弱解 $u\in H_0^1(0,1)$、任意の $v\in H_0^1(0,1)$ について、前節の $R_v$ は有界であり、$e=v-u$ と置くと次の等式が成立する。

$$
\|R_v\|_{-1}=\|e'\|_2.
$$

> 特に、強形式残差が定義されない候補にもエネルギー誤差の指標を与える。
<!-- formal-statement-end -->

**証明の見取り図。** 弱解の式を差し引くと $R_v(\varphi)=\int e'\varphi'$。Cauchy–Schwarz不等式は任意の試験関数に対して上界を与え、試験関数を $\varphi=e$ とすればその上界が実際に達成される。

<!-- proof-start -->
### 証明

[零Dirichlet Poisson問題のエネルギー弱解](../PML2-01/index.md#def-pml2-01-weak)から、任意の $\varphi\in H_0^1$ について

$$
\int_0^1u'\varphi'\,dx=\int_0^1f\varphi\,dx.
$$

これを $R_v$ の式へ代入すると

$$
R_v(\varphi)=\int_0^1(v'-u')\varphi'\,dx
=\int_0^1e'\varphi'\,dx.
$$

[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)により $|R_v(\varphi)|\le\|e'\|_2\|\varphi'\|_2$。ゆえに $\|R_v\|_{-1}\le\|e'\|_2$ であり、同時に有界性が示された。

$\|e'\|_2=0$ なら $e$ は零端点の定数関数なので $e=0$、したがって $R_v=0$。$\|e'\|_2>0$ なら $\varphi=e\in H_0^1$ を選べて

$$
\frac{|R_v(e)|}{\|e'\|_2}
=\frac{\int_0^1|e'|^2\,dx}{\|e'\|_2}
=\|e'\|_2.
$$

定義上の上限はこの値以上だから逆向きの不等式も成立し、等号が得られる。
<!-- proof-end -->

この一致は**弱残差の双対ノルムそのもの**についての主張である。有限個の試験関数に対する最大値ではない。実装ではすべての試験関数への上限を厳密に計算できない場合があり、そのときは別の評価が必要になる。

強形式残差がある場合、部分積分から $R_v(\varphi)=\int r_v\varphi$。さらに[Poincaré評価](../PML2-01/index.md#thm-pml2-01-energy)より

$$
|R_v(\varphi)|\le\|r_v\|_2\|\varphi\|_2
\le C_P\|r_v\|_2\|\varphi'\|_2.
$$

従って $\|e'\|_2=\|R_v\|_{-1}\le C_P\rho(v)$ が再現される。前節の定理との接続がこれで説明できる。

## 5. 境界条件を近似的に満たす場合

[PML2-08のsoft penalty](../PML2-08/index.md#def-pml2-08-soft-penalty)を使うと、学習後の候補が端点で真の値から少しずれる場合がある。このとき $e=v-u$ が $H_0^1$ に属するとは限らないため、前節の証明で $\varphi=e$ を選ぶことはできない。端点のずれだけを運ぶ**一次関数**を引けば、残りは零Dirichlet条件に戻る。

<a id="def-pml2-11-boundary-lift"></a>

<!-- formal-statement-start -->
> **定義（端点誤差の一次補間と零端点への補正）**  
> $v\in H^2(0,1)$ とし、その絶対連続代表元の端点値を $a=v(0)$、$b=v(1)$ とする。これは $H^2\subset H^1$ と[区間上のSobolev関数の連続代表元](../../../解析系/GPDE/GPDE4/index.md#thm-gpde4-w11-ac)によって定まる。端点誤差の一次補間 $\ell$ と、境界補正した候補 $v_0$ を次で定める。

$$
\ell(x)=(1-x)a+xb,\qquad v_0(x)=v(x)-\ell(x).
$$

> $\ell(0)=a$、$\ell(1)=b$、$\ell''=0$ なので $v_0(0)=v_0(1)=0$ かつ $-v_0''-f=-v''-f$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml2-11-boundary-lift -->
**定義の確認**。 $f=2$、$u=x(1-x)$、$v=u+1-2x$ では $a=1$、$b=-1$。定義による $\ell=(1-x)\cdot1+x(-1)=1-2x$、$v_0=v-\ell=u$。端点はともに零に補正され、$\ell''=0$ だから残差は補正前後とも零である。境界違反だけを切り分けている。
<!-- definition-example-end -->

<a id="thm-pml2-11-boundary-error"></a>

<!-- formal-statement-start -->
> **定理（強残差と端点誤差を併用する上界）**  
> $f\in L^2(0,1)$、$u\in H_0^1(0,1)$ を零Dirichlet Poissonの一意な弱解とし、任意の $v\in H^2(0,1)$ に対して $r_v=-v''-f$、$a=v(0)$、$b=v(1)$、$e=v-u$ と置く。$C_P=1/\sqrt2$ のとき次の上界が成立する。

$$
\|e'\|_2\le C_P\|r_v\|_2+|b-a|.
$$

$$
\|e\|_2\le C_P^2\|r_v\|_2
+\sqrt{\frac{a^2+ab+b^2}{3}}.
$$

> 端点誤差 $a=b=0$ の場合には前節の強残差評価に帰着する。
<!-- formal-statement-end -->

**証明の見取り図。** 一次補間 $\ell$ を候補から引いて $v_0=v-\ell$ とする。$v_0$ は境界を厳密に守り、残差は元と同じ。$e=(v_0-u)+\ell$ に三角不等式を適用し、$\ell$ のノルムを直接積分する。

<!-- proof-start -->
### 証明

[一次補間の定義](#def-pml2-11-boundary-lift)から、$v_0=v-\ell$ は $H^2\cap H_0^1$ に属し、$\ell''=0$ のため

$$
-v_0''-f=-v''+\ell''-f=r_v.
$$

従って[強残差からの誤差評価](#thm-pml2-11-energy-error)を $v_0$ に適用できる。$w=v_0-u$ と置くと

$$
\|w'\|_2\le C_P\|r_v\|_2,\qquad
\|w\|_2\le C_P^2\|r_v\|_2.
$$

一方、$\ell'=b-a$ は定数だから

$$
\|\ell'\|_2^2=\int_0^1(b-a)^2\,dx=(b-a)^2.
$$

また $\ell=a+(b-a)x$ を二乗して積分すれば

$$
\begin{aligned}
\|\ell\|_2^2
&=\int_0^1\{a+(b-a)x\}^2\,dx\\
&=a^2+a(b-a)+\frac{(b-a)^2}{3}\\
&=\frac{a^2+ab+b^2}{3}.
\end{aligned}
$$

$e=v-u=(v_0-u)+\ell=w+\ell$ である。三角不等式を $e$ と $e'$ にそれぞれ適用して

$$
\|e'\|_2\le\|w'\|_2+\|\ell'\|_2
\le C_P\|r_v\|_2+|b-a|,
$$

$$
\|e\|_2\le\|w\|_2+\|\ell\|_2
\le C_P^2\|r_v\|_2+\sqrt{(a^2+ab+b^2)/3}.
$$

これで二つの評価が得られた。
<!-- proof-end -->

### なぜ境界誤差の二項が必要か

$f=2$、$v=u+c$（定数 $c\ne0$）を考える。$r_v=0$、$a=b=c$ であり、

$$
\|v-u\|_2=|c|,\qquad \|(v-u)'\|_2=0.
$$

上の関数誤差の評価は $0+\sqrt{(c^2+c^2+c^2)/3}=|c|$ となって等号で成立する。**残差だけなら右辺が零になって誤る**。失われた仮定は零Dirichlet境界であり、壊れる操作は誤差を零端点の試験関数として選ぶ段階である。

別の例 $v=u+cx$ では $a=0$、$b=c$、残差は零、導関数の誤差は $|c|$ になる。したがって関数値のずれだけでなく、勾配のずれにも端点情報が必要である。

## 6. 「残差が小さい」の判定条件

この章で得た評価は**事後誤差評価**の具体例である。近似を構成したあとに残差と端点誤差を測り、その値から真の解との差の上界を導く。評価を使う前に以下の条件を確認する。

1. **問題が固定されているか。** 右辺 $f$、領域 $(0,1)$、零Dirichletデータ、真解の意味を指定する。
2. **一意性と安定性があるか。** 今回は[PML2-01のPoisson安定性定理](../PML2-01/index.md#thm-pml2-01-energy)とPoincaré評価がそれを担う。境界条件を外すと定数・一次関数の自由度が残る。
3. **どの残差を測ったか。** 連続残差 $\rho(v)=\|r_v\|_2$ なのか、[経験物理損失](../PML2-06/index.md#def-pml2-06-collocation)なのかを分ける。有限点の残差の小ささは、そのまま $\rho(v)$ の上界にならない。
4. **候補は必要な関数空間に入るか。** 強残差の定理は $H^2$ の候補に適用する。弱残差の等式は境界を守る $H_0^1$ の候補にも使えるが、その双対ノルムを評価する工程が要る。
5. **境界が本当に守られているか。** hard制約なら[強形式残差からの誤差評価](#thm-pml2-11-energy-error)、soft制約なら[端点誤差を含む上界](#thm-pml2-11-boundary-error)を用いる。

### 連続残差と有限点残差の違いを目で確かめる

$f=2$、真解 $u=x(1-x)$ とし、$v(x)=u(x)+\varepsilon x(1-x)(x-\tfrac12)^3$（$\varepsilon\ne0$）とする。両端で $v=0$。$p(x)=x(1-x)(x-\tfrac12)^3$ は $x=\tfrac12$ で三重零点を持つので、積を二度微分した $p''(\tfrac12)$ も零となる。従って

$$
r_v(\tfrac12)=-\varepsilon p''(\tfrac12)=0.
$$

しかし $p(1/4)\ne0$ だから $v-u=\varepsilon p$ は零関数ではなく、$\|v-u\|_2>0$。この候補は**一点の経験残差を完全に消しても関数誤差が残る**。有限点から連続ノルムへの橋渡しが何を必要とするかはPML2-12で検討する。

## 7. 演習と詳細解答

### Level A：定義・直接計算

<a id="ex-pml2-11-a01"></a>

### PML2-11-A01：残差の定義域と連続ノルム
- Level: A

$f=2$、$v(x)=\frac32x(1-x)$ について、$v$ の端点値、強形式残差、連続残差ノルムを求めよ。

<!-- solution-start -->
**詳細解答。** $v$ は二次多項式だから $H^2(0,1)$ に属し、$v(0)=v(1)=0$。$v'=\frac32(1-2x)$、$v''=-3$ より、[強形式残差](#def-pml2-11-continuous-residual)は $r_v=-(-3)-2=1$。従って $\rho(v)^2=\int_0^1|1|^2dx=1$、$\rho(v)=1$ である。単一の点での残差が1という事実と、区間全体の二乗積分が1という計算を別々に確かめた。
<!-- solution-end -->

<a id="ex-pml2-11-a02"></a>

### PML2-11-A02：関数誤差と導関数誤差
- Level: A

$f=2$、$u=x(1-x)$、$v=(1+\delta)x(1-x)$（$\delta\in\mathbb R$）について、$\|v-u\|_2$ と $\|(v-u)'\|_2$ を直接積分せよ。

<!-- solution-start -->
**詳細解答。** $e=v-u=\delta(x-x^2)$、$e'=\delta(1-2x)$。まず

$$
\|e'\|_2^2=\delta^2\int_0^1(1-4x+4x^2)\,dx
=\delta^2(1-2+4/3)=\delta^2/3.
$$

また

$$
\|e\|_2^2
=\delta^2\int_0^1(x^2-2x^3+x^4)\,dx
=\delta^2(1/3-1/2+1/5)=\delta^2/30.
$$

従って $\|e'\|_2=|\delta|/\sqrt3$、$\|e\|_2=|\delta|/\sqrt{30}$。二種類の誤差は別の量である。
<!-- solution-end -->

<a id="ex-pml2-11-a03"></a>

### PML2-11-A03：残差ゼロでも解でない候補
- Level: A

$f=2$、真解 $u=x(1-x)$、$v=u+c$（$c\ne0$）とする。$r_v$、端点誤差、$\|v-u\|_2$ を求め、どの仮定が欠けるか答えよ。

<!-- solution-start -->
**詳細解答。** 定数の二階微分は零なので $r_v=-u''-f=2-2=0$。真解は両端零だが $v(0)=v(1)=c$ である。$e=c$ だから $\|e\|_2^2=\int_0^1c^2dx=c^2$、$\|e\|_2=|c|$。[強残差誤差定理](#thm-pml2-11-energy-error)は $v\in H_0^1$ を要求するが $v$ はこれを満たさない。境界誤差を含めない上界を適用することが誤りである。
<!-- solution-end -->

<a id="ex-pml2-11-a04"></a>

### PML2-11-A04：境界の一次補間
- Level: A

$v(0)=1$、$v(1)=-2$ とする。[端点補間](#def-pml2-11-boundary-lift) $\ell$ を求め、$\ell''$、$\|\ell'\|_2$、$\|\ell\|_2$ を計算せよ。

<!-- solution-start -->
**詳細解答。** $a=1,b=-2$ を代入すると $\ell=(1-x)\cdot1+x(-2)=1-3x$。よって $\ell'=-3$、$\ell''=0$ である。$\|\ell'\|_2^2=\int_0^1 9\,dx=9$ だから $\|\ell'\|_2=3$。また

$$
\|\ell\|_2^2
=\int_0^1(1-6x+9x^2)\,dx
=1-3+3=1,
$$

ゆえに $\|\ell\|_2=1$。定理の式 $(a^2+ab+b^2)/3=(1-2+4)/3=1$ とも一致する。
<!-- solution-end -->

<a id="ex-pml2-11-a05"></a>

### PML2-11-A05：弱残差は試験関数を選んで評価する
- Level: A

$f=0$、$v=x(1-x)$、$\varphi=x(1-x)$ とする。[弱残差](#def-pml2-11-weak-defect)の $R_v(\varphi)$ と、正規化比 $|R_v(\varphi)|/\|\varphi'\|_2$ を求めよ。それだけで双対ノルムの値を断定できるか。

<!-- solution-start -->
**詳細解答。** $v'=\varphi'=1-2x$ だから

$$
R_v(\varphi)=\int_0^1(1-2x)^2\,dx=\frac13.
$$

また $\|\varphi'\|_2=\sqrt{1/3}$ なので比は $(1/3)/\sqrt{1/3}=1/\sqrt3$。この一つの試験関数から分かるのは $\|R_v\|_{-1}\ge1/\sqrt3$ までである。一方、[弱残差とエネルギー誤差の一致](#thm-pml2-11-dual-error)を使えば、$f=0$ の真解 $u=0$ より $\|R_v\|_{-1}=\|v'\|_2=1/\sqrt3$ と確定できる。
<!-- solution-end -->

### Level B：適用条件の変更と導出

<a id="ex-pml2-11-b01"></a>

### PML2-11-B01：区間長を変えた誤差評価
- Level: B

区間 $(0,L)$（$L>0$）の零Dirichlet Poisson問題を考える。$f\in L^2(0,L)$、$v\in H^2(0,L)\cap H_0^1(0,L)$ とする。$|w(x)|\le\sqrt{x}\|w'\|_{L^2(0,L)}$ からPoincaré定数 $C_{P,L}=L/\sqrt2$ を導き、残差 $r=-v''-f$ に対する $\|v-u\|_{L^2}$ と $\|(v-u)'\|_{L^2}$ の上界を示せ。

<!-- solution-start -->
**詳細解答。** $w(0)=0$ と一階微分の積分表示より、$w(x)=\int_0^xw'(s)\,ds$。[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)により $|w(x)|^2\le x\|w'\|_{L^2(0,L)}^2$。$0\le x\le L$ で積分すると

$$
\|w\|_{L^2(0,L)}^2
\le\left(\int_0^Lx\,dx\right)\|w'\|_{L^2(0,L)}^2
=\frac{L^2}{2}\|w'\|_{L^2(0,L)}^2.
$$

よって $C_{P,L}=L/\sqrt2$ が使える。$e=v-u$ は零端点で、弱形式の差に $\varphi=e$ を代入すると $\|e'\|^2=\int_0^Lre\le\|r\|\|e\|\le C_{P,L}\|r\|\|e'\|$。零の場合を分けて割り算すれば

$$
\|e'\|_{L^2(0,L)}\le\frac{L}{\sqrt2}\|r\|_{L^2(0,L)}.
$$

もう一度Poincaré評価を使い $\|e\|_{L^2(0,L)}\le(L^2/2)\|r\|_{L^2(0,L)}$。区間長で係数が変わることまで確かめた。
<!-- solution-end -->

<a id="ex-pml2-11-b02"></a>

### PML2-11-B02：内部誤差ゼロ・境界誤差だけの例
- Level: B

$f=2$、$u=x(1-x)$、$v=u+a(1-x)+bx$ とする。$a,b\in\mathbb R$ は任意とする。残差、導関数誤差、関数誤差を厳密に求め、[境界誤差の定理](#thm-pml2-11-boundary-error)の上界との関係を説明せよ。

<!-- solution-start -->
**詳細解答。** 補正項 $\ell=a+(b-a)x$ は二階微分が零なので $r_v=-u''-f=0$。$e=v-u=\ell$ であり、$e'=b-a$ より $\|e'\|_2=|b-a|$。関数誤差は

$$
\begin{aligned}
\|e\|_2^2
&=\int_0^1\{a+(b-a)x\}^2dx\\
&=a^2+a(b-a)+(b-a)^2/3\\
&=(a^2+ab+b^2)/3.
\end{aligned}
$$

両ノルムを正の平方根で表す。残差の項は零なので、[境界誤差の定理](#thm-pml2-11-boundary-error)は二つとも等号で成立する。$a=b\ne0$ なら導関数誤差は零でも関数誤差は零ではない。
<!-- solution-end -->

<a id="ex-pml2-11-b03"></a>

### PML2-11-B03：正弦波で残差の上界と真値を比較
- Level: B

$f=0$、$v(x)=\frac{\beta}{\pi^2}\sin(\pi x)$（$\beta\in\mathbb R$）とする。端点条件と強残差を確認し、$\rho(v)$、$\|v-u\|_2$、$\|(v-u)'\|_2$ を計算せよ。さらに弱残差の双対ノルムを求めよ。

<!-- solution-start -->
**詳細解答。** $f=0$ の零Dirichlet真解は $u=0$ である。$\sin0=\sin\pi=0$ なので $v$ は境界条件を満たす。微分すると

$$
v'=\frac{\beta}{\pi}\cos(\pi x),\qquad
v''=-\beta\sin(\pi x).
$$

よって $r_v=-v''=\beta\sin(\pi x)$。$\int_0^1\sin^2(\pi x)dx=\int_0^1\cos^2(\pi x)dx=1/2$ だから

$$
\rho(v)=\frac{|\beta|}{\sqrt2},\quad
\|v-u\|_2=\frac{|\beta|}{\pi^2\sqrt2},\quad
\|(v-u)'\|_2=\frac{|\beta|}{\pi\sqrt2}.
$$

[弱残差の等式](#thm-pml2-11-dual-error)を $e=v$ に適用すれば $\|R_v\|_{-1}=|\beta|/(\pi\sqrt2)$。強残差の定理からの勾配上界は $\rho(v)/\sqrt2=|\beta|/2$ なので、実際の勾配誤差より大きい。
<!-- solution-end -->

<a id="ex-pml2-11-b04"></a>

### PML2-11-B04：経験残差だけでは足りない
- Level: B

$f=2$、$u=x(1-x)$、$p(x)=x(1-x)(x-\frac12)^3$、$v=u+\varepsilon p$（$\varepsilon\ne0$）とする。$v$ の端点条件、$x=\frac12$ における強残差、$v-u$ が零関数でないことを示せ。なぜ[零Dirichlet Poissonの強残差からの誤差評価](#thm-pml2-11-energy-error)から誤差ゼロを結論できないか説明せよ。

<!-- solution-start -->
**詳細解答。** $p$ には $x$ と $1-x$ が因子としてあるので $p(0)=p(1)=0$、したがって $v$ は零Dirichlet条件を満たす。$t=x-\frac12$、$q=x(1-x)$ と置くと $p=qt^3$ であり、積の微分により

$$
p'=q't^3+3qt^2,\qquad
p''=q''t^3+6q't^2+6qt.
$$

$t=0$ では三項がすべて零なので $p''(1/2)=0$。$-u''-f=0$ より $r_v(1/2)=-\varepsilon p''(1/2)=0$。一方、$p(1/4)=(1/4)(3/4)(-1/4)^3\ne0$ だから、連続関数 $v-u=\varepsilon p$ は零関数でなく、$\|v-u\|_2>0$ である。定理の右辺は一点の $|r_v(1/2)|$ ではなく $\|r_v\|_2$ である。一点の零から連続ノルムが零とは言えない。
<!-- solution-end -->

### Level C：残差・境界誤差・真値の統合

<a id="ex-pml2-11-c01"></a>

### PML2-11-C01：複合した候補の事後誤差保証
- Level: C

$f=2$、真解 $u=x(1-x)$、候補

$$
v(x)=(1+\delta)x(1-x)+a(1-x)+bx
$$

を考える（$\delta,a,b\in\mathbb R$）。次を求めよ。

1. 強形式残差と $\rho(v)$、端点誤差 $a,b$。
2. $\|v-u\|_2^2$ と $\|(v-u)'\|_2^2$ の厳密な式。
3. $\delta=\frac12$、$a=\frac14$、$b=-\frac14$ としたときの厳密な誤差と、[境界誤差の定理](#thm-pml2-11-boundary-error)による二つの上界。
4. この例で $\rho(v)$ のみから真の誤差を見積もる手順がどこで不完全になるか。

<!-- solution-start -->
**詳細解答。** まず $q=x(1-x)$、$\ell=a+(b-a)x$ と置く。$q''=-2$、$\ell''=0$ なので $v''=-2(1+\delta)$。したがって

$$
r_v=-v''-f=2(1+\delta)-2=2\delta,\qquad
\rho(v)=\sqrt{\int_0^1(2\delta)^2dx}=2|\delta|.
$$

$q(0)=q(1)=0$ より $v(0)=a$、$v(1)=b$ で、端点誤差は $a,b$ である。

次に $e=v-u=\delta q+\ell$。その導関数は $e'=\delta(1-2x)+(b-a)$。平方して積分すると

$$
\begin{aligned}
\|e'\|_2^2
&=\delta^2\int_0^1(1-2x)^2dx
 +2\delta(b-a)\int_0^1(1-2x)dx
 +(b-a)^2\\
&=\frac{\delta^2}{3}+(b-a)^2,
\end{aligned}
$$

となる。交差項は $\int_0^1(1-2x)dx=[x-x^2]_0^1=0$ のため消える。

関数値の誤差について、$\int_0^1q^2dx=1/30$ と

$$
\int_0^1q(1-x)dx=\int_0^1x(1-x)^2dx=\frac1{12},
$$

$$
\int_0^1qx\,dx=\int_0^1x^2(1-x)dx=\frac1{12}
$$

を直接積分で得る。よって $\int_0^1q\ell dx=(a+b)/12$。さらに $\|\ell\|_2^2=(a^2+ab+b^2)/3$ だから

$$
\begin{aligned}
\|e\|_2^2
&=\delta^2\int_0^1q^2dx+2\delta\int_0^1q\ell dx+\int_0^1\ell^2dx\\
&=\frac{\delta^2}{30}+\frac{\delta(a+b)}6
+\frac{a^2+ab+b^2}{3}.
\end{aligned}
$$

数値を代入すると $b-a=-1/2$、$a+b=0$、$a^2+ab+b^2=1/16$、$\delta^2=1/4$ なので

$$
\|e'\|_2^2=\frac1{12}+\frac14=\frac13,
\qquad
\|e\|_2^2=\frac1{120}+\frac1{48}=\frac7{240}.
$$

従って実際の誤差は $\|e'\|_2=1/\sqrt3$、$\|e\|_2=\sqrt{7/240}$ となる。

一方、$\rho(v)=1$ であり、[境界誤差の定理](#thm-pml2-11-boundary-error)は

$$
\|e'\|_2\le\frac1{\sqrt2}+\frac12,
$$

$$
\|e\|_2\le\frac12+\sqrt{\frac{1/16}{3}}
=\frac12+\frac1{4\sqrt3}
$$

を与える。いずれも求めた厳密値を上から押さえている。

最後に、候補 $v$ の端点は $a=1/4$、$b=-1/4$ で零ではない。したがって $e\notin H_0^1$ であり、[零Dirichlet用の強残差誤差定理](#thm-pml2-11-energy-error)の前提が満たされない。残差だけの上界を無条件に適用できないのが欠点である。境界補間 $\ell$ を除いてから評価したので、残差と境界の二種類の情報を正しく統合できた。
<!-- solution-end -->

## 8. 次講への接続

本講では、**連続領域の残差ノルムが評価できるとき**、Dirichlet境界と安定性を用いて解誤差へつなぐ方法を確立した。弱残差を測るならその双対ノルム、境界をsoftに守るなら端点誤差も必要となる。

次のPML2-12では、PINNが実際に計算する**有限個のcollocation点の残差**だけを小さくした場合、どこでこの保証の橋が切れるかを調べる。
