# Standard 46 変量効果・期待平均平方

- 安定ID: `RIKOU-STANDARD-46`
- 80大問 No.: 46
- 演習価値: A
- 難度: A
- 目安時間: 25〜30分

## 問題

一元変量効果モデル

$$
Y_{ij}=\mu+A_i+\varepsilon_{ij},
$$

$i=1,\ldots,a$, $j=1,\ldots,n$、$A_i\sim(0,\sigma_A^2)$、$\varepsilon_{ij}\sim(0,\sigma^2)$、独立とする。

1. 同一群内2観測の共分散を求めよ。
2. 群内相関係数級内相関係数を求めよ。
3. $E[MSE]$ を求めよ。
4. $E[MS_A]=\sigma^2+n\sigma_A^2$ を述べ、分散成分推定量を作れ。
5. 固定効果分散分析との解釈の違いを説明せよ。

## 詳細解答

同一群では共通の $A_i$ を共有するので

$$
\operatorname{Cov}(Y_{ij},Y_{ik})=\sigma_A^2\quad(j\ne k).
$$

全分散は $\sigma_A^2+\sigma^2$ より

$$
ICC=\frac{\sigma_A^2}{\sigma_A^2+\sigma^2}.
$$

期待平均平方は

$$
E[MSE]=\sigma^2,\qquad E[MS_A]=\sigma^2+n\sigma_A^2.
$$

したがってモーメント推定量は

$$
\hat\sigma_A^2=\frac{MS_A-MSE}{n},\qquad \hat\sigma^2=MSE.
$$

固定効果では各 $A_i$ 自体の差を検定するが、変量効果では母集団から抽出された群間ばらつき $\sigma_A^2$ が対象。

## 本番答案

群内共分散 $\sigma_A^2$、級内相関係数 $=\sigma_A^2/(\sigma_A^2+\sigma^2)$。期待平均平方から $\hat\sigma_A^2=(MS_A-MSE)/n$。変量効果の主対象は個別水準差でなく分散成分。

## 採点基準

- 共分散: 4点
- 級内相関係数: 4点
- 期待平均平方: 6点
- 分散成分推定: 4点
- 固定/変量: 2点

25分経過時はEMS2本を中心に答案を組む。
