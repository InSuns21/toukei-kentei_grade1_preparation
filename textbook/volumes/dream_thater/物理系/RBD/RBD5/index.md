# RBD5 四元数による姿勢表現

<!-- definition-example-audit: strict -->

> **前提**：[RBD1 の向きを保つ回転行列](../RBD1/index.md#def-rbd1-proper-rotation)、[RBD2 の軸角表示](../RBD2/index.md#def-rbd2-axis-angle)と[Rodriguesの公式](../RBD2/index.md#thm-rbd2-rodrigues)、[RBD3 の物体角速度](../RBD3/index.md#def-rbd3-angular-velocity)、[RBD4 の Euler角の特異性](../RBD4/index.md#thm-rbd4-regular-inverse)。三次元の右手系、列ベクトルに作用する能動回転を一貫して用いる。角度の単位はラジアンとする。

## 1. Euler角の特異点を避けるには

[RBD4 の逆変換](../RBD4/index.md#thm-rbd4-regular-inverse)では、$\theta=0,\pi$ において三つの角度速度から物体角速度への行列が階数を失いました。姿勢 $R\in SO(3)$ 自体は壊れません。ここでは角度の三成分を毎回解き直す代わりに、**四つの実数に長さ1という一条件を課した表示**を使います。この表示は Euler角のような局所的な角度速度の割り算を必要としません。

ただし自由度が四つに増えるわけではありません。単位長の条件が一つあり、さらに符号を反転しても同じ姿勢です。まず掛け算の規則から始め、その規則が回転の合成と時間微分にどう結び付くかを計算します。

以後、スカラーを先頭に置く $q=(a,u)$（$a\in\mathbb R,\ u=(u_1,u_2,u_3)\in\mathbb R^3$）を用います。四元数の積は **Hamilton積**、角速度は物体系 $\omega_b$、姿勢行列は物体系の列ベクトルを空間系へ移す $R(q)$ です。異なる並びの四元数成分や受動回転の公式を混ぜないでください。

## 2. 四元数の積と長さ

普通の四成分ベクトルには回転の順序を記録する掛け算がありません。ここでは既習の内積とベクトル積を組み合わせます。

<a id="def-rbd5-hamilton"></a>

<!-- formal-statement-start -->
### 定義（四元数と Hamilton積）

四元数とは、実数 $a$ と三次元実ベクトル $u$ の組 $q=(a,u)$ である。$p=(b,v)$ との Hamilton積、共役、ノルムを

$$
\boxed{q\otimes p=(ab-u\cdot v,\;av+bu+u\times v)},
$$

$$
q^*=(a,-u),\qquad \lVert q\rVert=\sqrt{a^2+\lVert u\rVert^2}
$$

で定める。$1=(1,0)$ は積の単位元、$(0,x)$ はベクトル $x$ に対応する純虚四元数とする。積の順序は一般に交換できない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rbd5-hamilton -->
### 直接例：二つの基底の積

**定義の確認**：Hamilton積のスカラー・ベクトル成分、共役、ノルムを、三次元の標準基底でそれぞれ直接検算します。

$i=(0,e_1)$、$j=(0,e_2)$、$k=(0,e_3)$ を実際に代入します。$e_1\cdot e_2=0$、$e_1\times e_2=e_3$ なので

$$
i\otimes j=(0,e_3)=k,\qquad
j\otimes i=(0,-e_3)=-k.
$$

また $i\otimes i=(-e_1\cdot e_1,0)=(-1,0)$ です。共役は $i^*=-i$、ノルムは $\lVert i\rVert=1$。**積、共役、長さの各条件**を元の定義へ代入して確認しました。回転が非可換であることに対応する積の順序差が、ここですでに現れます。
<!-- definition-example-end -->

<a id="rbd5-associativity"></a>

積は結合的です。これは未証明の規則として使わず、必要な恒等式を確認しておきます。三つの四元数を $(a,u),(b,v),(c,w)$ としたとき、両方の括り方のスカラー成分の差は

$$
-(u\times v)\cdot w+u\cdot(v\times w)=0
$$

です。ベクトル成分の差は、共通の線形項を消すと

$$
-(u\cdot v)w+(u\times v)\times w
+(v\cdot w)u-u\times(v\times w)=0
$$

です。後式の二つの三重積に

$$
(u\times v)\times w=v(u\cdot w)-u(v\cdot w),\quad
u\times(v\times w)=v(u\cdot w)-w(u\cdot v)
$$

を代入すると打ち消されます。したがって $(q\otimes p)\otimes r=q\otimes(p\otimes r)$ です。

<a id="prop-rbd5-norm-product"></a>

<!-- formal-statement-start -->
### 命題（四元数の共役とノルムの乗法性）

任意の四元数 $p,q$ に対し、

$$
(q\otimes p)^*=p^*\otimes q^*,\qquad
q\otimes q^*=q^*\otimes q=(\lVert q\rVert^2,0),
$$

$$
\boxed{\lVert q\otimes p\rVert=\lVert q\rVert\lVert p\rVert}
$$

が成り立つ。$q\ne0$ の積に関する逆元は $q^{-1}=q^*/\lVert q\rVert^2$ である。
<!-- formal-statement-end -->

### 証明の見取り図

共役すると積の順番が逆になることを成分から確かめます。次に結合則で $(q\otimes p)(q\otimes p)^*$ を組み替えれば、長さの積が現れます。

<!-- proof-start -->
### 証明

$q=(a,u),p=(b,v)$ とすると、積の共役は

$$
(q\otimes p)^*=(ab-u\cdot v,-av-bu-u\times v).
$$

他方

$$
p^*\otimes q^*=(b,-v)\otimes(a,-u)
=(ab-v\cdot u,-bu-av+v\times u)
$$

であり、$v\times u=-u\times v$ より一致します。定義に $p=q^*$ を入れると

$$
q\otimes q^*=(a^2+u\cdot u,-au+au-u\times u)
=(a^2+\lVert u\rVert^2,0)
$$

を得ます。交換した順でも同じです。結合則と実スカラー $(c,0)$ が積で通常のスカラー倍になることから

$$
\begin{aligned}
(q\otimes p)\otimes(q\otimes p)^*
&=q\otimes p\otimes p^*\otimes q^*\\
&=\lVert p\rVert^2(q\otimes q^*)\\
&=(\lVert q\rVert^2\lVert p\rVert^2,0).
\end{aligned}
$$

左辺は $\lVert q\otimes p\rVert^2$ をスカラー成分とするので、非負平方根を取って結論です。$q\ne0$ では $\lVert q\rVert^2>0$ であり、共役との積の式を割れば左右逆元が得られます。
<!-- proof-end -->

## 3. 単位四元数から三次元の回転を作る

ノルムが $1$ の四元数は逆元が共役と一致します。三次元のベクトル $x$ を純虚四元数 $(0,x)$ とみなし、前後から掛けることで回転させます。なぜ最後に元の三次元へ戻せるかも計算します。

<a id="def-rbd5-attitude"></a>

<!-- formal-statement-start -->
### 定義（単位四元数による姿勢）

四元数 $q=(a,u)$ が $\lVert q\rVert=1$ を満たすとき単位四元数という。この $q$ によるベクトル $x\in\mathbb R^3$ の姿勢写像 $R(q)$ を

$$
\boxed{(0,R(q)x)=q\otimes(0,x)\otimes q^*}
$$

で定める。ここで $x$ は物体系の列ベクトル、$R(q)x$ は空間系への像を意味する。この写像が実際に向きを保つ回転になることは、以下の例と定理で確かめる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rbd5-attitude -->
### 直接例：$z$ 軸の四分の一回転

**定義の確認**：単位ノルムをまず検査し、純虚四元数を挟み込んで三本の基底の像を求め、回転行列の直交性と行列式も確かめます。

$c=s=1/\sqrt2$ とし、$q=(c,se_3)$ を選びます。まず $c^2+s^2=1$ より単位四元数です。$x=e_1$ を代入すると

$$
q\otimes(0,e_1)=(0,ce_1+se_2)
$$

です。これに $q^*=(c,-se_3)$ を右から掛けると、スカラー成分は $0$、ベクトル成分は

$$
c(ce_1+se_2)+(ce_1+se_2)\times(-se_3)
=(c^2-s^2)e_1+2cs\,e_2=e_2
$$

となります。従って $R(q)e_1=e_2$ です。残りの二本についても、まず Hamilton積の定義に代入すると

$$
q\otimes(0,e_2)=(0,ce_2-se_1),\qquad
q\otimes(0,e_3)=(-s,ce_3)
$$

となり、さらに右から $q^*$ を掛ければ

$$
\begin{aligned}
q\otimes(0,e_2)\otimes q^*
  &=(0,(c^2-s^2)e_2-2cs\,e_1)=(0,-e_1),\\
q\otimes(0,e_3)\otimes q^*
  &=(0,(c^2+s^2)e_3)=(0,e_3)
\end{aligned}
$$

です。写像は各 $x$ に線形に作用するので、**標準基底の像を順に列へ並べたもの**がその行列表示です（[RBD1 の回転行列の定義と列表示](../RBD1/index.md#def-rbd1-proper-rotation)）。従って

$$
R(q)=\begin{pmatrix}0&-1&0\\1&0&0\\0&0&1\end{pmatrix}
=R_z(\pi/2),\qquad
R(q)^TR(q)=I_3,\qquad \det R(q)=1.
$$

軸 $e_3$ を固定し、他の二本を右手系の正方向へ四分の一回転させています。列の直交性と行列式の両方を検査したため、定義どおり $R(q)\in SO(3)$ と判定できます。
<!-- definition-example-end -->

<a id="thm-rbd5-rodrigues"></a>

<!-- formal-statement-start -->
### 定理（単位四元数の回転公式と軸角表示）

$q=(a,u)$、$a^2+\lVert u\rVert^2=1$ とする。このとき定義した写像は $R(q)\in SO(3)$ であり、

$$
\boxed{R(q)x=(a^2-\lVert u\rVert^2)x+2u(u\cdot x)+2a(u\times x)}
$$

を満たす。とくに単位軸 $n\in\mathbb R^3$ と実角 $\alpha$ に対し

$$
q_\alpha=\left(\cos\frac\alpha2,\;n\sin\frac\alpha2\right)
$$

とおけば、$R(q_\alpha)$ は軸 $n$ まわりの角 $\alpha$ の右手系能動回転となる。
<!-- formal-statement-end -->

### 証明の見取り図

純虚四元数を左右から掛け、スカラー成分が消えることを確かめます。出てくる三重ベクトル積を分解すると [RBD2 の Rodrigues公式](../RBD2/index.md#thm-rbd2-rodrigues)と同じ形になります。長さと向きの保存は四元数のノルムから別に確認します。

<!-- proof-start -->
### 証明

まず定義どおり二回掛けます。

$$
q\otimes(0,x)=(-u\cdot x,\;ax+u\times x).
$$

これに $(a,-u)$ を右から掛けたスカラー成分は

$$
-a(u\cdot x)+(ax+u\times x)\cdot u
=-a(u\cdot x)+a(x\cdot u)=0.
$$

ベクトル成分は

$$
\begin{aligned}
&(-u\cdot x)(-u)+a(ax+u\times x)
+(ax+u\times x)\times(-u)\\
&=(u\cdot x)u+a^2x+2a(u\times x)
-(u\times x)\times u.
\end{aligned}
$$

ここで $(u\times x)\times u=\lVert u\rVert^2x-(u\cdot x)u$ を代入すれば、表示した公式です。

$q_\alpha$ に $a=\cos(\alpha/2)$、$u=n\sin(\alpha/2)$ を入れ、

$$
\cos^2\frac\alpha2-\sin^2\frac\alpha2=\cos\alpha,\quad
2\sin^2\frac\alpha2=1-\cos\alpha,\quad
2\sin\frac\alpha2\cos\frac\alpha2=\sin\alpha
$$

を使うと

$$
R(q_\alpha)x=x\cos\alpha+(n\times x)\sin\alpha
+n(n\cdot x)(1-\cos\alpha).
$$

これは軸を固定し直交平面を $\alpha$ 回す [Rodriguesの回転公式](../RBD2/index.md#thm-rbd2-rodrigues)です。

最後に $SO(3)$ の条件を確かめます。[ノルムの乗法性](#prop-rbd5-norm-product)により

$$
\lVert(0,R(q)x)\rVert
=\lVert q\rVert\lVert(0,x)\rVert\lVert q^*\rVert
=\lVert x\rVert.
$$

直前の成分公式は $x$ に線形です。すべての $x,y$ に対してノルム保存を $x+y$ にも使い、

$$
2(R(q)x)\cdot(R(q)y)
=\lVert R(q)(x+y)\rVert^2-\lVert R(q)x\rVert^2-\lVert R(q)y\rVert^2
=2x\cdot y
$$

を得ます。$x=e_i,y=e_j$ と取れば三列の内積は $\delta_{ij}$ なので、$R(q)^TR(q)=I_3$ です。従って行列式は $\pm1$ です。

さらに $u\ne0$ なら $n=u/\lVert u\rVert$ は単位軸で、$a^2+\lVert u\rVert^2=1$ から $\cos(\alpha/2)=a$、$\sin(\alpha/2)=\lVert u\rVert$ を満たす $\alpha\in(0,2\pi)$ を選べます。このとき $q=q_\alpha$ です。$u=0$ なら $a=1$ または $-1$ なので、それぞれ $\alpha=0$ または $2\pi$ として $q=q_\alpha$ と書けます。$t\in[0,1]$ に沿った $q_{t\alpha}$ は単位長の連続な経路であり、$R(q_{t\alpha})$ の行列式は常に $\pm1$、始点の $R(q_0)=I_3$ では $1$ です。従って行列式は符号を変えず、$\det R(q)=1$ が示されました。
<!-- proof-end -->

公式を標準基底 $e_1,e_2,e_3$ に順に作用させて列へ並べると、$u=(u_1,u_2,u_3)$ に対して

$$
R(q)=\begin{pmatrix}
1-2(u_2^2+u_3^2)&2(u_1u_2-au_3)&2(u_1u_3+au_2)\\
2(u_1u_2+au_3)&1-2(u_1^2+u_3^2)&2(u_2u_3-au_1)\\
2(u_1u_3-au_2)&2(u_2u_3+au_1)&1-2(u_1^2+u_2^2)
\end{pmatrix}.
$$

例えば第1列は $(a^2-\lVert u\rVert^2)e_1+2u_1u+2a(u\times e_1)$ から得られます。第1成分に $a^2+\lVert u\rVert^2=1$ を代入すれば $1-2(u_2^2+u_3^2)$ です。**どの基底で何が行列の列になるか**を確認してから、各成分を使用してください。

## 4. $q$ と $-q$ は同じ姿勢

四元数の符号は物体の向きとは別の情報です。二つの異なる単位四元数が同じ姿勢を与える場合、その違いが本当に符号だけか調べます。

<a id="thm-rbd5-double-cover"></a>

<!-- formal-statement-start -->
### 定理（姿勢表示の二重性）

単位四元数 $p,q$ について

$$
\boxed{R(p)=R(q)\quad\Longleftrightarrow\quad p=q\ \text{または}\ p=-q}
$$

が成り立つ。さらに任意の $R\in SO(3)$ は何らかの単位四元数 $q$ によって $R=R(q)$ と表せる。
<!-- formal-statement-end -->

### 証明の見取り図

符号を二回掛ければ消えます。逆方向では、二つの姿勢が一致するときの四元数比が**どの純虚四元数とも交換する**ことから、そのベクトル成分がゼロだと示します。全回転が表せることには [Eulerの回転定理](../RBD2/index.md#thm-rbd2-euler-axis)を使います。

<!-- proof-start -->
### 証明

$( -q)\otimes(0,x)\otimes(-q)^*=q\otimes(0,x)\otimes q^*$ なので $R(-q)=R(q)$ です。

逆に $R(p)=R(q)$ とします。単位四元数では $p^{-1}=p^*$ です。各 $x$ に対する $p\otimes(0,x)\otimes p^*=q\otimes(0,x)\otimes q^*$ の左から $p^*$、右から $q$ を掛けると

$$
(0,x)\otimes (p^*\otimes q)
=(p^*\otimes q)\otimes(0,x)
$$

です。$r=p^*\otimes q=(c,v)$ とおくと、この両辺のベクトル成分はそれぞれ $cx+x\times v$、$cx+v\times x$ となるので、$v\times x=0$ がすべての $x$ で成り立ちます。$v\ne0$ なら $v$ に直交する非零 $x$ とのベクトル積は非零ですから矛盾します。よって $v=0$。また [ノルムの乗法性](#prop-rbd5-norm-product)から $\lVert r\rVert=1$ なので $r=(1,0)$ または $(-1,0)$、すなわち $q=p$ または $q=-p$ です。

任意の $R\in SO(3)$ は [Eulerの回転定理](../RBD2/index.md#thm-rbd2-euler-axis)により軸角 $(n,\alpha)$ を持ちます。[単位四元数の回転公式](#thm-rbd5-rodrigues)へその軸角を代入した $q_\alpha$ が $R$ を表します。
<!-- proof-end -->

**符号切替の落とし穴**：固定した単位軸 $n$ に対し $q(t)=(\cos(t/2),n\sin(t/2))$ を考えます。$t=0$ では $q=1$、$t=2\pi$ では $q=-1$ ですが、どちらも $R(q)=I_3$ です。$q(t)$ は途中で連続しています。毎回スカラー成分を非負にする規則は $t=\pi$ の前後で $q$ の符号を突然反転させ、滑らかな運動の四元数表示を不連続にします。**局所的な Euler角の特異点を除いたことは、符号の区別が消えることではありません。**

## 5. 有限回転は Hamilton積で合成する

<a id="prop-rbd5-composition"></a>

<!-- formal-statement-start -->
### 命題（Hamilton積と能動回転の合成）

単位四元数 $p,q$ に対して

$$
\boxed{R(q\otimes p)=R(q)R(p)}
$$

が成り立つ。右辺は列ベクトルへ先に $R(p)$、次に $R(q)$ が作用する。
<!-- formal-statement-end -->

### 証明の見取り図

[第2節で成分から確認した結合則](#rbd5-associativity)と[共役の積の順序](#prop-rbd5-norm-product)を使い、$q\otimes p$ による純虚四元数の挟み込みを、まず $p$、次に $q$ の挟み込みに分けます。

<!-- proof-start -->
### 証明

[ノルムの乗法性](#prop-rbd5-norm-product)から $\lVert q\otimes p\rVert=1$ です。任意の $x$ について

$$
\begin{aligned}
&(q\otimes p)\otimes(0,x)\otimes(q\otimes p)^*\\
&=q\otimes\bigl(p\otimes(0,x)\otimes p^*\bigr)\otimes q^*\\
&=q\otimes(0,R(p)x)\otimes q^*\\
&=(0,R(q)R(p)x).
\end{aligned}
$$

二番目の等式には先に示した積の結合則と $(q\otimes p)^*=p^*\otimes q^*$ を使用しました。すべての $x$ で像が等しいので $R(q\otimes p)=R(q)R(p)$ です。
<!-- proof-end -->

実際に軸の違う二回の回転を掛けてみましょう。$q_x=(c,ce_1)$、$q_y=(c,ce_2)$、$c=1/\sqrt2$ とすると

$$
q_x\otimes q_y=\left(\frac12,\frac12(e_1+e_2+e_3)\right),
\qquad
q_y\otimes q_x=\left(\frac12,\frac12(e_1+e_2-e_3)\right).
$$

いずれも長さ1ですが、ベクトル部分の第三成分が異なります。[合成命題](#prop-rbd5-composition)と [RBD2 の有限回転の非可換性](../RBD2/index.md#prop-rbd2-noncommuting)が同じ事実の二つの表示だと分かります。

## 6. 物体角速度から姿勢を時間発展させる

[角速度の空間・物体対応](../RBD3/index.md#prop-rbd3-angular-conjugacy)では

$$
\dot R=R\widehat{\omega_b}
=\widehat{\omega_s}R,\qquad \omega_s=R\omega_b
$$

を導きました。ここでも上点は時刻 $t$ による常微分で、$\dot q=dq/dt$、$\dot R=dR(q(t))/dt$ です。$R(q)$ を $q$ について偏微分する記号ではありません。物体系の角速度 $\omega_b$ と空間系の角速度 $\omega_s$ は [RBD3 の定義](../RBD3/index.md#def-rbd3-angular-velocity)に従います。四元数の微分は上式を再現する必要があります。角速度は三成分ですが、四元数の微分は四成分であり、そのうち長さ方向の増減がゼロになることが要点です。

<a id="thm-rbd5-attitude-ode"></a>

<!-- formal-statement-start -->
### 定理（単位四元数と物体角速度の時間発展）

区間 $I$ 上で $q:I\to\mathbb R^4$ が $C^1$ 級の単位四元数であり、$R(t)=R(q(t))$ とする。$R(t)$ の物体角速度を [RBD3 の定義](../RBD3/index.md#def-rbd3-angular-velocity)により $\widehat{\omega_b}=R^T\dot R$ と定めると

$$
\boxed{\dot q=\frac12q\otimes(0,\omega_b)}.
$$

逆に連続な $\omega_b:I\to\mathbb R^3$ に対し、$C^1$ 級の解 $q$ がこの微分方程式を満たし、ある時刻 $t_0$ に $\lVert q(t_0)\rVert=1$ なら、すべての $t\in I$ で単位長を保ち、その姿勢は $\dot R=R\widehat{\omega_b}$ を満たす。空間角速度を使う同値な式は

$$
\dot q=\frac12(0,\omega_s)\otimes q,\qquad
\omega_s=R(q)\omega_b
$$

である。
<!-- formal-statement-end -->

### 証明の見取り図

まず $q^*\otimes\dot q$ が純虚になることを単位長の微分から調べます。それを $(0,\eta/2)$ と書き、四元数による回転を微分すると、ベクトル積の交換子 $\eta\times x$ が出ます。これを [物体角速度の定義](../RBD3/index.md#def-rbd3-angular-velocity)と比較します。

<!-- proof-start -->
### 証明

$q^*\otimes q=(1,0)$ を時間微分すると $\dot q^*\otimes q+q^*\otimes\dot q=0$ です。積の共役公式から前者は後者の共役なので、$q^*\otimes\dot q$ のスカラー成分はゼロです。そこで一意な $\eta\in\mathbb R^3$ を用いて

$$
q^*\otimes\dot q=\frac12(0,\eta),\qquad
\dot q=\frac12q\otimes(0,\eta)
$$

と書けます。固定した $x\in\mathbb R^3$ の回転像 $X(t)=q(t)\otimes(0,x)\otimes q(t)^*$ を微分します。共役の微分から

$$
\dot q^*=-\frac12(0,\eta)\otimes q^*
$$

です。実際、共役と時間微分は成分ごとに交換できるので、$\dot q^*=(\dot q)^*=\frac12((0,\eta)^*\otimes q^*)$ です。従って

$$
\begin{aligned}
\dot X
&=\frac12q\otimes(0,\eta)\otimes(0,x)\otimes q^*
-\frac12q\otimes(0,x)\otimes(0,\eta)\otimes q^*\\
&=q\otimes(0,\eta\times x)\otimes q^*\\
&=(0,R(q)(\eta\times x)).
\end{aligned}
$$

二行目は $(0,\eta)\otimes(0,x)-(0,x)\otimes(0,\eta)=(0,2\eta\times x)$ から従います。したがって $\dot R x=R(\eta\times x)$、すなわち $R^T\dot R=\widehat\eta$。角速度の一意性から $\eta=\omega_b$ です。

逆に微分方程式から $q=(a,u)$ の成分を取り出すと

$$
\boxed{\dot a=-\frac12u\cdot\omega_b,\qquad
\dot u=\frac12(a\omega_b+u\times\omega_b)}
$$

です。よって

$$
\frac{d}{dt}(a^2+\lVert u\rVert^2)
=2a\dot a+2u\cdot\dot u
=-a(u\cdot\omega_b)+a(u\cdot\omega_b)
+u\cdot(u\times\omega_b)=0.
$$

初期値が単位長なら全時刻で単位長です。前半と同じ微分計算を逆に用いて $\dot R=R\widehat{\omega_b}$ を得ます。最後に

$$
q\otimes(0,\omega_b)\otimes q^*=(0,R(q)\omega_b)
=(0,\omega_s)
$$

の右から $q$ を掛ければ、空間角速度による左乗算の式です。
<!-- proof-end -->

**計算例：特異姿勢を通過する回転**。$q(t)=(\cos(t/2),e_2\sin(t/2))$ とします。$R(q(t))=R_y(t)$ は $t=0$ を滑らかに通過します。$\dot a=-\sin(t/2)/2$、$\dot u=e_2\cos(t/2)/2$ を上の成分式へ代入すると $\omega_b=e_2$ を得ます。[RBD4 の座標特異性](../RBD4/index.md#prop-rbd4-coordinate-singularity)で $\theta=0$ における Euler角の逆変換は一意でありませんでしたが、四元数の右辺には $\sin\theta$ による除算がありません。

## 7. 時間刻みで姿勢を更新するときの注意

角速度を積分する際は、単位長を維持しなければ $q^{-1}=q^*$ という前提を失います。時間刻み $h>0$ の陽的 Euler 更新と、短い区間で角速度が一定の場合の厳密更新を比べます。

<a id="prop-rbd5-updates"></a>

<!-- formal-statement-start -->
### 命題（Euler更新のノルム誤差と一定角速度の厳密更新）

$\lVert q_n\rVert=1$、物体角速度 $\omega\in\mathbb R^3$ と刻み幅 $h>0$ を与える。陽的 Euler 更新

$$
q_{n+1}^{\mathrm E}=q_n+\frac h2q_n\otimes(0,\omega)
$$

では

$$
\boxed{\lVert q_{n+1}^{\mathrm E}\rVert^2
=1+\frac{h^2}{4}\lVert\omega\rVert^2}.
$$

一方、区間中 $\omega_b(t)=\omega$ が一定なら、$\omega\ne0$ に対する厳密更新は

$$
\boxed{q(t_n+h)=q_n\otimes
\left(\cos\frac{\lVert\omega\rVert h}{2},
\frac{\omega}{\lVert\omega\rVert}\sin\frac{\lVert\omega\rVert h}{2}\right)}.
$$

$\omega=0$ なら $q(t_n+h)=q_n$ とする。
<!-- formal-statement-end -->

### 証明の見取り図

Euler更新は $q_n$ に対し、右側へ $(1,h\omega/2)$ を掛ける式です。[ノルムの乗法性](#prop-rbd5-norm-product)を直接当てます。厳密解は半角の三角関数を微分して、[姿勢の微分方程式](#thm-rbd5-attitude-ode)を満たすか確かめます。

<!-- proof-start -->
### 証明

Euler更新を $q_n\otimes(1,h\omega/2)$ と書き換えます。[ノルムの乗法性](#prop-rbd5-norm-product)と初期長さから

$$
\lVert q_{n+1}^{\mathrm E}\rVert^2
=\lVert q_n\rVert^2\lVert(1,h\omega/2)\rVert^2
=1+\frac{h^2}{4}\lVert\omega\rVert^2
$$

です。$\omega\ne0$ として $\lambda=\lVert\omega\rVert$、$n=\omega/\lambda$ とおき、$r(s)=(\cos(\lambda s/2),n\sin(\lambda s/2))$ と定めます。積を計算すれば

$$
\begin{aligned}
r(s)\otimes(0,\omega)
&=(-\lambda\sin(\lambda s/2),\ \lambda n\cos(\lambda s/2)),\\
\dot r(s)&=\frac12r(s)\otimes(0,\omega).
\end{aligned}
$$

さらに $r(0)=1$、$\lVert r(s)\rVert^2=\cos^2(\lambda s/2)+\sin^2(\lambda s/2)=1$ です。$q(t_n+s)=q_n\otimes r(s)$ と置き、結合則で $\dot q=\frac12q\otimes(0,\omega)$、$q(t_n)=q_n$ が従います。これは線形常微分方程式の初期値問題の解であり、一意性から厳密更新です。$\omega=0$ の場合は $\dot q=0$ です。
<!-- proof-end -->

Euler更新を使う場合は $q_{n+1}^{\mathrm E}/\lVert q_{n+1}^{\mathrm E}\rVert$ と規格化できます。ただし**規格化は長さのずれを直すだけ**で、有限刻み幅に伴う回転角の誤差を消しません。また非定数の $\omega_b(t)$ に一定角速度の式を一歩ずつ適用するのは近似であり、任意の時間依存角速度への厳密公式ではありません。誤差と物理量の時間変化の検証は RBD16 で詳しく扱います。

## 8. 演習と詳細解答

### Level A

### 問題 A1：共役と逆元

$q=(1/2,(\sqrt3/2)e_1)$ の長さ、共役、逆元を求め、$q\otimes q^{-1}=1$ を直接検算せよ。

- Level: A

<!-- solution-start -->
### 詳細解答

$\lVert q\rVert^2=1/4+3/4=1$ なので $q$ は単位四元数です。[四元数の共役とノルムの乗法性](#prop-rbd5-norm-product)により

$$
q^*=(1/2,-(\sqrt3/2)e_1),\qquad q^{-1}=q^*.
$$

積のスカラー成分は $1/4-((\sqrt3/2)e_1)\cdot(-(\sqrt3/2)e_1)=1$、ベクトル成分は二つのスカラー倍が相殺し、同一軸のベクトル積はゼロです。ゆえに $q\otimes q^{-1}=(1,0)$ です。
<!-- solution-end -->

### 問題 A2：半角と回転軸

$q=(\sqrt2/2,(\sqrt2/2)e_3)$ が表す回転角と軸を求め、$R(q)e_1$ を求めよ。

- Level: A

<!-- solution-start -->
### 詳細解答

$\lVert q\rVert^2=1/2+1/2=1$。スカラー成分は $\cos(\alpha/2)=\sqrt2/2$、ベクトル成分は $e_3\sin(\alpha/2)$ なので $0\le\alpha\le\pi$ の代表を選べば $\alpha=\pi/2$、軸は $e_3$ です。[回転公式](#thm-rbd5-rodrigues)を $x=e_1$ に適用します。$e_3\cdot e_1=0$、$e_3\times e_1=e_2$ より

$$
R(q)e_1=\cos(\pi/2)e_1+\sin(\pi/2)e_2=e_2.
$$
<!-- solution-end -->

### 問題 A3：二つの代表

$q=(0,e_1)$ と $-q$ が単位四元数であることを検査し、両者が $e_2$ に与える像を求めよ。

- Level: A

<!-- solution-start -->
### 詳細解答

どちらも長さの二乗は $0^2+\lVert e_1\rVert^2=1$ です。[回転公式](#thm-rbd5-rodrigues)へ $a=0,u=e_1,x=e_2$ を代入すると

$$
R(q)e_2=(0-1)e_2+2e_1(e_1\cdot e_2)+0=-e_2.
$$

$-q=(0,-e_1)$ でも $\lVert-u\rVert=1$、$(-u)\cdot e_2=0$ なので $R(-q)e_2=-e_2$。これは角 $\pi$ の軸 $e_1$ の回転で、[二重性の定理](#thm-rbd5-double-cover)とも一致します。
<!-- solution-end -->

### 問題 A4：Hamilton積の順序

$i=(0,e_1)$ と $j=(0,e_2)$ に対し、$i\otimes j$、$j\otimes i$、$i\otimes j+j\otimes i$ を求めよ。

- Level: A

<!-- solution-start -->
### 詳細解答

[Hamilton積の定義](#def-rbd5-hamilton)の内積部分は両方とも $0$、ベクトル積は $e_1\times e_2=e_3$ と $e_2\times e_1=-e_3$ です。従って

$$
i\otimes j=(0,e_3),\qquad j\otimes i=(0,-e_3),
\qquad i\otimes j+j\otimes i=(0,0).
$$

積は非可換ですが、足したときにはベクトル積の反対称部分が消えます。
<!-- solution-end -->

### 問題 A5：成分微分と長さ

$\omega_b=(0,0,\Omega)$（$\Omega$ は定数）のとき、$q=(a,(u_1,u_2,u_3))$ の微分方程式を四成分で書き、単位長が保存されることを直接確かめよ。

- Level: A

<!-- solution-start -->
### 詳細解答

[四元数の姿勢ODE](#thm-rbd5-attitude-ode)の成分式を使います。$u\times(0,0,\Omega)=(\Omega u_2,-\Omega u_1,0)$ なので

$$
\dot a=-\frac{\Omega}{2}u_3,\quad
\dot u_1=\frac{\Omega}{2}u_2,\quad
\dot u_2=-\frac{\Omega}{2}u_1,\quad
\dot u_3=\frac{\Omega}{2}a.
$$

時間微分を行うと

$$
\begin{aligned}
\frac{d}{dt}(a^2+u_1^2+u_2^2+u_3^2)
&=-\Omega au_3+\Omega u_1u_2-\Omega u_2u_1+\Omega u_3a=0.
\end{aligned}
$$

したがって初期ノルムが1なら常に1です。
<!-- solution-end -->

### Level B

### 問題 B1：回転行列を列から構成する

$q=(c,se_3)$、$c^2+s^2=1$ のとき、$R(q)$ の三列を [単位四元数の回転公式と軸角表示](#thm-rbd5-rodrigues)から求め、$R(q)^TR(q)=I_3$ と $\det R(q)=1$ を検算せよ。

- Level: B

<!-- solution-start -->
### 詳細解答

$u=se_3$ を回転公式に入れると、$u\cdot e_1=u\cdot e_2=0$、$u\cdot e_3=s$ です。従って

$$
\begin{aligned}
R(q)e_1&=(c^2-s^2)e_1+2cs\,e_2,\\
R(q)e_2&=-2cs\,e_1+(c^2-s^2)e_2,\\
R(q)e_3&=(c^2-s^2)e_3+2s^2e_3=(c^2+s^2)e_3=e_3.
\end{aligned}
$$

$A=c^2-s^2$、$B=2cs$ とおけば $A^2+B^2=(c^2+s^2)^2=1$ です。従って

$$
R(q)=\begin{pmatrix}A&-B&0\\B&A&0\\0&0&1\end{pmatrix},\quad
R(q)^TR(q)=\operatorname{diag}(A^2+B^2,A^2+B^2,1)=I_3
$$

かつ $\det R(q)=A^2+B^2=1$ です。単に行列の数字を見ただけでなく、定義から回転の二条件へ結び付けました。
<!-- solution-end -->

### 問題 B2：合成順序を物体軸で検算する

$q_x=(1/\sqrt2,e_1/\sqrt2)$、$q_y=(1/\sqrt2,e_2/\sqrt2)$ とする。両方の Hamilton積を求め、$R(q_x\otimes q_y)e_3$ と $R(q_y\otimes q_x)e_3$ を回転行列の合成で確かめよ。

- Level: B

<!-- solution-start -->
### 詳細解答

積のスカラー成分はどちらも $1/2$、ベクトル成分は $e_1+e_2$ にベクトル積 $\pm e_3$ を加えて

$$
q_x\otimes q_y=(1/2,(e_1+e_2+e_3)/2),\quad
q_y\otimes q_x=(1/2,(e_1+e_2-e_3)/2).
$$

[合成命題](#prop-rbd5-composition)により第一の像は $R_x(\pi/2)R_y(\pi/2)e_3$。右側から作用させ、

$$
e_3\xrightarrow{R_y(\pi/2)}e_1
\xrightarrow{R_x(\pi/2)}e_1.
$$

逆の積では

$$
e_3\xrightarrow{R_x(\pi/2)}-e_2
\xrightarrow{R_y(\pi/2)}-e_2.
$$

よって二つの像は $e_1$ と $-e_2$ で異なり、Hamilton積の順序の非可換性を三次元の実際の回転で検算できました。
<!-- solution-end -->

### 問題 B3：同じ姿勢を表す二元性を証明する

単位四元数 $p,q$ がすべての $x$ に同じ作用を持つとき、$p^*\otimes q=(c,v)$ のベクトル成分 $v$ はゼロと示せ。そこから $p=\pm q$ を結論せよ。

- Level: B

<!-- solution-start -->
### 詳細解答

前提は $p\otimes(0,x)\otimes p^*=q\otimes(0,x)\otimes q^*$ です。左から $p^*$、右から $q$ を掛けると

$$
(0,x)\otimes(p^*\otimes q)=(p^*\otimes q)\otimes(0,x).
$$

$r=(c,v)$ と書けば、[Hamilton積の定義](#def-rbd5-hamilton)で左辺のベクトル部分は $cx+x\times v$、右辺は $cx+v\times x$。従って $x\times v=v\times x$、反対称性から $v\times x=0$ がすべての $x$ で成り立ちます。$v\ne0$ なら $v$ と一次独立な $x$ を取ればベクトル積が非零になり矛盾するので $v=0$ です。

[ノルムの乗法性](#prop-rbd5-norm-product)より $\lVert r\rVert=\lVert p\rVert\lVert q\rVert=1$ だから $c^2=1$。$r=\pm1$、したがって $q=p\otimes r=\pm p$ です。
<!-- solution-end -->

### 問題 B4：Euler角の極を通る姿勢

$R(t)=R_y(t)$（$t$ は $0$ の近傍）を表す単位四元数 $q(t)$ を構成し、$t=0$ の角速度と四元数の微分を求めよ。Euler角の逆変換との相違を説明せよ。

- Level: B

<!-- solution-start -->
### 詳細解答

[軸角から四元数への公式](#thm-rbd5-rodrigues)で軸 $e_2$ と角 $t$ を入れ、

$$
q(t)=(\cos(t/2),e_2\sin(t/2)).
$$

ノルムの二乗は $\cos^2(t/2)+\sin^2(t/2)=1$ です。時刻 $t$ で微分して

$$
\dot q(t)=\left(-\frac12\sin(t/2),\frac12 e_2\cos(t/2)\right),
\qquad \dot q(0)=(0,e_2/2).
$$

[姿勢ODE](#thm-rbd5-attitude-ode)の右辺を、物体系で一定の $\omega_b=e_2$ として計算すると

$$
\frac12q(t)\otimes(0,e_2)
=\frac12(-\sin(t/2),\,e_2\cos(t/2))
=\dot q(t)
$$

です。したがって求める物体角速度は $e_2$ です。ここで $\dot q$ は $t$ による導関数、積に現れる $e_2$ は物体系の固定単位軸です。$t=0$ の $R=I_3$ は [RBD4 の Euler角特異姿勢](../RBD4/index.md#prop-rbd4-coordinate-singularity)ですが、四元数の微分は存在し一意に計算できます。Euler角の三つの速度の選び方が一意でないことと、物理的角速度が定まらないことを混同しません。
<!-- solution-end -->

### 問題 B5：数値更新の規格化

$\lVert q_n\rVert=1$、$\omega_b=\Omega e_3$、$h>0$ とする。Euler更新のノルムを求め、規格化後の回転増分の角度を求めよ。一定角速度の厳密増分と比較せよ。

- Level: B

<!-- solution-start -->
### 詳細解答

[更新命題](#prop-rbd5-updates)により

$$
q_{n+1}^{\mathrm E}=q_n\otimes(1,h\Omega e_3/2),\quad
\lVert q_{n+1}^{\mathrm E}\rVert=\sqrt{1+(h\Omega/2)^2}.
$$

規格化後の右側の増分は

$$
r=\frac{(1,h\Omega e_3/2)}{\sqrt{1+(h\Omega/2)^2}}.
$$

これは軸 $e_3$ まわりの回転で、半角 $\beta/2$ の正接が $h\Omega/2$ となります。主値 $\beta\in(-\pi,\pi)$ を選ぶと

$$
\boxed{\beta=2\arctan(h\Omega/2)}.
$$

厳密な増分は $\Omega h$（回転角は $2\pi$ を法として同じ姿勢）です。$z=h\Omega/2$ とすると $\arctan z=z-z^3/3+O(z^5)$ より

$$
\beta-\Omega h=-\frac{h^3\Omega^3}{12}+O(h^5\Omega^5).
$$

従って $\Omega\ne0$ なら、十分小さい非零の $h$ で規格化後にも角度誤差が残ります。$\Omega=0$ では両増分とも恒等回転で、誤差はゼロです。
<!-- solution-end -->

### Level C

### 問題 C1：一定物体角速度と一周の符号

初期姿勢 $q(0)=(\cos(\gamma/2),e_1\sin(\gamma/2))$、$\gamma\in\mathbb R$ とし、$\omega_b=\Omega e_3$、$\Omega>0$ を全時刻で一定とする。

1. 単位四元数の初期値問題を解き、$R(t)$ を初期回転行列と $R_z(\Omega t)$ の積として求めよ。
2. 物体角速度と空間角速度を検算し、$T=2\pi/\Omega$ における $q(T)$ と $R(T)$ を求めよ。
3. $N$ 等分した一定刻み $h=T/N$ の Euler更新を規格化せずに繰り返した場合のノルムを求め、$N\to\infty$ でどうなるか示せ。

- Level: C

<!-- solution-start -->
### 詳細解答

**第1問**　初期四元数は $\cos^2(\gamma/2)+\sin^2(\gamma/2)=1$ より単位長です。[一定角速度の厳密更新](#prop-rbd5-updates)を $t_n=0$、$\omega=\Omega e_3$ に適用すると

$$
q(t)=q(0)\otimes(\cos(\Omega t/2),e_3\sin(\Omega t/2)).
$$

$\Omega>0$ なので $\lVert\omega\rVert=\Omega$、軸は $e_3$ です。[Hamilton積と能動回転の合成](#prop-rbd5-composition)から

$$
\boxed{R(t)=R_x(\gamma)R_z(\Omega t)}.
$$

右側の $R_z$ が先に物体の列ベクトルへ作用することに注意します。$R(t)=R_z(\Omega t)R_x(\gamma)$ と取り違えると空間系で角速度を固定した別の運動になります。

**第2問**　[RBD2 のハット記法](../RBD2/index.md#def-rbd2-hat)による $\widehat{e_3}e_1=e_2$、$\widehat{e_3}e_2=-e_1$ を用います。$R_z(\varphi)$ の基底像は $\cos\varphi\,e_1+\sin\varphi\,e_2$、$-\sin\varphi\,e_1+\cos\varphi\,e_2$、$e_3$ なので、これを時刻 $t$ で微分する連鎖律から

$$
\frac{d}{dt}R_z(\Omega t)=\Omega R_z(\Omega t)\widehat{e_3}
$$

です。$R_x(\gamma)$ は $t$ に依存しないため、積の微分と直交性を使うと

$$
\begin{aligned}
R^T\dot R
&=R_z(-\Omega t)R_x(-\gamma)R_x(\gamma)
\bigl(R_z(\Omega t)\Omega\widehat{e_3}\bigr)\\
&=R_z(-\Omega t)R_z(\Omega t)\Omega\widehat{e_3}
=\Omega\widehat{e_3}.
\end{aligned}
$$

よって $\omega_b=\Omega e_3$ と一致します。[空間・物体対応](../RBD3/index.md#prop-rbd3-angular-conjugacy)より

$$
\omega_s=R(t)\omega_b
=\Omega R_x(\gamma)R_z(\Omega t)e_3
=\Omega R_x(\gamma)e_3,
$$

すなわち空間角速度も一定ですが、一般には $e_3$ 方向でありません。$T=2\pi/\Omega$ では右側の四元数が $(\cos\pi,e_3\sin\pi)=(-1,0)$ となるので

$$
\boxed{q(T)=-q(0),\qquad R(T)=R(0)R_z(2\pi)=R(0)}.
$$

[二重性の定理](#thm-rbd5-double-cover)に従い、四元数の符号が反転しても物体は元の姿勢に戻ります。

**第3問**　各 Euler更新は $q_{n+1}=q_n\otimes(1,h\Omega e_3/2)$ です。単位長でない途中の $q_n$ にも [ノルムの乗法性](#prop-rbd5-norm-product)を適用できるため、

$$
\lVert q_{n+1}\rVert
=\lVert q_n\rVert\sqrt{1+(h\Omega/2)^2}.
$$

初期長さ1から帰納的に

$$
\begin{aligned}
\lVert q_N\rVert
&=\left(1+\frac{h^2\Omega^2}{4}\right)^{N/2}\\
&=\left(1+\frac{\pi^2}{N^2}\right)^{N/2}.
\end{aligned}
$$

対数を取ると

$$
\log\lVert q_N\rVert
=\frac N2\log\left(1+\frac{\pi^2}{N^2}\right)
=\frac{\pi^2}{2N}+O(N^{-3})\longrightarrow0.
$$

したがって $\lVert q_N\rVert\to1$ ですが、有限の $N$ では常に $\lVert q_N\rVert>1$ です。刻み幅を縮める極限と、各有限刻みでのノルム保存は別の性質です。
<!-- solution-end -->

## 9. 次講への接続

四元数は姿勢の表示と更新を担当します。物体の回りにくさは四元数の四成分ではなく、質量分布から得る[MECH8の剛体の慣性テンソル](../../MECH/MECH8/index.md#def-mech8-inertia-tensor)が決めます。**RBD6** では物体系で求めたこの行列を $R(q)$ によって空間系へ変換し、具体物体の質量積分と照合します。

この講義の要点は、単位条件と符号の二重性を守りながら、**Hamilton積の順序 → 能動回転の順序 → 物体角速度の右乗算**を同一の規約で再現できることです。
