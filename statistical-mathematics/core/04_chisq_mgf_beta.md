# Core 38 カイ二乗MGF・再生性・Beta接続

- 旧No.: 04
- 演習価値: A
- 難度: B
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$X\sim\chi^2_{\nu_1}$、$Y\sim\chi^2_{\nu_2}$を独立とする。

1. $\chi^2_\nu$のMGFを求めよ。
2. $X+Y$の分布をMGFから求めよ。
3. $T=X+Y$、$U=X/(X+Y)$とするとき$T,U$の分布と独立性を求めよ。
4. $E[U]$を求めよ。

## 詳細解答

### 1. $\chi^2_\nu$ のMGFを定義から求める

$W\sim\chi^2_\nu$ の密度は

$$
f_W(w)=\frac{1}{2^{\nu/2}\Gamma(\nu/2)}w^{\nu/2-1}e^{-w/2},
\qquad w>0.
$$

したがって

$$
\begin{aligned}
M_W(t)
&=E[e^{tW}]\\
&=\frac{1}{2^{\nu/2}\Gamma(\nu/2)}
\int_0^\infty
w^{\nu/2-1}e^{-(1/2-t)w}dw.
\end{aligned}
$$

$t<1/2$ なら $c=1/2-t>0$ であり、Gamma積分

$$
\int_0^\infty w^{k-1}e^{-cw}dw=\frac{\Gamma(k)}{c^k}
$$

を使うと

$$
\begin{aligned}
M_W(t)
&=\frac{1}{2^{\nu/2}\Gamma(\nu/2)}
\frac{\Gamma(\nu/2)}{(1/2-t)^{\nu/2}}\\
&=\boxed{(1-2t)^{-\nu/2}}.
\end{aligned}
$$

### 2. 再生性

独立性から

$$
\begin{aligned}
M_{X+Y}(t)
&=M_X(t)M_Y(t)\\
&=(1-2t)^{-\nu_1/2}(1-2t)^{-\nu_2/2}\\
&=(1-2t)^{-(\nu_1+\nu_2)/2}.
\end{aligned}
$$

これは $\chi^2_{\nu_1+\nu_2}$ のMGFなので

$$
\boxed{X+Y\sim\chi^2_{\nu_1+\nu_2}}.
$$

### 3. $T,U$ の変換

$a=\nu_1/2$, $b=\nu_2/2$ と置く。逆変換は

$$
x=ut,\qquad y=(1-u)t,
$$

Jacobianの絶対値は $t$。独立なカイ二乗密度の積へ代入すると

$$
\begin{aligned}
f_{T,U}(t,u)
&=\frac{(ut)^{a-1}\{(1-u)t\}^{b-1}e^{-t/2}}{2^{a+b}\Gamma(a)\Gamma(b)}t\\
&=\frac{t^{a+b-1}e^{-t/2}}{2^{a+b}\Gamma(a+b)}
\cdot
\frac{\Gamma(a+b)}{\Gamma(a)\Gamma(b)}u^{a-1}(1-u)^{b-1}.
\end{aligned}
$$

$t>0,0<u<1$。積に分解されるため

$$
\boxed{T\sim\chi^2_{\nu_1+\nu_2}},
$$

$$
\boxed{U\sim\operatorname{Beta}\left(\frac{\nu_1}{2},\frac{\nu_2}{2}\right)},
\qquad
\boxed{T\perp U}.
$$

### 4. $E[U]$

Beta密度の平均を積分すれば

$$
E[U]=\frac{a}{a+b}
=\boxed{\frac{\nu_1}{\nu_1+\nu_2}}.
$$

## 本番答案

密度から

$$
M_{\chi^2_\nu}(t)
=\frac{1}{2^{\nu/2}\Gamma(\nu/2)}
\int_0^\infty w^{\nu/2-1}e^{-(1/2-t)w}dw
=(1-2t)^{-\nu/2}.
$$

よって独立性から $M_{X+Y}=M_XM_Y$ となり $X+Y\sim\chi^2_{\nu_1+\nu_2}$。

さらに $x=ut,y=(1-u)t$, $|J|=t$ と変換すると同時密度がカイ二乗密度とBeta密度の積に分解され、

$$
U\sim Beta(\nu_1/2,\nu_2/2),\qquad T\perp U.
$$

したがって $E[U]=\nu_1/(\nu_1+\nu_2)$。

## 採点基準

- MGF: 5点
- 再生性: 5点
- Beta接続・独立性: 7点
- 平均: 3点
