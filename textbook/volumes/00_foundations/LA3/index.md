# LA3 標準線形代数 III：代数的双対・双対基底・抽象行列式

この章では、ベクトルを「測る」側へ回ります。ベクトル $v$ 自体ではなく、$v$ をスカラーへ送る線形な測定器を集めると、元の空間を別方向から見られます。

関数解析では連続線形汎関数だけを集めた双対を使いますが、ここでは位相を入れない **代数的双対** を扱います。

---

## 1. 線形形式と代数的双対

<a id="def-la3-linear-form"></a>
<!-- formal-statement-start -->
> **定義（線形形式）**  
> $\mathbb F=\mathbb R$ または $\mathbb C$ とし、$V$ を $\mathbb F$ 上のベクトル空間とする。線形写像
$$
\varphi:V\to\mathbb F
$$
> を線形形式という。
<!-- formal-statement-end -->

<a id="def-la3-dual-space"></a>
<!-- formal-statement-start -->
> **定義（代数的双対）**  
> $V$ 上の線形形式全体
$$
V^*=\{\varphi:V\to\mathbb F:\varphi\text{ は線形}\}
$$
> を $V$ の代数的双対という。加法とスカラー倍は点ごとに定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la3-linear-form, def-la3-dual-space -->
**定義の確認**：$V=\mathbb R^n$ とします。任意の $a\in\mathbb R^n$ に対して
$$
\varphi_a(x)=a^{\mathsf T}x
$$
と置くと、任意の $x,y\in\mathbb R^n$ と $\alpha,\beta\in\mathbb R$ に対して
$$
\begin{aligned}
\varphi_a(\alpha x+\beta y)
&=a^{\mathsf T}(\alpha x+\beta y)\\
&=\alpha a^{\mathsf T}x+\beta a^{\mathsf T}y\\
&=\alpha\varphi_a(x)+\beta\varphi_a(y),
\end{aligned}
$$
なので $\varphi_a$ は線形形式です。

逆に $\varphi\in(\mathbb R^n)^*$ を任意に取り、標準基底を $e_1,\dots,e_n$ とします。
$$
a_i=\varphi(e_i)
$$
と置けば、$x=\sum_i x_i e_i$ に対して
$$
\varphi(x)
=\sum_i x_i\varphi(e_i)
=\sum_i a_i x_i
=a^{\mathsf T}x.
$$
したがって有限次元の標準座標では、全ての線形形式がこの形に書けます。

また $\varphi,\psi\in V^*$ と $c\in\mathbb F$ に対して
$$
(\varphi+\psi)(x)=\varphi(x)+\psi(x),
\qquad
(c\varphi)(x)=c\varphi(x)
$$
と定めると、和とスカラー倍も再び線形形式です。よって線形形式全体 $V^*$ 自身もベクトル空間になります。
<!-- definition-example-end -->

---

## 2. 双対基底

基底 $\mathcal B=(e_1,\dots,e_n)$ を固定します。ベクトルの座標を1成分ずつ読み取る線形形式を考えます。

<a id="def-la3-dual-basis"></a>
<!-- formal-statement-start -->
> **定義（双対基底）**  
> 基底 $e_1,\dots,e_n$ に対し
$$
e^i(e_j)=\delta_{ij}
$$
> を満たす線形形式 $e^1,\dots,e^n\in V^*$ を双対基底という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la3-dual-basis -->
**定義の確認**：$V=\mathbb R^2$ の標準基底 $e_1=(1,0)^T,e_2=(0,1)^T$ に対して
$$
e^1(x_1,x_2)=x_1,
\qquad
e^2(x_1,x_2)=x_2
$$
と置きます。すると
$$
e^1(e_1)=1,\quad e^1(e_2)=0,
$$
$$
e^2(e_1)=0,\quad e^2(e_2)=1,
$$
なので
$$
e^i(e_j)=\delta_{ij}
$$
を満たします。つまり標準双対基底は「第1座標を読む関数」「第2座標を読む関数」です。
<!-- definition-example-end -->

<a id="thm-la3-dual-basis"></a>
<!-- formal-statement-start -->
> **定理（双対基底定理）**  
> 有限次元ベクトル空間 $V$ の任意の基底 $e_1,\dots,e_n$ に対して双対基底 $e^1,\dots,e^n$ が一意に存在し、これは $V^*$ の基底である。特に
$$
\dim V^*=\dim V.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の $x\in V$ は基底 $e_1,\dots,e_n$ によって一意に
$$
x=\sum_{j=1}^n x_j e_j
$$
と書けます。そこで各 $i$ について
$$
e^i(x)=x_i
$$
と定めます。

まず線形性を確認します。$x=\sum_jx_je_j$, $y=\sum_jy_je_j$ なら
$$
\alpha x+\beta y
=\sum_j(\alpha x_j+\beta y_j)e_j
$$
なので
$$
e^i(\alpha x+\beta y)
=\alpha x_i+\beta y_i
=\alpha e^i(x)+\beta e^i(y).
$$
したがって $e^i\in V^*$ です。また $e_j$ の第 $i$ 座標は $\delta_{ij}$ なので
$$
e^i(e_j)=\delta_{ij}.
$$
これで存在が示されました。

一意性を示します。別の線形形式 $f^i$ も全ての $j$ について
$$
f^i(e_j)=\delta_{ij}
$$
を満たすとします。任意の $x=\sum_jx_je_j$ について線形性から
$$
f^i(x)=\sum_jx_jf^i(e_j)=x_i=e^i(x).
$$
よって $f^i=e^i$ です。

次に $e^1,\dots,e^n$ が $V^*$ を張ることを示します。任意の $\varphi\in V^*$ と $x=\sum_jx_je_j$ に対して
$$
\varphi(x)
=\sum_jx_j\varphi(e_j)
=\sum_j\varphi(e_j)e^j(x).
$$
これは全ての $x$ で成り立つので
$$
\varphi=\sum_j\varphi(e_j)e^j.
$$
したがって双対基底は $V^*$ を張ります。

最後に一次独立性を確認します。
$$
\sum_i a_i e^i=0
$$
とします。両辺を $e_j$ に作用させると
$$
0=\sum_i a_i e^i(e_j)=\sum_i a_i\delta_{ij}=a_j.
$$
全ての $j$ で $a_j=0$ なので一次独立です。よって $e^1,\dots,e^n$ は $V^*$ の基底であり
$$
\dim V^*=n=\dim V.
$$
$\square$
<!-- proof-end -->

ベクトルは基底で
$$
x=\sum_i e^i(x)e_i
$$
と復元できます。双対基底は「座標を抜き出す関数」です。

---

## 3. annihilator：部分空間を消す線形形式

<a id="def-la3-annihilator"></a>
<!-- formal-statement-start -->
> **定義（annihilator）**  
> 部分空間 $W\subset V$ に対して
$$
W^\circ
=
\{\varphi\in V^*: \varphi(w)=0\ \text{for all }w\in W\}
$$
> を $W$ の annihilator（零化空間）という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la3-annihilator -->
**定義の確認**：$V=\mathbb R^3$, $W=\operatorname{span}(e_1,e_2)$ とします。任意の線形形式は標準双対基底を使って
$$
\varphi=a_1e^1+a_2e^2+a_3e^3
$$
と書けます。$W$ の全てを0にするためには、特に
$$
0=\varphi(e_1)=a_1,
\qquad
0=\varphi(e_2)=a_2
$$
が必要です。逆に $a_1=a_2=0$ なら、任意の $w=x_1e_1+x_2e_2\in W$ に対して
$$
\varphi(w)=a_3e^3(w)=0.
$$
したがって
$$
W^\circ=\{a_3e^3:a_3\in\mathbb R\}
=\operatorname{span}(e^3).
$$
<!-- definition-example-end -->

<a id="thm-la3-annihilator-dimension"></a>
<!-- formal-statement-start -->
> **定理（annihilatorの次元公式）**  
> $V$ を有限次元、$W\subset V$ を部分空間とすると
$$
\dim W^\circ=\dim V-\dim W=\dim(V/W).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$W$ の基底 $e_1,\dots,e_r$ を $V$ の基底 $e_1,\dots,e_n$ へ延長し、双対基底を $e^1,\dots,e^n$ とします。

任意の $\varphi\in V^*$ は一意に
$$
\varphi=\sum_{i=1}^na_ie^i
$$
と書けます。$\varphi$ が $W$ を消すなら、$j=1,\dots,r$ について
$$
0=\varphi(e_j)=a_j.
$$
逆に $a_1=\cdots=a_r=0$ なら、任意の
$$
w=\sum_{j=1}^r c_je_j\in W
$$
に対して
$$
\varphi(w)=\sum_{j=1}^rc_j\varphi(e_j)=0.
$$
したがって
$$
W^\circ
=\operatorname{span}(e^{r+1},\dots,e^n).
$$
よって
$$
\dim W^\circ=n-r=\dim V-\dim W.
$$
さらにLA2の商空間の次元公式から
$$
\dim(V/W)=\dim V-\dim W
$$
なので結論を得ます。$\square$
<!-- proof-end -->

実際、$W^\circ$ は $(V/W)^*$ と自然に同一視できます。「$W$ を潰してから測る」ことと「最初から $W$ を0にする測定器を使う」ことは同じです。

---

## 4. 双対写像：写像を逆向きに引き戻す

線形写像
$$
T:V\to W
$$
があると、$W$ 上の線形形式 $\psi$ は $T$ と合成して $V$ 上の線形形式になります。

<a id="def-la3-dual-map"></a>
<!-- formal-statement-start -->
> **定義（双対写像）**  
> 線形写像 $T:V\to W$ に対し
$$
T^*:W^*\to V^*,
\qquad
T^*(\psi)=\psi\circ T
$$
> を双対写像という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la3-dual-map -->
**定義の確認**：$V$ の基底を $e_1,\dots,e_n$、$W$ の基底を $f_1,\dots,f_m$ とし、対応する双対基底を $e^1,\dots,e^n$、$f^1,\dots,f^m$ とします。$T$ の表現行列を $A=(A_{ij})$ とすると
$$
T(e_j)=\sum_{i=1}^mA_{ij}f_i.
$$
各 $f^i$ を双対写像で引き戻すと
$$
\begin{aligned}
(T^*f^i)(e_j)
&=f^i(T(e_j))\\
&=f^i\left(\sum_{k=1}^mA_{kj}f_k\right)\\
&=\sum_{k=1}^mA_{kj}\delta_{ik}\\
&=A_{ij}.
\end{aligned}
$$
したがって
$$
T^*f^i=\sum_{j=1}^nA_{ij}e^j.
$$
つまり $T^*$ の第 $i$ 列には $A$ の第 $i$ 行が並ぶので、双対基底に関する表現行列は
$$
A^{\mathsf T}
$$
です。複素数上でも、ここでは内積を使っていないので共役は入りません。
<!-- definition-example-end -->

双対写像は向きを反転させます。

```text
V  --T-->  W
^           ^
|           |
V* <--T*--  W*
```

これは確率・微分幾何・関数解析で現れる「pullback」の最も単純な原型です。

---

## 5. 二重双対

$V^{**}=(V^*)^*$ を考えます。各 $v\in V$ は
$$
J(v):V^*\to\mathbb F,
\qquad
J(v)(\varphi)=\varphi(v)
$$
という線形形式を定めます。

<a id="thm-la3-double-dual"></a>
<!-- formal-statement-start -->
> **定理（有限次元二重双対同型）**  
> 有限次元ベクトル空間 $V$ に対し
$$
J:V\to V^{**},
\qquad
J(v)(\varphi)=\varphi(v)
$$
> は基底の選択によらない線形同型である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $J(v)$ が $V^*$ 上の線形形式であることを確認します。$\varphi,\psi\in V^*$ と $a,b\in\mathbb F$ に対して
$$
J(v)(a\varphi+b\psi)
=(a\varphi+b\psi)(v)
=a\varphi(v)+b\psi(v),
$$
なので $J(v)\in V^{**}$ です。

次に $J:V\to V^{**}$ 自身の線形性を確認します。$v,w\in V$ と $a,b\in\mathbb F$ に対し、任意の $\varphi\in V^*$ について
$$
\begin{aligned}
J(av+bw)(\varphi)
&=\varphi(av+bw)\\
&=a\varphi(v)+b\varphi(w)\\
&=(aJ(v)+bJ(w))(\varphi).
\end{aligned}
$$
全ての $\varphi$ で値が等しいので
$$
J(av+bw)=aJ(v)+bJ(w).
$$

単射性を示します。$v\ne0$ とします。$v$ を第1ベクトルに含む基底
$$
v,v_2,\dots,v_n
$$
を取り、その双対基底の第1要素を $v^1$ とします。すると
$$
v^1(v)=1.
$$
したがって
$$
J(v)(v^1)=v^1(v)=1\ne0
$$
なので $J(v)\ne0$。よって $\ker J=\{0\}$ で $J$ は単射です。

双対基底定理から
$$
\dim V^{**}=\dim V^*=\dim V.
$$
有限次元の同次元空間の間の単射は全射でもあるので、$J$ は同型です。

最後に、$J$ の定義
$$
J(v)(\varphi)=\varphi(v)
$$
には基底が一切現れません。証明途中では単射性を示すため基底を一つ選びましたが、写像 $J$ 自体は基底の選択に依存しません。$\square$
<!-- proof-end -->

ここで同型 $J$ は**標準的**です。$V\cong V^*$ も有限次元では可能ですが、一般には基底や内積を選ばないと標準的な同型はありません。

---

## 6. 交代多重線形形式

行列式を座標公式から解放します。

<a id="def-la3-alternating-form"></a>
<!-- formal-statement-start -->
> **定義（交代多重線形形式）**  
> $n$ 個の変数を持つ写像
$$
\omega:V^n\to\mathbb F
$$
> が各変数について線形で、$v_i=v_j$ となる2つの引数があるとき常に
$$
\omega(v_1,\dots,v_n)=0
$$
> となるとき、$\omega$ を交代 $n$ 重線形形式という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la3-alternating-form -->
**定義の確認**：$V=\mathbb R^2$ で
$$
\omega((x_1,x_2),(y_1,y_2))=x_1y_2-x_2y_1
$$
とします。第1変数について
$$
\omega(au+bv,w)=a\omega(u,w)+b\omega(v,w)
$$
が成分ごとの分配法則から成り立ち、第2変数についても同様なので双線形です。また同じベクトル $x=(x_1,x_2)$ を2回入れると
$$
\omega(x,x)=x_1x_2-x_2x_1=0.
$$
よって交代2重線形形式です。絶対値は平行四辺形の面積、符号は向きを表します。
<!-- definition-example-end -->

交代性から、隣り合う2変数を入れ替えると符号が反転します。実際、他の変数を固定して2箇所だけ $u,v$ とすると
$$
0=\omega(\dots,u+v,\dots,u+v,\dots)
$$
を多重線形性で展開したとき、$u,u$ と $v,v$ の項は交代性で0になるため
$$
\omega(\dots,u,\dots,v,\dots)
+
\omega(\dots,v,\dots,u,\dots)=0.
$$
したがって交換1回ごとに符号が反転します。

<a id="thm-la3-top-alternating-one-dimensional"></a>
<!-- formal-statement-start -->
> **定理（最高次交代形式は1次元）**  
> $V$ を $n$ 次元ベクトル空間とし、基底 $e_1,\dots,e_n$ を固定する。任意の交代 $n$ 重線形形式 $\omega$ は一つの値
$$
\omega(e_1,\dots,e_n)
$$
> だけで一意に決まる。また $\omega(e_1,\dots,e_n)=1$ を満たす交代 $n$ 重線形形式が存在する。したがって交代 $n$ 重線形形式全体の空間は1次元である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の $v_1,\dots,v_n\in V$ を
$$
v_j=\sum_{i=1}^na_{ij}e_i
$$
と基底展開します。多重線形性により
$$
\omega(v_1,\dots,v_n)
$$
を展開すると、各項は
$$
a_{i_11}\cdots a_{i_nn}
\omega(e_{i_1},\dots,e_{i_n})
$$
の形です。

もし $i_1,\dots,i_n$ の中に同じ添字が2回現れれば、同じ基底ベクトルが2箇所に入るので交代性からその項は0です。$n$ 個の場所に $1,\dots,n$ を重複なく入れる場合だけ残るので、残る添字列は置換
$$
(\sigma(1),\dots,\sigma(n))
$$
に対応します。

置換 $\sigma$ は隣接交換の繰り返しで作れるので、先ほど示した符号反転から
$$
\omega(e_{\sigma(1)},\dots,e_{\sigma(n)})
=\operatorname{sgn}(\sigma)\omega(e_1,\dots,e_n).
$$
したがって
$$
\omega(v_1,\dots,v_n)
=
\left(
\sum_{\sigma}
\operatorname{sgn}(\sigma)
\prod_{j=1}^na_{\sigma(j)j}
\right)
\omega(e_1,\dots,e_n).
$$
括弧内は座標行列 $(a_{ij})$ の通常の行列式です。よって全ての値は $\omega(e_1,\dots,e_n)$ だけで決まります。

存在も同じ式を逆に使えばよいです。各 $v_j$ の座標列を並べた行列を
$$
[v_1\ \cdots\ v_n]_{\mathcal B}
$$
と書き
$$
\omega_0(v_1,\dots,v_n)
=
\det [v_1\ \cdots\ v_n]_{\mathcal B}
$$
と定めます。通常の行列式の各列に関する線形性と、同じ列を2本持つと行列式が0になる性質から、$\omega_0$ は交代 $n$ 重線形形式です。また
$$
\omega_0(e_1,\dots,e_n)=\det I=1.
$$
したがって非零な最高次交代形式は存在します。

任意の $\omega$ は
$$
\omega=\omega(e_1,\dots,e_n)\omega_0
$$
と書けるので、最高次交代形式全体は $\omega_0$ が張る1次元空間です。$\square$
<!-- proof-end -->

---

## 7. 行列式を「体積形式の倍率」として定義する

<a id="def-la3-abstract-determinant"></a>
<!-- formal-statement-start -->
> **定義（抽象行列式）**  
> $V$ を $n$ 次元ベクトル空間、$T:V\to V$ を線形写像とする。非零な交代 $n$ 重線形形式 $\omega$ を1つ取る。このとき一意なスカラー $\det T$ が存在して
$$
\omega(Tv_1,\dots,Tv_n)
=(\det T)\,\omega(v_1,\dots,v_n)
$$
> が全ての $v_1,\dots,v_n\in V$ で成り立つ。このスカラーを $T$ の抽象行列式という。
<!-- formal-statement-end -->

なぜこのスカラーが本当に存在して一意なのかを確認します。$T$ を固定し
$$
\omega_T(v_1,\dots,v_n)
=
\omega(Tv_1,\dots,Tv_n)
$$
と置きます。$T$ と $\omega$ が線形なので $\omega_T$ は多重線形であり、$v_i=v_j$ なら $Tv_i=Tv_j$ なので交代性から $\omega_T=0$。したがって $\omega_T$ も交代 $n$ 重線形形式です。

[最高次交代形式は1次元](#thm-la3-top-alternating-one-dimensional)なので、ある一意なスカラー $c$ が存在して
$$
\omega_T=c\omega.
$$
この $c$ を $\det T$ と定義しているわけです。

<!-- definition-example-start: def-la3-abstract-determinant -->
**定義の確認**：$V=\mathbb R^2$ で標準基底を使い
$$
\omega(u,v)=u_1v_2-u_2v_1
$$
とします。また
$$
T(x,y)=(2x+y,x+3y)
$$
とします。標準基底 $e_1,e_2$ について
$$
Te_1=(2,1)^T,
\qquad
Te_2=(1,3)^T
$$
なので
$$
\omega(Te_1,Te_2)=2\cdot3-1\cdot1=5.
$$
一方
$$
\omega(e_1,e_2)=1.
$$
したがって抽象行列式の定義から
$$
\det T=5.
$$
表現行列
$$
A=\begin{pmatrix}2&1\\1&3\end{pmatrix}
$$
の通常の行列式も
$$
\det A=2\cdot3-1\cdot1=5
$$
で一致します。
<!-- definition-example-end -->

一般にも、基底 $e_1,\dots,e_n$ を取り $\omega(e_1,\dots,e_n)=1$ と正規化します。$T$ の表現行列を $A=(A_{ij})$ とすると
$$
Te_j=\sum_iA_{ij}e_i.
$$
[最高次交代形式の証明](#thm-la3-top-alternating-one-dimensional)で得た展開式から
$$
\omega(Te_1,\dots,Te_n)=\det A.
$$
一方、抽象行列式の定義では左辺は
$$
(\det T)\omega(e_1,\dots,e_n)=\det T.
$$
したがって抽象行列式は通常の行列式と一致します。

また非零形式を $\omega'=c\omega$（$c\ne0$）へ取り替えても
$$
\omega'(Tv_1,\dots,Tv_n)
=c\omega(Tv_1,\dots,Tv_n)
=c(\det T)\omega(v_1,\dots,v_n)
=(\det T)\omega'(v_1,\dots,v_n)
$$
なので $\det T$ は変わりません。

<a id="thm-la3-det-multiplicative"></a>
<!-- formal-statement-start -->
> **定理（行列式の乗法性）**  
> 線形自己写像 $S,T:V\to V$ に対して
$$
\det(S\circ T)=(\det S)(\det T).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

非零な交代 $n$ 重線形形式 $\omega$ を固定します。抽象行列式の定義を $S$ と $T$ に順に使うと、任意の $v_1,\dots,v_n$ に対して
$$
\begin{aligned}
\omega(STv_1,\dots,STv_n)
&=(\det S)\omega(Tv_1,\dots,Tv_n)\\
&=(\det S)(\det T)\omega(v_1,\dots,v_n).
\end{aligned}
$$
一方、$S\circ T$ に直接定義を使えば
$$
\omega(STv_1,\dots,STv_n)
=\det(S\circ T)\,\omega(v_1,\dots,v_n).
$$

$\omega$ は非零なので、ある $u_1,\dots,u_n$ が存在して
$$
\omega(u_1,\dots,u_n)\ne0.
$$
上の2式に $v_i=u_i$ を代入すると
$$
\det(S\circ T)\,\omega(u_1,\dots,u_n)
=(\det S)(\det T)\omega(u_1,\dots,u_n).
$$
非零な $\omega(u_1,\dots,u_n)$ で割って
$$
\det(S\circ T)=(\det S)(\det T).
$$
$\square$
<!-- proof-end -->

この証明では置換の和を展開する必要がありません。行列式の乗法性は「体積倍率を続けて掛ければ倍率も掛け算になる」という構造から出ます。

---

## 8. 演習

### Level A

<a id="ex-la3-a01"></a>
#### LA3-A01 双対基底
- Level: A

$V=\mathbb R^2$ の基底 $v_1=(1,1)^T$, $v_2=(1,-1)^T$ に対する双対基底を求めよ。

<!-- solution-start -->
**解答**：$x=(x_1,x_2)^T$ を
$$
x=a v_1+b v_2
$$
と書くと
$$
x_1=a+b,
\qquad
x_2=a-b.
$$
したがって
$$
a=\frac{x_1+x_2}{2},
\qquad
b=\frac{x_1-x_2}{2}.
$$
双対基底はこの2つの座標を読み取るので
$$
v^1(x)=\frac{x_1+x_2}{2},
\qquad
v^2(x)=\frac{x_1-x_2}{2}.
$$
実際
$$
v^1(v_1)=1,\ v^1(v_2)=0,
\qquad
v^2(v_1)=0,\ v^2(v_2)=1.
$$
<!-- solution-end -->

<a id="ex-la3-a02"></a>
#### LA3-A02 annihilator
- Level: A

$W=\{(x,y,z):x+y+z=0\}\subset\mathbb R^3$ の $W^\circ$ を求めよ。

<!-- solution-start -->
**解答**：
$$
\varphi(x,y,z)=x+y+z
$$
と置けば $W=\ker\varphi$ です。よって $\varphi$ は $W$ を消すので
$$
\operatorname{span}(\varphi)\subset W^\circ.
$$
また $W$ は1本の独立な線形条件で定まる2次元部分空間なので、annihilatorの次元公式から
$$
\dim W^\circ=3-2=1.
$$
左辺にはすでに非零な $\varphi$ が入っているため
$$
W^\circ=\operatorname{span}(\varphi).
$$
<!-- solution-end -->

<a id="ex-la3-a03"></a>
#### LA3-A03 双対写像
- Level: A

$T:\mathbb R^2\to\mathbb R^2$ の標準基底での行列が
$$
A=\begin{pmatrix}1&2\\3&4\end{pmatrix}
$$
のとき、標準双対基底での $T^*$ の行列を求めよ。

<!-- solution-start -->
**解答**：標準双対基底を $e^1,e^2$ とします。
$$
T(e_1)=e_1+3e_2,
\qquad
T(e_2)=2e_1+4e_2.
$$
したがって
$$
T^*e^1=e^1\circ T=e^1+2e^2,
$$
$$
T^*e^2=e^2\circ T=3e^1+4e^2.
$$
よって表現行列は
$$
\begin{pmatrix}1&3\\2&4\end{pmatrix}
=A^{\mathsf T}.
$$
<!-- solution-end -->

<a id="ex-la3-a04"></a>
#### LA3-A04 面積倍率
- Level: A

$T(x,y)=(2x,3y)$ の抽象行列式を求めよ。

<!-- solution-start -->
**解答**：標準面積形式
$$
\omega(u,v)=u_1v_2-u_2v_1
$$
を使います。$Te_1=(2,0)^T$, $Te_2=(0,3)^T$ なので
$$
\omega(Te_1,Te_2)=2\cdot3=6,
$$
一方 $\omega(e_1,e_2)=1$。したがって
$$
\det T=6.
$$
<!-- solution-end -->

### Level B

<a id="ex-la3-b01"></a>
#### LA3-B01 quotient dual と annihilator
- Level: B

$W\subset V$ とし、$q:V\to V/W$ を標準射影とする。双対写像
$$
q^*:(V/W)^*\to V^*
$$
の像が $W^\circ$ であることを示せ。

<!-- solution-start -->
**解答**：まず $\psi\in(V/W)^*$ とします。$w\in W$ なら
$$
q(w)=w+W=W
$$
は商空間の零元なので
$$
(q^*\psi)(w)=\psi(q(w))=\psi(0)=0.
$$
よって
$$
\operatorname{Im}q^*\subset W^\circ.
$$

逆に $\varphi\in W^\circ$ とします。
$$
\psi(v+W)=\varphi(v)
$$
と定めます。$v+W=v'+W$ なら $v-v'\in W$ なので
$$
\varphi(v)-\varphi(v')=\varphi(v-v')=0.
$$
したがって $\psi$ は代表元によらずwell-definedです。線形性は $\varphi$ の線形性から従い
$$
(q^*\psi)(v)=\psi(v+W)=\varphi(v).
$$
よって $q^*\psi=\varphi$。したがって
$$
\operatorname{Im}q^*=W^\circ.
$$
<!-- solution-end -->

<a id="ex-la3-b02"></a>
#### LA3-B02 二重双対の自然性
- Level: B

$T:V\to W$ に対して、標準写像 $J_V:V\to V^{**}$, $J_W:W\to W^{**}$ が
$$
T^{**}\circ J_V=J_W\circ T
$$
を満たすことを示せ。

<!-- solution-start -->
**解答**：$v\in V$, $\psi\in W^*$ を任意に取ります。
$$
\begin{aligned}
(T^{**}J_V(v))(\psi)
&=J_V(v)(T^*\psi)\\
&=(T^*\psi)(v)\\
&=\psi(Tv).
\end{aligned}
$$
一方
$$
(J_W(Tv))(\psi)=\psi(Tv).
$$
全ての $\psi$ で値が一致するので
$$
T^{**}J_V(v)=J_W(Tv).
$$
全ての $v$ で成り立つため所望の写像等式を得ます。
<!-- solution-end -->

<a id="ex-la3-b03"></a>
#### LA3-B03 determinant と可逆性
- Level: B

有限次元 $V$ の線形自己写像 $T$ について、$T$ が可逆なら $\det T\ne0$ を抽象行列式の乗法性から示せ。

<!-- solution-start -->
**解答**：$T^{-1}\circ T=I$ なので、行列式の乗法性から
$$
\det(T^{-1})\det T=\det I.
$$
恒等写像は体積を1倍するので $\det I=1$。したがって
$$
\det(T^{-1})\det T=1.
$$
積が1なので $\det T\ne0$ です。
<!-- solution-end -->

### Level C

<a id="ex-la3-c01"></a>
#### LA3-C01 最高次交代形式の具体計算
- Level: C

$V=\mathbb R^3$、標準基底を $e_1,e_2,e_3$ とし、交代3重線形形式 $\omega$ が
$$
\omega(e_1,e_2,e_3)=2
$$
を満たすとする。
$$
v_1=(1,1,0)^T,
\quad
v_2=(0,1,1)^T,
\quad
v_3=(1,0,1)^T
$$
について $\omega(v_1,v_2,v_3)$ を求めよ。

<!-- solution-start -->
**解答**：[最高次交代形式は1次元](#thm-la3-top-alternating-one-dimensional)の証明から
$$
\omega(v_1,v_2,v_3)
=
\det\begin{pmatrix}
1&0&1\\
1&1&0\\
0&1&1
\end{pmatrix}
\omega(e_1,e_2,e_3).
$$
行列式は
$$
1(1\cdot1-0\cdot1)+1(1\cdot1-1\cdot0)=2
$$
なので
$$
\omega(v_1,v_2,v_3)=2\cdot2=4.
$$
<!-- solution-end -->

---

## 9. 次に進む

双対と行列式を座標から切り離せました。次は自己写像 $T$ に多項式 $p(T)$ を代入し、**特性多項式・最小多項式・Cayley–Hamilton・一般化固有空間・Jordan構造**へ進みます。
