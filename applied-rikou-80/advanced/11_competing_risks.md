# Advanced 11 競合リスク・複数故障モード

- 安定ID: `RIKOU-ADVANCED-11`
- 80大問 No.: 11
- 演習価値: B
- 難度: A
- 目安時間: 25〜30分
- 電卓: 指数関数の数値化不要

## 問題

独立な故障モード寿命 $T_1\sim\operatorname{Exp}(\lambda_1)$, $T_2\sim\operatorname{Exp}(\lambda_2)$ とし、観測寿命を $T=\min(T_1,T_2)$、故障原因を $J$ とする。

1. $T$ の分布を求めよ。
2. $P(J=1)$ を求めよ。
3. $P(T>t,J=1)$ ではなく、原因1による累積発生確率 $P(T\le t,J=1)$ を求めよ。
4. $T$ と $J$ が独立か確認せよ。
5. 競合モードを無視して原因1だけを通常の生存分析で扱う危険を説明せよ。

## 詳細解答

$$
P(T>t)=e^{-\lambda_1t}e^{-\lambda_2t}=e^{-(\lambda_1+\lambda_2)t},
$$

よって $T\sim\operatorname{Exp}(\lambda_1+\lambda_2)$。原因1で最初に故障する確率は

$$
P(J=1)=\int_0^\infty \lambda_1e^{-(\lambda_1+\lambda_2)t}\,dt
=\frac{\lambda_1}{\lambda_1+\lambda_2}.
$$

累積発生確率は

$$
P(T\le t,J=1)=\frac{\lambda_1}{\lambda_1+\lambda_2}\{1-e^{-(\lambda_1+\lambda_2)t}\}.
$$

さらに $P(J=1\mid T=t)=\lambda_1/(\lambda_1+\lambda_2)$ なので指数・独立モデルでは $T$ と $J$ は独立。一般の競合リスクでは他原因故障を単純打ち切りとして扱うと原因別累積発生を過大評価し得る。

## 本番答案

$T\sim\operatorname{Exp}(\lambda_1+\lambda_2)$、$P(J=1)=\lambda_1/(\lambda_1+\lambda_2)$。原因1累積発生はその比に $1-e^{-(\lambda_1+\lambda_2)t}$ を掛ける。本モデルでは原因と時刻は独立。

## 採点基準

- 最小寿命: 5点
- 原因確率: 5点
- 累積発生: 5点
- 独立性: 3点
- 解釈: 2点

25分経過時は「最小」と「原因別累積発生」を混同しない。
