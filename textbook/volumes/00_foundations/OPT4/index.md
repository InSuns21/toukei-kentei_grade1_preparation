# OPT4 Fenchel 共役・凸双対

<!-- definition-example-audit: strict -->

この章は DREAM THEATER の凸解析・最適化系列で **Fenchel 共役から双対問題を組み立てる canonical owner** です。旧 F0-00G2 の資産を移行し、OPT3 で整えた閉真凸関数・劣微分・法錐を、共役・Fenchel--Young の等号条件・二重共役・Fenchel 双対へ接続します。旧ページは stable anchor と過去 URL のため残しますが、読者向け一覧からは外します。

> **この章の停止線**
>
> Lagrangian、Slater 条件、KKT の体系的導出は次章 OPT5 の担当です。本章では Fenchel 双対の構成と弱双対性、強双対性へ進むための relative interior 条件の意味までを扱います。


<!-- definition-example-audit: strict -->

ここまでで

- 凸関数を epigraph という凸集合として見る
- 支持超平面の傾きを劣勾配として読む
- normal cone・polar cone・dual cone で制約の幾何を読む

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
Fenchel双対
  ↓
Lagrange双対・KKT
```

---

## 1. 凸共役

<a id="def-opt4-conjugate"></a>

<!-- formal-statement-start -->
> **定義（Fenchel–Legendre 共役）**  
> 関数 $f:\mathbb R^n\to(-\infty,+\infty]$ に対し、線形関数との差の上限として定まる次の関数を $f$ の **凸共役** といいます。

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

です。従って $f^*(y)$ は、傾き $y$ の affine minorant をどこまで上へ押し上げられるかを記録しています。

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

## 3. 例：絶対値と区間 indicator

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

## 4. support function

<a id="def-opt4-support-function"></a>

<!-- formal-statement-start -->
> **定義（support function）**  
> 集合 $C\subset\mathbb R^n$ に対して、方向 $y$ に沿う線形汎関数の上限を $C$ の **support function** といいます。

$$
\sigma_C(y)
=
\sup_{x\in C}\langle y,x\rangle.
$$
<!-- formal-statement-end -->

indicator 関数との関係は

$$
\boxed{\delta_C^*=\sigma_C}
$$

です。集合の幾何を表す関数が、共役を通すと自然に現れます。

### 4.1 例：Euclid 単位球

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
> 任意の $x,y$ に対して、元の関数と共役関数の和は内積以上です。

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
> proper convex function $f$ と $x\in\operatorname{dom}f$ に対して、Fenchel–Young 不等式で等号が成立することと、$y$ が $x$ における劣勾配であることは同値です。

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

**劣勾配であること**と、**Fenchel–Young gap が0になること**は同じです。

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
> $f:\mathbb R^n\to(-\infty,+\infty]$ が proper closed convex function なら、二重共役は元の関数に一致します。

$$
\boxed{f^{**}=f}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

すでに $f^{**}\le f$ は示しました。逆向きを epigraph の分離から示します。

$x_0\in\operatorname{dom}f$ と $r<f(x_0)$ を取ります。点 $(x_0,r)$ は閉凸集合 $\operatorname{epi}f$ の外側にあります。分離定理により、この点と epigraph を分離する非零線形汎関数が存在します。

分離不等式を epigraph の鉛直方向に対して調べると、高さ方向の係数は負に取れます。正規化すると、ある $y$ が存在して

$$
r
<
\langle x_0,y\rangle-f^*(y)
\le
f(x_0)
$$

となります。従って

$$
f^{**}(x_0)
=
\sup_y\{\langle x_0,y\rangle-f^*(y)\}
>r.
$$

$r<f(x_0)$ は任意なので $r\uparrow f(x_0)$ とすれば

$$
f^{**}(x_0)
\ge
f(x_0).
$$

逆向きと合わせて $f^{**}(x_0)=f(x_0)$。$x_0$ は任意なので $f^{**}=f$ です。$\square$
<!-- proof-end -->

つまり proper closed convex function は、**自分を下から支える affine 関数を全部集めれば完全に復元できる**ということです。

---

## 8. 劣微分の逆関係

<a id="thm-opt4-subgradient-inverse"></a>

<!-- formal-statement-start -->
> **定理（劣微分の逆関係）**  
> $f$ を proper closed convex function とします。このとき、$y$ が $f$ の $x$ における劣勾配であることと、$x$ が $f^*$ の $y$ における劣勾配であることは同値です。

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

[Fenchel–Moreau](#thm-opt4-fenchel-moreau)により $f^{**}=f$ なので、同じ等式を $f^*$ に対する Fenchel–Young の等号条件として読めば

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

主問題

$$
\boxed{
\inf_x\{f(x)+g(Ax)\}
}
$$

を考えます。共役の定義から

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
> 主問題 $\inf_x\{f(x)+g(Ax)\}$ に対して、次の最大化問題を対応する **Fenchel 双対問題** と呼びます。

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
> 任意の主変数 $x$ と双対変数 $y$ に対して、主問題の目的値は双対問題の目的値以上です。

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

$\inf\sup$ と $\sup\inf$ は一般には等しくありません。

有限次元凸解析では、例えば

$$
\exists x_0\in\operatorname{ri}(\operatorname{dom}f)
\quad\text{s.t.}\quad
Ax_0\in\operatorname{ri}(\operatorname{dom}g)
$$

のような relative-interior 条件が、Fenchel 双対の強双対性を保証する代表的な十分条件です。

制約付き最適化で現れる Slater 条件も、同じ「退化せず分離できる内部点がある」という系統の条件です。

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

という stationarity が出ます。

制約集合 $C$ に対して $g=\delta_C$ と置けば

$$
\partial g=N_C
$$

なので normal cone を使った制約付き最適性条件になります。さらに錐制約を使えば dual cone と complementarity が KKT の形で現れます。

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
### 13.2 区間の support function

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

$f(x)=\frac a2x^2$（$a>0$）の共役 $f^*$ を定義から求めよ。

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

### OPT4-A03 indicator 関数と support function

- Level: A
- 目安時間: 10分

空でない集合 $C\subset\mathbb R^n$ の indicator 関数 $\delta_C$ について、$\delta_C^*=\sigma_C$ を示せ。

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

$f(x)=x^2/2$ について Fenchel--Young の不等式の gap を計算し、等号条件を $y\in\partial f(x)$ と照合せよ。

<!-- solution-start -->
#### 詳細解答

$f^*(y)=y^2/2$ なので

$$
f(x)+f^*(y)-xy=\frac12(x-y)^2\ge0.
$$

等号は $x=y$ のときに限る。一方 $f$ は微分可能で $\partial f(x)=\{f'(x)\}=\{x\}$ だから、$x=y$ はちょうど $y\in\partial f(x)$ と同値である。
<!-- solution-end -->

## 15. 演習 Level B

### OPT4-B01 双対ノルムを support function として求める

- Level: B
- 目安時間: 15分

$C=\{x:\|x\|_p\le1\}$、$1/p+1/q=1$ とする。Hölder の不等式を用いて $\sigma_C(y)=\|y\|_q$ を示せ。

<!-- solution-start -->
#### 詳細解答

Hölder の不等式より

$$
y^{\mathsf T}x\le |y^{\mathsf T}x|\le\|y\|_q\|x\|_p\le\|y\|_q,
$$

したがって $\sigma_C(y)\le\|y\|_q$。$1<p<\infty$ では $y\ne0$ に対して

$$
x_i=\frac{\operatorname{sgn}(y_i)|y_i|^{q-1}}{\|y\|_q^{q-1}}
$$

と置けば $\|x\|_p=1$ かつ $y^{\mathsf T}x=\|y\|_q$。$y=0$ は自明であり、$p=1,\infty$ もそれぞれ最大絶対値成分を選ぶベクトル、符号ベクトルで上界を達成する。よって $\boxed{\sigma_C(y)=\|y\|_q}$。
<!-- solution-end -->

### OPT4-B02 劣微分の逆関係

- Level: B
- 目安時間: 18分

閉真凸関数 $f$ について、Fenchel--Young の等号条件を使い

$$
y\in\partial f(x)\iff x\in\partial f^*(y)
$$

を導け。

<!-- solution-start -->
#### 詳細解答

Fenchel--Young の等号条件から

$$
y\in\partial f(x)\iff f(x)+f^*(y)=x^{\mathsf T}y.
$$

閉真凸性より Fenchel--Moreau の定理が使え、$f^{**}=f$。したがって右辺は

$$
f^*(y)+f^{**}(x)=y^{\mathsf T}x
$$

と書ける。今度は関数 $f^*$ に Fenchel--Young の等号条件を適用すると、これは $x\in\partial f^*(y)$ と同値である。よって主張を得る。
<!-- solution-end -->

### OPT4-B03 Fenchel 双対の弱双対性

- Level: B
- 目安時間: 20分

主問題

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

Fenchel--Young の不等式を $f$ に対して $(x,-A^{\mathsf T}y)$、$g$ に対して $(Ax,y)$ へ適用する。

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

$f(x)=\lambda\|x\|_1$、$g(z)=\frac12\|z-b\|_2^2$ と置く。まず

$$
f^*(u)=\delta_{\{u:\|u\|_\infty\le\lambda\}}(u)
$$

である。次に $w=z-b$ と置けば

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

ここで制約は「共役を計算した結果」として現れており、$\ell_1$ 正則化と $\ell_\infty$ 制約の双対関係が見える。さらに $g$ は全空間で有限かつ連続なので、標準的な Fenchel--Rockafellar の正則性条件は満たされる。本章の relative interior 条件の見方では $A(\operatorname{dom}f)$ と $\operatorname{dom}g=\mathbb R^m$ の相対内部が交わるため、適切な有限最適値のもとで強双対性へ進める。
<!-- solution-end -->

## 17. 次に進む

次は **OPT5「Lagrange 双対・Slater 条件・KKT」** です。Fenchel 双対で見た「共役によって変数を消去する」視点を、有限個の不等式・等式制約に対する Lagrangian と乗数へ翻訳します。
