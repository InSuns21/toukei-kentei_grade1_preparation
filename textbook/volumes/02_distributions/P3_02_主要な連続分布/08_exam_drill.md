# 30分ドリル

- 制限時間: 30分
- level: C

## 過去問傾向との対応

MATH-2023-Q3とSCI-2019-Q1の「寿命分布、生存関数、変換、尤度、推定量評価」の連鎖を校正対象とする。Weibullの設定と設問は独自である。一致性に必要な不等式は問題文で与える。

## P3C-DRILL-01 問題

部品寿命$X$は、形状2、未知尺度$\eta>0$のWeibull分布に従う。すなわち、その生存関数は
$$
P(X>x)=\exp\{-(x/\eta)^2\},\qquad x\geq0
$$
であり、$x<0$では$P(X>x)=1$である。独立同分布標本を$X_1,\ldots,X_n$とする。

観測値の同時密度を$\eta$の関数とみたものを尤度といい、尤度を$\eta>0$で最大にする値を最尤推定値という。推定量$T$が$E[T]=\eta^2$を満たすとき$\eta^2$の不偏推定量という。また、任意の$\varepsilon>0$について$P(|T_n-\eta^2|\geq\varepsilon)\to0$となることを、$T_n$が$\eta^2$へ確率収束するという。

任意の有限分散な確率変数$T$と$\varepsilon>0$に対するChebyshev不等式
$$
P(|T-E[T]|\geq\varepsilon)\leq\frac{\operatorname{Var}(T)}{\varepsilon^2}
$$
を用いてよい。

1. $X$の密度、生存関数、ハザードを求めよ。（20点）
2. $P(X>\eta)$と$P(X>\eta\mid X>\eta/2)$を求めよ。（15点）
3. $Y=(X/\eta)^2$の分布を求め、$E[X^2]$と$\operatorname{Var}(X^2)$を求めよ。（20点）
4. $\eta$の尤度を台の条件とともに書き、$\widehat{\eta^2}=n^{-1}\sum_iX_i^2$が$\eta^2$の最尤推定量であることを示せ。（25点）
5. $\widehat{\eta^2}$の不偏性と分散を求め、Chebyshev不等式で$\eta^2$へ確率収束することを示せ。（20点）

## 詳細解答

$x>0$で
$$
f_\eta(x)=\frac{2x}{\eta^2}e^{-(x/\eta)^2},\qquad
h_\eta(x)=\frac{2x}{\eta^2}.
$$
密度は$x\leq0$で0である。
生存関数は全実数上で
$$
S_\eta(x)=
\begin{cases}
1,&x\leq0,\\
e^{-(x/\eta)^2},&x>0
\end{cases}
$$
従って
$$
P(X>\eta)=e^{-1},\qquad
P(X>\eta\mid X>\eta/2)
=\frac{e^{-1}}{e^{-1/4}}=e^{-3/4}.
$$

$y\geq0$で
$$
P(Y\leq y)=P(X\leq\eta\sqrt y)=1-e^{-y},
$$
よって$Y\sim\operatorname{Exp}(1)$。$X^2=\eta^2Y$だから
$$
E[X^2]=\eta^2,\qquad \operatorname{Var}(X^2)=\eta^4.
$$

観測値$x_i>0$に対する尤度は
$$
L(\eta)=\prod_{i=1}^n\frac{2x_i}{\eta^2}
\exp\left(-\frac{x_i^2}{\eta^2}\right),\qquad \eta>0.
$$
$Q=\sum_i x_i^2$と置くと、$\eta$に依存する対数尤度は
$$
\ell(\eta)=-2n\log\eta-\frac{Q}{\eta^2}+\text{constant}.
$$
従って
$$
\ell'(\eta)=-\frac{2n}{\eta}+\frac{2Q}{\eta^3}
=\frac{2(Q-n\eta^2)}{\eta^3}.
$$
$\eta^2<Q/n$で正、$\eta^2>Q/n$で負なので一意な最大点は
$$
\widehat{\eta^2}=\frac1n\sum_{i=1}^nX_i^2.
$$
独立性と前問のモーメントより
$$
E[\widehat{\eta^2}]=\eta^2,\qquad
\operatorname{Var}(\widehat{\eta^2})
=\frac{1}{n^2}\sum_i\eta^4=\frac{\eta^4}{n}.
$$
従って任意の$\varepsilon>0$で
$$
P(|\widehat{\eta^2}-\eta^2|\geq\varepsilon)
\leq\frac{\eta^4}{n\varepsilon^2}\longrightarrow0.
$$

## 完成形の本番答案

$$
f_\eta(x)=\frac{2x}{\eta^2}e^{-(x/\eta)^2},\quad
S_\eta(x)=
\begin{cases}1,&x\leq0,\\e^{-(x/\eta)^2},&x>0,\end{cases}
\quad h_\eta(x)=2x/\eta^2
$$
（密度とハザードは$x>0$で、密度は$x\leq0$で0）。従って尾確率は$e^{-1}$と$e^{-3/4}$。$Y=(X/\eta)^2\sim$Exp$(1)$より$E[X^2]=\eta^2$、$\operatorname{Var}(X^2)=\eta^4$。

$Q=\sum x_i^2$とすると$\ell(\eta)=-2n\log\eta-Q/\eta^2+C$で、$\ell'(\eta)=2(Q-n\eta^2)/\eta^3$。符号変化から$\widehat{\eta^2}=Q/n$が一意な最尤推定量である。さらに平均$\eta^2$、分散$\eta^4/n$なので不偏で、Chebyshev不等式から$\eta^2$へ確率収束する。

## 採点基準・時間配分・選択判断

密度・生存・ハザード20点、尾確率15点、指数変換とモーメント20点、尤度と最尤推定25点、不偏性・一致性20点。初動3分、(1)4分、(2)3分、(3)5分、(4)8分、(5)4分、見直し3分。15分で$Y\sim$Exp$(1)$まで進めば継続し、25分では対数尤度と$Q/n$、分散$\eta^4/n$を優先する。

## 復習カード

1. Weibullの台は正の半直線。
2. 生存関数から密度とハザードを得る。
3. 条件付き尾確率は生存関数の比。
4. Weibullのべき変換は指数分布。
5. 変換後のモーメントを元の統計量へ戻す。
6. 尤度には台とパラメータ範囲を書く。
7. 停留点だけでなく導関数の符号で最大を示す。
8. MLEの不偏性は別計算で確認する。
9. 標本平均型推定量の分散は$1/n$。
10. 分布論を推定量評価へ再利用する。
