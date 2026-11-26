# ATOP25 局所ホモロジーと次元不変性

直線も平面も空間全体としては一点へ縮められます。従って普通のホモロジーだけでは、それらの次元を区別できません。しかし一点を取り除くと、直線は二つに分かれ、平面には一周する穴が生まれます。今回は空間全体と一点を除いた部分を対にして、その差を次数ごとの群として記録します。以下のホモロジーはすべて整数係数で、次数は非負整数です。

## 1. 点の周りの情報を取り出す

[相対ホモロジー群](../ATOP18/index.md#def-atop18-relative-homology) は、部分空間に入る鎖を零と見なすことで空間の対を調べる道具でした。点 $x$ だけを残して他の場所の鎖を無視すれば、点の周りの構造を調べられます。

<a id="def-atop25-local-homology"></a>

<!-- formal-statement-start -->
> **定義（局所ホモロジー群）**
> 位相空間 $X$ の点 $x$ における $k$ 次局所ホモロジー群を、次の相対群とする。

$$
L_k(X,x)=H_k(X,X\setminus\{x\};\mathbb Z).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-atop25-local-homology -->
**定義の確認**：$X=\{a,b\}$ を離散空間、$x=a$ とします。

特異単体の定義域は連結なので、その像は一点だけです。各次数の鎖群には $a,b$ に値を取る定数単体が一つずつあり、相対鎖では $b$ に値を取る単体を零と見なします。

従って商鎖群は各次数で一つの生成元を持ち、点 $a$ の鎖複体と境界作用素まで一致します。

[0次特異ホモロジーと道連結成分](../ATOP16/index.md#thm-atop16-h0-path-components) と [可縮空間の被約特異ホモロジー](../ATOP17/index.md#cor-atop17-contractible) により、$L_0(X,a)\cong\mathbb Z$、正次数は零です。点 $b$ の情報が消え、点 $a$ の情報だけが残りました。
<!-- definition-example-end -->

同相写像とは連続な全単射で逆写像も連続なものです。同相写像 $f:X\to Y$ は $x$ 以外の全点を $f(x)$ 以外へ送ります。

[相対ホモロジーの誘導準同型](../ATOP18/index.md#thm-atop18-relative-map) に $f$ と $f^{-1}$ を対の写像として適用すると、両者の誘導準同型の合成がそれぞれ恒等写像になります。従って

$$
L_k(X,x)\cong L_k(Y,f(x)).
$$

ここで点の対応も保存されます。空間全体を一点へ縮める普通のホモトピーでは、取り除く点以外の点がその点に移ることもあるので、この相対群の同型を直ちには得られません。

## 2. 小さな近傍だけを調べる

点から遠い場所を切り取っても、点の周りの相対群が変わらないことを証明します。以下、開近傍は点を含む開集合を指します。

<a id="thm-atop25-neighborhood"></a>

<!-- formal-statement-start -->
> **定理（局所ホモロジーの近傍不変性）**
> 位相空間 $X$ の点 $x$ について、$\{x\}$ が閉集合であるとする。$x$ の開近傍 $U$ を取る。包含が誘導する次の写像は、各 $k\ge0$ で同型である。

$$
L_k(U,x)\longrightarrow L_k(X,x).
$$
<!-- formal-statement-end -->

見取り図：相対群の第2成分は点以外の場所です。開近傍の外側はその第2成分の内部に含まれる閉集合なので、切除できます。

<!-- proof-start -->
### 証明

$A=X\setminus\{x\}$、$Z=X\setminus U$ と置きます。点集合が閉じているので $A$ は開集合であり、$\operatorname{int}_X A=A$ です。$U$ も開集合なので $Z$ は閉集合です。また $x\in U$ より $x\notin Z$ です。従って

$$
\overline Z=Z\subset A=\operatorname{int}_X A.
$$

[切除定理](../ATOP19/index.md#thm-atop19-excision) の条件が成立します。切除後の対は

$$
X\setminus Z=U,\qquad A\setminus Z=U\setminus\{x\}
$$

です。従って包含による相対群の同型は、まさに定理の写像です。
<!-- proof-end -->

例えば $\mathbb R$ の原点で、$U=(-1,1)$ でも $U=(-100,100)$ でも同じ群になります。点を含まない開集合では対の第1成分に点が属さないため、この定理を適用できません。

単に $x$ を含む集合であれば十分というわけでもありません。例えば $\{0\}\subset\mathbb R$ は開近傍ではなく、後で計算するようにその局所群は直線のものと異なります。

## 3. Euclid 空間の局所群

$D^n$ を $\mathbb R^n$ の閉単位球、$S^{n-1}$ をその境界とします。

$n=0$ のとき $\mathbb R^0$ は一点、$S^{-1}$ は空集合と約束します。穿孔球とは中心を取り除いた球です。穿孔球の各点を動径方向に境界へ動かすと、既習の円板と境界の対を使えるようになります。

<a id="thm-atop25-euclidean"></a>

<!-- formal-statement-start -->
> **定理（Euclid 空間の局所ホモロジー）**
> 非負整数 $n$ と $x\in\mathbb R^n$ に対し、各 $k\ge0$ で次が成立する。

$$
L_k(\mathbb R^n,x)\cong
\begin{cases}
\mathbb Z & k=n,\\
0 & k\ne n.
\end{cases}
$$
<!-- formal-statement-end -->

見取り図：平行移動で点を原点に移し、閉単位球と穿孔閉単位球の対に帰着します。穿孔球と境界のホモロジーの一致を対の長完全列に移し、[円板と境界の相対群](../ATOP22/index.md#lem-atop22-disk-relative)を使います。

<!-- proof-start -->
### 証明

平行移動 $y\mapsto y-x$ は逆写像 $z\mapsto z+x$ を持つ同相写像ですから、第1節の同相不変性によって $x=0$ の場合を計算すれば十分です。

$n=0$ では一点と空集合の対となり、[円板と境界の相対群](../ATOP22/index.md#lem-atop22-disk-relative) の0次元の場合が結論を与えます。

$n\ge1$ とします。$B=\{y:\|y\|<1\}$ は $\mathbb R^n$ と $D^n$ の両方で原点の開近傍です。[局所ホモロジーの近傍不変性](#thm-atop25-neighborhood) をそれぞれに適用すると

$$
L_k(\mathbb R^n,0)\cong L_k(B,0)
\cong H_k(D^n,D^n\setminus\{0\})
$$

を得ます。ここで $P=D^n\setminus\{0\}$ と置きます。$S^{n-1}\subset P$ であり、$y\in P$ と $t\in[0,1]$ に対して

$$
F(y,t)=\left(1-t+\frac{t}{\|y\|}\right)y
$$

と定めると、分母は正で連続です。像のノルムは

$$
\|F(y,t)\|=(1-t)\|y\|+t
$$

であり、常に正で1以下です。$F(y,0)=y$、$F(y,1)=y/\|y\|$ です。境界上ではノルムが1なので全時刻で点を固定します。従って境界への [強変形レトラクトの条件](../ATOP3/index.md#def-atop3-strong-deformation-retract) を満たし、[ホモトピー同値と特異ホモロジー群](../ATOP17/index.md#cor-atop17-equivalence) により包含 $S^{n-1}\hookrightarrow P$ は全次数で同型を誘導します。

次に対の包含 $(D^n,S^{n-1})\hookrightarrow(D^n,P)$ を考えます。$A=S^{n-1}$ または $P$ と置くと、$k\ge1$ で比較する五項は

$$
\begin{gathered}
H_k(A)\to H_k(D^n)\to H_k(D^n,A)\\
\to H_{k-1}(A)\to H_{k-1}(D^n).
\end{gathered}
$$

です。上段に $A=S^{n-1}$、下段に $A=P$ を置きます。[対の長完全列の自然性](../ATOP18/index.md#thm-atop18-naturality) により、包含から誘導される五本の縦写像は四角形をすべて可換にします。

中央以外の四本は、境界の包含による同型または恒等写像です。[完全列の中央の比較](../ATOP21/index.md#lem-atop21-exact-comparison) によって中央も同型です。

$k=0$ では [対のホモロジー長完全列](../ATOP18/index.md#thm-atop18-long-exact) の末端から、相対群は $H_0(D^n)$ を第2成分の $H_0$ の像で割った群です。両側の第2成分の包含は同型を誘導するので像は一致し、相対群の写像も同型になります。

以上より全次数で

$$
H_k(D^n,P)\cong H_k(D^n,S^{n-1}).
$$

右辺は [円板と境界の相対群](../ATOP22/index.md#lem-atop22-disk-relative) により $k=n$ だけが $\mathbb Z$ です。これで全次数の計算が終わりました。
<!-- proof-end -->

| 空間 | 一点を除いた空間の形 | 零でない局所群 |
| --- | --- | --- |
| $\mathbb R^0$ | 空集合 | $L_0\cong\mathbb Z$ |
| $\mathbb R$ | 二つの半直線 | $L_1\cong\mathbb Z$ |
| $\mathbb R^2$ | 円周に変形収縮 | $L_2\cong\mathbb Z$ |
| $\mathbb R^3$ | 2次元球面に変形収縮 | $L_3\cong\mathbb Z$ |

直線では取り除いた点をまたぐ二つの成分、平面では点を回る円周が相対群に反映されます。正の次元では、穿孔空間の被約ホモロジーの非零次数より相対群の非零次数が一つ高くなることに注意してください。

## 4. 半空間の境界点

$n\ge1$ とし、閉半空間を

$$
Q^n=\{(y_1,\ldots,y_n)\in\mathbb R^n:y_n\ge0\}
$$

と書きます。$y_n>0$ の点を内点、$y_n=0$ の点を境界点とします。境界点では点を除いても穴が閉じた形になりません。

<a id="thm-atop25-halfspace"></a>

<!-- formal-statement-start -->
> **定理（半空間の局所ホモロジー）**
> $n\ge1$ とし、次の閉半空間の点 $x$ を取る。

$$
Q^n=\{y\in\mathbb R^n:y_n\ge0\}.
$$

> 各非負整数 $k$ について次が成立する。

$$
L_k(Q^n,x)\cong
\begin{cases}
\mathbb Z & x_n>0,\ k=n,\\
0 & \text{それ以外}.
\end{cases}
$$
<!-- formal-statement-end -->

見取り図：内点は小さな開球を含むため Euclid 空間と同じです。境界点を取り除いた半空間は内側の一点へ縮められるため、全空間と穿孔空間の間にホモロジーの差がありません。

<!-- proof-start -->
### 証明

$x_n>0$ なら $0<r<x_n$ を選ぶと、中心 $x$、半径 $r$ の開球は $Q^n$ の内部に含まれます。

この球は $Q^n$ と $\mathbb R^n$ の共通の開近傍です。[局所ホモロジーの近傍不変性](#thm-atop25-neighborhood) を両空間に適用し、[Euclid 空間の局所ホモロジー](#thm-atop25-euclidean) を使えば内点での結論を得ます。

$x_n=0$ なら平行移動 $y\mapsto y-x$ は $Q^n$ を自身に同相に写すので、原点で考えます。$e_n=(0,\ldots,0,1)$ を取り、変形

$$
G(y,t)=(1-t)y+te_n
$$

を考えます。第 $n$ 座標は $(1-t)y_n+t\ge0$ なので、$Q^n$ を $e_n$ へ収縮します。

$y\ne0$ の場合、$t=0$ では像は $y$ で零でなく、$t>0$ では第 $n$ 座標が $t$ 以上なので零でありません。

従って $G$ は穿孔半空間 $Q^n\setminus\{0\}$ も同じ点へ収縮します。

$X=Q^n$、$A=Q^n\setminus\{0\}$ と置くと、[可縮空間の被約特異ホモロジー](../ATOP17/index.md#cor-atop17-contractible) により両者の正次数群は零です。また両者は非空で道連結であるため、[0次特異ホモロジーと道連結成分](../ATOP16/index.md#thm-atop16-h0-path-components) から包含による $H_0(A)\to H_0(X)$ は一点の類を一点の類へ送る同型です。

[対のホモロジー長完全列](../ATOP18/index.md#thm-atop18-long-exact) の $k\ge2$ の部分では

$$
0=H_k(X)\to H_k(X,A)\to H_{k-1}(A)=0
$$

なので相対群は零です。低次数では

$$
0\to H_1(X,A)\to\mathbb Z
\xrightarrow{\cong}\mathbb Z\to H_0(X,A)\to0
$$

となるので、完全性から $H_1(X,A)=H_0(X,A)=0$ です。
<!-- proof-end -->

例えば閉区間 $[0,1]$ の端点の周りは半直線の原点の近傍と同相であり、内点の周りは直線の開区間と同相です。従って全空間のホモロジーは同じでも、端点では全局所群が零、内点では $L_1\cong\mathbb Z$ となります。境界点の局所群が零であるという事実だけで、任意の位相空間の点を境界点と判定できるわけではありません。半空間を局所模型に持つという仮定が必要です。

## 5. 次元は座標の取り方に依存しない

Euclid 空間の開集合では、どの点を選んでもその空間の次元が局所ホモロジーの唯一の非零次数として現れます。従って異なる次元の開集合を同相にできないことが分かります。

<a id="thm-atop25-invariance-dimension"></a>

<!-- formal-statement-start -->
> **定理（次元不変性）**
> 非負整数 $m,n$ に対し、非空開集合 $U\subset\mathbb R^m$、$V\subset\mathbb R^n$ が同相なら $m=n$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

同相写像 $f:U\to V$ を仮定します。$U$ は非空なので $x\in U$ を選べます。$y=f(x)$ とすると、第1節の同相不変性により

$$
L_k(U,x)\cong L_k(V,y)
$$

が全次数で成立します。$U,V$ はそれぞれの Euclid 空間の開近傍なので、[局所ホモロジーの近傍不変性](#thm-atop25-neighborhood) により

$$
L_k(\mathbb R^m,x)\cong L_k(\mathbb R^n,y)
$$

です。ここで $k=m$ を選ぶと [Euclid 空間の局所ホモロジー](#thm-atop25-euclidean) により左辺は $\mathbb Z$ です。

もし $m\ne n$ なら右辺は零群になり、同型は存在しません。従って $m=n$ です。
<!-- proof-end -->

非空という仮定は必要です。空集合は全ての次元の Euclid 空間で開集合であり、空集合どうしは同相ですが、比較する点がないため証明が始まりません。

この結果は、位相多様体の座標近傍（Euclid 空間の開集合と同相な開近傍）に付けた次元が、同じ点で別の座標近傍を選んでも変わらないことを保証します。二つの近傍の共通部分を取れば、両座標写像の像がそれぞれ非空開集合となり、座標変換はその間の同相写像になるからです。

次元不変性は、異なる次元の開集合間の同相を排除する定理です。一方、後に学ぶ Brouwer の領域不変性は、同じ次元で開集合から Euclid 空間への連続単射の像が開集合であり、その像への同相になることを述べます。今回は最初から像の開性と逆写像の連続性を仮定しています。連続単射だけでこれらが従うことはまだ証明していません。例えば直線から平面への $t\mapsto(t,0)$ は連続単射ですが、像は平面の開集合ではありません。

## 6. 演習

### 演習 ATOP25-A1：切除の仮定

- Level: A

$X=\mathbb R^2$、$x=(0,0)$、$U=\{y:\|y\|<2\}$ とする。局所群を計算するため切除する集合と、その閉包が含まれる内部を明示せよ。

<!-- solution-start -->
**詳細解答**

$A=\mathbb R^2\setminus\{0\}$、$Z=\{y:\|y\|\ge2\}$ とします。ノルムは連続なので $Z$ は閉集合です。点 $0$ は閉じているため $A$ は開集合です。従って

$$
\overline Z=Z\subset A=\operatorname{int}_{\mathbb R^2}A.
$$

[切除定理](../ATOP19/index.md#thm-atop19-excision) により $H_k(U,U\setminus\{0\})\to H_k(X,A)$ は同型です。これは [局所ホモロジーの近傍不変性](#thm-atop25-neighborhood) の具体例です。
<!-- solution-end -->

### 演習 ATOP25-A2：穿孔直線の0次群

- Level: A

$X=\mathbb R$、$A=\mathbb R\setminus\{0\}$ とする。$H_0(A)\to H_0(X)$ を整数の組の写像で表し、長完全列から $L_1(X,0)$ と $L_0(X,0)$ を計算せよ。

<!-- solution-start -->
**詳細解答**

$A$ の二成分は負の半直線と正の半直線です。[0次特異ホモロジーと道連結成分](../ATOP16/index.md#thm-atop16-h0-path-components) により $H_0(A)\cong\mathbb Z^2$、$H_0(X)\cong\mathbb Z$ です。

包含は両成分を一成分に送るので $(a,b)\mapsto a+b$ です。

$X$ は可縮なので [可縮空間の被約特異ホモロジー](../ATOP17/index.md#cor-atop17-contractible) により $H_1(X)=0$ です。[対のホモロジー長完全列](../ATOP18/index.md#thm-atop18-long-exact) は

$$
0\to L_1(X,0)\to\mathbb Z^2
\xrightarrow{(a,b)\mapsto a+b}\mathbb Z\to L_0(X,0)\to0
$$

となります。和の写像の核は $(a,-a)$ 全体で $\mathbb Z$ に同型です。和の写像は $(c,0)$ を $c$ へ送るので全射です。従って $L_1(X,0)\cong\mathbb Z$、$L_0(X,0)=0$ です。
<!-- solution-end -->

### 演習 ATOP25-A3：内点の次数

- Level: A

$Q^3$ の点 $(1,2,3)$ について全次数の局所群を求めよ。近傍の半径を具体的に選べ。

<!-- solution-start -->
**詳細解答**

半径1の開球を取ると、その球内では第3座標が $3-1=2$ より大きくなります。

従って $Q^3$ と $\mathbb R^3$ の共通の開近傍です。[局所ホモロジーの近傍不変性](#thm-atop25-neighborhood) と [Euclid 空間の局所ホモロジー](#thm-atop25-euclidean) により3次だけが $\mathbb Z$、他の全非負次数は零です。
<!-- solution-end -->

### 演習 ATOP25-A4：端点を除いた収縮

- Level: A

$Q^1=[0,\infty)$ から原点を除いた部分を1へ収縮する写像を書き、全時刻で原点を避けることを確かめよ。

<!-- solution-start -->
**詳細解答**

$y>0$、$t\in[0,1]$ に対して $G(y,t)=(1-t)y+t$ とします。

$t=0$ では $y>0$、$t>0$ なら $(1-t)y+t\ge t>0$ です。

$G(y,1)=1$、$G(1,t)=1$ なので所望の収縮です。

半直線全体も同じ式で収縮できるため、[半空間の局所ホモロジー](#thm-atop25-halfspace) の証明と同様、両者の正次数群が消え、0次の包含は同型となります。従って端点の局所群は全て零です。
<!-- solution-end -->

### 演習 ATOP25-B1：三本の枝

- Level: B

平面内で原点から互いに異なる方向へ伸びる三本の閉半直線の和 $X$ を考える。原点の全次数の局所群を求めよ。

<!-- solution-start -->
**詳細解答**

$K(y,t)=(1-t)y$ は各半直線を自身へ送るので $X$ は可縮です。原点を除いた部分 $A$ は互いに分離した三つの開半直線からなります。

各成分は正の実数の区間と同相で可縮です。特異単体の像は連結なので一成分に属し、鎖複体は三成分の鎖複体の直和になります。

[可縮空間の被約特異ホモロジー](../ATOP17/index.md#cor-atop17-contractible) により $H_k(A)=H_k(X)=0$（$k\ge1$）です。

[0次特異ホモロジーと道連結成分](../ATOP16/index.md#thm-atop16-h0-path-components) により $H_0(A)\cong\mathbb Z^3$、$H_0(X)\cong\mathbb Z$ で、包含は各生成元を同じ生成元へ送ります。[対のホモロジー長完全列](../ATOP18/index.md#thm-atop18-long-exact) から

$$
0\to L_1(X,0)\to\mathbb Z^3
\xrightarrow{s}\mathbb Z\to L_0(X,0)\to0,
\quad s(a,b,c)=a+b+c.
$$

$s$ は全射なので $L_0=0$ です。核は $(a,b,-a-b)$ の全体で、独立な生成元 $(1,0,-1),(0,1,-1)$ を持つので $L_1\cong\mathbb Z^2$ です。$k\ge2$ では長完全列の相対群の両隣が零なので $L_k=0$ です。原点はどの Euclid 空間の点とも局所群が一致しません。
<!-- solution-end -->

### 演習 ATOP25-B2：閉円板の内点と境界点

- Level: B

$D^2$ の原点と点 $(1,0)$ の局所群を比較せよ。境界点を除いた円板が原点へ収縮することを直接確認せよ。

<!-- solution-start -->
**詳細解答**

原点には半径 $1/2$ の開球が入ります。[局所ホモロジーの近傍不変性](#thm-atop25-neighborhood) を $D^2,\mathbb R^2$ に適用し、[Euclid 空間の局所ホモロジー](#thm-atop25-euclidean) を使うと2次だけが $\mathbb Z$ です。

$p=(1,0)$ と置き、$A=D^2\setminus\{p\}$ とします。

$K(y,t)=(1-t)y$ のノルムは $(1-t)\|y\|$ です。

$t>0$ では1未満なので $p$ に一致しません。$t=0$ でも $y\in A$ より $p$ ではありません。

従って $A$ も $D^2$ も原点へ収縮します。[可縮空間の被約特異ホモロジー](../ATOP17/index.md#cor-atop17-contractible) により正次数群は零です。

両者が道連結なので [0次特異ホモロジーと道連結成分](../ATOP16/index.md#thm-atop16-h0-path-components) から $H_0(A)\to H_0(D^2)$ は同型です。

[対のホモロジー長完全列](../ATOP18/index.md#thm-atop18-long-exact) では高次数は零群に挟まれ、低次数では

$$
0\to L_1(D^2,p)\to\mathbb Z
\xrightarrow{\cong}\mathbb Z\to L_0(D^2,p)\to0
$$

となります。よって境界点では全次数で零です。局所群が異なるため、円板の自己同相写像が原点を $p$ へ送ることはできません。
<!-- solution-end -->

### 演習 ATOP25-B3：開集合という仮定

- Level: B

$\mathbb R$ と平面の集合 $V=\{(s,0):s\in\mathbb R\}$ は同相であることを示せ。次元不変性に反しない理由を説明せよ。

<!-- solution-start -->
**詳細解答**

$f(s)=(s,0)$ は連続で全単射です。逆写像は第1座標への射影を $V$ に制限したものなので連続です。従って同相です。

しかし $V$ は $\mathbb R^2$ の開集合ではありません。

任意の $r>0$ について $(s,0)$ を中心とする開球は $(s,r/2)$ を含み、この点は $V$ に属しません。

[次元不変性](#thm-atop25-invariance-dimension) の開集合条件が成立しないため矛盾はありません。

実際、$V$ を部分空間とした局所群は同相不変性により1次で $\mathbb Z$ です。周囲の $\mathbb R^2$ の局所群が2次であることと混同してはいけません。
<!-- solution-end -->

### 演習 ATOP25-C1：局所模型から次元と境界を判定する

- Level: C

$m,n\ge1$ とする。閉半空間 $Q^m,Q^n$ の非空な相対開集合 $U,V$ の間に同相写像 $f:U\to V$ があるとする。内点は内点へ、境界点は境界点へ移ること、および $m=n$ を証明せよ。

<!-- solution-start -->
**詳細解答**

$U$ の各点 $x$ について [局所ホモロジーの近傍不変性](#thm-atop25-neighborhood) から $L_k(U,x)\cong L_k(Q^m,x)$ です。

$V$ でも $L_k(V,f(x))\cong L_k(Q^n,f(x))$ です。

$f$ とその逆写像はそれぞれ点を除いた部分も対応させるので、[相対ホモロジーの誘導準同型](../ATOP18/index.md#thm-atop18-relative-map) の合成保存により

$$
L_k(Q^m,x)\cong L_k(Q^n,f(x))
$$

が全次数で成立します。[半空間の局所ホモロジー](#thm-atop25-halfspace) によれば内点の局所群はある次数で $\mathbb Z$、境界点の局所群は全次数で零です。従って内点と境界点が互いに入れ替わることはありません。

次に $U$ が内点を少なくとも一つ含むことを示します。任意に $z\in U$ を取ります。既に $z_m>0$ なら内点です。$z_m=0$ なら相対開性により、ある $r>0$ で

$$
\{w\in Q^m:\|w-z\|<r\}\subset U.
$$

$m$ 番目の単位ベクトルを $e_m$ とすると、$w=z+(r/2)e_m$ はこの集合に属し、第 $m$ 座標は $r/2>0$ です。従って内点 $w$ を選べます。

その像も内点なので $k=m$ で局所群を比較すれば、左辺は $\mathbb Z$、右辺は $m=n$ なら $\mathbb Z$、それ以外なら零です。

同型が存在することから $m=n$ を得ます。
<!-- solution-end -->

## 7. まとめ

一点を除いた空間との相対ホモロジーを使うと、開近傍だけで点の情報を計算できます。Euclid 空間の内点では非零群の次数が次元を記録し、半空間の境界点では全群が消えます。この局所的な情報は後に多様体の向きと基本類を考える際にも役立ちます。次講では1次ホモロジー群と基本群を比較し、ループの積から可換な群が生まれる仕組みを調べます。
