# GPDE2：微分を粗い対象へ拡張し、mollifier で滑らかさを取り戻す

GPDE1 では、関数の点値ではなくテスト関数への作用で対象を読む distribution を導入しました。そこで Poisson 方程式を

$$
\int_\Omega u(-\Delta\varphi)
=
\int_\Omega f\varphi
$$

のように、微分をテスト関数側へ移して読むことができました。

本章では、この部分積分の形そのものを **微分の定義** にします。

$$
\boxed{
\langle \partial_j T,\varphi\rangle
=
-\langle T,\partial_j\varphi\rangle
}
$$

この一行から、

- Heaviside 関数の微分が Dirac delta になる。
- jump の大きさが delta の係数として残る。
- 古典微分できない関数にも distribution の意味では何回でも微分を定義できる。
- distribution 微分が局所可積分関数で表せるとき、弱微分が得られる。
- mollifier で粗い関数を滑らかにし、その微分を計算してから極限へ戻せる。

という大学院 PDE の標準技法が一つにつながります。

GPDE3 では、この「弱微分が何階まで $L^p$ に残るか」を関数空間の定義へ昇格させ、Sobolev 空間へ進みます。

---

## 1. 多変数の微分を一つの記号で扱う

PDE では一階微分だけでなく、

$$
\partial_{x_1x_1}u,
\qquad
\partial_{x_1x_2}u,
\qquad
\Delta u
$$

のような高階偏微分を繰り返し扱います。そこで多重指数を使います。

<a id="def-gpde2-multi-index"></a>
<!-- formal-statement-start -->
> **定義（多重指数）**  
> $d$ 次元で

$$
\alpha=(\alpha_1,\ldots,\alpha_d)
\in
\mathbb N_0^d
$$

> を多重指数といい、

$$
|\alpha|
=
\alpha_1+\cdots+\alpha_d
$$

> と書く。また、十分滑らかな関数 $\varphi$ に対し

$$
\partial^\alpha\varphi
=
\partial_1^{\alpha_1}\cdots
\partial_d^{\alpha_d}\varphi
$$

> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gpde2-multi-index -->
**定義の確認**

$d=3$ で

$$
\alpha=(2,1,0)
$$

なら

$$
|\alpha|=3,
\qquad
\partial^\alpha\varphi
=
\partial_1^2\partial_2\varphi.
$$

つまり多重指数は「どの座標で何回微分したか」を一つの記号に圧縮しています。
<!-- definition-example-end -->

---

## 2. distribution の微分は部分積分を定義にする

滑らかな $f$ とテスト関数 $\varphi$ なら、一変数では

$$
\int f'(x)\varphi(x)\,dx
=
-\int f(x)\varphi'(x)\,dx
$$

です。境界項が消えるのは、$\varphi$ が領域内部にコンパクトな台を持つからです。

右辺には $f'$ が現れません。そこで、$f$ 自身が微分できなくても右辺を微分の定義として使えます。

<a id="def-gpde2-distributional-derivative"></a>
<!-- formal-statement-start -->
> **定義（distributional derivative）**  
> 開集合 $\Omega\subset\mathbb R^d$、$T\in\mathcal D'(\Omega)$、多重指数 $\alpha$ に対して、$T$ の $\alpha$ 階 distribution 微分 $\partial^\alpha T$ を

$$
\boxed{
\langle\partial^\alpha T,\varphi\rangle
=
(-1)^{|\alpha|}
\langle T,\partial^\alpha\varphi\rangle
}
$$

> により定める。ただし $\varphi\in\mathcal D(\Omega)$ は任意とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gpde2-distributional-derivative -->
**定義の確認**

一階では

$$
\langle\partial_jT,\varphi\rangle
=
-\langle T,\partial_j\varphi\rangle.
$$

二階では符号がもう一度反転し、

$$
\langle\partial_i\partial_jT,\varphi\rangle
=
\langle T,\partial_i\partial_j\varphi\rangle.
$$

GPDE1 の Poisson の distributional identity で

$$
\langle-\Delta T_u,\varphi\rangle
=
\int_\Omega u(-\Delta\varphi)
$$

と書いていたのは、まさにこの定義の二階版です。
<!-- definition-example-end -->

<a id="prop-gpde2-derivative-is-distribution"></a>
<!-- formal-statement-start -->
> **命題（distribution は何回微分しても distribution である）**  
> $T\in\mathcal D'(\Omega)$ と多重指数 $\alpha$ に対し、$\partial^\alpha T$ は $\mathcal D'(\Omega)$ の元である。さらに多重指数 $\alpha,\beta$ に対し

$$
\partial^\alpha\partial^\beta T
=
\partial^{\alpha+\beta}T
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

[GPDE1 の distribution の局所有限階評価](../GPDE1/index.md#prop-gpde1-local-finite-order)を使います。$T$ が固定コンパクト集合 $K$ 上で $m$ 階までのテスト関数微分で抑えられるなら、$\partial^\alpha T$ は $m+|\alpha|$ 階まで見れば抑えられます。

したがって distribution の微分では「元の対象が滑らかか」を確認する必要はありません。必要な微分は全てテスト関数へ移せます。

<!-- proof-start -->
### 証明

$K\subset\Omega$ をコンパクトとします。[GPDE1 の局所有限階評価](../GPDE1/index.md#prop-gpde1-local-finite-order)により、ある $m\ge0$ と $C>0$ が存在して

$$
|\langle T,\psi\rangle|
\le
C\,p_{K,m}(\psi)
$$

が $\operatorname{supp}\psi\subset K$ を満たすすべての $\psi\in\mathcal D(\Omega)$ に対して成り立ちます。

$\operatorname{supp}\varphi\subset K$ とすると、$\partial^\alpha\varphi$ の台も $K$ に含まれるので、

$$
|\langle\partial^\alpha T,\varphi\rangle|
=
|\langle T,\partial^\alpha\varphi\rangle|
\le
C\,p_{K,m}(\partial^\alpha\varphi).
$$

$p_{K,m}$ は $m$ 階までの全偏微分の最大値を見ているため、

$$
p_{K,m}(\partial^\alpha\varphi)
\le
p_{K,m+|\alpha|}(\varphi).
$$

従って

$$
|\langle\partial^\alpha T,\varphi\rangle|
\le
C\,p_{K,m+|\alpha|}(\varphi).
$$

再び [GPDE1 の distribution の局所有限階評価](../GPDE1/index.md#prop-gpde1-local-finite-order)を使えば、$\partial^\alpha T$ は distribution です。

次に任意の $\varphi\in\mathcal D(\Omega)$ に対し、

$$
\langle
\partial^\alpha\partial^\beta T,\varphi
\rangle
=
(-1)^{|\alpha|}
\langle
\partial^\beta T,\partial^\alpha\varphi
\rangle.
$$

さらに定義をもう一度使うと、

$$
\langle
\partial^\alpha\partial^\beta T,\varphi
\rangle
=
(-1)^{|\alpha|+|\beta|}
\langle
T,\partial^\beta\partial^\alpha\varphi
\rangle.
$$

テスト関数は $C^\infty$ なので古典的な混合偏微分が交換し、

$$
\partial^\beta\partial^\alpha\varphi
=
\partial^{\alpha+\beta}\varphi.
$$

従って

$$
\langle
\partial^\alpha\partial^\beta T,\varphi
\rangle
=
\langle
\partial^{\alpha+\beta}T,\varphi
\rangle.
$$

全てのテスト関数への作用が一致するので、

$$
\partial^\alpha\partial^\beta T
=
\partial^{\alpha+\beta}T.
$$
<!-- proof-end -->

この命題により distribution の世界では、微分操作そのものは失敗しません。後で問題になるのは「微分後も普通の関数として表せるか」です。

---

## 3. 古典微分できるところでは古典微分と一致する

新しい微分概念は、滑らかな関数に対して古い微分と食い違ってはいけません。

<a id="prop-gpde2-classical-compatible"></a>
<!-- formal-statement-start -->
> **命題（古典微分との整合性）**  
> $f\in C^{|\alpha|}(\Omega)$ とする。$f$ と $\partial^\alpha f$ を正則 distribution とみなすと

$$
\boxed{
\partial^\alpha T_f
=
T_{\partial^\alpha f}
}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

核心は一階だけです。

$$
-\int f\,\partial_j\varphi
=
\int(\partial_jf)\varphi
$$

を部分積分で示し、高階は一階の結果を繰り返します。テスト関数のコンパクト台が境界項を消す場所です。

<!-- proof-start -->
### 証明

まず $\alpha=e_j$ の場合を示します。任意の $\varphi\in\mathcal D(\Omega)$ を取り、

$$
K=\operatorname{supp}\varphi
$$

と置きます。$K$ は $\Omega$ の内部にあるコンパクト集合なので、$K$ と $\Omega^c$ の距離は正です。

$x_j$ 以外の座標を $x'$、$x_j$ を $t$ と書きます。固定した $x'$ に対し、

$$
\Omega_{x'}
=
\{t:(x',t)\in\Omega\}
$$

は $\mathbb R$ の開集合なので、互いに素な開区間の合併です。

$K$ と $\Omega^c$ の間には正の距離があるため、$t\mapsto\varphi(x',t)$ の台は $\Omega_{x'}$ の内部にコンパクトに収まります。従って各区間成分上で通常の一変数部分積分を行え、端点近くでは $\varphi(x',t)=0$ なので境界項は消えます。よって

$$
-\int_{\Omega_{x'}}
f(x',t)\,\partial_j\varphi(x',t)\,dt
=
\int_{\Omega_{x'}}
\partial_jf(x',t)\,\varphi(x',t)\,dt.
$$

$\varphi$ と $\partial_j\varphi$ の台は $K$ に含まれ、$f$ と $\partial_jf$ は $K$ 上で有界です。したがって両辺は絶対可積分であり、[Fubini の定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-f0-00d2c-02)を使って $x'$ について積分できます。その結果、

$$
-\int_\Omega f\,\partial_j\varphi
=
\int_\Omega(\partial_jf)\varphi.
$$

従って

$$
\langle\partial_jT_f,\varphi\rangle
=
\langle T_{\partial_jf},\varphi\rangle.
$$

任意のテスト関数で作用が一致するので

$$
\partial_jT_f=T_{\partial_jf}.
$$

一般の多重指数 $\alpha$ については、この一階の等式を $|\alpha|$ 回繰り返せば

$$
\partial^\alpha T_f
=
T_{\partial^\alpha f}
$$

を得ます。
<!-- proof-end -->

distribution 微分は古典微分を捨てたのではなく、古典微分を含むように拡張したものです。

---

## 4. 極限と微分は distribution の意味では自動的に交換する

古典関数の極限では、関数が収束しても導関数が収束するとは限りません。distribution の収束では、微分はテスト関数側に固定されるため事情が非常に単純です。

<a id="prop-gpde2-derivative-continuous"></a>
<!-- formal-statement-start -->
> **命題（distribution 微分作用素の連続性）**  
> $T_n,T\in\mathcal D'(\Omega)$ とし、

$$
T_n\to T
\quad\text{in }\mathcal D'(\Omega)
$$

> とする。このとき任意の多重指数 $\alpha$ に対して

$$
\partial^\alpha T_n
\to
\partial^\alpha T
\quad\text{in }\mathcal D'(\Omega)
$$

> が成り立つ。
<!-- formal-statement-end -->

任意の固定した $\varphi\in\mathcal D(\Omega)$ に対し、

$$
\langle\partial^\alpha T_n,\varphi\rangle
=
(-1)^{|\alpha|}
\langle T_n,\partial^\alpha\varphi\rangle.
$$

$\partial^\alpha\varphi$ も固定されたテスト関数なので、distribution 収束の定義から

$$
\langle T_n,\partial^\alpha\varphi\rangle
\to
\langle T,\partial^\alpha\varphi\rangle.
$$

従って結論が得られます。

この「極限を取ってから微分してもよい」という安定性は、mollifier や近似解を使う議論の土台になります。

---

## 5. Heaviside の微分は Dirac delta になる

一変数で Heaviside 関数を

$$
H(x)
=
\begin{cases}
0,&x<0,\\
1,&x>0
\end{cases}
$$

とします。$x=0$ の値は Lebesgue 積分に影響しないので任意です。

古典的には $x\ne0$ で

$$
H'(x)=0
$$

ですが、原点で jump しています。distribution 微分はこの jump を失いません。

<a id="prop-gpde2-heaviside"></a>
<!-- formal-statement-start -->
> **命題（Heaviside の distribution 微分）**  
> $\mathbb R$ 上で

$$
\boxed{
H'=\delta_0
}
$$

> が distribution の意味で成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

定義から $H'$ をテスト関数へ作用させると、半直線上の $\varphi'$ の積分になります。コンパクト台により無限遠の値は 0 となり、原点の値だけが残ります。

<!-- proof-start -->
### 証明

任意の $\varphi\in\mathcal D(\mathbb R)$ に対し、

$$
\langle H',\varphi\rangle
=
-\langle T_H,\varphi'\rangle
=
-\int_{\mathbb R}H(x)\varphi'(x)\,dx.
$$

$H=0$ on $(-\infty,0)$、$H=1$ on $(0,\infty)$ なので

$$
\langle H',\varphi\rangle
=
-\int_0^\infty\varphi'(x)\,dx.
$$

$\varphi$ はコンパクト台を持つため、十分大きい $R$ で $\varphi(R)=0$ です。従って

$$
-\int_0^\infty\varphi'(x)\,dx
=
-\left[\varphi(x)\right]_0^\infty
=
\varphi(0).
$$

Dirac delta の定義から

$$
\varphi(0)
=
\langle\delta_0,\varphi\rangle.
$$

全てのテスト関数への作用が一致するので

$$
H'=\delta_0.
$$
<!-- proof-end -->

点ごとに $H'=0$ とだけ記録すると jump は消えてしまいます。distribution 微分は「微分できない一点」を、delta という集中項に変換して保持します。

---

## 6. 一般の jump では「jump の大きさ × delta」が出る

Heaviside は jump が 1 の最小例でした。区分的に滑らかな関数でも同じ機構が働きます。

一変数の点 $a$ で左右極限が存在するとき、

$$
[f]_a
=
f(a+)-f(a-)
$$

を jump と書きます。

<a id="prop-gpde2-jump-formula"></a>
<!-- formal-statement-start -->
> **命題（有限個の jump を持つ関数の distribution 微分）**  
> $f\in L^1_{\mathrm{loc}}(\mathbb R)$ とする。有限個の点

$$
a_1<\cdots<a_N
$$

> を除いて $f$ は $C^1$ であり、各 $a_k$ で有限な左右極限を持つとする。また各滑らかな区間上の古典微分をつないだ関数 $f'_{\mathrm{pw}}$ が $L^1_{\mathrm{loc}}(\mathbb R)$ に属するとする。このとき

$$
\boxed{
Df
=
T_{f'_{\mathrm{pw}}}
+
\sum_{k=1}^N[f]_{a_k}\delta_{a_k}
}
$$

> が distribution の意味で成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

テスト関数の台を含む有限区間を取り、jump 点で積分区間を分割します。各区間では普通の部分積分ができ、内部端点から出る境界項を集めると

$$
f(a_k+)-f(a_k-)
$$

が係数として残ります。

<!-- proof-start -->
### 証明

任意の $\varphi\in\mathcal D(\mathbb R)$ を取ります。台を含む $A<B$ を、$A<a_1$、$a_N<B$ となるように取ります。さらに $\varphi$ は $A,B$ の近くで 0 とします。

distribution 微分の定義から

$$
\langle Df,\varphi\rangle
=
-\int_A^B f(x)\varphi'(x)\,dx.
$$

積分を

$$
(A,a_1),\ (a_1,a_2),\ldots,\ (a_N,B)
$$

に分けます。各区間では $f$ は $C^1$ なので部分積分でき、

$$
-\int_c^d f\varphi'
=
-\left[f\varphi\right]_c^d
+
\int_c^d f'\varphi.
$$

全区間の積分項を足すと

$$
\int_A^B f'_{\mathrm{pw}}(x)\varphi(x)\,dx
$$

になります。

外側の端点 $A,B$ では $\varphi=0$ なので境界項は消えます。内部の $a_k$ では、左区間から

$$
-f(a_k-)\varphi(a_k)
$$

が出て、右区間から

$$
+f(a_k+)\varphi(a_k)
$$

が出ます。従って合計は

$$
[f]_{a_k}\varphi(a_k).
$$

以上より

$$
\langle Df,\varphi\rangle
=
\int_{\mathbb R}f'_{\mathrm{pw}}\varphi
+
\sum_{k=1}^N[f]_{a_k}\varphi(a_k).
$$

右辺は

$$
\left\langle
T_{f'_{\mathrm{pw}}}
+
\sum_{k=1}^N[f]_{a_k}\delta_{a_k},
\varphi
\right\rangle
$$

そのものです。よって主張が従います。
<!-- proof-end -->

### 例：区間の指示関数

$$
u=1_{(a,b)}
$$

では $a$ で $0\to1$、$b$ で $1\to0$ と jump するので、

$$
[u]_a=1,
\qquad
[u]_b=-1.
$$

区間内部と外部では古典微分は 0 です。従って

$$
\boxed{
D1_{(a,b)}
=
\delta_a-\delta_b
}
$$

です。

「関数が一定だから微分は 0」ではなく、**どこで値が跳んだか** まで distribution 微分が記録しています。

---

## 7. weak derivative は「distribution 微分が再び関数で表せる」場合

distribution はいつでも微分できます。しかし Sobolev 空間で欲しいのは、微分した結果が delta のような一般 distribution ではなく、再び局所可積分関数として表せる場合です。

<a id="def-gpde2-weak-derivative"></a>
<!-- formal-statement-start -->
> **定義（weak derivative）**  
> $u,v\in L^1_{\mathrm{loc}}(\Omega)$ とする。$v$ が $u$ の $x_j$ に関する **弱微分**であるとは、任意の $\varphi\in\mathcal D(\Omega)$ に対して

$$
\boxed{
\int_\Omega u\,\partial_j\varphi
=
-\int_\Omega v\,\varphi
}
$$

> が成り立つことをいう。このとき

$$
\partial_jT_u=T_v
$$

> と同値である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gpde2-weak-derivative -->
**定義の確認：$|x|$ は原点で古典微分できないが弱微分できる**

$\mathbb R$ 上で

$$
u(x)=|x|,
\qquad
v(x)
=
\begin{cases}
-1,&x<0,\\
1,&x>0
\end{cases}
$$

とします。

任意の $\varphi\in\mathcal D(\mathbb R)$ に対し、原点で積分を分けると

$$
\int_{\mathbb R}|x|\varphi'(x)\,dx
=
\int_{-\infty}^0(-x)\varphi'(x)\,dx
+
\int_0^\infty x\varphi'(x)\,dx.
$$

それぞれ部分積分すると、無限遠ではコンパクト台により境界項が消え、原点では $x=0$ が掛かるため境界項が消えます。従って

$$
\int_{\mathbb R}|x|\varphi'
=
\int_{-\infty}^0\varphi
-
\int_0^\infty\varphi.
$$

右辺は

$$
-\int_{\mathbb R}v(x)\varphi(x)\,dx
$$

です。よって $v=\operatorname{sgn}x$ は $|x|$ の弱微分です。
<!-- definition-example-end -->

ここで Heaviside と対比すると重要な違いが見えます。

$$
D|x|
=
T_{\operatorname{sgn}x}
$$

は正則 distribution なので弱微分があります。一方、

$$
DH
=
\delta_0
$$

であり、GPDE1 で $\delta_0$ は正則 distribution ではないことを示しました。従って Heaviside 関数には $L^1_{\mathrm{loc}}$ 関数としての弱微分は存在しません。

つまり

$$
\boxed{
\text{distribution 微分は常に存在}
\quad\text{だが}\quad
\text{弱微分は常には存在しない}
}
$$

という区別が本質です。

---

## 8. mollifier：狭い範囲だけを平均して滑らかにする

粗い関数を直接扱うだけでなく、一度滑らかにしてから計算し、最後に元へ戻る方法が欲しくなります。そのための標準道具が mollifier です。

GPDE1 の非負 bump 関数 $\eta\in C_c^\infty(\mathbb R^d)$ を取り、

$$
\eta\ge0,
\qquad
\operatorname{supp}\eta\subset\overline{B(0,1)},
\qquad
\eta\not\equiv0
$$

とします。

$$
c
=
\left(
\int_{\mathbb R^d}\eta(x)\,dx
\right)^{-1},
\qquad
\rho=c\eta
$$

と置けば、

$$
\rho\ge0,
\qquad
\int\rho=1,
\qquad
\operatorname{supp}\rho\subset\overline{B(0,1)}.
$$

<a id="def-gpde2-mollifier"></a>
<!-- formal-statement-start -->
> **定義（mollifier）**  
> 非負関数

$$
\rho\in C_c^\infty(\mathbb R^d)
$$

> が

$$
\int_{\mathbb R^d}\rho(x)\,dx=1,
\qquad
\operatorname{supp}\rho\subset\overline{B(0,1)}
$$

> を満たすとき、$\rho$ を mollifier と呼ぶ。$\varepsilon>0$ に対し

$$
\boxed{
\rho_\varepsilon(x)
=
\varepsilon^{-d}
\rho\left(\frac{x}{\varepsilon}\right)
}
$$

> と定める。

この縮小族は、[FOU3 の approximate identity](../FOU3/index.md#def-fou3-approximate-identity)と同じ「全質量を保ったまま原点へ集中する」機構の多次元・コンパクト台版です。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gpde2-mollifier -->
**定義の確認：尺度変換で全質量は 1 のまま**

変数変換 $x=\varepsilon z$ を使うと

$$
\int_{\mathbb R^d}\rho_\varepsilon(x)\,dx
=
\int_{\mathbb R^d}
\varepsilon^{-d}
\rho\left(\frac{x}{\varepsilon}\right)\,dx
=
\int_{\mathbb R^d}\rho(z)\,dz
=
1.
$$

また $\rho(x/\varepsilon)$ が非零なら

$$
\left|\frac{x}{\varepsilon}\right|\le1
$$

なので

$$
\operatorname{supp}\rho_\varepsilon
\subset
\overline{B(0,\varepsilon)}.
$$

高さはおよそ $\varepsilon^{-d}$ に増えますが、台の体積がおよそ $\varepsilon^d$ に縮むので全質量は 1 に保たれます。
<!-- definition-example-end -->

多重指数 $\alpha$ に対して合成関数の微分公式から

$$
\partial^\alpha\rho_\varepsilon(x)
=
\varepsilon^{-d-|\alpha|}
(\partial^\alpha\rho)\left(\frac{x}{\varepsilon}\right).
$$

微分するほど $\varepsilon^{-|\alpha|}$ の尺度が追加されます。後続の estimate ではこの尺度を意識する必要があります。

---

## 9. 局所 mollification を定義する

$\Omega$ の境界近くで convolution を取ると、kernel が $\Omega$ の外へはみ出すことがあります。そこでまず内部だけで定義します。

$\varepsilon>0$ に対して

$$
\Omega_\varepsilon
=
\{x\in\Omega:
\overline{B(x,\varepsilon)}\subset\Omega\}
$$

と置きます。

<a id="def-gpde2-local-mollification"></a>
<!-- formal-statement-start -->
> **定義（局所 mollification）**  
> $u\in L^1_{\mathrm{loc}}(\Omega)$ とする。$x\in\Omega_\varepsilon$ に対して

$$
\boxed{
u_\varepsilon(x)
=
(\rho_\varepsilon*u)(x)
=
\int_\Omega
\rho_\varepsilon(x-y)u(y)\,dy
}
$$

> と定める。これを $u$ の局所 mollification という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gpde2-local-mollification -->
**定義の確認**

$x\in\Omega_\varepsilon$ なら、$y\mapsto\rho_\varepsilon(x-y)$ の台は

$$
\overline{B(x,\varepsilon)}
$$

に含まれ、これは $\Omega$ の内部にあります。

従って積分は $u$ の局所可積分性だけで有限になります。全空間で $u\in L^1$ を仮定する必要はありません。
<!-- definition-example-end -->

---

## 10. mollification は粗い関数を $C^\infty$ にする

<a id="thm-gpde2-mollification-smooth"></a>
<!-- formal-statement-start -->
> **定理（mollification の平滑化）**  
> $u\in L^1_{\mathrm{loc}}(\Omega)$ とする。各 $\varepsilon>0$ に対し

$$
u_\varepsilon\in C^\infty(\Omega_\varepsilon)
$$

> であり、任意の多重指数 $\alpha$ に対して

$$
\boxed{
\partial^\alpha u_\varepsilon(x)
=
\int_\Omega
\partial^\alpha\rho_\varepsilon(x-y)u(y)\,dy
}
$$

> が $x\in\Omega_\varepsilon$ で成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

微分するのは $u$ ではなく kernel の $\rho_\varepsilon$ です。

$$
u_\varepsilon
=
\rho_\varepsilon*u
\quad\Longrightarrow\quad
\partial^\alpha u_\varepsilon
=
(\partial^\alpha\rho_\varepsilon)*u.
$$

$x$ を少し動かしても kernel の台は同じコンパクト近傍に収まり、kernel の全階微分は有界です。したがって差分商を $|u|$ の局所積分で支配でき、積分と微分を交換できます。

<!-- proof-start -->
### 証明

まず一階微分を示します。$x_0\in\Omega_\varepsilon$ を固定します。

$\overline{B(x_0,\varepsilon)}$ は $\Omega$ の内部にあるので、十分小さい $r>0$ を取れば

$$
\overline{B(x_0,\varepsilon+r)}
\subset\Omega.
$$

$x\in B(x_0,r/2)$ なら、$\rho_\varepsilon(x-y)$ が非零になり得る $y$ は

$$
y\in B(x,\varepsilon)
\subset
B(x_0,\varepsilon+r)
$$

に限られます。

$j$ を固定し、$h\to0$ とします。差分商は

$$
\frac{
u_\varepsilon(x+he_j)-u_\varepsilon(x)
}{h}
=
\int_\Omega
u(y)
\frac{
\rho_\varepsilon(x+he_j-y)-\rho_\varepsilon(x-y)
}{h}
\,dy.
$$

平均値の定理により、十分小さい $h$ では kernel の差分商の絶対値は

$$
\sup_z|\partial_j\rho_\varepsilon(z)|
$$

で抑えられます。また積分に寄与する $y$ は固定コンパクト集合

$$
\overline{B(x_0,\varepsilon+r)}
$$

に入ります。

従って被積分関数は

$$
|u(y)|
\sup_z|\partial_j\rho_\varepsilon(z)|
1_{\overline{B(x_0,\varepsilon+r)}}(y)
$$

に支配されます。$u\in L^1_{\mathrm{loc}}(\Omega)$ なのでこれは可積分です。

各固定 $y$ について差分商は

$$
\partial_j\rho_\varepsilon(x-y)
$$

へ収束するので、[優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01)により

$$
\partial_j u_\varepsilon(x)
=
\int_\Omega
u(y)\partial_j\rho_\varepsilon(x-y)\,dy.
$$

同じ議論を kernel の高階微分へ繰り返せるため、任意の多重指数 $\alpha$ に対して

$$
\partial^\alpha u_\varepsilon(x)
=
\int_\Omega
u(y)\partial^\alpha\rho_\varepsilon(x-y)\,dy.
$$

従って $u_\varepsilon\in C^\infty(\Omega_\varepsilon)$ です。
<!-- proof-end -->

ここで重要なのは、$u$ の微分を一度も要求していないことです。滑らかさは kernel 側から供給されます。

---

## 11. mollifier は元の関数へ局所 $L^1$ で戻る

平滑化しても、元の関数から離れてしまえば意味がありません。次は

$$
u_\varepsilon\to u
$$

を局所 $L^1$ で示します。

その前に、後の証明で必要になる多次元の translation estimate を確認します。一変数での対応する結果は [FOU3](../FOU3/index.md#lem-fou3-l1-translation) にありますが、ここでは PDE で使う $\mathbb R^d$ 版を閉じます。

<a id="lem-gpde2-l1-translation-rd"></a>
<!-- formal-statement-start -->
> **補題（Rd の平行移動補題）**  
> $w\in L^1(\mathbb R^d)$ とし、
>
> $$
> (\tau_h w)(x)=w(x-h),
> \qquad h\in\mathbb R^d
> $$
>
> と置く。このとき
>
> $$
> \boxed{
> \|\tau_h w-w\|_{L^1(\mathbb R^d)}
> \to0
> \qquad
> (h\to0)
> }
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

[MT7 の $C_c$ の $L^1$ 稠密性](../MT7/index.md#thm-mt7-cc-dense)で $w$ を連続コンパクト台関数へ近似します。その関数では一様連続性が点ごとの差を一様に小さくし、平行移動が $L^1$ norm を保つことが近似誤差を元の $w$ へ戻します。

<!-- proof-start -->
### 証明

任意の $\eta>0$ を取ります。[MT7 の $C_c$ の $L^1$ 稠密性](../MT7/index.md#thm-mt7-cc-dense)により、ある $g\in C_c(\mathbb R^d)$ を

$$
\|w-g\|_1<\eta
$$

となるように取れます。

平行移動は Lebesgue 測度を保つので、

$$
\|\tau_h(w-g)\|_1
=
\|w-g\|_1.
$$

従って三角不等式から

$$
\|\tau_h w-w\|_1
\le
2\|w-g\|_1
+
\|\tau_h g-g\|_1.
$$

$\operatorname{supp}g$ は compact です。$|h|\le1$ の範囲では $\tau_hg-g$ の台はある固定 compact 集合 $K$ に含まれます。また $g$ は一様連続なので

$$
\sup_x|g(x-h)-g(x)|
\to0
\qquad
(h\to0).
$$

よって

$$
\|\tau_hg-g\|_1
\le
|K|
\sup_x|g(x-h)-g(x)|
\to0.
$$

したがって

$$
\limsup_{h\to0}\|\tau_hw-w\|_1
\le2\eta.
$$

$\eta>0$ は任意なので

$$
\|\tau_hw-w\|_1\to0.
$$
<!-- proof-end -->

<a id="thm-gpde2-mollifier-l1loc"></a>
<!-- formal-statement-start -->
> **定理（mollifier の局所 L1 近似）**  
> $u\in L^1_{\mathrm{loc}}(\Omega)$ とする。任意のコンパクト集合 $K\subset\Omega$ に対して、十分小さい $\varepsilon>0$ では $K\subset\Omega_\varepsilon$ であり、

$$
\boxed{
\|u_\varepsilon-u\|_{L^1(K)}
\to0
\qquad
(\varepsilon\downarrow0)
}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

mollification を

$$
u_\varepsilon(x)
=
\int\rho(z)u(x-\varepsilon z)\,dz
$$

と書き換えます。すると誤差は「小さい平行移動による差」の平均です。

$$
u_\varepsilon-u
=
\int\rho(z)
\{u(\cdot-\varepsilon z)-u\}\,dz.
$$

したがって前の補題で平行移動誤差を 0 へ落とせます。

<!-- proof-start -->
### 証明

$K\subset\Omega$ はコンパクトなので、ある $r>0$ が存在して

$$
K_r
=
\{x\in\mathbb R^d:
\operatorname{dist}(x,K)\le r\}
\subset\Omega
$$

となります。

$$
w(x)
=
u(x)1_{K_r}(x)
$$

として $\mathbb R^d$ 全体へ 0 で延長します。$u$ は $K_r$ 上で可積分なので

$$
w\in L^1(\mathbb R^d).
$$

$0<\varepsilon<r/2$ とし、$x\in K$、$|z|\le1$ とします。このとき

$$
x-\varepsilon z\in K_r.
$$

従って

$$
u(x)=w(x),
\qquad
u(x-\varepsilon z)=w(x-\varepsilon z).
$$

変数変換 $y=x-\varepsilon z$ を使うと、

$$
u_\varepsilon(x)
=
\int_{\mathbb R^d}
\rho(z)u(x-\varepsilon z)\,dz.
$$

よって

$$
|u_\varepsilon(x)-u(x)|
\le
\int_{\mathbb R^d}
\rho(z)
|w(x-\varepsilon z)-w(x)|
\,dz.
$$

$K$ 上で積分し、[Tonelli の定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-tonelli)を使うと

$$
\|u_\varepsilon-u\|_{L^1(K)}
\le
\int_{\mathbb R^d}
\rho(z)
\|w(\cdot-\varepsilon z)-w\|_{L^1(\mathbb R^d)}
\,dz.
$$

$\rho$ の台では $|z|\le1$ なので、右辺は

$$
\sup_{|h|\le\varepsilon}
\|w(\cdot-h)-w\|_1
\int\rho(z)\,dz
$$

以下です。

$\int\rho=1$ であり、[Rd の平行移動補題](#lem-gpde2-l1-translation-rd)から

$$
\sup_{|h|\le\varepsilon}
\|w(\cdot-h)-w\|_1
\to0
$$

です。従って

$$
\|u_\varepsilon-u\|_{L^1(K)}
\to0.
$$
<!-- proof-end -->

この定理は「mollifier で滑らかにしても、局所的には元の関数へ戻れる」ことを保証します。

GPDE3 では $1\le p<\infty$ に対する $L^p_{\mathrm{loc}}$ 近似へ拡張し、Sobolev norm での smooth approximation へ進みます。

---

## 12. 正則 distribution への埋め込みは一対一である

GPDE1 では

$$
f\in L^1_{\mathrm{loc}}(\Omega)
\quad\Longrightarrow\quad
T_f\in\mathcal D'(\Omega)
$$

を示しました。ここで逆に、$T_f$ が 0 なら $f$ 自身も ほとんど至る所（almost everywhere; a.e.）で 0 であることを示せます。

<a id="prop-gpde2-regular-injective"></a>
<!-- formal-statement-start -->
> **命題（正則 distribution 埋め込みの単射性）**  
> $f,g\in L^1_{\mathrm{loc}}(\Omega)$ とする。もし

$$
T_f=T_g
$$

> なら

$$
f=g
\quad\text{a.e. on }\Omega.
$$

> 特に $T_f=0$ なら $f=0$ a.e. である。
<!-- formal-statement-end -->

### 証明の見取り図

$T_f=0$ とします。内部点 $x$ で kernel

$$
y\mapsto\rho_\varepsilon(x-y)
$$

をテスト関数として入れると、

$$
f_\varepsilon(x)=0.
$$

一方 mollifier の局所 $L^1$ 近似で

$$
f_\varepsilon\to f.
$$

左辺が全て 0 なら、極限の $f$ も局所 $L^1$ で 0 です。

<!-- proof-start -->
### 証明

まず $T_f=0$ を仮定します。

コンパクト集合 $K\subset\Omega$ を取り、十分小さい $\varepsilon>0$ で $K\subset\Omega_\varepsilon$ とします。任意の $x\in K$ に対して

$$
\psi_{x,\varepsilon}(y)
=
\rho_\varepsilon(x-y)
$$

と置きます。

$\psi_{x,\varepsilon}$ は $C^\infty$ で、その台は $\overline{B(x,\varepsilon)}\subset\Omega$ に入るので

$$
\psi_{x,\varepsilon}\in\mathcal D(\Omega).
$$

$T_f=0$ だから

$$
0
=
\langle T_f,\psi_{x,\varepsilon}\rangle
=
\int_\Omega
f(y)\rho_\varepsilon(x-y)\,dy
=
f_\varepsilon(x).
$$

従って $f_\varepsilon$ は $K$ 上で恒等的に 0 です。

mollifier の局所 $L^1$ 近似から

$$
\|f-f_\varepsilon\|_{L^1(K)}
\to0.
$$

しかし $f_\varepsilon=0$ on $K$ なので

$$
\|f\|_{L^1(K)}=0.
$$

よって $f=0$ a.e. on $K$ です。

$\Omega$ は可算個の内部コンパクト集合、例えば閉球で被覆できるので、

$$
f=0
\quad\text{a.e. on }\Omega.
$$

一般に $T_f=T_g$ なら $T_{f-g}=0$ へ適用して

$$
f=g
\quad\text{a.e.}
$$

を得ます。
<!-- proof-end -->

これで「正則 distribution として等しい」と「関数が a.e. で等しい」を往復できるようになりました。

---

## 13. weak derivative は a.e. の意味で一意である

<a id="prop-gpde2-weak-unique"></a>
<!-- formal-statement-start -->
> **命題（weak derivative の一意性）**  
> $u\in L^1_{\mathrm{loc}}(\Omega)$ とする。$v,w\in L^1_{\mathrm{loc}}(\Omega)$ がともに $u$ の $x_j$ に関する弱微分なら

$$
\boxed{
v=w
\quad\text{a.e. on }\Omega
}
$$

> が成り立つ。
<!-- formal-statement-end -->

実際、弱微分の定義から

$$
\partial_jT_u=T_v
$$

かつ

$$
\partial_jT_u=T_w.
$$

従って

$$
T_v=T_w.
$$

前節の単射性から

$$
v=w
\quad\text{a.e.}
$$

です。

したがって今後は弱微分が存在するとき、それを

$$
\partial_ju
$$

と書いてよくなります。ただし等号は点ごとの代表値ではなく a.e. 同値類として読む必要があります。この点が GPDE3 の Sobolev 空間へ直結します。

---

## 14. 弱微分と mollification は交換する

ここまでの準備で、本章の中心技法を閉じます。

粗い $u$ に弱微分 $v$ があるとします。一度 mollify して古典微分すると、その結果は $v$ 自身を mollify したものになります。

<a id="thm-gpde2-weak-mollifier-commute"></a>
<!-- formal-statement-start -->
> **定理（弱微分と mollification の交換）**  
> $u,v\in L^1_{\mathrm{loc}}(\Omega)$ とし、$v$ が $u$ の $x_j$ に関する弱微分であるとする。このとき $x\in\Omega_\varepsilon$ で

$$
\boxed{
\partial_j u_\varepsilon(x)
=
v_\varepsilon(x)
}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

平滑化定理から

$$
\partial_j u_\varepsilon(x)
=
\int u(y)\partial_{x_j}\rho_\varepsilon(x-y)\,dy.
$$

kernel の変数 $x-y$ に注意すると

$$
\partial_{x_j}\rho_\varepsilon(x-y)
=
-\partial_{y_j}\rho_\varepsilon(x-y).
$$

そこで

$$
y\mapsto\rho_\varepsilon(x-y)
$$

を weak derivative の定義に入れると、微分が $u$ から $v$ へ移ります。

<!-- proof-start -->
### 証明

$x\in\Omega_\varepsilon$ を固定します。

平滑化定理から

$$
\partial_j u_\varepsilon(x)
=
\int_\Omega
u(y)\partial_{x_j}\rho_\varepsilon(x-y)\,dy.
$$

合成関数の微分公式 により

$$
\partial_{x_j}\rho_\varepsilon(x-y)
=
-\partial_{y_j}\rho_\varepsilon(x-y).
$$

従って

$$
\partial_j u_\varepsilon(x)
=
-\int_\Omega
u(y)\partial_{y_j}\rho_\varepsilon(x-y)\,dy.
$$

ここで

$$
\psi(y)=\rho_\varepsilon(x-y)
$$

と置きます。$\psi$ の台は

$$
\overline{B(x,\varepsilon)}
\subset\Omega
$$

に入り、$\psi\in C_c^\infty(\Omega)$ です。

$v$ が $u$ の弱微分なので、

$$
\int_\Omega
u(y)\partial_{y_j}\psi(y)\,dy
=
-\int_\Omega
v(y)\psi(y)\,dy.
$$

両辺に $-1$ を掛け、

$$
-\int_\Omega
u(y)\partial_{y_j}\rho_\varepsilon(x-y)\,dy
=
\int_\Omega
v(y)\rho_\varepsilon(x-y)\,dy.
$$

右辺は $v_\varepsilon(x)$ です。従って

$$
\partial_j u_\varepsilon(x)
=
v_\varepsilon(x).
$$
<!-- proof-end -->

この定理を使うと、

$$
\text{粗い }u
\quad\longrightarrow\quad
u_\varepsilon\in C^\infty
\quad\longrightarrow\quad
\partial_j u_\varepsilon
\quad\longrightarrow\quad
v_\varepsilon
\quad\longrightarrow\quad
v
$$

という流れで、滑らかな関数上の計算を弱微分へ戻せます。

これが後続 PDE で繰り返し使う

$$
\boxed{
\text{平滑化して証明する}
\;\to\;
\text{一様な評価を得る}
\;\to\;
\text{極限へ戻る}
}
$$

という標準戦略の最初の形です。

---

## 15. 二つの粗さを比較する：cusp と jump

本章の内容を $|x|$ と $H$ で比較します。

### $u(x)=|x|$

原点で古典微分は存在しませんが、関数自体は連続です。

$$
D|x|
=
T_{\operatorname{sgn}x}.
$$

右辺は局所可積分関数で表せるので、一階弱微分があります。

さらに $\operatorname{sgn}x$ は原点で $-1\to1$ と jump するので、

$$
D(\operatorname{sgn}x)
=
2\delta_0.
$$

従って

$$
\boxed{
D^2|x|
=
2\delta_0
}
$$

です。

### $u(x)=H(x)$

関数自体が原点で jump し、

$$
DH=\delta_0.
$$

一階微分の時点で正則 distribution から外れます。従って $H$ は一階弱微分を持ちません。

この比較は GPDE3 で非常に重要です。

- cusp は一階 Sobolev regularity を許すことがある。
- jump は一階 Sobolev regularity を壊すことがある。

ただし Sobolev 空間そのものの定義と membership 判定は次章で行います。

---

## 16. GPDE3 へ：微分可能性を関数空間の条件にする

本章で得た構造は

$$
u\in L^1_{\mathrm{loc}}
\quad\text{かつ}\quad
\partial^\alpha T_u
=
T_{v_\alpha}
$$

という形です。

次に問うべきことは、

> どの階数まで、どの $L^p$ class に属する弱微分が存在するか。

です。

GPDE3 では

$$
W^{k,p}(\Omega)
=
\{
u\in L^p(\Omega):
\partial^\alpha u\in L^p(\Omega)
\text{ for }|\alpha|\le k
\}
$$

という Sobolev 空間を導入します。

そこで初めて

- $|x|$ や区分線形関数がどの Sobolev 空間に入るか。
- jump 関数がなぜ $W^{1,p}$ から外れるか。
- 弱微分を持つ関数列の極限をどう閉じるか。
- mollifier による smooth approximation を $W^{k,p}$ norm でどう扱うか。
- $W^{k,p}$ が完備である理由。

を体系化します。

---

# 演習

## GPDE2-A01 古典微分との一致を直接確認する

- Level: A
- 目安時間: 12分

$\mathbb R$ 上で

$$
f(x)=x^2e^{-x^2}
$$

とする。

1. 古典微分 $f'(x)$ を求めよ。
2. 任意の $\varphi\in\mathcal D(\mathbb R)$ に対し

$$
\langle DT_f,\varphi\rangle
=
\int_{\mathbb R}f'(x)\varphi(x)\,dx
$$

を部分積分で示せ。

<!-- solution-start -->
### 詳細解答

1. 積の微分から

$$
f'(x)
=
2xe^{-x^2}
+
x^2(-2x)e^{-x^2}.
$$

従って

$$
\boxed{
f'(x)
=
(2x-2x^3)e^{-x^2}
}
$$

です。

2. distribution 微分の定義から

$$
\langle DT_f,\varphi\rangle
=
-\int_{\mathbb R}f(x)\varphi'(x)\,dx.
$$

$\varphi$ はコンパクト台を持つので、ある $R>0$ が存在して $\varphi=0$ on $|x|\ge R$ です。従って

$$
-\int_{\mathbb R}f\varphi'
=
-\int_{-R}^Rf\varphi'.
$$

部分積分すると

$$
-\int_{-R}^Rf\varphi'
=
-\left[f\varphi\right]_{-R}^R
+
\int_{-R}^Rf'\varphi.
$$

$\varphi(\pm R)=0$ なので境界項は 0 です。よって

$$
\langle DT_f,\varphi\rangle
=
\int_{\mathbb R}
(2x-2x^3)e^{-x^2}\varphi(x)\,dx.
$$

したがって

$$
DT_f=T_{f'}.
$$
<!-- solution-end -->

## GPDE2-A02 Heaviside の微分を定義から計算する

- Level: A
- 目安時間: 10分

Heaviside 関数 $H$ に対して

$$
DH=\delta_0
$$

を distribution 微分の定義から証明せよ。また、なぜ $H$ に $L^1_{\mathrm{loc}}$ 関数としての弱微分が存在しないか説明せよ。

<!-- solution-start -->
### 詳細解答

任意の $\varphi\in\mathcal D(\mathbb R)$ に対し、

$$
\langle DH,\varphi\rangle
=
-\int_{\mathbb R}H(x)\varphi'(x)\,dx.
$$

$H=0$ on $x<0$、$H=1$ on $x>0$ なので

$$
\langle DH,\varphi\rangle
=
-\int_0^\infty\varphi'(x)\,dx.
$$

$\varphi$ は十分大きい $x$ で 0 だから

$$
-\int_0^\infty\varphi'
=
-\left[\varphi\right]_0^\infty
=
\varphi(0).
$$

Dirac delta の定義より

$$
\varphi(0)
=
\langle\delta_0,\varphi\rangle.
$$

従って

$$
\boxed{DH=\delta_0}.
$$

もし $v\in L^1_{\mathrm{loc}}(\mathbb R)$ が $H$ の弱微分なら、

$$
DH=T_v
$$

でなければなりません。しかし GPDE1 で $\delta_0$ は正則 distribution ではないことを証明しました。

$$
DH=\delta_0
$$

なので、そのような $v$ は存在しません。
<!-- solution-end -->

## GPDE2-A03 mollifier の尺度を確認する

- Level: A
- 目安時間: 12分

$\rho$ を本章の mollifier とし、

$$
\rho_\varepsilon(x)
=
\varepsilon^{-d}\rho(x/\varepsilon)
$$

とする。

1. $\int\rho_\varepsilon=1$ を示せ。
2. $\operatorname{supp}\rho_\varepsilon\subset\overline{B(0,\varepsilon)}$ を示せ。
3. 多重指数 $\alpha$ に対し

$$
\partial^\alpha\rho_\varepsilon(x)
=
\varepsilon^{-d-|\alpha|}
(\partial^\alpha\rho)(x/\varepsilon)
$$

を示せ。

<!-- solution-start -->
### 詳細解答

1. $x=\varepsilon z$ と変数変換すると $dx=\varepsilon^d dz$ なので、

$$
\int_{\mathbb R^d}\rho_\varepsilon(x)\,dx
=
\int_{\mathbb R^d}
\varepsilon^{-d}\rho(x/\varepsilon)\,dx
=
\int_{\mathbb R^d}\rho(z)\,dz
=
1.
$$

2. $\rho_\varepsilon(x)\ne0$ なら

$$
\rho(x/\varepsilon)\ne0.
$$

$\operatorname{supp}\rho\subset\overline{B(0,1)}$ だから

$$
|x/\varepsilon|\le1.
$$

従って $|x|\le\varepsilon$ であり、

$$
\operatorname{supp}\rho_\varepsilon
\subset
\overline{B(0,\varepsilon)}.
$$

3. 一回 $x_j$ で微分するごとに 合成関数の微分公式 から $\varepsilon^{-1}$ が一つ出ます。全体には最初から $\varepsilon^{-d}$ があるので、合計 $|\alpha|$ 回微分すると

$$
\partial^\alpha\rho_\varepsilon(x)
=
\varepsilon^{-d}\varepsilon^{-|\alpha|}
(\partial^\alpha\rho)(x/\varepsilon).
$$

従って

$$
\boxed{
\partial^\alpha\rho_\varepsilon(x)
=
\varepsilon^{-d-|\alpha|}
(\partial^\alpha\rho)(x/\varepsilon)
}.
$$
<!-- solution-end -->

## GPDE2-A04 $|x|$ の弱微分を直接検証する

- Level: A
- 目安時間: 15分

$$
u(x)=|x|,
\qquad
v(x)=\operatorname{sgn}x
$$

とする。任意の $\varphi\in\mathcal D(\mathbb R)$ に対して

$$
\int_{\mathbb R}u\varphi'
=
-\int_{\mathbb R}v\varphi
$$

を、原点で積分区間を分けて示せ。

<!-- solution-start -->
### 詳細解答

左辺を

$$
\int_{-\infty}^0(-x)\varphi'(x)\,dx
+
\int_0^\infty x\varphi'(x)\,dx
$$

に分けます。

負の半直線では

$$
\int_{-\infty}^0(-x)\varphi'
=
\left[(-x)\varphi\right]_{-\infty}^0
+
\int_{-\infty}^0\varphi(x)\,dx.
$$

無限遠では $\varphi=0$、原点では $x=0$ なので境界項は 0 です。よって

$$
\int_{-\infty}^0(-x)\varphi'
=
\int_{-\infty}^0\varphi.
$$

正の半直線では

$$
\int_0^\infty x\varphi'
=
\left[x\varphi\right]_0^\infty
-
\int_0^\infty\varphi(x)\,dx
=
-\int_0^\infty\varphi.
$$

従って

$$
\int_{\mathbb R}|x|\varphi'
=
\int_{-\infty}^0\varphi
-
\int_0^\infty\varphi.
$$

一方、

$$
-\int_{\mathbb R}\operatorname{sgn}(x)\varphi(x)\,dx
=
-\left(
-\int_{-\infty}^0\varphi
+
\int_0^\infty\varphi
\right),
$$

なので同じ式になります。

よって

$$
\boxed{
\partial u=v=\operatorname{sgn}x
\quad\text{weakly}
}.
$$
<!-- solution-end -->

## GPDE2-B01 区間の指示関数の distribution 微分

- Level: B
- 目安時間: 18分

$a<b$ とし、

$$
u(x)=1_{(a,b)}(x)
$$

とする。

1. 任意の $\varphi\in\mathcal D(\mathbb R)$ に対して $\langle Du,\varphi\rangle$ を直接計算せよ。
2. 

$$
Du=\delta_a-\delta_b
$$

を示せ。
3. $u$ が $L^1_{\mathrm{loc}}$ 関数としての弱微分を持たない理由を説明せよ。

<!-- solution-start -->
### 詳細解答

1. distribution 微分の定義から

$$
\langle Du,\varphi\rangle
=
-\int_{\mathbb R}u(x)\varphi'(x)\,dx.
$$

$u=1$ on $(a,b)$、それ以外で 0 なので

$$
\langle Du,\varphi\rangle
=
-\int_a^b\varphi'(x)\,dx.
$$

微積分学の基本定理から

$$
-\int_a^b\varphi'
=
-\{\varphi(b)-\varphi(a)\}
=
\varphi(a)-\varphi(b).
$$

2. Dirac delta の作用を使えば

$$
\varphi(a)-\varphi(b)
=
\langle\delta_a-\delta_b,\varphi\rangle.
$$

従って

$$
\boxed{
Du=\delta_a-\delta_b
}.
$$

3. もし $v\in L^1_{\mathrm{loc}}$ が弱微分なら

$$
T_v=\delta_a-\delta_b.
$$

しかし右辺は jump 位置に集中した非正則 distribution です。実際、$a$ の近くで $b$ を避ける shrinking bump を入れれば $\delta_a$ の非正則性と同じ矛盾が出ます。

従って $u$ は $L^1_{\mathrm{loc}}$ 関数としての弱微分を持ちません。
<!-- solution-end -->

## GPDE2-B02 mollifier の局所 $L^1$ 近似を再構成する

- Level: B
- 目安時間: 25分

$u\in L^1_{\mathrm{loc}}(\Omega)$、$K\subset\Omega$ compact とする。

1. ある $r>0$ を取り

$$
K_r
=
\{x:\operatorname{dist}(x,K)\le r\}
\subset\Omega
$$

とできる理由を説明せよ。
2. $w=u1_{K_r}$ を $\mathbb R^d$ 上で 0 延長し、$0<\varepsilon<r/2$ のとき

$$
\|u_\varepsilon-u\|_{L^1(K)}
\le
\int\rho(z)
\|w(\cdot-\varepsilon z)-w\|_1\,dz
$$

を示せ。
3. [本章の Rd の平行移動補題](#lem-gpde2-l1-translation-rd)から局所 $L^1$ 収束を導け。

<!-- solution-start -->
### 詳細解答

1. $K$ は compact、$\Omega^c$ は closed で互いに交わりません。$K\subset\Omega$ なので

$$
\operatorname{dist}(K,\Omega^c)>0.
$$

この距離より小さい $r>0$ を取れば、$K$ の $r$ 近傍は $\Omega$ の内部に入ります。

2. $\rho$ の台では $|z|\le1$ です。$x\in K$、$\varepsilon<r/2$ なら

$$
x-\varepsilon z\in K_r.
$$

従ってこの範囲では

$$
u(x)=w(x),
\qquad
u(x-\varepsilon z)=w(x-\varepsilon z).
$$

また変数変換から

$$
u_\varepsilon(x)
=
\int\rho(z)u(x-\varepsilon z)\,dz.
$$

$\int\rho=1$ なので

$$
u_\varepsilon(x)-u(x)
=
\int\rho(z)
\{w(x-\varepsilon z)-w(x)\}\,dz.
$$

三角不等式を取り、$x\in K$ で積分します。$\rho\ge0$ なので [Tonelli の定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-tonelli)を使えて、

$$
\|u_\varepsilon-u\|_{L^1(K)}
\le
\int\rho(z)
\int_K
|w(x-\varepsilon z)-w(x)|
\,dx\,dz.
$$

内側の積分は全空間の $L^1$ norm 以下なので、

$$
\|u_\varepsilon-u\|_{L^1(K)}
\le
\int\rho(z)
\|w(\cdot-\varepsilon z)-w\|_1\,dz.
$$

3. [本章の Rd の平行移動補題](#lem-gpde2-l1-translation-rd)を $w$ に適用すると、

$$
\|w(\cdot-h)-w\|_1\to0
\qquad(h\to0).
$$

$\rho$ の台では $|\varepsilon z|\le\varepsilon$ だから、

$$
\|u_\varepsilon-u\|_{L^1(K)}
\le
\sup_{|h|\le\varepsilon}
\|w(\cdot-h)-w\|_1
\int\rho.
$$

$\int\rho=1$ なので

$$
\|u_\varepsilon-u\|_{L^1(K)}
\le
\sup_{|h|\le\varepsilon}
\|w(\cdot-h)-w\|_1
\to0.
$$

従って

$$
\boxed{
u_\varepsilon\to u
\text{ in }L^1(K)
}.
$$
<!-- solution-end -->

## GPDE2-B03 弱微分と mollification の交換を証明する

- Level: B
- 目安時間: 22分

$u,v\in L^1_{\mathrm{loc}}(\Omega)$ とし、$v$ は $u$ の $x_j$ に関する弱微分とする。

$x\in\Omega_\varepsilon$ を固定し、

$$
\psi_x(y)=\rho_\varepsilon(x-y)
$$

と置く。

1. $\psi_x\in\mathcal D(\Omega)$ を示せ。
2. 平滑化定理と weak derivative の定義を使って

$$
\partial_j u_\varepsilon(x)
=
v_\varepsilon(x)
$$

を導け。

<!-- solution-start -->
### 詳細解答

1. $\rho_\varepsilon$ は $C_c^\infty(\mathbb R^d)$ なので、$y\mapsto\rho_\varepsilon(x-y)$ も $C^\infty$ です。

その台は

$$
x-\operatorname{supp}\rho_\varepsilon
\subset
\overline{B(x,\varepsilon)}.
$$

$x\in\Omega_\varepsilon$ より

$$
\overline{B(x,\varepsilon)}
\subset\Omega.
$$

従って $\psi_x$ は $\Omega$ 内にコンパクトな台を持ち、

$$
\psi_x\in\mathcal D(\Omega).
$$

2. 平滑化定理から

$$
\partial_j u_\varepsilon(x)
=
\int_\Omega
u(y)\partial_{x_j}\rho_\varepsilon(x-y)\,dy.
$$

一方、

$$
\partial_{x_j}\rho_\varepsilon(x-y)
=
-\partial_{y_j}\rho_\varepsilon(x-y)
=
-\partial_{y_j}\psi_x(y).
$$

従って

$$
\partial_j u_\varepsilon(x)
=
-\int_\Omega
u(y)\partial_{y_j}\psi_x(y)\,dy.
$$

$v$ が $u$ の弱微分なので

$$
\int_\Omega
u\,\partial_j\psi_x
=
-\int_\Omega
v\,\psi_x.
$$

よって

$$
-\int_\Omega
u\,\partial_j\psi_x
=
\int_\Omega
v\,\psi_x.
$$

右辺は

$$
\int_\Omega
v(y)\rho_\varepsilon(x-y)\,dy
=
v_\varepsilon(x).
$$

したがって

$$
\boxed{
\partial_j u_\varepsilon(x)
=
v_\varepsilon(x)
}.
$$
<!-- solution-end -->

## GPDE2-C01 tent 関数の一階弱微分と二階 distribution 微分

- Level: C
- 目安時間: 35分

$\mathbb R$ 上で

$$
u(x)=\max(1-|x|,0)
$$

とする。

1. $u$ の一階弱微分 $v$ を区分的に求めよ。
2. $v$ の jump を調べ、

$$
D^2u
=
\delta_{-1}-2\delta_0+\delta_1
$$

を示せ。
3. mollifier $\rho_\varepsilon$ による $u_\varepsilon$ について

$$
u_\varepsilon'
=
v_\varepsilon
$$

を示せ。
4. さらに

$$
u_\varepsilon''(x)
=
\rho_\varepsilon(x+1)
-
2\rho_\varepsilon(x)
+
\rho_\varepsilon(x-1)
$$

を導き、「尖り」と端点の折れが平滑化後にどのような局所 bump として現れるか説明せよ。

<!-- solution-start -->
### 詳細解答

1. $u$ は

$$
u(x)
=
\begin{cases}
0,&x\le-1,\\
1+x,&-1<x<0,\\
1-x,&0<x<1,\\
0,&x\ge1
\end{cases}
$$

です。

各開区間上の古典微分は

$$
v(x)
=
\begin{cases}
0,&x<-1,\\
1,&-1<x<0,\\
-1,&0<x<1,\\
0,&x>1.
\end{cases}
$$

$u$ 自身は $x=-1,0,1$ で連続なので、一階 distribution 微分には delta 項が出ません。従って

$$
Du=T_v.
$$

つまり $v$ は $u$ の一階弱微分です。

2. 今度は $v$ の jump を調べます。

$x=-1$ では

$$
[v]_{-1}=1-0=1.
$$

$x=0$ では

$$
[v]_0=-1-1=-2.
$$

$x=1$ では

$$
[v]_1=0-(-1)=1.
$$

各区間で $v$ は定数なので $v'_{\mathrm{pw}}=0$ です。jump 公式から

$$
Dv
=
\delta_{-1}
-
2\delta_0
+
\delta_1.
$$

$Du=T_v$ なので

$$
D^2u=Dv.
$$

従って

$$
\boxed{
D^2u
=
\delta_{-1}-2\delta_0+\delta_1
}.
$$

3. $v$ は $u$ の弱微分なので、本章の交換定理から

$$
\boxed{
u_\varepsilon'
=
v_\varepsilon
}
$$

です。

4. $v$ は jump を持つ区分定数関数です。直接 convolution を書くと

$$
v_\varepsilon(x)
=
\int_{-1}^0\rho_\varepsilon(x-y)\,dy
-
\int_0^1\rho_\varepsilon(x-y)\,dy.
$$

$x$ で微分します。第一項では変数 $s=x-y$ を使うと

$$
\int_{-1}^0\rho_\varepsilon(x-y)\,dy
=
\int_x^{x+1}\rho_\varepsilon(s)\,ds.
$$

従って微分は

$$
\rho_\varepsilon(x+1)-\rho_\varepsilon(x).
$$

第二項は

$$
\int_0^1\rho_\varepsilon(x-y)\,dy
=
\int_{x-1}^{x}\rho_\varepsilon(s)\,ds
$$

なので微分は

$$
\rho_\varepsilon(x)-\rho_\varepsilon(x-1).
$$

符号に注意すると

$$
u_\varepsilon''(x)
=
v_\varepsilon'(x)
=
\rho_\varepsilon(x+1)
-
2\rho_\varepsilon(x)
+
\rho_\varepsilon(x-1).
$$

従って

$$
\boxed{
u_\varepsilon''(x)
=
\rho_\varepsilon(x+1)
-
2\rho_\varepsilon(x)
+
\rho_\varepsilon(x-1)
}.
$$

$\varepsilon$ が小さいと、三つの kernel はそれぞれ

- $x=-1$ 付近に質量 $+1$
- $x=0$ 付近に質量 $-2$
- $x=1$ 付近に質量 $+1$

を持つ狭い bump になります。

$\varepsilon\downarrow0$ では distribution の意味で

$$
\rho_\varepsilon(\cdot+1)
\to\delta_{-1},
$$

$$
\rho_\varepsilon
\to\delta_0,
$$

$$
\rho_\varepsilon(\cdot-1)
\to\delta_1.
$$

したがって滑らかな $u_\varepsilon''$ が極限で

$$
\delta_{-1}-2\delta_0+\delta_1
$$

へ集中します。

これは「粗い関数を mollify して古典計算し、極限で distribution の情報を回収する」という本章全体の技法を一つの例で再現しています。
<!-- solution-end -->

---

## 章末チェック

- 多重指数 $\alpha$ と $\partial^\alpha$ の意味を説明できる。
- distribution 微分を部分積分の双対化として定義できる。
- $\partial^\alpha T$ が再び distribution であることを [GPDE1 の局所有限階評価](../GPDE1/index.md#prop-gpde1-local-finite-order)から証明できる。
- 古典微分できる関数では distribution 微分が古典微分と一致することを示せる。
- distribution 収束と微分が交換することを定義から証明できる。
- $DH=\delta_0$ を直接計算できる。
- 区分 $C^1$ 関数の jump が $[f]_a\delta_a$ を生む理由を部分積分から導ける。
- weak derivative を「distribution 微分が正則 distribution で表せる場合」として説明できる。
- $|x|$ は一階弱微分を持つが Heaviside は持たない理由を説明できる。
- mollifier の質量・台・微分の尺度を計算できる。
- $u_\varepsilon$ が $C^\infty$ になる理由を、微分を kernel へ移すことから証明できる。
- $L^1$ 平行移動連続性から $u_\varepsilon\to u$ in $L^1_{\mathrm{loc}}$ を証明できる。
- 正則 distribution 埋め込みの単射性を mollifier で証明できる。
- weak derivative が a.e. の意味で一意であることを説明できる。
- weak derivative と mollification の交換をテスト関数 $y\mapsto\rho_\varepsilon(x-y)$ から証明できる。
- tent 関数を通して、一階弱微分・二階 distribution 微分・mollification の三者を接続できる。

次は **GPDE3「Sobolev 空間」** です。
