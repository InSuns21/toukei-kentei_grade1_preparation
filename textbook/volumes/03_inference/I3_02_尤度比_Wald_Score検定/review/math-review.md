# I3-02 数理査読

査読日: 2026-09-05  
対象: `I3_02_尤度比_Wald_Score検定/index.md`

## 結論

- fatal: 0
- major: 0
- minor: 0

## 確認項目

### 1. 尤度比の向き

本章は

$$
\Lambda=\frac{L(\tilde\theta)}{L(\hat\theta)}\le1,
\qquad
G^2=-2\log\Lambda
$$

で統一されている。分子は帰無仮説下の制約付き最大尤度、分母は母数空間全体での最大尤度であり、符号も非負になる。

### 2. Wilksの定理

- 自由度を母数総次元ではなく独立制約数 $r$ としている。
- 真値が内点、識別可能、滑らかさ、正則情報量などの条件を明記している。
- 境界・識別不能・特異情報量・台が母数依存する非正則例を適用外として明記している。

### 3. ワルド型統計量

1母数では

$$
W=\frac{(\hat\theta-\theta_0)^2}
{\widehat{\operatorname{se}}(\hat\theta)^2}
$$

としており、一般制約ではデルタ法から

$$
n h(\hat\theta)^{\mathsf T}
[H I_1^{-1}H^{\mathsf T}]^{-1}
h(\hat\theta)
$$

を導いている。1観測あたり情報量 $I_1$ と標本サイズ $n$ の位置も整合している。

### 4. スコア型統計量

1母数では

$$
S=U_n(\theta_0)^2/I_n(\theta_0)
$$

で正しい。迷惑母数がある場合は帰無仮説下の制約付き推定点で評価し、Schur補行列

$$
I_{\psi\cdot\lambda}
=I_{\psi\psi}-I_{\psi\lambda}I_{\lambda\lambda}^{-1}I_{\lambda\psi}
$$

を有効情報量としている。

### 5. 漸近同値性

対数尤度の二次展開とスコア方程式のTaylor展開から

$$
G^2-W=o_p(1),
\qquad
W-S=o_p(1)
$$

を説明している。$H_0$ 下で3者が $\chi_1^2$ へ収束する流れも I2-01 のMLE漸近正規性と整合する。

### 6. 正規既知分散例

$$
G^2=W=S=\frac{n(\bar X-\mu_0)^2}{\sigma^2}
$$

が厳密に一致する。対数尤度が厳密な二次関数であることを理由としており正しい。

### 7. ベルヌーイ例

$$
G^2
=2n\left[
\hat p\log\frac{\hat p}{p_0}
+(1-\hat p)\log\frac{1-\hat p}{1-p_0}
\right],
$$

$$
W=\frac{n(\hat p-p_0)^2}{\hat p(1-\hat p)},
\qquad
S=\frac{n(\hat p-p_0)^2}{p_0(1-p_0)}
$$

はいずれも正しい。$n=100,\hat p=0.6,p_0=0.5$ の数値も $S=4$, $W=25/6$, $G^2\approx4.03$ で整合する。

### 8. ポアソン例

$$
G^2=2n\left[\hat\lambda\log(\hat\lambda/\lambda_0)-(\hat\lambda-\lambda_0)\right],
$$

$$
W=n(\hat\lambda-\lambda_0)^2/\hat\lambda,
\qquad
S=n(\hat\lambda-\lambda_0)^2/\lambda_0
$$

は正しい。

### 9. 未知分散正規母平均

制約なし

$$
\hat v=n^{-1}\sum(X_i-\bar X)^2
$$

と制約下

$$
\tilde v=n^{-1}\sum(X_i-\mu_0)^2
$$

から

$$
G^2=n\log(\tilde v/\hat v)
$$

を得る導出は正しい。有限標本ではt検定が正確であるという注意も適切。

### 10. Markov連鎖例

条件付き遷移尤度

$$
(1-p)^{N_{00}}p^{N_{01}}q^{N_{10}}(1-q)^{N_{11}}
$$

に対して

$$
\hat p=\frac{N_{01}}{N_{00}+N_{01}},
\qquad
\hat q=\frac{N_{10}}{N_{10}+N_{11}}
$$

および $H_0:p=q=t$ 下の

$$
\tilde t
=\frac{N_{01}+N_{10}}
{N_{00}+N_{01}+N_{10}+N_{11}}
$$

は正しい。制約数1なのでWilks自由度1も正しい。

### 11. 再母数化

尤度比統計量の1対1再母数化不変性を正しく記述している。ワルド型統計量は非線形再母数化で有限標本値が一般に変わる一方、デルタ法により局所的・漸近的には整合するという説明も正しい。

### 12. 局所対立仮説

$$
\theta_n=\theta_0+h/\sqrt n
$$

の下で非心度

$$
\delta=h^2I_1(\theta_0)
$$

を持つ $\chi_1^2(\delta)$ 極限を示しており、1母数正則モデルの局所漸近理論として妥当。

## 査読結果

数式・仮定・自由度・情報量の評価点・有限標本と漸近の区別に重大な欠落はない。I3-02 を reviewed としてよい。
