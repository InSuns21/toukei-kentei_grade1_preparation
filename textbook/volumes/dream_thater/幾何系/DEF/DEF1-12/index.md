# DEF1-12 Gauss–Manin接続の構成

## 1. 異なるファイバーのコホモロジーをどう比較するか

[Calabi–Yauの局所変形座標](../DEF1-11/index.md#thm-def1-11-local-chart)では、基底の点 $b$ ごとに複素多様体 $X_b$ が変わる。しかし $H^k(X_b,\mathbb C)$ の元は、最初から同じベクトル空間に入っているわけではない。「$b$ で微分する」と書くには、まず近隣のファイバーの類を比較する方法が要る。

すでに[Ehresmannの局所自明化定理](../DEF1-01/index.md#thm-def1-01-ehresmann)によって、滑らかな固有沈め込みのファイバーは**微分可能多様体として**局所的に同一視できる。一方、その同一視は一意ではない。異なる局所自明化を使っても整合するコホモロジーの比較が欲しい。

本章で作るものは次の三つである。

1. 各 $b$ に $H^k(X_b,\mathbb C)$ を対応させる**局所系**。
2. その局所系を滑らかなベクトル束へ拡張したものの**平坦接続**。
3. 閉微分形式をファイバー方向に微分して、この接続を具体的に計算する式。

最初は複素構造もKähler計量も必要としない。$\pi:\mathcal X\to B$ を、連結な滑らかな多様体 $B$ 上の、**境界のないコンパクトなファイバーを持つ全射・滑らかな固有沈め込み**とする。$X_b=\pi^{-1}(b)$ と書き、整数 $k\ge0$ を固定する。基底 $B$ は境界なしとし、議論は連結成分ごとに行える。後で $B$ と $\pi$ が複素解析的な場合へ戻る。

## 2. 局所自明化から、局所定数なコホモロジーを取り出す

まず「局所系」という語を明確にしよう。これは、点ごとのベクトル空間を近くでは一定のベクトル空間と同一視でき、同一視の変更が**点に依らない線形写像**になる仕組みである。滑らかなベクトル束より強い条件を課している。

<a id="def-def1-12-local-system"></a>

<!-- formal-statement-start -->
> **定義（複素ベクトル空間の局所系）**
>
> 滑らかな多様体 $B$ 上の複素ベクトル空間の層 $\mathscr L$ が**階数 $r$ の局所系**であるとは、各 $b\in B$ の近傍 $U$ 上で $\mathscr L|_U$ が定数層 $\underline{\mathbb C^r}_U$ と同型であり、そのような局所同型を取り替えた際の重なり上の遷移行列が、各連結成分上で一定の $\operatorname{GL}_r(\mathbb C)$ 行列になることをいう。
>
> ここで定数層の $V$ 値切断とは、$U$ の各点の近くで値が一定である写像 $U\to V$ のことである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-def1-12-local-system -->
**定義の確認**（積族）。$F$ を境界なしコンパクト多様体、$\mathcal X=F\times B$、$\pi(x,b)=b$ とする。すべてのファイバーを $(x,b)\mapsto x$ で $F$ と同定すれば、$H^k(X_b,\mathbb C)=H^k(F,\mathbb C)$。重なりの遷移行列は恒等行列であり、局所定数性と可逆性の両方が確かめられる。これが最も簡単な局所系である。
<!-- definition-example-end -->

一般の族には局所自明化 $\Phi_i:\pi^{-1}(U_i)\to F_i\times U_i$ がある。重なりの各 $b$ で生じる微分同相 $g_{ij}(b):F_j\to F_i$ は $b$ に滑らかに依存する。$g_{ij}(b)$ 自体は動くが、コホモロジーに誘導する線形写像は局所定数となる。この違いが核心だ。

<a id="lem-def1-12-transition"></a>

<!-- formal-statement-start -->
> **補題（局所自明化のコホモロジー遷移は局所定数）**
>
> $\pi:\mathcal X\to B$ を境界なしコンパクトファイバーを持つ滑らかな固有沈め込みとし、$U_i,U_j$ 上の二つの滑らかな局所自明化を選ぶ。各 $k\ge0$ に対し、重なり $U_i\cap U_j$ 上で誘導される $H^k(-,\mathbb C)$ の線形同型は、各連結成分上で一定である。
<!-- formal-statement-end -->

### 証明の見取り図

近い二点を基底内の道で結び、その道に沿って $g_{ij}(b)$ を動かすと、始点と終点の微分同相は滑らかなホモトピーで結ばれる。[de Rhamのホモトピー不変性](../../GEO/GEO9/index.md#thm-geo9-homotopy-invariance)により、コホモロジーへの作用は変わらない。

<!-- proof-start -->
### 証明

$b_0,b_1$ を $U_i\cap U_j$ の一つの連結成分で取る。多様体の連結開集合は道連結なので、滑らかな区分的道 $c:[0,1]\to U_i\cap U_j$ で結べる。写像

$$
H:[0,1]\times F_j\longrightarrow F_i,\qquad
H(t,x)=g_{ij}(c(t))(x)
$$

は $g_{ij}(b_0)$ から $g_{ij}(b_1)$ へのホモトピーである。[ホモトピー公式](../../GEO/GEO9/index.md#thm-geo9-homotopy-formula)を閉形式 $\omega$ に適用すると

$$
g_{ij}(b_1)^*\omega-g_{ij}(b_0)^*\omega=d_FK\omega
$$

となり、二つの引き戻しは同じ de Rham 類を誘導する。ここで $d_F$ は $F_j$ 上の外微分、$K$ はホモトピー作用素である。[de Rham比較定理の入力](../../HOD/HOD1-15/index.md#def-hod1-15-rational-complexification)によって、この等式は複素係数の特異コホモロジーへの作用についても同じ結論を与える。従って作用は連結成分上で一定。$\square$
<!-- proof-end -->

局所系を層として述べるための言葉も用意しておく。**層**とは、各開集合上のデータを制限でき、重なりで一致する局所データを一意に貼り合わせられる仕組みである。**層化**は前層からその仕組みを作る操作で、**茎**は一点の十分小さな近傍で一致する切断を同一視した「その点の近傍の情報」である。$R^k\pi_*$ はここでは以下の具体的な前層の層化を表す記号として使う。

<a id="def-def1-12-cohomology-local-system"></a>

<!-- formal-statement-start -->
> **定義（ファイバーコホモロジー局所系）**
>
> $\pi:\mathcal X\to B$ を境界なしコンパクトファイバーを持つ滑らかな固有沈め込みとする。複素係数の高次順像
>
$$
\mathscr L^k=R^k\pi_*\underline{\mathbb C}_{\mathcal X}
$$
>
> を、開集合 $U\subset B$ に $H^k(\pi^{-1}(U),\mathbb C)$ を対応させる前層の層化として定める。これを**第 $k$ ファイバーコホモロジー局所系**と呼ぶ。その $b$ における茎は自然に $H^k(X_b,\mathbb C)$ と同型である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-def1-12-cohomology-local-system -->
**定義の確認**（積族から一般の族へ）。例えば $F=S^1$ と $B=\mathbb R$ の積族では、十分小さい区間 $U$ 上の $H^1(S^1\times U,\mathbb C)$ は $\mathbb C[dx]$ である。その茎も $H^1(S^1,\mathbb C)$ と一致する。

一般の族でも[Ehresmannの定理](../DEF1-01/index.md#thm-def1-01-ehresmann)によって局所自明化が得られる。$U$ をさらに小さい可縮な近傍とすれば $\pi^{-1}(U)\simeq F\times U$ で、射影 $F\times U\to F$ はホモトピー同値。従って

$$
H^k(\pi^{-1}(U),\mathbb C)\simeq H^k(F,\mathbb C).
$$

コンパクトな向き付きRiemannファイバーなら[Hodge–de Rham同型](../../GA/GA6/index.md#thm-ga6-hodge-de-rham)から右辺の有限次元性が分かる。一般のコンパクト滑らかな $F$ に対しても、有限CW型を持つという位相幾何の事実から有限次元性が従う。既に証明した[遷移の局所定数性](#lem-def1-12-transition)を合わせれば、[局所系の定義](#def-def1-12-local-system)の条件がそろう。

なおファイバーが向き付け可能でない場合も特異コホモロジーの局所系は定義できる。有限次元性はコンパクト滑らかな多様体の有限CW型から得られ、向き付けは本章の一般構成には不要である。
<!-- definition-example-end -->

## 3. 局所系を滑らかな束へ拡張し、平坦接続を作る

局所系 $\mathscr L^k$ の局所定数な基底 $e_1,\ldots,e_r$ に対し、係数を滑らかな関数 $f_j(b)$ に広げれば、滑らかな切断 $s=\sum_j f_je_j$ が得られる。局所定数な基底そのものは微分しても零となるべきである。

接続とは、ベクトル束の滑らかな切断 $s$ の微分を、$B$ 上の1形式を係数とする束の切断 $\nabla s$ として返し、$\nabla(fs)=df\otimes s+f\nabla s$ を満たす演算である。局所系の遷移行列が一定であることが、その微分を座標に依らず貼り合わせる。

<a id="def-def1-12-gauss-manin"></a>

<!-- formal-statement-start -->
> **定義（Gauss–Manin接続）**
>
> $\pi:\mathcal X\to B$ を境界なしコンパクトファイバーを持つ滑らかな固有沈め込みとし、$\mathscr L^k=R^k\pi_*\underline{\mathbb C}$ とする。階数 $r$ の複素ベクトル束を取り、その**滑らかな切断の層**を
>
$$
\mathcal H^k=\mathscr L^k\otimes_{\underline{\mathbb C}_B}\mathcal C_B^\infty
$$
>
> とする（束と切断の層を同じ $\mathcal H^k$ で表す）。ここで $\mathcal C_B^\infty$ は複素数値の滑らかな関数の層である。$\mathscr L^k$ の局所定数基底 $e_1,\ldots,e_r$ で $s=\sum_j f_je_j$ と表される切断に
>
$$
\nabla^{\mathrm{GM}}s=\sum_{j=1}^r df_j\otimes e_j
$$
>
> と定める。この接続を**Gauss–Manin接続**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-def1-12-gauss-manin -->
**定義の確認**（同一視の変更）。$e'_j=\sum_i e_iG_{ij}$ と取り替えると、重なりの連結成分上で $G\in\operatorname{GL}_r(\mathbb C)$ は一定である。$s=e f=e'f'$ なら $f=Gf'$。従って $df=G\,df'$ となり、どちらの基底で微分しても同じ $T^*B\otimes\mathcal H^k$ の切断を得る。行列が単に可逆なだけでは不十分で、$dG=0$ が要点である。

例えば積族 $T^2\times\mathbb R_t$ で $e=([dx],[dy])$、$e'=([dx],[dx]+[dy])$ と取ると、$G=\bigl(\begin{smallmatrix}1&1\\0&1\end{smallmatrix}\bigr)$ は定数で行列式が1。切断 $s=t([dx]+[dy])$ は旧基底では係数 $(t,t)^{\mathsf T}$、新基底では $(0,t)^{\mathsf T}$ となる。どちらで微分しても $\nabla_{\partial_t}s=[dx]+[dy]$ で、条件を直接検証できる。
<!-- definition-example-end -->

接続を1形式を係数とする束値形式へ積の符号規則に従って拡張し、その二乗を曲率という。平坦とは、その曲率が零であることだ。

<a id="thm-def1-12-flatness"></a>

<!-- formal-statement-start -->
> **定理（Gauss–Manin接続の平坦性と並行移動）**
>
> $\pi:\mathcal X\to B$ を境界なしコンパクトファイバーを持つ滑らかな固有沈め込みとし、$\mathcal H^k$ に[Gauss–Manin接続](#def-def1-12-gauss-manin)を入れる。このとき $\nabla^{\mathrm{GM}}$ は大域的に定義された接続で、曲率が零、すなわち
>
$$
(\nabla^{\mathrm{GM}})^2=0
$$
>
> である。局所的な平行切断（$\nabla^{\mathrm{GM}}s=0$）は $\mathscr L^k$ の局所定数切断と一致する。道に沿う並行移動は始点・終点を固定したホモトピーで不変であり、閉路に沿う移動は $H^k(X_{b_0},\mathbb C)$ の可逆線形自己写像を与える。
<!-- formal-statement-end -->

### 証明の見取り図

局所定数基底では $\nabla=d$。従って $d^2=0$ が平坦性そのものである。道に沿う係数の常微分方程式は $df_j/dt=0$ となるので、係数を一定に保って移動する。重なりでは一定行列で基底を替えるため、細分した道の各区間の移動が矛盾なくつながる。

<!-- proof-start -->
### 証明

局所定数基底 $e$ と滑らかな関数 $f,g$ に対し

$$
\nabla(fs)=d(fg)\otimes e
=df\otimes(ge)+f\,dg\otimes e
$$

（ここでは $s=ge$ と書いた）。これは接続のLeibniz則であり、複数成分では各成分へ適用する。前の定義例の $dG=0$ により重なりでも一致するので大域的に貼り合う。束値1形式への拡張は $\nabla(\eta\otimes e)=d\eta\otimes e$ となるから

$$
\nabla^2\!\left(\sum_j f_je_j\right)
=\sum_jd^2f_j\otimes e_j=0.
$$

局所的に $\nabla s=0$ は $df_j=0$ と同値で、各連結成分上で係数 $f_j$ が一定である。道 $c(t)$ に沿う方程式は $\frac d{dt}f_j(c(t))=0$。$c$ を局所自明化域に入る小区間へ分割し、各区間で定数係数を保ち、接点で局所定数遷移を適用すると、任意の道に対する線形可逆な移動が定まる。

ホモトピー $H:[0,1]^2\to B$ の像を細かな小矩形へ分割して各矩形を自明化域へ入れると、矩形内の移動は両端の係数を同じ局所基底で読む恒等写像である。隣接する矩形の共通辺に現れる遷移と逆遷移は打ち消し合うため、境界の両側の道の移動が一致する。従って端点固定ホモトピーで不変。閉路の場合は始点と終点が同じファイバーなので自己同型が得られる。$\square$
<!-- proof-end -->

閉路のホモトピー類をつないだ群を $\pi_1(B,b_0)$ と書くと、上の自己同型は**モノドロミー表現**

$$
\rho_k:\pi_1(B,b_0)\longrightarrow
\operatorname{GL}\bigl(H^k(X_{b_0},\mathbb C)\bigr)
$$

を定める。平坦とは**小さな可縮領域で**平行な基底を選べることを意味するのであって、大域的に同じ基底を選べることではない。

**非自明な直接例（反転写像の写像トーラス）。** $F=S^1=\mathbb R/\mathbb Z$ とし、$h(x)=-x$ とする。端を

$$
(x,1)\sim(h(x),0)
$$

で貼り合わせた $(S^1\times[0,1])/\!\sim$ は、底 $S^1$ を持つ滑らかな円周束（Klein瓶）である。区間の内部では $[dx]$ が平行な1次類を与える。しかし底の一周を終えて $F_1$ を $F_0$ と同定すると $h^{-1}=h$ であり、$[(h^{-1})^*dx]=-[dx]$。従って $\rho_1=-1$。これは非零の大域平行切断が存在しない例で、曲率零と大域的自明性の違いを示す。

## 4. 閉微分形式を使って接続を実際に計算する

いま $\omega_b$ がファイバー $X_b$ 上の滑らかな閉 $k$ 形式として滑らかに動くとする。単なる係数の微分は、異なる $X_b$ を同じ座標で見てよいかに依存する。局所自明化で同じ固定多様体 $F$ に引き戻してから微分し、その**コホモロジー類**を取るのが正しい。

この節の $d_F$ はファイバー方向の外微分、$d_{\mathcal X}$ は全空間の外微分を表す。ベクトル場 $V$ を基底上に取り、$\pi$ の微分で $V$ に写る全空間のベクトル場 $\widetilde V$ を**持ち上げ**という。局所自明化を使えば持ち上げを作れるが、その選択には任意性がある。

<a id="prop-def1-12-de-rham-formula"></a>

<!-- formal-statement-start -->
> **命題（Gauss–Manin接続のde Rham表示）**
>
> $\pi:\mathcal X\to B$ を境界なしコンパクトファイバーを持つ滑らかな固有沈め込み、$V$ を $B$ の局所的な滑らかなベクトル場とする。各 $b$ 上の閉 $k$ 形式 $\omega_b$ が滑らかに動き、$s(b)=[\omega_b]\in H^k_{\mathrm{dR}}(X_b;\mathbb C)$ を定めるとする。局所自明化で $\omega_b$ を固定ファイバー $F$ 上へ引き戻せば
>
$$
\nabla^{\mathrm{GM}}_V s
=\bigl[V(\omega_b)\bigr]\in H^k_{\mathrm{dR}}(X_b;\mathbb C).
$$
>
> また $\omega_b$ の全空間上の滑らかな $k$ 形式への局所拡張 $\widetilde\omega$ と、$V$ の任意の持ち上げ $\widetilde V$ に対して
>
$$
\nabla^{\mathrm{GM}}_V[\omega_b]
=\left[\left.\mathcal L_{\widetilde V}\widetilde\omega\right|_{X_b}\right]
=\left[\left.\iota_{\widetilde V}d_{\mathcal X}\widetilde\omega\right|_{X_b}\right].
$$
>
> 二つの表示はいずれも代表形式、拡張、持ち上げの選択に依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

固定ファイバーでは $V$ による微分と $d_F$ が可換なので、閉形式の微分は閉形式、完全形式の微分は完全形式である。持ち上げの変更はファイバーに接するベクトル場を加えるだけで、そのLie微分は[Cartanの公式](../../GEO/GEO7/index.md#thm-geo7-cartan-formula)によって完全形式になる。

<!-- proof-start -->
### 証明

局所自明化で $\omega_b\in\Omega^k(F)$ と見て $d_F\omega_b=0$ とする。微分は

$$
d_F(V\omega_b)=V(d_F\omega_b)=0.
$$

代表を $\omega_b+d_F\eta_b$ に替えたときの微分の差は

$$
V(d_F\eta_b)=d_F(V\eta_b),
$$

であり、de Rham類は同じ。固定ファイバーのコホモロジー基底に展開した係数を微分する式だから、[接続の定義](#def-def1-12-gauss-manin)と一致する。滑らかに動く完全代表の原始形式 $\eta_b$ は局所的に、固定ファイバーのHodge分解のGreen作用素を用いて選べる。

次に、局所自明化で $\widetilde V=\partial_V+W_b$（$W_b$ はファイバーに接する）と書く。全空間の形式をファイバーに制限してLie微分すると

$$
\left.\mathcal L_{\widetilde V}\widetilde\omega\right|_{X_b}
=V\omega_b+\mathcal L_{W_b}\omega_b.
$$

後項は[Cartanの公式](../../GEO/GEO7/index.md#thm-geo7-cartan-formula)により

$$
\mathcal L_{W_b}\omega_b
=d_F(\iota_{W_b}\omega_b)+\iota_{W_b}d_F\omega_b
=d_F(\iota_{W_b}\omega_b).
$$

従ってその類は $[V\omega_b]$。拡張を変更しても各ファイバーでの制限 $\omega_b$ が同じならLie微分の垂直成分も同じである。持ち上げを替えたときも差は上の完全形式になる。最後に全空間上の[Cartanの公式](../../GEO/GEO7/index.md#thm-geo7-cartan-formula)

$$
\mathcal L_{\widetilde V}\widetilde\omega
=d_{\mathcal X}(\iota_{\widetilde V}\widetilde\omega)
+\iota_{\widetilde V}d_{\mathcal X}\widetilde\omega
$$

をファイバーへ制限すると、第一項はファイバー方向の完全形式になるため最後の等式が従う。$\square$
<!-- proof-end -->

**計算例（固定トーラスに動く複素構造）。** $B=\{\tau\in\mathbb C:\operatorname{Im}\tau>0\}$、$X_\tau=\mathbb C/(\mathbb Z+\tau\mathbb Z)$ とする。実座標 $(x,y)\in\mathbb R^2/\mathbb Z^2$ から $z=x+\tau y$ への写像が、滑らかなファイバーの同一視を与える。$dx,dy$ はこの同一視では一定の閉形式なので

$$
\nabla^{\mathrm{GM}}[dx]=\nabla^{\mathrm{GM}}[dy]=0.
$$

一方、各ファイバーで正則な1形式 $dz=dx+\tau\,dy$ の類は動き、

$$
\nabla^{\mathrm{GM}}_{\partial/\partial\tau}[dz]=[dy],
\qquad
\nabla^{\mathrm{GM}}_{\partial/\partial\bar\tau}[dz]=0.
$$

接続は**コホモロジーの位相的な比較**を行い、どの類が $(1,0)$ 型かを固定するものではない。この差が次章のHodge構造の変動につながる。

## 5. 周期積分・モノドロミー・基底変更

ファイバーの閉路も局所自明化で運べる。$\gamma_b$ を、そのように運ばれた $k$ 次の特異サイクル（境界が零の有限和）とし、周期を $P(b)=\int_{\gamma_b}\omega_b$ と置く。閉形式の代表を完全形式で替えても、[一般 Stokes の定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)により積分は変わらない。

<a id="prop-def1-12-period"></a>

<!-- formal-statement-start -->
> **命題（平行サイクル上の周期の微分）**
>
> $\pi:\mathcal X\to B$ を境界なしコンパクトファイバーを持つ滑らかな固有沈め込みとする。局所的に並行移動された $k$ サイクル $\gamma_b$ と、滑らかな閉形式の族 $\omega_b$ に対し、任意の基底の接方向 $V$ について
>
$$
V\!\left(\int_{\gamma_b}\omega_b\right)
=\int_{\gamma_b}\nabla^{\mathrm{GM}}_V[\omega_b]
$$
>
> が成り立つ。右辺は接続で得たコホモロジー類の任意の閉形式代表の周期積分を意味する。
<!-- formal-statement-end -->

### 証明の見取り図

局所自明化で閉路を固定してから積分を微分する。コンパクトなサイクルと滑らかな係数によって微分と積分を交換できる。得られる形式は前節の接続の代表である。

<!-- proof-start -->
### 証明

局所自明化で $\gamma_b=\gamma$ を固定し、$b(t)$ を $b'(0)=V$ の道とする。各単体の定義域はコンパクト、被積分係数は $(t,x)$ に滑らかなので、各単体上で微分と積分を交換できる。従って

$$
\left.\frac d{dt}\right|_{0}
\int_{\gamma}\omega_{b(t)}
=\int_\gamma \left.\frac d{dt}\right|_0\omega_{b(t)}
=\int_\gamma V\omega_b.
$$

[de Rham表示](#prop-def1-12-de-rham-formula)により $[V\omega_b]=\nabla^{\mathrm{GM}}_V[\omega_b]$。代表を $V\omega_b+d_F\eta$ に替えても $\int_\gamma d_F\eta=\int_{\partial\gamma}\eta=0$ である。$\square$
<!-- proof-end -->

**周期が一定なら何が分かるか。** 固定ファイバーのすべてのホモロジー類と組にした周期が局所一定なら、de Rham比較の非退化性により $\nabla^{\mathrm{GM}}s=0$。ただし一つの周期だけが一定でも、接続で微分した類が零とは限らない。

<a id="prop-def1-12-base-change"></a>

<!-- formal-statement-start -->
> **命題（滑らかな基底変更との可換性）**
>
> $\pi:\mathcal X\to B$ を境界なしコンパクトファイバーを持つ滑らかな固有沈め込み、$f:B'\to B$ を滑らかな写像とする。引き戻し族 $\pi':\mathcal X\times_B B'\to B'$ のGauss–Manin束を $\mathcal H'^k$ とすると、ファイバーの自然な同一視により $\mathcal H'^k\simeq f^*\mathcal H^k$ であり、任意の滑らかな切断 $s$ と接方向 $W\in T_{b'}B'$ に
>
$$
\nabla'^{\mathrm{GM}}_W(f^*s)
=f^*\bigl(\nabla^{\mathrm{GM}}_{df(W)}s\bigr)
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

局所定数基底 $e$ を $B'$ へ引き戻しても局所定数基底 $f^*e$ である。係数関数 $g$ だけを微分すれば、通常の連鎖律が結論になる。

<!-- proof-start -->
### 証明

$s=\sum_jg_j e_j$ と局所定数基底で書く。引き戻し族では $f^*s=\sum_j(g_j\circ f)f^*e_j$ なので

$$
\nabla'^{\mathrm{GM}}_W(f^*s)
=\sum_j W(g_j\circ f)\,f^*e_j
=\sum_j(dg_j)_{f(b')}(df_{b'}W)\,f^*e_j.
$$

最後の式は $f^*(\nabla^{\mathrm{GM}}_{df(W)}s)$ である。重なりの遷移はどちらの側も同じ局所定数行列を引き戻すので、大域的に一致する。$\square$
<!-- proof-end -->

## 6. 複素解析的変形族では何が加わるか

もし $B$ が複素多様体で $\pi$ が固有正則沈め込みなら、上の議論を基礎にして複素ベクトル束 $\mathcal H^k$ の接続を複素接方向へ延長できる。平坦局所基底 $e_j$ で、$(0,1)$ 方向の成分を $\bar\partial$ と見ると $\bar\partial^2=0$ であり、この基底を正則枠とする**正則ベクトル束**を得る。この意味でGauss–Manin接続は正則かつ平坦である。

ただしこの正則枠は各ファイバーの $(p,q)$ 型の枠とは一般に一致しない。たとえば第4節の楕円曲線で $[dz]$ は正則に動くが、$\nabla[dz]=d\tau\otimes[dy]$ は零でない。次章では[純Hodge構造とフィルトレーション](../../HOD/HOD1-15/index.md#def-hod1-15-pure-hodge)をファイバーごとに置き、その正則な動きとGriffiths横断性を証明する。

## 7. 演習

<a id="ex-def1-12-a01"></a>
### 演習 A1：積族の局所系

- Level: A

$F=S^1$、$B=\mathbb R$、$\mathcal X=F\times B$ とする。$k=0,1,2$ で $\mathscr L^k$ の階数を求め、$k=1$ の平行切断をすべて書け。

<!-- solution-start -->
**詳細解答**

各ファイバーは円周に同一視される。[円周のde Rhamコホモロジー](../../GEO/GEO9/index.md#thm-geo9-h1-circle)と連結性から $H^0(S^1,\mathbb C)=\mathbb C$、$H^1(S^1,\mathbb C)=\mathbb C[dx]$、$H^2(S^1,\mathbb C)=0$。従って階数は順に $1,1,0$。$k=1$ の滑らかな切断は $s(t)=a(t)[dx]$ で、接続は $\nabla_{\partial_t}s=a'(t)[dx]$。従って平行条件は $a'=0$、すなわち $a$ が定数である。
<!-- solution-end -->

<a id="ex-def1-12-a02"></a>
### 演習 A2：完全形式を足しても接続は変わらない

- Level: A

$S^1=\mathbb R/\mathbb Z$ 上の座標を $x$、基底を $t\in\mathbb R$ とする。ファイバー1形式 $\omega_t=t\,dx+t\cos(2\pi x)\,dx$ は閉である。$\nabla_{\partial_t}[\omega_t]$ を求めよ。

<!-- solution-start -->
**詳細解答**

$\eta_t(x)=t\sin(2\pi x)/(2\pi)$ は周期1の関数で

$$
d_F\eta_t=t\cos(2\pi x)\,dx.
$$

よって $[\omega_t]=t[dx]$。定数基底 $[dx]$ で[接続を定義](#def-def1-12-gauss-manin)すると

$$
\nabla_{\partial_t}[\omega_t]
=\frac d{dt}(t)[dx]=[dx].
$$

直接微分でも $\partial_t\omega_t=dx+\cos(2\pi x)\,dx$、後項は $d_F(\sin(2\pi x)/(2\pi))$ なので同じ類である。
<!-- solution-end -->

<a id="ex-def1-12-a03"></a>
### 演習 A3：動く微分同相と局所定数な遷移

- Level: A

$S^1$ の微分同相 $g_t(x)=x+t$（$\bmod 1$、$t\in\mathbb R$）は $t$ に依存する。$H^1(S^1,\mathbb C)$ への作用が $t$ に依存しないことを、1形式で確かめよ。

<!-- solution-start -->
**詳細解答**

$g_t^*dx=d(x+t)=dx$ である。円周の一次de Rham類は $[dx]$ が張るため、$g_t^*$ は各 $t$ で恒等写像になる。微分同相そのものは $t$ によって変わるが、[局所定数遷移の補題](#lem-def1-12-transition)の結論どおり、コホモロジー上の行列は常に $(1)$ である。
<!-- solution-end -->

<a id="ex-def1-12-a04"></a>
### 演習 A4：平坦基底と非平行な切断

- Level: A

$T^2\times\mathbb R\to\mathbb R$ で $s(t)=[dx]+t^2[dy]$ とする。$\nabla_{\partial_t}s$ と $\nabla_{\partial_t}^2s$ を求め、$\nabla^2=0$ と矛盾しない理由を説明せよ。

<!-- solution-start -->
**詳細解答**

$[dx],[dy]$ は平坦基底なので、係数を微分して

$$
\nabla_{\partial_t}s=2t[dy],\qquad
\nabla_{\partial_t}(\nabla_{\partial_t}s)=2[dy].
$$

これは方向 $\partial_t$ に二回共変微分した結果である。一方、[曲率零](#thm-def1-12-flatness)という $\nabla^2=0$ は**束値外微分**の二乗のことで、$dt\wedge dt=0$ を含む。従って2階方向微分が零になるという主張ではない。
<!-- solution-end -->

<a id="ex-def1-12-a05"></a>
### 演習 A5：零次のGauss–Manin接続

- Level: A

連結なコンパクトファイバーを持つ滑らかな固有沈め込み $\pi:\mathcal X\to B$ について、$k=0$ の局所系と接続を記述せよ。なぜファイバー連結性が必要か。

<!-- solution-start -->
**詳細解答**

各連結なファイバーの局所定数関数は定数なので $H^0(X_b,\mathbb C)=\mathbb C\cdot[1]$。[Ehresmann自明化](../DEF1-01/index.md#thm-def1-01-ehresmann)は定数関数 $1$ を $1$ に移す。従って $\mathscr L^0=\underline{\mathbb C}_B$、$\mathcal H^0$ は自明な線束で $\nabla(f[1])=df\otimes[1]$ である。ファイバーが2成分なら $H^0(X_b,\mathbb C)\simeq\mathbb C^2$ となり、基底の閉路で2成分が交換される可能性がある。階数1という結論には連結性が必要である。
<!-- solution-end -->

<a id="ex-def1-12-b01"></a>
### 演習 B1：反転モノドロミーと大域切断

- Level: B

$h(x)=-x$ による円周の写像トーラスを考える。$H^1$ のモノドロミーを求め、そのGauss–Manin束に非零の**大域平行切断**が存在しないことを示せ。局所的な平行切断が存在することとは区別せよ。

<!-- solution-start -->
**詳細解答**

区間 $0<t<1$ では $[dx]$ が平行。端の同一視は $(x,1)\sim(h(x),0)$ だから、上端のコホモロジー類を下端へ運ぶ写像は $(h^{-1})^*$ である。$h^{-1}=h$、$h^*dx=-dx$ なので、モノドロミーは $-1$。大域平行切断の $t=0$ での値を $a[dx]$ とすると、局所定数性によって一周後も区間座標では $a[dx]$ だが、端を貼ると $-a[dx]$。元に戻る条件は $a=-a$、従って $a=0$ である。一方、底の小弧では $c[dx]$ が任意の定数 $c$ について平行となる。
<!-- solution-end -->

<a id="ex-def1-12-b02"></a>
### 演習 B2：トーラスのせん断モノドロミー

- Level: B

$T^2=\mathbb R^2/\mathbb Z^2$ に $h(x,y)=(x+y,y)$ を定め、$(p,1)\sim(h(p),0)$ で貼った写像トーラスを考える。基底 $([dx],[dy])$ に関する $H^1$ のモノドロミー行列を、列が各基底ベクトルの像になる規約で計算せよ。

<!-- solution-start -->
**詳細解答**

せん断の逆写像は $h^{-1}(x,y)=(x-y,y)$。写像トーラスの上端を下端へ同定したときのコホモロジー移動は $(h^{-1})^*$ だから

$$
(h^{-1})^*dx=d(x-y)=dx-dy,\qquad
(h^{-1})^*dy=dy.
$$

第一列は $(1,-1)^{\mathsf T}$、第二列は $(0,1)^{\mathsf T}$ なので

$$
\rho_1=
\begin{pmatrix}1&0\\-1&1\end{pmatrix},
\qquad \det\rho_1=1.
$$

一般に点の移動 $h$ とコホモロジー類の並行移動を同じ向きの引き戻し $h^*$ と混同すると符号が逆になる。
<!-- solution-end -->

<a id="ex-def1-12-b03"></a>
### 演習 B3：持ち上げを替えても類は同じ

- Level: B

$S^1\times\mathbb R\to\mathbb R$ で $\omega_t=u(t,x)\,dx$ とする（$u$ は $x$ に周期1、滑らか）。$\partial_t$ の持ち上げを $\widetilde V=\partial_t+a(t,x)\partial_x$ としたとき、$\mathcal L_{\widetilde V}\omega$ のファイバー方向の係数を求め、$\nabla_{\partial_t}[\omega_t]$ が $a$ に依存しないことを示せ。

<!-- solution-start -->
**詳細解答**

$\omega=u\,dx$ としてCartanの公式を展開すると、$x$ 成分は

$$
\left.\mathcal L_{\widetilde V}(u\,dx)\right|_{S^1}
=\bigl(\partial_tu+a\partial_xu+u\partial_xa\bigr)dx
=\bigl(\partial_tu+\partial_x(au)\bigr)dx.
$$

第二項は $d_F(au)$ だから完全形式で、de Rham類は $[\partial_tu\,dx]$ だけになる。周期積分で確認しても

$$
\int_0^1\partial_x(au)\,dx=(au)(t,1)-(au)(t,0)=0
$$

である。[de Rham表示](#prop-def1-12-de-rham-formula)と一致し、任意の $a$ を選んでよい。
<!-- solution-end -->

<a id="ex-def1-12-b04"></a>
### 演習 B4：基底変更と連鎖律

- Level: B

$S^1\times\mathbb R_t\to\mathbb R_t$ の切断 $s(t)=t^2[dx]$ を、基底変更 $f:\mathbb R_u\to\mathbb R_t$、$t=2u+1$ で引き戻す。$\nabla'_{\partial_u}f^*s$ を直接計算し、基底変更公式の右辺と比較せよ。

<!-- solution-start -->
**詳細解答**

引き戻した切断は $f^*s(u)=(2u+1)^2[dx]$ であり、直接微分すれば

$$
\nabla'_{\partial_u}f^*s=4(2u+1)[dx].
$$

一方、元の族では $\nabla_{\partial_t}s=2t[dx]$、微分は $df(\partial_u)=2\partial_t$。したがって[基底変更命題](#prop-def1-12-base-change)の右辺は

$$
f^*(\nabla_{2\partial_t}s)
=f^*(4t[dx])=4(2u+1)[dx],
$$

で直接計算と等しい。微分する変数を $t$ から $u$ へ替えるときの係数2を落としてはいけない。
<!-- solution-end -->

<a id="ex-def1-12-c01"></a>
### 演習 C1：楕円曲線の周期と接続行列

- Level: C

虚部が正の複素数の開集合 $B=\{\tau:\operatorname{Im}\tau>0\}$ 上の族 $X_\tau=\mathbb C/(\mathbb Z+\tau\mathbb Z)$ を考える。滑らかな同一視 $z=x+\tau y$（$x,y\in\mathbb R/\mathbb Z$）で、$e_1=[dx]$、$e_2=[dy]$ と置く。

1. $\alpha_\tau=[dz]$ の $x$ 方向、$y$ 方向の基本閉路に対する周期とその $\tau$ 微分を求めよ。
2. $\nabla^{\mathrm{GM}}_{\partial_\tau}\alpha_\tau$ を求め、これが $\alpha_\tau$ の複素定数倍にはならないことを示せ。
3. 動く基底 $e'_1=\alpha_\tau$、$e'_2=e_2$ で、切断の係数列 $c'$ に対する接続が $dc'+A\,c'$ になるとき、行列値1形式 $A$ を求めよ。$\nabla^2=0$ を $A$ から確認せよ。

<!-- solution-start -->
**詳細解答**

1. $x$ 閉路は $(x,y)=(t,0)$、$y$ 閉路は $(0,t)$（$0\le t\le1$）である。$dz=dx+\tau dy$ なので、各閉路への積分は $1,\tau$。微分はそれぞれ $0,1$ となる。閉路は滑らかな同一視で固定されているから[周期微分命題](#prop-def1-12-period)を適用できる。
2. $e_1,e_2$ は局所定数基底なので

$$
\nabla^{\mathrm{GM}}_{\partial_\tau}\alpha_\tau
=\nabla^{\mathrm{GM}}_{\partial_\tau}(e_1+\tau e_2)=e_2.
$$

仮に $e_2=\lambda(e_1+\tau e_2)$ なら、線形独立な $e_1,e_2$ の係数比較で $\lambda=0$ と $1=\lambda\tau=0$ が同時に必要となり矛盾する。
3. 行ベクトルの基底を $e=(e_1,e_2)$ とし、$e'=eG$ と書く。各列が新基底の旧座標なので

$$
G=\begin{pmatrix}1&0\\ \tau&1\end{pmatrix},
\qquad
G^{-1}=\begin{pmatrix}1&0\\-\tau&1\end{pmatrix}.
$$

切断 $s=e'c'=eGc'$ では旧基底における接続は $e\,d(Gc')$。これを $e'$ で書き直すと

$$
\nabla s=e'\bigl(dc'+G^{-1}dG\,c'\bigr),
\qquad
A=G^{-1}dG=
\begin{pmatrix}0&0\\d\tau&0\end{pmatrix}.
$$

この行列は $e'_1$ の微分が $e'_2\,d\tau$ になることとも一致する。曲率は $dA+A\wedge A$ で、$d(d\tau)=0$、$A$ の非零成分は $(2,1)$ のみなので $A\wedge A=0$。従って曲率は零だが、$\nabla e'_1\ne0$ である。これは平坦性と正則1形式の変動が両立する例である。
<!-- solution-end -->

## 8. 次章へ：平坦な全体空間の中で動く部分空間

Gauss–Manin接続は、ファイバーごとの de Rham コホモロジーを局所的に同じベクトル空間として比較できるようにした。一方、$X_b$ の複素構造から決まるHodgeの $(p,q)$ 型部分空間は、一般にはこの平行移動では保存されない。実際、楕円曲線では $\nabla_{\partial_\tau}[dz]=[dy]$ が $H^{1,0}$ に留まらなかった。

次章 DEF1-13 では、これらの動く部分空間をHodgeフィルトレーションとして束ね、周期写像とその微分にどのような制限があるかを調べる。
