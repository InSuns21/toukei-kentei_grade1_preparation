# F0-00FA2 Encore II：Fourier変換・畳み込み・反転

Fourier級数では周期関数を離散的な周波数 $n\in\mathbb Z$ に分解しました。

今度は実数全体上の関数を、連続な周波数 $\xi\in\mathbb R$ に分解します。

---

## 1. Fourier変換

$f\in L^1(\mathbb R)$ に対して

$$
\boxed{
\widehat f(\xi)
=
\int_{-\infty}^{\infty}
f(x)e^{-i\xi x}\,dx
}
$$

と定義します。

この章では逆変換を

$$
\boxed{
f(x)
=
\frac1{2\pi}
\int_{-\infty}^{\infty}
\widehat f(\xi)e^{i\xi x}\,d\xi
}
$$

という規約で書きます。

Fourier変換の定数配置には複数の流儀があるため、別の本では $2\pi$ の位置が変わることがあります。

---

## 2. Fourier級数との対応

周期関数では

$$
f(x)=\sum_{n\in\mathbb Z}c_ne^{inx}
$$

でした。

実数全体では

$$
f(x)
=\frac1{2\pi}
\int_{\mathbb R}
\widehat f(\xi)e^{i\xi x}\,d\xi.
$$

したがって

$$
\boxed{
\text{離散和}
\longrightarrow
\text{連続積分}
}
$$

へ移ったと見ることができます。

---

## 3. 基本変換則

線形性から

$$
\widehat{af+bg}
=a\widehat f+b\widehat g.
$$

### 3.1 平行移動

$$
g(x)=f(x-a)
$$

なら変数変換から

$$
\boxed{
\widehat g(\xi)
=e^{-ia\xi}\widehat f(\xi)
}.
$$

空間の平行移動は周波数側で位相因子になります。

### 3.2 変調

$$
g(x)=e^{iax}f(x)
$$

なら

$$
\boxed{
\widehat g(\xi)
=\widehat f(\xi-a)
}.
$$

空間側で複素指数関数を掛けると、周波数が平行移動します。

### 3.3 尺度変換

$a\ne0$ として

$$
g(x)=f(ax)
$$

なら

$$
\boxed{
\widehat g(\xi)
=\frac1{|a|}
\widehat f\left(\frac\xi a\right)
}.
$$

狭い関数は広い周波数分布を持ち、広い関数は狭い周波数分布を持つ、という時間・周波数の逆関係が現れます。

---

## 4. Riemann--Lebesgueの補題

$f\in L^1(\mathbb R)$ なら

$$
\boxed{
\widehat f(\xi)\to0
\qquad(|\xi|\to\infty)
}
$$

です。

つまり絶対可積分な関数には、無限に高い周波数で有限の強さが残り続けることはありません。

完全証明では単関数・連続コンパクト台関数による近似を使いますが、この系列ではD2のLebesgue積分と近似の考え方を背景として定理を使います。

---

## 5. 畳み込み

$f,g\in L^1(\mathbb R)$ に対して

$$
\boxed{
(f*g)(x)
=
\int_{\mathbb R}f(x-y)g(y)\,dy
}
$$

を畳み込みといいます。

確率論では独立な確率変数 $X,Y$ の密度を $f_X,f_Y$ とすると、和 $X+Y$ の密度は

$$
f_{X+Y}=f_X*f_Y
$$

になります。

したがって畳み込みは「独立な量を足す」操作と直接つながっています。

---

## 6. 畳み込み定理

Fourier変換は畳み込みを積へ変えます。

$$
\begin{aligned}
\widehat{f*g}(\xi)
&=
\int_{\mathbb R}
\int_{\mathbb R}
f(x-y)g(y)e^{-i\xi x}\,dy\,dx.
\end{aligned}
$$

Fubiniで積分順序を交換し、$z=x-y$ と置けば

$$
\begin{aligned}
\widehat{f*g}(\xi)
&=
\left(\int f(z)e^{-i\xi z}\,dz\right)
\left(\int g(y)e^{-i\xi y}\,dy\right).
\end{aligned}
$$

よって

$$
\boxed{
\widehat{f*g}(\xi)
=
\widehat f(\xi)\widehat g(\xi)
}.
$$

つまり

$$
\boxed{
\text{畳み込み}
\xrightarrow{\mathcal F}
\text{掛け算}
}
$$

です。

これは特性関数で

$$
\varphi_{X+Y}(t)=\varphi_X(t)\varphi_Y(t)
$$

となった理由そのものです。

---

## 7. 積は畳み込みへ移る

逆方向には、十分な可積分性の下で

$$
\boxed{
\widehat{fg}
=
\frac1{2\pi}
\widehat f*\widehat g
}
$$

となります。

空間側と周波数側で

- 積
- 畳み込み

が入れ替わる構造がFourier解析の中心です。

---

## 8. 微分は掛け算になる

$f$ が十分滑らかで、$f,f'$ が可積分かつ境界項が消えるとします。

部分積分から

$$
\begin{aligned}
\widehat{f'}(\xi)
&=
\int f'(x)e^{-i\xi x}\,dx\\
&=
\left[f(x)e^{-i\xi x}\right]_{-\infty}^{\infty}
+i\xi\int f(x)e^{-i\xi x}\,dx.
\end{aligned}
$$

境界項が0なら

$$
\boxed{
\widehat{f'}(\xi)
=i\xi\widehat f(\xi)
}.
$$

さらに

$$
\boxed{
\widehat{f''}(\xi)
=-\xi^2\widehat f(\xi)
}.
$$

これが微分方程式をFourier変換する核心です。

微分作用素

$$
\frac d{dx}
$$

が周波数側では

$$
i\xi
$$

を掛けるだけの演算へ変わります。

---

## 9. GaussianのFourier変換

$a>0$ として

$$
f(x)=e^{-ax^2}
$$

を考えます。

Gaussian積分を使うと

$$
\boxed{
\widehat f(\xi)
=
\sqrt{\frac\pi a}
\exp\left(-\frac{\xi^2}{4a}\right)
}.
$$

つまりGaussianはFourier変換してもGaussianです。

この自己相似性が

- 正規分布の特性関数
- 熱方程式のheat kernel
- 中心極限定理

を同じ場所へ集めます。

---

## 10. Fourier反転

十分良い関数、例えば $f,\widehat f\in L^1(\mathbb R)$ で適切な正則性を持つ場合、

$$
\boxed{
f(x)
=
\frac1{2\pi}
\int_{\mathbb R}
\widehat f(\xi)e^{i\xi x}\,d\xi
}
$$

によって元の関数を復元できます。

重要なのは

> Fourier変換は情報を捨てる圧縮ではなく、条件の下では可逆な座標変換である。

ということです。

---

## 11. 特性関数は何者だったのか

確率変数 $X$ の分布を $P_X$ とすると

$$
\varphi_X(t)
=
\int_{\mathbb R}e^{itx}\,dP_X(x).
$$

これは符号の規約を除けば、確率測度 $P_X$ のFourier変換です。

密度 $f_X$ があれば

$$
\varphi_X(t)
=
\int e^{itx}f_X(x)\,dx.
$$

したがってF0-00P6で使った特性関数は

$$
\boxed{
\text{確率分布のFourier解析}
}
$$

でした。

---

## 12. PDEへの接続

熱方程式

$$
\partial_tu=\kappa\partial_{xx}u
$$

を $x$ についてFourier変換すると

$$
\partial_t\widehat u
=-\kappa\xi^2\widehat u.
$$

波動方程式

$$
\partial_{tt}u=c^2\partial_{xx}u
$$

なら

$$
\partial_{tt}\widehat u
=-c^2\xi^2\widehat u.
$$

つまり周波数ごとに、それぞれ一階または二階ODEへ分解されます。

---

## 章末チェック

- Fourier変換と逆変換の規約を書ける。
- 平行移動・変調・尺度変換を周波数側で説明できる。
- 畳み込み定理をFubiniから導ける。
- $\widehat{f'}=i\xi\widehat f$ を部分積分から導ける。
- GaussianのFourier変換がGaussianになることを説明できる。
- 特性関数を確率測度のFourier変換として説明できる。
- PDEがFourier変換で周波数ごとのODEへ落ちる理由を説明できる。
