# F0-02C4 関数解析IV：凸解析・劣勾配・normal cone・双対錐

この講義では、制約付き最適化を幾何の言葉へ翻訳します。

有限次元のKKTでは

$$
\nabla f(x^*)
+\sum_i\lambda_i\nabla g_i(x^*)
=0
$$

という式を見ました。

これを関数解析・凸解析の言葉で見ると、もっと短く

$$
\boxed{
-Df(x^*)\in N_C(x^*)
}
$$

と書けます。

意味は

> 最適点では、目的関数が下がりたがる方向と、制約集合が押し返す法線方向が釣り合う。

というものです。

---

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

$x^*\in X^*$ が $x$ における **劣勾配** であるとは

$$
\boxed{
f(y)
\ge f(x)+x^*(y-x)
\qquad(\forall y\in X)
}
$$

となることです。

劣勾配全体を

$$
\boxed{\partial f(x)}
$$

と書き、**劣微分** といいます。

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

制約

$$
x\in C
$$

を関数へ埋め込むため、**indicator関数**

$$
\delta_C(x)
=
\begin{cases}
0,&x\in C,\\
+\infty,&x\notin C
\end{cases}
$$

を導入します。

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

$C$ を凸集合、$x\in C$ とします。

$$
\boxed{
N_C(x)
=
\{x^*\in X^*:x^*(y-x)\le0
\ \forall y\in C\}
}
$$

を $C$ の $x$ における **normal cone** といいます。

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

## 15. tangent cone

集合 $C$ と $x\in C$ に対し、「実際に集合内から近づける一次方向」を集めたものが tangent cone です。

一つの標準的定義としてBouligand tangent coneを

$$
T_C(x)
=\left\{
h:\exists t_n\downarrow0,\ \exists x_n\in C,
\ \frac{x_n-x}{t_n}\to h
\right\}
$$

と定めます。

凸集合なら、直感的には

$$
y-x
\qquad(y\in C)
$$

の非負倍を集めて閉じた錐と一致します。

---

## 16. polar cone

錐 $K\subset X$ に対して

$$
\boxed{
K^\circ
=\{x^*\in X^*:x^*(k)\le0
\ \forall k\in K\}
}
$$

を **polar cone** といいます。

normal coneの定義と比べると、凸集合について

$$
\boxed{
N_C(x)=T_C(x)^\circ
}
$$

という関係が得られます。

つまりnormal coneは「実行可能な接方向すべてに非正に作用する汎関数」の集合です。

---

## 17. dual cone

一方、錐 $K\subset Y$ に対して

$$
\boxed{
K^*
=\{\lambda\in Y^*:\lambda(k)\ge0
\ \forall k\in K\}
}
$$

を **dual cone** といいます。

本教材では polar cone を $\le0$、dual cone を $\ge0$ で定義しているため

$$
\boxed{K^\circ=-K^*}.
$$

文献によって符号規約が異なるので、名前だけでなく不等号を確認することが重要です。

---

## 18. 非負直交錐は自己双対

有限次元で

$$
K=\mathbb R_+^m
$$

とします。

$\lambda\in K^*$ である条件は

$$
\lambda^{\mathsf T}k\ge0
\qquad(\forall k\ge0).
$$

各標準基底 $e_i\ge0$ を入れると

$$
\lambda_i\ge0.
$$

逆に $\lambda\ge0$ なら $k\ge0$ に対して内積は非負です。

したがって

$$
\boxed{(\mathbb R_+^m)^*=\mathbb R_+^m}.
$$

有限次元KKTの

$$
\lambda_i\ge0
$$

は、一般には

$$
\boxed{\lambda\in K^*}
$$

という双対錐条件です。

---

## 19. KKTへの橋

ここまでで

$$
\boxed{
\text{実行可能方向 }T_C(x)
\xrightarrow{\text{polar}}
\text{法線 }N_C(x)
}
$$

と

$$
\boxed{
\lambda_i\ge0
\xrightarrow{\text{一般化}}
\lambda\in K^*
}
$$

を用意しました。

次の [F0-02C5 一般化KKT・制約写像・制約想定](../F0_02C5_一般化KKT_制約写像_制約想定/index.md) では、制約を

$$
G(x)\in-K
$$

という一つの写像で書き、

$$
Df(x^*)+DG(x^*)^*\lambda=0
$$

を導入します。

そこで初めて「なぜ制約想定が必要なのか」を、一次近似が壊れる反例から確認します。

---

## 章末チェック

- 凸関数の一次支持不等式を導ける。
- $|x|$ の劣微分を求められる。
- normal coneを定義し、区間や半空間で計算できる。
- $\partial\delta_C=N_C$ を説明できる。
- 制約付き最適化を $0\in\partial f+N_C$ と書ける。
- tangent coneとnormal coneのpolar関係を説明できる。
- dual coneとpolar coneの符号の違いを説明できる。
