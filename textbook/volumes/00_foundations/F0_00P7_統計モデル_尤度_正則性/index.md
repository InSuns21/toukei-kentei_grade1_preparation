# F0-00P7 正則統計モデル・score・Fisher情報

統計モデルを確率測度族 $\{P_\theta\}$ として定義し、共通の支配測度 $\mu$ に対する密度

$$p_\theta=\frac{dP_\theta}{d\mu}$$

から尤度・score・Fisher情報を構成します。ここでは**微分と積分の交換がいつ正当化されるか**までを正則性の中心として扱います。MLEの漸近論はP7A、QMD/LANはP7Bへ分離します。

---

## 1. 統計モデルは確率測度の族

標本空間を $(\mathcal X,\mathcal A)$ とします。

パラメータ集合 $\Theta$ に対して

$$
\boxed{
\mathcal P
=\{P_\theta:\theta\in\Theta\}
}
$$

という確率測度の族を統計モデルと考えます。

「正規分布モデル」なら

$$
\{N(\mu,\sigma^2):(\mu,\sigma^2)\in\Theta\}
$$

という測度族です。

最初からpdfが統計モデルなのではなく、最初にあるのは分布 $P_\theta$ です。

---

## 2. dominated model

ある sigma有限測度 $\mu$ が存在し、全ての $\theta$ について

$$
P_\theta\ll\mu
$$

となるとします。

するとRadon--Nikodym定理から

$$
\boxed{
p_\theta
=\frac{dP_\theta}{d\mu}}
$$

が存在します。

このようなモデルをdominated modelといいます。

連続分布族ではLebesgue測度、離散分布族では数え上げ測度が典型的な支配測度です。

---

## 3. 尤度の正体

観測値 $x$ が得られたとき、

$$
\boxed{
L(\theta;x)=p_\theta(x)
}
$$

を $\theta$ の関数として見たものが尤度です。

つまり

$$
\boxed{
\text{尤度}
=\text{分布のRadon--Nikodym密度を観測点で評価し、}
\theta\text{側から見る}
}
$$

ものです。

支配測度を変えると密度は変わりますが、$\theta$ に依存しない正の因子を掛けただけなら尤度比やMLEは変わりません。

この意味で尤度は「観測点の確率」ではありません。

連続分布では $P_\theta(X=x)=0$ でも尤度は正の値を持てます。

---

## 4. 独立標本の尤度が積になる理由

$X_1,\dots,X_n$ が $P_\theta$ から独立同分布なら、同時分布は

$$
P_\theta^{\otimes n}
$$

です。

支配測度も $\mu^{\otimes n}$ とすれば

$$
\frac{dP_\theta^{\otimes n}}
{d\mu^{\otimes n}}
(x_1,\dots,x_n)
=
\prod_{i=1}^np_\theta(x_i).
$$

したがって

$$
\boxed{
L_n(\theta)
=\prod_{i=1}^np_\theta(X_i)
}
$$

です。

「独立だから尤度を掛ける」は積測度のRadon--Nikodym密度が積になることの特殊形です。

---

## 5. 対数尤度とスコア

対数尤度を

$$
\ell_n(\theta)
=\sum_{i=1}^n\log p_\theta(X_i)
$$

とします。

1標本のスコアを

$$
\boxed{
s_\theta(x)
=\frac{\partial}{\partial\theta}
\log p_\theta(x)
}
$$

とすると、全スコアは

$$
U_n(\theta)
=\frac{\partial\ell_n(\theta)}{\partial\theta}
=\sum_{i=1}^ns_\theta(X_i).
$$

ここから確率論補講P5・P6の「独立な和」の世界へ戻ります。

---

## 6. なぜスコアの期待値は0なのか

密度は正規化されているので

$$
\int p_\theta(x)\,d\mu(x)=1.
$$

もし $\theta$ 微分と積分を交換できれば

$$
0
=
\frac{\partial}{\partial\theta}1
=
\int
\frac{\partial}{\partial\theta}
p_\theta(x)
\,d\mu(x).
$$

一方

$$
\frac{\partial p_\theta}{\partial\theta}
=p_\theta
\frac{\partial}{\partial\theta}\log p_\theta.
$$

したがって

$$
\boxed{
E_\theta[s_\theta(X)]=0
}
$$

です。

重要なのは、これは代数だけでは出ないことです。

$$
\boxed{
\frac{d}{d\theta}\int p_\theta\,d\mu
=
\int\frac{\partial p_\theta}{\partial\theta}\,d\mu
}
$$

という交換を正当化する必要があります。

---

## 7. 微分積分交換を保証する典型条件

例えば $\theta_0$ の近傍で

1. $p_\theta(x)$ がほとんど全ての $x$ で $\theta$ 微分可能
2. ある可積分関数 $g(x)$ が存在し

$$
\left|
\frac{\partial}{\partial\theta}p_\theta(x)
\right|
\le g(x)
$$

3. 支持集合が $\theta$ に依存して動かない

といった条件があれば、優収束定理型の議論で交換を正当化できます。

これが「正則性条件」の具体的な仕事の一つです。

---

## 8. Fisher情報量の二つの表現

スコアの分散を

$$
\boxed{
I(\theta)
=E_\theta[s_\theta(X)^2]
}
$$

とします。

スコアの平均が0ならこれはそのまま分散です。

さらに二階微分についても積分交換できるとします。

恒等式

$$
\frac{\partial^2}{\partial\theta^2}\log p_\theta
=
\frac{p_\theta''}{p_\theta}
-
\left(\frac{p_\theta'}{p_\theta}\right)^2
$$

を $P_\theta$ で積分すると

$$
E_\theta[\ell_\theta''(X)]
=
\int p_\theta''\,d\mu
-
E_\theta[s_\theta(X)^2].
$$

正規化条件を二回微分できれば

$$
\int p_\theta''\,d\mu=0.
$$

したがって

$$
\boxed{
I(\theta)
=-E_\theta\left[
\frac{\partial^2}{\partial\theta^2}
\log p_\theta(X)
\right]
}
$$

です。

二つのFisher情報量公式が一致するにも正則性条件が必要です。

---

## 9. 正則性が壊れる例：一様分布

$$
X\sim\operatorname{Unif}(0,\theta),
\qquad\theta>0
$$

とします。

密度は

$$
p_\theta(x)
=\frac1\theta
1_{(0,\theta)}(x).
$$

支持集合 $(0,\theta)$ が $\theta$ とともに動きます。

支持内部だけ見て

$$
\frac{\partial}{\partial\theta}\log p_\theta(x)
=-\frac1\theta
$$

と計算すると

$$
E_\theta[s_\theta(X)]
=-\frac1\theta
\ne0.
$$

スコア期待値0の公式が壊れました。

原因は

$$
\frac{d}{d\theta}
\int_0^\theta\frac1\theta\,dx
$$

で積分区間の端点も動くのに、その境界項を無視したからです。

したがって

> スコアの期待値はいつでも0

ではありません。

---

## 10. 正則性条件は証明のチェックリスト

正則モデルで典型的に確認したいのは次です。

- 真値 $\theta_0$ がパラメータ空間の内点
- 共通の支配測度がある
- 支持集合が局所的に固定される
- $\log p_\theta(x)$ が十分滑らか
- 微分と積分・期待値を交換できる支配条件がある
- Fisher情報量が有限で正
- 対数尤度の平均が一意な極大を真値で持つ
- Hessianの標本平均に大数則を適用できる
- スコアに中心極限定理を適用できる

定理によって必要条件は異なります。

したがって「正則性条件」という単一の固定リストがあるわけではありません。

---

## 演習

### F0-00P7-A01 BernoulliモデルのscoreとFisher情報

- Level: A
- 目安時間: 12分

$X\sim\mathrm{Bernoulli}(p)$, $0<p<1$。1観測のscoreとFisher情報を求めよ。

<!-- solution-start -->
#### 詳細解答
$\ell=p$ の対数尤度は $x\log p+(1-x)\log(1-p)$。scoreは $x/p-(1-x)/(1-p)=(x-p)/(p(1-p))$。分散を取れば $I(p)=1/[p(1-p)]$。

#### 本番答案
$s_p(X)=(X-p)/(p(1-p))$, $I(p)=1/(p(1-p))$。

#### 採点基準（20点）
- log likelihood: 5点
- score: 8点
- Fisher情報: 7点
<!-- solution-end -->

### F0-00P7-B01 Uniformモデルが正則でない理由

- Level: B
- 目安時間: 15分

$X\sim\mathrm{Unif}(0,\theta)$ が通常のscore恒等式 $E_\theta[s_\theta(X)]=0$ の議論から外れる理由を説明せよ。

<!-- solution-start -->
#### 詳細解答
密度のsupport $(0,\theta)$ 自体がθで変わるため、$\partial_\theta\int p_\theta d\mu$ を単純に積分内微分できない。境界移動の寄与を無視すると誤る。従って共通supportやdomination/微分交換を含む正則性条件が破れる。

#### 本番答案
supportがθ依存なので微分と積分の交換に境界項が生じ、通常のscore平均0の正則導出が使えない。

#### 採点基準（20点）
- support依存: 8点
- 微分積分交換: 7点
- 正則性への結論: 5点
<!-- solution-end -->

---

## 次に進む

正則性を仮定してMLEの一致性・漸近正規性を組み立てる [F0-00P7A](../F0_00P7A_MLE_一致性_漸近正規性/index.md) へ進みます。局所実験の幾何へ直接進むならP7Bへ分岐できます。
