# VN5 正規汎関数・正規状態・トレース

<!-- definition-example-audit: strict -->

> **既出概念**：[OA5 の正線形汎関数](../OA5/index.md#def-oa5-positive-functional)と[状態](../OA5/index.md#def-oa5-state)、[正線形汎関数の Cauchy--Schwarz 不等式](../OA5/index.md#thm-oa5-positive-cauchy-schwarz)、[VN4 の trace class とトレース](../VN4/index.md#def-vn4-trace-class)、[trace class による双対性](../VN4/index.md#thm-vn4-trace-duality)、[predual](../VN4/index.md#def-vn4-predual)、[ultraweak 位相](../VN4/index.md#def-vn4-ultraweak-topology)を使います。

OA5 では、$C^*$-環から数を読み取る規則として**状態**を導入しました。状態 $\varphi$ は正で、

$$
\varphi(I)=1
$$

を満たします。しかし、von Neumann 環まで進むと「状態である」だけでは、作用素の弱い極限と相性がよいとは限りません。

VN4 では別の方向から、

$$
B(H)=S_1(H)^*
$$

という双対構造を作り、$S_1(H)$ を試験側に置く弱*位相として ultraweak 位相を導入しました。すると次の問いが自然に出ます。

> 状態のうち、von Neumann 環の弱い極限を壊さずに読み取れるものはどれか。

答えは、predual の元として現れる状態です。本章では「状態であり、しかも ultraweak 極限を保つ」という追加条件を切り出します。

特に $B(H)$ では、この特別な状態は一つの正の trace class 作用素

$$
\rho\ge0,
\qquad
\operatorname{Tr}(\rho)=1
$$

によって

$$
\varphi(A)=\operatorname{Tr}(A\rho)
$$

と完全に表せます。量子力学で「密度行列」と呼ばれる対象が、ここでは「predual の正で正規化された元」として現れます。

後半では「状態」と「トレース」を分けます。有限次元では正規化トレースが状態でしたが、無限次元 $B(H)$ の標準トレースは

$$
\operatorname{Tr}(I)=\infty
$$

です。それでも、正規・忠実・半有限という非常に重要な性質を持ちます。

本章の流れは

$$
\text{predual}
\longrightarrow
\text{正規汎関数}
\longrightarrow
\text{ultraweak 連続な状態}
\longrightarrow
\text{正でトレース1の trace class 作用素}
\longrightarrow
\text{射影の単調極限}
\longrightarrow
\text{正規・忠実・半有限トレース}
$$

です。

---

## 1. 正規汎関数：ultraweak 極限をそのまま読める汎関数

von Neumann 環 $M$ は VN4 により predual $M_*$ を持つ双対 Banach 空間として見られます。

したがって $M$ 上の有界線形汎関数のうち、predual から来るものだけを区別できます。これが本章でいう「正規」です。

<a id="def-vn5-normal-functional"></a>

<!-- formal-statement-start -->
### 定義（正規汎関数）

$M\subset B(H)$ を具体的 von Neumann 環とする。

有界線形汎関数

$$
\varphi:M\to\mathbb C
$$

が **正規汎関数** であるとは、$\varphi$ が ultraweak 位相に関して連続であることをいう。

同値に、

$$
\varphi\in M_*
$$

であることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vn5-normal-functional -->

### **定義の確認**：ベクトル汎関数は正規

$x,y\in H$ を固定し、

$$
\omega_{x,y}(A)=\langle Ax,y\rangle
$$

と置きます。

VN4 の rank-one 作用素

$$
\theta_{x,y}z=\langle z,y\rangle x
$$

を使うと、

$$
\operatorname{Tr}(A\theta_{x,y})
=
\langle Ax,y\rangle.
$$

したがって

$$
\omega_{x,y}(A)
=
\operatorname{Tr}(A\theta_{x,y}).
$$

rank-one 作用素 $\theta_{x,y}$ は trace class なので、$\omega_{x,y}$ は predual の元です。従って

$$
\boxed{
\omega_{x,y}\text{ は正規汎関数}
}.
$$

ここでは「ベクトル汎関数だから正規」と暗記したのではなく、VN4 の predual 表示へ実際に落としました。

<!-- definition-example-end -->

正規性は「正」という意味ではありません。一般の $\omega_{x,y}$ は $x=y$ でなければ正とは限りません。

したがって

- **positive**：正元を非負実数へ送る
- **normal**：ultraweak 極限を保つ

は別の条件です。

---

## 2. $B(H)$ では正規汎関数は trace class 作用素そのもの

VN4 では

$$
B(H)_*=S_1(H)
$$

を構成しました。

この事実を、今度は「$B(H)$ 上の汎関数」という向きで読み直します。

<a id="prop-vn5-normal-trace-class-representation"></a>

<!-- formal-statement-start -->
### 命題（有界作用素環上の正規汎関数の trace class 表示）

$H$ を複素 Hilbert 空間とする。

有界線形汎関数

$$
\varphi:B(H)\to\mathbb C
$$

が正規であることと、ある一意な $T\in S_1(H)$ が存在して

$$
\boxed{
\varphi(A)=\operatorname{Tr}(AT)
\qquad
(A\in B(H))
}
$$

と書けることは同値である。

さらに

$$
\boxed{
\|\varphi\|=\|T\|_1
}
$$

が成り立つ。
<!-- formal-statement-end -->

### なぜこれは VN4 の言い換えなのか

VN4 で ultraweak 位相を

$$
\sigma(B(H),S_1(H))
$$

と定義しました。

弱*位相の定義から、この位相に連続な線形汎関数はちょうど pairing の相手側 $S_1(H)$ の元です。具体的 pairing は

$$
(A,T)\longmapsto\operatorname{Tr}(AT)
$$

でした。

したがって存在・一意性・ノルム等式は、[VN4 の trace duality](../VN4/index.md#thm-vn4-trace-duality)と[ultraweak 位相の定義](../VN4/index.md#def-vn4-ultraweak-topology)を同じ pairing で読み直したものです。

この命題により、抽象的な

$$
\varphi\in B(H)_*
$$

を、一つの具体的な trace class 作用素 $T$ へ戻せます。

---

## 3. 正規汎関数が正であることは、代表作用素が正であること

前節では $T$ は任意の trace class 作用素でした。

状態へ進むには正性が必要です。ここで正性は、汎関数側と作用素側で完全に一致します。

<a id="prop-vn5-positive-normal-trace-class"></a>

<!-- formal-statement-start -->
### 命題（正規汎関数の正性と正 trace class 作用素）

$T\in S_1(H)$ とし、

$$
\varphi_T(A)=\operatorname{Tr}(AT)
$$

とする。

このとき次は同値である。

1. $\varphi_T$ は $B(H)$ 上の正線形汎関数である。
2. $T$ は正作用素である。

すなわち

$$
\boxed{
\varphi_T\ge0
\quad\Longleftrightarrow\quad
T\ge0.
}
$$
<!-- formal-statement-end -->

### 証明の見取り図

$T\ge0$ なら、コンパクト正作用素のスペクトル分解で

$$
T=\sum_n t_n\theta_{e_n,e_n},
\qquad
t_n\ge0,
\qquad
\sum_n t_n<\infty
$$

と書けます。正元 $A\ge0$ に対して各

$$
\langle Ae_n,e_n\rangle
$$

が非負なので、トレースも非負になります。

逆向きでは rank-one 射影だけを試します。

$$
P_x=\theta_{x,x}
$$

に対する $\varphi_T(P_x)$ が全て非負なら、

$$
\langle Tx,x\rangle\ge0
$$

が全ての $x$ で成り立つため $T\ge0$ です。

<!-- proof-start -->
### 証明

まず $T\ge0$ とします。

$T$ は正の trace class 作用素なので、[コンパクト自己共役作用素のスペクトル定理](../FA7/index.md#thm-fa7-compact-self-adjoint-spectral)により、正規直交系 $(e_n)$ と非負数列 $(t_n)$ を使って

$$
T
=
\sum_{n=1}^{\infty}
t_n\theta_{e_n,e_n},
$$

しかも

$$
\sum_{n=1}^{\infty}t_n
=
\operatorname{Tr}(T)
<
\infty
$$

と書けます。

$A\ge0$ を取ります。[rank-one 作用素のトレース公式](../VN4/index.md#prop-vn4-trace-rank-one)とトレースノルム収束から

$$
\begin{aligned}
\varphi_T(A)
&=
\operatorname{Tr}(AT)\\
&=
\sum_{n=1}^{\infty}
t_n\operatorname{Tr}(A\theta_{e_n,e_n})\\
&=
\sum_{n=1}^{\infty}
t_n\langle Ae_n,e_n\rangle.
\end{aligned}
$$

$A\ge0$ だから

$$
\langle Ae_n,e_n\rangle\ge0
$$

であり、$t_n\ge0$ です。従って

$$
\varphi_T(A)\ge0.
$$

よって $\varphi_T$ は正です。

逆に $\varphi_T$ が正であるとします。

任意の $x\in H$ に対して

$$
P_x=\theta_{x,x}
$$

は正作用素です。したがって

$$
0
\le
\varphi_T(P_x)
=
\operatorname{Tr}(P_xT).
$$

[rank-one 作用素のトレース公式](../VN4/index.md#prop-vn4-trace-rank-one)と、VN4 で示した $\operatorname{Tr}(AT)=\operatorname{Tr}(TA)$ を使うと

$$
\operatorname{Tr}(P_xT)
=
\operatorname{Tr}(TP_x)
=
\langle Tx,x\rangle.
$$

従って任意の $x$ で

$$
\langle Tx,x\rangle\ge0.
$$

よって $T$ は正作用素です。
<!-- proof-end -->

この証明で重要なのは、正性を確認するために $B(H)$ の全ての正元を直接調べる必要がない点です。rank-one 射影が $T$ の二次形式を全部読み取ってくれます。

---

## 4. 状態に ultraweak 連続性を課し、作用素で表す

OA5 の状態は「正で、単位元を1へ送る汎関数」でした。

そこへ正規性を加えます。

<a id="def-vn5-normal-state"></a>

<!-- formal-statement-start -->
### 定義（正規状態）

$M$ を単位的 von Neumann 環とする。

状態

$$
\varphi:M\to\mathbb C
$$

がさらに正規汎関数であるとき、$\varphi$ を **正規状態** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vn5-normal-state -->

### **定義の確認**：単位ベクトルが作る状態

$\xi\in H$ を

$$
\|\xi\|=1
$$

とし、

$$
\omega_\xi(A)=\langle A\xi,\xi\rangle
$$

と置きます。

$A=B^*B\ge0$ なら

$$
\omega_\xi(A)
=
\|B\xi\|^2
\ge0.
$$

また

$$
\omega_\xi(I)
=
\|\xi\|^2
=
1.
$$

したがって $\omega_\xi$ は状態です。

さらに

$$
\omega_\xi(A)
=
\operatorname{Tr}(A\theta_{\xi,\xi})
$$

で、$\theta_{\xi,\xi}$ は trace class です。従って $\omega_\xi$ は正規です。

よって

$$
\boxed{
\omega_\xi\text{ は正規状態}
}.
$$

<!-- definition-example-end -->

$B(H)$ では、正規状態を作用素一個で表すための名前を付けます。

<a id="def-vn5-density-operator"></a>

<!-- formal-statement-start -->
### 定義（密度作用素）

$H$ を複素 Hilbert 空間とする。

作用素 $\rho\in S_1(H)$ が

$$
\rho\ge0
$$

かつ

$$
\operatorname{Tr}(\rho)=1
$$

を満たすとき、$\rho$ を **密度作用素** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vn5-density-operator -->

### **定義の確認**：$2\times2$ の混合密度作用素

$$
\rho
=
\begin{pmatrix}
\frac34&0\\
0&\frac14
\end{pmatrix}
$$

とします。

固有値は

$$
\frac34,\qquad\frac14
$$

でどちらも非負なので

$$
\rho\ge0.
$$

また有限次元では全作用素が trace class で、

$$
\operatorname{Tr}(\rho)
=
\frac34+\frac14
=
1.
$$

従って

$$
\boxed{
\rho\text{ は密度作用素}
}.
$$

<!-- definition-example-end -->

ここまでで条件は揃いました。次が本章の最初の中心定理です。

<a id="thm-vn5-density-state-correspondence"></a>

<!-- formal-statement-start -->
### 定理（正規状態と密度作用素の対応）

$H$ を複素 Hilbert 空間とする。

$B(H)$ 上の正規状態 $\varphi$ と密度作用素 $\rho$ の間には一対一対応があり、

$$
\boxed{
\varphi(A)=\operatorname{Tr}(A\rho)
\qquad
(A\in B(H))
}
$$

で与えられる。

対応する $\rho$ は一意である。
<!-- formal-statement-end -->

### 証明の見取り図

正規性から、前節の trace class 表示

$$
\varphi(A)=\operatorname{Tr}(AT)
$$

が得られます。

状態の正性から $T\ge0$、正規化条件

$$
\varphi(I)=1
$$

から

$$
\operatorname{Tr}(T)=1
$$

が出ます。したがって $T$ は密度作用素です。

逆向きは、密度作用素が predual の正で正規化された元であることを確認すれば終わります。

<!-- proof-start -->
### 証明

$\varphi$ を $B(H)$ 上の正規状態とします。

[正規汎関数の trace class 表示](#prop-vn5-normal-trace-class-representation)により、一意な $T\in S_1(H)$ が存在して

$$
\varphi(A)
=
\operatorname{Tr}(AT)
$$

と書けます。

$\varphi$ は正なので、[正性と正 trace class 作用素の同値](#prop-vn5-positive-normal-trace-class)から

$$
T\ge0.
$$

さらに状態なので

$$
1
=
\varphi(I)
=
\operatorname{Tr}(IT)
=
\operatorname{Tr}(T).
$$

従って $T$ は密度作用素です。$\rho=T$ と置けば

$$
\varphi(A)
=
\operatorname{Tr}(A\rho)
$$

が得られます。

逆に $\rho$ を密度作用素とします。

$$
\varphi_\rho(A)
=
\operatorname{Tr}(A\rho)
$$

と置くと、$\rho\in S_1(H)$ なので $\varphi_\rho$ は正規汎関数です。

また $\rho\ge0$ なので、[正規汎関数の正性と正 trace class 作用素](#prop-vn5-positive-normal-trace-class)より $\varphi_\rho$ は正です。

さらに

$$
\varphi_\rho(I)
=
\operatorname{Tr}(\rho)
=
1.
$$

従って $\varphi_\rho$ は正規状態です。

最後に一意性を確認します。

二つの密度作用素 $\rho,\sigma$ が全ての $A\in B(H)$ に対して

$$
\operatorname{Tr}(A\rho)
=
\operatorname{Tr}(A\sigma)
$$

を満たすとします。

すると

$$
\operatorname{Tr}(A(\rho-\sigma))=0
$$

が全ての $A$ で成り立ちます。

VN4 の trace duality は pairing が非退化であることも含むので

$$
\rho-\sigma=0.
$$

したがって

$$
\boxed{
\rho=\sigma
}.
$$
<!-- proof-end -->

$B(H)$ では、正規状態を調べることと密度作用素を調べることは同じです。

---

## 5. 純粋な一方向だけを見る状態と、複数方向を混ぜる状態

密度作用素の意味を有限次元で確認します。

単位ベクトル $\xi$ に対するベクトル状態は

$$
\omega_\xi(A)=\langle A\xi,\xi\rangle
$$

でした。

対応する密度作用素は

$$
\rho_\xi
=
\theta_{\xi,\xi}.
$$

実際

$$
\operatorname{Tr}(A\rho_\xi)
=
\langle A\xi,\xi\rangle.
$$

一方、正規直交ベクトル $e_1,\ldots,e_m$ と

$$
p_j\ge0,
\qquad
\sum_{j=1}^{m}p_j=1
$$

を取って

$$
\rho
=
\sum_{j=1}^{m}
p_j\theta_{e_j,e_j}
$$

とすると、

$$
\varphi_\rho(A)
=
\sum_{j=1}^{m}
p_j\langle Ae_j,e_j\rangle.
$$

これは複数のベクトル状態を、非負で総和1の係数で混ぜた重み付き平均です。

たとえば

$$
\rho
=
\begin{pmatrix}
\frac34&0\\
0&\frac14
\end{pmatrix},
\qquad
A=
\begin{pmatrix}
2&1\\
1&6
\end{pmatrix}
$$

なら

$$
\begin{aligned}
\varphi_\rho(A)
&=
\operatorname{Tr}(A\rho)\\
&=
\operatorname{Tr}
\begin{pmatrix}
\frac32&\frac14\\
\frac34&\frac32
\end{pmatrix}\\
&=
3.
\end{aligned}
$$

同じ計算を重み付き平均として書けば

$$
\frac34\cdot2
+
\frac14\cdot6
=
3.
$$

ここで量子力学の解釈へ踏み込む必要はありません。作用素環論で重要なのは、

$$
\boxed{
\text{正規状態}
=
\text{predual の正でノルム1の元}
}
$$

であり、$B(H)$ ではそれが正の trace class 作用素として可視化できることです。

---

## 6. 正規性は増大する射影の極限を壊さない

ultraweak 連続性は位相の言葉です。

しかし正の汎関数では、もっと順序的に見える性質が出ます。

射影のネット $(P_\alpha)$ が

$$
P_\alpha\le P_\beta
\qquad
(\alpha\le\beta)
$$

を満たし、SOT で $P$ へ収束するとき、

$$
P_\alpha\uparrow P
$$

と書きます。

射影はノルム1以下なので、このネットはノルム有界です。VN4 で、ノルム有界集合上では WOT と ultraweak 位相が一致することを示しました。

<a id="prop-vn5-normal-monotone-projections"></a>

<!-- formal-statement-start -->
### 命題（正規な正汎関数は増大射影の上限を保つ）

$M\subset B(H)$ を von Neumann 環とし、$\varphi:M\to\mathbb C$ を正規な正線形汎関数とする。

$M$ の射影族が

$$
P_\alpha\uparrow P
$$

を満たすなら、

$$
\boxed{
\varphi(P_\alpha)
\uparrow
\varphi(P)
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$P_\alpha\to P$ は SOT 収束なので WOT 収束でもあります。

射影族はノルム有界なので VN4 の WOT と ultraweak の比較を使って ultraweak 収束へ上げられます。

最後に正規性を使って値の収束を取り、正性から単調増加であることを確認します。

<!-- proof-start -->
### 証明

$P_\alpha\uparrow P$ だから

$$
P_\alpha\xrightarrow{\mathrm{SOT}}P.
$$

SOT 収束は WOT 収束を含むので

$$
P_\alpha\xrightarrow{\mathrm{WOT}}P.
$$

各射影の作用素ノルムは高々1です。したがってネット $(P_\alpha)$ はノルム有界です。

[VN4 の WOT と ultraweak 位相の比較](../VN4/index.md#prop-vn4-wot-ultraweak)から、ノルム有界集合上では WOT 収束と ultraweak 収束が一致します。従って

$$
P_\alpha\xrightarrow{\mathrm{ultraweak}}P.
$$

$\varphi$ は正規、すなわち ultraweak 連続なので

$$
\varphi(P_\alpha)
\to
\varphi(P).
$$

一方 $\alpha\le\beta$ なら

$$
P_\beta-P_\alpha\ge0.
$$

$\varphi$ は正だから

$$
\varphi(P_\beta)-\varphi(P_\alpha)
=
\varphi(P_\beta-P_\alpha)
\ge0.
$$

したがって $(\varphi(P_\alpha))$ は増大し、その極限が $\varphi(P)$ です。よって

$$
\boxed{
\varphi(P_\alpha)\uparrow\varphi(P).
}
$$
<!-- proof-end -->

この命題は、正規性を「無限個の互いに直交する成分を足しても、有限部分和から極限を回収できる」という形へ翻訳します。

---

## 7. $B(H)$ では射影の単調連続性から正規性を逆算できる

前節は

$$
\text{normal}
\Longrightarrow
\text{射影上の単調連続性}
$$

でした。

$B(H)$ では逆向きも、VN4 までの道具だけで具体的に証明できます。

<a id="thm-vn5-projection-normality-criterion"></a>

<!-- formal-statement-start -->
### 定理（有界作用素環における射影単調連続性による正規性判定）

$\varphi:B(H)\to\mathbb C$ を正線形汎関数とする。

次の二条件は同値である。

1. $\varphi$ は正規である。
2. 任意の増大する射影ネット
   $$
   P_\alpha\uparrow P
   $$
   に対して
   $$
   \varphi(P_\alpha)\uparrow\varphi(P)
   $$
   が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$1\Rightarrow2$ は前節です。

逆向きでは、まず rank-one 作用素だけを使って

$$
b(x,y)=\varphi(\theta_{x,y})
$$

という有界半双線形形式を作ります。Riesz 表現により

$$
b(x,y)=\langle\rho x,y\rangle
$$

となる正作用素 $\rho$ が得られます。

次に有限次元部分空間 $F$ への射影 $P_F$ を増大させます。仮定から

$$
\varphi(P_F)\uparrow\varphi(I).
$$

一方

$$
\varphi(P_F)
=
\sum_{e_j\in\mathrm{ONB}(F)}
\langle\rho e_j,e_j\rangle.
$$

したがって $\rho$ の対角和の上限が有限で、$\rho$ は trace class です。

最後に有限ランク圧縮

$$
P_FAP_F
$$

から一般の $A$ へ戻し、

$$
\varphi(A)=\operatorname{Tr}(A\rho)
$$

を示します。

<!-- proof-start -->
### 証明

$1\Rightarrow2$ は[正規な正汎関数の射影単調連続性](#prop-vn5-normal-monotone-projections)で示しました。

以下 $2$ を仮定します。

#### Step 1: rank-one 作用素から $\rho$ を作る

$x,y\in H$ に対して

$$
b(x,y)
=
\varphi(\theta_{x,y})
$$

と置きます。

rank-one 作用素の作用素ノルムは

$$
\|\theta_{x,y}\|
=
\|x\|\,\|y\|
$$

なので

$$
|b(x,y)|
\le
\|\varphi\|\,\|x\|\,\|y\|.
$$

したがって $b$ は連続な半双線形形式です。

本教材では内積を第1変数について線形に取っています。Riesz 表現により、一意な $\rho\in B(H)$ が存在して

$$
b(x,y)
=
\langle\rho x,y\rangle
$$

となります。

また

$$
\theta_{x,x}\ge0
$$

であり、$\varphi$ は正なので

$$
\langle\rho x,x\rangle
=
\varphi(\theta_{x,x})
\ge0.
$$

従って

$$
\rho\ge0.
$$

#### Step 2: 射影の単調連続性から $\rho$ が trace class と分かる

$F\subset H$ を有限次元部分空間とし、$P_F$ を $F$ への直交射影とします。

$F$ の正規直交基底を

$$
e_1,\ldots,e_m
$$

とすると

$$
P_F
=
\sum_{j=1}^{m}
\theta_{e_j,e_j}.
$$

したがって

$$
\begin{aligned}
\varphi(P_F)
&=
\sum_{j=1}^{m}
\varphi(\theta_{e_j,e_j})\\
&=
\sum_{j=1}^{m}
\langle\rho e_j,e_j\rangle.
\end{aligned}
$$

有限次元部分空間全体を包含関係で有向集合とみなすと

$$
P_F\uparrow I.
$$

仮定2から

$$
\varphi(P_F)\uparrow\varphi(I).
$$

よって

$$
\sup_F
\sum_{e_j\in\mathrm{ONB}(F)}
\langle\rho e_j,e_j\rangle
=
\varphi(I)
<
\infty.
$$

正作用素 $\rho$ に対するこの有限直交系の和の上限は $\operatorname{Tr}(\rho)$ です。従って

$$
\rho\in S_1(H)
$$

かつ

$$
\operatorname{Tr}(\rho)
=
\varphi(I).
$$

#### Step 3: 有限ランク作用素ではトレース表示が成り立つ

rank-one 作用素に対して

$$
\begin{aligned}
\varphi(\theta_{x,y})
&=
\langle\rho x,y\rangle\\
&=
\operatorname{Tr}(\rho\theta_{x,y})\\
&=
\operatorname{Tr}(\theta_{x,y}\rho)
\end{aligned}
$$

です。

有限ランク作用素は rank-one 作用素の有限和なので、任意の有限ランク $R$ について

$$
\boxed{
\varphi(R)=\operatorname{Tr}(R\rho)
}
$$

が成り立ちます。

#### Step 4: 有限ランク圧縮から一般の作用素へ戻す

再び有限次元部分空間 $F$ と射影 $P_F$ を取ります。

[正線形汎関数の Cauchy--Schwarz 不等式](../OA5/index.md#thm-oa5-positive-cauchy-schwarz)から

$$
\begin{aligned}
|\varphi((I-P_F)A)|^2
&\le
\varphi(I-P_F)\,
\varphi(A^*A)\\
&\le
\|A\|^2
\varphi(I-P_F)\,
\varphi(I).
\end{aligned}
$$

また

$$
P_FA(I-P_F)
=
(A^*P_F)^*(I-P_F)
$$

なので、同じ不等式から

$$
\begin{aligned}
|\varphi(P_FA(I-P_F))|^2
&\le
\varphi(P_FAA^*P_F)\,
\varphi(I-P_F)\\
&\le
\|A\|^2
\varphi(I)\,
\varphi(I-P_F).
\end{aligned}
$$

そして

$$
A-P_FAP_F
=
(I-P_F)A
+
P_FA(I-P_F).
$$

仮定2より

$$
\varphi(P_F)\uparrow\varphi(I),
$$

従って

$$
\varphi(I-P_F)\downarrow0.
$$

上の二つの評価から

$$
\varphi(P_FAP_F)
\to
\varphi(A).
$$

一方 $\rho\in S_1(H)$ なので、VN4 の有限ランク稠密性から

$$
P_F\rho P_F
\to
\rho
$$

がトレースノルムで成り立ちます。

実際、$\varepsilon>0$ に対し有限ランク $R$ を

$$
\|\rho-R\|_1<\varepsilon
$$

となるように取り、$F$ が $\operatorname{ran}R$ と $\operatorname{ran}R^*$ を含めば

$$
P_FRP_F=R.
$$

従って

$$
\begin{aligned}
\|\rho-P_F\rho P_F\|_1
&\le
\|\rho-R\|_1
+
\|P_F(\rho-R)P_F\|_1\\
&\le
2\varepsilon.
\end{aligned}
$$

よって

$$
\begin{aligned}
\operatorname{Tr}(P_FAP_F\rho)
&=
\operatorname{Tr}(P_F\rho P_FA)\\
&=
\operatorname{Tr}(A P_F\rho P_F)\\
&\to
\operatorname{Tr}(A\rho).
\end{aligned}
$$

$P_FAP_F$ は有限ランクなので Step 3 により

$$
\varphi(P_FAP_F)
=
\operatorname{Tr}(P_FAP_F\rho).
$$

両辺の極限を取ると

$$
\boxed{
\varphi(A)=\operatorname{Tr}(A\rho)
}.
$$

したがって $\varphi$ は trace class 作用素 $\rho$ で表されるので正規です。
<!-- proof-end -->

この定理により、$B(H)$ の正の汎関数については「ultraweak 連続」という位相条件を、射影の増大極限という順序条件へ置き換えられます。

---

## 8. 対角模型では $\ell^\infty$ と $\ell^1$ の単調収束になる

$H=\ell^2(\mathbb N)$ とし、

$$
M
=
\{
\operatorname{diag}(a_1,a_2,\ldots):
(a_n)\in\ell^\infty
\}
$$

を考えます。

VN4 で

$$
M_*\cong\ell^1
$$

を確認しました。

従って非負数列

$$
p_n\ge0,
\qquad
\sum_{n=1}^{\infty}p_n=1
$$

に対して

$$
\varphi_p(\operatorname{diag}(a_n))
=
\sum_{n=1}^{\infty}p_na_n
$$

は正規状態です。

座標射影

$$
P_N
=
\operatorname{diag}(
\underbrace{1,\ldots,1}_{N},
0,0,\ldots)
$$

は

$$
P_N\uparrow I
$$

を満たします。

正規性はこの模型では

$$
\varphi_p(P_N)
=
\sum_{n=1}^{N}p_n
\uparrow
\sum_{n=1}^{\infty}p_n
=
1
$$

という、通常の非負級数の部分和収束そのものになります。

抽象的な「正規性」が、離散模型では「可算和を有限部分和から回収できる」という極めて具体的な性質に戻りました。

---

## 9. 一般の von Neumann 環では密度作用素の代表は一意とは限らない

$B(H)$ では

$$
B(H)_*=S_1(H)
$$

なので、正規汎関数に対応する trace class 作用素は一意でした。

しかし部分 von Neumann 環

$$
M\subset B(H)
$$

では、VN4 の predual は

$$
M_*
=
S_1(H)/M_\perp
$$

でした。

したがって二つの trace class 作用素 $T,S$ が

$$
T-S\in M_\perp
$$

を満たすなら、全ての $A\in M$ に対して

$$
\operatorname{Tr}(AT)
=
\operatorname{Tr}(AS).
$$

つまり $M$ 上では同じ正規汎関数を表します。

対角 von Neumann 環では、off-diagonal 成分が $M_\perp$ に入り、対角成分だけが見えました。

したがって

$$
\boxed{
B(H)\text{ では密度作用素が一意}
}
$$

なのに対し、

$$
\boxed{
M\subsetneq B(H)\text{ では「同じ汎関数を表す trace class 代表」が一意とは限らない}
}
$$

という違いがあります。

この違いは、predual を商空間で作った理由そのものです。

---

## 10. 状態とトレースは同じものではない

有限次元の $M_n(\mathbb C)$ では

$$
\tau_n(A)
=
\frac1n\operatorname{Tr}(A)
$$

が状態でした。

この経験だけを見ると「トレースとは特別な状態」と思いたくなります。

しかし無限次元では、恒等作用素のトレースは一般に無限大です。そこで von Neumann 環で使うトレース概念は、最初から $M_+$ 上の拡張値写像として扱うのが自然です。

<a id="def-vn5-von-neumann-trace"></a>

<!-- formal-statement-start -->
### 定義（von Neumann 環上のトレース）

$M$ を von Neumann 環、$M_+$ をその正元全体とする。

写像

$$
\tau:M_+\to[0,\infty]
$$

が次を満たすとき、$\tau$ を **トレース** と呼ぶ。

1. $A,B\in M_+$ に対して
   $$
   \tau(A+B)=\tau(A)+\tau(B).
   $$
2. $\lambda\ge0$ と $A\in M_+$ に対して
   $$
   \tau(\lambda A)=\lambda\tau(A).
   $$
   ここでは $0\cdot\infty=0$ と約束する。
3. 任意の $X\in M$ に対して
   $$
   \boxed{
   \tau(X^*X)=\tau(XX^*)
   }.
   $$

さらに次の性質を区別する。

- **忠実**：$A\in M_+$ について $\tau(A)=0$ なら $A=0$。
- **半有限**：任意の $A\in M_+$ に対して、有限トレースの正元で下から近似できる。すなわち
  $$
  \boxed{
  \tau(A)
  =
  \sup\{\tau(B):0\le B\le A,\ \tau(B)<\infty\}.
  }
  $$
- **正規**：$A_\alpha\uparrow A$ なら
  $$
  \tau(A_\alpha)\uparrow\tau(A).
  $$
<!-- formal-statement-end -->

<!-- definition-example-start: def-vn5-von-neumann-trace -->

### **定義の確認**：$M_n(\mathbb C)$ の通常のトレース

$$
\tau(A)=\operatorname{Tr}(A)
\qquad
(A\ge0)
$$

とします。

正の行列の対角和なので $\tau(A)\ge0$ で、加法性と正の斉次性は通常の行列トレースの線形性から従います。

さらに任意の $X\in M_n(\mathbb C)$ に対して

$$
\operatorname{Tr}(X^*X)
=
\sum_{i,j}|x_{ij}|^2
=
\operatorname{Tr}(XX^*).
$$

従ってトレース条件も満たします。

有限次元では全ての正元のトレースが有限なので半有限性は自動です。また

$$
\operatorname{Tr}(A)=0,
\qquad
A\ge0
$$

なら非負固有値の和が0なので全固有値が0、従って $A=0$ です。よって忠実でもあります。

<!-- definition-example-end -->

ここで「正規状態」と「正規トレース」を混同しないでください。

- 正規状態は **線形汎関数** で、必ず $\varphi(I)=1$。
- トレースはまず $M_+$ 上の **拡張値写像** で、$\tau(I)=\infty$ でもよい。
- 有限値トレースを線形に拡張し、さらに $\tau(I)=1$ なら トレース状態 になる。

---

## 11. $B(H)$ の標準トレース

ここから $H$ を可分複素 Hilbert 空間とし、正規直交基底を

$$
(e_n)_{n\ge1}
$$

とします。

$A\in B(H)_+$ に対して

$$
\operatorname{Tr}_H(A)
=
\sum_{n=1}^{\infty}
\langle Ae_n,e_n\rangle
\in[0,\infty]
$$

と置きます。

正元なので各項は非負であり、級数は無限大へ発散しても構いません。

### 基底に依らないこと

別の正規直交基底 $(f_m)$ を取ります。

$$
\langle Ae_n,e_n\rangle
=
\|A^{1/2}e_n\|^2.
$$

[Parseval の等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-parseval-identity)を使うと

$$
\begin{aligned}
\sum_n\|A^{1/2}e_n\|^2
&=
\sum_n\sum_m
|\langle A^{1/2}e_n,f_m\rangle|^2\\
&=
\sum_m\sum_n
|\langle e_n,A^{1/2}f_m\rangle|^2\\
&=
\sum_m
\|A^{1/2}f_m\|^2.
\end{aligned}
$$

全項が非負なので、二重和の順序交換で条件収束の問題はありません。

従って $\operatorname{Tr}_H(A)$ は基底に依存しません。

<a id="thm-vn5-standard-bh-trace"></a>

<!-- formal-statement-start -->
### 定理（有界作用素環の標準トレースは正規・忠実・半有限）

$H$ を可分複素 Hilbert 空間とする。

$A\in B(H)_+$ に対して

$$
\operatorname{Tr}_H(A)
=
\sum_{n=1}^{\infty}
\langle Ae_n,e_n\rangle
$$

と定める。

この写像は基底に依らず、$B(H)$ 上のトレースである。

さらに $\operatorname{Tr}_H$ は

- 正規
- 忠実
- 半有限

である。

正の trace class 作用素上では、VN4 の作用素トレースと一致する。
<!-- formal-statement-end -->

### 証明の見取り図

トレース条件

$$
\operatorname{Tr}_H(X^*X)
=
\operatorname{Tr}_H(XX^*)
$$

は、行列要素の絶対値二乗を二重に足した同じ量であることから出ます。

忠実性は

$$
\langle Ae_n,e_n\rangle
=
\|A^{1/2}e_n\|^2
$$

を使います。

半有限性では、非零正元 $A$ の中に rank-one の正元を一つ埋め込みます。スペクトル分解は不要で、Cauchy--Schwarz だけで

$$
0<B\le A
$$

を直接作れます。

正規性では、有限次元圧縮のトレースを先に極限へ送り、その後有限次元部分空間について上限を取ります。

<!-- proof-start -->
### 証明

基底独立性は直前に示したので、残りを確認します。

#### 1. トレース条件

$X\in B(H)$ とします。

$$
\begin{aligned}
\operatorname{Tr}_H(X^*X)
&=
\sum_n
\langle X^*Xe_n,e_n\rangle\\
&=
\sum_n
\|Xe_n\|^2\\
&=
\sum_n\sum_m
|\langle Xe_n,e_m\rangle|^2.
\end{aligned}
$$

一方

$$
\begin{aligned}
\operatorname{Tr}_H(XX^*)
&=
\sum_m
\|X^*e_m\|^2\\
&=
\sum_m\sum_n
|\langle X^*e_m,e_n\rangle|^2\\
&=
\sum_m\sum_n
|\langle e_m,Xe_n\rangle|^2.
\end{aligned}
$$

絶対値を取れば

$$
|\langle e_m,Xe_n\rangle|
=
|\langle Xe_n,e_m\rangle|.
$$

従って二つの非負二重級数は同じで、

$$
\boxed{
\operatorname{Tr}_H(X^*X)
=
\operatorname{Tr}_H(XX^*)
}.
$$

加法性と正の斉次性は各対角成分に対して成り立ち、非負級数の和へ移せるので、$\operatorname{Tr}_H$ はトレースです。

#### 2. 忠実性

$A\ge0$ かつ

$$
\operatorname{Tr}_H(A)=0
$$

とします。

非負項の和が0なので全ての $n$ で

$$
\langle Ae_n,e_n\rangle=0.
$$

正の平方根を使うと

$$
\langle Ae_n,e_n\rangle
=
\|A^{1/2}e_n\|^2.
$$

従って

$$
A^{1/2}e_n=0
$$

が全ての $n$ で成り立ちます。

$(e_n)$ の線形包は稠密で $A^{1/2}$ は有界なので

$$
A^{1/2}=0.
$$

よって

$$
A=0.
$$

従って $\operatorname{Tr}_H$ は忠実です。

#### 3. 半有限性

$A\in B(H)_+$ を取ります。有限次元部分空間 $F\subset H$ への直交射影を $P_F$ とし、

$$
B_F=A^{1/2}P_FA^{1/2}
$$

と置きます。

$0\le P_F\le I$ なので、任意の $x\in H$ に対して

$$
\begin{aligned}
\langle B_Fx,x\rangle
&=\langle P_FA^{1/2}x,A^{1/2}x\rangle\\
&=\|P_FA^{1/2}x\|^2\\
&\le\|A^{1/2}x\|^2\\
&=\langle Ax,x\rangle.
\end{aligned}
$$

従って

$$
0\le B_F\le A.
$$

また $B_F$ の像は $A^{1/2}(F)$ に含まれるので有限ランクです。したがって

$$
\operatorname{Tr}_H(B_F)<\infty.
$$

さらにトレース条件を $X=P_FA^{1/2}$ に適用すると

$$
\begin{aligned}
\operatorname{Tr}_H(B_F)
&=\operatorname{Tr}_H(A^{1/2}P_FA^{1/2})\\
&=\operatorname{Tr}_H(P_FAP_F).
\end{aligned}
$$

$F$ の正規直交基底を $f_1,\ldots,f_m$ とすれば

$$
\operatorname{Tr}_H(B_F)
=
\sum_{j=1}^m\langle Af_j,f_j\rangle.
$$

有限次元部分空間 $F$ 全体について上限を取ると、基底独立性から

$$
\sup_F\operatorname{Tr}_H(B_F)
=
\operatorname{Tr}_H(A).
$$

各 $B_F$ は $0\le B_F\le A$ かつ有限トレースなので、

$$
\operatorname{Tr}_H(A)
\le
\sup\{\operatorname{Tr}_H(B):0\le B\le A,\ \operatorname{Tr}_H(B)<\infty\}.
$$

逆向きは $B\le A$ からトレースの単調性で従います。したがって

$$
\boxed{
\operatorname{Tr}_H(A)
=
\sup\{\operatorname{Tr}_H(B):0\le B\le A,\ \operatorname{Tr}_H(B)<\infty\}
}.
$$

従って $\operatorname{Tr}_H$ は半有限です。

#### 4. 正規性

$A_\alpha\uparrow A$ とします。

有限次元部分空間 $F$ への射影を $P_F$ とし、その正規直交基底を $e_1,\ldots,e_m$ とします。

SOT 収束から各 $j$ で

$$
\langle A_\alpha e_j,e_j\rangle
\to
\langle Ae_j,e_j\rangle.
$$

有限和なので

$$
\operatorname{Tr}(P_FA_\alpha P_F)
\to
\operatorname{Tr}(P_FAP_F).
$$

一方

$$
0\le A_\alpha\le A
$$

なので

$$
\operatorname{Tr}_H(A_\alpha)
\le
\operatorname{Tr}_H(A).
$$

また各 $\alpha$ と $F$ について

$$
\operatorname{Tr}_H(A_\alpha)
\ge
\operatorname{Tr}(P_FA_\alpha P_F).
$$

従って

$$
\sup_\alpha\operatorname{Tr}_H(A_\alpha)
\ge
\operatorname{Tr}(P_FAP_F).
$$

$F$ について上限を取ります。

正元 $A$ では

$$
\operatorname{Tr}_H(A)
=
\sup_F
\operatorname{Tr}(P_FAP_F).
$$

よって

$$
\sup_\alpha\operatorname{Tr}_H(A_\alpha)
\ge
\operatorname{Tr}_H(A).
$$

逆向きの不等式は単調性から既に分かっているので

$$
\operatorname{Tr}_H(A_\alpha)
\uparrow
\operatorname{Tr}_H(A).
$$

従って $\operatorname{Tr}_H$ は正規です。

#### 5. trace class 上では VN4 のトレースと一致する

$A\ge0$ が trace class なら、VN4 の定義で

$$
\operatorname{Tr}(A)
=
\sum_n
\langle Ae_n,e_n\rangle
$$

が成立します。

したがって

$$
\boxed{
\operatorname{Tr}_H(A)
=
\operatorname{Tr}(A)
}
$$

です。
<!-- proof-end -->

この標準トレースは、無限次元でも消えるのではありません。

ただし

$$
\operatorname{Tr}_H(I)
=
\sum_{n=1}^{\infty}1
=
\infty
$$

なので、状態ではありません。

---

## 12. 有限次元では正規化できるが、無限次元 $B(H)$ ではできない

$M_n(\mathbb C)$ では

$$
\tau_n(A)
=
\frac1n\operatorname{Tr}(A)
$$

とすれば

$$
\tau_n(I)=1.
$$

したがって $\tau_n$ は トレース状態 です。有限次元なので自動的に正規であり、通常のトレースが忠実なので $\tau_n$ も忠実です。

一方、無限次元可分 $H$ では状況が変わります。

<a id="prop-vn5-no-normal-tracial-state"></a>

<!-- formal-statement-start -->
### 命題（無限次元有界作用素環に正規トレース状態は存在しない）

$H$ を無限次元可分複素 Hilbert 空間とする。

$B(H)$ 上には正規トレース状態は存在しない。
<!-- formal-statement-end -->

### 証明の見取り図

もし $\tau$ が トレース状態 なら、unitary で移り合う rank-one 射影は全て同じ値を持ちます。

その値を $c$ とすると、互いに直交する rank-one 射影を $N$ 個足した射影の値は $Nc$ です。状態なので $Nc\le1$ が全ての $N$ で成り立ち、$c=0$ となります。

しかし正規性は、rank-one 射影の有限和が $I$ へ増大すると値も1へ増大することを要求します。ここで矛盾します。

<!-- proof-start -->
### 証明

正規トレース状態 $\tau$ が存在すると仮定します。

正規直交基底を

$$
(e_n)_{n\ge1}
$$

とし、

$$
P_n=\theta_{e_n,e_n}
$$

と置きます。

任意の $m,n$ に対して、$e_n$ を $e_m$ へ送る unitary $U$ を取れます。

すると

$$
P_m
=
UP_nU^*.
$$

tracial 性から unitary 共役で値は変わらないので

$$
\tau(P_m)
=
\tau(P_n).
$$

共通の値を $c\ge0$ とします。

$$
Q_N
=
P_1+\cdots+P_N
$$

は射影で、

$$
0\le Q_N\le I.
$$

正性と線形性から

$$
\tau(Q_N)
=
Nc.
$$

一方

$$
\tau(Q_N)
\le
\tau(I)
=
1.
$$

したがって全ての $N$ で

$$
Nc\le1.
$$

よって

$$
c=0.
$$

したがって

$$
\tau(Q_N)=0
$$

が全ての $N$ で成り立ちます。

しかし

$$
Q_N\uparrow I
$$

です。

$\tau$ は正規な正汎関数なので、[射影単調連続性](#prop-vn5-normal-monotone-projections)から

$$
\tau(Q_N)
\uparrow
\tau(I)
=
1.
$$

左辺は常に0なので矛盾です。

従って正規トレース状態 は存在しません。
<!-- proof-end -->

この命題が、有限次元の正規化トレースをそのまま無限次元へ持ち上げられない理由です。

そこで無限次元では

$$
\operatorname{Tr}_H(I)=\infty
$$

を許し、**半有限トレース**として使います。

この「有限か無限か」「射影にどの程度有限なトレースを割り当てられるか」という問題が、VN7 の factor と型分類へつながります。

---

## 13. この章で何が変わったか

OA5 では、状態を $C^*$-環上の正規化された正汎関数として学びました。

VN4 では、von Neumann 環を predual を持つ双対空間として見ました。

本章ではこの二つを接続しました。

$$
\boxed{
\text{状態}
+
\text{predual}
=
\text{正規状態}
}
$$

そして $B(H)$ では

$$
\boxed{
\text{正規状態}
\longleftrightarrow
\text{密度作用素}
}
$$

という具体表示を得ました。

さらに正規性は

$$
P_\alpha\uparrow P
\quad\Longrightarrow\quad
\varphi(P_\alpha)\uparrow\varphi(P)
$$

という射影の単調極限に現れました。

後半では、トレースを状態から切り離しました。

$$
\boxed{
\operatorname{Tr}_H
\text{ は正規・忠実・半有限}
}
$$

ですが、無限次元では

$$
\operatorname{Tr}_H(I)=\infty
$$

です。

次章 VN6 では、この構造を可換 von Neumann 環

$$
L^\infty(X,\mu)
$$

で見ます。離散模型

$$
\ell^\infty
\quad\text{と}\quad
\ell^1
$$

が、測度空間上の

$$
L^\infty
\quad\text{と}\quad
L^1
$$

へどう拡張されるかが中心になります。

---

# 演習

## Level A

### A1. $2\times2$ 密度作用素が作る正規状態

$$
\rho
=
\begin{pmatrix}
\frac34&0\\
0&\frac14
\end{pmatrix},
\qquad
A=
\begin{pmatrix}
2&1\\
1&6
\end{pmatrix}
$$

とする。

1. $\rho$ が密度作用素であることを確認せよ。
2. $\varphi_\rho(A)=\operatorname{Tr}(A\rho)$ を計算せよ。
3. $\varphi_\rho(I)=1$ を確認せよ。
4. $\varphi_\rho$ が正規である理由を説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$\rho$ の固有値は

$$
\frac34,\qquad\frac14
$$

で、どちらも非負です。従って

$$
\rho\ge0.
$$

有限次元では全作用素が trace class です。また

$$
\operatorname{Tr}(\rho)
=
\frac34+\frac14
=
1.
$$

よって

$$
\boxed{\rho\text{ は密度作用素}}
$$

です。

次に

$$
A\rho
=
\begin{pmatrix}
2&1\\
1&6
\end{pmatrix}
\begin{pmatrix}
\frac34&0\\
0&\frac14
\end{pmatrix}
=
\begin{pmatrix}
\frac32&\frac14\\
\frac34&\frac32
\end{pmatrix}.
$$

従って

$$
\boxed{
\varphi_\rho(A)
=
\operatorname{Tr}(A\rho)
=
3
}.
$$

また

$$
\varphi_\rho(I)
=
\operatorname{Tr}(\rho)
=
\boxed{1}.
$$

最後に $\rho$ は trace class なので

$$
A\longmapsto\operatorname{Tr}(A\rho)
$$

は $B(H)_*=S_1(H)$ の元です。したがって ultraweak 連続、すなわち正規です。

<!-- solution-end -->

---

### A2. ベクトル状態の密度作用素

$\xi\in H$ を単位ベクトルとし、

$$
\rho_\xi=\theta_{\xi,\xi}
$$

とする。

1. $\rho_\xi\ge0$ を示せ。
2. $\operatorname{Tr}(\rho_\xi)=1$ を示せ。
3.
   $$
   \operatorname{Tr}(A\rho_\xi)
   =
   \langle A\xi,\xi\rangle
   $$
   を示せ。
4. 従ってベクトル状態が正規状態であることを確認せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

任意の $x\in H$ に対し

$$
\begin{aligned}
\langle\rho_\xi x,x\rangle
&=
\langle
\langle x,\xi\rangle\xi,
x
\rangle\\
&=
|\langle x,\xi\rangle|^2\\
&\ge0.
\end{aligned}
$$

従って

$$
\boxed{\rho_\xi\ge0}.
$$

$\rho_\xi$ は rank-one 射影なので唯一の非零固有値は1です。したがって

$$
\boxed{
\operatorname{Tr}(\rho_\xi)=1
}.
$$

よって $\rho_\xi$ は密度作用素です。

[rank-one 作用素のトレース公式](../VN4/index.md#prop-vn4-trace-rank-one)から

$$
\operatorname{Tr}(A\theta_{\xi,\xi})
=
\langle A\xi,\xi\rangle.
$$

従って

$$
\boxed{
\operatorname{Tr}(A\rho_\xi)
=
\langle A\xi,\xi\rangle
}.
$$

密度作用素が作る状態は正規なので、ベクトル状態は正規状態です。

<!-- solution-end -->

---

### A3. 対角密度作用素と増大射影

$H=\ell^2(\mathbb N)$ とし、

$$
\rho e_n=2^{-n}e_n.
$$

また

$$
P_N
=
\sum_{n=1}^{N}\theta_{e_n,e_n}
$$

とする。

1. $\rho$ が密度作用素であることを示せ。
2. $\varphi_\rho(P_N)$ を求めよ。
3.
   $$
   \varphi_\rho(P_N)\uparrow1
   $$
   を示せ。
4. この計算が正規性のどの性質を具体化しているか説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$\rho$ は正の対角作用素です。

特異値は

$$
2^{-1},2^{-2},\ldots
$$

なので

$$
\|\rho\|_1
=
\sum_{n=1}^{\infty}2^{-n}
=
1.
$$

従って $\rho$ は trace class です。

さらに

$$
\operatorname{Tr}(\rho)
=
1.
$$

よって

$$
\boxed{\rho\text{ は密度作用素}}.
$$

次に

$$
\begin{aligned}
\varphi_\rho(P_N)
&=
\operatorname{Tr}(P_N\rho)\\
&=
\sum_{n=1}^{N}2^{-n}\\
&=
1-2^{-N}.
\end{aligned}
$$

したがって

$$
\boxed{
\varphi_\rho(P_N)=1-2^{-N}\uparrow1
}.
$$

一方

$$
P_N\uparrow I.
$$

従って

$$
\varphi_\rho(P_N)\uparrow\varphi_\rho(I)
$$

という正規な正汎関数の射影単調連続性を、そのまま級数の部分和として確認したことになります。

<!-- solution-end -->

---

### A4. $M_n(\mathbb C)$ の正規化トレース

$$
\tau_n(A)=\frac1n\operatorname{Tr}(A)
$$

とする。

1. $\tau_n(I)=1$ を示せ。
2. $A\ge0$ なら $\tau_n(A)\ge0$ を示せ。
3. 任意の $X$ に対し
   $$
   \tau_n(X^*X)=\tau_n(XX^*)
   $$
   を示せ。
4. $\tau_n$ が正規かつ忠実な トレース状態 であることを説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$n$ 次単位行列のトレースは $n$ なので

$$
\tau_n(I)
=
\frac1n\operatorname{Tr}(I)
=
\boxed{1}.
$$

$A\ge0$ なら固有値は全て非負です。トレースは固有値の和なので

$$
\operatorname{Tr}(A)\ge0.
$$

従って

$$
\boxed{\tau_n(A)\ge0}.
$$

また有限次元の行列トレースでは積の順序を巡回させても値が変わらないので

$$
\operatorname{Tr}(X^*X)
=
\operatorname{Tr}(XX^*).
$$

したがって

$$
\boxed{
\tau_n(X^*X)=\tau_n(XX^*)
}.
$$

有限次元では全ての線形汎関数が通常の有限次元位相に関して連続で、ultraweak 位相も同じ有限次元線形位相になります。従って $\tau_n$ は正規です。

さらに $A\ge0$ で $\tau_n(A)=0$ なら全ての非負固有値の和が0なので $A=0$ です。よって忠実です。

したがって

$$
\boxed{
\tau_n\text{ は正規かつ忠実な トレース状態}
}.
$$

<!-- solution-end -->

---

## Level B

### B1. 密度作用素の一意性を rank-one 射影だけで示す

$\rho,\sigma$ を $B(H)$ 上の密度作用素とし、

$$
\operatorname{Tr}(A\rho)
=
\operatorname{Tr}(A\sigma)
$$

が全ての $A\in B(H)$ で成り立つとする。

trace duality の非退化性を直接引用せず、rank-one 作用素を使って

$$
\rho=\sigma
$$

を示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

任意の $x,y\in H$ を取ります。

$$
A=\theta_{x,y}
$$

を代入すると

$$
\operatorname{Tr}(\theta_{x,y}\rho)
=
\operatorname{Tr}(\theta_{x,y}\sigma).
$$

VN4 で示した $\operatorname{Tr}(AT)=\operatorname{Tr}(TA)$ を使って

$$
\operatorname{Tr}(\theta_{x,y}\rho)
=
\operatorname{Tr}(\rho\theta_{x,y})
=
\langle\rho x,y\rangle.
$$

また同じトレース交換則と [rank-one 作用素のトレース公式](../VN4/index.md#prop-vn4-trace-rank-one)を $\sigma$ に適用して

$$
\operatorname{Tr}(\theta_{x,y}\sigma)
=
\operatorname{Tr}(\sigma\theta_{x,y})
=
\langle\sigma x,y\rangle.
$$

従って全ての $x,y$ で

$$
\langle(\rho-\sigma)x,y\rangle=0.
$$

固定した $x$ に対して全ての $y$ との内積が0なので

$$
(\rho-\sigma)x=0.
$$

$x$ は任意だから

$$
\boxed{
\rho=\sigma
}.
$$

rank-one 作用素だけで全ての行列係数を読み取れることが、一意性の核心です。

<!-- solution-end -->

---

### B2. 射影単調連続性から trace class を取り出す

$\varphi:B(H)\to\mathbb C$ を正線形汎関数とする。

$$
b(x,y)
=
\varphi(\theta_{x,y})
$$

と置き、Riesz 表現から

$$
b(x,y)=\langle\rho x,y\rangle
$$

となる $\rho\in B(H)$ を取る。

さらに任意の増大射影ネットについて

$$
P_\alpha\uparrow P
\quad\Longrightarrow\quad
\varphi(P_\alpha)\uparrow\varphi(P)
$$

を仮定する。

1. $\rho\ge0$ を示せ。
2. 有限次元部分空間 $F$ への射影 $P_F$ に対して
   $$
   \varphi(P_F)
   =
   \sum_{e_j\in\mathrm{ONB}(F)}
   \langle\rho e_j,e_j\rangle
   $$
   を示せ。
3. $P_F\uparrow I$ を使って $\rho\in S_1(H)$ を示せ。
4.
   $$
   \operatorname{Tr}(\rho)=\varphi(I)
   $$
   を示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

任意の $x\in H$ に対して

$$
\theta_{x,x}\ge0.
$$

$\varphi$ は正なので

$$
\varphi(\theta_{x,x})\ge0.
$$

一方

$$
\varphi(\theta_{x,x})
=
b(x,x)
=
\langle\rho x,x\rangle.
$$

従って全ての $x$ で

$$
\langle\rho x,x\rangle\ge0.
$$

よって

$$
\boxed{\rho\ge0}.
$$

次に $F$ の正規直交基底を

$$
e_1,\ldots,e_m
$$

とします。

直交射影は

$$
P_F
=
\sum_{j=1}^{m}
\theta_{e_j,e_j}
$$

なので

$$
\begin{aligned}
\varphi(P_F)
&=
\sum_{j=1}^{m}
\varphi(\theta_{e_j,e_j})\\
&=
\sum_{j=1}^{m}
\langle\rho e_j,e_j\rangle.
\end{aligned}
$$

従って

$$
\boxed{
\varphi(P_F)
=
\sum_{j=1}^{m}
\langle\rho e_j,e_j\rangle
}.
$$

有限次元部分空間全体を包含関係で並べると

$$
P_F\uparrow I.
$$

仮定から

$$
\varphi(P_F)\uparrow\varphi(I).
$$

したがって

$$
\sup_F
\sum_{e_j\in\mathrm{ONB}(F)}
\langle\rho e_j,e_j\rangle
=
\varphi(I)
<
\infty.
$$

$\rho\ge0$ なので、この上限は正作用素 $\rho$ のトレースです。従って

$$
\boxed{
\rho\in S_1(H)
}.
$$

さらに

$$
\boxed{
\operatorname{Tr}(\rho)
=
\varphi(I)
}.
$$

これが本文の正規性判定定理で、射影の極限条件から trace class 性が現れる核心部分です。

<!-- solution-end -->

---

### B3. 密度作用素が作る状態の忠実性

$\rho$ を $B(H)$ 上の密度作用素とし、

$$
\varphi_\rho(A)=\operatorname{Tr}(A\rho)
$$

とする。

次を示せ。

$$
\boxed{
\varphi_\rho\text{ が忠実}
\quad\Longleftrightarrow\quad
\ker\rho=\{0\}.
}
$$

ここで状態の忠実性とは、$A\ge0$ かつ $\varphi_\rho(A)=0$ なら $A=0$ となることをいう。

- Level: B

<!-- solution-start -->
#### 詳細解答

まず $\ker\rho\ne\{0\}$ とします。

単位ベクトル

$$
0\ne\xi\in\ker\rho
$$

を取り、

$$
P_\xi=\theta_{\xi,\xi}
$$

とします。

$P_\xi\ge0$ かつ $P_\xi\ne0$ です。

しかし

$$
\begin{aligned}
\varphi_\rho(P_\xi)
&=
\operatorname{Tr}(P_\xi\rho)\\
&=
\operatorname{Tr}(\rho P_\xi)\\
&=
\langle\rho\xi,\xi\rangle\\
&=
0.
\end{aligned}
$$

したがって $\varphi_\rho$ は忠実ではありません。

よって

$$
\varphi_\rho\text{ が忠実}
\quad\Longrightarrow\quad
\ker\rho=\{0\}.
$$

逆に

$$
\ker\rho=\{0\}
$$

とします。

$A\ge0$ かつ

$$
\varphi_\rho(A)=0
$$

と仮定します。

$\rho$ は正の trace class 作用素なので、固有分解

$$
\rho
=
\sum_{n=1}^{\infty}
p_n\theta_{e_n,e_n}
$$

を持ちます。

$\ker\rho=\{0\}$ なので全ての固有値について

$$
p_n>0,
$$

かつ $(e_n)$ は $H$ の正規直交基底になります。

すると

$$
\begin{aligned}
0
&=
\varphi_\rho(A)\\
&=
\sum_{n=1}^{\infty}
p_n\langle Ae_n,e_n\rangle.
\end{aligned}
$$

各項は非負で $p_n>0$ なので

$$
\langle Ae_n,e_n\rangle=0
$$

が全ての $n$ で成り立ちます。

$A\ge0$ だから

$$
\langle Ae_n,e_n\rangle
=
\|A^{1/2}e_n\|^2.
$$

従って

$$
A^{1/2}e_n=0
$$

が全ての $n$ で成り立ちます。

$(e_n)$ は基底なので

$$
A^{1/2}=0,
$$

従って

$$
A=0.
$$

よって $\varphi_\rho$ は忠実です。

以上から

$$
\boxed{
\varphi_\rho\text{ が忠実}
\Longleftrightarrow
\ker\rho=\{0\}
}.
$$

<!-- solution-end -->

---

### B4. $B(\ell^2)$ の標準トレースは状態ではないが半有限である

$H=\ell^2(\mathbb N)$ とし、$B(H)$ の標準トレースを $\operatorname{Tr}_H$ とする。

1.
   $$
   \operatorname{Tr}_H(I)=\infty
   $$
   を示せ。
2. 従って $\operatorname{Tr}_H$ が状態でないことを説明せよ。
3. 任意の $0\ne A\in B(H)_+$ に対して、本文の構成
   $$
   B=
   \frac1{\|\xi\|^2}
   \theta_{A^{1/2}\xi,A^{1/2}\xi}
   $$
   を使い
   $$
   0<B\le A
   $$
   かつ
   $$
   \operatorname{Tr}_H(B)<\infty
   $$
   を示せ。
4. 「半有限」と「有限」の違いをこの例で説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

標準基底を $(e_n)$ とすると

$$
\operatorname{Tr}_H(I)
=
\sum_{n=1}^{\infty}
\langle e_n,e_n\rangle
=
\sum_{n=1}^{\infty}1
=
\boxed{\infty}.
$$

状態は単位元を1へ送る有界線形汎関数なので、$\operatorname{Tr}_H$ は状態ではありません。

次に $0\ne A\ge0$ を取ります。

$A^{1/2}\ne0$ なので、ある $\xi$ で

$$
\eta=A^{1/2}\xi\ne0
$$

となります。

$$
B
=
\frac1{\|\xi\|^2}
\theta_{\eta,\eta}
$$

と置きます。

$B$ は非零 rank-one 正作用素です。

任意の $x\in H$ に対して

$$
\begin{aligned}
\langle Bx,x\rangle
&=
\frac{|\langle x,\eta\rangle|^2}{\|\xi\|^2}\\
&=
\frac{|\langle A^{1/2}x,\xi\rangle|^2}{\|\xi\|^2}\\
&\le
\|A^{1/2}x\|^2\\
&=
\langle Ax,x\rangle.
\end{aligned}
$$

従って

$$
\boxed{
0<B\le A
}.
$$

また $B$ は rank-one なので

$$
\operatorname{Tr}_H(B)
=
\frac{\|\eta\|^2}{\|\xi\|^2}
<
\infty.
$$

よってどんな非零正元 $A$ の中にも、非零で有限トレースの正元 $B$ が見つかります。これが半有限性です。

しかし $I$ 自身のトレースは無限大です。

したがって

$$
\boxed{
\text{半有限}
\not\Rightarrow
\text{全ての正元で有限}
}
$$

です。

<!-- solution-end -->

---

## Level C

### C1. 正規状態・射影極限・トレースを一つにつなぐ

$H=\ell^2(\mathbb N)$ とし、$\varphi:B(H)\to\mathbb C$ を正線形汎関数とする。

次を仮定する。

$$
P_\alpha\uparrow P
\quad\Longrightarrow\quad
\varphi(P_\alpha)\uparrow\varphi(P)
$$

が任意の増大射影ネットについて成り立ち、さらに

$$
\varphi(I)=1.
$$

以下を順に示せ。

1. 
   $$
   b(x,y)=\varphi(\theta_{x,y})
   $$
   から正作用素 $\rho$ を構成せよ。
2. 座標射影
   $$
   P_N=\sum_{n=1}^{N}\theta_{e_n,e_n}
   $$
   を使って
   $$
   \rho\in S_1(H),
   \qquad
   \operatorname{Tr}(\rho)=1
   $$
   を示せ。
3. 任意の $A\in B(H)$ に対して
   $$
   \varphi(A)=\operatorname{Tr}(A\rho)
   $$
   を示すために、有限ランク圧縮 $P_NAP_N$ をどう使うか説明せよ。
4. 従って $\varphi$ が正規状態であることを示せ。
5. さらに、標準トレース $\operatorname{Tr}_H$ と $\varphi$ の違いを
   $$
   \operatorname{Tr}_H(I)=\infty,
   \qquad
   \varphi(I)=1
   $$
   から説明せよ。
6. $\varphi$ がさらに tracial であると仮定すると矛盾することを示せ。

- Level: C

<!-- solution-start -->
#### 詳細解答

まず

$$
b(x,y)
=
\varphi(\theta_{x,y})
$$

と置きます。

作用素ノルム評価

$$
\|\theta_{x,y}\|
=
\|x\|\,\|y\|
$$

から

$$
|b(x,y)|
\le
\|\varphi\|\,\|x\|\,\|y\|.
$$

したがって $b$ は有界半双線形形式です。

Riesz 表現により、一意な $\rho\in B(H)$ が存在して

$$
b(x,y)
=
\langle\rho x,y\rangle
$$

となります。

また

$$
\langle\rho x,x\rangle
=
\varphi(\theta_{x,x})
\ge0
$$

なので

$$
\boxed{\rho\ge0}.
$$

次に標準基底を $(e_n)$ とし、

$$
P_N
=
\sum_{n=1}^{N}
\theta_{e_n,e_n}
$$

と置きます。

$P_N\uparrow I$ なので仮定から

$$
\varphi(P_N)
\uparrow
\varphi(I)
=
1.
$$

一方

$$
\begin{aligned}
\varphi(P_N)
&=
\sum_{n=1}^{N}
\varphi(\theta_{e_n,e_n})\\
&=
\sum_{n=1}^{N}
\langle\rho e_n,e_n\rangle.
\end{aligned}
$$

従って

$$
\sum_{n=1}^{\infty}
\langle\rho e_n,e_n\rangle
=
1.
$$

$\rho\ge0$ なので

$$
\boxed{
\rho\in S_1(H),
\qquad
\operatorname{Tr}(\rho)=1
}.
$$

つまり $\rho$ は密度作用素です。

次に任意の $A\in B(H)$ を取ります。

$P_NAP_N$ は有限ランクなので、rank-one 分解と $\rho$ の構成から

$$
\varphi(P_NAP_N)
=
\operatorname{Tr}(P_NAP_N\rho).
$$

一方、正線形汎関数の Cauchy--Schwarz 不等式で圧縮誤差を評価します。まず

$$
A-P_NAP_N
=
(I-P_N)A
+
P_NA(I-P_N).
$$

第1項では $a=A$, $b=I-P_N$ として Cauchy--Schwarz を適用すると

$$
\begin{aligned}
|\varphi((I-P_N)A)|^2
&\le \varphi(A^*A)\,\varphi(I-P_N)\\
&\le \|A\|^2\varphi(I)\,\varphi(I-P_N)\\
&=\|A\|^2\varphi(I-P_N).
\end{aligned}
$$

第2項は

$$
P_NA(I-P_N)=(A^*P_N)^*(I-P_N)
$$

と書けるので、$a=I-P_N$, $b=A^*P_N$ として

$$
\begin{aligned}
|\varphi(P_NA(I-P_N))|^2
&\le \varphi(I-P_N)\,\varphi(P_NAA^*P_N)\\
&\le \|A\|^2\varphi(I-P_N)\,\varphi(P_N)\\
&\le \|A\|^2\varphi(I-P_N).
\end{aligned}
$$

ここで状態なので $\varphi(I)=1$ を使いました。また

$$
\varphi(I-P_N)
=
1-\varphi(P_N)
\to0.
$$

従って三角不等式から

$$
|\varphi(A-P_NAP_N)|
\le
2\|A\|\sqrt{\varphi(I-P_N)}
\to0.
$$

したがって

$$
\varphi(P_NAP_N)\to\varphi(A).
$$

さらに $\rho\in S_1(H)$ なので

$$
P_N\rho P_N
\to\rho
$$

がトレースノルムで成り立ちます。

よって

$$
\begin{aligned}
\operatorname{Tr}(P_NAP_N\rho)
&=
\operatorname{Tr}(A P_N\rho P_N)\\
&\to
\operatorname{Tr}(A\rho).
\end{aligned}
$$

したがって

$$
\boxed{
\varphi(A)=\operatorname{Tr}(A\rho)
}.
$$

$\rho$ は密度作用素なので、[正規状態と密度作用素の対応](#thm-vn5-density-state-correspondence)から

$$
\boxed{
\varphi\text{ は正規状態}
}.
$$

次に標準トレースとの違いを確認します。

$H=\ell^2$ は無限次元なので

$$
\operatorname{Tr}_H(I)
=
\infty.
$$

一方、状態である $\varphi$ は

$$
\varphi(I)=1.
$$

従って $\operatorname{Tr}_H$ は正規・忠実・半有限トレースではありますが、状態ではありません。

最後に $\varphi$ が tracial でもあると仮定します。

rank-one 射影

$$
P_n=\theta_{e_n,e_n}
$$

は unitary 共役で互いに移り合うので、tracial 性から

$$
\varphi(P_n)=c
$$

は $n$ に依りません。

有限和

$$
Q_N=P_1+\cdots+P_N
$$

に対して

$$
\varphi(Q_N)=Nc\le1.
$$

全ての $N$ で成り立つので

$$
c=0.
$$

従って

$$
\varphi(Q_N)=0
$$

です。

しかし

$$
Q_N\uparrow I
$$

で、最初の仮定から

$$
\varphi(Q_N)\uparrow\varphi(I)=1.
$$

これは矛盾です。

したがって

$$
\boxed{
B(\ell^2)\text{ 上に正規トレース状態 は存在しない}
}.
$$

この一問で

$$
\text{射影の単調連続性}
\Rightarrow
\text{trace class 密度作用素}
\Rightarrow
\text{正規状態}
$$

を再構成し、さらに状態と半有限トレースの違いまで接続しました。

<!-- solution-end -->