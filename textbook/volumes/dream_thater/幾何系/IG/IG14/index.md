# IG14 情報単調性と Čencov の定理

<!-- definition-example-audit: strict -->

[IG3 の KL divergence](../IG3/index.md#thm-ig3-kl-fisher-hessian)は、分布の違いを数で表し、その微小な二次項から [IG2 の Fisher--Rao 計量](../IG2/index.md#def-ig2-fisher-rao-metric)を取り出せました。しかし観測を加工すると、異なる事象が同じ出力にまとめられます。たとえば「晴れ・曇り・雨」を「雨か否か」にまとめれば、元の天気を完全には復元できません。

**観測を捨てる操作で情報の違いが大きくなることはあるか。逆に、どんな計量が「どの粗視化でも増えない」という要求を満たすか。** 本講では有限個の状態を持つ正の確率分布から始め、KL の減少、Fisher 計量の縮小、その計量の一意性を順番に証明します。最後に、異なる divergence が同じ局所計量を持てる理由を見ます。

以下、[IG1 の正の確率単体](../IG1/index.md#def-ig1-positive-simplex)を

$$
\Delta_{n-1}^{\circ}=\{p=(p_1,\ldots,p_n):p_i>0,\ \sum_{i=1}^{n}p_i=1\}
$$

と書きます。点 $p$ での接ベクトルは [IG1 の単体接空間の定理](../IG1/index.md#thm-ig1-simplex-tangent)により、実数列 $u=(u_i)$ で $\sum_i u_i=0$ を満たすものです（$p+tu$ が小さな $|t|$ について正規化された確率分布となるため）。基本の [Fisher--Rao 計量](../IG2/index.md#def-ig2-fisher-rao-metric)は

$$
g^F_p(u,v)=\sum_{i=1}^n\frac{u_iv_i}{p_i}
$$

です。$p_i>0$ なので非零の $u$ には $g^F_p(u,u)>0$ です。添字 $n$ は状態数であり、母数の次数ではありません。

## 1. 観測の粗視化を確率行列で表す

まず入力が3状態、出力が2状態で、入力1と2を同じ出力へまとめ、入力3をもう一方へ送る写像を考えます。分布 $p=(p_1,p_2,p_3)$ の出力は $(p_1+p_2,p_3)$ です。これを、列が入力、行が出力の行列

$$
K=\begin{pmatrix}1&1&0\\0&0&1\end{pmatrix},
\qquad Kp=\begin{pmatrix}p_1+p_2\\p_3\end{pmatrix}
$$

で表せます。一般には一つの入力から確率的に複数の出力へ分岐してもよく、それを許すのが次の定義です。

<a id="def-ig14-markov-kernel"></a>

<!-- formal-statement-start -->
> **定義（有限状態の Markov kernel と確率写像）**  
> 入力状態集合 $\{1,\ldots,n\}$ と出力状態集合 $\{1,\ldots,m\}$ の間の **Markov kernel** を、各成分 $K_{yi}\ge0$ が

$$
\sum_{y=1}^{m}K_{yi}=1\quad(i=1,\ldots,n)
$$

> を満たす $m\times n$ 行列 $K$ とする。$K_{yi}$ は入力 $i$ のもとで出力 $y$ を得る条件付き確率である。列ベクトルで表した確率分布 $p$ と接ベクトル $u$ への作用を

$$
(Kp)_y=\sum_iK_{yi}p_i,\qquad (Ku)_y=\sum_iK_{yi}u_i
$$

> とする。$Kp$ は確率写像の出力で、$Ku$ はその微分による接ベクトルである。単体内部の計量を比較するときは $Kp$ の全成分が正であるものを扱う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig14-markov-kernel -->
**定義の確認**。まず $t$ だけを動かし、$K,p,u$ を固定すると、行列積の線形性から

$$
K(p+tu)=Kp+tKu,\qquad
\left.\frac{d}{dt}K(p+tu)\right|_{t=0}=Ku
$$

です。これは $Ku$ が出力の接ベクトルになる微分上の根拠です。

上の $K$ には非負成分しかなく、3列とも成分和が1です。$p_i>0$ なら $Kp$ の両成分も正、成分和は1です。さらに $u_1+u_2+u_3=0$ なら、$Ku=(u_1+u_2,u_3)$ の成分和も0です。したがって出力の確率単体とその接空間への写像になっています。逆に、入力が $(1,2)$ である場合を出力から区別できないため、元の分布を一意に復元できる写像ではありません。
<!-- definition-example-end -->

確率行列 $K$ がある行で全成分0なら、その出力は決して観測されません。その行は取り除くことができ、以下では分母 $(Kp)_y$ が現れる場合、空の出力状態を除いて考えます。$p_i>0$ なら残ったすべての出力に $(Kp)_y>0$ が成り立ちます。

## 2. KL divergence は粗視化で増えない

二つの入力分布 $p,q$ を同じ $K$ へ通すと、その区別は一般に難しくなります。対数比を入力ごとに平均する [KL divergence](../../../解析系/F0/F0-00P7A/index.md#def-f0-00p7a-kl)では、この直感が不等式になります。証明の道具は [凸関数の定義](../../../応用系/OPT/OPT1/index.md#def-opt1-convex-function)を有限個の重みに繰り返して得る Jensen の不等式です。正の重み $w_i$ の和が1なら、凸関数 $\varphi$ について

$$
\varphi\left(\sum_iw_ix_i\right)\le\sum_iw_i\varphi(x_i)
$$

となります。ここでは $\varphi(x)=-\log x$（$x>0$）を使います。

<a id="thm-ig14-data-processing"></a>

<!-- formal-statement-start -->
> **定理（有限状態のデータ処理不等式）**  
> $p,q\in\Delta_{n-1}^{\circ}$、$K$ を $m\times n$ の Markov kernel とし、出力 $r=Kp$、$s=Kq$ がともに正とする。このとき

$$
D_{\mathrm{KL}}(Kp\Vert Kq)\le D_{\mathrm{KL}}(p\Vert q).
$$

> 等号が成り立つ必要十分条件は、各出力 $y$ について $K_{yi}>0$ となる入力 $i$ の集合上で比 $p_i/q_i$ が一定となることである。
<!-- formal-statement-end -->

### 証明の見取り図

出力 $y$ に寄与する入力成分 $K_{yi}p_i$ を重みにして、$K_{yi}q_i/(K_{yi}p_i)=q_i/p_i$ を平均します。凸関数 $-\log$ の Jensen の不等式を出力ごとに適用し、最後に列の和が1であることを使うと、元の KL に戻ります。厳密凸性が等号条件を与えます。

<!-- proof-start -->
### 証明

各 $y$ で $r_y=\sum_iK_{yi}p_i>0$ とおき、$K_{yi}>0$ の入力に対し

$$
w_{i|y}=\frac{K_{yi}p_i}{r_y}>0,\qquad \sum_{i:K_{yi}>0}w_{i|y}=1
$$

を定めます。$q_i/p_i>0$ なので、凸関数 $-\log t$ の Jensen の不等式をこれらの重みに適用できます。左辺と右辺を順に書くと

$$
\begin{aligned}
-\log\frac{s_y}{r_y}
&=-\log\sum_{i:K_{yi}>0}w_{i|y}\frac{q_i}{p_i}\\
&\le-\sum_{i:K_{yi}>0}w_{i|y}\log\frac{q_i}{p_i}.
\end{aligned}
$$

両辺へ $r_y$ を掛け、すべての $y$ で和を取ります。右辺は二重和の順序を入れ替えられ（有限和）、列和の条件から

$$
\begin{aligned}
\sum_y r_y\log\frac{r_y}{s_y}
&\le\sum_y\sum_iK_{yi}p_i\log\frac{p_i}{q_i}\\
&=\sum_i p_i\log\frac{p_i}{q_i}\sum_yK_{yi}\\
&=D_{\mathrm{KL}}(p\Vert q).
\end{aligned}
$$

$-\log$ は正の実数上で厳密凸です。よって各出力の Jensen の等号は、正の重みを持つ $i$ に対して $q_i/p_i$ がすべて等しい場合、かつその場合に限ります。各行の差は非負なので、全体の等号は各行での等号と同値です。比を逆数にすれば主張の $p_i/q_i$ 条件です。
<!-- proof-end -->

**区別が消える例**。$p=(3/4,1/4)$、$q=(1/4,3/4)$ を一つの状態へ送る行列 $K=(1,1)$ で粗視化すると、出力はどちらも $(1)$ となり KL は0です。しかし入力では

$$
D_{\mathrm{KL}}(p\Vert q)=\frac34\log3+\frac14\log\frac13=\frac12\log3>0
$$

です。出力1には両入力が寄与し、比 $p_1/q_1=3$ と $p_2/q_2=1/3$ が一致しないので厳密不等号です。1状態の出力単体は点であり、その接空間は零空間として扱います。

**非可逆でも等号になる例**。$p=(1/6,1/6,2/3)$ と $q=(1/4,1/4,1/2)$ に上の2行3列の $K$ を作用させると、$Kp=(1/3,2/3)$、$Kq=(1/2,1/2)$ です。最初の二入力の比はどちらも $2/3$、第3入力は別の出力にだけ寄与するため、各出力内では比が一定です。したがって $p\ne q$ でも KL は厳密に保存されます。**非可逆な行列であることだけでは減少が厳密とは限りません。**

## 3. Fisher 計量の情報単調性

KL の二次近似は [IG3 の定理](../IG3/index.md#thm-ig3-kl-fisher-hessian)により Fisher 計量でした。したがってデータ処理不等式を小さな摂動に適用すれば計量の縮小を期待できます。ここではそれを直接証明し、等号条件も数式から読み取ります。

ある $p$ において接方向 $u$ を動かすと、出力の変化は $Ku$ です。出力 $y$ に寄与する入力の相対変化 $u_i/p_i$ の重み付き平均が、出力の相対変化 $(Ku)_y/(Kp)_y$ になっています。[Riemann 計量の定義](../../GEO/GEO12/index.md#def-geo12-riemannian-metric)では、各点の接空間に正定値内積を与えます。ここでは状態数 $n$ ごとにその内積を $h^{(n)}_p(u,v)$ と記し、上付き $(n)$ は微分階数ではなく状態数を表します。

<a id="def-ig14-information-monotonicity"></a>

<!-- formal-statement-start -->
> **定義（Riemann 計量族の情報単調性）**  
> 各 $n\ge2$ の正の有限確率単体 $\Delta_{n-1}^{\circ}$ 上に滑らかな正定値 Riemann 計量 $h^{(n)}$ が与えられたとする。任意の $n,m\ge2$、任意の Markov kernel $K:\mathbb R^n\to\mathbb R^m$（$Kp$ が正）と、任意の $p\in\Delta_{n-1}^{\circ}$、$u\in T_p\Delta_{n-1}^{\circ}$ について

$$
h^{(m)}_{Kp}(Ku,Ku)\le h^{(n)}_p(u,u)
$$

> が成り立つとき、この計量族は **情報単調**であるという。$m=1$ の場合は出力接空間が零空間なので左辺を0と解釈する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig14-information-monotonicity -->
**定義の確認**。$n=3,m=2$ の合流行列 $K$ と $p=(1/4,1/4,1/2)$、$u=(a,-a,0)$ を取ります。$u$ の成分和は0で接ベクトル、$Kp=(1/2,1/2)$ は正ですが $Ku=(0,0)$ です。したがって任意の出力計量で左辺は0です。Fisher 計量なら入力の長さの二乗は $a^2/(1/4)+(-a)^2/(1/4)=8a^2$ なので、$a\ne0$ で厳密な縮小となります。この一例だけでは「任意の $K,p,u$」は言えません。その全称命題を次に示します。
<!-- definition-example-end -->

<a id="thm-ig14-fisher-monotonicity"></a>

<!-- formal-statement-start -->
> **定理（Fisher--Rao 計量の縮小と等号条件）**  
> $n,m\ge2$、$p\in\Delta_{n-1}^{\circ}$、$u\in T_p\Delta_{n-1}^{\circ}$ とし、Markov kernel $K$ による $r=Kp$ の全成分が正とする。このとき

$$
g^F_{r}(Ku,Ku)\le g^F_p(u,u).
$$

> 等号が成り立つ必要十分条件は、各 $y$ について $K_{yi}>0$ となる入力集合上で $u_i/p_i$ が一定であることである。
<!-- formal-statement-end -->

### 証明の見取り図

出力 $y$ での相対変化は、上で使った重み $w_{i|y}$ による $u_i/p_i$ の平均です。二乗関数への Jensen の不等式（または Cauchy--Schwarz）で二乗平均以下とし、列和を取ります。$x^2$ の厳密凸性が等号条件です。

<!-- proof-start -->
### 証明

$r_y=\sum_iK_{yi}p_i>0$ とし、$w_{i|y}=K_{yi}p_i/r_y$ を $K_{yi}>0$ の入力に定義します。すると

$$
\frac{(Ku)_y}{r_y}
=\frac{\sum_iK_{yi}u_i}{r_y}
=\sum_{i:K_{yi}>0}w_{i|y}\frac{u_i}{p_i}.
$$

二乗関数の Jensen の不等式をこの実数列に適用し、両辺へ $r_y$ を掛けると

$$
\begin{aligned}
\frac{(Ku)_y^2}{r_y}
&=r_y\left(\sum_iw_{i|y}\frac{u_i}{p_i}\right)^2\\
&\le r_y\sum_iw_{i|y}\frac{u_i^2}{p_i^2}
=\sum_iK_{yi}\frac{u_i^2}{p_i}.
\end{aligned}
$$

最後に $y$ で和を取り、$\sum_yK_{yi}=1$ を用いると

$$
\begin{aligned}
g^F_r(Ku,Ku)
&=\sum_y\frac{(Ku)_y^2}{r_y}\\
&\le\sum_i\frac{u_i^2}{p_i}\sum_yK_{yi}
=g^F_p(u,u).
\end{aligned}
$$

二乗関数の厳密凸性から、各出力の等号はその出力へ正の確率で進む入力について $u_i/p_i$ が一定のとき、かつそのときに限ります。各行の差は非負なので全体の等号条件も同じです。
<!-- proof-end -->

**Fisher 計量が縮むこと**は、異なる入力方向が同じ出力変化へつぶされることを表します。たとえば先ほどの $p=(1/4,1/4,1/2)$ と $u=(a,a,-2a)$ では、同じ合流 $K$ のもとで

$$
Ku=(2a,-2a),\quad g^F_p(u,u)=4a^2+4a^2+8a^2=16a^2,
$$

$$
g^F_{Kp}(Ku,Ku)=\frac{(2a)^2}{1/2}+\frac{(-2a)^2}{1/2}=16a^2.
$$

ここでは第1・第2入力の相対変化がどちらも $4a$ であり、粗視化後にも変化の情報が失われません。

## 4. 情報単調な計量はなぜ Fisher だけか

前節は「Fisher 計量は情報単調」であることを証明しました。さらに「どんな確率的粗視化でも縮む」を **すべての有限状態数にわたり、互いに整合する計量族へ要求**すると、驚くべきことに Fisher 計量の定数倍しか残りません。これが有限単体における Čencov の定理の内容です。この特徴付けでは、計量の滑らかさを要求せず、各点での正定値性と分布に関する連続性だけを使います。

鍵となるのは、入力状態を細かく分割するものの、分割前の状態を確実に復元できる写像です。たとえば

$$
(p_1,p_2)\longmapsto(p_1/2,p_1/2,p_2)
$$

は、最初の二つを合算すれば元へ戻せます。細分化は見かけ上状態数を増やしますが、どの入力だったかについての情報は失いません。写像の合成を行列積で表すと、$R(Kp)=(RK)p$ です。したがって、$RK=I_n$ を確認すれば **すべての** 入力分布 $p$ と接方向 $u$ がそれぞれ $R(Kp)=p$、$R(Ku)=u$ と復元されます。$K$ が $m\times n$ なら復元側の $R$ は $n\times m$ です。

<a id="def-ig14-congruent-embedding"></a>

<!-- formal-statement-start -->
> **定義（復元可能な確率埋め込み）**  
> $n,m\ge2$ の正の有限確率単体の間で、Markov kernel $K$ がすべての正の入力を正の出力へ送り、別の Markov kernel $R$ が存在して

$$
RK=I_n
$$

> が成り立つとき、$K$ を **復元可能な確率埋め込み**（congruent Markov embedding）という。$R$ は元の入力分布を復元する確率写像である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig14-congruent-embedding -->
**定義の確認**。二つの入力を三つの出力へ分割する

$$
K=\begin{pmatrix}1/2&0\\1/2&0\\0&1\end{pmatrix},
\qquad R=\begin{pmatrix}1&1&0\\0&0&1\end{pmatrix}
$$

を取ります。$K,R$ はそれぞれ非負で列和が1、$Kp=(p_1/2,p_1/2,p_2)$ は正です。行列積を計算すると

$$
RK=\begin{pmatrix}1/2+1/2&0\\0&1\end{pmatrix}=I_2.
$$

したがって定義のすべての条件を満たします。任意の情報単調な計量族 $h$ では $K$ による縮小と $R$ による縮小を続けて使い、

$$
h_p(u,u)=h_{RKp}(RKu,RKu)
\le h_{Kp}(Ku,Ku)\le h_p(u,u)
$$

となるため、両端が一致し、**復元可能な写像では計量が保存**されます。
<!-- definition-example-end -->

<a id="thm-ig14-cencov"></a>

<!-- formal-statement-start -->
> **定理（Čencov の特徴付け：有限正単体の計量族）**  
> 各整数 $n\ge2$ の正の有限確率単体 $\Delta_{n-1}^{\circ}$ 上に連続な正定値 Riemann 計量 $h^{(n)}$ を与える。任意の $n,m\ge2$ と、正の入力を正の出力へ送るすべての Markov kernel $K:\mathbb R^n\to\mathbb R^m$ について、接ベクトル $u$ の長さが増えないと仮定する。このとき、状態数 $n$ と点 $p$ に依存しない定数 $c>0$ が存在し、すべての $n,p,u,v$ に対して

$$
h^{(n)}_p(u,v)=c\sum_{i=1}^n\frac{u_iv_i}{p_i}
=c\,g^F_p(u,v)
$$

> が成り立つ。逆に、任意の一定の $c>0$ による Fisher 計量族はこの情報単調性を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

1. 可逆な状態の並べ替えは計量を保存する。そこで全状態が等確率の分布では対称性が強く、接空間上の計量は $a_n\sum_i u_iv_i$ の形に限られます。
2. すべての状態を同じ数ずつ分割・復元すると、係数の関係 $a_{kn}=k a_n$ が得られ、$a_n=cn$ が決まります。
3. 成分が有理数の任意の正の分布は、座標 $i$ を分母に応じた個数へ等分すると、すべての成分が等しい分布へ移せます。その計量を引き戻すと $c\sum_i u_iv_i/p_i$ です。
4. 有理分布は正の単体内で稠密であり、計量の連続性により無理数成分へも結論が延びます。

<!-- proof-start -->
### 証明

**第1段（対称性）**。$e_i$ を $\mathbb R^n$ の標準基底、$\boldsymbol1=(1,\ldots,1)$ とし、等確率分布 $\bar p^{(n)}=(1/n,\ldots,1/n)$ を固定します。任意の座標置換 $P$ は列和1の確率行列で、逆置換 $P^{-1}$ も確率行列です。情報単調性を双方へ適用すると

$$
h^{(n)}_{\bar p^{(n)}}(Pu,Pv)
=h^{(n)}_{\bar p^{(n)}}(u,v)
$$

となります。二次形式の等号から双線形形式の等号が従うのは、$h(u,v)=[h(u+v,u+v)-h(u-v,u-v)]/4$ という偏極恒等式によります。

ここで $C=I_n-\boldsymbol1\boldsymbol1^{\mathsf T}/n$ と置きます。$Cx$ の成分和は0で、接ベクトル $u$ なら $Cu=u$ です。全空間上の双線形形式

$$
B(x,y)=h^{(n)}_{\bar p^{(n)}}(Cx,Cy)
$$

を作ります。$C$ は座標並べ替えを表す上記の行列 $P$ と可換なので $B(Px,Py)=B(x,y)$ です。したがって成分 $B(e_i,e_j)$ は対角 $i=j$ で共通値 $d$、非対角 $i\ne j$ で共通値 $e$ です。接ベクトルの成分和は0なので

$$
\begin{aligned}
h^{(n)}_{\bar p^{(n)}}(u,v)
&=B(u,v)\\
&=d\sum_i u_iv_i+e\sum_{i\ne j}u_iv_j\\
&=(d-e)\sum_i u_iv_i+e\Bigl(\sum_i u_i\Bigr)\Bigl(\sum_jv_j\Bigr)\\
&=a_n\sum_i u_iv_i,
\end{aligned}
$$

ただし $a_n=d-e>0$ です（非零の接ベクトルに対する正定値性）。

**第2段（状態数に依らない係数）**。任意の整数 $k\ge2$ について、各入力状態 $i$ を同じ確率 $1/k$ の $k$ 個の出力状態へ分割する $kn\times n$ 行列 $S$ を取ります。具体的には出力を $(i,j)$（$1\le j\le k$）と番号付けし、$S_{(i,j),i}=1/k$、他の成分を0にします。元の $i$ ごとの $k$ 状態を合算する行列を $R$ とすれば $RS=I_n$ であり、$S\bar p^{(n)}=\bar p^{(kn)}$ です。復元可能性から計量は保存され、

$$
\begin{aligned}
a_n\sum_i u_iv_i
&=h^{(kn)}_{\bar p^{(kn)}}(Su,Sv)\\
&=a_{kn}\sum_{i=1}^n\sum_{j=1}^k\frac{u_i}{k}\frac{v_i}{k}\\
&=\frac{a_{kn}}{k}\sum_i u_iv_i.
\end{aligned}
$$

非零の接ベクトルを取れば $a_{kn}=ka_n$ です。任意の $n,m\ge2$ に対して共通の状態数 $nm$ を考えると $a_{nm}=ma_n=na_m$ ですから

$$
\frac{a_n}{n}=\frac{a_m}{m}=:c>0.
$$

これで $a_N=cN$ がすべての $N\ge2$ について確定しました。

**第3段（有理数の分布）**。正の有理数成分からなる $p\in\Delta_{n-1}^{\circ}$ を取ります。共通分母 $N$ と正の整数 $k_1,\ldots,k_n$ を選び、

$$
p_i=\frac{k_i}{N},\qquad \sum_{i=1}^n k_i=N
$$

と書きます。入力状態 $i$ を $k_i$ 個の出力へ等分する行列 $S_p$ を作ると、$S_pp$ の $N$ 成分はすべて $1/N$ です。逆に各ブロックを合算する確率行列 $R_p$ が存在し $R_pS_p=I_n$ なので、計量は保存されます。接ベクトル $u$ の第 $i$ ブロックの各成分は $u_i/k_i$ となるため、

$$
\begin{aligned}
h^{(n)}_p(u,v)
&=h^{(N)}_{\bar p^{(N)}}(S_pu,S_pv)\\
&=cN\sum_{i=1}^n k_i\frac{u_i}{k_i}\frac{v_i}{k_i}\\
&=c\sum_i\frac{u_iv_i}{k_i/N}
=c\sum_i\frac{u_iv_i}{p_i}.
\end{aligned}
$$

**第4段（一般の正の分布）**。任意の $p\in\Delta_{n-1}^{\circ}$ に対して正の有理数成分の列 $p^{(r)}\to p$ を取れます。たとえば最初の $n-1$ 成分を十分近い正の有理数で近似し、最後を $1$ からそれらの和を引いて定めれば、最後も正で有理数になります。接空間 $\{u:\sum_i u_i=0\}$ は $p$ に依存しません。仮定した $h^{(n)}$ の連続性と $p_i>0$ から、固定した $u,v$ について

$$
h^{(n)}_p(u,v)=\lim_{r\to\infty}h^{(n)}_{p^{(r)}}(u,v)
=c\lim_{r\to\infty}\sum_i\frac{u_iv_i}{p_i^{(r)}}
=c\sum_i\frac{u_iv_i}{p_i}.
$$

逆向きは [Fisher 計量の縮小定理](#thm-ig14-fisher-monotonicity)の両辺を $c>0$ 倍すれば従います。これで特徴付けの両方向が証明できました。
<!-- proof-end -->

**射程を区別する**。この定理は「一つの固定された確率モデルで Fisher が唯一の計量」という主張ではありません。任意の有限状態数をまたぎ、すべての許された確率写像に対する縮小性を、互いに整合する計量族に同時に要求しています。したがって、個別の部分モデルに制限した写像だけを許す場合や、零確率を含む境界、連続標本空間、無限次元モデル、量子状態空間へ、この証明を条件なしで適用することはできません。有限単体での定理の強さは、**状態を分割して全成分が等しい確率ベクトルへ移せる**ことに由来します。

また、復元可能な埋め込みでの計量の不変性だけを仮定しても、上の証明の第1〜4段はそのまま進みます。すべての Markov kernel に対する単調性は、より広い仮定ですが、復元可能な埋め込みの不変性を自動的に含みます。

## 5. 多数の divergence と、ただ一つの局所計量

Čencov の定理が特徴付けるのは **Riemann 計量族**であり、二点間の divergence そのものではありません。異なる divergence が情報単調で、かつ同じ Fisher 計量を二次項として持つことは可能です。

[IG3 で定義した $f$-divergence](../IG3/index.md#def-ig3-f-divergence)は、凸関数 $f:(0,\infty)\to\mathbb R$ と $f(1)=0$ に対して

$$
D_f(p\Vert q)=\sum_iq_i f\!\left(\frac{p_i}{q_i}\right)
$$

です。$p,q$ は共に正で、$f$ は凸とします。KL は $f(t)=t\log t$ に対応します。$\alpha$ によって形を変える具体例も用意します。ここで $\alpha$ は divergence の種類を指定する実数の添字で、分布の成分番号 $i$ や、後で微小変位に使う実数 $t$ とは別です。

<a id="def-ig14-alpha-divergence"></a>

<!-- formal-statement-start -->
> **定義（有限正分布の α-divergence）**  
> $p,q\in\Delta_{n-1}^{\circ}$、$\alpha\in\mathbb R\setminus\{-1,1\}$ とする。本講では

$$
D_\alpha(p\Vert q)=\frac{4}{1-\alpha^2}
\left(1-\sum_{i=1}^np_i^{(1+\alpha)/2}q_i^{(1-\alpha)/2}\right)
$$

> と定める。$\alpha=1$ および $\alpha=-1$ では連続延長によりそれぞれ $D_{\mathrm{KL}}(p\Vert q)$、$D_{\mathrm{KL}}(q\Vert p)$ と定める。この引数順と符号規約を固定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig14-alpha-divergence -->
**定義の確認**。$\alpha=0$ を直接代入すれば

$$
D_0(p\Vert q)=4\left(1-\sum_i\sqrt{p_iq_i}\right).
$$

たとえば $p=(1/2,1/2)$ と $q=(1/2,1/2)$ なら和は1で $D_0=0$ です。$p=(1/4,3/4)$、$q=(3/4,1/4)$ なら和は $2\sqrt3/4=\sqrt3/2$ で、$D_0=4-2\sqrt3>0$ です。$\alpha=0$ では対称ですが、一般の $\alpha$ では引数の交換により $D_\alpha(q\Vert p)=D_{-\alpha}(p\Vert q)$ となります。
<!-- definition-example-end -->

<a id="thm-ig14-f-divergence-processing"></a>

<!-- formal-statement-start -->
> **定理（f-divergence の情報単調性と局所 Fisher 計量）**  
> $p,q\in\Delta_{n-1}^{\circ}$、$K$ を正の出力を持つ Markov kernel とし、$f:(0,\infty)\to\mathbb R$ を凸関数で $f(1)=0$ とする。このとき

$$
D_f(Kp\Vert Kq)\le D_f(p\Vert q).
$$

> さらに $f$ が1の近傍で二回連続微分可能なら、接ベクトル $u$ と十分小さい実数 $t$ について

$$
D_f(p+tu\Vert p)
=\frac{f''(1)}2t^2 g^F_p(u,u)+o(t^2).
$$

> 上で定義した $D_\alpha$ は全 $\alpha\in\mathbb R$ で情報単調で、すべて $f''(1)=1$ に対応し、二次項は $\tfrac12t^2g^F_p(u,u)$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

出力 $y$ ごとに $q$ を基準とする重みを作ると、出力の比 $(Kp)_y/(Kq)_y$ は入力の比 $p_i/q_i$ の平均です。そこへ凸関数 $f$ を適用します。微小摂動の二次項では $f(1)$ は0、一次項は $\sum_i u_i=0$ で消えます。$\alpha$-divergence の生成関数は二階微分が正です。

<!-- proof-start -->
### 証明

$s_y=(Kq)_y>0$ に対して $K_{yi}>0$ の入力へ $v_{i|y}=K_{yi}q_i/s_y$ を置くと $\sum_i v_{i|y}=1$ です。比の平均は

$$
\sum_i v_{i|y}\frac{p_i}{q_i}
=\frac{\sum_iK_{yi}p_i}{s_y}
=\frac{(Kp)_y}{(Kq)_y}.
$$

二点の凸性を有限個の正の重みへ帰納的に適用した不等式（第2節と同じ有限重みの議論）より

$$
s_y f\!\left(\frac{(Kp)_y}{s_y}\right)
\le s_y\sum_i v_{i|y}f\!\left(\frac{p_i}{q_i}\right)
=\sum_iK_{yi}q_i f\!\left(\frac{p_i}{q_i}\right).
$$

$y$ で和を取り、列和を使えば第1の不等式が得られます。

次に $t$ を十分小さくしてすべての $p_i+tu_i>0$ とします。各成分について $f$ を $1$ で二次 Taylor 展開し、有限和を取ると

$$
\begin{aligned}
D_f(p+tu\Vert p)
&=\sum_i p_i\left[f(1)+f'(1)\frac{tu_i}{p_i}
+\frac{f''(1)}2\frac{t^2u_i^2}{p_i^2}+o(t^2)\right]\\
&=f'(1)t\sum_i u_i+\frac{f''(1)}2t^2\sum_i\frac{u_i^2}{p_i}+o(t^2)\\
&=\frac{f''(1)}2t^2g^F_p(u,u)+o(t^2).
\end{aligned}
$$

$\alpha\ne\pm1$ では $\beta=(1+\alpha)/2$ と置き、$\beta(1-\beta)=(1-\alpha^2)/4$ より

$$
f_\alpha(z)=\frac{1-z^\beta}{\beta(1-\beta)},
\quad f_\alpha''(z)=z^{\beta-2}>0,\quad f_\alpha(1)=0.
$$

$z=p_i/q_i$ として $q_i z^\beta=p_i^\beta q_i^{1-\beta}$ を用いれば、

$$
\begin{aligned}
D_{f_\alpha}(p\Vert q)
&=\sum_iq_i\,\frac{1-(p_i/q_i)^\beta}{\beta(1-\beta)}\\
&=\frac{1-\sum_i p_i^\beta q_i^{1-\beta}}{\beta(1-\beta)}
=D_\alpha(p\Vert q)
\end{aligned}
$$

です。よって $D_\alpha$ は情報単調、かつ $f_\alpha''(1)=1$ です。

端点の引数順も有限和から確かめます。$\beta=1-\varepsilon$（$\varepsilon\downarrow0$）と置くと、$z^{1-\varepsilon}=z(1-\varepsilon\log z+o(\varepsilon))$ で、$\sum_iq_i z=\sum_i p_i=1$ だから

$$
\begin{aligned}
1-\sum_iq_i z^{1-\varepsilon}
&=\varepsilon\sum_i p_i\log\frac{p_i}{q_i}+o(\varepsilon),\\
\beta(1-\beta)&=(1-\varepsilon)\varepsilon.
\end{aligned}
$$

したがって $\alpha\to1$ で $D_\alpha(p\Vert q)\to D_{\mathrm{KL}}(p\Vert q)$ です。逆に $\beta=\varepsilon\downarrow0$ では $z^\varepsilon=1+\varepsilon\log z+o(\varepsilon)$ と $\sum_iq_i=1$ より

$$
\frac{1-\sum_iq_i z^\varepsilon}{\varepsilon(1-\varepsilon)}
=-\sum_iq_i\log\frac{p_i}{q_i}+o(1)
\longrightarrow D_{\mathrm{KL}}(q\Vert p).
$$

これは $\alpha\to-1$ に対応します。各 $p_i,q_i>0$ で状態数が有限なので、各項の展開を足して極限を取れます。端点の生成関数 $z\log z$ と $-\log z$ も、ともに二階微分が $z=1$ で1です。
<!-- proof-end -->

ここから分かるのは、「KL と α-divergence が同じ値を取る」ことではありません。**同じ局所 Fisher 計量を共有していても、離れた二分布を比較する値や非対称性は異なる**ということです。Čencov の一意性と、多様な情報単調 divergence の存在は矛盾しません。

## 6. 演習

### IG14-A01 確率行列と接ベクトル

$K=\begin{pmatrix}1&1/3&0\\0&2/3&1\end{pmatrix}$、$p=(1/2,1/3,1/6)$、$u=(1,-1,0)$ とする。$K$ が Markov kernel であること、$Kp$ が正の確率分布で $Ku$ が接ベクトルであることを示せ。

- Level: A
- 狙い: 確率行列の列和と接空間の保存
<!-- solution-start -->
**詳細解答**

全成分は非負で、列和は順に $1,1/3+2/3=1,1$ です。したがって [Markov kernel の定義](#def-ig14-markov-kernel)を満たします。行列積は

$$
Kp=(1/2+1/9,\ 2/9+1/6)=(11/18,7/18).
$$

各成分は正で和が1です。$u$ の成分和は0、出力は

$$
Ku=(1-1/3,-2/3)=(2/3,-2/3)
$$

で和が0なので、出力単体の接ベクトルです。
<!-- solution-end -->

### IG14-A02 KL の厳密な減少

$p=(3/4,1/4)$、$q=(1/4,3/4)$ を $K=(1,1)$ で一状態へまとめる。入力と出力の KL divergence を求め、等号条件が成立しないことを説明せよ。

- Level: A
- 狙い: データ処理不等式の最小の反例・等号判定
<!-- solution-start -->
**詳細解答**

入力では

$$
D_{\mathrm{KL}}(p\Vert q)=\frac34\log3+\frac14\log\frac13=\frac12\log3.
$$

出力は $Kp=Kq=(1)$ なので KL は $1\log1=0$ です。唯一の出力へ両入力が寄与しますが、その比は $3$ と $1/3$ で異なります。[データ処理不等式の等号条件](#thm-ig14-data-processing)が破れ、厳密に減少します。
<!-- solution-end -->

### IG14-A03 Fisher 計量の厳密な縮小

$p=(1/4,1/4,1/2)$、$u=(1,-1,0)$ とし、$K=\begin{pmatrix}1&1&0\\0&0&1\end{pmatrix}$ で粗視化する。入力と出力で Fisher 計量による $u$ の長さの二乗を比較せよ。

- Level: A
- 狙い: 観測で消える接方向を直接計算する
<!-- solution-start -->
**詳細解答**

$\sum_i u_i=0$ なので接ベクトルです。入力での長さは [Fisher--Rao 計量](../IG2/index.md#def-ig2-fisher-rao-metric)により

$$
g^F_p(u,u)=\frac{1^2}{1/4}+\frac{(-1)^2}{1/4}+\frac{0^2}{1/2}=8.
$$

一方 $Kp=(1/2,1/2)$、$Ku=(0,0)$ なので出力での長さは0です。二つの入力方向が合流して変化が消えることが、厳密な縮小の理由です。
<!-- solution-end -->

### IG14-A04 分割・復元する確率写像

$K=\begin{pmatrix}1/3&0\\2/3&0\\0&1\end{pmatrix}$ とする。列和を確認し、確率行列 $R$ で $RK=I_2$ を満たすものを作れ。$p=(2/5,3/5)$ の分割後の分布を求めよ。

- Level: A
- 狙い: 復元可能な確率埋め込みの条件を具体的に確かめる
<!-- solution-start -->
**詳細解答**

$K$ の列和は $1/3+2/3=1$ と $1$ です。出力1と2は入力1に、出力3は入力2に戻すので

$$
R=\begin{pmatrix}1&1&0\\0&0&1\end{pmatrix},\qquad
RK=\begin{pmatrix}1/3+2/3&0\\0&1\end{pmatrix}=I_2.
$$

$R$ も列和1で非負です。任意の正の入力 $p=(p_1,p_2)$ に対して $Kp=(p_1/3,2p_1/3,p_2)$ の全成分は正で、和は $p_1+p_2=1$ です。指定された $p=(2/5,3/5)$ では $Kp=(2/15,4/15,3/5)$、和は $2/15+4/15+9/15=1$ となります。よって [復元可能な確率埋め込み](#def-ig14-congruent-embedding)の全称条件まで確認できました。
<!-- solution-end -->

### IG14-A05 α-divergence の規約

正の分布 $p=(1/4,3/4)$ と $q=(3/4,1/4)$ について、$D_0(p\Vert q)$ を求めよ。また本講の規約で $D_1$ と $D_{-1}$ はどちら向きの KL に対応するか答えよ。

- Level: A
- 狙い: α=0 の値と両端点の引数順を混同しない
<!-- solution-start -->
**詳細解答**

$\alpha=0$ の定義式へ代入すると

$$
\sum_i\sqrt{p_iq_i}=\sqrt{3/16}+\sqrt{3/16}=\frac{\sqrt3}{2},
$$

$$
D_0(p\Vert q)=4\left(1-\frac{\sqrt3}{2}\right)=4-2\sqrt3.
$$

[本講の α-divergence の定義](#def-ig14-alpha-divergence)では $D_1(p\Vert q)=D_{\mathrm{KL}}(p\Vert q)$、$D_{-1}(p\Vert q)=D_{\mathrm{KL}}(q\Vert p)$ です。$\alpha$ の符号と KL の向きは定義で固定した通りです。
<!-- solution-end -->

### IG14-B01 非可逆な粗視化で KL が保存される条件

$K=\begin{pmatrix}1&1&0\\0&0&1\end{pmatrix}$、$p=(1/6,1/6,2/3)$、$q=(1/4,1/4,1/2)$ とする。$p\ne q$ だが $D_{\mathrm{KL}}(Kp\Vert Kq)=D_{\mathrm{KL}}(p\Vert q)$ を、式を計算して示せ。また等号条件を確認せよ。

- Level: B
- 狙い: 非可逆性だけから厳密減少を結論しない
<!-- solution-start -->
**詳細解答**

$Kp=(1/3,2/3)$、$Kq=(1/2,1/2)$ です。出力の KL は

$$
D_{\mathrm{KL}}(Kp\Vert Kq)
=\frac13\log\frac23+\frac23\log\frac43.
$$

入力については第1・第2成分を別々に書いてからまとめると

$$
\begin{aligned}
D_{\mathrm{KL}}(p\Vert q)
&=\frac16\log\frac{1/6}{1/4}
+\frac16\log\frac{1/6}{1/4}
+\frac23\log\frac{2/3}{1/2}\\
&=\frac13\log\frac23+\frac23\log\frac43.
\end{aligned}
$$

出力1での入力比は $p_1/q_1=p_2/q_2=2/3$ と一定、出力2は入力3だけです。したがって [KL の等号条件](#thm-ig14-data-processing)を満たします。
<!-- solution-end -->

### IG14-B02 Fisher 計量の等号方向

$K=\begin{pmatrix}1&1&0\\0&0&1\end{pmatrix}$、$p=(1/4,1/4,1/2)$ とする。$u=(a,b,-a-b)$ が Fisher 計量の縮小で等号となるための $a,b\in\mathbb R$ の条件を求め、等号時の両辺を計算せよ。

- Level: B
- 狙い: 接ベクトルの比から等号条件を構成する
<!-- solution-start -->
**詳細解答**

第1・第2入力は出力1へ合流するので、[縮小定理の等号条件](#thm-ig14-fisher-monotonicity)は

$$
\frac{a}{1/4}=\frac{b}{1/4},\quad\text{すなわち}\quad a=b.
$$

これが必要十分です。そのとき $u=(a,a,-2a)$、$Ku=(2a,-2a)$、$Kp=(1/2,1/2)$ であり、

$$
g^F_p(u,u)=4a^2+4a^2+\frac{4a^2}{1/2}=16a^2,
$$

$$
g^F_{Kp}(Ku,Ku)=\frac{4a^2}{1/2}+\frac{4a^2}{1/2}=16a^2.
$$

この計算で、等号条件が十分でもあることを直接確かめました。
<!-- solution-end -->

### IG14-B03 Čencov の係数を三状態へ伝える

正の各有限単体に情報単調な計量族 $h^{(n)}$ が与えられ、二状態の等確率分布の接空間で $h^{(2)}_{(1/2,1/2)}(u,u)=2c\sum_i u_i^2$ と分かっている（$c>0$）。座標の入れ替えによる対称性を使い、六状態の等確率分布での係数 $a_6$ を求めよ。さらに $p=(1/3,2/3)$、$u=(t,-t)$ での $h^{(2)}_p(u,u)$ を分割・復元から導け。

- Level: B
- 狙い: 等確率分布の係数と有理点への引き戻しを再構成する
<!-- solution-start -->
**詳細解答**

一様な $n$ 状態では置換対称性により $h^{(n)}(v,v)=a_n\sum_i v_i^2$ の形です。二状態の各成分を3等分する復元可能な写像 $S$ を使うと、$a_2=2c$ で

$$
a_2\sum_i u_i^2=a_6\sum_{i=1}^2\sum_{j=1}^3(u_i/3)^2
=\frac{a_6}{3}\sum_i u_i^2.
$$

したがって $a_6=3a_2=6c$ です。$p=(1/3,2/3)$ の第1成分を2個、第2成分を4個に等分すれば六状態の等確率分布となり、接ベクトルの分割成分は $(t/2,t/2,-t/4,-t/4,-t/4,-t/4)$ です。よって

$$
\begin{aligned}
h^{(2)}_p(u,u)
&=6c\left(2\frac{t^2}{4}+4\frac{t^2}{16}\right)\\
&=6c\left(\frac12+\frac14\right)t^2
=\frac92 ct^2.
\end{aligned}
$$

また $c[t^2/(1/3)+t^2/(2/3)]=(3+3/2)ct^2=9ct^2/2$ となり、[特徴付け定理](#thm-ig14-cencov)の式と一致します。
<!-- solution-end -->

### IG14-B04 α-divergence の二次係数

$p=(r,1-r)$（$0<r<1$）、$u=(s,-s)$ とする。$\alpha=0$ の divergence $D_0(p+tu\Vert p)$ を $t=0$ の近くで二次まで展開し、[Fisher 計量](../IG2/index.md#def-ig2-fisher-rao-metric)との関係を導け。必要に応じて $\sqrt{1+z}=1+z/2-z^2/8+o(z^2)$ を使ってよい。

- Level: B
- 狙い: 同じ局所計量が異なる divergence から得られることを手で検算する
<!-- solution-start -->
**詳細解答**

$|t|$ を十分小さくして $r+ts>0$、$1-r-ts>0$ とします。定義から

$$
D_0(p+tu\Vert p)
=4\left[1-r\sqrt{1+ts/r}-(1-r)\sqrt{1-ts/(1-r)}\right].
$$

問題文の Taylor 展開をそれぞれ $z=ts/r$、$z=-ts/(1-r)$ へ適用すると

$$
\begin{aligned}
r\sqrt{1+ts/r}&=r+\frac{ts}{2}-\frac{t^2s^2}{8r}+o(t^2),\\
(1-r)\sqrt{1-ts/(1-r)}&=(1-r)-\frac{ts}{2}-\frac{t^2s^2}{8(1-r)}+o(t^2).
\end{aligned}
$$

定数は1、一次項は相殺されます。したがって

$$
D_0(p+tu\Vert p)
=\frac{t^2s^2}{2}\left(\frac1r+\frac1{1-r}\right)+o(t^2)
=\frac{t^2}{2}g^F_p(u,u)+o(t^2).
$$

ここで $g^F_p(u,u)=s^2/r+s^2/(1-r)$ を [定義](../IG2/index.md#def-ig2-fisher-rao-metric)から計算しました。
<!-- solution-end -->

### IG14-C01 データ処理・計量・特徴付けを一つにつなぐ

入力は3状態で、$K=\begin{pmatrix}1&1&0\\0&0&1\end{pmatrix}$ とする。$p=(1/4,1/4,1/2)$、$q=(1/2,1/4,1/4)$ と、接ベクトル $u=(a,b,-a-b)$ を考える。

1. $D_{\mathrm{KL}}(Kp\Vert Kq)$ と $D_{\mathrm{KL}}(p\Vert q)$ を式で求め、厳密不等号となる理由を等号条件から示せ。
2. $g^F_p(u,u)-g^F_{Kp}(Ku,Ku)$ を因数分解し、等号となる接方向を求めよ。
3. もしすべての有限状態数を通じた連続な正定値計量族が任意の Markov kernel で単調なら、その計量はどの形に限られるか。第2問の厳密不等号が、その特徴付けと矛盾しない理由を述べよ。

- Level: C
- 狙い: 有限状態の KL・Fisher・Čencov の三つの主結果を接続する
<!-- solution-start -->
**詳細解答**

**(1) KL の比較。** $Kp=(1/2,1/2)$、$Kq=(3/4,1/4)$ ですから

$$
D_{\mathrm{KL}}(Kp\Vert Kq)
=\frac12\log\frac{1/2}{3/4}+\frac12\log\frac{1/2}{1/4}
=\frac12\log\frac43.
$$

入力では

$$
\begin{aligned}
D_{\mathrm{KL}}(p\Vert q)
&=\frac14\log\frac{1/4}{1/2}
+\frac14\log\frac{1/4}{1/4}
+\frac12\log\frac{1/2}{1/4}\\
&=-\frac14\log2+0+\frac12\log2
=\frac14\log2.
\end{aligned}
$$

比較すると $\frac14\log2-\frac12\log(4/3)>0$ です。実際に $2>(4/3)^2=16/9$ なので正です。出力1に寄与する入力比は $p_1/q_1=1/2$ と $p_2/q_2=1$ で異なり、[KL の等号条件](#thm-ig14-data-processing)からも厳密不等号が確認できます。

**(2) Fisher の差。** 入力では $u_3=-a-b$ を代入して

$$
g^F_p(u,u)=4a^2+4b^2+2(a+b)^2.
$$

出力では $Ku=(a+b,-a-b)$、$Kp=(1/2,1/2)$ なので

$$
g^F_{Kp}(Ku,Ku)=\frac{(a+b)^2}{1/2}+\frac{(a+b)^2}{1/2}=4(a+b)^2.
$$

したがって

$$
\begin{aligned}
g^F_p(u,u)-g^F_{Kp}(Ku,Ku)
&=4a^2+4b^2-2(a+b)^2\\
&=2(a-b)^2\ge0.
\end{aligned}
$$

等号は $a=b$ のとき、かつそのときに限ります。このとき最初の二入力の相対変化はともに $4a$ であり、[Fisher 縮小定理](#thm-ig14-fisher-monotonicity)の等号条件にも一致します。

**(3) 一意性と縮小は別の性質。** [Čencov の特徴付け](#thm-ig14-cencov)から、共通定数 $c>0$ を用いて

$$
h^{(n)}_p(u,v)=c\sum_i\frac{u_iv_i}{p_i}
$$

に限られます。特徴付けは「計量の種類が一意」であって、「どの確率写像も長さを保存する」とは主張しません。第2問の $a\ne b$ での厳密減少は、まさにこの唯一の計量が非可逆な粗視化で長さを失う例です。
<!-- solution-end -->

## 7. 本講のまとめ

- Markov kernel は、状態の合流だけでなく確率的な分岐も記述します。KL divergence はどの有限確率写像でも増えず、等号か厳密減少かは入力の尤度比で判定できます。
- Fisher--Rao 計量も単調に縮み、等号条件は接ベクトルの相対変化 $u_i/p_i$ が同じ出力内で一定であることです。
- 有限の**全**正確率単体に整合する計量族へこの単調性を要求すると、[本講の Čencov 特徴付け](#thm-ig14-cencov)により共通の正定数倍の Fisher 計量に限られます。
- $f$-divergence や $\alpha$-divergence は大域的には複数ありますが、局所の二次項には Fisher 計量が現れます。有限モデルのこの証明だけで、零確率境界・連続・無限次元・量子状態の一般論を結論しないことが大切です。
