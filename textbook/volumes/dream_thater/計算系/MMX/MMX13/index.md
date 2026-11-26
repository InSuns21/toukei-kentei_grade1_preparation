# MMX13 Circuit lower bounds companionの比較・entropy・product theorem：no-ports側のグラフentropy boundを導く

## 1. この講の問い

[ports](../MMX11/index.md#def-mmx11-ports) がある場合には、固定次数でも全頂点間の距離を一様に制御できる。本講では逆の場合を調べる。グラフの辺を短く、離れた点を遠く配置できるなら、どれほど多くの情報を一回の移動で生成できるだろうか。

例えば $n$ 個の頂点から一様に一つを選ぶには $\log_2 n$ ビットが必要だが、次数 $d$ のグラフで一辺を進むには高々 $\log_2 d$ ビットしか必要ない。この比を、非線形の距離比較を通じて定量化する。次に、配置を足し合わせるために距離の二乗表の凸性が必要になる。積空間が最初から許容されるとは限らないので、積に閉じた部分クラスを作る。

一次資料は OpenAI, *Circuit lower bounds for Hamiltonian cycle and the permanent*（2026-11-24版）の [entropy.tex](https://github.com/openai/math/blob/main/preprints/Circuit-lower-bounds-for-Hamiltonian-cycle-and-the-permanent-November-24-2026/build/entropy.tex)、[product.tex](https://github.com/openai/math/blob/main/preprints/Circuit-lower-bounds-for-Hamiltonian-cycle-and-the-permanent-November-24-2026/build/product.tex)、[comparison.tex](https://github.com/openai/math/blob/main/preprints/Circuit-lower-bounds-for-Hamiltonian-cycle-and-the-permanent-November-24-2026/build/comparison.tex) である。前半の距離論は体に依存しない。最後に原論文の回路比較に戻り、別の証人構成を入力とする指数計算を扱う。ハミルトン閉路多項式や permanent への射影の全証明は本講の目的ではない。

## 2. 二つの遷移を比較する

Hadamard 空間とは完備 CAT(0) 空間のことである。[測地的スペクトル空間の非正曲率](../MMX10/index.md#thm-mmx10-curvature) から、前講までの完備測地的スペクトル空間がこの値域になる。

有限集合 $V$ の Markov 遷移行列 $P$ は非負で行和1である。確率ベクトル $\pi$ が $\pi P=\pi$ を満たすとき、$\pi$ は定常分布である。以下、質量0の状態は除いてよい。配置 $f:V\to X$ で、物理的に許した一歩の二乗距離を平均し、別の需要遷移と比較する。

<a id="def-mmx13-pair-energy"></a>

<!-- formal-statement-start -->
> **定義（対分布の距離エネルギー）**
>
> 有限集合 $V$ 上の順序対の確率分布 $\mu$ と距離空間 $(X,d_X)$ への配置 $f$ に対し

$$
\mathcal E_\mu(f)=\sum_{i,j\in V}\mu(i,j)d_X(f(i),f(j))^2
$$

> と定める。定常遷移 $P$ に対し $\mathcal E_P=\mathcal E_{\pi_iP_{ij}}$ と略記し、独立な二点のエネルギーを $\mathcal V_\pi=\mathcal E_{\pi\otimes\pi}$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mmx13-pair-energy -->
**定義の確認**

$V=\{0,1\}$、$f(0)=0,f(1)=2$、$\pi=(1/2,1/2)$ とする。交互に移動する行列の対分布は $\mu(0,1)=\mu(1,0)=1/2$、他は0であり、総和1である。両方向の平方距離は4なので $\mathcal E_P=4$。独立な対の分布は各成分 $1/4$ で、自己対は0だから $\mathcal V_\pi=2$。遷移を半分だけ自己遷移に変更すると $\mathcal E_P=2$ になるが、独立な対の値は変わらない。
<!-- definition-example-end -->

Hadamard 空間の非空なクラス $\mathcal C$ を固定する。[ports](../MMX11/index.md#def-mmx11-ports) の定義を $\mathcal C$ 全体への配置に適用する。すなわち、固定次数 $d$ と定数 $C$、頂点数が非有界な正則多重グラフ族の全てについて $\mathcal V\le C\mathcal E_G$ が全配置で成立するとき、このクラスに ports があるという。自己辺は行和に一回だけ数える。ports がなければ、任意の固定した $d,C$ に対して十分大きな全 $d$ 正則グラフにはこの比較を破る配置がある。

### 2.1 定常歩道の平均による改善

[遅延歩道の平均](../MMX11/index.md#lem-mmx11-cesaro) は一様分布・対称遷移の全対エネルギーを改善した。ここでは対称性のない物理遷移と任意の共通周辺分布を持つ需要対も扱う。これが後の観測情報量に必要になる。

<a id="lem-mmx13-stationary-smoothing"></a>

<!-- formal-statement-start -->
> **補題（定常対比較の平滑化）**
>
> $P$ は有限状態の定常遷移、$\pi$ は定常分布、$D$ は両周辺が $\pi$ の対分布とする。偶数 $t\ge2$ に対し

$$
A=(I+P)/2,\qquad S=t^{-1}\sum_{h=1}^t A^h
$$

> と置く。任意の Hadamard 空間への配置 $x$ に対して、ある配置 $y$ が存在して

$$
\sum_i\pi_i d_X(x_i,y_i)^2+t\mathcal E_P(y)\le16\mathcal E_S(x)
$$

> となる。全配置について $\mathcal E_D\le\beta\mathcal E_P$（$\beta\ge0$）ならば、全配置について $\mathcal E_D\le 48(1+\beta/t)\mathcal E_S$ となる。
<!-- formal-statement-end -->

短い時間の費用だけでなく、時間平均した費用を使うことで、比較定数の大きな部分を $t$ で割れる。証明では同じ重心操作を反復し、適切な時刻を一つ選ぶ。

<!-- proof-start -->
### 証明

$x^0=x$ とし、[有限加重重心](../../../幾何系/NPCG/NPCG8/index.md#def-npcg8-weighted-barycenter) を使って $x_i^{g+1}=\operatorname{bar}_j(A_{ij},x_j^g)$ と定める。重心は完備性により存在する。次を置く。

$$
u_g=\sum_i\pi_i d_X(x_i,x_i^g)^2,\qquad
q_g=\sum_{ij}\pi_i A_{ij}d_X(x_i^{g+1},x_j^g)^2.
$$

定常な $A$ 歩道 $I_0,\ldots,I_h$ の末尾から、[分散不等式](../../../幾何系/NPCG/NPCG8/index.md#thm-npcg8-variance-inequality) を $I_{h-g-1}=i$ までの履歴で条件付けて適用する。比較点は $x_{I_0}$、対象点は $x_j^g$、重みは $A_{ij}$ である。定常性から各段階の分散項の期待値は $q_g$ なので

$$
\mathbb E d_X(x_{I_0},x_{I_{h-g}}^g)^2
\ge \mathbb E d_X(x_{I_0},x_{I_{h-g-1}}^{g+1})^2+q_g.
$$

$g=0,\ldots,h-1$ を足して中間項を消すと $\mathcal E_{A^h}(x)\ge u_h+\sum_{g<h}q_g$。$h$ を1から $t$ まで足すと、$g<t/2$ の各 $q_g$ は少なくとも $t/2$ 回現れる。$u_0=0$ より

$$
\sum_{g<t/2}\bigl(u_g+(t/2)q_g\bigr)\le t\mathcal E_S(x).
$$

ある $g<t/2$ で括弧内は $2\mathcal E_S(x)$ 以下。$y=x^g$ とする。三角不等式を $x_i^g,x_i^{g+1},x_j^g$ に適用し二乗すると

$$
\begin{aligned}
\mathcal E_P(x^g)
&\le 2\sum_i\pi_i d_X(x_i^g,x_i^{g+1})^2\\
&\quad+2\sum_{ij}\pi_iP_{ij}d_X(x_i^{g+1},x_j^g)^2\\
&=4q_g.
\end{aligned}
$$

ここで $A=(I+P)/2$ を用いた。従って $u_g+t\mathcal E_P(y)\le 8(u_g+(t/2)q_g)\le16\mathcal E_S(x)$。

需要対の両周辺が $\pi$ なので、三段の経路 $x_i,y_i,y_j,x_j$ を使うと

$$
\mathcal E_D(x)\le 6u_g+3\mathcal E_D(y)
\le 6u_g+3\beta\mathcal E_P(y).
$$

これは $ (6+3\beta/t)(u_g+t\mathcal E_P(y))$ 以下だが、より直接には $6u_g+12\beta q_g\le\max(6,24\beta/t)(u_g+(t/2)q_g)$ であり、結論の $48(1+\beta/t)$ 以下を得る。対称性はどこにも用いていない。
<!-- proof-end -->

### 2.2 次数と頂点数からの下界

固定した小さいグラフを雲として使い、その雲を繰り返し増やす。もし元のグラフの比較定数が小さ過ぎれば、雲を増やしても定数が有界なままとなり、ports が生じてしまう。

<a id="thm-mmx13-log-obstruction"></a>

<!-- formal-statement-start -->
> **定理（対数的 Poincaré 障壁）**
>
> ports を持たない Hadamard 空間のクラス $\mathcal C$ を取る。$n\ge2$ 頂点、$d\ge1$ 正則の多重グラフ $G$ に対して全 $X\in\mathcal C$・全配置で $\mathcal V\le\beta\mathcal E_G$ が成立するなら、絶対定数 $c>0$ について

$$
\beta\ge c\frac{\log_2 n}{\log_2(d+1)}
$$

> が成立する。
<!-- formal-statement-end -->

例えば次数を4に固定すれば比較定数は少なくとも $\log_2 n$ の定数倍となる。完全グラフのように次数も増える場合には、この結論は定数下界と両立する。

<!-- proof-start -->
### 証明

$\mathcal C$ が一点空間しか持たなければ任意のグラフ族で比較が成立し、ports を持つ。従って距離 $l>0$ の二点がある。それらを各頂点へ独立に確率 $1/2$ で配置して比較を平均すると

$$
(1-1/n)l^2/2\le\beta l^2/2,
$$

ゆえに $\beta\ge1/2$。$b=\max(1,\beta)$ とする。

元のグラフを $H$ と呼ぶ。偶数 $t\ge2$ が $(2d+1)^t\le n/2$ を満たすとする。旧グラフの次数を $2d$、比較定数を $\gamma$、遷移を $K$ とする。[定常対比較の平滑化](#lem-mmx13-stationary-smoothing) により、遅延平均 $S$ の定数は $48(1+\gamma/t)$ 以下。

$S$ の一行の台は高々 $(2d+1)^t$ 個である。各時刻の選択は最大 $2d$ 辺と自己遷移の一つで、短い歩道は自己遷移で補えるからである。整数 $m_{uv}=\lceil nS_{uv}/2\rceil$ を作る。行和は高々 $n/2+(2d+1)^t\le n$ なので、不足を対角成分に足す。対称性は保たれ、$R=m/n$ は対称確率行列で $R_{uv}\ge S_{uv}/2$。従ってその比較定数は

$$
\rho=96(1+\gamma/t)
$$

で抑えられる。

旧頂点ごとに $H$ を一つ置く。雲 $u$ の $n$ 個の頂点を $m_{uv}$ 個ずつに分け、$u,v$ の対応する部分集合間に全単射を作る。$m_{uv}=m_{vu}$ なので往復で同じ対を使える。自己成分は各頂点を固定する。こうして得た対合の辺を $d$ 本ずつ重ね、内部の $d$ 本と合わせる。新次数は $2d$、新頂点数は旧頂点数の $n$ 倍である。

内部辺平均を $E_{\rm in}$、対合辺平均を $E_{\rm match}$ とすると新エネルギーはその和の半分である。各雲の重心 $z_u$ と、雲内重心までの平均平方距離 $v_0$ を取る。重心の最小性から各雲での平方距離平均は雲内の独立二点の平均以下で、従って $v_0\le b E_{\rm in}$。対合は一様分布を保つので、両端の重心を通る三段経路により

$$
\mathcal E_R(z)\le3(2v_0+E_{\rm match}).
$$

独立な全頂点対についても両重心を経由すると $\mathcal V(x)\le3(2v_0+\mathcal V(z))$。これに $\mathcal V(z)\le\rho\mathcal E_R(z)$ を代入する。

$$
\mathcal V(x)\le (6+18\rho)bE_{\rm in}+9\rho E_{\rm match}.
$$

$b\ge1$ だから新定数は $2(6+18\rho)b\le B b(1+\gamma/t)$（例えば $B=3468$）以下。もし $t\ge2Bb$ なら $\gamma'\le Bb+\gamma/2$ となる。一頂点に $2d$ 本の自己辺を置いたグラフから始めて反復すると、定数は帰納的に $2Bb$ 以下、次数は $2d$、頂点数は $n^k$ となり、ports の定義に反する。

従って条件を満たす偶数 $t$ は全て $2Bb$ 未満である。$L=\log(n/2)/\log(2d+1)$ が4以上なら最大の偶数 $t=2\lfloor L/2\rfloor$ は $L/2$ 以上なので $L<4Bb$。$n\ge4$ なら $\log(n/2)\ge(\log n)/2$、また $\log(2d+1)\le2\log(d+1)$。$b\le2\beta$ を使えば所望の下界が得られる。$L<4$ の場合は $\log n=\log 2+L\log(2d+1)\le9\log(d+1)$ なので、$\beta\ge1/2$ が同じ形の下界を与える。
<!-- proof-end -->

実数の確率を整数本の辺に丸める操作は、以下の疎な遷移にも使える。

<a id="cor-mmx13-sparse"></a>

<!-- formal-statement-start -->
> **系（疎な対称遷移の対数下界）**
>
> $P$ は $n\ge2$ 状態の対称確率行列で、各行に高々 $d\ge1$ 個の正成分があるとする。ports を持たない Hadamard 空間のクラスの全配置について $\mathcal V\le\beta\mathcal E_P$ なら

$$
\log_2 n\le C\beta\log_2(d+1)
$$

> となる。$C$ は絶対定数である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

各成分を $\lceil dP_{ij}\rceil$ 本の弧とすると、行和は高々 $d+d=2d$。対角成分を補って次数を $2d$ にする。対称性を保ったまま新遷移 $Q$ は $P/2$ を成分ごとに上回る。エネルギーの全項は非負なので $\mathcal V\le2\beta\mathcal E_Q$。ここに [対数的 Poincaré 障壁](#thm-mmx13-log-obstruction) を適用し、$\log(2d+1)\le2\log(d+1)$ を使う。
<!-- proof-end -->

## 3. 見える情報だけで比較する

遷移の状態には、観測者から見えない記録が含まれることもある。例えば時刻ごとに状態が複雑に変わっていても、観測ラベルがいつも同じなら観測される情報は0ビットである。これを区別するため、定常歩道のラベル列全体の情報を時間で割る。

<a id="def-mmx13-observed-rate"></a>

<!-- formal-statement-start -->
> **定義（観測エントロピー率）**
>
> 有限状態の定常 $P$ 歩道 $X_0,X_1,\ldots$ と有限値ラベル $L$ に対し、底2の [Shannonエントロピー](../../../応用系/INFO/INFO1/index.md#def-info1-entropy) を用いて

$$
H_j=H(L(X_0),\ldots,L(X_{j-1})),\qquad
a=\inf_{j\ge1}H_j/j
$$

> と置く。この $a$ を観測エントロピー率という。$H_j/j$ は $a$ に収束する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mmx13-observed-rate -->
**定義の確認**

二状態を一様に出発して決定的に交互に動く遷移では、全ラベル列は初期値で決まる。恒等ラベルなら各長さ $j\ge1$ で二つの列が確率 $1/2$ ずつなので $H_j=1$ ビット、$a=0$ である。毎回独立な公平ビットを引く遷移なら $2^j$ 列が等確率なので $H_j=j$、$a=1$ となる。どちらも一時刻だけならラベルは一様であるが、率は異なる。
<!-- definition-example-end -->

[連鎖律](../../../応用系/INFO/INFO1/index.md#thm-info1-chain-rule) と条件付けで情報が増えないことから $H_{j+k}\le H_j+H_k$（後半の周辺分布は定常性で長さ $k$ のブロックのもの）。$j=qn+r$、$0\le r<n$ と分ければ $H_j\le qH_n+H_r$（$H_0=0$）。$j\to\infty$ で上極限は $H_n/n$ 以下。全 $n$ で下限を取り、定義から下極限は $a$ 以上だから収束する。条件付けによる減少は [相互情報量の非負性](../../../応用系/INFO/INFO2/index.md#thm-info2-mutual-kl) から、条件付き分布についても従う。

恒等ラベルで全状態が見える Markov 連鎖なら、連鎖律と Markov 性により $H_j=H(X_0)+(j-1)H(X_1\mid X_0)$。したがって $a=H(X_1\mid X_0)$ である。一般の観測ラベル列ではこの一段公式を使わない。

### 3.1 交換可能な座標の二乗費用

一斉に多数の状態を動かすとき、普通の三角不等式を繰り返すだけでは座標数の二乗が出る。Hadamard 空間では独立な交換可能対（順序を逆にしても分布が同じ対）なら、費用を座標ごとの和で抑えられる。

<a id="lem-mmx13-coordinate-exchange"></a>

<!-- formal-statement-start -->
> **補題（独立座標交換の二乗評価）**
>
> 有限値の独立な交換可能対 $(X_i,Y_i)$（$i=1,\ldots,r$）を取る。$X=(X_i)_i,Y=(Y_i)_i$、$X^{(i)}$ は $X$ の第 $i$ 座標だけを $Y_i$ に替えたものとする。任意の CAT(0) 空間への配置 $f$ について

$$
\mathbb E d_X(f(X),f(Y))^2
\le\sum_{i=1}^r \mathbb E d_X(f(X),f(X^{(i)}))^2
$$

> が成立する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

二つの座標ブロックについて、両方旧値の点 $a$、第一ブロックだけ新値の点 $b$、両方新値の点 $e$、第二ブロックだけ新値の点 $c$ を取る。[四辺形不等式と中点の差](../../../幾何系/NPCG/NPCG6/index.md#thm-npcg6-quadrilateral) を巡回順 $(a,b,e,c)$ に適用する。

$$
d_X(a,e)^2+d_X(b,c)^2
\le d_X(a,b)^2+d_X(c,e)^2+d_X(a,c)^2+d_X(b,e)^2.
$$

独立性と各対の交換可能性により第一ブロックの旧値・新値を全て交換しても分布は変わらない。よって二対角線の期待値は等しく、向かい合う二辺も期待値が等しい。二で割ると両ブロックを同時に変更する期待費用は個別費用の和以下になる。第二ブロックをさらに二分して同じ議論を行い、各座標まで分解する。
<!-- proof-end -->

実直線で独立な公平ビットを再抽選し、その和を配置とすれば、各座標の差の平均が0なので交差項が消え、等号となる。交換可能性がない決定的な移動では全座標が同方向に動くこともあり、この結論はそのまま使えない。

### 3.2 観測情報をランプの値にする

需要遷移で生まれる情報を、多数の小さな記憶セルに取り出す。記憶セルは $k$ ビットの加算群 $\mathbb F_2^k$ の値を保持し、加算はビットごとの排他的論理和である。以下このセルをランプと呼ぶ。元の状態を $r$ 個並べた記憶域をリザーバと呼ぶ。まず需要歩道で得るラベルをほぼ一様なランプ増分へ変換する。

<a id="lem-mmx13-hash"></a>

<!-- formal-statement-start -->
> **補題（需要ラベルの一様成分抽出）**
>
> 両周辺が $\pi$ の有限対分布 $(X,Y)$ と有限値ラベル $L$ を取り、$h=H(L(Y)\mid X)>0$ とする。十分大きな整数 $r$ に対し $k=\lfloor rh/4\rfloor$、$q=2^k$ と置く。ラベルの $r$ 組を $A=\mathbb F_2^k$ へ写す写像 $b$ と、$\pi^{\otimes r}$ の質量が $1/2$ 以上の開始状態集合 $B$ が存在する。独立な $r$ 組の需要対を $(U,U')$ と書けば、各 $u\in B,z\in A$ について

$$
\Pr(b(L^r(U'))=z\mid U=u)\ge 1/(4q)
$$

> となる。$L^r$ は座標ごとのラベル写像である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

実際に起きる対の確率は正なので、確率変数 $-\log_2\Pr(L(Y)\mid X)$ は有限値で平均 $h$ を持つ。独立な $r$ 組の条件付きラベル確率は各座標の積であり、その負対数はこれらの和である。[対数確率の平均と分散](../../../応用系/INFO/INFO3/index.md#lem-info3-information-moments) と同じ有限独立和の計算から、分散は $r$ 倍、平均は $rh$ になる。Chebyshev の不等式で負対数が $3rh/4$ 未満となる確率は $O(1/r)$。従って条件付き確率が $2^{-3rh/4}$ 以下のラベル原子に、開始状態の確率 $1-o(1)$ の集合で少なくとも半分の質量が載る（条件付きの悪い質量の期待値に Markov の不等式を適用する）。

そのような開始状態 $u$ を固定し、全ラベル組を独立一様に $q$ 色へ塗る。一色 $z$ に入る小原子の確率質量を $M_z$ とする。小原子の条件付き確率を $p_\ell$ とすれば

$$
\mathbb E M_z=\sum_\ell p_\ell/q\ge1/(2q),\qquad
\operatorname{Var} M_z\le\sum_\ell p_\ell^2/q
\le 2^{-3rh/4}/q.
$$

第二式は独立な色の指示変数の分散が高々 $1/q$ であること、および $\sum p_\ell\le1$ から従う。Chebyshev の不等式で $M_z<1/(4q)$ の確率は高々 $16q\,2^{-3rh/4}$。全色についての和は高々

$$
16q^2 2^{-3rh/4}\le16\,2^{-rh/4}\longrightarrow0.
$$

開始状態と色付けの両方で平均すると、全色で下界が成立する開始状態の質量の期待値は $1-o(1)$。よってある固定色付けでは成功集合の質量が少なくとも $1/2$ である。それを $b,B$ とする。小原子以外も同じ色へ入れば質量は増えるだけなので結論が成立する。
<!-- proof-end -->

### 3.3 観測エントロピーの上界

<a id="thm-mmx13-observable-entropy"></a>

<!-- formal-statement-start -->
> **定理（観測エントロピー比較）**
>
> ports のない Hadamard 空間のクラス $\mathcal C$、共通の定常分布 $\pi$ を持つ有限遷移 $P,D$ を取る。$\beta\ge1$ で、全 $X\in\mathcal C$・全配置 $f$ に対し

$$
\mathcal E_D(f)\le\beta\mathcal E_P(f)
$$

> が成立するとする。有限ラベル $L$ の定常 $P$ 歩道での [観測エントロピー率](#def-mmx13-observed-rate) を $a$ とし、$(X_0,Y)$ を定常な $D$ の一歩とすると、絶対定数 $C$ について

$$
H(L(Y)\mid X_0)\le C\beta(1+a)
$$

> が成立する。
<!-- formal-statement-end -->

証明の見取り図は、需要でランプを一様に書き換えること、物理歩道の平均によってその書換えを比較できること、ランプの変化を短い符号で記録することの三段階である。グラフの対数下界が「一様なランプ列には多くの情報が必要」と強制する。

<!-- proof-start -->
### 証明

まず需要対の分布をその転置と半分ずつ混ぜ、交換可能にする。対のエネルギーは距離の対称性で不変。混合を表すビット $J$ を条件に追加すれば条件付きエントロピーは減少し、転置側のエントロピーも非負なので、対称化後の条件付き情報は元の少なくとも半分である。以下その情報を $h$ と書く。$h=0$ なら元も0なので終了する。

**ランプとリザーバの遷移。** 整数 $m\ge1$ を固定して、[需要ラベルの一様成分抽出](#lem-mmx13-hash) の $r,k,q,b,B$ を取る。拡大状態を $(u,s)\in V^r\times A^m$ とする。定常分布の候補は $\pi^r$ と一様ランプ列の独立積である。物理遷移 $G$ は確率 $1-1/r$ で一様に選んだリザーバ座標に $P$ を作用させ、確率 $1/r$ で一様なランプ番号 $J$ を選んで $b(L^r(u))$ を加える。前者は $\pi^r$ を保存し、後者は固定 $u,J$ についてランプ列の置換である。従って積分布は定常である。

需要遷移 $D_*$ は $u\in B$ なら全ランプを独立一様値で置換し、$u\notin B$ なら何もしない。リザーバは動かさないのでこれも同じ分布を保存する。配置を $F$ とし、リザーバ一座標の平均物理費用を $E_{\rm cell}$、ランプ一個を加算する平均費用を $E_{\rm add}$ とすると

$$
\mathcal E_G(F)=(1-1/r)E_{\rm cell}+E_{\rm add}/r.
$$

まず $u\in B$ で一様なランプ番号 $J$ だけを更新したい。独立需要遷移で $u'$ を作り、$z=b(L^r(u'))$ を加える。次の三段を通る。

$$
(u,s)\to(u',s)\to(u',s+e_Jz)\to(u,s+e_Jz).
$$

$e_Jz$ は第 $J$ 成分だけが $z$ である列である。増分分布が各値に $1/(4q)$ 以上の確率を持つので、この経路の端点費用の四倍が一様置換費用を上から抑える。

費用を全開始状態で平均して評価する。[独立座標交換の二乗評価](#lem-mmx13-coordinate-exchange) と元の対比較を各固定背景・ランプ列について適用すると、往路費用は高々 $r\beta E_{\rm cell}\le2r\beta\mathcal E_G(F)$。復路も同じである。実際、固定 $u,u',J$ で $s+e_Jz$ は一様であり、往路と同じランプ平均が現れる。中央の一歩は $u'$ が周辺分布 $\pi^r$ を持つので $E_{\rm add}\le r\mathcal E_G(F)$。良い開始状態だけの平均は非負性により全開始状態での平均以下である。三段経路を二乗して3倍し、さらに端点分布の比較の4倍を入れると、一様ランプ一個の置換の費用は高々 $60r\beta\mathcal E_G(F)$。

固定 $u\in B$ の下で $m$ 個のランプの旧値・新値は独立な交換可能対である。再び [独立座標交換の二乗評価](#lem-mmx13-coordinate-exchange) を使い、一個当たり平均の $m$ 倍で全置換費用を抑える。悪い $u$ では需要費用0だから

$$
\mathcal E_{D_*}(F)\le60mr\beta\mathcal E_G(F).
$$

**変化量の台と情報量。** 偶数 $T=2\lceil mr\beta\rceil$ とし、[定常対比較の平滑化](#lem-mmx13-stationary-smoothing) を $G,D_*,T$ に適用する。比較定数は $48(1+60mr\beta/T)\le1488$ である。ランプ列だけを見る配置 $F(u,s)=f(s)$ では需要エネルギーは $\pi^r(B)\mathcal V(f)\ge\mathcal V(f)/2$。遅延平均歩道のランプ変化は、初期一様列 $s$ と独立な $Z\in A^m$ の加算である（更新の選択に初期ランプ値は使わない）。したがってある絶対定数 $K\ge1$ で

$$
\mathcal V(f)\le K\mathbb E d_X(f(s),f(s+Z))^2
$$

がクラス全体で成立する。ここで任意の固定増分 $z$ について、独立一様点 $s'$ を経由すれば

$$
\mathbb E_s d_X(f(s),f(s+z))^2\le4\mathcal V(f).
$$

なぜなら、両端は一様で $s'$ と独立だから、二段の二乗評価の各項が $\mathcal V(f)$ になる。

$\epsilon=1/(8K)$ とし、確率が $2^{-H(Z)/\epsilon}$ 未満の増分を0へ置換して $\widetilde Z$ とする。$H(Z)>0$ なら、自己情報量の期待値が $H(Z)$ であることから Markov の不等式で捨てた確率は高々 $\epsilon$。$H(Z)=0$ なら一つの値だけなので捨てない。捨てたエネルギーは高々 $4\epsilon\mathcal V(f)$。従って

$$
\mathcal V(f)\le 2K\mathbb E d_X(f(s),f(s+\widetilde Z))^2.
$$

残した値は各々確率が少なくとも $2^{-H(Z)/\epsilon}$ だから台の大きさは高々 $2^{H(Z)/\epsilon}$、さらに0を足してよい。群 $A^m$ では $-z=z$ なので加算遷移は対称である。[疎な対称遷移の対数下界](#cor-mmx13-sparse) を $n=q^m=2^{mk}$、$d\le1+2^{H(Z)/\epsilon}$、$\beta=2K$ に適用すれば

$$
mk\le C_1(1+H(Z)).
$$

**変化量の符号化。** 物理歩道は高々 $T$ 回の実遷移を含む。ランプ加算回数を $S_0$ とすると $\mathbb E S_0\le T/r$。回数を単進符号（$s$ 個の1と終端0）で記録し、各ランプ番号を $\lceil\log_2 m\rceil$ ビットで記録する。加算の前後・間の $S_0+1$ 区間ごとに、各リザーバ座標が $P$ を何回進んだかを単進符号で記録する。区間内の異なる座標の更新は、ランプ読出しがないので順序を記録する必要がない。総歩数が $T$ 以下だから、この接頭語符号の長さの期待値は

$$
O\bigl(T+r+(T/r)\log_2(2m)\bigr).
$$

実際、回数部分は $S_0+1$、番号部分は $S_0\lceil\log_2 m\rceil$、区間内の回数部分は $T+r(S_0+1)$ 以下である。

各座標に独立な定常 $P$ 軌道を先に用意し、歩道の予定を独立に抽選する。予定が固定されれば、各座標で必要なラベル列は初期ラベルを含めた長さ $j_i$ のブロックであり、$\sum_i j_i\le T+r$。観測率の収束から、固定した $P,\pi,L$ に対しある有限 $M_0$ で全 $j\ge1$ について $H_j\le(1+a)j+M_0$。予定と各ブロックから各加算時のラベル組を復元して $b$ を計算できるので、$Z$ はその決定的関数である。

[接頭語符号の平均長下界](../../../応用系/INFO/INFO4/index.md#thm-info4-entropy-lower) で予定の情報量を符号長で抑え、[連鎖律](../../../応用系/INFO/INFO1/index.md#thm-info1-chain-rule) で予定とラベル列の情報量を足す。決定的関数の情報量は元を上回らないため

$$
H(Z)\le C_2\bigl((T+r)(1+a)+rM_0+(T/r)\log_2(2m)\bigr).
$$

先の $mk$ の下界と合わせて $mr$ で割る。まず $m$ を固定して $r\to\infty$ とする。$k/r\to h/4$、$T/(mr)\to2\beta$、最後の項を割った値は $O(\beta\log(2m)/r)$ で0に収束する。従って

$$
h/4\le C_3\bigl((2\beta+1/m)(1+a)+M_0/m\bigr).
$$

次に $m\to\infty$ とする。$M_0$ は $m,r$ に依存しないので消える。対称化前の情報量は $2h$ 以下であり、絶対定数を変更すれば結論となる。
<!-- proof-end -->

加法定数1を落とすと偽になる。2状態の交互遷移を物理歩道、独立一様遷移を需要とすると、どの距離配置でも $\mathcal E_D=\mathcal E_P/2$ である。$\beta=1$ としてよいが、恒等ラベルで $a=0$、需要情報は1ビットである。エントロピー率が0でも、有限の初期情報と遷移の構造には費用が掛かる。

### 3.4 周辺分布が異なるグラフの辺へ戻す

MMX17 では、需要対の分布と物理辺の分布の頂点周辺が異なることを許す必要がある。対称化と自己遷移によって同じ定常分布に揃える。

<a id="cor-mmx13-graph-entropy"></a>

<!-- formal-statement-start -->
> **系（重み付きグラフの条件付き情報量下界）**
>
> ports のない Hadamard 空間のクラス $\mathcal C$ と、有限集合上の二つの順序対分布 $\mu,\alpha$ を取る。$\beta\ge0$ について全配置で $\mathcal E_\mu\le\beta\mathcal E_\alpha$ とする。$\alpha_s=(\alpha+\alpha^\top)/2$ と置けば、絶対定数 $C$ について

$$
H_\mu(Y\mid X)\le C(1+\beta)(1+H_{\alpha_s}(Y\mid X)).
$$

> 特に $\alpha$ の無向の台で各頂点の隣接先が高々 $d\ge2$ 個なら、右辺は $C'(1+\beta)\log_2 d$ 以下となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\mu_s=(\mu+\mu^\top)/2$ の共通周辺を $\rho$、$\alpha_s$ の共通周辺を $\sigma$ とする。$\Delta_\rho$ は $i$ を $\rho$ から引いて $(i,i)$ を返す対分布である。

$$
D_*=(\mu_s+\Delta_\sigma)/2,\qquad
P_*=(\alpha_s+\Delta_\rho)/2
$$

と置く。両者の両周辺は $(\rho+\sigma)/2$。この周辺で質量0の行を除き、各行を周辺質量で割って定常遷移にする。自己対の距離は0、転置のエネルギーは不変だから $\mathcal E_{D_*}=\mathcal E_\mu/2,\ \mathcal E_{P_*}=\mathcal E_\alpha/2$ である。

混合成分を表すラベルを条件に追加すると情報量が減るため

$$
H_{D_*}(Y\mid X)\ge H_{\mu_s}(Y\mid X)/2
\ge H_\mu(Y\mid X)/4.
$$

物理対では成分を表す公平ビット $J$ を追加して上界を取る。[連鎖律](../../../応用系/INFO/INFO1/index.md#thm-info1-chain-rule) で

$$
\begin{aligned}
H_{P_*}(Y\mid X)
&\le H(J\mid X)+H(Y\mid X,J)\\
&\le 1+H_{\alpha_s}(Y\mid X)/2.
\end{aligned}
$$

恒等ラベルではこの一段情報量が定常歩道の率である。[観測エントロピー比較](#thm-mmx13-observable-entropy) に $\max(1,\beta)$ を使い、定数をまとめると第一の結論。第二は [有限離散エントロピーの上下限](../../../応用系/INFO/INFO1/index.md#thm-info1-entropy-bounds) を $\alpha_s$ の各行に使う。各条件付き分布の台は高々 $d$（自己辺を別に数えても $d+1$）なので $H_{\alpha_s}(Y\mid X)\le\log_2(d+1)\le2\log_2 d$。これを代入する。
<!-- proof-end -->

この系の対偶が重要である。需要の情報量が物理辺の情報量に比べて十分大きければ、少なくとも一つの許容空間に両エネルギーの比較を破る配置がある。この時点では複数の要求を一つの配置で同時に満たすとはいっていない。
