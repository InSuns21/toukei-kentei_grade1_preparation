# Standard 31 Box–Muller変換

- 旧No.: 91
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎・修正済（$\log,\sin,\cos$ の数値評価不要）

## 問題

$U_1,U_2\overset{iid}\sim U(0,1)$ とする。2次元標準正規密度を極座標変換して、独立標準正規 $Z_1,Z_2$ を生成するBox–Muller式を導け。

## 詳細解答

独立標準正規の同時密度は

$$
f(z_1,z_2)=\frac1{2\pi}\exp\left(-\frac{z_1^2+z_2^2}{2}\right).
$$

極座標 $z_1=r\cos\theta$, $z_2=r\sin\theta$、Jacobian $r$ を用いると

$$
f_{R,\Theta}(r,\theta)=\frac1{2\pi}re^{-r^2/2}.
$$

従って $\Theta\sim U(0,2\pi)$、また

$$
P(R\le r)=1-e^{-r^2/2}.
$$

逆関数法より

$$
R=\sqrt{-2\log U_1},
\qquad
\Theta=2\pi U_2.
$$

したがって

$$
\boxed{Z_1=\sqrt{-2\log U_1}\cos(2\pi U_2)},
$$

$$
\boxed{Z_2=\sqrt{-2\log U_1}\sin(2\pi U_2)}.
$$

関数値の数値計算は乱数生成器側の処理であり、答案では導出まででよい。

## 本番答案

2次元正規を極座標化すると $f_{R,\Theta}=re^{-r^2/2}/(2\pi)$。よって $R^2\sim\chi_2^2$、$\Theta\sim U(0,2\pi)$ 独立。逆関数法から

$$
R=\sqrt{-2\log U_1},\quad\Theta=2\pi U_2
$$

を得て $Z_1=R\cos\Theta$, $Z_2=R\sin\Theta$。

## 採点基準

- 極座標変換: 6点
- $R,\Theta$ の分布: 6点
- 逆関数法: 4点
- Box–Muller式: 4点
