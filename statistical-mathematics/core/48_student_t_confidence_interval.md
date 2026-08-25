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

この節の中身は、母分散のカイ二乗信頼区間でも同じ形で使う。

**対称・冪等、平均方向と残差方向への直交射影、スペクトル定理、標準多変量正規の回転不変性、カイ二乗分布までの詳細な導出は、次の共通解説を参照すること。**

[共通解説：正規標本の直交射影・Cochranの定理](../common/normal_sample_projection_cochran.md)

本問で必要な結論をまとめる。

$$
Z=\frac{X-\mu\mathbf1}{\sigma}\sim N_n(0,I_n),
$$

$$
P=\frac1n\mathbf1\mathbf1^T,
\qquad
Q=I-P
$$

とする。$P$ は平均方向、$Q$ は残差方向への直交射影であり、

$$
PQ=0,
\qquad
\operatorname{rank}(P)=1,
\qquad
\operatorname{rank}(Q)=n-1.
$$

正規性と直交分解から

$$
PZ\perp QZ.
$$

$PZ$ は標本平均に対応し、$QZ$ は標本平均からの残差に対応するので

$$
\boxed{\bar X\perp S^2}.
$$

また

$$
\boxed{
\bar X\sim N\left(\mu,\frac{\sigma^2}{n}\right)
}
$$

であり、Cochranの定理から

$$
\boxed{
\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}
}.
$$

正規性がない一般標本では、$\bar X$ と $S^2$ の独立性やこの正確なカイ二乗分布は通常成立しない。

### 2. Studentのt分布

問1より

$$
Z_0=\frac{\bar X-\mu}{\sigma/\sqrt n}\sim N(0,1),
$$

$$
V=\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}
$$

であり、$Z_0\perp V$ である。

**Studentのt分布の定義**は、$Z_0\sim N(0,1)$、$V\sim\chi^2_\nu$ が独立なら

$$
\frac{Z_0}{\sqrt{V/\nu}}\sim t_\nu
$$

というものである。

本問では $\nu=n-1$ であり、

$$
\frac{V}{n-1}
=\frac{S^2}{\sigma^2},
\qquad
\sqrt{\frac{V}{n-1}}=\frac{S}{\sigma}.
$$

したがって

$$
\frac{Z_0}{\sqrt{V/(n-1)}}
=
\frac{
(\bar X-\mu)/(\sigma/\sqrt n)
}{S/\sigma}
=
\frac{\bar X-\mu}{S/\sqrt n}.
$$

よって、ここはt分布の定義をそのまま適用して

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

よって95%信頼区間は $\bar X\pm t_{n-1,0.975}S/\sqrt n$、数値例は約 $(9.854,14.146)$。

## 採点基準

- $\bar X,S^2$の分布・独立性（Cochran条件確認）: 6点
- t分布の導出: 5点
- 一般の信頼区間: 5点
- 数値例: 4点
