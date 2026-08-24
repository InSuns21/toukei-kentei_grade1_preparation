# Standard 72 Poisson回帰・対数リンク

- 安定ID: `RIKOU-STANDARD-72`
- 80大問 No.: 72
- 演習価値: A
- 難度: A
- 目安時間: 25〜30分
- 電卓: $e^x$ の数値化不要

## 問題

独立な $Y_i\sim\operatorname{Poisson}(\mu_i)$ に対し

$$
\log\mu_i=\beta_0+\beta_1x_i
$$

とする。

1. 対数尤度を定数項を除いて書け。
2. $\beta$ のスコア方程式を行列表現で書け。
3. $\beta_1$ の解釈を率比で述べよ。
4. exposure $t_i$ が異なるときoffsetをどう入れるか。
5. 過分散があるとPoisson標準誤差が過小になる理由を述べよ。

## 詳細解答

$$
\ell(\beta)=\sum_i\{y_ix_i^\top\beta-e^{x_i^\top\beta}\}+C.
$$

ベクトル $\mu$ を用いると

$$
U(\beta)=X^\top(y-\mu)=0.
$$

$x$ が1増えると平均は $e^{\beta_1}$ 倍。exposureがあるなら

$$
\log\mu_i=\log t_i+\beta_0+\beta_1x_i,
$$

として $\log t_i$ を係数1固定のoffsetにする。Poissonでは分散=平均だが、実際の分散が大きければモデル情報量が過大評価され標準誤差が小さく出る。

## 本番答案

$\ell=\sum(y_i\eta_i-e^{\eta_i})+C$、$U=X^\top(y-\mu)$。$e^{\beta_1}$ は1単位増加あたりの平均率比。exposureは $\log t_i$ をoffsetにする。

## 採点基準

- 尤度: 5点
- スコア: 5点
- 係数解釈: 4点
- offset: 3点
- 過分散: 3点

25分経過時は $U=X^\top(y-\mu)$ を確保する。
