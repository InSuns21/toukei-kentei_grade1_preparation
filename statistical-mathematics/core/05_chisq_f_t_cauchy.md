# Core 16 カイ二乗・F・t・Cauchy分布の関係

- 旧No.: 5
- 演習価値: S
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$Z\sim N(0,1)$、$V\sim\chi_\nu^2$ は独立とし

$$
T=\frac{Z}{\sqrt{V/\nu}}
$$

とする。

1. $T$ の分布を答え、定義との対応を説明せよ。
2. $T^2$ の分布を求めよ。
3. $\nu=1$ のとき $T$ が標準Cauchy分布に従うことを示せ。
4. 一般に0について対称な連続確率変数 $T$ の確率密度関数を $f_T$ とし、$W=T^2$ とする。$W$ の確率密度関数を求めよ。

## 詳細解答

### 1. $T$ の分布

自由度 $\nu$ のt分布は、

- $Z\sim N(0,1)$、
- $V\sim\chi_\nu^2$、
- $Z$ と $V$ が独立

のときの比

$$
\frac{Z}{\sqrt{V/\nu}}
$$

の分布として定義される。

本問ではこの3条件がそのまま仮定されているから

$$
\boxed{T\sim t_\nu}.
$$

ここは「t分布の公式を適用する」のではなく、問題文の確率変数がt分布の定義そのものと一致している。

### 2. $T^2$ の分布

標準正規変数の二乗は

$$
Z^2\sim\chi_1^2.
$$

また $Z$ と $V$ は独立なので、$Z$ の関数である $Z^2$ も $V$ と独立である。

従って

$$
T^2
=\frac{Z^2}{V/\nu}
=\frac{Z^2/1}{V/\nu}.
$$

自由度 $d_1,d_2$ のF分布は、独立な

$$
U_1\sim\chi_{d_1}^2,
\qquad
U_2\sim\chi_{d_2}^2
$$

に対して

$$
\frac{U_1/d_1}{U_2/d_2}
$$

の分布として定義される。ここで $U_1=Z^2,d_1=1,U_2=V,d_2=\nu$ と対応するので

$$
\boxed{T^2\sim F_{1,\nu}}.
$$

### 3. $\nu=1$ のときのCauchy分布

$\nu=1$ なら

$$
T=\frac{Z_1}{\sqrt V},
\qquad
Z_1\sim N(0,1),\quad V\sim\chi_1^2.
$$

独立な $Z_2\sim N(0,1)$ を用いれば $Z_2^2\sim\chi_1^2$ なので、分布の意味で

$$
\sqrt V\overset{d}=|Z_2|.
$$

従って

$$
T\overset{d}=\frac{Z_1}{|Z_2|}.
$$

$Z_2$ の符号を $S=\operatorname{sgn}(Z_2)$ とする。標準正規分布の対称性から $S$ は $\pm1$ を同確率で取り、$|Z_2|$ と独立である。また $S$ は $Z_1$ とも独立で、$SZ_1\overset{d}=Z_1$ である。従って

$$
\frac{Z_1}{|Z_2|}
\overset{d}=
\frac{SZ_1}{|Z_2|}
=\frac{Z_1'}{Z_2},
$$

ここで $Z_1'=SZ_1\sim N(0,1)$ である。

比 $R=Z_1/Z_2$ の密度も確認する。変換

$$
r=\frac{z_1}{z_2},
\qquad s=z_2
$$

の逆変換は $z_1=rs,z_2=s$ であり、Jacobianの絶対値は $|s|$。独立標準正規の同時密度から

$$
\begin{aligned}
f_R(r)
&=\int_{-\infty}^{\infty}
\frac{1}{2\pi}
\exp\left[-\frac{(r^2+1)s^2}{2}\right]|s|\,ds\\
&=\frac1\pi\int_0^\infty
s\exp\left[-\frac{(1+r^2)s^2}{2}\right]ds.
\end{aligned}
$$

$t=(1+r^2)s^2/2$ と置くと $dt=(1+r^2)s\,ds$ だから

$$
\begin{aligned}
f_R(r)
&=\frac1{\pi(1+r^2)}
\int_0^\infty e^{-t}\,dt\\
&=\boxed{\frac1{\pi(1+r^2)}}.
\end{aligned}
$$

これは標準Cauchy分布の確率密度関数である。従って

$$
\boxed{T\sim\operatorname{Cauchy}(0,1)}
$$

となる。

### 4. $W=T^2$ の確率密度関数

$w>0$ とする。$W\le w$ は

$$
T^2\le w
\iff
-\sqrt w\le T\le\sqrt w
$$

だから、累積分布関数は

$$
F_W(w)
=F_T(\sqrt w)-F_T(-\sqrt w).
$$

$w$ で微分すると連鎖律より

$$
\begin{aligned}
f_W(w)
&=f_T(\sqrt w)\frac1{2\sqrt w}
-f_T(-\sqrt w)\left(-\frac1{2\sqrt w}\right)\\
&=\frac{f_T(\sqrt w)+f_T(-\sqrt w)}{2\sqrt w}.
\end{aligned}
$$

$T$ は0について対称なので

$$
f_T(-t)=f_T(t).
$$

従って

$$
\boxed{
f_W(w)=\frac{f_T(\sqrt w)}{\sqrt w},
\qquad w>0
}.
$$

$w\le0$ では $W=T^2\ge0$ なので密度は0である。

## 本番答案

定義より

$$
T=\frac{Z}{\sqrt{V/\nu}}\sim t_\nu.
$$

また $Z^2\sim\chi_1^2$ かつ $Z^2$ と $V$ は独立なので

$$
T^2=\frac{Z^2/1}{V/\nu}\sim F_{1,\nu}.
$$

$\nu=1$ では独立標準正規 $Z_1,Z_2$ を用いて

$$
T\overset d=Z_1/|Z_2|\overset d=Z_1/Z_2.
$$

比 $R=Z_1/Z_2$ に $z_1=rs,z_2=s$ を用いると

$$
f_R(r)
=\int\frac{|s|}{2\pi}e^{-(1+r^2)s^2/2}ds
=\frac1{\pi(1+r^2)},
$$

従って標準Cauchy分布。

さらに $W=T^2$ なら

$$
F_W(w)=F_T(\sqrt w)-F_T(-\sqrt w)
$$

より

$$
f_W(w)
=\frac{f_T(\sqrt w)+f_T(-\sqrt w)}{2\sqrt w}
=\frac{f_T(\sqrt w)}{\sqrt w},
\quad w>0.
$$

## 採点基準

- t分布の定義との対応: 4点
- $T^2$ とF分布の対応（独立性を含む）: 5点
- $\nu=1$ のCauchy分布（正規比の密度導出）: 7点
- 二乗変換の累積分布関数から密度を導出: 4点
