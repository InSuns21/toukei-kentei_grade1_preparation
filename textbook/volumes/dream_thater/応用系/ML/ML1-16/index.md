# ML1-16 Boosting・加法モデル

<!-- definition-example-audit: strict -->

## 1. 平均ではなく、前の失敗を受けて次を学習する

前講の[Bagging予測器](../ML1-15/index.md#def-ml1-15-bagging)は、再標本化した木を並行して学習し、予測を集約した。一方、同じ訓練点が何度も誤分類されるなら、次の木にはその点を重視させたい。[二値分類木](../ML1-14/index.md#def-ml1-14-tree-leaf)のような単純な予測器を順番に加えていく手続きを考える。

標本は $D=((x_1,y_1),\ldots,(x_n,y_n))$、$n\ge2$、特徴量 $x_i\in\mathbb R^d$、$d\ge1$ とする。本講の前半では二値ラベルを $y_i\in\{-1,+1\}$ と表す。0/1ラベルを用いた前講とは、$y=2y^{(0/1)}-1$ で対応する。弱学習器は各入力へ $\pm1$ を返す関数 $h$ で、例えば深さ1の決定木（決定株）である。「弱い」は個々の木を単純に制限する意味と、重みを用いて測った誤りが $1/2$ 未満という、後で定める数学的条件を区別する。

## 2. 加えた得点から分類する

木の多数決の票数だけでなく、木ごとに実数の係数を付けて合計する。合計した実数を**得点**と呼び、符号によって分類する。係数の大きい木は得点への寄与が大きい。

<a id="def-ml1-16-additive-score"></a>

<!-- formal-statement-start -->
> **定義（加法得点と符号分類器）**  
> $T\ge1$、$h_t:\mathbb R^d\to\{-1,+1\}$、$\alpha_t\in\mathbb R$ とする。加法得点と分類器をそれぞれ

$$
F_T(x)=\sum_{t=1}^T\alpha_t h_t(x),\qquad
H_T(x)=
\begin{cases}
+1 & F_T(x)>0,\\
-1 & F_T(x)\le0
\end{cases}
$$

> と定める。得点がちょうど0のときの出力は $-1$ と固定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-16-additive-score -->
**定義の確認**。同じ入力で $h_1=+1,h_2=-1,h_3=+1$、係数 $(\alpha_1,\alpha_2,\alpha_3)=(2,1,1/2)$ なら、$F_3=2-1+1/2=3/2$ なので $H_3=+1$。係数を $(1,1)$、予測を $(+1,-1)$ とすれば得点0となり、指定した規則では $-1$ を返す。得点 $3/2$ を確率 $1.5$ と読んではならない。
<!-- definition-example-end -->

正解ラベル $y_i$ を掛けた $y_iF_T(x_i)$ は、正のとき正しい側、負のとき誤った側にある。値が大きいほど、得点は正しい側へ離れている。この量を後で**マージン**として使う。

### 指数損失を選ぶ理由

0–1誤りの個数は得点を少し動かしても変わらないため、係数を最適化しにくい。そこで誤分類には1以上の罰、正しく大きな得点には小さい罰を与える指数関数を使う。

<a id="def-ml1-16-exp-loss"></a>

<!-- formal-statement-start -->
> **定義（経験指数損失）**  
> $n\ge2$ 個の $y_i\in\{-1,+1\}$、実数得点関数 $F:\mathbb R^d\to\mathbb R$ に対し、経験指数損失を

$$
L_{\exp}(F)=\frac1n\sum_{i=1}^n e^{-y_iF(x_i)}
$$

> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-16-exp-loss -->
**定義の確認**。$n=2$、ラベルが $(+1,-1)$、得点が $(2,1)$ なら、符号付き得点は $(2,-1)$、損失は $(e^{-2}+e)/2$。第2点は誤分類なので寄与 $e>1$。第1点は正しい側なので寄与 $e^{-2}<1$。得点0の点は、正誤いずれのラベルでも罰が1である。
<!-- definition-example-end -->

## 3. 次の木を加えるとき、何を最小化するか

すでに得点 $F_{t-1}$ があり、次の木 $h_t$ を選んで $F_t=F_{t-1}+\alpha h_t$ とする。各点の現在の損失 $e^{-y_iF_{t-1}(x_i)}$ を合計1に正規化すると、失敗している点の相対的重要度を数値で表せる。

<a id="def-ml1-16-weighted-error"></a>

<!-- formal-statement-start -->
> **定義（重み付き誤分類率）**  
> $w_i>0$、$\sum_{i=1}^nw_i=1$、$h(x_i)\in\{-1,+1\}$ のとき、

$$
\varepsilon(h;w)=\sum_{i=1}^n w_i\,\boldsymbol{1}_{\{h(x_i)\ne y_i\}}
$$

> を重み $w=(w_1,\ldots,w_n)$ に対する誤分類率とする。$0\le\varepsilon(h;w)\le1$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-16-weighted-error -->
**定義の確認**。$w=(1/6,1/2,1/6,1/6)$ で、2番目だけ誤る木は $\varepsilon=1/2$、3番目だけ誤る木は $\varepsilon=1/6$。いずれも4件中1件を誤るが、次に選ぶ際の重み付き誤りは異なる。非負性と重みの総和1も数値で確認できる。
<!-- definition-example-end -->

<a id="thm-ml1-16-optimal-stage"></a>

<!-- formal-statement-start -->
> **定理（指数損失の一段最小化）**  
> 固定した有限標本に対し、$F:\mathbb R^d\to\mathbb R$ は各訓練点で有限、$h(x_i)\in\{-1,+1\}$ とする。

$$
w_i=\frac{e^{-y_iF(x_i)}}{\sum_{j=1}^n e^{-y_jF(x_j)}},
\qquad \varepsilon=\varepsilon(h;w).
$$

> $0<\varepsilon<1$ のとき、$L_{\exp}(F+\alpha h)$ を $\alpha\in\mathbb R$ について最小にする係数は一意で、

$$
\alpha^*=\frac12\log\frac{1-\varepsilon}{\varepsilon}.
$$

> そのときの損失比は

$$
\frac{L_{\exp}(F+\alpha^*h)}{L_{\exp}(F)}
=2\sqrt{\varepsilon(1-\varepsilon)}.
$$

> 特に $0<\varepsilon<1/2$ なら $\alpha^*>0$、損失比は1未満となる。
<!-- formal-statement-end -->

### 証明の見取り図

正解した点では $yh=+1$、誤った点では $yh=-1$。指数関数を二群に分けると、一変数の厳密な凸関数になる。その微分を0にする係数と、最小値を求める。

<!-- proof-start -->
### 証明

$C=\sum_i e^{-y_iF(x_i)}>0$ と置く。各指数項を $Cw_i$ と書き、$yh$ の二つの値で和を分けると

$$
\begin{aligned}
L_{\exp}(F+\alpha h)
&=\frac1n\sum_i e^{-y_iF(x_i)}e^{-\alpha y_ih(x_i)}\\
&=\frac Cn\left((1-\varepsilon)e^{-\alpha}
+\varepsilon e^\alpha\right).
\end{aligned}
$$

括弧内を $g(\alpha)$ とする。微分すると

$$
g'(\alpha)=-(1-\varepsilon)e^{-\alpha}+\varepsilon e^\alpha,
\qquad
g''(\alpha)=(1-\varepsilon)e^{-\alpha}+\varepsilon e^\alpha>0.
$$

$g'=0$ は $\varepsilon e^\alpha=(1-\varepsilon)e^{-\alpha}$ と同値なので

$$
e^{2\alpha}=\frac{1-\varepsilon}{\varepsilon},
\qquad
\alpha^*=\frac12\log\frac{1-\varepsilon}{\varepsilon}.
$$

$g''>0$ から唯一の大域最小点である。$e^{\alpha^*}=\sqrt{(1-\varepsilon)/\varepsilon}$ を代入して

$$
g(\alpha^*)
=(1-\varepsilon)\sqrt{\frac{\varepsilon}{1-\varepsilon}}
+\varepsilon\sqrt{\frac{1-\varepsilon}{\varepsilon}}
=2\sqrt{\varepsilon(1-\varepsilon)}.
$$

$g(0)=1$、かつ $L_{\exp}(F)=C/n$ だから損失比もこれに等しい。$0<\varepsilon<1/2$ のとき $\log((1-\varepsilon)/\varepsilon)>0$、また

$$
4\varepsilon(1-\varepsilon)=1-(1-2\varepsilon)^2<1
$$

なので損失比は1未満である。$\square$
<!-- proof-end -->

**端点の注意**。$\varepsilon=0$ なら $g(\alpha)=e^{-\alpha}$ であり、有限の最小係数はなく $\alpha\to+\infty$ で損失が0へ近づく。$\varepsilon=1/2$ なら最適係数は0で、追加しても損失は減らない。$\varepsilon>1/2$ なら最適係数は負になり、予測符号を逆転した木の方を使うのと同じである。以下のAdaBoostでは $0<\varepsilon<1/2$ の木が選べる反復だけを進め、完全正解なら分類学習を停止する。$1/2$ 以上の候補しかない場合も停止し、正の係数を無理に与えない。

## 4. AdaBoost の逐次更新

各反復で、今の重み付き誤分類率が小さい木を選び、その木の係数を決め、次の重みを再計算する。これは前の木が失敗した点へ関心を移す操作であり、Baggingの独立な復元抽出とは異なる。

<a id="def-ml1-16-adaboost"></a>

<!-- formal-statement-start -->
> **定義（離散AdaBoostの更新）**  
> 有限二値標本 $D$ に対し $w_i^{(1)}=1/n$、$F_0(x)=0$ と置く。反復 $t$ で重み付き誤り $0<\varepsilon_t<1/2$ を持つ $h_t:\mathbb R^d\to\{-1,+1\}$ を選び、

$$
\alpha_t=\frac12\log\frac{1-\varepsilon_t}{\varepsilon_t},
\qquad
Z_t=\sum_{i=1}^nw_i^{(t)}e^{-\alpha_ty_ih_t(x_i)}
$$

> とし、得点と重みを

$$
F_t=F_{t-1}+\alpha_th_t,\qquad
w_i^{(t+1)}=
\frac{w_i^{(t)}e^{-\alpha_ty_ih_t(x_i)}}{Z_t}
$$

> で更新する。$\varepsilon_t=0$ の木が見つかればその木だけで訓練点をすべて正しく分類できるので停止し、誤りが $1/2$ 未満の候補がなければ更新せず停止する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-16-adaboost -->
**定義の確認**。4件を一様に重み付けし、1番の木が2番目だけ誤ると $\varepsilon_1=1/4$。$\alpha_1=(\log3)/2$、$Z_1=\sqrt3/2$。正解した3点には $\tfrac14e^{-\alpha_1}/Z_1=1/6$、誤った点には $\tfrac14e^{\alpha_1}/Z_1=1/2$ を与える。更新後は $(1/6,1/2,1/6,1/6)$ で正、総和は $3(1/6)+1/2=1$。次に3番目だけ誤る木なら、誤り集合は第3点だけなので

$
\varepsilon_2=w_3^{(2)}=\frac16,\qquad
\alpha_2=\frac{\log5}{2},\qquad
Z_2=\frac56e^{-\alpha_2}+\frac16e^{\alpha_2}
=\frac{\sqrt5}{3}.
$

正解点に掛ける倍率と誤り点に掛ける倍率はそれぞれ

$
\frac{e^{-\alpha_2}}{Z_2}=\frac35,\qquad
\frac{e^{\alpha_2}}{Z_2}=3.
$

よって更新後は

$
w^{(3)}=\left(\frac16\cdot\frac35,\;
\frac12\cdot\frac35,\;
\frac16\cdot3,\;
\frac16\cdot\frac35\right)
=\left(\frac1{10},\frac3{10},\frac12,\frac1{10}\right).
$

各重みは正で、和は $1/10+3/10+1/2+1/10=1$ である。
<!-- definition-example-end -->

重みの更新で誤り点が大きくなるのは、$e^{\alpha_t}$ と $e^{-\alpha_t}$ の比が $e^{2\alpha_t}=(1-\varepsilon_t)/\varepsilon_t>1$ だからである。全体は $Z_t$ で割るので、各反復の重みは必ず合計1に戻る。

<a id="prop-ml1-16-invariant"></a>

<!-- formal-statement-start -->
> **命題（重みの指数表示と正規化定数）**  
> [AdaBoost更新](#def-ml1-16-adaboost)が $T$ 回実行可能であるとする。各反復 $1\le t\le T$ で

$$
Z_t=2\sqrt{\varepsilon_t(1-\varepsilon_t)}
$$

> かつ $w_i^{(t+1)}>0$、$\sum_iw_i^{(t+1)}=1$ となる。また

$$
w_i^{(T+1)}
=\frac{e^{-y_iF_T(x_i)}}{n\prod_{t=1}^TZ_t},
\qquad
L_{\exp}(F_T)=\prod_{t=1}^TZ_t.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$Z_t$ は[一段最小化](#thm-ml1-16-optimal-stage)の二群の和そのもの。全更新式を掛けると指数の中で得点が足し合わされ、正規化定数が積として残る。

<!-- proof-start -->
### 証明

反復 $t$ の正解集合の重み合計は $1-\varepsilon_t$、誤り集合の合計は $\varepsilon_t$ なので

$$
Z_t=(1-\varepsilon_t)e^{-\alpha_t}+\varepsilon_te^{\alpha_t}
=2\sqrt{\varepsilon_t(1-\varepsilon_t)}>0.
$$

各指数は正で、正規化式から

$$
\sum_iw_i^{(t+1)}
=\frac1{Z_t}\sum_iw_i^{(t)}e^{-\alpha_ty_ih_t(x_i)}=1.
$$

初期条件 $w_i^{(1)}=1/n$ から $T$ 回の更新を逐次代入すると、

$$
\begin{aligned}
w_i^{(T+1)}
&=\frac1n\prod_{t=1}^T
\frac{e^{-\alpha_ty_ih_t(x_i)}}{Z_t}\\
&=\frac{\exp(-y_i\sum_{t=1}^T\alpha_th_t(x_i))}
{n\prod_{t=1}^TZ_t}
=\frac{e^{-y_iF_T(x_i)}}{n\prod_{t=1}^TZ_t}.
\end{aligned}
$$

左辺の重みを $i$ について合計すると1だから、

$$
1=\frac{\sum_i e^{-y_iF_T(x_i)}}{n\prod_tZ_t}
=\frac{L_{\exp}(F_T)}{\prod_tZ_t}.
$$

これを移項して損失の積表示を得る。$\square$
<!-- proof-end -->

## 5. 訓練誤りとマージンをどう評価するか

ここからは有限の**訓練標本に対する**保証を求める。未知の新しいデータに対する汎化誤差が同じように下がるとは主張しない。

<a id="thm-ml1-16-training-bound"></a>

<!-- formal-statement-start -->
> **定理（AdaBoostの経験訓練誤差上界）**  
> [AdaBoost更新](#def-ml1-16-adaboost)が $T$ 回実行され、各回で $0<\varepsilon_t<1/2$ とする。訓練誤分類率を

$$
\widehat R_T=\frac1n\sum_{i=1}^n
\boldsymbol{1}_{\{H_T(x_i)\ne y_i\}}
$$

> とすると、

$$
\widehat R_T
\le \prod_{t=1}^T2\sqrt{\varepsilon_t(1-\varepsilon_t)}.
$$

> さらに各反復で $\varepsilon_t\le 1/2-\gamma$ を満たす一定の $0<\gamma<1/2$ が存在すれば、

$$
\widehat R_T\le (1-4\gamma^2)^{T/2}
\le e^{-2T\gamma^2}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

間違った点では $y_iF_T(x_i)\le0$。その点の指数損失は1以上なので、0–1誤りを指数損失で上から押さえられる。後半は各回の重み付き誤りが半分から少なくとも $\gamma$ 離れている条件を使う。

<!-- proof-start -->
### 証明

符号分類器の同点規則を含め、誤分類点では $y_iF_T(x_i)\le0$ が成立する（$y_i=-1,F_T=0$ では正解だが、不等式は誤分類点に対する必要条件として正しい）。従って各点で

$$
\boldsymbol{1}_{\{H_T(x_i)\ne y_i\}}
\le\boldsymbol{1}_{\{y_iF_T(x_i)\le0\}}
\le e^{-y_iF_T(x_i)}.
$$

両辺を $n$ で割って和を取り、[指数損失の積表示](#prop-ml1-16-invariant)を適用すれば

$$
\widehat R_T\le L_{\exp}(F_T)=\prod_{t=1}^TZ_t.
$$

$\varepsilon_t\le1/2-\gamma$ かつ $0<\varepsilon_t<1/2$ なら

$$
Z_t^2
=4\varepsilon_t(1-\varepsilon_t)
=1-(1-2\varepsilon_t)^2
\le1-4\gamma^2.
$$

よって積を取り $\prod_tZ_t\le(1-4\gamma^2)^{T/2}$。最後に $u=4\gamma^2\in(0,1)$ に対する $\log(1-u)\le-u$ を使うと

$$
(1-4\gamma^2)^{T/2}
=\exp\!\left(\frac T2\log(1-4\gamma^2)\right)
\le\exp(-2T\gamma^2).
$$

$\log(1-u)\le-u$ は $\phi(u)=\log(1-u)+u$ に対し $\phi(0)=0$、$\phi'(u)=-u/(1-u)\le0$ から直接確認できる。$\square$
<!-- proof-end -->

訓練誤りの上界は各 $Z_t$ が1より小さい限り減少するが、**実際の0–1訓練誤りの列が反復ごとに単調減少するとは限らない**。増減する段階を含んでも最後の指数損失による上界は成立する。

<a id="def-ml1-16-margin"></a>

<!-- formal-statement-start -->
> **定義（訓練マージン）**  
> 正の係数 $\alpha_1,\ldots,\alpha_T$ を持つ加法得点に対し $A_T=\sum_t\alpha_t>0$ と置き、観測 $i$ の正規化マージンを

$$
m_i=\frac{y_iF_T(x_i)}{A_T}
$$

> と定める。各 $h_t(x_i)\in\{-1,+1\}$ なので $-1\le m_i\le1$ となる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-16-margin -->
**定義の確認**。2本の係数 $(\log3/2,\log5/2)$ について、両方正解なら $m_i=1$。1本目が誤り、2本目が正解なら $m_i=(\log5-\log3)/(\log5+\log3)$ で0より大きく1より小さい。反対ならその負となる。分母 $A_T$ が正であることと、分子が $\pm\alpha_t$ の和であることから範囲も確かめられる。
<!-- definition-example-end -->

<a id="prop-ml1-16-margin-bound"></a>

<!-- formal-statement-start -->
> **命題（低マージン点の割合）**  
> [AdaBoost更新](#def-ml1-16-adaboost)が $T$ 回実行され、$A_T>0$ とする。任意の実数 $\theta$ について

$$
\frac1n\bigl|\{i:m_i\le\theta\}\bigr|
\le e^{\theta A_T}\prod_{t=1}^TZ_t.
$$
<!-- formal-statement-end -->

### 証明の見取り図

マージンが $\theta$ 以下なら $-y_iF_T(x_i)\ge-\theta A_T$ であり、指数項は少なくとも $e^{-\theta A_T}$ になる。全点の指数項の和から該当点の件数を上から押さえる。

<!-- proof-start -->
### 証明

$m_i\le\theta$ なら $y_iF_T(x_i)=A_Tm_i\le A_T\theta$。指数関数が単調増加なので

$$
\boldsymbol{1}_{\{m_i\le\theta\}}
\le e^{\theta A_T}e^{-y_iF_T(x_i)}.
$$

$m_i>\theta$ の点では左辺は0なのでこの不等式は全点で成り立つ。$i$ について平均し、[指数損失の積表示](#prop-ml1-16-invariant)を代入すれば結論を得る。$\square$
<!-- proof-end -->

$\theta=0$ では0以下のマージン点の割合を上界にし、訓練誤分類率もそれ以下である。$\theta>0$ では**正解はしているが境界に近い点**も数える。この命題は有限標本だけの主張で、未知分布に対するマージン汎化界を与えたわけではない。

## 6. 具体的な2反復を手で追う

$y=(+1,+1,-1,-1)$、最初の木の訓練予測を $h_1=(+1,-1,-1,-1)$、次の木を $h_2=(+1,+1,+1,-1)$ とする。1本目は2番目だけ、2本目は3番目だけを誤る。先に計算した通り

$$
\varepsilon_1=\frac14,\quad
\alpha_1=\frac{\log3}{2},\quad Z_1=\frac{\sqrt3}{2},
\quad w^{(2)}=\left(\frac16,\frac12,\frac16,\frac16\right).
$$

2本目については $\varepsilon_2=w_3^{(2)}=1/6$ であり、

$$
\alpha_2=\frac{\log5}{2},\quad
Z_2=\frac{\sqrt5}{3},\quad
w^{(3)}=\left(\frac1{10},\frac3{10},\frac12,\frac1{10}\right).
$$

積表示による指数損失は $Z_1Z_2=\sqrt{15}/6\simeq0.6455$。加法得点は

$$
F_2(x_i)=
\left(\frac{\log15}{2},
\frac{\log(5/3)}2,
\frac{\log(5/3)}2,
-\frac{\log15}{2}\right)_i.
$$

第3点は真値が $-1$ なのに得点が正なので誤りである。4点の訓練誤りは $1/4$、確かに $1/4\le\sqrt{15}/6$。第2点は1本目で誤っても、2本目の係数の方が大きいため、合計では正しくなる。

## 7. 加法モデルは回帰でも使える

前半では $\pm1$ の分類器を加えた。回帰で二乗損失を最小にしたい場合には、現在の残差を次の単純な回帰器で近似して加える。これはAdaBoostと同一の重み更新ではなく、**損失に応じた別の加法模型**である。

<a id="def-ml1-16-residual-stage"></a>

<!-- formal-statement-start -->
> **定義（二乗損失に対する残差加法更新）**  
> 実数ラベル $y_i\in\mathbb R$、各点で有限な得点 $F$、非零の回帰器 $h$（$\sum_i h(x_i)^2>0$）について、

$$
R(F)=\frac1{2n}\sum_{i=1}^n(y_i-F(x_i))^2,\qquad
r_i=y_i-F(x_i)
$$

> をそれぞれ経験二乗損失と残差とする。$0<\nu\le1$ を縮小係数とし、$\gamma$ を $R(F+\gamma h)$ が最小となる実数として、$F_{\rm next}=F+\nu\gamma h$ と更新する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-16-residual-stage -->
**定義の確認**。$y=(1,3)$、$F=0$、$h(x_1)=h(x_2)=1$ とする。回帰器は二点上で定数1を返し、$\sum_i h(x_i)^2=2>0$ なので定義の非零条件を満たす。残差は $r=(1,3)$ であり、候補の係数 $\gamma$ に対する損失を定義どおり展開すると

$
\begin{aligned}
R(F+\gamma h)
&=\frac{(1-\gamma)^2+(3-\gamma)^2}{4}\\
&=\frac{2\gamma^2-8\gamma+10}{4}
=\frac{(\gamma-2)^2+1}{2}.
\end{aligned}
$

平方項が0になるのは $\gamma=2$ のときだけなので、これが一意の最良の一定値である。$\nu=1/2$ とすれば更新後の得点は $(1,1)$、新残差は $(0,2)$。更新前後の損失は

$
R(F)=\frac{1^2+3^2}{4}=\frac52,\qquad
R(F_{\rm next})=\frac{0^2+2^2}{4}=1.
$

従って損失は $3/2$ だけ減少する。ここでは後続の減少命題を仮定せず、定義から直接検算した。
<!-- definition-example-end -->

<a id="prop-ml1-16-residual-decrease"></a>

<!-- formal-statement-start -->
> **命題（残差方向への一段更新の損失減少）**  
> [残差加法更新](#def-ml1-16-residual-stage)で $S=\sum_i h(x_i)^2>0$、$C=\sum_i r_ih(x_i)$ とする。最適係数と縮小更新による損失の減少量は

$$
\gamma^*=\frac{C}{S},\qquad
R(F)-R(F+\nu\gamma^*h)
=\frac{(2\nu-\nu^2)C^2}{2nS}\ge0
$$

> である。$0<\nu\le1$ なら、$C\ne0$ のとき狭義に減少する。
<!-- formal-statement-end -->

### 証明の見取り図

各訓練点で新しい残差は $r_i-\gamma h(x_i)$ になる。その二乗を展開すると $\gamma$ に関する二次関数になるので、平方完成で係数と減少量を求める。

<!-- proof-start -->
### 証明

二乗を一項ずつ展開し、$C,S$ の定義を代入すると

$$
\begin{aligned}
R(F+\gamma h)
&=\frac1{2n}\sum_i(r_i-\gamma h(x_i))^2\\
&=R(F)-\frac{\gamma}{n}\sum_ir_ih(x_i)
+\frac{\gamma^2}{2n}\sum_ih(x_i)^2\\
&=R(F)-\frac{C^2}{2nS}
+\frac S{2n}\left(\gamma-\frac CS\right)^2.
\end{aligned}
$$

$S>0$ なので最後の平方項を0にする $\gamma^*=C/S$ が唯一の最小係数である。縮小係数を使うと

$$
\begin{aligned}
R(F+\nu\gamma^*h)
&=R(F)-\frac{\nu\gamma^*C}{n}
+\frac{\nu^2(\gamma^*)^2S}{2n}\\
&=R(F)-\frac{\nu C^2}{nS}
+\frac{\nu^2C^2}{2nS}\\
&=R(F)-\frac{(2\nu-\nu^2)C^2}{2nS}.
\end{aligned}
$$

$0<\nu\le1$ なら $2\nu-\nu^2>0$。従って $C\ne0$ の場合に狭義に減る。$\square$
<!-- proof-end -->

実務上は候補の回帰木 $h$ 自体も残差から学習するが、**木を最適に探索できるという主張ではない**。命題は、選択済みの非零 $h$ に対する一段の正確な最小化の性質である。前半のAdaBoostが指数損失を、こちらが二乗損失を使うことが違いを生む。

## 8. 本当に弱学習器を選ぶ計算実験

次のラボは固定した小さな二値標本から**重み付き誤りを全候補で計算**する。閾値と左右の符号を候補とする決定株を逐次選び、予測、重み、正規化定数、経験指数損失、正規化マージンを再計算する。[一段最小化](#thm-ml1-16-optimal-stage)と[積表示](#prop-ml1-16-invariant)を数値で照合する。

乱数種で点の順序を変え、反復上限・特徴量生成ノイズを変えられる。条件 $0<\varepsilon<1/2$ が失われれば更新を止める。観測される訓練誤りを汎化誤りとは読まない。

~~~python-lab
# lab-id: ml1-16-boosting
# lab-title: 決定株を学習して指数損失とマージンを追う
# lab-mode: demo
# timeout-ms: 10000
import math, random
random_state, rounds, noise = 16020, 12, 0.25
rng = random.Random(random_state)
# 和と積を含む曲がった境界。ノイズと乱数種を変えると候補と重みが変わる。
xy = [(a,b) for a in (-2,-1,1,2) for b in (-2,-1,1,2)]
rng.shuffle(xy)
xs = [(a+noise*rng.uniform(-1,1), b+noise*rng.uniform(-1,1))
      for a,b in xy]
ys = [1 if a+b+0.3*a*b>0 else -1 for a,b in xy]
n = len(ys)
def stump_candidates(xs):
    for j in (0,1):
        distinct = sorted({x[j] for x in xs})
        cuts = [distinct[0]-1] + [(a+b)/2 for a,b in zip(distinct,distinct[1:])] + [distinct[-1]+1]
        for cut in cuts:
            for polarity in (-1,1):
                yield (j,cut,polarity), [polarity if x[j]>cut else -polarity for x in xs]
candidates = list(stump_candidates(xs))
weights = [1/n]*n
scores = [0.0]*n
history = []
for t in range(rounds):
    rule, preds = min(candidates,
                      key=lambda cp: sum(weights[i] for i in range(n) if cp[1][i]!=ys[i]))
    eps = sum(weights[i] for i in range(n) if preds[i]!=ys[i])
    if eps<=1e-14:
        print("perfect weak classifier; stop at",t)
        break
    if eps>=0.5-1e-14:
        print("no weak advantage; stop at",t)
        break
    alpha = 0.5*math.log((1-eps)/eps)
    z = sum(weights[i]*math.exp(-alpha*ys[i]*preds[i]) for i in range(n))
    weights = [weights[i]*math.exp(-alpha*ys[i]*preds[i])/z for i in range(n)]
    scores = [scores[i]+alpha*preds[i] for i in range(n)]
    exponential = sum(math.exp(-ys[i]*scores[i]) for i in range(n))/n
    margin = [ys[i]*scores[i]/sum(entry["alpha"] for entry in history+[{"alpha":alpha}]) for i in range(n)]
    wrong = sum(1 for i in range(n) if (1 if scores[i]>0 else -1)!=ys[i])/n
    history.append({"eps":eps,"alpha":alpha,"z":z,"loss":exponential,
                    "error":wrong,"margin":margin[:],"weights":weights[:]})
    print(t+1, "eps",round(eps,4),"Z",round(z,4),
          "loss",round(exponential,4),"error",round(wrong,4),
          "margin<=0",sum(m<=0 for m in margin),"/",n)
print("completed rounds:",len(history))
if history:
    print("last weights:",[round(w,4) for w in weights])
    print("last margins:",[round(m,3) for m in history[-1]["margin"]])
~~~

~~~python-test
assert n==16 and len(candidates)>0
assert all(w>0 for w in weights)
assert abs(sum(weights)-1)<1e-10
assert all(-1-1e-9<=m<=1+1e-9 for row in history for m in row["margin"])
if history:
    running = 1.
    for row in history:
        running *= row["z"]
        assert 0<row["eps"]<0.5 and row["alpha"]>0
        assert abs(running-row["loss"])<1e-9
        assert row["error"]<=row["loss"]+1e-10
~~~

上の点群は**二つの特徴の和と積で決まるラベル**を持つので、一回の軸平行な決定株では表現しにくい。一回の木と複数の木の役割を分けて観察できる。反復数を増やせば訓練指数損失は更新可能な回に限り必ず減るが、検証用の独立標本なしに汎化の改善は結論できない。

### 二乗損失での加法更新を再計算する

こちらは二乗損失と残差で動く別模型である。[残差方向の減少公式](#prop-ml1-16-residual-decrease)を、縮小係数を変更して確認できる。

~~~python-lab
# lab-id: ml1-16-residual-fit
# lab-title: 残差に合わせた定数回帰器の最適係数
# lab-mode: demo
# timeout-ms: 10000
y = [1.,3.,0.,4.]
f = [0.]*len(y)
h = [1.]*len(y)
nu = 0.5
r = [yi-fi for yi,fi in zip(y,f)]
c = sum(ri*hi for ri,hi in zip(r,h))
s = sum(hi**2 for hi in h)
gamma = c/s
old = sum(ri**2 for ri in r)/(2*len(y))
new = sum((ri-nu*gamma*hi)**2 for ri,hi in zip(r,h))/(2*len(y))
predicted_drop = (2*nu-nu**2)*c**2/(2*len(y)*s)
print("gamma:",gamma,"old:",old,"new:",new,"drop:",old-new)
~~~

~~~python-test
assert s>0 and 0<nu<=1
assert abs(old-new-predicted_drop)<1e-12
assert new<=old+1e-12
~~~

## 9. 演習

### ML1-16-A01 加法得点と同点
- Level: A

ラベル $y=-1$ の点で、三つの弱学習器が $(+1,-1,-1)$、係数が $(1,2,1)$ を返した。得点、予測ラベル、符号付き得点を求めよ。係数を $(1,1,0)$ にした場合の同点規則も確認せよ。

<!-- solution-start -->
#### 詳細解答

[加法得点の定義](#def-ml1-16-additive-score)より $F=1-2-1=-2$、予測は $-1$ で正解。符号付き得点は $yF=(-1)(-2)=2$。後半は $F=1-1+0=0$、同点は $-1$ なので正解するが、符号付き得点は0である。マージン0と厳密に正側の得点を区別する。
<!-- solution-end -->

### ML1-16-A02 指数損失と誤り
- Level: A

二つの点で $(y_1,y_2)=(+1,-1)$、$(F(x_1),F(x_2))=(\log2,\log2)$ とする。経験指数損失と経験0–1誤りを求め、指数損失が誤りを上から押さえることを確認せよ。

<!-- solution-start -->
#### 詳細解答

符号付き得点は $(\log2,-\log2)$。従って指数項は $(1/2,2)$、[指数損失](#def-ml1-16-exp-loss)は $(1/2+2)/2=5/4$。得点は両方正なので第1点だけ正解し、0–1誤りは $1/2$。実際 $1/2\le5/4$。指数損失は1を超えても定義上問題ない。
<!-- solution-end -->

### ML1-16-A03 重み付き誤り
- Level: A

4点の重みが $(1/10,2/10,3/10,4/10)$ とする。第1・第3点だけを誤る木の重み付き誤りと、AdaBoostの係数を計算せよ。

<!-- solution-start -->
#### 詳細解答

[重み付き誤り](#def-ml1-16-weighted-error)は $1/10+3/10=2/5$、よって $0<2/5<1/2$。係数は[一段最小化](#thm-ml1-16-optimal-stage)に代入して $\alpha=(1/2)\log((3/5)/(2/5))=(1/2)\log(3/2)>0$。
<!-- solution-end -->

### ML1-16-A04 正規化定数と停止
- Level: A

ある反復の誤りが $\varepsilon=1/4$ のとき $Z$ と更新後の総重みを求めよ。$\varepsilon=1/2$ および $\varepsilon=0$ の場合に有限の正係数を採用できるか述べよ。

<!-- solution-start -->
#### 詳細解答

[重みの指数表示と正規化定数](#prop-ml1-16-invariant)から $Z=2\sqrt{(1/4)(3/4)}=\sqrt3/2$。定義どおり $Z$ で割るので総重みは $(1/Z)\sum_iw_i e^{-\alpha y_ih(x_i)}=Z/Z=1$。$\varepsilon=1/2$ では最適係数は0で損失を減らせない。$\varepsilon=0$ では最小値を達成する有限係数はなく、完全分類する木を得たので学習を停止する。$\log((1-\varepsilon)/\varepsilon)$ に0を代入してはならない。
<!-- solution-end -->

### ML1-16-B01 一段係数を微分で導く
- Level: B

$0<\varepsilon<1$ のとき $g(a)=(1-\varepsilon)e^{-a}+\varepsilon e^a$ の唯一の最小点と最小値を導け。$\varepsilon=3/4$ のときの係数の符号を説明せよ。

<!-- solution-start -->
#### 詳細解答

導関数を計算すると

$
g'(a)=-(1-\varepsilon)e^{-a}+\varepsilon e^a,\qquad
g''(a)=(1-\varepsilon)e^{-a}+\varepsilon e^a>0.
$

停留条件 $g'(a)=0$ を解くと

$
\varepsilon e^a=(1-\varepsilon)e^{-a}
\iff e^{2a}=\frac{1-\varepsilon}{\varepsilon}
\iff a^*=\frac12\log\frac{1-\varepsilon}{\varepsilon}.
$

厳密凸性により、これが唯一の大域最小点である。$e^{a^*}=\sqrt{(1-\varepsilon)/\varepsilon}$ を代入すれば

$
g(a^*)=(1-\varepsilon)\sqrt{\frac{\varepsilon}{1-\varepsilon}}
+\varepsilon\sqrt{\frac{1-\varepsilon}{\varepsilon}}
=2\sqrt{\varepsilon(1-\varepsilon)}.
$

$\varepsilon=3/4$ では $a^*=\tfrac12\log(1/3)<0$。符号を反転した木なら重み付き誤りは $1/4$ となり、正の係数を使える。
<!-- solution-end -->

### ML1-16-B02 2反復の重みと訓練誤り
- Level: B

4点の真値を $(+1,+1,-1,-1)$、1本目の予測を $(+1,-1,-1,-1)$、2本目を $(+1,+1,+1,-1)$ とする。初期重みを一様とし、2反復の係数、重み、$Z$ の積、0–1訓練誤りを求めよ。

<!-- solution-start -->
#### 詳細解答

[AdaBoost更新](#def-ml1-16-adaboost)を順に用いる。1本目は第2点だけを誤るので

$
\varepsilon_1=\frac14,\quad
\alpha_1=\frac{\log3}{2},\quad
Z_1=\frac{\sqrt3}{2},\quad
w^{(2)}=\left(\frac16,\frac12,\frac16,\frac16\right).
$

2本目は第3点だけを誤り、正解点の重みの倍率は $3/5$、誤り点の倍率は3となる。従って

$
\begin{aligned}
\varepsilon_2&=\frac16,&
\alpha_2&=\frac{\log5}{2},&
Z_2&=\frac{\sqrt5}{3},\\
w^{(3)}&=\left(\frac1{10},\frac3{10},\frac12,\frac1{10}\right),&
Z_1Z_2&=\frac{\sqrt{15}}6.
\end{aligned}
$

4点での加法得点を各木の予測から足し合わせると

$
\begin{aligned}
F_2(x_1)&=\alpha_1+\alpha_2=\frac{\log15}{2},\\
F_2(x_2)&=-\alpha_1+\alpha_2=\frac{\log(5/3)}2,\\
F_2(x_3)&=-\alpha_1+\alpha_2=\frac{\log(5/3)}2,\\
F_2(x_4)&=-\alpha_1-\alpha_2=-\frac{\log15}{2}.
\end{aligned}
$

第3点は真値が $-1$ なのに得点が正なので誤分類され、残り3点は正解する。ゆえに経験訓練誤りは $1/4$ であり、[訓練誤り上界](#thm-ml1-16-training-bound)の $1/4\le\sqrt{15}/6$ と整合する。
<!-- solution-end -->

### ML1-16-B03 弱い優位性から指数上界へ
- Level: B

毎回 $0<\varepsilon_t\le 2/5$ を満たす弱学習器を10回選べたとする。訓練誤りの上界を積の形と指数の形で評価し、これがテスト誤りを保証しない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

$2/5=1/2-1/10$ なので $\gamma=1/10$ を[訓練誤り上界](#thm-ml1-16-training-bound)に使う。各 $Z_t^2\le4(2/5)(3/5)=24/25$ なので $\widehat R_{10}\le(24/25)^5$。指数関数を用いた上界では $\widehat R_{10}\le e^{-2\cdot10(1/10)^2}=e^{-1/5}$。いずれも数値として正である。これらは同じ訓練標本上の重み付き誤りを使って導いた式であり、独立な未知標本の分布についての追加条件を仮定しておらず、未知データへの誤差評価を導いていない。テスト誤りは[独立テスト](../ML1-12/index.md#thm-ml1-12-independent-holdout)で別に測る。
<!-- solution-end -->

### ML1-16-B04 回帰の残差更新
- Level: B

$y=(1,3)$、初期得点0、候補回帰器の値は $h=(1,1)$、縮小係数は $\nu=1/2$ とする。最適 $\gamma$、更新前後の損失、および一般の損失減少式への代入を示せ。

<!-- solution-start -->
#### 詳細解答

$n=2$、残差は $r=(1,3)$ である。回帰器が両点で1を返すことから

$
C=1\cdot1+3\cdot1=4,\qquad
S=1^2+1^2=2>0,\qquad
\gamma^*=\frac CS=2.
$

最後の等式は[残差方向の最適係数](#prop-ml1-16-residual-decrease)による。縮小更新後の得点は $(\nu\gamma^*,\nu\gamma^*)=(1,1)$ なので、二つの損失を直接計算すると

$
R(F)=\frac{1^2+3^2}{2\cdot2}=\frac52,\qquad
R(F_{\rm next})=\frac{(1-1)^2+(3-1)^2}{4}=1.
$

一方、減少公式へ代入すると

$
\frac{(2\nu-\nu^2)C^2}{2nS}
=\frac{(1-1/4)\cdot16}{2\cdot2\cdot2}
=\frac32=\frac52-1.
$

よって直接計算と一般公式が一致する。
<!-- solution-end -->

### ML1-16-C01 指数損失・マージン・二乗損失を統合する
- Level: C

4件の重みを $(1/6,1/2,1/6,1/6)$ とする。次の問いに答えよ。

1. 弱分類器が第3点だけを誤るとき、この段の係数・正規化定数・次の重みを求めよ。
2. ある $T$ 反復後に $\prod_tZ_t=0.18$、$\sum_t\alpha_t=2$ を得たとする。正規化マージンが $0.1$ 以下の訓練点の割合の上界を式で求めよ。
3. 回帰で $r=(1,2,-1)$、$h=(1,1,0)$、$\nu=1/2$ としたときの最適係数と損失減少量を求め、問1と問3の更新目的の違いを説明せよ。

<!-- solution-start -->
#### 詳細解答

**(1)** 第3点だけを誤るので $\varepsilon=1/6$ である。[指数損失の一段最小化](#thm-ml1-16-optimal-stage)の係数と正規化定数は

$
\alpha=\frac12\log\frac{5/6}{1/6}=\frac12\log5,\qquad
Z=2\sqrt{\frac16\cdot\frac56}=\frac{\sqrt5}{3}.
$

正解点と誤り点の更新倍率はそれぞれ

$
\frac{e^{-\alpha}}Z=\frac1{2(1-\varepsilon)}=\frac35,\qquad
\frac{e^\alpha}Z=\frac1{2\varepsilon}=3.
$

元の各重みに掛けて

$
w_{\rm next}
=\left(\frac16\cdot\frac35,\frac12\cdot\frac35,
\frac16\cdot3,\frac16\cdot\frac35\right)
=\left(\frac1{10},\frac3{10},\frac12,\frac1{10}\right).
$

合計は $1/10+3/10+1/2+1/10=1$ となる。

**(2)** [低マージン割合の命題](#prop-ml1-16-margin-bound)に $\theta=0.1,A_T=2$ を代入し、割合は $e^{0.1\cdot2}\prod_tZ_t=0.18e^{0.2}$ 以下（約0.220）である。母集団確率への上界ではない。

**(3)** $n=3$ で残差 $r=(1,2,-1)$、回帰器の値 $h=(1,1,0)$ を使う。係数を計算すると

$
C=1\cdot1+2\cdot1+(-1)\cdot0=3,\qquad
S=1^2+1^2+0^2=2>0,\qquad
\gamma^*=\frac CS=\frac32.
$

[残差方向の減少公式](#prop-ml1-16-residual-decrease)に $\nu=1/2$ を代入すると

$
R(F)-R(F+\nu\gamma^*h)
=\frac{(2\cdot\frac12-\frac14)\cdot3^2}{2\cdot3\cdot2}
=\frac34\cdot\frac34=\frac9{16}.
$

AdaBoostは符号分類器の指数損失と重み付き誤りに基づいて係数を決める。これに対し、残差加法更新は数値残差の二乗を最小化する係数を求め、さらに縮小する。従って二つの係数公式を交換してはならない。
<!-- solution-end -->

## まとめ

Boostingは複数の弱学習器を順に加える。AdaBoostでは誤分類した訓練点を重くし、係数を $\tfrac12\log((1-\varepsilon)/\varepsilon)$ とする。この係数は[指数損失の一段最小化](#thm-ml1-16-optimal-stage)から導かれ、[正規化定数の積表示](#prop-ml1-16-invariant)は指数損失そのものとなる。訓練誤りや低マージン点の割合はそこから上から評価できるが、汎化の保証とは区別する。二乗損失の場合は残差方向の加法更新が自然であり、損失に応じて加える対象と係数の決め方が変わる。