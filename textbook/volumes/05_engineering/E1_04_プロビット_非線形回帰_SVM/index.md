# E1-04 プロビット・非線形回帰・SVM

この章では、公式出題範囲に並んでいる **プロビット分析・非線形回帰モデル・サポートベクターマシン（SVM）** を扱います。ただし、これらは同じモデルの派生形ではありません。最初に「何を知りたいのか」を分けると位置付けが見えます。

| データ上の問い | 欲しいもの | 主な方法 |
|---|---|---|
| 合格/不合格、故障/正常などの **1になる確率** を説明したい | $P(Y=1\mid x)$ | ロジット、プロビット |
| 時間とともに減衰する量などの **平均曲線とその母数** を推定したい | $E(Y\mid x)$ と物理・工学的母数 | 非線形回帰 |
| 2群を分ける **分類境界そのもの** が欲しい | 符号による分類規則 | SVM |

したがって本章では、公式名を順に暗記するのではなく、

1. 2値データで「確率」をモデル化するロジットとプロビットを比較する。
2. 連続応答で、現象を表す式の母数を推定する非線形回帰を見る。
3. 再び2値分類へ戻り、「確率ではなく境界を直接決める」SVMを見る。

という順に進みます。

本章は [通常教材の執筆スタイルガイド](../../../style-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md)、[共通記号ガイド](../../../../references/notation-guide.md)、[共通用語ガイド](../../../../references/terminology-guide.md) に従います。

関連章:

- [L2-01 一般化線形モデル](../../04_linear_models/L2_01_一般化線形モデル/index.md): ベルヌーイ尤度、リンク関数、ロジスティック回帰。
- [L1-01 単回帰と最小二乗法](../../04_linear_models/L1_01_単回帰と最小二乗法/index.md): 最小二乗法、残差平方和。
- [E1-03 因子分析・クラスター分析](../E1_03_因子分析_クラスター分析/index.md): 教師なし学習との対比。
- [F0-02 制約付き最適化・双対問題・KKT条件](../../00_foundations/F0_02_制約付き最適化_双対_KKT/index.md): 不等式制約、双対関数、弱双対性、KKT条件。
- [E1-04A SVM補講：ソフトマージン・hinge損失・カーネル法](../E1_04A_SVM補講_ソフトマージン_カーネル/index.md): ソフトマージン双対、$0\le\alpha_i\le C$、KKTによる点の分類、カーネルの半正定値条件。

## この章で解けるようになる問題

- 問題設定を見て、ロジット・プロビット・非線形回帰・SVMのどれを考えるべきか判定する。
- 潜在正規変数の閾値モデルからプロビット回帰を導く。
- ロジットとプロビットが「何を仮定し、何を解釈しやすいか」を比較する。
- プロビット回帰の尤度・スコア・限界効果を導く。
- 「説明変数に非線形」と「未知母数に非線形」を区別し、非線形最小二乗法を立てる。
- Jacobianによる一次近似からGauss--Newton法を導く。
- 「確率を推定する2値回帰」と「境界を直接最適化するSVM」を区別する。
- ハードマージンSVMの主問題から、双対関数を経て双対問題を途中式付きで導く。
- KKT条件の4群をSVMに適用し、サポートベクトルの意味を説明する。
- ハードマージンが現実データで厳しすぎる理由を説明し、スラック変数からhinge損失を導く。
- $C$ が「広いマージン」と「違反を減らすこと」の交換比率であると説明する。
- 特徴写像で非線形境界を線形問題へ持ち上げ、双対問題の内積からkernel trickが出る流れを説明する。

## 公式出題範囲との対応

| 範囲 | 本章の内容 |
|---|---|
| プロビット分析 | 潜在変数、ロジットとの比較、尤度、スコア、限界効果 |
| 非線形回帰モデル | 現象モデル、非線形最小二乗、Jacobian、Gauss--Newton、局所識別 |
| サポートベクターマシン | 確率モデルとの目的の違い、マージン、主問題、双対問題、KKT、ソフトマージン、hinge損失、特徴写像、カーネル |

## 前提知識チェック

1. L2-01: ベルヌーイ分布、2値回帰、尤度、ロジットリンク。
2. L1-01: 最小二乗法、残差平方和。
3. F0-00: 内積、偏微分、Lagrange未定乗数法、Taylorの一次近似。
4. SVMの双対・KKTで詰まった場合は [F0-02 制約付き最適化・双対問題・KKT条件](../../00_foundations/F0_02_制約付き最適化_双対_KKT/index.md) を先に読む。

---

## 1. 導入：まず「何を出力したいか」を決める

### 1.1 同じ0/1データでも、目的は二つある

製品について説明変数 $\boldsymbol x$ から「故障するか」を予測したいとします。応答は

$$
Y=
\begin{cases}
1,&\text{故障},\\
0,&\text{正常}
\end{cases}
$$

です。

ここで欲しいものが

$$
P(Y=1\mid \boldsymbol x)=0.73
$$

のような **故障確率** なら、ロジットやプロビットのような2値回帰が自然です。

一方、欲しいものが

$$
\boldsymbol w^{\mathsf T}\boldsymbol x+b>0
\quad\Longrightarrow\quad
\text{故障側}
$$

という **分類境界** なら、SVMという別の考え方があります。

どちらも最終的に0/1を予測できますが、途中で求めているものが違います。

### 1.2 連続応答なら別の問題である

今度は、部品の性能 $y$ が時間 $t$ とともに

$$
y\approx \alpha e^{-\beta t}
$$

のように減衰するとします。このとき知りたいのは分類境界ではなく、初期量 $\alpha$ や減衰速度 $\beta$ です。

このように **現象を表す平均曲線の母数をデータから推定する** のが、本章でいう非線形回帰です。

---

## 2. プロビット：ロジットがあるのになぜ別のモデルがあるのか

### 2.1 まずロジットを思い出す

ロジスティック回帰では

$$
p_i=P(Y_i=1\mid\boldsymbol x_i),
\qquad
\eta_i=\boldsymbol x_i^{\mathsf T}\boldsymbol\beta
$$

に対して

$$
p_i=\frac{1}{1+e^{-\eta_i}}
$$

と置きます。したがって

$$
\log\frac{p_i}{1-p_i}=\eta_i.
$$

ロジットが便利なのは、係数が **対数オッズ** と直接結び付く点です。

### 2.2 「観測できない連続量が閾値を超えた」と考える

プロビットが自然に現れる代表的な考え方は **潜在変数モデル** です。

たとえば実際には「故障しやすさ」$Y_i^*$ という連続量があり、

$$
Y_i^*
=\boldsymbol x_i^{\mathsf T}\boldsymbol\beta+\varepsilon_i
$$

だが、観測できるのは

$$
Y_i=
\begin{cases}
1,&Y_i^*>0,\\
0,&Y_i^*\le0
\end{cases}
$$

だけだと考えます。

ここで

$$
\varepsilon_i\sim N(0,1)
$$

なら

$$
\begin{aligned}
P(Y_i=1\mid\boldsymbol x_i)
&=P(Y_i^*>0\mid\boldsymbol x_i)\\
&=P(\varepsilon_i>-\boldsymbol x_i^{\mathsf T}\boldsymbol\beta)\\
&=\Phi(\boldsymbol x_i^{\mathsf T}\boldsymbol\beta).
\end{aligned}
$$

したがって

$$
\boxed{
p_i=\Phi(\eta_i)
}
$$

となります。これがプロビット回帰です。

つまり、プロビットは「標準正規累積分布関数を何となく選ぶ」のではなく、

> 潜在的な連続量の誤差を正規分布とみなし、閾値を超えたかだけ観測する

というモデルから導けます。

### 2.3 ロジットとの関係

ロジットとプロビットはいずれも

$$
p_i=F(\eta_i)
$$

という形です。

- プロビット: $F=\Phi$（標準正規累積分布関数）
- ロジット: $F$ はロジスティック分布の累積分布関数

したがって、潜在変数の誤差を標準ロジスティック分布と置けばロジット型の閾値モデルも作れます。

両者のS字曲線はかなり似ているため、同じデータに当てはめると予測確率が近くなる場合が多い一方、係数の尺度そのものは同じではありません。

使い分けの見方は次の通りです。

| 観点 | ロジット | プロビット |
|---|---|---|
| 確率の作り方 | logistic 累積分布関数 | normal 累積分布関数 |
| 係数の代表的解釈 | オッズ比と結び付けやすい | 潜在正規変数の尺度で解釈 |
| 潜在変数表現 | logistic誤差 | normal誤差 |
| 計算上の特徴 | $dp/d\eta=p(1-p)$ | $dp/d\eta=\phi(\eta)$ |

「どちらが常に上」ではなく、モデル化したい仕組みと解釈が違います。

### 2.4 なぜ潜在誤差の分散を1に固定するのか

もし

$$
\varepsilon_i\sim N(0,\sigma^2)
$$

なら

$$
P(Y_i=1\mid\boldsymbol x_i)
=
\Phi\left(
\frac{\boldsymbol x_i^{\mathsf T}\boldsymbol\beta}{\sigma}
\right).
$$

観測確率から分かるのは $\boldsymbol\beta/\sigma$ だけです。$\boldsymbol\beta$ と $\sigma$ を別々には識別できないため、尺度を決める目的で通常

$$
\sigma=1
$$

と固定します。

---

## 3. プロビットの推定と解釈

### 3.1 尤度

ベルヌーイ尤度より

$$
L(\boldsymbol\beta)
=
\prod_{i=1}^n
\Phi(\eta_i)^{y_i}
\{1-\Phi(\eta_i)\}^{1-y_i}.
$$

対数尤度は

$$
\ell(\boldsymbol\beta)
=
\sum_i
\left[
y_i\log\Phi(\eta_i)
+(1-y_i)\log\{1-\Phi(\eta_i)\}
\right].
$$

### 3.2 スコア

$p_i=\Phi(\eta_i)$ とおくと

$$
\frac{\partial\ell_i}{\partial p_i}
=
\frac{y_i-p_i}{p_i(1-p_i)},
$$

$$
\frac{dp_i}{d\eta_i}
=
\phi(\eta_i),
\qquad
\frac{\partial\eta_i}{\partial\boldsymbol\beta}
=
\boldsymbol x_i.
$$

連鎖律から

$$
\boxed{
\frac{\partial\ell}{\partial\boldsymbol\beta}
=
\sum_i
\boldsymbol x_i
\frac{\phi(\eta_i)(y_i-p_i)}
{p_i(1-p_i)}
}.
$$

ロジスティック回帰では $dp/d\eta=p(1-p)$ が分母と相殺しますが、プロビットでは相殺しません。

### 3.3 限界効果

連続説明変数 $x_j$ について

$$
\boxed{
\frac{\partial p}{\partial x_j}
=
\phi(\eta)\beta_j
}.
$$

したがって、$\beta_j$ は「$x_j$ が1増えれば成功確率が常に $\beta_j$ 増える」という意味ではありません。

たとえば $\beta_j=0.8$、$\eta=0$ なら

$$
\phi(0)\approx0.3989
$$

なので

$$
\frac{\partial p}{\partial x_j}
\approx0.3989\times0.8
\approx0.319.
$$

同じ $\beta_j$ でも $\eta$ が変われば $\phi(\eta)$ が変わるため、確率への効果も変わります。

---

## 4. 非線形回帰：曲線を描きたいのではなく、現象の母数を知りたい

### 4.1 「曲線だから非線形回帰」ではない

たとえば

$$
y=\beta_0+\beta_1x+\beta_2x^2+\varepsilon
$$

は $x$ に対して曲線ですが、未知母数 $\beta_0,\beta_1,\beta_2$ の線形結合なので **線形回帰** です。

一方、

$$
y=\alpha e^{-\beta x}+\varepsilon
$$

では未知母数 $\beta$ が指数関数の内部に入っています。このため未知母数に対して非線形です。

本章でいう非線形回帰は、この **母数に対する非線形性** を指します。

### 4.2 なぜ多項式回帰で済ませないのか

データ点だけを滑らかに結ぶことが目的なら、多項式などで近似できる場合もあります。

しかし工学では、

$$
f(t;\alpha,\beta)=\alpha e^{-\beta t}
$$

の $\alpha$ が初期量、$\beta$ が減衰速度を表すように、平均関数そのものに現象上の意味がある場合があります。

このとき欲しいのは「それらしい曲線」だけではなく、

$$
\boxed{\alpha,\beta\text{ の推定値}}
$$

です。そこで現象モデル $f(x;\boldsymbol\theta)$ を直接データへ当てはめます。

---

## 5. 非線形最小二乗とGauss--Newton法

### 5.1 非線形最小二乗法

一般に

$$
y_i=f(\boldsymbol x_i;\boldsymbol\theta)+\varepsilon_i
$$

とし、

$$
r_i(\boldsymbol\theta)
=
y_i-f(\boldsymbol x_i;\boldsymbol\theta)
$$

とします。

非線形最小二乗推定量は

$$
\boxed{
\widehat{\boldsymbol\theta}
=
\arg\min_{\boldsymbol\theta}
\sum_i r_i(\boldsymbol\theta)^2
}.
$$

### 5.2 正規誤差なら最尤法と一致する

独立に

$$
\varepsilon_i\sim N(0,\sigma^2)
$$

と仮定すると

$$
\ell(\boldsymbol\theta,\sigma^2)
=
-\frac n2\log(2\pi\sigma^2)
-\frac{1}{2\sigma^2}
RSS(\boldsymbol\theta).
$$

したがって、$\boldsymbol\theta$ について尤度を最大化することと

$$
RSS(\boldsymbol\theta)
$$

を最小化することは同値です。

### 5.3 なぜ普通の最小二乗の公式が使えないのか

線形回帰なら、残差平方和は係数について二次関数になり、正規方程式を一度解けば済みます。

非線形回帰では一般に

$$
f(\boldsymbol x;\boldsymbol\theta)
$$

が $\boldsymbol\theta$ に対して非線形なので、同じ閉形式は得られません。

そこで

> 現在の母数の近くでは、曲がった関数も直線的に見える

という一次近似を使います。

### 5.4 JacobianとGauss--Newton更新

平均ベクトルを $\boldsymbol f(\boldsymbol\theta)$、残差を

$$
\boldsymbol r
=
\boldsymbol y-\boldsymbol f(\boldsymbol\theta)
$$

とし、Jacobianを

$$
J(\boldsymbol\theta)
=
\left[
\frac{\partial f_i}{\partial\theta_j}
\right]
$$

とします。

現在値 $\boldsymbol\theta^{(t)}$ の近くで

$$
\boldsymbol f(\boldsymbol\theta^{(t)}+\boldsymbol\delta)
\approx
\boldsymbol f(\boldsymbol\theta^{(t)})
+J_t\boldsymbol\delta.
$$

したがって新しい残差は

$$
\boldsymbol r_{\mathrm{new}}
\approx
\boldsymbol r_t-J_t\boldsymbol\delta.
$$

ここで

$$
\|\boldsymbol r_t-J_t\boldsymbol\delta\|^2
$$

を最小化すれば、これは $\boldsymbol\delta$ に関する通常の線形最小二乗問題です。正規方程式は

$$
J_t^{\mathsf T}J_t\boldsymbol\delta
=
J_t^{\mathsf T}\boldsymbol r_t.
$$

よって

$$
\boxed{
\boldsymbol\theta^{(t+1)}
=
\boldsymbol\theta^{(t)}
+
(J_t^{\mathsf T}J_t)^{-1}
J_t^{\mathsf T}\boldsymbol r_t
}.
$$

これがGauss--Newton法です。

指数減衰

$$
f(x;\alpha,\beta)=\alpha e^{-\beta x}
$$

なら

$$
\frac{\partial f}{\partial\alpha}=e^{-\beta x},
\qquad
\frac{\partial f}{\partial\beta}
=-\alpha x e^{-\beta x}.
$$

### 5.5 初期値・識別・変換

非線形 $RSS$ は単純な二次関数とは限らないため、初期値によって収束先や数値安定性が変わることがあります。

また $J^{\mathsf T}J$ がほぼ特異なら、母数を少し違う方向へ動かしてもほぼ同じ平均曲線になるため、母数を区別しにくくなります。

局所線形化が妥当なら

$$
\operatorname{Var}(\widehat{\boldsymbol\theta})
\approx
\sigma^2(J^{\mathsf T}J)^{-1}
$$

と近似できます。

なお、

$$
y=f(x)+\varepsilon
$$

という加法誤差モデルに単純に対数を取っても

$$
\log y=\log\{f(x)+\varepsilon\}
$$

であり、元と同じ誤差モデルの線形回帰にはなりません。変換するときは平均関数だけでなく誤差構造も変わる点に注意します。

---

## 6. SVM：確率ではなく分類境界を直接決める

### 6.1 ロジット・プロビットとの違い

再び2値分類を考えます。

ロジットやプロビットでは

$$
P(Y=1\mid\boldsymbol x)
$$

を確率モデルとして推定しました。

SVMでは基本的に、その確率分布を先に置きません。欲しいのは

$$
f(\boldsymbol x)
=
\boldsymbol w^{\mathsf T}\boldsymbol x+b
$$

の符号で分類するための **よい境界** です。

したがって、

- 故障確率を0.73のように出したい → ロジット / プロビット
- 故障側と正常側を頑健に分ける境界が欲しい → SVM

という違いがあります。

### 6.2 分けられる境界が何本もあるならどう選ぶか

2群が直線で完全に分離できる場合、正しく分ける境界は普通1本ではありません。

SVMはその中から、訓練点までの最小距離が最も大きい境界を選びます。この「余裕」が **マージン** です。

2値ラベルを $y_i\in\{-1,+1\}$ とすると、点 $\boldsymbol x_i$ の符号付き幾何学的マージンは

$$
\frac{
y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)
}{
\|\boldsymbol w\|
}.
$$

$f$ を正の定数倍しても分類境界は変わらないため、最近傍点で

$$
y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)=1
$$

となるよう尺度を決めます。

すると支持超平面

$$
\boldsymbol w^{\mathsf T}\boldsymbol x+b=\pm1
$$

は分類境界からそれぞれ

$$
\frac{1}{\|\boldsymbol w\|}
$$

だけ離れるので、両者の間隔は

$$
\boxed{
\frac{2}{\|\boldsymbol w\|}
}.
$$

### 6.3 完全分離とロジスティック回帰

完全分離されたデータでは、通常のロジスティック回帰で係数を分離方向へ大きくしていくと尤度が改善し続け、有限の最尤推定値が存在しない場合があります。

これは「ロジスティック回帰が分類できない」という意味ではなく、**確率モデルの母数推定** として問題が起こるということです。

SVMは最初から別の目的、

$$
\text{正しく分けつつマージンを最大化する}
$$

を採用します。この対比を見ると、2値データに対して同じ「分類」という言葉を使っていても、最適化しているものが違うことが分かります。

---

## 7. SVMの最適化

### 7.1 ハードマージン主問題

マージン最大化は $\|\boldsymbol w\|$ の最小化と同値なので、

$$
\boxed{
\min_{\boldsymbol w,b}
\frac12\|\boldsymbol w\|^2
}
$$

ただし

$$
\boxed{
y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)\ge1
}
$$

を解きます。

### 7.2 双対問題：何を最小化して、なぜ最大化問題になるのか

ここは式変形だけ追うと飛躍しやすいところです。まず制約を

$$
1-y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)\le0
$$

と書きます。各制約に $\alpha_i\ge0$ を付けて

$$
L(\boldsymbol w,b,\boldsymbol\alpha)
=
\frac12\|\boldsymbol w\|^2
+
\sum_i\alpha_i
\{1-y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)\}
$$

とします。

双対問題では、$\boldsymbol\alpha$ を固定したときに $\boldsymbol w,b$ を最も都合よく選んだ値

$$
\boxed{
q(\boldsymbol\alpha)
=
\inf_{\boldsymbol w,b}
L(\boldsymbol w,b,\boldsymbol\alpha)
}
$$

をまず求めます。

Lagrangianを展開すると

$$
\begin{aligned}
L
&=
\frac12\|\boldsymbol w\|^2
+
\sum_i\alpha_i
-
\boldsymbol w^{\mathsf T}
\sum_i\alpha_i y_i\boldsymbol x_i
-
b\sum_i\alpha_i y_i.
\end{aligned}
$$

#### $b$ について最小化する

最後の項は

$$
-b\sum_i\alpha_i y_i
$$

です。もし

$$
\sum_i\alpha_i y_i\neq0
$$

なら、$b$ を正または負の無限大へ動かして $L\to-\infty$ にできます。したがって双対関数が有限になるには

$$
\boxed{
\sum_i\alpha_i y_i=0
}
$$

が必要です。

#### $\boldsymbol w$ について最小化する

$$
\boldsymbol s
=
\sum_i\alpha_i y_i\boldsymbol x_i
$$

と置くと、$\boldsymbol w$ に関する部分は

$$
\frac12\|\boldsymbol w\|^2
-
\boldsymbol w^{\mathsf T}\boldsymbol s.
$$

平方完成して

$$
\frac12\|\boldsymbol w-\boldsymbol s\|^2
-
\frac12\|\boldsymbol s\|^2
$$

となるので、最小値は

$$
\boxed{
\boldsymbol w
=
\boldsymbol s
=
\sum_i\alpha_i y_i\boldsymbol x_i
}
$$

で達成されます。

したがって

$$
q(\boldsymbol\alpha)
=
\sum_i\alpha_i
-
\frac12
\left\|
\sum_i\alpha_i y_i\boldsymbol x_i
\right\|^2.
$$

ノルム平方を内積で展開すると

$$
\begin{aligned}
\left\|
\sum_i\alpha_i y_i\boldsymbol x_i
\right\|^2
&=
\left(
\sum_i\alpha_i y_i\boldsymbol x_i
\right)^{\mathsf T}
\left(
\sum_j\alpha_j y_j\boldsymbol x_j
\right)\\
&=
\sum_i\sum_j
\alpha_i\alpha_j y_i y_j
\boldsymbol x_i^{\mathsf T}\boldsymbol x_j.
\end{aligned}
$$

よって

$$
\boxed{
q(\boldsymbol\alpha)
=
\sum_i\alpha_i
-
\frac12
\sum_i\sum_j
\alpha_i\alpha_j y_i y_j
\boldsymbol x_i^{\mathsf T}\boldsymbol x_j
}.
$$

$q(\boldsymbol\alpha)$ は主問題の最適値に対する下界です。そこで下界をできるだけ大きくするため、双対問題は

$$
\boxed{
\max_{\boldsymbol\alpha}
\left[
\sum_i\alpha_i
-
\frac12
\sum_i\sum_j
\alpha_i\alpha_j y_i y_j
\boldsymbol x_i^{\mathsf T}\boldsymbol x_j
\right]
}
$$

ただし

$$
\boxed{
\alpha_i\ge0,
\qquad
\sum_i\alpha_i y_i=0
}
$$

となります。

双対関数がなぜ主問題の下界になるか、不等式制約の乗数がなぜ非負なのかまで戻りたい場合は [F0-02の双対性の構成](../../00_foundations/F0_02_制約付き最適化_双対_KKT/index.md#ref-duality-construction) を参照してください。

### 7.3 KKT条件：相補性だけではない

KKT条件は相補性条件1本の名前ではありません。ハードマージンSVMでは、最適解で次の4群を同時に満たします。

#### 1. 主実行可能性

元のSVM制約

$$
\boxed{
y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)\ge1
}
$$

を満たします。

#### 2. 双対実行可能性

各不等式制約の乗数について

$$
\boxed{\alpha_i\ge0}
$$

です。

#### 3. 停留条件

Lagrangianを $\boldsymbol w,b$ について最小化する条件から

$$
\boxed{
\boldsymbol w
=
\sum_i\alpha_i y_i\boldsymbol x_i
}
$$

$$
\boxed{
\sum_i\alpha_i y_i=0
}
$$

を得ます。

#### 4. 相補性条件

標準形

$$
1-y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)\le0
$$

に対して

$$
\alpha_i
\{1-y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)\}
=0.
$$

符号を変えて

$$
\boxed{
\alpha_i
\{y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)-1\}
=0
}
$$

と書いても同じです。

この積が0であることから、

- $y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)>1$ でマージンより外側に余裕がある点では $\alpha_i=0$
- $\alpha_i>0$ となる点では $y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)=1$

となります。

後者は支持超平面上の点です。したがって

$$
\boldsymbol w
=
\sum_i\alpha_i y_i\boldsymbol x_i
$$

に実際に寄与するのは、主としてこの **サポートベクトル** です。

つまり「サポートベクトルだけが境界を支える」という性質は、KKT相補性から出てきます。

一般のKKT条件、activeな制約、弱双対性・強双対性まで含めた説明は [F0-02のKKT条件の整理](../../00_foundations/F0_02_制約付き最適化_双対_KKT/index.md#ref-kkt-overview) を参照してください。

### 7.4 ソフトマージンとhinge損失：なぜ必要で、どこから出るのか

#### 7.4.1 ハードマージンは現実のデータには厳しすぎる

ハードマージンでは全点に

$$
y_i f(\boldsymbol x_i)\ge1
$$

を要求しました。

しかし現実には、測定誤差、外れ値、クラスの重なりなどがあります。1点でもどうしても条件を満たせない点があると、ハードマージン問題は実行不可能になります。

また、たった1個の外れ値を無理に正しく分類するために、境界を大きく動かすのも望ましくありません。

そこで発想を

> 全点に絶対服従させるのではなく、違反した量に罰金を払って許す

へ変えます。

#### 7.4.2 スラック変数は「1にどれだけ届かなかったか」

各点について

$$
\boxed{
\xi_i\ge0
}
$$

を導入し、制約を

$$
\boxed{
y_i f(\boldsymbol x_i)\ge1-\xi_i
}
$$

へ緩めます。

$m_i=y_if(\boldsymbol x_i)$ と置けば

$$
\xi_i\ge1-m_i,
\qquad
\xi_i\ge0.
$$

したがって、与えられた境界 $f$ に対して必要な **最小の** スラックは

$$
\boxed{
\xi_i
=
\max\{0,1-m_i\}
=
\max\{0,1-y_if(\boldsymbol x_i)\}
}
$$

です。

「最小」を選ぶのは、後で $\xi_i$ に正の罰金を掛けるためです。必要以上に大きな $\xi_i$ を選んでも目的関数が悪化するだけです。

#### 7.4.3 三つの領域を見る

$m_i=y_if(\boldsymbol x_i)$ によって点の状態を整理すると分かりやすくなります。

| $m_i$ | 状態 | 最小スラック |
|---:|---|---:|
| $m_i\ge1$ | 正しく分類され、マージン外 | $0$ |
| $0<m_i<1$ | 正しいがマージン内 | $1-m_i$ |
| $m_i\le0$ | 誤分類 | $1-m_i\ge1$ |

例えば

$$
m_i=1.4,\quad0.6,\quad-0.3
$$

なら

$$
\xi_i=0,\quad0.4,\quad1.3
$$

です。

ここで重要なのは、**hinge損失は誤分類だけを罰しているのではない**ことです。$m_i=0.6$ は分類自体は正しいのに、境界に近すぎるので損失0.4を受けます。

SVMは「当たれば何でもよい」ではなく、「当てたうえで境界から余裕を取れ」と要求しているわけです。

#### 7.4.4 ソフトマージン主問題

マージンを広くしたいという要求は

$$
\frac12\|\boldsymbol w\|^2
$$

を小さくすることで表します。

一方、違反を減らしたいという要求は

$$
\sum_i\xi_i
$$

を小さくすることで表します。

そこで

$$
\boxed{
\min_{\boldsymbol w,b,\boldsymbol\xi}
\frac12\|\boldsymbol w\|^2
+C\sum_i\xi_i
}
$$

subject to

$$
y_if(\boldsymbol x_i)\ge1-\xi_i,
\qquad
\xi_i\ge0
$$

とします。

これは

$$
\boxed{
\text{広いマージン}
\quad\text{と}\quad
\text{マージン違反を減らすこと}
}
$$

の両方を同時に最適化しています。

#### 7.4.5 $C$ は何を意味するのか

$C>0$ は違反に対する罰金の重さです。

- $C$ が大きい: 違反を強く嫌う。マージンを狭くしてでも訓練点へ合わせやすい。
- $C$ が小さい: 多少の違反を許す。より広いマージンを選びやすい。

したがって $C$ は「大きいほど良い」パラメータではなく、**「境界の単純さ・余裕」と「訓練データへの適合」の交換比率**です。

#### 7.4.6 hinge損失はスラックを消去すると現れる

最適なスラック

$$
\xi_i=\max\{0,1-y_if(\boldsymbol x_i)\}
$$

を目的関数へ代入すると

$$
\boxed{
\min_{\boldsymbol w,b}
\frac12\|\boldsymbol w\|^2
+
C\sum_i
\max\{0,1-y_if(\boldsymbol x_i)\}
}
$$

となります。

<a id="def-e1-04-hinge-loss"></a>

<!-- formal-statement-start -->
> **定義（hinge損失）**  
> 二値ラベル $y\in\{-1,+1\}$ と判別関数値 $f$ に対し

$$
\ell_{\mathrm{hinge}}(y,f)
=\max\{0,1-yf\}
$$

> を **hinge損失** といいます。
<!-- formal-statement-end -->

つまりhinge損失は突然選んだ損失関数ではありません。

> マージン制約をどれだけ破ったかを表す最小スラックを、目的関数へ代入したもの

です。

ソフトマージンの双対問題を導いて

$$
0\le\alpha_i\le C
$$

がどこから出るか、KKTで $\alpha_i$ の値から点の位置をどう読むかまでは [E1-04A SVM補講](../E1_04A_SVM補講_ソフトマージン_カーネル/index.md) で扱います。

### 7.5 カーネル法：非線形境界をどうやってSVMへ持ち込むのか

#### 7.5.1 まず「別の空間なら直線で分けられる」を考える

ここまでのSVMは

$$
f(\boldsymbol x)
=
\boldsymbol w^{\mathsf T}\boldsymbol x+b
$$

という線形境界でした。

ところが、元の空間では一本の直線・超平面で分けられない分類もあります。

1次元の簡単な例として、

- $|x|<1$ をクラス $-1$
- $|x|>1$ をクラス $+1$

としたいとします。

$x$ 軸上では、左端と右端が同じクラスなので、1個の閾値

$$
wx+b=0
$$

では分けられません。

しかし

$$
\boxed{
z=x^2}
$$

と変換すれば

$$
|x|<1\Longleftrightarrow z<1,
\qquad
|x|>1\Longleftrightarrow z>1.
$$

したがって $z$ 空間では

$$
z-1=0
$$

という線形な閾値で分けられます。

元の $x$ 空間へ戻せば境界は

$$
\boxed{x^2=1
}
$$

なので非線形です。

これが特徴写像

$$
\boldsymbol x\mapsto\varphi(\boldsymbol x)
$$

を使う基本発想です。

#### 7.5.2 特徴空間で普通の線形SVMを解く

特徴空間では

$$
f(\boldsymbol x)
=
\boldsymbol w^{\mathsf T}\varphi(\boldsymbol x)+b
$$

とします。

つまり新しいアルゴリズムを作ったのではなく、**変換後の特徴空間で線形SVMを解いている**だけです。

問題は、$\varphi$ が非常に高次元だと、その特徴ベクトルを毎回明示的に作るのが大変なことです。

ここで双対問題が効いてきます。

#### 7.5.3 双対問題では特徴は内積でしか現れない

特徴空間で7.2の双対問題を書くと

$$
\max_{\boldsymbol\alpha}
\left[
\sum_i\alpha_i
-
\frac12
\sum_{i,j}
\alpha_i\alpha_j y_i y_j
\varphi(\boldsymbol x_i)^{\mathsf T}
\varphi(\boldsymbol x_j)
\right].
$$

特徴ベクトルそのものではなく、

$$
\boxed{
\varphi(\boldsymbol x_i)^{\mathsf T}
\varphi(\boldsymbol x_j)
}
$$

という **内積だけ** が現れています。

ならば、この内積値を直接返す関数

$$
\boxed{
K(\boldsymbol x,\boldsymbol z)
=
\varphi(\boldsymbol x)^{\mathsf T}
\varphi(\boldsymbol z)
}
$$

を用意すれば、巨大な $\varphi(\boldsymbol x)$ を陽に作る必要がありません。

これが **kernel trick** です。

#### 7.5.4 多項式カーネルを実際に展開する

1次元で

$$
K(x,z)=(1+xz)^2
$$

とします。

展開すると

$$
(1+xz)^2
=1+2xz+x^2z^2.
$$

ここで

$$
\varphi(x)
=
\begin{pmatrix}
1\\
\sqrt2x\\
x^2
\end{pmatrix}
$$

と置けば

$$
\begin{aligned}
\varphi(x)^{\mathsf T}\varphi(z)
&=1+(\sqrt2x)(\sqrt2z)+x^2z^2\\
&=(1+xz)^2.
\end{aligned}
$$

したがって、

$$
K(x,z)=(1+xz)^2
$$

だけ計算すれば、暗黙に

$$
1,\quad x,\quad x^2
$$

という特徴を持つ空間で内積したのと同じ結果になります。

「高次元特徴を明示的に作らずに済む」という意味は、この例を見ると具体的になります。

#### 7.5.5 予測式もカーネルだけで書ける

特徴空間でも停留条件は

$$
\boldsymbol w
=
\sum_i\alpha_i y_i\varphi(\boldsymbol x_i)
$$

です。

したがって新しい点 $\boldsymbol x$ の判別関数は

$$
\begin{aligned}
f(\boldsymbol x)
&=\boldsymbol w^{\mathsf T}\varphi(\boldsymbol x)+b\\
&=
\sum_i\alpha_i y_i
\varphi(\boldsymbol x_i)^{\mathsf T}
\varphi(\boldsymbol x)+b\\
&=
\boxed{
\sum_i\alpha_i y_i
K(\boldsymbol x_i,\boldsymbol x)+b
}.
\end{aligned}
$$

つまり学習時だけでなく予測時にも $\varphi$ を陽に作らなくて済みます。

#### 7.5.6 何でも $K$ と書けばよいわけではない

カーネルは単なる任意の「似ている度」ではありません。特徴空間の内積として整合的である必要があります。

本章では詳細条件を証明しませんが、有限個の点 $\boldsymbol x_1,\dots,\boldsymbol x_n$ に対するGram行列

$$
G_{ij}=K(\boldsymbol x_i,\boldsymbol x_j)
$$

が対称半正定値になることが基本条件です。

この条件、ソフトマージン双対とカーネルを同時に入れた場合、RBFカーネルの意味まで掘る場合は [E1-04A SVM補講](../E1_04A_SVM補講_ソフトマージン_カーネル/index.md) を参照してください。

#### 7.5.7 本編での着地点

カーネル法について本編で押さえる因果関係は

$$
\boxed{
\text{元空間で非線形}
\to
\text{特徴空間へ写す}
\to
\text{特徴空間では線形SVM}
\to
\text{双対には内積しか出ない}
\to
\text{内積を }K\text{ で直接計算}
}
$$

です。

「カーネルを使えば非線形になる」とだけ覚えるより、この流れを持っておく方が式を再構成できます。

---

## 8. 典型例題：同じ「非線形」「分類」に惑わされない

### 例1：合否確率

試験得点 $x$ から合格確率を推定し、「1点増えると合格確率がどれくらい変わるか」を知りたい。

→ **ロジットまたはプロビット**。欲しいものが確率だからです。

さらに「観測されない合格力 $Y^*$ が正規誤差を伴い、閾値を超えると合格」と考えるならプロビットが自然です。

### 例2：反応量の飽和曲線

濃度 $x$ と反応量 $y$ に

$$
E(Y\mid x)
=
\frac{V_{\max}x}{K+x}
$$

という理論式があり、$V_{\max}$ と $K$ を推定したい。

→ **非線形回帰**。未知母数が分母にも入り、母数に対して非線形です。

### 例3：良品・不良品の境界

多数の測定値から良品・不良品を分けたい。確率の校正より、境界付近の点に対して余裕のある分類面が欲しい。

→ **SVM**。分類境界とマージンを直接最適化します。

---

## 9. 演習

### E1-04-A01 どの方法を使うか

- Level: A
- 目安時間: 8分
- 主題: モデル選択
- 使用技術: 問題設定の読解

次の各状況で、最も直接的な候補を「プロビット回帰・非線形回帰・SVM」から選び、理由を1行で述べよ。

1. 潜在的な耐久度が正規分布的にばらつき、耐久度が閾値を下回ると故障すると考え、故障確率を推定したい。
2. 温度 $t$ に対する反応量が $\alpha e^{-\beta t}$ に従うと考え、$\alpha,\beta$ を推定したい。
3. 2群を分ける確率より、分類境界から最も近い訓練点までの距離を大きくしたい。

<!-- solution-start -->

#### 解答

##### 詳細解答

1. **プロビット回帰**。潜在正規変数の閾値モデルから成功・故障確率を表す設定だからである。
2. **非線形回帰**。未知母数 $\beta$ が指数関数内部に入り、理論曲線の母数そのものを推定したいからである。
3. **SVM**。成功確率ではなく分類境界のマージン最大化が目的だからである。

##### 本番答案

1. プロビット。
2. 非線形回帰。
3. SVM。

各理由を「潜在正規閾値」「母数に非線形」「マージン最大化」と書けばよい。

##### 採点基準

- 各方法の選択: 各4点
- 各理由: 合計8点

<!-- solution-end -->

### E1-04-A02 プロビットの限界効果

- Level: A
- 目安時間: 7分
- 主題: 限界効果
- 使用技術: 連鎖律

$$
P(Y=1\mid x)=\Phi(\beta_0+\beta_1x)
$$

とする。$\beta_1=0.8$、$\eta=\beta_0+\beta_1x=0$、$\phi(0)=0.3989$ のとき、$x$ に関する限界効果を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
\frac{\partial p}{\partial x}
=
\phi(\eta)\beta_1
=
0.3989\times0.8
=
0.31912.
$$

したがって、この点における $x$ の1単位増加に対する確率の局所的な変化率は約0.319である。

##### 本番答案

$$
\boxed{0.319\text{程度}}
$$

##### 採点基準

- 限界効果の式: 10点
- 代入: 6点
- 結論: 4点

<!-- solution-end -->

### E1-04-A03 非線形回帰の判定

- Level: A
- 目安時間: 7分
- 主題: 非線形回帰
- 使用技術: 母数に関する線形性

次のうち、未知母数に対して非線形なものを選べ。

1. $y=\beta_0+\beta_1x+\beta_2x^2+\varepsilon$
2. $y=\alpha e^{-\beta x}+\varepsilon$
3. $y=\beta_0+\beta_1\log x+\varepsilon$

<!-- solution-start -->

#### 解答

##### 詳細解答

1と3は、変換された説明変数を使っていても未知母数の線形結合である。2は未知母数 $\beta$ が指数関数の内部に入るため、母数に対して非線形である。

##### 本番答案

**2のみ**。

##### 採点基準

- 2を選ぶ: 8点
- 1の説明: 4点
- 2の説明: 4点
- 3の説明: 4点

<!-- solution-end -->

### E1-04-A04 SVMのマージン

- Level: A
- 目安時間: 7分
- 主題: SVM
- 使用技術: 超平面からの距離

1次元SVMで $f(x)=2x$ とし、支持超平面を $2x=\pm1$ とする。支持超平面間のマージン幅を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$w=2$ なので

$$
\frac{2}{\|w\|}
=
\frac22
=
1.
$$

##### 本番答案

$$
\boxed{1}
$$

##### 採点基準

- マージン幅の式: 10点
- 計算: 10点

<!-- solution-end -->

## 10. Level B

### E1-04-B01 潜在変数からプロビット

- Level: B
- 目安時間: 12分
- 主題: 潜在変数
- 使用技術: 正規分布の対称性、識別

$$
Y^*=\boldsymbol x^{\mathsf T}\boldsymbol\beta+\varepsilon,
\qquad
Y=1\Longleftrightarrow Y^*>0
$$

とする。

1. $\varepsilon\sim N(0,1)$ のとき $P(Y=1\mid\boldsymbol x)=\Phi(\boldsymbol x^{\mathsf T}\boldsymbol\beta)$ を示せ。
2. $\varepsilon\sim N(0,\sigma^2)$ として $\sigma$ も未知にすると、なぜ $\boldsymbol\beta$ と $\sigma$ を別々に推定できないか説明せよ。
3. 潜在誤差を正規分布ではなくロジスティック分布と置くと、どの2値回帰と対応するか答えよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$\eta=\boldsymbol x^{\mathsf T}\boldsymbol\beta$ とすると

$$
P(Y=1\mid\boldsymbol x)
=
P(\varepsilon>-\eta)
=
\Phi(\eta).
$$

一般の $\sigma$ では

$$
P(Y=1\mid\boldsymbol x)
=
\Phi\left(\frac{\boldsymbol x^{\mathsf T}\boldsymbol\beta}{\sigma}\right)
$$

なので、観測確率は $\boldsymbol\beta/\sigma$ にしか依存しない。したがって尺度を固定する必要がある。

潜在誤差にロジスティック分布を用いる閾値モデルはロジットと対応する。

##### 本番答案

$$
P(Y=1\mid\boldsymbol x)=\Phi(\boldsymbol x^{\mathsf T}\boldsymbol\beta).
$$

一般の $\sigma$ では $\Phi(\boldsymbol x^{\mathsf T}\boldsymbol\beta/\sigma)$ となるため、$\boldsymbol\beta$ と $\sigma$ は比でしか識別されない。ロジスティック誤差ならロジットに対応する。

##### 採点基準

- 第1問: 8点
- 第2問: 8点
- 第3問: 4点

<!-- solution-end -->

### E1-04-B02 プロビットのスコア

- Level: B
- 目安時間: 15分
- 主題: 最尤推定
- 使用技術: ベルヌーイ尤度、連鎖律

$$
p_i=\Phi(\eta_i),
\qquad
\eta_i=\boldsymbol x_i^{\mathsf T}\boldsymbol\beta
$$

についてスコアを導け。また、ロジットでは途中のどの因子が相殺するか述べよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

1観測分の対数尤度は

$$
\ell_i
=
y_i\log p_i+(1-y_i)\log(1-p_i).
$$

よって

$$
\frac{\partial\ell_i}{\partial p_i}
=
\frac{y_i-p_i}{p_i(1-p_i)}.
$$

さらに

$$
\frac{dp_i}{d\eta_i}=\phi(\eta_i),
\qquad
\frac{\partial\eta_i}{\partial\boldsymbol\beta}
=\boldsymbol x_i.
$$

したがって

$$
\boxed{
\frac{\partial\ell}{\partial\boldsymbol\beta}
=
\sum_i
\boldsymbol x_i
\frac{\phi(\eta_i)(y_i-p_i)}
{p_i(1-p_i)}
}.
$$

ロジットでは

$$
\frac{dp_i}{d\eta_i}=p_i(1-p_i)
$$

なので、分母 $p_i(1-p_i)$ と相殺する。

##### 本番答案

上式。ロジットでは $dp/d\eta=p(1-p)$ がベルヌーイ尤度の微分に現れる分母と相殺する。

##### 採点基準

- 対数尤度: 4点
- $p$ に関する微分: 4点
- 連鎖律: 6点
- ロジットとの比較: 6点

<!-- solution-end -->

### E1-04-B03 Gauss--Newton更新式

- Level: B
- 目安時間: 15分
- 主題: 非線形最小二乗
- 使用技術: Taylor一次近似、最小二乗

$$
\boldsymbol y
=
\boldsymbol f(\boldsymbol\theta)+\boldsymbol\varepsilon
$$

について、Gauss--Newton更新式を一次近似から導け。

<!-- solution-start -->

#### 解答

##### 詳細解答

現在値 $\boldsymbol\theta^{(t)}$ のまわりで

$$
\boldsymbol f(\boldsymbol\theta^{(t)}+\boldsymbol\delta)
\approx
\boldsymbol f(\boldsymbol\theta^{(t)})
+
J_t\boldsymbol\delta.
$$

したがって

$$
\boldsymbol r_{\mathrm{new}}
\approx
\boldsymbol r_t-J_t\boldsymbol\delta.
$$

これの平方和を最小化すると

$$
J_t^{\mathsf T}J_t\boldsymbol\delta
=
J_t^{\mathsf T}\boldsymbol r_t.
$$

よって

$$
\boxed{
\boldsymbol\theta^{(t+1)}
=
\boldsymbol\theta^{(t)}
+
(J_t^{\mathsf T}J_t)^{-1}
J_t^{\mathsf T}\boldsymbol r_t
}.
$$

##### 本番答案

Taylor一次近似から残差を $\boldsymbol r_t-J_t\boldsymbol\delta$ と近似し、その最小二乗問題を解けば上式を得る。

##### 採点基準

- 一次近似: 5点
- 残差近似: 5点
- 正規方程式: 5点
- 更新式: 5点

<!-- solution-end -->

### E1-04-B04 ハードマージンSVMの双対

- Level: B
- 目安時間: 20分
- 主題: SVM双対
- 使用技術: Lagrangian、双対関数、平方完成

主問題

$$
\min_{\boldsymbol w,b}
\frac12\|\boldsymbol w\|^2
$$

subject to

$$
y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)\ge1
$$

から双対問題を導け。

<!-- solution-start -->

#### 解答

##### 詳細解答

制約を

$$
1-y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)\le0
$$

と書く。Lagrangianは

$$
L
=
\frac12\|\boldsymbol w\|^2
+
\sum_i\alpha_i
\{1-y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)\},
\qquad
\alpha_i\ge0.
$$

双対関数は

$$
q(\boldsymbol\alpha)
=
\inf_{\boldsymbol w,b}L.
$$

展開すると

$$
L
=
\frac12\|\boldsymbol w\|^2
+
\sum_i\alpha_i
-
\boldsymbol w^{\mathsf T}\sum_i\alpha_i y_i\boldsymbol x_i
-
b\sum_i\alpha_i y_i.
$$

$b$ について下に有界であるためには

$$
\sum_i\alpha_i y_i=0
$$

が必要である。

また

$$
\boldsymbol s=\sum_i\alpha_i y_i\boldsymbol x_i
$$

と置けば

$$
\frac12\|\boldsymbol w\|^2-\boldsymbol w^{\mathsf T}\boldsymbol s
=
\frac12\|\boldsymbol w-\boldsymbol s\|^2
-
\frac12\|\boldsymbol s\|^2.
$$

よって

$$
\boldsymbol w
=
\sum_i\alpha_i y_i\boldsymbol x_i
$$

で最小となり、

$$
q(\boldsymbol\alpha)
=
\sum_i\alpha_i
-
\frac12
\left\|\sum_i\alpha_i y_i\boldsymbol x_i\right\|^2.
$$

さらに

$$
\left\|\sum_i\alpha_i y_i\boldsymbol x_i\right\|^2
=
\sum_{i,j}
\alpha_i\alpha_jy_iy_j
\boldsymbol x_i^{\mathsf T}\boldsymbol x_j.
$$

したがって双対問題は

$$
\boxed{
\max_{\boldsymbol\alpha}
\left(
\sum_i\alpha_i
-\frac12\sum_{i,j}
\alpha_i\alpha_jy_iy_j
\boldsymbol x_i^{\mathsf T}\boldsymbol x_j
\right)
}
$$

ただし

$$
\boxed{
\alpha_i\ge0,
\qquad
\sum_i\alpha_i y_i=0
}.
$$

##### 本番答案

Lagrangianを置き、$b$ から $\sum_i\alpha_i y_i=0$、$\boldsymbol w$ の平方完成から $\boldsymbol w=\sum_i\alpha_i y_i\boldsymbol x_i$ を得る。これを用いて上の双対問題を得る。

##### 採点基準

- 制約の標準形とLagrangian: 4点
- $b$ に関する条件: 4点
- $\boldsymbol w$ の最小化・平方完成: 5点
- 双対関数: 3点
- 二重和への展開と最終双対問題: 4点

<!-- solution-end -->

## 11. Level C

### E1-04-C01 ロジットとプロビットの比較

- Level: C
- 目安時間: 20分
- 主題: 2値回帰のモデル選択
- 使用技術: 潜在変数、リンク関数、限界効果

ある部品について $Y=1$ を故障とし、説明変数を $x$ とする。次の2モデルを考える。

$$
\text{Model L}:\quad
P(Y=1\mid x)=\frac{1}{1+e^{-(a+bx)}},
$$

$$
\text{Model P}:\quad
P(Y=1\mid x)=\Phi(c+dx).
$$

1. Model L, P のリンク関数を書け。
2. Model P を潜在変数の閾値モデルとして表せ。
3. Model L で $b$ が直接結び付く解釈を述べよ。
4. Model P の $x$ に関する限界効果を書け。
5. 「潜在的な耐久度のばらつきを正規分布と考えたい」という情報があるとき、どちらのモデルが自然か述べよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

1. Model L は
   $$
   \log\frac{p}{1-p}=a+bx.
   $$
   Model P は
   $$
   \Phi^{-1}(p)=c+dx.
   $$
2.
   $$
   Y^*=c+dx+\varepsilon,\qquad \varepsilon\sim N(0,1),
   $$
   とし、
   $$
   Y=1\Longleftrightarrow Y^*>0
   $$
   とすればよい。
3. $x$ が1増えたとき対数オッズが $b$ 増え、オッズは $e^b$ 倍になる。
4.
   $$
   \frac{\partial p}{\partial x}
   =
   \phi(c+dx)d.
   $$
5. 潜在正規変数の閾値モデルに直接対応するためModel Pが自然である。

##### 本番答案

各リンク、潜在正規表現、オッズ比 $e^b$、限界効果 $\phi(c+dx)d$、Model Pを記す。

##### 採点基準

- 第1問: 4点
- 第2問: 5点
- 第3問: 4点
- 第4問: 4点
- 第5問: 3点

<!-- solution-end -->

### E1-04-C02 Gauss--Newton 1回更新

- Level: C
- 目安時間: 22分
- 主題: 非線形最小二乗
- 使用技術: Jacobian、2元連立方程式

$$
f(x;\alpha,\beta)=\alpha e^{-\beta x}
$$

をデータ $(0,2.0),(1,1.2),(2,0.7)$ に当てはめる。初期値を

$$
(\alpha^{(0)},\beta^{(0)})=(1.5,0.4)
$$

とし、次を用いてよい。

$$
J^{\mathsf T}J
\approx
\begin{pmatrix}
1.6512&-1.2797\\
-1.2797&2.8281
\end{pmatrix},
$$

$$
J^{\mathsf T}r
\approx
\begin{pmatrix}
0.6421\\
-0.2306
\end{pmatrix}.
$$

1. このモデルが母数に対して非線形である理由を述べよ。
2. Jacobianの1行分を書け。
3. 更新量 $\boldsymbol\delta$ を求めよ。
4. 更新後の $(\alpha,\beta)$ を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

1. $\beta$ が指数関数の内部に入っているためである。
2.
   $$
   \left(
   e^{-\beta x},
   -\alpha xe^{-\beta x}
   \right).
   $$
3.
   $$
   (J^{\mathsf T}J)\boldsymbol\delta
   =
   J^{\mathsf T}r
   $$
   を解くと
   $$
   \boldsymbol\delta
   \approx
   \begin{pmatrix}
   0.5015\\
   0.1454
   \end{pmatrix}.
   $$
4.
   $$
   \boxed{
   (\alpha^{(1)},\beta^{(1)})
   \approx(2.0015,0.5454)
   }.
   $$

##### 本番答案

非線形性、Jacobian、上の更新量と更新後母数を記す。

##### 採点基準

- 第1問: 3点
- 第2問: 5点
- 第3問: 7点
- 第4問: 5点

<!-- solution-end -->

### E1-04-C03 hinge損失と確率モデルとの違い

- Level: C
- 目安時間: 20分
- 主題: ソフトマージンSVM
- 使用技術: hinge損失、目的関数の解釈

$f(x)=x$ とし、訓練点を

$$
(-2,-1),\quad
(-0.2,-1),\quad
(0.4,+1),\quad
(2,+1)
$$

とする。

1. 各点の $y_if(x_i)$ を求めよ。
2. 各hinge損失 $\max\{0,1-y_if(x_i)\}$ を求めよ。
3. $C=1,w=1$ のとき
   $$
   \frac12w^2+C\sum_i\max\{0,1-y_if(x_i)\}
   $$
   を求めよ。
4. この目的関数がベルヌーイ対数尤度の最大化ではないことから、SVMとロジット・プロビットの目的の違いを説明せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

1.
   $$
   2,\quad0.2,\quad0.4,\quad2.
   $$
2.
   $$
   0,\quad0.8,\quad0.6,\quad0.
   $$
3. 損失和は1.4なので
   $$
   \frac12+1.4
   =
   \boxed{1.9}.
   $$
4. ロジット・プロビットは $P(Y=1\mid x)$ を確率モデルとして尤度で推定する。SVMは確率を直接モデル化せず、分類マージンと違反に対するhinge損失を最適化する。

##### 本番答案

$yf=(2,0.2,0.4,2)$、hinge損失 $(0,0.8,0.6,0)$、目的関数値1.9。SVMは確率尤度ではなくマージンとhinge損失を最適化する。

##### 採点基準

- 第1問: 4点
- 第2問: 5点
- 第3問: 5点
- 第4問: 6点

<!-- solution-end -->

### E1-04-C04 2点SVMを双対から解く

- Level: C
- 目安時間: 20分
- 主題: SVM双対
- 使用技術: 二次関数、KKT条件

$$
(x_1,y_1)=(-1,-1),
\qquad
(x_2,y_2)=(1,+1)
$$

について、

1. 双対制約から $\alpha_1,\alpha_2$ の関係を求めよ。
2. 双対目的関数を1変数で表して最大化せよ。
3. $w,b$ を求めよ。
4. 両点がサポートベクトルであることを確認せよ。
5. マージン幅を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

制約

$$
\sum_i\alpha_i y_i=0
$$

から

$$
\alpha_1=\alpha_2=\alpha.
$$

双対目的関数は

$$
W(\alpha)=2\alpha-2\alpha^2.
$$

したがって

$$
W'(\alpha)=2-4\alpha=0
$$

より

$$
\alpha=\frac12.
$$

また

$$
w
=
\sum_i\alpha_i y_ix_i
=
1,
\qquad
b=0.
$$

両点で

$$
y_i(wx_i+b)=1
$$

かつ $\alpha_i>0$ なので、両点ともサポートベクトルである。

マージン幅は

$$
\frac2{|w|}=2.
$$

##### 本番答案

$$
\boxed{
\alpha_1=\alpha_2=\frac12,\quad
w=1,\quad
b=0,\quad
\text{margin}=2
}.
$$

両点でKKTの境界条件が等号成立するため、両点ともサポートベクトル。

##### 採点基準

- 第1問: 3点
- 第2問: 5点
- 第3問: 4点
- 第4問: 4点
- 第5問: 4点

<!-- solution-end -->

## 12. Level D

### E1-04-D01 三手法を「何を推定するか」から統合する

- Level: D
- 目安時間: 35分
- 主題: 本章総合
- 使用技術: モデル選択、導出、比較

ある製造工程で、説明変数 $\boldsymbol x$ から不良品かどうかを判定したい。また別の実験では、時間 $t$ と連続的な性能値 $Z$ を測定している。

1. 不良の **確率** $P(Y=1\mid\boldsymbol x)$ を推定したいとき、ロジットまたはプロビットを使う理由を述べよ。
2. 「潜在的な不良傾向が正規誤差を伴い、閾値を超えると不良になる」と仮定して、プロビット回帰を導け。
3. 不良確率ではなく、2群を分ける境界の余裕を最大化したいとき、SVMのハードマージン主問題を導け。
4. 連続性能値について
   $$
   E(Z\mid t)=\alpha e^{-\beta t}
   $$
   と考える。これが線形回帰ではなく非線形回帰である理由を述べ、Gauss--Newton更新式を導け。
5. 以上の3手法について、「観測される応答」「直接求める対象」「代表的な最適化基準」を表にして比較せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

1. 応答が0/1でも欲しいのが条件付き確率なので、$[0,1]$ に値を持つ累積分布関数を通して線形予測子を確率へ写す2値回帰が自然である。
2.
   $$
   Y^*=\boldsymbol x^{\mathsf T}\boldsymbol\beta+\varepsilon,
   \qquad
   \varepsilon\sim N(0,1),
   $$
   $Y=1\Longleftrightarrow Y^*>0$ とすれば
   $$
   P(Y=1\mid\boldsymbol x)
   =
   \Phi(\boldsymbol x^{\mathsf T}\boldsymbol\beta).
   $$
3. 支持超平面を $\boldsymbol w^{\mathsf T}\boldsymbol x+b=\pm1$ と規格化するとマージン幅は $2/\|\boldsymbol w\|$。したがって
   $$
   \min_{\boldsymbol w,b}\frac12\|\boldsymbol w\|^2
   $$
   subject to
   $$
   y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)\ge1.
   $$
4. 未知母数 $\beta$ が指数関数内部にあるため母数に非線形。一次近似
   $$
   \boldsymbol f(\boldsymbol\theta+\boldsymbol\delta)
   \approx
   \boldsymbol f(\boldsymbol\theta)+J\boldsymbol\delta
   $$
   から
   $$
   \boxed{
   \boldsymbol\theta^{(t+1)}
   =
   \boldsymbol\theta^{(t)}
   +(J^{\mathsf T}J)^{-1}J^{\mathsf T}\boldsymbol r
   }.
   $$
5.

| 手法 | 応答 | 直接求める対象 | 代表的基準 |
|---|---|---|---|
| ロジット / プロビット | 0/1 | $P(Y=1\mid x)$ | ベルヌーイ尤度 |
| 非線形回帰 | 連続量 | 平均曲線の母数 $\theta$ | 残差平方和（正規誤差なら尤度と同値） |
| SVM | $\{-1,+1\}$ | 分類境界 | マージン最大化 / hinge損失 |

##### 本番答案

各小問で、確率モデル・現象曲線・分類境界の違いが明示されていればよい。

##### 採点基準

- 第1問: 3点
- 第2問: 4点
- 第3問: 4点
- 第4問: 5点
- 第5問: 4点

<!-- solution-end -->

---

## 13. 30分ドリル

### E1-04-DRILL-01 モデル選択から導出まで

- Level: C
- 目安時間: 30分
- 主題: 本章総合
- 使用技術: モデル選択、確率、一次近似、最適化

#### 問1

ある検査で「潜在的な品質スコアが正規分布的にばらつき、0を下回ると不良になる」と考える。

1. 適切な2値回帰を答えよ。
2. 線形予測子が $\eta=0.5$ のとき、$\Phi(0.5)=0.6915$ として成功確率を求めよ。
3. 係数 $\beta_1=1$、$\phi(0.5)=0.3521$ のとき限界効果を求めよ。

#### 問2

$$
f(x;\alpha,\beta)=\alpha e^{-\beta x}
$$

について、

1. Jacobianの1行分を求めよ。
2. Gauss--Newton法が何を毎回「線形問題として解き直している」のか説明せよ。
3. $J^{\mathsf T}J$ がほぼ特異なとき何が起こるか説明せよ。

#### 問3

$$
(x_1,y_1)=(-1,-1),
\qquad
(x_2,y_2)=(1,+1)
$$

のハードマージンSVMについて、

1. $w,b$ とマージン幅を求めよ。
2. サポートベクトルを示せ。
3. 「この問題でSVMが求めたものは成功確率ではない」とはどういう意味か説明せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

問1:

1. 潜在正規閾値モデルなのでプロビット。
2.
   $$
   p=\Phi(0.5)=0.6915.
   $$
3.
   $$
   \frac{\partial p}{\partial x}
   =
   \phi(0.5)\beta_1
   =
   0.3521.
   $$

問2:

1.
   $$
   \left(
   e^{-\beta x},
   -\alpha xe^{-\beta x}
   \right).
   $$
2. 現在値のまわりで平均関数を一次近似し、
   $$
   \|\boldsymbol r-J\boldsymbol\delta\|^2
   $$
   を最小にする線形最小二乗問題として更新量 $\boldsymbol\delta$ を求め直している。
3. 更新が数値的に不安定になり、異なる母数方向が似た平均曲線を作るため局所的に母数を識別しにくい。

問3:

1. 対称性から $b=0$、制約から $w=1$。マージン幅は2。
2. 両点で $y_i(wx_i+b)=1$ なので両方がサポートベクトル。
3. SVMは $P(Y=1\mid x)$ を推定したのではなく、符号で分類する境界 $wx+b=0$ とそのマージンを決めたという意味である。

##### 本番答案

1. プロビット、$p=0.6915$、限界効果0.3521。
2. Jacobianは $(e^{-\beta x},-\alpha xe^{-\beta x})$。各反復で局所線形最小二乗を解く。$J^{\mathsf T}J$ がほぼ特異なら推定が不安定。
3. $w=1,b=0$、幅2、両点がサポートベクトル。SVMの出力は確率ではなく分類境界。

##### 採点基準

- 問1: 6点
- 問2: 7点
- 問3: 7点

<!-- solution-end -->

---

## 14. 章末チェック

- 0/1データを見たとき、「確率が欲しいのか、分類境界が欲しいのか」を最初に区別できる。
- プロビットを「正規累積分布関数を使うモデル」とだけ覚えず、潜在正規変数の閾値モデルから導ける。
- ロジットとプロビットの違いを、累積分布関数・潜在誤差・係数解釈の観点から説明できる。
- 曲線であっても母数に線形なら線形回帰であることを判定できる。
- 非線形回帰では、現象を表す母数を推定するという目的を説明できる。
- Gauss--Newton法を「局所的に線形最小二乗へ直して反復する方法」と説明し、更新式を導ける。
- SVMのマージン幅 $2/\|\boldsymbol w\|$ を距離から導ける。
- SVMの双対関数を $q(\boldsymbol\alpha)=\inf_{\boldsymbol w,b}L$ から構成し、$b$ の条件・$\boldsymbol w$ の平方完成・二重和展開を経て双対問題を導ける。
- KKT条件を主実行可能性・双対実行可能性・停留条件・相補性の4群で書き、サポートベクトルとの関係を説明できる。
- スラック変数の制約から $\xi_i=\max\{0,1-y_if(\boldsymbol x_i)\}$ を導き、hinge損失の意味を説明できる。
- $C$ がマージン幅と違反量のトレードオフを調節することを説明できる。
- 特徴写像の具体例を使って「元空間で非線形、特徴空間で線形」という意味を説明できる。
- 双対問題に特徴ベクトルの内積しか現れないことから、kernel trickを説明できる。
- カーネルSVMの判別関数 $f(\boldsymbol x)=\sum_i\alpha_i y_iK(\boldsymbol x_i,\boldsymbol x)+b$ を書ける。
- ロジット / プロビット、非線形回帰、SVMについて「何を直接推定しているか」を比較できる。
