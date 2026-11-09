# CAT1-08 関手圏と水平・垂直合成

## 1. 関手を対象として扱えるか

前講の[自然変換](../CAT1-07/index.md#def-cat1-07-natural-transformation)は、二つの関手を比べるための「射」のように振る舞う。例えば $F,G,H:\mathcal C\to\mathcal D$ の間に $\alpha:F\Rightarrow G$ と $\beta:G\Rightarrow H$ があれば、各対象 $A$ で $F(A)\to G(A)\to H(A)$ と進める。しかし、成分を合成できるだけで「関手を対象とする圏」になったと言えるだろうか。

考えるべきことは三つある。

1. 自然変換全体を Hom **集合**として集められるか。
2. 成分ごとの合成は再び自然変換になるか。また結合則と単位律を満たすか。
3. 関手の合成と自然変換の合成を同時に行うと、順序に依存しないか。

最初の二つで関手を対象とする新しい圏を作り、三つ目で異なる方向の合成を組み合わせる。本講で扱う関手はすべて**共変関手**とする。

前提となる[小さい圏・局所小圏の定義](../CAT1-02/index.md#def-cat1-02-size)を思い出そう。$\mathcal C$ が小さいとは対象と射がそれぞれ集合をなすこと、$\mathcal D$ が局所小とは各 $\operatorname{Hom}_{\mathcal D}(X,Y)$ が集合であることを意味する。大きな $\mathbf{Set}$ も局所小であり、必ずしも小さくない。

小さい $\mathcal C$ と局所小な $\mathcal D$ を固定する。関手を対象、自然変換を射にする圏の候補を作ろう。この段階で合成・単位が公理を満たすかは、後で実際に証明する。

<a id="def-cat1-08-functor-category"></a>

<!-- formal-statement-start -->
> **定義（関手圏）**  
> 小さい圏 $\mathcal C$ と局所小圏 $\mathcal D$ に対し、**関手圏** $[\mathcal C,\mathcal D]$ は次をデータとして持つ圏とする。
>
> 1. 対象はすべての共変関手 $F:\mathcal C\to\mathcal D$ である。
> 2. $F,G$ の間の射集合は、$F$ から $G$ への自然変換の集合 $\operatorname{Nat}(F,G)$ である。
> 3. 恒等射は各成分が恒等射である自然変換 $1_F$、射の合成は成分ごとの合成とする。
>
> このデータが集合性と圏公理を満たすことは以下で確認する。
<!-- formal-statement-end -->

ここで $[\mathcal C,\mathcal D]$ の「射」は $\mathcal C$ や $\mathcal D$ の射そのものではなく、自然変換という**成分の集まり**である。

<!-- definition-example-start: def-cat1-08-functor-category -->
**定義の確認**（矢印からなる図式）。対象 $0,1$ と恒等射、一本の射 $u:0\to1$ だけを持つ小さい圏 $\mathcal A$ を取る。関手 $F:\mathcal A\to\mathbf{Set}$ を指定するには、二集合 $X=F(0),Y=F(1)$ と一写像 $f=F(u):X\to Y$ を選べばよい。恒等射の像は恒等写像に強制され、$u$ と恒等射以外の合成がないため[関手の公理](../CAT1-06/index.md#def-cat1-06-functor)も満たす。

別の $G$ が $g:X'\to Y'$ に対応するとき、自然変換 $\alpha:F\Rightarrow G$ の成分は $a:X\to X'$ と $b:Y\to Y'$ であり、$u$ に対する[自然性](../CAT1-07/index.md#def-cat1-07-natural-transformation)は

$$
g\circ a=b\circ f
$$

となる。したがって関手圏の射は、二本の縦向きの写像 $a,b$ が作る**可換四角形**に一致する。各成分が確かに関手の値の間の写像であることと、四角形の等式を満たすことの両方を検査した。
<!-- definition-example-end -->

### 1.1 自然変換の集合性はどこから来るか

小さい圏という仮定は単なる呼び名ではない。対象が集合になれば、その各対象に一成分を選ぶ操作を集合として記述できる。

<a id="prop-cat1-08-size"></a>

<!-- formal-statement-start -->
> **命題（関手圏の局所小性と小ささ）**  
> $\mathcal C$ を小さい圏、$\mathcal D$ を局所小圏とする。任意の共変関手 $F,G:\mathcal C\to\mathcal D$ に対し $\operatorname{Nat}(F,G)$ は集合であり、$[\mathcal C,\mathcal D]$ は局所小圏になる。さらに $\mathcal D$ も小さい圏なら、$[\mathcal C,\mathcal D]$ は小さい圏になる。
<!-- formal-statement-end -->

### 証明の見取り図

各成分が属する Hom 集合を、$\mathcal C$ の**集合個**の対象について直積にする。自然性を満たす族だけをそこから抜き出せば自然変換の集合になる。$\mathcal D$ も小さければ、対象写像と射写像の候補も集合として集まる。

<!-- proof-start -->
### 証明

$I=\operatorname{Ob}(\mathcal C)$ は集合であり、$\mathcal D$ の局所小性より各 $A\in I$ について $\operatorname{Hom}_{\mathcal D}(F(A),G(A))$ は集合である。従って成分候補の集合

$$
P=\prod_{A\in I}\operatorname{Hom}_{\mathcal D}(F(A),G(A))
$$

が作れる。この直積の要素 $\alpha=(\alpha_A)_{A\in I}$ のうち、各 $f:A\to B$ に対して

$$
G(f)\circ\alpha_A=\alpha_B\circ F(f)
$$

を満たすものだけを $P$ から分出する。$\mathcal C$ の射も集合をなすので全ての自然性等式を条件として課せられ、その部分集合がちょうど $\operatorname{Nat}(F,G)$ である。ゆえに Hom の局所小性が従う。

さらに $\mathcal D$ が小さければ、$\mathcal C$ の対象・射の集合から $\mathcal D$ の対象・射の集合への写像の候補全体は、それぞれ集合をなす。両者の組のうち始域・終域、恒等射、合成の保存を満たす組だけを取れば共変関手全体も集合である。すべての Hom が集合であり、対象の集合も存在するので、[小さい圏の定義](../CAT1-02/index.md#def-cat1-02-size)から関手圏は小さい。$\square$
<!-- proof-end -->

**大きさに関する注意**。$\mathcal A$ を上の矢印圏、$\mathcal D=\mathbf{Set}$ とすると、$[\mathcal A,\mathbf{Set}]$ は局所小だが小さくない。各集合 $X$ に恒等写像 $1_X:X\to X$ に対応する関手があり、集合全体は[真の類をなす](../CAT1-02/index.md#prop-cat1-02-set-size)。したがって対象全体を集合として集めることはできない。局所小性と小ささを混同してはいけない。

## 2. 自然変換を縦に続ける

関手 $F,G,H:\mathcal C\to\mathcal D$ と自然変換 $\alpha:F\Rightarrow G$, $\beta:G\Rightarrow H$ を考える。各対象 $A$ で $\alpha_A$ の終域と $\beta_A$ の始域はともに $G(A)$ なので、$\beta_A\circ\alpha_A$ が定義される。これを全対象で揃えて「縦に続ける」ことにする。

この成分ごとの操作には、$\mathcal C$ が小さいという仮定は要らない。[自然変換の定義](../CAT1-07/index.md#def-cat1-07-natural-transformation)と同じく、対象ごとに射を指定できればよい。ただし、そのような自然変換をすべて集めて **Hom 集合を持つ関手圏**を作るには、§1 のような集合性の保証が別途必要である。

<a id="def-cat1-08-vertical"></a>

<!-- formal-statement-start -->
> **定義（垂直合成）**  
> 圏 $\mathcal C,\mathcal D$ および共変関手 $F,G,H:\mathcal C\to\mathcal D$ を取る。自然変換 $\alpha:F\Rightarrow G$, $\beta:G\Rightarrow H$ の**垂直合成** $\beta\cdot\alpha:F\Rightarrow H$ は、各対象 $A\in\mathcal C$ で

$$
(\beta\cdot\alpha)_A:=\beta_A\circ\alpha_A
$$

> と定める。また関手 $F$ の恒等自然変換 $1_F:F\Rightarrow F$ は $(1_F)_A:=1_{F(A)}$ と定める。
<!-- formal-statement-end -->

ここで $\cdot$ の右側 $\alpha$ を**先に**行う。$\beta\cdot\alpha$ と $\alpha\cdot\beta$ は一般に両方定義できるわけではない。

<!-- definition-example-start: def-cat1-08-vertical -->
**定義の確認**（対角線と射影）。$I:\mathbf{Set}\to\mathbf{Set}$ を恒等関手、$D(X)=X\times X$ を二乗関手とする。前講の[対角自然変換の確認](../CAT1-07/index.md#def-cat1-07-natural-transformation)で構成した $\delta:I\Rightarrow D$ は $\delta_X(x)=(x,x)$ である。各 $X$ の第一射影 $\pi_X:X\times X\to X$ は $f:X\to Y$ に対して

$$
f\circ\pi_X(x,y)=f(x)=\pi_Y\circ D(f)(x,y)
$$

を満たすため $\pi:D\Rightarrow I$ も自然変換である。このとき

$$
(\pi\cdot\delta)_X(x)=\pi_X(x,x)=x,
\qquad
(\delta\cdot\pi)_X(x,y)=(x,x).
$$

前者は $1_I$ であり、後者は二元以上の集合では $1_D$ ではない。合成する順序と型の違いが実際に結果を変える。

$\mathbf{Set}$ は小さくないが、ここで行ったのは各集合 $X$ における二写像の合成であり、$\operatorname{Nat}(I,D)$ などの全体を集合とする操作ではない。したがって、上の垂直合成の定義を適用できる。
<!-- definition-example-end -->

<a id="prop-cat1-08-axioms"></a>

<!-- formal-statement-start -->
> **命題（関手圏の圏公理）**  
> 小さい圏 $\mathcal C$ と局所小圏 $\mathcal D$ について、上で定めた $1_F$ と垂直合成 $\cdot$ は自然変換であり、$[\mathcal C,\mathcal D]$ の任意の射について結合則・左右の単位律を満たす。従って $[\mathcal C,\mathcal D]$ は圏である。
<!-- formal-statement-end -->

### 証明の見取り図

成分ごとの合成が自然であることを四角形の等式二つから証明する。その後の結合則・単位律は $\mathcal D$ の対応する射の公理を、各成分へ一回ずつ適用する。

<!-- proof-start -->
### 証明

任意の $f:A\to B$ について、[自然性の等式](../CAT1-07/index.md#def-cat1-07-natural-transformation)をまず $\beta$、次に $\alpha$ に適用する。

$$
\begin{aligned}
H(f)\circ(\beta_A\circ\alpha_A)
&=(H(f)\circ\beta_A)\circ\alpha_A\\
&=(\beta_B\circ G(f))\circ\alpha_A\\
&=\beta_B\circ(G(f)\circ\alpha_A)\\
&=\beta_B\circ(\alpha_B\circ F(f))\\
&=(\beta_B\circ\alpha_B)\circ F(f).
\end{aligned}
$$

従って $\beta\cdot\alpha$ は自然変換である。$1_F$ については $\mathcal D$ の[射の左右単位律](../CAT1-01/index.md#def-cat1-01-category)から

$$
F(f)\circ1_{F(A)}=F(f)=1_{F(B)}\circ F(f)
$$

なので自然である。

さらに $\gamma:H\Rightarrow J$ を任意に取れば、$\mathcal D$ の射の結合則から各 $A$ で

$$
\begin{aligned}
((\gamma\cdot\beta)\cdot\alpha)_A
&=(\gamma_A\circ\beta_A)\circ\alpha_A\\
&=\gamma_A\circ(\beta_A\circ\alpha_A)
=(\gamma\cdot(\beta\cdot\alpha))_A.
\end{aligned}
$$

同じく左右の単位律は

$$
(1_G\cdot\alpha)_A=1_{G(A)}\circ\alpha_A=\alpha_A
=\alpha_A\circ1_{F(A)}=(\alpha\cdot1_F)_A.
$$

自然変換は成分で決まるので、これらの成分ごとの等式は自然変換としての等式である。Hom 集合の存在は[前命題](#prop-cat1-08-size)で確認済みであり、圏の全公理が揃った。$\square$
<!-- proof-end -->

## 3. 横につなぐ前に whiskering を作る

ここまでは、同じ $\mathcal C,\mathcal D$ の間の関手を縦に比較した。今度は $F,G:\mathcal C\to\mathcal D$ の外側へ別の関手 $H:\mathcal D\to\mathcal E$ を付けて、$HF,HG$ の間を比較したい。$HF$ は[関手の合成](../CAT1-06/index.md#prop-cat1-06-composition) $H\circ F$ の略記である。

$\alpha_A:F(A)\to G(A)$ を $H$ で送れば、$H(\alpha_A):HF(A)\to HG(A)$ を得る。一方、別の $K:\mathcal B\to\mathcal C$ を内側から合成すると、$\alpha_{K(B)}$ が $FK(B)\to GK(B)$ を与える。前者は射へ関手を作用させ、後者は成分の添字を移すという、異なる操作である。

<a id="def-cat1-08-whiskering"></a>

<!-- formal-statement-start -->
> **定義（whiskering）**  
> 圏 $\mathcal B,\mathcal C,\mathcal D,\mathcal E$、共変関手 $F,G:\mathcal C\to\mathcal D$、自然変換 $\alpha:F\Rightarrow G$ を取る。
>
> - 共変関手 $H:\mathcal D\to\mathcal E$ による**後合成側の whiskering** $H\alpha:HF\Rightarrow HG$ は $(H\alpha)_A:=H(\alpha_A)$ で与える。
> - 共変関手 $K:\mathcal B\to\mathcal C$ による**前合成側の whiskering** $\alpha K:FK\Rightarrow GK$ は $(\alpha K)_B:=\alpha_{K(B)}$ で与える。
>
> いずれも添字を持つ成分族であり、自然性は次の命題で確認する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat1-08-whiskering -->
**定義の確認**。$\delta:I\Rightarrow D$ を前節の対角自然変換、$P_S(X)=X\times S$, $P_S(f)(x,s)=(f(x),s)$ を固定集合 $S$ の直積関手とする（これは[前講の直積関手](../CAT1-07/index.md#prop-cat1-07-product-classification)である）。

後合成側は $P_S\delta:P_S\Rightarrow P_SD$ であり、各 $x\in X$, $s\in S$ に対し

$$
(P_S\delta)_X(x,s)=((x,x),s).
$$

前合成側は $\delta P_S:P_S\Rightarrow DP_S$ であり

$$
(\delta P_S)_X(x,s)=((x,s),(x,s)).
$$

二つの終域は $P_SD(X)=(X\times X)\times S$ と $DP_S(X)=(X\times S)\times(X\times S)$ で異なる。成分の値だけでなく始域・終域を確認すると、両操作を取り違えない。
<!-- definition-example-end -->

<a id="prop-cat1-08-whisker-natural"></a>

<!-- formal-statement-start -->
> **命題（whiskering の自然性）**  
> 圏 $\mathcal B,\mathcal C,\mathcal D,\mathcal E$、共変関手 $F,G:\mathcal C\to\mathcal D$, $H:\mathcal D\to\mathcal E$, $K:\mathcal B\to\mathcal C$ と自然変換 $\alpha:F\Rightarrow G$ に対し、上の成分族 $H\alpha:HF\Rightarrow HG$ と $\alpha K:FK\Rightarrow GK$ はいずれも自然変換である。
<!-- formal-statement-end -->

### 証明の見取り図

$H\alpha$ では元の自然性等式の両辺に $H$ を作用させる。$\alpha K$ では $\mathcal B$ の射を $K$ で送ってから元の自然性を使う。

<!-- proof-start -->
### 証明

$f:A\to B$ を $\mathcal C$ の任意の射とすると、[自然性](../CAT1-07/index.md#def-cat1-07-natural-transformation)より $G(f)\circ\alpha_A=\alpha_B\circ F(f)$ である。この両辺に[関手の合成保存](../CAT1-06/index.md#def-cat1-06-functor)を適用して

$$
\begin{aligned}
(HG)(f)\circ(H\alpha)_A
&=H(G(f))\circ H(\alpha_A)\\
&=H(G(f)\circ\alpha_A)\\
&=H(\alpha_B\circ F(f))\\
&=H(\alpha_B)\circ H(F(f))\\
&=(H\alpha)_B\circ(HF)(f).
\end{aligned}
$$

従って $H\alpha$ は自然である。次に $g:B\to B'$ を $\mathcal B$ の任意の射とすると、$K(g):K(B)\to K(B')$ に $\alpha$ の自然性を適用できる。ゆえに

$$
\begin{aligned}
(GK)(g)\circ(\alpha K)_B
&=G(K(g))\circ\alpha_{K(B)}\\
&=\alpha_{K(B')}\circ F(K(g))\\
&=(\alpha K)_{B'}\circ(FK)(g).
\end{aligned}
$$

これで二種類の whiskering がいずれも自然変換であることを示した。$\square$
<!-- proof-end -->

## 4. 水平合成：二通りの経路を一致させる

今度は関手と自然変換を二段に並べる。$F,G:\mathcal C\to\mathcal D$ と $H,K:\mathcal D\to\mathcal E$、$\alpha:F\Rightarrow G$, $\beta:H\Rightarrow K$ を固定する。合成関手 $HF$ から $KG$ へ進むには、各 $A\in\mathcal C$ において二通りの道がある。

1. $HF(A)\xrightarrow{H(\alpha_A)}HG(A)\xrightarrow{\beta_{G(A)}}KG(A)$。
2. $HF(A)\xrightarrow{\beta_{F(A)}}KF(A)\xrightarrow{K(\alpha_A)}KG(A)$。

これらが等しいのは、**$\beta$ の自然性を $\mathcal D$ の射 $\alpha_A:F(A)\to G(A)$ に適用した結果**である。この等式により、二通りの経路のどちらからも同じ成分を定義できる。

<a id="def-cat1-08-horizontal"></a>

<!-- formal-statement-start -->
> **定義（水平合成）**  
> 圏 $\mathcal C,\mathcal D,\mathcal E$、共変関手 $F,G:\mathcal C\to\mathcal D$, $H,K:\mathcal D\to\mathcal E$ と自然変換 $\alpha:F\Rightarrow G$, $\beta:H\Rightarrow K$ に対し、**水平合成** $\beta\ast\alpha:HF\Rightarrow KG$ は各 $A\in\mathcal C$ で次の成分を持つ。

$$
(\beta\ast\alpha)_A
:=\beta_{G(A)}\circ H(\alpha_A)
=K(\alpha_A)\circ\beta_{F(A)}.
$$

> 右辺の一致は $\beta$ の自然性による。これは whiskering を用いた垂直合成 $(\beta G)\cdot(H\alpha)=(K\alpha)\cdot(\beta F)$ と同じものである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat1-08-horizontal -->
**定義の確認**。$F=I$, $G=D$, $H=D$, $K=I$ とし、$\alpha=\delta:I\Rightarrow D$, $\beta=\pi:D\Rightarrow I$ を第2節から取る。$\pi\ast\delta:DI\Rightarrow ID$ は $D\Rightarrow D$ の自然変換である。$(x,y)\in X\times X$ に対して、第一経路は

$$
\begin{aligned}
\pi_{D(X)}\bigl(D(\delta_X)(x,y)\bigr)
&=\pi_{X\times X}((x,x),(y,y))=(x,x),
\end{aligned}
$$

第二経路は

$$
\delta_X\bigl(\pi_X(x,y)\bigr)=\delta_X(x)=(x,x).
$$

両者の型と値が一致する。これは垂直合成 $\pi\cdot\delta=1_I$ とは異なる操作であり、結果も $D$ 上の第一成分への射影に続く対角化である。
<!-- definition-example-end -->

<a id="prop-cat1-08-horizontal-laws"></a>

<!-- formal-statement-start -->
> **命題（水平合成の自然性と結合則）**  
> 圏 $\mathcal C,\mathcal D,\mathcal E$ と共変関手 $F,G:\mathcal C\to\mathcal D$, $H,K:\mathcal D\to\mathcal E$、自然変換 $\alpha:F\Rightarrow G$, $\beta:H\Rightarrow K$ に対して $\beta\ast\alpha:HF\Rightarrow KG$ は自然変換である。また $L,M:\mathcal E\to\mathcal B$ と自然変換 $\gamma:L\Rightarrow M$ があれば

$$
\gamma\ast(\beta\ast\alpha)
=(\gamma\ast\beta)\ast\alpha.
$$

> 任意の共変関手 $F:\mathcal C\to\mathcal D$, $H:\mathcal D\to\mathcal E$ について $1_H\ast1_F=1_{HF}$ も成立する。
<!-- formal-statement-end -->

### 証明の見取り図

自然性は、$G(f)$ を通る経路で $\beta$ の自然性を使い、次に $\alpha$ の自然性を使う。結合則は三段に並んだ関手の合成を成分で展開すると、同一の三つの射の合成になる。最後に恒等射保存を使う。

<!-- proof-start -->
### 証明

$f:A\to B$ を $\mathcal C$ の射とする。$\beta$ の自然性を射 $G(f):G(A)\to G(B)$ に適用し、$\alpha$ の自然性を $f$ に適用すると、

$$
\begin{aligned}
(KG)(f)\circ(\beta\ast\alpha)_A
&=K(G(f))\circ\beta_{G(A)}\circ H(\alpha_A)\\
&=\beta_{G(B)}\circ H(G(f))\circ H(\alpha_A)\\
&=\beta_{G(B)}\circ H(G(f)\circ\alpha_A)\\
&=\beta_{G(B)}\circ H(\alpha_B\circ F(f))\\
&=\beta_{G(B)}\circ H(\alpha_B)\circ H(F(f))\\
&=(\beta\ast\alpha)_B\circ(HF)(f).
\end{aligned}
$$

すべての射で自然性が成り立つ。なお二つの成分公式の等号は、先に述べた通り $\beta$ の自然性を $\alpha_A$ に適用して

$$
K(\alpha_A)\circ\beta_{F(A)}
=\beta_{G(A)}\circ H(\alpha_A)
$$

と得られる。

三段の水平合成については、左辺の成分を[水平合成の定義](#def-cat1-08-horizontal)で二回展開する。

$$
\begin{aligned}
(\gamma\ast(\beta\ast\alpha))_A
&=\gamma_{KG(A)}\circ L((\beta\ast\alpha)_A)\\
&=\gamma_{KG(A)}\circ L(\beta_{G(A)}\circ H(\alpha_A))\\
&=\gamma_{KG(A)}\circ L(\beta_{G(A)})\circ LH(\alpha_A)\\
&=(\gamma\ast\beta)_{G(A)}\circ(LH)(\alpha_A)\\
&=((\gamma\ast\beta)\ast\alpha)_A.
\end{aligned}
$$

最後に $1_F$ と $1_H$ の水平合成は、任意の $A$ で

$$
(1_H\ast1_F)_A
=(1_H)_{F(A)}\circ H(1_{F(A)})
=1_{HF(A)}\circ1_{HF(A)}=1_{HF(A)}.
$$

したがって自然変換として $1_H\ast1_F=1_{HF}$。$\square$
<!-- proof-end -->

## 5. 水平と垂直の順序を入れ替える

垂直合成は同じ二圏の間で関手を連続して変える操作、水平合成は隣り合う二つの関手の段をまたいで変える操作である。両方が混在すると、先に縦を合成してから横につなぐか、先に横を合成してから縦につなぐかという問いが出る。

この交換法則を確認しないまま「図式を貼れば可換」と考えると、$\beta$ の添字 $G(A)$ と $\beta_{F(A)}$ を取り違えやすい。以下では一つの成分 $A$ で、どこに自然性を適用するかをすべて書く。

<a id="prop-cat1-08-interchange"></a>

<!-- formal-statement-start -->
> **命題（水平合成と垂直合成の交換法則）**  
> 圏 $\mathcal C,\mathcal D,\mathcal E$、共変関手 $F,G,J:\mathcal C\to\mathcal D$ と $H,K,L:\mathcal D\to\mathcal E$、自然変換
>
> - $\alpha:F\Rightarrow G$ および $\alpha':G\Rightarrow J$、
> - $\beta:H\Rightarrow K$ および $\beta':K\Rightarrow L$
>
> を取る。このとき $HF$ から $LJ$ への自然変換として

$$
(\beta'\cdot\beta)\ast(\alpha'\cdot\alpha)
=(\beta'\ast\alpha')\cdot(\beta\ast\alpha)
$$

> が成り立つ。この等式は水平・垂直合成の順序が両立することを述べる。
<!-- formal-statement-end -->

### 証明の見取り図

左辺は「$\mathcal C$ 側で二本、$\mathcal D$ 側で二本を縦に合成してから横」、右辺は「一段ずつ横に合成してから縦」である。中央の二射 $\beta_{J(A)}$ と $H(\alpha'_A)$ の順を交換する部分だけが非自明で、そこに $\beta$ の自然性を使う。

<!-- proof-start -->
### 証明

任意の $A\in\mathcal C$ で、まず左辺を[垂直合成](#def-cat1-08-vertical)と[水平合成](#def-cat1-08-horizontal)の定義から展開する。

$$
\begin{aligned}
&((\beta'\cdot\beta)\ast(\alpha'\cdot\alpha))_A\\
&=(\beta'\cdot\beta)_{J(A)}\circ H((\alpha'\cdot\alpha)_A)\\
&=(\beta'_{J(A)}\circ\beta_{J(A)})
  \circ H(\alpha'_A\circ\alpha_A)\\
&=\beta'_{J(A)}\circ\beta_{J(A)}
  \circ H(\alpha'_A)\circ H(\alpha_A).
\end{aligned}
$$

$\alpha'_A:G(A)\to J(A)$ は $\mathcal D$ の射である。[自然変換 $\beta$ の自然性](../CAT1-07/index.md#def-cat1-07-natural-transformation)を**この射に**適用すると

$$
\beta_{J(A)}\circ H(\alpha'_A)
=K(\alpha'_A)\circ\beta_{G(A)}.
$$

これを中央二項に代入し、再び水平合成の定義を使うと

$$
\begin{aligned}
&\beta'_{J(A)}\circ K(\alpha'_A)
 \circ\beta_{G(A)}\circ H(\alpha_A)\\
&=(\beta'\ast\alpha')_A\circ(\beta\ast\alpha)_A\\
&=((\beta'\ast\alpha')\cdot(\beta\ast\alpha))_A.
\end{aligned}
$$

両辺はともに $HF(A)\to LJ(A)$ である。任意の $A$ で一致したので交換法則が成立する。$\square$
<!-- proof-end -->

### 5.1 直積関手で交換法則を見る

固定集合 $S,T,V,U,W,Z$ と写像 $h:S\to T$, $k:T\to V$, $w:U\to W$, $v:W\to Z$ を取る。$P_S(X)=X\times S$ と定義した直積関手について、[直積関手の自然変換の分類](../CAT1-07/index.md#prop-cat1-07-product-classification)により

$$
\alpha^h:P_S\Rightarrow P_T,
\quad\alpha^k:P_T\Rightarrow P_V,
\quad\beta^w:P_U\Rightarrow P_W,
\quad\beta^v:P_W\Rightarrow P_Z
$$

があり、例えば $\alpha^h_X(x,s)=(x,h(s))$ である。合成関手 $P_UP_S$ の値は $P_U(P_S(X))=(X\times S)\times U$ なので、その元は $((x,s),u)$ と書く。まず横に合成した $\beta^w\ast\alpha^h$ は

$$
((x,s),u)\longmapsto((x,h(s)),w(u))
$$

と作用する。次に $\beta^v\ast\alpha^k$ を縦に合成すると

$$
((x,s),u)\longmapsto((x,k(h(s))),v(w(u))).
$$

縦合成 $\alpha^k\cdot\alpha^h$ は $k\circ h$、$\beta^v\cdot\beta^w$ は $v\circ w$ から作った自然変換なので、先に縦を行ってから横に合成してもこの式になる。抽象的な交換法則の中央の自然性が、ここでは二つの座標変換が互いに独立であることに現れている。

## 6. 演習：成分の型から合成法則まで

### CAT1-08-A01 矢印圏の可換四角形

- Level: A

$\mathcal A$ は対象 $0,1$ と射 $u:0\to1$ を持つ矢印圏とする。$F:\mathcal A\to\mathbf{Set}$ は $F(0)=\{0,1\}$, $F(1)=\{p\}$, $F(u)$ は定値写像とする。$G(0)=\{a,b\}$, $G(1)=\{r,s\}$, $G(u)(a)=r$, $G(u)(b)=s$ とする。$\alpha_0(0)=a$, $\alpha_0(1)=b$, $\alpha_1(p)=r$ という成分族が自然変換か調べよ。

<!-- solution-start -->
**詳細解答**。各成分はそれぞれ $F(0)\to G(0)$ と $F(1)\to G(1)$ の写像である。しかし[自然性の条件](../CAT1-07/index.md#def-cat1-07-natural-transformation)を $u$ に適用すると、始域 $F(0)$ の点 $1$ で

$$
(G(u)\circ\alpha_0)(1)=G(u)(b)=s,
\qquad
(\alpha_1\circ F(u))(1)=\alpha_1(p)=r.
$$

$r\ne s$ だから可換でなく、自然変換ではない。成分がいずれも写像であることだけでは関手圏の射にならない。
<!-- solution-end -->

### CAT1-08-A02 垂直合成の左右の差

- Level: A

$I(X)=X$, $D(X)=X\times X$, $\delta_X(x)=(x,x)$, $\pi_X(x,y)=x$ を用いる。$X=\{0,1\}$ について $\pi\cdot\delta$ と $\delta\cdot\pi$ の始域・終域と値を明記し、それぞれ恒等自然変換かを判定せよ。

<!-- solution-start -->
**詳細解答**。[垂直合成の定義](#def-cat1-08-vertical)により $\pi\cdot\delta:I\Rightarrow I$ で、その成分は

$$
(\pi\cdot\delta)_X(0)=0,
\qquad(\pi\cdot\delta)_X(1)=1.
$$

任意の集合 $X$ でも $\pi_X(\delta_X(x))=x$ だから $\pi\cdot\delta=1_I$ である。一方 $\delta\cdot\pi:D\Rightarrow D$ で、例えば

$$
(\delta\cdot\pi)_X(0,1)=(0,0)\ne(0,1).
$$

したがって $\delta\cdot\pi\ne1_D$。一方の合成だけが恒等であるのは $\delta_X$ が一般には全射でないからである。
<!-- solution-end -->

### CAT1-08-A03 離散二対象圏で自然変換を数える

- Level: A

$\mathcal C$ は対象 $a,b$ と恒等射だけからなる小さい圏とする。関手 $F,G:\mathcal C\to\mathbf{Set}$ が $|F(a)|=2$, $|F(b)|=1$, $|G(a)|=3$, $|G(b)|=4$ を満たすとき、$|\operatorname{Nat}(F,G)|$ を求めよ。なぜ自然性に追加条件がないか説明せよ。

<!-- solution-start -->
**詳細解答**。$\alpha_a:F(a)\to G(a)$ は $3^2=9$ 通り、$\alpha_b:F(b)\to G(b)$ は $4^1=4$ 通り。非恒等射がないので、恒等射での自然性は

$$
1_{G(a)}\circ\alpha_a=\alpha_a\circ1_{F(a)},
\qquad
1_{G(b)}\circ\alpha_b=\alpha_b\circ1_{F(b)}
$$

という自動的に成り立つ等式だけである。従って成分を独立に選べるので $|\operatorname{Nat}(F,G)|=9\cdot4=36$。これは[関手圏の集合性の証明](#prop-cat1-08-size)における直積の有限例である。
<!-- solution-end -->

### CAT1-08-A04 二種類の whiskering の型

- Level: A

$D(X)=X\times X$, $P_S(X)=X\times S$, $\delta:I\Rightarrow D$ とする。$P_S\delta$ と $\delta P_S$ の各成分を、$(x,s)$ の像および始域・終域まで書いて比較せよ。

<!-- solution-start -->
**詳細解答**。[whiskering の定義](#def-cat1-08-whiskering)から、後合成側は

$$
(P_S\delta)_X=P_S(\delta_X):X\times S\to(X\times X)\times S,
$$

$$
(x,s)\longmapsto((x,x),s).
$$

前合成側は

$$
(\delta P_S)_X=\delta_{P_S(X)}:X\times S\to(X\times S)\times(X\times S),
$$

$$
(x,s)\longmapsto((x,s),(x,s)).
$$

前者は $P_S\Rightarrow P_SD$、後者は $P_S\Rightarrow DP_S$ である。どちらも始域は同じだが、終域と値の括弧構造は違う。
<!-- solution-end -->

### CAT1-08-A05 水平合成の二経路

- Level: A

$I,D,\delta,\pi$ を A02 と同じにする。$\pi\ast\delta:DI\Rightarrow ID$ の成分を $X=\{0,1\}$ で $(0,1)$ に適用し、[水平合成の定義](#def-cat1-08-horizontal)に示された二経路から別々に計算せよ。

<!-- solution-start -->
**詳細解答**。第一経路では $D(\delta_X)(0,1)=((0,0),(1,1))$ に $\pi_{D(X)}$ を適用するから

$$
\pi_{D(X)}(D(\delta_X)(0,1))=(0,0).
$$

第二経路ではまず $\pi_X(0,1)=0$、次に $\delta_X(0)=(0,0)$ となる。

$$
\delta_X(\pi_X(0,1))=(0,0).
$$

両者は始域 $D(X)$、終域 $D(X)$ の同じ写像の値である。$\pi$ の自然性を射 $\delta_X:X\to D(X)$ に適用したことが、この一致を保証する。
<!-- solution-end -->

### CAT1-08-B01 三つの自然変換を縦に合成する

- Level: B

小さい圏 $\mathcal C$ と局所小圏 $\mathcal D$ の関手 $F,G,H,J:\mathcal C\to\mathcal D$、自然変換 $\alpha:F\Rightarrow G$, $\beta:G\Rightarrow H$, $\gamma:H\Rightarrow J$ を与える。任意の $f:A\to B$ について $\gamma\cdot\beta\cdot\alpha$ の自然性を出発点から証明し、二通りの括弧付けと左右の単位律も確認せよ。

<!-- solution-start -->
**詳細解答**。合成された成分は型 $F(A)\to J(A)$ の $\gamma_A\circ\beta_A\circ\alpha_A$ である。自然性を三回使うと

$$
\begin{aligned}
J(f)\circ\gamma_A\circ\beta_A\circ\alpha_A
&=\gamma_B\circ H(f)\circ\beta_A\circ\alpha_A\\
&=\gamma_B\circ\beta_B\circ G(f)\circ\alpha_A\\
&=\gamma_B\circ\beta_B\circ\alpha_B\circ F(f).
\end{aligned}
$$

従って成分族は自然変換である。$\mathcal D$ の結合律を各 $A$ に適用すると

$$
(\gamma_A\circ\beta_A)\circ\alpha_A
=\gamma_A\circ(\beta_A\circ\alpha_A),
$$

よって $(\gamma\cdot\beta)\cdot\alpha=\gamma\cdot(\beta\cdot\alpha)$。同様に左右の恒等変換については、実際に $1_{G(A)}\circ\alpha_A=\alpha_A=\alpha_A\circ1_{F(A)}$ なので $1_G\cdot\alpha=\alpha=\alpha\cdot1_F$ となる。
<!-- solution-end -->

### CAT1-08-B02 水平合成の自然性を再導出する

- Level: B

圏 $\mathcal C,\mathcal D,\mathcal E$、関手 $F,G:\mathcal C\to\mathcal D$, $H,K:\mathcal D\to\mathcal E$、自然変換 $\alpha:F\Rightarrow G$, $\beta:H\Rightarrow K$ を取る。$\theta_A=K(\alpha_A)\circ\beta_{F(A)}$ と置く。$\theta_A=\beta_{G(A)}\circ H(\alpha_A)$ を示し、$\theta:HF\Rightarrow KG$ の自然性を $f:A\to B$ について証明せよ。

<!-- solution-start -->
**詳細解答**。$\beta$ の自然性を $\alpha_A:F(A)\to G(A)$ に適用できるので、$\theta_A=\beta_{G(A)}\circ H(\alpha_A)$ である。両式とも $HF(A)\to KG(A)$ の射になっている。次に任意の $f:A\to B$ で $\beta$ の自然性を $G(f)$ に、$\alpha$ の自然性を $f$ に適用して

$$
\begin{aligned}
KG(f)\circ\theta_A
&=K(G(f))\circ\beta_{G(A)}\circ H(\alpha_A)\\
&=\beta_{G(B)}\circ H(G(f))\circ H(\alpha_A)\\
&=\beta_{G(B)}\circ H(G(f)\circ\alpha_A)\\
&=\beta_{G(B)}\circ H(\alpha_B\circ F(f))\\
&=\theta_B\circ HF(f).
\end{aligned}
$$

最後の行は $H$ の合成保存を使った。ゆえに $\theta$ は自然変換である。
<!-- solution-end -->

### CAT1-08-B03 直積関手で交換法則を計算する

- Level: B

固定集合 $S,T,V,U,W,Z$ と写像 $h:S\to T$, $k:T\to V$, $w:U\to W$, $v:W\to Z$ に対し、$P_R(X)=X\times R$ および $\alpha^h_X(x,s)=(x,h(s))$ などの自然変換を考える。$P_UP_S(X)$ の元 $((x,s),u)$ に対して、$ (\beta^v\ast\alpha^k)\cdot(\beta^w\ast\alpha^h)$ と $(\beta^v\cdot\beta^w)\ast(\alpha^k\cdot\alpha^h)$ の両方を計算せよ。

<!-- solution-start -->
**詳細解答**。最初の横合成で $P_U(\alpha^h_X)$ は $((x,s),u)\mapsto((x,h(s)),u)$、続く $\beta^w_{P_T(X)}$ は $((x,t),u)\mapsto((x,t),w(u))$ である。第二の横合成では $k$ と $v$ を同じ順で適用するので

$$
\begin{aligned}
((x,s),u)
&\longmapsto((x,h(s)),w(u))\\
&\longmapsto((x,k(h(s))),v(w(u))).
\end{aligned}
$$

一方、縦合成は[成分の合成](#def-cat1-08-vertical)なので $\alpha^k\cdot\alpha^h$ は $(x,s)\mapsto(x,k(h(s)))$、$\beta^v\cdot\beta^w$ は $(y,u)\mapsto(y,v(w(u)))$ である。これらを横に合成すると $((x,s),u)\mapsto((x,k(h(s))),v(w(u)))$ を得る。両辺は $P_UP_S\Rightarrow P_ZP_V$ の自然変換として一致する。
<!-- solution-end -->

### CAT1-08-B04 水平合成の三段結合律

- Level: B

関手 $F,G:\mathcal C\to\mathcal D$, $H,K:\mathcal D\to\mathcal E$, $L,M:\mathcal E\to\mathcal B$ と自然変換 $\alpha:F\Rightarrow G$, $\beta:H\Rightarrow K$, $\gamma:L\Rightarrow M$ を与える。$\gamma\ast(\beta\ast\alpha)$ と $(\gamma\ast\beta)\ast\alpha$ の始域・終域を示し、各成分が一致することを三段階の式で証明せよ。

<!-- solution-start -->
**詳細解答**。いずれも $LHF\Rightarrow MKG$ で、始域・終域はそれぞれ $L(H(F(A)))$ と $M(K(G(A)))$ である。左辺の $A$ 成分から始めると

$$
\begin{aligned}
(\gamma\ast(\beta\ast\alpha))_A
&=\gamma_{KG(A)}\circ L((\beta\ast\alpha)_A)\\
&=\gamma_{KG(A)}\circ L(\beta_{G(A)})\circ LH(\alpha_A)\\
&=(\gamma\ast\beta)_{G(A)}\circ LH(\alpha_A)\\
&=((\gamma\ast\beta)\ast\alpha)_A.
\end{aligned}
$$

二行目では $L$ の合成保存を使い、三行目では $\gamma\ast\beta$ の成分公式を使った。任意の $A$ で一致したから、自然変換として等しい。
<!-- solution-end -->

### CAT1-08-C01 関手圏を可換四角形から構成し直す

- Level: C

$\mathcal A$ を対象 $0,1$、恒等射と $u:0\to1$ だけを持つ小さい圏とする。次をすべて示せ。

1. $[\mathcal A,\mathbf{Set}]$ の対象は集合間の写像 $f:X\to Y$ と一対一に対応する。
2. $f:X\to Y$ と $g:X'\to Y'$ の間の自然変換は、$a:X\to X'$, $b:Y\to Y'$ で $g\circ a=b\circ f$ を満たす組と一対一に対応する。
3. その組の恒等射と合成を明示し、可換性が合成で保たれることを証明せよ。
4. この関手圏が局所小だが小さくない理由を、Hom 集合と恒等写像 $1_X:X\to X$ に対応する対象を使って示せ。

<!-- solution-start -->
**詳細解答**。

**1. 対象。** 任意の関手 $F:\mathcal A\to\mathbf{Set}$ は、対象 $0,1$ の値 $X,Y$ と、唯一の非恒等射 $u$ の像 $f:X\to Y$ で決まる。逆に任意の写像 $f:X\to Y$ から、対象・射への対応を

$$
\begin{gathered}
F(0)=X,\quad F(1)=Y,\quad F(u)=f,\\
F(1_0)=1_X,\quad F(1_1)=1_Y
\end{gathered}
$$

と定める。$u\circ1_0=u=1_1\circ u$ の像は

$$
f\circ1_X=f=1_Y\circ f
$$

であり、恒等射同士の合成も保存する。従って関手の公理をすべて満たし、両構成は互いに逆になる。

**2. 射。** 自然変換 $\alpha:F\Rightarrow G$ の成分は $a=\alpha_0:X\to X'$ と $b=\alpha_1:Y\to Y'$ である。恒等射の自然性は自動的に成り立つ。$u$ についての自然性を展開すると

$$
G(u)\circ\alpha_0=\alpha_1\circ F(u)
\quad\Longleftrightarrow\quad
g\circ a=b\circ f.
$$

逆にこの等式を満たす組は、$u$ と二恒等射の全てで自然なので自然変換を与える。

**3. 合成と恒等。** $f\to g$ の可換四角形を $(a,b)$、$g\to h$ の可換四角形を $(c,d)$（$h:X''\to Y''$）とする。合成の候補は $(c\circ a,d\circ b)$ であり、両成分はそれぞれ $X\to X''$, $Y\to Y''$ という正しい型を持つ。可換性は

$$
\begin{aligned}
h\circ(c\circ a)
&=(h\circ c)\circ a\\
&=(d\circ g)\circ a\\
&=d\circ(g\circ a)\\
&=d\circ(b\circ f)\\
&=(d\circ b)\circ f
\end{aligned}
$$

と二つの四角形の仮定から従う。恒等射は $(1_X,1_Y)$ で $f\circ1_X=1_Y\circ f$。三つの四角形の成分を合成すると、結合則は集合の写像の結合則、単位律は恒等写像の性質からそれぞれ二成分で成り立つ。したがって可換四角形そのものが関手圏の射をなす。

**4. 大きさ。** 二つの関手に対応する $f:X\to Y$, $g:X'\to Y'$ を固定すると、可換四角形の全体は集合

$$
\operatorname{Hom}_{\mathbf{Set}}(X,X')
\times\operatorname{Hom}_{\mathbf{Set}}(Y,Y')
$$

のうち $g\circ a=b\circ f$ を満たす部分集合である。従って局所小である。

一方、すべての集合 $X$ に $1_X:X\to X$ に対応する異なる対象がある。もし関手圏の対象全体が集合なら、そこから各 $X$ を取り出してすべての集合の集合を作れてしまう。しかし[集合の圏の大きさ](../CAT1-02/index.md#prop-cat1-02-set-size)によってこれは不可能である。従って関手圏は小さくない。
<!-- solution-end -->

## 7. 次の講義へ

関手を対象、自然変換を射とする関手圏を構成し、二種類の合成と交換法則を確かめた。次は「二つの圏が同じ形をしている」とは何を意味するかを考え、関手がつくる**圏の同値**と、対象・射を厳密に一対一対応させる圏同型を区別する。
