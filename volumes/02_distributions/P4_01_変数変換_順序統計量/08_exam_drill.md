# 30分ドリル

- 制限時間: 30分
- level: C

## P4-DRILL-01 問題

$X_1,\ldots,X_n$を独立なUnif$(0,\theta)$標本とし、$n\geq2$, $U=X_{(1)}$, $V=X_{(n)}$, $R=V-U$とする。

1. $V$のCDFと密度を求めよ。（20点）
2. $E[V]$を求めよ。（15点）
3. $V$を用いて$\theta$の不偏推定量を一つ作れ。（15点）
4. $(U,V)$の同時密度を求めよ。（25点）
5. $R$の密度を変数変換で求めよ。（25点）

## 詳細解答

$0\leq v\leq\theta$で
$$
F_V(v)=P(X_1\leq v,\ldots,X_n\leq v)
=\left(\frac v\theta\right)^n,
$$
$$
f_V(v)=\frac{nv^{n-1}}{\theta^n}.
$$
従って
$$
E[V]=\int_0^\theta v\frac{nv^{n-1}}{\theta^n}dv
=\frac{n}{n+1}\theta.
$$
よって$\widehat\theta=(n+1)V/n$は不偏です。

$0<u<v<\theta$で最小と最大の間に残り$n-2$個が入るため
$$
f_{U,V}(u,v)=\frac{n(n-1)}{\theta^n}(v-u)^{n-2}.
$$
$r=v-u$, $w=u$と置けば$v=w+r$、絶対Jacobianは1です。像の領域は$0<r<\theta$, $0<w<\theta-r$なので
$$
\begin{aligned}
f_R(r)
&=\int_0^{\theta-r}\frac{n(n-1)}{\theta^n}r^{n-2}dw\\
&=\frac{n(n-1)}{\theta^n}r^{n-2}(\theta-r),
\quad0<r<\theta.
\end{aligned}
$$
範囲外は0です。正規化は$x=r/\theta$により$n(n-1)\int_0^1x^{n-2}(1-x)dx=1$で確認できます。

## 完成形の本番答案

$0\leq v\leq\theta$で
$$
F_V(v)=(v/\theta)^n,\qquad f_V(v)=nv^{n-1}/\theta^n.
$$
従って$E[V]=n\theta/(n+1)$、$\widehat\theta=(n+1)V/n$は不偏。$0<u<v<\theta$で
$$
f_{U,V}(u,v)=\frac{n(n-1)}{\theta^n}(v-u)^{n-2}.
$$
$r=v-u,w=u$ではJacobian 1、$0<w<\theta-r$なので
$$
f_R(r)=\frac{n(n-1)}{\theta^n}r^{n-2}(\theta-r)
\boldsymbol{1}_{(0,\theta)}(r).
$$

## 採点基準・時間配分・選択判断

初動3分、(1)5分、(2)3分、(3)2分、(4)7分、(5)7分、見直し3分です。3分で最大値CDFと$0<u<v<\theta$が見えれば選択します。15分で同時密度の係数まで進めば継続し、25分では範囲変換$0<w<\theta-r$とJacobianを残して閉じます。(5)は逆変換5点、像領域8点、積分と密度12点です。

## 復習カード

1. 一変数変換は逆像を全て足す。
2. 密度変換は微分の絶対値。
3. 多変数変換は像領域を先に書く。
4. 逆変換Jacobianを使う。
5. 和の密度は畳込み。
6. 差では$y=x-u$。
7. 積ではJacobian$1/|x|$。
8. 比では$x=uv,y=v$、Jacobian$|v|$。
9. 極座標Jacobianは$r$。
10. 最大CDFは$F^n$。
11. 最小生存関数は$(1-F)^n$。
12. 第$k$順序統計量は左$k-1$個。
13. 配置係数は多項係数。
14. $F(X_{(k)})$はBeta$(k,n-k+1)$。
15. 一様標本の最大はBeta$(n,1)$型。
16. 最小・最大の間に$n-2$個入る。
17. 順序統計量の同値は連続分布で確率0。
18. 変換後密度は積分して1を検算する。
19. 台の境界も答案へ書く。
20. 非単調性・絶対値・領域の三点を見直す。
