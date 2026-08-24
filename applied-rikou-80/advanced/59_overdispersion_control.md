# Advanced 59 過分散工程・Poisson–Gamma混合

- 安定ID: `RIKOU-ADVANCED-59`
- 80大問 No.: 59
- 演習価値: B
- 難度: S
- 目安時間: 25〜30分

## 問題

欠点数 $Y$ は条件付きで $Y\mid\Lambda\sim\operatorname{Poisson}(\Lambda)$、工程間で $E\Lambda=\mu$, $\operatorname{Var}(\Lambda)=\tau^2$ とする。

1. $E[Y]$ を求めよ。
2. 全分散公式から $\operatorname{Var}(Y)$ を求めよ。
3. なぜ通常Poisson管理図の限界が狭すぎるか説明せよ。
4. $\mu=4,\tau^2=5$ なら平均と分散を求め、3シグマ型上限を式で求めよ。
5. 過分散の原因を工程変動とモデル誤特定の両面から述べよ。

## 詳細解答

$$
E[Y]=E[E(Y\mid\Lambda)]=\mu.
$$

全分散公式から

$$
\operatorname{Var}(Y)=E[\Lambda]+\operatorname{Var}(\Lambda)=\mu+\tau^2.
$$

Poisson仮定の分散 $\mu$ より大きいため通常限界は狭く、偽警報が増える。数値では平均4、分散9、標準偏差3なので上限は

$$
4+3\cdot3=13.
$$

下限は負なら0へ切る。原因にはロット間異質性、未観測共変量、クラスタリング等がある。

## 本番答案

混合により平均 $\mu$、分散 $\mu+\tau^2$。例では平均4、分散9、3シグマ上限13。Poisson分散=平均を使うと限界が過小になる。

## 採点基準

- 平均: 4点
- 全分散: 6点
- 管理図影響: 4点
- 数値: 3点
- 原因解釈: 3点

25分経過時は全分散公式を必ず明示する。
