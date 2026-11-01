# HOD1-11 Hard Lefschetz定理

<!-- definition-example-audit: strict -->

## 1. 点ごとの同型が、そのまま位相の同型になるだろうか

[点ごとのLefschetz同型](../HOD1-03/index.md#thm-hod1-03-pointwise-isomorphism)では、複素次元 $n$ のHermiteベクトル空間で $0\le k\le n$ に対し、基本2形式の外積 $L=\omega\wedge(-)$ が

$$
L^{n-k}:\bigwedge^kT_x^*X\otimes_{\mathbb R}\mathbb C
\xrightarrow{\ \cong\ }
\bigwedge^{2n-k}T_x^*X\otimes_{\mathbb R}\mathbb C
$$

を与えることを証明した。ところが、各点で形式を一対一に移せることと、**閉形式を完全形式で割った後にも一対一に移せること**は別である。点ごとの逆写像が一般の閉形式を閉形式へ戻す保証はない。

前章の[調和代表とLefschetz作用の定理](../HOD1-10/index.md#thm-hod1-10-harmonic-lefschetz)によって、Kähler基本形式の $L$ は調和形式を調和形式へ写し、コホモロジー上では $[\omega]_d$ との積に一致する。残る問いは、**目標次数の調和形式をすべて得られるか**である。

本章の基本設定を固定する。$X$ は複素次元 $n\ge1$ の滑らか・コンパクト・境界なしのKähler多様体、$\omega$ はその基本形式とする。$X$ の連結性は仮定しない。形式は滑らかな複素係数形式で、$L^2$ 内積は第一変数を共役線形とする。次数範囲外の形式・コホモロジー群は零とする。

記号 $\mathcal H^k(X)=\ker(\Delta_d:\Omega^k(X;\mathbb C)\to\Omega^k(X;\mathbb C))$ は $k$ 次の調和形式の空間、$\Lambda=L^*$ は[点ごとの随伴](../HOD1-02/index.md#def-hod1-02-lambda)である。[Hodge–de Rham同型](../../GA/GA6/index.md#thm-ga6-hodge-de-rham)により

$$
\Phi_k:\mathcal H^k(X)\xrightarrow{\ \cong\ }H_{\mathrm{dR}}^k(X;\mathbb C),
\qquad h\longmapsto[h]_d
$$

であり、両辺は有限次元となる。コホモロジー上の作用を $L_H([\alpha]_d)=[\omega]_d\smile[\alpha]_d$ と書く。この $[\omega]_d$ は**基本形式そのものの類**であって、$[\omega/(2\pi)]_d$ へ勝手に置き換えない。

以後、対象の多様体が明らかなときは、複素係数de Rham群を

$$
H^j(X):=H_{\mathrm{dR}}^j(X;\mathbb C)
$$

と略記する。また $L_H^r$ は上記の類上の作用の $r$ 回の合成（$r=0$ は恒等写像）とする。

## 2. 調和形式の空間でも高冪が同型になる

点ごとの同型の単射部分は簡単に使える。$L^{n-k}h=0$ が形式として成り立てば、各点での同型性から $h_x=0$ となる。一方、全射を「点ごとの逆写像を掛ける」とだけ済ませると、その逆写像が調和性を保存する理由を説明していない。

ここでは随伴の $\Lambda$ を使う。前章の[調和形式上の三作用素](../HOD1-10/index.md#prop-hod1-10-harmonic-sl2)と[Laplacian可換性](../HOD1-05/index.md#thm-hod1-05-laplacian-lefschetz)は

$$
L:\mathcal H^j\to\mathcal H^{j+2},
\qquad
\Lambda:\mathcal H^{j+2}\to\mathcal H^j
$$

を保証する。特に両者の任意の非負整数冪も調和性を保つ。$L$ と $\Lambda$ は点ごとに随伴だから、コンパクトな $X$ 上で積分した $L^2$ 内積についても互いに随伴である。

<a id="prop-hod1-11-harmonic-isomorphism"></a>

<!-- formal-statement-start -->
> **命題（調和空間上のLefschetz同型）**  
> $X$ を滑らか・コンパクト・境界なしの複素次元 $n\ge1$ のKähler多様体とする。基本形式を $\omega$、$L=\omega\wedge(-)$、$\Lambda=L^*$ とする。任意の整数 $0\le k\le n$ について

$$
T_k=L^{n-k}:\mathcal H^k(X)\xrightarrow{\ \cong\ }\mathcal H^{2n-k}(X)
$$

> は複素線形同型である。単射・全射のいずれにもPoincaré双対性を仮定する必要はない。
<!-- formal-statement-end -->

### 証明の見取り図

単射には[点ごとのLefschetz同型](../HOD1-03/index.md#thm-hod1-03-pointwise-isomorphism)を使う。全射には、もし $T_k$ の像と直交する調和形式 $\eta$ があれば、$T_k$ の随伴である $\Lambda^{n-k}$ によって $\eta$ を元の調和空間へ戻し、$\eta$ 自身が零になることを示す。最後に有限次元性から全射を得る。

<!-- proof-start -->
### 証明

$m=n-k\ge0$ と置く。[Laplacianとの可換性](../HOD1-05/index.md#thm-hod1-05-laplacian-lefschetz)を繰り返すと、任意の $h\in\mathcal H^k$ と $\eta\in\mathcal H^{2n-k}$ に対し

$$
\Delta_d(L^mh)=L^m\Delta_dh=0,\qquad
\Delta_d(\Lambda^m\eta)=\Lambda^m\Delta_d\eta=0.
$$

従って $T_k$ と、その随伴の候補 $\Lambda^m$ はそれぞれ所定の調和空間へ写る。$m=0$ ではどちらも恒等写像であり、以下の議論にも含まれる。

**単射。** $T_kh=L^mh=0$ とする。任意の点 $x$ において $h_x$ は次数 $k$ の複素外積代数の元である。[点ごとの同型](../HOD1-03/index.md#thm-hod1-03-pointwise-isomorphism)を $m=n-k$ として適用すると、$L_x^mh_x=0$ から $h_x=0$。すべての点で零だから $h=0$ である。

**全射。** まず $T_k(\mathcal H^k)$ に直交する $\eta\in\mathcal H^{2n-k}$ を取る。つまり全ての $h\in\mathcal H^k$ に対して $\langle T_kh,\eta\rangle_{L^2}=0$ とする。$L^*=\Lambda$ を $m$ 回適用すると

$$
0=\langle L^mh,\eta\rangle_{L^2}
=\langle h,\Lambda^m\eta\rangle_{L^2}.
$$

ここで $h=\Lambda^m\eta$ と選べる。これは上で確かめた通り **次数 $k$ の調和形式** だからである。この代入で

$$
0=\langle\Lambda^m\eta,\Lambda^m\eta\rangle_{L^2}
=\|\Lambda^m\eta\|_{L^2}^2.
$$

正定値性と滑らかさから $\Lambda^m\eta=0$ が全点で成立する。各点の複素化された外積空間を

$$
\mathcal A_x^j:=\bigwedge^jT_x^*X\otimes_{\mathbb R}\mathbb C
$$

と書く。[点ごとの同型](../HOD1-03/index.md#thm-hod1-03-pointwise-isomorphism)による $L_x^m:\mathcal A_x^k\to\mathcal A_x^{2n-k}$ は有限次元内積空間の同型であり、その随伴 $\Lambda_x^m:\mathcal A_x^{2n-k}\to\mathcal A_x^k$ も同型である（逆写像の随伴を取れば逆になる）。よって $\eta_x=0$、すなわち $\eta=0$。

こうして $\operatorname{im}T_k$ の直交補空間は零である。[閉多様体のHodge–de Rham同型](../../GA/GA6/index.md#thm-ga6-hodge-de-rham)から $\mathcal H^{2n-k}(X)$ は有限次元なので

$$
\mathcal H^{2n-k}(X)
=\operatorname{im}T_k\oplus
(\operatorname{im}T_k)^\perp
=\operatorname{im}T_k.
$$

従って全射である。単射と合わせて同型を得た。$\square$
<!-- proof-end -->

この証明の大事な違いは、**点ごとの同型**を単射と随伴の非退化性に使い、**Kähler上の可換性**を $\Lambda^m\eta$ が調和であることに使い、**コンパクト性**を有限次元の直交分解に使った点にある。三つを同じ仮定として混ぜてはいけない。

## 3. いよいよコホモロジーへ移す

調和空間で同型が得られた。次は、それが本当に $[\omega]_d$ の積として定義された写像であることを確認する。[調和代表とコホモロジー上の作用](../HOD1-10/index.md#thm-hod1-10-harmonic-lefschetz)から、任意の調和形式 $h$ と非負整数 $r$ について

$$
\Phi_{k+2r}(L^rh)
=[\omega^r\wedge h]_d
=[\omega]_d^r\smile[h]_d
=L_H^r\Phi_k(h)
$$

が成り立つ。$L^r h$ が調和的であることと、外積が正しく類の積を表すことの両方を既に確認済みである。

<a id="thm-hod1-11-hard-lefschetz"></a>

<!-- formal-statement-start -->
> **定理（Hard Lefschetz定理）**  
> $X$ を滑らか・コンパクト・境界なしの複素次元 $n\ge1$ のKähler多様体とし、$\omega$ を基本形式、$[\omega]_d\in H_{\mathrm{dR}}^2(X;\mathbb C)$ をそのde Rham類とする。$0\le k\le n$ の各整数に対し

$$
L_H^{n-k}:H_{\mathrm{dR}}^k(X;\mathbb C)
\xrightarrow{\ \cong\ }
H_{\mathrm{dR}}^{2n-k}(X;\mathbb C),
\qquad
[\alpha]_d\longmapsto[\omega]_d^{n-k}\smile[\alpha]_d
$$

> は複素線形同型である。$k=n$ では零乗なので恒等写像となる。
<!-- formal-statement-end -->

### 証明の見取り図

各類の一意な調和代表を取り、[調和空間上の同型](#prop-hod1-11-harmonic-isomorphism)を作用させる。この操作を[Hodge–de Rham同型](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)で元に戻すと、前章で示した $[\omega]$ との積と一致する。単射・全射のどちらがどこで使われるかも別々に見る。

<!-- proof-start -->
### 証明

$m=n-k$ と書く。Hodge–de Rham同型を $\Phi_j:\mathcal H^j\to H_{\mathrm{dR}}^j$ とする。[前章の互換性](../HOD1-10/index.md#thm-hod1-10-harmonic-lefschetz)を $r=m$ に適用すると、調和 $h$ に対して

$$
L_H^m(\Phi_k(h))
=L_H^m([h]_d)
=[\omega^m\wedge h]_d
=\Phi_{2n-k}(L^m h).
$$

すなわち、写像として

$$
L_H^m=\Phi_{2n-k}\circ
(L^m|_{\mathcal H^k})\circ\Phi_k^{-1}.
$$

右辺は[調和空間上のLefschetz同型](#prop-hod1-11-harmonic-isomorphism)と二つのHodge–de Rham同型との合成だから、同型である。

**単射を直接確かめる。** $L_H^m[\alpha]_d=0$ とし、$[\alpha]_d=[h]_d$ をその一意な調和代表で表す。上の式より $[L^mh]_d=0$ である。$L^mh$ は調和であり、零de Rham類の調和代表は零（[Hodge–de Rhamの一意性](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)）だから $L^mh=0$。命題の単射性から $h=0$、よって $[\alpha]_d=0$。

**全射を直接確かめる。** 目標次数の任意の類 $[\beta]_d$ を取り、その一意な調和代表を $\eta$ とする。命題の全射性により $L^mh=\eta$ を満たす調和 $k$ 形式 $h$ が存在する。すると

$$
L_H^m[h]_d=[\omega^m\wedge h]_d
=[L^mh]_d=[\eta]_d=[\beta]_d.
$$

これで単射と全射がそれぞれ確認できた。Poincaré双対性は使用していない。$\square$
<!-- proof-end -->

この定理は積を定める類が $[\omega]_d$ であることを含む。任意の閉2形式の類で同じ結論を主張するわけではない。閉性は類上の作用を可能にするが、証明で必要な **Kähler計量のLaplacianと $L,\Lambda$ の可換性** を一般の閉2形式からは得られない。

## 4. 複素型ごとに見ると、どことどこが結ばれるか

[Kähler–Hodge分解](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)では、全次数 $k$ の調和形式は $p+q=k$ の $(p,q)$ 型の直和になる。[Hodge型部分空間の定義](../HOD1-06/index.md#def-hod1-06-hodge-summand)に従い、本章では de Rham コホモロジー内の型部分空間を

$$
H^{p,q}(X):=H_{\mathrm{Hdg}}^{p,q}(X)\subset H^{p+q}(X)
$$

と略記する。これは Dolbeault 群 $H_{\bar\partial}^{p,q}(X)$ と最初から同じ集合であるという意味ではなく、調和代表を通した同型で結ばれる別の対象である。

さらに[基本形式による型の移動](../HOD1-10/index.md#prop-hod1-10-hodge-type-shift)は、$L$ が両添字をそれぞれ1ずつ増やすことを述べていた。

$m=n-k$ 回作用させたとき、出発型 $(p,q)$ の行先は

$$
(p+m,q+m)
=(p+n-p-q,q+n-p-q)
=(n-q,n-p).
$$

<a id="prop-hod1-11-type-refinement"></a>

<!-- formal-statement-start -->
> **命題（型別Hard Lefschetz同型）**  
> $X$ を滑らか・コンパクト・境界なしの複素次元 $n$ のKähler多様体とする。$p,q\ge0$、$k=p+q\le n$ と置く。[Hodge分解で定める型部分空間](../HOD1-06/index.md#def-hod1-06-hodge-summand)に対して

$$
L_H^{n-k}:H^{p,q}(X)\xrightarrow{\ \cong\ }H^{n-q,n-p}(X)
$$

> が成立する。ここで $H^{p,q}(X)$ はde Rham群の型部分空間であり、Dolbeault群とはHodge分解を通して同定する。
<!-- formal-statement-end -->

### 証明の見取り図

型の移動により指定した型へ写ることを先に確かめ、全次数の[Hard Lefschetz同型](#thm-hod1-11-hard-lefschetz)の単射・全射を型別分解へ制限する。異なる出発型が同じ到着型へ重なることはない。

<!-- proof-start -->
### 証明

$m=n-p-q$ とする。[型の移動](../HOD1-10/index.md#prop-hod1-10-hodge-type-shift)を $m$ 回使うと、調和 $(p,q)$ 形式の像は調和 $(p+m,q+m)=(n-q,n-p)$ 形式である。従って指定した型の間の線形写像になる。

全次数での[Hard Lefschetz同型](#thm-hod1-11-hard-lefschetz)は単射だから、型部分空間への制限も単射である。

全射には $[\eta]_d\in H^{n-q,n-p}(X)$ を任意に取る。全次数での全射性から $L_H^m[\alpha]_d=[\eta]_d$ となる $[\alpha]_d\in H^k$ が存在する。[Hodge分解](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)により

$$
[\alpha]_d=\sum_{a+b=k}[\alpha_{a,b}]_d
$$

と一意に分解でき、各項は $H^{a,b}$ に属する。$L_H^m[\alpha_{a,b}]_d$ は $H^{a+m,b+m}$ に属する。目標の型が $(n-q,n-p)=(p+m,q+m)$ であるためには $a=p,b=q$ が必要である。目標次数のHodge分解は直和だから

$$
L_H^m[\alpha_{p,q}]_d=[\eta]_d,\qquad
L_H^m[\alpha_{a,b}]_d=0\quad((a,b)\ne(p,q)).
$$

従って目標の類は指定した型成分から写っており、全射である。$\square$
<!-- proof-end -->

<a id="cor-hod1-11-betti-symmetry"></a>

<!-- formal-statement-start -->
> **系（Betti数の次数対称性）**  
> $X$ を滑らか・コンパクト・境界なしの複素次元 $n$ のKähler多様体とする。複素係数Betti数 $b_j=\dim_{\mathbb C}H_{\mathrm{dR}}^j(X;\mathbb C)$ について

$$
b_k=b_{2n-k}\qquad(0\le k\le2n)
$$

> が成立する。また $h^{p,q}:=\dim_{\mathbb C}H^{p,q}(X)$ と置くと、$p+q\le n$ に対し $h^{p,q}=h^{n-q,n-p}$ が成立する。
<!-- formal-statement-end -->

前者は $k\le n$ について[Hard Lefschetz同型](#thm-hod1-11-hard-lefschetz)の両辺の次元を取り、$k>n$ では $2n-k<n$ と置き直す。後者は[型別同型](#prop-hod1-11-type-refinement)の両辺の次元を取る。これは既習の[Hodge数の双対対称性](../HOD1-07/index.md#thm-hod1-07-hodge-duality)と整合するが、**本章ではPoincaré双対性を同型の証明の入力にしていない**。

## 5. 例で次数と正規化を確かめる

### 楕円曲線：$k=0$ と $k=1$ は別の写像

$E_\tau=\mathbb C/(\mathbb Z+\tau\mathbb Z)$、$\tau=a+ib$、$b>0$ に標準平坦計量を入れ、$\omega=dx\wedge dy$ とする。[平坦トーラスのKähler構造](../../KAH/KAH1-05/index.md#prop-kah1-05-torus)によってこれは滑らか・コンパクト・境界なしの複素次元1のKähler多様体である。格子の基本領域を $z=s+\tau t$（$0\le s,t\le1$）と置くと、$x=s+at,\ y=bt$ なので

$$
dx\wedge dy=(ds+a\,dt)\wedge b\,dt=b\,ds\wedge dt,\qquad
\int_{E_\tau}\omega=\int_0^1\!\int_0^1 b\,ds\,dt=b.
$$

ここで $b>0$ は基本領域の向きと面積を同時に確定する。

$k=0$ では $n-k=1$ だから $L_H[1]_d=[\omega]_d$。$[\omega]_d$ は面積積分 $b>0$ によって非零で、両側は1次元なので同型である。一方 $k=1=n$ では $L_H^0=\operatorname{id}_{H^1}$。**$H^1\to H^3$ の $L_H$ を同型とする主張は存在しない**。公式の指数を固定せず覚えると、次数を取り違える。

### 複素二次元平坦トーラス：$H^1$ と $H^3$ の行列

$T=\mathbb C^2/(\mathbb Z+i\mathbb Z)^2$ とし、標準向き $dx_1\wedge dy_1\wedge dx_2\wedge dy_2$、$\omega=dx_1\wedge dy_1+dx_2\wedge dy_2$ を取る。[平坦トーラスの調和形式](../HOD1-09/index.md#lem-hod1-09-flat-harmonic)は定数係数形式で表せる。$n=2,k=1$ では $m=1$ で、次の像が直接計算できる。

$$
\begin{aligned}
L(dx_1)&=dx_1\wedge dx_2\wedge dy_2,\\
L(dy_1)&=dy_1\wedge dx_2\wedge dy_2,\\
L(dx_2)&=dx_1\wedge dy_1\wedge dx_2,\\
L(dy_2)&=dx_1\wedge dy_1\wedge dy_2.
\end{aligned}
$$

右辺は定数係数3形式空間の基底である。したがって、左辺に表示した $H^1$ の順序付き基底と右辺に表示した $H^3$ の順序付き基底を使うと $L_H:H^1\to H^3$ の行列は $I_4$、行列式は $1$ である。これは一般定理の単射・全射の小さな模型となる。

また $\omega^2=2\,dx_1\wedge dy_1\wedge dx_2\wedge dy_2$ なので、$k=0$ の $L_H^2[1]_d=[\omega^2]_d$ は基本体積類の2倍であり、非零である。

### 射影直線の積：中央次数からの $L$ に核があってよい

$Q=\mathbb{CP}^1\times\mathbb{CP}^1$ とし、射影 $\pi_i:Q\to\mathbb{CP}^1$ によって二つの規格化類を

$$
u=[\pi_1^*\omega_{\mathrm{FS}}/(2\pi)]_d,\qquad
v=[\pi_2^*\omega_{\mathrm{FS}}/(2\pi)]_d
$$

と置く。[積Kähler形式](../../KAH/KAH1-05/index.md#thm-kah1-05-product)は $\omega=\pi_1^*\omega_{\mathrm{FS}}+\pi_2^*\omega_{\mathrm{FS}}$ であり、[Fubini–Study面積公式](../../KAH/KAH1-07/index.md#thm-kah1-07-area)から各因子の規格化類の積分は $1$ となる。[de Rham類の積](../HOD1-10/index.md#def-hod1-10-de-rham-product)を外積で表すと

$$
\begin{aligned}
[\omega]_d&=2\pi(u+v),\\
u^2&=v^2=0\quad(\text{各因子は実次元2}),\\
\int_Q u\smile v&=
\left(\int_{\mathbb{CP}^1}\frac{\omega_{\mathrm{FS}}}{2\pi}\right)
\left(\int_{\mathbb{CP}^1}\frac{\omega_{\mathrm{FS}}}{2\pi}\right)=1.
\end{aligned}
$$

以下、$uv:=u\smile v$ と略記する。上の積分から $uv\ne0$ であり、[積のHodge数](../HOD1-09/index.md#thm-hod1-09-product-hodge)で $\dim H^4(Q;\mathbb C)=1$ と分かるので、$uv$ は $H^4$ を張る。さらに $au+bv=0$ と仮定してそれぞれ $v,u$ を掛ければ

$$
(au+bv)v=a\,uv=0,\qquad (au+bv)u=b\,uv=0.
$$

$uv\ne0$ だから $a=b=0$ であり、$u,v$ は一次独立である。この表示から $n=2$ の $k=0$ に対する指定冪は

$$
L_H^2[1]_d=(2\pi)^2(u+v)^2
=2(2\pi)^2uv\ne0.
$$

一方で $L_H(u-v)=0$ である。しかし $u-v$ は次数 $2=n$、Hard Lefschetzがそこに要求するのは $L_H^0=\operatorname{id}$ だけである。**$k<n$ の冪 $L_H^{n-k}$ と、中央次数での一回の $L_H$ を混同しない**。

## 6. 仮定を外すと何が壊れるか

**コンパクト性の欠落。** 標準的な複素直線 $X=\mathbb C$ はKählerだが非コンパクトである。複素次元 $n=1$、$H_{\mathrm{dR}}^0(\mathbb C;\mathbb C)\cong\mathbb C$、$H_{\mathrm{dR}}^2(\mathbb C;\mathbb C)=0$ である。後者は $\mathbb C\cong\mathbb R^2$ が可縮であることから従う。例えば標準基本形式 $\omega=dx\wedge dy=d(x\,dy)$ は完全形式なので

$$
L_H[1]_d=[\omega]_d=0
$$

となり、$H^0\to H^2$ は同型でない。壊れたのは点ごとのLefschetz同型ではなく、**通常のde Rham類へ調和代表を一意に対応させるコンパクトHodge理論の段階**である。非コンパクトの任意の調和形式がde Rham類を一意に代表するという主張は成り立たない。

**閉2形式とKähler基本形式の違い。** 前章の[閉だが調和形式を保たない具体的な計算](../HOD1-10/index.md#ex-hod1-10-b02)では、固定した平坦計量上の $\eta=(1+\frac12\cos2\pi x)\,dx\wedge dy$ は閉形式だが $\Delta_d\eta\ne0$ だった。この $\eta$ との外積は類上の作用を作れても、**同じ固定計量の調和空間上の作用**を保証しない。したがって本章の証明を $L=\eta\wedge(-)$ にそのまま代入することはできない。ただし、この例だけで類上の同型が破れると結論してはいけない。証明手段が失われることと結論の偽は別である。

## 7. 演習：同型の両側を自力でつなぐ

### Level A：次数・冪・基底を確認する

<a id="ex-hod1-11-a01"></a>
#### HOD1-11-A01 指数と行き先を列挙する
- Level: A

複素次元 $n=3$ のコンパクトKähler多様体で、Hard Lefschetz定理が要求する $k=0,1,2,3$ の写像を、指数と出発・到着次数を含めてすべて書け。$k=4$ について定理をそのまま使えるかも答えよ。

<!-- solution-start -->
### 詳細解答

[Hard Lefschetz定理](#thm-hod1-11-hard-lefschetz)で $m=n-k=3-k$ とする。到着次数は $k+2m=6-k$ だから

$$
\begin{aligned}
k=0 &: L_H^3:H^0\longrightarrow H^6,\\
k=1 &: L_H^2:H^1\longrightarrow H^5,\\
k=2 &: L_H:H^2\longrightarrow H^4,\\
k=3 &: L_H^0=\operatorname{id}:H^3\longrightarrow H^3.
\end{aligned}
$$

これらがすべて同型である。$k=4>n$ では指数 $3-4=-1$ となり、定理はそのような負冪を定義していない。代わりに $k'=6-4=2$ の同型 $L_H:H^2\to H^4$ を**逆向きに使う**ことはできるが、$L_H^{-1}$ を楔積と呼ぶわけではない。
<!-- solution-end -->

<a id="ex-hod1-11-a02"></a>
#### HOD1-11-A02 楕円曲線の規格化
- Level: A

$E=\mathbb C/(\mathbb Z+3i\mathbb Z)$ に標準Euclid計量を入れ、$\omega=dx\wedge dy$ とする。$k=0$ のHard Lefschetz写像の像と $\int_E\omega$ を求め、非零性を説明せよ。また $k=1$ の指定冪を答えよ。

<!-- solution-start -->
### 詳細解答

$z=s+3it$（$0\le s,t\le1$）で基本領域を表すと $dx=ds,dy=3dt$ だから

$$
\int_E\omega=\int_0^1\!\int_0^1 3\,ds\,dt=3.
$$

[調和代表へのLefschetz作用](../HOD1-10/index.md#thm-hod1-10-harmonic-lefschetz)から $L_H[1]_d=[\omega]_d$。もしこの類が零なら $\omega=d\beta$ となり、[境界付き多様体の一般Stokes公式](../../GEO/GEO8/index.md#thm-geo8-general-stokes)で境界が空であることから積分は零になるはずで、上の $3$ に矛盾する。従って非零類である。$n=1,k=1$ では $n-k=0$ なので $L_H^0=\operatorname{id}_{H^1}$ である。
<!-- solution-end -->

<a id="ex-hod1-11-a03"></a>
#### HOD1-11-A03 平坦トーラスの基底像
- Level: A

複素次元2の平坦トーラスで $\omega=dx_1\wedge dy_1+dx_2\wedge dy_2$ とする。$L(dx_1)$、$L(dx_2)$ を求め、両者が一次独立な3形式であることを示せ。

<!-- solution-start -->
### 詳細解答

外積で同じ1形式が二度現れる項は零である。従って

$$
\begin{aligned}
L(dx_1)&=(dx_1\wedge dy_1+dx_2\wedge dy_2)\wedge dx_1\\
&=dx_2\wedge dy_2\wedge dx_1=dx_1\wedge dx_2\wedge dy_2,\\
L(dx_2)&=(dx_1\wedge dy_1+dx_2\wedge dy_2)\wedge dx_2\\
&=dx_1\wedge dy_1\wedge dx_2.
\end{aligned}
$$

第一式の順序変更では $dx_1$ を左へ二回交換するので正符号である。二つは定数係数外積基底の異なる単項式なので一次独立である。[平坦トーラスの調和形式](../HOD1-09/index.md#lem-hod1-09-flat-harmonic)により両者は調和3形式でもある。
<!-- solution-end -->

<a id="ex-hod1-11-a04"></a>
#### HOD1-11-A04 随伴と零次の冪
- Level: A

$n=2,k=0$ とする。調和4形式 $\eta$ に対し $\Lambda^2\eta$ の次数と調和性を示せ。点ごとの $L^2$ が同型なら $\Lambda^2\eta=0$ が $\eta=0$ を意味する理由を述べよ。

<!-- solution-start -->
### 詳細解答

$\Lambda$ は次数を2下げるので、$\Lambda^2\eta$ は4次から0次へ移る。[Laplacianとの可換性](../HOD1-05/index.md#thm-hod1-05-laplacian-lefschetz)を二回使えば

$$
\Delta_d(\Lambda^2\eta)=\Lambda^2\Delta_d\eta=0
$$

となり、調和0形式である。[点ごとの同型](../HOD1-03/index.md#thm-hod1-03-pointwise-isomorphism)による $L_x^2:\mathcal A_x^0\to\mathcal A_x^4$ は有限次元Hermite空間の同型である。したがってその随伴 $(L_x^2)^*=\Lambda_x^2$ も同型であり、零核である。任意の点 $x$ で $\Lambda_x^2\eta_x=0$ なら $\eta_x=0$、よって $\eta=0$ となる。
<!-- solution-end -->

### Level B：全射性・型・仮定をつなぐ

<a id="ex-hod1-11-b01"></a>
#### HOD1-11-B01 全射性の直交補空間による証明
- Level: B

コンパクトKähler多様体の複素次元を $n$ とし、$0\le k\le n$、$m=n-k$ とする。$L^m:\mathcal H^k\to\mathcal H^{2n-k}$ の像と直交する $\eta$ が零であることを、随伴性・調和性・点ごとの同型の順で証明せよ。有限次元性を使う箇所も明示せよ。

<!-- solution-start -->
### 詳細解答

像に直交するとは任意の $h\in\mathcal H^k$ に対して $\langle L^mh,\eta\rangle_{L^2}=0$ を意味する。[Laplacian可換性](../HOD1-05/index.md#thm-hod1-05-laplacian-lefschetz)により $\Lambda^m\eta$ は調和で次数 $k$ なので、これを $h$ に代入できる。

$$
0=\langle L^m\Lambda^m\eta,\eta\rangle_{L^2}
=\langle\Lambda^m\eta,\Lambda^m\eta\rangle_{L^2}
=\|\Lambda^m\eta\|_{L^2}^2.
$$

よって $\Lambda^m\eta=0$。[点ごとのLefschetz同型](../HOD1-03/index.md#thm-hod1-03-pointwise-isomorphism)の随伴 $\Lambda_x^m$ も各点で同型だから $\eta_x=0$、従って $\eta=0$。目標調和空間が[コンパクトHodge理論](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)により有限次元であるため、任意の部分空間について目標空間が像と直交補空間の直和になり、像が全体を占める。ここが全射性の最後の段階である。
<!-- solution-end -->

<a id="ex-hod1-11-b02"></a>
#### HOD1-11-B02 型別写像の出発点を逆算する
- Level: B

複素次元 $n=3$ のコンパクトKähler多様体で $k=2$ とする。$(2,0)$、$(1,1)$、$(0,2)$ 型のHodge成分はそれぞれどの型へHard Lefschetz写像で移るか。その写像が各型で全射となる理由も説明せよ。

<!-- solution-start -->
### 詳細解答

$m=n-k=1$ で、[型別同型](#prop-hod1-11-type-refinement)により両添字に $1$ を足すので

$$
H^{2,0}\xrightarrow{L_H}H^{3,1},\qquad
H^{1,1}\xrightarrow{L_H}H^{2,2},\qquad
H^{0,2}\xrightarrow{L_H}H^{1,3}.
$$

次数はすべて $2\to4$ である。全次数の[Hard Lefschetz定理](#thm-hod1-11-hard-lefschetz)は $H^2\to H^4$ の全射を与える。例えば目標 $H^{3,1}$ の類の前像を $(2,0)+(1,1)+(0,2)$ 型に分解すると、各像の型は互いに異なり、$(3,1)$ 成分は $(2,0)$ の像だけである。Hodge分解が直和なので、これで $H^{2,0}\to H^{3,1}$ の全射を得る。他の二型も出発・到着型を置き換えて同じ推論ができる。
<!-- solution-end -->

<a id="ex-hod1-11-b03"></a>
#### HOD1-11-B03 射影直線の積で正しい冪を選ぶ
- Level: B

$Q=\mathbb{CP}^1\times\mathbb{CP}^1$ で $u^2=v^2=0$、$\int_Q uv=1$、$[\omega]_d=2\pi(u+v)$、$u,v$ は $H^2$ の基底とする。$L_H^2:H^0\to H^4$ の像を求め、$L_H:H^2\to H^4$ の核も求めよ。その核がHard Lefschetz定理と矛盾しない理由を答えよ。

<!-- solution-start -->
### 詳細解答

二次類の積は次数付き交換則 $(-1)^{2\cdot2}=+1$ で可換だから $uv=vu$ である。従って

$$
\begin{aligned}
L_H^2[1]_d
&=(2\pi)^2(u+v)^2\\
&=(2\pi)^2(u^2+uv+vu+v^2)
=2(2\pi)^2uv.
\end{aligned}
$$

$\int_Q uv=1$ より $uv\ne0$ で、$H^4$ の一次元の全体を張る。一方、任意の $au+bv\in H^2$ について

$$
L_H(au+bv)=2\pi(a+b)uv.
$$

従って $\ker(L_H:H^2\to H^4)=\mathbb C(u-v)$。$n=2,k=2$ に対して[定理](#thm-hod1-11-hard-lefschetz)が要求するのは $L_H^{2-2}=L_H^0:H^2\to H^2$ の同型であり、今の $L_H:H^2\to H^4$ ではない。二つは矛盾しない。
<!-- solution-end -->

<a id="ex-hod1-11-b04"></a>
#### HOD1-11-B04 非コンパクトなKähler多様体
- Level: B

標準Kähler計量をもつ複素直線 $\mathbb C$ について、$n=1,k=0$ のHard Lefschetz型の主張が普通のde Rham群では失敗することを示せ。点ごとの同型のどの部分が壊れたのか、または別のどの橋が壊れたのかを説明せよ。

<!-- solution-start -->
### 詳細解答

$\mathbb C$ は可縮なので $H^0_{\mathrm{dR}}(\mathbb C;\mathbb C)=\mathbb C$、$H^2_{\mathrm{dR}}(\mathbb C;\mathbb C)=0$ である。標準基本形式 $\omega=dx\wedge dy$ は

$$
\omega=d(x\,dy),\qquad
L_H[1]_d=[\omega]_d=0.
$$

よって非零の $[1]_d$ を零へ送るので単射ではなく、同型でもない。点ごとの $L_x:\bigwedge^0T_x^*\mathbb C\to\bigwedge^2T_x^*\mathbb C$ は $\omega_x\ne0$ により依然として同型である。失敗箇所は**非コンパクト空間の調和形式を通常のde Rham類と一対一に同定する段階**である。[コンパクトHodge–de Rham同型](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)を $\mathbb C$ へ適用してはいけない。
<!-- solution-end -->

### Level C：主定理から新しい結論を組み立てる

<a id="ex-hod1-11-c01"></a>
#### HOD1-11-C01 複素二次元トーラスで全次数を検算する
- Level: C

$T=\mathbb C^2/(\mathbb Z+i\mathbb Z)^2$、$\omega=dx_1\wedge dy_1+dx_2\wedge dy_2$ とする。定数係数の微分形式のde Rham類が各次数の基底を与えることを使ってよい。

1. $L_H^2:H^0\to H^4$ の基底に関する係数を求めよ。
2. $L_H:H^1\to H^3$ の行列式が零でないことを、明示した両基底に基づいて確かめよ。
3. $H^{1,0}$ からの像の型、$k=2$ における指定冪、得られるBetti数の対称性をまとめよ。

<!-- solution-start -->
### 詳細解答

**1.** $H^0$ の基底は $[1]_d$、$H^4$ の基底は $[dx_1\wedge dy_1\wedge dx_2\wedge dy_2]_d$ とする。二つの各因子の2形式は偶次数なので可換、かつそれぞれの二乗は零である。よって

$$
\begin{aligned}
\omega^2&=(dx_1\wedge dy_1+dx_2\wedge dy_2)^2\\
&=2\,dx_1\wedge dy_1\wedge dx_2\wedge dy_2.
\end{aligned}
$$

したがって $L_H^2$ の行列は $(2)$ である。

**2.** 出発基底を $(dx_1,dy_1,dx_2,dy_2)$ の類とし、到着基底を

$$
(dx_1\wedge dx_2\wedge dy_2,\;
dy_1\wedge dx_2\wedge dy_2,\;
dx_1\wedge dy_1\wedge dx_2,\;
dx_1\wedge dy_1\wedge dy_2)
$$

の類とする。各出発基底に $\omega$ を外積すると順に対応する到着基底が得られる（同じ因子の1形式の重複項は零）。したがって行列は $I_4$、行列式は $1\ne0$ である。

**3.** $(1,0)$ 型の調和1形式には[型の移動](../HOD1-10/index.md#prop-hod1-10-hodge-type-shift)を用いて $(2,1)$ 型の調和3形式が対応する。$k=2=n$ では $L_H^0=\operatorname{id}_{H^2}$。各次数の定数係数基底の数は二項係数 $\binom4k$ なので

$$
(b_0,b_1,b_2,b_3,b_4)=(1,4,6,4,1).
$$

これは[Betti数の対称性](#cor-hod1-11-betti-symmetry)で得る $b_0=b_4$、$b_1=b_3$ と一致する。
<!-- solution-end -->

<a id="ex-hod1-11-c02"></a>
#### HOD1-11-C02 中央次数をまたぐ一回の作用
- Level: C

$X$ を複素次元 $n$ のコンパクトKähler多様体とする。Hard Lefschetz定理だけから、$L_H:H^k\to H^{k+2}$ が $0\le k<n$ で単射、$n-1\le k\le 2n-2$ で全射となることを示せ（$k=n-1$ では双方成り立つ）。演習の結果を原始コホモロジーの完全な分解と混同しないこと。

<!-- solution-start -->
### 詳細解答

**単射。** $k<n$ で $L_Ha=0$ とする。指数 $m=n-k\ge1$ だから

$$
L_H^{n-k}a=L_H^{n-k-1}(L_Ha)=0.
$$

[Hard Lefschetz同型](#thm-hod1-11-hard-lefschetz)の単射性から $a=0$。従って $L_H:H^k\to H^{k+2}$ は単射である。

**全射。** $n-1\le k\le2n-2$ とし、$j=2n-k-2$ と置く。すると $0\le j\le n-1$、$n-j=k+2-n\ge1$ である。[Hard Lefschetz同型](#thm-hod1-11-hard-lefschetz)により

$$
L_H^{n-j}=L_H^{k+2-n}:H^j\longrightarrow H^{2n-j}=H^{k+2}
$$

は全射である。任意の $b\in H^{k+2}$ を $b=L_H^{k+2-n}c$（$c\in H^j$）と書く。$a=L_H^{k+1-n}c$ と置くと、その次数は

$$
j+2(k+1-n)
=2n-k-2+2k+2-2n=k
$$

である。さらに $L_Ha=L_H^{k+2-n}c=b$ なので全射である。$k=n-1$ は両方の範囲に属し、そのとき $L_H:H^{n-1}\to H^{n+1}$ 自体がHard Lefschetz同型になる。ここで得たのは一回の作用の単射・全射であり、核を原始成分へ分解する作業は次章で行う。
<!-- solution-end -->

## 8. 本章で何が確立したか

- [調和形式の同型](#prop-hod1-11-harmonic-isomorphism)は点ごとのLefschetz同型と随伴・Laplacian可換性をつないで、単射も全射も証明した。
- [Hard Lefschetz定理](#thm-hod1-11-hard-lefschetz)はその同型を調和代表からコホモロジーへ移したもの。冪は厳密に $n-k$、積は $[\omega]_d$ による。
- [型別同型](#prop-hod1-11-type-refinement)は $(p,q)$ を $(n-q,n-p)$ へ結び、[Betti数対称性](#cor-hod1-11-betti-symmetry)を与える。

次章では、同型が存在するだけでなく、コホモロジー全体を **原始成分とその $L_H$ による列**へ分ける。
