# ML1-05 Ridge回帰・縮小・偏りと分散

<!-- definition-example-audit: strict -->

## 1. 非一意な係数を決めると、何を失い何を得るのか

[前講の最小二乗法](../ML1-04/index.md#def-ml1-04-least-squares)では、データの予測値と応答の差を最小にした。しかし、特徴量が重複すると係数は一つに定まらない。仮に列が独立していても、二列がほぼ同じなら、観測値の小さな変化が係数を大きく動かし得る。訓練標本に正確に合わせることと、真の係数を安定に推定することは違う。

[正則化付き経験リスク最小化](../ML1-03/index.md#def-ml1-03-regularized-erm)で使った「データへの適合」と「係数への罰則」の考えを、二乗誤差へ適用しよう。係数の長さを罰すると、訓練誤差が少し増えても推定の揺れを小さくできる可能性がある。ただし、係数を0に近づけると、真の係数からのずれも生まれる。この交換関係を**偏りと分散**に分けて定量化することが本章の問いである。

まず $X\in\mathbb R^{n\times p}$ と $y\in\mathbb R^n$ は観測後に固定した数値とし、$n,p\ge1$ とする。最初の最適化の議論には確率分布を仮定しない。第5節から、同じ $X$ のもとで応答 $Y$ を繰り返し観測する確率模型を別に導入する。両者を混同しない。

## 2. Ridge回帰の目的関数と直接計算

係数 $\beta\in\mathbb R^p$ を小さく保つために、残差平方和の半分の平均へ $\|\beta\|_2^2$ の半分を加える。前講と同じ $1/(2n)$ の損失を使い、罰則だけに係数 $\lambda$ を掛けるので、以下の正規方程式には $n\lambda$ が現れる。

<a id="def-ml1-05-ridge"></a>

<!-- formal-statement-start -->
> **定義（Ridge回帰）**  
> $n,p\ge1$、$X\in\mathbb R^{n\times p}$、$y\in\mathbb R^n$、$\lambda\ge0$ に対し、係数 $\beta\in\mathbb R^p$ の目的関数を

$$
J_\lambda(\beta)
=\frac1{2n}\|X\beta-y\|_2^2
+\frac{\lambda}{2}\|\beta\|_2^2
$$

> とする。これを最小化する方法をRidge回帰という。$\lambda$ を正則化係数と呼び、$\lambda=0$ は通常の最小二乗法である。特に $\lambda>0$ で得られる唯一の解を $\widehat\beta_\lambda$ と表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-05-ridge -->
**定義の確認**。$n=p=2$、$X=\operatorname{diag}(1,2)$、$y=(2,2)^{\mathsf T}$、$\lambda=1$ とする。$\beta=(a,b)^{\mathsf T}$ と置けば

$$
J_1(a,b)=\frac14\{(a-2)^2+(2b-2)^2\}+\frac12(a^2+b^2).
$$

具体的に $(a,b)=(2/3,2/3)$ を代入すると、予測は $(2/3,4/3)^{\mathsf T}$、残差平方和は $16/9+4/9=20/9$、係数平方和は $8/9$ である。したがって $J_1=5/9+4/9=1$。この値の計算は最小性の証明ではない。次節で全ての $\beta$ との比較を証明する。
<!-- definition-example-end -->

$\lambda>0$ でも**訓練損失そのもの**を最小にするとは限らない。Ridgeの最適化対象は二項の和 $J_\lambda$ である。また全係数を罰する上の定義は、切片を罰しない実務上の実装とは区別する。切片の扱いは第4節で明示する。

## 3. 正規方程式に正の対角項を加える

[最小二乗の正規方程式](../../../基礎科目/F0/F0-00E1/index.md#thm-f0-00e1-normal-equations)の基礎となる二乗誤差の勾配は、[前講の偏微分の導出](../ML1-04/index.md#thm-ml1-04-normal-equations)により $X^{\mathsf T}(X\beta-y)/n$ である。罰則の第 $j$ 成分の微分は $\lambda\beta_j$ なので、全勾配は

$$
\nabla J_\lambda(\beta)
=\frac1nX^{\mathsf T}(X\beta-y)+\lambda\beta.
$$

<a id="thm-ml1-05-unique"></a>

<!-- formal-statement-start -->
> **定理（正のRidge係数と一意な最小解）**  
> $X\in\mathbb R^{n\times p}$、$y\in\mathbb R^n$、$n,p\ge1$、$\lambda>0$ とする。このとき $X$ の階数にかかわらず $X^{\mathsf T}X+n\lambda I_p$ は正定値で可逆である。$J_\lambda$ の最小解は唯一存在し、

$$
\widehat\beta_\lambda
=(X^{\mathsf T}X+n\lambda I_p)^{-1}X^{\mathsf T}y
$$

> と表せる。さらに任意の $h\in\mathbb R^p$ について

$$
J_\lambda(\widehat\beta_\lambda+h)-J_\lambda(\widehat\beta_\lambda)
=\frac1{2n}\|Xh\|_2^2+\frac{\lambda}{2}\|h\|_2^2.
$$
<!-- formal-statement-end -->

### 証明の見取り図

最小化の式を微分すると対角へ $n\lambda$ が足される。$Xh=0$ の見えない方向でも $\lambda\|h\|^2$ は正だから、階数欠損で失った一意性が回復する。単なる停留点が大域最小であることは、平方差を展開して示す。

<!-- proof-start -->
### 証明

$G=X^{\mathsf T}X$ と置く。任意の非零 $h\in\mathbb R^p$ に対し

$$
h^{\mathsf T}(G+n\lambda I_p)h
=\|Xh\|_2^2+n\lambda\|h\|_2^2>0
$$

である。よってこの $p\times p$ 実対称行列の核は $\{0\}$、従って可逆である。$\nabla J_\lambda(\beta)=0$ は $(G+n\lambda I_p)\beta=X^{\mathsf T}y$ と同値なので、停留点は表示された一つだけ存在する。

$\widehat\beta=\widehat\beta_\lambda$ とし、$r=X\widehat\beta-y$ と置く。任意の $h$ について

$$
\begin{aligned}
J_\lambda(\widehat\beta+h)-J_\lambda(\widehat\beta)
&=\frac1{2n}\bigl(2r^{\mathsf T}Xh+\|Xh\|_2^2\bigr)\\
&\quad+\frac{\lambda}{2}\bigl(2\widehat\beta^{\mathsf T}h+\|h\|_2^2\bigr)\\
&=h^{\mathsf T}\left(\frac1nX^{\mathsf T}r+\lambda\widehat\beta\right)
+\frac{\|Xh\|_2^2}{2n}+\frac{\lambda\|h\|_2^2}{2}.
\end{aligned}
$$

括弧は停留方程式から0なので定理の等式が得られる。$h\ne0$ では右辺は厳密に正である。従って $\widehat\beta$ は大域最小点であり、唯一である。$\square$
<!-- proof-end -->

前節の例では $G=\operatorname{diag}(1,4)$、$X^{\mathsf T}y=(2,4)^{\mathsf T}$、$n\lambda=2$ だから

$$
\widehat\beta_1
=\begin{pmatrix}3&0\\0&6\end{pmatrix}^{-1}
\begin{pmatrix}2\\4\end{pmatrix}
=\begin{pmatrix}2/3\\2/3\end{pmatrix}.
$$

すでに計算した $J_1=1$ が唯一の最小値である。対して $\lambda=0$ なら $\widehat\beta_0=(2,1)^{\mathsf T}$ で訓練残差は0だが、係数ノルムは大きくなる。

## 4. 特異値方向にどれだけ縮むか

行列 $X$ の[実特異値分解](../../../基礎科目/F0/F0-00F2/index.md#thm-f0-00f2-svd)を用いる。これにより特徴量空間を直交座標に取り直すと、どの方向がよく観測され、どの方向が観測されにくいかを特異値で測れる。前講では零特異値方向の係数が自由だったが、Ridgeではそれも0と決まる。

<a id="thm-ml1-05-svd-shrink"></a>

<!-- formal-statement-start -->
> **定理（特異値方向の縮小と零正則化極限）**  
> $X\in\mathbb R^{n\times p}$ の階数を $q$、実特異値分解を $X=U\Sigma V^{\mathsf T}$ とする。正の特異値を $s_1,\ldots,s_q$、対応する列を $u_j,v_j$ とする。任意の $\lambda>0$ について

$$
\widehat\beta_\lambda
=\sum_{j=1}^{q}\frac{s_j}{s_j^2+n\lambda}
(u_j^{\mathsf T}y)v_j,
\qquad
X\widehat\beta_\lambda
=\sum_{j=1}^{q}\frac{s_j^2}{s_j^2+n\lambda}
(u_j^{\mathsf T}y)u_j.
$$

> 特異値方向の適合値の縮小率 $s_j^2/(s_j^2+n\lambda)$ は0より大きく1より小さい。$\lambda\downarrow0$ では $\widehat\beta_\lambda$ は前講の最小ノルム最小二乗解 $\beta^\dagger$ に収束し、$\lambda\to\infty$ では0に収束する。
<!-- formal-statement-end -->

### 証明の見取り図

特異値分解は設計行列の座標軸を直交回転する。[階数と非零特異値の関係](../../../基礎科目/F0/F0-00F2/index.md#prop-f0-00f2-rank-singular-values)により、観測できる $q$ 方向と零方向を分ける。正の方向ごとに一変数の分数を計算するだけで、強く罰するほど縮小することが分かる。

<!-- proof-start -->
### 証明

$X^{\mathsf T}X=V(\Sigma^{\mathsf T}\Sigma)V^{\mathsf T}$、$X^{\mathsf T}y=V\Sigma^{\mathsf T}U^{\mathsf T}y$ である。$V^{\mathsf T}V=I_p$ を使うと

$$
\begin{aligned}
(X^{\mathsf T}X+n\lambda I_p)^{-1}X^{\mathsf T}y
&=V(\Sigma^{\mathsf T}\Sigma+n\lambda I_p)^{-1}
\Sigma^{\mathsf T}U^{\mathsf T}y.
\end{aligned}
$$

$\Sigma^{\mathsf T}\Sigma+n\lambda I_p$ の第 $j$ 対角成分は $j\le q$ では $s_j^2+n\lambda$、それ以外では $n\lambda$ である。$\Sigma^{\mathsf T}$ の第 $j$ 行は $j\le q$ なら第 $j$ 成分に $s_j$ を持ち、$j>q$ なら零行である。したがって最初の表示式が得られる。これに $X=U\Sigma V^{\mathsf T}$ を掛ければ二番目の式を得る。

$s_j>0$、$n\lambda>0$ だから $0<s_j^2/(s_j^2+n\lambda)<1$。有限和の各項で $\lambda\downarrow0$ とすると係数は $(u_j^{\mathsf T}y)/s_j$ へ向かう。これは[最小ノルム解のSVD表示](../ML1-04/index.md#thm-ml1-04-solution-set-minimum-norm)そのものである。一方 $\lambda\to\infty$ では全ての係数が0へ向かう。有限個の成分なので、これらの成分極限はベクトルの収束を意味する。$q=0$ でも空和を0と読めば全て成り立つ。$\square$
<!-- proof-end -->

**対照例**。$X=(1\ \ 1)$、$y=2$、$n=1$ とすれば、最小二乗解は $\beta_1+\beta_2=2$ の全体である。しかし $\lambda=1$ なら

$$
\begin{pmatrix}2&1\\1&2\end{pmatrix}
\begin{pmatrix}\widehat\beta_1\\\widehat\beta_2\end{pmatrix}
=\begin{pmatrix}2\\2\end{pmatrix},
\qquad
\widehat\beta=(2/3,2/3)^{\mathsf T}.
$$

訓練予測は $4/3$ になり、元の応答2からずれる。$\lambda\downarrow0$ では最小ノルム解 $(1,1)^{\mathsf T}$ に近づく。Ridgeは**学習済み予測を保ったまま非一意性だけ除去する手法ではない**のである。

**切片の扱い**。通常の切片付きモデルを $\alpha\mathbf1+Z\theta$ と書き、罰則を $\lambda\|\theta\|^2/2$ にだけ課す場合は上記の「全係数へ正則化」と異なる。$\alpha$ による微分は $\mathbf1^{\mathsf T}(\alpha\mathbf1+Z\theta-y)=0$。したがって $\widehat\alpha=\bar y-\bar z^{\mathsf T}\widehat\theta$ である。$Z_c=Z-\mathbf1\bar z^{\mathsf T}$、$y_c=y-\bar y\mathbf1$ と置いて代入すると、残差は $Z_c\theta-y_c$。よって $\widehat\theta=(Z_c^{\mathsf T}Z_c+n\lambda I)^{-1}Z_c^{\mathsf T}y_c$ となる。切片を罰しないためには、中心化して**傾きのみに**Ridgeをかける必要がある。

## 5. 固定デザイン模型で初めて「偏り」と「分散」を考える

ここまで $y$ は固定された数値だった。分散とは反復実験で値が揺れることなので、確率模型を導入する。設計行列 $X$ と真の係数 $\beta_\star\in\mathbb R^p$ を固定し、繰り返し実験の応答を

$$
Y=X\beta_\star+\varepsilon,\qquad
\mathbb E[\varepsilon]=0,\quad
\operatorname{Cov}(\varepsilon)=\sigma^2I_n,\quad \sigma^2\ge0
$$

とする。誤差の各成分には有限の二次モーメントがあり、互いの共分散が0で、分散が同じ $\sigma^2$ であると仮定する。独立性や正規分布は以下の二次モーメント計算には不要である。

<a id="def-ml1-05-fixed-design"></a>

<!-- formal-statement-start -->
> **定義（固定デザインでの偏り・分散・平均二乗誤差）**  
> $n,p\ge1$、固定された $X\in\mathbb R^{n\times p}$、$\beta_\star\in\mathbb R^p$、$Y=X\beta_\star+\varepsilon$、$\mathbb E[\varepsilon]=0$、$\operatorname{Cov}(\varepsilon)=\sigma^2I_n$、$\sigma^2\ge0$ とする。$\lambda>0$ について $Y$ から作るRidge推定量を $\widehat\beta_\lambda(Y)$ とし、偏り、分散共分散行列、係数平均二乗誤差をそれぞれ

$$
\begin{aligned}
b_\lambda&=\mathbb E[\widehat\beta_\lambda]-\beta_\star,\\
C_\lambda&=\operatorname{Cov}(\widehat\beta_\lambda),\\
R_{\rm coef}(\lambda)&=\mathbb E\|\widehat\beta_\lambda-\beta_\star\|_2^2
\end{aligned}
$$

> と定義する。期待値は固定された $X$ と $\beta_\star$ の下で誤差 $\varepsilon$ について取る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-05-fixed-design -->
**定義の確認**。$n=p=1$、$X=(1)$、$\beta_\star=2$、$\mathbb E[\varepsilon]=0$、$\operatorname{Var}(\varepsilon)=1$、$\lambda=1$ とする。このとき $\widehat\beta_1=(2+\varepsilon)/2=1+\varepsilon/2$ なので、期待値は1、偏りは $1-2=-1$、分散は $1/4$ である。さらに誤差は $-1+\varepsilon/2$ だから、その平方の期待値は

$$
\mathbb E(-1+\varepsilon/2)^2
=1-\mathbb E[\varepsilon]+\mathbb E[\varepsilon^2]/4=5/4.
$$

ここで $\mathbb E[\varepsilon^2]=1$ は平均0と分散1から従う。よって定義の三つの量を全て直接計算できた。
<!-- definition-example-end -->

偏りは「一つの訓練標本で見えた差」ではなく反復推定の平均と真値の差である。係数誤差と予測誤差も異なる。零特異値方向の係数は観測から識別できないため、真の係数との距離にはその成分が残るが、訓練設計上の予測にはその成分は現れない。

## 6. 偏り・分散分解を行列から証明する

先ほどの一変数例を一般化する。$A_\lambda=(X^{\mathsf T}X+n\lambda I_p)^{-1}$ は固定行列であり、$Y$ だけが確率変数である。

<a id="thm-ml1-05-bias-variance"></a>

<!-- formal-statement-start -->
> **定理（Ridge推定量の偏り・分散と係数リスク）**  
> [固定デザインの定義](#def-ml1-05-fixed-design)の仮定の下、$G=X^{\mathsf T}X$、$A_\lambda=(G+n\lambda I_p)^{-1}$ とする。$\lambda>0$ に対し

$$
\begin{aligned}
b_\lambda&=-n\lambda A_\lambda\beta_\star,\\
C_\lambda&=\sigma^2 A_\lambda G A_\lambda,\\
R_{\rm coef}(\lambda)&=\|b_\lambda\|_2^2+\operatorname{tr}(C_\lambda).
\end{aligned}
$$

> $X$ の非零特異値を $s_1,\ldots,s_q$、右特異ベクトルを $v_j$ とし、$\theta_j=v_j^{\mathsf T}\beta_\star$ と書くと、零特異値方向の成分も含む係数リスクは

$$
R_{\rm coef}(\lambda)
=\sum_{j=1}^{q}
\frac{n^2\lambda^2\theta_j^2+\sigma^2s_j^2}
{(s_j^2+n\lambda)^2}
+\sum_{j=q+1}^{p}\theta_j^2.
$$
<!-- formal-statement-end -->

### 証明の見取り図

推定量へ $Y=X\beta_\star+\varepsilon$ を代入すると、一定のずれと、平均0で揺れる項へ分かれる。交差項の期待値は0なので、平均二乗誤差は偏りの二乗と分散の和になる。SVDの右特異ベクトルで座標を変えると各方向を独立した二次モーメントの項として足せる。

<!-- proof-start -->
### 証明

[一意解の公式](#thm-ml1-05-unique)から

$$
\begin{aligned}
\widehat\beta_\lambda
&=A_\lambda X^{\mathsf T}(X\beta_\star+\varepsilon)\\
&=A_\lambda G\beta_\star+A_\lambda X^{\mathsf T}\varepsilon\\
&=(I_p-n\lambda A_\lambda)\beta_\star+A_\lambda X^{\mathsf T}\varepsilon.
\end{aligned}
$$

三行目には $A_\lambda(G+n\lambda I_p)=I_p$ を用いた。期待値を取ると雑音項は0なので、偏りの式を得る。平均から引いた推定量は $A_\lambda X^{\mathsf T}\varepsilon$ であるから

$$
\begin{aligned}
C_\lambda
&=A_\lambda X^{\mathsf T}\mathbb E[\varepsilon\varepsilon^{\mathsf T}]XA_\lambda^{\mathsf T}\\
&=\sigma^2 A_\lambda X^{\mathsf T}X A_\lambda
=\sigma^2 A_\lambda G A_\lambda.
\end{aligned}
$$

$A_\lambda$ が対称であることを使った。$\widehat\beta_\lambda-\beta_\star=b_\lambda+\eta$、$\mathbb E[\eta]=0$ と置くと

$$
\begin{aligned}
\mathbb E\|b_\lambda+\eta\|_2^2
&=\|b_\lambda\|_2^2+2b_\lambda^{\mathsf T}\mathbb E[\eta]
+\mathbb E[\eta^{\mathsf T}\eta]\\
&=\|b_\lambda\|_2^2+\sum_{k=1}^p\mathbb E[\eta_k^2]\\
&=\|b_\lambda\|_2^2+\operatorname{tr}(C_\lambda).
\end{aligned}
$$

最後に[特異値分解](../../../基礎科目/F0/F0-00F2/index.md#thm-f0-00f2-svd)を適用する。$V^{\mathsf T}GV$ の対角は $s_j^2$（$j\le q$）と0（$j>q$）、$V^{\mathsf T}A_\lambda V$ の対角は $1/(s_j^2+n\lambda)$ と $1/(n\lambda)$ である。従って $v_j$ 方向の偏りは $-n\lambda\theta_j/(s_j^2+n\lambda)$（$j\le q$）、零方向では $-\theta_j$。分散の対角は前者で $\sigma^2s_j^2/(s_j^2+n\lambda)^2$、後者で0となる。これらを足せば表示式を得る。$\square$
<!-- proof-end -->

**なぜ罰則を強くするだけではよくないか**。分散の各項 $\sigma^2s_j^2/(s_j^2+n\lambda)^2$ は $\lambda$ とともに減るが、観測できる真の係数が $\theta_j\ne0$ なら偏りの二乗 $(n\lambda)^2\theta_j^2/(s_j^2+n\lambda)^2$ は増える。$\sigma^2=0$ かつフル列ランクなら、$\lambda=0$ の最小二乗解は真値に等しくリスク0だが、$\lambda>0$ は一般に偏りを作る。Ridgeが必ず精度を改善するという主張は偽である。

### 6.1 訓練デザイン上の予測リスク

学習した係数が作る予測と真の平均応答 $X\beta_\star$ の距離を、$R_{\rm fit}(\lambda)=\mathbb E\|X\widehat\beta_\lambda-X\beta_\star\|_2^2/n$ と置く。これは未知の新しい入力での汎化誤差ではない。前定理の分解に左から $X$ を掛けると

$$
R_{\rm fit}(\lambda)
=\frac1n\|Xb_\lambda\|_2^2
+\frac1n\operatorname{tr}(XC_\lambda X^{\mathsf T}).
$$

実際、$\eta=\widehat\beta_\lambda-\mathbb E[\widehat\beta_\lambda]$ の平均は0なので、$\|Xb_\lambda+X\eta\|^2$ の交差項は消える。SVDを入れれば

$$
R_{\rm fit}(\lambda)
=\frac1n\sum_{j=1}^{q}
\frac{n^2\lambda^2s_j^2\theta_j^2+\sigma^2s_j^4}
{(s_j^2+n\lambda)^2}.
$$

係数リスクと違い、零特異値方向は右辺に現れない。新しい独立な観測雑音 $\varepsilon_{\rm new}$ を足した応答を評価するときは、その雑音との交差項が0で分散が $\sigma^2$ ならさらに $\sigma^2$ が加わるが、これは**固定デザインと同じ評価点**に関する話である。

### 6.2 一変数で最適な正則化係数を確かめる

$n=p=1$、$X=(1)$、$\beta_\star=2$、$\sigma^2=1$ とすると、$\widehat\beta_\lambda=(2+\varepsilon)/(1+\lambda)$、偏り $-2\lambda/(1+\lambda)$、分散 $1/(1+\lambda)^2$。従って

$$
R_{\rm coef}(\lambda)=\frac{4\lambda^2+1}{(1+\lambda)^2},
\quad
\frac{dR_{\rm coef}}{d\lambda}
=\frac{8\lambda-2}{(1+\lambda)^3}.
$$

$\lambda\ge0$ では $\lambda=1/4$ で最小値 $4/5$ を取り、最小二乗の $\lambda=0$ のリスク1より小さい。一方 $\lambda=1$ では $5/4$ となり、過剰な正則化はむしろ悪い。真の $\beta_\star$ と雑音分散は普通未知なので、この例の最適値を現実のデータへ直接代入することはできない。モデル選択と交差検証はML1-12で扱う。

## 7. 計算実験：縮小経路と反復時の偏り・分散

[ML1-05 Ridge回帰の対話ラボ](../../../../../../simulation/ml1-05.html)では、固定された設計行列の特徴間相関、$\lambda$、雑音標準偏差、反復回数、乱数列を再現するための初期値を変更できる。入力に合わせてRidge係数を**新たに数値計算**し、真の係数との差、理論上の偏り・分散、反復標本から求める平均と標本分散を比較する。

まず相関を0、雑音標準偏差を0にすると、$\lambda=0$ で真値に一致する。$\lambda$ を大きくすると標本上の予測も縮み、偏りが生まれる。次に雑音を大きくし、特徴間相関を1に近づけると、弱く観測される方向で最小二乗係数が揺れやすくなる。Ridgeではその方向ほど強い縮小が起きる。反復回数は有限なので経験的な値は理論値から多少ずれる。これは有限回のMonte Carloの揺れであって定理への反例ではない。

以下のPython計算では固定デザインの行列公式を独立に確認する。自分で空欄を埋め、係数の平均や分散を出す前に**生成模型の真値**と**推定値**を分けて書こう。

~~~python-lab
# lab-id: ml1-05-fixed-design
# lab-title: Ridgeの縮小と理論的偏り・分散
# lab-mode: exercise
# timeout-ms: 10000
import numpy as np
X = np.diag([1., 2.])
truth = np.array([2., 1.])
n = len(X)
lam = 0.5
sigma2 = 1.
G = X.T @ X
A = np.linalg.inv(G + n * lam * np.eye(2))
bias = ___
cov = ___
risk = bias @ bias + cov[0, 0] + cov[1, 1]
print("bias", bias, "variance", np.diag(cov), "risk", risk)
~~~

~~~python-solution
import numpy as np
X = np.diag([1., 2.])
truth = np.array([2., 1.])
n = len(X)
lam = 0.5
sigma2 = 1.
G = X.T @ X
A = np.linalg.inv(G + n * lam * np.eye(2))
bias = -n * lam * A @ truth
cov = sigma2 * A @ G @ A
risk = bias @ bias + cov[0, 0] + cov[1, 1]
print("bias", bias, "variance", np.diag(cov), "risk", risk)
~~~

~~~python-test
assert np.allclose(bias, [-1., -0.2])
assert np.allclose(np.diag(cov), [0.25, 0.16])
assert np.isclose(risk, 1.45)
~~~

## 演習

### ML1-05-A01 一変数の目的関数
- Level: A
- 目安時間: 10分

$n=p=1$、$X=(1)$、$y=3$、$\lambda=2$ とする。Ridge目的を展開し、微分から最小解と最小値を求めよ。

<!-- solution-start -->
#### 詳細解答

$$
J_2(\beta)=\frac12(\beta-3)^2+\beta^2
=\frac32\beta^2-3\beta+\frac92.
$$

微分は $3\beta-3$、二階微分は3なので、唯一の最小点は $\widehat\beta=1$。代入すると $J_2(1)=\tfrac12(1-3)^2+1=3$。[一意性定理](#thm-ml1-05-unique)の公式でも $(1+2)^{-1}3=1$ になる。
<!-- solution-end -->

### ML1-05-A02 二方向の縮小
- Level: A
- 目安時間: 10分

$n=p=2$、$X=\operatorname{diag}(1,2)$、$y=(2,2)^{\mathsf T}$、$\lambda=1$ とする。Gram行列、Ridge係数、適合値、平方残差目的を求めよ。

<!-- solution-start -->
#### 詳細解答

$G=X^{\mathsf T}X=\operatorname{diag}(1,4)$、$X^{\mathsf T}y=(2,4)^{\mathsf T}$、$n\lambda=2$。よって[一意解の公式](#thm-ml1-05-unique)から

$$
\widehat\beta_1=\operatorname{diag}(3,6)^{-1}(2,4)^{\mathsf T}
=(2/3,2/3)^{\mathsf T}.
$$

$X\widehat\beta=(2/3,4/3)^{\mathsf T}$、二乗残差の和は $(2-2/3)^2+(2-4/3)^2=20/9$。平方残差目的は $20/9/(2n)=5/9$。罰則は $(1/2)(8/9)=4/9$、従ってRidge目的は1である。
<!-- solution-end -->

### ML1-05-A03 重複列で正則化する
- Level: A
- 目安時間: 10分

$n=1,p=2$、$X=(1\ \ 1)$、$y=2$、$\lambda=1$ に対して正規方程式と解を求め、$\lambda=0$ との違いを述べよ。

<!-- solution-start -->
#### 詳細解答

$G=\begin{pmatrix}1&1\\1&1\end{pmatrix}$、$X^{\mathsf T}y=(2,2)^{\mathsf T}$。$G+I_2=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ の連立方程式は $2a+b=2$、$a+2b=2$。差を取れば $a=b$、従って $a=b=2/3$。予測は $4/3$、残差は $-2/3$。$\lambda=0$ のときは $a+b=2$ を満たす全てが最小二乗解で、係数は一意でない。
<!-- solution-end -->

### ML1-05-A04 偏り・分散を直接求める
- Level: A
- 目安時間: 10分

$n=p=1$、$X=1$、$\beta_\star=2$、$\mathbb E\varepsilon=0$、$\operatorname{Var}(\varepsilon)=1$、$\lambda=1$ とする。推定量、偏り、分散、係数平均二乗誤差を求めよ。

<!-- solution-start -->
#### 詳細解答

応答は $Y=2+\varepsilon$、[Ridge公式](#thm-ml1-05-unique)は $\widehat\beta_1=Y/(1+1)=1+\varepsilon/2$。従って $\mathbb E\widehat\beta_1=1$、偏りは $1-2=-1$。分散は $\operatorname{Var}(\varepsilon/2)=1/4$ である。[偏り・分散分解](#thm-ml1-05-bias-variance)より平均二乗誤差は $(-1)^2+1/4=5/4$。
<!-- solution-end -->

### ML1-05-A05 切片を罰しないRidge
- Level: A
- 目安時間: 15分

二点 $z=(-1,1)$、$y=(1,3)$、$\lambda=1$ で、予測を $\alpha+\theta z$ とし $\alpha$ は罰しない。$\alpha,\theta$ を求め、両方の係数を罰した場合と比較せよ。

<!-- solution-start -->
#### 詳細解答

$z$ の平均は0、$y$ の平均は2なので切片の停留条件から $\widehat\alpha=2$。中心化した $y_c=(-1,1)$、$Z_c=(-1,1)^{\mathsf T}$。$Z_c^{\mathsf T}Z_c=2$、$Z_c^{\mathsf T}y_c=2$、$n\lambda=2$ だから $\widehat\theta=2/(2+2)=1/2$。予測は $(3/2,5/2)$ となる。一方切片を罰するなら、設計列が直交し各Gram対角が2なので、$(\widehat\alpha,\widehat\theta)=(4/4,2/4)=(1,1/2)$。予測は $(1/2,3/2)$ となり、切片まで縮む。
<!-- solution-end -->

### ML1-05-B01 零正則化極限と階数
- Level: B
- 目安時間: 20分

$X=U\Sigma V^{\mathsf T}$ を実特異値分解とする。$\lambda>0$ のRidge係数を $s_j,u_j,v_j$ で導き、零特異値方向で何が起こるか、$\lambda\downarrow0$ でどの最小二乗解に近づくかを論証せよ。

<!-- solution-start -->
#### 詳細解答

$X^{\mathsf T}X=V\Sigma^{\mathsf T}\Sigma V^{\mathsf T}$ を[一意解](#thm-ml1-05-unique)へ代入すると

$$
V^{\mathsf T}\widehat\beta_\lambda
=(\Sigma^{\mathsf T}\Sigma+n\lambda I)^{-1}
\Sigma^{\mathsf T}U^{\mathsf T}y.
$$

右辺の $j\le q$ 成分は $s_j(u_j^{\mathsf T}y)/(s_j^2+n\lambda)$、$j>q$ 成分は0である。$\lambda\downarrow0$ とすれば前者は $(u_j^{\mathsf T}y)/s_j$ へ、後者は0のままである。これが[最小ノルム最小二乗解](../ML1-04/index.md#thm-ml1-04-solution-set-minimum-norm)の座標表示と一致する。有限個の直交座標の収束から元の係数も収束する。
<!-- solution-end -->

### ML1-05-B02 最適なRidge係数が0でも無限大でもない例
- Level: B
- 目安時間: 20分

$n=p=1$、$X=1$、$\beta_\star=2$、雑音平均0・分散1とする。$R_{\rm coef}(\lambda)$ を計算し、$\lambda\ge0$ での最小値と、$\lambda=0,1$ のリスクを比較せよ。

<!-- solution-start -->
#### 詳細解答

$\widehat\beta_\lambda=(2+\varepsilon)/(1+\lambda)$。真値との差は $(\varepsilon-2\lambda)/(1+\lambda)$ だから

$$
R_{\rm coef}(\lambda)
=\frac{\mathbb E[(\varepsilon-2\lambda)^2]}{(1+\lambda)^2}
=\frac{1+4\lambda^2}{(1+\lambda)^2}.
$$

分子 $1+4\lambda^2$ の導関数は $8\lambda$、分母 $(1+\lambda)^2$ の導関数は $2(1+\lambda)$ である。これらを商の微分に代入すると

$$
R_{\rm coef}'(\lambda)
=\frac{8\lambda(1+\lambda)^2-2(1+4\lambda^2)(1+\lambda)}
{(1+\lambda)^4}
=\frac{8\lambda-2}{(1+\lambda)^3}.
$$

$\lambda=1/4$ を境に符号が負から正へ変わるので最小。代入して $R_{\rm coef}(1/4)=(1+1/4)/(25/16)=4/5$。一方 $R_{\rm coef}(0)=1$、$R_{\rm coef}(1)=5/4$。大きな $\lambda$ が常に有利ではない。
<!-- solution-end -->

### ML1-05-B03 観測の弱い方向と非一意性
- Level: B
- 目安時間: 20分

$n=p=2$、$X=\begin{pmatrix}1&1\\1&1\end{pmatrix}$、$y=(2,2)^{\mathsf T}$、$\lambda=1$ とする。Ridge係数を求め、零正則化極限と訓練予測を比較せよ。

<!-- solution-start -->
#### 詳細解答

$G=X^{\mathsf T}X=\begin{pmatrix}2&2\\2&2\end{pmatrix}$、$X^{\mathsf T}y=(4,4)^{\mathsf T}$。$n\lambda=2$ なので

$$
\begin{pmatrix}4&2\\2&4\end{pmatrix}\begin{pmatrix}a\\b\end{pmatrix}
=\begin{pmatrix}4\\4\end{pmatrix}.
$$

二式の差は $2(a-b)=0$ なので $a=b$。第一式より $6a=4$ で $a=b=2/3$。適合値は $(4/3,4/3)^{\mathsf T}$。$\lambda=0$ なら $a+b=2$ の全解が最小二乗解であり、[最小ノルム選択](../ML1-04/index.md#thm-ml1-04-solution-set-minimum-norm)は $(1,1)^{\mathsf T}$、適合値は $(2,2)^{\mathsf T}$。零固有方向 $(1,-1)^{\mathsf T}$ の係数差はRidgeで0に固定される。
<!-- solution-end -->

### ML1-05-C01 固定デザインの二種類のリスク
- Level: C
- 目安時間: 35分

$Y=X\beta_\star+\varepsilon$、$\mathbb E\varepsilon=0$、$\operatorname{Cov}(\varepsilon)=\sigma^2I_n$、$n,p\ge1$、$\lambda>0$ とする。$X=U\Sigma V^{\mathsf T}$ の正の特異値を $s_1,\ldots,s_q$、$\theta_j=v_j^{\mathsf T}\beta_\star$ とする。次を解答せよ。

1. 係数の偏りと分散共分散行列を求めよ。
2. $R_{\rm coef}$ を特異値ごとの和にし、零方向の寄与を説明せよ。
3. 固定デザイン上の予測リスク $R_{\rm fit}$ を次の式で定め、その特異値表示を求め、係数リスクとの違いを説明せよ。

$$
R_{\rm fit}=\frac1n\mathbb E\|X\widehat\beta_\lambda-X\beta_\star\|_2^2.
$$

4. $\sigma^2=0$ かつ列フルランクの場合、正則化は必ず改善するか判定せよ。

<!-- solution-start -->
#### 詳細解答

**(1)** $G=X^{\mathsf T}X$、$A=(G+n\lambda I)^{-1}$ と置く。[正のRidge係数と一意な最小解](#thm-ml1-05-unique)から

$$
\widehat\beta_\lambda-\beta_\star
=-n\lambda A\beta_\star+AX^{\mathsf T}\varepsilon.
$$

平均0の雑音を使えば偏り $b=-n\lambda A\beta_\star$。$\mathbb E\varepsilon\varepsilon^{\mathsf T}=\sigma^2I$ と $A^{\mathsf T}=A$ より共分散は $\sigma^2 AX^{\mathsf T}XA=\sigma^2 AGA$。

**(2)** $V$ は直交行列なので二乗長を保存する。第 $j\le q$ 方向の偏りは $-n\lambda\theta_j/(s_j^2+n\lambda)$、分散は $\sigma^2s_j^2/(s_j^2+n\lambda)^2$。$j>q$ の偏りは $-\theta_j$、分散は0。交差項の期待値は0だから

$$
R_{\rm coef}
=\sum_{j=1}^q
\frac{n^2\lambda^2\theta_j^2+\sigma^2s_j^2}{(s_j^2+n\lambda)^2}
+\sum_{j=q+1}^p\theta_j^2.
$$

零方向は応答から識別できないため、真値成分を推定できずに偏りだけが残る。

**(3)** $Xv_j=s_ju_j$（$j\le q$）で、零方向には $Xv_j=0$。[偏り・分散分解](#thm-ml1-05-bias-variance)を $X$ により変換すると

$$
R_{\rm fit}
=\frac1n\sum_{j=1}^q
\left[
s_j^2\frac{n^2\lambda^2\theta_j^2}{(s_j^2+n\lambda)^2}
+s_j^2\frac{\sigma^2s_j^2}{(s_j^2+n\lambda)^2}
\right].
$$

つまり $\frac1n\sum_{j=1}^q(n^2\lambda^2s_j^2\theta_j^2+\sigma^2s_j^4)/(s_j^2+n\lambda)^2$。零方向は予測を変えないので足されない。

**(4)** $\sigma^2=0$ かつ列フルランクなら $Y=X\beta_\star$ が確実に成り立つ。最小二乗では真値を唯一回復して係数リスク0。対して $\lambda>0$ では、$\beta_\star\ne0$ なら $b=-n\lambda A\beta_\star\ne0$（$A$ は可逆）なので、係数リスクは正。よって常に改善するわけではなく、悪化する反例になる。
<!-- solution-end -->

---

## 次に進む

Ridgeは観測に弱い特異値方向ほど縮めることで、階数欠損でも係数を一意にし、繰り返し標本での分散を抑える。ただし偏りを生むため、真の誤差がいつも小さくなるわけではない。次のML1-06では、二乗ではなく絶対値を罰するLassoと、係数が厳密に0になる仕組みを扱う。
