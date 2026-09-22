# F0-00MC1 Encore V：Monte Carlo積分・LLN・CLT・誤差評価

Monte Carlo法の基本は非常に単純です。

積分を期待値として書き

$$
I=E[g(X)]
$$

独立標本 $X_1,\dots,X_N$ から

$$
\boxed{
\widehat I_N
=\frac1N\sum_{i=1}^Ng(X_i)
}
$$

で近似します。

しかし、この単純な式の背後には大数則・中心極限定理・分散評価があります。

---

## 1. 積分を期待値へ変える

密度 $p$ に従う $X$ について

$$
E[g(X)]
=\int g(x)p(x)dx.
$$

したがって数値積分問題を確率変数の平均推定問題へ変換できます。

一様分布 $U\sim\operatorname{Unif}([0,1]^d)$ なら

$$
\int_{[0,1]^d}g(x)dx=E[g(U)].
$$

---

## 2. Monte Carlo estimator

$$
Y_i=g(X_i)
$$

と置けば

$$
\widehat I_N=\overline Y_N.
$$

つまりMonte Carlo積分は標本平均そのものです。

---

## 3. unbiasedness

$E|Y|<\infty$ なら

$$
E[\widehat I_N]
=I.
$$

したがって基本Monte Carlo estimatorは不偏です。

---

## 4. variance

独立同分布で $\operatorname{Var}(Y)=\sigma^2<\infty$ なら

$$
\boxed{
\operatorname{Var}(\widehat I_N)
=\frac{\sigma^2}{N}
}
$$

です。

root mean square errorは

$$
\boxed{\operatorname{RMSE}=\frac{\sigma}{\sqrt N}}
$$

です。

誤差を半分にするには標本数を4倍にする必要があります。

---

## 5. strong law

F0-00P5の強大数則から

$$
\boxed{
\widehat I_N\to I\quad a.s.
}
$$

です。

Monte Carlo法のconsistencyは確率論の大数則そのものです。

---

## 6. CLT

有限分散なら

$$
\boxed{
\sqrt N(\widehat I_N-I)
\Rightarrow N(0,\sigma^2)
}
$$

です。

したがって標準誤差は

$$
\operatorname{SE}(\widehat I_N)
\approx\frac{s_N}{\sqrt N}
$$

と推定できます。

---

## 7. Monte Carlo confidence interval

大標本では概ね

$$
\boxed{
\widehat I_N
\pm
z_{1-\alpha/2}\frac{s_N}{\sqrt N}
}
$$

という区間を作れます。

Monte Carlo出力には点推定だけでなく、sampling errorの推定値も添えるべきです。

---

## 8. 次元に直接依存しない基本率

単純Monte Carloの $N^{-1/2}$ 率そのものには次元 $d$ が直接入りません。

一方、各軸を $m$ 分割する格子型積分では点数が

$$
m^d
$$

になります。

これが高次元積分でMonte Carloが強い理由の一つです。

ただし分散 $\sigma^2$ 自体は次元と問題構造に依存します。

「次元の呪いが完全に消える」という意味ではありません。

---

## 9. 円周率の例

$(U_i,V_i)$ を単位正方形上の一様乱数として

$$
Y_i=1_{\{U_i^2+V_i^2\le1\}}
$$

とすれば

$$
E[Y_i]=\frac\pi4.
$$

したがって

$$
\widehat\pi_N
=4\frac1N\sum_iY_i
$$

で推定できます。

教育例としては分かりやすいですが、円周率を計算する実用的方法としては効率的ではありません。

---

## 10. pseudorandom number

実装では真の独立乱数ではなく疑似乱数生成器を使うことが多いです。

重要なのは

- seedによる再現性
- 周期
- 高次元での相関構造
- 並列実行時のstream管理

です。

「乱数だから再現できない」ではなく、科学計算ではseedと生成器を記録します。

---

## 11. biasがあるMonte Carlo

後でSDEを離散化すると

$$
E[g(X_T)]
$$

の代わりに離散近似 $X_T^h$ を使うため

$$
E[g(X_T^h)]-E[g(X_T)]
$$

というdiscretization biasが生じます。

すると総誤差は

$$
\boxed{
\text{total error}
=
\text{discretization bias}
+
\text{sampling error}
}
$$

になります。

random PDEでも同じ分解が現れます。

---

## 12. fixed workで何を改善するか

単純MCでは分散が支配的です。

したがって同じ計算予算で精度を上げるには

- estimatorの分散を下げる
- 1 sampleの計算を安くする
- 複数resolutionを組み合わせる

ことを考えます。

次章のvariance reductionと最後のMLMCがこの発想です。

---

## 章末チェック

- 積分を期待値として表現できる。
- Monte Carlo estimatorの不偏性と分散を導ける。
- LLNをMonte Carloの一致性として説明できる。
- CLTから標準誤差と近似信頼区間を作れる。
- $N^{-1/2}$ 収束率の意味を説明できる。
- 高次元でMonte Carloが使われる理由を説明できる。
- sampling errorとdiscretization biasを区別できる。
