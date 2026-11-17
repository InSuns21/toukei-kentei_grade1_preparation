# MIR2-09 GWのJ関数とdescendant

<!-- definition-example-audit: strict -->

## 1. 三点関数の次に、何を記録したいか

[A側の三点関数](../MIR2-03/index.md#def-mir2-03-three-point-series)は、安定写像の各標点で標的のコホモロジー類を評価して積分したものだった。[量子微分方程式](../MIR2-06/index.md#def-mir2-06-qde)では、量子積を行列にまとめたが、その解を曲線の幾何からどう組み立てるかはまだ示していない。

三点関数で見ているのは「標点の像」である。一方、曲線を動かすときは**標点における接線方向**も変わる。この変動を測る $\psi$ 類を挿入した不変量を **descendant（子孫）不変量**という。これらを、標点の数・曲線次数・$\psi$ の指数をまとめて格納する母関数が $J$ 関数である。

今回扱うのは種数0で、標的 $X$ は滑らかな複素射影多様体とする。一般論の式は $H^{\mathrm{even}}(X;\mathbb Q)$ 上で形式的に記述し、具体的な数値検算では滑らかなquintic三次元多様体 $X\subset\mathbb P^4_{\mathbb C}$ を用いる。一般の非凸標的の仮想基本類、忘却写像に関する深いGW公理の大域的構成は**外部の数学的入力**であり、本文の有限次元計算だけで証明したとはしない。

[安定写像のモジュライ・スタック](../../GW/GW1-10/index.md#def-gw1-10-stack)と[評価写像](../../GW/GW1-11/index.md#def-gw1-11-evaluation)を既知とし、次の記号を固定する。

$$
M_{k,\beta}:=\overline{\mathcal M}_{0,k}(X,\beta),
\qquad
\operatorname{ev}_i([C,p_1,\ldots,p_k,f])=f(p_i).
$$

ここで $\beta$ は有効曲線類、$k$ は標点数で、$\beta\ne0$ または $\beta=0,\ k\ge3$ の**安定範囲だけ**を使う。標点の像を測る $\operatorname{ev}_i$ と、以下で作る $\psi_i$ は別の情報である。

## 2. 標点の接線が生む $\psi$ 類

安定写像の族では曲線 $C$ も動くため、各標点の余接空間を一つの線束として束ねる。$M_{k,\beta}$ 上の**普遍曲線** $\pi:\mathcal C\to M_{k,\beta}$ は、各安定写像にその定義域曲線を対応させる族であり、$s_i:M_{k,\beta}\to\mathcal C$ は第 $i$ 標点を選ぶ切断である。スタック上では自己同型も含めてこの構成を解釈する。節点で正則な微分形式を扱うため、通常の相対余接束の代わりに**相対双対化層** $\omega_\pi$ を用いる。標点は節点ではないので、$s_i^*\omega_\pi$ の繊維は $T^*_{p_i}C$ である。

<a id="def-mir2-09-psi-class"></a>

<!-- formal-statement-start -->
> **定義（標点の余接線束と $\psi$ 類）**  
> $X$ を滑らかな複素射影多様体、$M_{k,\beta}=\overline{\mathcal M}_{0,k}(X,\beta)$ を種数0安定写像の固有モジュライ・スタックとする。普遍曲線 $\pi:\mathcal C\to M_{k,\beta}$、第 $i$ 標点切断 $s_i$ と相対双対化層 $\omega_\pi$ に対し、余接線束とその第一Chern類を

$$
L_i=s_i^*\omega_\pi,\qquad
\psi_i=c_1(L_i)\in H^2(M_{k,\beta};\mathbb Q)
\quad(1\le i\le k)
$$

> と定める。$\psi_i$ の実コホモロジー次数は2、複素余次元は1である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mir2-09-psi-class -->

**定義の確認（定数三標点）。** $\beta=0,\ k=3$ では[次数0の積表示](../../GW/GW1-10/index.md#prop-gw1-10-zero-degree)より $M_{3,0}\simeq X\times\overline{\mathcal M}_{0,3}\simeq X$。三つの標点の相対配置は一意で、普遍曲線は $X\times\mathbb P^1$、各切断は一定の点を選ぶ。従って $L_i$ は同じ一次元余接空間を各 $x\in X$ に割り当てる自明線束で、$\psi_i=0$。これは「どの安定写像でも $\psi_i=0$」という意味ではない。

<!-- definition-example-end -->

標点が四つになると、四番目の位置は動き、固定した三標点との衝突を安定化すると境界が生まれる。その境界が余接線束を非自明にする。衝突を無視して単に「$\mathbb P^1$ 上の点の余接空間は一次元だから線束は自明」とするのは誤りである。

<a id="prop-mir2-09-four-point-psi"></a>

<!-- formal-statement-start -->
> **命題（四標点での $\psi$ 積分）**  
> 種数0の安定四標点曲線のモジュライ $\overline{\mathcal M}_{0,4}\simeq\mathbb P^1$ 上では、任意の $i=1,2,3,4$ について

$$
\int_{\overline{\mathcal M}_{0,4}}\psi_i=1.
$$

> 一方、$\overline{\mathcal M}_{0,3}$ 上のすべての $\psi_i$ は零である。
<!-- formal-statement-end -->

### 証明の見取り図

四番目の標点を位置パラメータとして動かし、他の三標点との衝突を吹き上げる。第1標点の切断は一度吹き上げを受け、自己交叉数が $0$ から $-1$ に変わる。切断の法束の双対が余接線束なので、第一Chern数が $1$ になる。

<!-- proof-start -->
### 証明

三標点を $\infty,0,1\in\mathbb P^1_x$ に固定し、第四標点を $t\in\mathbb P^1_t\setminus\{\infty,0,1\}$ に置く。この開集合上の族は $\mathbb P^1_x\times\mathbb P^1_t$ である。$t=\infty,0,1$ では第四標点がそれぞれ固定標点と一致する。各衝突点 $(x,t)=(\infty,\infty),(0,0),(1,1)$ を吹き上げ、衝突した二標点が載る安定な成分を例外曲線として作ると、安定四標点曲線の普遍族になる。

第1標点 $x=\infty$ の切断 $S_1$ は、元の積曲面では水平な定数切断であり、その自己交叉数は $0$。三点のうち $t=\infty$ の吹上げ中心だけが $S_1$ 上にあるので、厳密変換 $S'_1$ の自己交叉数は

$$
(S'_1)^2=S_1^2-1=0-1=-1.
$$

滑らかな標点切断では、相対接束を切断に制限したものが法束 $N_{S'_1/\mathcal C}$ に等しい。従って相対双対化層を制限した余接線束は $L_1\simeq N_{S'_1/\mathcal C}^{\vee}$ となり、

$$
\deg L_1=-\deg N_{S'_1/\mathcal C}=-(S'_1)^2=1.
$$

よって $\int\psi_1=\deg c_1(L_1)=1$。標点を入れ替える同型で残りの $i$ にも同じ計算が適用できる。三標点のモジュライは一点なので、そこにある正次数のコホモロジー類 $\psi_i$ は零である。
<!-- proof-end -->

## 3. descendantと挿入次数

[一次GW不変量](../MIR2-02/index.md#def-mir2-02-virtual-gw)では評価類 $\operatorname{ev}_i^*\alpha_i$ を掛けた。**子孫挿入**はこれに同じ標点での $\psi_i^{a_i}$ を掛ける操作である。$a_i=0$ なら通常の一次挿入に戻る。

<a id="def-mir2-09-descendant"></a>

<!-- formal-statement-start -->
> **定義（種数0 descendant不変量）**  
> 滑らかな複素射影多様体 $X$、安定な $(0,k,\beta)$、非負整数 $a_i$ および斉次コホモロジー類 $\alpha_i\in H^*(X;\mathbb Q)$ に対し、自然な種数0仮想基本類 $[M_{k,\beta}]^{\mathrm{vir}}$ が与えられているものとして

$$
\left\langle\tau_{a_1}(\alpha_1),\ldots,
\tau_{a_k}(\alpha_k)\right\rangle_{0,\beta}^{X}
:=
\int_{[M_{k,\beta}]^{\mathrm{vir}}}
\prod_{i=1}^{k}
\psi_i^{a_i}\operatorname{ev}_i^*\alpha_i
$$

> と定義する。$\tau_a(\alpha)$ は $\psi^a$ と評価挿入を**同じ標点で掛ける記法**であり、別の写像ではない。斉次次数が合わない場合の積分値は零とする。定数写像で $k<3$ の不安定な場合はこの定義の対象としない。
<!-- formal-statement-end -->

非凸なquinticでもこの式を使うには、[完全障害理論](../../GW/GW1-20/index.md#def-gw1-20-perfect-obstruction)に基づく安定写像の**大域的な仮想基本類の存在と標点操作との整合性**が必要である。これらは外部入力とし、式の記号を定義しただけで仮想類の構成を証明したとはしない。

<!-- definition-example-start: def-mir2-09-descendant -->

**定義の確認（次数0・四標点）。** $X$ をquintic、$H=c_1(\mathcal O_X(1))$ とする。定数四標点では $M_{4,0}\simeq X\times\overline{\mathcal M}_{0,4}$、評価写像はすべて第一射影、$\psi_1$ は第二射影から来る。写像方向の $H^1(C,f^*TX)$ は零で仮想類は通常の基本類になる。[三重交叉数](../MIR2-02/index.md#prop-mir2-02-degree-zero-three-point)と[四標点の $\psi$ 積分](#prop-mir2-09-four-point-psi)から

$$
\begin{aligned}
\langle\tau_1(H),H,H,1\rangle_{0,0}^{X}
&=\int_{X\times\overline{\mathcal M}_{0,4}}
\operatorname{pr}_X^*(H^3)\operatorname{pr}_{\overline{\mathcal M}}^*(\psi_1)\\
&=\left(\int_X H^3\right)
\left(\int_{\overline{\mathcal M}_{0,4}}\psi_1\right)
=5\cdot1=5.
\end{aligned}
$$

四個の挿入のうち $1$ は単位類であり、$H$ を四回掛けたのではない。実次数は $2(1+1+1+0)+2=8$、仮想複素次元4の実次元8と一致する。

<!-- definition-example-end -->

<a id="prop-mir2-09-dimension-rule"></a>

<!-- formal-statement-start -->
> **命題（descendantの次数必要条件）**  
> $X$ の複素次元を $m$、$\beta$ を有効曲線類とし、$M_{k,\beta}$ が安定で自然な仮想基本類を持つとする。$\alpha_i\in H^{2r_i}(X;\mathbb Q)$ を偶数次数の斉次類とする。種数0 descendantが非零となる必要条件は

$$
\sum_{i=1}^k(r_i+a_i)
=m-3+\int_\beta c_1(TX)+k.
$$

> quintic三次元多様体では $m=3,\ c_1(TX)=0$ だから右辺は $k$。次数一致は**必要**であり、非零を保証しない。
<!-- formal-statement-end -->

### 証明の見取り図

各 $\psi$ は複素余次元1、各評価挿入は複素余次元 $r_i$ を足す。仮想基本類の実次元と積の実次数を突き合わせる。

<!-- proof-start -->
### 証明

[種数0の仮想次元公式](../MIR2-02/index.md#prop-mir2-02-virtual-dimension)の一般形は

$$
D=(m-3)+\int_\beta c_1(TX)+k.
$$

$\operatorname{ev}_i^*\alpha_i$ は実次数 $2r_i$ で、$\psi_i^{a_i}$ は実次数 $2a_i$。カップ積の実次数は $2\sum_i(r_i+a_i)$ となる。仮想基本類は実ホモロジー次数 $2D$ にあるので、積分が非零なら

$$
2\sum_i(r_i+a_i)=2D.
$$

両辺を2で割れば主張を得る。quinticでは $m=3$ と $c_1(TX)=0$ を代入して $D=k$ となる。この計算は次元だけの議論なので、実際に交叉類が零でないことまでは示さない。
<!-- proof-end -->

## 4. 全ての子孫挿入を一つの $J$ 関数へ

descendantの表を、次数 $\beta$、追加標点数 $n$、$\psi$ の指数 $a$ ごとに別々に保存する代わりに、$z^{-1}$ の係数へ押し込む。ここで $z$ は**補助形式変数**であり、MIR1のミラー複素構造パラメータ $z$ と同じものではない。本講では誤読を防ぐため $w$ と書く。

コホモロジー値の押し出し $(\operatorname{ev}_{n+1})_*$ は、任意の $\gamma\in H^*(X)$ とペアリングして

$$
\int_X\gamma\smile(\operatorname{ev}_{n+1})_* A
=
\int_{[M_{n+1,\beta}]^{\mathrm{vir}}}
\operatorname{ev}_{n+1}^*\gamma\smile A
$$

を満たす類として定める。スタック上の仮想押し出しが定義できることは外部入力である。$Q^\beta$ は曲線次数を記録するNovikov形式記号で、$\beta=0$ の場合は $Q^0=1$ とする。[既習のNovikov完備化](../../GW/GW1-16/index.md#def-gw1-16-novikov)に従い、形式級数として読む。

<a id="def-mir2-09-j-function"></a>

<!-- formal-statement-start -->
> **定義（種数0の大きい $J$ 関数）**  
> $X$ を滑らかな複素射影多様体、$\mathbf t\in H^{\mathrm{even}}(X;\mathbb Q)$ を偶数コホモロジーの形式パラメータとする。安定写像の自然な仮想基本類が与えられたとき、補助形式変数 $w$ に関して

$$
\begin{aligned}
J_X(\mathbf t,Q,w)
:= {}&w\mathbf1+\mathbf t\\
&+\sum_{\substack{\beta\ {\rm effective},\,n\ge0\\
\beta\ne0\ \mathrm{or}\ n\ge2}}
\frac{Q^\beta}{n!}
(\operatorname{ev}_{n+1})_*
\left(
\frac{\prod_{j=1}^{n}\operatorname{ev}_j^*\mathbf t}
{w-\psi_{n+1}}
\cap[M_{n+1,\beta}]^{\mathrm{vir}}
\right).
\end{aligned}
$$

> と定義する。$\mathbf1$ は単位類で、分母は $w^{-1}$ の形式級数

$$
\frac1{w-\psi}=\sum_{a\ge0}\frac{\psi^a}{w^{a+1}}
$$

> として展開する。先頭の $w\mathbf1+\mathbf t$ は不安定な次数0の項を**規約として補ったもの**であり、存在しない $M_{1,0}$ や $M_{2,0}$ の積分ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mir2-09-j-function -->

**定義の確認（次数0の最初の項）。** $Q=0$ として正次数項を除く。$n=2$ だけを取ると $M_{3,0}\simeq X$、$\psi_3=0$、各評価写像は恒等なので

$$
\frac{1}{2!}(\operatorname{ev}_3)_*
\left(\frac{\operatorname{ev}_1^*\mathbf t\,
\operatorname{ev}_2^*\mathbf t}{w-\psi_3}
\cap[M_{3,0}]\right)
=\frac{\mathbf t\smile\mathbf t}{2w}.
$$

従って $J_X|_{Q=0}=w\mathbf1+\mathbf t+\mathbf t^2/(2w)+\cdots$。$n=0,1$ は次数0で不安定だから和に存在しないことも確認した。

<!-- definition-example-end -->

<a id="prop-mir2-09-j-coefficients"></a>

<!-- formal-statement-start -->
> **命題（$J$ 係数は一標点子孫相関である）**  
> 上記の $J_X$ において、$H^{\mathrm{even}}(X;\mathbb Q)$ の斉次基底 $(\phi_\mu)$ とPoincaré双対基底 $(\phi^\mu)$ を $\int_X\phi_\mu\smile\phi^\nu=\delta_\mu^\nu$ によって取る。このとき安定な各 $(n+1,\beta)$ について、$Q^\beta w^{-a-1}/n!$ に対応する係数は

$$
\sum_\mu\phi^\mu
\left\langle
\underbrace{\mathbf t,\ldots,\mathbf t}_{n\ {\rm 個}},
\tau_a(\phi_\mu)
\right\rangle_{0,\beta}^{X}.
$$

> 奇数コホモロジー挿入も扱う一般形では適切な符号付き双対基底が必要であり、本講は偶数部分に制限する。
<!-- formal-statement-end -->

### 証明の見取り図

分母を幾何級数展開する。押し出しの係数をPoincaré双対基底で取り出すと、標点 $n+1$ に $\phi_\mu$ と $\psi_{n+1}^a$ を挿入した積分が現れる。

<!-- proof-start -->
### 証明

展開式 $1/(w-\psi_{n+1})=\sum_{a\ge0}\psi_{n+1}^a w^{-a-1}$ を $J$ の定義に代入する。固定した $\beta,n,a$ における押し出し類を $A_{\beta,n,a}$ とする。任意の $\phi_\mu$ について押し出しの定義から

$$
\int_X\phi_\mu\smile A_{\beta,n,a}
=
\int_{[M_{n+1,\beta}]^{\mathrm{vir}}}
\left(\prod_{j=1}^{n}\operatorname{ev}_j^*\mathbf t\right)
\psi_{n+1}^a\operatorname{ev}_{n+1}^*\phi_\mu.
$$

右辺は[descendantの定義](#def-mir2-09-descendant)そのものである。双対基底の性質から、任意の偶数類 $A$ は

$$
A=\sum_\mu\phi^\mu\int_X\phi_\mu\smile A
$$

と一意に展開できるので、$A=A_{\beta,n,a}$ を代入して主張を得る。最後に定義の $1/n!$ を掛ければ所望の係数になる。
<!-- proof-end -->

同じGW不変量でも $\psi$ を入れたかどうかが $w^{-1},w^{-2},\ldots$ の位置の違いとなる。これが $J$ にdescendantを入れる数学的な意味である。

## 5. 四標点の計算から、指数関数が現れる

次数0では $M_{n+1,0}\simeq X\times\overline{\mathcal M}_{0,n+1}$（$n\ge2$）。標的側の $\mathbf t^n$ と曲線側の $\psi_{n+1}^a$ は別因子に属する。後者が積分できるのは、$\overline{\mathcal M}_{0,n+1}$ の複素次元 $n-2$ に合わせて $a=n-2$ のときだけである。

種数0の$\psi$交点数には、次の**外部の既知公式**がある（一般の忘却射と境界因子の関係を用いる定理であり、本講の四標点の吹上げ計算だけから全 $n$ を証明したわけではない）。

$$
\int_{\overline{\mathcal M}_{0,n+1}}\psi_{n+1}^{\,n-2}=1
\qquad(n\ge2).
$$

$n=2$ は一点上の $1$ の積分、$n=3$ は[前節で証明した四標点の計算](#prop-mir2-09-four-point-psi)と一致する。この入力をどこで使うか明示して、次数0の母関数を計算する。

<a id="prop-mir2-09-degree-zero-j"></a>

<!-- formal-statement-start -->
> **命題（次数0の $J$ 関数）**  
> $X$ を滑らかな複素射影多様体とし、自然な次数0の仮想基本類と上記の種数0 $\psi$ 交点数公式を用いる。任意の偶数形式パラメータ $\mathbf t\in H^{\mathrm{even}}(X;\mathbb Q)$ について

$$
J_X(\mathbf t,0,w)=w\exp(\mathbf t/w)
=w\mathbf1+\mathbf t+\frac{\mathbf t^2}{2!w}
+\frac{\mathbf t^3}{3!w^2}+\cdots
$$

> が形式級数として成立する。
<!-- formal-statement-end -->

### 証明の見取り図

定数写像では評価類が標的 $X$ のみに依存する。曲線側は $\psi$ 交点数のうち最上次数だけが積分に残り、係数が各 $1/n!$ になる。

<!-- proof-start -->
### 証明

安定な次数0・$n+1$ 標点のモジュライは積 $X\times\overline{\mathcal M}_{0,n+1}$ であり、写像方向の $H^1(C,f^*TX)$ が消えるので、仮想類は通常の積基本類である。各評価写像は $X$ への第一射影、$\psi_{n+1}$ は第二因子の類なので、押し出しは

$$
(\operatorname{ev}_{n+1})_*
\left(\mathbf t^n\sum_{a\ge0}\frac{\psi_{n+1}^a}{w^{a+1}}\right)
=
\mathbf t^n\,
\frac{1}{w^{n-1}}
\int_{\overline{\mathcal M}_{0,n+1}}\psi_{n+1}^{n-2}.
$$

次元から $a=n-2$ 以外は寄与せず、明示した外部の交点数公式によって積分は1である。従って $n\ge2$ の項は $\mathbf t^n/(n!w^{n-1})$。定義により別途補った $w+\mathbf t$ を加えると

$$
J_X(\mathbf t,0,w)
=\sum_{n\ge0}\frac{\mathbf t^n}{n!w^{n-1}}
=w\sum_{n\ge0}\frac{(\mathbf t/w)^n}{n!}
=w\exp(\mathbf t/w).
$$

これは形式的な等式であり、任意の複素数値 $w$ に関する解析的収束を主張しない。
<!-- proof-end -->

**quinticでの直接例。** $\mathbf t=bH$ とすると $H^4=0$ だから、次数0の母関数は正確に

$$
J_X(bH,0,w)
=w+bH+\frac{b^2H^2}{2w}
+\frac{b^3H^3}{6w^2}.
$$

$w^{-2}$ の係数 $b^3H^3/6$ は三つの追加標点と、最後の標点での $\psi$ 一個を組み合わせて生じる。上の四標点計算を使えば、この項は一般公式を暗記しなくても再現できる。

## 6. quinticの正次数で $J$ が何を記録するか

ここから $X$ を滑らかなquintic、$H=c_1(\mathcal O_X(1))$、$d=\int_\beta H\ge1$ とする。[無標点種数0GW数](../MIR2-03/index.md#def-mir2-03-unmarked-number)を $N_d^X$ と書く。$d>0$ では標点が一つでも安定写像は存在するから、$\mathbf t=0$ の $J$ に正次数の項が残る。

$k=1$ の[仮想次元](../MIR2-02/index.md#prop-mir2-02-virtual-dimension)は複素次元1である。従って $\psi_1^a$ を挿入して $X$ へ押し出した類は、仮想複素次元から $a$ を引いて、$\dim_{\mathbb C}X=3$ の標的上で複素余次元 $2+a$ の類になる。$a\ge2$ は余次元が4以上となり零である。偶数ambientコホモロジーは $1,H,H^2,H^3$ で表されるので、$a=0$ の押し出しは $H^2$ の倍数、$a=1$ は $H^3$ の倍数になる。

<a id="prop-mir2-09-quintic-first-coefficient"></a>

<!-- formal-statement-start -->
> **命題（quinticの $J$ 関数に現れる無標点GW数）**  
> $X\subset\mathbb P^4_{\mathbb C}$ を滑らかなquintic、$d\ge1$ とし、$N_d^X=\langle\,\rangle_{0,d}^{X}$ を自然な仮想基本類による無標点種数0GW数とする。$J_X(\mathbf t,Q,w)$ の $\mathbf t=0$ において、$Q^d w^{-1}$ の係数は

$$
(\operatorname{ev}_1)_*[M_{1,d}]^{\mathrm{vir}}
=\frac{dN_d^X}{5}\,H^2.
$$

> $Q^d w^{-2}$ の係数は $H^3$ の倍数であり、$Q^d w^{-a-1}$（$a\ge2$）の係数は零である。$N_d^X$ の具体値はこの命題だけでは決まらない。
<!-- formal-statement-end -->

### 証明の見取り図

一次の押し出しは $H^2$ の倍数と分かる。係数を決めるには $H$ とペアリングし、[因子公理](../MIR2-03/index.md#thm-mir2-03-divisor)で一標点の積分を無標点の数に戻す。

<!-- proof-start -->
### 証明

$\psi_1^0$ を押し出した類を $A_d$ とする。上の仮想次元の議論から $A_d=c_dH^2$ と書ける。押し出しの定義を $\gamma=H$ に適用すると

$$
\int_XH\smile A_d
=\int_{[M_{1,d}]^{\mathrm{vir}}}\operatorname{ev}_1^*H
=\langle H\rangle_{0,d}^{X}.
$$

$d\ge1$ だから、[正次数の因子公理](../MIR2-03/index.md#thm-mir2-03-divisor)を $k=0$ に適用でき、右辺は $dN_d^X$ である。一方、[古典的三重交叉](../MIR2-02/index.md#prop-mir2-02-degree-zero-three-point)より

$$
\int_XH\smile A_d
=c_d\int_XH^3=5c_d.
$$

従って $5c_d=dN_d^X$、すなわち $c_d=dN_d^X/5$。$\psi_1^a$ の複素余次元は $a$ なので押し出しは $2+a$ 次の複素余次元を持つ。$a=1$ は余次元3で $H^3$ の倍数、$a\ge2$ は三次元多様体上に存在しない次数で零になる。
<!-- proof-end -->

この命題は、$J$ の係数が**幾何的な数値を持っている**ことの具体例である。しかし $N_d^X$ を計算したのでも、B側の超幾何級数と $J$ が等しいと証明したのでもない。[B側のprepotential](../MIR2-08/index.md#def-mir2-08-flat-prepotential)や[量子微分方程式](../MIR2-06/index.md#def-mir2-06-qde)との精確な比較には、次講以降の $I$ 関数・ミラー写像・ミラー定理という追加入力が必要となる。特に本講の補助変数 $w$ は、B側の複素構造座標 $z$ とは区別し続ける。

## 7. 演習：標点、$\psi$、押し出しを手で扱う

### Level A：定義と最初の係数

<a id="ex-mir2-09-a01"></a>
#### MIR2-09-A01 三標点の余接線束
- Level: A

滑らかな射影多様体 $X$ への定数三標点写像に対し、$M_{3,0}$ と $\psi_1$ を求めよ。標点が一つ増えた場合に同じ結論が成り立たない理由も述べよ。

<!-- solution-start -->
**詳細解答**。[次数0の積表示](../../GW/GW1-10/index.md#prop-gw1-10-zero-degree)で $M_{3,0}\simeq X\times\overline{\mathcal M}_{0,3}\simeq X$。曲線は三標点のある固定 $\mathbb P^1$ で、各余接繊維は位置に依存せず一定なので、$L_1$ は自明、$\psi_1=c_1(L_1)=0$。四標点では $\overline{\mathcal M}_{0,4}\simeq\mathbb P^1$ の位置パラメータが残り、衝突で境界が生まれる。[四標点の命題](#prop-mir2-09-four-point-psi)により $\int\psi_1=1$ なので零類ではない。
<!-- solution-end -->

<a id="ex-mir2-09-a02"></a>
#### MIR2-09-A02 descendantの次数判定
- Level: A

quinticの次数 $d>0$、$k=2$ で、$\langle\tau_1(H),1\rangle_{0,d}$、$\langle\tau_2(1),H\rangle_{0,d}$、$\langle\tau_1(H^2),1\rangle_{0,d}$ は次数条件から零と分かるか。

<!-- solution-start -->
**詳細解答**。[次数必要条件](#prop-mir2-09-dimension-rule)は $\sum(r_i+a_i)=k=2$。第一は $(1+1)+(0+0)=2$ で排除できない。第二は $(0+2)+(1+0)=3$ で2を超え、零。第三は $(2+1)+(0+0)=3$ で零。第一については必要条件に合うだけで、値を決めるものではない。
<!-- solution-end -->

<a id="ex-mir2-09-a03"></a>
#### MIR2-09-A03 分母の幾何級数
- Level: A

$1/(w-\psi)$ を $w^{-3}$ の項まで展開し、$\tau_a(\alpha)$ の $a=0,1,2$ が $J$ のどの冪に対応するか答えよ。

<!-- solution-start -->
**詳細解答**。$w-\psi=w(1-\psi/w)$ なので、形式幾何級数 $(1-u)^{-1}=1+u+u^2+\cdots$ に $u=\psi/w$ を代入すると

$$
\frac1{w-\psi}
=\frac1w+\frac{\psi}{w^2}+\frac{\psi^2}{w^3}+O(w^{-4}).
$$

従って $a=0$ は $w^{-1}$、$a=1$ は $w^{-2}$、$a=2$ は $w^{-3}$。ここでは $w$ に数値を代入した収束級数ではなく形式級数である。
<!-- solution-end -->

<a id="ex-mir2-09-a04"></a>
#### MIR2-09-A04 四標点の具体値
- Level: A

quintic上で $\langle\tau_1(H),H,H,1\rangle_{0,0}^{X}$ を積表示から求めよ。必要な複素余次元も確かめよ。

<!-- solution-start -->
**詳細解答**。$\overline{\mathcal M}_{0,4}(X,0)\simeq X\times\overline{\mathcal M}_{0,4}$。評価類の積は $H^3$ の引戻し、$\psi_1$ は曲線側の引戻し。[四標点の積分](#prop-mir2-09-four-point-psi)と[三重交叉](../MIR2-02/index.md#prop-mir2-02-degree-zero-three-point)から $5\cdot1=5$。挿入の複素余次元は $H$ が三個で3、$\psi_1$ が1、単位類が0、合計4。仮想複素次元 $k=4$ と一致する。
<!-- solution-end -->

<a id="ex-mir2-09-a05"></a>
#### MIR2-09-A05 不安定項の見分け
- Level: A

$J_X$ における次数0の $(n,\beta)=(0,0),(1,0),(2,0)$ を比べ、どれが安定な積分か、どれが規約で補われたかを述べよ。ここで $n$ は追加標点数である。

<!-- solution-start -->
**詳細解答**。定義の積分空間は $M_{n+1,\beta}$ なので、$n=0$ は定数一標点、$n=1$ は定数二標点であり、いずれも不安定でモジュライを用いた積分は定義しない。それぞれ $w\mathbf1$ と $\mathbf t$ が定義に別途補われている。$n=2$ は定数三標点で安定、$\psi_3=0$ なので積分値は $\mathbf t^2/(2w)$。$1/2!$ は二つの追加標点の対称化係数である。
<!-- solution-end -->

### Level B：定義をつなぐ

<a id="ex-mir2-09-b01"></a>
#### MIR2-09-B01 四標点の交叉から指数の三次項へ
- Level: B

$Q=0$ で $\mathbf t=bH$ とする。$J_X$ の $b^3w^{-2}$ の係数を、$n=3$ の項のみから導出せよ。$H^3$ の係数として答えよ。

<!-- solution-start -->
**詳細解答**。追加標点が三個なら $n+1=4$ で、係数は

$$
\frac{b^3}{3!}(\operatorname{ev}_4)_*
\left(\frac{\prod_{j=1}^{3}\operatorname{ev}_j^*H}{w-\psi_4}\right).
$$

$w^{-2}$ を得るには分母の $\psi_4/w^2$ 項を選ぶ。定数写像なので評価類の積は $H^3$ の引戻し、曲線側の[四標点の積分](#prop-mir2-09-four-point-psi)は1。従って係数は $b^3H^3/6$。これは $w\exp(bH/w)$ の三次項 $w(bH/w)^3/3!$ と一致する。$H^3$ の数値積分は5だが、ここで求めたのは**コホモロジー値**の係数であって数値 $5b^3/6$ ではない。
<!-- solution-end -->

<a id="ex-mir2-09-b02"></a>
#### MIR2-09-B02 押し出しの双対基底
- Level: B

quintic上の偶数ambient基底 $(1,H,H^2,H^3)$ のPoincaré双対基底を求めよ。$A=cH^2$ が $\int_XH\smile A=7$ を満たすとき $c$ はいくつか。

<!-- solution-start -->
**詳細解答**。三次元のquinticでは $\int_XH^3=5$ で、$\int_XH^aH^b$ は $a+b=3$ の場合だけ非零。従って双対基底は元の順に

$$
\left(\frac{H^3}{5},\frac{H^2}{5},
\frac{H}{5},\frac{1}{5}\right).
$$

$A=cH^2$ の $H$ とのペアリングは $\int_XH\smile cH^2=5c$。条件 $5c=7$ から $c=7/5$。双対基底を求める際に、単に順序を逆にするだけで $1/5$ を忘れると誤る。
<!-- solution-end -->

<a id="ex-mir2-09-b03"></a>
#### MIR2-09-B03 因子公理を $J$ の係数へ
- Level: B

$d\ge1$ のquintic GW数を $N_d^X$ とする。$J_X(0,Q,w)$ の $Q^dw^{-1}$ 係数を導出せよ。次数0へ同じ式を適用してはいけない理由も示せ。

<!-- solution-start -->
**詳細解答**。$n=0$ の項は $\beta=d>0$ なら安定で、$w^{-1}$ 係数は $A_d=(\operatorname{ev}_1)_*[M_{1,d}]^{\mathrm{vir}}$。仮想複素次元1、標的複素次元3より $A_d=c_dH^2$。$H$ とペアリングして[正次数の因子公理](../MIR2-03/index.md#thm-mir2-03-divisor)を用いると

$$
5c_d=\int_XH\smile A_d
=\langle H\rangle_{0,d}^{X}
=d\,\langle\,\rangle_{0,d}^{X}
=dN_d^X.
$$

従って $A_d=(dN_d^X/5)H^2$。$d=0$ の $M_{1,0}$ および $M_{0,0}$ は不安定で存在せず、$N_0$ を無標点GW数として定義して代入することはできない。これは係数を0に置くという意味ではない。
<!-- solution-end -->

<a id="ex-mir2-09-b04"></a>
#### MIR2-09-B04 必要次数が一致しても零
- Level: B

quinticの次数0・五標点で、次の二つのdescendantを比較せよ。ともに複素余次元の合計が仮想次元に等しいことを確認し、どちらかが零になる理由を説明せよ。

$$
A=\langle\tau_1(H^2),H^2,1,1,1\rangle_{0,0}^{X},
\qquad
B=\langle\tau_2(H^3),1,1,1,1\rangle_{0,0}^{X}.
$$

<!-- solution-start -->
**詳細解答**。次数0・五標点の仮想複素次元は5である。$A$ の挿入余次元は $\psi_1$ の1と $H^2$ 二個の各2で合計 $1+2+2=5$。$B$ は $\psi_1^2$ の2と $H^3$ の3で合計 $2+3=5$。いずれも必要次数に一致する。

定数写像の積表示から、$A$ の標的側の積は $H^2\smile H^2=H^4$。$X$ は複素次元3なので $H^4=0$、従って $A=0$。一方 $B$ では標的側は $H^3$ で $\int_XH^3=5$。曲線側は第5節で外部入力と明記した種数0 $\psi$ 交点数公式を $n+1=5$ に適用して $\int_{\overline{\mathcal M}_{0,5}}\psi_1^2=1$。よって

$$
B=\left(\int_XH^3\right)
\left(\int_{\overline{\mathcal M}_{0,5}}\psi_1^2\right)
=5\cdot1=5.
$$

次数が一致しても、標的上のコホモロジー積が零なら不変量は零となる。これが必要条件と十分条件の違いである。
<!-- solution-end -->

### Level C：二つの母関数を比較する準備

<a id="ex-mir2-09-c01"></a>
#### MIR2-09-C01 quinticの形式的 $J$ を構成し境界を説明する
- Level: C

quintic $X$、$\mathbf t=bH$ とする。次を一続きに示せ。

1. $Q=0$ の $J_X$ をすべての $b$ の次数について決定する。
2. $b=0$、任意の $d\ge1$ について $Q^d$ 項の可能な $w^{-1}$、$w^{-2}$ のコホモロジー次数を求め、$w^{-1}$ 項を $N_d^X$ で表す。
3. この二つの計算だけでは、quinticのミラー定理やB側周期との一致が証明できない理由を述べる。

<!-- solution-start -->
**詳細解答**。

(1) 次数0の安定な $n+1$ 標点では積表示を使う。$n\ge2$ の曲線側の最上次数は $\psi_{n+1}^{n-2}$ であり、明示された種数0 $\psi$ 交点数公式によって積分は1。[次数0の $J$ 命題](#prop-mir2-09-degree-zero-j)の導出に従い

$$
J_X(bH,0,w)=w\exp(bH/w).
$$

quinticは複素次元3なので $H^4=0$。指数級数はここで切れ、

$$
J_X(bH,0,w)=w+bH+\frac{b^2H^2}{2w}
+\frac{b^3H^3}{6w^2}.
$$

(2) $b=0$ では追加標点数 $n=0$ だけが生き、正次数は $M_{1,d}$ 上の積分である。仮想複素次元は1で、$\psi^a$ の押し出し類は標的上で複素余次元 $3-(1-a)=2+a$ に属する。$a=0$ は $H^2$、$a=1$ は $H^3$、$a\ge2$ は零である。従って各次数の形は

$$
[Q^d]J_X(0,Q,w)
=\frac{c_dH^2}{w}+\frac{e_dH^3}{w^2}
$$

である。$H$ とペアリングした $a=0$ の押し出しは[因子公理](../MIR2-03/index.md#thm-mir2-03-divisor)により $dN_d^X$、$\int_XH^3=5$ だから $c_d=dN_d^X/5$。$e_d$ は一標点の $\psi$ 挿入に依存し、ここで使った因子公理だけからは数値を決めない。

(3) (1) は**定数写像**の普遍的な部分、(2) は**未知のGW数を係数にした形の制約**しか与えていない。B側の超幾何級数、鏡像座標への変換、仮想類によるGW理論との比較という定理の入力がまだない。従って $J=I$ や $N_d^X$ の具体値、曲線の整数本数をこの計算から断言できない。
<!-- solution-end -->

## 8. 到達点と次講への橋

ここまでで、(i) $\psi$ を標点の余接線束から構成し、(ii) 四標点の非自明な値を吹上げで確かめ、(iii) $\psi^a$ を $w^{-a-1}$ に格納して、(iv) quinticの $J$ 係数から $dN_d^X/5$ を取り出せた。

残る問いは、**この未知のGW係数をどう計算するか**である。次講MIR2-10ではquinticの次数5を組み込んだ超幾何 $I$ 関数を作り、周期との対応を検算する。ただし $I$ を書いた時点で $J$ との同一性が証明されるわけではない。その橋は後のquinticミラー定理にある。

参考：D. Cox／S. Katz, *Mirror Symmetry and Algebraic Geometry*, 第10–11章；K. Horiほか, *Mirror Symmetry*（Clay Mathematics Monographs）, GW descendantおよびミラー定理の章。