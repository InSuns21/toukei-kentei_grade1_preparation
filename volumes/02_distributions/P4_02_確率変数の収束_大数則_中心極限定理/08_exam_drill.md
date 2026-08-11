# 30分ドリル

- id: P4T-DRILL-01
- level: C
- minutes: 30
- total: 100点
- calculation: high
- finishability: 25分でPMF極限とPoisson確率まで完答

## 過去問傾向との対応

MATH-2017-Q1の標本平均モーメント・漸近評価を参考に、二項希少事象を一つの設定で独自に再構成した。

## 問題

$B_n\sim\operatorname{Bin}(n,\lambda/n)$、$\lambda>0$、$n\ge\lceil\lambda\rceil$ とする。

1. $E[B_n],\operatorname{Var}(B_n)$ と極限を求めよ。（20点）
2. 固定 $k$ で $P(B_n=k)$ がPoisson$(\lambda)$のPMFへ収束することを積因子分解で示せ。（20点）
3. $B_n$ の極限分布を述べよ。（20点）
4. $n=80,\lambda=1.5$ で $P(B_n\ge5)$ をPoisson近似せよ。（20点）
5. 有限 $n$ の近似誤差（前後の因子 $\prod_{j=0}^{k-1}(1-j/n)$ と $(1-\lambda/n)^{-k}$ は極限1へ、中因子 $(1-\lambda/n)^n$ は $e^{-\lambda}$ へ近づくが有限 $n$ では一致しないこと）の原因と、15分で撤退する場合に残す式を述べよ。（20点）

## 詳細解答・本番答案

1. $E[B_n]=\lambda,\operatorname{Var}(B_n)=\lambda(1-\lambda/n)\to\lambda$。
2. $$
P(B_n=k)=\frac{\lambda^k}{k!}\prod_{j=0}^{k-1}(1-j/n)(1-\lambda/n)^n(1-\lambda/n)^{-k}
\to e^{-\lambda}\lambda^k/k!.
$$
3. よって $B_n\xrightarrow d\operatorname{Poisson}(\lambda)$。
4. $P(B_n\ge5)\approx1-e^{-1.5}\sum_{k=0}^4 1.5^k/k!\approx0.019$。
5. 有限 $n$ では三因子の極限は順に $1,e^{-\lambda},1$ であり、前後の因子も有限 $n$ では1でない。$n=80,\lambda=1.5$ では exact 二項値 $0.01747$ とPoisson近似 $0.01858$ の差は約 $-0.00110$。15分で1と2の式を残せば主要部分の部分点を確保し、25分で4の数値を追加する。

各小問20点。3分で二項モデル、15分でPMF極限、25分でPoisson確率を完了する。
