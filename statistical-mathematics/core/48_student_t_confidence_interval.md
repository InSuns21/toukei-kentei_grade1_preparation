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

### 1. 正規標本の射影分解

$X=(X_1,\ldots,X_n)^T$ とし

$$
Z=\frac{X-\mu\mathbf1}{\sigma}\sim N_n(0,I_n).
$$

$$
P=\frac1n\mathbf1\mathbf1^T,
\qquad Q=I-P
$$

と置くと、$P,Q$ は対称冪等で

$$
PQ=0,
\qquad \operatorname{rank}(P)=1,
\qquad \operatorname{rank}(Q)=n-1.
$$

**Cochran の定理**または同値な正規直交射影の結果を使う。必要条件は、元のベクトルが球対称な多変量正規で、射影が直交し、ランクが上の通りであること。本問では全て成立する。

従って $PZ$ と $QZ$ は独立で、

$$
\bar X\sim N\left(\mu,\frac{\sigma^2}{n}\right),
$$

$$
\frac{(n-1)S^2}{\sigma^2}=Z^TQZ\sim\chi^2_{n-1},
$$

かつ

$$
\boxed{\bar X\perp S^2}.
$$

正規性がない一般標本では、$\bar X$ と $S^2$ の独立性や正確なカイ二乗分布は通常成立しない。

### 2. Studentのt分布

$$
Z_0=\frac{\bar X-\mu}{\sigma/\sqrt n}\sim N(0,1),
$$

$$
V=\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}
$$

で、上の独立性から $Z_0\perp V$。

**Studentのt分布の定義**は、$Z_0\sim N(0,1)$、$V\sim\chi^2_\nu$ が独立なら

$$
\frac{Z_0}{\sqrt{V/\nu}}\sim t_\nu
$$

というものである。独立性まで確認済みなので適用でき、

$$
\boxed{
T=\frac{\bar X-\mu}{S/\sqrt n}\sim t_{n-1}
}.
$$

### 3. 信頼区間

$$
P\left(
-t_{n-1,1-\alpha/2}
\le T\le
t_{n-1,1-\alpha/2}
\right)=1-\alpha.
$$

これを $\mu$ について解いて

$$
\boxed{
\bar X\pm t_{n-1,1-\alpha/2}\frac{S}{\sqrt n}
}.
$$

### 4. 数値例

$$
12\pm2.262\frac3{\sqrt{10}}
$$

で、幅は約 $2.146$。したがって

$$
\boxed{(9.854,14.146)}.
$$

## 本番答案

正規標本なので $Z=(X-\mu\mathbf1)/\sigma\sim N_n(0,I)$。平均方向への射影 $P$ と残差方向への射影 $Q=I-P$ は直交し、ランクは $1,n-1$。したがって **Cochranの定理**から

$$
\bar X\perp S^2,
\quad
\frac{\bar X-\mu}{\sigma/\sqrt n}\sim N(0,1),
\quad
\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}.
$$

独立な標準正規とカイ二乗の比という **t分布の定義**から

$$
\frac{\bar X-\mu}{S/\sqrt n}\sim t_{n-1}.
$$

よって95%CIは $\bar X\pm t_{n-1,0.975}S/\sqrt n$、数値例は約 $(9.854,14.146)$。

## 採点基準

- $\bar X,S^2$の分布・独立性（Cochran条件確認）: 6点
- t分布の導出: 5点
- 一般の信頼区間: 5点
- 数値例: 4点
