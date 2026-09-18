# PDE2 二階線形PDEを最高階項から分類する

PDE1 では、一次方程式を特性曲線に沿って ODE へ落としました。ここから二階方程式へ進みます。

二階 PDE では、見た目が少し違うだけの式が、まったく異なる振る舞いをします。

- Laplace 型代表式 $u_{xx}+u_{yy}=0$ は、領域の**境界**から内部を決める問題へ向かう。
- 熱方程式は、初期状態から時間とともに**拡散**する。
- 波動方程式は、初期変位・初速度から情報が**伝播**する。

この違いを最初に見抜く道具が、二階微分だけを抜き出した **最高階の二階微分項** と、その係数から作る判別式です。

本章の中心図式は

    二階線形PDE
          │
          │ 二階微分だけを抜き出す
          ↓
     最高階二階項
          │
          │ 2×2の係数行列 / 判別式を見る
          ↓
  elliptic / parabolic / hyperbolic
          │
          ├─ 座標変換で標準形へ
          │
          └─ 自然なデータの置き方を読む

です。

> **証明境界**  
> 本章は二変数の古典的な二階線形 PDE を対象とし、分類・線形座標変換・標準形・データの置き方の意味までを扱います。一般の多変数楕円型作用素、弱微分、Sobolev 空間、Lax--Milgram、弱解は Encore III 以降へ送ります。熱・波動・楕円型代表方程式そのものの解法と一意性証明は PDE3--PDE5 で行います。

---

## 1. 二階線形PDEでは「最高階」を最初に見る

二変数 $x,y$ の未知関数 $u=u(x,y)$ を考えます。

<a id="def-pde2-second-order-linear"></a>
<!-- formal-statement-start -->
> **定義（二変数の二階線形PDE）**  
> 領域 $\Omega\subset\mathbb R^2$ 上で
>
> $$
> A(x,y)u_{xx}
> +2B(x,y)u_{xy}
> +C(x,y)u_{yy}
> +D(x,y)u_x
> +E(x,y)u_y
> +F(x,y)u
> =
> G(x,y)
> $$
>
> の形で書け、各点で $A,B,C$ が同時に 0 ではない方程式を、二変数の二階線形 PDE とする。
<!-- formal-statement-end -->

ここで混合微分の係数を **$2B$** と書くのが標準です。判別式を簡潔に書くための約束なので、係数を読み取るときに 2 を落とさないことが重要です。

<!-- definition-example-start: def-pde2-second-order-linear -->
**定義の確認**

$$
3u_{xx}+4u_{xy}+u_{yy}+2u_x-u=0
$$

では

$$
A=3,\qquad 2B=4,\qquad C=1,
$$

すなわち

$$
B=2
$$

です。

一方、

$$
u_t-\kappa u_{xx}=0
$$

も、独立変数を $(x,t)$ と見れば二変数の二階線形 PDE です。時間微分 $u_t$ は一階なので、二階の最高階部分には入りません。
<!-- definition-example-end -->

PDE の型は、低階項を全部眺めて決めるのではありません。まず二階微分だけを抜き出します。

---

## 2. 最高階二階項を行列でまとめる

<a id="def-pde2-principal-part"></a>
<!-- formal-statement-start -->
> **定義（主部と主係数行列）**  
> 二階線形 PDE
>
> $$
> A u_{xx}+2B u_{xy}+C u_{yy}
> +D u_x+E u_y+F u=G
> $$
>
> の二階微分を含む部分
>
> $$
> \boxed{
> A u_{xx}+2B u_{xy}+C u_{yy}
> }
> $$
>
> を **主部** とする。
>
> 主部の係数から作る対称行列
>
> $$
> \boxed{
> M=
> \begin{pmatrix}
> A & B\\
> B & C
> \end{pmatrix}
> }
> $$
>
> を **主係数行列** とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pde2-principal-part -->
**定義の確認**

$$
2u_{xx}-6u_{xy}+5u_{yy}+100u_x-e^y u=0
$$

の主部は

$$
2u_{xx}-6u_{xy}+5u_{yy}
$$

であり、

$$
A=2,\qquad B=-3,\qquad C=5.
$$

したがって

$$
M=
\begin{pmatrix}
2 & -3\\
-3 & 5
\end{pmatrix}.
$$

大きな係数 $100$ が一階項についていても、分類には直接入りません。
<!-- definition-example-end -->

主部だけを見る理由は、二階微分が局所的な曲がり方を最も強く支配するからです。後で座標を変えたときも、二階微分の係数が型を決める構造は保たれます。

---

## 3. 判別式で三つの型へ分ける

<a id="def-pde2-type"></a>
<!-- formal-statement-start -->
> **定義（二階線形PDEの型）**  
> 主部
>
> $$
> A u_{xx}+2B u_{xy}+C u_{yy}
> $$
>
> に対して
>
> $$
> \boxed{
> \mathcal D:=B^2-AC
> }
> $$
>
> を判別式とする。主部が 0 でない点で、
>
> - $\mathcal D<0$ なら **楕円型（elliptic）**
> - $\mathcal D=0$ なら **放物型（parabolic）**
> - $\mathcal D>0$ なら **双曲型（hyperbolic）**
>
> とする。
>
> 係数が点によって変わる場合、この分類は各点で行う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pde2-type -->
**定義の確認：三つの代表方程式**

### Laplace 型代表式 $u_{xx}+u_{yy}=0$

$$
u_{xx}+u_{yy}=0
$$

では

$$
A=1,\qquad B=0,\qquad C=1.
$$

したがって

$$
\mathcal D=0^2-1\cdot1=-1<0.
$$

よって楕円型です。

### 熱方程式

$$
u_t-\kappa u_{xx}=0,
\qquad
\kappa>0
$$

を変数 $(x,t)$ で見ると、二階微分は $u_{xx}$ だけです。

$$
A=-\kappa,\qquad B=0,\qquad C=0.
$$

したがって

$$
\mathcal D=0.
$$

よって放物型です。

### 波動方程式

$$
u_{tt}-c^2u_{xx}=0,
\qquad
c>0
$$

を変数 $(x,t)$ で見ると

$$
A=-c^2,\qquad B=0,\qquad C=1.
$$

したがって

$$
\mathcal D=c^2>0.
$$

よって双曲型です。
<!-- definition-example-end -->

ここで熱方程式に $u_t$ があることは分類を変えません。$u_t$ は一階項であり、型を決めるのは二階の主部だからです。

---

## 4. 主二次形式を見ると分類の意味が見える

判別式を暗記するだけでは、なぜ三種類なのかが見えません。主係数行列から二次式を作ります。

<a id="def-pde2-principal-quadratic-form"></a>
<!-- formal-statement-start -->
> **定義（主二次形式）**  
> 主係数行列
>
> $$
> M=
> \begin{pmatrix}
> A&B\\
> B&C
> \end{pmatrix}
> $$
>
> に対し、
>
> $$
> \boxed{
> q(p,q)=Ap^2+2Bpq+Cq^2
> }
> $$
>
> を主二次形式とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pde2-principal-quadratic-form -->
**定義の確認**

$$
u_{xx}+2u_{xy}+u_{yy}=0
$$

では

$$
q(p,q)=p^2+2pq+q^2=(p+q)^2.
$$

一方向だけが二階微分として残る「一つの平方」です。判別式は

$$
\mathcal D=1^2-1\cdot1=0
$$

で、放物型になります。

一方

$$
u_{xx}-u_{yy}=0
$$

では

$$
q(p,q)=p^2-q^2=(p-q)(p+q).
$$

実数上で異なる二つの一次因子へ分かれ、双曲型になります。

$$
u_{xx}+u_{yy}=0
$$

では

$$
q(p,q)=p^2+q^2,
$$

実数の非零 $(p,q)$ に対して 0 になりません。これが楕円型です。
<!-- definition-example-end -->

この「0 になる実方向が 0 本・1 本・2 本」という違いが、次節の特性方向と対応します。

---

## 5. 特性方向の本数が 0・1・2 に分かれる

PDE1 では一次方程式の特性曲線を扱いました。二階 PDE でも「特別な方向」が現れます。

<a id="def-pde2-characteristic-direction"></a>
<!-- formal-statement-start -->
> **定義（二階PDEの特性方向）**  
> 定係数の主部
>
> $$
> A u_{xx}+2B u_{xy}+C u_{yy}
> $$
>
> に対し、非零ベクトル $(p,q)$ が
>
> $$
> \boxed{
> Ap^2+2Bpq+Cq^2=0
> }
> $$
>
> を満たすとき、その方向を主部の特性方向と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pde2-characteristic-direction -->
**定義の確認**

波動方程式の主部

$
-c^2u_{xx}+u_{tt}
$

では

$
q(p,q)=-c^2p^2+q^2.
$

特性条件 $q(p,q)=0$ は

$
q=\pm cp
$

となり、異なる二つの実方向を持ちます。

一方、Laplace 型代表式 $u_{xx}+u_{yy}=0$では

$
q(p,q)=p^2+q^2
$

なので、非零の実ベクトルで 0 になる方向はありません。
<!-- definition-example-end -->

$(p,q)=(1,m)$ と置ける場合には

$$
A+2Bm+Cm^2=0
$$

という二次方程式になります。その判別式は

$$
(2B)^2-4CA
=
4(B^2-AC)
=
4\mathcal D.
$$

従って実数解の本数は $\mathcal D$ の符号で決まります。

<a id="prop-pde2-characteristic-count"></a>
<!-- formal-statement-start -->
> **命題（型と実特性方向の本数）**  
> 非零の定係数主部に対して、
>
> - 楕円型 $\mathcal D<0$ では実特性方向を持たない。
> - 放物型 $\mathcal D=0$ では重なった一つの実特性方向を持つ。
> - 双曲型 $\mathcal D>0$ では異なる二つの実特性方向を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

主二次形式を 0 と置いた式は、比 $m=q/p$ に関する二次方程式です。二次方程式の実根の個数を決める判別式が、そのまま $4\mathcal D$ になります。

<!-- proof-start -->
### 証明

まず $p\ne0$ の方向では $m=q/p$ と置けます。主二次形式を $p^2$ で割ると

$$
A+2Bm+Cm^2=0.
$$

この二次方程式の判別式は

$$
4B^2-4AC=4\mathcal D.
$$

したがって

- $\mathcal D<0$ なら実根なし、
- $\mathcal D=0$ なら一致する一つの実根、
- $\mathcal D>0$ なら異なる二実根、

となります。

$p=0$ の方向は $(0,q)$ であり、特性条件は $Cq^2=0$ です。$C=0$ の場合にこの方向が加わりますが、これは上の二次方程式で無限大の傾きに対応するだけで、方向全体で数えれば結論は変わりません。
<!-- proof-end -->

PDE1 の特性曲線と同じ語を使いますが、ここでは「二階主部が退化する方向」を見ています。PDE4 の波動方程式では、この二本の方向が実際の伝播方向と結びつきます。

---

## 6. 座標を変えても型は変わらない

「$x,y$ という名前の付け方で elliptic が hyperbolic に変わる」なら分類は役に立ちません。実際には、可逆な線形座標変換で型は保たれます。

$$
\xi=ax+by,
\qquad
\eta=cx+dy,
\qquad
ad-bc\ne0
$$

と置きます。$ad-bc\ne0$ は、この変換から元の $x,y$ を一意に復元できる条件です。

<a id="thm-pde2-coordinate-invariance"></a>
<!-- formal-statement-start -->
> **定理（可逆線形座標変換による型の不変性）**  
> 二階線形 PDE の主係数行列を
>
> $$
> M=
> \begin{pmatrix}
> A&B\\
> B&C
> \end{pmatrix}
> $$
>
> とする。可逆線形座標変換
>
> $$
> \xi=ax+by,
> \qquad
> \eta=cx+dy,
> \qquad
> ad-bc\ne0
> $$
>
> のもとで、新しい主係数を $A',B',C'$ とすると
>
> $$
> \boxed{
> \begin{aligned}
> A'&=Aa^2+2Bab+Cb^2,\\
> B'&=Aac+B(ad+bc)+Cbd,\\
> C'&=Ac^2+2Bcd+Cd^2.
> \end{aligned}
> }
> $$
>
> さらに新しい判別式 $\mathcal D'=B'^2-A'C'$ は
>
> $$
> \boxed{
> \mathcal D'
> =
> (ad-bc)^2\mathcal D
> }
> $$
>
> を満たす。よって楕円型・放物型・双曲型の別は可逆線形座標変換で変わらない。
<!-- formal-statement-end -->

### 証明の見取り図

線形変換では $a,b,c,d$ が定数なので、連鎖律を二回使っても座標変換の係数を微分する項は出ません。まず $U_{\xi\xi}$、$U_{\xi\eta}$、$U_{\eta\eta}$ の係数を直接集め、最後に新しい判別式を計算します。

<!-- proof-start -->
### 証明

$u(x,y)=U(\xi,\eta)$ と置きます。一次微分は

$$
u_x=aU_\xi+cU_\eta,
\qquad
u_y=bU_\xi+dU_\eta.
$$

もう一度微分すると

$$
u_{xx}
=
a^2U_{\xi\xi}
+2acU_{\xi\eta}
+c^2U_{\eta\eta},
$$

$$
u_{xy}
=
abU_{\xi\xi}
+(ad+bc)U_{\xi\eta}
+cdU_{\eta\eta},
$$

$$
u_{yy}
=
b^2U_{\xi\xi}
+2bdU_{\xi\eta}
+d^2U_{\eta\eta}.
$$

これを

$$
Au_{xx}+2Bu_{xy}+Cu_{yy}
$$

へ代入します。$U_{\xi\xi}$ の係数は

$$
A'=Aa^2+2Bab+Cb^2,
$$

$2U_{\xi\eta}$ の係数は

$$
2B'
=
2\{Aac+B(ad+bc)+Cbd\},
$$

$U_{\eta\eta}$ の係数は

$$
C'=Ac^2+2Bcd+Cd^2.
$$

従って新しい主係数行列は

$$
M'
=
\begin{pmatrix}
A'&B'\\
B'&C'
\end{pmatrix}.
$$

ここで判別式を直接計算すると

$$
\begin{aligned}
B'^2-A'C'
&=
\{Aac+B(ad+bc)+Cbd\}^2\\
&\quad-
\{Aa^2+2Bab+Cb^2\}
\{Ac^2+2Bcd+Cd^2\}\\
&=
(ad-bc)^2(B^2-AC).
\end{aligned}
$$

したがって

$$
\mathcal D'
=
(ad-bc)^2\mathcal D.
$$

可逆性から $ad-bc\ne0$ なので

$$
(ad-bc)^2>0.
$$

よって $\mathcal D'$ と $\mathcal D$ は同符号であり、型は変わりません。
<!-- proof-end -->

> **補足**  
> 滑らかな非線形座標変換でも、各点の一次近似が可逆なら最高階二階項の型は局所的に保存されます。座標関数の二階微分から生じる項は一階微分の項へ入ります。本章では、その一般論を前提にせず、必要な線形変換を上で直接計算しました。

---

## 7. 定係数方程式は三つの標準形へ近づけられる

分類の実用上の意味は、座標を変えると主部の姿が三種類へ整理されることです。

<a id="thm-pde2-standard-form"></a>
<!-- formal-statement-start -->
> **定理（二変数定係数主部の標準形）**  
> 非零の定係数主部
>
> $$
> A u_{xx}+2B u_{xy}+C u_{yy}
> $$
>
> に対し、適当な可逆線形座標変換と座標の定数倍を行えば、主部は非零定数倍を除いて次のいずれかへ変形できる。
>
> - 楕円型：
>
> $$
> U_{\xi\xi}+U_{\eta\eta}
> $$
>
> - 放物型：
>
> $$
> U_{\xi\xi}
> $$
>
> - 双曲型：
>
> $$
> U_{\xi\xi}-U_{\eta\eta}
> $$
>
> 双曲型はさらに線形座標変換して
>
> $$
> U_{\alpha\beta}
> $$
>
> の形にしてもよい。
<!-- formal-statement-end -->

### 証明の見取り図

主二次形式

$$
q(p,q)=Ap^2+2Bpq+Cq^2
$$

を平方完成します。$A\ne0$ なら

$$
q(p,q)
=
A\left(p+\frac BAq\right)^2
+
\frac{AC-B^2}{A}q^2.
$$

第二項の符号が $\mathcal D=B^2-AC$ によって決まるため、二つの平方が「同符号・一つ消える・異符号」に分かれます。

<!-- proof-start -->
### 証明

まず $A\ne0$ とします。

$$
\begin{aligned}
q(p,q)
&=
Ap^2+2Bpq+Cq^2\\
&=
A\left(p+\frac BAq\right)^2
+
\left(C-\frac{B^2}{A}\right)q^2\\
&=
A\left(p+\frac BAq\right)^2
+
\frac{AC-B^2}{A}q^2\\
&=
A\left(p+\frac BAq\right)^2
-
\frac{\mathcal D}{A}q^2.
\end{aligned}
$$

新しい一次形式

$$
r=p+\frac BAq,
\qquad
s=q
$$

は可逆な線形変換です。従って、これを新座標の勾配方向として選べます。

- $\mathcal D<0$ なら $A$ と $-\mathcal D/A$ は同符号なので、二つの平方は同じ符号を持ちます。座標を定数倍すれば $r^2+s^2$ 型になります。
- $\mathcal D=0$ なら第二項が消え、一つの平方 $r^2$ だけが残ります。
- $\mathcal D>0$ なら二つの平方は異符号なので、定数倍により $r^2-s^2$ 型になります。

$A=0$ のとき、$C\ne0$ なら $x,y$ を交換して同じ議論を使えます。

$A=C=0$ なら主部が非零であることから $B\ne0$ です。この場合

$$
q(p,q)=2Bpq
$$

であり、すでに双曲型の混合積の形です。

最後に双曲型の

$$
U_{\xi\xi}-U_{\eta\eta}
$$

へ

$$
\alpha=\xi+\eta,
\qquad
\beta=\xi-\eta
$$

を入れると、定数倍を除いて $U_{\alpha\beta}$ になります。
<!-- proof-end -->

この定理は「どの方程式も Laplace / heat / wave そのものになる」と言っているのではありません。低階項や変数係数は残ります。**主部の局所的な骨格**が三種類に整理される、という主張です。

---

## 8. 三つの標準形を手で作る

### 8.1 楕円型：混合項を回転で消す

$$
5u_{xx}+4u_{xy}+5u_{yy}=0
$$

を考えます。

ここでは

$$
A=5,\qquad B=2,\qquad C=5,
$$

なので

$$
\mathcal D=4-25=-21<0.
$$

楕円型です。

座標を

$$
\xi=\frac{x+y}{\sqrt2},
\qquad
\eta=\frac{x-y}{\sqrt2}
$$

とします。

すると

$$
\partial_x
=
\frac1{\sqrt2}(\partial_\xi+\partial_\eta),
\qquad
\partial_y
=
\frac1{\sqrt2}(\partial_\xi-\partial_\eta).
$$

従って

$$
u_{xx}
=
\frac12(U_{\xi\xi}+2U_{\xi\eta}+U_{\eta\eta}),
$$

$$
u_{yy}
=
\frac12(U_{\xi\xi}-2U_{\xi\eta}+U_{\eta\eta}),
$$

$$
u_{xy}
=
\frac12(U_{\xi\xi}-U_{\eta\eta}).
$$

代入すると

$$
5u_{xx}+4u_{xy}+5u_{yy}
=
7U_{\xi\xi}+3U_{\eta\eta}.
$$

混合項が消え、二つの二階微分が同符号で残りました。さらに座標を定数倍すれば $V_{\alpha\alpha}+V_{\beta\beta}$ 型へできます。

### 8.2 放物型：一方向だけ二階微分が残る

$$
u_{xx}+2u_{xy}+u_{yy}=0
$$

では

$$
\mathcal D=1-1=0.
$$

$$
\xi=x+y,
\qquad
\eta=x-y
$$

と置くと

$$
\partial_x=\partial_\xi+\partial_\eta,
\qquad
\partial_y=\partial_\xi-\partial_\eta.
$$

よって

$$
u_{xx}+2u_{xy}+u_{yy}
=
4U_{\xi\xi}.
$$

二階微分は一方向だけに残ります。

### 8.3 双曲型：二本の特性座標を使う

$$
u_{xx}-u_{yy}=0
$$

では

$$
\mathcal D=1>0.
$$

同じく

$$
\xi=x+y,
\qquad
\eta=x-y
$$

と置くと

$$
u_{xx}-u_{yy}
=
4U_{\xi\eta}.
$$

波動方程式の主部が、二本の特性方向に沿う混合微分へ変わりました。

この計算は PDE4 の d'Alembert 公式へ直接つながります。

---

## 9. 係数が変わると、場所によって型が変わることがある

定係数では方程式全体に一つの型を付けられます。変数係数ではそうとは限りません。

代表例は Tricomi 型の方程式

$$
y\,u_{xx}+u_{yy}=0
$$

です。

ここでは

$$
A=y,\qquad B=0,\qquad C=1,
$$

なので

$$
\mathcal D=-y.
$$

したがって

$$
\begin{cases}
y>0 & \text{楕円型},\\
y=0 & \text{放物型},\\
y<0 & \text{双曲型}.
\end{cases}
$$

同じ方程式が、上半平面と下半平面で別の型になります。

<a id="prop-pde2-tricomi-type"></a>
<!-- formal-statement-start -->
> **命題（Tricomi型方程式の型変化）**  
> 方程式
>
> $$
> y\,u_{xx}+u_{yy}=0
> $$
>
> は $y>0$ で楕円型、$y=0$ で放物型、$y<0$ で双曲型である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

主部の係数は

$$
A=y,\qquad B=0,\qquad C=1.
$$

従って

$$
\mathcal D
=
B^2-AC
=
-y.
$$

あとは $-y$ の符号を読むだけです。
<!-- proof-end -->

型が変わる線 $y=0$ の近くでは、純粋な楕円型・双曲型の理論をそのまま全域へ適用できません。本章では「型は点ごとに判定する」ことまでを押さえ、混合型方程式の一般論には進みません。

---

## 10. 型は「どこにデータを置くか」の手掛かりになる

PDE1 で well-posedness を

1. 存在
2. 一意性
3. データへの連続依存

の三条件として定義しました。

型分類は、どのデータ配置が自然かを考える最初の手掛かりになります。ただし、**型だけを見れば well-posedness が自動的に決まるわけではありません**。領域、境界、低階項、係数の正則性、データと解の誤差をどう測るかも必要です。

| 型 | 代表 | 主なデータの置き方 | 後続章 |
|---|---|---|---|
| 楕円型 | Laplace / Poisson | 空間領域の境界上のデータ | PDE5 |
| 放物型 | 熱方程式 | 初期時刻のデータ + 空間境界 | PDE3 |
| 双曲型 | 波動方程式 | 初期変位 + 初速度 + 必要な空間境界 | PDE4 |

### 熱方程式は時間について一階

$$
u_t-\kappa u_{xx}=0
$$

は PDE 全体としては二階ですが、時間 $t$ については一階です。したがって

$$
u(0,x)=g(x)
$$

という一つの初期プロファイルを与える形が自然です。

### 波動方程式は時間について二階

$$
u_{tt}-c^2u_{xx}=0
$$

は時間について二階です。ODE の二階方程式と同様に、

$$
u(0,x)=f(x),
\qquad
u_t(0,x)=g(x)
$$

という二種類の初期データが自然に現れます。

### Laplace 型代表式 $u_{xx}+u_{yy}=0$には時間がない

$$
u_{xx}+u_{yy}=0
$$

には特別な時間方向がありません。領域の境界上で値を指定して内部を決める Dirichlet 問題などが中心になります。

この違いは「elliptic / parabolic / hyperbolic という名前を覚える」以上に重要です。次の反例は、楕円型方程式へ時間発展のような Cauchy データを無理に置くと何が起きるかを示します。

---

## 11. Laplace 型代表式のCauchy問題は不安定になり得る

上半帯

$$
(x,y)\in\mathbb R\times[0,y_0]
$$

で Laplace 型代表式 $u_{xx}+u_{yy}=0$

$$
u_{xx}+u_{yy}=0
$$

を考えます。

境界 $y=0$ で

$$
u(x,0),
\qquad
u_y(x,0)
$$

の両方を与え、内部 $y>0$ を決めようとします。

<a id="prop-pde2-laplace-cauchy-instability"></a>
<!-- formal-statement-start -->
> **命題（Laplace 型代表式のCauchyデータに対する不安定性の例）**  
> $y_0>0$ を固定し、
>
> $$
> u_n(x,y)
> =
> \frac1{n^2}\sin(nx)\sinh(ny)
> $$
>
> と置く。
>
> 各 $u_n$ は
>
> $$
> (u_n)_{xx}+(u_n)_{yy}=0
> $$
>
> を満たし、境界 $y=0$ では
>
> $$
> u_n(x,0)=0,
> \qquad
> (u_n)_y(x,0)=\frac1n\sin(nx).
> $$
>
> 従って Cauchy データは最大誤差が 0 へ近づくが、任意の固定した $y_0>0$ で
>
> $$
> \sup_x|u_n(x,y_0)|
> =
> \frac{\sinh(ny_0)}{n^2}
> \to\infty.
> $$
>
> したがって、このデータの測り方と内部の最大誤差に関して、Laplace 型代表式 $u_{xx}+u_{yy}=0$の Cauchy 問題はデータへ連続依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

$\sin(nx)$ は $x$ 微分で $-n^2$ を生み、$\sinh(ny)$ は $y$ 微分で $+n^2$ を生みます。境界では $\sinh(0)=0$ によって関数値が消え、法線微分も $1/n$ まで小さくできます。しかし内部では $\sinh(ny_0)$ が指数的に増えます。

<!-- proof-start -->
### 証明

まず

$$
(u_n)_{xx}
=
-\sin(nx)\sinh(ny).
$$

一方、

$$
(u_n)_{yy}
=
\sin(nx)\sinh(ny).
$$

従って

$$
(u_n)_{xx}+(u_n)_{yy}=0.
$$

境界 $y=0$ では

$$
u_n(x,0)=0
$$

です。また

$$
(u_n)_y(x,y)
=
\frac1n\sin(nx)\cosh(ny),
$$

なので

$$
(u_n)_y(x,0)=\frac1n\sin(nx).
$$

したがって

$$
\sup_x|u_n(x,0)|=0,
$$

$$
\sup_x|(u_n)_y(x,0)|=\frac1n\to0.
$$

しかし固定した $y_0>0$ では

$$
\sup_x|u_n(x,y_0)|
=
\frac{\sinh(ny_0)}{n^2}.
$$

$\sinh(ny_0)$ は指数的に増加するため

$$
\frac{\sinh(ny_0)}{n^2}\to\infty.
$$

よって、境界 Cauchy データが 0 へ近づいても内部解は 0 へ近づかず、連続依存が壊れます。
<!-- proof-end -->

これは「Laplace 型代表式 $u_{xx}+u_{yy}=0$は解けない」という意味ではありません。PDE5 で扱う Dirichlet 問題のように、**楕円型に適した境界データ**を与える問題は良い性質を持ちます。

ここで壊れたのは、楕円型方程式を双曲型の時間発展のように扱い、一本の曲線上で値と法線微分を Cauchy データとして与えたときの安定性です。

---

## 12. 「型を判定した」後に何を見るか

二階線形 PDE を見たら、次の順で整理します。

1. 二階微分だけを抜き出して主部を書く。
2. 混合微分の係数を $2B$ と読んで $A,B,C$ を確定する。
3. 
   $$
   \mathcal D=B^2-AC
   $$
   を計算する。
4. $\mathcal D<0,=0,>0$ から型を判定する。
5. 係数が変数依存なら、型が場所で変わらないか確認する。
6. 必要なら主二次形式
   $$
   q(p,q)=Ap^2+2Bpq+Cq^2
   $$
   を因数分解・平方完成する。
7. 可逆な座標変換で混合項を消す、または特性座標へ移る。
8. 標準形から、どの方向が「時間的」「境界的」に働くかを読む。
9. 実際の well-posedness は、型だけで決めず、領域・データ・誤差の測り方・境界データの指定まで確認する。

PDE3--PDE5 では、この分類を入口にして各型の代表方程式を本格的に解きます。

---

## 13. 演習

### Level A

<a id="ex-pde2-a01"></a>
#### PDE2-A01 判別式から型を判定する
- Level: A

次の主部を楕円型・放物型・双曲型に分類せよ。

1.
$$
3u_{xx}+4u_{xy}+u_{yy}
$$

2.
$$
4u_{xx}+4u_{xy}+u_{yy}
$$

3.
$$
2u_{xx}+2u_{xy}+2u_{yy}
$$

4.
$$
u_t-u_{xx}+7u_x+u
$$

4 では独立変数を $(x,t)$ とする。

<!-- solution-start -->
**解答**：

1. $A=3$, $2B=4$ なので $B=2$, $C=1$ です。
   $$
   \mathcal D=B^2-AC=4-3=1>0.
   $$
   よって双曲型です。

2. $A=4$, $B=2$, $C=1$ なので
   $$
   \mathcal D=4-4=0.
   $$
   よって放物型です。

3. $A=2$, $2B=2$ なので $B=1$, $C=2$ です。
   $$
   \mathcal D=1-4=-3<0.
   $$
   よって楕円型です。

4. 二階微分は $-u_{xx}$ だけです。変数順を $(x,t)$ とすると
   $$
   A=-1,\qquad B=0,\qquad C=0.
   $$
   したがって
   $$
   \mathcal D=0.
   $$
   よって放物型です。$u_t,7u_x,u$ は低階項なので型判定へ入りません。
<!-- solution-end -->

<a id="ex-pde2-a02"></a>
#### PDE2-A02 三つの代表方程式
- Level: A

次の方程式について $A,B,C,\mathcal D$ を書き、型を答えよ。

1.
$$
u_{xx}+u_{yy}=f(x,y)
$$

2.
$$
u_t-3u_{xx}=0
$$

3.
$$
u_{tt}-9u_{xx}=0
$$

さらに、それぞれに自然なデータの置き方を一文で説明せよ。

<!-- solution-start -->
**解答**：

1. 楕円型代表 / Poisson 型です。
   $$
   A=1,\quad B=0,\quad C=1,
   $$
   なので
   $$
   \mathcal D=-1<0.
   $$
   楕円型です。時間方向を特別扱いせず、領域境界で Dirichlet/Neumann 型データを与えるのが代表的です。

2. 変数を $(x,t)$ とします。
   $$
   A=-3,\quad B=0,\quad C=0,
   $$
   なので
   $$
   \mathcal D=0.
   $$
   放物型です。時間について一階なので、初期温度 $u(0,x)$ と必要な空間境界データを与える形が自然です。

3. 変数を $(x,t)$ とします。
   $$
   A=-9,\quad B=0,\quad C=1,
   $$
   なので
   $$
   \mathcal D=9>0.
   $$
   双曲型です。時間について二階なので、初期変位 $u(0,x)$ と初速度 $u_t(0,x)$ の二つを与える形が自然です。
<!-- solution-end -->

<a id="ex-pde2-a03"></a>
#### PDE2-A03 放物型を一つの平方へ直す
- Level: A

$$
u_{xx}+2u_{xy}+u_{yy}=0
$$

について、

$$
\xi=x+y,
\qquad
\eta=x-y
$$

と置く。方程式を $(\xi,\eta)$ 座標へ変換し、二階微分が一方向だけに残ることを確認せよ。

<!-- solution-start -->
**解答**：

連鎖律から

$$
\partial_x=\partial_\xi+\partial_\eta,
\qquad
\partial_y=\partial_\xi-\partial_\eta.
$$

したがって

$$
u_{xx}
=
U_{\xi\xi}+2U_{\xi\eta}+U_{\eta\eta},
$$

$$
u_{yy}
=
U_{\xi\xi}-2U_{\xi\eta}+U_{\eta\eta},
$$

$$
u_{xy}
=
U_{\xi\xi}-U_{\eta\eta}.
$$

よって

$$
\begin{aligned}
u_{xx}+2u_{xy}+u_{yy}
&=
(U_{\xi\xi}+2U_{\xi\eta}+U_{\eta\eta})\\
&\quad
+2(U_{\xi\xi}-U_{\eta\eta})\\
&\quad
+(U_{\xi\xi}-2U_{\xi\eta}+U_{\eta\eta})\\
&=
4U_{\xi\xi}.
\end{aligned}
$$

従って元の方程式は

$$
\boxed{
U_{\xi\xi}=0
}
$$

と同値です。放物型では主部の二階方向が一つに退化することが具体的に見えます。
<!-- solution-end -->

<a id="ex-pde2-a04"></a>
#### PDE2-A04 場所によって型が変わる
- Level: A

$$
(x-2)u_{xx}+u_{yy}=0
$$

の型を領域ごとに分類せよ。型が変わる境界も答えよ。

<!-- solution-start -->
**解答**：

主部の係数は

$$
A=x-2,\qquad B=0,\qquad C=1.
$$

したがって

$$
\mathcal D
=
0-(x-2)
=
2-x.
$$

よって

$$
\begin{cases}
x>2 & \mathcal D<0\quad\Rightarrow\quad\text{楕円型},\\
x=2 & \mathcal D=0\quad\Rightarrow\quad\text{放物型},\\
x<2 & \mathcal D>0\quad\Rightarrow\quad\text{双曲型}.
\end{cases}
$$

型が変わる境界は直線

$$
\boxed{x=2}
$$

です。
<!-- solution-end -->

### Level B

<a id="ex-pde2-b01"></a>
#### PDE2-B01 回転して混合項を消す
- Level: B

$$
5u_{xx}+4u_{xy}+5u_{yy}=0
$$

に対し

$$
\xi=\frac{x+y}{\sqrt2},
\qquad
\eta=\frac{x-y}{\sqrt2}
$$

と置く。

1. 元の方程式が楕円型であることを確認せよ。
2. 変換後の主部を求めよ。
3. 型が変わっていないことを確認せよ。

<!-- solution-start -->
**解答**：

1. $A=5$, $B=2$, $C=5$ なので
   $$
   \mathcal D=4-25=-21<0.
   $$
   よって楕円型です。

2. 
   $$
   \partial_x
   =
   \frac1{\sqrt2}(\partial_\xi+\partial_\eta),
   \qquad
   \partial_y
   =
   \frac1{\sqrt2}(\partial_\xi-\partial_\eta).
   $$
   したがって
   $$
   u_{xx}
   =
   \frac12(U_{\xi\xi}+2U_{\xi\eta}+U_{\eta\eta}),
   $$
   $$
   u_{yy}
   =
   \frac12(U_{\xi\xi}-2U_{\xi\eta}+U_{\eta\eta}),
   $$
   $$
   u_{xy}
   =
   \frac12(U_{\xi\xi}-U_{\eta\eta}).
   $$
   代入すると
   $$
   \begin{aligned}
   5u_{xx}+4u_{xy}+5u_{yy}
   &=
   \frac52(U_{\xi\xi}+2U_{\xi\eta}+U_{\eta\eta})\\
   &\quad
   +2(U_{\xi\xi}-U_{\eta\eta})\\
   &\quad
   +\frac52(U_{\xi\xi}-2U_{\xi\eta}+U_{\eta\eta})\\
   &=
   7U_{\xi\xi}+3U_{\eta\eta}.
   \end{aligned}
   $$

3. 変換後は
   $$
   A'=7,\qquad B'=0,\qquad C'=3.
   $$
   よって
   $$
   \mathcal D'
   =
   -21<0.
   $$
   楕円型のままです。今回の変換では $a=1/\sqrt2$, $b=1/\sqrt2$, $c=1/\sqrt2$, $d=-1/\sqrt2$ なので $(ad-bc)^2=1$ です。従って判別式の値そのものも変わっていません。
<!-- solution-end -->

<a id="ex-pde2-b02"></a>
#### PDE2-B02 双曲型を差の平方へ直す
- Level: B

$$
u_{xx}+4u_{xy}+u_{yy}=0
$$

を考える。

1. 型を判定せよ。
2.
   $$
   \xi=\frac{x+y}{\sqrt2},
   \qquad
   \eta=\frac{x-y}{\sqrt2}
   $$
   と置いて標準形へ変換せよ。
3. 主二次形式の符号構造を説明せよ。

<!-- solution-start -->
**解答**：

1. $A=1$, $2B=4$ なので $B=2$, $C=1$ です。
   $$
   \mathcal D=4-1=3>0.
   $$
   よって双曲型です。

2. B01 と同じ微分公式を使います。
   $$
   u_{xx}+u_{yy}
   =
   U_{\xi\xi}+U_{\eta\eta},
   $$
   $$
   4u_{xy}
   =
   2(U_{\xi\xi}-U_{\eta\eta}).
   $$
   従って
   $$
   u_{xx}+4u_{xy}+u_{yy}
   =
   3U_{\xi\xi}-U_{\eta\eta}.
   $$
   さらに
   $$
   \alpha=\frac{\xi}{\sqrt3},
   \qquad
   \beta=\eta
   $$
   と置けば
   $$
   3U_{\xi\xi}-U_{\eta\eta}
   =
   V_{\alpha\alpha}-V_{\beta\beta}.
   $$

3. 元の主二次形式は
   $$
   q(p,q)=p^2+4pq+q^2.
   $$
   回転後は
   $$
   3r^2-s^2
   $$
   型になり、一方の平方が正、一方が負です。これが双曲型の符号構造です。
<!-- solution-end -->

<a id="ex-pde2-b03"></a>
#### PDE2-B03 楕円型Cauchy問題の不安定性
- Level: B

$$
u_n(x,y)
=
\frac1{n^2}\sin(nx)\sinh(ny)
$$

とする。固定した $y_0>0$ について次を示せ。

1. $u_n$ は Laplace 型代表式 $u_{xx}+u_{yy}=0$を満たす。
2. $y=0$ での $u_n$ と $(u_n)_y$ は最大誤差が 0 へ近づく。
3. $y=y_0$ では $\sup_x|u_n(x,y_0)|\to\infty$ となる。
4. この結果が well-posedness のどの条件を壊しているか説明せよ。

<!-- solution-start -->
**解答**：

1. 
   $$
   (u_n)_{xx}
   =
   -\sin(nx)\sinh(ny),
   $$
   $$
   (u_n)_{yy}
   =
   \sin(nx)\sinh(ny).
   $$
   よって
   $$
   (u_n)_{xx}+(u_n)_{yy}=0.
   $$

2. $\sinh0=0$ なので
   $$
   u_n(x,0)=0.
   $$
   また
   $$
   (u_n)_y(x,y)
   =
   \frac1n\sin(nx)\cosh(ny),
   $$
   よって
   $$
   (u_n)_y(x,0)
   =
   \frac1n\sin(nx).
   $$
   したがって
   $$
   \sup_x|u_n(x,0)|=0,
   $$
   $$
   \sup_x|(u_n)_y(x,0)|
   =
   \frac1n\to0.
   $$

3. 固定 $y_0>0$ で
   $$
   \sup_x|u_n(x,y_0)|
   =
   \frac{\sinh(ny_0)}{n^2}.
   $$
   分子は指数的、分母は多項式的にしか増えないため
   $$
   \frac{\sinh(ny_0)}{n^2}\to\infty.
   $$

4. 境界 Cauchy データが 0 へ近づくのに内部解は 0 へ近づかないので、PDE1 で定義した well-posedness の第3条件、**データへの連続依存**が壊れています。
<!-- solution-end -->

### Level C

<a id="ex-pde2-c01"></a>
#### PDE2-C01 パラメータで型が変わる族を完全分類する
- Level: C

パラメータ $a\in\mathbb R$ に対して

$$
u_{xx}+2a\,u_{xy}+u_{yy}
+b\,u_x
+c\,u_y
=0
$$

を考える。ただし $b,c$ は任意の実定数とする。

1. $a$ の値によって方程式を楕円型・放物型・双曲型に分類せよ。
2.
   $$
   \xi=\frac{x+y}{\sqrt2},
   \qquad
   \eta=\frac{x-y}{\sqrt2}
   $$
   と置き、主部を $(\xi,\eta)$ 座標で表せ。
3. $a=1$ と $a=-1$ で、どちらの二階方向が消えるかを確認せよ。
4. $|a|>1$ で二つの二階項が異符号になることを示せ。
5. $b,c$ をどれだけ変えても型分類が変わらない理由を説明せよ。
6. $|a|<1$, $|a|=1$, $|a|>1$ の三領域で、elliptic・heat・wave のどの主部に近いかを説明せよ。

<!-- solution-start -->
**解答**：

1. 主部は
   $$
   u_{xx}+2a\,u_{xy}+u_{yy}.
   $$
   よって
   $$
   A=1,\qquad B=a,\qquad C=1.
   $$
   判別式は
   $$
   \mathcal D
   =
   a^2-1.
   $$
   従って
   $$
   \boxed{
   |a|<1\Rightarrow\text{楕円型}
   }
   $$
   $$
   \boxed{
   |a|=1\Rightarrow\text{放物型}
   }
   $$
   $$
   \boxed{
   |a|>1\Rightarrow\text{双曲型}
   }.
   $$

2. 
   $$
   u_{xx}+u_{yy}
   =
   U_{\xi\xi}+U_{\eta\eta},
   $$
   また
   $$
   u_{xy}
   =
   \frac12(U_{\xi\xi}-U_{\eta\eta}).
   $$
   したがって
   $$
   \begin{aligned}
   u_{xx}+2a u_{xy}+u_{yy}
   &=
   U_{\xi\xi}+U_{\eta\eta}
   +a(U_{\xi\xi}-U_{\eta\eta})\\
   &=
   (1+a)U_{\xi\xi}
   +(1-a)U_{\eta\eta}.
   \end{aligned}
   $$
   よって
   $$
   \boxed{
   (1+a)U_{\xi\xi}
   +(1-a)U_{\eta\eta}
   }
   $$
   が変換後の主部です。

3. $a=1$ なら
   $$
   2U_{\xi\xi}+0\cdot U_{\eta\eta},
   $$
   なので $\eta$ 方向の二階微分が消えます。

   $a=-1$ なら
   $$
   0\cdot U_{\xi\xi}+2U_{\eta\eta},
   $$
   なので $\xi$ 方向の二階微分が消えます。

4. $|a|>1$ なら $1+a$ と $1-a$ の符号が逆です。したがって定数倍・座標の尺度変更により
   $$
   V_{\alpha\alpha}-V_{\beta\beta}
   $$
   型へ変形でき、双曲型の差の平方が現れます。

5. $b\,u_x+c\,u_y$ は一階項です。型分類は二階の主部だけで決まるので、$b,c$ は判別式
   $$
   \mathcal D=a^2-1
   $$
   に現れません。従って $b,c$ を変えても型は変わりません。

6. $|a|<1$ では二つの係数 $1+a,1-a$ がともに正で、尺度変更すれば
   $$
   V_{\alpha\alpha}+V_{\beta\beta}
   $$
   となるので elliptic 型です。

   $|a|=1$ では二階微分が一方向だけに残るので、主部の退化構造は heat 型の放物型です。ただし実際の熱方程式として時間発展になるには、一階時間項など低階構造も必要です。

   $|a|>1$ では二つの係数が異符号で
   $$
   V_{\alpha\alpha}-V_{\beta\beta}
   $$
   となり、wave 型の双曲型です。

   したがって、パラメータ $a$ が $\pm1$ を越えるところで主部の幾何が
   $$
   \text{同符号}
   \longrightarrow
   \text{一方向退化}
   \longrightarrow
   \text{異符号}
   $$
   と変化します。
<!-- solution-end -->

---

## 14. 章末チェック

- 二階線形 PDE から主部だけを抜き出せる。
- 混合微分の係数 $2B$ から $B$ を正しく読み取れる。
- $\mathcal D=B^2-AC$ を計算して楕円型・放物型・双曲型を分類できる。
- 主係数行列 $M$ から $A,B,C$ を読み取り、判別式へつなげられる。
- 主二次形式 $Ap^2+2Bpq+Cq^2$ の零方向と型の関係を説明できる。
- 可逆線形座標変換で $M'=J M J^T$ となり、型が保存されることを証明できる。
- 平方完成から定係数主部が三つの標準形へ整理される理由を再現できる。
- Laplace / heat / wave の三方程式を、低階項に惑わされず分類できる。
- 変数係数 PDE では型を点ごとに判定し、Tricomi 型のように型が変わり得ることを説明できる。
- 楕円型・放物型・双曲型で自然なデータの置き方が異なる理由を、時間微分の階数も含めて説明できる。
- Laplace 型代表式 $u_{xx}+u_{yy}=0$の Cauchy 問題が、具体列によってデータへの連続依存を失い得ることを示せる。
- 「型が分かった」ことと「well-posedness が証明できた」ことを混同しない。
