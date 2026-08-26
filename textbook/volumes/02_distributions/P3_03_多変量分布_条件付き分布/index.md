# P3-03 多変量分布・条件付き分布

本章は [統計教材 共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md) に従います。まず2変量の具体例で平均・分散共分散行列・条件付き分布の意味をつかみ、その後に一般式へ広げます。演習では各設問に必要な出発点を問題文付近へ再掲します。

## この章で解けるようになる問題

2変量の平均・分散・共分散を行列で整理し、線形結合、周辺分布、条件付き分布を計算できるようにします。さらに偏相関、無相関と独立の違い、マハラノビス距離までを、具体的な数値例から理解します。

## 公式出題範囲との対応

| 範囲 | 主な問題 |
|---|---|
| 平均ベクトル・分散共分散行列・相関行列 | P3M-A01, A02, B01 |
| 多変量正規・線形変換・周辺 | P3M-A03, B01, C04 |
| 条件付き分布 | P3M-B02, C01, C02, D01 |
| 独立性 | P3M-B03, C05 |
| 偏相関 | P3M-A04, C03 |
| 二次形式 | P3M-B04, C04, P3M-DRILL-01 |

## 前提知識チェック

1. F0-01: 2次正方行列の積・逆行列・行列式を確認する。
2. P2-02: 分散の和と共分散の計算式を使う。
3. P2-01: 同時確率密度関数から周辺・条件付き確率密度関数を作る。
4. P3-02: 一変量正規分布の平均・分散・標準化を使う。
5. P1-02: 独立性と条件付き確率の定義を区別する。

## 学習目標

- 2変量の平均ベクトルと分散共分散行列を、各成分の意味と結び付けて読める。
- 線形結合の平均・分散と、多変量正規分布の周辺分布を計算できる。
- 二変量正規分布の条件付き平均・条件付き分散を、共分散から計算できる。
- 「無相関」と「独立」の違いを説明し、同時正規のときだけ使える性質を区別できる。
- 偏相関を「第3変数の線形な影響を除いた後の相関」として計算できる。
- マハラノビス距離を「尺度と相関を調整した距離」として計算できる。

合格基準はLevel B 85%以上、Level C 70%以上、30分ドリル70点以上です。


---

# 1. 動機と試験での位置づけ

複数の測定値を同時に扱うと、各変数の分散だけでなく「一緒に動く方向」が重要です。分散共分散行列はその方向を表し、多変量正規分布では線形変換・周辺化・条件付けが閉じた形で計算できます。この構造は回帰、分散分析、時系列、主成分分析の共通基盤です。

最初からブロック行列の公式を暗記する必要はありません。まず二変量で「条件を与えると平均がどう動き、分散がどれだけ小さくなるか」を計算し、その仕組みを理解してから3変量以上の行列表記へ進みます。

また「共分散0なら独立」は一般には偽です。多変量正規という仮定があるときだけ使えることを、答案の結論に必ず添えます。


---

# 2. まず2変量で意味をつかむ

この章では、平均・分散・共分散が有限に存在する確率変数を扱います。最初から一般の$p$変量で考えるより、$X,Y$の2変量で意味をつかむ方が見通しがよくなります。

## 2.1 確率ベクトルは「確率変数を縦に並べたもの」

2つの確率変数$X,Y$をまとめて
$$
\boldsymbol X=
\begin{pmatrix}X\\Y\end{pmatrix}
$$
と書きます。これを確率ベクトルといいます。

平均も同じ順番に並べて
$$
E[\boldsymbol X]
=
\begin{pmatrix}E[X]\\E[Y]\end{pmatrix}
$$
と書きます。たとえば$E[X]=1$, $E[Y]=2$なら、平均ベクトルは$(1,2)^{\mathsf T}$です。

## 2.2 分散共分散行列は「分散と共分散の表」

$X,Y$の分散と共分散を1つの行列にまとめると
$$
\Sigma=
\begin{pmatrix}
\operatorname{Var}(X)&\operatorname{Cov}(X,Y)\\
\operatorname{Cov}(X,Y)&\operatorname{Var}(Y)
\end{pmatrix}
$$
です。

たとえば
$$
\Sigma=
\begin{pmatrix}4&3\\3&9\end{pmatrix}
$$
なら、読み取る内容は
$$
\operatorname{Var}(X)=4,\qquad
\operatorname{Var}(Y)=9,\qquad
\operatorname{Cov}(X,Y)=3
$$
です。対角成分が各変数の分散、対角でない成分が変数どうしの共分散です。

標準偏差は$2$と$3$なので、相関係数は
$$
\rho
=\frac{\operatorname{Cov}(X,Y)}{\sqrt{\operatorname{Var}(X)}\sqrt{\operatorname{Var}(Y)}}
=\frac3{2\cdot3}=\frac12.
$$
したがって相関行列は
$$
R=
\begin{pmatrix}1&1/2\\1/2&1\end{pmatrix}
$$
です。

$p$変量でも考え方は同じで、$(i,j)$成分に$\operatorname{Cov}(X_i,X_j)$を並べます。

## 2.3 多変量正規分布は「正規分布をまとめたもの」

2変量正規分布を
$$
\begin{pmatrix}X\\Y\end{pmatrix}
\sim N_2\left(
\begin{pmatrix}\mu_X\\\mu_Y\end{pmatrix},
\begin{pmatrix}
\sigma_X^2&\sigma_{XY}\\
\sigma_{XY}&\sigma_Y^2
\end{pmatrix}
\right)
$$
と書きます。本教材では第2母数は分散共分散行列です。

この分布で特に重要なのは次の2点です。

1. $X$だけ、$Y$だけを取り出しても正規分布である。
2. $aX+bY$のような線形結合も正規分布である。

したがって、多変量正規分布の問題では「平均と分散を計算できれば分布まで決まる」場面が多くあります。

密度を直接使う問題では、$p$変量の場合、$|\Sigma|$を$\Sigma$の行列式として
$$
f(\boldsymbol x)
=\frac{1}{(2\pi)^{p/2}|\Sigma|^{1/2}}
\exp\left\{-\frac12
(\boldsymbol x-\boldsymbol\mu)^{\mathsf T}
\Sigma^{-1}(\boldsymbol x-\boldsymbol\mu)\right\}
$$
を使います。本章の通常演習では、$\Sigma^{-1}$が計算できる場合を中心に扱います。

## 2.4 条件付き分布は「$X=x$と分かった後の$Y$の分布」

たとえば身長$X$と体重$Y$を同時に考えているとき、「身長が$x$だと分かった人だけに絞った体重の分布」が$Y\mid(X=x)$です。

同時確率密度関数を$f_{X,Y}(x,y)$、$X$の周辺確率密度関数を$f_X(x)$とすると、$f_X(x)>0$の範囲で
$$
f_{Y\mid X}(y\mid x)
=\frac{f_{X,Y}(x,y)}{f_X(x)}
$$
です。

二変量正規分布では、この条件付き分布も正規分布になります。具体式は3.3節で、なぜそうなるかも含めて確認します。

## 2.5 偏相関は「第3の変数の影響を除いた後の相関」

$X_1$と$X_2$の相関が高くても、両方が$X_3$と強く関係しているために相関して見えることがあります。

そこで、$X_1$から$X_3$で説明できる直線的な部分を引き、$X_2$からも同様に引きます。その残りどうしの相関が、$X_3$を調整した偏相関です。

公式をいきなり暗記するのではなく、3.5節で残差を実際に作って式を導きます。

## 2.6 二次形式とマハラノビス距離

行列
$$
A=\begin{pmatrix}a&b\\b&c\end{pmatrix}
$$
に対して
$$
(x,y)A\begin{pmatrix}x\\y\end{pmatrix}
=ax^2+2bxy+cy^2
$$
のような形を二次形式といいます。

平均$\boldsymbol\mu$、分散共分散行列$\Sigma$をもつデータ$\boldsymbol x$に対して
$$
Q=(\boldsymbol x-\boldsymbol\mu)^{\mathsf T}
\Sigma^{-1}(\boldsymbol x-\boldsymbol\mu)
$$
を考えると、単位の違いと変数間の相関を調整した「中心からの距離の二乗」になります。これがマハラノビス距離の二乗です。

たとえば$\Sigma=\operatorname{diag}(4,9)$なら
$$
Q=\frac{(x_1-\mu_1)^2}{4}
+\frac{(x_2-\mu_2)^2}{9},
$$
つまり各座標を標準偏差で割ってから距離を測っています。

---

# 3. 主要公式を2変量から理解する

## 3.1 線形結合の平均と分散

$W=aX+bY$とします。期待値の線形性から
$$
E[W]=aE[X]+bE[Y].
$$
分散は
$$
\begin{aligned}
\operatorname{Var}(W)
&=\operatorname{Var}(aX+bY)\\
&=a^2\operatorname{Var}(X)
+b^2\operatorname{Var}(Y)
+2ab\operatorname{Cov}(X,Y).
\end{aligned}
$$
ここで最後の交差項を落とさないことが重要です。

同じ計算を行列でまとめると、$\boldsymbol Y=A\boldsymbol X+\boldsymbol b$に対して
$$
E[\boldsymbol Y]=A\boldsymbol\mu+\boldsymbol b,
\qquad
\operatorname{Cov}(\boldsymbol Y)=A\Sigma A^{\mathsf T}
$$
となります。この行列による表記は新しい考え方というより、上の分散・共分散計算をまとめて書いたものです。

## 3.2 多変量正規分布の周辺分布と線形結合

$$
\begin{pmatrix}X\\Y\end{pmatrix}
\sim N_2\left(
\begin{pmatrix}\mu_X\\\mu_Y\end{pmatrix},
\begin{pmatrix}
\sigma_X^2&\sigma_{XY}\\
\sigma_{XY}&\sigma_Y^2
\end{pmatrix}
\right)
$$
なら
$$
X\sim N(\mu_X,\sigma_X^2),
\qquad
Y\sim N(\mu_Y,\sigma_Y^2).
$$
さらに$aX+bY$も正規分布で、その平均と分散は3.1節の式で求められます。

たとえば$X+Y$なら
$$
X+Y\sim N\left(
\mu_X+\mu_Y,
\sigma_X^2+\sigma_Y^2+2\sigma_{XY}
\right).
$$

## 3.3 二変量正規の条件付き分布

まず記号を減らして考えます。$X,Y$が同時に正規分布に従い、
$$
E[X]=\mu_X,\quad E[Y]=\mu_Y,
$$
$$
\operatorname{Var}(X)=\sigma_X^2,\quad
\operatorname{Var}(Y)=\sigma_Y^2,\quad
\operatorname{Cov}(X,Y)=\sigma_{XY}
$$
とします。

$X$から$Y$を直線的に予測する係数を
$$
\beta=\frac{\sigma_{XY}}{\sigma_X^2}
$$
と置き、予測で説明できなかった残りを
$$
R=Y-\mu_Y-\beta(X-\mu_X)
$$
とします。

すると
$$
\begin{aligned}
\operatorname{Cov}(R,X)
&=\operatorname{Cov}(Y,X)-\beta\operatorname{Var}(X)\\
&=\sigma_{XY}-\frac{\sigma_{XY}}{\sigma_X^2}\sigma_X^2=0.
\end{aligned}
$$
$R$と$X$も同時正規なので、共分散0から独立です。したがって$X=x$と分かっても$R$の分布は変わりません。

また
$$
\begin{aligned}
\operatorname{Var}(R)
&=\sigma_Y^2
-2\beta\sigma_{XY}
+\beta^2\sigma_X^2\\
&=\sigma_Y^2-\frac{\sigma_{XY}^2}{\sigma_X^2}.
\end{aligned}
$$
よって
$$
Y\mid(X=x)
\sim N\left(
\mu_Y+\frac{\sigma_{XY}}{\sigma_X^2}(x-\mu_X),
\sigma_Y^2-\frac{\sigma_{XY}^2}{\sigma_X^2}
\right).
$$

相関係数$\rho=\sigma_{XY}/(\sigma_X\sigma_Y)$を使えば
$$
Y\mid(X=x)
\sim N\left(
\mu_Y+\rho\frac{\sigma_Y}{\sigma_X}(x-\mu_X),
\sigma_Y^2(1-\rho^2)
\right).
$$

### 3変量以上ではどう書くか

求めたい変数群を$\boldsymbol X_1$、値が分かっている変数群を$\boldsymbol X_2$とします。平均と分散共分散行列を対応する部分に分けて
$$
\begin{pmatrix}\boldsymbol X_1\\\boldsymbol X_2\end{pmatrix}
\sim N\left(
\begin{pmatrix}\boldsymbol\mu_1\\\boldsymbol\mu_2\end{pmatrix},
\begin{pmatrix}
\Sigma_{11}&\Sigma_{12}\\
\Sigma_{21}&\Sigma_{22}
\end{pmatrix}
\right)
$$
と書きます。

このとき
$$
E[\boldsymbol X_1\mid\boldsymbol X_2=\boldsymbol x_2]
=\boldsymbol\mu_1+
\Sigma_{12}\Sigma_{22}^{-1}
(\boldsymbol x_2-\boldsymbol\mu_2),
$$
$$
\operatorname{Cov}(\boldsymbol X_1\mid\boldsymbol X_2=\boldsymbol x_2)
=\Sigma_{11}-\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}.
$$
大事なのは、後者には観測値$\boldsymbol x_2$が入らないことです。

> 補足：この差の行列には数学上の名称がありますが、本章では名称の暗記より「元のばらつきから、観測した変数で説明できる部分を引く」と理解することを優先します。

## 3.4 無相関と独立は同じではない

独立なら共分散0になりますが、逆は一般には成り立ちません。

たとえば$X$が$-1,0,1$をそれぞれ確率$1/3$で取り、$Y=X^2$とします。すると
$$
E[X]=0,
\qquad
E[XY]=E[X^3]=0
$$
なので
$$
\operatorname{Cov}(X,Y)=0.
$$
しかし$Y=0$なら必ず$X=0$なので、$X$と$Y$は独立ではありません。

一方、$X,Y$が**同時に二変量正規分布**に従う場合は
$$
\operatorname{Cov}(X,Y)=0
\quad\Longrightarrow\quad
X,Y\text{は独立}
$$
が成り立ちます。答案では「共分散0」だけでなく「同時正規」を必ず書きます。

## 3.5 偏相関を残差から導く

$X_1,X_2,X_3$が平均0、分散1に標準化されているとします。

$X_3$で説明できる部分を引いた残差を
$$
R_1=X_1-\rho_{13}X_3,
\qquad
R_2=X_2-\rho_{23}X_3
$$
と置きます。

共分散を1項ずつ展開すると
$$
\begin{aligned}
\operatorname{Cov}(R_1,R_2)
&=\operatorname{Cov}(X_1-\rho_{13}X_3,\,X_2-\rho_{23}X_3)\\
&=\rho_{12}-\rho_{23}\rho_{13}-\rho_{13}\rho_{23}
+\rho_{13}\rho_{23}\operatorname{Var}(X_3)\\
&=\rho_{12}-\rho_{13}\rho_{23},
\end{aligned}
$$
です。ここでは標準化済みなので$\operatorname{Var}(X_3)=1$を使いました。

同様に
$$
\begin{aligned}
\operatorname{Var}(R_1)
&=\operatorname{Var}(X_1-\rho_{13}X_3)\\
&=1+\rho_{13}^2-2\rho_{13}^2
=1-\rho_{13}^2,
\end{aligned}
$$
$$
\operatorname{Var}(R_2)=1-\rho_{23}^2.
$$
したがって残差どうしの相関は
$$
\rho_{12\cdot3}
=\frac{\rho_{12}-\rho_{13}\rho_{23}}
{\sqrt{(1-\rho_{13}^2)(1-\rho_{23}^2)}}.
$$
これが三変数の偏相関公式です。

## 3.6 マハラノビス二次形式とカイ二乗分布

相関がなく、分散が$\sigma_1^2,\ldots,\sigma_p^2$なら、中心からの標準化距離は
$$
\sum_{i=1}^p\frac{(X_i-\mu_i)^2}{\sigma_i^2}
$$
です。

相関がある場合、この考え方を行列で書いたものが
$$
Q=(\boldsymbol X-\boldsymbol\mu)^{\mathsf T}
\Sigma^{-1}(\boldsymbol X-\boldsymbol\mu)
$$
です。

$\boldsymbol X$が$p$変量正規分布に従うとき、尺度と相関を調整した座標では独立な標準正規変数$p$個になります。そのため
$$
Q\sim\chi_p^2.
$$
B04ではこの結果を使って計算し、C04では2変量の具体的な変換を使って平方和になることを確認します。

---

# 4. 計算例：式をどう使うか

## 例1：分散共分散行列を読む

$$
\begin{pmatrix}X\\Y\end{pmatrix}
\sim N_2\left(
\begin{pmatrix}1\\2\end{pmatrix},
\begin{pmatrix}4&3\\3&9\end{pmatrix}
\right)
$$
なら
$$
E[X]=1,\quad E[Y]=2,
$$
$$
\operatorname{Var}(X)=4,\quad
\operatorname{Var}(Y)=9,\quad
\operatorname{Cov}(X,Y)=3.
$$
したがって$X\sim N(1,4)$、$Y\sim N(2,9)$で、相関係数は$1/2$です。

## 例2：線形結合$2X-Y$

上と同じ平均・分散・共分散なら
$$
E[2X-Y]=2\cdot1-2=0.
$$
分散は
$$
\begin{aligned}
\operatorname{Var}(2X-Y)
&=2^2\operatorname{Var}(X)+(-1)^2\operatorname{Var}(Y)\\
&\quad+2\cdot2\cdot(-1)\operatorname{Cov}(X,Y)\\
&=16+9-12=13.
\end{aligned}
$$
同時正規なら$2X-Y\sim N(0,13)$です。

## 例3：条件付き正規分布

$$
E[X]=0,\quad E[Y]=1,
$$
$$
\operatorname{Var}(X)=4,\quad
\operatorname{Var}(Y)=9,\quad
\operatorname{Cov}(X,Y)=2
$$
とします。

条件付き平均の係数は
$$
\frac{\operatorname{Cov}(X,Y)}{\operatorname{Var}(X)}
=\frac24=\frac12.
$$
したがって
$$
E[Y\mid X=x]=1+\frac12x.
$$
条件付き分散は
$$
9-\frac{2^2}{4}=8
$$
なので
$$
Y\mid(X=x)\sim N\left(1+\frac x2,8\right).
$$
「$X$を知ると$Y$の平均は動くが、条件付き分散8は$x$そのものには依存しない」ことを確認してください。

## 例4：偏相関

$\rho_{12}=0.7$, $\rho_{13}=0.5$, $\rho_{23}=0.4$なら
$$
\operatorname{Cov}(R_1,R_2)
=0.7-0.5\cdot0.4=0.5,
$$
$$
\operatorname{Var}(R_1)=1-0.5^2=0.75,
\qquad
\operatorname{Var}(R_2)=1-0.4^2=0.84.
$$
よって
$$
\rho_{12\cdot3}
=\frac{0.5}{\sqrt{0.75\cdot0.84}}
=\frac{0.5}{\sqrt{0.63}}.
$$
単純相関0.7から、第3変数と共通する線形関係を取り除いた値です。

## 例5：相関を考慮した距離

$$
\Sigma=\begin{pmatrix}2&1\\1&2\end{pmatrix}
$$
なら
$$
\Sigma^{-1}
=\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}.
$$
中心からのずれが$\boldsymbol x=(1,-1)^{\mathsf T}$なら
$$
\Sigma^{-1}\boldsymbol x
=\frac13
\begin{pmatrix}2&-1\\-1&2\end{pmatrix}
\begin{pmatrix}1\\-1\end{pmatrix}
=\begin{pmatrix}1\\-1\end{pmatrix}.
$$
したがって
$$
Q=\boldsymbol x^{\mathsf T}\Sigma^{-1}\boldsymbol x
=(1,-1)\begin{pmatrix}1\\-1\end{pmatrix}=2.
$$

---

# 5. 本番での読み方・解き方

## 5.1 分散共分散行列を見たら、まず成分へ戻す

2変量なら、対角から$\operatorname{Var}(X),\operatorname{Var}(Y)$、非対角から$\operatorname{Cov}(X,Y)$を読みます。必要ならその場で相関係数まで計算します。

## 5.2 線形結合は「平均」と「分散」を別々に計算する

$aX+bY$なら
$$
E[aX+bY]=aE[X]+bE[Y]
$$
を先に計算し、その後
$$
\operatorname{Var}(aX+bY)
=a^2\operatorname{Var}(X)+b^2\operatorname{Var}(Y)
+2ab\operatorname{Cov}(X,Y)
$$
を計算します。正規性がある場合は最後に分布名を付けます。

## 5.3 条件付き正規は2変量の係数から始める

$Y\mid X=x$なら、まず
$$
\frac{\operatorname{Cov}(X,Y)}{\operatorname{Var}(X)}
$$
を計算します。これが$x-\mu_X$に掛かる係数です。

次に
$$
\operatorname{Var}(Y)
-\frac{\operatorname{Cov}(X,Y)^2}{\operatorname{Var}(X)}
$$
を計算します。3変量以上で初めて、同じ計算をブロック行列に置き換えます。

## 5.4 「共分散0」を見たら正規仮定を確認する

- 一般の分布：共分散0だけでは独立とは言えない。
- 同時正規：共分散0なら独立と言える。

この2行を区別するだけで、正誤問題の典型的な失点を防げます。

## 5.5 偏相関は残差を作ってから相関を取る

公式を忘れても
$$
R_1=X_1-\rho_{13}X_3,
\qquad
R_2=X_2-\rho_{23}X_3
$$
から共分散と分散を計算すれば復元できます。

## 5.6 マハラノビス距離は逆行列を先に計算する

観測偏差$\boldsymbol d=\boldsymbol x-\boldsymbol\mu$を作り、
$$
Q=\boldsymbol d^{\mathsf T}\Sigma^{-1}\boldsymbol d
$$
を計算します。2次正方行列なら逆行列を先に出してから、$\Sigma^{-1}\boldsymbol d$、最後に内積の順に計算すると符号ミスを減らせます。

## 本番での選択判断

3分で「何が既知で、何を条件付け、何を求めるか」が整理できれば選択します。15分で平均・分散または条件付き平均まで進めば継続し、最後に「同時正規だから使える性質」を一文確認します。


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

実数値確率変数 $X,Y$ について、次の平均・分散・共分散が存在するとする。
$$
E[X]=1,\quad E[Y]=2,
$$
$$
\operatorname{Var}(X)=4,\quad
\operatorname{Var}(Y)=9,\quad
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

### P3M-A02 共分散と相関係数の範囲
- level: A
- minutes: 8
- topics: 共分散, 相関係数
- techniques: DIM-1
- calculation_load: low

実数値確率変数$X,Y$について
$$
\operatorname{Var}(X)=4,\qquad
\operatorname{Var}(Y)=9,\qquad
\operatorname{Cov}(X,Y)=c
$$
とする。相関係数は
$$
\rho=\frac{\operatorname{Cov}(X,Y)}
{\sqrt{\operatorname{Var}(X)}\sqrt{\operatorname{Var}(Y)}}
$$
で定義され、必ず$-1\leq\rho\leq1$を満たすことを用いてよい。

1. $\rho$を$c$で表せ。
2. $c$が取り得る範囲を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

標準偏差は
$$
\sqrt{\operatorname{Var}(X)}=2,
\qquad
\sqrt{\operatorname{Var}(Y)}=3
$$
なので
$$
\rho=\frac{c}{2\cdot3}=\frac c6.
$$
相関係数は$-1\leq\rho\leq1$を満たすから
$$
-1\leq\frac c6\leq1.
$$
両辺を6倍して
$$
-6\leq c\leq6.
$$

##### 本番答案

$\rho=c/(2\cdot3)=c/6$。$|\rho|\leq1$より$|c|\leq6$、したがって$-6\leq c\leq6$。

##### 採点基準

標準偏差4点、相関係数6点、$|\rho|\leq1$の利用6点、範囲4点。合計20点。

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

平均0、分散1に標準化された確率変数 $X_1,X_2,X_3$ の相関係数が
$$
\rho_{12}=\frac12,\qquad
\rho_{13}=\frac13,\qquad
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
\boldsymbol\mu=\begin{pmatrix}1\\0\\2\end{pmatrix},\quad
\Sigma=\begin{pmatrix}2&1&0\\1&3&1\\0&1&2\end{pmatrix}
$$
に従う。ここで $\Sigma$ は分散共分散行列である。また
$$
A=\begin{pmatrix}1&1&0\\0&1&-1\end{pmatrix},\qquad
\boldsymbol b=\begin{pmatrix}0\\1\end{pmatrix}
$$
とし、2次元確率ベクトル $\boldsymbol Y=A\boldsymbol X+\boldsymbol b$ を定める。アフィン変換公式
$$
A\boldsymbol X+\boldsymbol b
\sim N_2(A\boldsymbol\mu+\boldsymbol b,\,A\Sigma A^{\mathsf T})
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
分散共分散行列は $A\Sigma A^{\mathsf T}$ です。まず
$$
\begin{aligned}
A\Sigma
&=\begin{pmatrix}1&1&0\\0&1&-1\end{pmatrix}
\begin{pmatrix}2&1&0\\1&3&1\\0&1&2\end{pmatrix}\\
&=\begin{pmatrix}3&4&1\\1&2&-1\end{pmatrix}.
\end{aligned}
$$
さらに
$$
\begin{aligned}
A\Sigma A^{\mathsf T}
&=\begin{pmatrix}3&4&1\\1&2&-1\end{pmatrix}
\begin{pmatrix}1&0\\1&1\\0&-1\end{pmatrix}\\
&=\begin{pmatrix}7&3\\3&3\end{pmatrix}.
\end{aligned}
$$
従って
$$
\boldsymbol Y\sim N_2\left(
\begin{pmatrix}1\\-1\end{pmatrix},
\begin{pmatrix}7&3\\3&3\end{pmatrix}
\right).
$$

##### 本番答案

$A\boldsymbol\mu+\boldsymbol b=(1,-1)^{\mathsf T}$、$A\Sigma A^{\mathsf T}=\begin{pmatrix}7&3\\3&3\end{pmatrix}$より、$\boldsymbol Y$はこれらを平均ベクトル・分散共分散行列とする$N_2$に従う。

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
E[X]=0,\quad E[Y]=1,\quad
\sigma_X=2,\quad \sigma_Y=3,\quad \rho=\frac13
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

次の二変量正規分布の条件付き公式を用いてよい。$X,Y$ の平均を $\mu_X,\mu_Y$、分散を $\sigma_X^2,\sigma_Y^2$、共分散を $\sigma_{XY}$ とすると、次式が成り立つ。$X,Y$ の役割を入れ替えて用いてもよい。
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

$$
\boldsymbol X\sim N_2\left(
\begin{pmatrix}0\\0\end{pmatrix},
\Sigma
\right),
\qquad
\Sigma=\begin{pmatrix}2&1\\1&2\end{pmatrix}
$$
とする。マハラノビス二次形式を
$$
Q=\boldsymbol X^{\mathsf T}\Sigma^{-1}\boldsymbol X
$$
と定める。多変量正規分布では、この二次形式が自由度2のカイ二乗分布に従うという結果を用いてよい。

1. $\Sigma^{-1}$を2次正方行列の逆行列公式から求めよ。
2. $Q$の分布を答えよ。
3. 観測値$\boldsymbol x=(1,-1)^{\mathsf T}$に対する$Q$の値を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

行列式は
$$
|\Sigma|=2\cdot2-1\cdot1=3
$$
なので
$$
\Sigma^{-1}
=\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}.
$$
問題文で与えられた多変量正規分布の性質から
$$
Q\sim\chi_2^2.
$$
観測値では
$$
\Sigma^{-1}\boldsymbol x
=\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}
\begin{pmatrix}1\\-1\end{pmatrix}
=\begin{pmatrix}1\\-1\end{pmatrix},
$$
したがって
$$
Q=(1,-1)\begin{pmatrix}1\\-1\end{pmatrix}=2.
$$

##### 本番答案

$\Sigma^{-1}=3^{-1}\begin{pmatrix}2&-1\\-1&2\end{pmatrix}$。問題文の結果より$Q\sim\chi_2^2$。$\boldsymbol x=(1,-1)^{\mathsf T}$では$Q=2$。

##### 採点基準

行列式4点、逆行列6点、分布4点、数値計算6点。合計20点。

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
\boldsymbol\mu=\begin{pmatrix}2\\-1\end{pmatrix},\qquad
\Sigma=\begin{pmatrix}4&3\\3&9\end{pmatrix}
$$
である。

次の二変量正規分布の条件付き公式を用いてよい。$X,Y$ の平均を $\mu_X,\mu_Y$、分散を $\sigma_X^2,\sigma_Y^2$、共分散を $\sigma_{XY}$ とすると、次式が成り立つ。$X,Y$ の役割を入れ替えて用いてもよい。
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

### P3M-C02 3変量正規の条件付け
- level: C
- minutes: 24
- topics: 多変量正規分布, 条件付き分布, 独立性
- techniques: BLOCK-1, COND-NORMAL-1
- calculation_load: medium

3次元確率ベクトル$\boldsymbol X=(X_1,X_2,X_3)^{\mathsf T}$が
$$
\boldsymbol X
\sim N_3\left(
\begin{pmatrix}0\\1\\2\end{pmatrix},
\begin{pmatrix}4&1&2\\1&3&1\\2&1&2\end{pmatrix}
\right)
$$
に従う。第2母数は分散共分散行列である。

求めたい変数群を$\boldsymbol X_1$、条件として与える変数群を$\boldsymbol X_2$とし、対応する分散共分散行列を$\Sigma_{11},\Sigma_{12},\Sigma_{21},\Sigma_{22}$と分けたとき
$$
E[\boldsymbol X_1\mid\boldsymbol X_2=\boldsymbol x_2]
=\boldsymbol\mu_1+\Sigma_{12}\Sigma_{22}^{-1}(\boldsymbol x_2-\boldsymbol\mu_2),
$$
$$
\operatorname{Cov}(\boldsymbol X_1\mid\boldsymbol X_2=\boldsymbol x_2)
=\Sigma_{11}-\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}
$$
を用いてよい。

1. $(X_1,X_2)^{\mathsf T}\mid(X_3=4)$の条件付き平均を求めよ。
2. 条件付き分散共分散行列を求めよ。
3. 条件付きで$X_1,X_2$は独立か。正規性も含めて根拠を述べよ。
4. $X_1\mid(X_3=4)$の分布を求めよ。

<!-- solution-start -->

#### 解答

##### 時間配分

初動3分、(1)6分、(2)7分、(3)4分、(4)2分、見直し2分。

##### 詳細解答

求める側を
$$
\boldsymbol X_1=\begin{pmatrix}X_1\\X_2\end{pmatrix},
$$
条件として与える側を$X_3$とすると
$$
\boldsymbol\mu_1=\begin{pmatrix}0\\1\end{pmatrix},
\qquad
\mu_2=2,
$$
$$
\Sigma_{11}=\begin{pmatrix}4&1\\1&3\end{pmatrix},
\quad
\Sigma_{12}=\begin{pmatrix}2\\1\end{pmatrix},
\quad
\Sigma_{22}=2.
$$
したがって条件付き平均は
$$
\begin{aligned}
E[\boldsymbol X_1\mid X_3=4]
&=\begin{pmatrix}0\\1\end{pmatrix}
+\begin{pmatrix}2\\1\end{pmatrix}\frac12(4-2)\\
&=\begin{pmatrix}2\\2\end{pmatrix}.
\end{aligned}
$$
条件付き分散共分散行列は
$$
\begin{aligned}
&\begin{pmatrix}4&1\\1&3\end{pmatrix}
-\begin{pmatrix}2\\1\end{pmatrix}\frac12\begin{pmatrix}2&1\end{pmatrix}\\
&=\begin{pmatrix}2&0\\0&5/2\end{pmatrix}.
\end{aligned}
$$
条件付き分布も二変量正規で、交差共分散が0なので$X_1,X_2$は条件付きで独立です。第1成分だけ取り出せば
$$
X_1\mid(X_3=4)\sim N(2,2).
$$

##### 本番答案

$\boldsymbol\mu_1=(0,1)^{\mathsf T}$、$\mu_2=2$、$\Sigma_{12}=(2,1)^{\mathsf T}$、$\Sigma_{22}=2$。したがって
$$
E[\boldsymbol X_1\mid X_3=4]
=\begin{pmatrix}2\\2\end{pmatrix},
$$
$$
\operatorname{Cov}(\boldsymbol X_1\mid X_3=4)
=\begin{pmatrix}2&0\\0&5/2\end{pmatrix}.
$$
条件付きでも同時正規かつ共分散0なので独立。$X_1\mid(X_3=4)\sim N(2,2)$。

##### 採点基準と選択判断

ブロックの読み取り4点、条件付き平均6点、条件付き分散共分散6点、独立性2点、周辺分布2点。合計20点。まず求める側と条件側を分け、15分で条件付き平均まで進めば継続します。

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

### P3M-C04 相関を取り除く変換と二次形式
- level: C
- minutes: 25
- topics: 線形変換, 二次形式, 多変量正規分布
- techniques: AFFINE-1, QUAD-MVN-1
- calculation_load: medium

$$
\begin{pmatrix}X_1\\X_2\end{pmatrix}
\sim N_2\left(
\begin{pmatrix}0\\0\end{pmatrix},
\begin{pmatrix}2&1\\1&2\end{pmatrix}
\right)
$$
とする。新しい確率変数を
$$
Z_1=\frac{X_1+X_2}{\sqrt6},
\qquad
Z_2=\frac{X_1-X_2}{\sqrt2}
$$
と定める。

1. $E[Z_1],E[Z_2]$を求めよ。
2. $\operatorname{Var}(Z_1),\operatorname{Var}(Z_2),\operatorname{Cov}(Z_1,Z_2)$を求めよ。
3. $(Z_1,Z_2)$が同時正規であることも用いて、$Z_1,Z_2$の分布と独立性を述べよ。
4. $\Sigma^{-1}$を求め、
$$
Q=\boldsymbol X^{\mathsf T}\Sigma^{-1}\boldsymbol X
$$
が$Z_1^2+Z_2^2$に等しいことを示せ。
5. $Q$の分布を求めよ。

<!-- solution-start -->

#### 解答

##### 時間配分

初動3分、(1)2分、(2)8分、(3)4分、(4)6分、(5)2分。

##### 詳細解答

平均0なので
$$
E[Z_1]=E[Z_2]=0.
$$
分散は
$$
\operatorname{Var}(Z_1)
=\frac{2+2+2\cdot1}{6}=1,
$$
$$
\operatorname{Var}(Z_2)
=\frac{2+2-2\cdot1}{2}=1.
$$
また
$$
\begin{aligned}
\operatorname{Cov}(Z_1,Z_2)
&=\frac1{\sqrt{12}}\operatorname{Cov}(X_1+X_2,X_1-X_2)\\
&=\frac1{\sqrt{12}}\{\operatorname{Var}(X_1)-\operatorname{Var}(X_2)\}=0.
\end{aligned}
$$
線形結合なので$(Z_1,Z_2)$も二変量正規です。各平均0、分散1、共分散0なので
$$
Z_1\sim N(0,1),\qquad Z_2\sim N(0,1)
$$
かつ独立です。

一方
$$
\Sigma^{-1}=\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}
$$
なので
$$
Q=\frac23(X_1^2-X_1X_2+X_2^2).
$$
また
$$
\begin{aligned}
Z_1^2+Z_2^2
&=\frac{(X_1+X_2)^2}{6}+\frac{(X_1-X_2)^2}{2}\\
&=\frac23(X_1^2-X_1X_2+X_2^2)=Q.
\end{aligned}
$$
従って$Q$は独立な標準正規2個の平方和なので
$$
Q\sim\chi_2^2.
$$

##### 本番答案

$E[Z_1]=E[Z_2]=0$、$\operatorname{Var}(Z_1)=\operatorname{Var}(Z_2)=1$、$\operatorname{Cov}(Z_1,Z_2)=0$。線形変換後も同時正規なので$Z_1,Z_2$は独立な$N(0,1)$。また
$$
\Sigma^{-1}=\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix},
\qquad
Q=Z_1^2+Z_2^2,
$$
ゆえに$Q\sim\chi_2^2$。

##### 採点基準と選択判断

平均2点、分散・共分散6点、正規性と独立4点、逆行列と二次形式6点、分布2点。合計20点。

<!-- solution-end -->

### P3M-C05 正誤判定総合
- level: C
- minutes: 22
- topics: 共分散, 独立性, 多変量正規分布, 条件付き分布
- techniques: INDEP-NORMAL-1, ANSWER-1
- calculation_load: medium

次を正誤判定し、正しければ根拠、誤りなら反例または不足している仮定を示せ。

1. 分散共分散行列の対角成分は各変数の分散であり、$(i,j)$成分と$(j,i)$成分は等しい。
2. 実数値確率変数$X,Y$で$\operatorname{Cov}(X,Y)=0$なら独立である。
3. 結合分布が二変量正規分布である$X,Y$で共分散0なら独立である。
4. 多変量正規分布の条件付き分散共分散行列は、条件付けた観測値そのものに依存する。
5. 多変量正規分布の一部の成分だけを取り出した周辺分布も多変量正規分布である。

<!-- solution-start -->

#### 解答

##### 時間配分

初動2分、各小問4分。

##### 詳細解答

1. 正しい。対角成分は$\operatorname{Var}(X_i)$で、$\operatorname{Cov}(X_i,X_j)=\operatorname{Cov}(X_j,X_i)$だから対称です。
2. 誤り。たとえば$X$が$-1,0,1$を各確率$1/3$で取り、$Y=X^2$とする。$E[X]=E[X^3]=0$なので共分散0だが、$Y=0$なら必ず$X=0$なので独立ではありません。
3. 正しい。同時正規という追加条件があると、共分散0から独立が従います。
4. 誤り。条件付き平均には観測値が入るが、条件付き分散共分散行列には観測値そのものは入りません。
5. 正しい。多変量正規分布から一部の成分を取り出した周辺分布も正規です。

##### 本番答案

(1)正。分散共分散行列は対角が分散、非対角が共分散で対称。(2)誤。$X\in\{-1,0,1\}$を各$1/3$、$Y=X^2$なら共分散0だが非独立。(3)正。同時正規なら共分散0から独立。(4)誤。条件付き分散共分散行列は観測値に依存しない。(5)正。部分ベクトルの周辺分布も多変量正規。

##### 採点基準と選択判断

各4点。各項について正誤1点、根拠または反例3点。合計20点。

<!-- solution-end -->

## Level D：発展

### P3M-D01 条件付き正規公式の導出
- level: D
- minutes: 40
- topics: 多変量正規分布, 条件付き分布
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
に従い、$\Sigma_{22}$ の逆行列が存在するものとする。条件付き正規公式そのものを導出する問題なので、公式は使用せず以下を示せ。

1. $B=\Sigma_{12}\Sigma_{22}^{-1}$、$\boldsymbol R=\boldsymbol X_1-\boldsymbol\mu_1-B(\boldsymbol X_2-\boldsymbol\mu_2)$ と置き、$\operatorname{Cov}(\boldsymbol R,\boldsymbol X_2)=0$ を示せ。
2. $\operatorname{Cov}(\boldsymbol R)=\Sigma_{11}-\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}$ を示せ。
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
=\Sigma_{11}-\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}.
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
&=\Sigma_{11}-\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}=\Sigma_{11}-\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}.
\end{aligned}
$$
$(\boldsymbol R,\boldsymbol X_2)$の結合分布は多変量正規で無相関なので独立し、$\boldsymbol R\sim N_p(\boldsymbol0,\Sigma_{1\mid2})$。$\boldsymbol X_1=\boldsymbol\mu_1+B(\boldsymbol X_2-\boldsymbol\mu_2)+\boldsymbol R$へ$\boldsymbol X_2=\boldsymbol x_2$を入れれば
$$
\boldsymbol X_1\mid(\boldsymbol X_2=\boldsymbol x_2)\sim N_p\left(\boldsymbol\mu_1+\Sigma_{12}\Sigma_{22}^{-1}(\boldsymbol x_2-\boldsymbol\mu_2),\Sigma_{11}-\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}\right).
$$

##### 採点基準と選択判断

次元2点、交差共分散4点、残差分散共分散5点、正規性3点、独立性3点、条件付き分布3点。合計20点。3分で残差化が見えなければ後回しにします。15分で交差共分散0まで得られれば継続し、25分で条件付き分散共分散行列まで完成しなければ途中式を残して打ち切ります。完成した場合は独立残差の平行移動として閉じます。

<!-- solution-end -->

---

# 7. 30分ドリル

- 制限時間: 30分
- level: C

## 過去問傾向との対応

MATH-2021-Q5とMATH-2018-Q4の「線形変換、条件付き正規、独立性、二次形式」の連鎖を校正対象とする。平均・分散共分散行列・観測値は独自で、条件付き平均を回帰予測として解釈し、Mahalanobis距離の計算までを扱う。

## P3M-DRILL-01 多変量正規・条件付け・二次形式

$N_2(\boldsymbol\mu,\boldsymbol\Sigma)$は、平均$\boldsymbol\mu\in\mathbb R^2$、分散共分散行列$\boldsymbol\Sigma$をもつ二変量正規分布を表す。この問題では次の密度式を用いてよい。
$$
f(\boldsymbol z)=\frac{1}{2\pi|\boldsymbol\Sigma|^{1/2}}
\exp\left[-\frac12(\boldsymbol z-\boldsymbol\mu)^{\mathsf T}
\boldsymbol\Sigma^{-1}(\boldsymbol z-\boldsymbol\mu)\right],
\qquad \boldsymbol z\in\mathbb R^2.
$$
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
多変量正規分布のマハラノビス二次形式の結果より$Q\sim\chi_2^2$です。観測偏差は$(2,1)^{\mathsf T}$で
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
2. 分散共分散行列は対角に分散、非対角に共分散を並べる。
3. $a^{\mathsf T}\Sigma a$は線形結合の分散。
4. 相関行列の対角は1。
5. アフィン平均は$A\mu+b$。
6. アフィン共分散は$A\Sigma A^{\mathsf T}$。
7. 多変量正規では周辺分布と線形結合も正規になる。
8. 密度を使う問題では、問題文で与えられた分散共分散行列と密度式を確認する。
9. 正規の部分ベクトルは正規。
10. 条件付き平均は観測偏差に依存する。
11. 条件付き共分散は観測値に依存しない。
12. 条件付き分散共分散行列は観測値そのものに依存しない。
13. 一般には無相関から独立は出ない。
14. 同時正規なら無相関と独立が同値。
15. 偏相関は残差間相関。
16. 偏相関公式は残差どうしの相関から復元できる。
17. 尺度と相関を調整すると標準正規変数へ変換できる。
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
- 答案確認: 条件付き平均の係数、条件付き分散、独立と無相関を区別する。

## 過去問型独自ドリルとの接続

P3M-DRILL-01は同じ正規モデルで周辺、線形変換、条件付き予測、Mahalanobis距離へ進む。後半で前半の平均・共分散を再計算せず再利用する。



---

# 9. 復習チェック

- [ ] 分散共分散行列の対角成分と非対角成分が何を表すか説明できる。
- [ ] 線形結合の平均と分散を、共分散の交差項を含めて計算できる。
- [ ] 多変量正規分布の周辺分布と線形結合の分布を求められる。
- [ ] 二変量正規の条件付き平均・条件付き分散を共分散から計算できる。
- [ ] 3変量以上では「求める側」と「条件として与える側」を分けて行列を読める。
- [ ] 一般の「無相関」と、同時正規での「無相関なら独立」を区別できる。
- [ ] 偏相関を残差の相関として説明し、三変数の公式を復元できる。
- [ ] マハラノビス二次形式を、尺度と相関を調整した距離として計算できる。
- [ ] 演習で使用する非自明な公式が、問題文で許可されているか、設問で導出対象になっているかを確認できる。