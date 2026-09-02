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

したがって [P6Aの中心極限定理](../F0_00P6A_iid_中心極限定理/index.md) から

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

---

## 次に進む

より座標に依存しにくい正則性である [F0-00P7B QMD・LAN](../F0_00P7B_QMD_LAN/index.md) へ進みます。
