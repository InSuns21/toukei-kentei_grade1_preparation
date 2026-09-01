# F0-00DS2 Encore III：超関数微分・弱微分・Heaviside関数

DS1では、通常の関数をテスト関数へ作用する線形汎関数として拡張しました。

ここではその利点を使い、古典的には微分できない関数にも微分を定義します。

中心となる発想は一つです。

$$
\boxed{
\text{対象を直接微分しない}
\quad\to\quad
\text{部分積分で微分をテスト関数側へ移す}
}
$$

---

## 1. 古典微分の部分積分公式

滑らかな $f$ とテスト関数 $\varphi$ に対して

$$
\int_{\mathbb R}f'(x)\varphi(x)\,dx
=
-\int_{\mathbb R}f(x)\varphi'(x)\,dx
$$

です。

$\varphi$ はコンパクトな台を持つので境界項は消えます。

右辺を見ると、$f$ 自身を微分していません。

これを定義として採用します。

---

## 2. 超関数微分

Schwartz超関数 $T$ の微分 $T'$ を

$$
\boxed{
\langle T',\varphi\rangle
=
-\langle T,\varphi'\rangle
}
$$

と定義します。

多次元では多重指数 $\alpha$ に対し

$$
\boxed{
\langle D^\alpha T,\varphi\rangle
=(-1)^{|\alpha|}
\langle T,D^\alpha\varphi\rangle
}
$$

です。

この定義なら、超関数は何回でも微分できます。

---

## 3. 普通に微分できる場合は一致する

$f\in C^1$ とします。

$f$ が作る正則超関数 $T_f$ について

$$
\begin{aligned}
\langle T_f',\varphi\rangle
&=-\int f\varphi'\\
&=\int f'\varphi\\
&=\langle T_{f'},\varphi\rangle.
\end{aligned}
$$

したがって

$$
\boxed{T_f'=T_{f'}}.
$$

つまり超関数微分は古典微分を壊さず拡張しています。

---

## 4. Heaviside関数を微分する

$$
H(x)=
\begin{cases}
0,&x<0,\\
1,&x>0
\end{cases}
$$

とします。

超関数微分は

$$
\begin{aligned}
\langle H',\varphi\rangle
&=-\int_{\mathbb R}H(x)\varphi'(x)\,dx\\
&=-\int_0^\infty\varphi'(x)\,dx\\
&=\varphi(0).
\end{aligned}
$$

よって

$$
\boxed{H'=\delta_0}.
$$

「跳びを微分するとdeltaが出る」が厳密な式になりました。

---

## 5. jumpを持つ関数の一般形

区分的に $C^1$ で、点 $a$ に

$$
J=f(a+)-f(a-)
$$

というjumpを持つとします。

超関数微分には概略

$$
\boxed{
D f
=
f'_{\mathrm{classical}}
+J\delta_a
}
$$

というdelta項が現れます。

不連続性が一点に集中した特異成分として記録されるわけです。

---

## 6. 弱微分

$f\in L^1_{\mathrm{loc}}(\Omega)$ とします。

ある $g\in L^1_{\mathrm{loc}}(\Omega)$ が存在して、全てのテスト関数 $\varphi$ に対し

$$
\boxed{
\int_\Omega f\,\partial_i\varphi
=
-\int_\Omega g\,\varphi
}
$$

を満たすとき、$g$ を $f$ の第 $i$ 成分の弱微分と呼び、

$$
\partial_i f=g
$$

と書きます。

つまり超関数微分が再び局所可積分関数で表せる場合、その関数を弱微分と呼びます。

---

## 7. 弱微分と超関数微分の違い

全ての超関数は超関数の意味で微分できます。

しかし弱微分として扱うには、その微分が普通の局所可積分関数で表せる必要があります。

Heaviside関数では

$$
H'=\delta_0
$$

ですが $\delta_0$ は局所可積分関数ではありません。

したがって $H$ は $L^1$ 関数としての弱微分を持ちません。

この違いがSobolev空間を理解するうえで重要です。

---

## 8. 絶対値関数

$$
f(x)=|x|
$$

は $x=0$ で古典微分できません。

しかし

$$
g(x)=
\begin{cases}
-1,&x<0,\\
1,&x>0
\end{cases}
$$

と置くと、全てのテスト関数に対して部分積分恒等式が成立します。

したがって

$$
\boxed{
D|x|=\operatorname{sgn}(x)
\quad\text{弱微分の意味で}
}
$$

です。

一点で微分できないことは、$L^p$ 的には大問題ではありません。

---

## 9. 二階微分すると特異性が見える

絶対値関数をさらに超関数微分すると

$$
\boxed{
D^2|x|=2\delta_0
}
$$

です。

一階弱微分までは関数として存在しましたが、二階ではdeltaが現れます。

このように「何階まで弱微分が $L^p$ に入るか」が関数空間の滑らかさを測ります。

---

## 10. Sobolev空間への入口

次章では

$$
f\in L^p,
\qquad
D^\alpha f\in L^p
$$

を満たす関数を集めます。

つまり

> 関数そのものと、必要な次数までの弱微分が $L^p$ に入る

という条件で滑らかさを測ります。

これがSobolev空間です。

---

## 章末チェック

- 超関数微分を部分積分の双対化として定義できる。
- 古典微分可能な関数では両者が一致することを示せる。
- $H'=\delta_0$ を導ける。
- 弱微分を局所可積分関数として定義できる。
- 超関数微分と弱微分の違いを説明できる。
- $D|x|=\operatorname{sgn}(x)$ を弱微分として理解できる。
- Sobolev空間が「弱微分の $L^p$ 可積分性」で作られることを説明できる。
