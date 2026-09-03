# F0-02C4 関数解析IV：凸解析・劣勾配・normal cone

凸関数を微分不能点まで拡張し、制約をindicator関数へ埋め込むことで $0\in\partial f+N_C$ という最適性条件まで進みます。tangent/polar/dual coneは次講C4Aへ分離します。

## 1. 凸集合

ベクトル空間 $X$ の集合 $C$ が **凸集合** であるとは、任意の $x,y\in C$ と $0\le t\le1$ に対し

$$
(1-t)x+ty\in C
$$

となることです。

つまり集合内の二点を結ぶ線分が全部集合内に残ります。

この定義は有限次元でも無限次元でも同じです。

---

## 2. 凸関数

凸集合 $C$ 上の関数

$$
f:C\to\mathbb R
$$

が **凸関数** であるとは

$$
\boxed{
f((1-t)x+ty)
\le(1-t)f(x)+tf(y)
}
$$

が成り立つことです。

グラフが二点を結ぶ弦より下側にある、と考えられます。

---

## 3. 微分可能な凸関数の一次条件

$f:X\to\mathbb R$ が凸かつFréchet微分可能なら

$$
\boxed{
f(y)
\ge f(x)+Df(x)[y-x]
}
$$

が成り立ちます。

有限次元なら

$$
f(y)
\ge f(x)+\nabla f(x)^{\mathsf T}(y-x).
$$

つまり接平面が関数のグラフを下から支えます。

### 3.1 なぜ成り立つか

$0<t\le1$ に対し凸性から

$$
f(x+t(y-x))
\le(1-t)f(x)+tf(y).
$$

整理すると

$$
\frac{f(x+t(y-x))-f(x)}{t}
\le f(y)-f(x).
$$

$t\downarrow0$ とすれば左辺は方向 $y-x$ の微分へ収束するので

$$
Df(x)[y-x]
\le f(y)-f(x).
$$

です。

---

## 4. 微分できなくても「支える傾き」は考えられる

代表例は

$$
f(x)=|x|.
$$

$x=0$ では通常の微分は存在しません。

しかし

$$
|y|\ge ay
$$

を全ての $y\in\mathbb R$ で満たす $a$ を考えると

$$
-1\le a\le1
$$

なら成立します。

つまり原点では一つの接線ではなく、たくさんの「下から支える直線」があります。

この傾きを劣勾配として一般化します。

---

## 5. 劣勾配

凸関数 $f:X\to(-\infty,+\infty]$ と点 $x$ を考えます。

<a id="def-f0-02c4-subgradient-subdifferential"></a>

<!-- formal-statement-start -->
> **定義（劣勾配・劣微分）**  
> 凸関数 $f:X\to(-\infty,+\infty]$ に対し、$x^*\in X^*$ が

$$
f(y)\ge f(x)+x^*(y-x)\qquad(\forall y\in X)
$$

> を満たすとき、$x^*$ を $x$ における **劣勾配** といいます。劣勾配全体の集合を **劣微分** といい $\partial f(x)$ と書きます。
<!-- formal-statement-end -->

ここで $\partial f(x)$ は一つのベクトルではなく集合です。

---

## 6. 絶対値の劣微分

$$
f(x)=|x|
$$

について

$$
\partial f(x)
=
\begin{cases}
\{-1\},&x<0,\\
[-1,1],&x=0,\\
\{1\},&x>0.
\end{cases}
$$

です。

微分可能な点では劣微分は一点集合になり

$$
\boxed{\partial f(x)=\{Df(x)\}}
$$

です。

有限次元なら $\{\nabla f(x)\}$ です。

---

## 7. 劣勾配による最小条件

凸関数 $f$ について

$$
\boxed{
0\in\partial f(x^*)
}
$$

なら $x^*$ は大域的最小点です。

実際、劣勾配の定義で $x^*=x$、$x^*=0$ に相当する汎関数を使えば

$$
f(y)\ge f(x^*)
\qquad(\forall y)
$$

です。

逆に、適切な条件の下で凸関数の最小点なら $0\in\partial f(x^*)$ です。

微分可能ならおなじみの

$$
Df(x^*)=0
$$

へ戻ります。

---

## 8. 制約を関数へ埋め込む

集合 $C\subset X$ の上だけで $f$ を最小化したいとします。

<a id="def-f0-02c4-convex-indicator"></a>

<!-- formal-statement-start -->
> **定義（集合のindicator関数）**  
> 集合 $C\subset X$ に対して

$$
\delta_C(x)=\begin{cases}0,&x\in C,\\+\infty,&x\notin C\end{cases}
$$

> と定めた拡張実数値関数を $C$ の **indicator関数** といいます。
<!-- formal-statement-end -->

すると

$$
\min_{x\in C}f(x)
$$

は

$$
\boxed{
\min_{x\in X}
\{f(x)+\delta_C(x)\}
}
$$

と書けます。

なおこれは確率論で $1_A$ と書く0/1の指示関数とは別物です。

---

## 9. normal cone

<a id="def-f0-02c4-normal-cone"></a>

<!-- formal-statement-start -->
> **定義（normal cone）**  
> 凸集合 $C$ と $x\in C$ に対して

$$
N_C(x)=\{x^*\in X^*:x^*(y-x)\le0\ \forall y\in C\}
$$

> を $C$ の $x$ における **normal cone** といいます。
<!-- formal-statement-end -->

$x\notin C$ のときは通常

$$
N_C(x)=\varnothing
$$

とします。

意味は

> $x$ から集合内部へ向かうどの方向 $y-x$ に対しても、非正の内積・作用を持つ外向き法線。

です。

---

## 10. 1次元でnormal coneを見る

$$
C=[0,\infty)
$$

とします。

### 10.1 内点 $x>0$

$x$ から左右へ少し動けるため、$a(y-x)\le0$ を全ての $y\ge0$ で満たす実数 $a$ は

$$
a=0
$$

だけです。

したがって

$$
N_C(x)=\{0\}
\qquad(x>0).
$$

### 10.2 境界点 $x=0$

条件は

$$
ay\le0
\qquad(\forall y\ge0)
$$

なので

$$
a\le0.
$$

したがって

$$
\boxed{N_C(0)=(-\infty,0]}.
$$

制約境界では非零の法線が現れます。

---

## 11. 半空間のnormal cone

Hilbert空間で

$$
C=\{x:\langle a,x\rangle\le b\},
\qquad a\ne0
$$

を考えます。

内点では normal cone は $\{0\}$ です。

境界

$$
\langle a,x\rangle=b
$$

では、外向き法線は $a$ の非負倍なので

$$
\boxed{
N_C(x)=\{\lambda a:\lambda\ge0\}
}
$$

です。

これがKKTで

$$
\lambda\nabla g(x),
\qquad\lambda\ge0
$$

が現れる最も単純な幾何です。

---

## 12. indicator関数の劣微分はnormal cone

$x\in C$ とします。

$x^*\in\partial\delta_C(x)$ である条件は

$$
\delta_C(y)
\ge \delta_C(x)+x^*(y-x)
$$

です。

$x\in C$ なので $\delta_C(x)=0$ です。

$y\notin C$ なら左辺は $+\infty$ なので条件は自動的です。

$y\in C$ では

$$
0\ge x^*(y-x).
$$

したがって

$$
\boxed{
\partial\delta_C(x)=N_C(x)
}.
$$

normal cone は、制約集合のindicator関数の劣勾配だったのです。

---

## 13. 制約付き最適化の一次条件

問題

$$
\min_{x\in C}f(x)
$$

を

$$
\min_x f(x)+\delta_C(x)
$$

と見ます。

凸解析の和の劣微分公式が適用できる条件の下で

$$
\partial(f+\delta_C)(x)
=
\partial f(x)+N_C(x).
$$

したがって最適点 $x^*$ では

$$
\boxed{
0\in\partial f(x^*)+N_C(x^*)
}
$$

となります。

$f$ が微分可能なら

$$
\boxed{
-Df(x^*)\in N_C(x^*)
}.
$$

これが制約付き最適化の幾何学的な一次条件です。

---

## 14. 具体例：$x\ge0$ 上で二次関数を最小化

$$
f(x)=\frac12(x+1)^2,
\qquad C=[0,\infty)
$$

とします。

制約がなければ最小点は $x=-1$ ですが、実行不能です。

制約付き最小点は

$$
x^*=0.
$$

微分は

$$
f'(0)=1.
$$

一方

$$
N_C(0)=(-\infty,0].
$$

したがって

$$
-f'(0)=-1\in N_C(0).
$$

目的関数は左へ進みたがっていますが、制約集合が左方向を禁止し、その反力としてnormal coneが現れると解釈できます。

---

## 演習

### F0-02C4-A01 絶対値の劣微分

- Level: A
- 目安時間: 10分

$f(x)=|x|$ について $\partial f(0)$ を求めよ。

<!-- solution-start -->
#### 詳細解答
劣勾配$a$は $|y|\ge ay$ を全てのyで満たす必要がある。これは $-1\le a\le1$ と同値なので $\partial f(0)=[-1,1]$。
#### 本番答案
劣勾配$a$は $|y|\ge ay$ を全てのyで満たす必要がある。これは $-1\le a\le1$ と同値なので $\partial f(0)=[-1,1]$。
#### 採点基準（20点）
- 定義・設定: 6点
- 推論・計算: 10点
- 結論: 4点
<!-- solution-end -->

### F0-02C4-B01 normal coneで最適性を確認

- Level: B
- 目安時間: 15分

$C=[0,\infty)$、$f(x)=\frac12(x+1)^2$ とする。$x^*=0$ で $-f'(x^*)\in N_C(x^*)$ を確認せよ。

<!-- solution-start -->
#### 詳細解答
$f'(0)=1$、$N_C(0)=(-\infty,0]$ なので $-f'(0)=-1\in N_C(0)$。従って一次最適性条件を満たす。
#### 本番答案
$f'(0)=1$、$N_C(0)=(-\infty,0]$ なので $-f'(0)=-1\in N_C(0)$。従って一次最適性条件を満たす。
#### 採点基準（20点）
- 方針: 5点
- 中心となる導出: 11点
- 結論: 4点
<!-- solution-end -->

---

## 次に進む

**次：[F0-02C4A tangent cone・polar cone・dual cone](../F0_02C4A_tangent_polar_dual_cone/index.md)**
