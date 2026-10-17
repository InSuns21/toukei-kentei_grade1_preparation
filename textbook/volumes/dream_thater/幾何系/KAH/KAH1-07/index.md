# KAH1-07 Fubini–Study形式II（貼り合わせと規格化）

<!-- definition-example-audit: strict -->

## 1. 局所的な面積を射影空間全体で測る

前章では、$\mathbb{CP}^n$ の[標準チャートとその正則遷移](../KAH1-06/index.md#prop-kah1-06-projective-atlas)を作り、各チャートで[局所Fubini–Study形式](../KAH1-06/index.md#def-kah1-06-local-fs)を定めた。どの座標でも正値で閉じている。しかし、**同じ点を別のチャートで記述したときに形式が一致するか**は、まだ確認していない。

ポテンシャル自体が異なっていても、その差が[多重調和関数](../KAH1-04/index.md#def-kah1-04-pluriharmonic)なら混合二階微分は同じになる。ここでは重なりでの差を同次座標から直接求め、その後で射影直線全体の面積と正則線束の曲率を同じ規格化で照合する。

以後 $n\ge1$、$X=\mathbb{CP}^n$。同次座標を $[Z_0:\cdots:Z_n]$、$U_a=\{Z_a\ne0\}$ とする。前章と同じ規約

$$
\omega_a=i\partial\bar\partial\varphi_a,
\qquad
\varphi_a=\log\left(1+\sum_{j\ne a}\left|\frac{Z_j}{Z_a}\right|^2\right)
$$

を用いる。$\partial,\bar\partial$ は複素多様体の[型別外微分](../../CM/CM2-02/index.md#thm-cm2-02-double-complex-identities)である。射影空間上の積分では、正則座標 $z=x+iy$ が与える $dx\wedge dy$ を正の向きとする。

## 2. 重なり上のポテンシャル変換

$U_a\cap U_b$ で $t_{ab}=Z_b/Z_a$ とおく。これは零にならない正則関数である。$a$ 番目を $1$ に規格化した代表元を $s_a=Z/Z_a$、$b$ 番目を $1$ にしたものを $s_b=Z/Z_b$ とすると、

$$
s_b=t_{ab}^{-1}s_a,\qquad
\|s_b\|^2=|t_{ab}|^{-2}\|s_a\|^2.
$$

$\|s_a\|^2=1+\sum_{j\ne a}|Z_j/Z_a|^2$ だから、対数を取って

$$
\boxed{\ \varphi_b=\varphi_a-\log|t_{ab}|^2\ }\qquad(U_a\cap U_b).
$$

ここで対数は**正の実数** $|t_{ab}|^2$ の対数であり、大域的な複素対数の枝は必要ない。$t$ が零でない正則関数であるとき、$\partial_{\bar j}t=0$ と $\partial_i\bar t=0$ を使えば、

$$
\begin{aligned}
\partial\log|t|^2&=\frac{\partial t}{t},\\
\bar\partial\partial\log|t|^2
&=\bar\partial\left(\frac{\partial t}{t}\right)=0,\\
\partial\bar\partial\log|t|^2&=0
\end{aligned}
$$

となる。最後の式では $\partial\bar\partial+\bar\partial\partial=0$ を使った。すなわち変換で現れる差は多重調和である。

<a id="thm-kah1-07-global-fs"></a>

<!-- formal-statement-start -->
> **定理（Fubini–Study形式の大域貼り合わせ）**  
> $n\ge1$ とし、$\mathbb{CP}^n$ の各標準チャート $U_a$ に、次の局所実関数と2形式を定める。

$$
\varphi_a=\log\left(\sum_{j=0}^n\left|\frac{Z_j}{Z_a}\right|^2\right),
\qquad \omega_a=i\partial\bar\partial\varphi_a.
$$

> 局所形式は各チャートの重なり上で一致し、ただ一つの大域的な滑らかな実 $(1,1)$ 形式 $\omega_{\mathrm{FS}}$ を定める。この大域形式は閉じており、零でない $(1,0)$ 接ベクトルに対して正である。
>
> 従って $\omega_{\mathrm{FS}}$ は射影空間上のKähler形式である。
<!-- formal-statement-end -->

### 証明の見取り図

代表元の規格化を変えるとポテンシャルに $\log|t|^2$ が加減されるだけである。これを混合二階微分で消し、前章の正値性を引き継ぐ。

<!-- proof-start -->
### 証明

任意の $a,b$ と $U_a\cap U_b$ 上で、上で得た式に $i\partial\bar\partial$ を作用させると

$$
\begin{aligned}
\omega_b
&=i\partial\bar\partial\varphi_b\\
&=i\partial\bar\partial\varphi_a
-i\partial\bar\partial\log|t_{ab}|^2
=\omega_a.
\end{aligned}
$$

従って各 $U_a$ 上で $\omega_{\mathrm{FS}}|_{U_a}=\omega_a$ と置くと、重なり上での値が一致するので大域的で滑らかな2形式を一意に定める。各チャートで実 $(1,1)$ 型であること、閉性は[ポテンシャルからの構成](../KAH1-06/index.md#thm-kah1-06-fs-positive)で証明済みである。外微分も型も局所的に判定できるため、大域的にも成立する。

正値性については、任意の点 $p$ と零でない $v\in T_p^{1,0}X$ を取り、$p\in U_a$ を選ぶ。[局所Fubini–Study形式の正値性](../KAH1-06/index.md#thm-kah1-06-fs-positive)より $-i\omega_a(v,\bar v)>0$。$\omega_a=\omega_{\mathrm{FS}}|_{U_a}$ なので同じ不等式が大域形式にも成立する。$X$ の複素構造は[正則アトラス](../KAH1-06/index.md#prop-kah1-06-projective-atlas)により可積分であるから、[Kähler構造の定義](../KAH1-01/index.md#def-kah1-01-kahler-structure)を満たす。$\square$
<!-- proof-end -->

**直接例：$\mathbb{CP}^1$ の二枚のチャート。** $U_0$ では $z=Z_1/Z_0$、$U_1$ では $w=Z_0/Z_1=1/z$。重なりは $\mathbb C^\times$ であり、

$$
\begin{aligned}
\varphi_1(w(z))
&=\log(1+|z|^{-2})\\
&=\log\left(\frac{1+|z|^2}{|z|^2}\right)
=\varphi_0(z)-\log|z|^2.
\end{aligned}
$$

ここで $\partial_z\log|z|^2=1/z$、$\partial_{\bar z}(1/z)=0$。この計算だけで、$\log|z|^2$ が原点を除いた重なり上で多重調和であることが確認できる。

さらに形式を直接引き戻して検算する。前章の[一次元の局所Fubini–Study形式](../KAH1-06/index.md#def-kah1-06-local-fs)と $dw=-z^{-2}dz$ から、

$$
\begin{aligned}
(i\partial\bar\partial\varphi_1)_{w=1/z}
&=\frac{i}{(1+|w|^2)^2}dw\wedge d\bar w\\
&=\frac{i|z|^{-4}}{(1+|z|^{-2})^2}dz\wedge d\bar z\\
&=\frac{i}{(1+|z|^2)^2}dz\wedge d\bar z
=i\partial\bar\partial\varphi_0.
\end{aligned}
$$

ポテンシャルが一致していなくても、正しい座標変換を含めた2形式は一致する。

## 3. $\mathbb{CP}^1$ の面積と係数 $2\pi$

大域形式ができたので、今度は$\mathbb{CP}^1$全体の面積を計算できる。$U_0\simeq\mathbb C$ の外にある点は $[0:1]$ の一点だけである。滑らかな2形式の積分では一点を取り除いても値は変わらない。積分の収束も具体的に確かめる。

<a id="thm-kah1-07-area"></a>

<!-- formal-statement-start -->
> **定理（Fubini–Study形式の射影直線上の面積）**  
> $\mathbb{CP}^1$ に上の規格化 $\omega_{\mathrm{FS}}=i\partial\bar\partial\log(1+|z|^2)$ で定義した大域Fubini–Study形式を与える。複素向きに関する面積は

$$
\int_{\mathbb{CP}^1}\omega_{\mathrm{FS}}=2\pi.
$$

> 特に $\omega_{\mathrm{FS}}/(2\pi)$ の $\mathbb{CP}^1$ 上の積分は $1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

複素座標と実座標の変換 $i\,dz\wedge d\bar z=2\,dx\wedge dy$ が係数を決める。有限半径の円盤で積分し、半径を無限大へ送る。

<!-- proof-start -->
### 証明

$z=x+iy$ とおくと $dz=dx+i\,dy$、$d\bar z=dx-i\,dy$ である。交代性から

$$
dz\wedge d\bar z
=(dx+i\,dy)\wedge(dx-i\,dy)
=-2i\,dx\wedge dy.
$$

従って $U_0$ 上の形式は

$$
\omega_{\mathrm{FS}}=\frac{2}{(1+x^2+y^2)^2}\,dx\wedge dy.
$$

極座標 $x=r\cos\theta,y=r\sin\theta$ において $dx\wedge dy=r\,dr\wedge d\theta$。半径 $R$ の円盤の面積 $I(R)$ は

$$
\begin{aligned}
I(R)
&=\int_0^{2\pi}\int_0^R
\frac{2r}{(1+r^2)^2}\,dr\,d\theta\\
&=4\pi\int_0^R\frac{r}{(1+r^2)^2}\,dr\\
&=2\pi\left[-\frac1{1+r^2}\right]_0^R\\
&=2\pi\left(1-\frac1{1+R^2}\right).
\end{aligned}
$$

$R\to\infty$ で $I(R)\to2\pi$。また残りの領域の積分は $2\pi/(1+R^2)$ で零へ収束する。$\omega_{\mathrm{FS}}$ は無限遠点の $w$ 座標でも滑らかなので、そこで特異な面積寄与はない。$\square$
<!-- proof-end -->

**別計算：境界積分で係数を再検算する。** $d^c=\frac{i}{2}(\bar\partial-\partial)$ を滑らかな実関数への作用として置くと、型別微分の恒等式から $dd^c=i\partial\bar\partial$。$z=re^{i\theta}$、$\varphi_0=\log(1+r^2)$ に対し

$$
\begin{aligned}
d^c\varphi_0
&=\frac{i}{2(1+r^2)}(z\,d\bar z-\bar z\,dz)\\
&=\frac{r^2}{1+r^2}\,d\theta,
\end{aligned}
$$

これは $r>0$ での極座標表示であり、元の式は原点でも滑らかである。[Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)を半径 $R$ の円盤に適用すると

$$
\int_{|z|\le R}\omega_{\mathrm{FS}}
=\int_{|z|=R}d^c\varphi_0
=\int_0^{2\pi}\frac{R^2}{1+R^2}\,d\theta
=\frac{2\pi R^2}{1+R^2}.
$$

前の $I(R)$ と全く同じである。したがって係数 $2$ と向きの符号を異なる方法で照合できた。$d^c\varphi_0$ はこのチャート上の1形式であり、**全射影直線上で定義した原始形式だとは主張していない**。

## 4. $\mathcal O(1)$ の計量と第一Chern形式

幾何の面積形式が、なぜ線束の曲率と同じになるのだろうか。[普遍部分線束 $\mathcal O(-1)$](../../CM/CM2-08/index.md#def-cm2-08-standard-quotient)は、点 $[Z]$ が表す直線そのものを繊維とする。$\mathcal O(1)=\mathcal O(-1)^\vee$ はその[双対線束](../../CM/CM2-08/index.md#def-cm2-08-dual-bundle)である。普遍部分線束には $\mathbb C^{n+1}$ の標準Hermite計量を制限し、双対束には[誘導Hermite計量](../../CM/CM2-09/index.md#def-cm2-09-induced-metrics)を入れる。曲率から定める[第一Chern形式](../../CM/CM2-11/index.md#def-cm2-11-first-chern-form)は、正則枠でのChern接続を計算して確かめる。

$U_a$ で同次代表 $Z$ を $cZ$（$c\ne0$）に取り替えても、$cZ/(cZ_a)=Z/Z_a$ だから $s_a=Z/Z_a$ は代表の選択によらない。各点 $[Z]$ の繊維 $\mathbb CZ$ に属する非零ベクトルで、局所座標に正則に依存するため、これは普遍部分線束の正則枠である。その長さの二乗は $\|s_a\|^2=e^{\varphi_a}$。双対枠 $\epsilon_a$ は $\epsilon_a(s_a)=1$ を満たす線形汎関数であり、一次元の双対計量ではこの枠の長さの二乗が $\|s_a\|^{-2}$ となる。

$$
h_a=\|\epsilon_a\|^2
=\|s_a\|^{-2}
=e^{-\varphi_a}.
$$

この $h_a$ を使えば、ポテンシャルから曲率への対応が単なる偶然ではなく、正則枠での計量微分から生まれることが分かる。

<a id="prop-kah1-07-chern"></a>

<!-- formal-statement-start -->
> **命題（O(1)の第一Chern形式とFubini–Study形式）**  
> $n\ge1$ とする。$\mathbb{CP}^n$ の正則線束 $\mathcal O(1)$ に、普遍部分線束の標準Hermite計量から誘導した双対Hermite計量 $h$ を与える。このとき、曲率を $F_D=D^2$ とするChern接続の第一Chern形式は

$$
c_1(\mathcal O(1),h)=\frac{i}{2\pi}F_D
=\frac{\omega_{\mathrm{FS}}}{2\pi}
$$

> として大域的に一致する。特に $\mathbb{CP}^1$ での積分は $1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

枠の変換と計量の変換を照合してから、[正則線束のChern接続公式](../../CM/CM2-10/index.md#prop-cm2-10-line-formula)を用いる。曲率の計算では $\bar\partial\partial=-\partial\bar\partial$ の符号を落とさない。

<!-- proof-start -->
### 証明

$U_a\cap U_b$ で $s_b=t_{ab}^{-1}s_a$ だから、双対枠は

$$
\epsilon_b=t_{ab}\epsilon_a.
$$

従って双対計量の枠変更則から $h_b=|t_{ab}|^2h_a$。実際、先ほどのポテンシャル変換を用いて

$$
h_b=e^{-\varphi_b}
=e^{-\varphi_a+\log|t_{ab}|^2}
=|t_{ab}|^2h_a
$$

となり、二つの方法で一致する。

[線束のChern接続公式](../../CM/CM2-10/index.md#prop-cm2-10-line-formula)では正則枠でのChern接続の局所係数は $A_a=\partial\log h_a$ である。$h_a=e^{-\varphi_a}$ を代入して

$$
A_a=-\partial\varphi_a,\qquad
F_D|_{U_a}=\bar\partial A_a
=-\bar\partial\partial\varphi_a
=\partial\bar\partial\varphi_a.
$$

最後に[第一Chern形式の定義](../../CM/CM2-11/index.md#def-cm2-11-first-chern-form)を適用すると

$$
\frac{i}{2\pi}F_D|_{U_a}
=\frac{i}{2\pi}\partial\bar\partial\varphi_a
=\frac{\omega_a}{2\pi}.
$$

左辺は[曲率の枠変更則](../../CM/CM2-11/index.md#prop-cm2-11-curvature-local)により大域的、右辺は[大域貼り合わせ定理](#thm-kah1-07-global-fs)により大域的だから、全空間で等しい。最後は[射影直線の面積定理](#thm-kah1-07-area)を使い $\int_{\mathbb{CP}^1}c_1(\mathcal O(1),h)=2\pi/(2\pi)=1$。$\square$
<!-- proof-end -->

**定義と公式の具体照合（$n=1$）。** $U_0$ では

$$
h_0=(1+|z|^2)^{-1},\qquad
A_0=-\frac{\bar z}{1+|z|^2}\,dz,\qquad
F_D=\frac{1}{(1+|z|^2)^2}\,dz\wedge d\bar z.
$$

$U_1$ では $\epsilon_1=z\epsilon_0$ であり、接続の枠変更は $A_1=A_0+dz/z$。実際 $w=1/z$ での $h_1=(1+|w|^2)^{-1}$ の対数微分もこれと一致する。この計算は[一般の $\mathcal O(k)$ の曲率積分](../../CM/CM2-11/index.md#thm-cm2-11-projective-line)の $k=1$ に一致し、規格化の独立な照合にもなる。

ここで言う「第一Chern形式」は曲率で定義された実閉2形式である。一般の複素多様体上でそのde Rham類と整係数第一Chern類を比較する一般論はこの局所計算から勝手に導かず、後続で扱う。

## 5. 大域的なポテンシャルはなぜ一つにできないか

局所ポテンシャル同士の差が多重調和であることは、単一の大域ポテンシャルの存在を意味しない。$\mathbb{CP}^1$ でその違いを面積で見抜ける。

<a id="prop-kah1-07-no-global-potential"></a>

<!-- formal-statement-start -->
> **命題（射影直線のFubini–Study形式に大域ポテンシャルはない）**  
> $\mathbb{CP}^1$ 上には、$\omega_{\mathrm{FS}}=i\partial\bar\partial\Phi$ を全域で満たす滑らかな実関数 $\Phi$ は存在しない。
<!-- formal-statement-end -->

### 証明の見取り図

大域的な $\Phi$ があれば $\omega_{\mathrm{FS}}$ は完全2形式になる。一方、コンパクトで境界のない射影直線では完全2形式の積分は零になる。

<!-- proof-start -->
### 証明

仮に $\Phi$ が存在すれば、上で定めた $d^c=\frac i2(\bar\partial-\partial)$ によって

$$
\omega_{\mathrm{FS}}
=i\partial\bar\partial\Phi
=d(d^c\Phi).
$$

$\Phi$ は全域で滑らかであり、$d^c$ も大域的な型別微分から作られるので $d^c\Phi$ は大域的1形式である。[Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)を境界のないコンパクト曲面 $\mathbb{CP}^1$ に適用すると

$$
\int_{\mathbb{CP}^1}\omega_{\mathrm{FS}}
=\int_{\mathbb{CP}^1}d(d^c\Phi)
=\int_{\partial\mathbb{CP}^1}d^c\Phi=0.
$$

しかし[射影直線の面積定理](#thm-kah1-07-area)で左辺は $2\pi$。矛盾する。$\square$
<!-- proof-end -->

つまりチャート間の差は局所形式の貼り合わせを許す一方、非零の面積が単一の大域ポテンシャルを妨げる。これは後で扱うKähler classの最も簡単な模型になる。

## 6. 演習：貼り合わせ・面積・線束を結ぶ

### Level A

<a id="ex-kah1-07-a01"></a>
#### KAH1-07-A01 射影直線のポテンシャル差
- Level: A

$U_0\cap U_1$ の $z\ne0$ に対し $\varphi_0(z)=\log(1+|z|^2)$、$\varphi_1(w)=\log(1+|w|^2)$、$w=1/z$ とする。差 $\varphi_0(z)-\varphi_1(1/z)$ を求め、混合微分が零であることを直接確かめよ。

<!-- solution-start -->
**詳細解答**。$1+|1/z|^2=(1+|z|^2)/|z|^2$ なので

$$
\varphi_0(z)-\varphi_1(1/z)=\log|z|^2.
$$

重なりでは $z\ne0$ であるから、$\partial_z\log|z|^2=1/z$ が定義できる。$1/z$ は正則なので $\partial_{\bar z}(1/z)=0$。従って $\partial\bar\partial\log|z|^2=0$（または混合微分の交換により同じ結論）であり、二つのポテンシャルは同じ2形式を定める。
<!-- solution-end -->

<a id="ex-kah1-07-a02"></a>
#### KAH1-07-A02 三成分からの重なり公式
- Level: A

$\mathbb{CP}^2$ の $U_0\cap U_2$ で $z^1=Z_1/Z_0,z^2=Z_2/Z_0$ とする。$U_2$ の二座標を書き、$\varphi_2-\varphi_0$ を $z^2$ で表せ。

<!-- solution-start -->
**詳細解答**。$z^2\ne0$ であり、$U_2$ の座標は $w^0=Z_0/Z_2=1/z^2$ と $w^1=Z_1/Z_2=z^1/z^2$。ゆえに

$$
\begin{aligned}
1+|w^0|^2+|w^1|^2
&=1+\frac1{|z^2|^2}+\frac{|z^1|^2}{|z^2|^2}\\
&=\frac{1+|z^1|^2+|z^2|^2}{|z^2|^2}.
\end{aligned}
$$

対数を取ると $\varphi_2-\varphi_0=-\log|z^2|^2$。分母の $z^2$ は重なり上で非零正則なので、混合微分は零となる。
<!-- solution-end -->

<a id="ex-kah1-07-a03"></a>
#### KAH1-07-A03 2形式を座標で引き戻す
- Level: A

$w=1/z$ のもとで $i(1+|w|^2)^{-2}dw\wedge d\bar w$ を $z$ 座標へ引き戻し、$z$ 側のFubini–Study形式と比較せよ。

<!-- solution-start -->
**詳細解答**。$dw=-z^{-2}dz$、$d\bar w=-\bar z^{-2}d\bar z$ なので、その外積は $|z|^{-4}dz\wedge d\bar z$。また

$$
(1+|w|^2)^{-2}
=\left(\frac{1+|z|^2}{|z|^2}\right)^{-2}
=\frac{|z|^4}{(1+|z|^2)^2}.
$$

両係数を掛けると $|z|^4|z|^{-4}=1$ となり、引き戻しは $i(1+|z|^2)^{-2}dz\wedge d\bar z$。チャート間の一致が確認できた。
<!-- solution-end -->

<a id="ex-kah1-07-a04"></a>
#### KAH1-07-A04 半径 $R$ までの面積
- Level: A

$U_0$ の円盤 $|z|\le R$ におけるFubini–Study面積を求め、円盤外の面積を計算せよ。

<!-- solution-start -->
**詳細解答**。$\omega_{\mathrm{FS}}=2(1+r^2)^{-2}r\,dr\wedge d\theta$ だから

$$
\begin{aligned}
I(R)
&=4\pi\int_0^R\frac{r}{(1+r^2)^2}\,dr\\
&=2\pi\left[-\frac1{1+r^2}\right]_0^R\\
&=2\pi\left(1-\frac1{1+R^2}\right).
\end{aligned}
$$

全体の面積は $R\to\infty$ で $2\pi$ となるため、外側は

$$
2\pi-I(R)=\frac{2\pi}{1+R^2}.
$$

正であり、$R\to\infty$ で零に近づく。無限遠点への面積の集中は起きない。
<!-- solution-end -->

### Level B

<a id="ex-kah1-07-b01"></a>
#### KAH1-07-B01 双対線束の枠と曲率
- Level: B

$\mathbb{CP}^1$ の普遍部分線束の枠を $s_0=(1,z)$ と $s_1=(w,1)$、$w=1/z$ とする。双対枠の遷移、標準計量から誘導される双対の長さ、$U_0$ でのChern接続と曲率を求めよ。

<!-- solution-start -->
**詳細解答**。重なり上で $s_1=z^{-1}s_0$。評価 $\epsilon_a(s_a)=1$ を保つには $\epsilon_1=z\epsilon_0$ でなければならない。$\|s_0\|^2=1+|z|^2$ より

$$
h_0=\|\epsilon_0\|^2=(1+|z|^2)^{-1}.
$$

同様に $h_1=(1+|w|^2)^{-1}$ であり、$h_1=|z|^2h_0$。[正則線束のChern接続](../../CM/CM2-10/index.md#prop-cm2-10-line-formula)を適用して

$$
A_0=\partial\log h_0=-\frac{\bar z}{1+|z|^2}dz.
$$

$\partial_{\bar z}(\bar z/(1+|z|^2))=(1+|z|^2)^{-2}$ を計算すると

$$
F_D=\bar\partial A_0
=-\frac{1}{(1+|z|^2)^2}d\bar z\wedge dz
=\frac{1}{(1+|z|^2)^2}dz\wedge d\bar z.
$$

よって $(i/2\pi)F_D=\omega_{\mathrm{FS}}/(2\pi)$。
<!-- solution-end -->

<a id="ex-kah1-07-b02"></a>
#### KAH1-07-B02 普遍部分線束では符号が逆
- Level: B

前問の双対を取る前の $\mathcal O(-1)$ のChern曲率と、第一Chern形式の$\mathbb{CP}^1$上の積分を求めよ。$\mathcal O(1)$ と符号が反転する理由も説明せよ。

<!-- solution-start -->
**詳細解答**。普遍部分線束の計量は $h_0^-=1+|z|^2$ であり、$\log h_0^-=\varphi_0$。従って

$$
A_0^-=\partial\varphi_0=\frac{\bar z}{1+|z|^2}dz,\qquad
F_D^-=\bar\partial\partial\varphi_0=-\partial\bar\partial\varphi_0.
$$

$U_0$ では

$$
F_D^-=-\frac{1}{(1+|z|^2)^2}dz\wedge d\bar z,\qquad
\frac{i}{2\pi}F_D^-=-\frac{\omega_{\mathrm{FS}}}{2\pi}.
$$

[射影直線の面積定理](#thm-kah1-07-area)より積分は $-2\pi/(2\pi)=-1$。[双対束の誘導曲率](../../CM/CM2-11/index.md#prop-cm2-11-induced-curvature)で線束の曲率が負になることとも一致する。
<!-- solution-end -->

<a id="ex-kah1-07-b03"></a>
#### KAH1-07-B03 $\mathbb{CP}^2$ 内の射影直線
- Level: B

$\mathbb{CP}^2$ 内の $L=\{[Z_0:0:Z_2]\}$ にFubini–Study形式を制限せよ。$Z_0\ne0$ で $u=Z_2/Z_0$ を使い、制限の式と $\int_L\omega_{\mathrm{FS}}$ を求めよ。

<!-- solution-start -->
**詳細解答**。$U_0$ の二座標は $(z^1,z^2)=(Z_1/Z_0,Z_2/Z_0)$。$L$ 上では $z^1=0,z^2=u$ である。制限したポテンシャルは

$$
\varphi_0|_L=\log(1+|0|^2+|u|^2)=\log(1+|u|^2).
$$

包含写像は局所的に $u\mapsto(z^1,z^2)=(0,u)$ と表される。従って $dz^1=d\bar z^1=0$、$dz^2=du$、$d\bar z^2=d\bar u$ となり、[局所Fubini–Study形式](../KAH1-06/index.md#def-kah1-06-local-fs)の引き戻しには $(2,\bar2)$ 成分だけが残る。制限ポテンシャルから直接確かめても

$$
\partial_u\partial_{\bar u}\log(1+u\bar u)
=\partial_{\bar u}\left(\frac{\bar u}{1+u\bar u}\right)
=\frac{1}{(1+|u|^2)^2}
$$

なので

$$
\omega_{\mathrm{FS}}|_L
=\frac{i}{(1+|u|^2)^2}du\wedge d\bar u.
$$

$L$ は $[0:0:1]$ を一点追加した $\mathbb C$ であり、射影直線の二チャートと同じである。従って[射影直線の面積定理](#thm-kah1-07-area)を同じ座標式に適用して $\int_L\omega_{\mathrm{FS}}=2\pi$。
<!-- solution-end -->

### Level C

<a id="ex-kah1-07-c01"></a>
#### KAH1-07-C01 重み付きFubini–Study形式と規格化
- Level: C

$\lambda_0,\lambda_1>0$ とし、$\mathbb{CP}^1$ の $U_0$ に $\Phi_0(z)=\log(\lambda_0+\lambda_1|z|^2)$、$U_1$ に $\Phi_1(w)=\log(\lambda_0|w|^2+\lambda_1)$ を与える。

1. $w=1/z$ での二つのポテンシャルの差を求め、大域形式 $\Omega=i\partial\bar\partial\Phi_a$ が定まることを証明せよ。
2. $\Omega$ が全点で正値かつ閉であることを確かめ、その面積を積分で求めよ。
3. $\mathcal O(1)$ の枠 $\epsilon_0,\epsilon_1$ に $h_a=e^{-\Phi_a}$ を与え、計量の貼り合わせと第一Chern形式との関係を示せ。

<!-- solution-start -->
**詳細解答**。まず重なり $z\ne0$ で

$$
\begin{aligned}
\Phi_1(1/z)
&=\log(\lambda_0|z|^{-2}+\lambda_1)\\
&=\log\left(\frac{\lambda_0+\lambda_1|z|^2}{|z|^2}\right)
=\Phi_0(z)-\log|z|^2.
\end{aligned}
$$

$\partial\bar\partial\log|z|^2=0$ だから両チャートの形式は一致して大域形式になる。

次に $S=\lambda_0+\lambda_1z\bar z$ と置く。$\partial_z\Phi_0=\lambda_1\bar z/S$ を $\bar z$ で微分すると

$$
\partial_{\bar z}\partial_z\Phi_0
=\frac{\lambda_1}{S}
-\frac{\lambda_1^2|z|^2}{S^2}
=\frac{\lambda_0\lambda_1}{S^2}.
$$

両パラメータが正なので、$U_0$ ではこの係数が正である。残る点 $[0:1]$ は $U_1$ の $w=0$ に当たる。$T=\lambda_1+\lambda_0|w|^2$ と置いて同様に微分すると

$$
\partial_{\bar w}\partial_w\Phi_1
=\frac{\lambda_0}{T}-\frac{\lambda_0^2|w|^2}{T^2}
=\frac{\lambda_0\lambda_1}{T^2}>0.
$$

従って $U_0\cup U_1=\mathbb{CP}^1$ の全点で正値である。両チャートで滑らかな実 $(1,1)$ 形式をポテンシャルから構成しており、$d=\partial+\bar\partial$ と $\partial^2=\bar\partial^2=0$ より $d\Omega=0$ である。実座標では $\Omega=2\lambda_0\lambda_1S^{-2}\,dx\wedge dy$。極座標積分で

$$
\begin{aligned}
\int_{\mathbb{CP}^1}\Omega
&=4\pi\lambda_0\lambda_1
 \int_0^\infty\frac{r}{(\lambda_0+\lambda_1r^2)^2}\,dr\\
&=2\pi\lambda_0
 \left[-\frac{1}{\lambda_0+\lambda_1r^2}\right]_0^\infty\\
&=2\pi.
\end{aligned}
$$

最後に $\epsilon_1=z\epsilon_0$ という $\mathcal O(1)$ の枠変換に対し、

$$
h_1(1/z)=e^{-\Phi_1(1/z)}
=|z|^2e^{-\Phi_0(z)}=|z|^2h_0(z)
$$

となるから、正値Hermite計量は貼り合わさる。正則線束のChern接続は $A_a=\partial\log h_a=-\partial\Phi_a$、曲率は $F_D=\bar\partial A_a=\partial\bar\partial\Phi_a$。よって第一Chern形式は $(i/2\pi)F_D=\Omega/(2\pi)$ であり、積分は $1$。$\lambda_0=\lambda_1=1$ で本文の規格化に戻る。
<!-- solution-end -->

## 7. 次に何を計算するか

局所の正値性に加え、**重なりでの一致、射影直線の面積、線束のChern曲率との符号・係数の一致**まで確定した。次章ではKähler条件が接束の接続係数へどう現れるかを調べる。ここでの行列式や曲率の本格的な導出は、次章以降に進むための出発点となる。
