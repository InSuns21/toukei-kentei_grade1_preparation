# INV1 観測から未知量を戻せるのはいつか

<!-- definition-example-audit: strict -->

## 1. 計算できる向きと、知りたい向きは逆である

物体の厚さから測定器の読みを予測することはできても、読みから厚さが必ず決まるとは限りません。異なる厚さが同じ読みを返すかもしれず、そもそも物理モデルが返さない読みを観測してしまうかもしれません。さらに、解が一つに決まっても、観測値のほんの小さな誤差が復元結果を大きく変えることがあります。

既習の[特異値分解](../../../基礎科目/F0/F0-00F2/index.md#thm-f0-00f2-svd)は、行列が各入力方向をどれほど引き伸ばし、縮めるかを示しました。本章ではこの道具を「未知量を逆向きに推定する問題」に使い、次を別々に調べます。

1. **存在**：任意の許された観測値に、対応する未知量があるか。
2. **一意性**：対応する未知量は一つだけか。
3. **安定性**：観測の小さな変化に、復元結果は連続的に応じるか。

この三つを混同しないことが、後の正則化理論の出発点です。

まず未知の入力を $x$、観測を $y$ と書きます。入力の許される集合を $X$、観測値の空間を $Y$ とします。入力から観測値を計算する規則が **観測写像**（forward map）です。観測値から逆に $x$ を探すのが逆問題です。特に線形のときは観測写像を $A$ と書きます。

<a id="def-inv1-forward-map"></a>

<!-- formal-statement-start -->
> **定義（観測写像と逆問題）**
> 集合 $X,Y$ と写像 $F:X\to Y$ をとる。$x\in X$ から $y=F(x)\in Y$ を求める問題を **順問題**、与えられた $y\in Y$ に対し

$$
F(x)=y
$$

> を満たす $x\in X$ を探す問題を **逆問題** という。$F$ が線形写像なら $A:X\to Y$ とも記す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv1-forward-map -->
**定義の確認**：二つの未知量 $x=(x_1,x_2)^{\mathsf T}\in\mathbb R^2$ から、第一成分だけを測る機械を考えます。観測空間を $\mathbb R$ とし、

$$
F(x_1,x_2)=x_1
$$

と置きます。例えば $x=(2,5)^{\mathsf T}$ を順方向へ送ると $F(x)=2$ です。逆に読み $y=2$ から求める方程式は $x_1=2$ で、$(2,t)^{\mathsf T}$ はどの $t\in\mathbb R$ に対しても解です。**順問題が一意に計算できることは、逆問題が一意とは限らない**ことを直接確認できました。
<!-- definition-example-end -->

### 正確なデータと誤差を含むデータ

正しい未知量 $x^\dagger$ から作られた理想データを $y=F(x^\dagger)$ とします。測定誤差を含む値は $y^\delta$ と書き、観測空間にノルムがあるときは

$$
\|y^\delta-y\|_Y\le\delta
$$

を誤差の仮定とします。$\delta\ge0$ は誤差の上限で、$y^\delta$ が必ず $F$ の像に属するとは仮定しません。本章の行列は実行列、ノルムは Euclid ノルム $\|\cdot\|_2$ とします。統計的な誤差分布はまだ仮定しません。

---

## 2. Hadamard の三条件を別々に確かめる

「解ける」と言うだけでは、どの観測値を対象にするかが曖昧です。例えば $F(x)=x^2$ の出力は負になりません。そこで、逆問題を考えるときは入力集合 $X$ に加えて **許容データ集合** $Y_0\subseteq Y$ を明示します。

ここでは $X\subseteq\mathbb R^n$、$Y\subseteq\mathbb R^m$ として Euclid ノルムで距離を測ります。$Y_0$ は $Y$ の部分集合として距離を測ります。逆問題の安定性は、いったん一意に解けるときに限り、解を返す写像が連続かどうかで判定します。「連続」は、任意の許容データ $y$ と任意の $\varepsilon>0$ に対し、ある $\eta>0$ があって、$z\in Y_0$ と $\|z-y\|_2<\eta$ が成り立てば復元結果の距離が $\varepsilon$ 未満となることです。これは一様な比例定数があるという意味ではありません。

<a id="def-inv1-hadamard"></a>

<!-- formal-statement-start -->
> **定義（逆問題の三条件）**
> $X\subseteq\mathbb R^n$、$Y\subseteq\mathbb R^m$、非空集合 $Y_0\subseteq Y$、写像 $F:X\to Y$ に対して、$F(x)=y$ を全ての $y\in Y_0$ について解く問題を考える。
>
> **（H1）存在**：任意の $y\in Y_0$ に少なくとも一つの $x\in X$ があり、$F(x)=y$。
>
> **（H2）一意性**：任意の $y\in Y_0$ に対し $F(x)=y$ を満たす $x\in X$ は高々一つ。
>
> **（H3）連続依存**：（H1）と（H2）が成り立つ場合に定まる解写像 $S:Y_0\to X$、$S(y)=x$（$F(x)=y$）が連続。
>
> 三条件が全て成り立つとき、この逆問題を **適切設定** という。いずれかが欠けるとき **不良設定** という。
<!-- formal-statement-end -->

（H2）は「高々一つ」としたので、存在しない場合にも一意性の否定とはしません。（H3）は存在・一意性を満たした上で検査する条件です。ノイズが像の外へ出る問題を扱うとき、$Y_0=\mathcal R(F)$（写像の値域）なのか $Y_0=Y$ なのかで（H1）が変わります。

<!-- definition-example-start: def-inv1-hadamard -->
**定義の確認**：$X=Y_0=Y=\mathbb R$、$F(x)=2x$ とします。任意の $y$ には $x=y/2$ が存在し、$2x=y$ から一意です。さらに

$$
|S(y_1)-S(y_2)|
=\frac12|y_1-y_2|
$$

なので任意の $\varepsilon>0$ に対して $\eta=2\varepsilon$ を選べば連続依存も成り立ちます。三条件を一つずつ検査できました。
<!-- definition-example-end -->

### 非線形の小例：連続と比例評価は違う

$X=[0,\infty)$、$Y_0=[0,\infty)$、$F(x)=x^2$ を考えます。$S(y)=\sqrt y$ は全ての $y\in Y_0$ で一意に定まり連続です。実際、$a,b\ge0$ なら

$$
|\sqrt a-\sqrt b|^2
\le |a-b|
$$

なので $|S(a)-S(b)|\le\sqrt{|a-b|}$ です。しかし原点で一つの定数 $C$ による

$$
|\sqrt y-\sqrt0|\le C|y-0|
$$

は $y\downarrow0$ で成り立ちません。$1/\sqrt y$ が無限に大きくなるためです。**連続依存と Lipschitz 型の定量的安定性は異なります**。以後は有限次元線形の場合に、特異値から比例定数を計算します。

### 識別可能性は何を意味するか

一意性が壊れる理由を調べるため、観測できる入力同士を区別できるかという性質を切り出します。ここでは入力集合全体についての識別を考えます。

<a id="def-inv1-identifiability"></a>

<!-- formal-statement-start -->
> **定義（識別可能性）**
> 写像 $F:X\to Y$ に対し、任意の $x_1,x_2\in X$ について

$$
F(x_1)=F(x_2)\Longrightarrow x_1=x_2
$$

> が成り立つとき、未知量 $x$ は $F$ により **識別可能** であるという。すなわち $F$ が単射であることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv1-identifiability -->
**定義の確認**：$F(x_1,x_2)=x_1$ では、$(1,0)^{\mathsf T}\ne(1,7)^{\mathsf T}$ なのに両者の観測は $1$ です。したがって単射性を失い、識別不能です。一方 $G(t)=(t,2t)^{\mathsf T}$ なら $G(s)=G(t)$ の第一成分から $s=t$ となり、単射です。$G$ は $\mathbb R^2$ 全体へは全射でないため、識別可能でも全てのデータに厳密解があるとは限りません。
<!-- definition-example-end -->

---

## 3. 有限次元の線形逆問題で三条件を判定する

実行列 $A\in\mathbb R^{m\times n}$ を観測写像として、$X=\mathbb R^n$、$Y_0=Y=\mathbb R^m$ と固定します。$A$ の階数を $r$ とします。

既習の[特異値分解](../../../基礎科目/F0/F0-00F2/index.md#thm-f0-00f2-svd)により、正の特異値を

$$
\sigma_1\ge\cdots\ge\sigma_r>0
$$

と並べ、入力側の正規直交ベクトル $v_j$、出力側の正規直交ベクトル $u_j$ を用いて

$$
Av_j=\sigma_j u_j\quad(1\le j\le r),
\qquad
Av_j=0\quad(r<j\le n)
$$

とできます。$r=0$ の場合は正の特異値に関する式は空と読みます。この表示を使うと、どの入力方向が観測から失われるかが見えます。

<a id="thm-inv1-finite-linear"></a>

<!-- formal-statement-start -->
> **定理（有限次元線形逆問題の三条件）**
> $m,n\ge1$、$A\in\mathbb R^{m\times n}$、$r=\operatorname{rank}A$ とする。$Ax=y$ を全ての $y\in\mathbb R^m$ について解く逆問題では、
>
> - **存在（H1）** が成立する必要十分条件は $r=m$。
> - **一意性（H2）** が成立する必要十分条件は $r=n$。
> - **適切設定** の必要十分条件は $m=n=r$、すなわち $A$ が可逆であること。
>
> また $r=n$ のとき、像 $\mathcal R(A)$ 上の逆写像は連続であり、全ての $x,z\in\mathbb R^n$ に対して

$$
\|x-z\|_2
\le \frac{1}{\sigma_n}\|Ax-Az\|_2
$$

> が成り立つ。ここで $\sigma_n>0$ は $A$ の最小特異値である。
<!-- formal-statement-end -->

### 証明の見取り図

存在には $A$ の像が観測空間全体であること、一意性には核が零であることが必要です。[SVD による階数の判定](../../../基礎科目/F0/F0-00F2/index.md#prop-f0-00f2-rank-singular-values)でそれぞれを $r=m$、$r=n$ に直します。単射の場合は正の特異値が入力を下から押さえるため、逆向きの誤差が上から押さえられます。

<!-- proof-start -->
### 証明

まず、任意の $y\in\mathbb R^m$ が $Ax=y$ と書けることは $\mathcal R(A)=\mathbb R^m$ と同値です。このとき $\dim\mathcal R(A)=m$ なので $r=m$ です。逆も $\dim\mathcal R(A)=m$ なら像は $\mathbb R^m$ の全体となり、全射です。

次に $Ax_1=Ax_2$ なら

$$
A(x_1-x_2)=0.
$$

全ての組について $x_1=x_2$ となる必要十分条件は $\ker A=\{0\}$ です。階数・退化次数の関係

$$
n=\dim\ker A+\operatorname{rank}A
$$

から、これは $r=n$ と同値です。

$r=n$ とし、$h=x-z$ を正規直交基底 $v_1,\ldots,v_n$ で

$$
h=\sum_{j=1}^n a_jv_j
$$

と展開します。直交性と[特異値分解（SVD）](../../../基礎科目/F0/F0-00F2/index.md#thm-f0-00f2-svd)により

$$
\|Ah\|_2^2
=\left\|\sum_{j=1}^n \sigma_ja_ju_j\right\|_2^2
=\sum_{j=1}^n\sigma_j^2a_j^2
\ge\sigma_n^2\sum_{j=1}^na_j^2
=\sigma_n^2\|h\|_2^2.
$$

$\sigma_n>0$ なので平方根をとり、主張の評価を得ます。特に像の中の $y_k\to y$ に対して、その一意な逆像を $x_k,x$ とすれば

$$
\|x_k-x\|_2\le \sigma_n^{-1}\|y_k-y\|_2\to0.
$$

よって像上の逆写像は連続です。存在・一意性が全ての $\mathbb R^m$ で成立するには同時に $r=m=n$ が必要十分で、このとき連続依存も従います。$\square$
<!-- proof-end -->

### 三つの行列を比較する

| 観測行列 | 任意データの厳密解 | 未知量の一意性 | 三条件 |
|---|---|---|---|
| $A_1=\operatorname{diag}(2,1/10)$（$2\times2$） | ある | 一意 | 全て成立 |
| $A_2=(1\ \ 0)$（$1\times2$） | ある | 非一意 | 不良設定 |
| $A_3=(1\ \ 0)^{\mathsf T}$（$2\times1$） | 一般にはない | あれば一意 | 不良設定 |

$A_2$ では第二成分がまったく観測されません。$A_3$ では観測値 $(a,b)^{\mathsf T}$ の第二成分が $b\ne0$ なら方程式 $Ax=y$ に解がありません。一方 $A_1$ は全てのデータで解が一意に存在し、有限の定数で安定です。ただし第二方向の小さい特異値 $1/10$ はノイズを10倍にする可能性があります。

---

## 4. 適切設定でも復元が難しい理由――条件数

単に連続というだけでは誤差の大きさが分かりません。逆問題では、観測側のわずかな誤差が入力側で何倍になるかを計算したいので、既習の[2-ノルム行列条件数の定義](../../../計算系/NA/NA1/index.md#def-na1-matrix-condition-number)を使います。

正方可逆行列 $A\in\mathbb R^{n\times n}$ に対し、入力方向での最大伸長率は[最大特異値と2-作用素ノルムの一致](../../../基礎科目/F0/F0-00F2/index.md#thm-f0-00f2-operator-norm-largest-singular)から $\|A\|_2=\sigma_1$ です。逆行列 $A^{-1}$ は各特異方向を $1/\sigma_j$ 倍するため、最大伸長率は $1/\sigma_n$ です。[既習の特異値による条件数公式](../../../計算系/NA/NA1/index.md#prop-na1-condition-singular-values)は次の形でした。

$$
\kappa_2(A)=\|A\|_2\|A^{-1}\|_2
=\frac{\sigma_1}{\sigma_n}
$$

長方形行列の「正の特異値だけの比」を計算しても、核の有無は分かりません。ここでの $\kappa_2$ は可逆な正方行列に対する定義であり、特異行列には通常 $\infty$ を割り当てます。

**具体例**：$A=\operatorname{diag}(3,1/4)$ を考えます。標準正規直交基底で各方向の伸長率が $3,1/4$ だから、特異値は $3,1/4$ です。[最大特異値のノルム公式](../../../基礎科目/F0/F0-00F2/index.md#thm-f0-00f2-operator-norm-largest-singular)と逆行列の直接計算から

$$
\|A\|_2=3,\qquad
A^{-1}=\operatorname{diag}(1/3,4),\qquad
\|A^{-1}\|_2=4,
$$

したがって $\kappa_2(A)=12$ です。逆行列自体は存在し、条件数が大きいことと「解が存在しない」ことは別です。

[右辺摂動に対する既習の感度定理](../../../計算系/NA/NA1/index.md#thm-na1-linear-system-perturbation)を、可逆な観測行列 $A$、真の未知量 $x\ne0$、データ $y=Ax\ne0$、観測誤差 $e$ に適用します。定理の $\Delta b=e$、$\Delta x=\widehat x-x$（$\widehat x=A^{-1}(y+e)$）を代入すると

$$
\frac{\|\widehat x-x\|_2}{\|x\|_2}
\le\kappa_2(A)\frac{\|e\|_2}{\|y\|_2}.
$$

この係数の鋭さも、逆問題の入力・観測に読み替えて確認できます。[特異値分解](../../../基礎科目/F0/F0-00F2/index.md#thm-f0-00f2-svd)の最大方向 $v_1$ を $x$、最小方向の出力単位ベクトル $u_n$ に沿う $e=t u_n$（$t\ne0$）を選びます。すると

$$
\|x\|_2=1,\quad
\|y\|_2=\sigma_1,\quad
\|\widehat x-x\|_2=\frac{|t|}{\sigma_n},\quad
\|e\|_2=|t|.
$$

左右の比はどちらも $|t|/\sigma_n$ となり等号が成立します。

条件数は、**問題そのものの感度**です。計算アルゴリズムに丸め誤差がない理想状況でも、この増幅は残ります。

---

## 5. データとモデルが一致しないとき――最小二乗と擬似逆

測定値にノイズがあると、$Ax=y^\delta$ が厳密に解けないことがあります。例えば $A=(1,0)^{\mathsf T}$ なら $(2,0.01)^{\mathsf T}$ は像の外です。そこで厳密解を探す代わりに、予測値 $Ax$ と観測値との Euclid 距離の **二乗残差を最小化する問題**

$$
\min_{x\in\mathbb R^n}\|Ax-y^\delta\|_2^2
$$

を考えます。これは元の方程式を解いたという意味ではありません。最小化点が複数ある場合、さらにその中で $\|x\|_2$ が最小のものを一つ選びます。この選択を SVD の座標で表すのが擬似逆です。線形予測での[最小二乗解と最小ノルム解](../../../応用系/ML/ML1-04/index.md#thm-ml1-04-solution-set-minimum-norm)と同じ数理ですが、ここでは観測と未知量の意味で必要な座標計算を追います。

$A=U\Sigma V^{\mathsf T}$ を実特異値分解とし、正の特異値に対応する $u_1,\ldots,u_r$ と $v_1,\ldots,v_r$ を使います。零の特異値を割ることはできないため、**正の方向だけを逆数にして零の方向を無視する**線形写像を定めます。

<a id="def-inv1-pseudoinverse"></a>

<!-- formal-statement-start -->
> **定義（擬似逆による復元写像）**
> $A\in\mathbb R^{m\times n}$ の階数を $r$、正の特異値と対応する左右の単位特異ベクトルを $\sigma_j,u_j,v_j$（$1\le j\le r$）とする。線形写像 $A^\dagger:\mathbb R^m\to\mathbb R^n$ を

$$
A^\dagger y
:=\sum_{j=1}^r\frac{\langle y,u_j\rangle}{\sigma_j}v_j
$$

> で定め、**Moore--Penrose 擬似逆** という。$r=0$ なら空和で $A^\dagger=0$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv1-pseudoinverse -->
**定義の確認**：$A=(2\ \ 0)$ は $\mathbb R^2\to\mathbb R$ の行列です。入力の $e_1$ 方向が2倍され、$e_2$ 方向は零になります。したがって $r=1$、$\sigma_1=2$、$u_1=1$、$v_1=e_1$ と取れ、定義式は

$$
A^\dagger y=\frac{y}{2}e_1,\qquad
A^\dagger=\begin{pmatrix}1/2\\0\end{pmatrix}
$$

です。$A A^\dagger y=y$ ですが、$A^\dagger A(x_1,x_2)^{\mathsf T}=(x_1,0)^{\mathsf T}$ となり、観測できない第二成分は復元されません。零特異値方向を「逆数にする」のではなく、零として選んだことを直接確かめました。
<!-- definition-example-end -->

<a id="thm-inv1-minimum-norm"></a>

<!-- formal-statement-start -->
> **定理（最小ノルム解の特異値表示）**
> 任意の $A\in\mathbb R^{m\times n}$ と $y\in\mathbb R^m$ に対し、$\|Ax-y\|_2^2$ は最小値を持つ。全ての最小化点の中でノルムが最小の点は一意で $x^\dagger=A^\dagger y$ である。さらに

$$
AA^\dagger y=P_{\mathcal R(A)}y,\qquad
A^\dagger Ax=P_{(\ker A)^\perp}x
$$

> が成り立つ。$P_M$ は部分空間 $M$ への直交射影を表す。
<!-- formal-statement-end -->

### 証明の見取り図

入力を右特異ベクトルの座標へ、観測を左特異ベクトルの座標へ移します。[特異値分解](../../../基礎科目/F0/F0-00F2/index.md#thm-f0-00f2-svd)は直交変換なので二乗距離を変えません。残差の二乗が独立した平方の和になり、どの係数が固定され、どの係数が自由かが分かります。

<!-- proof-start -->
### 証明

$A$ の階数を $r$ とします。まず $r\ge1$ とし、右特異ベクトルを零特異値方向まで延長して $\mathbb R^n$ の正規直交基底 $v_1,\ldots,v_n$ とします。任意の $x$ は

$$
x=\sum_{j=1}^n a_jv_j.
$$

$y$ の成分を $c_j=\langle y,u_j\rangle$（$1\le j\le r$）とし、

$$
y_\perp=y-\sum_{j=1}^r c_ju_j
$$

と置きます。$y_\perp$ は各 $u_j$ に直交し、$Ax=\sum_{j=1}^r\sigma_ja_ju_j$ なので、直交成分の平方和として

$$
\begin{aligned}
\|Ax-y\|_2^2
&=\left\|\sum_{j=1}^r(\sigma_ja_j-c_j)u_j-y_\perp\right\|_2^2\\
&=\sum_{j=1}^r(\sigma_ja_j-c_j)^2+\|y_\perp\|_2^2.
\end{aligned}
$$

各 $\sigma_j>0$ だから、最小残差を得る必要十分条件は

$$
a_j=\frac{c_j}{\sigma_j}\qquad(1\le j\le r)
$$

であり、$a_{r+1},\ldots,a_n$ は任意です。入力の二乗ノルムは

$$
\|x\|_2^2
=\sum_{j=1}^r\frac{c_j^2}{\sigma_j^2}
+\sum_{j=r+1}^na_j^2
$$

なので、全ての自由係数を零にしたときだけ最小になります。この唯一の点は定義どおり $A^\dagger y$ です。

さらに

$$
AA^\dagger y=\sum_{j=1}^r c_ju_j
$$

は $\mathcal R(A)=\operatorname{span}\{u_1,\ldots,u_r\}$ への直交射影です。同じく $A^\dagger Ax=\sum_{j=1}^r a_jv_j$ です。[階数と非零特異値の対応](../../../基礎科目/F0/F0-00F2/index.md#prop-f0-00f2-rank-singular-values)から $\ker A=\operatorname{span}\{v_{r+1},\ldots,v_n\}$ なので、こちらは $(\ker A)^\perp$ への射影です。

$r=0$ の場合は $A=0$ なので残差は常に $\|y\|_2^2$、全ての $x$ が最小化点です。その中の最小ノルム点は $x=0=A^\dagger y$ で、両射影の恒等式も零空間への射影として成り立ちます。

各式は行列の SVD の選び方によらない幾何学的な特徴付けになっているため、定義した $A^\dagger$ 自体も特異ベクトルの選び方に依存しません。$\square$
<!-- proof-end -->

### 二回測っただけでは第二成分は見えない

$$
A=\begin{pmatrix}1&0\\1&0\end{pmatrix},
\qquad y=\begin{pmatrix}3\\1\end{pmatrix}
$$

とします。二つの行は同じ第一成分を測っています。$Ax=(x_1,x_1)^{\mathsf T}$ なので厳密解は存在しません。残差二乗は

$$
\begin{aligned}
\|Ax-y\|_2^2
&=(x_1-3)^2+(x_1-1)^2\\
&=2(x_1-2)^2+2.
\end{aligned}
$$

したがって最小二乗解は $(2,t)^{\mathsf T}$（$t\in\mathbb R$）の全体で、最小ノルム解は $(2,0)^{\mathsf T}$ です。SVD では正の特異値は $\sqrt2$ の一つだけ、実際

$$
A^\dagger
=\begin{pmatrix}1/2&1/2\\0&0\end{pmatrix},
\qquad
A^\dagger y=\begin{pmatrix}2\\0\end{pmatrix}.
$$

ここで「最小ノルム解が一意」というのは選択規則の一意性です。元の未知量 $x_2$ を観測から識別できたわけではありません。また正の特異値の比は $1$ ですが、これで一意性が回復するわけでもありません。

---

## 6. ノイズはどこで増幅されるか

最小ノルム解は全ての観測値に対して定義できました。次は、観測値 $y$ と $y^\delta$ が近いとき、二つの選択解の差を評価します。$A$ は固定した有限行列とし、階数 $r\ge1$ を仮定します。

<a id="thm-inv1-noise-amplification"></a>

<!-- formal-statement-start -->
> **定理（誤差増幅の鋭い評価）**
> $A\in\mathbb R^{m\times n}$ は階数 $r\ge1$ を持ち、正の特異値の最小を $\sigma_r>0$ とする。$y\in\mathcal R(A)$、$\|y^\delta-y\|_2\le\delta$ と置き、$x^\dagger=A^\dagger y$、$x^\delta=A^\dagger y^\delta$ と定める。このとき

$$
\|x^\delta-x^\dagger\|_2
\le\frac{\delta}{\sigma_r}.
$$

> $y$ と $y^\delta$ を自由に選べるなら、係数 $1/\sigma_r$ は改善できない。さらに、元の未知量 $x_*$ が $Ax_*=y$ を満たす場合は

$$
x^\delta-x_*
=A^\dagger(y^\delta-y)-P_{\ker A}x_*.
$$

> 特に核成分 $P_{\ker A}x_*$ は観測ノイズを零にしても復元されない。
<!-- formal-statement-end -->

### 証明の見取り図

擬似逆は正の特異値方向を $1/\sigma_j$ 倍するので、小さい特異値ほど誤差を増幅します。最小特異値方向だけにノイズを置くと評価は等号になります。核成分は、[最小ノルム解の特異値表示の定理](#thm-inv1-minimum-norm)の射影式を使って分離します。

<!-- proof-start -->
### 証明

$e=y^\delta-y$ と置きます。[擬似逆の定義](#def-inv1-pseudoinverse)と $v_j$ の直交性から

$$
\begin{aligned}
\|A^\dagger e\|_2^2
&=\left\|\sum_{j=1}^r
\frac{\langle e,u_j\rangle}{\sigma_j}v_j\right\|_2^2\\
&=\sum_{j=1}^r\frac{|\langle e,u_j\rangle|^2}{\sigma_j^2}\\
&\le\frac1{\sigma_r^2}
\sum_{j=1}^r|\langle e,u_j\rangle|^2
\le\frac{\|e\|_2^2}{\sigma_r^2}.
\end{aligned}
$$

最後の不等式は $u_j$ の正規直交性による平方和の上界から従います。$x^\delta-x^\dagger=A^\dagger e$ なので平方根を取り、$\|e\|_2\le\delta$ を代入します。

鋭さは $e=\delta u_r$、$y=0$ で確認できます。このとき

$$
A^\dagger e=(\delta/\sigma_r)v_r
$$

だから $\delta>0$ ならノルムがちょうど $\delta/\sigma_r$ です。

最後に $Ax_*=y$ と仮定します。[最小ノルム解の特異値表示の定理](#thm-inv1-minimum-norm)の射影式から

$$
\begin{aligned}
x^\delta-x_*
&=A^\dagger(Ax_*+e)-x_*\\
&=(P_{(\ker A)^\perp}-I)x_*+A^\dagger e\\
&=-P_{\ker A}x_*+A^\dagger e.
\end{aligned}
$$

特に $e=0$ でも核成分が残ります。$\square$
<!-- proof-end -->

例えば $A=\operatorname{diag}(1,1/100)$ に $x_*=(1,1)^{\mathsf T}$ を入れると $y=(1,0.01)^{\mathsf T}$ です。第二観測成分に $0.001$ の誤差が加わると

$$
y^\delta=(1,0.011)^{\mathsf T},
\qquad
x^\delta=(1,1.1)^{\mathsf T}
$$

となります。観測誤差のノルムは $0.001$ でも、復元の誤差は $0.1$ です。

### 固定行列は安定でも、行列列の評価は一様でない

$$
A_\varepsilon=\begin{pmatrix}1&0\\0&\varepsilon\end{pmatrix},
\qquad 0<\varepsilon\le1
$$

を考えます。各 $\varepsilon>0$ では $A_\varepsilon$ は可逆で、[有限次元線形逆問題の三条件](#thm-inv1-finite-linear)は全て満たされます。しかし

$$
\kappa_2(A_\varepsilon)=\frac1\varepsilon,
\qquad
\|A_\varepsilon^{-1}\|_2=\frac1\varepsilon
$$

なので、$\varepsilon\downarrow0$ とともに安定性定数は発散します。これは「各有限問題が不良設定」なのではなく、**この問題の族について一様な安定性がない**という主張です。連続作用素の逆が非有界となる現象は、次講で別途証明します。

---

## 7. 何を「復元できた」と言えるか

有限次元モデルを読むときは、次の判定順が有用です。

1. 観測写像 $A$ の定義域・値域と、許容データ集合 $Y_0$ を決める。
2. 厳密解の存在を値域、識別可能性を核で判定する。
3. 一意な逆写像があるとき、その連続性を確かめる。
4. ノイズ付きデータに厳密解がなければ、最小二乗という別問題を解くことを明記する。
5. 最小ノルム選択と元の未知量の識別を混同せず、正の最小特異値で誤差増幅を評価する。

特に、長方形行列の正の特異値の比だけを見ても、観測できない核方向や像の外のデータは分かりません。逆問題を「数値的に解ける」に縮めず、存在・一意性・安定性を別々に証明する理由がここにあります。

---

## 演習

### Level A：条件を一つずつ確認する

<a id="ex-inv1-a01"></a>

### INV1-A01 可逆な観測の三条件
- Level: A

$A=\operatorname{diag}(4,2)$ を $\mathbb R^2\to\mathbb R^2$ とする。全ての観測 $y$ に対する厳密解を求め、Hadamard の三条件と $\kappa_2(A)$ を判定せよ。

<!-- solution-start -->
#### 詳細解答

$A$ は対角成分 $4,2$ がともに非零で、逆行列 $\operatorname{diag}(1/4,1/2)$ を持つので全射かつ単射です。任意の $y=(y_1,y_2)^{\mathsf T}$ に対する唯一の厳密解は

$$
x=A^{-1}y
=\begin{pmatrix}y_1/4\\y_2/2\end{pmatrix}.
$$

任意の $y,z$ に対して

$$
\|A^{-1}y-A^{-1}z\|_2^2
=\frac{(y_1-z_1)^2}{16}+\frac{(y_2-z_2)^2}{4}
\le\frac14\|y-z\|_2^2
$$

なので連続依存も成立します。特異値は $4,2$ で、[2-ノルム条件数と特異値の命題](../../../計算系/NA/NA1/index.md#prop-na1-condition-singular-values)から $\kappa_2(A)=4/2=2$ です。
<!-- solution-end -->

<a id="ex-inv1-a02"></a>

### INV1-A02 一行観測の識別可能性
- Level: A

$A=(1\ \ 0):\mathbb R^2\to\mathbb R$ とする。任意の $y\in\mathbb R$ に厳密解は存在するか。全解を示し、一意性を判定せよ。

<!-- solution-start -->
#### 詳細解答

$Ax=y$ は $x_1=y$ の一条件だけなので

$$
\{x:Ax=y\}
=\left\{\begin{pmatrix}y\\t\end{pmatrix}:t\in\mathbb R\right\}.
$$

任意の $y$ に対し $t=0$ とすれば存在します。しかし $t=0$ と $t=1$ は異なる未知量で同じ観測を与えます。[識別可能性の定義](#def-inv1-identifiability)に反し、一意性はありません。選択解 $(y,0)^{\mathsf T}$ が連続であることは、元の方程式の一意性の証明にはなりません。
<!-- solution-end -->

<a id="ex-inv1-a03"></a>

### INV1-A03 列フルランクでも厳密解がない
- Level: A

$A=(1\ \ 0)^{\mathsf T}:\mathbb R\to\mathbb R^2$ とし、$y=(3,0)^{\mathsf T}$、$y^\delta=(3,t)^{\mathsf T}$（$t\ne0$）とする。各データに厳密解があるか判定し、$y^\delta$ の最小二乗解を求めよ。

<!-- solution-start -->
#### 詳細解答

$Ax=(x,0)^{\mathsf T}$ なので $y$ は $x=3$ を唯一の厳密解に持ちます。一方 $y^\delta$ の第二成分 $t\ne0$ は $Ax$ の第二成分 $0$ と一致せず、厳密解はありません。最小二乗では

$$
\|Ax-y^\delta\|_2^2=(x-3)^2+t^2
$$

を最小化します。第一項は $x=3$ のときだけ零なので、唯一の最小二乗解は $x=3$、最小残差二乗は $t^2$ です。
<!-- solution-end -->

<a id="ex-inv1-a04"></a>

### INV1-A04 小特異値方向の誤差
- Level: A

$A=\operatorname{diag}(1,1/5)$、$x_*=(2,3)^{\mathsf T}$、$e=(0,1/100)^{\mathsf T}$ とする。$y=Ax_*$ と $y^\delta=y+e$ を計算し、厳密な逆行列で復元したときの絶対誤差と条件数を求めよ。

<!-- solution-start -->
#### 詳細解答

行列積を成分ごとに行うと

$$
y=\begin{pmatrix}2\\3/5\end{pmatrix},
\quad
y^\delta=\begin{pmatrix}2\\61/100\end{pmatrix},
\quad
A^{-1}=\operatorname{diag}(1,5).
$$

したがって

$$
\widehat x=A^{-1}y^\delta
=\begin{pmatrix}2\\61/20\end{pmatrix},
\qquad
\widehat x-x_*=\begin{pmatrix}0\\1/20\end{pmatrix}.
$$

誤差のノルムは $1/20$、観測誤差は $1/100$ なので5倍です。特異値は $1,1/5$、条件数は $5$ です。
<!-- solution-end -->

<a id="ex-inv1-a05"></a>

### INV1-A05 擬似逆は何を消すか
- Level: A

$A=(2\ \ 0):\mathbb R^2\to\mathbb R$ とする。$A^\dagger$ を特異値から構成し、$y=6$ に対する全厳密解と最小ノルム解を示せ。

<!-- solution-start -->
#### 詳細解答

$Ae_1=2$、$Ae_2=0$ で、正の特異値は $\sigma_1=2$、対応する左右特異ベクトルは $v_1=e_1$、$u_1=1$ です。[擬似逆の定義](#def-inv1-pseudoinverse)から

$$
A^\dagger=\begin{pmatrix}1/2\\0\end{pmatrix}.
$$

厳密方程式 $2x_1=6$ の解は $(3,t)^{\mathsf T}$（$t\in\mathbb R$）で、そのノルム平方は $9+t^2$ です。最小となるのは $t=0$ だけで、

$$
A^\dagger6=(3,0)^{\mathsf T}
$$

と一致します。識別不能な第二成分を零に選んだのであり、第二成分が本当に零だと観測から推論したわけではありません。
<!-- solution-end -->

### Level B：複数の条件をつなぐ

<a id="ex-inv1-b01"></a>

### INV1-B01 列フルランクと全射は別
- Level: B

$A\in\mathbb R^{3\times2}$ の二列が一次独立とする。任意の $y\in\mathbb R^3$ に対する厳密解の存在・一意性を判定し、$y\in\mathcal R(A)$ に限ればどのような安定性評価を得られるか証明せよ。

<!-- solution-start -->
#### 詳細解答

二列の一次独立性から $\operatorname{rank}A=2$ です。階数は3に達しないため、像は $\mathbb R^3$ の真部分空間です。従って像の外の $y$ に厳密解はありません。一方、階数と入力次元がともに2なので $\ker A=\{0\}$、厳密解があれば一意です。

二つの正の特異値を $\sigma_1\ge\sigma_2>0$ とし、$h=x-z$ を右特異ベクトルで $h=a_1v_1+a_2v_2$ と展開します。[SVD の正規直交性](../../../基礎科目/F0/F0-00F2/index.md#thm-f0-00f2-svd)から

$$
\|Ah\|_2^2
=\sigma_1^2a_1^2+\sigma_2^2a_2^2
\ge\sigma_2^2(a_1^2+a_2^2).
$$

よって $\|h\|_2\le\sigma_2^{-1}\|Ah\|_2$ です。像上では逆写像は Lipschitz 連続ですが、$\mathbb R^3$ 全体を許容データとした Hadamard の存在条件は回復しません。
<!-- solution-end -->

<a id="ex-inv1-b02"></a>

### INV1-B02 階数欠損と最小ノルム
- Level: B

$$
A=\begin{pmatrix}1&1\\2&2\end{pmatrix},
\qquad
y=\begin{pmatrix}1\\0\end{pmatrix}
$$

とする。正の特異値、全最小二乗解、最小ノルム解、最小残差二乗を求め、SVD の擬似逆と一致することを確認せよ。

<!-- solution-start -->
#### 詳細解答

$A=uv^{\mathsf T}$、$u=(1,2)^{\mathsf T}$、$v=(1,1)^{\mathsf T}$ と分解できます。$u/\sqrt5$ と $v/\sqrt2$ は単位ベクトルなので

$$
A=\sqrt{10}\frac{u}{\sqrt5}\frac{v^{\mathsf T}}{\sqrt2}
$$

が階数1の SVD で、唯一の正の特異値は $\sqrt{10}$ です。[擬似逆の定義](#def-inv1-pseudoinverse)より

$$
A^\dagger=\frac{vu^{\mathsf T}}{\|u\|_2^2\|v\|_2^2}
=\frac1{10}\begin{pmatrix}1&2\\1&2\end{pmatrix},
\qquad
A^\dagger y=\begin{pmatrix}1/10\\1/10\end{pmatrix}.
$$

別に $s=x_1+x_2$ と置くと

$$
\|Ax-y\|_2^2=(s-1)^2+(2s)^2
=5\left(s-\frac15\right)^2+\frac45.
$$

したがって全最小二乗解は $x_1+x_2=1/5$、最小残差二乗は $4/5$ です。この制約下では

$$
x_1^2+x_2^2
=\frac12(x_1+x_2)^2+\frac12(x_1-x_2)^2
$$

なので $x_1=x_2=1/10$ のときだけノルムが最小となります。[特異値分解（SVD）](../../../基礎科目/F0/F0-00F2/index.md#thm-f0-00f2-svd)から計算した $A^\dagger y$ と一致しました。
<!-- solution-end -->

<a id="ex-inv1-b03"></a>

### INV1-B03 相対条件数の等号例
- Level: B

$A=\operatorname{diag}(3,1/4)$、$x=e_1$、$e=te_2$（$t\ne0$）とする。観測 $y=Ax$ と復元 $\widehat x=A^{-1}(y+e)$ に対して、[右辺摂動の感度定理](../../../計算系/NA/NA1/index.md#thm-na1-linear-system-perturbation)が等号となることを直接示せ。

<!-- solution-start -->
#### 詳細解答

$y=(3,0)^{\mathsf T}$ なので $\|y\|_2=3$、$\|x\|_2=1$ です。また $A^{-1}=\operatorname{diag}(1/3,4)$ なので

$$
\widehat x-x=A^{-1}e=(0,4t)^{\mathsf T}.
$$

左辺の相対誤差は $4|t|$ です。条件数は $\kappa_2(A)=3/(1/4)=12$ なので、右辺は

$$
\kappa_2(A)\frac{\|e\|_2}{\|y\|_2}
=12\frac{|t|}{3}=4|t|.
$$

従って等号が成立します。最大伸長方向を真の入力、最小伸長方向を測定誤差に選んだことが効いています。
<!-- solution-end -->

<a id="ex-inv1-b04"></a>

### INV1-B04 有限次元の列で一様安定性が失われる
- Level: B

$0<\varepsilon\le1$ とし $A_\varepsilon=\operatorname{diag}(1,\varepsilon)$ とする。真の未知量を $x_*=(1,1)^{\mathsf T}$、観測誤差を $e_\varepsilon=(0,\varepsilon/2)^{\mathsf T}$ とする。各行列の適切設定性、誤差水準、復元誤差を求め、$\varepsilon\downarrow0$ の意味を説明せよ。

<!-- solution-start -->
#### 詳細解答

$\det A_\varepsilon=\varepsilon>0$ なので、各 $\varepsilon$ について存在・一意性・連続依存が成立します。厳密観測とノイズ付き観測は

$$
y_\varepsilon=(1,\varepsilon)^{\mathsf T},
\qquad
y_\varepsilon^\delta=(1,3\varepsilon/2)^{\mathsf T}
$$

です。誤差水準は $\delta_\varepsilon=\|e_\varepsilon\|_2=\varepsilon/2\to0$ です。しかし

$$
A_\varepsilon^{-1}y_\varepsilon^\delta
=(1,3/2)^{\mathsf T},
\qquad
\|A_\varepsilon^{-1}y_\varepsilon^\delta-x_*\|_2=1/2
$$

となり、復元誤差は零に近づきません。理由は $\|A_\varepsilon^{-1}\|_2=1/\varepsilon$ が発散し、誤差上界 $\delta_\varepsilon/\varepsilon=1/2$ が小さくならないからです。個々の有限行列の不良設定性ではなく、行列列に関する一様評価の失敗です。
<!-- solution-end -->

### Level C：三条件・選択解・ノイズの統合

<a id="ex-inv1-c01"></a>

### INV1-C01 二つの長方形観測を比較する
- Level: C

$$
A=\begin{pmatrix}1&0&0\\0&1/10&0\end{pmatrix}
:\mathbb R^3\to\mathbb R^2,
\qquad
B=\begin{pmatrix}1&0\\0&1/10\\0&0\end{pmatrix}
:\mathbb R^2\to\mathbb R^3
$$

について次を示せ。

1. $Y_0$ をそれぞれの出力空間全体としたとき、存在・一意性・識別可能性を判定する。
2. $A$ に対する $y=(2,1)^{\mathsf T}$ の全厳密解と最小ノルム解を求める。
3. $y^\delta=(2,1.02)^{\mathsf T}$ とした場合の $A^\dagger y^\delta$ と復元誤差を求め、誤差上界の等号を確認する。
4. $B$ に対する $z=(2,1,0)^{\mathsf T}$ と $z^\delta=(2,1,0.01)^{\mathsf T}$ を比較し、厳密解と最小二乗解の違いを説明する。

<!-- solution-start -->
#### 詳細解答

**1.** $A$ の二行は独立なので $\operatorname{rank}A=2$ です。出力次元が2なので全射、入力次元が3なので核は1次元で単射ではありません。実際、

$$
\ker A=\operatorname{span}\{(0,0,1)^{\mathsf T}\}
$$

です。従って任意の出力に厳密解がありますが、識別不能で一意ではありません。一方 $B$ も階数2ですが、入力次元2と等しいので単射、出力次元3より小さいので全射ではありません。$B$ は識別可能ですが、全ての三次元データを説明できません。両者とも三条件は揃いません。

**2.** $Ax=y$ を成分ごとに書くと $x_1=2$、$x_2/10=1$ です。第三成分に制約はなく、全解は

$$
x=(2,10,t)^{\mathsf T}\quad(t\in\mathbb R).
$$

ノルム平方は $4+100+t^2$ なので最小ノルム解は $x^\dagger=(2,10,0)^{\mathsf T}$ です。[擬似逆の定義](#def-inv1-pseudoinverse)から

$$
A^\dagger
=\begin{pmatrix}1&0\\0&10\\0&0\end{pmatrix}
$$

と計算しても同じです。

**3.** 観測誤差は $e=y^\delta-y=(0,0.02)^{\mathsf T}$、そのノルムは $\delta=0.02$ です。擬似逆を掛けると

$$
x^\delta=A^\dagger y^\delta=(2,10.2,0)^{\mathsf T},
\qquad
x^\delta-x^\dagger=(0,0.2,0)^{\mathsf T}.
$$

最小の正の特異値は $1/10$ なので、[誤差増幅の定理](#thm-inv1-noise-amplification)の上界は $\delta/(1/10)=0.2$ です。実際の誤差も $0.2$ で等号です。ただし真の入力が $(2,10,7)^{\mathsf T}$ なら、第三成分の誤差 $-7$ はノイズを減らしても消えません。

**4.** $Bx=(x_1,x_2/10,0)^{\mathsf T}$ なので、$z$ は唯一の厳密解 $(2,10)^{\mathsf T}$ を持ちます。一方 $z^\delta$ の第三成分は $0.01\ne0$ で、どの $x$ からも生成できません。残差平方和の最小化は

$$
\|Bx-z^\delta\|_2^2
=(x_1-2)^2+(x_2/10-1)^2+(0.01)^2.
$$

前二項を同時に零にする $x=(2,10)^{\mathsf T}$ が唯一の最小化点で、最小残差二乗は $0.0001$ です。厳密解の非存在と、最小二乗解が存在して一意であることは矛盾しません。
<!-- solution-end -->

---

次は **INV2「コンパクト作用素はなぜ逆を不安定にするか」** へ進みます。そこでは無限次元のコンパクト作用素を考え、有限行列ごとには有限だった逆向きの増幅が、単一の作用素について有界でなくなり得る理由を証明します。
