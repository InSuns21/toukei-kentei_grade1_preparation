# 30分ドリル

- 制限時間: 30分
- 目標: 同時密度から条件付き量を導き、標本による母数推定までつなぐ
- level: C

## 過去問傾向との対応

MATH-2022-Q2の「支持領域、周辺化、条件付き構造、相関」の連鎖を校正対象とし、最後を未知母数の推定へ接続した。密度、母数化、数値は独自であり、過去問原文の再現ではない。条件付き密度と期待値は先取り事項なので、必要な定義を問題文で与える。

## P2-DRILL-01 問題

推定量$T$が推定対象$\alpha$に対して$E_\alpha[T]=\alpha$を満たすとき、$T$を$\alpha$の不偏推定量という。

$-1\leq\alpha\leq1$とし、単位正方形$0<x<1,\ 0<y<1$上で
$$
f_\alpha(x,y)=1+\alpha(2x-1)(2y-1)
$$
とし、外では0とする。必要なら
$$
f_{X\mid Y}(x\mid y)=\frac{f_\alpha(x,y)}{f_Y(y)},
\qquad
E[X\mid Y=y]=\int_0^1x f_{X\mid Y}(x\mid y)\,dx
$$
を用いてよい。

1. $f_\alpha$が同時密度であることを示せ。（15点）
2. $X,Y$の周辺密度とCDFを求めよ。（20点）
3. $f_{X\mid Y}(x\mid y)$と$E[X\mid Y=y]$を求めよ。（20点）
4. $E[XY]$と$\operatorname{Cov}(X,Y)$を求め、$X,Y$が独立となるための必要十分条件を求めよ。（25点）
5. この分布から独立同分布に得た$(X_i,Y_i)$、$i=1,\ldots,n$に対し
$$
\widehat\alpha=36\left(\frac1n\sum_{i=1}^nX_iY_i-\frac14\right)
$$
が$\alpha$の不偏推定量であることを示せ。（20点）

## 詳細解答

### (1)

$|2x-1|<1$、$|2y-1|<1$と$|\alpha|\leq1$から$f_\alpha(x,y)\geq0$である。また
$$
\int_0^1(2x-1)\,dx=0
$$
なので
$$
\int_0^1\int_0^1f_\alpha(x,y)\,dy\,dx=1.
$$
従って$f_\alpha$は同時密度である。

### (2)

固定した$0<x<1$に対して
$$
f_X(x)=\int_0^1f_\alpha(x,y)\,dy
=1+\alpha(2x-1)\int_0^1(2y-1)\,dy=1.
$$
対称性から$f_Y(y)=1$（$0<y<1$）であり、台の外では0である。従って両CDFは
$$
F_X(t)=F_Y(t)=
\begin{cases}
0,&t\leq0,\\
t,&0<t<1,\\
1,&t\geq1.
\end{cases}
$$

### (3)

$0<y<1$では$f_Y(y)=1$だから
$$
f_{X\mid Y}(x\mid y)=1+\alpha(2x-1)(2y-1),\qquad0<x<1.
$$
ここで
$$
\int_0^1x(2x-1)\,dx
=\int_0^1(2x^2-x)\,dx
=\frac16.
$$
従って
$$
E[X\mid Y=y]
=\frac12+\frac{\alpha}{6}(2y-1).
$$

### (4)

積の形を分離すると
$$
\begin{aligned}
E[XY]
&=\int_0^1\int_0^1xy\{1+\alpha(2x-1)(2y-1)\}\,dy\,dx\\
&=\left(\int_0^1x\,dx\right)^2
+\alpha\left(\int_0^1x(2x-1)\,dx\right)^2\\
&=\frac14+\frac{\alpha}{36}.
\end{aligned}
$$
$E[X]=E[Y]=1/2$なので
$$
\operatorname{Cov}(X,Y)=\frac{\alpha}{36}.
$$
独立なら共分散0だから$\alpha=0$が必要である。逆に$\alpha=0$なら$f_0(x,y)=1=f_X(x)f_Y(y)$なので独立である。従って必要十分条件は$\alpha=0$である。

### (5)

独立同分布性と前問の結果から
$$
\begin{aligned}
E[\widehat\alpha]
&=36\left\{\frac1n\sum_{i=1}^nE[X_iY_i]-\frac14\right\}\\
&=36\left(\frac14+\frac\alpha{36}-\frac14\right)\\
&=\alpha.
\end{aligned}
$$
従って$\widehat\alpha$は不偏推定量である。

## 完成形の本番答案

$|\alpha(2x-1)(2y-1)|\leq1$より非負であり、$\int_0^1(2x-1)dx=0$より全体積分は1。周辺化すると$f_X=f_Y=1$ on $(0,1)$で、CDFは$0,t,1$の三枝である。

$f_Y(y)=1$より
$$
f_{X\mid Y}(x\mid y)=1+\alpha(2x-1)(2y-1),
$$
また$\int_0^1x(2x-1)dx=1/6$より
$$
E[X\mid Y=y]=\frac12+\frac\alpha6(2y-1).
$$
さらに
$$
E[XY]=\frac14+\frac\alpha{36},
\qquad
\operatorname{Cov}(X,Y)=\frac\alpha{36}.
$$
従って独立なら$\alpha=0$であり、逆に$\alpha=0$なら$f_0=f_Xf_Y$だから、独立の必要十分条件は$\alpha=0$。

最後に
$$
E[\widehat\alpha]
=36\left(E[XY]-\frac14\right)=\alpha
$$
なので$\widehat\alpha$は不偏である。

## 採点基準・時間配分・選択判断

密度確認15点、周辺とCDF20点、条件付き量20点、積モーメント・共分散・独立性25点、不偏性20点。初動3分、(1)3分、(2)4分、(3)5分、(4)7分、(5)4分、見直し4分。3分で中心化因子の積分が0と見えれば選択する。15分で周辺密度と条件付き密度まで得られれば継続する。25分で積分が残った場合も、$\int_0^1x(2x-1)dx=1/6$と$E[XY]$の積表示を残し、与えられた$\widehat\alpha$の期待値計算で答案を閉じる。

## 復習カード

1. 母数範囲は密度の非負性を保証する。
2. 中心化因子の積分0を正規化と周辺化へ再利用する。
3. CDFは台外を含めて場合分けする。
4. 条件付き密度は同時密度を周辺密度で割る。
5. 条件付き期待値は条件付き密度で積分する。
6. 二重積分の積型は一変数積分の積へ分離する。
7. 共分散0だけでは一般に独立とは限らない。
8. 必要条件と十分条件を別々に示す。
9. 不偏性は推定量の期待値を母数と比較する。
10. 前問のモーメントを推定量評価へ再利用する。
