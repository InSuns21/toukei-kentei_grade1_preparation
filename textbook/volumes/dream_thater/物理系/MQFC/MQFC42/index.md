# MQFC42 くりこみ処方の変更

前提講座：[MQFC34 局所反項の自由度](../MQFC34/index.md)、[MQFC35 Feynman核の対角延長](../MQFC35/index.md)、[MQFC36 多点の部分対角](../MQFC36/index.md)、[MQFC40 Epstein–Glaser帰納構成](../MQFC40/index.md)、[MQFC41 局所S行列](../MQFC41/index.md)。

同じ原点外の分布でも、原点にデルタ分布を加えることで別の延長を作れた。時間順序積の延長を変えると局所S行列も変わるが、各次数の差を独立に足してよいわけではない。二次の反項は三次以降の部分衝突にも現れるからである。本講では、処方の変更を入力する相互作用の非線形な再定義として組み直す。

## 1. 入力の再定義

時空は Minkowski 時空 $M=\mathbb R^{1+3}$、計量は $(-,+,+,+)$ とする。MQFC41と同じく、局所Wick多項式を滑らかなコンパクト支持の試験関数で積分したものの有限和を入力の実ベクトル空間 $\mathcal L$ とし、その複素化も用いる。

$\hbar$ の形式係数を持つ場合は、これらの空間を $\hbar$ の形式級数へ係数ごとに拡張して扱う。場の微分を含む局所多項式も許す。

値域 $\mathcal A$ は [自由場のスター積](../MQFC38/index.md#def-mqfc38-star) を備えた単位的結合代数とし、入力の複素化はその部分空間とみなす。積を $\star$、随伴を $*$ と書き、

$$
(a\star b)^*=b^*\star a^*
$$

とする。実入力は自己随伴とする。

[結合定数の形式展開](../MQFC31/index.md#def-mqfc31-formal-coupling) と同じく、挿入の個数を数える可換形式変数 $\lambda,t_1,\ldots,t_n$ は $\hbar$ や時空の時刻と区別する。$X$ は定数項が零の局所入力の形式級数であり、等号は全係数の一致を表す。

$[\lambda^k]$ は $\lambda^k$ の係数を取り出す記号、$O(\lambda^k)$ は次数 $k$ 以上の項の総称である。

多重線形写像 $B_n$ に同じ入力を $n$ 個入れるときは

$$
B_n(X^n)=B_n(X,\ldots,X)
$$

と略記する。ここで $X^n$ は代数内の積ではない。

二つの処方 $T_n,\widetilde T_n$ はともに対称多重線形で $T_0=\widetilde T_0=1,\ T_1=\widetilde T_1=\mathrm{id}$ とする。両者は [時間順序積の因果帰納条件](../MQFC40/index.md#def-mqfc40-causal-recursion) を満たす。[局所S行列](../MQFC41/index.md#def-mqfc41-local-s) をそれぞれ $S,\widetilde S$ と書く。規格化は

$$
S(X)=1+iX+\sum_{n\ge2}\frac{i^n}{n!}T_n(X^n)
$$

であり、$\widetilde S$ も同じ規格化である。

ここでは [因果帰納の全対角延長](../MQFC40/index.md#thm-mqfc40-diagonal-extension) と同じ並進不変な数値分布係数と局所Wick多項式の設定で議論する。入力の台は、積分に使う試験関数の台の和で評価する。[多点の部分対角](../MQFC36/index.md#def-mqfc36-partial-diagonal) のうち、すべての挿入点が一致する集合を全対角と呼ぶ。分布の支持がその集合に含まれるとは、そこを避ける台の試験関数への作用が零であることをいう。

出力位置を $z$、各入力の位置を $x_j$ とする。固定したWick多項式の種類ごとに、局所密度の分布核は $x_1=\cdots=x_n=z$ に支持を持つ有限階のデルタ微分の和で表し、試験関数に作用させてから $z$ で積分する。

ここで [多重指数](../../../解析系/GPDE/GPDE2/index.md#def-gpde2-multi-index) $\alpha$ は各座標の非負整数の微分回数、$|\alpha|$ はその総和を表す。例えば核の一項は、入力の試験関数 $f,g$ に対し

$$
\begin{aligned}
&\langle \partial_{x_1}^{\alpha}\delta(x_1-z)
\delta(x_2-z),f(x_1)g(x_2)\rangle\\
&\qquad=(-1)^{|\alpha|}(\partial^\alpha f)(z)g(z)
\end{aligned}
$$

と作用する。これは [分布微分](../../../解析系/GPDE/GPDE2/index.md#def-gpde2-distributional-derivative) の定義による。従って局所係数は、同一点での有限個の試験関数の微分の積として計算できる。

因果分解に必要な分布積・制限は存在し、結合性と制限との両立を満たすと仮定する。また、下位補正を代入した後に全対角に残る数値分布係数は、相対座標で [原点支持分布の構造](../MQFC34/index.md#thm-mqfc34-point-structure) を適用でき、上記の形の局所密度として表せて、その積分が $\mathcal L$ の複素化に属すると仮定する。この局所閉性は次数ごとに必要であり、入力空間を特定の有限個の結合だけに制限しない。

二次の差を $S$ の一次項に吸収するには、入力 $X=\lambda F$ を $\lambda F+\lambda^2 B(F,F)/2$ に置き換えればよい。一般に、補正を挿入数ごとに並べた写像を考える。この非線形な入力変換で、異なる二処方を結び付けたい。多重線形とは他の入力を固定すると各入力について線形であること、対称とは入力を置換しても値が変わらないことをいう。

<a id="def-mqfc42-prescription-map"></a>

<!-- formal-statement-start -->
> **定義（Stückelberg–Petermann型処方変更写像）**
> 局所入力空間 $\mathcal L$ 上の形式写像

$$
Z(X)=X+\sum_{n\ge2}\frac{1}{n!}Z_n(X,\ldots,X)
$$

> で、各 $Z_n$ が局所入力空間の複素化に値を取る対称多重線形写像であり、その局所密度が上記の有限階の全対角支持の分布核で表されるものを考える。入力 $X$ は正次数の形式変数を含む。$Z(0)=0$、線形部は恒等写像である。二つの局所S行列について $\widetilde S=S\circ Z$ が成立するとき、$Z$ をその処方変更写像と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc42-prescription-map -->
### 直接例：二次の局所質量項

**定義の確認**。局所Wick多項式 $:\!\phi^2\!:/2$ を固定し、$F_f=\int_M f(x):\!\phi(x)^2\!:/2\,d^4x$ の族を取り、実数 $c$ に対して

$$
Z_2(F_f,F_g)=cF_{fg},\qquad Z_n=0\ (n\ge3)
$$

とする。この例では入力空間をこの族の線形空間とする。積 $fg$ は両入力に線形、交換しても不変で、滑らかなコンパクト支持を持つ。出力位置を $z$ とすると、固定したWick多項式に掛かる数値核は $c\delta(x-z)\delta(y-z)$ である。[Dirac のデルタ超関数](../../../解析系/GPDE/GPDE1/index.md#def-gpde1-dirac) の作用を二つの入力に順に使うと

$$
c\int_M\int_M
\delta(x-z)\delta(y-z)f(x)g(y)\,d^4x\,d^4y
=cf(z)g(z)
$$

となる（デルタ積分は分布の作用を表す）。これを $:\!\phi(z)^2\!:/2$ に掛けて積分すると $cF_{fg}$ に戻る。$x=y=z$ 以外では核の作用が零なので局所性も満たす。また、

$$
Z(\lambda F_f)=\lambda F_f+\frac{c\lambda^2}{2}F_{f^2}
$$

なので定数項は零、一次項は元の入力である。この $Z$ は局所写像の例である。

実際にこの入力族上で $\widetilde S=S\circ Z$ と定めれば、その一次部は $iX$ である。因果順序を満たす二組の入力 $A,B$ の台は互いに素なので

$$
Z_2(A,B)=0,\qquad Z(A+B)=Z(A)+Z(B).
$$

両補正の台は元の台に含まれるから、[局所S行列の因果因子化](../MQFC41/index.md#thm-mqfc41-s-factorization) を適用して

$$
\widetilde S(A+B)=S(Z(A))\star S(Z(B))
=\widetilde S(A)\star\widetilde S(B)
$$

を得る。この二処方に対しては比較の等式も成立する。別途指定された二処方を結ぶ場合には、その等式を確かめる必要がある。
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

次数 $n-1$ まで一致させたとき、[全対角外の因果分割被覆](../MQFC31/index.md#thm-mqfc31-causal-cover) と [局所S行列の因果因子化](../MQFC41/index.md#thm-mqfc41-s-factorization) により全対角外の $n$ 次差も消える。残る差は局所入力として一次項に吸収できる。一次項が $iX$ なので補正は一意である。

<!-- proof-start -->
### 証明

$Z^{<n}(X)=X+\sum_{2\le k<n}Z_k(X^k)/k!$ とし、$S(Z^{<n}(X))$ と $\widetilde S(X)$ が次数 $n-1$ まで一致すると仮定する。$n=2$ では $Z^{<2}(X)=X$ であり、仮定は一次積の一致から成立する。

$n$ 個の入力 $F_j$ に独立な形式変数 $t_j$ を付けて $X=\sum_{j=1}^n t_jF_j$ とする。差の向きを固定して

$$
D_n(F_1,\ldots,F_n)
=[t_1\cdots t_n]\bigl(\widetilde S(X)-S(Z^{<n}(X))\bigr)
$$

と書く。各 $t_j$ を一度ずつ選ぶので各 $F_j$ について線形であり、添字と形式変数を同時に置換しても係数は変わらない。従って対称多重線形である。

[全対角外の因果分割被覆](../MQFC31/index.md#thm-mqfc31-causal-cover) により、全対角外の配置は次の開集合のいずれかに属する。非空な真部分集合 $I\subset\{1,\ldots,n\}$、$J=I^c$ に対し

$$
C_I=\{(x_1,\ldots,x_n):x_i\not\preceq x_j\ (i\in I,\ j\in J)\}
$$

とする。$x\preceq y$ は $y$ が $x$ の因果的未来にあること（同一点を含む）である。この近傍では二組の位置は互いに異なる。各配置の周囲に小さな積近傍を取れば、その中に台を持つ試験関数についても同じ因果順序が成立する。

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

混合係数は、第1因子の $[\prod_{j\in I}t_j]$ と第2因子の $[\prod_{j\in J}t_j]$ のスター積である。帰納仮定による置換は次のようになる。

$$
\begin{aligned}
&[\textstyle\prod_{j\in I}t_j]S(Z^{<n}(X_I))
\star[\textstyle\prod_{j\in J}t_j]S(Z^{<n}(X_J))\\
&=[\textstyle\prod_{j\in I}t_j]\widetilde S(X_I)
\star[\textstyle\prod_{j\in J}t_j]\widetilde S(X_J).
\end{aligned}
$$

$\widetilde S$ にも因果因子化を使うと積は $\widetilde S(X)$ の同じ混合係数に一致する。従って各積近傍内で分布係数の制限が一致する。

ここでは因果帰納条件を分布核の制限に対する等式として仮定しているので、全ての積近傍上で $D_n$ の制限は零である。[有限開被覆上の分布の貼り合わせ](../MQFC36/index.md#thm-mqfc36-gluing) と同じ分布の局所性（コンパクトな試験関数の台には有限個の近傍で十分）により $D_n|_{C_I}=0$ となる。全対角外をこの開集合で覆えるので、$D_n$ は全対角に支持を持つ。

[原点支持分布の構造](../MQFC34/index.md#thm-mqfc34-point-structure) を $4(n-1)$ 次元の相対座標に適用し、第1節の局所閉性によって $D_n$ は局所密度で表される入力の複素化に値を取る。$Z_n=D_n/i$ と置く。

$S$ の一次項 $iX$ に $Z_n(X^n)/n!$ を代入すると、混合係数には $n!$ 通りの入力の置換が現れ、対称性で同じ値になる。従って増分は

$$
\frac{i}{n!}\,n!Z_n(F_1,\ldots,F_n)=D_n
$$

である。二次以上の項にこの補正を一度入れると少なくとも次数 $n+1$ となるため、次数 $n$ の他の項は変わらない。これで次数 $n$ の差も消える。

一意性は、二つの候補が最初に異なる次数 $n$ を考えると、S行列の差のその次数が $i(Z_n-Z'_n)$ になることから従う。これが零なら $Z_n=Z'_n$ となり矛盾する。

実性については、$Z^{<n}$ が実入力で実であると帰納的に仮定する。

$$
A=S(Z^{<n}(\lambda F)),\qquad B=\widetilde S(\lambda F)
$$

と置くと、実の $\lambda,F$ に対して両者とも [挿入数ごとのユニタリティ条件](../MQFC40/index.md#def-mqfc40-order-unitarity) によりユニタリティを満たす。この条件は独立な挿入変数の混合係数で書かれているが、同じ入力を $n$ 個取ればその係数は $\lambda^n$ の係数の $n!$ 倍なので、単一の形式変数でも各次数の条件が成り立つ。実入力を係数に持つ正次数の形式級数を代入しても係数ごとの恒等式は保たれる。最初の差を

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
> [局所S行列の処方比較](#thm-mqfc42-prescription-comparison) の条件と $S(X)=\sum_{n\ge0}i^n T_n(X^n)/n!$ の規約のもとで、任意の局所入力 $F$ に対し

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

ここで $O(\lambda^k)$ は形式次数 $k$ 以上を表す。$iZ$ はそのまま代入する。二次積には $Z=Z(\lambda F)$ を二つ入れる。双線形性と対称性から

$$
T_2(Z,Z)=\lambda^2 T_2(F,F)
+\lambda^3 T_2(F,B)+O(\lambda^4).
$$

三次の係数は $T_2(F,B)/2+T_2(B,F)/2=T_2(F,B)$ である。S行列ではこれに $-1/2$ を掛ける。$-iT_3(Z,Z,Z)/6$ の三次は $-i\lambda^3T_3(F,F,F)/6$ である。従って二次の一致は

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

二次の補正だけを考えると、例えば $\Delta T_2(F_f,F_g)=-icF_{fg}$ なら $Z_2=cF_{fg}$ となる。実 $c$ に対し実入力を保つ。[局所S行列の処方比較](#thm-mqfc42-prescription-comparison) により、三次では $\Delta T_3$ 自体が全対角に支持を持つとは限らず、二次の補正から来る部分対角の寄与を除いた $Z_3$ が局所的になる。

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

合成の次数 $n$ は、$k$ 個の正次数入力の次数の和が $n$ となる項だけを集めればよく、有限和である。混合係数では各内側の係数が組内の位置を同一点に集め、外側の係数はその全組の出力位置をさらに同一点に集める。第1節の局所密度の表示では、内側の出力は同一点における有限個の試験関数の微分を掛け合わせた式の和である。外側がそれを微分しても同じ種類の式になる。例えば、滑らかな実試験関数について第 $j$ 座標以外を固定し、[積の微分公式](../../../基礎科目/RA/RA3/index.md#prop-ra3-product-rule) を第 $j$ 座標の一変数関数に適用すると

$$
\begin{aligned}
\partial_{z_j}(f(z)g(z))h(z)
={}&(\partial_{z_j}f)(z)g(z)h(z)\\
&+f(z)(\partial_{z_j}g)(z)h(z).
\end{aligned}
$$

従って再び有限階の全対角支持の核で表せ、合成は局所的である。線形部は恒等写像同士の合成で恒等。形式合成は有限次数ごとに通常の代入の結合律を満たす。

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

例えば [二次の局所質量項](#def-mqfc42-prescription-map) の $Z_2(F_f,F_g)=cF_{fg}$、$Z_3=0$ の場合、$W_2(F_f,F_f)=-cF_{f^2}$、$W_3(F_f^3)=3c^2F_{f^3}$ である。二次補正を単に符号反転しただけでは三次に残差が出る。次の講義では尺度の変更をこの合成の考え方で調べる。

## 4. 運動量空間の減算との比較

[局所反項の自由度](../MQFC34/index.md#thm-mqfc34-counterterm-freedom) により、相対座標 $z\in\mathbb R^d$ で有限のスケーリング次数 $s\ge d$ を保つ延長の差は

$$
\sum_{|\alpha|\le \lfloor s-d\rfloor}c_\alpha\partial^\alpha\delta
$$

となる。運動量 $p$ は $z$ に共役な変数であり、$p\cdot z=\sum_{j=1}^d p_jz_j$ は座標の双対性による組合せ（Lorentz計量による内積ではない）を表す。Fourier変換は $\widehat t(p)=\int e^{-ip\cdot z}t(z)\,dz$ の規約を用いる。ここで扱う延長差はコンパクト支持分布なので、指数関数に原点近傍で1となる滑らかなコンパクト支持関数を掛けて作用させればよく、原点での微分評価はその選択に依存しない。

[多重指数](../../../解析系/GPDE/GPDE2/index.md#def-gpde2-multi-index) $\alpha=(\alpha_1,\ldots,\alpha_d)$ は各座標の非負整数の微分回数を表す。以下の略記を用いる。

$$
|\alpha|=\sum_j\alpha_j,\quad
\alpha!=\prod_j\alpha_j!,\quad
p^\alpha=\prod_jp_j^{\alpha_j}.
$$

[分布微分](../../../解析系/GPDE/GPDE2/index.md#def-gpde2-distributional-derivative) の定義を用い、$p$ を固定して $z$ で微分すると

$$
\widehat{\partial^\alpha\delta}(p)
=(-1)^{|\alpha|}\partial_z^\alpha e^{-ip\cdot z}|_{z=0}
=(ip)^\alpha.
$$

従って局所的な延長差は運動量の多項式である。例えば [二線核の減算延長とcutoff反項](../MQFC35/index.md#thm-mqfc35-fish-extension) の四次元核は $s=4$ なので定数だけ、$s=6$ の核なら二次までが候補になる。対称性などは別に課す。

運動量空間では、BPHZ（Bogoliubov–Parasiuk–Hepp–Zimmermann）法が発散するグラフの振幅のTaylor多項式を減算する。外部運動量に関するTaylor展開の有限部分を引く操作を定義しよう。正則化パラメータ $\Lambda$ は有限値で振幅が定義されるように導入した量であり、以下では $\Lambda\to\infty$ で正則化を除く場合を考える。$\partial^\alpha A_\Lambda(a)$ は $\Lambda$ を固定し $p$ で偏微分してから $p=a$ を代入する意味である。ここでは発散する真部分グラフを持たない場合の外部運動量の減算だけを扱う。一般のグラフでは部分グラフごとの減算が必要になる。

<a id="def-mqfc42-taylor-subtraction"></a>

<!-- formal-statement-start -->
> **定義（運動量Taylor減算）**
> 開集合 $\Omega\subset\mathbb R^d$ の点 $a$ と非負整数 $m$ に対し、$A_\Lambda$ を $\Omega$ 上の $m$ 回連続微分可能な正則化済み振幅とする。次数 $m$ のTaylor多項式を

$$
P_a^m A_\Lambda(p)=
\sum_{|\alpha|\le m}
\frac{\partial^\alpha A_\Lambda(a)}{\alpha!}(p-a)^\alpha
$$

> とする。点 $a$ での減算振幅は $A_{\Lambda,a}=(1-P_a^m)A_\Lambda$ と定める。$1$ は関数に対する恒等作用素を表す。
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
> [運動量Taylor減算](#def-mqfc42-taylor-subtraction) の設定で $a,b\in\Omega$ とし、$\Omega$ は非空開集合とする。$\Lambda\to\infty$ のとき各点で有限値に収束する、すなわち
>
$$
A_{\Lambda,a}(p)\to A_a(p),\qquad
A_{\Lambda,b}(p)\to A_b(p)
\quad(p\in\Omega)
$$
>
> と仮定する。このとき $A_b-A_a$ は次数 $m$ 以下の多項式の $\Omega$ への制限である。
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

具体的に $|\alpha|\le m$ を満たす多重指数の個数を $N$ とし、単項式 $p^\alpha$ を固定した順序で並べる。上で選んだ $N$ 個の点評価を $q_1,\ldots,q_N\in\Omega$ と書く。差の多項式を $Q_\Lambda=P_a^m A_\Lambda-P_b^m A_\Lambda$、その係数を $c_{\Lambda,\alpha}$ とすると、

$$
Q_\Lambda(p)=\sum_{|\alpha|\le m}c_{\Lambda,\alpha}p^\alpha,
\qquad
Q_\Lambda(q_j)=\sum_{|\alpha|\le m}q_j^\alpha c_{\Lambda,\alpha}.
$$

従って係数列を列ベクトル $c_\Lambda$、点評価の列を $v_\Lambda$ とすれば、$N\times N$ 行列 $E$ によって

$$
v_\Lambda=Ec_\Lambda,\qquad E_{j,\alpha}=q_j^\alpha
$$

と表される。$Ec=0$ なら全ての基底点評価が零で、対応する多項式は零である。単項式は線形独立なので $c=0$。よって正方行列 $E$ は可逆である。

仮定から $v_{\Lambda,j}\to A_b(q_j)-A_a(q_j)$ である。$E$ は $\Lambda$ に依存しないので、$v=\lim_{\Lambda\to\infty}v_\Lambda$ とすれば

$$
c_{\Lambda,\alpha}
=\sum_{j=1}^N(E^{-1})_{\alpha,j}v_{\Lambda,j}
\longrightarrow (E^{-1}v)_\alpha.
$$

有限和の各項が収束するため、各 $p$ で $Q_\Lambda(p)$ は係数 $E^{-1}v$ を持つ次数 $m$ 以下の多項式に収束する。同じ点での極限は仮定から $A_b(p)-A_a(p)$ でもある。極限の一意性で結論を得る。
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

$Z_2(F_f,F_g)=cF_{fg}$ とする。$f,g$ の台が交わらないとき $Z_2(F_f,F_g)$ と $Z_2(F_f+F_g,F_f+F_g)$ を求めよ。

<!-- solution-start -->
**詳細解答**

全点で少なくとも一方が零なので $fg=0$、従って $Z_2(F_f,F_g)=0$。対称双線形性で展開すると

$$
\begin{aligned}
Z_2(F_f+F_g,F_f+F_g)
={}&Z_2(F_f,F_f)+2Z_2(F_f,F_g)\\
&+Z_2(F_g,F_g)\\
={}&cF_{f^2}+cF_{g^2}.
\end{aligned}
$$

二つの混合項が消えた。これは [処方変更写像](#def-mqfc42-prescription-map) の局所性の具体例である。
<!-- solution-end -->

### 演習 MQFC42-A3：デルタの微分と多項式
- Level: A

$d=4,s=6$ とし、延長差が $c_0\delta+c_1\partial_1\delta+c_2\partial_1^2\delta$ である。Fourier変換を求め、許される階数を確認せよ。

<!-- solution-start -->
**詳細解答**

[局所反項の自由度](../MQFC34/index.md#thm-mqfc34-counterterm-freedom) より最高階は $\lfloor6-4\rfloor=2$。第4節と同じく [分布微分](../../../解析系/GPDE/GPDE2/index.md#def-gpde2-distributional-derivative) を用い、$p$ を固定して $z_1$ で指数関数を微分し、分布微分の符号を掛ける。零階は1、一階は $ip_1$、二階は $(ip_1)^2=-p_1^2$ なので $c_0+ic_1p_1-c_2p_1^2$。最高次数は2以下で条件を満たす。
<!-- solution-end -->

### 演習 MQFC42-A4：減算点の変更
- Level: A

[運動量Taylor減算](#def-mqfc42-taylor-subtraction) の直接例の積分模型で $a=1,b=4$ とするとき $A_b(2)-A_a(2)$ を求めよ。

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

プライムは $\Lambda$ を固定した $p$ の常微分を表す。従って

$$
A'_\Lambda(a)=\left.\frac{d}{dp}A_\Lambda(p)\right|_{p=a}
=\Lambda+2a.
$$

従って [運動量Taylor減算](#def-mqfc42-taylor-subtraction) は

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

$U=tF$ とする。$X,F$ を固定し、$t$ は観測挿入を数える形式変数とする（時空の時刻ではない）。$O(t^2)$ は $t$ の次数2以上を表す。$Z'(X)F$ は写像 $Z$ の $X$ における方向 $F$ の形式微分、すなわち

$$
Z'(X)F=[t]Z(X+tF)
=\left.\frac{d}{dt}Z(X+tF)\right|_{t=0}
$$

である。従って $Z(X+tF)-Z(X)=tZ'(X)F+O(t^2)$ と書ける。多重線形性から

$$
Z'(X)F=F+\sum_{n\ge2}\frac{Z_n(X^{n-1},F)}{(n-1)!}
$$

となる。$n$ 個の位置のどこに $F$ を入れるかが $n$ 通りあるためである。[Bogoliubov公式](../MQFC41/index.md#def-mqfc41-bogoliubov) で $1/i$ を掛けた一次係数を取る。相対S行列の挿入に関する展開では、挿入が二回以上現れる項は $t^2$ 以上であり、$Z(X+tF)-Z(X)$ の $O(t^2)$ 部分も一次係数に寄与しない。従って

$$
\widetilde R_X(F)=R_{Z(X)}(Z'(X)F).
$$

背景だけでなく観測挿入も再定義される。線形部が恒等でも $X\ne0$ のとき $Z'(X)F$ が $F$ と一致するとは限らない。
<!-- solution-end -->

## 参考文献

- K. Rejzner, *Perturbative Algebraic Quantum Field Theory*, Springer, 2016.
- M. Dütsch, *From Classical Field Theory to Perturbative Quantum Field Theory*, Birkhäuser, 2019.
- W. Zimmermann, “Convergence of Bogoliubov's method of renormalization in momentum space,” Communications in Mathematical Physics 15 (1969), 208–234.
