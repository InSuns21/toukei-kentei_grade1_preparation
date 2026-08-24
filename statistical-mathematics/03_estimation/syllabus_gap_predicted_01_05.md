# 推定・推測分野 シラバス補完予想問題 1〜5

このファイルは、統計検定1級の公式出題範囲と本リポジトリの `curriculum.yaml` を、既存の推定分野過去問型再構成演習1〜17位と突き合わせ、過去問型演習だけでは薄い論点を補完するために作成した予想問題集である。

- 公式過去問の再現ではなく、シラバスから逆算した独自予想問題である。
- 既存の `past_exam_reconstructed_01_05.md`、`06_10.md`、`11_17.md` と重複しすぎない論点を優先した。
- 数式・結論は独立に計算している。
- 数式は KaTeX 互換の `$...$`、`$$...$$`、`$$\begin{aligned}...\end{aligned}$$` を用いる。

## 追加根拠

既存17題では、最尤推定、不偏性、一致性、Fisher情報量、Cramér--Rao、Delta法、信頼区間、十分性、完備性などはかなり厚く扱っている。

一方、シラバス上は次の論点も明示されている。

- `I1-02`: 最小二乗法、BLUE
- `S1-03`: Horvitz--Thompson推定量、有限母集団補正、層化抽出、標本設計
- `I4-01`: 事前分布、事後分布、共役事前分布、Bayes推定量、事後最頻値、予測分布、損失関数
- `I4-02`: 観測データ尤度、打切り、切断、EM法、不完全データ

したがって、以下の5題を追加優先度の高い予想問題とする。

## 予想問題一覧

| 優先 | 安定ID | 主題 | 対応シラバス | Level | 目安時間 |
|---:|---|---|---|:---:|---:|
| 1 | `PRED-INF-01-BLUE` | 逆分散重み付き推定とBLUE | I1-02 | C | 25分 |
| 2 | `PRED-INF-02-STRATIFIED-HT` | 層化抽出・Horvitz--Thompson・Neyman配分 | S1-03 | C | 25分 |
| 3 | `PRED-INF-03-BETA-BINOMIAL` | Beta--Binomial共役Bayes推定 | I4-01 | C | 25分 |
| 4 | `PRED-INF-04-CENSORING` | 右打切り指数分布の観測データ尤度 | I4-02 | C | 25分 |
| 5 | `PRED-INF-05-EM-MIXTURE` | 2成分Poisson混合分布のEM法 | I4-02, P3-04 | C | 25分 |

---

## 予想1: 逆分散重み付き推定量を導きBLUE・MLE・Cramér--Raoへ接続する

- 安定ID: `PRED-INF-01-BLUE`
- 対応シラバス: `I1-02` 最小二乗法、BLUE、不偏性、有効性
- Level: C
- 目安時間: 25分
- 計算量: 中
- 主な使用技術: 線形不偏推定、Lagrange未定乗数法、逆分散重み、重み付き最小二乗、正規尤度、Fisher情報量

### 問題

独立な観測値 $Y_1,\ldots,Y_k$ が

$$
E[Y_i]=\theta,
\qquad
\operatorname{Var}(Y_i)=\sigma_i^2
$$

を満たすとする。$\sigma_i^2>0$ はすべて既知である。

線形推定量

$$
T=\sum_{i=1}^k a_iY_i
$$

を考える。

1. $T$ が $\theta$ の不偏推定量となるための必要十分条件を求めよ。
2. 不偏性の条件の下で $\operatorname{Var}(T)$ を最小にする $a_1,\ldots,a_k$ を求めよ。
3. 得られた推定量を $\widehat\theta_B$ とする。その分散を求めよ。
4. さらに

$$
Y_i\sim N(\theta,\sigma_i^2)
$$

とする。$\theta$ のMLEを求め、$\widehat\theta_B$ と一致することを示せ。
5. 正規モデルのFisher情報量を求め、$\widehat\theta_B$ がCramér--Rao下限を達成することを示せ。
6. $(\sigma_1^2,\sigma_2^2,\sigma_3^2)=(1,4,9)$ のとき、各観測値に付く重みを求めよ。

### 解答

#### 1. 不偏性

$$
\begin{aligned}
E[T]
&=E\left[\sum_{i=1}^ka_iY_i\right]\\
&=\sum_{i=1}^ka_iE[Y_i]\\
&=\theta\sum_{i=1}^ka_i.
\end{aligned}
$$

したがって、すべての $\theta$ に対して $E[T]=\theta$ となる必要十分条件は

$$
\boxed{\sum_{i=1}^ka_i=1}.
$$

#### 2. 分散最小化

独立性より

$$
\operatorname{Var}(T)
=\sum_{i=1}^ka_i^2\sigma_i^2.
$$

制約

$$
\sum_{i=1}^ka_i=1
$$

の下でこれを最小化する。

Lagrange関数を

$$
\mathcal L(a_1,\ldots,a_k,\lambda)
=\sum_{i=1}^ka_i^2\sigma_i^2
-\lambda\left(\sum_{i=1}^ka_i-1\right)
$$

とする。

各 $a_i$ で偏微分すると

$$
2a_i\sigma_i^2-\lambda=0.
$$

したがって

$$
a_i=\frac{\lambda}{2\sigma_i^2}.
$$

制約へ代入して

$$
\frac\lambda2\sum_{j=1}^k\frac1{\sigma_j^2}=1.
$$

よって

$$
\frac\lambda2
=\left(\sum_{j=1}^k\frac1{\sigma_j^2}\right)^{-1}.
$$

したがって

$$
\boxed{
a_i
=\frac{\sigma_i^{-2}}{\sum_{j=1}^k\sigma_j^{-2}}
}.
$$

すなわち分散の小さい観測ほど大きな重みを持つ。

#### 3. BLUEの分散

$$
\widehat\theta_B
=\frac{\sum_{i=1}^kY_i/\sigma_i^2}{\sum_{i=1}^k1/\sigma_i^2}.
$$

分散は

$$
\begin{aligned}
\operatorname{Var}(\widehat\theta_B)
&=\sum_{i=1}^k
\left(
\frac{\sigma_i^{-2}}{\sum_j\sigma_j^{-2}}
\right)^2\sigma_i^2\\
&=\frac{\sum_i\sigma_i^{-2}}{(\sum_j\sigma_j^{-2})^2}\\
&=\left(\sum_{i=1}^k\frac1{\sigma_i^2}\right)^{-1}.
\end{aligned}
$$

よって

$$
\boxed{
\operatorname{Var}(\widehat\theta_B)
=\frac1{\sum_i\sigma_i^{-2}}
}.
$$

これは線形不偏推定量の中で最小分散なのでBLUEである。

#### 4. 正規モデルでのMLE

対数尤度は定数項を除いて

$$
\ell(\theta)
=-\frac12\sum_{i=1}^k
\frac{(y_i-\theta)^2}{\sigma_i^2}.
$$

微分すると

$$
\frac{d\ell}{d\theta}
=\sum_{i=1}^k\frac{y_i-\theta}{\sigma_i^2}.
$$

$0$ とおけば

$$
\sum_i\frac{y_i}{\sigma_i^2}
=\theta\sum_i\frac1{\sigma_i^2}.
$$

したがって

$$
\boxed{
\widehat\theta_{\mathrm{ML}}
=\frac{\sum_iY_i/\sigma_i^2}{\sum_i1/\sigma_i^2}
=\widehat\theta_B
}.
$$

#### 5. Fisher情報量

2階微分は

$$
\frac{d^2\ell}{d\theta^2}
=-\sum_{i=1}^k\frac1{\sigma_i^2}.
$$

したがって

$$
\boxed{
I(\theta)
=\sum_{i=1}^k\frac1{\sigma_i^2}
}.
$$

Cramér--Rao下限は

$$
I(\theta)^{-1}
=\left(\sum_i\sigma_i^{-2}\right)^{-1}.
$$

これは $\widehat\theta_B$ の分散と一致する。

$$
\boxed{
\widehat\theta_B
\text{ は不偏かつ効率的}
}.
$$

#### 6. 数値例

精度は

$$
1,
\quad
\frac14,
\quad
\frac19.
$$

総和は

$$
1+\frac14+\frac19
=\frac{49}{36}.
$$

したがって重みは

$$
\boxed{
(a_1,a_2,a_3)
=\left(
\frac{36}{49},
\frac9{49},
\frac4{49}
\right)
}.
$$

### 本番答案

不偏性より $\sum a_i=1$。独立性より

$$
V(T)=\sum a_i^2\sigma_i^2.
$$

Lagrange未定乗数法で最小化すると

$$
a_i\propto\sigma_i^{-2},
$$

したがって

$$
\widehat\theta_B
=\frac{\sum_iY_i/\sigma_i^2}{\sum_i1/\sigma_i^2},
\qquad
V(\widehat\theta_B)
=\left(\sum_i\sigma_i^{-2}\right)^{-1}.
$$

正規モデルではこれはMLEであり、Fisher情報量

$$
I(\theta)=\sum_i\sigma_i^{-2}
$$

の逆数を分散として持つため効率的である。

### 25分経過時の打ち切り判断

最低限、`不偏性 = 重みの和1` と `最適重み = 逆分散比例` を確実に書く。MLE・Cramér--Raoへの接続は後半の加点部分。

### 採点基準（20点目安）

- 不偏性条件: 3点
- 分散最小化: 6点
- BLUEの分散: 3点
- MLEとの一致: 4点
- Fisher情報量・効率性: 4点

### 持ち帰るパターン

- 独立な不等分散観測の平均推定では重みは逆分散比例。
- 正規モデルではBLUE、重み付き最小二乗、MLE、Cramér--Rao効率性が同じ式へ収束する。
- 「精度 = 分散の逆数」を加える、という見方が最重要。

---

## 予想2: 層化抽出のHorvitz--Thompson推定量とNeyman配分

- 安定ID: `PRED-INF-02-STRATIFIED-HT`
- 対応シラバス: `S1-03` 単純無作為抽出、Horvitz--Thompson推定量、有限母集団補正、層化抽出、標本設計
- Level: C
- 目安時間: 25分
- 計算量: 中
- 主な使用技術: 有限母集団、層化抽出、非復元抽出、Horvitz--Thompson、不偏性、Neyman配分

### 問題

有限母集団を $H$ 個の層に分ける。層 $h$ の母集団サイズを $N_h$、母集団値を

$$
y_{h1},\ldots,y_{hN_h}
$$

とする。各層から独立に単純無作為非復元抽出で $n_h$ 個を抽出する。

層 $h$ の母平均・有限母集団分散を

$$
\overline Y_h
=\frac1{N_h}\sum_{j=1}^{N_h}y_{hj},
$$

$$
S_h^2
=\frac1{N_h-1}
\sum_{j=1}^{N_h}(y_{hj}-\overline Y_h)^2
$$

とする。標本平均を $\overline y_h$ とする。

1. 母総計

$$
T=\sum_{h=1}^H\sum_{j=1}^{N_h}y_{hj}
$$

の推定量

$$
\widehat T
=\sum_{h=1}^HN_h\overline y_h
$$

が不偏であることを示せ。
2. 各個体の包含確率を用いて、$\widehat T$ がHorvitz--Thompson推定量であることを示せ。
3. $\widehat T$ の分散を求めよ。
4. 総標本数

$$
\sum_{h=1}^Hn_h=n
$$

を固定し、有限母集団補正の $-N_hS_h^2$ に相当する定数項を除いて分散を最小化する $n_h$ を求めよ。
5. $H=2$、$N_1=400,N_2=100,S_1=5,S_2=15,n=100$ のときNeyman配分を整数で求めよ。

### 解答

#### 1. 不偏性

単純無作為抽出では

$$
E[\overline y_h]=\overline Y_h.
$$

したがって

$$
\begin{aligned}
E[\widehat T]
&=\sum_{h=1}^HN_hE[\overline y_h]\\
&=\sum_{h=1}^HN_h\overline Y_h\\
&=T.
\end{aligned}
$$

よって

$$
\boxed{E[\widehat T]=T}.
$$

#### 2. Horvitz--Thompson形式

層 $h$ の各個体の包含確率は

$$
\pi_{hj}=\frac{n_h}{N_h}.
$$

抽出指示変数を $I_{hj}$ とすればHorvitz--Thompson推定量は

$$
\widehat T_{HT}
=\sum_{h=1}^H\sum_{j=1}^{N_h}
\frac{I_{hj}y_{hj}}{\pi_{hj}}.
$$

ここで

$$
\frac1{\pi_{hj}}
=\frac{N_h}{n_h}.
$$

したがって

$$
\begin{aligned}
\widehat T_{HT}
&=\sum_h\frac{N_h}{n_h}
\sum_{j\in s_h}y_{hj}\\
&=\sum_hN_h\overline y_h\\
&=\widehat T.
\end{aligned}
$$

よって

$$
\boxed{
\widehat T
\text{ は層別Horvitz--Thompson推定量}
}.
$$

#### 3. 分散

層 $h$ の標本平均について

$$
\operatorname{Var}(\overline y_h)
=\left(1-\frac{n_h}{N_h}\right)
\frac{S_h^2}{n_h}.
$$

層間の抽出は独立なので

$$
\begin{aligned}
\operatorname{Var}(\widehat T)
&=\sum_{h=1}^HN_h^2
\operatorname{Var}(\overline y_h)\\
&=\sum_{h=1}^H
N_h^2
\left(1-\frac{n_h}{N_h}\right)
\frac{S_h^2}{n_h}.
\end{aligned}
$$

よって

$$
\boxed{
\operatorname{Var}(\widehat T)
=\sum_{h=1}^H
N_h^2(1-f_h)\frac{S_h^2}{n_h},
\qquad
f_h=\frac{n_h}{N_h}
}.
$$

#### 4. Neyman配分

分散を展開すると

$$
\operatorname{Var}(\widehat T)
=\sum_h
\left(
\frac{N_h^2S_h^2}{n_h}
-N_hS_h^2
\right).
$$

第2項は $n_h$ に依存しない。

したがって

$$
\sum_h\frac{N_h^2S_h^2}{n_h}
$$

を

$$
\sum_hn_h=n
$$

の下で最小化すればよい。

Lagrange関数

$$
\mathcal L
=\sum_h\frac{N_h^2S_h^2}{n_h}
+\lambda\left(\sum_hn_h-n\right)
$$

を用いる。

$n_h$ で微分すると

$$
-\frac{N_h^2S_h^2}{n_h^2}+\lambda=0.
$$

したがって

$$
n_h
=\frac{N_hS_h}{\sqrt\lambda}.
$$

よって

$$
\boxed{n_h\propto N_hS_h}.
$$

総和を $n$ に合わせると

$$
\boxed{
n_h
=n\frac{N_hS_h}{\sum_{g=1}^HN_gS_g}
}.
$$

これがNeyman配分である。

#### 5. 数値例

$$
N_1S_1=400\times5=2000,
$$

$$
N_2S_2=100\times15=1500.
$$

したがって

$$
n_1
=100\frac{2000}{3500}
\approx57.14,
$$

$$
n_2
=100\frac{1500}{3500}
\approx42.86.
$$

整数に丸めて

$$
\boxed{n_1=57,\qquad n_2=43}.
$$

### 本番答案

層 $h$ では $E[\overline y_h]=\overline Y_h$ だから

$$
\widehat T=\sum_hN_h\overline y_h
$$

は不偏。包含確率 $\pi_{hj}=n_h/N_h$ を用いれば

$$
\widehat T
=\sum_{h,j}\frac{I_{hj}y_{hj}}{\pi_{hj}}
$$

なのでHorvitz--Thompson推定量である。

分散は

$$
V(\widehat T)
=\sum_hN_h^2(1-f_h)\frac{S_h^2}{n_h}.
$$

固定総標本数の下で可変部分

$$
\sum_h\frac{N_h^2S_h^2}{n_h}
$$

を最小化すると

$$
\boxed{n_h\propto N_hS_h}.
$$

### 25分経過時の打ち切り判断

Horvitz--Thompsonの形と有限母集団補正付き分散まで書ければ十分。Neyman配分は $n_h\propto N_hS_h$ の結論だけでも取る。

### 採点基準（20点目安）

- 不偏性: 3点
- HT形式: 4点
- 分散: 5点
- Neyman配分: 5点
- 数値例: 3点

### 持ち帰るパターン

- 有限母集団では確率変数なのは標本抽出機構であり、$y_{hj}$ は固定値。
- 非復元抽出では有限母集団補正 $1-f_h$ が付く。
- 層化抽出の最適配分は `層サイズ × 層内標準偏差` に比例する。

---

## 予想3: Beta--Binomial共役モデルでBayes推定・MAP・予測分布を一気に出す

- 安定ID: `PRED-INF-03-BETA-BINOMIAL`
- 対応シラバス: `I4-01` 事前分布、事後分布、共役事前分布、Bayes推定量、事後最頻値、予測分布、損失関数
- Level: C
- 目安時間: 25分
- 計算量: 中
- 主な使用技術: Bayesの定理、Beta分布、共役性、二乗誤差損失、MAP、事後予測

### 問題

成功確率 $p$ に対して事前分布

$$
p\sim\operatorname{Beta}(a,b),
\qquad a,b>0
$$

を仮定する。その密度は

$$
\pi(p)
=\frac1{B(a,b)}p^{a-1}(1-p)^{b-1},
\qquad 0<p<1
$$

である。

条件付きで

$$
X\mid p\sim\operatorname{Bin}(n,p)
$$

とする。観測値を $X=x$ とする。

1. $p$ の事後分布を求めよ。
2. 二乗誤差損失

$$
L(p,d)=(d-p)^2
$$

の下でBayes推定量を求めよ。
3. 事後分布のパラメータがともに1より大きいとき、MAP推定量を求めよ。
4. 次の1回のBernoulli試行 $Y$ の事後予測成功確率

$$
P(Y=1\mid X=x)
$$

を求めよ。
5. 将来 $m$ 回の試行における成功回数 $Z$ の事後予測分布を求めよ。
6. $a=b=2,n=10,x=8$ のとき、Bayes推定量とMAPを数値で求め、MLE $x/n$ と比較せよ。

### 解答

#### 1. 事後分布

尤度は

$$
L(p\mid x)
\propto
p^x(1-p)^{n-x}.
$$

事前密度を掛けると

$$
\begin{aligned}
\pi(p\mid x)
&\propto
p^x(1-p)^{n-x}
\cdot
p^{a-1}(1-p)^{b-1}\\
&=p^{a+x-1}(1-p)^{b+n-x-1}.
\end{aligned}
$$

したがって

$$
\boxed{
p\mid X=x
\sim
\operatorname{Beta}(a+x,b+n-x)
}.
$$

Beta事前分布がBinomial尤度に対して共役であることが確認できる。

#### 2. 二乗誤差損失でのBayes推定量

二乗誤差損失のBayes推定量は事後平均である。

Beta$(\alpha,\beta)$ の平均は

$$
\frac\alpha{\alpha+\beta}.
$$

したがって

$$
\boxed{
\widehat p_B
=E[p\mid X=x]
=\frac{a+x}{a+b+n}
}.
$$

これは

$$
\frac{a+b}{a+b+n}\frac{a}{a+b}
+
\frac{n}{a+b+n}\frac xn
$$

とも書ける。

すなわち事前平均 $a/(a+b)$ とMLE $x/n$ の加重平均である。

#### 3. MAP

Beta$(\alpha,\beta)$ で $\alpha>1,\beta>1$ のとき最頻値は

$$
\frac{\alpha-1}{\alpha+\beta-2}.
$$

よって

$$
\boxed{
\widehat p_{MAP}
=\frac{a+x-1}{a+b+n-2}
}.
$$

#### 4. 次の1回の事後予測

条件付きでは

$$
P(Y=1\mid p)=p.
$$

したがって

$$
\begin{aligned}
P(Y=1\mid X=x)
&=E[P(Y=1\mid p,X=x)\mid X=x]\\
&=E[p\mid X=x]\\
&=\frac{a+x}{a+b+n}.
\end{aligned}
$$

よって

$$
\boxed{
P(Y=1\mid X=x)
=\widehat p_B
}.
$$

#### 5. 将来 $m$ 回の予測分布

条件付きで

$$
Z\mid p,X=x
\sim\operatorname{Bin}(m,p).
$$

したがって

$$
\begin{aligned}
P(Z=z\mid X=x)
&={m\choose z}
\int_0^1
p^z(1-p)^{m-z}
\frac{p^{a+x-1}(1-p)^{b+n-x-1}}
{B(a+x,b+n-x)}dp\\
&={m\choose z}
\frac{B(a+x+z,b+n-x+m-z)}{B(a+x,b+n-x)}.
\end{aligned}
$$

よって

$$
\boxed{
P(Z=z\mid X=x)
={m\choose z}
\frac{B(a+x+z,b+n-x+m-z)}{B(a+x,b+n-x)}
}
$$

であり、Beta--Binomial分布になる。

#### 6. 数値例

$a=b=2,n=10,x=8$ なので事後分布は

$$
\operatorname{Beta}(10,4).
$$

Bayes推定量は

$$
\widehat p_B
=\frac{10}{14}
=\frac57
\approx0.714.
$$

MAPは

$$
\widehat p_{MAP}
=\frac{9}{12}
=0.75.
$$

MLEは

$$
\widehat p_{ML}=\frac8{10}=0.8.
$$

したがって

$$
\boxed{
0.714\approx\widehat p_B
<0.75=\widehat p_{MAP}
<0.8=\widehat p_{ML}
}.
$$

対称なBeta$(2,2)$ 事前分布は $1/2$ 付近へ推定値を縮めている。

### 本番答案

事前密度と尤度を掛けると

$$
\pi(p\mid x)
\propto
p^{a+x-1}(1-p)^{b+n-x-1},
$$

したがって

$$
p\mid x\sim\operatorname{Beta}(a+x,b+n-x).
$$

二乗誤差損失でのBayes推定量は事後平均

$$
\boxed{\widehat p_B=(a+x)/(a+b+n)}.
$$

MAPは

$$
\boxed{\widehat p_{MAP}=(a+x-1)/(a+b+n-2)}.
$$

次の1回の予測成功確率は事後平均に等しい。将来 $m$ 回の成功数はBeta--Binomial分布となる。

### 25分経過時の打ち切り判断

事後分布と事後平均までで中核点は取れる。予測分布の積分が重ければBeta関数比の形まで書けばよい。

### 採点基準（20点目安）

- 事後分布: 5点
- Bayes推定量: 4点
- MAP: 3点
- 1回先予測: 3点
- Beta--Binomial予測: 3点
- 数値比較・縮小解釈: 2点

### 持ち帰るパターン

- Binomial尤度 × Beta事前 = Beta事後。
- 二乗誤差損失のBayes推定量は事後平均。
- Bayes推定量は「事前平均」と「標本比率」の縮小平均として読める。
- 事後予測では母数 $p$ を積分して消す。

---

## 予想4: 右打切り指数分布から観測データ尤度とMLEを作る

- 安定ID: `PRED-INF-04-CENSORING`
- 対応シラバス: `I4-02` 観測データ尤度、打切り、切断、不完全データ
- Level: C
- 目安時間: 25分
- 計算量: 中
- 主な使用技術: 生存関数、右打切り、観測データ尤度、MLE、観測情報量、Wald近似

### 問題

寿命 $T_1,\ldots,T_n$ は独立に率母数 $\lambda>0$ の指数分布

$$
f(t\mid\lambda)=\lambda e^{-\lambda t},
\qquad t\ge0
$$

に従う。

各個体 $i$ には既知の右打切り時刻 $c_i>0$ があり、実際に観測されるのは

$$
Y_i=\min(T_i,c_i),
$$

$$
\delta_i=\mathbf1(T_i\le c_i)
$$

である。

1. 指数分布の生存関数 $S(t)=P(T_i>t)$ を求めよ。
2. $(Y_i,\delta_i)$ の尤度への寄与が

$$
\{f(Y_i\mid\lambda)\}^{\delta_i}
\{S(Y_i\mid\lambda)\}^{1-\delta_i}
$$

と書けることを説明せよ。
3. 

$$
D=\sum_{i=1}^n\delta_i,
\qquad
R=\sum_{i=1}^nY_i
$$

とおく。観測データ尤度を $D,R$ で表せ。
4. $D>0$ として $\lambda$ のMLEを求めよ。
5. 観測情報量を用いて $\widehat\lambda$ の近似標準誤差を求めよ。
6. $D=0$ のとき尤度がどうなるかを説明せよ。

### 解答

#### 1. 生存関数

指数分布の累積分布関数は

$$
F(t)=1-e^{-\lambda t}.
$$

したがって

$$
\boxed{
S(t)=1-F(t)=e^{-\lambda t}
}.
$$

#### 2. 打切り観測の尤度寄与

$\delta_i=1$ なら寿命そのものが $Y_i=T_i$ と観測されているので、尤度寄与は密度

$$
f(Y_i\mid\lambda)
$$

である。

一方 $\delta_i=0$ なら $T_i>c_i=Y_i$ という事実だけが分かるので、尤度寄与は

$$
P(T_i>Y_i)=S(Y_i\mid\lambda)
$$

である。

したがって両者をまとめて

$$
\boxed{
L_i(\lambda)
=f(Y_i\mid\lambda)^{\delta_i}
S(Y_i\mid\lambda)^{1-\delta_i}
}.
$$

#### 3. 観測データ尤度

指数分布では

$$
f(y\mid\lambda)=\lambda e^{-\lambda y},
\qquad
S(y\mid\lambda)=e^{-\lambda y}.
$$

したがって

$$
\begin{aligned}
L_i(\lambda)
&=(\lambda e^{-\lambda Y_i})^{\delta_i}
(e^{-\lambda Y_i})^{1-\delta_i}\\
&=\lambda^{\delta_i}e^{-\lambda Y_i}.
\end{aligned}
$$

全個体について掛けると

$$
\begin{aligned}
L(\lambda)
&=\prod_{i=1}^n
\lambda^{\delta_i}e^{-\lambda Y_i}\\
&=\lambda^{\sum_i\delta_i}
\exp\left(-\lambda\sum_iY_i\right)\\
&=\lambda^D e^{-\lambda R}.
\end{aligned}
$$

よって

$$
\boxed{L(\lambda)=\lambda^D e^{-\lambda R}}.
$$

観測データは $D$ と総観測時間 $R$ に集約される。

#### 4. MLE

対数尤度は

$$
\ell(\lambda)
=D\log\lambda-\lambda R.
$$

微分すると

$$
\ell'(\lambda)
=\frac D\lambda-R.
$$

$D>0$ では

$$
\ell'(\lambda)=0
$$

より

$$
\boxed{
\widehat\lambda_{ML}
=\frac DR
}.
$$

2階微分は

$$
\ell''(\lambda)
=-\frac D{\lambda^2}<0
$$

なので極大である。

この式は

$$
\boxed{
\text{故障数}/\text{総観測時間}
}
$$

という自然な故障率の形になっている。

#### 5. 観測情報量と標準誤差

観測情報量は

$$
J(\lambda)
=-\ell''(\lambda)
=\frac D{\lambda^2}.
$$

MLEを代入すると

$$
J(\widehat\lambda)
=\frac D{(D/R)^2}
=\frac{R^2}{D}.
$$

したがって近似分散は

$$
J(\widehat\lambda)^{-1}
=\frac D{R^2}
=\frac{\widehat\lambda^2}{D}.
$$

よって標準誤差は

$$
\boxed{
\operatorname{se}(\widehat\lambda)
\approx
\frac{\widehat\lambda}{\sqrt D}
}.
$$

大標本なら例えば近似95%信頼区間を

$$
\widehat\lambda
\pm1.96\frac{\widehat\lambda}{\sqrt D}
$$

と作れる。

#### 6. $D=0$ の場合

すべて打切りなら

$$
L(\lambda)=e^{-\lambda R}.
$$

これは $\lambda>0$ で単調減少する。

したがって母数空間を $\lambda\ge0$ と拡張すれば最大は境界

$$
\widehat\lambda=0
$$

で達成される。

母数空間を $\lambda>0$ と厳密にすると、内部に最大点はなく

$$
\lambda\downarrow0
$$

で上限へ近づく。

$$
\boxed{
D=0\text{ では正の内部MLEは存在しない}
}.
$$

### 本番答案

指数分布の生存関数は $S(t)=e^{-\lambda t}$。したがって打切り指示を使うと

$$
L(\lambda)
=\prod_i
f(Y_i)^{\delta_i}S(Y_i)^{1-\delta_i}
=\lambda^D e^{-\lambda R}.
$$

よって

$$
\ell(\lambda)=D\log\lambda-\lambda R
$$

から

$$
\boxed{\widehat\lambda=D/R}.
$$

観測情報量は $D/\lambda^2$ なので

$$
\boxed{
\operatorname{se}(\widehat\lambda)
\approx\widehat\lambda/\sqrt D
}.
$$

### 25分経過時の打ち切り判断

密度と生存関数を使い分けて

$$
L=\lambda^D e^{-\lambda R}
$$

まで出せれば勝ち。標準誤差や $D=0$ は後回しでよい。

### 採点基準（20点目安）

- 生存関数: 2点
- 打切り尤度の構成: 5点
- $D,R$ への集約: 4点
- MLE: 4点
- 観測情報量・標準誤差: 3点
- $D=0$ の境界解釈: 2点

### 持ち帰るパターン

- 未打切りは密度 $f$、右打切りは生存関数 $S$ を尤度へ入れる。
- 指数分布ではMLEが `イベント数 / exposure` になる。
- 打切りは「寿命が不明」ではなく「少なくともここまでは生存した」という情報を持つ。

---

## 予想5: 2成分Poisson混合分布でEM更新式を導く

- 安定ID: `PRED-INF-05-EM-MIXTURE`
- 対応シラバス: `I4-02` EM法、観測データ尤度、不完全データ、`P3-04` 混合分布・潜在変数
- Level: C
- 目安時間: 25分
- 計算量: 中
- 主な使用技術: 潜在変数、混合分布、Bayesの定理、完全データ尤度、E-step、M-step

### 問題

$X_1,\ldots,X_n$ は独立に2成分Poisson混合分布

$$
P(X_i=x)
=p\frac{e^{-\lambda_1}\lambda_1^x}{x!}
+(1-p)\frac{e^{-\lambda_2}\lambda_2^x}{x!},
$$

$$
0<p<1,
\qquad
\lambda_1,\lambda_2>0
$$

に従うとする。ここでは $\lambda_1,\lambda_2$ は既知、混合比 $p$ のみ未知とする。

潜在変数

$$
Z_i=
\begin{cases}
1,&X_i\text{ が成分1から生成},\\
0,&X_i\text{ が成分2から生成}
\end{cases}
$$

を導入する。

1. 完全データ $(X_i,Z_i)$ の対数尤度のうち $p$ に依存する部分を求めよ。
2. 現在の推定値を $p^{(t)}$ とする。E-stepで

$$
\tau_i^{(t)}
=E[Z_i\mid X_i=x_i,p^{(t)}]
$$

を求めよ。
3. Q関数

$$
Q(p\mid p^{(t)})
=E[\ell_c(p)\mid X,p^{(t)}]
$$

を求めよ。
4. M-stepで $Q$ を最大化し、$p^{(t+1)}$ の更新式を導け。
5. $\lambda_1=1,\lambda_2=4$、ある観測 $x_i=0$ に対し $p^{(t)}=1/2$ のとき $\tau_i^{(t)}$ を求め、この観測がどちらの成分らしいか解釈せよ。
6. EM法で潜在変数を導入する利点を説明せよ。

### 解答

Poisson確率質量関数を

$$
f_j(x)
=\frac{e^{-\lambda_j}\lambda_j^x}{x!},
\qquad j=1,2
$$

と書く。

#### 1. 完全データ対数尤度

潜在変数 $Z_i$ が観測できたなら、$p$ に関する確率は

$$
p^{Z_i}(1-p)^{1-Z_i}.
$$

したがって完全データ尤度は

$$
L_c(p)
\propto
\prod_{i=1}^n
p^{Z_i}(1-p)^{1-Z_i}.
$$

対数を取ると

$$
\boxed{
\ell_c(p)
=\sum_{i=1}^n
\{Z_i\log p+(1-Z_i)\log(1-p)\}
+\text{const}
}.
$$

もし $Z_i$ が見えていれば、単なるBernoulli標本の混合比推定になる。

#### 2. E-step

Bayesの定理より

$$
\tau_i^{(t)}
=P(Z_i=1\mid X_i=x_i,p^{(t)}).
$$

分子は

$$
p^{(t)}f_1(x_i),
$$

分母は混合分布の確率

$$
p^{(t)}f_1(x_i)
+(1-p^{(t)})f_2(x_i).
$$

したがって

$$
\boxed{
\tau_i^{(t)}
=\frac{p^{(t)}f_1(x_i)}
{p^{(t)}f_1(x_i)+(1-p^{(t)})f_2(x_i)}
}.
$$

これは観測 $x_i$ が成分1へ所属する事後確率である。

#### 3. Q関数

完全データ対数尤度の $Z_i$ を、その条件付き期待値 $\tau_i^{(t)}$ に置き換える。

したがって

$$
\boxed{
Q(p\mid p^{(t)})
=\sum_{i=1}^n
\left\{
\tau_i^{(t)}\log p
+(1-\tau_i^{(t)})\log(1-p)
\right\}
+\text{const}
}.
$$

#### 4. M-step

$p$ で微分すると

$$
\frac{\partial Q}{\partial p}
=\sum_{i=1}^n
\left\{
\frac{\tau_i^{(t)}}p
-\frac{1-\tau_i^{(t)}}{1-p}
\right\}.
$$

$0$ とおくと

$$
(1-p)\sum_i\tau_i^{(t)}
-p\sum_i(1-\tau_i^{(t)})=0.
$$

整理すると

$$
\sum_i\tau_i^{(t)}-np=0.
$$

したがって

$$
\boxed{
p^{(t+1)}
=\frac1n\sum_{i=1}^n\tau_i^{(t)}
}.
$$

つまり「成分1に属する確率の平均」で混合比を更新する。

#### 5. 数値例

$x_i=0$ なので

$$
f_1(0)=e^{-1},
\qquad
f_2(0)=e^{-4}.
$$

$p^{(t)}=1/2$ より

$$
\begin{aligned}
\tau_i^{(t)}
&=\frac{(1/2)e^{-1}}
{(1/2)e^{-1}+(1/2)e^{-4}}\\
&=\frac{e^{-1}}{e^{-1}+e^{-4}}\\
&=\frac1{1+e^{-3}}.
\end{aligned}
$$

数値的には

$$
\boxed{\tau_i^{(t)}\approx0.953}.
$$

$0$ という小さいカウントは平均1の成分から生じた可能性が非常に高い。

#### 6. EM法の利点

観測データ尤度は

$$
L(p)
=\prod_{i=1}^n
\{pf_1(x_i)+(1-p)f_2(x_i)\}
$$

であり、対数を取ると

$$
\ell(p)
=\sum_i\log\{pf_1(x_i)+(1-p)f_2(x_i)\}.
$$

混合の和が対数の内側に入るため、直接最大化は扱いにくくなりやすい。

潜在所属 $Z_i$ を導入すると、完全データ対数尤度では

$$
Z_i\log p+(1-Z_i)\log(1-p)
$$

という単純な形になる。

EM法は

1. E-stepで見えない $Z_i$ を所属確率 $\tau_i$ に置き換え、
2. M-stepで見えている場合と同じ形の最尤化を行う

という反復法である。

$$
\boxed{
\text{潜在変数を導入して難しい観測尤度最大化を単純な完全データ問題へ分解する}
}.
$$

### 本番答案

完全データでは

$$
\ell_c(p)
=\sum_i\{Z_i\log p+(1-Z_i)\log(1-p)\}+C.
$$

E-stepでは

$$
\tau_i^{(t)}
=P(Z_i=1\mid x_i,p^{(t)})
=\frac{p^{(t)}f_1(x_i)}
{p^{(t)}f_1(x_i)+(1-p^{(t)})f_2(x_i)}.
$$

したがって

$$
Q(p)
=\sum_i\{\tau_i^{(t)}\log p+(1-\tau_i^{(t)})\log(1-p)\}+C.
$$

これを最大化すると

$$
\boxed{
p^{(t+1)}=\frac1n\sum_i\tau_i^{(t)}}.
$$

### 25分経過時の打ち切り判断

E-stepの所属確率とM-stepの平均更新式が本体。数値例やEMの言語説明は後回しでよい。

### 採点基準（20点目安）

- 完全データ尤度: 4点
- E-step: 6点
- Q関数: 3点
- M-step: 5点
- 数値・解釈: 2点

### 持ち帰るパターン

- 混合分布では「どの成分から来たか」を潜在変数にする。
- E-stepは潜在変数の条件付き期待値、M-stepはその期待完全対数尤度の最大化。
- 混合比更新は所属確率の平均になる。

---

## 学習優先順位

この5題を既存17題へ追加する場合、推奨順は

$$
\boxed{
\text{BLUE}
\to
\text{Bayes}
\to
\text{右打切り}
\to
\text{層化HT}
\to
\text{EM}
}
$$

とする。

理由は、BLUEが古典推定論の直接的な穴、Bayesが独立した推定体系の穴、右打切りが尤度構築力の穴を埋めるためである。有限母集団とEMは重要だが、前3者よりやや専門的なため後に回す。

## 今回は追加しなかったが次点の候補

- 有効スコア関数と nuisance parameter
- bootstrap標準誤差・percentile区間
- KL情報量とAIC
- 比推定量と回帰推定量
- 切断分布と打切り分布の尤度の違い

このうちKL情報量・AICは `L2-02 モデル評価・選択` の章で、回帰・GLMと合わせて扱う方が自然であるため、本ファイルでは見送った。
