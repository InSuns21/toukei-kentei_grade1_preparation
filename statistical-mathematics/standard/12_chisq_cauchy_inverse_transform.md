# Standard 02 カイ二乗・Cauchy・逆関数法

- 旧No.: 12
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎・修正済（逆三角関数の数値評価不要）

## 問題

独立な $Z_1,Z_2\sim N(0,1)$ に対し $X=Z_1/Z_2$ とする。

1. $X$ の分布を求めよ。
2. $W=\arctan X$ の分布を求めよ。
3. $U\sim U(0,1)$ から標準Cauchy乱数を生成する式を求めよ。
4. $Z^2\sim\chi_1^2$ を用いて $t_1$ とCauchyの関係を説明せよ。

## 詳細解答

$X=Z_1/Z_2$ は標準Cauchy分布で

$$
f_X(x)=\frac{1}{\pi(1+x^2)}.
$$

$W=\arctan X$ では $X=\tan W$, $dx/dw=\sec^2w$。従って

$$
f_W(w)=\frac{1}{\pi(1+\tan^2w)}\sec^2w=\frac1\pi,
\qquad -\frac\pi2<w<\frac\pi2.
$$

よって $W\sim U(-\pi/2,\pi/2)$。逆に

$$
\boxed{X=\tan\{\pi(U-1/2)\}}
$$

で標準Cauchy乱数を生成できる。数値的な $\tan$ 評価は設問対象でない。

また $V=Z_2^2\sim\chi_1^2$ とすれば

$$
\frac{Z_1}{\sqrt{V}}
$$

は $t_1$。符号対称性により $Z_1/|Z_2|$ と $Z_1/Z_2$ は同分布なので $t_1$ はCauchy分布である。

## 本番答案

独立標準正規の比は標準Cauchy。$W=\arctan X$ と置けばJacobianにより $f_W(w)=1/\pi$ だから一様分布。従って

$$
X=\tan\{\pi(U-1/2)\}.
$$

さらに $Z_2^2\sim\chi_1^2$ より $t_1=\text{Cauchy}(0,1)$。

## 採点基準

- Cauchy分布: 5点
- $\arctan$ 変換: 6点
- 逆関数法: 5点
- $t_1$ との接続: 4点
