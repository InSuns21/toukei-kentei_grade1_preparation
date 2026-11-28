# MQFC38 Peierls括弧と自由場の積

[汎関数微分](../MQFC37/index.md#def-mqfc37-functional-derivative)によって、観測量を場の変化に対する応答として書けるようになった。今度は一つの観測量を作用に加えたとき、別の観測量がどう変わるかを調べる。未来へ伝わる応答と過去へ伝わる応答の差から古典的な括弧を作り、その括弧を量子交換子として再現する積を構成する。

## 1. 二つの応答の差

舞台は $M=\mathbb R^{1+3}$、計量は $(-,+,+,+)$、実自由スカラー場の方程式は $P\phi=0$ とする。

$$
P=-\Box+m^2=\partial_t^2-\Delta_{\boldsymbol x}+m^2,\qquad m\ge0.
$$

ここで $t$ は時間、$\boldsymbol x=(x^1,x^2,x^3)$ は空間座標であり、$\partial_t$ は空間座標を固定した時間偏微分、$\Delta_{\boldsymbol x}=\sum_{j=1}^3\partial_{x^j}^2$ は空間Laplacianである。平坦時空の自明な実直線束上で $P$ を扱う。試験関数は $C_c^\infty(M)$ の元、すなわち滑らかでコンパクト支持を持つ関数とする。

場の配置空間は $C^\infty(M,\mathbb R)$ とし、まだ方程式を課さない。積分の密度は $d^4x$、複素数値の場合も対 $\langle f,u\rangle=\int_M fu$ は双線形とする。[遅延・先進Green作用素](../../../解析系/HPDE/HPDE18/index.md#def-hpde18-green-operators) はコンパクト支持の滑らかな源 $f$ をそれぞれ未来・過去に広がる滑らかな解へ送る。

二つの解の差は [因果伝播子](../../../解析系/HPDE/HPDE21/index.md#def-hpde21-causal-propagator) $E=G_{\mathrm{ret}}-G_{\mathrm{adv}}$ である。自由作用の変分を $-P\phi$ とする。例えば $\partial_\mu$ は時空座標 $x^\mu$（$\mu=0,1,2,3$、$x^0=t$）の偏微分、$\partial^\mu=\eta^{\mu\nu}\partial_\nu$ は計量で添字を上げた微分とし、重複する上下添字は和を取る。作用密度を $-(\partial_\mu\phi\partial^\mu\phi+m^2\phi^2)/2$ とすると、コンパクト支持方向 $h$ に沿う一次変分は部分積分により

$$
\begin{aligned}
DS(\phi)[h]
&=-\int_M(\partial_\mu h\,\partial^\mu\phi+m^2h\phi)\,d^4x\\
&=\int_M h(\Box\phi-m^2\phi)\,d^4x\\
&=-\langle h,P\phi\rangle .
\end{aligned}
$$

全時空の作用積分自体の有限性は要求せず、このコンパクト支持方向における変分を使う。[汎関数微分](../MQFC37/index.md#def-mqfc37-functional-derivative) の記法では $DF(\phi)[h]$ は方向 $h$ に沿う一階微分、$F^{(n)}(\phi)$ は $n$ 階方向微分を表す分布核である。

ここでは変形した方程式の解の存在を主張するのではなく、実数値の滑らかな汎関数 $G$ による形式的な一次応答を求める。作用に $\epsilon G$ を加えると方程式は $-P\phi_\epsilon+\epsilon G^{(1)}(\phi_\epsilon)=0$ となる。$\phi_\epsilon=\phi+\epsilon v+O(\epsilon^2)$ を代入し、もとの解 $P\phi=0$ を用いれば一次の方程式は

$$
Pv=G^{(1)}(\phi)
$$

となる。一次核が滑らかなコンパクト支持関数ならGreen作用素の定義域に入る。[遅延・先進Green作用素の構成と因果的支持](../../../解析系/HPDE/HPDE18/index.md#thm-hpde18-green-existence) で確かめた恒等式は $PG_{\mathrm{ret}}f=PG_{\mathrm{adv}}f=f$ である。ここで $f=G^{(1)}(\phi)$ を代入すると二つの応答は $v_{\mathrm{ret}}=G_{\mathrm{ret}}G^{(1)}$ と $v_{\mathrm{adv}}=G_{\mathrm{adv}}G^{(1)}$ である。観測量 $F$ の一次応答は $DF(\phi)[v]$ である。本講では先進応答から遅延応答を引く順序を採り、$K=-E$ と置く。これは [自由場の交換子条件](../../../解析系/MICA/MICA11/index.md#def-mica11-two-point-conditions) の符号に合わせた選択である。

まず滑らかな試験関数による平均 $L_f(\phi)=\int_M f\phi$ とその有限個の積・和を考える。このような多項式を円筒多項式と呼ぶ。各階の微分核は滑らかでコンパクト支持である。例えば $L_fL_g$ の一次核は $fL_g+gL_f$、二次核は $f\otimes g+g\otimes f$ となる。複素係数も許す。この場合の方向微分は実の場の方向に取り、実部と虚部の微分を複素線形にまとめる。応答差を積分で表すため、次の括弧を導入する。

<a id="def-mqfc38-peierls"></a>

<!-- formal-statement-start -->
> **定義（Peierls括弧）**
> $M,P,K$ を上記のものとする。円筒多項式 $F,G$ のPeierls括弧を

$$
\{F,G\}(\phi)=\langle F^{(1)}(\phi),K G^{(1)}(\phi)\rangle
$$

> と定める。実の円筒多項式上では実双線形であり、複素係数には双線形に延長する。$K=G_{\mathrm{adv}}-G_{\mathrm{ret}}$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc38-peierls -->
### 直接例：平均した二つの観測量

**定義の確認**。実試験関数 $f,g$ に対し $L_f^{(1)}=f,L_g^{(1)}=g$ なので

$$
\{L_f,L_g\}=\int_M f(x)(Kg)(x)\,d^4x.
$$

$Kg$ は滑らかで、$f$ はコンパクト支持だから積分が有限である。結果は場に依存しない実定数になる。各引数の線形性はGreen作用素の線形性と積分の線形性から従う。
<!-- definition-example-end -->

通常の積に関して反対称・双線形で、積の微分と同じLeibniz則および三つの括弧を巡回させるJacobi恒等式を満たす括弧をPoisson括弧という。因果的分離とは二つの台を結ぶ因果曲線がないことである。

<a id="thm-mqfc38-peierls-poisson"></a>

<!-- formal-statement-start -->
> **定理（自由Peierls括弧のPoisson性）**
> 上記の円筒多項式の空間はPeierls括弧で閉じ、括弧は反対称、積についてLeibniz則を満たし、Jacobi恒等式

$$
\{\{F,G\},H\}+\{\{G,H\},F\}+\{\{H,F\},G\}=0
$$

> を満たす。また因果的に分離した台を持つ二つの線形観測量の括弧は零であり、任意の試験関数 $f,g$ に対し $\{L_{Pf},L_g\}=0$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

二つのGreen作用素は積分の中で互いに転置になる。したがって差は反対称である。有限個の平均値を座標にすると、括弧の係数は場によらない定数行列になる。二階微分が対称であることがJacobi恒等式を与える。

<!-- proof-start -->
### 証明

$P$ は実定数係数の形式的自己随伴作用素である。試験関数の間では [Green作用素の転置と時間方向の反転](../../../解析系/HPDE/HPDE19/index.md#thm-hpde19-green-transpose-pairing) を適用できる。よって

$$
\langle f,Kg\rangle
=\langle G_{\mathrm{ret}}f-G_{\mathrm{adv}}f,g\rangle
=-\langle g,Kf\rangle.
$$

三つの汎関数で使う試験関数を全て並べて $f_1,\ldots,f_N$ とし、$z_i=L_{f_i}(\phi)$ と置く。$F=p(z),G=q(z),H=r(z)$ と多項式で表す。$z_i(\phi+sh)=z_i(\phi)+sL_{f_i}(h)$ だから、$p_i=\partial p/\partial z_i$（他の座標を固定する偏微分）と書けば、連鎖律は

$$
DF(\phi)[h]=\sum_i p_i(z)L_{f_i}(h)
=\int_M\left(\sum_i p_i(z)f_i(x)\right)h(x)\,d^4x
$$

となる。[汎関数微分](../MQFC37/index.md#def-mqfc37-functional-derivative) の核との照合から $F^{(1)}=\sum_i p_i f_i$ を得る。従って $K_{ij}=\langle f_i,Kf_j\rangle$ とすれば

$$
\{F,G\}=\sum_{i,j}K_{ij}p_iq_j.
$$

$K_{ij}=-K_{ji}$ なので反対称であり、多項式で閉じている。$\partial_i(pq)=p_iq+pq_i$ を代入すれば $\{FG,H\}=G\{F,H\}+F\{G,H\}$ となる。

以下 $p_{ia}=\partial_{z_a}\partial_{z_i}p$ とし、$q,r$ についても同じ記法を使う。全て多項式なので混合偏微分の順序は交換できる。Jacobi恒等式では

$$
\{\{F,G\},H\}
=\sum_{i,j,a,b}K_{ij}K_{ab}
(p_{ia}q_j+p_iq_{ja})r_b.
$$

巡回和のうち $p$ の二階微分を含む項は

$$
\sum_{i,j,a,b}K_{ij}K_{ab}p_{ia}q_jr_b
+\sum_{i,j,a,b}K_{ij}K_{ab}r_ip_{ja}q_b.
$$

第二項の旧添字 $(i,j,a,b)$ を新添字 $(b,a,i,j)$ に置換すると係数は $K_{ba}K_{ij}=-K_{ab}K_{ij}$、$p_{ai}=p_{ia}$ なので第一項と打ち消し合う。$q$ と $r$ についても巡回順を一つずつ移せば同じ二項の相殺になり、全和は零である。$z_i$ が独立でなくても、もとの汎関数微分から導いた式なので問題ない。

因果的分離とは一方の台と他方の台を結ぶ因果曲線がないことをいう。[Green作用素の因果的支持](../../../解析系/HPDE/HPDE18/index.md#thm-hpde18-green-existence) によって $Kg$ の台は $\operatorname{supp}g$ の因果的未来と過去の和に含まれる。従って $fKg=0$ となる。最後に [因果伝播子の二つの零合成](../../../解析系/HPDE/HPDE21/index.md#prop-hpde21-propagator-identities) から $KPf=0$ であり、反対称性で $\langle Pf,Kg\rangle=-\langle g,KPf\rangle=0$。
<!-- proof-end -->

この括弧は古典的な点ごとの積とは異なる。因果的に離れた線形観測量の括弧が零でも、それらの積は一般に零ではない。

## 2. 量子の積を収縮で作る

古典の括弧を交換子として取り出すには、積の順序によって値が変わる仕組みが必要になる。二点の場を結ぶ核には [二点分布の条件](../../../解析系/MICA/MICA11/index.md#def-mica11-two-point-conditions) を満たす複素分布 $W$ を用いる。特に

$$
W-W^T=iK,\qquad \overline W=W^T,\qquad P_xW=P_yW=0.
$$

ここで $W^T(x,y)=W(y,x)$、核の等式は試験関数への作用として読む。二点分布の正値性は以下の積の結合性には必要ない。具体的には $m>0$ なら [MICA11の二点分布の条件と直接例](../../../解析系/MICA/MICA11/index.md#def-mica11-two-point-conditions)、$m=0$ なら [質量零Minkowski真空](../../../解析系/MICA/MICA13/index.md#prop-mica13-flat-wavefront) の二点分布を選べる。

二つの汎関数を別々の場変数 $\phi,\psi$ に置き、片方ずつ微分して $W$ で組にする操作を収縮という。円筒多項式なら微分核は滑らかなので $W$ を試験関数へ作用させられる。$\hbar$ は形式変数であり、数値を代入して無限級数の収束を仮定するものではない。複素共役では $\overline\hbar=\hbar$ と約束する。形式冪級数とは各次数の係数を並べたもので、等式は係数ごとに判定する。こうした収縮を全次数で足した積をスター積と呼ぶ。

<a id="def-mqfc38-star"></a>

<!-- formal-statement-start -->
> **定義（自由場のスター積）**
> 上記の $W$ と円筒多項式 $F,G$ に対し

$$
F\star_W G
=\sum_{n\ge0}\frac{\hbar^n}{n!}
\langle W^{\otimes n},F^{(n)}\otimes G^{(n)}\rangle
$$

> と定める。$W^{\otimes n}$ は [分布のテンソル積](../../../解析系/MICA/MICA6/index.md#def-mica6-tensor-product) により $x_j,y_j$ を結ぶ $n$ 個の独立な核を配置したものを表す。作用させる試験関数は $F^{(n)}(\phi)(x_1,\ldots,x_n)G^{(n)}(\phi)(y_1,\ldots,y_n)$ であり、核と試験関数の変数はこの順にそろえる。$n=0$ の項は通常の積 $FG$。多項式では有限和であり、形式冪級数には各次数で有限個の係数を足すことにより延長する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc38-star -->
### 直接例：線形観測量の積

**定義の確認**。$L_f,L_g$ の一次微分は $f,g$、二次以上は零なので

$$
L_f\star_W L_g=L_fL_g+\hbar W(f,g).
$$

$W(f,g)=\langle W,f\otimes g\rangle$ は滑らかなコンパクト支持試験関数への作用であり有限である。零次と一次の項が存在し、高次は全て零だから積は円筒多項式の形式級数となる。片方が定数 $1$ なら一次以上も零になり、$1\star_W F=F=F\star_W1$ となる。
<!-- definition-example-end -->

<a id="thm-mqfc38-star-algebra"></a>

<!-- formal-statement-start -->
> **定理（自由場スター積の結合性と交換子）**
> 円筒多項式の形式冪級数上で $\star_W$ は単位元 $1$ を持つ結合的な双線形積である。複素共役を $*$ とすると $(F\star_W G)^*=G^*\star_W F^*$ であり、

$$
F\star_W G-G\star_W F=i\hbar\{F,G\}+O(\hbar^2).
$$

> 線形観測量では高次の剰余は零である。
<!-- formal-statement-end -->

### 証明の見取り図

三つの因子の間で収縮する可能性は第1–2、第1–3、第2–3の三種類である。どの順番で括弧を付けても、同じ組の個数に対して同じ階乗係数が付く。

<!-- proof-start -->
### 証明

前節と同じ有限個の座標 $z_i$ を使い、$w_{ij}=W(f_i,f_j)$ と置く。$p,q$ の微分核は多項式の偏微分係数と $f_i$ のテンソル積の有限和だから、第 $n$ 収縮は

$$
\sum_{i_1,\ldots,i_n,j_1,\ldots,j_n}
p_{i_1\cdots i_n}q_{j_1\cdots j_n}
\prod_{\ell=1}^n w_{i_\ell j_\ell}.
$$

三つの独立な座標の組 $z^{(1)},z^{(2)},z^{(3)}$ に対し、$a<b$ のとき

$$
D_{ab}=\sum_{i,j}w_{ij}
\partial_{z_i^{(a)}}\partial_{z_j^{(b)}}
$$

と置く。偏微分は互いに可換で係数は定数なので三作用素は可換である。積の定義は二因子に $\sum_n\hbar^n D_{12}^n/n!$ を作用させた後で座標を一致させることになる。

$(F\star_W G)\star_W H$ では最初に第1–2を収縮する。その後の微分は一致させた座標に作用する。二変数の多項式 $A$ について連鎖律は

$$
\partial_{z_i} A(z,z)
=\left.(\partial_{z_i^{(1)}}+\partial_{z_i^{(2)}})A(z^{(1)},z^{(2)})\right|_{z^{(1)}=z^{(2)}=z}
$$

となる。これを各偏微分に適用すると第1、第2への微分の和になる。従って第3との収縮は $D_{13}+D_{23}$ になる。二項展開して $a$ を第1–2、$b$ を第1–3、$c$ を第2–3の回数とすると各項は

$$
\frac{\hbar^{a+b+c}}{a!\,(b+c)!}
\binom{b+c}{b}D_{13}^bD_{23}^cD_{12}^a
=\frac{\hbar^{a+b+c}}{a!b!c!}D_{12}^aD_{13}^bD_{23}^c.
$$

逆に $F\star_W(G\star_W H)$ では第2–3を先に行い、次が $D_{12}+D_{13}$ になる。このとき係数は

$$
\frac{\hbar^{a+b+c}}{c!\,(a+b)!}\binom{a+b}{a}
=\frac{\hbar^{a+b+c}}{a!b!c!}.
$$

両者は同じ $p(z^{(1)})q(z^{(2)})r(z^{(3)})$ に作用して最後に三座標を一致させるので等しい。多項式では有限計算、形式級数では各次数ごとの有限計算である。

単位元は定数の高階微分が零であることから従う。共役では $\overline w_{ij}=w_{ji}$ を使い各 $i_\ell,j_\ell$ を交換すれば、全ての次数で積の順序が反転する。交換子の零次は $FG-GF=0$、一次は

$$
\hbar\sum_{i,j}p_iq_j(w_{ij}-w_{ji})
=i\hbar\sum_{i,j}p_iq_jK_{ij}
=i\hbar\{F,G\}.
$$

線形の場合は二次以上の微分が零なので等式は厳密である。
<!-- proof-end -->

## 3. 局所相互作用へ積を広げる条件

円筒多項式は便利だが、$\int f\phi^4$ のような局所汎関数には対角デルタが現れる。[局所微分核の対角表示](../MQFC37/index.md#prop-mqfc37-diagonal-derivatives) によると例えば $\int f\phi^2/2$ の二次核は $f(x)\delta^{(4)}(x-y)$ である。これを $W$ と単に掛けられるとは限らない。

そこで [マイクロ因果的汎関数](../MQFC37/index.md#def-mqfc37-microcausal) の条件を用いる。本講ではこのうち有限次数の多項式を扱う。具体的には、各次数の係数がコンパクト支持の対称分布 $u_d$ であり、$F(\phi)=\sum_{d=0}^D\langle u_d,\phi^{\otimes d}\rangle$ と書けるものとする。各 $u_d$ の波面が全成分同方向の因果錐を避けると仮定する。$d=0$ は定数項とし、波面条件は $d\ge1$ の核に課す。コンパクト支持分布はその台の近くで $1$ のカットオフを掛ければ滑らかな非コンパクト支持関数にも作用できる。

[マイクロ因果的汎関数の定義](../MQFC37/index.md#def-mqfc37-microcausal) の錐を使い $C_-=\{k:k_0\le-|\boldsymbol k|\}$、$C_+=-C_-$ とする（零も含む）。計量双対が未来向きなのは $C_-$ 側である。[Hadamard波面集合条件](../../../解析系/MICA/MICA13/index.md#def-mica13-wfsc) を満たす $W$ の特異方向は $(k,l)$ で $k\in C_-\setminus0,\ l\in C_+\setminus0$ となる。以下ではこの包含だけで収縮の存在を示す。$WF$ は波面集合、$\mathcal E'(M^d)$ はコンパクト支持分布の空間である。[Hörmanderの分布積](../../../解析系/MICA/MICA6/index.md#thm-mica6-product-existence) は同じ基点において二つの波面方向が互いに逆向きになることがない場合に構成できる。ここで収縮する変数とは核 $W$ を掛けた後に積分（分布の作用）で消す変数のことである。

<a id="prop-mqfc38-microcausal-contraction"></a>

<!-- formal-statement-start -->
> **命題（マイクロ因果条件による収縮の存在）**
> $u\in\mathcal E'(M^d),v\in\mathcal E'(M^e)$ をコンパクト支持分布とし、その波面集合はそれぞれ $C_+^d\cup C_-^d$、$C_+^e\cup C_-^e$ の方向を避けるとする。$W$ の波面方向は $C_-\setminus0$ と $C_+\setminus0$ の組に限られるとする。
> 整数 $n$ を次の範囲で選ぶ。

$$
0\le n\le\min(d,e).
$$

> 独立な組 $(x_j,y_j)$（$1\le j\le n$）に配置した核を、未収縮変数の定数関数とテンソル積して $B_n$ とする。
>
> このとき次のHörmander積が存在する。

$$
(u\otimes v)B_n,\qquad
B_n=\bigotimes_{j=1}^n W(x_j,y_j)\otimes 1.
$$

> ここで変数は元の順に並べ替える。得られた分布はコンパクト支持であり、滑らかな関数へ作用させることができる。
<!-- formal-statement-end -->

### 証明の見取り図

もし逆向きの特異方向が打ち消し合うなら、一方の汎関数核には全て同方向の因果余ベクトルが集まることになる。未収縮の成分は零だが、零も閉錐に入るため、この場合も禁止される。

<!-- proof-start -->
### 証明

変数を $x_1,\ldots,x_d,y_1,\ldots,y_e$ の順で並べる。$n=0$ なら掛ける核は定数 $1$ なので存在する。$n\ge1$ では [テンソル積の波面集合の包含](../../../解析系/MICA/MICA6/index.md#prop-mica6-tensor-wavefront) を各独立な二点核と未収縮変数の定数関数に適用する。

収縮核の波面方向を $(k_1,\ldots,k_d;l_1,\ldots,l_e)$ とすると、$j\le n$ では $(k_j,l_j)$ が両方零、または $k_j\in C_-\setminus0,\ l_j\in C_+\setminus0$ である。$j>n$ の成分は零。全方向は非零だから少なくとも一組は後者である。変数の並べ替えは座標の置換で、[波面集合の座標変換則](../../../解析系/MICA/MICA5/index.md#thm-mica5-coordinate-change) によりこの成分表示を得る。

もし $u\otimes v$ の波面に反対方向 $(-k,-l)$ があれば、同じテンソル積の包含から $-k$ が非零なので $-k$ は $u$ の波面方向でなければならない。しかし全ての $-k_i$ は $C_+$ に属する。これは $u$ の仮定に反する。同時に $v$ 側でも全ての $-l_i$ は $C_-$ に属して矛盾する。

従って [Hörmanderの分布積の存在定理](../../../解析系/MICA/MICA6/index.md#thm-mica6-product-existence) の非衝突条件が成立する。積は $u\otimes v$ の台の外で零であり、台は $\operatorname{supp}u\times\operatorname{supp}v$ の閉部分集合だからコンパクトである。任意の滑らかな関数への作用はその近傍で $1$ のカットオフを掛けて定義でき、二つのカットオフの差は台の近傍で零なので結果は選択によらない。
<!-- proof-end -->

この命題により有限次数のマイクロ因果的多項式についても、スター積の各収縮係数を具体的に評価できる。実際 $d$ 次の項の $n$ 階微分は

$$
D^nF(\phi)[h_1,\ldots,h_n]
=\frac{d!}{(d-n)!}
\langle u_d,h_1\otimes\cdots\otimes h_n
\otimes\phi^{\otimes(d-n)}\rangle
$$

となる。$n>d$ なら零。これは対称な $u_d$ の $d$ 個の位置から順序付きで $n$ 個を選ぶ数である。$G$ にも同じ展開を使えば、命題の積分布に未収縮の $\phi$ を掛けるだけで各係数を定められる。

例えば $Q_f=\int_M f\phi^2/2$ と $Q_g=\int_M g\phi^2/2$ では一次核は $f\phi,g\phi$、二次核は対角デルタであり、

$$
Q_f\star_W Q_g=Q_fQ_g+\hbar W(f\phi,g\phi)
+\frac{\hbar^2}{2}\langle W^2,f\otimes g\rangle.
$$

最後の式で $W^2$ は二点分布としての積である。同じ向きの波面しか持たない $W$ は自分自身と逆方向に衝突しないため、[Hörmanderの分布積の存在定理](../../../解析系/MICA/MICA6/index.md#thm-mica6-product-existence) により積が存在する。

二組の収縮の積を $(x_1,x_2;y_1,y_2)=(x,x;y,y)$ に制限する操作は、[引き戻しの存在定理](../../../解析系/MICA/MICA7/index.md#thm-mica7-pullback) の条件を満たす。実際、対角写像 $\iota(x,y)=(x,x;y,y)$ の微分は $(h,j)\mapsto(h,h;j,j)$ なので、余ベクトルの引き戻しは $(k_1+k_2,l_1+l_2)$ となる。[余法方向の定義](../../../解析系/MICA/MICA7/index.md#def-mica7-normal-set) により、これが零になる条件は

$$
k_1+k_2=0,\qquad l_1+l_2=0
$$

を要求する。二組の第一成分はいずれも $C_-$ に入る。$k_{10},k_{20}\le0$ であり $k_{10}+k_{20}=0$ なら両方の時間成分が零になる。錐の不等式 $|\boldsymbol k_j|\le-k_{j0}$ から空間成分も零、従って両方が零である。対応する第二成分も零となり波面方向ではない。この対角制限は分布積 $W^2$ の定義と一致し、$W(x,x)$ を評価したわけではない。

一方、点評価 $\phi(a)$ の一次核は $\delta_a$ であり、[点デルタの波面集合](../../../解析系/MICA/MICA4/index.md#prop-mica4-point-delta) によりその点では全非零方向が波面に入る。マイクロ因果条件が失敗するので、点評価同士の積に上の命題を適用できない。特に同じ点での二点分布の制限は別の問題である。[対角への引き戻し](../../../解析系/MICA/MICA7/index.md#thm-mica7-pullback) の条件は $(k,-k)$ の特異方向を排除する必要があるが、真空核は対角でもこの方向を持つ。

ここでは円筒多項式で積の結合性を完全に示し、より広いマイクロ因果的多項式について二因子の各収縮の存在を証明した。一般の滑らかなマイクロ因果的汎関数の代数全体へ拡張するには、微分核の適切な位相での滑らかさ、収縮後の波面評価と結合性の継承も必要となる。時間順序積では核の方向条件が異なるため、自由場の積の存在から直ちに全ての時間順序積が存在するわけではない。

## 4. 演習

### 演習 MQFC38-A1：応答の符号
- Level: A

$G=L_g$ を自由作用に加える。遅延・先進応答を求め、$L_f$ の先進応答から遅延応答を引け。

<!-- solution-start -->
**詳細解答**

変分方程式は $-Pv+g=0$ なので $Pv=g$。$g$ は試験関数であり [Green作用素](../../../解析系/HPDE/HPDE18/index.md#def-hpde18-green-operators) の入力条件を満たす。よって $v_{\mathrm{ret}}=G_{\mathrm{ret}}g,v_{\mathrm{adv}}=G_{\mathrm{adv}}g$。$DL_f[v]=\int fv$ であるため差は

$$
\int f(G_{\mathrm{adv}}-G_{\mathrm{ret}})g=\langle f,Kg\rangle=-\langle f,Eg\rangle.
$$

これは [Peierls括弧](#def-mqfc38-peierls) の符号である。
<!-- solution-end -->

### 演習 MQFC38-A2：二次観測量の括弧
- Level: A

$X=L_f,Y=L_g,c=\langle f,Kg\rangle$ とする。$\{X^2,Y\}$ と $\{Y,X^2\}$ を求めよ。

<!-- solution-start -->
**詳細解答**

$(X^2)^{(1)}=2Xf$、$Y^{(1)}=g$ だから [Peierls括弧](#def-mqfc38-peierls) に代入して $\{X^2,Y\}=2Xc$。逆順は [自由Peierls括弧のPoisson性](#thm-mqfc38-peierls-poisson) の反対称性と同じ転置計算で $\langle g,K(2Xf)\rangle=2X\langle g,Kf\rangle=-2Xc$ となる。
<!-- solution-end -->

### 演習 MQFC38-A3：線形交換子
- Level: A

$X=L_f,Y=L_g$ のスター積を両順序で計算し、交換子を求めよ。

<!-- solution-start -->
**詳細解答**

[スター積](#def-mqfc38-star) において二次以上の微分は零。従って $X\star_W Y=XY+\hbar W(f,g)$、$Y\star_W X=XY+\hbar W(g,f)$。引き算すれば

$$
[X,Y]_{\star_W}=\hbar(W(f,g)-W(g,f))=i\hbar\langle f,Kg\rangle.
$$

ここで $[X,Y]_{\star_W}=X\star_WY-Y\star_WX$ である。$K=-E$ なので $-i\hbar E(f,g)$ とも書ける。ただし $E(f,g)=\langle f,Eg\rangle$ は作用素 $E$ を二つの試験関数で評価した略記である。
<!-- solution-end -->

### 演習 MQFC38-A4：波面方向の衝突
- Level: A

$k=(-1,1,0,0)$ とする。二点核の波面方向 $(k,-k)$ と、それを打ち消す二点の余ベクトルを記せ。$C_-$ と $C_+$ も判定せよ。

<!-- solution-start -->
**詳細解答**

$k_0=-1$、$|\boldsymbol k|=1$ なので $k\in C_-$、$-k\in C_+$。打ち消す唯一の方向は $(-k,k)$ である。同じ向きの二点核では第一成分が $C_-$ に入るが、$-k$ は $C_+$ の非零成分なので入らない。従って同じ向きの核同士ではこの打ち消しは生じない。
<!-- solution-end -->

### 演習 MQFC38-B1：二次同士のスター積
- Level: B

$X=L_f,Y=L_g,w=W(f,g)$ とする。$X^2\star_W Y^2$ を全次数で求めよ。

<!-- solution-start -->
**詳細解答**

一次核は $2Xf,2Yg$、二次核は $2f\otimes f,2g\otimes g$、三次以上は零である。[スター積](#def-mqfc38-star) の一次は $\hbar(2X)(2Y)w=4\hbar XYw$。二次では独立な二組に $W$ を作用させるので $4w^2$ が得られ、係数は $\hbar^2/2$ である。よって

$$
X^2\star_W Y^2=X^2Y^2+4\hbar XYw+2\hbar^2w^2.
$$

逆順では $w$ を $W(g,f)$ へ替える。$c=\langle f,Kg\rangle$ と置けば一次の差 $4i\hbar XYc$ が得られる。[Peierls括弧](#def-mqfc38-peierls) に一次核を代入すると $\{X^2,Y^2\}=\langle 2Xf,K(2Yg)\rangle=4XYc$ であり、交換子の一次係数と対応する。
<!-- solution-end -->

### 演習 MQFC38-B2：三因子の結合性
- Level: B

$X=L_f,Y=L_g,Z=L_h$ に対し $(X\star_W Y)\star_W Z$ と $X\star_W(Y\star_W Z)$ を計算せよ。

<!-- solution-start -->
**詳細解答**

$w_{fg}=W(f,g)$ 等と書く。[スター積](#def-mqfc38-star) から $X\star_W Y=XY+\hbar w_{fg}$ である。$(XY)^{(1)}=Yf+Xg$ かつ $Z^{(n)}=0$（$n\ge2$）なので

$$
(X\star_W Y)\star_W Z
=XYZ+\hbar(w_{fg}Z+w_{fh}Y+w_{gh}X).
$$

逆に $Y\star_W Z=YZ+\hbar w_{gh}$、$(YZ)^{(1)}=Zg+Yh$ なので

$$
X\star_W(Y\star_W Z)
=XYZ+\hbar(w_{gh}X+w_{fg}Z+w_{fh}Y).
$$

三つの収縮先が一致するので等しい。二回の収縮では三つの一次因子のうち少なくとも一つを二度微分することになるため、二次以上はない。
<!-- solution-end -->

### 演習 MQFC38-B3：局所二次汎関数の収縮
- Level: B

$Q_f=\int f\phi^2/2,Q_g=\int g\phi^2/2$ とする。二次核を求め、スター積の二次項に現れる分布積が存在する理由を述べよ。

<!-- solution-start -->
**詳細解答**

方向 $h_1,h_2$ に対して二次微分は $\int fh_1h_2$ である。[局所微分核の対角表示](../MQFC37/index.md#prop-mqfc37-diagonal-derivatives) から核は

$$
f(x_1)\delta(x_1-x_2)
$$

であり、$g$ 側は $g(y_1)\delta(y_1-y_2)$ となる。二組の収縮の核を第3節と同じ対角写像に沿って [非特性的に引き戻す](../../../解析系/MICA/MICA7/index.md#thm-mica7-pullback)。余法条件は $k_1+k_2=l_1+l_2=0$ であり、同方向の錐にある $k_1,k_2$ が和零なら両方零になるので、非零波面方向は衝突しない。この引き戻しは二点の $W^2$ であり、$f\otimes g$ に作用させる。

その積は [Hörmanderの分布積の存在定理](../../../解析系/MICA/MICA6/index.md#thm-mica6-product-existence) によって存在する。なぜなら $W$ の非零波面方向の第一成分は $C_-$ で、逆向きは $C_+$ に入るからである。係数は $1/2!$ なので求める項は

$$
\frac{\hbar^2}{2}\langle W^2,f\otimes g\rangle.
$$

この評価は二点変数を保ったままであり、一点での $W$ の値を使っていない。
<!-- solution-end -->

### 演習 MQFC38-C1：部分収縮と零成分
- Level: C

$u\in\mathcal E'(M^3),v\in\mathcal E'(M^2)$ は [マイクロ因果条件](../MQFC37/index.md#def-mqfc37-microcausal) と同じ方向条件を満たす係数核とする。二組の収縮 $W(x_1,y_1)W(x_2,y_2)$ を掛けるとき、一方の組が滑らかな方向であっても衝突がないことを示せ。また $u$ を点デルタの三重テンソル積に置き換えた場合の違いを述べよ。

<!-- solution-start -->
**詳細解答**

[テンソル積の波面集合の包含](../../../解析系/MICA/MICA6/index.md#prop-mica6-tensor-wavefront) では一方の因子の方向が零になる場合も含める。例えば第1組が特異、第2組が零なら全方向は

$$
(k_1,0,0;l_1,0),\qquad
k_1\in C_-\setminus0,\quad l_1\in C_+\setminus0.
$$

逆方向の $u$ 側は $(-k_1,0,0)$ で全成分が $C_+$ に入る。零成分も閉錐に含むので $u$ の仮定と矛盾する。第2組だけ特異なら $(0,-k_2,0)$ が同じ理由で禁止され、両方特異なら $(-k_1,-k_2,0)$ が禁止される。両組零の方向は波面集合に含まれない。従って全ての可能性で非衝突条件を満たし [収縮の存在命題](#prop-mqfc38-microcausal-contraction) が適用できる。

点デルタの三重テンソル積は $M^3$ の一点に支持される点デルタである。[点デルタの波面集合](../../../解析系/MICA/MICA4/index.md#prop-mica4-point-delta) はその点で全非零方向を含むため、例えば $(-k_1,0,0)$ を排除できない。$v$ が元の条件を満たすならそちらの側から非衝突がなお従うが、両側を点評価へ広げる場合にはこの保証も失われる。十分条件の失敗だけで、別の処方による拡張が全て不可能だとは結論しない。
<!-- solution-end -->

## 参考文献

- K. Rejzner, *Perturbative Algebraic Quantum Field Theory*, Springer, 2016（自由場の代数とマイクロ因果的汎関数）。
- [MICA13 Radzikowskiの波面集合条件](../../../解析系/MICA/MICA13/index.md)（正周波数の核と向き）。
- [HPDE21 因果伝播子とexact sequenceの核](../../../解析系/HPDE/HPDE21/index.md)（Green作用素の差）。
