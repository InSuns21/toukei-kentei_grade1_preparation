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
> **定義（代数的双対空間）**  
> $V$ 上の線形形式全体
$$
V^*=\{\varphi:V\to\mathbb F:\varphi\text{ は線形}\}
$$
> を $V$ の代数的双対空間という。加法とスカラー倍は点ごとに定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la3-linear-form, def-la3-dual-space -->
**定義の確認**：$V=\mathbb R^n$ なら、任意の $a\in\mathbb R^n$ に対して
$$
\varphi_a(x)=a^{\mathsf T}x
$$
は線形形式です。有限次元では逆に全ての線形形式がこの形に書けます。ただしこの表示は標準内積と標準基底を使った座標表示であり、$V^*$ 自体の定義には内積は不要です。
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

任意の $x\in V$ は一意に
$$
x=\sum_{j=1}^n x_j e_j
$$
と書けるので
$$
e^i(x)=x_i
$$
と定めれば線形で、$e^i(e_j)=\delta_{ij}$ を満たします。基底上の値が線形写像を一意に決めるため一意です。

任意の $\varphi\in V^*$ について
$$
\varphi(x)=\sum_jx_j\varphi(e_j)
$$
だから
$$
\varphi=\sum_j\varphi(e_j)e^j.
$$
よって $e^1,\dots,e^n$ は $V^*$ を張ります。一次独立性は
$$
\sum_i a_i e^i=0
$$
に $e_j$ を代入して $a_j=0$ と分かります。$\square$
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
**定義の確認**：$V=\mathbb R^3$, $W=\operatorname{span}(e_1,e_2)$ なら、$W$ の全てを0にする線形形式は第3座標だけを見るものなので
$$
W^\circ=\operatorname{span}(e^3).
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

$W$ の基底 $e_1,\dots,e_r$ を $V$ の基底 $e_1,\dots,e_n$ へ延長し、双対基底を $e^1,\dots,e^n$ とします。$\varphi=\sum_i a_i e^i$ が $W$ を消すための必要十分条件は
$$
\varphi(e_j)=a_j=0\qquad(j\le r)
$$
です。したがって
$$
W^\circ=\operatorname{span}(e^{r+1},\dots,e^n)
$$
で、次元は $n-r$。商空間の次元公式と一致します。$\square$
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
**定義の確認**：基底を選び $T$ の表現行列を $A$ とすると、双対基底に関する $T^*$ の表現行列は $A^{\mathsf T}$ です。ここでは複素数上でも単なる転置です。後の内積空間で出る共役転置 $A^*$ は、代数的双対写像ではなく随伴作用素の行列表現です。
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

$J$ は明らかに線形です。$v\ne0$ なら、$v$ を含む基底を取り、その $v$ 成分を読む双対基底要素 $\varphi$ を取れば $\varphi(v)=1$。したがって $J(v)\ne0$ で、$J$ は単射です。

有限次元では
$$
\dim V^{**}=\dim V^*=\dim V
$$
なので、同次元間の単射は全射でもあります。$\square$
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
**定義の確認**：$\mathbb R^2$ では
$$
\omega((x_1,x_2),(y_1,y_2))=x_1y_2-x_2y_1
$$
は双線形で、同じベクトルを2回入れると0なので交代2重線形形式です。絶対値は平行四辺形の面積、符号は向きを表します。
<!-- definition-example-end -->

$\dim V=n$ とし基底 $e_1,\dots,e_n$ を取ると、交代性と多重線形性により、任意の交代 $n$ 重線形形式は値
$$
\omega(e_1,\dots,e_n)
$$
だけで決まります。したがって非零な最高次交代形式は互いにスカラー倍です。

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

<!-- definition-example-start: def-la3-abstract-determinant -->
**定義の確認**：$V=\mathbb R^2$ で標準面積形式を使うと、$T$ が単位正方形の向き付き面積を何倍にするかが $\det T$ です。基底を選んで $T$ を行列 $A$ で表せば、この定義は通常の $\det A$ に一致します。
<!-- definition-example-end -->

最高次交代形式全体が1次元なので、$\omega$ を別の非零形式 $c\omega$ に変えても両辺に同じ $c$ が掛かり、$\det T$ は変わりません。

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

抽象行列式の定義を2回使うと
$$
\begin{aligned}
\omega(STv_1,\dots,STv_n)
&=(\det S)\omega(Tv_1,\dots,Tv_n)\\
&=(\det S)(\det T)\omega(v_1,\dots,v_n).
\end{aligned}
$$
一方、左辺は $S\circ T$ の定義から
$$
\det(S\circ T)\,\omega(v_1,\dots,v_n)
$$
です。非零な $\omega$ を使っているので係数が一致します。$\square$
<!-- proof-end -->

この証明では置換の和を展開する必要がありません。行列式の乗法性は「体積倍率を続けて掛ければ倍率も掛け算になる」という構造から直ちに出ます。

---

## 8. 演習

### Level A

<a id="ex-la3-a01"></a>
#### LA3-A01 双対基底
- Level: A

$V=\mathbb R^2$ の基底 $v_1=(1,1)^T$, $v_2=(1,-1)^T$ に対する双対基底を求めよ。

<!-- solution-start -->
**解答**：$x=(x_1,x_2)^T=a v_1+b v_2$ では $a=(x_1+x_2)/2$, $b=(x_1-x_2)/2$。したがって
$$
v^1(x)=\frac{x_1+x_2}{2},\qquad
v^2(x)=\frac{x_1-x_2}{2}.
$$
<!-- solution-end -->

<a id="ex-la3-a02"></a>
#### LA3-A02 annihilator
- Level: A

$W=\{(x,y,z):x+y+z=0\}\subset\mathbb R^3$ の $W^\circ$ を求めよ。

<!-- solution-start -->
**解答**：$W$ は線形形式 $\varphi(x,y,z)=x+y+z$ の核なので
$$
W^\circ=\operatorname{span}(\varphi).
$$
次元公式でも $3-2=1$。
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
**解答**：双対写像の行列は転置なので
$$
A^{\mathsf T}=\begin{pmatrix}1&3\\2&4\end{pmatrix}.
$$
<!-- solution-end -->

<a id="ex-la3-a04"></a>
#### LA3-A04 面積倍率
- Level: A

$T(x,y)=(2x,3y)$ の抽象行列式を求めよ。

<!-- solution-start -->
**解答**：標準面積形式に対し
$$
\omega(Tu,Tv)=6\omega(u,v)
$$
なので $\det T=6$。
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
**解答**：$q^*(\psi)=\psi\circ q$ は $w\in W$ に対し $q(w)=0$ なので $W$ を消し、像は $W^\circ$ に含まれる。逆に $\varphi\in W^\circ$ なら $\psi(v+W)=\varphi(v)$ と定められる。$W$ 上で0なのでwell-definedで、$q^*\psi=\varphi$。
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
**解答**：$v\in V$, $\psi\in W^*$ に対し
$$
(T^{**}J_V(v))(\psi)=J_V(v)(T^*\psi)=(T^*\psi)(v)=\psi(Tv),
$$
一方
$$
(J_W(Tv))(\psi)=\psi(Tv).
$$
よって一致する。
<!-- solution-end -->

<a id="ex-la3-b03"></a>
#### LA3-B03 determinant と可逆性
- Level: B

有限次元 $V$ の線形自己写像 $T$ について、$T$ が可逆なら $\det T\ne0$ を抽象行列式の乗法性から示せ。

<!-- solution-start -->
**解答**：$T^{-1}T=I$ なので
$$
1=\det I=\det(T^{-1})\det T.
$$
したがって $\det T$ は0ではない。
<!-- solution-end -->

### Level C

<a id="ex-la3-c01"></a>
#### LA3-C01 最高次交代形式は1次元
- Level: C

$\dim V=n$ とし、基底 $e_1,\dots,e_n$ を固定する。任意の交代 $n$ 重線形形式 $\omega$ が $\omega(e_1,\dots,e_n)$ だけで一意に決まることを示せ。

<!-- solution-start -->
**解答**：各 $v_j=\sum_i a_{ij}e_i$ を多重線形性で展開すると、同じ基底ベクトルを2回含む項は交代性で0になる。残るのは $(e_1,\dots,e_n)$ の置換だけで、置換 $\sigma$ の項は交換のたび符号が反転するため
$$
\omega(e_{\sigma(1)},\dots,e_{\sigma(n)})
=\operatorname{sgn}(\sigma)\omega(e_1,\dots,e_n).
$$
したがって全ての値が1つのスカラーから決まる。特に最高次交代形式全体は1次元。
<!-- solution-end -->

---

## 9. 次に進む

双対と行列式を座標から切り離せました。次は自己写像 $T$ に多項式 $p(T)$ を代入し、**特性多項式・最小多項式・Cayley–Hamilton・一般化固有空間・Jordan構造**へ進みます。
