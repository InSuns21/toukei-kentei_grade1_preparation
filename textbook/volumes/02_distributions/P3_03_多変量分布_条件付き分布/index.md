# P3-03 多変量分布・条件付き分布

本章は [統計教材 共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md) に従います。多変量正規分布の密度、特異な場合の定義、条件付き分布の公式は本文で導出し、演習では各設問に必要な出発点を問題文付近へ再掲します。

## この章で解けるようになる問題

平均ベクトルと分散共分散行列から線形結合の分布を求め、多変量正規の周辺・条件付き分布をブロック行列で計算します。相関と偏相関、無相関と独立、Mahalanobis二次形式を、行列の次元と正定値条件を明記して25分答案へまとめます。

## 公式出題範囲との対応

| 範囲 | 主な問題 |
|---|---|
| 平均・共分散・相関行列 | P3M-A01, A02, B01 |
| 多変量正規・線形変換・周辺 | P3M-A03, B01, C04 |
| 条件付き分布 | P3M-B02, C01, C02, D01 |
| 独立性 | P3M-B03, C05 |
| 偏相関 | P3M-A04, C03 |
| 二次形式 | P3M-B04, C04, P3M-DRILL-01 |

## 前提知識チェック

1. F0-01: 行列積の次元、逆行列、正定値性を確認する。
2. P2-02: 分散和と共分散の双線形性を使う。
3. P2-01: 同時確率密度関数から周辺・条件付き確率密度関数を作る。
4. P3-02: 一変量正規の標準化とモーメント母関数を使う。
5. P1-02: 独立性と条件付き確率の定義を区別する。

## 学習目標

- $A\boldsymbol X+\boldsymbol b$の平均・共分散を次元付きで求める。
- 正定値な分散共分散行列と半正定値な分散共分散行列を区別する。
- 条件付き正規分布の平均と、条件付き共分散$\Sigma_{11}-\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}$（Schur補）を再現する。
- 偏相関を「第三変数の線形効果を除いた残差の相関」と説明する。
- 二次形式を標準正規の平方和へ変換する。

合格基準はLevel B 85%以上、Level C 70%以上、30分ドリル70点以上です。


---

# 1. 動機と試験での位置づけ

複数の測定値を同時に扱うと、各変数の分散だけでなく「一緒に動く方向」が重要です。分散共分散行列はその方向を表し、多変量正規分布では線形変換・周辺化・条件付けが閉じた形で計算できます。この構造は回帰、分散分析、時系列、主成分分析の共通基盤です。

本番では公式の添字事故が大きな失点になります。条件付き平均の係数は$\Sigma_{12}\Sigma_{22}^{-1}$、条件付き共分散は$\Sigma_{11}-\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}$です。暗記だけでなく、各ブロックの次元を横に書いて検算します。

また「共分散0なら独立」は一般には偽です。多変量正規という仮定があるときだけ使えることを、答案の結論に必ず添えます。


---

# 2. 定義と記法

列ベクトルを用います。転置は$\mathsf T$、$p$次単位行列は$I_p$です。

## P3M-DEF-01 確率ベクトルと分散共分散行列

$\boldsymbol X=(X_1,\ldots,X_p)^{\mathsf T}$の各成分が二乗可積分であるとします。平均ベクトルと分散共分散行列を
$$
\boldsymbol\mu=E[\boldsymbol X]\in\mathbb R^p,
\qquad
\boldsymbol\Sigma
=E[(\boldsymbol X-\boldsymbol\mu)(\boldsymbol X-\boldsymbol\mu)^{\mathsf T}]
\in\mathbb R^{p\times p}
$$
と定めます。$(i,j)$成分は$\operatorname{Cov}(X_i,X_j)$です。$\boldsymbol\Sigma$は対称半正定値であり、特異でも構いません。

## P3M-DEF-02 相関行列と偏相関

全成分の分散が正とします。$D=\operatorname{diag}(\sigma_1^2,\ldots,\sigma_p^2)$ と置くと相関行列は
$$
R=D^{-1/2}\boldsymbol\Sigma D^{-1/2},
\qquad R_{ij}=\rho_{ij}.
$$

$X_i,X_j$から残りの変数への最良線形予測を引いた残差の相関を、残りを制御した偏相関といいます。三変数では、各分散が正で相関行列が正定値なら
$$
\rho_{12\cdot3}
=\frac{\rho_{12}-\rho_{13}\rho_{23}}
{\sqrt{(1-\rho_{13}^2)(1-\rho_{23}^2)}}.
$$

## P3M-DEF-03 多変量正規分布

$\boldsymbol X\in\mathbb R^p$が、任意の$\boldsymbol a\in\mathbb R^p$について$\boldsymbol a^{\mathsf T}\boldsymbol X$が退化を許す一変量正規分布に従うとき
$$
\boldsymbol X\sim N_p(\boldsymbol\mu,\boldsymbol\Sigma)
$$
と書きます。ここで$\boldsymbol\Sigma$は半正定値です。

$\boldsymbol\Sigma$が正定値のときに限り、$p$次元空間で通常の体積$d\boldsymbol x$に関する密度は
$$
f(\boldsymbol x)=
\frac{1}{(2\pi)^{p/2}|\boldsymbol\Sigma|^{1/2}}
\exp\left\{-\frac12
(\boldsymbol x-\boldsymbol\mu)^{\mathsf T}
\boldsymbol\Sigma^{-1}
(\boldsymbol x-\boldsymbol\mu)\right\},
\quad\boldsymbol x\in\mathbb R^p.
$$
正規化も、平均を引いて共分散が単位行列になるように線形変換する操作（白色化）で確認できます。$LL^{\mathsf T}=\boldsymbol\Sigma$を満たす可逆$L$を取り、$\boldsymbol z=L^{-1}(\boldsymbol x-\boldsymbol\mu)$と置くと、ヤコビアンは
$$
d\boldsymbol x=|\det L|d\boldsymbol z
=|\det\boldsymbol\Sigma|^{1/2}d\boldsymbol z
$$
です。密度積分は独立標準正規$p$個の積密度の積分へ戻るため1です。

特異な場合は、ある線形制約を必ず満たして低次元の平面上に集中するため、この$p$次元密度式は使えません。

## P3M-DEF-04 条件付き密度

連続確率ベクトル$(\boldsymbol X,\boldsymbol Y)$の同時密度を$f_{\boldsymbol X,\boldsymbol Y}$、周辺密度を$f_{\boldsymbol Y}$とします。$f_{\boldsymbol Y}(\boldsymbol y)>0$のとき
$$
f_{\boldsymbol X\mid\boldsymbol Y}
(\boldsymbol x\mid\boldsymbol y)
=\frac{f_{\boldsymbol X,\boldsymbol Y}(\boldsymbol x,\boldsymbol y)}
{f_{\boldsymbol Y}(\boldsymbol y)}.
$$
長さ・面積・体積が0の例外集合上で密度の値を変更しても、積分で求める確率は変わりません。したがって条件付き密度の式も、そのような例外点を除いて一致すれば同じ分布を表します。

## P3M-DEF-05 二次形式とMahalanobis距離

対称行列$A\in\mathbb R^{p\times p}$に対する$\boldsymbol X^{\mathsf T}A\boldsymbol X$を二次形式といいます。正定値な$\boldsymbol\Sigma$に対し
$$
Q=(\boldsymbol X-\boldsymbol\mu)^{\mathsf T}
\boldsymbol\Sigma^{-1}(\boldsymbol X-\boldsymbol\mu)
$$
をMahalanobis二次形式と呼びます。単位や相関を除いた中心からの距離の二乗です。


---

# 3. 基本命題と主要定理

本章の定理では$p\in\mathbb N$、$\boldsymbol\mu\in\mathbb R^p$、$\boldsymbol\Sigma\in\mathbb R^{p\times p}$とする。$N_p(\boldsymbol\mu,\boldsymbol\Sigma)$は$p$変量正規分布である。$\boldsymbol\Sigma$が正定値なら、その密度は
$$
f(\boldsymbol x)=
\frac{\exp\{-\tfrac12(\boldsymbol x-\boldsymbol\mu)^{\mathsf T}\boldsymbol\Sigma^{-1}(\boldsymbol x-\boldsymbol\mu)\}}
{(2\pi)^{p/2}|\boldsymbol\Sigma|^{1/2}},
\qquad \boldsymbol x\in\mathbb R^p.
$$
特異な場合はこの密度式を使わず、「全ての線形結合が一変量正規」という`02_definitions.md`の定義を使う。

## P3M-THM-01 平均・共分散の定数項を含む線形変換

$A\in\mathbb R^{q\times p}$、$\boldsymbol b\in\mathbb R^q$とします。$\boldsymbol Y=A\boldsymbol X+\boldsymbol b$の形の変換を、定数項を含む線形変換（アフィン変換）といいます。このとき
$$
E[\boldsymbol Y]=A\boldsymbol\mu+\boldsymbol b,
\qquad
\operatorname{Cov}(\boldsymbol Y)=A\boldsymbol\Sigma A^{\mathsf T}.
$$
実際、
$
\begin{aligned}
\boldsymbol Y-E[\boldsymbol Y]
&=A\boldsymbol X+\boldsymbol b-
\{A E[\boldsymbol X]+\boldsymbol b\}\\
&=A(\boldsymbol X-\boldsymbol\mu).
\end{aligned}
$
したがって
$
\begin{aligned}
\operatorname{Cov}(\boldsymbol Y)
&=E\left[(\boldsymbol Y-E[\boldsymbol Y])(\boldsymbol Y-E[\boldsymbol Y])^{\mathsf T}\right]\\
&=E\left[A(\boldsymbol X-\boldsymbol\mu)(\boldsymbol X-\boldsymbol\mu)^{\mathsf T}A^{\mathsf T}\right]\\
&=A\boldsymbol\Sigma A^{\mathsf T}.
\end{aligned}
$任意の$\boldsymbol a\in\mathbb R^p$に対し
$$
\boldsymbol a^{\mathsf T}\boldsymbol\Sigma\boldsymbol a
=\operatorname{Var}(\boldsymbol a^{\mathsf T}\boldsymbol X)\geq0
$$
なので、分散共分散行列は半正定値です。

## P3M-THM-02 多変量正規のアフィン変換と周辺分布

$\boldsymbol X\sim N_p(\boldsymbol\mu,\boldsymbol\Sigma)$なら
$$
A\boldsymbol X+\boldsymbol b
\sim N_q(A\boldsymbol\mu+\boldsymbol b,A\boldsymbol\Sigma A^{\mathsf T}).
$$
右辺は特異でもよいものとします。任意の$\boldsymbol c\in\mathbb R^q$について$\boldsymbol c^{\mathsf T}(A\boldsymbol X+\boldsymbol b)=(A^{\mathsf T}\boldsymbol c)^{\mathsf T}\boldsymbol X+\boldsymbol c^{\mathsf T}\boldsymbol b$が正規なので、定義から従います。

特に成分を選ぶ行列$A$を使えば、任意の部分ベクトルの周辺分布は、対応する平均部分ベクトルと共分散主部分行列を持つ多変量正規分布です。モーメント母関数は全$\boldsymbol t\in\mathbb R^p$で
$$
M_{\boldsymbol X}(\boldsymbol t)
=\exp\left(\boldsymbol t^{\mathsf T}\boldsymbol\mu
+\frac12\boldsymbol t^{\mathsf T}\boldsymbol\Sigma\boldsymbol t\right).
$$
実際、
$
W=\boldsymbol t^{\mathsf T}\boldsymbol X
\sim N\left(\boldsymbol t^{\mathsf T}\boldsymbol\mu,
\boldsymbol t^{\mathsf T}\boldsymbol\Sigma\boldsymbol t\right).
$
一変量正規分布 $N(m,v)$ のモーメント母関数 $E[e^{sW}]=\exp(ms+vs^2/2)$ に $s=1$、$m=\boldsymbol t^{\mathsf T}\boldsymbol\mu$、$v=\boldsymbol t^{\mathsf T}\boldsymbol\Sigma\boldsymbol t$ を代入すると
$
M_{\boldsymbol X}(\boldsymbol t)
=E[e^W]
=\exp\left(\boldsymbol t^{\mathsf T}\boldsymbol\mu
+\frac12\boldsymbol t^{\mathsf T}\boldsymbol\Sigma\boldsymbol t\right)
$
を得ます。

## P3M-THM-03 多変量正規の条件付き分布

$$
\begin{pmatrix}\boldsymbol X_1\\\boldsymbol X_2\end{pmatrix}
\sim N_{p+q}\left(
\begin{pmatrix}\boldsymbol\mu_1\\\boldsymbol\mu_2\end{pmatrix},
\begin{pmatrix}
\Sigma_{11}&\Sigma_{12}\\
\Sigma_{21}&\Sigma_{22}
\end{pmatrix}
\right)
$$
とし、全分散共分散行列を正定値とします。すると$\Sigma_{22}$は可逆で、任意の$\boldsymbol x_2\in\mathbb R^q$に対する条件付き分布は
$$
\boldsymbol X_1\mid(\boldsymbol X_2=\boldsymbol x_2)
\sim N_p(\boldsymbol\mu_{1\mid2},\Sigma_{1\mid2}),
$$
$$
\boldsymbol\mu_{1\mid2}
=\boldsymbol\mu_1+\Sigma_{12}\Sigma_{22}^{-1}
(\boldsymbol x_2-\boldsymbol\mu_2),
$$
$$
\Sigma_{1\mid2}
=\Sigma_{11}-\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}.
$$
次元は$\Sigma_{12}:p\times q$、$\Sigma_{22}^{-1}:q\times q$、$\Sigma_{1\mid2}:p\times p$です。$\Sigma_{1\mid2}$はSchur補行列で正定値です。

### 証明

$B=\Sigma_{12}\Sigma_{22}^{-1}$、
$$
\boldsymbol R=\boldsymbol X_1-\boldsymbol\mu_1
-B(\boldsymbol X_2-\boldsymbol\mu_2)
$$
と置きます。定数項を含む線形変換をしても正規分布であることから、$(\boldsymbol R,\boldsymbol X_2)$の結合分布は多変量正規（同時正規）で、
$$
\operatorname{Cov}(\boldsymbol R,\boldsymbol X_2)
=\Sigma_{12}-B\Sigma_{22}=0.
$$
従って両者は独立です。また
$$
\begin{aligned}
\operatorname{Cov}(\boldsymbol R)
&=\Sigma_{11}-\Sigma_{12}B^{\mathsf T}-B\Sigma_{21}
+B\Sigma_{22}B^{\mathsf T}\\
&=\Sigma_{11}-\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}
=\Sigma_{1\mid2}.
\end{aligned}
$$
恒等式$\boldsymbol X_1=\boldsymbol\mu_1+B(\boldsymbol X_2-\boldsymbol\mu_2)+\boldsymbol R$で$\boldsymbol X_2=\boldsymbol x_2$を固定し、独立な$\boldsymbol R\sim N_p(\boldsymbol0,\Sigma_{1\mid2})$を加えれば条件付き公式を得ます。

Schur補の正定値性も全分散共分散行列の正定値性から従います。任意の$\boldsymbol a\neq\boldsymbol0$に対し
$$
\boldsymbol v=
\begin{pmatrix}
\boldsymbol a\\-\Sigma_{22}^{-1}\Sigma_{21}\boldsymbol a
\end{pmatrix}\neq\boldsymbol0
$$
と置けば、ブロック積を展開して
$$
\boldsymbol v^{\mathsf T}\boldsymbol\Sigma\boldsymbol v
=\boldsymbol a^{\mathsf T}\Sigma_{1\mid2}\boldsymbol a>0.
$$
従って$\Sigma_{1\mid2}$は正定値です。

二変量正規で標準偏差$\sigma_X,\sigma_Y>0$、相関$\rho$なら
$$
Y\mid(X=x)\sim N\left(
\mu_Y+\rho\frac{\sigma_Y}{\sigma_X}(x-\mu_X),
\sigma_Y^2(1-\rho^2)
\right).
$$

## P3M-THM-04 多変量正規における無相関と独立

結合分布が多変量正規である部分ベクトル$\boldsymbol X_1,\boldsymbol X_2$について
$$
\boldsymbol X_1\perp\!\!\!\perp\boldsymbol X_2
\quad\Longleftrightarrow\quad
\Sigma_{12}=0.
$$
独立なら共分散0は一般に成立します。逆向きは正規性を使います。$\Sigma_{12}=0$ならモーメント母関数の二次形式に交差項がなく、同時モーメント母関数が二つの周辺モーメント母関数の積へ因数分解されるため独立です。

## P3M-THM-05 偏相関と精度行列

正定値な分散共分散行列$\boldsymbol\Sigma$の逆行列を$\Omega=(\omega_{ij})=\boldsymbol\Sigma^{-1}$とします。多変量正規分布では、残りの全変数を条件付けた$X_i,X_j$の偏相関は
$$
\rho_{ij\cdot-ij}
=-\frac{\omega_{ij}}{\sqrt{\omega_{ii}\omega_{jj}}}.
$$
この式はSchur補から得られます。$(X_i,X_j)$を第1ブロック、残りを第2ブロックとすると、条件付き共分散を$S$としてブロック逆行列公式から$\Omega$の対応する$2\times2$主部分行列は$S^{-1}$です。$S=\begin{pmatrix}a&c\\c&b\end{pmatrix}$なら
$$
S^{-1}=\frac1{ab-c^2}\begin{pmatrix}b&-c\\-c&a\end{pmatrix},
$$
なので$-\omega_{ij}/\sqrt{\omega_{ii}\omega_{jj}}=c/\sqrt{ab}$となり、条件付き残差の相関に一致します。
三変数の場合、$X_1$と$X_2$をそれぞれ$X_3$へ線形回帰した残差は
$$
R_1=X_1-\frac{\sigma_{13}}{\sigma_{33}}X_3,
\qquad
R_2=X_2-\frac{\sigma_{23}}{\sigma_{33}}X_3
$$
です。中心化済みとして
$$
\operatorname{Cov}(R_1,R_2)
=\sigma_{12}-\frac{\sigma_{13}\sigma_{23}}{\sigma_{33}},
$$
$$
\operatorname{Var}(R_i)
=\sigma_{ii}-\frac{\sigma_{i3}^2}{\sigma_{33}}
$$
を相関係数へ代入するとP3M-DEF-02の公式を得ます。

## P3M-THM-06 Mahalanobis二次形式

$\boldsymbol X\sim N_p(\boldsymbol\mu,\boldsymbol\Sigma)$、$\boldsymbol\Sigma$を正定値とします。対称平方根$\boldsymbol\Sigma^{1/2}$を用いて
$$
\boldsymbol Z=\boldsymbol\Sigma^{-1/2}(\boldsymbol X-\boldsymbol\mu)
\sim N_p(\boldsymbol0,I_p).
$$
従って
$$
Q=(\boldsymbol X-\boldsymbol\mu)^{\mathsf T}
\boldsymbol\Sigma^{-1}(\boldsymbol X-\boldsymbol\mu)
=\boldsymbol Z^{\mathsf T}\boldsymbol Z
=\sum_{i=1}^pZ_i^2.
$$
$Z_i$は独立な標準正規なので、$Q$は自由度$p$のカイ二乗分布に従います。本章では$\chi_p^2$を「独立標準正規$p$個の平方和」と定義し、標本分布としての詳細はS1-01で扱います。


---

# 4. 典型例と完全な導出

## 例1：線形結合

$E[X]=1$, $E[Y]=2$, $\operatorname{Var}(X)=4$, $\operatorname{Var}(Y)=9$, $\operatorname{Cov}(X,Y)=3$なら
$$
E[2X-Y]=0,
$$
$$
\operatorname{Var}(2X-Y)=4\cdot4+9-4\cdot3=13.
$$
交差項は$2ab\operatorname{Cov}(X,Y)$です。

## 例2：二変量正規の条件付け

$(X,Y)$が平均$(0,1)^{\mathsf T}$、分散$\sigma_X^2=4$, $\sigma_Y^2=9$、相関$1/3$の二変量正規なら
$$
Y\mid(X=x)\sim N\left(1+\frac12x,8\right).
$$
係数は$(1/3)(3/2)=1/2$、条件付き分散は$9(1-1/9)=8$です。

## 例3：偏相関

$\rho_{12}=0.7$, $\rho_{13}=0.5$, $\rho_{23}=0.4$なら
$$
\rho_{12\cdot3}
=\frac{0.7-0.5\cdot0.4}
{\sqrt{(1-0.5^2)(1-0.4^2)}}
=\frac{0.5}{\sqrt{0.63}}.
$$
単純相関0.7の一部が$X_3$との共通の線形関係で説明されます。

## 例4：Mahalanobis距離

$\boldsymbol\Sigma=\operatorname{diag}(4,9)$、$\boldsymbol x-\boldsymbol\mu=(2,3)^{\mathsf T}$なら
$$
Q=(2,3)
\begin{pmatrix}1/4&0\\0&1/9\end{pmatrix}
\begin{pmatrix}2\\3\end{pmatrix}=2.
$$
各座標を標準偏差で割った平方和になっています。


---

# 5. 問題解決パターン

## DIM-1：式の前に次元を書く

$\boldsymbol X_1\in\mathbb R^p$, $\boldsymbol X_2\in\mathbb R^q$なら$\Sigma_{12}$は$p\times q$です。条件付き平均の係数$\Sigma_{12}\Sigma_{22}^{-1}$は$p\times q$、Schur補は$p\times p$になります。積の順序を暗記だけで決めません。

## AFFINE-1：中心化してから共分散を運ぶ

$\boldsymbol Y=A\boldsymbol X+\boldsymbol b$では、平均にだけ$\boldsymbol b$が入り、共分散には入りません。$A\Sigma A^{\mathsf T}$の両側の順序を次元で確認します。

## BLOCK-1・COND-NORMAL-1：条件付ける側を22ブロックへ置く

求めたい変数を1、与えられた変数を2へ並べ替えます。条件付き平均は観測偏差に回帰係数を掛け、条件付き共分散はSchur補です。条件付き共分散は観測値そのものに依存しません。

## INDEP-NORMAL-1：正規仮定を声に出す

一般分布では共分散0から独立は導けません。「同時正規であり、交差共分散が0だから独立」と二段階で書きます。

## PARTIAL-1：共通部分を分子から引く

三変数の偏相関では分子$\rho_{12}-\rho_{13}\rho_{23}$を先に作り、分母で二つの残差分散を標準化します。精度行列を使うときは負号を落としません。

## QUAD-MVN-1：白色化して平方和へ

$\Sigma^{-1/2}(\boldsymbol X-\boldsymbol\mu)$へ変換し、標準正規の独立成分の平方和へ戻します。$\Sigma$の正定値性が逆平方根の前提です。

## 本番での選択判断

3分でブロック分割と必要な逆行列の次数が決まれば選択します。15分で条件付き平均または線形変換の共分散まで進めば継続します。25分では正規仮定・正定値性・次元を一文ずつ確認して閉じます。


---

# 6. 演習：問題の直後に解答

GitHub Pagesでは各「解答を表示」を開くと、詳細解答・本番答案・採点基準を確認できます。

共通演習規約に従い、**初見の受験者が記号や分布公式を推測せず立式できること**を最低条件とします。分布の確率密度関数や条件付き公式が計算の出発点で、それ自体を導出させない場合は問題文付近に与えます。逆に、公式の導出や分布同定そのものが採点対象なら先に答えを与えません。各大問の採点基準は20点満点です。

## Level A：基礎部品

### P3M-A01 線形結合
- level: A
- minutes: 7
- topics: 平均, 共分散
- techniques: AFFINE-1
- calculation_load: low

二乗可積分な実数値確率変数 $X,Y$ について
$$
E[X]=1,quad E[Y]=2,
$$
$$
\operatorname{Var}(X)=4,quad
\operatorname{Var}(Y)=9,quad
\operatorname{Cov}(X,Y)=3
$$
とする。確率変数 $W=2X-Y$ を定める。$E[W]$ と $\operatorname{Var}(W)$ を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
E[2X-Y]=2E[X]-E[Y]=0.
$$
共分散の双線形性から
$$
\operatorname{Var}(2X-Y)
=4\operatorname{Var}(X)+\operatorname{Var}(Y)-4\operatorname{Cov}(X,Y)
=16+9-12=13.
$$

##### 本番答案

$E[2X-Y]=0$、$\operatorname{Var}(2X-Y)=4\cdot4+9-4\cdot3=13$。

##### 採点基準

平均6点、分散の交差項8点、計算6点。合計20点。

<!-- solution-end -->

### P3M-A02 分散共分散行列の条件
- level: A
- minutes: 8
- topics: 分散共分散行列, 相関係数
- techniques: DIM-1
- calculation_load: low

$c\in\mathbb R$ とし、二変量確率ベクトルの候補となる対称行列
$$
\Sigma(c)=\begin{pmatrix}4&c\\c&9\end{pmatrix}
$$
を考える。対称行列が分散共分散行列となり得るための必要十分条件が半正定値性であることを用いてよい。

1. $\Sigma(c)$ が分散共分散行列となり得るための $c$ の範囲を求めよ。
2. そのとき相関係数 $\rho=c/(\sqrt4\sqrt9)$ を $c$ で表せ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$\Sigma$が半正定値であるための必要十分条件は、対角成分が非負で行列式が非負となることです。ここでは
$$
|\Sigma|=36-c^2\geq0
$$
より$-6\leq c\leq6$です。標準偏差は2と3なので
$$
\rho=\frac{c}{2\cdot3}=\frac c6.
$$

##### 本番答案

$|\Sigma|=36-c^2\geq0$より$|c|\leq6$。相関係数は$\rho=c/6$。

##### 採点基準

半正定値条件8点、範囲4点、相関8点。合計20点。

<!-- solution-end -->

### P3M-A03 周辺と線形結合
- level: A
- minutes: 8
- topics: 多変量正規分布, 周辺分布
- techniques: AFFINE-1
- calculation_load: low

実数値確率変数 $X,Y$ を成分にもつ確率ベクトルが
$$
\begin{pmatrix}X\\Y\end{pmatrix}
\sim N_2\left(
\begin{pmatrix}1\\2\end{pmatrix},
\begin{pmatrix}4&3\\3&9\end{pmatrix}
\right)
$$
に従うとする。本教材では $N_2$ の第2母数は分散共分散行列である。多変量正規分布の部分ベクトルとアフィン変換も正規分布に従うという定理を用いてよい。$X$, $Y$, $X+Y$ の分布を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

周辺分布は対応する平均と対角分散を持つため
$$
X\sim N(1,4),\qquad Y\sim N(2,9).
$$
また線形変換の閉性と分散和から
$$
X+Y\sim N(1+2,4+9+2\cdot3)=N(3,19).
$$

##### 本番答案

$X\sim N(1,4)$、$Y\sim N(2,9)$、$X+Y\sim N(3,19)$。

##### 採点基準

二つの周辺分布各4点、和の平均4点、和の分散8点。合計20点。

<!-- solution-end -->

### P3M-A04 偏相関
- level: A
- minutes: 8
- topics: 偏相関係数
- techniques: PARTIAL-1
- calculation_load: low

二乗可積分な標準化済み確率変数 $X_1,X_2,X_3$ の相関係数が
$$
\rho_{12}=\frac12,qquad
\rho_{13}=\frac13,qquad
\rho_{23}=\frac14
$$
であるとする。第3変数の線形効果を除いた偏相関係数は
$$
\rho_{12\cdot3}
=\frac{\rho_{12}-\rho_{13}\rho_{23}}
{\sqrt{(1-\rho_{13}^2)(1-\rho_{23}^2)}}
$$
で与えられる。この式を用いて $\rho_{12\cdot3}$ を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
\begin{aligned}
\rho_{12\cdot3}
&=\frac{1/2-(1/3)(1/4)}
{\sqrt{\{1-(1/3)^2\}\{1-(1/4)^2\}}}\\
&=\frac{5/12}{\sqrt{(8/9)(15/16)}}
=\frac{\sqrt{30}}{12}.
\end{aligned}
$$

##### 本番答案

$\rho_{12\cdot3}=(5/12)/\sqrt{(8/9)(15/16)}=\sqrt{30}/12$。

##### 採点基準

公式8点、分子4点、分母4点、整理4点。合計20点。

<!-- solution-end -->

## Level B：小問セット

### P3M-B01 アフィン変換
- level: B
- minutes: 15
- topics: 多変量正規分布, 線形変換
- techniques: AFFINE-1, DIM-1
- calculation_load: medium

3次元確率ベクトル $\boldsymbol X$ が
$$
\boldsymbol X\sim N_3(\boldsymbol\mu,\Sigma),
$$
$$
\boldsymbol\mu=\begin{pmatrix}1\\0\\2\end{pmatrix},quad
\Sigma=\begin{pmatrix}2&1&0\\1&3&1\\0&1&2\end{pmatrix}
$$
に従う。ここで $\Sigma$ は分散共分散行列である。また
$$
A=\begin{pmatrix}1&1&0\\0&1&-1\end{pmatrix},qquad
\boldsymbol b=\begin{pmatrix}0\\1\end{pmatrix}
$$
とし、2次元確率ベクトル $\boldsymbol Y=A\boldsymbol X+\boldsymbol b$ を定める。アフィン変換公式
$$
A\boldsymbol X+\boldsymbol b
\sim N_2(A\boldsymbol\mu+\boldsymbol b,,A\Sigma A^{\mathsf T})
$$
を用いてよい。$\boldsymbol Y$ の分布を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

平均は
$$
A\boldsymbol\mu+\boldsymbol b
=\begin{pmatrix}1\\-2\end{pmatrix}
+\begin{pmatrix}0\\1\end{pmatrix}
=\begin{pmatrix}1\\-1\end{pmatrix}.
$$
また
$$
A\Sigma=
\begin{pmatrix}3&4&1\\1&2&-1\end{pmatrix},
$$
$$
A\Sigma A^{\mathsf T}
=\begin{pmatrix}7&3\\3&3\end{pmatrix}.
$$
従って
$$
\boldsymbol Y\sim N_2\left(
\begin{pmatrix}1\\-1\end{pmatrix},
\begin{pmatrix}7&3\\3&3\end{pmatrix}
\right).
$$

##### 本番答案

$A\boldsymbol\mu+\boldsymbol b=(1,-1)^{\mathsf T}$、$A\Sigma A^{\mathsf T}=\begin{pmatrix}7&3\\3&3\end{pmatrix}$より、$\boldsymbol Y$はこれらを平均・共分散とする$N_2$に従う。

##### 採点基準

平均5点、$A\Sigma$4点、分散共分散6点、分布結論5点。合計20点。

<!-- solution-end -->

### P3M-B02 二変量正規の条件付け
- level: B
- minutes: 14
- topics: 条件付き分布
- techniques: COND-NORMAL-1
- calculation_load: medium

実数値確率変数 $X,Y$ の結合分布は二変量正規分布で、
$$
E[X]=0,quad E[Y]=1,quad
\sigma_X=2,quad \sigma_Y=3,quad \rho=\frac13
$$
とする。従って分散共分散行列は
$$
\Sigma=
\begin{pmatrix}
4&2\\
2&9
\end{pmatrix}
$$
である。

次の二変量正規分布の条件付き公式を用いてよい。$X,Y$ の平均を $\mu_X,\mu_Y$、分散を $\sigma_X^2,\sigma_Y^2$、共分散を $\sigma_{XY}$ とすると、
$$
Y\mid(X=x)\sim N\left(
\mu_Y+\frac{\sigma_{XY}}{\sigma_X^2}(x-\mu_X),
\sigma_Y^2-\frac{\sigma_{XY}^2}{\sigma_X^2}
\right).
$$

$Y\mid(X=x)$ の分布を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$\sigma_X=2$, $\sigma_Y=3$, $\rho=1/3$なので
$$
E[Y\mid X=x]
=1+\frac13\frac32x=1+\frac x2,
$$
$$
\operatorname{Var}(Y\mid X=x)=9\left(1-\frac19\right)=8.
$$
従って$Y\mid(X=x)\sim N(1+x/2,8)$です。

##### 本番答案

$Y\mid(X=x)\sim N(1+x/2,8)$。条件付き分散は$x$に依存しない。

##### 採点基準

条件付き平均8点、条件付き分散6点、分布結論6点。合計20点。

<!-- solution-end -->

### P3M-B03 無相関と独立
- level: B
- minutes: 14
- topics: 独立性, 無相関
- techniques: INDEP-NORMAL-1
- calculation_load: medium

連続型確率変数 $X$ の確率密度関数を
$$
f_X(x)=\frac12\boldsymbol{1}_{(-1,1)}(x)
$$
とし、確率変数 $Y=X^2$ を定める。すなわち $X\sim\operatorname{Unif}(-1,1)$ である。

1. $\operatorname{Cov}(X,Y)$ を求めよ。
2. $X,Y$ が独立でないことを、独立性の定義に反する事象を一組示して証明せよ。
3. 追加で $(X,Y)$ の結合分布が二変量正規分布であったなら、共分散0から何が言えるか。

<!-- solution-start -->

#### 解答

##### 詳細解答

対称性より$E[X]=E[X^3]=0$なので
$$
\operatorname{Cov}(X,Y)=E[X^3]-E[X]E[X^2]=0.
$$
しかし$A=\{X>1/2\}$、$B=\{Y\leq1/4\}=\{|X|\leq1/2\}$とすると
$$
P(A\cap B)=0,\qquad P(A)P(B)=\frac14\cdot\frac12=\frac18.
$$
従って独立ではありません。一方、$(X,Y)$の結合分布が二変量正規なら、共分散0から独立が従います。

##### 本番答案

$E[X]=E[X^3]=0$より$\operatorname{Cov}(X,X^2)=0$。ただし$P(X>1/2,Y\leq1/4)=0\neq1/8=P(X>1/2)P(Y\leq1/4)$なので非独立。同時正規なら無相関から独立が従う。

##### 採点基準

共分散5点、反例事象7点、非独立結論3点、正規の場合5点。合計20点。

<!-- solution-end -->

### P3M-B04 マハラノビス二次形式
- level: B
- minutes: 15
- topics: 二次形式, 多変量正規分布
- techniques: QUAD-MVN-1
- calculation_load: medium

2次元確率ベクトル $\boldsymbol X$ が
$$
\boldsymbol X\sim N_2(\boldsymbol0,\Sigma),qquad
\Sigma=\begin{pmatrix}2&1\\1&2\end{pmatrix}
$$
に従い、$\Sigma$ は正定値な分散共分散行列である。マハラノビス二次形式を
$$
Q=\boldsymbol X^{\mathsf T}\Sigma^{-1}\boldsymbol X
$$
と定める。

1. $\Sigma^{-1}$ を2次正方行列の逆行列公式から求めよ。
2. 白色化 $\boldsymbol Z=L^{-1}\boldsymbol X$（$LL^{\mathsf T}=\Sigma$）を用いて $Q$ の分布を示せ。
3. 観測値 $\boldsymbol x=(1,-1)^{\mathsf T}$ に対する二次形式の値を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
\Sigma^{-1}=\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}.
$$
正定値な共分散で白色化できるため$Q\sim\chi_2^2$です。$\boldsymbol x=(1,-1)^{\mathsf T}$では
$$
\Sigma^{-1}\boldsymbol x
=\begin{pmatrix}1\\-1\end{pmatrix},
\qquad
\boldsymbol x^{\mathsf T}\Sigma^{-1}\boldsymbol x=2.
$$

##### 本番答案

$\Sigma^{-1}=3^{-1}\begin{pmatrix}2&-1\\-1&2\end{pmatrix}$。白色化により$Q\sim\chi_2^2$。$\boldsymbol x=(1,-1)^{\mathsf T}$で$Q=2$。

##### 採点基準

逆行列8点、白色化と分布8点、数値4点。合計20点。

<!-- solution-end -->

## Level C：本番標準

### P3M-C01 双方向の条件付き正規
- level: C
- minutes: 25
- topics: 二変量正規分布, 条件付き分布
- techniques: COND-NORMAL-1
- calculation_load: medium

実数値確率変数 $X,Y$ の結合分布は二変量正規分布で、平均ベクトルと分散共分散行列が
$$
\boldsymbol\mu=\begin{pmatrix}2\\-1\end{pmatrix},qquad
\Sigma=\begin{pmatrix}4&3\\3&9\end{pmatrix}
$$
である。

次の二変量正規分布の条件付き公式を用いてよい。$X,Y$ の平均を $\mu_X,\mu_Y$、分散を $\sigma_X^2,\sigma_Y^2$、共分散を $\sigma_{XY}$ とすると、
$$
Y\mid(X=x)\sim N\left(
\mu_Y+\frac{\sigma_{XY}}{\sigma_X^2}(x-\mu_X),
\sigma_Y^2-\frac{\sigma_{XY}^2}{\sigma_X^2}
\right).
$$

1. 相関係数を求めよ。
2. $Y\mid(X=4)$ の分布を求めよ。
3. $P(Y>1/2\mid X=4)$ を求めよ。
4. $E[X\mid Y=y]$ を求めよ。
5. $\operatorname{Var}(X\mid Y=y)$ を求めよ。

<!-- solution-start -->

#### 解答

##### 時間配分

初動3分、(1)2分、(2)7分、(3)3分、(4)5分、(5)3分、見直し2分。

##### 詳細解答

$$
\rho=\frac3{\sqrt4\sqrt9}=\frac12.
$$
条件付き平均と分散は
$$
E[Y\mid X=4]
=-1+\frac34(4-2)=\frac12,
$$
$$
\operatorname{Var}(Y\mid X=4)
=9-\frac{3^2}{4}=\frac{27}{4}.
$$
従って
$$
Y\mid(X=4)\sim N\left(\frac12,\frac{27}{4}\right).
$$
閾値$1/2$は条件付き平均そのものなので、対称性から$P(Y>1/2\mid X=4)=1/2$です。逆向きには
$$
E[X\mid Y=y]=2+\frac39(y+1)=2+\frac{y+1}{3},
$$
$$
\operatorname{Var}(X\mid Y=y)=4-\frac{3^2}{9}=3.
$$

##### 本番答案

$\rho=1/2$。正規条件付け公式より
$$
Y\mid(X=4)\sim N\left(-1+\frac34(4-2),9-\frac94\right)
=N\left(\frac12,\frac{27}{4}\right).
$$
従って$P(Y>1/2\mid X=4)=1/2$。また$E[X\mid Y=y]=2+(y+1)/3$、$\operatorname{Var}(X\mid Y=y)=3$。

##### 採点基準と選択判断

相関2点、条件付き平均4点、条件付き分散4点、確率2点、逆向き平均4点、逆向き分散4点。合計20点。3分で$\rho=1/2$と回帰係数$3/4$が見えれば選択し、15分で(3)まで進めば継続します。25分では逆向き係数$3/9$と分散3を残して閉じます。

<!-- solution-end -->

### P3M-C02 ブロック条件付け
- level: C
- minutes: 28
- topics: 多変量正規分布, 条件付き分布, 独立性
- techniques: BLOCK-1, COND-NORMAL-1
- calculation_load: high

3次元確率ベクトル $\boldsymbol X=(X_1,X_2,X_3)^{\mathsf T}$ が
$$
\boldsymbol X
\sim N_3\left(
\begin{pmatrix}0\\1\\2\end{pmatrix},
\begin{pmatrix}4&1&2\\1&3&1\\2&1&2\end{pmatrix}
\right)
$$
に従う。第2母数は候補となる分散共分散行列である。

正定値な分散共分散行列を
$$
\begin{pmatrix}
\Sigma_{11}&\Sigma_{12}\\
\Sigma_{21}&\Sigma_{22}
\end{pmatrix}
$$
と分割したとき、条件付き平均と条件付き分散共分散行列として
$$
\boldsymbol\mu_{1\mid2}
=\boldsymbol\mu_1+\Sigma_{12}\Sigma_{22}^{-1}
(\boldsymbol x_2-\boldsymbol\mu_2),
$$
$$
\Sigma_{1\mid2}
=\Sigma_{11}-\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}
$$
を用いてよい。

1. 対応する二次形式を平方完成し、この行列が正定値であることを確認せよ。
2. $(X_1,X_2)^{\mathsf T}\mid(X_3=4)$ の条件付き平均を求めよ。
3. 条件付き分散共分散行列を求めよ。
4. 条件付きで $X_1,X_2$ は独立か。正規性も含めて根拠を述べよ。
5. $X_1\mid(X_3=4)$ の分布を求めよ。

<!-- solution-start -->

#### 解答

##### 時間配分

初動3分、(1)5分、(2)6分、(3)7分、(4)3分、(5)2分、見直し2分。

##### 詳細解答

任意の$(u,v,w)\neq(0,0,0)$に対し、対応する二次形式は
$$
\begin{aligned}
&4u^2+2uv+4uw+3v^2+2vw+2w^2\\
&\quad=4\left(u+\frac v4+\frac w2\right)^2
+\frac{11}{4}\left(v+\frac{2w}{11}\right)^2
+\frac{10}{11}w^2>0.
\end{aligned}
$$
従って分散共分散行列は正定値です。求める側を$\boldsymbol X_1=(X_1,X_2)^{\mathsf T}$、条件付ける側を$X_3$とすると
$$
\mu_1=\begin{pmatrix}0\\1\end{pmatrix},\quad
\Sigma_{11}=\begin{pmatrix}4&1\\1&3\end{pmatrix},\quad
\Sigma_{12}=\begin{pmatrix}2\\1\end{pmatrix},\quad
\Sigma_{22}=2.
$$
従って条件付き平均は
$$
\begin{pmatrix}0\\1\end{pmatrix}
+\begin{pmatrix}2\\1\end{pmatrix}\frac12(4-2)
=\begin{pmatrix}2\\2\end{pmatrix}.
$$
条件付き共分散は
$$
\begin{aligned}
\Sigma_{1\mid2}
&=\begin{pmatrix}4&1\\1&3\end{pmatrix}
-\begin{pmatrix}2\\1\end{pmatrix}\frac12
\begin{pmatrix}2&1\end{pmatrix}\\
&=\begin{pmatrix}2&0\\0&5/2\end{pmatrix}.
\end{aligned}
$$
条件付き分布も二変量正規で交差共分散が0なので、条件付きで$X_1,X_2$は独立です。周辺を取れば
$$
X_1\mid(X_3=4)\sim N(2,2).
$$

##### 本番答案

二次形式は
$$
4\left(u+\frac v4+\frac w2\right)^2
+\frac{11}{4}\left(v+\frac{2w}{11}\right)^2
+\frac{10}{11}w^2>0
$$
（$(u,v,w)\neq0$）なので$\Sigma$は正定値。ブロック公式より
$$
E\left[\begin{pmatrix}X_1\\X_2\end{pmatrix}\middle|X_3=4\right]
=\begin{pmatrix}0\\1\end{pmatrix}
+\begin{pmatrix}2\\1\end{pmatrix}\frac12(2)
=\begin{pmatrix}2\\2\end{pmatrix},
$$
$$
\operatorname{Cov}\left(\begin{pmatrix}X_1\\X_2\end{pmatrix}\middle|X_3=4\right)
=\begin{pmatrix}4&1\\1&3\end{pmatrix}
-\frac12\begin{pmatrix}2\\1\end{pmatrix}\begin{pmatrix}2&1\end{pmatrix}
=\begin{pmatrix}2&0\\0&5/2\end{pmatrix}.
$$
条件付きでも同時正規かつ共分散0なので独立。$X_1\mid(X_3=4)\sim N(2,2)$。

##### 採点基準と選択判断

平方完成による正定値4点、条件付き平均5点、条件付き分散共分散5点、独立性3点、周辺分布3点。合計20点。3分で$2\times1$の交差ブロックが取れれば選択し、15分で条件付き平均まで進めば継続します。25分ではSchur補と「条件付き同時正規」を明記して閉じます。

<!-- solution-end -->

### P3M-C03 残差と偏相関
- level: C
- minutes: 27
- topics: 偏相関係数, 条件付き独立
- techniques: PARTIAL-1
- calculation_load: high

実数値確率変数 $X_1,X_2,X_3$ は中心化・標準化されており、相関行列は
$$
R=\begin{pmatrix}
1&0.3&0.5\\
0.3&1&0.6\\
0.5&0.6&1
\end{pmatrix}
$$
である。標準化された $X_i$ を $X_3$ だけで最良線形予測するときの係数
$$
a_i=\frac{\operatorname{Cov}(X_i,X_3)}{\operatorname{Var}(X_3)}=\rho_{i3}
$$
を用いてよい。

1. $X_1,X_2$ をそれぞれ $X_3$ へ線形回帰した残差 $R_1,R_2$ を示せ。
2. $\operatorname{Cov}(R_1,R_2)$ を展開して求めよ。
3. 各残差分散を求めよ。
4. $\rho_{12\cdot3}=\operatorname{Corr}(R_1,R_2)$ を求めよ。
5. 追加で $(X_1,X_2,X_3)$ が三変量正規分布に従うと仮定する。このとき $X_3$ を与えた下での $X_1,X_2$ の独立性について述べよ。

<!-- solution-start -->

#### 解答

##### 時間配分

初動3分、(1)4分、(2)5分、(3)5分、(4)4分、(5)4分、見直し2分。

##### 詳細解答

標準化済みなので回帰係数は相関そのものです。
$$
R_1=X_1-0.5X_3,\qquad R_2=X_2-0.6X_3.
$$
従って
$$
\operatorname{Cov}(R_1,R_2)=0.3-(0.5)(0.6)=0,
$$
$$
\operatorname{Var}(R_1)=1-0.5^2=0.75,\qquad
\operatorname{Var}(R_2)=1-0.6^2=0.64.
$$
よって
$$
\rho_{12\cdot3}=\frac0{\sqrt{0.75\cdot0.64}}=0.
$$
三変量正規なら$(X_1,X_2)\mid X_3$は二変量正規で、その条件付き共分散は上の残差共分散0です。従って$X_3$を与えた下で$X_1,X_2$は条件付き独立です。

##### 本番答案

$R_1=X_1-0.5X_3$, $R_2=X_2-0.6X_3$。残差共分散は$0.3-0.5\cdot0.6=0$、残差分散は$0.75,0.64$なので$\rho_{12\cdot3}=0$。三変量正規なら条件付き分布も正規で交差共分散0ゆえ、$X_1\perp\!\!\!\perp X_2\mid X_3$。

##### 採点基準と選択判断

残差4点、残差共分散4点、残差分散4点、偏相関3点、条件付き独立5点。合計20点。3分で標準化済みの回帰係数0.5,0.6が見えれば選択し、15分で残差分散まで進めば継続します。25分では正規仮定を明示して条件付き独立まで閉じます。

<!-- solution-end -->

### P3M-C04 白色化と二次形式
- level: C
- minutes: 25
- topics: 線形変換, 二次形式
- techniques: AFFINE-1, QUAD-MVN-1
- calculation_load: medium

$p\in\mathbb N$ とする。$p$次元確率ベクトル $\boldsymbol X$ が
$$
\boldsymbol X\sim N_p(\boldsymbol\mu,\Sigma)
$$
に従い、$\Sigma$ は正定値な分散共分散行列とする。$L$ を $LL^{\mathsf T}=\Sigma$ を満たす可逆行列とし、
$$
\boldsymbol Z=L^{-1}(\boldsymbol X-\boldsymbol\mu)
$$
と置く。多変量正規分布のアフィン変換定理と、標準正規分布のモーメント母関数 $M_Z(t)=e^{t^2/2}$ を用いてよい。

1. $\boldsymbol Z$ の平均と分散共分散行列を求めよ。
2. $\boldsymbol Z$ の分布と成分の独立性を示せ。
3. マハラノビス二次形式が $\boldsymbol Z^{\mathsf T}\boldsymbol Z$ に等しいことを示せ。
4. 二次形式の分布を求めよ。
5. 二次形式の平均と分散を求めよ。

<!-- solution-start -->

#### 解答

##### 時間配分

初動3分、(1)5分、(2)5分、(3)4分、(4)3分、(5)3分、見直し2分。

##### 詳細解答

$$
E[\boldsymbol Z]=L^{-1}(E[\boldsymbol X]-\boldsymbol\mu)=\boldsymbol0,
$$
$$
\operatorname{Cov}(\boldsymbol Z)
=L^{-1}\Sigma L^{-\mathsf T}
=L^{-1}LL^{\mathsf T}L^{-\mathsf T}=I_p.
$$
定数項を含む線形変換をしても正規分布であることから$\boldsymbol Z\sim N_p(\boldsymbol0,I_p)$で、結合分布が多変量正規かつ交差共分散0なので$Z_1,\ldots,Z_p$は独立です。$\Sigma^{-1}=L^{-\mathsf T}L^{-1}$より
$$
(\boldsymbol X-\boldsymbol\mu)^{\mathsf T}\Sigma^{-1}(\boldsymbol X-\boldsymbol\mu)
=\boldsymbol Z^{\mathsf T}\boldsymbol Z.
$$
従って二次形式は$\sum_iZ_i^2\sim\chi_p^2$です。標準正規分布のモーメント母関数
$
M_Z(t)=e^{t^2/2}
$
を用います。1回ずつ微分すると
$
M_Z'(t)=t e^{t^2/2},
$
$
M_Z''(t)=(1+t^2)e^{t^2/2},
$
$
M_Z'''(t)=(3t+t^3)e^{t^2/2},
$
$
M_Z^{(4)}(t)=(3+6t^2+t^4)e^{t^2/2}.
$
したがって $t=0$ を代入して $E[Z_i^4]=M_Z^{(4)}(0)=3$ です。従って$E[Z_i^2]=1$、$\operatorname{Var}(Z_i^2)=3-1=2$です。独立和なので平均$p$、分散$2p$です。

##### 本番答案

$E[\boldsymbol Z]=0$、$\operatorname{Cov}(\boldsymbol Z)=L^{-1}LL^{\mathsf T}L^{-\mathsf T}=I_p$。従って$\boldsymbol Z\sim N_p(0,I_p)$で成分は独立。$\Sigma^{-1}=L^{-\mathsf T}L^{-1}$より
$$
(\boldsymbol X-\boldsymbol\mu)^{\mathsf T}\Sigma^{-1}(\boldsymbol X-\boldsymbol\mu)
=\boldsymbol Z^{\mathsf T}\boldsymbol Z=\sum_{i=1}^pZ_i^2\sim\chi_p^2.
$$
$E[Z_i^2]=1$, $\operatorname{Var}(Z_i^2)=3-1=2$より、平均$p$、分散$2p$。

##### 採点基準と選択判断

平均・分散共分散5点、正規性・独立性4点、二次形式4点、分布3点、平均・分散4点。合計20点。3分で$L^{-1}$による白色化が見えれば選択し、15分で$N_p(0,I_p)$まで進めば継続します。25分では$\Sigma^{-1}=L^{-\mathsf T}L^{-1}$と平方和を残して閉じます。

<!-- solution-end -->

### P3M-C05 正誤判定総合
- level: C
- minutes: 25
- topics: 多変量分布, 独立性, 条件付き分布
- techniques: INDEP-NORMAL-1, ANSWER-1
- calculation_load: medium

次を正誤判定し、正しければ根拠、誤りなら反例または不足仮定を示せ。

1. 任意の分散共分散行列は対称半正定値である。
2. 二乗可積分な実数値確率変数 $X,Y$ で $\operatorname{Cov}(X,Y)=0$ なら独立である。
3. 結合分布が二変量正規分布である $X,Y$ で共分散0なら独立である。
4. 多変量正規分布の条件付き分散共分散行列は、条件付けた観測値に依存する。
5. 多変量正規分布の任意の部分ベクトルは多変量正規分布である。

<!-- solution-start -->

#### 解答

##### 時間配分

初動3分、各小問4分、見直し2分。

##### 詳細解答

1. 正しい。任意の$\boldsymbol a$に対して$\boldsymbol a^{\mathsf T}\Sigma\boldsymbol a=\operatorname{Var}(\boldsymbol a^{\mathsf T}\boldsymbol X)\geq0$で、共分散の対称性もある。
2. 誤り。$X\sim\operatorname{Unif}(-1,1)$、$Y=X^2$とする。対称性から$E[X]=E[X^3]=0$なので$\operatorname{Cov}(X,Y)=0$である。一方、$A=\{X>1/2\}$、$B=\{Y\leq1/4\}$とすれば$P(A\cap B)=0$だが$P(A)P(B)=(1/4)(1/2)=1/8$なので独立でない。
3. 正しい。同時正規で交差共分散0ならモーメント母関数が周辺モーメント母関数の積へ因数分解される。
4. 誤り。条件付き共分散$\Sigma_{11}-\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}$は観測値に依存しない。
5. 正しい。成分選択はアフィン変換なので、多変量正規性が保たれる。

##### 本番答案

(1)正。$\boldsymbol a^{\mathsf T}\Sigma\boldsymbol a=\operatorname{Var}(\boldsymbol a^{\mathsf T}\boldsymbol X)\geq0$。(2)誤。$X\sim$Unif$(-1,1)$、$Y=X^2$では$E[X]=E[X^3]=0$より共分散0。しかし$A=\{X>1/2\}$、$B=\{Y\leq1/4\}$で$P(A\cap B)=0\neq1/8=P(A)P(B)$なので非独立。(3)正。同時正規かつ共分散0ならモーメント母関数因数分解により独立。(4)誤。Schur補は観測値を含まない。(5)正。部分ベクトルは成分選択という線形変換である。

##### 採点基準と選択判断

各4点。各項について正誤1点、根拠または反例3点。合計20点。3分で(2)の反例と(4)のSchur補が見えれば選択し、15分で3項以上完成すれば継続します。25分では全項に「正規仮定の有無」を補って閉じます。

<!-- solution-end -->

## Level D：発展

### P3M-D01 条件付き正規公式の導出
- level: D
- minutes: 40
- topics: 多変量正規分布, 条件付き分布, Schur補
- techniques: BLOCK-1, COND-NORMAL-1
- calculation_load: high

$p,q\in\mathbb N$ とする。確率ベクトル $\boldsymbol X_1\in\mathbb R^p$, $\boldsymbol X_2\in\mathbb R^q$ の結合分布が
$$
\begin{pmatrix}\boldsymbol X_1\\\boldsymbol X_2\end{pmatrix}
\sim N_{p+q}\left(
\begin{pmatrix}\boldsymbol\mu_1\\\boldsymbol\mu_2\end{pmatrix},
\begin{pmatrix}
\Sigma_{11}&\Sigma_{12}\\
\Sigma_{21}&\Sigma_{22}
\end{pmatrix}
\right)
$$
に従い、全分散共分散行列は正定値とする。従って $\Sigma_{22}$ は可逆である。条件付き正規公式そのものを導出する問題なので、公式は使用せず以下を示せ。

1. $B=\Sigma_{12}\Sigma_{22}^{-1}$、$\boldsymbol R=\boldsymbol X_1-\boldsymbol\mu_1-B(\boldsymbol X_2-\boldsymbol\mu_2)$ と置き、$\operatorname{Cov}(\boldsymbol R,\boldsymbol X_2)=0$ を示せ。
2. $\operatorname{Cov}(\boldsymbol R)$ がSchur補 $\Sigma_{1\mid2}$ であることを示せ。
3. $(\boldsymbol R,\boldsymbol X_2)$ の結合分布が多変量正規分布であることを示せ。
4. $\boldsymbol R$ と $\boldsymbol X_2$ の独立性を示せ。
5. 以上から $\boldsymbol X_1\mid(\boldsymbol X_2=\boldsymbol x_2)$ の分布を導け。

<!-- solution-start -->

#### 解答

##### 時間配分

次元確認4分、(1)7分、(2)10分、(3)(4)各5分、(5)6分、見直し3分。

##### 詳細解答

$B=\Sigma_{12}\Sigma_{22}^{-1}$は$p\times q$です。中心化した変数を用いると
$$
\begin{aligned}
\operatorname{Cov}(\boldsymbol R,\boldsymbol X_2)
&=\Sigma_{12}-B\Sigma_{22}\\
&=\Sigma_{12}-\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{22}=0.
\end{aligned}
$$
また
$$
\begin{aligned}
\operatorname{Cov}(\boldsymbol R)
&=\Sigma_{11}-\Sigma_{12}B^{\mathsf T}-B\Sigma_{21}
+B\Sigma_{22}B^{\mathsf T}\\
&=\Sigma_{11}-2\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}
+\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}\\
&=\Sigma_{11}-\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}
=\Sigma_{1\mid2}.
\end{aligned}
$$
$\Sigma_{22}$は対称なので逆行列も対称であることを使いました。$(\boldsymbol R,\boldsymbol X_2)$は$(\boldsymbol X_1,\boldsymbol X_2)$の定数項を含む線形変換なので、その結合分布も多変量正規です。交差共分散が0であるため、正規分布の性質から$\boldsymbol R$と$\boldsymbol X_2$は独立です。また
$$
\boldsymbol R\sim N_p(\boldsymbol0,\Sigma_{1\mid2}).
$$
恒等式
$$
\boldsymbol X_1
=\boldsymbol\mu_1+B(\boldsymbol X_2-\boldsymbol\mu_2)+\boldsymbol R
$$
で$\boldsymbol X_2=\boldsymbol x_2$を固定しても、独立な$\boldsymbol R$の分布は変わりません。従って
$$
\boldsymbol X_1\mid(\boldsymbol X_2=\boldsymbol x_2)
\sim N_p\left(
\boldsymbol\mu_1+\Sigma_{12}\Sigma_{22}^{-1}
(\boldsymbol x_2-\boldsymbol\mu_2),
\Sigma_{1\mid2}
\right).
$$

##### 本番答案

$B=\Sigma_{12}\Sigma_{22}^{-1}$、$\boldsymbol R=\boldsymbol X_1-\boldsymbol\mu_1-B(\boldsymbol X_2-\boldsymbol\mu_2)$とすると
$$
\operatorname{Cov}(\boldsymbol R,\boldsymbol X_2)=\Sigma_{12}-B\Sigma_{22}=0,
$$
$$
\begin{aligned}
\operatorname{Cov}(\boldsymbol R)
&=\Sigma_{11}-\Sigma_{12}B^{\mathsf T}-B\Sigma_{21}+B\Sigma_{22}B^{\mathsf T}\\
&=\Sigma_{11}-\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}=\Sigma_{1\mid2}.
\end{aligned}
$$
$(\boldsymbol R,\boldsymbol X_2)$の結合分布は多変量正規で無相関なので独立し、$\boldsymbol R\sim N_p(\boldsymbol0,\Sigma_{1\mid2})$。$\boldsymbol X_1=\boldsymbol\mu_1+B(\boldsymbol X_2-\boldsymbol\mu_2)+\boldsymbol R$へ$\boldsymbol X_2=\boldsymbol x_2$を入れれば
$$
\boldsymbol X_1\mid(\boldsymbol X_2=\boldsymbol x_2)\sim N_p\left(\boldsymbol\mu_1+\Sigma_{12}\Sigma_{22}^{-1}(\boldsymbol x_2-\boldsymbol\mu_2),\Sigma_{1\mid2}\right).
$$

##### 採点基準と選択判断

次元2点、交差共分散4点、残差分散共分散5点、正規性3点、独立性3点、条件付き分布3点。合計20点。3分で残差化が見えなければ後回しにします。15分で交差共分散0まで得られれば継続し、25分でSchur補まで完成しなければ途中式を残して打ち切ります。完成した場合は独立残差の平行移動として閉じます。

<!-- solution-end -->

---

# 7. 30分ドリル

- 制限時間: 30分
- level: C

## 過去問傾向との対応

MATH-2021-Q5とMATH-2018-Q4の「線形変換、条件付き正規、独立性、二次形式」の連鎖を校正対象とする。平均・分散共分散行列・観測値は独自で、条件付き平均を回帰予測として解釈し、Mahalanobis距離の計算までを扱う。

## P3M-DRILL-01 多変量正規・条件付け・二次形式

$N_2(\boldsymbol\mu,\boldsymbol\Sigma)$は、平均$\boldsymbol\mu\in\mathbb R^2$、正定値な分散共分散行列$\boldsymbol\Sigma$をもつ二変量正規分布を表す。その密度は
$$
f(\boldsymbol z)=\frac{1}{2\pi|\boldsymbol\Sigma|^{1/2}}
\exp\left[-\frac12(\boldsymbol z-\boldsymbol\mu)^{\mathsf T}
\boldsymbol\Sigma^{-1}(\boldsymbol z-\boldsymbol\mu)\right],
\qquad \boldsymbol z\in\mathbb R^2.
$$
以下の分散共分散行列は、第1主座小行列式が4、第2主座小行列式が$4\cdot9-2^2=32$でともに正なので正定値である。

$$
\begin{pmatrix}X\\Y\end{pmatrix}
\sim N_2\left(
\begin{pmatrix}1\\2\end{pmatrix},
\begin{pmatrix}4&2\\2&9\end{pmatrix}
\right).
$$

1. $X,Y$の周辺分布と相関係数を求めよ。（15点）
2. $W=Y-X$の分布を求めよ。（20点）
3. $Y\mid(X=3)$の分布を求めよ。（25点）
4. $P(Y>3\mid X=3)$を求めよ。（15点）
5. Mahalanobis二次形式
$$
Q=\{(X,Y)^{\mathsf T}-\boldsymbol\mu\}^{\mathsf T}
\boldsymbol\Sigma^{-1}
\{(X,Y)^{\mathsf T}-\boldsymbol\mu\}
$$
の分布を示し、観測値$(x,y)=(3,3)$での値を求めよ。（25点）

<!-- solution-start -->

### 解答

#### 詳細解答

周辺分布と相関は
$$
X\sim N(1,4),\qquad Y\sim N(2,9),
\qquad\rho=\frac2{2\cdot3}=\frac13.
$$
線形変換の閉性から$W$も正規で
$$
E[W]=2-1=1,\qquad
\operatorname{Var}(W)=9+4-2\cdot2=9.
$$
従って$W\sim N(1,9)$です。条件付き平均・分散は
$$
E[Y\mid X=3]=2+\frac24(3-1)=3,
$$
$$
\operatorname{Var}(Y\mid X=3)=9-\frac{2^2}{4}=8.
$$
従って$Y\mid(X=3)\sim N(3,8)$で、対称性から$P(Y>3\mid X=3)=1/2$です。

分散共分散行列の逆行列は
$$
\Sigma^{-1}=\frac1{32}
\begin{pmatrix}9&-2\\-2&4\end{pmatrix}.
$$
正定値な二変量正規なので$Q\sim\chi_2^2$です。観測偏差は$(2,1)^{\mathsf T}$で
$$
Q=(2,1)\frac1{32}
\begin{pmatrix}9&-2\\-2&4\end{pmatrix}
\begin{pmatrix}2\\1\end{pmatrix}
=(2,1)\begin{pmatrix}1/2\\0\end{pmatrix}=1.
$$

#### 本番答案

$X\sim N(1,4)$、$Y\sim N(2,9)$、$\rho=1/3$。また
$$
W=Y-X\sim N(2-1,9+4-2\cdot2)=N(1,9).
$$
条件付き正規公式より
$$
Y\mid(X=3)\sim N\left(2+\frac24(3-1),9-\frac4{4}\right)=N(3,8),
$$
従って$P(Y>3\mid X=3)=1/2$。さらに
$$
\Sigma^{-1}=\frac1{32}\begin{pmatrix}9&-2\\-2&4\end{pmatrix},
\qquad Q\sim\chi_2^2,
$$
で、$(x,y)=(3,3)$では偏差$(2,1)^{\mathsf T}$を代入して$Q=1$。

#### 採点基準・時間配分・選択判断

初動3分、(1)4分、(2)5分、(3)7分、(4)2分、(5)6分、見直し3分です。3分で交差共分散2と条件付き係数$2/4$が見えれば選択します。15分で条件付き平均まで進めば継続し、25分では$\Sigma^{-1}$と$Q\sim\chi_2^2$を残して閉じます。(5)は逆行列8点、分布7点、代入10点です。

<!-- solution-end -->

## 復習カード

1. 平均ベクトルは$p\times1$。
2. 分散共分散行列は$p\times p$で対称半正定値。
3. $a^{\mathsf T}\Sigma a$は線形結合の分散。
4. 相関行列の対角は1。
5. アフィン平均は$A\mu+b$。
6. アフィン共分散は$A\Sigma A^{\mathsf T}$。
7. 多変量正規は特異でも定義できる。
8. 密度式には共分散の正定値性が必要。
9. 正規の部分ベクトルは正規。
10. 条件付き平均は観測偏差に依存する。
11. 条件付き共分散は観測値に依存しない。
12. 条件付き共分散はSchur補。
13. 一般には無相関から独立は出ない。
14. 同時正規なら無相関と独立が同値。
15. 偏相関は残差間相関。
16. 精度行列公式には負号が付く。
17. 白色化後の共分散は$I_p$。
18. Mahalanobis二次形式は標準正規平方和。
19. $\chi_p^2$の平均$p$、分散$2p$。
20. 条件付ける側を22ブロックに置く。

---

# 8. 実過去問演習

問題文は転載せず、公式問題集の年度・科目・大問番号で参照する。


### PAST-P3M-01: MATH-2021-Q5

- 入手先: 統計検定公式問題集［2019〜2022年］
- 制限時間: 30分
- 現在解く範囲: 多変量正規の線形変換、分散共分散行列、共分散0からの独立性
- 後続章で再挑戦: 回帰モデルとの対応
- 答案確認: 変換行列の次元、平均、共分散、正規性をこの順で示す。

### PAST-P3M-02: MATH-2018-Q4

- 入手先: 統計検定公式問題集［2018〜2019年］
- 制限時間: 30分
- 現在解く範囲: 条件付き2変量正規、残差、条件付き独立
- 後続章で再挑戦: Markov連鎖としての解釈
- 答案確認: 条件付き平均の係数、Schur補分散、独立と無相関を区別する。

## 過去問型独自ドリルとの接続

P3M-DRILL-01は同じ正規モデルで周辺、線形変換、条件付き予測、Mahalanobis距離へ進む。後半で前半の平均・共分散を再計算せず再利用する。



---

# 9. 復習チェック

- [ ] 分散共分散行列が対称半正定値になる理由を $\boldsymbol a^{\mathsf T}\Sigma\boldsymbol a$ から説明できる。
- [ ] 多変量正規分布の密度式を使える条件と、特異な場合に密度式を使えない理由を区別できる。
- [ ] アフィン変換後の平均と分散共分散行列を次元付きで計算できる。
- [ ] 条件付き正規分布の平均とSchur補を、どのブロックが条件付ける側か確認して使える。
- [ ] 一般の「無相関」と、多変量正規での「無相関なら独立」を区別できる。
- [ ] 偏相関を残差の相関として説明できる。
- [ ] 白色化からマハラノビス二次形式をカイ二乗分布へ結び付けられる。
- [ ] 演習で使用する非自明な公式が、問題文で許可されているか、設問で導出対象になっているかを確認できる。