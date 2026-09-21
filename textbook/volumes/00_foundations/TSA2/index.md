# TSA2 Encore IV 時系列解析 II：Wold 分解

<!-- definition-example-audit: strict -->

TSA1 では、中心化した二次定常過程を $L^2$ のベクトルと見て、過去の閉線形包への直交射影から最良線形予測とイノベーションを作りました。

この章では、その「一時刻ぶんの新情報」を全時刻へ並べます。すると

$$
\text{過去空間}
\longrightarrow
\text{一段差としてのイノベーション部分空間}
\longrightarrow
\text{無限遠過去}
\longrightarrow
\text{直交和}
\longrightarrow
\text{Wold 分解}
$$

という一本の Hilbert 空間論になります。

前章の [過去の線形予測空間](../TSA1/index.md#def-tsa1-past-space)、[イノベーション](../TSA1/index.md#def-tsa1-innovation)、[時間移動作用素](../TSA1/index.md#lem-tsa1-unitary-shift) を正本として使います。Herglotz の定理や周波数領域の表現は次章 TSA3 の内容であり、Wold 分解の証明へ逆輸入しません。

---

## 1. 準備：中心化過程と過去空間

$(X_t)_{t\in\mathbb Z}$ を実二次定常過程とし、平均を $\mu$ とします。この章では

$$
Y_t:=X_t-\mu
$$

と中心化し、

$$
\mathcal H_t
:=
\overline{\operatorname{span}}\{Y_s:s\le t\}
\subset L^2
$$

を [過去の線形予測空間](../TSA1/index.md#def-tsa1-past-space) とします。

時刻が一つ進むと

$$
\mathcal H_{t-1}\subseteq \mathcal H_t
$$

です。Wold 分解の出発点は、この包含で増えた部分だけを取り出すことです。

---

## 2. イノベーション部分空間

<a id="def-tsa2-innovation-subspace"></a>

<!-- formal-statement-start -->
> **定義（イノベーション部分空間）**  
> 中心化二次定常過程 $(Y_t)$ の過去空間を $\mathcal H_t=\overline{\operatorname{span}}\{Y_s:s\le t\}$ とする。各 $t\in\mathbb Z$ に対して
>
> $$
> \mathcal I_t
> :=
> \mathcal H_t\ominus \mathcal H_{t-1}
> =
> \mathcal H_t\cap \mathcal H_{t-1}^{\perp}
> $$
>
> を時刻 $t$ のイノベーション部分空間という。
<!-- formal-statement-end -->

ここで $\mathcal I_t$ は「時刻 $t$ まで観測したとき初めて増える線形情報」です。スカラー時系列では驚くほど小さく、0次元または1次元にしかなりません。

### 2.1 直接例：弱ホワイトノイズ

$(\varepsilon_t)$ を分散 $\sigma^2>0$ の [弱ホワイトノイズ](../TSA1/index.md#def-tsa1-white-noise) とします。

<!-- definition-example-start: def-tsa2-innovation-subspace -->
**定義の確認**  
$\varepsilon_t\in\mathcal H_t$ です。一方、$s\le t-1$ なら

$$
E[\varepsilon_t\varepsilon_s]=0.
$$

従って $\varepsilon_t$ は過去変数の有限線形結合全てと直交し、内積の連続性から $\mathcal H_{t-1}$ 全体と直交します。よって

$$
\varepsilon_t\in\mathcal I_t.
$$

さらに

$$
\mathcal H_t
=
\overline{\mathcal H_{t-1}+\operatorname{span}\{\varepsilon_t\}}
=
\mathcal H_{t-1}\oplus\operatorname{span}\{\varepsilon_t\},
$$

なので

$$
\mathcal I_t=\operatorname{span}\{\varepsilon_t\}.
$$
<!-- definition-example-end -->

<a id="prop-tsa2-innovation-span"></a>

<!-- formal-statement-start -->
> **命題（イノベーション部分空間の一次元性）**  
> $(Y_t)$ を中心化二次定常過程とし、
>
> $$
> \varepsilon_t
> :=
> Y_t-P_{\mathcal H_{t-1}}Y_t
> $$
>
> を TSA1 の標準イノベーションとする。このとき
>
> $$
> \mathcal I_t=\operatorname{span}\{\varepsilon_t\}.
> $$
>
> 特に $\varepsilon_t=0$ なら $\mathcal I_t=\{0\}$、$\varepsilon_t\ne0$ なら $\dim\mathcal I_t=1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$\mathcal H_t$ は $\mathcal H_{t-1}$ に $Y_t$ を一つ加えて閉じた空間です。$Y_t$ を「過去への射影 + 直交残差」に分ければ、増分は直交残差 $\varepsilon_t$ だけです。

<!-- proof-start -->
### 証明

[イノベーションの定義](../TSA1/index.md#def-tsa1-innovation)から

$$
Y_t
=
P_{\mathcal H_{t-1}}Y_t+\varepsilon_t,
\qquad
\varepsilon_t\perp\mathcal H_{t-1}.
$$

従って

$$
\mathcal H_t
=
\overline{\operatorname{span}(\mathcal H_{t-1}\cup\{Y_t\})}
=
\overline{\operatorname{span}(\mathcal H_{t-1}\cup\{\varepsilon_t\})}.
$$

$\mathcal H_{t-1}$ は閉で、$\operatorname{span}\{\varepsilon_t\}$ は有限次元なので閉です。また両者は直交します。従って

$$
\mathcal H_t
=
\mathcal H_{t-1}
\oplus
\operatorname{span}\{\varepsilon_t\}.
$$

よって直交差の一意性から

$$
\mathcal I_t
=
\mathcal H_t\ominus\mathcal H_{t-1}
=
\operatorname{span}\{\varepsilon_t\}.
$$
<!-- proof-end -->

### 2.2 異なる時刻のイノベーション部分空間は直交する

$s<t$ とします。$\mathcal I_s\subseteq\mathcal H_s\subseteq\mathcal H_{t-1}$ であり、$\mathcal I_t\perp\mathcal H_{t-1}$ なので

$$
\mathcal I_s\perp\mathcal I_t.
$$

従って、時刻ごとの「新情報」は Hilbert 空間の意味で互いに直交します。

さらに TSA1 の [時間移動作用素](../TSA1/index.md#lem-tsa1-unitary-shift)を $U Y_t=Y_{t+1}$ とすると

$$
U\mathcal H_t=\mathcal H_{t+1},
\qquad
U\mathcal I_t=\mathcal I_{t+1}.
$$

したがって各 $\mathcal I_t$ の次元は同じです。

---

## 3. 無限遠過去

一段ずつ新情報を分離しても、どこまで過去へ押し戻しても消えない成分が残ることがあります。それが無限遠過去です。

<a id="def-tsa2-remote-past"></a>

<!-- formal-statement-start -->
> **定義（無限遠過去）**  
> 中心化二次定常過程 $(Y_t)$ の過去空間を $\mathcal H_t$ とする。このとき
>
> $$
> \mathcal H_{-\infty}
> :=
> \bigcap_{t\in\mathbb Z}\mathcal H_t
> $$
>
> を無限遠過去（remote past）という。
<!-- formal-statement-end -->

各 $\mathcal H_t$ は閉部分空間なので、その共通部分 $\mathcal H_{-\infty}$ も閉部分空間です。

<a id="def-tsa2-purely-nondeterministic"></a>

<!-- formal-statement-start -->
> **定義（純非決定論性）**  
> 中心化二次定常過程 $(Y_t)$ が純非決定論的（purely nondeterministic）であるとは、
>
> $$
> \mathcal H_{-\infty}=\{0\}
> $$
>
> が成り立つことをいう。
<!-- formal-statement-end -->

「ランダムに見える」ことではありません。定義が見ているのは、**線形予測空間を無限に過去へ送った共通部分が消えるか**です。

### 3.1 直接例：弱ホワイトノイズは純非決定論的

$(\varepsilon_t)$ を分散正の弱ホワイトノイズとします。

<!-- definition-example-start: def-tsa2-remote-past, def-tsa2-purely-nondeterministic -->
**定義の確認**  
$Z\in\mathcal H_{-\infty}$ とします。任意の固定時刻 $s$ を取ります。$t<s$ を選べば

$$
Z\in\mathcal H_t.
$$

一方、$\varepsilon_s$ は $\mathcal H_t$ と直交するので

$$
E[Z\varepsilon_s]=0.
$$

これは全ての $s$ で成り立ちます。

特に $Z\in\mathcal H_0$ であり、$\mathcal H_0$ は $\{\varepsilon_s:s\le0\}$ の閉線形包です。$Z$ はその全生成元に直交するため $\mathcal H_0$ 全体と直交します。ところが $Z\in\mathcal H_0$ でもあるので

$$
\|Z\|_2^2=\langle Z,Z\rangle=0.
$$

従って $Z=0$ in $L^2$ であり、

$$
\mathcal H_{-\infty}=\{0\}.
$$

よって弱ホワイトノイズは純非決定論的です。
<!-- definition-example-end -->

### 3.2 反対側の直接例：ランダム正弦波

$0<\omega<\pi$ とし、

$$
Y_t=A\cos(\omega t)+B\sin(\omega t)
$$

とします。TSA1 で示したように

$$
Y_t
=
2\cos\omega\,Y_{t-1}-Y_{t-2}.
$$

したがって全ての $t$ で $Y_t\in\mathcal H_{t-1}$ です。さらに $0<\omega<\pi$ なら連続する二時点の係数行列は正則なので、$A,B$ は $Y_t,Y_{t-1}$ の線形結合として復元できます。従って

$$
\mathcal H_t=\operatorname{span}\{A,B\}
$$

は $t$ に依存せず、

$$
\mathcal H_{-\infty}
=
\operatorname{span}\{A,B\}.
$$

この過程ではイノベーション部分空間は全て $\{0\}$ です。

ここで純非決定論性の仮定を落とすと、「過程全体をイノベーションの無限移動平均だけで表す」ことはできません。壊れる機構は、どれだけ過去へ戻っても残る $\mathcal H_{-\infty}$ が消えないことです。

---

## 4. 減少する閉部分空間への射影

Wold 分解では $\mathcal H_{t-n}$ を $n\to\infty$ と遠い過去へ送ります。そのとき射影も $\mathcal H_{-\infty}$ への射影へ収束する必要があります。

<a id="lem-tsa2-decreasing-projection"></a>

<!-- formal-statement-start -->
> **補題（減少閉部分空間への射影収束）**  
> Hilbert 空間 $H$ の閉部分空間列
>
> $$
> M_1\supseteq M_2\supseteq M_3\supseteq\cdots
> $$
>
> と
>
> $$
> M:=\bigcap_{n\ge1}M_n
> $$
>
> を考える。任意の $x\in H$ に対して
>
> $$
> P_{M_n}x\longrightarrow P_Mx
> \qquad\text{in }H
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$x_n=P_{M_n}x$ と置きます。$m>n$ なら $M_m\subseteq M_n$ なので、$x_m$ は $x_n$ をさらに小さい空間へ射影したものです。Pythagoras により

$$
\|x_n-x_m\|^2
=
\|x_n\|^2-\|x_m\|^2
$$

となり、射影ノルムの単調収束から Cauchy 性が出ます。

<!-- proof-start -->
### 証明

$x_n:=P_{M_n}x$ とします。$m>n$ なら $M_m\subseteq M_n$ です。

$x-x_n\perp M_n$ なので、特に $x-x_n\perp M_m$ です。従って $x$ と $x_n$ の $M_m$ への射影は同じで、

$$
x_m=P_{M_m}x=P_{M_m}x_n.
$$

よって

$$
x_n-x_m\perp x_m.
$$

したがって

$$
\|x_n\|^2
=
\|x_n-x_m\|^2+\|x_m\|^2,
$$

すなわち

$$
\|x_n-x_m\|^2
=
\|x_n\|^2-\|x_m\|^2.
$$

$\|x_n\|$ は非増加かつ非負なので極限を持ちます。従って右辺は $n,m\to\infty$ で0へ行き、$(x_n)$ は Cauchy 列です。Hilbert 空間の完備性から、ある $y\in H$ が存在して

$$
x_n\to y.
$$

固定した $k$ に対して $n\ge k$ なら $x_n\in M_n\subseteq M_k$ です。$M_k$ は閉なので $y\in M_k$。$k$ は任意だから

$$
y\in\bigcap_{k\ge1}M_k=M.
$$

さらに $z\in M$ なら全ての $n$ で $z\in M_n$ だから

$$
\langle x-x_n,z\rangle=0.
$$

$n\to\infty$ として

$$
\langle x-y,z\rangle=0.
$$

従って $x-y\perp M$。$y\in M$ と合わせて、直交射影の一意性から

$$
y=P_Mx.
$$

よって

$$
P_{M_n}x\to P_Mx.
$$
<!-- proof-end -->

この補題を

$$
M_n=\mathcal H_{t-n}
$$

へ適用すると

$$
P_{\mathcal H_{t-n}}Y_t
\longrightarrow
P_{\mathcal H_{-\infty}}Y_t
\qquad\text{in }L^2.
$$

---

## 5. 過去空間そのものを直交分解する

<a id="prop-tsa2-past-orthogonal-decomposition"></a>

<!-- formal-statement-start -->
> **命題（過去空間の直交分解）**  
> 中心化二次定常過程 $(Y_t)$ の過去空間を $\mathcal H_t$、イノベーション部分空間を $\mathcal I_t$、無限遠過去を $\mathcal H_{-\infty}$ とする。このとき各 $t\in\mathbb Z$ で
>
> $$
> \mathcal H_t
> =
> \mathcal H_{-\infty}
> \oplus
> \bigoplus_{j=0}^{\infty}\mathcal I_{t-j}.
> $$
>
> ここで無限直交和は有限和の $L^2$ 閉包を意味する。
<!-- formal-statement-end -->

### 証明の見取り図

一段ごとに

$$
\mathcal H_r=\mathcal H_{r-1}\oplus\mathcal I_r
$$

です。これを有限回繰り返してから、残った $\mathcal H_{t-n}$ を無限遠へ送ります。

<!-- proof-start -->
### 証明

[イノベーション部分空間の定義](#def-tsa2-innovation-subspace)より

$$
\mathcal H_r
=
\mathcal H_{r-1}\oplus\mathcal I_r.
$$

従って任意の $n\ge1$ について反復すると

$$
\mathcal H_t
=
\mathcal H_{t-n}
\oplus
\mathcal I_{t-n+1}
\oplus\cdots\oplus
\mathcal I_t.
$$

いま $x\in\mathcal H_t$ を任意に取ります。上の有限な[直交分解](../F0_02C1A_Hilbert射影定理_直交分解/index.md#thm-f0-02c1a-orthogonal-decomposition)から

$$
x
=
P_{\mathcal H_{t-n}}x
+
\sum_{j=0}^{n-1}P_{\mathcal I_{t-j}}x.
$$

[減少閉部分空間への射影収束](#lem-tsa2-decreasing-projection)より

$$
P_{\mathcal H_{t-n}}x
\to
P_{\mathcal H_{-\infty}}x.
$$

従って

$$
\sum_{j=0}^{n-1}P_{\mathcal I_{t-j}}x
\to
x-P_{\mathcal H_{-\infty}}x
$$

in $L^2$ です。

また異なる $\mathcal I_s,\mathcal I_r$ は互いに直交し、$\mathcal H_{-\infty}\subseteq\mathcal H_{r-1}$ なので

$$
\mathcal H_{-\infty}\perp\mathcal I_r
$$

です。

よって

$$
x
=
P_{\mathcal H_{-\infty}}x
+
\sum_{j=0}^{\infty}P_{\mathcal I_{t-j}}x
$$

という直交分解を得ます。任意の $x\in\mathcal H_t$ に対して成り立つため、

$$
\mathcal H_t
=
\mathcal H_{-\infty}
\oplus
\bigoplus_{j=0}^{\infty}\mathcal I_{t-j}.
$$
<!-- proof-end -->

この命題が Wold 分解の空間版です。あとは各 $\mathcal I_t$ がスカラー時系列では標準イノベーション1本で生成されることを使えば、無限移動平均表示が出ます。

---

## 6. Wold 分解

<a id="def-tsa2-wold-deterministic-component"></a>

<!-- formal-statement-start -->
> **定義（Wold の決定論成分）**  
> 中心化二次定常過程 $(Y_t)$ の無限遠過去を $\mathcal H_{-\infty}$ とする。各 $t$ に対して
>
> $$
> D_t
> :=
> P_{\mathcal H_{-\infty}}Y_t,
> \qquad
> N_t
> :=
> Y_t-D_t
> $$
>
> と定める。$D_t$ を Wold の決定論成分、$N_t$ を純非決定論成分という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsa2-wold-deterministic-component -->
**定義の確認：二つの極端例**

- 弱ホワイトノイズでは $\mathcal H_{-\infty}=\{0\}$ なので $D_t=0$、$N_t=Y_t$。
- ランダム正弦波では $\mathcal H_t=\mathcal H_{-\infty}$ なので $D_t=Y_t$、$N_t=0$。

Wold 分解は、この二つの極端な挙動を同じ定理の中で足し合わせます。
<!-- definition-example-end -->

<a id="thm-tsa2-wold"></a>

<!-- formal-statement-start -->
> **定理（Wold 分解）**  
> $(X_t)_{t\in\mathbb Z}$ を実二次定常過程、$\mu=E[X_t]$、$Y_t=X_t-\mu$ とする。過去空間を $\mathcal H_t$、無限遠過去を $\mathcal H_{-\infty}$ とし、
>
> $$
> \varepsilon_t
> :=
> Y_t-P_{\mathcal H_{t-1}}Y_t
> $$
>
> を標準イノベーションとする。
>
> 1. $D_t=P_{\mathcal H_{-\infty}}Y_t$、$N_t=Y_t-D_t$ とすると
>
> $$
> Y_t=D_t+N_t,
> \qquad
> D_t\perp N_s
> \quad(\forall s,t).
> $$
>
> 2. $D_t$ は完全に線形予測可能であり、その過去空間は各時刻で $\mathcal H_{-\infty}$ になる。
>
> 3. $\sigma_\varepsilon^2:=E[\varepsilon_t^2]$ が0なら $N_t=0$ である。
>
> 4. $\sigma_\varepsilon^2>0$ なら、一意な実数列 $(\psi_j)_{j\ge0}$ が存在して
>
> $$
> \psi_0=1,
> \qquad
> \sum_{j=0}^{\infty}\psi_j^2<\infty,
> $$
>
> かつ
>
> $
> N_t
> =
> L^2\text{-}\sum_{j=0}^{\infty}\psi_j\varepsilon_{t-j}.
> $
>
> さらに部分過程 $(N_t)$ 自身の無限遠過去は $\{0\}$ であり、$(N_t)$ は純非決定論的である。
>
> 係数は
>
> $$
> \psi_j
> =
> \frac{E[Y_t\varepsilon_{t-j}]}{\sigma_\varepsilon^2}
> =
> \frac{E[Y_j\varepsilon_0]}{\sigma_\varepsilon^2}
> $$
>
> で与えられる。
>
> 特に $(Y_t)$ が純非決定論的なら $D_t=0$ であり、過程全体が標準イノベーションの因果的無限移動平均として表される。
<!-- formal-statement-end -->

### 証明の見取り図

証明は新しい確率論ではなく、ここまでの直交幾何を回収するだけです。

1. 過去空間を $\mathcal H_{-\infty}$ と $\mathcal I_{t-j}$ の直交和へ分ける。
2. 各 $\mathcal I_{t-j}$ は $\varepsilon_{t-j}$ の一次元空間。
3. $Y_t$ を各直交成分へ射影する。
4. 二次定常性の時間移動作用素で係数が $t$ に依存しないことを示す。
5. Pythagoras から係数の平方可和性を得る。

<!-- proof-start -->
### 証明

#### Step 1：決定論成分と純非決定論成分の直交性

定義から

$$
D_t=P_{\mathcal H_{-\infty}}Y_t,
\qquad
N_t=Y_t-D_t.
$$

従って直交射影の性質により

$$
D_t\in\mathcal H_{-\infty},
\qquad
N_t\perp\mathcal H_{-\infty}.
$$

各 $D_s\in\mathcal H_{-\infty}$ なので

$$
E[N_tD_s]=0
$$

が全ての $s,t$ で成り立ちます。

#### Step 2：$D_t$ は自身の過去から完全予測できる

時間移動作用素を $U$ とします。TSA1 より $U\mathcal H_r=\mathcal H_{r+1}$ です。従って

$$
U\mathcal H_{-\infty}
=
U\left(\bigcap_r\mathcal H_r\right)
=
\bigcap_r\mathcal H_{r+1}
=
\mathcal H_{-\infty}.
$$

よって $\mathcal H_{-\infty}$ は $U$ と $U^{-1}$ の両方で不変です。そのため $\mathcal H_{-\infty}$ への直交射影は $U$ と可換し、

$$
D_t
=
P_{\mathcal H_{-\infty}}U^tY_0
=
U^tP_{\mathcal H_{-\infty}}Y_0
=
U^tD_0.
$$

ここで

$$
\overline{\operatorname{span}}\{D_s:s\le t\}
=
\overline{\operatorname{span}}\{P_{\mathcal H_{-\infty}}Y_s:s\le t\}.
$$

直交射影 $P_{\mathcal H_{-\infty}}$ は連続なので、右辺は

$$
\overline{P_{\mathcal H_{-\infty}}
\operatorname{span}\{Y_s:s\le t\}}
=
P_{\mathcal H_{-\infty}}\mathcal H_t.
$$

しかも $\mathcal H_{-\infty}\subseteq\mathcal H_t$ だから

$$
P_{\mathcal H_{-\infty}}\mathcal H_t
=
\mathcal H_{-\infty}.
$$

従って $D$ 自身の過去空間は全時刻で $\mathcal H_{-\infty}$ です。特に

$$
D_t\in
\overline{\operatorname{span}}\{D_s:s\le t-1\},
$$

なので一段先予測誤差は0です。

#### Step 3：空間分解を $Y_t$ に適用する

[過去空間の直交分解](#prop-tsa2-past-orthogonal-decomposition)より

$$
\mathcal H_t
=
\mathcal H_{-\infty}
\oplus
\bigoplus_{j=0}^{\infty}\mathcal I_{t-j}.
$$

$Y_t\in\mathcal H_t$ なので

$$
Y_t
=
D_t
+
\sum_{j=0}^{\infty}
P_{\mathcal I_{t-j}}Y_t
$$

in $L^2$ です。

[イノベーション部分空間の一次元性](#prop-tsa2-innovation-span)より

$$
\mathcal I_{t-j}
=
\operatorname{span}\{\varepsilon_{t-j}\}.
$$

#### Step 4：イノベーション分散が0の場合

TSA1 の [イノベーション列の直交性と定常分散](../TSA1/index.md#prop-tsa1-innovation-white-noise)より $E[\varepsilon_t^2]$ は $t$ に依存しません。

もし

$$
\sigma_\varepsilon^2=0
$$

なら全ての $\varepsilon_t=0$ in $L^2$ です。従って全ての $\mathcal I_t=\{0\}$ であり、[過去空間の直交分解](index.md#prop-tsa2-past-orthogonal-decomposition)から

$$
\mathcal H_t=\mathcal H_{-\infty}.
$$

ゆえに $Y_t=D_t$、すなわち $N_t=0$ です。

#### Step 5：$\sigma_\varepsilon^2>0$ の場合の係数

$\mathcal I_{t-j}$ は $\varepsilon_{t-j}$ が張る一次元空間なので

$$
P_{\mathcal I_{t-j}}Y_t
=
\frac{\langle Y_t,\varepsilon_{t-j}\rangle}
{\|\varepsilon_{t-j}\|_2^2}
\varepsilon_{t-j}.
$$

分母は定常分散より $\sigma_\varepsilon^2$ です。したがって

$$
\psi_j^{(t)}
:=
\frac{E[Y_t\varepsilon_{t-j}]}
{\sigma_\varepsilon^2}
$$

と置けば

$$
N_t
=
L^2\text{-}\sum_{j=0}^{\infty}
\psi_j^{(t)}\varepsilon_{t-j}.
$$

TSA1 の時間移動作用素 $U$ はユニタリで、$Y_t=U^tY_0$、$\varepsilon_t=U^t\varepsilon_0$ です。従って

$$
E[Y_t\varepsilon_{t-j}]
=
\langle U^tY_0,U^{t-j}\varepsilon_0\rangle
=
\langle U^jY_0,\varepsilon_0\rangle
=
E[Y_j\varepsilon_0].
$$

よって係数は $t$ に依存せず、

$$
\psi_j
=
\frac{E[Y_j\varepsilon_0]}{\sigma_\varepsilon^2}.
$$

#### Step 6：$\psi_0=1$

$\varepsilon_t=Y_t-P_{\mathcal H_{t-1}}Y_t$ で、$\varepsilon_t\perp\mathcal H_{t-1}$ です。従って

$$
E[Y_t\varepsilon_t]
=
E[\varepsilon_t^2]
+
E[P_{\mathcal H_{t-1}}Y_t\,\varepsilon_t]
=
\sigma_\varepsilon^2.
$$

したがって

$$
\psi_0=1.
$$

#### Step 7：平方可和性

異なる時刻のイノベーションは互いに直交するので、有限和について Pythagoras より

$$
\left\|
\sum_{j=0}^{n}\psi_j\varepsilon_{t-j}
\right\|_2^2
=
\sigma_\varepsilon^2
\sum_{j=0}^{n}\psi_j^2.
$$

左辺は $N_t$ の互いに直交する成分の有限打切り和のノルムなので

$$
\sigma_\varepsilon^2
\sum_{j=0}^{n}\psi_j^2
\le
\|N_t\|_2^2.
$$

$\sigma_\varepsilon^2>0$ だから

$$
\sum_{j=0}^{n}\psi_j^2
\le
\frac{\|N_t\|_2^2}{\sigma_\varepsilon^2}.
$$

$n\to\infty$ として

$$
\sum_{j=0}^{\infty}\psi_j^2<\infty.
$$

#### Step 8：$(N_t)$ 自身の無限遠過去は0

$\sigma_\varepsilon^2>0$ の場合、上で得た表示から各 $s$ について

$$
N_s
\in
\overline{\operatorname{span}}\{\varepsilon_r:r\le s\}.
$$

したがって $(N_t)$ 自身の時刻 $s$ までの過去空間を $\mathcal H_s^N$ と書けば

$$
\mathcal H_s^N
\subseteq
\overline{\operatorname{span}}\{\varepsilon_r:r\le s\}.
$$

標準イノベーション列は異時刻で直交し分散正なので、3.1 の弱ホワイトノイズと同じ議論により

$$
\bigcap_s
\overline{\operatorname{span}}\{\varepsilon_r:r\le s\}
=
\{0\}.
$$

従って

$$
\bigcap_s\mathcal H_s^N
=
\{0\}.
$$

よって $(N_t)$ は純非決定論的です。

$\sigma_\varepsilon^2=0$ の場合は Step 4 で $N_t=0$ を示しているので、その過去空間も全て $\{0\}$ です。

以上で Wold 分解が得られます。
<!-- proof-end -->

### 6.1 どの仮定がどこで働いたか

- **二次定常性**：時間移動作用素をユニタリにし、イノベーション分散と Wold 係数を時刻に依存させない。
- **閉線形包**：有限線形結合だけでなく $L^2$ 極限まで予測空間に含める。
- **Hilbert 空間の完備性**：無限直交和と減少射影の極限を $L^2$ 内で閉じる。
- **スカラー時系列**：一時刻で新しく加わる観測が1個なので $\mathcal I_t$ は高々1次元になる。

ベクトル時系列では $\mathcal I_t$ が多次元になり、係数は行列になります。この章ではスカラー時系列に限定します。

---

## 7. Wold 分解の一意性

<a id="prop-tsa2-wold-uniqueness"></a>

<!-- formal-statement-start -->
> **命題（Wold 分解の一意性）**  
> Wold 分解において、決定論成分
>
> $$
> D_t=P_{\mathcal H_{-\infty}}Y_t
> $$
>
> と標準イノベーション
>
> $$
> \varepsilon_t=Y_t-P_{\mathcal H_{t-1}}Y_t
> $$
>
> は過程 $(Y_t)$ から一意に定まる。さらに $\sigma_\varepsilon^2>0$ なら各 Wold 係数 $\psi_j$ も一意である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\mathcal H_t$ は $(Y_s)_{s\le t}$ の閉線形包として過程から一意に定まり、従って

$$
\mathcal H_{-\infty}
=
\bigcap_t\mathcal H_t
$$

も一意です。閉部分空間への直交射影は一意なので

$$
D_t=P_{\mathcal H_{-\infty}}Y_t
$$

は一意です。

同様に $\mathcal H_{t-1}$ への射影が一意なので

$$
\varepsilon_t
=
Y_t-P_{\mathcal H_{t-1}}Y_t
$$

も一意です。

$\sigma_\varepsilon^2>0$ なら

$$
\mathcal I_{t-j}
=
\operatorname{span}\{\varepsilon_{t-j}\}
$$

であり、$N_t$ の $\mathcal I_{t-j}$ 成分は直交射影として一意です。従って

$$
P_{\mathcal I_{t-j}}N_t
=
\psi_j\varepsilon_{t-j}
$$

の係数 $\psi_j$ も一意です。
<!-- proof-end -->

ここでいう一意性は「どんなホワイトノイズ表示も同じ」という意味ではありません。Wold 分解が一意なのは、**観測過程自身の過去から作った標準イノベーション**を使うからです。

---

## 8. 直接例：安定 AR(1)

$(Z_t)$ を分散 $\sigma^2>0$ の弱ホワイトノイズ、$|\phi|<1$ とし、

$$
X_t=\phi X_{t-1}+Z_t
$$

を満たす二次定常解を考えます。

### 8.1 無限移動平均表示

反復すると任意の $n\ge1$ について

$$
X_t
=
\sum_{j=0}^{n-1}\phi^jZ_{t-j}
+
\phi^nX_{t-n}.
$$

二次定常性により $\|X_{t-n}\|_2=\|X_0\|_2$ なので

$$
\|\phi^nX_{t-n}\|_2
=
|\phi|^n\|X_0\|_2
\to0.
$$

従って

$$
X_t
=
L^2\text{-}\sum_{j=0}^{\infty}\phi^jZ_{t-j}.
$$

### 8.2 $Z_t$ が標準イノベーションであること

まず

$$
Z_t=X_t-\phi X_{t-1}\in\mathcal H_t.
$$

また上の無限移動平均表示から、$s\le t-1$ なら $X_s$ は $\{Z_r:r\le t-1\}$ の閉線形包に属します。弱ホワイトノイズ性より $Z_t$ は全ての $Z_r$ $(r\le t-1)$ と直交するので

$$
Z_t\perp\mathcal H_{t-1}.
$$

したがって

$$
\varepsilon_t=Z_t.
$$

### 8.3 純非決定論性

逆に

$$
Z_s=X_s-\phi X_{s-1}
$$

なので、$\mathcal H_t$ は $\{Z_s:s\le t\}$ の閉線形包と一致します。弱ホワイトノイズの無限遠過去が $\{0\}$ であることは3.1で証明済みなので

$$
\mathcal H_{-\infty}=\{0\}.
$$

よって AR(1) は純非決定論的で、Wold 係数は

$$
\boxed{\psi_j=\phi^j}.
$$

---

## 9. 直接例：可逆 MA(1)

$(Z_t)$ を分散 $\sigma^2>0$ の弱ホワイトノイズとし、

$$
X_t=Z_t+\theta Z_{t-1},
\qquad
|\theta|<1
$$

とします。

TSA1 の演習で示した反復をもう一度書くと、

$$
Z_t
=
X_t-\theta Z_{t-1}
$$

より任意の $n\ge1$ で

$$
Z_t
=
\sum_{j=0}^{n-1}(-\theta)^jX_{t-j}
+
(-\theta)^n Z_{t-n}.
$$

余りの $L^2$ ノルムは

$$
|\theta|^n\sigma\to0.
$$

従って

$$
Z_t
=
L^2\text{-}\sum_{j=0}^{\infty}(-\theta)^jX_{t-j}.
$$

よって $Z_t\in\mathcal H_t$ です。特に $Z_{t-1}\in\mathcal H_{t-1}$。

一方、

$$
X_t=\theta Z_{t-1}+Z_t.
$$

第1項は $\mathcal H_{t-1}$ に属し、$Z_t$ は過去の $Z$ と直交するため $\mathcal H_{t-1}$ と直交します。従って

$$
P_{\mathcal H_{t-1}}X_t
=
\theta Z_{t-1},
\qquad
\varepsilon_t=Z_t.
$$

さらに $\mathcal H_t$ は $\{Z_s:s\le t\}$ の閉線形包と一致するため無限遠過去は0です。したがって MA(1) の Wold 表示はそのまま

$$
\boxed{
X_t
=
\varepsilon_t+\theta\varepsilon_{t-1}
}
$$

で、

$$
\psi_0=1,\qquad
\psi_1=\theta,\qquad
\psi_j=0\ (j\ge2).
$$

ここで $|\theta|<1$ を使った場所は、観測過去から $Z_t$ を $L^2$ 復元する無限級数の収束です。この条件を外すと「式にホワイトノイズが現れているから、それが標準イノベーション」とは言えません。Wold 分解は生成式に書かれた雑音ではなく、観測過程の過去から定まる標準イノベーションを使います。

---

## 10. Wold 分解を予測の言葉で読む

純非決定論的な場合、

$$
Y_t
=
\varepsilon_t
+
\psi_1\varepsilon_{t-1}
+
\psi_2\varepsilon_{t-2}
+\cdots.
$$

時刻 $t-1$ の過去から見れば $\varepsilon_t$ だけが新情報で、それ以外は過去空間に属します。従って

$$
P_{\mathcal H_{t-1}}Y_t
=
\sum_{j=1}^{\infty}\psi_j\varepsilon_{t-j},
$$

そして一段先予測誤差は

$$
Y_t-P_{\mathcal H_{t-1}}Y_t
=
\varepsilon_t.
$$

決定論成分がある一般の場合は

$$
P_{\mathcal H_{t-1}}Y_t
=
D_t
+
\sum_{j=1}^{\infty}\psi_j\varepsilon_{t-j}.
$$

つまり Wold 分解は、時系列を

- 無限に遠い過去から既に決まっている部分
- 過去のイノベーションが蓄積した部分
- 今この瞬間に初めて入るイノベーション

へ分けています。

次章 TSA3 では、この時間領域の分解とは別に、自己共分散の正定値性を周波数領域へ移し、Herglotz の定理とスペクトル測度を導入します。

---

## 11. この章でできるようになったこと

この章の核心は

$$
\mathcal H_t
=
\mathcal H_{-\infty}
\oplus
\bigoplus_{j=0}^{\infty}\mathcal I_{t-j}
$$

という空間分解です。

スカラー時系列では

$$
\mathcal I_{t-j}
=
\operatorname{span}\{\varepsilon_{t-j}\}
$$

なので、

$$
Y_t
=
D_t
+
L^2\text{-}\sum_{j=0}^{\infty}\psi_j\varepsilon_{t-j}
$$

という Wold 分解になります。

「無限移動平均表示」は突然現れる公式ではありません。**過去空間を一時刻ずつ直交差に分けた結果**です。

---

# 演習

## TSA2-A01 イノベーション部分空間は標準イノベーションが張る

- Level: A
- 目安時間: 12分

中心化二次定常過程 $(Y_t)$ について

$$
\mathcal H_t
=
\overline{\operatorname{span}}\{Y_s:s\le t\},
\qquad
\varepsilon_t
=
Y_t-P_{\mathcal H_{t-1}}Y_t
$$

とする。

1. $\varepsilon_t\perp\mathcal H_{t-1}$ を示せ。
2. $\mathcal H_t=\mathcal H_{t-1}\oplus\operatorname{span}\{\varepsilon_t\}$ を示せ。
3. $\mathcal I_t:=\mathcal H_t\ominus\mathcal H_{t-1}$ が $\operatorname{span}\{\varepsilon_t\}$ と一致することを示せ。

<!-- solution-start -->
### 詳細解答

1. $\varepsilon_t$ は $Y_t$ から $\mathcal H_{t-1}$ への直交射影を引いた残差です。直交射影の特徴付けから

$$
Y_t-P_{\mathcal H_{t-1}}Y_t
\perp
\mathcal H_{t-1}.
$$

従って

$$
\varepsilon_t\perp\mathcal H_{t-1}.
$$

2. 定義を変形すると

$$
Y_t
=
P_{\mathcal H_{t-1}}Y_t+\varepsilon_t.
$$

第1項は $\mathcal H_{t-1}$ に属するので、$\mathcal H_t$ を生成する新しいベクトル $Y_t$ は、$\mathcal H_{t-1}$ に $\varepsilon_t$ を加えることと同じです。よって

$$
\mathcal H_t
=
\overline{\mathcal H_{t-1}+\operatorname{span}\{\varepsilon_t\}}.
$$

両空間は直交し、$\operatorname{span}\{\varepsilon_t\}$ は有限次元で閉なので

$$
\mathcal H_t
=
\mathcal H_{t-1}\oplus\operatorname{span}\{\varepsilon_t\}.
$$

3. 直交和の第2成分は $\mathcal H_t$ のうち $\mathcal H_{t-1}$ に直交する部分そのものです。従って

$$
\boxed{
\mathcal I_t
=
\operatorname{span}\{\varepsilon_t\}
}.
$$
<!-- solution-end -->

## TSA2-A02 弱ホワイトノイズの無限遠過去

- Level: A
- 目安時間: 15分

$(Z_t)$ を分散 $\sigma^2>0$ の弱ホワイトノイズとし、

$$
\mathcal H_t
=
\overline{\operatorname{span}}\{Z_s:s\le t\}
$$

とする。

$$
\mathcal H_{-\infty}
=
\bigcap_{t\in\mathbb Z}\mathcal H_t
=
\{0\}
$$

を証明せよ。

<!-- solution-start -->
### 詳細解答

$Y\in\mathcal H_{-\infty}$ とします。固定した整数 $r$ を任意に取ります。

$t<r$ を選ぶと $Y\in\mathcal H_t$ です。一方、弱ホワイトノイズ性より $Z_r$ は各 $Z_s$ $(s\le t)$ と直交します。従って有限線形結合とも直交し、内積の連続性から

$$
Z_r\perp\mathcal H_t.
$$

よって

$$
E[YZ_r]=0.
$$

$r$ は任意なので、$Y$ は全ての $Z_r$ と直交します。

特に $Y\in\mathcal H_0$ です。$\mathcal H_0$ は $\{Z_r:r\le0\}$ の閉線形包であり、$Y$ はその全生成元と直交するので

$$
Y\perp\mathcal H_0.
$$

ところが $Y\in\mathcal H_0$ でもあります。従って

$$
\|Y\|_2^2
=
\langle Y,Y\rangle
=
0.
$$

よって $Y=0$ in $L^2$ です。

したがって

$$
\boxed{\mathcal H_{-\infty}=\{0\}}.
$$
<!-- solution-end -->

## TSA2-A03 安定 AR(1) の Wold 係数

- Level: A
- 目安時間: 18分

$(Z_t)$ を分散 $\sigma^2>0$ の弱ホワイトノイズ、$|\phi|<1$ とし、二次定常過程 $(X_t)$ が

$$
X_t=\phi X_{t-1}+Z_t
$$

を満たすとする。

1. 任意の $n\ge1$ について
   $$
   X_t
   =
   \sum_{j=0}^{n-1}\phi^jZ_{t-j}
   +
   \phi^nX_{t-n}
   $$
   を示せ。
2. $n\to\infty$ として
   $$
   X_t=L^2\text{-}\sum_{j=0}^{\infty}\phi^jZ_{t-j}
   $$
   を導け。
3. $Z_t$ が標準イノベーションであることを示し、Wold 係数を求めよ。

<!-- solution-start -->
### 詳細解答

1. まず

$$
X_t=\phi X_{t-1}+Z_t.
$$

さらに

$$
X_{t-1}=\phi X_{t-2}+Z_{t-1}
$$

を代入すると

$$
X_t
=
Z_t+\phi Z_{t-1}+\phi^2X_{t-2}.
$$

同じ代入を繰り返すと

$$
X_t
=
Z_t+\phi Z_{t-1}+\cdots+\phi^{n-1}Z_{t-n+1}
+\phi^nX_{t-n},
$$

すなわち

$$
X_t
=
\sum_{j=0}^{n-1}\phi^jZ_{t-j}
+\phi^nX_{t-n}.
$$

2. 二次定常性から $\|X_{t-n}\|_2=\|X_0\|_2<\infty$ です。従って余りは

$$
\|\phi^nX_{t-n}\|_2
=
|\phi|^n\|X_0\|_2
\to0
$$

です。よって

$$
X_t
=
L^2\text{-}\sum_{j=0}^{\infty}\phi^jZ_{t-j}.
$$

3. AR(1) 方程式から

$$
Z_t=X_t-\phi X_{t-1}\in\mathcal H_t.
$$

一方、$s\le t-1$ なら上の無限移動平均表示から $X_s$ は $\{Z_r:r\le t-1\}$ の閉線形包に属します。$Z_t$ はそれら全てと直交するので

$$
Z_t\perp\mathcal H_{t-1}.
$$

従って

$$
\varepsilon_t=Z_t.
$$

したがって Wold 表示は

$$
X_t
=
\sum_{j=0}^{\infty}\phi^j\varepsilon_{t-j},
$$

ゆえに

$$
\boxed{\psi_j=\phi^j\quad(j\ge0)}.
$$
<!-- solution-end -->

## TSA2-A04 可逆 MA(1) の標準イノベーション

- Level: A
- 目安時間: 18分

$(Z_t)$ を分散 $\sigma^2>0$ の弱ホワイトノイズとし、

$$
X_t=Z_t+\theta Z_{t-1},
\qquad
|\theta|<1
$$

とする。

1.
$$
Z_t
=
L^2\text{-}\sum_{j=0}^{\infty}(-\theta)^jX_{t-j}
$$
を示せ。
2. $Z_t\in\mathcal H_t$ を示せ。
3. $Z_t$ が $X_t$ の標準イノベーションであることを示せ。
4. Wold 係数を求めよ。

<!-- solution-start -->
### 詳細解答

1. 元の式を

$$
Z_t=X_t-\theta Z_{t-1}
$$

と書きます。反復すると任意の $n\ge1$ で

$$
Z_t
=
\sum_{j=0}^{n-1}(-\theta)^jX_{t-j}
+
(-\theta)^nZ_{t-n}.
$$

余りの $L^2$ ノルムは

$$
\|(-\theta)^nZ_{t-n}\|_2
=
|\theta|^n\sigma
\to0
$$

です。従って

$$
Z_t
=
L^2\text{-}\sum_{j=0}^{\infty}(-\theta)^jX_{t-j}.
$$

2. 各有限打切り和は $\mathcal H_t$ に属します。$\mathcal H_t$ は閉なので、その $L^2$ 極限も $\mathcal H_t$ に属し、

$$
Z_t\in\mathcal H_t.
$$

3. 特に $Z_{t-1}\in\mathcal H_{t-1}$ です。元の式は

$$
X_t=\theta Z_{t-1}+Z_t.
$$

第1項は $\mathcal H_{t-1}$ に属します。

また $\mathcal H_{t-1}$ は過去の $Z$ の閉線形包と一致し、$Z_t$ は過去の $Z$ と全て直交するので

$$
Z_t\perp\mathcal H_{t-1}.
$$

従ってこの式は $\mathcal H_{t-1}$ 成分と直交残差の分解になっており、

$$
\varepsilon_t=Z_t.
$$

4. よって

$$
X_t
=
\varepsilon_t+\theta\varepsilon_{t-1},
$$

なので

$$
\boxed{
\psi_0=1,\quad
\psi_1=\theta,\quad
\psi_j=0\ (j\ge2)
}.
$$
<!-- solution-end -->

## TSA2-B01 減少閉部分空間への射影収束

- Level: B
- 目安時間: 24分

Hilbert 空間 $H$ の閉部分空間列

$$
M_1\supseteq M_2\supseteq\cdots
$$

と

$$
M=\bigcap_{n\ge1}M_n
$$

を考える。$x_n=P_{M_n}x$ とする。

1. $m>n$ のとき $x_m=P_{M_m}x_n$ を示せ。
2.
$$
\|x_n-x_m\|^2
=
\|x_n\|^2-\|x_m\|^2
$$
を示せ。
3. $x_n\to P_Mx$ を証明せよ。

<!-- solution-start -->
### 詳細解答

1. $x-x_n\perp M_n$ です。$M_m\subseteq M_n$ なので

$$
x-x_n\perp M_m.
$$

従って $x$ と $x_n$ は $M_m$ への射影が同じで、

$$
x_m=P_{M_m}x=P_{M_m}x_n.
$$

2. $x_m=P_{M_m}x_n$ だから

$$
x_n-x_m\perp M_m.
$$

また $x_m\in M_m$ なので

$$
x_n-x_m\perp x_m.
$$

Pythagoras より

$$
\|x_n\|^2
=
\|x_n-x_m\|^2+\|x_m\|^2.
$$

従って

$$
\|x_n-x_m\|^2
=
\|x_n\|^2-\|x_m\|^2.
$$

3. 上式から $\|x_n\|$ は非増加です。非負なので極限を持ちます。従って $m,n\to\infty$ で

$$
\|x_n-x_m\|\to0.
$$

よって $(x_n)$ は Cauchy 列です。$H$ は完備なので、ある $y\in H$ に対して

$$
x_n\to y.
$$

固定した $k$ に対し $n\ge k$ なら $x_n\in M_k$。$M_k$ は閉なので $y\in M_k$。全ての $k$ について成り立つから $y\in M$ です。

さらに $z\in M$ なら $z\in M_n$ なので

$$
\langle x-x_n,z\rangle=0.
$$

極限を取って

$$
\langle x-y,z\rangle=0.
$$

従って $x-y\perp M$。$y\in M$ と合わせると

$$
\boxed{y=P_Mx}.
$$

したがって

$$
\boxed{P_{M_n}x\to P_Mx}.
$$
<!-- solution-end -->

## TSA2-B02 有限段の直交分解から Wold の空間分解へ

- Level: B
- 目安時間: 25分

中心化二次定常過程について

$$
\mathcal I_t=\mathcal H_t\ominus\mathcal H_{t-1}
$$

とする。

1. 任意の $n\ge1$ について
$$
\mathcal H_t
=
\mathcal H_{t-n}
\oplus
\mathcal I_{t-n+1}
\oplus\cdots\oplus
\mathcal I_t
$$
を示せ。
2. $x\in\mathcal H_t$ に対して
$$
x
=
P_{\mathcal H_{-\infty}}x
+
L^2\text{-}\sum_{j=0}^{\infty}P_{\mathcal I_{t-j}}x
$$
を示せ。
3. $\mathcal H_{-\infty}\perp\mathcal I_s$ を全ての $s$ で示せ。

<!-- solution-start -->
### 詳細解答

1. 定義から

$$
\mathcal H_r
=
\mathcal H_{r-1}\oplus\mathcal I_r.
$$

まず $r=t$ で

$$
\mathcal H_t
=
\mathcal H_{t-1}\oplus\mathcal I_t.
$$

次に

$$
\mathcal H_{t-1}
=
\mathcal H_{t-2}\oplus\mathcal I_{t-1}
$$

を代入すると

$$
\mathcal H_t
=
\mathcal H_{t-2}
\oplus\mathcal I_{t-1}
\oplus\mathcal I_t.
$$

これを $n$ 回繰り返して

$$
\mathcal H_t
=
\mathcal H_{t-n}
\oplus
\mathcal I_{t-n+1}
\oplus\cdots\oplus
\mathcal I_t.
$$

2. $x\in\mathcal H_t$ を上の有限直交和へ射影すると

$$
x
=
P_{\mathcal H_{t-n}}x
+
\sum_{j=0}^{n-1}P_{\mathcal I_{t-j}}x.
$$

$\mathcal H_{t-n}$ は $n$ とともに減少し、その共通部分は $\mathcal H_{-\infty}$ です。B01 の結果から

$$
P_{\mathcal H_{t-n}}x
\to
P_{\mathcal H_{-\infty}}x.
$$

従って

$$
\sum_{j=0}^{n-1}P_{\mathcal I_{t-j}}x
\to
x-P_{\mathcal H_{-\infty}}x.
$$

よって

$$
\boxed{
x
=
P_{\mathcal H_{-\infty}}x
+
L^2\text{-}\sum_{j=0}^{\infty}P_{\mathcal I_{t-j}}x
}.
$$

3. $\mathcal H_{-\infty}\subseteq\mathcal H_{s-1}$ です。一方

$$
\mathcal I_s\perp\mathcal H_{s-1}.
$$

従って

$$
\boxed{
\mathcal H_{-\infty}\perp\mathcal I_s
}.
$$
<!-- solution-end -->

## TSA2-B03 Wold 係数の平方可和性と $\psi_0=1$

- Level: B
- 目安時間: 22分

中心化二次定常過程の標準イノベーションを $(\varepsilon_t)$ とし、

$$
E[\varepsilon_t^2]=\sigma_\varepsilon^2>0
$$

とする。Wold 分解の純非決定論成分が

$$
N_t
=
L^2\text{-}\sum_{j=0}^{\infty}\psi_j\varepsilon_{t-j}
$$

と表されるとする。

1. $\psi_0=1$ を示せ。
2. 任意の $n$ について
$$
\sigma_\varepsilon^2\sum_{j=0}^{n}\psi_j^2
\le
\|N_t\|_2^2
$$
を示せ。
3. $\sum_{j=0}^{\infty}\psi_j^2<\infty$ を導け。

<!-- solution-start -->
### 詳細解答

1. 標準イノベーションは

$$
\varepsilon_t
=
Y_t-P_{\mathcal H_{t-1}}Y_t.
$$

従って

$$
Y_t
=
P_{\mathcal H_{t-1}}Y_t+\varepsilon_t.
$$

$\varepsilon_t\perp\mathcal H_{t-1}$ なので

$$
E[Y_t\varepsilon_t]
=
E[\varepsilon_t^2]
=
\sigma_\varepsilon^2.
$$

Wold 係数の射影公式より

$$
\psi_0
=
\frac{E[Y_t\varepsilon_t]}{\sigma_\varepsilon^2}
=
1.
$$

2. 異なる時刻の標準イノベーションは互いに直交します。従って

$$
\left\|
\sum_{j=0}^{n}\psi_j\varepsilon_{t-j}
\right\|_2^2
=
\sum_{j=0}^{n}
\psi_j^2\|\varepsilon_{t-j}\|_2^2.
$$

定常分散より各ノルム平方は $\sigma_\varepsilon^2$ なので

$$
\left\|
\sum_{j=0}^{n}\psi_j\varepsilon_{t-j}
\right\|_2^2
=
\sigma_\varepsilon^2
\sum_{j=0}^{n}\psi_j^2.
$$

この有限和は $N_t$ の互いに直交する一部の成分を足したものなので、そのノルムは全体を超えません。よって

$$
\sigma_\varepsilon^2
\sum_{j=0}^{n}\psi_j^2
\le
\|N_t\|_2^2.
$$

3. $\sigma_\varepsilon^2>0$ だから

$$
\sum_{j=0}^{n}\psi_j^2
\le
\frac{\|N_t\|_2^2}{\sigma_\varepsilon^2}.
$$

左辺は $n$ とともに単調増加し、右辺は有限定数です。従って極限が有限で、

$$
\boxed{
\sum_{j=0}^{\infty}\psi_j^2<\infty
}.
$$
<!-- solution-end -->

## TSA2-C01 Wold 分解から一段先予測と一意性を再構成する

- Level: C
- 目安時間: 38分

中心化二次定常過程 $(Y_t)$ が

$$
Y_t
=
D_t
+
L^2\text{-}\sum_{j=0}^{\infty}\psi_j\varepsilon_{t-j}
$$

という Wold 分解を持つとする。ここで

- $D_t\in\mathcal H_{-\infty}$,
- $(\varepsilon_t)$ は分散 $\sigma_\varepsilon^2>0$ の標準イノベーション列,
- $\psi_0=1$,
- $\sum_{j\ge0}\psi_j^2<\infty$

とする。

1.
$$
P_{\mathcal H_{t-1}}Y_t
=
D_t
+
L^2\text{-}\sum_{j=1}^{\infty}\psi_j\varepsilon_{t-j}
$$
を示せ。
2. 一段先予測誤差が $\varepsilon_t$ で、その分散が $\sigma_\varepsilon^2$ であることを示せ。
3. $D_t$ が $Y_t$ から一意に定まることを示せ。
4. 標準イノベーションと Wold 係数 $\psi_j$ が一意であることを示せ。
5. 純非決定論的な場合に何が消えるかを述べよ。

<!-- solution-start -->
### 詳細解答

1. まず

$$
D_t\in\mathcal H_{-\infty}\subseteq\mathcal H_{t-1}.
$$

また $j\ge1$ なら $t-j\le t-1$ なので

$$
\varepsilon_{t-j}\in\mathcal H_{t-j}\subseteq\mathcal H_{t-1}.
$$

平方可和性とイノベーションの直交性から

$$
\sum_{j=1}^{\infty}\psi_j\varepsilon_{t-j}
$$

は $L^2$ で収束します。$\mathcal H_{t-1}$ は閉なので、その極限も $\mathcal H_{t-1}$ に属します。

一方、

$$
\varepsilon_t\perp\mathcal H_{t-1}.
$$

$\psi_0=1$ だから

$$
Y_t
=
\left(
D_t
+
\sum_{j=1}^{\infty}\psi_j\varepsilon_{t-j}
\right)
+
\varepsilon_t
$$

は $\mathcal H_{t-1}$ 成分とその直交成分への分解です。直交射影の一意性から

$$
\boxed{
P_{\mathcal H_{t-1}}Y_t
=
D_t
+
L^2\text{-}\sum_{j=1}^{\infty}\psi_j\varepsilon_{t-j}
}.
$$

2. 上式を $Y_t$ から引けば

$$
Y_t-P_{\mathcal H_{t-1}}Y_t
=
\varepsilon_t.
$$

従って一段先線形予測誤差分散は

$$
\boxed{
E[\varepsilon_t^2]
=
\sigma_\varepsilon^2
}.
$$

3. $\mathcal H_t$ は観測過程 $Y$ の過去の閉線形包として一意に定まります。従って

$$
\mathcal H_{-\infty}
=
\bigcap_t\mathcal H_t
$$

も一意です。

$D_t$ は

$$
D_t=P_{\mathcal H_{-\infty}}Y_t
$$

という閉部分空間への直交射影です。直交射影は一意なので $D_t$ も一意です。

4. 標準イノベーションは

$$
\varepsilon_t
=
Y_t-P_{\mathcal H_{t-1}}Y_t
$$

であり、$\mathcal H_{t-1}$ と射影は一意なので $\varepsilon_t$ も一意です。

さらに

$$
\mathcal I_{t-j}
=
\operatorname{span}\{\varepsilon_{t-j}\}.
$$

$N_t:=Y_t-D_t$ の $\mathcal I_{t-j}$ への射影は一意で、

$$
P_{\mathcal I_{t-j}}N_t
=
\psi_j\varepsilon_{t-j}.
$$

$\varepsilon_{t-j}\ne0$ in $L^2$ なので、その係数も一意です。具体的には

$$
\boxed{
\psi_j
=
\frac{E[N_t\varepsilon_{t-j}]}
{\sigma_\varepsilon^2}
=
\frac{E[Y_t\varepsilon_{t-j}]}
{\sigma_\varepsilon^2}
}.
$$

5. 純非決定論的なら

$$
\mathcal H_{-\infty}=\{0\}.
$$

従って

$$
D_t=P_{\{0\}}Y_t=0.
$$

よって Wold 分解は

$$
\boxed{
Y_t
=
L^2\text{-}\sum_{j=0}^{\infty}\psi_j\varepsilon_{t-j}
}
$$

となり、過程全体が標準イノベーションの因果的無限移動平均で表されます。
<!-- solution-end -->

---

## 次に進む

次章 TSA3 では、自己共分散列の正定値性を出発点として Herglotz の定理、スペクトル測度、スペクトル密度、線スペクトル、直交増分ランダム測度、スペクトル表現へ進みます。
