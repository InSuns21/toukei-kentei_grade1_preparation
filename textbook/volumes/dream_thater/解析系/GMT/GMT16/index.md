# GMT16 純非整流性と分解・反例

<!-- definition-example-audit: strict -->

[GMT15の密度と近似接平面の定理](../GMT15/index.md#thm-gmt15-rectifiable-density-tangent)は、有限面積を持つ可算整流可能集合のほとんどすべての点が、拡大すると平面のように見えることを示しました。しかし、集合全体を可算枚の曲面で覆えない場合、**どの部分までなら曲面として扱えるか**はまだ分かりません。

[GMT12の可算整流可能性](../GMT12/index.md#def-gmt12-countably-rectifiable)と[純非整流可能性](../GMT12/index.md#def-gmt12-purely-unrectifiable)は、「可算個のLipschitz像で零測度の例外を除いて覆える」「どのLipschitz像とも正の面積で重ならない」という二つの条件でした。本講義では、有限のHausdorff面積を持つ任意の集合から前者の部分を最大限取り出し、残りが必ず後者になることを証明します。

続いて、四隅Cantor集合の小球と射影を手で計算します。純非整流性は「集合が小さい」「すべての射影が零になる」とは同義ではありません。この違いが、次のGMT17・GMT18で扱う**ほとんどすべての方向**という条件の必要性を教えます。

以下、整数 $1\le m\le d$ を固定し、$\mathcal H^m$ は[MT8の直径による非正規化Hausdorff測度](../../MT/MT8/index.md#def-mt8-hausdorff-measure)とします。$m$ 次元平面上では[GMT10の比例係数](../GMT10/index.md#lem-gmt10-hausdorff-normalization) $c_m=\mathcal H^m([0,1]^m)$ を使います。$m=1$ では $c_1=1$ です。記号 $\mathcal H^m\llcorner E$ は $E$ への測度の制限を表します。

## 1. 純非整流部分は、どの整流可能部分とも重ならない

まず、定義の全称量化を扱いやすい形にします。$f:\mathbb R^m\to\mathbb R^d$ がLipschitzなら、$f(\mathbb R^m)=\bigcup_{n\ge1}f([-n,n]^m)$ はコンパクト集合の可算和で、Borel集合です。よってBorel集合 $E$ との交わりの $\mathcal H^m$ 測度を問題なく取れます。

「純非整流」とは一本の曲線を含まないという意味ではありません。例えば測度零の線分の**部分集合**は含んでよいのですが、正の $m$ 次元面積を持つパラメータ像との交わりは許されません。この違いを可算個の像にも拡張します。

<a id="lem-gmt16-pure-meets-rectifiable"></a>

<!-- formal-statement-start -->
> **補題（純非整流部分と可算整流可能部分の零交差）**  
> $1\le m\le d$ とする。$P\subset\mathbb R^d$ がBorelな[純$m$-非整流可能集合](../GMT12/index.md#def-gmt12-purely-unrectifiable)、$R\subset\mathbb R^d$ がBorelな[可算$m$-整流可能集合](../GMT12/index.md#def-gmt12-countably-rectifiable)なら、

$$
\mathcal H^m(P\cap R)=0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$R$ を覆うLipschitz像ごとに純非整流性を使い、最後に可算劣加法性を使います。$R$ の零測度例外を落とさないことが大切です。

<!-- proof-start -->
### 証明

$R$ の可算整流可能性からLipschitz写像 $f_j:\mathbb R^m\to\mathbb R^d$ があり、

$$
N=R\setminus\bigcup_{j\ge1}f_j(\mathbb R^m),
\qquad \mathcal H^m(N)=0
$$

となります。包含関係

$$
P\cap R\subset (P\cap N)\cup
\bigcup_{j\ge1}\bigl(P\cap f_j(\mathbb R^m)\bigr)
$$

において、最初の項は $N$ の部分集合なので零測度、各 $j$ の項は $P$ の純非整流性の定義で零測度です。$\mathcal H^m$ の可算劣加法性から結論が従います。$\square$
<!-- proof-end -->

例えば、一点集合 $N=\{(0,0)\}$ は $\mathcal H^1(N)=0$ なので、[GMT12の両立条件](../GMT12/index.md#prop-gmt12-zero-intersection)どおり可算1整流可能かつ純1非整流可能です。他方、$S=[0,1]\times\{0\}$ はそのものがLipschitz像であり、$\mathcal H^1(S)=1>0$ だから純1非整流可能ではありません。**零測度集合は両方のクラスに入る**ことを忘れて、「整流可能か非整流可能か」の二者択一にしてはいけません。

## 2. 有限面積の集合を二つの成分へ分ける

欲しい分解は、全体 $E$ のうちLipschitz像で捕まえられる面積をできるだけ大きくする構成です。面積が有限なら、捕まえられる面積の上限が有限の実数になります。その上限へ近付く可算族を一度に集めれば、残りには正の面積で重なるLipschitz像が一つも存在できません。

<a id="thm-gmt16-decomposition"></a>

<!-- formal-statement-start -->
> **定理（有限Hausdorff面積集合の整流可能・純非整流分解）**  
> $1\le m\le d$、$E\subset\mathbb R^d$ はBorel集合で

$$
\mathcal H^m(E)<\infty
$$

> とする。このとき、互いに素なBorel集合 $R,P\subset E$ が存在して、

$$
E=R\mathbin{\dot\cup}P,
$$

> $R$ は可算$m$-整流可能、$P$ は純$m$-非整流可能となる。さらに、このような分解 $E=R'\mathbin{\dot\cup}P'$ が別にあれば

$$
\mathcal H^m(R\triangle R')
=\mathcal H^m(P\triangle P')=0
$$

> である。$\triangle$ は対称差 $(A\setminus B)\cup(B\setminus A)$ を表す。従って分解は $\mathcal H^m$-零集合を移し替える自由度を除き一意である。
<!-- formal-statement-end -->

### 証明の見取り図

各Lipschitz像の可算和 $M$ が捕まえる $E$ の面積 $\mathcal H^m(E\cap M)$ の上限を $\alpha$ とします。上限を近似する $M_n$ の和を $M$ にすると、$E\setminus M$ がなお正の面積でLipschitz像 $f(\mathbb R^m)$ と交わるなら、その像を $M$ に加えて $\alpha$ を超え、矛盾します。一意性は前節の零交差補題です。

<!-- proof-start -->
### 証明

**(1) 捕捉面積の上限。** 次の族を取ります。

$$
\mathscr M=
\left\{\bigcup_{j\ge1}f_j(\mathbb R^m):
f_j:\mathbb R^m\to\mathbb R^d\ \text{はLipschitz}\right\}.
$$

定数写像を並べてもよいので空でありません。各 $M\in\mathscr M$ はBorelであり、$0\le\mathcal H^m(E\cap M)\le\mathcal H^m(E)<\infty$ です。従って

$$
\alpha=\sup_{M\in\mathscr M}\mathcal H^m(E\cap M)
\in[0,\mathcal H^m(E)]
$$

が定まります。上限の定義から各整数 $n\ge1$ について $M_n\in\mathscr M$ を

$$
\mathcal H^m(E\cap M_n)>\alpha-2^{-n}
$$

となるように取れます。$M=\bigcup_{n\ge1}M_n$ はLipschitz像の二重可算族を一列に並べ直すことで再び $\mathscr M$ に属します。$M\supset M_n$ なので

$$
\alpha\ge\mathcal H^m(E\cap M)
\ge\mathcal H^m(E\cap M_n)>\alpha-2^{-n}.
$$

$n\to\infty$ として $\mathcal H^m(E\cap M)=\alpha$ です。

**(2) 分解と残余の純非整流性。** $R=E\cap M$、$P=E\setminus M$ と定めます。両者はBorel、互いに素で和集合が $E$ です。$R$ は $M$ の可算Lipschitz像に完全に含まれるため、[可算整流可能性の定義](../GMT12/index.md#def-gmt12-countably-rectifiable)を満たします。

仮に $P$ が純非整流でないなら、あるLipschitz写像 $f$ があって

$$
\delta=\mathcal H^m(P\cap f(\mathbb R^m))>0
$$

です。$M'=M\cup f(\mathbb R^m)$ も $\mathscr M$ に属します。$R\subset M$ と $P\cap M=\varnothing$ から、測度の加法性を使って

$$
\begin{aligned}
\mathcal H^m(E\cap M')
&=\mathcal H^m(R)
+\mathcal H^m(P\cap f(\mathbb R^m))\\
&=\alpha+\delta>\alpha.
\end{aligned}
$$

これは $\alpha$ が上限であることに矛盾します。従って $P$ は純$m$-非整流可能です。

**(3) 零集合を除く一意性。** 別の分解 $E=R'\mathbin{\dot\cup}P'$ を取ります。$R\setminus R'$ は $P'$ に含まれ、[零交差補題](#lem-gmt16-pure-meets-rectifiable)を $P'$ と $R$ に適用すると

$$
\mathcal H^m(R\setminus R')\le\mathcal H^m(R\cap P')=0.
$$

同様に $R'\setminus R\subset P$ だから $\mathcal H^m(R'\setminus R)=0$。二つを合わせて $\mathcal H^m(R\triangle R')=0$ です。補集合を同じ $E$ の中で取っているので $P\triangle P'=R\triangle R'$ となります。$\square$
<!-- proof-end -->

定理は「どちらの成分も点として一意に特定できる」とは言っていません。例えば一つの孤立点を $R$ へ入れても $P$ へ入れても、$\mathcal H^m$ の観点では同じ分解です。一方、**正の面積を持つ部分を反対側へ動かすことはできません**。

### 直接例：線分と四隅Cantor集合を混ぜる

**条件の確認**：可測性、有限面積、互いに素な分解、両成分の定義条件を順に確認します。

$S=[0,1]\times\{0\}$ とし、[GMT12で構成した四隅Cantor集合](../GMT12/index.md#thm-gmt12-corner-pure)を $K\subset[0,1]^2$ と書きます。$K'=K+(2,2)\subset[2,3]^2$、$E=S\cup K'$ と置きます。$S$ と $K'$ は互いに素なコンパクト集合なので、$E$ はBorelです。

[GMT12の質量・被覆評価](../GMT12/index.md#lem-gmt12-corner-mass)より $0<\mathcal H^1(K)<\infty$ です。また $S$ は1-Lipschitz写像 $t\mapsto(\min(1,\max(0,t)),0)$ の像で、$\mathcal H^1(S)=1$。平行移動は距離を保つので

$$
\mathcal H^1(E)=1+\mathcal H^1(K')
=1+\mathcal H^1(K)<\infty.
$$

$R=S$ は可算1整流可能、$P=K'$ は[純1非整流可能](../GMT12/index.md#thm-gmt12-corner-pure)です。純非整流性が平行移動で保たれるのは、任意のLipschitz像 $f(\mathbb R)$ と $K'$ の交わりを $(-2,-2)$ だけ平行移動すれば、$K$ とLipschitz像 $(f-(2,2))(\mathbb R)$ の交わりになり、長さ0だからです。

こうして $E=R\mathbin{\dot\cup}P$ の全条件を直接検証しました。$E$ は正の長さの純非整流部分を含むので可算1整流可能ではありません。もし可算1整流可能なら[零交差補題](#lem-gmt16-pure-meets-rectifiable)で $\mathcal H^1(K')=0$ となり、上の正値に矛盾します。

### 整流可能成分の上では、元の集合も平面に見える

分解の $R$ は $\mathcal H^m(R)\le\mathcal H^m(E)<\infty$ なので、[GMT15の定理](../GMT15/index.md#thm-gmt15-rectifiable-density-tangent)から $\mathcal H^m$-ほとんどすべての $x\in R$ で平面基準密度1と近似接平面 $V_x$ を持ちます。ただしこれだけでは、$E$ の残りの $P$ が $x$ の周囲で面積を余分に持つ可能性があります。

そこで有限Radon測度 $\mu=\mathcal H^m\llcorner E$ に対し、[GMT1の測度微分定理](../GMT1/index.md#thm-gmt1-function-differentiation)を $\boldsymbol1_R$ に適用します。$\mu$-ほとんどすべての $x\in R$ で

$$
\frac{\mathcal H^m(R\cap B(x,r))}
{\mathcal H^m(E\cap B(x,r))}\longrightarrow1.
$$

分母を小球の面積 $c_m\omega_mr^m$ で割ると、$R$ の密度1と上の比から

$$
\frac{\mathcal H^m(E\cap B(x,r))}{c_m\omega_mr^m}
=\frac{\mathcal H^m(R\cap B(x,r))/(c_m\omega_mr^m)}
{\mathcal H^m(R\cap B(x,r))/\mathcal H^m(E\cap B(x,r))}
\longrightarrow1.
$$

また $E$ の円錐外部分は $R$ の円錐外部分と $P$ の部分に分かれ、前者は $o(r^m)$、後者も上の微分比と有限正の球面積密度から $o(r^m)$ です。よって $E$ 自体の近似接平面も $V_x$ になります。**分解の整流可能成分は、周囲に純非整流部分があっても、ほとんどすべての点で幾何を保ちます。** 逆向きの一般判定はGMT20の課題です。

## 3. 反例：正で有限の長さがあっても接線が一本もない

ここから $m=1,d=2$ とします。四隅Cantor集合 $K$ は、単位正方形から各辺を4等分した四隅の小正方形を残す操作を反復した集合です。第 $n$ 段階の正方形の辺長を $s_n=4^{-n}$ と書きます。[GMT12の質量補題](../GMT12/index.md#lem-gmt12-corner-mass)によると、各段階正方形 $Q$ には

$$
\mathcal H^1(K\cap Q)\ge\frac{\operatorname{side}(Q)}C
$$

という下界があり、どの直線 $\ell$ に対しても、$Q$ の四つの子正方形の少なくとも一つ $Q'$ は $\operatorname{dist}(Q',\ell)\ge s_n/10$ を満たします。ここで $C>0$ は集合の位置・段階・直線に依存しない定数です。

前講の[近似接線の定義](../GMT15/index.md#def-gmt15-approximate-tangent)は、正で有限な上下密度と、任意に細い円錐の外の長さが $o(r)$ になることの両方を求めました。まず密度条件を確認してから、円錐が必ず失敗することを示します。

<a id="lem-gmt16-corner-no-tangent"></a>

<!-- formal-statement-start -->
> **補題（四隅Cantor集合には近似接線が存在しない）**  
> $K\subset\mathbb R^2$ をGMT12の四隅Cantor集合とし、$\mathcal H^1$ を非正規化Hausdorff長さとする。任意の $x\in K$ で平面基準の上下密度は正かつ有限である。しかし、任意の原点を通る1次元部分空間 $V$ に対し、$\varepsilon=1/40$ とした[円錐](../GMT15/index.md#def-gmt15-approximate-tangent)について

$$
\limsup_{r\downarrow0}
\frac{\mathcal H^1(K\cap B(x,r)\setminus X(x,V,1/40))}{r}
\ge\frac1{8C}>0
$$

> となる。従って $K$ はどの点でも近似接線を持たない。
<!-- formal-statement-end -->

### 証明の見取り図

ある点を含む第 $n$ 段階正方形を $Q_n$ とします。その子正方形の一つは、どの候補直線からも相対距離 $s_n/10$ だけ離れています。それでもその子には少なくとも $s_n/(4C)$ の長さが残り、半径 $2s_n$ の球の中で消えません。

<!-- proof-start -->
### 証明

**(1) 小球の長さの上下界。** $x\in K$、$4^{-(n+1)}<r\le s_n=4^{-n}$ とします。$x$ が属する第 $n+2$ 段階正方形を $Q_{n+2}(x)$ とすると、直径は $\sqrt2s_n/16<r$ です。従ってこの正方形は $B(x,r)$ に入り、質量補題から

$$
\mathcal H^1(K\cap B(x,r))
\ge\mathcal H^1(K\cap Q_{n+2}(x))
\ge\frac{s_n}{16C}\ge\frac r{16C}.
$$

異なる第 $n$ 段階正方形は少なくとも $2s_n$ 離れているため、$r\le s_n$ の球は $x$ を含む $Q_n(x)$ 以外と交わりません。$K\cap Q_n(x)$ は $K$ を相似比 $s_n$ で縮小・平行移動した集合です。第 $n+k$ 段階の $4^k$ 個の子正方形による被覆の直径総和は $4^k\sqrt2s_n4^{-k}=\sqrt2s_n$ で、$k\to\infty$ により被覆の最大直径が0になるので

$$
\mathcal H^1(K\cap B(x,r))
\le\mathcal H^1(K\cap Q_n(x))
\le\sqrt2s_n<4\sqrt2r.
$$

したがって $\mathcal H^1(K\cap B(x,r))/(2r)$ の下極限は少なくとも $1/(32C)$、上極限は高々 $2\sqrt2$ で、いずれも正で有限です。

**(2) 円錐外へ残る長さ。** 任意の候補 $V$ と $x$ を固定し、$\ell=x+V$ とします。$Q_n(x)$ の子正方形のうち、$\operatorname{dist}(Q',\ell)\ge s_n/10$ となるものを選びます。$Q'$ は $Q_n(x)$ に含まれ、その直径は $s_n\sqrt2/4$ です。各 $y\in K\cap Q'$ は

$$
|y-x|\le\sqrt2s_n<2s_n,
\qquad
\operatorname{dist}(y-x,V)\ge\frac{s_n}{10}.
$$

よって $\operatorname{dist}(y-x,V)/|y-x|>1/20>1/40$ であり、$K\cap Q'$ の全点は $B(x,2s_n)\setminus X(x,V,1/40)$ にあります。質量補題を子正方形の辺長 $s_n/4$ に用いると

$$
\begin{aligned}
\frac{\mathcal H^1(K\cap B(x,2s_n)\setminus X(x,V,1/40))}{2s_n}
&\ge\frac{\mathcal H^1(K\cap Q')}{2s_n}\\
&\ge\frac{s_n/(4C)}{2s_n}=\frac1{8C}.
\end{aligned}
$$

$s_n\downarrow0$ なので、半径列 $r_n=2s_n$ に沿う下界は消えません。近似接線の円錐外極限が0という条件は全ての $V$ に対して破れます。$\square$
<!-- proof-end -->

この反例は[GMT15の整流可能集合のa.e.接平面定理](../GMT15/index.md#thm-gmt15-rectifiable-density-tangent)と矛盾しません。$K$ は[GMT12の純非整流性定理](../GMT12/index.md#thm-gmt12-corner-pure)により正の長さを持ちながら可算1整流可能ではありません。円錐の外へ各スケールで**一定割合の長さが残る**ことが、接線の失敗機構です。

注意してほしいのは、ここで証明したのは特定の集合 $K$ についての「全点で接線がない」という強い主張です。一般の純非整流集合について、同じ証明を無条件に流用してはなりません。

## 4. 射影：同じ純非整流集合でも方向で結果が変わる

四隅Cantor集合は

$$
C=\left\{\sum_{j=1}^{\infty}\frac{3a_j}{4^j}:
a_j\in\{0,1\}\right\},\qquad K=C\times C
$$

と書けます。これは第 $n$ 段階で各座標の四進数字を $0$ または $3$ に限る構成に対応します。$C$ は $2^n$ 個の長さ $4^{-n}$ の区間で覆えるので

$$
\mathcal H^1(C)\le\lim_{n\to\infty}
2^n4^{-n}=0.
$$

従って水平方向 $e_1=(1,0)$ の直交射影 $\pi_{e_1}(x,y)=x$ では $\mathcal H^1(\pi_{e_1}K)=0$ です。しかし、すべての方向で零になるわけではありません。

<a id="prop-gmt16-projection-contrast"></a>

<!-- formal-statement-start -->
> **命題（四隅集合の零射影と正射影）**  
> $K=C\times C\subset\mathbb R^2$ を上記の四隅Cantor集合とし、単位方向 $v=(2,1)/\sqrt5$ への直交射影を、その方向の実数座標

$$
\pi_v(x,y)=\frac{2x+y}{\sqrt5}
$$

> で表す。このとき

$$
\mathcal H^1(\pi_{e_1}K)=0,
\qquad
\pi_v(K)=[0,3/\sqrt5],
\qquad
\mathcal H^1(\pi_vK)=\frac3{\sqrt5}>0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

水平方向は一つのCantor集合 $C$ だけを見ます。一方、斜め方向では各四進桁の二つの選択肢が合わさり、$2a_j+b_j$ が $0,1,2,3$ の**四種類すべて**を取ります。穴のない区間ができる理由はここにあります。

<!-- proof-start -->
### 証明

水平射影については前段で $C$ の長さが0と示しました。次に任意の $(x,y)\in K$ を

$$
x=\sum_{j\ge1}\frac{3a_j}{4^j},\qquad
y=\sum_{j\ge1}\frac{3b_j}{4^j},
\quad a_j,b_j\in\{0,1\}
$$

と表すと

$$
2x+y=3\sum_{j\ge1}\frac{2a_j+b_j}{4^j}.
$$

各桁 $d_j=2a_j+b_j$ は $0,1,2,3$ のいずれかで、逆にその四種類のどれも $(a_j,b_j)$ の一意な選択で実現できます。四進小数 $\sum_{j\ge1}d_j4^{-j}$ は $[0,1]$ の全ての実数を表します（端点1は全ての桁を3にした表示でよい）。従って

$$
\{2x+y:(x,y)\in K\}=3[0,1]=[0,3].
$$

これを $\sqrt5$ で割って $\pi_vK=[0,3/\sqrt5]$ を得ます。実数直線上で $\mathcal H^1$ は区間の長さなので、結論の正値が従います。$\square$
<!-- proof-end -->

ここで $K$ は正で有限の $\mathcal H^1$ 測度を持つ**純1非整流集合**です。それにもかかわらず、特定の方向には正の長さを持つ射影があります。[GMT5のMarstrand射影次元定理](../GMT5/index.md#thm-gmt5-marstrand-dimension)の「次元が1」と「長さが正」を混同してもいけません。

この命題が言うのは**二つの個別方向**についてだけです。「ほとんどすべての方向で射影長さが零か」という全称的・測度論的な判定は、GMT17で準備する幾何的補題を用い、GMT18で証明します。本講義の実例だけでその一般定理を証明したことにはなりません。

## 5. 演習：分解の論理と反例を再構成する

### GMT16-A01 零集合はどちらのクラスか
- Level: A
- 目安時間: 12分

$N=\{(0,0),(1,1)\}\subset\mathbb R^2$ が可算1整流可能かつ純1非整流可能であることを、それぞれの定義から示せ。

<!-- solution-start -->
#### 詳細解答

有限集合 $N$ はBorelで、各一点の $\mathcal H^1$ 測度は0だから $\mathcal H^1(N)=0$ です。任意のLipschitz写像 $f:\mathbb R\to\mathbb R^2$ に対し $N\cap f(\mathbb R)\subset N$ なので、その長さは0です。従って[純非整流性の定義](../GMT12/index.md#def-gmt12-purely-unrectifiable)を満たします。

可算整流可能性については定数写像 $f_1(t)=(0,0)$、$f_2(t)=(1,1)$ を取り、$j\ge3$ に $f_j=f_1$ と置きます。これらは0-Lipschitzで、像の和集合は $N$ に一致し、差集合の測度は0です。従って[可算整流可能性の定義](../GMT12/index.md#def-gmt12-countably-rectifiable)も満たします。
<!-- solution-end -->

### GMT16-A02 線分は純非整流でない
- Level: A
- 目安時間: 12分

$S=[-1,1]\times\{0\}$ が可算1整流可能だが純1非整流可能でないことを、全実数上のLipschitz写像を明示して示せ。

<!-- solution-start -->
#### 詳細解答

$p(t)=\min(1,\max(-1,t))$ とすれば $|p(t)-p(s)|\le|t-s|$ です。従って $f(t)=(p(t),0)$ は全実数上で1-Lipschitz、その像は $S$ です。差集合が空なので可算1整流可能です。

しかしこの同じ写像に対して $S\cap f(\mathbb R)=S$、$\mathcal H^1(S)=2>0$ です。純非整流性は**全ての**Lipschitz写像について零交差を要求するので、一つの反例 $f$ だけで否定できます。
<!-- solution-end -->

### GMT16-A03 成分の測度と有限性
- Level: A
- 目安時間: 15分

四隅Cantor集合 $K$、$K'=K+(2,2)$、$S=[0,1]\times\{0\}$、$E=S\cup K'$ とする。$E$ のBorel可測性と $0<\mathcal H^1(E)<\infty$ を確認し、$S,K'$ のうちどちらが純非整流であるか答えよ。

<!-- solution-start -->
#### 詳細解答

$S$ と $K'$ はコンパクトで互いに素です。従って $E$ はBorelで、測度の加法性により $\mathcal H^1(E)=\mathcal H^1(S)+\mathcal H^1(K')$ です。前者は1、後者は平行移動不変性と[四隅集合の正有限長さ](../GMT12/index.md#lem-gmt12-corner-mass)により $0<\mathcal H^1(K')=\mathcal H^1(K)<\infty$ です。よって $1<\mathcal H^1(E)<\infty$ です。

$S$ は区間のLipschitz像で純非整流ではありません。一方 $K'$ は[四隅集合の純非整流性](../GMT12/index.md#thm-gmt12-corner-pure)を平行移動で移せるため、純1非整流可能です。$E$ は両方を含む混合集合です。
<!-- solution-end -->

### GMT16-A04 最上次元には正測度の純非整流部分がない
- Level: A
- 目安時間: 15分

$m=d$ とする。$\mathbb R^d$ の恒等写像を使い、純$d$-非整流可能Borel集合 $P$ は $\mathcal H^d(P)=0$ であることを示せ。また有限測度の $E$ の分解で $\mathcal H^d(P)=0$ となることを説明せよ。

<!-- solution-start -->
#### 詳細解答

$f=\operatorname{id}_{\mathbb R^d}$ は1-Lipschitzで、その像は $\mathbb R^d$ 全体です。純$d$-非整流性の定義に $f$ を代入すると

$$
0=\mathcal H^d(P\cap f(\mathbb R^d))=\mathcal H^d(P).
$$

逆に $\mathcal H^d(P)=0$ なら、どのLipschitz像との交わりも部分集合なので測度0です。[分解定理](#thm-gmt16-decomposition)の $P$ は純非整流だから必ず零測度です。$m<d$ の場合には $K$ のような正有限測度の純非整流集合があり、この結論を拡張できません。
<!-- solution-end -->

### GMT16-A05 水平射影の長さ
- Level: A
- 目安時間: 15分

$C=\{\sum_{j\ge1}3a_j4^{-j}:a_j\in\{0,1\}\}$、$K=C\times C$ とする。第 $n$ 段階の区間被覆を作り、$\mathcal H^1(\pi_{e_1}K)=0$ を証明せよ。

<!-- solution-start -->
#### 詳細解答

最初の $n$ 桁の $a_1,\dots,a_n$ を固定すると、残りの和は

$$
0\le\sum_{j>n}\frac{3a_j}{4^j}
\le\sum_{j>n}\frac3{4^j}=4^{-n}.
$$

最初の $n$ 桁の選び方は $2^n$ 通りなので、$C$ は長さ $4^{-n}$ の区間 $2^n$ 個で覆えます。最大直径は $4^{-n}\to0$、直径総和は $2^n4^{-n}=2^{-n}\to0$。Hausdorff測度の定義から $\mathcal H^1(C)=0$ です。$\pi_{e_1}K=C$ なので結論が従います。
<!-- solution-end -->

### GMT16-B01 分解が零集合を除いて一意である理由
- Level: B
- 目安時間: 25分

有限Hausdorff測度のBorel集合 $E$ に対して $E=R\dot\cup P=R'\dot\cup P'$ と二つの分解がある。$R,R'$ は可算$m$-整流可能、$P,P'$ は純$m$-非整流可能とする。$R\triangle R'$ と $P\triangle P'$ の測度が0であることを、包含関係を一つずつ示して証明せよ。

<!-- solution-start -->
#### 詳細解答

$x\in R\setminus R'$ なら $x\in E$ かつ $x\notin R'$ です。$E=R'\dot\cup P'$ なので $x\in P'$、従って $R\setminus R'\subset R\cap P'$。純非整流な $P'$ と可算整流可能な $R$ に[零交差補題](#lem-gmt16-pure-meets-rectifiable)を適用し、$\mathcal H^m(R\setminus R')=0$ を得ます。

同様に $R'\setminus R\subset R'\cap P$、したがって $\mathcal H^m(R'\setminus R)=0$。対称差はこの二つの差集合の和なので可算劣加法性から $\mathcal H^m(R\triangle R')=0$ です。$P=E\setminus R$、$P'=E\setminus R'$ より $P\triangle P'=R\triangle R'$ が集合として成立し、後者も零測度です。
<!-- solution-end -->

### GMT16-B02 上限を達成する可算族
- Level: B
- 目安時間: 25分

$\mathcal H^m(E)<\infty$、$\alpha=\sup_{M\in\mathscr M}\mathcal H^m(E\cap M)$ とする。各 $n$ で $\mathcal H^m(E\cap M_n)>\alpha-1/n$ となる $M_n\in\mathscr M$ があるとき、$M=\bigcup_nM_n$ が $\mathscr M$ に属し、$\mathcal H^m(E\cap M)=\alpha$ となることを証明せよ。なぜ有限面積の仮定がこの議論で便利かも説明せよ。

<!-- solution-start -->
#### 詳細解答

$M_n=\bigcup_{j\ge1}f_{n,j}(\mathbb R^m)$ と書きます。自然数の対 $(n,j)$ は、例えば和 $n+j$ の小さい順に並べれば一列に数え上げられます。従って $M=\bigcup_{n,j}f_{n,j}(\mathbb R^m)$ は可算Lipschitz像の和で、$M\in\mathscr M$ です。

$M$ は各 $M_n$ を含むので $\mathcal H^m(E\cap M)\ge\alpha-1/n$ が全ての $n$ で成立します。他方、$M\in\mathscr M$ だから上限の定義から $\mathcal H^m(E\cap M)\le\alpha$。$n\to\infty$ で両側が $\alpha$ に一致します。

有限面積なら $\alpha\le\mathcal H^m(E)<\infty$ であり、$\alpha+\delta>\alpha$（$\delta>0$）という矛盾を次の段階で使えます。$\alpha=\infty$ ではこの不等式は矛盾にならないので、単に同じ議論を写すことはできません。
<!-- solution-end -->

### GMT16-B03 Cantor集合の円錐外下界
- Level: B
- 目安時間: 30分

四隅集合 $K$ と第 $n$ 段階正方形 $Q_n(x)$ の辺長 $s_n=4^{-n}$ を使う。任意の直線 $\ell=x+V$ に対し、[GMT12の横方向の質量補題](../GMT12/index.md#lem-gmt12-corner-mass)から $\operatorname{dist}(Q',\ell)\ge s_n/10$ を満たす子正方形 $Q'$ を取れるとする。$r_n=2s_n$ で円錐外の長さを下から評価し、$V$ が近似接線でないことを示せ。

<!-- solution-start -->
#### 詳細解答

$Q'$ の辺長は $s_n/4$ であり、$\mathcal H^1(K\cap Q')\ge s_n/(4C)$ です。$x$ と $Q'$ の全点は同じ辺長 $s_n$ の親正方形にあるので、$y\in Q'$ なら $|y-x|\le\sqrt2s_n<r_n$ です。さらに直線との距離が $s_n/10$ 以上だから

$$
\frac{\operatorname{dist}(y-x,V)}{|y-x|}
\ge\frac{s_n/10}{2s_n}=\frac1{20}>\frac1{40}.
$$

従って $K\cap Q'$ は全て円錐外かつ半径 $r_n$ の球内にあり、

$$
\frac{\mathcal H^1(K\cap B(x,r_n)\setminus X(x,V,1/40))}{r_n}
\ge\frac{s_n/(4C)}{2s_n}=\frac1{8C}.
$$

$r_n\to0$ でも下界が残るため、円錐外測度が $o(r)$ という条件を満たしません。[近似接線の定義](../GMT15/index.md#def-gmt15-approximate-tangent)の「全ての $\varepsilon$」はこの一つの $\varepsilon=1/40$ で否定できます。
<!-- solution-end -->

### GMT16-B04 斜めの射影が区間になる理由
- Level: B
- 目安時間: 30分

$K=C\times C$ と $v=(2,1)/\sqrt5$ に対し、$\pi_v(K)=[0,3/\sqrt5]$ を四進展開から示せ。$\pi_{e_1}(K)$ と比較し、純非整流性から「すべての方向で射影が零」とは言えない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

各座標を $x=\sum3a_j4^{-j}$、$y=\sum3b_j4^{-j}$ と書くと、$2x+y=3\sum(2a_j+b_j)4^{-j}$ です。組 $(a_j,b_j)=(0,0),(0,1),(1,0),(1,1)$ に対して $2a_j+b_j=0,1,2,3$ の全てを取ります。

任意の $t\in[0,1]$ に四進展開 $t=\sum d_j4^{-j}$（$d_j\in\{0,1,2,3\}$）を選び、各桁 $d_j=2a_j+b_j$ を満たす組を選べば $(x,y)\in K$ で $2x+y=3t$ です。逆に各桁の最大値3から $0\le2x+y\le3$ です。従って $\pi_vK=[0,3/\sqrt5]$ で長さは $3/\sqrt5$。一方、水平射影は $C$ で、その $n$ 段階被覆の直径総和 $2^{-n}$ が0へ行くので長さ0です。

[GMT12の純非整流性](../GMT12/index.md#thm-gmt12-corner-pure)はLipschitz像との交わりを測る条件です。射影で異なる点が重なることを禁止しないため、正の長さを持つ**例外方向**の存在と両立します。
<!-- solution-end -->

### GMT16-C01 零測度の付着物を含む混合集合
- Level: C
- 目安時間: 45分

$S=[0,1]\times\{0\}$、$K'=K+(2,2)$、$N=\mathbb Q^2\cap[0,4]^2$、$E=S\cup K'\cup N$ とする。以下を順に示せ。

1. $E$ はBorelで有限の $\mathcal H^1$ 測度を持つ。
2. $R=S\cup N$、$P=K'\setminus N$ は互いに素な分解で、$R$ は可算1整流可能、$P$ は純1非整流可能である。
3. 水平方向 $e_1$ と $v=(2,1)/\sqrt5$ について、$\mathcal H^1(\pi_{e_1}E)$ と $\mathcal H^1(\pi_vP)$ を求めよ。
4. $\mathcal H^1$-ほとんどすべての $x\in S$ では $E$ は水平の近似接線を持つ一方、$x\in P$ では近似接線を持たないことを説明せよ。

<!-- solution-start -->
#### 詳細解答

**1. 可測性と有限性。** $S,K'$ はコンパクト、$N$ は可算集合でBorelです。よって $E$ はBorelです。$\mathcal H^1(N)=0$、$S\cap K'=\varnothing$ なので

$$
\mathcal H^1(E)=\mathcal H^1(S)+\mathcal H^1(K')
=1+\mathcal H^1(K),
\quad 0<\mathcal H^1(K)<\infty.
$$

**2. 成分の定義確認。** $R\cap P=\varnothing$ は、$S\cap K'=\varnothing$、$P$ から $N$ を除いたことによります。また $R\cup P=S\cup N\cup(K'\setminus N)=E$ です。$S$ はLipschitz像、$N$ は長さ0なので、[GMT12の零集合付着の安定性](../GMT12/index.md#prop-gmt12-stability)より $R$ は可算1整流可能です。$P\subset K'$ で、$K'$ は純1非整流可能なので、任意のLipschitz像 $f(\mathbb R)$ に対し

$$
\mathcal H^1(P\cap f(\mathbb R))
\le\mathcal H^1(K'\cap f(\mathbb R))=0.
$$

従って $P$ も純1非整流可能です。

**3. 射影像。** 水平方向では $\pi_{e_1}(S)=[0,1]$、$\pi_{e_1}(K')=2+C$ は長さ0、$\pi_{e_1}(N)$ は可算で長さ0なので、可測集合の和の長さは $\mathcal H^1(\pi_{e_1}E)=1$ です。

$\pi_v(K')=\pi_v(K)+6/\sqrt5=[6/\sqrt5,9/\sqrt5]$ は[本章の射影命題](#prop-gmt16-projection-contrast)から長さ $3/\sqrt5$ です。$P=K'\setminus N$ について、$\pi_v(K')\setminus\pi_v(P)\subset\pi_v(N)$ は可算で長さ0です。よって

$$
\mathcal H^1(\pi_vP)=\mathcal H^1(\pi_vK')
=\frac3{\sqrt5}.
$$

**4. 接線。** $x\in S$ から $K'$ までの距離は正で、$N$ は長さ0です。線分の内点では十分小さい球で $\mathcal H^1(E\cap B(x,r))=2r$、水平線以外の正測度部分はないので、密度1と円錐外測度0を満たします。端点は零測度の例外です。

一方 $x\in P\subset K'$ から $S$ までの距離は正で、$N$ の長さは0です。従って十分小さい球における $E$ の長さと円錐外長さは、平行移動された $K$ のものと一致します。[四隅集合の接線不存在補題](#lem-gmt16-corner-no-tangent)の下界がそのまま成り立つため、$P$ のどの点でも $E$ は近似接線を持ちません。$\square$
<!-- solution-end -->

## まとめ

- 有限 $\mathcal H^m$ 測度のBorel集合は、[分解定理](#thm-gmt16-decomposition)により可算整流可能部分と純非整流部分へ分かれ、零測度集合の移し替えを除いて一意です。
- 整流可能成分では、[GMT15の密度・近似接平面](../GMT15/index.md#thm-gmt15-rectifiable-density-tangent)を元の集合にも移せます。逆向きの一般判定は、別途幾何的な議論が必要です。
- [四隅Cantor集合](#lem-gmt16-corner-no-tangent)は正で有限の長さを持ち、どの点でも近似接線を持ちません。それでも[方向によって正の長さの射影](#prop-gmt16-projection-contrast)を持ちます。

次のGMT17「Besicovitch--Federer射影判定 I」では、個別の射影計算を越えて、有限面積の集合に対する方向平均と整流可能性をつなぐ幾何的補題を準備します。
