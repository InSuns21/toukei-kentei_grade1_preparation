# PML2-23 時間発展を微分すると勾配はどこで狂うか

## 1. 解いた軌道と、その軌道を微分した値は別に検査する

[PML2-22 の離散随伴公式](../PML2-22/index.md#thm-pml2-22-adjoint-gradient)では、離散化した方程式の解を介する損失を微分した。時間発展では、方程式を一度解いて終わるのではなく、状態を何段も更新する。一段ごとの小さな誤差が、最後の状態にも、パラメータに関する勾配にも伝わる。

まず実数パラメータ $\theta>0$ と初期値 $u(0)=1$ に対し

$$
\frac{du}{dt}=-\theta u,\qquad 0\le t\le T,\quad T>0
$$

を考える。正確な解は $u(t;\theta)=e^{-\theta t}$ で、終端値のパラメータ感度は

$$
\frac{\partial u(T;\theta)}{\partial\theta}=-T e^{-\theta T}.
$$

ところが刻み幅 $h=T/N$（整数 $N\ge1$）で陽的 Euler 法を使うと

$$
u_{n+1}=u_n-h\theta u_n=(1-h\theta)u_n,\qquad u_0=1
$$

であり、**この計算手順を微分して得る勾配**は、正確な連続解の勾配とは一般に一致しない。本講は、どの微分を求めたか、刻み幅を変えたときどう変わるかを同じ例で確かめる。

扱う問題は、有限時間 $[0,T]$ の滑らかな常微分方程式と、更新回数を固定した有限次元の数値積分である。連続解の存在、計算手順の微分可能性、長時間の安定性をそれぞれ区別する。

## 2. 時間とパラメータを別々に微分する

状態 $u(t;\theta)\in\mathbb R^d$ とスカラー $\theta$ を考える。時間微分 $du/dt$ は **$\theta$ を固定**して時間を動かす。一方、パラメータ感度 $s(t)=\partial_\theta u(t;\theta)$ は **時刻 $t$ を固定**して $\theta$ を動かす。既習の[離散ソルバの感度方程式](../PML2-22/index.md#thm-pml2-22-tangent)を時間依存の方程式へ移すため、まずこの区別を明示しておく。

時間発展を

$$
\frac{du}{dt}=f(u,\theta,t),\qquad u(0;\theta)=a(\theta)
$$

と書く。以後、点は時刻 $t$ に関する微分を表し、$\dot u=du/dt$ とする。$u(t;\theta)$ の $\partial_tu$ は $\theta$ を固定した微分であり、この軌道上では $du/dt=\partial_tu$ である。一方、$a'(\theta)$ のプライムは $\theta$ に関する微分を表す。

$f=(f_1,\ldots,f_d)^T$ とし、状態の標準座標 $u_j$ を一つずつ動かしたときの変化を並べると、状態Jacobian $f_u$ とパラメータ偏微分の列 $f_\theta$ は

$
(f_u)_{ij}=\frac{\partial f_i}{\partial u_j},\qquad
(f_\theta)_i=\frac{\partial f_i}{\partial\theta}
\quad(i,j=1,\ldots,d)
$

となる。これらの偏微分では、表示した微分変数以外の引数を固定する。従って $f_u$ は $d\times d$ 行列、$f_\theta$ は $d$ 次元列ベクトルであり、$f_us$ の第 $i$ 成分は $\sum_j(\partial f_i/\partial u_j)s_j$ となる。これが[多変数の連鎖律](../../../基礎科目/RA/RA6/index.md#thm-ra6-chain-rule)で状態を介する微分を計算できる理由である。たとえば $f(u,\theta,t)=-\theta u$ の一変数例なら $f_u=-\theta$、$f_\theta=-u$ となる。

<a id="def-pml2-23-tangent"></a>

<!-- formal-statement-start -->
> **定義（時間発展のパラメータ感度）**  
> 開区間 $\Theta\subset\mathbb R$、$T>0$、$a:\Theta\to\mathbb R^d$ と $f:\mathbb R^d\times\Theta\times[0,T]\to\mathbb R^d$ を与える。各 $\theta\in\Theta$ で初期値問題 $\dot u=f(u,\theta,t)$、$u(0)=a(\theta)$ に解があり、$u$ が $(t,\theta)$ について必要な連続偏微分を持つとする。時刻を固定した導関数

$$
s(t;\theta)=\partial_\theta u(t;\theta)\in\mathbb R^d
$$

> を時間発展のパラメータ感度とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml2-23-tangent -->
**定義の確認**。 $d=1$、$a(\theta)=1$、$f=-\theta u$ なら、$u(t;\theta)=e^{-\theta t}$ は初期値 $u(0)=1$ を満たし、時間微分が $-\theta e^{-\theta t}$ なので元の方程式も満たす。$\theta$ に関する導関数が存在し、$s(t;\theta)=-t e^{-\theta t}$。特に $s(0)=0$ は初期値が $\theta$ に依存しないことと対応する。
<!-- definition-example-end -->

<a id="thm-pml2-23-tangent"></a>

<!-- formal-statement-start -->
> **定理（時間発展の感度方程式）**  
> $T>0$、開区間 $\Theta\subset\mathbb R$、$a\in C^1(\Theta;\mathbb R^d)$、$f$ は $(u,\theta)$ について $C^1$ で偏微分が連続とする。各 $\theta$ の初期値問題 $\dot u=f(u,\theta,t)$ が $[0,T]$ に存在し、解 $u(t;\theta)$ は時間とパラメータについて混合微分が交換できると仮定する。[時間発展のパラメータ感度](#def-pml2-23-tangent)は次を満たす。

$$
\frac{ds}{dt}=f_u(u,\theta,t)s+f_\theta(u,\theta,t),
\qquad s(0)=a'(\theta).
$$
<!-- formal-statement-end -->

**証明の見取り図。** 時間発展の両辺を $\theta$ で微分する。右辺には状態 $u$ を通じた変化と $f$ 自身の明示的な $\theta$ 依存がある。

<!-- proof-start -->
### 証明

各成分 $i$ について $\dot u_i=f_i(u_1,\ldots,u_d,\theta,t)$ を $\theta$ で微分する。仮定した混合微分の交換と[多変数の連鎖律](../../../基礎科目/RA/RA6/index.md#thm-ra6-chain-rule)により

$$
\frac{d}{dt}\partial_\theta u_i
=\partial_\theta\frac{du_i}{dt}
=\sum_{j=1}^d\frac{\partial f_i}{\partial u_j}\partial_\theta u_j
+\frac{\partial f_i}{\partial\theta}.
$$

左辺は $\dot s_i$、右辺の和は行列 $f_u$ の第 $i$ 行と列 $s$ の積だから、全成分をまとめると $\dot s=f_us+f_\theta$。初期条件 $u(0;\theta)=a(\theta)$ を微分すれば $s(0)=a'(\theta)$ である。
<!-- proof-end -->

**一変数例の再計算。** $f_u=-\theta$ と $f_\theta=-u=-e^{-\theta t}$ を代入し、$s(0)=0$ から

$$
\dot s=-\theta s-e^{-\theta t},\qquad
\frac{d}{dt}(e^{\theta t}s)=-1.
$$

よって $e^{\theta t}s(t)-s(0)=-t$、すなわち $s(t)=-t e^{-\theta t}$。正確な解を直接微分した値と一致する。

## 3. 更新式を微分して離散感度を得る

時間幅 $h=T/N$ を固定し、一段更新を $z_{n+1}=\Psi_n(z_n,\theta)$ と書く。更新写像とは状態とパラメータから次段の状態を計算する規則であり、[一段数値更新写像](../PML1-20/index.md#def-pml1-20-one-step)の時間・パラメータ付き版である。各 $\Psi_n:\mathbb R^d\times\Theta\to\mathbb R^d$ は $C^1$ とする。$z_n\in\mathbb R^d$ の感度 $v_n=\partial_\theta z_n$ は、**離散された計算手順そのもの**を微分した値である。

<a id="thm-pml2-23-discrete-tangent"></a>

<!-- formal-statement-start -->
> **定理（固定回数の離散感度伝播）**  
> 開区間 $\Theta\subset\mathbb R$ で $z_0=a(\theta)\in\mathbb R^d$、$a\in C^1$、$z_{n+1}=\Psi_n(z_n,\theta)$（$n=0,\ldots,N-1$）とする。$N\ge1$ は固定整数で、各 $\Psi_n$ は軌道の近傍で $C^1$ とする。このとき $v_n=\partial_\theta z_n$ は

$$
v_0=a'(\theta),\qquad
v_{n+1}=D_z\Psi_n(z_n,\theta)v_n
+\partial_\theta\Psi_n(z_n,\theta)
$$

> を満たす。$D_z\Psi_n$ は $d\times d$、$\partial_\theta\Psi_n$ は $d$ 次元列である。
<!-- formal-statement-end -->

**証明の見取り図。** 各段を一つの合成写像と見て、[前章の感度方程式](../PML2-22/index.md#thm-pml2-22-tangent)と同じ連鎖律を適用する。

<!-- proof-start -->
### 証明

$z_{n+1}(\theta)=\Psi_n(z_n(\theta),\theta)$ の第 $i$ 成分を微分すると

$$
\partial_\theta(z_{n+1})_i
=\sum_{j=1}^d
\frac{\partial(\Psi_n)_i}{\partial z_j}\partial_\theta(z_n)_j
+\frac{\partial(\Psi_n)_i}{\partial\theta}.
$$

これを列ベクトルで書いたものが主張の漸化式。初期値についても $z_0=a(\theta)$ を微分して $v_0=a'(\theta)$ を得る。固定した有限 $N$ について各段で連鎖律を適用できるため、帰納的に全 $v_n$ が定まる。
<!-- proof-end -->

**Euler 法で直接確認。** $\Psi_n(z,\theta)=(1-h\theta)z$、$r=1-h\theta$ とすると、$D_z\Psi_n=r$、$\partial_\theta\Psi_n=-hz$。したがって

$$
z_n=r^n,\quad
v_0=0,\quad
v_{n+1}=rv_n-hz_n.
$$

$n=1$ で $v_1=-h$、$n=2$ で $v_2=-hr-hr=-2hr$。一般に $v_n=-nh\,r^{n-1}$ と仮定すると

$$
v_{n+1}=r(-nh r^{n-1})-hr^n=-(n+1)h r^n
$$

だから帰納的に成り立つ。$N h=T$ より

$$
z_N=(1-h\theta)^N,\qquad
v_N=-T(1-h\theta)^{N-1}.
$$

$r=0$ のときも $N=1$ では $r^0=1$ と読むので、最終感度の式は正しい。

## 4. 逆向きに計算する離散随伴

パラメータが多く、最後の損失が一つの場合は、各パラメータに感度列を持つよりも、逆向きに「終端損失が各段にどれほど敏感か」を運ぶ方法が有効である。ここでは $\theta$ をスカラーとして証明する。パラメータが複数あるときは、各座標方向について同じ計算を繰り返せばよい。

終端損失を $\Phi(z_N,\theta)$、各段の加算損失を $c_n(z_n,\theta)$ とし

$$
L_N(\theta)=\Phi(z_N(\theta),\theta)
+\sum_{n=0}^{N-1}c_n(z_n(\theta),\theta)
$$

を計算する。添字 $n$ は $0,\ldots,N-1$、$c_n$ は更新前の $z_n$ に依存すると決める。

[前講の離散随伴変数](../PML2-22/index.md#def-pml2-22-adjoint)と同じく、後段のスカラー損失の状態勾配を列ベクトルとして逆に運ぶ。なぜ更新のJacobianを転置するかを、$\theta$ を固定した状態の微小変化 $\delta z_n$ から確かめる。$A_n=D_z\Psi_n(z_n,\theta)$ とし、後段損失の変化が $g_{n+1}^T\delta z_{n+1}$ で表せるなら、[連鎖律](../../../基礎科目/RA/RA6/index.md#thm-ra6-chain-rule)から

$
\begin{aligned}
\delta z_{n+1}&=A_n\delta z_n,\\
g_{n+1}^T\delta z_{n+1}
&=g_{n+1}^TA_n\delta z_n
=(A_n^Tg_{n+1})^T\delta z_n.
\end{aligned}
$

したがって前段の状態勾配は $A_n^Tg_{n+1}$ となる。$^T$ は行列・列ベクトルの転置を表す。更新前の損失 $c_n$ があれば、その状態勾配 $\nabla_z c_n$ も加える。この二つの寄与を合わせた列が次の随伴変数である。

<a id="def-pml2-23-discrete-adjoint"></a>

<!-- formal-statement-start -->
> **定義（時間離散随伴変数）**  
> $N\ge1$、$z_{n+1}=\Psi_n(z_n,\theta)$、$z_0=a(\theta)$ とし、$\Psi_n$、$a$、$\Phi$、$c_n$ は必要な変数について $C^1$ とする。終端から逆順に定める列 $\lambda_n\in\mathbb R^d$ を、次の終端条件と漸化式を満たす時間離散随伴変数とする。

$$
\lambda_N=\nabla_z\Phi(z_N,\theta),
\qquad
\lambda_n=D_z\Psi_n(z_n,\theta)^T\lambda_{n+1}
+\nabla_z c_n(z_n,\theta).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml2-23-discrete-adjoint -->
**定義の確認**。 一変数の $z_{n+1}=rz_n$、$\Phi(z_N)=z_N^2/2$、$c_n=0$ では終端値は $\lambda_N=z_N$。更新の状態微分は $r$ だから $\lambda_n=r\lambda_{n+1}$、従って $\lambda_n=r^{N-n}z_N$。終端条件と各段の漸化式を直接満たしている。
<!-- definition-example-end -->

<a id="thm-pml2-23-discrete-adjoint"></a>

<!-- formal-statement-start -->
> **定理（時間離散随伴の全勾配）**  
> [時間離散随伴変数](#def-pml2-23-discrete-adjoint)の仮定の下で、離散損失を次のように置く。

$$
L_N(\theta)=\Phi(z_N,\theta)+\sum_{n=0}^{N-1}c_n(z_n,\theta).
$$

> 初期値の $\theta$ 依存も含めた全微分は

$$
\frac{dL_N}{d\theta}
=\partial_\theta\Phi(z_N,\theta)
+\lambda_0^T a'(\theta)
+\sum_{n=0}^{N-1}
\left\{
\partial_\theta c_n(z_n,\theta)
+\lambda_{n+1}^T\partial_\theta\Psi_n(z_n,\theta)
\right\}.
$$

> ここで各 $\partial_\theta$ は状態を固定した偏微分であり、$\lambda_n$ の定義には更新の状態偏微分が入る。
<!-- formal-statement-end -->

**証明の見取り図。** 損失を直接微分すると $\nabla c_n^T v_n$ と $\nabla\Phi^T v_N$ が出る。離散感度 $v_{n+1}=D_z\Psi_n v_n+\partial_\theta\Psi_n$ を代入し、後ろから前へ $v_n$ の係数を移して消す。

<!-- proof-start -->
### 証明

[離散感度伝播](#thm-pml2-23-discrete-tangent)の $v_n=\partial_\theta z_n$ を用いる。連鎖律から

$$
\frac{dL_N}{d\theta}
=\partial_\theta\Phi+\lambda_N^T v_N
+\sum_{n=0}^{N-1}
\left(\partial_\theta c_n+\nabla_z c_n^T v_n\right).
$$

更新の微分式を随伴列との内積に代入すると

$$
\lambda_{n+1}^Tv_{n+1}
=\lambda_{n+1}^TD_z\Psi_n\,v_n
+\lambda_{n+1}^T\partial_\theta\Psi_n.
$$

随伴の定義から $\lambda_n^T=\lambda_{n+1}^TD_z\Psi_n+\nabla_z c_n^T$ であるから

$$
\lambda_{n+1}^Tv_{n+1}+\nabla_z c_n^Tv_n
=\lambda_n^Tv_n+\lambda_{n+1}^T\partial_\theta\Psi_n.
$$

この恒等式を $n=N-1$ から $n=0$ まで順に使う。例えば最終段では $\lambda_N^Tv_N+\nabla_zc_{N-1}^Tv_{N-1}$ が $\lambda_{N-1}^Tv_{N-1}+\lambda_N^T\partial_\theta\Psi_{N-1}$ となる。次段の $\nabla_zc_{N-2}^Tv_{N-2}$ を加えて同じ置換を繰り返せば、途中の感度項が順番に消え、

$
\lambda_N^Tv_N+\sum_{n=0}^{N-1}\nabla_z c_n^Tv_n
=\lambda_0^Tv_0+\sum_{n=0}^{N-1}\lambda_{n+1}^T\partial_\theta\Psi_n.
$

最後に $v_0=a'(\theta)$ を代入すれば主張の式となる。
<!-- proof-end -->

**二段の具体例。** $N=2$、$z_0=1$、$c_n=0$、$\Phi(z)=z^2/2$、$r=1-h\theta$ では

$$
z_1=r,\quad z_2=r^2,\quad
\lambda_2=r^2,\quad\lambda_1=r^3.
$$

$\partial_\theta\Psi_n=-hz_n$ だから、随伴勾配は

$$
L_2'=\lambda_1(-hz_0)+\lambda_2(-hz_1)
=-hr^3-hr^3=-2hr^3.
$$

直接微分でも $L_2=r^4/2$ から $L_2'=-2hr^3$。**離散随伴と離散直接感度は一致する**が、それは同じ $N,h$ の計算手順についての一致である。

## 5. 連続随伴は何を微分しているか

数値積分する前の常微分方程式からも随伴方程式を導ける。時間を進める状態 $u$ と、その状態の変化を目的関数へ伝える随伴 $p$ を同時に考える。$\theta$ を固定した軌道に沿う随伴の時間微分は $p'(t)=dp/dt$ と書く（$\theta$ による微分ではない）。状態偏微分 $f_u$ は各時刻の $(u(t;\theta),\theta,t)$ で評価し、$f_u^Tp$ は先に説明したJacobianの転置を列ベクトル $p$ に作用させたものである。

時刻全体の損失を、終端損失 $\Phi(u(T),\theta)$ と時間積分損失 $\int_0^T\ell(u(t),\theta,t)\,dt$ の和とする。$\Phi_u$、$\ell_u$ は状態に関する勾配列ベクトルである。

<a id="def-pml2-23-continuous-adjoint"></a>

<!-- formal-statement-start -->
> **定義（連続時間随伴変数）**  
> $T>0$、$\theta$ は開区間の内点、$u:[0,T]\to\mathbb R^d$ は $\dot u=f(u,\theta,t)$、$u(0)=a(\theta)$ の解とする。$f$、$\Phi$、$\ell$ は軌道近傍で必要な一階偏微分が連続とし、時間積分を微分できると仮定する。終端条件から逆向きに解く列ベクトル $p(t)\in\mathbb R^d$ を、次の随伴方程式の解とする。

$$
-\frac{dp}{dt}=f_u(u,\theta,t)^T p+\nabla_u\ell(u,\theta,t),
\qquad
p(T)=\nabla_u\Phi(u(T),\theta).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml2-23-continuous-adjoint -->
**定義の確認**。 $f=-\theta u$、$\ell=0$、$\Phi(u)=u^2/2$ なら $-p'=-\theta p$、すなわち $p'=\theta p$。終端値 $p(T)=u(T)=e^{-\theta T}$ を使うと

$$
p(t)=e^{-\theta T}e^{\theta(t-T)}
=e^{-\theta(2T-t)}.
$$

この式は $p(T)=e^{-\theta T}$、$p'=\theta p$ の双方を満たす。状態は前向き、随伴は終端値から逆向きに決めるが、微分方程式そのものの符号を取り違えないことが重要である。
<!-- definition-example-end -->

<a id="thm-pml2-23-continuous-adjoint"></a>

<!-- formal-statement-start -->
> **定理（連続時間随伴の全勾配）**  
> 開区間 $\Theta\subset\mathbb R$ と有限時間 $T>0$ を取り、$a\in C^1$、$f,\Phi,\ell$ は対象軌道の近傍で一階偏微分が連続とする。$u(t;\theta)$ は $\dot u=f(u,\theta,t)$、$u(0)=a(\theta)$ を満たし、$u$ のパラメータ感度が[感度方程式](#thm-pml2-23-tangent)を満たすこと、時間積分とパラメータ微分の交換が許されることを仮定する。[連続時間随伴変数](#def-pml2-23-continuous-adjoint)が存在すれば、

$$
L(\theta)=\Phi(u(T;\theta),\theta)
+\int_0^T\ell(u(t;\theta),\theta,t)\,dt
$$

> の全微分は

$$
L'(\theta)=\partial_\theta\Phi
+p(0)^Ta'(\theta)
+\int_0^T
\left(\partial_\theta\ell+p(t)^Tf_\theta\right)\,dt.
$$

> 積分内のすべての関数は $(u(t;\theta),\theta,t)$ で、$\partial_\theta\Phi$ は $(u(T;\theta),\theta)$ で評価する。
<!-- formal-statement-end -->

**証明の見取り図。** $L'$ に現れる $s(t)$ を[感度方程式](#thm-pml2-23-tangent)と随伴方程式で消去する。核心は積 $p(t)^Ts(t)$ を時間微分し、区間端点へまとめることである。

<!-- proof-start -->
### 証明

連鎖律と仮定した積分・微分の交換により

$$
L'=\partial_\theta\Phi
+\nabla_u\Phi^Ts(T)
+\int_0^T
\left(\partial_\theta\ell+\nabla_u\ell^Ts\right)dt.
$$

[感度方程式](#thm-pml2-23-tangent)と随伴方程式から、積の時間微分は

$$
\begin{aligned}
\frac{d}{dt}(p^Ts)
&=p'^Ts+p^Ts'\\
&=(-f_u^Tp-\nabla_u\ell)^Ts
+p^T(f_us+f_\theta)\\
&=-p^Tf_us-\nabla_u\ell^Ts
+p^Tf_us+p^Tf_\theta\\
&=-\nabla_u\ell^Ts+p^Tf_\theta.
\end{aligned}
$$

よって $\nabla_u\ell^Ts=p^Tf_\theta-\frac{d}{dt}(p^Ts)$。積分して

$$
\int_0^T\nabla_u\ell^Ts\,dt
=\int_0^Tp^Tf_\theta\,dt
-p(T)^Ts(T)+p(0)^Ts(0).
$$

終端条件 $p(T)=\nabla_u\Phi$ により終端感度の二項が相殺し、初期条件 $s(0)=a'(\theta)$ を使うと所望の公式が得られる。
<!-- proof-end -->

**一変数例での検算。** $\ell=0$、$\Phi(u)=u^2/2$、$a\equiv1$ なら $\Phi_\theta=0$、$a'=0$、$f_\theta=-u=-e^{-\theta t}$ なので

$$
p(t)f_\theta
=-e^{-\theta(2T-t)}e^{-\theta t}
=-e^{-2\theta T}.
$$

従って

$$
L'=\int_0^T(-e^{-2\theta T})\,dt
=-Te^{-2\theta T}.
$$

直接 $L=e^{-2\theta T}/2$ を微分しても同じ値が得られる。連続随伴の微分対象は **正確な連続方程式の損失**であり、離散随伴の微分対象は **採用した離散更新の損失**である。

## 6. 刻み幅と安定性で勾配の符号が変わる

$\Phi(u)=u^2/2$、$u(0)=1$、$T>0$ に固定し、$\theta>0$ を動かす。連続損失は $L(\theta)=e^{-2\theta T}/2$。陽的 Euler の離散損失は $L_N(\theta)=r^{2N}/2$、$r=1-\theta h$ である。

<a id="prop-pml2-23-euler-gradient"></a>

<!-- formal-statement-start -->
> **命題（Euler法の離散勾配と連続勾配）**  
> $\theta>0$、$T>0$、整数 $N\ge1$、$h=T/N$、$r=1-\theta h$ とする。$\dot u=-\theta u$、$u(0)=1$ と、その陽的 Euler 更新 $z_{n+1}=rz_n$、$z_0=1$ を考え、両終端損失を $\frac12$（終端状態）$^2$ とする。このとき

$$
L'(\theta)=-Te^{-2\theta T},
\qquad
L_N'(\theta)=-T(1-\theta h)^{2N-1}.
$$

> $T,\theta$ を固定して $h=T/N\to0$ とすると $L_N'(\theta)\to L'(\theta)$。十分小さい正の $h$ では $\left|L_N'(\theta)-L'(\theta)\right|=O(h)$ が成り立つ。
<!-- formal-statement-end -->

**証明の見取り図。** 前半は指数関数と多項式を別々に微分する。後半は $\log(1-\theta h)$ を小さい $h$ で展開し、指数を $N=T/h$ 回掛け合わせた差を見る。

<!-- proof-start -->
### 証明

連続解 $u(T)=e^{-\theta T}$ より $L=e^{-2\theta T}/2$ だから $L'=-Te^{-2\theta T}$。離散解は $z_N=r^N$、従って

$$
\begin{aligned}
L_N'
&=\frac{d}{d\theta}\frac12(r^N)^2
=r^N\left(Nr^{N-1}(-h)\right)\\
&=-Nh r^{2N-1}
=-T(1-\theta h)^{2N-1}.
\end{aligned}
$$

$N$ が増えると $h\to0$。十分小さい $h$ では $0<\theta h<1$ で対数を取れる。$x=0$ での $\log(1-x)$ の二次 Taylor 展開を $x=\theta h$ に適用して

$$
\log(1-\theta h)
=-\theta h-\frac{\theta^2h^2}{2}+O(h^3).
$$

$N=T/h$ を代入し、

$$
N\log(1-\theta h)
=-\theta T-\frac{\theta^2Th}{2}+O(h^2).
$$

これを指数関数に戻せば $r^N=e^{-\theta T}(1+O(h))$。また $r^{-1}=(1-\theta h)^{-1}=1+O(h)$ なので

$$
r^{2N-1}=(r^N)^2 r^{-1}
=e^{-2\theta T}(1+O(h)).
$$

両勾配の差は $O(h)$ となる。ここで $O(h)$ の定数は固定した $\theta,T$ に依存し得るため、この証明だけで任意の長時間 $T$ に一様な誤差は保証しない。
<!-- proof-end -->

安定性を状態値で検査すると、誤差を表す倍率は $r=1-\theta h$。初期誤差 $e_n$ は $e_{n+1}=re_n$ だから、$|e_n|\to0$ の条件は $|r|<1$、すなわち $0<h\theta<2$ である。これは、[PML1-20 の離散更新と長時間安定性の区別](../PML1-20/index.md#prop-pml1-20-stability)と同じく、一段行列の増幅率から判定する。**しかし状態の安定性は勾配の符号の正しさを意味しない。**

<a id="prop-pml2-23-sign-reversal"></a>

<!-- formal-statement-start -->
> **命題（状態は減衰しても勾配の符号が反転する）**  
> $\theta=3/2$、$T=2$、$N=2$、$h=1$、$\dot u=-\theta u$、$u(0)=1$ とし、損失は終端状態の二乗の半分とする。このとき陽的 Euler の増幅率は $r=-1/2$ で $|r|<1$ だが、連続損失と離散損失の $\theta$ 勾配の符号は逆である。

$$
L_N'(\tfrac32)=\frac14>0,\qquad
L'(\tfrac32)=-2e^{-6}<0.
$$
<!-- formal-statement-end -->

**証明の見取り図。** $r<0$ なら二段では状態が正へ戻るが、$r$ の $\theta$ 微分が負なので $r^2$ の感度は正となる。指数関数の正確な解では感度は常に負である。

<!-- proof-start -->
### 証明

与えられた値で $r=1-(3/2)=-1/2$、$z_1=-1/2$、$z_2=1/4$。$v_1=-1$、$v_2=rv_1-hz_1=1/2+1/2=1$。従って $L_N'=z_2v_2=1/4$。

一方、正確な終端状態は $u(2)=e^{-3}$、感度は $s(2)=-2e^{-3}$ なので $L'=u(2)s(2)=-2e^{-6}$。$|r|=1/2$ は状態増幅の絶対値を減衰させるが、偶数段の感度の符号はその事実からは決まらない。
<!-- proof-end -->

この例で「損失を減らすために $\theta$ を増やすか減らすか」を離散勾配だけで選ぶと、連続方程式の損失とは逆方向を選び得る。**正確に自動微分できたことと、求める物理モデルに対して正しい勾配であることは別問題**である。

## 7. 刻み幅の選び方が変わる場合

これまでの定理は整数 $N$ を固定して微分している。実際のソルバでは誤差判定によってステップを棄却・再試行したり、$\theta$ に応じてステップ数を変えたりする。そのような場合、固定した計算経路を微分する式を、分岐点での全体の微分と同一視できない。

<a id="prop-pml2-23-branch"></a>

<!-- formal-statement-start -->
> **命題（ステップ数を切り替える計算の不連続性）**  
> $T=1$、$u(0)=1$、$\dot u=-\theta u$、$\theta>0$ とする。$\theta<1$ では Euler 法を $N=1$、$\theta\ge1$ では $N=2$ 回用い、各場合の $h=T/N$ で終端値 $q(\theta)$ を計算する。このとき

$$
q(\theta)=
\begin{cases}
1-\theta,&0<\theta<1,\\
(1-\theta/2)^2,&\theta\ge1
\end{cases}
$$

> は $\theta=1$ で不連続であり、この点では導関数を持たない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

一段では $h=1$、$z_1=1-\theta$。二段では $h=1/2$ で $z_2=(1-\theta/2)^2$。$\theta\uparrow1$ の左極限は $0$、一方 $q(1)=(1-1/2)^2=1/4$ なので不連続である。各分岐内の導関数 $-1$ と $-(1-\theta/2)$ は計算できるが、分岐境界の微分は存在しない。
<!-- proof-end -->

実際の適応時間刻みソルバが常に不連続というわけではない。ここで示したのは、**パラメータによって離散アルゴリズムの制御経路が変わる場合、固定経路の微分をそのまま全体の導関数と呼べない**という具体的な障害である。

## 8. 実行可能な数値検算

次のコードは標準 Python のみで、連続勾配・固定ステップの離散勾配・離散損失の中心差分を比べる。数値差分では $N$ と $T$ を固定し、微分対象を勝手に変更しない。

~~~python
import math

def euler_state(theta, T, N):
    h = T / N
    z = 1.0
    for _ in range(N):
        z *= 1.0 - h * theta
    return z

def loss(theta, T, N):
    z = euler_state(theta, T, N)
    return 0.5 * z * z

def tangent_gradient(theta, T, N):
    h = T / N
    z, v = 1.0, 0.0
    for _ in range(N):
        old_z = z
        z = (1.0 - h * theta) * old_z
        v = (1.0 - h * theta) * v - h * old_z
    return z * v

def adjoint_gradient(theta, T, N):
    h = T / N
    states = [1.0]
    for _ in range(N):
        states.append((1.0 - h * theta) * states[-1])
    lam = states[-1]
    grad = 0.0
    for n in range(N - 1, -1, -1):
        grad += lam * (-h * states[n])
        lam *= 1.0 - h * theta
    return grad

theta, T = 1.0, 1.0
continuous = -T * math.exp(-2.0 * theta * T)
for N in (1, 2, 4, 8, 16, 32, 64):
    direct = tangent_gradient(theta, T, N)
    adj = adjoint_gradient(theta, T, N)
    delta = 1.0e-5
    fd = (loss(theta + delta, T, N) - loss(theta - delta, T, N)) / (2.0 * delta)
    print(N, direct, adj, fd, continuous)
    assert abs(direct - adj) < 1.0e-12
    assert abs(direct - fd) < 1.0e-8

theta, T, N = 1.5, 2.0, 2
assert abs(adjoint_gradient(theta, T, N) - 0.25) < 1.0e-12
assert -T * math.exp(-2.0 * theta * T) < 0.0
~~~

$N=1$ の離散勾配は零で、$N$ が増えると連続勾配 $-e^{-2}$ へ近づく。特に $T=\theta=1$ では $N=2$ の勾配は $-1/8=-0.125$、$N=4$ の勾配は $-(3/4)^7=-2187/16384\approx-0.133484$ であり、連続値 $-e^{-2}\approx-0.135335$ との距離が小さくなる様子を数値で確認できる。有限差分が一致するのは **同一の離散損失**の微分との比較だからであり、連続解に対する勾配の正確さをそれだけで証明するものではない。

## 9. 演習と詳細解答

### Level A：時間感度・更新の微分・安定性

<a id="ex-pml2-23-a01"></a>

**問題 PML2-23-A01**
- Level: A
- $\dot u=-2\theta u$、$u(0)=3$、$\theta>0$ について、$u(t;\theta)$、$s(t;\theta)$ を求め、感度方程式の初期条件と右辺を確認せよ。

<!-- solution-start -->
**詳細解答。** $\theta$ を固定し、時間 $t$ に関する積の微分を取る。$u$ で割る変数分離は必要ない。

$
\frac{d}{dt}\bigl(e^{2\theta t}u(t)\bigr)
=e^{2\theta t}\bigl(\dot u+2\theta u\bigr)=0.
$

よって $e^{2\theta t}u(t)=u(0)=3$、すなわち $u(t;\theta)=3e^{-2\theta t}$。次に **時刻を固定して** $\theta$ で微分すると $s(t;\theta)=\partial_\theta u(t;\theta)=-6t e^{-2\theta t}$ となる。[時間発展の感度方程式](#thm-pml2-23-tangent)を別に検算するため、$f_u=-2\theta$、$f_\theta=-2u=-6e^{-2\theta t}$ を求める。右辺と左辺はそれぞれ

$
\begin{aligned}
f_us+f_\theta
&=12\theta t e^{-2\theta t}-6e^{-2\theta t},\\
\frac{ds}{dt}
&=-6e^{-2\theta t}+12\theta t e^{-2\theta t}
\end{aligned}
$

で一致する。初期値の微分は $a'(\theta)=0$、実際 $s(0;\theta)=0$ である。
<!-- solution-end -->

<a id="ex-pml2-23-a02"></a>

**問題 PML2-23-A02**
- Level: A
- $z_{n+1}=(1-h\theta)z_n$、$z_0=\theta$、$N=2$、$h>0$ は固定とする。$z_2$ と $\partial_\theta z_2$ を計算し、初期値の微分を含めた感度伝播で照合せよ。

<!-- solution-start -->
**詳細解答。** $r=1-h\theta$ と置くと $z_1=r\theta$、$z_2=r^2\theta$ である。積の微分より $z_2'=r^2-2h\theta r$。[離散感度伝播](#thm-pml2-23-discrete-tangent)は $v_0=1$、$v_1=rv_0-hz_0=r-h\theta$、$v_2=rv_1-hz_1=r(r-h\theta)-hr\theta=r^2-2h\theta r$ と一致する。$v_0=0$ と置くのは初期値の $\theta$ 依存を落とした誤り。
<!-- solution-end -->

<a id="ex-pml2-23-a03"></a>

**問題 PML2-23-A03**
- Level: A
- $\dot u=-\theta u$、$\theta>0$ の Euler 増幅率 $r=1-h\theta$ が $|r|<1$、$r\ge0$、$r<0$ となる範囲をそれぞれ求め、解が一段ごとに交互に符号を変える場合を説明せよ。

<!-- solution-start -->
**詳細解答。** $|1-h\theta|<1$ を $-1<1-h\theta<1$ と書き、両側を整理すると $0<h\theta<2$。$r\ge0$ は $h\theta\le1$、$r<0$ は $h\theta>1$。従って減衰安定で符号が交互に変わる範囲は $1<h\theta<2$。$h\theta=1$ では一歩で $z_1=0$、$h\theta=2$ では $r=-1$ で絶対値が減衰しない。
<!-- solution-end -->

<a id="ex-pml2-23-a04"></a>

**問題 PML2-23-A04**
- Level: A
- $\dot u=-\theta u$、$u(0)=1$、$T=1$、$\theta=1$、$N=2$ の Euler 終端値、感度、損失 $L_N=z_N^2/2$ の勾配を求め、連続勾配と比較せよ。

<!-- solution-start -->
**詳細解答。** $h=1/2$、$r=1/2$ より $z_2=r^2=1/4$。感度は $v_2=-2h r=-1/2$。離散勾配は $L_2'=z_2v_2=-1/8$。一方連続解は $u(1)=e^{-1}$、連続勾配は $L'=-e^{-2}$。$1/8\ne e^{-2}$ なので二つの勾配は一致しないが、$L_2'$ はこの二段計算を正しく微分している。
<!-- solution-end -->

<a id="ex-pml2-23-a05"></a>

**問題 PML2-23-A05**
- Level: A
- $z_1=(1-h\theta)z_0$、$z_0=1$、$h>0$、$\Phi(z_1,\theta)=z_1+\theta^2$ とする。離散随伴公式を使い、全微分のうち終端損失の明示的依存による項を分離せよ。

<!-- solution-start -->
**詳細解答。** $\lambda_1=\partial_{z_1}\Phi=1$、$a'=0$、$c_0=0$。$\Phi_\theta=2\theta$、$\Psi_\theta=-hz_0=-h$ なので[時間離散随伴の全勾配公式](#thm-pml2-23-discrete-adjoint)は $L'=2\theta+\lambda_1(-h)=2\theta-h$。直接 $L=1-h\theta+\theta^2$ と置いて微分しても同じ。$\Phi_\theta$ を省くと $-h$ だけになり誤る。
<!-- solution-end -->

### Level B：随伴・符号反転・アルゴリズム分岐

<a id="ex-pml2-23-b01"></a>

**問題 PML2-23-B01**
- Level: B
- $\dot u=-\theta u$、$u(0)=1$、$\Phi(u(T))=u(T)$、$\ell=0$、$\theta,T>0$ とする。連続随伴 $p$ を終端値から解き、随伴積分で $L'(\theta)$ を求め、感度方程式の結果と照合せよ。

<!-- solution-start -->
**詳細解答。** 終端条件は $p(T)=\Phi_u=1$。$f_u=-\theta$ なので $-p'=-\theta p$、すなわち $p'=\theta p$。終端値を満たす解は $p(t)=e^{\theta(t-T)}$。$a'=0$、$\Phi_\theta=0$、$f_\theta=-e^{-\theta t}$ より

$$
L'=\int_0^T p(t)f_\theta(t)\,dt
=\int_0^T -e^{\theta(t-T)}e^{-\theta t}\,dt
=\int_0^T -e^{-\theta T}\,dt
=-T e^{-\theta T}.
$$

[感度方程式](#thm-pml2-23-tangent)は $s'=-\theta s-u$、$s(0)=0$。積分因子を掛けると $(e^{\theta t}s)'=-1$、従って $s(T)=-T e^{-\theta T}=L'$。終端損失が $u(T)$ そのものなので、二乗損失のときの $-Te^{-2\theta T}$ と混同しない。
<!-- solution-end -->

<a id="ex-pml2-23-b02"></a>

**問題 PML2-23-B02**
- Level: B
- $z_{n+1}=rz_n$、$r=1-h\theta$、$z_0=1$、$N=3$、$h>0$ は固定とする。損失 $L_3=z_3^2/2+\gamma z_1^2/2$（$\gamma>0$）の随伴列と全勾配を求め、直接微分に一致させよ。

<!-- solution-start -->
**詳細解答。** $z_1=r$、$z_2=r^2$、$z_3=r^3$。[時間離散随伴の定義](#def-pml2-23-discrete-adjoint)に合わせ、段ごとの損失は $c_1(z_1)=\gamma z_1^2/2$、$c_0=c_2=0$ とする。$\lambda_3=z_3=r^3$、$\lambda_2=r\lambda_3=r^4$、$\lambda_1=r\lambda_2+\gamma z_1=r^5+\gamma r$、$\lambda_0=r\lambda_1=r^6+\gamma r^2$。

初期値と終端損失には明示的な $\theta$ 依存がない。$\Psi_\theta=-hz_n$ だから

$$
\begin{aligned}
L_3'
&=-h(\lambda_1z_0+\lambda_2z_1+\lambda_3z_2)\\
&=-h\{(r^5+\gamma r)+r^4r+r^3r^2\}\\
&=-3hr^5-\gamma hr.
\end{aligned}
$$

直接 $L_3=r^6/2+\gamma r^2/2$ を微分すると $L_3'=-3hr^5-\gamma hr$。途中損失の $\gamma r$ 項を随伴に注入しなければ $\gamma$ 項が欠ける。
<!-- solution-end -->

<a id="ex-pml2-23-b03"></a>

**問題 PML2-23-B03**
- Level: B
- $\theta=3/2$、$T=2$、$N=2$、$h=1$ の Euler 法で、終端二乗損失の離散勾配と連続勾配を計算せよ。減衰安定かを判定し、勾配の符号が異なる理由を、更新感度の二段を用いて説明せよ。

<!-- solution-start -->
**詳細解答。** $r=1-h\theta=-1/2$ で $|r|<1$ だから初期誤差は反復で減衰する。状態は $z_0=1$、$z_1=-1/2$、$z_2=1/4$。感度は $v_0=0$、$v_1=-hz_0=-1$、

$$
v_2=rv_1-hz_1=(-1/2)(-1)-(-1/2)=1.
$$

離散勾配は $z_2v_2=1/4>0$。連続勾配は $-Te^{-2\theta T}=-2e^{-6}<0$。安定性が判定するのは $|r|$ による状態誤差の減衰であって、$v_2$ の符号ではない。負の $r$ が二段で正に戻るため感度は増加方向となり、連続解の単調減少と食い違う。
<!-- solution-end -->

<a id="ex-pml2-23-b04"></a>

**問題 PML2-23-B04**
- Level: B
- $T=1$、$\dot u=-\theta u$、$u(0)=1$ に対し、$\theta<1$ で一段、$\theta\ge1$ で二段の Euler 法を用いる。$\theta=1$ における左右の終端値の極限を計算し、一段の計算グラフを自動微分した値が全アルゴリズムの導関数でない理由を示せ。

<!-- solution-start -->
**詳細解答。** 一段の式は $q_1(\theta)=1-\theta$ で $\theta\uparrow1$ における左極限は $0$。二段の式は $q_2(\theta)=(1-\theta/2)^2$ で、$q(1)=1/4$、右極限も $1/4$。従って関数 $q$ は $\theta=1$ で不連続であり導関数を持たない。一段の固定計算経路では微分が $-1$、二段では $q_2'=-(1-\theta/2)$ で $\theta=1$ において $-1/2$ を返すが、いずれも分岐境界で定義されない全体の導関数ではない。
<!-- solution-end -->

### Level C：連続・離散・随伴・安定性を統合する

<a id="ex-pml2-23-c01"></a>

**問題 PML2-23-C01**
- Level: C
- $\dot u=-\theta u$、$u(0)=1$、$\theta>0$、$T>0$、$N\ge2$ は整数、$h=T/N$ とする。終端損失は $L=\frac12(u(T)-y)^2$、離散損失は $L_N=\frac12(z_N-y)^2$ で $y\in\mathbb R$ は定数である。(i) 連続感度と連続随伴から同じ $L'$ を導け。(ii) Euler 更新に対し離散感度と離散随伴から同じ $L_N'$ を導け。(iii) $\theta=3/2$、$T=2$、$N=2$、$y=0$ で安定性と勾配の符号を調べよ。(iv) $T,\theta,y$ を固定し $N\to\infty$ としたときの勾配の極限を示せ。

<!-- solution-start -->
**詳細解答。**

(i) 正確な状態と感度は $u(T)=e^{-\theta T}$、$s(T)=-Te^{-\theta T}$。連鎖律より

$$
L'=(u(T)-y)s(T)
=-T(e^{-\theta T}-y)e^{-\theta T}.
$$

連続随伴の終端条件は $p(T)=u(T)-y=e^{-\theta T}-y$。$p'=\theta p$ だから

$$
p(t)=(e^{-\theta T}-y)e^{\theta(t-T)}.
$$

$\Phi_\theta=0$、$\ell=0$、$a'=0$、$f_\theta=-e^{-\theta t}$ より

$$
\begin{aligned}
L'&=\int_0^T p(t)(-e^{-\theta t})\,dt\\
&=\int_0^T-(e^{-\theta T}-y)e^{-\theta T}\,dt\\
&=-T(e^{-\theta T}-y)e^{-\theta T}.
\end{aligned}
$$

(ii) $r=1-h\theta$ と書くと $z_n=r^n$。感度漸化式は $v_{n+1}=rv_n-hz_n$、$v_0=0$。帰納的に $v_N=-Nh r^{N-1}=-T r^{N-1}$ なので

$$
L_N'=(z_N-y)v_N=-T(r^N-y)r^{N-1}.
$$

離散随伴では $\lambda_N=r^N-y$、$\lambda_n=r\lambda_{n+1}$ なので $\lambda_{n+1}=r^{N-n-1}(r^N-y)$。従って

$$
\begin{aligned}
L_N'
&=\sum_{n=0}^{N-1}\lambda_{n+1}(-h z_n)\\
&=-h\sum_{n=0}^{N-1}r^{N-n-1}(r^N-y)r^n\\
&=-Nh(r^N-y)r^{N-1}\\
&=-T(r^N-y)r^{N-1}.
\end{aligned}
$$

(iii) $h=1$、$r=-1/2$ より $|r|<1$ で状態は減衰安定。$y=0$ では $z_2=1/4$、$v_2=1$、$L_N'=1/4>0$。連続勾配は $L'=-2e^{-6}<0$。離散随伴の正しさと連続損失の下降方向とは別である。

(iv) $h=T/N\to0$ のとき $(1-\theta T/N)^N\to e^{-\theta T}$。同時に $r\to1$ なので $r^{N-1}=r^N/r\to e^{-\theta T}$（十分大きい $N$ では $r>0$）。従って離散勾配は

$$
L_N'=-T(r^N-y)r^{N-1}
\longrightarrow -T(e^{-\theta T}-y)e^{-\theta T}=L'.
$$

この極限は固定 $T,\theta,y$ の主張であり、$T$ まで同時に無限大へ動かす一般の場合の保証ではない。
<!-- solution-end -->

## 10. 次講へ

本講では、同じ時間発展について **連続感度・連続随伴・固定刻みの離散感度・離散随伴**をすべて導出し、時間離散化の勾配が連続損失の勾配と食い違う機構を具体的に検算した。計算グラフを正しく微分しても、刻み幅やステップ選択が不適切なら学習方向を誤る。

次講 PML2-24 では、単発の逆問題から一歩進み、**時刻を追って観測を受け取り、状態推定と不確実性を更新するデータ同化**を扱う。
