# Core 02 線形制約・追加平方和・一般線形仮説のF検定

- 安定ID: `RIKOU-CORE-02`
- 80大問 No.: 34
- 演習価値: S
- 難度: A
- 目安時間: 30分
- 対応: 2022, 2025関連

## 問題

Core 01 と同じ正規線形モデル

$$
y=X\beta+\varepsilon,
\qquad \varepsilon\sim N_n(0,\sigma^2I_n),
\qquad \operatorname{rank}(X)=p
$$

を考える。$R$ を階数 $q$ の $q\times p$ 行列、$r\in\mathbb R^q$ とし

$$
H_0:R\beta=r
$$

を検定する。

1. 制約付き最小二乗推定量 $\hat\beta_R$ を求めよ。
2. 非制約モデルと制約モデルの残差平方和をそれぞれ $\mathrm{SSE}_U,\mathrm{SSE}_R$ とする。差 $\mathrm{SSE}_R-\mathrm{SSE}_U$ を $R\hat\beta-r$ で表せ。
3. $H_0$ の下で一般線形仮説の $F$ 統計量を構成し、その自由度を答えよ。
4. $q=1$, $R\hat\beta-r=0.2$, $R(X^\top X)^{-1}R^\top=0.04$, $\mathrm{SSE}_U=10$, $n-p=20$ のとき $F$ を求めよ。

## 詳細解答

### 1. 制約付き推定

ラグランジュ関数を

$$
L(\beta,\lambda)=(y-X\beta)^\top(y-X\beta)+2\lambda^\top(R\beta-r)
$$

とする。微分条件は

$$
X^\top X\beta-X^\top y+R^\top\lambda=0,
$$

したがって

$$
\beta=\hat\beta-(X^\top X)^{-1}R^\top\lambda.
$$

制約を代入し、

$$
R\hat\beta-R(X^\top X)^{-1}R^\top\lambda=r.
$$

$$
C=R(X^\top X)^{-1}R^\top
$$

とおく。$X$ は列フルランクなので $X^\top X$ は正定値、$R$ は行フルランクなので $C$ も正定値で可逆。よって

$$
\lambda=C^{-1}(R\hat\beta-r),
$$

$$
\boxed{\hat\beta_R=\hat\beta-(X^\top X)^{-1}R^\top C^{-1}(R\hat\beta-r)}.
$$

### 2. 追加平方和

通常最小二乗法 の正規方程式

$$
X^\top(y-X\hat\beta)=0
$$

から、任意の $\beta$ について

$$
\begin{aligned}
Q(\beta)
&=(y-X\beta)^\top(y-X\beta)\\
&=\mathrm{SSE}_U+(\beta-\hat\beta)^\top X^\top X(\beta-\hat\beta).
\end{aligned}
$$

$d=\hat\beta_R-\hat\beta$、$u=R\hat\beta-r$ とおけば

$$
d=-(X^\top X)^{-1}R^\top C^{-1}u
$$

なので

$$
\begin{aligned}
\mathrm{SSE}_R-\mathrm{SSE}_U
&=d^\top X^\top Xd\\
&=u^\top C^{-1}R(X^\top X)^{-1}R^\top C^{-1}u\\
&=u^\top C^{-1}u.
\end{aligned}
$$

従って

$$
\boxed{\mathrm{SSE}_R-\mathrm{SSE}_U
=(R\hat\beta-r)^\top C^{-1}(R\hat\beta-r)}.
$$

### 3. F分布を使える条件を確認する

まず **多変量正規の線形変換**から

$$
\hat\beta\sim N_p\left(\beta,\sigma^2(X^\top X)^{-1}\right).
$$

$H_0:R\beta=r$ の下では

$$
R\hat\beta-r\sim N_q(0,\sigma^2C).
$$

$C$ は正定値なので

$$
Z=\frac1\sigma C^{-1/2}(R\hat\beta-r)\sim N_q(0,I_q).
$$

従って「独立標準正規の平方和はカイ二乗」という定義から

$$
\frac{(R\hat\beta-r)^\top C^{-1}(R\hat\beta-r)}{\sigma^2}
=Z^TZ
\sim\chi^2_q.
$$

一方、$H=X(X^\top X)^{-1}X^\top$ とすれば $I-H$ は対称冪等でランク $n-p$。正規誤差の下で **Cochranの定理**を適用でき、

$$
\frac{\mathrm{SSE}_U}{\sigma^2}
=\frac{\varepsilon^\top(I-H)\varepsilon}{\sigma^2}
\sim\chi^2_{n-p}.
$$

さらに分子の基礎となる $R\hat\beta-r$ と残差 $(I-H)y$ の共分散は

$$
\begin{aligned}
Cov(R\hat\beta-r,(I-H)y)
&=\sigma^2R(X^\top X)^{-1}X^\top(I-H)\\
&=0.
\end{aligned}
$$

両者は $y$ の線形変換で同時正規なので、**同時正規で無相関なら独立**という定理から独立。従って二つのカイ二乗量も独立である。

以上よりF分布の定義を適用でき、

$$
\boxed{F=\frac{(\mathrm{SSE}_R-\mathrm{SSE}_U)/q}{\mathrm{SSE}_U/(n-p)}\sim F_{q,n-p}}.
$$

ここで正規誤差、$X$ の列フルランク、$R$ の行フルランクが正確なF分布の重要条件である。

### 4. 数値

追加平方和は

$$
\frac{0.2^2}{0.04}=1.
$$

したがって

$$
F=\frac{1/1}{10/20}=2.
$$

## 本番答案

$C=R(X^\top X)^{-1}R^\top$ とおくと

$$
\hat\beta_R=\hat\beta-(X^\top X)^{-1}R^\top C^{-1}(R\hat\beta-r),
$$

$$
\mathrm{SSE}_R-\mathrm{SSE}_U=(R\hat\beta-r)^\top C^{-1}(R\hat\beta-r).
$$

正規誤差、$rank(X)=p$、$rank(R)=q$。$H_0$ では $C^{-1/2}(R\hat\beta-r)/\sigma\sim N_q(0,I)$ なので分子平方和は $\chi^2_q$。また $I-H$ はランク $n-p$ の直交射影なので **Cochranの定理**から $SSE_U/\sigma^2\sim\chi^2_{n-p}$。両者は同時正規の直交成分から作られ独立。従って

$$
F\sim F_{q,n-p}.
$$

数値例では追加平方和1、$F=2$。

## 採点基準

- (1) 制約付き推定量: 6点
- (2) 追加平方和公式: 5点
- (3) F統計量・定理名・条件確認・独立性: 7点
- (4) 数値計算: 2点

25分経過時は制約付き推定量の導出を短縮し、追加平方和と「正規性・ランク・独立性を確認して $F_{q,n-p}$」を優先する。
