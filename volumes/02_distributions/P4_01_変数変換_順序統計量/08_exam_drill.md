# 30分ドリル

- 制限時間: 30分
- level: C

## 過去問傾向との対応

MATH-2024-Q5、MATH-2018-Q5、MATH-2024-Q2の「順序統計量、条件付き量、不偏推定、分散比較」の連鎖を校正対象とする。一様分布の設定は標準的だが、数値・設問順・比較する推定量は独自に再構成した。

## P4-DRILL-01 問題

$X_1,\ldots,X_n\overset{\mathrm{i.i.d.}}{\sim}\operatorname{Unif}(0,\theta)$とし、$n\geq2$、$U=X_{(1)}$、$V=X_{(n)}$、$R=V-U$とする。

1. $V$のCDF、密度、期待値を求めよ。（20点）
2. $(U,V)$の同時密度と、$0<u<v<\theta$における$f_{U\mid V}(u\mid v)$を求めよ。（25点）
3. $E[U\mid V=v]$を求め、その値を標本配置から解釈せよ。（10点）
4. $R$の密度、期待値、分散を求めよ。（25点）
5. $T_1=(n+1)V/n$と$T_2=(n+1)R/(n-1)$がともに$\theta$の不偏推定量であることを示し、分散を比較せよ。（20点）

## 詳細解答

$V$のCDFは全実数上で
$$
F_V(v)=
\begin{cases}
0,&v<0,\\
(v/\theta)^n,&0\leq v\leq\theta,\\
1,&v>\theta.
\end{cases}
$$
$0<v<\theta$で$f_V(v)=nv^{n-1}/\theta^n$、台の外では0であり、$E[V]=n\theta/(n+1)$である。
$0<u<v<\theta$で
$$
f_{U,V}(u,v)=\frac{n(n-1)}{\theta^n}(v-u)^{n-2}.
$$
従って
$$
f_{U\mid V}(u\mid v)
=\frac{f_{U,V}(u,v)}{f_V(v)}
=\frac{(n-1)(v-u)^{n-2}}{v^{n-1}},\qquad0<u<v.
$$
正規化は$z=u/v$により
$$
\int_0^v\frac{(n-1)(v-u)^{n-2}}{v^{n-1}}du
=(n-1)\int_0^1(1-z)^{n-2}dz=1.
$$
また
$$
\begin{aligned}
E[U\mid V=v]
&=\int_0^v u\frac{(n-1)(v-u)^{n-2}}{v^{n-1}}du\\
&=v(n-1)\int_0^1z(1-z)^{n-2}dz=\frac vn.
\end{aligned}
$$
$V=v$の下では残り$n-1$個が$(0,v)$の一様標本として配置され、$U$はその最小値なので平均$v/n$となる。

$r=v-u,w=u$と置くとJacobianは1、像は$0<r<\theta$, $0<w<\theta-r$である。従って
$$
f_R(r)=\int_0^{\theta-r}\frac{n(n-1)}{\theta^n}r^{n-2}dw
=\frac{n(n-1)}{\theta^n}r^{n-2}(\theta-r).
$$
$Z=R/\theta$はBeta$(n-1,2)$だから
$$
E[R]=\theta\frac{n-1}{n+1},\qquad
\operatorname{Var}(R)=\theta^2\frac{2(n-1)}{(n+1)^2(n+2)}.
$$
また$V/\theta\sim\operatorname{Beta}(n,1)$なので
$$
\operatorname{Var}(V)=\theta^2\frac{n}{(n+1)^2(n+2)}.
$$
期待値から$T_1,T_2$はともに不偏であり、
$$
\operatorname{Var}(T_1)=\frac{\theta^2}{n(n+2)},\qquad
\operatorname{Var}(T_2)=\frac{2\theta^2}{(n-1)(n+2)}.
$$
比は$2n/(n-1)>1$なので、全ての$n\geq2$で$T_1$の分散が小さい。

## 完成形の本番答案

$$
F_V(v)=
\begin{cases}
0,&v<0,\\
(v/\theta)^n,&0\leq v\leq\theta,\\
1,&v>\theta,
\end{cases}
\quad
f_V(v)=\frac{nv^{n-1}}{\theta^n}\boldsymbol{1}_{(0,\theta)}(v),
\quad E[V]=\frac{n\theta}{n+1}.
$$
$0<u<v<\theta$で
$$
f_{U,V}(u,v)=\frac{n(n-1)}{\theta^n}(v-u)^{n-2},\quad
f_{U\mid V}(u\mid v)=\frac{(n-1)(v-u)^{n-2}}{v^{n-1}}.
$$
$u=vz$で積分すると$E[U\mid V=v]=v/n$。また$r=v-u,w=u$の像は$0<w<\theta-r$なので
$$
f_R(r)=\frac{n(n-1)}{\theta^n}r^{n-2}(\theta-r),\quad0<r<\theta.
$$
$R/\theta\sim$Beta$(n-1,2)$より$E[R]=(n-1)\theta/(n+1)$、$\operatorname{Var}(R)=2(n-1)\theta^2/\{(n+1)^2(n+2)\}$。従って$T_1,T_2$は不偏で
$$
\operatorname{Var}(T_1)=\frac{\theta^2}{n(n+2)}
<\frac{2\theta^2}{(n-1)(n+2)}=\operatorname{Var}(T_2).
$$

## 採点基準・時間配分・選択判断

最大値20点、同時・条件付き密度25点、条件付き期待値10点、range25点、推定量比較20点。初動3分、(1)4分、(2)7分、(3)3分、(4)7分、(5)3分、見直し3分。15分で条件付き密度まで進めば継続する。25分では$E[R]$と二つの不偏化係数を先に残し、Beta分散を思い出せなければ積分式を書いて打ち切る。前半を落としても、問題文の$T_1,T_2$を使って(5)の期待値計算へ進める。

## 復習カード

1. 最大値CDFは全標本が閾値以下の確率。
2. 最小・最大の同時密度は配置係数$n(n-1)$。
3. 条件付き密度は同時密度を周辺密度で割る。
4. 条件付き分布の台も書き直す。
5. 最大値を固定すると残りは縮小一様標本となる。
6. range変換では像領域を先に求める。
7. 一様rangeの尺度化はBeta分布。
8. 不偏化は期待値の係数を逆にする。
9. 不偏推定量同士は分散で比較する。
10. 前半の分布結果を推定量評価へ再利用する。
