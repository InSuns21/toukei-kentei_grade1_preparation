# Core 47 Monte Carlo標準誤差・必要試行数

- 旧No.: 92
- 演習価値: A
- 難度: B
- 目安時間: 15分
- 手計算監査: ○

## 問題

Monte Carlo推定量

$$
\widehat\theta_n=\frac1n\sum_{i=1}^nW_i
$$

を考える。予備実験から$Var(W_i)\approx9$と見積もられた。

1. $\widehat\theta_n$の標準誤差を$n$で表せ。
2. 標準誤差を$0.03$以下にするために必要な$n$を求めよ。
3. 正規近似95%区間の半幅を$0.06$以下にするために必要な$n$を求めよ。$z_{0.975}=1.96$とする。
4. 両条件を同時に満たす最小$n$を求めよ。

## 詳細解答

$$
SE(\widehat\theta_n)
=\sqrt{\frac9n}
=\boxed{\frac3{\sqrt n}}.
$$

$SE\le0.03$なら

$$
\frac3{\sqrt n}\le0.03
$$

なので

$$
\sqrt n\ge100,
\qquad
\boxed{n\ge10000}.
$$

95%半幅は

$$
1.96\frac3{\sqrt n}.
$$

これを$0.06$以下にすると

$$
\sqrt n\ge\frac{1.96\cdot3}{0.06}=98.
$$

従って

$$
\boxed{n\ge9604}.
$$

両方を満たすには大きい方を採用し

$$
\boxed{n=10000}.
$$

## 本番答案

$$
SE=3/\sqrt n.
$$

$3/\sqrt n\le0.03$より$n\ge10000$。

95%半幅条件は

$$
1.96\cdot3/\sqrt n\le0.06
$$

より$n\ge98^2=9604$。

両条件なら$n\ge10000$。

## 採点基準

- SE: 4点
- SE条件: 6点
- 95%半幅条件: 7点
- 同時条件: 3点
