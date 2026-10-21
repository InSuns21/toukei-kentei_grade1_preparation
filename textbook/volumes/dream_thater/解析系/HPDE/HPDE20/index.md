# HPDE20 空間コンパクト・時間的支持空間

[前講の両側Green恒等式](../HPDE19/index.md#prop-hpde19-two-sided-identity)は、入力をコンパクト支持切断に限定していました。しかし遅延解は源の未来へ、先進解は過去へ延びます。たとえば時刻 $0$ に集中した源でも、波は時刻 $100$ に届きます。この出力をもう一度Green作用素へ入れようとしても、元の作用域 $\Gamma_c$ には収まりません。

必要なのは、単に「非コンパクトでもよい」と緩めることではありません。**どの時間方向の因果過去・未来を見たときに、源の寄与を有限な領域へ閉じ込められるか**を指定することです。本講では四種類の支持空間を区別し、遅延Greenを過去コンパクトな源へ、先進Greenを未来コンパクトな源へ拡張します。次講の因果伝播子と完全系列では、その区別が作用域の証明を支えます。

## 1. 時空・束とコンパクト支持の確認

$(M,g)$ は境界のない、時間向きを備えた滑らかな[大域双曲Lorentz時空](../../../幾何系/LORG/LORG16/index.md#def-lorg16-global-hyperbolicity)とします。$E\to M$ は有限ランクの滑らかな実または複素ベクトル束、$P:\Gamma(M,E)\to\Gamma(M,E)$ は[normally hyperbolic作用素](../HPDE5/index.md#def-hpde5-normally-hyperbolic)です。$\Gamma(M,E)$ は滑らかな切断全体、$\operatorname{supp}u$ は切断が零でない点の集合の閉包です。$J^\pm(A)$ は集合 $A$ の[因果的未来・過去](../../../幾何系/LORG/LORG6/index.md#def-lorg6-chronological-causal-future)を表し、

$$
J(A)=J^+(A)\cup J^-(A)
$$

と書きます。空集合の因果影も空とします。

[滑らかなCauchy時間分割](../../../幾何系/LORG/LORG20/index.md#thm-lorg20-orthogonal-splitting)により、各時刻 $s\in\mathbb R$ の面 $\Sigma_s=t^{-1}(s)$ を考えられます。ただし以下の定義は、その時間関数の選び方には依存しません。切断の台 $A=\operatorname{supp}u$ は閉集合であることを常に利用します。

## 2. 四種類の支持条件を直接定義する

波の初期値がコンパクト支持なら、[大域Cauchy解の因果的支持包含](../HPDE16/index.md#thm-hpde16-global-cauchy)によって解の台はあるコンパクト集合の未来と過去の合併に入ります。これを「空間コンパクト」と呼びます。他方、遅延解に必要なのは、**各観測点より過去に存在する源の部分がコンパクト**という別の条件です。

<a id="def-hpde20-support-classes"></a>

<!-- formal-statement-start -->
> **定義（空間コンパクト・過去コンパクト・未来コンパクト・時間コンパクト支持）**  
> 第1節の $M,E$ の滑らかな切断 $u$ に対し、$A=\operatorname{supp}u$ と置く。
>
> (i) $u$ が**空間コンパクト**（sc）とは、あるコンパクト集合 $K\subset M$ が存在して

$$
A\subseteq J(K)
$$

> が成立することをいう。
>
> (ii) $u$ が**過去コンパクト**（pc）とは、任意のコンパクト集合 $L\subset M$ について

$$
A\cap J^-(L)\quad\text{がコンパクト}
$$

> となることをいう。
>
> (iii) $u$ が**未来コンパクト**（fc）とは、任意のコンパクト集合 $L\subset M$ について

$$
A\cap J^+(L)\quad\text{がコンパクト}
$$

> となることをいう。
>
> (iv) $u$ が**時間コンパクト**（tc）とは、過去コンパクトかつ未来コンパクトであることをいう。
>
> それぞれの切断空間を $\Gamma_{\mathrm{sc}}(M,E)$、$\Gamma_{\mathrm{pc}}(M,E)$、$\Gamma_{\mathrm{fc}}(M,E)$、$\Gamma_{\mathrm{tc}}(M,E)$ と記す。$\Gamma_c(M,E)$ は時空全体でコンパクト支持の切断空間である。
<!-- formal-statement-end -->

ここで $L$ を一つだけ固定するのではなく、**すべてのコンパクト $L$** について調べます。pc は「過去に広がらない」を時刻の下限で定義しているのではありません。非コンパクトなCauchy面を持つ時空では、遠方へ行くにつれて源の最初の時刻がいくらでも早くなることがあります。

<!-- definition-example-start: def-hpde20-support-classes -->
**定義の確認**。標準Minkowski計量と、時刻座標の増加方向を未来とする平面を考えます。

$$
g=-dt^2+dx^2,\qquad (t,x)\in\mathbb R^{1+1}.
$$

上で定義した因果的未来・過去は曲線の存在で決まります。これを座標で判定するには、[既習のMinkowski因果錐公式](../../../幾何系/LORG/LORG6/index.md#thm-lorg6-minkowski-futures)を使います。実際、未来因果曲線の各滑らかな片について、計量による因果性と未来向きの条件から

$$
g(\dot\gamma,\dot\gamma)=-\dot t^{\,2}+\dot x^{\,2}\le0,
\qquad |\dot x|\le\dot t
$$

が成り立ちます。曲線を有限個の滑らかな片 $I_j$ に分けて積分すると、各片の空間変位の絶対値を積分で評価できるので、

$$
\begin{aligned}
|x-y|
&\le\sum_j\left|\int_{I_j}\dot x(\lambda)\,d\lambda\right|\\
&\le\sum_j\int_{I_j}|\dot x(\lambda)|\,d\lambda\\
&\le\sum_j\int_{I_j}\dot t(\lambda)\,d\lambda=t-s.
\end{aligned}
$$

逆にこの不等式と時刻の大小関係を満たす二点は、両端を結ぶ直線が未来因果的になるため、次の同値が成立します。

$$
(s,y)\le(t,x)\quad\Longleftrightarrow\quad
t\ge s,\qquad |x-y|\le t-s.
$$

次に挙げる閉集合はいずれも滑らかな切断の台として実現できますが、まず集合の支持条件自体を検査します。

**例1：時刻0以降の集合**。$A_+=\{t\ge0\}$ とします。

コンパクト集合 $L$ が $t\le T$、$|x|\le R$ の矩形に入るとします。
$A_+\cap J^-(L)$ の点は次を満たします。

$$
0\le t\le T,\qquad |x|\le R+T.
$$

この集合は閉かつ有界で、[Heine–Borelの定理](../../../基礎科目/F0/F0-00C1/index.md#thm-f0-00c1-02)によりコンパクトです（$T<0$ なら空）。
従って $A_+$ はpcです。

一方、$A_+$ は時刻 $0$ に空間方向へ無限に広がるのでscではありません。実際、任意のコンパクト $K\subset[-R,R]^2$ と固定時刻 $s$ に対して、$(s,x)\in J(K)$ ならある $(t_0,x_0)\in K$ と因果的に結ばれるので、

$$
|x|\le |x-x_0|+|x_0|
\le |s-t_0|+R\le |s|+2R.
$$

従って $J(K)$ の各固定時刻断面は有界ですが、$A_+$ の時刻 $0$ 断面は全直線です。
$J^+(\{(0,0)\})\cap A_+$ も非コンパクトなのでfcでもありません。
- **未来光円錐** $C_+=J^+(\{(0,0)\})$：点一つを $K$ とすればscです。$C_+\cap J^-(L)$ は[コンパクト因果ダイヤモンド](../HPDE19/index.md#lem-hpde19-causal-overlap)に含まれる閉集合だからpcです。一方 $C_+\cap J^+(\{(0,0)\})=C_+$ は非コンパクトなのでfcではありません。
- **時間帯** $B=\{0\le t\le1\}$：$L\subset[-T,T]\times[-R,R]$ と取れば、$B\cap J^-(L)$ と $B\cap J^+(L)$ はともに $0\le t\le1$、$|x|\le R+T+1$ を満たす閉集合です。[Heine–Borelの定理](../../../基礎科目/F0/F0-00C1/index.md#thm-f0-00c1-02)によりどちらもコンパクトなのでtcです。しかし時刻 $1/2$ の全直線を含み、上の固定時刻断面の評価からscではなく、時空コンパクトでもありません。
- **全光円錐** $C=J(\{(0,0)\})$：scです。しかし $C\cap J^-(\{(0,0)\})$ と $C\cap J^+(\{(0,0)\})$ はいずれも非コンパクトなのでpcでもfcでもありません。
<!-- definition-example-end -->

最後に、固定された時刻面 $\Sigma_s$ と台の交差がすべてコンパクトでも、scとは限りません。閉集合 $D=\{(n,n^2):n=1,2,\ldots\}$ は各 $\Sigma_s$ と高々一点で交わります。一方、仮に $D\subset J(K)$ を満たすコンパクト $K$ が存在し、$K\subset[-R,R]^2$ とすれば、大きな $n$ について因果関係の必要条件

$$
n^2-R\le |n^2-x_0|\le |n-t_0|\le n+R\qquad ((t_0,x_0)\in K)
$$

に反します（左辺は $|n^2-x_0|$ の下界）。**一つの時間分割に沿った切片のコンパクト性を、scの定義と取り違えない**ことが重要です。

この点集合 $D$ 自身は非零の滑らかな関数の台にはなれませんが、滑らかな反例にもできます。半径 $1/10$ の閉円板に台を持ち、内部で正の滑らかな関数 $\rho$ を取って

$$
u(t,x)=\sum_{n=1}^{\infty}\rho(t-n,x-n^2)
$$

とします。この和は各コンパクト領域に有限個の項しか現れないので滑らかです。台は各 $(n,n^2)$ を中心とする閉円板の和で、各固定時刻面とは高々一つの円板で交わるため交差はコンパクトです。しかし全中心点 $D$ を含むので、先ほどの不等式によりscにはなりません。

## 3. 支持空間の包含と因果影のコンパクト性

<a id="prop-hpde20-space-relations"></a>

<!-- formal-statement-start -->
> **命題（支持空間の基本関係）**  
> 第1節の大域双曲時空と有限ランク束について

$$
\Gamma_c\subseteq\Gamma_{\mathrm{sc}},\qquad
\Gamma_c\subseteq\Gamma_{\mathrm{tc}}
=\Gamma_{\mathrm{pc}}\cap\Gamma_{\mathrm{fc}},
$$

$$
\Gamma_c=\Gamma_{\mathrm{sc}}\cap\Gamma_{\mathrm{tc}}
$$

> が成立する。$\Gamma_{\mathrm{sc}}$ と $\Gamma_{\mathrm{pc}}$、$\Gamma_{\mathrm{fc}}$ の間に一般的な包含関係はない。
<!-- formal-statement-end -->

### 証明の見取り図

コンパクトな台自身を $K$ に選べばscです。pc/fcは閉集合のコンパクト集合内での交差として確認します。逆向きの最後の等号では、scの $A\subset J(K)$ を未来部分と過去部分に分け、それぞれfcとpcを適用します。

<!-- proof-start -->
### 証明

$u\in\Gamma_c$ なら台 $A=\operatorname{supp}u$ はコンパクトです。$K=A$ を選べば $A\subset J(K)$ なのでscです。

pcとfcの確認では、[大域双曲時空の因果到達関係の閉性](../../../幾何系/LORG/LORG16/index.md#lem-lorg16-closed-causal-relation)から、コンパクト集合 $L$ の因果的未来・過去が閉であることを使います。たとえば $q_n\in J^-(L)$ が $q$ に収束するとき、対応する $\ell_n\in L$ を取れば

$$
q_n\le\ell_n,\qquad
\ell_{n_k}\longrightarrow\ell\in L,\qquad
q_{n_k}\longrightarrow q
$$

を満たす部分列があります。閉因果関係より $q\le\ell$ となるため、極限点も $J^-(L)$ に入ります。未来側も時刻方向を反転して同じことが成立します。

したがって $A\cap J^\pm(L)$ はコンパクトな台の閉部分集合であり、いずれもコンパクトです。ゆえに $u$ はsc、pc、fcのすべてに属します。

tcの等号は定義から従います。逆に $u$ がscかつtcならコンパクト $K$ に対し

$$
A=(A\cap J^+(K))\cup(A\cap J^-(K)).
$$

fcより第一項はコンパクト、pcより第二項はコンパクトです。有限個のコンパクト集合の和はコンパクトなので $u\in\Gamma_c$。第2節の時刻0以降の半空間と全光円錐がscとpcの非包含を示し、時間反転でfcの場合も分かります。$\square$
<!-- proof-end -->

ここでGreen作用素に必要な、さらに一段強い性質を証明します。有限伝播だけでは「因果影 $J^+(A)$ は閉じているか」「その因果過去との交差はコンパクトか」が自動的には分かりません。

<a id="lem-hpde20-causal-past-compact"></a>

<!-- formal-statement-start -->
> **補題（pc集合の因果的未来）**  
> 境界のない大域双曲時空 $M$ で $A\subset M$ を閉かつ過去コンパクトな集合とする。このとき $J^+(A)$ は閉かつ過去コンパクトである。時間を反転すると、閉かつ未来コンパクトな集合 $A$ の $J^-(A)$ は閉かつ未来コンパクトである。
<!-- formal-statement-end -->

### 証明の見取り図

$J^+(A)$ 全体は非コンパクトかもしれません。そこでコンパクトな観測領域 $L$ を固定し、$L$ へ到達する源を先に $A\cap J^-(L)$ に絞ります。これがコンパクトなので、[コンパクト集合間の因果ダイヤモンド](../HPDE19/index.md#lem-hpde19-causal-overlap)を適用できます。

<!-- proof-start -->
### 証明

コンパクトな $L\subset M$ を固定し、$A_L=A\cap J^-(L)$ と置きます。pcの仮定から $A_L$ はコンパクトです。もし $q\in J^+(A)\cap J^-(L)$ なら、ある $a\in A$ が $a\le q$ を満たします。$q\le\ell\in L$ と合わせると $a\le\ell$ なので $a\in A_L$。逆向きは $A_L\subset A$ から直ちに従い、

$$
J^+(A)\cap J^-(L)
=J^+(A_L)\cap J^-(L)
$$

を得ます。右辺は[因果的未来と過去の重なりの補題](../HPDE19/index.md#lem-hpde19-causal-overlap)によりコンパクトです。従って $J^+(A)$ はpcです。

閉性も局所的に確認します。$q_n\in J^+(A)$ が $q$ に収束するとし、極限点を内部に含む相対コンパクトな開近傍 $V$ を取ります。十分大きな番号について、列の点は $\overline V$ に含まれます。

pcの仮定から $A_{\overline V}=A\cap J^-(\overline V)$ はコンパクトです。各列の点に対して、その因果過去にある $a_n\in A_{\overline V}$ を選びます。コンパクト性から部分列を取れば

$$
a_{n_k}\longrightarrow a\in A_{\overline V},
\qquad q_{n_k}\longrightarrow q,\qquad
a_{n_k}\le q_{n_k}
$$

です。ここで[因果到達関係の閉性](../../../幾何系/LORG/LORG16/index.md#lem-lorg16-closed-causal-relation)を、収束する両端点の列に適用すると $a\le q$ です。よって $q\in J^+(A)$ となり、因果的未来の閉性が得られます。未来コンパクトの場合にはすべての $+$ と $-$ を入れ替えます。$\square$
<!-- proof-end -->

## 4. 遅延Green作用素をpc入力へ延長する

[HPDE18の遅延Green作用素](../HPDE18/index.md#thm-hpde18-green-existence)は、コンパクト支持の $f$ に対してだけ定義しました。今度は $f\in\Gamma_{\mathrm{pc}}(M,E)$ を与えます。観測するコンパクトな領域 $L$ から見える源は

$$
A\cap J^-(L),\qquad A=\operatorname{supp}f
$$

に限られ、定義によりコンパクトです。したがって**観測領域ごとに** $f$ をコンパクト支持の源へ切り詰められます。

具体的に、$V\Subset M$ を相対コンパクトな開集合（$\overline V$ がコンパクト）とします。$A\cap J^-(\overline V)$ を含む開近傍で $1$ になる滑らかなコンパクト台関数 $\chi_V$ を選びます。$f_V=\chi_V f\in\Gamma_c(M,E)$ なので、元の $G_{\mathrm{ret}}f_V$ を計算できます。$V$ 内ではこの値だけを採用します。ここでは $\chi_V$ をCauchy時間のみの関数と決めつけず、時空全体でコンパクト支持に取ります。

<a id="thm-hpde20-green-extension"></a>

<!-- formal-statement-start -->
> **定理（pc・fc入力へのGreen作用素の一意な延長）**  
> 第1節の境界なし大域双曲時空 $M$、有限ランク滑らかな束 $E$、normally hyperbolic作用素 $P$ に対し、[コンパクト支持入力上のGreen作用素](../HPDE18/index.md#thm-hpde18-green-existence)は線形写像

$$
G_{\mathrm{ret}}:\Gamma_{\mathrm{pc}}(M,E)
\longrightarrow\Gamma_{\mathrm{pc}}(M,E),
$$

$$
G_{\mathrm{adv}}:\Gamma_{\mathrm{fc}}(M,E)
\longrightarrow\Gamma_{\mathrm{fc}}(M,E)
$$

> に一意に延長される。どちらの写像も、各相対コンパクト開集合上ではその領域の因果過去・未来で源と一致するコンパクト切断を用いて計算できる。さらに任意の該当する入力 $f$ について

$$
PG_{\mathrm{ret}}f=f,\qquad
\operatorname{supp}G_{\mathrm{ret}}f
\subseteq J^+(\operatorname{supp}f),
$$

$$
PG_{\mathrm{adv}}f=f,\qquad
\operatorname{supp}G_{\mathrm{adv}}f
\subseteq J^-(\operatorname{supp}f)
$$

> が成立する。ここでいう一意性は、この局所因果的な値の決定則に従う延長、または各支持空間で上記の片側逆・支持条件を満たす延長の一意性を意味する。
<!-- formal-statement-end -->

### 証明の見取り図

まず局所カットオフを使って元のGreen作用素の値を定めます。異なるカットオフが作る源の差は観測領域の因果過去で零なので、Green解の支持制約から観測領域での値が一致します。

この一致から滑らかな切断を貼り合わせ、pc性を第3節の補題で確かめます。最後に、過去コンパクトな斉次解が零であることから一意性を示します。

<!-- proof-start -->
### 証明

**局所的な値の定義とカットオフ独立性。** $f\in\Gamma_{\mathrm{pc}}$ とし、相対コンパクトな開集合 $V$ を固定します。上記の $\chi_V$ を取り、

$$
u_V=(G_{\mathrm{ret}}(\chi_Vf))|_V
$$

と定義します。別の $\widetilde\chi_V$ も $A\cap J^-(\overline V)$ の近傍で $1$ なら、$h=(\chi_V-\widetilde\chi_V)f$ はコンパクト支持であり

$$
\operatorname{supp}h\cap J^-(\overline V)=\varnothing
$$

です。仮に $q\in V$ で $G_{\mathrm{ret}}h(q)\ne0$ なら、[遅延支持条件](../HPDE18/index.md#thm-hpde18-green-existence)から $q\in J^+(\operatorname{supp}h)$ となり、ある $a\in\operatorname{supp}h$ が $a\le q$ を満たします。しかし $q\in\overline V$ だから $a\in J^-(\overline V)$ となり矛盾します。従って局所値はカットオフに依存しません。

**貼り合わせと方程式。** 二つの領域 $V,W$ の交差内の点 $q$ について、$q$ を含み $\overline U\subset V\cap W$ となる相対コンパクトな開集合 $U$ を選びます。$U$ のためのカットオフ $\chi_U$ と、$V,W$ のそれぞれのカットオフは $A\cap J^-(\overline U)$ の近傍で $1$ です。上と同じ独立性により $u_V|_U=u_W|_U$。すべての点をこうした $V$ で覆うと、局所的に滑らかな $u_V$ は一つの $u\in\Gamma(M,E)$ に貼り合わされます。

$P$ は局所微分作用素です。$V$ の各点の近傍で $\chi_Vf=f$（源の台の内側では $\chi_V=1$、台の外側では $f=0$）なので

$$
Pu|_V=P G_{\mathrm{ret}}(\chi_Vf)|_V
=(\chi_Vf)|_V=f|_V.
$$

**支持条件。** $A$ の因果的未来に入らない点 $q$ では、任意の $\chi_V$ について $\operatorname{supp}(\chi_Vf)\subseteq A$ なので $G_{\mathrm{ret}}(\chi_Vf)$ は $q$ で零です。従って $u=0$ は $M\setminus J^+(A)$ で成立します。第3節の[pc集合の因果的未来](#lem-hpde20-causal-past-compact)から $J^+(A)$ は閉かつpcなので、$\operatorname{supp}u\subset J^+(A)$、しかも $u\in\Gamma_{\mathrm{pc}}$ です。$f\in\Gamma_c$ の場合、元のGreen解も同じ局所値を与えるため、確かに延長になっています。

**一意性。** $H:\Gamma_{\mathrm{pc}}\to\Gamma_{\mathrm{pc}}$ が $PHf=f$ と $\operatorname{supp}Hf\subset J^+(\operatorname{supp}f)$ を満たすとします。
$w=Hf-u$ は $Pw=0$ かつpc支持です。

任意の点 $q$ と、その相対コンパクト近傍 $V$ について、$\operatorname{supp}w\cap J^-(\overline V)$ はコンパクトです。
これを含む開集合で $1$ となるコンパクト台関数 $\eta$ を選びます。

$P(\eta w)$ は $J^-(\overline V)$ 上で $Pw=0$ と一致するため、そこで零です。
また $\eta w\in\Gamma_c$ です。
[Green作用素の両側恒等式](../HPDE19/index.md#prop-hpde19-two-sided-identity)から

$$
\eta w=G_{\mathrm{ret}}(P(\eta w)).
$$

右辺は $V$ 上で零です。なぜなら源 $P(\eta w)$ は $J^-(\overline V)$ と交わらず、遅延Green解はその源の因果的未来にしか台を持たないからです。$\eta w=w$ が $V$ 上で必要とは限りませんが、$V$ 内で $w\ne0$ となる点では $\eta=1$ なので、$w|_V=0$ が従います。任意の $q$ に適用して $w=0$ です。

**先進側。** $f\in\Gamma_{\mathrm{fc}}$、$A=\operatorname{supp}f$ とし、各 $V$ で $A\cap J^+(\overline V)$ の近傍で $1$ となるコンパクト台カットオフを選びます。差の源は $J^+(\overline V)$ と交わらず、[先進支持条件](../HPDE18/index.md#thm-hpde18-green-existence)により $V$ に影響しません。貼り合わせ、$PG_{\mathrm{adv}}f=f$、台の包含、fc性は上の議論で未来・過去を交換して従います。一意性では $\eta w=G_{\mathrm{adv}}P(\eta w)$ を用います。$\square$
<!-- proof-end -->

この証明では「無限個のカットオフの和をGreen作用素へ入れてよい」とは仮定しません。**観測する比較的小さい領域ごとにコンパクト源を作り、重なりで値が一致する**ことから大域切断を得ました。この順序なら、収束しない無限和を暗黙に用いる問題がありません。

## 5. 広げた作用域での両側恒等式

$P$ は局所的なので、切断の台を大きくしません。従って

$$
P:\Gamma_{\mathrm{pc}}\to\Gamma_{\mathrm{pc}},
\qquad
P:\Gamma_{\mathrm{fc}}\to\Gamma_{\mathrm{fc}}
$$

も成立します。前節ではGreen解へ左から $P$ を適用する恒等式を証明しました。逆順 $GP=\operatorname{id}$ も、**入力の支持条件を対応させれば**成立します。

<a id="thm-hpde20-green-two-sided"></a>

<!-- formal-statement-start -->
> **定理（支持条件を指定したGreenの両側逆）**  
> 第4節の設定で、任意の $v\in\Gamma_{\mathrm{pc}}(M,E)$ と $w\in\Gamma_{\mathrm{fc}}(M,E)$ に対して

$$
G_{\mathrm{ret}}Pv=v,\qquad
PG_{\mathrm{ret}}v=v,
$$

$$
G_{\mathrm{adv}}Pw=w,\qquad
PG_{\mathrm{adv}}w=w
$$

> が成立する。従って

$$
P:\Gamma_{\mathrm{pc}}(M,E)\longrightarrow\Gamma_{\mathrm{pc}}(M,E)
$$

> は $G_{\mathrm{ret}}$ を逆写像とする線形全単射であり、fc側では $G_{\mathrm{adv}}$ が逆写像となる。自己随伴性は仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

第4節の一意性で用いたカットオフ計算を、斉次解だけでなく任意の $v$ に使います。カットオフを入れた $\eta v$ は時空コンパクトだから、[前講の $GP=\operatorname{id}$](../HPDE19/index.md#prop-hpde19-two-sided-identity)をそのまま適用できます。追加された交換子の源は観測点の因果過去から外れています。

<!-- proof-start -->
### 証明

$v\in\Gamma_{\mathrm{pc}}$、任意の相対コンパクト開集合 $V$ を取ります。$A=\operatorname{supp}v$ とし、$A\cap J^-(\overline V)$ の近傍で $1$ となるコンパクト台関数 $\eta$ を選びます。局所性から $P(\eta v)$ と $Pv$ は $J^-(\overline V)$ 上で一致します。これは、台 $A$ 上では $\eta=1$ が開近傍で成立し、$A$ の外では $v$ もその微分も局所的に零だからです。

第4節の延長は $V$ 内での値を $J^-(\overline V)$ の源だけから決めるので、

$$
(G_{\mathrm{ret}}Pv)|_V
=(G_{\mathrm{ret}}P(\eta v))|_V.
$$

右辺において $\eta v$ はコンパクト支持だから[Green作用素の両側恒等式](../HPDE19/index.md#prop-hpde19-two-sided-identity)を適用でき、

$$
G_{\mathrm{ret}}P(\eta v)=\eta v.
$$

$V$ 内の $v$ が零でない点は $A\cap V$ に含まれ、そこでは $\eta=1$ なので $(\eta v)|_V=v|_V$。$V$ は任意ゆえ $G_{\mathrm{ret}}Pv=v$ です。他方、$PG_{\mathrm{ret}}v=v$ は[前節の延長定理](#thm-hpde20-green-extension)で示しました。二つを合わせると $P$ が全単射で逆が遅延Greenと分かります。

fc側では $J^+(\overline V)$ に沿うカットオフを用い、$G_{\mathrm{adv}}P(\eta w)=\eta w$ を適用します。同じ局所比較から $G_{\mathrm{adv}}Pw=w$、前節から $PG_{\mathrm{adv}}w=w$ です。$\square$
<!-- proof-end -->

**入力域を混同しない**。たとえば平坦時空の定数斉次解 $v=1$ はpcでもfcでもありません。$Pv=0$ なのに $G_{\mathrm{ret}}(Pv)=0\ne v$ です。$Pv=0$ がコンパクト支持という事実だけから、元の入力 $v$ の支持条件を省けません。

## 6. tcとscの使い分け・次章への出口

tcはpcとfcの交差です。したがってtcの源 $f$ は遅延Greenにも先進Greenにも入力できます。しかし**遅延Greenの出力がtcになるわけではありません**。未来へ進む波は一般に未来コンパクトでなく、遅延解の保証はpcだけです。先進解についても時間を反転した注意が必要です。

一方、コンパクト源の遅延解と先進解の差

$$
E_{\mathrm{cau}}f=G_{\mathrm{ret}}f-G_{\mathrm{adv}}f
$$

は[Green作用素の両側恒等式](../HPDE19/index.md#prop-hpde19-two-sided-identity)により $PE_{\mathrm{cau}}f=0$ を満たし、台は

$$
\operatorname{supp}(E_{\mathrm{cau}}f)
\subseteq J^+(\operatorname{supp}f)\cup J^-(\operatorname{supp}f)
$$

に入ります。従って $E_{\mathrm{cau}}f$ はscです。ただしここでは、**任意のsc斉次解がこの形で表される**とはまだ主張しません。その全射性には時間的カットオフと支持の再検討が必要で、HPDE21–22で証明します。

## 7. 演習：定義の判定からGreen延長の再構成へ

### Level A

<a id="ex-hpde20-a01"></a>
#### HPDE20-A01 時刻0以降の半空間と時間帯を判定する

Minkowski平面で $A=\{t\ge0\}$、$B=\{0\le t\le1\}$ とする。両者についてpc、fc、tc、scをすべて判定せよ。
- Level: A

<!-- solution-start -->
**詳細解答**。$L$ が $|t|\le T$、$|x|\le R$ に入るとして $T,R\ge0$ を選びます。
$J^-(L)$ の点 $(t,x)$ で $t\ge0$ なら、ある $(s,y)\in L$ について

$$
0\le t\le s\le T,\qquad |x-y|\le s-t\le T
$$

です。よって $|x|\le R+T$。
$A\cap J^-(L)$ は閉かつ有界なので、[Heine–Borelの定理](../../../基礎科目/F0/F0-00C1/index.md#thm-f0-00c1-02)によりコンパクトです。
従って $A$ はpcです。

一方、$A\cap J^+(\{(0,0)\})=J^+(\{(0,0)\})$ は非コンパクトでfcではなく、tcでもありません。
また $\{t=0\}\subset A$ が非有界で、どのコンパクト $K$ の因果影の時刻0断面にも入らないためscではありません。

$B\subset A$ は閉集合なのでpcです。$B\cap J^+(L)$ は $0\le t\le1$ かつ $|x|\le R+T+1$ に含まれ、閉であるためコンパクトです。従ってfcでもありtcです。$\{t=1/2\}\subset B$ は時刻一定で非有界なのでscではありません。
<!-- solution-end -->

<a id="ex-hpde20-a02"></a>
#### HPDE20-A02 光円錐の二方向を区別する

$K=\{(0,0)\}$ とし、$J^+(K)$ と $J^-(K)$ がそれぞれsc、pc、fcのどれを満たすか示せ。
- Level: A

<!-- solution-start -->
**詳細解答**。どちらも $J(K)$ の部分集合なのでscです。$J^+(K)\cap J^-(L)$ はコンパクト $K,L$ の[因果ダイヤモンド](../HPDE19/index.md#lem-hpde19-causal-overlap)なのでコンパクト、従って $J^+(K)$ はpcです。しかし $J^+(K)\cap J^+(K)=J^+(K)$ は時刻 $t\to+\infty$ に延びて非コンパクトであり、fcではありません。時間を反転すると $J^-(K)$ はfcですがpcではありません。従ってどちらもtcではありません。
<!-- solution-end -->

<a id="ex-hpde20-a03"></a>
#### HPDE20-A03 コンパクト台の作用域を確認する

$f\in\Gamma_c(M,E)$ とする。$Pf$ がコンパクト支持であることと、$G_{\mathrm{ret}}f$ が必ずpcであることを示せ。
- Level: A

<!-- solution-start -->
**詳細解答**。$q\notin\operatorname{supp}f$ ならその開近傍で $f=0$ であり、局所微分作用素 $P$ をかけても零です。従って $\operatorname{supp}(Pf)\subseteq\operatorname{supp}f$ となります。右辺はコンパクトです。

$K=\operatorname{supp}f$ を取ります。コンパクトな $L$ について

$$
\operatorname{supp}(G_{\mathrm{ret}}f)\cap J^-(L)
\subseteq J^+(K)\cap J^-(L).
$$

右辺は[因果的未来・過去のコンパクトな重なり](../HPDE19/index.md#lem-hpde19-causal-overlap)です。左辺は閉集合なのでコンパクトです。よって $G_{\mathrm{ret}}f$ はpcです。
<!-- solution-end -->

<a id="ex-hpde20-a04"></a>
#### HPDE20-A04 切片のコンパクト性の落とし穴

$D=\{(n,n^2):n\in\mathbb N,\ n\ge1\}\subset\mathbb R^{1+1}$ とする。各時刻切片との交差がコンパクトなのにscではないことを証明せよ。
- Level: A

<!-- solution-start -->
**詳細解答**。$D$ は無限遠にのみ集積するので閉集合です。$\{t=s\}\cap D$ は、$s$ が正の整数なら一点、それ以外なら空です。いずれもコンパクトです。

$D\subset J(K)$ と仮定し、コンパクトな $K$ をある矩形 $[-R,R]^2$ に入れます。$(n,n^2)\in J(K)$ なら $(t_0,x_0)\in K$ と因果関係で結ばれるので

$$
|n^2-x_0|\le |n-t_0|\le n+R.
$$

一方 $|n^2-x_0|\ge n^2-R$ です。十分大きい $n$ では $n^2-R>n+R$ なので矛盾します。従って $D$ はscではありません。
<!-- solution-end -->

### Level B

<a id="ex-hpde20-b01"></a>
#### HPDE20-B01 scとtcの共通部分

大域双曲時空上、scかつtcである滑らかな切断の台がコンパクトになる理由を、二つのコンパクト集合に分けて示せ。
- Level: B

<!-- solution-start -->
**詳細解答**。$u$ の台を $A$ とします。scよりコンパクトな $K$ が存在して $A\subseteq J^+(K)\cup J^-(K)$ です。tcよりfcであるため $A\cap J^+(K)$ はコンパクトです。またpcであるため $A\cap J^-(K)$ もコンパクトです。両者の合併はちょうど $A$ です。有限和のコンパクト性により $A$ はコンパクト。逆に時空コンパクトな切断は、定義へ $K=A$ を代入すればscであり、任意のコンパクト $L$ に対して $A\cap J^\pm(L)$ がコンパクトだからtcです。
<!-- solution-end -->

<a id="ex-hpde20-b02"></a>
#### HPDE20-B02 延長がカットオフに依存しない理由

$f\in\Gamma_{\mathrm{pc}}$、$V\Subset M$ とし、$\chi_1,\chi_2\in C_c^\infty(M)$ はともに $\operatorname{supp}f\cap J^-(\overline V)$ の近傍で $1$ とする。$G_{\mathrm{ret}}(\chi_1 f)|_V=G_{\mathrm{ret}}(\chi_2 f)|_V$ を証明せよ。
- Level: B

<!-- solution-start -->
**詳細解答**。差 $h=(\chi_1-\chi_2)f$ はコンパクト支持です。$q\in J^-(\overline V)$ で $f(q)\ne0$ なら $\chi_1(q)=\chi_2(q)=1$ なので $h(q)=0$。さらに両カットオフはその集合の近傍で一致するため、$\operatorname{supp}h$ は $J^-(\overline V)$ と交わりません。

もし $p\in V$ で $(G_{\mathrm{ret}}h)(p)\ne0$ なら、[遅延Greenの支持条件](../HPDE18/index.md#thm-hpde18-green-existence)により、ある $q\in\operatorname{supp}h$ が $q\le p$ を満たします。$p\in\overline V$ より $q\in J^-(\overline V)$ となり矛盾です。従って $G_{\mathrm{ret}}h|_V=0$。Green作用素の線形性から主張を得ます。
<!-- solution-end -->

<a id="ex-hpde20-b03"></a>
#### HPDE20-B03 コンパクト源に収める計算

$P=\partial_t^2-\partial_x^2$、$v(t,x)=h(t-x)$ とし、$h\in C_c^\infty(\mathbb R)$ は非零とする。$Pv$ を求め、$v$ がpcでもfcでもないことを判定せよ。$G_{\mathrm{ret}}Pv=v$ を主張できるか。
- Level: B

<!-- solution-start -->
**詳細解答**。$z=t-x$ とおくと $\partial_tv=h'(z)$、$\partial_t^2v=h''(z)$、$\partial_xv=-h'(z)$、$\partial_x^2v=h''(z)$ なので $Pv=0$ です。$h(z_0)\ne0$ となる $z_0$ を選び、$t-x=z_0$ の光線上では $v$ が非零です。

任意の点 $(T,X)$ でこの光線の十分過去の点を選び、その点が $J^-((T,X))$ に入るようにするには $T-X\ge z_0$ となる $(T,X)$ を選べばよいです。たとえば $(T,X)=(z_0,0)$ では $t-x=z_0$ 上の $t\le z_0$ の半直線が因果過去に入り、非コンパクトです。よってpcではありません。同じ点の未来側にも光線が非コンパクトに延びるためfcでもありません。

$Pv=0$ はコンパクト支持ですが、元のコンパクト入力用Greenも延長されたpc用Greenも $G_{\mathrm{ret}}(Pv)=0$ を返します。$v\ne0$ なので、pcという入力条件を満たさない $v$ に $G_{\mathrm{ret}}Pv=v$ を適用できません。
<!-- solution-end -->

<a id="ex-hpde20-b04"></a>
#### HPDE20-B04 過去コンパクトの因果影

閉かつpcの $A$ とコンパクトな $L$ に対し、$J^+(A)\cap J^-(L)$ がコンパクトであることを、$A_L=A\cap J^-(L)$ の導入から示せ。
- Level: B

<!-- solution-start -->
**詳細解答**。pcより $A_L$ はコンパクトです。
$q\in J^+(A)\cap J^-(L)$ なら $a\in A$ と $\ell\in L$ が存在して $a\le q\le\ell$ です。
因果関係の推移性から $a\in J^-(L)$、つまり $a\in A_L$ です。従って $q\in J^+(A_L)\cap J^-(L)$。

逆包含は $A_L\subset A$ から成り立ち、二集合は一致します。
[コンパクトな二集合の因果的重なり](../HPDE19/index.md#lem-hpde19-causal-overlap)により右辺はコンパクトです。
観測集合 $L$ を先に固定することが、非コンパクトな $A$ を扱う要点です。
<!-- solution-end -->

### Level C

<a id="ex-hpde20-c01"></a>
#### HPDE20-C01 過去コンパクトな斉次解の一意性と逆作用素

第1節の大域双曲時空、束、$P$ について、$w\in\Gamma_{\mathrm{pc}}(M,E)$ かつ $Pw=0$ と仮定する。任意の相対コンパクト開集合 $V$ を使って $w|_V=0$ を示し、$P:\Gamma_{\mathrm{pc}}\to\Gamma_{\mathrm{pc}}$ の全単射性を証明せよ。$\Gamma_{\mathrm{pc}}$ 全体へ元のコンパクト入力用Greenを直接適用してはならない。
- Level: C

<!-- solution-start -->
**詳細解答**。$A=\operatorname{supp}w$ とします。$V\Subset M$ を任意に選び、pcよりコンパクトな

$$
K_V=A\cap J^-(\overline V)
$$

の近傍で $1$ となるコンパクト台の滑らかな関数 $\chi$ を選びます。$z=\chi w\in\Gamma_c(M,E)$ です。$K_V$ の近傍で $\chi=1$ なので、そこで $Pz=Pw=0$。一方 $A$ の外の点では $w=0$ が近傍で成立し $Pz=0$ です。従って $Pz$ は $J^-(\overline V)$ と交わらないコンパクト支持の源です。

[Green作用素の両側恒等式](../HPDE19/index.md#prop-hpde19-two-sided-identity)より

$$
z=G_{\mathrm{ret}}(Pz).
$$

[遅延Greenの因果的支持](../HPDE18/index.md#thm-hpde18-green-existence)を用いると、$Pz$ が $J^-(\overline V)$ と交わらない以上、そのGreen解は $V$ で零です。従って $z|_V=0$。もし $q\in V$ で $w(q)\ne0$ なら $q\in K_V$ で $\chi(q)=1$ となるため $z(q)=w(q)\ne0$、矛盾です。よって $w|_V=0$、$V$ は任意なので $w=0$ です。

$P$ が単射であることは、核がいま示した零解のみであることから従います。[延長定理](#thm-hpde20-green-extension)は任意の $f\in\Gamma_{\mathrm{pc}}$ に対し $u=G_{\mathrm{ret}}f\in\Gamma_{\mathrm{pc}}$ を作り $Pu=f$ を満たすので、$P$ は全射です。最後に [支持条件を指定したGreenの両側逆](#thm-hpde20-green-two-sided)から逆写像が $G_{\mathrm{ret}}$ であると分かります。
<!-- solution-end -->

## 8. 次に何を証明するか

この講で構成した延長は、無限遠まで広がる源を局所的に扱う道具です。しかし因果伝播子の完全系列には、別の主張――コンパクト源から作る斉次解の像がscの解空間全体になること――が必要です。次講では、$E_{\mathrm{cau}}=G_{\mathrm{ret}}-G_{\mathrm{adv}}$ の核を確定し、その次に時間的カットオフを用いて全射性を証明します。
