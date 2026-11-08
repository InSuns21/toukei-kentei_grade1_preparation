# MFL32 Graph spectral convolution

<!-- definition-example-audit: strict -->

## 1. 近傍の情報を混ぜる操作を、周波数から設計する

[MFL30のmessage passing層](../MFL30/index.md#def-mfl30-message-passing)は頂点の近傍から特徴を集め、[MFL31の1-WL上界](../MFL31/index.md#thm-mfl31-wl-upper)はその識別力の限界を示した。ここでは別の問いを立てる。グラフ上の信号を「ゆっくり変わる成分」と「隣接頂点間で激しく変わる成分」に分け、**どの変化を残すか**をフィルタとして設計できないだろうか。

通常のFourier解析で周波数ごとの倍率を与える操作に相当するものが、有限グラフの**スペクトルフィルタ（graph spectral convolution）**である。「convolution」という名称は古典Fourier解析との類比であり、ここでは実数全体の畳み込み積分定理を仮定しない。ただしグラフの固有ベクトルには符号の任意性があり、同じ固有値に対応する基底も回転できる。固有ベクトルの番号ごとに勝手な係数を付けてよいわけではない。

本章は有限無向重み付きグラフ $G=(V,W)$、$V=\{1,\ldots,n\}$、対称な重み行列 $W=(w_{ij})$、$w_{ij}\ge0$、$w_{ii}=0$ を基本模型とする。孤立頂点は許す。重みが正の二頂点を辺と呼ぶ。[SGT1の組合せLaplacian](../../../計算系/SGT/SGT1/index.md#def-sgt1-laplacian)を

$$
d_i=\sum_j w_{ij},\qquad D=\operatorname{diag}(d_1,\ldots,d_n),\qquad L=D-W
$$

と置く。各頂点の実数値信号は列ベクトル $x\in\mathbb R^n$ である。[SGT1の半正定値性](../../../計算系/SGT/SGT1/index.md#thm-sgt1-psd)により $L$ の固有値は非負であり、[実対称行列のスペクトル定理](../../../基礎科目/F0/F0-00F1/index.md#thm-real-symmetric-spectral)により直交行列 $U=(u_1,\ldots,u_n)$ を選んで

$$
L=U\operatorname{diag}(\lambda_1,\ldots,\lambda_n)U^\mathsf T,
\qquad 0\le\lambda_1\le\cdots\le\lambda_n
$$

と表せる。$u_j^\mathsf Tx$ は固有モード $u_j$ の係数である。固有値が小さいほど、そのモードの[辺上の差の二乗和](../../../計算系/SGT/SGT1/index.md#thm-sgt1-dirichlet) $u_j^\mathsf T L u_j=\lambda_j\|u_j\|^2$ が小さい。

## 2. 固有値に倍率を付ける：スペクトル乗数

各固有モードの強さを変えるには、固有値 $\lambda$ の関数 $g(\lambda)$ を選び、その固有モードへ同じ倍率を掛ける。重要なのは「固有ベクトル番号 $j$」でなく「固有値 $\lambda_j$」に倍率を付けることである。

<a id="def-mfl32-spectral-multiplier"></a>

<!-- formal-statement-start -->
> **定義（グラフスペクトル乗数）**
>
> 有限無向非負重み付きグラフの実対称組合せLaplacian $L$ に対し、固有値集合 $\sigma(L)$ 上の実数値関数 $g$ を取る。直交固有分解 $L=U\operatorname{diag}(\lambda_j)U^\mathsf T$ を用いて

$$
g(L)x=U\operatorname{diag}(g(\lambda_1),\ldots,g(\lambda_n))U^\mathsf T x
=\sum_{j=1}^n g(\lambda_j)u_j(u_j^\mathsf T x)
$$

> と定める。この線形作用素を $g$ のグラフスペクトル乗数と呼ぶ。倍率は等しい固有値に対して等しいものとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl32-spectral-multiplier -->
**定義の確認**：三頂点の道。頂点 $1$—$2$—$3$ の二辺の重みを1とする。$L$ の候補固有ベクトルを行列の各行に掛けて調べると

$$
L=\begin{pmatrix}1&-1&0\\-1&2&-1\\0&-1&1\end{pmatrix},\qquad
\begin{array}{c|c}
\lambda&\text{固有ベクトル（非正規化）}\\\hline
0&(1,1,1)^\mathsf T\\
1&(1,0,-1)^\mathsf T\\
3&(1,-2,1)^\mathsf T
\end{array}
$$

となる。三つは互いに直交し、非零なので全固有空間を張る。信号 $e_1=(1,0,0)^\mathsf T$ は

$$
e_1=\frac13(1,1,1)^\mathsf T+\frac12(1,0,-1)^\mathsf T
+\frac16(1,-2,1)^\mathsf T
$$

と分解できる。$g(\lambda)=1-\lambda/3$ を選べば各倍率は $1,2/3,0$ なので

$$
g(L)e_1=\frac13(1,1,1)^\mathsf T+\frac13(1,0,-1)^\mathsf T
=\left(\frac23,\frac13,0\right)^\mathsf T.
$$

右端へ信号が届かないのは、今回のフィルタが一次多項式であることと関係する。
<!-- definition-example-end -->

## 3. 固有分解なしで計算する多項式フィルタ

固有ベクトルを毎回求める代わりに、$L$ を行列として繰り返し掛ける方法を考える。$p(\lambda)=\sum_{k=0}^{K}a_k\lambda^k$ なら $Lu_j=\lambda_j u_j$ から $p(L)u_j=p(\lambda_j)u_j$ となり、先ほどの周波数別倍率と一致する。

<a id="def-mfl32-polynomial-filter"></a>

<!-- formal-statement-start -->
> **定義（多項式グラフフィルタ）**
>
> 有限無向非負重み付きグラフの組合せLaplacian $L$ と実係数多項式 $p(z)=\sum_{k=0}^{K}a_kz^k$ に対して、

$$
p(L)x=\sum_{k=0}^{K}a_kL^kx,\qquad L^0=I
$$

> を次数高々 $K$ の多項式グラフフィルタと呼ぶ。$p(L)$ は[グラフスペクトル乗数](#def-mfl32-spectral-multiplier)のうち倍率関数が $p$ の場合である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl32-polynomial-filter -->
**定義の確認**。前節の道で $x=e_1$、$p(z)=1-z/3$ とすれば

$$
Lx=(1,-1,0)^\mathsf T,\qquad
p(L)x=x-\frac13Lx=\left(\frac23,\frac13,0\right)^\mathsf T.
$$

固有分解を用いた値と一致した。さらに同じ一次作用素を二回使うと

$$
\left(I-\frac13L\right)^2x
=\left(I-\frac23L+\frac19L^2\right)x
=\left(\frac59,\frac13,\frac19\right)^\mathsf T,
$$

ここで $L^2x=(2,-3,1)^\mathsf T$ を直接掛け算で確認できる。二段目では二辺先の頂点3にも $1/9$ が現れる。
<!-- definition-example-end -->

<a id="thm-mfl32-spectral-bound"></a>

<!-- formal-statement-start -->
> **定理（スペクトル乗数の基底非依存性と誤差上界）**
>
> $L$ を実対称な $n\times n$ 行列とし、$g,p:\sigma(L)\to\mathbb R$ を関数とする。ここでは[グラフスペクトル乗数](#def-mfl32-spectral-multiplier)と同じ直交固有分解の式で $g(L)$ と $p(L)$ を定め、グラフLaplacian以外の実対称行列にも適用する。$p$ が多項式である必要はない。次が成立する。
>
> **（1）** [スペクトル乗数](#def-mfl32-spectral-multiplier) $g(L)$ は、重複固有値に属する固有ベクトルの直交基底の選択に依存しない。
>
> **（2）** Euclidノルムに誘導された作用素ノルムについて

$$
\|g(L)-p(L)\|_{2\to2}
=\max_{\lambda\in\sigma(L)}|g(\lambda)-p(\lambda)|,
$$

> したがって任意の $x\in\mathbb R^n$ について

$$
\|(g(L)-p(L))x\|_2\le
\max_{\lambda\in\sigma(L)}|g(\lambda)-p(\lambda)|\,\|x\|_2.
$$
<!-- formal-statement-end -->

**証明の見取り図。** 一つの固有値の固有空間全体に同じ倍率を掛ければ、そこで基底を回転しても変わらない。直交座標での各成分の倍率差の最大値が作用素ノルムになる。

<!-- proof-start -->
### 証明

相異なる固有値を $\mu_1,\ldots,\mu_r$ とし、各固有空間への直交射影を $P_1,\ldots,P_r$ とする。$\mu_\ell$ の正規直交固有ベクトルを列にもつ行列を $U_\ell$ とすれば $P_\ell=U_\ell U_\ell^\mathsf T$ である。同じ固有空間の別の正規直交基底は $U_\ell Q_\ell$（$Q_\ell^\mathsf TQ_\ell=I$）と書けるため、

$$
(U_\ell Q_\ell)(U_\ell Q_\ell)^\mathsf T
=U_\ell Q_\ell Q_\ell^\mathsf T U_\ell^\mathsf T=P_\ell.
$$

したがって $g(L)=\sum_{\ell=1}^r g(\mu_\ell)P_\ell$ は基底によらない。次に $h=g-p$、$x=\sum_j\alpha_j u_j$（$\alpha_j=u_j^\mathsf Tx$）と置く。直交性により

$$
\|h(L)x\|_2^2=\sum_j|h(\lambda_j)|^2|\alpha_j|^2
\le M^2\sum_j|\alpha_j|^2=M^2\|x\|_2^2,
\qquad M=\max_j|h(\lambda_j)|.
$$

最大値を取る固有ベクトル $x=u_{j_*}$（ノルム1）を選べば等号なので、作用素ノルムはちょうど $M$ である。□
<!-- proof-end -->

例えば $g(\lambda)=e^{-t\lambda}$（$t\ge0$）を $p(\lambda)=1-t\lambda$ で近似したい。$0\le\lambda\le\Lambda$ なら、$s=t\lambda\ge0$ に対し二回の積分から

$$
e^{-s}-(1-s)=\int_0^s (s-r)e^{-r}\,dr,
\qquad 0\le e^{-s}-(1-s)\le\frac{s^2}{2}.
$$

よって $\lambda_{\max}(L)\le\Lambda$ なら

$$
\|e^{-tL}x-(I-tL)x\|_2\le\frac{t^2\Lambda^2}{2}\|x\|_2.
$$

これは**二つのフィルタの出力差の上界**であり、$I-tL$ 自体が非負重みの平均作用素であることや、学習性能を保証するものではない。

## 4. $L$ を掛ける回数が情報到達範囲を制限する

グラフの距離 $\operatorname{dist}_G(i,j)$ は、正重みの辺を何本通れば $i$ から $j$ へ行けるかという最小本数（非連結なら $\infty$）とする。これは辺の重みを長さとして合計する距離ではない。[SGT1の道と連結性](../../../計算系/SGT/SGT1/index.md#def-sgt1-path)から定められる。

<a id="thm-mfl32-k-hop"></a>

<!-- formal-statement-start -->
> **定理（多項式フィルタのK-hop局所性）**
>
> $L=D-W$ を有限無向非負重み付きグラフの組合せLaplacianとし、$p$ を次数高々 $K\ge0$ の実係数多項式とする。任意の頂点対 $i,j$ について

$$
\operatorname{dist}_G(i,j)>K\quad\Longrightarrow\quad(p(L))_{ij}=0.
$$

> したがって $i$ における出力は、そこから $K$ 本以内の辺で到達できる頂点の入力値だけに依存する。
<!-- formal-statement-end -->

**証明の見取り図。** $L$ の非対角成分は辺がなければ0で、対角成分は頂点にとどまる操作である。行列を一度掛けるごとに一辺以上遠くへは移れない。

<!-- proof-start -->
### 証明

$k=0$ では $L^0=I$ だから、異なる頂点間の成分は0である。ある $k\ge0$ で $\operatorname{dist}_G(i,j)>k$ なら $(L^k)_{ij}=0$ と仮定する。行列積は

$$
(L^{k+1})_{ij}=\sum_{v=1}^n L_{iv}(L^k)_{vj}.
$$

$L_{iv}\ne0$ がありうるのは $v=i$ または $i$ と $v$ が隣接するときだけなので、その場合は $\operatorname{dist}_G(i,v)\le1$ である。もし $\operatorname{dist}_G(v,j)\le k$ なら、これらの道をつないで

$$
\operatorname{dist}_G(i,j)\le\operatorname{dist}_G(i,v)+\operatorname{dist}_G(v,j)\le1+k
$$

となる。したがって $\operatorname{dist}_G(i,j)>k+1$ では、$L_{iv}\ne0$ となるすべての $v$ について $\operatorname{dist}_G(v,j)>k$ であり、帰納法の仮定から行列積の各項は0になる。全 $k$ に対する結論を $p(L)=\sum_{k=0}^K a_kL^k$ の各項へ適用すればよい。□
<!-- proof-end -->

**逆向きには注意。** 次数2の多項式でも係数が0なら二辺先へ届かない。局所性は到達可能性の**上界**であり、すべての頂点が必ず影響を与える保証ではない。逆に固有値への任意の倍率指定は一般にこのような小さい次数の表現を持たず、大域的な影響を生みうる。有限 $n$ の固定グラフでは固有値を補間すれば次数高々 $n-1$ の多項式で表せるが、それは低次数・局所的であることを意味しない。

## 5. 頂点番号を変えても同じ計算になる

固定した係数 $a_k$ を共有して同じ多項式を使うと、[MFL30の頂点再ラベル作用](../MFL30/index.md#def-mfl30-graph-relabeling)と両立する。頂点番号の付け替え $\pi:V\to V$ を表す行列 $P$ を、$P_{ai}=1$（$a=\pi(i)$ のとき）、それ以外の成分は0と定める。各行・各列に1が一つなので $P^\mathsf TP=I$ である。番号を変えたグラフと信号を $W'=PWP^\mathsf T$、$x'=Px$ とする。

<a id="thm-mfl32-permutation-equivariance"></a>

<!-- formal-statement-start -->
> **定理（多項式フィルタの置換等変性）**
>
> $W$ を対称・非負・対角零の重み行列、$L=D-W$、$P$ を上記の頂点番号の入れ替えを表す $n\times n$ 行列とし、$W'=PWP^\mathsf T$ とする。$W'$ の組合せLaplacianを $L'$ とする。すべての実係数多項式 $p$、$x\in\mathbb R^n$ について

$$
p(L')Px=Pp(L)x
$$

> が成立する。次数・係数はグラフの再ラベル前後で共通とする。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

行和をとると $W'\mathbf1=PW(P^\mathsf T\mathbf1)=PW\mathbf1$ であり、$P^\mathsf T\mathbf1=\mathbf1$ なので $D'=PDP^\mathsf T$。従って $L'=PLP^\mathsf T$ である。$P^\mathsf TP=I$ より

$$
(L')^kPx=(PLP^\mathsf T)^kPx=PL^kx
$$

が $k=0$ で成立し、$k$ から $k+1$ へは中央の $P^\mathsf TP=I$ を消去することで示せる。これを $p(L')Px=\sum_k a_k(L')^kPx$ に代入すると $P\sum_k a_kL^kx=Pp(L)x$ となる。□
<!-- proof-end -->

これは[近傍集約の一層等変性](../MFL30/index.md#thm-mfl30-one-layer-equivariance)と整合するが、スペクトルフィルタがそれだけで1-WLの限界を突破すると結論してはいけない。構造と初期特徴をそろえたとき何を識別できるかは別の問いである。

## 6. Chebyshev多項式で疎な反復計算にする

$L^k$ をあらかじめ作ると、疎な $L$ であっても高い冪は密になることがある。必要なのは行列ではなく $L^kx$ という**ベクトル**だけである。さらに固有値を $[-1,1]$ に移せば、Chebyshev多項式の短い漸化式で計算できる。

Chebyshev多項式は実変数 $z$ に対し $T_0(z)=1$、$T_1(z)=z$、$T_{k+1}(z)=2zT_k(z)-T_{k-1}(z)$ で帰納的に定まる。例えば $T_2(z)=2z^2-1$。$|z|\le1$ で $|T_k(z)|\le1$ であることは $z=\cos\theta$ と置き、$T_k(\cos\theta)=\cos(k\theta)$ を加法公式と漸化式で帰納的に示せば分かる。

<a id="def-mfl32-chebyshev-filter"></a>

<!-- formal-statement-start -->
> **定義（Chebyshevグラフフィルタ）**
>
> 有限無向非負重み付きグラフの組合せLaplacian $L$ に対し、実数 $\Lambda>0$ を $\lambda_{\max}(L)\le\Lambda$ を満たす上界とする。$A=2L/\Lambda-I$ とおく。係数 $\theta_0,\ldots,\theta_K\in\mathbb R$ に対して

$$
q_K(L)x=\sum_{k=0}^{K}\theta_k T_k(A)x
$$

> を次数高々 $K$ のChebyshevグラフフィルタと呼ぶ。ここで $T_k(A)$ は上記の多項式を行列 $A$ に代入したものとする。$\Lambda$ は実際の最大固有値と等しくなくてもよいが、正で上界でなければならない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl32-chebyshev-filter -->
**定義の確認**。三頂点の道では固有値の最大値が3なので $\Lambda=3$ と取れる。$x=e_1$、$A=2L/3-I$ とすると

$$
T_0(A)x=(1,0,0)^\mathsf T,\qquad
T_1(A)x=Ax=\left(-\frac13,-\frac23,0\right)^\mathsf T.
$$

$1-\lambda/3$ を $z=2\lambda/3-1$ に直すと $1-\lambda/3=(1-z)/2$。よって $\theta_0=1/2,\theta_1=-1/2$ とすれば

$$
q_1(L)x=\frac12T_0(A)x-\frac12T_1(A)x
=\left(\frac23,\frac13,0\right)^\mathsf T,
$$

第2節の固有分解・第3節の行列積の両方と一致する。
<!-- definition-example-end -->

<a id="thm-mfl32-chebyshev-recurrence"></a>

<!-- formal-statement-start -->
> **定理（Chebyshev漸化式と疎計算）**
>
> [Chebyshevグラフフィルタ](#def-mfl32-chebyshev-filter)の仮定の下で、$y_0=x$、$y_1=Ax$、$y_{k+1}=2Ay_k-y_{k-1}$（$k\ge1$）と置くと、$y_k=T_k(A)x$ であり

$$
q_K(L)x=\sum_{k=0}^{K}\theta_ky_k.
$$

> グラフに $m$ 本の非零重みの無向辺があり、$L$ を隣接リストで保持するなら、係数列 $\theta_0,\ldots,\theta_K$ が与えられた一信号の評価は $O(K(n+m))$ 時間で実行できる（$K=0$ は $O(n)$ 時間）。
>
> 記憶量はグラフ・係数列も含めて $O(n+m+K)$ であり、それらの保存領域を除く追加作業領域は $O(n)$ でよい。また $\sigma(A)\subset[-1,1]$ なので $\|T_k(A)\|_{2\to2}\le1$ である。
<!-- formal-statement-end -->

**証明の見取り図。** スカラーの漸化式を行列へ代入し、必要な直前二つのベクトルだけを保存する。疎な辺を一回ずつ走査して $Lv$ を計算する。

<!-- proof-start -->
### 証明

$k=0,1$ は定義そのもの。$y_{k-1}=T_{k-1}(A)x$、$y_k=T_k(A)x$ と仮定すれば

$$
y_{k+1}=2A T_k(A)x-T_{k-1}(A)x
=T_{k+1}(A)x
$$

となり、全 $k$ の式が従う。$Lv$ の $i$ 成分は

$$
(Lv)_i=\sum_{j:w_{ij}>0}w_{ij}(v_i-v_j)
$$

だから一回の積には各頂点と各辺を定数回処理する $O(n+m)$ 演算が必要である。更新では直前二つと新たなベクトル、および加算中の出力ベクトルだけを保持すればよい。作業ベクトルは $O(n)$、隣接リストは $O(n+m)$、入力係数列は $O(K)$ の記憶量であり、密な $L^k$ は作らない。

最後に $A$ の固有値は $2\lambda_j/\Lambda-1\in[-1,1]$。第3節の[スペクトルノルム評価](#thm-mfl32-spectral-bound)と $|T_k(z)|\le1$ により $\|T_k(A)\|_{2\to2}\le1$。□
<!-- proof-end -->

**近似の意味。** 例えば $g(\lambda)=e^{-t\lambda}$ のような目標倍率を $\sum_k\theta_k T_k(2\lambda/\Lambda-1)$ で区間 $[0,\Lambda]$ 上一様近似できれば、[誤差上界](#thm-mfl32-spectral-bound)がそのまま全入力信号の誤差評価になる。一方、近似係数の学習、$\Lambda$ の選び方、グラフを変えたときの汎化は別の問題である。特に $\Lambda$ が最大固有値の**下界**になってしまうと $A$ に絶対値1を超える固有値が現れ、上記の一様有界性は失われる。

## 7. GCN風の一次層は、どのLaplacianの多項式か

実装でよく使われる「自己ループを加えて次数正規化した隣接行列」も、グラフを適切に定義すれば一次スペクトルフィルタである。ただし**元のグラフ**の $L$ ではないことが重要だ。以下の $\sigma$ は特徴の各成分に適用する活性化関数を表し、先に用いた固有値集合 $\sigma(L)$ とは別の意味である。

<a id="prop-mfl32-normalized-first-order"></a>

<!-- formal-statement-start -->
> **命題（自己ループ付き正規化一次フィルタ）**
>
> 対称非負重み行列 $W$（対角零）に対して $\widetilde W=W+I$、$\widetilde d_i=\sum_j\widetilde w_{ij}>0$、$\widetilde D=\operatorname{diag}(\widetilde d_i)$ と置き、自己ループ付きグラフの対称正規化Laplacianを

$$
\widetilde L_{\rm sym}=I-\widetilde D^{-1/2}\widetilde W\widetilde D^{-1/2}
$$

> と定める。このとき伝播作用素 $S=\widetilde D^{-1/2}\widetilde W\widetilde D^{-1/2}$ は $S=I-\widetilde L_{\rm sym}$ であり、**自己ループ付き正規化Laplacian**の一次多項式フィルタである。$d,q\ge1$ とし、特徴行列 $H\in\mathbb R^{n\times d}$、頂点間で共有する重み行列 $B\in\mathbb R^{d\times q}$、成分ごとに適用する共通活性化 $\sigma:\mathbb R\to\mathbb R$ に対し、$H\mapsto\sigma(SHB)$ は頂点置換等変である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[SGT2の対称正規化Laplacian](../../../計算系/SGT/SGT2/index.md#def-sgt2-normalized)と同じ代数式を、今度は自己ループを許した $\widetilde W$ に対して定義した。SGT2のループなし模型からの変更箇所はここである。定義式を移項すると $S=I-\widetilde L_{\rm sym}$ となる。全頂点で $\widetilde d_i\ge1$ なので逆平方根は存在する。

頂点番号を表す行列 $P$ でグラフを付け替えれば、次の関係が各行列の定義から従う。

$$
\widetilde W'=P\widetilde WP^\mathsf T,\qquad
\widetilde D'=P\widetilde DP^\mathsf T,\qquad
S'=PSP^\mathsf T.
$$

入力特徴を $H'=PH$ とする。$P^\mathsf TP=I$ だから

$$
S'H'B=(PSP^\mathsf T)(PH)B=P(SHB).
$$

成分ごとの共通活性化は行の付け替えと交換する。すなわち $\sigma(PZ)=P\sigma(Z)$ なので、

$$
\sigma(S'H'B)=\sigma(P(SHB))=P\sigma(SHB).
$$

以上で一次層の等変性が示された。□
<!-- proof-end -->

例えば二頂点の一本の辺 $W=\left(\begin{smallmatrix}0&1\\1&0\end{smallmatrix}\right)$ では

$$
I-L_{\rm sym}=\begin{pmatrix}0&1\\1&0\end{pmatrix},\qquad
S=\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix}.
$$

自己ループの追加でフィルタが変わった。$\sigma$ を挟んだ多層ネットワーク全体は一般には**一つの多項式**にはならない。層の線形伝播と非線形変換は区別する。

## 8. 重複固有値と「固有ベクトル番号への重み」の落とし穴

固有値に対する共通関数 $g(\lambda)$ なら基底選択に依存しない。しかし同じ固有値の二つの固有ベクトルへ別々の学習係数を与えると、ソフトウェアが選んだ基底によって出力が変わりうる。

<a id="prop-mfl32-basis-failure"></a>

<!-- formal-statement-start -->
> **命題（重複固有空間内の係数不一致による基底依存）**
>
> 実対称行列 $L$ に同じ固有値 $\lambda$ に属する直交単位固有ベクトル $u,v$ が存在するとする。$u,v$ が張る二次元部分空間で $\alpha\ne\beta$ を用いる作用素

$$
H_{u,v}=\alpha uu^\mathsf T+\beta vv^\mathsf T
$$

> は、$u,v$ を別の直交単位基底に取り替え、同じ順番の係数 $\alpha,\beta$ をその新基底へ再割り当てすると、一般に別の作用素になる。特に $u'=(u+v)/\sqrt2$、$v'=(-u+v)/\sqrt2$ に替えたとき $H_{u',v'}u$ の $v$ 成分は $(\alpha-\beta)/2$ となり、元の $H_{u,v}u=\alpha u$ と異なる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$u'^\mathsf Tu=1/\sqrt2$、$v'^\mathsf Tu=-1/\sqrt2$ なので、二つの基底ベクトルへの射影係数をそれぞれ計算すると

$$
\begin{aligned}
H_{u',v'}u
&=\frac\alpha{\sqrt2}u'-\frac\beta{\sqrt2}v'\\
&=\frac{\alpha+\beta}{2}u+\frac{\alpha-\beta}{2}v.
\end{aligned}
$$

$\alpha\ne\beta$ なら $v$ 成分が非零となり、$H_{u,v}u=\alpha u$ と一致しない。□
<!-- proof-end -->

四頂点サイクル $C_4$ では組合せLaplacianの固有値は $0,2,2,4$ であり、

$$
u=\frac1{\sqrt2}(1,0,-1,0)^\mathsf T,\qquad
v=\frac1{\sqrt2}(0,1,0,-1)^\mathsf T
$$

は固有値2に属する。$\alpha=1$、$\beta=2$ とすると回転後の作用素は入力 $u$ に対して $\frac32u-\frac12v$ を返す。固有値2へ**同じ**倍率を掛ける多項式フィルタではこの問題は起きない。固有値の順序・符号・縮退時の回転に依存した学習器を、無条件にグラフの同型に不変なものと見なせない。

## 9. 再現可能な有限グラフ実験

付属 [`spectral_filter_lab.py`](spectral_filter_lab.py) はPython標準ライブラリだけで動く決定論的な実験である。

```bash
python3 textbook/volumes/dream_thater/応用系/MFL/MFL32/spectral_filter_lab.py
```

三頂点の道で、固有分解による一次フィルタ、行列積、Chebyshev次数1を独立に計算して一致を確かめる。二次フィルタの二辺先への伝播、頂点の付け替え前後の残差、$C_4$ の基底回転による誤差も確認する。行列サイズ・辺・入力・係数をコード内に固定し、乱数や固有ベクトルの符号選択による偶然の一致には頼らない。数値誤差の許容値は $10^{-10}$ とする。

## 10. 演習

### Level A：固有値・行列・到達範囲の基本計算

<a id="ex-mfl32-a01"></a>

### MFL32-A01 三頂点の道の二回伝播

- Level: A
- 問題: 頂点 $1$—$2$—$3$ の二辺の重みが1、$x=e_1$、$L=D-W$、$B=I-L/3$ とする。$Bx$ と $B^2x$ を行列積から求め、頂点3の成分の違いを説明せよ。

<a id="ex-mfl32-a02"></a>

### MFL32-A02 スペクトル係数による検算

- Level: A
- 問題: 同じ三頂点の道で固有値 $0,1,3$ に対応する互いに直交する固有ベクトル $(1,1,1)$、$(1,0,-1)$、$(1,-2,1)$ を用い、$g(\lambda)=1-\lambda/3$ に対して $g(L)e_1$ を計算せよ。正規化を省く場合の係数の扱いも説明せよ。

<a id="ex-mfl32-a03"></a>

### MFL32-A03 Chebyshevの二段目

- Level: A
- 問題: 三頂点の道で $\Lambda=3$、$A=2L/3-I$、$y_0=e_1$、$y_1=Ay_0$、$y_2=2Ay_1-y_0$ とする。$y_1,y_2$ を成分ごとに計算せよ。

<a id="ex-mfl32-a04"></a>

### MFL32-A04 連結でないグラフの局所性

- Level: A
- 問題: [SGT1で定めたグラフのつながった部分](../../../計算系/SGT/SGT1/index.md#def-sgt1-component)を二つ持つ有限無向非負重み付きグラフの組合せLaplacian $L$ と任意の有限次数多項式 $p$ を考える。異なる部分の頂点 $i,j$ で $(p(L))_{ij}=0$ を証明せよ。$p(0)\ne0$ でも成り立つか。

### Level B：仮定・等変性・スペクトルのずれ

<a id="ex-mfl32-b01"></a>

### MFL32-B01 K-hopの帰納法

- Level: B
- 問題: 組合せLaplacian $L$ とグラフ距離 $\operatorname{dist}_G$ に対し、$\operatorname{dist}_G(i,j)>k$ なら $(L^k)_{ij}=0$ を $k$ に関する帰納法で証明せよ。対角成分 $L_{ii}\ne0$ を「一本の辺」と誤解しない説明も付けよ。

<a id="ex-mfl32-b02"></a>

### MFL32-B02 グラフの番号を交換する

- Level: B
- 問題: 三頂点の道で $P$ は頂点1と3を交換する行列（$Pe_1=e_3,Pe_2=e_2,Pe_3=e_1$）、$x=e_1$、$p(z)=1-z/3$ とする。$L'=PLP^\mathsf T$、$x'=Px$ を実際に求め、$p(L')x'=Pp(L)x$ を左右から検算せよ。

<a id="ex-mfl32-b03"></a>

### MFL32-B03 近似の誤差と符号

- Level: B
- 問題: 実対称半正定値な $L$ の固有値が $[0,\Lambda]$ にあり、$t\ge0$ とする。$g(\lambda)=e^{-t\lambda}$、$p(\lambda)=1-t\lambda$ に対し、$\|g(L)x-p(L)x\|_2\le t^2\Lambda^2\|x\|_2/2$ を導け。また非負の入力 $x$ に対して $p(L)x$ が常に非負成分を持つとは限らない具体例を挙げよ。

<a id="ex-mfl32-b04"></a>

### MFL32-B04 固有空間の回転

- Level: B
- 問題: 四頂点サイクルの固有値2に属する直交単位ベクトル $u=(1,0,-1,0)^\mathsf T/\sqrt2$、$v=(0,1,0,-1)^\mathsf T/\sqrt2$ と、$u'=(u+v)/\sqrt2$、$v'=(-u+v)/\sqrt2$ を考える。$H=uu^\mathsf T+2vv^\mathsf T$ と $H'=u'u'^\mathsf T+2v'v'^\mathsf T$ の $u$ への作用を比較し、$p(L)$ ならこの相違が起こらない理由を述べよ。

### Level C：同じグラフの三つの計算法を統合する

<a id="ex-mfl32-c01"></a>

### MFL32-C01 フィルタ構成・誤差・等変性

- Level: C
- 問題: 三頂点の道 $1$—$2$—$3$ の組合せLaplacianを $L$、入力を $x=e_1$ とする。$\lambda_{\max}=3$ を利用し、目標 $g(\lambda)=e^{-\lambda/3}$ と一次近似 $p(\lambda)=1-\lambda/3$ を比較する。
  1. $p(L)x$ を行列積および固有展開から求め、両者を照合せよ。
  2. $\Lambda=3$ としたChebyshev一次の係数 $\theta_0,\theta_1$ を求め、漸化式で同じ出力を検算せよ。
  3. $\|g(L)x-p(L)x\|_2$ の一様上界を計算し、実際の三固有値による誤差式も書け。
  4. 頂点1と3を交換したグラフと入力に、同じ係数を適用した出力を求め、等変性を確かめよ。
  5. 二次以上へ拡張すると受容範囲の上界がどう変わるか、また上界だけで二辺先の成分非零を保証できない理由を述べよ。

## 11. 演習の詳細解答

<!-- solution-start -->
### Level A

**MFL32-A01 解答。** $Lx=(1,-1,0)^\mathsf T$ だから

$$
Bx=e_1-\frac13Lx=(2/3,1/3,0)^\mathsf T.
$$

次に $L(Bx)=(1/3,0,-1/3)^\mathsf T$ であり、

$$
B^2x=Bx-\frac13L(Bx)=(5/9,1/3,1/9)^\mathsf T.
$$

一次では隣接頂点2まで、二次では二辺先の頂点3まで到達可能となる。これは[局所性定理](#thm-mfl32-k-hop)の具体例で、すべての二次多項式が必ず非零を運ぶ意味ではない。

**MFL32-A02 解答。** 三つのベクトルを $v_0,v_1,v_3$ と書くと、平方ノルムは $3,2,6$。正規化しない固有ベクトルの射影係数は $(v_\lambda^\mathsf Te_1)/(v_\lambda^\mathsf Tv_\lambda)$ だからそれぞれ $1/3,1/2,1/6$ である。$g(0)=1$、$g(1)=2/3$、$g(3)=0$ を掛けて

$$
g(L)e_1=\frac13v_0+\frac23\cdot\frac12v_1+0\cdot\frac16v_3
=(2/3,1/3,0)^\mathsf T.
$$

直交**単位**基底なら係数は単に内積となるが、今回はノルムの二乗で割る必要がある。

**MFL32-A03 解答。** $Ly_0=(1,-1,0)^\mathsf T$ より

$$
y_1=\frac23(1,-1,0)^\mathsf T-(1,0,0)^\mathsf T
=(-1/3,-2/3,0)^\mathsf T.
$$

$Ly_1=(1/3,-1,2/3)^\mathsf T$ なので

$$
Ay_1=\frac23Ly_1-y_1=(5/9,0,4/9)^\mathsf T,
$$

従って $y_2=2Ay_1-y_0=(1/9,0,8/9)^\mathsf T$。この例で $y_1$ には負成分が現れており、Chebyshev多項式を「確率平均」と取り違えてはいけない。

**MFL32-A04 解答。** [SGT1で定義したグラフのつながった部分](../../../計算系/SGT/SGT1/index.md#def-sgt1-component)ごとに頂点を並べ替えると、異なる部分を結ぶ重みが0だから $W$ と $D$、従って $L=D-W$ はブロック対角となる。その冪 $L^k$ もブロック対角である。

特に $L^0=I$ も同様なので、$p(L)=\sum_{k=0}^K a_kL^k$ はブロック対角であり、異なる成分間の行列成分は0である。定数項 $a_0=p(0)$ は $a_0I$ となり対角にしか寄与しないため、$p(0)\ne0$ でも結論は変わらない。

### Level B

**MFL32-B01 解答。** $k=0$ では $L^0=I$。$i\ne j$（距離 $>0$）なら $(L^0)_{ij}=0$ である。$k$ 段成立と仮定し、距離 $>k+1$ の $i,j$ を取る。行列積

$$
(L^{k+1})_{ij}=\sum_v L_{iv}(L^k)_{vj}
$$

で $L_{iv}\ne0$ なら $v=i$ または隣接頂点であり、$\operatorname{dist}_G(i,v)\le1$。もし $\operatorname{dist}_G(v,j)\le k$ なら

$$
\operatorname{dist}_G(i,j)\le\operatorname{dist}_G(i,v)+\operatorname{dist}_G(v,j)\le k+1
$$

となって仮定に反する。従って行列積の各項は0である。対角成分 $L_{ii}=d_i$ は**同じ頂点にとどまる係数**であり、辺を一本進む操作ではない。

**MFL32-B02 解答。** 頂点1と3の交換では

$$
P=\begin{pmatrix}0&0&1\\0&1&0\\1&0&0\end{pmatrix},\quad
L'=PLP^\mathsf T=L,\quad x'=Pe_1=e_3.
$$

道の左右対称性から $L'e_3=(0,-1,1)^\mathsf T$ であり、

$$
p(L')x'=e_3-\frac13L'e_3=(0,1/3,2/3)^\mathsf T.
$$

一方 $p(L)e_1=(2/3,1/3,0)^\mathsf T$ だから $Pp(L)e_1=(0,1/3,2/3)^\mathsf T$。等変性は値の**一致**ではなく、出力の頂点番号も一緒に交換する等式である。

**MFL32-B03 解答。** $s=t\lambda\ge0$ に対する $f(s)=e^{-s}-(1-s)$ は $f(0)=f'(0)=0$、$f''(s)=e^{-s}\le1$。二回積分して

$$
0\le f(s)=\int_0^s(s-r)e^{-r}\,dr\le\int_0^s(s-r)dr=s^2/2.
$$

固有値 $\lambda_j\in[0,\Lambda]$ に適用して $|g(\lambda_j)-p(\lambda_j)|\le t^2\Lambda^2/2$。[スペクトルノルム上界](#thm-mfl32-spectral-bound)から結論が従う。非負性の反例として二頂点の辺1本、$t=2$ を取ると

$$
L=\begin{pmatrix}1&-1\\-1&1\end{pmatrix},\qquad
(I-2L)e_1=(-1,2)^\mathsf T
$$

となり、負成分が生じる。$L$ の固有値は $0,2$ で、上記上界の仮定を満たす。誤差上界と非負性は全く異なる性質である。

**MFL32-B04 解答。** $u^\mathsf Tu=1$、$v^\mathsf Tu=0$ より $Hu=u$。また $u'^\mathsf Tu=1/\sqrt2$、$v'^\mathsf Tu=-1/\sqrt2$ なので

$$
H'u=\frac1{\sqrt2}u'-\sqrt2v'
=\frac32u-\frac12v\ne u.
$$

これは同じ固有空間の基底を変えただけで演算が変わる例である。[スペクトル乗数の基底非依存性と誤差上界](#thm-mfl32-spectral-bound)の第一の結論により、多項式 $p(L)$ は固有値2の固有空間全体で同じ係数 $p(2)$ を掛けるため、この回転の影響を受けない。

### Level C

**MFL32-C01 解答。**

1. $L e_1=(1,-1,0)^\mathsf T$ なので行列計算では $p(L)e_1=(2/3,1/3,0)^\mathsf T$。固有展開では

$$
e_1=\frac13(1,1,1)^\mathsf T+\frac12(1,0,-1)^\mathsf T+\frac16(1,-2,1)^\mathsf T,
$$

倍率 $1,2/3,0$ を掛けて $(2/3,1/3,0)^\mathsf T$ と一致する。

2. $z=2\lambda/3-1$ なら $p(\lambda)=(1-z)/2$ なので $\theta_0=1/2,\theta_1=-1/2$。$y_0=e_1$、$y_1=(2L/3-I)e_1=(-1/3,-2/3,0)^\mathsf T$ から

$$
\theta_0y_0+\theta_1y_1=(2/3,1/3,0)^\mathsf T.
$$

3. $t=1/3$、$\Lambda=3$ を[誤差評価](#thm-mfl32-spectral-bound)へ代入すると

$$
\|g(L)e_1-p(L)e_1\|_2\le\frac12\|e_1\|_2=\frac12.
$$

実際には $\delta_0=e^0-1=0$、$\delta_1=e^{-1/3}-2/3$、$\delta_3=e^{-1}-0$。直交固有成分の係数平方ノルムは順に $1/3,1/2,1/6$ だから

$$
\|g(L)e_1-p(L)e_1\|_2^2
=\frac12\left(e^{-1/3}-\frac23\right)^2+\frac16 e^{-2}.
$$

これは上界と異なり、この入力に対する正確な誤差である。

4. 交換行列 $P$ では $L'=PLP^\mathsf T=L$、$x'=e_3$。[置換等変性定理](#thm-mfl32-permutation-equivariance)を具体的に使えば

$$
p(L')e_3=e_3-\frac13(0,-1,1)^\mathsf T
=(0,1/3,2/3)^\mathsf T=Pp(L)e_1.
$$

5. 次数高々 $K$ のフィルタなら[K-hop局所性](#thm-mfl32-k-hop)により距離 $>K$ の入力成分は参照できない。$K=2$ では頂点1から頂点3まで到達しうる。

   しかし $p(z)=1+0z+0z^2$ と選ぶと $p(L)e_1=e_1$ で、二辺先は0のままである。到達範囲の上界は非零成分の下界ではない。
<!-- solution-end -->

## 12. 次の講義へ

次数を増やせば遠くの信号へ届く一方、繰り返し平均するだけでは異なる頂点の特徴が似通ってしまう可能性がある。次のMFL33では、有限グラフのスペクトルに基づく **oversmoothing** と、遠距離情報が少数の辺を通るときの **oversquashing** を異なる機構として調べる。
