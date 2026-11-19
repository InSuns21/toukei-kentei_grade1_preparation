# PML1-03 自由エネルギー最小化とKLはどう結び付くか

<!-- definition-example-audit: strict -->

## 1. 正規化した確率に「最適性」の理由を与える

前講では、[有限候補のGibbs選択則](../PML1-02/index.md#def-pml1-02-finite-loss-gibbs)によって、損失の小さい候補ほど大きな確率を与える方法を作った。しかし「指数を取り、足して、割る」という手順だけでは、**なぜその確率分布を選ぶのか**は説明できない。

例えば二候補の損失が $0,\log 3$、選択尺度が $1$ なら、Gibbs分布は $(3/4,1/4)$ である。最小損失の候補だけを選ぶ $(1,0)$ や、どちらにも公平に確率を割り当てる $(1/2,1/2)$ よりも、この分布が優れていると言えるのは、**どの目的関数を最小化するとき**だろうか。

本講では有限候補の損失の平均と、分布の広がりを表すエントロピーを一つの目的関数にまとめる。その差が、[INFO2の相対エントロピー](../../INFO/INFO2/index.md#def-info2-relative-entropy)、すなわちKLダイバージェンスで**正確に**表せることを確かめる。物理系で証明済みの[SM3の正準自由エネルギー変分原理](../../../物理系/SM/SM3/index.md#thm-sm3-variational)を学習の言葉へ移すが、物理的な熱浴や平衡への収束を仮定したことにはならない。

## 2. 候補を一つ選ぶ代わりに、確率分布全体を動かす

非空有限候補集合 $\Theta$ の要素を $\theta$ とする。固定した学習データから決めた損失 $L:\Theta\to\mathbb R$ は、各候補で有限とする。損失と同じ単位の正の尺度 $\tau>0$ を固定する。$\Theta$ 上の任意の確率分布 $q$ とは、各 $q(\theta)\ge0$ かつ $\sum_\theta q(\theta)=1$ を満たす数の組である。確率が0の候補も許す。

[SM3の有限分布のGibbsエントロピー](../../../物理系/SM/SM3/index.md#def-sm3-gibbs-entropy)は自然対数の有限和に基づく。今回は物理的なBoltzmann定数を掛けず、無次元の分布エントロピーを

$$
H_{\mathrm e}(q)=-\sum_{\theta:q(\theta)>0}q(\theta)\log q(\theta)
$$

と書く。$\log$ は自然対数であり、$0\log0=0$ と約束している。$H_{\mathrm e}(q)\ge0$ は、正の確率が高々1なので各 $-\log q(\theta)$ が非負であることから分かる。[INFO1のShannonエントロピー](../../INFO/INFO1/index.md#def-info1-entropy)は底2の対数で測るので、両者は $H_{\mathrm e}(q)=(\log2)H_2(q)$ の関係にある。

平均損失を小さくしたい一方、候補を一つに決め打ちせず分布の広がりも評価したい。そこで**平均損失から尺度倍のエントロピーを引く**。

<a id="def-pml1-03-free-energy-objective"></a>

<!-- formal-statement-start -->
> **定義（有限候補の自由エネルギー型目的関数）**  
> 非空有限集合 $\Theta$、有限実数値損失 $L:\Theta\to\mathbb R$、$L$ と同じ単位の $\tau>0$ を固定する。$\Theta$ 上のすべての確率分布 $q$ に対し

$$
\mathcal J_\tau(q)
=\sum_{\theta\in\Theta}q(\theta)L(\theta)
+\tau\sum_{\theta:q(\theta)>0}q(\theta)\log q(\theta)
=\mathbb E_q[L]-\tau H_{\mathrm e}(q)
$$

> と定める。これを有限候補の**自由エネルギー型目的関数**という。$\tau$ はここでは学習の選択尺度であり、物理的温度とは限らない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-03-free-energy-objective -->
**定義の確認**（二候補）。$\Theta=\{a,b\}$、$L(a)=0$、$L(b)=\log3$、$\tau=1$（損失は無次元）とする。確率分布 $q=(1/2,1/2)$ は両成分が非負で和が1。各項は有限であり、

$$
\mathbb E_q[L]=\frac12\log3,\qquad
H_{\mathrm e}(q)=-2\cdot\frac12\log\frac12=\log2,
$$

$$
\mathcal J_1(q)=\frac12\log3-\log2
=\log\frac{\sqrt3}{2}<0.
$$

一方 $q=(1,0)$ も確率分布である。零確率の項を0として $H_{\mathrm e}(q)=0$、$\mathcal J_1(q)=0$。後で見るように、**損失だけを最小化する分布が、この新しい目的関数まで最小化するとは限らない**。
<!-- definition-example-end -->

$L$ が物理エネルギーで $\tau=k_{\mathrm B}T$ の場合には、[SM3のHelmholtz自由エネルギー](../../../物理系/SM/SM3/index.md#def-sm3-free-energy)と比較できる。一方、単に訓練損失を用いるなら、$\mathcal J_\tau$ は設計した正則化目的である。どちらの場合も $\tau$ と $L$ の単位が一致するため、第二項は第一項と足し合わせられる。

## 3. Gibbs分布からのKLが最適値との差になる

[INFO2の相対エントロピー](../../INFO/INFO2/index.md#def-info2-relative-entropy)は底2で定義され、$D_2(q\|p)$ はビット単位である。以下の計算では自然対数の方が指数 $e^{-L/\tau}$ と直接対応するため、

$$
D_{\mathrm e}(q\|p)
=\sum_{\theta:q(\theta)>0}q(\theta)\log\frac{q(\theta)}{p(\theta)}
=(\log2)D_2(q\|p)
$$

と換算して書く。分母の $p(\theta)$ が全候補で正であれば、任意の $q$ に対して有限の値になる。これは別の概念ではなく、**対数の底だけを変えた同じ相対エントロピー**である。

前講の分布を、今回の $L$ と $\tau$ を用いて

$$
Z_\tau=\sum_{\theta\in\Theta}e^{-L(\theta)/\tau},
\qquad
p_\tau(\theta)=\frac{e^{-L(\theta)/\tau}}{Z_\tau}
$$

と書く。[前講の規格化](../PML1-02/index.md#def-pml1-02-finite-loss-gibbs)により $Z_\tau>0$、各 $p_\tau(\theta)>0$、$\sum_\theta p_\tau(\theta)=1$ である。

<a id="prop-pml1-03-kl-gap"></a>

<!-- formal-statement-start -->
> **命題（学習候補の自由エネルギーとKL余剰）**  
> 非空有限 $\Theta$、有限実数値 $L:\Theta\to\mathbb R$、$\tau>0$ を固定し、$p_\tau(\theta)=e^{-L(\theta)/\tau}/Z_\tau$ とする。任意の $\Theta$ 上の確率分布 $q$ に対し

$$
\mathcal J_\tau(q)
=-\tau\log Z_\tau+\tau D_{\mathrm e}(q\|p_\tau)
\ge-\tau\log Z_\tau
$$

> が成立する。等号は $q=p_\tau$ のとき、かつそのときに限る。したがって $p_\tau$ が $\mathcal J_\tau$ を**唯一**最小化し、最小値は $-\tau\log Z_\tau$ である。
<!-- formal-statement-end -->

### 証明の見取り図

分布の対数 $\log p_\tau(\theta)$ を取ると、損失と分配関数の対数に分かれる。これをKLに代入して平均損失の項を取り出す。最後の非負性と一意性には、台の条件を確認した上で[INFO2のGibbs不等式](../../INFO/INFO2/index.md#thm-info2-gibbs)を使う。

<!-- proof-start -->
### 証明

$\Theta$ は非空有限で $L(\theta)$ は有限、$\tau>0$ なので $Z_\tau$ と $p_\tau(\theta)$ はすべて正で有限である。任意の $q$ の正確率の候補について対数を取れる。

$$
\log p_\tau(\theta)
=-\frac{L(\theta)}{\tau}-\log Z_\tau.
$$

この式を $D_{\mathrm e}(q\|p_\tau)$ の分母へ代入すると、

$$
\begin{aligned}
D_{\mathrm e}(q\|p_\tau)
&=\sum_{q(\theta)>0}q(\theta)
  \bigl(\log q(\theta)-\log p_\tau(\theta)\bigr)\\
&=\sum_{q(\theta)>0}q(\theta)\log q(\theta)
 +\frac1\tau\sum_{q(\theta)>0}q(\theta)L(\theta)
 +\log Z_\tau\sum_{q(\theta)>0}q(\theta)\\
&=-H_{\mathrm e}(q)+\frac{\mathbb E_q[L]}{\tau}+\log Z_\tau.
\end{aligned}
$$

二行目の最後の和は1であり、零確率の候補は平均損失にも寄与しない。両辺に $\tau$ を掛ければ

$$
\tau D_{\mathrm e}(q\|p_\tau)
=-\tau H_{\mathrm e}(q)+\mathbb E_q[L]+\tau\log Z_\tau
=\mathcal J_\tau(q)+\tau\log Z_\tau.
$$

整理して主張の恒等式を得る。

ここで $p_\tau$ の台は $\Theta$ 全体である。従ってINFO2の[相対エントロピーの定義](../../INFO/INFO2/index.md#def-info2-relative-entropy)で要求される台の包含は、**零成分を持つ $q$ に対しても成立**する。

[INFO2のGibbs不等式と等号条件](../../INFO/INFO2/index.md#thm-info2-gibbs)より $D_2(q\|p_\tau)\ge0$、等号は $q=p_\tau$ に限られる。$\log2>0$ かつ $\tau>0$ なので、同じ性質が $\tau D_{\mathrm e}$ に移り、唯一の最小化分布も確定する。
<!-- proof-end -->

### 二候補で「どれくらい悪いか」を数値化する

前節の $L=(0,\log3)$ と $\tau=1$ なら、[前講のGibbs確率](../PML1-02/index.md#def-pml1-02-finite-loss-gibbs)は $p=(3/4,1/4)$、$Z=4/3$。よって

$$
\mathcal J_1(p)=-\log\frac43.
$$

一様分布 $q=(1/2,1/2)$ に対しては、

$$
\begin{aligned}
D_{\mathrm e}(q\|p)
&=\frac12\log\frac{1/2}{3/4}
 +\frac12\log\frac{1/2}{1/4}\\
&=\frac12\log\frac23+\frac12\log2
=\frac12\log\frac43.
\end{aligned}
$$

したがって $\mathcal J_1(q)-\mathcal J_1(p)=\frac12\log(4/3)>0$ となる。前節の $\mathcal J_1(q)=\frac12\log3-\log2$ から直接引いても同じである。

最小損失だけを選ぶ $q_0=(1,0)$ では

$$
D_{\mathrm e}(q_0\|p)
=\log\frac1{3/4}=\log\frac43,\qquad
\mathcal J_1(q_0)-\mathcal J_1(p)=\log\frac43.
$$

**KLの向きが重要**である。ここで計算したのは $D_{\mathrm e}(q\|p_\tau)$ であり、一般に $D_{\mathrm e}(p_\tau\|q)$ ではない。例えば $q_0(b)=0$ なのに $p_\tau(b)>0$ だから、後者は[INFO2の台の条件](../../INFO/INFO2/index.md#def-info2-relative-entropy)により無限大となる。

## 4. 尺度を零に近づけると何が最小になるか

$\tau>0$ の最小化分布 $p_\tau$ は、すべての候補に正の確率を持つ。他方、$\tau=0$ を形式的にエントロピー係数へ代入すると、目的は平均損失 $\mathbb E_q[L]$ の最小化に変わり、最小損失の候補にだけ確率を置けばよい。両者の関係を**極限として**調べよう。$p_\tau$ の式へ最初から $\tau=0$ を代入することはできない。

<a id="prop-pml1-03-zero-temperature"></a>

<!-- formal-statement-start -->
> **命題（有限候補の零尺度極限と同点候補）**  
> 非空有限 $\Theta$、有限な実数値 $L:\Theta\to\mathbb R$ を固定する。$L_*=\min_\theta L(\theta)$、$M=\{\theta:L(\theta)=L_*\}$、$m=|M|\ge1$、$N=|\Theta|$ とする。各 $\tau>0$ のGibbs分布 $p_\tau$ と自由エネルギー最小値 $F_\tau=-\tau\log Z_\tau$ について、

$$
L_*-\tau\log N\le F_\tau\le L_*-\tau\log m\le L_*,
\qquad
\lim_{\tau\downarrow0}F_\tau=L_*
$$

> が成立する。また

$$
\lim_{\tau\downarrow0}p_\tau(\theta)
=\begin{cases}1/m&(\theta\in M),\\0&(\theta\notin M).\end{cases}
$$

> $\tau=0$ における平均損失 $\mathbb E_q[L]$ の最小化分布は、$M$ 上に全確率を置く任意の分布である。$m>1$ の場合には一意ではない。
<!-- formal-statement-end -->

### 証明の見取り図

最小損失を指数の外へ取り出すと、分配関数に残る $m$ 個の項は1、その他は0と1の間にある。有限和を上下から挟むと $F_\tau$ の極限が出る。確率の分子も同じ変形で候補ごとに極限を取れる。

<!-- proof-start -->
### 証明

全候補で $\Delta_\theta=L(\theta)-L_*\ge0$ とおく。$\theta\in M$ なら $\Delta_\theta=0$、その他は厳密に正である。よって

$$
\begin{aligned}
Z_\tau
&=\sum_\theta e^{-(L_*+\Delta_\theta)/\tau}\\
&=e^{-L_*/\tau}
  \left(m+\sum_{\theta\notin M}e^{-\Delta_\theta/\tau}\right).
\end{aligned}
$$

括弧内を $B_\tau$ とすると、各残余項は $0<e^{-\Delta_\theta/\tau}<1$ なので $m\le B_\tau\le N$。したがって

$$
F_\tau
=-\tau\log Z_\tau
=L_*-\tau\log B_\tau.
$$

自然対数は増加関数なので $0\le\log m\le\log B_\tau\le\log N$。これに $-\tau$（負）を掛けて不等号を反転すれば指定した上下界になる。$N$ は固定された有限整数だから $\tau\log N\to0$ となり、挟み撃ちで $F_\tau\to L_*$。

さらに

$$
p_\tau(\theta)=\frac{e^{-\Delta_\theta/\tau}}{B_\tau}.
$$

$\theta\notin M$ の各 $\Delta_\theta>0$ は固定なので、$\tau\downarrow0$ でその指数は0へ近づく。有限個の項しかないため $B_\tau\to m>0$。従って最小候補の分子は1、その他は0となり、確率の極限が示される。

最後に任意の確率分布について

$$
\mathbb E_q[L]-L_*
=\sum_{\theta\in\Theta}q(\theta)\bigl(L(\theta)-L_*\bigr)
=\sum_{\theta\notin M}q(\theta)\Delta_\theta\ge0.
$$

各 $\Delta_\theta>0$ なので、等号はすべての $\theta\notin M$ で $q(\theta)=0$ のときに限る。$M$ 上では任意に確率を分配してよい。ゆえに $m>1$ では零尺度の最適化は一意でない。
<!-- proof-end -->

**同点が二つある例**。$L(a)=L(b)=0$、$L(c)=\Delta>0$ とすると、

$$
p_\tau=\left(\frac1{2+r},\frac1{2+r},\frac r{2+r}\right),
\qquad r=e^{-\Delta/\tau},
\qquad F_\tau=-\tau\log(2+r).
$$

極限は $(1/2,1/2,0)$ である。しかし零尺度の平均損失だけなら $(1,0,0)$ も $(1/3,2/3,0)$ も最適である。**正の尺度から近づけたGibbs分布は、同点候補の間で一様分布を選ぶ**という追加の性質を持つ。

この例はKLの極限にも注意を促す。$p_\tau(c)>0$ でも、極限分布では $p_0(c)=0$ になる。$q(c)>0$ の分布に対し $D_{\mathrm e}(q\|p_0)=+\infty$ である一方、$\tau D_{\mathrm e}(q\|p_\tau)$ は有限の損失差に収束し得る。**先に $\tau=0$ の分布をKLの分母へ入れてはならない**。

## 5. KLの基準を一様分布以外にするとどうなるか

これまでは候補を区別する事前の重みを置かなかった。学習では、候補の事前の選ばれやすさを基準分布 $r$ として持ち、そこから大きく離れることを罰したい場合もある。単なる $-\tau H_{\mathrm e}(q)$ の代わりに、**基準分布からのKL**を正則化項に用いる。

ここでは $r(\theta)>0$ が全候補で成り立ち、$\sum_\theta r(\theta)=1$ とする。全成分を正と仮定する理由は、任意の候補分布 $q$ について $D_{\mathrm e}(q\|r)$ を有限にするためである。[INFO2の台の条件](../../INFO/INFO2/index.md#def-info2-relative-entropy)を欠かせない。

<a id="def-pml1-03-prior-regularized-objective"></a>

<!-- formal-statement-start -->
> **定義（基準分布付きKL正則化目的）**  
> 非空有限 $\Theta$、有限実数値 $L$、$\tau>0$、全候補で正の確率を持つ基準分布 $r$ を固定する。任意の候補分布 $q$ に対し

$$
\mathcal J_{\tau,r}(q)
=\sum_\theta q(\theta)L(\theta)
+\tau D_{\mathrm e}(q\|r)
$$

> と定める。$D_{\mathrm e}$ は自然対数の相対エントロピーである。$\tau$ は $L$ と同じ単位を持つ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-03-prior-regularized-objective -->
**定義の確認**。$\Theta=\{a,b\}$、$r=(3/4,1/4)$、$L=(0,\tau\log3)$ とする。$r$ の各成分は正で和が1、$L$ は有限、$\tau>0$。$q=r$ も確率分布なので $D_{\mathrm e}(r\|r)=0$、従って

$$
\mathcal J_{\tau,r}(r)
=\frac34\cdot0+\frac14\,\tau\log3
=\frac{\tau}{4}\log3.
$$

確率の台、尺度、零KLという定義の各条件を実際に確認した。
<!-- definition-example-end -->

<a id="prop-pml1-03-prior-tilt"></a>

<!-- formal-statement-start -->
> **命題（基準分布を傾けた最適分布）**  
> 前定義と同じ非空有限 $\Theta$、有限 $L$、$\tau>0$、全成分が正の基準分布 $r$ に対し、

$$
Z_{\tau,r}=\sum_{\theta\in\Theta}r(\theta)e^{-L(\theta)/\tau},
\qquad
p_{\tau,r}(\theta)=\frac{r(\theta)e^{-L(\theta)/\tau}}{Z_{\tau,r}}
$$

> とおく。任意の確率分布 $q$ について

$$
\mathcal J_{\tau,r}(q)
=-\tau\log Z_{\tau,r}
+\tau D_{\mathrm e}(q\|p_{\tau,r})
$$

> であり、唯一の最小化分布は $p_{\tau,r}$、最小値は $-\tau\log Z_{\tau,r}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

損失だけでなく基準分布の対数を最適分布の対数へまとめる。これは前節の[KL余剰の計算法](#prop-pml1-03-kl-gap)と同じ代数だが、正則化項が**エントロピーではなく基準分布からの距離**である点に注意する。

<!-- proof-start -->
### 証明

全候補で $r(\theta)>0$、$e^{-L(\theta)/\tau}>0$ だから $Z_{\tau,r}>0$、$p_{\tau,r}(\theta)>0$。分子を和で割ったので $\sum_\theta p_{\tau,r}(\theta)=1$ でもある。正確率の候補について

$$
\log p_{\tau,r}(\theta)
=\log r(\theta)-\frac{L(\theta)}{\tau}-\log Z_{\tau,r}.
$$

よって

$$
\begin{aligned}
D_{\mathrm e}(q\|p_{\tau,r})
&=\sum_{q(\theta)>0}q(\theta)
\left(\log q(\theta)-\log r(\theta)
+\frac{L(\theta)}{\tau}+\log Z_{\tau,r}\right)\\
&=D_{\mathrm e}(q\|r)
+\frac{\mathbb E_q[L]}{\tau}+\log Z_{\tau,r}.
\end{aligned}
$$

ここでも $\sum_{q(\theta)>0}q(\theta)=1$。$\tau$ を掛け、[KL正則化目的の定義](#def-pml1-03-prior-regularized-objective)を代入すれば主張の恒等式となる。$p_{\tau,r}$ は全候補で正なので台の条件が成立し、[INFO2のGibbs不等式](../../INFO/INFO2/index.md#thm-info2-gibbs)によって差は非負、等号は $q=p_{\tau,r}$ に限られる。
<!-- proof-end -->

**基準分布が選択を変える例**。定義例の $r=(3/4,1/4)$、$L=(0,\tau\log3)$ では指数重みは $1,1/3$ なので、

$$
Z_{\tau,r}=\frac34+\frac1{12}=\frac56,\qquad
p_{\tau,r}=\left(\frac9{10},\frac1{10}\right).
$$

基準分布を入れないと同じ損失のGibbs分布は $(3/4,1/4)$ だった。これらの分布が違うのは、正則化の**基準**が異なるからであり、どちらかの算術が間違っているわけではない。

$r$ が一様分布 $r(\theta)=1/N$ の場合は $Z_{\tau,r}=Z_\tau/N$、$p_{\tau,r}=p_\tau$ となる。しかし目的関数の値は

$$
D_{\mathrm e}(q\|r)=-H_{\mathrm e}(q)+\log N,\qquad
\mathcal J_{\tau,r}(q)=\mathcal J_\tau(q)+\tau\log N
$$

だけ異なる。**最小化分布が同じでも、目的関数の数値の原点は違う**。

## 6. 結論：何が物理学と共通で、何がまだ言えないか

有限候補・有限損失・正の尺度の下では、Gibbs分布が唯一の自由エネルギー型最小化分布であることを、KLの非負性と等号条件から説明できた。平均損失だけでは最小候補への集中が可能だが、正の尺度は分布の広がりとの釣合いを選ぶ。零尺度極限では最小候補の集合に集中するものの、同点候補間の分配には注意が要る。

ただし、これらは**分布を変数とする有限次元最小化の主張**である。最適化アルゴリズムが必ず $p_\tau$ を出力する、物理的な熱平衡が成立する、訓練データの未知分布まで正しく推測できる、といった主張ではない。次講では、エネルギーベース学習でデータへの当てはまりをどう測るかを定義し、そのパラメータ微分に現れる正相・負相を、この区別の下で計算する。

## 演習

### PML1-03-A01 零成分と分布エントロピー
- Level: A
- 目安時間: 10分

$\Theta=\{a,b\}$、$q=(1,0)$ と $u=(1/2,1/2)$ について、$H_{\mathrm e}$ をそれぞれ求めよ。$0\log0$ の約束を明記せよ。

<!-- solution-start -->
#### 詳細解答

[有限分布のエントロピー](../../../物理系/SM/SM3/index.md#def-sm3-gibbs-entropy)の無次元版を用いる。$q$ では正の確率を持つのは $a$ のみなので、$H_{\mathrm e}(q)=-1\log1=0$。$b$ の $0\log0$ は0と定め、$\log0$ を単独で評価しない。一様分布では

$$
H_{\mathrm e}(u)=-\frac12\log\frac12-\frac12\log\frac12=\log2.
$$

両方の成分は非負で和が1である。零成分を許すことと、対数の定義域を無視してよいことは別である。
<!-- solution-end -->

### PML1-03-A02 二候補の最適値と決め打ちとの差
- Level: A
- 目安時間: 12分

損失 $L(a)=0$、$L(b)=\tau\log3$、$\tau>0$ の二候補について、$p_\tau$、$F_\tau$、$q=(1,0)$ とした場合の $\mathcal J_\tau(q)-F_\tau$ を求めよ。

<!-- solution-start -->
#### 詳細解答

[有限候補のGibbs選択則](../PML1-02/index.md#def-pml1-02-finite-loss-gibbs)で重みは $1$ と $e^{-\log3}=1/3$、よって $Z=4/3$、$p_\tau=(3/4,1/4)$。最小値の[KL余剰恒等式](#prop-pml1-03-kl-gap)に $q=p_\tau$ を入れると

$$
F_\tau=-\tau\log\frac43.
$$

$q=(1,0)$ は最小損失0に全質量を置くため $\mathbb E_q[L]=0$、$H_{\mathrm e}(q)=0$、$\mathcal J_\tau(q)=0$。従って差は $\tau\log(4/3)>0$。平均損失を最小化しただけでは、正の尺度における自由エネルギーの最小化にはならない。
<!-- solution-end -->

### PML1-03-A03 ビットと自然対数の換算
- Level: A
- 目安時間: 10分

$q=(1,0)$、$p=(3/4,1/4)$ の相対エントロピーを底2と自然対数で計算し、換算式を確認せよ。また $D_{\mathrm e}(p\|q)$ が有限か答えよ。

<!-- solution-start -->
#### 詳細解答

$0$ の成分を除いて、[INFO2の相対エントロピー](../../INFO/INFO2/index.md#def-info2-relative-entropy)から

$$
D_2(q\|p)=\log_2\frac43,\qquad
D_{\mathrm e}(q\|p)=\log\frac43
=(\log2)D_2(q\|p).
$$

逆向きでは $p(b)=1/4>0$ なのに $q(b)=0$ であり、台の包含条件が破れる。従って $D_{\mathrm e}(p\|q)=+\infty$ である。KLは対称な距離ではない。
<!-- solution-end -->

### PML1-03-A04 同点候補と零尺度
- Level: A
- 目安時間: 12分

$\Theta=\{a,b,c\}$、$L(a)=L(b)=0$、$L(c)=\Delta>0$ とする。$p_\tau$ と $F_\tau$ を求め、$\tau\downarrow0$ の極限を計算せよ。

<!-- solution-start -->
#### 詳細解答

$r_\tau=e^{-\Delta/\tau}$ とすると指数重みは $1,1,r_\tau$、分配関数は $Z_\tau=2+r_\tau$。従って

$$
p_\tau=\left(\frac1{2+r_\tau},\frac1{2+r_\tau},
\frac{r_\tau}{2+r_\tau}\right),\qquad
F_\tau=-\tau\log(2+r_\tau).
$$

$\Delta>0$ を固定して $\tau\downarrow0$ とすると $r_\tau\to0$。ゆえに $p_\tau\to(1/2,1/2,0)$。さらに $2<2+r_\tau<3$ なので $-\tau\log3<F_\tau<-\tau\log2$。両端が0へ近づき $F_\tau\to0=L_*$。[零尺度極限の命題](#prop-pml1-03-zero-temperature)とも一致する。
<!-- solution-end -->

### PML1-03-B01 二状態の直接微分による変分計算
- Level: B
- 目安時間: 20分

$L(a)=0$、$L(b)=\Delta>0$、$\tau>0$ とする。$q_t=(t,1-t)$、$0<t<1$ について $\mathcal J_\tau(q_t)$ を書き、微分で最小化する $t$ を求めよ。端点 $t=0,1$ では最小にならないことも説明せよ。

<!-- solution-start -->
#### 詳細解答

$t$ は候補 $a$ に割り当てる確率で、時刻ではない。$t$ に関する一変数関数 $f(t):=\mathcal J_\tau(q_t)$ を考える。[有限候補の自由エネルギー型目的関数](#def-pml1-03-free-energy-objective)から

$
f(t)=\mathcal J_\tau(q_t)
=(1-t)\Delta+\tau\bigl(t\log t+(1-t)\log(1-t)\bigr).
$$

$0<t<1$ で各対数を微分できる。$d(t\log t)/dt=\log t+1$、$d((1-t)\log(1-t))/dt=-\log(1-t)-1$ なので

$$
f'(t)=-\Delta+\tau\log\frac t{1-t},
\qquad
f''(t)=\tau\left(\frac1t+\frac1{1-t}\right)>0.
$$

一階微分0の条件は $t/(1-t)=e^{\Delta/\tau}$、従って

$$
t_*=\frac{e^{\Delta/\tau}}{1+e^{\Delta/\tau}}
=\frac1{1+e^{-\Delta/\tau}}\in(0,1).
$$

二階微分が正なので内部の唯一の極小点である。また $f'(t)\to-\infty$（$t\downarrow0$）かつ $f'(t)\to+\infty$（$t\uparrow1$）。目的関数は $0\log0=0$ の規約で両端へ連続に延長されるから、両端では内部へ動くと値が下がる。従って全区間で唯一の最小点は $t_*$ であり、[学習候補の自由エネルギーとKL余剰](#prop-pml1-03-kl-gap)のGibbs分布に一致する。
<!-- solution-end -->

### PML1-03-B02 KLの極限は置換できない
- Level: B
- 目安時間: 20分

$L(a)=0$、$L(b)=\Delta>0$ を固定し、$q=(1/2,1/2)$、$p_\tau$ をGibbs分布とする。$\tau D_{\mathrm e}(q\|p_\tau)$ を計算して $\tau\downarrow0$ の極限を求めよ。$D_{\mathrm e}(q\|\lim_{\tau\downarrow0}p_\tau)$ と比較せよ。

<!-- solution-start -->
#### 詳細解答

$r=e^{-\Delta/\tau}$、$p_\tau=(1/(1+r),r/(1+r))$。初めに自由エネルギー側を計算する。$q$ の平均損失は $\Delta/2$、エントロピーは $\log2$ だから

$$
\mathcal J_\tau(q)=\frac{\Delta}{2}-\tau\log2.
$$

分配関数は $1+r$ なので、[学習候補の自由エネルギーとKL余剰](#prop-pml1-03-kl-gap)より

$$
\tau D_{\mathrm e}(q\|p_\tau)
=\mathcal J_\tau(q)+\tau\log(1+r)
=\frac{\Delta}{2}-\tau\log2+\tau\log(1+e^{-\Delta/\tau}).
$$

$\tau\downarrow0$ では $0<e^{-\Delta/\tau}<1$ だから $0<\log(1+e^{-\Delta/\tau})<\log2$。最後の二つの $\tau$ 倍の項は0に収束し、極限は $\Delta/2$。

一方 $p_\tau\to(1,0)$ であり、$q(b)>0$ なのに極限分布の $b$ の確率は0。[相対エントロピーの台の条件](../../INFO/INFO2/index.md#def-info2-relative-entropy)から $D_{\mathrm e}(q\|(1,0))=+\infty$。先に極限分布をKLの分母へ代入する操作と、$\tau$ を掛けたKLの極限を取る操作は一致しない。
<!-- solution-end -->

### PML1-03-B03 基準分布付き正則化の二候補計算
- Level: B
- 目安時間: 20分

$\Theta=\{a,b\}$、$r=(3/4,1/4)$、$L=(0,\tau\log3)$、$\tau>0$ とする。$\mathcal J_{\tau,r}$ の最小分布・最小値を求め、$q=r$ の値が最小値より大きいことをKL余剰で検証せよ。

<!-- solution-start -->
#### 詳細解答

[基準分布を傾けた最適分布の命題](#prop-pml1-03-prior-tilt)に代入する。$r$ は正で規格化されており、指数重みは $1,1/3$。よって

$$
Z_{\tau,r}=\frac34+\frac14\cdot\frac13=\frac56,\qquad
p_{\tau,r}=\left(\frac{3/4}{5/6},\frac{1/12}{5/6}\right)
=\left(\frac9{10},\frac1{10}\right).
$$

最小値は $-\tau\log(5/6)=\tau\log(6/5)$。$q=r$ なら $D_{\mathrm e}(r\|r)=0$ なので $\mathcal J_{\tau,r}(r)=\frac{\tau\log3}{4}$ である。差を確かめるため、

$$
\begin{aligned}
D_{\mathrm e}(r\|p_{\tau,r})
&=\frac34\log\frac{3/4}{9/10}
 +\frac14\log\frac{1/4}{1/10}\\
&=\frac34\log\frac56+\frac14\log\frac52\\
&=\frac14\log3+\log\frac56>0.
\end{aligned}
$$

最後の正値性は二つの分布が異なることと[INFO2のGibbs不等式](../../INFO/INFO2/index.md#thm-info2-gibbs)から従う。$\tau$ 倍は $\tau(\log3)/4-\tau\log(6/5)$ に一致する。
<!-- solution-end -->

### PML1-03-B04 損失の一様な誤差が最小値へ与える影響
- Level: B
- 目安時間: 20分

非空有限 $\Theta$、$\tau>0$ とし、有限損失 $L,L'$ が全候補で $|L'(\theta)-L(\theta)|\le\varepsilon$（$\varepsilon\ge0$、損失と同じ単位）を満たすとする。分配関数 $Z,Z'$ と最小値 $F=-\tau\log Z$、$F'=-\tau\log Z'$ について $|F'-F|\le\varepsilon$ を示せ。二分布が同じと結論できるかも述べよ。

<!-- solution-start -->
#### 詳細解答

各 $\theta$ で $L(\theta)-\varepsilon\le L'(\theta)\le L(\theta)+\varepsilon$。$\tau>0$ なので $x\mapsto e^{-x/\tau}$ は減少し、

$$
e^{-\varepsilon/\tau}e^{-L(\theta)/\tau}
\le e^{-L'(\theta)/\tau}
\le e^{\varepsilon/\tau}e^{-L(\theta)/\tau}.
$$

有限和を取って $e^{-\varepsilon/\tau}Z\le Z'\le e^{\varepsilon/\tau}Z$。両辺は正であり自然対数を取れるから

$$
-\frac{\varepsilon}{\tau}+\log Z
\le\log Z'\le
\frac{\varepsilon}{\tau}+\log Z.
$$

$-\tau<0$ を掛けて向きを反転させると $F-\varepsilon\le F'\le F+\varepsilon$。従って $|F'-F|\le\varepsilon$。

ただし分布が同じとは限らない。二候補で $L=(0,0)$、$L'=(0,\varepsilon)$、$\varepsilon>0$ とすれば、前者は一様だが後者のGibbs分布では第二候補の確率が $1/(1+e^{\varepsilon/\tau})<1/2$ である。最小値の近さと分布の一致は別の主張である。
<!-- solution-end -->

### PML1-03-C01 同点候補と非一様な基準分布をつなぐ
- Level: C
- 目安時間: 35分

$\Theta=\{a,b,c\}$、$L(a)=L(b)=0$、$L(c)=\Delta>0$、基準分布 $r=(1/2,1/4,1/4)$ とする。$\tau>0$ について次を求めよ。

1. $\mathcal J_{\tau,r}$ の最小化分布と最小値。
2. $\tau\downarrow0$ での分布極限。
3. 基準分布を入れないGibbs分布の零尺度極限との差。

さらに $q=(1/2,1/2,0)$ を固定し、目的関数の最小値との差を直接計算して、KL恒等式と一致することを確認せよ。

<!-- solution-start -->
#### 詳細解答

まず $r$ は全成分正で和が1、損失は有限、$\tau>0$ であり、[基準分布付きKL正則化の命題](#prop-pml1-03-prior-tilt)の仮定が成立する。$u=e^{-\Delta/\tau}\in(0,1)$ とおけば、候補ごとの重みは $1/2,1/4,u/4$ である。従って

$$
Z_{\tau,r}=\frac{3+u}{4},\qquad
p_{\tau,r}
=\left(\frac2{3+u},\frac1{3+u},\frac{u}{3+u}\right),
\qquad
\min_q\mathcal J_{\tau,r}(q)
=-\tau\log\frac{3+u}{4}.
$$

$\Delta>0$ を固定して $\tau\downarrow0$ とすると $u\to0$。従って分布極限は $(2/3,1/3,0)$ であり、最小値は0に近づく。一方、基準分布を入れない場合の指数重みは $(1,1,u)$、規格化後は $(1/(2+u),1/(2+u),u/(2+u))$、極限は $(1/2,1/2,0)$ である。**同点候補間の比は一様基準なら1対1、今回の基準では2対1**となる。

固定した $q=(1/2,1/2,0)$ は確率分布で、損失の平均は0である。零確率項を除いて

$$
D_{\mathrm e}(q\|r)
=\frac12\log\frac{1/2}{1/2}
 +\frac12\log\frac{1/2}{1/4}
=\frac12\log2.
$$

従って $\mathcal J_{\tau,r}(q)=\tau\log2/2$。最小値を引くと

$$
\mathcal J_{\tau,r}(q)-\min\mathcal J_{\tau,r}
=\tau\left(\frac12\log2+\log\frac{3+u}{4}\right).
$$

これを[基準分布を傾けた最適分布](#prop-pml1-03-prior-tilt)の右辺からも確認する。$p_{\tau,r}(a)=2/(3+u)$、$p_{\tau,r}(b)=1/(3+u)$ だから、

$$
\begin{aligned}
D_{\mathrm e}(q\|p_{\tau,r})
&=\frac12\log\frac{1/2}{2/(3+u)}
 +\frac12\log\frac{1/2}{1/(3+u)}\\
&=\frac12\log\frac{3+u}{4}
 +\frac12\log\frac{3+u}{2}\\
&=\log\frac{3+u}{4}+\frac12\log2.
\end{aligned}
$$

$\tau$ 倍は直接計算の余剰と一致する。$\tau\to0$ ではこのKLは $\log(3/4)+\frac12\log2=\frac12\log(9/8)>0$ に収束するが、目的関数の差はその $\tau$ 倍なので0へ近づく。これは「零尺度の平均損失ではどちらの最小候補への配分も最適」という事実と矛盾しない。
<!-- solution-end -->
