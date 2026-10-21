# HPDE18 遅延・先進Green作用素の構成

[大域Cauchy問題の存在一意性](../HPDE16/index.md#thm-hpde16-global-cauchy)から、源と初期値を指定すれば滑らかな大域解が一意に得られます。しかし源 $f$ だけを与えたとき、斉次解をいくらでも加えられます。**源より前に波がない**という条件を課すと、源が生成した応答だけを選べるでしょうか。未来側で波がないという条件から過去へ解くこともできるでしょうか。

この講義では、滑らかでコンパクト支持の源を入力とし、零Cauchyデータから未来向きと過去向きの二つの因果的応答を構成します。論点は、初期面の選択の独立性、因果的支持、入力と出力の空間の違いです。点源の局所基本解からの大域化ではなく、すでに証明した大域Cauchy問題を使う経路をとります。

## 1. 幾何学・作用素・データを固定する

$(M,g)$ は境界のない、時間向き付き滑らかな[大域双曲Lorentz多様体](../../../幾何系/LORG/LORG16/index.md#def-lorg16-global-hyperbolicity)で、計量の符号は $(-,+,\ldots,+)$ とします。$E\to M$ は有限ランク実または複素滑らかなベクトル束、$P:\Gamma(M,E)\to\Gamma(M,E)$ は[normally hyperbolic作用素](../HPDE5/index.md#def-hpde5-normally-hyperbolic)です。形式的自己随伴性は仮定しません。

[LORG20の滑らかなCauchy時間分割](../../../幾何系/LORG/LORG20/index.md#thm-lorg20-orthogonal-splitting)で時間関数 $t:M\to\mathbb R$ を取り、空間的Cauchy面 $\Sigma_s=t^{-1}(s)$、未来向き単位法線 $N$ と[HPDE5の一意接続](../HPDE5/index.md#thm-hpde5-unique-connection) $\nabla^P$ を使います。[HPDE6のCauchyデータ](../HPDE6/index.md#def-hpde6-cauchy-data)は、$u|_{\Sigma_s}$ と $\nabla_N^Pu|_{\Sigma_s}$ の組です。

$\Gamma_c(M,E)$ はコンパクト支持の滑らかな切断、$\Gamma(M,E)$ は任意の滑らかな切断を表します。源 $f\in\Gamma_c(M,E)$ の支持を $K=\operatorname{supp}f$ と書きます。[因果的未来・過去](../../../幾何系/LORG/LORG6/index.md#def-lorg6-chronological-causal-future)は $J^\pm(K)$ で表します。

**最小例**。Minkowski平面で $P=\partial_t^2-\partial_x^2$ とし、$f(t,x)$ が $1<t<2$ にだけ存在するとしましょう。$t=0$ で初期変位と初期速度を零にした解は、源が現れる前には零です。反対に $t=3$ で両データを零にして過去向きに解くこともできます。ただし、初期面を $-10$ や $10$ に変えても同じ解か、源から因果的に届かない点で本当に零かは、証明が必要です。

## 2. 源より前・後の零Cauchyデータ

$f\ne0$ なら $K$ は非空コンパクトであり、連続関数 $t$ による像 $t(K)$ もコンパクトです。したがって、実数 $a,b$ を

$$
a<\min t(K)\le\max t(K)<b
$$

となるよう選べます。この不等式によって、$\Sigma_a$ はすべての源より前、$\Sigma_b$ はすべての源より後にあります。二面は滑らかな空間的Cauchy面です。

<a id="def-hpde18-zero-data-response"></a>

<!-- formal-statement-start -->
> **定義（源に対する零Cauchyデータ応答）**  
> 第1節の $(M,g),E,P,t$ と非零の $f\in\Gamma_c(M,E)$ を固定し、上記の $a,b$ を選ぶ。[大域Cauchy解](../HPDE16/index.md#def-hpde16-global-cauchy) $R_a(f),A_b(f)\in\Gamma(M,E)$ を、それぞれ

$$
\begin{aligned}
PR_a(f)&=f,&R_a(f)|_{\Sigma_a}&=0,&
\nabla_N^PR_a(f)|_{\Sigma_a}&=0,\\
PA_b(f)&=f,&A_b(f)|_{\Sigma_b}&=0,&
\nabla_N^PA_b(f)|_{\Sigma_b}&=0
\end{aligned}
$$

> を満たす唯一の滑らかな解とする。前者を過去の零データからの応答、後者を未来の零データからの応答という。$f=0$ の場合は両者を零切断とする。
<!-- formal-statement-end -->

なぜ存在するでしょうか。[HPDE16の大域Cauchy存在一意性](../HPDE16/index.md#thm-hpde16-global-cauchy)の初期面として $\Sigma_a$ または $\Sigma_b$、源として $f$、二つの初期データとして $(0,0)$ を代入すればよいのです。どちらの面もCauchy面であり、零データはコンパクト支持なので、定理のすべての仮定が成立します。$f=0$ の特別扱いは、$\min t(\varnothing)$ が定義されないためです。

<!-- definition-example-start: def-hpde18-zero-data-response -->
**定義の確認**。Minkowski平面の自明束で、次の平坦波動作用素と源を選びます。

$$
P=\partial_t^2-\partial_x^2,\qquad f(s,y)=h(s)q(y).
$$

ここで $h$ と $q$ は、それぞれ次のように滑らかでコンパクト支持とします。

$$
h\in C_c^\infty((1,2)),\qquad
q\in C_c^\infty((-1,1)).
$$

$a=0$ と $b=3$ は源の時刻区間を挟む条件を満たします。[HPDE12の平坦遅延・先進畳み込み解](../HPDE12/index.md#thm-hpde12-convolution-inverses)はともに $Pu=f$ を満たします。

遅延解は $t<1$ で、先進解は $t>2$ で恒等的に零です。従って、それぞれの零領域に含まれる $\Sigma_0$ と $\Sigma_3$ 上で、値も時間微分も零です。

接続微分と通常の時間微分の対応も確かめます。Minkowski計量 $g=-dt^2+dx^2$ ではChristoffel記号 $\Gamma^k{}_{ij}$ が零で、$P=-g^{ij}\partial_i\partial_j$ の一階微分係数 $A^k$ も零です。[HPDE5の接続の一意分解](../HPDE5/index.md#thm-hpde5-unique-connection)の係数比較式に代入すると、接続係数 $\omega_i$ は

$$
0=A^k=-2g^{ik}\omega_i,\qquad \omega_i=0
$$

となります。したがってこの自明束の $\nabla^P$ は通常微分であり、未来向き単位法線 $N=\partial_t$ について $\nabla_N^P=\partial_t$ です。ゆえに、**方程式と二つのCauchy条件をすべて確認**できました。
<!-- definition-example-end -->

## 3. 零データ応答の因果的支持

<a id="lem-hpde18-zero-side-support"></a>

<!-- formal-statement-start -->
> **補題（零Cauchyデータ応答の支持）**  
> 第2節の設定で $K=\operatorname{supp}f$ とする。許される $a,b$ のそれぞれに対し、

$$
\operatorname{supp}R_a(f)\subset J^+(K),\qquad
\operatorname{supp}A_b(f)\subset J^-(K)
$$

> が成り立つ。特に $R_a(f)$ は $t<\min t(K)$ で、$A_b(f)$ は $t>\max t(K)$ で恒等的に零である。$f=0$ では両者とも零とする。
<!-- formal-statement-end -->

### 証明の見取り図

Cauchy面より未来側と過去側の支持を分けて評価します。[HPDE16の因果的支持包含](../HPDE16/index.md#thm-hpde16-global-cauchy)には、初期データの支持と、面の各側に存在する源の支持だけが現れます。今は初期データが空で、源は全て面の一方の側にあります。

<!-- proof-start -->
### 証明

$f\ne0$ とし、$u=R_a(f)$ を考えます。$a<\min t(K)$ により $K\subset J^+(\Sigma_a)$ かつ $K\cap J^-(\Sigma_a)=\varnothing$ です。初期データの支持は空集合なので、[大域Cauchy定理の未来・過去の支持評価](../HPDE16/index.md#thm-hpde16-global-cauchy)に $\Sigma=\Sigma_a$ を代入すると

$$
\begin{aligned}
\operatorname{supp}u\cap J^-(\Sigma_a)
&\subset J^-(\varnothing)=\varnothing,\\
\operatorname{supp}u\cap J^+(\Sigma_a)
&\subset J^+(K)
\end{aligned}
$$

です。Cauchy時間分割により $M=J^+(\Sigma_a)\cup J^-(\Sigma_a)$ なので、$\operatorname{supp}u\subset J^+(K)$ です。もし $q\in J^+(K)$ ならある $p\in K$ に対し $p\le q$ です。時間関数の増加性から $t(q)\ge t(p)\ge\min t(K)$。従って $t<\min t(K)$ では $u=0$ です。

$v=A_b(f)$ については $K\subset J^-(\Sigma_b)$、$K\cap J^+(\Sigma_b)=\varnothing$ として同じ定理を適用します。未来側は零、過去側は $J^-(K)$ に入り、$t>\max t(K)$ では零になります。$f=0$ は定義から自明です。$\square$
<!-- proof-end -->

ここでの支持条件は「遅延解は源の**未来**にだけ存在し得る」という主張です。源が終わった直後に解が消えるとは言っていません。

<a id="prop-hpde18-slice-independence"></a>

<!-- formal-statement-start -->
> **命題（零初期面の選択からの独立性）**  
> 上の仮定のもとで、同じ非零の $f\in\Gamma_c(M,E)$ に対して二つの初期面を源より前または後に選ぶ。すなわち

$$
a_1,a_2<\min t(\operatorname{supp}f),\qquad
b_1,b_2>\max t(\operatorname{supp}f)
$$

> とする。このとき全時空で

$$
R_{a_1}(f)=R_{a_2}(f),\qquad A_{b_1}(f)=A_{b_2}(f)
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

源よりも前の二つの面の間には、遅延解が恒等的に零となる開いた時間帯があります。早い面で作った解も遅い面上で**値と法線微分の両方が零**です。この性質とCauchy一意性が独立性を保証します。

<!-- proof-start -->
### 証明

$a_1<a_2<\min t(K)$ と並べ替えます。[零Cauchyデータ応答の支持](#lem-hpde18-zero-side-support)により、$R_{a_1}(f)$ は開領域 $t<\min t(K)$ で恒等的に零です。この開領域は $\Sigma_{a_2}$ を含むので、

$$
R_{a_1}(f)|_{\Sigma_{a_2}}=0,\qquad
\nabla_N^PR_{a_1}(f)|_{\Sigma_{a_2}}=0
$$

を得ます。二つ目の零は、開集合上で恒等的に零である切断の接続微分も零になるためです。

他方、$R_{a_2}(f)$ も定義により $\Sigma_{a_2}$ で同じ二つの零データを持ち、両者の源は $f$ です。[HPDE16のCauchy一意性](../HPDE16/index.md#thm-hpde16-global-cauchy)により、二つの解は全時空で一致します。

先進側は $b_1<b_2$ とし、$A_{b_2}(f)$ が $t>\max t(K)$ の開領域で零であることを使います。$\Sigma_{b_1}$ で二つのデータが零であり、$A_{b_1}(f)$ と同じ源を持つので、一意性から一致します。$\square$
<!-- proof-end -->

## 4. 遅延・先進Green作用素

写像が入力切断を一つ受けて出力切断を一つ返すことを、「作用素」と呼びます。前の命題で初期面の選び方を取り除けたので、$f$ だけによる作用素が得られます。

<a id="def-hpde18-green-operators"></a>

<!-- formal-statement-start -->
> **定義（遅延・先進Green作用素）**  
> 第1節の時空・束・normally hyperbolic作用素に対し、次の二つの写像を定める。

$$
G_{\mathrm{ret}},G_{\mathrm{adv}}:
\Gamma_c(M,E)\longrightarrow\Gamma(M,E),
\qquad
G_{\mathrm{ret}}f=R_a(f),\quad
G_{\mathrm{adv}}f=A_b(f).
$$

> $f\ne0$ なら $a<\min t(\operatorname{supp}f)$、$b>\max t(\operatorname{supp}f)$ のどの値でもよい。$f=0$ では両方とも零とする。$G_{\mathrm{ret}}$ を**遅延Green作用素**、$G_{\mathrm{adv}}$ を**先進Green作用素**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde18-green-operators -->
**定義の確認**。平坦な自明束 $P=\partial_t^2-\partial_x^2$ では[HPDE12の畳み込み作用素](../HPDE12/index.md#def-hpde12-convolution-operators)を用いて

$$
\begin{aligned}
(G_{\mathrm{ret}}f)(t,x)
&=\frac12\int_{-\infty}^t\int_{x-(t-s)}^{x+(t-s)}
f(s,y)\,dy\,ds,\\
(G_{\mathrm{adv}}f)(t,x)
&=\frac12\int_t^\infty\int_{x-(s-t)}^{x+(s-t)}
f(s,y)\,dy\,ds.
\end{aligned}
$$

源点 $(s,y)$ と観測点 $(t,x)$ の因果関係が、それぞれの積分範囲を決めています。[HPDE12の畳み込み逆の定理](../HPDE12/index.md#thm-hpde12-convolution-inverses)によって $Pu=f$、第2節の定義例から零Cauchyデータを確認済みなので、ここで構成した $G_{\mathrm{ret}},G_{\mathrm{adv}}$ と一致します。
<!-- definition-example-end -->

<a id="thm-hpde18-green-existence"></a>

<!-- formal-statement-start -->
> **定理（遅延・先進Green作用素の構成と因果的支持）**  
> $(M,g)$ を境界のない時間向き付き滑らかな大域双曲Lorentz多様体、$E\to M$ を有限ランクの実または複素滑らかなベクトル束、$P:\Gamma(M,E)\to\Gamma(M,E)$ を滑らかなnormally hyperbolic作用素とする。上で構成した $G_{\mathrm{ret}},G_{\mathrm{adv}}$ は線形写像であり、すべての $f\in\Gamma_c(M,E)$ に対し

$$
PG_{\mathrm{ret}}f=f,\qquad PG_{\mathrm{adv}}f=f
$$

> および

$$
\operatorname{supp}(G_{\mathrm{ret}}f)\subset J^+(\operatorname{supp}f),
\qquad
\operatorname{supp}(G_{\mathrm{adv}}f)\subset J^-(\operatorname{supp}f)
$$

> を満たす。出力は滑らかだが、一般にコンパクト支持とは限らない。$P$ の形式的自己随伴性は不要である。
<!-- formal-statement-end -->

### 証明の見取り図

Cauchy存在によって方程式 $PGf=f$、独立性によって良定義性、支持補題によって因果的支持を得ます。線形性だけは確認が残ります。二つの入力に**共通の零初期面**を選べば、その線形結合も同じ零データを満たします。

<!-- proof-start -->
### 証明

$G_{\mathrm{ret}}f$ と $G_{\mathrm{adv}}f$ は[大域Cauchy存在一意性](../HPDE16/index.md#thm-hpde16-global-cauchy)で滑らかに構成され、それぞれ $Pu=f$ を満たします。[零初期面の独立性](#prop-hpde18-slice-independence)により定義は良定義であり、[支持補題](#lem-hpde18-zero-side-support)から所望の二つの包含が得られます。

線形性を示すため $f_1,f_2\in\Gamma_c(M,E)$、実または複素のスカラー $\alpha,\beta$ を取ります。$K=\operatorname{supp}f_1\cup\operatorname{supp}f_2$ はコンパクトです。$K=\varnothing$ ならすべて零です。それ以外では $a<\min t(K)$ とします。$u_i=G_{\mathrm{ret}}f_i$ はこの共通の $\Sigma_a$ に零Cauchyデータを持ち、$Pu_i=f_i$ です。よって $u=\alpha u_1+\beta u_2$ は

$$
Pu=\alpha f_1+\beta f_2,\qquad
(u,\nabla_N^Pu)|_{\Sigma_a}=(0,0)
$$

を満たします。一方 $G_{\mathrm{ret}}(\alpha f_1+\beta f_2)$ も同じ源とデータを持ちます。右辺の源が零でも、その場合の唯一の解は零です。[Cauchy一意性](../HPDE16/index.md#thm-hpde16-global-cauchy)から二つの解は等しく、線形性が分かります。$b>\max t(K)$ で共通の未来面を選べば、$G_{\mathrm{adv}}$ についても同じ推論が成り立ちます。$\square$
<!-- proof-end -->

ここまでの意味を正確に読みましょう。$PG_{\mathrm{ret}}=PG_{\mathrm{adv}}=\operatorname{id}$ は、**入力が $\Gamma_c(M,E)$ のとき**の恒等式です。$G_{\mathrm{ret}}P$ の恒等式やGreen作用素の一意性、形式的双対の対応はHPDE19で扱います。一般の $u\in\Gamma(M,E)$ をそのまま $G_{\mathrm{ret}}$ へ入力するのは定義域の誤用です。

## 5. 像がコンパクト支持でないことを計算する

平坦な $1+1$ 次元で $f(s,y)=h(s)q(y)$ とし、$h,q\ge0$ はそれぞれ非零、$\operatorname{supp}h\subset(1,2)$、$\operatorname{supp}q\subset(-1,1)$ とします。$t>3$、$x=0$ なら $s\in(1,2)$ に対して $t-s>1$ です。したがって遅延積分の内側の区間 $[-(t-s),t-s]$ は $q$ の支持をすべて含み、

$$
\begin{aligned}
(G_{\mathrm{ret}}f)(t,0)
&=\frac12\int_1^2 h(s)
\left(\int_{-(t-s)}^{t-s}q(y)\,dy\right)ds\\
&=\frac12\left(\int_1^2h(s)\,ds\right)
\left(\int_{-1}^1q(y)\,dy\right)>0.
\end{aligned}
$$

どれほど大きい $t$ でも値が正なので、遅延解の支持は時間方向に非コンパクトです。先進解も $t<0,x=0$ で同じ積分値になるので、未来と過去の向きが逆なだけで同様に非コンパクトです。これが、出力空間を $\Gamma_c(M,E)$ でなく $\Gamma(M,E)$ とした理由です。

ただし任意の有限時刻帯 $[c,d]$ に対し、[HPDE16の有限時間因果影のコンパクト性](../HPDE16/index.md#lem-hpde16-shadow-compact)を使えば

$$
\operatorname{supp}(G_{\mathrm{ret}}f)\cap t^{-1}([c,d])
\subset J^+(K)\cap t^{-1}([c,d])
$$

の右辺はコンパクトです。左辺は切断の支持と閉時間帯の共通部分なので閉であり、コンパクト集合の閉部分集合としてコンパクトです。先進側でも $J^-(K)$ を使えば成立します。**有限時間帯のコンパクト性と、全時空のコンパクト性は別物**です。

## 6. 固定した源の支持での局所安定性

源を少し変えたときの解の違いを考えます。無限遠で一様な評価を要求せず、固定したコンパクト観測集合 $Q$ での有限階微分を測ります。

<a id="prop-hpde18-fixed-support-continuity"></a>

<!-- formal-statement-start -->
> **命題（固定コンパクト源に対する局所連続依存）**  
> 第4節の設定とコンパクトな $K\subset M$ を固定する。任意のコンパクト $Q\subset M$ と整数 $k\ge0$ に対し、コンパクトな $C\subset M$、整数 $r\ge0$、定数 $A>0$ が存在し、$\operatorname{supp}f,\operatorname{supp}h\subset K$ なら

$$
\|G_{\mathrm{ret}}f-G_{\mathrm{ret}}h\|_{C^k(Q)}
\le A\|f-h\|_{C^r(C)}
$$

> を満たす。先進側にも同じ形式の評価がある。局所ノルムは固定した有限個の座標枠で測り、定数は $K,Q,k$ と背景の作用素に依存してよい。
<!-- formal-statement-end -->

### 証明の見取り図

支持を固定したことで、$f$ と $h$ に同じ過去・未来Cauchy面を使えます。解の差のCauchyデータは零なので、[HPDE17の局所連続依存](../HPDE17/index.md#thm-hpde17-local-stability)の初期データ項を消せます。

<!-- proof-start -->
### 証明

$K=\varnothing$ なら $f=h=0$ です。そうでなければ $a<\min t(K)$、$b>\max t(K)$ を選びます。$w=G_{\mathrm{ret}}f-G_{\mathrm{ret}}h$ は線形性より $Pw=f-h$ であり、$\Sigma_a$ 上の二つのCauchyデータは零です。[HPDE17の局所連続依存定理](../HPDE17/index.md#thm-hpde17-local-stability)をこの面を初期面とする差のCauchy問題へ適用します。指定した $Q,k$ に対し、

$$
\|w\|_{C^k(Q)}
\le A\left(0+0+\|f-h\|_{C^r(C)}\right)
$$

を得ます。ここで引用したHPDE17の定理は初期面を時刻零として記述していますが、Cauchy時間関数を $\tau=t-a$ と置けば $\tau^{-1}(0)=\Sigma_a$ となり、同じ仮定で適用できます。先進側では $\tau=t-b$ と取り直し、$G_{\mathrm{adv}}f-G_{\mathrm{adv}}h$ が $\Sigma_b$ 上で零データを持つことを使えば同じ結果です。$\square$
<!-- proof-end -->

この命題は**支持が共通の $K$ に収まる入力**の比較です。支持が無限遠へ動く列の位相、未来・過去コンパクトという新しい支持空間への延長についてはHPDE20で調べます。

## 7. 演習：零初期面・因果支持・作用域

### Level A

<a id="ex-hpde18-a01"></a>
#### HPDE18-A01 零Cauchy面の選択

非零の $f\in\Gamma_c(M,E)$ が $t(\operatorname{supp}f)\subset[2,5]$ を満たす。遅延・先進の零データを置く面を各一つ選び、その面での条件を書け。
- Level: A

<!-- solution-start -->
**詳細解答**。$a=1<2$、$b=6>5$ を選べます。遅延解は $Pu=f$ と $(u,\nabla_N^Pu)|_{\Sigma_1}=(0,0)$ を、先進解は同じ方程式と $(u,\nabla_N^Pu)|_{\Sigma_6}=(0,0)$ を満たす解です。[HPDE16の大域Cauchy定理](../HPDE16/index.md#thm-hpde16-global-cauchy)を、滑らかなCauchy面とコンパクト支持の $f,0,0$ に適用できます。$a=2,b=5$ では厳密な分離が保証されないため、ここでは採用しません。
<!-- solution-end -->

<a id="ex-hpde18-a02"></a>
#### HPDE18-A02 到達し得る範囲

Minkowski平面の遅延解を考える。源の支持 $K$ は $[1,2]\times[-1,1]$ に含まれる。時刻 $t=4$ で解が非零となり得る空間座標と、解の支持を含む一律の最小閉区間を区別して不等式で求めよ。
- Level: A

<!-- solution-start -->
**詳細解答**。ある $(s,y)\in K$ から $(4,x)$ に因果曲線が存在する必要条件は $|x-y|\le4-s$ です。$1\le s\le2$ と $|y|\le1$ を使って

$$
|x|\le|x-y|+|y|\le4-s+1\le4
$$

です。したがって、解の支持は $[-4,4]$ に含まれます。しかし「支持に含まれ得る」ことと「その点で値が非零になり得る」ことは異なります。

[HPDE12の遅延畳み込み公式](../HPDE12/index.md#def-hpde12-convolution-operators)を $t=4$ に代入すると、

$$
u(4,x)=\frac12\int_1^2\int_{x-(4-s)}^{x+(4-s)}
f(s,y)\,dy\,ds
$$

です。$x=4$ のとき内側の積分下限は $s\ge1$ で、一方 $f(s,y)$ は $y\le1$ の外で零です。両条件の共通部分は高々 $(s,y)=(1,1)$ なので積分は零です。$x=-4$ でも内側の上限が $-s\le-1$ となり、同様に $u(4,-4)=0$ です。よって **値が非零となり得るのは $|x|<4$ の点だけ**です。

他方、$1<s<2$ と $-1<y<1$ で正、長方形の外で零になる滑らかな源を選べます。このとき各 $|x|<4$ に対して $1<s<2$、$-1<y<1$、$|x-y|<4-s$ を満たす点の近傍が存在するので、上の積分は正です。したがって非零点は $(-4,4)$ 全体に及び、その閉包として支持は $[-4,4]$ になります。**一律の支持上界 $[-4,4]$ は最良でも、端点の値そのものは零**です。
<!-- solution-end -->

<a id="ex-hpde18-a03"></a>
#### HPDE18-A03 零源の例外

$f=0$ で $\min t(\operatorname{supp}f)$ を使えない理由を述べ、$G_{\mathrm{ret}}0$ と $G_{\mathrm{adv}}0$ の値を説明せよ。
- Level: A

<!-- solution-start -->
**詳細解答**。$\operatorname{supp}0=\varnothing$ なので $\min t(\varnothing)$ は定義されません。零源には両Green作用素とも零切断を対応させます。零切断は $P0=0$、任意のCauchy面上で $(0,\nabla_N^P0)=(0,0)$ を満たします。[HPDE16の大域Cauchy一意性](../HPDE16/index.md#thm-hpde16-global-cauchy)からこれが唯一の零データ解です。線形作用素に必要な $G0=0$ も成立します。
<!-- solution-end -->

<a id="ex-hpde18-a04"></a>
#### HPDE18-A04 有限時間と全時間の違い

$P=\partial_t^2-\partial_x^2$ で $f=h(t)q(x)$、$h,q\ge0$ 非零、$\operatorname{supp}h\subset(1,2)$、$\operatorname{supp}q\subset(-1,1)$ とする。$G_{\mathrm{ret}}f$ が時空コンパクトでないことを示せ。
- Level: A

<!-- solution-start -->
**詳細解答**。[HPDE12の畳み込み](../HPDE12/index.md#def-hpde12-convolution-operators)で $t>3,x=0$ とします。すべての $s\in(1,2)$ に対して $t-s>1$ なので内側の積分は $\int_{-1}^1q(y)\,dy$ に等しいです。従って

$$
G_{\mathrm{ret}}f(t,0)
=\frac12\left(\int_1^2h(s)\,ds\right)\left(\int_{-1}^1q(y)\,dy\right)>0.
$$

任意に大きい $t$ で非零なので全支持は非コンパクトです。入力は $\Gamma_c$ に属しても、出力は一般に $\Gamma_c$ に属さないことが分かります。
<!-- solution-end -->

### Level B

<a id="ex-hpde18-b01"></a>
#### HPDE18-B01 二つの過去初期面

$\min t(\operatorname{supp}f)=4$ とし、$R_0(f)$ と $R_2(f)$ が一致することを示せ。値が零であるだけでは法線初期値の一致を言えない理由も述べよ。
- Level: B

<!-- solution-start -->
**詳細解答**。[零Cauchyデータ応答の支持](#lem-hpde18-zero-side-support)から

$$
\operatorname{supp}R_0(f)\subset J^+(K)
$$

です。源の最小時刻は $4$ なので、$R_0(f)$ は開領域 $t<4$ で恒等的に零です。接続は局所的な微分演算なので、この領域では法線導関数も零です。従って $\Sigma_2$ において

$$
(R_0(f),\nabla_N^PR_0(f))=(0,0)
$$

が成立します。$R_2(f)$ も同じ面で零Cauchyデータを持ち、両者は同じ $Pu=f$ を満たします。[大域Cauchy一意性](../HPDE16/index.md#thm-hpde16-global-cauchy)で二つの解は一致します。

一つの面で切断の値だけが零でも、法線微分は一般に零とは限りません。ここでは**開いた時間帯で零**という強い情報を使っています。
<!-- solution-end -->

<a id="ex-hpde18-b02"></a>
#### HPDE18-B02 先進作用素の線形性

$f_1,f_2\in\Gamma_c(M,E)$ とスカラー $\alpha,\beta$ について $G_{\mathrm{adv}}(\alpha f_1+\beta f_2)=\alpha G_{\mathrm{adv}}f_1+\beta G_{\mathrm{adv}}f_2$ を証明せよ。
- Level: B

<!-- solution-start -->
**詳細解答**。$K=\operatorname{supp}f_1\cup\operatorname{supp}f_2$ はコンパクトで、非空なら $b>\max t(K)$ を取れます。$v_i=G_{\mathrm{adv}}f_i$ は同じ $\Sigma_b$ で二つの零Cauchyデータを持ちます。従って $v=\alpha v_1+\beta v_2$ について

$$
Pv=\alpha f_1+\beta f_2,\qquad
(v,\nabla_N^Pv)|_{\Sigma_b}=(0,0)
$$

です。一方、$G_{\mathrm{adv}}(\alpha f_1+\beta f_2)$ も同じ源と同じ初期値を持つ大域解です。[Cauchy一意性](../HPDE16/index.md#thm-hpde16-global-cauchy)で一致します。$K=\varnothing$ または合成源が零となる場合は、零入力の定義が同じ結論を与えます。
<!-- solution-end -->

<a id="ex-hpde18-b03"></a>
#### HPDE18-B03 有限時間因果影

$K=\operatorname{supp}f$ はコンパクト、$u=G_{\mathrm{adv}}f$ とする。$c<d$ で $\operatorname{supp}u\cap t^{-1}([c,d])$ がコンパクトとなる理由を、包含と閉性に分けて示せ。
- Level: B

<!-- solution-start -->
**詳細解答**。[支持の定理](#thm-hpde18-green-existence)から

$$
S:=\operatorname{supp}u\cap t^{-1}([c,d])
\subset C:=J^-(K)\cap t^{-1}([c,d]).
$$

[有限時間因果影のコンパクト性](../HPDE16/index.md#lem-hpde16-shadow-compact)より $C$ はコンパクトです。$\operatorname{supp}u$ は定義上閉で、$t$ が連続なので $t^{-1}([c,d])$ も閉です。よって $S$ は閉集合であり、コンパクトな $C$ の閉部分集合としてコンパクトです。時間帯を取り去れば結論は従いません。
<!-- solution-end -->

<a id="ex-hpde18-b04"></a>
#### HPDE18-B04 二つの積分の時間方向

1+1次元平坦波動の $f=h(t)q(x)$ をLevel A04と同様に取る。$G_{\mathrm{adv}}f(t,0)=0$ が $t>2$ に成立することを積分範囲から直接示せ。
- Level: B

<!-- solution-start -->
**詳細解答**。[先進畳み込みの公式](../HPDE12/index.md#def-hpde12-convolution-operators)で

$$
G_{\mathrm{adv}}f(t,0)=\frac12\int_t^\infty
h(s)\left(\int_{-(s-t)}^{s-t}q(y)\,dy\right)\,ds.
$$

$t>2$ なら $s\ge t>2$ なので、$h(s)=0$ が外側の積分の全区間で成立します。従って積分は零です。遅延の積分は逆に $s\le t$ の源を拾うため、過去の源の影響が後まで残り得ます。
<!-- solution-end -->

### Level C

<a id="ex-hpde18-c01"></a>
#### HPDE18-C01 非自己随伴な束値方程式にも通用する構成

境界なしの大域双曲時空 $(M,g)$、有限ランク複素束 $E$、滑らかなnormally hyperbolic作用素 $P$（形式的自己随伴とは限らない）と、$f_1,f_2\in\Gamma_c(M,E)$、$\alpha,\beta\in\mathbb C$ を与える。

(i) 共通の過去Cauchy面で零データの解を作り、源 $\alpha f_1+\beta f_2$ の遅延Green応答を構成せよ。(ii) その面をより過去へ動かしても解が変わらないことと、$PG_{\mathrm{ret}}f=f$、支持包含を証明せよ。(iii) 形式的自己随伴性を使わない理由と、出力空間を $\Gamma_c$ に制限できない理由を述べよ。
- Level: C

<!-- solution-start -->
**詳細解答**。(i) $K=\operatorname{supp}f_1\cup\operatorname{supp}f_2$ はコンパクトです。$K\ne\varnothing$ なら $a<\min t(K)$ を選びます。源 $F=\alpha f_1+\beta f_2$ は $\operatorname{supp}F\subset K$ なので、[HPDE16の大域Cauchy定理](../HPDE16/index.md#thm-hpde16-global-cauchy)を $\Sigma_a$、$(u,\nabla_N^Pu)|_{\Sigma_a}=(0,0)$、$Pu=F$ に適用し、滑らかな唯一の解 $u$ を得ます。$K=\varnothing$ の場合は $u=0$ です。

(ii) 別の $a'<\min t(K)$ で解 $u'$ を作ります。二面のうち早い方で作った解は[支持補題](#lem-hpde18-zero-side-support)により $t<\min t(K)$ の開領域で零なので、遅い方の面で法線微分も零です。両解は同じ源とCauchyデータを持ち、[大域Cauchy一意性](../HPDE16/index.md#thm-hpde16-global-cauchy)から $u=u'$。定義から $Pu=F$ です。さらに前の[支持補題](#lem-hpde18-zero-side-support)により

$$
\operatorname{supp}u\subset J^+(\operatorname{supp}F).
$$

共通面上の線形結合も同じ方程式とデータを満たすので、同じ一意性から $u=\alpha G_{\mathrm{ret}}f_1+\beta G_{\mathrm{ret}}f_2$ です。

(iii) 必要だったのは大域Cauchy存在一意性、因果的支持、線形性のみです。どの手順にも $P=P^*$ は現れません。逆に $G_{\mathrm{ret}}f$ が時空コンパクトだと推論するのは誤りです。実際、平坦1+1次元の非負非零のコンパクト源について第5節で $G_{\mathrm{ret}}f(t,0)>0$ が任意に大きい $t$ に成立すると計算しました。従って、一般に正しい作用域は $\Gamma_c(M,E)\to\Gamma(M,E)$ です。
<!-- solution-end -->

## 8. 次の問題への橋渡し

遅延・先進Green作用素の**存在、線形性、$PGf=f$、因果的支持**を大域Cauchy問題から証明しました。作用素をどの空間で前から掛け、どの空間で後ろから掛けるかは別の問題です。HPDE19では $G_{\mathrm{ret}}P$ と $G_{\mathrm{adv}}P$ の作用域、一意性、形式的双対との対応を扱います。
