# CA6 Möbius変換・Schwarz補題・調和関数・Poisson核

> **標準複素解析コア VI**。CA5 までで Cauchy 理論、正則関数の局所構造、留数、解析接続を整備した。本章ではまず Riemann 球面上の Möbius 変換と単位円板の自己同型を調べ、Schwarz lemma でその剛性を証明する。後半では $C^2$ 調和関数を正則関数へ局所的に持ち上げ、平均値性質・最大最小値原理を導いた後、Poisson kernel により連続境界データを単位円板へ調和的に延長する。Fourier 級数は最後に現れるが、Fourier 解析そのものを前提にはしない。

<!-- definition-example-audit: strict -->

## 0. この章の証明境界

本章で既知として再利用するのは、[CA1 の Cauchy–Riemann 十分条件](../CA1/index.md#thm-ca1-cr-sufficient)、[CA2 の局所原始関数](../CA2/index.md#cor-ca2-local-primitive)、[CA3 の Cauchy 平均値公式](../CA3/index.md#cor-ca3-cauchy-mean-value)・[最大値原理](../CA3/index.md#thm-ca3-maximum-modulus)・[恒等定理](../CA3/index.md#thm-ca3-isolated-zeros-identity)、[CA4 の可除特異点定理](../CA4/index.md#cor-ca4-removable-bounded)までである。

一方、次は使わない。

- Riemann mapping theorem、normal family、Montel theorem。
- Green の公式・Stokes の定理・一般領域の Dirichlet 問題。
- 弱解・分布の意味での調和関数。
- Fourier 解析側の収束定理。

したがって依存は

```text
Möbius変換
  ↓ 直接計算
円板の標準自己同型
  ↓ 最大値原理
Schwarz lemma → 円板自己同型の分類

C2調和関数
  ↓ u_x-i u_y にCRを確認
局所正則表示
  ↓ Cauchy平均値公式
平均値性質 → 最大・最小値原理

Poisson kernel
  ↓ 非負性・質量1・遠方質量→0
Poisson integral
  ↓ 積分核から正則関数を構成
内部で調和
  ↓ approximate identity
境界値へ一様収束
  ↓ 最大・最小値原理
Dirichlet問題の一意性
```

という二本の鎖で閉じる。

---

## 1. Riemann 球面と Möbius 変換

$\widehat{\mathbb C}=\mathbb C\cup\{\infty\}$ を **Riemann 球面**と呼ぶ。有限点では通常の座標 $z$ を使い、$\infty$ の近傍では

$$
\zeta=\frac1z
$$

を局所座標として使う。したがって「$\infty$ で正則」「$\infty$ で微分が0でない」という主張は、$\zeta=0$ のまわりへ座標を移して確認する。

<a id="def-ca6-mobius-transformation"></a>
<!-- formal-statement-start -->
### 定義（Möbius変換）

$a,b,c,d\in\mathbb C$ が

$$
ad-bc\ne0
$$

を満たすとき

$$
M(z)=\frac{az+b}{cz+d}
$$

を **Möbius変換**という。$c\ne0$ なら

$$
M\left(-\frac dc\right)=\infty,
\qquad
M(\infty)=\frac ac,
$$

$c=0$ なら $M(\infty)=\infty$ と約束し、$M$ を $\widehat{\mathbb C}$ 上の写像として扱う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca6-mobius-transformation -->
**定義の確認**：$M(z)=1/z$ は $0$ と $\infty$ を交換する。$M(z)=z+1$ は $\infty$ を固定する。どちらも $ad-bc\ne0$ を満たす Möbius 変換である。
<!-- definition-example-end -->

<a id="def-ca6-generalized-circle"></a>
<!-- formal-statement-start -->
### 定義（一般化円）

$\widehat{\mathbb C}$ の部分集合で、通常の Euclid 円、または複素平面の直線に $\infty$ を加えたものを **一般化円**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca6-generalized-circle -->
**定義の確認**：実軸 $\mathbb R\cup\{\infty\}$ は一般化円である。反転 $z\mapsto1/z$ は実軸を自身へ写す一方、原点を通る円を直線へ写すことがあるため、円だけでなく直線も同じクラスへ入れる必要がある。
<!-- definition-example-end -->

<a id="thm-ca6-mobius-basic-properties"></a>
<!-- formal-statement-start -->
### 定理（Möbius変換の基本性質）

Möbius 変換 $M$ は $\widehat{\mathbb C}$ の全単射で、逆写像も Möbius 変換である。さらに Riemann 球面の局所座標で微分は消えず、向きを保つ等角写像である。また一般化円を一般化円へ写す。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### 1. 逆写像を直接解く

$$
w=\frac{az+b}{cz+d}
$$

から

$$
w(cz+d)=az+b,
$$

よって

$$
(cw-a)z=b-dw.
$$

したがって球面上で

$$
\boxed{
M^{-1}(w)=\frac{dw-b}{-cw+a}
}
$$

となる。逆変換の行列式は

$$
da-(-b)(-c)=ad-bc\ne0
$$

なので、これも Möbius 変換である。極や $\infty$ もこの式を球面上で読むことで対応し、$M$ は全単射になる。

#### 2. 有限の非極点で微分が消えない

$cz+d\ne0$ なら商の微分から

$$
M'(z)
=\frac{a(cz+d)-c(az+b)}{(cz+d)^2}
=\frac{ad-bc}{(cz+d)^2}\ne0.
$$

複素微分が0でない写像の一次部分は「非零複素数を掛ける」写像であり、回転と拡大縮小だけからなる。従って有限の非極点では角度を保つ。

#### 3. 極と $\infty$ でも局所座標へ移せば微分が消えない

$c\ne0$ とし、極を $p=-d/c$ とする。像側で $\eta=1/w$ を座標に取れば

$$
\eta(z)=\frac1{M(z)}=\frac{cz+d}{az+b}.
$$

$p$ では分子が0で、分母は0でない。実際 $ap+b=0$ まで成り立つと $ad-bc=0$ になってしまう。従って

$$
\eta'(p)=\frac{c(ap+b)}{(ap+b)^2}=\frac{c}{ap+b}\ne0.
$$

次に $z=\infty$ では源側座標 $\zeta=1/z$ を使う。$c\ne0$ なら

$$
M(1/\zeta)=\frac{a+b\zeta}{c+d\zeta}
$$

で、$\zeta=0$ における微分は

$$
\frac{bc-ad}{c^2}\ne0.
$$

$c=0$ なら $a,d\ne0$ で $M(z)=(a/d)z+b/d$。像側でも逆数座標を使うと

$$
\frac1{M(1/\zeta)}
=\frac{d\zeta}{a+b\zeta}
$$

の $\zeta=0$ での微分は $d/a\ne0$ である。よって球面全体で局所的に等角である。

#### 4. 一般化円の保存

円と直線はまとめて

$$
A|z|^2+Bz+\overline B\,\overline z+C=0,
\qquad A,C\in\mathbb R,
$$

という形で表せる。$A\ne0$ なら平方完成して円、$A=0$ なら直線になる。

平行移動 $z\mapsto z+\beta$ と非零定数倍 $z\mapsto\alpha z$ がこの形を保つことは代入で直ちに確認できる。反転 $z=1/w$ では

$$
\frac{A}{|w|^2}+\frac B w+\frac{\overline B}{\overline w}+C=0
$$

に $|w|^2$ を掛けて

$$
C|w|^2+\overline B\,w+B\overline w+A=0
$$

を得るので、やはり一般化円である。$w=0$ と $z=\infty$ の対応も含めれば球面上で正しい。

最後に $c=0$ なら $M$ は平行移動と非零定数倍の合成である。$c\ne0$ なら

$$
\frac{az+b}{cz+d}
=
\frac ac+
\frac{bc-ad}{c^2}\,
\frac1{z+d/c}.
$$

従って平行移動、反転、非零定数倍、平行移動の合成である。各基本変換が一般化円を保つので $M$ も一般化円を一般化円へ写す。$\square$
<!-- proof-end -->

### 例：上半平面から単位円板へ

$$
C(z)=\frac{z-i}{z+i}
$$

を考える。$z=x+iy$ なら

$$
|z+i|^2-|z-i|^2
=x^2+(y+1)^2-x^2-(y-1)^2
=4y.
$$

したがって $y>0$ なら $|C(z)|<1$、$y=0$ なら $|C(z)|=1$ である。さらに

$$
C^{-1}(w)=i\frac{1+w}{1-w}.
$$

よって上半平面と単位円板は Möbius 変換で双正則に対応する。ここで「境界が円へ行く」だけでは内部・外部のどちらへ行くかは決まらず、$4y$ の符号計算が内部側を確定している。

---

## 2. 円板自己同型と Schwarz lemma

$$
\mathbb D=\{z\in\mathbb C:|z|<1\}
$$

とする。

<a id="def-ca6-disk-automorphism"></a>
<!-- formal-statement-start -->
### 定義（円板自己同型）

$F:\mathbb D\to\mathbb D$ が **円板自己同型**であるとは、$F$ が全単射かつ $F,F^{-1}$ がともに正則であることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca6-disk-automorphism -->
**定義の確認**：$|\lambda|=1$ に対する $F(z)=\lambda z$ は円板自己同型で、逆は $z\mapsto\overline\lambda z$ である。Schwarz lemma は、原点を固定する自己同型が実はこの回転しかないことを示す。
<!-- definition-example-end -->

<a id="lem-ca6-standard-disk-automorphism"></a>
<!-- formal-statement-start -->
### 補題（円板の標準自己同型）

$a\in\mathbb D$ に対し

$$
\phi_a(z)=\frac{z-a}{1-\overline a z}
$$

と置く。このとき $\phi_a$ は円板自己同型で、$\phi_a(a)=0$、

$$
\phi_a^{-1}=\phi_{-a}
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$|a|,|z|<1$ なら $|\overline a z|<1$ なので分母は0でない。直接展開すると

$$
\begin{aligned}
|1-\overline a z|^2-|z-a|^2
&=(1-\overline a z)(1-a\overline z)-(z-a)(\overline z-\overline a)\\
&=(1-|a|^2)(1-|z|^2).
\end{aligned}
$$

よって

$$
\boxed{
1-|\phi_a(z)|^2
=
\frac{(1-|a|^2)(1-|z|^2)}{|1-\overline a z|^2}>0
}
$$

であり、$\phi_a(\mathbb D)\subset\mathbb D$。また $\phi_a(a)=0$ である。

$w=\phi_a(z)$ を $z$ について解くと

$$
z=\frac{w+a}{1+\overline a w}=\phi_{-a}(w).
$$

同じ評価を $-a$ に適用すれば $\phi_{-a}$ も $\mathbb D$ を自身へ写す。従って互いに逆な正則写像であり、$\phi_a$ は円板自己同型である。$\square$
<!-- proof-end -->

<a id="thm-ca6-schwarz-lemma"></a>
<!-- formal-statement-start -->
### 定理（Schwarz lemma）

$f:\mathbb D\to\mathbb D$ を正則とし $f(0)=0$ とする。このとき

$$
|f(z)|\le|z|
\qquad(z\in\mathbb D),
$$

かつ

$$
|f'(0)|\le1.
$$

さらに、ある $z_0\ne0$ で $|f(z_0)|=|z_0|$ が成り立つか、または $|f'(0)|=1$ が成り立つなら、ある $|\lambda|=1$ が存在して

$$
f(z)=\lambda z
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$f(0)=0$ なので $z\ne0$ で

$$
g(z)=\frac{f(z)}z
$$

と置く。複素微分の定義から

$$
\lim_{z\to0}\frac{f(z)}z=f'(0),
$$

したがって $g$ は0の近くで有界である。[有界な孤立特異点は可除](../CA4/index.md#cor-ca4-removable-bounded) なので

$$
g(0):=f'(0)
$$

と置けば $g$ は $\mathbb D$ 全体で正則になる。

ここで単位円そのものを境界として[最大値原理](../CA3/index.md#thm-ca3-maximum-modulus)を使ってはいけない。$f$ は $|z|=1$ 上に定義されているとは限らないからである。そこで任意の $0<R<1$ を固定する。$|\zeta|=R$ では $|f(\zeta)|<1$ より

$$
|g(\zeta)|\le\frac1R.
$$

$g$ は閉円板 $|z|\le R$ の近傍で正則なので、[最大値原理](../CA3/index.md#thm-ca3-maximum-modulus) から

$$
|g(z)|\le\frac1R
\qquad(|z|\le R).
$$

固定した $z\in\mathbb D$ に対して $|z|<R<1$ と取り $R\uparrow1$ とすれば

$$
|g(z)|\le1.
$$

従って

$$
|f(z)|=|z||g(z)|\le|z|.
$$

$z=0$ では $g(0)=f'(0)$ だから同じ評価により $|f'(0)|\le1$。

等号の場合を確認する。$z_0\ne0$ で $|f(z_0)|=|z_0|$ なら $|g(z_0)|=1$。また $|f'(0)|=1$ なら $|g(0)|=1$。いずれも $g$ が領域内部で絶対値1を取り、しかも $|g|\le1$ なので、[最大値原理](../CA3/index.md#thm-ca3-maximum-modulus)から $g$ は定数である。$g\equiv\lambda$、$|\lambda|=1$ と書けば

$$
f(z)=\lambda z.
$$

$\square$
<!-- proof-end -->

Schwarz lemma で単位円板のコンパクト性を仮定してはいない。半径 $R<1$ の閉円板へ局所化して[最大値原理](../CA3/index.md#thm-ca3-maximum-modulus)を適用し、最後に $R\uparrow1$ とした点が重要である。

<a id="cor-ca6-disk-automorphism-classification"></a>
<!-- formal-statement-start -->
### 系（円板自己同型の分類）

$F$ が円板自己同型なら、ある $a\in\mathbb D$ と $\theta\in\mathbb R$ が存在して

$$
\boxed{
F(z)=e^{i\theta}\frac{z-a}{1-\overline a z}
}
$$

と書ける。逆にこの形の写像はすべて円板自己同型である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$F$ は全単射なので、ただ一つの

$$
a=F^{-1}(0)\in\mathbb D
$$

がある。[標準自己同型](#lem-ca6-standard-disk-automorphism) $\phi_a$ は $a$ を0へ送るから

$$
G=F\circ\phi_a^{-1}
$$

は円板自己同型で $G(0)=0$ である。[Schwarz lemma](#thm-ca6-schwarz-lemma) により

$$
|G(z)|\le|z|.
$$

一方 $G^{-1}$ も原点を固定する円板の正則自己写像だから

$$
|G^{-1}(w)|\le|w|.
$$

ここで $w=G(z)$ とすれば

$$
|z|\le|G(z)|.
$$

従って $|G(z)|=|z|$ が全ての $z$ で成り立つ。[Schwarz lemma](#thm-ca6-schwarz-lemma) の等号条件から

$$
G(z)=e^{i\theta}z.
$$

よって

$$
F(z)=G(\phi_a(z))
=e^{i\theta}\phi_a(z)
=e^{i\theta}\frac{z-a}{1-\overline a z}.
$$

逆向きは回転と $\phi_a$ がともに円板自己同型であることから従う。$\square$
<!-- proof-end -->

### 例：Schwarz lemma の不等号が厳しい場合

$f(z)=z^2$ は $\mathbb D$ を $\mathbb D$ へ写し $f(0)=0$ だが、$0<|z|<1$ では

$$
|f(z)|=|z|^2<|z|.
$$

さらに $f'(0)=0$。回転でない正則自己写像は原点からの距離を少なくともどこかで真に縮める。

---

## 3. 正則関数から調和関数へ

<a id="def-ca6-harmonic-function"></a>
<!-- formal-statement-start -->
### 定義（調和関数）

$\Omega\subset\mathbb C\cong\mathbb R^2$ を開集合とする。実数値関数

$$
u:\Omega\to\mathbb R
$$

が $C^2$ 級で

$$
\boxed{
\Delta u=u_{xx}+u_{yy}=0
}
$$

を満たすとき、$u$ を **調和関数**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca6-harmonic-function -->
**定義の確認**：$u(x,y)=x^2-y^2$ では

$$
u_{xx}=2,
\qquad
u_{yy}=-2,
$$

だから $\Delta u=0$。実際 $u=\operatorname{Re}(z^2)$ であり、次の定理の典型例になっている。
<!-- definition-example-end -->

<a id="thm-ca6-holomorphic-parts-harmonic"></a>
<!-- formal-statement-start -->
### 定理（正則関数の実部・虚部の調和性）

$\Omega$ を領域、$f=u+iv$ を $\Omega$ 上正則とする。このとき $u,v$ はともに調和関数である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[CA3 の Cauchy 高階導関数公式](../CA3/index.md#thm-ca3-cauchy-derivatives) により正則関数は任意階複素微分可能であり、局所 Taylor 展開を持つ。従って実部・虚部は少なくとも $C^2$ 級で、二階混合偏導関数を交換できる。

Cauchy–Riemann 方程式

$$
u_x=v_y,
\qquad
u_y=-v_x
$$

を一度ずつ微分すると

$$
u_{xx}=v_{yx},
\qquad
u_{yy}=-v_{xy}.
$$

$v_{yx}=v_{xy}$ なので

$$
\Delta u=u_{xx}+u_{yy}=0.
$$

同様に

$$
v_x=-u_y,
\qquad
v_y=u_x
$$

から

$$
\Delta v=-u_{yx}+u_{xy}=0.
$$

従って $u,v$ は調和的である。$\square$
<!-- proof-end -->

逆に、調和関数は局所的には正則関数の実部になる。この逆向きで単連結性を領域全体へ勝手に追加する必要はない。平均値性質に必要なのは各点のまわりの小円板だけだからである。

<a id="lem-ca6-local-holomorphic-representation-harmonic"></a>
<!-- formal-statement-start -->
### 補題（調和関数の局所正則表示）

$u$ を領域 $\Omega$ 上の調和関数とする。任意の $a\in\Omega$ に対し、ある円板 $D(a,R)\subset\Omega$ と、その円板上の正則関数 $F$ が存在して

$$
u=\operatorname{Re}F
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$a$ を固定し、閉包まで $\Omega$ に入る円板 $D(a,R)$ を取る。まず $\Omega$ 全体で

$$
h=u_x-iu_y
$$

と置く。$u\in C^2$ なので $h$ は $C^1$ 級である。$h=p+iq$ として

$$
p=u_x,
\qquad
q=-u_y
$$

と書くと

$$
p_x=u_{xx},
\qquad
q_y=-u_{yy}.
$$

調和性 $u_{xx}+u_{yy}=0$ から $p_x=q_y$。また

$$
p_y=u_{xy},
\qquad
-q_x=u_{yx},
$$

で、$C^2$ 性から $u_{xy}=u_{yx}$ なので $p_y=-q_x$。従って $h$ は Cauchy–Riemann 方程式を満たす。[Cauchy–Riemann 十分条件](../CA1/index.md#thm-ca1-cr-sufficient) により $h$ は正則である。

円板は星型なので [CA2 の局所原始関数](../CA2/index.md#cor-ca2-local-primitive) の構成を使い、$D(a,R)$ 上で

$$
H'=h
$$

を満たす正則関数 $H=U+iV$ を取れる。正則関数の導関数表示から

$$
H'=U_x-iU_y.
$$

これと $H'=u_x-iu_y$ を比較して

$$
U_x=u_x,
\qquad
U_y=u_y.
$$

従って $U-u$ の両偏導関数は0である。$z\in D(a,R)$ に対し線分

$$
\gamma(t)=a+t(z-a),
\qquad0\le t\le1
$$

は円板内にある。実一変数の連鎖律から

$$
\frac d{dt}(U-u)(\gamma(t))=0,
$$

したがって $U(z)-u(z)=U(a)-u(a)$。$H$ に実定数 $u(a)-U(a)$ を加えれば、実部が $u$ と一致する正則関数 $F$ を得る。$\square$
<!-- proof-end -->

ここで使った単連結性は「$\Omega$ 全体が単連結」という仮定ではなく、選んだ局所円板が星型で原始関数を持つという局所事実だけである。

<a id="thm-ca6-harmonic-mean-value-property"></a>
<!-- formal-statement-start -->
### 定理（調和関数の平均値性質）

$u$ を領域 $\Omega$ 上の調和関数とする。閉円板

$$
\overline{D(a,r)}\subset\Omega
$$

なら

$$
\boxed{
 u(a)=\frac1{2\pi}\int_0^{2\pi}u(a+re^{it})\,dt
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

閉円板が開集合 $\Omega$ に含まれるので、コンパクト集合 $\overline{D(a,r)}$ と閉集合 $\mathbb C\setminus\Omega$ の距離は正である。従ってある $R>r$ で

$$
\overline{D(a,R)}\subset\Omega
$$

とできる。

前補題の証明を円板 $D(a,R)$ 全体で行えば、そこで正則な $F$ が存在して $u=\operatorname{Re}F$。そこで [Cauchy 平均値公式](../CA3/index.md#cor-ca3-cauchy-mean-value) を半径 $r$ で使うと

$$
F(a)=\frac1{2\pi}\int_0^{2\pi}F(a+re^{it})\,dt.
$$

実部を取れば

$$
u(a)=\frac1{2\pi}\int_0^{2\pi}u(a+re^{it})\,dt.
$$

$\square$
<!-- proof-end -->

閉円板を少し大きい円板へ広げた箇所で、$\overline{D(a,r)}$ のコンパクト性と $\Omega$ の開性を使っている。境界に接する円板へ無断で [Cauchy 平均値公式](../CA3/index.md#cor-ca3-cauchy-mean-value) を適用してはいない。

<a id="cor-ca6-harmonic-maximum-minimum-principle"></a>
<!-- formal-statement-start -->
### 系（調和関数の最大・最小値原理）

$u$ を領域 $\Omega$ 上の調和関数とする。$u$ が領域内部で局所最大値または局所最小値を取るなら $u$ は $\Omega$ 上定数である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

局所最大の場合を示す。$a\in\Omega$ と $r_0>0$ があり

$$
u(z)\le u(a)
\qquad(|z-a|<r_0)
$$

とする。$0<r<r_0$ を十分小さく取り閉円板を $\Omega$ 内に入れる。平均値性質から

$$
0
=
\frac1{2\pi}\int_0^{2\pi}
\bigl(u(a)-u(a+re^{it})\bigr)dt.
$$

被積分関数は非負連続である。どこかで正ならその近傍でも正になり積分が正になるので、全ての $t$ で

$$
u(a+re^{it})=u(a).
$$

これは十分小さい全ての $r$ について成り立つから、$u$ は $a$ の近傍で定数である。

前補題で使った

$$
h=u_x-iu_y
$$

は $\Omega$ 全体で正則である。$u$ が定数になった非空開集合上では $h=0$。したがって [恒等定理](../CA3/index.md#thm-ca3-isolated-zeros-identity) から $h\equiv0$。よって任意の点の小円板で $u_x=u_y=0$ となり、線分に沿う一変数微分から $u$ は局所定数である。領域 $\Omega$ は連結だから局所定数関数 $u$ は全体で定数になる。

局所最小の場合は $-u$ に同じ議論を適用する。$\square$
<!-- proof-end -->

### 例：正則関数を経由する意味

$u(x,y)=x^2-y^2$ は $\operatorname{Re}(z^2)$ なので、中心0の円周では

$$
u(re^{it})=r^2\cos(2t).
$$

その平均は0で $u(0)=0$ と一致する。平均値性質は「正負がたまたま相殺した例」ではなく、任意の調和関数について局所正則表示と [Cauchy 平均値公式](../CA3/index.md#cor-ca3-cauchy-mean-value) が強制する構造である。

---

## 4. Poisson kernel は境界へ質量を集中させる

<a id="def-ca6-poisson-kernel"></a>
<!-- formal-statement-start -->
### 定義（Poisson kernel）

$0\le r<1$、$\varphi\in\mathbb R$ に対して

$$
\boxed{
P_r(\varphi)
=
\frac{1-r^2}{1-2r\cos\varphi+r^2}
=
\frac{1-r^2}{|e^{i\varphi}-r|^2}
}
$$

を単位円板の **Poisson kernel** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca6-poisson-kernel -->
**定義の確認**：$r=0$ では $P_0\equiv1$。一方 $r\uparrow1$ では $\varphi=0$ の値は $(1+r)/(1-r)$ と発散するが、$\varphi\ne0$ を固定すると $P_r(\varphi)\to0$。高さではなく積分した総質量が1に保たれたまま $0$ の近くへ集中する。
<!-- definition-example-end -->

<a id="lem-ca6-poisson-kernel-approximate-identity"></a>
<!-- formal-statement-start -->
### 補題（Poisson kernelのapproximate identity性）

$0\le r<1$ に対して次が成り立つ。

1. $P_r(\varphi)>0$。
2. 正規化質量は1、すなわち
   $$
   \frac1{2\pi}\int_{-\pi}^{\pi}P_r(\varphi)d\varphi=1.
   $$
3. 任意の $0<\delta<\pi$ に対して
   $$
   \int_{\delta\le|\varphi|\le\pi}P_r(\varphi)d\varphi
   \longrightarrow0
   \qquad(r\uparrow1).
   $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### 1. 非負性

$$
1-2r\cos\varphi+r^2
=|e^{i\varphi}-r|^2>0
$$

であり、$1-r^2>0$ だから $P_r(\varphi)>0$。

#### 2. 質量1

$|re^{i\varphi}|=r<1$ なので幾何級数は $\varphi$ に関して一様絶対収束し、

$$
\frac{1+re^{i\varphi}}{1-re^{i\varphi}}
=1+2\sum_{n=1}^{\infty}r^n e^{in\varphi}.
$$

実部を取ると

$$
P_r(\varphi)
=1+2\sum_{n=1}^{\infty}r^n\cos(n\varphi).
$$

一様収束なので有限和の積分の極限として項別積分できる。$n\ge1$ では

$$
\int_{-\pi}^{\pi}\cos(n\varphi)d\varphi=0
$$

だから

$$
\int_{-\pi}^{\pi}P_r(\varphi)d\varphi=2\pi.
$$

ここでは Fourier 級数の一般収束定理は使っていない。比 $r<1$ の幾何級数の一様絶対収束だけを使った。

#### 3. 境界から離れた質量は消える

$\delta\le|\varphi|\le\pi$ なら

$$
1-2r\cos\varphi+r^2
=(1-r)^2+2r(1-\cos\varphi)
\ge2r(1-\cos\delta).
$$

$r\ge1/2$ に限れば

$$
0\le P_r(\varphi)
\le
\frac{1-r^2}{2r(1-\cos\delta)}.
$$

右辺は $r\uparrow1$ で0へ行き、積分区間の長さは高々 $2\pi$ なので

$$
0\le
\int_{\delta\le|\varphi|\le\pi}P_r(\varphi)d\varphi
\le
2\pi\frac{1-r^2}{2r(1-\cos\delta)}
\longrightarrow0.
$$

$\square$
<!-- proof-end -->

この三性質の役割は別々である。非負性は誤差評価で絶対値を核の外へ出すことを許し、質量1は $g(\theta)$ を同じ積分へ挿入することを許し、遠方質量の消失が境界値の局所情報だけを残す。

<a id="def-ca6-poisson-integral"></a>
<!-- formal-statement-start -->
### 定義（Poisson積分）

$g:\partial\mathbb D\to\mathbb R$ を連続関数とする。$0\le r<1$ に対し

$$
\boxed{
\mathcal P[g](re^{i\theta})
=
\frac1{2\pi}
\int_{-\pi}^{\pi}
P_r(\theta-t)g(e^{it})dt
}
$$

を $g$ の **Poisson積分**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca6-poisson-integral -->
**定義の確認**：$g\equiv c$ なら質量1から

$$
\mathcal P[g](re^{i\theta})=c.
$$

定数境界データは同じ定数関数へ延長される。核の正規化がなければ、この最も基本的な境界条件すら再現できない。
<!-- definition-example-end -->

---

## 5. Poisson積分はDirichlet問題を解く

<a id="thm-ca6-poisson-dirichlet-solution"></a>
<!-- formal-statement-start -->
### 定理（Poisson積分によるDirichlet問題の解）

$g:\partial\mathbb D\to\mathbb R$ を連続とし

$$
u(z)=\mathcal P[g](z)
\qquad(z\in\mathbb D)
$$

とする。このとき

1. $u$ は $\mathbb D$ 上調和的である。
2. $r\uparrow1$ のとき
   $$
   \sup_{\theta\in\mathbb R}
   |u(re^{i\theta})-g(e^{i\theta})|
   \longrightarrow0.
   $$
3. $u(e^{i\theta})=g(e^{i\theta})$ と定めれば $u$ は閉円板 $\overline{\mathbb D}$ 上連続になる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### 1. まず積分の実部として正則関数を作る

$\zeta=e^{it}$ とし

$$
K_t(z)=\frac{\zeta+z}{\zeta-z}
$$

と置く。$|z|<1=|\zeta|$ なので分母は0でない。さらに

$$
\operatorname{Re}K_t(z)
=
\operatorname{Re}
\frac{(\zeta+z)(\overline\zeta-\overline z)}{|\zeta-z|^2}
=
\frac{1-|z|^2}{|\zeta-z|^2}.
$$

$z=re^{i\theta}$ なら $|\zeta-z|^2=1-2r\cos(\theta-t)+r^2$ だから

$$
\operatorname{Re}K_t(re^{i\theta})=P_r(\theta-t).
$$

そこで

$$
F(z)=\frac1{2\pi}
\int_{-\pi}^{\pi}K_t(z)g(e^{it})dt
$$

と定める。これが正則であることを「積分だから正則」と済ませず、差商を評価する。

固定した $z\in\mathbb D$ に対し

$$
d=1-|z|>0
$$

とする。$|h|<d/2$ なら全ての $t$ について

$$
|\zeta-z|\ge d,
\qquad
|\zeta-z-h|\ge d/2.
$$

直接計算すると

$$
\frac{K_t(z+h)-K_t(z)}h
=
\frac{2\zeta}{(\zeta-z-h)(\zeta-z)}
$$

であり、候補導関数

$$
K_t'(z)=\frac{2\zeta}{(\zeta-z)^2}
$$

との差は

$$
\frac{2\zeta h}{(\zeta-z-h)(\zeta-z)^2}.
$$

従って $t$ に一様に

$$
\left|
\frac{K_t(z+h)-K_t(z)}h-K_t'(z)
\right|
\le
\frac{4|h|}{d^3}
\longrightarrow0.
$$

$g$ はコンパクトな円周上で連続なので

$$
M=\max_{\partial\mathbb D}|g|<\infty.
$$

積分した誤差は高々 $4M|h|/d^3$ だから0へ行く。よって

$$
F'(z)=\frac1{2\pi}
\int_{-\pi}^{\pi}
\frac{2e^{it}}{(e^{it}-z)^2}g(e^{it})dt
$$

が存在し、$F$ は $\mathbb D$ 上正則である。

その実部は

$$
\operatorname{Re}F(re^{i\theta})
=
\frac1{2\pi}\int_{-\pi}^{\pi}
P_r(\theta-t)g(e^{it})dt
=u(re^{i\theta}).
$$

[正則関数の実部は調和的](#thm-ca6-holomorphic-parts-harmonic) なので $u$ は $\mathbb D$ 上調和的である。

#### 2. 境界収束を近傍と遠方に分ける

$G(\theta)=g(e^{i\theta})$ と置く。$G$ は $2\pi$ 周期の連続関数で、円周のコンパクト性から一様連続である。Poisson kernel の質量1を使えば

$$
\begin{aligned}
u(re^{i\theta})-G(\theta)
&=
\frac1{2\pi}
\int_{-\pi}^{\pi}
P_r(s)
\bigl(G(\theta-s)-G(\theta)\bigr)ds,
\end{aligned}
$$

ここでは周期性を使って変数を $s=\theta-t$ へずらした。

$\varepsilon>0$ を固定する。一様連続性により、ある $0<\delta<\pi$ を選んで

$$
|s|<\delta
\quad\Longrightarrow\quad
|G(\theta-s)-G(\theta)|<\frac\varepsilon2
$$

を全ての $\theta$ で同時に成り立たせられる。近傍部分では非負性と質量1から

$$
\frac1{2\pi}
\int_{|s|<\delta}
P_r(s)|G(\theta-s)-G(\theta)|ds
\le\frac\varepsilon2.
$$

一方 $M=\max|G|$ とすれば遠方部分は

$$
\frac1{2\pi}
\int_{\delta\le|s|\le\pi}
P_r(s)|G(\theta-s)-G(\theta)|ds
\le
\frac{2M}{2\pi}
\int_{\delta\le|s|\le\pi}P_r(s)ds.
$$

右端の積分は [approximate identity性](#lem-ca6-poisson-kernel-approximate-identity) により $r\uparrow1$ で0へ行き、しかも $\theta$ に依存しない。従って $r$ を十分1へ近づければ遠方部分も $\varepsilon/2$ 未満になり、全ての $\theta$ について

$$
|u(re^{i\theta})-G(\theta)|<\varepsilon.
$$

よって一様境界収束が得られる。

#### 3. 閉円板での連続性

内部では $u$ は調和的、従って連続である。境界点 $e^{i\theta_0}$ へ $re^{i\theta}$ が近づくとき

$$
\begin{aligned}
|u(re^{i\theta})-g(e^{i\theta_0})|
&\le
|u(re^{i\theta})-g(e^{i\theta})|
+|g(e^{i\theta})-g(e^{i\theta_0})|.
\end{aligned}
$$

第一項は $r\uparrow1$ で $\theta$ に一様に0、第二項は $\theta\to\theta_0$ で連続性により0へ行く。従って境界値を $g$ と定めた $u$ は $\overline{\mathbb D}$ 上連続である。$\square$
<!-- proof-end -->

この証明でコンパクト性を使った場所は明確である。$g$ の有界性と一様連続性は円周がコンパクトだから得られ、差商と積分の交換は固定した内部点から境界までの正距離 $d=1-|z|$ によって一様化した。$r=1$ で積分核をそのまま評価したわけではない。

<a id="cor-ca6-disk-dirichlet-uniqueness"></a>
<!-- formal-statement-start -->
### 系（円板Dirichlet問題の一意性）

$u,v$ が $\mathbb D$ 上調和的で $\overline{\mathbb D}$ 上連続、かつ

$$
u=v
\qquad\text{on }\partial\mathbb D
$$

なら $u=v$ on $\overline{\mathbb D}$。従って連続境界データ $g$ に対する前定理の Poisson 積分は、この正則性クラスで唯一の解である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$w=u-v$ と置けば $w$ は円板内で調和的、閉円板上連続で、境界上 $w=0$ である。閉円板はコンパクトなので $w$ は最大値と最小値を持つ。

もし

$$
\max_{\overline{\mathbb D}}w>0
$$

なら、境界値は0なので正の最大値は内部で達成される。[調和関数の最大・最小値原理](#cor-ca6-harmonic-maximum-minimum-principle) により $w$ は定数となるが、境界値0と矛盾する。従って $w\le0$。

同様に $-w$ へ [調和関数の最大・最小値原理](#cor-ca6-harmonic-maximum-minimum-principle) を適用して $w\ge0$。よって $w\equiv0$、すなわち $u=v$ である。$\square$
<!-- proof-end -->

<a id="cor-ca6-poisson-fourier-series"></a>
<!-- formal-statement-start -->
### 系（Poisson kernelのFourier級数）

$0\le r<1$ に対して

$$
\boxed{
P_r(\varphi)
=1+2\sum_{n=1}^{\infty}r^n\cos(n\varphi)
}
$$

であり、級数は $\varphi$ に関して一様絶対収束する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$|re^{i\varphi}|=r<1$ なので

$$
\frac1{1-re^{i\varphi}}
=\sum_{n=0}^{\infty}r^n e^{in\varphi}
$$

は Weierstrass の $M$ 評価 $|r^ne^{in\varphi}|\le r^n$ により一様絶対収束する。従って

$$
\frac{1+re^{i\varphi}}{1-re^{i\varphi}}
=1+2\sum_{n=1}^{\infty}r^ne^{in\varphi}.
$$

実部を取ると左辺は $P_r(\varphi)$、右辺は

$$
1+2\sum_{n=1}^{\infty}r^n\cos(n\varphi)
$$

となる。$\square$
<!-- proof-end -->

### 例：境界データ $\cos(nt)$ の減衰

$n\ge1$ とし $g(e^{it})=\cos(nt)$ とする。Fourier 級数表示を Poisson 積分へ代入すると、積の積分で同じ周波数だけが残り

$$
\mathcal P[g](re^{i\theta})
=r^n\cos(n\theta).
$$

実際 $r^n\cos(n\theta)=\operatorname{Re}(z^n)$ は調和的で、境界 $r=1$ では $\cos(n\theta)$ に一致する。半径方向の係数 $r^n$ は、高周波ほど円板内部で速く減衰することを表している。

---

## 6. 演習

### Level A

<a id="ex-ca6-a01"></a>
#### CA6-A01 上半平面を単位円板へ写す
- Level: A

$$
C(z)=\frac{z-i}{z+i}
$$

について、$\operatorname{Im}z>0$ なら $|C(z)|<1$ を直接示し、逆写像を求めよ。

<!-- solution-start -->
**解答**：$z=x+iy$ とすると

$$
|z+i|^2-|z-i|^2
=x^2+(y+1)^2-x^2-(y-1)^2
=4y>0.
$$

従って $|z-i|<|z+i|$ で $|C(z)|<1$。$w=(z-i)/(z+i)$ を解くと

$$
wz+iw=z-i,
\qquad
z(w-1)=-i(1+w),
$$

よって

$$
\boxed{z=i\frac{1+w}{1-w}}.
$$

境界実軸が単位円へ移るだけでなく、$4y>0$ が上半平面を円板の内部側へ送ることを確定している。
<!-- solution-end -->

<a id="ex-ca6-a02"></a>
#### CA6-A02 標準円板自己同型の恒等式
- Level: A

$a,z\in\mathbb D$ に対し

$$
\phi_a(z)=\frac{z-a}{1-\overline a z}
$$

とする。次を示せ。

$$
1-|\phi_a(z)|^2
=
\frac{(1-|a|^2)(1-|z|^2)}{|1-\overline a z|^2}.
$$

<!-- solution-start -->
**解答**：分母を払えば

$$
|1-\overline a z|^2-|z-a|^2
$$

を計算すればよい。展開すると

$$
1-\overline a z-a\overline z+|a|^2|z|^2
-|z|^2+z\overline a+a\overline z-|a|^2
$$

で、交差項が消えて

$$
(1-|a|^2)(1-|z|^2)
$$

が残る。両因子は正なので $|\phi_a(z)|<1$。この符号が「分数線形式である」だけでは分からない円板内部の保存を保証する。
<!-- solution-end -->

<a id="ex-ca6-a03"></a>
#### CA6-A03 調和性と正則関数
- Level: A

$$
u(x,y)=x^2-y^2+3x
$$

が調和的であることを確認し、$u$ を実部に持つ整関数を一つ求めよ。

<!-- solution-start -->
**解答**：

$$
u_{xx}=2,
\qquad
u_{yy}=-2,
$$

だから $\Delta u=0$。また

$$
z^2+3z
=(x^2-y^2+3x)+i(2xy+3y)
$$

なので

$$
\boxed{F(z)=z^2+3z}
$$

が一つの答え。虚部には実定数倍の純虚定数を加えてもよい。調和性の確認と調和共役の構成が対応している。
<!-- solution-end -->

<a id="ex-ca6-a04"></a>
#### CA6-A04 Poisson kernel の基本形
- Level: A

$0\le r<1$ に対し $P_r(0)$、$P_r(\pi)$ を求め、$P_r$ が正で偶関数であることを示せ。

<!-- solution-start -->
**解答**：

$$
P_r(0)=\frac{1-r^2}{(1-r)^2}=\frac{1+r}{1-r},
$$

$$
P_r(\pi)=\frac{1-r^2}{(1+r)^2}=\frac{1-r}{1+r}.
$$

分母は $|e^{i\varphi}-r|^2>0$、分子も正なので $P_r>0$。また $\cos(-\varphi)=\cos\varphi$ から

$$
P_r(-\varphi)=P_r(\varphi).
$$

$r\uparrow1$ で0付近が高く、反対側が低くなることが質量集中の形を示している。
<!-- solution-end -->

### Level B

<a id="ex-ca6-b01"></a>
#### CA6-B01 Schwarz lemma から円板自己同型を分類する
- Level: B

$F$ を円板自己同型とし $a=F^{-1}(0)$ とする。$G=F\circ\phi_a^{-1}$ と $G^{-1}$ の両方へ [Schwarz lemma](#thm-ca6-schwarz-lemma) を適用し、$F$ の一般形を導け。

<!-- solution-start -->
**解答**：$G$ は円板自己同型で $G(0)=0$。[Schwarz lemma](#thm-ca6-schwarz-lemma) から

$$
|G(z)|\le|z|.
$$

$G^{-1}(0)=0$ でもあるから

$$
|G^{-1}(w)|\le|w|.
$$

$w=G(z)$ とすれば $|z|\le|G(z)|$。よって全ての $z$ で $|G(z)|=|z|$。非零点を一つ取れば [Schwarz lemma](#thm-ca6-schwarz-lemma) の等号条件から

$$
G(z)=e^{i\theta}z.
$$

従って

$$
\boxed{
F(z)=e^{i\theta}\phi_a(z)
=e^{i\theta}\frac{z-a}{1-\overline a z}
}.
$$

全単射性は $G^{-1}$ に同じ評価を適用するために使われており、単なる円板自己写像ではこの逆向き不等式は得られない。
<!-- solution-end -->

<a id="ex-ca6-b02"></a>
#### CA6-B02 調和関数の平均値性質を具体例で確認する
- Level: B

$n\ge1$ とし

$$
u(re^{it})=r^n\cos(nt)=\operatorname{Re}(z^n)
$$

とする。中心0の半径 $0<r<1$ の円周平均を計算し、平均値性質と一致することを確認せよ。

<!-- solution-start -->
**解答**：$z^n$ は正則なので $u=\operatorname{Re}(z^n)$ は調和的。直接積分すると

$$
\frac1{2\pi}\int_0^{2\pi}r^n\cos(nt)dt
=
\frac{r^n}{2\pi}
\left[\frac{\sin(nt)}n\right]_0^{2\pi}
=0.
$$

一方 $u(0)=0$。従って円周平均は中心値に一致する。ここで $n\ge1$ により非定数の角周波数成分の平均が消えている。
<!-- solution-end -->

<a id="ex-ca6-b03"></a>
#### CA6-B03 Poisson kernel の質量と遠方評価
- Level: B

$0<\delta<\pi$ とする。幾何級数から

$$
\int_{-\pi}^{\pi}P_r(\varphi)d\varphi=2\pi
$$

を示し、さらに $r\ge1/2$ で

$$
\int_{\delta\le|\varphi|\le\pi}P_r(\varphi)d\varphi
\le
\frac{\pi(1-r^2)}{r(1-\cos\delta)}
$$

を示せ。

<!-- solution-start -->
**解答**：$r<1$ なので

$$
P_r(\varphi)
=1+2\sum_{n\ge1}r^n\cos(n\varphi)
$$

は一様絶対収束する。項別積分でき、$n\ge1$ の cos 項の積分は0だから総積分は $2\pi$。

また $|\varphi|\ge\delta$ では

$$
1-2r\cos\varphi+r^2
=(1-r)^2+2r(1-\cos\varphi)
\ge2r(1-\cos\delta).
$$

従って

$$
P_r(\varphi)
\le\frac{1-r^2}{2r(1-\cos\delta)}.
$$

積分区間の長さを高々 $2\pi$ と評価すれば

$$
\int_{\delta\le|\varphi|\le\pi}P_r
\le
2\pi\frac{1-r^2}{2r(1-\cos\delta)}
=
\boxed{
\frac{\pi(1-r^2)}{r(1-\cos\delta)}
}.
$$

右辺は $r\uparrow1$ で0へ行く。これが境界収束で遠方部分を捨てられる機構である。
<!-- solution-end -->

### Level C

<a id="ex-ca6-c01"></a>
#### CA6-C01 Poisson積分の境界収束と一意性
- Level: C

$g:\partial\mathbb D\to\mathbb R$ を連続とし $u=\mathcal P[g]$ とする。

1. $u(re^{i\theta})\to g(e^{i\theta})$ が $\theta$ に関して一様であることを、$|s|<\delta$ と $|s|\ge\delta$ に分けた $\varepsilon$ 論証で示せ。
2. $v$ が $\mathbb D$ 上調和的、$\overline{\mathbb D}$ 上連続で境界値 $g$ を持つなら $v=u$ を示せ。

<!-- solution-start -->
**解答**：

**1. 近傍・遠方分割。** $G(\theta)=g(e^{i\theta})$ とし $M=\max|G|$。質量1から

$$
u(re^{i\theta})-G(\theta)
=
\frac1{2\pi}\int_{-\pi}^{\pi}
P_r(s)(G(\theta-s)-G(\theta))ds.
$$

$G$ は円周上連続なので一様連続。任意の $\varepsilon>0$ に対し $\delta>0$ を取り、$|s|<\delta$ なら全ての $\theta$ で

$$
|G(\theta-s)-G(\theta)|<\varepsilon/2.
$$

従って近傍部分は非負性と質量1により $\varepsilon/2$ 以下。一方遠方では差を $2M$ で抑えて

$$
\text{遠方誤差}
\le
\frac{2M}{2\pi}
\int_{\delta\le|s|\le\pi}P_r(s)ds.
$$

B03 の評価から右辺は $r\uparrow1$ で0。十分大きい $r$ では $\varepsilon/2$ 未満である。二つを足せば

$$
\sup_\theta|u(re^{i\theta})-g(e^{i\theta})|<\varepsilon.
$$

**2. 一意性。** $w=v-u$ は円板内で調和的、閉円板上連続、境界上0。コンパクトな閉円板で最大・最小を取る。もし最大値が正なら境界ではない内部で達成され、[調和関数の最大・最小値原理](#cor-ca6-harmonic-maximum-minimum-principle) により定数になって境界0と矛盾する。よって $w\le0$。$-w$ に同じ議論をして $w\ge0$。従って

$$
\boxed{v=u}.
$$

存在側では approximate identity が境界への収束を作り、一意性側では [調和関数の最大・最小値原理](#cor-ca6-harmonic-maximum-minimum-principle) が別の解を排除する。この二つは独立した機構である。
<!-- solution-end -->

---

## 7. 章末チェック

- Möbius 変換の全単射性は逆写像を直接解き、等角性は有限点だけでなく極と $\infty$ を局所座標へ移して確認した。
- 一般化円の保存は「有名な定理」で済ませず、平行移動・非零定数倍・反転への分解と一般化円の方程式から閉じた。
- [Schwarz lemma](#thm-ca6-schwarz-lemma) では $|z|=1$ 上の境界値を仮定せず、$R<1$ の閉円板で[最大値原理](../CA3/index.md#thm-ca3-maximum-modulus)を使って $R\uparrow1$ とした。
- 円板自己同型の分類では全単射性を $G^{-1}$ に [Schwarz lemma](#thm-ca6-schwarz-lemma) を適用する箇所で使った。
- 調和関数の平均値性質は Green 公式を先取りせず、$u_x-iu_y$ の正則性、局所原始関数、Cauchy 平均値公式の順に導いた。
- 調和関数の最大・最小値原理では平均値の等号から局所定数性を出し、$u_x-iu_y$ と恒等定理で領域全体へ伝播した。
- Poisson kernel は非負性・質量1・遠方質量消失を分離して証明した。
- Poisson積分の調和性は積分核の差商を内部点から境界までの正距離で一様評価し、正則関数の実部として得た。
- 境界収束では円周上の連続性から一様連続性を得て、近傍誤差と遠方誤差を別々に抑えた。
- Dirichlet問題の一意性は閉円板のコンパクト性で最大・最小を達成させ、内部最大・最小を調和関数の原理で排除した。
- Riemann mapping theorem、normal family、Montel theorem、Green/Stokes、一般領域の Dirichlet 問題は使用していない。
