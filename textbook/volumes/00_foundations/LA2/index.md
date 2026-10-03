# LA2 直和・補空間・商空間

[F0-00E](../F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影/index.md#def-f0-00e-sum-direct-sum) で部分空間の和・直和を定義しました。直和があれば、ベクトルを「二つの成分へ一意に分ける」ことができます。

しかし、ある部分空間 $U$ の方向を**無視したいだけ**なら、残す方向をわざわざ選ぶ必要はありません。例えば $\mathbb R^2$ で横方向

$$
U=\operatorname{span}(e_1)
$$

を無視したいなら、$(2,3)^T$ と $(5,3)^T$ は横方向の違いしかないので「同じもの」として扱いたくなります。この発想を、補空間を選ばずに定式化するのが商空間です。

この章では、**空間を具体的に分ける補空間**と、**不要な方向だけを指定して潰す商空間**を対にして扱い、最後に線形写像が核を潰した後の空間と像が同じ線形構造を持つことを示します。

---

## 1. 補空間

<a id="def-la2-complement"></a>
<!-- formal-statement-start -->
> **定義（補空間）**  
> ベクトル空間 $V$ の部分空間 $U,W$ が
$$
V=U\oplus W
$$
> を満たすとき、$W$ を $U$ の補空間という。
<!-- formal-statement-end -->

$V=U\oplus W$ は
$$
U+W=V,
\qquad
U\cap W=\{0\}
$$
を意味します。この2条件から、任意の $x\in V$ は一意に
$$
x=u+w,
\qquad u\in U,\ w\in W
$$
と分解できます。実際、もし
$$
x=u_1+w_1=u_2+w_2
$$
なら
$$
u_1-u_2=w_2-w_1.
$$
左辺は $U$、右辺は $W$ に入るので共通の値は $U\cap W=\{0\}$ に属し
$$
u_1=u_2,
\qquad
w_1=w_2.
$$

<!-- definition-example-start: def-la2-complement -->
**定義の確認**：$V=\mathbb R^2$、
$$
U=\operatorname{span}(e_1),
\qquad
W=\operatorname{span}(e_2)
$$
とします。任意の $(x,y)^T$ は
$$
(x,y)^T=xe_1+ye_2
$$
と書けるので $U+W=\mathbb R^2$。また
$$
ae_1=be_2
$$
なら座標比較から $a=b=0$ なので
$$
U\cap W=\{0\}.
$$
従って
$$
\mathbb R^2=U\oplus W.
$$

補空間は一意ではありません。例えば
$$
W'=\operatorname{span}(e_1+e_2)
$$
でも、任意の $(x,y)^T$ は
$$
(x,y)^T=(x-y)e_1+y(e_1+e_2)
$$
と書け、$ae_1=b(e_1+e_2)$ なら第2成分から $b=0$、従って $a=0$。よって
$$
\mathbb R^2=U\oplus W'
$$
でもあります。
<!-- definition-example-end -->

具体例では補空間を目で見て選べましたが、有限次元の一般の部分空間でも必ず補空間を作れるのでしょうか。ここでは、$U$ の基底を $V$ の基底まで延長し、**追加した基底ベクトルが張る部分空間を補空間にする**ことで存在を示します。

<a id="thm-la2-complement-existence"></a>
<!-- formal-statement-start -->
> **定理（有限次元補空間の存在）**  
> 有限次元ベクトル空間 $V$ の任意の部分空間 $U$ に対して、ある部分空間 $W$ が存在して
$$
V=U\oplus W
$$
> となる。
<!-- formal-statement-end -->

### 証明の見取り図

$U$ の基底を $V$ の基底へ延長します。追加したベクトルの線形包を $W$ とすれば、基底全体が $V$ を張ることから $U+W=V$、基底全体の一次独立性から $U\cap W=\{0\}$ が従います。

<!-- proof-start -->
### 証明

$U$ の基底を
$$
u_1,\dots,u_r
$$
とします。[基底延長定理](../F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影/index.md#thm-basis-extension) により、ある $w_1,\dots,w_s$ を追加して
$$
u_1,\dots,u_r,w_1,\dots,w_s
$$
を $V$ の基底にできます。そこで
$$
W=\operatorname{span}(w_1,\dots,w_s)
$$
と置きます。

任意の $x\in V$ はこの基底により
$$
x=\sum_{i=1}^ra_iu_i+\sum_{j=1}^sb_jw_j
$$
と書けます。第1項は $U$、第2項は $W$ に入るので
$$
V=U+W.
$$

次に $U\cap W=\{0\}$ を示します。$x\in U\cap W$ とすると
$$
x=\sum_i a_i u_i=\sum_j b_jw_j.
$$
従って
$$
\sum_i a_iu_i-\sum_jb_jw_j=0.
$$
$u_1,\dots,u_r,w_1,\dots,w_s$ は一次独立なので全係数が0です。よって $x=0$。

従って
$$
V=U\oplus W.
$$
$\square$
<!-- proof-end -->

この構成で追加する基底ベクトルの選び方は一般に一意ではありません。したがって、有限次元では補空間は必ず存在しますが、**一般のベクトル空間ではどの補空間を選ぶかは標準的には決まりません**。

---

## 2. 商空間は「差が $W$ に入るものを同じとみなす」

部分空間 $W\subset V$ を固定します。$x,y\in V$ に対して
$$
x\sim y
\quad\Longleftrightarrow\quad
x-y\in W
$$
と定めます。

これは同値関係です。反射律は $x-x=0\in W$、対称律は $x-y\in W$ なら $y-x=-(x-y)\in W$、推移律は $x-y,y-z\in W$ なら
$$
x-z=(x-y)+(y-z)\in W
$$
から従います。

$x$ と同値な元全体は

$$
x+W=\{x+w:w\in W\}
$$

で、これを $x$ の剰余類と呼びます。

後で代表元を取り替えるために、剰余類が一致する条件をここで確認します。

$$
x+W=y+W
\quad\Longleftrightarrow\quad
x-y\in W.
$$

実際、$x+W=y+W$ なら $x\in x+W=y+W$ なので、ある $w\in W$ が存在して $x=y+w$、従って $x-y=w\in W$ です。

逆に $x-y\in W$ とします。$z\in x+W$ なら $z=x+w$ と書けるので

$$
z=y+\bigl((x-y)+w\bigr).
$$

$(x-y)+w\in W$ だから $z\in y+W$ であり、$x+W\subseteq y+W$ です。同じ議論を $x,y$ を入れ替えて行えば $y+W\subseteq x+W$ も得られるので、

$$
x+W=y+W
$$

です。

この「$W$ の方向だけ違うベクトルを同じ元にまとめる」集合に、元の加法とスカラー倍を移したいのですが、剰余類には代表元が多数あります。そこで演算を定義した後、**どの代表元を選んでも結果が同じになること**を必ず確認します。

<a id="def-la2-quotient"></a>
<!-- formal-statement-start -->
> **定義（商空間）**  
> 部分空間 $W\subset V$ に対し、剰余類 $x+W$ 全体の集合
$$
V/W=\{x+W:x\in V\}
$$
> に
$$
(x+W)+(y+W)=(x+y)+W,
$$
$$
\alpha(x+W)=(\alpha x)+W
$$
> と演算を定める。これらの演算が代表元によらず良定義であり、ベクトル空間の公理を満たすとき、このベクトル空間を商空間という。
<!-- formal-statement-end -->

ここで最初に確認すべきなのは、代表元を変えても演算結果が変わらないことです。

<!-- proof-start -->
### 演算が良定義であり、ベクトル空間になることの確認

まず加法が良定義であることを示します。
$$
x+W=x'+W,
\qquad
y+W=y'+W
$$
とします。これは
$$
x-x'\in W,
\qquad
y-y'\in W
$$
を意味します。$W$ は部分空間なので和も $W$ に入り
$$
(x+y)-(x'+y')
=(x-x')+(y-y')
\in W.
$$
従って
$$
(x+y)+W=(x'+y')+W.
$$

スカラー倍も同様です。$x+W=x'+W$ なら
$$
x-x'\in W.
$$
部分空間はスカラー倍で閉じているので
$$
\alpha x-\alpha x'
=\alpha(x-x')
\in W.
$$
従って
$$
\alpha x+W=\alpha x'+W.
$$
これで2つの演算は代表元によらず定まりました。

次にベクトル空間の演算則を確認します。剰余類での演算は $V$ の演算をそのまま移したものなので、各公理は $V$ の対応する等式へ戻して確認できます。

加法の結合則は

$$
\begin{aligned}
((x+W)+(y+W))+(z+W)
&=((x+y)+z)+W\\
&=(x+(y+z))+W\\
&=(x+W)+((y+W)+(z+W)).
\end{aligned}
$$

交換則も

$$
(x+W)+(y+W)
=(x+y)+W
=(y+x)+W
=(y+W)+(x+W)
$$

です。零元は $W=0+W$ で、

$$
(x+W)+W=x+W.
$$

$x+W$ の加法逆元は $(-x)+W$ です。実際、

$$
(x+W)+((-x)+W)=0+W=W.
$$

スカラー倍については

$$
1(x+W)=x+W
$$

であり、$\alpha,\beta$ をスカラーとすると

$$
\begin{aligned}
\alpha(\beta(x+W))
&=\alpha((\beta x)+W)\\
&=(\alpha\beta x)+W\\
&=(\alpha\beta)(x+W),
\end{aligned}
$$

さらに

$$
\begin{aligned}
\alpha((x+W)+(y+W))
&=\alpha((x+y)+W)\\
&=(\alpha x+\alpha y)+W\\
&=\alpha(x+W)+\alpha(y+W),
\end{aligned}
$$

および

$$
\begin{aligned}
(\alpha+\beta)(x+W)
&=((\alpha+\beta)x)+W\\
&=(\alpha x+\beta x)+W\\
&=\alpha(x+W)+\beta(x+W)
\end{aligned}
$$

が成り立ちます。従って $V/W$ はこの演算でベクトル空間になります。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-la2-quotient -->
**定義の確認**：$V=\mathbb R^2$、
$$
W=\operatorname{span}(e_1)
=\{(t,0)^T:t\in\mathbb R\}
$$
とします。剰余類は
$$
(x,y)+W
=\{(x+t,y)^T:t\in\mathbb R\}
$$
なので、$x$ 座標だけが変わる水平線全体です。

2つの剰余類が等しい条件は
$$
(x,y)+W=(x',y')+W
\iff (x-x',y-y')\in W
\iff y=y'.
$$
従って剰余類を区別するのは $y$ 座標だけです。

実際
$$
\Phi:V/W\to\mathbb R,
\qquad
\Phi((x,y)+W)=y
$$
と置くと、上の条件から代表元によらず良定義です。また
$$
\Phi(((x,y)+W)+((x',y')+W))
=y+y'
$$
なので線形です。任意の $r\in\mathbb R$ は
$$
\Phi((0,r)+W)=r
$$
と得られるので全射、$\Phi((x,y)+W)=0$ なら $y=0$ なので $(x,0)\in W$、従って剰余類は零元 $W$ です。よって単射でもあり
$$
V/W\cong\mathbb R.
$$
<!-- definition-example-end -->

---

## 3. 標準射影

商空間を作ると、各 $x\in V$ を「$W$ の方向の違いを忘れた剰余類 $x+W$」へ送る自然な写像があります。新しい写像を人工的に探す必要はなく、元をその剰余類へ送るだけです。この写像の核がちょうど $W$ になることで、「$W$ を0へ潰す」という商空間の意味が線形写像として見えるようになります。

<a id="def-la2-canonical-projection"></a>
<!-- formal-statement-start -->
> **定義（標準射影）**  
> 商空間 $V/W$ に対し
$$
\pi:V\to V/W,
\qquad
\pi(x)=x+W
$$
> で定める線形写像を標準射影という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la2-canonical-projection -->
**定義の確認**：任意の $x,y\in V$ とスカラー $\alpha$ に対して
$$
\begin{aligned}
\pi(x+y)
&=(x+y)+W\\
&=(x+W)+(y+W)\\
&=\pi(x)+\pi(y),
\end{aligned}
$$
$$
\pi(\alpha x)
=\alpha x+W
=\alpha(x+W)
=\alpha\pi(x).
$$
従って $\pi$ は線形です。

また
$$
\begin{aligned}
x\in\ker\pi
&\iff \pi(x)=W\\
&\iff x+W=W\\
&\iff x\in W.
\end{aligned}
$$
よって
$$
\ker\pi=W.
$$
つまり商空間を作る操作は、ちょうど $W$ の方向を0へ潰します。
<!-- definition-example-end -->

---

## 4. 商空間の次元

$W$ の方向を0へ潰すと、有限次元では自由度が何個減るのでしょうか。$W$ の基底を $V$ の基底へ延長すると、$W$ に属する基底ベクトルは商空間では0になり、**延長時に追加した基底ベクトルだけが残る**はずです。これを生成性と一次独立性の両方から確認します。

<a id="thm-la2-quotient-dimension"></a>
<!-- formal-statement-start -->
> **定理（商空間の次元公式）**  
> $V$ を有限次元ベクトル空間、$W\subset V$ を部分空間とすると
$$
\dim(V/W)=\dim V-\dim W.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$W$ の基底 $w_1,\dots,w_r$ を $V$ の基底へ延長し、追加されたベクトルを $v_1,\dots,v_s$ とします。商空間では $w_i+W=W$ が零元になるので、$v_j+W$ だけで全体を張れます。また、その線形結合が零剰余類なら元の線形結合が $W$ に戻るため、基底全体の一次独立性から全係数が0になります。

<!-- proof-start -->
### 証明

$W$ の基底を
$$
w_1,\dots,w_r
$$
とし、[基底延長定理](../F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影/index.md#thm-basis-extension)で
$$
w_1,\dots,w_r,v_1,\dots,v_s
$$
を $V$ の基底にします。ここで
$$
r+s=\dim V.
$$

商空間で
$$
v_1+W,\dots,v_s+W
$$
が基底になることを示します。

まず生成性です。任意の $x\in V$ は
$$
x=\sum_{i=1}^ra_iw_i+\sum_{j=1}^sb_jv_j
$$
と書けます。従って商空間では
$$
\begin{aligned}
x+W
&=\left(\sum_i a_iw_i+\sum_jb_jv_j\right)+W\\
&=\sum_i a_i(w_i+W)+\sum_jb_j(v_j+W).
\end{aligned}
$$
しかし $w_i\in W$ なので
$$
w_i+W=W
$$
は零元です。よって
$$
x+W=\sum_jb_j(v_j+W).
$$
従って $v_j+W$ たちは $V/W$ を張ります。

次に一次独立性です。
$$
\sum_{j=1}^s b_j(v_j+W)=W
$$
とします。これは
$$
\left(\sum_jb_jv_j\right)+W=W
$$
なので
$$
\sum_jb_jv_j\in W.
$$
従ってある $a_i$ が存在して
$$
\sum_jb_jv_j=\sum_ia_iw_i.
$$
移項すると
$$
\sum_jb_jv_j-\sum_ia_iw_i=0.
$$
元の $w_i,v_j$ は $V$ の基底なので全係数が0です。特に
$$
b_j=0
$$
が全ての $j$ で成り立ちます。

従って $v_1+W,\dots,v_s+W$ は $V/W$ の基底で
$$
\dim(V/W)=s=\dim V-r=\dim V-\dim W.
$$
$\square$
<!-- proof-end -->

この公式は「$W$ の自由度を潰した残りが商空間」という直感そのものです。

---

## 5. 第一同型定理

線形写像 $T:V\to Z$ は $\ker T$ の中では何も区別できません。実際
$$
x-y\in\ker T
$$
なら
$$
T(x)-T(y)=T(x-y)=0
$$
なので
$$
T(x)=T(y).
$$
そこで「$\ker T$ だけ違うベクトル」を最初から同じものとして扱います。

ここで欲しいのは単なる次元の一致ではなく、剰余類そのものを像のベクトルへ送る具体的な対応です。候補は

$$
x+\ker T\longmapsto T(x)
$$

しかありません。証明では、まず代表元を変えても $T(x)$ が変わらないことを確認し、その後に線形性・全射性・単射性を順に示します。

<a id="thm-la2-first-isomorphism"></a>
<!-- formal-statement-start -->
> **定理（第一同型定理）**  
> 線形写像 $T:V\to Z$ に対し
$$
\widetilde T:V/\ker T\to\operatorname{Im}T,
\qquad
\widetilde T(x+\ker T)=T(x)
$$
> は良定義な線形同型である。したがって
$$
V/\ker T\cong\operatorname{Im}T.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず良定義であることを示します。
$$
x+\ker T=y+\ker T
$$
なら
$$
x-y\in\ker T.
$$
従って
$$
T(x-y)=0,
$$
線形性から
$$
T(x)-T(y)=0,
$$
すなわち
$$
T(x)=T(y).
$$
よって剰余類の代表元を変えても $\widetilde T$ の値は変わりません。

次に線形性を確認します。任意の剰余類 $x+\ker T,y+\ker T$ とスカラー $a,b$ に対して
$$
\begin{aligned}
\widetilde T(a(x+\ker T)+b(y+\ker T))
&=\widetilde T((ax+by)+\ker T)\\
&=T(ax+by)\\
&=aT(x)+bT(y)\\
&=a\widetilde T(x+\ker T)+b\widetilde T(y+\ker T).
\end{aligned}
$$
従って線形です。

全射性を示します。任意の $z\in\operatorname{Im}T$ に対し、像の定義からある $x\in V$ が存在して
$$
z=T(x).
$$
すると
$$
z=\widetilde T(x+\ker T).
$$
従って $\widetilde T$ は全射です。

最後に単射性を示します。
$$
\widetilde T(x+\ker T)=0
$$
とすると
$$
T(x)=0.
$$
従って $x\in\ker T$ なので
$$
x+\ker T=\ker T,
$$
これは商空間の零元です。従って
$$
\ker\widetilde T=\{\ker T\}
$$
で、$\widetilde T$ は単射です。

よって $\widetilde T$ は線形同型で
$$
V/\ker T\cong\operatorname{Im}T.
$$
$\square$
<!-- proof-end -->

有限次元なら次元を取って
$$
\dim(V/\ker T)=\dim\operatorname{Im}T.
$$
商空間の次元公式を左辺に使うと
$$
\dim V-\dim\ker T=\dim\operatorname{Im}T,
$$
となり、[階数・退化次数の定理](../F0_00F_線形写像_固有空間_スペクトル定理_SVD/index.md#thm-f0-00f-01) が回収されます。

つまり階数・退化次数の定理は、第一同型定理の「次元だけを数えた影」です。

---

## 6. 直和と商空間は何が違うか

$V=U\oplus W$ と補空間 $W$ を**選べば**
$$
V/U\cong W
$$
です。この同型も実際に書けます。標準射影
$$
\pi:V\to V/U
$$
を $W$ に制限して
$$
\pi|_W:W\to V/U,
\qquad
w\mapsto w+U
$$
とします。

$\pi|_W(w)=U$ なら $w\in U$。もともと $w\in W$ なので
$$
w\in U\cap W=\{0\}
$$
で単射です。また任意の $x+U\in V/U$ に対し直和分解
$$
x=u+w
$$
を取れば
$$
x+U=w+U,
$$
従って全射です。よって $W\cong V/U$。

ただし、この同型には補空間 $W$ の**選択**が入っています。商空間 $V/U$ 自体は補空間を選ばなくても定義できます。

- 直和分解：残す方向を具体的に選ぶ。
- 商空間：潰す方向だけ指定する。

補空間は一般に非一意ですが、商空間は $U$ を指定すれば標準的に決まります。

---

## 7. 演習

### Level A

<a id="ex-la2-a01"></a>
#### LA2-A01 補空間
- Level: A

$U=\operatorname{span}((1,1,0)^T)\subset\mathbb R^3$ の補空間を1つ与えよ。

<!-- solution-start -->
**解答**：例えば
$$
W=\operatorname{span}(e_2,e_3)
$$
とします。
$$
(1,1,0)^T,\ e_2,\ e_3
$$
が一次独立であることを確認します。
$$
a(1,1,0)^T+be_2+ce_3=0
$$
なら第1成分から $a=0$、第2成分から $b=0$、第3成分から $c=0$。3本の一次独立なベクトルは $\mathbb R^3$ の基底なので
$$
\mathbb R^3=U\oplus W.
$$
<!-- solution-end -->

<a id="ex-la2-a02"></a>
#### LA2-A02 同じ剰余類
- Level: A

$W=\operatorname{span}((1,0)^T)\subset\mathbb R^2$ とする。$(2,3)^T+W$ と $(5,3)^T+W$ が同じ剰余類であることを示せ。

<!-- solution-start -->
**解答**：代表元の差は
$$
(2,3)^T-(5,3)^T=(-3,0)^T=-3(1,0)^T\in W.
$$
従って定義から
$$
(2,3)^T+W=(5,3)^T+W.
$$
<!-- solution-end -->

<a id="ex-la2-a03"></a>
#### LA2-A03 商空間の次元
- Level: A

$W=\{x\in\mathbb R^4:x_1+x_2+x_3+x_4=0\}$ とする。$\dim(\mathbb R^4/W)$ を求めよ。

<!-- solution-start -->
**解答**：$W$ は線形写像
$$
f:\mathbb R^4\to\mathbb R,
\qquad
f(x)=x_1+x_2+x_3+x_4
$$
の核です。$f(e_1)=1$ なので $f$ は全射で階数は1。[階数・退化次数の定理](../F0_00F_線形写像_固有空間_スペクトル定理_SVD/index.md#thm-f0-00f-01)から
$$
\dim W=4-1=3.
$$
従って[商空間の次元公式](#thm-la2-quotient-dimension)より
$$
\dim(\mathbb R^4/W)=4-3=1.
$$
<!-- solution-end -->

<a id="ex-la2-a04"></a>
#### LA2-A04 標準射影の核
- Level: A

$\pi:V\to V/W$ の核を求めよ。

<!-- solution-start -->
**解答**：
$$
\begin{aligned}
x\in\ker\pi
&\iff \pi(x)=W\\
&\iff x+W=W\\
&\iff x\in W.
\end{aligned}
$$
従って
$$
\ker\pi=W.
$$
<!-- solution-end -->

### Level B

<a id="ex-la2-b01"></a>
#### LA2-B01 第一同型定理を具体化する
- Level: B

$T:\mathbb R^3\to\mathbb R^2$, $T(x,y,z)=(x+y,y+z)$ とする。$\ker T$ を求め、$\mathbb R^3/\ker T\cong\mathbb R^2$ を確認せよ。

<!-- solution-start -->
**解答**：$T(x,y,z)=0$ は
$$
x+y=0,
\qquad
y+z=0
$$
なので
$$
x=-y,
\qquad
z=-y.
$$
従って
$$
(x,y,z)=y(-1,1,-1)
$$
で
$$
\ker T=\operatorname{span}((-1,1,-1)^T).
$$

また
$$
T(1,0,0)=(1,0),
\qquad
T(0,0,1)=(0,1)
$$
なので像は $\mathbb R^2$ 全体です。[第一同型定理](#thm-la2-first-isomorphism)から
$$
\mathbb R^3/\ker T\cong\operatorname{Im}T=\mathbb R^2.
$$
次元も
$$
3-1=2
$$
で一致します。
<!-- solution-end -->

<a id="ex-la2-b02"></a>
#### LA2-B02 商空間の基底
- Level: B

$W=\operatorname{span}(e_1,e_2)\subset\mathbb R^4$ とする。$\mathbb R^4/W$ の基底を1つ与えよ。

<!-- solution-start -->
**解答**：任意の
$$
x=x_1e_1+x_2e_2+x_3e_3+x_4e_4
$$
に対して $x_1e_1+x_2e_2\in W$ なので
$$
x+W=x_3(e_3+W)+x_4(e_4+W).
$$
従って $e_3+W,e_4+W$ は商空間を張ります。

また
$$
a(e_3+W)+b(e_4+W)=W
$$
なら
$$
ae_3+be_4\in W=\operatorname{span}(e_1,e_2).
$$
標準基底の一次独立性から $a=b=0$。従って
$$
e_3+W,\ e_4+W
$$
が基底です。
<!-- solution-end -->

<a id="ex-la2-b03"></a>
#### LA2-B03 補空間依存・商空間非依存
- Level: B

$U=\operatorname{span}(e_1)\subset\mathbb R^2$ に対し、異なる2つの補空間 $W_1,W_2$ を挙げ、それぞれが $\mathbb R^2/U$ と同型になることを説明せよ。

<!-- solution-start -->
**解答**：例えば
$$
W_1=\operatorname{span}(e_2),
\qquad
W_2=\operatorname{span}(e_1+e_2).
$$
どちらも $U$ との交わりが0で、$U$ と合わせて $\mathbb R^2$ を張るので補空間です。

標準射影 $\pi:\mathbb R^2\to\mathbb R^2/U$ を各 $W_i$ に制限します。$w\in W_i$ で $\pi(w)=U$ なら $w\in U\cap W_i=\{0\}$ なので単射。任意の $x+U$ は直和分解 $x=u+w$ により
$$
x+U=w+U=\pi(w)
$$
と書けるので全射。従って
$$
W_i\cong\mathbb R^2/U
$$
です。
<!-- solution-end -->

### Level C

<a id="ex-la2-c01"></a>
#### LA2-C01 商を経由する写像
- Level: C

線形写像 $S:V\to Y$ が $W\subset\ker S$ を満たすとする。ある一意な線形写像 $\overline S:V/W\to Y$ が存在して
$$
S=\overline S\circ\pi
$$
となることを示せ。

<!-- solution-start -->
**解答**：候補は
$$
\overline S(x+W)=S(x)
$$
以外にありません。まず良定義性を確認します。$x+W=y+W$ なら
$$
x-y\in W\subset\ker S,
$$
従って
$$
S(x-y)=0,
$$
すなわち $S(x)=S(y)$。よって代表元によらず定まります。

線形性は
$$
\begin{aligned}
\overline S(a(x+W)+b(y+W))
&=\overline S((ax+by)+W)\\
&=S(ax+by)\\
&=aS(x)+bS(y)\\
&=a\overline S(x+W)+b\overline S(y+W)
\end{aligned}
$$
から従います。また
$$
(\overline S\circ\pi)(x)
=\overline S(x+W)
=S(x),
$$
なので
$$
S=\overline S\circ\pi.
$$

一意性を示します。$R:V/W\to Y$ も
$$
S=R\circ\pi
$$
を満たすとします。任意の剰余類 $x+W$ に対して
$$
R(x+W)=R(\pi(x))=S(x)=\overline S(x+W).
$$
従って $R=\overline S$。よって一意です。
<!-- solution-end -->

---

## 8. 次に進む

次はベクトルそのものではなく、ベクトルをスカラーへ送る線形写像を集めた **代数的双対** を導入します。そこから双対基底・annihilator・双対写像、さらに抽象的な行列式へ進みます。
