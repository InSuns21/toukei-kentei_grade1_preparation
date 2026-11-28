# MQFC42 くりこみ処方の変更

前提講座：[MQFC34 局所反項の自由度](../MQFC34/index.md)、[MQFC35 Feynman核の対角延長](../MQFC35/index.md)、[MQFC36 多点の部分対角](../MQFC36/index.md)、[MQFC40 Epstein–Glaser帰納構成](../MQFC40/index.md)、[MQFC41 局所S行列](../MQFC41/index.md)。

同じ原点外の分布でも、原点にデルタ分布を加えることで別の延長を作れた。時間順序積の延長を変えると局所S行列も変わるが、各次数の差を独立に足してよいわけではない。二次の反項は三次以降の部分衝突にも現れるからである。本講では、処方の変更を入力する相互作用の非線形な再定義として組み直す。

## 1. 入力の再定義

時空は Minkowski 時空 $M=\mathbb R^{1+3}$、計量は $(-,+,+,+)$ とする。MQFC41と同じく、局所Wick多項式を滑らかなコンパクト支持の試験関数で積分したものの有限和を入力の実ベクトル空間 $\mathcal L$ とし、その複素化も用いる。場の微分を含む局所多項式も許す。値域 $\mathcal A$ は単位的結合スター積代数とし、入力はその部分空間とみなす。挿入の個数を数える可換形式変数 $\lambda$ は $\hbar$ と区別する。

二つの処方 $T_n,\widetilde T_n$ はともに対称多重線形で $T_0=\widetilde T_0=1,\ T_1=\widetilde T_1=\mathrm{id}$ とする。両者は [時間順序積の因果帰納条件](../MQFC40/index.md#def-mqfc40-causal-recursion) を満たす。[局所S行列](../MQFC41/index.md#def-mqfc41-local-s) をそれぞれ $S,\widetilde S$ と書く。

ここでは MQFC40 の並進不変な数値分布係数と局所Wick多項式の設定で議論する。因果分解に必要な分布積・制限が存在し、全対角に残った有限階のデルタ微分係数を試験関数とWick多項式に作用させた結果が $\mathcal L$ に属することを仮定する。特に入力空間を特定の有限個の結合だけに制限しない。次数ごとにこの局所閉性を使う。

二次の差を $S$ の一次項に吸収するには、入力 $X=\lambda F$ を $\lambda F+\lambda^2 B(F,F)/2$ に置き換えればよい。一般に、補正を挿入数ごとに並べた写像を考える。この非線形な入力変換で、異なる二処方を結び付けたい。

<a id="def-mqfc42-prescription-map"></a>

<!-- formal-statement-start -->
> **定義（Stückelberg–Petermann型処方変更写像）**
> 局所入力空間 $\mathcal L$ 上の形式写像

$$
Z(X)=X+\sum_{n\ge2}\frac{1}{n!}Z_n(X,\ldots,X)
$$

> で、各 $Z_n:\mathcal L^n\to\mathcal L$ が対称多重線形であり、その局所密度の分布核が、出力位置を含む全位置が一致する対角に支持を持つものを考える。入力 $X$ は正次数の形式変数を含む。$Z(0)=0$、線形部は恒等写像である。二つの局所S行列について $\widetilde S=S\circ Z$ が成立するとき、$Z$ をその処方変更写像と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc42-prescription-map -->
### 直接例：二次の局所質量項

**定義の確認**。入力 $F_f=\int_M f(x)\phi(x)^2/2\,d^4x$ の族を取り、実数 $c$ に対して

$$
Z_2(F_f,F_g)=cF_{fg},\qquad Z_n=0\ (n\ge3)
$$

とする。この例では入力空間をこの族の線形空間とする。積 $fg$ は両入力に線形、交換しても不変で、滑らかなコンパクト支持を持つ。出力位置を $z$ と書くと核は $c\delta(x-z)\delta(y-z)$ であり、$x=y=z$ 以外では作用が零である。従って局所性も満たす。$Z(\lambda F_f)=\lambda F_f+c\lambda^2 F_{f^2}/2$ なので定数項は零、一次項は元の入力である。この $Z$ は局所写像の例であり、特定の二処方を結ぶには実際に $S\circ Z=\widetilde S$ となるかを別に確認する。
<!-- definition-example-end -->

$Z_n$ の全対角支持は [多点の部分対角](../MQFC36/index.md#def-mqfc36-partial-diagonal) の全添字集合に対応する。例えば $Z_2$ の核がデルタの微分でも、入力の試験関数を微分して同じ点で掛けるので、出力の台は入力の台の共通部分に含まれる。従って互いに台の交わらない二つの入力を含む混合項は零となる。

## 2. なぜ全対角だけを補正すればよいか

まず低次数の補正を決め、次に残る差を調べる。重要なのは、二つの時間順序積を直接引くのでなく、既に決めた補正を代入したS行列との差を取ることである。

<a id="thm-mqfc42-prescription-comparison"></a>

<!-- formal-statement-start -->
> **定理（局所S行列の処方比較）**
> 第1節の局所入力空間、分布係数の局所閉性および因果帰納条件のもとで、同一の一次積を持つ二つの局所S行列 $S,\widetilde S$ に対し、形式次数ごとに一意な処方変更写像 $Z$ が存在して

$$
\widetilde S(X)=S(Z(X))
$$

> を満たす。さらに $S,\widetilde S$ が実入力でユニタリティを満たす場合、$Z$ は実入力を実入力に写す（ここで $\mathcal L$ の実部分は自己随伴な局所入力とする）。
<!-- formal-statement-end -->

### 証明の見取り図

次数 $n-1$ まで一致させたとき、因果分解により全対角外の $n$ 次差も消える。残る差は局所入力として一次項に吸収できる。一次項が $iX$ なので補正は一意である。

<!-- proof-start -->
### 証明

$Z^{<n}(X)=X+\sum_{2\le k<n}Z_k(X^k)/k!$ とし、$S(Z^{<n}(X))$ と $\widetilde S(X)$ が次数 $n-1$ まで一致すると仮定する。$n=2$ では $Z^{<2}(X)=X$ であり、仮定は一次積の一致から成立する。

$n$ 個の入力 $F_j$ に独立な形式変数 $t_j$ を付けて $X=\sum_j t_jF_j$ とする。$t_1\cdots t_n$ の係数の差を $D_n(F_1,\ldots,F_n)$ と書く。対称多重線形性はこの係数の取り方から従う。

全対角外の各配置では、[因果帰納による全対角外の一意性](../MQFC40/index.md#thm-mqfc40-off-diagonal-recursion) の開被覆により、非空な二組 $I,J$ に分けて $C_I$ 上で $I$ の点が $J$ の点の因果的過去に入らないようにできる。この近傍では二組の位置は互いに異なる。

$X_I=\sum_{j\in I}t_j F_j$、$X_J=\sum_{j\in J}t_j F_j$ と置く。既に構成した $Z_k$ の核は全対角に支持を持つので、二組をまたぐ $Z_k$ の混合係数はこの近傍では零である。従って係数の制限として

$$
Z^{<n}(X)=Z^{<n}(X_I)+Z^{<n}(X_J)
$$

となる。各組内の補正の出力位置は入力位置に留まるので、因果順序も保たれる。[局所S行列の因果因子化](../MQFC41/index.md#thm-mqfc41-s-factorization) を適用すると

$$
\begin{aligned}
S(Z^{<n}(X))|_{C_I}
={}&\bigl(S(Z^{<n}(X_I))\\
&\star S(Z^{<n}(X_J))\bigr)|_{C_I}.
\end{aligned}
$$

ここで式は全て独立な添字変数の混合係数の分布核について読む。例えば $I$ の係数の次数は $|I|$、$J$ の係数の次数は $|J|$ であり、どちらも $n$ 未満である。

帰納仮定により各因子の該当係数を $\widetilde S(X_I),\widetilde S(X_J)$ の係数に置き換えられる。$\widetilde S$ にも因果因子化を使うと積は $\widetilde S(X)$ の同じ混合係数に一致する。従って $D_n|_{C_I}=0$。

全対角外をこの開集合で覆えるので、$D_n$ は全対角に支持を持つ。分布係数の局所閉性により $D_n$ は局所入力に値を取る。$Z_n=D_n/i$ と置く。

$S$ の一次項 $iX$ に $Z_n(X^n)/n!$ を代入すると、混合係数は $iZ_n(F_1,\ldots,F_n)=D_n$ だけ増える。二次以上の項にこの補正を一度入れると少なくとも次数 $n+1$ となるため、次数 $n$ の他の項は変わらない。これで次数 $n$ の差も消える。

一意性は、二つの候補が最初に異なる次数 $n$ を考えると、S行列の差のその次数が $i(Z_n-Z'_n)$ になることから従う。これが零なら $Z_n=Z'_n$ となり矛盾する。

実性については、$Z^{<n}$ が実入力で実であると帰納的に仮定する。

$$
A=S(Z^{<n}(\lambda F)),\qquad B=\widetilde S(\lambda F)
$$

と置くと、実の $\lambda,F$ に対して両者とも [挿入数ごとのユニタリティ条件](../MQFC40/index.md#def-mqfc40-order-unitarity) によりユニタリティを満たす。最初の差を

$$
B=A+\lambda^n d+O(\lambda^{n+1})
$$

と書く。$A,B$ の定数項が1なので、次数 $n$ の差は

$$
[\lambda^n](B^*\star B-A^*\star A)=d+d^*=0.
$$

従って $d^*=-d$ であり、補正の随伴は

$$
(n!d/i)^*=n!d/i
$$

となる。異なる実入力についても独立変数の混合係数を取れば同じ結論になる。一次部は恒等写像なので帰納が始まり、全次数で実性が保たれる。
<!-- proof-end -->

局所性は背景 $G$ があるときにも使える。$F,H$ の台が互いに素なら、混合係数で $F,H$ を同時に含む項は全対角支持により零である。$Z(F+G+H)$ の残りの項は $Z(F+G)+Z(G+H)$ に全て現れ、$G$ だけの項が二重に数えられるので、

$$
Z(F+G+H)=Z(F+G)+Z(G+H)-Z(G)
$$

となる（入力は正次数の形式変数を含むものとする）。

この証明は局所Wick展開の閉性を使った形式的な比較である。場の独立性、局所共変性、ゲージ対称性などを追加した一般のくりこみ処方では、それらに対応する条件も $Z$ に課される。

## 3. 二次・三次の係数と逆写像

$T_n$ と $\widetilde T_n$ の差を $\Delta T_n=\widetilde T_n-T_n$ と書く。二次で得た局所補正は三次でも使用するため、その寄与を先に引く。

<a id="thm-mqfc42-low-order-change"></a>

<!-- formal-statement-start -->
> **定理（処方変更の低次係数）**
> 前節の条件と $S(X)=\sum_{n\ge0}i^n T_n(X^n)/n!$ の規約のもとで、任意の局所入力 $F$ に対し

$$
Z_2(F,F)=i\Delta T_2(F,F),
$$

$$
Z_3(F,F,F)=-\Delta T_3(F,F,F)
+3T_2(F,\Delta T_2(F,F)).
$$

> 異なる入力に対する式は対称多重線形性により決まる。
<!-- formal-statement-end -->

見取り図：$S(Z(\lambda F))$ の一次項に三次補正、二次項に一次入力と二次補正、三次項に一次入力三つが現れる。

<!-- proof-start -->
### 証明

$B=Z_2(F,F),C=Z_3(F,F,F)$ とすると

$$
Z(\lambda F)=\lambda F+\frac{\lambda^2}{2}B
+\frac{\lambda^3}{6}C+O(\lambda^4).
$$

ここで $O(\lambda^k)$ は形式次数 $k$ 以上を表す。$iZ$ はそのまま代入する。$-T_2(Z,Z)/2$ の二次は $-\lambda^2 T_2(F,F)/2$、三次は二つの入力のどちらにも $B$ を入れられるため $-\lambda^3 T_2(F,B)/2$ となる。$-iT_3(Z,Z,Z)/6$ の三次は $-i\lambda^3T_3(F,F,F)/6$ である。従って二次の一致は

$$
iB-T_2(F,F)=-\widetilde T_2(F,F),
$$

すなわち $iB=-\Delta T_2(F,F)$ から $B=i\Delta T_2(F,F)$。三次の一致は

$$
iC-3T_2(F,B)-iT_3(F,F,F)
=-i\widetilde T_3(F,F,F).
$$

移項して $i$ で割ると

$$
C=-\Delta T_3(F,F,F)-3iT_2(F,B).
$$

$B=i\Delta T_2(F,F)$ を代入し、$-3i^2=3$ を使えば主張の式になる。異なる三入力では、$F$ を $t_1F_1+t_2F_2+t_3F_3$ に置き換え、$t_1t_2t_3$ の係数を $3!$ で割ると

$$
\begin{aligned}
Z_3(F_1,F_2,F_3)={}&-\Delta T_3(F_1,F_2,F_3)\\
&+T_2(F_1,\Delta T_2(F_2,F_3))\\
&+T_2(F_2,\Delta T_2(F_1,F_3))\\
&+T_2(F_3,\Delta T_2(F_1,F_2)).
\end{aligned}
$$

三つの項は衝突する二点の選び方に対応する。
<!-- proof-end -->

二次の補正だけを考えると、例えば $\Delta T_2(F_f,F_g)=-icF_{fg}$ なら $Z_2=cF_{fg}$ となる。実 $c$ に対し実入力を保つ。三次では $\Delta T_3$ 自体が全対角に支持を持つとは限らず、二次の補正から来る部分対角の寄与を除いた $Z_3$ が局所的になる。

<a id="thm-mqfc42-prescription-group"></a>

<!-- formal-statement-start -->
> **定理（局所処方変更写像の合成と逆）**
> 第1節の対称多重線形な局所係数を持ち線形部が恒等である形式写像は、形式合成に関して群をなす。$Z=X+Z_2(X^2)/2!+Z_3(X^3)/3!+\cdots$ の逆写像 $W$ の最初の係数は

$$
W_2=-Z_2,\qquad
W_3(F^3)=3Z_2(F,Z_2(F,F))-Z_3(F^3).
$$
<!-- formal-statement-end -->

見取り図：合成の各次数は入力を小さな組に分け、内側の写像を各組に適用した後、外側の写像を適用する。局所性はこの二段階で保たれる。

<!-- proof-start -->
### 証明

合成の次数 $n$ は、$k$ 個の正次数入力の次数の和が $n$ となる項だけを集めればよく、有限和である。混合係数では各内側の係数が組内の位置を同一点に集め、外側の係数はその全組の出力位置をさらに同一点に集める。従って全入力が同一点にあるとき以外は零であり、合成は局所的である。線形部は恒等写像同士の合成で恒等。形式合成は有限次数ごとに通常の代入の結合律を満たす。

$Z(W(X))=X$ を順次解く。次数 $n$ の未確定係数 $W_n$ は $Z$ の線形部にだけ現れるので、それまでに確定した係数からなる残差の負を選べば一意に消せる。残差は上の合成の議論で局所的だから $W_n$ も局所的である。

逆順 $U(Z(X))=X$ も、$U_n$ の全入力に $Z$ の線形部を入れた項が $U_n$ 自身となることから、同じ逐次構成で解ける。結合律から $U=U\circ Z\circ W=W$ となり左右逆元は一致する。

二次・三次では

$$
\begin{aligned}
Z(W(\lambda F))={}&\lambda F
+\frac{\lambda^2}{2}(W_2+Z_2)(F^2)\\
&+\frac{\lambda^3}{6}\bigl(W_3(F^3)
+3Z_2(F,W_2(F,F))+Z_3(F^3)\bigr)
+O(\lambda^4).
\end{aligned}
$$

二次を零とすれば $W_2=-Z_2$、三次を零とすれば表示した $W_3$ となる。
<!-- proof-end -->

例えば第1節の $Z_2=cF_{fg}$、$Z_3=0$ の場合、$W_2(F_f,F_f)=-cF_{f^2}$、$W_3(F_f^3)=3c^2F_{f^3}$ である。二次補正を単に符号反転しただけでは三次に残差が出る。次の講義では尺度の変更をこの合成の考え方で調べる。

## 4. 運動量空間の減算との比較

[局所反項の自由度](../MQFC34/index.md#thm-mqfc34-counterterm-freedom) により、相対座標 $z\in\mathbb R^d$ でスケーリング次数 $s$ を保つ延長の差は $s\ge d$ のとき

$$
\sum_{|\alpha|\le \lfloor s-d\rfloor}c_\alpha\partial^\alpha\delta
$$

となる。運動量 $p$ は $z$ に共役な変数であり、Fourier変換を $\widehat t(p)=\int e^{-ip\cdot z}t(z)\,dz$ の規約で分布に拡張する。デルタの微分は原点での微分評価だから

$$
\widehat{\partial^\alpha\delta}(p)
=(-1)^{|\alpha|}\partial_z^\alpha e^{-ip\cdot z}|_{z=0}
=(ip)^\alpha.
$$

従って局所的な延長差は運動量の多項式である。例えば [二線核の減算延長とcutoff反項](../MQFC35/index.md#thm-mqfc35-fish-extension) の四次元核は $s=4$ なので定数だけ、$s=6$ の核なら二次までが候補になる。対称性などは別に課す。

運動量空間では、BPHZ（Bogoliubov–Parasiuk–Hepp–Zimmermann）法が発散するグラフの振幅のTaylor多項式を減算する。外部運動量に関するTaylor展開の有限部分を引く操作を定義しよう。ここでは発散する真部分グラフを持たない場合の外部運動量の減算だけを扱う。一般のグラフでは部分グラフごとの減算が必要になる。

<a id="def-mqfc42-taylor-subtraction"></a>

<!-- formal-statement-start -->
> **定義（運動量Taylor減算）**
> 開集合 $\Omega\subset\mathbb R^d$ の点 $a$ と非負整数 $m$ に対し、$A_\Lambda$ を $\Omega$ 上の $m$ 回連続微分可能な正則化済み振幅とする。次数 $m$ のTaylor多項式を

$$
P_a^m A_\Lambda(p)=
\sum_{|\alpha|\le m}
\frac{\partial^\alpha A_\Lambda(a)}{\alpha!}(p-a)^\alpha
$$

> とする。点 $a$ での減算振幅は $A_{\Lambda,a}=(1-P_a^m)A_\Lambda$ と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc42-taylor-subtraction -->
### 直接例：対数発散の減算

**定義の確認**。$p>0,\ a>0$ とし、$\Lambda>0$ に対して

$$
A_\Lambda(p)=\int_0^\Lambda\frac{dk}{k+p}
=\log(\Lambda+p)-\log p
$$

とする。これは $p>0$ で滑らかで、$\Lambda\to\infty$ で対数発散する。$m=0$ のTaylor多項式は定数 $A_\Lambda(a)$ なので

$$
A_{\Lambda,a}(p)=
\log\frac{\Lambda+p}{\Lambda+a}+\log\frac{a}{p}.
$$

$p=a$ では零であり、$\Lambda\to\infty$ で第一項は $\log1=0$ へ収束する。従って $A_a(p)=\log(a/p)$。点 $b>0$ で減算すると差は $\log(b/a)$ という定数で、対数発散の局所反項の次数と一致する。これは減算の仕組みを示す一変数積分模型である。
<!-- definition-example-end -->

<a id="thm-mqfc42-subtraction-polynomial"></a>

<!-- formal-statement-start -->
> **命題（減算点変更の多項式性）**
> 上の設定で $a,b\in\Omega$ とし、$\Omega$ は非空開集合とする。両減算振幅が各 $p\in\Omega$ で有限値 $A_a(p),A_b(p)$ に収束するなら、$A_b-A_a$ は次数 $m$ 以下の多項式の $\Omega$ への制限である。
<!-- formal-statement-end -->

見取り図：有限の正則化パラメータでの差は多項式である。有限個の点での収束から、全ての多項式係数の収束を導く。

<!-- proof-start -->
### 証明

有限の $\Lambda$ で差を取ると

$$
A_{\Lambda,b}-A_{\Lambda,a}
=P_a^m A_\Lambda-P_b^m A_\Lambda
$$

である。右辺は次数 $m$ 以下の多項式である。極限で係数も収束することを示す。この多項式空間は有限次元で、$\Omega$ 上の点評価は全て合わせると多項式を一意に決める。実際、開球上で恒等的に零なら中心での全偏微分が零なので、有限Taylor展開から零多項式となる。従って点評価の線形包が双対空間全体でなければ、それら全てを零にする非零多項式が存在して矛盾する。有限個の点評価から双対基底を選べる。

この基底での値は仮定によりそれぞれ収束する。単項式係数はこれらの値に固定された逆行列を掛けて求まるので各係数も収束する。極限の多項式の次数は $m$ 以下であり、各点での極限は $A_b-A_a$ に等しい。
<!-- proof-end -->

位置空間の延長差と運動量空間の減算差がともに有限次数の局所反項を表す理由が分かった。ただしこの命題だけでは、一般のグラフで減算後に積分が収束することや重なる部分発散の処理までは証明していない。部分衝突の次数は [多点衝突の余次元](../MQFC36/index.md#prop-mqfc36-diagonal-dimension) に従い、下位の処方変更を先に反映させる必要がある。

## 5. 演習

### 演習 MQFC42-A1：二次補正の符号
- Level: A

$\Delta T_2(F,F)=2iF$ のとき $Z_2(F,F)$ と $Z(\lambda F)$ の二次項を求めよ。

<!-- solution-start -->
**詳細解答**

[処方変更の低次係数](#thm-mqfc42-low-order-change) から $Z_2=i(2iF)=-2F$。入力の二次項は $\lambda^2Z_2/2=-\lambda^2F$ である。S行列の一次項に入れると $-i\lambda^2F$ が増え、時間順序積の差による $-\lambda^2(2iF)/2$ と一致する。
<!-- solution-end -->

### 演習 MQFC42-A2：台が交わらない場合
- Level: A

$Z_2(F_f,F_g)=cF_{fg}$ とする。$f,g$ の台が交わらないとき $Z_2$ と $Z_2(F_f+F_g,F_f+F_g)$ を求めよ。

<!-- solution-start -->
**詳細解答**

全点で少なくとも一方が零なので $fg=0$、従って $Z_2(F_f,F_g)=0$。対称双線形性で四項に展開すると二つの混合項が消え、$cF_{f^2}+cF_{g^2}$ となる。これは [処方変更写像](#def-mqfc42-prescription-map) の局所性の具体例である。
<!-- solution-end -->

### 演習 MQFC42-A3：デルタの微分と多項式
- Level: A

$d=4,s=6$ とし、延長差が $c_0\delta+c_1\partial_1\delta+c_2\partial_1^2\delta$ である。Fourier変換を求め、許される階数を確認せよ。

<!-- solution-start -->
**詳細解答**

[局所反項の自由度](../MQFC34/index.md#thm-mqfc34-counterterm-freedom) より最高階は $\lfloor6-4\rfloor=2$。微分のFourier変換は原点で指数関数を微分し、分布微分の符号を掛ける。零階は1、一階は $ip_1$、二階は $(ip_1)^2=-p_1^2$ なので $c_0+ic_1p_1-c_2p_1^2$。最高次数は2以下で条件を満たす。
<!-- solution-end -->

### 演習 MQFC42-A4：減算点の変更
- Level: A

第4節の積分模型で $a=1,b=4$ とするとき $A_b(2)-A_a(2)$ を求めよ。

<!-- solution-start -->
**詳細解答**

$A_4(2)=\log(4/2)=\log2$、$A_1(2)=\log(1/2)=-\log2$ だから差は $2\log2=\log4$。一般の $p>0$ でも $\log(4/p)-\log(1/p)=\log4$ となり外部運動量に依存しない。
<!-- solution-end -->

### 演習 MQFC42-B1：二次補正が三次に現れる理由
- Level: B

$\Delta T_2(F,F)=-iB$、$\Delta T_3(F^3)=-3iT_2(F,B)+K$ とする。$Z_2,Z_3$ を求めよ。

<!-- solution-start -->
**詳細解答**

[処方変更の低次係数](#thm-mqfc42-low-order-change) の二次式から $Z_2=i(-iB)=B$。三次式は

$$
\begin{aligned}
Z_3&=-(-3iT_2(F,B)+K)+3T_2(F,-iB)\\
&=3iT_2(F,B)-K-3iT_2(F,B)=-K.
\end{aligned}
$$

従って二次補正の三次への寄与は消え、$K$ が全対角に支持を持つなら新しい補正も局所的である。
<!-- solution-end -->

### 演習 MQFC42-B2：逆写像の直接検算
- Level: B

一変数の形式写像 $z(x)=x+ax^2/2+bx^3/6+O(x^4)$ の逆を三次まで求めよ。

<!-- solution-start -->
**詳細解答**

$w(x)=x+ux^2/2+vx^3/6+O(x^4)$ とする。$w^2=x^2+ux^3+O(x^4)$、$w^3=x^3+O(x^4)$ なので

$$
z(w(x))=x+\frac{u+a}{2}x^2
+\frac{v+3au+b}{6}x^3+O(x^4).
$$

二次と三次を零にするには $u=-a$、$v=-3au-b=3a^2-b$ である。[局所処方変更写像の合成と逆](#thm-mqfc42-prescription-group) の式の一変数版となる。
<!-- solution-end -->

### 演習 MQFC42-B3：一次Taylor減算
- Level: B

$A_\Lambda(p)=\Lambda p+\log\Lambda+p^2$（$\Lambda>0,\ p\in\mathbb R$）を次数1で $a$ において減算し、$b$ での減算との差を求めよ。

<!-- solution-start -->
**詳細解答**

$A'_\Lambda(a)=\Lambda+2a$。従って [運動量Taylor減算](#def-mqfc42-taylor-subtraction) は

$$
P_a^1A_\Lambda=\Lambda a+\log\Lambda+a^2+(\Lambda+2a)(p-a).
$$

元の式から引けば $\Lambda p$ と $\log\Lambda$ が消え、$p^2-2ap+a^2=(p-a)^2$ が残る。$b$ での値との差は

$$
(p-b)^2-(p-a)^2=2(a-b)p+b^2-a^2.
$$

次数2の項が消えて一次以下となり、[減算点変更の多項式性](#thm-mqfc42-subtraction-polynomial) と一致する。
<!-- solution-end -->

### 演習 MQFC42-C1：三処方と相対S行列
- Level: C

$\widetilde S=S\circ Z$、$\widehat S=\widetilde S\circ Y$ とする。合成 $H=Z\circ Y$ の二次・三次係数を求め、$\widetilde S_X(U)$ を元の相対S行列で表せ。観測の一次応答も求めよ。

<!-- solution-start -->
**詳細解答**

$Y(\lambda F)=\lambda F+\lambda^2Y_2(F,F)/2+\lambda^3Y_3(F^3)/6+O(\lambda^4)$ を $Z$ に代入する。二次は $Y$ の二次と $Z$ の二次の和。三次は $Y$ の三次、$Z$ の三次、そして $Z_2$ の二入力の一方に $Y_2/2$ を入れた項である。従って

$$
H_2=Y_2+Z_2,
$$

$$
H_3(F^3)=Y_3(F^3)+Z_3(F^3)+3Z_2(F,Y_2(F,F)).
$$

係数3は $3!\cdot(1/2!)\cdot2\cdot(1/2!)=3$ から出る。[局所処方変更写像の合成と逆](#thm-mqfc42-prescription-group) により $H$ は局所的である。

次に [相対S行列](../MQFC41/index.md#def-mqfc41-relative-s) の定義を用いると

$$
\begin{aligned}
\widetilde S_X(U)
&=\widetilde S(X)^{-1}\star\widetilde S(X+U)\\
&=S(Z(X))^{-1}\star S(Z(X+U))\\
&=S_{Z(X)}(Z(X+U)-Z(X)).
\end{aligned}
$$

$U=tF$ とし、$Z(X+tF)-Z(X)=tZ'(X)F+O(t^2)$ と書く。ここで $Z'(X)F$ は形式変数 $t$ の一次係数であり、

$$
Z'(X)F=F+\sum_{n\ge2}\frac{Z_n(X^{n-1},F)}{(n-1)!}
$$

となる。$n$ 個の位置のどこに $F$ を入れるかが $n$ 通りあるためである。[Bogoliubov公式](../MQFC41/index.md#def-mqfc41-bogoliubov) で $1/i$ を掛けた一次係数を取ると

$$
\widetilde R_X(F)=R_{Z(X)}(Z'(X)F).
$$

背景だけでなく観測挿入も再定義される。線形部が恒等でも $X\ne0$ のとき $Z'(X)F$ が $F$ と一致するとは限らない。
<!-- solution-end -->

## 参考文献

- K. Rejzner, *Perturbative Algebraic Quantum Field Theory*, Springer, 2016.
- M. Dütsch, *From Classical Field Theory to Perturbative Quantum Field Theory*, Birkhäuser, 2019.
- W. Zimmermann, “Convergence of Bogoliubov's method of renormalization in momentum space,” Communications in Mathematical Physics 15 (1969), 208–234.
