# 検定分野 シラバス穴埋め予想問題 1〜5

このファイルは、リポジトリの `curriculum.yaml` と統計検定1級・準1級の出題範囲を照合し、既存の検定分野過去問型再構成演習だけでは相対的に薄い論点を補うための独自予想問題集である。

- 公式過去問の復元ではない。
- 既存の `testing_past_exam_reconstructed_01_05.md`、`testing_past_exam_reconstructed_06_08.md` と重複しにくい論点を優先した。
- 数式・設定・設問は独自作成である。
- 数式は KaTeX 互換の `$...$`、`$$...$$`、`$$\begin{aligned}...\end{aligned}$$` を用いる。
- Level C の問題は20〜30分で3題選択式の本番演習に使える密度を意識した。

## 選定根拠

リポジトリの検定章は次を主範囲としている。

- `I3-01`: P値、有意水準、棄却域、第一種・第二種過誤、検出力、Neyman--Pearson
- `I3-02`: 尤度比検定、Wald型検定、Score型検定
- `I3-03`: 正規母集団、適合度、ノンパラメトリック検定

既存8題では、Neyman--Pearson、UMP/UMPU、LRT、適合度、F検定、順序統計量はかなり厚い。一方、次が薄い。

1. LRT・Wald・Scoreの三者比較
2. 正確検定と nuisance parameter の除去
3. 正規2標本問題と母分散の検定
4. 母相関係数に関する検定
5. 順位検定・並べ替え検定

したがって、以下の5題を追加する。

| 優先度 | 安定ID | 主題 | シラバス対応 | 既存演習との差分 |
|---:|---|---|---|---|
| 1 | `PRED-TEST-01-LWS-BERNOULLI` | BernoulliでLRT・Wald・Score | I3-02 | 三検定を同一モデルで直接比較 |
| 2 | `PRED-TEST-02-POISSON-EXACT` | 2標本Poissonの正確条件付き検定 | I3-01, I3-03 | nuisance parameter を条件付けで消す |
| 3 | `PRED-TEST-03-NORMAL-TWOSAMPLE` | 正規2標本のF検定とpooled t検定 | S1-01, I3-03 | 母分散・2標本問題の直球対策 |
| 4 | `PRED-TEST-04-CORRELATION` | 母相関係数の検定 | I3-03 | 相関係数の正確検定とFisher変換 |
| 5 | `PRED-TEST-05-WILCOXON-PERM` | Wilcoxon順位和と並べ替え検定 | I3-03 | ノンパラメトリックの代表論点 |

---

# 予想1: BernoulliモデルでLRT・Wald・Score検定の漸近同値を示す

- 安定ID: `PRED-TEST-01-LWS-BERNOULLI`
- Level: C
- 目安時間: 25分
- 計算量: 中
- 主題: 尤度比検定、Wald検定、Score検定
- 使用技術: Bernoulli尤度、MLE、Fisher情報量、Taylor展開、確率的オーダー、Slutsky

## 問題

$X_1,\ldots,X_n$ は独立にBernoulli分布

$$
P(X_i=1)=p,
\qquad
P(X_i=0)=1-p,
\qquad
0<p<1
$$

に従うとする。$\widehat p=\overline X$ とする。固定した $0<p_0<1$ に対して

$$
H_0:p=p_0,
\qquad
H_1:p\ne p_0
$$

を考える。

1. $p$ の最尤推定量を求めよ。
2. 尤度比統計量

$$
G^2=-2\log\Lambda
$$

を $\widehat p$ と $p_0$ を用いて表せ。
3. Wald統計量を

$$
W
=
\frac{n(\widehat p-p_0)^2}
{\widehat p(1-\widehat p)}
$$

とする。これが $H_0$ の下で漸近的に $\chi_1^2$ に従うことを示せ。
4. Score統計量を導出し

$$
S
=
\frac{n(\widehat p-p_0)^2}
{p_0(1-p_0)}
$$

となることを示せ。
5. $H_0$ の下で

$$
G^2=S+o_p(1),
\qquad
W=S+o_p(1)
$$

を示し、三検定が漸近的に同値であることを説明せよ。

## 解答

### 1. 最尤推定量

$T=\sum_{i=1}^nX_i$ とすると尤度は

$$
L(p)
=p^T(1-p)^{n-T}.
$$

対数尤度は

$$
\ell(p)
=T\log p+(n-T)\log(1-p).
$$

微分すると

$$
\ell'(p)
=\frac{T}{p}-\frac{n-T}{1-p}.
$$

$\ell'(p)=0$ より

$$
T(1-p)=(n-T)p,
$$

したがって

$$
T=np.
$$

ゆえに

$$
\boxed{\widehat p=\frac{T}{n}=\overline X}.
$$

### 2. 尤度比統計量

帰無仮説の下では $p=p_0$、制約なしMLEは $p=\widehat p$ なので

$$
\Lambda
=
\frac{p_0^T(1-p_0)^{n-T}}
{\widehat p^T(1-\widehat p)^{n-T}}.
$$

$T=n\widehat p$ を用いると

$$
\boxed{
G^2
=2n\left[
\widehat p\log\frac{\widehat p}{p_0}
+(1-\widehat p)
\log\frac{1-\widehat p}{1-p_0}
\right]
}.
$$

### 3. Wald統計量

$H_0$ の下では中心極限定理より

$$
\sqrt n(\widehat p-p_0)
\xrightarrow{d}
N\left(0,p_0(1-p_0)\right).
$$

また一致性より

$$
\widehat p(1-\widehat p)
\xrightarrow{p}
p_0(1-p_0).
$$

Slutskyの定理から

$$
\frac{\sqrt n(\widehat p-p_0)}
{\sqrt{\widehat p(1-\widehat p)}}
\xrightarrow{d}N(0,1).
$$

両辺を二乗すれば

$$
\boxed{W\xrightarrow{d}\chi_1^2}.
$$

### 4. Score統計量

スコア関数は

$$
U(p)
=\ell'(p)
=\frac{T-np}{p(1-p)}.
$$

1標本当たりのFisher情報量は

$$
I_1(p)=\frac1{p(1-p)}
$$

なので、標本全体では

$$
I_n(p)=\frac{n}{p(1-p)}.
$$

Score統計量は帰無値で評価して

$$
\frac{U(p_0)^2}{I_n(p_0)}.
$$

$T=n\widehat p$ より

$$
U(p_0)
=
\frac{n(\widehat p-p_0)}{p_0(1-p_0)}.
$$

したがって

$$
\boxed{
S
=
\frac{n(\widehat p-p_0)^2}{p_0(1-p_0)}
}.
$$

### 5. 三検定の漸近同値

$\delta_n=\widehat p-p_0$ とおく。$H_0$ の下で

$$
\delta_n=O_p(n^{-1/2}).
$$

関数

$$
h(p)
=p\log\frac{p}{p_0}
+(1-p)\log\frac{1-p}{1-p_0}
$$

を考える。

$$
h(p_0)=0,
\qquad
h'(p_0)=0,
\qquad
h''(p_0)=\frac1{p_0(1-p_0)}.
$$

Taylor展開より

$$
h(\widehat p)
=
\frac{\delta_n^2}{2p_0(1-p_0)}
+O_p(|\delta_n|^3).
$$

したがって

$$
\begin{aligned}
G^2
&=2nh(\widehat p)\\
&=
\frac{n\delta_n^2}{p_0(1-p_0)}
+nO_p(|\delta_n|^3).
\end{aligned}
$$

$\delta_n=O_p(n^{-1/2})$ だから

$$
n|\delta_n|^3
=O_p(n^{-1/2})
=o_p(1).
$$

よって

$$
\boxed{G^2=S+o_p(1)}.
$$

一方

$$
\widehat p(1-\widehat p)
=
p_0(1-p_0)+O_p(n^{-1/2}).
$$

したがって逆数も

$$
\frac1{\widehat p(1-\widehat p)}
=
\frac1{p_0(1-p_0)}+O_p(n^{-1/2}).
$$

さらに

$$
n\delta_n^2=O_p(1)
$$

なので

$$
\boxed{W=S+o_p(1)}.
$$

以上より

$$
\boxed{
G^2=W+o_p(1)=S+o_p(1)
}
$$

であり、三検定はいずれも帰無仮説の下で $\chi_1^2$ に収束し、局所的には同じ二次近似を見ている。

## 本番答案

$$
\widehat p=\overline X,
$$

$$
G^2
=2n\left[
\widehat p\log\frac{\widehat p}{p_0}
+(1-\widehat p)\log\frac{1-\widehat p}{1-p_0}
\right].
$$

また

$$
W=
\frac{n(\widehat p-p_0)^2}{\widehat p(1-\widehat p)},
\qquad
S=
\frac{n(\widehat p-p_0)^2}{p_0(1-p_0)}.
$$

$\widehat p-p_0=O_p(n^{-1/2})$ とTaylor展開より

$$
G^2=S+o_p(1),
\qquad
W=S+o_p(1).
$$

よって三者は漸近的に $\chi_1^2$ に従い、漸近同値。

## 採点基準 20点

- MLE 3点
- LRTの式 4点
- Waldの極限分布 3点
- Score導出 4点
- Taylor展開と $o_p(1)$ 評価 6点

## 25分経過時の打ち切り判断

(5)の厳密な剰余評価に詰まった場合は、

$$
\widehat p-p_0=O_p(n^{-1/2})
$$

と

$$
h''(p_0)=\{p_0(1-p_0)\}^{-1}
$$

まで書き、三者が同じ二次形式になることを明示して部分点を確保する。

---

# 予想2: 2標本Poisson率の等値検定を条件付き二項検定へ帰着する

- 安定ID: `PRED-TEST-02-POISSON-EXACT`
- Level: C
- 目安時間: 20分
- 計算量: 中
- 主題: 正確検定、条件付き分布、nuisance parameter の除去
- 使用技術: Poisson加法性、条件付き二項分布、正確P値、検出力の単調性

## 問題

$X_1,\ldots,X_n$ は独立に

$$
X_i\sim\operatorname{Poisson}(\lambda),
\qquad
P(X_i=x)=e^{-\lambda}\frac{\lambda^x}{x!},
\qquad x=0,1,2,\ldots
$$

に従い、$Y_1,\ldots,Y_m$ は独立に

$$
Y_j\sim\operatorname{Poisson}(\mu)
$$

に従う。また2標本は互いに独立とする。

$$
H_0:\lambda=\mu,
\qquad
H_1:\lambda>\mu
$$

を考える。

$$
S=\sum_{i=1}^nX_i,
\qquad
T=\sum_{j=1}^mY_j,
\qquad
K=S+T
$$

とする。

1. $S$ と $T$ の分布を求めよ。
2. 一般の $\lambda,\mu$ に対して、$K=k$ の条件下での $S$ の分布を求めよ。
3. $H_0$ の下で nuisance parameter が消えることを示せ。
4. 観測値が $(S,T)=(s,t)$ のときの片側正確P値を書け。
5. $n=m$ のとき、条件付き検定が「合計イベント数を固定した上で、どちらの群により多く割り当てられたか」を見る検定であることを説明せよ。

## 解答

### 1. $S,T$ の分布

独立なPoisson変数の和もPoisson分布に従うので

$$
\boxed{S\sim\operatorname{Poisson}(n\lambda)},
$$

$$
\boxed{T\sim\operatorname{Poisson}(m\mu)}.
$$

### 2. 条件付き分布

$S=s,T=k-s$ の同時確率は

$$
P(S=s,T=k-s)
=
e^{-n\lambda}\frac{(n\lambda)^s}{s!}

e^{-m\mu}\frac{(m\mu)^{k-s}}{(k-s)!}.
$$

一方

$$
K=S+T
\sim
\operatorname{Poisson}(n\lambda+m\mu).
$$

したがって

$$
\begin{aligned}
P(S=s\mid K=k)
&=
\frac{P(S=s,T=k-s)}{P(K=k)}\\
&=
\binom{k}{s}
\left(
\frac{n\lambda}{n\lambda+m\mu}
\right)^s
\left(
\frac{m\mu}{n\lambda+m\mu}
\right)^{k-s}.
\end{aligned}
$$

よって

$$
\boxed{
S\mid K=k
\sim
\operatorname{Binomial}
\left(
 k,
\frac{n\lambda}{n\lambda+m\mu}
\right)
}.
$$

### 3. 帰無仮説で nuisance parameter が消える

$H_0$ では $\lambda=\mu=\theta$ とおける。

すると条件付き成功確率は

$$
\frac{n\theta}{n\theta+m\theta}
=
\frac{n}{n+m}.
$$

したがって

$$
\boxed{
S\mid K=k,H_0
\sim
\operatorname{Binomial}
\left(k,\frac{n}{n+m}\right)
}.
$$

未知の共通Poisson率 $\theta$ が完全に消えた。

この「十分な量で条件付けて nuisance parameter を除く」構造が正確検定の核心である。

### 4. 正確P値

$H_1:\lambda>\mu$ では

$$
\frac{n\lambda}{n\lambda+m\mu}
>
\frac{n}{n+m}.
$$

したがって大きい $S$ が対立仮説寄りである。

観測された合計を $k=s+t$ とすると

$$
\boxed{
p
=
P_{H_0}(S\ge s\mid K=k)
=
\sum_{r=s}^{k}
\binom{k}{r}
\left(\frac{n}{n+m}\right)^r
\left(\frac{m}{n+m}\right)^{k-r}
}.
$$

これは有限標本で正確なP値であり、正規近似を必要としない。

### 5. $n=m$ の解釈

$n=m$ なら $H_0$ 下の条件付き分布は

$$
S\mid K=k
\sim\operatorname{Binomial}(k,1/2).
$$

つまり全イベント $k$ 個を固定したとき、帰無仮説では各イベントがX群側・Y群側へ等確率で割り当てられる。

したがって検定は

$$
\boxed{
\text{合計イベント数ではなく、イベントの群間配分の偏りを検定している}
}
$$

と解釈できる。

## 本番答案

$$
S\sim\operatorname{Pois}(n\lambda),
\qquad
T\sim\operatorname{Pois}(m\mu).
$$

加法性と条件付き分布より

$$
S\mid K=k
\sim
\operatorname{Bin}
\left(k,\frac{n\lambda}{n\lambda+m\mu}\right).
$$

$H_0:\lambda=\mu$ では

$$
S\mid K=k
\sim
\operatorname{Bin}
\left(k,\frac{n}{n+m}\right).
$$

よって片側P値は

$$
P_{H_0}(S\ge s\mid K=s+t).
$$

## 採点基準 20点

- Poisson加法性 3点
- 条件付き二項分布の導出 7点
- nuisance parameter の消去 4点
- 正確P値 4点
- 解釈 2点

## 25分経過時の打ち切り判断

条件付き分布の導出途中でも、

$$
S\mid K=k
\sim\operatorname{Bin}
\left(k,\frac{n\lambda}{n\lambda+m\mu}\right)
$$

を正しく書ければ、以降は機械的に進められる。ここを最優先する。

---

# 予想3: 正規2標本問題で分散比F検定とpooled t検定を導く

- 安定ID: `PRED-TEST-03-NORMAL-TWOSAMPLE`
- Level: C
- 目安時間: 30分
- 計算量: 中〜多
- 主題: 正規母集団、母分散、2標本平均差
- 使用技術: カイ二乗分布、F分布、独立性、pooled variance、t分布、非心t分布

## 問題

独立な2標本

$$
X_1,\ldots,X_n\sim N(\mu_X,\sigma_X^2),
$$

$$
Y_1,\ldots,Y_m\sim N(\mu_Y,\sigma_Y^2)
$$

を考える。

標本分散を

$$
S_X^2
=
\frac1{n-1}\sum_{i=1}^n(X_i-\overline X)^2,
$$

$$
S_Y^2
=
\frac1{m-1}\sum_{j=1}^m(Y_j-\overline Y)^2
$$

とする。

1. $H_0^{(v)}:\sigma_X^2=\sigma_Y^2$ の下で

$$
F=\frac{S_X^2}{S_Y^2}
$$

の分布を求めよ。
2. 以降、$\sigma_X^2=\sigma_Y^2=\sigma^2$ を仮定する。pooled variance

$$
S_p^2
=
\frac{(n-1)S_X^2+(m-1)S_Y^2}{n+m-2}
$$

について

$$
\frac{(n+m-2)S_p^2}{\sigma^2}
\sim\chi_{n+m-2}^2
$$

を示せ。
3. $H_0^{(m)}:\mu_X=\mu_Y$ の下で

$$
T
=
\frac{\overline X-\overline Y}
{S_p\sqrt{1/n+1/m}}
$$

が $t_{n+m-2}$ に従うことを示せ。
4. 有意水準 $\alpha$ の両側検定の棄却域と、$\mu_X-\mu_Y$ の $1-\alpha$ 信頼区間を求め、双対性を説明せよ。
5. $\mu_X-\mu_Y=\Delta$ の下で $T$ が非心t分布に従うとき、その非心度を求めよ。

## 解答

### 1. 分散比のF分布

正規標本の基本結果より

$$
\frac{(n-1)S_X^2}{\sigma_X^2}
\sim\chi_{n-1}^2,
$$

$$
\frac{(m-1)S_Y^2}{\sigma_Y^2}
\sim\chi_{m-1}^2.
$$

2標本は独立なので両者も独立である。

$H_0^{(v)}:\sigma_X^2=\sigma_Y^2=\sigma^2$ の下では

$$
F
=
\frac{S_X^2}{S_Y^2}
=
\frac{\{(n-1)S_X^2/\sigma^2\}/(n-1)}
{\{(m-1)S_Y^2/\sigma^2\}/(m-1)}.
$$

したがって

$$
\boxed{F\sim F_{n-1,m-1}}.
$$

### 2. pooled variance の分布

共通分散 $\sigma^2$ の下で

$$
\frac{(n-1)S_X^2}{\sigma^2}
\sim\chi_{n-1}^2,
$$

$$
\frac{(m-1)S_Y^2}{\sigma^2}
\sim\chi_{m-1}^2
$$

は独立。

独立なカイ二乗変数の和は自由度の和のカイ二乗分布に従うので

$$
\frac{(n-1)S_X^2+(m-1)S_Y^2}{\sigma^2}
\sim\chi_{n+m-2}^2.
$$

定義から

$$
(n+m-2)S_p^2
=(n-1)S_X^2+(m-1)S_Y^2.
$$

よって

$$
\boxed{
\frac{(n+m-2)S_p^2}{\sigma^2}
\sim\chi_{n+m-2}^2
}.
$$

### 3. pooled t統計量

共通分散の下で

$$
\overline X-\overline Y
\sim
N\left(
\mu_X-\mu_Y,
\sigma^2\left(\frac1n+\frac1m\right)
\right).
$$

$H_0^{(m)}$ では平均差が0なので

$$
Z
=
\frac{\overline X-\overline Y}
{\sigma\sqrt{1/n+1/m}}
\sim N(0,1).
$$

正規標本では標本平均と標本分散が独立であり、2標本も独立だから、$Z$ と $S_p^2$ は独立。

さらに

$$
V
=
\frac{(n+m-2)S_p^2}{\sigma^2}
\sim\chi_{n+m-2}^2.
$$

したがって

$$
\frac{Z}{\sqrt{V/(n+m-2)}}
\sim t_{n+m-2}.
$$

左辺は

$$
\frac{\overline X-\overline Y}
{S_p\sqrt{1/n+1/m}}
$$

に等しいので

$$
\boxed{T\sim t_{n+m-2}}.
$$

### 4. 棄却域と信頼区間

$t_{\nu,\alpha/2}$ を自由度 $\nu$ のt分布の上側 $\alpha/2$ 点とする。

$\nu=n+m-2$ とすると両側検定の棄却域は

$$
\boxed{|T|>t_{\nu,\alpha/2}}.
$$

平均差 $\Delta=\mu_X-\mu_Y$ の $1-\alpha$ 信頼区間は

$$
\boxed{
(\overline X-\overline Y)
\pm
t_{\nu,\alpha/2}
S_p\sqrt{\frac1n+\frac1m}
}.
$$

$0$ がこの区間に含まれないことと、$H_0^{(m)}:\Delta=0$ を有意水準 $\alpha$ で棄却することは同値である。

### 5. 非心度

真の平均差が

$$
\mu_X-\mu_Y=\Delta
$$

なら

$$
Z
=
\frac{\overline X-\overline Y}
{\sigma\sqrt{1/n+1/m}}
$$

は平均

$$
\delta
=
\frac{\Delta}
{\sigma\sqrt{1/n+1/m}}
$$

の正規分布に従う。

したがって $T$ は自由度 $n+m-2$、非心度

$$
\boxed{
\delta
=
\frac{\Delta}
{\sigma\sqrt{1/n+1/m}}
}
$$

の非心t分布に従う。

この非心度が大きいほど検出力が高い。

## 本番答案

$$
\frac{(n-1)S_X^2}{\sigma_X^2}\sim\chi_{n-1}^2,
\qquad
\frac{(m-1)S_Y^2}{\sigma_Y^2}\sim\chi_{m-1}^2.
$$

よって分散等値仮説の下で

$$
\frac{S_X^2}{S_Y^2}\sim F_{n-1,m-1}.
$$

共通分散を仮定すれば

$$
S_p^2=
\frac{(n-1)S_X^2+(m-1)S_Y^2}{n+m-2},
$$

$$
T=
\frac{\overline X-\overline Y}
{S_p\sqrt{1/n+1/m}}
\sim t_{n+m-2}
$$

under $H_0:\mu_X=\mu_Y$。

## 採点基準 20点

- 分散比F 4点
- pooled variance のカイ二乗 4点
- pooled t導出 6点
- CIとの双対性 3点
- 非心度 3点

## 25分経過時の打ち切り判断

(5)は捨ててもよい。(1)〜(4)を正確に仕上げる。特に独立性

$$
(\overline X,\overline Y)\perp(S_X^2,S_Y^2)
$$

を一言書くとt分布導出の根拠が締まる。

---

# 予想4: 二変量正規分布の母相関係数を検定する

- 安定ID: `PRED-TEST-04-CORRELATION`
- Level: C
- 目安時間: 25分
- 計算量: 中
- 主題: 母相関係数の検定
- 使用技術: 標本相関係数、単回帰、t分布、Fisherのz変換、漸近正規性

## 問題

$(X_i,Y_i)$、$i=1,\ldots,n$ は独立に二変量正規分布に従い、母相関係数を $\rho$ とする。標本相関係数を

$$
r
=
\frac{\sum_{i=1}^n(X_i-\overline X)(Y_i-\overline Y)}
{\sqrt{\sum_{i=1}^n(X_i-\overline X)^2}
\sqrt{\sum_{i=1}^n(Y_i-\overline Y)^2}}
$$

とする。

1. $H_0:\rho=0$ を考える。$Y$ を $X$ に単回帰したときの傾きのt統計量が

$$
T
=
r\sqrt{\frac{n-2}{1-r^2}}
$$

と書けることを示せ。
2. 二変量正規性の下で、$H_0:\rho=0$ なら

$$
T\sim t_{n-2}
$$

となることを説明せよ。
3. 有意水準 $\alpha$ の両側検定の棄却域とP値を書け。
4. 一般の $H_0:\rho=\rho_0$ を大標本で検定したい。Fisher変換

$$
z(r)=\frac12\log\frac{1+r}{1-r}
$$

を用い、漸近検定統計量を構成せよ。
5. 同じ結果から $\rho$ の近似 $1-\alpha$ 信頼区間を構成せよ。

## 解答

### 1. 回帰t統計量と標本相関係数

単回帰

$$
Y_i=a+bX_i+\varepsilon_i
$$

を考える。

$$
S_{XX}=\sum(X_i-\overline X)^2,
$$

$$
S_{YY}=\sum(Y_i-\overline Y)^2,
$$

$$
S_{XY}=\sum(X_i-\overline X)(Y_i-\overline Y)
$$

とすると

$$
\widehat b=\frac{S_{XY}}{S_{XX}}.
$$

また

$$
r=\frac{S_{XY}}{\sqrt{S_{XX}S_{YY}}}.
$$

回帰残差平方和は

$$
\operatorname{SSE}
=S_{YY}-\frac{S_{XY}^2}{S_{XX}}
=S_{YY}(1-r^2).
$$

したがって誤差分散推定量は

$$
s^2
=
\frac{S_{YY}(1-r^2)}{n-2}.
$$

傾きの標準誤差は

$$
\operatorname{SE}(\widehat b)
=
\frac{s}{\sqrt{S_{XX}}}.
$$

よって

$$
\begin{aligned}
T
&=
\frac{\widehat b}{\operatorname{SE}(\widehat b)}\\
&=
\frac{S_{XY}/S_{XX}}
{\sqrt{S_{YY}(1-r^2)/(n-2)}/\sqrt{S_{XX}}}\\
&=
r\sqrt{\frac{n-2}{1-r^2}}.
\end{aligned}
$$

したがって

$$
\boxed{
T=r\sqrt{\frac{n-2}{1-r^2}}
}.
$$

### 2. 帰無分布

二変量正規分布で $\rho=0$ なら、$X$ と $Y$ は独立である。

$X$ を固定した条件付き回帰として見れば、帰無仮説の下で回帰傾きは0であり、通常の正規線形回帰のt統計量が使える。

残差自由度は $n-2$ なので

$$
\boxed{T\sim t_{n-2}}.
$$

### 3. 棄却域とP値

$t_{n-2,\alpha/2}$ を上側 $\alpha/2$ 点とすると

$$
\boxed{|T|>t_{n-2,\alpha/2}}
$$

で棄却する。

観測値を $t_{\mathrm{obs}}$ とすれば両側P値は

$$
\boxed{
p
=2P\left(t_{n-2}\ge|t_{\mathrm{obs}}|\right)
}.
$$

### 4. Fisher変換による一般の $\rho_0$ の検定

Fisher変換

$$
z(r)=\operatorname{arctanh}(r)
=
\frac12\log\frac{1+r}{1-r}
$$

を用いる。

二変量正規分布では大標本で

$$
z(r)
\approx
N\left(
\operatorname{arctanh}(\rho),
\frac1{n-3}
\right).
$$

したがって $H_0:\rho=\rho_0$ の下で

$$
\boxed{
Z
=
\sqrt{n-3}
\left[
\operatorname{arctanh}(r)
-
\operatorname{arctanh}(\rho_0)
\right]
\approx N(0,1)
}.
$$

両側検定なら

$$
|Z|>z_{\alpha/2}
$$

で棄却する。

### 5. 近似信頼区間

$z$ スケールでの区間は

$$
\operatorname{arctanh}(r)
\pm
\frac{z_{\alpha/2}}{\sqrt{n-3}}.
$$

下端・上端をそれぞれ $L_z,U_z$ とする。

逆変換

$$
\tanh u
=
\frac{e^{2u}-1}{e^{2u}+1}
$$

を用いれば

$$
\boxed{
\left(
\tanh L_z,
\tanh U_z
\right)
}
$$

が $\rho$ の近似 $1-\alpha$ 信頼区間である。

## 本番答案

回帰恒等式

$$
\operatorname{SSE}=S_{YY}(1-r^2)
$$

より

$$
T=r\sqrt{\frac{n-2}{1-r^2}}.
$$

二変量正規分布で $\rho=0$ なら

$$
T\sim t_{n-2}.
$$

一般の $\rho_0$ については

$$
\sqrt{n-3}
\left[
\operatorname{arctanh}(r)-
\operatorname{arctanh}(\rho_0)
\right]
\approx N(0,1).
$$

## 採点基準 20点

- 回帰恒等式とt統計量 6点
- 帰無分布 4点
- 棄却域・P値 3点
- Fisher変換 4点
- 信頼区間 3点

## 25分経過時の打ち切り判断

Fisher変換の逆変換まで書けない場合は、まず $z$ スケール上の区間まで確実に書く。逆変換は最後の2点程度と考える。

---

# 予想5: Wilcoxon順位和検定を並べ替え検定として導く

- 安定ID: `PRED-TEST-05-WILCOXON-PERM`
- Level: C
- 目安時間: 25分
- 計算量: 中
- 主題: ノンパラメトリック検定、Wilcoxon順位和検定、並べ替え検定
- 使用技術: 順位、交換可能性、組合せ、期待値・分散、正規近似、Mann--Whitney $U$

## 問題

独立な2標本

$$
X_1,\ldots,X_m\sim F,
$$

$$
Y_1,\ldots,Y_n\sim G
$$

を考える。$F,G$ は連続分布とし、同順位は生じないものとする。

帰無仮説

$$
H_0:F=G
$$

に対し、対立仮説は「X標本の方が大きい値を取りやすい」とする。

全 $N=m+n$ 個を小さい順に並べ、X標本に属する観測の順位和を

$$
W=\sum_{i=1}^mR_i
$$

とする。

1. $H_0$ の下では、X標本が占める $m$ 個の順位集合が全て等確率であることを説明せよ。
2. $E_0[W]$ と $\operatorname{Var}_0(W)$ を求めよ。
3. Mann--Whitney統計量

$$
U=W-\frac{m(m+1)}2
$$

が、XとYの全 $mn$ ペアのうち「$X_i>Y_j$ となるペア数」に一致することを示せ。
4. 観測順位和が $w_{\mathrm{obs}}$ のとき、片側正確P値を並べ替えの個数を用いて表せ。
5. $m,n$ が大きいときの標準化統計量を書き、この検定が単調増加変換に不変である理由を説明せよ。

## 解答

### 1. 帰無仮説下の交換可能性

$H_0:F=G$ では、全 $N$ 個の観測は同じ連続分布から独立に得られたとみなせる。

値を順位へ変換した後、どの $m$ 個の順位がX標本ラベルを持つかについて区別する情報はない。

したがって

$$
\binom Nm
$$

通りの順位集合は全て等確率である。

各集合の確率は

$$
\boxed{\binom Nm^{-1}}.
$$

これがWilcoxon順位和検定を正確な並べ替え検定として解釈できる理由である。

### 2. 順位和の平均と分散

順位 $1,\ldots,N$ から重複なしに $m$ 個を無作為抽出して和を取る問題と同じである。

母集団順位の平均は

$$
\overline R
=
\frac{N+1}{2}.
$$

したがって

$$
\boxed{
E_0[W]
=
\frac{m(N+1)}2
}.
$$

順位 $1,\ldots,N$ の母分散は

$$
\frac1N\sum_{r=1}^N
\left(r-\frac{N+1}{2}\right)^2
=
\frac{N^2-1}{12}.
$$

非復元抽出の和の分散は有限母集団補正を用いて

$$
\operatorname{Var}_0(W)
=
m\frac{N^2-1}{12}
\frac{N-m}{N-1}.
$$

$N-m=n$ なので

$$
\boxed{
\operatorname{Var}_0(W)
=
\frac{mn(N+1)}{12}
}.
$$

### 3. Mann--Whitney $U$ との一致

X標本の順位を小さい順に

$$
R_{(1)}^X<\cdots<R_{(m)}^X
$$

とする。

$j$ 番目のX観測より小さい全観測数は $R_{(j)}^X-1$ 個。

そのうちX観測自身より小さいXは $j-1$ 個なので、Xより小さいYの個数は

$$
R_{(j)}^X-j.
$$

全Xについて足すと

$$
\sum_{j=1}^m(R_{(j)}^X-j)
=
W-\sum_{j=1}^mj.
$$

したがって

$$
\boxed{
U=W-\frac{m(m+1)}2
}.
$$

これは正確に

$$
\boxed{
U=
\sum_{i=1}^m\sum_{j=1}^n
\boldsymbol{1}_{\{X_i>Y_j\}}
}
$$

である。

### 4. 正確P値

Xが大きいほど順位和 $W$ は大きくなる。

したがって片側正確P値は

$$
\boxed{
p
=
\frac{
\#\left\{
A\subset\{1,\ldots,N\}:
|A|=m,
\sum_{r\in A}r\ge w_{\mathrm{obs}}
\right\}
}{\binom Nm}
}.
$$

これは分布形を仮定せず、帰無仮説下の交換可能性だけを使う有限標本の正確検定である。

### 5. 正規近似と単調変換不変性

同順位がなく、$m,n$ が十分大きいとき

$$
Z
=
\frac{W-m(N+1)/2}
{\sqrt{mn(N+1)/12}}
$$

は近似的に標準正規分布に従う。

したがって

$$
\boxed{
Z
\approx N(0,1)
}
$$

under $H_0$。

また厳密単調増加関数 $h$ を全観測へ適用しても大小関係は変わらない。

したがって順位は変わらず、$W$ も変わらない。

よってWilcoxon順位和検定は

$$
\boxed{
\text{測定尺度の単調増加変換に不変}
}
$$

である。

## 本番答案

$H_0$ では全順位集合

$$
A\subset\{1,\ldots,N\},
\qquad |A|=m
$$

が等確率 $\binom Nm^{-1}$。

したがって

$$
E[W]=\frac{m(N+1)}2,
$$

$$
\operatorname{Var}(W)=\frac{mn(N+1)}{12}.
$$

さらに

$$
U=W-\frac{m(m+1)}2
=
\sum_{i,j}\boldsymbol{1}_{\{X_i>Y_j\}}.
$$

正確P値は順位ラベルの全並べ替えのうち $W\ge w_{\mathrm{obs}}$ となる割合。

## 採点基準 20点

- 交換可能性 4点
- 平均・分散 6点
- $U$ との一致 4点
- 正確P値 3点
- 正規近似・不変性 3点

## 25分経過時の打ち切り判断

分散導出に時間を使いすぎない。

$$
\operatorname{Var}(W)=\frac{mn(N+1)}{12}
$$

を既知結果として先に置き、(3)と(4)の「順位検定＝並べ替え検定」という本質を取りに行く。

---

# 5題の位置づけ

| 問題 | 過去問型8題で薄かった論点 | 1級での演習価値 |
|---|---|---|
| 予想1 | Wald・Score | 最重要。LRTを含む三検定の関係を1題で整理できる |
| 予想2 | 正確検定 | 条件付き分布・nuisance parameter除去の典型 |
| 予想3 | 正規2標本・母分散 | t・カイ二乗・Fを統合して使う王道総合問題 |
| 予想4 | 母相関係数 | 正規理論と回帰を横断する定番論点 |
| 予想5 | ノンパラ・並べ替え | 分布自由な正確検定と順位法を同時に確認できる |

## 優先順位

直前期に3題だけ追加演習するなら

$$
\boxed{1\to3\to2}
$$

を推奨する。

- 予想1はシラバスに明記された三検定を直接扱う。
- 予想3は正規母集団の標本分布を総動員する。
- 予想2は正確検定の代表構造を押さえられる。

時間があれば4、5を追加する。

## 次点候補

今回5題に入れなかったが、準1級内容まで含めると次も候補になる。

- Bonferroni法・Holm法と家族内過誤率
- 符号付き順位検定
- Kruskal--Wallis検定
- Fisherの正確検定
- McNemar検定
- 局所対立下の検出力と検定の一致性

これらは上の5題を解いた後の第2追加セット候補とする。
