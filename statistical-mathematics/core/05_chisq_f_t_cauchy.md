# Core 39 カイ二乗・F・t・Cauchyの比と変換

- 旧No.: 05
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$Z\sim N(0,1)$、$V\sim\chi^2_\nu$を独立とし

$$
T=\frac{Z}{\sqrt{V/\nu}}
$$

とする。

1. $T$の分布を答えよ。
2. $T^2$の分布を求めよ。
3. $\nu=1$のとき$T$がCauchy分布になることを説明せよ。
4. 一般の対称な連続変数$T$について$W=T^2$の密度を$f_T$で表せ。

## 詳細解答

定義より

$$
\boxed{T\sim t_\nu}.
$$

$Z^2\sim\chi^2_1$で$V$と独立だから

$$
T^2
=\frac{Z^2/1}{V/\nu}
\sim\boxed{F_{1,\nu}}.
$$

$\nu=1$なら$V=Z_2^2$と表せる。独立な$Z_1,Z_2\sim N(0,1)$を使えば

$$
T=\frac{Z_1}{|Z_2|}
$$

だが符号の対称性を含めると比$Z_1/Z_2$と同分布であり、標準Cauchy分布になる。すなわち$t_1=Cauchy(0,1)$。

$W=T^2$は非単調変換で、$w>0$に対して逆像は$\pm\sqrt w$。従って

$$
\boxed{
f_W(w)
=\frac{f_T(\sqrt w)+f_T(-\sqrt w)}{2\sqrt w}
}.
$$

$f_T$が対称なら

$$
f_W(w)=\frac{f_T(\sqrt w)}{\sqrt w}.
$$

## 本番答案

$$
T\sim t_\nu,
\qquad
T^2=\frac{Z^2/1}{V/\nu}\sim F_{1,\nu}.
$$

$\nu=1$では独立標準正規の比になり$t_1=Cauchy(0,1)$。

$W=T^2$では逆像が$\pm\sqrt w$なので

$$
f_W(w)=\frac{f_T(\sqrt w)+f_T(-\sqrt w)}{2\sqrt w}.
$$

## 採点基準

- t分布: 4点
- F分布: 6点
- Cauchy接続: 5点
- 非単調変換: 5点
