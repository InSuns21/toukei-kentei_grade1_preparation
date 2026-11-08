# SQC3 作図可能数の必要十分条件

[SQC2 の交点計算](../SQC2/index.md#lem-sqc2-intersections)では、一手の作図から生まれる座標は高々一つの平方根を追加すれば表せると分かりました。また、[四則演算](../SQC2/index.md#prop-sqc2-field-operations)と[非負平方根](../SQC2/index.md#prop-sqc2-positive-square-root)は逆に有限作図で実現できます。では、何段も操作を重ねて得られる実数を、作図手順を一つずつ描かずに判定できるでしょうか。

結論は「**実二次拡大列に入ること**」が必要十分条件だというものです。ただし「最小多項式の次数が $2$ の冪」という判定は、その必要条件にすぎません。本章ではこの二つを区別し、次数 $4$ なのに作図できない実数まで確かめます。

以下で「作図可能」は、単位長を固定し、[有限回の定規とコンパスの操作](../SQC1/index.md#def-sqc1-finite-procedure)で横軸上の点 $(\alpha,0)$ が得られるという意味です。

<!-- definition-example-audit: strict -->

---

## 1. 何が作図できるかを体の列で記述する

体 $K$ の元だけを座標に持つ点が既知なら、一手の交点の座標は $K$ または $K(\sqrt d)$（$d\in K$、$d\ge0$）に属します。作図は有限回ですから、最終座標はそのような拡大を有限段だけ重ねた体の中にあります。

反対方向も重要です。$K$ の元がすべて作図可能で、$d\in K$ が非負なら、[平方根の有限作図](../SQC2/index.md#prop-sqc2-positive-square-root)により $\sqrt d$ を作れます。続いて[四則演算の有限作図](../SQC2/index.md#prop-sqc2-field-operations)を使えば、$K(\sqrt d)$ の任意の元まで得られます。つまり、一手ごとの**幾何の制限**と**代数的な実現**がかみ合っています。

ここで使う[実二次拡大列の定義](../../../代数系/FLD/FLD5/index.md#def-fld5-quadratic-tower)は、$\mathbb R$ の部分体からなる有限列

$$
\mathbb Q=K_0\subset K_1\subset\cdots\subset K_r\subset\mathbb R,
\qquad [K_i:K_{i-1}]\le2
$$

です。$r=0$ も許し、次数 $1$ の段階は省いてかまいません。

<a id="prop-sqc3-tower-construction"></a>

<!-- formal-statement-start -->
> **命題（実二次拡大列の段階的な作図）**  
> 実二次拡大列 $\mathbb Q=K_0\subset\cdots\subset K_r\subset\mathbb R$ の各段について、$K_{i-1}$ の元がすべて作図可能なら、$K_i$ の元もすべて作図可能である。したがって、任意の $\alpha\in K_r$ は作図可能である。
<!-- formal-statement-end -->

### 証明の見取り図

次数 $2$ の実拡大は、実数の正の平方根を一つ加える形に直せます。分母に現れる $2$ は非零なので四則演算が使えます。次数 $1$ の段階では追加作図は要りません。

<!-- proof-start -->
### 証明

$[K_i:K_{i-1}]=1$ なら $K_i=K_{i-1}$ であり、主張はそのままです。次数が $2$ なら $\beta\in K_i\setminus K_{i-1}$ を取り、$K_{i-1}$ 上の[代数的元の最小多項式](../../../代数系/FLD/FLD1/index.md#def-fld1-minimal-polynomial)を $X^2+bX+c$ と書きます。$\beta\in\mathbb R$ なので

$$
(2\beta+b)^2=b^2-4c=:d.
$$

ここで $b,c,d\in K_{i-1}$ です。$d=0$ なら $\beta=-b/2\in K_{i-1}$ で矛盾するため、$d>0$ です。ゆえに

$$
\beta=\frac{-b\pm\sqrt d}{2},
\qquad
K_i=K_{i-1}(\sqrt d).
$$

$d$ は既知体の元なので、[非負平方根の有限作図](../SQC2/index.md#prop-sqc2-positive-square-root)で $\sqrt d$ が得られます。ここでは拡大次数が $2$ であるため $\sqrt d\notin K_{i-1}$ です。[単純代数拡大の表示](../../../代数系/FLD/FLD1/index.md#thm-fld1-simple-algebraic-quotient)を $X^2-d$ に適用すると、$X^2=d$ で高次の項を減らせるので、$K_{i-1}(\sqrt d)$ の各元は

$$
u+v\sqrt d,\qquad u,v\in K_{i-1}
$$

の形に書けます。したがって[四則演算の有限作図](../SQC2/index.md#prop-sqc2-field-operations)で各元を作れます。初段の有理数はすべて作図できるので、有限回の帰納法で結論が従います。
<!-- proof-end -->

これは必要十分条件の一方向を具体化したものです。もう一方向を含む一般定理と完全証明は、既習の[FLD5「作図可能性と実二次拡大列」](../../../代数系/FLD/FLD5/index.md#thm-fld5-constructible-quadratic-tower)にあります。定理を使う際は、次のように**二つの問い**を区別してください。

1. 作図できると仮定したら、どんな体の列に入る必要があるか。
2. 具体的な体の列を実際に提示できたら、どう有限作図へ戻るか。

### 1.1 入れ子の平方根を塔で読む

例えば

$$
\alpha=\sqrt{1+\sqrt2}
$$

を考えます。$1+\sqrt2>0$ なので実平方根が存在します。次の列を提示できます。

$$
K_0=\mathbb Q,\quad
K_1=\mathbb Q(\sqrt2),\quad
K_2=K_1(\sqrt{1+\sqrt2}).
$$

$\sqrt2$ は $X^2-2$ の根、$\alpha$ は $K_1$ 係数の $X^2-(1+\sqrt2)$ の根なので、各段の次数は高々 $2$ です。[SQC2 の平方根作図](../SQC2/index.md#prop-sqc2-positive-square-root)を二回行えば、$\sqrt2$、次に $\alpha$ を得られます。

この $K_0,K_1,K_2$ は**目標数 $\alpha$ を含む列**です。半円などの実際の作図に使う補助点の全座標までこの列に含まれるとは限りません。全補助点を追跡するときは、各交点に[SQC2 の高々二次性](../SQC2/index.md#lem-sqc2-intersections)を適用して必要な段階を増やします。目標数の作図可能性を判定するには、上の包含で十分です。

実は二段目の次数も $2$ です。もし $1+\sqrt2=(a+b\sqrt2)^2$（$a,b\in\mathbb Q$）なら、右辺を展開し、$1,\sqrt2$ の係数を比較して

$$
a^2+2b^2=1,\qquad 2ab=1
$$

を得ます。この二式から $1-\sqrt2=(a-b\sqrt2)^2$ も従います。そこで両式の積を取ると

$$
(1+\sqrt2)(1-\sqrt2)=-1
=(a^2-2b^2)^2\ge0
$$

となって矛盾します。したがって $\alpha\notin K_1$ で、$[K_2:K_1]=2$ です。また $\sqrt2=\alpha^2-1$ より $K_1\subset\mathbb Q(\alpha)$、従って

$$
\mathbb Q(\alpha)=K_2,\qquad
[\mathbb Q(\alpha):\mathbb Q]=2\cdot2=4.
$$

「次数 $4$」は作図できることの**原因**ではありません。この例で作図可能だと分かる理由は、実二次拡大列を具体的に提示したことです。

---

## 2. 次数の必要条件はどこから出るか

すべての最小多項式について塔を探すのは大変です。そこで、先に次数だけで否定できる候補を落とします。

[FLD5 の次数条件](../../../代数系/FLD/FLD5/index.md#cor-fld5-constructible-degree)によれば、作図可能な実数 $\alpha$ の有理数体上の次数は $2$ の冪です。使っているのは、[拡大次数の塔の公式](../../../代数系/FLD/FLD1/index.md#thm-fld1-tower-law)です。

$$
[\mathbb Q(\alpha):\mathbb Q]
\mid [K_r:\mathbb Q]
=\prod_{i=1}^r[K_i:K_{i-1}]
=2^s.
$$

ここで $\alpha\in K_r$、$s$ は次数 $2$ の段階の個数です。正の整数で $2^s$ を割り切るものは $2$ の冪に限られます。

例えば $\sqrt[3]2$ の最小多項式は $X^3-2$ です。これは素数 $2$ に関する [Eisenstein の既約判定](../../../代数系/RNG/RNG4/index.md#thm-rng4-eisenstein)で既約なので、次数が $3$ です。$3$ は $2$ の冪ではなく、$\sqrt[3]2$ は作図できません。ただし、この議論では「次数 $2,4,8,\ldots$ なら作図できる」とは結論できません。

### 2.1 次数4でも作図できる例

$$
\beta=\sqrt2+\sqrt3
$$

は、$\mathbb Q\subset\mathbb Q(\sqrt2)\subset\mathbb Q(\sqrt2,\sqrt3)$ に入るので作図可能です。$\beta^2=5+2\sqrt6$ を使うと

$$
(\beta^2-5)^2=24,\qquad
\beta^4-10\beta^2+1=0.
$$

これが本当に最小多項式かも確かめます。

$$
\beta(\sqrt3-\sqrt2)=1,\quad
\sqrt2=\frac{\beta-\beta^{-1}}2,\quad
\sqrt3=\frac{\beta+\beta^{-1}}2.
$$

従って $\mathbb Q(\beta)=\mathbb Q(\sqrt2,\sqrt3)$ です。もし $\sqrt3=a+b\sqrt2$（$a,b\in\mathbb Q$）なら、二乗して

$$
3=a^2+2b^2+2ab\sqrt2
$$

ですから $ab=0$。$b=0$ なら $a^2=3$、$a=0$ なら $b^2=3/2$ となり、いずれも有理数の平方として不可能です。有理数の平方では素因数の指数は偶数ですが、$3$ も $3/2$ も素因数 $3$ の指数が奇数だからです。よって二段目の次数も $2$、$\beta$ の次数は $4$ です。

---

## 3. 最小多項式の次数と分解体を混同しない

最小多項式の根を一つだけ加える体 $\mathbb Q(\alpha)$ と、根を**すべて**加える[分解体](../../../代数系/FLD/FLD2/index.md#def-fld2-splitting-field)は異なります。後者を調べると、必要条件をさらに強められます。

例えば $\gamma=\sqrt[4]2$ は正の平方根を二度取ることで作図できます。$X^4-2$ は [Eisenstein の既約判定](../../../代数系/RNG/RNG4/index.md#thm-rng4-eisenstein)で既約なので $[\mathbb Q(\gamma):\mathbb Q]=4$ ですが、$i^2=-1$ を満たす虚数単位 $i$ を用いると四つの根は

$$
\gamma,\quad-\gamma,\quad i\gamma,\quad-i\gamma
$$

です。分解体は $\mathbb Q(\gamma,i)$ であり、$\gamma$ は実数で $i\notin\mathbb Q(\gamma)$ だから

$$
[\mathbb Q(\gamma,i):\mathbb Q]
=2[\mathbb Q(\gamma):\mathbb Q]=8.
$$

実二次拡大列はあくまで $\mathbb R$ の内部で作りますが、分解体を考える際は複素数体まで広げてよい点に注意してください。

### 3.1 分解体にも2の冪という障害が残る

作図可能数の最小多項式を分解すると、複素共役を含め、もとの実二次拡大列を正規に閉じるための根が必要です。その際も、平方根を有限個追加するだけで済むことを確かめます。有限拡大の[正規閉包](../../../代数系/FLD/FLD5/index.md#def-fld5-normal-closure)を使います。

<a id="lem-sqc3-splitting-degree"></a>

<!-- formal-statement-start -->
> **補題（作図可能数の分解体の次数障害）**  
> 実数 $\alpha$ が作図可能で、$m_\alpha(X)\in\mathbb Q[X]$ が $\alpha$ の有理数体上の最小多項式であるとする。$L$ を $m_\alpha$ の $\mathbb Q$ 上の分解体（複素数体内）とすると、$[L:\mathbb Q]$ は $2$ の冪である。
<!-- formal-statement-end -->

### 証明の見取り図

実二次拡大列の途中の体は、最初の有理数体上で正規とは限りません。そこで各段で、既に得た平方根の**すべての共役**も加えます。共役平方根の二乗は直前までの正規閉包に入り、追加の次数は引き続き $1$ または $2$ です。

<!-- proof-start -->
### 証明

[作図可能性の特徴付け](../../../代数系/FLD/FLD5/index.md#thm-fld5-constructible-quadratic-tower)により $\alpha\in K_r$ となる実二次拡大列を取り、次数 $1$ の段階を省いて

$$
\mathbb Q=K_0\subset K_1\subset\cdots\subset K_r,
\qquad K_i=K_{i-1}(\sqrt{d_i}),\quad d_i\in K_{i-1},\ d_i>0
$$

と書きます。$K_i/\mathbb Q$ の複素数体内の正規閉包を $N_i$ とし、$N_0=\mathbb Q$ とします。各 $K_i$ は有限代数拡大なので、以下の埋め込みの値は $\mathbb C$ 内の代数的数の体 $\overline{\mathbb Q}$ に入ります。帰納法で $[N_i:\mathbb Q]$ が $2$ の冪であることを示します。

ここで $\mathbb Q$-埋め込み $\sigma:K_{i-1}\hookrightarrow\mathbb C$ とは、$\mathbb Q$ の元を固定する[体の埋め込み](../../../代数系/FLD/FLD2/index.md#def-fld2-f-map)です。$N_{i-1}/\mathbb Q$ は正規なので、この $\sigma$ はすべて $\sigma(K_{i-1})\subset N_{i-1}$ を満たします。よって $\sigma(d_i)\in N_{i-1}$ です。各埋め込みについて平方根を一つずつ加えた体を

$$
M=N_{i-1}\bigl(\sqrt{\sigma(d_i)}
\ \bigm|\ \sigma:K_{i-1}\hookrightarrow\mathbb C
\text{ は }\mathbb Q\text{-埋め込み}\bigr)
$$

とします。埋め込みは有限個です。各平方根は $N_{i-1}$ 上で $X^2-\sigma(d_i)$ を満たすので、[塔の公式](../../../代数系/FLD/FLD1/index.md#thm-fld1-tower-law)を繰り返すと $[M:N_{i-1}]$ は $2$ の冪です。

$M/\mathbb Q$ が正規になる理由を確認します。$M$ の任意の $\mathbb Q$-埋め込み $\tau:M\hookrightarrow\mathbb C$ を取ると、$N_{i-1}/\mathbb Q$ の正規性から $\tau(N_{i-1})=N_{i-1}$ です。また

$$
\tau\bigl(\sqrt{\sigma(d_i)}\bigr)^2
=\tau\sigma(d_i)=(\tau\circ\sigma)(d_i)
$$

なので、左辺の平方根は $M$ に添加済みの $\sqrt{(\tau\circ\sigma)(d_i)}$ の正負いずれかです。従って $\tau(M)\subset M$。しかも $\tau$ は有限次元 $\mathbb Q$-ベクトル空間 $M$ 上の単射なので、像の次元も $[M:\mathbb Q]$ となり、$\tau(M)=M$ です。

正規性をここから確かめます。$p\in\mathbb Q[X]$ を既約多項式とし、$\beta\in M$ がその根であるとします。$p$ の任意の複素根 $\beta'$ に対し、$\beta\mapsto\beta'$ は $\mathbb Q(\beta)$ から $\mathbb C$ への埋め込みです。

[有限代数拡大上への埋め込み延長](../../../代数系/FLD/FLD2/index.md#thm-fld2-finite-field-map)により $M$ 全体への埋め込み $\tau$ に延長できます。先ほどの $\tau(M)=M$ から $\beta'=\tau(\beta)\in M$ です。従って $p$ の全根が $M$ に入り、[正規拡大の定義](../../../代数系/FLD/FLD2/index.md#def-fld2-conjugate-root-closure)を満たします。

恒等埋め込みも $\sigma$ の一つなので $K_i\subset M$ です。よって正規閉包の最小性から $N_i\subset M$ です。

逆に、$N_i$ は $N_{i-1}$ を含みます。各 $\sigma:K_{i-1}\hookrightarrow\mathbb C$ は[有限代数拡大上への埋め込み延長](../../../代数系/FLD/FLD2/index.md#thm-fld2-finite-field-map)によって $K_i$ へ延長でき、その像は $N_i$ に入ります。

延長先で $\sqrt{d_i}$ を送った元の二乗は $\sigma(d_i)$ なので、$\sqrt{\sigma(d_i)}$ は符号を除いて $N_i$ に含まれます。従って $M\subset N_i$ です。以上の両包含から $M=N_i$ で、

$$
[N_i:\mathbb Q]
=[N_i:N_{i-1}][N_{i-1}:\mathbb Q]
$$

は $2$ の冪です。

$\alpha\in K_r\subset N_r$ で、$N_r/\mathbb Q$ は正規ですから、$\alpha$ の最小多項式の全根が $N_r$ に属し、その分解体 $L$ も $N_r$ に含まれます。最後に

$$
[N_r:\mathbb Q]
=[N_r:L][L:\mathbb Q]
$$

より $[L:\mathbb Q]$ は $2$ の冪です。
<!-- proof-end -->

この補題の逆も一般には自明ではありません。本章では**作図不能性を示すための必要条件**として使います。

---

## 4. 次数4なのに作図不能な実数

ここで「次数が $2$ の冪なら作図可能」という誤った逆を打ち破ります。多項式

$$
f(X)=X^4-X-1
$$

を考えます。多項式 $f$ は $[1,2]$ 上連続で、$f(1)=-1$、$f(2)=13$ なので[中間値定理](../../../基礎科目/RA/RA2/index.md#thm-ra2-ivt)により $(1,2)$ に実根 $\alpha$ があります。

まず既約性を調べます。係数を $2$ で割った余りとして見ると $\overline f=X^4+X+1\in\mathbb F_2[X]$ です。$\overline f(0)=\overline f(1)=1$ だから一次因子はありません。また $\mathbb F_2$ 上の唯一の既約二次多項式は $X^2+X+1$ です。この式を法として計算すると

$$
X^2\equiv X+1,\qquad X^3\equiv1,\qquad X^4\equiv X,
\qquad \overline f\equiv X+X+1=1.
$$

従って二次因子もありません。次数 $4$ の多項式が可約なら一次または二次因子を持つため、$\overline f$ は既約です。

もし $f$ が $\mathbb Q[X]$ 上で可約なら、[Gauss の補題（既約性の移送）](../../../代数系/RNG/RNG4/index.md#thm-rng4-gauss-irreducibility)により、モニックな $f$ は $\mathbb Z[X]$ の正次数モニック多項式 $g,h$ の積 $f=gh$ に分解できます。

法 $2$ へ還元しても $g,h$ の先頭係数 $1$ は残るため、各次数は下がりません。よって $\overline f=\overline g\,\overline h$ が可約となり、上の既約性に反します。従って $f$ は $\mathbb Q$ 上でも既約で、

$$
[\mathbb Q(\alpha):\mathbb Q]=4.
$$

次に、四つの複素根を $a,b,c,d$ とし、三つの「対になる積の和」

$$
u=ab+cd,\quad v=ac+bd,\quad w=ad+bc
$$

を作ります。なぜこの三つを考えるのでしょうか。四つの根を二組に分ける方法はちょうど三通りで、どの根を選んでもこの三つは分解体の中にあります。これらを根とする**三次方程式**が出れば、分解体の次数に $3$ が現れる可能性があります。以下では $X$ を元の四次式、$Y$ を補助三次式の不定元として使い分けます。

<a id="prop-sqc3-quartic-counterexample"></a>

<!-- formal-statement-start -->
> **命題（次数4でも作図できない実数）**  
> 有理係数多項式

$$
f(X)=X^4-X-1
$$

> の区間 $(1,2)$ にある実根を $\alpha$ とする。この $\alpha$ は $\mathbb Q$ 上次数 $4$ の代数的数であるが、定規とコンパスでは作図できない。
<!-- formal-statement-end -->

### 証明の見取り図

$f$ の分解体に三次既約多項式の根が含まれることを示します。すると分解体の次数は $3$ の倍数です。一方、作図可能なら前補題により分解体の次数は $2$ の冪でなければならず、矛盾します。

<!-- proof-start -->
### 証明

既約性と $\alpha$ の次数 $4$ は命題直前で確認しました。$f(X)=(X-a)(X-b)(X-c)(X-d)$ を展開して $X^3,X^2,X,1$ の係数を順に比較します。根の一次・二次・三次・四次の基本対称式を $e_1,e_2,e_3,e_4$ とすると、

$$
e_1=a+b+c+d=0,\quad e_2=0,\quad e_3=1,\quad e_4=abcd=-1.
$$

上で定めた $u,v,w$ について、六つの積 $ab,ac,ad,bc,bd,cd$ をまとめ直すと

$$
u+v+w=e_2=0.
$$

二つずつの積を展開すると、$uv+uw+vw$ には $a^2bc,ab^2d$ など、一つの根が二度現れる項が計 $12$ 個あります。一方 $e_1e_3=(a+b+c+d)(abc+abd+acd+bcd)$ はその同じ $12$ 項に $abcd$ を $4$ 回加えたものです。従って

$$
uv+uw+vw=e_1e_3-4e_4=4.
$$

三つの積については、三重積を先にまとめれば

$$
uvw=e_4(a^2+b^2+c^2+d^2)
+(abc)^2+(abd)^2+(acd)^2+(bcd)^2.
$$

さらに

$$
a^2+b^2+c^2+d^2=e_1^2-2e_2,\qquad
\bigl((abc)^2+(abd)^2+(acd)^2+(bcd)^2\bigr)=e_3^2-2e_2e_4
$$

だから $uvw=e_4e_1^2-4e_2e_4+e_3^2=1$ です。従って $u,v,w$ を根に持つ多項式は

$$
(Y-u)(Y-v)(Y-w)
=Y^3-(u+v+w)Y^2+(uv+uw+vw)Y-uvw
=Y^3+4Y-1.
$$

この三次多項式はモニックで整数係数です。[有理根定理](../../../代数系/RNG/RNG4/index.md#thm-rng4-rational-root)によれば、有理根は整数で定数項 $-1$ の約数 $\pm1$ しか候補がありません。しかし代入値は $4,-6$ で、いずれも $0$ ではありません。三次多項式は一次因子がなければ既約なので、

$$
[\mathbb Q(u):\mathbb Q]=3.
$$

$f$ の分解体 $L$ は $a,b,c,d$ をすべて含むので $u\in L$ です。[塔の公式](../../../代数系/FLD/FLD1/index.md#thm-fld1-tower-law)から

$$
[L:\mathbb Q]=[L:\mathbb Q(u)]\cdot3
$$

となり、$3\mid[L:\mathbb Q]$ です。もし $\alpha$ が作図可能なら、[分解体の次数障害](#lem-sqc3-splitting-degree)により $[L:\mathbb Q]$ は $2$ の冪となり、矛盾します。従って $\alpha$ は作図できません。
<!-- proof-end -->

この反例で失われるのは、作図可能性に必要な**二次拡大塔への包含**です。$\mathbb Q(\alpha)$ の次数が $4$ という情報だけでは、分解体に現れる三次の障害を検出できません。最小多項式・分解体・具体的な作図手順は、それぞれ異なる問いに答えます。

---

## 5. 演習：次数判定の向きと限界

### Level A：条件を一つずつ使う

**SQC3-A1（塔を具体的に示す）**  
$\alpha=\sqrt{3+\sqrt2}$ が作図可能であることを、$\mathbb Q$ から始まる実二次拡大列で示してください。平方根を取る段階で必要な符号も確認してください。

- Level: A

<!-- solution-start -->
**詳細解答**

次の列を取ります。

$$
K_0=\mathbb Q,\quad
K_1=\mathbb Q(\sqrt2),\quad
K_2=K_1(\sqrt{3+\sqrt2}).
$$

$\sqrt2$ は $X^2-2$ の根、$\sqrt{3+\sqrt2}$ は $K_1$ 上の $X^2-(3+\sqrt2)$ の根なので、各段は次数高々 $2$ です。

$3+\sqrt2>0$ だから、[非負平方根の作図](../SQC2/index.md#prop-sqc2-positive-square-root)を最初に $2$ へ、続いて $3+\sqrt2$ へ適用できます。後者の入力は[四則演算](../SQC2/index.md#prop-sqc2-field-operations)で作れるため、$\alpha$ も作図可能です。
<!-- solution-end -->

**SQC3-A2（次数4の作図可能数）**  
$\beta=\sqrt2+\sqrt3$ について $\beta^4-10\beta^2+1=0$ を示し、なぜこの四次式の存在だけで作図可能性は証明できないか答えてください。

- Level: A

<!-- solution-start -->
**詳細解答**

$\beta^2=2+3+2\sqrt6=5+2\sqrt6$ から $(\beta^2-5)^2=24$、展開して $\beta^4-10\beta^2+25=24$ です。一方、方程式の次数が $4$ であることは、解を平方根で作る手順の存在を意味しません。ここでは $\beta\in\mathbb Q(\sqrt2,\sqrt3)$ であり、$\mathbb Q\subset\mathbb Q(\sqrt2)\subset\mathbb Q(\sqrt2,\sqrt3)$ の各段が次数高々 $2$ であること、および[実二次拡大列の作図](#prop-sqc3-tower-construction)によって初めて作図可能性が証明されます。
<!-- solution-end -->

**SQC3-A3（三次の障害）**  
$X^3-2$ が $\mathbb Q$ 上既約であることを確認し、その唯一の実根 $\sqrt[3]2$ の作図可能性を判定してください。

- Level: A

<!-- solution-start -->
**詳細解答**

[有理根定理](../../../代数系/RNG/RNG4/index.md#thm-rng4-rational-root)により、整数係数のモニック三次式 $X^3-2$ に有理根があれば、定数項 $-2$ の約数 $\pm1,\pm2$ に限られます。それぞれ代入しても零にはならないので、三次式は既約です。$\sqrt[3]2$ の最小多項式の次数は $3$ です。[次数の必要条件](../../../代数系/FLD/FLD5/index.md#cor-fld5-constructible-degree)は作図可能なら次数が $2$ の冪になると主張しますが、$3$ はその形ではありません。従って作図不能です。
<!-- solution-end -->

**SQC3-A4（四次既約でも作図できる）**  
$\gamma=\sqrt[4]5>0$ の最小多項式を求め、実二次拡大列を示してください。

- Level: A

<!-- solution-start -->
**詳細解答**

$\gamma^4=5$ より $X^4-5$ を満たします。$5$ は最高次係数以外をすべて割り、$25$ は定数項 $-5$ を割らないので、[Eisenstein の既約判定](../../../代数系/RNG/RNG4/index.md#thm-rng4-eisenstein)で既約です。従って最小多項式は $X^4-5$ です。

次に二段の体の列を取ります。

$$
K_0=\mathbb Q,\quad
K_1=\mathbb Q(\sqrt5),\quad
K_2=K_1(\sqrt{\sqrt5}).
$$

$\sqrt5>0$ で $\gamma=\sqrt{\sqrt5}\in K_2$ です。各段は次数高々 $2$ なので、[塔による作図](#prop-sqc3-tower-construction)から作図可能です。
<!-- solution-end -->

### Level B：証明と反例を自力で動かす

**SQC3-B1（実二次拡大の符号）**  
$K\subset\mathbb R$、$E/K$ が次数 $2$ の実体拡大とします。$E=K(\sqrt d)$ となる $d\in K$、$d>0$ が取れることを示してください。

- Level: B

<!-- solution-start -->
**詳細解答**

$\beta\in E\setminus K$ を選びます。[拡大次数の塔の公式](../../../代数系/FLD/FLD1/index.md#thm-fld1-tower-law)から $[K(\beta):K]$ は $[E:K]=2$ を割り、$\beta\notin K$ なので次数は $2$ です。従って $E=K(\beta)$。$\beta$ のモニック最小多項式を $X^2+bX+c$（$b,c\in K$）と書き、$\beta^2+b\beta+c=0$ を使うと

$$
(2\beta+b)^2=4\beta^2+4b\beta+b^2=b^2-4c=:d\in K.
$$

左辺は実数の平方なので $d\ge0$。もし $d=0$ なら $\beta=-b/2\in K$ となり矛盾するため $d>0$ です。$\sqrt d=|2\beta+b|$ は $\pm(2\beta+b)$ の一方で $E$ に属し、逆向きには

$$
\beta=\frac{-b\pm\sqrt d}{2}\in K(\sqrt d)
$$

なので $E=K(\sqrt d)$ です。$d>0$ の確認が実平方根の作図へつなぐ条件です。
<!-- solution-end -->

**SQC3-B2（四次式の既約性を有限体で確かめる）**  
$f(X)=X^4-X-1$ を $\mathbb F_2[X]$ に還元し、一次因子も既約二次因子も持たないことから $\mathbb Q$ 上の既約性を証明してください。

- Level: B

<!-- solution-start -->
**詳細解答**

還元は $\overline f=X^4+X+1$ です。$\overline f(0)=1$、$\overline f(1)=1+1+1=1$ なので一次因子はありません。$\mathbb F_2$ 上のモニック二次式を調べると、根を持たないものは $X^2+X+1$ だけです。この二次式で割る際、$X^2=X+1$、$X^3=1$、$X^4=X$ と剰余をとれるので

$$
X^4+X+1\equiv X+X+1=1
\pmod{X^2+X+1}.
$$

従って既約二次因子もありません。四次可約式は次数の和が $4$ の二つの正次数因子に分かれるため、一方は次数 $1$ または $2$ です。よって $\overline f$ は既約です。

もし $f$ が $\mathbb Q[X]$ で可約なら、[Gauss の補題（既約性の移送）](../../../代数系/RNG/RNG4/index.md#thm-rng4-gauss-irreducibility)により $f=gh$（$g,h\in\mathbb Z[X]$ は正次数モニック）と書けます。

法 $2$ に還元してもモニック性により両因子の次数は変わりません。既約な $\overline f$ が可約になる矛盾から、$f$ は $\mathbb Q$ 上既約です。
<!-- solution-end -->

**SQC3-B3（三次補助方程式の係数）**  
$X^4-X-1$ の四根を $a,b,c,d$ とし、$u=ab+cd$、$v=ac+bd$、$w=ad+bc$ とします。$u+v+w$ と $uv+uw+vw$、$uvw$ を求め、三次式を構成してください。

- Level: B

<!-- solution-start -->
**詳細解答**

$f(X)=(X-a)(X-b)(X-c)(X-d)$ を展開して係数を比較すると、四根の第 $j$ 基本対称式 $e_j$（$j=1,2,3,4$）は $e_1=e_2=0$、$e_3=1$、$e_4=-1$ です。

$u+v+w$ は六つの異なる二根積の総和だから $e_2=0$ です。

$uv+uw+vw$ の展開には、一つの根が二度現れる次数 $4$ の単項式が $12$ 個あります。$e_1e_3$ はその $12$ 項に $abcd$ を $4$ 個加えたものなので、$uv+uw+vw=e_1e_3-4e_4=4$ です。

$uvw$ は八項を展開すると $(abc)^2+(abd)^2+(acd)^2+(bcd)^2+e_4(a^2+b^2+c^2+d^2)$ となります。前半は $e_3^2-2e_2e_4=1$、後半は $e_4(e_1^2-2e_2)=0$。ゆえに $uvw=1$。従って求める三次式は

$$
Y^3-(u+v+w)Y^2+(uv+uw+vw)Y-uvw
=Y^3+4Y-1.
$$
<!-- solution-end -->

**SQC3-B4（分解体は最小多項式の次数とは違う）**  
$\gamma=\sqrt[4]2>0$ の最小多項式の次数と分解体の次数を求め、それぞれの体を指定してください。

- Level: B

<!-- solution-start -->
**詳細解答**

$\gamma$ は $X^4-2$ の根で、この多項式は素数 $2$ に関する [Eisenstein の既約判定](../../../代数系/RNG/RNG4/index.md#thm-rng4-eisenstein)で既約です。従って $\mathbb Q(\gamma)$ の次数は $4$ です。四根は $\gamma,-\gamma,i\gamma,-i\gamma$ なので分解体は $L=\mathbb Q(\gamma,i)$。$\mathbb Q(\gamma)\subset\mathbb R$ より $i$ はその外にあり、$X^2+1$ は $\mathbb Q(\gamma)$ 上既約です。従って

$$
[L:\mathbb Q(\gamma)]=2,\qquad
[L:\mathbb Q]=2\cdot4=8.
$$

$\gamma=\sqrt{\sqrt2}$ なので $\mathbb Q\subset\mathbb Q(\sqrt2)\subset\mathbb Q(\gamma)$ という実二次拡大列があり、分解体を作図の際に実際に構成する必要はありません。
<!-- solution-end -->

### Level C：判定の方向を統合する

**SQC3-C1（同じ次数4で結論が分かれる）**  
正の実根 $\gamma$ を持つ $g(X)=X^4-5$ と、$(1,2)$ に実根 $\alpha$ を持つ $f(X)=X^4-X-1$ を比較してください。(i) 二つの多項式が既約であること、(ii) $\gamma$ の作図可能性、(iii) $\alpha$ の作図不能性を、次数だけで判定しないように証明してください。

- Level: C

<!-- solution-start -->
**詳細解答**

(i) $g$ は $5$ に関する [Eisenstein の既約判定](../../../代数系/RNG/RNG4/index.md#thm-rng4-eisenstein)で既約です。

$f$ は法 $2$ で $X^4+X+1$ となり、$\mathbb F_2$ 上で根を持ちません。唯一の既約二次式 $X^2+X+1$ での剰余も $1$ です。次数 $4$ の可約式は一次または二次因子を持つので、$\overline f$ は既約です。

さらに $f$ はモニックです。[Gauss の補題（既約性の移送）](../../../代数系/RNG/RNG4/index.md#thm-rng4-gauss-irreducibility)により、$f$ が有理係数で可約なら正次数のモニック整数係数因子を持ちます。これらの因子は法 $2$ で次数を保つため、$\overline f$ の既約性に矛盾します。従って $f$ も $\mathbb Q$ 上既約で、$\gamma$、$\alpha$ はともに次数 $4$ です。

(ii) $\gamma=\sqrt{\sqrt5}$ です。$5>0$、$\sqrt5>0$ なので

$$
\mathbb Q\subset\mathbb Q(\sqrt5)
\subset\mathbb Q(\sqrt5,\sqrt{\sqrt5})
$$

という実二次拡大列が存在します。各段の元は[四則演算と平方根の作図](#prop-sqc3-tower-construction)で得られるため、$\gamma$ は作図可能です。

(iii) $f$ は $[1,2]$ 上連続で $f(1)=-1<0<f(2)=13$ だから、[中間値定理](../../../基礎科目/RA/RA2/index.md#thm-ra2-ivt)により $\alpha\in(1,2)$ は存在します。

$f$ の四根を $a,b,c,d$ とし、$u=ab+cd$、$v=ac+bd$、$w=ad+bc$ とします。係数比較から基本対称式は $e_1=e_2=0$、$e_3=1$、$e_4=-1$ です。各積を展開すると

$$
u+v+w=e_2=0,\qquad
uv+uw+vw=e_1e_3-4e_4=4,
$$

$$
uvw=e_4(e_1^2-2e_2)+(e_3^2-2e_2e_4)=1.
$$

したがって $u$ は $Y^3+4Y-1$ の根です。この三次式の有理根候補は $\pm1$ ですが、代入値は $4,-6$ なので既約で、

$$
[\mathbb Q(u):\mathbb Q]=3.
$$

$f$ の分解体 $L$ は $u$ を含むので、[塔の公式](../../../代数系/FLD/FLD1/index.md#thm-fld1-tower-law)を $\mathbb Q\subset\mathbb Q(u)\subset L$ に適用して

$$
[L:\mathbb Q]=3[L:\mathbb Q(u)]
$$

を得ます。他方、もし $\alpha$ が作図可能なら、[分解体の次数障害](#lem-sqc3-splitting-degree)により $[L:\mathbb Q]$ は $2$ の冪です。$3$ の倍数と $2$ の冪は両立しないので、$\alpha$ は作図不能です。二つの数を分けるのは単なる最小多項式の次数ではなく、実二次拡大列への包含の可否です。
<!-- solution-end -->

---

## 6. まとめ：証明できることの向き

| 確認した事実 | 結論 | 向き |
| --- | --- | --- |
| 実二次拡大列を具体的に示せた | 作図可能 | 十分条件（一般同値の片方向） |
| 作図可能と仮定した | 実二次拡大列に含まれる | 必要条件（一般同値の片方向） |
| 最小多項式の次数が $2$ の冪でない | 作図不能 | 必要条件の対偶 |
| 最小多項式の次数が $2$ の冪である | **まだ判定できない** | 逆は偽 |
| 最小多項式の分解体の次数が $2$ の冪でない | 作図不能 | 強めた必要条件の対偶 |

次の SQC4 では、立方体倍積と角の三等分を三次方程式へ翻訳します。そこでの次数 $3$ の障害は、本章の四次反例より簡単に現れます。
