# MFL33 Oversmoothing・長距離ボトルネック

<!-- definition-example-audit: strict -->

## 1. 遠くまで届くことと、届いた情報を保つことは別

[MFL32の多項式フィルタの局所性](../MFL32/index.md#thm-mfl32-k-hop)によれば、$K$ 層の一次伝播は高々 $K$ 辺先を参照できる。では層を深くすれば、それだけ遠方の情報をうまく使えるだろうか。問題は二つある。

1. 同じ平均操作を何度も行うと、もとは違った頂点の特徴が似通う。これが **oversmoothing（過平滑化）** である。
2. 多数の遠方入力が狭い中継路を通るとき、必要な独立情報を少数の特徴成分へ圧縮しきれない。これが **oversquashing（過圧縮）** の典型的な機構である。

前者は**全体の特徴差の減衰**、後者は**遠方情報への感度と中継表現の容量**を調べる。原因も診断指標も同じではない。この講義では有限グラフと線形拡散、および明示的に限定した中継模型の中で証明する。任意の非線形GNNが必ず同じ収束をする、あるいはグラフの橋を一本増やせば必ず学習が改善する、とまでは主張しない。

基本設定は $n\ge2$ 頂点の有限無向グラフ $G$、非負対称重み $w_{ij}=w_{ji}\ge0$、$w_{ii}=0$ である。$d_i=\sum_jw_{ij}$、$D=\operatorname{diag}(d_i)$、$L=D-W$ と置く。これは[SGT1で定義した組合せLaplacian](../../../計算系/SGT/SGT1/index.md#def-sgt1-laplacian)で、辺は $w_{ij}>0$ のときに限る。$d_{\max}=\max_i d_i>0$ を仮定する。最初は連結グラフを扱い、連結性を外した反例を後で確かめる。

## 2. 自分を少し残して平均する lazy diffusion

一度に隣接点へ全て移してしまうと、例えば隣り合う二頂点を行き来する振動が起こりうる。[SGT2の遷移行列](../../../計算系/SGT/SGT2/index.md#def-sgt2-transition)で見た現象である。そこで、自分の値を半分以上残し、残りだけ辺に沿って混ぜる。$\tau$ を一層当たりのステップ幅と呼び、以下では $0<\tau\le1/(2d_{\max})$ に制限する。

<a id="def-mfl33-lazy-diffusion"></a>

<!-- formal-statement-start -->
> **定義（lazy graph diffusion）**
>
> $n\ge2$ の有限無向非負重み付きグラフで $d_{\max}>0$ とし、$L=D-W$、$0<\tau\le1/(2d_{\max})$ とする。列ベクトル $x\in\mathbb R^n$ に作用する一次伝播を

$$
B_\tau=I-\tau L,\qquad (B_\tau x)_i=(1-\tau d_i)x_i+\tau\sum_{j\ne i}w_{ij}x_j
$$

> と定め、$k$ 層の出力を $x^{(k)}=B_\tau^kx^{(0)}$（$k=0,1,\ldots$）とする。特徴が $q$ 成分なら $X\in\mathbb R^{n\times q}$ の各列へ同じ $B_\tau$ を掛け、$X^{(k)}=B_\tau^kX$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl33-lazy-diffusion -->
**定義の確認**：三頂点の道。辺 $1$—$2$ と $2$—$3$ の重みを1とすると $d=(1,2,1)$、$d_{\max}=2$ である。$\tau=1/4$ は許容範囲の上端で、[MFL32の三頂点行列](../MFL32/index.md#def-mfl32-polynomial-filter)から

$$
B_{1/4}=\begin{pmatrix}3/4&1/4&0\\1/4&1/2&1/4\\0&1/4&3/4\end{pmatrix}.
$$

各行の和は1、各成分は非負、対角成分は $3/4,1/2,3/4$ だから確かに「自分を半分以上残す」。$x^{(0)}=e_1$ なら

$$
x^{(1)}=(3/4,1/4,0)^\mathsf T,\qquad
x^{(2)}=(10/16,5/16,1/16)^\mathsf T.
$$

二回目の第一成分は $(3/4)(3/4)+(1/4)(1/4)=10/16$、第二成分は $(1/4)(3/4)+(1/2)(1/4)=5/16$、第三成分は $(1/4)(1/4)=1/16$ である。どちらも成分和が1のまま、徐々に右へ届く。
<!-- definition-example-end -->

<a id="thm-mfl33-lazy-spectrum"></a>

<!-- formal-statement-start -->
> **定理（lazy diffusionの確率性とスペクトル範囲）**
>
> $n\ge2$ の有限無向非負重み付きグラフで $d_{\max}>0$、$0<\tau\le1/(2d_{\max})$ とする。$B_\tau=I-\tau L$ は非負成分を持つ対称行列で、次を満たす。

$$
B_\tau\mathbf1=\mathbf1,\qquad\mathbf1^\mathsf TB_\tau=\mathbf1^\mathsf T,\qquad \sigma(B_\tau)\subset[0,1].
$$

> さらにグラフが連結で $L$ の固有値を昇順に並べると、$B_\tau$ の固有値は次のとおりである。

$$
0=\lambda_1<\lambda_2\le\cdots\le\lambda_n,\qquad
\mu_j=1-\tau\lambda_j,\quad
\mu_1=1,\quad 0\le\mu_j<1\ (j\ge2).
$$

> 固有値1は単純である。
<!-- formal-statement-end -->

**証明の見取り図。** ステップ幅を次数で制限すると行列の対角・非対角は非負になる。固有値については、辺の差の二乗和から $0\le\lambda_j\le2d_{\max}$ を得て $1-\tau\lambda_j$ に代入する。

<!-- proof-start -->
### 証明

$i\ne j$ では $(B_\tau)_{ij}=\tau w_{ij}\ge0$。対角では $(B_\tau)_{ii}=1-\tau d_i\ge1/2$ である。$L\mathbf1=0$ は各行の $d_i-\sum_jw_{ij}=0$ から従い、$B_\tau\mathbf1=\mathbf1$。対称性から左側も $\mathbf1^\mathsf TB_\tau=\mathbf1^\mathsf T$ となる。

[SGT1のDirichletエネルギー公式](../../../計算系/SGT/SGT1/index.md#thm-sgt1-dirichlet)を $v\in\mathbb R^n$ へ適用すると、$w_{ij}\ge0$ によって

$$
0\le v^\mathsf TLv=\sum_{i<j}w_{ij}(v_i-v_j)^2
\le2\sum_{i<j}w_{ij}(v_i^2+v_j^2)
=2\sum_i d_iv_i^2\le2d_{\max}\|v\|_2^2.
$$

中央の不等式には $(a-b)^2\le2(a^2+b^2)$ を使った。[実対称行列のスペクトル定理](../../../基礎科目/F0/F0-00F1/index.md#thm-real-symmetric-spectral)により任意の固有ベクトル $u_j\ne0$ を代入して $0\le\lambda_j\le2d_{\max}$。$B_\tau u_j=(I-\tau L)u_j=(1-\tau\lambda_j)u_j$ だから $0\le\mu_j\le1$。

連結なら[SGT1の核と連結成分の定理](../../../計算系/SGT/SGT1/index.md#thm-sgt1-kernel-components)により $\ker L=\operatorname{span}\{\mathbf1\}$、従って $\lambda_1=0$ が単純で $\lambda_2>0$。$\tau>0$ から $\mu_j<1$（$j\ge2$）を得る。□
<!-- proof-end -->

$B_\tau$ が行確率行列なのは「各頂点で平均する」という意味であり、**対称かつ列和も1**なので、全頂点の単純平均 $\bar x=n^{-1}\mathbf1^\mathsf Tx$ は各層で保たれる。非正則グラフで $D^{-1}W$ を使えば一般に単純平均ではなく次数重み付き平均が保たれる。二つを混同しない。

## 3. 何をもって「特徴が潰れた」と判定するか

グラフ信号が全頂点で同じベクトルなら、頂点を区別する差はない。そこで初期特徴から全頂点の平均を引き、その残りの大きさを測る。$\mathbf1=(1,\ldots,1)^\mathsf T$ とし、$C=I-\mathbf1\mathbf1^\mathsf T/n$ と置くと、$CX$ は各行から列ごとの平均を引いた行列になる。$\|A\|_F^2=\sum_{i,a}A_{ia}^2$ はFrobeniusノルムである。

<a id="def-mfl33-oversmoothing-measure"></a>

<!-- formal-statement-start -->
> **定義（中心化特徴のoversmoothing指標）**
>
> $n\ge2$ 頂点と $q\ge1$ 個の実特徴 $X\in\mathbb R^{n\times q}$、上のlazy diffusion $B_\tau$ を考える。中心化行列と変動量を

$$
C=I-\frac{\mathbf1\mathbf1^\mathsf T}{n},\qquad
X^{(k)}=B_\tau^kX,\qquad V_k=\|CX^{(k)}\|_F
$$

> と定める。$V_0>0$ なら $S_k=V_k/V_0$、$V_0=0$ なら $S_k=0$ とする。$V_k\to0$ を、この線形拡散で頂点間の特徴差が消えるという意味の oversmoothing と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl33-oversmoothing-measure -->
**定義の確認**。三頂点の道で $X=e_1$（$q=1$）なら $\bar X=1/3$ だから

$$
CX=(2/3,-1/3,-1/3)^\mathsf T,\qquad V_0^2=4/9+1/9+1/9=2/3.
$$

第一層は $(3/4,1/4,0)^\mathsf T$ で平均 $1/3$ を保つため、

$$
CX^{(1)}=(5/12,-1/12,-4/12)^\mathsf T,\quad
V_1^2=(25+1+16)/144=7/24,\quad S_1^2=7/16.
$$

全ての値が一致したわけではないが、$S_1=\sqrt7/4<1$ へ縮小した。入力が初めから定数なら $V_0=V_k=0$ であり、$0/0$ を計算せず定義の後者を使う。
<!-- definition-example-end -->

頂点間の差と $V_k$ が同じ現象を表す理由を計算する。$H_i\in\mathbb R^q$ を行 $i$、$\bar H=n^{-1}\sum_i H_i$ とすると

$$
\sum_{i<j}\|H_i-H_j\|_2^2
=\frac12\sum_{i,j}(\|H_i\|^2+\|H_j\|^2-2H_i\cdot H_j)
=n\sum_i\|H_i\|^2-\Big\|\sum_iH_i\Big\|^2
=n\sum_i\|H_i-\bar H\|_2^2=n\|CH\|_F^2.
$$

したがって $V_k\to0$ は、有限個の頂点のすべての対について $\|X_i^{(k)}-X_j^{(k)}\|\to0$ と同値である。単に分類器の精度が悪化したことだけを oversmoothing の定義にはしていない。

<a id="thm-mfl33-spectral-decay"></a>

<!-- formal-statement-start -->
> **定理（中心化特徴のスペクトル減衰）**
>
> $n\ge2$ 頂点の連結な有限無向非負重み付きグラフで $d_{\max}>0$、$0<\tau\le1/(2d_{\max})$ とする。$L$ の正規直交固有ベクトルを $u_1=\mathbf1/\sqrt n,u_2,\ldots,u_n$、固有値を $0=\lambda_1<\lambda_2\le\cdots\le\lambda_n$ とする。任意の $X\in\mathbb R^{n\times q}$ と整数 $k\ge0$ について

$$
V_k^2=\sum_{j=2}^n(1-\tau\lambda_j)^{2k}\|u_j^\mathsf TX\|_2^2,
\qquad 0\le V_k\le(1-\tau\lambda_2)^kV_0.
$$

> 特に $X^{(k)}\to\mathbf1\bar X$、$\bar X=n^{-1}\mathbf1^\mathsf TX\in\mathbb R^{1\times q}$。$V_0>0$ のとき $S_k\le(1-\tau\lambda_2)^k\to0$。$X=u_2$（$q=1$）なら上界は全 $k$ で等号になる。
<!-- formal-statement-end -->

**証明の見取り図。** 平均方向 $u_1$ の倍率だけが1で残り、その他のモードは $[0,1)$ 倍される。$k$ 回の倍率を二乗して足し、最大の残存倍率 $1-\tau\lambda_2$ でくくる。

<!-- proof-start -->
### 証明

[スペクトル乗数の直交固有展開](../MFL32/index.md#def-mfl32-spectral-multiplier)に $g(\lambda)=(1-\tau\lambda)^k$ を代入すると

$$
B_\tau^kX=\sum_{j=1}^n(1-\tau\lambda_j)^ku_j(u_j^\mathsf TX).
$$

$C=I-u_1u_1^\mathsf T$ であり、$Cu_1=0$、$Cu_j=u_j$（$j\ge2$）。従って

$$
CB_\tau^kX=\sum_{j=2}^n(1-\tau\lambda_j)^ku_j(u_j^\mathsf TX).
$$

直交性によって異なる $j$ の行列はFrobenius内積で直交する。実際、$j\ne\ell$ の交差項の跡は $\operatorname{tr}[(X^\mathsf Tu_j)(u_j^\mathsf Tu_\ell)(u_\ell^\mathsf TX)]=0$。各項のノルム二乗は $\|u_j\|_2^2\|u_j^\mathsf TX\|_2^2=\|u_j^\mathsf TX\|_2^2$ で、第一式を得る。

前定理より $0\le1-\tau\lambda_j\le1-\tau\lambda_2<1$（$j\ge2$）。各項でこの上界を使い

$$
V_k^2\le(1-\tau\lambda_2)^{2k}\sum_{j=2}^n\|u_j^\mathsf TX\|_2^2
=(1-\tau\lambda_2)^{2k}V_0^2.
$$

平方根を取り、幾何級数的減衰を得る。残る $j=1$ 項は $u_1(u_1^\mathsf TX)=\mathbf1(\mathbf1^\mathsf TX/n)=\mathbf1\bar X$。また $u_2$ だけを入力にすれば残存倍率が正確に $1-\tau\lambda_2$ なので等号である。□
<!-- proof-end -->

三頂点の道では [MFL32の固有値 $0,1,3$](../MFL32/index.md#def-mfl32-spectral-multiplier)を使い、$\tau=1/4$ の倍率は $1,3/4,1/4$。初期 $e_1$ の固有分解を代入すると

$$
x^{(k)}=\frac13(1,1,1)^\mathsf T
+\frac12\left(\frac34\right)^k(1,0,-1)^\mathsf T
+\frac16\left(\frac14\right)^k(1,-2,1)^\mathsf T,
$$

$$
V_k^2=\frac12\left(\frac34\right)^{2k}+\frac16\left(\frac14\right)^{2k}.
$$

$k=1$ は $9/32+1/96=7/24$ で上の直接計算と一致する。**固有値差 $\lambda_2$ が大きいほど、この一定ステップ幅の上界では減衰が速い**。ただし異なるグラフで $d_{\max}$ や $\tau$ まで変えれば、単純な $\lambda_2$ だけの比較はできない。

### 仮定を外したら何が壊れるか

- **非連結**：辺のない二頂点では $L=0$、$B_\tau=I$（形式上は $d_{\max}=0$ なので上の定義域外）。より適切には二本の独立な辺を持つ四頂点グラフを取り、各成分で異なる定数 $x=(1,1,-1,-1)^\mathsf T$ を置く。$d_{\max}=1$ で $\tau=1/2$ を許すが $Lx=0$、$V_k=V_0>0$ のまま。連結性がなく $\lambda_2=0$ となったため、証明の $1-\tau\lambda_2<1$ が崩れる。
- **過大ステップ幅**：二頂点を重み1の辺で結ぶと $L$ の固有値は $0,2$。$\tau=1$ では $B_\tau=\left(\begin{smallmatrix}0&1\\1&0\end{smallmatrix}\right)$ で $x=(1,-1)^\mathsf T$ は毎回符号を反転し、$V_k$ は減らない。$\tau=1/2$ なら差のモードは0倍で一度に消える。前者では $0\le\mu_j<1$ という収縮機構が失われた。
- **非線形層**：活性化・学習重み・残差接続が入る一般GNNには、上の一つの固定対称 $B_\tau$ による固有モードの式をそのまま適用できない。現象を調べる必要はあるが、上の定理だけでは一般論にならない。

## 4. 細い橋は「速く一様化する」とは限らない

両側に密な塊があり、その間だけ細く結ばれたグラフを考える。左の三角形を $\{1,2,3\}$、右を $\{4,5,6\}$ とし、各三角形内部の三辺の重みを1、橋 $3$—$4$ の重みを $\varepsilon>0$ とする。全体は連結だが、左と右の差は橋一本しか通れない。このような局所的な接続の少なさをグラフの**隘路（bottleneck）**と呼ぶ。

<a id="prop-mfl33-bridge-gap"></a>

<!-- formal-statement-start -->
> **命題（二群間の細い橋と遅い混合）**
>
> 上記の6頂点、内部重み1、橋重み $\varepsilon>0$ の連結無向グラフの組合せLaplacianを $L_\varepsilon$ とする。第二固有値について $0<\lambda_2(L_\varepsilon)\le2\varepsilon/3$ が成り立つ。$d_{\max}=2+\varepsilon$、$0<\tau\le1/[2(2+\varepsilon)]$ のlazy diffusionでは、$u_2$ 方向の一層倍率は $1-\tau\lambda_2\ge1-2\tau\varepsilon/3$ である。
<!-- formal-statement-end -->

**証明の見取り図。** 両側の内部で定数、橋だけで符号が変わるテスト信号なら、辺の差のエネルギーは橋の重みだけに比例する。第二固有値の変分表示に代入して上界を得る。

<!-- proof-start -->
### 証明

$g=(1,1,1,-1,-1,-1)^\mathsf T$ と置く。$\mathbf1^\mathsf Tg=3-3=0$、$\|g\|_2^2=6$。全六本の三角形内部辺では差が0で、橋だけ $g_3-g_4=2$ だから[SGT1のDirichletエネルギー表示](../../../計算系/SGT/SGT1/index.md#thm-sgt1-dirichlet)を代入すると $g^\mathsf TL_\varepsilon g=\varepsilon\cdot2^2=4\varepsilon$。

[SGT1の第二固有値の変分表示](../../../計算系/SGT/SGT1/index.md#prop-sgt1-gap-variational)の仮定である連結性・対称非負重み・$g\perp\mathbf1$ は満たされた。よって

$$
0<\lambda_2(L_\varepsilon)
=\min_{v\ne0,\,v\perp\mathbf1}\frac{v^\mathsf TL_\varepsilon v}{\|v\|_2^2}
\le\frac{g^\mathsf TL_\varepsilon g}{\|g\|_2^2}
=\frac{4\varepsilon}{6}=\frac{2\varepsilon}{3}.
$$

橋の両端の次数だけが $2+\varepsilon$ なので $d_{\max}=2+\varepsilon$。前定理により $u_2$ の倍率は $1-\tau\lambda_2$、上界を代入すると主張を得る。□
<!-- proof-end -->

この命題は**減衰率の遅さの可能性**を具体的に示す。実際の初期信号 $g$ を一層動かすと、橋の両端以外の四頂点はそのままで

$$
B_\tau g=(1,1,1-2\tau\varepsilon,-1+2\tau\varepsilon,-1,-1)^\mathsf T,
$$

$$
V_1^2=4+2(1-2\tau\varepsilon)^2
=6-8\tau\varepsilon+8\tau^2\varepsilon^2.
$$

$\varepsilon\downarrow0$ なら一層の変化は小さい。一方、$k\to\infty$ を**固定した $\varepsilon>0$** で取れば連結性とスペクトル減衰定理から最終的には同じ平均0へ収束する。$\varepsilon=0$ の非連結模型と極限の順番を取り違えてはいけない。

## 5. もう一つの失敗：遠い入力を一つの中継特徴に押し込める

先ほどの弱い橋は混合も遅くする。しかし oversquashing で重要なのは**遠方の独立した入力を中継路が何成分として運べるか**である。例えば $m\ge2$ 個の葉 $s_1,\ldots,s_m$ が一つの中継頂点 $b$ に接続し、$b$ は出力頂点 $t$ に接続するとする。各葉から $t$ への最短距離は2で、$m$ を増やしても距離は同じだが、一つの中継頂点に集まる入力数は増える。

このグラフ上で「葉から $b$ に集め、その後 $b$ から $t$ へ渡す」という二段のmessage passingだけを取り出す。$b$ が実数一つしか保持しなければ、例えば $z=(x_1+\cdots+x_m)/m$ を送れるが、各葉の値をすべて復元するのは難しい。ここでいう**中継表現**は $b$ に保存・伝達される $d$ 次元ベクトル $z$ であり、$m$ 個の入力がそこへ集まる計算を調べる。

<a id="def-mfl33-relay-bottleneck"></a>

<!-- formal-statement-start -->
> **定義（中継表現のボトルネック）**
>
> $m\ge2$ 個の遠方入力を $x=(x_1,\ldots,x_m)\in U\subset\mathbb R^m$（$U$ は開集合）とする。一つの中継表現を経て下流の出力になる有限段の計算を

$$
Z:U\to\mathbb R^d,\qquad H:\mathbb R^d\to\mathbb R^r,\qquad F(x)=H(Z(x))
$$

> と表す。入力から下流への他の経路がなく、$d<m$ であるとき、この**一つの表現を必ず通る構成**を低次元中継ボトルネックと呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl33-relay-bottleneck -->
**定義の確認**。$m=3$、$d=1$、$U=\mathbb R^3$、$Z(x)=(x_1+x_2+x_3)/3$、$H(z)=(z,z,z)$ とすると、出力は $F(x)=(\bar x,\bar x,\bar x)$。入力 $x=(1,-1,0)$ と $x'=(0,0,0)$ は異なるのに、どちらも $Z=0$ となり出力も一致する。$d<m$ を具体的に満たし、全情報が $Z$ を通ることを明示した例である。たまたま全入力に同じ値が与えられれば $Z$ だけで十分なので、「中継がある」だけで全課題に失敗するとは言えない。
<!-- definition-example-end -->

感度を数字で見るには、[ML2-14のJacobian](../../../応用系/ML/ML2-14/index.md#thm-ml2-14-layer-jacobian)を使う。行は出力成分、列は入力成分である。特に一つの出力 $y=Z(x)=m^{-1}\sum_ix_i$ なら

$$
\frac{\partial y}{\partial x_i}=\frac1m\quad(i=1,\ldots,m),\qquad
\|J_y(x)\|_2=\sqrt{m\cdot(1/m)^2}=\frac1{\sqrt m}.
$$

葉から $t$ への**距離は常に2**なのに、一つの葉が出力に与える感度は $1/m$ へ小さくなる。この縮小は局所の平均集約によるもので、グラフ全体の $B_\tau^k$ が定数信号へ収束したという計算ではない。

<a id="prop-mfl33-relay-rank"></a>

<!-- formal-statement-start -->
> **命題（単一の中継表現によるrank制約）**
>
> $m>d\ge1$、$U\subset\mathbb R^m$ は空でない開集合とする。$Z:U\to\mathbb R^d$、$H:\mathbb R^d\to\mathbb R^m$ は各評価点で微分可能とする。遠方入力から出力への経路が $F=H\circ Z$ だけなら、全 $x\in U$ について

$$
\operatorname{rank}J_F(x)\le d<m
$$

> が成立する。従って $F(x)=x$ が開集合 $U$ 全体で成立することはない。
<!-- formal-statement-end -->

**証明の見取り図。** 変化の行き先は中継点で一度 $d$ 次元に制限される。微分した行列を二つ掛けても、その中継点の次元を越える独立方向は運べない。

<!-- proof-start -->
### 証明

[ML2-14の層のJacobian積](../../../応用系/ML/ML2-14/index.md#thm-ml2-14-layer-jacobian)へ内側 $Z:\mathbb R^m\to\mathbb R^d$ と外側 $H:\mathbb R^d\to\mathbb R^m$ を代入すると

$$
J_F(x)=J_H(Z(x))J_Z(x),\qquad
J_H\in\mathbb R^{m\times d},\quad J_Z\in\mathbb R^{d\times m}.
$$

行列積の各列は $J_H$ の $d$ 本の列の線形結合だから、積の列空間は $J_H$ の列空間に含まれ、$\operatorname{rank}J_F(x)\le\operatorname{rank}J_H\le d$。もし全 $x\in U$ で $F(x)=x$ なら、その開集合内の微小な座標方向に関する微分は恒等行列 $J_F(x)=I_m$、階数 $m$ となり矛盾する。□
<!-- proof-end -->

この証明には重要な射程がある。**固定した一回の低次元中継を全情報が必ず通る**場合の定理であって、同じ辺を複数層・複数時刻にわたって再利用し、複数のメッセージを時系列で送る構成や、skip connection、別経路、入力分布が低次元に制約された場合に、そのまま適用できない。$d<m$ も「ラベルが $m$ 種類なら必ず失敗する」という主張ではない。必要なタスクが $\sum_i x_i$ のみなら $d=1$ で正確に計算できる。

## 6. 二つを同じ指標で済ませない

| 何が失われるか | oversmoothing | oversquashingの中継模型 |
| --- | --- | --- |
| 主な対象 | 深さ $k$ とともに各頂点の特徴差が縮小 | 遠方の多くの独立入力が低次元の中継表現を通過 |
| 有限模型の指標 | $V_k=\|CB_\tau^kX\|_F$、$S_k$ | $\partial y/\partial x_i$、$\operatorname{rank}J_F$、区別不能入力対 |
| 証明できたこと | 連結・対称・非負・所定の $\tau$ で $S_k\to0$ | 単一の $d<m$ 中継では開集合上の恒等復元が不可能 |
| 主な注意 | 非線形・残差GNNへの無条件な拡張不可 | 一経路・一段中継の制約を他の通信形式へ無条件な拡張不可 |

「多層化で遠方に到達する」は[MFL30の受容範囲](../MFL30/index.md#prop-mfl30-locality)と[MFL32のK-hop局所性](../MFL32/index.md#thm-mfl32-k-hop)の話である。距離 $r$ を越えるまでは線形フィルタ $B_\tau^k$ の $(t,s)$ 成分は0だが、距離以下になってもその成分が大きいとは限らない。また感度が小さいことだけでrankの不足を証明したわけでもない。反対にrank不足は多くの入力を独立に再現できないことを示すが、**個々の入力の影響が必ず0になる**ことは意味しない。

対策にもトレードオフがある。残差接続や中間層の読み出しは単一の定数モードへの収束を避ける設計になりうるが、すべての学習器について保証はない。遠距離を結ぶ辺の追加・広い受容範囲・高次元の中継特徴は圧縮を緩めうるが、学習対象と無関係な混合や計算量の増加も起こる。学習精度とは別に**特徴差**と**遠方感度**を両方測る必要がある。

## 7. 再現実験：深さ・橋の細さ・中継幅

付属 [`oversmoothing_lab.py`](oversmoothing_lab.py) はPython標準ライブラリだけで実行できる。隣接重みから $L$ と $B_\tau$ を生成し、全頂点の中心化ノルム比 $S_k$、遠方入力から出力への線形感度 $(B_\tau^k)_{t,s}$、二群の橋重みを変えた変化、単一中継の感度 $1/m$ を**別々の列**で示す。

```bash
python3 textbook/volumes/dream_thater/応用系/MFL/MFL33/oversmoothing_lab.py --graph path --depth 8 --lazy 1
python3 textbook/volumes/dream_thater/応用系/MFL/MFL33/oversmoothing_lab.py --graph bridge --bridge-weight 0.05 --depth 12 --lazy 1
python3 textbook/volumes/dream_thater/応用系/MFL/MFL33/oversmoothing_lab.py --graph bridge --bridge-weight 1 --depth 12 --lazy 1 --sources 8
```

~~~python-file-lab
# lab-id: MFL33-OVERSMOOTHING-BOTTLENECK
# lab-title: 過平滑化と遠方ボトルネックを別々に測る
# lab-file: textbook/volumes/dream_thater/応用系/MFL/MFL33/oversmoothing_lab.py
# timeout-ms: 60000
# lab-preset: 三頂点の道・固有減衰 | --graph path --depth 8 --lazy 1 --sources 4
# lab-preset: 細い橋・遅い混合 | --graph bridge --bridge-weight 0.05 --depth 12 --lazy 1 --sources 8
# lab-preset: 太い橋・感度比較 | --graph bridge --bridge-weight 1 --depth 12 --lazy 1 --sources 8
~~~

実験で $k$ を変えても $S_k$ が1を越えないこと、道のモード $3/4$ と $1/4$ の減衰式、$k$ がグラフ距離より小さい間の遠方感度0を照合する。細い橋で $S_k$ が残ることは、oversquashingの定理の証明ではない。逆に中継平均のrank不足は、$k\to\infty$ の極限を使わずに成立する。数値の一致は有限設定での検算であり、一般的なGNN精度の保証ではない。

## 8. 演習

### Level A：定義と有限の行列を確かめる

<a id="ex-mfl33-a01"></a>

### MFL33-A01 三頂点のlazy行列

- Level: A
- 問題: 辺重み1の道 $1$—$2$—$3$ で $\tau=1/4$ を用いる。$B_\tau$ と $B_\tau e_1$、$B_\tau^2e_1$ を計算し、行和・列和・非負性を検証せよ。

<a id="ex-mfl33-a02"></a>

### MFL33-A02 特徴差の指標

- Level: A
- 問題: 三頂点の特徴 $x=(2,0,1)^\mathsf T$ について $Cx$ と $V_0^2$ を求め、$\sum_{i<j}(x_i-x_j)^2=3V_0^2$ を直接計算で確かめよ。

<a id="ex-mfl33-a03"></a>

### MFL33-A03 固有モードの減衰

- Level: A
- 問題: 三頂点の道の $L$ の固有値 $0,1,3$、$\tau=1/4$ とし、$x=(1,0,-1)^\mathsf T$ に対して $B_\tau^kx$ と $S_k$ を求めよ。$\|x\|_2$ はいくらか。

<a id="ex-mfl33-a04"></a>

### MFL33-A04 平均中継の感度

- Level: A
- 問題: $m=4$ 個の遠方入力を $z=(x_1+x_2+x_3+x_4)/4$ にまとめる。$z$ のJacobian、各入力への感度、そのEuclidノルムを求め、$x=(1,-1,0,0)$ と $x'=0$ の出力を比較せよ。

### Level B：定理・仮定・二つの診断をつなぐ

<a id="ex-mfl33-b01"></a>

### MFL33-B01 拡散の固有値範囲を自力で証明

- Level: B
- 問題: 有限無向非負重み付きグラフで $d_{\max}>0$、$0<\tau\le1/(2d_{\max})$ とする。辺の二乗差の和だけを出発点にして $0\le\lambda(L)\le2d_{\max}$ を示し、$B_\tau$ が非負・行確率・対称で固有値が $[0,1]$ に入ることを証明せよ。

<a id="ex-mfl33-b02"></a>

### MFL33-B02 連結性を外すと何が残るか

- Level: B
- 問題: 互いに交わらない重み1の二本の辺 $\{1,2\}$、$\{3,4\}$ を考え、$\tau=1/2$、$x=(1,1,-1,-1)^\mathsf T$ とする。$B_\tau^kx$、$V_k$ を求め、[スペクトル減衰定理](#thm-mfl33-spectral-decay)の証明のどの不等号が厳密にならないか説明せよ。

<a id="ex-mfl33-b03"></a>

### MFL33-B03 細い橋のRayleigh商

- Level: B
- 問題: 各三角形内部の辺重みが1で、頂点3と4を重み $\varepsilon>0$ でつないだ六頂点グラフを考える。$0<\tau\le1/[2(2+\varepsilon)]$ とする。$g=(1,1,1,-1,-1,-1)^\mathsf T$ の[辺上の差の二乗和](../../../計算系/SGT/SGT1/index.md#thm-sgt1-dirichlet)、$\|g\|^2$、$\lambda_2$ の上界を求めよ。さらに $B_\tau g$ と $V_1^2$ を求めよ。

<a id="ex-mfl33-b04"></a>

### MFL33-B04 rank制約とタスクの違い

- Level: B
- 問題: $m=3$、$Z(x)=(x_1+x_2+x_3)/3$、$H(z)=(z,z,z)$ とする。$J_Z$、$J_H$ と $J_{H\circ Z}$ の階数を計算せよ。「全入力の復元」には失敗する一方、「三入力の平均の予測」は正確であることを、目標写像を明示して説明せよ。

### Level C：二つの失敗を分離して診断する

<a id="ex-mfl33-c01"></a>

### MFL33-C01 深い拡散と一回中継の統合

- Level: C
- 問題: （A）道 $1$—$2$—$3$ の重みは1、$\tau=1/4$、$x=e_1$ とする。（B）$m\ge2$ 個の葉の値 $z=m^{-1}\sum_ix_i$ を中継して下流で $m$ 個を復元したいとする。
  1. Aの $B_\tau$ の全固有倍率を求め、$V_k^2$ を $k$ の式で書き、$k=1$ の直接計算と照合せよ。
  2. Aで出力頂点3の入力頂点1への感度 $(B_\tau^k)_{31}$ は $k=0,1,2$ でどうなるか。到達可能性とoversmoothingの違いを述べよ。
  3. Bで中継が $d=1$ のまま $m$ を増やしたとき、各入力への感度とrank制約を求め、復元不能の入力対を一つ作れ。
  4. Bのタスクを「平均だけの計算」に変更すると障害は残るか。AとBの失敗に対する対策を一つずつ挙げ、それぞれを普遍的保証とみなせない理由を述べよ。

## 9. 演習の詳細解答

<!-- solution-start -->

### Level A

**MFL33-A01 解答。** $d=(1,2,1)$、$L=\left(\begin{smallmatrix}1&-1&0\\-1&2&-1\\0&-1&1\end{smallmatrix}\right)$ より

$$
B_\tau=I-L/4=\begin{pmatrix}3/4&1/4&0\\1/4&1/2&1/4\\0&1/4&3/4\end{pmatrix}.
$$

第一列が $Be_1=(3/4,1/4,0)^\mathsf T$。二度目は第一成分 $9/16+1/16=10/16$、第二成分 $3/16+2/16=5/16$、第三成分 $1/16$。各行の和は $1,1,1$、対称だから各列も和1、全成分が非負である。

**MFL33-A02 解答。** 平均は $(2+0+1)/3=1$、従って $Cx=(1,-1,0)^\mathsf T$、$V_0^2=1^2+(-1)^2+0^2=2$。三対の差の二乗は $(2-0)^2+(2-1)^2+(0-1)^2=4+1+1=6=3\cdot2$。これは本文の[頂点間差と中心化ノルムの恒等式](#def-mfl33-oversmoothing-measure)の有限検算である。

**MFL33-A03 解答。** $x=(1,0,-1)^\mathsf T$ は $Lx=x$ なので $B_\tau x=(1-1/4)x=3x/4$。帰納的に $B_\tau^kx=(3/4)^kx$。$\mathbf1^\mathsf Tx=0$、よって $Cx=x$、$\|x\|_2=\sqrt{1+0+1}=\sqrt2$。$V_k=(3/4)^k\sqrt2$、$S_k=(3/4)^k$ である。

**MFL33-A04 解答。** $J_z=(1/4,1/4,1/4,1/4)$ は $1\times4$。各成分への感度 $1/4$、ノルムは $\sqrt{4(1/4)^2}=1/2$。$x=(1,-1,0,0)$ は和0で $z=0$、$x'=0$ でも $z=0$。入力の差の方向 $(1,-1,0,0)$ が中継で消えたのである。

### Level B

**MFL33-B01 解答。** [Dirichletエネルギーの辺表示](../../../計算系/SGT/SGT1/index.md#thm-sgt1-dirichlet)から任意の $v$ に対して $0\le v^\mathsf TLv=\sum_{i<j}w_{ij}(v_i-v_j)^2$。$(v_i-v_j)^2\le2(v_i^2+v_j^2)$ を各辺に入れ、$\sum_{j\ne i}w_{ij}=d_i$ でまとめると

$$
v^\mathsf TLv\le2\sum_i d_iv_i^2\le2d_{\max}\|v\|_2^2.
$$

固有ベクトル $v$ を代入すると $0\le\lambda\le2d_{\max}$。[対称行列の固有分解](../../../基礎科目/F0/F0-00F1/index.md#thm-real-symmetric-spectral)で $B_\tau$ の同じ固有ベクトルへの倍率は $1-\tau\lambda\in[0,1]$。$B_{ii}=1-\tau d_i\ge1/2$、$B_{ij}=\tau w_{ij}\ge0$（$i\ne j$）。$\sum_j B_{ij}=1-\tau d_i+\tau\sum_{j\ne i}w_{ij}=1$、$W$ と $D$ の対称性から $B^\mathsf T=B$ である。

**MFL33-B02 解答。** $L$ は二つの $\left(\begin{smallmatrix}1&-1\\-1&1\end{smallmatrix}\right)$ を対角に並べた形で、各辺の両端に等値を持つ $x$ では $Lx=0$。したがって $B_\tau^kx=x$（$k\ge0$）。

全頂点平均は0で、$Cx=x$ となる。よって $V_k=\sqrt{1+1+1+1}=2$、$S_k=1$ である。

非連結なので[核と成分の定理](../../../計算系/SGT/SGT1/index.md#thm-sgt1-kernel-components)で零固有値の重複度は2、$\lambda_2=0$。証明の $1-\tau\lambda_2<1$ が等号1となり、指数減衰が生じない。

**MFL33-B03 解答。** 三角形内部で $g$ は定数、橋 $3$—$4$ だけ差2だから $g^\mathsf TLg=\varepsilon(1-(-1))^2=4\varepsilon$。$\|g\|_2^2=6$、$\sum_i g_i=0$。連結かつ非負重みなので[第二固有値の変分表示](../../../計算系/SGT/SGT1/index.md#prop-sgt1-gap-variational)から $0<\lambda_2\le(4\varepsilon)/6=2\varepsilon/3$。$Lg$ は頂点3に $2\varepsilon$、頂点4に $-2\varepsilon$、それ以外は0。よって

$$
Bg=(1,1,1-2\tau\varepsilon,-1+2\tau\varepsilon,-1,-1)^\mathsf T.
$$

対称性で平均0を保存し、$V_1^2=\|Bg\|^2=4+2(1-2\tau\varepsilon)^2=6-8\tau\varepsilon+8\tau^2\varepsilon^2$。$\varepsilon>0$ を固定した無限層極限は0へ向かうが、$\varepsilon=0$ の非連結グラフではそうならない。

**MFL33-B04 解答。**

$$
J_Z=(1/3,1/3,1/3),\qquad
J_H=\begin{pmatrix}1\\1\\1\end{pmatrix},\qquad
J_{H\circ Z}=\frac13\begin{pmatrix}1&1&1\\1&1&1\\1&1&1\end{pmatrix}.
$$

前二つはそれぞれ階数1、積も全列が一致して階数1である。$F(x)=x$ という目標は例えば $x=(1,-1,0)$ で $F(x)=0\ne x$ と失敗する。一方、目標 $T(x)=(x_1+x_2+x_3)/3$ に対しては中継直後の $Z(x)=T(x)$ そのものが正答である。容量不足はタスクに依存する。

### Level C

**MFL33-C01 解答。**

1. Aの $L$ の固有値は $0,1,3$。$B=I-L/4$ の倍率は $1,3/4,1/4$。$e_1$ を三つの直交固有方向 $(1,1,1)$、$(1,0,-1)$、$(1,-2,1)$ へ分解すると、中心化後の固有成分の平方ノルムはそれぞれ $1/2,1/6$ となる。従って

$$
V_k^2=\frac12(3/4)^{2k}+\frac16(1/4)^{2k}.
$$

$k=1$ なら $9/32+1/96=28/96=7/24$。直接 $Be_1=(3/4,1/4,0)$ から平均 $1/3$ を引いた $(5/12,-1/12,-4/12)$ の平方和も $(25+1+16)/144=7/24$ で一致する。

2. $k=0$ では $B^0=I$ なので $(B^0)_{31}=0$。$k=1$ では $B_{31}=0$。$k=2$ では

$$
(B^2)_{31}=\sum_{j=1}^3B_{3j}B_{j1}
=0\cdot(3/4)+(1/4)(1/4)+(3/4)\cdot0=1/16.
$$

距離2の入力が二層で初めて届くのは[局所性定理](../MFL32/index.md#thm-mfl32-k-hop)に整合するが、$k\to\infty$ では全頂点の出力は平均 $1/3$ へ潰れる。到達可能性の拡大と特徴差の保存は別の要求である。

3. Bでは $\partial z/\partial x_i=1/m$、$J_Z$ は $1\times m$ で階数1。下流の $H:\mathbb R\to\mathbb R^m$ と合成したJacobianの階数も高々1であり、$m\ge2$ に対し恒等写像の階数 $m$ に足りない。$x=e_1-e_2$ と $x'=0$ はどちらも $z=0$ で区別不能である。

4. 平均だけが目標なら $z$ は厳密にその目標を計算しており、容量不足は障害にならない。Aでは深い層から浅い層へ残差・skipを設けて差の成分を保持する設計が候補だが、学習済み重み・非線形性まで含めた性能保証ではない。Bでは必要な独立信号数に合わせて中継表現次元 $d$ を増やす、あるいは別経路を用意する候補があるが、目標タスク・有限学習データ・計算予算次第で成否は変わる。
<!-- solution-end -->

## 10. 次の講義へ

MFL30〜MFL33で、頂点番号に等変な近傍集約、識別の限界、スペクトルフィルタ、深い情報伝播の二つの失敗を区別できた。次のMFL34では、点群の**距離・角度・相対位置**をグラフへ組み込み、座標を回転・反転したときに保たれる量と変わる量を調べる。

参考：Uri Alon & Eran Yahav, [On the Bottleneck of Graph Neural Networks and its Practical Implications](https://arxiv.org/abs/2006.05205)；Jake Topping et al., [Understanding over-squashing and bottlenecks on graphs via curvature](https://arxiv.org/abs/2111.14522)。本章の定理はこれらの一般研究結果を無条件に引用したものではなく、明示した有限模型内で証明したものである。
