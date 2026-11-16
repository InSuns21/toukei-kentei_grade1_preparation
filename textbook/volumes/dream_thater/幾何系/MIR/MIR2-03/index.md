# MIR2-03 因子公理と三点関数

<!-- definition-example-audit: strict -->

## 1. 曲線を「数える値」に、超平面条件を三つ付けたらどうなるか

前講では、滑らかな五次超曲面 $X\subset\mathbb P^4_{\mathbb C}$ の種数0の[一次Gromov–Witten不変量](../MIR2-02/index.md#def-mir2-02-virtual-gw)を、自然な**仮想基本類**に評価類を積分して定義した。特に[仮想複素次元](../MIR2-02/index.md#prop-mir2-02-virtual-dimension)は標点数 $k$ に等しい。無標点なら期待次元は0である。

一方、[超平面次数](../MIR2-01/index.md#def-mir2-01-curve-degree) $d$ は一つの写像 $f:C\to X$ に対して $\int_Cf^*H$ で測った。ここで $H=c_1(\mathcal O_X(1))\in H^2(X;\mathbb Z)$ であり、[三重交叉数](../MIR2-02/index.md#prop-mir2-02-degree-zero-three-point)は $\int_XH^3=5$ だった。

新しく一つの標点を付け、その標点の像へ超平面条件を課すと、何倍の数になるだろうか。超平面条件が写像の曲線を $d$ 回（重複度込みで）切ることから、直感的には **$d$ 倍** が現れる。ただし、quintic のモジュライは一般に滑らかではないため、この直感だけで仮想積分の公式を証明したことにはならない。

本講の目標は、仮想類の下で成り立つ因子公理を正しく使い、**三つの $H$ の挿入が $d^3$ を作る理由**を、次数0での例外まで含めて解き明かすことである。

本講を通じ、$X$ は滑らかな五次超曲面、係数は $\mathbb Q$、$d\ge0$ は超平面次数とする。$\overline{\mathcal M}_{0,k}(X,d)$ は安定な範囲（$d>0$ または $d=0,k\ge3$）でのみ用いる。以下の括弧 $\langle\alpha_1,\ldots,\alpha_k\rangle_{0,d}^{X}$ は、**異なる番号付き標点への一次挿入の列**であって、同じ標点でのカップ積ではない。

## 2. 仮想基本類で因子を忘れるための条件

因子とは、ここでは実コホモロジー次数2の類 $D\in H^2(X;\mathbb Q)$ である。$H$ はその具体例となる。滑らかな写像 $f:C\to X$ の上で新しい標点の位置を動かすと、評価類 $\operatorname{ev}_{k+1}^*D$ をファイバーに沿って積分した値は

$$
\int_C f^*D=\langle D,f_*[C]\rangle
$$

である。節点がある場合も各成分の値を足す。特に $\langle H,f_*[C]\rangle=d$ だから $H$ の挿入は $d$ 倍になりそうである。

[GW1-15の因子公理](../../GW/GW1-15/index.md#thm-gw1-15-divisor)では、**凸な射影標的**でこの計算を忘却射と射影公式で証明した。しかし quintic には凸性を仮定していない。[非凸標的に必要な仮想基本類](../MIR2-02/index.md#def-mir2-02-virtual-gw)を用いるため、次の一般的な仮想GW理論の性質を外部数学的入力として区別する。

**外部入力（仮想類と忘却射の整合性）**。滑らかな射影標的の種数0安定写像に、自然な完全障害理論から構成した仮想基本類を採用する。忘却前後が安定である場合、追加標点を忘れる固有射

$$
\pi:\overline{\mathcal M}_{0,k+1}(X,d)
\longrightarrow\overline{\mathcal M}_{0,k}(X,d)
$$

について、一次挿入の因子類 $D\in H^2(X;\mathbb Q)$ は仮想類上で次の押し出し恒等式を満たす。

$$
\pi_*\left(
\operatorname{ev}_{k+1}^*D\cap
[\overline{\mathcal M}_{0,k+1}(X,d)]^{\mathrm{vir}}
\right)
=
\int_{\beta}D\;
[\overline{\mathcal M}_{0,k}(X,d)]^{\mathrm{vir}}.
$$

ここで $\beta$ は超平面次数が $d$ の曲線類であり、$\int_\beta D$ はその交叉数を表す。この等式は、安定化で生じる泡成分や非横断な変形を含めた**大域的な仮想類の互換性**を必要とする。局所的なファイバー計算だけからは証明できず、仮想GW理論の因子公理という一般定理を用いる。その出力と適用範囲を明示し、以後の quintic 固有の導出は本文中で検算する。参考として [Kontsevich–Manin, Gromov–Witten classes, quantum cohomology, and enumerative geometry](https://arxiv.org/abs/hep-th/9402147) を挙げる。

この式では、左辺の仮想複素次元 $k+1$ から $D$ の複素余次元1を差し引くので、右辺と同じ複素次元 $k$ のサイクルになる。次元の一致は必要な整合性の検算であり、外部入力の証明の代わりではない。

<a id="thm-mir2-03-divisor"></a>

<!-- formal-statement-start -->
> **定理（quinticの種数0一次因子公理）**  
> $X\subset\mathbb P^4_{\mathbb C}$ を滑らかな五次超曲面とし、$H=c_1(\mathcal O_X(1))$、$d\ge0$、$D=aH\in H^2(X;\mathbb Q)$（$a\in\mathbb Q$）とする。$k\ge0$ 個の斉次挿入 $\alpha_i\in H^*(X;\mathbb Q)$ を考える。$d>0$、または $d=0$ かつ $k\ge3$ のとき、

$$
\langle\alpha_1,\ldots,\alpha_k,D\rangle_{0,d}^{X}
=ad\,
\langle\alpha_1,\ldots,\alpha_k\rangle_{0,d}^{X}.
$$

> ただし $d=0,k=2$ の三点不変量には、右辺の二点安定写像が存在せず、この公式を適用できない。
<!-- formal-statement-end -->

### 証明の見取り図

まず $D=aH$ だから、写像の曲線上での積分が $ad$ になることを確かめる。次に上記の仮想押し出し恒等式と射影公式を使う。次数0で二標点への忘却先がないことは、この操作の仮定の欠落であって、値が零であるという主張ではない。

<!-- proof-start -->
### 証明

曲線類を $\beta=f_*[C]$ とすると、[超平面次数の定義](../MIR2-01/index.md#def-mir2-01-curve-degree)によって $\int_\beta H=d$。従って

$$
\int_\beta D=\int_\beta aH
=a\int_\beta H=ad.
$$

$\Theta=\prod_{i=1}^{k}\operatorname{ev}_i^*\alpha_i$ を忘却先のモジュライの類とする。評価写像の[忘却との可換性](../../GW/GW1-11/index.md#prop-gw1-11-forget-evaluation)から、忘却前の最初の $k$ 挿入は $\pi^*\Theta$ となる。外部入力の仮想押し出し恒等式と射影公式を順に使うと

$$
\begin{aligned}
\langle\alpha_1,\ldots,\alpha_k,D\rangle_{0,d}^{X}
&=\int_{[\overline{\mathcal M}_{0,k+1}(X,d)]^{\mathrm{vir}}}
\pi^*\Theta\smile\operatorname{ev}_{k+1}^*D\\
&=\int_{\pi_*(\operatorname{ev}_{k+1}^*D
\cap[\overline{\mathcal M}_{0,k+1}(X,d)]^{\mathrm{vir}})}
\Theta\\
&=\int_{ad[\overline{\mathcal M}_{0,k}(X,d)]^{\mathrm{vir}}}\Theta\\
&=ad\,\langle\alpha_1,\ldots,\alpha_k\rangle_{0,d}^{X}.
\end{aligned}
$$

正次数では標点がなくても非定数安定写像があり、忘却前後とも安定である。次数0で $k\ge3$ なら忘却後も安定である。$d=0,k=2$ では忘却後が不安定となるため、式の右辺を定義できず、同じ証明を開始できない。
<!-- proof-end -->

**定義・条件の直接確認**。$d=2$ の非定数写像なら $\int_C f^*H=2$ なので、一つの $H$ の挿入は二倍になる。ただし仮想不変量そのものが非零だとは言っていない。$D=3H/2$ を代入すれば係数は $(3/2)\cdot2=3$。一方、$H^2\in H^4(X)$ は実次数4であり、**因子類ではない**。忘却射の相対複素次元が1である以上、そのファイバー積分は一般に次数2の類を残し、単なる数 $d$ を返す公式は使えない。

## 3. 無標点の数を三点相関へ戻す

前講の[仮想次元の命題](../MIR2-02/index.md#prop-mir2-02-virtual-dimension)によれば、$d>0,k=0$ の仮想複素次元は0だった。その仮想零サイクルを積分した数を各次数の基本的な係数にする。

<a id="def-mir2-03-unmarked-number"></a>

<!-- formal-statement-start -->
> **定義（quinticの無標点種数0GW数）**  
> 滑らかな五次超曲面 $X\subset\mathbb P^4_{\mathbb C}$ と整数 $d\ge1$ に対し、次数 $d$ の種数0無標点GW数を

$$
N_d^X:=
\langle\,\rangle_{0,d}^{X}
=\int_{[\overline{\mathcal M}_{0,0}(X,d)]^{\mathrm{vir}}}1
\in\mathbb Q
$$

> と定める。この定義では $N_0^X$ を導入しない。
<!-- formal-statement-end -->

ここで空の挿入積 $1$ はモジュライの単位類である。正次数で標点数0が安定であることは[安定性の確認](../MIR2-02/index.md#prop-mir2-02-virtual-dimension)と整合する。**定義の直接確認**として、次数 $d=1$ では $\overline{\mathcal M}_{0,0}(X,1)$ の仮想複素次元が0だから、無挿入の実次数0と一致する。従って $N_1^X$ は定義できるが、現段階でその値を直線の本数と等置しない。

一つの $H$ を追加した場合は、[quinticの因子公理](#thm-mir2-03-divisor)を $k=0$ に適用して $\langle H\rangle_{0,d}^{X}=dN_d^X$。二つの場合は $k=1$ に適用し、さらに一つの場合へ還元する。

<a id="prop-mir2-03-repeated-divisors"></a>

<!-- formal-statement-start -->
> **命題（正次数の反復因子挿入）**  
> $X\subset\mathbb P^4_{\mathbb C}$ を滑らかな五次超曲面、$H=c_1(\mathcal O_X(1))$ とする。$d\ge1$、$r\ge0$ を整数とすると、異なる $r$ 個の標点への $H$ 挿入について

$$
\langle\underbrace{H,\ldots,H}_{r\text{ 個}}\rangle_{0,d}^{X}
=d^rN_d^X.
$$

> 特に $r=3$ では $\langle H,H,H\rangle_{0,d}^{X}=d^3N_d^X$ である。
<!-- formal-statement-end -->

### 証明の見取り図

最後の一つの因子を忘れるたびに次数 $d$ を一つ掛ける。正次数なので、標点が0個まで減っても安定性は失われない。

<!-- proof-start -->
### 証明

$r=0$ は[無標点GW数の定義](#def-mir2-03-unmarked-number)である。$r\ge1$ とし、[quinticの因子公理](#thm-mir2-03-divisor)を $k=r-1$、$\alpha_1=\cdots=\alpha_k=H$、$D=H$、$a=1$ として適用すると

$$
\langle H^{[r]}\rangle_{0,d}^{X}
=d\,\langle H^{[r-1]}\rangle_{0,d}^{X}.
$$

ここで $H^{[r]}$ は $r$ 個の**別々の標点**に $H$ を挿入する略記であり、カップ冪 $H^r$ ではない。$d>0$ であるため毎回忘却後も安定。これを $r$ 回反復すれば

$$
\langle H^{[r]}\rangle_{0,d}^{X}
=d^r\langle\,\rangle_{0,d}^{X}
=d^rN_d^X.
$$

$r=3$ の場合を一段ずつ書くと

$$
\langle H,H,H\rangle_{0,d}^{X}
=d\langle H,H\rangle_{0,d}^{X}
=d^2\langle H\rangle_{0,d}^{X}
=d^3N_d^X
$$

となる。
<!-- proof-end -->

**具体例**。$d=2$ なら無標点の数を $N_2^X$ とおいて、挿入を0、1、2、3個と増やした値は順に

$$
N_2^X,\quad 2N_2^X,\quad 4N_2^X,\quad 8N_2^X.
$$

右辺はすべて仮想GW数であり、像の曲線が8本に増えたという解釈ではない。

## 4. 次数0の三点は、なぜ $0^3N_0$ と書けないか

$d=0$ の定数写像は、標点が三つあれば安定する。この場合、[次数0三点公式](../MIR2-02/index.md#prop-mir2-02-degree-zero-three-point)から

$$
\langle H,H,H\rangle_{0,0}^{X}
=\int_XH^3=5.
$$

しかし $d=0$ の無標点モジュライは存在しない。従って、無標点の $N_0^X$ を勝手に作って $0^3N_0^X=0$ とするのは誤りである。三点のうち一つを忘れる射の行き先は定数二標点の不安定な対象だから、因子公理の仮定が壊れている。

<a id="prop-mir2-03-zero-vs-positive"></a>

<!-- formal-statement-start -->
> **命題（quinticの三つの超平面挿入と次数0例外）**  
> $X\subset\mathbb P^4_{\mathbb C}$ を滑らかな五次超曲面、$H=c_1(\mathcal O_X(1))$ とする。種数0の三点一次GW不変量は

$$
\langle H,H,H\rangle_{0,d}^{X}
=
\begin{cases}
5,&d=0,\\
d^3N_d^X,&d\ge1.
\end{cases}
$$

> ここで $N_d^X$ は $d\ge1$ の場合に限って定義する。
<!-- formal-statement-end -->

### 証明の見取り図

次数0は定数三標点の交叉積分へ戻る。正次数は反復因子公理で無標点の仮想数へ戻る。二つの議論の共通部分は三点不変量が定義できることだが、**無標点へ戻れる安定性**には決定的な差がある。

<!-- proof-start -->
### 証明

$d=0$ なら[次数0の三点GW公式](../MIR2-02/index.md#prop-mir2-02-degree-zero-three-point)を $\alpha=\beta=\gamma=H$ に適用し、五次超曲面の超平面三重交叉数 $\int_XH^3=5$ を得る。$d\ge1$ の場合は[反復因子挿入の命題](#prop-mir2-03-repeated-divisors)に $r=3$ を代入して $d^3N_d^X$ を得る。安定範囲は両者で別々に確認したため、不安定な無標点次数0へ定義を延長していない。
<!-- proof-end -->

**安定な次数0での因子公理の確認**。三標点の定数写像から四標点へ $H$ を加える操作は、忘却先に三標点があるので安定。したがって[quinticの因子公理](#thm-mir2-03-divisor)は

$$
\langle H,H,H,H\rangle_{0,0}^{X}
=0\cdot\langle H,H,H\rangle_{0,0}^{X}=0
$$

を与える。別の確認では、次数0・四標点モジュライは $X\times\overline{\mathcal M}_{0,4}$ で、評価類の積は $H^4=0$（$\dim_{\mathbb C}X=3$）の引き戻しだから零である。この四点値は**仮想次元だけでは零と判定できない**。四つの $H$ の複素余次元和も、四標点の仮想複素次元も4で一致している。

## 5. 三点関数を形式級数としてまとめる

各次数の三点相関を一つの式に組み立てれば、後続のA側の理論とB側の周期計算を比較する準備になる。[次数を記録する形式変数](../MIR2-01/index.md#def-mir2-01-degree-series)と同様に、$Q$ は最初から収束を仮定した複素数ではなく、係数を整理する形式変数とする。

<a id="def-mir2-03-three-point-series"></a>

<!-- formal-statement-start -->
> **定義（超平面三点関数）**  
> $X\subset\mathbb P^4_{\mathbb C}$ を滑らかな五次超曲面、$H=c_1(\mathcal O_X(1))$ とする。$Q$ を次数の形式変数とし、種数0の超平面三点関数を

$$
C_{HHH}^{X}(Q)
:=
\sum_{d\ge0}
\langle H,H,H\rangle_{0,d}^{X}Q^d
\quad\in\mathbb Q[[Q]]
$$

> と定める。定数項は三点の次数0交叉積分であり、無標点の $N_0^X$ ではない。
<!-- formal-statement-end -->

この定義は $Q$ の各冪に一つずつGW数を置くので、各係数が有理数なら形式冪級数として意味を持つ。無標点の定義が $d=0$ で欠けても、三点相関なら全 $d\ge0$ で安定である。

<a id="prop-mir2-03-series-coefficients"></a>

<!-- formal-statement-start -->
> **命題（三点関数の係数と形式微分）**  
> $X,H,Q$ を上記のとおりとし、$N_d^X$ を正整数 $d$ に対する無標点GW数とすると

$$
C_{HHH}^{X}(Q)=5+\sum_{d\ge1}d^3N_d^XQ^d.
$$

> 形式微分作用素 $\Theta_Q=Q\,\dfrac{d}{dQ}$ を用いると、正次数部分は次のようにも書ける。

$$
C_{HHH}^{X}(Q)-5
=\Theta_Q^3\left(\sum_{d\ge1}N_d^XQ^d\right).
$$
<!-- formal-statement-end -->

### 証明の見取り図

次数0を単独で取り出す。正次数の各係数を因子公理で $d^3N_d^X$ に置き換え、$\Theta_Q(Q^d)=dQ^d$ を三回適用する。ここに複素数としての $Q$ の収束は必要ない。

<!-- proof-start -->
### 証明

[次数0と正次数を分けた命題](#prop-mir2-03-zero-vs-positive)を[三点関数の定義](#def-mir2-03-three-point-series)へ代入すると

$$
\begin{aligned}
C_{HHH}^{X}(Q)
&=\langle H,H,H\rangle_{0,0}^{X}
+\sum_{d\ge1}\langle H,H,H\rangle_{0,d}^{X}Q^d\\
&=5+\sum_{d\ge1}d^3N_d^XQ^d.
\end{aligned}
$$

形式冪級数の微分は係数ごとに定める。$d\ge1$ の単項式に対して

$$
\Theta_Q(Q^d)=Q(dQ^{d-1})=dQ^d,\qquad
\Theta_Q^2(Q^d)=d^2Q^d,\qquad
\Theta_Q^3(Q^d)=d^3Q^d.
$$

任意の固定次数の係数計算は有限回なので、項別操作は $\mathbb Q[[Q]]$ 内で厳密に正当化される。最後に $5$ は三階の形式微分で消える定数項であり、正次数の無標点級数からは生成されない。
<!-- proof-end -->

**定義の直接確認**。$Q$ の三次までの係数を明記すると

$$
C_{HHH}^{X}(Q)
=5+N_1^XQ+8N_2^XQ^2+27N_3^XQ^3+\cdots.
$$

$N_2^X$ が未知でも $Q^2$ の係数が $8N_2^X$ であることまでは、ミラー定理や実際の曲線本数を使わずに確定できる。これは[Novikov形式変数と数値指数の区別](../MIR2-01/index.md#def-mir2-01-degree-series)とも両立する。

## 6. 挿入次数・単位挿入・曲線の本数を混ぜない

[quinticの挿入次数必要条件](../MIR2-02/index.md#prop-mir2-02-insertion-degree)は、三標点の場合、挿入の実コホモロジー次数の和が6であることを要求する。したがって $H$ は実次数2なので $(H,H,H)$ は条件に合うが、例えば $(H^2,H,H)$ は実次数 $4+2+2=8$ で不変量が零になる。これは因子公理の適用以前に決まる。

他方 $(1,H,H^2)$ は実次数 $0+2+4=6$ で次数条件に合う。**しかし正次数では値が零**である。一次挿入の単位類を忘れると、[GW1-15の基本類公理](../../GW/GW1-15/index.md#thm-gw1-15-fundamental-class)で凸標的に示されたとおり、単位類の相対ファイバー積分は実次数を2下げて $H^{-2}=0$ になる。非凸quinticではこれも、前節と同様の**自然な仮想基本類との整合性**を持つ一般の一次GW公理を用いる。$d>0$ なら二標点への忘却先は安定である。反対に $d=0$ の三点値は[次数0交叉公式](../MIR2-02/index.md#prop-mir2-02-degree-zero-three-point)から $\int_XH^3=5$ となるため、正次数の単位類消滅を流用してはならない。

<a id="prop-mir2-03-ambient-selection"></a>

<!-- formal-statement-start -->
> **命題（三点ambient挿入の正次数選択則）**  
> $X\subset\mathbb P^4_{\mathbb C}$ を滑らかな五次超曲面とする。$H=c_1(\mathcal O_X(1))$ とし、$d\ge1$、$a,b,c\in\{0,1,2,3\}$ を整数とする。種数0の三点不変量

$$
\langle H^a,H^b,H^c\rangle_{0,d}^{X}
$$

> が零でない可能性があるのは $(a,b,c)=(1,1,1)$ に限る。この場合の値は $d^3N_d^X$ であり、実際に非零かどうかはこの選択則だけからは決まらない。
<!-- formal-statement-end -->

### 証明の見取り図

[挿入次数必要条件](../MIR2-02/index.md#prop-mir2-02-insertion-degree)で $a+b+c=3$ に絞る。もしどれかが0なら単位類挿入を含み、正次数の基本類公理で消える。三つとも正なら和3を作る組は $(1,1,1)$ だけである。

<!-- proof-start -->
### 証明

$H^j$ は実次数 $2j$ であり、$j=0,1,2,3$ の範囲を考えている。[仮想複素次元の公式](../MIR2-02/index.md#prop-mir2-02-virtual-dimension)は $k=3$ で3。非零なら

$$
2a+2b+2c=2\cdot3,\qquad a+b+c=3.
$$

いずれかの指数が0なら、その挿入は $H^0=1$ である。$d>0$ では忘却前後が安定であるため、上で説明した**仮想版の基本類公理**により相関は零となる。残りは $a,b,c\ge1$ で和が3の組なので、各指数が1でなければならない。$(1,1,1)$ の値は[反復因子挿入](#prop-mir2-03-repeated-divisors)によって $d^3N_d^X$ となる。必要条件のみでは $N_d^X$ の値は決まらない。
<!-- proof-end -->

**同じ記号の二つの意味に注意**。$\langle H,H,H\rangle_{0,d}^{X}$ の三つの $H$ は別々の標点にある。一方、$H^3$ は $X$ 上のカップ冪であって、三点相関とは定義が違う。次数0の三点相関が $\int_XH^3$ に等しくなるのは定数写像の評価がすべて同じ点へ落ちるという[次数0公式](../MIR2-02/index.md#prop-mir2-02-degree-zero-three-point)の結論である。

**数え上げの限界**。$N_d^X$ は一般に有理数の仮想積分であり、多重被覆、自己同型重み、障害による寄与を含み得る。例えば像が直線でも次数2の被覆なら $d=2$ となることは[二重被覆の例](../MIR2-02/index.md#prop-mir2-02-double-cover)で確かめた。従って $d^3N_d^X$ を「次数 $d$ の異なる曲線が $d^3N_d^X$ 本」と読み替えてはならない。B側Yukawa結合との規格化した照合や、整数型数値への多重被覆整理は後続で扱う。

## 7. 演習：因子を付ける順序と例外を自分で判定する

以下はすべて滑らかな五次超曲面 $X\subset\mathbb P^4_{\mathbb C}$ と $H=c_1(\mathcal O_X(1))$ の、**種数0一次GW不変量**である。$N_d^X=\langle\,\rangle_{0,d}^{X}$ は $d\ge1$ にのみ用いる。

### Level A：定義を条件付きで使う

<a id="ex-mir2-03-a01"></a>
#### MIR2-03-A01 次数2で標点を増やす
- Level: A

$d=2$ に対し、$\langle H\rangle_{0,2}^{X}$、$\langle H,H\rangle_{0,2}^{X}$、$\langle H,H,H\rangle_{0,2}^{X}$ を $N_2^X$ で表せ。どの段階でも因子公理が使える理由を述べよ。

<!-- solution-start -->
**詳細解答**。$d=2>0$ なので、標点を一つ忘れて $k=2,1,0$ としても、残りの写像は正次数の安定写像である。[因子公理](#thm-mir2-03-divisor)に $D=H,a=1,d=2$ を代入すると

$$
\langle H\rangle_{0,2}^{X}=2\langle\,\rangle_{0,2}^{X}=2N_2^X.
$$

同じ公理を二標点、三標点に順に使うと

$$
\langle H,H\rangle_{0,2}^{X}=2(2N_2^X)=4N_2^X,\quad
\langle H,H,H\rangle_{0,2}^{X}=2(4N_2^X)=8N_2^X.
$$

いずれも仮想数であり、$N_2^X$ の値や曲線像の本数はこの計算からは得られない。
<!-- solution-end -->

<a id="ex-mir2-03-a02"></a>
#### MIR2-03-A02 次数0で三標点だけが残る
- Level: A

$d=0$ の $\langle H,H,H\rangle_{0,0}^{X}$ と $\langle H,H,H,H\rangle_{0,0}^{X}$ を計算せよ。前者に因子公理を適用できない理由を標点数で説明せよ。

<!-- solution-start -->
**詳細解答**。[次数0の三点公式](../MIR2-02/index.md#prop-mir2-02-degree-zero-three-point)から

$$
\langle H,H,H\rangle_{0,0}^{X}=\int_XH^3=5.
$$

この三点値のうち一つを忘れると、次数0・二標点となり安定写像が存在しないので[因子公理](#thm-mir2-03-divisor)を使えない。四点値では一つを忘れても三標点で安定だから、同じ公理の係数 $d=0$ により $0\cdot5=0$。四点値は $H^4=0$ の直接積分でも零と検算できる。
<!-- solution-end -->

<a id="ex-mir2-03-a03"></a>
#### MIR2-03-A03 因子類かどうかを判定する
- Level: A

$d=3$ の安定写像で、$D=\frac23H$ と $E=H^2$ のどちらを因子公理の追加挿入に使えるか判定せよ。使える場合の係数を求めよ。

<!-- solution-start -->
**詳細解答**。$D\in H^2(X;\mathbb Q)$ は実次数2の因子類であり、[因子公理](#thm-mir2-03-divisor)の係数は $\int_\beta D=(2/3)\int_\beta H=(2/3)\cdot3=2$。$E\in H^4(X;\mathbb Q)$ は実次数4であり、因子公理の仮定 $D\in H^2$ を満たさない。$E$ のファイバー積分は一般に実次数2の類となるため、同じ整数次数の係数を付ける操作は認められない。
<!-- solution-end -->

<a id="ex-mir2-03-a04"></a>
#### MIR2-03-A04 三点関数の初項
- Level: A

$C_{HHH}^{X}(Q)$ の $Q^0,Q^1,Q^2,Q^3$ の係数を求めよ。$N_0^X$ を使ってはならない。

<!-- solution-start -->
**詳細解答**。[三点関数の係数公式](#prop-mir2-03-series-coefficients)から定数項は三点交叉積分の5である。正次数 $d=1,2,3$ の係数はそれぞれ $d^3N_d^X$ だから

$$
[Q^0]C_{HHH}^{X}=5,\quad
[Q^1]C_{HHH}^{X}=N_1^X,\quad
[Q^2]C_{HHH}^{X}=8N_2^X,\quad
[Q^3]C_{HHH}^{X}=27N_3^X.
$$

$d=0$ の無標点数は安定性のため存在せず、$N_0^X$ という定義は用いない。
<!-- solution-end -->

<a id="ex-mir2-03-a05"></a>
#### MIR2-03-A05 挿入次数と因子公理の違い
- Level: A

$d=2$、三標点について $(H,H,H)$ と $(H^2,H,H)$ の複素余次元和を求め、非零の可能性を判定せよ。後者に三度の因子公理を使えない理由も述べよ。

<!-- solution-start -->
**詳細解答**。[仮想次元](../MIR2-02/index.md#prop-mir2-02-virtual-dimension)は $k=3$。前者は各 $H$ の複素余次元1を足し $1+1+1=3$ で必要次数に一致し、値は[反復因子挿入](#prop-mir2-03-repeated-divisors)から $2^3N_2^X$。後者は $H^2$ が複素余次元2なので $2+1+1=4$、必要次数3を超え、[挿入次数必要条件](../MIR2-02/index.md#prop-mir2-02-insertion-degree)によって零。$H^2$ は実次数4で因子ではないため、これを一つの因子と見なして三度公理を使うこともできない。
<!-- solution-end -->

### Level B：仮定・形式級数・消滅を組み合わせる

<a id="ex-mir2-03-b01"></a>
#### MIR2-03-B01 異なる有理係数の因子
- Level: B

$d\ge1$、$a,b,c\in\mathbb Q$ とする。$\langle aH,bH,cH\rangle_{0,d}^{X}$ を求めよ。$d=0$ の値も別に求め、単一の式 $abc\,d^3N_d^X$ へまとめられない理由を述べよ。

<!-- solution-start -->
**詳細解答**。一次GW不変量は各挿入に関して多重線形である。正次数なら $D=cH$ の[因子公理](#thm-mir2-03-divisor)から係数 $cd$、次に $bH$ から $bd$、最後に $aH$ から $ad$ を得る。従って

$$
\langle aH,bH,cH\rangle_{0,d}^{X}
=(ad)(bd)(cd)N_d^X=abc\,d^3N_d^X.
$$

次数0では[三点交叉積分](../MIR2-02/index.md#prop-mir2-02-degree-zero-three-point)が適用され

$$
\langle aH,bH,cH\rangle_{0,0}^{X}
=\int_X(aH)(bH)(cH)=5abc.
$$

次数0から無標点へ一つずつ因子を忘れる途中で二標点以下が不安定になるため、正次数の式をそのまま $d=0$ に代入することはできない。
<!-- solution-end -->

<a id="ex-mir2-03-b02"></a>
#### MIR2-03-B02 次数条件だけでは残る単位挿入
- Level: B

$d\ge1$ の三点相関 $\langle1,H,H^2\rangle_{0,d}^{X}$ と $\langle H,H,H\rangle_{0,d}^{X}$ を比較せよ。どちらも複素余次元和が3であることを示し、前者だけが公理で消える理由を述べよ。

<!-- solution-start -->
**詳細解答**。前者の複素余次元和は $0+1+2=3$、後者は $1+1+1=3$ で、[挿入次数の必要条件](../MIR2-02/index.md#prop-mir2-02-insertion-degree)だけではいずれも排除されない。前者は単位類 $1$ を挿入しているので、正次数では単位類を忘れる先も安定。本文第6節で述べた**仮想版の基本類公理**により値は0となる。後者は単位類を含まないので[反復因子挿入](#prop-mir2-03-repeated-divisors)により $d^3N_d^X$。この値が非零であるとまでは結論できない。さらに次数0では前者が $\int_X1\smile H\smile H^2=5$ であり、正次数の単位公理は適用できない。
<!-- solution-end -->

<a id="ex-mir2-03-b03"></a>
#### MIR2-03-B03 形式微分と次数のずれ
- Level: B

$F(Q)=2Q+3Q^2-4Q^3+O(Q^4)\in\mathbb Q[[Q]]$ を、ある正次数無標点GW級数の先頭項とみなす。$\Theta_Q^3F$ を三次まで計算せよ。また $\Theta_Q^3(QF)$ が同じ結果にならない理由を示せ。

<!-- solution-start -->
**詳細解答**。形式微分演算子 $\Theta_Q=Qd/dQ$ は $\Theta_Q(Q^d)=dQ^d$ を満たす。従って各次数で三回作用すると

$$
\Theta_Q^3F
=1^3\cdot2Q+2^3\cdot3Q^2+3^3\cdot(-4)Q^3+O(Q^4)
=2Q+24Q^2-108Q^3+O(Q^4).
$$

一方 $QF=2Q^2+3Q^3-4Q^4+O(Q^5)$ なので

$$
\Theta_Q^3(QF)
=2^3\cdot2Q^2+3^3\cdot3Q^3+O(Q^4)
=16Q^2+81Q^3+O(Q^4).
$$

$Q$ を掛ける操作は曲線次数のラベル自体を一つ増やす。$\Theta_Q$ の係数が付く次数も変わるため、単純に $\Theta_Q^3$ と交換してよい演算ではない。この計算は形式冪級数で完結し、収束仮定を要しない。
<!-- solution-end -->

<a id="ex-mir2-03-b04"></a>
#### MIR2-03-B04 次数0・四点の零には二つの説明がある
- Level: B

$\langle H,H,H,H\rangle_{0,0}^{X}=0$ を (i) 安定性と因子公理、(ii) 定数写像の積表示から別々に示せ。挿入次数の一致だけでは零にならない理由を述べよ。

<!-- solution-start -->
**詳細解答**。(i) $d=0,k=4$ の最後の $H$ を忘れると $d=0,k=3$ で安定なので、[因子公理](#thm-mir2-03-divisor)から $\langle H,H,H,H\rangle_{0,0}^{X}=0\cdot\langle H,H,H\rangle_{0,0}^{X}=0$。

(ii) [定数写像の三点公式の証明](../MIR2-02/index.md#prop-mir2-02-degree-zero-three-point)で使った積表示を $k=4$ にすると、モジュライは $X\times\overline{\mathcal M}_{0,4}$。評価類の積は第一因子からの $H^4$ の引き戻しだが、$X$ は複素次元3なので $H^4=0$。よって積分は0。

三点でなく四点なら仮想複素次元は4、四つの $H$ の複素余次元和も4である。この一致だけでは零を示せず、(i) または (ii) の構造が必要である。
<!-- solution-end -->

### Level C：三点関数を出発点から再構成する

<a id="ex-mir2-03-c01"></a>
#### MIR2-03-C01 因子・安定性・係数の総合問題
- Level: C

$d>0$ の無標点数を $N_d^X$、形式変数を $Q$ とする。次のすべてを示せ。

1. 三つの $H$ の挿入で $d^3N_d^X$ が出ることを、因子公理の各適用で残る標点数を記して証明せよ。
2. $d=0$ の三点値が5であることを示し、$d=0$ の無標点数が使えない理由を述べよ。
3. $C_{HHH}^{X}(Q)$ の三次までを $N_1^X,N_2^X,N_3^X$ で書き、形式微分 $\Theta_Q^3$ で正次数の係数を再現せよ。
4. $d=2$ の相関 $(H,H,H)$、$(H^2,H,H)$、$(1,H,H^2)$ を、次数条件・因子公理・単位類公理のうち必要なものを区別して判定せよ。$8N_2^X$ を曲線の本数だと断定できない理由も述べよ。

<!-- solution-start -->
**詳細解答**。

**(1) 正次数の因子の反復**。$d>0$ なら $k=3,2,1,0$ のいずれでも安定写像の対象が存在し得る。そこで[因子公理](#thm-mir2-03-divisor)を、最初に3標点から2標点、次に2から1、最後に1から0へ適用する。各回の係数は $\int_\beta H=d$ だから

$$
\langle H,H,H\rangle_{0,d}^{X}
=d\langle H,H\rangle_{0,d}^{X}
=d^2\langle H\rangle_{0,d}^{X}
=d^3\langle\,\rangle_{0,d}^{X}
=d^3N_d^X.
$$

**(2) 次数0**。[次数0三点公式](../MIR2-02/index.md#prop-mir2-02-degree-zero-three-point)で、三標点の定数写像モジュライは $X$、評価類は $H$ だから $\langle H,H,H\rangle_{0,0}^{X}=\int_XH^3=5$。次数0では定数写像の安定性に三標点が必要であり、無標点の $N_0^X$ は定義できない。この三点から二点を作る忘却射がないことが、因子公理の使用不能の機構である。

**(3) 係数と形式微分**。[三点関数の定義](#def-mir2-03-three-point-series)で $d=0$ を取り出し、(1)を各 $d>0$ に代入する。すると

$$
C_{HHH}^{X}(Q)
=5+N_1^XQ+8N_2^XQ^2+27N_3^XQ^3+O(Q^4).
$$

正次数の無標点級数を $F(Q)=N_1^XQ+N_2^XQ^2+N_3^XQ^3+O(Q^4)$ と置く。$\Theta_Q(Q^d)=dQ^d$ だから

$$
\Theta_Q^3F(Q)
=N_1^XQ+2^3N_2^XQ^2+3^3N_3^XQ^3+O(Q^4)
=C_{HHH}^{X}(Q)-5+O(Q^4).
$$

**(4) 三種類の判定**。$d=2,k=3$ の[仮想複素次元](../MIR2-02/index.md#prop-mir2-02-virtual-dimension)は3。$(H,H,H)$ の複素余次元和は3なので、(1)から $2^3N_2^X=8N_2^X$。$(H^2,H,H)$ は和 $2+1+1=4$ だから[挿入次数の必要条件](../MIR2-02/index.md#prop-mir2-02-insertion-degree)により零。$H^2$ を因子として扱うことはできない。$(1,H,H^2)$ は和 $0+1+2=3$ で次数条件は満たすが、正次数の忘却先は安定なので**仮想版の基本類公理**により零となる。

最後に $N_2^X$ は[仮想基本類によるGW数](#def-mir2-03-unmarked-number)であり、自己同型の有理重みや直線の二重被覆のような像次数と写像次数の差を含む。したがって $8N_2^X$ が異なる次数2曲線の本数とは言えない。
<!-- solution-end -->

ここまでで**証明したこと**は、仮想GWの因子・基本類公理を外部入力として適用した後の $d^3$ の反復、次数0の交叉数、三点級数の形式的係数計算である。**まだ証明していないこと**は、非凸標的の仮想類と忘却射の大域的整合性そのもの、$N_d^X$ の具体的な数値、A/B側の一致、多重被覆補正である。次講ではこの三点係数を小量子積へ組み込み、古典的なカップ積との違いを調べる。
