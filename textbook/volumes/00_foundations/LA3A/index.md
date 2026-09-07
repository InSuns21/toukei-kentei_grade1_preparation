# LA3A 標準線形代数 III-A：代数的双対 — ベクトルを「測る」

線形代数では、ベクトルそのものを見るだけでなく、**ベクトルから1個の数を読み取る線形な測定器**を見ると構造が急に見やすくなることがあります。

たとえば
$$
W=\{(x,y,z)\in\mathbb R^3:x+2y-z=0\}
$$
という平面は、ベクトルを並べて記述する代わりに
$$
\varphi(x,y,z)=x+2y-z
$$
という1本の線形な測定器の「値が0になる場所」としても記述できます。

この章では、まず具体的な測定器を触り、そこから

> 線形形式 → 双対空間 → 双対基底 → annihilator → 双対写像 → 二重双対

を組み立てます。定義を覚えることではなく、**「何を測っているのか」「なぜ反対向きの写像が出るのか」**を追うのが目的です。

---

## 1. まず「線形な測定器」を作る

$V=\mathbb R^3$ とし
$$
\varphi(x,y,z)=x+2y-z
$$
とします。任意の $u,v\in V$ と $a,b\in\mathbb R$ に対して
$$
\varphi(au+bv)=a\varphi(u)+b\varphi(v)
$$
です。入力はベクトルですが、出力はスカラーです。

この型の写像を一般化します。

<a id="def-la3a-linear-form"></a>
<!-- formal-statement-start -->
> **定義（線形形式）**  
> $\mathbb F=\mathbb R$ または $\mathbb C$ とし、$V$ を $\mathbb F$ 上のベクトル空間とする。線形写像
$$
\varphi:V\to\mathbb F
$$
> を **線形形式** という。
<!-- formal-statement-end -->

線形形式は足し算とスカラー倍ができます。そこで全部まとめます。

<a id="def-la3a-dual-space"></a>
<!-- formal-statement-start -->
> **定義（代数的双対）**  
> $V$ 上の線形形式全体
$$
V^*=\{\varphi:V\to\mathbb F:\varphi\text{ は線形}\}
$$
> を $V$ の **代数的双対** という。加法とスカラー倍は点ごとに定める。
<!-- formal-statement-end -->

### 座標では何に見えるか

$V=\mathbb R^n$ なら、任意の $a\in\mathbb R^n$ に対して
$$
\varphi_a(x)=a^{\mathsf T}x
$$
は線形形式です。

逆に $\varphi\in(\mathbb R^n)^*$ とし、標準基底を $e_1,\dots,e_n$ とします。
$$
a_i=\varphi(e_i)
$$
と置けば、$x=\sum_i x_i e_i$ に対して
$$
\varphi(x)=\sum_i x_i\varphi(e_i)=\sum_i a_ix_i=a^{\mathsf T}x.
$$
したがって有限次元の標準座標では、線形形式は「行ベクトルとの積」として見えます。

ただし重要なのは行ベクトルそのものではありません。**基底を選ばなくても存在する写像 $V\to\mathbb F$ が本体**です。

---

## 2. 座標を読む関数：双対基底

標準基底なら $x_1,x_2,\dots$ を読む関数はすぐ書けます。しかし基底が
$$
v_1=(1,1)^T,\qquad v_2=(1,-1)^T
$$
ならどうでしょうか。

$x=av_1+bv_2$ と書いたとき、係数 $a$ だけを返す関数、$b$ だけを返す関数が欲しくなります。これが双対基底です。

<a id="def-la3a-dual-basis"></a>
<!-- formal-statement-start -->
> **定義（双対基底）**  
> $V$ の基底 $e_1,\dots,e_n$ に対して
$$
e^i(e_j)=\delta_{ij}
$$
> を満たす線形形式 $e^1,\dots,e^n\in V^*$ を **双対基底** という。
<!-- formal-statement-end -->

つまり $e^i$ は「第 $i$ 座標だけを読む関数」です。

<a id="thm-la3a-dual-basis"></a>
<!-- formal-statement-start -->
> **定理（双対基底定理）**  
> 有限次元ベクトル空間 $V$ の任意の基底 $e_1,\dots,e_n$ に対して双対基底 $e^1,\dots,e^n$ が一意に存在し、これは $V^*$ の基底である。特に
$$
\dim V^*=\dim V.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の $x\in V$ は一意に
$$
x=\sum_{j=1}^n x_je_j
$$
と書けます。そこで
$$
e^i(x)=x_i
$$
と定めます。座標表示の一意性により、この定義は曖昧ではありません。

$x=\sum_jx_je_j$, $y=\sum_jy_je_j$ なら
$$
a x+b y=\sum_j(ax_j+by_j)e_j
$$
なので
$$
e^i(ax+by)=ax_i+by_i=ae^i(x)+be^i(y).
$$
よって $e^i$ は線形形式で、定義から $e^i(e_j)=\delta_{ij}$ です。

一意性も確認します。$f^i(e_j)=\delta_{ij}$ を満たす線形形式 $f^i$ があれば
$$
f^i(x)=\sum_jx_jf^i(e_j)=x_i=e^i(x)
$$
なので $f^i=e^i$ です。

次に任意の $\varphi\in V^*$ について
$$
\varphi(x)=\sum_jx_j\varphi(e_j)
=\sum_j\varphi(e_j)e^j(x),
$$
従って
$$
\varphi=\sum_j\varphi(e_j)e^j.
$$
よって $e^1,\dots,e^n$ は $V^*$ を張ります。

さらに
$$
\sum_i a_i e^i=0
$$
なら、$e_j$ を代入して
$$
0=\sum_i a_ie^i(e_j)=a_j.
$$
全ての $j$ で $a_j=0$ だから一次独立です。従って双対基底は $V^*$ の基底で
$$
\dim V^*=n=\dim V.
$$
$\square$
<!-- proof-end -->

### 例：非標準基底の座標を読む

先ほどの
$$
v_1=(1,1)^T,\qquad v_2=(1,-1)^T
$$
について
$$
x=av_1+bv_2
$$
なら
$$
x_1=a+b,\qquad x_2=a-b.
$$
したがって
$$
a=\frac{x_1+x_2}{2},\qquad b=\frac{x_1-x_2}{2}.
$$
よって双対基底は
$$
v^1(x)=\frac{x_1+x_2}{2},\qquad
v^2(x)=\frac{x_1-x_2}{2}.
$$
「双対基底を求める」とは、結局 **その基底での座標を読む線形形式を求めること**です。

---

## 3. 部分空間を方程式側から見る：annihilator

再び
$$
W=\{(x,y,z):x+2y-z=0\}
$$
を考えます。$W$ の全てのベクトルに対して0を返す線形形式は、$W$ を「方程式側」から記述しています。

<a id="def-la3a-annihilator"></a>
<!-- formal-statement-start -->
> **定義（annihilator / 零化空間）**  
> 部分空間 $W\subset V$ に対して
$$
W^\circ=\{\varphi\in V^*: \varphi(w)=0\ \text{for all }w\in W\}
$$
> を $W$ の **annihilator（零化空間）** という。
<!-- formal-statement-end -->

たとえば $W=\operatorname{span}(e_1,e_2)\subset\mathbb R^3$ なら
$$
W^\circ=\operatorname{span}(e^3).
$$
平面が2次元なら、それを切り出す独立な線形方程式は1本です。この感覚は一般に次元公式になります。

<a id="thm-la3a-annihilator-dimension"></a>
<!-- formal-statement-start -->
> **定理（annihilator の次元公式）**  
> $V$ を有限次元、$W\subset V$ を部分空間とすると
$$
\dim W^\circ=\dim V-\dim W=\dim(V/W).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$W$ の基底 $e_1,\dots,e_r$ を $V$ の基底
$$
e_1,\dots,e_r,e_{r+1},\dots,e_n
$$
へ延長し、双対基底を $e^1,\dots,e^n$ とします。

任意の $\varphi\in V^*$ は
$$
\varphi=\sum_{i=1}^na_ie^i
$$
と一意に書けます。$\varphi$ が $W$ を消すなら
$$
0=\varphi(e_j)=a_j\qquad(j=1,\dots,r).
$$
逆に $a_1=\cdots=a_r=0$ なら、任意の $w=\sum_{j=1}^rc_je_j\in W$ に対して $\varphi(w)=0$ です。

従って
$$
W^\circ=\operatorname{span}(e^{r+1},\dots,e^n),
$$
したがって
$$
\dim W^\circ=n-r.
$$
[LA2 の商空間の次元公式](../LA2/index.md#thm-la2-quotient-dimension)から
$$
\dim(V/W)=n-r
$$
でもあるので結論を得ます。$\square$
<!-- proof-end -->

### 商空間の線形形式は、どこから来るのか

商空間 $V/W$ では $v$ と $v+w$（$w\in W$）を同じ点とみなします。したがって $V/W$ 上の線形形式を $V$ へ戻すと、$W$ の方向は必ず0にならなければなりません。

<a id="thm-la3a-quotient-dual-annihilator"></a>
<!-- formal-statement-start -->
> **定理（商空間の双対と annihilator）**  
> $q:V\to V/W$, $q(v)=v+W$ を標準射影とする。このとき
$$
q^*:(V/W)^*\to W^\circ,\qquad q^*(\psi)=\psi\circ q
$$
> は線形同型である。従って
$$
(V/W)^*\cong W^\circ.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\psi\in(V/W)^*$ と $w\in W$ に対して $q(w)=0$ なので
$$
(q^*\psi)(w)=\psi(q(w))=0.
$$
従って $q^*\psi\in W^\circ$ です。

逆向きを具体的に作ります。$\varphi\in W^\circ$ に対して
$$
\widetilde\varphi(v+W)=\varphi(v)
$$
と置きます。$v+W=v'+W$ なら $v-v'\in W$ なので
$$
\varphi(v)-\varphi(v')=\varphi(v-v')=0.
$$
よって代表元によらず well-defined です。また
$$
\widetilde\varphi(a(v+W)+b(u+W))
=\varphi(av+bu)
=a\varphi(v)+b\varphi(u)
$$
なので線形です。

$R(\varphi)=\widetilde\varphi$ と書けば
$$
(q^*R(\varphi))(v)=R(\varphi)(v+W)=\varphi(v),
$$
また
$$
(R(q^*\psi))(v+W)=(q^*\psi)(v)=\psi(v+W).
$$
従って $q^*R=I$ かつ $Rq^*=I$ で、$q^*$ は同型です。$\square$
<!-- proof-end -->

ここでは「次元が同じだから同型」と済ませず、**商空間の代表元から写像を作り、well-defined 性まで確認した**ことが核心です。

---

## 4. 写像を通して測定器を引き戻す：双対写像

$T:V\to W$ があり、$W$ 側に測定器 $\psi:W\to\mathbb F$ があるとします。$v\in V$ を測りたければ
$$
v\xmapsto{T}Tv\xmapsto{\psi}\psi(Tv)
$$
とすればよい。つまり $\psi\circ T$ が $V$ 上の線形形式になります。

<a id="def-la3a-dual-map"></a>
<!-- formal-statement-start -->
> **定義（双対写像）**  
> 線形写像 $T:V\to W$ に対し
$$
T^*:W^*\to V^*,\qquad T^*(\psi)=\psi\circ T
$$
> を双対写像という。
<!-- formal-statement-end -->

ここで向きが
$$
V\xrightarrow{T}W
\qquad\text{に対して}\qquad
W^*\xrightarrow{T^*}V^*
$$
と**反転する**ことが重要です。これは記号上の偶然ではなく、「$W$ 上の測定器を $V$ へ引き戻している」ためです。

基底 $e_1,\dots,e_n$ と $f_1,\dots,f_m$ を取り、$T$ の表現行列を $A=(A_{ij})$ とすると
$$
T(e_j)=\sum_iA_{ij}f_i.
$$
双対基底について
$$
(T^*f^i)(e_j)=f^i(T(e_j))=A_{ij},
$$
従って
$$
T^*f^i=\sum_jA_{ij}e^j.
$$
よって $T^*$ の表現行列は $A^{\mathsf T}$ です。

ここでは内積を使っていません。したがって複素数上でも **共役転置ではなく単なる転置** が現れます。共役転置が出るのは LA5 の内積・随伴です。

---

## 5. ベクトルは「測定器を測るもの」として戻ってくる

$v\in V$ を固定すると、任意の線形形式 $\varphi\in V^*$ に対して値 $\varphi(v)$ を返すことができます。つまり $v$ 自身が $V^*$ 上の線形形式を作ります。

<a id="thm-la3a-double-dual"></a>
<!-- formal-statement-start -->
> **定理（有限次元二重双対同型）**  
> 有限次元ベクトル空間 $V$ に対し
$$
J:V\to V^{**},\qquad J(v)(\varphi)=\varphi(v)
$$
> は基底の選択によらない線形同型である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $\varphi,\psi\in V^*$ と $a,b\in\mathbb F$ に対して
$$
J(v)(a\varphi+b\psi)=a\varphi(v)+b\psi(v)
$$
なので $J(v)\in V^{**}$ です。また
$$
J(av+bw)(\varphi)=\varphi(av+bw)
=(aJ(v)+bJ(w))(\varphi)
$$
なので $J$ は線形です。

単射性を示します。$v\ne0$ とし、$v$ を含む基底
$$
v,v_2,\dots,v_n
$$
を取ります。その双対基底の第1要素を $v^1$ とすれば
$$
J(v)(v^1)=v^1(v)=1\ne0.
$$
従って $v\ne0$ なら $J(v)\ne0$ で、$J$ は単射です。

双対基底定理から
$$
\dim V^{**}=\dim V^*=\dim V.
$$
同次元有限次元空間の間の単射は全射でもあるので $J$ は同型です。

最後に、定義
$$
J(v)(\varphi)=\varphi(v)
$$
には基底が一切現れていません。基底を選んだのは単射性を証明するためだけです。従ってこの同型は、基底を選んで無理に作った同型ではなく標準的なものです。$\square$
<!-- proof-end -->

---

## 6. 章全体を1枚でつなぐ

この章の対象は全部「測定器」という見方でつながります。

- $V^*$：$V$ をスカラーで測る線形な測定器全体。
- 双対基底：選んだ基底の各座標を1個ずつ読む測定器。
- $W^\circ$：部分空間 $W$ を全部0と判定する測定器。
- $T^*$：写像 $T$ の先にある測定器を手前へ引き戻す操作。
- $V^{**}$：測定器そのものを入力とする測定器。有限次元では $V$ が自然に戻ってくる。

定義名を別々に暗記するより、この一本の像を持っておく方が後続の関数解析でも崩れにくくなります。

---

## 7. 演習

### LA3A-A01 双対基底

$V=\mathbb R^2$ の基底
$$
v_1=(1,2)^T,\qquad v_2=(1,-1)^T
$$
に対する双対基底を求めよ。

<!-- solution-start -->
**解答**：$x=av_1+bv_2$ とすると
$$
x_1=a+b,\qquad x_2=2a-b.
$$
2式を足して
$$
a=\frac{x_1+x_2}{3},
$$
従って
$$
b=x_1-a=\frac{2x_1-x_2}{3}.
$$
よって
$$
v^1(x)=\frac{x_1+x_2}{3},\qquad
v^2(x)=\frac{2x_1-x_2}{3}.
$$
実際に $v^i(v_j)=\delta_{ij}$ を確認できます。
<!-- solution-end -->

### LA3A-A02 annihilator

$$
W=\{(x,y,z):x+y+z=0\}\subset\mathbb R^3
$$
の $W^\circ$ を求めよ。

<!-- solution-start -->
**解答**：$\varphi(x,y,z)=x+y+z$ と置けば $W=\ker\varphi$ なので
$$
\operatorname{span}(\varphi)\subset W^\circ.
$$
[annihilator の次元公式](#thm-la3a-annihilator-dimension)より $\dim W=2$ なら $\dim W^\circ=1$。従って
$$
W^\circ=\operatorname{span}(\varphi).
$$
<!-- solution-end -->

### LA3A-B01 商空間の双対

$\varphi\in V^*$ が $V/W$ 上の線形形式へ降りる、すなわち
$$
\widetilde\varphi(v+W)=\varphi(v)
$$
が well-defined になるための必要十分条件が $\varphi\in W^\circ$ であることを示せ。

<!-- solution-start -->
**解答**：十分性は本文で示した通りです。逆に $\widetilde\varphi$ が well-defined なら、任意の $w\in W$ について
$$
0+W=w+W
$$
なので
$$
\varphi(w)=\widetilde\varphi(w+W)=\widetilde\varphi(0+W)=\varphi(0)=0.
$$
従って $\varphi\in W^\circ$ です。
<!-- solution-end -->

### LA3A-B02 二重双対の自然性

$T:V\to W$ に対して
$$
T^{**}\circ J_V=J_W\circ T
$$
を示せ。

<!-- solution-start -->
**解答**：$v\in V$, $\psi\in W^*$ を任意に取ると
$$
\begin{aligned}
(T^{**}J_V(v))(\psi)
&=J_V(v)(T^*\psi)\\
&=(T^*\psi)(v)\\
&=\psi(Tv)\\
&=(J_W(Tv))(\psi).
\end{aligned}
$$
全ての $\psi$ で一致するので $T^{**}J_V(v)=J_W(Tv)$。全ての $v$ で成り立つから写像等式を得ます。
<!-- solution-end -->

---

## 8. 次に進む

次の [LA3B](../LA3B/index.md) では話題を切り替えます。行列式を公式集として使うのではなく、**面積・体積倍率に欲しい性質から出発し、Leibniz 公式で一般の $n\times n$ 行列式を構成**します。