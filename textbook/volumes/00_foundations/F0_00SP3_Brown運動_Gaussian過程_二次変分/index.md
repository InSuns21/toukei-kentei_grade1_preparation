# F0-00SP3 Encore IV：Brown運動・Gaussian過程・二次変分

Brown運動は、連続時間martingaleとItô解析の基準過程です。ここで重要なのは「正規分布の過程」であることだけではありません。

> 時間幅 $\Delta t$ のBrown増分は典型的に大きさ $\sqrt{\Delta t}$ なので、その二乗は $\Delta t$ と同じ次数で残る。

この事実を二次変分として定理化し、次章のItô公式へ渡します。

---

## 1. Brown運動

<a id="def-f0-00sp3-brownian-motion"></a>

<!-- formal-statement-start -->
> **定義（標準Brown運動）**  
> filtration $(\mathcal F_t)_{t\ge0}$ を持つ確率空間上の実数値過程 $(B_t)_{t\ge0}$ が標準Brown運動であるとは、次を満たすことです。
>
> 1. $B_0=0$ a.s.
> 2. $t\mapsto B_t(\omega)$ はa.s.連続である。
> 3. $0\le t_0<t_1<\cdots<t_m$ に対し増分 $B_{t_1}-B_{t_0},\dots,B_{t_m}-B_{t_{m-1}}$ は独立である。
> 4. $0\le s<t$ に対し

$$
B_t-B_s\sim N(0,t-s).
$$

> 5. $B_t$ は $\mathcal F_t$-可測で、未来増分 $B_t-B_s$ は $\mathcal F_s$ と独立である。
<!-- formal-statement-end -->

最後の条件はnatural filtrationなら独立増分から従いますが、後でより大きいfiltrationを使うため明示しています。

### 1.1 例：1時刻・2増分の分布

<!-- definition-example-start: def-f0-00sp3-brownian-motion -->
**定義の確認**  
標準Brown運動なら

$$
B_1=B_1-B_0\sim N(0,1),
$$

また

$$
B_2-B_1\sim N(0,1)
$$

で、$B_1$ と $B_2-B_1$ は独立です。従って

$$
B_2=B_1+(B_2-B_1)\sim N(0,2).
$$

分散が時間差に比例し、互いに素な区間の増分が独立という定義条件を直接使っています。
<!-- definition-example-end -->

---

## 2. Gaussian過程

<a id="def-f0-00sp3-gaussian-process"></a>

<!-- formal-statement-start -->
> **定義（Gaussian過程）**  
> 実数値確率過程 $(X_t)_{t\in T}$ がGaussian過程であるとは、任意の有限個の時刻 $t_1,\dots,t_m$ に対して確率ベクトル

$$
(X_{t_1},\dots,X_{t_m})
$$

> が多変量正規分布に従うことです。
<!-- formal-statement-end -->

### 2.1 例：Brown運動はGaussian過程

時刻 $0<t_1<\cdots<t_m$ を固定し

$$
\Delta_j:=B_{t_j}-B_{t_{j-1}},
\qquad t_0=0
$$

とします。

<!-- definition-example-start: def-f0-00sp3-gaussian-process -->
**定義の確認**  
$\Delta_1,\dots,\Delta_m$ は独立な正規確率変数です。また

$$
B_{t_j}=\Delta_1+\cdots+\Delta_j.
$$

従って $(B_{t_1},\dots,B_{t_m})$ は独立正規ベクトルの線形変換であり、多変量正規分布です。よってBrown運動はGaussian過程です。
<!-- definition-example-end -->

---

## 3. 共分散核

<a id="thm-f0-00sp3-covariance"></a>

<!-- formal-statement-start -->
> **定理（Brown運動の共分散）**  
> 標準Brown運動に対し、任意の $s,t\ge0$ で

$$
\boxed{\operatorname{Cov}(B_s,B_t)=\min(s,t)}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：過去値と未来増分を分ける

$s\le t$ とします。

$$
B_t=B_s+(B_t-B_s)
$$

で、$B_t-B_s$ は $B_s$ と独立、平均0です。従って

$$
E[B_sB_t]
=E[B_s^2]+E[B_s]E[B_t-B_s]
=s.
$$

$E[B_s]=E[B_t]=0$ なので共分散も $s=\min(s,t)$ です。$t<s$ も対称性から同じです。
<!-- proof-end -->

平均0のGaussian過程は共分散核で有限次元分布が決まるので、Brown運動の分布構造は

$$
K(s,t)=\min(s,t)
$$

に圧縮されています。

---

## 4. Brown運動はmartingale

<a id="thm-f0-00sp3-brownian-martingale"></a>

<!-- formal-statement-start -->
> **定理（Brown運動のmartingale性）**  
> 標準Brown運動 $(B_t)$ は、そのfiltration $(\mathcal F_t)$ に関して平方可積分martingaleです。また

$$
B_t^2-t
$$

> もmartingaleです。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：独立増分の一次・二次モーメントを使う

$s<t$ とします。未来増分 $\Delta B:=B_t-B_s$ は $\mathcal F_s$ と独立で

$$
E[\Delta B]=0,
\qquad
E[(\Delta B)^2]=t-s.
$$

従って

$$
E[B_t\mid\mathcal F_s]
=B_s+E[\Delta B\mid\mathcal F_s]
=B_s.
$$

また

$$
B_t^2=B_s^2+2B_s\Delta B+(\Delta B)^2
$$

なので

$$
E[B_t^2-t\mid\mathcal F_s]
=B_s^2+(t-s)-t
=B_s^2-s.
$$

平方可積分性は $E[B_t^2]=t<\infty$ から従います。
<!-- proof-end -->

---

## 5. scaling property

<a id="thm-f0-00sp3-scaling"></a>

<!-- formal-statement-start -->
> **定理（Brownian scaling）**  
> 標準Brown運動 $(B_t)$ と定数 $c>0$ に対し

$$
\widetilde B_t:=c^{-1/2}B_{ct}
$$

> と置くと、$(\widetilde B_t)_{t\ge0}$ も標準Brown運動です。従って過程として

$$
(c^{-1/2}B_{ct})_{t\ge0}\stackrel d=(B_t)_{t\ge0}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：定義の条件を移す

$\widetilde B_0=0$ で、pathの連続性は時間・空間の連続な尺度変換で保たれます。互いに素な時間区間は $t\mapsto ct$ で互いに素な区間へ移るため増分の独立性も保たれます。また

$$
\widetilde B_t-\widetilde B_s
=c^{-1/2}(B_{ct}-B_{cs})
\sim N(0,t-s).
$$

従って標準Brown運動の定義を満たします。
<!-- proof-end -->

---

## 6. 二次変分

<a id="def-f0-00sp3-quadratic-variation-sum"></a>

<!-- formal-statement-start -->
> **定義（二次変分和）**  
> 区間 $[0,T]$ の有限分割

$$
\pi=\{0=t_0<t_1<\cdots<t_m=T\}
$$

> に対し、過程 $X$ の二次変分和を

$$
Q_\pi(X;T)
:=\sum_{k=1}^m(X_{t_k}-X_{t_{k-1}})^2
$$

> と定めます。分割幅を $|\pi|:=\max_k(t_k-t_{k-1})$ と書きます。
<!-- formal-statement-end -->

### 6.1 例：滑らかな関数では0へ消える

$f\in C^1([0,T])$ を決定論的過程とみなします。

<!-- definition-example-start: def-f0-00sp3-quadratic-variation-sum -->
**定義の確認**  
平均値の定理から

$$
|f(t_k)-f(t_{k-1})|
\le \|f'\|_\infty(t_k-t_{k-1}).
$$

従って

$$
Q_\pi(f;T)
\le\|f'\|_\infty^2
\sum_k(t_k-t_{k-1})^2
\le\|f'\|_\infty^2T|\pi|\to0.
$$

二次変分和という定義量を実際に計算すると、滑らかなpathでは0へ消えます。
<!-- definition-example-end -->

---

## 7. Brown運動の二次変分は時間そのもの

<a id="thm-f0-00sp3-quadratic-variation"></a>

<!-- formal-statement-start -->
> **定理（Brown運動の二次変分）**  
> $B$ を標準Brown運動とし、$[0,T]$ の決定論的分割列 $\pi_n$ が $|\pi_n|\to0$ を満たすとします。このとき

$$
\boxed{
Q_{\pi_n}(B;T)
=\sum_k(B_{t_k^{(n)}}-B_{t_{k-1}^{(n)}})^2
\longrightarrow T
}
$$

> が $L^2$、従って確率収束で成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：平均は $T$、分散はmeshで消える

一つの分割 $\pi$ を固定し

$$
\Delta_kB:=B_{t_k}-B_{t_{k-1}},
\qquad
\Delta_kt:=t_k-t_{k-1}
$$

と書きます。各増分は独立で $\Delta_kB\sim N(0,\Delta_kt)$ です。従って

$$
E[Q_\pi(B;T)]=\sum_k\Delta_kt=T.
$$

正規分布の四次モーメントから

$$
\operatorname{Var}((\Delta_kB)^2)=2(\Delta_kt)^2.
$$

独立性により

$$
\begin{aligned}
\operatorname{Var}(Q_\pi(B;T))
&=2\sum_k(\Delta_kt)^2\\
&\le2|\pi|\sum_k\Delta_kt
=2T|\pi|.
\end{aligned}
$$

従って

$$
E|Q_\pi(B;T)-T|^2\le2T|\pi|\to0.
$$
<!-- proof-end -->

この定理を $[B]_T=T$ と記号的に書きます。

---

## 8. weighted quadratic variation

Itô公式では単なる $\sum(\Delta B)^2$ ではなく、過去情報で決まる係数を掛けた和が現れます。

<a id="lem-f0-00sp3-weighted-qv"></a>

<!-- formal-statement-start -->
> **補題（有界predictable係数付き二次変分）**  
> 分割 $\pi=\{t_k\}$ に対し、$H_k$ を $\mathcal F_{t_{k-1}}$-可測で $|H_k|\le C$ a.s. とします。このとき $|\pi|\to0$ なら

$$
\boxed{
\sum_kH_k\left\{(\Delta_kB)^2-\Delta_kt\right\}
\longrightarrow0
}
$$

> が $L^2$ で成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：中心化二乗増分もmartingale差分

$$
Y_k:=H_k\{(\Delta_kB)^2-\Delta_kt\}
$$

と置きます。$H_k$ は過去情報で決まり、$\Delta_kB$ はその過去と独立なので

$$
E[Y_k\mid\mathcal F_{t_{k-1}}]=0.
$$

異なる $k$ のcross termは条件付き期待値を順に取ると0です。さらに

$$
E[Y_k^2]
\le C^2\operatorname{Var}((\Delta_kB)^2)
=2C^2(\Delta_kt)^2.
$$

よって

$$
E\left|\sum_kY_k\right|^2
\le2C^2T|\pi|\to0.
$$
<!-- proof-end -->

これがTaylor二階項を

$$
\frac12\sum f''(B_{t_{k-1}})(\Delta_kB)^2
\quad\leadsto\quad
\frac12\int_0^Tf''(B_s)ds
$$

へ置き換える計算の核心です。

---

## 9. なぜ通常のchain ruleが壊れるか

通常の滑らかなpathなら $\sum(\Delta x)^2\to0$ なのでTaylor二階項は消えます。しかしBrown運動では

$$
\sum(\Delta B)^2\to T.
$$

したがって形式的には

$$
(dB_t)^2=dt
$$

という次数勘定を持ち、二階項を捨てられません。

---

## 10. pathの非微分可能性とwhite noise

Brown運動pathはa.s.どの点でも通常の意味で微分可能でない、というさらに強い定理があります。この完全証明にはlaw of iterated logarithm等の別の道具が必要なので、ここでは **P3黒箱** とします。

形式的な時間微分 $\xi(t)=dB_t/dt$ は通常関数ではなくwhite noiseと呼ばれ、Schwartz超関数として扱うのが自然です。この発展事項は次章のItô公式の証明には使いません。必要なのは前節までの二次変分です。

---

# 11. 演習

## F0-00SP3-A01 共分散を導く

- Level: A
- 目安時間: 10分

$0\le s\le t$ に対して $\operatorname{Cov}(B_s,B_t)=s$ を独立増分から示せ。

<!-- solution-start -->
### 詳細解答

$B_t=B_s+(B_t-B_s)$ と分解し、未来増分が $B_s$ と独立かつ平均0であることを使うと $E[B_sB_t]=E[B_s^2]=s$。平均はともに0なので共分散も $s$。

### 本番答案

$E[B_s(B_t-B_s)]=0$ と $E[B_s^2]=s$ を使う。

### 採点基準（20点）
- 増分分解：6点
- 独立性：7点
- 結論：7点
<!-- solution-end -->

## F0-00SP3-A02 $B_t^2-t$ のmartingale性

- Level: A
- 目安時間: 12分

$0\le s<t$ に対して $E[B_t^2-t\mid\mathcal F_s]=B_s^2-s$ を示せ。

<!-- solution-start -->
### 詳細解答

$B_t=B_s+\Delta B$ とし、$E[\Delta B\mid\mathcal F_s]=0$, $E[(\Delta B)^2\mid\mathcal F_s]=t-s$ を使う。

### 本番答案

二乗展開に条件付き期待値を適用して交差項を0、二乗増分を $t-s$ にする。

### 採点基準（20点）
- 二乗展開：6点
- 二つの条件付きモーメント：10点
- 結論：4点
<!-- solution-end -->

## F0-00SP3-B01 非一様分割でも二次変分を示す

- Level: B
- 目安時間: 18分

決定論的分割 $\pi$ に対し $Q_\pi=\sum_k(\Delta_kB)^2$ と置く。$E[Q_\pi]=T$ と $\operatorname{Var}(Q_\pi)\le2T|\pi|$ を示し、$|\pi|\to0$ なら $Q_\pi\to T$ in $L^2$ を導け。

<!-- solution-start -->
### 詳細解答

各増分は独立な $N(0,\Delta_kt)$。二次・四次モーメントから期待値は $T$、分散は

$$
2\sum_k(\Delta_kt)^2\le2|\pi|T.
$$

### 本番答案

独立正規増分の二次・四次モーメントを足し合わせる。

### 採点基準（20点）
- 増分分布：5点
- 期待値：5点
- 分散評価：7点
- $L^2$収束：3点
<!-- solution-end -->

## F0-00SP3-B02 weighted quadratic variation

- Level: B
- 目安時間: 20分

$H_k\in\mathcal F_{t_{k-1}}$, $|H_k|\le C$ とする。

$$
Z_\pi=\sum_kH_k\{(\Delta_kB)^2-\Delta_kt\}
$$

について $E|Z_\pi|^2\le2C^2T|\pi|$ を示せ。

<!-- solution-start -->
### 詳細解答

各項は過去に関する条件付き平均0を持つためcross termが消える。各二乗期待値は $2C^2(\Delta_kt)^2$ 以下なので和を取れば主張。

### 本番答案

中心化二乗増分をmartingale差分として直交させ、分散を加える。

### 採点基準（20点）
- 条件付き平均0：7点
- cross term消失：6点
- 分散評価：7点
<!-- solution-end -->

---

## 章末チェック

- Brown運動の定義条件を列挙できる。
- Brown運動がGaussian過程であることを示せる。
- 共分散 $\min(s,t)$ とmartingale性を導ける。
- Brownian scalingを定義から証明できる。
- 一般の決定論的細分割で $[B]_T=T$ を $L^2$ で証明できる。
- predictable係数付き二次変分の中心化誤差が0へ行くことを示せる。
- 二次変分がItô公式の二階項を生む理由を説明できる。
