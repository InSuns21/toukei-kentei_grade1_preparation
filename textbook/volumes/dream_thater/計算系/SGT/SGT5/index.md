# SGT5 固有空間の摂動と分割の安定性

[SGT4のスペクトル分割](../SGT4/index.md#thm-sgt4-spectral-relaxation)では、グラフ上の対称行列の小さい固有値に対応するベクトルから分割候補を作りました。しかし入力の辺重みには測定誤差や更新があります。辺を少し変えたとき、出力はどこまで信頼できるでしょうか。

ここで区別すべき対象は三つです。**固有値**は数値、**固有空間**はベクトルの張る部分空間、**分割**は頂点集合です。固有値がわずかに動くことは、固有ベクトルや分割が同じままであることを意味しません。特に固有値が重複すると、一本の固有ベクトルの向きはそもそも一意ではありません。本章では、まず対称行列としての摂動を完全に評価し、それを組合せ・正規化Laplacianへ戻したあと、最後に閾値での離散化を調べます。

前提は有限次元の実対称行列です。[SGT1のLaplacian](../SGT1/index.md#def-sgt1-laplacian)と[SGT2の正規化Laplacian](../SGT2/index.md#def-sgt2-normalized)はこの条件を満たします。以下、ベクトルにはEuclidノルム $\|x\|_2$、行列には作用素ノルム $\|A\|_2=\max_{\|x\|_2=1}\|Ax\|_2$、成分平方和の平方根であるFrobeniusノルム $\|A\|_{\mathrm F}$ を使います。[実対称行列のスペクトル定理](../../../基礎科目/F0/F0-00F1/index.md#thm-real-symmetric-spectral)で直交対角化できるので、対称行列の作用素ノルムは固有値の絶対値の最大値です。

## 1. 固有値はどれほど動くか

辺重みから作った行列を $A$、更新後を $\widetilde A=A+E$ と記します。まず行列の差を測る道具を導入します。差の各成分が小さいことと、作用素ノルムが小さいことは異なるため、評価で用いるノルムを固定します。

<a id="def-sgt5-perturbation"></a>

<!-- formal-statement-start -->
> **定義（対称行列の摂動量）**  
> 同じ次数 $n$ の実対称行列 $A,\widetilde A$ に対して、$E=\widetilde A-A$ を摂動行列、$\varepsilon=\|E\|_2$ を作用素ノルムで測った摂動量とする。固有値はそれぞれ小さい順に

$$
\lambda_1\leq\cdots\leq\lambda_n,\qquad
\widetilde\lambda_1\leq\cdots\leq\widetilde\lambda_n
$$

> と重複を数えて並べる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sgt5-perturbation -->
### 例：対角行列の入力誤差

**定義の確認**：$A=\operatorname{diag}(0,2)$、$\widetilde A=\operatorname{diag}(s,2-s)$ とすると $E=\operatorname{diag}(s,-s)$ です。単位ベクトル $x=(x_1,x_2)^\mathsf T$ に対し

$$
\|Ex\|_2^2=s^2x_1^2+s^2x_2^2=s^2
$$

なので $\varepsilon=|s|$ です。$|s|<1$ なら固有値は $s,2-s$ の順になり、各固有値の変化はちょうど $|s|$。この例は、次の評価が改善不能な場合を示します。
<!-- definition-example-end -->

<a id="thm-sgt5-weyl"></a>

<!-- formal-statement-start -->
> **定理（対称行列の固有値摂動評価）**  
> $A$ と $\widetilde A=A+E$ が実対称 $n$ 次行列で、$\varepsilon=\|E\|_2$ とする。小さい順の固有値は、各 $1\leq j\leq n$ に対して

$$
|\widetilde\lambda_j-\lambda_j|\leq\varepsilon
$$

> を満たす。固有値が重複する場合も含む。
<!-- formal-statement-end -->

### 証明の見取り図

対称行列の固有ベクトルによる直交展開を使うと、第 $j$ 固有値は $j$ 次元部分空間上の最大Rayleigh商の最小値です。$x^\mathsf TEx$ が高々 $\varepsilon$ だけ加わることを、この最小最大表示の両側に入れます。

<!-- proof-start -->
### 証明

[実対称行列のスペクトル定理](../../../基礎科目/F0/F0-00F1/index.md#thm-real-symmetric-spectral)を $A$ に適用し、正規直交固有基底を $u_1,\ldots,u_n$ とし、$x=\sum_i c_i u_i$、$\|x\|_2=1$ とします。直交性から

$$
x^\mathsf TAx=\sum_{i=1}^n\lambda_i c_i^2,\qquad
\sum_{i=1}^n c_i^2=1.
$$

任意の $j$ 次元部分空間 $S$ について $\dim S+\dim\operatorname{span}(u_j,\ldots,u_n)=n+1$ なので、両者には零でない共通ベクトルがあります。その単位化 $x$ のRayleigh商は $\lambda_j$ 以上です。一方、$S_0=\operatorname{span}(u_1,\ldots,u_j)$ では全ての単位ベクトルに対して $x^\mathsf TAx\leq\lambda_j$ であり、$u_j$ で等号です。従って

$$
\lambda_j=\min_{\dim S=j}\max_{\substack{x\in S\\\|x\|_2=1}}x^\mathsf TAx.
$$

作用素ノルムの定義とCauchy–Schwarzから、各単位ベクトル $x$ で

$$
|x^\mathsf TEx|\leq\|x\|_2\|Ex\|_2\leq\varepsilon.
$$

よって任意の $S$ について

$$
\max_{x\in S,\ \|x\|_2=1}x^\mathsf TAx-\varepsilon
\leq
\max_{x\in S,\ \|x\|_2=1}x^\mathsf T\widetilde Ax
\leq
\max_{x\in S,\ \|x\|_2=1}x^\mathsf TAx+\varepsilon.
$$

両側で $j$ 次元部分空間にわたる最小値を取ると $\lambda_j-\varepsilon\leq\widetilde\lambda_j\leq\lambda_j+\varepsilon$ が得られます。
<!-- proof-end -->

この評価は各固有値の**位置**だけを制御します。固有値が互いに近い場合には、対応する固有ベクトルが大きく回っても矛盾しません。

## 2. 一本の固有ベクトルではなく空間を比較する

[SGT4の多群のスペクトル緩和](../SGT4/index.md#thm-sgt4-kway-trace)では、下位 $k$ 本の固有ベクトルを行列の列に取りました。その列は直交変換で取り替えられます。例えば列を二本入れ替えても張る空間は同じです。列そのものを座標ごとに比較する代わりに、空間への直交射影を比較します。

<a id="def-sgt5-subspace-projector"></a>

<!-- formal-statement-start -->
> **定義（下位固有空間と直交射影）**  
> 実対称行列 $A$ の正規直交固有ベクトル $u_1,\ldots,u_n$ を固有値の昇順に取る。$1\leq k<n$ で $\lambda_k<\lambda_{k+1}$ とする。このとき下位 $k$ 次元固有空間と、その直交射影を

$$
U=\operatorname{span}(u_1,\ldots,u_k),\qquad
P=\sum_{i=1}^k u_iu_i^\mathsf T
$$

> と定義する。別の直交基底を選んでも $P$ は変わらない。更新後の固有値にも第 $k$ と第 $k+1$ の間の厳密なギャップがある場合、同様に $\widetilde U,\widetilde P$ を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sgt5-subspace-projector -->
### 例：基底が回っても射影は動かない

**定義の確認**：$\mathbb R^3$ で $U=\operatorname{span}(e_1,e_2)$ とすると $P=\operatorname{diag}(1,1,0)$。別の直交基底 $v_1=(e_1+e_2)/\sqrt2$、$v_2=(e_1-e_2)/\sqrt2$ から作ると

$$
v_1v_1^\mathsf T+v_2v_2^\mathsf T
=\frac12\begin{pmatrix}1&1&0\\1&1&0\\0&0&0\end{pmatrix}
+\frac12\begin{pmatrix}1&-1&0\\-1&1&0\\0&0&0\end{pmatrix}
=P.
$$

列は違っても空間への射影は一致します。
<!-- definition-example-end -->

下位 $k$ 本と残りとの固有値の差 $\delta=\lambda_{k+1}-\lambda_k$ が重要です。空間**内部**の固有値は重複していても構いません。一方、この外側の隙間が零なら「下位 $k$ 次元空間」を一意に選べなくなることがあります。

<a id="thm-sgt5-subspace-bound"></a>

<!-- formal-statement-start -->
> **定理（下位固有空間のDavis–Kahan型摂動評価）**  
> $A,\widetilde A=A+E$ を実対称 $n$ 次行列とする。$1\leq k<n$ とし、$A$ の固有値に $\delta=\lambda_{k+1}-\lambda_k>0$ を仮定する。$\varepsilon=\|E\|_2<\delta/2$ なら $\widetilde\lambda_k<\widetilde\lambda_{k+1}$ となる。両者の下位 $k$ 次元空間への直交射影 $P,\widetilde P$ は

$$
\|P-\widetilde P\|_{\mathrm F}
\leq\frac{\sqrt{2k}\,\varepsilon}{\delta-\varepsilon}
$$

> を満たす。これは有限次元でのDavis–Kahan型評価であり、一般に最良定数を主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

更新後の第 $j$ 固有ベクトルを、元の $A$ の基底で分解します。$j\leq k<i$ のとき、係数を決める分母には $\lambda_i-\widetilde\lambda_j\geq\delta-\varepsilon$ が現れます。元の空間の外へ漏れた成分を足し合わせれば、射影の差も測れます。

<!-- proof-start -->
### 証明

[固有値摂動評価](#thm-sgt5-weyl)により

$$
\widetilde\lambda_{k+1}-\widetilde\lambda_k
\geq(\lambda_{k+1}-\varepsilon)-(\lambda_k+\varepsilon)
=\delta-2\varepsilon>0.
$$

したがって更新後の下位 $k$ 次元空間も一意です。[実対称行列のスペクトル定理](../../../基礎科目/F0/F0-00F1/index.md#thm-real-symmetric-spectral)により元の固有直交基底を $u_1,\ldots,u_n$ と選び、更新後の下位固有ベクトルを $\widetilde u_1,\ldots,\widetilde u_k$ とします。更新後の固有方程式

$$
(A+E)\widetilde u_j=\widetilde\lambda_j\widetilde u_j
$$

を変形し、左から $u_i^\mathsf T$（$i>k$）を掛けます。$u_i^\mathsf TA=\lambda_i u_i^\mathsf T$ なので

$$
(\lambda_i-\widetilde\lambda_j)
u_i^\mathsf T\widetilde u_j
=-u_i^\mathsf TE\widetilde u_j.
$$

$i>k$、$j\leq k$ に対して $\lambda_i\geq\lambda_{k+1}$、$\widetilde\lambda_j\leq\lambda_k+\varepsilon$ ですから、分母は $\delta-\varepsilon$ 以上です。従って

$$
\sum_{i>k}|u_i^\mathsf T\widetilde u_j|^2
\leq\frac{\sum_{i>k}|u_i^\mathsf TE\widetilde u_j|^2}
{(\delta-\varepsilon)^2}
\leq\frac{\|E\widetilde u_j\|_2^2}{(\delta-\varepsilon)^2}
\leq\frac{\varepsilon^2}{(\delta-\varepsilon)^2}.
$$

中央の不等式は、正規直交基底に関する座標の平方和の一部を全体で抑えたものです。$j=1,\ldots,k$ について足すと

$$
\sum_{j\leq k}\sum_{i>k}|u_i^\mathsf T\widetilde u_j|^2
\leq\frac{k\varepsilon^2}{(\delta-\varepsilon)^2}.
$$

最後に射影の恒等式を証明します。$P^2=P$、$\widetilde P^2=\widetilde P$、両方の階数が $k$ なので

$$
\begin{aligned}
\|P-\widetilde P\|_{\mathrm F}^2
&=\operatorname{tr}((P-\widetilde P)^2)\\
&=2k-2\operatorname{tr}(P\widetilde P)\\
&=2k-2\sum_{j\leq k}\sum_{i\leq k}|u_i^\mathsf T\widetilde u_j|^2\\
&=2\sum_{j\leq k}\sum_{i>k}|u_i^\mathsf T\widetilde u_j|^2.
\end{aligned}
$$

最後の等号には、各 $\widetilde u_j$ の全基底における座標二乗和が1であることを使いました。先ほどの上界を入れ、平方根を取れば結論を得ます。
<!-- proof-end -->

### なぜギャップが必要か

$A=\operatorname{diag}(0,0,3)$ を考えます。$k=1$ では $\lambda_1=\lambda_2=0$ でギャップがありません。$E_s=\operatorname{diag}(s,-s,0)$（$s>0$）を加えると更新後の最小固有ベクトルは $e_2$、反対符号の $-E_s$ なら $e_1$ です。いずれも $\|E_s\|_2=s\to0$ なのに、選ばれる一次元空間の射影のFrobenius距離は $\sqrt2$ です。対照的に $k=2$ では外側のギャップが3で、両摂動の下位二次元空間は $\operatorname{span}(e_1,e_2)$ のままです。**内部の重複**と**選んだ空間の境界での重複**は違います。

## 3. 第二固有ベクトルを使うなら二側のギャップを見る

二分割では第二固有ベクトル一本を使います。第二固有値と第三固有値の隔たりだけでなく、第一固有値からの隔たりも必要です。対称行列でこの二側の隔たりがあると、符号をそろえた固有ベクトルそのものを比較できます。

<a id="thm-sgt5-eigenvector-bound"></a>

<!-- formal-statement-start -->
> **定理（単純固有ベクトルの方向の安定性）**  
> $A,\widetilde A=A+E$ は実対称 $n$ 次行列、$\|E\|_2=\varepsilon$ とする。$\lambda_j$ が単純で、他の固有値との最小距離

$$
\gamma=\min_{i\ne j}|\lambda_i-\lambda_j|>0
$$

> を持つとする。$\varepsilon<\gamma/2$ なら更新後の第 $j$ 固有値も単純である。元と更新後の単位固有ベクトル $u,\widetilde u$ は符号 $\sigma\in\{-1,1\}$ を適切に選ぶと

$$
\sqrt{1-(u^\mathsf T\widetilde u)^2}
\leq\frac{\varepsilon}{\gamma-\varepsilon},
\qquad
\|u-\sigma\widetilde u\|_2
\leq\frac{\sqrt2\,\varepsilon}{\gamma-\varepsilon}
$$

> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

更新後の固有ベクトルを元の $u$ に沿う成分と、その直交成分に分けます。直交成分の各係数は、元の他の固有値と更新後の第 $j$ 固有値との差で割ったものです。最後に二本の単位ベクトルの角度から距離へ直します。

<!-- proof-start -->
### 証明

[固有値摂動評価](#thm-sgt5-weyl)により、隣接固有値との差は更新後も $\gamma-2\varepsilon>0$ 以上です（端の固有値では存在する隣だけを使います）。従って $\widetilde\lambda_j$ は単純です。

[実対称行列のスペクトル定理](../../../基礎科目/F0/F0-00F1/index.md#thm-real-symmetric-spectral)で $u=u_j$ を含む $A$ の固有直交基底 $u_1,\ldots,u_n$ を取ります。第2節と同じ固有方程式の計算で、$i\ne j$ について

$$
(\lambda_i-\widetilde\lambda_j)
u_i^\mathsf T\widetilde u=-u_i^\mathsf TE\widetilde u.
$$

ここで $|\lambda_i-\widetilde\lambda_j|\geq|\lambda_i-\lambda_j|-|\widetilde\lambda_j-\lambda_j|\geq\gamma-\varepsilon$。二乗して足すと

$$
\begin{aligned}
\|(I-uu^\mathsf T)\widetilde u\|_2^2
&=\sum_{i\ne j}|u_i^\mathsf T\widetilde u|^2\\
&\leq\frac{\|E\widetilde u\|_2^2}{(\gamma-\varepsilon)^2}
\leq\frac{\varepsilon^2}{(\gamma-\varepsilon)^2}.
\end{aligned}
$$

左辺は $1-(u^\mathsf T\widetilde u)^2$ です。次に $\sigma$ を $u^\mathsf T(\sigma\widetilde u)\geq0$ となるよう選び、$c=|u^\mathsf T\widetilde u|\in[0,1]$ とします。直接計算すると

$$
\|u-\sigma\widetilde u\|_2^2=2(1-c)
\leq2(1-c^2),
$$

なぜなら $c^2\leq c$ だからです。平方根を取り第一の評価を代入すれば第二の評価を得ます。
<!-- proof-end -->

[SGT2の正規化スペクトルと核](../SGT2/index.md#thm-sgt2-spectrum-kernel)によれば、正次数で連結なら正規化Laplacianの第一固有値は0で単純です。第二固有値についてはさらに第二と第三のギャップが必要です。第二固有値が重複するなら一本の第二固有ベクトルの安定性は主張できませんが、第2節の下位空間の評価は使える場合があります。

## 4. グラフの重み誤差を行列ノルムへ変換する

上の定理は $E$ を入力としていました。グラフの問題では最初に変わるのは辺重みです。[SGT1の組合せLaplacian](../SGT1/index.md#def-sgt1-laplacian)については、辺一本の変更を正確に行列へ反映できます。

<a id="prop-sgt5-edge-update"></a>

<!-- formal-statement-start -->
> **命題（組合せLaplacianの一辺更新）**  
> 無向重み付きグラフの異なる頂点 $p,q$ の辺重みを $s$ だけ増減させ、更新後も全ての重みを非負とする。$b=e_p-e_q$ と置くと

$$
\widetilde L-L=sbb^\mathsf T,\qquad
\|\widetilde L-L\|_2=2|s|
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

辺の重みを変えると、対角の二成分には $s$、対称な非対角の二成分には $-s$ が加わります。この四成分は $bb^\mathsf T$ で表せます。

<!-- proof-start -->
### 証明

$L=D-W$ であり、重みの変更により $\Delta D_{pp}=\Delta D_{qq}=s$、$\Delta W_{pq}=\Delta W_{qp}=s$、それ以外は零です。よって $\Delta L=sbb^\mathsf T$ です。$\|b\|_2^2=2$ であり、$bb^\mathsf Tb=(b^\mathsf Tb)b=2b$。一方 $b$ に直交するベクトル $x$ は $bb^\mathsf Tx=0$ です。従って $sbb^\mathsf T$ の固有値は $2s$ と零（重複度 $n-1$）で、作用素ノルムは $2|s|$ です。
<!-- proof-end -->

しかし[正規化Laplacian](../SGT2/index.md#def-sgt2-normalized)では重み変更により $D^{-1/2}$ も変わります。正規化前の $L$ の誤差だけを代入するのは誤りです。ここでは次数の下界を設けて、正規化後の誤差を明示します。

<a id="prop-sgt5-normalized-update"></a>

<!-- formal-statement-start -->
> **命題（正規化Laplacianの摂動量）**  
> $W,\widetilde W$ を同じ頂点集合上の対称・成分非負・対角零の重み行列とし、次数対角行列を $D,\widetilde D$ とする。両グラフの全次数が $m\leq d_i,\widetilde d_i\leq M$ を満たし、$m>0$ とする。さらに

$$
\xi=\|\widetilde W-W\|_2,\qquad
\eta=\max_i|\widetilde d_i-d_i|
$$

> とする。対称正規化Laplacian $\mathcal L=I-D^{-1/2}WD^{-1/2}$ と $\widetilde{\mathcal L}=I-\widetilde D^{-1/2}\widetilde W\widetilde D^{-1/2}$ は

$$
\|\widetilde{\mathcal L}-\mathcal L\|_2
\leq\frac{\xi}{m}+\frac{M\eta}{m^2}
$$

> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

逆平方根の変化をまず一変数の差の評価に落とします。その後、三つの行列積の差を一因子ずつ入れ替えれば、次数が動く影響を落とさず評価できます。

<!-- proof-start -->
### 証明

$B=D^{-1/2}$、$\widetilde B=\widetilde D^{-1/2}$ と置きます。正数 $a,b\geq m$ について逆平方根の差を分母の有理化で計算すると

$$
|d_i^{-1/2}-\widetilde d_i^{-1/2}|
=\frac{|d_i-\widetilde d_i|}{\sqrt{d_i\widetilde d_i}(\sqrt{d_i}+\sqrt{\widetilde d_i})}
\leq\frac{|d_i-\widetilde d_i|}{2m^{3/2}}
\leq\frac{\eta}{2m^{3/2}}.
$$

したがって対角行列の作用素ノルムは

$$
\|B-\widetilde B\|_2\leq\frac{\eta}{2m^{3/2}},
\qquad
\|B\|_2,\|\widetilde B\|_2\leq\frac1{\sqrt m}.
$$

非負・対称な $W$ について $\|W\|_2\leq M$ を確認します。任意のベクトル $x$ では加重Cauchy–Schwarzにより

$$
\begin{aligned}
\|Wx\|_2^2
&=\sum_i\left(\sum_jw_{ij}x_j\right)^2\\
&\leq\sum_i d_i\sum_jw_{ij}x_j^2
\leq M\sum_jd_jx_j^2
\leq M^2\|x\|_2^2.
\end{aligned}
$$

$\widetilde W$ についても同じです。ここで積を展開すると

$$
\begin{aligned}
\widetilde B\widetilde W\widetilde B-BWB
={}&(\widetilde B-B)\widetilde W\widetilde B\\
&+B(\widetilde W-W)\widetilde B
+BW(\widetilde B-B).
\end{aligned}
$$

作用素ノルムの三角不等式と積の評価を各項へ適用して

$$
\begin{aligned}
\|\widetilde{\mathcal L}-\mathcal L\|_2
&\leq\frac{\eta}{2m^{3/2}}\frac M{\sqrt m}
+\frac1{\sqrt m}\xi\frac1{\sqrt m}
+\frac1{\sqrt m}M\frac{\eta}{2m^{3/2}}\\
&=\frac{\xi}{m}+\frac{M\eta}{m^2}.
\end{aligned}
$$

二つの正規化行列の恒等行列部分は差で消えるため、これで結論です。
<!-- proof-end -->

例えば元と更新後で $m$ が小さくなるほど、この上界は大きくなります。これは単なる技巧ではありません。正規化の操作は次数が零に近いと敏感になり、次数零なら[SGT2の正次数頂点規約](../SGT2/index.md#def-sgt2-positive-degree)なしに定義できません。

## 5. 固有ベクトルが安定でも閾値分割には余裕が要る

[SGT4の閾値分割](../SGT4/index.md#def-sgt4-threshold-partition)は $S_t=\{i:x_i>t\}$ です。固有ベクトルの誤差が小さくても、閾値ちょうどの座標があれば、わずかな変化で所属が反転します。必要なのは**各座標と閾値の距離**です。

<a id="def-sgt5-threshold-margin"></a>

<!-- formal-statement-start -->
> **定義（閾値の余裕）**  
> $x\in\mathbb R^n$ と固定閾値 $t\in\mathbb R$ に対して

$$
\rho(x,t)=\min_{1\leq i\leq n}|x_i-t|
$$

> を閾値の余裕とする。$\rho(x,t)>0$ なら全座標が閾値から離れている。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sgt5-threshold-margin -->
### 例：同じ道でも閾値の置き方で保証が変わる

**定義の確認**：$x=(1,1/2,-1/2,-1)^\mathsf T$ では $t=0$ に対し $\rho(x,0)=1/2$ です。一方 $t=1/2$ なら $\rho(x,1/2)=0$ です。同じベクトルでも、後者では頂点2が境界上にあり、誤差だけでは所属を保証できません。
<!-- definition-example-end -->

<a id="thm-sgt5-threshold-stability"></a>

<!-- formal-statement-start -->
> **定理（固定閾値の分割が変わらない十分条件）**  
> $x,y\in\mathbb R^n$ と固定した $t$ に対し、$\|x-y\|_2\leq a$、$\rho(x,t)>a$ とする。このとき

$$
\{i:x_i>t\}=\{i:y_i>t\}.
$$

> 特に[単純固有ベクトルの方向の安定性](#thm-sgt5-eigenvector-bound)で符号を合わせた $x=u$、$y=\sigma\widetilde u$ には

$$
\rho(u,t)>\frac{\sqrt2\,\varepsilon}{\gamma-\varepsilon}
$$

> が十分である。ただし $\varepsilon<\gamma/2$ とする。
<!-- formal-statement-end -->

### 証明の見取り図

ユークリッドノルムが $a$ 以下なら各座標の誤差も $a$ 以下です。すべての座標が閾値からそれより遠ければ、閾値の反対側へ渡れません。

<!-- proof-start -->
### 証明

各 $i$ について $|x_i-y_i|\leq\|x-y\|_2\leq a$ です。$x_i>t$ なら $x_i-t\geq\rho(x,t)>a$ なので

$$
y_i-t=(x_i-t)+(y_i-x_i)
\geq\rho(x,t)-a>0.
$$

$x_i<t$ なら同様に

$$
y_i-t=(x_i-t)+(y_i-x_i)
\leq-\rho(x,t)+a<0.
$$

$\rho>0$ だから $x_i=t$ は起こりません。従って両集合は等しくなります。固有ベクトルの場合は[前節のノルム評価](#thm-sgt5-eigenvector-bound)を $a$ に代入すればよいです。
<!-- proof-end -->

ただしこれは**固定閾値**についての結果です。データから閾値を選び直す算法、固有ベクトルの符号の選択、$k$-meansによる行の丸めには、それぞれ別の安定性条件が必要です。また座標ごとのラベルが安定したからといって、未知の「真の群」を正しく回復できたとは限りません。

### 例：三頂点道で固有ベクトルは連続でも集合は切り替わる

頂点 $1-2-3$ の辺重みを $1$ と $b=1+s$（$b>0$）にすると

$$
L_s=\begin{pmatrix}
1&-1&0\\
-1&1+b&-b\\
0&-b&b
\end{pmatrix},
\qquad
L_s-L_0=s(e_2-e_3)(e_2-e_3)^\mathsf T.
$$

[一辺更新](#prop-sgt5-edge-update)より $\|L_s-L_0\|_2=2|s|$ です。まず行和が零なので固有値0を持ちます。対角和は $2(1+b)$ です。二次主小行列式を、頂点3、2、1をそれぞれ除いて計算すると

$$
\begin{aligned}
\det\begin{pmatrix}1&-1\\-1&1+b\end{pmatrix}&=b,\\
\det\begin{pmatrix}1&0\\0&b\end{pmatrix}&=b,\\
\det\begin{pmatrix}1+b&-b\\-b&b\end{pmatrix}&=b.
\end{aligned}
$$

その和は $3b$ なので、特性多項式と零以外の二つの固有値は

$$
\det(\lambda I-L_s)=\lambda[\lambda^2-2(1+b)\lambda+3b],
$$

$$
\lambda_{2,3}=1+b\mp\sqrt{(1+b)^2-3b}
=1+b\mp\sqrt{1-b+b^2}.
$$

第二固有値は小さい方であり、$b=1+s$ を代入すると

$$
\lambda_2(s)=2+s-\sqrt{1+s+s^2}
$$

です。$s=0$ では固有値 $(0,1,3)$、第二固有ベクトルを $u=(1,0,-1)^\mathsf T/\sqrt2$ に取れます。十分小さい $|s|$ で更新後の第二固有ベクトルの第一座標を正に選び、$x_1>0$ とすると、第一行の固有方程式から

$$
(1-\lambda_2(s))x_1=x_2.
$$

$|s|<1$ では $\lambda_2(s)>1$ と $s>0$ は同値です。実際、

$$
\lambda_2(s)>1
\ \Longleftrightarrow\
1+s>\sqrt{1+s+s^2}
\ \Longleftrightarrow\
(1+s)^2>1+s+s^2
\ \Longleftrightarrow\ s>0.
$$

従って $s>0$ なら $x_2<0$、$s<0$ なら $x_2>0$。第三行の固有方程式と第二固有値の表示から

$$
(b-\lambda_2(s))x_3=bx_2,\qquad
b-\lambda_2(s)=\sqrt{1+s+s^2}-1.
$$

$0<|s|<1$ なら $b=1+s>0$ であり、$\sqrt{1+s+s^2}-1$ の符号は $s(1+s)$、すなわち $s$ と同じです。他方 $x_2$ の符号は $s$ と逆なので、上の等式から $x_3<0$ と分かります。$s=0$ でも基準ベクトルの第三成分は負です。**固定閾値 $t=0$ の集合**は $s>0$ 側で $\{1\}$、$s<0$ 側で $\{1,2\}$ になります。しかし第二固有値は単純で、前の定理によればその固有ベクトルの方向は $s\to0$ で安定です。原因は $u_2=0$、すなわち $\rho(u,0)=0$ という閾値の余裕不足です。

## 6. 固有値・空間・分割の保証をどう使うか

実際のグラフでは、まず元と更新後の重みから $\varepsilon=\|\Delta L\|_2$、あるいは正規化Laplacianの誤差上界を求めます。次に、**追いたい空間の外側のギャップ**と比較します。最後に固有ベクトルを離散化するなら、閾値の余裕まで確認します。順番を逆にして「固有値が近いから分割も同じ」と断言することはできません。

[SGT4の閾値候補の列挙](../SGT4/index.md#prop-sgt4-threshold-finite)は、更新されたベクトルから最良候補を調べる有限算法を与えます。しかしここで証明したのは、指定した入力誤差とギャップ・余裕の**保証を与える条件**です。離散最適分割の一意性や統計的なクラスタ回復について追加の保証は与えていません。

## 7. 演習：摂動の大きさ、ギャップ、離散化を順に検算する

### Level A：基本量を手で測る

#### A1. 対角摂動の固有値

$A=\operatorname{diag}(0,3)$、$\widetilde A=\operatorname{diag}(s,3-s)$、$|s|<1$ とする。摂動量と固有値差を求めよ。

- Level: A
- ID: SGT5-A1

<!-- solution-start -->
**詳細解答**　差は $E=\operatorname{diag}(s,-s)$。単位ベクトル $x$ に対し $\|Ex\|_2^2=s^2$ なので $\|E\|_2=|s|$。$|s|<1$ なら $s<3-s$ なので順序を入れ替える必要はありません。元の固有値 $(0,3)$ から $(s,3-s)$ へ変わるため、両固有値の差の絶対値は $|s|$ です。[固有値摂動定理](#thm-sgt5-weyl)はここで等号になります。
<!-- solution-end -->

#### A2. 射影行列を作る

$\mathbb R^3$ の $U=\operatorname{span}(e_1,e_2)$、$\widetilde U=\operatorname{span}(e_1,(e_2+e_3)/\sqrt2)$ への射影を求め、Frobenius距離を計算せよ。

- Level: A
- ID: SGT5-A2

<!-- solution-start -->
**詳細解答**　それぞれの直交基底の列 $v$ ごとに $vv^\mathsf T$ を足すと

$$
P=\begin{pmatrix}1&0&0\\0&1&0\\0&0&0\end{pmatrix},\quad
\widetilde P=
\begin{pmatrix}
1&0&0\\
0&1/2&1/2\\
0&1/2&1/2
\end{pmatrix}.
$$

差は右下の $2$ 次ブロックが $\left(\begin{smallmatrix}1/2&-1/2\\-1/2&-1/2\end{smallmatrix}\right)$ で、四成分の平方和が $4(1/2)^2=1$ です。よって $\|P-\widetilde P\|_{\mathrm F}=1$。共通する $e_1$ の方向は距離へ寄与しません。
<!-- solution-end -->

#### A3. 辺重みの変更

三頂点道の辺 $\{2,3\}$ の重みを $s$ だけ変える。$\Delta L$ を書き、その固有値と作用素ノルムを求めよ。

- Level: A
- ID: SGT5-A3

<!-- solution-start -->
**詳細解答**　更新を受ける対角成分は $(2,2),(3,3)$、非対角は $(2,3),(3,2)$ なので

$$
\Delta L=s\begin{pmatrix}0&0&0\\0&1&-1\\0&-1&1\end{pmatrix}.
$$

$(0,1,-1)^\mathsf T$ に作用させると $2s(0,1,-1)^\mathsf T$、これと直交する $(1,0,0)^\mathsf T,(0,1,1)^\mathsf T$ は核に属します。従って固有値は $0,0,2s$、作用素ノルムは $2|s|$ です。
<!-- solution-end -->

#### A4. 閾値の余裕を比較する

$x=(0.8,0.2,-0.3,-0.9)^\mathsf T$ と $t=0$ に対し $\rho(x,t)$ を求める。$\|x-y\|_2\leq0.15$ のとき閾値集合は変わらないか。$t=0.2$ ではどうか。

- Level: A
- ID: SGT5-A4

<!-- solution-start -->
**詳細解答**　$t=0$ への座標距離は $0.8,0.2,0.3,0.9$ なので $\rho(x,0)=0.2>0.15$ です。[固定閾値の分割が変わらない十分条件](#thm-sgt5-threshold-stability)から全ての許容 $y$ で集合は $\{1,2\}$ のままです。一方 $t=0.2$ では第二座標が閾値と一致し $\rho(x,0.2)=0$。例えば $y=x+(0,0.01,0,0)^\mathsf T$ なら $\|x-y\|_2=0.01$ でも第二頂点が新たに $S_{0.2}$ に入るため、一般には不変と言えません。
<!-- solution-end -->

### Level B：評価を自分で導く

#### B1. 固有値評価の下界側

実対称 $A$ と $E$ に対して、最小最大表示を使い $\widetilde\lambda_j\geq\lambda_j-\|E\|_2$ を導出せよ。固有値の重複があっても成立する理由を記せ。

- Level: B
- ID: SGT5-B1

<!-- solution-start -->
**詳細解答**　任意の単位 $x$ に $x^\mathsf T(A+E)x\geq x^\mathsf TAx-\|E\|_2$ が成り立ちます。従って任意の $j$ 次元部分空間 $S$ に対して

$$
\max_{\substack{x\in S\\\|x\|_2=1}}x^\mathsf T(A+E)x
\geq
\max_{\substack{x\in S\\\|x\|_2=1}}x^\mathsf TAx-\|E\|_2.
$$

両辺で $\dim S=j$ の全ての部分空間にわたる最小値を取り、[固有値摂動定理の証明](#thm-sgt5-weyl)で導いた最小最大表示を使うと $\widetilde\lambda_j\geq\lambda_j-\|E\|_2$ です。最小最大表示は重複を数えて並べた正規直交固有基底から導かれ、固有値の相異性は使っていません。
<!-- solution-end -->

#### B2. 射影の距離と漏れの一致

階数 $k$ の直交射影 $P=UU^\mathsf T$、$Q=VV^\mathsf T$ について、$U,V$ の列がそれぞれ正規直交であり、$U_\perp$ が $U$ の直交補空間の正規直交基底であるとする。次を証明せよ。

$$
\|P-Q\|_{\mathrm F}^2=2\|U_\perp^\mathsf TV\|_{\mathrm F}^2.
$$

- Level: B
- ID: SGT5-B2

<!-- solution-start -->
**詳細解答**　射影の対称性と冪等性から

$$
\|P-Q\|_{\mathrm F}^2
=\operatorname{tr}(P^2+Q^2-PQ-QP)
=2k-2\operatorname{tr}(PQ).
$$

$\operatorname{tr}(PQ)=\operatorname{tr}(U^\mathsf TVV^\mathsf TU)=\|U^\mathsf TV\|_{\mathrm F}^2$。また $UU^\mathsf T+U_\perp U_\perp^\mathsf T=I$ を $V$ の両側から挟み、対角和を取れば

$$
\|U^\mathsf TV\|_{\mathrm F}^2
+\|U_\perp^\mathsf TV\|_{\mathrm F}^2
=\operatorname{tr}(V^\mathsf TV)=k.
$$

両式を合わせると指定された恒等式になります。空間内部の基底の選び方には依存しません。
<!-- solution-end -->

#### B3. 正規化行列の誤差上界

二つの正次数重み付きグラフについて、$m=2,M=5,\xi=0.1,\eta=0.2$ がそれぞれ第4節の仮定を満たすとする。正規化Laplacianの誤差上界を求め、外側の固有値ギャップ $\delta=0.5$、$k=2$ のとき第2節の安定性定理が適用できるか確認せよ。

- Level: B
- ID: SGT5-B3

<!-- solution-start -->
**詳細解答**　[正規化Laplacianの摂動量](#prop-sgt5-normalized-update)から

$$
\varepsilon\leq\frac{0.1}{2}+\frac{5\cdot0.2}{2^2}
=0.05+0.25=0.30.
$$

第2節の仮定は $\varepsilon<\delta/2=0.25$ です。上界 $0.30$ だけでは実際の $\varepsilon$ が $0.25$ 未満かどうか判断できず、定理の**適用は保証できません**。「上界が条件を満たさない」と「実際に不安定」は異なります。実行列からより鋭い $\varepsilon$ を求めるか、別の評価が必要です。
<!-- solution-end -->

#### B4. 一次元の摂動と閾値

単純固有値のギャップが $\gamma=1$、作用素摂動が $\varepsilon=0.1$ とする。符号を合わせた固有ベクトルのユークリッド距離の上界を求め、固定閾値の余裕が $0.20$ または $0.10$ なら何が言えるか。

- Level: B
- ID: SGT5-B4

<!-- solution-start -->
**詳細解答**　$0.1<1/2$ なので[単純固有ベクトルの評価](#thm-sgt5-eigenvector-bound)を適用できます。距離は

$$
\|u-\sigma\widetilde u\|_2
\leq\frac{\sqrt2(0.1)}{1-0.1}
=\frac{\sqrt2}{9}\approx0.1572.
$$

余裕 $0.20$ ならこの上界より大きく、[閾値安定性定理](#thm-sgt5-threshold-stability)で分割の不変が保証されます。余裕 $0.10$ なら十分条件を満たさず、この評価だけでは分割が変わるとも変わらないとも断定できません。
<!-- solution-end -->

### Level C：グラフの固有値と離散化の失敗を接続する

#### C1. 三頂点道の摂動と閾値の反転

重み1の三頂点道 $1-2-3$ の $\{2,3\}$ の重みだけ $1+s$ にし、$0<|s|<1/4$ とする。(i) 行列と固有値を求めよ。(ii) $\|L_s-L_0\|_2$ と、$L_0$ の第二固有値の隔たりから固有ベクトルの方向の評価を与えよ。(iii) 第二固有ベクトルの第一座標を正としたとき、閾値0での集合が $s$ の正負で変わることを示せ。この現象が(ii)と矛盾しない理由を述べよ。

- Level: C
- ID: SGT5-C1

<!-- solution-start -->
**詳細解答**　$b=1+s$ とすると、[組合せLaplacianの定義](../SGT1/index.md#def-sgt1-laplacian)から

$$
L_s=\begin{pmatrix}1&-1&0\\-1&1+b&-b\\0&-b&b\end{pmatrix}.
$$

各行和は零なので固有値0を持ちます。残りの固有値の和は $\operatorname{tr}L_s=2(1+b)$、非零固有値の積は、三つの二次主小行列式の和です。頂点3、2、1をそれぞれ除いた主小行列の行列式は

$$
(1+b)-1=b,\qquad 1\cdot b=b,\qquad (1+b)b-b^2=b.
$$

従って和は $3b$ で、非零固有値の和と積から二次式

$$
\lambda^2-2(1+b)\lambda+3b=0
$$

を得ます。判別式の4分の1は $(1+b)^2-3b=1-b+b^2$ なので、二根は

$$
\lambda_2=1+b-\sqrt{1-b+b^2}
=2+s-\sqrt{1+s+s^2},
$$

$$
\lambda_3=1+b+\sqrt{1-b+b^2}
=2+s+\sqrt{1+s+s^2}.
$$

(ii) [一辺更新の命題](#prop-sgt5-edge-update)より $\varepsilon=2|s|<1/2$。$s=0$ のスペクトルは $0,1,3$ なので、第二固有値の他の固有値からの最小距離は $\gamma=\min(1,2)=1$。[単純固有ベクトルの方向の安定性](#thm-sgt5-eigenvector-bound)から、基準 $u=(1,0,-1)^\mathsf T/\sqrt2$ と、符号を合わせた更新後の $\widetilde u$ は

$$
\|u-\widetilde u\|_2
\leq\frac{2\sqrt2|s|}{1-2|s|}.
$$

これは $s\to0$ で零へ収束します。さらに $|s|<1/4$ の範囲では固有値の順序も保たれます。

(iii) 更新後の第二固有ベクトルの第一座標を $x_1>0$ とします。第一行から $x_2=(1-\lambda_2)x_1$。$\lambda_2>1$ は $s>0$ と同値です。両辺の比較は $1+s>\sqrt{1+s+s^2}$ を二乗し、$s>0$ と同値にする計算です。従って $x_2<0$（$s>0$）、$x_2>0$（$s<0$）。第三行 $(b-\lambda_2)x_3=bx_2$ において

$$
b-\lambda_2=\sqrt{1+s+s^2}-1
$$

は $s$ と同符号です（$-1/4<s<1/4$ なら $1+s+s^2-1=s(1+s)$ の符号が $s$ と同じ）。ゆえに $x_3<0$ が両側で成り立ちます。閾値集合 $\{i:x_i>0\}$ は $s>0$ で $\{1\}$、$s<0$ で $\{1,2\}$。基準の第二座標はちょうど0で $\rho(u,0)=0$ なので、[固定閾値安定性定理](#thm-sgt5-threshold-stability)の余裕の仮定を満たしません。固有ベクトルのノルム距離が零へ向かっても、閾値の両側を行き来できるため矛盾しません。
<!-- solution-end -->

## 8. 次の論点

本章では、固有値の揺れから固有空間の揺れへ進むには**外側の固有値間隔**が必要だと証明しました。また、正規化Laplacianでは辺重みだけでなく次数の変化を評価し、固定閾値分割を保存するには別に**座標の余裕**が必要と確認しました。次のSGT6では、空間の安定性から話題を移し、ランダムウォークの分布が時間とともにどの速度で定常分布へ近づくかを調べます。
