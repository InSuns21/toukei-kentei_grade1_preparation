# RA4 標準実解析 IV：Riemann/Darboux積分・FTC

Lebesgue積分へ進む前に、古典的なRiemann積分を一度きちんと閉じます。核心は「面積らしい極限」ではなく、**上からの近似と下からの近似が一致すること**です。

---

## 1. Darboux上和・下和

まず有界関数 $f:[a,b]\to\mathbb R$ を考えます。$[a,b]$ の分割を
$$
P:a=x_0<x_1<\cdots<x_n=b
$$
とし、$I_i=[x_{i-1},x_i]$ で
$$
M_i=\sup_{x\in I_i}f(x),\qquad m_i=\inf_{x\in I_i}f(x)
$$
と置きます。有界性があるので、これらは有限の実数です。

<a id="def-ra4-darboux"></a>
<!-- formal-statement-start -->
> **定義（Darboux上和・下和）**  
$$
U(f,P)=\sum_iM_i(x_i-x_{i-1}),\qquad
L(f,P)=\sum_im_i(x_i-x_{i-1}).
$$
<!-- formal-statement-end -->

分割 $Q$ が $P$ の分点をすべて含むとき、$Q$ は $P$ の**細分**です。区間を細かくすると各小区間での上限は大きくならず、下限は小さくならないので
$$
U(f,Q)\le U(f,P),
\qquad
L(f,Q)\ge L(f,P).
$$
つまり、細分するほど上和は下がり、下和は上がります。

<a id="def-ra4-integrable"></a>
<!-- formal-statement-start -->
> **定義（Riemann可積分）**  
> 有界関数 $f:[a,b]\to\mathbb R$ がRiemann可積分であるとは
$$
\inf_PU(f,P)=\sup_PL(f,P)
$$
> が成り立つことをいう。この共通値を $\int_a^bf(x)\,dx$ と書く。
<!-- formal-statement-end -->

任意の二分割 $P,Q$ に対し、両方の分点を全部入れた共通細分 $R=P\cup Q$ を取れます。すると
$$
L(f,P)\le L(f,R)\le U(f,R)\le U(f,Q).
$$
したがって常に
$$
\sup_P L(f,P)\le \inf_P U(f,P).
$$
Riemann可積分とは、この間に隙間がないことです。

<a id="thm-ra4-darboux-criterion"></a>
<!-- formal-statement-start -->
> **定理（Darboux可積分性判定）**  
> 有界関数 $f$ がRiemann可積分であることと、任意の $\varepsilon>0$ に対してある分割 $P$ が存在し
$$
U(f,P)-L(f,P)<\varepsilon
$$
> となることは同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

上Darboux積分と下Darboux積分を
$$
I^*=\inf_PU(f,P),
\qquad
I_*=\sup_PL(f,P)
$$
と書きます。上で確認したとおり $I_*\le I^*$ です。

まず $f$ がRiemann可積分、すなわち $I_*=I^*=I$ とします。任意の $\varepsilon>0$ に対し、$I^*$ が上和全体の下限であることから、ある分割 $P_1$ が存在して
$$
U(f,P_1)<I+\frac\varepsilon2.
$$
同様に、$I_*$ が下和全体の上限であることから、ある分割 $P_2$ が存在して
$$
L(f,P_2)>I-\frac\varepsilon2.
$$
$P=P_1\cup P_2$ を共通細分とすると、細分の単調性より
$$
U(f,P)\le U(f,P_1),
\qquad
L(f,P)\ge L(f,P_2).
$$
したがって
$$
U(f,P)-L(f,P)
<\left(I+\frac\varepsilon2\right)
-\left(I-\frac\varepsilon2\right)
=\varepsilon.
$$

逆に、任意の $\varepsilon>0$ に対して $U(f,P)-L(f,P)<\varepsilon$ となる分割 $P$ が存在するとします。$I^*\le U(f,P)$ かつ $I_*\ge L(f,P)$ なので
$$
0\le I^*-I_*
\le U(f,P)-L(f,P)
<\varepsilon.
$$
これがすべての $\varepsilon>0$ で成り立つため $I^*-I_*=0$、すなわち $I^*=I_*$ です。よって $f$ はRiemann可積分です。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-ra4-darboux, def-ra4-integrable -->
**定義の確認**：$f(x)=x$ を $[0,1]$ で考えます。分割 $P=\{0,1/2,1\}$ では
$$
L(f,P)
=0\cdot\frac12+\frac12\cdot\frac12
=\frac14,
$$
$$
U(f,P)
=\frac12\cdot\frac12+1\cdot\frac12
=\frac34.
$$
一方、$n$ 等分 $P_n$ では
$$
U(f,P_n)-L(f,P_n)=\frac1n\to0.
$$
したがって [Darboux可積分性判定](#thm-ra4-darboux-criterion) から $f$ はRiemann可積分です。さらに下和と上和はともに $1/2$ へ収束するので積分値は $1/2$ です。
<!-- definition-example-end -->

---

## 2. 連続関数はなぜ可積分か

<a id="thm-ra4-continuous"></a>
<!-- formal-statement-start -->
> **定理（連続関数のRiemann可積分性）**  
> $[a,b]$ 上の連続関数はRiemann可積分である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[Heine–Cantorの定理](../RA2/index.md#thm-ra2-heine-cantor) より $f$ は $[a,b]$ 上一様連続です。任意の $\varepsilon>0$ に対し、ある $\delta>0$ が存在して
$$
|x-y|<\delta
\Longrightarrow
|f(x)-f(y)|<\frac{\varepsilon}{b-a}.
$$
各小区間の長さが $\delta$ 未満になる分割 $P$ を取ります。

各 $I_i=[x_{i-1},x_i]$ の任意の $x,y$ について $|x-y|<\delta$ なので
$$
|f(x)-f(y)|<\frac{\varepsilon}{b-a}.
$$
したがってその区間での振幅は
$$
M_i-m_i\le\frac{\varepsilon}{b-a}.
$$
よって
$$
\begin{aligned}
U(f,P)-L(f,P)
&=\sum_i(M_i-m_i)(x_i-x_{i-1})\\
&\le\frac{\varepsilon}{b-a}
\sum_i(x_i-x_{i-1})\\
&=\varepsilon.
\end{aligned}
$$
必要なら最初に $\varepsilon$ を $\varepsilon/2$ に置き換えれば厳密に $<\varepsilon$ とできます。[Darboux可積分性判定](#thm-ra4-darboux-criterion) から可積分です。$\square$
<!-- proof-end -->

### Riemann積分の基本性質

FTCへ進む前に、そこで暗黙に使う性質をDarboux和から閉じておきます。

<a id="thm-ra4-integral-properties"></a>
<!-- formal-statement-start -->
> **定理（Riemann積分の基本性質）**  
> $f,g:[a,b]\to\mathbb R$ をRiemann可積分関数、$\alpha,\beta\in\mathbb R$ とする。このとき $\alpha f+\beta g$ もRiemann可積分で
$$
\int_a^b(\alpha f+\beta g)
=\alpha\int_a^bf+\beta\int_a^bg.
$$
> また $f\le g$ なら
$$
\int_a^bf\le\int_a^bg.
$$
> さらに $c\in[a,b]$ なら $f$ の $[a,c]$, $[c,b]$ への制限もRiemann可積分で
$$
\int_a^bf=\int_a^cf+\int_c^bf.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### 1. 定数関数と定数倍

定数関数 $k(x)=K$ では、任意の分割 $P$ と任意の小区間で上限・下限がともに $K$ です。したがって
$$
U(k,P)=L(k,P)=K(b-a),
$$
よって
$$
\int_a^bK\,dx=K(b-a).
$$

次に $f$ を可積分とします。$\alpha\ge0$ なら各小区間で
$$
\sup(\alpha f)=\alpha\sup f,
\qquad
\inf(\alpha f)=\alpha\inf f,
$$
なので
$$
U(\alpha f,P)=\alpha U(f,P),
\qquad
L(\alpha f,P)=\alpha L(f,P).
$$
$\alpha<0$ では順序が反転し
$$
\sup(\alpha f)=\alpha\inf f,
\qquad
\inf(\alpha f)=\alpha\sup f,
$$
だから
$$
U(\alpha f,P)=\alpha L(f,P),
\qquad
L(\alpha f,P)=\alpha U(f,P).
$$
したがっていずれの場合も上Darboux積分と下Darboux積分は同じ値 $\alpha\int_a^bf$ になり、$\alpha f$ は可積分で
$$
\int_a^b\alpha f=\alpha\int_a^bf.
$$

#### 2. 和の可積分性と加法性

各小区間 $I_i$ で
$$
\sup_{I_i}(f+g)
\le \sup_{I_i}f+\sup_{I_i}g,
$$
$$
\inf_{I_i}(f+g)
\ge \inf_{I_i}f+\inf_{I_i}g.
$$
したがって任意の分割 $P$ について
$$
U(f+g,P)\le U(f,P)+U(g,P),
$$
$$
L(f+g,P)\ge L(f,P)+L(g,P),
$$
ゆえに
$$
U(f+g,P)-L(f+g,P)
\le [U(f,P)-L(f,P)]+[U(g,P)-L(g,P)].
$$

任意の $\varepsilon>0$ に対し、$f,g$ の可積分性から、それぞれDarboux差が $\varepsilon/2$ 未満になる分割 $P_f,P_g$ を取れます。共通細分 $P=P_f\cup P_g$ では細分の単調性により両方のDarboux差がそれぞれ $\varepsilon/2$ 未満のままなので
$$
U(f+g,P)-L(f+g,P)<\varepsilon.
$$
[Darboux可積分性判定](#thm-ra4-darboux-criterion) から $f+g$ は可積分です。

積分値も確認します。$I_f=\int_a^bf$, $I_g=\int_a^bg$, $I_{f+g}=\int_a^b(f+g)$ と書きます。任意の分割 $P$ について
$$
L(f,P)\le I_f\le U(f,P),
\qquad
L(g,P)\le I_g\le U(g,P),
$$
かつ上の不等式から
$$
L(f,P)+L(g,P)
\le I_{f+g}
\le U(f,P)+U(g,P).
$$
したがって $I_f+I_g$ と $I_{f+g}$ はともに同じ区間
$$
[L(f,P)+L(g,P),\ U(f,P)+U(g,P)]
$$
に入ります。先ほどと同様に共通細分を選んでこの区間の長さを任意に小さくできるので
$$
I_{f+g}=I_f+I_g.
$$
定数倍の結果と合わせれば一般の
$$
\int_a^b(\alpha f+\beta g)
=\alpha\int_a^bf+\beta\int_a^bg
$$
が従います。

#### 3. 単調性

$f(x)\le g(x)$ がすべての $x\in[a,b]$ で成り立つとします。各小区間で
$$
\inf f\le\inf g,
\qquad
\sup f\le\sup g
$$
なので、任意の分割 $P$ に対し
$$
L(f,P)\le L(g,P).
$$
両辺について分割全体の上限を取れば
$$
\int_a^bf
=\sup_PL(f,P)
\le\sup_PL(g,P)
=\int_a^bg.
$$
これが積分の単調性です。

#### 4. 部分区間でも可積分であること

$c\in(a,b)$ とします。任意の $\varepsilon>0$ に対し、$f$ の可積分性から
$$
U(f,P)-L(f,P)<\varepsilon
$$
となる分割 $P$ を取ります。$c$ が分点でなければ加えて細分 $Q=P\cup\{c\}$ とします。細分の単調性から
$$
U(f,Q)-L(f,Q)<\varepsilon.
$$
$Q_1=Q\cap[a,c]$, $Q_2=Q\cap[c,b]$ とすると
$$
U(f,Q)-L(f,Q)
=[U(f,Q_1)-L(f,Q_1)]
+[U(f,Q_2)-L(f,Q_2)].
$$
右辺の二項はともに非負なので、それぞれが $\varepsilon$ 未満です。$\varepsilon>0$ は任意だったから、Darboux可積分性判定より $f$ は $[a,c]$ と $[c,b]$ の両方で可積分です。$c=a,b$ の場合は自明です。

#### 5. 積分区間の加法性

$I_{a,b}=\int_a^bf$, $I_{a,c}=\int_a^cf$, $I_{c,b}=\int_c^bf$ と書きます。任意の $\varepsilon>0$ に対し、$c$ を分点に含み
$$
U(f,P)-L(f,P)<\varepsilon
$$
となる分割 $P$ を、前項と同じ方法で取れます。$P_1=P\cap[a,c]$, $P_2=P\cap[c,b]$ とすると
$$
L(f,P)
=L(f,P_1)+L(f,P_2)
\le I_{a,c}+I_{c,b}
\le U(f,P_1)+U(f,P_2)
=U(f,P).
$$
一方 $I_{a,b}$ も同じく
$$
L(f,P)\le I_{a,b}\le U(f,P)
$$
に入ります。したがって
$$
\left|I_{a,b}-(I_{a,c}+I_{c,b})\right|
\le U(f,P)-L(f,P)<\varepsilon.
$$
これが任意の $\varepsilon>0$ について成り立つので
$$
\int_a^bf
=\int_a^cf+\int_c^bf.
$$
$\square$
<!-- proof-end -->

積分区間の向きを自由に扱えるよう、ここからは
$$
\int_a^a f:=0,
\qquad
\int_b^a f:=-\int_a^b f\quad(a<b)
$$
と定義します。この規約と上の加法性を合わせれば、$x,y,z$ の大小関係によらず
$$
\int_x^z f=\int_x^y f+\int_y^z f
$$
が成り立ちます。実際、三点を小さい順に並べた場合の加法性に、必要な区間だけ符号反転を適用すればよいです。

### 積分の基本評価

まず $u<v$ とします。Riemann可積分な $g$ に対して $M=\sup_{t\in[u,v]}|g(t)|$ と置けば
$$
-M\le g(t)\le M.
$$
[Riemann積分の基本性質](#thm-ra4-integral-properties) の単調性と定数関数の積分から
$$
-M(v-u)\le \int_u^v g(t)\,dt\le M(v-u),
$$
したがって
$$
\left|\int_u^v g(t)\,dt\right|
\le (v-u)\sup_{t\in[u,v]}|g(t)|.
$$
$u>v$ では上で定めた向き反転を使えば、同じ内容を
$$
\left|\int_u^v g(t)\,dt\right|
\le |v-u|\sup_{t\text{ between }u,v}|g(t)|
$$
と書けます。FTC I の証明で使うのはこの評価です。

---

## 3. 積分と微分をつなぐ二つの主張

<a id="thm-ra4-ftc1"></a>
<!-- formal-statement-start -->
> **定理（微積分学の基本定理I）**  
> $f$ が $[a,b]$ で連続なら
$$
F(x)=\int_a^xf(t)\,dt
$$
> は $(a,b)$ で微分可能で $F'(x)=f(x)$。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x\in(a,b)$ を固定し、$x+h\in[a,b]$ となる十分小さい $h\ne0$ を考えます。[積分区間の加法性](#thm-ra4-integral-properties) と向き反転の規約から、$h$ の符号によらず
$$
F(x+h)-F(x)=\int_x^{x+h}f(t)\,dt.
$$
また線形性と定数関数の積分より
$$
\int_x^{x+h}f(x)\,dt=h f(x),
$$
なので
$$
\frac{F(x+h)-F(x)}h-f(x)
=\frac1h\int_x^{x+h}(f(t)-f(x))\,dt.
$$
積分の基本評価を使うと、$h>0$ でも $h<0$ でも
$$
\left|
\frac{F(x+h)-F(x)}h-f(x)
\right|
\le
\sup_{|t-x|\le|h|}|f(t)-f(x)|.
$$
$f$ は $x$ で連続なので、任意の $\varepsilon>0$ に対し十分小さい $|h|$ では右辺が $\varepsilon$ 未満になります。よって
$$
\lim_{h\to0}\frac{F(x+h)-F(x)}h=f(x).
$$
したがって $F'(x)=f(x)$ です。$\square$
<!-- proof-end -->

<a id="thm-ra4-ftc2"></a>
<!-- formal-statement-start -->
> **定理（微積分学の基本定理II）**  
> $f:[a,b]\to\mathbb R$ が連続で、$F:[a,b]\to\mathbb R$ が連続かつ $(a,b)$ で微分可能であり、すべての $x\in(a,b)$ で $F'(x)=f(x)$ なら
$$
\int_a^bf(x)\,dx=F(b)-F(a).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

積分から作った関数
$$
G(x)=\int_a^x f(t)\,dt
$$
を考えます。[微積分学の基本定理I](#thm-ra4-ftc1) により
$$
G'(x)=f(x).
$$
仮定では $F'(x)=f(x)$ なので
$$
(F-G)'(x)=0.
$$
任意の $x<y$ に [平均値定理](../RA3/index.md#thm-ra3-mvt) を適用すると、ある $c\in(x,y)$ が存在して
$$
(F-G)(y)-(F-G)(x)
=(F-G)'(c)(y-x)=0.
$$
したがって $F-G$ は定数です。特に
$$
F(b)-G(b)=F(a)-G(a).
$$
$G(a)=0$、$G(b)=\int_a^b f$ だから
$$
F(b)-\int_a^b f(x)\,dx=F(a),
$$
すなわち
$$
\int_a^bf(x)\,dx=F(b)-F(a).
$$
$\square$
<!-- proof-end -->

FTC I は「積分から原始関数を作る」、FTC II は「原始関数から積分値を計算する」と役割を分けると混乱しません。**再構成公式 $F(x)=F(a)+\int_a^x f$ は [微積分学の基本定理II](#thm-ra4-ftc2) の帰結**です。

---

## 4. 置換積分と部分積分

<a id="thm-ra4-substitution"></a>
<!-- formal-statement-start -->
> **定理（置換積分）**  
> $\phi:[\alpha,\beta]\to\mathbb R$ が連続微分可能で、$\phi([\alpha,\beta])$ を含む開区間 $J$ 上で $f:J\to\mathbb R$ が連続なら
$$
\int_{\alpha}^{\beta}f(\phi(t))\phi'(t)\,dt
=\int_{\phi(\alpha)}^{\phi(\beta)}f(x)\,dx.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$u_0\in J$ を固定して
$$
H(u)=\int_{u_0}^{u}f(x)\,dx
$$
と定めます。[微積分学の基本定理I](#thm-ra4-ftc1) により
$$
H'(u)=f(u).
$$
RA3で確認した連鎖律から
$$
\frac d{dt}H(\phi(t))
=H'(\phi(t))\phi'(t)
=f(\phi(t))\phi'(t).
$$
そこで $H\circ\phi$ に [微積分学の基本定理II](#thm-ra4-ftc2) を適用すると
$$
\int_{\alpha}^{\beta}f(\phi(t))\phi'(t)\,dt
=H(\phi(\beta))-H(\phi(\alpha)).
$$
一方、再び [微積分学の基本定理II](#thm-ra4-ftc2) から
$$
H(\phi(\beta))-H(\phi(\alpha))
=\int_{\phi(\alpha)}^{\phi(\beta)}f(x)\,dx.
$$
よって主張が従います。$\phi$ の単調性は仮定していない点にも注意してください。$\square$
<!-- proof-end -->

### 部分積分

$u,v$ が $C^1$ 級なら、積の微分公式から
$$
(uv)'=u'v+uv'.
$$
両辺を $[a,b]$ で積分し、[Riemann積分の基本性質](#thm-ra4-integral-properties) の線形性と [微積分学の基本定理II](#thm-ra4-ftc2) を使うと
$$
[u(x)v(x)]_a^b
=\int_a^b u'(x)v(x)\,dx
+\int_a^b u(x)v'(x)\,dx.
$$
したがって
$$
\int_a^b u(x)v'(x)\,dx
=[u(x)v(x)]_a^b
-\int_a^b u'(x)v(x)\,dx.
$$
部分積分は独立した魔法の公式ではなく、**積の微分公式をFTC IIで積分したもの**です。

---

## 5. 通常積分と広義積分を分ける

$\int_1^\infty x^{-2}dx$ は無限区間上のRiemann積分を直接意味するのではなく
$$
\int_1^\infty\frac{dx}{x^2}
:=\lim_{R\to\infty}\int_1^R\frac{dx}{x^2}
$$
という別の極限操作です。右辺の極限が有限値として存在するとき、広義積分が収束するといいます。

特異点を持つ場合も同じで、例えば
$$
\int_0^1\frac{dx}{\sqrt x}
:=\lim_{\varepsilon\downarrow0}
\int_{\varepsilon}^1\frac{dx}{\sqrt x}.
$$
有限閉区間上の有界関数に対するRiemann積分と、端点・無限遠への極限を追加した広義積分を区別することが、後のRiemann–Lebesgue接続で重要になります。

---

## 6. 演習

### Level A

<a id="ex-ra4-a01"></a>
#### RA4-A01 上和・下和
- Level: A

$f(x)=x$ を $[0,1]$ で $n$ 等分したときの上和と下和を求めよ。

<!-- solution-start -->
**解答**：分点を $x_i=i/n$ とします。各小区間の幅は $1/n$ です。$f$ は単調増加なので $[x_{i-1},x_i]$ での下限は $(i-1)/n$、上限は $i/n$。したがって
$$
L(f,P_n)
=\sum_{i=1}^n\frac{i-1}{n}\frac1n
=\frac1{n^2}\frac{n(n-1)}2
=\frac{n-1}{2n},
$$
$$
U(f,P_n)
=\sum_{i=1}^n\frac{i}{n}\frac1n
=\frac1{n^2}\frac{n(n+1)}2
=\frac{n+1}{2n}.
$$
<!-- solution-end -->

<a id="ex-ra4-a02"></a>
#### RA4-A02 可積分性
- Level: A

A01の結果から $f(x)=x$ がRiemann可積分であることを示せ。

<!-- solution-start -->
**解答**：A01から
$$
U(f,P_n)-L(f,P_n)
=\frac{n+1}{2n}-\frac{n-1}{2n}
=\frac1n\to0.
$$
任意の $\varepsilon>0$ に対して $n>1/\varepsilon$ と取れば差は $\varepsilon$ 未満です。したがって [Darboux可積分性判定](#thm-ra4-darboux-criterion) により $f$ はRiemann可積分です。さらに上下和がともに $1/2$ へ収束するので
$$
\int_0^1x\,dx=\frac12.
$$
<!-- solution-end -->

<a id="ex-ra4-a03"></a>
#### RA4-A03 FTC
- Level: A

$F(x)=\int_0^x(1+t^2)dt$ の $F'(x)$ を求めよ。

<!-- solution-start -->
**解答**：被積分関数 $f(t)=1+t^2$ は連続です。したがって [微積分学の基本定理I](#thm-ra4-ftc1) をそのまま適用でき、
$$
F'(x)=f(x)=1+x^2.
$$
ここでは積分を実際に計算する必要はありません。
<!-- solution-end -->

<a id="ex-ra4-a04"></a>
#### RA4-A04 広義積分
- Level: A

$\int_1^\infty x^{-2}dx$ を計算せよ。

<!-- solution-start -->
**解答**：定義に従って有限区間で先に積分します。
$$
\int_1^R x^{-2}dx
=\left[-\frac1x\right]_1^R
=1-\frac1R.
$$
したがって
$$
\int_1^\infty x^{-2}dx
=\lim_{R\to\infty}\left(1-\frac1R\right)
=1.
$$
有限区間の積分値を出してから $R\to\infty$ とする順番が重要です。
<!-- solution-end -->

### Level B

<a id="ex-ra4-b01"></a>
#### RA4-B01 Dirichlet関数
- Level: B

$f=1_{\mathbb Q}$ を $[0,1]$ に制限するとRiemann可積分でないことを示せ。

<!-- solution-start -->
**解答**：任意の長さが正の小区間には有理数と無理数がともに存在します。したがってどの小区間でも $f$ は値1と0を取り、
$$
M_i=1,
\qquad
m_i=0.
$$
よって任意の分割 $P$ に対して
$$
U(f,P)=\sum_i1\cdot(x_i-x_{i-1})=1,
$$
$$
L(f,P)=\sum_i0\cdot(x_i-x_{i-1})=0.
$$
したがって常に $U-L=1$ で、[Darboux可積分性判定](#thm-ra4-darboux-criterion) を満たしません。よってRiemann可積分ではありません。
<!-- solution-end -->

<a id="ex-ra4-b02"></a>
#### RA4-B02 部分積分
- Level: B

$\int_0^1xe^x dx$ を計算せよ。

<!-- solution-start -->
**解答**：$u(x)=x$, $v'(x)=e^x$ と置けば $u'(x)=1$, $v(x)=e^x$ です。部分積分公式から
$$
\int_0^1xe^x dx
=[xe^x]_0^1-\int_0^1e^x dx.
$$
各項を計算すると
$$
[xe^x]_0^1=e,
\qquad
\int_0^1e^x dx=[e^x]_0^1=e-1.
$$
したがって
$$
\int_0^1xe^x dx=e-(e-1)=1.
$$
<!-- solution-end -->

<a id="ex-ra4-b03"></a>
#### RA4-B03 置換積分
- Level: B

$\int_0^12x\cos(x^2)dx$ を計算せよ。

<!-- solution-start -->
**解答**：$\phi(x)=x^2$, $f(u)=\cos u$ と見ます。すると $\phi'(x)=2x$ なので [置換積分](#thm-ra4-substitution) から
$$
\int_0^12x\cos(x^2)dx
=\int_{\phi(0)}^{\phi(1)}\cos u\,du
=\int_0^1\cos u\,du.
$$
よって
$$
\int_0^12x\cos(x^2)dx
=[\sin u]_0^1=\sin1.
$$
<!-- solution-end -->

### Level C

<a id="ex-ra4-c01"></a>
#### RA4-C01 単調関数の可積分性
- Level: C

$f:[a,b]\to\mathbb R$ が単調増加ならRiemann可積分であることを等分割から示せ。

<!-- solution-start -->
**解答**：単調増加なので
$$
f(a)\le f(x)\le f(b)
$$
となり、まず $f$ は有界です。$[a,b]$ を $n$ 等分し
$$
\Delta=\frac{b-a}{n},
\qquad
x_i=a+i\Delta
$$
と置きます。各小区間で下限は $f(x_{i-1})$、上限は $f(x_i)$ だから
$$
\begin{aligned}
U(f,P_n)-L(f,P_n)
&=\Delta\sum_{i=1}^n
\bigl(f(x_i)-f(x_{i-1})\bigr)\\
&=\Delta\bigl(f(b)-f(a)\bigr).
\end{aligned}
$$
和が望遠鏡のように消えるのが核心です。したがって
$$
U(f,P_n)-L(f,P_n)
=\frac{b-a}{n}(f(b)-f(a))\to0.
$$
任意の $\varepsilon>0$ に対し十分大きい $n$ で差を $\varepsilon$ 未満にできるので、[Darboux可積分性判定](#thm-ra4-darboux-criterion) から $f$ はRiemann可積分です。
<!-- solution-end -->

---

## 7. 次に進む

**次：[RA5 関数列・関数級数・一様収束](../RA5/index.md)**