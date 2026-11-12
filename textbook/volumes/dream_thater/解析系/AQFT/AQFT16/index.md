# AQFT16 split propertyと緩衝領域

[AQFT15のType III因子に対する鋭いテンソル分解の障害](../AQFT15/index.md#prop-aqft15-typei-tensor-obstruction)は、局所von Neumann環 $M(O)$ 自身を $B(K)\otimes I$ と書けない、という主張でした。これは、**少し広い領域 $O_2$ の中に、狭い領域 $O_1$ を包むType I因子を置けない**という意味ではありません。

本講の問いは「領域の境界に緩衝帯を残したとき、内側の観測量と外側の観測量をどこまでテンソル積として扱えるか」です。内外を厳密に切り離した状態が真空そのものであるとは仮定しません。

## 1. 二つの領域を分けて考える

4次元Minkowski時空では計量を $(-,+,+,+)$ とします。[AQFT1で定義した標準double cone](../AQFT1/index.md#def-aqft1-double-cone)を本講では $D_R$ の代わりに $O_R$ と書き、$R>0$ に対して

$$
O_R=\{(t,\boldsymbol x)\in\mathbb R^{1+3}:|t|+\|\boldsymbol x\|<R\}
$$

を考えます。$0<r<R$ なら、$\overline{O_r}$ はコンパクトで、しかも $O_R$ の内部に含まれます。これを $O_r\Subset O_R$ と記します。実際、閉包上で $|t|+\|\boldsymbol x\|\le r<R$ だからです。差 $R-r$ が幾何学的な**緩衝領域**の大きさを表します。

固定した表現のHilbert空間 $H$ 上で、[AQFT9の局所von Neumann環](../AQFT9/index.md#def-aqft9-local-vn-net)を $M(O)$ と記します。[AQFT2の包含単調性](../AQFT2/index.md#def-aqft2-isotony)により

$$
M(O_r)\subset M(O_R)\subset B(H).
$$

外側の領域 $O_R$ と空間的に分離した領域の観測量は、[AQFT9の局所性の継承](../AQFT9/index.md#thm-aqft9-isotony-locality)によって $M(O_R)'$ に入ります。従って $M(O_R)'$ は、少なくとも外部観測量の候補を含む可換子です。ただしHaag双対性を仮定しない限り、これを特定の補領域の局所von Neumann環と同一視しません。

この二重の包含が重要です。いきなり $M(O_r)$ と $M(O_r)'$ を独立部分系にすると、[AQFT15の障害](../AQFT15/index.md#prop-aqft15-typei-tensor-obstruction)が再び現れます。

## 2. split inclusionの定義

von Neumann環の間に挟まる、中心がスカラーで最小射影を持つType I因子を**中間因子**として探します。ここで[VN7の因子の型分類](../../VN/VN7/index.md#def-vn7-factor-type-classification)を使います。中間因子は内側の環自身と同じである必要はなく、外側の環とも同じである必要はありません。

<a id="def-aqft16-split-inclusion"></a>

<!-- formal-statement-start -->
> **定義（split inclusionとnetのsplit property）**  
> $H$ をHilbert空間、$M_1\subset M_2\subset B(H)$ を単位元を共有するvon Neumann環とする。この包含が **split** であるとは、Type I因子 $N\subset B(H)$ が存在して
>
$$
M_1\subset N\subset M_2
$$
>
> を満たすことをいう。局所von Neumann net $O\mapsto M(O)$ が指定した領域族で **split property** を満たすとは、全ての $O_1\Subset O_2$ に対して $M(O_1)\subset M(O_2)$ がsplitであることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft16-split-inclusion -->
### 直接例：三段階で因子を挟む

**定義の確認**：以下の包含・中心・最小射影を順に検算し、Type I中間因子の存在を確かめます。

$H=H_1\otimes H_2\otimes H_3\otimes H_4$、$H_1=\mathbb C^2$、$H_2=\mathbb C^3$、$H_3=H_4=\mathbb C^2$ と置き、$I_j$ を $H_j$ の恒等作用素とします。

$$
\begin{aligned}
M_1&=B(H_1)\otimes I_2\otimes I_3\otimes I_4,\\
N&=B(H_1\otimes H_2)\otimes I_3\otimes I_4,\\
M_2&=B(H_1\otimes H_2\otimes H_3)\otimes I_4.
\end{aligned}
$$

$M_1\subset N\subset M_2$ は各恒等作用素を残りの因子に挿入する包含で、両方とも真の包含です。$K=H_1\otimes H_2$、$L=H_3\otimes H_4$ と再結合すれば $N=B(K)\otimes I_L$ です。[全有界作用素環の因子性](../../VN/VN7/index.md#thm-vn7-bh-factor)をこの表現に適用すると、$N$ の中心は $\mathbb CI_H$ です。

次に単位ベクトル $u\in K$ を取り、$p=|u\rangle\langle u|\otimes I_L\in N$ と置きます。$p$ は周囲の $B(H)$ で階数1とは限りませんが、**$N$ の中では最小射影**です。実際、$0\ne q\in N$ が $q\le p$ を満たす射影なら、$q=q_K\otimes I_L$ で、$\operatorname{Ran}(q_K)\subset\mathbb Cu$ となります。従って $q_K=|u\rangle\langle u|$、$q=p$ です。これは[VN7の最小射影の定義](../../VN/VN7/index.md#def-vn7-minimal-projection)を直接確かめています。中心がスカラーで最小射影を持つため、[VN7の型分類](../../VN/VN7/index.md#def-vn7-factor-type-classification)より $N$ はType I因子です。従ってこの包含はsplitです。

これは抽象的な包含の直接例であり、相対論的な局所netの存在証明ではありません。必要なのは、**内側の環そのものがType Iでなくても、間にType Iを挟める**という定義の仕組みです。
<!-- definition-example-end -->

「splitである」というのは、この一組の環についての存在主張です。これに対して「netがsplit propertyを満たす」は、領域の全ての適切な二重包含についての主張です。一組で成功したから全領域で成功するわけではありません。

## 3. Type I中間因子からテンソル座標を作る

[split inclusion](#def-aqft16-split-inclusion)から空間的分解を使うには、まず**Type I因子を表現しているHilbert空間がどう分解するか**を確かめなければなりません。証明の出発点は、[VN7の最小射影](../../VN/VN7/index.md#def-vn7-minimal-projection)です。

<a id="thm-aqft16-typei-spatial-form"></a>

<!-- formal-statement-start -->
> **定理（Type I因子の空間的表示）**  
> $N\subset B(H)$ を単位的Type I因子、$H\ne\{0\}$ とする。このとき非零Hilbert空間 $K,L$ とユニタリ $U:H\to K\otimes L$ が存在し、
>
$$
UNU^*=B(K)\otimes I_L,\qquad
UN'U^*=I_K\otimes B(L)
$$
>
> を満たす。ここで可換子は $B(H)$ 内で取る。
<!-- formal-statement-end -->

### 証明の見取り図

最小射影 $e$ を選ぶと、隅の環 $eNe$ はスカラーだけです。そのため左イデアル $Ne$ から一つのHilbert空間 $K$ を作れます。もう一方の $L=eH$ は元の表現が持つ重複度です。$ae\otimes\xi\mapsto a\xi$ の内積を照合し、全空間に延長します。最後に $K$ 上の作用が既約であることを示して二重可換子を使います。

<!-- proof-start -->
### 証明

**(1) 最小射影と内積。** [VN7の因子の型分類](../../VN/VN7/index.md#def-vn7-factor-type-classification)によって、非零最小射影 $e\in N$ が存在します。$eNe$ は単位元を $e$ とするvon Neumann環です。もし $eNe$ に非スカラー元があれば、その実部または虚部に非スカラーな自己共役元が存在します。そのスペクトル射影の中には $0$ と $e$ のいずれでもないものがあり、$e$ の最小性に反します。従って $eNe=\mathbb Ce$ です。

左イデアル $Ne=\{ae:a\in N\}$ に、$e a^*b e=\langle ae,be\rangle_K e$ で複素内積を定めます。例えば

$$
\langle ae,ae\rangle_K e=e a^*a e=(ae)^*(ae).
$$

右辺が零なら $ae=0$ です。従って正定値であり、完備化を $K$ とします。$L=eH$ は $e\ne0$ から非零です。

**(2) 等長性と全射性。** 代数的テンソル積上で $V_0(ae\otimes\xi)=a\xi$（$\xi\in L$）と定めます。$\xi=e\xi$、$\eta=e\eta$ だから

$$
\begin{aligned}
\langle a\xi,b\eta\rangle_H
&=\langle\xi,e a^*b e\,\eta\rangle_H\\
&=\langle ae,be\rangle_K\langle\xi,\eta\rangle_L.
\end{aligned}
$$

よって $V_0$ は等長で、$V:K\otimes L\to H$ に延長できます。$V$ の像は $\overline{NeH}$ です。この閉部分空間は $N$ の各元とその随伴で不変です。また $C\in N'$ に対して $C(ae\xi)=ae(C\xi)$ となり、$N'$ でも不変です。その直交射影 $P$ は $N$ と $N'$ の両方と可換なので $P\in N\cap N'=Z(N)$ です。$eH\ne0$ より $P\ne0$、[VN7で定めた因子性](../../VN/VN7/index.md#def-vn7-factor)から $P=I$。従って $V$ は全射でユニタリです。

**(3) 左因子が全有界作用素環となる。** $a\in N$ に対し $V^*aV$ は $K$ の左乗法 $\lambda(a)(be)=abe$ と $L$ の恒等作用素のテンソル積です。左乗法が完備化に延長できるのは、$b\in N$ に対して

$$
\begin{aligned}
\|\lambda(a)(be)\|_K^2 e
&=e b^*a^*ab e\\
&\le\|a\|^2 e b^*b e
=\|a\|^2\|be\|_K^2e
\end{aligned}
$$

だからです。従って $\|\lambda(a)\|\le\|a\|$ であり、$\lambda$ は単位的 $*$-表現になります。$\lambda(e)K$ は $\mathbb Ce$ の1次元空間です。$T\in\lambda(N)'$ なら

$$
\lambda(e)Te=T\lambda(e)e=Te,
$$

ゆえに $Te=ce$ となります。全ての $a\in N$ に対して

$$
T(ae)=T\lambda(a)e=\lambda(a)Te=c\,ae.
$$

$Ne$ は $K$ で稠密なので $T=cI_K$ です。従って $\lambda(N)'=\mathbb CI_K$。

ここで $\lambda(N)$ 自身が弱作用素閉であることも確認します。$\lambda(a_i)\in\lambda(N)$ が $K$ 上で弱作用素収束して $S$ を極限に持つなら、任意の単純テンソルに関する行列係数を取ることで $\lambda(a_i)\otimes I_L\to S\otimes I_L$ が $K\otimes L$ 上で弱作用素収束します（有界な収束ネットであり、単純テンソルの線形結合は稠密です）。$V^*NV$ はvon Neumann環なので弱作用素閉です。よって $S\otimes I_L\in V^*NV=\lambda(N)\otimes I_L$。$L\ne\{0\}$ だから $S\in\lambda(N)$ です。

従って[二重可換子定理](../../VN/VN2/index.md#thm-vn2-bicommutant)により

$$
\lambda(N)=\lambda(N)''=(\mathbb CI_K)'=B(K),
\qquad V^*NV=B(K)\otimes I_L.
$$

この等式の可換子を取れば $V^*N'V=I_K\otimes B(L)$。$U=V^*$ と置けば主張を得ます。$\square$
<!-- proof-end -->

この構成で $K$ は中間因子の**作用する側**、$L$ はその作用の**重複度側**です。$N$ がType Iであるために得た座標であり、内側のType III環を $B(K)$ 全体と同一視してはいません。

## 4. 外部の可換子とテンソル積包含

[可換子](../../VN/VN2/index.md#def-vn2-commutant)は包含を逆転します。$N\subset M_2$ なら、$M_2'\subset N'$ です。そこで内側 $M_1$ と外側の可換子 $M_2'$ を同時に表示できます。

ここで使う二つの演算を先に定めます。$A\subset B(K)$、$B\subset B(L)$ がvon Neumann環のとき、$A\bar\otimes B$ は、$K\otimes L$ 上の作用素 $a\otimes b$（$a\in A,b\in B$）の有限線形結合の**弱作用素閉包**、すなわち空間的von Neumannテンソル積です。また $M_1\vee M_2'$ は $M_1$ と $M_2'$ が生成する最小のvon Neumann環です。以下の「正規な $*$-同型」は、$*$ と積を保存する全単射で、写像と逆写像が超弱位相について連続であることを意味します。

<a id="thm-aqft16-split-tensor-inclusion"></a>

<!-- formal-statement-start -->
> **定理（split inclusionの内外テンソル積表示）**  
> $M_1\subset N\subset M_2\subset B(H)$ を単位的von Neumann環の包含とし、$N$ をType I因子とする。するとHilbert空間 $K,L$、ユニタリ $U:H\to K\otimes L$、von Neumann環 $A\subset B(K)$、$B\subset B(L)$ が存在して
>
$$
UM_1U^*=A\otimes I_L,\qquad
UM_2'U^*=I_K\otimes B
$$
>
> を満たす。さらに乗法写像は、空間的von Neumannテンソル積から結合環への正規な *-同型
>
$$
A\ \bar\otimes\ B\ \simeq\ M_1\vee M_2',
\quad a\otimes b\longmapsto
U^*(a\otimes b)U
$$
>
> を与える。$M_1\vee M_2'$ は二つの環が生成するvon Neumann環を表す。
<!-- formal-statement-end -->

### 証明の見取り図

[Type I因子の空間的表示](#thm-aqft16-typei-spatial-form)により中間因子とその可換子を別々のテンソル因子に置きます。内側は $N$ に、外側は $N'$ に含まれるため、それぞれの因子にのみ作用します。テンソル積の弱閉包を取れば結合環になります。

<!-- proof-start -->
### 証明

[Type I因子の空間的表示](#thm-aqft16-typei-spatial-form)から

$$
UNU^*=B(K)\otimes I_L,\qquad
UN'U^*=I_K\otimes B(L).
$$

$M_1\subset N$ より $UM_1U^*$ の元は全て $a\otimes I_L$ の形です。そのような $a$ 全体を $A$ とすれば、$a\mapsto a\otimes I_L$ は正規な *-同型であり、$A$ はvon Neumann環です。

$N\subset M_2$ なので $M_2'\subset N'$。同様に $UM_2'U^*=I_K\otimes B$ となる $B\subset B(L)$ が得られます。

$A$ と $B$ の代数的テンソル積 $A\odot B$ は、$B(K\otimes L)$ に $a\otimes b$ として忠実に作用します。その弱作用素閉包が**空間的von Neumannテンソル積** $A\bar\otimes B$ の定義です。一方、二つの環 $A\otimes I$ と $I\otimes B$ が生成する弱閉環も、積 $(a\otimes I)(I\otimes b)=a\otimes b$ の有限線形結合の弱閉包です。したがって両者は一致します。最後に $U^*$ で共役すれば

$$
U^*(A\bar\otimes B)U=M_1\vee M_2'
$$

であり、共役は正規な *-同型です。$\square$
<!-- proof-end -->

特に $0\ne a\in M_1$ と $0\ne b\in M_2'$ について、$UabU^*=a_K\otimes b_L\ne0$ です。両方とも非零ならテンソル積作用素は非零だからです。可換だからといって積が零になるような余計な代数的関係はありません。これが**内外の空間的独立性**です。

<a id="prop-aqft16-product-vector-state"></a>

<!-- formal-statement-start -->
> **命題（split表示における積ベクトル状態）**  
> 前定理の仮定の下で、任意の単位ベクトル $k\in K$ と $l\in L$ に対し、$\Psi=U^*(k\otimes l)$ は単位ベクトルであり、全ての $x\in M_1$ と $y\in M_2'$ について
>
$$
\langle\Psi,xy\Psi\rangle
=\langle\Psi,x\Psi\rangle\,
 \langle\Psi,y\Psi\rangle
$$
>
> が成立する。この状態は $M_1\vee M_2'$ 上で正規である。
<!-- formal-statement-end -->

### 証明の見取り図

同じユニタリのもとで $x$ は左、$y$ は右だけに作用します。積ベクトルの内積が積に分かれることを直接計算します。

<!-- proof-start -->
### 証明

[内外テンソル積表示](#thm-aqft16-split-tensor-inclusion)により $UxU^*=a\otimes I$、$UyU^*=I\otimes b$ と書けます。従って

$$
\begin{aligned}
\langle\Psi,xy\Psi\rangle
&=\langle k\otimes l,(a\otimes b)(k\otimes l)\rangle\\
&=\langle k,ak\rangle\,\langle l,bl\rangle\\
&=\langle\Psi,x\Psi\rangle\langle\Psi,y\Psi\rangle.
\end{aligned}
$$

$\|\Psi\|=\|k\|\|l\|=1$ であり、ベクトル状態は $B(H)$ 上で正規なので、その制限も正規です。$\square$
<!-- proof-end -->

この結果は**積になる状態が存在する**という主張です。選んだ真空ベクトル $\Omega$ がこの $\Psi$ に一致するとは言っていません。任意に指定した正規局所状態の組を同時に延長する一般論は、次講AQFT17で扱います。

## 5. 局所性だけからはsplitは出ない

[Einstein局所性](../AQFT2/index.md#def-aqft2-locality)は、空間的に分離した観測量が可換であることを要求します。一方splitは、その可換性を**空間的なテンソル座標**で実現する中間因子の存在を要求します。この追加条件は自動的には出ません。

次の例では $[0,1]$ にLebesgue測度を入れ、$L^2([0,1])$ 上の乗法作用素を $(M_fh)(s)=f(s)h(s)$ と定めます。$f\in L^\infty([0,1])$ なら $\|M_fh\|_2\le\|f\|_\infty\|h\|_2$ なので有界です。ここで変数 $s$ は区間 $[0,1]$ の点です。

<a id="prop-aqft16-commutation-not-split"></a>

<!-- formal-statement-start -->
> **命題（可換性はsplitを含意しない）**  
> $H=L^2([0,1])$ とし、$D$ を次の有界関数の乗法作用素環とする。
>
$$
D=\{M_f:f\in L^\infty([0,1])\}\subset B(H).
$$
>
> $D$ は可換なvon Neumann環だが、$D\subset D'$ をsplit inclusionにするType I中間因子は存在しない。
<!-- formal-statement-end -->

### 証明の見取り図

乗法作用素は互いに可換です。しかし $D$ は極大可換、すなわち $D'=D$ です。間に挟む環は $D$ 自身に限られ、その中心は自分自身でスカラーだけにはなりません。

<!-- proof-start -->
### 証明

乗法作用素は $M_fM_g=M_{fg}=M_gM_f$ を満たします。$T\in D'$ を取ります。特に各可測集合 $E$ の指示関数 $\mathbf1_E$ の乗法作用素と可換です。$g=T\mathbf1\in L^2([0,1])$ とすると

$$
T\mathbf1_E=T M_{\mathbf1_E}\mathbf1
=M_{\mathbf1_E}T\mathbf1=\mathbf1_E g.
$$

単関数の線形結合は $L^2$ に稠密なので、$T$ は稠密部分上で $g$ を掛ける作用素です。$\|T\mathbf1_E\|_2\le\|T\|\|\mathbf1_E\|_2$ より

$$
\int_E|g|^2\le\|T\|^2|E|
$$

が全ての可測 $E$ で成立します。$E=\{|g|>\|T\|+\varepsilon\}$ として矛盾を得るので、$g\in L^\infty$、$T=M_g\in D$ です。従って $D'=D$。可換子は[弱作用素閉](../../VN/VN2/index.md#prop-vn2-commutant-wot-closed)で、$D$ は単位元を持ち随伴に閉じているので、この等式から $D$ がvon Neumann環であることも分かります。

$D\subset N\subset D'=D$ なら $N=D$ しかありません。$D$ は可換で、例えば $M_{\mathbf1_{[0,1/2]}}$ は非スカラーな中心射影です。よって $D$ は因子でなく、Type I**因子**にもなりません。splitではありません。$\square$
<!-- proof-end -->

これは**可換性とsplitの論理的差**を示す作用素環の反例であり、Minkowski空間上の適切に離れたdouble coneを持つ局所netの反例ではありません。空間的分離や領域の正則性を追加しても、splitを得るには模型に応じた別の解析的条件が必要です。

また、Type III因子 $M$ に対し、同じ環を内側と外側に置いた包含 $M\subset M$ はsplitではありません。中間因子は $N=M$ に限られるのに、[VN7の因子の型分類](../../VN/VN7/index.md#def-vn7-factor-type-classification)から $M$ はType Iではないためです。ただしこの零幅の例は $O_1\Subset O_2$ という幾何学的条件を満たす例ではありません。

本講で証明したのは **splitを仮定した場合の構造** です。局所性、Haag双対性、真空の巡回分離性、Type III性のいずれかだけからsplitを結論することはありません。特定の自由場でsplitが成立する十分条件や、nuclearityとの関係は後の講義で別途確認します。

## 6. 演習と詳細解答

### Level A：包含とテンソル因子を確かめる

<a id="ex-aqft16-a01"></a>
#### AQFT16-A01 double coneの緩衝帯

$O_R=\{(t,\boldsymbol x):|t|+\|\boldsymbol x\|<R\}$ とする。$R=3$、$r=1$ について $O_r\Subset O_R$ を示し、$R=r$ では同じ主張が成立しない理由を述べよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $\overline{O_1}=\{(t,\boldsymbol x):|t|+\|\boldsymbol x\|\le1\}$ は閉かつ有界です。[Heine–Borelの定理](../../../基礎科目/F0/F0-00C1/index.md#thm-f0-00c1-02)を $\mathbb R^4$ に適用するとコンパクトです。この閉包の各点で $|t|+\|\boldsymbol x\|\le1<3$ だから $O_3$ に含まれます。よって $O_1\Subset O_3$。一方 $r=R$ なら $(R,0,0,0)\in\overline{O_R}$ であり、$|R|=R$ のため $(R,0,0,0)\notin O_R$。従って $\overline{O_R}\not\subset O_R$ です。
<!-- solution-end -->

<a id="ex-aqft16-a02"></a>
#### AQFT16-A02 中間因子の中心と最小射影

第2節の $N=B(H_1\otimes H_2)\otimes I_3\otimes I_4$ がType I因子であることを、中心と階数1射影の双方から確認せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $K=H_1\otimes H_2$、$L=H_3\otimes H_4$ とおけば $N=B(K)\otimes I_L$ です。なぜ可換子が右側だけに作用するかを行列単位で確認します。$K$ の正規直交基底を選び、その行列単位を $E_{ij}$ とすると、任意の $T\in B(K\otimes L)$ は $T=\sum_{i,j}E_{ij}\otimes T_{ij}$（$T_{ij}\in B(L)$）と表せます。$T$ が全ての $E_{kk}\otimes I_L$ と可換なら非対角成分は零であり、さらに $E_{ij}\otimes I_L$ と可換なら各対角成分は同じ $S\in B(L)$ です。従って $T=I_K\otimes S$、すなわち

$$
N'=I_K\otimes B(L),\qquad
N\cap N'=\mathbb CI_H.
$$

また単位ベクトル $u\in K$ に対し $p=|u\rangle\langle u|\otimes I_L$ は $N$ の非零射影です。$q\in N$ で $0\ne q\le p$ なら $q=q_K\otimes I_L$、$0\ne q_K\le|u\rangle\langle u|$。後者の像は1次元なので $q_K=|u\rangle\langle u|$、従って $q=p$。中心がスカラーで最小射影があり、[VN7の分類](../../VN/VN7/index.md#def-vn7-factor-type-classification)でType I因子です。
<!-- solution-end -->

<a id="ex-aqft16-a03"></a>
#### AQFT16-A03 外側の可換子の作用先

第2節の $M_2=B(H_1\otimes H_2\otimes H_3)\otimes I_4$ の可換子を求め、$M_2'\subset N'$ を実際のテンソル因子から説明せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** [A02の行列単位による可換子計算](#ex-aqft16-a02)を、まず $K=H_1\otimes H_2\otimes H_3$、$L=H_4$ に、次に $K=H_1\otimes H_2$、$L=H_3\otimes H_4$ に適用します。それぞれ $M_2'=I_1\otimes I_2\otimes I_3\otimes B(H_4)$、$N'=I_1\otimes I_2\otimes B(H_3\otimes H_4)$ です。前者は $H_3$ に恒等作用する後者の部分環なので $M_2'\subset N'$。これは $N\subset M_2$ の可換子による包含反転と一致します。
<!-- solution-end -->

<a id="ex-aqft16-a04"></a>
#### AQFT16-A04 ベクトル積状態の計算

$K=L=\mathbb C^2$、$k=(1,0)^T$、$l=2^{-1/2}(1,1)^T$、$a=\operatorname{diag}(2,3)$、$b=\operatorname{diag}(1,-1)$ とする。$\Psi=k\otimes l$ として $\langle\Psi,(a\otimes b)\Psi\rangle$ を計算し、積への分解を確認せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $ak=2k$ なので $\langle k,ak\rangle=2$。$bl=2^{-1/2}(1,-1)^T$ だから $\langle l,bl\rangle=(1-1)/2=0$。従って $\langle\Psi,(a\otimes b)\Psi\rangle=2\cdot0=0$。直接にも $(a\otimes b)\Psi=2k\otimes bl$ で内積は $2\langle k,k\rangle\langle l,bl\rangle=0$。積状態性は単なる可換性でなくテンソル積表示による計算です。
<!-- solution-end -->

### Level B：中間因子の構成と限界を再現する

<a id="ex-aqft16-b01"></a>
#### AQFT16-B01 最小射影から二つのHilbert空間へ

Type I因子 $N\subset B(H)$ の最小射影 $e$ に対し $L=eH$、$K=\overline{Ne}$ とする。$eNe=\mathbb Ce$ と $ae\otimes\xi\mapsto a\xi$ が等長になる理由を、具体的な内積の中間式で示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** $eNe$ に非スカラーな自己共役元があれば、そのスペクトル射影の一つは $e$ の真の非零部分射影となり最小性に反します。ゆえに $eNe=\mathbb Ce$。$a,b\in N$ に対して $e a^*b e=c_{a,b}e$ と書けます。$\xi,\eta\in eH$ は $e\xi=\xi$、$e\eta=\eta$ を満たすので

$$
\langle a\xi,b\eta\rangle
=\langle\xi,a^*b\eta\rangle
=\langle\xi,e a^*b e\,\eta\rangle
=c_{a,b}\langle\xi,\eta\rangle.
$$

これが $Ne$ の内積と $L$ の内積の積です。零ノルムの $ae$ は零作用素であり、従って写像はwell-definedな等長写像です。像が全空間に稠密であるためには、[Type I因子の空間的表示の証明](#thm-aqft16-typei-spatial-form)と同じく $\overline{NeH}$ の射影が非零中心射影となることまで使います。
<!-- solution-end -->

<a id="ex-aqft16-b02"></a>
#### AQFT16-B02 零幅と正の緩衝帯を区別する

$M$ をType III因子とする。$M\subset M$ がsplitでないことを示せ。この事実が $M(O_1)\subset M(O_2)$（$O_1\Subset O_2$）のsplit性を否定しない理由を述べよ。

- Level: B

<!-- solution-start -->
**詳細解答。** 同じ環の間に $N$ を挟むなら、包含の反対称性によって

$$
M\subset N\subset M\quad\Longrightarrow\quad N=M
$$

です。しかし[VN7のType III分類](../../VN/VN7/index.md#def-vn7-factor-type-classification)によれば $M$ は非零最小射影を持たず、Type I因子にはなれません。従ってこの包含はsplitではありません。

一方、異なる領域 $O_1\Subset O_2$ の局所von Neumann環の間には別の $N$ が存在する余地があります。内側の環自身がType IIIでも、中間因子がType Iであることと矛盾しません。零幅の反例から、正の緩衝帯についてsplitの失敗は導けません。
<!-- solution-end -->

<a id="ex-aqft16-b03"></a>
#### AQFT16-B03 空間的独立性は零積を排除する

split inclusionの下で $x\in M_1$、$y\in M_2'$ が共に非零なら $xy\ne0$ を示せ。可換性だけでは成立しない例を挙げよ。

- Level: B

<!-- solution-start -->
**詳細解答。** [内外テンソル積表示](#thm-aqft16-split-tensor-inclusion)により $UxU^*=a\otimes I$、$UyU^*=I\otimes b$ となります。$x,y$ が非零なので $a,b$ も非零です。$a k\ne0$、$b l\ne0$ となる $k\in K,l\in L$ を選べば

$$
UxyU^*(k\otimes l)=(a k)\otimes(b l)\ne0.
$$

よって $xy\ne0$。一方 $D=L^\infty([0,1])$ の乗法作用素では $x=M_{\mathbf1_{[0,1/2]}}$、$y=M_{\mathbf1_{(1/2,1]}}$ は非零で可換ですが $xy=0$。可換性は積の非零性を保証しません。
<!-- solution-end -->

<a id="ex-aqft16-b04"></a>
#### AQFT16-B04 どの可換子まで対象になるか

局所netにおいて $O_1\Subset O_2$ がsplitであると仮定する。$O_2$ と空間的に分離した任意の領域 $Q$ について、$M(O_1)\vee M(Q)$ が空間的テンソル積で記述できる理由を述べよ。Haag双対性は必要か。

- Level: B

<!-- solution-start -->
**詳細解答。** [局所性の継承](../AQFT9/index.md#thm-aqft9-isotony-locality)を領域 $O_2,Q$ に適用します。splitの中間因子を $N$ とすると

$$
M(Q)\subset M(O_2)'\subset N',
\qquad M(O_1)\subset N
$$

が得られます。

[Type I因子の空間的表示](#thm-aqft16-typei-spatial-form)のユニタリにより、二つの環はそれぞれ $A\otimes I$ と $I\otimes C$ の形になります。[内外テンソル積表示](#thm-aqft16-split-tensor-inclusion)と同じ弱閉包の計算で

$$
M(O_1)\vee M(Q)\simeq M(O_1)\bar\otimes M(Q)
$$

です。必要だったのは局所性による包含だけであり、外部環を可換子全体に等置するHaag双対性は不要です。
<!-- solution-end -->

### Level C：有限模型と連続体の論理を総合する

<a id="ex-aqft16-c01"></a>
#### AQFT16-C01 緩衝領域を持つ分離の設計審査

第2節の4因子模型を用い、次の各主張を検証せよ。

1. $M_1\subset N\subset M_2$ はsplit inclusionである。
2. $M_2'$ は $N'$ に含まれ、$M_1\vee M_2'$ は空間的テンソル積として表せる。
3. $H_1\otimes H_2$ の単位ベクトル $k$ と $H_3\otimes H_4$ の単位ベクトル $l$ を選ぶと、対応する積ベクトル状態は $M_1$ と $M_2'$ の観測量の期待値を因子化する。
4. 上の計算から、全ての局所netがsplitであり、全ての真空状態が積状態であると結論できるか。

- Level: C

<!-- solution-start -->
**詳細解答。**

**(1)** $M_1=B(H_1)\otimes I_2\otimes I_3\otimes I_4$、$N=B(H_1\otimes H_2)\otimes I_3\otimes I_4$、$M_2=B(H_1\otimes H_2\otimes H_3)\otimes I_4$ です。各包含は恒等作用を取り込むので成立し、$N$ は [VN7の因子の型分類](../../VN/VN7/index.md#def-vn7-factor-type-classification)を満たすためsplitです。

**(2)** $K=H_1\otimes H_2$、$L=H_3\otimes H_4$ として $H=K\otimes L$ と再結合します。$N=B(K)\otimes I_L$、$N'=I_K\otimes B(L)$ です。$M_2'=I_1\otimes I_2\otimes I_3\otimes B(H_4)$ なので $M_2'\subset N'$。$M_1$ は $K$ の $H_1$ だけ、$M_2'$ は $L$ の $H_4$ だけに作用するため、[内外テンソル積定理](#thm-aqft16-split-tensor-inclusion)を具体的に実現します。結合環は $B(H_1)\otimes I_2\otimes I_3\otimes B(H_4)$ です。

**(3)** $x=a\otimes I_2\otimes I_3\otimes I_4\in M_1$、$y=I_1\otimes I_2\otimes I_3\otimes b\in M_2'$ と書きます。$\Psi=k\otimes l$ と置くと

$$
\begin{aligned}
\langle\Psi,xy\Psi\rangle
&=\langle k,(a\otimes I_2)k\rangle
 \langle l,(I_3\otimes b)l\rangle,\\
\langle\Psi,x\Psi\rangle
&=\langle k,(a\otimes I_2)k\rangle,\\
\langle\Psi,y\Psi\rangle
&=\langle l,(I_3\otimes b)l\rangle.
\end{aligned}
$$

従って積状態性が確かめられます。有限次元のベクトル状態なので正規性も成立します。

**(4)** いずれも結論できません。本模型は相対論的netではなく、一組の環の包含の直接例です。局所net全体のsplit propertyには全ての適切な $O_1\Subset O_2$ での中間因子の存在を**別途**証明する必要があります。また (3) は選択した積ベクトル $\Psi$ の性質であり、指定された真空ベクトル $\Omega$ に因子化が成立することを意味しません。[可換性がsplitを含意しない命題](#prop-aqft16-commutation-not-split)も、独立性が追加条件であることを示しています。
<!-- solution-end -->

## 7. 本講の到達点と次講

本講はsplitを**仮定した包含**からType I中間因子の空間的表示を構成し、内側の環と外側の可換子を別々のテンソル因子へ置き、積ベクトル状態を一つ構成しました。Type IIIの局所von Neumann環が自らType Iになるとは述べていません。

次講AQFT17では、この表示を使って**任意に与えられた正規状態の組の積状態延長**を扱い、さらにnuclearityからsplitを得るために何を追加仮定するかを検討します。
