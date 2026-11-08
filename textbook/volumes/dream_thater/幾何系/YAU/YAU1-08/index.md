# YAU1-08 二階評価の局所計算

## 1. $C^0$ の次に、計量そのものをどう抑えるか

[Moser反復による一様 $C^0$ 評価](../YAU1-07/index.md#thm-yau1-07-moser)で、連続性のパス上のポテンシャルの大きさは抑えられた。しかし二階微分が暴走すれば、$\omega_\varphi=\omega+i\partial\bar\partial\varphi$ の固有値は大きくなったり零へ近づいたりする。解列の極限で正値性を失わないためには、**計量の相対的な大きさ**を評価する必要がある。

本章では、複素次元 $n\ge1$ の境界のないコンパクト連結Kähler多様体 $(X,\omega)$ を固定し、実数値の滑らかな $\varphi$ に対し

$$
\omega_\varphi=\omega+i\partial\bar\partial\varphi>0,
\qquad
\omega_\varphi^n=e^H\omega^n
$$

を仮定する。$H$ は与えられた滑らかな実関数である。パスでは[体積正規化された密度](../YAU1-05/index.md#def-yau1-05-path)を使い、$H=H_t=\log(1-t+te^F)$ と置く。実Laplacian $\Delta_\omega$ と区別して、[Monge–Ampère作用素の線形化](../YAU1-03/index.md#prop-yau1-03-linearization)と同じ **複素Laplacian** を

$$
L_\omega f=g^{i\bar j}\partial_i\partial_{\bar j}f
=\tfrac12\Delta_\omega f,
\qquad
L_\varphi f=h^{i\bar j}\partial_i\partial_{\bar j}f
$$

と書く。正則座標 $z^1,\ldots,z^n$ では、[Wirtinger微分](../../CM/CM2-02/index.md#def-cm2-02-wirtinger-operators)に従い

$$
\partial_i=\frac{\partial}{\partial z^i},\qquad
\partial_{\bar j}=\frac{\partial}{\partial\bar z^j},\qquad
\varphi_{i\bar j}:=\partial_i\partial_{\bar j}\varphi
$$

とする。$\omega$ と $\omega_\varphi$ の係数行列をそれぞれ

$$
G=(g_{i\bar j}),\qquad
P=(h_{i\bar j})=(g_{i\bar j}+\varphi_{i\bar j})
$$

と書き、$g^{i\bar j}$、$h^{i\bar j}$ はそれぞれ $G$、$P$ の逆行列の成分を表す。以下の添字は $1,\ldots,n$ を走り、明示しない重複添字は和を取る。

今回求めるのは各点で成り立つ微分恒等式と下からの不等式である。コンパクト性を使った**最大値原理による大域閉包**は次章で行う。

## 2. 固有値から相対跡を作る

行列式は体積の積だけを決める。たとえば正値行列 $\operatorname{diag}(M,M^{-1})$ の行列式は $1$ でも、$M\to\infty$ で計量は一様には抑えられない。そこで、$g$ に対する $h$ の各方向の伸縮を足し合わせる。

相対的な伸縮を表すのは、基準計量 $G$ で一つの添字を上げた作用素 $G^{-1}P$ である。ただし通常の基底では $G^{-1}P$ 自体がHermite行列とは限らないので、そのままunitary対角化しない。[正定値行列の平方根](../../../基礎科目/LA/LA6/index.md#thm-la6-psd-square-root)を用いて

$$
C=G^{-1/2}PG^{-1/2},\qquad
G^{1/2}(G^{-1}P)G^{-1/2}=C
$$

とすると、$C$ は正定値Hermite行列であり、$G^{-1}P$ と相似である。

[複素正規作用素のスペクトル定理](../../../基礎科目/LA/LA5/index.md#thm-la5-normal-spectral)をHermite行列 $C$ に適用すれば、unitary行列 $U$ と正の固有値 $\lambda_i>0$ を選んで

$$
U^*CU=\operatorname{diag}(\lambda_1,\ldots,\lambda_n)
$$

とできる。$V=G^{-1/2}U$ の列を新しい基底に取れば

$$
V^*GV=I,\qquad V^*PV=\operatorname{diag}(\lambda_i)
$$

となる。つまりこれは $g$ に関する正規直交基底であり、$h$ も対角化している。逆計量の行列はこの基底で $P^{-1}=\operatorname{diag}(\lambda_i^{-1})$ である。相似変換で跡と行列式は変わらないため、

$$
\operatorname{tr}(G^{-1}P)=\sum_i\lambda_i,\quad
\operatorname{tr}(P^{-1}G)=\sum_i\lambda_i^{-1},\quad
\frac{\det P}{\det G}=\prod_i\lambda_i
$$

と計算できる。これが次の三量を固有値で判定できる理由である。

<a id="def-yau1-08-relative-traces"></a>

<!-- formal-statement-start -->
> **定義（Kähler計量の相対跡と逆跡）**
> 同じ複素次元 $n$ のKähler計量 $\omega$、$\omega_\varphi$ がともに正値であるとき、各点で

$$
S:=\operatorname{tr}_\omega\omega_\varphi
=g^{i\bar j}h_{i\bar j}=\sum_{i=1}^n\lambda_i,
\qquad
T:=\operatorname{tr}_{\omega_\varphi}\omega
=h^{i\bar j}g_{i\bar j}=\sum_{i=1}^n\lambda_i^{-1}
$$

> をそれぞれ **相対跡**、**逆跡** とする。$\lambda_i$ は $g$ に関する $h$ の正の相対固有値であり、体積比は

$$
\frac{\omega_\varphi^n}{\omega^n}
=\frac{\det P}{\det G}
=\prod_{i=1}^n\lambda_i=e^H.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-yau1-08-relative-traces -->
**定義の確認**。$\mathbb C^2$ 上の定数係数計量 $G=I$、$P=\operatorname{diag}(2,3)$ を取る。どちらもHermite対称であり、零でない $v=(v^1,v^2)$ に対して

$$
v^*Gv=|v^1|^2+|v^2|^2>0,\qquad
v^*Pv=2|v^1|^2+3|v^2|^2>0
$$

である。係数が一定だから対応する実 $(1,1)$ 形式はともに閉じ、[Kähler閉性の局所判定](../../KAH/KAH1-02/index.md#thm-kah1-02-local-closedness)も満たす。さらに

$$
\varphi=|z^1|^2+2|z^2|^2,\qquad
P=G+(\partial_i\partial_{\bar j}\varphi)
$$

なので、本章で扱う二つの計量の形にもなっている。相対固有値が $2,3$ と分かるのは、$G$ が単位行列で $P$ が対角であるためだ。このとき

$$
G^{-1}P=\operatorname{diag}(2,3),
\qquad S=2+3=5.
$$

逆向きの伸縮は次のとおり。

$$
P^{-1}G=\operatorname{diag}(1/2,1/3),
\qquad T=\frac12+\frac13=\frac56.
$$

両体積形式は同じ正則座標の外積基底を用いる。[行列式による体積比](../YAU1-03/index.md#def-yau1-03-log-ma)で

$$
\frac{\det P}{\det G}=\frac{2\cdot3}{1}=6=e^H.
$$

こうして定義の三量を別々に確かめた。一般に $S$、$T$、$e^H$ は互換ではない。
<!-- definition-example-end -->

相対跡を $\varphi$ と直接結ぶと、逆行列と二階微分の縮約から

$$
S=n+L_\omega\varphi,
\qquad
L_\varphi\varphi=n-T.
$$

第一式は $h=g+\varphi_{i\bar j}$ を $g^{i\bar j}$ で縮約し、第二式は同じ式を $h^{i\bar j}$ で縮約したものだ。**$S$ を制御すれば $\varphi$ の複素Hessianを上から抑える可能性がある**一方、$T$ は後で補助関数のLaplacianに現れる。

## 3. 対数行列式を二回微分すると平方和が現れる

局所計算に入る前に、なぜ三階微分が現れるかを見る。$H=\log\det P-\log\det G$ を二階微分すれば、$P$ の一次微分どうしの積が出る。これは捨てる誤差ではなく、後で $\log S$ の勾配を吸収する正の項である。

<a id="lem-yau1-08-logdet-second"></a>

<!-- formal-statement-start -->
> **補題（対数行列式の二階微分公式）**
> 正値Hermite行列値の滑らかな関数 $P(z)$ を正則座標領域に取り、点 $p$ で $P(p)=\operatorname{diag}(\lambda_1,\ldots,\lambda_n)$、$\lambda_i>0$ とする。任意の $k$ について、すべての成分・微分を $p$ で評価すれば

$$
\partial_k\partial_{\bar k}\log\det P
=\sum_i\frac{\partial_k\partial_{\bar k}h_{i\bar i}}{\lambda_i}
-\sum_{i,j}\frac{|\partial_kh_{i\bar j}|^2}{\lambda_i\lambda_j}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

[Jacobiの行列式微分公式](../../KAH/KAH1-11/index.md#lem-kah1-11-jacobi)を一回使って $\partial_k\log\det P=\operatorname{tr}(P^{-1}\partial_kP)$ とし、逆行列の微分を明示してから点 $p$ で対角化する。

<!-- proof-start -->
### 証明

$PP^{-1}=I$ を $\partial_{\bar k}$ で微分すると

$$
(\partial_{\bar k}P)P^{-1}
+P\partial_{\bar k}(P^{-1})=0,
\qquad
\partial_{\bar k}(P^{-1})
=-P^{-1}(\partial_{\bar k}P)P^{-1}.
$$

正値性より $P$ は可逆であり、[Jacobi公式](../../KAH/KAH1-11/index.md#lem-kah1-11-jacobi)を $\partial_k$ 方向に適用できる。さらに積を微分して

$$
\begin{aligned}
\partial_k\partial_{\bar k}\log\det P
&=\partial_{\bar k}\operatorname{tr}(P^{-1}\partial_kP)\\
&=\operatorname{tr}(P^{-1}\partial_k\partial_{\bar k}P)
-\operatorname{tr}(P^{-1}(\partial_{\bar k}P)P^{-1}(\partial_kP)).
\end{aligned}
$$

点 $p$ では $(P^{-1})^{i\bar j}=\delta_{ij}/\lambda_i$。後者の跡を成分まで戻すと

$$
\sum_{i,j}\frac{(\partial_{\bar k}h_{i\bar j})
(\partial_kh_{j\bar i})}{\lambda_i\lambda_j}
=\sum_{i,j}\frac{|\partial_kh_{j\bar i}|^2}{\lambda_i\lambda_j}.
$$

ここではHermite対称性 $h_{i\bar j}=\overline{h_{j\bar i}}$ と実変数の微分に対する複素共役則を使った。$i,j$ はダミー添字なので交換でき、補題の平方和を得る。$\square$
<!-- proof-end -->

**符号の注意。** $\log\det$ の二階微分では平方和に負号が付く。しかし方程式から $h$ の二階微分を解くと、その平方和は**正号で右辺へ移る**。この操作を省くと後の勾配の相殺を見失う。

## 4. Kähler正規座標で曲率項を取り出す

任意の点 $p\in X$ を取る。[Kähler正規座標の局所存在](../../KAH/KAH1-08/index.md#thm-kah1-08-normal-existence)により、$g(p)=I$、$\partial_k g_{i\bar j}(p)=0$ となる正則座標を取れる。その点で正値Hermite行列 $P(p)$ を**定数のunitary行列**で対角化しても、$g$ の一階微分零は保たれる。以後、$p$ において

$$
g_{i\bar j}=\delta_{ij},\quad
\partial_k g_{i\bar j}=0,\quad
h_{i\bar j}=\lambda_i\delta_{ij},\quad
h^{i\bar j}=\lambda_i^{-1}\delta_{ij}
$$

とする。**この等式は点 $p$ だけのもの**であり、近傍全体で $g=I$ や $P$ が対角だと仮定して微分してはいけない。

[Kähler正規座標での曲率公式](../../KAH/KAH1-09/index.md#prop-kah1-09-normal-curvature)は

$$
R_{i\bar i k\bar k}(p)
=-\partial_i\partial_{\bar i}g_{k\bar k}(p).
$$

一方、$g^{a\bar b}g_{c\bar b}=\delta^a_c$ を二回微分し、$p$ では一階微分項が零であることを使うと

$$
\partial_i\partial_{\bar i}g^{k\bar k}(p)
=-\partial_i\partial_{\bar i}g_{k\bar k}(p)
=R_{i\bar i k\bar k}(p).
$$

これが**逆行列の二階微分と曲率を結ぶ橋渡し**である。逆計量の二階微分の符号を、計量の二階微分と取り違えないようにする。

また $g$ と $h$ はともにKähler計量であり、$h$ の基本形式は閉じた実 $(1,1)$ 形式である。[閉実(1,1)形式の局所ポテンシャル定理](../../KAH/KAH1-04/index.md#thm-kah1-04-local-existence)は、こうした形式が局所的に実ポテンシャルを持つことを保証する。したがって点 $p$ の近傍で滑らかな実関数 $u$ を取り、

$$
h_{i\bar j}=\partial_i\partial_{\bar j}u
$$

と表せる。ここから偏微分の交換により

$$
\partial_i\partial_{\bar i}h_{k\bar k}
=\partial_k\partial_{\bar k}h_{i\bar i},
\qquad
\partial_kh_{i\bar i}=\partial_i h_{k\bar i}.
$$

前者は二階、後者は一階の **Kähler添字交換**である。一般のHermite計量では正値性だけからは従わない。

<a id="thm-yau1-08-trace-laplacian"></a>

<!-- formal-statement-start -->
> **定理（相対跡の局所Laplacian恒等式）**
> $(X,\omega)$ を滑らかなKähler多様体、$\omega_\varphi=\omega+i\partial\bar\partial\varphi>0$ を滑らかなKähler計量とする。$\omega_\varphi^n=e^H\omega^n$ と仮定する。任意の点 $p$ の上記のKähler正規座標で $S=\operatorname{tr}_\omega\omega_\varphi=\sum_i\lambda_i$ と書けば

$$
\boxed{
L_\varphi S
=L_\omega H
+\mathcal Q
+\sum_{i,k}R_{i\bar i k\bar k}
\left(\frac{\lambda_k}{\lambda_i}-1\right)
},
\qquad
\mathcal Q:=\sum_{i,j,k}
\frac{|\partial_kh_{i\bar j}|^2}{\lambda_i\lambda_j}\ge0.
$$

> $R$ は背景計量 $\omega$ の曲率であり、各成分と微分は $p$ での値である。$L_\varphi=\tfrac12\Delta_{\omega_\varphi}$ の規約を使う。
<!-- formal-statement-end -->

### 証明の見取り図

$L_\varphi S$ のうち、逆計量 $g^{-1}$ の二階微分は背景曲率になる。$h$ の二階微分はKähler添字交換を経て、[対数行列式の二階微分公式](#lem-yau1-08-logdet-second)によって $H$ と正の平方和へ変わる。背景のRicci縮約を差し引くことで $\lambda_k/\lambda_i-1$ が現れる。

<!-- proof-start -->
### 証明

$S=g^{k\bar\ell}h_{k\bar\ell}$ を二回微分する。点 $p$ では $g$ の一階微分が零なので、逆計量の一階微分も零である。よって積の微分の交差項は消え、

$$
\begin{aligned}
L_\varphi S(p)
&=\sum_i\frac1{\lambda_i}
\partial_i\partial_{\bar i}(g^{k\bar\ell}h_{k\bar\ell})\\
&=\sum_{i,k}\frac1{\lambda_i}
\partial_i\partial_{\bar i}h_{k\bar k}
+\sum_{i,k}\frac{\lambda_k}{\lambda_i}
\partial_i\partial_{\bar i}g^{k\bar k}\\
&=\sum_{i,k}\frac1{\lambda_i}
\partial_k\partial_{\bar k}h_{i\bar i}
+\sum_{i,k}\frac{\lambda_k}{\lambda_i}
R_{i\bar i k\bar k}.
\end{aligned}
$$

第二行の最後の項は $h(p)$ が対角であること、第三行は前節の**Kähler添字交換**と[Kähler正規座標での曲率](../../KAH/KAH1-09/index.md#prop-kah1-09-normal-curvature)による。次に $H=\log\det P-\log\det G$ を $\partial_k\partial_{\bar k}$ で微分し、[対数行列式の二階微分公式](#lem-yau1-08-logdet-second)を適用して

$$
\sum_i\frac{\partial_k\partial_{\bar k}h_{i\bar i}}{\lambda_i}
=\partial_k\partial_{\bar k}H
+\partial_k\partial_{\bar k}\log\det G
+\sum_{i,j}\frac{|\partial_kh_{i\bar j}|^2}{\lambda_i\lambda_j}.
$$

[Ricci形式の局所行列式公式](../../KAH/KAH1-11/index.md#thm-kah1-11-local-ricci)と[曲率のRicci縮約](../../KAH/KAH1-10/index.md#def-kah1-10-ricci-contraction)により、正規座標で

$$
\partial_k\partial_{\bar k}\log\det G
=-\operatorname{Ric}_{k\bar k}(g)
=-\sum_i R_{i\bar i k\bar k}.
$$

したがって $k$ で和を取れば第一項は $L_\omega H$、第三項は $\mathcal Q$、Ricci項は $-\sum_{i,k}R_{i\bar i k\bar k}$ となる。これを最初の式へ代入すると定理の等式を得る。$\mathcal Q$ は正の $\lambda_i\lambda_j$ で割った絶対値平方の和だから非負である。$\square$
<!-- proof-end -->

**最低限の整合性テスト。** $\varphi=0$ なら $h=g$、$H=0$、$\lambda_i=1$、$S=n$ である。左辺 $L_\varphi S=0$、右辺の $H$ の微分・平方和・曲率係数 $\lambda_k/\lambda_i-1$ はすべて零になる。曲率の符号を単独で取り違えると、このテストで矛盾が出る。

## 5. なぜ $\log S$ にしても三階微分が邪魔しないのか

最大値原理へ渡したい量は $S$ ではなく $\log S$ である。$S>0$ より対数が定義され、連鎖律は

$$
L_\varphi\log S
=\frac{L_\varphi S}{S}
-\frac{|\partial S|_{\omega_\varphi}^2}{S^2},
\qquad
|\partial S|_{\omega_\varphi}^2
=\sum_k\frac{|\partial_kS|^2}{\lambda_k}.
$$

となる。最後の**負の勾配項**を単に捨てることはできない。ところが前節の $\mathcal Q$ には、必要な成分がちょうど含まれている。

<a id="lem-yau1-08-gradient-absorption"></a>

<!-- formal-statement-start -->
> **補題（三階微分の勾配吸収）**
> 相対跡の局所Laplacian恒等式の仮定の下、点 $p$ のKähler正規座標で

$$
|\partial S|_{\omega_\varphi}^2\le S\mathcal Q,
\qquad
\frac{\mathcal Q}{S}
-\frac{|\partial S|_{\omega_\varphi}^2}{S^2}\ge0.
$$

> が成り立つ。$S$、$\mathcal Q$ は前節で定義した正の量である。
<!-- formal-statement-end -->

### 証明の見取り図

Kähler条件により $\partial_kS=\sum_i\partial_i h_{k\bar i}$ と添字を交換する。この和に、**重み $\lambda_i$ を付けた[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)**を適用する。その平方和は $\mathcal Q$ の一部であり、残りは非負である。

<!-- proof-start -->
### 証明

$p$ で $\partial_k g^{i\bar j}=0$ なので

$$
\partial_kS
=\sum_i\partial_kh_{i\bar i}
=\sum_i\partial_i h_{k\bar i}.
$$

第二等号は $h$ がKählerであることを使った。$\lambda_i>0$ より、有限和の[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)を $a_i=\sqrt{\lambda_i}$、$b_i=\partial_i h_{k\bar i}/\sqrt{\lambda_i}$ に適用して

$$
\begin{aligned}
|\partial_kS|^2
&=\left|\sum_i\sqrt{\lambda_i}
\frac{\partial_i h_{k\bar i}}{\sqrt{\lambda_i}}\right|^2\\
&\le\left(\sum_i\lambda_i\right)
\left(\sum_i\frac{|\partial_i h_{k\bar i}|^2}{\lambda_i}\right)
=S\sum_i\frac{|\partial_i h_{k\bar i}|^2}{\lambda_i}.
\end{aligned}
$$

両辺を $\lambda_k$ で割って $k$ にわたり足すと

$$
\sum_k\frac{|\partial_kS|^2}{\lambda_k}
\le S\sum_{i,k}
\frac{|\partial_i h_{k\bar i}|^2}{\lambda_i\lambda_k}
\le S\sum_{i,j,k}
\frac{|\partial_kh_{i\bar j}|^2}{\lambda_i\lambda_j}
=S\mathcal Q.
$$

最後の不等号は、中央の和が $\mathcal Q$ に現れる成分（微分添字と行・列添字をダミー添字として付け直したもの）の部分和で、残りの項も非負であることから従う。$S>0$ で割れば第二式も得る。$\square$
<!-- proof-end -->

ここまでの大切な点は、**三階微分を零と仮定していない**ことである。三階微分の平方和を正確に残すからこそ、負の勾配二乗を相殺できる。

<a id="prop-yau1-08-log-trace"></a>

<!-- formal-statement-start -->
> **命題（対数跡の局所下界）**
> 滑らかなKähler計量 $\omega$、$\omega_\varphi=\omega+i\partial\bar\partial\varphi>0$ が $\omega_\varphi^n=e^H\omega^n$ を満たすとする。点 $p$ のKähler正規座標で背景曲率を $R_{i\bar i k\bar k}$、相対固有値を $\lambda_i>0$ とすると

$$
\boxed{
L_\varphi\log S
\ge\frac{L_\omega H}{S}
+\frac1S\sum_{i,k}R_{i\bar i k\bar k}
\left(\frac{\lambda_k}{\lambda_i}-1\right).
}
$$

> さらに $|R_{i\bar i k\bar k}|\le B$ が任意の背景 $g$ 正規直交基底で成立し、$|L_\omega H|\le A$、$e^H\ge m>0$ なら

$$
L_\varphi\log S
\ge -B\,\operatorname{tr}_{\omega_\varphi}\omega
-\frac{A+Bn^2}{n\,m^{1/n}}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

[相対跡恒等式](#thm-yau1-08-trace-laplacian)を $S$ で割り、[三階微分の勾配吸収](#lem-yau1-08-gradient-absorption)を使う。曲率項は相対固有値と逆固有値の積で抑え、$S$ の下界には行列式の積 $e^H$ を使う。

<!-- proof-start -->
### 証明

[局所恒等式](#thm-yau1-08-trace-laplacian)を対数の連鎖律へ代入すると

$$
\begin{aligned}
L_\varphi\log S
&=\frac{L_\omega H}{S}
+\frac1S\sum_{i,k}R_{i\bar i k\bar k}
\left(\frac{\lambda_k}{\lambda_i}-1\right)\\
&\quad+\frac{\mathcal Q}{S}
-\frac{|\partial S|_{\omega_\varphi}^2}{S^2}.
\end{aligned}
$$

[吸収補題](#lem-yau1-08-gradient-absorption)によって最後の二項の和は非負である。これで最初の下界を得る。

次に $|R_{i\bar i k\bar k}|\le B$ と $\lambda_i>0$ から

$$
\begin{aligned}
\sum_{i,k}R_{i\bar i k\bar k}
\left(\frac{\lambda_k}{\lambda_i}-1\right)
&\ge -B\sum_{i,k}
\left(\frac{\lambda_k}{\lambda_i}+1\right)\\
&=-B\left(
\sum_k\lambda_k\sum_i\lambda_i^{-1}+n^2
\right)\\
&=-B(ST+n^2).
\end{aligned}
$$

さらに正の数の算術平均は幾何平均以上であるから、

$$
S=\sum_i\lambda_i
\ge n\left(\prod_i\lambda_i\right)^{1/n}
=ne^{H/n}\ge n m^{1/n}.
$$

$L_\omega H\ge-A$ と合わせて

$$
\frac{L_\omega H}{S}
-\frac{B(ST+n^2)}{S}
\ge -BT-\frac{A+Bn^2}{S}
\ge -BT-\frac{A+Bn^2}{nm^{1/n}}.
$$

これが主張する不等式である。$\square$
<!-- proof-end -->

### 密度の下界と曲率の役割

$m>0$ は単なる便利な仮定ではない。行列式の積 $\prod_i\lambda_i$ が零へ退化できるなら、算術幾何平均による $S$ の正の下界をパラメータ一様には確保できず、$1/S$ を含む項を一定値で抑えられない。一方、$S$ の**上界**はまだ全く得ていない。これを確保するのが次章の最大値原理の役割である。

## 6. 連続性のパスで定数が本当に一様か

コンパクト性で背景曲率の成分は一様に有界である。残る $H_t=\log\rho_t$ の二階微分が、解の存在する時刻 $t$ に依存せず有界かを確認する。

<a id="cor-yau1-08-path"></a>

<!-- formal-statement-start -->
> **系（連続性のパスに一様な局所不等式）**
> $(X,\omega)$ を境界のないコンパクト連結Kähler多様体、$F\in C^\infty(X,\mathbb R)$ を $\int_Xe^F\omega^n=\int_X\omega^n$ を満たす固定関数とする。解が存在する $t\in[0,1]$ に対し

$$
\omega_{\varphi_t}>0,\qquad
\omega_{\varphi_t}^{n}=(1-t+te^F)\omega^n
$$

> とする。このとき $(X,\omega,F)$ のみに依存する定数 $B,C\ge0$ が存在し、すべてのそのような $t$ とすべての $x\in X$ で

$$
L_{\varphi_t}\log
\operatorname{tr}_\omega\omega_{\varphi_t}
\ge-B\operatorname{tr}_{\omega_{\varphi_t}}\omega-C.
$$

> が成立する。$B,C$ は解 $\varphi_t$ の二階・三階微分には依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

$\rho_t$ に一様な正の下界があり、$L_\omega\log\rho_t$ には $F$ の固定した一階・二階微分しか現れない。[対数跡の局所下界](#prop-yau1-08-log-trace)へその定数を代入する。

<!-- proof-start -->
### 証明

$u=e^F$ と置き、$m=\min\{1,\min_Xu\}>0$、$M=\max\{1,\max_Xu\}$ とする。$0\le t\le1$ で

$$
m\le\rho_t=1+t(u-1)\le M,\qquad
\partial_i\rho_t=t\partial_i u,\qquad
\partial_i\partial_{\bar j}\rho_t
=t\partial_i\partial_{\bar j}u.
$$

複素Laplacianを直接計算すれば

$$
L_\omega H_t
=\frac{t}{\rho_t}L_\omega u
-\frac{t^2}{\rho_t^2}|\partial u|_\omega^2.
$$

従って各点で

$$
|L_\omega H_t|
\le\frac{\|L_\omega u\|_\infty}{m}
+\frac{\||\partial u|_\omega^2\|_\infty}{m^2}
=:A<\infty.
$$

右辺は固定した $u=e^F$ と背景 $\omega$ のみで決まる。さらにコンパクト性から背景の曲率成分には、任意の正規直交枠に対して共通の上界 $B$ がある。[前命題](#prop-yau1-08-log-trace)に $A,B,m$ を代入し、$C=(A+Bn^2)/(nm^{1/n})$ とすればよい。$\square$
<!-- proof-end -->

## 7. 手で追う二つの例と、失敗する仮定

**例1：複素一次元での完全な一致。** $n=1$ では体積方程式から $h=\rho g$、$S=\rho=e^H$、$T=1/\rho$ である。どの正則座標でも

$$
L_\varphi\log S
=\rho^{-1}L_\omega H.
$$

曲率和は $\lambda_1/\lambda_1-1=0$ により消える。また $L_\varphi S$ の三階微分平方項と $L_\varphi\log S$ の負の勾配項はちょうど相殺する。一次元では相対跡の制御は右辺密度そのものの制御であり、二次元以上のように異なる固有値を調整する問題がない。

**例2：平坦な複素二次元トーラス。** $X=(\mathbb C/(\mathbb Z+i\mathbb Z))^2$、$\omega=i\sum_{j=1}^2dz^j\wedge d\bar z^j$ とする。$z^j=x_j+iy_j$ に対し $|a|<1$ として

$$
\varphi=\frac{a}{\pi^2}
\bigl(\cos(2\pi x_1)+\cos(2\pi x_2)\bigr),
\qquad
\lambda_j=1-a\cos(2\pi x_j).
$$

[Wirtinger微分](../../CM/CM2-02/index.md#def-cm2-02-wirtinger-operators)から $\partial_j\partial_{\bar j}\varphi=-a\cos(2\pi x_j)$、混合成分は零であり、$\lambda_j\ge1-|a|>0$ により $\omega_\varphi$ は正のKähler形式である。$S=\lambda_1+\lambda_2$、$e^H=\lambda_1\lambda_2$、$R=0$。さらに

$$
\partial_j\lambda_j=a\pi\sin(2\pi x_j),\qquad
\partial_j\partial_{\bar j}\lambda_j
=a\pi^2\cos(2\pi x_j).
$$

したがって

$$
\begin{aligned}
L_\varphi S
&=\sum_{j=1}^2
\frac{a\pi^2\cos(2\pi x_j)}{\lambda_j},\\
L_\omega H
&=\sum_{j=1}^2
\left(
\frac{a\pi^2\cos(2\pi x_j)}{\lambda_j}
-\frac{a^2\pi^2\sin^2(2\pi x_j)}{\lambda_j^2}
\right),\\
\mathcal Q
&=\sum_{j=1}^2
\frac{a^2\pi^2\sin^2(2\pi x_j)}{\lambda_j^2}.
\end{aligned}
$$

三式を合わせると、背景曲率零の場合の[局所恒等式](#thm-yau1-08-trace-laplacian)がすべての点で直接確かめられる。$a=0$ なら各量は平坦な基準計量の場合に戻る。

**失敗例：正値Hermite係数だけでは足りない。** $\mathbb C^2$ の原点近くで $g=I$、$h=\operatorname{diag}(1+\varepsilon|z^2|^2,1)$ とし $\varepsilon>0$ とする。$h$ は正値Hermiteだが

$$
\partial_2\partial_{\bar2}h_{1\bar1}(0)
=\varepsilon,
\qquad
\partial_1\partial_{\bar1}h_{2\bar2}(0)=0.
$$

従って第4節の **Kähler添字交換**が破れる。$h$ に対応する $(1,1)$ 形式は閉じておらず、局所的に $h=g+\partial\bar\partial\varphi$ とも書けない。単に $h>0$ と行列式方程式だけを仮定して本章の恒等式を流用してはいけない。

## 8. 演習：局所恒等式を自分で組み立てる

### Level A

#### YAU1-08-A01 相対固有値と三つの量
- Level: A

正値Kähler計量の相対固有値が一点で $(4,1/2)$ のとき、$S$、$T$、$e^H$ を計算せよ。また $\lambda=(M,M^{-1})$（$M>0$）では、体積比一定でも $S$ が有界でないことを示せ。

<!-- solution-start -->
**詳細解答。** [相対跡の定義](#def-yau1-08-relative-traces)を各固有値に適用すると

$$
S=4+\frac12=\frac92,\qquad
T=\frac14+2=\frac94,\qquad
e^H=4\cdot\frac12=2.
$$

$\lambda=(M,M^{-1})$ の場合は $e^H=M\cdot M^{-1}=1$ だが $S=M+M^{-1}\ge M$。$M\to\infty$ とすれば $S\to\infty$ である。行列式だけで相対跡を抑えられない。
<!-- solution-end -->

#### YAU1-08-A02 逆行列の二階微分
- Level: A

$g(0)=I$、$\partial g(0)=0$ である滑らかなKähler計量について、$gg^{-1}=I$ の二回微分から $\partial_i\partial_{\bar i}g^{k\bar k}(0)$ を求め、背景曲率の符号と照合せよ。

<!-- solution-start -->
**詳細解答。** 積の一次微分は $(\partial_i g)g^{-1}+g\partial_i(g^{-1})=0$。原点では $g=I$、$\partial_i g=0$ なので $\partial_i g^{-1}=0$。さらに $\partial_{\bar i}$ で微分すると、交差項はすべて零となり、

$$
(\partial_i\partial_{\bar i}g)g^{-1}
+g\partial_i\partial_{\bar i}(g^{-1})=0.
$$

原点で $g=I$ を**微分後に**代入して $\partial_i\partial_{\bar i}g^{k\bar k}=-\partial_i\partial_{\bar i}g_{k\bar k}$。[Kähler正規座標での曲率](../../KAH/KAH1-09/index.md#prop-kah1-09-normal-curvature)により、これは $R_{i\bar i k\bar k}$ である。
<!-- solution-end -->

#### YAU1-08-A03 対数行列式の二階微分
- Level: A

一点で $P=\operatorname{diag}(\lambda_1,\lambda_2)$、$\lambda_i>0$ とする。$k=1$ のとき、$\partial_1\partial_{\bar1}\log\det P$ の式の平方和を全成分で書け。

<!-- solution-start -->
**詳細解答。** [対数行列式補題](#lem-yau1-08-logdet-second)を $n=2$、$k=1$ に使う。成分の一階・二階微分はそれぞれ $\partial_1h_{i\bar j}$、$\partial_1\partial_{\bar1}h_{i\bar j}$ と書く。平方和は $i,j\in\{1,2\}$ の4項だから

$$
\begin{aligned}
\partial_1\partial_{\bar1}\log\det P
&=\frac{\partial_1\partial_{\bar1}h_{1\bar1}}{\lambda_1}
+\frac{\partial_1\partial_{\bar1}h_{2\bar2}}{\lambda_2}\\
&\quad-\frac{|\partial_1h_{1\bar1}|^2}{\lambda_1^2}
-\frac{|\partial_1h_{1\bar2}|^2+|\partial_1h_{2\bar1}|^2}
{\lambda_1\lambda_2}
-\frac{|\partial_1h_{2\bar2}|^2}{\lambda_2^2}.
\end{aligned}
$$

例えば非対角成分が零でも、$\lambda_i$ の微分に対応する対角項は一般に消えない。$P$ が**一点でのみ**対角であることを、近傍で非対角項が零と混同しない。
<!-- solution-end -->

#### YAU1-08-A04 Kähler添字交換
- Level: A

局所ポテンシャル $u\in C^\infty(U,\mathbb R)$ から $h_{i\bar j}=\partial_i\partial_{\bar j}u$ を定める。$\partial_kh_{i\bar i}=\partial_i h_{k\bar i}$ と $\partial_i\partial_{\bar i}h_{k\bar k}=\partial_k\partial_{\bar k}h_{i\bar i}$ を証明せよ。

<!-- solution-start -->
**詳細解答。** 一階では

$$
\partial_kh_{i\bar i}
=\partial_k\partial_i\partial_{\bar i}u
=\partial_i\partial_k\partial_{\bar i}u
=\partial_i h_{k\bar i}.
$$

二階では

$$
\begin{aligned}
\partial_i\partial_{\bar i}h_{k\bar k}
&=\partial_i\partial_{\bar i}\partial_k\partial_{\bar k}u\\
&=\partial_k\partial_{\bar k}\partial_i\partial_{\bar i}u
=\partial_k\partial_{\bar k}h_{i\bar i}.
\end{aligned}
$$

滑らかさによる偏微分交換を用いた。正値Hermite行列であるだけでは、局所ポテンシャルの存在を仮定できない。
<!-- solution-end -->

#### YAU1-08-A05 複素一次元の等号
- Level: A

複素次元 $1$ のKähler計量 $h=\rho g$（$\rho>0$ は滑らか）について、$L_h\log\operatorname{tr}_g h=\rho^{-1}L_g\log\rho$ を導け。

<!-- solution-start -->
**詳細解答。** 一次元では $S=g^{1\bar1}h_{1\bar1}=\rho$、逆成分は $h^{1\bar1}=\rho^{-1}g^{1\bar1}$。従って

$$
L_h\log S
=h^{1\bar1}\partial_1\partial_{\bar1}\log\rho
=\rho^{-1}g^{1\bar1}\partial_1\partial_{\bar1}\log\rho
=\rho^{-1}L_g\log\rho.
$$

曲率項の係数は $\lambda_1/\lambda_1-1=0$。一次元では[局所下界](#prop-yau1-08-log-trace)の三階微分吸収が実際に等号になる。
<!-- solution-end -->

### Level B

#### YAU1-08-B01 平坦二次元トーラスで恒等式を検算
- Level: B

第7節のトーラスとポテンシャルについて、$L_\varphi S$ と $L_\omega H+\mathcal Q$ を別々に計算し、同じ関数になることを示せ。$|a|<1$ の役割も述べよ。

<!-- solution-start -->
**詳細解答。** 平坦座標では $g=I$、$h=\operatorname{diag}(\lambda_1,\lambda_2)$、$\lambda_j=1-a\cos(2\pi x_j)$。$|a|<1$ より $\lambda_j\ge1-|a|>0$ だから、二つのKähler計量は正値で対数・逆数が定義できる。$\partial_j=(\partial_{x_j}-i\partial_{y_j})/2$ を使うと

$$
\lambda_{j,j}=a\pi\sin(2\pi x_j),\quad
\lambda_{j,j\bar j}=a\pi^2\cos(2\pi x_j).
$$

$S=\lambda_1+\lambda_2$ を $L_\varphi$ に代入すると

$$
L_\varphi S=\sum_j\frac{a\pi^2\cos(2\pi x_j)}{\lambda_j}.
$$

$H=\log\lambda_1+\log\lambda_2$ と表せる。各 $j$ について

$$
\partial_j\partial_{\bar j}\log\lambda_j
=\frac{\lambda_{j,j\bar j}}{\lambda_j}
-\frac{|\lambda_{j,j}|^2}{\lambda_j^2}
$$

を計算してから和を取ると

$$
L_\omega H=\sum_j\left(
\frac{a\pi^2\cos(2\pi x_j)}{\lambda_j}
-\frac{a^2\pi^2\sin^2(2\pi x_j)}{\lambda_j^2}
\right).
$$

$h$ の非零の一次微分は $\partial_jh_{j\bar j}=a\pi\sin(2\pi x_j)$ だけであり、

$$
\mathcal Q=\sum_j\frac{a^2\pi^2\sin^2(2\pi x_j)}{\lambda_j^2}.
$$

後二式を足せば第一式になる。背景曲率は平坦なので零であり、[恒等式](#thm-yau1-08-trace-laplacian)の完全な検算である。
<!-- solution-end -->

#### YAU1-08-B02 重み付きCauchy–Schwarzと添字
- Level: B

点 $p$ で $g=I$、$\partial g=0$、$h=\operatorname{diag}(\lambda_i)$ とし、$h$ はKählerとする。$\partial_kS=\sum_i\partial_i h_{k\bar i}$ から、$|\partial S|_h^2\le S\mathcal Q$ を導け。$\mathcal Q$ のどの項を使ったかを述べよ。

<!-- solution-start -->
**詳細解答。** [Kähler添字交換](#thm-yau1-08-trace-laplacian)の前に確認した式から、$\partial_kS=\sum_i\partial_i h_{k\bar i}$。$\lambda_i>0$ を使った[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)は

$$
|\partial_kS|^2
\le\left(\sum_i\lambda_i\right)
\left(\sum_i\frac{|\partial_i h_{k\bar i}|^2}{\lambda_i}\right).
$$

$\lambda_k$ で割り $k$ を足すと

$$
|\partial S|_h^2
\le S\sum_{k,i}\frac{|\partial_i h_{k\bar i}|^2}{\lambda_k\lambda_i}.
$$

この項は $\mathcal Q=\sum_{a,b,c}|\partial_ch_{a\bar b}|^2/(\lambda_a\lambda_b)$ のうち $a=k,b=i,c=i$ の項である。それ以外の項は非負だから $|\partial S|_h^2\le S\mathcal Q$。誤って微分添字 $c$ に分母 $\lambda_c$ を置いた和は、元の $\mathcal Q$ ではない。
<!-- solution-end -->

#### YAU1-08-B03 曲率・密度から一様定数へ
- Level: B

複素次元 $n=2$ で $|R_{i\bar i k\bar k}|\le3$、$|L_\omega H|\le5$、$e^H\ge1/16$ が全点で成立するとする。[対数跡の局所下界](#prop-yau1-08-log-trace)から $L_\varphi\log S\ge-3T-C$ を満たす明示的な $C$ を一つ求めよ。

<!-- solution-start -->
**詳細解答。** 正の相対固有値を $\lambda_1,\lambda_2$ とすると

$$
S\ge 2(\lambda_1\lambda_2)^{1/2}
=2e^{H/2}\ge\frac12.
$$

曲率項は

$$
\sum_{i,k}R_{i\bar i k\bar k}
\left(\frac{\lambda_k}{\lambda_i}-1\right)
\ge-3(ST+4).
$$

従って $L_\varphi\log S\ge-3T-(5+12)/S\ge-3T-34$。$C=34$ と取ればよい。$S\ge1/2$ は行列式の**下界**から得たのであり、二階評価の結論である $S$ の上界を先取りしていない。
<!-- solution-end -->

#### YAU1-08-B04 Kähler性を失うと交換が壊れる
- Level: B

$\mathbb C^2$ の原点近傍に $g=I$ と $h=\operatorname{diag}(1+\varepsilon|z^2|^2,1)$（$\varepsilon>0$）を取る。$h$ の正値性と、$\partial_2\partial_{\bar2}h_{1\bar1}\ne\partial_1\partial_{\bar1}h_{2\bar2}$ を示し、本章のどの証明が使えないか説明せよ。

<!-- solution-start -->
**詳細解答。** $1+\varepsilon|z^2|^2\ge1$ と第二固有値 $1$ により $h$ は正値Hermiteである。しかし $\partial_2\partial_{\bar2}|z^2|^2=1$ なので

$$
\partial_2\partial_{\bar2}h_{1\bar1}(0)=\varepsilon,
\qquad
\partial_1\partial_{\bar1}h_{2\bar2}(0)=0.
$$

従って[相対跡の局所恒等式](#thm-yau1-08-trace-laplacian)の証明で使った $h_{k\bar k,i\bar i}=h_{i\bar i,k\bar k}$ が成立しない。また $\partial_kS=\sum_i\partial_i h_{k\bar i}$ もKähler性がないと保証できず、[吸収補題](#lem-yau1-08-gradient-absorption)の同じ議論を移植できない。正値性と閉性は異なる仮定である。
<!-- solution-end -->

### Level C

#### YAU1-08-C01 局所二階評価の主鎖を再導出
- Level: C

コンパクトKähler多様体 $(X,\omega)$ の複素次元を $n\ge1$ とし、$\omega_\varphi=\omega+i\partial\bar\partial\varphi>0$ が $\omega_\varphi^n=e^H\omega^n$ を満たすとする。$|L_\omega H|\le A$、$e^H\ge m>0$、背景曲率はすべてのunitary枠で $|R_{i\bar i k\bar k}|\le B$ と仮定する。

1. 任意の点で正規座標を取り、$L_\varphi S$ を $H$、三階微分、背景曲率で表せ。
2. $L_\varphi\log S$ へ移る際の負の項を、三階微分の平方和で吸収せよ。
3. $L_\varphi\log S\ge-BT-(A+Bn^2)/(nm^{1/n})$ を証明し、これだけではまだ $S$ の上界が出ない理由を述べよ。

<!-- solution-start -->
**詳細解答。** $p$ を任意に固定し、[Kähler正規座標の存在](../../KAH/KAH1-08/index.md#thm-kah1-08-normal-existence)により $g=I$、$\partial g=0$、定数unitary変換で $h=\operatorname{diag}(\lambda_i)$ とする。$\lambda_i>0$ だからすべての分母は定義できる。$S=\sum_i\lambda_i$、$T=\sum_i\lambda_i^{-1}$ である。

まず $L_\varphi S$ を積の微分で展開し、背景逆計量の二階微分に[曲率公式](../../KAH/KAH1-09/index.md#prop-kah1-09-normal-curvature)を代入する。二つのKähler計量の局所ポテンシャルから $h_{k\bar k,i\bar i}=h_{i\bar i,k\bar k}$ を得る。[対数行列式の二階微分公式](#lem-yau1-08-logdet-second)と $H=\log\det h-\log\det g$ を合わせると

$$
L_\varphi S
=L_\omega H+\sum_{i,j,k}
\frac{|\partial_kh_{i\bar j}|^2}{\lambda_i\lambda_j}
+\sum_{i,k}R_{i\bar i k\bar k}
\left(\frac{\lambda_k}{\lambda_i}-1\right).
$$

最後の $-1$ は $\partial_k\partial_{\bar k}\log\det g=-\sum_iR_{i\bar i k\bar k}$ による。次に対数の連鎖律から

$$
L_\varphi\log S
=\frac{L_\varphi S}{S}
-\frac{1}{S^2}\sum_k\frac{|\partial_k S|^2}{\lambda_k}.
$$

Kähler性と $\partial g=0$ より $\partial_k S=\sum_i\partial_i h_{k\bar i}$。[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)に $\sqrt{\lambda_i}$ と $\partial_i h_{k\bar i}/\sqrt{\lambda_i}$ を入れると

$$
\sum_k\frac{|\partial_k S|^2}{\lambda_k}
\le S\sum_{k,i}\frac{|\partial_i h_{k\bar i}|^2}{\lambda_k\lambda_i}
\le S\mathcal Q.
$$

よって $\mathcal Q/S-|\partial S|_h^2/S^2\ge0$ である。曲率は

$$
\sum_{i,k}R_{i\bar i k\bar k}(\lambda_k/\lambda_i-1)
\ge-B(ST+n^2)
$$

と抑えられ、正の相対固有値の算術幾何平均から $S\ge ne^{H/n}\ge nm^{1/n}$。従って

$$
L_\varphi\log S
\ge\frac{-A-B(ST+n^2)}{S}
\ge-BT-\frac{A+Bn^2}{nm^{1/n}}.
$$

これは各点で成り立つ**Laplacianの下界**である。右辺にはまだ未知の $T$ が残り、$S$ の大域上界は導いていない。次章では $\log S-A_0\varphi$（$A_0$ は新しい大きな定数）へ最大値原理を適用し、[恒等式 $L_\varphi\varphi=n-T$](#def-yau1-08-relative-traces)と既知の $C^0$ 評価を結合して閉じる。
<!-- solution-end -->

## 9. 次章へ：局所的に正しい不等式を大域で閉じる

得られたのは $L_\varphi\log S\ge-BT-C$ という**解に依存しない係数の局所不等式**である。しかし局所不等式だけでは $S$ の上界は生まれない。次章では補助関数 $\log S-A_0\varphi$ の最大点を取り、$L_\varphi\varphi=n-T$ と[前章の $C^0$ 評価](../YAU1-07/index.md#cor-yau1-07-path-c0)を組み合わせ、最後に行列式と跡を使って固有値を両側から抑える。

### 参考文献

- V. V. Datar, [*Lecture Notes on Calabi's Conjectures and Kähler–Einstein Metrics*](https://math.iisc.ac.in/~vvdatar/Lecture_Notes/Calabi_Yau.pdf), 二階評価の局所計算。
- Z. Błocki, [*The Complex Monge–Ampère Equation on Compact Kähler Manifolds*](https://www3.nd.edu/~jdiller/teaching/archive/spring11_80380/blocki2.pdf), 二階評価と最大値原理の別導出。
