# GBG13 ゲージ軌道とゲージ固定はどこが異なるか

[GBG12 のアフィン空間の定理](../GBG12/index.md#thm-gbg12-connections-affine)によって、固定した主束上の接続は基準接続に随伴束値1形式を加えて動かせると分かった。しかし、**接続を変えること**と**ゲージ変換で同じ軌道上を動くこと**は違う。前者は任意の方向への移動であり、後者は[GBG5 のゲージ群](../GBG5/index.md#def-gbg5-gauge-automorphism)が許す移動に限られる。

ここでは、接続への作用を定義して軌道・安定化群を区別し、無限小変換の符号を導く。そのうえで、条件を課して軌道から代表を選ぶ操作を「ゲージ固定」として調べる。区間と円周の例を通じ、**局所的には代表を一つ選べても、同じ条件が大域的な一意性を保証しない**ことを計算する。

**全節の設定**：$M$ は Hausdorff・第二可算・境界のない滑らかな有限次元多様体、$G$ は有限次元 Lie 群、$\pi:P\to M$ は滑らかな右主 $G$ 束とする。接続全体を $\mathcal A(P)$、基底を固定するゲージ自己同型全体を $\mathcal G(P)$ と書く。[GBG7 の接続形式](../GBG7/index.md#def-gbg7-connection-form)を $\omega$、局所 section $s_i$ での表示を $A_i=s_i^*\omega$ とする。局所ゲージ関数は $F_u(s_i)=s_i a_i$ であり、重なりで $a_j=g_{ij}^{-1}a_i g_{ij}$ を満たす（[GBG5 の局所整合条件](../GBG5/index.md#thm-gbg5-local-gauge)）。

## 1. ゲージ群は接続全体のどこへ動かすか

[GBG8 の引き戻し公式](../GBG8/index.md#prop-gbg8-gauge-pullback)では、束自己同型 $F_u$ により別の接続 $F_u^*\omega$ を作った。同じ section を使って比べると、行列群の場合は

$$
A_i\cdot a_i
:=a_i^{-1}A_i a_i+a_i^{-1}da_i
$$

となる。右辺の $a_i$ は好き勝手な局所関数ではなく、**一つの大域ゲージ変換から来る、重なりで整合した関数族**である。これにより「同じ接続の表示変更」ではなく「固定した表示において接続を動かす操作」を扱う。

<a id="thm-gbg13-connection-right-action"></a>

<!-- formal-statement-start -->
> **定理（ゲージ群による接続への右作用）**  
> 上記の滑らかな右主 $G$ 束 $P$ に対し、$\omega\cdot u:=F_u^*\omega$ と定めると、これは $\mathcal G(P)$ の $\mathcal A(P)$ への右作用である。すなわち単位元 $e$ と任意の $u,v$ について

$$
\omega\cdot e=\omega,\qquad
(\omega\cdot u)\cdot v=\omega\cdot(uv).
$$

> 局所表示は次の式で与えられる。

$
A_i\cdot a_i=\operatorname{Ad}_{a_i^{-1}}A_i+a_i^{-1}da_i.
$

> 一般の Lie 群では $a_i^{-1}da_i$ を左 Maurer–Cartan 形式の引き戻しと読む。
<!-- formal-statement-end -->

**証明の見取り図**。接続を引き戻しても接続の二条件は保たれる。合成の向きでは、関数 $F_u$ の合成と形式の引き戻しの順序が逆転する点が重要である。

<!-- proof-start -->
### 証明

[ゲージ自己同型による接続の引き戻し](../GBG8/index.md#prop-gbg8-gauge-pullback)により $F_u^*\omega$ は接続形式で、局所式も主張通りである。単位変換 $F_e=\operatorname{id}_P$ なので $\omega\cdot e=\omega$。

[GBG5 の合成則](../GBG5/index.md#thm-gbg5-gauge-sections)から $F_u\circ F_v=F_{uv}$。引き戻しの反変性を順に適用すると

$$
\begin{aligned}
(\omega\cdot u)\cdot v
&=F_v^*(F_u^*\omega)\\
&=(F_u\circ F_v)^*\omega\\
&=F_{uv}^*\omega=\omega\cdot(uv).
\end{aligned}
$$

これは右作用の順序である。局所的にも、$T_a(A):=a^{-1}Aa+a^{-1}da$ とおけば、積の微分 $d(ab)=(da)b+a\,db$ から

$$
\begin{aligned}
T_b(T_a(A))
&=b^{-1}a^{-1}Aab+b^{-1}a^{-1}(da)b+b^{-1}db\\
&=(ab)^{-1}A(ab)+(ab)^{-1}d(ab)\\
&=T_{ab}(A).
\end{aligned}
$$

よって大域・局所の順序が一致する。
<!-- proof-end -->

**直接例**。$P=\mathbb R\times U(1)$ の標準 section で $A=0$、$a(x)=e^{ix}$ とする。$a^{-1}da=i\,dx$ なので $A\cdot a=i\,dx$。同じ主束上の二接続は異なるが、ゲージ変換で結ばれる。一方、[GBG12 の任意の接続差](../GBG12/index.md#thm-gbg12-connection-difference)を加える操作が、必ずこの形になるわけではない。

## 2. 軌道と安定化群――「同じ接続」とは何を意味するか

一つの接続 $A$ に全ゲージ変換を施して到達できる集合が**軌道**である。異なる接続が同じ軌道にあるときだけ「ゲージ同値」とする。一方、接続を動かさないゲージ変換もあり、それらは**安定化群**をなす。

<a id="def-gbg13-orbit"></a>

<!-- formal-statement-start -->
> **定義（ゲージ軌道・ゲージ同値・軌道集合）**  
> 固定した滑らかな右主 $G$ 束 $P\to M$ と接続 $\omega\in\mathcal A(P)$ に対し、

$$
\mathcal O_\omega=\{\omega\cdot u:u\in\mathcal G(P)\}
$$

> を $\omega$ の**ゲージ軌道**という。$\omega_0$ と $\omega_1$ がゲージ同値であるとは、$\omega_1\in\mathcal O_{\omega_0}$ となることをいう。軌道全体の集合を $\mathcal A(P)/\mathcal G(P)$ と記す。これは集合としての商であり、追加の解析的条件なしに滑らかな多様体とみなすものではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg13-orbit -->
**定義の確認**。$\mathbb R\times U(1)$ 上で $A_0=0$、$A_1=i\,dx$ とする。$a=e^{ix}$ により $A_1=T_a(A_0)$ なので二つは同じ軌道にある。他方、$\mathbb R^2\times U(1)$ 上の $A_0=0$ と $A_2=i x\,dy$ は同じ軌道にない。実際、[曲率の局所構造方程式](../GBG10/index.md#thm-gbg10-local-formula)より $F_0=0$、$F_2=i\,dx\wedge dy\neq0$ であり、可換群の[曲率変換則](../GBG10/index.md#thm-gbg10-gauge-transform)では曲率が不変だからである。
<!-- definition-example-end -->

<a id="def-gbg13-stabilizer"></a>

<!-- formal-statement-start -->
> **定義（接続の安定化群）**  
> 同じ主束 $P\to M$ の接続 $\omega$ に対し、

$$
\operatorname{Stab}(\omega)
=\{u\in\mathcal G(P):\omega\cdot u=\omega\}
$$

> を $\omega$ の**安定化群**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg13-stabilizer -->
**定義の確認**。連結な区間 $I$ 上の積 $U(1)$ 主束で $A=i b(x)\,dx$、$a=e^{if(x)}$ とすると、可換性から $T_a(A)=A+i\,df$。従って $T_a(A)=A$ は $df=0$ と同値で、各区間で位相が一定である。位相の大域的持ち上げを仮定しなくても、$a^{-1}da=0$ は $da=0$ を意味するので、安定化群は定数 $U(1)$ 値関数の群である。
<!-- definition-example-end -->

<a id="prop-gbg13-stabilizer-subgroup"></a>

<!-- formal-statement-start -->
> **命題（安定化群は部分群、軌道は剰余類に対応する）**  
> 任意の $\omega\in\mathcal A(P)$ に対し、$\operatorname{Stab}(\omega)$ は $\mathcal G(P)$ の部分群である。また右剰余類の集合に関して

$$
\operatorname{Stab}(\omega)\backslash\mathcal G(P)
\longrightarrow\mathcal O_\omega,\qquad
\operatorname{Stab}(\omega)\,u\longmapsto\omega\cdot u
$$

> は全単射である。
<!-- formal-statement-end -->

**証明の見取り図**。作用の合成則を使うと、二つの変換が同じ接続へ送る条件は、その比が安定化群に入る条件と等しい。

<!-- proof-start -->
### 証明

単位元は接続を固定する。$h,k\in\operatorname{Stab}(\omega)$ なら

$$
\omega\cdot(hk)=(\omega\cdot h)\cdot k=\omega.
$$

また $\omega\cdot h=\omega$ の両辺に右から $h^{-1}$ を作用させると $\omega\cdot h^{-1}=\omega$。従って部分群である。

二つの群元 $u,v$ について

$$
\begin{aligned}
\omega\cdot u=\omega\cdot v
&\iff(\omega\cdot u)\cdot v^{-1}=\omega\\
&\iff\omega\cdot(uv^{-1})=\omega\\
&\iff uv^{-1}\in\operatorname{Stab}(\omega).
\end{aligned}
$$

最後の条件は $u=hv$ を満たす $h\in\operatorname{Stab}(\omega)$ があること、すなわち $\operatorname{Stab}(\omega)u=\operatorname{Stab}(\omega)v$ と同値である。よって表示は well-defined で単射。軌道の定義から全射でもある。
<!-- proof-end -->

**見取り図**：$\mathcal A(P)$ は接続を全部並べた空間で、$\mathcal O_\omega$ はそのうち一つの接続からゲージ変換で届く部分である。商集合は軌道を一点にまとめる。安定化群が自明とは限らないので、単純に「各軌道はゲージ群と同じ個数の点を持つ」とは言えない。

## 3. 無限小ゲージ変換の符号を計算する

有限のゲージ変換を一つ選ぶ代わりに、単位元の近くで $a_t=\exp(t\varepsilon)$ と動かした際の接続の変化率を調べる。ここで $\varepsilon$ は随伴 Lie 環束の滑らかな切断を局所表示した Lie 環値関数で、重なりでは $\varepsilon_j=\operatorname{Ad}_{g_{ij}^{-1}}\varepsilon_i$ を満たす（[GBG5 の随伴Lie環束](../GBG5/index.md#def-gbg5-adjoint-lie-bundle)）。

まず局所的に、既習の[GBG11 の局所共変外微分](../GBG11/index.md#def-gbg11-local-covariant-exterior)を0形式へ作用させると

$$
d_A\varepsilon=d\varepsilon+[A,\varepsilon]
$$

となる。右作用 $A\cdot a$ の微分では、これが**正符号**で現れる。

<a id="thm-gbg13-infinitesimal-action"></a>

<!-- formal-statement-start -->
> **定理（接続と曲率の無限小ゲージ変換）**  
> $P\to M$ を滑らかな右主 $G$ 束、$\omega$ をその接続とする。$\varepsilon$ を $\operatorname{ad}(P)$ の滑らかな切断とし、$a_t=\exp(t\varepsilon)$ を局所ゲージ関数として $\omega_t=\omega\cdot a_t$ を定める。局所接続 $A$、曲率 $F$ に対し、$t=0$ における変化率は

$$
\delta_\varepsilon A
:=\left.\frac{d}{dt}\right|_{t=0}A_t
=d_A\varepsilon=d\varepsilon+[A,\varepsilon],
$$

$$
\delta_\varepsilon F
:=\left.\frac{d}{dt}\right|_{t=0}F_t
=[F,\varepsilon].
$$

> この表示は行列群での積を使って書ける。一般の Lie 群でも、括弧を Lie 環の括弧と読み、Maurer–Cartan 形式を微分すれば同じ等式になる。
<!-- formal-statement-end -->

**証明の見取り図**。まず有限変換の $a_t^{-1}A a_t$ と $a_t^{-1}da_t$ をそれぞれ一次まで展開する。曲率については[GBG10 の曲率の共変変換](../GBG10/index.md#thm-gbg10-gauge-transform)を一次まで展開すればよい。

<!-- proof-start -->
### 証明

行列群では $a_t=I+t\varepsilon+O(t^2)$、$a_t^{-1}=I-t\varepsilon+O(t^2)$。$t$ は空間変数ではないので

$$
da_t=t\,d\varepsilon+O(t^2).
$$

積を一段ずつ計算すると

$$
\begin{aligned}
a_t^{-1}A a_t
&=(I-t\varepsilon)A(I+t\varepsilon)+O(t^2)\\
&=A+t(A\varepsilon-\varepsilon A)+O(t^2),\\
a_t^{-1}da_t&=t\,d\varepsilon+O(t^2).
\end{aligned}
$$

従って

$$
A_t=A+t\bigl(d\varepsilon+[A,\varepsilon]\bigr)+O(t^2).
$$

一般の Lie 群では $\left.\frac d{dt}\right|_0\operatorname{Ad}_{a_t^{-1}}A=-[\varepsilon,A]$、$\left.\frac d{dt}\right|_0a_t^{-1}da_t=d\varepsilon$ で同じ結果になる。

次に[局所曲率のゲージ共変性](../GBG10/index.md#thm-gbg10-gauge-transform)より $F_t=\operatorname{Ad}_{a_t^{-1}}F$。よって

$$
F_t=(I-t\varepsilon)F(I+t\varepsilon)+O(t^2)
=F+t(F\varepsilon-\varepsilon F)+O(t^2).
$$

これを $t$ で微分すると $\delta_\varepsilon F=[F,\varepsilon]$ である。いずれも各パッチで整合し、随伴束値の式を定める。
<!-- proof-end -->

**符号の約束**。本講の変換は $A\cdot a=T_a(A)$ だから $\delta_\varepsilon A=+d_A\varepsilon$ となる。代わりに $T_{a^{-1}}(A)$ を作用として用いれば、同じ $\varepsilon$ に対する一次変化は $-d_A\varepsilon$ になる。二つの符号を混ぜない。

**非可換な直接計算**。$G=GL(2,\mathbb R)$、$H=E_{11}$、$X=E_{12}$ とおく。$HX=X$、$XH=0$ だから $[H,X]=X$。$\mathbb R^2$ 上で

$$
A=H\,dx+X\,dy,\qquad \varepsilon=H
$$

とすると、

$$
d_A\varepsilon=[A,H]=-X\,dy,
\qquad F=[H,X]\,dx\wedge dy=X\,dx\wedge dy.
$$

また $[F,\varepsilon]=[X,H]\,dx\wedge dy=-X\,dx\wedge dy$。有限変換の曲率が一次でどう動くかを、この二つの式から照合できる。

### 安定化群を無限小で調べる

$a_t=\exp(t\varepsilon)$ が接続を固定するためには、少なくとも $\delta_\varepsilon A=0$ が必要である。実際にはこの条件から全ての $t$ で固定することも導ける。

<a id="prop-gbg13-stabilizer-lie-algebra"></a>

<!-- formal-statement-start -->
> **命題（安定化群の無限小条件）**  
> $P\to M$ と接続 $\omega$ を上記の通りとする。随伴 Lie 環束の切断 $\varepsilon$ が生成する1パラメータのゲージ変換 $\exp(t\varepsilon)$ が全ての実数 $t$ で $\omega$ を固定するための必要十分条件は

$$
d_\omega\varepsilon=0
$$

> である。従って安定化群の1パラメータ部分群を生成する無限小方向は $\ker d_\omega$ に一致する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

必要性は $\omega\cdot\exp(t\varepsilon)=\omega$ を $t=0$ で微分して[無限小作用の定理](#thm-gbg13-infinitesimal-action)を使えば従う。

十分性は行列群の局所表示で示す。$d_A\varepsilon=d\varepsilon+A\varepsilon-\varepsilon A=0$ とする。各座標方向 $\partial_i$ について $A_i=A(\partial_i)$ と書き、$a_t=e^{t\varepsilon}$ に対して

$
K_i(t)=a_t^{-1}A_i a_t+a_t^{-1}\partial_i a_t
$

を考える。$\partial_t a_t=\varepsilon a_t$ と $\partial_t a_t^{-1}=-a_t^{-1}\varepsilon$ により、積を微分して

$
\begin{aligned}
K_i'(t)
&=a_t^{-1}[A_i,\varepsilon]a_t
+a_t^{-1}(\partial_i\varepsilon)a_t\\
&=a_t^{-1}(\partial_i\varepsilon+[A_i,\varepsilon])a_t=0.
\end{aligned}
$

$K_i(0)=A_i$ なので $K_i(t)=A_i$ が全ての $t$ で成り立つ。つまり $d a_t+A a_t-a_tA=0$。左から $a_t^{-1}$ を掛けて整理すると

$$
a_t^{-1}A a_t+a_t^{-1}da_t=A
$$

だから全ての $t$ で固定する。一般 Lie 群でも、$d_A\varepsilon=0$ は接続による平行性を意味し、$\exp$ が共役作用と可換であることから同じ結論になる。
<!-- proof-end -->

この「無限小方向が零になる」ことと、有限の安定化群が単位元しかないことは同値ではない。例えば $U(1)$ の定数ゲージ変換は接続を固定する。

## 4. ゲージ固定は条件を満たす代表を選ぶ操作

軌道は接続の**集合**、ゲージ固定はその軌道から条件によって**代表を選ぶ操作**である。まず接続に方程式 $C(A)=0$ を課し、その解の集合を考える。その集合が一つの軌道と何回交わるかが問題になる。

<a id="def-gbg13-gauge-fixing"></a>

<!-- formal-statement-start -->
> **定義（ゲージ固定条件と残余ゲージ変換）**  
> 接続空間 $\mathcal A(P)$ 上の条件 $C(A)=0$ に対し、その解集合

$$
\mathcal S_C=\{A\in\mathcal A(P):C(A)=0\}
$$

> を**ゲージ固定条件を満たす集合**という。$A,B\in\mathcal S_C$ が同じゲージ軌道に属する場合、$A$ を $B$ に送るゲージ変換を、この条件に関する**残余ゲージ変換**という。条件による代表選択が一意であるとは、対象とする各軌道と $\mathcal S_C$ の交点が一点であることをいう。交点が複数なら条件だけでは一意に固定できていない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg13-gauge-fixing -->
**定義の確認**。$\mathbb R$ 上の積 $U(1)$ 主束で $A=i b(x)\,dx$ とし、条件を $C(A)=b$、すなわち $A=0$ とする。$A=0$ を固定する定数 $a=e^{ic}$ は存在するが、これらは**同じ代表を動かさない**。したがって残余ゲージ変換が存在することと、固定条件を満たす異なる代表が複数あることは別の現象である。以下で、基点における値を指定すればこの定数の自由度も消せる。
<!-- definition-example-end -->

### 区間では基点を固定して代表を一つにできる

以下では $U(1)=\{z\in\mathbb C:|z|=1\}$ を単位円群と呼ぶ。

<a id="thm-gbg13-interval-fixing"></a>

<!-- formal-statement-start -->
> **定理（区間上の単位円群接続の基点付きゲージ固定）**  
> $I\subset\mathbb R$ を連結な開区間、$x_0\in I$ とし、積主束 $I\times U(1)$ の滑らかな接続を標準 section で $A=i b(x)\,dx$（$b:I\to\mathbb R$ は滑らか）と書く。このとき $a(x_0)=1$ を満たす滑らかなゲージ関数 $a:I\to U(1)$ のうち、$T_a(A)=0$ を満たすものは唯一存在し、

$$
a(x)=\exp\left(-i\int_{x_0}^x b(t)\,dt\right)
$$

> で与えられる。基点条件を外すと解は任意の定数 $U(1)$ を掛けたものだけ存在する。
<!-- formal-statement-end -->

**証明の見取り図**。$U(1)$ は可換なので $T_a(A)=A+a^{-1}da$ である。これは $a'(x)=-i b(x)a(x)$ という一次の方程式になり、積分で解ける。

<!-- proof-start -->
### 証明

表示した $a$ は滑らかで $a(x_0)=e^0=1$。基本定理から

$$
a'(x)=-i b(x)\exp\left(-i\int_{x_0}^x b(t)\,dt\right)
=-i b(x)a(x).
$$

従って $a^{-1}da=-i b(x)\,dx$ であり、

$$
T_a(A)=i b(x)\,dx-i b(x)\,dx=0.
$$

逆に $T_c(A)=0$ なら $c^{-1}dc=-i b(x)\,dx$、従って $c'=-i bc$。$c/a$ を微分すれば

$$
\left(\frac ca\right)'=\frac{c'a-ca'}{a^2}
=\frac{-ibca+ibca}{a^2}=0.
$$

連結区間なので $c/a$ は定数。$c(x_0)=a(x_0)=1$ ならその定数は1で $c=a$。基点条件がなければ任意の定数倍が全解である。
<!-- proof-end -->

**何を選んだのか**。この例では、全ての接続が $A=0$ の同じ軌道にある。基点値の指定は「ゲージ変換の選び方」の一意性を作り、条件 $A=0$ は「接続の代表」を指定する。二つを区別する。

### 円周では同じ局所条件が複数の代表を残す

円周 $S^1$ を $\theta\in\mathbb R/(2\pi\mathbb Z)$ で表す。$d\theta$ は局所角座標の微分を貼り合わせた大域1形式であり、$\theta$ 自体は一つの実数値大域関数ではない。$a_n(e^{i\theta})=e^{in\theta}$ は整数 $n$ に対してだけ一価な滑らかな $U(1)$ 値関数になる。

<a id="thm-gbg13-circle-orbits"></a>

<!-- formal-statement-start -->
> **定理（円周上の単位円群接続の軌道分類）**  
> 積主束 $S^1\times U(1)$ 上の滑らかな接続を、標準 section で $A=i b(\theta)\,d\theta$ と書く。ここで $b$ は滑らかな実数値 $2\pi$ 周期関数である。このとき各接続は定数形 $A_\lambda=i\lambda\,d\theta$ にゲージ同値であり、

$$
A_\lambda\sim A_\mu
\quad\Longleftrightarrow\quad
\mu-\lambda\in\mathbb Z.
$$

> 従って軌道集合は集合として $\mathbb R/\mathbb Z$ と一対一に対応する。
<!-- formal-statement-end -->

**証明の見取り図**。平均を引いた周期関数は原始関数を一周後にも同じ値で戻す。残る定数は円周を一周したゲージ関数の位相の整数回の巻きだけ変えられる。

<!-- proof-start -->
### 証明

まず

$$
\lambda=\frac1{2\pi}\int_0^{2\pi}b(t)\,dt,\qquad
f(\theta)=\int_0^\theta(\lambda-b(t))\,dt
$$

と置く。積分の定義から $f(2\pi)=0=f(0)$。被積分関数が周期的なので $f(\theta+2\pi)=f(\theta)$ が全ての $\theta$ で成立する。よって $a=e^{if}$ は円周上の滑らかなゲージ関数となり、

$$
T_a(A)=i(b+f')\,d\theta
=i\bigl(b+\lambda-b\bigr)\,d\theta=A_\lambda.
$$

次に $A_\mu=T_a(A_\lambda)$ とする。円周の角座標の普遍被覆 $\mathbb R\to S^1$ 上では、任意の滑らかな $a$ を $a(e^{i\theta})=e^{if(\theta)}$ と実数値滑らかな $f$ で表せる。これは区間上で位相を連続に選べることにより得られ、円周の一価性は

$$
f(\theta+2\pi)-f(\theta)=2\pi n\qquad(n\in\mathbb Z)
$$

を意味する。$U(1)$ が可換なため

$$
i\mu\,d\theta=i\lambda\,d\theta+i f'(\theta)\,d\theta,
\qquad f'(\theta)=\mu-\lambda.
$$

一周積分すると $2\pi(\mu-\lambda)=2\pi n$、つまり $\mu-\lambda=n\in\mathbb Z$。

逆に $\mu-\lambda=n\in\mathbb Z$ なら $a_n(e^{i\theta})=e^{in\theta}$ は一価で、$a_n^{-1}da_n=in\,d\theta$。ゆえに $T_{a_n}(A_\lambda)=A_{\lambda+n}=A_\mu$。必要十分性が示された。
<!-- proof-end -->

**ゲージ固定の落とし穴**。「接続の係数を定数にする」という条件は、各軌道と確かに交わる。しかし一つの軌道には $A_\lambda,A_{\lambda+1},A_{\lambda+2},\ldots$ も含まれ、**交点は一つではない**。区間では基点付きの微分方程式で一意にしたのに対し、円周では一周して戻る大域条件が追加される。例えば $A_{1/2}$ は局所的に $0$ へ変換できても、円周全体で $A=0$ に変換することはできない。

円周の定数ゲージ変換はどの $A_\lambda$ も固定する。それとは別に $a_n$（$n\ne0$）は定数条件を保ちながら**別の**代表へ動かす。これが安定化群と「条件を保つ残余変換」の違いである。ここで示したのは具体的な $U(1)$ の例であり、一般の非可換主束に大域的な一意ゲージ固定が存在するという主張ではない。

---

## 5. 演習と詳細解答

### Level A：作用・符号・安定化群の基礎

<a id="ex-gbg13-a01"></a>
#### GBG13-A01 右作用の合成順序
- Level: A

行列群の局所関数 $a,b$ に対し $T_b(T_a(A))=T_{ab}(A)$ を積の微分から示せ。これを $T_{ba}(A)$ と書いてよいかも答えよ。

<!-- solution-start -->
**詳細解答**。まず $T_a(A)=a^{-1}Aa+a^{-1}da$。これを $T_b$ へ代入すると

$$
\begin{aligned}
T_b(T_a(A))
&=b^{-1}(a^{-1}Aa+a^{-1}da)b+b^{-1}db\\
&=(ab)^{-1}A(ab)+b^{-1}a^{-1}(da)b+b^{-1}db.
\end{aligned}
$$

積の微分 $d(ab)=(da)b+a\,db$ から

$$
(ab)^{-1}d(ab)=b^{-1}a^{-1}(da)b+b^{-1}db.
$$

従って $T_b(T_a(A))=T_{ab}(A)$。一般に $ab\ne ba$ なので $T_{ba}$ と置き換えられない。
<!-- solution-end -->

<a id="ex-gbg13-a02"></a>
#### GBG13-A02 曲率を変えない $U(1)$ ゲージ変換
- Level: A

$\mathbb R^2$ 上の $U(1)$ ポテンシャル $A=i x\,dy$ と $a(x,y)=e^{2ix}$ について $A'=T_a(A)$、$F$、$F'$ を求めよ。

<!-- solution-start -->
**詳細解答**。可換群なので $a^{-1}Aa=A$。また $da=2i e^{2ix}\,dx$ より $a^{-1}da=2i\,dx$。したがって

$$
A'=i x\,dy+2i\,dx.
$$

[GBG10 の曲率公式](../GBG10/index.md#thm-gbg10-local-formula)において $U(1)$ の括弧項は零なので、

$$
F=dA=i\,dx\wedge dy,\qquad
F'=dA'=i\,dx\wedge dy+2i\,d^2x=i\,dx\wedge dy.
$$

接続の表示は変わるが曲率は一致する。
<!-- solution-end -->

<a id="ex-gbg13-a03"></a>
#### GBG13-A03 無限小変換の正符号
- Level: A

$\mathbb R$ 上で $G=U(1)$、$A=0$、$\varepsilon(x)=ix^2/2$ とする。$a_t=e^{t\varepsilon}$ に対する $\left.\frac d{dt}\right|_0T_{a_t}(A)$ を求めよ。

<!-- solution-start -->
**詳細解答**。$a_t=e^{itx^2/2}$ だから

$$
da_t=itx\,e^{itx^2/2}\,dx,\qquad
a_t^{-1}da_t=itx\,dx.
$$

$A=0$ なので $T_{a_t}(A)=itx\,dx$。従って変化率は $ix\,dx$ である。別に $d_A\varepsilon=d\varepsilon=ix\,dx$ と計算しても一致する。変換を $T_{a_t^{-1}}$ に替えた場合に限り符号は負になる。
<!-- solution-end -->

<a id="ex-gbg13-a04"></a>
#### GBG13-A04 安定化群と基点条件
- Level: A

連結区間 $I$ 上の $U(1)$ 接続 $A=i b(x)\,dx$ に対し、全ての滑らかなゲージ関数の中で $T_a(A)=A$ を満たすものを求めよ。さらに $a(x_0)=1$ と課すとどうなるか。

<!-- solution-start -->
**詳細解答**。$U(1)$ の可換性から $T_a(A)=A+a^{-1}da$。従って固定条件は $a^{-1}da=0$、すなわち $da=0$。連結区間上の微分零の滑らかな関数は定数なので $a(x)=c\in U(1)$ の全体が安定化群である。基点で $a(x_0)=1$ と課せば定数は $c=1$ に限られ、恒等変換のみ残る。
<!-- solution-end -->

### Level B：非可換性と大域条件

<a id="ex-gbg13-b01"></a>
#### GBG13-B01 曲率零でも非可換な項は打ち消し合う
- Level: B

$G=GL(2,\mathbb R)$、$H=E_{11}$、$X=E_{12}$、$A=H\,dx$、$a(x,y)=I+yX$ とする。$T_a(A)$ とその曲率を求めよ。$X^2=0$ を使ってよい。

<!-- solution-start -->
**詳細解答**。$a^{-1}=I-yX$、$da=X\,dy$ である。$HX=X$、$XH=0$、$XHX=0$ より

$$
a^{-1}Ha=(I-yX)H(I+yX)=H+yX,\qquad
a^{-1}da=X\,dy.
$$

従って $A'=(H+yX)\,dx+X\,dy$。外微分と非可換補正を別々に計算すると

$$
dA'=X\,dy\wedge dx=-X\,dx\wedge dy,
$$

$$
A'\wedge A'=[H+yX,X]\,dx\wedge dy
=X\,dx\wedge dy.
$$

両者が相殺して $F'=0$。もとの $A=H\,dx$ も $F=0$ である。非斉次項を捨てるとこの相殺が見えない。
<!-- solution-end -->

<a id="ex-gbg13-b02"></a>
#### GBG13-B02 非可換な安定化群の判定
- Level: B

$\mathbb R$ 上の $GL(2,\mathbb R)$ 接続 $A=H\,dx$（$H=E_{11}$）について、定数ゲージ関数 $a=\operatorname{diag}(2,1)$ が安定化群に入ることを示せ。一方 $b(x)=I+xE_{12}$ が入らないことを示せ。

<!-- solution-start -->
**詳細解答**。定数 $a$ は $da=0$ かつ $a^{-1}Ha=H$ なので $T_a(A)=H\,dx=A$ である。$X=E_{12}$ とおくと $b^{-1}=I-xX$、$db=X\,dx$、$HX=X$、$XH=0$ から

$$
b^{-1}Hb=H+xX,\qquad b^{-1}db=X\,dx.
$$

従って

$$
T_b(A)=(H+(x+1)X)\,dx.
$$

これは $A$ と一致しない。従って $a$ は安定化群に入るが $b$ は入らない。曲率が両方零であっても安定化群に入るかどうかは別問題である。
<!-- solution-end -->

<a id="ex-gbg13-b03"></a>
#### GBG13-B03 $\delta F=[F,\varepsilon]$ を独立に検算する
- Level: B

$H=E_{11}$、$X=E_{12}$、$A=H\,dx+X\,dy$、$\varepsilon=H$ とする。$\delta A=d_A\varepsilon$ を求め、曲率変化公式に代入して $\delta F=[F,\varepsilon]$ と一致することを確かめよ。

<!-- solution-start -->
**詳細解答**。$dH=0$、$[H,H]=0$、$[X,H]=-X$ より

$$
\delta A=dH+[H,H]\,dx+[X,H]\,dy=-X\,dy.
$$

もとの曲率は $F=X\,dx\wedge dy$。$A_t=A+t\delta A$ と置き、[接続を変えたときの曲率の差](../GBG12/index.md#prop-gbg12-curvature-variation)を用いると

$$
F_t=F+t\,d_A(\delta A)+\frac{t^2}{2}[\delta A\wedge\delta A].
$$

$d(\delta A)=0$、$\delta A$ は $dy$ 方向のみなので二次項も零であり、

$$
d_A(\delta A)=[H\,dx,-X\,dy]
=-X\,dx\wedge dy.
$$

従って $\delta F=-X\,dx\wedge dy$。一方 $[F,\varepsilon]=[X,H]\,dx\wedge dy=-X\,dx\wedge dy$ で一致する。
<!-- solution-end -->

<a id="ex-gbg13-b04"></a>
#### GBG13-B04 周期関数を定数形へ直す
- Level: B

$S^1$ 上の $A=i(2+\sin\theta)\,d\theta$ を $A_\lambda=i\lambda\,d\theta$ の形へ送る周期的なゲージ関数を構成せよ。さらに $A_\lambda$ と $A_{\lambda+1}$ がゲージ同値であることを示せ。

<!-- solution-start -->
**詳細解答**。$b(\theta)=2+\sin\theta$ の一周平均は

$$
\lambda=\frac1{2\pi}\int_0^{2\pi}(2+\sin t)\,dt=2.
$$

$\lambda-b=-\sin\theta$ の原始関数を $f(\theta)=\cos\theta-1$ と取ると $f(0)=f(2\pi)=0$ で周期的である。$a=e^{if}$ なら $a^{-1}da=i f'(\theta)\,d\theta=-i\sin\theta\,d\theta$。よって

$$
T_a(A)=i(2+\sin\theta)\,d\theta-i\sin\theta\,d\theta=2i\,d\theta.
$$

さらに $a_1(e^{i\theta})=e^{i\theta}$ は円周上の一価な関数で $a_1^{-1}da_1=i\,d\theta$。従って $T_{a_1}(A_\lambda)=A_{\lambda+1}$ であり、定数形へ直す条件だけでは一意にならない。
<!-- solution-end -->

### Level C：軌道・固定・残余変換を通して考える

<a id="ex-gbg13-c01"></a>
#### GBG13-C01 円周上の二接続はいつ同じ軌道か
- Level: C

$S^1\times U(1)$ 上で次の二接続を考える。

$$
A=i(\alpha+\sin\theta)\,d\theta,\qquad
B=i(\beta+\cos\theta)\,d\theta
\qquad(\alpha,\beta\in\mathbb R).
$$

(1) $A$ と $B$ がゲージ同値であるための必要十分条件を示し、同値なときのゲージ関数を一つ構成せよ。

(2) 両者の曲率を計算し、曲率の一致だけからゲージ同値を結論できるか判定せよ。

(3) 「定数係数にする」という条件がなぜ軌道ごとの唯一の代表を選べないか、安定化群と区別して説明せよ。

<!-- solution-start -->
**詳細解答**。

**(1)** $B=T_a(A)$ は $U(1)$ の可換性から $a^{-1}da=i(\beta-\alpha+\cos\theta-\sin\theta)\,d\theta$ と同値である。角度の被覆上で $a=e^{if}$ と書けば

$$
f'(\theta)=\beta-\alpha+\cos\theta-\sin\theta.
$$

これを積分すると

$$
f(\theta)=(\beta-\alpha)\theta+\sin\theta+\cos\theta+c.
$$

$e^{if}$ が一周後も同じ値であるための条件は

$$
e^{i(f(2\pi)-f(0))}=e^{2\pi i(\beta-\alpha)}=1,
$$

すなわち $\beta-\alpha\in\mathbb Z$ である。逆に差が整数 $n$ なら

$$
a(e^{i\theta})=\exp\bigl(i(n\theta+\sin\theta+\cos\theta)\bigr)
$$

は一価な滑らかなゲージ関数で、$a^{-1}da=i(n+\cos\theta-\sin\theta)\,d\theta$。従って $T_a(A)=B$。

**(2)** $S^1$ は1次元なので任意の2形式が零である。[局所曲率公式](../GBG10/index.md#thm-gbg10-local-formula)より、両者とも $F=dA=dB=0$。しかし例えば $\alpha=0$、$\beta=1/2$ なら (1) の整数条件を満たさず、曲率が一致してもゲージ同値ではない。

**(3)** [円周の軌道分類](#thm-gbg13-circle-orbits)により、任意の接続は $i\lambda\,d\theta$ に変えられる。しかし整数 $n$ に対する $a_n=e^{in\theta}$ は $i\lambda\,d\theta$ を $i(\lambda+n)\,d\theta$ に移し、どちらも定数条件を満たす。これは[本講の定義](#def-gbg13-gauge-fixing)にいう残余ゲージ変換であり、異なる代表を結ぶ。これに対し定数 $a=e^{ic}$ は $a^{-1}da=0$ なので接続そのものを変えない**安定化群**の元である。二つの現象を区別する必要がある。
<!-- solution-end -->

---

## 6. 次に何ができるか

固定した主束上の接続空間はアフィン空間だが、ゲージ群はその中の軌道に沿って作用する。無限小軌道方向は $d_A\varepsilon$、安定化群の無限小方向は $d_A\varepsilon=0$ で特徴付けられる。ゲージ固定は軌道そのものではなく、条件による**代表選択**である。

次の **GBG14「接続は曲線に沿って何を運ぶか」** では、接続を曲線に制限して水平リフトと平行移動を構成する。円周の例で現れた、一周しても消せない情報を、曲線に沿う輸送から読み直すことになる。
