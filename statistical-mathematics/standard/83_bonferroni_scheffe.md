# Standard 26 Bonferroni・Scheffe多重比較

- 旧No.: 83
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: 表

## 問題

1. $m$ 個の仮説を家族内有意水準 $\alpha$ で検定するとき、Bonferroni法の個別有意水準を、保証の根拠とともに述べよ。
2. 独立な誤差 $\varepsilon_{ij}\overset{\mathrm{iid}}\sim N(0,\sigma^2)$ を持つ4群固定効果一元配置モデルで、任意のコントラスト

$$
L=\sum_{i=1}^4c_i\mu_i,
\qquad\sum_i c_i=0
$$

に対するScheffe同時信頼区間を書け。総標本数を $N=\sum_i n_i$ とする。
3. BonferroniとScheffeがそれぞれ向く状況を、必要条件と保証対象の違いも含めて説明せよ。

## 詳細解答

### 1. Bonferroni法

各仮説 $H_i$ について、第1種過誤事象を $A_i$ とする。使うのは **Bonferroniの不等式（union bound）**

$$
P\left(\bigcup_{i=1}^mA_i\right)
\le\sum_{i=1}^mP(A_i)
$$

である。この不等式には $A_i$ 同士の独立性を必要としない。

各検定を個別水準

$$
\boxed{\alpha/m}
$$

以下で行えば

$$
FWER
=P\left(\bigcup_iA_i\right)
\le\sum_i\frac\alpha m
=\alpha.
$$

従って検定統計量同士が相関していてもFWERを制御できる。

### 2. Scheffe法

使うのは **Scheffeの同時推測定理**である。固定効果一元配置の通常の線形モデルで、誤差が独立な $N(0,\sigma^2)$、共通分散を持ち、各群に観測があるとする。このとき

$$
MSE=\frac{SSE}{N-g},
\qquad g=4,
$$

で、正規性と直交射影により誤差平方和から得られる分散推定量を使える。

任意のコントラスト $L=\sum_i c_i\mu_i$、$\sum_i c_i=0$ の推定量は

$$
\widehat L=\sum_i c_i\bar Y_i,
$$

条件付きで

$$
Var(\widehat L)=\sigma^2\sum_i\frac{c_i^2}{n_i}.
$$

Scheffeの定理により、**全てのコントラストを同時に**少なくとも $1-\alpha$ で被覆する区間は

$$
\boxed{
\widehat L
\pm
\sqrt{(g-1)F_{g-1,N-g;1-\alpha}}
\sqrt{MSE\sum_i\frac{c_i^2}{n_i}}
}.
$$

本問では $g=4$ なので係数は

$$
\sqrt{3F_{3,N-4;1-\alpha}}.
$$

F分位点は数表を使う。

### 3. 使い分け

Bonferroniは、事前に有限個の比較が決まっている場合に簡単で柔軟であり、各検定が独立である必要もない。ただし比較数 $m$ が増えると個別水準 $\alpha/m$ が小さくなり保守的になる。

Scheffeは、固定効果正規一元配置モデルのもとで、事前に列挙した有限個だけでなく **任意の線形コントラスト全体**を同時保証したい場合に向く。その広い保証の分だけ、少数比較だけが目的なら保守的になりやすい。

## 本番答案

**Bonferroniの不等式**

$$
P(\cup_iA_i)\le\sum_iP(A_i)
$$

は独立性を仮定しない。よって各検定を $\alpha/m$ で行えば $FWER\le\alpha$。

Scheffeは独立正規・共通分散の固定効果一元配置モデルで、全コントラストを同時保証する。$g=4$ なら

$$
\hat L
\pm
\sqrt{3F_{3,N-4;1-\alpha}}
\sqrt{MSE\sum_i c_i^2/n_i}.
$$

有限個の事前比較はBonferroni、任意コントラスト全体はScheffeが向く。

## 採点基準

- Bonferroni閾値: 4点
- union bound・独立性不要の条件: 5点
- Scheffe区間: 6点
- 正規・等分散条件と使い分け: 5点
