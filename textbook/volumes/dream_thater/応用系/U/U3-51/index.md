# U3-51 極値理論：POT・一般化パレート尾部

[U3-48 の Historical Simulation](../U3-48/index.md#def-u3-48-hs) は観測損失の順位から、[VaR](../U3-45/index.md#def-u3-45-var) と [ES](../U3-46/index.md#def-u3-46-es) を求めました。しかし損失が1000件あっても上位1%は約10件です。さらに稀な損失は、実際には見えていないかもしれません。[U3-50 の Delta–Gamma 近似](../U3-50/index.md#def-u3-50-delta-gamma)が将来評価額の計算を速めても、この**尾部のデータ不足**は解決しません。

そこで高い閾値を超えた損失だけをモデル化する「閾値超過法」（peaks over threshold, POT）を学びます。本講の目標は、(1) 超過頻度と超過幅を区別する、(2) 一般化パレート分布の台・形状母数を確認する、(3) VaR/ES を条件付き積分から導く、(4) 閾値診断と推定不確実性を評価することです。

損失 $L$ は特定の保有期間・通貨単位で評価した **実確率 $P$ 下の損失**で、負値（利益）も許します。[U3-44 の $P$ と $Q$ の区別](../U3-44/index.md#def-u3-44-p-q)を保ちます。以下の金額単位は万円、確率は当該保有期間での確率です。例は学習用の合成分布であり、実際の損失の予測精度を保証しません。

## 1. 損失の閾値を超えた部分を集める

閾値 $u=10$ 万円を超えた損失が12万円なら、超過幅は2万円です。元の損失 $L$、超過事象 $L>u$ の確率、超過したときの幅 $L-u$ はそれぞれ別のものです。超過の頻度と幅の分布を分けて調べます。

<a id="def-u3-51-pot"></a>

<!-- formal-statement-start -->
> **定義（閾値超過標本と超過確率）**  
> 実数値損失 $L$ と固定閾値 $u\in\mathbb R$ について、$p_u=P(L>u)$ とする。$0<p_u<1$ のとき、条件 $L>u$ の下での非負超過幅を $Y_u=L-u$ とする。標本 $L_1,\ldots,L_n$ の超過数、超過幅標本および超過比率は次式とする。

$$
k_u=\sum_{i=1}^{n}{\bf1}_{\{L_i>u\}},\qquad
\{L_i-u:L_i>u\},\qquad
\widehat p_u=k_u/n.
$$

> 値がちょうど $u$ の観測は超過に含まれない。$k_u=0$ では超過幅にモデルを当てはめられない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-51-pot -->
**定義の確認**：標本 $(-2,0,4,10,12,12,16)$ 万円、$u=10$ 万円なら $n=7$、$k_u=3$、超過幅は $(2,2,6)$ 万円、$\widehat p_u=3/7$ です。値10は数えません。これは標本比率であって、真の確率 $p_u$ が厳密に $3/7$ という主張ではありません。
<!-- definition-example-end -->

以下ではまず、予測時点より前に固定した閾値で、独立同分布の損失を観測する状況を考えます。極端損失が時間的に固まる場合には独立性の仮定を見直す必要があります。

## 2. 一般化パレート分布と閾値安定性

単純な指数分布だけでは、非常に大きな損失がどの速さで減るかを柔軟に表現できません。そこで尺度 $\beta>0$（万円）と形状 $\xi$（無次元）で超過幅を表します。

<a id="def-u3-51-gpd"></a>

<!-- formal-statement-start -->
> **定義（一般化パレート超過分布）**  
> $\beta>0$、$\xi\in\mathbb R$ に対して非負確率変数 $Y$ の一般化パレート分布 $\operatorname{GPD}(\xi,\beta)$ は生存関数 $S(y)=P(Y>y)$ を次で定める。

$$
S(y)=
\begin{cases}
(1+\xi y/\beta)^{-1/\xi},&\xi\ne0,\ y\ge0,\ 1+\xi y/\beta>0,\\
e^{-y/\beta},&\xi=0,\ y\ge0.
\end{cases}
$$

> $\xi<0$ の場合は右端 $y_*=-\beta/\xi$ 以上で $S(y)=0$、$\xi\ge0$ では上端を持たない。$y<0$ では $S(y)=1$。台の内部での確率密度関数は

$$
f(y)=
\begin{cases}
\beta^{-1}(1+\xi y/\beta)^{-1/\xi-1},&\xi\ne0,\\
\beta^{-1}e^{-y/\beta},&\xi=0.
\end{cases}
$$
<!-- formal-statement-end -->

$\xi\ne0$ では合成関数の微分から

$$
-S'(y)=-\left(-\frac1\xi\right)
(1+\xi y/\beta)^{-1/\xi-1}\frac{\xi}{\beta}
=\frac1\beta(1+\xi y/\beta)^{-1/\xi-1}
$$

となります。$\xi=0$ でも $-S'=f$ です。どちらも $S(0)=1$ で、上端に近づくと $S\to0$ なので密度の積分は1です。$\xi<0$ で右端以上へ冪関数を外挿してはなりません。

<!-- definition-example-start: def-u3-51-gpd -->
**定義の確認**：$\xi=-1/2,\ \beta=4$ 万円なら右端は $y_*=8$ 万円で、

$$
S(y)=(1-y/8)^2,\qquad f(y)=\tfrac14(1-y/8)
\quad(0\le y<8).
$$

密度は非負、かつ

$$
\int_0^8 f(y)\,dy
=\left[y/4-y^2/64\right]_0^8=2-1=1.
$$

$S(0)=1$、$S(8)=0$ で、$P(Y>4)=(1-4/8)^2=1/4$ です。右端・正値性・全確率をすべて確認しました。
<!-- definition-example-end -->

$\xi>0$ は冪型の重い尾、$\xi=0$ は指数型、$\xi<0$ は有限右端です。また $\xi\to0$ では $\log S(y)=-\log(1+\xi y/\beta)/\xi\to-y/\beta$ で、指数型とつながります。極値理論は一定の条件下で高閾値超過を一般化パレート分布で近似できることを示しますが、**任意の閾値・任意の有限標本に厳密な GPD を保証するわけではありません**。

閾値を上げると、超過幅の分布はどう変わるでしょうか。次の安定性が診断の中心になります。

<a id="prop-u3-51-stability"></a>

<!-- formal-statement-start -->
> **命題（一般化パレート分布の閾値安定性）**  
> $Y\sim\operatorname{GPD}(\xi,\beta)$ とし、$v\ge0$ が $P(Y>v)>0$ を満たすとき、

$$
Y-v\mid(Y>v)\ \sim\
\operatorname{GPD}(\xi,\beta+\xi v)
$$

> となる。新尺度 $\beta+\xi v$ は正、形状母数は不変である。
<!-- formal-statement-end -->

### 証明の見取り図

条件付き生存確率を二つの生存確率の比にし、括弧を因数分解します。

<!-- proof-start -->
### 証明

$z\ge0$ が条件付き超過幅の台にあるとき、$\{Y>v+z\}\subseteq\{Y>v\}$ なので

$$
P(Y-v>z\mid Y>v)
=\frac{P(Y>v+z)}{P(Y>v)}=\frac{S(v+z)}{S(v)}.
$$

$\xi\ne0$ では $P(Y>v)>0$ から $\beta+\xi v>0$ です。ここで

$$
1+\frac{\xi(v+z)}\beta
=\left(1+\frac{\xi v}\beta\right)
\left(1+\frac{\xi z}{\beta+\xi v}\right)
$$

と分解すれば

$$
\frac{S(v+z)}{S(v)}
=\left(1+\frac{\xi z}{\beta+\xi v}\right)^{-1/\xi}.
$$

$\xi<0$ の新しい右端も $-(\beta+\xi v)/\xi$ と一致し、端以上の生存確率は0です。$\xi=0$ なら比は $e^{-(v+z)/\beta}/e^{-v/\beta}=e^{-z/\beta}$ で新尺度は $\beta$ です。[GPD 定義](#def-u3-51-gpd)の全ての場合が確認できました。
<!-- proof-end -->

例えば $\xi=1/2,\beta=2$ 万円で $v=2$ 万円上げると、新尺度は $2+(1/2)2=3$ 万円です。元の条件付き確率 $P(Y>2)=(3/2)^{-2}=4/9$ も減るので、**形状が同じことと超過件数が同じことは別**です。

## 3. 損失の尾部モデルから VaR と ES を導く

超過幅の分布だけでは元の損失の VaR は決まりません。閾値を超える確率 $p_u$ と掛け合わせます。

<a id="def-u3-51-tail"></a>

<!-- formal-statement-start -->
> **定義（POT 尾部損失モデル）**  
> 損失 $L$、閾値 $u\in\mathbb R$、$p_u=P(L>u)\in(0,1)$ を取り、$L-u\mid(L>u)\sim\operatorname{GPD}(\xi,\beta)$ と仮定する。このとき $x\ge u$ に対して

$$
P(L>x)=p_uS(x-u)
$$

> が成立する。ただし $\xi<0$ では $x\ge u-\beta/\xi$ で生存確率0とする。$p_u,\xi,\beta$ を標本から推定したときの右辺はモデル予測である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-51-tail -->
**定義の確認**：確率 $4/5$ で $L=0$、確率 $1/5$ で $L=10+Y$ 万円とし、$Y\sim\operatorname{GPD}(1/2,2)$ とします。閾値10万円では $p_u=1/5$ で超過幅は指定通りの GPD。閾値12万円を超える確率は

$$
P(L>12)=\frac15(1+(1/2)(12-10)/2)^{-2}
=\frac15(3/2)^{-2}=\frac4{45}.
$$

無条件確率 $4/45$ は、閾値10万円の超過確率 $1/5$ と、超過後さらに2万円を超える条件付き確率 $4/9$ の積です。
<!-- definition-example-end -->

<a id="prop-u3-51-var"></a>

<!-- formal-statement-start -->
> **命題（POT 尾部の高水準 VaR）**  
> [POT 尾部損失モデル](#def-u3-51-tail)の下で $1-p_u<\alpha<1$ とする。このとき

$$
\operatorname{VaR}_{\alpha}(L)=
\begin{cases}
u+\dfrac{\beta}{\xi}
\left[\left(\dfrac{p_u}{1-\alpha}\right)^\xi-1\right],
&\xi\ne0,\\
u+\beta\log\left(\dfrac{p_u}{1-\alpha}\right),
&\xi=0.
\end{cases}
$$

> $\xi<0$ でも値は有限右端 $u-\beta/\xi$ 未満である。
<!-- formal-statement-end -->

### 証明の見取り図

閾値の右で生存確率が $p_u$ から0へ連続・狭義減少するため、$P(L>q)=1-\alpha$ を解けば [VaR の定義](../U3-45/index.md#def-u3-45-var)に一致します。

<!-- proof-start -->
### 証明

$0<1-\alpha<p_u$ なので $q>u$ は尾部の内部に一意に存在します。$y=q-u$ とおき $\xi\ne0$ の場合

$$
(1+\xi y/\beta)^{-1/\xi}=(1-\alpha)/p_u
\quad\Longrightarrow\quad
1+\xi y/\beta=(p_u/(1-\alpha))^\xi
$$

です。両辺から1を引いて $\beta/\xi$ 倍すると表示式が得られます。$\xi<0$ では右側の冪が $(0,1)$ にあるので $0<y<-\beta/\xi$ です。$\xi=0$ では $e^{-y/\beta}=(1-\alpha)/p_u$ の対数を取り $y=\beta\log(p_u/(1-\alpha))$ を得ます。
<!-- proof-end -->

同じ連続尾部における [ES の分位点積分定義](../U3-46/index.md#def-u3-46-es)は、$q_\alpha=\operatorname{VaR}_\alpha(L)>u$ に対して $E[L\mid L>q_\alpha]$ と一致します。したがって「VaR を超えた分の平均」を正しく積分する必要があります。

<a id="prop-u3-51-es"></a>

<!-- formal-statement-start -->
> **命題（POT 尾部の ES と存在条件）**  
> [POT 尾部損失モデル](#def-u3-51-tail)を仮定し、$1-p_u<\alpha<1$、$q_\alpha=\operatorname{VaR}_\alpha(L)$ とする。$\xi<1$ なら

$$
\operatorname{ES}_\alpha(L)
=q_\alpha+\frac{\beta+\xi(q_\alpha-u)}{1-\xi}
=\frac{q_\alpha+\beta-\xi u}{1-\xi}.
$$

> $\xi\ge1$ なら $\operatorname{ES}_\alpha(L)=+\infty$ である。いずれも $q_\alpha$ は有限である。
<!-- formal-statement-end -->

### 証明の見取り図

VaR 以上への再条件付けには[閾値安定性](#prop-u3-51-stability)を使います。一般化パレート超過幅の平均を生存確率の積分で求めると、$\xi=1$ を境に有限性が変わります。

<!-- proof-start -->
### 証明

$P(L>q_\alpha)=1-\alpha$ で尾部は連続です。[閾値安定性](#prop-u3-51-stability)を $v=q_\alpha-u$ に適用し、

$$
Z=L-q_\alpha\mid(L>q_\alpha)
\sim\operatorname{GPD}(\xi,b),\qquad
b=\beta+\xi(q_\alpha-u)>0
$$

を得ます。非負 $Z$ の期待値は生存関数の積分です。$\xi\ne0,\ \xi<1$ の場合に $w=1+\xi z/b$ と置換すると、

$$
\begin{aligned}
E[Z]
&=\int_0^{\text{右端}}P(Z>z)\,dz\\
&=\frac b\xi
\left[\frac{w^{1-1/\xi}}{1-1/\xi}\right]_{w=1}^{w=\text{端の値}}
=\frac b{1-\xi}.
\end{aligned}
$$

$\xi\in(0,1)$ では $w\to\infty$ で $w^{1-1/\xi}\to0$、$\xi<0$ では上端 $w\to0$ で $w^{1-1/\xi}\to0$ となることを用いました。$\xi=0$ は $\int_0^\infty e^{-z/b}\,dz=b$ です。従って $\operatorname{ES}=q_\alpha+E[Z]$ となります。一方 $\xi=1$ では尾積分 $\int_0^\infty(1+z/b)^{-1}dz$ が対数発散し、$\xi>1$ では冪指数 $-1/\xi>-1$ により発散します。$L\le u$ の分布を変えてもこの発散は消えません。
<!-- proof-end -->

第3節の合成損失分布で $\alpha=0.98$ なら、比 $p_u/(1-\alpha)=10$ を代入して

$$
\begin{aligned}
q_{0.98}&=10+4(\sqrt{10}-1)=6+4\sqrt{10}\approx18.6491,\\
\operatorname{ES}_{0.98}
&=q_{0.98}+\frac{2+(q_{0.98}-10)/2}{1/2}
=2q_{0.98}-6=6+8\sqrt{10}\approx31.2982.
\end{aligned}
$$

VaR と ES の開きは価格付けの誤差ではなく、モデル上の損失の重い尾がもたらすものです。

## 4. 平均超過と閾値の診断

閾値を下げると標本は増えますが、GPD が尾部にしか合わない場合にはバイアスが増えます。高くすると適合しやすくなることはあっても超過数が減り、推定のばらつきが増えます。閾値を上げたときの平均超過を確認します。

<a id="def-u3-51-mean-excess"></a>

<!-- formal-statement-start -->
> **定義（平均超過関数）**  
> 損失 $L$ と閾値 $v$ に対して $P(L>v)>0$ および $E[(L-v)_+]<\infty$ とする。平均超過関数は

$$
e(v)=E[L-v\mid L>v]
=\frac{E[(L-v)_+]}{P(L>v)}
$$

> である。ここで $(a)_+=\max(a,0)$。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-51-mean-excess -->
**定義の確認**：$P(L=0)=4/5$、$P(L=12)=1/10$、$P(L=16)=1/10$ とする。$v=10$ で $P(L>10)=1/5$、$E[(L-10)_+]=(1/10)2+(1/10)6=4/5$ なので $e(10)=(4/5)/(1/5)=4$ 万円です。超過後の平均損失額14万円と超過幅の平均4万円を区別しています。
<!-- definition-example-end -->

<a id="prop-u3-51-mean-excess"></a>

<!-- formal-statement-start -->
> **命題（GPD 尾部の平均超過直線）**  
> [POT 尾部損失モデル](#def-u3-51-tail)において $\xi<1$ とする。$v\ge u$、$P(L>v)>0$ の範囲では

$$
e(v)=\frac{\beta+\xi(v-u)}{1-\xi}
$$

> が成立し、傾きは $\xi/(1-\xi)$ である。$\xi\ge1$ なら平均超過は有限でない。
<!-- formal-statement-end -->

### 証明の見取り図

閾値 $v$ での超過幅の分布を先に求め、GPD の平均公式へ尺度を代入します。

<!-- proof-start -->
### 証明

$w=v-u\ge0$ について[閾値安定性](#prop-u3-51-stability)を適用すると、

$$
L-v\mid(L>v)
\sim\operatorname{GPD}(\xi,\beta+\xi(v-u))
$$

です。[ES の証明](#prop-u3-51-es)で求めた、形状 $\xi<1$・尺度 $b>0$ の GPD 平均 $b/(1-\xi)$ に $b=\beta+\xi(v-u)$ を代入すると表示式です。分母 $1-\xi$ は正なので、傾きの符号は $\xi$ と同じです。$\xi\ge1$ では同じ積分が発散します。
<!-- proof-end -->

例えば $u=10,\beta=2,\xi=1/2$ なら $e(10)=4$ 万円。閾値を12万円へ上げれば尺度 $3$ となって $e(12)=6$ 万円です。形状が正のとき、**閾値を上げるほど超過した後の平均幅も増えます**。

モデルが正確なら、閾値を $d\ge0$ だけ上げたとき

$$
\beta_{u+d}=\beta+\xi d,\qquad
p_{u+d}=p_u(1+\xi d/\beta)^{-1/\xi}
$$

です（$\xi=0$ は指数極限）。前者は[閾値安定性](#prop-u3-51-stability)、後者は[損失の生存確率](#def-u3-51-tail)から出ます。

| 閾値（万円） | 超過確率 | 尺度（万円） | 平均超過（万円） |
| ---: | ---: | ---: | ---: |
| $10$ | $1/5$ | $2$ | $4$ |
| $12$ | $4/45$ | $3$ | $6$ |

後者の閾値で98% VaR を求めると、

$$
\begin{aligned}
q'&=12+6\left[\left(\frac{4/45}{1/50}\right)^{1/2}-1\right]\\
&=12+6\left(\frac{2\sqrt{10}}3-1\right)
=6+4\sqrt{10},
\end{aligned}
$$

と元の閾値での値に一致します。これは**真の母数が分かっている合成モデル**だから成立する不変性であり、異なる閾値で別々に推定した場合の一致を保証しません。

現実の診断では、候補閾値ごとの超過件数、平均超過の直線性、推定形状の安定性、補正尺度 $\widehat\beta_v-\widehat\xi v$、VaR/ES の変動を見る必要があります。実データの直線らしさだけを GPD の証明と誤解してはいけません。

## 5. 推定の不確実性を分解する

閾値は予測時点以前の情報で固定し、$k_u/n$ で超過確率を推定します。超過幅 $y_1,\ldots,y_{k_u}>0$ に[確率密度関数](#def-u3-51-gpd)を当てはめると、独立同分布条件下の $\xi\ne0$ の対数尤度は

$$
\ell(\xi,\beta)=-k_u\log\beta
-\left(1+\frac1\xi\right)
\sum_{j=1}^{k_u}\log(1+\xi y_j/\beta)
$$

です。制約は $\beta>0$、全観測で $1+\xi y_j/\beta>0$。$\xi=0$ は指数型の極限です。特に $\xi<0$ では右端に関する制約を無視して数値最大化してはいけません。

<a id="prop-u3-51-exp-mle"></a>

<!-- formal-statement-start -->
> **命題（指数超過幅の尺度の最尤推定）**  
> 独立同分布の正の超過幅 $y_1,\ldots,y_k$（$k\ge1$）が $\operatorname{GPD}(0,\beta)$ に従うとする。このとき $\beta>0$ の一意の最尤推定量は

$$
\widehat\beta=\frac1k\sum_{j=1}^ky_j
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

指数密度を掛けて対数を取り、微分の符号変化で全域最大を確認します。

<!-- proof-start -->
### 証明

$s=\sum_jy_j>0$ と置くと $\ell(\beta)=-k\log\beta-s/\beta$ なので、

$$
\ell'(\beta)=-k/\beta+s/\beta^2
=(s-k\beta)/\beta^2.
$$

$\beta>0$ では分母が正、分子は $\beta<s/k$ で正、$\beta>s/k$ で負です。従って $s/k$ で最大となり一意です。$\beta\downarrow0$ では $-s/\beta$、$\beta\to\infty$ では $-k\log\beta$ が支配的なので両端で尤度が増大することもありません。
<!-- proof-end -->

形状 $\xi$ も未知なら通常は制約付き数値最適化が必要です。また母数推定だけでなく**超過確率そのもの**が標本ごとに変動します。

<a id="prop-u3-51-count"></a>

<!-- formal-statement-start -->
> **命題（固定閾値の超過比率の分散）**  
> $L_1,\ldots,L_n$ が独立同分布で、観測より前に閾値 $u$ を固定するとする。$p_u=P(L_i>u)$ なら

$$
E[\widehat p_u]=p_u,\qquad
\operatorname{Var}(\widehat p_u)=p_u(1-p_u)/n.
$$
<!-- formal-statement-end -->

### 証明の見取り図

超過指示変数の分散を求め、独立性で共分散項が消えることを示します。

<!-- proof-start -->
### 証明

$I_i={\bf1}_{\{L_i>u\}}$ とおけば $I_i^2=I_i$ かつ $E[I_i]=p_u$ です。したがって $\operatorname{Var}(I_i)=E[I_i^2]-(E[I_i])^2=p_u-p_u^2$。独立性より

$$
E[k_u]=\sum_iE[I_i]=np_u,\qquad
\operatorname{Var}(k_u)=\sum_i\operatorname{Var}(I_i)
=np_u(1-p_u).
$$

$\widehat p_u=k_u/n$ に戻せば期待値と分散の式を得ます。
<!-- proof-end -->

$n=1000$、$p_u=1/5$ で理論標準偏差は $\sqrt{(1/5)(4/5)/1000}=\sqrt{0.00016}\approx0.01265$ です。しかしこの値は閾値を固定した**超過頻度だけ**の不確実性で、形状・尺度の推定誤差、閾値選択、将来分布変化を含みません。極端損失が時系列で連続するときは独立性が失われ、

$$
\operatorname{Var}(k_u)=\sum_i\operatorname{Var}(I_i)
+2\sum_{i<j}\operatorname{Cov}(I_i,I_j)
$$

の後半項を省けません。時系列のクラスタリングと予測後のデータを使う先読みは別に検査する必要があります。

## 6. 合成分布の VaR/ES 感度

$u=10$ 万円、$p_u=1/5$、$\beta=2$ 万円の合成尾部で、形状だけを変えて98% VaR/ESを比較します。

| 形状 $\xi$ | 98% VaR（万円） | 98% ES（万円） | 尾部 |
| ---: | ---: | ---: | --- |
| $0$ | $10+2\log10\approx14.6052$ | $12+2\log10\approx16.6052$ | 指数型 |
| $1/2$ | $6+4\sqrt{10}\approx18.6491$ | $6+8\sqrt{10}\approx31.2982$ | 冪型 |
| $1$ | $28$ | $+\infty$ | ES 発散 |

各行は同じ観測から得た別推定値ではなく、**一つの母数だけを変えた仮想モデル**です。形状が1以上の ES は計算失敗ではなく尾積分の発散です。実際の損失に上限があるなら、無限に続く GPD とは異なる台を持つモデルを検討すべきです。

同じ分布で閾値を10万円から12万円へ上げると、$n=1000$ の期待超過数は $1000/5=200$ 件から $1000(4/45)=800/9\approx88.89$ 件に減ります。期待件数は小数でも実際の件数は整数です。98%水準を超える観測数の期待値はわずか20件。POT は尾の少数標本を利用して外挿する道具ですが、観測していない損失を確実に予言する道具ではありません。
