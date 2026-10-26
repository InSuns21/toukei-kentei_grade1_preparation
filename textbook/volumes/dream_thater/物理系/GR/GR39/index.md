# GR39 3+1分解と初期データの意味

<!-- definition-example-audit: strict -->

Einstein方程式を初期面から解くという考え方では、対称な4次元計量の独立な10成分を初期面に自由に置くわけではありません。まず4次元の計量を、面上で測れる長さと、その面が次の時刻へどう移るかに分ける必要があります。

[LORG20の滑らかな直交分割](../../../幾何系/LORG/LORG20/index.md#thm-lorg20-orthogonal-splitting)では、適切な時空を空間的Cauchy面で切り、時間方向を法線に合わせる座標を構成しました。ここでは**同じ時刻面を保ちながら、隣の面上の点を斜めに対応させる**自由も許します。その自由がshiftです。さらに[GR11の第二基本形式](../GR11/index.md#def-gr11-extrinsic-curvature)を用いて面の幾何の時間変化を測ると、初期値として必要な量が見えてきます。

以下、時空 $(M,g)$ は滑らかな4次元・時間向き付きLorentz多様体、符号は $(-,+,+,+)$ とし、$G=c=1$ とします。時間座標 $t$ と空間座標 $x^i$（$i,j=1,2,3$）は長さの単位で測ります。ギリシャ添字は時空の $0,1,2,3$、ラテン添字は空間の $1,2,3$ を走ります。各時刻面 $\Sigma_t=\{t=\text{const.}\}$ は滑らかな空間的面とし、$dt$ は至る所零でなく、その勾配は時間的とします。大域的な初期値問題を考えるときは、$\Sigma_t$ がCauchy面でもあると仮定します。

## 1. 面に垂直な時間と、座標が進む時間は違う

時刻面の接ベクトルは $e_i=\partial_i$ です。そこへ計量を制限した正定値な**誘導計量**を $h_{ij}=g(e_i,e_j)$ と書き、逆行列を $h^{ij}$ とします。これは[GR11の非光的面の誘導計量](../GR11/index.md#def-gr11-boundary-geometry)の空間的な場合です。面に未来向き・長さの二乗が $-1$ の法線 $n$ を選びます。

法線の正規化と時間関数から、[LORG20のlapse・単位法線命題](../../../幾何系/LORG/LORG20/index.md#prop-lorg20-unit-normal)の座標に依存しない部分を利用できます。$g^{-1}(dt,dt)=g^{\mu\nu}\partial_\mu t\,\partial_\nu t<0$ なので、正のlapse $N$ と未来向き法線を

$$
N=\bigl(-g^{\mu\nu}\partial_\mu t\,\partial_\nu t\bigr)^{-1/2},
\qquad n^\mu=-N g^{\mu\nu}\partial_\nu t
$$

と取ります。定義式を縮約すれば $g(n,n)=N^2g^{-1}(dt,dt)=-1$、$dt(n)=-N g^{-1}(dt,dt)=N^{-1}$ です。したがって $Nn$ は時刻を単位速度で進めます。

一方、座標ベクトル $\partial_t$ も $dt(\partial_t)=1$ ですが、空間的なずれを含めて構いません。両者の差は $dt(\partial_t-Nn)=0$ を満たすので、面の接方向にあります。

<a id="def-gr39-shift"></a>

<!-- formal-statement-start -->
> **定義（時間座標に伴うshift）**
> 上記の滑らかな空間的時刻面、未来単位法線 $n$、正のlapse $N$、面上の座標 $x^i$ に対し、

$$
\beta:=\partial_t-Nn=\beta^i\partial_i
$$

> をその座標系の**shiftベクトル**とする。$\beta_i=h_{ij}\beta^j$ と書く。$N$ と $\beta^i$ は時間・空間座標の選択に依存するが、固定された面と未来単位法線はその選択だけでは変わらない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr39-shift -->
**定義の確認**：Minkowski時空の慣性座標 $(T,X,Y,Z)$ で、$t=T$、$x=X-vT$、$y=Y$、$z=Z$（定数 $v\in\mathbb R$）とします。$X=x+vt$ なので $\partial_t=\partial_T+v\partial_X$、$\partial_x=\partial_X$ です。各 $t$ 面は元の平坦な $T$ 面で、$n=\partial_T$ は未来向き、$g(n,n)=-1$、$dt(n)=1$。ゆえに $N=1$、$\beta=\partial_t-n=v\partial_x$ で、$dt(\beta)=0$ を直接確かめられます。$|v|>1$ で $\partial_t$ 自身が空間的になっても、時刻面と $n$ はなお空間的・時間的です。
<!-- definition-example-end -->

shiftは空間内の粒子の実速度ではありません。座標 $x^i$ を固定して時刻を進めた線と、面に垂直に進めた線のずれです。この区別により、後の計算で「時刻面の形」と「座標点の付け替え」を切り分けられます。

## 2. 3+1計量の全成分を求める

$\partial_t=Nn+\beta^ie_i$ と $g(n,e_i)=0$ を使うと、計量の時間・空間成分がすべて決まります。数式を作る前に、$g_{ti}$ がずれベクトルと接ベクトルの内積、$g_{tt}$ が時間方向ベクトル自身の二乗であることを確認します。

<a id="prop-gr39-adm-metric"></a>

<!-- formal-statement-start -->
> **命題（lapse・shiftを含む3+1計量と逆行列）**
> 滑らかな空間的時刻面とそれに適合する座標 $(t,x^i)$ があるとする。$h_{ij}$ は正定値で、$N>0$、$\beta^i$ を上の定義で与える。このとき計量は

$$
ds^2=-N^2dt^2+h_{ij}(dx^i+\beta^i dt)(dx^j+\beta^j dt)
$$

> と書け、その逆行列と行列式は

$$
\begin{aligned}
g^{tt}&=-N^{-2},&
g^{ti}&=N^{-2}\beta^i,\\
g^{ij}&=h^{ij}-N^{-2}\beta^i\beta^j,&
\det g&=-N^2\det h.
\end{aligned}
$$

> 特に正の体積密度は $\sqrt{-\det g}=N\sqrt{\det h}$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

法線と接ベクトルの直交性から行列の4ブロックを作ります。逆行列はブロック同士の積を取り、混合成分が零になることまで検査します。行列式は時間方向からshiftを引く行基本操作で求めます。

<!-- proof-start -->
### 証明

$g(n,n)=-1$、$g(n,e_i)=0$ を順に使うと、

$$
\begin{aligned}
g_{ij}&=h_{ij},\\
g_{ti}&=g(Nn+\beta^je_j,e_i)=h_{ij}\beta^j=:\beta_i,\\
g_{tt}&=g(Nn+\beta^ie_i,Nn+\beta^je_j)
       =-N^2+h_{ij}\beta^i\beta^j.
\end{aligned}
$$

したがって $g_{\mu\nu}dx^\mu dx^\nu$ の時間・混合・空間項をまとめると命題の平方完成された表示になります。逆行列の候補をブロックで

$$
\left(g^{\mu\nu}\right)=
\begin{pmatrix}
-N^{-2}&N^{-2}\beta^j\\
N^{-2}\beta^i&h^{ij}-N^{-2}\beta^i\beta^j
\end{pmatrix}
$$

と置き、$g^{\mu\rho}g_{\rho\nu}$ を四種類確かめます。$h^{ij}h_{jk}=\delta^i_k$ と $\beta_i=h_{ij}\beta^j$ より

$$
\begin{aligned}
g^{tt}g_{tt}+g^{ti}g_{it}
 &=1-N^{-2}\beta_i\beta^i+N^{-2}\beta^i\beta_i=1,\\
g^{tt}g_{tj}+g^{ti}g_{ij}
 &=-N^{-2}\beta_j+N^{-2}\beta^i h_{ij}=0,\\
g^{it}g_{tt}+g^{ik}g_{kt}
 &=-\beta^i+N^{-2}\beta^i\beta_k\beta^k
   +\beta^i-N^{-2}\beta^i\beta^k\beta_k=0,\\
g^{it}g_{tj}+g^{ik}g_{kj}
 &=N^{-2}\beta^i\beta_j+\delta^i_j-N^{-2}\beta^i\beta^k h_{kj}
 =\delta^i_j.
\end{aligned}
$$

行列式では、最初の行（時間方向）から各空間行の $\beta^i$ 倍を引くと、左上が $-N^2$、時間・空間の残りが零となり、空間ブロックは $h$ のままです。この行操作は行列式を変えないので $\det g=-N^2\det h$。$h$ が正定値で $N>0$ だから、密度の正の平方根は $N\sqrt{\det h}$ です。$\square$
<!-- proof-end -->

例えば $N=2$、$\beta^x=3$、$h_{ij}=\delta_{ij}$ なら $g_{tt}=-4+9=5$ ですが、$g^{tt}=-1/4$ です。$g_{tt}>0$ は $\partial_t$ が空間的という意味であり、$t$ 面が空間的でなくなるという意味ではありません。

## 3. 第二基本形式は、座標のずれを引いた時間変化

時刻面の誘導計量 $h$ は、**面の内側**で長さを決めます。しかし次の面が時空の中でどの方向へ曲がるかは $h$ だけでは分かりません。[GR11の第二基本形式](../GR11/index.md#def-gr11-extrinsic-curvature)を空間的時刻面へ適用します。ただしGR11では境界の**外向き**法線でした。今回は全時刻で未来向きの $n$ を固定し、同じ「プラス」符号

$$
K_{ij}:=e_i^\mu e_j^\nu\nabla_\mu n_\nu,
\qquad K:=h^{ij}K_{ij}
$$

を用います。これは一般的なADM文献にある $K_{ij}^{\mathrm{ADM}}=-K_{ij}$ という選択と符号が逆のことがあります。以後の計算では必ずこの定義へ戻ります。

任意の空間ベクトル場 $\beta=\beta^i e_i$ に沿って $h$ がどれだけ変わるかは、面のLevi-Civita接続 $D$ で

$$
(\mathcal L_\beta h)_{ij}=D_i\beta_j+D_j\beta_i
$$

と表せます。$\mathcal L_\beta$ は、$\beta$ の流れに沿った計量の変化を測るLie微分です。右辺の式は、$D_ih_{jk}=0$ と捩率零を座標表示に代入したものです。例えば平坦な $h=\delta$ では $D_i\beta_j=\partial_i\beta_j$ へ戻ります。

<a id="prop-gr39-k-evolution"></a>

<!-- formal-statement-start -->
> **命題（第二基本形式の時間発展表示）**
> 上の滑らかな3+1座標表示で、第二基本形式の符号を $K_{ij}=g(\nabla_{e_i}n,e_j)$ とする。$D$ を誘導計量 $h$ のLevi-Civita接続とすれば、

$$
\partial_t h_{ij}
=2NK_{ij}+D_i\beta_j+D_j\beta_i,
\qquad
K_{ij}=\frac{\partial_t h_{ij}-D_i\beta_j-D_j\beta_i}{2N}.
$$

> この表示の $K_{ij}$ は座標基底 $e_i=\partial_i$ に関する成分であり、$N>0$ を仮定する。
<!-- formal-statement-end -->

### 証明の見取り図

法線方向の計量変化は第二基本形式の二倍です。座標時間方向 $\partial_t=Nn+\beta$ に沿った変化から、接方向の座標ずれに相当するLie微分を引きます。Lie微分が単なる成分の時間偏微分と一致するのは座標ベクトル同士が可換だからです。

<!-- proof-start -->
### 証明

空間接ベクトル $u,v$ に対して、計量のLevi-Civita接続の計量両立性と捩率零から

$$
\begin{aligned}
(\mathcal L_n g)(u,v)
&=n[g(u,v)]-g([n,u],v)-g(u,[n,v])\\
&=g(\nabla_u n,v)+g(u,\nabla_v n)
=2K(u,v).
\end{aligned}
$$

最後は[第二基本形式の対称性](../GR11/index.md#def-gr11-extrinsic-curvature)を使用しました。$h_{\mu\nu}=g_{\mu\nu}+n_\mu n_\nu$ は接方向に $g$ と一致し、$h(n,\cdot)=0$ なので、$u,v$ に制限すると $(\mathcal L_{Nn}h)(u,v)=N(\mathcal L_n h)(u,v)=2NK(u,v)$ です。ここでLie微分の積の追加項は $h(n,u)=h(n,v)=0$ のため消えます。

座標場は $[\partial_t,\partial_i]=0$ です。したがって $h_{ij}=h(e_i,e_j)$ を固定した空間座標ラベルで微分すると

$$
\partial_t h_{ij}
=(\mathcal L_{\partial_t}h)(e_i,e_j)
=2NK_{ij}+(\mathcal L_\beta h)_{ij}.
$$

最後のLie微分は面の接続 $D$ の計量両立性を用い、

$$
\begin{aligned}
(\mathcal L_\beta h)_{ij}
&=\beta^k\partial_kh_{ij}
  +h_{kj}\partial_i\beta^k+h_{ik}\partial_j\beta^k\\
&=D_i\beta_j+D_j\beta_i
\end{aligned}
$$

です（接続係数の項は互いに相殺します）。よって第一式を得て、$2N>0$ で割れば第二式となります。$\square$
<!-- proof-end -->

この式で $K$ と $\partial_t h$ を直接同一視するのは、shiftの項を見落としています。特に $h_{ij}$ が時刻に依存しなくても、空間的に変化するshiftがあれば $K_{ij}$ は零とは限りません。

単位も検算します。ここでは $t,x^i$ を長さの単位、$ds^2$ を長さの二乗で測るので、$N$、$\beta^i$、$h_{ij}$ は無次元です。一方、$\partial_t h_{ij}$ と $D_i\beta_j$ はともに長さの逆数の次元を持ち、$K_{ij}$ も長さの逆数です。座標時刻を秒で測る規約へ戻すなら、時間方向に $c$ の因子が現れるため、単位系を混ぜたまま同じ成分式を使ってはいけません。

### 平坦時空でも曲がった時刻面を選べる

Minkowskiの $(T,X,Y,Z)$ に戻り、$0<a<1$、$L>0$ を固定して

$$
t=T-f(X),\qquad x=X,\qquad
f(x)=aL\log\cosh(x/L)
$$

と置きます。$p(x):=f'(x)=a\tanh(x/L)$ は $|p|<1$、$p'=aL^{-1}\operatorname{sech}^2(x/L)$ です。$dT=dt+p\,dx$ を平坦計量へ代入すると

$$
ds^2=-dt^2-2p\,dt\,dx+(1-p^2)\,dx^2+dy^2+dz^2.
$$

誘導計量 $h_{xx}=1-p^2=:q>0$ で、$\beta_x=g_{tx}=-p$、したがって $\beta^x=-p/q$ です。[lapse・shiftを含む3+1計量と逆行列](#prop-gr39-adm-metric)に $g_{tt}=-1$ を代入して

$$
-1=-N^2+q\frac{p^2}{q^2},
\qquad N^2=1+\frac{p^2}{q}=\frac1q.
$$

よって $N=q^{-1/2}$。各面は空間的です。さらに $dt/dT=1-p\,dX/dT\ge1-a>0$ が未来因果曲線上で成り立ち、Minkowskiの非延長因果曲線の $T$ は両側へ全実数を走るため（[LORG15のMinkowski因果曲線補題](../../../幾何系/LORG/LORG15/index.md#lem-lorg15-full-time)）、$t$ も全実数を走ります。従ってこれらはCauchy時刻面です。

曲がり具合を二通りで検算します。$t$ を固定した面の接ベクトルは $(T,X)$ 表示で $e_x=p\,\partial_T+\partial_X$、未来単位法線は

$$
n=q^{-1/2}(\partial_T+p\,\partial_X).
$$

平坦な接続で $x$ 微分をすると $\partial_x n=N'(\partial_T+p\partial_X)+Np'\partial_X$ です。$g(n,e_x)=0$ より第一項は内積で消え、[第二基本形式の定義](../GR11/index.md#def-gr11-extrinsic-curvature)から

$$
K_{xx}=g(\nabla_{e_x}n,e_x)=Np'=\frac{p'}{\sqrt q}
$$

となります。他方、$\partial_t h_{xx}=0$、$h_{xx}=q$ の1次元接続係数は $\Gamma^x_{xx}=q'/(2q)=-pp'/q$。これを使い

$$
\begin{aligned}
D_x\beta_x
&=\partial_x(-p)-\Gamma^x_{xx}(-p)\\
&=-p'-\frac{p^2p'}q=-\frac{p'}q,\\
K_{xx}
&=\frac{-2D_x\beta_x}{2N}
=\frac{p'}{Nq}=\frac{p'}{\sqrt q}.
\end{aligned}
$$

と[時間発展命題](#prop-gr39-k-evolution)でも同じ値が出ます。$x=0$ では $p=0$、$N=1$、$\beta^x=0$ なのに $K_{xx}=a/L>0$ です。**一つの点でshiftが零でも、shiftの空間微分と面の曲がりは残ります。** 時空のRiemann曲率は零のままなので、時刻面の外在的な曲がりと時空の曲率も別物です。

## 4. 初期面に渡す量は何か

[GR12のEinstein場の方程式](../GR12/index.md#thm-gr12-einstein-equation)は4次元計量と物質を結びます。初期値の側では、ある空間的Cauchy面 $\Sigma$ 上の正定値計量 $h$ に加えて、面が法線方向へどう変化しているかを表す対称テンソル $K$ が必要です。物質があれば、応力エネルギーテンソル $T_{\mu\nu}$ の面上の観測量も区別します。

未来単位法線を $n$、接基底を $e_i$ とすると、法線観測者のエネルギー密度、運動量密度、空間応力はそれぞれ

$$
\rho=T_{\mu\nu}n^\mu n^\nu,\qquad
j_i=-T_{\mu\nu}n^\mu e_i^\nu,\qquad
S_{ij}=T_{\mu\nu}e_i^\mu e_j^\nu
$$

です。負号を $j_i$ に入れるのは $(-,+,+,+)$ での空間運動量の慣用に合わせるためです。この三つの射影だけから任意の物質模型の運動方程式を解いたことにはなりません。実際には模型ごとの物質場とその初期値も必要です。

<a id="def-gr39-initial-data"></a>

<!-- formal-statement-start -->
> **定義（Einstein方程式の初期データ候補）**
> 滑らかな3次元多様体 $\Sigma$ 上の正定値Riemann計量 $h_{ij}$、対称二階テンソル $K_{ij}$、および指定された物質模型の初期場と必要な時間方向データの組を**初期データ候補**とする。$K$ は未来単位法線について

$$
K_{ij}=e_i^\mu e_j^\nu\nabla_\mu n_\nu
$$

> という符号を採用する。物質の $\rho,j_i,S_{ij}$ は上の射影から得る。これがEinstein方程式の真の初期データとなるには、さらにEinstein方程式を法線方向・混合方向へ射影して得る**制約式**を満たす必要がある。候補という語はその等式を未検査であることを表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr39-initial-data -->
**定義の確認**：平坦Minkowskiの $\Sigma=\{T=0\}$ を考えます。接方向は $\partial_X,\partial_Y,\partial_Z$ なので $h_{ij}=\delta_{ij}$ は正定値です。$n=\partial_T$ は未来向きで $g(n,n)=-1$、$n_\mu$ は定数かつ接続係数は零なので $K_{ij}=0=K_{ji}$。真空を選べば $T_{\mu\nu}=0$、$\rho=j_i=S_{ij}=0$ です。Minkowski計量が[Einstein方程式](../GR12/index.md#thm-gr12-einstein-equation)を $\Lambda=0$ で満たすので、この例は制約式も満たす実在の初期データです。他方、任意の $h,K$ を書いただけで実在する解が保証されたことにはなりません。
<!-- definition-example-end -->

この候補の $h_{ij},K_{ij}$ は各6成分を持ちますが、初期面に12個の独立な「物理量」があるという結論にはなりません。第一に座標の付け替えがあり、第二に[Einstein方程式](../GR12/index.md#thm-gr12-einstein-equation)の一部は初期面上の制約式です。後者はGR40でGauss–Codazzi関係から導きます。$N,\beta^i$ は面の幾何 $h,K$ と同じ種類の自由データではなく、時刻や座標点の対応を指定するものです。初期値問題の局所存在・一意性にも、十分な正則性、適切な物質模型、制約式を満たすことなどが必要です。

## 5. 時間の再目盛りで何が変わるか

面そのものを変えず時刻ラベルだけ $s=f(t)$ に取り替えると、同じ面に別の数字を付けただけです。それでもlapseの数値は変わります。これは「lapseが空間の曲がりを決める物理量そのもの」という誤解を検査する手軽な方法です。

<a id="prop-gr39-time-reparam"></a>

<!-- formal-statement-start -->
> **命題（時間再目盛りに対するデータの変換）**
> 上記の滑らかな3+1分解で、空間座標 $x^i$ を固定し、$s=f(t)$ を $f'(t)>0$ の滑らかな微分同相な時刻の取り替えとする。このとき同じ葉層・同じ未来向き法線に対して

$$
N_s=\frac{N_t}{f'(t)},\qquad
\beta_s^i=\frac{\beta_t^i}{f'(t)},\qquad
h^{(s)}_{ij}=h^{(t)}_{ij},\qquad
K^{(s)}_{ij}=K^{(t)}_{ij}
$$

> が、対応する同じ時刻面上で成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$\partial_s=(dt/ds)\partial_t$ を法線と接方向に分けます。$h,K$ は同じ面と未来法線の幾何から定義されるので変わらず、進化式への代入でも確認できます。

<!-- proof-start -->
### 証明

$ds=f'(t)dt$、$f'>0$ だから $\partial_s=f'^{-1}\partial_t$ です。[shiftの定義](#def-gr39-shift)に従い、

$$
\partial_s=\frac{N_t}{f'}n+\frac{\beta_t^i}{f'}\partial_i.
$$

未来単位法線 $n$ と空間接ベクトル $\partial_i$ は同じで、法線・接方向の分解は一意です。よって $N_s=N_t/f'$、$\beta_s^i=\beta_t^i/f'$。同じ埋め込み面に計量を制限するので $h$ は変わらず、同じ未来向き $n$ の接方向微分を取るので $K$ も変わりません。

さらに $f'$ は時刻のみの関数なので $D_i(f'^{-1}\beta_j)=f'^{-1}D_i\beta_j$ です。$\partial_s h_{ij}=f'^{-1}\partial_t h_{ij}$ を[時間発展命題](#prop-gr39-k-evolution)へ入れると、分子も分母も同じ $f'^{-1}$ 倍となり、$K^{(s)}=K^{(t)}$ を再確認できます。$\square$
<!-- proof-end -->

例えば $s=2t$ では $N$ とshiftの成分は半分ですが、$h,K$ は同じです。時刻面を**別の形に切り直す**操作では、$h,K$ 自体が変わり得ます。先ほどの曲がったMinkowskiの例は、その違いを示しています。

## 6. 演習：座標の自由と初期面の幾何を見分ける

<a id="ex-gr39-a01"></a>

### GR39-A01 時間方向が空間的でもよい
- Level: A

$ds^2=-4dt^2+(dx+3dt)^2+dy^2+dz^2$ とする。$N,\beta^i,h_{ij}$、未来単位法線 $n$ を求め、$\partial_t$ と $n$ の因果型を判定せよ。

<!-- solution-start -->
**詳細解答。** [3+1計量](#prop-gr39-adm-metric)の平方完成された形を比較して $N=2$、$\beta^x=3$、他のshift成分は零、$h_{ij}=\delta_{ij}$ です。[shiftの定義](#def-gr39-shift)を解くと

$$
n=\frac{\partial_t-3\partial_x}{2}.
$$

$g(n,n)=-1$、$dt(n)=1/2>0$ なので未来向き単位時間的です。他方 $g(\partial_t,\partial_t)=-4+9=5>0$ で $\partial_t$ は空間的です。面の誘導計量は正定値だから $t$ 面は空間的です。
<!-- solution-end -->

<a id="ex-gr39-a02"></a>

### GR39-A02 逆行列と体積密度
- Level: A

$N=2$、$\beta^x=1$、$\beta^y=\beta^z=0$、$h=\operatorname{diag}(4,1,1)$ の3+1計量について、$(t,x)$ ブロックの $g_{\mu\nu},g^{\mu\nu}$、全行列式、体積密度を求めよ。

<!-- solution-start -->
**詳細解答。** $\beta_x=h_{xx}\beta^x=4$、$g_{tt}=-4+4=0$、$g_{tx}=4$、$g_{xx}=4$ なので

$$
g_{(t,x)}=\begin{pmatrix}0&4\\4&4\end{pmatrix}.
$$

[逆行列の命題](#prop-gr39-adm-metric)より $g^{tt}=-1/4$、$g^{tx}=1/4$、$g^{xx}=1/4-1/4=0$、従って

$$
g_{(t,x)}^{-1}=
\begin{pmatrix}-1/4&1/4\\1/4&0\end{pmatrix}.
$$

積は単位行列です。$\det h=4$ だから $\det g=-N^2\det h=-16$、$\sqrt{-\det g}=2\cdot2=4$ です。
<!-- solution-end -->

<a id="ex-gr39-a03"></a>

### GR39-A03 一様膨張する時刻面
- Level: A

$ds^2=-dt^2+a(t)^2(dx^2+dy^2+dz^2)$、$a(t)=e^{Ht}>0$（定数 $H$）について、$K_{ij}$ と跡 $K$ を本章の符号で求めよ。

<!-- solution-start -->
**詳細解答。** $N=1$、$\beta=0$、$h_{ij}=a^2\delta_{ij}$ です。[時間発展命題](#prop-gr39-k-evolution)から

$$
K_{ij}=\frac12\partial_t h_{ij}
=aa'\delta_{ij}=Ha^2\delta_{ij}=Hh_{ij}.
$$

$h^{ij}=a^{-2}\delta^{ij}$ を縮約すると $K=h^{ij}K_{ij}=3H$ です。$H>0$ では未来法線に沿う膨張を正符号の $K$ が示します。
<!-- solution-end -->

<a id="ex-gr39-a04"></a>

### GR39-A04 空間的に変わるshift
- Level: A

$N=1$、$h_{ij}=\delta_{ij}$ は時刻に依存せず、$\beta^x=bx$、$\beta^y=\beta^z=0$（定数 $b$）とする。$K_{ij}$ の全非零成分と跡を求めよ。

<!-- solution-start -->
**詳細解答。** 平坦な $h$ のChristoffel係数は零なので $D_x\beta_x=\partial_x(bx)=b$。残りの $D_i\beta_j$ はすべて零です。[時間発展命題](#prop-gr39-k-evolution)へ代入すると

$$
K_{xx}=\frac{0-2b}{2}=-b,\qquad
K_{yy}=K_{zz}=0,\qquad K=-b.
$$

時刻面の空間計量が時間座標に依存しないことだけでは $K=0$ と言えません。この計量がMinkowskiであるとの追加主張はしていません。
<!-- solution-end -->

<a id="ex-gr39-a05"></a>

### GR39-A05 初期データ候補を仕分ける
- Level: A

真空Minkowskiの $T=0$ 面における $h,K,N,\beta,\rho,j_i,S_{ij}$ を標準座標で求めよ。さらに $N=3,\beta^x=2$ への数値変更だけから $h,K$ の変化を結論できるか答えよ。

<!-- solution-start -->
**詳細解答。** 標準座標では $n=\partial_T$、$h_{ij}=\delta_{ij}$、接続係数零より $K_{ij}=0$、$N=1$、$\beta^i=0$ です。真空なので $T_{\mu\nu}=0$ の各射影も $\rho=j_i=S_{ij}=0$。$N,\beta$ は[shiftの定義](#def-gr39-shift)で座標に依存する量です。別の時間・空間座標を指定するだけなら同一初期面の $h,K$ は変わりません。しかし単に数値だけ変更して解の存在を断定することもできず、初期時刻の $N,\beta$ とその後の時間発展の設定を区別します。
<!-- solution-end -->

<a id="ex-gr39-b01"></a>

### GR39-B01 平坦時空の移動座標
- Level: B

Minkowskiで $t=T$、$x=X-vT$、$y=Y$、$z=Z$（任意の定数 $v$）とする。計量の全成分から $N,\beta,h$ を読み、直接の接続計算または[時間発展命題](#prop-gr39-k-evolution)を使って $K=0$ を証明せよ。$|v|>1$ でも結論が維持される理由を述べよ。

<!-- solution-start -->
**詳細解答。** $dX=dx+vdt$ から

$$
ds^2=-dt^2+(dx+vdt)^2+dy^2+dz^2,
$$

従って $g_{tt}=-1+v^2$、$g_{tx}=v$、$h=\delta$。[lapse・shiftを含む3+1計量と逆行列](#prop-gr39-adm-metric)と比較して $N=1$、$\beta^x=v$ です。$h$ は一定、$\beta$ も空間的に一定なので $D_i\beta_j=0$、従って $K_{ij}=0$。また $\partial_t-v\partial_x=\partial_T$ は単位時間的であり、$|v|>1$ のとき空間的になるのは $\partial_t$ だけです。葉層の未来単位法線と空間的誘導計量は変わりません。
<!-- solution-end -->

<a id="ex-gr39-b02"></a>

### GR39-B02 曲がった平坦時刻葉
- Level: B

Minkowskiで $t=T-f(X)$、$x=X$、$f(x)=aL\log\cosh(x/L)$（$0<a<1,L>0$）とする。$h_{xx},N,\beta^x,K_{xx}$ を二通りで計算し、$x=0$ の値を求めよ。

<!-- solution-start -->
**詳細解答。** $p=f'=a\tanh(x/L)$、$q=1-p^2>0$ なので、計量の $(t,x)$ 成分は $g_{tt}=-1$、$g_{tx}=-p$、$g_{xx}=q$。[lapse・shiftを含む3+1計量と逆行列](#prop-gr39-adm-metric)から

$$
h_{xx}=q,\qquad \beta^x=-\frac p q,\qquad
N^2=1+\frac{p^2}q=\frac1q.
$$

未来単位法線はMinkowski表示で $n=q^{-1/2}(\partial_T+p\partial_X)$。面の接ベクトル $e_x=p\partial_T+\partial_X$ へ法線を微分して内積を取ると、

$$
K_{xx}=g(\nabla_{e_x}n,e_x)=q^{-1/2}p',
$$

となります。他方 $q'=-2pp'$、$\Gamma^x_{xx}=q'/(2q)$、$\beta_x=-p$ より

$$
D_x\beta_x=-p'-\frac{p^2p'}q=-\frac{p'}q.
$$

$\partial_t h=0$ を[時間発展命題](#prop-gr39-k-evolution)へ入れると $K_{xx}=p'/(Nq)=p'/\sqrt q$ で一致します。$x=0$ は $p=0$、$p'=a/L$ だから $h_{xx}=N=1$、$\beta^x=0$、$K_{xx}=a/L$ です。
<!-- solution-end -->

<a id="ex-gr39-b03"></a>

### GR39-B03 時間の再目盛り
- Level: B

$ds^2=-N(t,x)^2dt^2+h_{ij}(dx^i+\beta^idt)(dx^j+\beta^jdt)$ に対し $s=2t$ とする。変換後の $N_s,\beta_s,h_s,K_s$ を求め、特に $K$ の公式の両辺を比較せよ。

<!-- solution-start -->
**詳細解答。** $dt=ds/2$ を代入すると、平方完成の時間部分は $-(N/2)^2ds^2$、空間部分は $h_{ij}(dx^i+\beta^ids/2)(dx^j+\beta^jds/2)$。ゆえに $N_s=N/2$、$\beta_s^i=\beta^i/2$、$h_s=h$ です。

$$
\begin{aligned}
\partial_s h_{ij}-D_i(\beta_s)_j-D_j(\beta_s)_i
&=\frac12\bigl(\partial_t h_{ij}-D_i\beta_j-D_j\beta_i\bigr),\\
2N_s&=\frac12(2N).
\end{aligned}
$$

従って[時間発展命題](#prop-gr39-k-evolution)で分子分母の因子が相殺し $K_s=K_t$ です。これは[再目盛り命題](#prop-gr39-time-reparam)の直接検算です。
<!-- solution-end -->

<a id="ex-gr39-b04"></a>

### GR39-B04 逆向きに時間変化を復元する
- Level: B

ある時刻の局所座標で $h_{ij}=\delta_{ij}$、$N=N_0>0$、$\beta^x=bx$、$\beta^y=\beta^z=0$、$K_{xx}=k$、他の $K_{ij}=0$ とする。その時刻の $\partial_t h_{ij}$ を全成分について求めよ。$b$ を変えると $k$ が変わるとは限らない理由も述べよ。

<!-- solution-start -->
**詳細解答。** その時刻に限り $h=\delta$ なので $D_x\beta_x=b$、他の共変微分は零です。[時間発展命題](#prop-gr39-k-evolution)を $\partial_t h$ について解けば

$$
\partial_t h_{xx}=2N_0 k+2b,\qquad
\partial_t h_{yy}=\partial_t h_{zz}=0,\qquad
\partial_t h_{ij}=0\ (i\ne j).
$$

$b$ の変更を空間座標の時刻依存の付け替えとして実現すれば、同じ幾何学的面と未来法線上の $K_{xx}=k$ を保ったまま $\partial_t h_{xx}$ の見かけの変化が $2b$ だけ変わります。$K$ は時間微分からshiftの変化を差し引いた量だからです。
<!-- solution-end -->

<a id="ex-gr39-c01"></a>

### GR39-C01 曲がった葉層を動く座標で追跡する
- Level: C

Minkowskiで $t=T-f(X)$、$y=X-vt$、$z=Y$、$w=Z$ と置く。$f(X)=aL\log\cosh(X/L)$、$0<a<1$、$L>0$、$v$ は定数とする。$p=f'(X)$、$q=1-p^2$ と置き、次を導け。

1. $(t,y,z,w)$ での計量と $h_{yy}$、lapse、shiftを求める。
2. $K_{yy}$ を、面の埋め込みを使う直接計算と、時間発展式の双方から求める。
3. $v$ による座標の動きと $f$ による葉層の曲がりを区別し、$y+vt=0$ での値を検算する。

<!-- solution-start -->
**詳細解答。** まず $X=y+vt$ より $dX=dy+vdt$、また $dT=dt+p\,dX$ です。Minkowski計量の時間・$X$ 部分を展開すると

$$
\begin{aligned}
-dT^2+dX^2
&=-dt^2-2p\,dt\,dX+(1-p^2)dX^2\\
&=-dt^2-2p\,dt(dy+vdt)+q(dy+vdt)^2.
\end{aligned}
$$

この式は、[lapse・shiftを含む3+1計量と逆行列](#prop-gr39-adm-metric)から

$$
h_{yy}=q,\quad h_{zz}=h_{ww}=1,\quad
\beta_y=-p+qv,\quad \beta^y=v-\frac p q
$$

と読めます。$g_{tt}=-1-2pv+qv^2$ に、$g_{tt}=-N^2+q(\beta^y)^2$ を代入すると

$$
\begin{aligned}
N^2&=1+2pv-qv^2+q\left(v-\frac p q\right)^2\\
&=1+\frac{p^2}q=\frac1q,
\end{aligned}
$$

ゆえに $N=q^{-1/2}$。$v$ に依存しない値になりました。

次に $t=\mathrm{const.}$ の接ベクトルは、Minkowski表示で $e_y=p\partial_T+\partial_X$、未来法線は $n=q^{-1/2}(\partial_T+p\partial_X)$ です。$n$ の微分のうち $n$ に比例する項は $g(n,e_y)=0$ で消え、

$$
K_{yy}=g(\nabla_{e_y}n,e_y)=q^{-1/2}p'.
$$

これを時間発展から独立に計算します。$q'=-2pp'$、$X=y+vt$ なので $\partial_t h_{yy}=vq'=-2vpp'$。面の1次元接続は $\Gamma^y_{yy}=q'/(2q)=-pp'/q$ です。$\beta_y=qv-p$ から

$$
\begin{aligned}
D_y\beta_y
&=\partial_y(qv-p)-\Gamma^y_{yy}(qv-p)\\
&=vq'-p'-\frac{q'}{2q}(qv-p)\\
&=\frac12vq'-p'+\frac{pq'}{2q}
=-vpp'-\frac{p'}q.
\end{aligned}
$$

従って[時間発展命題](#prop-gr39-k-evolution)より

$$
K_{yy}=\frac{-2vpp'-2(-vpp'-p'/q)}{2N}
=\frac{p'}{Nq}=\frac{p'}{\sqrt q}.
$$

$v$ の項は時間微分とshiftの空間微分の間で相殺しました。$v$ は同じ各時刻面上の座標点の対応を変えるだけで、葉層そのものは変えません。$f$ を変えれば $p'$ が変わり、第二基本形式も一般に変わります。$y+vt=0$ すなわち $X=0$ では $p=0$、$q=1$、$p'=a/L$ なので

$$
N=1,\qquad \beta^y=v,\qquad h_{yy}=1,\qquad K_{yy}=\frac aL.
$$

shiftが $v$ に変わっても $K_{yy}$ は $v$ に依存しません。曲率零のMinkowskiに非零の第二基本形式を持つ空間的Cauchy葉を切れることも確認できました。
<!-- solution-end -->

## 7. 初期値を次にどう判定するか

3+1分解は、空間計量 $h$、未来法線に関する第二基本形式 $K$、座標の進め方を表す $N,\beta$ を分離しました。時間の進み方を任意に変える自由は、Einstein方程式の初期値を任意に選べることとは違います。次のGR40では、[Einstein場の方程式](../GR12/index.md#thm-gr12-einstein-equation)を法線と接方向へ射影し、$(h,K)$ と物質データに課されるHamiltonian制約・運動量制約を導きます。そこで本章の $K_{ij}=+\nabla_i n_j$ という符号を固定しておくことが、式の符号を取り違えない最初の防波堤です。
