# OPT4 Fenchel 共役・凸双対

<!-- definition-example-audit: strict -->

この章は DREAM THEATER の凸解析・最適化系列で、**線形関数との差の上限を使って凸関数を双対側から読む構成**を扱う canonical owner です。旧 F0-00G2 の資産を移行し、OPT3 で整えた閉真凸関数・劣微分・法錐を、双対側の関数、等号条件、二重化、双対問題へ順に接続します。旧ページは stable anchor と過去 URL のため残しますが、読者向け一覧からは外します。

> **この章の停止線**
>
> Lagrangian、Slater 条件、KKT の体系的導出は次章 OPT5 の担当です。本章では共役関数から双対問題を構成する方法と弱双対性、強双対性へ進むための相対内部条件の意味までを扱います。


<!-- definition-example-audit: strict -->

ここまでで

- 凸関数をエピグラフという凸集合として見る
- 支持超平面の傾きを劣勾配として読む
- 法錐・極錐・双対錐で制約の幾何を読む

ところまで進みました。

この講義では、それらを **凸共役（convex conjugate）** でまとめます。最重要式は

$$
\boxed{
y\in\partial f(x)
\iff
f(x)+f^*(y)=\langle x,y\rangle
}
$$

です。劣勾配・支持超平面・双対変数が、同じ構造の別の見え方になります。

```text
支持超平面
  ↓ 傾き y を固定
凸共役 f*
  ↓
Fenchel--Young
  ↓ 等号条件
劣勾配
  ↓
Fenchel 双対
  ↓
Lagrange 双対・KKT
```

---

## 1. 凸共役

<a id="def-opt4-conjugate"></a>

<!-- formal-statement-start -->
> **定義（Fenchel–Legendre 共役）**  
> 真関数 $f:\mathbb R^n\to(-\infty,+\infty]$ に対し、線形関数との差の上限として定まる次の関数を $f$ の **Fenchel 共役（凸共役）** といいます。

$$
\boxed{
f^*(y)
=
\sup_{x\in\mathbb R^n}
\{\langle y,x\rangle-f(x)\}
}.
$$
<!-- formal-statement-end -->

定義を並べ替えると

$$
\langle y,x\rangle-f^*(y)
\le
f(x)
\qquad(\forall x)
$$

です。従って $f^*(y)$ は、傾き $y$ のアフィン下界をどこまで上へ押し上げられるかを記録しています。

<a id="thm-opt4-conjugate-closed-convex"></a>
<!-- formal-statement-start -->
> **定理（共役関数の凸性・下半連続性）**  
> 真関数 $f:\mathbb R^n\to(-\infty,+\infty]$ に対して、Fenchel 共役 $f^*$ は凸かつ下半連続である。
<!-- formal-statement-end -->

### 証明の見取り図

$x$ を固定すると
$$
y\mapsto \langle y,x\rangle-f(x)
$$
は $y$ のアフィン連続関数です。$f^*$ はそれらを全て重ねた上限なので、凸性と下半連続性が保存されます。

<!-- proof-start -->
### 証明

任意の $y_1,y_2\in\mathbb R^n$ と $0\le\theta\le1$ に対し、

$$
\begin{aligned}
f^*(\theta y_1+(1-\theta)y_2)
&=
\sup_x\{
\theta\langle y_1,x\rangle
+(1-\theta)\langle y_2,x\rangle
-f(x)
\}\\
&\le
\theta\sup_x\{\langle y_1,x\rangle-f(x)\}
+(1-\theta)\sup_x\{\langle y_2,x\rangle-f(x)\}\\
&=
\theta f^*(y_1)+(1-\theta)f^*(y_2).
\end{aligned}
$$

従って $f^*$ は凸です。

また任意の $\alpha\in\mathbb R$ について

$$
\begin{aligned}
\{y:f^*(y)\le\alpha\}
&=
\bigcap_{x\in\operatorname{dom}f}
\{y:\langle y,x\rangle-f(x)\le\alpha\}.
\end{aligned}
$$

右辺は閉半空間の共通部分なので閉です。従って $f^*$ は下半連続です。$\square$
<!-- proof-end -->

ここで重要なのは、**元の $f$ が閉でなくても、共役側では凸性と下半連続性が自動的に現れる**ことです。共役をさらにもう一度取ると、この「閉凸化」と元の関数との関係が見えてきます。

---

## 2. 例：二次関数の共役

$$
f(x)=\frac12\|x\|^2
$$

とします。平方完成すると

$$
\begin{aligned}
f^*(y)
&=\sup_x\left\{
\langle y,x\rangle-\frac12\|x\|^2
\right\}\\
&=\sup_x\left\{
-\frac12\|x-y\|^2+\frac12\|y\|^2
\right\}\\
&=\frac12\|y\|^2.
\end{aligned}
$$

したがって

$$
\boxed{
\left(\frac12\|\cdot\|^2\right)^*
=
\frac12\|\cdot\|^2
}.
$$

---

## 3. 例：絶対値と区間の標示関数

$f(x)=|x|$ とします。

$$
f^*(y)
=
\sup_x\{yx-|x|\}.
$$

$|y|\le1$ なら $yx-|x|\le0$ で、$x=0$ により上限0を達成します。一方 $|y|>1$ なら、$x$ の符号を $y$ に合わせて $|x|\to\infty$ とすると

$$
yx-|x|\to+\infty.
$$

したがって

$$
\boxed{
|\cdot|^*(y)
=
\delta_{[-1,1]}(y)
}.
$$

逆に

$$
\delta_{[-1,1]}^*(x)
=
\sup_{|y|\le1}xy
=
|x|.
$$

これは「ノルムと双対単位球」の最小例です。

---

## 4. 支持関数

<a id="def-opt4-support-function"></a>

<!-- formal-statement-start -->
> **定義（支持関数）**  
> 集合 $C\subset\mathbb R^n$ に対して、方向 $y$ に沿う線形汎関数の上限を $C$ の **支持関数（support function）** といいます。

$$
\sigma_C(y)
=
\sup_{x\in C}\langle y,x\rangle.
$$
<!-- formal-statement-end -->

標示関数との関係は

$$
\boxed{\delta_C^*=\sigma_C}
$$

です。集合の幾何を表す関数が、共役を通すと自然に現れます。

### 4.1 例：2-ノルムの単位球

$$
C=\{x:\|x\|_2\le1\}
$$

なら [Cauchy–Schwarz 不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)より

$$
\sigma_C(y)
=
\sup_{\|x\|_2\le1}y^{\mathsf T}x
=
\|y\|_2.
$$

---

## 5. Fenchel–Young 不等式

共役の定義から任意の $x,y$ について

$$
f^*(y)
\ge
\langle y,x\rangle-f(x).
$$

従って次を得ます。

<a id="thm-opt4-fenchel-young"></a>

<!-- formal-statement-start -->
> **定理（Fenchel–Young 不等式）**  
> 真関数 $f:\mathbb R^n\to(-\infty,+\infty]$ と任意の $x,y\in\mathbb R^n$ に対して、元の関数と共役関数の和は内積以上です。

$$
\boxed{
f(x)+f^*(y)
\ge
\langle x,y\rangle
}.
$$
<!-- formal-statement-end -->

### 5.1 二次関数では Young の不等式になる

$f(x)=x^2/2$ を使えば

$$
\frac{x^2}{2}+\frac{y^2}{2}
\ge
xy,
$$

すなわち

$$
2xy\le x^2+y^2
$$

です。

---

## 6. 等号条件 = 劣勾配

<a id="thm-opt4-fenchel-equality-subgradient"></a>

<!-- formal-statement-start -->
> **定理（Fenchel–Young の等号条件）**  
> 真凸関数 $f$ と $x\in\operatorname{dom}f$ に対して、Fenchel–Young 不等式で等号が成立することと、$y$ が $x$ における劣勾配であることは同値です。

$$
\boxed{
y\in\partial f(x)
\iff
f(x)+f^*(y)=\langle x,y\rangle
}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$y\in\partial f(x)$ なら

$$
f(z)
\ge
f(x)+\langle y,z-x\rangle
\qquad(\forall z).
$$

整理すると

$$
\langle y,z\rangle-f(z)
\le
\langle y,x\rangle-f(x).
$$

従って共役を定義する上限は $z=x$ で達成され、

$$
f^*(y)
=
\langle y,x\rangle-f(x).
$$

逆にこの等号が成立すると、共役の定義から任意の $z$ について

$$
\langle y,z\rangle-f(z)
\le
f^*(y)
=
\langle y,x\rangle-f(x).
$$

整理すれば

$$
f(z)
\ge
f(x)+\langle y,z-x\rangle,
$$

すなわち $y\in\partial f(x)$ です。$\square$
<!-- proof-end -->

**劣勾配であること**と、**Fenchel–Young ギャップ が0になること**は同じです。

---

## 7. 二重共役と Fenchel–Moreau

<a id="def-opt4-biconjugate"></a>

<!-- formal-statement-start -->
> **定義（二重共役）**  
> $f$ の共役にもう一度共役を取り、次で定まる関数を $f$ の **二重共役** といいます。

$$
f^{**}(x)
=
\sup_y\{\langle x,y\rangle-f^*(y)\}.
$$
<!-- formal-statement-end -->

[Fenchel–Young 不等式](#thm-opt4-fenchel-young)から常に

$$
\langle x,y\rangle-f^*(y)
\le
f(x)
$$

なので

$$
\boxed{f^{**}(x)\le f(x)}.
$$

<a id="thm-opt4-fenchel-moreau"></a>

<!-- formal-statement-start -->
> **定理（有限次元 Fenchel–Moreau）**  
> $f:\mathbb R^n\to(-\infty,+\infty]$ が閉真凸関数なら、二重共役は元の関数に一致します。

$$
\boxed{f^{**}=f}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

すでに $f^{**}\le f$ は [Fenchel–Young 不等式](#thm-opt4-fenchel-young)から分かっています。逆向きでは、$\operatorname{epi}f$ の下にある任意の点 $(x_0,r)$ をエピグラフから厳密分離し、**$f$ を下から支えながら $x_0$ では $r$ より高いアフィン関数**を作ります。

注意点は、$x_0\notin\operatorname{dom}f$ の場合、分離超平面が鉛直方向の係数を持たないことがある点です。その場合も、まず一つの大域的アフィン下界を作り、水平分離の方向を足して $x_0$ での値を任意に押し上げます。

<!-- proof-start -->
### 証明

すでに

$$
f^{**}(x)\le f(x)
\qquad(\forall x)
$$

は示しました。逆向きを示します。

まず、後で使う **大域的アフィン下界が一つ存在する**ことを確認します。真性から $\bar x\in\operatorname{dom}f$ を取り、$\bar r<f(\bar x)$ とします。点 $(\bar x,\bar r)$ は非空閉凸集合 $\operatorname{epi}f$ の外にあるので、[点と閉凸集合の厳密分離](../OPT2/index.md#thm-opt2-point-separation)より、$(a,b)\ne0$ と $\beta$ が存在して

$$
a^{\mathsf T}x+bt
\le
\beta
<
a^{\mathsf T}\bar x+b\bar r
\qquad
((x,t)\in\operatorname{epi}f)
$$

となります。エピグラフは $t$ を上へいくらでも増やせるので $b\le0$ です。さらに $b=0$ なら $(\bar x,f(\bar x))\in\operatorname{epi}f$ を代入して

$$
a^{\mathsf T}\bar x
\le
\beta
<
a^{\mathsf T}\bar x
$$

となり矛盾します。従って $b<0$ です。

$\mu=-b>0$ と置き、$t=f(x)$ を代入すると

$$
f(x)
\ge
\left\langle \frac a\mu,x\right\rangle
-\frac\beta\mu
\qquad
(x\in\operatorname{dom}f).
$$

従って $f$ は少なくとも一つ

$$
\ell_0(x)=\langle y_0,x\rangle+c_0
\le f(x)
$$

という大域的アフィン下界を持ちます。

次に任意の $x_0\in\mathbb R^n$ と実数 $r<f(x_0)$ を取ります。$f(x_0)=+\infty$ の場合も、有限な $r$ は任意に取れます。再び $(x_0,r)$ と $\operatorname{epi}f$ を厳密分離し、

$$
a^{\mathsf T}x+bt
\le
\beta
<
a^{\mathsf T}x_0+br
\qquad
((x,t)\in\operatorname{epi}f)
$$

を得ます。やはり $b\le0$ です。

**場合1：$b<0$。** $\mu=-b>0$ と置くと

$$
f(x)
\ge
\left\langle \frac a\mu,x\right\rangle
-\frac\beta\mu.
$$

右辺を $\ell(x)=\langle y,x\rangle+c$ と書けば $\ell\le f$ です。さらに

$
\beta<a^{\mathsf T}x_0-\mu r
$

なので

$
\ell(x_0)
=
\left\langle\frac a\mu,x_0\right\rangle
-\frac\beta\mu
>
r.
$

**場合2：$b=0$。** このとき

$$
a^{\mathsf T}x\le\beta<a^{\mathsf T}x_0
\qquad
(x\in\operatorname{dom}f).
$$

従って

$$
h(x)=a^{\mathsf T}x-\beta
$$

は $\operatorname{dom}f$ 上で $h(x)\le0$、一方 $h(x_0)>0$ です。先ほど作ったアフィン下界 $\ell_0$ に対し

$$
\ell_t(x)=\ell_0(x)+t h(x)
\qquad(t\ge0)
$$

と置けば、$x\in\operatorname{dom}f$ では $\ell_t(x)\le\ell_0(x)\le f(x)$ です。一方 $h(x_0)>0$ なので、十分大きい $t$ を取れば

$$
\ell_t(x_0)>r.
$$

従ってどちらの場合も、あるアフィン関数

$$
\ell(x)=\langle y,x\rangle+c
\le f(x)
$$

で $\ell(x_0)>r$ となるものが存在します。

$\ell\le f$ なら

$$
\langle y,x\rangle-f(x)\le-c
\qquad(\forall x),
$$

したがって

$$
f^*(y)\le-c.
$$

よって

$$
f^{**}(x_0)
\ge
\langle x_0,y\rangle-f^*(y)
\ge
\langle x_0,y\rangle+c
=
\ell(x_0)
>r.
$$

これは任意の実数 $r<f(x_0)$ について成り立ちます。$f(x_0)<+\infty$ なら $r\uparrow f(x_0)$ として $f^{**}(x_0)\ge f(x_0)$。$f(x_0)=+\infty$ なら任意の実数 $r$ に対して $f^{**}(x_0)>r$ なので $f^{**}(x_0)=+\infty$ です。

従って全ての $x_0\in\mathbb R^n$ で

$$
f^{**}(x_0)=f(x_0).
$$

$\square$
<!-- proof-end -->

つまり閉真凸関数は、**自分を下から支えるアフィン関数を全部集めれば完全に復元できる**ということです。

---

## 8. 劣微分の逆関係

<a id="thm-opt4-subgradient-inverse"></a>

<!-- formal-statement-start -->
> **定理（劣微分の逆関係）**  
> $f$ を閉真凸関数とします。このとき、$y$ が $f$ の $x$ における劣勾配であることと、$x$ が $f^*$ の $y$ における劣勾配であることは同値です。

$$
\boxed{
y\in\partial f(x)
\iff
x\in\partial f^*(y)
}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[Fenchel–Young の等号条件](#thm-opt4-fenchel-equality-subgradient)から

$$
y\in\partial f(x)
\iff
f(x)+f^*(y)=\langle x,y\rangle.
$$

[Fenchel–Moreau](#thm-opt4-fenchel-moreau)により $f^{**}=f$ です。また前節の証明では $f$ の大域的アフィン下界 $\ell_0(x)=\langle y_0,x\rangle+c_0$ を構成したので $f^*(y_0)\le-c_0<+\infty$。一方、真性から $x_0\in\operatorname{dom}f$ を一つ取れば任意の $y$ に対して

$$
f^*(y)
\ge
\langle y,x_0\rangle-f(x_0)
>
-\infty.
$$

従って $f^*$ は真関数であり、[共役関数の凸性・下半連続性](#thm-opt4-conjugate-closed-convex)と合わせて真凸関数です。よって同じ等式を $f^*$ に対する Fenchel–Young の等号条件として読めば

$$
f^*(y)+f^{**}(x)
=
\langle y,x\rangle
\iff
x\in\partial f^*(y).
$$

従って両者は同値です。$\square$
<!-- proof-end -->

滑らかで勾配写像が1対1になる場合には、これは

$$
y=\nabla f(x)
\iff
x=\nabla f^*(y)
$$

という逆写像関係になります。

---

## 9. Fenchel 双対

ここからは

$$
f:\mathbb R^n\to(-\infty,+\infty],
\qquad
g:\mathbb R^m\to(-\infty,+\infty]
$$

を閉真凸関数、$A:\mathbb R^n\to\mathbb R^m$ を線形写像とし、

$$
\operatorname{dom}f
\cap
A^{-1}(\operatorname{dom}g)
\ne\varnothing
$$

を仮定します。最後の条件は、主問題に少なくとも一つ有限値の実行可能点があることを意味します。

主問題

$$
\boxed{
\inf_x\{f(x)+g(Ax)\}
}
$$

を考えます。$g$ は閉真凸関数なので [Fenchel–Moreau の定理](#thm-opt4-fenchel-moreau)から $g=g^{**}$ です。従って

$$
g(Ax)
=
\sup_y\{\langle y,Ax\rangle-g^*(y)\},
$$

したがって主問題は

$$
\inf_x\sup_y
\{f(x)+\langle A^{\mathsf T}y,x\rangle-g^*(y)\}
$$

と書けます。

$\inf$ と $\sup$ を入れ替えると主問題の下界を与え、内側の $x$ に関する infimum は

$$
\inf_x\{f(x)+\langle A^{\mathsf T}y,x\rangle\}
=
-f^*(-A^{\mathsf T}y).
$$

<a id="def-opt4-fenchel-dual"></a>

<!-- formal-statement-start -->
> **定義（Fenchel 双対問題）**  
> 閉真凸関数 $f:\mathbb R^n\to(-\infty,+\infty]$、$g:\mathbb R^m\to(-\infty,+\infty]$ と行列 $A\in\mathbb R^{m\times n}$ を取り、$\operatorname{dom}f\cap A^{-1}(\operatorname{dom}g)\ne\varnothing$ とする。主問題 $\inf_x\{f(x)+g(Ax)\}$ に対して、次の最大化問題を対応する **Fenchel 双対問題** と呼びます。

$$
\boxed{
\sup_y
\{-f^*(-A^{\mathsf T}y)-g^*(y)\}
}.
$$
<!-- formal-statement-end -->

---

## 10. 弱双対性

<a id="thm-opt4-fenchel-weak-duality"></a>

<!-- formal-statement-start -->
> **定理（Fenchel 双対の弱双対性）**  
> 閉真凸関数 $f:\mathbb R^n\to(-\infty,+\infty]$、$g:\mathbb R^m\to(-\infty,+\infty]$ と行列 $A\in\mathbb R^{m\times n}$ を考える。任意の主変数 $x\in\mathbb R^n$ と双対変数 $y\in\mathbb R^m$ に対して、主問題の目的値は双対問題の目的値以上です。

$$
f(x)+g(Ax)
\ge
-f^*(-A^{\mathsf T}y)-g^*(y).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Fenchel–Young 不等式を $f$ に適用すると

$$
f(x)+f^*(-A^{\mathsf T}y)
\ge
-\langle A^{\mathsf T}y,x\rangle.
$$

同様に $g$ について

$$
g(Ax)+g^*(y)
\ge
\langle y,Ax\rangle.
$$

二つを加えると内積が打ち消し合い、

$$
f(x)+g(Ax)
+f^*(-A^{\mathsf T}y)+g^*(y)
\ge0.
$$

整理すれば主張を得ます。$\square$
<!-- proof-end -->

この差が **双対ギャップ** です。

---

## 11. 強双対性には条件がいる

$\inf\sup$ と $\sup\inf$ は一般には等しくありません。弱双対性は常に成り立っても、**双対ギャップが0になること**や**双対最適解が存在すること**には追加条件が必要です。

有限次元で使う代表的な相対内部条件は

$$
\exists x_0\in\operatorname{ri}(\operatorname{dom}f)
\quad\text{s.t.}\quad
Ax_0\in\operatorname{ri}(\operatorname{dom}g)
$$

です。これは単に有限値の実行可能点があるだけでなく、その点が両方の実効定義域の「相対的な端」に張り付いていないことを要求しています。

なぜ内部点が双対性に効くのでしょうか。主問題を

$$
h(u)
=
\inf_x\{f(x)+g(Ax-u)\}
$$

と摂動してみます。$h(0)$ が元の主問題の最適値です。標準的な有限次元の強双対性の証明では、相対内部条件を使って **$u=0$ の近くでこの摂動問題が退化しないこと**を示し、$h$ のエピグラフを $0$ の位置で支持する超平面を作ります。その超平面の傾きが双対変数になります。

OPT3 の「相対内部では鉛直だけを向く支持超平面を排除できる」という劣勾配存在証明と、ここで働く幾何は同じです。違いは、ここでは $h$ 自体の閉性・支持可能性まで保証する必要があり、その部分が強双対性の本体になることです。

したがって本章で押さえる役割は

$$
\boxed{
\text{相対内部条件}
\Longrightarrow
\text{摂動問題の退化を防ぐ}
\Longrightarrow
\text{支持超平面の傾きを双対変数として取り出せる}
}
$$

という流れです。次章 OPT5 では、有限個の凸不等式制約に対してこの役割を Slater 条件として具体化します。
---

## 12. KKT との接続

主問題

$$
\min_x f(x)+g(Ax)
$$

と双対問題で最適な $x^*,y^*$ があり、双対ギャップが0なら、弱双対性の導出で使った二つの Fenchel–Young 不等式が両方とも等号になります。

従って

$$
-A^{\mathsf T}y^*
\in
\partial f(x^*),
$$

$$
y^*
\in
\partial g(Ax^*).
$$

すなわち

$$
\boxed{
0
\in
\partial f(x^*)+A^{\mathsf T}y^*
}
$$

という停留条件が出ます。

制約集合 $C$ に対して $g=\delta_C$ と置けば

$$
\partial g=N_C
$$

なので法錐を使った制約付き最適性条件になります。さらに錐制約を使えば双対錐と相補性が KKT の形で現れます。

---

## 13. 定義を具体例で検算する

<!-- definition-example-start: def-opt4-conjugate, def-opt4-biconjugate -->
### 13.1 二次関数で共役と二重共役を確認

**定義の確認**

$f(x)=x^2/2$ とします。定義から

$$
f^*(y)
=
\sup_x\left(yx-\frac{x^2}{2}\right)
=
\frac{y^2}{2}.
$$

さらに二重共役の定義へ代入すると

$$
f^{**}(x)
=
\sup_y\left(xy-\frac{y^2}{2}\right)
=
\frac{x^2}{2}
=f(x).
$$

これで凸共役と二重共役の定義を同じ例で直接確認できます。
<!-- definition-example-end -->

<!-- definition-example-start: def-opt4-support-function -->
### 13.2 区間の支持関数

**定義の確認**

$C=[-1,1]$ とすると

$$
\sigma_C(y)
=
\sup_{|x|\le1}yx
=
|y|.
$$

$y\ge0$ なら $x=1$、$y<0$ なら $x=-1$ で上限を達成するので、定義どおり方向ごとの最大線形値を記録しています。
<!-- definition-example-end -->

<!-- definition-example-start: def-opt4-fenchel-dual -->
### 13.3 等式制約を Fenchel 双対へ入れる

**定義の確認**

$$
f(x)=\frac{x^2}{2},
\qquad
g(z)=\delta_{\{0\}}(z),
\qquad A=1
$$

とします。主問題は

$$
\inf_x\left\{\frac{x^2}{2}+\delta_{\{0\}}(x)\right\},
$$

すなわち $x=0$ の下で $x^2/2$ を最小化する問題で、最適値は0です。

共役は

$$
f^*(u)=\frac{u^2}{2},
\qquad
g^*(y)=0
$$

なので、Fenchel 双対の定義から

$$
\sup_y
\left\{-f^*(-y)-g^*(y)\right\}
=
\sup_y\left(-\frac{y^2}{2}\right)
=0.
$$

この例では主問題と双対問題の値がともに0となり、定義した双対式が具体的に確認できます。
<!-- definition-example-end -->

---

## 14. 演習

### OPT4-A01 二次関数の共役

- Level: A
- 目安時間: 10分

$f(x)=\frac a2x^2$（$a>0$）の共役 $f^*$ を定義から求めよ。さらに、得られた $f^*$ が凸かつ下半連続であることを式から確認せよ。

<!-- solution-start -->
#### 詳細解答

定義から

$$
f^*(y)=\sup_{x\in\mathbb R}\left(yx-\frac a2x^2\right).
$$

括弧内は $x$ の狭義凹二次関数で、微分すると $y-ax=0$。したがって唯一の最大化点は $x=y/a$ である。代入して

$$
f^*(y)=\frac{y^2}{a}-\frac a2\frac{y^2}{a^2}=\boxed{\frac{y^2}{2a}}.
$$

$a>0$ なので

$$
\frac{d^2}{dy^2}f^*(y)=\frac1a>0,
$$

従って $f^*$ は凸です。また $f^*$ は二次関数として連続なので下半連続です。これは[共役関数の凸性・下半連続性](#thm-opt4-conjugate-closed-convex)の具体例になっています。
<!-- solution-end -->

### OPT4-A02 絶対値の共役

- Level: A
- 目安時間: 10分

$f(x)=|x|$ の共役を求めよ。

<!-- solution-start -->
#### 詳細解答

$|y|\le1$ なら $yx\le |y||x|\le|x|$ なので $yx-|x|\le0$。$x=0$ で0を達成するから $f^*(y)=0$ である。

$|y|>1$ なら $x=t\operatorname{sgn}(y)$（$t>0$）と置くと

$$
yx-|x|=t(|y|-1)\to\infty.
$$

したがって

$$
\boxed{f^*(y)=\delta_{[-1,1]}(y)}.
$$
<!-- solution-end -->

### OPT4-A03 標示関数と支持関数

- Level: A
- 目安時間: 10分

空でない集合 $C\subset\mathbb R^n$ の標示関数 $\delta_C$ について、$\delta_C^*=\sigma_C$ を示せ。

<!-- solution-start -->
#### 詳細解答

定義をそのまま展開すると

$$
\delta_C^*(y)=\sup_{x\in\mathbb R^n}\{y^{\mathsf T}x-\delta_C(x)\}.
$$

$x\notin C$ では $\delta_C(x)=+\infty$ なので値は $-\infty$ となり、上限には寄与しない。よって

$$
\delta_C^*(y)=\sup_{x\in C}y^{\mathsf T}x=\boxed{\sigma_C(y)}.
$$
<!-- solution-end -->

### OPT4-A04 Fenchel--Young の等号条件

- Level: A
- 目安時間: 12分

$f(x)=x^2/2$ について Fenchel--Young の不等式のギャップを計算し、等号条件を $y\in\partial f(x)$ と照合せよ。

<!-- solution-start -->
#### 詳細解答

$f^*(y)=y^2/2$ なので

$$
f(x)+f^*(y)-xy=\frac12(x-y)^2\ge0.
$$

等号は $x=y$ のときに限る。一方 $f$ は微分可能で $\partial f(x)=\{f'(x)\}=\{x\}$ だから、$x=y$ はちょうど $y\in\partial f(x)$ と同値である。
<!-- solution-end -->

## 15. 演習 Level B

### OPT4-B01 双対ノルムを支持関数として求める

- Level: B
- 目安時間: 15分

$C=\{x:\|x\|_p\le1\}$、$1/p+1/q=1$ とする。[Hölder の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01)を用いて $\sigma_C(y)=\|y\|_q$ を示せ。

<!-- solution-start -->
#### 詳細解答

[Hölder の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01)より

$$
y^{\mathsf T}x\le |y^{\mathsf T}x|\le\|y\|_q\|x\|_p\le\|y\|_q,
$$

したがって $\sigma_C(y)\le\|y\|_q$。$1<p<\infty$ では $y\ne0$ に対して

$$
x_i=\frac{\operatorname{sgn}(y_i)|y_i|^{q-1}}{\|y\|_q^{q-1}}
$$

と置けば $\|x\|_p=1$ かつ $y^{\mathsf T}x=\|y\|_q$。$y=0$ は自明です。端点も確認します。

- $p=1$, $q=\infty$ のとき、$|y_j|=\|y\|_\infty$ を満たす添字 $j$ を取り、$x=\operatorname{sgn}(y_j)e_j$ とすれば $\|x\|_1=1$ かつ $y^{\mathsf T}x=\|y\|_\infty$。
- $p=\infty$, $q=1$ のとき、$x_i=\operatorname{sgn}(y_i)$（$y_i=0$ では $x_i=0$ としてよい）とすれば $\|x\|_\infty\le1$ かつ
$$
  y^{\mathsf T}x=\sum_i|y_i|=\|y\|_1.
$$

従って全ての $1\le p\le\infty$ について $\boxed{\sigma_C(y)=\|y\|_q}$ です。
<!-- solution-end -->

### OPT4-B02 劣微分の逆関係

- Level: B
- 目安時間: 18分

閉真凸関数 $f$ について、[Fenchel--Young の等号条件](#thm-opt4-fenchel-equality-subgradient)を使い

$$
y\in\partial f(x)\iff x\in\partial f^*(y)
$$

を導け。

<!-- solution-start -->
#### 詳細解答

[Fenchel--Young の等号条件](#thm-opt4-fenchel-equality-subgradient)から

$$
y\in\partial f(x)\iff f(x)+f^*(y)=x^{\mathsf T}y.
$$

閉真凸性より [Fenchel–Moreau の定理](#thm-opt4-fenchel-moreau)が使え、$f^{**}=f$ です。さらに本文で確認したように、閉真凸関数の共役 $f^*$ は真凸関数です。したがって右辺は

$$
f^*(y)+f^{**}(x)=y^{\mathsf T}x
$$

と書けます。今度は関数 $f^*$ に [Fenchel--Young の等号条件](#thm-opt4-fenchel-equality-subgradient)を適用すると、これは $x\in\partial f^*(y)$ と同値です。よって主張を得ます。
<!-- solution-end -->

### OPT4-B03 Fenchel 双対の弱双対性

- Level: B
- 目安時間: 20分

$f:\mathbb R^n\to(-\infty,+\infty]$、$g:\mathbb R^m\to(-\infty,+\infty]$ を閉真凸関数、$A\in\mathbb R^{m\times n}$ とする。主問題

$$
\inf_x\{f(x)+g(Ax)\}
$$

と双対問題

$$
\sup_y\{-f^*(-A^{\mathsf T}y)-g^*(y)\}
$$

について、任意の $x,y$ に対して双対目的値が主目的値以下であることを示せ。

<!-- solution-start -->
#### 詳細解答

[Fenchel–Young の不等式](#thm-opt4-fenchel-young)を $f$ に対して $(x,-A^{\mathsf T}y)$、$g$ に対して $(Ax,y)$ へ適用する。

$$
f(x)+f^*(-A^{\mathsf T}y)\ge -y^{\mathsf T}Ax,
$$

$$
g(Ax)+g^*(y)\ge y^{\mathsf T}Ax.
$$

加えると内積項が消え、

$$
f(x)+g(Ax)\ge -f^*(-A^{\mathsf T}y)-g^*(y).
$$

左辺について $x$ の下限、右辺について $y$ の上限を取れば

$$
\sup_y\{-f^*(-A^{\mathsf T}y)-g^*(y)\}\le\inf_x\{f(x)+g(Ax)\}.
$$

これが弱双対性である。
<!-- solution-end -->

## 16. 演習 Level C

### OPT4-C01 $\ell_1$ 正則化問題の Fenchel 双対

- Level: C
- 目安時間: 30分

$A\in\mathbb R^{m\times n}$、$b\in\mathbb R^m$、$\lambda>0$ とし

$$
\inf_x\left\{\frac12\|Ax-b\|_2^2+\lambda\|x\|_1\right\}
$$

を考える。$z=Ax$ と分離して Fenchel 双対を導き、双対実行可能条件を明示せよ。

<!-- solution-start -->
#### 詳細解答

$f(x)=\lambda\|x\|_1$、$g(z)=\frac12\|z-b\|_2^2$ と置きます。

まず $f^*$ を定義から計算します。

$$
\begin{aligned}
f^*(u)
&=
\sup_x\{u^{\mathsf T}x-\lambda\|x\|_1\}\\
&=
\sup_x
\sum_{i=1}^n
\{u_i x_i-\lambda|x_i|\}.
\end{aligned}
$$

$\|u\|_\infty\le\lambda$ なら各 $i$ について

$$
u_i x_i-\lambda|x_i|
\le
(|u_i|-\lambda)|x_i|
\le0,
$$

かつ $x=0$ で0を達成するので $f^*(u)=0$ です。

一方 $\|u\|_\infty>\lambda$ なら、ある $j$ で $|u_j|>\lambda$ です。$x=t\operatorname{sgn}(u_j)e_j$ と置くと

$$
u^{\mathsf T}x-\lambda\|x\|_1
=
t(|u_j|-\lambda)
\to+\infty
\qquad(t\to\infty).
$$

従って

$$
f^*(u)
=
\delta_{\{u:\|u\|_\infty\le\lambda\}}(u).
$$

次に $w=z-b$ と置けば

$$
\begin{aligned}
g^*(y)
&=\sup_z\left\{y^{\mathsf T}z-\frac12\|z-b\|_2^2\right\}\\
&=b^{\mathsf T}y+\sup_w\left\{y^{\mathsf T}w-\frac12\|w\|_2^2\right\}\\
&=b^{\mathsf T}y+\frac12\|y\|_2^2.
\end{aligned}
$$

Fenchel 双対は

$$
\sup_y\{-f^*(-A^{\mathsf T}y)-g^*(y)\}.
$$

$f^*(-A^{\mathsf T}y)$ が有限である条件は

$$
\|A^{\mathsf T}y\|_\infty\le\lambda.
$$

したがって双対問題は

$$
\boxed{
\sup_{\|A^{\mathsf T}y\|_\infty\le\lambda}
\left(-b^{\mathsf T}y-\frac12\|y\|_2^2\right)
}.
$$

ここで制約は「共役を計算した結果」として現れており、$\ell_1$ 正則化と $\ell_\infty$ 制約の双対関係が見えます。また $\operatorname{dom}f=\mathbb R^n$、$\operatorname{dom}g=\mathbb R^m$ なので、本章で説明した相対内部条件は自動的に満たされます。
<!-- solution-end -->

## 17. 次に進む

次は **OPT5「Lagrange 双対・Slater 条件・KKT」** です。Fenchel 双対で見た「共役によって変数を消去する」視点を、有限個の不等式・等式制約に対する Lagrangian と乗数へ翻訳します。
