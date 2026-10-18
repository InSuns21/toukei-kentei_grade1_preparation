# ML1-09 滑らかな凸損失と勾配法

<!-- definition-example-audit: strict -->

## 1. 損失を微分できても、何歩進めばよいのか

[前章のlogistic損失](../ML1-08/index.md#thm-ml1-08-binary-derivatives)は凸で、勾配とHessianを計算できた。しかし勾配が分かるだけでは学習率（歩幅）を決められない。急に曲がる方向へ大きく進めば、負の勾配へ進んだつもりがかえって損失を増やしてしまう。逆に極端に小さな歩幅なら計算が進まない。

[凸最適化における一般の降下補題](../../OPT/OPT7/index.md#thm-opt7-descent-lemma)と[固定歩幅最急降下法](../../OPT/OPT7/index.md#def-opt7-fixed-step-gradient)は既習である。本講では、**機械学習の具体的な損失からその定数をどう算出するか**を主題とする。特に標本平均の正規化、設計行列の特異値、logisticの確率重みを結び付ける。

訓練データは観測後に固定する。$n\ge1$、$d\ge1$、行列 $X\in\mathbb R^{n\times d}$ の第 $i$ 行を $x_i^{\mathsf T}$、目的変数を $y\in\mathbb R^n$ とし、係数 $w\in\mathbb R^d$ は無制約とする。Euclidノルムは $\|\cdot\|_2$ と書く。二値分類では $Z\in\mathbb R^{n\times d}$ の第 $i$ 行を $z_i^{\mathsf T}$、$y_i\in\{0,1\}$ とする。確率的独立性は以下の有限和の最適化には不要であり、母集団汎化を保証する定理を扱っているわけではない。

## 2. 滑らかさ：関数値ではなく勾配変化を制御する

微分可能な関数の勾配が近い点同士で急変しないことを、あらかじめ定数 $L$ を使って制約する。これが歩幅を決める物差しになる。

<a id="def-ml1-09-smooth-loss"></a>

<!-- formal-statement-start -->
> **定義（機械学習損失のL-滑らかさ）**  
> $f:\mathbb R^d\to\mathbb R$ を連続微分可能、$L>0$ とする。任意の $u,v\in\mathbb R^d$ について

$$
\|\nabla f(u)-\nabla f(v)\|_2\le L\|u-v\|_2
$$

> が成り立つとき、本講では $f$ を $L$-滑らかな損失という。これは[OPT7のLipschitz連続勾配](../../OPT/OPT7/index.md#def-opt7-lipschitz-gradient)と同一の性質である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-09-smooth-loss -->
**定義の確認**。$f(w)=\tfrac12(w_1^2+4w_2^2)$ では $\nabla f(w)=(w_1,4w_2)^{\mathsf T}$。差を $h=u-v$ と書くと

$$
\|\nabla f(u)-\nabla f(v)\|_2^2=h_1^2+16h_2^2\le16(h_1^2+h_2^2).
$$

よって $L=4$ は使用可能である。$h=(0,1)^{\mathsf T}$ では等号となるから、この二次損失では4より小さい値は使えない。ここで行列 $\operatorname{diag}(1,4)$ は勾配差 $Ah$ を表す係数行列である。成分表示の各二乗を比較することが、**定義のすべての $u,v$** を調べる操作に対応する。
<!-- definition-example-end -->

二階微分可能な $f$ のHessianは、勾配を一度さらに微分した $d\times d$ 行列である。Hessianの作用によって勾配差を評価するには、線分 $v+t(u-v)$ 上で微積分学の基本定理を各勾配成分に適用する。

$$
\nabla f(u)-\nabla f(v)
=\int_0^1\nabla^2 f(v+t(u-v))(u-v)\,dt.
$$

線分上の $w=v+t(u-v)$ で任意の $h$ に $\|\nabla^2f(w)h\|_2\le L\|h\|_2$ が成り立つとする。$a=u-v$、$b=\int_0^1\nabla^2f(v+ta)a\,dt$ と置く。$b=0$ なら $\|b\|_2\le L\|a\|_2$ は直ちに成り立つ。$b\ne0$ の場合は単位ベクトル $e=b/\|b\|_2$ を選び、Cauchy–Schwarz不等式を各被積分関数に使うと

$
\begin{aligned}
\|b\|_2
&=\langle e,b\rangle
=\int_0^1\langle e,\nabla^2f(v+ta)a\rangle\,dt\\
&\le\int_0^1\|\nabla^2f(v+ta)a\|_2\,dt
\le\int_0^1L\|a\|_2\,dt=L\|a\|_2.
\end{aligned}
$

最初の積分表示から $b=\nabla f(u)-\nabla f(v)$ なので、滑らかさの定義に到達した。Hessianが対称半正定値なら、最大固有値が全域で $L$ 以下であることを示せば足りる。**行列の固有値を計算する理由**は、勾配変化の最大倍率を全方向にわたって抑えるためである。

## 3. 最小二乗損失：設計行列が学習率を決める

[最小二乗の設計行列](../ML1-04/index.md#def-ml1-04-design-matrix)を使った平均二乗誤差のHessianは、係数によらない。従って滑らかさ定数をデータから一度だけ計算できる。

<a id="def-ml1-09-quadratic-loss"></a>

<!-- formal-statement-start -->
> **定義（標本平均二乗損失）**  
> $n,d\ge1$、$X\in\mathbb R^{n\times d}$、$y\in\mathbb R^n$ に対して

$$
F(w)=\frac1{2n}\|Xw-y\|_2^2,\qquad w\in\mathbb R^d
$$

> を標本平均二乗損失とする。$1/(2n)$ は本講を通じて固定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-09-quadratic-loss -->
**定義の確認**。$X=\operatorname{diag}(1,2)$、$y=(0,0)^{\mathsf T}$、$n=2$ のとき、$Xw=(w_1,2w_2)^{\mathsf T}$ なので $F(w)=\tfrac14(w_1^2+4w_2^2)$。係数 $w=(2,1)^{\mathsf T}$ では残差平方和は $4+4=8$、$1/(2n)=1/4$ を掛けて $F(w)=2$ となる。
<!-- definition-example-end -->

<a id="thm-ml1-09-least-squares-smooth"></a>

<!-- formal-statement-start -->
> **定理（二乗損失の勾配と滑らかさ定数）**  
> $F$ を上の標本平均二乗損失とすると、

$$
\nabla F(w)=\frac1n X^{\mathsf T}(Xw-y),\qquad
\nabla^2F(w)=\frac1n X^{\mathsf T}X.
$$

> $X\ne0$ なら $L_X=\lambda_{\max}(X^{\mathsf T}X)/n=\|X\|_2^2/n>0$ は最小の滑らかさ定数であり、$F$ は凸である。$X=0$ なら勾配は恒等的に0で、任意の $L>0$ を使用できる。
<!-- formal-statement-end -->

### 証明の見取り図

残差の各成分を平方展開し、係数で微分する。Hessianの二次形式は $\|Xh\|_2^2/n$ になる。固有値を使うのは、その値の方向による最大値を求めるためである。

<!-- proof-start -->
### 証明

第 $i$ 行の残差を $r_i=x_i^{\mathsf T}w-y_i$ とすると

$$
F(w)=\frac1{2n}\sum_{i=1}^n r_i^2,\qquad
\frac{\partial r_i}{\partial w_j}=x_{ij}.
$$

従って、各 $j$ に対して

$$
\frac{\partial F}{\partial w_j}
=\frac1n\sum_i r_i x_{ij},
\qquad
\frac{\partial^2F}{\partial w_k\partial w_j}
=\frac1n\sum_i x_{ik}x_{ij}.
$$

これを行列表示すれば主張の勾配とHessianが得られる。任意の $h$ について

$$
h^{\mathsf T}\nabla^2 F(w)h
=\frac1n\|Xh\|_2^2\ge0.
$$

従って[Hessianによる凸性判定](../../OPT/OPT1/index.md#thm-opt1-hessian-convexity)の仮定が満たされ、$F$ は凸である。対称行列 $X^{\mathsf T}X$ の固有ベクトルからなる正規直交基底 $v_j$ に $h=\sum_j c_jv_j$ と展開すれば

$$
\left\|\frac1nX^{\mathsf T}Xh\right\|_2^2
=\sum_j\left(\frac{\lambda_j}{n}\right)^2c_j^2
\le \left(\frac{\lambda_{\max}}n\right)^2\|h\|_2^2.
$$

$\nabla F(u)-\nabla F(v)=(X^{\mathsf T}X/n)(u-v)$ なので $L_X$ が滑らかさ定数である。最大固有値の単位固有ベクトルを $u-v$ とすれば等号となり、これより小さくはできない。$\square$
<!-- proof-end -->

前の定義例では $X^{\mathsf T}X/n=\operatorname{diag}(1/2,2)$、従って $L_X=2$。$n$ で平均したのに $X^{\mathsf T}X$ をそのまま使うと安全な学習率を必要以上に小さく見積もることになる。

**特徴量の尺度**にも注意する。列全体を10倍すると、その列方向の曲率は100倍になる。標本数を増やしただけで必ず $L_X$ が下がるわけではない。$X^{\mathsf T}X$ 自体も標本数とともに変化するからだ。

## 4. Logistic損失：確率が曲率を重み付けする

二値の[logistic経験負対数尤度](../ML1-08/index.md#def-ml1-08-log-loss)では、各標本の予測確率 $q_i$ が曲率を決める。これを最小二乗と比べよう。

<a id="thm-ml1-09-logistic-smooth"></a>

<!-- formal-statement-start -->
> **定理（logistic損失の一様な滑らかさ上界）**  
> $n,d\ge1$、$Z\in\mathbb R^{n\times d}$、$y_i\in\{0,1\}$ とする。

$$
G(w)=\frac1n\sum_{i=1}^n\left[
\log(1+e^{z_i^{\mathsf T}w})-y_i z_i^{\mathsf T}w\right]
$$

> とおく。$q_i=\sigma(z_i^{\mathsf T}w)$ に対し、

$$
\nabla G(w)=\frac1n Z^{\mathsf T}(q-y),\qquad
\nabla^2G(w)=\frac1n Z^{\mathsf T}W(w)Z,
$$

> ただし $W(w)=\operatorname{diag}(q_i(1-q_i))$ とする。$G$ は凸であり、$Z\ne0$ なら

$$
L_G=\frac{\lambda_{\max}(Z^{\mathsf T}Z)}{4n}
$$

> は $G$ の全域で有効であり、さらに最小の滑らかさ定数である。
<!-- formal-statement-end -->

### 証明の見取り図

前章の各標本のHessianを行列の積へ並べ替える。$0<q(1-q)\le1/4$ が、どの係数でも一様に成り立つことを使う。

<!-- proof-start -->
### 証明

[前章の二値logistic勾配・Hessian公式](../ML1-08/index.md#thm-ml1-08-binary-derivatives)において $z_i$ を $Z$ の各行とし、$i$ 番目の重みを $q_i(1-q_i)$ とする。成分の和

$$
\frac1n\sum_i(q_i-y_i)z_i,\qquad
\frac1n\sum_iq_i(1-q_i)z_iz_i^{\mathsf T}
$$

を行列に書き直すと主張の式になる。$q(1-q)=1/4-(q-1/2)^2\le1/4$ だから、すべての $h\in\mathbb R^d$ について

$$
\begin{aligned}
0&\le h^{\mathsf T}\nabla^2G(w)h\\
&=\frac1n\sum_iq_i(1-q_i)(z_i^{\mathsf T}h)^2\\
&\le\frac1{4n}\sum_i(z_i^{\mathsf T}h)^2
=\frac1{4n}\|Zh\|_2^2
\le L_G\|h\|_2^2.
\end{aligned}
$$

対称半正定値Hessianの最大固有値は $L_G$ 以下である。第2節の線分積分を勾配差へ適用すれば $L_G$-滑らかさが従う。凸性も[OPT1のHessian判定](../../OPT/OPT1/index.md#thm-opt1-hessian-convexity)から従う。

さらに $w=0$ ではすべての予測確率が $q_i=1/2$ となり、Hessianは

$
\nabla^2G(0)=\frac1{4n}Z^{\mathsf T}Z
$

である。その最大固有値に対応する単位固有ベクトル $h$ を取ると、勾配の微分可能性から

$
\lim_{t\to0}\frac{\|\nabla G(th)-\nabla G(0)\|_2}{|t|}
=\|\nabla^2G(0)h\|_2=L_G.
$

もし $L_G$ より小さい全域Lipschitz定数が存在すればこの極限値を上から抑えられず、矛盾する。したがって求めた定数は最小である。$\square$
<!-- proof-end -->

$Z$ に切片列を加える場合も、この上界は**切片を含む** $Z^{\mathsf T}Z$ から求める。例えば $Z=(1,1)^{\mathsf T}$（$n=2,d=1$）なら $Z^{\mathsf T}Z=2$、$L_G=1/4$。得点が0の $w=0$ で両方 $q_i=1/2$ となり、実際の二階微分も $1/4$ である。

反対に $w$ が大きいと $q_i$ は0や1に近づき、$q_i(1-q_i)$ が小さくなる。滑らかさ上界は**全域で安全な最大曲率**であり、各反復での局所曲率の値とは違う。

### 4.1 二乗罰則を付けると上界はどう変わるか

[正則化経験リスク](../ML1-03/index.md#def-ml1-03-regularized-erm)の例として、すべての係数を罰する

$$
G_\lambda(w)=G(w)+\frac\lambda2\|w\|_2^2,\quad\lambda\ge0
$$

を取ると、$\nabla^2G_\lambda=\nabla^2G+\lambda I_d$。ゆえに $L_G+\lambda$ は使用可能な滑らかさ定数である。$\lambda>0$ のときHessianは $\lambda I_d$ 以上で、適切な仮定のもとで一意な最小点を持つことは[前章の存在定理](../ML1-08/index.md#thm-ml1-08-ridge-existence)で確認した。**切片を罰しない**実務上の模型ではこの議論をすべての係数へそのまま適用してはいけない。

## 5. 学習率の安全域と単調減少

負の勾配へ進む更新は、有限標本の最適化では一度に全標本から計算した勾配を使う。確率的抽出を伴う手法は次講で扱う。

<a id="def-ml1-09-full-gradient-step"></a>

<!-- formal-statement-start -->
> **定義（全標本勾配の固定歩幅更新）**  
> $f:\mathbb R^d\to\mathbb R$ が連続微分可能で、$w_0\in\mathbb R^d$、$\alpha>0$ が与えられたとき、

$$
w_{k+1}=w_k-\alpha\nabla f(w_k),\qquad k=0,1,\ldots
$$

> を全標本勾配の固定歩幅更新とする。これは[OPT7の固定歩幅最急降下法](../../OPT/OPT7/index.md#def-opt7-fixed-step-gradient)を経験損失へ適用したものである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-09-full-gradient-step -->
**定義の確認**。$f(w_1,w_2)=\tfrac12(w_1^2+4w_2^2)$、$w_0=(1,1)^{\mathsf T}$、$\alpha=1/4$ を取れば $\nabla f(w_0)=(1,4)^{\mathsf T}$ だから $w_1=(3/4,0)^{\mathsf T}$。初期損失 $5/2$ に対して更新後は $9/32$。一方 $\alpha=3/5$ なら $w_1=(2/5,-7/5)^{\mathsf T}$、損失は $4/50+98/25=4$ で増えてしまう。
<!-- definition-example-end -->

<a id="thm-ml1-09-learning-rate"></a>

<!-- formal-statement-start -->
> **定理（滑らかな経験損失の一段降下）**  
> $f:\mathbb R^d\to\mathbb R$ が $L$-滑らか（$L>0$）なら、上の反復は

$$
f(w_{k+1})\le f(w_k)-
\alpha\left(1-\frac{L\alpha}2\right)\|\nabla f(w_k)\|_2^2
$$

> を満たす。とくに $0<\alpha<2/L$ なら単調非増加、$\nabla f(w_k)\ne0$ なら厳密減少であり、$\alpha=1/L$ では減少量の下界は $\|\nabla f(w_k)\|_2^2/(2L)$ となる。凸性はこの主張には不要である。
<!-- formal-statement-end -->

### 証明の見取り図

[降下補題](../../OPT/OPT7/index.md#thm-opt7-descent-lemma)の上界へ、更新そのもの $v=u-\alpha\nabla f(u)$ を代入する。一次項と二次項の競争が安全域を決める。

<!-- proof-start -->
### 証明

$u=w_k$、$v=w_{k+1}$、$g=\nabla f(w_k)$ とする。更新式から $v-u=-\alpha g$ である。降下補題に代入すると

$$
\begin{aligned}
f(w_{k+1})&\le f(w_k)+\langle g,-\alpha g\rangle+
\frac L2\|-\alpha g\|_2^2\\
&=f(w_k)-\alpha\|g\|_2^2+
\frac{L\alpha^2}{2}\|g\|_2^2\\
&=f(w_k)-\alpha(1-L\alpha/2)\|g\|_2^2.
\end{aligned}
$$

$0<\alpha<2/L$ なら係数は正であり、$\alpha=1/L$ を代入すれば $\alpha(1-L\alpha/2)=1/(2L)$。$\square$
<!-- proof-end -->

二乗損失なら $\alpha=1/L_X$、二値logisticなら $\alpha=1/L_G$ がデータから直接計算できる選択である。ただし後者の $L_G$ は全域では最小の滑らかさ定数であっても、個々の反復では局所曲率に比べて保守的なので、これより大きい歩幅でも減少する場合がある。「上界を超えたら必ず発散」と「安全の証明がなくなる」は別の主張である。

<a id="prop-ml1-09-sharp-quadratic"></a>

<!-- formal-statement-start -->
> **命題（二次損失で安全域が鋭い例）**  
> $L>0$ とし、二次損失 $f(w)=Lw^2/2$ に固定歩幅更新を適用する。このとき

$
w_{k+1}=(1-\alpha L)w_k.
$

> 初期値 $w_0\ne0$ なら、歩幅に応じて次の3場合となる。

$
\begin{aligned}
0<\alpha<2/L&:\quad w_k\longrightarrow0,\\
\alpha=2/L&:\quad w_k=(-1)^kw_0,\quad f(w_k)=f(w_0),\\
\alpha>2/L&:\quad |w_k|\longrightarrow\infty,\quad f(w_k)\longrightarrow\infty.
\end{aligned}
$
<!-- formal-statement-end -->

### 証明の見取り図

二次式の勾配は $Lw$ なので、反復は等比数列になる。等比の比の絶対値が1より小さいかどうかを調べる。

<!-- proof-start -->
### 証明

$f'(w)=Lw$ より $w_{k+1}=w_k-\alpha Lw_k=(1-\alpha L)w_k$。帰納法で $w_k=(1-\alpha L)^kw_0$ を得る。$|1-\alpha L|<1$ と $0<\alpha<2/L$ は同値である。等号境界 $\alpha=2/L$ なら比は $-1$、超過なら絶対値は1を超える。損失は $Lw_k^2/2$ なので結論に従う。$\square$
<!-- proof-end -->

## 6. 凸性を使うと関数値の収束速度を評価できる

単調減少だけでは「何回反復すれば十分か」は分からない。そこで[OPT1の一次支持不等式](../../OPT/OPT1/index.md#thm-opt1-first-order-convexity)を使い、関数値の誤差を距離の変化へ変換する。

<a id="thm-ml1-09-convex-rate"></a>

<!-- formal-statement-start -->
> **定理（滑らかな凸経験損失の関数値上界）**  
> $f:\mathbb R^d\to\mathbb R$ は凸かつ $L$-滑らか、$L>0$ とする。さらに有限の最小点 $w^*\in\mathbb R^d$ が存在するとする。$\alpha=1/L$ として勾配法を実行すると、任意の整数 $k\ge1$ で

$$
0\le f(w_k)-f(w^*)\le
\frac{L\|w_0-w^*\|_2^2}{2k}.
$$

> これは訓練目的関数の誤差上界であり、未知のテスト分布での予測誤差上界ではない。
<!-- formal-statement-end -->

### 証明の見取り図

一段の関数値の減少と、最小点までの二乗距離の差を比較する。後者を反復回数だけ足せば、途中の距離が相殺される。

<!-- proof-start -->
### 証明

$g_j=\nabla f(w_j)$ とする。反復を展開すると

$$
\begin{aligned}
\|w_{j+1}-w^*\|_2^2
&=\|w_j-w^*-g_j/L\|_2^2\\
&=\|w_j-w^*\|_2^2
-\frac2L\langle g_j,w_j-w^*\rangle
+\frac1{L^2}\|g_j\|_2^2.
\end{aligned}
$$

ここを移項して $L/2$ を掛ければ

$$
\frac L2\bigl(\|w_j-w^*\|_2^2-\|w_{j+1}-w^*\|_2^2\bigr)
=\langle g_j,w_j-w^*\rangle-\frac1{2L}\|g_j\|_2^2.
$$

[凸関数の一次支持不等式](../../OPT/OPT1/index.md#thm-opt1-first-order-convexity)を $u=w_j,v=w^*$ に使うと

$$
f(w_j)-f(w^*)\le\langle g_j,w_j-w^*\rangle.
$$

また[本講の一段降下](#thm-ml1-09-learning-rate)に $\alpha=1/L$ を代入して

$$
f(w_{j+1})\le f(w_j)-\frac1{2L}\|g_j\|_2^2.
$$

両不等式を合わせると

$$
f(w_{j+1})-f(w^*)
\le\frac L2\bigl(\|w_j-w^*\|_2^2-\|w_{j+1}-w^*\|_2^2\bigr).
$$

$j=0,\ldots,k-1$ を足すと右辺の中間距離は相殺され、

$$
\sum_{j=0}^{k-1}\bigl(f(w_{j+1})-f(w^*)\bigr)
\le\frac L2\bigl(\|w_0-w^*\|_2^2-\|w_k-w^*\|_2^2\bigr)
\le\frac L2\|w_0-w^*\|_2^2.
$$

一段降下により $f(w_1)\ge f(w_2)\ge\cdots\ge f(w_k)$ なので、左辺の各項は $f(w_k)-f(w^*)$ 以上である。$k$ で割ると主張が得られる。$\square$
<!-- proof-end -->

この収束評価には**最小点の存在**が必要である。前章の[完全分離と最小点の非存在](../ML1-08/index.md#thm-ml1-08-separation-no-mle)に当たる非正則化logistic標本では、損失が0へ近付いても最小点を有限係数で達成できない。その場合、定理の $w^*$ を置けない。勾配法が損失を下げ続けることは、係数が有限値に収束する証明ではない。

## 7. Hessian固有値と等高線：遅い方向、速い方向

正定値対称行列 $H$ と

$$
f(w)=\frac12(w-w^*)^{\mathsf T}H(w-w^*)
$$

を考える。$H$ の固有値を $0<m\le\lambda_j\le L$ とし、単位固有ベクトルを $v_j$ とする。$w_k-w^*=\sum_j c_{k,j}v_j$ と展開すると、$\nabla f(w_k)=H(w_k-w^*)=\sum_j\lambda_jc_{k,j}v_j$。更新式より

$$
c_{k+1,j}=(1-\alpha\lambda_j)c_{k,j},
\qquad
f(w_k)=\frac12\sum_j\lambda_jc_{k,j}^2.
$$

$L$ の大きい方向に合わせて小さい $\alpha$ を選ぶと、小さい固有値 $m$ の方向では係数が $1-m/L$ 程度しか縮まない。これが細長い等高線でジグザグ・遅延が起きる機構である。強凸性と線形収束の一般定理は[OPT7](../../OPT/OPT7/index.md#thm-opt7-gradient-linear-rate)に譲り、本講ではデータ行列からこの現象を実測する。

## 8. 対話実験：学習率で実軌道が変わる

[ML1-09 勾配法対話ラボ](../../../../../../simulation/ml1-09-gradient.html)では、$H=\operatorname{diag}(m,L)$、$w^*=(0,0)$ を持つ二変数二次損失を扱う。初期値、$m,L$、歩幅 $\alpha$ を変更して反復を**実際に再計算**し、等高線上の軌道と目的値の履歴を比較できる。1反復送り・自動実行・停止・リセットが可能であり、座標と損失は表にも出る。ブラウザだけで動き、外部データを送信しない。

最初は $m=1$、$L=4$、初期値 $(2,2)$ を推奨する。$\alpha=1/L=0.25$、境界 $2/L=0.5$、それを超える $0.6$ を比較すると、理論の「安全域」と「境界では最大固有値方向の損失が減らない」を区別できる。負の曲率や $m>L$ はこの模型の前提外なので入力を拒否する。丸め誤差と表示範囲の上限は証明の代用にはならない。

## 演習

### ML1-09-A01 滑らかさ定数を定義から求める
- Level: A

$f(w)=\tfrac12(w_1^2+9w_2^2)$ の最小の滑らかさ定数を求め、定義の不等式を直接確認せよ。

<!-- solution-start -->
#### 詳細解答

$\nabla f=(w_1,9w_2)^{\mathsf T}$。$h=u-v$ と置くと

$$
\|\nabla f(u)-\nabla f(v)\|_2^2=h_1^2+81h_2^2
\le81(h_1^2+h_2^2)=81\|u-v\|_2^2.
$$

平方根を取って $L=9$ が有効と分かる。$u-v=(0,1)^{\mathsf T}$ で等号なので、9未満は不可能である。
<!-- solution-end -->

### ML1-09-A02 標本平均と曲率
- Level: A

$X=\operatorname{diag}(2,4)$、$n=2$、$y=0$ に対する $F(w)=\|Xw\|_2^2/(2n)$ のHessianと最小の $L$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$X^{\mathsf T}X=\operatorname{diag}(4,16)$、従って

$$
\nabla^2F=X^{\mathsf T}X/2=\operatorname{diag}(2,8).
$$

最大固有値は8だから $L=8$。$F(w)=w_1^2+4w_2^2$ の直接二階微分も $\operatorname{diag}(2,8)$ を与える。$1/(2n)$ を落とすと16と誤答する。
<!-- solution-end -->

### ML1-09-A03 logisticの曲率上界
- Level: A

$n=2$、$d=1$、$z_1=1,z_2=3$ の二値logistic損失の全域で使える $L$ を求めよ。ラベルの違いは $L$ に影響するか。

<!-- solution-start -->
#### 詳細解答

$Z^{\mathsf T}Z=1^2+3^2=10$ なので $L=10/(4\cdot2)=5/4$。Hessianは

$$
G''(w)=\tfrac12[q_1(1-q_1)+9q_2(1-q_2)]\le\tfrac12(1+9)/4=5/4.
$$

二階微分の式には $y_i$ が現れないため、ラベルはこの上界に影響しない。$w=0$ では $q_1=q_2=1/2$ となり等号も成立する。
<!-- solution-end -->

### ML1-09-A04 一段の勾配更新
- Level: A

$f(w)=2w^2$、$w_0=1$ に $\alpha=1/4$ と $\alpha=3/4$ をそれぞれ適用し、一段後の値と損失を比較せよ。

<!-- solution-start -->
#### 詳細解答

$f'(w)=4w$、$L=4$ である。$\alpha=1/4$ なら $w_1=1-(1/4)4=0$、$f(w_1)=0$。$\alpha=3/4$ なら $w_1=1-3=-2$、$f(w_1)=8>f(w_0)=2$。$2/L=1/2$ を超えた歩幅では降下保証がなく、実際この例は損失を増やす。
<!-- solution-end -->

### ML1-09-B01 正則化による定数の変化
- Level: B

$F(w)=\|Xw-y\|_2^2/(2n)$ に $\lambda\|w\|_2^2/2$（$\lambda>0$）を加えたとき、Hessian、滑らかさ定数、凸性および最小点の一意性を示せ。

<!-- solution-start -->
#### 詳細解答

目的を $F_\lambda$ とすると

$$
\nabla F_\lambda(w)=X^{\mathsf T}(Xw-y)/n+\lambda w,
\quad
\nabla^2F_\lambda=X^{\mathsf T}X/n+\lambda I.
$$

任意の $h\ne0$ について

$$
h^{\mathsf T}\nabla^2F_\lambda h=\|Xh\|_2^2/n+\lambda\|h\|_2^2>0.
$$

従って厳密凸であり、Hessianの最大固有値 $L_\lambda=\lambda_{\max}(X^{\mathsf T}X)/n+\lambda$ が滑らかさ定数（$X=0$ でも $L_\lambda=\lambda>0$）になる。$\lambda\|w\|^2/2$ が無限遠で発散する一方、二乗損失は非負なので最小点は存在する。厳密凸性からそれは一意である。
<!-- solution-end -->

### ML1-09-B02 二次関数の境界歩幅
- Level: B

$f(w)=\tfrac L2 w^2$、$w_0\ne0$ の勾配法を解き、$\alpha=2/L$ と $\alpha>2/L$ で単調性・収束がどうなるか示せ。

<!-- solution-start -->
#### 詳細解答

$w_{k+1}=w_k-\alpha Lw_k=(1-\alpha L)w_k$ より

$$
w_k=(1-\alpha L)^kw_0,\quad
f(w_k)=\tfrac L2(1-\alpha L)^{2k}w_0^2.
$$

$\alpha=2/L$ で倍率は $-1$、$f(w_k)=f(w_0)$ は一定。$\alpha>2/L$ では $|1-\alpha L|>1$ なので $f(w_k)$ は無限大へ増加する。降下定理が境界では**非増加まで**しか言えないことと合う。
<!-- solution-end -->

### ML1-09-B03 最小点がないlogistic模型
- Level: B

$z_1=-1,y_1=0$、$z_2=1,y_2=1$ の非正則化logistic損失について、有限の最小点が存在しないことを計算し、$O(1/k)$ の定理を直接適用できない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

共通係数 $w\in\mathbb R$ に対し一標本ずつの損失は両方 $\log(1+e^{-w})$ だから

$$
G(w)=\log(1+e^{-w}),\qquad
G'(w)=-\frac1{1+e^w}<0.
$$

有限の $w$ では $G(w)>0$ だが $w\to+\infty$ で $G(w)\to0$。従って下限は0でも有限の最小点は存在しない。$Z^{\mathsf T}Z=2$、$n=2$ から滑らかさ上界 $L=1/4$ は有効だが、収束定理が仮定する $w^*$ を定義できない。勾配法の降下評価そのものは使える。
<!-- solution-end -->

### ML1-09-C01 データの尺度・安全な歩幅・収束上界
- Level: C

$X=\operatorname{diag}(1,3)$、$y=0$、$n=2$、$w_0=(2,1)^{\mathsf T}$ とする。二乗損失

$
F(w)=\frac{\|Xw\|_2^2}{2n}
$

について次を求めよ。

- 正確な滑らかさ定数 $L$。
- 歩幅 $1/L$ を用いた二回の反復。
- $k=2$ での理論上界と実際の関数値誤差。
- 第2列を2倍した場合の新たな $L$ と安全な代表歩幅。

<!-- solution-start -->
#### 詳細解答

$X^{\mathsf T}X/n=\operatorname{diag}(1/2,9/2)$ なので $L=9/2$、最小点は $w^*=0$、$F(w)=w_1^2/4+9w_2^2/4$ である。$\alpha=2/9$ に対する更新行列は

$$
I-\alpha\nabla^2F
=\operatorname{diag}(1-1/9,1-1)
=\operatorname{diag}(8/9,0).
$$

ゆえに $w_1=(16/9,0)^{\mathsf T}$、$w_2=(128/81,0)^{\mathsf T}$。実際の誤差は

$$
F(w_2)-F(0)=\frac14\left(\frac{128}{81}\right)^2
=\frac{4096}{6561}.
$$

一般定理は初期距離 $\|w_0\|_2^2=5$ から

$$
F(w_2)-F(0)
\le\frac{(9/2)\cdot5}{2\cdot2}=\frac{45}{8},
$$

を与え、$4096/6561<45/8$ で整合する。第2列を2倍すると $X'=\operatorname{diag}(1,6)$ なので $(X')^{\mathsf T}X'/2=\operatorname{diag}(1/2,18)$。従って $L'=18$、安全な代表歩幅は $1/18$。特徴量を2倍すると、その方向の曲率は4倍になる。
<!-- solution-end -->

## 9. 次の講義へ

今までは、各反復で**全標本**の勾配を使った。標本数が非常に大きいと、一回の反復でも計算が重い。次のML1-10では一部の標本から勾配を推定し、計算コストとノイズの交換関係を調べる。ここで得た「全勾配では滑らかさが損失減少を保証する」という基準が、確率的勾配法との比較の出発点になる。
