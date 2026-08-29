# Core 16 カイ二乗・F・t・コーシー分布の関係

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
3. $\nu=1$ のとき $T$ が標準コーシー分布に従うことを示せ。
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

### 3. $\nu=1$ のときのコーシー分布

$\nu=1$ なら

$$
T=\frac{Z}{\sqrt V},
\qquad
Z\sim N(0,1),\quad V\sim\chi_1^2,
$$

であり、$Z$ と $V$ は独立である。

自由度1のカイ二乗分布の確率密度関数は

$$
f_V(v)
=\frac{1}{\sqrt{2\pi v}}e^{-v/2},
\qquad v>0.
$$

従って $(Z,V)$ の同時確率密度関数は

$$
f_{Z,V}(z,v)
=\frac{1}{2\pi\sqrt v}
\exp\left(-\frac{z^2+v}{2}\right),
\qquad v>0.
$$

ここで

$$
t=\frac{z}{\sqrt v},
\qquad
u=v
$$

と変数変換する。逆変換は

$$
z=t\sqrt u,
\qquad
v=u
$$

である。

ヤコビアンは

$$
\left|
\frac{\partial(z,v)}{\partial(t,u)}
\right|
=
\left|
\begin{matrix}
\sqrt u & \dfrac{t}{2\sqrt u}\\
0 & 1
\end{matrix}
\right|
=\sqrt u.
$$

従って

$$
\begin{aligned}
f_{T,U}(t,u)
&=f_{Z,V}(t\sqrt u,u)\sqrt u\\
&=\frac{1}{2\pi}
\exp\left\{-\frac{(1+t^2)u}{2}\right\},
\qquad u>0.
\end{aligned}
$$

$u$ を積分して周辺確率密度関数を求めると

$$
\begin{aligned}
f_T(t)
&=\int_0^\infty
\frac{1}{2\pi}
\exp\left\{-\frac{(1+t^2)u}{2}\right\}du\\
&=\frac{1}{2\pi}\frac{2}{1+t^2}\\
&=\boxed{\frac{1}{\pi(1+t^2)}}.
\end{aligned}
$$

これは標準コーシー分布の確率密度関数である。従って

$$
\boxed{T\sim\operatorname{Cauchy}(0,1)}.
$$

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

$\nu=1$ では

$$
f_{Z,V}(z,v)
=\frac{1}{2\pi\sqrt v}
\exp\left(-\frac{z^2+v}{2}\right),
\qquad v>0.
$$

$t=z/\sqrt v,\ u=v$ と変数変換すると、逆変換は $z=t\sqrt u,\ v=u$ であり、ヤコビアンの絶対値は $\sqrt u$ である。従って

$$
f_T(t)
=\int_0^\infty
\frac{1}{2\pi}
\exp\left\{-\frac{(1+t^2)u}{2}\right\}du
=\frac{1}{\pi(1+t^2)}.
$$

従って $T$ は標準コーシー分布に従う。

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
- $\nu=1$ のコーシー分布（ヤコビアンを用いた密度導出）: 7点
- 二乗変換の累積分布関数から密度を導出: 4点
