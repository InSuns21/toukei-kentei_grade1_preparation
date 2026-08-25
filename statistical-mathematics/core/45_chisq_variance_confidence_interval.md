# Core 14 カイ二乗ピボットによる分散・標準偏差信頼区間

- 旧No.: 45
- 演習価値: S
- 難度: A
- 目安時間: 20分
- 手計算監査: 表・○

## 問題

$X_i\overset{\mathrm{iid}}\sim N(\mu,\sigma^2)$ とする。$n=16,s^2=4$が得られた。

1. $\sigma^2$に関するピボットを示せ。
2. $\sigma^2$の95%信頼区間を導け。
3. $\chi^2_{15,0.975}=27.488$、$\chi^2_{15,0.025}=6.262$として数値区間を求めよ。
4. $\sigma$の95%信頼区間も求めよ。

## 詳細解答

### 1. Cochranの定理とピボット

使うのは **Cochran の定理**である。正規ベクトルを互いに直交する射影成分へ分解すると、対応する平方和は独立なカイ二乗分布になる。

本問で

$$
Z=\frac{X-\mu\mathbf1}{\sigma}\sim N_n(0,I_n)
$$

とし、

$$
P=\frac1n\mathbf1\mathbf1^T,
\qquad Q=I-P
$$

と置く。$Q$ は

$$
Q^T=Q,
\qquad Q^2=Q,
\qquad \operatorname{rank}(Q)=n-1
$$

を満たす直交射影である。正規性が仮定されているのでCochranの定理の条件を満たし、

$$
Z^TQZ\sim\chi^2_{n-1}.
$$

一方

$$
Z^TQZ
=\frac1{\sigma^2}\sum_{i=1}^n(X_i-\bar X)^2
=\frac{(n-1)S^2}{\sigma^2}.
$$

従って

$$
\boxed{\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}}.
$$

ここで正規性は本質的であり、一般の独立同分布標本ではこの正確なカイ二乗分布は保証されない。

### 2. 分散の信頼区間

$$
P\left(
\chi^2_{n-1,\alpha/2}
\le
\frac{(n-1)S^2}{\sigma^2}
\le
\chi^2_{n-1,1-\alpha/2}
\right)=1-\alpha.
$$

$\sigma^2>0$ に注意して逆数を取ると不等号の向きが反転するので

$$
\boxed{
\frac{(n-1)S^2}{\chi^2_{n-1,1-\alpha/2}}
\le\sigma^2\le
\frac{(n-1)S^2}{\chi^2_{n-1,\alpha/2}}
}.
$$

### 3. 数値区間

$(n-1)s^2=15\cdot4=60$ なので

$$
\boxed{
\frac{60}{27.488}
\le\sigma^2\le
\frac{60}{6.262}
}
$$

で、概ね

$$
2.18\le\sigma^2\le9.58.
$$

### 4. 標準偏差

平方根は正の範囲で単調増加なので、区間端点の平方根を取って

$$
\boxed{
\sqrt{60/27.488}
\le\sigma\le
\sqrt{60/6.262}
}
$$

概ね $(1.48,3.10)$。

## 本番答案

正規標本なので $Z=(X-\mu\mathbf1)/\sigma\sim N_n(0,I)$。$Q=I-\mathbf1\mathbf1^T/n$ は対称冪等、ランク $n-1$ の射影であるから **Cochranの定理**を適用でき、

$$
\frac{(n-1)S^2}{\sigma^2}=Z^TQZ\sim\chi^2_{n-1}.
$$

したがって95%信頼区間は

$$
\left[
\frac{60}{27.488},
\frac{60}{6.262}
\right]
\approx(2.18,9.58).
$$

$\sigma$の区間は端点の平方根を取り約 $(1.48,3.10)$。

## 採点基準

- ピボット（Cochran定理・条件確認）: 5点
- 一般の分散信頼区間: 6点
- 数値代入: 5点
- 標準偏差信頼区間: 4点
