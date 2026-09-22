# CA8 標準複素解析 VIII：Riemann 面・被覆・多価関数

> **複素解析 II の幾何的入口**。CA5 では平面領域上で解析接続と モノドロミー を扱い、CA7 では Riemann 写像定理まで進んだ。本章では「局所的には複素平面に見えるが、大域的には平面領域ではない空間」を Riemann 面として定式化する。対数や平方根の多価性は、値を無理に一つ選ぶ問題ではなく、適切な被覆 Riemann 面へ持ち上げれば通常の一価正則関数として扱える。

<!-- definition-example-audit: strict -->

## 0. この章で何が新しくなるか

主線は次である。

~~~text
局所複素座標
  ↓ 正則な座標遷移
局所座標を正則に貼った空間
  ↓
座標で定義する解析的写像・有理型関数
  ↓
局所的に複数シートへほどける写像
  ↓ 経路・連続変形を上の空間へ持ち上げる
解析接続を「持ち上げ」として読む
  ↓
log と sqrt を一価化するシート空間
  ↓
C / Λ の商位相 + 局所座標
格子による商空間
  ↓ compactness + 最大値原理
コンパクトな場合の正則関数の剛性
~~~

前提として使うのは、[CA5 の経路に沿う解析接続](../CA5/index.md#def-ca5-analytic-continuation-along-path)と[固定経路に沿う一意性](../CA5/index.md#thm-ca5-continuation-uniqueness)、[CA6 の Riemann 球面](../CA6/index.md)、[CA7 の Riemann 写像定理](../CA7/index.md#thm-ca7-riemann-mapping)、[TOP1 の商位相](../TOP1/index.md#def-top1-quotient-topology)、[TOP4 の Hausdorff 性](../TOP4/index.md#def-top4-t2)・[第二可算性](../TOP4/index.md#def-top4-second-countable)、[TOP5 のコンパクト性](../TOP5/index.md#def-top5-compact)である。

一般の被覆空間分類、普遍被覆の一般存在定理、被覆変換 の体系、Riemann--Roch の定理、因子、種数、一様化定理は本章の主線には入れない。

---

## 1. 複素座標を持つ空間

平面領域だけを扱っている間は、点の近傍には最初から座標 $z$ がある。Riemann 面では、この座標そのものを局所的に貼り合わせて作る。

<a id="def-ca8-complex-chart"></a>
<!-- formal-statement-start -->
### 定義（複素座標近傍）

位相空間 $X$ の開集合 $U\subset X$ と、複素平面の開集合 $V\subset\mathbb C$ への同相写像

$$
\varphi:U\to V
$$

の組 $(U,\varphi)$ を **複素座標近傍**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca8-complex-chart -->
**定義の確認**。$X=\mathbb C$ なら、任意の開集合 $U$ と恒等写像 $\varphi(z)=z$ が複素座標近傍になる。座標近傍は「空間そのものが平面である」ことを要求せず、各点の近くを平面の開集合で記述できればよい。
<!-- definition-example-end -->

<a id="def-ca8-holomorphic-atlas"></a>
<!-- formal-statement-start -->
### 定義（正則アトラス）

$X$ を Hausdorff かつ第二可算な位相空間とする。$X$ を覆う複素座標近傍の族

$$
\mathcal A=\{(U_\alpha,\varphi_\alpha)\}
$$

が **正則アトラス** であるとは、$U_\alpha\cap U_\beta\ne\varnothing$ のたびに座標遷移

$$
\varphi_\beta\circ\varphi_\alpha^{-1}:
\varphi_\alpha(U_\alpha\cap U_\beta)
\to
\varphi_\beta(U_\alpha\cap U_\beta)
$$

が正則であることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca8-holomorphic-atlas -->
**定義の確認**。$\mathbb C^\times=\mathbb C\setminus\{0\}$ に恒等座標だけを置けば、重なりでの遷移写像も恒等写像なので正則アトラスになる。複数の座標がある場合に本質的なのは、同じ点を二つの座標で記述しても、その変換が正則であることである。
<!-- definition-example-end -->

<a id="def-ca8-riemann-surface"></a>
<!-- formal-statement-start -->
### 定義（Riemann 面）

Hausdorff かつ第二可算で、各点が複素座標近傍を持ち、正則アトラスを備えた位相空間を **Riemann 面**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca8-riemann-surface -->
**定義の確認**。複素平面の任意の領域 $\Omega$ を考える。$\mathbb C$ は距離空間なので Hausdorff であり、$\Omega$ も部分空間として Hausdorff である。また中心と半径を有理数成分から選ぶ円板で可算基底を作れるので、$\Omega$ は第二可算である。各点の十分小さい開近傍に恒等座標を置けば、座標遷移は恒等写像で正則である。従って $\Omega$ は Riemann 面である。
<!-- definition-example-end -->

Hausdorff 性は異なる点を局所的に分離するため、第二可算性は過度に巨大な局所モデルを排除し、通常の解析で使う可算的な近似・選択を保つために入れている。

---

## 2. Riemann 球面をアトラスで見直す

CA6 では $\widehat{\mathbb C}=\mathbb C\cup\{\infty\}$ を直接扱った。ここではそれを Riemann 面として再構成する。

有限点側の座標を

$$
U_0=\widehat{\mathbb C}\setminus\{\infty\},
\qquad
\varphi_0(z)=z,
$$

無限遠点側を

$$
U_\infty=\widehat{\mathbb C}\setminus\{0\},
\qquad
\varphi_\infty(z)=
\begin{cases}
1/z,&z\in\mathbb C^\times,\\
0,&z=\infty
\end{cases}
$$

とする。

<a id="prop-ca8-riemann-sphere-atlas"></a>
<!-- formal-statement-start -->
### 命題（Riemann 球面の標準アトラス）

上の二つの座標は $\widehat{\mathbb C}$ に正則アトラスを与える。従って Riemann 球面は Riemann 面である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

重なりは $\mathbb C^\times$ である。有限点座標 $z$ から無限遠点座標 $\zeta$ への遷移は

$$
\zeta=\frac1z,
$$

逆向きも

$$
z=\frac1\zeta.
$$

どちらも $\mathbb C^\times$ 上正則である。CA6 で用いた球面位相では二つの座標写像は同相写像である。

Hausdorff 性も確認する。有限な相異なる二点は $\mathbb C$ 内の互いに素な小円板で分離できる。有限点 $z_0$ と $\infty$ については $R>|z_0|+1$ を取り、$z_0$ の十分小さい円板と

$$
U_R=\{\infty\}\cup\{z\in\mathbb C:|z|>R\}
$$

を取れば互いに素な開近傍になる。

第二可算性については、$\mathbb C$ の中心・半径を有理数成分から選んだ可算な円板基底に加え、

$$
U_n=\{\infty\}\cup\{z\in\mathbb C:|z|>n\},
\qquad n\in\mathbb N
$$

を加えれば球面の可算基底になる。実際、$\infty$ の任意の近傍はあるコンパクト集合の補集合を含み、そのコンパクト集合は十分大きい閉円板に入るから、ある $U_n$ を含む。

従って Hausdorff 性・第二可算性・正則座標遷移の全てがそろい、$\widehat{\mathbb C}$ は Riemann 面である。$\square$
<!-- proof-end -->

「$\infty$ で正則」という表現は、$\zeta=1/z$ を局所座標にして $\zeta=0$ の通常の正則性を調べるという意味になる。

---

## 3. 二つの複素曲面のあいだの解析的写像

<a id="def-ca8-holomorphic-map"></a>
<!-- formal-statement-start -->
### 定義（Riemann 面間の正則写像）

$X,Y$ を Riemann 面、$F:X\to Y$ を連続写像とする。$p\in X$ に対し、$p\in U$ の座標 $(U,\varphi)$ と $F(p)\in V$ の座標 $(V,\psi)$ を取り、

$$
\psi\circ F\circ\varphi^{-1}
$$

が $\varphi(U\cap F^{-1}(V))$ 上で $z=\varphi(p)$ の近傍において正則であるとき、$F$ は $p$ で正則という。全点で正則なら正則写像という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca8-holomorphic-map -->
**定義の確認**。$X=Y=\mathbb C$ に恒等座標を入れ、

$$
F(z)=z^2
$$

とする。$F$ は連続で、座標表示 $\operatorname{id}\circ F\circ\operatorname{id}^{-1}(z)=z^2$ は全平面で正則である。従って $F$ は Riemann 面間の正則写像である。
<!-- definition-example-end -->

<a id="thm-ca8-holomorphic-coordinate-invariance"></a>
<!-- formal-statement-start -->
### 定理（正則性の座標不変性）

上の定義で、ある一組の座標を使って $\psi\circ F\circ\varphi^{-1}$ が正則なら、同じ点を含む任意の別の座標を使っても座標表示は正則である。
<!-- formal-statement-end -->

証明の核心は、別座標へ移る操作が「正則関数の前後に正則な座標遷移を合成すること」にすぎない点にある。

<!-- proof-start -->
### 証明

別の座標 $(\widetilde U,\widetilde\varphi)$、$(\widetilde V,\widetilde\psi)$ を取る。共通部分で

$$
\widetilde\psi\circ F\circ\widetilde\varphi^{-1}
=
(\widetilde\psi\circ\psi^{-1})
\circ
(\psi\circ F\circ\varphi^{-1})
\circ
(\varphi\circ\widetilde\varphi^{-1}).
$$

両端の写像は正則アトラスの座標遷移だから正則で、中央も仮定により正則である。正則関数の合成は正則なので、別座標表示も正則である。$\square$
<!-- proof-end -->

<a id="def-ca8-biholomorphism"></a>
<!-- formal-statement-start -->
### 定義（双正則写像）

Riemann 面間の全単射 $F:X\to Y$ で、$F$ と $F^{-1}$ がともに正則なものを **双正則写像**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca8-biholomorphism -->
**定義の確認**。写像

$$
F:\mathbb C\to\mathbb C,
\qquad
F(z)=2z
$$

は全単射で正則であり、逆写像 $F^{-1}(w)=w/2$ も正則である。従って $F$ は双正則写像である。
<!-- definition-example-end -->

---

## 4. 有理型関数の零点と極

局所座標を変えても零点や極の重複度が変わらないことを確認しておく。これがないと、Riemann 面上の因子 や留数へ進む以前に局所データ自体が不安定になる。

<a id="def-ca8-meromorphic-function"></a>
<!-- formal-statement-start -->
### 定義（Riemann 面上の有理型関数）

Riemann 面 $X$ 上の関数 $f:X\to\widehat{\mathbb C}$ が **有理型**であるとは、各点 $p\in X$ の座標 $(U,\varphi)$ において

$$
f\circ\varphi^{-1}
$$

が $\varphi(p)$ の近傍で通常の一変数有理型関数になることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca8-meromorphic-function -->
**定義の確認**。$X=\widehat{\mathbb C}$ で $f(z)=1/z$ とすると、有限点 $z=0$ では単純極を持つ。一方 $\infty$ では $\zeta=1/z$ を使えば $f=\zeta$ となるので、$\infty$ では単純零点である。
<!-- definition-example-end -->

<a id="def-ca8-order"></a>
<!-- formal-statement-start -->
### 定義（零点・極の位数）

$f$ を $p$ の近傍で恒等的に $0$ でない有理型関数とする。局所座標 $z=\varphi(q)$ を $z(p)=0$ となるように取り、

$$
f(q)=z(q)^m g(z(q)),
\qquad
g(0)\ne0
$$

と書ける整数 $m$ を $\operatorname{ord}_p(f)$ とする。$m>0$ なら $m$ 次零点、$m<0$ なら $-m$ 次極である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca8-order -->
**定義の確認**。$f(z)=z^3/(z-1)^2$ なら $\operatorname{ord}_0(f)=3$、$\operatorname{ord}_1(f)=-2$ である。
<!-- definition-example-end -->

<a id="thm-ca8-order-coordinate-invariance"></a>
<!-- formal-statement-start -->
### 定理（位数の座標不変性）

$\operatorname{ord}_p(f)$ は、$p$ のまわりで選んだ局所座標に依存しない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

二つの局所座標 $z,w$ を $z(p)=w(p)=0$ となるように取る。座標遷移を

$$
w=h(z)
$$

と書く。$h$ は $0$ の近傍で双正則だから $h(0)=0$ かつ $h'(0)\ne0$ である。Taylor 展開により

$$
h(z)=z\,u(z),
\qquad
u(0)=h'(0)\ne0.
$$

従って

$$
z=w\,v(w)
$$

とも書け、$v(0)\ne0$ である。

$z$ 座標で

$$
f=z^m g(z),
\qquad
g(0)\ne0
$$

なら、$w$ 座標では

$$
f=(w\,v(w))^m g(w\,v(w))
=w^m \widetilde g(w),
$$

ここで

$$
\widetilde g(w)=v(w)^m g(wv(w))
$$

は $w=0$ で有限かつ非零である。$m<0$ の場合も $v$ が0の近傍で非零なので同じ式が有効である。従って位数は同じ $m$ である。$\square$
<!-- proof-end -->

---

## 5. Riemann 球面上の有理型関数は有理関数

<a id="thm-ca8-sphere-meromorphic-rational"></a>
<!-- formal-statement-start -->
### 定理（Riemann 球面上の有理型関数の分類）

$\widehat{\mathbb C}$ 上の有理型関数は、通常の有理関数

$$
R(z)=\frac{P(z)}{Q(z)}
$$

と一致する。逆に任意の有理関数は Riemann 球面上の有理型関数を定める。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

逆向きは有限点で通常の有理型関数であり、$\zeta=1/z$ と置けば $\infty$ の近傍でも Laurent 展開が有限個の負冪しか持たないのでよい。

順方向を示す。$f$ の極集合は離散である。Riemann 球面はコンパクトなので、極が無限個あれば集積点を持ち、極の孤立性に反する。従って極は有限個である。

有限点 $a_1,\dots,a_r$ の極の主部を

$$
P_j(z)=\sum_{k=1}^{m_j}\frac{c_{jk}}{(z-a_j)^k}
$$

とする。さらに $\infty$ が極なら、$\zeta=1/z$ での Laurent 展開の主部

$$
\sum_{k=1}^{m_\infty} b_k\zeta^{-k}
$$

は $z$ では多項式

$$
P_\infty(z)=\sum_{k=1}^{m_\infty}b_k z^k
$$

になる。

そこで

$$
g(z)=f(z)-P_\infty(z)-\sum_{j=1}^rP_j(z)
$$

と置く。各有限極の主部は打ち消され、$\infty$ の主部も打ち消されるから、$g$ は球面全体で正則である。

球面はコンパクトなので $|g|$ は最大値を取る。最大点の座標に移せば通常の[最大値原理](../CA3/index.md#thm-ca3-maximum-modulus)が使え、$g$ は定数である。従って $f$ は多項式と有限個の主部分数の和、したがって有理関数である。$\square$
<!-- proof-end -->

コンパクト性が「極は有限個」に、最大値原理が「極を全部除いた残りは定数」に使われている。

---

## 6. 座標変換する微分の入口

CA9 では後で構成する格子商の上で積分や楕円関数を扱う。その準備として、座標変換で $dz$ がどう変わるかだけを定式化する。

<a id="def-ca8-holomorphic-one-form"></a>
<!-- formal-statement-start -->
### 定義（正則微分）

Riemann 面 $X$ の各座標 $(U_\alpha,z_\alpha)$ に正則関数 $f_\alpha$ が与えられ、重なりで

$$
f_\alpha(z_\alpha)\,dz_\alpha
=
f_\beta(z_\beta)\,dz_\beta
$$

すなわち

$$
f_\beta(z_\beta)
=
f_\alpha(z_\alpha)
\frac{dz_\alpha}{dz_\beta}
$$

を満たすとき、この局所データを $X$ 上の **正則微分**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca8-holomorphic-one-form -->
**定義の確認**。$X=\mathbb C$ で二つの座標 $z$ と $w=z+a$ を使う。座標遷移は平行移動なので

$$
dw=dz.
$$

従って $z$ 座標で $1\,dz$、$w$ 座標で $1\,dw$ と置いた局所データは重なりで一致し、$\mathbb C$ 上の正則微分を与える。後で作る格子商でも同じ平行移動機構が働く。
<!-- definition-example-end -->

これは一般の微分形式論を導入するためではなく、「座標を変えると係数関数だけでなく $dz$ も変換する」ことを明示するための入口である。

---

## 7. 局所的にシートへ分かれる写像

多価関数の大域的な振る舞いを整理するには、局所的に何枚かの同じシートが並ぶ写像を使う。

<a id="def-ca8-covering-map"></a>
<!-- formal-statement-start -->
### 定義（被覆写像）

連続全射 $p:X\to Y$ が **被覆写像**であるとは、各 $y\in Y$ に対して開近傍 $V$ が存在し、

$$
p^{-1}(V)=\bigsqcup_{\lambda\in L}U_\lambda
$$

と互いに素な開集合の和に分解でき、各制限

$$
p|_{U_\lambda}:U_\lambda\to V
$$

が同相写像になることをいう。この $V$ を均等被覆近傍と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca8-covering-map -->
**定義の確認**。指数写像

$$
\exp:\mathbb C\to\mathbb C^\times
$$

を考える。$z_0\in\mathbb C^\times$ の十分小さい円板 $V$ を0を避けるように取れば、$V$ 上には正則対数の枝があり、その各 $2\pi i k$ 平行移動が $\exp^{-1}(V)$ の互いに素な成分を与える。各成分から $V$ への指数写像は同相、実際には双正則である。
<!-- definition-example-end -->

<a id="def-ca8-holomorphic-covering"></a>
<!-- formal-statement-start -->
### 定義（正則被覆）

Riemann 面 $X,Y$ の間の被覆写像 $p:X\to Y$ で、各均等被覆近傍 $V$ と各シート$U_\lambda$ について

$$
p|_{U_\lambda}:U_\lambda\to V
$$

が双正則であるものを **正則被覆**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca8-holomorphic-covering -->
**定義の確認**。$\exp:\mathbb C\to\mathbb C^\times$ は導関数がどこでも $e^z\ne0$ で、上の局所逆写像は対数の枝だから正則被覆である。
<!-- definition-example-end -->

---

<a id="lem-ca8-lebesgue-number"></a>
<!-- formal-statement-start -->
### 補題（コンパクト距離空間の Lebesgue 数）

コンパクト距離空間 $K$ の有限開被覆

$$
K=U_1\cup\cdots\cup U_N
$$

に対し、ある $\eta>0$ が存在して、直径が $\eta$ 未満の任意の部分集合 $A\subset K$ はどれか一つの $U_j$ に含まれる。
<!-- formal-statement-end -->

この補題は、経路やホモトピーを有限個の「一つの被覆近傍だけで扱える小片」へ分割するために使う。

<!-- proof-start -->
### 証明

各 $x\in K$ について $x\in U_{j(x)}$ となる添字を一つ選ぶ。$U_{j(x)}$ は開だから、ある $r_x>0$ が存在して

$$
B(x,2r_x)\subset U_{j(x)}
$$

とできる。$\{B(x,r_x):x\in K\}$ は $K$ の開被覆なので、コンパクト性から有限部分被覆

$$
K\subset B(x_1,r_1)\cup\cdots\cup B(x_m,r_m)
$$

を取れる。

$$
\eta=\min_{1\le k\le m}r_k>0
$$

と置く。直径 $\operatorname{diam}(A)<\eta$ の非空集合 $A$ を取り、$a\in A$ を一つ選ぶ。有限部分被覆から $a\in B(x_k,r_k)$ となる $k$ がある。任意の $b\in A$ について

$$
d(b,x_k)
\le
d(b,a)+d(a,x_k)
<
\eta+r_k
\le
2r_k.
$$

従って

$$
A\subset B(x_k,2r_k)\subset U_{j(x_k)}.
$$

空集合なら主張は自明だから、全ての場合に結論が成り立つ。$\square$
<!-- proof-end -->

---

## 8. 経路を上の空間へ持ち上げる

被覆上では、基底の経路を指定したシートから連続的に追う操作を考える。

<a id="thm-ca8-path-lifting"></a>
<!-- formal-statement-start -->
### 定理（経路持ち上げの存在と一意性）

$p:X\to Y$ を被覆写像、$\gamma:[0,1]\to Y$ を連続な経路とする。$x_0\in X$ が

$$
p(x_0)=\gamma(0)
$$

を満たすなら、ただ一つの連続経路

$$
\widetilde\gamma:[0,1]\to X
$$

が存在して

$$
\widetilde\gamma(0)=x_0,
\qquad
p\circ\widetilde\gamma=\gamma
$$

を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

区間 $[0,1]$ のコンパクト性で、経路像を覆う均等被覆近傍を有限個に減らし、その逆像による開被覆の Lebesgue 数を使って細分を選ぶ。各小区間では一枚のシート上の局所逆写像で持ち上げ、端点を次のシート選択へ渡す。一意性は「二つの持ち上げが一致する時刻集合が開かつ閉」で示す。

<!-- proof-start -->
### 証明

$\gamma([0,1])$ を均等被覆近傍の族で覆う。$[0,1]$ はコンパクトなので有限個 $V_1,\dots,V_N$ を選んで

$$
[0,1]
=
\gamma^{-1}(V_1)\cup\cdots\cup\gamma^{-1}(V_N)
$$

とできる。[Lebesgue 数補題](#lem-ca8-lebesgue-number)をこの有限開被覆へ適用し、Lebesgue 数 $\eta>0$ を取る。$1/m<\eta$ となる整数 $m$ を選び、

$$
t_r=\frac rm
\qquad
(r=0,1,\dots,m)
$$

と置けば、各閉区間 $[t_{r-1},t_r]$ は直径が $\eta$ 未満だから、ある $\gamma^{-1}(V_{j(r)})$ に含まれる。従って

$$
\gamma([t_{r-1},t_r])\subset V_{j(r)}.
$$

最初の区間で、$x_0$ を含む $p^{-1}(V_{j(1)})$ のシートを $U_1$ とする。局所逆写像を

$$
s_1=(p|_{U_1})^{-1}:V_{j(1)}\to U_1
$$

とすれば、

$$
\widetilde\gamma(t)=s_1(\gamma(t))
$$

で持ち上げが定まる。

$t_1$ で得た点 $\widetilde\gamma(t_1)$ を含む次のシート$U_2$ を選び、その局所逆写像で $[t_1,t_2]$ を持ち上げる。この操作を有限回繰り返せば存在が得られる。端点では前区間と次区間が同じ点を通るので貼り合わせは連続である。

一意性を示す。二つの持ち上げ$\widetilde\gamma_1,\widetilde\gamma_2$ が同じ初期点を持つとする。

$$
A=\{t\in[0,1]:\widetilde\gamma_1(t)=\widetilde\gamma_2(t)\}
$$

と置く。まず $t_0\in A$ とする。共通点の像 $\gamma(t_0)$ の均等被覆近傍 $V$ を取り、共通点を含むシートを $U$ とする。連続性により $t_0$ の十分小さい近傍 $I$ で両持ち上げの像を $U$ に入れられる。その上では

$$
\widetilde\gamma_j=(p|_U)^{-1}\circ\gamma
$$

だから両者は一致する。従って $A$ は開である。

次に $t_0\notin A$ とする。二点 $\widetilde\gamma_1(t_0)$ と $\widetilde\gamma_2(t_0)$ は同じ $\gamma(t_0)$ の上にあるが異なるので、ある均等被覆近傍 $V$ の異なる二つのシート $U_1,U_2$ に入る。連続性から $t_0$ の十分小さい近傍 $J$ で

$$
\widetilde\gamma_1(J)\subset U_1,
\qquad
\widetilde\gamma_2(J)\subset U_2.
$$

シートは互いに素だから $J\subset[0,1]\setminus A$。従って補集合も開であり、$A$ は閉でもある。

$[0,1]$ は連結で、初期点が同じだから $0\in A$ である。よって $A=[0,1]$。一意性が従う。ここでは $X$ の Hausdorff 性を仮定していない。$\square$
<!-- proof-end -->

被覆性が必要なのは、局所逆写像を「どのシート上か」を含めて一意に選ぶためである。

---

## 9. 経路の連続変形も持ち上げる

CA5 のモノドロミー と接続するには、経路を連続変形したとき持ち上げの終点がどう動くかが必要になる。

<a id="thm-ca8-homotopy-lifting"></a>
<!-- formal-statement-start -->
### 定理（経路ホモトピーの持ち上げ）

$p:X\to Y$ を被覆写像とし、

$$
H:[0,1]\times[0,1]\to Y
$$

を連続写像とする。各 $s$ について $t\mapsto H(s,t)$ を経路と考える。$s=0$ の経路の持ち上げ$\widetilde H(0,t)$ が一つ与えられているとする。

このとき、ただ一つの連続写像

$$
\widetilde H:[0,1]\times[0,1]\to X
$$

が存在して

$$
p\circ\widetilde H=H
$$

かつ $s=0$ 上で与えられた持ち上げと一致する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

長方形 $K=[0,1]^2$ に対し、均等被覆近傍 $V$ の逆像 $H^{-1}(V)$ を集めると $K$ の開被覆になる。コンパクト性から有限部分被覆を取り、[Lebesgue 数補題](#lem-ca8-lebesgue-number)で Lebesgue 数 $\eta>0$ を得る。正方格子の一辺の長さを $\eta/3$ 未満に取れば、各小長方形の直径は

$$
\frac{\sqrt2\eta}{3}<\eta
$$

なので、その全体がある一つの $H^{-1}(V)$ に入る。従って各小長方形の像は一つの均等被覆近傍 $V$ に入る。

左端 $s=0$ 上では持ち上げが既に与えられている。左から右へ格子列ごとに進む。ある小長方形 $R$ の一辺上で持ち上げが定まっているとする。$H(R)$ が入る均等被覆近傍を $V$ とし、その既知の一辺の像が入るシート $U$ を一つ選ぶ。連結な一辺の持ち上げは途中で別シートへ飛べないので、同じ $U$ に入る。そこで $R$ 全体を

$$
(p|_U)^{-1}\circ H
$$

で持ち上げる。

隣接する小長方形との共通辺では、どちらも同じ基点写像 $H$ の持ち上げで、共通端点が一致する。[経路持ち上げの一意性](#thm-ca8-path-lifting)から共通辺全体で一致する。従って有限個の小長方形上の持ち上げは貼り合わさり、$K$ 全体の連続持ち上げを与える。

一意性も同様に、各格子辺上で 経路持ち上げの一意性を使い、各小長方形内では同じシート上の局所逆写像であることから従う。$\square$
<!-- proof-end -->

<a id="cor-ca8-lifted-homotopy-endpoint"></a>
<!-- formal-statement-start -->
### 系（端点固定ホモトピーと持ち上げの終点）

$H(s,0)=y_0$、$H(s,1)=y_1$ が $s$ に依存しないとする。同じ $x_0\in p^{-1}(y_0)$ から各経路を持ち上げると、持ち上げの終点 $\widetilde H(s,1)$ は $s$ に依存しない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$s\mapsto\widetilde H(s,1)$ は連続で、その値は常に離散集合 $p^{-1}(y_1)$ に入る。連結区間 $[0,1]$ の連続像は連結だが、離散集合の連結部分集合は一点だけである。従って終点は一定である。$\square$
<!-- proof-end -->

---

## 10. 対数を一価化する指数被覆

「$\log z$ は多価関数」と言う代わりに、どの空間上なら一価になるかを作る。

<a id="prop-ca8-log-surface"></a>
<!-- formal-statement-start -->
### 命題（対数の標準 Riemann 面）

$$
p:\mathbb C\to\mathbb C^\times,
\qquad
p(w)=e^w
$$

は正則被覆である。被覆空間側の関数

$$
L(w)=w
$$

は一価正則であり、

$$
e^{L(w)}=p(w)
$$

を満たす。したがって $L$ は $\mathbb C^\times$ 上の対数の全ての局所枝を一つの一価関数としてまとめる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$z_0\ne0$ を取る。$0$ を避ける単連結な小円板 $V$ を $z_0$ のまわりに取れば、[CA2 の単連結領域上の正則対数](../CA2/index.md#thm-ca2-holomorphic-log-branch)により正則関数 $\ell:V\to\mathbb C$ が存在して

$$
e^{\ell(z)}=z.
$$

すると

$$
p^{-1}(V)=\bigsqcup_{k\in\mathbb Z}\bigl(\ell(V)+2\pi i k\bigr)
$$

であり、各成分上で $p$ の逆写像は

$$
z\mapsto \ell(z)+2\pi i k
$$

である。従って $p$ は正則被覆。

$L(w)=w$ は平面上の通常の正則関数で、

$$
e^{L(w)}=e^w=p(w)
$$

だから、基底上で異なる枝として見えていた値が被覆上では一つの関数になっている。$\square$
<!-- proof-end -->

単位円周

$$
\gamma(t)=e^{2\pi i t}
$$

を $w_0=0$ から持ち上げすると

$$
\widetilde\gamma(t)=2\pi i t
$$

であり、終点は $2\pi i$ になる。閉曲線を一周しても持ち上げは閉じない。この終点差が対数の枝が $2\pi i$ ずれる現象である。

---

## 11. 平方根を一価化する二枚被覆

<a id="prop-ca8-square-root-surface"></a>
<!-- formal-statement-start -->
### 命題（平方根の標準 Riemann 面）

$$
X_{\sqrt{\phantom z}}
=
\{(z,w)\in\mathbb C^\times\times\mathbb C^\times:w^2=z\}
$$

とする。写像

$$
\Phi:\mathbb C^\times\to X_{\sqrt{\phantom z}},
\qquad
\Phi(w)=(w^2,w)
$$

は全単射である。$\Phi$ により $\mathbb C^\times$ の Riemann 面構造を $X_{\sqrt{\phantom z}}$ へ移し、

$$
p:X_{\sqrt{\phantom z}}\to\mathbb C^\times,
\qquad
p(z,w)=z
$$

と置く。このとき $w$ 座標では

$$
p(w)=w^2
$$

となり、$p$ は2枚の正則被覆である。関数

$$
S(z,w)=w
$$

は $X_{\sqrt{\phantom z}}$ 上一価正則で

$$
S^2=p
$$

を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$z_0\ne0$ の十分小さい単連結近傍 $V$ を取り、$V$ 上の正則平方根 $s$ を一つ選ぶ。すると

$$
p^{-1}(V)
=
\{(z,s(z)):z\in V\}
\sqcup
\{(z,-s(z)):z\in V\}.
$$

二つの集合は開で互いに素であり、各々への $p$ の制限は $V$ と双正則である。従って2枚の正則被覆である。

$S(z,w)=w$ は $w$ 座標では恒等関数なので正則で、定義から $S(z,w)^2=w^2=z=p(z,w)$。$\square$
<!-- proof-end -->

### 0 を入れると何が壊れるか

写像 $w\mapsto w^2$ を $\mathbb C\to\mathbb C$ に拡張すると $0$ の近傍は被覆近傍にならない。$0$ の逆像は一点しかなく、しかも $w\mapsto w^2$ は $0$ で局所同相ではない。これは **分岐被覆** の入口であり、本章の通常の被覆写像とは区別する。

つまり「平方根の二つの枝が0で合流する」現象は、被覆性の仮定が壊れる場所そのものである。

---

## 12. 被覆と解析接続

正則被覆 $p:X\to Y$ と $X$ 上の正則関数 $F$ を持つと、各シート上の局所逆写像 $s:V\to X$ を通して

$$
f_V=F\circ s
$$

という $Y$ 上の局所正則関数が得られる。経路に沿ってシートを追うことが、そのまま局所枝の解析接続になる。

<a id="thm-ca8-covering-analytic-continuation"></a>
<!-- formal-statement-start -->
### 定理（被覆に沿う解析接続の一意性）

$p:X\to Y$ を正則被覆、$F:X\to\mathbb C$ を正則関数とする。$y_0\in Y$ と $x_0\in p^{-1}(y_0)$ を固定する。

任意の経路 $\gamma:[0,1]\to Y$ に対し、$x_0$ からの一意な持ち上げ$\widetilde\gamma$ を使うと、$F$ は $\gamma$ に沿う局所正則枝の解析接続を一意に定める。さらに端点固定でホモトピックな二経路は同じ終点シートに達するので、終点で得られる局所枝も同じである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

各 $t$ の近くで $\gamma$ の像が均等被覆近傍 $V$ に入るようにする。持ち上げ $\widetilde\gamma$ が通るシートを $U$ とし、

$$
s=(p|_U)^{-1}:V\to U
$$

を取る。局所枝を

$$
f=F\circ s
$$

と定める。$p|_U$ と $F$ は正則だから $f$ は正則である。

隣接する時刻区間の重なりでは、二つの局所逆写像は持ち上げが通る同じ点を含むシート上で一致する。[経路持ち上げの一意性](#thm-ca8-path-lifting)によりシートの選択自体が一意だから、局所枝は CA5 の[固定経路に沿う解析接続の一意性](../CA5/index.md#thm-ca5-continuation-uniqueness)と整合して一意に貼られる。

二経路が端点固定ホモトピーで結ばれていれば、[持ち上げの終点不変性](#cor-ca8-lifted-homotopy-endpoint)により同じ終点 $x_1$ に達する。$x_1$ の近くのシートで局所逆写像は同じだから、終点で得られる局所枝も一致する。$\square$
<!-- proof-end -->

これは CA5 のモノドロミー を被覆幾何で読む形である。一般の「解析接続可能な全ての芽から Riemann 面を構成する」理論までは本章で行わない。

---

## 13. 複素トーラス $\mathbb C/\Lambda$

CA9 の楕円関数は二周期を持つ。その自然な定義域は平面ではなく、周期を同一視した商である。

<a id="def-ca8-lattice"></a>
<!-- formal-statement-start -->
### 定義（複素格子）

$\omega_1,\omega_2\in\mathbb C$ が実線形独立、すなわち

$$
\operatorname{Im}\left(\frac{\omega_2}{\omega_1}\right)\ne0
$$

を満たすとき、

$$
\Lambda
=
\mathbb Z\omega_1+\mathbb Z\omega_2
$$

を **複素格子**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca8-lattice -->
**定義の確認**。$\omega_1=1,\omega_2=i$ なら

$$
\Lambda=\mathbb Z+i\mathbb Z
$$

で、正方格子になる。$1$ と $i$ は実線形独立なので条件を満たす。
<!-- definition-example-end -->

<a id="lem-ca8-lattice-discrete"></a>
<!-- formal-statement-start -->
### 補題（格子の離散性）

複素格子 $\Lambda$ には定数 $\delta>0$ が存在して

$$
\lambda\in\Lambda\setminus\{0\}
\quad\Longrightarrow\quad
|\lambda|\ge\delta
$$

が成り立つ。特に $\Lambda$ は $\mathbb C$ の閉離散部分集合である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

実線形写像

$$
T:\mathbb R^2\to\mathbb C,
\qquad
T(x,y)=x\omega_1+y\omega_2
$$

は実線形同型である。単位円 $S^1\subset\mathbb R^2$ 上で連続関数 $v\mapsto|T(v)|$ は0にならない。$S^1$ はコンパクトだから正の最小値 $c>0$ を持つ。任意の $(x,y)\ne(0,0)$ を $r v$（$r=\sqrt{x^2+y^2}$、$v\in S^1$）と書けば

$$
|T(x,y)|
\ge
c\sqrt{x^2+y^2}
$$

が全ての $(x,y)$ に対して成り立つ。

$(m,n)\in\mathbb Z^2\setminus\{(0,0)\}$ なら $\sqrt{m^2+n^2}\ge1$ だから

$$
|m\omega_1+n\omega_2|\ge c.
$$

$\delta=c$ とすればよい。離散性が従い、各有界集合に入る格子点は有限個なので極限点を持たず、$\Lambda$ は閉である。$\square$
<!-- proof-end -->

<a id="thm-ca8-complex-torus"></a>
<!-- formal-statement-start -->
### 定理（複素トーラス）

複素格子 $\Lambda$ に対し、同値関係

$$
z\sim w
\quad\Longleftrightarrow\quad
z-w\in\Lambda
$$

で作る商空間

$$
X_\Lambda=\mathbb C/\Lambda
$$

に [商位相](../TOP1/index.md#def-top1-quotient-topology)を入れる。このとき $X_\Lambda$ は Hausdorff・第二可算・コンパクトな Riemann 面である。商写像

$$
q:\mathbb C\to X_\Lambda
$$

は正則被覆になる。
<!-- formal-statement-end -->

### 証明の見取り図

1. [格子の離散性](#lem-ca8-lattice-discrete)から小円板とその非自明な格子平行移動は交わらない。
2. その小円板を商写像で送ると一枚のシートになり、平面座標がそのまま商へ降りる。
3. 座標 遷移は格子元による平行移動だから正則。
4. Hausdorff 性は異なる二つの剰余類の差と格子の正距離で分離する。
5. 第二可算性は $\mathbb C$ の可算基底の像から得る。
6. 閉基本平行四辺形の連続像が商全体なのでコンパクト。

<!-- proof-start -->
### 証明

[格子の離散性](#lem-ca8-lattice-discrete)から $\delta>0$ を取り、$0<r<\delta/3$ とする。任意の $z\in\mathbb C$ について

$$
D(z,r)\cap(D(z,r)+\lambda)=\varnothing
\qquad
(\lambda\in\Lambda\setminus\{0\}).
$$

実際、共通点があればある $u,v\in D(z,r)$ について $u=v+\lambda$ となり、

$$
|\lambda|=|u-v|<2r<\delta
$$

で矛盾する。

従って $q|_{D(z,r)}$ は単射である。また商写像 $q$ は開集合を開集合へ送る。実際、開集合 $O\subset\mathbb C$ に対し

$$
q^{-1}(q(O))
=
\bigcup_{\lambda\in\Lambda}(O+\lambda)
$$

は開であり、商位相の定義から $q(O)$ は開だからである。よって

$$
q|_{D(z,r)}:D(z,r)\to q(D(z,r))
$$

は同相写像である。

商上の座標を

$$
\varphi_z(q(w))=w-z
\qquad(w\in D(z,r))
$$

で定める。二つの座標 が重なると、代表元は格子元 $\lambda$ だけずれるので遷移写像は

$$
u\longmapsto u+\lambda
$$

という平行移動である。これは正則で、正則アトラス が得られる。

次に Hausdorff 性を示す。$q(z)\ne q(w)$ なら $z-w\notin\Lambda$。閉離散集合 $\Lambda$ と点 $z-w$ の距離

$$
d=\operatorname{dist}(z-w,\Lambda)
$$

は正である。$0<\rho<d/3$ を取ると $q(D(z,\rho))$ と $q(D(w,\rho))$ は交わらない。もし交われば、ある $u,v$ と $\lambda\in\Lambda$ で

$$
u-v=\lambda,
\qquad
|u-z|<\rho,\quad |v-w|<\rho
$$

だから

$$
|(z-w)-\lambda|
\le |z-u|+|v-w|
<2\rho<d
$$

となり $d$ の定義に反する。

第二可算性は、$\mathbb C$ の可算基底 $\mathcal B$ に対して

$$
\{q(B):B\in\mathcal B\}
$$

が商の可算基底になることから従う。$q$ が開集合の像を開集合へ送ることを使っている。

最後に

$$
P=
\{s\omega_1+t\omega_2:0\le s\le1,\ 0\le t\le1\}
$$

を閉基本平行四辺形とする。$P$ はコンパクトで、任意の複素数は格子平行移動によって $P$ の点と同値になるので

$$
q(P)=X_\Lambda.
$$

[コンパクト空間の連続像はコンパクト](../TOP5/index.md#thm-top5-continuous-image)だから $X_\Lambda$ はコンパクトである。

さらに先ほどの局所円板は $q$ の均等被覆近傍のシートを与え、各局所表示は恒等写像の平行移動なので双正則である。従って $q$ は正則被覆である。$\square$
<!-- proof-end -->

この定理で「商を取れば自動的に良い空間になる」とはしていない。[TOP2 の「商空間は Hausdorff とは限らない」命題](../TOP2/index.md#prop-top2-nonhausdorff-quotient)という一般的な危険を、[格子の離散性](#lem-ca8-lattice-discrete)が回避している。

---

## 14. コンパクトな場合に起こる正則関数の剛性

<a id="thm-ca8-compact-holomorphic-constant"></a>
<!-- formal-statement-start -->
### 定理（コンパクト Riemann 面から複素平面への正則関数は定数）

$X$ を連結コンパクト Riemann 面とし、

$$
f:X\to\mathbb C
$$

を正則とする。このとき $f$ は定数である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

連続関数 $|f|$ はコンパクト空間 $X$ 上で最大値を取る。最大点を $p\in X$ とする。

$p$ を含む 座標 $(U,\varphi)$ を取り、

$$
g=f\circ\varphi^{-1}
$$

を考える。$g$ は平面領域 $\varphi(U)$ 上正則で、$\varphi(p)$ は $|g|$ の局所最大点である。[最大値原理](../CA3/index.md#thm-ca3-maximum-modulus)から $g$ は $\varphi(U)$ の $p$ を含む連結成分上定数、従って $f$ は $p$ の近傍で定数である。

局所から全体への伝播を明示する。集合

$$
A=
\left\{
q\in X:
\text{$q$ のある開近傍で }f\equiv f(p)
\right\}
$$

を取る。上で示したことから $A$ は空でなく、定義から開である。

$q\in\overline A$ を取る。$q$ を含む連結な座標近傍 $(U,\varphi)$ を十分小さく取る。$q$ は $A$ の閉包にあるので $U\cap A\ne\varnothing$ であり、$f-f(p)$ の座標表示は $\varphi(U)$ の非空開部分集合で0になる。[恒等定理](../CA3/index.md#thm-ca3-isolated-zeros-identity)から、その座標表示は連結領域 $\varphi(U)$ 全体で0である。従って $q\in A$。よって $A$ は閉でもある。

$X$ は連結で、$A$ は空でない開閉集合だから $A=X$。従って $f\equiv f(p)$ である。$\square$
<!-- proof-end -->

<a id="cor-ca8-torus-holomorphic-constant"></a>
<!-- formal-statement-start -->
### 系（複素トーラス上の正則関数は定数）

複素トーラス $X_\Lambda=\mathbb C/\Lambda$ 上の正則関数は定数である。
<!-- formal-statement-end -->

CA9 で非定数の二周期関数を得るには、正則関数ではなく **有理型関数** を許す必要がある。ここが楕円関数で極が避けられない理由である。

---

## 15. 典型例で全体をつなぐ

### 例1：対数は被覆上で一価

$\mathbb C^\times$ 上では閉曲線を一周すると対数が $2\pi i$ ずれる。しかし $\mathbb C$ 上の座標 $w$ では関数 $L(w)=w$ に何の多価性もない。多価性は基底空間へ押し下げたときに、異なるシートが同じ $z=e^w$ に重なるために生じる。

### 例2：平方根は二枚だが0で分岐する

$\mathbb C^\times$ 上の $w\mapsto w^2$ は二枚被覆である。原点を一周する 閉曲線 を持ち上げすると、$w_0$ から $-w_0$ へ移る。一周でシートが交換され、二周で戻る。

一方0を入れると局所同相性が失われる。ここで通常の被覆理論の証明機構が壊れる。

### 例3：トーラスでは平行移動が座標遷移

$\mathbb C/\Lambda$ の局所座標は平面の小円板を格子で同一視して作る。座標の重なりで起きることは

$$
z\mapsto z+\lambda
$$

だけであり、導関数は1である。そのため $dz$ が大域的な正則微分として降りる。

---

## 16. 演習

### Level A

<a id="ex-ca8-a01"></a>
#### CA8-A01 Riemann 球面の二つの座標を直接確認する
- Level: A

Riemann 球面の標準座標

$$
\varphi_0(z)=z,
\qquad
\varphi_\infty(z)=1/z
$$

について、重なりでの遷移写像とその逆が正則であることを計算し、$\infty$ 近傍で関数 $f(z)=1/z$ が正則であることを説明せよ。

<!-- solution-start -->
**解答**：

重なりは $\mathbb C^\times$ である。有限点座標 $z$ から無限遠点座標 $\zeta$ への遷移は

$$
\zeta=\frac1z,
$$

逆は

$$
z=\frac1\zeta.
$$

どちらも0を除いた領域で正則だから二つの座標は正則に両立する。

$f(z)=1/z$ を $\infty$ の座標 $\zeta=1/z$ で書けば

$$
f=\zeta.
$$

従って $\zeta=0$、すなわち $\infty$ の近くで通常の正則関数である。無限遠点での正則性は「$z$ を無限大へ飛ばして微分する」ことではなく、有限座標 $\zeta$ に戻して判定する。
<!-- solution-end -->

<a id="ex-ca8-a02"></a>
#### CA8-A02 位数は座標を変えても変わらない
- Level: A

$p$ のまわりの二座標が

$$
w=h(z),
\qquad
h(0)=0,\quad h'(0)\ne0
$$

で結ばれているとする。$z$ 座標で

$$
f=z^4(2+z)
$$

なら、$w$ 座標でも $\operatorname{ord}_p(f)=4$ であることを、$z=w\,v(w)$、$v(0)\ne0$ を使って示せ。

<!-- solution-start -->
**解答**：

$h'(0)\ne0$ なので逆写像定理により局所逆写像が正則で、

$$
z=w\,v(w),
\qquad
v(0)\ne0
$$

と書ける。代入すると

$$
f
=
(wv(w))^4\bigl(2+wv(w)\bigr)
=
w^4
\left[
v(w)^4\bigl(2+wv(w)\bigr)
\right].
$$

角括弧内は正則で、$w=0$ では

$$
2v(0)^4\ne0.
$$

従って $w$ 座標でも最初の非零冪は $w^4$ であり、

$$
\boxed{\operatorname{ord}_p(f)=4}.
$$

座標変換の一次係数が非零であることが、零点の次数を変えない機構である。
<!-- solution-end -->

<a id="ex-ca8-a03"></a>
#### CA8-A03 指数被覆で対数を持ち上げする
- Level: A

$$
p(w)=e^w
$$

とし、経路

$$
\gamma(t)=2e^{i\pi t}
\qquad(0\le t\le1)
$$

を考える。$w_0=\log2$ から始まる持ち上げを求め、その終点を答えよ。

<!-- solution-start -->
**解答**：

持ち上げ $\widetilde\gamma$ は

$$
e^{\widetilde\gamma(t)}
=
2e^{i\pi t}
$$

を満たし、$\widetilde\gamma(0)=\log2$ でなければならない。連続に角度を追えば

$$
\widetilde\gamma(t)
=
\log2+i\pi t.
$$

実際、

$$
e^{\log2+i\pi t}=2e^{i\pi t}.
$$

従って終点は

$$
\boxed{\log2+i\pi}.
$$

基底上では $2$ から $-2$ へ進むだけだが、被覆上では偏角の連続変化が虚部として保持される。
<!-- solution-end -->

<a id="ex-ca8-a04"></a>
#### CA8-A04 平方根のシート交換
- Level: A

$p(w)=w^2$ を $\mathbb C^\times\to\mathbb C^\times$ の被覆とみなす。

$$
\gamma(t)=e^{2\pi i t}
$$

を $w_0=1$ から持ち上げし、一周後と二周後の持ち上げの終点を求めよ。

<!-- solution-start -->
**解答**：

一周分では

$$
\widetilde\gamma(t)=e^{\pi i t}
$$

とすれば

$$
\widetilde\gamma(t)^2=e^{2\pi i t}=\gamma(t),
\qquad
\widetilde\gamma(0)=1.
$$

[経路持ち上げの一意性](#thm-ca8-path-lifting)からこれが唯一の持ち上げである。終点は

$$
\widetilde\gamma(1)=e^{\pi i}=-1.
$$

二周する経路 $e^{4\pi i t}$ なら持ち上げは $e^{2\pi i t}$ で、終点は1に戻る。

従って平方根は原点を一周すると二つのシートが交換され、二周すると元へ戻る。
<!-- solution-end -->

### Level B

<a id="ex-ca8-b01"></a>
#### CA8-B01 対数の モノドロミー を被覆で読む
- Level: B

$\gamma_n(t)=e^{2\pi i n t}$ とし、$\exp:\mathbb C\to\mathbb C^\times$ を使う。

1. $0$ から始まる持ち上げを求めよ。
2. 終点が $2\pi i n$ であることを示せ。
3. $n\ne m$ なら $\gamma_n,\gamma_m$ は端点固定ホモトピーで結ばれないことを、[持ち上げの終点不変性](#cor-ca8-lifted-homotopy-endpoint)から示せ。

<!-- solution-start -->
**解答**：

1. 
   $$
   \widetilde\gamma_n(t)=2\pi i n t
   $$
   と置けば
   $$
   e^{\widetilde\gamma_n(t)}
   =e^{2\pi i n t}
   =\gamma_n(t),
   \qquad
   \widetilde\gamma_n(0)=0.
   $$
   よって一意性からこれが持ち上げである。

2. したがって
   $$
   \widetilde\gamma_n(1)=2\pi i n.
   $$

3. もし $\gamma_n$ と $\gamma_m$ が端点固定ホモトピーなら、同じ初期点0からの持ち上げの終点は[端点固定ホモトピーと持ち上げの終点](#cor-ca8-lifted-homotopy-endpoint)により一致しなければならない。従って
   $$
   2\pi i n=2\pi i m,
   $$
   すなわち $n=m$ となる。よって $n\ne m$ なら端点固定ホモトピーではない。

ここでは 巻き数 を直接計算せず、被覆上の終点がホモトピー類を検出している。
<!-- solution-end -->

<a id="ex-ca8-b02"></a>
#### CA8-B02 正方格子の複素トーラス
- Level: B

$$
\Lambda=\mathbb Z+i\mathbb Z
$$

とする。

1. 非零格子点の絶対値が1以上であることを示せ。
2. 半径 $r<1/3$ の円板 $D(z,r)$ 上で商写像 $q:\mathbb C\to\mathbb C/\Lambda$ が単射であることを示せ。
3. 閉正方形
   $$
   P=\{x+iy:0\le x,y\le1\}
   $$
   の像が商空間全体であることを示し、コンパクト性を導け。

<!-- solution-start -->
**解答**：

1. 非零格子点は $m+in$、$(m,n)\in\mathbb Z^2\setminus\{(0,0)\}$ だから
   $$
   |m+in|=\sqrt{m^2+n^2}\ge1.
   $$

2. $u,v\in D(z,r)$ が同じ商点を表すとすると
   $$
   u-v\in\Lambda.
   $$
   しかも
   $$
   |u-v|
   \le|u-z|+|v-z|
   <2r<\frac23<1.
   $$
   非零格子点の絶対値は1以上なので $u-v=0$。従って $u=v$ で、$q$ は単射。

3. 任意の $z=x+iy$ に対し整数 $m,n$ を選んで
   $$
   x-m\in[0,1),\qquad y-n\in[0,1)
   $$
   とできる。従って
   $$
   z-(m+in)\in P,
   $$
   すなわち $z$ は $P$ 内の点と同値である。ゆえに
   $$
   q(P)=\mathbb C/\Lambda.
   $$
   $P$ はコンパクトで $q$ は連続だから、その連続像である商空間もコンパクトである。
<!-- solution-end -->

<a id="ex-ca8-b03"></a>
#### CA8-B03 トーラス上の $dz$ と正則関数
- Level: B

$X_\Lambda=\mathbb C/\Lambda$ を複素トーラスとする。

1. 座標 遷移が $z\mapsto z+\lambda$ なので $dz$ が大域的な正則微分へ降りることを示せ。
2. 一方、関数 $z$ 自身は一般に商上の関数へ降りないことを示せ。
3. $X_\Lambda$ 上の正則関数は定数であることを説明せよ。

<!-- solution-start -->
**解答**：

1. 座標 遷移
   $$
   w=z+\lambda
   $$
   に対し
   $$
   dw=dz.
   $$
   従って各座標で係数1の局所微分 $dz$ を置けば、重なりで一致する。[正則微分の定義](#def-ca8-holomorphic-one-form)を満たす。

2. 商上の関数へ降りるには
   $$
   f(z+\lambda)=f(z)
   $$
   が必要である。しかし $f(z)=z$ なら
   $$
   f(z+\lambda)=z+\lambda
   $$
   で、$\lambda\ne0$ なら $f(z)$ と一致しない。従って $z$ 自身は商上の一価関数ではない。

3. $X_\Lambda$ は[複素トーラスの定理](#thm-ca8-complex-torus)により連結コンパクト Riemann 面である。[コンパクト Riemann 面上の正則関数の剛性](#thm-ca8-compact-holomorphic-constant)から、任意の正則関数は定数である。

「正則関数は定数だが正則微分は非零で存在する」という差が、トーラス幾何の最初の重要な特徴である。
<!-- solution-end -->

### Level C

<a id="ex-ca8-c01"></a>
#### CA8-C01 被覆で モノドロミー を再構成する
- Level: C

$p:X\to Y$ を正則被覆、$F:X\to\mathbb C$ を正則関数とする。$y_0\in Y$、$x_0\in p^{-1}(y_0)$ を固定する。

1. 経路 $\gamma$ を $x_0$ から持ち上げ、各均等被覆近傍上で $F$ から局所正則枝を作れ。
2. 隣接する局所枝が解析接続として整合することを示せ。
3. 端点固定ホモトピーで結ばれた経路は同じ終点枝を与えることを示せ。
4. $p=\exp:\mathbb C\to\mathbb C^\times$、$F(w)=w$ に適用し、閉曲線を一周したときだけでは元の枝へ戻らない理由を説明せよ。
5. 基底 $Y$ が単連結で、任意の点への経路に沿ってこの解析接続が可能なら、終点枝が経路に依存しないことを説明せよ。

<!-- solution-start -->
**解答**：

**1. 局所枝の構成。**

[経路持ち上げ](#thm-ca8-path-lifting)により、$\gamma$ には唯一の 持ち上げ

$$
\widetilde\gamma:[0,1]\to X,
\qquad
\widetilde\gamma(0)=x_0
$$

がある。

$t_0$ を固定し、$y=\gamma(t_0)$ の均等被覆近傍 $V$ を取る。$\widetilde\gamma(t_0)$ を含むシートを $U$ とし、

$$
s=(p|_U)^{-1}:V\to U
$$

と置く。$p$ は正則被覆なので $s$ は正則である。そこで

$$
f_V=F\circ s
$$

と置けば $V$ 上正則な局所枝が得られる。

**2. 重なりでの整合性。**

二つの近傍 $V_1,V_2$ が経路の連続する区間を覆い、それぞれ持ち上げが通るシート$U_1,U_2$ を選ぶ。重なり区間では両方とも同じ基底経路 $\gamma$ の持ち上げであり、重なりの一時刻で同じ点を通る。

[経路持ち上げの一意性](#thm-ca8-path-lifting)から重なり区間全体で持ち上げは一致する。従って対応する局所逆写像も、その持ち上げが通る連結成分上で一致し、

$$
F\circ s_1=F\circ s_2
$$

となる。これは CA5 の解析接続鎖の整合条件そのものである。

**3. ホモトピー不変性。**

$\gamma_0,\gamma_1$ が端点固定ホモトピー $H$ で結ばれているとする。[ホモトピー持ち上げ](#thm-ca8-homotopy-lifting)で $H$ を $x_0$ から持ち上げる。

[端点固定ホモトピーと持ち上げの終点](#cor-ca8-lifted-homotopy-endpoint)から

$$
\widetilde\gamma_0(1)=\widetilde\gamma_1(1).
$$

終点の同じシート上で局所枝は $F$ と同じ局所逆写像の合成だから一致する。

**4. 対数。**

$p(w)=e^w$、$F(w)=w$ とする。単位円周

$$
\gamma(t)=e^{2\pi i t}
$$

を $x_0=0$ から持ち上げすると

$$
\widetilde\gamma(t)=2\pi i t.
$$

したがって

$$
\widetilde\gamma(1)=2\pi i\ne0.
$$

基底では始点と終点が同じ $1$ でも、被覆では異なるシートの点へ移る。終点近傍の局所対数は初期枝より $2\pi i$ 大きい。したがって一周では元の枝へ戻らない。

**5. 単連結の場合。**

$Y$ が単連結なら、同じ始点・終点を持つ二経路は端点固定ホモトピーで結ばれる。3よりその持ち上げの終点は一致し、従って終点枝も一致する。

よって解析接続の結果は経路に依存しない。これは CA5 のモノドロミー定理 を、被覆と持ち上げの言葉で再構成したものになっている。

この議論で重要なのは、「単連結だから何となく枝が一つになる」のではなく、

$$
\text{単連結}
\Rightarrow
\text{端点固定ホモトピー}
\Rightarrow
\text{持ち上げ終点一致}
\Rightarrow
\text{終点枝一致}
$$

という機構を一段ずつ追うことである。
<!-- solution-end -->

---

## 17. 章末チェック

- Riemann 面を Hausdorff・第二可算・複素1次元局所座標・正則遷移写像から定義した。
- 正則写像の定義が 座標 の選択に依存しないことを、座標遷移の合成として証明した。
- 零点・極の位数が局所座標に依存しないことを、双正則遷移写像の一次係数が非零であることから示した。
- Riemann 球面上の有理型関数が通常の有理関数に一致することを、極の有限性・主部の除去・[最大値原理](../CA3/index.md#thm-ca3-maximum-modulus)で証明した。
- 正則微分の座標変換則を導入し、複素トーラス上の $dz$ が大域化する例を置いた。
- 被覆写像を均等被覆近傍から定義し、経路持ち上げの存在と一意性を区間のコンパクト性から証明した。
- ホモトピー持ち上げを有限格子へ局所逆写像を貼ることで証明し、端点固定ホモトピーで持ち上げの終点が不変であることを導いた。
- 対数を $\exp:\mathbb C\to\mathbb C^\times$ 上の一価関数として、平方根を $w^2=z$ の二枚被覆上の一価関数として構成した。
- 平方根では0を入れると被覆性が壊れ、分岐点になることを明示した。
- $\mathbb C/\Lambda$ では商位相を置くだけで済ませず、[格子の離散性](#lem-ca8-lattice-discrete)、局所座標、Hausdorff 性、第二可算性、コンパクト性を個別に証明した。
- 連結コンパクト Riemann 面から複素平面への正則関数が定数であることを、コンパクト性と局所的な[最大値原理](../CA3/index.md#thm-ca3-maximum-modulus)から証明した。
- 一般被覆分類、普遍被覆の一般存在、被覆変換 の体系、分岐被覆の一般論、因子、Riemann--Roch の定理、一様化定理は使用していない。

次章 CA9 では、複素トーラス上の非定数有理型関数として楕円関数を導入し、Weierstrass の $\wp$ 関数を級数から構成する。
