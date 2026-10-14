# EC4 Isogeny・自己準同型・torsionの代数的基盤

[EC2の結合法則](../EC2/index.md#thm-ec2-associativity)で、任意の体上の非特異Weierstrass曲線の点に加法が定まりました。[EC3の複素一様化](../EC3/index.md#thm-ec3-group-uniformization)では、複素格子の包含から「異なる曲線の間の有限個対一の写像」が見えます。しかし複素数の格子だけを使っても、有限体上の点数は評価できません。

必要なのは、曲線から曲線への写像の**何対一かを数える次数**と、写像を足したとき次数がどう変わるかという法則です。この章では写像の分母や無限遠点を確認し、因子を使って次数の二次性を導きます。その上で有限位数点・双対写像・具体的な次数2の曲線間写像を結びます。体 $k$、代数閉包 $K=\overline{k}$ を固定し、代数的な点・次数は原則 $K$ 上で数えます。体の標数は指定しない限り任意です。

## 1. 曲線間の「式」を、本当に全点で定義された写像にする

曲線 $E$ の座標 $x,y$ を使って $E'$ の点を表示する式では、分母が零になる点をそのまま捨ててはいけません。射影曲線の写像では、その点の近くで値が有限点に近づくか、無限遠点 $O'$ に近づくかを調べます。

曲線上の関数は[座標環](../../AG/AG1-03/index.md#def-ag1-03-coordinate-ring)にある多項式関数を分子・分母として拡張できます。ただし分母が零になる点は、別に局所的な振る舞いを調べなければなりません。

<a id="def-ec4-rational-function"></a>

<!-- formal-statement-start -->
> **定義（有理関数）**  
> $k$ 上の非特異Weierstrass曲線のアフィン方程式を $F(x,y)=0$ とする。座標環 $A=k[x,y]/(F)$ の分数体

$
k(E)=\operatorname{Frac}(A)
$

> の元を楕円曲線 $E$ の有理関数と呼ぶ。商 $f/g$ は、$g(P)\ne0$ となる点で正則な値を持ち、分母が零の点では局所的に位数を調べる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ec4-rational-function -->
**定義の確認**。$\mathbb Q$ 上の非特異曲線 $E:y^2=x^3-x+1$ で $f=1/x$ を取ります。$f$ は分数体の元ですが、$P=(0,1)$ では $x=0$ です。この点で $2y=2\ne0$ だから $t=x$ は局所パラメータ、$f=t^{-1}$ は1位の極です。一方 $Q=(1,1)$ では $x(Q)=1$、$f(Q)=1$ です。これで有理関数と全点で定義された射を区別できます。
<!-- definition-example-end -->

[局所パラメータと零点・極の位数](../../AG/AG2-07/index.md#def-ag2-07-order-principal)に従い、点 $P$ で $f=t^ru(t)$（$u(0)\ne0$）なら $\operatorname{ord}_P(f)=r$ と数えます。$r<0$ が極です。

<a id="def-ec4-isogeny"></a>

<!-- formal-statement-start -->
> **定義（曲線の射と同種写像）**  
> $k$ 上の二つの非特異射影Weierstrass曲線 $(E,O)$、$(E',O')$ に対し、射 $\phi:E\to E'$ とは、各点の近傍で同次座標の正則関数によって表示され、共通零点を持たずに貼り合わさる写像である。$\phi(O)=O'$ で、$\phi$ が定数でないとき、$\phi$ を **同種写像（isogeny）** と呼ぶ。$\phi$ が定数で $O'$ を値とする場合は零写像と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ec4-isogeny -->
**定義の確認**。恒等写像は同次座標 $[X:Y:Z]\mapsto[X:Y:Z]$ で与えられ、各点で三つの座標は同時には零でありません。$O\mapsto O$ で非定数なので同種写像です。一方、短い形 $y^2=x^3+Ax+B$ の $x$ 座標だけを $E\to E'$ の写像と思うことはできません。$x$ は $O$ で二重極を持ち、値は本来 $\mathbb P^1$ に入るからです。写像の値域と分母の扱いまで確認する必要があります。
<!-- definition-example-end -->

非定数な射影曲線間の射は全射かつ有限です。全射性は、非定数なら像が有限集合ではなく、射影曲線の像が閉であることから従います。有限性は関数体の有限拡大、あるいは滑らかな曲線の局所環が離散付値環であることから従います。写像に対し、関数を逆向きに引き戻す単射

$$
\phi^*:K(E')\longrightarrow K(E),\qquad f\longmapsto f\circ\phi
$$

が生じます。これが写像の次数を定める基礎です。

<a id="def-ec4-degree"></a>

<!-- formal-statement-start -->
> **定義（射の次数と分離性）**  
> 非定数な射 $\phi:E\to E'$ について、有限関数体拡大 $K(E)/\phi^*K(E')$ の次数を
>
$$
\deg\phi=[K(E):\phi^*K(E')]\ge1
$$
>
> と定める。拡大が分離拡大なら $\phi$ は**分離的**、そうでなければ**非分離的**という。零写像については $\deg0=0$ と約束する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ec4-degree -->
**定義の確認**。恒等射では引き戻す関数体が元の関数体そのものなので $\deg[1]=1$ です。二つの有限拡大の塔の次数を数えれば、非定数射の合成について

$$
\deg(\psi\circ\phi)=\deg\psi\,\deg\phi
$$

が成り立ちます。この式は「核に何点あるか」を仮定せず、関数体拡大の次数から得られます。後に非分離的な写像では次数と核の点数が異なる例を見ます。
<!-- definition-example-end -->

**次数を実際に数える方法**。$E'$ の座標関数 $x'$ は $K(E')$ から次数2で $\mathbb P^1$ の関数体 $K(x')$ へ降りる関数です。一般Weierstrass方程式は $y'$ の二次式で、非特異曲線の関数体では $[K(E'):K(x')]=2$ です。$\phi$ の $x'$ 成分が $R(x)=N(x)/D(x)$（既約）で表されるなら

$$
[K(x):K(R(x))]=\max(\deg N,\deg D).
$$

両側の塔の次数

$$
[K(E):K(R(x))]=2[K(x):K(R(x))]
=\deg\phi\,[K(E'):K(x')]
$$

を比べると、$\deg\phi=\max(\deg N,\deg D)$ です。ここでは $x$ も $x'$ も次数2であることが重要で、**分子の次数だけ**を数えてはいけません。$K(E)/K(x)$ が二次であることは標数2でも非特異一般Weierstrass形で保たれます。

## 2. 点の和と「因子の和」を結ぶ

点の加法だけでは、曲線間の射が加法を保つ理由をまだ説明できません。そこで零点・極を形式的に並べる**因子**を使います。[Weil因子](../../AG/AG2-07/index.md#def-ag2-07-weil-divisor)は $D=\sum_Pn_P(P)$（有限個を除き $n_P=0$）という形式和です。$\deg D=\sum n_P$、有理関数 $f$ の主因子は $\operatorname{div}(f)=\sum_P\operatorname{ord}_P(f)(P)$ です。差が主因子である二因子を $D\sim D'$ と書きます。

一方、楕円曲線上の形式和の点を群則で足した $S(D)=\sum_P[n_P]P$ も考えられます。前者の $\deg D$ は**整数**、後者の $S(D)$ は**曲線上の点**であり、同じ記号の「和」でも混同しません。

<a id="lem-ec4-divisor-sum"></a>

<!-- formal-statement-start -->
> **補題（次数0の因子と群の点）**  
> 代数閉体 $K$ 上の非特異Weierstrass曲線 $E$ と次数0の因子 $D$ について
>
$$
D\sim (S(D))-(O).
$$
>
> とくに $D$ が主因子である必要十分条件は $S(D)=O$ である。従って次数0の因子を主因子で割った群 $\operatorname{Pic}^0(E)$ は、$[(P)-(O)]\leftrightarrow P$ により $E(K)$ と群同型になる。
<!-- formal-statement-end -->

### 証明の見取り図

直線で曲線を切ると三点の交点因子が現れます。横の二点を縦線の二点と比較して、$(P)+(Q)\sim(P+Q)+(O)$ を得ます。これを繰り返して任意の次数0の因子を一点との差へ縮めます。最後に「$O$ だけに一位の極を持つ関数は存在しない」ことから一点の一意性を示します。

<!-- proof-start -->
### 証明

$P,Q$ を有限点とし、割線または接線と $E$ の第三交点を $R=-(P+Q)$ とします。直線の同次一次式を $L$、無限遠直線を $Z=0$ とすると、$L/Z$ の零点は $P,Q,R$（接触時は重複度込み）、極は $3(O)$ なので

$$
\operatorname{div}(L/Z)=(P)+(Q)+(R)-3(O).
$$

$R$ と $-R$ を通る縦線について同様に

$$
(R)+(-R)+(O)\sim3(O).
$$

二式から $R$ を消し、$-R=P+Q$ に注意すると

$$
(P)+(Q)\sim(P+Q)+(O)
$$

を得ます。$O$ が含まれる場合にも式はそのまま成立します。負の係数は、$(P)+(-P)\sim2(O)$ を利用して逆元へ変換できます。有限回の加減によって、任意の次数 $d$ の因子は

$$
D\sim(S(D))+(d-1)(O)
$$

となります。とくに $d=0$ なら主張の最初の式です。

一意性を調べます。$(P)-(O)$ が主因子で $P\ne O$ とすると、対応する非定数有理関数はアフィン部分で極を持たず、$O$ でちょうど1位の極を持つはずです。しかしアフィン部分で正則な関数は座標環の元として

$$
f=\sum_i c_i x^i+\sum_j d_jx^jy
$$

と表せます（$y^2$ は曲線方程式で $y$ の一次以下へ戻せる）。$O$ の局所パラメータ $t=-x/y$ では $x=t^{-2}+\cdots,\ y=-t^{-3}+\cdots$ です。非零項の極の次数は $2i$ または $2j+3$ で互いに異なるので、最高次極は消えません。非定数なら極の次数は2以上であり、1にはなりません。従って $P=O$ です。

最後に、$D\mapsto S(D)$ は因子の和を群の和に送ります。主因子がちょうど核であり、$(P)-(O)$ はどの点 $P$ からも作れるので、商群は $E(K)$ と同型です。$\square$
<!-- proof-end -->

この補題は後で繰り返し使います。複素トーラスを知らなくても、直線との三交点から因子類と群則を対応させられました。

<a id="thm-ec4-morphism-hom"></a>

<!-- formal-statement-start -->
> **定理（原点を保つ非定数射は準同型）**  
> $K$ 上の非特異Weierstrass曲線 $E,E'$ の間の非定数射 $\phi:E\to E'$ が $\phi(O)=O'$ を満たすなら、任意の $P,Q\in E(K)$ に対し
>
$$
\phi(P+Q)=\phi(P)+\phi(Q)
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

曲線上で $(P)+(Q)-(P+Q)-(O)$ が主因子だったので、これを射で先へ送っても主因子であることを、関数体のノルムを使って示します。

<!-- proof-start -->
### 証明

[前補題](#lem-ec4-divisor-sum)から

$$
D=(P)+(Q)-(P+Q)-(O)=\operatorname{div}(f)
$$

となる $f\in K(E)^\times$ が存在します。非定数射は有限なので、$K(E)/\phi^*K(E')$ に体ノルム $N_\phi$ が定義されます。$\phi$ による因子の押し出しを $\phi_*(\sum n_P(P))=\sum n_P(\phi(P))$ とすると、局所付値をノルムの行列式で追うことで

$$
\phi_*\operatorname{div}(f)=\operatorname{div}(N_\phi(f))
$$

です。これは分離拡大に限りません。局所的にはノルムの行列式の付値が、上にある点での $f$ の零点・極の位数の和になるからです。

従って $\phi_*D$ も主因子です。$\phi(O)=O'$ なので

$$
\phi_*D=(\phi(P))+(\phi(Q))-(\phi(P+Q))-(O')
$$

となります。[前補題](#lem-ec4-divisor-sum)を $E'$ に適用すると、その点の和は $O'$ です。ゆえに $\phi(P)+\phi(Q)-\phi(P+Q)=O'$、すなわち主張を得ます。$\square$
<!-- proof-end -->

同種写像の核 $\ker\phi=\{P\in E(K):\phi(P)=O'\}$ は群です。非定数射の各繊維は有限なので、核も有限です。また $\phi(P)=\phi(Q)$ と $P-Q\in\ker\phi$ は同値であり、各繊維は核の剰余類です。

## 3. 倍数写像の次数はなぜ平方数か

$[n]:E\to E$ を群則で $P\mapsto[n]P$ とする写像とします。EC2の加法式は分母が零になる点も射影座標で延長でき、加法が射であるため $[n]$ は射です。$[1]$ は恒等射、$[0]$ は零写像です。後の有限位数点を数えるため、まず $\deg[n]=n^2$ を**標数によらず**導きます。

倍加公式を一般Weierstrass形に適用します。[EC1の不変量](../EC1/index.md#def-ec1-invariants) $b_2,b_4,b_6,b_8,\Delta$ を使うと

$$
x([2]P)=\frac{N_2(x)}{D_2(x)},
$$

$$
\begin{aligned}
N_2(x)&=x^4-b_4x^2-2b_6x-b_8,\\
D_2(x)&=4x^3+b_2x^2+2b_4x+b_6.
\end{aligned}
$$

この式は標数2でも、分子・分母の係数をその体へ移して読めます。分子の先頭係数は1です。[判別式条件](../EC1/index.md#thm-ec1-discriminant-criterion) $\Delta\ne0$ を使い、これらの多項式の終結式を計算すると $\operatorname{Res}_x(N_2,D_2)=\Delta^2\ne0$ です（各 $b_i$ の定義を代入して多項式展開できる）。従って二式は互いに素で、$x\mapsto N_2(x)/D_2(x)$ は次数4。第1節の関数体の塔から $\deg[2]=4$ を得ます。

より一般の次数を得る仕組みは、楕円曲線の $x$ 座標が $U$ と $-U$ で一致することにあります。

<a id="lem-ec4-x-difference"></a>

<!-- formal-statement-start -->
> **補題（座標の差と次数の平行四辺形則）**  
> 同一の楕円曲線 $E'$ を値域とする非零の同種写像 $\alpha,\beta:E\to E'$ で、$\alpha\ne\beta$ かつ $\alpha\ne-\beta$ とする。このとき
>
$$
\deg(\alpha+\beta)+\deg(\alpha-\beta)=2\deg\alpha+2\deg\beta.
$$
>
> $\alpha=0,\beta=0,\alpha=\pm\beta$ の場合も、倍加の次数 $\deg[2]=4$ と合成次数の乗法性を使えば同じ等式が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$x(\alpha(P))-x(\beta(P))$ が零になるのは $\alpha(P)=\pm\beta(P)$、極になるのはどちらかが $O'$ に来るときです。重複度を局所パラメータで数えると、関数の主因子から四つの写像の次数が比較できます。

<!-- proof-start -->
### 証明

まず $\alpha,\beta,\alpha+\beta,\alpha-\beta$ が非定数の場合を考えます。$E'$ の座標関数 $x$ の極因子は $2(O')$ です。$E$ 上の有理関数 $g=x\circ\alpha-x\circ\beta$ に対して、点の重複度込みで

$$
\operatorname{div}(g)
=(\alpha-\beta)^*(O')+(\alpha+\beta)^*(O')
-2\alpha^*(O')-2\beta^*(O')
$$

が成り立ちます。これを局所的に確かめるには、$E'$ の有限点ではWeierstrass方程式の $y$ についての二次式を使います。$x(U)=x(V)$ の二点は $U=V$ または $U=-V$ であり、重なる点では両枝の交点重複度を足します。$O'$ の近くでは $t=-x/y$、$x=t^{-2}+\cdots$ を使い、分子の局所的な因子が $t(U-V)t(U+V)$、分母が $t(U)^2t(V)^2$ となることを確かめます。したがって極と零点を上の四つの引き戻し因子で数えられます（標数2では二枝が合流する点も重複度込み）。

任意の主因子は次数0です。他方、有限射 $\gamma$ と点 $O'$ に対し

$$
\deg(\gamma^*(O'))=[K(E):\gamma^*K(E')]=\deg\gamma
$$

です。後者は曲線の局所付値環を有限自由加群として見たとき、繊維上の零点重複度の和がその階数になることから従います。主因子の上の式の次数を取ると平行四辺形則が得られます。

$\beta=0$ などでは $\deg(-\alpha)=\deg\alpha$ から直ちに成立します。$\alpha=\beta\ne0$ なら $\alpha+\beta=[2]\circ\alpha$、$\alpha-\beta=0$ ですから

$$
\deg(\alpha+\beta)=\deg[2]\deg\alpha=4\deg\alpha
$$

であり、右辺も $4\deg\alpha$ です。$\alpha=-\beta$ も同じです。$\square$
<!-- proof-end -->

<a id="thm-ec4-multiplication-degree"></a>

<!-- formal-statement-start -->
> **定理（倍数写像の次数）**  
> $K$ を任意標数の代数閉体、$E/K$ を非特異楕円曲線とする。全整数 $n$ に対して
>
$$
\deg[n]=n^2
$$
>
> が成り立つ。ただし $[0]$ は零写像で、$\deg[0]=0$ とする。
<!-- formal-statement-end -->

### 証明の見取り図

すでに $d_0=0,d_1=1,d_2=4$ が分かっています。平行四辺形則へ $\alpha=[n],\beta=[1]$ を入れると、$d_{n+1}+d_{n-1}=2d_n+2$ という漸化式になります。

<!-- proof-start -->
### 証明

$d_n=\deg[n]$ と書きます。前述の倍加計算で $d_2=4$、恒等射から $d_1=1$、約束から $d_0=0$ です。[平行四辺形則](#lem-ec4-x-difference)を $n\ge2$ に適用すると

$$
d_{n+1}+d_{n-1}=2d_n+2d_1=2d_n+2.
$$

$n=2$ では $d_3=2\cdot4+2-1=9$。$d_n=n^2,d_{n-1}=(n-1)^2$ と仮定して右辺を移せば

$$
\begin{aligned}
d_{n+1}
&=2n^2+2-(n-1)^2\\
&=2n^2+2-(n^2-2n+1)\\
&=(n+1)^2.
\end{aligned}
$$

よって帰納法で正の整数について成立します。$[-n]=[-1]\circ[n]$、反転 $[-1]$ は次数1なので負の整数も同じです。$\square$
<!-- proof-end -->

この証明では「$E[n]$ の点が $n^2$ 個」と先に仮定していません。標数が $n$ を割る場合、点の数え方だけでは次数を求められないからです。

<a id="thm-ec4-degree-quadratic"></a>

<!-- formal-statement-start -->
> **定理（同種写像の次数の二次性）**  
> $E,E'$ を代数閉体上の楕円曲線、$\alpha,\beta:E\to E'$ を同種写像または零写像とする。整数 $m,n$ に対し
>
$
\deg([m]\alpha+[n]\beta)
> =m^2\deg\alpha+mn\,B(\alpha,\beta)+n^2\deg\beta,
$
>
$$
B(\alpha,\beta)=\deg(\alpha+\beta)-\deg\alpha-\deg\beta
$$
>
> が成り立つ。非定数射の次数は正、零写像の次数は0である。
<!-- formal-statement-end -->

### 証明の見取り図

二次式の交差項は、$\alpha+\beta$ の次数から両者の次数を引くと得られます。平行四辺形則を整数倍に繰り返して適用すると交差項が $mn$ 倍されます。

<!-- proof-start -->
### 証明

$q(\gamma)=\deg\gamma$ とします。[射の次数](#def-ec4-degree)で確認した合成則と[倍数写像の次数](#thm-ec4-multiplication-degree)から $q([m]\gamma)=m^2q(\gamma)$ です。[平行四辺形則](#lem-ec4-x-difference)を用いて $B(u,v)=q(u+v)-q(u)-q(v)$ と置けば

$$
q(u+v)+q(u-v)=2q(u)+2q(v)
$$

が成立します。これから

$$
\begin{aligned}
B(u+v,w)+B(u-v,w)
&=2B(u,w),\\
B(u+v,w)-B(u-v,w)
&=2B(v,w)
\end{aligned}
$$

を得ます。実際、最初の式は $q(u+v+w)+q(u-v+w)$ に平行四辺形則を適用し、$q(u+v)+q(u-v)$ を引いたものです。二番目は $u$ と $v$ を入れ替え、$q(u-v)=q(v-u)$ を使って同じ操作をしたものです。

二式を加えて $2B(u+v,w)=2B(u,w)+2B(v,w)$。値域は整数なので両辺を2で割れます。従って $B$ は第1変数で加法的です。$B$ は対称なので第2変数でも加法的です。とくに $B([m]\alpha,[n]\beta)=mnB(\alpha,\beta)$。ここで

$$
q([m]\alpha+[n]\beta)
=q([m]\alpha)+B([m]\alpha,[n]\beta)+q([n]\beta)
$$

と展開すれば結論です。$\square$
<!-- proof-end -->

**後で何に使うか。** $\pi$ が次数 $q$ の自己準同型なら $\deg([m]-[n]\pi)$ は $m,n$ の二次形式です。その非負性が、有限体の点数に対するHasse評価の核心になります。$\pi$ の具体的な意味と点数との関係はEC7・EC8で確かめます。

## 4. 双対写像を「逆」の代わりに作る

同種写像は有限個の点を一つにまとめるので、普通の逆写像はありません。しかし同種写像 $\phi$ の後に別の写像を施して、$[d]$ にすることはできます。そこで前節の因子の同型を使います。

非定数射 $\phi:E\to E'$ と点 $Q\in E'(K)$ に対し、$\phi^{-1}(Q)$ の点には局所パラメータの引き戻しから定まる**重複度** $e_P$ を付けます。引き戻し因子は

$$
\phi^*((Q))=\sum_{\phi(P)=Q} e_P(P),\qquad
\sum_{\phi(P)=Q}e_P=\deg\phi.
$$

重複度を忘れると非分離的な場合に式が崩れます。

<a id="def-ec4-dual"></a>

<!-- formal-statement-start -->
> **定義（双対同種写像）**  
> 代数閉体 $K$ 上の同種写像 $\phi:E\to E'$ に対し、次数0の因子 $\phi^*((Q)-(O'))$ に[因子の和](#lem-ec4-divisor-sum)を適用して得る点を $\widehat\phi(Q)\in E(K)$ と定める。すなわち
>
$
\widehat\phi(Q)=
\sum_{\phi(P)=Q}[e_P]P-\sum_{\phi(T)=O'}[e_T]T.
$
>
> この写像を $\phi$ の**双対同種写像**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ec4-dual -->
**定義の確認**。恒等写像なら各点 $Q$ の逆像は $Q$ ただ一つで重複度1、$O$ の逆像は $O$ です。よって $\widehat{[1]}(Q)=Q-O=Q$（右辺は群の減法）です。また $Q=O'$ の場合は二つの和が完全に相殺して $\widehat\phi(O')=O$。原点保存を式から確かめられます。
<!-- definition-example-end -->

<a id="thm-ec4-dual-degree"></a>

<!-- formal-statement-start -->
> **定理（双対同種写像の合成と次数）**  
> $K$ 上の非特異楕円曲線間の同種写像 $\phi:E\to E'$ を次数 $d\ge1$ とする。上の $\widehat\phi:E'\to E$ は原点を保つ同種写像であり
>
$
\widehat\phi\circ\phi=[d]_E,\qquad
\phi\circ\widehat\phi=[d]_{E'},\qquad
\deg\widehat\phi=d
$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

各繊維は $\ker\phi$ の平行移動です。繊維の全点を重複度付きで足すと、核に由来する部分が差で消え、$[d]P$ だけ残ります。写像の正則性は、有限射の繊維を重複度込みで対称に扱うことから確認します。

<!-- proof-start -->
### 証明

**(1) 正則性と準同型性。** 有限射の繊維は、次数 $d$ の有効因子として変化します。これを点の順序によらず記録する空間を $\operatorname{Sym}^d(E)$ と書きます。有限射が滑らかな曲線間の射なので、局所付値環上では有限自由加群になり、各繊維の重複度付き根はその行列の特性多項式の係数（対称式）で正則に変化します。よって $Q\mapsto\phi^*((Q))$ は $E'\to\operatorname{Sym}^d(E)$ の射です。点の和を取る写像 $E^d\to E$ は[加法の正則性](../EC2/index.md#lem-ec2-specialization)により射で、順序に依存しないので対称積を通じて射を与えます。従って定義した $\widehat\phi$ は射です。

また引き戻し $\phi^*$ は主因子を主因子へ、因子の和を和へ送ります。従って $\operatorname{Pic}^0(E')\to\operatorname{Pic}^0(E)$ の群準同型です。[因子類と点の同型](#lem-ec4-divisor-sum)を両側に適用したものが $\widehat\phi$ なので、$\widehat\phi$ は群準同型であり $\widehat\phi(O')=O$ です。

**(2) 合成の等式。** $K_0=\ker\phi$、$h=\#K_0$ とし、繊維における共通の重複度を $e$ とします。$\phi$ は群準同型なので、$Q=\phi(P)$ の繊維は $P+K_0$ です。群の平行移動は局所環の同型なので、重複度は同じで $d=eh$ です。定義式から

$$
\begin{aligned}
\widehat\phi(\phi(P))
&=\sum_{T\in K_0}[e](P+T)-\sum_{T\in K_0}[e]T\\
&=[eh]P=[d]P.
\end{aligned}
$$

この等式はすべての $P$ で成り立ちます。さらに $\phi$ は全射であり、$\phi\circ[d]=[d]\circ\phi$ だから

$$
\phi\widehat\phi\phi=\phi[d]=[d]\phi
$$

より $\phi\widehat\phi=[d]$ が従います。

**(3) 次数。** $[d]=\widehat\phi\circ\phi$ は $d\ge1$ で非定数なので $\widehat\phi$ も非定数です。[次数の定義で確認した合成則](#def-ec4-degree)と[倍数写像の次数](#thm-ec4-multiplication-degree)から

$$
(\deg\widehat\phi)\,d=\deg[d]=d^2.
$$

$d>0$ で割れば $\deg\widehat\phi=d$ です。$\square$
<!-- proof-end -->

双対は「一対一に戻す逆射」ではありません。$\deg\phi>1$ なら $\widehat\phi\phi=[d]$ であり、恒等写像ではないからです。

## 5. 有限位数点と標数

整数 $n\ge1$ の倍数写像の核を調べます。群の元として $[n]P=O$ となる点は有限位数であり、$E[n]$ の構造を理解すると同種写像の核や次数を具体的に数えられます。

<a id="def-ec4-torsion"></a>

<!-- formal-statement-start -->
> **定義（n-torsion）**  
> 代数閉体 $K$ 上の楕円曲線 $E$ と整数 $n\ge1$ に対し
>
$$
E[n]=\ker([n]:E(K)\to E(K))=\{P:[n]P=O\}
$$
>
> を $n$-torsion 部分群と呼ぶ。$E(k)[n]=E[n]\cap E(k)$ は $k$-有理な $n$-torsion 点の集合であり、$E[n]$ 全体とは一般に異なる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ec4-torsion -->
**定義の確認**。標数が2でないとき $E:y^2=x^3-x$ の $y=0$ の有限点は $(-1,0),(0,0),(1,0)$ です。[EC2の縦接線分岐](../EC2/index.md#def-ec2-chord-tangent-addition)より、これらを2倍すると $O$ です。加えて $O$ 自身が2で零になるので、$E[2]$ には少なくとも4点あります。非特異性は $\Delta=64\ne0$（標数2以外でも標数が2を割らない場合に成立）で確かめられます。
<!-- definition-example-end -->

分離性を測るには、局所パラメータの微分が役立ちます。一般Weierstrass曲線の非零な正則微分は、有限点で

$$
\omega=\frac{dx}{2y+a_1x+a_3}
$$

と書けます。分母が零になる点では曲線方程式の微分を使い、$x$ でなく $y$ を局所座標に取り直します。$O$ では $t=-x/y$ を使い、$\omega$ が零を持たないことを確かめます。より概念的には[滑らかな平面三次の標準束](../../AG/AG3-11/index.md#prop-ag3-11-canonical-sections)が自明で、非零正則微分は零を持ちません。

点の平行移動で $\omega$ を引き戻しても非零正則微分になるので、元の $\omega$ の非零定数倍です。この定数は移動する点に正則に依存しますが、射影曲線から $\mathbb G_m$ への正則関数は定数です。原点で係数が1なので、$\omega$ は平行移動不変です。従って加法射 $m:E\times E\to E$ で

$$
m^*\omega=\operatorname{pr}_1^*\omega+\operatorname{pr}_2^*\omega,
\qquad [n]^*\omega=n\omega
$$

が成立します。後者は前者を $n$ 回繰り返して得られます。係数 $n$ は体 $K$ の元として読んでください。

<a id="thm-ec4-torsion-structure"></a>

<!-- formal-statement-start -->
> **定理（標数とtorsionの構造）**  
> $K$ を標数 $p\ge0$ の代数閉体、$E/K$ を非特異楕円曲線、$n\ge1$ とする。$p\nmid n$（標数0の場合は全ての $n$）なら
>
$$
E[n]\simeq(\mathbb Z/n\mathbb Z)^2,\qquad \#E[n]=n^2.
$$
>
> 標数 $p>0$ では $[p]$ は非分離的で、$E[p]$ は $\{O\}$ または $\mathbb Z/p\mathbb Z$ に同型である。
<!-- formal-statement-end -->

### 証明の見取り図

$[n]^*\omega=n\omega$ が零かどうかで分離性を判定します。分離的同種写像の各繊維は、局所微分が消えないため重複度1です。次数 $n^2$ と核の点数が一致した後、素数冪ごとの有限可換群の構造を決定します。

<!-- proof-start -->
### 証明

**(1) 分離性。** $\omega$ はどこでも零を持たず、$[n]^*\omega=n\omega$ です。$p\nmid n$ なら右辺は非零なので関数体拡大は分離的です。分離的な同種写像 $\phi$ に対して $\phi^*\omega'=c\omega$（$c\ne0$）もどこでも零を持ちません。もし点 $P$ に分岐指数 $e>1$ があれば、局所パラメータで $t'=u t^e+\cdots$ と書いたとき $d(t')$ は少なくとも1位の零を持ちます。これは $\phi^*\omega'$ の非消滅性と矛盾します。よって各点の分岐指数は1です。

有限射の繊維について、重複度の和は次数です。核の重複度がすべて1なので

$$
\#E[n]=\deg[n]=n^2
$$

です。

**(2) 群構造。** $n=\prod_i\ell_i^{r_i}$ と素因数分解します。$\ell\ne p$ を固定し、$H_r=E[\ell^r]$ と書きます。$H_1$ は位数 $\ell^2$ で、全ての元が $\ell$ 倍で零となるため、$\mathbb F_\ell$ 上の二次元ベクトル空間です。一次独立な二点 $P_1,Q_1$ を取れます。

$r\ge2$ に対し、$[\ell]:H_r\to H_{r-1}$ の核は $H_1$ です。従って像の点数は

$
\frac{\#H_r}{\#H_1}=\frac{\ell^{2r}}{\ell^2}
=\ell^{2(r-1)}=\#H_{r-1}.
$

ゆえに $[\ell]$ は全射です。この全射性を $r-1$ 回使って、$P_r,Q_r\in H_r$ を

$
[\ell^{r-1}]P_r=P_1,\qquad [\ell^{r-1}]Q_r=Q_1
$

となるように選べます。二点は共に位数 $\ell^r$ です。関係 $[a]P_r+[b]Q_r=O$ を仮定して $[\ell^{r-1}]$ を作用させると

$
[a]P_1+[b]Q_1=O
$

です。一次独立性から $a,b$ は共に $\ell$ で割り切れます。$a=\ell a_1,b=\ell b_1$ として元の関係へ $[\ell^{r-2}]$ を作用させると $[a_1]P_1+[b_1]Q_1=O$、従って $a_1,b_1$ も $\ell$ で割り切れます。この操作を繰り返せば $a,b$ は $\ell^r$ で割り切れます。よって $P_r,Q_r$ は $\ell^{2r}$ 個の相異なる和を作り、それが $H_r$ の全点です。

$
E[\ell^r]\simeq(\mathbb Z/\ell^r\mathbb Z)^2.
$

互いに素な素数冪ごとの成分を整数のBézout等式で射影し、中国剰余定理で合わせれば $(\mathbb Z/n\mathbb Z)^2$ になります。

**(3) $p$-torsion。** $[p]^*\omega=p\omega=0$ なので $[p]$ は非分離的です。しかし $\deg[p]=p^2$ は変わりません。非分離度は少なくとも $p$ なので、分離次数、すなわち幾何学的な核の点数は高々 $p$ です。核の点数は $p$ の冪であり、$[p]$ により消される有限可換群です。従って $\#E[p]=1$ または $p$ で、それぞれ記述した群になります。$\square$
<!-- proof-end -->

**標数2の確認**。$E:y^2+y=x^3$ は[EC1の非特異例](../EC1/index.md#thm-ec1-discriminant-criterion)です。有限点の反転は $(x,y)\mapsto(x,y+1)$ なので有限点では $P=-P$ は成立しません。よって $E[2]=\{O\}$。それでも $\deg[2]=4$ であり、非分離的な写像で「次数＝幾何学的核の点数」と誤ってはいけないことが具体的に分かります。

## 6. 自己準同型の環と次数2の実例

同じ曲線 $E$ へ戻る写像同士なら、点ごとの足し算だけでなく、続けて適用する合成もできます。二種類の演算をまとめて扱えば、倍数写像のほかにどのような自己写像が存在するかを調べられます。

<a id="def-ec4-endo-ring"></a>

<!-- formal-statement-start -->
> **定義（楕円曲線の自己準同型環）**  
> $K$ 上の楕円曲線 $E$ について、原点を保つ射 $E\to E$（零写像を含む）の集合を $\operatorname{End}(E)$ とする。和と積をそれぞれ

$
(\alpha+\beta)(P)=\alpha(P)+\beta(P),
\qquad
\alpha\beta=\alpha\circ\beta
$

> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ec4-endo-ring -->
**定義の確認**。$[2]+[3]=[5]$ は $P$ に適用すると $[2]P+[3]P=[5]P$ です。$[2][3]=[6]$ は $[2]([3]P)=[6]P$ です。零写像は加法の単位元、$[1]$ は合成の単位元です。逆元 $-\alpha=[-1]\circ\alpha$ も射です。加法が可換、合成が結合的で分配律を満たすので環になります。任意の異なる自己準同型の合成が可換とはここでは仮定しません。
<!-- definition-example-end -->

[EC3の格子と曲線の群同型](../EC3/index.md#thm-ec3-group-uniformization)から、複素格子 $\Lambda\subset\Lambda'$ に対する

$$
\mathbb C/\Lambda\longrightarrow\mathbb C/\Lambda',
\qquad [z]_\Lambda\longmapsto[z]_{\Lambda'}
$$

は核 $\Lambda'/\Lambda$ を持ちます。たとえば $\Lambda=\mathbb Z+i\mathbb Z$、$\Lambda'=\mathbb Z+\frac{i}{2}\mathbb Z$ なら包含の指数は2で、核は $[0]_\Lambda,[i/2]_\Lambda$。複素解析ではこの写像は分離的なので次数2の同種写像です。この具体例を代数的な座標式に直します。

<a id="prop-ec4-two-isogeny"></a>

<!-- formal-statement-start -->
> **命題（有理2位数点から作る次数2同種写像）**  
> 体 $k$ の標数は2ではないとし、$a,b\in k$ は次を満たすとする。

$
b(a^2-4b)\ne0
$

> 次の非特異曲線を考える。
>
$
> E:y^2=x^3+ax^2+bx,\qquad
> E':Y^2=X^3-2aX^2+(a^2-4b)X
$
>
> に対し、$x\ne0$ では
>
$
\phi(x,y)=
\left(x+a+\frac b x,\quad y\left(1-\frac b{x^2}\right)\right)
$
>
> と定め、$\phi(O)=O'$、$\phi(0,0)=O'$ と延長すると、$\phi:E\to E'$ は分離的な次数2同種写像で、$\ker\phi=\{O,(0,0)\}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

二曲線の非特異性、$x=0$ における極の次数、写像の代入検算、関数体の次数を順に確かめます。分母があるからといって $(0,0)$ を定義域から除外しません。

<!-- proof-start -->
### 証明

**(1) 曲線の非特異性。** $E$ の右辺は $x(x^2+ax+b)$ で、$x=0$ と二次式の根が異なるには $b\ne0$、二次式の根が異なるには $a^2-4b\ne0$ が必要十分です。$E'$ では係数が $a'=-2a,b'=a^2-4b$ なので、その非特異性条件は

$$
b'((a')^2-4b')=(a^2-4b)\cdot16b\ne0.
$$

標数が2でないことを使用しました。

**(2) 曲線式への代入。** $S=x^2+ax+b$ と置きます。元の曲線式から $y^2=xS$。$X=S/x$ であり、

$$
(X-a)^2-4b
=\frac{(x^2+b)^2-4bx^2}{x^2}
=\frac{(x^2-b)^2}{x^2}.
$$

したがって

$$
\begin{aligned}
X^3-2aX^2+(a^2-4b)X
&=X((X-a)^2-4b)\\
&=\frac{S(x^2-b)^2}{x^3}\\
&=\frac{y^2(x^2-b)^2}{x^4}=Y^2.
\end{aligned}
$$

よって $x\ne0$ の範囲で像は $E'$ 上にあります。

**(3) 二つの例外点。** $x=0$ なら曲線上の点は $(0,0)$ だけです。ここでは $\partial(y^2-x^3-ax^2-bx)/\partial x=-b\ne0$ なので $y$ が局所パラメータです。$y^2=x(b+ax+x^2)$ から $x=b^{-1}y^2+\cdots$。したがって $X=b/x+\cdots$ は2位の極、$Y=-by/x^2+\cdots$ は3位の極となります。射影座標 $[X:Y:1]$ を $Y$ で割ると $[0:1:0]=O'$ に近づきます。$O$ 付近でも $x$ は2位、$y$ は3位の極で、$X\sim x,Y\sim y$ なので像は $O'$ です。両点で射として延長できます。

**(4) 次数・核。** $X=(x^2+ax+b)/x$ は既約な次数2の有理関数（$b\ne0$）です。第1節の関数体の塔から $\deg\phi=2$ です。$X$ が無限大になるのは $x=0$ と $x=\infty$、すなわち $(0,0),O$ だけです。従って核はこの二点で、核の点数は次数2に一致します。各繊維は核の平行移動で、分離性を得ます。[原点を保つ非定数射は準同型となる定理](#thm-ec4-morphism-hom)から群準同型です。$\square$
<!-- proof-end -->

具体例 $a=0,b=-1$ では

$$
E:y^2=x^3-x,\quad E':Y^2=X^3+4X,\quad
(X,Y)=\left(x-\frac1x,\ y\left(1+\frac1{x^2}\right)\right).
$$

$E$ の $(1,0)$ と $(-1,0)$ はどちらも $(0,0)\in E'$ へ写ります。核は $\{O,(0,0)\}$ ですが、像の一点には核の個数だけ逆像があることを手で確認できます。

## 7. 演習：次数と核を混同しないために

### A1. 二位数点を直接列挙する

$E:y^2=x^3-x$ を $\mathbb C$ 上で考える。$E[2]$ を全て挙げ、その位数を確認せよ。

- Level: A
- ID: EC4-A1

<!-- solution-start -->
### 詳細解答

[n-torsion](#def-ec4-torsion)の定義から $[2]P=O$ を調べます。短いWeierstrass形で有限点の反転は $(x,y)\mapsto(x,-y)$ だから $P=-P$ は $2y=0$、すなわち $y=0$。曲線式から

$$
0=x^3-x=x(x-1)(x+1)
$$

で $x=0,1,-1$ です。従って

$$
E[2]=\{O,(0,0),(1,0),(-1,0)\}.
$$

各有限点は縦接線を持つので2倍して $O$、$O$ も2倍すると $O$ です。標数0なので[構造定理](#thm-ec4-torsion-structure)の $|E[2]|=2^2=4$ と一致します。
<!-- solution-end -->

### A2. 三倍写像の次数

任意標数の非特異楕円曲線で $\deg[3]$ を平行四辺形則から計算し、標数3の場合に $\#E[3]=9$ と断定できない理由を述べよ。

- Level: A
- ID: EC4-A2

<!-- solution-start -->
### 詳細解答

$\alpha=[2],\beta=[1]$ を[平行四辺形則](#lem-ec4-x-difference)へ入れると

$$
\deg[3]+\deg[1]=2\deg[2]+2\deg[1].
$$

$\deg[2]=4,\deg[1]=1$ を代入して $\deg[3]=8+2-1=9$ です。しかし標数3では $[3]^*\omega=3\omega=0$ なので $[3]$ は非分離的です。各点の重複度を1と数えることができず、核の**幾何学的点数**は1または3です。[標数とtorsionの定理](#thm-ec4-torsion-structure)と矛盾しません。
<!-- solution-end -->

### A3. 二次同種写像の点の像

$E:y^2=x^3-x$ から $E':Y^2=X^3+4X$ への[次数2同種写像](#prop-ec4-two-isogeny)で、$(1,0),(-1,0)$ と $(0,0)$ の像を求め、核と区別せよ。

- Level: A
- ID: EC4-A3

<!-- solution-start -->
### 詳細解答

式の $a=0,b=-1$ を使うと $X=x-1/x,Y=y(1+1/x^2)$ です。$x=1$ なら $(X,Y)=(1-1,0)=(0,0)$、$x=-1$ なら $X=-1+1=0$ で同じ像です。どちらも $E'$ 上にあり、$0=0^3+4\cdot0$ を満たします。

一方 $(0,0)$ ではこの式の分母が零です。[命題の延長計算](#prop-ec4-two-isogeny)により $\phi(0,0)=O'$ です。従って核は $(0,0)$ と $O$ だけであり、$(\pm1,0)$ は**核ではなく**像が共通の二点です。
<!-- solution-end -->

### A4. 格子から次数2を作る

$\Lambda=\mathbb Z+i\mathbb Z$、$\Lambda'=\mathbb Z+(i/2)\mathbb Z$ とする。$[z]_\Lambda\mapsto[z]_{\Lambda'}$ が良定義で、核の位数2の群準同型であることを示せ。

- Level: A
- ID: EC4-A4

<!-- solution-start -->
### 詳細解答

$\Lambda\subset\Lambda'$ なので、$z-w\in\Lambda$ なら $z-w\in\Lambda'$ です。従って代表元の選び方によらず写像は良定義です。また

$$
[z+w]_{\Lambda'}=[z]_{\Lambda'}+[w]_{\Lambda'}
$$

だから群準同型です。核は $z\in\Lambda'$ の類全体、すなわち $\Lambda'/\Lambda$ です。$z=m+n(i/2)$ の $n$ が偶数なら $\Lambda$ の元、奇数なら $i/2+\Lambda$ なので

$$
\ker\phi=\{[0]_\Lambda,[i/2]_\Lambda\}.
$$

複素数上では分離的なので次数も2です。この計算は[EC3の一様化](../EC3/index.md#thm-ec3-group-uniformization)を使って曲線側の同種写像に移せます。
<!-- solution-end -->

### B1. 二点の因子の縮約

任意の $P,Q\in E(K)$ について $(P)+(Q)\sim(P+Q)+(O)$ を、割線と縦線の主因子を実際に引いて示せ。

- Level: B
- ID: EC4-B1

<!-- solution-start -->
### 詳細解答

割線（$P=Q$ では接線）の第三交点を $R$ とすると、[EC2の加法](../EC2/index.md#def-ec2-chord-tangent-addition)で $P+Q=-R$ です。直線式 $L$ と無限遠直線 $Z$ の比から

$$
(P)+(Q)+(R)-3(O)\sim0
$$

となります。一方縦線を用いると

$$
(R)+(-R)+(O)-3(O)\sim0.
$$

最初の因子から二番目を引けば

$$
(P)+(Q)-(-R)-(O)\sim0.
$$

$-R=P+Q$ なので $(P)+(Q)\sim(P+Q)+(O)$ です。単に点の和を数えるのではなく、どちらの主因子も直線と三次曲線の交点を重複度込みで数えた点が重要です。
<!-- solution-end -->

### B2. 標数2で次数と核が違う例

$\mathbb F_2$ 上の $E:y^2+y=x^3$ を代数閉包上で考える。$\#E[2]$ と $\deg[2]$ を求め、違いを説明せよ。

- Level: B
- ID: EC4-B2

<!-- solution-start -->
### 詳細解答

一般Weierstrass形では反転が $(x,y)\mapsto(x,-y-a_1x-a_3)$ であり、この曲線は $a_1=0,a_3=1$ です。標数2で $-y=y$ なので反転は $(x,y)\mapsto(x,y+1)$。有限点で $P=-P$ なら $y=y+1$ が必要ですが成立しません。$O=-O$ のみですから $E[2]=\{O\}$、$\#E[2]=1$。

他方[倍数写像の次数](#thm-ec4-multiplication-degree)で $\deg[2]=4$ です。実際 $b_2=b_4=b_8=0,b_6=1$ となり、第3節の式は $x([2]P)=x^4$ です。$x\mapsto x^4$ は標数2で非分離的な次数4の有理関数。分離的な点を4個数える代わりに、繊維の重複度を4として数える必要があります。
<!-- solution-end -->

### B3. 次数の交差項を検算する

同じ楕円曲線の $\alpha=[2]$、$\beta=[3]$ に対して $B(\alpha,\beta)$ を求め、$\deg(\alpha-\beta)$ と $\deg(\alpha+\beta)$ の双方を検算せよ。

- Level: B
- ID: EC4-B3

<!-- solution-start -->
### 詳細解答

$[2]+[3]=[5]$、$[2]-[3]=[-1]$ です。従って

$$
B([2],[3])=\deg[5]-\deg[2]-\deg[3]
=25-4-9=12.
$$

[二次性](#thm-ec4-degree-quadratic)を $m=1,n=-1$ として用いると

$$
\deg([2]-[3])=4-12+9=1=\deg[-1].
$$

$m=n=1$ なら $\deg([2]+[3])=4+12+9=25=\deg[5]$ です。二次式の交差項は $2\cdot2\cdot3=12$ に相当します。
<!-- solution-end -->

### C1. Hasse評価の二次形式の準備

$E/K$ の自己準同型 $\pi$ が $\deg\pi=q>0$ を満たすとする。$a=1+q-\deg([1]-\pi)$ とおくとき、任意の整数 $m,n$ に対して

$$
\deg([m]-[n]\pi)=m^2-amn+qn^2
$$

を示し、$|a|\le2\sqrt q$ を導け。有限体上の点数との関係はここでは仮定しないこと。

- Level: C
- ID: EC4-C1

<!-- solution-start -->
### 詳細解答

[次数の二次性](#thm-ec4-degree-quadratic)で $\alpha=[1],\beta=\pi$ とします。$\deg[1]=1,\deg\pi=q$ です。$m=1,n=-1$ とした場合、

$$
\deg([1]-\pi)=1+q-B([1],\pi).
$$

定義した $a=1+q-\deg([1]-\pi)$ と比較すると $B([1],\pi)=a$。一般の $m,-n$ へ代入すると

$$
\deg([m]-[n]\pi)=m^2-amn+qn^2.
$$

次数は非負なので右辺は全ての整数 $m,n$ で非負です。$n\ne0$ として $t=m/n$ とおくと、全ての有理数 $t$ について $t^2-at+q\ge0$。この多項式が実数 $t$ のどこかで負なら連続性から近くの有理数でも負になり矛盾するので、実数全体で非負です。平方完成すれば

$$
t^2-at+q=(t-a/2)^2+q-a^2/4.
$$

最小値を $t=a/2$ で取るので $q-a^2/4\ge0$、従って $a^2\le4q$ です。EC7・EC8では $\pi$ を有限体のFrobeniusとし、$\deg([1]-\pi)$ を固定点の個数と結び付けます。
<!-- solution-end -->

## 8. 次の章への接続

本章では、有理関数の極・因子を使って同種写像の群準同型性、倍数写像の次数、次数の二次性と双対、標数ごとの有限位数点を結びました。次数を単なる核の点数と呼ぶのではなく、**非分離性があれば重複度まで数える**ことが重要です。EC5では有理数体上の有限位数点を具体的に調べ、EC7・EC8では有限体上のFrobeniusを次数の二次形式へ代入します。