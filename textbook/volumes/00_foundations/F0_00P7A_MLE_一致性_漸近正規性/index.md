# F0-00P7A 最尤推定量一致性・漸近正規性：KL・大数の法則・中心極限定理・Taylor

最尤推定量の漸近正規性は一発の公式ではなく、

$$\boxed{\text{consistency}+\text{score CLT}+\text{Hessian LLN}+\text{Taylor}+\text{Slutsky}}$$

の合成です。特にHessianを真値近傍で評価するため、**一致性を先に確保する必要がある**ことを明示します。

### Slutskyの定理

$Y_n\Rightarrow Y$、$Z_n\to c$ in probability なら、連続な四則演算が定義される範囲で

$$Y_n+Z_n\Rightarrow Y+c,\qquad Y_nZ_n\Rightarrow cY.$$

最尤推定量ではscoreの中心極限定理とobserved informationの確率収束を最後に合成するために使います。

### 一致性で必要なもの

各固定θでの大数の法則だけではargmaxの交換には足りません。典型的には、compactなparameter空間・identifiability・対数密度の連続性・可積分envelopeなどから

$$\sup_\theta\left|\frac1n\ell_n(\theta)-M(\theta)\right|\to0$$

という**一様大数の法則**を確保し、$M(\theta)$ の一意最大点θ0へargmaxを押し込みます。この講義ではこの十分条件を漸近論の入口として使い、一般empirical-process版までは必須にしません。

---

## 0. 先にBernoulliモデルで全工程を見る

一般論へ入る前に、$X_1,\dots,X_n\overset{iid}{\sim}\operatorname{Bernoulli}(p_0)$、$0<p_0<1$ を考えます。対数尤度は、$S_n=\sum_iX_i$ として

$$
\ell_n(p)
=S_n\log p+(n-S_n)\log(1-p)
$$

です。score方程式は

$$
U_n(p)
=\frac{S_n}{p}-\frac{n-S_n}{1-p}=0
$$

なので

$$
\boxed{\widehat p_n=\frac{S_n}{n}=\overline X_n}.
$$

ここでは一致性がすぐ見えます。大数の法則から

$$
\widehat p_n=\overline X_n\xrightarrow{p}p_0.
$$

さらに

$$
I(p)
=E_p\!\left[\left\{\frac{X-p}{p(1-p)}\right\}^2\right]
=\frac1{p(1-p)}.
$$

一方、中心極限定理から直接

$$
\sqrt n(\widehat p_n-p_0)
\xrightarrow{d}
N\left(0,p_0(1-p_0)\right).
$$

そして

$$
I(p_0)^{-1}=p_0(1-p_0).
$$

したがってこの具体例だけで

$$
\boxed{
\sqrt n(\widehat p_n-p_0)
\Rightarrow
N\left(0,I(p_0)^{-1}\right)
}
$$

という一般形が見えています。

### 0.1 一般論の各部品はBernoulliでは何だったか

| 一般論 | Bernoulliモデル |
|---|---|
| consistency | $\bar X_n\to p_0$ |
| score CLT | $\sum_i(X_i-p_0)/\{p_0(1-p_0)\}$ のCLT |
| Hessian LLN | $-n^{-1}\ell_n''(p)$ が $I(p_0)$ へ近づく |
| Taylor | $U_n(\hat p_n)=0$ を $p_0$ 周りで展開 |
| Slutsky | score側の分布収束とHessian側の確率収束を合成 |

一般モデルでは $\widehat\theta_n$ が標本平均のように明示できないため、この五つを別々に証明して最後に組み立てます。

---

## 1. 最尤推定量の漸近正規性は大数の法則と中心極限定理の合体

真値を $\theta_0$、最尤推定量を $\widehat\theta_n$ とします。

内部解なら

$$
U_n(\widehat\theta_n)=0.
$$

Taylor展開すると、$\theta_0$ と $\widehat\theta_n$ の間の $\theta_n^*$ を用いて

$$
0
=U_n(\theta_0)
+(\widehat\theta_n-\theta_0)
U_n'(\theta_n^*).
$$

したがって

$$
\sqrt n(\widehat\theta_n-\theta_0)
=
\left\{
-\frac1nU_n'(\theta_n^*)
\right\}^{-1}
\frac{U_n(\theta_0)}{\sqrt n}.
$$

ここで二つの確率極限定理を使います。

---

## 2. スコア側には中心極限定理

正則性条件から

$$
E_{\theta_0}[s_{\theta_0}(X)]=0,
$$

$$
\operatorname{Var}_{\theta_0}
(s_{\theta_0}(X))
=I(\theta_0).
$$

したがって [P6Aの中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt) から

$$
\boxed{
\frac{U_n(\theta_0)}{\sqrt n}
\xrightarrow{d}
N(0,I(\theta_0))
}
$$

です。

---

## 3. Hessian側には大数則

$$
-\frac1nU_n'(\theta)
=-\frac1n
\sum_{i=1}^n
\frac{\partial^2}{\partial\theta^2}
\log p_\theta(X_i).
$$

真値付近で一様な大数則を使えるなら

$$
-\frac1nU_n'(\theta_n^*)
\xrightarrow{p}
I(\theta_0).
$$

したがってSlutskyの定理から

$$
\boxed{
\sqrt n(\widehat\theta_n-\theta_0)
\xrightarrow{d}
N\left(0,I(\theta_0)^{-1}\right)
}
$$

です。

最尤推定量の漸近正規性は

$$
\boxed{
\text{scoreのCLT}
+\text{HessianのLLN}
+\text{Taylor展開}
}
$$

として読めます。

---

## 4. 一致性も別に必要

前節では $\theta_n^*$ が真値へ近づくことを暗黙に使っています。

そのためにはまず

$$
\widehat\theta_n\xrightarrow{p}\theta_0
$$

という一致性が必要です。

典型的には

$$
\frac1n\ell_n(\theta)
\to
E_{\theta_0}[\log p_\theta(X)]
$$

を大数則で示し、極限関数が $\theta_0$ で一意に最大になることを使います。

ここでは点ごとの大数則だけでなく、パラメータ全体にわたる一様大数則が重要になることがあります。

---

## 5. Kullback--Leibler divergenceが現れる

真値 $\theta_0$ の下で

$$
E_{\theta_0}[\log p_\theta(X)]
-
E_{\theta_0}[\log p_{\theta_0}(X)]
$$

を計算すると

$$
=-D_{\mathrm{KL}}(P_{\theta_0}\|P_\theta)
\le0.
$$

したがって識別可能なら真値が期待対数尤度を最大化します。

最尤推定量一致性の背後には

$$
\boxed{
\text{大数則}
+\text{KL divergenceの非負性}
}
$$

という構造があります。

---

## 演習

### F0-00P7A-A01 最尤推定量 Taylor展開の骨格

- Level: A
- 目安時間: 15分

1次元正則モデルで $0=\ell_n'(\hat\theta_n)$ を $\theta_0$ 周りにTaylor展開し、$\sqrt n(\hat\theta_n-\theta_0)$ の形へ整理せよ。

<!-- solution-start -->
#### 詳細解答
$0=\ell_n'(\theta_0)+\ell_n''(\tilde\theta_n)(\hat\theta_n-\theta_0)$。従って $\sqrt n(\hat\theta_n-\theta_0)=-[n^{-1}\ell_n''(\tilde\theta_n)]^{-1}[n^{-1/2}\ell_n'(\theta_0)]$。

#### 本番答案
$\sqrt n(\hat\theta_n-\theta_0)=-\{n^{-1}\ell_n''(\tilde\theta_n)\}^{-1}n^{-1/2}\ell_n'(\theta_0)$。

#### 採点基準（20点）
- score方程式: 4点
- Taylor: 7点
- √n整理: 7点
- 中間点: 2点
<!-- solution-end -->

### F0-00P7A-B01 KLと最尤推定量一致性の向き

- Level: B
- 目安時間: 18分

真値 $\theta_0$ の下で $M(\theta)=E_{\theta_0}\log p_\theta(X)$ とする。KL divergenceを用いて $M(\theta)\le M(\theta_0)$ を示し、identifiabilityの役割を説明せよ。

<!-- solution-start -->
#### 詳細解答
$M(\theta_0)-M(\theta)=E_{\theta_0}\log[p_{\theta_0}/p_\theta]=D_{KL}(P_{\theta_0}\|P_\theta)\ge0$。identifiabilityがあれば等号は分布、ひいてはparameterが同じ時だけなのでθ0が一意最大。標本対数尤度の一様収束が加わればargmax consistencyへ繋がる。

#### 本番答案
$M(\theta_0)-M(\theta)=D_{KL}(P_{\theta_0}\|P_\theta)\ge0$。identifiabilityで等号点をθ0に一意化する。

#### 採点基準（20点）
- KL表示: 8点
- 非負性: 4点
- identifiability: 5点
- 一致性への橋: 3点
<!-- solution-end -->


### F0-00P7A-B02 Poissonモデルで漸近分散まで確認する

- Level: B
- 目安時間: 20分

$X_1,\dots,X_n\overset{iid}{\sim}\operatorname{Poisson}(\lambda_0)$、$\lambda_0>0$ とする。

1. 最尤推定量が $\widehat\lambda_n=\overline X_n$ であることを示せ。
2. 1観測あたりのFisher情報量 $I(\lambda)$ を求めよ。
3. 中心極限定理から $\sqrt n(\widehat\lambda_n-\lambda_0)$ の極限分布を求め、分散が $I(\lambda_0)^{-1}$ と一致することを確認せよ。

<!-- solution-start -->
#### 詳細解答

対数尤度は定数項を除いて

$$
\ell_n(\lambda)
=\left(\sum_iX_i\right)\log\lambda-n\lambda.
$$

したがって

$$
\ell_n'(\lambda)
=\frac{\sum_iX_i}{\lambda}-n,
$$

より $\widehat\lambda_n=\bar X_n$。1観測のscoreは $s_\lambda(X)=X/\lambda-1=(X-\lambda)/\lambda$ なので

$$
I(\lambda)
=\operatorname{Var}(X)/\lambda^2
=\frac1\lambda.
$$

また $\operatorname{Var}(X)=\lambda_0$ だからCLTより

$$
\sqrt n(\widehat\lambda_n-\lambda_0)
\Rightarrow N(0,\lambda_0).
$$

確かに $I(\lambda_0)^{-1}=\lambda_0$ で一致する。

#### 本番答案

$\ell_n'(\lambda)=\sum_iX_i/\lambda-n$ より $\hat\lambda=\bar X$。$I(\lambda)=\operatorname{Var}(X)/\lambda^2=1/\lambda$。従ってCLTから $\sqrt n(\hat\lambda-\lambda_0)\Rightarrow N(0,\lambda_0)=N(0,I(\lambda_0)^{-1})$。

#### 採点基準（20点）
- MLE: 6点
- scoreとFisher情報量: 7点
- CLT: 5点
- 逆情報量との一致: 2点
<!-- solution-end -->

---

## 次に進む

より座標に依存しにくい正則性である [F0-00P7B QMD・LAN](../F0_00P7B_QMD_LAN/index.md) へ進みます。
