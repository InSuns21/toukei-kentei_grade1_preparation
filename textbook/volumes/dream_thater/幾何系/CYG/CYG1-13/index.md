# CYG1-13 quinticの複素変形101方向とKähler錐

<!-- definition-example-audit: strict -->

## 1. 101と1は、何を動かす自由度なのか

[五次Calabi–Yau三次元多様体のHodge数](../CYG1-08/index.md#prop-cyg1-08-hodge-diamond)は $h^{2,1}=101$ と $h^{1,1}=1$ だった。また[一次複素構造変形とHodge群の対応](../CYG1-12/index.md#thm-cyg1-12-first-order-hodge)によれば、前者は複素構造を動かす**一次の接方向**の数である。しかしHodge数の計算だけでは、その101方向を具体的に一つも書き出せない。

五次超曲面を定義する斉次多項式の係数を動かせば、実際に別の五次超曲面を作れる。ただし、方程式全体のスカラー倍や射影座標の取り替えは、同じ超曲面を別の式で書くだけだ。この重複を引くと何方向残るだろうか。

一方、複素構造を**固定した**まま正の $(1,1)$ 形式を動かすのがKähler方向である。これは最初から別の問いであり、101方向に1方向を足して「102個の同種の複素変形」と呼ぶことはできない。本章では両方を数え、その根拠と境界を比較する。

以下、$S=\mathbb C[z_0,z_1,z_2,z_3,z_4]$、$S_d$ を全次数$d$の斉次多項式の空間とする。$F\in S_5$ が定める滑らかな超曲面を $X=\{F=0\}\subset\mathbb P^4_{\mathbb C}$ と書く。$X$ は複素三次元・連結・射影的、従ってコンパクトKählerである。$H=c_1(\mathcal O_X(1))$ は実係数の二次コホモロジー類にも同じ文字を使う。

## 2. 五次式は126個の係数で書ける

単項式 $z_0^{a_0}\cdots z_4^{a_4}$ の全次数が5であるとは、非負整数 $a_i$ が

$$
a_0+a_1+a_2+a_3+a_4=5
$$

を満たすことである。五つの箱に同じ玉5個を分ける数なので、棒4本と玉5個の並び方として

$$
\dim_{\mathbb C}S_5=\binom{5+5-1}{5}=\binom94=126.
$$

例えば $z_0^5$、$z_0^4z_1$、$z_0z_1z_2z_3z_4$ は互いに異なる基底要素であり、指数列が違う単項式の間に線形関係はない。この126はまだ**方程式の係数の数**であって、幾何学的な変形の数ではない。

### 方程式のスカラーと射影自己同型を見分ける

$F$ を $cF$（$c\ne0$）へ替えても零集合は不変である。また可逆行列 $g\in GL(5,\mathbb C)$ の取り替え $z\mapsto gz$ は、射影空間の自己同型で同じ抽象複素多様体を表し直す。行列のスカラー倍も射影空間では同じ作用なので、この射影自己同型群は $PGL(5)$ で複素次元 $25-1=24$ となる。

一次の変化なら $F_t=F+tG$ と置ける。ここで $t$ は係数を動かすパラメータで、$t^2=0$ と書くときは二次以上を捨てる形式的一次計算を意味する。$A=(A_{ij})$ は $5\times5$ 行列、$I$ は単位行列とし、$z\mapsto (I+tA)z$ を代入する。各 $z_i$ に関する偏微分を $\partial_iF=\partial F/\partial z_i$ と略記し、$z$ を固定して $t$ で微分する連鎖律を使うと

$$
F((I+tA)z)=F(z)+t\sum_{i,j=0}^4A_{ij}z_j\frac{\partial F}{\partial z_i}(z)
\pmod{t^2}.
$$

従って射影自己同型だけで生じる一次方向は、偏微分 $\partial_iF$ に一次式を掛けた和である。この式こそが、群の次元をただ暗記して引く代わりに、**どの係数方向が同じ幾何を表すのか**を判定する道具になる。

この一次の重複を集めるため、$J(F)=(\partial_0F,\ldots,\partial_4F)$ を多項式環のイデアルとし、$J(F)_5$ をその全次数5の部分空間と書く。各偏微分は四次式だから

$$
J(F)_5=\left\{\sum_{i=0}^4L_i\partial_iF:\ L_i\in S_1\right\}.
$$

[斉次式のEuler恒等式](../../../代数系/AG/AG2-11/index.md#prop-ag2-11-euler-gradient)を次数5の $F$ に適用した $\sum_i z_i\partial_iF=5F$ は、$F$ 自身のスカラー倍の方向がすでに $J(F)_5$ に入ることも示す。

<a id="def-cyg1-13-polynomial-direction"></a>

<!-- formal-statement-start -->
> **定義（五次式の一次多項式変形）**
>
> $F\in S_5$ が滑らかな五次超曲面 $X\subset\mathbb P^4_{\mathbb C}$ を定めるとする。$F+tG$ における $G\in S_5$ を一次の係数変化とし、$G-G'\in J(F)_5$ なら、方程式のスカラー倍と無限小射影自己同型で生じる同じ方向とみなす。この同値類の複素ベクトル空間は

$$
\mathcal P_F=S_5/J(F)_5
$$

> である。この定義は**多項式による一次方向**を数えるもので、全ての複素構造変形と等しいという結論はまだ含まない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cyg1-13-polynomial-direction -->
**定義の確認**。[滑らかさを検証済みのFermat五次](../CYG1-08/index.md#prop-cyg1-08-smooth-canonical)を使い、$F_0=\sum_i z_i^5$ と置く。偏微分 $\partial_iF_0=5z_i^4$ より

$$
z_0^4z_1=\frac15z_1\partial_0F_0\in J(F_0)_5.
$$

実際に $A_{01}=1/5$、他成分0の行列を選ぶと、射影座標の取り替えが生む一次係数は $z_0^4z_1$ になる。変換行列 $I+tA$ は一次で逆行列 $I-tA$ を持つ。従ってこの変化は商空間で零である。

一方、積単項式 $z_0z_1z_2z_3z_4$ はどの $z_i^4$ でも割り切れず、商空間で非零の候補となる。次節で基底を列挙して非零性を確定する。
<!-- definition-example-end -->

## 3. Fermat五次で101方向を手で数える

まず[滑らかさを検証済みのFermat五次](../CYG1-08/index.md#prop-cyg1-08-smooth-canonical) $F_0=\sum_i z_i^5$ を用いる。この例なら $J(F_0)_5$ を曖昧な「25次元のはず」とせず、単項式そのもので数えられる。

<a id="prop-cyg1-13-fermat-101"></a>

<!-- formal-statement-start -->
> **命題（Fermat五次の多項式一次変形の次元）**
>
> $F_0=\sum_{i=0}^4 z_i^5$、$X_0=\{F_0=0\}\subset\mathbb P^4_{\mathbb C}$ とすると、$J(F_0)_5$ は25個の単項式 $z_i^4z_j$（$0\le i,j\le4$）を基底に持ち、

$$
\dim_{\mathbb C}\mathcal P_{F_0}=126-25=101.
$$

> またFermat五次の射影自己同型による軌道の接空間は24次元である。
<!-- formal-statement-end -->

### 証明の見取り図

偏微分が $5z_i^4$ なので、イデアルの次数5部分は $z_i^4z_j$ だけで張られる。異なる $(i,j)$ が異なる単項式を与えるため独立である。25のうち $F_0$ のスカラー方向1を除く24が射影自己同型に対応することを、行列の核で確かめる。

<!-- proof-start -->
### 証明

$\partial_iF_0=5z_i^4$ だから、一次式 $L_i=\sum_j c_{ij}z_j$ を掛けて和を取れば

$$
\sum_iL_i\partial_iF_0=5\sum_{i,j}c_{ij}z_i^4z_j.
$$

各組 $(i,j)$ に対する次数5の指数列は相異なる。実際 $i\ne j$ なら指数4の変数が $z_i$、指数1の変数が $z_j$ で一意に復元でき、$i=j$ では $z_i^5$ となって他と区別できる。よって全25個が線形独立、$\dim J(F_0)_5=25$。第2節の $\dim S_5=126$ を引いて101を得る。

群の24方向を別に確かめる。$\mathfrak{gl}_5=M_5(\mathbb C)$ は複素 $5\times5$ 行列全体の空間である。$A\in\mathfrak{gl}_5$ による一次係数変化がある $\lambda\in\mathbb C$ に対して $\lambda F_0$ に一致すると仮定する。混合単項式 $z_i^4z_j$ ($i\ne j$) の係数比較で $A_{ij}=0$、純五次 $z_i^5$ の比較で $5A_{ii}=\lambda$ が全 $i$ について成立する。従って $A=(\lambda/5)I$ であり、これだけがスカラー倍の方向を与える。$\mathfrak{gl}_5/\mathbb CI$ の24次元は全て独立な軌道接方向となる。従って射影係数空間の125方向から24を引いても $125-24=101$ となる。$\square$
<!-- proof-end -->

### 実際に一つ動かす：積の単項式

例えば $G=z_0z_1z_2z_3z_4$ は次数5だが、$J(F_0)_5$ の25個の基底のどれとも一致せず、独立な非零類 $[G]$ を与える。ここでは $\psi\in\mathbb C$ を通常の（$\psi^2=0$ とはしない）族のパラメータとし、

$$
F_\psi=\sum_{i=0}^4z_i^5-5\psi z_0z_1z_2z_3z_4
$$

の $\psi=0$ での接方向は $-5[G]$ であり、射影自己同型では消せない。

ただし「局所の非零な一次方向」と「任意のパラメータ値で滑らか」は違う。もし $F_\psi$ の斉次偏微分が射影点で全て零なら、ある $z_i=0$ の場合は他の偏微分から他の全座標も零となり不可能である。全て非零なら

$$
z_i^4=\psi\prod_{j\ne i}z_j\quad(0\le i\le4)
$$

を掛け合わせる。全座標が非零なので積で割れて、$\psi^5=1$ が必要である。

逆に $\psi^5=1$ なら、射影点 $[\psi^{-1}:1:1:1:1]$ は各偏微分を零にする。[斉次式のEuler恒等式](../../../代数系/AG/AG2-11/index.md#prop-ag2-11-euler-gradient)は次数5の場合に次の式となる。

$$
5F_\psi=\sum_i z_i\partial_iF_\psi=0
$$

選んだ点で右辺は零だから、$F_\psi=0$ も満たし、確かに超曲面上にある。[射影超曲面のJacobian判定](../../../代数系/AG/AG2-11/index.md#thm-ag2-11-jacobian-criterion)から、この族は $\psi^5\ne1$ で滑らか、$\psi^5=1$ で特異となる。特に $\psi=0$ の近くは滑らかな族である。

## 4. 「多項式101」と「全一次変形101」を本当に接続する

Fermatの計数は具体的だが、[一次変形空間の定理](../CYG1-12/index.md#thm-cyg1-12-first-order-hodge)が数えるのは $H^1(X,T_X)$ である。同じ101という数の一致だけでは、$\mathcal P_F\to H^1(X,T_X)$ が同型とは論証できない。以下ではこの写像を[滑らかな超曲面の法束列](../CYG1-07/index.md#prop-cyg1-07-normal)の連結写像として実際に作り、射影空間で学んだコホモロジーを使って核と余核を調べる。

$X=\{F=0\}$ を任意の滑らかな五次超曲面とする。法束が $N_{X/\mathbb P^4}\simeq\mathcal O_X(5)$ なので、法束列は

$$
0\longrightarrow T_X\longrightarrow T\mathbb P^4|_X
\xrightarrow{\ dF\ }\mathcal O_X(5)\longrightarrow0.
$$

右の写像は局所的にベクトル場 $v=\sum v^i\partial_{z_i}$ を $v(F)$ へ送る。滑らかさが保証するのは各点で $dF$ が法線方向へ全射になること。ここで滑らかさを外すとこの短完全列の右端全射が壊れる。

射影空間の[接Euler列](../../../代数系/AG/AG2-09/index.md#thm-ag2-09-tangent-euler)を $X$ へ制限すると

$$
0\longrightarrow\mathcal O_X\longrightarrow
\mathcal O_X(1)^{\oplus5}\longrightarrow T\mathbb P^4|_X\longrightarrow0.
$$

また $F$ が零集合を定めるため、三つのねじり層制限列がある。

$$
\begin{aligned}
0&\longrightarrow\mathcal O_{\mathbb P^4}(-5)
\xrightarrow{\cdot F}\mathcal O_{\mathbb P^4}
\longrightarrow\mathcal O_X\longrightarrow0,\\
0&\longrightarrow\mathcal O_{\mathbb P^4}(-4)
\xrightarrow{\cdot F}\mathcal O_{\mathbb P^4}(1)
\longrightarrow\mathcal O_X(1)\longrightarrow0,\\
0&\longrightarrow\mathcal O_{\mathbb P^4}
\xrightarrow{\cdot F}\mathcal O_{\mathbb P^4}(5)
\longrightarrow\mathcal O_X(5)\longrightarrow0.
\end{aligned}
$$

代数的な層コホモロジーの計算を解析側の正則束へ使う際は、$X$ が射影的で対象が連接層であるため[GAGAのコホモロジー比較](../../../代数系/CAG/CAG1-05/index.md#thm-cag1-05-gaga-cohomology)を適用できる。

<a id="thm-cyg1-13-all-first-order"></a>

<!-- formal-statement-start -->
> **定理（滑らかなquinticの多項式方向と全一次変形）**
>
> $F\in S_5$ が滑らかな $X=\{F=0\}\subset\mathbb P^4_{\mathbb C}$ を定めるとする。法束列の連結写像による自然な写像は同型である。

$$
S_5/J(F)_5\xrightarrow{\ \simeq\ }H^1(X,T_X).
$$

> その両辺は複素次元101である。これは**一次変形**についての同型であり、全ての無限小方向が任意次数に延長できるという無障害性を主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

五次式の係数を変える切断は $H^0(X,\mathcal O_X(5))$ に入る。法束列の連結写像の核は、Euler列から得られる24個の射影自己同型の像である。余核を消すために $H^1(X,T\mathbb P^4|_X)=0$ を確かめる。

<!-- proof-start -->
### 証明

まず[射影空間のねじり層コホモロジー](../../../代数系/AG/AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)を $\mathbb P^4$ の次数 $-5,-4,0,1,5$ へ適用する。中間次数 $1,2,3$ のコホモロジーが全て零であることと上の制限列の[長完全列](../../../代数系/AG/AG3-08/index.md#thm-ag3-08-long-exact)から、

$$
\begin{gathered}
H^0(X,\mathcal O_X)=\mathbb C,\quad
H^1(X,\mathcal O_X)=H^2(X,\mathcal O_X)=0,\\
H^0(X,\mathcal O_X(1))\simeq\mathbb C^5,\quad
H^1(X,\mathcal O_X(1))=0,\\
H^0(X,\mathcal O_X(5))\simeq S_5/\mathbb CF,
\quad\dim H^0(X,\mathcal O_X(5))=126-1=125.
\end{gathered}
$$

例えば $H^1(X,\mathcal O_X)=0$ は第1の制限列の $H^1(\mathbb P^4,\mathcal O)=0$ と $H^2(\mathbb P^4,\mathcal O(-5))=0$ の間に挟まれるため、$H^1(X,\mathcal O_X(1))=0$ は第2の列で $H^1(\mathbb P^4,\mathcal O(1))$ と $H^2(\mathbb P^4,\mathcal O(-4))$ の間に挟まれるためである。$H^2(X,\mathcal O_X)=0$ は第1の列の $H^2(\mathcal O)$ と $H^3(\mathcal O(-5))$ から従う。

これらを[接Euler列](../../../代数系/AG/AG2-09/index.md#thm-ag2-09-tangent-euler)の長完全列に代入すると

$$
0\longrightarrow\mathbb C\longrightarrow\mathbb C^{25}
\longrightarrow H^0(X,T\mathbb P^4|_X)\longrightarrow0
$$

となるから $h^0(T\mathbb P^4|_X)=24$。同じ長完全列の次の部分では

$$
0=H^1(X,\mathcal O_X(1))^{\oplus5}
\longrightarrow H^1(X,T\mathbb P^4|_X)
\longrightarrow H^2(X,\mathcal O_X)=0
$$

となり、$H^1(X,T\mathbb P^4|_X)=0$ を得る。

さらに[収縮による束同型](../CYG1-12/index.md#thm-cyg1-12-bundle-isomorphism)と[低次Hodge数](../CYG1-08/index.md#prop-cyg1-08-low-hodge)から

$$
H^0(X,T_X)\simeq H^0(X,\Omega_X^2)=0
$$

である。したがって法束列の長完全列はちょうど

$$
0\longrightarrow\mathbb C^{24}\xrightarrow{\ dF\ }
S_5/\mathbb CF\xrightarrow{\ \delta\ }H^1(X,T_X)
\longrightarrow0
$$

となり、$\dim H^1(X,T_X)=125-24=101$。ここで $dF$ の像は、Euler列の局所表示によって $\sum_iL_i\partial_iF$ を $F$ で割った類に送るので $J(F)_5/\mathbb CF$ と一致する。よって

$$
(S_5/\mathbb CF)/(J(F)_5/\mathbb CF)
\simeq S_5/J(F)_5\xrightarrow{\ \simeq\ }H^1(X,T_X).
$$

最後に、[一次変形の分類](../CYG1-12/index.md#thm-cyg1-12-first-order-classification)によって右辺が複素構造の一次変形の接空間であることを確認する。$\square$
<!-- proof-end -->

この証明には三つの段階がある。多項式の線形代数だけでFermatの101を得た第3節と異なり、**一般の滑らかなquinticで全一次変形を尽くす**には、法束列、射影空間上のコホモロジーと一次変形の分類が要る。さらに実際の局所モジュライが滑らかで101次元であることには、変形の存在・障害を扱う別の理論が要る。Calabi–Yauに対するBogomolov–Tian–Todorovの無障害性定理はその深い外部入力であり、ここでは証明していない。射影変換の商を大域的に良い多様体とみなすにも安定化群等の検討が必要である。

## 5. 1方向のKähler錐は、複素構造の101方向と異なる

既習の[Kähler錐の定義](../../KAH/KAH1-13/index.md#def-kah1-13-cone)では、固定した複素構造 $J$ の上で正の実閉 $(1,1)$ 形式 $\omega$ のコホモロジー類 $[\omega]$ を動かす。正値性とは、任意の非零接ベクトル $v$ に対して $-i\omega(v,\bar v)>0$ となることだった。どの方向でも許されるのではなく、正値な代表が存在する領域だけがKähler錐である。

[Fubini–Study形式の正値性と閉性](../../KAH/KAH1-07/index.md#thm-kah1-07-global-fs)から、$X\subset\mathbb P^4$ への制限 $\omega_{\mathrm{FS}}|_X$ も正の実閉 $(1,1)$ 形式である。規格化して $[\omega_{\mathrm{FS}}|_X]=2\pi H$ と書く。この $H$ が一つの方向を与え、[五次三次元超曲面の低次Hodge数](../CYG1-08/index.md#prop-cyg1-08-low-hodge)により $h^{1,1}(X)=1$。この二つを合わせて**正の半直線のみ**が許されることを示す。

<a id="prop-cyg1-13-kahler-ray"></a>

<!-- formal-statement-start -->
> **命題（quinticのKähler錐）**
>
> $X\subset\mathbb P^4_{\mathbb C}$ を滑らかな五次超曲面とし、$H=c_1(\mathcal O_X(1))$ とする。固定した複素構造における実 $(1,1)$ コホモロジー空間とKähler錐はそれぞれ

$$
H^{1,1}(X;\mathbb R)=\mathbb R H,
\qquad \mathcal K_X=\{aH:a>0\}.
$$

> ただし $H^{1,1}(X;\mathbb R)=H^2(X;\mathbb R)\cap H^{1,1}(X)$ という実部分空間を意味する。
<!-- formal-statement-end -->

### 証明の見取り図

すべての候補は $aH$ と書ける。$a>0$ なら制限Fubini–Study形式を正に倍して代表できる。一方 $a\le0$ はKähler形式の三乗の積分が正になるという条件に反する。

<!-- proof-start -->
### 証明

[五次三次元超曲面の低次Hodge数](../CYG1-08/index.md#prop-cyg1-08-low-hodge)は $h^{1,1}=1$ を与え、$H$ は零でない実 $(1,1)$ 類だから $H^{1,1}(X;\mathbb R)=\mathbb RH$ である。$a>0$ なら $\omega=a\omega_{\mathrm{FS}}|_X/(2\pi)$ が正・実・閉・$(1,1)$ 型で $[\omega]=aH$。よって $aH\in\mathcal K_X$。

逆に $aH\in\mathcal K_X$ ならその正値代表 $\omega$ の三乗は正の体積形式で、$X$ がコンパクト・連結だから $\int_X\omega^3>0$。次数五の超曲面 $X$ を一般の3本の超平面で切ると、残る射影直線上の五次式は重複度を込めて5個の零点を持つ。超平面類の交点数として $\int_XH^3=5$ が得られるので

$$
0<\int_X\omega^3=\int_X(aH)^3=5a^3.
$$

実数 $a$ について $a^3>0$ は $a>0$ と同値である。従って $\mathcal K_X=\mathbb R_{>0}H$。$\square$
<!-- proof-end -->

**定義の具体的な確認**。$a=2$ なら正の代表 $\omega_{\mathrm{FS}}|_X/\pi$ を持つ。一方 $a=-1$ の類は存在する実 $(1,1)$ 類ではあるが、体積積分が $-5$ となるため正値な代表を持てない。$a=0$ も正の形式の体積積分を零にしてしまう。このように「ベクトル空間が一次元」と「錐が正の半直線」は異なる判定である。

### Kähler錐に実方向を追加すると何が変わるか

物理的にKähler類を複素数でまとめたい場合は、正のKähler形式に加えて実閉2形式のコホモロジー類 $B$ を別の自由度として指定する。$B$ はKähler形式そのものではない。

[滑らかな五次超曲面への弱Lefschetz定理](../CYG1-08/index.md#thm-cyg1-08-weak-lefschetz)は整数係数で $H^2(X;\mathbb Z)=\mathbb Z H$ を与える。従って実係数でも一つの基底 $H$ を持ち、任意の実閉2形式の類とKähler類は

$$
H^2(X;\mathbb R)=\mathbb RH,\qquad
\frac{[B]}{2\pi}=bH,\qquad
\frac{[\omega]}{2\pi}=vH
$$

と一意に書ける。このうち $v>0$ に限るのが[本章で求めたKähler錐](#prop-cyg1-13-kahler-ray)の正値条件である。整数周期の同一視を採用する場合、生成元 $H$ の整数倍だけ $[B]/(2\pi)$ をずらすので $b\sim b+1$ となる。

<a id="def-cyg1-13-complexified-kahler"></a>

<!-- formal-statement-start -->
> **定義（複素化Kählerパラメータ）**
>
> 滑らかな五次超曲面 $X\subset\mathbb P^4_{\mathbb C}$ の複素構造を固定し、実閉2形式の類 $B$ とKähler類 $[\omega]$ を選ぶ。$H=c_1(\mathcal O_X(1))$ に対し

$$
\frac{[B]}{2\pi}=bH,\qquad
\frac{[\omega]}{2\pi}=vH,\qquad t=b+iv\quad(v>0)
$$

> と置いた $t$ を、ここでの**古典的な複素化Kählerパラメータ**という。$B$ の整数周期を同一視する規約では $b\sim b+1$ とする。これは複素構造の一次変形を表す $H^1(X,T_X)$ の元ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cyg1-13-complexified-kahler -->
**定義の確認**。$t=1/3+2i$ なら $B$ の類は $2\pi H/3$、Kähler類は $4\pi H$ で正値な代表 $2\omega_{\mathrm{FS}}|_X$ を持つ。$t=1/3-2i$ は $v=-2$ であり、[正の半直線の命題](#prop-cyg1-13-kahler-ray)の条件を破るので許されない。$t=4/3+2i$ は整数周期の同一視を採用した場合には最初の値と同一視されるが、この周期同一視を採らない単なる実形式の組としては違うデータである。
<!-- definition-example-end -->

複素係数の二次コホモロジーでは、同じ組を $[B+i\omega]=[B]+i[\omega]=2\pi tH$ と表す。この古典的パラメータは $t$ という一つの**複素数**で表せるが、単にKähler錐 $\mathbb R_{>0}H$ の実一次元を「複素一次元」と呼び直したものではない。$B$ の実方向を新たに加えて複素化したのである。また、この初等的定義だけから量子補正やmirror対称性の大域的な主張が導かれるわけでもない。

## 6. 数えた対象・使った入力・数えなかったもの

| 対象 | 自由度 | 根拠 | 注意点 |
| --- | ---: | --- | --- |
| 五次式の係数空間 $S_5$ | 複素126 | 指数の分配 $\binom94$ | 同じ超曲面を重複して表す |
| 五次方程式の射影係数空間 | 複素125 | 全体のスカラー倍を除く | 射影自己同型はまだ除かない |
| 滑らかなquinticの一次複素構造変形 | 複素101 | 法束・Euler列と $H^1(T_X)$ | 無障害性・局所モジュライの滑らかさは別問題 |
| 固定した $X$ のKähler錐 | 実1 | $h^{1,1}=1$ と正値性 | $a>0$、零や負の類は入らない |
| 古典的複素化Kählerパラメータ | 局所的に複素1 | $B+i\omega$ を組にする | $B$ の周期同一視は追加規約 |

とくに一般の多様体で「方程式の係数数 − 群の次元」を機械的に引くことはできない。射影自己同型の安定化群が正の次元を持てば軌道次元が減り、埋込みで作れる変形が全変形とは限らない。ここではFermatの接空間の独立性と、滑らかなquinticの法束・Euler列による同型を**別々に**確かめたので101を正当化できた。

## 7. 演習――係数・座標・変形・Kähler類を区別する

<a id="ex-cyg1-13-a01"></a>
#### CYG1-13-A01 五次単項式の数え方
- Level: A

変数 $z_0,\ldots,z_4$ の全次数5の斉次単項式の数を求めよ。指数列の構成から数え、全次数4の場合の個数も確認せよ。

<!-- solution-start -->
**詳細解答。** 五次単項式の指数は $a_0+\cdots+a_4=5$、$a_i\ge0$ を満たす。玉5個の隙間も含めて仕切り4本を置くと、9個の場所から仕切りの場所4個を選ぶので

$$
\dim S_5=\binom94=\frac{9\cdot8\cdot7\cdot6}{4\cdot3\cdot2\cdot1}=126.
$$

全次数4なら玉4個と仕切り4本なので $\dim S_4=\binom84=70$。係数の順序ではなく各変数の指数の組が単項式を一意に指定するから、どちらも重複がない。
<!-- solution-end -->

<a id="ex-cyg1-13-a02"></a>
#### CYG1-13-A02 射影座標の取り替えを一次で微分する
- Level: A

$F_0=\sum_{i=0}^4z_i^5$ に $z_0\mapsto z_0+tz_2$、他の座標は不変という置換を施す。$t$ の一次係数を求め、なぜ新たな複素変形の方向ではないか説明せよ。

<!-- solution-start -->
**詳細解答。** 二項展開の $t$ 一次だけを残す。ここで $O(t^2)$ は通常のパラメータ $t\to0$ で二次以上の項をまとめた記法であり、第2節の $t^2=0$ と同じ一次係数を取り出す。

$$
(z_0+tz_2)^5=z_0^5+5tz_0^4z_2+O(t^2).
$$

従って係数は $G=5z_0^4z_2=z_2\partial_0F_0$。これは[多項式一次変形の定義](#def-cyg1-13-polynomial-direction)の $J(F_0)_5$ に入り、商 $S_5/J(F_0)_5$ で零となる。$E_{02}$ を $(0,2)$ 成分だけが1の行列とすると、座標置換の行列 $I+tE_{02}$ は逆行列 $I-tE_{02}$ を一次で持つので、方程式の見かけを変更しただけである。
<!-- solution-end -->

<a id="ex-cyg1-13-a03"></a>
#### CYG1-13-A03 FermatのJacobian単項式
- Level: A

$F_0=\sum_{i=0}^4z_i^5$ について $J(F_0)_5$ の基底の数を、純五次 $z_i^5$ と混合形 $z_i^4z_j$ ($i\ne j$) に分けて求めよ。

<!-- solution-start -->
**詳細解答。** $\partial_iF_0=5z_i^4$ は次数4なので、次数5のイデアルの元は一次式を掛けて得られる。$i=j$ は純五次5個、$i\ne j$ は $i$ の5通りそれぞれに $j$ の4通りがあり20個である。各単項式の指数列は異なるから線形独立で、

$$
\dim J(F_0)_5=5+5\cdot4=25,\qquad
\dim(S_5/J(F_0)_5)=126-25=101.
$$

このうち $F_0=(1/5)\sum_i z_i\partial_iF_0$ が全体のスカラー倍1方向であるため、残る24が射影自己同型に対応する。
<!-- solution-end -->

<a id="ex-cyg1-13-a04"></a>
#### CYG1-13-A04 正の半直線の判定
- Level: A

滑らかなquintic $X$ で $\int_XH^3=5$、$h^{1,1}=1$ とする。$3H,0,-H$ のうちKähler類となるものを判定せよ。

<!-- solution-start -->
**詳細解答。** [Kähler錐の命題](#prop-cyg1-13-kahler-ray)の証明どおり、正の制限Fubini–Study形式が $2\pi H$ を代表する。$3H$ はその $3/(2\pi)$ 倍で正・閉・実 $(1,1)$ 型だからKähler類である。一方 $aH$ の任意のKähler代表 $\omega$ に対し

$$
\int_X\omega^3=5a^3>0
$$

が必要。$a=0$ では零、$a=-1$ では $-5$ になり、ともに必要条件に反する。従って $3H$ のみである。
<!-- solution-end -->

<a id="ex-cyg1-13-a05"></a>
#### CYG1-13-A05 複素化パラメータの読み方
- Level: A

[複素化Kählerパラメータ](#def-cyg1-13-complexified-kahler) $t=b+iv$ について、$t=2/5+3i$ と $t=7/5+3i$ の二つのKähler類と $B$ 類を求め、整数周期を同一視する場合の関係を述べよ。

<!-- solution-start -->
**詳細解答。** 両者とも $v=3>0$ なので $[\omega]=2\pi\cdot3H=6\pi H$ は正である。第一の $[B]$ は $2\pi(2/5)H=4\pi H/5$、第二は $2\pi(7/5)H=14\pi H/5$。差は $2\pi H$ である。従って $b\sim b+1$ を採用した場合は同一視されるが、周期商をとらない実コホモロジー類としては異なる。
<!-- solution-end -->

<a id="ex-cyg1-13-b01"></a>
#### CYG1-13-B01 消えない積単項式の方向
- Level: B

Fermat五次の $G=z_0z_1z_2z_3z_4$ が射影自己同型で消えないことを示し、さらに $G'=z_0^4z_1+2G$ の商空間での類を求めよ。

<!-- solution-start -->
**詳細解答。** [Fermatの基底の命題](#prop-cyg1-13-fermat-101)の $J(F_0)_5$ は $z_i^4z_j$ の線形結合だけを含む。単項式は指数列によって一次独立であり、$G$ は指数 $(1,1,1,1,1)$ を持つため、これら25個の基底の線形結合にはならない。従って $[G]\ne0$。一方 $z_0^4z_1=(1/5)z_1\partial_0F_0$ はイデアルに属し、

$$
[G']=[z_0^4z_1]+2[G]=2[G]\ne0
$$

となる。係数を動かしたことと本質的に違う方向を得たことを区別できる。
<!-- solution-end -->

<a id="ex-cyg1-13-b02"></a>
#### CYG1-13-B02 Euler列・法束列で101を復元する
- Level: B

滑らかなquintic $X\subset\mathbb P^4$ について、$h^0(\mathcal O_X)=1$、$h^0(\mathcal O_X(1))=5$、$h^0(\mathcal O_X(5))=125$、$H^1(\mathcal O_X)=H^2(\mathcal O_X)=H^1(\mathcal O_X(1))=0$、$H^0(T_X)=0$ を与える。接Euler列と法束列の長完全列から $h^1(T_X)$ を計算せよ。

<!-- solution-start -->
**詳細解答。** [接Euler列](../../../代数系/AG/AG2-09/index.md#thm-ag2-09-tangent-euler)を $X$ へ制限し、$H^1(\mathcal O_X)=0$ を使うと

$$
0\to H^0(\mathcal O_X)\to H^0(\mathcal O_X(1))^{\oplus5}
\to H^0(T\mathbb P^4|_X)\to0
$$

となる。従って $h^0(T\mathbb P^4|_X)=5\cdot5-1=24$。さらに $H^1(\mathcal O_X(1))=H^2(\mathcal O_X)=0$ が同じ列の $H^1(T\mathbb P^4|_X)$ の両隣にあるので、この群は零。[法束列](../CYG1-07/index.md#prop-cyg1-07-normal)の長完全列へ代入し、$H^0(T_X)=0$ を使うと

$$
0\to\mathbb C^{24}\to\mathbb C^{125}
\to H^1(X,T_X)\to0.
$$

従って $h^1(T_X)=125-24=101$。これは寸法の計算だけでなく、法束の切断からの連結写像が全射だという情報も与える。
<!-- solution-end -->

<a id="ex-cyg1-13-b03"></a>
#### CYG1-13-B03 一パラメータ族の特異値
- Level: B

$F_\psi=\sum_i z_i^5-5\psi\prod_i z_i$ で $\psi\in\mathbb C$ とする。全ての斉次偏微分が零となる射影点があることと $\psi^5=1$ が同値であることを証明せよ。

<!-- solution-start -->
**詳細解答。** 偏微分は $5(z_i^4-\psi\prod_{j\ne i}z_j)$。もしある $z_k=0$ なら、$i\ne k$ の偏微分条件は $z_i^4=0$ となって全座標が零となり、射影点に反する。従って全座標が非零であり、各条件を掛け合わせて

$$
\prod_i z_i^4=\psi^5\prod_i\prod_{j\ne i}z_j
=\psi^5\prod_jz_j^4.
$$

非零な積で割ると $\psi^5=1$ が必要である。

逆に $\psi^5=1$ なら $[\psi^{-1}:1:1:1:1]$ において、$i=0$ の条件は $\psi^{-4}=\psi$、$i\ne0$ の条件は $1=\psi\cdot\psi^{-1}$ で成立する。よって同値である。

[斉次式のEuler恒等式](../../../代数系/AG/AG2-11/index.md#prop-ag2-11-euler-gradient)は $5F_\psi=\sum_i z_i\partial_iF_\psi$ である。選んだ点では右辺が零だから、点は零集合上にある。従って[射影超曲面のJacobian判定](../../../代数系/AG/AG2-11/index.md#thm-ag2-11-jacobian-criterion)から、この五つの値で特異化すると結論できる。
<!-- solution-end -->

<a id="ex-cyg1-13-b04"></a>
#### CYG1-13-B04 四次K3では同じ引き算が足りない
- Level: B

$F=\sum_{i=0}^3z_i^4$ が定める滑らかな四次K3曲面 $Y\subset\mathbb P^3$ を考える。四変数四次式の係数数と $J(F)_4$ の次元を数え、多項式一次方向の次元を求めよ。[K3のHodge数](../CYG1-05/index.md#prop-cyg1-05-hodge)および[一次変形とHodge群の対応](../CYG1-12/index.md#thm-cyg1-12-first-order-hodge)の $h^1(T_Y)$ と比較せよ。

<!-- solution-start -->
**詳細解答。** 四変数の指数和が4である非負整数解は $\binom{4+4-1}{3}=\binom73=35$ 個である。偏微分は $4z_i^3$ なので、$J(F)_4$ は $z_i^3z_j$（$0\le i,j\le3$）という相異なる16個の単項式を基底に持つ。従って

$$
\dim S_4/J(F)_4=35-16=19.
$$

一方、滑らかな四次K3は $K_Y\simeq\mathcal O_Y$ で $h^{1,1}(Y)=20$。複素次元2なので[一次変形とHodge群の同型](../CYG1-12/index.md#thm-cyg1-12-first-order-hodge)に $n=2$ を入れれば

$$
h^1(Y,T_Y)=h^{1,1}(Y)=20.
$$

多項式で得た19方向だけでは全一次変形20方向を尽くせない。この比較は、quinticの結論をすべての超曲面へ無条件に一般化できない反例である。四次超曲面の埋込みという追加条件の保持と、抽象K3の複素構造の変形は同じ問題ではない。
<!-- solution-end -->

<a id="ex-cyg1-13-c01"></a>
#### CYG1-13-C01 二つの101を、独立な経路から一致させる
- Level: C

滑らかなFermat五次 $X_0\subset\mathbb P^4$ について、一次多項式方向の次元を指数列から数えよ。さらに任意の滑らかなquintic $X$ に対し、制限列・接Euler列・法束列から $\dim H^1(T_X)$ を出し、最後にHodge数 $h^{2,1}=101$ と突き合わせよ。どの段階が「一般の滑らかなquintic」の主張であり、無障害性をなぜ証明していないかも述べよ。

<!-- solution-start -->
**詳細解答。** Fermatでは全次数5の指数列が126個あり、偏微分 $5z_i^4$ に一次式を掛けた $z_i^4z_j$ が25個で独立だから、[Fermatの命題](#prop-cyg1-13-fermat-101)の計数は

$$
\dim S_5/J(F_0)_5=\binom94-25=101.
$$

次は任意の滑らかな $X$ である。[ねじり層のコホモロジー](../../../代数系/AG/AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)と $0\to\mathcal O(-5)\to\mathcal O\to\mathcal O_X\to0$ から $H^1(\mathcal O_X)=H^2(\mathcal O_X)=0$、$h^0(\mathcal O_X)=1$。$0\to\mathcal O(-4)\to\mathcal O(1)\to\mathcal O_X(1)\to0$ から $h^0(\mathcal O_X(1))=5$ と $H^1(\mathcal O_X(1))=0$。$0\to\mathcal O\to\mathcal O(5)\to\mathcal O_X(5)\to0$ から $h^0(\mathcal O_X(5))=126-1=125$。

[接Euler列](../../../代数系/AG/AG2-09/index.md#thm-ag2-09-tangent-euler)は $h^0(T\mathbb P^4|_X)=25-1=24$ と $H^1(T\mathbb P^4|_X)=0$ を与える。$H^0(T_X)=0$ は[収縮同型](../CYG1-12/index.md#thm-cyg1-12-bundle-isomorphism)と $h^{2,0}=0$ による。よって[法束列](../CYG1-07/index.md#prop-cyg1-07-normal)の連結写像で

$$
0\to\mathbb C^{24}\to\mathbb C^{125}\to H^1(X,T_X)\to0,
\qquad h^1(X,T_X)=101.
$$

この列の核は射影自己同型による方向 $J(F)_5/\mathbb CF$ であり、商の同型は[本章の定理](#thm-cyg1-13-all-first-order)の内容である。他方、[quinticのHodge数](../CYG1-08/index.md#prop-cyg1-08-hodge-diamond)と[一次変形のHodge対応](../CYG1-12/index.md#thm-cyg1-12-first-order-hodge)も $h^1(T_X)=h^{2,1}(X)=101$ を独立に与える。ここまでで分かったのは一次空間であり、二次以上の障害が消えること・滑らかなモジュライの存在・大域的な商の性質はこれらの式に含まれない。
<!-- solution-end -->

<a id="ex-cyg1-13-c02"></a>
#### CYG1-13-C02 複素構造とKähler方向の誤った合算を直す
- Level: C

滑らかなquintic $X$ について「$h^{2,1}=101$、$h^{1,1}=1$ だから、$X$ の複素構造変形は102次元であり、$-H$ も残りの一方向のKähler変形である」と主張した。この主張に含まれる二種類の誤りを定義と計算で指摘し、$B$ を加えた場合の正しいパラメータの形を示せ。

<!-- solution-start -->
**詳細解答。** 第一に、[一次変形のHodge対応](../CYG1-12/index.md#thm-cyg1-12-first-order-hodge)が与える接空間は $H^1(T_X)\simeq H^{2,1}$ で複素101次元である。$H^{1,1}$ は固定した複素構造上の $(1,1)$ コホモロジーであり、別の変形空間だから $101+1$ を同種の接空間の次元にはできない。

第二に、Kähler類には正の代表が必要である。[本章の正半直線の命題](#prop-cyg1-13-kahler-ray)は $\mathcal K_X=\{aH:a>0\}$ なので $-H$ は含まれない。実際

$$
\int_X(-H)^3=-\int_XH^3=-5<0
$$

となり、正のKähler形式 $\omega$ に必要な $\int_X\omega^3>0$ に反する。$B$ を独立に加える[複素化Kählerパラメータ](#def-cyg1-13-complexified-kahler)は

$$
t=b+iv,\quad b\in\mathbb R,\ v>0,
\qquad [B+i\omega]=2\pi(b+iv)H
$$

と書け、整数周期の規約なら $b\sim b+1$。これは古典的に局所複素一次元の**別の**パラメータであり、複素構造の101方向に勝手に加えない。さらに101方向全体を滑らかなモジュライとして扱うには無障害性等の別の結果が必要である。
<!-- solution-end -->

## 8. 次章へ――二つの自由度の交換は何を意味するか

quinticの101は、係数計算・法束列・Hodge理論の三通りで同じ一次空間へ到達した数字だった。Kähler錐の1は、同じ $X$ における正の実 $(1,1)$ 類の方向数だった。次の総合章では、こうした**対象と仮定の違い**を保ったまま、mirror symmetryで二つのHodge数を交換するという見方がどこまで正確に言えるかを考える。
