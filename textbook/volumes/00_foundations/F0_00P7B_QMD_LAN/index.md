# F0-00P7B QMD・LAN：統計モデルの局所Hilbert幾何

古典的な「密度を二回微分できる」という正則性は座標依存で、supportが動く問題にも弱いことがあります。そこで密度そのものではなく **平方根密度を $L^2(\mu)$ の点として微分**します。

---

## 1. 平方根密度は単位球面上にある

$p_\theta=dP_\theta/d\mu$ とすると

$$\|\sqrt{p_\theta}\|_{L^2(\mu)}^2=\int p_\theta d\mu=1.$$

従ってparameterized modelは $L^2(\mu)$ の単位球面上の曲面として見られます。Hellinger距離も平方根密度の $L^2$ 距離から定まります。

---

## 2. Quadratic Mean Differentiability

<a id="def-f0-00p7b-qmd"></a>

<!-- formal-statement-start -->
> **定義（Quadratic Mean Differentiability; QMD）**  
> $\theta\in\mathbb R^d$ で、あるscoreベクトル $s_\theta\in L^2(P_\theta)^d$ が存在して

$$
\int\left(\sqrt{p_{\theta+h}}-\sqrt{p_\theta}-\frac12h^Ts_\theta\sqrt{p_\theta}\right)^2d\mu
=o(\|h\|^2)
$$

> が成り立つとき、統計モデルは $\theta$ で **Quadratic Mean Differentiable（QMD）** であるといいます。
<!-- formal-statement-end -->

これは

$$\sqrt{p_{\theta+h}}=\sqrt{p_\theta}+\text{linear tangent}+o(\|h\|)_{L^2}$$

というFréchet微分型の条件です。

---

## 3. scoreとFisher情報が幾何から戻る

確率密度の正規化を一次展開すると

$$E_\theta[s_\theta]=0.$$

また接ベクトルのGram行列が

$$\boxed{I(\theta)=E_\theta[s_\theta s_\theta^T]}$$

です。つまりFisher情報は、局所parameter方向が平方根密度空間でどれだけ離れるかを測る計量として現れます。

---

## 4. なぜ $1/\sqrt n$ スケールなのか

n個の独立同分布観測では情報がn倍になります。parameter差を固定すると2モデルは急速に識別可能になるため、非自明な局所比較には

$$\theta_n=\theta_0+\frac{h}{\sqrt n}$$

と縮めます。このスケールではscore和

$$\Delta_n=\frac1{\sqrt n}\sum_{i=1}^ns_{\theta_0}(X_i)$$

が有限な揺らぎを持ちます。

---

## 5. central sequenceの中心極限定理とCramér--Wold

scoreがベクトルなので、P6Aの1変量中心極限定理をそのまま一言で「多変量版」と呼ばず、**Cramér--Wold device** で橋を架けます。

### Cramér--Wold device

$Y_n,Y$ が $\mathbb R^d$ 値確率ベクトルのとき

$$
Y_n\Rightarrow Y
\quad\Longleftrightarrow\quad
 a^TY_n\Rightarrow a^TY
\qquad(\forall a\in\mathbb R^d)
$$

です。直感的には、すべての1次元射影の分布が分かれば多変量分布が決まるという定理です。特性関数で見れば

$$
\varphi_{Y_n}(t)=E[e^{it^TY_n}]
$$

は $t^TY_n$ の1変量特性関数を点 $1$ で評価したものなので、P6のLévy連続性定理の多変量版と対応します。

任意の $a\in\mathbb R^d$ について

$$
a^T\Delta_n
=\frac1{\sqrt n}\sum_{i=1}^n a^Ts_{\theta_0}(X_i).
$$

これは平均0、分散 $a^TI(\theta_0)a$ の独立同分布スカラー和なので[P6Aの中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt)から

$$
a^T\Delta_n\Rightarrow N(0,a^TI(\theta_0)a).
$$

Cramér--Woldにより

$$\boxed{\Delta_n\Rightarrow N(0,I(\theta_0))}.$$

ここでGaussianが出るのは「最尤推定量だから」ではなく、局所log likelihoodの一次項が独立同分布 scoreの和だからです。

---

## 6. LAN展開

独立同分布 QMDモデルでは標準条件の下で

$$
\boxed{
\log\frac{dP_{\theta_0+h/\sqrt n}^{\otimes n}}{dP_{\theta_0}^{\otimes n}}
=h^T\Delta_n-\frac12h^TI(\theta_0)h+o_{P_{\theta_0}}(1)
}
$$

が成り立ちます。これが **local asymptotic normality (LAN)** です。

重要なのは、元の観測分布が正規分布である必要はないことです。局所的な統計実験そのものがGaussian shift experimentへ近づきます。

---

## 7. 古典Taylor展開との対応

古典的な滑らかなモデルなら

$$\ell_{\theta+h}(x)-\ell_\theta(x)\approx h^Ts_\theta(x)-\frac12h^TI(\theta)h$$

を観測ごとに足すイメージです。しかしQMDは平方根密度の $L^2$ 微分で remainder を制御するため、単なる点wise Taylorより統計的に安定した定式化です。

---

## 8. LANで何が嬉しいか

LANは

- 最尤推定量や効率推定量の漸近正規性
- Cramér--Rao型下限の漸近版
- Wald / score / likelihood-ratio検定の局所比較
- Le Cam理論の局所実験

を同じGaussian limitへまとめる入口です。

ここではLAN展開の意味と導出構造までを扱い、Le Camの第三補題・convolution theorem・local asymptotic minimax theoremは次の発展層とします。

## 演習

### F0-00P7B-A01 QMDからscore平均0を読む

- Level: A
- 目安時間: 15分

QMD展開 $\sqrt{p_{\theta+h}}=\sqrt{p_\theta}+\frac12h^Ts_\theta\sqrt{p_\theta}+r_h$ と $\int p_{\theta+h}d\mu=1$ を使い、一次項から $E_\theta[s_\theta]=0$ が現れる理由を説明せよ。

<!-- solution-start -->
#### 詳細解答
両辺を二乗して積分し、$\|r_h\|_2=o(\|h\|)$ を使う。確率密度の積分は常に1なのでhの一次項 $h^T\int s_\theta p_\theta d\mu$ は0でなければならない。従ってscore平均0。

#### 本番答案
正規化 $\int p_{\theta+h}=1$ の一次変分が $h^TE_\theta s_\theta$。QMD remainderは高次なので $E_\theta s_\theta=0$。

#### 採点基準（20点）
- QMD展開: 5点
- 正規化: 6点
- 一次項抽出: 6点
- 結論: 3点
<!-- solution-end -->

### F0-00P7B-B01 LANの中心列を同定する

- Level: B
- 目安時間: 18分

独立同分布 QMDモデルで $\theta_n=\theta_0+h/\sqrt n$ とする。LAN展開に現れるcentral sequence $\Delta_n$ とその極限分布を書き、二次項の意味を説明せよ。

<!-- solution-start -->
#### 詳細解答
$\Delta_n=n^{-1/2}\sum_i s_{\theta_0}(X_i)$。score平均0・共分散$I(\theta_0)$なので多変量中心極限定理から $\Delta_n\Rightarrow N(0,I)$。log likelihood ratioは $h^T\Delta_n-\frac12h^TIh+o_P(1)$。二次項は局所的なlog likelihood curvature/情報量を表す。

#### 本番答案
$\Delta_n=n^{-1/2}\sum s_{\theta_0}(X_i)\Rightarrow N(0,I)$、$\log(dP_{\theta_0+h/\sqrt n}^n/dP_{\theta_0}^n)=h^T\Delta_n-\frac12h^TIh+o_P(1)$。

#### 採点基準（20点）
- central sequence: 6点
- 中心極限定理極限: 5点
- LAN式: 6点
- 二次項解釈: 3点
<!-- solution-end -->

---

## 次に進む

これで「測度としての分布」から「局所Gaussian実験」まで一本で接続しました。統計理論本編へ戻るか、Fourier・確率過程・数値計算のEncoreへ分岐できます。
