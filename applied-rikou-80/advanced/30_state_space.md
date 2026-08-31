# Advanced 30 状態空間モデル・予測と観測更新

- 安定ID: `RIKOU-ADVANCED-30`
- 80大問 No.: 30
- 演習価値: A
- 難度: A
- 目安時間: 25〜30分
- 位置付け: ファイル配置は Advanced のままだが、**1級統計応用・共通事項の明示範囲であり Standard 相当の学習優先度**

## この問題で初めて使う概念

時系列では、直接観測したい量そのものが測れず、背後にある「状態」を雑音を含む観測から推定したいことがある。

たとえば装置の真の温度 $x_t$ は直接には分からず、センサ値 $y_t$ だけが観測される状況を考える。

状態空間モデルでは

- **状態方程式**: 隠れた状態 $x_t$ が前時点からどう変化するか。
- **観測方程式**: 状態 $x_t$ から観測 $y_t$ がどう発生するか。

を分けて書く。

本問ではスカラー線形Gaussian状態空間モデル

$$
x_t=ax_{t-1}+w_t,
$$

$$
y_t=x_t+v_t
$$

を用いる。$w_t$ は状態そのものの変動を表す**状態雑音**、$v_t$ はセンサ等の**観測雑音**である。

## 問題

$w_t\sim N(0,q)$、$v_t\sim N(0,r)$、$r>0$ とし、全ての雑音は互いに独立で、過去の状態・観測とも独立とする。

時点 $t-1$ までに得た観測情報を $\mathcal F_{t-1}$ と書き

$$
x_{t-1}\mid\mathcal F_{t-1}\sim N(m,P)
$$

とする。ここで $m$ は時点 $t-1$ の状態推定値、$P$ はその不確実性を表す分散である。

1. 状態方程式を用いて、観測 $y_t$ を見る前の予測分布 $x_t\mid\mathcal F_{t-1}$ の平均 $m^-$ と分散 $P^-$ を求めよ。
2. 観測方程式を用いて、$y_t\mid\mathcal F_{t-1}$ の平均・分散と $\operatorname{Cov}(x_t,y_t\mid\mathcal F_{t-1})$ を求めよ。
3. $(x_t,y_t)$ が条件付き同時正規分布になることを確認し、多変量正規分布の条件付き分布公式から

$$
K=\frac{P^-}{P^-+r}
$$

を導け。さらに観測後の更新平均 $m^+$ と分散 $P^+$ を求めよ。
4. $a=1,q=1,r=4,m=2,P=3,y_t=5$ で $m^-,P^-,K,m^+,P^+$ を計算せよ。
5. $r$ が大きいと $K$ が小さくなる意味を、装置状態とセンサ観測のどちらを強く信頼するかという文脈で説明せよ。またGaussian仮定を外した場合、同じ更新式をどのように解釈すべきか述べよ。

## 詳細解答

### 1. 状態の1期先予測

状態方程式は

$$
x_t=ax_{t-1}+w_t.
$$

条件付き平均は

$$
\begin{aligned}
E[x_t\mid\mathcal F_{t-1}]
&=aE[x_{t-1}\mid\mathcal F_{t-1}]
+E[w_t]\\
&=am.
\end{aligned}
$$

したがって

$$
\boxed{m^-=am}.
$$

$x_{t-1}$ と $w_t$ は独立なので

$$
\begin{aligned}
\operatorname{Var}(x_t\mid\mathcal F_{t-1})
&=a^2\operatorname{Var}(x_{t-1}\mid\mathcal F_{t-1})
+\operatorname{Var}(w_t)\\
&=a^2P+q.
\end{aligned}
$$

よって

$$
\boxed{P^-=a^2P+q}.
$$

独立な正規変数の線形結合なので

$$
\boxed{
x_t\mid\mathcal F_{t-1}
\sim N(m^-,P^-)
}.
$$

ここは「前時点の推定を状態方程式で1歩先へ運ぶ」**予測段階**である。

### 2. 観測の予測分布

観測方程式は

$$
y_t=x_t+v_t.
$$

したがって

$$
E[y_t\mid\mathcal F_{t-1}]
=m^-.
$$

$x_t$ と $v_t$ は独立なので

$$
\operatorname{Var}(y_t\mid\mathcal F_{t-1})
=P^-+r.
$$

また

$$
\begin{aligned}
\operatorname{Cov}(x_t,y_t\mid\mathcal F_{t-1})
&=\operatorname{Cov}(x_t,x_t+v_t\mid\mathcal F_{t-1})\\
&=P^-.
\end{aligned}
$$

従って

$$
\boxed{
E[y_t\mid\mathcal F_{t-1}]=m^-,
\quad
\operatorname{Var}(y_t\mid\mathcal F_{t-1})=P^-+r,
\quad
\operatorname{Cov}(x_t,y_t\mid\mathcal F_{t-1})=P^-
}.
$$

### 3. 観測を使った更新

$x_t$ と $v_t$ は正規で、$y_t=x_t+v_t$ はその線形結合なので、条件付きで $(x_t,y_t)$ は2変量正規分布に従う。

平均ベクトルと分散共分散行列は

$$
\begin{bmatrix}x_t\\y_t\end{bmatrix}
\Bigm|\mathcal F_{t-1}
\sim
N\left(
\begin{bmatrix}m^-\\m^-\end{bmatrix},
\begin{bmatrix}
P^-&P^-\\
P^-&P^-+r
\end{bmatrix}
\right).
$$

多変量正規分布の条件付き平均公式では、$y_t$ の予測値 $m^-$ からのずれ

$$
y_t-m^-
$$

に掛かる係数は

$$
\frac{\operatorname{Cov}(x_t,y_t)}{\operatorname{Var}(y_t)}.
$$

従って

$$
\boxed{
K=\frac{P^-}{P^-+r}
}.
$$

これを用いると観測後の条件付き平均は

$$
\boxed{
m^+=m^-+K(y_t-m^-)
}.
$$

括弧内の

$$
y_t-m^-
$$

は「実際の観測が、観測前の予測からどれだけ外れたか」を表す。

条件付き分散は

$$
\begin{aligned}
P^+
&=P^--\frac{(P^-)^2}{P^-+r}\\
&=P^-\left(1-\frac{P^-}{P^-+r}\right)\\
&=\boxed{(1-K)P^-}.
\end{aligned}
$$

つまり観測を取り込むことで不確実性は

$$
P^-\longrightarrow P^+
$$

へ縮む。

### 4. 数値例

まず予測段階では

$$
m^-=1\cdot2=2,
$$

$$
P^-=1^2\cdot3+1=4.
$$

観測雑音分散は $r=4$ なので

$$
K=\frac4{4+4}=\frac12.
$$

観測 $y_t=5$ は予測値2より3だけ大きいため

$$
\begin{aligned}
m^+
&=2+\frac12(5-2)\\
&=\boxed{3.5}.
\end{aligned}
$$

更新後分散は

$$
P^+
=\left(1-\frac12\right)4
=\boxed2.
$$

したがって

$$
\boxed{
(m^-,P^-,K,m^+,P^+)
=(2,4,1/2,3.5,2)
}.
$$

予測2と観測5の中間である3.5へ更新され、分散は4から2へ減少した。

### 5. gain の意味と Gaussian 仮定

$$
K=\frac{P^-}{P^-+r}
$$

を見る。

観測雑音分散 $r$ が大きいと、センサ値 $y_t$ は信用しにくい。そのため

$$
K\downarrow
$$

となり

$$
m^+=m^-+K(y_t-m^-)
$$

では観測による修正量が小さくなる。つまり状態方程式から得た予測 $m^-$ を強く信頼する。

逆に $r$ が小さければ観測が高精度なので $K$ は大きくなり、推定値を観測側へ大きく動かす。

Gaussian仮定があると、上で導いた $m^+$ と $P^+$ は真の条件付き平均・条件付き分散そのものである。

Gaussian仮定を外し、平均・分散と独立性だけを保つ場合、同じ形の係数は**線形な推定量の中で平均二乗誤差を小さくする更新**として解釈できるが、一般には真の条件付き期待値 $E[x_t\mid y_t]$ がこの線形式になるとは限らない。

## 本番答案

状態方程式から

$$
m^-=am,
\qquad
P^-=a^2P+q.
$$

観測方程式 $y_t=x_t+v_t$ より

$$
E[y_t\mid\mathcal F_{t-1}]=m^-,
$$

$$
\operatorname{Var}(y_t\mid\mathcal F_{t-1})=P^-+r,
\qquad
\operatorname{Cov}(x_t,y_t\mid\mathcal F_{t-1})=P^-.
$$

条件付き同時正規なので

$$
K=\frac{P^-}{P^-+r},
$$

$$
m^+=m^-+K(y_t-m^-),
\qquad
P^+=(1-K)P^-.
$$

数値例では

$$
(m^-,P^-,K,m^+,P^+)=(2,4,1/2,3.5,2).
$$

$r$ が大きいほど観測を信用せず $K$ が小さくなる。Gaussian仮定を外すと、同じ更新は一般に真の条件付き平均ではなく線形最小二乗更新として解釈する。

## 採点基準

- 状態方程式から予測平均・分散を導く: 4点
- 観測分布・共分散を導く: 4点
- 条件付き正規から gain・更新式を導く: 5点
- 数値計算と不確実性減少の解釈: 4点
- 観測雑音と Gaussian 条件の意味: 3点

25分経過時は「状態方程式で予測 → 観測方程式から予測誤差 → 条件付き正規で更新」の3段階を答案に残す。
