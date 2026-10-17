# KAH1-12 Chern類と標準束

## 1. 局所のRicci形式から、大域的な束へ

前章では[Kähler計量のRicci形式の局所公式](../KAH1-11/index.md#thm-kah1-11-local-ricci)を得た。

$$
\rho=-i\partial\bar\partial\log\det G,\qquad G=(g_{i\bar j}).
$$

[Ricci形式の閉性](../KAH1-11/index.md#thm-kah1-11-closed)から $\rho$ はde Rham類 $[\rho]$ を定める。しかし「閉形式である」だけでは、何らかの整数に由来する類とは分からない。局所行列式が座標変換で変化する理由を、**正則接束の行列式束**の枠変換として捉え直す。

必要な材料はすでにある。[行列式束の定義](../../CM/CM2-08/index.md#def-cm2-08-determinant-bundle)、[誘導計量](../../CM/CM2-09/index.md#def-cm2-09-induced-metrics)、[誘導Chern接続](../../CM/CM2-10/index.md#prop-cm2-10-induced-connections)、[第一Chern形式](../../CM/CM2-11/index.md#def-cm2-11-first-chern-form)である。この章では、それらを接束に具体的に適用し、最後に局所的な正則対数から**整数の貼り合わせデータ**を取り出す。

以下 $X$ は複素次元 $n\ge1$ の滑らかな複素多様体、$g$ は正値Kähler計量とする。曲率の符号は $F_D=D^2$、基本形式は $\omega=i g_{i\bar j}dz^i\wedge d\bar z^j$ とする。

## 2. 行列式束と標準束は何を束ねるか

各点の正則接空間 $T_p^{1,0}X$ は複素 $n$ 次元である。正則座標 $z=(z^1,\ldots,z^n)$ では $\partial_{z^1},\ldots,\partial_{z^n}$ が局所正則枠になる。基底を最高外冪でまとめると、順序を保った「複素体積方向」が一つの線になる。これが[最高外冪による行列式束](../../CM/CM2-08/index.md#def-cm2-08-determinant-bundle)である。

反対に、接ベクトルを入力として受け取る正則共変テンソルの最高外冪は、正則な $n$ 形式の線束になる。この後者が本章の**標準束**である。

<a id="def-kah1-12-canonical"></a>

<!-- formal-statement-start -->
> **定義（標準束と反標準束）**  
> 複素次元 $n\ge1$ の複素多様体 $X$ に対し、標準束と反標準束を次の正則線束として定める。

$$
K_X:=\bigwedge^n T^{*1,0}X,\qquad
K_X^{-1}:=(K_X)^\vee.
$$

> 正則座標 $z$ における $K_X$ の正則枠は $\kappa_z=dz^1\wedge\cdots\wedge dz^n$ とする。
<!-- formal-statement-end -->

定義の各対象を確かめる。$T^{*1,0}X$ は正則接束の複素線形双対であり、各点で複素次元 $n$ なので、その最高外冪は複素一次元となる。[双対と行列式の交換](../../CM/CM2-08/index.md#prop-cm2-08-determinant-identities)によって

$$
K_X=\det(T^{*1,0}X)
\cong(\det T^{1,0}X)^\vee,\qquad
K_X^{-1}\cong\det T^{1,0}X.
$$

つまり「反標準束」は単なる逆数記号ではなく、標準束の**双対線束**を意味する。

<!-- definition-example-start: def-kah1-12-canonical -->
**定義の確認**（複素直線と座標変換）。 $\mathbb C$ の $z$ 座標では $dz$ が標準束の大域正則枠、$\partial_z$ が反標準束の大域正則枠で、$dz(\partial_z)=1$。局所座標 $w=2z$ を取ると

$$
dw=2\,dz,\qquad \partial_w=\frac12\partial_z.
$$

標準束の枠は $2$ 倍、反標準束の枠は $1/2$ 倍になり、双対評価は $(2)(1/2)=1$ のままである。両方の枠が大域に存在するため、$\mathbb C$ 上では両束とも自明である。
<!-- definition-example-end -->

一般の正則座標 $z=z(w)$ では $B=(\partial z^i/\partial w^a)$ の行列式が零でないため、

$$
\kappa_w=\det(B)^{-1}\kappa_z,\qquad
e_w=\det(B)e_z,\quad
e_z=\partial_{z^1}\wedge\cdots\wedge\partial_{z^n}.
$$

この二式は互いに逆の遷移係数を持つ。行列式の変換を単なる記号操作とせず、例えば $\partial_{w^a}=B^i{}_a\partial_{z^i}$ を $n$ 本外積に代入すれば、係数が $\det B$ になる。$dw^1\wedge\cdots\wedge dw^n$ はその双対枠なので逆係数となる。

## 3. 接束の接続を最高外冪に移す

[Chern接続の存在・一意性](../../CM/CM2-10/index.md#thm-cm2-10-chern-existence-uniqueness)により、$E=T^{1,0}X$ のHermite計量にはChern接続 $D$ がある。正則接枠を列として取り、係数ベクトルへ $D=d+A$ と作用させる。この約束では、局所Hermite計量行列は $H_{\ell j}=g_{j\bar\ell}$ で、$H$ は正値Hermite行列であり、$\det H=\det G>0$ である。

行列 $A=H^{-1}\partial H$ が表すものを確認する。$D e_j=\sum_k e_k A^k{}_j$ と書き、$e_1\wedge\cdots\wedge e_n$ を微分すると各因子の接続項が一度ずつ出る。$k\ne j$ の項には同じ枠が二度入るので外積が零となり、$k=j$ の対角成分だけが残る。この機構が[誘導接続のトレース公式](../../CM/CM2-10/index.md#prop-cm2-10-induced-connections)である。

<a id="prop-kah1-12-determinant-curvature"></a>

<!-- formal-statement-start -->
> **命題（接束の行列式接続と曲率）**  
> 上記のKähler多様体 $(X,g)$ に対し、$L=\det T^{1,0}X$ に誘導計量を入れる。正則座標枠でのChern接続1形式 $a_L$ と曲率 $F_L$ は

$$
a_L=\operatorname{tr}(H^{-1}\partial H)
=\partial\log\det G,\qquad
F_L=\bar\partial\partial\log\det G.
$$

> 特に、$F_L=\operatorname{tr}F_{T^{1,0}X}$ であり、大域的な $(1,1)$ 型の曲率2形式を定める。
<!-- formal-statement-end -->

### 証明の見取り図

行列式束の接続は接束の接続行列の跡。正値行列のJacobi公式で跡を対数行列式に直し、$D^2$ を計算する。行列式線束は階数一なので、そのChern接続の局所係数である1形式 $a_L$ の自乗外積は零になる。

<!-- proof-start -->
### 証明

[誘導Chern接続の公式](../../CM/CM2-10/index.md#prop-cm2-10-induced-connections)を $E=T^{1,0}X$ に適用し、$a_L=\operatorname{tr}A$ を得る。$A=H^{-1}\partial H$ だから、

$$
a_L=\operatorname{tr}(H^{-1}\partial H).
$$

$\det H>0$ なので $\log\det H$ が滑らかな実関数となる。[Jacobiの行列式微分公式](../KAH1-11/index.md#lem-kah1-11-jacobi)を各正則座標方向の微分 $\partial_i$ に使うと

$$
\partial_i\log\det H
=\frac{\partial_i\det H}{\det H}
=\operatorname{tr}(H^{-1}\partial_i H).
$$

$dz^i$ を掛けて和を取れば $a_L=\partial\log\det H=\partial\log\det G$ となる。$L$ は階数一の束なので $a_L\wedge a_L=0$。従って

$$
\begin{aligned}
F_L&=d a_L+a_L\wedge a_L\\
&=(\partial+\bar\partial)\partial\log\det G\\
&=\underbrace{\partial^2\log\det G}_{0}
+\bar\partial\partial\log\det G.
\end{aligned}
$$

[CM2-11の双対・テンソル積・行列式束の曲率](../../CM/CM2-11/index.md#prop-cm2-11-induced-curvature)を $E=T^{1,0}X$ に適用して $F_L=\operatorname{tr}F_{T^{1,0}X}$ が得られる。曲率は枠変更の下で共役変換され、その跡は変わらない。ゆえに局所式は大域に貼り合う。$\square$
<!-- proof-end -->

**直接例：平坦な二次元模型。** $\mathbb C^2$ で $G=\operatorname{diag}(2,3)$ とする。$g(v,\bar v)=2|v^1|^2+3|v^2|^2>0$ で正値、係数は定数なので基本形式は閉じておりKählerである。誘導行列は $\det H=6$、$a_L=\partial\log6=0$、$F_L=0$。大きさ $6$ は曲率ではない。曲率に寄与するのはその**変化率**である。

## 4. Ricci形式と第一Chern形式を同じ式へ

前章の[Ricci形式の局所公式](../KAH1-11/index.md#thm-kah1-11-local-ricci)と、今の命題で得た $F_L$ を突き合わせる。

<a id="thm-kah1-12-ricci-chern"></a>

<!-- formal-statement-start -->
> **定理（Ricci形式と反標準束の第一Chern形式）**  
> 複素次元 $n\ge1$ のKähler多様体 $(X,g)$ で、正則接束と反標準束 $K_X^{-1}$ に誘導Hermite計量を入れる。このとき

$$
\boxed{\rho=iF_{K_X^{-1}},\qquad
c_1(K_X^{-1},h)=\frac{\rho}{2\pi}.}
$$

> 右辺は滑らかな実閉2形式であり、正規化係数は $2\pi$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$F_L=\bar\partial\partial\log\det G$ と、$\rho=-i\partial\bar\partial\log\det G$ を比較する。**型別微分の反交換**が一回必要であり、そこが符号を決める。

<!-- proof-start -->
### 証明

[行列式束の同型](../../CM/CM2-08/index.md#prop-cm2-08-determinant-identities)で $L=\det T^{1,0}X\cong K_X^{-1}$。[本章の接束の行列式接続と曲率](#prop-kah1-12-determinant-curvature)を用いると、

$$
\begin{aligned}
iF_{K_X^{-1}}
&=i\,\bar\partial\partial\log\det G\\
&=-i\,\partial\bar\partial\log\det G\\
&=\rho.
\end{aligned}
$$

二行目では滑らかな0形式に $\bar\partial\partial=-\partial\bar\partial$ を適用した。最後は前章の[Ricci形式の公式](../KAH1-11/index.md#thm-kah1-11-local-ricci)そのものである。さらに[第一Chern形式の定義](../../CM/CM2-11/index.md#def-cm2-11-first-chern-form)へ階数1の束を代入すれば

$$
c_1(K_X^{-1},h)=\frac{i}{2\pi}F_{K_X^{-1}}=\frac{\rho}{2\pi}.
$$

[Ricci形式の閉性](../KAH1-11/index.md#thm-kah1-11-closed)により右辺は閉じており、前章で実性も確認済みである。$\square$
<!-- proof-end -->

**なぜ $2\pi$ を省けないか。** [Fubini–Study計量のRicci形式](../KAH1-11/index.md#thm-kah1-11-local-ricci)は $\mathbb{CP}^n$ で $\rho=(n+1)\omega_{\mathrm{FS}}$。一方、[射影直線の面積計算](../KAH1-07/index.md#thm-kah1-07-area)は $\int_{\mathbb{CP}^1}\omega_{\mathrm{FS}}=2\pi$。従って接束側の第一Chern形式を射影直線上で積分すると $n+1$ になる。この整数との一致こそ、$i/(2\pi)$ という正規化の動機である。

## 5. 曲率から整数係数の類へ移る橋

曲率2形式は滑らかな実量なのに、「Chern類」には整数係数という追加情報がある。両者を混同しないため、ここで正則**線束**に限って遷移関数から整数を作る。これは一般の高次Chern類の構成とは別の、第一Chern類に必要な部分である。

十分小さい座標球で細分した開被覆 $\{U_\alpha\}$ を取り、空でない有限個の共通部分を可縮にできるもの（良い被覆）とする。正則線束 $L$ の正則枠を $s_\alpha$ とし、

$$
s_\beta=s_\alpha t_{\alpha\beta},\qquad
t_{\alpha\beta}:U_\alpha\cap U_\beta\to\mathbb C^\times
$$

と置く。三重重なりで $t_{\alpha\beta}t_{\beta\gamma}t_{\gamma\alpha}=1$ である。可縮な重なりでは零を持たない正則関数に正則対数があるので、$\ell_{\alpha\beta}$ を選んで $e^{\ell_{\alpha\beta}}=t_{\alpha\beta}$ とできる。逆向きの対数は $\ell_{\beta\alpha}=-\ell_{\alpha\beta}$ とそろえておく。

<a id="def-kah1-12-integral-first-chern"></a>

<!-- formal-statement-start -->
> **定義（整数係数の第一Chern類）**  
> 複素線束 $L$ の遷移関数と上記の対数を用い、各三重重なりで整数値関数

$$
m_{\alpha\beta\gamma}
=-\frac{\ell_{\alpha\beta}+\ell_{\beta\gamma}
+\ell_{\gamma\alpha}}{2\pi i}
$$

> を定める。連結な三重重なりではこれは一定の整数であり、開被覆上の整数値2-コサイクルとなる。その同値類を $c_1(L)\in H^2(X;\mathbb Z)$ と呼ぶ。異なる対数・正則枠・良い被覆から得られる同値類は一致する。
<!-- formal-statement-end -->

「整数」となるのは $\exp(\ell_{\alpha\beta}+\ell_{\beta\gamma}+\ell_{\gamma\alpha})=1$ なので、和が $2\pi i$ の整数倍だからである。四重重なりで交代和を取ると、それぞれの $\ell_{\alpha\beta}$ が相殺し2-コサイクル条件を満たす。対数を $2\pi i k_{\alpha\beta}$ だけ変えた場合の $m$ の変化は整数値1-コチェイン $k$ の境界で、同値類に影響しない。正則枠変更 $s'_\alpha=s_\alpha f_\alpha$ でも遷移の対数に $\log f_\beta-\log f_\alpha$ が加わるだけで、三重重なりでは相殺する。良い被覆の取り替えは共通細分で照合する。

ここでの $H^2(X;\mathbb Z)$ は良い被覆における整数値Čech 2-コサイクルの同値類であり、通常の整数係数特異コホモロジーと一致する（良い被覆の比較定理）。以後の式は、その整数類の実係数への写像とde Rham対応を意味する。この比較を**微分計算だけで当然としたのではなく**、対応の局所データを以下で具体的に検算する。

<!-- definition-example-start: def-kah1-12-integral-first-chern -->
**定義の確認**（大域枠がある場合）。 $L=X\times\mathbb C$ で同じ非零正則枠 $s$ をすべての $U_\alpha$ に使えば $t_{\alpha\beta}=1$、$\ell_{\alpha\beta}=0$。三重重なりのすべてで $m_{\alpha\beta\gamma}=0$ だから $c_1(L)=0$ となる。これは線束が自明という条件を直接反映する。逆に $c_1(L)=0$ だけから**大域非零正則枠**が存在すると主張することはできない。
<!-- definition-example-end -->

<a id="thm-kah1-12-integrality"></a>

<!-- formal-statement-start -->
> **定理（第一Chern形式は整数係数類の実像を表す）**  
> 複素多様体 $X$ 上の正則線束 $L$ に滑らかな正値Hermite計量 $h$ を与え、曲率を $F_D=D^2$ とする。このとき第一Chern形式のde Rham類は、上の整数係数第一Chern類の実係数への像に等しい。

$$
\left[\frac{i}{2\pi}F_D\right]
=c_1(L)_{\mathbb R}
\quad\text{in }H^2_{\mathrm{dR}}(X;\mathbb R).
$$

> この同定は計量 $h$ の選択に依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

局所Chern接続の係数は枠変更で $\partial\log t$ だけずれる。$i/(2\pi)$ を掛けると、その差は対数に由来する局所関数の外微分になる。三重重なりの局所関数のずれが上の**整数** $m_{\alpha\beta\gamma}$ である。良い被覆上のČech–de Rham比較は、まさにこの「局所1形式 → 局所関数 → 三重重なりの定数」を同じ2次コホモロジー類として読む。

<!-- proof-start -->
### 証明

正則局所枠 $s_\alpha$ におけるChern接続を $D=d+a_\alpha$ とする。[正則線束のChern接続と枠変更公式](../../CM/CM2-10/index.md#prop-cm2-10-line-formula)を $s_\beta=s_\alpha t_{\alpha\beta}$ に適用すると

$$
a_\beta=a_\alpha+t_{\alpha\beta}^{-1}dt_{\alpha\beta}
=a_\alpha+d\ell_{\alpha\beta}.
$$

正則性により $d\ell_{\alpha\beta}=\partial\ell_{\alpha\beta}$。局所的に

$$
\alpha_\alpha:=\frac{i}{2\pi}a_\alpha,\qquad
b_{\alpha\beta}:=-\frac{\ell_{\alpha\beta}}{2\pi i}
$$

と書く。$i=-1/i$ なので

$$
\alpha_\beta-\alpha_\alpha=db_{\alpha\beta},\qquad
b_{\alpha\beta}+b_{\beta\gamma}+b_{\gamma\alpha}
=m_{\alpha\beta\gamma}.
$$

また $d\alpha_\alpha=(i/2\pi)F_D$ である。これは閉2形式の局所原始1形式の差が局所関数の微分となり、その関数が三重重なりで整数だけずれる、という連鎖である。

対応を形式的な名前だけで済ませないため、良い被覆の局所有限な従属分割 $\{\chi_\beta\}$ を選び、$U_\alpha$ 上で

$$
\gamma_\alpha
=\alpha_\alpha+\sum_\beta\chi_\beta\,db_{\alpha\beta}
$$

と置く（各項は $U_\alpha\cap U_\beta$ で計算し、$\chi_\beta$ の台の外で零とする）。三重重なりの $dm_{\alpha\beta\gamma}=0$ から

$$
db_{\beta\gamma}-db_{\alpha\gamma}=-db_{\alpha\beta}.
$$

したがって $\gamma_\beta-\gamma_\alpha=db_{\alpha\beta}-
(\sum_\gamma\chi_\gamma)db_{\alpha\beta}=0$。$\gamma_\alpha$ は大域1形式 $\gamma$ に貼り合い、

$$
\frac{i}{2\pi}F_D
=d\gamma-\sum_\beta d\chi_\beta\wedge db_{\alpha\beta}
\qquad\text{on }U_\alpha.
$$

最後の和は添字 $\alpha$ に依存しない大域2形式である。これは整数コサイクル $m$ のČech–de Rham比較で得られる代表に一致する。実際、$q_\alpha=\sum_\gamma\chi_\gamma b_{\alpha\gamma}$ と置けば

$$
b_{\alpha\beta}
=\sum_\gamma\chi_\gamma m_{\alpha\beta\gamma}
-q_\beta+q_\alpha
$$

だから、最後の和は整数 $m_{\alpha\beta\gamma}$ と分割 $\chi$ だけの項、および $d(\sum_\beta\chi_\beta dq_\beta)$ という完全形式に分かれる。よってそのde Rham類は $m$ の同値類で定まる。これで整数2-コサイクルと曲率の局所データの対応を確かめた。

さらに同じ正則線束に二つの計量を入れた場合、[第一Chern形式の計量変更公式](../../CM/CM2-11/index.md#prop-cm2-11-chern-closed)によって差は完全2形式になる。ゆえにde Rham類は計量の選択に依存しない。$\square$
<!-- proof-end -->

**区別しておくこと。** $c_1(L)$ は整数係数類、$c_1(L)_{\mathbb R}$ はその実係数への像であり、$c_1(L,h)$ は実際の2形式である。整数係数のtorsion類は実係数へ送ると零になるため、**実係数第一Chern類が零でも整数係数第一Chern類の零とは限らない**。さらにそのどちらも、線束が正則に自明であることと同じ条件ではない。

## 6. 標準束では符号が反転する

標準束と反標準束が双対であることから、接続係数は負になる。[双対の誘導接続](../../CM/CM2-10/index.md#prop-cm2-10-induced-connections)を階数1の $L=K_X^{-1}$ に適用すると $a_{K_X}=-a_L$。したがって曲率も $F_{K_X}=-F_L$ である。

<a id="cor-kah1-12-canonical-sign"></a>

<!-- formal-statement-start -->
> **系（標準束の符号と第一Chern類）**  
> 複素次元 $n\ge1$ のKähler多様体 $(X,g)$ について

$$
c_1(X):=c_1(T^{1,0}X)
=c_1(\det T^{1,0}X)
=c_1(K_X^{-1})
$$

> と置く。このとき、整数係数および実係数で

$$
c_1(K_X)=-c_1(X),\qquad
c_1(X)_{\mathbb R}
=\left[\frac{\rho}{2\pi}\right].
$$

> また誘導計量の第一Chern形式としては $c_1(K_X,h_K)=-\rho/(2\pi)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

整数係数の符号は遷移係数を逆数にしたとき正則対数の三重和が負になることから得る。実係数側ではChern接続の双対曲率が負になることを使う。第一Chern類は接束の行列式束によって定義するので、階数と次数が混ざらない。

<!-- proof-start -->
### 証明

[行列式と双対の同型](../../CM/CM2-08/index.md#prop-cm2-08-determinant-identities)から $K_X=(\det T^{1,0}X)^\vee$。元の行列式線束の遷移が $t_{\alpha\beta}$ なら、双対線束の遷移は $t_{\alpha\beta}^{-1}$。その対数を $-\ell_{\alpha\beta}$ と取れば、[整数第一Chern類の定義](#def-kah1-12-integral-first-chern)における三重和は元の値の負。従って

$$
c_1(K_X)=-c_1(\det T^{1,0}X)=-c_1(X).
$$

実形式については、[CM2-11の双対・テンソル積・行列式束の曲率](../../CM/CM2-11/index.md#prop-cm2-11-induced-curvature)を $L=K_X^{-1}$ に適用すると

$$
F_{K_X}=-F_{K_X^{-1}},\qquad
\frac{i}{2\pi}F_{K_X}
=-\frac{i}{2\pi}F_{K_X^{-1}}
=-\frac{\rho}{2\pi}.
$$

最後に[曲率と整数係数類の比較定理](#thm-kah1-12-integrality)で $[\rho/(2\pi)]=c_1(K_X^{-1})_{\mathbb R}$ を得る。$\square$
<!-- proof-end -->

**符号の直接検算：$\mathbb{CP}^1$。** [Fubini–Study計量](../KAH1-07/index.md#thm-kah1-07-global-fs)は $\rho=2\omega_{\mathrm{FS}}$ を与える。ゆえに

$$
\int_{\mathbb{CP}^1}\frac{\rho}{2\pi}
=2\frac{1}{2\pi}\int_{\mathbb{CP}^1}\omega_{\mathrm{FS}}
=2.
$$

一方 $w=1/z$ で $\partial_w=-z^2\partial_z$、$\kappa_w=dw=-z^{-2}dz$ である。つまり $T^{1,0}\mathbb{CP}^1\cong\mathcal O(2)$、$K_{\mathbb{CP}^1}\cong\mathcal O(-2)$（定数符号 $-1$ は枠を変えれば除去できる）。[射影直線上の $\mathcal O(k)$ の曲率積分](../../CM/CM2-11/index.md#thm-cm2-11-projective-line)をそれぞれに適用すると $+2,-2$。Ricci形式と束の遷移という二つの計算が一致する。

## 7. 正負・零をどう読むか

**平坦な複素トーラス**では一定計量の $\det G$ は定数だから $\rho=0$。さらに一定座標 $dz^1\wedge\cdots\wedge dz^n$ は格子平行移動で不変なので、標準束は大域非零正則枠を持ち、整数係数の $c_1(K_X)$ も零である。ここでは曲率消滅だけで標準束自明と結論しているのではなく、**枠を実際に構成**している。

**複素射影空間 $\mathbb{CP}^n$** では $\rho=(n+1)\omega_{\mathrm{FS}}$ であり、$\mathbb{CP}^1$ 上の評価は $n+1$。従って $c_1(X)_{\mathbb R}\ne0$ である。これはコンパクトKähler多様体全般について「Ricci形式はいつも正」という意味ではない。

本章の結論は、Ricci形式が表すのは計量の局所的な二階微分だけでなく、正則接束の行列式束の**大域的な貼り合わせ障害**であるということだ。ただし $[\rho]=0$ から特定の計量で $\rho=0$ とは言えず、Ricci平坦計量の存在はさらに深い問題となる。

## 8. 演習：曲率、遷移、整数類、双対を往復する

### Level A

<a id="ex-kah1-12-a01"></a>
#### KAH1-12-A01 対角接続から行列式接続へ
- Level: A

$\mathbb C$ 上の自明階数2正則束に $H=\operatorname{diag}(e^{|z|^2},e^{2|z|^2})$ を入れる。$\operatorname{tr}A$、$F_{\det E}$、$c_1(E,h)$ を求めよ。

<!-- solution-start -->
**詳細解答。** 計量は両対角成分が正なので正値Hermiteである。$H^{-1}\partial H=\operatorname{diag}(\bar z\,dz,2\bar z\,dz)$ だから $\operatorname{tr}A=3\bar z\,dz$。外微分では

$$
F_{\det E}=d(3\bar z\,dz)
=3\,d\bar z\wedge dz
=-3\,dz\wedge d\bar z.
$$

[第一Chern形式](../../CM/CM2-11/index.md#def-cm2-11-first-chern-form)より $c_1(E,h)=-(3i/2\pi)\,dz\wedge d\bar z$。なおこの束は自明だからde Rham類は零であり、非零の局所形式と類の非零を混同しない。
<!-- solution-end -->

<a id="ex-kah1-12-a02"></a>
#### KAH1-12-A02 標準枠と接枠の逆倍率
- Level: A

$\mathbb C^2$ で $w^1=2z^1$、$w^2=3z^2$ とする。接束の最高外冪枠と標準束の枠がどう変わるかを計算し、両者の評価が $1$ であることを確認せよ。

<!-- solution-start -->
**詳細解答。** $z^1=w^1/2,z^2=w^2/3$ なので $\partial_{w^1}=\frac12\partial_{z^1}$、$\partial_{w^2}=\frac13\partial_{z^2}$。外積では

$$
\partial_{w^1}\wedge\partial_{w^2}
=\frac16\,\partial_{z^1}\wedge\partial_{z^2}.
$$

一方 $dw^1\wedge dw^2=6\,dz^1\wedge dz^2$。双対評価は $(6)(1/6)=1$。Jacobi行列の行列式と逆行列式が現れることを基底の変換から確認できた。
<!-- solution-end -->

<a id="ex-kah1-12-a03"></a>
#### KAH1-12-A03 実形式と2π
- Level: A

$\mathbb C$ 上のKähler計量 $g_{z\bar z}=e^{-|z|^2}$ のRicci形式と、反標準束の第一Chern形式を求めよ。実2形式としての符号も確かめよ。

<!-- solution-start -->
**詳細解答。** $g_{z\bar z}>0$、複素一次元では基本実2形式の外微分は次数3なので零。したがってKähler計量である。$\log G=-z\bar z$ より $\partial_z\partial_{\bar z}\log G=-1$。[Ricci形式の局所行列式公式](../KAH1-11/index.md#thm-kah1-11-local-ricci)を使い

$$
\rho=i\,dz\wedge d\bar z=2\,dx\wedge dy.
$$

[反標準束の第一Chern形式](#thm-kah1-12-ricci-chern)は $\rho/(2\pi)=(1/\pi)\,dx\wedge dy$ で正の実形式。元の複素平面ではこの2形式は完全であり、類は零である。
<!-- solution-end -->

<a id="ex-kah1-12-a04"></a>
#### KAH1-12-A04 双対の整数コサイクル
- Level: A

良い被覆の三重重なりで $\ell_{\alpha\beta}+\ell_{\beta\gamma}+\ell_{\gamma\alpha}=4\pi i$ が得られた線束 $L$ を考える。局所整数 $m_{\alpha\beta\gamma}$ と双対 $L^\vee$ の値を求めよ。

<!-- solution-start -->
**詳細解答。** [整数第一Chern類の定義](#def-kah1-12-integral-first-chern)に代入すると $m_{\alpha\beta\gamma}=-(4\pi i)/(2\pi i)=-2$。双対の遷移は $t_{\alpha\beta}^{-1}$ なので、その対数は $-\ell_{\alpha\beta}$ と選べる。三重和は $-4\pi i$、従って $m^\vee_{\alpha\beta\gamma}=2$。これは局所のコサイクル値の計算であって、**一つの三重重なりの値だけで全体の類が非零と判定できるわけではない**。
<!-- solution-end -->

### Level B

<a id="ex-kah1-12-b01"></a>
#### KAH1-12-B01 非対角計量の行列式曲率
- Level: B

$\mathbb C$ 上の自明階数2正則束に

$$
H(z)=
\begin{pmatrix}
1+|z|^2&z\\
\bar z&1
\end{pmatrix}
$$

を与える。正値Hermite性、$\operatorname{tr}A$、第一Chern形式を計算せよ。

<!-- solution-start -->
**詳細解答。** $H$ はHermite対称。$1+|z|^2>0$、$\det H=(1+|z|^2)-z\bar z=1>0$ なのでSylvester判定により正値である。[行列式接続の命題](#prop-kah1-12-determinant-curvature)を一般Hermite束の[誘導接続](../../CM/CM2-10/index.md#prop-cm2-10-induced-connections)として適用すると

$$
\operatorname{tr}A=\partial\log\det H=\partial\log1=0,
\qquad
\operatorname{tr}F_D=\bar\partial\partial\log1=0.
$$

ゆえに第一Chern形式も零。$H$ の個々の成分が変数依存でも、**行列式束**の曲率は零になり得る。これは元の階数2束の全曲率成分が零という主張ではない。
<!-- solution-end -->

<a id="ex-kah1-12-b02"></a>
#### KAH1-12-B02 二つの計量で同じ類を得る
- Level: B

自明正則線束上で $h_0=e^{|z|^2}$、$h_1=e^{2|z|^2}$ とする。第一Chern形式の差が完全であることを具体的な原始1形式で示せ。

<!-- solution-start -->
**詳細解答。** 正の計量関数なので両方のChern接続が定まる。[正則線束の公式](../../CM/CM2-10/index.md#prop-cm2-10-line-formula)から $a_\nu=\partial\log h_\nu$。その差は

$$
a_1-a_0=\bar z\,dz,\qquad
F_1-F_0=d(\bar z\,dz)=d\bar z\wedge dz.
$$

従って

$$
c_1(h_1)-c_1(h_0)
=\frac{i}{2\pi}d(\bar z\,dz)
=d\left(\frac{i}{2\pi}\bar z\,dz\right).
$$

原始1形式は複素表示でもよいが、差の2形式は実である。$z=x+iy$ と書けば $d(\bar z\,dz)=d\bar z\wedge dz=2i\,dx\wedge dy$、差は $-(1/\pi)\,dx\wedge dy$。負号は $h_1/h_0=e^{|z|^2}$ の対数が増えると、$\bar\partial\partial\log(h_1/h_0)$ が $-dz\wedge d\bar z$ になることとも一致する。両計量のde Rham類はともに零。
<!-- solution-end -->

<a id="ex-kah1-12-b03"></a>
#### KAH1-12-B03 $\mathbb{CP}^1$ の接束と標準束
- Level: B

$\mathbb{CP}^1$ の $w=1/z$ による枠変換を直接計算し、$T^{1,0}X$ と $K_X$ を $\mathcal O(k)$ で同定せよ。各第一Chern形式の積分を求め、Ricci形式による値と比較せよ。

<!-- solution-start -->
**詳細解答。** 連鎖律より $dw/dz=-z^{-2}$、$dz/dw=-z^2$。したがって $\partial_w=-z^2\partial_z$、$dw=-z^{-2}dz$。前者は $\mathcal O(2)$、後者は $\mathcal O(-2)$ の遷移と定数倍を除いて同じである。[射影直線の曲率積分](../../CM/CM2-11/index.md#thm-cm2-11-projective-line)へ $k=\pm2$ を代入して

$$
\int_X c_1(T^{1,0}X)=2,\qquad
\int_X c_1(K_X)=-2.
$$

ここで積分対象は第一Chern**形式**である。[Ricci形式とChern形式の定理](#thm-kah1-12-ricci-chern)と $\rho=2\omega_{\mathrm{FS}}$ を用いる経路でも $\int_X\rho/(2\pi)=2$ で一致する。
<!-- solution-end -->

### Level C

<a id="ex-kah1-12-c01"></a>
#### KAH1-12-C01 射影空間と複素トーラスの標準束を比較する
- Level: C

$X=\mathbb{CP}^n$ ($n\ge1$) のFubini–Study計量と、$T=\mathbb C^m/\Lambda$ ($m\ge1$、$\Lambda$ は複素ベクトル空間の格子) の一定係数Kähler計量を考える。

1. $X$ のRicci形式と、最初の2つの斉次座標以外を零にして得る包含 $\mathbb{CP}^1\hookrightarrow X$ 上の $\int c_1(K_X^{-1})$ を求めよ。
2. $T$ の標準束が正則に自明であることを、枠の降下から示せ。
3. 積 $X\times T$ の標準束の第一Chern形式を積計量で求めよ。
4. 「$[\rho]=0$ なら標準束に非零大域正則枠がある」と結論してよいか、必要な区別を答えよ。

<!-- solution-start -->
**詳細解答。** 第1問：[Fubini–Study計量の行列式](../KAH1-11/index.md#thm-kah1-11-local-ricci)は $\det G=A^{-(n+1)}$（$A=1+\sum|z^i|^2$）。したがって

$$
\begin{aligned}
\rho_X&=-i\partial\bar\partial(-(n+1)\log A)\\
&=(n+1)\omega_{\mathrm{FS}},\\
\int_{\mathbb{CP}^1}c_1(K_X^{-1})
&=\frac{n+1}{2\pi}\int_{\mathbb{CP}^1}\omega_{\mathrm{FS}}
=n+1.
\end{aligned}
$$

第2問：$\mathbb C^m$ の正則 $m$ 形式 $\kappa=dz^1\wedge\cdots\wedge dz^m$ は非零で、格子平行移動 $z\mapsto z+\lambda$ のJacobianが $I_m$ なので不変。したがって商 $T$ に非零の大域正則枠として降りる。ゆえに $K_T$ は正則に自明であり、整数係数の第一Chern類も零である。

第3問：積の正則接束とその計量はブロック対角。$\det G_{X\times T}=(\det G_X)(\det G_T)$ で $\det G_T$ は正の定数。[Ricci形式の局所行列式公式](../KAH1-11/index.md#thm-kah1-11-local-ricci)より

$$
\rho_{X\times T}
=-i\partial\bar\partial\log\det G_X
=\pi_X^*\rho_X.
$$

よって[本章の同定](#thm-kah1-12-ricci-chern)から

$$
c_1(K_{X\times T}^{-1},h)
=\frac{n+1}{2\pi}\pi_X^*\omega_{\mathrm{FS}},
\quad
c_1(K_{X\times T},h)
=-\frac{n+1}{2\pi}\pi_X^*\omega_{\mathrm{FS}}.
$$

第4問：結論してはいけない。$[\rho]=0$ は $c_1(K_X)_{\mathbb R}=0$ を意味するだけで、整数係数torsionの情報や正則線束の非自明性を排除しない。第2問のトーラスで標準束が正則自明なのは、de Rham類が零だからではなく、**降下する非零正則枠を構成したため**である。
<!-- solution-end -->

## 9. 次章へ

これで $c_1(X)_{\mathbb R}=[\rho/(2\pi)]$ の意味、$2\pi$ の係数、標準束の負符号が別々の計算から結ばれた。次に問うべきことは、正の閉 $(1,1)$ 形式 $\omega$ が定める類 $[\omega]$ のうち、どれが実際にKähler計量から来るのかである。それが次章のKähler classと正値性へ続く。
