# Advanced 59 過分散工程・Poisson–Gamma混合

- 安定ID: `RIKOU-ADVANCED-59`
- 80大問 No.: 59
- 演習価値: B
- 難度: S
- 目安時間: 20〜25分

## 問題

欠点数 $Y$ は条件付きで $Y\mid\Lambda\sim\operatorname{Poisson}(\Lambda)$、工程間で $E\Lambda=\mu$, $\operatorname{Var}(\Lambda)=\tau^2$ とする。

1. $E[Y]$ を求めよ。
2. 全分散公式から $\operatorname{Var}(Y)$ を求めよ。
3. 標本平均 $\bar y$ と標本分散 $s_y^2$ から $\tau^2$ のモーメント推定量を作れ。
4. なぜ通常Poisson管理図の限界が狭すぎるか説明せよ。
5. $\mu=4,\tau^2=5$ なら平均と分散を求め、3シグマ型上限を求めよ。
6. 過分散の原因を工程変動とモデル誤特定の両面から述べよ。

## 詳細解答

$$
E[Y]=\mu,
$$

$$
\operatorname{Var}(Y)=E[\Lambda]+\operatorname{Var}(\Lambda)=\mu+\tau^2.
$$

よってモーメント法では

$$
\hat\tau^2=\max(0,s_y^2-\bar y)
$$

とするのが自然。Poisson仮定の分散 $\mu$ より大きいため通常限界は狭く偽警報が増える。数値では平均4、分散9、標準偏差3なので上限13。原因にはロット間異質性、未観測共変量、クラスタリング等がある。

## 本番答案

混合により平均 $\mu$、分散 $\mu+\tau^2$。$\hat\tau^2=(s_y^2-\bar y)_+$。例では平均4、分散9、上限13。通常Poisson図は過分散時に偽警報を増やす。

## 採点基準

- 平均: 3点
- 全分散: 5点
- 分散成分推定: 4点
- 管理図影響: 3点
- 数値: 3点
- 原因: 2点

20分経過時は全分散と $s^2-\bar y$ を確保する。
