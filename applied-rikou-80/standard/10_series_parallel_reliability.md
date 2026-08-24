# Standard 10 直列・並列システム信頼度

- 安定ID: `RIKOU-STANDARD-10`
- 80大問 No.: 10
- 演習価値: B
- 難度: B
- 目安時間: 20〜25分
- 電卓: 指数関数の数値化不要

## 問題

独立な部品A,Bの寿命がそれぞれ率 $\lambda_A,\lambda_B$ の指数分布に従う。

1. A,Bの両方が動作して初めて機能する直列系の信頼度を求めよ。
2. 直列系寿命の分布とMTTFを求めよ。
3. 直列系が故障したとき、最初の故障原因がAである確率を求めよ。
4. どちらか一方が動けば機能する並列系の信頼度を求めよ。
5. $\lambda_A=\lambda_B=\lambda$ のとき並列系MTTFを求めよ。
6. 独立性が失われると上式をそのまま使えない理由を述べよ。

## 詳細解答

直列系寿命は $\min(T_A,T_B)$ なので

$$
R_s(t)=e^{-(\lambda_A+\lambda_B)t},\qquad MTTF_s=\frac1{\lambda_A+\lambda_B}.
$$

競合指数寿命より最初の故障がAである確率は

$$
\frac{\lambda_A}{\lambda_A+\lambda_B}.
$$

並列系は両方故障したときのみ停止するから

$$
R_p(t)=1-(1-e^{-\lambda_A t})(1-e^{-\lambda_B t}).
$$

同率なら $R_p(t)=2e^{-\lambda t}-e^{-2\lambda t}$ なので

$$
MTTF_p=\int_0^\infty R_p(t)dt=\frac3{2\lambda}.
$$

独立性がない場合、同時生存・同時故障確率を周辺確率の積へ分解できない。

## 本番答案

直列系は $R_s=e^{-(\lambda_A+\lambda_B)t}$、MTTFは $1/(\lambda_A+\lambda_B)$、原因A確率は $\lambda_A/(\lambda_A+\lambda_B)$。並列系は $R_p=1-(1-e^{-\lambda_A t})(1-e^{-\lambda_B t})$、同率ならMTTF $3/(2\lambda)$。

## 採点基準

- 直列信頼度・MTTF: 6点
- 原因確率: 4点
- 並列信頼度: 4点
- 並列MTTF: 4点
- 独立性: 2点

20分経過時は直列=min、並列=max、原因確率を確保する。
