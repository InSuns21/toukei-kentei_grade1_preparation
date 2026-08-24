# Core 38 カイ二乗MGF・再生性・Beta接続

- 旧No.: 04
- 演習価値: A
- 難度: B
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$X\sim\chi^2_{\nu_1}$、$Y\sim\chi^2_{\nu_2}$を独立とする。

1. $\chi^2_\nu$のMGFを求めよ。
2. $X+Y$の分布をMGFから求めよ。
3. $T=X+Y$、$U=X/(X+Y)$とするとき$T,U$の分布と独立性を求めよ。
4. $E[U]$を求めよ。

## 詳細解答

$\chi^2_\nu$は$\Gamma(\nu/2,1/2)$だから

$$
\boxed{
M_X(t)=(1-2t)^{-\nu/2},\qquad t<1/2
}.
$$

独立性より

$$
M_{X+Y}(t)
=(1-2t)^{-\nu_1/2}(1-2t)^{-\nu_2/2}
=(1-2t)^{-(\nu_1+\nu_2)/2}.
$$

従って

$$
\boxed{X+Y\sim\chi^2_{\nu_1+\nu_2}}.
$$

Gamma–Beta関係から

$$
\boxed{
T\sim\chi^2_{\nu_1+\nu_2},
\qquad
U\sim Beta\left(\frac{\nu_1}{2},\frac{\nu_2}{2}\right),
\qquad
T\perp U
}.
$$

従って

$$
\boxed{E[U]=\frac{\nu_1}{\nu_1+\nu_2}}.
$$

## 本番答案

$$
M_{\chi^2_\nu}(t)=(1-2t)^{-\nu/2}.
$$

MGFの積より$X+Y\sim\chi^2_{\nu_1+\nu_2}$。

さらにGamma–Beta変換から

$$
\frac{X}{X+Y}\sim Beta(\nu_1/2,\nu_2/2)
$$

で、$X+Y$と独立。平均は$\nu_1/(\nu_1+\nu_2)$。

## 採点基準

- MGF: 5点
- 再生性: 5点
- Beta接続・独立性: 7点
- 平均: 3点
