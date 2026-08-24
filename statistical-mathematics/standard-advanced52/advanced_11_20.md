# Advanced 11–20

---

# Advanced 11 位置母数付き指数・非正則2母数MLE

- 旧No.: 51
- 層: Advanced
- 演習価値: A
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎

## 問題

$n\ge2$ とし、$X_1,\ldots,X_n$ は

$$
f(x;\theta,\lambda)
=\lambda e^{-\lambda(x-\theta)}1\{x\ge\theta\},
\qquad \lambda>0
$$

にi.i.d.に従う。

1. 尤度を書け。
2. $(\theta,\lambda)$ のMLEを求めよ。
3. このモデルが通常の正則MLE理論から外れる理由を説明せよ。
4. $X_{(1)}-\theta$ の分布を求めよ。

## 詳細解答

尤度は

$$
L(\theta,\lambda)
=\lambda^n
\exp\left[-\lambda\sum_{i=1}^n(X_i-\theta)\right]
1\{\theta\le X_{(1)}\}.
$$

固定した $\lambda$ では、許される範囲で $\theta$ が大きいほど指数部が大きくなる。従って

$$
\boxed{\widehat\theta=X_{(1)}}.
$$

これを代入すると

$$
\ell(\lambda)
=n\log\lambda-\lambda\sum_i(X_i-X_{(1)}),
$$

よって

$$
\boxed{
\widehat\lambda
=\frac{n}{\sum_i(X_i-X_{(1)})}
}.
$$

支持集合 $[\theta,\infty)$ が母数 $\theta$ に依存し、尤度微分と積分の交換など通常の正則条件が破れる。このため $\widehat\theta$ は通常の $n^{-1/2}$ ではなく $n^{-1}$ スケールで収束する。

$X_i-\theta\sim Exp(\lambda)$ の最小値なので

$$
X_{(1)}-\theta\sim Exp(n\lambda).
$$

従って $n(X_{(1)}-\theta)$ は率 $\lambda$ の指数分布と同分布。

## 本番答案

$$
L=\lambda^n e^{-\lambda\sum(X_i-\theta)}1\{\theta\le X_{(1)}\}.
$$

固定 $\lambda$ で $\theta$ に単調増加なので $\hat\theta=X_{(1)}$。代入後のスコアから

$$
\hat\lambda=n/\sum(X_i-X_{(1)}).
$$

台が $\theta$ に依存する非正則モデル。さらに $X_{(1)}-\theta\sim Exp(n\lambda)$。

## 採点基準

- 尤度: 5点
- $\widehat\theta$: 5点
- $\widehat\lambda$: 5点
- 非正則性・最小値分布: 5点

---

# Advanced 12 2成分Poisson混合・EM

- 旧No.: 61
- 層: Advanced
- 演習価値: A
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎・修正済（収束までの反復計算不要）

## 問題

独立観測 $x_1,\ldots,x_n$ が

$$
f(x)=\pi\,Poi(x;\lambda_1)+(1-\pi)Poi(x;\lambda_2),
\qquad0<\pi<1
$$

から得られた。潜在変数 $Z_i\in\{0,1\}$ を成分1の所属指標とする。

1. 完全データ対数尤度を書け。
2. E-stepの責任度 $r_i=E[Z_i\mid x_i]$ を求めよ。
3. M-stepの $\pi,\lambda_1,\lambda_2$ 更新式を導け。
4. 数値反復を手で最後まで行う必要がない理由と、label switchingを説明せよ。

## 詳細解答

定数項を除く完全データ対数尤度は

$$
\ell_c
=\sum_i\left[
Z_i\{\log\pi-\lambda_1+x_i\log\lambda_1\}
+(1-Z_i)\{\log(1-\pi)-\lambda_2+x_i\log\lambda_2\}
\right].
$$

E-stepはBayes則より

$$
\boxed{
r_i
=\frac{\pi Poi(x_i;\lambda_1)}
{\pi Poi(x_i;\lambda_1)+(1-\pi)Poi(x_i;\lambda_2)}
}.
$$

M-stepでは $Z_i$ を $r_i$ で置き換えた期待完全対数尤度を最大化するので

$$
\boxed{\pi^{new}=\frac1n\sum_i r_i},
$$

$$
\boxed{\lambda_1^{new}=\frac{\sum_i r_ix_i}{\sum_i r_i}},
$$

$$
\boxed{\lambda_2^{new}=\frac{\sum_i(1-r_i)x_i}{\sum_i(1-r_i)}}.
$$

EMの本質は更新式の導出であり、収束までの多数回反復は計算機作業。成分ラベルを入れ替えた $(\pi,\lambda_1,\lambda_2)$ と $(1-\pi,\lambda_2,\lambda_1)$ は同じ混合分布を表すためlabel switchingがある。必要なら $\lambda_1<\lambda_2$ などの規約を置く。

## 本番答案

潜在所属 $Z_i$ を導入するとE-stepは

$$
r_i=\frac{\pi Poi(x_i;\lambda_1)}{\pi Poi(x_i;\lambda_1)+(1-\pi)Poi(x_i;\lambda_2)}.
$$

M-stepは

$$
\pi^{new}=n^{-1}\sum r_i,
\quad
\lambda_1^{new}=\frac{\sum r_ix_i}{\sum r_i},
\quad
\lambda_2^{new}=\frac{\sum(1-r_i)x_i}{\sum(1-r_i)}.
$$

## 採点基準

- 完全データ尤度: 5点
- E-step: 6点
- M-step: 7点
- label switching: 2点

---

# Advanced 13 母平均の両側UMPU

- 旧No.: 64
- 層: Advanced
- 演習価値: S
- 難度: S
- 目安時間: 30分
- 手計算監査: 表

## 問題

$X_1,\ldots,X_n\overset{iid}\sim N(\mu,\sigma^2)$、$\sigma^2$ は既知とする。

$$
H_0:\mu=\mu_0,
\qquad
H_1:\mu\ne\mu_0
$$

を考える。

1. 一般に両側対立ではUMP検定が存在しにくい理由を述べよ。
2. 有意水準 $\alpha$ の両側z検定を書け。
3. この検定が不偏であることを説明せよ。
4. 正規1母数指数型分布族におけるUMPU性を説明せよ。

## 詳細解答

$\mu>\mu_0$ に強い検定は右側を、$\mu<\mu_0$ に強い検定は左側を棄却するため、全対立に同時に最強となる単一のUMP検定は通常作れない。そこで「対立下の検出力が少なくともサイズ以上」という不偏性を課す。

$$
Z=\frac{\sqrt n(\bar X-\mu_0)}{\sigma}
$$

とすれば $H_0$ 下で $N(0,1)$。従って

$$
\boxed{|Z|>z_{1-\alpha/2}}
$$

で棄却する。

対立下では $Z\sim N(\delta,1)$, $\delta=\sqrt n(\mu-\mu_0)/\sigma$。対称な両側棄却確率は $\delta=0$ で最小となり、従って全ての $\mu\ne\mu_0$ で検出力は $\alpha$ 以上。

正規既知分散族は完全な1母数指数型分布族で、十分統計量は $\sum X_i$。サイズ条件と不偏条件を満たす両側臨界域がこの対称形となり、同クラス内でUMPUとなる。分位点は数表を用いる。

## 本番答案

両側では左右の対立で最強棄却方向が逆なのでUMPは一般にない。既知分散正規では

$$
Z=\sqrt n(\bar X-\mu_0)/\sigma
$$

に対し $|Z|>z_{1-\alpha/2}$。対立下のシフト正規で棄却確率は $\mu_0$ で最小なので不偏。1母数完全指数型分布族の理論からUMPU。

## 採点基準

- UMPが難しい理由: 4点
- z検定: 5点
- 不偏性: 6点
- UMPU性の説明: 5点

---

# Advanced 14 Cauchy単純対単純Neyman–Pearson検定

- 旧No.: 69
- 層: Advanced
- 演習価値: B
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎・修正済（臨界値の数値求解不要）

## 問題

1観測 $X$ は位置母数 $\theta$、尺度1のCauchy分布

$$
f_\theta(x)=\frac{1}{\pi\{1+(x-\theta)^2\}}
$$

に従う。

$$
H_0:\theta=0,
\qquad
H_1:\theta=1
$$

を考える。

1. 尤度比 $f_1(x)/f_0(x)$ を求めよ。
2. Neyman–Pearson補題による最強力棄却域を記述せよ。
3. 尤度比が $x$ の単調関数でないことを示せ。
4. 臨界値をどの条件で決めるか述べよ。

## 詳細解答

尤度比は

$$
R(x)=\frac{f_1(x)}{f_0(x)}
=\frac{1+x^2}{1+(x-1)^2}
=\frac{1+x^2}{x^2-2x+2}.
$$

NP補題より、サイズ $\alpha$ の最強力検定は

$$
\boxed{R(x)>k_\alpha}
$$

で棄却し、必要なら境界でランダム化する。

微分すると分母の平方を除いて

$$
R'(x)\propto-2x^2+2x+2.
$$

従って符号は $x=(1\pm\sqrt5)/2$ で変わり、全実数上で単調ではない。よってCauchy位置族では、正規平均のように「$X$ が大きければ棄却」という単純片側形を自動的には得ない。

$k_\alpha$ は

$$
P_{\theta=0}\{R(X)>k_\alpha\}=\alpha
$$

を満たすように決める。積分・数値求解は設問では要求しない。

## 本番答案

$$
R(x)=\frac{1+x^2}{x^2-2x+2}.
$$

NPより $R(x)>k_\alpha$ で棄却。$R'(x)$ の符号は $-2x^2+2x+2$ で決まり途中で変化するため非単調。$k_\alpha$ は $P_0(R(X)>k_\alpha)=\alpha$ で定義する。

## 採点基準

- 尤度比: 5点
- NP棄却域: 5点
- 非単調性: 6点
- サイズ条件: 4点

---

# Advanced 15 射影・Cochran・予測誤差

- 旧No.: 76
- 層: Advanced
- 演習価値: S
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎

## 問題

線形モデル

$$
y=X\beta+\varepsilon,
\qquad
\varepsilon\sim N_n(0,\sigma^2I),
$$

$\operatorname{rank}(X)=p$ とする。$H=X(X^TX)^{-1}X^T$。

1. $Hy$ と $(I-H)y$ が独立であることを示せ。
2. $SSE=y^T(I-H)y$ の分布を求めよ。
3. 新しい説明変数 $x_0$ に対する独立な将来観測 $Y_0=x_0^T\beta+\varepsilon_0$ を考える。予測誤差 $Y_0-x_0^T\hat\beta$ の分散を求めよ。
4. $\sigma^2$ を $S^2=SSE/(n-p)$ で推定したときのStudent化を述べよ。

## 詳細解答

$H$ と $I-H$ は直交射影で

$$
H(I-H)=0.
$$

$(Hy,(I-H)y)$ は同時正規で、共分散は

$$
\sigma^2H(I-H)=0.
$$

従って独立。

$I-H$ のランクは $n-p$ なので

$$
\boxed{SSE/\sigma^2\sim\chi^2_{n-p}}.
$$

$\hat\beta-\beta=(X^TX)^{-1}X^T\varepsilon$ より

$$
Var(x_0^T\hat\beta)=\sigma^2x_0^T(X^TX)^{-1}x_0.
$$

$\varepsilon_0$ は学習標本と独立なので

$$
\boxed{
Var(Y_0-x_0^T\hat\beta)
=\sigma^2\{1+x_0^T(X^TX)^{-1}x_0\}
}.
$$

さらに $S^2$ は $\hat\beta$ と独立で

$$
\frac{Y_0-x_0^T\hat\beta}
{S\sqrt{1+x_0^T(X^TX)^{-1}x_0}}
\sim t_{n-p}.
$$

## 本番答案

射影直交性 $H(I-H)=0$ と同時正規性から適合値と残差は独立。$rank(I-H)=n-p$ より $SSE/\sigma^2\sim\chi^2_{n-p}$。将来観測の予測誤差分散は

$$
\sigma^2[1+x_0^T(X^TX)^{-1}x_0].
$$

$S$ でStudent化すると $t_{n-p}$。

## 採点基準

- 射影独立性: 5点
- SSE分布: 5点
- 予測誤差分散: 6点
- Student化: 4点

---

# Advanced 16 重点サンプリング

- 旧No.: 93
- 層: Advanced
- 演習価値: B
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$$
I=\int_0^1x^4dx
$$

をMonte Carloで推定する。

1. $U\sim U(0,1)$ を用いる単純推定量の1標本分散を求めよ。
2. 提案密度 $g(x)=2x$, $0<x<1$ から $X$ を生成する重点サンプリング推定量を作れ。
3. その1標本分散を求め、単純法と比較せよ。

## 詳細解答

$I=1/5$。単純法は $U^4$ の平均で

$$
Var(U^4)=E[U^8]-I^2
=\frac19-\frac1{25}
=\frac{16}{225}.
$$

重点サンプリングでは

$$
I=E_g\left[\frac{X^4}{g(X)}\right]
=E_g\left[\frac{X^3}{2}\right].
$$

従って1標本変数は $W=X^3/2$。二次モーメントは

$$
E_g[W^2]
=\int_0^1\frac{x^6}{4}(2x)dx
=\frac1{16}.
$$

よって

$$
Var_g(W)=\frac1{16}-\frac1{25}
=\frac9{400}.
$$

$$
\frac9{400}<\frac{16}{225}
$$

なので改善。被積分関数が大きい $x$ の大きい領域へ提案密度を寄せたことが効いている。

## 本番答案

単純法の1標本分散は $1/9-1/25=16/225$。$g=2x$ なら重み付き変数は $X^4/(2X)=X^3/2$、分散は $1/16-1/25=9/400$ で小さい。

## 採点基準

- 単純法分散: 5点
- 重みの構成: 6点
- 重点法分散: 6点
- 比較・解釈: 3点

---

# Advanced 17 制御変量・最適係数

- 旧No.: 94
- 層: Advanced
- 演習価値: B
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$U\sim U(0,1)$ とし、$I=E[U^2]=1/3$ を推定したい。$E[U]=1/2$ は既知とする。

$$
W_c=U^2-c(U-1/2)
$$

を制御変量推定の1標本変数とする。

1. $W_c$ が全ての $c$ で不偏であることを示せ。
2. 分散を最小にする $c^*$ を導け。
3. この例で $c^*$ と最小分散を求めよ。
4. 単純法 $U^2$ と比較せよ。

## 詳細解答

$E[U-1/2]=0$ なので $E[W_c]=E[U^2]=1/3$。

一般に

$$
Var(W_c)=Var(X)+c^2Var(Z)-2cCov(X,Z)
$$

だから

$$
\boxed{c^*=\frac{Cov(X,Z)}{Var(Z)}}.
$$

ここで $X=U^2$, $Z=U$。

$$
Var(U)=\frac1{12},
$$

$$
Cov(U^2,U)=E[U^3]-E[U^2]E[U]
=\frac14-\frac16=\frac1{12}.
$$

従って $c^*=1$。単純法の分散は

$$
Var(U^2)=\frac15-\frac19=\frac4{45}.
$$

最小分散は

$$
\frac4{45}-\frac{(1/12)^2}{1/12}
=\frac4{45}-\frac1{12}
=\boxed{\frac1{180}}.
$$

## 本番答案

既知平均の差を引くので不偏。分散二次式を最小化して $c^*=Cov(X,Z)/Var(Z)$。本例では両者 $1/12$ なので $c^*=1$。分散は $4/45$ から $1/180$ へ低下。

## 採点基準

- 不偏性: 3点
- 最適係数導出: 7点
- 共分散計算: 5点
- 最小分散・比較: 5点

---

# Advanced 18 層化Monte Carlo

- 旧No.: 95
- 層: Advanced
- 演習価値: B
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

$$
I=\int_0^1x^2dx=\frac13
$$

を推定する。総試行数 $n$ は偶数とする。

1. $U\sim U(0,1)$ の単純Monte Carlo推定量の分散を求めよ。
2. 区間 $[0,1/2]$, $[1/2,1]$ に分け、各層で $n/2$ 個ずつ一様乱数を生成する層化推定量を書け。
3. 各層での $X^2$ の分散がそれぞれ $1/180$, $17/360$ であることを用い、層化推定量の分散を求めよ。
4. 分散削減率を比較せよ。

## 詳細解答

単純法では

$$
Var(U^2)=\frac15-\frac19=\frac4{45},
$$

従って標本平均分散は

$$
\frac4{45n}=\frac{64}{720n}.
$$

層重みは各 $1/2$。各層標本平均を $\bar W_1,\bar W_2$ とすると

$$
\widehat I_{str}=\frac12\bar W_1+\frac12\bar W_2.
$$

独立な層別標本より

$$
Var(\widehat I_{str})
=\frac14\frac{1/180}{n/2}
+\frac14\frac{17/360}{n/2}
=\frac{19}{720n}.
$$

従って分散比は

$$
\frac{19/720}{64/720}=\frac{19}{64}<1.
$$

層内で $x^2$ の変動幅を小さくしたことが分散削減につながる。

## 本番答案

単純法は $4/(45n)=64/(720n)$。層化法は重み $1/2$、各 $n/2$ 個なので

$$
Var=\frac{1}{2n}\left(\frac1{180}+\frac{17}{360}\right)
=\frac{19}{720n}.
$$

分散比 $19/64$。

## 採点基準

- 単純法分散: 4点
- 層化推定量: 5点
- 層化分散: 7点
- 比較・解釈: 4点

---

# Advanced 19 複合帰無・妥当なP値

- 旧No.: 99
- 層: Advanced
- 演習価値: S
- 難度: A
- 目安時間: 25分
- 手計算監査: 表

## 問題

帰無仮説が複合仮説

$$
H_0:\theta\in\Theta_0
$$

で、統計量 $T$ は大きいほど対立仮説寄りとする。

1. 妥当なP値の基本形を与えよ。
2. そのP値が帰無仮説の全ての $\theta$ で有意水準を制御する理由を説明せよ。
3. $X\sim N(\theta,1)$, $H_0:\theta\le0$, $H_1:\theta>0$, $T=X$ のP値を求めよ。
4. 帰無母数をデータ依存のplug-in推定値で置き換えることが一般に危険な理由を述べよ。

## 詳細解答

基本形は

$$
\boxed{
p(x)=\sup_{\theta\in\Theta_0}
P_\theta\{T(X)\ge T(x)\}
}.
$$

任意の真の帰無母数 $\theta_0\in\Theta_0$ に対して

$$
p(x)\ge p_{\theta_0}(x)
=P_{\theta_0}\{T(X)\ge T(x)\}.
$$

連続分布なら $p_{\theta_0}(X)$ は一様、離散ならsuper-uniformなので

$$
P_{\theta_0}\{p(X)\le\alpha\}\le\alpha.
$$

正規例では、固定 $x$ に対して $P_\theta(X\ge x)=1-\Phi(x-\theta)$ は $\theta$ とともに増加する。帰無集合 $\theta\le0$ で最大は境界 $\theta=0$。従って

$$
\boxed{p(x)=1-\Phi(x)}.
$$

plug-inは通常

$$
P_{\hat\theta_0}\{T\ge T(x)\}
\le\sup_{\theta\in\Theta_0}P_\theta\{T\ge T(x)\}
$$

であり、最悪ケースを保証しないためP値を過小評価しうる。特殊なピボット構造など別の正当化が必要。

## 本番答案

複合帰無では

$$
p(x)=\sup_{\theta\in\Theta_0}P_\theta(T\ge T(x)).
$$

真の任意の帰無母数でのtail確率以上を取るのでsuper-uniform性が保たれる。$N(\theta,1)$, $\theta\le0$ ではsupは境界0で $p=1-\Phi(x)$。plug-inはsup保証を失う。

## 採点基準

- supremum P値: 6点
- 妥当性の証明: 6点
- 正規例: 5点
- plug-inの危険: 3点

---

# Advanced 20 一致検定・局所対立・漸近検出力

- 旧No.: 100
- 層: Advanced
- 演習価値: S
- 難度: S
- 目安時間: 30分
- 手計算監査: 表

## 問題

$X_1,\ldots,X_n\overset{iid}\sim N(\mu,\sigma^2)$、$\sigma$ は既知とする。

$$
H_0:\mu=\mu_0,
\qquad
H_1:\mu>\mu_0
$$

を有意水準 $\alpha$ のz検定で検定する。

1. 検定と検出力関数を書け。
2. 固定対立 $\mu=\mu_0+\delta$, $\delta>0$ の下で一致性を示せ。
3. 局所対立 $\mu_n=\mu_0+h/\sqrt n$, $h>0$ の下で検出力極限を求めよ。
4. 固定対立と局所対立の違いを説明せよ。

## 詳細解答

$$
Z_n=\frac{\sqrt n(\bar X-\mu_0)}\sigma
$$

とし

$$
Z_n>z_{1-\alpha}
$$

で棄却する。

真の平均が $\mu$ なら

$$
Z_n\sim N\left(\frac{\sqrt n(\mu-\mu_0)}\sigma,1\right).
$$

従って検出力は

$$
\pi_n(\mu)
=1-\Phi\left(
z_{1-\alpha}-\frac{\sqrt n(\mu-\mu_0)}\sigma
\right).
$$

固定対立 $\mu=\mu_0+\delta$ では平均シフトが $\sqrt n\delta/\sigma\to\infty$ なので

$$
\boxed{\pi_n(\mu_0+\delta)\to1}.
$$

従ってこの検定列は固定対立に対して一致。

一方 $\mu_n=\mu_0+h/\sqrt n$ では

$$
\frac{\sqrt n(\mu_n-\mu_0)}\sigma=\frac h\sigma
$$

が定数なので

$$
\boxed{
\pi_n(\mu_n)
\to1-\Phi\left(z_{1-\alpha}-\frac h\sigma\right)
}.
$$

これは一般に1未満。局所対立は標本サイズ増加と同時に帰無へ近づくため、非自明な漸近検出力が残る。

## 本番答案

棄却域は $Z_n>z_{1-\alpha}$。検出力は

$$
1-\Phi\left(z_{1-\alpha}-\sqrt n(\mu-\mu_0)/\sigma\right).
$$

固定 $\delta>0$ では右辺は1へ。局所対立 $h/\sqrt n$ では

$$
1-\Phi(z_{1-\alpha}-h/\sigma)
$$

へ収束し1とは限らない。

## 採点基準

- 検定・検出力: 6点
- 固定対立の一致性: 5点
- 局所対立極限: 6点
- 両者の解釈: 3点
