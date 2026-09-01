# F0-00PDE1 Encore II：熱方程式・Fourier変換・Gaussian heat kernel

ここから偏微分方程式へ入ります。

最初に扱うのは

$$
\boxed{
\frac{\partial u}{\partial t}
=\kappa\frac{\partial^2u}{\partial x^2}
}
$$

という熱方程式です。

この方程式は、Fourier解析・Gaussian・確率論が一つの式へ集まる最もきれいな例の一つです。

---

## 1. PDEとは何か

$u=u(t,x)$ のように複数の独立変数を持つ未知関数について、偏導関数の関係を与える方程式を偏微分方程式といいます。

熱方程式では

- $t$：時間
- $x$：空間
- $u(t,x)$：温度などの場

です。

---

## 2. 初期条件を与える

実数全体上で

$$
\partial_tu
=\kappa\partial_{xx}u,
\qquad x\in\mathbb R,\ t>0
$$

を考えます。

初期条件として

$$
\boxed{u(0,x)=u_0(x)}
$$

を与えます。

時間発展問題なので、ODEの初期値問題と同じ構造です。

---

## 3. 空間変数だけFourier変換する

$x$ についてFourier変換し

$$
\widehat u(t,\xi)
=
\int_{\mathbb R}
u(t,x)e^{-i\xi x}\,dx
$$

と書きます。

十分な正則性と減衰を仮定すれば

$$
\widehat{\partial_{xx}u}
=-\xi^2\widehat u.
$$

したがって熱方程式は

$$
\boxed{
\partial_t\widehat u(t,\xi)
=-\kappa\xi^2\widehat u(t,\xi)
}
$$

へ変わります。

---

## 4. 各周波数についてODEになった

$\xi$ を固定すると

$$
\frac{dy}{dt}
=-\kappa\xi^2y
$$

という一階線形ODEです。

F0-00H1より

$$
\boxed{
y(t)=e^{-\kappa\xi^2t}y(0)}.
$$

したがって

$$
\boxed{
\widehat u(t,\xi)
=e^{-\kappa\xi^2t}\widehat u_0(\xi)
}.
$$

PDEが周波数ごとの独立なODEへ分解されました。

---

## 5. 高周波ほど速く消える

乗数

$$
e^{-\kappa\xi^2t}
$$

を見ると、$|\xi|$ が大きいほど急速に0へ近づきます。

つまり細かなギザギザに対応する高周波成分ほど速く減衰します。

これが熱方程式の平滑化作用です。

$$
\boxed{
\text{熱方程式}
=\text{高周波を強く削る時間発展}
}
$$

と読めます。

---

## 6. 逆Fourier変換する

$$
\widehat u(t,\xi)
=e^{-\kappa t\xi^2}\widehat u_0(\xi)
$$

は周波数側で積です。

畳み込み定理を逆に使えば

$$
\boxed{
u(t,\cdot)=G_t*u_0}
$$

と書けます。

ここで $G_t$ は

$$
e^{-\kappa t\xi^2}
$$

の逆Fourier変換です。

---

## 7. Gaussian heat kernel

GaussianのFourier変換公式から

$$
\boxed{
G_t(x)
=
\frac1{\sqrt{4\pi\kappa t}}
\exp\left(-\frac{x^2}{4\kappa t}\right)
}
$$

を得ます。

したがって解は

$$
\boxed{
u(t,x)
=
\int_{\mathbb R}
G_t(x-y)u_0(y)\,dy
}
$$

です。

これは初期データをGaussianでぼかす操作です。

---

## 8. なぜGaussianが出るのか

Fourier空間では熱方程式の時間発展が

$$
e^{-\kappa t\xi^2}
$$

です。

そしてGaussianはFourier変換してもGaussianです。

したがって逆変換してもGaussianが現れます。

これで

$$
\boxed{
\text{二階微分}
\to
\xi^2
\to
 e^{-t\xi^2}
\to
\text{Gaussian}
}
$$

という一本の鎖ができます。

---

## 9. 質量保存

heat kernelについて

$$
\int_{\mathbb R}G_t(x)\,dx=1.
$$

したがって適切な可積分性の下で

$$
\begin{aligned}
\int u(t,x)\,dx
&=
\int (G_t*u_0)(x)\,dx\\
&=
\left(\int G_t\right)
\left(\int u_0\right)\\
&=
\int u_0(x)\,dx.
\end{aligned}
$$

つまり総量は保存されます。

---

## 10. 分散は時間とともに増える

$G_t$ は平均0、分散

$$
\boxed{2\kappa t}
$$

の正規密度です。

したがって時間が経つほど分布は広がります。

局所的な山は低くなり、その影響が遠くへ拡散していきます。

---

## 11. 確率論との接続

$G_t$ は

$$
N(0,2\kappa t)
$$

の密度そのものです。

したがって

$$
u(t,x)
=
E[u_0(x+\sqrt{2\kappa}B_t)]
$$

というBrown運動による表現へつながります。

ここで $B_t$ は標準Brown運動です。

このEncore IIではBrown運動の厳密構成までは再度行いませんが、E2の確率過程側と

$$
\boxed{
\text{熱方程式}
\longleftrightarrow
\text{Brown運動}
}
$$

という対応があることを確認します。

---

## 12. semigroupという見方

熱方程式の時間発展を

$$
T_tu_0=G_t*u_0
$$

と書きます。

Gaussianの畳み込み性から

$$
G_s*G_t=G_{s+t}
$$

なので

$$
\boxed{T_sT_t=T_{s+t}}.
$$

これは半群性です。

確率論でBrown運動の独立増分がGaussian分布の畳み込みを作ることと同じ構造です。

---

## 13. Fourier空間ではさらに簡単

Fourier空間で

$$
\widehat{T_tu_0}(\xi)
=e^{-\kappa t\xi^2}\widehat u_0(\xi).
$$

したがって

$$
T_t
\quad\longleftrightarrow\quad
\text{乗数 }e^{-\kappa t\xi^2}
$$

です。

微分作用素

$$
\kappa\partial_{xx}
$$

が時間発展を生成している、と見るのが作用素論的な立場です。

---

## 14. 有限区間ではFourier級数へ戻る

実数全体ではFourier変換を使いました。

有限区間 $0<x<L$ で

$$
u(t,0)=u(t,L)=0
$$

という境界条件を課すと、Fourier変換ではなく

$$
\sin\left(\frac{n\pi x}{L}\right)
$$

によるFourier級数が自然に現れます。

この話はPDE2とSturm--Liouvilleで詳しく扱います。

---

## 章末チェック

- 熱方程式を空間変数についてFourier変換できる。
- 変換後が周波数ごとの一階ODEになることを説明できる。
- $\widehat u=e^{-\kappa t\xi^2}\widehat u_0$ を導ける。
- Gaussian heat kernelを逆Fourier変換から得られる。
- 解を $G_t*u_0$ と書ける。
- 高周波ほど速く減衰する平滑化を説明できる。
- heat kernelが正規分布密度であることを説明できる。
- Brown運動との対応の意味を説明できる。
