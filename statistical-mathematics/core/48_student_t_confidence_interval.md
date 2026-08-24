# Core 13 Student化とt信頼区間

- 旧No.: 48
- 演習価値: S
- 難度: A
- 目安時間: 20分
- 手計算監査: 表・○

## 問題

$X_1,\ldots,X_n\overset{\mathrm{iid}}\sim N(\mu,\sigma^2)$ とし、$\mu,\sigma^2$は未知とする。

1. $\bar X$と$S^2$の分布、および独立性を述べよ。
2. Student化した統計量

$$
T=\frac{\bar X-\mu}{S/\sqrt n}
$$

の分布を求めよ。
3. $\mu$の$100(1-\alpha)\%$信頼区間を導け。
4. $n=10,\bar x=12,s=3$、$t_{9,0.975}=2.262$のとき95%信頼区間を求めよ。

## 詳細解答

正規標本では

$$
\bar X\sim N\left(\mu,\frac{\sigma^2}{n}\right),
$$

$$
\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1},
$$

かつ$\bar X$と$S^2$は独立である。

したがって

$$
Z=\frac{\bar X-\mu}{\sigma/\sqrt n}\sim N(0,1)
$$

と独立な

$$
V=\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}
$$

を用いて

$$
T=\frac{Z}{\sqrt{V/(n-1)}}\sim t_{n-1}.
$$

よって

$$
P\left(
-t_{n-1,1-\alpha/2}
\le
\frac{\bar X-\mu}{S/\sqrt n}
\le
t_{n-1,1-\alpha/2}
\right)=1-\alpha.
$$

整理すると

$$
\boxed{
\bar X\pm t_{n-1,1-\alpha/2}\frac{S}{\sqrt n}
}.
$$

数値例では

$$
12\pm2.262\frac3{\sqrt{10}}
$$

であり、幅は約$2.146$なので

$$
\boxed{(9.854,14.146)}
$$

程度。

## 本番答案

正規標本では

$$
\bar X\perp S^2,
\quad
\frac{\bar X-\mu}{\sigma/\sqrt n}\sim N(0,1),
\quad
\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}.
$$

したがって

$$
\frac{\bar X-\mu}{S/\sqrt n}\sim t_{n-1}.
$$

95%CIは

$$
\bar X\pm t_{n-1,0.975}\frac S{\sqrt n}.
$$

数値例では

$$
12\pm2.262\frac3{\sqrt{10}}\approx(9.854,14.146).
$$

## 採点基準

- $\bar X,S^2$の分布・独立性: 6点
- t分布の導出: 5点
- 一般の信頼区間: 5点
- 数値例: 4点
