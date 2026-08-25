# Core 01 行列による通常最小二乗法・射影・残差空間

- 安定ID: `RIKOU-CORE-01`
- 80大問 No.: 31
- 演習価値: S
- 難度: B
- 目安時間: 25分
- 対応: 2023, 2024, 2025関連

## 問題

$n>p$ とし、$X$ は階数 $p$ の $n\times p$ 行列とする。線形モデル

$$
y=X\beta+\varepsilon,
\qquad
\varepsilon\sim N_n(0,\sigma^2I_n)
$$

を考える。

1. 残差平方和 $Q(\beta)=(y-X\beta)^\top(y-X\beta)$ を最小化して最小二乗推定量 $\widehat\beta$ を求めよ。正規方程式も導出すること。
2. $H=X(X^\top X)^{-1}X^\top$, $M=I_n-H$ とする。$H,M$ が対称かつ冪等であること、さらに $HX=X$, $MX=0$ を示せ。
3. $\widehat\beta$ と残差 $e=My$ の分布を求め、両者が独立であることを示せ。
4. $\mathrm{SSE}=e^\top e$ とするとき、$\mathrm{SSE}/\sigma^2$ の分布と $s^2=\mathrm{SSE}/(n-p)$ の期待値を求めよ。
5. $H$ と $M$ の幾何学的意味を説明せよ。

## 詳細解答

### 1. 残差平方和から正規方程式を導く

まず残差平方和を展開する。

$$
\begin{aligned}
Q(\beta)
&=(y-X\beta)^\top(y-X\beta)\\
&=y^\top y-y^\top X\beta-\beta^\top X^\top y
+\beta^\top X^\top X\beta.
\end{aligned}
$$

$y^\top X\beta$ はスカラーなので、その転置 $\beta^\top X^\top y$ と等しい。したがって

$$
Q(\beta)
=y^\top y-2\beta^\top X^\top y
+\beta^\top X^\top X\beta.
$$

ここで「行列の微分公式」を結果だけ使わず、$\beta$ を任意の微小ベクトル $h$ だけ動かしたときの $Q$ の変化を計算する。

$$
\begin{aligned}
Q(\beta+h)
&=\{y-X(\beta+h)\}^\top\{y-X(\beta+h)\}\\
&=(y-X\beta-Xh)^\top(y-X\beta-Xh).
\end{aligned}
$$

$r=y-X\beta$ と置くと

$$
\begin{aligned}
Q(\beta+h)-Q(\beta)
&=(r-Xh)^\top(r-Xh)-r^\top r\\
&=-r^\top Xh-h^\top X^\top r+h^\top X^\top Xh\\
&=-2h^\top X^\top r+h^\top X^\top Xh\\
&=-2h^\top X^\top(y-X\beta)+h^\top X^\top Xh.
\end{aligned}
$$

最小点 $\widehat\beta$ では、任意の方向 $h$ に対する1次の変化が0でなければならない。したがって

$$
-2X^\top(y-X\widehat\beta)=0.
$$

よって

$$
\boxed{X^\top X\widehat\beta=X^\top y}
$$

を得る。これが正規方程式である。

$X$ は列フルランクなので、任意の $a\ne0$ に対して

$$
a^\top X^\top Xa=\|Xa\|^2>0.
$$

したがって $X^\top X$ は正定値で可逆であり、正規方程式を解いて

$$
\boxed{
\widehat\beta=(X^\top X)^{-1}X^\top y
}.
$$

### 2. 射影行列

$X^\top X$ は対称なので、その逆行列も対称である。したがって

$$
\begin{aligned}
H^\top
&=\{X(X^\top X)^{-1}X^\top\}^\top\\
&=X\{(X^\top X)^{-1}\}^\top X^\top\\
&=X(X^\top X)^{-1}X^\top\\
&=H.
\end{aligned}
$$

また

$$
\begin{aligned}
H^2
&=X(X^\top X)^{-1}X^\top
X(X^\top X)^{-1}X^\top\\
&=X(X^\top X)^{-1}(X^\top X)(X^\top X)^{-1}X^\top\\
&=H.
\end{aligned}
$$

よって $H$ は対称かつ冪等である。$M=I-H$ について

$$
M^\top=I-H^\top=M,
$$

$$
M^2=(I-H)^2=I-2H+H^2=I-H=M.
$$

さらに

$$
HX=X(X^\top X)^{-1}X^\top X=X,
$$

したがって

$$
MX=(I-H)X=X-HX=0.
$$

### 3. $\widehat\beta$ と残差の分布・独立性

モデルを最小二乗推定量へ代入すると

$$
\begin{aligned}
\widehat\beta
&=(X^\top X)^{-1}X^\top(X\beta+\varepsilon)\\
&=\beta+(X^\top X)^{-1}X^\top\varepsilon.
\end{aligned}
$$

$\varepsilon$ は多変量正規分布に従い、$\widehat\beta$ はその線形変換なので

$$
\widehat\beta
\sim
N_p\left(
\beta,
\sigma^2(X^\top X)^{-1}
\right).
$$

分散は実際に

$$
\begin{aligned}
\operatorname{Var}(\widehat\beta)
&=(X^\top X)^{-1}X^\top
(\sigma^2I)
X(X^\top X)^{-1}\\
&=\sigma^2(X^\top X)^{-1}.
\end{aligned}
$$

一方、残差は $MX=0$ を使って

$$
\begin{aligned}
e=My
&=M(X\beta+\varepsilon)\\
&=M\varepsilon.
\end{aligned}
$$

したがって

$$
e\sim N_n(0,\sigma^2M).
$$

共分散を計算すると

$$
\begin{aligned}
\operatorname{Cov}(\widehat\beta,e)
&=(X^\top X)^{-1}X^\top
\operatorname{Var}(\varepsilon)M^\top\\
&=\sigma^2(X^\top X)^{-1}X^\top M\\
&=0,
\end{aligned}
$$

ここで $X^\top M=(MX)^\top=0$ を使った。$(\widehat\beta,e)$ は正規ベクトル $\varepsilon$ の線形変換なので同時正規であり、同時正規分布では共分散0なら独立だから、$\widehat\beta$ と $e$ は独立である。

### 4. 誤差平方和

$M$ は対称冪等である。また $H$ は $X$ の列空間への射影なので

$$
\operatorname{rank}(H)=p,
\qquad
\operatorname{rank}(M)=n-p.
$$

残差平方和は

$$
\mathrm{SSE}
=e^\top e
=(M\varepsilon)^\top(M\varepsilon)
=\varepsilon^\top M^\top M\varepsilon
=\varepsilon^\top M\varepsilon.
$$

ここで、標準正規ベクトル $Z\sim N_n(0,I)$ と階数 $r$ の対称冪等行列 $A$ に対して

$$
Z^\top AZ\sim\chi^2_r
$$

という正規二次形式の結果を使う。本問では $Z=\varepsilon/\sigma$, $A=M$, $r=n-p$ だから

$$
\boxed{
\frac{\mathrm{SSE}}{\sigma^2}
=\frac{\varepsilon^\top M\varepsilon}{\sigma^2}
\sim\chi^2_{n-p}
}.
$$

したがって $E[\chi^2_{n-p}]=n-p$ より

$$
\begin{aligned}
E[s^2]
&=E\left[\frac{\mathrm{SSE}}{n-p}\right]\\
&=\frac{\sigma^2}{n-p}E[\chi^2_{n-p}]\\
&=\sigma^2.
\end{aligned}
$$

### 5. 幾何学的意味

$H$ は $\mathcal C(X)$ への直交射影、$M$ はその直交補空間 $\mathcal C(X)^\perp$ への直交射影である。したがって

$$
y=Hy+My=\widehat y+e,
$$

かつ

$$
\widehat y\perp e.
$$

## 本番答案

$$
Q(\beta)
=y^\top y-2\beta^\top X^\top y+\beta^\top X^\top X\beta.
$$

$\beta$ を $h$ だけ動かしたときの1次項は

$$
-2h^\top X^\top(y-X\beta)
$$

なので、最小点では

$$
X^\top X\widehat\beta=X^\top y.
$$

$X$ は列フルランクだから

$$
\widehat\beta=(X^\top X)^{-1}X^\top y.
$$

$H=X(X^\top X)^{-1}X^\top$ は $H^\top=H$, $H^2=H$, $HX=X$ を満たす。$M=I-H$ も対称冪等で $MX=0$。よって

$$
\widehat\beta\sim N_p\left(\beta,\sigma^2(X^\top X)^{-1}\right),
\qquad
e=My\sim N_n(0,\sigma^2M).
$$

また

$$
\operatorname{Cov}(\widehat\beta,e)
=\sigma^2(X^\top X)^{-1}X^\top M=0
$$

で、両者は同時正規だから独立である。$\operatorname{rank}(M)=n-p$ より

$$
\frac{e^\top e}{\sigma^2}\sim\chi^2_{n-p},
\qquad
E\left[\frac{e^\top e}{n-p}\right]=\sigma^2.
$$

$H$ は $\mathcal C(X)$、$M$ はその直交補への射影である。

## 採点基準

- (1) 残差平方和の展開・1次条件・正規方程式・$\widehat\beta$: 4点
- (2) 対称性・冪等性・$HX=X$: 4点
- (3) 分布と独立性: 5点
- (4) カイ二乗分布と不偏分散推定: 5点
- (5) 射影の解釈: 2点

25分経過時も、(1) は正規方程式を既知公式として置かず、残差平方和から1次条件を示す。
