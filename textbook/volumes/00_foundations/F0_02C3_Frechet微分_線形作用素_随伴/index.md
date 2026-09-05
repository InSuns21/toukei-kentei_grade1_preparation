# F0-02C3 関数解析III：Fréchet微分・有界線形作用素・連鎖律

<!-- definition-example-audit: strict -->

この講義では「微分とはベクトルではなく一次近似作用素である」を主題にします。随伴作用素は次講C3Aへ分離します。

## 1. 一変数微分を「一次近似」として読み直す

一変数関数 $f:\mathbb R\to\mathbb R$ が $x$ で微分可能なら

$$
f(x+h)=f(x)+f'(x)h+o(|h|).
$$

重要なのは、微分係数 $f'(x)$ そのものより

$$
\boxed{f(x+h)-f(x)\approx f'(x)h}
$$

という **線形な一次近似** があることです。

多変数・無限次元でも、この発想を保存します。

---

## 2. 方向微分

$X$ をノルム空間、$f:X\to\mathbb R$ とします。

<a id="def-f0-02c3-directional-derivative"></a>

<!-- formal-statement-start -->
> **定義（方向微分）**  
> ノルム空間 $X$ 上の関数 $f:X\to\mathbb R$、点 $x\in X$、方向 $h\in X$ に対し

$$
D_hf(x)=\lim_{t\to0}\frac{f(x+th)-f(x)}{t}
$$

> が存在するとき、これを $f$ の $x$ における方向 $h$ の **方向微分** といいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c3-directional-derivative -->
**定義の確認**  
$f(u)=u^2$、$x\in\mathbb R$、方向 $h\in\mathbb R$ なら

$$
\frac{f(x+th)-f(x)}{t}
=2xh+th^2\to2xh.
$$

したがって $D_hf(x)=2xh$ です。「方向 $h$ に沿って一変数関数として微分する」という定義そのものを確認できます。
<!-- definition-example-end -->

方向ごとに微分できること自体は、まだ一つの良い線形近似が存在することを保証しません。

---

## 3. Gâteaux微分

<a id="def-f0-02c3-gateaux-derivative"></a>

<!-- formal-statement-start -->
> **定義（Gâteaux微分）**  
> すべての方向 $h$ について方向微分が存在し、写像 $h\mapsto D_hf(x)$ が線形であるとき、その線形写像を $f$ の $x$ における **Gâteaux微分** といい、

$$
D_Gf(x)[h]=D_hf(x)
$$

> と書きます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c3-gateaux-derivative -->
**定義の確認**  
$f(x)=\|x\|_2^2$ を $\mathbb R^p$ 上で考えると

$$
D_hf(x)=2x^{\mathsf T}h.
$$

右辺は $h$ について線形なので、すべての方向微分が一つの線形写像

$$
D_Gf(x)[h]=2x^{\mathsf T}h
$$

にまとまっています。
<!-- definition-example-end -->

ただしGâteaux微分は方向ごとの情報をまとめただけなので、$h$ の方向によらず誤差が一様に小さいことまでは要求していません。

この点でFréchet微分より弱い概念です。

---

## 4. Fréchet微分

$f:X\to Y$ をノルム空間間の写像とします。

<a id="def-f0-02c3-frechet-derivative"></a>

<!-- formal-statement-start -->
> **定義（Fréchet微分）**  
> ノルム空間間の写像 $f:X\to Y$ が点 $x$ で **Fréchet微分可能** であるとは、ある有界線形作用素 $A:X\to Y$ が存在して

$$
\frac{\|f(x+h)-f(x)-Ah\|_Y}{\|h\|_X}\to0
\qquad(h\to0)
$$

> となることです。この一意な $A$ を $Df(x)$ と書き、$f$ の $x$ における **Fréchet微分** といいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c3-frechet-derivative -->
**定義の確認**  
$f(x)=\|x\|_2^2$、$x,h\in\mathbb R^p$ とし、$Ah=2x^{\mathsf T}h$ と置きます。すると

$$
f(x+h)-f(x)-Ah=\|h\|_2^2,
$$

したがって

$$
\frac{|f(x+h)-f(x)-Ah|}{\|h\|_2}=\|h\|_2\to0.
$$

$A$ は線形かつ有限次元なので有界です。よって $Df(x)[h]=2x^{\mathsf T}h$ がFréchet微分です。
<!-- definition-example-end -->

つまり

$$
\boxed{f(x+h)=f(x)+Df(x)h+o(\|h\|)}
$$

です。

Fréchet微分は、点 $x$ の近くのすべての小さな増分 $h$ に対して **一つの線形写像でまとめて一次近似する** 概念です。

---

## 5. 実数値関数なら微分は双対空間の元

$f:X\to\mathbb R$ なら

$$
Df(x):X\to\mathbb R
$$

は連続線形汎関数です。したがって

$$
\boxed{Df(x)\in X^*}.
$$

一般のBanach空間では、微分そのものをまず「ベクトル」だと思わないことが重要です。

Hilbert空間 $H$ ならRiesz表現定理により一意な $g\in H$ が存在して

$$
Df(x)[h]=\langle g,h\rangle_H.
$$

この $g$ をHilbert空間での勾配とみなし

$$
\boxed{g=\nabla_Hf(x)}
$$

と書けます。

---

## 6. 有限次元では勾配が出る

$X=\mathbb R^p$、$f:\mathbb R^p\to\mathbb R$ とします。

通常の微分可能性の下で

$$
Df(x)[h]
=\sum_{j=1}^p\frac{\partial f}{\partial x_j}(x)h_j
=\nabla f(x)^{\mathsf T}h.
$$

つまり

$$
\boxed{Df(x)\longleftrightarrow\nabla f(x)}
$$

という対応は、Euclid内積によるRiesz表現そのものです。

---

## 7. 例：Hilbert空間のノルム二乗

Hilbert空間 $H$ 上で

$$
f(x)=\frac12\|x\|^2
$$

とします。$x+h$ で展開すると

$$
\begin{aligned}
f(x+h)
&=\frac12\langle x+h,x+h\rangle\\
&=\frac12\|x\|^2+\langle x,h\rangle+\frac12\|h\|^2.
\end{aligned}
$$

したがって

$$
Df(x)[h]=\langle x,h\rangle,
$$

Riesz表現により

$$
\boxed{\nabla_Hf(x)=x}.
$$

SVMの正則化項 $\frac12\|w\|_{\mathcal H}^2$ を $w$ で微分すると $w$ が出る背景です。

---

## 8. 例：二乗誤差型の汎関数

$H=L^2([0,1])$ とし、固定関数 $g\in H$ に対して

$$
J(f)=\frac12\|f-g\|_2^2
$$

とします。増分 $h$ に対し

$$
J(f+h)=J(f)+\langle f-g,h\rangle+\frac12\|h\|^2.
$$

よって

$$
DJ(f)[h]=\langle f-g,h\rangle,
$$

したがって

$$
\boxed{\nabla_HJ(f)=f-g}.
$$

有限次元の最小二乗と全く同じ形です。

---

## 9. 有界線形作用素

<a id="def-f0-02c3-bounded-linear-operator"></a>

<!-- formal-statement-start -->
> **定義（有界線形作用素）**  
> ノルム空間 $X,Y$ の間の線形写像 $T:X\to Y$ が、ある $M<\infty$ に対して

$$
\|Tx\|_Y\le M\|x\|_X
\qquad(\forall x\in X)
$$

> を満たすとき、$T$ を **有界線形作用素** といいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c3-bounded-linear-operator -->
**定義の確認**  
$T:\mathbb R^2\to\mathbb R$、$T(x_1,x_2)=x_1+2x_2$ とします。Cauchy--Schwarz不等式から

$$
|Tx|\le\sqrt{1^2+2^2}\,\|x\|_2=\sqrt5\,\|x\|_2.
$$

したがって $M=\sqrt5$ を取れ、$T$ は有界線形作用素です。
<!-- definition-example-end -->

線形写像については

$$
\boxed{\text{有界}\Longleftrightarrow\text{連続}}
$$

です。

---

## 10. 作用素ノルム

<a id="def-f0-02c3-operator-norm"></a>

<!-- formal-statement-start -->
> **定義（作用素ノルム）**  
> 有界線形作用素 $T:X\to Y$ に対し

$$
\|T\|=\sup_{\|x\|_X\le1}\|Tx\|_Y
$$

> を $T$ の **作用素ノルム** といいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c3-operator-norm -->
**定義の確認**  
前節の $T(x_1,x_2)=x_1+2x_2$ では Cauchy--Schwarz から $\|T\|\le\sqrt5$ です。一方

$$
x=\frac1{\sqrt5}(1,2)
$$

は $\|x\|_2=1$ で $|Tx|=\sqrt5$ を与えるので

$$
\boxed{\|T\|=\sqrt5}.
$$
<!-- definition-example-end -->

同値に

$$
\|T\|=\sup_{x\ne0}\frac{\|Tx\|_Y}{\|x\|_X},
$$

したがって $\|Tx\|_Y\le\|T\|\|x\|_X$ です。有限次元でEuclidノルムを使う行列 $A$ の作用素ノルムは最大特異値です。

---

## 11. 微分は有界線形作用素

$f:X\to Y$ がFréchet微分可能なら

$$
Df(x)\in\mathcal L(X,Y),
$$

ここで $\mathcal L(X,Y)$ は有界線形作用素全体です。

有限次元では

$$
DF(x)\longleftrightarrow J_F(x)
$$

です。Jacobian行列は、微分という線形写像を座標で表したものにすぎません。

---

## 12. Fréchet微分の連鎖律

<a id="thm-f0-02c3-frechet-chain-rule"></a>

<!-- formal-statement-start -->
> **定理（Fréchet微分の連鎖律）**  
> $X,Y,Z$ をノルム空間、$U\subset X$、$V\subset Y$ を開集合とします。$f:U\to V$ が $x\in U$ でFréchet微分可能、$g:V\to Z$ が $f(x)$ でFréchet微分可能なら、$g\circ f$ は $x$ でFréchet微分可能で

$$
\boxed{D(g\circ f)(x)=Dg(f(x))\circ Df(x)}
$$

> が成り立ちます。
<!-- formal-statement-end -->

関数解析では「Jacobianの積」ではなく、**一次近似作用素の合成** が本体です。

<!-- proof-start -->
### 証明：二つの $o(\|h\|)$ を合成後も制御する

$$
A=Df(x),\qquad B=Dg(f(x))
$$

と置きます。Fréchet微分の定義から

$$
f(x+h)=f(x)+Ah+r_f(h),
\qquad
\frac{\|r_f(h)\|_Y}{\|h\|_X}\to0.
$$

ここで

$$
k_h:=f(x+h)-f(x)=Ah+r_f(h)
$$

と置きます。$A$ は有界なので

$$
\frac{\|k_h\|_Y}{\|h\|_X}
\le \|A\|+\frac{\|r_f(h)\|_Y}{\|h\|_X}
$$

であり、右辺は $h\to0$ で有界です。したがって $k_h=O(\|h\|_X)$、特に $k_h\to0$ です。

一方、$g$ のFréchet微分可能性から

$$
g(f(x)+k)=g(f(x))+Bk+r_g(k),
\qquad
\frac{\|r_g(k)\|_Z}{\|k\|_Y}\to0
$$

です。$k=k_h$ を代入すると

$$
\begin{aligned}
(g\circ f)(x+h)-(g\circ f)(x)-BAh
&=B r_f(h)+r_g(k_h).
\end{aligned}
$$

第1項は

$$
\frac{\|Br_f(h)\|_Z}{\|h\|_X}
\le\|B\|\frac{\|r_f(h)\|_Y}{\|h\|_X}\to0.
$$

第2項は $k_h=0$ のとき0とみなせます。$k_h\ne0$ なら

$$
\frac{\|r_g(k_h)\|_Z}{\|h\|_X}
=
\frac{\|r_g(k_h)\|_Z}{\|k_h\|_Y}
\frac{\|k_h\|_Y}{\|h\|_X}\to0,
$$

なぜなら第1因子は0へ収束し、第2因子は有界だからです。従って残差全体が $o(\|h\|_X)$ であり、$BA$ は有界線形作用素なので

$$
D(g\circ f)(x)=BA
$$

が従います。$\square$
<!-- proof-end -->

有限次元ではこの式が

$$
J_{g\circ f}(x)=J_g(f(x))J_f(x)
$$

という行列積になります。

---

## 演習

### F0-02C3-A01 ノルム二乗のFréchet微分

- Level: A
- 目安時間: 10分

Hilbert空間 $H$ 上の $f(x)=\frac12\|x\|^2$ について $Df(x)[h]$ を求めよ。

<!-- solution-start -->
#### 詳細解答
展開 $f(x+h)-f(x)=\langle x,h\rangle+\frac12\|h\|^2$ より $Df(x)[h]=\langle x,h\rangle$。残差は $O(\|h\|^2)=o(\|h\|)$。
#### 本番答案
展開 $f(x+h)-f(x)=\langle x,h\rangle+\frac12\|h\|^2$ より $Df(x)[h]=\langle x,h\rangle$。残差は $O(\|h\|^2)=o(\|h\|)$。
#### 採点基準（20点）
- 定義・設定: 6点
- 推論・計算: 10点
- 結論: 4点
<!-- solution-end -->

### F0-02C3-B01 有界線形作用素はLipschitz

- Level: B
- 目安時間: 15分

有界線形作用素 $T:X\to Y$ に対し $\|Tx-Ty\|\le\|T\|\|x-y\|$ を示し、連続性を結論せよ。

<!-- solution-start -->
#### 詳細解答
線形性より $Tx-Ty=T(x-y)$。作用素ノルムの定義から $\|T(x-y)\|\le\|T\|\|x-y\|$。従ってTはLipschitz連続。
#### 本番答案
線形性より $Tx-Ty=T(x-y)$。作用素ノルムの定義から $\|T(x-y)\|\le\|T\|\|x-y\|$。従ってTはLipschitz連続。
#### 採点基準（20点）
- 方針: 5点
- 中心となる導出: 11点
- 結論: 4点
<!-- solution-end -->

---

## 次に進む

**次：[F0-02C3A 随伴作用素・Banach双対・Hilbert随伴](../F0_02C3A_随伴作用素_Banach_Hilbert/index.md)**
