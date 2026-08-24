# Standard 26 Bonferroni・Scheffe多重比較

- 旧No.: 83
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: 表

## 問題

1. $m$ 個の仮説を家族内有意水準 $\alpha$ で検定するとき、Bonferroni法の個別有意水準を述べよ。
2. 4群一元配置ANOVAで、任意のコントラスト $L=\sum_{i=1}^4c_i\mu_i$, $\sum c_i=0$ に対するScheffe同時信頼区間を書け。
3. BonferroniとScheffeがそれぞれ向く状況を説明せよ。

## 詳細解答

Bonferroniでは各検定を

$$
\alpha/m
$$

以下で行えば、和事象の上界からFWERは $\alpha$ 以下。

Scheffe法では推定量 $\hat L=\sum c_i\bar Y_i$ に対し

$$
\hat L
\pm
\sqrt{(g-1)F_{g-1,N-g;1-\alpha}}
\sqrt{MSE\sum_i\frac{c_i^2}{n_i}},
$$

ここで $g=4$。F分位点は数表を使う。

Bonferroniは事前に有限個の比較が決まっているとき簡単で柔軟。Scheffeは全ての線形コントラストを同時保証するため、比較集合が非常に広い場合に適するが保守的になりやすい。

## 本番答案

Bonferroniは個別水準 $\alpha/m$。Scheffeはコントラストの通常SEに $\sqrt{(g-1)F_{g-1,N-g;1-\alpha}}$ を掛けた同時区間。有限個の事前比較はBonferroni、任意コントラスト全体はScheffe。

## 採点基準

- Bonferroni閾値: 5点
- FWER根拠: 4点
- Scheffe区間: 7点
- 使い分け: 4点
