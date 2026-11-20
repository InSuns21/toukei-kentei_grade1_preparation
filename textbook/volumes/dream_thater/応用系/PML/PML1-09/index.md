# PML1-09 Gibbs密度が不変なのはどの条件か

<!-- definition-example-audit: strict -->

[PML1-08で設計した熱雑音](../PML1-08/index.md#def-pml1-08-thermal-matching)は、ドリフトと拡散の強さを結び付けた。しかし係数を一致させただけでは、時間を進めても変わらない**状態の法則**があるとはまだ言えない。候補の指数関数を正規化できなければ全質量1の密度ではないし、方程式が途中で爆発したり境界から確率が流出したりすれば、密度の形式的な代入は分布の保存を保証しない。

この講義では「候補の構成 → Fokker–Planck方程式への代入 → 全確率の保存 → 時間発展の不変性」という順に、結論に必要な条件を切り分ける。確率流がゼロでない場合と詳細釣合いの関係は次講 PML1-10で扱う。

## 1. 連続状態のGibbs候補は確率密度になるか

以前の[有限状態Gibbs分布](../PML1-02/index.md#def-pml1-02-finite-loss-gibbs)では、有限個の正の重みの和で正規化した。状態が $\mathbb R^d$ なら、和ではなく積分が必要である。ここでの $f(x)$ は状態 $x$ に依存する損失（エネルギー）、$\tau>0$ は損失と同じ単位の温度パラメータとする。以下の温度付きの形は、[既出のGibbs密度の定義](../../../解析系/OTR/OTR21/index.md#def-otr21-gibbs-density)へ $V=f/\tau$ を代入したものである。ここでは損失と温度を別々に表示して正規化条件を確かめる。

<a id="def-pml1-09-continuous-gibbs"></a>

<!-- formal-statement-start -->
> **定義（連続状態のGibbs確率密度）**  
> $d\ge1$、$\tau>0$、連続関数 $f:\mathbb R^d\to\mathbb R$ に対し
>
$$
Z_\tau=\int_{\mathbb R^d}e^{-f(x)/\tau}\,dx
$$
>
> が $0<Z_\tau<\infty$ を満たすとき、正規化した関数
>
$$
\rho_\tau(x)=\frac{e^{-f(x)/\tau}}{Z_\tau}
$$
>
> を温度 $\tau$ における**連続状態のGibbs確率密度**という。$Z_\tau$ を分配関数という。積分は $\mathbb R^d$ 上のLebesgue積分である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-09-continuous-gibbs -->
**定義の確認**：$d=1$、$f(x)=\lambda(x-a)^2/2$、$\lambda,\tau>0$ とする。変数 $u=\sqrt{\lambda/\tau}(x-a)$ と置けば
$$
\begin{aligned}
Z_\tau
&=\int_{\mathbb R}e^{-\lambda(x-a)^2/(2\tau)}dx\\
&=\sqrt{\frac{\tau}{\lambda}}\int_{\mathbb R}e^{-u^2/2}du
=\sqrt{\frac{2\pi\tau}{\lambda}}.
\end{aligned}
$$
よって $Z_\tau$ は正かつ有限で、
$$
\rho_\tau(x)
=\sqrt{\frac{\lambda}{2\pi\tau}}
 e^{-\lambda(x-a)^2/(2\tau)}
$$
は積分が $1$ の確率密度である。中心 $a$、分散 $\tau/\lambda$ の正規分布を表す。
<!-- definition-example-end -->

指数関数が点ごとに正でも、積分可能とは限らない。例えば $f\equiv0$ なら $Z_\tau=\int_{\mathbb R^d}1\,dx=\infty$ で、**「一様なGibbs密度」は $\mathbb R^d$ 上の確率密度にならない**。

## 2. 不変とは、密度の形が一瞬だけ合うことではない

[PML1-08の過減衰Langevin方程式](../PML1-08/index.md#def-pml1-08-overdamped)を、定数の実対称正定値行列 $M\in\mathbb R^{d\times d}$ と定数拡散係数 $\Sigma$ について
$$
dX_t=-M\nabla f(X_t)\,dt+\Sigma\,dW_t
$$
と書く。$W$ は標準ブラウン運動で、初期値は $W$ と独立とする。大域Lipschitzドリフトなら[STO9の強解存在・一意性定理](../../../解析系/STO/STO9/index.md#thm-sto9-global-existence-uniqueness)によって任意の有限時刻まで確率過程を定義できる。こうした**有限時間内に解が失われない性質**を非爆発性という。

不変性は「任意の初期値からすぐにGibbs分布になる」ことではない。初期分布そのものを候補に選んだ場合に、すべての時刻で同じ分布が保たれるという意味である。

<a id="def-pml1-09-invariant"></a>

<!-- formal-statement-start -->
> **定義（不変確率分布）**  
> 非爆発的な時間一様Markov過程 $(X_t)_{t\ge0}$ の[遷移半群](../../../解析系/STO/STO11/index.md#def-sto11-markov-semigroup)を $P_t$ とする。確率測度 $\pi$ が**不変**であるとは、すべての $t\ge0$、すべての有界Borel可測関数 $\varphi$ について
>
$$
\int_{\mathbb R^d}(P_t\varphi)(x)\,\pi(dx)
=\int_{\mathbb R^d}\varphi(x)\,\pi(dx)
$$
>
> が成り立つことをいう。ただし $P_t\varphi(x)=\mathbb E_x[\varphi(X_t)]$。同値に、$X_0\sim\pi$ なら $X_t\sim\pi$ がすべての $t\ge0$ で成り立つ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-09-invariant -->
**定義の確認**：$f(x)=\lambda x^2/2$、$M=m>0$、$\Sigma=\sqrt{2m\tau}$ とする。[PML1-08の二次模型の明示解](../PML1-08/index.md#thm-pml1-08-quadratic)から、確定初期値 $x$ なら条件付き分布は平均 $e^{-m\lambda t}x$、分散 $(\tau/\lambda)(1-e^{-2m\lambda t})$ の正規分布になる。いま初期値 $X_0\sim N(0,\tau/\lambda)$ を $W$ と独立に取ると
$$
\begin{aligned}
\mathbb E X_t&=0,\\
\operatorname{Var}(X_t)
&=e^{-2m\lambda t}\frac{\tau}{\lambda}
+\frac{\tau}{\lambda}(1-e^{-2m\lambda t})
=\frac{\tau}{\lambda}.
\end{aligned}
$$
二つの独立なGaussian項の和はGaussianなので $X_t\sim N(0,\tau/\lambda)$。これは任意の $t$ について成立し、定義の「初期分布を保つ」を実際に確認した。
<!-- definition-example-end -->

## 3. Fokker–Planck方程式で確率の流れを見る

生成作用素は観測量を動かし、Fokker–Planck方程式は分布を動かす。[STO11の前進方程式](../../../解析系/STO/STO11/index.md#thm-sto11-forward-fokker-planck)を用いるには、密度が存在し、必要な微分・積分交換を行えるという追加条件を確認する。定数行列で、[熱雑音整合](../PML1-08/index.md#def-pml1-08-thermal-matching)
$$
\Sigma\Sigma^{\mathsf T}=2\tau M
$$
を仮定すると、[生成作用素の式](../PML1-08/index.md#prop-pml1-08-generator)は
$$
L\varphi=-M\nabla f\cdot\nabla\varphi
+\tau\operatorname{tr}(M\nabla^2\varphi).
$$

密度 $p(t,x)$ が存在して十分滑らかなら、前進方程式は次の形になる。

<a id="prop-pml1-09-fokker-planck"></a>

<!-- formal-statement-start -->
> **命題（整合Langevin拡散のFokker–Planck方程式）**  
> $f\in C^2(\mathbb R^d)$ の勾配が大域Lipschitz、$M$ が定数の実対称正定値行列、$\tau>0$ とし、$\Sigma\Sigma^{\mathsf T}=2\tau M$ とする。非爆発的な上記SDEの時刻 $t$ の法則が密度 $p(t,x)$ を持ち、$p$ が時間について $C^1$、$M\nabla f\,p$ が空間について $C^1$、$p$ が空間について $C^2$ であるとする。このとき
>
$$
\partial_t p
=\nabla\cdot\bigl(M\nabla f\,p+\tau M\nabla p\bigr)
=-\nabla\cdot J,
$$
>
> ただし
>
$$
J=-M\nabla f\,p-\tau M\nabla p
$$
>
> は確率流（単位時間・単位面積当たりの確率の流束ベクトル）である。ここでの[偏微分方程式](../../../解析系/PDE/PDE1/index.md#def-pde1-pde-order)の等式は各点での等式である。
<!-- formal-statement-end -->

### 証明の見取り図

[前進方程式](../../../解析系/STO/STO11/index.md#thm-sto11-forward-fokker-planck)のドリフト $b=-M\nabla f$、拡散共分散 $a=2\tau M$ を成分ごとに代入する。$M$ が**定数**であることが、二階項を $\tau\nabla\cdot(M\nabla p)$ とまとめられる理由である。

<!-- proof-start -->
### 証明

同定する成分は $b_i=-\sum_jM_{ij}\partial_jf$ と $a_{ij}=2\tau M_{ij}$。従って
$$
\begin{aligned}
\partial_t p
&=-\sum_i\partial_i(b_ip)
+\frac12\sum_{i,j}\partial_{ij}(a_{ij}p)\\
&=\sum_{i,j}\partial_i(M_{ij}\partial_jf\,p)
+\tau\sum_{i,j}M_{ij}\partial_{ij}p\\
&=\sum_i\partial_i\left(
 \sum_jM_{ij}\partial_jf\,p
 +\tau\sum_jM_{ij}\partial_jp\right).
\end{aligned}
$$
最後の等式は $M_{ij}$ を空間微分の外に出せるという定数性による。括弧内の負を $J_i$ と定めれば $\partial_tp=-\sum_i\partial_iJ_i$ である。
<!-- proof-end -->

<a id="def-pml1-09-zero-flux"></a>

<!-- formal-statement-start -->
> **定義（零確率流）**  
> 上の命題で定義した確率流 $J(t,x)$ が対象領域のすべての点で $J(t,x)=0$ を満たすとき、**零確率流**という。領域の境界で外向き単位法線 $n$ に対して $J\cdot n=0$ だけを要求する**境界での流束ゼロという条件**とは区別する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-09-zero-flux -->
**定義の確認**：$d=1$、$M=m>0$、$f(x)=\lambda x^2/2$、$p(x)=\rho_\tau(x)$ とする。連鎖律で
$$
p'(x)=-\frac{\lambda x}{\tau}p(x)
$$
だから
$$
J(x)=-m\lambda x\,p(x)-\tau m\,p'(x)
=-m\lambda x\,p(x)+m\lambda x\,p(x)=0.
$$
すべての $x$ で零確率流であり、任意の有限な境界での法線流束もゼロである。
<!-- definition-example-end -->

## 4. Gibbs候補を代入するとどこまで証明できるか

正規化できる $\rho_\tau$ を代入すると、連鎖律から
$$
\nabla\rho_\tau(x)
=-\frac1\tau\rho_\tau(x)\nabla f(x).
$$
すると
$$
\begin{aligned}
J_{\rho_\tau}
&=-M\nabla f\,\rho_\tau-\tau M\nabla\rho_\tau\\
&=-M\nabla f\,\rho_\tau
+\tau M\frac{\rho_\tau}{\tau}\nabla f=0,\\
L^*\rho_\tau
&=-\nabla\cdot J_{\rho_\tau}=0.
\end{aligned}
$$

ここで $L^*$ は密度に作用する前進方程式の右辺を表す記号である。**この計算だけで分かるのは、$\rho_\tau$ が前進方程式の定常候補であること**。初期分布に選んだとき本当に保たれるには、非爆発的な解があり、前進方程式とMarkov半群による時間発展がこの候補と一致することをさらに示す必要がある。

まず、次の条件が揃えば不変性が従う、という片方向の主張を証明する。逆向きは主張しない。以下の三階微分の有界性と一階モーメントの有限性は、証明中の微分・積分交換を明示的に正当化するための条件である。一般に不変Gibbs分布が存在するための必要条件と主張するものではない。

<a id="thm-pml1-09-gibbs-invariant"></a>

<!-- formal-statement-start -->
> **定理（定数移動度Langevin拡散のGibbs不変性：十分条件）**  
> $d\ge1$、$\tau>0$、$M\in\mathbb R^{d\times d}$ は定数の実対称正定値行列、$\Sigma\in\mathbb R^{d\times r}$ は定数で $\Sigma\Sigma^{\mathsf T}=2\tau M$ を満たすとする。$f\in C^3(\mathbb R^d)$ は
>
$$
\sup_x\|\nabla^2f(x)\|<\infty,
\qquad
\sup_x\|\nabla^3f(x)\|<\infty
$$
>
> を満たし、さらに
>
$$
0<Z_\tau=\int_{\mathbb R^d}e^{-f/\tau}\,dx<\infty,
\qquad
\int_{\mathbb R^d}|x|e^{-f(x)/\tau}\,dx<\infty
$$
>
> を満たすとする。$X_0$ は $W$ と独立で、$dX_t=-M\nabla f(X_t)\,dt+\Sigma\,dW_t$ とする。このSDEは非爆発的な一意の強解を持ち、$\pi_\tau(dx)=Z_\tau^{-1}e^{-f(x)/\tau}dx$ はその不変確率分布である。
<!-- formal-statement-end -->

### 証明の見取り図

1. Hessian有界性からドリフトを大域Lipschitzにし、[SDE存在・一意性](../../../解析系/STO/STO9/index.md#thm-sto9-global-existence-uniqueness)を適用する。
2. 零確率流から、コンパクトな台を持つ観測関数 $\psi$ に対して $\int L\psi\,d\pi_\tau=0$ を示す。
3. **非コンパクトな**半群 $P_t\varphi$ へ拡張する際は切断関数で無限遠の境界項を制御する。
4. [後退方程式](../../../解析系/STO/STO11/index.md#thm-sto11-backward-kolmogorov)により $F(t)=\int P_t\varphi\,d\pi_\tau$ を微分し、$F'(t)=0$ を得る。これで形式的な定常性を実際の不変性へつなぐ。

<!-- proof-start -->
### 証明

**(i) 非爆発性。** $b(x)=-M\nabla f(x)$ と置く。線分上でHessianを積分すると
$$
\nabla f(x)-\nabla f(y)
=\int_0^1\nabla^2f(y+s(x-y))(x-y)\,ds.
$$
$K=\|M\|\sup_x\|\nabla^2f(x)\|$ とすれば
$$
|b(x)-b(y)|\le K|x-y|,
\qquad |b(x)|\le |b(0)|+K|x|.
$$
$\Sigma$ は定数なので [STO9の大域Lipschitz存在・一意性定理](../../../解析系/STO/STO9/index.md#thm-sto9-global-existence-uniqueness)が適用される。初期分布については上の一階モーメントだけを仮定しているので、まず各確定初期点 $x$ について大域強解 $X^x$ を構成し、これを $\pi_\tau$ に従う独立な初期値で混合すればよい（有限二乗モーメントを仮定した初期値版の定理を、不当に直接適用しない）。

**(ii) [コンパクト台](../../../基礎科目/TOP/TOP5A/index.md#def-top5a-compact-support-cc)での積分。** $\rho=\rho_\tau$ と略す。任意の $\psi\in C_c^2(\mathbb R^d)$ に対し、[生成作用素](../PML1-08/index.md#prop-pml1-08-generator)と $J_\rho=0$ を用い、台の外では $\psi$ とその導関数がゼロになるため部分積分の境界項はない：
$$
\begin{aligned}
\int_{\mathbb R^d}(L\psi)\rho\,dx
&=\int\left(b\rho\cdot\nabla\psi
+\tau\rho\operatorname{tr}(M\nabla^2\psi)\right)dx\\
&=\int(b\rho-\tau M\nabla\rho)\cdot\nabla\psi\,dx\\
&=\int J_\rho\cdot\nabla\psi\,dx=0.
\end{aligned}
$$
ここで $b\rho=-M\nabla f\,\rho$ である。

**(iii) 無限遠の境界項。** $0\le\chi_R\le1$ が $|x|\le R$ で $1$、$|x|\ge2R$ で $0$、かつ
$$
|\nabla\chi_R|\le C/R,\qquad
\|\nabla^2\chi_R\|\le C/R^2
$$
を満たす滑らかな切断関数を取る。$\psi$ およびその一階・二階導関数が有界なら、積の微分から
$$
L(\chi_R\psi)
=\chi_RL\psi+\psi L\chi_R
+2\tau\nabla\chi_R^{\mathsf T}M\nabla\psi.
$$
上の(ii)を左辺に適用する。$L\chi_R=b\cdot\nabla\chi_R+\tau\operatorname{tr}(M\nabla^2\chi_R)$ であり、誤差項の積分は $R\le|x|\le2R$ に限られる。この領域では $|b(x)|\le |b(0)|+2KR$ なので
$$
\begin{aligned}
\left|\int\psi L\chi_R\,\rho dx\right|
&\le C_\psi\left(1+\frac1R\right)
\pi_\tau\{|x|\ge R\},\\
\left|2\tau\int\nabla\chi_R^{\mathsf T}M\nabla\psi\,\rho dx\right|
&\le\frac{C_\psi}{R}\pi_\tau\{|x|\ge R\}.
\end{aligned}
$$
$\pi_\tau$ は確率測度なので両辺は $R\to\infty$ で $0$ となる。また $|L\psi(x)|\le C_\psi(1+|x|)$ で、$\pi_\tau$ の一階モーメントは有限である。よって優収束により
$$
\int_{\mathbb R^d}(L\psi)\,d\pi_\tau=0
$$
がこのような $\psi$ 全般へ拡張される。

**(iv) 半群の時間発展。** $\varphi\in C_c^\infty(\mathbb R^d)$ と固定する。[STO11の半群](../../../解析系/STO/STO11/index.md#def-sto11-markov-semigroup)の $u(t,x)=P_t\varphi(x)=\mathbb E[\varphi(X_t^x)]$ を考える。上の $b$ は $C^2$ で、その一階・二階導関数は有界である。定数拡散のSDEを初期値 $x$ で微分した変分方程式は
$$
\frac{d}{dt}D_xX_t^x=Db(X_t^x)D_xX_t^x,
$$
$$
\frac{d}{dt}D_x^2X_t^x
=Db(X_t^x)D_x^2X_t^x
+D^2b(X_t^x)[D_xX_t^x,D_xX_t^x].
$$
初期条件は $D_xX_0^x=I$、$D_x^2X_0^x=0$。従って有限の $T$ でGrönwallの不等式を順に用いれば、$0\le t\le T$ における両導関数は $x$ に一様に有界である。$\varphi$ の導関数も有界なので、期待値の微分
$$
\begin{aligned}
D_xu(t,x)&=\mathbb E[D\varphi(X_t^x)D_xX_t^x],\\
D_x^2u(t,x)&=\mathbb E[
(D_xX_t^x)^{\mathsf T}D^2\varphi(X_t^x)D_xX_t^x
+D\varphi(X_t^x)D_x^2X_t^x]
\end{aligned}
$$
が正当化され、$u$ とその一階・二階空間導関数は有限時間区間で有界である。後者の第二項は添字を縮約した行列を表す。

ここで[後退Kolmogorov方程式](../../../解析系/STO/STO11/index.md#thm-sto11-backward-kolmogorov)をこの滑らかな半群へ適用し、$\partial_tu=Lu$ を得る。$L u$ は $C_T(1+|x|)$ で抑えられ、$\pi_\tau$ の一階モーメントで積分可能である。よって $F(t)=\int u(t,x)\pi_\tau(dx)$ を微分でき、(iii)を $\psi=u(t,\cdot)$ に適用すると
$$
F'(t)=\int \partial_tu\,d\pi_\tau
=\int Lu\,d\pi_\tau=0.
$$
したがって $F(t)=F(0)=\int\varphi\,d\pi_\tau$ である。$C_c^\infty$ の関数の積分が一致すればBorel確率測度は等しいので、初期法則 $\pi_\tau$ から出発した $X_t$ の法則はすべての $t$ で $\pi_\tau$ に等しい。これは[不変分布の定義](#def-pml1-09-invariant)である。
<!-- proof-end -->

この証明では $J_\rho=0$ が局所計算、切断関数が無限遠への対処、半群が「すべての時刻」の主張を担っている。三者の役割を取り違えないことが重要である。

## 5. 条件を実際に満たす損失

<a id="prop-pml1-09-quadratic-coercive"></a>

<!-- formal-statement-start -->
> **命題（二次下界を持つ損失では正規化と一階モーメントが有限）**  
> $\tau>0$、$f:\mathbb R^d\to\mathbb R$ が
>
$$
f(x)\ge a|x|^2-C
\qquad(x\in\mathbb R^d)
$$
>
> を満たすとする。ただし $a>0$、$C\in\mathbb R$。このとき $Z_\tau$ と $\int|x|e^{-f(x)/\tau}dx$ はともに有限である。$f$ が連続なら $Z_\tau>0$ でもある。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

指数関数の単調性から
$$
0<e^{-f(x)/\tau}
\le e^{C/\tau}e^{-a|x|^2/\tau}.
$$
右辺は $d$ 個の一次元Gaussian積分の積なので
$$
Z_\tau\le e^{C/\tau}
\left(\frac{\pi\tau}{a}\right)^{d/2}<\infty.
$$
また $|x|\le\sum_{i=1}^d|x_i|$ と置くと、$|x_i|e^{-a|x_i|^2/\tau}$ は一次元で可積分、他の座標のGaussian積分も有限だから
$$
\int |x|e^{-f(x)/\tau}dx
\le e^{C/\tau}\sum_i
\int |x_i|e^{-a|x|^2/\tau}dx<\infty.
$$
連続 $f$ は任意の有界な球上で有限なので、指数関数は正であり、球上の積分が正。よって $Z_\tau>0$。
<!-- proof-end -->

例えば $f(x)=\frac12(x-a)^{\mathsf T}H(x-a)$ で $H$ が実対称正定値なら、最小固有値を $\lambda_{\min}>0$ として $f(x)\ge(\lambda_{\min}/2)|x-a|^2$。さらに $|x-a|^2\ge|x|^2/2-|a|^2$ を代入すれば上の二次下界を得る。Hessianは定数、三階微分はゼロなので[不変性定理](#thm-pml1-09-gibbs-invariant)の条件が揃う。

**異方二次模型**：$f(x,y)=(x^2+4y^2)/2$、$\tau=2$、$M=\operatorname{diag}(2,3)$ とする。$H=\operatorname{diag}(1,4)$ だから
$$
Z_\tau=\sqrt{2\pi\tau}\sqrt{\frac{2\pi\tau}{4}}=2\pi.
$$
$\rho_\tau$ は独立な $N(0,2)$ と $N(0,1/2)$ の積であり、$\Sigma=\operatorname{diag}(\sqrt8,\sqrt{12})$ とすれば整合条件が成り立つ。二方向の雑音の強さは違っても、零確率流は各成分で成立する。

## 6. 条件を落としたら何が壊れるか

### 正規化不能でも $L^*e^{-f/\tau}=0$ は起こる

$f\equiv0$、$M=I_d$、$\Sigma=\sqrt{2\tau}I_d$ なら候補は定数関数で、その勾配もLaplacianもゼロ。従って形式上は前進方程式の右辺が $0$ になる。しかし $\int_{\mathbb R^d}1\,dx=\infty$ なので、これを確率分布とは呼べない。**定常方程式の解**と**不変確率分布**は違う。

### 雑音の整合を外すと候補そのものが定常でなくなる

$f(x)=\lambda x^2/2$、$M=m>0$、拡散係数を定数 $\nu$ とすると
$$
J_\rho(x)=-m\lambda x\rho(x)
-\frac{\nu^2}{2}\rho'(x)
=\lambda x\rho(x)\left(\frac{\nu^2}{2\tau}-m\right).
$$
$\nu^2\ne2m\tau$ なら $J_\rho$ は恒等的ゼロではないし、$\partial_xJ_\rho$ も恒等的ゼロではない。実際[二次模型のノイズ不整合](../PML1-08/index.md#prop-pml1-08-mismatch)によれば極限分散は $\nu^2/(2m\lambda)$ であり、候補の $\tau/\lambda$ と一致しない。

### 境界で確率が流出するなら、内部の計算だけでは足りない

滑らかな有界領域 $D\subset\mathbb R^d$ では[Gauss--Ostrogradsky の発散定理](../../../幾何系/VC/VC4/index.md#thm-vc4-gauss-divergence)を使い
$$
\frac{d}{dt}\int_D p(t,x)\,dx
=-\int_{\partial D}J(t,x)\cdot n(x)\,dS(x).
$$
すなわち全確率を保つには、境界の**総流束**がゼロでなければならない。反射境界のように各点で $J\cdot n=0$ と置けば十分だが、吸収境界は一般に質量が失われる。例えば $D=(0,1)$ におけるブラウン運動を端点へ到達したとき消滅させるなら、内部では $f=0$ とした定数候補が $L^*p=0$ を満たしても、いったん境界へ達した標本路は消滅する。したがって初期密度を一様にしても、$t>0$ の生存確率は $1$ より小さい。内部の定常式だけでは足りない。反射・吸収という**過程の境界規則**を指定して初めて不変性を問える。

なお、境界のない $\mathbb R^d$ でも、非爆発性を確認せずに「無限遠で自動的に確率が保たれる」としてはいけない。本定理では大域Lipschitz条件がこの役割を果たした。

## 7. 演習 Level A

<a id="ex-pml1-09-a01"></a>
### PML1-09-A01 Gaussian分配関数と零確率流

- Level: A

$f(x)=2(x-1)^2$、$\tau=4$、$M=m=3$ とする。$Z_\tau$ と $\rho_\tau$ を求め、整合する一次元拡散係数を一つ選び、$J_{\rho_\tau}=0$ を微分して確かめよ。

<!-- solution-start -->
#### 詳細解答

$f(x)=\frac{\lambda}{2}(x-a)^2$ と比較すると $\lambda=4$、$a=1$。よって[連続Gibbs密度の定義](#def-pml1-09-continuous-gibbs)から
$$
Z_\tau=\sqrt{\frac{2\pi\cdot4}{4}}=\sqrt{2\pi},
\qquad
\rho_\tau(x)=\frac1{\sqrt{2\pi}}e^{-(x-1)^2/2}.
$$
[熱雑音条件](../PML1-08/index.md#def-pml1-08-thermal-matching)は $\nu^2=2m\tau=24$ なので $\nu=\sqrt{24}$。微分すると $\rho_\tau'=-(x-1)\rho_\tau$。従って
$$
J=-3\cdot4(x-1)\rho_\tau
-\frac{24}{2}\rho_\tau'
=-12(x-1)\rho_\tau+12(x-1)\rho_\tau=0.
$$
<!-- solution-end -->

<a id="ex-pml1-09-a02"></a>
### PML1-09-A02 正規化不能な定常候補

- Level: A

$\mathbb R$ 上で $f(x)=0$、$\tau>0$、$M=1$ とする。$e^{-f/\tau}$ が定常方程式の形式解であることと、Gibbs確率密度が存在しないことを別々に示せ。

<!-- solution-start -->
#### 詳細解答

候補 $q(x)=1$ なら $q'=q''=0$、$b=-f'=0$。よって[前進方程式](#prop-pml1-09-fokker-planck)の右辺は $\partial_x(f'q+\tau q')=0$。一方
$$
Z_\tau=\int_{-\infty}^{\infty}q(x)\,dx
=\lim_{R\to\infty}2R=\infty.
$$
したがって $q/Z_\tau$ は確率密度として定義できない。ここで壊れているのは正規化条件であり、局所的な微分計算ではない。
<!-- solution-end -->

<a id="ex-pml1-09-a03"></a>
### PML1-09-A03 誤った拡散係数での確率流

- Level: A

$f(x)=x^2/2$、$m=\tau=1$ の候補 $\rho(x)=(2\pi)^{-1/2}e^{-x^2/2}$ に、誤って $\nu=2$ を採用した。候補について確率流 $J$ と $-\partial_xJ$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$\nu^2/2=2$、$b=-x$、$\rho'=-x\rho$ なので
$$
J=-x\rho-2\rho'=x\rho.
$$
積の微分から
$$
-\partial_xJ=-\rho-x\rho'
=(x^2-1)\rho.
$$
例えば $x=0$ では $-\partial_xJ=-\rho(0)\ne0$。候補は前進方程式の定常解でない。正しい整合係数は $\nu=\sqrt2$ である。
<!-- solution-end -->

<a id="ex-pml1-09-a04"></a>
### PML1-09-A04 コンパクト台での積分検算

- Level: A

$d=1$、$f\in C^2$、$\rho=Z_\tau^{-1}e^{-f/\tau}$（$0<Z_\tau<\infty$）とし、$m,\tau>0$ とする。$\varphi\in C_c^2(\mathbb R)$ に対し $\int(-mf'\varphi'+m\tau\varphi'')\rho\,dx=0$ を部分積分で示せ。

<!-- solution-start -->
#### 詳細解答

$\rho'=-(f'/\tau)\rho$。$\varphi'$ はコンパクトな台を持つので境界項は消え、
$$
\int m\tau\varphi''\rho\,dx
=-m\tau\int\varphi'\rho'\,dx
=m\int f'\varphi'\rho\,dx.
$$
これをドリフト側の $-m\int f'\varphi'\rho\,dx$ と足すと $0$。コンパクト台なら境界項が消えるが、任意の非コンパクト関数にも直ちに同じ計算を許してよいわけではない。
<!-- solution-end -->

<a id="ex-pml1-09-a05"></a>
### PML1-09-A05 境界からの質量流出

- Level: A

区間 $D=(0,1)$ で $\partial_tp=-\partial_xJ$ を満たす十分滑らかな密度について、$\frac{d}{dt}\int_0^1p\,dx$ を $J(0),J(1)$ で表せ。また $J(0)=J(1)=0$ の場合に何が分かるか述べよ。

<!-- solution-start -->
#### 詳細解答

微分と積分の交換を仮定し、$J$ の導関数の積分を区間の端点の値で評価する：
$$
\frac d{dt}\int_0^1p\,dx
=-\int_0^1\partial_xJ\,dx
=-[J(1)-J(0)]
=J(0)-J(1).
$$
両端で $J=0$ なら質量の時間微分は $0$。ただしこれだけで特定の密度が不変とは言えず、その密度に対し内部で $\partial_tp=0$ も必要である。
<!-- solution-end -->

## 8. 演習 Level B

<a id="ex-pml1-09-b01"></a>
### PML1-09-B01 異方二次模型の全条件

- Level: B

$f(x,y)=(x^2+4y^2)/2$、$M=\operatorname{diag}(2,3)$、$\tau=2$ とする。$Z_\tau$、正規化した密度、整合する対角 $\Sigma$、ドリフト、確率流の各成分を求め、零確率流を確かめよ。

<!-- solution-start -->
#### 詳細解答

$f/\tau=x^2/4+y^2$。それぞれのGaussian積分は $2\sqrt\pi$ と $\sqrt\pi$ なので
$$
Z_\tau=2\pi,\quad
\rho(x,y)=\frac1{2\pi}e^{-x^2/4-y^2}.
$$
$2\tau M=\operatorname{diag}(8,12)$ より $\Sigma=\operatorname{diag}(\sqrt8,\sqrt{12})$ と取る。$\nabla f=(x,4y)$ なので $b=-M\nabla f=(-2x,-12y)$。
$$
\partial_x\rho=-\frac{x}{2}\rho,\qquad
\partial_y\rho=-2y\rho.
$$
[確率流の式](#prop-pml1-09-fokker-planck)に代入すると
$$
J_x=-2x\rho-2\cdot2\left(-\frac{x}{2}\rho\right)=0,
$$
$$
J_y=-12y\rho-2\cdot3(-2y\rho)=0.
$$
$M$ の正定値性は、非零 $(u,v)$ について $2u^2+3v^2>0$ から分かる。二次関数のHessianと三階微分は有界で分配関数も有限なので、[Gibbs不変性定理](#thm-pml1-09-gibbs-invariant)を適用できる。
<!-- solution-end -->

<a id="ex-pml1-09-b02"></a>
### PML1-09-B02 二次下界と有限モーメント

- Level: B

$f(x)=x^2/2+2\sin x$ とする。任意の $\tau>0$ に対し、Gibbs密度が定義でき一階モーメントが有限であることを示し、$M=m>0$ と $\nu=\sqrt{2m\tau}$ で[Gibbs不変性定理](#thm-pml1-09-gibbs-invariant)が使えるか判定せよ。

<!-- solution-start -->
#### 詳細解答

$-1\le\sin x\le1$ なので
$$
f(x)\ge \frac{x^2}{2}-2.
$$
[二次下界の命題](#prop-pml1-09-quadratic-coercive)に $a=1/2$、$C=2$ を代入すれば $0<Z_\tau<\infty$ と $\int|x|e^{-f/\tau}dx<\infty$。
$$
f'(x)=x+2\cos x,\quad
f''(x)=1-2\sin x,\quad
f'''(x)=-2\cos x.
$$
従って $|f''|\le3$、$|f'''|\le2$、$f\in C^3$。$M=m>0$、$\nu^2=2m\tau$ も満たすので[不変性定理](#thm-pml1-09-gibbs-invariant)を適用できる。凸性は仮定されておらず、$f''$ が負になる点があっても支障はない。
<!-- solution-end -->

<a id="ex-pml1-09-b03"></a>
### PML1-09-B03 線形項で中心をずらす

- Level: B

$f(x)=\lambda x^2/2-cx$（$\lambda,\tau>0$、$c\in\mathbb R$）、$M=m>0$ とする。平方完成して $Z_\tau$、$\rho_\tau$ を求め、整合した $\nu$ に対して $J_{\rho_\tau}=0$ を確かめよ。

<!-- solution-start -->
#### 詳細解答

$$
f(x)=\frac{\lambda}{2}
\left(x-\frac c\lambda\right)^2-\frac{c^2}{2\lambda}.
$$
従って
$$
Z_\tau=e^{c^2/(2\lambda\tau)}
\sqrt{\frac{2\pi\tau}{\lambda}},\quad
\rho_\tau(x)=\sqrt{\frac{\lambda}{2\pi\tau}}
e^{-\lambda(x-c/\lambda)^2/(2\tau)}.
$$
$\rho_\tau'=-(\lambda x-c)\rho_\tau/\tau$、$b=-m(\lambda x-c)$、$\nu^2=2m\tau$ なので
$$
J=-m(\lambda x-c)\rho_\tau
-m\tau\left(-\frac{\lambda x-c}{\tau}\rho_\tau\right)=0.
$$
定数項 $-c^2/(2\lambda)$ は $Z_\tau$ には現れるが、正規化後の密度を直接変えないことも計算から分かる。
<!-- solution-end -->

<a id="ex-pml1-09-b04"></a>
### PML1-09-B04 不変性と初期値からの収束を区別する

- Level: B

$f(x)=\lambda x^2/2$、$m,\lambda,\tau>0$ の整合したLangevin方程式で、$X_0=0$ とする。有限時刻 $t>0$ の分布を求め、$N(0,\tau/\lambda)$ が不変であることと、$X_t$ が有限時刻ですでにその分布に等しいことを区別せよ。

<!-- solution-start -->
#### 詳細解答

[二次模型の明示解](../PML1-08/index.md#thm-pml1-08-quadratic)を $x_0=0$ に代入して
$$
X_t\sim N\left(0,\frac{\tau}{\lambda}
 (1-e^{-2m\lambda t})\right).
$$
$t>0$ が有限なら $0<e^{-2m\lambda t}<1$ なので分散は $\tau/\lambda$ より厳密に小さい。一方、初期分布を $N(0,\tau/\lambda)$ にすれば[不変分布の定義例](#def-pml1-09-invariant)の通りすべての時刻に保たれる。前者は確定初期値からの一時点分布、後者は定常初期分布の保存という異なる主張である。
<!-- solution-end -->

## 9. 演習 Level C

<a id="ex-pml1-09-c01"></a>
### PML1-09-C01 正規化・不変性・ノイズ不整合・境界の統合診断

- Level: C

$\mathbb R^2$ 上で
$$
f(x,y)=(x-1)^2+\frac12(y+2)^2,\quad
M=\operatorname{diag}(2,1),\quad\tau=2
$$
とする。

1. Gibbs分配関数・密度・二座標の平均と分散を求め、非爆発性と不変性の定理の全条件を確認せよ。
2. 整合する対角 $\Sigma$ を一つ選び、生成作用素と確率流を求めて不変性を二通りの計算で検証せよ。
3. 第二座標の雑音係数だけ $\sqrt8$ に置き換えた場合、元のGibbs候補の確率流と前進方程式の右辺を求め、極限分散との不一致を説明せよ。
4. 同じ係数を有界領域に制限して端点で吸収する模型では、内部で $L^*\rho=0$ でも一般に不変性が従わない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

**1. 正規化と定理条件。** $x-1$ の曲率は $2$、$y+2$ の曲率は $1$ なので、Gibbs密度の各座標は $N(1,\tau/2)=N(1,1)$、$N(-2,\tau)=N(-2,2)$ である。各Gaussian積分の積から
$$
Z_\tau=\sqrt{2\pi\cdot1}\sqrt{2\pi\cdot2}
=2\pi\sqrt2,
$$
$$
\rho(x,y)=\frac1{2\pi\sqrt2}
\exp\left(-\frac{(x-1)^2}{2}-\frac{(y+2)^2}{4}\right).
$$
$f\in C^\infty$、Hessianは $\operatorname{diag}(2,1)$ で有界、三階微分はゼロ。正定値 $M$ の固有値は $2,1$、二次下界から $Z_\tau>0$ と一階モーメントの有限性が従う。ドリフトは線形なので大域Lipschitzであり、[SDEの存在・一意性](../../../解析系/STO/STO9/index.md#thm-sto9-global-existence-uniqueness)から非爆発的。[Gibbs不変性定理](#thm-pml1-09-gibbs-invariant)を適用できる。

**2. 整合と二つの検算。** $\nabla f=(2(x-1),y+2)$ であるから $b=(-4(x-1),-(y+2))$。$2\tau M=\operatorname{diag}(8,4)$ なので $\Sigma=\operatorname{diag}(\sqrt8,2)$ と選ぶ。[生成作用素の式](../PML1-08/index.md#prop-pml1-08-generator)より
$$
L\varphi=-4(x-1)\partial_x\varphi-(y+2)\partial_y\varphi
+4\partial_{xx}\varphi+2\partial_{yy}\varphi.
$$
$\partial_x\rho=-(x-1)\rho$、$\partial_y\rho=-(y+2)\rho/2$ を計算して
$$
J_x=-4(x-1)\rho-4\partial_x\rho=0,\quad
J_y=-(y+2)\rho-2\partial_y\rho=0.
$$
これは前進方程式への検算である。別に[一次元二次模型](../PML1-08/index.md#thm-pml1-08-quadratic)を中心座標 $X_t-1,Y_t+2$ に適用すれば、減衰率は $4,1$、整合雑音の二乗は $8,4$、分散の定常値はそれぞれ $8/(2\cdot4)=1$、$4/(2\cdot1)=2$。各座標を初めからその独立正規分布に取れば、Gaussian性と分散計算で分布が保たれる。これが確率過程からの第二の検証である。

**3. 不整合。** 変更後の $\Sigma_{\rm bad}\Sigma_{\rm bad}^{\mathsf T}=\operatorname{diag}(8,8)$。元の $\rho$ に対して第一成分は依然 $J_x=0$ だが、第二成分は二階項の係数が $8/2=4$ なので
$$
J_y^{\rm bad}=-(y+2)\rho-4\partial_y\rho
=(y+2)\rho.
$$
従って
$$
-\nabla\cdot J^{\rm bad}
=-\partial_y[(y+2)\rho]
=\left(\frac{(y+2)^2}{2}-1\right)\rho,
$$
であり、例えば $y=-2$ で $-\rho<0$ となり定常ではない。第二座標の新しい定常分散は $8/(2\cdot1)=4$ であり、候補の $2$ と一致しない。

**4. 境界。** 吸収では、領域を出た質量は戻らず、生存確率が減る。[Gauss--Ostrogradsky の発散定理](../../../幾何系/VC/VC4/index.md#thm-vc4-gauss-divergence)により
$$
\frac d{dt}\int_Dp(t,x)\,dx
=-\int_{\partial D}J\cdot n\,dS
$$
なので、境界流束がゼロという条件を確かめる必要がある。内部での $L^*\rho=0$ は境界の吸収規則まで含んでいない。特に初期密度を内部のGibbs形にしても、吸収時刻後の状態はその確率分布に留まれない。
<!-- solution-end -->

## 10. 何が成立し、何はまだ主張していないか

本章で証明したのは、**定数の正定値移動度、熱雑音整合、十分な滑らかさ、正規化・モーメント条件、非爆発性**のもとでGibbs密度が不変になるという十分条件である。二次模型からは、その不変密度が実際に確率過程の時間発展で保たれることも直接確かめられた。

不変性だけでは「任意の初期分布がその分布へ収束する」「不変分布が一意」「詳細釣合いが成立する」は導けない。また $M=M(x)$ のように状態依存の移動度へ変えると、前進方程式に $M$ の微分が現れるので、ここでの係数と式をそのまま流用してはいけない。この区別を次の PML1-10 へ引き継ぐ。
