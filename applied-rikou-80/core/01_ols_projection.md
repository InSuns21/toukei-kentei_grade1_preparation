# Core 01 行列によるOLS・射影・残差空間

- 安定ID: `RIKOU-CORE-01`
- 80大問 No.: 31
- 演習価値: S
- 難度: B
- 目安時間: 25分
- 対応: 2023, 2024, 2025関連

## 問題

$n>p$ とし、$X$ は階数 $p$ の $n\times p$ 行列とする。線形モデル

$$
y=X\beta+\varepsilon,\qquad \varepsilon\sim N_n(0,\sigma^2I_n)
$$

を考える。

1. 残差平方和 $Q(\beta)=(y-X\beta)^\top(y-X\beta)$ を最小化して最小二乗推定量 $\hat\beta$ を求めよ。
2. $H=X(X^\top X)^{-1}X^\top$, $M=I_n-H$ とする。$H,M$ が対称かつ冪等であること、さらに $HX=X$, $MX=0$ を示せ。
3. $\hat\beta$ と残差 $e=My$ の分布を求め、両者が独立であることを示せ。
4. $\mathrm{SSE}=e^\top e$ とするとき、$\mathrm{SSE}/\sigma^2$ の分布と $s^2=\mathrm{SSE}/(n-p)$ の期待値を求めよ。
5. $H$ と $M$ の幾何学的意味を説明せよ。

## 詳細解答

### 1. OLS

展開すると

$$
Q(\beta)=y^\top y-2\beta^\top X^\top y+\beta^\top X^\top X\beta.
$$

したがって

$$
\frac{\partial Q}{\partial\beta}=-2X^\top y+2X^\top X\beta.
$$

正規方程式 $X^\top X\hat\beta=X^\top y$ を得る。$X$ は列フルランクなので $X^\top X$ は正定値で可逆、よって

$$
\boxed{\hat\beta=(X^\top X)^{-1}X^\top y}.
$$

### 2. 射影行列

$X^\top X$ は対称なのでその逆行列も対称であり、$H^\top=H$。また

$$
H^2=X(X^\top X)^{-1}X^\top X(X^\top X)^{-1}X^\top=H.
$$

よって $H$ は対称冪等である。$M=I-H$ についても

$$
M^\top=M,\qquad M^2=I-2H+H^2=M.
$$

さらに

$$
HX=X(X^\top X)^{-1}X^\top X=X,
$$

したがって $MX=X-HX=0$。

### 3. 分布と独立性

$y=X\beta+\varepsilon$ を代入すると

$$
\hat\beta=\beta+(X^\top X)^{-1}X^\top\varepsilon.
$$

よって

$$
\boxed{\hat\beta\sim N_p\left(\beta,\sigma^2(X^\top X)^{-1}\right)}.
$$

また

$$
e=My=M\varepsilon\sim N_n(0,\sigma^2M).
$$

共分散は

$$
\operatorname{Cov}(\hat\beta,e)
=(X^\top X)^{-1}X^\top\sigma^2M
=0
$$

である。$(\hat\beta,e)$ は $y$ の線形変換で同時正規なので、無相関から独立である。

### 4. SSE

$M$ は対称冪等で

$$
\operatorname{rank}(M)=n-\operatorname{rank}(H)=n-p.
$$

正規ベクトルの冪等二次形式より

$$
\boxed{\frac{\mathrm{SSE}}{\sigma^2}=\frac{\varepsilon^\top M\varepsilon}{\sigma^2}\sim\chi^2_{n-p}}.
$$

したがって

$$
E[s^2]=\frac{\sigma^2E[\chi^2_{n-p}]}{n-p}=\sigma^2.
$$

### 5. 幾何

$H$ は $\mathcal C(X)$ への直交射影、$M$ はその直交補空間 $\mathcal C(X)^\perp$ への直交射影である。したがって

$$
y=Hy+My=\hat y+e,
$$

かつ $\hat y\perp e$。

## 本番答案

正規方程式より

$$
\hat\beta=(X^\top X)^{-1}X^\top y.
$$

$H=X(X^\top X)^{-1}X^\top$ は $H^\top=H$, $H^2=H$, $HX=X$ を満たす。$M=I-H$ も対称冪等で $MX=0$。よって

$$
\hat\beta\sim N_p\left(\beta,\sigma^2(X^\top X)^{-1}\right),\qquad e=My\sim N_n(0,\sigma^2M).
$$

また $\operatorname{Cov}(\hat\beta,e)=0$ で同時正規だから独立。$\operatorname{rank}(M)=n-p$ より

$$
\frac{e^\top e}{\sigma^2}\sim\chi^2_{n-p},\qquad E\left[\frac{e^\top e}{n-p}\right]=\sigma^2.
$$

$H$ は $\mathcal C(X)$、$M$ はその直交補への射影である。

## 採点基準

- (1) 正規方程式と $\hat\beta$: 4点
- (2) 対称性・冪等性・$HX=X$: 4点
- (3) 分布と独立性: 5点
- (4) カイ二乗分布と不偏分散推定: 5点
- (5) 射影の解釈: 2点

25分経過時は、(3) の独立性を「同時正規かつ共分散0」と一行で処理し、(4) の自由度 $n-p$ を必ず確保する。
