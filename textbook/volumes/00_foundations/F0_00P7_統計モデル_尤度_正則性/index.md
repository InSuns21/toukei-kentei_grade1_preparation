# F0-00P7 統計モデル・尤度・正則性条件：その「正則性の下で」は何をしている？

この章では確率論補講を統計推測へ戻します。

最尤推定の教科書ではしばしば

> 正則性条件の下で、スコアの期待値は0である。

> 正則性条件の下で、最尤推定量は漸近正規である。

と書かれます。

この「正則性条件」は一つの呪文ではありません。

実際には

- 共通の基準測度で密度を書けるか
- 台がパラメータで動かないか
- 微分を積分の中へ入れてよいか
- 大数則を使えるか
- 中心極限定理を使えるか
- Hessianが安定して非退化な極限へ行くか

など、証明の各段階を成立させる条件の集合です。

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

## 11. MLEの漸近正規性はLLNとCLTの合体

真値を $\theta_0$、MLEを $\widehat\theta_n$ とします。

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

## 12. スコア側にはCLT

正則性条件から

$$
E_{\theta_0}[s_{\theta_0}(X)]=0,
$$

$$
\operatorname{Var}_{\theta_0}
(s_{\theta_0}(X))
=I(\theta_0).
$$

したがってP6のCLTから

$$
\boxed{
\frac{U_n(\theta_0)}{\sqrt n}
\xrightarrow{d}
N(0,I(\theta_0))
}
$$

です。

---

## 13. Hessian側には大数則

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

MLEの漸近正規性は

$$
\boxed{
\text{scoreのCLT}
+\text{HessianのLLN}
+\text{Taylor展開}
}
$$

として読めます。

---

## 14. 一致性も別に必要

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

## 15. Kullback--Leibler divergenceが現れる

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

MLE一致性の背後には

$$
\boxed{
\text{大数則}
+\text{KL divergenceの非負性}
}
$$

という構造があります。

---

## 16. より現代的な正則性：quadratic mean differentiability

古典的な「密度を二回微分できる」という条件より、統計実験そのものに近い条件としてquadratic mean differentiabilityがあります。

概略的には、あるスコア $\dot\ell_\theta$ が存在して

$$
\int
\left[
\sqrt{p_{\theta+h}}
-
\sqrt{p_\theta}
-
\frac h2
\dot\ell_\theta\sqrt{p_\theta}
\right]^2d\mu
=o(h^2)
$$

となる条件です。

このときFisher情報量は

$$
I(\theta)
=E_\theta[\dot\ell_\theta^2]
$$

という $L^2(P_\theta)$ ノルムとして現れます。

ここでまた関数解析の $L^2$ が戻ってきます。

---

## 17. LANへの入口

quadratic mean differentiabilityなどの正則性の下では、局所パラメータ

$$
\theta_n
=\theta_0+\frac h{\sqrt n}
$$

に対する対数尤度比が

$$
\log
\frac{dP_{\theta_n}^{\otimes n}}
{dP_{\theta_0}^{\otimes n}}
=
h\Delta_n
-
\frac12h^2I(\theta_0)
+o_p(1)
$$

のように二次近似され、

$$
\Delta_n\xrightarrow{d}N(0,I(\theta_0))
$$

となります。

これをlocal asymptotic normality、LANと呼びます。

漸近統計で正規モデルが普遍的に現れる、より深い理由の一つです。

---

## 18. この補講系列の回収

ここまでの7講は最終的に

$$
\boxed{
\begin{array}{c}
\text{測度}\\
\downarrow\\
\text{確率測度・可測写像}\\
\downarrow\\
\text{分布・密度・期待値}\\
\downarrow\\
\text{条件付き期待値}\\
\downarrow\\
\text{Borel--Cantelli・大数則}\\
\downarrow\\
\text{特性関数・CLT}\\
\downarrow\\
\text{尤度・Fisher情報量・MLE漸近正規性}
\end{array}
}
$$

という一本の流れです。

通常教材で個別公式として使っていた道具が、測度・積分・極限の上に並び直しました。

---

## 章末チェック

- 統計モデルを確率測度族として説明できる。
- 尤度を支配測度に対するRadon--Nikodym密度から説明できる。
- スコア期待値0に微分積分交換が必要な理由を説明できる。
- Fisher情報量の二表現が一致する条件を説明できる。
- 一様分布で通常の正則性が壊れる理由を説明できる。
- MLE漸近正規性をscoreのCLT・HessianのLLN・Taylor展開へ分解できる。
- MLE一致性とKL divergenceの関係を説明できる。
- quadratic mean differentiabilityとLANが何を一般化しているか概説できる。
