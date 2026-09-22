# F0-00MC2 Encore V：分散削減・importance sampling・control variate

単純Monte CarloのRMSEは

$$
\frac{\sigma}{\sqrt N}
$$

です。

$N^{-1/2}$ 自体を簡単に変えられないなら、同じ $N$ で $\sigma^2$ を小さくすることを考えます。

---

## 1. antithetic variates

$U\sim\operatorname{Unif}(0,1)$ なら $1-U$ も同じ分布です。

$$
Y=\frac{g(U)+g(1-U)}2
$$

とすると

$$
E[Y]=E[g(U)].
$$

$g(U)$ と $g(1-U)$ が負に相関すれば分散が下がります。

---

## 2. control variate

$E[C]=\mu_C$ が既知で、$Y$ と強く相関する $C$ を使い

$$
\boxed{
Y_c=Y-\beta(C-\mu_C)
}
$$

とします。

期待値は変わりません。

分散は

$$
\operatorname{Var}(Y_c)
=
\operatorname{Var}(Y)
+\beta^2\operatorname{Var}(C)
-2\beta\operatorname{Cov}(Y,C).
$$

最適係数は

$$
\boxed{
\beta^*
=
\frac{\operatorname{Cov}(Y,C)}
{\operatorname{Var}(C)}
}
$$

です。

---

## 3. 回帰としてのcontrol variate

control variateは

> $Y$ のうち $C$ で説明できる部分を引き、残差だけMonte Carloする

と読めます。

統計学の回帰・Hilbert空間の射影と同じ構造です。

---

## 4. stratified sampling

積分領域を層 $A_1,\dots,A_K$ に分け

$$
E[Y]
=
\sum_kP(A_k)E[Y\mid A_k]
$$

を各層で別々に推定します。

層内分散が小さければ単純無作為抽出より効率的です。

S1の層化抽出がMonte Carlo数値積分へ戻ってきます。

---

## 5. importance sampling

求めたい積分を

$$
I=\int g(x)p(x)dx
$$

とします。

$p$ から直接標本を取る代わりに、$q(x)>0$ on supportから取り

$$
\boxed{
I
=E_q\left[
g(X)\frac{p(X)}{q(X)}
\right]
}
$$

とします。

重み

$$
w(x)=\frac{p(x)}{q(x)}
$$

で補正します。

---

## 6. importance distributionの設計

理想的には $|g|p$ が大きい領域を $q$ が多く標本化するべきです。

特にrare-event probability

$$
P_p(A)=E_p[1_A]
$$

では、元の分布で $A$ がほとんど起きないと単純MCは大量の0を生成します。

$q$ をevent側へ傾けることで劇的に分散を下げられる場合があります。

---

## 7. importance samplingは失敗もする

重み $p/q$ が極端に大きくなると分散がむしろ爆発します。

特に

$$
E_q\left[
\left(g(X)\frac{p(X)}{q(X)}\right)^2
\right]=\infty
$$

なら通常のCLTすら使えない可能性があります。

proposal $q$ はsupportとtailを慎重に設計する必要があります。

---

## 8. self-normalized importance sampling

正規化定数が未知な密度

$$
p(x)\propto\widetilde p(x)
$$

では

$$
\widehat I
=
\frac{\sum_iw_i g(X_i)}
{\sum_iw_i}
$$

を使うことがあります。

一般に有限標本では不偏ではありませんが、適切な条件で一致します。

---

## 9. common random numbers

二つの方法の差

$$
E[Y^{(1)}-Y^{(2)}]
$$

を比較するとき、独立乱数ではなく同じ基礎乱数を共有させると差の分散を下げられる場合があります。

これは後のMLMCで重要になります。

---

## 10. quasi-Monte Carloへの入口

乱数ではなく低 discrepancy 点列を使って $[0,1]^d$ を均等に埋めるquasi-Monte Carloもあります。

滑らかさと次元構造がよければ $N^{-1/2}$ より速い収束を期待できますが、古典Monte Carloとは理論が異なります。

Encore Vでは入口までに留めます。

---

## 章末チェック

- antithetic variateの不偏性を説明できる。
- control variateの最適係数を導ける。
- control variateを回帰として読める。
- stratificationによる分散削減を説明できる。
- importance sampling恒等式を導ける。
- rare-eventでimportance samplingが有効な理由を説明できる。
- importance weightの分散爆発リスクを説明できる。
