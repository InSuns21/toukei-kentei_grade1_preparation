# ML2-19 自己教師あり表現学習

[Attention](../ML2-18/index.md#def-ml2-18-attention)は入力から別の入力を参照する演算を与えた。しかし、その演算で得た特徴が「何を保つべきか」は、Attention自体からは決まらない。画像や文章には正解ラベルが付いていない標本も多い。そこで、一つの観測を少し形を変えて二度見せ、両者の表現を近づけることを学習信号とする。

これが自己教師あり表現学習の一つの方法である。ただし、二度見せたものを同じだと扱うだけでは、すべての入力を同じ定数ベクトルへ送っても条件を満たしてしまう。何を近づけ、何を区別し、どこまで理論的に保証できるかを順に追う。対照損失は候補の分類問題として導き、情報理論との関係は標本の採り方を明示した上で証明する。

## 1. ラベルの代わりに「同じ観測から作った二つの見え方」を使う

観測を確率変数 $X$、学習器に与える入力を $V$ とする。元の観測に無作為な変換を施して $V$ を得る。この変換を **データ拡張（augmentation）**、結果を **ビュー** と呼ぶ。画像の小さな切り出しや色調変化、系列の許された一部のマスクなどが例である。ただし、数字の「6」を左右反転して「9」になるような変換は、課題次第では保存したい意味を壊す。

変換を条件付き確率 $a(v\mid x)$ で表せば、同じ $x$ から二つのビューを条件付き独立に採ることを数式化できる。変換の選択は数学が自動的に決めるものではない。**何を同一視するか**というモデリング上の仮定である。

<a id="def-ml2-19-views"></a>

<!-- formal-statement-start -->
> **定義（二つの拡張ビューと自己教師あり正例）**  
> 有限観測集合 $\mathcal X$ 上の分布 $p_X$ と、有限ビュー集合 $\mathcal V$ へ写す条件付き分布 $a(v\mid x)$ を与える。まず $X\sim p_X$ を一度採り、$X=x$ を条件として独立に

$$
V\sim a(\,\cdot\mid x),\qquad V^+\sim a(\,\cdot\mid x)
$$

> を採る。この組 $(V,V^+)$ を**正例対**と呼び、その同時分布を $p_+(v,w)$ と書く。別の独立な元観測 $X^-$ から同じ手順で得たビュー $V^-$ を**負例候補**と呼ぶ。負例候補は意味的に必ず異なるものとは限らない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-19-views -->
**定義の確認**。元観測が $a,b$ の二種類で各確率 $1/2$、拡張が何もしない恒等変換なら、条件付き確率は $a(v\mid x)=\boldsymbol 1_{\{v=x\}}$ である。正例は $(a,a)$ または $(b,b)$ のみで、それぞれ確率 $1/2$ となる。

負例は元観測と独立なので、基準となる元観測が $a$ のとき、負例候補が $a$ になる確率も $1/2$ ある。この「同じものが負例に現れる」という衝突は、独立標本を採ったという条件と矛盾しない。
<!-- definition-example-end -->

正例という語は、ここでは「同一の観測に由来する二つのビュー」という**生成手続き**を指す。意味カテゴリの一致や正解ラベルの一致ではない。別標本であっても同じ人・同じ文字・同じ地物を表す場合がある。その負例をむやみに遠ざけると、後で使いたい特徴をかえって壊す。

学習パラメータを $\theta$、学習器を $f_\theta:\mathcal V\to\mathbb R^d$ とし、出力 $h=f_\theta(v)$ を**埋め込み（表現）**と呼ぶ。$d\ge1$ で、$h\ne0$ なら長さで割った $z=h/\|h\|_2$ は単位ベクトルである。正規化すれば、内積は方向の類似度（cosine類似度）となり、単にベクトルの長さを増やして得点を操作するのを防げる。ゼロベクトルは正規化できないため、この扱いは実装時に明示する。

実際、二つの非零の埋め込み $h,h_j$ から単位ベクトル $z,z_j$ を作ると、内積の双線形性によって

$$
z^{\mathsf T}z_j
=\left(\frac{h}{\|h\|_2}\right)^{\mathsf T}
\frac{h_j}{\|h_j\|_2}
=\frac{h^{\mathsf T}h_j}{\|h\|_2\|h_j\|_2}
$$

となる。したがって、以下の得点は元の埋め込みの長さでなく、二つの向きの一致度を測る。

## 2. 正例を候補集合の中から選ぶ対照損失

一つの問い合わせビュー $v$ の埋め込みを $z$、候補 $K\ge2$ 個の埋め込みを $z_1,\ldots,z_K$ とする。候補番号 $j_+$ が正例で、残りを負例候補にする。候補への得点が大きいものほど正例として選ばれやすい確率を割り当てる。これは[softmax](../ML2-18/index.md#def-ml2-18-attention)を候補へ適用したものである。

温度 $\tau>0$ を導入する。得点の差を温度で割るため、小さい温度は候補同士の差を強調し、大きい温度は予測確率を一様に近づける。類似度の使い方、負例数、正例の選び方は別々に指定しなければならない。

<a id="def-ml2-19-contrastive"></a>

<!-- formal-statement-start -->
> **定義（温度付き対照損失）**  
> $d\ge1$、$K\ge2$、$\tau>0$ とし、問い合わせ $z\in\mathbb R^d$ と候補 $z_j\in\mathbb R^d$ はすべてノルム1とする。正例候補の番号 $j_+\in\{1,\ldots,K\}$ として、得点と候補確率を

$$
s_j=\frac{z^{\mathsf T}z_j}{\tau},\qquad
q_j=\frac{e^{s_j}}{\sum_{r=1}^K e^{s_r}}
$$

> と置く。一つの問い合わせの**温度付き対照損失**を

$$
\ell=-\ln q_{j_+}
=-s_{j_+}+\ln\sum_{r=1}^K e^{s_r}
$$

> と定義する。分布上の期待値を取るときは、正例・負例候補の生成手続きも確率模型の一部とする。自然対数を用いる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-19-contrastive -->
**定義の確認**。$d=1$ の単位ベクトルは $\pm1$ である。問い合わせ $z=1$、正例 $z_1=1$、負例候補 $z_2=-1$ なら $s_1=1/\tau,s_2=-1/\tau$、したがって

$$
q_1=\frac{e^{1/\tau}}{e^{1/\tau}+e^{-1/\tau}}
=\frac1{1+e^{-2/\tau}},\qquad
\ell=\ln(1+e^{-2/\tau}).
$$

$\tau=1$ では $\ell\approx0.127$、$\tau=1/2$ では $\ell\approx0.018$ となる。同じ埋め込みでも温度で損失が変わる。分母は必ず正で $0<q_1<1$、よって $\ell>0$ である。
<!-- definition-example-end -->

候補を一つ増やすと、埋め込みを固定した場合は分母へ正の項が加わり損失は大きくなる。同じ値の負例候補が何度も入れば、その分だけ正例の予測確率は下がる。訓練が進んだときに損失の大小だけで異なる負例数の実験を比較するのは適切でない。

## 3. どの方向へ埋め込みを動かすのか

正例との距離を縮めたいとき、負例を全部均等に押しのけるわけではない。softmaxで確率を大きく割り当てた候補ほど、勾配で強い反作用を受ける。分母も微分に寄与するため、正例の得点だけの微分では誤る。

<a id="thm-ml2-19-gradient"></a>

<!-- formal-statement-start -->
> **定理（対照損失の得点勾配）**  
> $K\ge2$、$\tau>0$、$z,z_1,\ldots,z_K\in\mathbb R^d$ のノルムが1であるとし、[温度付き対照損失](#def-ml2-19-contrastive) $\ell$ を定める。得点 $s_j=z^{\mathsf T}z_j/\tau$ と候補確率 $q_j$ に対して

$$
\frac{\partial\ell}{\partial s_j}
=q_j-\boldsymbol1_{\{j=j_+\}}.
$$

> 正規化済み埋め込みを独立変数として形式的に微分すると

$$
\nabla_z\ell=\frac{\sum_{j=1}^Kq_jz_j-z_{j_+}}{\tau},
\qquad
\nabla_{z_j}\ell
=\frac{q_j-\boldsymbol1_{\{j=j_+\}}}{\tau}z.
$$

> 正規化前の埋め込み $h\ne0$ に戻す場合は、$z=h/\|h\|_2$ のJacobianも掛ける。
<!-- formal-statement-end -->

### 証明の見取り図

正例の得点を引く項は $-1$、対数和の微分はsoftmaxとなる。これは[attentionのsoftmax微分](../ML2-18/index.md#thm-ml2-18-gradient)と同じ商の微分である。内積の微分は候補ベクトルを残すが、学習器のパラメータへ戻す段階では正規化の導関数を忘れない。

<!-- proof-start -->
### 証明

分母を $Z=\sum_{r=1}^K e^{s_r}$ と書くと $\ell=-s_{j_+}+\ln Z$ である。$s_j$ で偏微分すると

$$
\frac{\partial\ell}{\partial s_j}
=-\boldsymbol1_{\{j=j_+\}}+\frac1Z\frac{\partial Z}{\partial s_j}
=-\boldsymbol1_{\{j=j_+\}}+\frac{e^{s_j}}Z.
$$

$s_j=\tau^{-1}\sum_{a=1}^d z_a(z_j)_a$ なので、$\partial s_j/\partial z_a=(z_j)_a/\tau$、$\partial s_j/\partial(z_j)_a=z_a/\tau$ である。連鎖律を各座標に適用し

$$
\begin{aligned}
\frac{\partial\ell}{\partial z_a}
&=\sum_{j=1}^K\frac{\partial\ell}{\partial s_j}
\frac{\partial s_j}{\partial z_a}
=\frac1\tau\sum_{j=1}^K
(q_j-\boldsymbol1_{\{j=j_+\}})(z_j)_a,\\
\frac{\partial\ell}{\partial(z_j)_a}
&=\frac{\partial\ell}{\partial s_j}
\frac{\partial s_j}{\partial(z_j)_a}
=\frac{q_j-\boldsymbol1_{\{j=j_+\}}}{\tau}z_a.
\end{aligned}
$$

さらに $r=\|h\|_2>0$、$z=h/r$ と置く。以下の $dh,dr,dz$ は、$h$ を微小に動かしたときの各量の一次変化を表す微分記法であり、次元を表す整数 $d$ とは区別する。$r^2=h^{\mathsf T}h$ の両辺を微分すると

$$
2r\,dr=2h^{\mathsf T}dh,
\qquad dr=\frac{h^{\mathsf T}}r\,dh=z^{\mathsf T}dh.
$$

$r>0$ を使って除算した。これを $z=h/r$ の商の微分に代入すると

$$
dz=\frac{dh}{r}-\frac{h}{r^2}dr
=\frac{I-zz^{\mathsf T}}{\|h\|_2}\,dh.
$$

したがって正規化前への勾配は

$$
\nabla_h\ell
=\frac{I-zz^{\mathsf T}}{\|h\|_2}\nabla_z\ell.
$$

実装上は[逆モード連鎖律](../ML2-14/index.md#thm-ml2-14-reverse-chain)に従って、各ビューから共有学習器へ勾配を合計する。$\square$
<!-- proof-end -->

候補確率の総和は1なので、すべての得点へ同じ定数を足しても損失は変わらず、実際 $\sum_j\partial\ell/\partial s_j=0$ である。対して $\tau\to0$ では最大得点の候補が支配するが、正例と負例の得点が同じときにはその同点が残る。温度を下げれば無条件に表現が良くなるわけではない。

## 4. 拡張に関して不変であることと、識別できることは違う

同じ元観測から二つのビューを作ったとき、それぞれの埋め込みが等しければ、拡張の結果によらない表現になっている。完全な等号は強すぎる場合があるため、差の二乗距離を平均して不変性の程度を測る。

<a id="def-ml2-19-invariance"></a>

<!-- formal-statement-start -->
> **定義（拡張に関する平均二乗不変性）**  
> 確率変数 $X$ を与え、$X$ を条件として独立同分布の二ビュー $V,V^+$ を採る。測定可能な表現 $f:\mathcal V\to\mathbb R^d$ は $E\|f(V)\|_2^2<\infty$ を満たすとする。**平均二乗不変性誤差**を

$$
\mathcal R_{\mathrm{inv}}(f)
=E\bigl[\|f(V)-f(V^+)\|_2^2\bigr]
$$

> と定義する。これが0なら、この拡張分布について $f(V)=f(V^+)$ が確率1で成り立つ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-19-invariance -->
**定義の確認**。$X\in\{0,1\}$ に対し、ビューを $V=(X,B)$ とし、付加されるビット $B$ は $X$ と独立な公平硬貨とする。二ビューでは $B,B^+$ を互いにも独立に採る。

元観測を取り出す表現 $f(V)=X$ では、二ビューの差は常に0である。雑音だけを取り出す $g(V)=B$ では、二つの硬貨が違う確率は $1/2$、その場合の差の二乗は1なので

$$
\mathcal R_{\mathrm{inv}}(f)=0,\qquad
\mathcal R_{\mathrm{inv}}(g)=\frac12.
$$

定数関数 $c(V)=0$ も不変性誤差は0だが、$X$ を一切区別しない。この例では、不変性だけでは保存したい情報を判別できない。
<!-- definition-example-end -->

この誤差を条件付きの座標計算で判定するため、$Z=f(V)\in\mathbb R^d$ の条件付き平均を $\mu(X)=E[Z\mid X]$ とする。条件付き共分散行列の $(a,b)$ 成分を

$$
\Sigma_{ab}(X)=E[(Z_a-\mu_a(X))(Z_b-\mu_b(X))\mid X]
$$

と並べると、その対角成分は座標 $a$ の条件付き分散である。行列の**トレース** $\operatorname{tr}\Sigma=\sum_{a=1}^d\Sigma_{aa}$ は対角成分の和なので、平方ノルムを座標展開して

$$
E[\|Z-\mu(X)\|_2^2\mid X]
=\sum_{a=1}^d E[(Z_a-\mu_a(X))^2\mid X]
=\operatorname{tr}\Sigma(X)
$$

となる。各成分の二次モーメントは有限だから、有限和と条件付き期待値を交換できる。この対応を用いて二ビューの差を判定する。

<a id="thm-ml2-19-invariance-variance"></a>

<!-- formal-statement-start -->
> **定理（拡張不変性と条件付き分散）**  
> [平均二乗不変性](#def-ml2-19-invariance)の設定で、$\mu(X)=E[f(V)\mid X]$ とし、条件付き共分散行列を

$$
\Sigma(X)=E[(f(V)-\mu(X))(f(V)-\mu(X))^{\mathsf T}\mid X]
$$

> と置く。このとき

$$
\mathcal R_{\mathrm{inv}}(f)
=2E[\operatorname{tr}\Sigma(X)].
$$

> とくに $\mathcal R_{\mathrm{inv}}(f)=0$ は、元観測 $X$ を固定したときの表現の条件付き分散がほとんど確実に0であることと同値である。
<!-- formal-statement-end -->

### 証明の見取り図

二つのビューが条件付き独立なので、差の二乗を展開した交差項は、条件付き平均の内積の二乗へ分解できる。残る「二乗の平均から平均の二乗を引く」量が各座標の条件付き分散である。

<!-- proof-start -->
### 証明

$Z=f(V),Z^+=f(V^+)$ とする。条件付き同分布から $E[\|Z\|^2\mid X]=E[\|Z^+\|^2\mid X]$、条件付き独立性から

$$
\begin{aligned}
E[Z^{\mathsf T}Z^+\mid X]
&=\sum_{a=1}^d E[Z_aZ_a^+\mid X]\\
&=\sum_{a=1}^d E[Z_a\mid X]E[Z_a^+\mid X]
=\|\mu(X)\|_2^2.
\end{aligned}
$$

よって二乗を展開し条件付き期待値を取ると

$$
\begin{aligned}
E[\|Z-Z^+\|_2^2\mid X]
&=2E[\|Z\|_2^2\mid X]-2\|\mu(X)\|_2^2\\
&=2E[\|Z-\mu(X)\|_2^2\mid X]\\
&=2\operatorname{tr}\Sigma(X).
\end{aligned}
$$

最後は平方和と共分散行列の対角和の定義である。両辺の期待値を取れば主張を得る。$\operatorname{tr}\Sigma(X)\ge0$ なので、その平均が0であることは値がほとんど確実に0であることと同値である。$\square$
<!-- proof-end -->

この定理が保証するのは**指定した拡張に対する不変性**であり、「下流の予測に必要な情報が残る」という保証ではない。拡張が元の文字や地物の属性を消してしまえば、二つのビューを一致させる学習はその情報を使わない方向へ進むこともある。

<a id="prop-ml2-19-collapse"></a>

<!-- formal-statement-start -->
> **命題（表現崩壊の対照損失）**  
> $K\ge2$ と $\tau>0$ を固定する。[対照損失](#def-ml2-19-contrastive)で、すべてのビューの正規化埋め込みが同じ単位ベクトル $c$ になるとする。このときどの候補が正例でも $q_j=1/K$ であり、$\ell=\ln K$ となる。一方、拡張に対する[平均二乗不変性誤差](#def-ml2-19-invariance)は0である。
<!-- formal-statement-end -->

### 証明の見取り図

全候補の内積が1で一致するからsoftmaxは一様になる。二ビューも同じベクトルなので差の二乗は0である。

<!-- proof-start -->
### 証明

$z=c,z_j=c$ より全 $j$ で $s_j=c^{\mathsf T}c/\tau=1/\tau$ である。したがって

$$
q_j=\frac{e^{1/\tau}}{Ke^{1/\tau}}=\frac1K,\qquad
\ell=-\ln(1/K)=\ln K.
$$

また $f(V)=f(V^+)=c$ なので、定義の期待値の中身は常に $\|c-c\|_2^2=0$。$\square$
<!-- proof-end -->

正負例を区別する損失があればこの定数解は、候補を分離できる場合より高い損失となる。ただしデータやモデルが区別を許さない場合、対照損失が自動的に有益な意味特徴を作るわけではない。

## 5. InfoNCEは何についての情報下界なのか

対照損失から相互情報量の下界を作れる、という説明をよく見る。しかし、正例と負例がどの分布から来たかを省くとその式は正当化できない。ここでは有限集合の模型に絞り、[相互情報量の相対エントロピー表示](../../INFO/INFO2/index.md#thm-info2-mutual-kl)を使う。情報量の対数は前提章の底2ではなく自然対数とし、**nat**で測る。底2の値とは $\ln2$ 倍の関係にある。

問い合わせを確率変数 $U$、それと対になるビューを $V$ とする。各々の周辺分布を $p_U,p_V$、同時分布を $p_{UV}$ と書く。独立な負例を比較対象に入れるとき、正例は条件付き分布 $p(v\mid u)$、それ以外は周辺分布 $p_V(v)$ から取る。この両者の違いを比べる分類問題を作る。前節までの正規化内積得点は一つの選択肢であり、情報量との関係を証明するため、ここでは得点を任意の実数値関数 $s(u,v)$ へ一般化する。

<a id="def-ml2-19-independent-negatives"></a>

<!-- formal-statement-start -->
> **定義（独立負例の候補識別模型）**  
> 有限集合 $\mathcal U,\mathcal V$ 上の同時分布 $p_{UV}$ を与え、正整数 $K\ge2$ とする。$p_U(u)>0,p_V(v)>0$ の台だけを扱う。正例番号 $J\in\{1,\ldots,K\}$ は各番号を確率 $1/K$ で採り、$U\sim p_U$ と独立にする。$U=u,J=j$ を条件として候補 $V_1,\ldots,V_K$ は独立とし、

$$
V_j\sim p(\,\cdot\mid u),\qquad
V_r\sim p_V\quad(r\ne j)
$$

> とする。$W=(U,V_1,\ldots,V_K)$ と書く。任意の実数値得点関数 $s:\mathcal U\times\mathcal V\to\mathbb R$ に対し、候補分類確率と平均対照損失を

$$
q_s(j\mid W)
=\frac{e^{s(U,V_j)}}{\sum_{r=1}^K e^{s(U,V_r)}},
\qquad
L_K(s)=E[-\ln q_s(J\mid W)]
$$

> と定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-19-independent-negatives -->
**定義の確認**。$U$ が公平な0/1、正例が常に $V=U$、候補数が $K=2$ の場合を考える。$J$ は公平二値の候補番号とし、$U$ とは独立に採る。したがって周辺分布は $p_V(0)=p_V(1)=1/2>0$、条件付き確率 $p(v\mid u)$ は一致時1、不一致時0である。

$J=1,U=0$ が与えられると、正例 $V_1=0$ は確率1、負例 $V_2=0$ と $V_2=1$ は各確率 $1/2$ で起きる。$V_1=V_2=0$ となる場合もあるが、負例は周辺分布から独立に採られているので定義に合う。
<!-- definition-example-end -->

任意の $u,v_1,\ldots,v_K$ で、候補 $j$ が正例である事後確率をBayesの公式で計算すると

$$
P(J=j\mid W)
=\frac{p(v_j\mid U)/p_V(v_j)}
{\sum_{r=1}^Kp(v_r\mid U)/p_V(v_r)}
$$

となる（分母は観測 $W$ が正確率を持つとき正である）。従って、**密度比** $p(v\mid u)/p_V(v)$ の対数が得点の理想形である。$p(v\mid u)=0$ の候補には事後確率0を割り当てる。有限の実数得点softmaxでは厳密に0を出せないが、正確率の候補だけで近似することはできる。

<a id="thm-ml2-19-infonce-bound"></a>

<!-- formal-statement-start -->
> **定理（有限独立負例模型におけるInfoNCE下界）**  
> 有限集合上の同時分布 $p_{UV}$ と $K\ge2$ に対して[独立負例の候補識別模型](#def-ml2-19-independent-negatives)で $J,W,L_K(s)$ を構成する。任意の実数値得点関数 $s$ について、自然対数で定義した相互情報量と平均対照損失は

$$
I(U;V)\ge\ln K-L_K(s)
$$

> を満たす。これは指定した $p_{UV}$ と負例の独立周辺サンプリングに関する下界であり、任意の負例選択則についての主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

「真の正例番号を当てる分類問題」を考える。元の結合分布と独立な基準分布の相対エントロピーを二通りに展開する。一方は $I(U;V)$、他方は正例番号を識別できる量に非負の余りを加えたものになる。学習したsoftmaxの対数損失は、真の事後分布を使った最良の分類損失より小さくならない。

<!-- proof-start -->
### 証明

$P$ を $(J,W)$ の上で定義から得られる同時分布とする。基準分布 $Q$ は $J$ を一様、$U$ を $p_U$、候補 $K$ 個を互いに独立な $p_V$ から採る分布とする。したがって有限集合上で

$$
\begin{aligned}
P(j,u,v_1,\ldots,v_K)
&=\frac{p_U(u)}K\,p(v_j\mid u)\prod_{r\ne j}p_V(v_r),\\
Q(j,u,v_1,\ldots,v_K)
&=\frac{p_U(u)}K\prod_{r=1}^Kp_V(v_r).
\end{aligned}
$$

$P$ が正の点では $Q$ も正であり、両者の比は

$$
\frac{P(j,u,v_1,\ldots,v_K)}
{Q(j,u,v_1,\ldots,v_K)}
=\frac{p(v_j\mid u)}{p_V(v_j)}
$$

となる。$P$ による対数比の期待値を取ると、$J=j$ の下で $(U,V_j)$ は必ず $p_{UV}$ に従う。したがって $J$ の各値の重み $1/K$ を合計して

$$
\begin{aligned}
D(P\|Q)
&=\sum_{j=1}^K\frac1K
\sum_{u,v}p_{UV}(u,v)\ln\frac{p(v\mid u)}{p_V(v)}\\
&=\sum_{u,v}p_{UV}(u,v)
\ln\frac{p_{UV}(u,v)}{p_U(u)p_V(v)}\\
&=I(U;V).
\end{aligned}
$$

二行目は $p(v\mid u)=p_{UV}(u,v)/p_U(u)$ を代入し、$\sum_{j=1}^K1/K=1$ とした。最後の同値は[相互情報量の相対エントロピー表示](../../INFO/INFO2/index.md#thm-info2-mutual-kl)を自然対数へ換算したものである。

次に同じ相対エントロピーを $W$ の周辺分布と、その下での $J$ の条件付き分布に分解する。$P_W(w)>0$ の点では $Q_W(w)>0$ である。ここからは $H_P(J\mid W)=-E_P[\ln P(J\mid W)]$ を $P$ の下での条件付きエントロピー（真の事後確率による平均対数損失）と書く。対数比は

$$
\begin{aligned}
\ln\frac{P(j,w)}{Q(j,w)}
&=\ln\frac{P_W(w)}{Q_W(w)}
+\ln\frac{P(J=j\mid W=w)}{Q(J=j\mid W=w)}.
\end{aligned}
$$

$Q$ の下では $J$ は $W$ と独立で一様、すなわち $Q(J=j\mid W=w)=1/K$。これを $P$ で平均すると

$$
\begin{aligned}
D(P\|Q)
&=D(P_W\|Q_W)
+E_{P_W}D(P_{J\mid W}\|\operatorname{Unif}_K)\\
&=D(P_W\|Q_W)+\ln K-H_P(J\mid W).
\end{aligned}
$$

[Gibbs不等式](../../INFO/INFO2/index.md#thm-info2-gibbs)より第一項は非負。さらに任意の有限得点 $s$ について、真の事後分布と $q_s$ を比較すると

$$
\begin{aligned}
L_K(s)
&=-E_P[\ln q_s(J\mid W)]\\
&=H_P(J\mid W)
+E_{P_W}D(P_{J\mid W}\|q_s(\,\cdot\mid W))\\
&\ge H_P(J\mid W).
\end{aligned}
$$

各 $q_s$ は正なので、真の事後確率が正である番号について対数は有限である。これらをつなぐと

$$
I(U;V)
=D(P_W\|Q_W)+\ln K-H_P(J\mid W)
\ge\ln K-L_K(s).
$$

これで示された。$\square$
<!-- proof-end -->

この不等式には区別すべき三つの点がある。

1. $I(U;V)$ は**二つのビューの相互情報量**であって、未知の正解ラベルや元観測 $X$ との相互情報量ではない。拡張が意味情報を消す場合、良い意味表現を保証しない。
2. 下界の比較対象は、$V_j$ が条件付き正例、他の $V_r$ が $p_V$ から独立に採られる生成模型である。同一原画像の多重ビューを負例に混ぜたり、類似度を使って「難しい負例」を選別したりすると、上の $P$ の積表示が変わる。この証明をそのまま流用できない。
3. 有限の $K$ では $\ln K-L_K(s)\le\ln K$。真の相互情報量が大きくても下界は頭打ちとなる。また右辺が負でも誤りではない。相互情報量自体は非負である。

多くの実装では、ミニバッチ中の他標本のビューを負例に使う。元観測が独立同分布で、各標本間の拡張乱数も独立であれば、一つの問い合わせについて他標本のビューは周辺分布からの独立標本に対応する。一方、同じ元観測を複数行に複製したバッチ、時系列の強く依存する窓、ラベルを見て選んだ負例などはこの構成と異なる。学習目的として損失を計算できることと、上の情報下界を引用できることを分ける。

## 6. 正負例選択と評価の情報漏洩

負例候補が「同じカテゴリだが別の元観測」という**偽負例（false negative）**である場合、得点を下げるよう学習する力が働く。例えば同一人物の別写真を別人物扱いすると、人物同一性を欲しい後続課題では逆効果になり得る。正例と負例が完全に同じ埋め込みなら得点も同じになり、二候補では $\ell=\ln2$ から下げられない。その事実を「勾配実装の失敗」と取り違えない。

**評価への漏洩**も別問題である。一つの元観測 $x$ からできた二つの拡張ビューを、訓練集合と評価集合へそれぞれ割り当てれば、名前だけは別標本でも情報源は同じである。分割は拡張生成前に元観測の単位で行う。時系列・個人・地物・撮影セッションが同じものをまたがって含むなら、一般化を評価する単位に応じてグループを先に分ける。[訓練・検証・試験の分割](../ML1-12/index.md#def-ml1-12-three-way-split)では、前処理や特徴の学習も訓練側だけで行う必要があった。自己教師あり事前学習で評価データを使った場合は、少なくともそれを「未知の標本への純粋な外挿評価」とは呼べない。

教師ラベルを学習損失へ直接使わなくても、拡張方式や負例選択を**評価結果を見ながら何度も変更**すれば評価情報に適合する。訓練・検証・最終試験の役割を区別することは教師あり学習と変わらない。

## 7. 計算ラボ：温度、ビューのずれ、偽負例を動かす

二次元単位円上の問い合わせを $(1,0)$ と固定し、正例を角度 $\alpha$ の点 $(\cos\alpha,\sin\alpha)$ に置く。負例は反対方向 $\pi$ の近傍から、固定乱数初期値で小さな揺れを与える。`false_negative=True` とすると、負例を正例と同じ位置へ置き換える。このとき候補番号は違っても埋め込みは同じである。

変更可能な値は温度 `tau`、正例ずれ角 `alpha`、偽負例の有無、乱数初期値 `seed` である。候補確率、損失、score勾配を計算し、単位円上の埋め込みを表示する。これは埋め込みが学習して移動するシミュレーションではなく、**埋め込み配置を入力とした損失の直接計算**である。

```python-lab
import numpy as np
import matplotlib.pyplot as plt

def contrastive_lab(tau=0.5, alpha=0.3, false_negative=False, seed=2719):
    assert 0.05 <= tau <= 5 and 0 <= alpha <= np.pi
    rng = np.random.default_rng(seed)
    query = np.array([1., 0.])
    positive = np.array([np.cos(alpha), np.sin(alpha)])
    beta = np.pi + rng.normal(scale=0.15)
    negative = (positive.copy() if false_negative
                else np.array([np.cos(beta), np.sin(beta)]))
    candidates = np.stack([positive, negative])
    score = candidates @ query / tau
    shifted = score - np.max(score)
    probs = np.exp(shifted) / np.sum(np.exp(shifted))
    loss = -np.log(probs[0])
    grad_score = probs - np.array([1., 0.])
    return query, candidates, probs, float(loss), grad_score

tau, alpha, false_negative, seed = 0.5, 0.3, False, 2719
query, candidates, prob, loss, grad = contrastive_lab(
    tau, alpha, false_negative, seed
)
print("probabilities:", prob, "loss:", loss, "dL/dscore:", grad)
fig, ax = plt.subplots(figsize=(5, 5))
t = np.linspace(0, 2*np.pi, 361)
ax.plot(np.cos(t), np.sin(t), "k:", linewidth=1)
for v, name, marker in [(query, "query", "o"),
                        (candidates[0], "positive", "s"),
                        (candidates[1], "negative", "^")]:
    ax.scatter(*v, s=70, marker=marker, label=name)
ax.set(xlim=(-1.2, 1.2), ylim=(-1.2, 1.2), xlabel="z1", ylabel="z2")
ax.set_aspect("equal"); ax.legend(); plt.show()
```

```python-solution
import numpy as np

def contrastive_lab(tau=0.5, alpha=0.3, false_negative=False, seed=2719):
    assert 0.05 <= tau <= 5 and 0 <= alpha <= np.pi
    rng = np.random.default_rng(seed)
    query = np.array([1., 0.])
    positive = np.array([np.cos(alpha), np.sin(alpha)])
    beta = np.pi + rng.normal(scale=0.15)
    negative = (positive.copy() if false_negative
                else np.array([np.cos(beta), np.sin(beta)]))
    candidates = np.stack([positive, negative])
    score = candidates @ query / tau
    shifted = score - np.max(score)
    probs = np.exp(shifted) / np.sum(np.exp(shifted))
    loss = -np.log(probs[0])
    grad_score = probs - np.array([1., 0.])
    return query, candidates, probs, float(loss), grad_score
```

```python-test
import numpy as np
for tau in (0.1, 0.5, 1., 3.):
    q, z, p, loss, grad = contrastive_lab(tau, 0., True, 17)
    assert np.allclose(np.linalg.norm(z, axis=1), 1.)
    assert np.allclose(p, [0.5, 0.5]) and np.isclose(loss, np.log(2))
    assert np.allclose(grad, [-0.5, 0.5])
q, z, p, loss, grad = contrastive_lab(0.5, 0., False, 2719)
assert p[0] > p[1] and loss < np.log(2)
assert np.isclose(np.sum(grad), 0)
assert np.array_equal(contrastive_lab(seed=5)[1], contrastive_lab(seed=5)[1])
assert not np.array_equal(contrastive_lab(seed=5)[1], contrastive_lab(seed=6)[1])
```

偽負例を有効にすると、二候補の得点が完全に等しいので温度に依存せず損失は $\ln2$ である。ただし得点に関する勾配は $(-1/2,1/2)$ と非零なので、**得点変数**が独立なら差を作る方向がある。一方、同じ問い合わせ・候補ベクトルにパラメータを共有させた場合は、それぞれの経路から来る勾配が相殺することがある。どの変数について微分したかを区別する。

## 8. 演習

### ML2-19-A01 正例と負例の生成確率

- Level: A

元観測 $X\in\{a,b\}$ が公平な二値分布で、拡張は恒等変換とする。二つの正例ビュー $(V,V^+)$ の分布を求めよ。元観測と独立な負例 $V^-$ について、$V=a$ を条件とする $P(V^-=a\mid V=a)$ も求めよ。

<!-- solution-start -->
**詳細解答**。[正例の定義](#def-ml2-19-views)で両ビューは同じ $X$ に由来し、恒等変換では $V=V^+=X$ である。従って

$$
P(V=a,V^+=a)=P(X=a)=\frac12,\quad
P(V=b,V^+=b)=\frac12.
$$

異なる二値の組の確率は0である。負例は元観測と独立な $X^-$ から作るので $V^-=X^-$ と $V=X$ は独立。従って

$$
P(V^-=a\mid V=a)=P(X^-=a)=\frac12.
$$

異なる標本の選択という規則だけでは、値の一致を除外できない。
<!-- solution-end -->

### ML2-19-A02 温度付き二候補の計算

- Level: A

問い合わせ $z=(1,0)$、正例 $z_1=(0,1)$、負例 $z_2=(-1,0)$、温度 $\tau=1$ とする。二候補の得点・正例確率・対照損失を求めよ。各ベクトルのノルムも確認する。

<!-- solution-start -->
**詳細解答**。各ベクトルの平方ノルムは1なので[対照損失の定義](#def-ml2-19-contrastive)を適用できる。内積は $z^{\mathsf T}z_1=0$、$z^{\mathsf T}z_2=-1$ だから

$$
s_1=0,\quad s_2=-1,\quad
q_1=\frac{1}{1+e^{-1}}=\frac{e}{e+1}.
$$

従って

$$
\ell=-\ln q_1
=\ln(1+e^{-1})\approx0.3133.
$$

負例の得点が小さいので $q_1>1/2$ である。
<!-- solution-end -->

### ML2-19-A03 温度に対する単調性

- Level: A

二候補で正例の内積を $a$、負例の内積を $b$ とし、$-1\le b<a\le1$ とする。温度 $\tau>0$ の対照損失を一つの対数で表し、$\tau$ に関して単調増加であることを示せ。

<!-- solution-start -->
**詳細解答**。[対照損失の定義](#def-ml2-19-contrastive)から、得点を $a/\tau,b/\tau$ と代入して分子で割れば

$$
\ell(\tau)
=-\ln\frac{e^{a/\tau}}{e^{a/\tau}+e^{b/\tau}}
=\ln(1+e^{-(a-b)/\tau}).
$$

$\delta=a-b>0$ と置き、連鎖律を適用する。$-\delta/\tau$ の導関数は $\delta/\tau^2$ なので

$$
\ell'(\tau)
=\frac{e^{-\delta/\tau}}{1+e^{-\delta/\tau}}
\frac{\delta}{\tau^2}>0.
$$

これは**正例の得点がより大きいという仮定の下**での結論である。正例と負例が逆転している場合には、温度を下げるほど大きなペナルティになる。
<!-- solution-end -->

### ML2-19-A04 二つのビューの条件付き分散

- Level: A

元観測 $X$ は定数とし、二つの拡張ビュー $V,V^+$ をそれぞれ独立な公平二値とする。実数値表現 $f(v)=v$ の平均二乗不変性誤差を直接計算し、条件付き分散の2倍とも比較せよ。

<!-- solution-start -->
**詳細解答**。可能な組 $(0,0),(0,1),(1,0),(1,1)$ は独立性によって各確率 $1/4$ である。二つの異なる組では差の二乗が1、同じ組では0なので

$$
\mathcal R_{\mathrm{inv}}(f)
=0\cdot\frac14+1\cdot\frac14
+1\cdot\frac14+0\cdot\frac14
=\frac12.
$$

一方 $E[V\mid X]=1/2$、$E[V^2\mid X]=1/2$ より

$$
\operatorname{Var}(V\mid X)
=\frac12-\left(\frac12\right)^2=\frac14.
$$

[条件付き分散の恒等式](#thm-ml2-19-invariance-variance)の右辺は $2\cdot1/4=1/2$ であり、直接計算と一致する。
<!-- solution-end -->

### ML2-19-B01 勾配と正規化への逆伝播

- Level: B

$d=2,K=2,\tau=1$、問い合わせ $z=(1,0)$、正例 $z_1=(1,0)$、負例 $z_2=(0,1)$ とする。候補確率 $q_1,q_2$ と、正規化済み問い合わせに関する勾配 $\nabla_z\ell$ を求めよ。問い合わせが $h=(2,0)$ から $z=h/\|h\|$ で作られたときの $\nabla_h\ell$ も求めよ。

<!-- solution-start -->
**詳細解答**。得点は $(s_1,s_2)=(1,0)$ で、正例確率は $q_1=e/(e+1)$、負例確率は $q_2=1/(e+1)$ である。[得点勾配の定理](#thm-ml2-19-gradient)へ代入すると

$$
\begin{aligned}
\nabla_z\ell
&=q_1(1,0)+q_2(0,1)-(1,0)\\
&=(q_1-1,q_2)
=\left(-\frac1{e+1},\frac1{e+1}\right).
\end{aligned}
$$

$h=(2,0)$ のノルムは2、$z=(1,0)$ なので、同定理の正規化Jacobianは

$$
\frac{I-zz^{\mathsf T}}{\|h\|}
=\frac12\begin{pmatrix}0&0\\0&1\end{pmatrix}.
$$

これを左から掛けて

$$
\nabla_h\ell=\left(0,\frac1{2(e+1)}\right).
$$

正規化後のノルム方向に沿う勾配は消える。$z$ を独立変数として得た勾配をそのまま $h$ の勾配と呼んではいけない。
<!-- solution-end -->

### ML2-19-B02 同点候補と偽負例

- Level: B

$K=3$ とし、正規化済み問い合わせと正例・二つの負例候補の内積がそれぞれ $(1,1,-1)$ であるとする。$\tau>0$ の対照損失とその $\tau\to0$ の極限を求めよ。最初の負例は、正例と同じ意味の別標本だったとする。この計算結果をどう解釈すべきか説明せよ。

<!-- solution-start -->
**詳細解答**。正例と最初の負例は同じ得点 $1/\tau$、二つ目の負例は $-1/\tau$ である。[対照損失の定義](#def-ml2-19-contrastive)より

$$
\ell=-\ln\frac{e^{1/\tau}}{2e^{1/\tau}+e^{-1/\tau}}
=\ln(2+e^{-2/\tau}).
$$

$\tau\to0$ では $2/\tau\to+\infty$ なので $e^{-2/\tau}\to0$、従って

$$
\lim_{\tau\downarrow0}\ell=\ln2.
$$

温度を下げても同点の候補を区別できず、正例確率の極限は $1/2$ である。最初の負例が意味的には正例と同じなら、正例を一つの番号に固定してその番号だけを当てる損失の要求と、後続課題で欲しい意味上の同一性が衝突する。**損失の残り $\ln2$ が埋め込みの欠陥とは限らない**。
<!-- solution-end -->

### ML2-19-B03 独立負例の情報界を実際に計算する

- Level: B

公平な二値 $U\in\{0,1\}$ と $V=U$ の組を考える。独立負例の候補識別模型で $K=2$ とする。負例が正例と一致する確率、正例番号の条件付きエントロピー $H(J\mid W)$、自然対数による $I(U;V)$ を求め、情報下界で得られる最大の値を比較せよ。得点は理想的な事後確率へ近づけられるものとする。

<!-- solution-start -->
**詳細解答**。正例 $V_J$ は必ず $U$ であり、負例は独立な公平二値なので確率 $1/2$ で $U$ と一致する。

候補二つがともに $U$ なら観測 $W$ から正例番号を判別できず、事後確率は $(1/2,1/2)$ でエントロピーは $\ln2$。候補が異なる場合は、$U$ と一致する候補が正例なので事後確率は $(1,0)$ または $(0,1)$、エントロピーは0である。従って

$$
H(J\mid W)
=\frac12\ln2+\frac12\cdot0
=\frac12\ln2.
$$

$V=U$ は情報を失わないので、$H(U)=\ln2$、$H(U\mid V)=0$ から

$$
I(U;V)=H(U)-H(U\mid V)=\ln2.
$$

[InfoNCE下界](#thm-ml2-19-infonce-bound)の右辺は、理想的な正例分類で $L_2\downarrow H(J\mid W)$ へ近づけても

$$
\ln2-\frac12\ln2=\frac12\ln2< I(U;V)
$$

までである。正例になり得ない候補の事後確率0は有限softmaxでは正確には作れないが、一致する候補の得点を不一致候補より十分大きくすれば分類損失はこの値へ収束する。下界の非一致は有限候補による情報の取り残しであり、定理の破綻ではない。
<!-- solution-end -->

### ML2-19-B04 負例分布を変更すると下界は壊れる

- Level: B

公平二値の確率変数 $U,V\in\{0,1\}$ を互いに独立とする（よって $I(U;V)=0$）。正例として独立な $V$ を採る一方、負例候補を $V^-=1-U$ と **$U$ を見て選ぶ**。候補は正例・負例の順に並べ、得点を $s(u,v)=(\ln3)\boldsymbol1_{\{u=v\}}$ とする。この変更後の採標法による平均対照損失を $\widetilde L_2$ と書いて求め、なぜ[独立負例の模型](#def-ml2-19-independent-negatives)での「$\ln2-L_2(s)\le I(U;V)$」をこの実験へ適用できないか説明せよ。

<!-- solution-start -->
**詳細解答**。正例 $V$ は $U$ と独立だから、$V=U$ と $V=1-U$ は各確率 $1/2$ である。

1. $V=U$ のとき、正例の得点は $\ln3$、負例 $1-U$ の得点は0である。正例確率は $3/(3+1)=3/4$、損失は $\ln(4/3)$。
2. $V=1-U$ のとき、正例も負例も同じ $1-U$ なので両得点は0、正例確率は $1/2$、損失は $\ln2$。

従って

$$
\widetilde L_2=\frac12\ln\frac43+\frac12\ln2
=\frac12\ln\frac83
<\ln2.
$$

一方 $U,V$ は独立なので[相互情報量の相対エントロピー表示](../../INFO/INFO2/index.md#thm-info2-mutual-kl)から $I(U;V)=0$。もし不適切に下界を代入すれば

$$
\ln2-\widetilde L_2=\frac12\ln\frac32>0=I(U;V)
$$

となり偽である。これは[独立負例の候補識別模型](#def-ml2-19-independent-negatives)の仮定に反するためである。負例の**周辺分布**は公平二値と一致するものの、$U$ を固定すると負例は常に $1-U$ になり、$p_V$ から独立に採られていない。独立性を周辺分布の一致へ弱めると証明の積表示が使えなくなる。
<!-- solution-end -->

### ML2-19-C01 保存したい特徴と情報下界を接続する

- Level: C

元観測を公平二値 $X\in\{0,1\}$ とする。$X,B,B^+,X^-,B^-$ は**互いに独立**な公平二値確率変数である。これらから正例の二ビューと負例を

$$
U=(X,B),\qquad V=(X,B^+),\qquad V^-=(X^-,B^-)
$$

と作る。$u=(x_u,b_u)$、$v=(x_v,b_v)$ のとき $x_u,x_v$ は各ビューの第一成分を表す。次を順に検討せよ。

1. $f_X(x,b)=x$、$f_B(x,b)=b$、$f_0(x,b)=0$ の各表現について、平均二乗不変性誤差を求める。
2. $K=2$ の候補識別で $s(u,v)=\lambda\boldsymbol1_{\{x_u=x_v\}}$（$\lambda>0$）を使う。正例を候補1、負例を候補2とした平均対照損失を求める。
3. 自然対数で $I(U;V)$ を計算し、$\lambda\to\infty$ での情報下界の値と比較する。
4. 一つの $X$ から得たビューを訓練・試験に分ける評価手順の問題点を説明する。

<!-- solution-start -->
**詳細解答**。

1. 同じ元観測 $X$ から二ビューを作るので、$f_X(U)=f_X(V)=X$、$f_0(U)=f_0(V)=0$ であり、それぞれの差の二乗は常に0。一方、$f_B(U)=B$、$f_B(V)=B^+$ は独立な公平二値なので異なる確率は $1/2$ である。従って

$$
\mathcal R_{\mathrm{inv}}(f_X)=0,\qquad
\mathcal R_{\mathrm{inv}}(f_B)=\frac12,\qquad
\mathcal R_{\mathrm{inv}}(f_0)=0.
$$

$f_0$ は不変だが $X$ を保持しない。$f_X$ は不変であり $X$ を区別する。

2. 正例は $x_u=x_v=X$ を必ず満たすので得点は $\lambda$。負例について $X^-=X$ が確率 $1/2$ で、その場合は候補がどちらも得点 $\lambda$、対照損失は $\ln2$。残りの確率 $1/2$ では負例得点は0で、正例確率と損失は

$$
q_1=\frac{e^\lambda}{e^\lambda+1},\qquad
\ell=\ln(1+e^{-\lambda}).
$$

よって期待値は

$$
L_2(\lambda)
=\frac12\ln2+\frac12\ln(1+e^{-\lambda}).
$$

3. $U=(X,B),V=(X,B^+)$ は $X$ を共有し、その条件の下では $B$ と $B^+$ は独立である。公平二値二つの組なので $H(U)=H(V)=2\ln2$。組 $(U,V)$ は自由な三ビット $(X,B,B^+)$ から一対一に決まり、$H(U,V)=3\ln2$ である。[相互情報量の定義](../../INFO/INFO1/index.md#def-info1-mutual-information)へ代入すると

$$
I(U;V)=H(U)+H(V)-H(U,V)
=2\ln2+2\ln2-3\ln2=\ln2.
$$

$\lambda\to\infty$ では $e^{-\lambda}\to0$ なので $L_2(\lambda)\to\frac12\ln2$、従って[情報下界](#thm-ml2-19-infonce-bound)は $\frac12\ln2$ に近づく。真の相互情報量 $\ln2$ より小さいのは、独立負例が $X$ の値で正例と衝突する確率が $1/2$ あるためである。

4. ビューは別々の拡張乱数を使っていても同じ $X$ を共有する。ビュー単位で分ければ、訓練側から評価側へ元観測の固有情報が流れ、未知の $X$ への一般化性能を過大評価する可能性がある。訓練・検証・試験の分割は **元観測 $X$ 単位で先に実施**し、各分割の内部でのみビューを生成する。学習中に試験側を使って拡張・温度を選ばないことも必要である。
<!-- solution-end -->

## 9. 何が学べて、何がまだ保証されないか

対照学習では正例の得点を負例より高くすることで、単なる不変性だけの崩壊解に圧力をかけられる。ただし、どの変換で近づけるか、どの候補を遠ざけるかの選択自体が課題への仮定である。定数表現を避けることと、未知データへ一般化することも別の問題である。

情報量の議論では**二ビューの同時分布と独立な周辺負例の生成模型**を固定すれば、候補分類損失から正確な下界を導ける。この模型を越える負例採標や依存データへそのまま移すことはできない。実装では拡張・標本重複・データ分割・温度・候補数を記録し、同じ条件の下で損失と下流評価を分けて検証する。
