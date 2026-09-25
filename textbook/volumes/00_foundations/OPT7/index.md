# OPT7 滑らかな凸最適化

<!-- definition-example-audit: strict -->

[OPT1](../OPT1/index.md) では凸性が「局所情報を大域情報へ変える」ことを学び、[NA12](../NA12/index.md) では最急降下方向、厳密直線探索、Newton 法、正定値二次関数と共役勾配法を数値解析の立場から学びました。

本章では、その二つをつなぎます。対象は主に
[
min_{xinmathbb R^n} f(x)
]
という無制約問題です。新しい中心問題は「反復法を書けるか」ではなく、**どの仮定が、どの収束速度を生むか**です。

主線は

[
oxed{

abla f	ext{ が Lipschitz 連続}
	o
	ext{降下補題}
	o
	ext{固定歩幅最急降下法}
	o
O(1/k)
	o
	ext{強凸性}
	o
	ext{線形収束}
}
]

です。最後に、[NA12 の Newton 法](../NA12/index.md#def-na12-newton-optimization)を一般の非線形目的関数へ戻し、Hessian の Lipschitz 連続性から局所二次収束を導きます。

> **NA12 との役割分担**  
> NA12 が担当するのは、降下方向・厳密直線探索・Newton 法の定義、正定値二次目的関数、条件数依存の最急降下法、共役勾配法です。本章ではそれらを再証明せず、一般の滑らかな凸関数に対する収束理論を担当します。

---

## 1. Lipschitz 連続勾配と (L)-滑らかさ

<a id="def-opt7-lipschitz-gradient"></a>
<!-- formal-statement-start -->
> **定義（Lipschitz 連続勾配・(L)-滑らかさ）**  
> 微分可能な関数 (f:mathbb R^n	omathbb R) と定数 (L>0) を考える。任意の (x,yinmathbb R^n) に対して
>
[
|
abla f(x)-
abla f(y)|
le
L|x-y|
]
>
> が成り立つとき、(
abla f) は **(L)-Lipschitz 連続**である、または (f) は **(L)-滑らか**であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt7-lipschitz-gradient -->
**定義の確認**：異方的な二次関数

[
f(x_1,x_2)
=
rac12x_1^2+2x_2^2
]

なら

[

abla f(x_1,x_2)
=
(x_1,4x_2).
]

(d=x-y=(d_1,d_2)) と置くと

[
|
abla f(x)-
abla f(y)|^2
=
d_1^2+16d_2^2
le
16(d_1^2+d_2^2),
]

したがって

[
|
abla f(x)-
abla f(y)|
le
4|x-y|.
]

よって (f) は (L=4) で滑らかです。
<!-- definition-example-end -->

(L) は「勾配がどれだけ急に変わり得るか」を表します。凸性が関数の**形の向き**を制御するのに対し、(L)-滑らかさは曲がり方の**上限**を制御します。

---

## 2. 降下補題：局所の勾配から二次上界を作る

<a id="thm-opt7-descent-lemma"></a>
<!-- formal-statement-start -->
> **定理（降下補題）**  
> (f:mathbb R^n	omathbb R) が微分可能で、(
abla f) が (L)-Lipschitz 連続であるとする。このとき任意の (x,yinmathbb R^n) に対して
>
[
oxed{
f(y)
le
f(x)
+
langle
abla f(x),y-xangle
+
rac L2|y-x|^2
}
]
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

線分 (x+t(y-x)) 上だけを見れば、多変数関数を一変数関数へ落とせます。そこに[微積分学の基本定理](../RA4/index.md)を使い、勾配差を Lipschitz 条件で抑えます。

<!-- proof-start -->
### 証明

(d=y-x) と置き

[
phi(t)=f(x+td)
qquad(0le tle1)
]

と定めます。連鎖律から

[
phi'(t)
=
langle
abla f(x+td),dangle.
]

微積分学の基本定理より

[
egin{aligned}
f(y)-f(x)
&=
int_0^1
langle
abla f(x+td),dangle,dt\
&=
langle
abla f(x),dangle
+
int_0^1
langle
abla f(x+td)-
abla f(x),dangle,dt.
end{aligned}
]

Cauchy--Schwarz の不等式と (L)-Lipschitz 連続性から

[
egin{aligned}
langle
abla f(x+td)-
abla f(x),dangle
&le
|
abla f(x+td)-
abla f(x)|,|d|\
&le
Lt|d|^2.
end{aligned}
]

よって

[
f(y)-f(x)
le
langle
abla f(x),dangle
+
int_0^1 Lt|d|^2,dt
]

なので

[
f(y)
le
f(x)
+
langle
abla f(x),y-xangle
+
rac L2|y-x|^2.
]

(square)
<!-- proof-end -->

> **仮定が働いた場所**  
> 凸性はこの証明では使っていません。(L)-Lipschitz 連続性が、線分上の勾配差を (Lt|d|) で抑える一箇所に使われています。したがって降下補題自体は非凸関数にも使えます。

---

## 3. 固定歩幅最急降下法

[NA12 では最急降下法](../NA12/index.md#def-na12-steepest-descent)を「負の勾配方向へ進み、歩幅を直線探索で選ぶ方法」として定義しました。本章では歩幅を最初から固定します。

<a id="def-opt7-fixed-step-gradient"></a>
<!-- formal-statement-start -->
> **定義（固定歩幅最急降下法）**  
> 微分可能な (f:mathbb R^n	omathbb R)、初期点 (x_0inmathbb R^n)、歩幅 (alpha>0) に対し
>
[
oxed{
x_{k+1}
=
x_k-alpha
abla f(x_k)
}
qquad(k=0,1,2,ldots)
]
>
> と定める反復を **固定歩幅最急降下法**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt7-fixed-step-gradient -->
**定義の確認**：(L=4) の二次関数

[
f(x_1,x_2)=rac12x_1^2+2x_2^2,
qquad

abla f=(x_1,4x_2)
]

に (alpha=1/4) を使うと

[
x_{k+1}
=
left(
rac34x_{k,1},
0
ight).
]

第2成分は1回で最小値方向へ移り、第1成分は毎回 (3/4) 倍になります。
<!-- definition-example-end -->

<a id="thm-opt7-fixed-step-decrease"></a>
<!-- formal-statement-start -->
> **定理（固定歩幅の降下評価）**  
> (f) が (L)-滑らかで、固定歩幅最急降下法を用いるとする。(0<alpha<2/L) なら
>
[
oxed{
f(x_{k+1})
le
f(x_k)
-
alpha
left(
1-rac{Lalpha}{2}
ight)
|
abla f(x_k)|^2
}
]
>
> が成り立つ。特に (alpha=1/L) なら
>
[
oxed{
f(x_{k+1})
le
f(x_k)
-
rac{1}{2L}
|
abla f(x_k)|^2.
}
]
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

降下補題に

[
x=x_k,
qquad
y=x_k-alpha
abla f(x_k)
]

を代入します。(g_k=
abla f(x_k)) と書けば

[
egin{aligned}
f(x_{k+1})
&le
f(x_k)
+
langle g_k,-alpha g_kangle
+
rac L2alpha^2|g_k|^2\
&=
f(x_k)
-
alpha
left(
1-rac{Lalpha}{2}
ight)
|g_k|^2.
end{aligned}
]

(0<alpha<2/L) なら括弧内は正なので、(g_k
e0) なら関数値は厳密に減少します。さらに (alpha=1/L) を代入すれば後半の式を得ます。 (square)
<!-- proof-end -->

### 3.1 歩幅が大きすぎると本当に壊れる

一変数二次関数

[
f(x)=rac L2x^2
]

に対して

[
x_{k+1}
=
(1-alpha L)x_k.
]

したがって

[
|1-alpha L|<1
iff
0<alpha<rac2L
]

が収束条件です。たとえば (alpha>2/L) では絶対値が増え、反復は発散します。

「十分小さい歩幅」という言い方だけではなく、滑らかさ定数 (L) が具体的な安全域を与えていることが分かります。

---

## 4. 凸性を入れると (O(1/k)) が出る

ここから凸性を使います。[OPT1 の微分可能な凸関数の一次支持不等式](../OPT1/index.md#thm-opt1-first-order-convexity)から

[
f(x)-f(x^*)
le
langle
abla f(x),x-x^*angle
]

が得られます。この大域的下界と、降下補題による局所的上界を組み合わせます。

<a id="thm-opt7-gradient-convex-rate"></a>
<!-- formal-statement-start -->
> **定理（滑らかな凸関数に対する (O(1/k)) 収束）**  
> (f:mathbb R^n	omathbb R) を凸かつ (L)-滑らかとし、最小点 (x^*) が存在するとする。固定歩幅
>
[
x_{k+1}
=
x_k-rac1L
abla f(x_k)
]
>
> を用いると、任意の (kge1) に対して
>
[
oxed{
f(x_k)-f(x^*)
le
rac{L|x_0-x^*|^2}{2k}.
}
]
<!-- formal-statement-end -->

### 証明の見取り図

一回の進歩を「関数値の減少」ではなく「最小点までの距離の二乗の減少」で表します。すると右辺が望遠鏡和になります。

<!-- proof-start -->
### 証明

(g_k=
abla f(x_k)) と置きます。反復式から

[
x_{k+1}-x^*
=
x_k-x^*-rac1L g_k.
]

よって

[
egin{aligned}
|x_k-x^*|^2-|x_{k+1}-x^*|^2
&=
rac{2}{L}
langle g_k,x_k-x^*angle
-
rac{1}{L^2}|g_k|^2.
end{aligned}
]

両辺に (L/2) を掛けると

[
rac L2
left(
|x_k-x^*|^2-|x_{k+1}-x^*|^2
ight)
=
langle g_k,x_k-x^*angle
-
rac{1}{2L}|g_k|^2.
]

凸性から

[
f(x_k)-f(x^*)
le
langle g_k,x_k-x^*angle.
]

また固定歩幅の降下評価から

[
f(x_{k+1})
le
f(x_k)-rac{1}{2L}|g_k|^2.
]

二式を合わせると

[
f(x_{k+1})-f(x^*)
le
rac L2
left(
|x_k-x^*|^2-|x_{k+1}-x^*|^2
ight).
]

(j=0,ldots,k-1) について足し合わせれば

[
sum_{j=0}^{k-1}
left(
f(x_{j+1})-f(x^*)
ight)
le
rac L2|x_0-x^*|^2.
]

関数値は単調非増加なので

[
f(x_k)-f(x^*)
le
f(x_{j+1})-f(x^*)
qquad(0le jle k-1).
]

したがって左辺は

[
kleft(f(x_k)-f(x^*)ight)
]

以上です。よって

[
f(x_k)-f(x^*)
le
rac{L|x_0-x^*|^2}{2k}.
]

(square)
<!-- proof-end -->

この評価は「(k) 回反復すれば誤差がだいたい (1/k) 以下」という意味です。まだ指数関数的な減少ではありません。そのために必要なのが次の強凸性です。

---

## 5. 強凸性：曲率の下限を入れる

<a id="def-opt7-strong-convexity"></a>
<!-- formal-statement-start -->
> **定義（強凸性）**  
> 微分可能な関数 (f:mathbb R^n	omathbb R) と定数 (mu>0) を考える。任意の (x,yinmathbb R^n) に対して
>
[
oxed{
f(y)
ge
f(x)
+
langle
abla f(x),y-xangle
+
rac{mu}{2}|y-x|^2
}
]
>
> が成り立つとき、(f) は **(mu)-強凸**であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt7-strong-convexity -->
**定義の確認**：同じ二次関数は (mu=1) で強凸

[
f(x_1,x_2)=rac12x_1^2+2x_2^2
]

について (d=y-x) とすると、二次関数なので直接展開して

[
f(y)
=
f(x)
+
langle
abla f(x),dangle
+
rac12d_1^2+2d_2^2.
]

最後の二次項は

[
rac12d_1^2+2d_2^2
ge
rac12(d_1^2+d_2^2)
=
rac12|d|^2.
]

したがって (mu=1) で強凸です。
<!-- definition-example-end -->

<a id="thm-opt7-strong-convex-unique"></a>
<!-- formal-statement-start -->
> **定理（強凸関数の最小点の一意性）**  
> (f:mathbb R^n	omathbb R) が微分可能かつ (mu)-強凸で、最小点が存在するとする。この最小点は一意である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

(x^*,y^*) がともに最小点だとします。[NA12 の一階必要条件](../NA12/index.md#prop-na12-first-order-necessary)から

[

abla f(x^*)=0.
]

強凸性を (x=x^*), (y=y^*) に適用すると

[
f(y^*)
ge
f(x^*)
+
rac{mu}{2}|y^*-x^*|^2.
]

両点は同じ最小値を持つので

[
0
ge
rac{mu}{2}|y^*-x^*|^2.
]

(mu>0) より (x^*=y^*) です。 (square)
<!-- proof-end -->

### 5.1 上から (L)、下から (mu)

(f) が (L)-滑らかかつ (mu)-強凸なら、任意の (x
e y) に対して

[
rac{mu}{2}|y-x|^2
le
f(y)-f(x)-langle
abla f(x),y-xangle
le
rac L2|y-x|^2.
]

したがって

[
0<mule L.
]

上側の曲率尺度 (L) と下側の曲率尺度 (mu) の比が、反復の難しさを支配します。

---

## 6. 強凸性が勾配を誤差の物差しにする

<a id="thm-opt7-strong-convex-gradient-bound"></a>
<!-- formal-statement-start -->
> **定理（強凸性による勾配下界）**  
> (f:mathbb R^n	omathbb R) が微分可能かつ (mu)-強凸で、最小点 (x^*) が存在するとする。このとき任意の (x) に対して
>
[
oxed{
|
abla f(x)|^2
ge
2mu
left(
f(x)-f(x^*)
ight).
}
]
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

(g=
abla f(x)) と書きます。強凸性から任意の (y) に対して

[
f(y)
ge
f(x)
+
langle g,y-xangle
+
rac{mu}{2}|y-x|^2.
]

右辺を (y) について最小化します。(s=y-x) と置けば

[
langle g,sangle+rac{mu}{2}|s|^2
]

の最小点は

[
s=-rac1mu g
]

で、最小値は

[
-rac{1}{2mu}|g|^2.
]

したがって

[
f(x^*)
=
inf_y f(y)
ge
f(x)-rac{1}{2mu}|g|^2.
]

移項して

[
|g|^2
ge
2mu(f(x)-f(x^*)).
]

(square)
<!-- proof-end -->

> **強凸性が働いた場所**  
> 「勾配が大きいなら関数値誤差も大きい」という逆向きの評価を作るために使いました。滑らかさだけではこの下界は出ません。

<a id="thm-opt7-gradient-linear-rate"></a>
<!-- formal-statement-start -->
> **定理（滑らかな強凸関数に対する線形収束）**  
> (f:mathbb R^n	omathbb R) が (L)-滑らかかつ (mu)-強凸で、最小点 (x^*) が存在するとする。固定歩幅
>
[
x_{k+1}
=
x_k-rac1L
abla f(x_k)
]
>
> を用いると
>
[
oxed{
f(x_k)-f(x^*)
le
left(
1-rac{mu}{L}
ight)^k
left(
f(x_0)-f(x^*)
ight).
}
]
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

固定歩幅の降下評価から

[
f(x_{k+1})
le
f(x_k)
-
rac{1}{2L}|
abla f(x_k)|^2.
]

強凸性による勾配下界を代入すると

[
egin{aligned}
f(x_{k+1})-f(x^*)
&le
f(x_k)-f(x^*)
-
rac{mu}{L}
left(
f(x_k)-f(x^*)
ight)\
&=
left(
1-rac{mu}{L}
ight)
left(
f(x_k)-f(x^*)
ight).
end{aligned}
]

これを (k) 回繰り返せば

[
f(x_k)-f(x^*)
le
left(
1-rac{mu}{L}
ight)^k
left(
f(x_0)-f(x^*)
ight).
]

(square)
<!-- proof-end -->

---

## 7. 条件数と収束速度

<a id="def-opt7-smooth-strong-condition-number"></a>
<!-- formal-statement-start -->
> **定義（滑らかな強凸最適化の条件数）**  
> (f) が (L)-滑らかかつ (mu)-強凸であるとき
>
[
oxed{
kappa_f=rac{L}{mu}
}
]
>
> を、この滑らかな強凸最適化問題の **条件数**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt7-smooth-strong-condition-number -->
**定義の確認**：二次関数

[
f(x_1,x_2)
=
rac12x_1^2+2x_2^2
]

では (L=4), (mu=1) なので

[
kappa_f=4.
]

固定歩幅 (1/L) の一般評価は

[
f(x_k)-f(x^*)
le
left(rac34ight)^k
left(
f(x_0)-f(x^*)
ight)
]

です。
<!-- definition-example-end -->

線形収束率は

[
1-rac{mu}{L}
=
1-rac1{kappa_f}.
]

(kappa_f) が大きいほど1に近づき、収束が遅くなります。

正定値二次関数

[
f(x)
=
rac12x^{mathsf T}Ax-b^{mathsf T}x
]

では

[
L=lambda_{max}(A),
qquad
mu=lambda_{min}(A),
]

なので

[
kappa_f
=
rac{lambda_{max}(A)}{lambda_{min}(A)}.
]

これは [NA12 で現れた正定値行列の条件数](../NA12/index.md#thm-na12-steepest-descent-condition-number)と同じ量です。数値線形代数での「細長い楕円」と、凸最適化での「曲率の上限と下限の比」が同じ現象を見ています。

> **定数の違いに注意**  
> NA12 の二次関数・厳密直線探索では、二次構造を使ったより鋭い評価が得られます。本章の (1-1/kappa_f) は、一般の (L)-滑らかな (mu)-強凸関数に固定歩幅 (1/L) を使う場合の評価です。両者を同じ定数として扱いません。

---

## 8. (L) が分からないとき：Armijo 条件付き後退直線探索

理論上は (alpha=1/L) が便利ですが、実際には (L) が未知なことがあります。そのときは候補歩幅を縮めながら、実際に十分な減少が起きたかを検査します。

<a id="def-opt7-armijo-backtracking"></a>
<!-- formal-statement-start -->
> **定義（Armijo 条件付き後退直線探索）**  
> 点 (x) で (g=
abla f(x)
e0) とする。定数
>
[
0<c<1,
qquad
0<eta<1,
qquad
aralpha>0
]
>
> を固定する。(alpha=aralpha,aralphaeta,aralphaeta^2,ldots) の順に試し、
>
[
oxed{
f(x-alpha g)
le
f(x)-calpha|g|^2
}
]
>
> を初めて満たした (alpha) を採用する。この条件を **Armijo 条件**、この手順を **後退直線探索**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt7-armijo-backtracking -->
**定義の確認**：一変数二次関数

[
f(x)=rac q2x^2,
qquad q>0
]

では (g=qx) です。(x
e0) とすると Armijo 条件は

[
rac q2(1-alpha q)^2x^2
le
rac q2x^2-calpha q^2x^2.
]

正の量 (qx^2/2) で割って整理すると

[
alpha
le
rac{2(1-c)}q.
]

したがって歩幅を十分に縮めれば必ず受理されます。
<!-- definition-example-end -->

<a id="thm-opt7-armijo-finite"></a>
<!-- formal-statement-start -->
> **定理（(L)-滑らかさによる後退直線探索の有限停止）**  
> (f) が (L)-滑らかで、点 (x) で (g=
abla f(x)
e0) とする。Armijo 条件付き後退直線探索は有限回で停止する。さらに受理歩幅 (alpha) は
>
[
oxed{
alpha
ge
minleft{
aralpha,
rac{2eta(1-c)}{L}
ight}
}
]
>
> を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

降下補題に (y=x-alpha g) を代入すると

[
f(x-alpha g)
le
f(x)
-
alpha
left(
1-rac{Lalpha}{2}
ight)
|g|^2.
]

したがって

[
1-rac{Lalpha}{2}ge c
]

すなわち

[
alpha
le
rac{2(1-c)}{L}
]

なら Armijo 条件は必ず成立します。(aralphaeta^m	o0) なので、候補列は有限回でこの範囲に入ります。よって有限停止します。

次に受理歩幅を (alpha=aralphaeta^m) とします。(m=0) なら (alpha=aralpha) です。(mge1) なら一つ前の候補 (alpha/eta) は不受理でした。もし

[
rac{alpha}{eta}
le
rac{2(1-c)}{L}
]

なら上で示した十分条件により受理されるはずなので矛盾です。従って

[
alpha
>
rac{2eta(1-c)}{L}.
]

二場合を合わせて主張を得ます。 (square)
<!-- proof-end -->

後退直線探索は「(L) を推定してから走る」のではなく、関数値の減少を観測しながら局所的に安全な歩幅へ入る方法です。

---

## 9. Newton 法：一次法とは別の局所加速

[NA12 の Newton 法](../NA12/index.md#def-na12-newton-optimization)は

[
x_{k+1}
=
x_k
-

abla^2 f(x_k)^{-1}
abla f(x_k)
]

でした。また[正定値二次関数では1回で終了する](../NA12/index.md#prop-na12-quadratic-newton-one-step)ことも既知です。

一般の非線形関数では1回終了しません。しかし最小点の近くで Hessian が退化せず、しかも Hessian 自体が急変しなければ、誤差の一次項が打ち消されて二次の誤差だけが残ります。

<a id="thm-opt7-newton-local-quadratic"></a>
<!-- formal-statement-start -->
> **定理（Newton 法の局所二次収束）**  
> (f:mathbb R^n	omathbb R) を (C^2) 級とし、(
abla f(x^*)=0) とする。ある (r>0), (m>0), (M>0) が存在し、閉球
>
[
B={x:|x-x^*|le r}
]
>
> 上で
>
[

abla^2 f(x)succeq mI
]
>
> および
>
[
|
abla^2 f(x)-
abla^2 f(y)|
le
M|x-y|
qquad(x,yin B)
]
>
> が成り立つとする。さらに
>
[
rac{Mr}{2m}le1
]
>
> と仮定する。このとき (x_0in B) から始めた Newton 法は球 (B) 内で定義され続け、
>
[
oxed{
|x_{k+1}-x^*|
le
rac{M}{2m}
|x_k-x^*|^2
}
]
>
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

勾配を (x^*) から (x_k) まで Hessian で積分し、Newton の更新式へ代入します。(H(x_k)) を使った一次近似部分が正確に消え、残るのは Hessian の変化分だけです。

<!-- proof-start -->
### 証明

(xin B) とし

[
e=x-x^*,
qquad
H(z)=
abla^2f(z)
]

と書きます。線分 (x^*+te) は球 (B) に含まれます。微積分学の基本定理から

[

abla f(x)-
abla f(x^*)
=
int_0^1
H(x^*+te)e,dt.
]

(
abla f(x^*)=0) なので

[

abla f(x)
=
int_0^1
H(x^*+te)e,dt.
]

Newton 更新を (x^+=x-H(x)^{-1}
abla f(x)) と書くと

[
egin{aligned}
x^+-x^*
&=
e
-
H(x)^{-1}
int_0^1
H(x^*+te)e,dt\
&=
H(x)^{-1}
int_0^1
left(
H(x)-H(x^*+te)
ight)e,dt.
end{aligned}
]

(H(x)succeq mI) だから

[
|H(x)^{-1}|
le
rac1m.
]

また Hessian の Lipschitz 連続性から

[
|H(x)-H(x^*+te)|
le
M|x-(x^*+te)|
=
M(1-t)|e|.
]

したがって

[
egin{aligned}
|x^+-x^*|
&le
rac1m
int_0^1
M(1-t)|e|^2,dt\
&=
rac{M}{2m}|e|^2.
end{aligned}
]

さらに (|e|le r) なら

[
|x^+-x^*|
le
rac{Mr}{2m}|e|
le
|e|
le r.
]

よって一度球内にいれば次も球内に残ります。帰納法により全反復が球内で定義され、二次誤差評価が各段階で成立します。 (square)
<!-- proof-end -->

> **局所定理であることに注意**  
> NA12 で見たように、Hessian が不定値なら Newton 方向は降下方向とは限りません。上の証明も、最小点近傍で Hessian が一様に正定値という条件を使っています。大域的には直線探索や信頼領域法などで Newton step を制御する必要があります。

---

## 10. 仮定を失うと何が壊れるか

### 10.1 滑らかでも強凸でなければ線形収束の証明は閉じない

[
f(x_1,x_2)=rac12x_1^2
]

は凸で、勾配

[

abla f(x_1,x_2)=(x_1,0)
]

は (L=1) で Lipschitz 連続です。しかし (x_2) 方向に全く曲率がないため、(mu>0) の強凸性は成立しません。最小点も

[
{(0,t):tinmathbb R}
]

と一意ではありません。

ここで失われたのは、強凸性による

[
|
abla f(x)|^2
ge
2mu(f(x)-f^*)
]

という誤差下界です。したがって「関数値の1回の減少」を「現在の関数値誤差の一定割合」に変換する線形収束の機構が使えません。

### 10.2 (L)-滑らかでも歩幅制御を失えば発散する

すでに見た

[
f(x)=rac L2x^2
]

で (alpha>2/L) とすると

[
|x_{k+1}|=|1-alpha L|,|x_k|>|x_k|.
]

滑らかさは「どんな歩幅でも安全」を意味しません。

### 10.3 Newton 法は曲率行列を反転するだけでは大域法にならない

Hessian が特異なら Newton step 自体が定義できず、不定値なら降下方向とは限りません。OPT7 の局所二次収束は、正定値性と Hessian の Lipschitz 連続性が保証される近傍へ入ってからの定理です。

---

## 11. どの定理をどこで使うか

本章の依存関係は次のように整理できます。

[
egin{array}{c}
L	ext{-滑らか}\
downarrow\
	ext{降下補題}\
downarrow\
	ext{固定歩幅で関数値減少}
end{array}
qquad
+
qquad
egin{array}{c}
	ext{凸性}\
downarrow\
	ext{一次支持不等式}
end{array}
]

から

[
O(1/k)
]

が出ます。さらに

[
mu	ext{-強凸}
	o
|
abla f(x)|^2
ge
2mu(f(x)-f^*)
]

を加えると

[
left(1-rac{mu}{L}ight)^k
]

という線形収束へ変わります。

Newton 法は別の枝で

[

abla^2fsucceq mI
quad+quad

abla^2f	ext{ が Lipschitz 連続}
]

から

[
|e_{k+1}|
le
C|e_k|^2
]

を得ます。

この違いを覚えるより、**各収束率を作っている不等式を再構成できること**が本章の到達点です。

---

## 12. 演習 Level A

<a id="ex-opt7-a01"></a>
### OPT7-A01 (L)-滑らかさを定義から確認する

- Level: A
- 目安時間: 10分

[
f(x_1,x_2)
=
rac12(2x_1^2+6x_2^2)
]

について、(
abla f) が (L=6) で Lipschitz 連続であることを定義から示せ。

<!-- solution-start -->
#### 詳細解答

勾配は

[

abla f(x_1,x_2)
=
(2x_1,6x_2).
]

(d=x-y=(d_1,d_2)) とすると

[

abla f(x)-
abla f(y)
=
(2d_1,6d_2).
]

従って

[
egin{aligned}
|
abla f(x)-
abla f(y)|^2
&=
4d_1^2+36d_2^2\
&le
36(d_1^2+d_2^2)\
&=
36|x-y|^2.
end{aligned}
]

平方根を取って

[
oxed{
|
abla f(x)-
abla f(y)|
le
6|x-y|.
}
]

よって (L=6) を Lipschitz 定数として取れます。
<!-- solution-end -->

<a id="ex-opt7-a02"></a>
### OPT7-A02 降下補題から安全な歩幅を読む

- Level: A
- 目安時間: 10分

(f) が (L)-滑らかとする。更新

[
x^+=x-rac{1}{2L}
abla f(x)
]

に対して、関数値がどれだけ減るかを降下補題から評価せよ。

<!-- solution-start -->
#### 詳細解答

(g=
abla f(x)), (alpha=1/(2L)) と置きます。固定歩幅の降下評価は

[
f(x^+)
le
f(x)
-
alpha
left(
1-rac{Lalpha}{2}
ight)
|g|^2.
]

ここで

[
Lalpha=rac12
]

なので

[
1-rac{Lalpha}{2}
=
1-rac14
=
rac34.
]

従って

[
f(x^+)
le
f(x)
-
rac{1}{2L}cdotrac34|g|^2
=
f(x)-rac{3}{8L}|g|^2.
]

したがって

[
oxed{
f(x)-f(x^+)
ge
rac{3}{8L}|
abla f(x)|^2.
}
]
<!-- solution-end -->

<a id="ex-opt7-a03"></a>
### OPT7-A03 強凸定数と滑らかさ定数

- Level: A
- 目安時間: 12分

[
f(x_1,x_2)
=
rac12(ax_1^2+bx_2^2),
qquad
0<ale b
]

とする。定義から (f) が (L=b) で滑らかかつ (mu=a) で強凸であることを示し、条件数を求めよ。

<!-- solution-start -->
#### 詳細解答

勾配は

[

abla f=(ax_1,bx_2).
]

(d=x-y) とすると

[
|
abla f(x)-
abla f(y)|^2
=
a^2d_1^2+b^2d_2^2
le
b^2(d_1^2+d_2^2).
]

よって (L=b) で滑らかです。

また二次関数の展開から

[
f(y)
=
f(x)
+
langle
abla f(x),y-xangle
+
rac12
left(
ad_1^2+bd_2^2
ight).
]

(bge a) なので

[
ad_1^2+bd_2^2
ge
a(d_1^2+d_2^2).
]

従って

[
f(y)
ge
f(x)
+
langle
abla f(x),y-xangle
+
rac a2|y-x|^2.
]

よって (mu=a) で強凸です。条件数は

[
oxed{
kappa_f=rac{L}{mu}=rac ba.
}
]
<!-- solution-end -->

<a id="ex-opt7-a04"></a>
### OPT7-A04 Armijo 条件の受理範囲

- Level: A
- 目安時間: 12分

[
f(x)=2x^2,
qquad
c=rac12
]

とする。点 (x
e0) で負の勾配方向へ進むとき、Armijo 条件を満たすすべての正の歩幅 (alpha) を求めよ。

<!-- solution-start -->
#### 詳細解答

[
f(x)=rac q2x^2
]

と比べると (q=4) です。勾配は

[
g=4x.
]

Armijo 条件

[
f(x-alpha g)
le
f(x)-calpha g^2
]

へ代入します。

左辺は

[
2(x-4alpha x)^2
=
2x^2(1-4alpha)^2.
]

右辺は

[
2x^2-rac12alpha(16x^2)
=
2x^2-8alpha x^2.
]

(2x^2>0) で割ると

[
(1-4alpha)^2
le
1-4alpha.
]

展開して

[
1-8alpha+16alpha^2
le
1-4alpha
]

だから

[
16alpha^2-4alphale0.
]

(alpha>0) より

[
oxed{
0<alphalerac14.
}
]

一般公式 (2(1-c)/q) へ (c=1/2), (q=4) を代入しても (1/4) です。
<!-- solution-end -->

---

## 13. 演習 Level B

<a id="ex-opt7-b01"></a>
### OPT7-B01 (O(1/k)) 評価を望遠鏡和から再構成する

- Level: B
- 目安時間: 20分

(f) を凸かつ (L)-滑らか、(x^*) を最小点とする。

[
x_{k+1}
=
x_k-rac1L
abla f(x_k)
]

について

[
f(x_{k+1})-f(x^*)
le
rac L2
left(
|x_k-x^*|^2-|x_{k+1}-x^*|^2
ight)
]

を導き、そこから

[
f(x_k)-f(x^*)
le
rac{L|x_0-x^*|^2}{2k}
]

を示せ。

<!-- solution-start -->
#### 詳細解答

(g_k=
abla f(x_k)) と置きます。まず

[
x_{k+1}-x^*
=
x_k-x^*-rac1Lg_k
]

だから

[
egin{aligned}
|x_{k+1}-x^*|^2
&=
|x_k-x^*|^2
-
rac2L
langle g_k,x_k-x^*angle
+
rac1{L^2}|g_k|^2.
end{aligned}
]

従って

[
rac L2
left(
|x_k-x^*|^2-|x_{k+1}-x^*|^2
ight)
=
langle g_k,x_k-x^*angle
-
rac1{2L}|g_k|^2.
]

凸性の一次支持不等式から

[
f(x_k)-f(x^*)
le
langle g_k,x_k-x^*angle.
]

また降下補題から

[
f(x_{k+1})
le
f(x_k)-rac1{2L}|g_k|^2.
]

よって

[
f(x_{k+1})-f(x^*)
le
rac L2
left(
|x_k-x^*|^2-|x_{k+1}-x^*|^2
ight).
]

これを (j=0,ldots,k-1) で足すと

[
sum_{j=0}^{k-1}
left(
f(x_{j+1})-f(x^*)
ight)
le
rac L2|x_0-x^*|^2.
]

さらに関数値は単調非増加なので各項は (f(x_k)-f(x^*)) 以上です。従って

[
kleft(f(x_k)-f(x^*)ight)
le
rac L2|x_0-x^*|^2.
]

両辺を (k) で割って

[
oxed{
f(x_k)-f(x^*)
le
rac{L|x_0-x^*|^2}{2k}.
}
]
<!-- solution-end -->

<a id="ex-opt7-b02"></a>
### OPT7-B02 強凸性から線形収束を再構成する

- Level: B
- 目安時間: 20分

(f) を (L)-滑らかかつ (mu)-強凸とし、最小点を (x^*) とする。次の二段階で固定歩幅 (1/L) の線形収束を示せ。

1. 強凸性から
   [
   |
abla f(x)|^2
   ge
   2mu(f(x)-f(x^*))
   ]
   を導く。
2. 降下評価と組み合わせる。

<!-- solution-start -->
#### 詳細解答

(g=
abla f(x)) とします。強凸性より任意の (y) に対して

[
f(y)
ge
f(x)
+
langle g,y-xangle
+
rac{mu}{2}|y-x|^2.
]

右辺の (y)-依存部分を (s=y-x) と置けば

[
langle g,sangle+rac{mu}{2}|s|^2.
]

平方完成すると

[
rac{mu}{2}
left|
s+rac1mu g
ight|^2
-
rac{1}{2mu}|g|^2.
]

従って右辺の最小値は

[
f(x)-rac{1}{2mu}|g|^2.
]

(f(x^*)=inf_yf(y)) なので

[
f(x^*)
ge
f(x)-rac{1}{2mu}|g|^2.
]

よって

[
oxed{
|g|^2
ge
2mu(f(x)-f(x^*)).
}
]

次に固定歩幅 (1/L) の降下評価から

[
f(x_{k+1})
le
f(x_k)-rac1{2L}|
abla f(x_k)|^2.
]

先ほどの下界を代入すると

[
f(x_{k+1})-f(x^*)
le
left(
1-rac{mu}{L}
ight)
left(
f(x_k)-f(x^*)
ight).
]

帰納的に

[
oxed{
f(x_k)-f(x^*)
le
left(
1-rac{mu}{L}
ight)^k
left(
f(x_0)-f(x^*)
ight).
}
]
<!-- solution-end -->

<a id="ex-opt7-b03"></a>
### OPT7-B03 非線形 Newton 法の局所加速を直接計算する

- Level: B
- 目安時間: 20分

[
f(x)
=
rac12x^2+rac14x^4
]

を考える。

1. 最小点が (x^*=0) であることを示せ。
2. Newton 反復を閉じた式で求めよ。
3. (x	o0) で誤差が少なくとも二次より速く減ることを示せ。

<!-- solution-start -->
#### 詳細解答

まず

[
f'(x)=x+x^3=x(1+x^2).
]

(1+x^2>0) なので停留点は (x=0) だけです。また

[
f''(x)=1+3x^2>0
]

だから (f) は狭義凸で、(x^*=0) が一意な大域最小点です。

Newton 法は

[
x^+
=
x-rac{f'(x)}{f''(x)}
=
x-rac{x+x^3}{1+3x^2}.
]

分子を整理すると

[
egin{aligned}
x^+
&=
rac{x(1+3x^2)-x(1+x^2)}{1+3x^2}\
&=
oxed{
rac{2x^3}{1+3x^2}
}.
end{aligned}
]

従って

[
|x^+|
=
rac{2|x|^3}{1+3x^2}
le
2|x|^3.
]

よって (x	o0) では

[
|x^+|
=
O(|x|^3).
]

一般定理は二次収束

[
|x^+|
le C|x|^2
]

を保証しますが、この関数では対称性により二次項まで消え、実際には三次の誤差まで小さくなっています。
<!-- solution-end -->

---

## 14. 演習 Level C

<a id="ex-opt7-c01"></a>
### OPT7-C01 条件数・固定歩幅・直線探索・Newton 法を一つの二次関数で比較する

- Level: C
- 目安時間: 35分

[
f(x_1,x_2)
=
rac12
left(
x_1^2+kappa x_2^2
ight),
qquad
kappage1,
qquad
x_0=(1,1)
]

を考える。

1. (L,mu,kappa_f) を求めよ。
2. 固定歩幅 (alpha=1/L) の反復を明示し、(kge1) の (f(x_k)) を求めよ。
3. 一般の線形収束定理が与える上界と、2で得た実際の関数値を比較せよ。
4. (c=1/2) の Armijo 条件付き後退直線探索では、歩幅 (1/L) が必ず受理されることを説明せよ。
5. Newton 法が1回で最小点へ到達することを、NA12 の二次関数の結果と直接計算の両方から説明せよ。
6. (kappa) が大きいとき、固定歩幅法が遅くなる機構を説明せよ。

<!-- solution-start -->
#### 詳細解答

### 1. 滑らかさ・強凸性・条件数

勾配は

[

abla f(x_1,x_2)
=
(x_1,kappa x_2).
]

Hessian は

[

abla^2 f
=
egin{pmatrix}
1&0\
0&kappa
end{pmatrix}.
]

従って最大曲率は (kappa)、最小曲率は1です。よって

[
oxed{
L=kappa,
qquad
mu=1,
qquad
kappa_f=kappa.
}
]

### 2. 固定歩幅 (1/L)

[
alpha=rac1kappa
]

なので

[
egin{aligned}
x_{k+1,1}
&=
x_{k,1}-rac1kappa x_{k,1}
=
left(1-rac1kappaight)x_{k,1},\
x_{k+1,2}
&=
x_{k,2}-rac1kappakappa x_{k,2}
=
0.
end{aligned}
]

従って第1回以降は

[
oxed{
x_k
=
left(
left(1-rac1kappaight)^k,
0
ight)
qquad(kge1).
}
]

したがって

[
oxed{
f(x_k)
=
rac12
left(1-rac1kappaight)^{2k}
qquad(kge1).
}
]

最小値は (f(0,0)=0) です。

### 3. 一般定理との比較

初期値では

[
f(x_0)=rac12(1+kappa).
]

一般の線形収束定理は

[
f(x_k)
le
left(1-rac1kappaight)^k
rac{1+kappa}{2}
]

を与えます。

一方、実際には (kge1) で

[
f(x_k)
=
rac12
left(1-rac1kappaight)^{2k}.
]

一般定理は任意の (L)-滑らかな (mu)-強凸関数に通用するように作られているため、この特定の対角二次関数ではかなり保守的です。

### 4. Armijo 条件

(c=1/2) のとき、(L)-滑らかさから

[
alpha
le
rac{2(1-c)}L
=
rac1L
]

なら Armijo 条件が必ず成立します。

従って

[
oxed{
alpha=rac1L
}
]

は必ず受理されます。

### 5. Newton 法

Hessian は定数行列

[
H=
egin{pmatrix}
1&0\
0&kappa
end{pmatrix}
]

で

[
H^{-1}
=
egin{pmatrix}
1&0\
0&1/kappa
end{pmatrix}.
]

勾配は

[

abla f(x)=Hx.
]

よって Newton 更新は

[
x^+
=
x-H^{-1}Hx
=
0.
]

したがって任意の初期点から1回で最小点へ到達します。これは [NA12 の「実対称正定値二次関数に対する Newton 法の1回終了」](../NA12/index.md#prop-na12-quadratic-newton-one-step)そのものです。

### 6. 条件数が大きいと何が遅いか

固定歩幅は最大曲率 (kappa) に合わせて

[
alpha=rac1kappa
]

まで小さくする必要があります。しかし (x_1) 方向の曲率は1しかありません。したがって (x_1) 成分は

[
1-rac1kappa
]

倍ずつしか減りません。

(kappa) が大きいと

[
1-rac1kappa
approx1
]

なので、急な (x_2) 方向に合わせた小さな歩幅が、緩い (x_1) 方向の進みを遅くします。これが条件数による最急降下法の遅さの幾何学的な意味です。
<!-- solution-end -->

---

## 15. この章の要点

- (L)-滑らかさは勾配変化の上限であり、降下補題を与える。
- 固定歩幅 (1/L) なら、勾配ノルムの二乗に比例した関数値減少が保証される。
- 凸性を加えると、距離の二乗の望遠鏡和から
  [
  f(x_k)-f^*=O(1/k)
  ]
  が得られる。
- (mu)-強凸性は曲率の下限であり、勾配ノルムを関数値誤差の下からの物差しにする。
- (L)-滑らかかつ (mu)-強凸なら
  [
  f(x_k)-f^*
  le
  (1-mu/L)^k(f(x_0)-f^*)
  ]
  と線形収束する。
- 条件数 (kappa_f=L/mu) は、正定値二次関数では行列条件数と一致する。
- (L) が未知でも Armijo 条件付き後退直線探索は、(L)-滑らかさのもとで有限回で安全な歩幅へ入る。
- Newton 法の局所二次収束は「Hessian が一様に可逆」かつ「Hessian が Lipschitz 連続」という二つの仮定から出る。
- NA12 の二次関数・厳密直線探索・共役勾配法を再講義せず、その一般凸最適化側の意味を接続した。

次の [OPT8](../OPT8/index.md) では滑らかさを失った目的関数へ進み、劣勾配法・近接写像・近接勾配法を扱います。
