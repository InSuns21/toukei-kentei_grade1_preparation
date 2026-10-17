# KAH1-14 射影多様体と整数Kähler類

<!-- definition-example-audit: strict -->

## 1. 正値な形式は、いつ射影空間から来るか

前章の[Kähler類の定義](../KAH1-13/index.md#def-kah1-13-class)では、実de Rham類に正の実閉 $(1,1)$ 形式の代表が存在するかを問うた。正値性は微分形式の点ごとの条件である。一方、[第一Chern類の整数データ](../KAH1-12/index.md#def-kah1-12-integral-first-chern)は、正則線束の遷移関数を三重の重なりで比較すると現れた。

ここで二つの問いが生まれる。**射影空間に埋め込める複素多様体には、どのようなKähler形式が入るのか。** そして、**正値なKähler形式があれば、逆に射影空間へ埋め込めるのか。**

前者は[Fubini–Study形式](../KAH1-07/index.md#thm-kah1-07-global-fs)と正則写像の微分から証明できる。後者には正値性だけでは足りない。射影性に関係するのは、形式の実係数の類が**整数係数の第一Chern類に由来するか**という追加条件であり、さらにその逆向きの証明にはKodaira埋め込み定理などの大域的な理論が必要になる。

本章では $X$ を複素次元 $n\ge1$ の滑らかな複素多様体とし、必要な箇所で空でない・コンパクト・境界なしを仮定する。基本形式と曲率の規格化は

$$
\omega_{\mathrm{FS}}=i\partial\bar\partial
\log\left(1+\sum_j|z^j|^2\right),
\qquad
c_1(L,h)=\frac{i}{2\pi}F_{D_h}
$$

とする。特に[射影直線の面積](../KAH1-07/index.md#thm-kah1-07-area)は $\int_{\mathbb{CP}^1}\omega_{\mathrm{FS}}=2\pi$ である。この $2\pi$ が整数条件の判定で重要になる。

## 2. 射影的であることとKähler性

射影空間 $\mathbb{CP}^N$ の点は、零でない $(N+1)$ 個の複素数の同時スカラー倍を同一視した $[Z_0:\cdots:Z_N]$ である。[射影空間のチャート](../KAH1-06/index.md#prop-kah1-06-projective-atlas)で正則な座標を使える。別の複素多様体がここに**正則に埋め込める**とは、単に点を異なる点へ送るだけでなく、微分によって接方向もつぶさず、その像が部分多様体になるということである。

<a id="def-kah1-14-projective"></a>

<!-- formal-statement-start -->
> **定義（射影的複素多様体）**  
> 空でない複素多様体 $X$ が**射影的**であるとは、ある整数 $N\ge1$ と正則写像 $f:X\to\mathbb{CP}^N$ が存在し、$f$ が閉じた複素部分多様体への正則埋め込みとなることをいう。ここで正則埋め込みは、$f$ がその像への同相写像であり、各点で複素線形微分 $df_p$ が単射であることを含む。
<!-- formal-statement-end -->

<!-- definition-example-start: def-kah1-14-projective -->
**定義の確認**（射影直線を射影平面へ）。$f:\mathbb{CP}^1\to\mathbb{CP}^2$ を

$$
f([u:v])=[u:v:0]
$$

で定める。同次座標を $[cu:cv]$ に替えても像は変わらず、像は閉集合 $\{Z_2=0\}$ である。$u\ne0$ のチャートで $z=v/u$ を使えば $f$ は $z\mapsto(z,0)$、微分は $\xi\mapsto(\xi,0)$ で単射。$v\ne0$ のチャートでも同じ検証ができ、射影座標の最初の2成分から逆写像を構成できる。したがって同相性も成立し、$\mathbb{CP}^1$ は定義の条件を満たす。
<!-- definition-example-end -->

射影的な空間には既に正の形式がある。これを正則部分多様体に制限するとき、どの条件が保存されるかを確認する。写像 $f$ の微分に接ベクトル $v$ を入れ、形式の評価を

$$
(f^*\omega)_p(v,\bar v)
=\omega_{f(p)}(df_pv,\overline{df_pv})
$$

と書く。$df_pv\ne0$ を保証するのが、正則**埋め込み**の仮定である。

<a id="prop-kah1-14-projective-restriction"></a>

<!-- formal-statement-start -->
> **命題（Fubini–Study形式の正則埋め込みへの制限）**  
> $X$ を複素次元 $n\ge1$ の複素多様体、$f:X\to\mathbb{CP}^N$ を正則埋め込みとする。このとき

$$
\omega_X:=f^*\omega_{\mathrm{FS}}
$$

> は $X$ 上のKähler形式である。$f$ の像が閉であれば $X$ はコンパクトである。
<!-- formal-statement-end -->

### 証明の見取り図

引き戻しは外微分と可換であり、正則写像では $(1,1)$ 型を保つ。正値性だけは任意の正則写像では保たれず、微分の単射性を使う。

<!-- proof-start -->
### 証明

[大域Fubini–Study形式の構成](../KAH1-07/index.md#thm-kah1-07-global-fs)より $\omega_{\mathrm{FS}}$ は実閉 $(1,1)$ 形式で正値である。引き戻しと共役は可換なので $f^*\omega_{\mathrm{FS}}$ も実形式である。正則性から $df(T^{1,0}X)\subset T^{1,0}\mathbb{CP}^N$、$df(T^{0,1}X)\subset T^{0,1}\mathbb{CP}^N$ だから引き戻しは $(1,1)$ 型を保つ。

[引き戻しと外微分の可換性](../../GEO/GEO7/index.md#thm-geo7-pullback-commutes-d)を $f$ と2形式 $\omega_{\mathrm{FS}}$ に適用すれば

$$
d(f^*\omega_{\mathrm{FS}})
=f^*(d\omega_{\mathrm{FS}})=0.
$$

点 $p\in X$ と $0\ne v\in T_p^{1,0}X$ を任意に取る。埋め込みの微分は単射なので $df_pv\ne0$。したがって

$$
-i(f^*\omega_{\mathrm{FS}})_p(v,\bar v)
=-i(\omega_{\mathrm{FS}})_{f(p)}
(df_pv,\overline{df_pv})>0.
$$

型・実性・閉性・正値性がすべてそろい、$\omega_X$ はKähler形式である。最後に $\mathbb{CP}^N$ はコンパクトで、閉じた像 $f(X)$ はコンパクト。同相写像 $X\cong f(X)$ により $X$ もコンパクト。$\square$
<!-- proof-end -->

**埋め込みを外すと壊れる。** 定数正則写像 $f:X\to\mathbb{CP}^N$ の微分は $df=0$ なので $f^*\omega_{\mathrm{FS}}=0$ となる。引き戻しの実性・型・閉性は残るが、非零接ベクトルでの**正値性**が壊れる。正則写像なら何でもKähler形式を引き戻せるわけではない。

## 3. 整数係数の類と $2\pi$ の規格化

[Kähler類](../KAH1-13/index.md#def-kah1-13-class)は実de Rhamコホモロジーに住む。一方、[整数係数の第一Chern類](../KAH1-12/index.md#def-kah1-12-integral-first-chern)は $H^2(X;\mathbb Z)$ に住み、その実係数への像が曲率から求まる。整数係数から実係数への自然な写像を

$$
r:H^2(X;\mathbb Z)\longrightarrow H^2_{\mathrm{dR}}(X;\mathbb R)
$$

と記す。$r$ は整数類の実像を表すもので、一般には単射だとは仮定しない（整数係数の捩れは実係数で消える）。

判定を具体的にするには、閉じた向き付き実2次元の曲面 $\Sigma$ から $X$ への滑らかな写像 $u:\Sigma\to X$ を考える。もし $[\eta]=r(\gamma)$ で $\gamma$ が整数係数類なら、整数係数コホモロジーと基本類の評価により

$$
\int_\Sigma u^*\eta\in\mathbb Z
$$

となる。これは**整数性の必要条件**である。逆向きの一般的な判定は積分サイクルやde Rham定理を使うので、ここではこの条件だけから一般の整数類の存在を推論しない。

<a id="def-kah1-14-integral-normalized-class"></a>

<!-- formal-statement-start -->
> **定義（整数型に規格化されたKähler類）**  
> 複素多様体 $X$ のKähler形式 $\omega$ に対して、その規格化された実類

$$
\alpha_\omega:=\left[\frac{\omega}{2\pi}\right]
\in H^2_{\mathrm{dR}}(X;\mathbb R)
$$

> が写像 $r:H^2(X;\mathbb Z)\to H^2_{\mathrm{dR}}(X;\mathbb R)$ の像に入るとき、$\omega$ は**整数型の規格化Kähler類**を与えるという。整数性は選んだ形式の局所係数ではなく、そのde Rham類の条件である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-kah1-14-integral-normalized-class -->
**定義の確認**（$\mathbb{CP}^1$）。[超平面束の第一Chern形式](../KAH1-07/index.md#prop-kah1-07-chern)から

$$
\left[\frac{\omega_{\mathrm{FS}}}{2\pi}\right]
=r(c_1(\mathcal O(1))),
\qquad
\int_{\mathbb{CP}^1}\frac{\omega_{\mathrm{FS}}}{2\pi}=1.
$$

前者は整数係数類の**存在**を保証し、後者は整数周期を直接確認する。$\sqrt2\,\omega_{\mathrm{FS}}$ も正の実閉 $(1,1)$ 形式だが、規格化積分が $\sqrt2$ だからその類は整数係数から来ない。同じ射影多様体に整数型のKähler形式と非整数型のKähler形式が共存する。
<!-- definition-example-end -->

ここで $\omega_{\mathrm{FS}}$ 自体の面積は $2\pi$ であり、$\omega_{\mathrm{FS}}/(2\pi)$ の面積が $1$ である。「$[\omega]$ が整数」とだけ書くと、文献によって $2\pi$ を吸収する規約が異なるため誤解を招く。本講義では必ず $\alpha_\omega=[\omega/(2\pi)]$ を判定対象にする。

## 4. 曲率で正値性を測る線束

正則線束 $L\to X$ は、局所的には $U\times\mathbb C$ と見えるが、重なりでは零でない正則関数を用いて貼り合わせられている。[正則線束と遷移関数](../../CM/CM2-06/index.md#def-cm2-06-holomorphic-line-bundle)を参照しよう。[Hermite計量](../../CM/CM2-09/index.md#def-cm2-09-hermitian-metric)を選ぶと、[Chern接続](../../CM/CM2-10/index.md#prop-cm2-10-line-formula)の曲率 $F_{D_h}$ が計算できる。

局所正則枠 $e_a$ の長さの二乗を $h_a=\|e_a\|_h^2$ と書くと、線束の場合

$$
A_a=\partial\log h_a,\qquad
F_{D_h}=\bar\partial A_a
=\bar\partial\partial\log h_a
=-\partial\bar\partial\log h_a.
$$

例えば $h_a=e^{-\varphi_a}$ なら

$$
F_{D_h}=\partial\bar\partial\varphi_a,\qquad
c_1(L,h)=\frac{i}{2\pi}\partial\bar\partial\varphi_a.
$$

この式で、曲率の実 $(1,1)$ 形式が正であることは、局所関数 $\varphi_a$ の複素Hessianが正値であることに言い換えられる。枠を換えると $\varphi_a$ 自体は変わるが、曲率は大域的に貼り合う。

<a id="def-kah1-14-positive-line-bundle"></a>

<!-- formal-statement-start -->
> **定義（正の正則線束）**  
> 複素多様体 $X$ 上の正則線束 $L$ が**正**であるとは、ある滑らかな正値Hermite計量 $h$ を入れたとき、そのChern接続の実 $(1,1)$ 形式

$$
\Theta_{L,h}:=\frac{i}{2\pi}F_{D_h}
$$

> が任意の点 $p\in X$ と $0\ne v\in T_p^{1,0}X$ で $-i(\Theta_{L,h})_p(v,\bar v)>0$ を満たすことをいう。曲率がこの条件を満たす計量の**存在**が定義であり、任意の計量で正になることは要求しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-kah1-14-positive-line-bundle -->
**定義の確認**（超平面束）。$\mathbb{CP}^n$ の $\mathcal O(1)$ に対し、標準チャートの計量 $h_a=e^{-\varphi_a}$ では、上式と[Fubini–Study形式のChern計算](../KAH1-07/index.md#prop-kah1-07-chern)から

$$
\Theta_{\mathcal O(1),h}
=\frac{\omega_{\mathrm{FS}}}{2\pi}.
$$

[正値Hermite行列との対応](../KAH1-02/index.md#prop-kah1-02-matrix-criterion)により、$v\ne0$ について $-i\omega_{\mathrm{FS}}(v,\bar v)>0$。$2\pi>0$ だから $\Theta$ も正値で、局所公式は実 $(1,1)$ 型・閉性も満たす。したがって $\mathcal O(1)$ は正の正則線束である。
<!-- definition-example-end -->

正の線束は、少なくとも**整数型のKähler類を作る装置**になる。これを命題として確認する。

<a id="prop-kah1-14-positive-curvature"></a>

<!-- formal-statement-start -->
> **命題（正の線束から整数型Kähler類へ）**  
> 複素多様体 $X$ 上の正則線束 $L$ に滑らかなHermite計量 $h$ があり、$\Theta_{L,h}=(i/2\pi)F_{D_h}$ が正であるとする。このとき $2\pi\Theta_{L,h}$ はKähler形式であり、

$$
[\Theta_{L,h}]=r(c_1(L))
$$

> は整数係数の第一Chern類の実像である。さらに任意の整数 $m\ge1$ について、$L^{\otimes m}$ に誘導した計量の第一Chern形式は $m\Theta_{L,h}$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

曲率の閉性を[第一Chern形式の閉性](../../CM/CM2-11/index.md#prop-cm2-11-chern-closed)に戻し、整数係数類との一致を[第一Chern類の実像定理](../KAH1-12/index.md#thm-kah1-12-integrality)から得る。テンソル冪では局所枠の長さを $m$ 乗する。

<!-- proof-start -->
### 証明

[第一Chern形式の定義](../../CM/CM2-11/index.md#def-cm2-11-first-chern-form)から $\Theta_{L,h}$ は滑らかな実 $(1,1)$ 形式であり、[閉性](../../CM/CM2-11/index.md#prop-cm2-11-chern-closed)から $d\Theta_{L,h}=0$。仮定により正値だから、正の定数倍 $2\pi\Theta_{L,h}$ も正の実閉 $(1,1)$ 形式である。つまりKähler形式になる。

同じ束 $L$ に対する[整数第一Chern類との対応](../KAH1-12/index.md#thm-kah1-12-integrality)を適用すると

$$
\left[\frac{2\pi\Theta_{L,h}}{2\pi}\right]
=[\Theta_{L,h}]=r(c_1(L)).
$$

正則枠 $e_a$ に関して $\|e_a\|_h^2=h_a$ と書く。テンソル冪の局所枠 $e_a^{\otimes m}$ は長さの二乗 $h_a^m$ を持つため、局所接続形式は

$$
A_a^{(m)}
=\partial\log(h_a^m)
=m\partial\log h_a=mA_a.
$$

外微分の型別成分 $\bar\partial$ を作用させれば $F_{D_{h^{\otimes m}}}=\bar\partial A_a^{(m)}=mF_{D_h}$。従って $c_1(L^{\otimes m},h^{\otimes m})=m\Theta_{L,h}$。$m>0$ なので正値性も保存する。$\square$
<!-- proof-end -->

これは「線束が正なら、その第一Chern類の実像はKähler類を定める」という**一方向**の構成である。「Kähler類が整数型なら必ず正の線束がある」という逆向きには、整数 $(1,1)$ 類を正則線束へ持ち上げる大域理論と、線束の計量の曲率を所望の代表へ調整する議論が必要である。本章で逆を証明済みとはしない。

## 5. 射影埋め込みが与える整数型のKähler類

射影空間の $\mathcal O(1)$ を埋め込み $f:X\to\mathbb{CP}^N$ に沿って引き戻す。ここで $f^*\mathcal O(1)$ は各点 $p$ で元の束の $f(p)$ 上のファイバーを持つ正則線束である。遷移関数とHermite計量を $f$ で合成して貼り合わせられる。曲率についても、局所枠の計量が $h_a\circ f$ になるため

$$
\begin{aligned}
c_1(f^*\mathcal O(1),f^*h)
&=\frac{i}{2\pi}\partial\bar\partial(\varphi_a\circ f)\\
&=f^*\left(\frac{i}{2\pi}\partial\bar\partial\varphi_a\right)
=f^*\frac{\omega_{\mathrm{FS}}}{2\pi}.
\end{aligned}
$$

中間の等号は $f$ が**正則**であることを使う。この局所計算と、整数Chern類の遷移関数が引き戻しで合成される事実を合わせると、実像の整数性まで確かめられる。

<a id="thm-kah1-14-projective-integral"></a>

<!-- formal-statement-start -->
> **定理（射影的複素多様体の整数型Kähler類）**  
> 空でない複素次元 $n\ge1$ の射影的複素多様体 $X$ と、その正則埋め込み $f:X\to\mathbb{CP}^N$ を取る。このとき $X$ はコンパクトKähler多様体であり、

$$
\omega_X=f^*\omega_{\mathrm{FS}},
\qquad
\left[\frac{\omega_X}{2\pi}\right]
=r\bigl(c_1(f^*\mathcal O(1))\bigr).
$$

> 特に $X$ は整数型に規格化されたKähler類を少なくとも一つ持つ。また、$f^*\mathcal O(1)$ は正の正則線束である。
<!-- formal-statement-end -->

### 証明の見取り図

射影空間上で$\omega_{\mathrm{FS}}/(2\pi)$と超平面束の第一Chern形式が一致することを使う。正値性には埋め込みの微分の単射性、整数性には束の引き戻しを使う。

<!-- proof-start -->
### 証明

[埋め込みへの制限命題](#prop-kah1-14-projective-restriction)から $\omega_X=f^*\omega_{\mathrm{FS}}$ は正の実閉 $(1,1)$ 形式であり、$X$ はコンパクトになる。[超平面束のChern形式](../KAH1-07/index.md#prop-kah1-07-chern)と前段の局所計算から

$$
c_1(f^*\mathcal O(1),f^*h)
=f^*c_1(\mathcal O(1),h)
=\frac{f^*\omega_{\mathrm{FS}}}{2\pi}.
$$

引き戻し束の遷移関数は、$\mathcal O(1)$ の遷移関数 $g_{ab}$ に $f$ を合成した $g_{ab}\circ f$ である。[整数Chern類の三重重なりによる構成](../KAH1-12/index.md#def-kah1-12-integral-first-chern)をこの遷移関数へ適用すると $f^*\mathcal O(1)$ の整数第一Chern類を得る。[実像との一致](../KAH1-12/index.md#thm-kah1-12-integrality)から

$$
\left[\frac{\omega_X}{2\pi}\right]
=r\bigl(c_1(f^*\mathcal O(1))\bigr).
$$

最後に引き戻し計量 $f^*h$ の第一Chern形式は $\omega_X/(2\pi)$ で正値なので、[正の線束の定義](#def-kah1-14-positive-line-bundle)から $f^*\mathcal O(1)$ は正である。$\square$
<!-- proof-end -->

**定理が言っていないこと。** 射影的な $X$ には上記の整数型Kähler形式が存在する。しかし、$X$ 上で**任意に選んだ**Kähler形式の類まで整数型だとは主張していない。また、この証明を逆向きに読み「Kählerなら射影的」とすることもできない。

## 6. 具体例で「正値」と「整数」を分離する

### 6.1 射影直線上の連続な係数

$\mathbb{CP}^1$ 上で $\omega_t=t\omega_{\mathrm{FS}}$ とし、$t\in\mathbb R$ とする。正値性からKähler形式となる条件は $t>0$。しかし

$$
\int_{\mathbb{CP}^1}\frac{\omega_t}{2\pi}=t
$$

であるから、整数型なら $t$ は整数でなければならない。逆に $t=m\in\mathbb Z_{>0}$ なら、[テンソル冪の曲率公式](#prop-kah1-14-positive-curvature)により $\mathcal O(m)=\mathcal O(1)^{\otimes m}$ が $\omega_m/(2\pi)$ を第一Chern形式として実現する。したがって

$$
\boxed{\ t\omega_{\mathrm{FS}}\ \text{がKähler}\iff t>0,\qquad
[\omega_t/(2\pi)]\ \text{が整数型}\iff t\in\mathbb Z\ \ (t>0).\ }
$$

$t=\sqrt2$ は「**非整数Kähler形式を持つ射影多様体**」という例であって、「非射影Kähler多様体」の例ではない。この論理の違いは本章の最重要点である。

### 6.2 積 $\mathbb{CP}^1\times\mathbb{CP}^1$

二つの射影直線への射影を $\pi_1,\pi_2$ とし、

$$
\alpha=\pi_1^*\omega_{\mathrm{FS}},
\quad \beta=\pi_2^*\omega_{\mathrm{FS}},
\quad \omega_{a,b}=a\alpha+b\beta
$$

と置く。$X$ の複素接空間は二因子の直和であり、[積Kähler形式の構成](../KAH1-05/index.md#thm-kah1-05-product)から $\omega_{a,b}$ がKählerになるのは $a>0,b>0$ のときに限る。

$C_1=\mathbb{CP}^1\times\{q\}$、$C_2=\{p\}\times\mathbb{CP}^1$ に制限する。$C_1$ では $\beta$ が零となり、$C_2$ では $\alpha$ が零となるから

$$
\int_{C_1}\frac{\omega_{a,b}}{2\pi}=a,\qquad
\int_{C_2}\frac{\omega_{a,b}}{2\pi}=b.
$$

整数型なら両方の周期が整数なので $a,b\in\mathbb Z$ が必要。一方、正の整数 $a,b$ なら

$$
L_{a,b}
=\pi_1^*\mathcal O(a)\otimes\pi_2^*\mathcal O(b)
$$

に積から誘導した計量を入れ、局所計量の対数を足すと、第一Chern形式は $\omega_{a,b}/(2\pi)$ となる。この具体的な正則線束を構成できるので整数性は十分でもある。ゆえに **$a,b>0$ の範囲では、整数型となることと $a,b$ が正の整数であることが同値**である。

同じ積でも $(a,b)=(1,\sqrt2)$ はKählerだが規格化類は整数型でない。しかし $(a,b)=(1,1)$ は整数型であり、この空間自体の射影性とは矛盾しない。

### 6.3 非コンパクトな複素平面

$\mathbb C$ の実関数 $\varphi=|z|^2$ を使うと

$$
h=e^{-|z|^2},\qquad
\Theta_{\mathcal O_{\mathbb C},h}
=\frac{i}{2\pi}\partial\bar\partial|z|^2
=\frac{i}{2\pi}dz\wedge d\bar z>0.
$$

これは**自明な正則線束**にも非コンパクト空間上では正のHermite計量を入れられる例である。[大域ポテンシャルによる類の不変性](../KAH1-13/index.md#prop-kah1-13-global-potential-exact)から、対応するKähler形式 $i\,dz\wedge d\bar z$ のde Rham類は零。一方 $\mathbb C$ はコンパクトでないから、「正の線束があるなら閉じた射影部分多様体として埋め込める」というコンパクト版の結論を適用できない。

## 7. どこから先に大域理論が必要か

ここまでで自力で示した矢印は

$$
\begin{gathered}
X\ \text{射影的}
\ \Longrightarrow\ f^*\mathcal O(1)\ \text{は正の線束},\\
L\ \text{正の線束}
\ \Longrightarrow\
\left[\frac{2\pi\,c_1(L,h)}{2\pi}\right]=r(c_1(L))
\ \text{は整数型のKähler類}.
\end{gathered}
$$

逆向きの一般論には、次のような追加の結果が要る。

**Kodaira埋め込み定理（ここでは結果先行）。** 空でないコンパクト複素多様体 $X$ に正の正則線束 $L$ があれば、十分大きな整数 $m$ について $L^{\otimes m}$ の大域正則切断が $X$ を射影空間に正則埋め込みできる。この主張は本章の局所曲率計算だけからは証明できず、大域的な切断の存在・分離が核心である。完全な証明は後続の**複素代数幾何学（CAG1）**の範囲に置く。

さらに整数型のKähler類 $\alpha=[\omega/(2\pi)]$ が与えられたとき、それが何らかの正則線束 $L$ の $c_1(L)$ の実像となることや、対応する曲率を正の形式にできることを示すには、**整数 $(1,1)$ 類と正則線束の対応**や**大域 $\partial\bar\partial$ 補題**が必要になる。前者とHodge分解は後続の**Kähler・Hodge理論（HOD1）**、射影的な解釈はCAG1で扱う。本章の計算は、その大域定理の仮定を置き換えるものではない。

特に、次の三つは論理的に違う。

- **あるKähler形式を選んだら整数型でなかった。** 射影直線の $\sqrt2\,\omega_{\mathrm{FS}}$ が該当する。多様体が射影的でないとは言えない。
- **整数型のKähler形式が一つもない。** これは多様体のすべてのKähler類に関する主張で、ひとつの非整数例からは導けない。
- **Kähler構造を持つが射影的でない。** このようなコンパクト複素多様体は存在するが、具体的な存在証明には本章で扱わない複素トーラスの整数 $(1,1)$ 類などの大域的判定が要る。

射影性を判断するには、局所的な正値計算に加えて、線束と整数係数コホモロジーの情報を見なければならない。

## 8. 演習：射影性・曲率・整数性を見分ける

### Level A

<a id="ex-kah1-14-a01"></a>
#### KAH1-14-A01 線形射影部分空間への制限
- Level: A

$\mathbb{CP}^1\to\mathbb{CP}^2$、$[u:v]\mapsto[u:v:0]$ について、$u\ne0$ の座標 $z=v/u$ を使い、引き戻したFubini–Study形式を求めよ。正値性も直接確認せよ。

<!-- solution-start -->
**詳細解答。** $\mathbb{CP}^2$ の $Z_0\ne0$ の座標を $(z_1,z_2)$ とすると、埋め込みは $z\mapsto(z,0)$。局所ポテンシャルは $\log(1+|z_1|^2+|z_2|^2)$ なので、その引き戻しは $\log(1+|z|^2)$ である。[Fubini–Study局所式](../KAH1-06/index.md#def-kah1-06-local-fs)から

$$
\begin{aligned}
\partial_z\log(1+z\bar z)&=\frac{\bar z}{1+|z|^2},\\
\partial_{\bar z}\frac{\bar z}{1+|z|^2}
&=\frac{1+|z|^2-|z|^2}{(1+|z|^2)^2}
=\frac1{(1+|z|^2)^2},\\
f^*\omega_{\mathrm{FS}}
&=\frac{i\,dz\wedge d\bar z}{(1+|z|^2)^2}.
\end{aligned}
$$

係数は全点で正なので、非零な $(1,0)$ 接ベクトル $v$ に対して $-i(f^*\omega_{\mathrm{FS}})(v,\bar v)=|v^z|^2/(1+|z|^2)^2>0$。もう一方の射影チャートでも同じ形式に貼り合うことは[貼り合わせ定理](../KAH1-07/index.md#thm-kah1-07-global-fs)から従う。
<!-- solution-end -->

<a id="ex-kah1-14-a02"></a>
#### KAH1-14-A02 規格化周期を判定する
- Level: A

$\mathbb{CP}^1$ 上で $\omega_t=t\omega_{\mathrm{FS}}$ と置く。$t=3,\;t=1/2,\;t=-1$ の各場合についてKähler性と $[\omega_t/(2\pi)]$ の整数性を判定せよ。整数性が肯定される場合は対応する線束を挙げよ。

<!-- solution-start -->
**詳細解答。** $\omega_{\mathrm{FS}}$ が正の実閉 $(1,1)$ 形式だから $\omega_t$ の正値性は $t>0$ と同値である。規格化面積は[射影直線の面積積分](../KAH1-07/index.md#thm-kah1-07-area)から

$$
\int_{\mathbb{CP}^1}\frac{\omega_t}{2\pi}
=\frac{t}{2\pi}\,2\pi=t.
$$

$t=3$ はKählerで、$\mathcal O(3)$ の第一Chern形式が $\omega_3/(2\pi)$ になるから整数型。$t=1/2$ はKählerだが周期が整数でないので整数型ではない。$t=-1$ は負の形式なのでKählerではない。ただし $[-\omega_{\mathrm{FS}}/(2\pi)]=r(c_1(\mathcal O(-1)))$ は整数類の実像であり、**整数性だけなら満たす**。「整数型のKähler類」と「単なる整数実類」を混同しない。
<!-- solution-end -->

<a id="ex-kah1-14-a03"></a>
#### KAH1-14-A03 テンソル冪と曲率
- Level: A

$\mathcal O(1)$ の $Z_0\ne0$ の局所計量を $h_0=(1+|z|^2)^{-1}$ とする。$\mathcal O(2)$ に誘導した計量の接続形式、曲率、第一Chern形式を求め、$\mathbb{CP}^1$ 上の第一Chern形式の積分を求めよ。

<!-- solution-start -->
**詳細解答。** 誘導計量は $h_0^2=(1+|z|^2)^{-2}$。[線束のChern接続公式](../../CM/CM2-10/index.md#prop-cm2-10-line-formula)へ代入すると

$$
A^{(2)}=\partial\log h_0^2
=-2\,\frac{\bar z}{1+|z|^2}\,dz.
$$

さらに $\partial_{\bar z}(\bar z/(1+|z|^2))=(1+|z|^2)^{-2}$ と計算し、

$$
\begin{aligned}
F^{(2)}&=\bar\partial A^{(2)}
=-\frac{2\,d\bar z\wedge dz}{(1+|z|^2)^2}
=\frac{2\,dz\wedge d\bar z}{(1+|z|^2)^2},\\
c_1(\mathcal O(2),h^2)
&=\frac{i}{2\pi}F^{(2)}
=2\,\frac{\omega_{\mathrm{FS}}}{2\pi}.
\end{aligned}
$$

従って全射影直線で積分すると $2(2\pi)/(2\pi)=2$。曲率は $\mathcal O(1)$ の2倍であり、遷移関数を二乗する線束の構成とも一致する。
<!-- solution-end -->

<a id="ex-kah1-14-a04"></a>
#### KAH1-14-A04 トーラスの整数周期
- Level: A

$T=\mathbb C/(\mathbb Z+i\mathbb Z)$ に対し $\omega_s=s\,i\,dz\wedge d\bar z$、$s>0$ と置く。$\int_T\omega_s/(2\pi)$ を求め、$s=1$ が整数型でないことを示せ。また周期を整数 $1$ にする $s$ を一つ求めよ。最後の計算だけから正則線束の存在を主張できるか。

<!-- solution-start -->
**詳細解答。** $z=x+iy$ に対して $i\,dz\wedge d\bar z=2\,dx\wedge dy$ なので、単位正方形を基本領域にとれば

$$
\int_T\frac{\omega_s}{2\pi}
=\frac{s}{2\pi}\int_0^1\int_0^1 2\,dx\,dy
=\frac{s}{\pi}.
$$

整数類なら周期は整数なので $s=1$ では $1/\pi\notin\mathbb Z$ となり整数型ではない。$s=\pi$ とすれば周期は $1$ になる。ここで計算したのは必要な**周期条件**であり、それだけで線束の存在を証明したことにはならない。後続の整数 $(1,1)$ 類と正則線束の対応を必要とする。なおこの特定の実2次元トーラスで整数性が十分となること自体は、後続理論から得られる。
<!-- solution-end -->

### Level B

<a id="ex-kah1-14-b01"></a>
#### KAH1-14-B01 二因子の正値性と整数性
- Level: B

$X=\mathbb{CP}^1\times\mathbb{CP}^1$、$\omega_{a,b}=a\pi_1^*\omega_{\mathrm{FS}}+b\pi_2^*\omega_{\mathrm{FS}}$ とする。Kählerとなる条件と、その範囲で $[\omega_{a,b}/(2\pi)]$ が整数型となる条件を求めよ。$(a,b)=(2,3)$ を実現する正の線束を挙げよ。

<!-- solution-start -->
**詳細解答。** $T^{1,0}X=T^{1,0}\mathbb{CP}^1\oplus T^{1,0}\mathbb{CP}^1$ である。$v=(v_1,0)$ を入れると正値性には $a>0$ が必要、$v=(0,v_2)$ では $b>0$ が必要。逆に両方正なら、任意の非零 $v=(v_1,v_2)$ について

$$
-i\omega_{a,b}(v,\bar v)
=a\{-i\omega_{\mathrm{FS}}(v_1,\bar v_1)\}
+b\{-i\omega_{\mathrm{FS}}(v_2,\bar v_2)\}>0.
$$

実性・閉性・型は和と引き戻しで保存されるので $a,b>0$ が必要十分である。二つの因子曲線 $C_1,C_2$ へ制限した積分は

$$
\int_{C_1}\frac{\omega_{a,b}}{2\pi}=a,\qquad
\int_{C_2}\frac{\omega_{a,b}}{2\pi}=b.
$$

整数型なら $a,b$ は整数である。逆に正の整数なら、[正の線束のテンソル冪の曲率](#prop-kah1-14-positive-curvature)を因子ごとに使って、$\pi_1^*\mathcal O(a)\otimes\pi_2^*\mathcal O(b)$ の曲率が $\omega_{a,b}/(2\pi)$ になる。ゆえに整数型の必要十分条件は $a,b\in\mathbb Z_{>0}$。$(2,3)$ では $\pi_1^*\mathcal O(2)\otimes\pi_2^*\mathcal O(3)$ を選べばよい。
<!-- solution-end -->

<a id="ex-kah1-14-b02"></a>
#### KAH1-14-B02 正則写像で正値性が壊れる場所
- Level: B

$f:\mathbb C^2\to\mathbb{CP}^1$ を $f(z,w)=[1:z]$ とする。$f^*\omega_{\mathrm{FS}}$ を求め、実閉 $(1,1)$ 型と正値性を別々に調べよ。なぜ前節の正則埋め込みの命題に矛盾しないか。

<!-- solution-start -->
**詳細解答。** $f$ は $w$ に依存しないから、標準チャートでのポテンシャルは $\log(1+|z|^2)$。従って

$$
f^*\omega_{\mathrm{FS}}
=\frac{i\,dz\wedge d\bar z}{(1+|z|^2)^2}
$$

となる。係数は実正値なので実 $(1,1)$ 型であり、$d(f^*\omega_{\mathrm{FS}})=f^*(d\omega_{\mathrm{FS}})=0$。しかし非零の接ベクトル $v=\partial_w$ では $dz(v)=0$ なので

$$
-i(f^*\omega_{\mathrm{FS}})(\partial_w,\partial_{\bar w})=0.
$$

正値性は失われる。実際、$df(\partial_w)=0$ で微分は単射でない。正則写像という仮定だけでなく、[埋め込みへの制限命題](#prop-kah1-14-projective-restriction)の微分単射性が必要だった。
<!-- solution-end -->

<a id="ex-kah1-14-b03"></a>
#### KAH1-14-B03 非コンパクト性と正の自明束
- Level: B

$\mathbb C$ の自明線束の標準正則枠 $e$ に $h(e,e)=e^{-|z|^2}$ を入れる。第一Chern形式が正値でありながら実de Rham類が零であることを、実1形式の原始形式を構成して示せ。なぜコンパクト多様体の障害と矛盾しないか。

<!-- solution-start -->
**詳細解答。** $h=e^{-|z|^2}$ より $\partial\log h=-\bar z\,dz$、曲率は

$$
F=\bar\partial(-\bar z\,dz)
=-d\bar z\wedge dz=dz\wedge d\bar z.
$$

ゆえに第一Chern形式 $\Theta=(i/2\pi)dz\wedge d\bar z=(1/\pi)dx\wedge dy$ は正値である。実1形式

$$
\alpha=\frac1{2\pi}(x\,dy-y\,dx)
$$

を用いれば

$$
d\alpha=\frac1{2\pi}
(dx\wedge dy-dy\wedge dx)
=\frac1\pi\,dx\wedge dy=\Theta.
$$

したがって $[\Theta]=0$ である。自明線束の整数第一Chern類も零であり整合する。[コンパクトKähler類の非零性](../KAH1-13/index.md#thm-kah1-13-compact-nonzero)は**コンパクトかつ境界なし**を仮定するため、非コンパクトな $\mathbb C$ には適用できない。
<!-- solution-end -->

### Level C

<a id="ex-kah1-14-c01"></a>
#### KAH1-14-C01 三つの条件の論理関係を検証する
- Level: C

$X=\mathbb{CP}^1\times\mathbb{CP}^1$ とし、$C_1,C_2$ を各因子曲線、$\alpha,\beta$ を二因子のFubini–Study形式の引き戻しとする。次に答えよ。

1. $\Omega=\alpha+\sqrt2\,\beta$ はKähler形式か。その規格化類は整数型か。
2. $L=\pi_1^*\mathcal O(1)\otimes\pi_2^*\mathcal O(2)$ の標準積計量の第一Chern形式 $\Theta_L$ を求め、$2\pi\Theta_L$ がKähler形式であることを示せ。
3. $\int_X\Omega^2$ と $\int_X(2\pi\Theta_L)^2$ を計算せよ。
4. 「$\Omega$ が整数型ではない」から「$X$ は射影的でない」を推論できるか。論理上足りない条件と、逆向きに使う深い定理の位置づけを説明せよ。

<!-- solution-start -->
**詳細解答。** 第1問。積接空間では

$$
-i\Omega(v,\bar v)
=\{-i\omega_{\mathrm{FS}}(v_1,\bar v_1)\}
+\sqrt2\{-i\omega_{\mathrm{FS}}(v_2,\bar v_2)\}>0
$$

であり、実閉 $(1,1)$ 型でもあるからKähler形式。一方、因子曲線 $C_2$ 上の規格化積分は

$$
\int_{C_2}\frac{\Omega}{2\pi}
=\frac{\sqrt2}{2\pi}\int_{\mathbb{CP}^1}\omega_{\mathrm{FS}}
=\sqrt2\notin\mathbb Z.
$$

したがって整数型ではない。

第2問。[線束のテンソル冪の曲率公式](#prop-kah1-14-positive-curvature)を $\pi_1^*\mathcal O(1)$ と $\pi_2^*\mathcal O(2)$ に適用する。局所枠の計量が積 $h_1 h_2^2$ であるため、

$$
\begin{aligned}
\Theta_L
&=-\frac{i}{2\pi}\partial\bar\partial
\log(h_1h_2^2)\\
&=-\frac{i}{2\pi}\partial\bar\partial\log h_1
 -\frac{2i}{2\pi}\partial\bar\partial\log h_2\\
&=\frac{\alpha+2\beta}{2\pi}.
\end{aligned}
$$

二因子の係数は両方正なので $2\pi\Theta_L=\alpha+2\beta$ はKähler形式であり、規格化類は $r(c_1(L))$。

第3問。各因子は実2次元なので $\alpha^2=\beta^2=0$、2形式同士の積は交換する。従って

$$
\begin{aligned}
\Omega^2&=2\sqrt2\,\alpha\wedge\beta,\\
(2\pi\Theta_L)^2&=4\,\alpha\wedge\beta.
\end{aligned}
$$

[射影直線の面積](../KAH1-07/index.md#thm-kah1-07-area)を二因子で掛けて $\int_X\alpha\wedge\beta=(2\pi)^2=4\pi^2$。したがって

$$
\boxed{\int_X\Omega^2=8\sqrt2\,\pi^2,\qquad
\int_X(2\pi\Theta_L)^2=16\pi^2.}
$$

第4問。推論できない。第1問は特定のKähler形式 $\Omega$ の整数性の否定にすぎず、第2問では同じ $X$ に**別の整数型Kähler形式**を実際に構成した。さらに $X$ はSegre写像

$$
([u_0:u_1],[v_0:v_1])
\longmapsto
[u_0v_0:u_0v_1:u_1v_0:u_1v_1]
$$

で $\mathbb{CP}^3$ へ埋め込める。実際、$u_0v_0\ne0$ の座標 $z=u_1/u_0$、$w=v_1/v_0$ では $[1:w:z:zw]$ となる。像は $Z_0Z_3=Z_1Z_2$ を満たし、$Z_0\ne0$ の部分では $(Z_1/Z_0,Z_2/Z_0)=(w,z)$ が逆座標である。微分は $(\delta z,\delta w)\mapsto(\delta w,\delta z,w\delta z+z\delta w)$ なので単射である。他の三つの標準チャートでも同じ座標計算を繰り返せる。この例から射影性の障害は生じない。正の線束があれば**大域切断によって射影埋め込みを構成する**のがKodaira埋め込み定理の核心であり、局所曲率から直ちに得られる事実ではない。また、単に整数型Kähler類が存在するという条件から線束を構成する段階にもHodge理論の大域的結果が必要となる。
<!-- solution-end -->

## 9. 次章へ

この章で得たのは、射影的な多様体から正の線束と整数型Kähler類が作れるという**具体的な構成方向**である。逆向きの定理には大域理論を使う必要があり、Kähler形式の実係数類と整数係数第一Chern類は最初から同一視できない。

次章では、これまで導いた[Ricci形式と第一Chern類](../KAH1-12/index.md#thm-kah1-12-ricci-chern)を使い、Kähler–Einstein条件 $\rho=\lambda\omega$ やRicci平坦条件 $\rho=0$ がコホモロジーに課す**必要条件**を導く。存在定理を必要条件の計算と混同しないことが次の焦点になる。
