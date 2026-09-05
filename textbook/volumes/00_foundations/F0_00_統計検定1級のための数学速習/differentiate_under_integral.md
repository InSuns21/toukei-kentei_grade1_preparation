# 4.4 積分記号下の微分

母数 $\theta$ を含む積分

$$
F(\theta)=\int f(x,\theta)\,dx
$$

を微分して

$$
F'(\theta)
=\int \frac{\partial}{\partial\theta}f(x,\theta)\,dx
$$

としたい場面があります。ただし、微分と積分はいつでも自由に交換できるわけではありません。

この速習では、次の実用的な確認を使います。$\theta_0$ の近くで $\partial f(x,\theta)/\partial\theta$ が存在し、$\theta$ に依存しない関数 $g(x)$ を見つけて

$$
\left|\frac{\partial}{\partial\theta}f(x,\theta)\right|\le g(x)
$$

とでき、さらに

$$
\int |g(x)|\,dx<\infty
$$

まで確認できるなら、この章では微分と積分を交換してよいものとして扱います。

重要なのは「可積分」などの未導入語を覚えることではなく、**微分後の絶対値を、積分すると有限になる共通の上界で抑える**という計算です。

例えば $a_0>0$ の近くで

$$
f(x,a)=e^{-ax^2}
$$

を考えると、$a\ge a_0/2$ として

$$
\left|\frac{\partial}{\partial a}e^{-ax^2}\right|
=x^2e^{-ax^2}
\le x^2e^{-(a_0/2)x^2}.
$$

右辺について

$$
\int_{-\infty}^{\infty}x^2e^{-(a_0/2)x^2}\,dx<\infty
$$

なので、後のガウス積分の計算では積分記号下で微分してよいと判断できます。

この章では一般定理の名称や測度論的な証明までは扱いません。

---
