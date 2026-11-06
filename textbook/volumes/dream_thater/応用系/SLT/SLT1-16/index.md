# SLT1-16 Le Cam・Fanoと標本複雑度下限

<!-- definition-example-audit: strict -->

これまでの[有限クラスのERM上界](../SLT1-04/index.md#cor-slt1-04-finite-erm)は、「これだけ標本があれば学べる」という**標本数の保証**を与えた。しかし、その標本数は算法を工夫すれば大幅に減らせるかもしれない。「どんな算法でも、これ以下の標本数では難しい」と示すには、別の論証が要る。

最小の例は、一点だけの入力に対してラベル $+1$ がわずかに多い世界と、ラベル $-1$ がわずかに多い世界を見分ける問題である。二つの世界で正しい予測器は逆だが、偏りが小さければ短い標本列はよく似ている。この「**正しい予測には世界の識別が必要だが、観測からは識別しにくい**」という構図を、二仮説では Le Cam の方法、多仮説では Fano の方法にする。

本章では有限集合上の分布、独立同分布標本、0–1分類に限定する。最初に二仮説の検定誤りを分布の確率差で測り、次にKLと情報量で多仮説へ拡張し、最終的に $d$ 個の入力点を自由にラベル付けできるクラスの下界と上界を比較する。

## 1. 下界では「どの算法にも」を先に固定する

分類器の集合を $\mathcal H$、データ分布の有限族を $\mathcal P$ とする。標本 $S=(Z_1,\ldots,Z_n)\sim P^n$ から予測器を返す算法 $A_n$ は、標本と独立な乱数 $U$ を使ってもよい。各候補の[母集団リスク](../../ML/ML1-01/index.md#def-ml1-01-risks)を $R_P(h)$ と書き、ここでは $\mathcal H$ が有限なのでクラス内最小値は達成される。

上界は一つの算法を構成すればよい。下界は、**算法を任意に選んだ後でも、それが苦手とする分布が存在する**と証明する。この量化順序を表すのが最悪分布に対する最小可能リスク、すなわち minimax の考え方である。

<a id="def-slt1-16-minimax"></a>

<!-- formal-statement-start -->
> **定義（有限模型のminimax期待超過リスク）**  
> 非空有限仮説クラス $\mathcal H$ と非空有限分布族 $\mathcal P$ を固定し、$n\ge1$ とする。各 $P\in\mathcal P$ に対し $S\sim P^n$ とし、$A_n(S,U)\in\mathcal H$ は標本と独立な算法乱数 $U$ を許す任意の算法とする。**minimax期待超過リスク**を

$$
\mathfrak R_n(\mathcal P,\mathcal H)
=\inf_{A_n}\sup_{P\in\mathcal P}
\mathbb E_{S,U}\left[
R_P(A_n(S,U))-\min_{h\in\mathcal H}R_P(h)
\right]
$$

> と定める。$\inf$ は許された全算法にわたる。分布族を難しい小さな部分族へ制限して得た下界も、元の大きな分布族の下界になる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-16-minimax -->
**定義の確認**：入力が一点の二値分類で、$\mathcal H=\{h_+,h_-\}$ を常に $+1$ または $-1$ と答える二つの予測器とする。分布 $P_+$ では $P_+(Y=+1)=1/2+\gamma$、$P_-$ では $P_-(Y=+1)=1/2-\gamma$ とし、$0<\gamma<1/2$ である。0–1損失は $P_+$ の下で

$$
R_{P_+}(h_+)=\frac12-\gamma,\qquad
R_{P_+}(h_-)=\frac12+\gamma.
$$

同じ計算で $P_-$ の最良候補は $h_-$ である。どちらの世界でも誤った符号を出すと超過リスクは $2\gamma$、正しければ0となる。算法が毎回公平な硬貨で予測器を選ぶなら両世界で期待超過リスクは $\gamma$ だから、上の $\inf$ の候補として $\mathfrak R_n\le\gamma$ を確かめられる。真のminimax値を求めるには、これよりうまい全算法にも通じる下界が必要である。
<!-- definition-example-end -->

## 2. 二つの分布を見分ける限界

分布 $Q_0,Q_1$ が有限標本空間 $\Omega$ 上にあるとし、観測 $\omega$ から「0の世界」か「1の世界」かを答える検定 $\psi(\omega)\in\{0,1\}$ を考える。両分布で確率が近い集合しかなければ、いずれかの世界で誤答を避けられない。集合ごとの最大の確率差を**TV距離**として測る。

<a id="def-slt1-16-tv"></a>

<!-- formal-statement-start -->
> **定義（有限標本空間でのTV距離）**  
> 同じ有限集合 $\Omega$ 上の確率分布 $Q_0,Q_1$ に対し

$$
\operatorname{TV}(Q_0,Q_1)
=\sup_{B\subseteq\Omega}|Q_0(B)-Q_1(B)|
=\frac12\sum_{\omega\in\Omega}|Q_0(\omega)-Q_1(\omega)|
$$

> をTV距離（total variation distance）という。値域は $[0,1]$ である。
<!-- formal-statement-end -->

二つの表示が等しい理由は、差 $a_\omega=Q_0(\omega)-Q_1(\omega)$ の総和が0であり、正の項の和が正の差を最大にするためである。その正の項の和は $\sum|a_\omega|/2$ に等しい。

<!-- definition-example-start: def-slt1-16-tv -->
**定義の確認**：$\Omega=\{a,b\}$、$Q_0=(0.7,0.3)$、$Q_1=(0.3,0.7)$ なら差は $(0.4,-0.4)$ だから

$$
\operatorname{TV}(Q_0,Q_1)=\frac12(0.4+0.4)=0.4.
$$

実際、$B=\{a\}$ で $|Q_0(B)-Q_1(B)|=0.4$ に達し、他の3つの部分集合では差は0または0.4である。これは単なる記号上の距離ではなく、検定できる限界を表す。
<!-- definition-example-end -->

<a id="lem-slt1-16-le-cam"></a>

<!-- formal-statement-start -->
> **補題（二仮説検定のLe Cam下界）**  
> 有限集合 $\Omega$ 上の二分布 $Q_0,Q_1$ と、観測から $0$ または $1$ を出す任意の決定的または独立乱択検定 $\psi$ に対し

$$
\frac{Q_0(\psi=1)+Q_1(\psi=0)}2
\ge\frac{1-\operatorname{TV}(Q_0,Q_1)}2.
$$

> 左辺は二つの世界を事前確率 $1/2$ ずつで選んだ場合の平均誤りである。決定的検定なら右辺に等号を達成できる。
<!-- formal-statement-end -->

### 証明の見取り図

各観測値で、二分布のうち確率が大きい方を答えるのが最善である。それでも小さい方の確率は誤りとして残る。この「重なる質量」を足すと $1-\operatorname{TV}$ になる。

<!-- proof-start -->
### 証明

まず決定的検定について $B=\{\omega:\psi(\omega)=0\}$ と置く。すると

$$
\begin{aligned}
Q_0(\psi=1)+Q_1(\psi=0)
&=Q_0(B^c)+Q_1(B)\\
&=1-\{Q_0(B)-Q_1(B)\}\\
&\ge1-\operatorname{TV}(Q_0,Q_1).
\end{aligned}
$$

$B=\{\omega:Q_0(\omega)\ge Q_1(\omega)\}$ と選ぶと波括弧内がTV距離に等しくなり、等号となる。乱択検定では、観測値 $\omega$ で0を出す確率を $t(\omega)\in[0,1]$ と書く。誤り確率の和は

$$
\sum_\omega\bigl[
Q_0(\omega)(1-t(\omega))+Q_1(\omega)t(\omega)
\bigr]
\ge\sum_\omega\min\{Q_0(\omega),Q_1(\omega)\}
=1-\operatorname{TV}(Q_0,Q_1).
$$

各項が小さい方の確率以上であることと、$\min(a,b)=(a+b-|a-b|)/2$ を使った。
<!-- proof-end -->

先ほどの $Q_0,Q_1$ では最善の平均誤りは $(1-0.4)/2=0.3$。$a$ なら0、$b$ なら1と答えると両世界で誤りは0.3となり、等号も直接確認できる。

### KLからTV距離へ

標本が独立ならKLは標本数 $n$ 倍になるが、TV距離の積分布を直接計算するのは煩雑である。[相対エントロピーと対数和不等式](../../INFO/INFO2/index.md#lem-info2-log-sum)、[二値KLの絶対差評価](../SLT1-15/index.md#lem-slt1-15-binary-pinsker)を組み合わせて次を得る。以下の $D_{\mathrm{KL}}$ は**自然対数**のKLであり、INFO2のビット単位を $\ln2$ 倍した量である。

<a id="lem-slt1-16-tv-kl"></a>

<!-- formal-statement-start -->
> **補題（有限分布の全変動・KL評価）**  
> 同じ有限集合上の分布 $Q_0,Q_1$ について、自然対数の相対エントロピーを $D_{\mathrm{KL}}(Q_0\|Q_1)$ とすると

$$
\operatorname{TV}(Q_0,Q_1)
\le\sqrt{\frac{D_{\mathrm{KL}}(Q_0\|Q_1)}2}.
$$

> $Q_0$ が $Q_1$ に関して絶対連続でないときは右辺を $+\infty$ と解釈する。
<!-- formal-statement-end -->

### 証明の見取り図

二分布がもっとも違う集合 $B$ だけを覚えて、二値分布に情報を圧縮する。KLは圧縮で増えず、二値KLは確率差の二乗以上である。

<!-- proof-start -->
### 証明

$D_{\mathrm{KL}}=+\infty$ なら結論は直ちに成り立つ。有限の場合、$B=\{\omega:Q_0(\omega)\ge Q_1(\omega)\}$ と置く。$q=Q_0(B)$、$p=Q_1(B)$ と書けば $q-p=\operatorname{TV}(Q_0,Q_1)$ である。[対数和不等式](../../INFO/INFO2/index.md#lem-info2-log-sum)を $B$ 内と $B^c$ 内にそれぞれ適用し、底2から自然対数へ換算すると

$$
\begin{aligned}
D_{\mathrm{KL}}(Q_0\|Q_1)
&\ge q\ln\frac qp+(1-q)\ln\frac{1-q}{1-p}\\
&=\operatorname{kl}(q\|p)
\ge2(q-p)^2\\
&=2\operatorname{TV}(Q_0,Q_1)^2.
\end{aligned}
$$

中間の最後の不等式は[二値KLの評価](../SLT1-15/index.md#lem-slt1-15-binary-pinsker)である。$B$ または補集合の確率が0の境界は、$0\ln(0/x)=0$ の規約と有限KL条件、または片側極限で扱える。非負の平方根を取れば主張を得る。
<!-- proof-end -->

## 3. 二点分類の標本数は平方根の壁を持つ

第1節の二つのBernoulli世界を使う。両世界の分布は全ての符号へ正の確率を置くので、どんな標本列も両方で起こり得る。この共通部分が下界を支える。

<a id="thm-slt1-16-binary-lower"></a>

<!-- formal-statement-start -->
> **定理（二点模型のminimax超過リスク下界）**  
> 入力が一点、ラベルが $\{-1,+1\}$、仮説クラスが二つの定数分類器 $\mathcal H=\{h_-,h_+\}$ である0–1分類を考える。各 $n\ge1$ に対し

$$
\gamma_n=\frac1{8\sqrt n},\qquad
P_\pm(Y=+1)=\frac12\pm\gamma_n
$$

> で定めた独立同分布模型の二分布族 $\mathcal P_n=\{P_-,P_+\}$ に対し、どんな独立乱択算法 $A_n$ でも、少なくとも一方の $P\in\mathcal P_n$ で

$$
\mathbb E_{S,U}\left[
R_P(A_n)-\min_{h\in\mathcal H}R_P(h)
\right]\ge\frac1{16\sqrt n}
$$

> が成立し、さらに

$$
P_{S,U}\left(
R_P(A_n)-\min_hR_P(h)\ge\frac1{4\sqrt n}
\right)>\frac14
$$

> となる（両結論で選ぶ $P$ は同じでよい）。確率と期待値は算法の独立乱数 $U$ についても取る。
<!-- formal-statement-end -->

### 証明の見取り図

学習器の出力を「どちらのBernoulli世界か」という検定に読み替える。逆の符号を選んだ場合だけ、超過リスク $2\gamma_n$ を払う。積分布のKLが小さいので、Le Cam 下界により一定割合の識別誤りが残る。

<!-- proof-start -->
### 証明

$0<\gamma=\gamma_n\le1/8$ とする。$P_+$ から $P_-$ への一観測KLは、二つのBernoulli確率を代入して

$$
\begin{aligned}
D_{\mathrm{KL}}(P_+\|P_-)
&=\left(\frac12+\gamma\right)
\ln\frac{\frac12+\gamma}{\frac12-\gamma}
+\left(\frac12-\gamma\right)
\ln\frac{\frac12-\gamma}{\frac12+\gamma}\\
&=2\gamma\ln\frac{1+2\gamma}{1-2\gamma}.
\end{aligned}
$$

$\ln(1+x)\le x$ を $x=4\gamma/(1-2\gamma)>0$ に用いると

$$
\ln\frac{1+2\gamma}{1-2\gamma}
\le\frac{4\gamma}{1-2\gamma}
\le8\gamma
\quad(0<\gamma\le1/4).
$$

したがって $D_{\mathrm{KL}}(P_+\|P_-)\le16\gamma^2$。独立同分布性と有限和の対数積を使えば

$$
\begin{aligned}
D_{\mathrm{KL}}(P_+^n\|P_-^n)
&=\sum_{i=1}^{n}D_{\mathrm{KL}}(P_+\|P_-)\\
&\le16n\gamma^2=\frac14.
\end{aligned}
$$

[全変動・KL評価](#lem-slt1-16-tv-kl)を**標本空間 $\{-1,+1\}^n$ の二分布**へ適用すると

$$
\operatorname{TV}(P_+^n,P_-^n)
\le\sqrt{\frac{1/4}{2}}=\frac1{\sqrt8}<\frac12.
$$

学習器が $h_+$ を選べば「+」と、$h_-$ なら「−」と検定したことにする。[二仮説検定のLe Cam下界](#lem-slt1-16-le-cam)から、二世界を等確率で選んだときの誤判定確率は $(1-1/\sqrt8)/2>1/4$。ゆえに少なくとも一方の分布で誤判定確率は $1/4$ より大きい。

その分布での超過リスクは、正解なら0、誤答なら $2\gamma=1/(4\sqrt n)$ である。従って期待値は $2\gamma$ に誤答確率を掛けたものだから

$$
\mathbb E[\text{超過リスク}]
>2\gamma\cdot\frac14
=\frac1{16\sqrt n}.
$$

同じ誤答事象で超過リスクは $2\gamma$ に等しいので、確率の結論も従う。
<!-- proof-end -->

これは分布族が $n$ に応じて選ばれる**分布一様の下界**であり、一つの固定分布で全ての標本数に同じ速さの下界を主張していない。

目標精度 $\varepsilon>0$、失敗確率 $\delta\le1/4$ の一様保証を要求し、もし標本数が

$$
n<\frac1{16\varepsilon^2}
$$

なら、$1/(4\sqrt n)>\varepsilon$ となり、二分布族のどちらかで失敗確率が $\delta$ を超える。したがって標本数には少なくとも定数倍の $\varepsilon^{-2}$ が必要である。これは[有限クラスの一般的な上界](../SLT1-04/index.md#cor-slt1-04-finite-erm)の精度依存と一致する。

ただし、[realizableな整合学習界](../SLT1-03/index.md#thm-slt1-03-consistent-fast)の $\varepsilon^{-1}$ と矛盾しない。ここでは両分布とも同じ入力でラベルが確率的に反転するため、リスク0の仮説が存在しないからである。

## 4. 多数の世界を同時に区別する：Fanoとpacking

二世界だけでは「学ぶべき自由度 $d$ が増えたら、なぜ標本数も増えるのか」を十分に表せない。互いに大きく異なる $M$ 個の世界を用意し、そのどれにいるかを推定する問題へ落とす。

情報理論で証明した[Fano不等式](../../INFO/INFO6/index.md#thm-info6-fano)は、そのための道具である。INFO6の対数は底2だが、本章ではKLと揃えて自然対数へ換算する。以下、$V$ は $M$ 個の世界の番号を表す一様な変数、$S$ はその世界からの標本、$\widehat V$ は標本からの推定番号である。

<a id="lem-slt1-16-fano-testing"></a>

<!-- formal-statement-start -->
> **補題（Fanoによる多仮説検定下界）**  
> $M\ge2$、$V$ を $\{1,\ldots,M\}$ 上一様とし、有限集合に値を取る標本 $S$ の条件付き分布を $Q_j$（$V=j$ のとき）とする。独立な算法乱数を許す任意の推定値 $\widehat V(S,U)\in\{1,\ldots,M\}$ に対し、自然対数単位の相互情報量 $I_{\mathrm{nat}}$ を用いると

$$
P(\widehat V\ne V)
\ge1-\frac{I_{\mathrm{nat}}(V;S)+\ln2}{\ln M}.
$$

> さらに、全ての $Q_j$ が互いに絶対連続なら

$$
I_{\mathrm{nat}}(V;S)
\le\frac1{M^2}\sum_{j,k=1}^M D_{\mathrm{KL}}(Q_j\|Q_k).
$$

<!-- formal-statement-end -->

### 証明の見取り図

誤りが少なければ、推定結果を見た後の番号の曖昧さも小さい。一方、標本が運ぶ情報量が小さければ、元の $\ln M$ の曖昧さは減らせない。さらに、全世界どうしのKLを上から抑えれば情報量そのものを評価できる。

<!-- proof-start -->
### 証明

[INFO6のFano不等式](../../INFO/INFO6/index.md#thm-info6-fano)に $J=V$、推定結果 $\widehat J=\widehat V$ を代入し、ビット単位から自然対数へ全項を $\ln2$ 倍すると

$$
H_{\mathrm{nat}}(V|\widehat V)
\le\ln2+P(\widehat V\ne V)\ln M.
$$

標本から（独立乱数を伴って）$\widehat V$ を作るので $V\to S\to\widehat V$ はMarkov連鎖である。[相互情報量のデータ処理不等式](../../INFO/INFO2/index.md#thm-info2-mutual-dpi)より

$$
\begin{aligned}
\ln M-I_{\mathrm{nat}}(V;S)
&=H_{\mathrm{nat}}(V|S)\\
&\le H_{\mathrm{nat}}(V|\widehat V)
\le\ln2+P(\widehat V\ne V)\ln M.
\end{aligned}
$$

ここで $H_{\mathrm{nat}}(V)=\ln M$ は一様性から従う。移項して第一の不等式となる。

第二の不等式を確かめる。$\bar q(s)=M^{-1}\sum_k q_k(s)$ とし、$q_j$ を $Q_j$ の確率関数とする。[相互情報量のKL表示](../../INFO/INFO2/index.md#thm-info2-mutual-kl)を自然対数へ換算すると

$$
I_{\mathrm{nat}}(V;S)
=\frac1M\sum_j\sum_s q_j(s)
\ln\frac{q_j(s)}{\bar q(s)}.
$$

互いに絶対連続な有限分布の共通の正の台上で、$-\ln$ の凸性により

$$
-\ln\left(\frac1M\sum_kq_k(s)\right)
\le\frac1M\sum_k[-\ln q_k(s)].
$$

各 $j,s$ に $q_j(s)$ を掛けて足すと

$$
\begin{aligned}
I_{\mathrm{nat}}(V;S)
&\le\frac1{M^2}\sum_{j,k}\sum_s q_j(s)
\ln\frac{q_j(s)}{q_k(s)}\\
&=\frac1{M^2}\sum_{j,k}D_{\mathrm{KL}}(Q_j\|Q_k).
\end{aligned}
$$

零確率の共通台外の項は0とし、これで証明が閉じる。
<!-- proof-end -->

**数値例**：$M=16$ なら $\ln M=4\ln2$。もし標本が運ぶ情報が $I_{\mathrm{nat}}(V;S)\le\ln2$ に留まれば、どの推定器も

$$
P(\widehat V\ne V)\ge1-\frac{\ln2+\ln2}{4\ln2}=\frac12
$$

の誤りを持つ。Fanoが述べるのは**平均の識別誤り**であり、直ちに全ての世界で半分間違うという結論ではない。

### Hamming距離が大きい世界を多数作る

$d$ 個の入力点を異なる符号でラベル付けする世界を考える。二つの符号列 $\theta,\eta\in\{-1,+1\}^d$ の**Hamming距離** $d_H(\theta,\eta)$ は、異なる座標の個数である。例えば $(+,+,-,-)$ と $(+,-,+,-)$ は第2・第3座標が違うから $d_H=2$ となる。これは符号の何個を誤ったかを直接数える距離である。

<a id="def-slt1-16-hamming"></a>

<!-- formal-statement-start -->
> **定義（符号列のHamming距離とpacking）**  
> $\theta,\eta\in\{-1,+1\}^d$ に対して

$$
d_H(\theta,\eta)=\sum_{i=1}^d\mathbf1_{\{\theta_i\ne\eta_i\}}
$$

> と定める。部分集合 $\Theta\subseteq\{-1,+1\}^d$ の異なる二元の距離が全て $r$ より大きいとき、$\Theta$ をHamming距離 $r$ のpackingという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-16-hamming -->
**定義の確認**：$d=4$ で $\Theta=\{(+,+,+,+),(-,-,-,-)\}$ とすれば両者は4座標全てで異なる。したがって $d_H=4>1$ であり、この集合は半径 $r=1$ のpackingである。ただし2個だけでは、多数の世界を区別する困難さの評価には弱い。$d$ が大きくなるとき、互いに遠い符号列を**指数個**確保したい。
<!-- definition-example-end -->

<a id="lem-slt1-16-packing"></a>

<!-- formal-statement-start -->
> **補題（有限二値立方体の指数的packing）**  
> 整数 $d\ge1$ に対し、$\Theta\subseteq\{-1,+1\}^d$ で

$$
|\Theta|\ge2^{d/8},\qquad
d_H(\theta,\eta)>\frac d4
\quad(\theta\ne\eta,\ \theta,\eta\in\Theta)
$$

> を満たす集合が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

一つの符号列を選ぶごとに、その周囲のHamming球を候補から取り除く。半径 $d/4$ 以下の球の体積が全体の $2^d$ より指数的に小さいので、指数個の中心を選べる。

<!-- proof-start -->
### 証明

$r=\lfloor d/4\rfloor$ とする。まだ残っている符号列を一つ選び、その符号列からHamming距離 $r$ 以下の列を全て取り除く操作を、候補が空になるまで繰り返す。選ばれた中心どうしは $r$ より大きい整数距離、従って $d/4$ より大きい距離を持つ。

半径 $r$ の球の要素数は、中心から変更する $k$ 座標を選ぶ数の和

$$
B(d,r)=\sum_{k=0}^r\binom dk
$$

である。$0\le k\le r\le d/4$ について $3^{-k}\ge3^{-d/4}$ だから

$$
\begin{aligned}
B(d,r)
&\le3^{d/4}\sum_{k=0}^{r}\binom dk3^{-k}\\
&\le3^{d/4}\sum_{k=0}^{d}\binom dk3^{-k}\\
&=3^{d/4}\left(1+\frac13\right)^d
=\exp\{d\,h(1/4)\},
\end{aligned}
$$

ここで $h(1/4)=\ln4-\frac34\ln3\simeq0.56234$ は自然対数で測る二値エントロピーである。全ての $2^d$ 個の符号列を取り除くには、選んだ中心数 $M$ と球体積の積が少なくとも $2^d$ 必要なので

$$
M\ge\frac{2^d}{B(d,r)}
\ge\exp\{d(\ln2-h(1/4))\}
\ge2^{d/8}.
$$

最後の不等式は $\ln2-h(1/4)\simeq0.13081>(\ln2)/8\simeq0.08664$ による。有限回で停止する貪欲構成なので存在も証明された。
<!-- proof-end -->

## 5. $d$ 個の点の分類は $\sqrt{d/n}$ より速く学べない

いよいよ標本に戻る。入力 $X$ は $\{1,\ldots,d\}$ の各点を同確率で取り、世界 $\theta\in\Theta$ によって、各入力点でのラベルの多数派を決める。各観測は $Z=(X,Y)$ で、$Y\in\{-1,+1\}$。偏り $\gamma>0$ が小さいほど世界間のKLは小さいが、間違った座標での予測損失差は $2\gamma$ 残る。

<a id="thm-slt1-16-fano-lower"></a>

<!-- formal-statement-start -->
> **定理（有限二値分類のFano型minimax下界）**  
> $d\ge32$、$n\ge1$ を整数とし、仮説クラスを全ての符号予測器

$$
\mathcal H=\{h_\eta:\{1,\ldots,d\}\to\{-1,+1\};
\ h_\eta(i)=\eta_i,\ \eta\in\{-1,+1\}^d\}
$$

> とする。0–1損失、独立同分布標本の下で、$\gamma=\min\{1/4,\sqrt{d/(1024n)}\}$ を選ぶ。各 $\theta\in\{-1,+1\}^d$ に対して分布 $P_\theta$ を

$$
P_\theta(X=i)=\frac1d,\qquad
P_\theta(Y=\theta_i\mid X=i)=\frac12+\gamma
$$

> で定めると、どんな独立乱択算法 $A_n(S,U)\in\mathcal H$ に対しても、ある $\theta$ が存在し

$$
\mathbb P_{S\sim P_\theta^n,U}\left(
R_{P_\theta}(A_n)-\min_{h\in\mathcal H}R_{P_\theta}(h)
\ge\frac{\gamma}{4}
\right)\ge\frac12,
$$

> かつ

$$
\mathfrak R_n(\{P_\theta:\theta\in\{-1,+1\}^d\},\mathcal H)
\ge\frac{\gamma}{8}
=\min\left\{\frac1{32},\frac1{256}\sqrt{\frac dn}\right\}.
$$

<!-- formal-statement-end -->

### 証明の見取り図

packingの $M$ 個の符号列を世界とする。算法の出力が真の符号列と近ければ、その出力から最も近いpackingの中心を選んで正しい世界を識別できる。だからFanoで世界の識別に一定の誤りが残るなら、予測器のHamming誤りも一定以上残る。残る論証は、標本列のKLが $n\gamma^2$ 程度であることを**元の条件付き分布から**計算することである。

<!-- proof-start -->
### 証明

まず各 $\theta$ の下で、予測器 $h_\eta$ のリスクは

$$
\begin{aligned}
R_{P_\theta}(h_\eta)
&=\frac1d\sum_{i:\eta_i=\theta_i}\left(\frac12-\gamma\right)
+\frac1d\sum_{i:\eta_i\ne\theta_i}\left(\frac12+\gamma\right)\\
&=\frac12-\gamma+\frac{2\gamma}{d}d_H(\eta,\theta).
\end{aligned}
$$

よって最小リスクは $1/2-\gamma$ で $h_\theta$ が達成し、超過リスクは $(2\gamma/d)d_H(\eta,\theta)$ である。

[有限二値立方体の指数的packing](#lem-slt1-16-packing)から距離が $d/4$ より大きい集合 $\Theta=\{\theta^{(1)},\ldots,\theta^{(M)}\}$ を取り、$M\ge2^{d/8}$ とする。世界番号 $V$ を $\{1,\ldots,M\}$ 上一様に選ぶ。標本 $S$ は $V=j$ の下で $Q_j=P_{\theta^{(j)}}^n$ に従う。

二世界 $\theta,\theta'$ の一観測KLは、入力 $X$ の分布が共通一様だから、各入力点でのBernoulli条件付きKLを $1/d$ で平均したものになる。等しい座標ではKLは0、異なる座標では第3節で計算した

$$
\kappa(\gamma)=2\gamma\ln\frac{1+2\gamma}{1-2\gamma}
\le16\gamma^2
$$

となる。従って

$$
\begin{aligned}
D_{\mathrm{KL}}(P_\theta\|P_{\theta'})
&=\frac{d_H(\theta,\theta')}{d}\,\kappa(\gamma)
\le16\gamma^2,\\
D_{\mathrm{KL}}(Q_j\|Q_k)
&=nD_{\mathrm{KL}}(P_{\theta^{(j)}}\|P_{\theta^{(k)}})
\le16n\gamma^2.
\end{aligned}
$$

この積KLの加法性は、$Z_i$ の独立性によって尤度比が積となり、その対数が和になることから従う。$\gamma\le1/4$ なので全ての $Q_j$ は同じ正の台を持ち、[Fano検定補題](#lem-slt1-16-fano-testing)のKL条件も満たす。同補題から

$$
I_{\mathrm{nat}}(V;S)\le16n\gamma^2\le\frac d{64}.
$$

$M\ge2^{d/8}$ と $d\ge32$ を使うと

$$
\frac{I_{\mathrm{nat}}(V;S)}{\ln M}
\le\frac1{8\ln2}<\frac14,\qquad
\frac{\ln2}{\ln M}\le\frac8d\le\frac14.
$$

したがって、いかなる番号推定器も $P(\widehat V\ne V)>1/2$ となる。

次に学習器の出力 $h_{\widehat\eta}$ から、Hamming距離が最小のpacking中心の番号 $\widehat V$ を選ぶ（同点は固定した順序で決める）。もし $d_H(\widehat\eta,\theta^{(V)})<d/8$ なら、他の中心 $\theta^{(k)}$ との距離は三角不等式で

$$
\begin{aligned}
d_H(\widehat\eta,\theta^{(k)})
&\ge d_H(\theta^{(V)},\theta^{(k)})
 -d_H(\widehat\eta,\theta^{(V)})\\
&>\frac d4-\frac d8=\frac d8
>d_H(\widehat\eta,\theta^{(V)}).
\end{aligned}
$$

よって最も近い中心は一意に真の番号である。対偶により $\widehat V\ne V$ なら $d_H(\widehat\eta,\theta^{(V)})\ge d/8$。先ほど計算した超過リスク $(2\gamma/d)d_H(\widehat\eta,\theta^{(V)})$ に代入すると、この誤識別事象上で

$$
R_{P_{\theta^{(V)}}}(h_{\widehat\eta})
-R_{P_{\theta^{(V)}}}(h_{\theta^{(V)}})
\ge\frac{2\gamma}{d}\cdot\frac d8=\frac{\gamma}{4}.
$$

世界番号を一様に選んだ平均でその事象の確率は $>1/2$。従って少なくとも一つの $\theta$ では確率が $1/2$ 以上であり、その世界の期待超過リスクは少なくとも $(\gamma/4)(1/2)=\gamma/8$。$A_n$ が任意だったため、算法の $\inf$ を取っても下界は変わらない。
<!-- proof-end -->

**直接計算する小例**：$d=4$、$\theta=(+,+,-,-)$、$\eta=(+,-,+,-)$ なら $d_H=2$ であり、損失を入力ごとに足すと

$$
R_{P_\theta}(h_\eta)
=\frac14\left[2\left(\frac12-\gamma\right)
+2\left(\frac12+\gamma\right)\right]=\frac12,
\qquad
R_{P_\theta}(h_\theta)=\frac12-\gamma.
$$

したがって超過リスクは $\gamma=(2\gamma/4)\cdot2$。この小例はリスク式の検算であり、$d\ge32$ のFano定理そのものへ $d=4$ を代入しているわけではない。

### 有限クラス上界と同じ次数になる

この模型の仮説数は $|\mathcal H|=2^d$ である。[有限クラスERM高確率界](../SLT1-04/index.md#cor-slt1-04-finite-erm)を0–1損失、近似誤差 $\eta=0$、$M=2^d$ に適用すると、任意の $\delta\in(0,1)$ について

$$
R_P(\widehat h)-\min_{h\in\mathcal H}R_P(h)
\le\sqrt{\frac{2\{d\ln2+\ln(2/\delta)\}}{n}}
$$

が確率 $1-\delta$ 以上で成り立つ。一方、今回の下界は期待値について $\min\{1/32,\sqrt{d/n}/256\}$ である。十分な標本数がある領域では、**$d$ と $n$ に対する $\sqrt{d/n}$ の次数が上下で一致する**。高確率の $\delta$ 依存について同じ鋭さを示したわけではない。

例えば $0<\varepsilon<1/32$ で全分布の期待超過リスクを $\varepsilon$ 以下にしたければ、下界の対偶から

$$
n\ge\frac{d}{65536\,\varepsilon^2}
$$

は必要条件となる。これは定数が緩い下界であり、設計上の十分な標本数を示す式ではない。さらに $n<d/(65536\varepsilon^2)$ なら $\gamma>8\varepsilon$ なので、ある世界では超過リスクが $\varepsilon$ を超える確率が少なくとも $1/2$ となる。したがって失敗確率を $1/4$ 以下とする分布一様保証も不可能である。

## 6. 下界を他の模型へ移すときの注意

1. **分布を一つ固定した保証とは違う。** 下界は「各算法に対して難しい分布が存在する」という主張であり、全ての分布が難しいわけではない。例えば全入力点でラベルが確定的かつ既知の規則に従うなら、同じ標本数でも別の保証が可能である。
2. **0–1損失と有限クラスを使った。** 二乗損失、回帰、連続パラメータへ移すには、識別誤りをその損失の超過リスクへ換算する別の論証が要る。packingの距離だけを形式的に置き換えてはいけない。
3. **独立同分布性がKLの $n$ 倍を支える。** 同一観測を $n$ 回複製しただけでは、観測全体のKLは一観測のKLと同じである。独立でない標本へこの証明の $nD_{\mathrm{KL}}$ を転写できない。
4. **多仮説Fanoには距離の分離が必要である。** 世界の番号を識別できないことと予測が悪いことは同義ではない。各世界の最適予測器がほぼ同じなら、番号を間違えても超過リスクは小さい。Hamming packingとリスク恒等式が、その間をつないだ。

## 演習

### Level A：定義・二分布の基本計算

#### A1. TV距離と最適検定

- Level: A
- ID: SLT1-16-A01

$\Omega=\{a,b\}$ 上の $Q_0=(3/4,1/4)$、$Q_1=(1/4,3/4)$ についてTV距離と、等確率事前の最小平均検定誤りを求めよ。等号を達成する検定も記せ。

<!-- solution-start -->
**詳細解答**

[有限標本空間でのTV距離](#def-slt1-16-tv)の式に代入すると

$$
\operatorname{TV}(Q_0,Q_1)
=\frac12\left(\left|\frac34-\frac14\right|
+\left|\frac14-\frac34\right|\right)=\frac12.
$$

[二仮説検定のLe Cam下界](#lem-slt1-16-le-cam)より最小平均誤りは $(1-1/2)/2=1/4$。実際、$a$ なら世界0、$b$ なら世界1と答えると、世界0で誤る確率は $Q_0(b)=1/4$、世界1で誤る確率は $Q_1(a)=1/4$ である。その平均も $1/4$ なので下界に達する。
<!-- solution-end -->

#### A2. 二点分類の超過リスク

- Level: A
- ID: SLT1-16-A02

$P(Y=+1)=0.6$ の一点入力0–1分類で、常に $+1$ と答える予測器と常に $-1$ と答える予測器のリスク、および後者の超過リスクを求めよ。

<!-- solution-start -->
**詳細解答**　正解ラベルが $+1$ の確率は0.6なので、$+1$ と答えて誤るのは $Y=-1$ の場合、確率0.4である。$-1$ と答えて誤る確率は0.6。最良リスクは $\min(0.4,0.6)=0.4$、後者の超過リスクは $0.6-0.4=0.2$。これは $\gamma=0.1$ と置いた $2\gamma$ と一致する。
<!-- solution-end -->

#### A3. Bernoulli二分布のKL

- Level: A
- ID: SLT1-16-A03

$0<\gamma\le1/4$ とし、$P_+(+1)=1/2+\gamma$、$P_- (+1)=1/2-\gamma$ とする。自然対数の $D_{\mathrm{KL}}(P_+\|P_-)$ を計算し、$n$ 回独立標本でのKLを示せ。

<!-- solution-start -->
**詳細解答**　確率が正なので各対数は有限である。[KLの定義](../SLT1-15/index.md#def-slt1-15-kl)に二つの値を代入する。

$$
\begin{aligned}
D_{\mathrm{KL}}(P_+\|P_-)
&=\left(\frac12+\gamma\right)
\ln\frac{\frac12+\gamma}{\frac12-\gamma}
+\left(\frac12-\gamma\right)
\ln\frac{\frac12-\gamma}{\frac12+\gamma}\\
&=2\gamma\ln\frac{1+2\gamma}{1-2\gamma}.
\end{aligned}
$$

独立標本の一つの列 $y_1,\ldots,y_n$ の尤度比は $\prod_i P_+(y_i)/P_-(y_i)$ である。その対数を足し、$P_+^n$ で期待値を取ると

$$
D_{\mathrm{KL}}(P_+^n\|P_-^n)
=\sum_{i=1}^n\mathbb E_{P_+}
\ln\frac{P_+(Y_i)}{P_-(Y_i)}
=nD_{\mathrm{KL}}(P_+\|P_-).
$$
<!-- solution-end -->

#### A4. Hamming距離とリスク

- Level: A
- ID: SLT1-16-A04

$d=4$、$\theta=(+,-,-,+)$、$\eta=(-,-,+,+)$、$\gamma=1/10$ とし、入力は4点一様、各点で $\theta_i$ が確率 $1/2+\gamma$ のラベルとする。$d_H(\theta,\eta)$、$R_{P_\theta}(h_\eta)$、超過リスクを求めよ。

<!-- solution-start -->
**詳細解答**　第1・第3座標で符号が異なるので $d_H=2$。一致する2点の誤り確率は $1/2-\gamma=0.4$、不一致の2点では $1/2+\gamma=0.6$。従って

$$
R_{P_\theta}(h_\eta)
=\frac{2(0.4)+2(0.6)}4=0.5.
$$

最適予測器は $h_\theta$ でリスク0.4を達成するので、超過リスクは0.1。リスク恒等式による $(2\gamma/d)d_H=(0.2/4)\cdot2=0.1$ とも一致する。
<!-- solution-end -->

#### A5. Fanoの数値評価

- Level: A
- ID: SLT1-16-A05

16個の世界を一様に選び、その観測と世界番号の自然対数相互情報量が高々 $(\ln2)/2$ である。どんな番号推定器にも成立する誤り確率の下界を求めよ。

<!-- solution-start -->
**詳細解答**　[多仮説検定補題](#lem-slt1-16-fano-testing)で $M=16$、$I_{\mathrm{nat}}\le(\ln2)/2$ を代入する。$\ln16=4\ln2$ なので

$$
P(\widehat V\ne V)
\ge1-\frac{(\ln2)/2+\ln2}{4\ln2}
=1-\frac38=\frac58.
$$

情報量の単位がビットなら最初に $\ln2$ 倍する必要がある。底を混在させると数値が変わってしまう。
<!-- solution-end -->

### Level B：下界の組み立てを再現する

#### B1. 二点下界から必要標本数へ

- Level: B
- ID: SLT1-16-B01

全ての二値分類分布について、超過リスクが $\varepsilon>0$ を超える確率を $1/4$ 以下にしたい。第3節の二点模型を使い、$n<1/(16\varepsilon^2)$ では不可能と示せ。境界の不等号に注意せよ。

<!-- solution-start -->
**詳細解答**　$n<1/(16\varepsilon^2)$ の両辺は正なので、平方根と逆数を取って

$$
4\sqrt n<\frac1\varepsilon,
\qquad
\frac1{4\sqrt n}>\varepsilon
$$

となる。[二点下界](#thm-slt1-16-binary-lower)では、ある $P_\pm$ の下で超過リスクが $1/(4\sqrt n)$ 以上となる確率が $1/4$ より大きい。その事象は超過リスクが $\varepsilon$ を**超える**事象に含まれる。よって目標の失敗確率 $1/4$ を満たせない。等号 $n=1/(16\varepsilon^2)$ の場合は「超過リスク $>\varepsilon$」へこの包含が言えないので、証明したのは厳密な $<$ の場合である。
<!-- solution-end -->

#### B2. 平均の情報量は対ごとのKLで抑えられる

- Level: B
- ID: SLT1-16-B02

一様な世界番号 $V\in\{1,\ldots,M\}$ の下で観測分布は $Q_j$ とし、全ての $Q_j$ は共通の正の台を持つ。$I_{\mathrm{nat}}(V;S)\le M^{-2}\sum_{j,k}D_{\mathrm{KL}}(Q_j\|Q_k)$ を、混合分布と $-\ln$ の凸性から証明せよ。

<!-- solution-start -->
**詳細解答**　混合分布は $\bar q(s)=M^{-1}\sum_kq_k(s)$。[相互情報量のKL表示](../../INFO/INFO2/index.md#thm-info2-mutual-kl)から自然対数へ換算して

$$
I_{\mathrm{nat}}(V;S)
=\frac1M\sum_{j,s}q_j(s)\ln\frac{q_j(s)}{\bar q(s)}.
$$

$q_k(s)>0$ だから、$-\ln$ の凸性を $M$ 個の正数 $q_k(s)$ に等重みで適用できる。

$$
-\ln\bar q(s)\le-\frac1M\sum_k\ln q_k(s).
$$

固定した $j,s$ で $\ln q_j(s)$ を加え、$q_j(s)/M$ を掛けてから $j,s$ を合計すると

$$
I_{\mathrm{nat}}(V;S)
\le\frac1{M^2}\sum_{j,k,s}q_j(s)
\ln\frac{q_j(s)}{q_k(s)}
=\frac1{M^2}\sum_{j,k}D_{\mathrm{KL}}(Q_j\|Q_k).
$$

互いの分布が完全に同じなら全てのKLは0、観測から番号が分からないことも確認できる。
<!-- solution-end -->

#### B3. Hamming球とpackingの構成

- Level: B
- ID: SLT1-16-B03

$d=32$、半径 $r=8$ とする。Hamming球の要素数を二項和で表し、貪欲に中心を選ぶ方法で、距離が8を超えるpackingを少なくとも $2^{32/8}=16$ 個確保できることを示せ。数値計算だけで終えず、二項和の評価を示せ。

<!-- solution-start -->
**詳細解答**　中心から $k$ 座標を反転する方法は $\binom{32}{k}$ 通りだから

$$
B(32,8)=\sum_{k=0}^{8}\binom{32}{k}.
$$

$k\le8$ では $3^{-k}\ge3^{-8}$ なので

$$
\begin{aligned}
B(32,8)
&\le3^8\sum_{k=0}^{8}\binom{32}{k}3^{-k}\\
&\le3^8(1+1/3)^{32}
=\exp\{32h(1/4)\}.
\end{aligned}
$$

一中心を選ぶたびに距離8以下の点を除去しても、選ばれた中心間の距離は9以上を保つ。全 $2^{32}$ 点を除去するまでに選ぶ個数は少なくとも

$$
\frac{2^{32}}{B(32,8)}
\ge\exp\{32(\ln2-h(1/4))\}
>2^{32/8}=16.
$$

従って少なくとも16個の中心が得られる。球が重なっても「一回で除ける数は高々 $B$」という下界の向きは変わらない。
<!-- solution-end -->

#### B4. 独立性を失うとKLが増えない

- Level: B
- ID: SLT1-16-B04

$P_+,P_-$ を第3節のBernoulli二分布とする。独立標本 $(Y_1,\ldots,Y_n)$ と、最初の一観測だけを $n$ 回コピーした標本 $(Y,\ldots,Y)$ を比べ、二世界間のKLを求めよ。コピー列に $\gamma_n=1/(8\sqrt n)$ を用いた下界証明をそのまま適用できない理由も説明せよ。

<!-- solution-start -->
**詳細解答**　独立標本の分布は $P_\pm^n$ で、[KLの加法性](#thm-slt1-16-binary-lower)の証明から

$$
D_{\mathrm{KL}}(P_+^n\|P_-^n)=n\kappa(\gamma)
$$

となる。一方、コピー列の分布は $Y=+1$ に対応する定数列と $Y=-1$ に対応する定数列の2点だけに正の質量を持つ。各質量は元の $P_\pm$ の質量と同じだから

$$
D_{\mathrm{KL}}(\mathcal L_+(Y,\ldots,Y)
\|\mathcal L_-(Y,\ldots,Y))
=\kappa(\gamma).
$$

コピー列では標本成分が完全従属なので、積尤度比への分解が成立しない。ここから第3節の $n\kappa(\gamma)$ を代入するのは誤りである。実際、同じ情報を何度並べても識別は改善しない。
<!-- solution-end -->

### Level C：上界・下界・量化の統合

#### C1. 有限分類での必要条件と十分条件

- Level: C
- ID: SLT1-16-C01

$d\ge32$ の $d$ 点一様入力・全二値ラベル仮説クラス、0–1損失を考える。$0<\varepsilon<1/32$、$0<\delta\le1/4$ とする。

1. 各分布 $P_\theta$ の条件付きラベル確率を $\frac12+\gamma$ とする第5節の模型で、学習器の符号誤りと超過リスクの関係を導け。
2. Fano下界を用いて、$n<d/(65536\varepsilon^2)$ なら全分布について $P(\text{超過リスク}>\varepsilon)\le\delta$ とはできないことを示せ。
3. 有限クラスERMの上界を使い、全分布一様に同じ高確率保証を得る十分な $n$ を示し、両者の $d,\varepsilon$ 依存を比較せよ。

<!-- solution-start -->
**詳細解答**　まず各入力点のBayesラベルは $\theta_i$ である。$h_\eta$ が一致すると誤り確率は $1/2-\gamma$、不一致なら $1/2+\gamma$。したがって

$$
R_{P_\theta}(h_\eta)
=\frac12-\gamma+\frac{2\gamma}{d}d_H(\eta,\theta),
\quad
R_{P_\theta}(h_\eta)-R_{P_\theta}(h_\theta)
=\frac{2\gamma}{d}d_H(\eta,\theta).
$$

次に $\gamma=\min\{1/4,\sqrt{d/(1024n)}\}$ と置く。[Fano型下界](#thm-slt1-16-fano-lower)で、ある世界では超過リスクが $\gamma/4$ 以上となる確率が少なくとも $1/2$。仮定 $n<d/(65536\varepsilon^2)$ から

$$
\sqrt{\frac d{1024n}}>8\varepsilon,\qquad
\frac14>8\varepsilon
$$

なので $\gamma>8\varepsilon$、特に $\gamma/4>2\varepsilon>\varepsilon$。従って

$$
P(\text{超過リスク}>\varepsilon)
\ge P(\text{超過リスク}\ge\gamma/4)
\ge\frac12>\delta.
$$

一方、仮説は $2^d$ 個で、損失は $[0,1]$、観測は独立同分布である。[有限クラスERM上界](../SLT1-04/index.md#cor-slt1-04-finite-erm)を $\eta=0$、$M=2^d$ に適用すると

$$
P\left(\text{超過リスク}>
\sqrt{\frac{2\{d\ln2+\ln(2/\delta)\}}n}\right)\le\delta.
$$

従って

$$
n\ge\left\lceil\frac{2\{d\ln2+\ln(2/\delta)\}}{\varepsilon^2}\right\rceil
$$

は十分条件である。下界は $d/\varepsilon^2$、上界は $(d+\ln(1/\delta))/\varepsilon^2$ の次数を持ち、$\delta$ を固定すれば $d$ と $\varepsilon$ の次数は一致する。ただし今回の下界だけから $\ln(1/\delta)$ の必要性までは言えず、下界の模型も分布に関する量化を伴う。
<!-- solution-end -->

## まとめ

- 二仮説では、最善の平均検定誤りは $(1-\operatorname{TV})/2$。KLでTV距離を抑えると、短い標本での識別困難性が数値になる。
- 多仮説では、[Fano不等式](../../INFO/INFO6/index.md#thm-info6-fano)が誤識別と相互情報量を結ぶ。標本の情報量は対ごとのKLで上から評価できる。
- 識別の下界が予測の下界となるには、**世界を間違えると損失が増える**ことを別途示す。Hamming packingとリスク恒等式がこの接続を担う。
- 一般の非realizableな有限分類模型では $\sqrt{d/n}$ 型の下界とERM上界が次数一致する。これを無条件にrealizable学習、回帰、非iid標本へ延長しない。

次章では、有限辞書・線形予測・ridgeなど実際のモデルについて、これらの保証がどれほど鋭いかを比較する。
