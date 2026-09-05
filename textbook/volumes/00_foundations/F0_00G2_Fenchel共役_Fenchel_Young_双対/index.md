# F0-00G2 Fenchel共役・Fenchel–Young・双対

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

です。劣勾配・支持超平面・双対変数が同じ構造の別の見え方になります。

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

<a id="def-f0-00g2-conjugate"></a>

<!-- formal-statement-start -->
> **定義（Fenchel–Legendre 共役）**  
> $f:\mathbb R^n\to(-\infty,+\infty]$ に対し、

$$
\boxed{
f^*(y)=\sup_{x\in\mathbb R^n}
\{\langle y,x\rangle-f(x)\}
}
$$

> を $f$ の **凸共役** といいます。
<!-- formal-statement-end -->

固定した $y$ に対して

$$
\langle y,x\rangle-c\le f(x)
$$

を全ての $x$ で満たすような最大の切片 $c$ を探している、と読むことができます。

実際、共役の定義から

$$
\langle y,x\rangle-f^*(y)\le f(x)
\qquad(\forall x)
$$

です。つまり $f^*(y)$ は「傾き $y$ の affine minorant をどこまで上へ押し上げられるか」を記録しています。

---

## 2. 例：二次関数の共役

$$
f(x)=\frac12\|x\|^2
$$

とします。

$$
\begin{aligned}
f^*(y)
&=\sup_x\left\{y^{\mathsf T}x-\frac12\|x\|^2\right\}\\
&=\sup_x\left\{-\frac12\|x-y\|^2+\frac12\|y\|^2\right\}\\
&=\frac12\|y\|^2.
\end{aligned}
$$

したがって

$$
\boxed{
\left(\frac12\|\cdot\|^2\right)^*(y)
=\frac12\|y\|^2
}.
$$

二次関数は共役を取っても同じ形です。

---

## 3. 例：絶対値と区間 indicator

$f(x)=|x|$ とします。

$$
f^*(y)=\sup_x\{yx-|x|\}.
$$

$|y|\le1$ なら

$$
yx-|x|\le0
$$

で、$x=0$ により上限0を達成します。

一方 $|y|>1$ なら、$x$ の符号を $y$ に合わせて $|x|\to\infty$ とすると

$$
yx-|x|\to+\infty.
$$

したがって

$$
\boxed{
|\cdot|^*(y)=\delta_{[-1,1]}(y)
}.
$$

逆に

$$
\delta_{[-1,1]}^*(x)
=
\sup_{|y|\le1}xy
=|x|.
$$

これは「ノルムと双対単位球」の最小例です。

---

## 4. support function

<a id="def-f0-00g2-support-function"></a>

<!-- formal-statement-start -->
> **定義（support function）**  
> 集合 $C\subset\mathbb R^n$ に対して

$$
\sigma_C(y)=\sup_{x\in C}\langle y,x\rangle
$$

> を $C$ の **support function** といいます。
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

なら Cauchy–Schwarz より

$$
\sigma_C(y)
=\sup_{\|x\|_2\le1}y^{\mathsf T}x
=\|y\|_2.
$$

---

## 5. Fenchel–Young 不等式

共役の定義から任意の $x,y$ について

$$
f^*(y)
\ge\langle y,x\rangle-f(x).
$$

従って次を得ます。

<a id="thm-f0-00g2-fenchel-young"></a>

<!-- formal-statement-start -->
> **定理（Fenchel–Young 不等式）**  
> 任意の $x,y$ に対して

$$
\boxed{
f(x)+f^*(y)\ge\langle x,y\rangle
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

### 5.1 二次関数では Young の不等式になる

$f(x)=x^2/2$ を使えば

$$
\frac{x^2}{2}+\frac{y^2}{2}\ge xy,
$$

すなわち

$$
2xy\le x^2+y^2
$$

です。

---

## 6. 等号条件 = 劣勾配

<a id="thm-f0-00g2-fenchel-equality-subgradient"></a>

<!-- formal-statement-start -->
> **定理（Fenchel–Young の等号条件）**  
> proper convex function $f$ と $x\in\operatorname{dom}f$ に対して

$$
\boxed{
y\in\partial f(x)
\iff
f(x)+f^*(y)=\langle x,y\rangle
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$y\in\partial f(x)$ なら

$$
f(z)\ge f(x)+\langle y,z-x\rangle
\qquad(\forall z).
$$

整理すると

$$
\langle y,z\rangle-f(z)
\le
\langle y,x\rangle-f(x).
$$

したがって共役を定義する上限は $z=x$ で達成され、

$$
f^*(y)=\langle y,x\rangle-f(x).
$$

逆にこの等号が成立すると、共役の定義から任意の $z$ について

$$
\langle y,z\rangle-f(z)
\le f^*(y)
=\langle y,x\rangle-f(x).
$$

整理すると

$$
f(z)\ge f(x)+\langle y,z-x\rangle,
$$

すなわち $y\in\partial f(x)$ です。$\square$
<!-- proof-end -->

> **意味**  
> **劣勾配であること**と、**主変数 $x$ と双対変数 $y$ の Fenchel–Young gap が0になること**は同じです。

---

## 7. 二重共役と Fenchel–Moreau

<a id="def-f0-00g2-biconjugate"></a>

<!-- formal-statement-start -->
> **定義（二重共役）**  
> $f$ の共役 $f^*$ にもう一度共役を取り、

$$
f^{**}(x)
=\sup_y\{\langle x,y\rangle-f^*(y)\}
$$

> と定めたものを $f$ の **二重共役** といいます。
<!-- formal-statement-end -->

Fenchel–Young から常に

$$
\langle x,y\rangle-f^*(y)\le f(x)
$$

なので

$$
\boxed{f^{**}(x)\le f(x)}.
$$

ではいつ等号になるでしょうか。

<a id="thm-f0-00g2-fenchel-moreau"></a>

<!-- formal-statement-start -->
> **定理（有限次元 Fenchel–Moreau）**  
> $f:\mathbb R^n\to(-\infty,+\infty]$ が proper closed convex function なら

$$
\boxed{f^{**}=f}
$$

> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明の幾何

すでに $f^{**}\le f$ は示しました。逆向きを示します。

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
=\sup_y\{\langle x_0,y\rangle-f^*(y)\}
>r.
$$

$r<f(x_0)$ は任意なので $r\uparrow f(x_0)$ とすれば

$$
f^{**}(x_0)\ge f(x_0).
$$

逆向きと合わせて $f^{**}(x_0)=f(x_0)$ です。$x_0$ は任意なので $f^{**}=f$。$\square$
<!-- proof-end -->

つまり closed convex function は

> 自分を下から支える affine 関数を全部集めれば完全に復元できる。

ということです。

---

## 8. 劣微分の逆関係

<a id="thm-f0-00g2-subgradient-inverse"></a>

<!-- formal-statement-start -->
> **定理（劣微分の逆関係）**  
> $f$ を proper closed convex function とします。このとき

$$
\boxed{
y\in\partial f(x)
\iff
x\in\partial f^*(y)
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Fenchel–Young の等号条件から

$$
y\in\partial f(x)
\iff
f(x)+f^*(y)=\langle x,y\rangle.
$$

Fenchel–Moreau により $f^{**}=f$ なので、同じ等式を $f^*$ に対する Fenchel–Young の等号条件として読めば

$$
f^*(y)+f^{**}(x)=\langle y,x\rangle
\iff
x\in\partial f^*(y).
$$

従って両者は同値です。$\square$
<!-- proof-end -->

滑らかで十分な狭義凸性がある場合には

$$
y=\nabla f(x)
$$

を逆に解いて

$$
x=\nabla f^*(y)
$$

という関係になります。

---

## 9. Fenchel 双対

主問題

$$
\boxed{
\inf_x\{f(x)+g(Ax)\}
}
$$

を考えます。

共役の定義から

$$
g(Ax)
=\sup_y\{\langle y,Ax\rangle-g^*(y)\}.
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
=-f^*(-A^{\mathsf T}y).
$$

従って対応する Fenchel 双対問題は

$$
\boxed{
\sup_y
\{-f^*(-A^{\mathsf T}y)-g^*(y)\}
}
$$

です。

### 9.1 弱双対性

<a id="thm-f0-00g2-fenchel-weak-duality"></a>

<!-- formal-statement-start -->
> **定理（Fenchel 双対の弱双対性）**  
> 任意の主変数 $x$ と双対変数 $y$ に対して

$$
f(x)+g(Ax)
\ge
-f^*(-A^{\mathsf T}y)-g^*(y)
$$

> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Fenchel–Young を $f$ に適用すると

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

---

## 10. 強双対性には条件がいる

$\inf\sup$ と $\sup\inf$ は一般には等しくありません。

有限次元凸解析では、例えば

$$
\exists x_0\in\operatorname{ri}(\operatorname{dom}f)
\quad\text{s.t.}\quad
Ax_0\in\operatorname{ri}(\operatorname{dom}g)
$$

のような relative-interior 条件は、Fenchel 双対の強双対性を保証する代表的な十分条件です。

制約付き最適化で現れる Slater 条件も、同じ「退化せず分離できる内部点がある」という系統の条件です。

ここで初めて

> なぜ双対問題には constraint qualification が必要なのか

が、単なる暗記ではなく見えてきます。

---

## 11. KKTとの接続

主問題

$$
\min_x f(x)+g(Ax)
$$

と双対問題で最適な $x^*,y^*$ があり、双対ギャップが0なら、弱双対性の導出で使った二つの Fenchel–Young 不等式が両方とも等号になります。

従って

$$
-A^{\mathsf T}y^*\in\partial f(x^*),
$$

$$
y^*\in\partial g(Ax^*).
$$

すなわち

$$
\boxed{
0\in\partial f(x^*)+A^{\mathsf T}y^*
}
$$

という stationarity が出ます。

制約集合 $C$ に対して $g=\delta_C$ と置けば

$$
\partial g=N_C
$$

なので、normal cone を使った制約付き最適性条件になります。

さらに $C=\mathbb R_-^m$ のような錐を使えば、dual cone と complementarity が KKT の形で現れます。

```text
Fenchel--Young 等号条件
  ↓
劣勾配条件
  ↓ indicator
normal cone
  ↓ cone constraint
KKT
```

---

## 12. 演習 Level A

### F0-00G2-A01 二次関数の共役

- Level: A
- 目安時間: 10分

$$
f(x)=\frac a2x^2,
\qquad a>0
$$

の共役 $f^*$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$$
f^*(y)=\sup_x\left(yx-\frac a2x^2\right).
$$

$x$ で微分すると $y-ax=0$ より $x=y/a$。代入して

$$
f^*(y)=\frac{y^2}{2a}.
$$
#### 本番答案
最大化点 $x=y/a$ より $\boxed{f^*(y)=y^2/(2a)}$。
#### 採点基準（20点）
- 共役の定義: 5点
- 最大化点: 7点
- 代入: 5点
- 結論: 3点
<!-- solution-end -->

### F0-00G2-A02 Fenchel–Young の等号

- Level: A
- 目安時間: 10分

$f(x)=x^2/2$ について、Fenchel–Young の等号が成立する $(x,y)$ の条件を求めよ。

<!-- solution-start -->
#### 詳細解答
$f^*(y)=y^2/2$ なので

$$
\frac{x^2}{2}+\frac{y^2}{2}-xy
=\frac12(x-y)^2.
$$

従って等号は $x=y$ のとき。これは $y=f'(x)=x$、すなわち $y\in\partial f(x)$ と一致する。
#### 本番答案
Fenchel gap は $(x-y)^2/2$。従って $\boxed{x=y}$。
#### 採点基準（20点）
- 共役: 4点
- gap計算: 8点
- 等号条件: 4点
- 劣勾配との対応: 4点
<!-- solution-end -->

---

## 13. 演習 Level B

### F0-00G2-B01 絶対値の共役

- Level: B
- 目安時間: 15分

$f(x)=|x|$ について

$$
f^*(y)=\delta_{[-1,1]}(y)
$$

を定義から示せ。

<!-- solution-start -->
#### 詳細解答
$|y|\le1$ なら $yx\le|x|$ なので上限は0で $x=0$ が達成。$|y|>1$ なら $y$ と同符号に $x\to\infty$ とすると $yx-|x|\to\infty$。従って主張を得る。
#### 本番答案
$|y|\le1$ では $yx-|x|\le0$、$x=0$ で0。$|y|>1$ では適切な向きへ $|x|\to\infty$ として発散。
#### 採点基準（20点）
- $|y|\le1$: 8点
- $|y|>1$: 8点
- 結論: 4点
<!-- solution-end -->

### F0-00G2-B02 support function と dual norm

- Level: B
- 目安時間: 15分

$$
C=\{x\in\mathbb R^n:\|x\|_p\le1\}
$$

とし、$1/p+1/q=1$ とする。Hölder不等式を使って

$$
\sigma_C(y)=\|y\|_q
$$

を示せ。

<!-- solution-start -->
#### 詳細解答
Hölder から $y^Tx\le\|y\|_q\|x\|_p\le\|y\|_q$ なので上限は高々 $\|y\|_q$。$1<p<\infty$ なら

$$
x_i=
\frac{\operatorname{sgn}(y_i)|y_i|^{q-1}}
{\|y\|_q^{q-1}}
$$

を取ると $\|x\|_p=1$ で等号。端点 $p=1,\infty$ も最大成分・符号ベクトルを選べば等号を達成する。
#### 本番答案
Hölder で上界 $\|y\|_q$。Hölder の等号条件を満たす $x$ を取れば達成するので $\boxed{\sigma_C(y)=\|y\|_q}$。
#### 採点基準（20点）
- Hölder上界: 8点
- 達成点: 8点
- 結論: 4点
<!-- solution-end -->

---

## 14. 次に進む

次は [F0-02 制約付き最適化・双対問題・KKT条件](../F0_02_制約付き最適化_双対_KKT/index.md) です。

ここまでの凸解析では

- epigraph と分離
- 劣微分
- normal / polar / dual cone
- Fenchel 共役と双対

を準備しました。F0-02 以降では、これらを有限個の不等式・等式制約へ落とし込み、Lagrangian・Farkas・KKT・constraint qualification として回収します。
