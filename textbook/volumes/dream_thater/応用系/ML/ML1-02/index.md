# ML1-02 Bayes決定則と損失関数

<!-- definition-example-audit: strict -->

## 1. 「もっとも多い答え」が最適とは限らない

[ML1-01の母集団リスク](../ML1-01/index.md#def-ml1-01-risks)では、予測器の誤りを真の分布で平均した。しかし、実際にどの予測を返すべきかはまだ決めていない。入力が分かれば目的変数の分布も変わり、さらに誤りの種類によって費用が違えば、単に正解率を最大化する規則は最善ではない。

例えば故障する確率が30%の機械について「故障する」と予告すれば、何も起きない場合に余分な検査費がかかる。逆に「故障しない」と予告して実際に故障すれば、停止費用がかかる。どちらの誤りが高価かによって、同じ30%を前にした判断は変わる。この章では有限個の入力・ラベル・行動から出発し、費用を明示して最小の母集団リスクを達成する決定則を作る。

入力の有限非空集合を $\mathcal X$、真のラベルの有限非空集合を $\mathcal Y$、取れる行動の有限非空集合を $\mathcal A$ とする。分類では通常 $\mathcal A=\mathcal Y$ だが、「検査を追加する」などの行動も許せるので区別する。$(X,Y)$ の同時分布を $p_{xy}=P(X=x,Y=y)$、入力の周辺確率を $p_x=P(X=x)=\sum_y p_{xy}$ と書く。$p_x=0$ の入力は分布上現れない。

## 2. 入力を観測したあとの確率と費用

全体の表 $p_{xy}$ をそのまま比較するより、入力 $x$ が来たときに各ラベルがどれくらいあり得るかを見たい。[確率分布](../../../解析系/F0/F0-00P1/index.md#def-f0-00p1-law)の有限集合版で、$p_x>0$ なら条件付き確率は同時確率を行和で割って求める。

<a id="def-ml1-02-conditional-label"></a>

<!-- formal-statement-start -->
> **定義（条件付きラベル確率）**  
> 有限集合 $\mathcal X,\mathcal Y$ 上の同時分布 $P$ について、$p_x=P(X=x)>0$ を満たす $x\in\mathcal X$ と $y\in\mathcal Y$ に対し、条件付きラベル確率を

$$
\eta_y(x)=P(Y=y\mid X=x)=\frac{P(X=x,Y=y)}{P(X=x)}
$$

> と定める。$p_x=0$ の点では $\eta_y(x)$ をこの式によっては定めない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-02-conditional-label -->
**定義の確認**。二つの入力 $a,b$ と二つのラベル $0,1$ の同時確率を次のように与える。

| 入力 | $Y=0$ | $Y=1$ | 行和 |
|---|---:|---:|---:|
| $X=a$ | $0.36$ | $0.14$ | $0.50$ |
| $X=b$ | $0.16$ | $0.34$ | $0.50$ |
| 合計 | $0.52$ | $0.48$ | $1$ |

全セルが非負で和は1である。$p_a=p_b=0.5>0$ なので割り算でき、

$$
\begin{aligned}
\eta_1(a)&=0.14/0.50=0.28,&\eta_0(a)&=0.36/0.50=0.72,\\
\eta_1(b)&=0.34/0.50=0.68,&\eta_0(b)&=0.16/0.50=0.32.
\end{aligned}
$$

各入力で $0\le\eta_y(x)\le1$、$\eta_0(x)+\eta_1(x)=1$ を確認した。これは二つの条件付き分布であって、入力によって値が異なり得る。
<!-- definition-example-end -->

次に、予測値を出す代わりに一般の行動 $a\in\mathcal A$ を選び、真のラベル $y$ に応じた損失 $\ell(a,y)$ を支払う。$\ell:\mathcal A\times\mathcal Y\to[0,\infty)$ は有限値とする。[前章の損失関数](../ML1-01/index.md#def-ml1-01-loss)を、行動集合へ拡張しただけである。入力が固定されたとき、期待される損失は条件付き確率による有限和になる。

<a id="def-ml1-02-conditional-risk"></a>

<!-- formal-statement-start -->
> **定義（条件付きリスク）**  
> 有限非空のラベル集合 $\mathcal Y$、行動集合 $\mathcal A$ と有限値非負損失 $\ell:\mathcal A\times\mathcal Y\to[0,\infty)$ を取る。$P(X=x)=p_x>0$ である入力 $x$ と、行動 $a\in\mathcal A$ に対し、条件付きリスクを

$$
r_\ell(a\mid x)=\sum_{y\in\mathcal Y}\eta_y(x)\ell(a,y)
$$

> と定める。ただし $\eta_y(x)=P(X=x,Y=y)/p_x$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-02-conditional-risk -->
**定義の確認**。前表の $x=a$ で、正しく予測すれば損失0、誤れば損失1とする。[0–1損失](../ML1-01/index.md#def-ml1-01-loss)より

$$
\begin{aligned}
r_\ell(0\mid a)&=0.72\cdot0+0.28\cdot1=0.28,\\
r_\ell(1\mid a)&=0.72\cdot1+0.28\cdot0=0.72.
\end{aligned}
$$

重みの和は1であり、どちらも非負有限値である。入力 $a$ では0を返す方が条件付きリスクが小さい。
<!-- definition-example-end -->

## 3. 入力ごとの最適決定が全体でも最適になる

[前章の予測器](../ML1-01/index.md#def-ml1-01-predictor)と同じように、ここでは行動を返す写像 $g:\mathcal X\to\mathcal A$ を**決定則**と呼ぶ。有限個の各入力でどの行動を返すかを指定すれば完成する。決定則の母集団リスクは $R_\ell(g)=\sum_{x,y}p_{xy}\ell(g(x),y)$ と書く。

各入力 $x$ では行動候補が有限個なので、条件付きリスクが最小となる行動が少なくとも一つある。ただし同点なら複数ある。$p_x=0$ の点でどう決めても、実際の損失平均には影響しない。

<a id="def-ml1-02-bayes-rule"></a>

<!-- formal-statement-start -->
> **定義（Bayes決定則とBayesリスク）**  
> 有限非空の集合 $\mathcal X,\mathcal Y,\mathcal A$、同時分布 $P$、有限値非負損失 $\ell:\mathcal A\times\mathcal Y\to[0,\infty)$ を固定する。決定則 $g^*:\mathcal X\to\mathcal A$ が、すべての $x$ で $p_x=P(X=x)>0$ なら

$$
g^*(x)\in\underset{a\in\mathcal A}{\operatorname{argmin}}\ r_\ell(a\mid x)
$$

> を満たすとき、$g^*$ をBayes決定則と呼ぶ。達成する最小母集団リスクをBayesリスク $R_\ell^*=\min_{g:\mathcal X\to\mathcal A}R_\ell(g)$ と呼ぶ。$\operatorname{argmin}$ は最小値を達成する行動全体の集合である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-02-bayes-rule -->
**定義の確認**。前表の二値0–1損失では、$a$ での二行動のリスクは $(0.28,0.72)$。$b$ では、$r_\ell(0\mid b)=0.68$、$r_\ell(1\mid b)=0.32$。したがって $g^*(a)=0,g^*(b)=1$ は両入力で最小行動を返す。全体の誤りは $(a,1)$ と $(b,0)$ の二セルで起き、その確率和は $0.14+0.16=0.30$。この数値が最小であることは次の定理で証明する。
<!-- definition-example-end -->

<a id="thm-ml1-02-pointwise-optimality"></a>

<!-- formal-statement-start -->
> **定理（条件付きリスク分解とBayes最適性）**  
> 有限非空集合 $\mathcal X,\mathcal Y,\mathcal A$、同時分布 $P$、有限値非負損失 $\ell:\mathcal A\times\mathcal Y\to[0,\infty)$ に対して、任意の決定則 $g:\mathcal X\to\mathcal A$ は

$$
R_\ell(g)=\sum_{x:p_x>0}p_xr_\ell(g(x)\mid x)
$$

> を満たす。各 $p_x>0$ で条件付きリスクを最小化する $g^*$ が存在し、

$$
R_\ell^*=\sum_{x:p_x>0}p_x\min_{a\in\mathcal A}r_\ell(a\mid x).
$$

> さらに、任意の $g$ について $R_\ell(g)-R_\ell^*$ は非負であり、等号成立は $p_x>0$ の各点で $g(x)$ が条件付き最小行動となる場合に限る。
<!-- formal-statement-end -->

### 証明の見取り図

母集団リスクの有限和を入力 $x$ ごとに括り、$p_{xy}=p_x\eta_y(x)$ を代入する。各 $p_x$ が非負だから、入力ごとに最小化しても全体の和は増えない。等号条件には $p_x>0$ が重要である。

<!-- proof-start -->
### 証明

$p_x=0$ なら非負の $p_{xy}$ の和が0なので、すべての $y$ で $p_{xy}=0$ である。よってその $x$ を有限和から除いても値は変わらない。$p_x>0$ では[条件付きラベル確率](#def-ml1-02-conditional-label)より $p_{xy}=p_x\eta_y(x)$。これを[母集団リスクの定義](../ML1-01/index.md#def-ml1-01-risks)の有限和に入れると

$$
\begin{aligned}
R_\ell(g)
&=\sum_{x\in\mathcal X}\sum_{y\in\mathcal Y}p_{xy}\ell(g(x),y)\\
&=\sum_{x:p_x>0}\sum_y p_x\eta_y(x)\ell(g(x),y)\\
&=\sum_{x:p_x>0}p_x\left(\sum_y\eta_y(x)\ell(g(x),y)\right)\\
&=\sum_{x:p_x>0}p_xr_\ell(g(x)\mid x).
\end{aligned}
$$

有限非空の $\mathcal A$ 上で各 $r_\ell(\cdot\mid x)$ は実数値なので最小点が存在する。それを各 $x$ で選び、$p_x=0$ の点では任意の固定行動を返す写像 $g^*$ を作る。すると任意の $g$ との差は

$$
R_\ell(g)-R_\ell(g^*)
=\sum_{x:p_x>0}p_x\left[r_\ell(g(x)\mid x)-\min_{a\in\mathcal A}r_\ell(a\mid x)\right]\ge0.
$$

各角括弧は非負であり、係数は正だから、和が0であることと各角括弧が0であることは同値である。したがって主張がすべて従う。$\square$
<!-- proof-end -->

この定理の用途は、全決定則の組合せを列挙せずに最適化できることだ。$|\mathcal X|=m$、$|\mathcal A|=k$ なら決定則自体は $k^m$ 通りあるが、条件付きリスクの計算は各入力の $k$ 行動を比べれば足りる。ただし**真の分布 $P$ を知る理想的な比較**であり、有限標本からそのまま最適則を得られるという保証ではない。

## 4. 0–1損失なら「もっとも確からしいラベル」

0–1損失では、行動 $a$ の損失が0となるのは $Y=a$ の場合だけである。したがって条件付きリスクを最大確率の形へ変形できる。

<a id="thm-ml1-02-zero-one-bayes"></a>

<!-- formal-statement-start -->
> **定理（0–1損失に対するBayes分類則）**  
> 有限非空集合 $\mathcal X,\mathcal Y$、同時分布 $P$、行動集合 $\mathcal A=\mathcal Y$、0–1損失 $\ell(a,y)=\boldsymbol{1}_{\{a\ne y\}}$ とする。$p_x>0$ の入力では $\eta_y(x)=P(Y=y\mid X=x)$ の最大値を達成するラベルを選べばBayes決定則となり、そのリスクは

$$
R_{01}^*=\sum_{x:p_x>0}p_x\left(1-\max_{y\in\mathcal Y}\eta_y(x)\right).
$$

> 二値ラベル $\mathcal Y=\{0,1\}$ で $\eta(x)=P(Y=1\mid X=x)$ とすれば、$\eta(x)>1/2$ なら1、$\eta(x)<1/2$ なら0が唯一の最適行動であり、$\eta(x)=1/2$ では両者が最適となる。
<!-- formal-statement-end -->

### 証明の見取り図

条件付きリスクの和から $y=a$ の項だけが0になり、その他の確率の合計は $1-\eta_a(x)$ になる。これを最小にするには $\eta_a(x)$ を最大化する。

<!-- proof-start -->
### 証明

$p_x>0$ と $a\in\mathcal Y$ を固定すると、[条件付きリスク](#def-ml1-02-conditional-risk)と[0–1損失](../ML1-01/index.md#def-ml1-01-loss)により

$$
\begin{aligned}
r_{01}(a\mid x)
&=\sum_{y\in\mathcal Y}\eta_y(x)\boldsymbol{1}_{\{a\ne y\}}\\
&=\sum_{y\ne a}\eta_y(x)\\
&=\sum_{y\in\mathcal Y}\eta_y(x)-\eta_a(x)\\
&=1-\eta_a(x).
\end{aligned}
$$

最後の等式は $\sum_y\eta_y(x)=\sum_y p_{xy}/p_x=p_x/p_x=1$ による。よって最小行動は最大確率のラベルと一致する。[条件付きリスク分解定理](#thm-ml1-02-pointwise-optimality)に各入力での最小値を入れると表示したBayesリスクを得る。

二値の場合、$r_{01}(0\mid x)=\eta(x)$、$r_{01}(1\mid x)=1-\eta(x)$ なので、$r_{01}(1\mid x)\le r_{01}(0\mid x)$ は $1-\eta(x)\le\eta(x)$、すなわち $\eta(x)\ge1/2$ と同値である。等号では両行動が同じリスクを持つ。$\square$
<!-- proof-end -->

第2節の表では、$a$ の最頻ラベルは0、$b$ の最頻ラベルは1で、リスクは $0.5\cdot0.28+0.5\cdot0.32=0.30$。一方、常に0を返すと $P(Y=1)=0.48$、常に1なら $P(Y=0)=0.52$ の誤りが生じる。入力を使えることが最小リスクを減らしている。

## 5. 非対称な誤分類費用で閾値はどう動くか

誤分類の二種類を分ける。真値0なのに1と判定する**偽陽性**の費用を $c_{\mathrm{FP}}>0$、真値1なのに0と判定する**偽陰性**の費用を $c_{\mathrm{FN}}>0$ とする。正答費用は0とし、両費用が正である条件をここで明示する。

<a id="def-ml1-02-asymmetric-loss"></a>

<!-- formal-statement-start -->
> **定義（二値非対称誤分類損失）**  
> 行動・真値がともに $\{0,1\}$ に属し、$c_{\mathrm{FP}},c_{\mathrm{FN}}>0$ のとき、損失を

$$
\ell_c(0,0)=\ell_c(1,1)=0,\quad
\ell_c(1,0)=c_{\mathrm{FP}},\quad
\ell_c(0,1)=c_{\mathrm{FN}}
$$

> と定める。第1引数が予測、第2引数が真値である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-02-asymmetric-loss -->
**定義の確認**。$c_{\mathrm{FP}}=3,c_{\mathrm{FN}}=2$ なら4組の損失は $0,0,3,2$ で、すべて有限非負。入力 $b$ で予測1を選ぶと、真値0の場合だけ3の損失を支払い、その確率は0.32だから条件付きリスクは $3\cdot0.32=0.96$。予測0なら真値1の確率0.68に費用2が掛かり、$2\cdot0.68=1.36$。従って入力 $b$ では予測1がよい。
<!-- definition-example-end -->

<a id="thm-ml1-02-cost-threshold"></a>

<!-- formal-statement-start -->
> **定理（誤分類費用によるBayes閾値）**  
> 有限入力集合 $\mathcal X$、二値ラベル・行動、上の非対称損失 $\ell_c$ と同時分布 $P$ を仮定する。$p_x>0$ で $\eta(x)=P(Y=1\mid X=x)$ とおくと、最適行動は

$$
g^*(x)=
\begin{cases}
1,&\eta(x)>t_c,\\
0,&\eta(x)<t_c,\\
0\text{ または }1,&\eta(x)=t_c,
\end{cases}
\qquad
t_c=\frac{c_{\mathrm{FP}}}{c_{\mathrm{FP}}+c_{\mathrm{FN}}}.
$$

> Bayesリスクは

$$
R_c^*=\sum_{x:p_x>0}p_x\min\{c_{\mathrm{FN}}\eta(x),\,c_{\mathrm{FP}}(1-\eta(x))\}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

二行動の条件付きリスクをそれぞれ $c_{\mathrm{FN}}\eta(x)$ と $c_{\mathrm{FP}}(1-\eta(x))$ に展開し、大小比較から閾値を作る。費用が正なので分母は0でない。

<!-- proof-start -->
### 証明

$x$ を $p_x>0$ の入力とする。[条件付きリスク](#def-ml1-02-conditional-risk)の定義と[非対称損失](#def-ml1-02-asymmetric-loss)を用いて、$\eta_0(x)=1-\eta(x)$、$\eta_1(x)=\eta(x)$ から

$$
\begin{aligned}
r_c(0\mid x)
&=\eta_0(x)\ell_c(0,0)+\eta_1(x)\ell_c(0,1)\\
&=(1-\eta(x))\cdot0+\eta(x)c_{\mathrm{FN}}
=c_{\mathrm{FN}}\eta(x),\\
r_c(1\mid x)
&=\eta_0(x)\ell_c(1,0)+\eta_1(x)\ell_c(1,1)\\
&=(1-\eta(x))c_{\mathrm{FP}}+\eta(x)\cdot0
=c_{\mathrm{FP}}(1-\eta(x)).
\end{aligned}
$$

行動1が最適である条件は

$$
\begin{aligned}
c_{\mathrm{FP}}(1-\eta(x))&\le c_{\mathrm{FN}}\eta(x)\\
c_{\mathrm{FP}}&\le(c_{\mathrm{FP}}+c_{\mathrm{FN}})\eta(x)\\
\eta(x)&\ge\frac{c_{\mathrm{FP}}}{c_{\mathrm{FP}}+c_{\mathrm{FN}}}.
\end{aligned}
$$

分母は正だから不等号の向きは保存される。等号なら両行動が最小値を達成する。[最適性定理](#thm-ml1-02-pointwise-optimality)の最小値へこの二つの条件付きリスクを代入してリスク公式を得る。$\square$
<!-- proof-end -->

前表で $c_{\mathrm{FP}}=3,c_{\mathrm{FN}}=2$ なら $t_c=3/5=0.6$。$\eta(a)=0.28<0.6<0.68=\eta(b)$ より、最適則は $g^*(a)=0,g^*(b)=1$、母集団リスクは

$$
R_c^*=2P(X=a,Y=1)+3P(X=b,Y=0)
=2\cdot0.14+3\cdot0.16=0.76.
$$

一方、偽陽性がもっと高価で $(c_{\mathrm{FP}},c_{\mathrm{FN}})=(4,1)$ なら閾値は $0.8$。両入力の $\eta$ が0.8未満だから常に0を返すことが最適であり、リスクは $P(Y=1)=0.48$ になる。**費用の単位が違う二つのリスク数値（0.76と0.48）を、そのままモデルの良し悪しとして比較してはいけない**。比較してよいのは、同じ費用設定の中の決定則同士である。

### 5.1 同点、観測されない入力、仮説クラス制約

$\eta(x)=t_c$ では0と1がどちらも最適であり、同点規則を一つに固定してもBayesリスクは変わらない。$p_x=0$ なら条件付き確率の分母は0なので閾値判定を求めず、そこでの行動は任意に選ぶ。

さらに、[前章の仮説クラス](../ML1-01/index.md#def-ml1-01-predictor)を $\mathcal H=\{g\equiv0,g\equiv1\}$ に制限した場合、入力ごとに選ぶBayes決定則が $\mathcal H$ に含まれるとは限らない。第2節の表と0–1損失なら最良の定数予測器は常に0（リスク0.48）だが、入力ごとのBayesリスクは0.30である。[最適性定理](#thm-ml1-02-pointwise-optimality)は全写像を比較した結果であって、制限したクラスで同じ最小値に達するとは主張していない。

## 6. 事前確率とクラス別分布で同じ則を書く

真値ごとの発生割合を先に指定できることもある。$Y\in\{0,1\}$ で $\pi_y=P(Y=y)>0$、$\pi_0+\pi_1=1$ とし、$q_y(x)=P(X=x\mid Y=y)$ を有限集合 $\mathcal X$ 上の条件付き確率とする。各 $y$ で $q_y(x)\ge0$、$\sum_xq_y(x)=1$ を仮定する。この有限模型では同時確率は $p_{xy}=\pi_yq_y(x)$、$p_x=\pi_0q_0(x)+\pi_1q_1(x)$ である。

<a id="prop-ml1-02-likelihood-ratio"></a>

<!-- formal-statement-start -->
> **命題（二値Bayes決定の尤度比表示）**  
> 上の二値模型で $\pi_0,\pi_1>0$、$c_{\mathrm{FP}},c_{\mathrm{FN}}>0$ とする。$q_0(x),q_1(x)>0$ の入力 $x$ では、非対称損失に対して行動1がBayes最適となる条件は

$$
\frac{q_1(x)}{q_0(x)}
\ge\frac{c_{\mathrm{FP}}\pi_0}{c_{\mathrm{FN}}\pi_1}
$$

> であり、等号なら0も最適である。$q_0(x)=0<q_1(x)$ なら行動1、$q_1(x)=0<q_0(x)$ なら行動0が唯一の最適行動である。両方0の点は $P(X=x)=0$ なので任意の行動を取れる。
<!-- formal-statement-end -->

### 証明の見取り図

条件付き確率 $\eta(x)$ を共同確率と入力確率の比で表し、[費用閾値の定理](#thm-ml1-02-cost-threshold)へ代入する。分母の正性を一段ずつ確認すれば、比率の条件になる。

<!-- proof-start -->
### 証明

$q_0(x),q_1(x)>0$ なら $\pi_0q_0(x)+\pi_1q_1(x)>0$。したがって

$$
\eta(x)=\frac{\pi_1q_1(x)}{\pi_0q_0(x)+\pi_1q_1(x)}
$$

である。[費用閾値の定理](#thm-ml1-02-cost-threshold)より行動1が最適となる条件は $c_{\mathrm{FP}}(1-\eta(x))\le c_{\mathrm{FN}}\eta(x)$。$1-\eta(x)=\pi_0q_0(x)/p_x$ を代入し、正の $p_x$ を掛けると

$$
c_{\mathrm{FP}}\pi_0q_0(x)\le c_{\mathrm{FN}}\pi_1q_1(x).
$$

両辺を正の $c_{\mathrm{FN}}\pi_1q_0(x)$ で割れば表示式となる。$q_0=0<q_1$ なら $\eta=1$、$q_1=0<q_0$ なら $\eta=0$ である。費用がともに正なので各場合の最小行動は一意となる。両方0なら $p_x=0$ である。$\square$
<!-- proof-end -->

例えば $\pi_0=0.8,\pi_1=0.2$、$q_0(x)=0.1,q_1(x)=0.5$ とすると、$p_x=0.8\cdot0.1+0.2\cdot0.5=0.18$、$\eta(x)=0.1/0.18=5/9$ である。0–1損失の閾値0.5なら1を選ぶ。尤度比 $0.5/0.1=5$ も右辺 $\pi_0/\pi_1=4$ を上回る。一方、偽陽性費用を2、偽陰性費用を1にすると右辺8なので行動0へ切り替わる。**事前確率と費用の二つが、決定境界に独立に関係する**。

## 7. 計算ラボ：費用と事前確率で決定を変える

以下のPythonラボは離散分布から条件付き確率と二行動のリスクを手で計算し、費用の変更に伴う判定を出力する。コードの $\pi_1$ はクラス1の事前確率、$q_y$ はクラス $y$ から入力 $a,b$ が生じる確率である。各配列の和が1になることを確認し、$P(X=x)=0$ ならその入力の行動を表示から外す。

~~~python-lab
# lab-id: ml1-02-cost-decision
# lab-title: Bayes閾値と決定領域
# lab-mode: exercise
# timeout-ms: 10000
pi1 = 0.48
q0 = [0.36 / 0.52, 0.16 / 0.52]
q1 = [0.14 / 0.48, 0.34 / 0.48]
c_fp = 3.0
c_fn = 2.0
assert 0 < pi1 < 1
assert abs(sum(q0) - 1) < 1e-12 and abs(sum(q1) - 1) < 1e-12
pi0 = 1.0 - pi1

# ヒント: 偽陽性費用と偽陰性費用から、1を選ぶ事後確率の境界を作る。
threshold = ___
risk_total = 0.0
for i, x in enumerate(["a", "b"]):
    px0 = pi0 * q0[i]
    px1 = pi1 * q1[i]
    px = px0 + px1
    if px == 0:
        continue
    eta = px1 / px
    # ヒント: 行動0の損失が発生するのは、真値がどちらのラベルの場合か。
    risk0 = ___
    # ヒント: 行動1の損失が発生するのは、真値がどちらのラベルの場合か。
    risk1 = ___
    choice = int(risk1 < risk0)  # 同点は0
    risk_total += px * min(risk0, risk1)
    print(x, "posterior=", round(eta, 4), "decision=", choice)
print("threshold=", round(threshold, 4), "Bayes risk=", round(risk_total, 4))
~~~

~~~python-solution
pi1 = 0.48
q0 = [0.36 / 0.52, 0.16 / 0.52]
q1 = [0.14 / 0.48, 0.34 / 0.48]
c_fp = 3.0
c_fn = 2.0
assert 0 < pi1 < 1
assert abs(sum(q0) - 1) < 1e-12 and abs(sum(q1) - 1) < 1e-12
pi0 = 1.0 - pi1
threshold = c_fp / (c_fp + c_fn)
risk_total = 0.0
for i, x in enumerate(["a", "b"]):
    px0 = pi0 * q0[i]
    px1 = pi1 * q1[i]
    px = px0 + px1
    if px == 0:
        continue
    eta = px1 / px
    risk0 = c_fn * eta
    risk1 = c_fp * (1.0 - eta)
    choice = int(risk1 < risk0)
    risk_total += px * min(risk0, risk1)
    print(x, "posterior=", round(eta, 4), "decision=", choice)
print("threshold=", round(threshold, 4), "Bayes risk=", round(risk_total, 4))
~~~

~~~python-test
assert abs(threshold - c_fp / (c_fp + c_fn)) < 1e-12
expected = sum(min(c_fn * pi1 * q1[i], c_fp * pi0 * q0[i]) for i in range(2))
assert abs(risk_total - expected) < 1e-12
assert abs(risk_total - 0.76) < 1e-12
~~~

模範値は $t_c=0.6$、行動 $(0,1)$、Bayesリスク $0.76$。$c_{\mathrm{FP}}=4,c_{\mathrm{FN}}=1$ に変更すると、二つの入力とも行動0、リスク $0.48$ になる。クラス1の事前確率 $\pi_1$ を変えた場合は**両クラスの条件付き入力分布 $q_0,q_1$ を固定**するので、入力分布と事後確率も変わる。費用を変えた場合は分布は固定のまま、最小化すべき量だけが変わる。この二つの実験を区別しよう。

## 演習

### ML1-02-A01 条件付き確率を作る
- Level: A
- 目安時間: 10分

$P(a,0)=0.3,P(a,1)=0.2,P(b,0)=0.1,P(b,1)=0.4$ の二値模型で、入力 $a,b$ の確率と $\eta_1(a),\eta_1(b)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

全確率は $0.3+0.2+0.1+0.4=1$ で非負。$p_a=0.3+0.2=0.5$、$p_b=0.1+0.4=0.5$。分母がともに正なので[条件付き確率](#def-ml1-02-conditional-label)から

$$
\eta_1(a)=0.2/0.5=0.4,\qquad\eta_1(b)=0.4/0.5=0.8.
$$

入力により真値1の割合が異なる。
<!-- solution-end -->

### ML1-02-A02 0–1条件付きリスク
- Level: A
- 目安時間: 10分

$\eta_1(x)=0.7$ の二値分類で0–1損失を用いる。行動0と1の条件付きリスクを求め、最適行動を答えよ。

<!-- solution-start -->
#### 詳細解答

$\eta_0(x)=1-0.7=0.3$。[条件付きリスク](#def-ml1-02-conditional-risk)で

$$
r_{01}(0\mid x)=0.3\cdot0+0.7\cdot1=0.7,
\quad
r_{01}(1\mid x)=0.3\cdot1+0.7\cdot0=0.3.
$$

$0.3<0.7$ より1が一意の最適行動。
<!-- solution-end -->

### ML1-02-A03 費用から閾値を計算する
- Level: A
- 目安時間: 10分

$c_{\mathrm{FP}}=2,c_{\mathrm{FN}}=3$ で正答費用0の二値分類について閾値を求め、$\eta_1(x)=0.3,0.4,0.9$ の各点で最適な行動をすべて示せ。

<!-- solution-start -->
#### 詳細解答

費用はともに正なので[費用閾値定理](#thm-ml1-02-cost-threshold)が使え、

$$
t_c=\frac{2}{2+3}=\frac25=0.4.
$$

$0.3<0.4$ の点は0、$0.4=0.4$ の点は0と1の両方、$0.9>0.4$ の点は1が最適。同点を一意だと誤認してはいけない。
<!-- solution-end -->

### ML1-02-A04 観測されない入力
- Level: A
- 目安時間: 10分

$P(X=a,Y=0)=0.7,P(X=a,Y=1)=0.3$、入力 $b$ に関する同時確率は両方0とする。入力 $b$ で $\eta_1(b)=P(X=b,Y=1)/P(X=b)$ を計算できるか。そこでの行動を変えると0–1母集団リスクは変わるか。

<!-- solution-start -->
#### 詳細解答

$p_b=0+0=0$ だから式は $0/0$ になり、[条件付きラベル確率](#def-ml1-02-conditional-label)では定まらない。決定則の母集団リスクの $b$ に対応する二項は $0\cdot\ell(g(b),0)+0\cdot\ell(g(b),1)=0$ なので、$g(b)$ の変更でリスクは変わらない。
<!-- solution-end -->

### ML1-02-B01 リスク最小性を数値で検証する
- Level: B
- 目安時間: 15分

第2節の同時確率表で0–1損失を使う。全4決定則 $(g(a),g(b))\in\{0,1\}^2$ の母集団リスクを列挙し、[Bayes最適性定理](#thm-ml1-02-pointwise-optimality)の結論を検証せよ。

<!-- solution-start -->
#### 詳細解答

各決定則が誤るセルを列挙する。$(0,0)$ は真値1の二セルで誤るから $0.14+0.34=0.48$。$(0,1)$ は $(a,1)$ と $(b,0)$ で誤るから $0.14+0.16=0.30$。$(1,0)$ は $(a,0)$ と $(b,1)$ で誤るから $0.36+0.34=0.70$。$(1,1)$ は真値0の二セルで誤るから $0.36+0.16=0.52$。最小は $(0,1)$ の0.30。

条件付き最小値でも

$$
p_a\min(0.28,0.72)+p_b\min(0.68,0.32)
=0.5\cdot0.28+0.5\cdot0.32=0.30
$$

となり一致する。
<!-- solution-end -->

### ML1-02-B02 偽陽性費用を変える
- Level: B
- 目安時間: 15分

第2節の同時確率表で $c_{\mathrm{FN}}=1$ と固定し、$c_{\mathrm{FP}}=1$ と $4$ の各場合にBayes決定則、リスクを求めよ。同じ入力でも行動が変わる理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

$c_{\mathrm{FP}}=1$ の閾値は $1/(1+1)=0.5$。$\eta(a)=0.28<0.5$、$\eta(b)=0.68>0.5$ なので $(0,1)$、リスクは $1\cdot0.14+1\cdot0.16=0.30$。

$c_{\mathrm{FP}}=4$ の閾値は $4/(4+1)=0.8$。$0.28<0.8,0.68<0.8$ より $(0,0)$、リスクは $1\cdot(0.14+0.34)=0.48$。偽陽性の損失増加によって行動1に必要な事後確率が0.5から0.8に上がるため、入力 $b$ の行動が変わる。
<!-- solution-end -->

### ML1-02-B03 尤度比とゼロ確率
- Level: B
- 目安時間: 20分

$\pi_0=3/4,\pi_1=1/4$、$q_0(a)=1/2,q_1(a)=3/4$ とし、残りの確率はそれぞれ入力 $b$ に割り当てる。0–1損失での入力 $a,b$ の最適行動を尤度比で求めよ。また $q_0(b)=0,q_1(b)>0$ と変えた場合に、入力 $b$ で比 $q_1(b)/q_0(b)$ を直接計算してよいか答えよ（各条件付き分布の和は1とする）。

<!-- solution-start -->
#### 詳細解答

元の模型では $q_0(b)=1/2,q_1(b)=1/4$。0–1損失の[尤度比表示](#prop-ml1-02-likelihood-ratio)は右辺 $\pi_0/\pi_1=3$。入力 $a$ の比は $(3/4)/(1/2)=3/2<3$ なので0、$b$ は $(1/4)/(1/2)=1/2<3$ なので0。例えば $a$ の事後確率も

$$
\frac{(1/4)(3/4)}{(3/4)(1/2)+(1/4)(3/4)}
=\frac{3/16}{6/16+3/16}=\frac13<\frac12
$$

となり一致する。

変更後は $q_0(b)=0$ なので比の分母が0となり、有限の商としては計算できない。$q_1(b)>0$ と $\pi_1>0$ から $p_b>0,\eta_1(b)=1$。条件付きリスクは行動1で0、行動0で1なので、$b$ では行動1が一意に最適となる。
<!-- solution-end -->

### ML1-02-C01 非対称費用と制限仮説の統合
- Level: C
- 目安時間: 30分

$P(a,0)=0.45,P(a,1)=0.05,P(b,0)=0.20,P(b,1)=0.30$、$\ell_c(1,0)=3,\ell_c(0,1)=2$、正答費用0とする。

1. 二入力の事後確率 $\eta_1$ と費用閾値を求めよ。
2. 全決定則から選ぶBayes決定則とリスクを求めよ。
3. 定数決定則しか許さない $\mathcal H=\{g\equiv0,g\equiv1\}$ では、最良の規則とリスクはいくつか。
4. $\eta_1(x)=t_c$ の入力を確率質量 $0.1$ だけ新たに追加し、元の確率表を0.9倍にした場合、そこで行動を0から1へ変えるとBayesリスクが変わるか証明せよ。

<!-- solution-start -->
#### 詳細解答

**1.** 各行和は $0.50$ なので

$$
\eta_1(a)=0.05/0.50=0.10,\qquad
\eta_1(b)=0.30/0.50=0.60.
$$

費用は正であり、[費用閾値の定理](#thm-ml1-02-cost-threshold)から $t_c=3/(3+2)=0.60$。

**2.** $a$ では $0.10<0.60$ だから0が一意に最適。$b$ では同点なので0か1のどちらもよい。$(0,0)$ での損失は真値1の二セルのみから生じ、

$$
R_c(0,0)=2(0.05+0.30)=0.70.
$$

$(0,1)$ では、$a$ の偽陰性損失と $b$ の偽陽性損失から

$$
R_c(0,1)=2\cdot0.05+3\cdot0.20=0.10+0.60=0.70.
$$

よって両方がBayes決定則で、リスクは0.70。

**3.** 常に0は0.70。一方常に1なら真値0の二セルで費用3を支払い、

$$
R_c(1,1)=3(0.45+0.20)=3\cdot0.65=1.95.
$$

よって制限仮説クラスでは常に0が一意に最良で、リスク0.70。全写像の最小値と偶然同じだが、これは同点のため定数0がBayes決定則に含まれるからである。

**4.** 追加した入力を $z$ と書く。$P(X=z)=0.1$、$\eta_1(z)=3/5$ だから

$$
r_c(0\mid z)=2\cdot\frac35=\frac65,\qquad
r_c(1\mid z)=3\left(1-\frac35\right)=\frac65.
$$

追加点の全体リスクへの寄与はどちらも $0.1\cdot6/5=0.12$。旧入力の全リスクは分布の一律0.9倍で $0.9\cdot0.70=0.63$。よって新しいBayesリスクは $0.63+0.12=0.75$ で、$z$ における同点の選択に依存しない。[最適性定理](#thm-ml1-02-pointwise-optimality)の等号条件とも整合する。
<!-- solution-end -->

---

## 次に進む

真の分布を知っているなら、各入力で条件付きリスクを最小化することが最善であり、0–1損失の最大確率則や非対称費用の閾値則はその具体形である。しかし訓練標本から真の分布や条件付き確率を正確に知ることは一般にはできない。次のML1-03では、標本から計算できる経験リスクを最小化し、正則化を加えたときの違いを扱う。
