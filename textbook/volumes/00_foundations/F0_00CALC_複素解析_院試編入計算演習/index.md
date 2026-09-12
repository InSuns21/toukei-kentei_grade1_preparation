# CAX1 複素解析・院試／編入 計算演習

<!-- definition-example-audit: strict -->

複素解析は、定理の証明を理解しただけでは試験計算が速くなりにくい分野です。Cauchy–Riemann 方程式を見たら偏導関数を並べる、円周積分を見たら特異点の位置と分母の冪を確認する、Laurent 展開では最初に収束領域を決める、というように、問題を見た直後の一手を反復して身体化する必要があります。

この章では [CA1](../CA1/index.md)〜[CA4](../CA4/index.md) で構成した理論を、院試・編入試験で頻出の手計算へ変換します。新しい理論を追加するのではなく、各計算で「何を見て」「どの式を立て」「どこまで変形すれば答えになるか」を追える形で練習します。

## 1. 計算ルート早見

問題を見たときの最初の分岐は次の通りです。

```text
正則性・導関数を判定
  → u_x, u_y, v_x, v_y を計算
  → Cauchy–Riemann を照合

線積分
  → 原始関数が見えるか確認
  → 見えなければ z=γ(t), dz=γ'(t)dt で直接積分

円周積分
  → 特異点が曲線の内側か外側か
  → 1/(ζ-a)^{n+1} 型なら Cauchy の公式
  → 一般の有理関数なら留数

べき級数
  → 中心から最寄りの特異点までの距離を確認
  → 1/(1-w)=Σw^n の形へ変形

Laurent 展開
  → 先に環状領域を固定
  → |w|<1 になる向きで幾何級数化

実積分
  → 上半円など輪郭を選ぶ
  → 内部の極を列挙
  → 円弧積分を ML 評価で 0 へ送る

零点個数
  → 円周上で大小比較しやすい項を探す
  → Rouché で単純な多項式へ置き換える
```

---

## 2. 演習

### Level A：一手を迷わず出す

<a id="ex-cax1-a01"></a>
#### CAX1-A01 Cauchy–Riemann 判定と導関数
- Level: A

$$
f(x+iy)=\bigl(x^2-y^2+2x\bigr)+i\bigl(2xy+2y\bigr)
$$

とする。$f$ が正則であることを示し、$f'(z)$ を求めよ。

<!-- solution-start -->
**解答**：実部と虚部を

$$
u(x,y)=x^2-y^2+2x,
\qquad
v(x,y)=2xy+2y
$$

と置きます。まず偏導関数を一つずつ計算します。

$$
u_x=2x+2,
\qquad
u_y=-2y,
$$

$$
v_x=2y,
\qquad
v_y=2x+2.
$$

したがって全ての $(x,y)$ で

$$
u_x=v_y,
\qquad
u_y=-v_x
$$

が成り立ちます。4つの偏導関数は多項式なので連続です。よって [CA1 の Cauchy–Riemann 十分条件](../CA1/index.md#thm-ca1-cr-sufficient) から $f$ は $\mathbb C$ 全体で正則です。

導関数は

$$
f'(z)=u_x+iv_x
=(2x+2)+i(2y).
$$

ここで $z=x+iy$ なので

$$
2x+i2y=2z.
$$

従って

$$
\boxed{f'(z)=2z+2}.
$$

検算として、もとの関数は

$$
f(z)=z^2+2z
$$

と書けます。この表示を微分して得られる $2z+2$ と一致しています。
<!-- solution-end -->

<a id="ex-cax1-a02"></a>
#### CAX1-A02 調和共役を復元する
- Level: A

$$
u(x,y)=x^3-3xy^2+2x
$$

を実部にもつ正則関数 $f=u+iv$ を求めよ。ただし $v(0,0)=0$ とする。

<!-- solution-start -->
**解答**：正則関数なら Cauchy–Riemann 方程式

$$
u_x=v_y,
\qquad
u_y=-v_x
$$

を満たします。まず $u$ を偏微分します。

$$
u_x=3x^2-3y^2+2,
$$

$$
u_y=-6xy.
$$

第2式 $u_y=-v_x$ から

$$
v_x=6xy.
$$

$x$ について積分すると

$$
v(x,y)=3x^2y+\phi(y)
$$

となります。ここで $\phi$ は $y$ だけの関数です。

次に $y$ で偏微分すると

$$
v_y=3x^2+\phi'(y).
$$

これを第1式 $u_x=v_y$ と比較して

$$
3x^2-3y^2+2
=3x^2+\phi'(y).
$$

従って

$$
\phi'(y)=-3y^2+2.
$$

もう一度積分して

$$
\phi(y)=-y^3+2y+C.
$$

よって

$$
v(x,y)=3x^2y-y^3+2y+C.
$$

条件 $v(0,0)=0$ から $C=0$ です。したがって

$$
\boxed{
v(x,y)=3x^2y-y^3+2y
}.
$$

さらに

$$
z^3=(x^3-3xy^2)+i(3x^2y-y^3),
\qquad
2z=2x+i2y
$$

なので

$$
\boxed{f(z)=z^3+2z}.
$$
<!-- solution-end -->

<a id="ex-cax1-a03"></a>
#### CAX1-A03 $e^z=w$ 型方程式
- Level: A

複素方程式

$$
e^z=1+i
$$

の全ての解を求めよ。

<!-- solution-start -->
**解答**：$z=x+iy$ と置きます。[CA1 の $e^z$ の基本性質](../CA1/index.md#thm-ca1-complex-exponential) から

$$
e^z=e^x(\cos y+i\sin y).
$$

右辺 $1+i$ の絶対値は

$$
|1+i|=\sqrt2
$$

です。一方 $|e^z|=e^x$ なので

$$
e^x=\sqrt2.
$$

両辺の実対数を取ると

$$
x=\log\sqrt2=\frac12\log2.
$$

次に偏角を比較します。$1+i$ の偏角は

$$
\frac\pi4+2\pi k,
\qquad k\in\mathbb Z
$$

です。従って

$$
y=\frac\pi4+2\pi k.
$$

以上より

$$
\boxed{
z=\frac12\log2+i\left(\frac\pi4+2\pi k\right),
\qquad k\in\mathbb Z
}.
$$

$e^z$ では虚部に $2\pi$ 周期があるため、解が無限個に分岐する点を落とさないことが重要です。
<!-- solution-end -->

<a id="ex-cax1-a04"></a>
#### CAX1-A04 パラメータ表示で線積分する
- Level: A

$0$ から $1+i$ までの線分を

$$
\gamma(t)=t(1+i),
\qquad 0\le t\le1
$$

とする。次の線積分を求めよ。

$$
\int_\gamma \overline z\,dz
$$

<!-- solution-start -->
**解答**：被積分関数 $\overline z$ は正則ではないため、原始関数を探すよりパラメータ表示へ直接戻るのが確実です。

曲線上では

$$
z=\gamma(t)=t(1+i),
$$

したがって

$$
\overline z=t(1-i).
$$

また

$$
\gamma'(t)=1+i,
\qquad
dz=(1+i)dt.
$$

よって

$$
\begin{aligned}
\int_\gamma \overline z\,dz
&=\int_0^1 t(1-i)(1+i)\,dt\\
&=\int_0^1 t(1-i^2)\,dt\\
&=\int_0^1 2t\,dt\\
&=[t^2]_0^1\\
&=1.
\end{aligned}
$$

従って

$$
\boxed{1}.
$$
<!-- solution-end -->

<a id="ex-cax1-a05"></a>
#### CAX1-A05 Cauchy 積分公式を使う
- Level: A

反時計回りの円周 $|z|=2$ に沿って

$$
I=\int_{|z|=2}\frac{e^z}{z-i}\,dz
$$

を求めよ。

<!-- solution-start -->
**解答**：分母が0になる点は

$$
z=i
$$

で、$|i|=1<2$ なので円の内部にあります。分子 $e^z$ は整関数です。

したがって [CA3 の Cauchy 積分公式](../CA3/index.md#thm-ca3-cauchy-integral-formula) を $f(z)=e^z$, 評価点 $i$ に適用できます。

$$
\int_{|z|=2}\frac{e^z}{z-i}\,dz
=2\pi i\,e^i.
$$

Euler の表示

$$
e^i=\cos1+i\sin1
$$

を使えば

$$
I=2\pi i(\cos1+i\sin1)
=2\pi(i\cos1-\sin1).
$$

従って

$$
\boxed{I=2\pi i e^i}.
$$
<!-- solution-end -->

<a id="ex-cax1-a06"></a>
#### CAX1-A06 分母の冪から微分階数を読む
- Level: A

反時計回りの円周 $|z|=2$ に沿って

$$
I=\int_{|z|=2}\frac{e^z}{z^4}\,dz
$$

を求めよ。

<!-- solution-start -->
**解答**：分母が

$$
z^4=(z-0)^{3+1}
$$

なので、対応するのは **3階導関数** です。[CA3 の Cauchy 高階導関数公式](../CA3/index.md#thm-ca3-cauchy-derivatives) から

$$
(e^z)^{(3)}\big|_{z=0}
=
\frac{3!}{2\pi i}
\int_{|z|=2}\frac{e^z}{z^4}\,dz.
$$

$e^z$ は何回微分しても $e^z$ なので

$$
(e^z)^{(3)}\big|_{z=0}=e^0=1.
$$

したがって

$$
1=\frac{6}{2\pi i}I.
$$

両辺を解いて

$$
I=\frac{2\pi i}{6}
=\frac{\pi i}{3}.
$$

従って

$$
\boxed{I=\frac{\pi i}{3}}.
$$

分母の冪 $4$ を見て4階微分としないことが典型的な注意点です。
<!-- solution-end -->

<a id="ex-cax1-a07"></a>
#### CAX1-A07 Taylor 展開と収束半径
- Level: A

$$
f(z)=\frac1{2-z}
$$

を $z=0$ のまわりで Taylor 展開し、その収束半径を求めよ。

<!-- solution-start -->
**解答**：幾何級数

$$
\frac1{1-w}=\sum_{n=0}^\infty w^n
\qquad(|w|<1)
$$

の形へ変形します。

$$
\frac1{2-z}
=\frac12\frac1{1-z/2}.
$$

ここで

$$
w=\frac z2
$$

と見れば $|w|<1$、すなわち $|z|<2$ で

$$
\begin{aligned}
\frac1{2-z}
&=\frac12\sum_{n=0}^\infty\left(\frac z2\right)^n\\
&=\sum_{n=0}^\infty\frac{z^n}{2^{n+1}}.
\end{aligned}
$$

従って

$$
\boxed{
\frac1{2-z}
=\frac12+\frac z4+\frac{z^2}{8}+\cdots,
\qquad |z|<2
}.
$$

$z=0$ から最も近い特異点は $z=2$ で距離2なので、収束半径も

$$
\boxed{R=2}
$$

です。
<!-- solution-end -->

<a id="ex-cax1-a08"></a>
#### CAX1-A08 同じ関数を二つの領域で Laurent 展開する
- Level: A

$$
f(z)=\frac1{z(z-2)}
$$

を原点のまわりで

1. $0<|z|<2$,
2. $|z|>2$

のそれぞれについて Laurent 展開せよ。

<!-- solution-start -->
**解答**：まず部分分数分解します。係数を飛ばさず

$$
\frac1{z(z-2)}=\frac A z+\frac B{z-2}
$$

と置くと、両辺に $z(z-2)$ を掛けて

$$
1=A(z-2)+Bz.
$$

$z=0$ を代入すると $1=-2A$ なので $A=-1/2$、$z=2$ を代入すると $1=2B$ なので $B=1/2$ です。従って

$$
\frac1{z(z-2)}
=-\frac1{2z}+\frac1{2(z-2)}.
$$

**1. $0<|z|<2$**

第2項を $z/2$ の幾何級数へ直します。

$$
\frac1{z-2}
=-\frac12\frac1{1-z/2}.
$$

$|z|<2$ なら $|z/2|<1$ なので

$$
\frac1{z-2}
=-\frac12\sum_{n=0}^\infty\left(\frac z2\right)^n.
$$

従って

$$
\frac1{2(z-2)}
=-\sum_{n=0}^\infty\frac{z^n}{2^{n+2}}.
$$

よって

$$
\boxed{
\frac1{z(z-2)}
=-\frac1{2z}-\frac14-\frac z8-\frac{z^2}{16}-\cdots
}
$$

です。

**2. $|z|>2$**

今度は $2/z$ を小さい量にします。

$$
\frac1{z-2}
=\frac1z\frac1{1-2/z}.
$$

$|z|>2$ なら $|2/z|<1$ なので

$$
\frac1{z-2}
=\frac1z\sum_{n=0}^\infty\left(\frac2z\right)^n
=\sum_{n=0}^\infty 2^n z^{-n-1}.
$$

従って

$$
\frac1{2(z-2)}
=\frac1{2z}+\frac1{z^2}+\frac2{z^3}+\frac4{z^4}+\cdots.
$$

ここで $-1/(2z)$ と最初の $1/(2z)$ が相殺し、

$$
\boxed{
\frac1{z(z-2)}
=\frac1{z^2}+\frac2{z^3}+\frac4{z^4}+\cdots,
\qquad |z|>2
}.
$$

同じ有理関数でも、どちらの比を $|w|<1$ にするかで Laurent 展開が変わります。
<!-- solution-end -->

### Level B：複数の判断をつなぐ

<a id="ex-cax1-b01"></a>
#### CAX1-B01 円の半径で積分値が変わる
- Level: B

反時計回りの円周 $|z|=R$ に沿う積分

$$
I_R=\int_{|z|=R}\frac{z+1}{z(z-2)}\,dz
$$

について、$R=1$ と $R=3$ の値をそれぞれ求めよ。

<!-- solution-start -->
**解答**：特異点は

$$
z=0,
\qquad z=2
$$

の二つです。まず各点の留数を求めます。

$z=0$ は単純極なので

$$
\operatorname{Res}(f,0)
=\lim_{z\to0}z\frac{z+1}{z(z-2)}
=\frac1{-2}
=-\frac12.
$$

$z=2$ も単純極で

$$
\operatorname{Res}(f,2)
=\lim_{z\to2}(z-2)\frac{z+1}{z(z-2)}
=\frac{3}{2}.
$$

**$R=1$ の場合**：内部にある極は $z=0$ だけです。[CA4 の留数定理](../CA4/index.md#thm-ca4-residue) から

$$
I_1
=2\pi i\left(-\frac12\right)
=\boxed{-\pi i}.
$$

**$R=3$ の場合**：$z=0,2$ の両方が内部に入ります。留数の和は

$$
-\frac12+\frac32=1.
$$

従って

$$
I_3=2\pi i\cdot1
=\boxed{2\pi i}.
$$

積分計算に入る前に、まず極を図形的に「内側・外側」へ分類することが核心です。
<!-- solution-end -->

<a id="ex-cax1-b02"></a>
#### CAX1-B02 3位の極の留数
- Level: B

$$
f(z)=\frac{e^z}{(z-1)^3}
$$

について、$z=1$ の留数を求めよ。さらに反時計回りの円周 $|z|=2$ に沿う

$$
\int_{|z|=2}f(z)\,dz
$$

を求めよ。

<!-- solution-start -->
**解答**：$e^z$ を $z=1$ のまわりで展開します。

$$
e^z=e\,e^{z-1}.
$$

さらに

$$
e^{z-1}
=1+(z-1)+\frac{(z-1)^2}{2!}+\frac{(z-1)^3}{3!}+\cdots
$$

なので

$$
\begin{aligned}
f(z)
&=\frac{e}{(z-1)^3}
\left(
1+(z-1)+\frac{(z-1)^2}{2}+\cdots
\right)\\
&=e(z-1)^{-3}
+e(z-1)^{-2}
+\frac e2(z-1)^{-1}
+\cdots.
\end{aligned}
$$

留数は $(z-1)^{-1}$ の係数なので

$$
\boxed{\operatorname{Res}(f,1)=\frac e2}.
$$

$|1|<2$ なので極は積分路の内部にあります。[CA4 の留数定理](../CA4/index.md#thm-ca4-residue) から

$$
\int_{|z|=2}f(z)\,dz
=2\pi i\cdot\frac e2
=\boxed{\pi i e}.
$$

高位極でも、Laurent 展開で $(z-a)^{-1}$ の係数だけを取り出せば留数になります。
<!-- solution-end -->

<a id="ex-cax1-b03"></a>
#### CAX1-B03 留数で実積分を求める
- Level: B

実積分

$$
I=\int_{-\infty}^{\infty}\frac{dx}{(1+x^2)^2}
$$

を、上半平面の半円輪郭を用いて求めよ。

<!-- solution-start -->
**解答**：複素関数

$$
f(z)=\frac1{(1+z^2)^2}
=\frac1{(z-i)^2(z+i)^2}
$$

を考えます。上半平面内の極は $z=i$ のみで、2位の極です。

$z=i$ では

$$
(z-i)^2f(z)=\frac1{(z+i)^2}
$$

が $i$ の近傍で正則です。2位の極 $a$ に対する公式

$$
\operatorname{Res}(f,a)
=\left.\frac d{dz}\bigl((z-a)^2f(z)\bigr)\right|_{z=a}
$$

を $a=i$ に適用すると

$$
\operatorname{Res}(f,i)
=\left.
\frac d{dz}\frac1{(z+i)^2}
\right|_{z=i}.
$$

微分すると

$$
\frac d{dz}(z+i)^{-2}
=-2(z+i)^{-3}.
$$

したがって

$$
\begin{aligned}
\operatorname{Res}(f,i)
&=-\frac2{(2i)^3}\\
&=-\frac2{8i^3}\\
&=-\frac2{-8i}\\
&=\frac1{4i}
=-\frac i4.
\end{aligned}
$$

半径 $R>1$ の上半円輪郭を取り、上半円弧を $C_R$ とします。[CA4 の留数定理](../CA4/index.md#thm-ca4-residue) から

$$
\int_{-R}^{R}\frac{dx}{(1+x^2)^2}
+
\int_{C_R}\frac{dz}{(1+z^2)^2}
=
2\pi i\left(-\frac i4\right)
=\frac\pi2.
$$

残るのは円弧積分が0へ行くことの確認です。$|z|=R$ では

$$
|1+z^2|
\ge ||z|^2-1|
=R^2-1.
$$

従って

$$
\left|\frac1{(1+z^2)^2}\right|
\le\frac1{(R^2-1)^2}.
$$

上半円弧の長さは $\pi R$ なので、[CA2 の ML 評価](../CA2/index.md#thm-ca2-reparam-ml) により

$$
\left|
\int_{C_R}\frac{dz}{(1+z^2)^2}
\right|
\le
\frac{\pi R}{(R^2-1)^2}
\longrightarrow0.
$$

$R\to\infty$ とすると

$$
\boxed{
\int_{-\infty}^{\infty}\frac{dx}{(1+x^2)^2}
=\frac\pi2
}.
$$
<!-- solution-end -->

<a id="ex-cax1-b04"></a>
#### CAX1-B04 Rouché で単位円内の零点数を数える
- Level: B

多項式

$$
p(z)=z^4+4z+1
$$

が単位円 $|z|<1$ 内にもつ零点の個数を、重複度を込めて求めよ。

<!-- solution-start -->
**解答**：単位円周 $|z|=1$ 上で、大きさを比較しやすい項を探します。

線形項は

$$
|4z|=4.
$$

円周上では

$$
|z^4+1|
\le |z|^4+1
=2.
$$

したがって

$$
|z^4+1|<|4z|
$$

が成り立ちます。[CA4 の Rouché の定理](../CA4/index.md#thm-ca4-rouche) を

$$
f(z)=4z,
\qquad
g(z)=z^4+1
$$

に適用すると、$4z$ と $p(z)=4z+(z^4+1)$ は単位円内に同じ個数の零点を持ちます。

$4z$ は $z=0$ に単純零点を一つだけ持つので、$p$ も単位円内に

$$
\boxed{1\text{ 個}}
$$

の零点を持ちます。
<!-- solution-end -->

<a id="ex-cax1-b05"></a>
#### CAX1-B05 Laurent 展開から極の位数と留数を読む
- Level: B

$$
f(z)=\frac{e^z-1-z}{z^4}
$$

について、$z=0$ の特異点の型、極の位数、留数を求めよ。さらに十分小さい反時計回りの円周 $|z|=r$ に沿う積分

$$
\int_{|z|=r}f(z)\,dz
$$

を求めよ。

<!-- solution-start -->
**解答**：分子を $z=0$ のまわりで展開します。

$$
e^z
=1+z+\frac{z^2}{2!}+\frac{z^3}{3!}+\frac{z^4}{4!}+\cdots.
$$

したがって

$$
e^z-1-z
=\frac{z^2}{2}+\frac{z^3}{6}+\frac{z^4}{24}+\cdots.
$$

これを $z^4$ で割ると

$$
f(z)
=\frac1{2z^2}+\frac1{6z}+\frac1{24}+\frac z{120}+\cdots.
$$

負の冪は $z^{-2}$ までで、最高の負冪が $z^{-2}$ です。従って $z=0$ は **2位の極** です。$(z^{-1})$ の係数が留数なので

$$
\boxed{\operatorname{Res}(f,0)=\frac16}.
$$

十分小さい円周の内部にある特異点は0だけです。[CA4 の留数定理](../CA4/index.md#thm-ca4-residue) により

$$
\int_{|z|=r}f(z)\,dz
=2\pi i\cdot\frac16
=\boxed{\frac{\pi i}{3}}.
$$
<!-- solution-end -->

<a id="ex-cax1-b06"></a>
#### CAX1-B06 同じ端点でも線積分が経路に依存する
- Level: B

被積分関数 $\overline z$ について、$0$ から $1+i$ までの次の二つの経路に沿う線積分を比較せよ。

1. 線分 $\gamma_1(t)=t(1+i)$, $0\le t\le1$。
2. $0\to1\to1+i$ と進む折れ線 $\gamma_2$。

すなわち

$$
\int_{\gamma_1}\overline z\,dz,
\qquad
\int_{\gamma_2}\overline z\,dz
$$

をそれぞれ求め、値が異なる理由を説明せよ。

<!-- solution-start -->
**解答**：$\overline z$ は正則ではないため、端点だけから積分値を決めることはできません。各経路をパラメータ表示して直接計算します。

**(1) 線分 $\gamma_1$**

$$
z=t(1+i),
\qquad
\overline z=t(1-i),
\qquad
dz=(1+i)dt.
$$

従って

$$
\begin{aligned}
\int_{\gamma_1}\overline z\,dz
&=\int_0^1t(1-i)(1+i)\,dt\\
&=\int_0^12t\,dt\\
&=1.
\end{aligned}
$$

よって

$$
\boxed{\int_{\gamma_1}\overline z\,dz=1}.
$$

**(2) 折れ線 $\gamma_2$**

最初の区間 $0\to1$ を

$$
z=t,
\qquad0\le t\le1
$$

と置くと

$$
\overline z=t,
\qquad dz=dt.
$$

したがって

$$
\int_{0\to1}\overline z\,dz
=\int_0^1t\,dt
=\frac12.
$$

次の区間 $1\to1+i$ は

$$
z=1+it,
\qquad0\le t\le1
$$

と書けます。このとき

$$
\overline z=1-it,
\qquad dz=i\,dt.
$$

よって

$$
\begin{aligned}
\int_{1\to1+i}\overline z\,dz
&=\int_0^1(1-it)i\,dt\\
&=\int_0^1(i+t)\,dt\\
&=i+\frac12.
\end{aligned}
$$

二つを足すと

$$
\int_{\gamma_2}\overline z\,dz
=\frac12+\left(i+\frac12\right)
=1+i.
$$

従って

$$
\boxed{\int_{\gamma_2}\overline z\,dz=1+i}.
$$

同じ始点・終点なのに

$$
1\ne1+i
$$

となりました。これは $\overline z$ が正則関数ではなく、この領域で正則な原始関数を持つという経路独立性の条件を満たさないためです。
<!-- solution-end -->

<a id="ex-cax1-b07"></a>
#### CAX1-B07 中心をずらした Laurent 展開
- Level: B

$$
f(z)=\frac1{z(z-1)}
$$

を $z=1$ のまわりで、次の二つの領域について Laurent 展開せよ。

1. $0<|z-1|<1$,
2. $|z-1|>1$。

さらに $z=1$ における留数を求めよ。

<!-- solution-start -->
**解答**：展開中心が $1$ なので

$$
w=z-1
$$

と置きます。すると $z=w+1$ であり

$$
f(z)=\frac1{w(w+1)}.
$$

**(1) $0<|w|<1$**

$$
\frac1{w(w+1)}
=\frac1w\frac1{1+w}.
$$

$|w|<1$ では

$$
\frac1{1+w}
=1-w+w^2-w^3+\cdots.
$$

従って一項ずつ $1/w$ を掛けて

$$
\frac1w(1-w+w^2-w^3+\cdots)
=\frac1w-1+w-w^2+\cdots.
$$

従って

$$
\boxed{
f(z)
=\frac1{z-1}-1+(z-1)-(z-1)^2+\cdots,
\quad0<|z-1|<1
}.
$$

$(z-1)^{-1}$ の係数は1なので

$$
\boxed{\operatorname{Res}(f,1)=1}.
$$

**(2) $|w|>1$**

今度は $1/w$ を小さい量にします。

$$
\frac1{w(w+1)}
=\frac1{w^2}\frac1{1+1/w}.
$$

$|1/w|<1$ なので

$$
\frac1{1+1/w}
=1-\frac1w+\frac1{w^2}-\frac1{w^3}+\cdots.
$$

したがって

$$
\boxed{
f(z)
=\frac1{(z-1)^2}-\frac1{(z-1)^3}+\frac1{(z-1)^4}-\cdots,
\quad |z-1|>1
}.
$$

外側の展開では $(z-1)^{-1}$ 項が消えています。半径1より外では中心 $1$ から見てもう一つの極 $z=0$ も内側に入り、その留数 $-1$ と $z=1$ の留数 $1$ が合計0になることとも整合します。
<!-- solution-end -->

<a id="ex-cax1-b08"></a>
#### CAX1-B08 複数の単純極の留数を足す
- Level: B

反時計回りの円周 $|z|=2$ に沿って

$$
I=\int_{|z|=2}\frac{z^2}{(z-1)(z^2+1)}\,dz
$$

を求めよ。

<!-- solution-start -->
**解答**：分母を因数分解すると

$$
(z-1)(z^2+1)
=(z-1)(z-i)(z+i)
$$

なので、極は

$$
z=1,
\qquad z=i,
\qquad z=-i
$$

です。いずれも絶対値が1で、$|z|=2$ の内部にあります。

まず $z=1$ の留数は

$$
\operatorname{Res}(f,1)
=\left.\frac{z^2}{z^2+1}\right|_{z=1}
=\frac12.
$$

次に $z=i$ では

$$
\begin{aligned}
\operatorname{Res}(f,i)
&=\left.\frac{z^2}{(z-1)(z+i)}\right|_{z=i}\\
&=\frac{-1}{(i-1)(2i)}.
\end{aligned}
$$

分母を整理すると

$$
(i-1)(2i)=-2-2i=-2(1+i),
$$

したがって

$$
\operatorname{Res}(f,i)
=\frac1{2(1+i)}
=\frac{1-i}{4}.
$$

$z=-i$ も省略せず計算すると

$$
\begin{aligned}
\operatorname{Res}(f,-i)
&=\left.\frac{z^2}{(z-1)(z-i)}\right|_{z=-i}\\
&=\frac{-1}{(-i-1)(-2i)}.
\end{aligned}
$$

分母は

$$
(-i-1)(-2i)=2i(i+1)=-2+2i=-2(1-i)
$$

なので

$$
\operatorname{Res}(f,-i)
=\frac1{2(1-i)}
=\frac{1+i}{4}.
$$

留数の和は

$$
\frac12+\frac{1-i}{4}+\frac{1+i}{4}
=\frac12+\frac12
=1.
$$

従って [CA4 の留数定理](../CA4/index.md#thm-ca4-residue) から

$$
I=2\pi i\cdot1.
$$

よって

$$
\boxed{I=2\pi i}.
$$

複数の極がある問題では、留数計算より先に「どの極が積分路の内側にあるか」を漏れなく列挙することが重要です。
<!-- solution-end -->

<a id="ex-cax1-b09"></a>
#### CAX1-B09 2位の極と単純極を同時に処理する
- Level: B

反時計回りの円周 $|z|=2$ に沿って

$$
I=\int_{|z|=2}\frac{\cos z}{z^2(z-1)}\,dz
$$

を求めよ。

<!-- solution-start -->
**解答**：内部の特異点は

$$
z=0,
\qquad z=1
$$

です。$z=0$ は2位の極、$z=1$ は単純極なので、同じ公式を機械的に使わず別々に計算します。

**$z=0$ の留数**

$$
f(z)=\frac{h(z)}{z^2},
\qquad
h(z)=\frac{\cos z}{z-1}
$$

と置きます。$h$ は0の近傍で正則です。ここで

$$
h(z)=h(0)+h'(0)z+O(z^2)
$$

と Taylor 展開すれば

$$
\frac{h(z)}{z^2}
=\frac{h(0)}{z^2}+\frac{h'(0)}z+O(1),
$$

となるので、$z^{-1}$ の係数、すなわち留数は $h'(0)$ です。

商を微分すると

$$
h'(z)
=\frac{-\sin z\,(z-1)-\cos z}{(z-1)^2}.
$$

$z=0$ を代入して

$$
h'(0)
=\frac{-0\cdot(-1)-1}{1}
=-1.
$$

従って

$$
\operatorname{Res}(f,0)=-1.
$$

**$z=1$ の留数**

単純極なので

$$
\operatorname{Res}(f,1)
=\left.\frac{\cos z}{z^2}\right|_{z=1}
=\cos1.
$$

留数の和は

$$
\cos1-1.
$$

したがって

$$
\boxed{
I=2\pi i(\cos1-1)
}.
$$

極の位数を最初に判定してから、それぞれに適した留数計算へ分岐するのがこの問題の要点です。
<!-- solution-end -->

<a id="ex-cax1-b10"></a>
#### CAX1-B10 四次式をもつ実積分
- Level: B

上半平面の半円輪郭を用いて

$$
I=\int_{-\infty}^{\infty}\frac{x^2}{x^4+1}\,dx
$$

を求めよ。

<!-- solution-start -->
**解答**：複素関数

$$
f(z)=\frac{z^2}{z^4+1}
$$

を考えます。極は

$$
z^4=-1=e^{i(\pi+2\pi k)}
$$

の解なので

$$
z=e^{i(\pi/4+k\pi/2)},
\qquad k=0,1,2,3.
$$

上半平面にあるのは

$$
a=e^{i\pi/4},
\qquad
b=e^{3i\pi/4}
$$

の二つです。どちらも単純極です。

分母 $q(z)=z^4+1$ の導関数は

$$
q'(z)=4z^3
$$

なので、単純極 $\alpha$ における留数は

$$
\operatorname{Res}(f,\alpha)
=\frac{\alpha^2}{4\alpha^3}
=\frac1{4\alpha}.
$$

従って

$$
\begin{aligned}
\operatorname{Res}(f,a)+\operatorname{Res}(f,b)
&=\frac14\left(e^{-i\pi/4}+e^{-3i\pi/4}\right)\\
&=\frac14\left[
\left(\frac1{\sqrt2}-\frac{i}{\sqrt2}\right)
+
\left(-\frac1{\sqrt2}-\frac{i}{\sqrt2}\right)
\right]\\
&=-\frac{i}{2\sqrt2}.
\end{aligned}
$$

半径 $R>1$ の上半円弧を $C_R$ とします。留数定理から

$$
\int_{-R}^{R}\frac{x^2}{x^4+1}\,dx
+
\int_{C_R}\frac{z^2}{z^4+1}\,dz
=2\pi i\left(-\frac{i}{2\sqrt2}\right)
=\frac{\pi}{\sqrt2}.
$$

円弧積分を評価します。$|z|=R$ では

$$
|z^4+1|
\ge R^4-1
$$

なので

$$
\left|\frac{z^2}{z^4+1}\right|
\le\frac{R^2}{R^4-1}.
$$

円弧長は $\pi R$ だから [CA2 の ML 評価](../CA2/index.md#thm-ca2-reparam-ml) により

$$
\left|
\int_{C_R}\frac{z^2}{z^4+1}\,dz
\right|
\le
\frac{\pi R^3}{R^4-1}
\longrightarrow0.
$$

従って

$$
\boxed{
\int_{-\infty}^{\infty}\frac{x^2}{x^4+1}\,dx
=\frac{\pi}{\sqrt2}
}.
$$
<!-- solution-end -->

### Level C：院試・編入の大問を意識した連結計算

<a id="ex-cax1-c01"></a>
#### CAX1-C01 Taylor 係数・高階導関数・円周積分をつなぐ
- Level: C

$$
f(z)=\frac1{(z-1)(z-3)}
$$

とする。

1. $f$ を $z=0$ のまわりで Taylor 展開し、収束半径を求めよ。
2. $f^{(4)}(0)$ を求めよ。
3. 反時計回りの円周 $|z|=1/2$ に沿う積分
   $$
   \int_{|z|=1/2}\frac{f(z)}{z^5}\,dz
   $$
   を求めよ。

<!-- solution-start -->
**解答**：まず部分分数分解します。

$$
\frac1{(z-1)(z-3)}
=\frac A{z-1}+\frac B{z-3}
$$

と置くと

$$
1=A(z-3)+B(z-1).
$$

$z=1$ を代入して $1=-2A$ より $A=-1/2$、$z=3$ を代入して $1=2B$ より $B=1/2$。したがって

$$
\frac1{(z-1)(z-3)}
=-\frac1{2(z-1)}+\frac1{2(z-3)}.
$$

**(1) Taylor 展開**

$|z|<1$ では

$$
\frac1{z-1}
=-\frac1{1-z}
=-\sum_{n=0}^\infty z^n.
$$

したがって

$$
-\frac1{2(z-1)}
=\frac12\sum_{n=0}^\infty z^n.
$$

また

$$
\frac1{z-3}
=-\frac13\frac1{1-z/3}
=-\frac13\sum_{n=0}^\infty\left(\frac z3\right)^n
$$

なので

$$
\frac1{2(z-3)}
=-\frac16\sum_{n=0}^\infty\frac{z^n}{3^n}.
$$

従って

$$
\begin{aligned}
f(z)
&=\sum_{n=0}^\infty
\left(
\frac12-\frac1{6\cdot3^n}
\right)z^n\\
&=\sum_{n=0}^\infty
\left(
\frac12-\frac1{2\cdot3^{n+1}}
\right)z^n.
\end{aligned}
$$

よって

$$
\boxed{
c_n=\frac12-\frac1{2\cdot3^{n+1}}
}.
$$

原点から特異点 $1,3$ までの距離はそれぞれ1と3で、最も近い特異点は $z=1$ です。従って収束半径は

$$
\boxed{R=1}.
$$

**(2) $f^{(4)}(0)$**

Taylor 係数と導関数の関係

$$
c_4=\frac{f^{(4)}(0)}{4!}
$$

を使います。

$$
c_4
=\frac12-\frac1{2\cdot3^5}
=\frac12-\frac1{486}
=\frac{121}{243}.
$$

したがって

$$
\begin{aligned}
f^{(4)}(0)
&=4!\,c_4\\
&=24\cdot\frac{121}{243}\\
&=\frac{968}{81}.
\end{aligned}
$$

よって

$$
\boxed{f^{(4)}(0)=\frac{968}{81}}.
$$

**(3) 円周積分**

分母 $z^5$ は $(z-0)^{4+1}$ なので、[CA3 の Cauchy 高階導関数公式](../CA3/index.md#thm-ca3-cauchy-derivatives) で $n=4$ に対応します。

$$
f^{(4)}(0)
=\frac{4!}{2\pi i}
\int_{|z|=1/2}\frac{f(z)}{z^5}\,dz.
$$

したがって

$$
\int_{|z|=1/2}\frac{f(z)}{z^5}\,dz
=\frac{2\pi i}{4!}f^{(4)}(0).
$$

(2) の値を代入すると

$$
\begin{aligned}
I
&=\frac{2\pi i}{24}\cdot\frac{968}{81}\\
&=2\pi i\cdot\frac{121}{243}\\
&=\boxed{\frac{242\pi i}{243}}.
\end{aligned}
$$

同じ値は Taylor 係数 $c_4$ を直接使い

$$
I=2\pi i\,c_4
$$

と読んでも得られます。
<!-- solution-end -->

<a id="ex-cax1-c02"></a>
#### CAX1-C02 Rouché で円板と環状領域の零点数を数える
- Level: C

$$
p(z)=z^5+3z+1
$$

とする。

1. $|z|<1$ にある零点の個数を重複度込みで求めよ。
2. $|z|<2$ にある零点の個数を重複度込みで求めよ。
3. $1<|z|<2$ にある零点の個数を重複度込みで求めよ。

<!-- solution-start -->
**解答**：同じ多項式でも、円の半径によって支配的な項が変わります。

**(1) 単位円内**

$|z|=1$ 上では

$$
|3z|=3.
$$

一方

$$
|z^5+1|
\le |z|^5+1
=2.
$$

従って

$$
|z^5+1|<|3z|
$$

です。[CA4 の Rouché の定理](../CA4/index.md#thm-ca4-rouche) を

$$
f(z)=3z,
\qquad
g(z)=z^5+1
$$

に適用すると、$p=f+g$ は $3z$ と同じ個数の零点を単位円内に持ちます。

$3z$ の零点は $z=0$ の一つだけなので

$$
\boxed{N_{|z|<1}=1}.
$$

また境界上では厳密な不等式が成立しているため、$p$ は $|z|=1$ 上に零点を持ちません。

**(2) 半径2の円内**

今度は $|z|=2$ 上で5次項を主項にします。

$$
|z^5|=2^5=32.
$$

残りは

$$
|3z+1|
\le3|z|+1
=7.
$$

従って

$$
|3z+1|<|z^5|.
$$

Rouché を

$$
f(z)=z^5,
\qquad
g(z)=3z+1
$$

に適用すると、$p$ と $z^5$ は $|z|<2$ に同じ個数の零点を持ちます。$z^5$ は0に重複度5の零点を持つので

$$
\boxed{N_{|z|<2}=5}.
$$

ここでも厳密不等式から $|z|=2$ 上に零点はありません。

**(3) 環状領域 $1<|z|<2$**

境界円周上に零点がないことを (1), (2) で確認済みなので、環状領域内の零点数は二つの円板内零点数の差です。

$$
N_{1<|z|<2}
=N_{|z|<2}-N_{|z|<1}
=5-1
=4.
$$

従って

$$
\boxed{N_{1<|z|<2}=4}.
$$

この問題では、半径1では線形項、半径2では最高次項が支配的になります。Rouché は「常に最高次項を見る」のではなく、**その境界で最も比較しやすく確実に大きい部分を選ぶ**のが計算上の要点です。
<!-- solution-end -->

<a id="ex-cax1-c03"></a>
#### CAX1-C03 局所 Laurent 展開から半径別の円周積分へ
- Level: C

$$
f(z)=\frac{e^z}{z^2(z-1)}
$$

とする。

1. $0<|z|<1$ における $z=0$ 中心の Laurent 展開を、少なくとも定数項まで求めよ。
2. $z=0$ の極の位数と留数を求めよ。
3. 反時計回りの円周 $|z|=1/2$ に沿う積分 $\displaystyle\int_{|z|=1/2}f(z)\,dz$ を求めよ。
4. 反時計回りの円周 $|z|=2$ に沿う積分 $\displaystyle\int_{|z|=2}f(z)\,dz$ を求めよ。

<!-- solution-start -->
**解答**：この問題では、原点近傍の級数計算と、円の半径を変えたときに内部へ入る極の変化をつなぎます。

**(1) Laurent 展開**

$|z|<1$ では

$$
\frac1{z-1}
=-\frac1{1-z}
=-\sum_{n=0}^{\infty}z^n.
$$

したがって

$$
f(z)
=-\frac{e^z}{z^2}\frac1{1-z}.
$$

ここで

$$
e^z
=1+z+\frac{z^2}{2}+\frac{z^3}{6}+\cdots,
$$

$$
\frac1{1-z}
=1+z+z^2+z^3+\cdots.
$$

二つを掛けます。低次の係数を順に計算すると

$$
[z^0]:1,
$$

$$
[z^1]:1+1=2,
$$

$$
[z^2]:1+1+\frac12=\frac52,
$$

$$
[z^3]:1+1+\frac12+\frac16=\frac83.
$$

従って

$$
\frac{e^z}{1-z}
=1+2z+\frac52z^2+\frac83z^3+\cdots.
$$

これに $-z^{-2}$ を掛けるので

$$
\boxed{
f(z)
=-\frac1{z^2}-\frac2z-\frac52-\frac83z-\cdots,
\qquad0<|z|<1
}.
$$

**(2) $z=0$ の極と留数**

最高の負べきが $z^{-2}$ なので0は2位の極です。また $z^{-1}$ の係数から

$$
\boxed{\operatorname{Res}(f,0)=-2}.
$$

**(3) $|z|=1/2$ の円周積分**

半径 $1/2$ の内部にある極は $z=0$ だけです。従って

$$
\int_{|z|=1/2}f(z)\,dz
=2\pi i\operatorname{Res}(f,0)
=2\pi i(-2).
$$

よって

$$
\boxed{
\int_{|z|=1/2}f(z)\,dz=-4\pi i
}.
$$

**(4) $|z|=2$ の円周積分**

今度は $z=0$ に加えて $z=1$ も内部に入ります。$z=1$ は単純極で

$$
\operatorname{Res}(f,1)
=\lim_{z\to1}(z-1)\frac{e^z}{z^2(z-1)}
=\frac e{1^2}
=e.
$$

したがって内部の留数和は

$$
-2+e=e-2.
$$

[CA4 の留数定理](../CA4/index.md#thm-ca4-residue) から

$$
\boxed{
\int_{|z|=2}f(z)\,dz
=2\pi i(e-2)
}.
$$

小さい円では局所 Laurent 展開の $z^{-1}$ 係数だけで終わりますが、円を広げて別の極を取り込むと、その留数を追加しなければならないことが分かります。
<!-- solution-end -->

<a id="ex-cax1-c04"></a>
#### CAX1-C04 Rouché と偏角原理をつなぐ
- Level: C

多項式

$$
p(z)=z^6+5z^2+1
$$

について、次を求めよ。

1. $|z|<1$ にある零点の個数を重複度込みで求めよ。
2. $|z|<2$ にある零点の個数を重複度込みで求めよ。
3. $1<|z|<2$ にある零点の個数を求めよ。
4. 次の二つの積分を求めよ。
   $$
   \int_{|z|=1}\frac{p'(z)}{p(z)}\,dz,
   \qquad
   \int_{|z|=2}\frac{p'(z)}{p(z)}\,dz.
   $$

<!-- solution-start -->
**解答**：前半で Rouché により零点数を求め、その結果を後半の [CA4 の偏角原理](../CA4/index.md#thm-ca4-argument-principle) へそのまま入力します。

**(1) $|z|<1$**

$|z|=1$ 上で

$$
|5z^2|=5.
$$

残りは

$$
|z^6+1|
\le |z|^6+1
=2.
$$

従って

$$
|z^6+1|<|5z^2|.
$$

[CA4 の Rouché の定理](../CA4/index.md#thm-ca4-rouche) により

$$
p(z)=5z^2+(z^6+1)
$$

は $5z^2$ と単位円内に同じ個数の零点を持ちます。$5z^2$ は $z=0$ に重複度2の零点を持つので

$$
\boxed{N_1=2}.
$$

また境界上で厳密な不等式が成り立つため、$|z|=1$ 上に $p$ の零点はありません。

**(2) $|z|<2$**

$|z|=2$ 上では最高次項を主項にします。

$$
|z^6|=2^6=64.
$$

一方

$$
|5z^2+1|
\le5|z|^2+1
=21.
$$

従って

$$
|5z^2+1|<|z^6|.
$$

Rouché により $p(z)$ と $z^6$ は $|z|<2$ に同じ個数の零点を持ちます。よって

$$
\boxed{N_2=6}.
$$

ここでも $|z|=2$ 上に零点はありません。

**(3) 環状領域**

二つの境界上に零点がないので、差を取れば

$$
N_{1<|z|<2}
=N_2-N_1
=6-2
=4.
$$

従って

$$
\boxed{4\text{ 個}}.
$$

**(4) 対数微分の円周積分**

偏角原理では、一般に

$$
\frac1{2\pi i}
\int_{|z|=r}\frac{f'(z)}{f(z)}\,dz
=N_r-P_r
$$

となります。ここで $N_r$ は円内の零点数、$P_r$ は極の個数で、どちらも重複度・位数込みです。本問の $p$ は多項式なので有限平面に極を持たず $P_r=0$。さらに (1), (2) で $|z|=1,2$ 上に零点がないことも確認済みです。従って

$$
\frac1{2\pi i}
\int_{|z|=r}\frac{p'(z)}{p(z)}\,dz
=N_r
$$

と使えます。

まず $r=1$ では $N_1=2$ なので

$$
\int_{|z|=1}\frac{p'(z)}{p(z)}\,dz
=2\pi i\cdot2
=\boxed{4\pi i}.
$$

次に $r=2$ では $N_2=6$ なので

$$
\int_{|z|=2}\frac{p'(z)}{p(z)}\,dz
=2\pi i\cdot6
=\boxed{12\pi i}.
$$

なお

$$
p'(z)=6z^5+10z
$$

なので、積分を明示的に書けば

$$
\int_{|z|=r}
\frac{6z^5+10z}{z^6+5z^2+1}\,dz
$$

です。この有理関数を部分分数分解するのではなく、Rouché で零点数を決めて偏角原理へ渡すのが計算上は圧倒的に短い経路です。
<!-- solution-end -->

---

## 3. 仕上げチェック

次を紙上で迷わず実行できれば、CA1〜CA4 の計算コアはかなり安定しています。

- $u,v$ が与えられたら4つの偏導関数を並べ、Cauchy–Riemann 方程式を照合できる。
- 実部または虚部だけが与えられたら、一方の Cauchy–Riemann 方程式で積分し、残った1変数関数をもう一方の式で決められる。
- $e^z=w$ を絶対値と偏角に分け、$2\pi k$ を落とさず全解を書ける。
- 線積分で $z=\gamma(t)$ と $dz=\gamma'(t)dt$ を同時に代入できる。
- 非正則な被積分関数では、同じ端点でも経路を変えると積分値が変わり得ることを直接計算で確認できる。
- 円周積分で、特異点の位置と分母の冪を見て Cauchy 型か留数型か判断できる。
- $1/(1-w)=\sum w^n$ を使う前に $|w|<1$ の条件を書ける。
- Laurent 展開では、同じ関数でも環状領域や展開中心ごとに展開が変わることを計算で処理できる。
- 高位極では $(z-a)^{-1}$ の係数を確実に取り出せる。
- 実積分では、円弧積分を「消える」で済ませず ML 評価まで書ける。
- Rouché では、境界上の厳密不等式を作ってから零点個数を移せる。
- $f'/f$ 型の円周積分を見たら、偏角原理で零点数・極数へ読み替えられる。
