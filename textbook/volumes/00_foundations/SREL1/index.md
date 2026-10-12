# SREL1 慣性系・光速度不変・Lorentz変換

<!-- definition-example-audit: strict -->

[MECH1 の Galilei 変換](../MECH1/index.md#def-mech1-galilei-transform)では、動いている観測者の座標は $x'=x-vt$、時計は $t'=t$ と扱いました。日常の低速運動ならこれで十分です。しかし[EMAG8 の真空電磁波の速度](../EMAG8/index.md#def-emag8-wave-speed)は、Maxwell 方程式から

$$
c=\frac{1}{\sqrt{\mu_0\varepsilon_0}}>0
$$

と定まります。Galilei 変換のまま光の軌道 $x=ct$ を変換すると $x'=(c-v)t'$ となり、別の観測者には速度 $c-v$ に見えてしまいます。

**どの慣性系でも真空中の光が同じ速さ $c$ で伝わる**とすると、座標と時計の読み方のどちらを改める必要があるでしょうか。この章では先に物理的前提を明示し、その前提から座標変換を導きます。動いている時計や棒について結論を暗記するのではなく、**どの二つの事象を比較しているか**を明示して計算します。

## 1. 何を前提とするか

本章では運動を $x$ 軸上の一次元に制限し、時間座標を $t$ とします。二つの向きのそろった慣性系を $S,S'$ と書きます。

$S$ から見て $S'$ の原点は $x=vt$ と動きます。原点が出会う事象で二系の時計と座標の原点を一致させます。

$
x=x'=0,\qquad t=t'=0.
$

相対速度には $|v|<c$ を仮定します。時間・空間座標は実数、世界線は必要に応じて微分可能とします。

慣性系とは、外力を受けない自由粒子が等速直線運動するように座標を取った系です。離れた時計の同期には手順が必要です。各慣性系内で光信号を往復させ、往路と復路に同じ時間を割り当てる Einstein の同期規約を採用します。こうして割り当てた座標時刻を $t,t'$ とし、別の慣性系で同時性が一致することまでは仮定しません。

<a id="principle-srel1-postulates"></a>

<!-- formal-statement-start -->
> **原理（特殊相対論の二つの基本要請）**  
> 同じ向きに合わせた二つの慣性系 $S,S'$ について、(1) 物理法則はどの慣性系でも同じ形を持ち、ある慣性系だけを優先しない（相対性原理）、(2) 真空中を進む光の速さは、光源の運動によらず、いずれの慣性系でも同じ正定数 $c$ である（光速度不変）と要請する。
<!-- formal-statement-end -->

これは数学的に証明する定理ではなく、実験によって検証する物理的要請です。EMAG8 で Maxwell 方程式から $c$ という速さを得たこと**だけ**から、すべての慣性系で同じ値だとは論理的に結論できません。ここに新しい物理的入力があります。

以下の導出ではさらに、時空の一様性（同じ変換法則が場所・時刻によらない）、空間の等方性（左右を逆にしても物理法則は変わらない）、変換の連続性、そして時計の未来方向を保存することを用います。この追加条件は変換の縮尺まで確定するために必要です。

<a id="def-srel1-event"></a>

<!-- formal-statement-start -->
> **定義（事象と世界線）**  
> 時刻 $t$ と位置 $x$ の組 $(t,x)$ を一つの事象という。物体や光の位置を時刻の関数で追跡した点集合 $\{(t,x(t))\}$ をその世界線という。二つの座標 $(t,x)$、$(t',x')$ は同じ事象の異なる慣性系での表示である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-srel1-event -->
### 例：原点を追う

**定義の確認**：同じ事象を異なる座標で表す具体例です。

$S'$ の原点を追うと、$S$ では $(t,vt)$、$S'$ では $(t',0)$ と記述します。

たとえば $S$ の時刻が $t=2\,\mathrm{s}$、相対速度が $v=3\,\mathrm{m/s}$ なら位置は $x=6\,\mathrm m$ です。座標の数値が変わっても追っている事象は一つです。世界線は多数の事象の集まりであり、一個の点ではありません。
<!-- definition-example-end -->

## 2. 光の二方向を保つ変換を探す

慣性系の原点を一致させ、時空の一様性と慣性運動の直線性から、座標変換を原点を固定する可逆線形写像として取ります。その線形性は、空間・時間の並進に対して同じ座標差を与えるという一様性と、連続性のもとで要請しているものです。$S'$ の原点の世界線 $x=vt$ を $x'=0$ に写すので、ある係数 $a(v)\ne0$ により

$$
x'=a(v)(x-vt)
$$

となります。時間の変換はまだ分からないため、

$$
t'=b(v)t+d(v)x
$$

とおきます。

右向きの光の世界線 $x=ct$ は $x'=ct'$、左向きの光 $x=-ct$ は $x'=-ct'$ に写る必要があります。最初の式へ順に代入すると

$$
\begin{aligned}
a(c-v)&=cb+c^2d,\\
a(-c-v)&=-cb+c^2d.
\end{aligned}
$$

二式を引くと $2ac=2cb$ なので $b=a$、足すと $-2av=2c^2d$ なので $d=-av/c^2$ です。従って

$$
x'=a(x-vt),\qquad
t'=a\left(t-\frac{vx}{c^2}\right).
$$

ここまでで決まったのは**両座標の係数の比**です。共通の係数 $a$ は、光速度不変だけでは決まりません。

### 2.1 逆向きから縮尺を確定する

相対性原理により逆変換は同じ形で速度を $-v$ としたものです。

$$
x=a(-v)(x'+vt'),\qquad
t=a(-v)\left(t'+\frac{vx'}{c^2}\right).
$$

これに上の二式を代入すると、

$$
\begin{aligned}
x&=a(-v)a(v)\left[(x-vt)+v\left(t-\frac{vx}{c^2}\right)\right]\\
 &=a(-v)a(v)\left(1-\frac{v^2}{c^2}\right)x,\\
t&=a(-v)a(v)\left[\left(t-\frac{vx}{c^2}\right)+\frac{v}{c^2}(x-vt)\right]\\
 &=a(-v)a(v)\left(1-\frac{v^2}{c^2}\right)t.
\end{aligned}
$$

ゆえに $a(v)a(-v)(1-v^2/c^2)=1$ です。左右を反転した同等な実験は $v$ を $-v$ へ変えるので、空間の等方性から $a(v)=a(-v)$ です。$a(0)=1$ で連続、かつ時間の未来方向を保存する変換を選ぶため $a(v)>0$ と決め、正の平方根を取ります。

<a id="def-srel1-gamma"></a>

<!-- formal-statement-start -->
> **定義（Lorentz因子）**  
> 真空中の光速 $c>0$ と $|v|<c$ に対して、正の実数
>
$$
\gamma(v)=\frac{1}{\sqrt{1-v^2/c^2}}
$$
>
> を Lorentz因子という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-srel1-gamma -->
### 例：速度が光速の五分の三

**定義の確認**：相対速度が定義域内にあり、正の平方根を取れることを確かめます。

$v=3c/5$ は $|v|<c$ を満たすので定義可能で、

$$
1-\frac{v^2}{c^2}=1-\frac9{25}=\frac{16}{25},
\qquad
\gamma(v)=\frac54
$$

です。静止なら $\gamma(0)=1$、$0<|v|<c$ なら $0<1-v^2/c^2<1$ より $\gamma(v)>1$ です。
<!-- definition-example-end -->

<a id="thm-srel1-lorentz"></a>

<!-- formal-statement-start -->
> **定理（一次元Lorentz変換）**  
> 二つの慣性系 $S,S'$ は原点で出会い、$S'$ は $S$ に対して $x$ 軸の正方向へ速度 $v$（$|v|<c$）で動くとする。相対性原理、両方向の光速度不変、時空の一様性、空間の等方性、連続性と未来方向の保存を要請すると、原点に一致する事象を固定する座標変換は
>
$$
x'=\gamma(v)(x-vt),\qquad
t'=\gamma(v)\left(t-\frac{vx}{c^2}\right)
$$
>
> である。逆変換は
>
$$
x=\gamma(v)(x'+vt'),\qquad
t=\gamma(v)\left(t'+\frac{vx'}{c^2}\right)
$$
>
> である。
<!-- formal-statement-end -->

### 証明の見取り図

原点の軌跡から空間変換の形を決め、右向き・左向きの光の軌跡から時間変換を決めます。最後に逆変換と左右対称性で縮尺を確定します。**光の一本だけを使って時間変換を推測してはいけません。**

<!-- proof-start -->
### 証明

前述の線形変換に右向き・左向きの光を代入して $b=a$、$d=-av/c^2$ を得ました。相対性原理による逆変換を合成すると、恒等写像となる条件は

$$
a(v)a(-v)\left(1-\frac{v^2}{c^2}\right)=1.
$$

等方性から $a(v)=a(-v)$、連続性と $a(0)=1$ による正の枝を選んで $a(v)=\gamma(v)$ です。逆変換についても $\gamma(-v)=\gamma(v)$ なので定理の二式が得られます。$\gamma(v)$ は有限かつ正、また $1-v^2/c^2>0$ なので変換は可逆です。
<!-- proof-end -->

### 2.2 本当に光速は同じか

右向きの光 $x=ct$ を変換すると

$$
x'=\gamma(c-v)t,\qquad
ct'=\gamma\left(c-\frac{v}{c}ct\right)
=\gamma(c-v)t,
$$

よって $x'=ct'$ です。左向きも $x=-ct$ として

$$
x'=-\gamma(c+v)t,\qquad
ct'=\gamma(c+v)t
$$

を得るので $x'=-ct'$ です。変換公式は出発点の光速度不変を実際に満たしています。

$|v|<c$ の必要性も見えます。$|v|=c$ では $\gamma$ の分母が零となり、光とともに静止する慣性系をこの変換の中へ含められません。

## 3. 時計とものさしを比較する

同時性、時間間隔、長さは全て「**どの二事象の座標差を取るか**」という問題です。

<a id="prop-srel1-simultaneity"></a>

<!-- formal-statement-start -->
> **命題（同時性の相対性）**  
> 上記の Lorentz変換のもとで、二事象の $S$ 座標差を $(\Delta t,\Delta x)$ とすると
>
$$
\Delta t'=\gamma\left(\Delta t-\frac{v\Delta x}{c^2}\right).
$$
>
> 特に $v\ne0$、$\Delta t=0$、$\Delta x\ne0$ なら $\Delta t'\ne0$ であり、一方の系で同時でも他方の系で同時とは限らない。
<!-- formal-statement-end -->

### 証明の見取り図

変換の時間成分を二つの事象に適用して引くだけです。ただし $t'_1$ と $t'_2$ は各位置の時計をその系で同期させた読みであることに注意します。

<!-- proof-start -->
### 証明

二事象を $(t_1,x_1)$、$(t_2,x_2)$ とし、両者に [一次元Lorentz変換](#thm-srel1-lorentz)の時間成分を適用します。

$$
t'_2-t'_1
=\gamma\left(t_2-\frac{vx_2}{c^2}\right)
-\gamma\left(t_1-\frac{vx_1}{c^2}\right).
$$

$\gamma$ は二事象について同じ相対速度 $v$ の定数なのでまとめられます。

$$
\Delta t'
=\gamma\left((t_2-t_1)-\frac{v(x_2-x_1)}{c^2}\right).
$$

$\Delta t=0$ なら $\Delta t'=-\gamma v\Delta x/c^2$ で、指定された非零条件から結論を得ます。
<!-- proof-end -->

具体例として、$S$ で $x=0$ と $x=L>0$ にある二つのランプを $t=0$ に点灯させます。$v>0$ のとき $S'$ での点灯時刻は、それぞれ

$
t'_0=0,\qquad t'_L=-\frac{\gamma vL}{c^2}.
$

どちらの系の時計が間違っているわけでもありません。各系での時計同期と同時面が異なるのです。

<a id="prop-srel1-time-dilation"></a>

<!-- formal-statement-start -->
> **命題（運動する時計の時間の遅れ）**  
> $S'$ で静止する一本の時計が刻む二事象の時間差を $\Delta t'>0$、その二事象を $S$ が測る時間差を $\Delta t>0$ とする。両系の相対速度が $|v|<c$ なら
>
$$
\Delta t=\gamma(v)\Delta t'.
$$
>
> すなわち $S$ では、動いている時計の一刻みの間に $\gamma$ 倍の座標時間が経つ。
<!-- formal-statement-end -->

### 証明の見取り図

時計が静止しているのは **$S'$** なので、その二つの刻みは $\Delta x'=0$ です。この条件を逆変換へ代入します。

<!-- proof-start -->
### 証明

[逆Lorentz変換](#thm-srel1-lorentz)の時間差を取ると

$$
\Delta t=\gamma\left(\Delta t'+\frac{v\Delta x'}{c^2}\right).
$$

時計が $S'$ に静止するので $\Delta x'=0$ です。従って $\Delta t=\gamma\Delta t'$ を得ます。$\gamma\ge1$ より、$v\ne0$ なら $\Delta t>\Delta t'$ です。
<!-- proof-end -->

**誤用への注意：** $S$ の異なる場所にある二台の時計の表示差は、一本の時計が刻んだ時間差とは異なります。上の証明は一本の時計の世界線で $\Delta x'=0$ としたことに依存します。

<a id="def-srel1-rest-length"></a>

<!-- formal-statement-start -->
> **定義（静止長と観測長）**  
> 一つの慣性系で静止する棒の両端の座標差を、その系での静止長 $L_0>0$ という。別の慣性系で棒の長さを測るときは、その系で**同じ時刻**に読み取った両端の位置差の絶対値を観測長 $L$ という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-srel1-rest-length -->
### 例：両端を同時に読む

**定義の確認**：静止長と観測長で使用する二事象の条件を確かめます。

$S'$ で棒の左端が $x'_A=0$、右端が $x'_B=10\,\mathrm m$ に固定されているなら、静止長は $L_0=10\,\mathrm m$ です。

$S$ では両端が動きます。例えば $t=0$ に位置を同時記録して $x_B-x_A$ を測ります。異なる $S$ 時刻で測った二位置の差は、この定義による観測長ではありません。
<!-- definition-example-end -->

<a id="prop-srel1-length-contraction"></a>

<!-- formal-statement-start -->
> **命題（長さの収縮）**  
> $S'$ で静止している $x'$ 軸方向の棒の静止長を $L_0>0$ とする。$S$ から見て $S'$ が速度 $v$、$|v|<c$ で動くとき、$S$ で同時刻に観測した棒の長さ $L$ は
>
$$
L=\frac{L_0}{\gamma(v)}
$$
>
> である。
<!-- formal-statement-end -->

### 証明の見取り図

棒の両端に対して**同じ $S$ 時刻**の二事象を選び、その位置差を空間変換へ代入します。

<!-- proof-start -->
### 証明

棒の端を $A,B$ とし、$S$ で同時に測った事象を $(t,x_A)$、$(t,x_B)$ とします。[Lorentz変換](#thm-srel1-lorentz)の空間成分へ代入して

$$
\begin{aligned}
x'_B-x'_A
&=\gamma[(x_B-vt)-(x_A-vt)]\\
&=\gamma(x_B-x_A).
\end{aligned}
$$

$S'$ で両端は静止しているため、異なる $S'$ 時刻に対応する端点の位置差も静止長 $L_0$ です。棒の向きを正とすると、前式は

$
L_0=x'_B-x'_A=\gamma(x_B-x_A)=\gamma L
$

となり、$L=L_0/\gamma$ を得ます。ここで選んだのは $S$ で同時の二事象（$\Delta t=0$）であり、$S'$ で同時の事象ではありません。
<!-- proof-end -->

## 4. 速度をどう合成するか

[MECH1 の Galilei変換における速度の法則](../MECH1/index.md#prop-mech1-galilei-velocity-acceleration)は $w'=w-v$ でした。Lorentz変換では時間も位置に依存するので、微分すると分母が現れます。

<a id="thm-srel1-velocity"></a>

<!-- formal-statement-start -->
> **定理（一次元速度変換と光速の不変性）**  
> 微分可能な世界線 $x=x(t)$ の $S$ での速度を $w=dx/dt$ とし、$S'$ は $S$ に対して速度 $|v|<c$ で動くとする。$1-vw/c^2\ne0$ の点では、$S'$ での速度は
>
$$
w'=\frac{w-v}{1-vw/c^2}
$$
>
> となる。とくに $w=\pm c$ なら $w'=\pm c$ である。
<!-- formal-statement-end -->

### 証明の見取り図

座標変換を世界線に沿って $t$ で微分し、$dx'/dt$ を $dt'/dt$ で割ります。分母が零なら $t'$ を局所パラメータにできないため、速度の商は定義できません。

<!-- proof-start -->
### 証明

[Lorentz変換](#thm-srel1-lorentz)を $t$ で微分します。$v,\gamma$ は一定なので

$$
\frac{dx'}{dt}=\gamma\left(\frac{dx}{dt}-v\right)=\gamma(w-v),
$$

$$
\frac{dt'}{dt}=\gamma\left(1-\frac{v}{c^2}\frac{dx}{dt}\right)
=\gamma\left(1-\frac{vw}{c^2}\right).
$$

分母の非零条件のもと、連鎖律から

$$
\frac{dx'}{dt'}=\frac{dx'/dt}{dt'/dt}
=\frac{\gamma(w-v)}{\gamma(1-vw/c^2)}
=\frac{w-v}{1-vw/c^2}.
$$

$w=c$ なら分子 $c-v=c(1-v/c)$、分母 $1-v/c$ で、$|v|<c$ のため約分可能で $w'=c$ です。$w=-c$ なら分子 $-c-v=-c(1+v/c)$、分母 $1+v/c$ で $w'=-c$ です。
<!-- proof-end -->

### 4.1 二つのboostを続ける

$S$ から見て $S'$ が速度 $v$、さらに $S'$ から見て $S''$ が速度 $u$ とします。$S''$ の原点は $S'$ で $w'=u$ なので、上式を $w$ について解きます。

$$
u\left(1-\frac{vw}{c^2}\right)=w-v,
$$

$$
u+v=w\left(1+\frac{uv}{c^2}\right).
$$

<a id="prop-srel1-composition"></a>

<!-- formal-statement-start -->
> **命題（共線速度の合成）**  
> $|u|<c$、$|v|<c$ の二つの同じ向きに整列した慣性系間の速度を続けて合成したとき、合成速度は
>
$$
u\oplus v=\frac{u+v}{1+uv/c^2}
$$
>
> であり、常に $|u\oplus v|<c$ である。
<!-- formal-statement-end -->

### 証明の見取り図

上で得た合成式のほか、分母の正値と $c^2-(u\oplus v)^2>0$ を直接確認します。

<!-- proof-start -->
### 証明

$|uv|<c^2$ より $1+uv/c^2>0$ です。直前の逆向きの速度変換から合成式を得ています。速度の大きさを判定するため、

$$
\begin{aligned}
1-\frac{(u\oplus v)^2}{c^2}
&=\frac{(1+uv/c^2)^2-(u+v)^2/c^2}{(1+uv/c^2)^2}\\
&=\frac{1+2uv/c^2+u^2v^2/c^4-u^2/c^2-2uv/c^2-v^2/c^2}{(1+uv/c^2)^2}\\
&=\frac{(1-u^2/c^2)(1-v^2/c^2)}{(1+uv/c^2)^2}>0.
\end{aligned}
$$

従って $|u\oplus v|<c$ です。
<!-- proof-end -->

低速 $|u|,|v|\ll c$ では分母はほぼ1で $u\oplus v$ は $u+v$ に近づきます。しかし二つの速度がいずれも $0.8c$ だからといって $1.6c$ になるわけではありません。

## 5. どこまで分かったか

一次元Lorentz変換は、**光速の不変性、相対性原理、一様性・等方性**を満たす慣性系の時空座標の取り換えです。長さの収縮では $S$ で同時刻の二事象を選び、時間の遅れでは $S'$ の一本の時計の二事象を選びました。この選び方を逆にすると結果は成立しません。

今は慣性系同士の **一次元** の変換だけを扱いました。次章では、三次元空間を含む事象、Minkowski計量、光円錐、固有時を定義します。加速系や重力をこの章の式から無条件に扱えるわけではありません。

---

# 演習

## Level A

### A1. Galilei変換の矛盾

$S$ で右向きの光を $x=ct$、$S'$ の速度を $v=c/4$ とする。Galilei変換 $x'=x-vt,\ t'=t$ による速度を求め、光速度不変と比較せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[Galilei変換](../MECH1/index.md#def-mech1-galilei-transform)へ $x=ct$ を代入すると

$$
x'=(c-v)t=(c-c/4)t=\frac{3c}{4}t'.
$$

従って速度は $dx'/dt'=3c/4$ です。$S'$ でも $c$ であるという要請と一致しません。矛盾しているのは微分の計算ではなく、$t'=t$ という古典的な時刻の扱いと光速度不変の両立です。
<!-- solution-end -->

### A2. Lorentz因子と逆変換

$v=3c/5$ とする。$\gamma(v)$ を求め、事象 $(t,x)=(5\,\mathrm s,3c\,\mathrm s)$ の $t',x'$ を求めよ。さらに逆変換で元へ戻ることを確かめよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$1-v^2/c^2=16/25$ より $\gamma=5/4$ です。まず

$$
x'=\frac54(3c\,\mathrm s-3c\,\mathrm s)=0,
$$

$$
t'=\frac54\left(5\,\mathrm s-\frac{(3c/5)(3c\,\mathrm s)}{c^2}\right)
=\frac54\left(5-\frac95\right)\mathrm s=4\,\mathrm s.
$$

逆変換で

$$
x=\frac54(0+3c\cdot4\,\mathrm s/5)=3c\,\mathrm s,
$$

$$
t=\frac54(4\,\mathrm s+0)=5\,\mathrm s.
$$

よって両座標が復元されます。
<!-- solution-end -->

### A3. 同時だった二つの点灯

$S$ で二事象の間隔が $\Delta t=0,\ \Delta x=600\,\mathrm m$ とする。$S'$ の速度は $v=3c/5$、$c=3.0\times10^8\,\mathrm{m/s}$ として $\Delta t'$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$|v|<c$ で $\gamma=5/4$ です。[同時性の相対性](#prop-srel1-simultaneity)に代入すると

$$
\Delta t'=-\gamma\frac{v\Delta x}{c^2}
=-\frac54\frac{(3c/5)\cdot600\,\mathrm m}{c^2}
=-\frac{450\,\mathrm m}{c}
=-1.5\times10^{-6}\,\mathrm s.
$$

$\Delta t'$ が負とは、$S$ で右側にある事象が、$S'$ では先に起こるという意味です。座標時刻の順序は空間的に離れた二事象では入れ替わることがあります。
<!-- solution-end -->

### A4. 一本の時計と棒の区別

速度 $v=4c/5$ の $S'$ に静止する時計で $\Delta t'=3\,\mathrm s$ 経過した。$S$ での時間差を求めよ。また $S'$ に静止する静止長 $L_0=12\,\mathrm m$ の棒を $S$ が同時に測った長さを求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$\gamma=1/\sqrt{1-16/25}=5/3$ です。時計の二事象は $\Delta x'=0$ なので、[時間の遅れ](#prop-srel1-time-dilation)から

$$
\Delta t=\gamma\Delta t'=\frac53\cdot3\,\mathrm s=5\,\mathrm s.
$$

棒は $S$ で同時に両端の位置を取る条件 $\Delta t=0$ を使うので、[長さの収縮](#prop-srel1-length-contraction)から

$$
L=\frac{L_0}{\gamma}=12\cdot\frac35\,\mathrm m=\frac{36}{5}\,\mathrm m=7.2\,\mathrm m.
$$

時計の比較は $\Delta x'=0$、棒の比較は $\Delta t=0$ であり、同じ条件ではありません。
<!-- solution-end -->

## Level B

### B1. 光の二方向から係数を求める

$x'=a(x-vt)$、$t'=bt+dx$（$a\ne0$）が、$x=ct$ を $x'=ct'$ に、$x=-ct$ を $x'=-ct'$ に写すとする。$b,d$ を $a,v,c$ で表せ。さらに逆変換との合成で $a(v)a(-v)(1-v^2/c^2)=1$ を確かめよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

右向きへ代入すると $a(c-v)=cb+c^2d$、左向きへ代入すると $a(-c-v)=-cb+c^2d$ です。差を取ると $2ac=2cb$ なので $b=a$、和を取ると $-2av=2c^2d$ なので $d=-av/c^2$ です。従って

$$
x'=a(v)(x-vt),\quad t'=a(v)(t-vx/c^2).
$$

速度 $-v$ の逆変換 $x=a(-v)(x'+vt')$ に代入すると

$$
x=a(-v)a(v)\left[(x-vt)+v(t-vx/c^2)\right]
=a(-v)a(v)(1-v^2/c^2)x.
$$

任意の $x$ について元に戻るには $a(-v)a(v)(1-v^2/c^2)=1$ が必要です。時間成分の合成でも同じ係数が出ます。右向きの光一本だけでは $b,d$ に対して一式しか得られず、一意に決まりません。
<!-- solution-end -->

### B2. 光より遅い速度の合成

$S$ から見て $S'$ の速度を $3c/5$、$S'$ から見て $S''$ の速度を $4c/5$ とする。$S$ から見た $S''$ の速度を求め、$c$ より小さいことを数値で確認せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

両速度とも絶対値は $c$ より小さいので [共線速度の合成](#prop-srel1-composition)を使えます。

$$
\frac{u\oplus v}{c}
=\frac{\frac45+\frac35}{1+\frac45\frac35}
=\frac{\frac75}{\frac{37}{25}}
=\frac{35}{37}.
$$

$35<37$ なので $(35/37)c<c$ です。古典的な和 $7c/5$ は不適切です。なお合成の分母 $37/25$ は正なので符号も正に決まります。
<!-- solution-end -->

### B3. 時間差は零になるか

$S$ における二事象の座標差を $\Delta x=900\,\mathrm m,\ \Delta t=2.0\,\mu\mathrm s$、$c=3.0\times10^8\,\mathrm{m/s}$ とする。これらを同時に測る慣性系 $S'$ が存在するか判定し、存在するなら速度 $v$ を求めよ。さらに $\Delta t=4.0\,\mu\mathrm s$ だった場合も判定せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[同時性の相対性](#prop-srel1-simultaneity)から $\Delta t'=0$ は $\Delta t=v\Delta x/c^2$ と同値です。$\Delta x\ne0$ より候補速度は

$$
v=\frac{c^2\Delta t}{\Delta x}.
$$

最初は $c\Delta t=600\,\mathrm m$ なので

$$
\frac vc=\frac{c\Delta t}{\Delta x}=\frac{600}{900}=\frac23.
$$

$|v|<c$ を満たすので、この速度は許されます。式へ戻すと

$
\Delta t'=\gamma\left(\Delta t-\frac{v\Delta x}{c^2}\right)=0
$

を確認できます。二番目は $c\Delta t=1200\,\mathrm m$ より $v/c=1200/900=4/3$ です。これは光速以上で許されないため、求める慣性系は存在しません。代数的な候補を求めるだけでなく、$|v|<c$ を検査する必要があります。
<!-- solution-end -->

## Level C

### C1. 光時計・列車・信号を結ぶ

$S$ から見て速度 $v=3c/5$ で走る列車 $S'$ を考える。列車内で静止する時計が $t'_1=0$ から $t'_2=8\,\mathrm s$ まで進んだ。車両の静止長は $L_0=100\,\mathrm m$ とする。また、$S$ の原点から $t=0$ に右向きに光を出す。光と列車先頭の出会いを考えるため、列車後端は $t=0$ に $S$ の原点にあり、先頭はそのとき正の位置にあるとする。

1. $S$ で時計が刻んだ二事象の時間差を求めよ。
2. $S$ で同時に測った列車の長さと、$t=0$ における先頭位置を求めよ。
3. 光の世界線と列車先頭の世界線を立て、両者の出会う $S$ 時刻と位置を求めよ。
4. その出会い事象を $S'$ へ変換し、列車先頭の位置が $x'=L_0$ となることを検算せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

(1) $\gamma=1/\sqrt{1-9/25}=5/4$ です。時計は $S'$ で静止するので $\Delta x'=0$、[時間の遅れ](#prop-srel1-time-dilation)から

$$
\Delta t=\gamma\Delta t'=\frac54\cdot8\,\mathrm s=10\,\mathrm s.
$$

(2) $S$ で同時に前後端を測るので、[長さの収縮](#prop-srel1-length-contraction)から

$$
L=\frac{100\,\mathrm m}{5/4}=80\,\mathrm m.
$$

後端が $t=0$ に $x=0$ だから、同じ時刻の先頭位置は $x=80\,\mathrm m$ です。

(3) 発光後の右向き光の世界線は $x_{\mathrm{light}}(t)=ct$、先頭の世界線は $x_{\mathrm{front}}(t)=80\,\mathrm m+(3c/5)t$ です。出会いの条件は

$$
ct=80\,\mathrm m+\frac{3c}{5}t,
$$

$$
\frac{2c}{5}t=80\,\mathrm m,\qquad
t=\frac{200\,\mathrm m}{c},\qquad
x=ct=200\,\mathrm m.
$$

$c=3.0\times10^8\,\mathrm{m/s}$ なら $t=2/3\,\mu\mathrm s$ です。

(4) [Lorentz変換](#thm-srel1-lorentz)に出会い事象を代入すると、

$$
\begin{aligned}
x'&=\frac54\left(200\,\mathrm m-\frac35c\cdot\frac{200\,\mathrm m}{c}\right)\\
&=\frac54(200-120)\,\mathrm m\\
&=100\,\mathrm m=L_0.
\end{aligned}
$$

さらに時刻も確認すると

$$
t'=\frac54\left(\frac{200\,\mathrm m}{c}
-\frac{(3c/5)(200\,\mathrm m)}{c^2}\right)
=\frac{100\,\mathrm m}{c}.
$$

列車に静止した先頭で光が届くという記述に一致します。ここでは二つの事象を混同せず、発光事象を原点、受光事象を同じ物理事象として両系で表しました。
<!-- solution-end -->
