# ML1-17 SVMの予測とマージンの適用

<!-- definition-example-audit: strict -->

## 1. 正しい分類だけでは測れないもの

[ML1-08のlogistic回帰](../ML1-08/index.md#def-ml1-08-logistic-model)は確率を、[ML1-16のBoosting](../ML1-16/index.md#def-ml1-16-additive-score)は弱学習器の加法得点を学んだ。どちらも分類境界を作れる。しかし同じ訓練正解率でも、境界から十分離れた点が多い分類器と、点が境界に張り付いた分類器は異なる。

SVM（support vector machine、サポートベクトルマシン）は、境界からの**余裕（マージン）**と、その余裕を作る法線ベクトルの大きさを結び付ける。この結び付きと双対・KKTの一般的な証明は[RKHS4の最大マージン定理](../../RKHS/RKHS4/index.md#thm-rkhs4-primal-max-margin)と[RKHS5のソフトマージン双対](../../RKHS/RKHS5/index.md#thm-rkhs5-soft-margin-dual)で既習である。本講では、与えられたデータと係数で**何が予測されるか、どの点が余裕を失うか、正則化や核を変えるとどうなるか**を実際に計算する。

以下では $n\ge2$、$d\ge1$ とし、正負の両クラスを含む有限訓練標本 $(x_i,y_i)_{i=1}^n$、$x_i\in\mathbb R^d$、$y_i\in\{-1,+1\}$ を考える。内積は通常のEuclid内積、$C>0$ とする。決定境界での同点は、後述のとおり $-1$ に決める。

## 2. 得点から予測し、距離まで読む

実数を返すアフィン得点 $g(x)=w^{\mathsf T}x+b$ の符号から予測する。まず学習器の最適化とは独立に、一つの固定した $w,b$ の働きを調べる。[RKHS4の関数・幾何マージンの定義](../../RKHS/RKHS4/index.md#def-rkhs4-margin)を、ここでは訓練点ごとに使用する。

<a id="def-ml1-17-svm-prediction"></a>

<!-- formal-statement-start -->
> **定義（SVM得点の予測規則）**  
> $g:\mathbb R^d\to\mathbb R$ が実数得点であるとき、二値予測を

$$
H_g(x)=
\begin{cases}
+1 & g(x)>0,\\
-1 & g(x)\le0
\end{cases}
$$

> で定める。$w\ne0$ の線形得点 $g(x)=w^{\mathsf T}x+b$ に対して、標本点の関数マージンと幾何マージンをそれぞれ

$$
t_i=y_i g(x_i),\qquad
\rho_i=\frac{t_i}{\|w\|_2}
$$

> と書く。幾何マージンは $w\ne0$ の場合に限って定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-17-svm-prediction -->
**定義の確認**。$d=1,w=2,b=-1$ として、負例 $x=-1$、正例 $x=1,2$ を考える。得点は順に $-3,1,3$、予測は $(-1,+1,+1)$ で3点とも正しい。各 $y_i$ を掛けると $t=(3,1,3)$ となり、$\|w\|_2=2>0$ を確認した上で $\rho=(3/2,1/2,3/2)$ となる。境界は $2x-1=0$、すなわち $x=1/2$ であり、正例 $x=1$ と境界の距離 $1/2$ と一致する。得点0の入力では規則どおり $-1$ を返す。
<!-- definition-example-end -->

$w$ を $aw$、$b$ を $ab$（$a>0$）へ変えると $g$ と $t_i$ は $a$ 倍されるが、$\rho_i$ は変わらない。このため、単に大きな得点を作ることと幾何学的な余裕を大きくすることは違う。[ML1-16の正規化マージン](../ML1-16/index.md#def-ml1-16-margin)は弱学習器係数の和で割る量で、ここでの法線ノルムによる正規化と同一ではない。

## 3. ハードマージンを数値で最適化する

正負を厳密に分離できるときは、$t_i\ge1$ を保ちつつ $\|w\|_2$ をできるだけ小さくする。これが[ハードマージンSVMの主問題](../../RKHS/RKHS4/index.md#def-rkhs4-hard-margin-svm)である。制約値を1とするのは任意の正のスケーリングを固定するためであり、この規格化の最適値で境界までの最短距離は $1/\|w\|_2$ になる。

負例 $x=-2,-1$、正例 $x=1,2$ の1次元データを考える。特に境界に近い $x=-1,1$ の条件は

$$
w-b\ge1,\qquad w+b\ge1.
$$

両式より $w\ge1+|b|$。従って $w^2/2$ の最小値は $w=1,b=0$ で達成され、遠い2点もそれぞれ $t=2\ge1$ を満たす。マージンは $1/\|w\|=1$、境界 $x=0$ の両側の支持直線は $x=-1$ と $x=1$ である。$x=\pm1$ の2点は境界までの距離1をちょうど達成する。

[RKHS4のKKTとサポートベクトル](../../RKHS/RKHS4/index.md#thm-rkhs4-kkt)による双対係数の正値性は「マージン境界にいること」の十分条件だが、退化時には逆が必ずしも成立しない。距離が最小の点と、双対係数が正である点を機械的に同一視しない。

## 4. 余裕を失った点をヒンジ損失で数える

線形分離できない場合、全点へ $t_i\ge1$ を要求すると最適化が実行不能になる。[RKHS5のスラック変数](../../RKHS/RKHS5/index.md#def-rkhs5-slack-variable)は各点で許した違反量 $\xi_i\ge0$ であり、条件は $t_i\ge1-\xi_i$ となる。固定した得点に必要な最小の値は $\xi_i=\max(0,1-t_i)$ である。

<a id="def-ml1-17-margin-audit"></a>

<!-- formal-statement-start -->
> **定義（SVMの訓練マージン表）**  
> 二値標本と有限な得点 $g$ に対して、各点について

$$
t_i=y_i g(x_i),\qquad
h_i=\max\{0,1-t_i\}
$$

> を並べた表 $(t_i,h_i)_{i=1}^n$ を訓練マージン表と呼ぶ。$h_i$ は[RKHS5のヒンジ損失](../../RKHS/RKHS5/index.md#def-rkhs5-hinge-loss)を適用した値であり、平均 $\widehat L_{\rm hinge}=n^{-1}\sum_i h_i$ を経験ヒンジ損失と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-17-margin-audit -->
**定義の確認**。符号付き得点が $(2,1,0.4,-0.5)$ なら、各値を $1-t_i$ へ代入して正部分を取ると $h=(0,0,0.6,1.5)$、従って平均損失は $2.1/4=0.525$。$t=0.4>0$ の点は正分類でも損失を持ち、$t=-0.5$ は誤分類で損失が1を超える。全成分が有限で非負であることも確認できる。
<!-- definition-example-end -->

スラックを目的関数から消去する[RKHS5の同値定理](../../RKHS/RKHS5/index.md#thm-rkhs5-slack-hinge-equivalence)を、今の有限標本、$C>0$、アフィン得点に適用すると、線形ソフトマージンの最適化は

$$
\min_{w\in\mathbb R^d,\ b\in\mathbb R}
J_C(w,b),\qquad
J_C(w,b)=\frac12\|w\|_2^2+C\sum_{i=1}^n\max\{0,1-y_i(w^{\mathsf T}x_i+b)\}
$$

となる。$C$ は**和**に掛かっているので、平均損失に書き換えるなら係数は $nC$ である。同じ数値の $C$ を平均形式へそのまま移してはならない。

<a id="thm-ml1-17-hinge-bound"></a>

<!-- formal-statement-start -->
> **定理（経験ヒンジ損失による訓練誤りの上界）**  
> $n\ge1$ 個の二値標本、有限実数得点 $g$ と、[本講の予測規則](#def-ml1-17-svm-prediction)に対し、訓練0–1誤分類率 $\widehat R_{01}=n^{-1}\sum_i\boldsymbol1_{\{H_g(x_i)\ne y_i\}}$ は

$$
0\le\widehat R_{01}\le\widehat L_{\rm hinge}
$$

> を満たす。右辺は1以下である必要はない。
<!-- formal-statement-end -->

### 証明の見取り図

誤分類した点は符号付き得点が0以下となる。そこでは $1-t_i\ge1$ なので、誤分類の指示関数を点ごとにヒンジ損失が上から押さえる。

<!-- proof-start -->
### 証明

$H_g(x_i)\ne y_i$ のとき、$y_i=+1$ なら $g(x_i)\le0$、$y_i=-1$ なら $g(x_i)>0$ である。いずれも $t_i=y_ig(x_i)\le0$（後者は厳密に負）なので

$$
h_i=\max(0,1-t_i)\ge1.
$$

正解した点では指示関数が0、ヒンジ損失は常に非負。従って全ての $i$ で

$$
\boldsymbol1_{\{H_g(x_i)\ne y_i\}}\le h_i.
$$

有限和を取り $n$ で割れば結論となる。$t_i\ll0$ なら $h_i>1$ なので、上界が1以下という主張はできない。$\square$
<!-- proof-end -->

これは**訓練誤りの比較**であり、母集団での汎化上界ではない。

## 5. 正則化係数で最適得点が変わる最小モデル

次は機械学習のデータにSVMを適用して、係数が実際にどのように動くかを解き切る例である。1次元の訓練点を $(x_1,y_1)=(-1,-1)$、$(x_2,y_2)=(1,+1)$ とする。$b$ の役割も消したつもりにならず、最初から最適化する。

<a id="prop-ml1-17-two-point-path"></a>

<!-- formal-statement-start -->
> **命題（対称2点のソフトマージン解）**  
> 上記2点と $C>0$ に対する線形ソフトマージン目的 $J_C(w,b)$ の最適な法線係数は一意に

$$
w_C=\min\{2C,1\}
$$

> であり、$(w_C,0)$ は最適解である。$0<C<1/2$ では各点の関数マージンは $2C<1$、$C\ge1/2$ では両点とも関数マージンは1となる。
<!-- formal-statement-end -->

### 証明の見取り図

2点の符号付き得点は $w-b$ と $w+b$。ヒンジ損失が凸であるため、$b$ の左右への移動では合計を $b=0$ の値より下げられない。その後は1変数の区分二次関数を最小化する。

<!-- proof-start -->
### 証明

[ヒンジ損失の定義](../../RKHS/RKHS5/index.md#def-rkhs5-hinge-loss)の関数 $\ell(t)=\max(0,1-t)$ は二つのアフィン関数の最大値であり凸である。任意の $w,b\in\mathbb R$ に対し凸性より

$$
\frac{\ell(w-b)+\ell(w+b)}2
\ge\ell\!\left(\frac{(w-b)+(w+b)}2\right)
=\ell(w).
$$

よって $J_C(w,b)\ge\tfrac12w^2+2C\max(0,1-w)$ であり、$b=0$ で等号になる。従って右辺を $q_C(w)$ として最小化すれば足りる。

$w<1$ では $q_C(w)=\tfrac12w^2+2C(1-w)$、導関数は $q_C'(w)=w-2C$。$w>1$ では $q_C(w)=w^2/2$、導関数は $w>0$。境目で左側導関数は $1-2C$、右側導関数は1である。

$2C<1$ なら $w=2C$ が $w<1$ の唯一の停留点で、その前後で導関数の符号が負から正へ変わる。$2C\ge1$ なら $w<1$ で導関数は $w-2C\le0$、$w>1$ では正なので最小点は $w=1$ である。$\tfrac12w^2$ が厳密凸であり、残りが凸なので $w$ の最小点は唯一。$b=0$ における2点の符号付き得点はいずれも $w_C$ となる。$\square$
<!-- proof-end -->

例えば $C=1/4$ なら $w=1/2$、各点のヒンジ損失 $1/2$、目的値は

$$
J_{1/4}(1/2,0)=\frac12\left(\frac12\right)^2
+\frac14\left(\frac12+\frac12\right)
=\frac38.
$$

$C=1$ なら $w=1$、両損失0、目的値 $1/2$。どちらも訓練正解率は100%だが、余裕とノルムは異なる。特に $C=1/4$ のとき $1/\|w\|_2=2$ を「訓練点までの最短距離」と読めない。点は $t_i=1/2$ でマージン制約を満たしていないからである。

## 6. サポートベクトルと双対係数を数値で読む

[RKHS5のKKTによる分類命題](../../RKHS/RKHS5/index.md#prop-rkhs5-kkt-point-classification)では、最適双対係数 $0\le\alpha_i\le C$ と符号付き得点 $t_i$ について、次の必要条件を与える。

| 双対係数 | KKTから必ず言えること | 逆向きの注意 |
|---|---|---|
| $\alpha_i=0$ | $t_i\ge1$ | $t_i=1$ でも $\alpha_i=0$ は可能 |
| $0<\alpha_i<C$ | $t_i=1$ | $t_i=1$ でも端点係数は可能 |
| $\alpha_i=C$ | $t_i\le1$ | $t_i=1$ でも $\alpha_i=C$ は可能 |

この表は最適解のKKTが成立する場合だけ使える。[RKHS5の双対問題](../../RKHS/RKHS5/index.md#thm-rkhs5-soft-margin-dual)からの $w=\sum_i\alpha_i y_ix_i$ を、前節の2点へ代入して検算する。両点で $y_ix_i=1$ なので対称な $\alpha_1=\alpha_2=a$ を選べば $w=2a$、$\sum_i\alpha_i y_i=a-a=0$ も成立する。

$C=1/4$ では $a=1/4=C$、$w=1/2$、$t_i=1/2\le1$ と上限サポートベクトルの条件に一致する。$C=1$ では $a=1/2$ が $0<a<C$ を満たし、$w=1$、$t_i=1$ と自由サポートベクトルの条件に一致する。**係数を見ずに「境界上だから自由サポートベクトル」と結論しない**。

## 7. 分離不能は最適化アルゴリズムの失敗ではない

$x_1=x_2=0$ なのに $y_1=+1$、$y_2=-1$ とすると、得点は両点で $b$ である。[RKHS4のハードマージン制約](../../RKHS/RKHS4/index.md#def-rkhs4-hard-margin-svm)なら $b\ge1$ と $-b\ge1$ を同時に要し、実行可能点は存在しない。

ソフトマージンでは逆に

$$
\ell(b)+\ell(-b)\ge2\ell(0)=2
$$

と凸性から分かる。目的値は $J_C(w,b)\ge w^2/2+2C\ge2C$ であり、$w=0$ と $-1\le b\le1$ のどれでも等号となる。得点0のときは $-1$ と予測して負例のみ正解する。法線 $w=0$ なので幾何マージンの式で0除算してはならない。失われた仮定は線形分離可能性であり、壊れた機構は**同じ入力に別の符号を割り当てられないこと**である。

## 8. カーネルでXORを分類する

線形得点 $w^{\mathsf T}x+b$ では、$x=(\pm1,\pm1)$ の4点に $y=x_1x_2$ を与えたXOR配置を分離できない。実際、正例 $(1,1),(-1,-1)$ で得点が正、負例 $(1,-1),(-1,1)$ で得点が負だと仮定して足すと、正例2点の得点和 $2b>0$ と負例2点の得点和 $2b<0$ が矛盾する。

[RKHS5のカーネルトリック](../../RKHS/RKHS5/index.md#def-rkhs5-kernel-trick)では、特徴写像の内積を核で計算する。$\gamma>0$ の2次多項式核を

$$
K_\gamma(x,z)=(1+\gamma x^{\mathsf T}z)^2
$$

とする。成分を展開すると、特徴写像

$$
\phi_\gamma(x)=
(1,\sqrt{2\gamma}x_1,\sqrt{2\gamma}x_2,
\gamma x_1^2,\sqrt2\gamma x_1x_2,\gamma x_2^2)
$$

について $K_\gamma(x,z)=\phi_\gamma(x)^{\mathsf T}\phi_\gamma(z)$ となる。よって任意の係数 $c_i$ に対し $\sum_{ij}c_ic_jK_\gamma(x_i,x_j)=\|\sum_i c_i\phi_\gamma(x_i)\|_2^2\ge0$ であり、Gram行列は半正定値。この根拠なしに単なる類似度を任意に核と呼んではならない。

<a id="prop-ml1-17-xor-score"></a>

<!-- formal-statement-start -->
> **命題（XORに対する核SVMの対称解）**  
> 4点 $x=(\pm1,\pm1)$、ラベル $y=x_1x_2$、核 $K_\gamma$（$\gamma>0$）、係数 $C>0$ に対する[RKHS5のカーネルソフトマージン双対](../../RKHS/RKHS5/index.md#thm-rkhs5-kernel-dual)には、

$$
\alpha_i=a=\min\left\{C,\frac1{8\gamma^2}\right\}
\quad(i=1,2,3,4),\qquad b=0
$$

> に対応する最適な主・双対解が存在する。その判別得点は

$$
g(x)=8a\gamma^2x_1x_2
$$

> である。4訓練点の関数マージンはすべて $8a\gamma^2=\min(8C\gamma^2,1)>0$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

4点を対称に扱うと、核の二乗展開の定数項・一次項がラベル付き総和で消え、交差積だけが残る。双対目的が凹関数であることと、その勾配が箱型制約で停止することを確認する。

<!-- proof-start -->
### 証明

4点のラベルの和は0、ラベルを掛けた座標の和も各座標で0である。また $x_i=(u_i,v_i)$、$y_i=u_iv_i$ とすれば

$$
\begin{aligned}
\sum_i y_iK_\gamma(x_i,x)
&=\sum_i u_iv_i[1+2\gamma(u_ix_1+v_ix_2)
+\gamma^2(u_ix_1+v_ix_2)^2]\\
&=\gamma^2\sum_i u_iv_i(x_1^2+x_2^2+2u_iv_ix_1x_2)\\
&=8\gamma^2x_1x_2.
\end{aligned}
$$

$\alpha_i=a$ とすると双対等式制約 $\sum_i\alpha_i y_i=0$ を満たし、得点は主張どおり。各訓練点では $y_i g(x_i)=8a\gamma^2$。核双対を

$$
D(\alpha)=\sum_i\alpha_i-\frac12
\sum_{i,j}\alpha_i\alpha_jy_iy_jK_\gamma(x_i,x_j)
$$

と書くと、各方向の偏導関数は $\partial D/\partial\alpha_i=1-y_i\sum_j\alpha_jy_jK_\gamma(x_j,x_i)=1-8a\gamma^2$ で同一である。

$C\ge1/(8\gamma^2)$ なら $a=1/(8\gamma^2)$ で全偏導関数が0。$C<1/(8\gamma^2)$ なら $a=C$ で全偏導関数は正であり、実行可能な各座標の変化は $\delta\alpha_i\le0$ だから、方向微分 $\sum_i(\partial_iD)\delta\alpha_i\le0$。核の半正定値性により $D$ は凹であるため、いずれも双対大域最大点である。

対応する主変数を $w=\sum_i\alpha_iy_i\phi_\gamma(x_i)$、$b=0$、$\xi_i=\max(0,1-8a\gamma^2)$ とする。$a<C$ なら $t_i=1,\xi_i=0$、$a=C$ なら $t_i\le1$ で各スラックは制約を等号で満たす。したがって[RKHS5のKKT条件](../../RKHS/RKHS5/index.md#thm-rkhs5-kkt)が満たされ、Slater条件を使った同章の強双対性から主問題でも最適である。$\square$
<!-- proof-end -->

$C\gamma^2$ が小さいと訓練点の符号は正しくても $t_i<1$ でヒンジ損失が残る。核幅に関係する $\gamma$ と違反の重み $C$ は別のパラメータであり、**同じ数値を入れたから同じ働きになるわけではない**。

## 9. 計算ラボ：$C$ と核係数を変える

手計算で得た二つの解を、プログラムでも数値カーネルとして実行する。$C$ はどちらにも、$\gamma$ はXOR核に作用する。乱数を使わない4点・2点の全列挙なのでseed依存性はない。モデルの係数・Gram行列・訓練点ごとの得点・ヒンジ損失を再計算し、ラベルの変化だけでなく**余裕の変化**を確かめよう。

~~~python-lab
# lab-id: ml1-17-svm-margin
# lab-title: ソフトマージン経路とXORカーネルの正確な再計算
# lab-mode: demo
# timeout-ms: 10000
C, gamma = 0.25, 1.0   # 正の値へ変更して再実行
assert C > 0 and gamma > 0

# 対称2点：解析的最適係数
xs_lin, ys_lin = [-1.0, 1.0], [-1, 1]
w = min(2*C, 1.0)
scores_lin = [w*x for x in xs_lin]
margins_lin = [y*s for y,s in zip(ys_lin,scores_lin)]
hinge_lin = [max(0,1-t) for t in margins_lin]
objective_lin = w*w/2 + C*sum(hinge_lin)

# XOR：Gram行列と箱型双対の対称な厳密解
xs = [(1,1),(1,-1),(-1,1),(-1,-1)]
ys = [a*b for a,b in xs]
def kernel(x,z):
    return (1+gamma*(x[0]*z[0]+x[1]*z[1]))**2
gram = [[kernel(x,z) for z in xs] for x in xs]
alpha = min(C, 1/(8*gamma*gamma))
def score(x):
    return sum(alpha*y*kernel(z,x) for z,y in zip(xs,ys))
scores = [score(x) for x in xs]
margins = [y*s for y,s in zip(ys,scores)]
hinge = [max(0,1-t) for t in margins]
norm_sq = sum(alpha*ys[i]*alpha*ys[j]*gram[i][j]
              for i in range(4) for j in range(4))
objective_xor = norm_sq/2 + C*sum(hinge)
print("linear w:",w,"margins:",margins_lin,"objective:",objective_lin)
print("XOR alpha:",alpha,"margins:",margins,"objective:",objective_xor)
print("XOR Gram:",gram)
for x in [(0.6,0.7),(0.6,-0.7),(-0.6,0.7),(-0.6,-0.7)]:
    s = score(x)
    print("input",x,"score",round(s,5),"prediction",1 if s>0 else -1)
~~~

~~~python-test
assert abs(w-min(2*C,1))<1e-12
assert all(abs(t-w)<1e-12 for t in margins_lin)
assert abs(objective_lin-(w*w/2+2*C*max(0,1-w)))<1e-12
assert 0 < alpha <= C
assert all(abs(t-min(8*C*gamma*gamma,1))<1e-10 for t in margins)
assert all(abs(score(x)-8*alpha*gamma*gamma*x[0]*x[1])<1e-10 for x in xs)
assert abs(norm_sq-32*alpha*alpha*gamma*gamma)<1e-10
assert all(gram[i][j]==gram[j][i] for i in range(4) for j in range(4))
assert abs(objective_xor-(16*alpha*alpha*gamma*gamma+4*C*max(0,1-8*alpha*gamma*gamma)))<1e-10
~~~

このラボの「完全正解」は4訓練点と2訓練点に限る。[ML1-12の独立テストの考え方](../ML1-12/index.md#thm-ml1-12-independent-holdout)に沿い、実データでは核係数・$C$ の選択に使用しなかったテスト集合を別に確保する。非線形化と正則化の適否を訓練正解率だけで結論しない。

## 10. 演習

### ML1-17-A01 得点と幾何マージン
- Level: A

$d=1$、$w=2,b=-1$、負例 $x=-1$、正例 $x=1,2$ の3点について得点、予測、関数マージン、幾何マージンをすべて求め、境界の位置を述べよ。

<!-- solution-start -->
#### 詳細解答

[予測規則](#def-ml1-17-svm-prediction)に代入して得点は $2(-1)-1=-3$、$2(1)-1=1$、$2(2)-1=3$。それぞれの符号から予測は $(-1,+1,+1)$。真のラベルを掛けると関数マージンは $(3,1,3)$。$\|w\|_2=2\ne0$ なので幾何マージンは $(3/2,1/2,3/2)$。方程式 $2x-1=0$ を解くと境界は $x=1/2$。例えば $x=1$ までの距離は $|1-1/2|=1/2$ と計算結果に一致する。
<!-- solution-end -->

### ML1-17-A02 ヒンジと0–1誤り
- Level: A

4点の符号付き得点が $(2,1,0.4,-0.5)$ である。経験ヒンジ損失、誤分類率、および上界の数値比較を行え（符号付き得点0はない）。

<!-- solution-start -->
#### 詳細解答

[訓練マージン表](#def-ml1-17-margin-audit)の式 $h_i=\max(0,1-t_i)$ に順に代入し $(0,0,0.6,1.5)$。平均は $(0+0+0.6+1.5)/4=2.1/4=0.525$。符号付き得点が負なのは第4点だけなので誤分類率は $1/4=0.25$。[ヒンジ上界](#thm-ml1-17-hinge-bound)の $0.25\le0.525$ が成り立つ。第3点は正分類だがヒンジ損失は正であり、二つの指標の違いが表れる。
<!-- solution-end -->

### ML1-17-A03 $C=1/4$ の2点モデル
- Level: A

$(-1,-1),(1,+1)$ を線形ソフトマージンで学習し $C=1/4$ とする。最適な $w$ の値、$b=0$ での両マージン、両ヒンジ損失、目的値を求めよ。

<!-- solution-start -->
#### 詳細解答

[対称2点の命題](#prop-ml1-17-two-point-path)の仮定を満たすので $w=\min(2\cdot1/4,1)=1/2$。$b=0$ でどちらも $t_i=y_i(wx_i)=1/2$。従ってヒンジ損失は各 $1-1/2=1/2$、和は1。目的関数は $\tfrac12(1/2)^2+(1/4)\cdot1=1/8+1/4=3/8$。誤分類はないが、両点で $t_i<1$ だからマージン制約を破っている。
<!-- solution-end -->

### ML1-17-A04 双対係数から点の位置
- Level: A

$C=1$ で最適双対係数がそれぞれ $\alpha=0$、$\alpha=1/3$、$\alpha=1$ となる3点について、KKTから必ず言える関数マージンの条件と、断言してはいけない逆向きの主張を述べよ。

<!-- solution-start -->
#### 詳細解答

[RKHS5のKKT分類](../../RKHS/RKHS5/index.md#prop-rkhs5-kkt-point-classification)を $C=1$ に適用する。$\alpha=0$ の点は $t\ge1$。$0<1/3<1$ の点は $t=1$。$\alpha=1=C$ の点は $t\le1$。ただし $t=1$ の点が必ず内点係数とは限らず、$\alpha=0$ や $\alpha=C$ も退化例では可能である。この表だけから $t=1$ と $\alpha>0$ の同値性は出ない。
<!-- solution-end -->

### ML1-17-B01 正則化経路を証明する
- Level: B

対称2点 $(-1,-1),(1,+1)$、$C>0$ について $b$ も未知数とする。全 $C$ に対する最適 $w_C$ を導出し、$C=1$ での目的値を求めよ。

<!-- solution-start -->
#### 詳細解答

得点に正解ラベルを掛けると2点の関数マージンは $w-b,w+b$。[ヒンジ損失](../../RKHS/RKHS5/index.md#def-rkhs5-hinge-loss)の凸性を中点へ用いると $\ell(w-b)+\ell(w+b)\ge2\ell(w)$、$b=0$ で等号。そこで $q_C(w)=w^2/2+2C\max(0,1-w)$ を最小化する。$w<1$ で $q_C'=w-2C$、$w>1$ で $q_C'=w$。$2C<1$ なら $w=2C<1$ で微分の符号が負から正へ変わる。$2C\ge1$ なら $w<1$ で非増加、$w>1$ で増加なので境目 $w=1$ が最適。従って $w_C=\min(2C,1)$、$b=0$ を選べる。$C=1$ では両マージンが1、ヒンジ損失が0、目的値は $1^2/2=1/2$。
<!-- solution-end -->

### ML1-17-B02 XORの核予測
- Level: B

$x=(\pm1,\pm1)$、$y=x_1x_2$、$\gamma=1$、$C=1/4$ とする。対称双対係数、訓練点の関数マージンと、未知点 $(1/2,-1/2)$ の得点と予測を求めよ。

<!-- solution-start -->
#### 詳細解答

[対称核SVMの命題](#prop-ml1-17-xor-score)に $\gamma=1,C=1/4$ を代入する。$\alpha_i=\min(1/4,1/8)=1/8$。4訓練点の関数マージンは $8(1/8)1^2=1$。得点式は $g(x)=8(1/8)x_1x_2=x_1x_2$。未知点で $g(1/2,-1/2)=-1/4<0$、予測は $-1$。訓練マージン1は未知点の正答を保証するものではない。
<!-- solution-end -->

### ML1-17-B03 分離不能性と零法線
- Level: B

同じ入力 $x_1=x_2=0$ にラベル $+1,-1$ を付ける。ハードマージンが不可能な理由を式で示し、ソフトマージン目的値の最小値と最適解の例を求め、幾何マージンの可否を論ぜよ。

<!-- solution-start -->
#### 詳細解答

ハードマージンの二制約は $b\ge1$ と $-b\ge1$ なので足すと $0\ge2$ となり不可能。ソフトマージンでは $J_C(w,b)=w^2/2+C[\max(0,1-b)+\max(0,1+b)]$。凸性または3区間 $b<-1$、$-1\le b\le1$、$b>1$ での直接計算により括弧は常に2以上で、中央区間では2である。よって $J_C\ge w^2/2+2C\ge2C$。$w=0,b=0$ はこれを達成し、$-1\le b\le1$ の全てで同じ最小値となる。$w=0$ では幾何マージン $t/\|w\|$ は未定義であり、$0/0$ を0と置いてはいけない。
<!-- solution-end -->

### ML1-17-B04 検証指標の違い
- Level: B

独立な検証3点のラベルが $(+1,-1,+1)$ で、候補Aの得点が $(2,-2,-0.2)$、候補Bの得点が $(0.8,-0.5,0.2)$ とする。両候補の平均ヒンジ損失と誤分類率を計算し、選択基準を変えると結論が変わるか述べよ。

<!-- solution-start -->
#### 詳細解答

ラベルを掛けた値はAで $(2,2,-0.2)$、Bで $(0.8,0.5,0.2)$。Aのヒンジ損失は $(0,0,1.2)$ なので平均 $1.2/3=0.4$、誤分類は第3点だけで $1/3$。Bは $(0.2,0.5,0.8)$ なので平均 $1.5/3=0.5$、誤分類は0。平均ヒンジを最小化する規則ならA、0–1誤りを最小化する規則ならBを選ぶ。指標は同じではない。[ML1-12の検証分割](../ML1-12/index.md#def-ml1-12-split)に従ってモデル選択後の性能測定には別のテスト標本を確保する。
<!-- solution-end -->

### ML1-17-C01 線形SVM・核SVM・検証を比較する
- Level: C

次の問いに全て答えよ。

1. $(-1,-1),(1,+1)$ と $C=1/8$ の線形ソフトマージン最適解 $(w,0)$、訓練ヒンジ損失の和、目的値、両双対係数を求めよ。
2. XORの4点 $x=(\pm1,\pm1)$、$y=x_1x_2$、核 $K_\gamma=(1+\gamma x^{\mathsf T}z)^2$ と $\gamma=1/2,C=1/4$ について、対称双対係数、4点のマージン、各ヒンジ損失、核判別得点 $g(2,-1)$ を求めよ。
3. 問1・問2で訓練誤分類が0でも、未知データの分類性能の大小を結論できない理由と検証手順を述べよ。

<!-- solution-start -->
#### 詳細解答

**1.** [2点の解](#prop-ml1-17-two-point-path)へ $C=1/8$ を代入すると $w=2C=1/4$。各 $t_i=1/4$ なのでヒンジは $3/4$、和は $3/2$。目的値は $\tfrac12(1/4)^2+(1/8)(3/2)=1/32+3/16=7/32$。両点の $y_ix_i=1$ なので、双対等式制約の下で同じ係数 $a$ を選ぶと $w=2a$。$a=1/8=C$ とすれば $w=1/4$、$t_i<1$ のKKT条件も満たす。

**2.** [XOR対称解](#prop-ml1-17-xor-score)に $\gamma=1/2$ を入れると $1/(8\gamma^2)=1/2$。従って各 $\alpha_i=\min(1/4,1/2)=1/4=C$。全訓練マージンは $8(1/4)(1/2)^2=1/2$、各ヒンジ損失は $1-1/2=1/2$。得点は $g(x)=\tfrac12 x_1x_2$ なので $g(2,-1)=-1$、予測は $-1$ である。

**3.** 問1の訓練点も問2のXORの4点も、関数マージンが正だから誤分類はない。しかし観測入力、ラベル生成規則、モデルの仮説クラスが異なる。0–1訓練誤りが等しい事実は母集団誤りや未知点の正解率の等式を含意しない。[ML1-12のモデル選択](../ML1-12/index.md#thm-ml1-12-independent-holdout)を参照し、共通の予測課題について訓練データでモデルを適合、独立な検証データで $C,\gamma$ と評価指標を選択し、最後に未使用の独立テストデータで確定モデルを一度評価する。テストに応じて再調整したら、そのテストはもはや独立な最終評価ではない。
<!-- solution-end -->

## まとめ

SVMの予測は得点の符号で行うが、境界からの余裕は[幾何マージン](../../RKHS/RKHS4/index.md#def-rkhs4-margin)で評価する。[ヒンジ損失](../../RKHS/RKHS5/index.md#def-rkhs5-hinge-loss)は誤分類だけでなく余裕の小さな正分類を罰し、その平均は訓練0–1誤りを上から押さえる。$C$ は正則化と違反の交換条件を、核の係数は特徴空間の形を変える。最適化の双対・KKTはRKHS4/5を根拠にし、この章では2点とXORを全計算した。訓練で余裕が増えても、汎化性能は独立な検証・テストで別に確かめる必要がある。
