# MQ4 中心力ポテンシャルと水素原子

[MECH7 の二体問題](../MECH7/index.md)では、重心運動を分離すると、相対位置に換算質量を割り当てられました。[EMAG3 の Coulomb ポテンシャル](../EMAG3/index.md)は、反対符号の電荷間に引力の $-1/r$ を与えます。これらを [MQ1 の自己共役作用素](../MQ1/index.md)として組み合わせると、水素様原子の**エネルギーと量子数**を数学的に決められます。

ただし、$-\Delta-\text{定数}/r$ を球座標へ書き換えるだけでは終わりません。原点の特異性、角方向と動径方向の Hilbert 空間分解、負の固有値以外に負のスペクトルがないことを順番に確かめます。最後に連続スペクトルとの違いを確認します。

以下では $\hbar,\varepsilon_0,e,m_e,m_N>0$、核電荷 $+Ze$（$Z\in\mathbb N$）、電子電荷 $-e$、核質量 $m_N$、電子質量 $m_e$ とします。内積は既習の QM 系列と同じく第1変数に線形とし、$\mathcal H=L^2(\mathbb R^3,dx)$ は複素 Hilbert 空間です。

## 1. 二体問題から一つの Schrödinger 作用素へ

質量 $m_e,m_N$、位置 $x_e,x_N$、運動量 $p_e,p_N$ に対する古典 Hamiltonian は

$$
H_{\rm cl}=\frac{|p_e|^2}{2m_e}+\frac{|p_N|^2}{2m_N}
-\frac{\kappa}{|x_e-x_N|},
\qquad \kappa=\frac{Ze^2}{4\pi\varepsilon_0}>0.
$$

[MECH7 の換算質量](../MECH7/index.md)と同じ変換
$R=(m_ex_e+m_Nx_N)/(m_e+m_N)$、$r=x_e-x_N$、
$M=m_e+m_N$、$\mu=m_em_N/M$ を使います。
$x_e=R+(m_N/M)r$、$x_N=R-(m_e/M)r$ なので

$$
\begin{aligned}
m_e|\dot x_e|^2+m_N|\dot x_N|^2
&=M|\dot R|^2
+2\left(\frac{m_em_N}{M}-\frac{m_Nm_e}{M}\right)\dot R\cdot\dot r\\
&\quad+\left(\frac{m_em_N^2}{M^2}+\frac{m_Nm_e^2}{M^2}\right)|\dot r|^2\\
&=M|\dot R|^2+\mu|\dot r|^2.
\end{aligned}
$$

従って重心と相対座標の正準運動量 $P=M\dot R$、$p=\mu\dot r$ により
$H_{\rm cl}=|P|^2/(2M)+|p|^2/(2\mu)-\kappa/|r|$ です。重心は自由運動なので、内部エネルギーを測るには相対 Hamiltonian に注目します。正準量子化は**モデル化の選択**であり、古典方程式から必然的に出る定理ではありません。

<a id="def-mq4-coulomb-hamiltonian"></a>
<!-- formal-statement-start -->
> **定義（Coulomb Hamiltonian の微分表示）**  
> $a=\hbar^2/(2\mu)>0$、$\kappa=Ze^2/(4\pi\varepsilon_0)>0$ とし、$\mathcal S(\mathbb R^3)$ 上で
>
$$
H_{\rm diff}\psi=-a\Delta\psi-\frac{\kappa}{|x|}\psi
$$
>
> と定める。$|x|=r$ と書き、長さの逆数 $\beta=\mu\kappa/\hbar^2=\kappa/(2a)$ と $a_Z=\beta^{-1}$ を導入する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mq4-coulomb-hamiltonian -->
**定義の確認**：$\psi(x)=e^{-|x|^2}$ は Schwartz 関数です。$\psi/r\in L^2$ であることは、半径 $0<r<1$ の積分
$\int_{|x|<1}|\psi/r|^2dx=4\pi\int_0^1e^{-2r^2}dr<\infty$
と、$r\ge1$ で $1/r\le1$ となることから確認できます。このため $H_{\rm diff}\psi$ は実際に $L^2$ の元です。
<!-- definition-example-end -->

## 2. 原点で発散しても自己共役になるか

$-\kappa/r$ は有界ポテンシャルではありません。しかし、$3$ 次元では $1/r$ を Laplacian に対して**相対界 0**の摂動として扱えます。

<a id="thm-mq4-coulomb-selfadjoint"></a>
<!-- formal-statement-start -->
> **定理（Coulomb Hamiltonian の自己共役性と下界）**  
> $a,\kappa>0$ とする。$H_{\rm diff}=-a\Delta-\kappa/|x|$ は $\mathcal S(\mathbb R^3)$ 上で本質的自己共役である。閉包 $H$ は
>
$$
D(H)=H^2(\mathbb R^3),\qquad
H\psi=-a\Delta\psi-\frac{\kappa}{r}\psi
$$
>
> で定まる自己共役作用素で、下に有界である。
<!-- formal-statement-end -->

ポイントは、ポテンシャル項を単独で見れば特異でも、二階微分のグラフノルムに比べると十分小さくできることです。

<!-- proof-start -->
### 証明

まず $\psi\in C_c^\infty(\mathbb R^3)$ に対し、原点を半径 $\delta$ の球で除いて積分し、$\delta\downarrow0$ とします。
$\nabla\cdot(x/r^2)=1/r^2$（$r>0$）なので、積分の境界項は $O(\delta)$ で消え、

$$
\operatorname{Re}\int\overline\psi\frac{x}{r^2}\cdot\nabla\psi\,dx
=\frac12\int\frac{x}{r^2}\cdot\nabla|\psi|^2dx
=-\frac12\int\frac{|\psi|^2}{r^2}dx.
$$

従って非負量を展開すると

$$
\begin{aligned}
0&\le\int\left|\nabla\psi+\frac{x}{2r^2}\psi\right|^2dx\\
&=\|\nabla\psi\|_2^2+\frac14\|\psi/r\|_2^2
+\operatorname{Re}\int\overline\psi\frac{x}{r^2}\cdot\nabla\psi\,dx\\
&=\|\nabla\psi\|_2^2-\frac14\|\psi/r\|_2^2.
\end{aligned}
$$

これは三次元 Hardy 不等式 $\|\psi/r\|_2\le2\|\nabla\psi\|_2$ です。$C_c^\infty$ の $H^1$ 稠密性で $H^1$ 全体へ延長できます。次に Fourier 変換で、任意の $\eta>0$、$t\ge0$ に対する
$t\le\eta t^2+1/(4\eta)$ を $t=|\xi|$ に適用すると

$$
\|\nabla\psi\|_2\le\eta\|\Delta\psi\|_2+\frac1{4\eta}\|\psi\|_2
\qquad(\psi\in H^2).
$$

実際、右辺の乗数は各 $\xi$ で $|\xi|$ 以上なので、Plancherel と三角不等式でこの評価を得ます。よって

$$
\left\|\frac\kappa r\psi\right\|_2
\le 2\kappa\eta\|\Delta\psi\|_2+\frac{\kappa}{2\eta}\|\psi\|_2.
$$

$H_0=-a\Delta$ に対する相対界は $2\kappa\eta/a$ で、$\eta$ は任意に小さく選べます。[MQ1 の相対界 $1$ 未満の対称摂動と本質的自己共役性](../MQ1/index.md#thm-mq1-relative-perturbation)を $H_0$ と $V=-\kappa/r$ に適用すると、$H_0+V$ は $H^2$ 上で自己共役であり、$\mathcal S$ 上の制限は本質的自己共役です（$H_0$ の Schwartz core は MQ1）。

最後に $H^2$ 上で部分積分を行い、Hardy 評価と Cauchy–Schwarz を使えば

$$
\begin{aligned}
\langle\psi,H\psi\rangle
&=a\|\nabla\psi\|_2^2-\kappa\int\frac{|\psi|^2}{r}dx\\
&\ge a\|\nabla\psi\|_2^2-2\kappa\|\psi\|_2\|\nabla\psi\|_2\\
&=a\left(\|\nabla\psi\|_2-\frac{\kappa}{a}\|\psi\|_2\right)^2
-\frac{\kappa^2}{a}\|\psi\|_2^2
\ge-\frac{\kappa^2}{a}\|\psi\|_2^2.
\end{aligned}
$$

従って $H$ は下に有界です。この下界はまだ最良とは限りません。$\square$
<!-- proof-end -->

**定義域の要点**：$H^2$ には「原点で波動関数を零にする」という条件はありません。実際、上の Gaussian は $\psi(0)=1$ であり $H^2$ に属します。後で現れる $u(0)=0$ は、動径変換 $u=rR$ の結果であって、三次元波動関数 $\psi(0)=0$ を要求するものではありません。

## 3. 回転対称性を同時固有値へ変える

$H$ は $r=|x|$ にのみ依存します。回転 $Q\in SO(3)$ に対する $(U_Q\psi)(x)=\psi(Q^{-1}x)$ は変数変換の Jacobian が $1$ なのでユニタリです。$\Delta(\psi\circ Q^{-1})=(\Delta\psi)\circ Q^{-1}$ かつ $|Q^{-1}x|=|x|$ であり、$H^2$ は回転で不変です。従って $HU_Q=U_QH$ が定義域上で成立し、レゾルベント・スペクトル射影も回転と可換です。

角運動量の大きさの二乗は、球面 Laplacian を使うと $\boldsymbol L^2=-\hbar^2\Delta_{S^2}$、$z$ 成分は $L_z=-i\hbar\partial_\phi$ と表せます。[PDE11 の球面調和関数](../PDE11/index.md#prop-pde11-spherical-eigenmode)は、両方の角度演算子を同時に対角化します。

<a id="def-mq4-angular-momentum"></a>
<!-- formal-statement-start -->
> **定義（角運動量と量子数）**  
> $L^2(S^2,d\Omega)$ において、正規化した球面調和関数 $Y_\ell^m$（$\ell\in\mathbb N_0$、$-\ell\le m\le\ell$）を基底とする対角作用素
>
$$
\boldsymbol L^2Y_\ell^m=\hbar^2\ell(\ell+1)Y_\ell^m,
\qquad L_zY_\ell^m=\hbar mY_\ell^m
$$
>
> を考える。それぞれの自然な最大対角定義域上で自己共役であり、同じ基底を持つため強可換である。$\ell$ を軌道量子数、$m$ を磁気量子数という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mq4-angular-momentum -->
**定義の確認**：$Y_0^0=1/\sqrt{4\pi}$ は球面上で $\int|Y_0^0|^2d\Omega=1$、$\Delta_{S^2}Y_0^0=\partial_\phi Y_0^0=0$ なので $\ell=m=0$ の同時固有関数です。$Y_1^0=\sqrt{3/(4\pi)}\cos\theta$ では
$\Delta_{S^2}\cos\theta=(\sin\theta)^{-1}\partial_\theta(-\sin^2\theta)=-2\cos\theta$
ですから、$\boldsymbol L^2Y_1^0=2\hbar^2Y_1^0$、$L_zY_1^0=0$ です。
<!-- definition-example-end -->

同時対角化の意味は単に微分式が交換すること以上です。球面調和関数を共通固有基底とする二つの実対角作用素では、固有射影は「同じ係数列の成分を残す」射影です。従って**スペクトル射影どうしも交換する**、という強可換性まで確認できます。

## 4. Hilbert 空間の部分波分解と原点条件

球座標の体積要素は $dx=r^2dr\,d\Omega$ です。波動関数を角度ごとに展開し、その係数に $r$ を掛ければ、重み $r^2$ を消した一次元 $L^2$ の問題になります。

<a id="def-mq4-partial-wave"></a>
<!-- formal-statement-start -->
> **定義（部分波変換）**  
> $\psi\in L^2(\mathbb R^3)$ に対し、
>
$$
(U\psi)_{\ell m}(r)=u_{\ell m}(r)
:=r\int_{S^2}\overline{Y_\ell^m(\omega)}\psi(r\omega)\,d\Omega,
\quad r>0
$$
>
> とする。$U$ の値域を
> $\bigoplus_{\ell=0}^\infty\bigoplus_{m=-\ell}^{\ell}L^2((0,\infty),dr)$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mq4-partial-wave -->
**定義の確認**：$\psi(r,\omega)=e^{-r}Y_0^0(\omega)$ と置くと、球面の正規直交性から $u_{00}(r)=re^{-r}$、他の全係数は零です。従って
$\|\psi\|_{L^2(\mathbb R^3)}^2=\int_0^\infty r^2e^{-2r}dr =\|u_{00}\|_{L^2(dr)}^2$ です。部分積分で $\int_0^\infty r^2e^{-2r}dr=2!/2^3=1/4$ と検算できます。
<!-- definition-example-end -->

<a id="thm-mq4-partial-wave"></a>
<!-- formal-statement-start -->
> **定理（部分波分解と動径 Schrödinger 作用素）**  
> 上の $U$ はユニタリである。$H=-a\Delta-\kappa/r$ は角運動量と強可換で、$UHU^{-1}$ は $(\ell,m)$ 成分ごとの自己共役な直和となる。各成分の微分表示は
>
$$
h_\ell u=-a u''+\frac{a\ell(\ell+1)}{r^2}u-\frac{\kappa}{r}u,\qquad r>0.
$$
>
> 各 $h_\ell$ の実現は三次元 $H^2$ 上の $H$ から誘導されるものであり、任意の境界条件を別途選んだ作用素を意味しない。特に $\ell=0$ の動径関数は $u(0)=0$ の正則な枝に属する。
<!-- formal-statement-end -->

### 証明の見取り図

ユニタリ性では **球面の完全性と $r^2dr$ の Jacobian** を両方使います。微分表示では $R=u/r$ の二回微分を省略しません。原点の枝は三次元の定義域によって選ばれます。

<!-- proof-start -->
### 証明

[PDE11 の固有関数](../PDE11/index.md#prop-pde11-spherical-eigenmode)を $L^2(S^2)$ の完全正規直交系として使います。完全性は、球面上の多項式の制限が連続関数に一様稠密であり、各多項式を球面調和多項式の有限和に分解できることからも分かります。後者は同次多項式 $p_k$ に対し
$\Delta(r^2q_j)=2(2j+3)q_j+r^2\Delta q_j$（$q_j$ は次数 $j$）を使って次数を下げる帰納法で従います。各次数 $\ell$ の調和多項式の球面制限は $2\ell+1$ 次元で、PDE11 の $Y_\ell^m$ が張ります。

Fubini–Tonelli と球面 Parseval によって

$$
\begin{aligned}
\|\psi\|_2^2
&=\int_0^\infty r^2\int_{S^2}|\psi(r\omega)|^2d\Omega\,dr\\
&=\int_0^\infty\sum_{\ell,m}
\left|r\int_{S^2}\overline{Y_\ell^m}\psi(r\omega)d\Omega\right|^2dr\\
&=\sum_{\ell,m}\|u_{\ell m}\|_{L^2(dr)}^2.
\end{aligned}
$$

逆写像は $\psi(r,\omega)=r^{-1}\sum_{\ell,m}u_{\ell m}(r)Y_\ell^m(\omega)$ で、部分和が $L^2(\mathbb R^3)$ で収束します。任意の平方可算な係数列からこの逆写像を作れるので全射です。

次に $\psi(r,\omega)=R(r)Y_\ell^m(\omega)$ と置きます。[VC6 の球座標 Laplacian](../VC6/index.md#prop-vc6-spherical)により

$$
\Delta\psi=\left(R''+\frac2rR'-\frac{\ell(\ell+1)}{r^2}R\right)Y_\ell^m.
$$

$R=u/r$ について

$$
R'=\frac{u'}r-\frac{u}{r^2},\qquad
R''=\frac{u''}r-\frac{2u'}{r^2}+\frac{2u}{r^3},
\qquad R''+\frac2rR'=\frac{u''}r
$$

です。従って $rH(RY_\ell^m)=(h_\ell u)Y_\ell^m$ が得られます。最初は原点を避けた滑らかな有限モードで計算し、回転不変性と自己共役 $H$ のスペクトル射影が各角モードを保つことから、各閉部分空間への制限は自己共役です。これが上記の動径作用素の定義域を確定します。

原点の条件を明確にします。$\ell=0$ で $u(0)\ne0$ の滑らかな枝を許すと、$R(r)=u(r)/r$ は $r^{-1}$ 型です。これは $L^2$ には局所的に入りますが、$\int_{|x|<\delta}|\nabla R|^2dx$ は $\int_0^\delta r^{-2}dr$ として発散し、$H^1$ に入りません。従って $D(H)=H^2\subset H^1$ では排除され、$u(0)=0$ が必要です。$\ell\ge1$ では動径方程式の原点近傍の指数は $r^{\ell+1}$ と $r^{-\ell}$ です。後者は $\int_0^\delta r^{-2\ell}dr=\infty$ で $L^2(dr)$ にさえ入らないため、正則な枝だけが残ります。厳密には $\ell\ge1$ の全作用素定義域を $u(0)=0$ だけで定義するわけではなく、元の三次元作用素から誘導することが重要です。$\square$
<!-- proof-end -->

**分解の核となる式**は $u=rR$ と
$\|\psi\|^2=\sum_{\ell,m}\|u_{\ell m}\|^2$ です。角度方向のラベル $(\ell,m)$ は残りますが、半径方向の問題は一次元になりました。

## 5. 動径作用素の因数分解で負の全スペクトルを確定する

$\beta=\kappa/(2a)$ として $h_\ell/a$ を書き直すと

$$
k_\ell=\frac{h_\ell}{a}
=-\frac{d^2}{dr^2}+\frac{\ell(\ell+1)}{r^2}-\frac{2\beta}{r}.
$$

調和振動子の ladder は同じ角モードの中で励起を上げました。Coulomb 系では、**隣の $\ell$ の動径作用素**をつなぐ因数分解が使えます。原点で正則で無限遠で減衰する最低モードから出発し、負の固有値候補が尽きることまで示します。

<a id="prop-mq4-factorization"></a>
<!-- formal-statement-start -->
> **命題（Coulomb 動径作用素の因数分解）**  
> $\ell\in\mathbb N_0$、$\beta>0$ とし、滑らかな原点正則・無限遠減衰関数の共通領域で
>
$$
A_\ell=\frac d{dr}-\frac{\ell+1}{r}+\frac{\beta}{\ell+1},\quad
A_\ell^\dagger=-\frac d{dr}-\frac{\ell+1}{r}+\frac{\beta}{\ell+1}
$$
>
> と置く。このとき
>
$$
k_\ell=A_\ell^\dagger A_\ell-\frac{\beta^2}{(\ell+1)^2},
\quad
k_{\ell+1}=A_\ell A_\ell^\dagger-\frac{\beta^2}{(\ell+1)^2},
\quad A_\ell k_\ell=k_{\ell+1}A_\ell.
$$
>
> 特に $h_\ell\ge-a\beta^2/(\ell+1)^2$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$W_\ell=-(\ell+1)/r+\beta/(\ell+1)$ と置きます。
$A_\ell=D+W_\ell$、$A_\ell^\dagger=-D+W_\ell$ は境界項が消える関数上で随伴です。積を**関数 $f$ に作用させて**展開すると

$$
\begin{aligned}
A_\ell^\dagger A_\ell f
&=(-D+W_\ell)(f'+W_\ell f)
=-f''-W_\ell'f-W_\ell f'+W_\ell f'+W_\ell^2f\\
&=-f''+(W_\ell^2-W_\ell')f,\\
A_\ell A_\ell^\dagger f
&=(D+W_\ell)(-f'+W_\ell f)
=-f''+(W_\ell^2+W_\ell')f.
\end{aligned}
$$

ここで

$$
W_\ell'=\frac{\ell+1}{r^2},
\quad W_\ell^2=\frac{(\ell+1)^2}{r^2}-\frac{2\beta}{r}
+\frac{\beta^2}{(\ell+1)^2}.
$$

従って $W_\ell^2-W_\ell'=\ell(\ell+1)/r^2-2\beta/r+\beta^2/(\ell+1)^2$、
$W_\ell^2+W_\ell'=(\ell+1)(\ell+2)/r^2-2\beta/r+\beta^2/(\ell+1)^2$ です。二つの積の差から示した恒等式と、積の結合則 $A_\ell(A_\ell^\dagger A_\ell)=(A_\ell A_\ell^\dagger)A_\ell$ による絡み合いを得ます。

原点正則な $H^2$ 固有関数について境界積分は $0$ です。たとえば $f(r)=O(r^{\ell+1})$ では $W_\ell f=O(r^\ell)$ となり、$r\downarrow0$ の境界積は零に収束します。無限遠では負の固有値に属する固有関数は減衰するため同様です。積の等式を二次形式として閉包へ延長すれば
$\langle f,k_\ell f\rangle=\|A_\ell f\|^2-\beta^2\|f\|^2/(\ell+1)^2$ で、下界が従います。$\square$
<!-- proof-end -->

<a id="thm-mq4-hydrogen-spectrum"></a>
<!-- formal-statement-start -->
> **定理（水素様原子の全スペクトルと量子数）**  
> $H=-\hbar^2\Delta/(2\mu)-\kappa/r$（$\mu,\kappa,\hbar>0$）を $D(H)=H^2(\mathbb R^3)$ 上で考える。$E_n=-\mu\kappa^2/(2\hbar^2n^2)$（$n=1,2,\ldots$）と置くと
>
$$
\sigma(H)=\{E_n:n\in\mathbb N\}\cup[0,\infty),
\qquad \sigma_{\rm ess}(H)=[0,\infty).
$$
>
> 負の固有値 $E_n$ に対し
> $0\le\ell\le n-1$、$-\ell\le m\le\ell$ の三つの量子数 $(n,\ell,m)$ を持つ正規直交固有状態が存在する。$E_n$ の重複度は $\sum_{\ell=0}^{n-1}(2\ell+1)=n^2$ である。$\kappa=Ze^2/(4\pi\varepsilon_0)$ を代入すると
>
$$
E_n=-\frac{\mu Z^2e^4}
{2(4\pi\varepsilon_0)^2\hbar^2 n^2}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

まず $A_\ell u=0$ から各角運動量で最低エネルギーを作ります。$A_\ell^\dagger$ により上の角運動量から下の角運動量へ降り、全ての $E_n$ を作ります。逆向きには、任意の負の固有値が存在すれば $A_\ell$ を繰り返して $\ell$ を上げられるはずですが、下界 $-a\beta^2/(\ell+1)^2\to0$ と矛盾する時点で必ず最低モードに到達します。最後に本質スペクトルを別途決めることで、**列挙できた固有値以外の負の連続スペクトル**を排除します。

<!-- proof-start -->
### 証明

**(1) 最低モード。** $A_\ell u=0$ は
$u'-(\ell+1)u/r+\beta u/(\ell+1)=0$ です。$r^{-(\ell+1)}u$ を $v$ とすると

$$
v'=\left(r^{-(\ell+1)}u\right)'
=-\frac{\beta}{\ell+1}v,
\quad v=Ce^{-\beta r/(\ell+1)},
\quad u_\ell^{(0)}=Cr^{\ell+1}e^{-\beta r/(\ell+1)}.
$$

これは原点で正則で、$\int_0^\infty|u_\ell^{(0)}|^2dr<\infty$ です。例えば整数 $j\ge0$ の積分公式
$\int_0^\infty r^j e^{-cr}dr=j!/c^{j+1}$（$c>0$）を $j=2\ell+2$ に適用すれば有限です。微分して作用させると
$k_\ell u_\ell^{(0)}=-\beta^2u_\ell^{(0)}/(\ell+1)^2$ であり、三次元の正則性は $r^\ell Y_\ell^m$ が [PDE11](../PDE11/index.md#prop-pde11-solid-harmonic) の滑らかな同次多項式に延長されることから確認できます。その $H^2$ 条件を積の微分で確かめます。$c=\beta/(\ell+1)>0$ とすると、$r>0$ で

$$
\partial_i e^{-cr}=-ce^{-cr}\frac{x_i}{r}, \quad \partial_i\partial_j e^{-cr} =e^{-cr}\left[c^2\frac{x_ix_j}{r^2} -c\left(\frac{\delta_{ij}}r-\frac{x_ix_j}{r^3}\right)\right].
$$

二階偏導関数は原点付近で $O(1+r^{-1})$ なので、
$\int_{r<\delta}(1+r^{-1})^2dx =4\pi\int_0^\delta(r^2+2r+1)dr<\infty$ です。原点を除いて積分した式の境界項も表面積が $O(\delta^2)$ なので消えます。$r^\ell Y_\ell^m$ は滑らかな同次多項式であり、積の二階導関数は局所的に二乗可積分、無限遠では指数減衰します。従って得られた三次元固有状態は $H^2=D(H)$ に属します。

**(2) 全負固有値の構成。** $n>\ell+1$ では、$k_{\ell+1}$ の固有値
$\lambda=-\beta^2/n^2$ を持つ正則関数 $v$ に
$A_\ell^\dagger$ を適用します。絡み合い式の随伴版から
$k_\ell A_\ell^\dagger v=A_\ell^\dagger k_{\ell+1}v=\lambda A_\ell^\dagger v$ です。また

$$
\|A_\ell^\dagger v\|^2
=\langle v,A_\ell A_\ell^\dagger v\rangle
=\left(\lambda+\frac{\beta^2}{(\ell+1)^2}\right)\|v\|^2
=\beta^2\left(\frac1{(\ell+1)^2}-\frac1{n^2}\right)\|v\|^2>0.
$$

従って $A_\ell^\dagger v$ は非零です。出発点として角モード $n-1$ の $u_{n-1}^{(0)}$ を取り、$A_{n-2}^\dagger,A_{n-3}^\dagger,\ldots,A_\ell^\dagger$ を順に作用させます。どの段階でも係数が正なので消えず、$n\ge\ell+1$ の全てで
$\lambda_n=-\beta^2/n^2$ を実現します。各段階での原点正則性と無限遠減衰は上記微分表示から保たれます。

**(3) ほかの負固有値がない。** $k_\ell u=\lambda u$、$\lambda<0$、$u\ne0$ とします。因数分解から
$\|A_\ell u\|^2=(\lambda+\beta^2/(\ell+1)^2)\|u\|^2$ です。
$\lambda=-\beta^2/(\ell+1)^2$ なら $A_\ell u=0$ となり、(1) の解の一意性から最低モードだけです。そうでなければ $A_\ell u\ne0$ は $k_{\ell+1}$ の同じ固有値を持ちます。繰り返せる場合、任意に大きい $j$ で
$\lambda\ge-\beta^2/(j+1)^2$ が必要ですが、右辺は $0$ へ近づくので、固定した $\lambda<0$ と矛盾します。従ってある $j\ge\ell$ で $A_j$ の核に達し、$\lambda=-\beta^2/(j+1)^2$ です。$n=j+1$ とすれば $n\ge\ell+1$ が必要と分かります。

負固有値の各 $(\ell,m)$ 成分は一次元です。実際、最低モードの一次元性は一次 ODE $A_j u=0$ から、そこへ至るまでの各 $A_i$ の写像は $\lambda\ne-\beta^2/(i+1)^2$ で核を持たず、逆向きの $A_i^\dagger$ がその固有空間を復元するためです。

**(4) 負の連続スペクトルを排除。** $H_0=-a\Delta$ の本質スペクトルは [MQ1 の自由 Hamiltonian](../MQ1/index.md#thm-mq1-free-spectrum) より $[0,\infty)$ です。
$V(H_0+1)^{-1}$ がコンパクトであることを確かめます。$H_0+1$ の逆作用素は $L^2$ から $H^2$ へ有界です。三次元で
$\|f\|_\infty\le C\|f\|_{H^2}$ は
$\int_{\mathbb R^3}(1+|\xi|^2)^{-2}d\xi<\infty$ と Fourier 反転・Cauchy–Schwarz から従います。原点近くでは

$$
\|1_{\{r<\delta\}}f/r\|_2
\le\|f\|_\infty\left(4\pi\int_0^\delta dr\right)^{1/2}
\le C\sqrt{4\pi\delta}\,\|f\|_{H^2}.
$$

遠方では $\|1_{\{r>R\}}f/r\|_2\le R^{-1}\|f\|_2$ です。中間の環状領域 $\delta\le r\le R$ で必要な局所的なコンパクト性も確かめます。環状領域を含む固定した立方体を一辺 $h$ の小立方体 $Q$ に有限分割し、各 $Q$ で $f$ を平均値 $f_Q$ に置き換えます。線分上で $f(x)-f(y)=\int_0^1\nabla f(y+t(x-y))\cdot(x-y)dt$ と書き、Cauchy–Schwarz と積分を用いると

$$
\sum_Q\int_Q|f-f_Q|^2dx\le Ch^2\int|\nabla f|^2dx
$$

を得ます（最初は滑らかな $f$ で示し、$H^1$ へ密度で延長）。$H^2$ 有界列に対して右辺は $h\downarrow0$ で一様に零です。一方、固定した $h$ の平均値近似は有限次元空間に属し、有界列から収束部分列を取れます。$h=1,1/2,\ldots$ の対角部分列を選べば、元の列も環状領域上の $L^2$ で収束部分列を持ちます。さらに $1/r\le1/\delta$ はそこで有界なので、$f\mapsto1_{\{\delta\le r\le R\}}f/r$ は $H^2\to L^2$ コンパクトです。$\delta\downarrow0$、$R\uparrow\infty$ として $V:H^2\to L^2$ はコンパクト作用素の作用素ノルム極限です。従って $V(H_0+1)^{-1}$ はコンパクトです。

この相対コンパクト性が本質スペクトルを変えないことも、ここで確認します。自己共役作用素 $T$ の実数 $\lambda$ が本質スペクトルに属する必要十分条件は、$\|f_j\|=1$、$f_j\rightharpoonup0$、$\|(T-\lambda)f_j\|\to0$ を満たす $f_j\in D(T)$ が存在することです（**Weyl 列の判定**）。必要性は $\lambda$ の幅 $1/j$ のスペクトル射影の像が無限次元であることから、互いに直交する単位元を選べば従います。十分性は、$\lambda$ が孤立した有限重複固有値ならその固有空間の直交補上で $\|(T-\lambda)f\|\ge c\|f\|$ となり、弱収束零の単位列に矛盾することから従います。

$\lambda\in\sigma_{\rm ess}(H_0)$ の Weyl 列 $f_j$ では、$(H_0+1)f_j=(\lambda+1)f_j+o(1)\rightharpoonup0$ です。$V(H_0+1)^{-1}$ はコンパクトなので
$Vf_j=V(H_0+1)^{-1}(H_0+1)f_j\to0$ となり、
$(H-\lambda)f_j=(H_0-\lambda)f_j+Vf_j\to0$。
従って $\sigma_{\rm ess}(H_0)\subset\sigma_{\rm ess}(H)$ です。

逆方向では、$V(H+ i)^{-1}$ もコンパクトです。実際、$H_0+1$ の逆作用素に替えて非実数 $i$ を取っても上の局所・遠方評価は変わらず、[レゾルベント恒等式](../FA5/index.md#thm-fa5-resolvent-identity)により

$$
V(H-i)^{-1} =V(H_0-i)^{-1}\bigl[I-V(H-i)^{-1}\bigr]
$$

です。右側の角括弧は有界です（$V$ は $H$ のグラフノルムから $L^2$ へ有界）。左側第一因子がコンパクトだから積はコンパクトです。$H$ の Weyl 列 $g_j$ に対して $(H-i)g_j=(\lambda-i)g_j+o(1)\rightharpoonup0$ なので $Vg_j\to0$、従って $(H_0-\lambda)g_j\to0$ です。これで逆包含も示され、
$\sigma_{\rm ess}(H)=\sigma_{\rm ess}(H_0)=[0,\infty)$ が確定します。従って $(-\infty,0)$ のスペクトル点は有限重複度の孤立固有値のみで、(3) がそれらを全列挙しています。

**(5) 重複度。** $\ell=0,\ldots,n-1$ ごとに $m=-\ell,\ldots,\ell$ の $2\ell+1$ 個の角モードがあり、球面調和関数の直交性により互いに直交します。各動径固有空間は一次元なので
$\dim\ker(H-E_n)=\sum_{\ell=0}^{n-1}(2\ell+1)=n^2$ です。
最後に $E_n=a(-\beta^2/n^2)$ に
$a=\hbar^2/(2\mu)$、$\beta=\mu\kappa/\hbar^2$ を代入すると

$$
E_n=-\frac{\hbar^2}{2\mu}\frac{\mu^2\kappa^2}{\hbar^4n^2}
=-\frac{\mu\kappa^2}{2\hbar^2n^2}
=-\frac{\mu Z^2e^4}{2(4\pi\varepsilon_0)^2\hbar^2n^2}.
$$

これで全スペクトルを確定しました。$\square$
<!-- proof-end -->

上で必要とした局所コンパクト性は、小立方体での平均値近似と有限次元性から証明しました。また、本質スペクトルが摂動で変わらないことは Weyl 列を両方向に移す議論で確認しました。散乱状態を具体的に解くことは本章の射程外ですが、連続部分 $[0,\infty)$ を「存在しない」として捨てることはできません。

## 6. 動径微分方程式と Laguerre 多項式

因数分解で得た準位の波動関数を、量子数で明示します。束縛状態のエネルギー $E<0$ について
$\alpha=\sqrt{-E/a}>0$ と置き、$u(r)=r^{\ell+1}e^{-\alpha r}v(\rho)$、$\rho=2\alpha r$ とします。元の動径方程式は

$$
u''+\left(-\alpha^2+\frac{2\beta}{r}
-\frac{\ell(\ell+1)}{r^2}\right)u=0.
$$

積の微分を具体的に追います。$g=r^{\ell+1}e^{-\alpha r}$ とすると

$$
\frac{g'}g=\frac{\ell+1}{r}-\alpha,\qquad
\frac{g''}g=\frac{\ell(\ell+1)}{r^2}
-\frac{2\alpha(\ell+1)}r+\alpha^2.
$$

従って $u'=g'v+2\alpha gv_\rho$ と
$u''=g''v+4\alpha g'v_\rho+4\alpha^2gv_{\rho\rho}$ を代入して、$g$ で割ると

$$
4\alpha^2v_{\rho\rho}
+4\alpha\left(\frac{\ell+1}{r}-\alpha\right)v_\rho
+\frac{2(\beta-\alpha(\ell+1))}{r}v=0.
$$

$r=\rho/(2\alpha)$ を入れ、$\rho/(4\alpha^2)$ 倍すると

$$
\rho v_{\rho\rho}+(2\ell+2-\rho)v_\rho
+\left(\frac{\beta}{\alpha}-\ell-1\right)v=0.
$$

$E=E_n$ なら $\alpha=\beta/n$、$j=n-\ell-1\in\mathbb N_0$ で、これは一般化 Laguerre 方程式
$\rho v''+(2\ell+2-\rho)v'+jv=0$ です。$v=\sum_{k\ge0}c_k\rho^k$ を入れると

$$
(k+1)(k+2\ell+2)c_{k+1}+(j-k)c_k=0,\qquad
c_{k+1}=\frac{k-j}{(k+1)(k+2\ell+2)}c_k.
$$

$k=j$ で $c_{j+1}=0$ となり次数 $j$ の多項式が得られます。これを $L_j^{2\ell+1}$ と規格化します。よって

$$
\Psi_{n\ell m}(r,\omega)
=R_{n\ell}(r)Y_\ell^m(\omega),\quad
R_{n\ell}(r)=N_{n\ell}\rho^\ell e^{-\rho/2}L_{n-\ell-1}^{2\ell+1}(\rho),
\quad \rho=\frac{2\beta r}{n}.
$$

球面上で $\|Y_\ell^m\|_2=1$ とし、動径積分に
$\int_0^\infty e^{-\rho}\rho^{2\ell+2}[L_j^{2\ell+1}(\rho)]^2d\rho =2n(n+\ell)!/(n-\ell-1)!$
を使えば

$$
N_{n\ell}
=\left(\frac{2\beta}{n}\right)^{3/2}
\sqrt{\frac{(n-\ell-1)!}{2n(n+\ell)!}}.
$$

積分公式の係数も検算しておきます。$\alpha_0=2\ell+1$、$j=n-\ell-1$ とし、

$$
L_j^{\alpha_0}(\rho)=\frac{e^\rho\rho^{-\alpha_0}}{j!} \frac{d^j}{d\rho^j}\bigl(e^{-\rho}\rho^{j+\alpha_0}\bigr)
$$

を用います。これを $\int_0^\infty e^{-\rho}\rho^{\alpha_0}(L_j^{\alpha_0})^2d\rho$ に代入し、$j$ 回部分積分します。境界項は $e^{-\rho}$ の減衰と $\alpha_0>0$ から零で、$L_j^{\alpha_0}$ の最高次係数は $(-1)^j/j!$ だから $d^jL_j^{\alpha_0}/d\rho^j=(-1)^j$ です。従って

$$
\int_0^\infty e^{-\rho}\rho^{\alpha_0}(L_j^{\alpha_0})^2d\rho =\frac1{j!}\int_0^\infty e^{-\rho}\rho^{j+\alpha_0}d\rho =\frac{\Gamma(j+\alpha_0+1)}{j!}.
$$

同じ積分操作で $j$ の異なる多項式が直交することを確かめ、係数漸化式から得られる三項漸化式
$\rho L_j^{\alpha_0}=-(j+1)L_{j+1}^{\alpha_0} +(2j+\alpha_0+1)L_j^{\alpha_0}-(j+\alpha_0)L_{j-1}^{\alpha_0}$
を掛け合わせて積分すると、交差項は零なので

$$
\int_0^\infty e^{-\rho}\rho^{\alpha_0+1}(L_j^{\alpha_0})^2d\rho =(2j+\alpha_0+1)\frac{\Gamma(j+\alpha_0+1)}{j!} =\frac{2n(n+\ell)!}{(n-\ell-1)!}.
$$

重要なのは、**多項式の打ち切りだけから全スペクトルを宣言していない**ことです。負のスペクトルの完全な列挙は前節の因数分解と本質スペクトルの議論で先に証明しました。

### 一番低い状態を直接検算する

$n=1,\ell=m=0$ では $L_0^1=1$、
$R_{10}(r)=2\beta^{3/2}e^{-\beta r}$、
$Y_0^0=1/\sqrt{4\pi}$ なので

$$
\Psi_{100}(x)=\left(\frac{\beta^3}{\pi}\right)^{1/2}e^{-\beta r}.
$$

$|\nabla r|=1$、$\Delta e^{-\beta r}=(\beta^2-2\beta/r)e^{-\beta r}$（$r>0$）を使うと

$$
H\Psi_{100}
=\left[-a\beta^2+\frac{2a\beta-\kappa}{r}\right]\Psi_{100}
=-a\beta^2\Psi_{100}=E_1\Psi_{100}.
$$

$2a\beta=\kappa$ を**ここで**使いました。規格化も

$$
\|\Psi_{100}\|_2^2
=\frac{\beta^3}{\pi}\,4\pi\int_0^\infty r^2e^{-2\beta r}dr
=4\beta^3\frac{2}{(2\beta)^3}=1
$$

です。原点で $\Psi_{100}(0)\ne0$ であるにもかかわらず、$u_{00}(r)=rR_{10}(r)$ は $u_{00}(0)=0$ です。

## 7. 何を観測するのか：束縛・縮退・連続スペクトル

$E_1<E_2<\cdots<0$ は離散束縛準位で、$E_n\uparrow0$ です。同じ $n$ に $n^2$ 個の空間状態が属するのは、回転対称性と Coulomb ポテンシャル特有の縮退の結果です。ここで数えているのは**スピンを含まない空間 Hilbert 空間**の重複度です。

自己共役性を得たので [QM7 の Stone の定理](../QM7/index.md#thm-qm7-stone)から時間発展 $e^{-itH/\hbar}$ が定まります。たとえば正規化固有状態二つの重ね合わせに対し

$$
\Psi(0)=\frac{\Psi_{100}+\Psi_{200}}{\sqrt2}
\quad\Longrightarrow\quad
\Psi(t)=\frac{e^{-itE_1/\hbar}\Psi_{100}
+e^{-itE_2/\hbar}\Psi_{200}}{\sqrt2}.
$$

それぞれのエネルギーを測る確率は $1/2$ で時間に依存しません。一方、$[0,\infty)$ は本質スペクトルであって、$E>0$ の各値を正規化可能な固有状態として同列に並べてはいけません。散乱理論を構成しなくても、この区別は [QM6 の非有界自己共役作用素のスペクトル表示](../QM6/index.md#thm-qm6-unbounded-self-adjoint-spectral)に基づくものです。

## 8. 演習

### Level A

### A1. 換算質量と長さ尺度

$m_e,m_N>0$ とする。$M=m_e+m_N$、$R=(m_ex_e+m_Nx_N)/M$、$r=x_e-x_N$ から二つの速度を $\dot R,\dot r$ で表し、運動エネルギーが $M|\dot R|^2/2+\mu|\dot r|^2/2$ になることを示せ。$\mu=m_em_N/M$。さらに $\kappa>0$ のとき $a_Z=\hbar^2/(\mu\kappa)$ の次元を確認せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$x_e=R+(m_N/M)r$、$x_N=R-(m_e/M)r$ なので、それぞれ時間微分し

$$
\begin{aligned}
2T&=m_e|\dot R+(m_N/M)\dot r|^2+m_N|\dot R-(m_e/M)\dot r|^2\\
&=(m_e+m_N)|\dot R|^2
+2\left(\frac{m_em_N}{M}-\frac{m_Nm_e}{M}\right)\dot R\cdot\dot r\\
&\quad+\frac{m_em_N^2+m_Nm_e^2}{M^2}|\dot r|^2
=M|\dot R|^2+\frac{m_em_N}{M}|\dot r|^2.
\end{aligned}
$$

$\hbar$ の次元はエネルギー・時間 $ML^2T^{-1}$、$\kappa/r$ はエネルギーなので $[\kappa]=ML^3T^{-2}$ です。従って $[\hbar^2/(\mu\kappa)]=(M^2L^4T^{-2})/(M^2L^3T^{-2})=L$ です。
<!-- solution-end -->

### A2. 最低の球面モード

$Y_0^0=1/\sqrt{4\pi}$、$Y_1^0=\sqrt{3/(4\pi)}\cos\theta$ について、球面 Laplacian と $L_z=-i\hbar\partial_\phi$ の固有値を求めよ。特に $\|Y_1^0\|_{L^2(S^2)}=1$ を積分で確認せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$Y_0^0$ は定数なので $\Delta_{S^2}Y_0^0=L_zY_0^0=0$。$\partial_\theta\cos\theta=-\sin\theta$ から

$$
\Delta_{S^2}\cos\theta
=\frac1{\sin\theta}\partial_\theta(-\sin^2\theta)
=-2\cos\theta.
$$

どちらも $\phi$ に依存しないので $L_zY_1^0=0$、$\boldsymbol L^2Y_1^0=2\hbar^2Y_1^0$。規格化は

$$
\int_{S^2}|Y_1^0|^2d\Omega
=\frac3{4\pi}2\pi\int_0^\pi\cos^2\theta\sin\theta\,d\theta
=\frac32\int_{-1}^{1}s^2ds
=\frac32\cdot\frac23=1.
$$
<!-- solution-end -->

### A3. 動径変換で消える一階微分

$\psi(r,\omega)=R(r)Y_\ell^m(\omega)$ とし $u=rR$ と置け。$\|\psi\|_2=\|u\|_{L^2(dr)}$ を確認し、$\Delta\psi$ から $h_\ell$ を得よ（球面調和関数は規格化済みとする）。

- Level: A

<!-- solution-start -->
#### 詳細解答

球座標で $\|\psi\|_2^2=\int_0^\infty|R|^2r^2dr\int|Y_\ell^m|^2d\Omega =\int_0^\infty|rR|^2dr$。$R=u/r$ の導関数は

$$
R'=\frac{u'}r-\frac u{r^2},\quad
R''=\frac{u''}r-\frac{2u'}{r^2}+\frac{2u}{r^3}.
$$

従って $R''+2R'/r=u''/r$。$\Delta_{S^2}Y_\ell^m=-\ell(\ell+1)Y_\ell^m$ を用い

$$
rH(RY_\ell^m)
=\left[-au''+\frac{a\ell(\ell+1)}{r^2}u-\frac\kappa r u\right]Y_\ell^m.
$$

これが $L^2(dr)$ 上の動径微分表示です。
<!-- solution-end -->

### A4. Hardy 不等式の係数

滑らかでコンパクト台の $\psi$ に対し
$\operatorname{Re}\int\overline\psi(x/r^2)\cdot\nabla\psi\,dx =-\frac12\|\psi/r\|_2^2$ を用い、
$\|\psi/r\|_2\le2\|\nabla\psi\|_2$ を証明せよ。また $H=-a\Delta-\kappa/r$ の形式が下に有界であることを示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

平方の非負性を展開すると

$$
0\le\left\|\nabla\psi+\frac{x}{2r^2}\psi\right\|_2^2
=\|\nabla\psi\|_2^2+\frac14\|\psi/r\|_2^2-\frac12\|\psi/r\|_2^2
=\|\nabla\psi\|_2^2-\frac14\|\psi/r\|_2^2.
$$

従って $\|\psi/r\|_2\le2\|\nabla\psi\|_2$。また Cauchy–Schwarz で
$\int|\psi|^2/r\le\|\psi/r\|_2\|\psi\|_2\le2\|\nabla\psi\|_2\|\psi\|_2$。よって

$$
q[\psi]\ge a\|\nabla\psi\|_2^2-2\kappa\|\nabla\psi\|_2\|\psi\|_2
=a\left(\|\nabla\psi\|_2-\frac{\kappa}{a}\|\psi\|_2\right)^2-\frac{\kappa^2}{a}\|\psi\|_2^2.
$$

これが下界です。最良値 $-a\beta^2$ をこの粗い評価だけから主張してはいけません。
<!-- solution-end -->

### Level B

### B1. 因数分解を導く

$\beta>0$、$W_\ell=-(\ell+1)/r+\beta/(\ell+1)$、
$A_\ell=D+W_\ell$ とし、$A_\ell^\dagger=-D+W_\ell$ とする。
$A_\ell^\dagger A_\ell$ と $A_\ell A_\ell^\dagger$ を展開し、
$k_\ell=A_\ell^\dagger A_\ell-\beta^2/(\ell+1)^2$、
$k_{\ell+1}=A_\ell A_\ell^\dagger-\beta^2/(\ell+1)^2$ を証明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

任意のコンパクト台の $f$ に作用させると

$$
\begin{aligned}
A_\ell^\dagger A_\ell f
&=(-D+W_\ell)(f'+W_\ell f)
=-f''-W_\ell'f-W_\ell f'+W_\ell f'+W_\ell^2f\\
&=-f''+(W_\ell^2-W_\ell')f,\\
A_\ell A_\ell^\dagger f
&=(D+W_\ell)(-f'+W_\ell f)
=-f''+(W_\ell^2+W_\ell')f.
\end{aligned}
$$

$W_\ell'=(\ell+1)/r^2$、
$W_\ell^2=(\ell+1)^2/r^2-2\beta/r+\beta^2/(\ell+1)^2$ なので、
$W_\ell^2-W_\ell'=\ell(\ell+1)/r^2-2\beta/r+\beta^2/(\ell+1)^2$、
$W_\ell^2+W_\ell'=(\ell+1)(\ell+2)/r^2-2\beta/r+\beta^2/(\ell+1)^2$ です。定数項を引けばそれぞれ $k_\ell,k_{\ell+1}$ になります。
<!-- solution-end -->

### B2. 基底状態の原点条件と規格化

$\beta>0$ とし、$A_0u=0$、$A_0=D-1/r+\beta$ の正則な解を求めよ。三次元の規格化球面調和関数 $Y_0^0=1/\sqrt{4\pi}$ と組み合わせた基底状態 $\Psi_{100}$ を規格化し、$H\Psi_{100}=E_1\Psi_{100}$ を直接検算せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$u'-u/r+\beta u=0$ を $r$ で割った未知関数 $v=u/r$ に書き換えると $v'+\beta v=0$。従って $u=Cr e^{-\beta r}$ で原点条件 $u(0)=0$ を満たします。動径規格化から

$$
1=\int_0^\infty|u|^2dr
=|C|^2\int_0^\infty r^2e^{-2\beta r}dr
=|C|^2\frac2{(2\beta)^3},
$$

ゆえに $C=2\beta^{3/2}$ を選べます。三次元では $\Psi_{100}=(u/r)Y_0^0=\beta^{3/2}e^{-\beta r}/\sqrt\pi$。
$\Delta e^{-\beta r}=(\beta^2-2\beta/r)e^{-\beta r}$ を使い

$$
H\Psi_{100}=\left(-a\beta^2+\frac{2a\beta-\kappa}{r}\right)\Psi_{100}
=-a\beta^2\Psi_{100}.
$$

$2a\beta=\kappa$ なので $E_1=-a\beta^2$ です。$\Psi_{100}(0)\ne0$ と $u(0)=0$ は矛盾しません。
<!-- solution-end -->

### B3. Laguerre の係数漸化式

$u=r^{\ell+1}e^{-\alpha r}v(2\alpha r)$（$\alpha>0$）を
$u''+(-\alpha^2+2\beta/r-\ell(\ell+1)/r^2)u=0$ に代入し、
$\rho v''+(2\ell+2-\rho)v'+(\beta/\alpha-\ell-1)v=0$ を導け。
$\beta/\alpha=n$、$j=n-\ell-1\ge0$ の整数の場合、次数 $j$ の多項式が得られることを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$g=r^{\ell+1}e^{-\alpha r}$ と置けば
$g'/g=(\ell+1)/r-\alpha$、
$g''/g=\ell(\ell+1)/r^2-2\alpha(\ell+1)/r+\alpha^2$。また
$u'=g'v+2\alpha gv'$、$u''=g''v+4\alpha g'v'+4\alpha^2gv''$。
元の式に代入して $g$ で割ると

$$
4\alpha^2v''+4\alpha\left(\frac{\ell+1}{r}-\alpha\right)v'
+\frac{2(\beta-\alpha(\ell+1))}{r}v=0.
$$

$\rho=2\alpha r$ として $\rho/(4\alpha^2)$ 倍し、
$\rho v''+(2\ell+2-\rho)v'+(n-\ell-1)v=0$ を得ます。
$v=\sum_{k\ge0}c_k\rho^k$ に代入すると

$$
(k+1)(k+2\ell+2)c_{k+1}+(j-k)c_k=0.
$$

$c_0\ne0$ から出発すると $k<j$ で分子 $k-j\ne0$、$k=j$ で $c_{j+1}=0$、以後は零なので次数ちょうど $j$ の多項式です。
<!-- solution-end -->

### B4. 縮退と時間発展

$E_n=-a\beta^2/n^2$ に対し、量子数が
$0\le\ell\le n-1$、$-\ell\le m\le\ell$ を満たすとする。
$n=3$ の組を全て列挙し、重複度を求めよ。
さらに互いに直交する正規化された $\Psi_{100}$、$\Psi_{200}$ を用いた
$\Psi(0)=(\Psi_{100}+\Psi_{200})/\sqrt2$ の時間発展とエネルギー期待値を求めよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$n=3$ では $(\ell,m)=(0,0)$ が1組、$(1,-1),(1,0),(1,1)$ が3組、
$(2,-2),(2,-1),(2,0),(2,1),(2,2)$ が5組で、合計 $1+3+5=9=3^2$。
Stone の定理に基づくユニタリ時間発展で

$$
\Psi(t)=\frac1{\sqrt2}\left(e^{-iE_1t/\hbar}\Psi_{100}
+e^{-iE_2t/\hbar}\Psi_{200}\right).
$$

直交性からノルムは1、エネルギーを測る確率は各 $1/2$ です。期待値は
$\langle H\rangle=(E_1+E_2)/2 =-a\beta^2(1+1/4)/2=-5a\beta^2/8$。
各位相の絶対値は1なので、確率と期待値は時間に依存しません。
<!-- solution-end -->

### Level C

### C1. 水素様原子のスペクトルを作用素論から閉じる

$\mu,\kappa,\hbar>0$、$a=\hbar^2/(2\mu)$、$\beta=\kappa/(2a)$ とし
$H=-a\Delta-\kappa/r$ を最初は $\mathcal S(\mathbb R^3)$ 上で考える。

1. Hardy 不等式と Fourier 乗数評価から $V=-\kappa/r$ の $-a\Delta$ に対する相対界が0であることを証明し、自己共役実現の定義域を書け。
2. 球面調和関数を用いたユニタリ分解と、各 $(\ell,m)$ の動径作用素を書け。$\ell=0$ の原点条件を三次元 $H^1$ と対比せよ。
3. $A_\ell$ の因数分解から負の固有値が $E_n=-a\beta^2/n^2$ のみであることを論証せよ。
4. 原点・中間の環状領域・遠方に分けたコンパクト性評価を用い、$\sigma_{\rm ess}(H)=[0,\infty)$ を示して**負の連続スペクトル**を排除せよ。
5. $n=2$ の全量子数と重複度を求め、最小エネルギー固有状態 $\Psi_{100}$ を規格化せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

(1) 三次元 Hardy の $\|\psi/r\|_2\le2\|\nabla\psi\|_2$ と、
$|\xi|\le\eta|\xi|^2+1/(4\eta)$ を Fourier 変換に適用した
$\|\nabla\psi\|_2\le\eta\|\Delta\psi\|_2+(4\eta)^{-1}\|\psi\|_2$ を順に使うと

$$
\|V\psi\|_2\le2\kappa\eta\|\Delta\psi\|_2+\frac{\kappa}{2\eta}\|\psi\|_2
=\frac{2\kappa\eta}{a}\|(-a\Delta)\psi\|_2+\frac{\kappa}{2\eta}\|\psi\|_2.
$$

$\eta\downarrow0$ で相対界が0となり、$H$ は $H^2(\mathbb R^3)$ 上で自己共役、Schwartz 制限は本質的自己共役です。

(2) $u_{\ell m}(r)=r\int\overline{Y_\ell^m(\omega)}\psi(r\omega)d\Omega$ と置くと、球面 Parseval と $dx=r^2drd\Omega$ から
$\|\psi\|_2^2=\sum_{\ell,m}\int_0^\infty|u_{\ell m}|^2dr$。
$R=u/r$ の二回微分は
$R''+2R'/r=u''/r$ です。従って
$h_\ell=-aD^2+a\ell(\ell+1)/r^2-\kappa/r$。
$\ell=0$ で $u(0)\ne0$ とすると $R\sim u(0)/r$、その勾配の二乗積分は
$\int_0^\delta r^{-2}dr=\infty$ で $H^1$ に入れません。
必要なのは $u(0)=0$ であり、$\psi(0)=0$ ではありません。

(3) $W_\ell=-(\ell+1)/r+\beta/(\ell+1)$ と置くと
$A_\ell^\dagger A_\ell=-D^2+\ell(\ell+1)/r^2-2\beta/r+\beta^2/(\ell+1)^2$、
$A_\ell A_\ell^\dagger=k_{\ell+1}+\beta^2/(\ell+1)^2$ です。
$A_\ell u=0$ から $u=r^{\ell+1}e^{-\beta r/(\ell+1)}$ と
$\lambda=-\beta^2/(\ell+1)^2$ を作れます。
$A_\ell^\dagger$ で $\ell+1$ の負固有状態を $\ell$ へ写すと、
ノルム二乗は $(\lambda+\beta^2/(\ell+1)^2)\|v\|^2$ で正なので、
$n\ge\ell+1$ に $\lambda_n=-\beta^2/n^2$ を得ます。
逆に $\lambda<0$ の任意の固有状態に $A_\ell$ を繰り返せば、
核に達しない限り $j\to\infty$ で
$\lambda\ge-\beta^2/(j+1)^2\to0$ となって矛盾します。
従って必ずどこかの核に達し、他の負固有値はありません。

(4) $(-a\Delta+1)^{-1}$ は $L^2\to H^2$ 有界です。
$H^2(\mathbb R^3)\hookrightarrow L^\infty$ により、
原点球 $r<\delta$ で
$\|\psi/r\|_2\le C\sqrt{4\pi\delta}\|\psi\|_{H^2}$。
$r>R$ で $\|\psi/r\|_2\le R^{-1}\|\psi\|_2$。
環状領域 $\delta\le r\le R$ では、本文の有限小立方体への平均値近似を使います。各立方体 $Q$ で
$\int_Q|f-f_Q|^2\le Ch^2\int_Q|\nabla f|^2$
となるため、$H^2$ 有界列は有限次元の平均値近似へ一様に近づき、収束部分列を持ちます。$1/r$ はこの領域で有界なので $\psi\mapsto\psi/r$ は $H^2\to L^2$ コンパクトです。
$\delta\downarrow0,R\uparrow\infty$ で
$V(-a\Delta+1)^{-1}$ はコンパクト作用素のノルム極限です。
次に本文の Weyl 列の判定を両方向へ適用します。自由作用素 $H_0=-a\Delta$ の Weyl 列 $f_j$ は
$(H_0-i)f_j=(\lambda-i)f_j+o(1)$ と弱収束零を満たすので、コンパクトな $V(H_0-i)^{-1}$ により $Vf_j\to0$、従って $H$ の Weyl 列でもあります。逆に、レゾルベント恒等式
$V(H-i)^{-1}=V(H_0-i)^{-1}[I-V(H-i)^{-1}]$ の右辺はコンパクトで、$H$ の Weyl 列に対して $Vf_j\to0$ が得られます。よって逆向きの包含も成立し
$\sigma_{\rm ess}(H)=\sigma_{\rm ess}(-a\Delta)=[0,\infty)$。
負スペクトルは孤立固有値しかなく、(3) の列挙が全てです。

(5) $n=2$ では $(\ell,m)=(0,0),(1,-1),(1,0),(1,1)$ の4組で、
重複度 $4=2^2$ です。$u_{00}=Cre^{-\beta r}$ として
$\int_0^\infty r^2e^{-2\beta r}dr=2/(2\beta)^3$ から
$C=2\beta^{3/2}$。$Y_0^0=(4\pi)^{-1/2}$ を掛け、
$\Psi_{100}=(\beta^3/\pi)^{1/2}e^{-\beta r}$ と得ます。
<!-- solution-end -->

## 9. 到達点

数理量子力学では、[MQ0](../MQ0/index.md) の量子化の選択から、
[MQ1](../MQ1/index.md) の自己共役性、
[MQ2](../MQ2/index.md) の変分原理、
[MQ3](../MQ3/index.md) の純離散スペクトルの例を経て、
この章では**離散束縛準位と本質スペクトルの共存**までたどりました。

水素原子の公式の核心は「変数分離」単独ではありません。
定義域・原点条件・負固有値の完全列挙・本質スペクトルを分けて閉じることにあります。
