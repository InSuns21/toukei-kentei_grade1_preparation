# Core 02 線形制約・追加平方和・一般線形仮説のF検定

- 安定ID: `RIKOU-CORE-02`
- 80大問 No.: 34
- 演習価値: S
- 難度: A
- 目安時間: 30分

## 問題

Core 01 と同じ正規線形モデルを考える。$R$ を階数 $q$ の $q\times p$ 行列、$r\in\mathbb R^q$ とし

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

ここで

$$
C=R(X^\top X)^{-1}R^\top
$$

とおけば $C$ は可逆で

$$
\lambda=C^{-1}(R\hat\beta-r).
$$

よって

$$
\boxed{\hat\beta_R=\hat\beta-(X^\top X)^{-1}R^\top C^{-1}(R\hat\beta-r)}.
$$

### 2. 追加平方和

制約付き推定量は非制約OLSから $X^\top X$ 計量で最短距離にある制約面への射影である。平方完成すると

$$
\boxed{\mathrm{SSE}_R-\mathrm{SSE}_U
=(R\hat\beta-r)^\top C^{-1}(R\hat\beta-r)}.
$$

### 3. F統計量

$H_0$ の下で

$$
R\hat\beta-r\sim N_q(0,\sigma^2C).
$$

したがって

$$
\frac{(R\hat\beta-r)^\top C^{-1}(R\hat\beta-r)}{\sigma^2}\sim\chi^2_q.
$$

一方

$$
\frac{\mathrm{SSE}_U}{\sigma^2}\sim\chi^2_{n-p}
$$

で両者は独立。ゆえに

$$
\boxed{F=\frac{(\mathrm{SSE}_R-\mathrm{SSE}_U)/q}{\mathrm{SSE}_U/(n-p)}\sim F_{q,n-p}}.
$$

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

$C=R(X^\top X)^{-1}R^\top$ とおくと、ラグランジュ法から

$$
\hat\beta_R=\hat\beta-(X^\top X)^{-1}R^\top C^{-1}(R\hat\beta-r).
$$

また

$$
\mathrm{SSE}_R-\mathrm{SSE}_U=(R\hat\beta-r)^\top C^{-1}(R\hat\beta-r).
$$

$H_0$ の下で分子を $\sigma^2$ で割った量は $\chi^2_q$、$\mathrm{SSE}_U/\sigma^2\sim\chi^2_{n-p}$ で独立だから

$$
F=\frac{(\mathrm{SSE}_R-\mathrm{SSE}_U)/q}{\mathrm{SSE}_U/(n-p)}\sim F_{q,n-p}.
$$

数値例では追加平方和1、$F=2$。

## 採点基準

- (1) 制約付き推定量: 6点
- (2) 追加平方和公式: 5点
- (3) F統計量・自由度・独立性: 7点
- (4) 数値計算: 2点

25分経過時は制約付き推定量の導出を短縮し、追加平方和と $F_{q,n-p}$ を優先する。
