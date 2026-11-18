# PML1-01 損失と物理エネルギーは何が同じで何が違うか

<!-- definition-example-audit: strict -->

## 1. 最小化する数はすべて「エネルギー」なのか

[経験リスクと損失](../../ML/ML1-01/index.md#def-ml1-01-risks)を小さくすれば、標本上で間違いの少ない予測器を選べる。一方、ばねを変形させたときには、変位によって物理的なエネルギーが変わる。どちらも実数を比較するが、それだけで両者を同一視してよいだろうか。

大きな違いは、**何を状態と呼ぶか、どの数に単位があるか、その数が何によって変わるか**である。最初の例では微分・熱力学極限は必要ない。有限個の候補に値を与え、最小化の意味を自分で確認する。

[微視的状態](../../../物理系/SM/SM1/index.md#def-sm1-micro-macro)は物理系の配置を表す。これに対し学習パラメータはデータに対する予測器を指定する。両者を同じ記号で書けても、意味が同じになるわけではない。

## 2. 状態とエネルギーの対応を定義する

ここでいう有限状態模型は、非空有限集合 $\Omega$ と、各状態 $s$ に実数を割り当てる写像の組である。物理模型なら、エネルギーの次元（Jなど）と、どの実験条件で模型を使うかも必要になる。

<a id="def-pml1-01-finite-energy"></a>

<!-- formal-statement-start -->
> **定義（有限状態のエネルギー模型）**  
> 非空有限集合 $\Omega$ と実数値関数
>
$$
E:\Omega\to\mathbb R
$$
>
> および正のエネルギー尺度 $E_*>0$ を指定した組を有限状態エネルギー模型と呼ぶ。物理的エネルギーを扱う場合、$E$ と $E_*$ は同じ単位を持つ。無次元エネルギーは
>
$$
e(s)=\frac{E(s)}{E_*}
$$
>
> である。有限集合なので、$E$ は最小値を少なくとも一つの状態で達成する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-01-finite-energy -->
**定義の確認**。一つのばねの変位を $q\in\{-1,0,1\}\,\mathrm m$ に制限し、ばね定数を $k=2\,\mathrm{J}/\mathrm m^2$ とする。弾性エネルギーを $E(q)=kq^2/2$ とすれば

| 変位 $q$ | $-1\,\mathrm m$ | $0\,\mathrm m$ | $1\,\mathrm m$ |
|---|---:|---:|---:|
| $E(q)$ | $1\,\mathrm J$ | $0\,\mathrm J$ | $1\,\mathrm J$ |
| $E(q)/(1\,\mathrm J)$ | 1 | 0 | 1 |

状態集合は非空有限、各状態へ値が一つ定まり、尺度 $E_*=1\,\mathrm J$ は正で単位も一致する。最小状態 $q=0$ も実際に存在する。これは連続的なばねの模型を三状態へ制限した例であり、三つの状態に均等な出現確率を与えたことにはならない。
<!-- definition-example-end -->

**絶対値には意味があるか**。同一条件下での状態の比較は $E(q)-E(q')$ によって行える。基準エネルギーを共通の定数だけずらしても差は変わらない。ただし外部場や拘束条件を変えて別の系にした場合まで「同じエネルギー関数」とは呼べない。

## 3. 学習の損失は観測データに依存する

学習では状態の代わりにパラメータ $\theta$ を選び、データ $D$ に対する予測誤差を測る。[損失関数](../../ML/ML1-01/index.md#def-ml1-01-loss)が個々の予測に値を与え、[経験リスク](../../ML/ML1-01/index.md#def-ml1-01-risks)がその平均を作る。まず訓練データを固定し、候補パラメータを有限個に絞る。

<a id="def-pml1-01-data-objective"></a>

<!-- formal-statement-start -->
> **定義（有限候補のデータ依存損失）**  
> 非空有限の候補集合 $\Theta$、非空の入力集合 $\mathcal X$ と目的値集合 $\mathcal Y$、整数 $n\ge1$ を指定する。各 $x_i\in\mathcal X$、$y_i\in\mathcal Y$ からなる長さ $n$ の観測列を
>
$
D=((x_i,y_i))_{i=1}^n
$
>
> と書く。各 $\theta\in\Theta$ に予測器 $f_\theta:\mathcal X\to\mathcal Y$ を対応させ、有限非負値の一観測損失関数 $\ell:\mathcal Y\times\mathcal Y\to[0,\infty)$ を指定する。経験損失を
>
$$
L_D(\theta)=\frac1n\sum_{i=1}^n\ell(f_\theta(x_i),y_i)
$$
>
> とする。単位を持つ量として使用するときは $\ell$ と $L_D$ の単位をそろえる。$D$ を変えたとき、同じ $\theta$ に対する $L_D(\theta)$ は一般に変わる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-01-data-objective -->
**定義の確認**。$\mathcal X=\mathcal Y=\mathbb R$（無次元の数値）、$\Theta=\{0,1,2\}$、$f_\theta(x)=\theta x$、$D=((1,1),(2,2))$、$\ell(\widehat y,y)=(\widehat y-y)^2/2$ とする。各 $f_\theta$ は実数から実数への写像で、損失はその予測値と観測値の差の二乗の半分なので、$\mathbb R\times\mathbb R$ 上で有限かつ非負である。

$$
\begin{aligned}
L_D(0)&=\frac12\left(\frac{(0-1)^2}{2}+\frac{(0-2)^2}{2}\right)=\frac54,\\
L_D(1)&=\frac12(0+0)=0,\\
L_D(2)&=\frac12\left(\frac{(2-1)^2}{2}+\frac{(4-2)^2}{2}\right)=\frac54.
\end{aligned}
$$

三つのパラメータは有限非空集合を作り、各項は有限非負である。最小値0を達成する $\theta=1$ が選ばれる。先のばねの変位 $q$ とこの $\theta$ は別の対象である。
<!-- definition-example-end -->

ここで別の標本 $D'=((1,1),(2,0))$ を用いると、同じ予測器の族であっても

$$
\begin{aligned}
L_{D'}(0)&=\frac12\left(\frac12+0\right)=\frac14,\\
L_{D'}(1)&=\frac12(0+2)=1,\\
L_{D'}(2)&=\frac12\left(\frac12+8\right)=\frac{17}{4}.
\end{aligned}
$$

最小化するパラメータは $\theta=0$ に変わった。データが違えば損失の比較も変わる。この事実から、**学習損失の最小点が物理系の平衡状態そのものである**とは導けない。

## 4. 正の倍率と共通の定数は最小点を変えない

有限個の数を比較するとき、単位を換えるためにすべて同じ正の倍率を掛けても順序は保たれる。ゼロ点を共通に動かす場合も同じである。まずこの限定された意味で、エネルギーと損失に共通する性質を証明する。

<a id="prop-pml1-01-affine-minimizers"></a>

<!-- formal-statement-start -->
> **命題（正のアフィン変換と最小化解）**  
> 非空有限集合 $S$、実数値関数 $F:S\to\mathbb R$、定数 $a>0,b\in\mathbb R$ を固定する。$\operatorname*{argmin}_{s\in S}F(s)$ は、$S$ の中で $F$ の最小値を達成する候補すべての集合を表す。$G(s)=aF(s)+b$ とすると、
>
$
\operatorname*{argmin}_{s\in S}G(s)=\operatorname*{argmin}_{s\in S}F(s).
$
>
> また任意の $s,t\in S$ について $G(s)-G(t)=a(F(s)-F(t))$ が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

任意の候補2個を取り、比較不等式の両辺に共通の $b$ を加え、正の数 $a$ を掛ける。逆向きも $a>0$ による除算で示す。

<!-- proof-start -->
### 証明

任意の $s,t\in S$ に対して

$$
G(s)\le G(t)
\iff aF(s)+b\le aF(t)+b
\iff F(s)\le F(t).
$$

最後の同値は $a>0$ だから成立する。$s$ が $F$ の最小点であるとは、すべての $t\in S$ に対して $F(s)\le F(t)$ ということなので、上の同値から $s$ が $G$ の最小点であることと一致する。差の公式は

$$
G(s)-G(t)=(aF(s)+b)-(aF(t)+b)=a(F(s)-F(t))
$$

であり、両方の $b$ が相殺される。
<!-- proof-end -->

**仮定を落とすと**、$a=0$ では $G$ が定数となり、$F$ が定数でなければ元の最小点以外も最小になる（$F$ が定数なら両者の最小点集合は一致する）。$a<0$ では $F$ の値の大小関係が逆転する。また $b=b(s)$ が候補に依存すれば相殺されない。例えば $F(0)=0,F(1)=1$ として $b(0)=2,b(1)=0$ とすると $F$ の最小点は0、$F+b$ の最小点は1になる。

## 5. データを足すことと、単位を換えることは違う

[正則化付き経験リスク](../../ML/ML1-03/index.md#def-ml1-03-regularized-erm)では、予測の誤りと、モデルの複雑さなどの代価を加える。物理量との対応を考える際も、足し算できるのは同じ単位へ直した量である。

損失 $L_D(\theta)$ とペナルティ $R(\theta)$ の数値を比較するには、係数 $\lambda$ と尺度を明示しなければならない。例えば長さの二乗で測った損失に、エネルギーをそのまま加えるのは次元の異なる量の加算である。必要な単位の係数を掛けるか、各々基準尺度で割って無次元化する。

<a id="def-pml1-01-scaled-objective"></a>

<!-- formal-statement-start -->
> **定義（尺度を明示した結合目的関数）**  
> 非空有限集合 $\Theta$ 上の非負関数 $L,R$ と、正の尺度 $L_*>0,R_*>0$、無次元の重み $\lambda\ge0$ を定める。無次元の結合目的関数を
>
> $$J_\lambda(\theta)=\frac{L(\theta)}{L_*}+\lambda\frac{R(\theta)}{R_*}$$
>
> とする。$L_*,R_*$ はそれぞれ $L,R$ と同じ単位を持つ。$\lambda=0$ なら第2項は寄与しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-01-scaled-objective -->
**定義の確認**。$\Theta=\{0,1\}$ とし、$L(0)=1\,\mathrm m^2,L(1)=2\,\mathrm m^2$、$R(0)=4\,\mathrm J,R(1)=0\,\mathrm J$、$L_*=1\,\mathrm m^2,R_*=2\,\mathrm J,\lambda=1$ とする。

$$
J_1(0)=\frac{1\,\mathrm m^2}{1\,\mathrm m^2}+\frac{4\,\mathrm J}{2\,\mathrm J}=3,\qquad
J_1(1)=\frac{2\,\mathrm m^2}{1\,\mathrm m^2}+\frac{0\,\mathrm J}{2\,\mathrm J}=2.
$$

各比は無次元、尺度は正、両関数は非負である。結合目的は $\theta=1$ を選ぶが、$L$ 単独の最小点は $\theta=0$ である。何を重く評価するかという設計判断が結論を変えた。
<!-- definition-example-end -->

重みを変えても最小点が変わらないとは限らない。その切替え条件は有限候補なら明示できる。

<a id="prop-pml1-01-weight-threshold"></a>

<!-- formal-statement-start -->
> **命題（二候補の重み切替え条件）**  
> $\Theta=\{0,1\}$ とし、上の結合目的について
> 四つの無次元値を
>
$$
\begin{aligned}
a_0&=L(0)/L_*,&a_1&=L(1)/L_*,\\
r_0&=R(0)/R_*,&r_1&=R(1)/R_*
\end{aligned}
$$
>
> と書く。$a_0<a_1$ かつ $r_0>r_1$ と仮定し
>
> $$\lambda_*=\frac{a_1-a_0}{r_0-r_1}>0$$
>
> とおく。$0\le\lambda<\lambda_*$ では0が唯一の最小点、$\lambda=\lambda_*$ では両方が最小点、$\lambda>\lambda_*$ では1が唯一の最小点となる。
<!-- formal-statement-end -->

### 証明の見取り図

二候補の目的値を引き算し、係数 $\lambda$ の一次式の符号を調べる。

<!-- proof-start -->
### 証明

定義を代入すると

$$
J_\lambda(0)-J_\lambda(1)
=(a_0-a_1)+\lambda(r_0-r_1)
=(r_0-r_1)(\lambda-\lambda_*).
$$

仮定から $r_0-r_1>0$ なので、差の符号は $\lambda-\lambda_*$ の符号に等しい。差が負なら0の目的値が小さく、ゼロなら同点、正なら1の目的値が小さい。候補は二つしかないので、それぞれ述べた最小点の集合となる。
<!-- proof-end -->

## 6. 温度の単位を消してから指数を取る

物理的な絶対温度 $T$ は正の温度尺度であり、[絶対温度の導入](../../../物理系/TH/TH3/index.md#def-th3-absolute-temperature)で学ぶ量である。ここでは温度から作るエネルギー尺度 $\tau=k_{\mathrm B}T$ を考える。$k_{\mathrm B}$ はBoltzmann定数で単位は $\mathrm J/\mathrm K$、$T$ は $\mathrm K$、従って $\tau$ は $\mathrm J$ である。

指数関数の入力は無次元でなければならない。物理的なエネルギー $E(s)$ なら $E(s)/\tau$ を使う。学習損失が無次元なら、同じ形 $e^{-L_D(\theta)/\tau_{\mathrm{alg}}}$ を書いても、$\tau_{\mathrm{alg}}>0$ は**人工的な無次元の尺度**であって、そのまま物理的な温度と呼ぶことはできない。

<a id="def-pml1-01-temperature-scale"></a>

<!-- formal-statement-start -->
> **定義（有限状態の指数重みと温度尺度）**  
> 非空有限集合 $S$ と実数値関数 $F:S\to\mathbb R$、$F$ と同じ単位を持つ正の尺度 $\tau>0$ に対し
>
> $$w_\tau(s)=\exp\left(-\frac{F(s)}{\tau}\right)$$
>
> を指数重みと呼ぶ。$F/\tau$ は無次元であり、$w_\tau(s)>0$ である。重みは確率ではなく、確率として用いるには全状態の和で割る必要がある。物理の場合 $\tau=k_{\mathrm B}T$、学習の損失の場合は別途選んだ人工的な尺度を用いる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-01-temperature-scale -->
**定義の確認**。第2節のばねの三状態で $\tau=1\,\mathrm J$ とすると $w_\tau(-1\,\mathrm m)=e^{-1}$、$w_\tau(0)=1$、$w_\tau(1\,\mathrm m)=e^{-1}$。すべて正で、指数の入力は $\mathrm J/\mathrm J=1$ である。これらの和は $1+2e^{-1}$ であり、一般に1ではない。次講ではこの和で割る操作の意味を系統的に調べる。
<!-- definition-example-end -->

**尺度を変えたときの注意**。元の関数 $F$ と尺度 $\tau$ に対して、変換後の関数を $\widetilde F=aF+b$、尺度を $\widetilde\tau=a\tau$ と書く。ここで $a>0$ は無次元、$b$ は $F$ と同じ単位の定数とする。$\widetilde F$ は微分ではなく、変換後の関数を表す。変換後の重みを $\widetilde w_{\widetilde\tau}(s)=\exp(-\widetilde F(s)/\widetilde\tau)$ と定義すると、

$
\begin{aligned}
\widetilde w_{\widetilde\tau}(s)
&=\exp\left(-\frac{aF(s)+b}{a\tau}\right)\\
&=\exp\left(-\frac{b}{a\tau}\right)w_\tau(s).
\end{aligned}
$

したがって $s,t\in S$ について共通因子が約分され、

$
\frac{\widetilde w_{\widetilde\tau}(s)}{\widetilde w_{\widetilde\tau}(t)}
=\frac{w_\tau(s)}{w_\tau(t)}
=\exp\left(-\frac{F(s)-F(t)}{\tau}\right).
$

一方、$F$ だけを $aF+b$ に変え尺度 $\tau$ を固定すると、変換後の重み比は $\exp(-a(F(s)-F(t))/\tau)$ となり、一般には元の比と異なる。**最小点が同じこと**と、**重みの比が同じこと**は別の主張である。

## 7. 類比が成立する条件と破綻する場所

| 比較する点 | 物理エネルギー $E(s)$ | 学習の損失 $L_D(\theta)$ |
|---|---|---|
| 入力となるもの | 系の状態 $s$ と物理的条件 | パラメータ $\theta$ と訓練データ $D$ |
| 量の単位 | 通常は J などのエネルギー単位 | 無次元の場合も、測定量の単位を持つ場合もある |
| 最小化 | 指定した模型内で最小状態を求める | 指定したデータ・候補内で最小損失を求める |
| 温度の解釈 | $k_{\mathrm B}T$ が物理的なエネルギー尺度 | 人工的な尺度には物理的温度の意味は自動で付かない |
| 確率との関係 | 状態の最小値だけで分布は決まらない | 損失の最小値だけで学習器の標本分布は決まらない |

有限集合で値を比較する代数は共通する。しかし物理的な平衡や熱浴との接触は、単に目的関数が小さいというだけでは成立しない。後続講義で導く状態の確率法則・正規化・自由エネルギーの議論には、状態・尺度・確率という追加の構造が必要になる。

## 演習

### PML1-01-A01 ばねの三状態と無次元化
- Level: A
- 目安時間: 10分

$S=\{-2,0,1\}\,\mathrm m$、$k=2\,\mathrm J/\mathrm m^2$、$E(q)=kq^2/2$ とする。全状態のエネルギー、$E_*=2\,\mathrm J$ による無次元エネルギー、最小状態を求めよ。

<!-- solution-start -->
#### 詳細解答

[有限状態のエネルギー模型](#def-pml1-01-finite-energy)から、$q^2$ に $k/2=1\,\mathrm J/\mathrm m^2$ を掛ける。

$$
E(-2\,\mathrm m)=4\,\mathrm J,\quad E(0)=0,\quad E(1\,\mathrm m)=1\,\mathrm J.
$$

$E/E_*$ は順に $2,0,1/2$ で、すべて無次元である。三つの値のうち最小は0、達成状態は $q=0$ のみ。
<!-- solution-end -->

### PML1-01-A02 二観測の経験損失
- Level: A
- 目安時間: 10分

$f_\theta(x)=\theta x$、$\Theta=\{0,1\}$、$D=((1,2),(2,2))$、$\ell(\widehat y,y)=(\widehat y-y)^2/2$ とする。$L_D(0)$ と $L_D(1)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

[経験損失の定義](#def-pml1-01-data-objective)へ二観測を代入する。$\theta=0$ では予測は $(0,0)$、$\theta=1$ では $(1,2)$。

$$
L_D(0)=\frac12\left(\frac{(0-2)^2}{2}+\frac{(0-2)^2}{2}\right)=2,
$$

$$
L_D(1)=\frac12\left(\frac{(1-2)^2}{2}+\frac{(2-2)^2}{2}\right)=\frac14.
$$

従って候補中の最小点は $\theta=1$。
<!-- solution-end -->

### PML1-01-A03 共通の基準点を動かす
- Level: A
- 目安時間: 10分

$F(0)=2,F(1)=5$、$G=3F-7$ とする。二候補の $G$ の値と最小点を求め、$G(1)-G(0)$ も計算せよ。

<!-- solution-start -->
#### 詳細解答

$G(0)=3\cdot2-7=-1$、$G(1)=3\cdot5-7=8$。最小点は0であり、[正のアフィン変換と最小化解](#prop-pml1-01-affine-minimizers)と一致する。差は $8-(-1)=9$。元の差 $5-2=3$ を3倍しても9となる。
<!-- solution-end -->

### PML1-01-A04 絶対温度と人工尺度
- Level: A
- 目安時間: 10分

$E(0)=0\,\mathrm J,E(1)=2\,\mathrm J,\tau=1\,\mathrm J$ の指数重みを求めよ。続いて無次元の損失 $L(0)=0,L(1)=2$ を用いる場合、指数の分母に何の単位を選ぶべきか述べよ。

<!-- solution-start -->
#### 詳細解答

[指数重みの定義](#def-pml1-01-temperature-scale)を使うと $w_\tau(0)=e^0=1,w_\tau(1)=e^{-2}$ で、指数はどちらも無次元である。無次元損失の場合、分母 $\tau_{\mathrm{alg}}$ も正の無次元の数にする必要がある。$\tau_{\mathrm{alg}}=1$ なら重みは同じ数値になるが、$1\,\mathrm J$ や物理的絶対温度 $T$ と同じ意味だとはいえない。
<!-- solution-end -->

### PML1-01-B01 倍率の符号が仮定に必要な理由
- Level: B
- 目安時間: 15分

$F(0)=0,F(1)=1,F(2)=2$ とする。$G_a(s)=aF(s)+4$ について $a=2,0,-1$ の最小点をそれぞれ求め、正の倍率の条件の役割を説明せよ。

<!-- solution-start -->
#### 詳細解答

$a=2$ なら $(G_a(0),G_a(1),G_a(2))=(4,6,8)$ で最小点は0。$a=0$ なら $(4,4,4)$ となり全状態が最小点。$a=-1$ なら $(4,3,2)$ で最小点は2。正の倍率では大小関係が保たれ、ゼロでは差が消え、負では大小関係が逆になる。[正のアフィン変換と最小化解](#prop-pml1-01-affine-minimizers)の $a>0$ を捨てられない。
<!-- solution-end -->

### PML1-01-B02 物理量と損失を結ぶ尺度
- Level: B
- 目安時間: 20分

$L(0)=1\,\mathrm m^2,L(1)=2\,\mathrm m^2$、$R(0)=4\,\mathrm J,R(1)=0\,\mathrm J$ とし、$L_*=1\,\mathrm m^2,R_*=2\,\mathrm J$ を用いる。$J_\lambda$ の最小点が切り替わる $\lambda$ を求め、$\lambda=0,1/4,1/2$ で比較せよ。

<!-- solution-start -->
#### 詳細解答

[尺度を明示した結合目的関数](#def-pml1-01-scaled-objective)より $J_\lambda(0)=1+2\lambda,J_\lambda(1)=2$。従って

$$
J_\lambda(0)-J_\lambda(1)=-1+2\lambda.
$$

[二候補の切替え命題](#prop-pml1-01-weight-threshold)では $a_1-a_0=1$、$r_0-r_1=2$ なので $\lambda_*=1/2$。$\lambda=0$ では $(1,2)$ で0が唯一の最小点、$\lambda=1/4$ では $(3/2,2)$ で0が唯一、$\lambda=1/2$ では $(2,2)$ で同点となる。各加数は無次元である。
<!-- solution-end -->

### PML1-01-B03 同じ最小点でも重みは違う
- Level: B
- 目安時間: 20分

二状態 $S=\{0,1\}$、無次元関数 $F(0)=0,F(1)=2$、尺度 $\tau=1$ とする。変換後の関数 $\widetilde F=3F+5$ を考える。変換後の尺度を $\widetilde\tau=3$ に変更した場合と、$\widetilde\tau=1$ に固定した場合の変換後の重み比 $\widetilde w_{\widetilde\tau}(1)/\widetilde w_{\widetilde\tau}(0)$ を求め、最小点との関係を説明せよ。

<!-- solution-start -->
#### 詳細解答

[指数重みの定義](#def-pml1-01-temperature-scale)では、同じ正の尺度を持つ二状態の重みを割ると指数の差に帰着する。元の関数では

$
\frac{w_\tau(1)}{w_\tau(0)}
=\exp\left(-\frac{F(1)-F(0)}{\tau}\right)
=\exp\left(-\frac{2-0}{1}\right)=e^{-2}.
$

変換後の関数値は $\widetilde F(0)=5$、$\widetilde F(1)=11$ である。変換後の尺度をそれぞれ指定すると、

$
\begin{aligned}
\frac{\widetilde w_3(1)}{\widetilde w_3(0)}
&=\exp\left(-\frac{11-5}{3}\right)=e^{-2},\\
\frac{\widetilde w_1(1)}{\widetilde w_1(0)}
&=\exp\left(-\frac{11-5}{1}\right)=e^{-6}.
\end{aligned}
$

どちらの場合も [正のアフィン変換と最小化解](#prop-pml1-01-affine-minimizers)により最小点は0のままである。重みの比は最小点だけから決まらず、関数値の差と尺度の比から決まる。
<!-- solution-end -->

### PML1-01-B04 データ変更による最小点の逆転
- Level: B
- 目安時間: 20分

第3節の $\Theta=\{0,1,2\}$、$f_\theta(x)=\theta x$、二乗損失を用いる。$D=((1,1),(2,2))$ と $D'=((1,1),(2,0))$ についてそれぞれ三候補の経験損失を計算し、「同一の物理エネルギー関数の基準を変えただけ」という説明が成立するか検査せよ。

<!-- solution-start -->
#### 詳細解答

[経験損失の定義](#def-pml1-01-data-objective)から、$D$ では

$$
(L_D(0),L_D(1),L_D(2))=(5/4,0,5/4).
$$

$D'$ では各候補の二つの一観測損失が、順に $(1/2,0)$、$(0,2)$、$(1/2,8)$ となる。平均を取って

$$
(L_{D'}(0),L_{D'}(1),L_{D'}(2))=(1/4,1,17/4).
$$

最小点は $D$ で1、$D'$ で0。[正のアフィン変換と最小化解](#prop-pml1-01-affine-minimizers)から、共通の正倍率と定数の変更なら最小点は変わらない。従って標本の変更は、単なる共通基準の移動では説明できない。
<!-- solution-end -->

### PML1-01-C01 物理的温度と学習目的を統合して吟味する
- Level: C
- 目安時間: 35分

$\Theta=\{0,1\}$ とし、無次元の訓練損失 $L_D(0)=1,L_D(1)=2$、物理的エネルギー $E(0)=4\,\mathrm J,E(1)=0\,\mathrm J$ を持つ二つの候補を考える。$L_*=1,E_*=2\,\mathrm J$、$\lambda\ge0$ により $J_\lambda=L_D/L_*+\lambda E/E_*$ と定める。

1. 各 $\theta$ の $J_\lambda$ を求め、すべての $\lambda\ge0$ で最小点を決定せよ。
2. $L_D$ を $2L_D+3$ に置き換えたが $E,E_*,L_*,\lambda$ は固定した場合、元の最小点が一般に保たれるか、$\lambda=3/4$ を使って検査せよ。
3. $E$ の正規化されていない指数重みを $\tau=1\,\mathrm J$ で計算し、比 $w(1)/w(0)$ を求めよ。得た重みが「学習の標本分布」と同一と断言できない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

**1.** [尺度を明示した結合目的関数](#def-pml1-01-scaled-objective)に各比を入れる。

$$
J_\lambda(0)=1+\lambda\frac{4\,\mathrm J}{2\,\mathrm J}=1+2\lambda,\qquad
J_\lambda(1)=2+\lambda\frac0{2\,\mathrm J}=2.
$$

差は $J_\lambda(0)-J_\lambda(1)=2\lambda-1$ なので、$0\le\lambda<1/2$ は0だけ、$\lambda=1/2$ は両方、$\lambda>1/2$ は1だけが最小となる。

**2.** 置換後の目的関数は $\widetilde L_D=2L_D+3$ を使うので、

$
\begin{aligned}
\widetilde J_\lambda(0)&=\frac{2\cdot1+3}{1}+\lambda\frac{4\,\mathrm J}{2\,\mathrm J}=5+2\lambda,\\
\widetilde J_\lambda(1)&=\frac{2\cdot2+3}{1}+\lambda\frac{0\,\mathrm J}{2\,\mathrm J}=7.
\end{aligned}
$

両値が等しい条件は $5+2\lambda=7$、すなわち $\lambda=1$ に変わる。特に $\lambda=3/4$ では

$
(J_{3/4}(0),J_{3/4}(1))=(5/2,2),\qquad
(\widetilde J_{3/4}(0),\widetilde J_{3/4}(1))=(13/2,7).
$

元の目的は1を選び、新目的は0を選ぶ。[正のアフィン変換と最小化解](#prop-pml1-01-affine-minimizers)は**目的関数全体**を同じ正倍率で変換する場合の主張である。今回は損失成分だけを変えてエネルギー成分は固定したため、命題の仮定には当たらない。

**3.** [指数重みの定義](#def-pml1-01-temperature-scale)から $w(0)=e^{-4},w(1)=1$。従って $w(1)/w(0)=e^4$。これは指定された物理的エネルギーと $\tau$ から計算した重みの比である。学習パラメータをどう標本抽出するか、あるいは訓練データ $D$ を確率的にどう得るかは別途定義する必要がある。最小化や重みの形の一致だけでは学習器の確率法則を特定できない。
<!-- solution-end -->

---

## 次に進む

有限状態でエネルギー・損失・尺度・重みを区別できた。次の **PML1-02** では指数重みを全状態で正規化した確率分布を構成し、二状態の期待値と温度微分を導く。
