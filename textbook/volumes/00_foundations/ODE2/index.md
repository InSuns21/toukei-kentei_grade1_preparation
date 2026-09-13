# ODE2 標準常微分方程式 II：高階線形微分方程式

一階方程式では「初期値を一つ与える」と解が決まりました。二階なら $y(t_0)$ と $y'(t_0)$、$n$ 階なら $y(t_0),\ldots,y^{(n-1)}(t_0)$ が必要になります。

この章では、この事実を単なる経験則で終わらせません。

- なぜ斉次 $n$ 階線形方程式の解空間は $n$ 次元なのか。
- Wronskian は、いつ線形独立性を本当に判定できるのか。
- 重根で $t e^{rt}$、さらに高重根で $t^k e^{rt}$ が現れるのはなぜか。
- 非斉次方程式の未定係数法と定数変化法は、どこから出てくるのか。

を、初期値問題の存在・一意性から一本につなげます。

前提は [ODE1 一階常微分方程式](../ODE1/index.md) と [LA3C 行列式の計算・可逆性](../LA3C/index.md) です。特に ODE1 の [Picard--Lindelöf の局所存在・一意性](../ODE1/index.md#thm-ode1-picard-lindelof) で使った Picard 反復の考え方を、有限次元ベクトルへ必要な範囲だけ拡張します。後続 ODE3 の一般線形系・行列指数は、この章の証明へ逆輸入しません。

---

## 1. 高階線形 ODE は「線形作用素の方程式」

<a id="def-ode2-linear-equation"></a>
<!-- formal-statement-start -->
> **定義（n階線形ODE・斉次方程式・非斉次方程式）**  
> 区間 $I\subset\mathbb R$ 上の既知関数 $a_0,\ldots,a_{n-1},g$ に対し、未知関数 $y$ が

$$
y^{(n)}+a_{n-1}(t)y^{(n-1)}+\cdots+a_1(t)y'+a_0(t)y=g(t)
$$

> を満たすとき、これを正規化された $n$ 階線形常微分方程式という。左辺を

$$
L[y]
:=y^{(n)}+a_{n-1}y^{(n-1)}+\cdots+a_1y'+a_0y
$$

> と書く。$g\equiv0$ のときを斉次方程式、一般の $g$ を持つときを非斉次方程式という。
<!-- formal-statement-end -->

ここで「線形」とは、任意の関数 $u,v$ と定数 $\alpha,\beta$ に対し

$$
L[\alpha u+\beta v]
=\alpha L[u]+\beta L[v]
$$

が成り立つことです。係数 $a_k(t)$ が $t$ に依存していても、未知関数 $y$ とその導関数に対して一次であれば線形です。

<!-- definition-example-start: def-ode2-linear-equation -->
**定義の確認**

### 三つの二階方程式を見分ける

1. $y''+t y'+(1+t^2)y=0$ は二階・線形・斉次です。係数は定数でなくても構いません。
2. $y''+y=e^t$ は二階・線形・非斉次です。右辺 $g(t)=e^t$ が残ります。
3. $y''+y^2=0$ は $y^2$ を含むので非線形です。したがってこの章の重ね合わせは使えません。

線形性は「指数関数を試せる」ことより先に、解を足したり定数倍したりできる構造を与えます。
<!-- definition-example-end -->

---

## 2. 高階初期値問題は、導関数を束ねれば Picard 反復できる

$n$ 階方程式に

$$
y(t_0)=c_0,\quad y'(t_0)=c_1,\quad\ldots,\quad y^{(n-1)}(t_0)=c_{n-1}
$$

を課した初期値問題を考えます。「$n$ 個の初期値で一つに決まる」という主張が、後の解空間の次元と Wronskian 判定の土台です。

<a id="thm-ode2-linear-ivp"></a>
<!-- formal-statement-start -->
> **定理（連続係数線形高階初期値問題の存在・一意性）**  
> 区間 $I\subset\mathbb R$ 上で $a_0,\ldots,a_{n-1},g$ が連続とし、$t_0\in I$、$c_0,\ldots,c_{n-1}\in\mathbb R$ とする。このとき初期値問題

$$
\begin{cases}
 y^{(n)}+a_{n-1}(t)y^{(n-1)}+\cdots+a_0(t)y=g(t),\\
 y^{(k)}(t_0)=c_k\qquad(k=0,\ldots,n-1)
\end{cases}
$$

> は $I$ 上でただ一つの $C^n$ 級解を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

導関数を

$$
x(t)=\bigl(y(t),y'(t),\ldots,y^{(n-1)}(t)\bigr)
$$

と一つのベクトルに束ねます。すると右辺は $x$ に関して線形なので、コンパクト区間上で一様な Lipschitz 定数を持ちます。短い区間ごとに ODE1 と同じ Picard 反復を行えばよく、線形方程式ではその短区間の長さを現在の解の大きさに依存させず選べるため、有限個つないで任意のコンパクト区間まで延長できます。

<!-- proof-start -->
### 証明

$x_k=y^{(k)}$ $(k=0,\ldots,n-1)$ と置き、$x=(x_0,\ldots,x_{n-1})\in\mathbb R^n$ とします。元の方程式は

$$
x'=F(t,x)
$$

と書けます。ここで

$$
F(t,x)
=
\left(
 x_1,\ldots,x_{n-1},
 g(t)-\sum_{k=0}^{n-1}a_k(t)x_k
\right).
$$

まず $t_0$ と任意の $t_1\in I$ の間の閉区間 $J$ を取ります。連続性から

$$
A_k:=\sup_{t\in J}|a_k(t)|<\infty.
$$

$x=(x_0,\ldots,x_{n-1})$ に対して、成分の大きさをまとめる局所記号

$$
|x|_*:=\max_{0\le k<n}|x_k|
$$

と書きます。これは有限個の実数の絶対値の最大を表すだけの記号です。

$$
L:=\max\left\{1,\sum_{k=0}^{n-1}A_k\right\}
$$

と置きます。任意の $x,z\in\mathbb R^n$ に対し、最初の $n-1$ 成分では差は $x_{k+1}-z_{k+1}$、最後の成分では

$$
\left|
\sum_{k=0}^{n-1}a_k(t)(x_k-z_k)
\right|
\le
\left(\sum_{k=0}^{n-1}A_k\right)|x-z|_*
$$

なので

$$
|F(t,x)-F(t,z)|_*
\le L|x-z|_*
\qquad(t\in J).
$$

$Lh<1$ となる $h>0$ を選び、長さが高々 $h$ の閉区間 $K=[\tau,\tau+h_*]\subset J$ を考えます。初期値 $x(\tau)=\xi$ に対し、連続ベクトル値関数 $u:K\to\mathbb R^n$ 全体へ

$$
(Tu)(t)
=
\xi+\int_\tau^tF(s,u(s))\,ds
$$

と置きます。積分は成分ごとに取ります。$u,v$ に対して

$$
D_K(u,v):=\sup_{t\in K}|u(t)-v(t)|_*
$$

と書けば、各成分の積分の絶対値を被積分関数の絶対値の積分で上から評価して

$$
\begin{aligned}
D_K(Tu,Tv)
&\le Lh_*D_K(u,v)\\
&\le LhD_K(u,v).
\end{aligned}
$$

$q=Lh<1$ と置き、任意の連続関数 $u_0$ から $u_{m+1}=Tu_m$ と反復します。すると

$$
D_K(u_{m+1},u_m)
\le q^mD_K(u_1,u_0).
$$

$r>m$ なら三角不等式から

$$
D_K(u_r,u_m)
\le
\frac{q^m}{1-q}D_K(u_1,u_0)\to0.
$$

したがって各成分は一様 Cauchy です。[RA5 の一様 Cauchy 条件](../RA5/index.md#def-ra5-uniform-cauchy) により各成分は一様収束し、[一様極限の連続性](../RA5/index.md#thm-ra5-continuity) から極限 $u$ は連続です。さらに Lipschitz 評価から

$$
D_K(Tu_m,Tu)\le qD_K(u_m,u)\to0.
$$

一方 $Tu_m=u_{m+1}\to u$ なので $Tu=u$ です。従って

$$
u(t)=\xi+\int_\tau^tF(s,u(s))\,ds.
$$

被積分関数は連続だから [微積分学の基本定理I](../RA4/index.md#thm-ra4-ftc1) により $u'=F(t,u)$ です。

二つの解 $u,v$ が同じ初期値を持てば、同じ積分方程式を満たし、

$$
D_K(u,v)
\le qD_K(u,v)
$$

なので $u=v$ です。よって長さ $h$ 以下の区間で存在・一意性が示されました。左向きの区間でも積分の向きが反転するだけで同じ評価が成り立ちます。

最後に $J$ を長さ $h$ 以下の有限個の区間へ分割し、右向きなら右端、左向きなら左端の値を次の区間の初期値として順につなぎます。Lipschitz 定数 $L$ は $J$ 全体で固定されているため、各段で同じ $h$ を使えます。一意性により隣接区間の解は接続点で一致します。$t_1$ は任意だったので、$I$ の任意の点まで同様に延長できます。

得られた $x$ の成分関係 $x_k'=x_{k+1}$ と最後の式から、$x_0=y$ は $C^n$ 級で元の高階方程式を満たします。初期条件も構成から満たされます。$\square$
<!-- proof-end -->

この証明で重要なのは、一般の非線形連立系を先取りしたことではありません。高階線形方程式では、右辺の $x$ 依存が線形であるため、コンパクト区間上の係数の上界だけから一様 Lipschitz 定数を作れる、という点です。

---

## 3. 斉次解空間はなぜ $n$ 次元なのか

<a id="def-ode2-solution-space"></a>
<!-- formal-statement-start -->
> **定義（解空間・基本解系）**  
> 区間 $I$ 上の $n$ 階斉次線形方程式 $L[y]=0$ の $C^n$ 級解全体を $V$ とする。線形性により $V$ は実ベクトル空間であり、これを解空間という。$V$ の基底をなす $n$ 個の解 $y_1,\ldots,y_n$ を基本解系という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode2-solution-space -->
**定義の確認**

### $y''=0$ の解空間

二回積分すれば

$$
y(t)=C_1+C_2t.
$$

したがって $V=\operatorname{span}\{1,t\}$ です。$1$ と $t$ は、

$$
c_1+c_2t\equiv0
$$

なら $t=0$ から $c_1=0$、さらに任意の $t$ から $c_2=0$ なので線形独立です。従って $\{1,t\}$ は基本解系です。
<!-- definition-example-end -->

<a id="thm-ode2-solution-space-dim"></a>
<!-- formal-statement-start -->
> **定理（斉次解空間の次元）**  
> 区間 $I$ 上で $a_0,\ldots,a_{n-1}$ が連続とする。斉次方程式

$$
y^{(n)}+a_{n-1}(t)y^{(n-1)}+\cdots+a_0(t)y=0
$$

> の解空間 $V$ は $n$ 次元である。任意の $t_0\in I$ に対し、初期データ写像

$$
E_{t_0}:V\to\mathbb R^n,
\qquad
E_{t_0}(y)=\bigl(y(t_0),y'(t_0),\ldots,y^{(n-1)}(t_0)\bigr)
$$

> は線形同型である。
<!-- formal-statement-end -->

### 証明の見取り図

$n$ 個の初期値は単なるパラメータではなく、解そのものを一意に符号化します。任意の初期データから解が存在するので全射、同じ初期データを持つ二解が一致するので単射です。

<!-- proof-start -->
### 証明

微分と評価は線形なので $E_{t_0}$ は線形です。

任意の $(c_0,\ldots,c_{n-1})\in\mathbb R^n$ に対し、[高階線形初期値問題の存在・一意性](#thm-ode2-linear-ivp) により

$$
y^{(k)}(t_0)=c_k\qquad(k=0,\ldots,n-1)
$$

を満たす斉次解 $y$ が存在します。従って $E_{t_0}$ は全射です。

また $E_{t_0}(y)=0$ なら $y$ は零初期データを持ちます。零関数も同じ初期値問題の解なので、一意性から $y\equiv0$ です。従って核は $\{0\}$ であり、$E_{t_0}$ は単射です。

よって $V\cong\mathbb R^n$、従って $\dim V=n$ です。$\square$
<!-- proof-end -->

これで「二階なら独立な解が二本、$n$ 階なら $n$ 本」という教科書の定型句に根拠が付きました。

---

## 4. Wronskian：一般の関数ではなく、同じ線形 ODE の解に使う

<a id="def-ode2-wronskian"></a>
<!-- formal-statement-start -->
> **定義（Wronskian）**  
> $C^{n-1}$ 級関数 $y_1,\ldots,y_n$ に対し、

$$
W(y_1,\ldots,y_n)(t)
=
\det
\begin{pmatrix}
 y_1(t)&\cdots&y_n(t)\\
 y_1'(t)&\cdots&y_n'(t)\\
 \vdots&&\vdots\\
 y_1^{(n-1)}(t)&\cdots&y_n^{(n-1)}(t)
\end{pmatrix}
$$

> を Wronskian という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode2-wronskian -->
**定義の確認**

### $e^t$ と $e^{2t}$

$$
W(e^t,e^{2t})(t)
=
\det
\begin{pmatrix}
e^t&e^{2t}\\
e^t&2e^{2t}
\end{pmatrix}
=e^{3t}\ne0.
$$

従ってこの二関数は線形独立です。ただし一般の関数について「Wronskian がある点で0だから線形従属」と逆向きに判断するのは危険です。次の定理で逆向きが保証されるのは、**同じ線形 ODE の解**という構造があるからです。
<!-- definition-example-end -->

<a id="thm-ode2-abel-wronskian"></a>
<!-- formal-statement-start -->
> **定理（Abel の公式と基本解系判定）**  
> 区間 $I$ 上で $a_0,\ldots,a_{n-1}$ が連続とし、$y_1,\ldots,y_n$ を同じ斉次方程式

$$
y^{(n)}+a_{n-1}(t)y^{(n-1)}+\cdots+a_0(t)y=0
$$

> の解とする。$W(t)=W(y_1,\ldots,y_n)(t)$ とすると、任意の $t,t_0\in I$ に対し

$$
\boxed{
W(t)=W(t_0)
\exp\left(-\int_{t_0}^{t}a_{n-1}(s)\,ds\right)
}
$$

> が成り立つ。さらに次は同値である。
>
> 1. $y_1,\ldots,y_n$ は線形独立である。
> 2. ある $t_0\in I$ で $W(t_0)\ne0$ である。
> 3. すべての $t\in I$ で $W(t)\ne0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

Wronskian 行列を行ごとに微分します。上から $n-1$ 行は、微分すると直下の行と重なるので行列式への寄与が0になります。最後の行だけが残り、微分方程式を代入すると $W'=-a_{n-1}W$ という一階線形 ODE が現れます。

逆向きの線形独立性には初期値一意性が効きます。$W(t_0)=0$ なら初期データ行列に非零の核ベクトルがあり、その係数で作った線形結合は $t_0$ で0から $n-1$ 階まで全て0になります。高階初期値問題の一意性により、その線形結合は零解しかあり得ません。

<!-- proof-start -->
### 証明

Wronskian 行列の第 $k+1$ 行を

$$
R_k(t)=\bigl(y_1^{(k)}(t),\ldots,y_n^{(k)}(t)\bigr)
\qquad(k=0,\ldots,n-1)
$$

と書きます。行列式の多重線形性から

$$
W'
=
\sum_{k=0}^{n-1}
\det(R_0,\ldots,R_k',\ldots,R_{n-1}).
$$

$k<n-1$ では $R_k'=R_{k+1}$ なので、同じ行を二本持つ行列式となり、その項は0です。最後の行について、各 $y_j$ が方程式を満たすことから

$$
R_{n-1}'
=-a_0R_0-a_1R_1-\cdots-a_{n-1}R_{n-1}.
$$

従って

$$
\begin{aligned}
W'
&=\det(R_0,\ldots,R_{n-2},R_{n-1}')\\
&=-a_{n-1}(t)\det(R_0,\ldots,R_{n-1})\\
&=-a_{n-1}(t)W.
\end{aligned}
$$

$a_0R_0,\ldots,a_{n-2}R_{n-2}$ の項は既存行と重複するため消えました。この一階線形方程式へ ODE1 の [一階線形初期値問題の解](../ODE1/index.md#thm-ode1-linear-ivp) を適用すると Abel の公式を得ます。指数因子は常に正なので、$W(t_0)\ne0$ なら全ての点で $W\ne0$、逆に一度0なら全区間で0です。

次に線形独立性を示します。$W(t_0)\ne0$ なら Wronskian 行列は可逆です。もし

$$
\sum_{j=1}^n c_jy_j(t)\equiv0
$$

なら $t_0$ で0から $n-1$ 階まで微分して

$$
\begin{pmatrix}
 y_1(t_0)&\cdots&y_n(t_0)\\
 \vdots&&\vdots\\
 y_1^{(n-1)}(t_0)&\cdots&y_n^{(n-1)}(t_0)
\end{pmatrix}
\begin{pmatrix}c_1\\\vdots\\c_n\end{pmatrix}
=0.
$$

可逆性から $c_1=\cdots=c_n=0$ です。

逆に $W(t_0)=0$ なら行列は非可逆なので、非零ベクトル $c=(c_1,\ldots,c_n)^T$ で上式を満たすものがあります。$z=\sum c_jy_j$ と置くと $z$ も斉次方程式の解で、

$$
z(t_0)=z'(t_0)=\cdots=z^{(n-1)}(t_0)=0.
$$

零関数も同じ初期値問題を満たすため、[高階線形初期値問題の存在・一意性](#thm-ode2-linear-ivp) により $z\equiv0$ です。係数 $c$ は非零なので $y_1,\ldots,y_n$ は線形従属です。$\square$
<!-- proof-end -->

この定理は Wronskian の典型的な誤用も防ぎます。「Wronskian が0になる点がある」という情報だけで一般関数の従属性を結論するのではなく、**同じ線形 ODE の解であること**を確認してから使います。

---

## 5. 定係数斉次方程式：重根の $t^k$ は演算子から出る

<a id="def-ode2-characteristic"></a>
<!-- formal-statement-start -->
> **定義（特性多項式）**  
> 定数 $a_0,\ldots,a_{n-1}$ に対する定係数斉次方程式

$$
y^{(n)}+a_{n-1}y^{(n-1)}+\cdots+a_0y=0
$$

> に対し、

$$
p(r)=r^n+a_{n-1}r^{n-1}+\cdots+a_0
$$

> を特性多項式という。$p(r)=0$ を特性方程式という。
<!-- formal-statement-end -->

$D=d/dt$ と書けば方程式は $p(D)y=0$ です。指数関数に対し

$$
D(e^{rt})=re^{rt}
$$

なので $p(D)e^{rt}=p(r)e^{rt}$。ここまではよく知られた「$e^{rt}$ を代入する」計算です。

重根を理解する鍵は、任意の滑らかな $v$ に対する

$$
\boxed{(D-r)(e^{rt}v)=e^{rt}v'}
$$

です。従って

$$
(D-r)^m(e^{rt}v)=e^{rt}v^{(m)}.
$$

$v(t)=1,t,\ldots,t^{m-1}$ なら $m$ 階微分が0なので、根 $r$ の重複度が $m$ なら $t^ke^{rt}$ $(0\le k<m)$ が自然に現れます。

<a id="thm-ode2-constant-coefficient"></a>
<!-- formal-statement-start -->
> **定理（定係数斉次方程式の基本解系）**  
> 実係数特性多項式 $p$ が複素数上で

$$
p(z)=\prod_{j=1}^s(z-\lambda_j)^{m_j},
\qquad
\lambda_j\ne\lambda_\ell\ (j\ne\ell),
\qquad
\sum_{j=1}^s m_j=n
$$

> と因数分解されているとする。このとき複素解空間では

$$
\left\{t^ke^{\lambda_jt}:j=1,\ldots,s,\ k=0,\ldots,m_j-1\right\}
$$

> が基本解系をなす。実解空間では、実根 $\rho$ には $t^ke^{\rho t}$ を対応させ、非実根 $\alpha+i\beta$ $(\beta>0)$ とその共役根には

$$
t^ke^{\alpha t}\cos(\beta t),
\qquad
t^ke^{\alpha t}\sin(\beta t)
$$

> $(k=0,\ldots,m-1)$ を対応させれば、実基本解系を得る。
<!-- formal-statement-end -->

### 証明の見取り図

まず根ごとの関数が解であることを、$(D-\lambda)^m(e^{\lambda t}v)=e^{\lambda t}v^{(m)}$ から確認します。次に異なる根に属する指数多項式が混ざっても線形独立であることを、他の根を全て消す微分作用素で一つずつ取り出して示します。最後に本数が $n$ 本なので、[解空間が $n$ 次元](#thm-ode2-solution-space-dim) であることから基底になります。

<!-- proof-start -->
### 証明

$p(D)$ は因数分解に対応して

$$
p(D)=\prod_{j=1}^s(D-\lambda_j)^{m_j}
$$

と書けます。$0\le k<m_j$ なら

$$
(D-\lambda_j)^{m_j}\bigl(t^ke^{\lambda_jt}\bigr)
=e^{\lambda_jt}D^{m_j}(t^k)=0.
$$

従って $p(D)(t^ke^{\lambda_jt})=0$ であり、列挙した関数は全て解です。

線形独立性を示します。多項式 $P_j$ が $\deg P_j<m_j$ を満たし、

$$
\sum_{j=1}^sP_j(t)e^{\lambda_jt}=0
$$

とします。固定した $j$ に対して

$$
Q_j(D)=\prod_{\ell\ne j}(D-\lambda_\ell)^{m_\ell}
$$

を両辺へ作用させます。$\ell\ne j$ の項には $(D-\lambda_\ell)^{m_\ell}$ が含まれるので全て消え、

$$
0
=Q_j(D)\bigl(P_j(t)e^{\lambda_jt}\bigr)
=e^{\lambda_jt}
\prod_{\ell\ne j}
\bigl(D+(\lambda_j-\lambda_\ell)\bigr)^{m_\ell}P_j(t).
$$

各定数 $\lambda_j-\lambda_\ell$ は0ではありません。多項式 $P$ に $D+c$ $(c\ne0)$ を作用させると、最高次係数は $c$ 倍されて次数は保たれます。従って $D+c$ は多項式空間上で非零多項式を0へ送れません。その有限積も同様に単射なので $P_j=0$ です。$j$ は任意だったため全ての $P_j$ が0で、複素解の族は線形独立です。

複素数値初期データについては実部と虚部に分ければ [高階線形初期値問題の存在・一意性](#thm-ode2-linear-ivp) を二回適用できるため、複素解空間も $\mathbb C^n$ と同型で複素次元 $n$ です。上の族は $\sum m_j=n$ 本あるので基本解系です。

実係数 $p$ では非実根は共役対で現れます。Euler の公式

$$
e^{(\alpha+i\beta)t}
=e^{\alpha t}\bigl(\cos\beta t+i\sin\beta t\bigr)
$$

より、複素共役な二解の実部・虚部を取ると

$$
t^ke^{\alpha t}\cos\beta t,
\qquad
t^ke^{\alpha t}\sin\beta t
$$

を得ます。実係数作用素 $L$ では $L[u+iv]=0$ なら $L[u]=L[v]=0$ です。また複素共役二本から実部・虚部への変換は可逆な線形変換なので独立性を失いません。従って列挙した実関数が実基本解系です。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-ode2-characteristic -->
**定義の確認**

### 重根と複素根が同時にある四階方程式

特性多項式が

$$
p(r)=(r-2)^2(r^2+1)
$$

なら、根 $2$ は重複度2、$\pm i$ は単根です。従って実基本解系は

$$
e^{2t},\quad te^{2t},\quad\cos t,\quad\sin t
$$

で、一般解は

$$
\boxed{
y=(C_1+C_2t)e^{2t}+C_3\cos t+C_4\sin t
}.
$$

「重根なら $t$ を掛ける」は暗記規則ではなく、$(D-r)^m$ が指数因子を外して $m$ 階微分へ変わることの帰結です。
<!-- definition-example-end -->

### 調和振動子を回収する

$$
y''+\omega^2y=0,\qquad \omega>0
$$

では $p(r)=r^2+\omega^2$ の根は $\pm i\omega$ です。従って

$$
\boxed{y=C_1\cos(\omega t)+C_2\sin(\omega t)}.
$$

旧 H1 の調和振動子は、ここでは「複素共役根から得られる実基本解系」の最小例として位置付きます。

---

## 6. 非斉次方程式：特殊解を一つ見つければ残りは斉次解

<a id="thm-ode2-nonhom-general"></a>
<!-- formal-statement-start -->
> **定理（非斉次方程式の一般解）**  
> 線形微分作用素 $L$ と関数 $g$ に対して、$y_p$ を $L[y_p]=g$ を満たす一つの特殊解とする。このとき $L[y]=g$ の全ての解は

$$
\boxed{y=y_p+y_h}
$$

> と一意に書ける。ただし $y_h$ は斉次方程式 $L[y_h]=0$ の解である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$L[y]=g$ なら線形性から

$$
L[y-y_p]=L[y]-L[y_p]=g-g=0.
$$

従って $y_h:=y-y_p$ は斉次解で $y=y_p+y_h$ です。逆に任意の斉次解 $y_h$ について

$$
L[y_p+y_h]=L[y_p]+L[y_h]=g+0=g.
$$

また $y_p+y_{h,1}=y_p+y_{h,2}$ なら $y_{h,1}=y_{h,2}$ なので表現は一意です。$\square$
<!-- proof-end -->

この定理により、非斉次問題では「斉次一般解」と「特殊解を一つ作る方法」を分離して考えられます。

### 6.1 未定係数法：試行形が斉次解に入ったら共鳴している

定係数作用素 $p(D)$ では

$$
\boxed{
p(D)\bigl(e^{\lambda t}v(t)\bigr)
=e^{\lambda t}p(D+\lambda)v(t)
}
$$

が成り立ちます。これは各因子について

$$
(D-\mu)(e^{\lambda t}v)
=e^{\lambda t}(D+\lambda-\mu)v
$$

となることを繰り返せば分かります。

右辺が $e^{\lambda t}$、多項式、あるいは指数関数と三角関数の積なら、この恒等式により有限次元の多項式係数比較へ落とせます。

もし $\lambda$ が特性根でなければ $p(\lambda)\ne0$ なので、$Ce^{\lambda t}$ 型の試行が機能します。一方 $\lambda$ が重複度 $s$ の特性根なら、$p(D+\lambda)$ は $D^s$ を因子に持ちます。斉次解に重なる低い次数を避けるため、試行形へ $t^s$ を掛けます。これが「共鳴時には $t$ の冪を掛ける」規則の理由です。

#### 非共鳴の例

$$
y''-3y'+2y=e^{3t}
$$

では $p(r)=(r-1)(r-2)$ なので $p(3)=2\ne0$。$y_p=Ae^{3t}$ と置くと

$$
L[y_p]=p(3)Ae^{3t}=2Ae^{3t}.
$$

従って $A=1/2$ で

$$
y_p=\frac12e^{3t}.
$$

一般解は

$$
y=C_1e^t+C_2e^{2t}+\frac12e^{3t}.
$$

#### 共鳴の例

同じ左辺で

$$
y''-3y'+2y=e^t
$$

とすると、$e^t$ 自体は斉次解なので $Ae^t$ を試しても左辺は0です。根 $1$ の重複度は1なので $y_p=At e^t$ と置きます。直接計算すると

$$
(D-1)(te^t)=e^t,
$$

さらに

$$
(D-2)e^t=-e^t.
$$

作用素は可換なので

$$
(D-1)(D-2)(te^t)=-e^t.
$$

従って $A=-1$、

$$
\boxed{y_p=-te^t}.
$$

ここで $t$ を掛けた理由は「形を変えてみる」ためではなく、斉次解空間との重なりを一段外すためです。

---

## 7. 定数変化法：Wronskian 行列を解く

未定係数法は右辺の形が限られます。定数変化法は、斉次基本解系が分かっていれば連続な一般の $g$ に適用できます。

<a id="thm-ode2-variation-parameters"></a>
<!-- formal-statement-start -->
> **定理（$n$ 階線形 ODE の定数変化法）**  
> 区間 $I$ 上で $a_0,\ldots,a_{n-1},g$ が連続とし、$y_1,\ldots,y_n$ を斉次方程式 $L[y]=0$ の基本解系とする。Wronskian 行列を

$$
Y(t)=
\begin{pmatrix}
 y_1&\cdots&y_n\\
 y_1'&\cdots&y_n'\\
 \vdots&&\vdots\\
 y_1^{(n-1)}&\cdots&y_n^{(n-1)}
\end{pmatrix}
$$

> とし、$e_n=(0,\ldots,0,1)^T$ とする。連続ベクトル関数 $u'(t)$ を

$$
\boxed{u'(t)=Y(t)^{-1}e_n\,g(t)}
$$

> で定め、各成分を積分して $u_1,\ldots,u_n$ を取る。このとき

$$
\boxed{y_p(t)=\sum_{j=1}^n u_j(t)y_j(t)}
$$

> は $L[y_p]=g$ の特殊解である。
<!-- formal-statement-end -->

基本解系なので [Wronskian 判定](#thm-ode2-abel-wronskian) から $\det Y(t)\ne0$ であり、LA3C の可逆性判定により $Y(t)^{-1}$ が存在します。

### 証明の見取り図

$y_p=\sum u_jy_j$ をそのまま何度も微分すると $u_j'',u_j'''$ が大量に出ます。そこで $u_j'$ に

$$
\sum_j u_j'y_j^{(k)}=0\quad(k=0,\ldots,n-2),
\qquad
\sum_j u_j'y_j^{(n-1)}=g
$$

を課します。これはまさに $Y u'=e_ng$ です。この条件により、$n-1$ 階微分までは $u_j'$ の項が消え、$n$ 階微分でだけ $g$ が一度現れます。

<!-- proof-start -->
### 証明

$Yu'=e_ng$ は成分表示で

$$
\sum_{j=1}^n u_j' y_j^{(k)}=0
\qquad(k=0,\ldots,n-2),
$$

および

$$
\sum_{j=1}^n u_j' y_j^{(n-1)}=g
$$

です。

まず

$$
y_p=\sum_j u_jy_j.
$$

一回微分すると

$$
y_p'
=\sum_j u_j'y_j+\sum_j u_jy_j'
=\sum_j u_jy_j'
$$

です。最初の補助条件を使いました。同じ計算を帰納的に繰り返すと、$k=0,\ldots,n-1$ について

$$
y_p^{(k)}=\sum_{j=1}^n u_jy_j^{(k)}
$$

を得ます。最後にもう一度微分すると

$$
\begin{aligned}
y_p^{(n)}
&=\sum_j u_j'y_j^{(n-1)}+\sum_j u_jy_j^{(n)}\\
&=g+\sum_j u_jy_j^{(n)}.
\end{aligned}
$$

従って

$$
\begin{aligned}
L[y_p]
&=g+
\sum_{j=1}^n u_j
\left(
 y_j^{(n)}+a_{n-1}y_j^{(n-1)}+\cdots+a_0y_j
\right)\\
&=g+
\sum_{j=1}^n u_jL[y_j]\\
&=g.
\end{aligned}
$$

各 $y_j$ は斉次解なので最後の和は0です。$\square$
<!-- proof-end -->

### 二階の場合の公式

$$
y''+a_1(t)y'+a_0(t)y=g(t)
$$

で基本解を $y_1,y_2$ とすると

$$
\begin{pmatrix}y_1&y_2\\y_1'&y_2'\end{pmatrix}
\begin{pmatrix}u_1'\\u_2'\end{pmatrix}
=
\begin{pmatrix}0\\g\end{pmatrix}.
$$

Wronskian $W=y_1y_2'-y_1'y_2$ を使って解けば

$$
\boxed{
u_1'=-\frac{y_2g}{W},
\qquad
u_2'=\frac{y_1g}{W}
}.
$$

#### 例：$y''+y=\sec t$

$(-\pi/2,\pi/2)$ 上で考えます。基本解を $y_1=\cos t$, $y_2=\sin t$ とすると $W=1$ です。従って

$$
u_1'=-\sin t\sec t=-\tan t,
\qquad
u_2'=\cos t\sec t=1.
$$

この区間では $\cos t>0$ なので

$$
u_1=\log(\cos t),
\qquad
u_2=t
$$

と取れます。よって

$$
\boxed{
y_p(t)=\cos t\log(\cos t)+t\sin t
}.
$$

右辺が未定係数法の標準的な有限試行形に入らなくても、基本解系と Wronskian が分かれば特殊解を構成できます。

---

## 8. Cauchy--Euler 方程式：$x=\log t$ で定係数へ移す

<a id="def-ode2-cauchy-euler"></a>
<!-- formal-statement-start -->
> **定義（Cauchy--Euler 方程式）**  
> $t>0$ 上で

$$
t^ny^{(n)}+b_{n-1}t^{n-1}y^{(n-1)}+\cdots+b_1ty'+b_0y=g(t)
$$

> の形をした線形 ODE を Cauchy--Euler 方程式という。$b_0,\ldots,b_{n-1}$ は定数とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode2-cauchy-euler -->
**定義の確認**

$$
t^2y''-3ty'+4y=0
$$

では二階項に $t^2$、一階項に $t$、零階項に定数が掛かっているので Cauchy--Euler 形です。一方 $y''-3ty'+4y=0$ は最高階項に $t^2$ がなく、この形ではありません。
<!-- definition-example-end -->

$t=e^x$、すなわち $x=\log t$ と置き、$Y(x)=y(e^x)$ とします。演算子

$$
E:=\frac{d}{dx}=t\frac{d}{dt}
$$

を使うと、Cauchy--Euler の $t^k y^{(k)}$ が $E$ の多項式になります。

<a id="thm-ode2-cauchy-euler-transform"></a>
<!-- formal-statement-start -->
> **定理（Cauchy--Euler 変換）**  
> $t=e^x$、$Y(x)=y(e^x)$、$E=d/dx$ とする。このとき $k\ge1$ について

$$
\boxed{
t^k\frac{d^ky}{dt^k}
=E(E-1)\cdots(E-k+1)Y
}
$$

> が成り立つ。従って Cauchy--Euler 方程式は $x$ を独立変数とする定係数線形 ODE へ変換される。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$k=1$ では連鎖律から

$$
EY=\frac{d}{dx}y(e^x)=e^xy'(e^x)=ty'(t)
$$

です。

$A_k=t^kD_t^k y$ と書き、$A_k=E(E-1)\cdots(E-k+1)Y$ が成り立つと仮定します。積の微分から

$$
\begin{aligned}
EA_k
&=t\frac{d}{dt}\left(t^ky^{(k)}\right)\\
&=k t^ky^{(k)}+t^{k+1}y^{(k+1)}\\
&=kA_k+A_{k+1}.
\end{aligned}
$$

従って

$$
A_{k+1}=(E-k)A_k.
$$

帰納法により

$$
A_{k+1}=E(E-1)\cdots(E-k)Y
$$

です。よって公式が全ての $k$ で成り立ちます。$\square$
<!-- proof-end -->

### 例：重根が $t^2\log t$ を生む

$$
t^2y''-3ty'+4y=0
$$

に $x=\log t$ を入れます。$t^2y''=(E^2-E)Y$、$ty'=EY$ なので

$$
(E^2-E)Y-3EY+4Y=0,
$$

すなわち

$$
Y''-4Y'+4Y=0.
$$

特性多項式は $(r-2)^2$ だから

$$
Y=(C_1+C_2x)e^{2x}.
$$

$x=\log t$、$e^{2x}=t^2$ を戻して

$$
\boxed{y(t)=t^2(C_1+C_2\log t)}.
$$

定係数方程式の重根で現れた $x e^{2x}$ が、元の変数では $t^2\log t$ に変わっています。

---

## 9. Green 核への最小限の入口：強制振動を積分で表す

定数変化法は、右辺 $g$ から解 $y$ を作る積分作用素としても読めます。ここでは PDE の Green 関数論へ進まず、零初期値の二階振動子だけで構造を確認します。

<a id="def-ode2-green-kernel"></a>
<!-- formal-statement-start -->
> **定義（零初期値 Green 核）**  
> 線形初期値問題 $L[y]=g$、$y(t_0)=y'(t_0)=0$ に対し、全ての連続な強制項 $g$ について解が

$$
y(t)=\int_{t_0}^{t}G(t,s)g(s)\,ds
$$

> と表されるとき、この表示に現れる $G(t,s)$ を本章では零初期値 Green 核と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode2-green-kernel -->
**定義の確認**

### 最小例：$y''=g(t)$ の Green 核

零初期値

$$
y(t_0)=y'(t_0)=0
$$

の下で $y''=g(t)$ を一度積分すると

$$
y'(t)=F(t),
\qquad
F(t):=\int_{t_0}^{t}g(s)\,ds.
$$

さらに

$$
y(t)=\int_{t_0}^{t}F(r)\,dr
$$

です。ここで積分順序を交換する代わりに

$$
Q(t):=\int_{t_0}^{t}(t-s)g(s)\,ds
=t\int_{t_0}^{t}g(s)\,ds-\int_{t_0}^{t}s g(s)\,ds
$$

と置きます。[微積分学の基本定理I](../RA4/index.md#thm-ra4-ftc1) と積の微分則から

$$
\begin{aligned}
Q'(t)
&=F(t)+t g(t)-t g(t)\\
&=F(t).
\end{aligned}
$$

また $Q(t_0)=0$ です。したがって [微積分学の基本定理II](../RA4/index.md#thm-ra4-ftc2) により

$$
Q(t)=\int_{t_0}^{t}F(r)\,dr=y(t).
$$

よって

$$
\boxed{G(t,s)=t-s\qquad(s\le t)}
$$

がこの問題の零初期値 Green 核です。例えば $g\equiv1$ なら

$$
\int_{t_0}^{t}(t-s)\,ds=\frac{(t-t_0)^2}{2},
$$

これは $y''=1$、$y(t_0)=y'(t_0)=0$ の解そのものです。特定の一つの強制項だけでなく、任意の連続 $g$ を同じ核が解へ送ることまで確認できました。
<!-- definition-example-end -->

<a id="thm-ode2-oscillator-green"></a>
<!-- formal-statement-start -->
> **定理（調和振動子の Green 核表示）**  
> $\omega>0$、$g$ を区間 $I$ 上の連続関数、$t_0\in I$ とする。初期値問題

$$
y''+\omega^2y=g(t),
\qquad
y(t_0)=y'(t_0)=0
$$

> の解は

$$
\boxed{
y(t)=\int_{t_0}^{t}
\frac{\sin\bigl(\omega(t-s)\bigr)}{\omega}
 g(s)\,ds
}
$$

> で与えられる。従って

$$
G(t,s)=\frac{\sin(\omega(t-s))}{\omega}
$$

> が $s\le t$ に対する零初期値 Green 核である。
<!-- formal-statement-end -->

### 証明の見取り図

差の正弦を積和に展開して $t$ を含む因子を積分の外へ出し、二つの一変数積分に分けます。それぞれは上端だけが動く積分なので、[微積分学の基本定理I](../RA4/index.md#thm-ra4-ftc1) で直接微分できます。積の微分則で生じる $g(t)$ の交差項が一度目には相殺し、二度目には $g(t)$ が一つ残ることを確認します。

<!-- proof-start -->
### 証明

まず差の正弦を展開します。

$$
\sin\bigl(\omega(t-s)\bigr)
=\sin(\omega t)\cos(\omega s)-\cos(\omega t)\sin(\omega s)
$$

です。そこで

$$
C(t):=\int_{t_0}^{t}\cos(\omega s)g(s)\,ds,
\qquad
S(t):=\int_{t_0}^{t}\sin(\omega s)g(s)\,ds
$$

と置くと、候補解は

$$
y(t)=\frac{\sin(\omega t)}{\omega}C(t)
-\frac{\cos(\omega t)}{\omega}S(t)
$$

と書けます。$g$ は連続なので、[微積分学の基本定理I](../RA4/index.md#thm-ra4-ftc1) から

$$
C'(t)=\cos(\omega t)g(t),
\qquad
S'(t)=\sin(\omega t)g(t).
$$

積の微分則を使うと

$$
\begin{aligned}
y'(t)
&=\cos(\omega t)C(t)
+\frac{\sin(\omega t)}{\omega}C'(t)\\
&\quad+\sin(\omega t)S(t)
-\frac{\cos(\omega t)}{\omega}S'(t)\\
&=\cos(\omega t)C(t)+\sin(\omega t)S(t),
\end{aligned}
$$

ここでは $C',S'$ を含む二項が

$$
\frac{\sin(\omega t)\cos(\omega t)}{\omega}g(t)
-
\frac{\cos(\omega t)\sin(\omega t)}{\omega}g(t)=0
$$

と相殺しました。もう一度微分すると

$$
\begin{aligned}
y''(t)
&=-\omega\sin(\omega t)C(t)
+\cos(\omega t)C'(t)\\
&\quad+\omega\cos(\omega t)S(t)
+\sin(\omega t)S'(t)\\
&=-\omega\sin(\omega t)C(t)
+\omega\cos(\omega t)S(t)+g(t),
\end{aligned}
$$

最後は $\cos^2(\omega t)+\sin^2(\omega t)=1$ を使いました。一方

$$
\omega^2y(t)
=\omega\sin(\omega t)C(t)-\omega\cos(\omega t)S(t)
$$

なので

$$
y''(t)+\omega^2y(t)=g(t).
$$

$t=t_0$ では $C(t_0)=S(t_0)=0$ だから $y(t_0)=y'(t_0)=0$ です。[高階線形初期値問題の一意性](#thm-ode2-linear-ivp) により、この表示が唯一の解です。$\square$
<!-- proof-end -->

この核は「点源に対する分布論的 Green 関数」をまだ使っていません。PDE 系列では境界条件・空間変数・デルタ分布を含む一般論へ進みますが、ODE2 では **強制項を積分して応答を作る**という入口までを担当します。

---

## 10. 解法の見取り図

```text
n階線形 ODE
  │
  ├─ 斉次？
  │    ├─ 定係数 → 特性多項式
  │    │              ├─ 単根 → e^{rt}
  │    │              ├─ 重根 → t^k e^{rt}
  │    │              └─ 複素根 → e^{αt}cosβt, e^{αt}sinβt
  │    └─ 変数係数 → 基本解系が分かれば Wronskian / Abel
  │
  └─ 非斉次？
       ├─ 定係数 + 標準的な右辺 → 未定係数法
       │                              └─ 共鳴なら t^s を掛ける
       └─ 基本解系が既知 → 定数変化法

Cauchy--Euler
  └─ x=log t → 定係数 ODE へ

零初期値の強制振動子
  └─ 定数変化法 → Green核による積分表示
```

次章 ODE3 では、ここで証明のためだけに使った導関数ベクトルを一般の未知ベクトル $x(t)$ へ昇格し、$x'=A(t)x+f(t)$、基本行列、行列指数、固有値と安定性を主題として扱います。

---

## 11. 演習

### Level A

<a id="ex-ode2-a01"></a>
#### ODE2-A01 Wronskian と基本解系
- Level: A

方程式

$$
y''-3y'+2y=0
$$

について $y_1=e^t$, $y_2=e^{2t}$ が解であることを確認し、Wronskian を計算して基本解系であることを示せ。

<!-- solution-start -->
**詳細解答**

まず $y_1=e^t$ では $y_1'=y_1''=e^t$ なので

$$
y_1''-3y_1'+2y_1=(1-3+2)e^t=0.
$$

$y_2=e^{2t}$ では $y_2'=2e^{2t}$、$y_2''=4e^{2t}$ だから

$$
y_2''-3y_2'+2y_2=(4-6+2)e^{2t}=0.
$$

従って二つとも同じ斉次方程式の解です。Wronskian は

$$
\begin{aligned}
W(t)
&=\det\begin{pmatrix}e^t&e^{2t}\\e^t&2e^{2t}\end{pmatrix}\\
&=2e^{3t}-e^{3t}\\
&=e^{3t}.
\end{aligned}
$$

全ての $t$ で $W(t)\ne0$ です。[Abel の公式と基本解系判定](#thm-ode2-abel-wronskian) より $e^t,e^{2t}$ は線形独立です。二階方程式の解空間は2次元なので、この二本は基本解系です。
<!-- solution-end -->

<a id="ex-ode2-a02"></a>
#### ODE2-A02 実根と複素根
- Level: A

特性多項式が

$$
p(r)=(r-1)(r^2-2r+2)
$$

である三階定係数斉次方程式の実一般解を求めよ。

<!-- solution-start -->
**詳細解答**

一次因子から実根 $r=1$ を得ます。二次因子は

$$
r^2-2r+2=(r-1)^2+1
$$

なので根は $1\pm i$ です。全て単根です。

実根 $1$ から $e^t$、複素共役根 $1\pm i$ から

$$
e^t\cos t,
\qquad
e^t\sin t
$$

を得ます。従って

$$
\boxed{
y(t)=C_1e^t+C_2e^t\cos t+C_3e^t\sin t
}.
$$

三階方程式なので解空間は3次元であり、特性根から得た三本で全解を表せます。
<!-- solution-end -->

<a id="ex-ode2-a03"></a>
#### ODE2-A03 非共鳴の未定係数法
- Level: A

$$
y''-3y'+2y=e^{3t}
$$

の一般解を求めよ。

<!-- solution-start -->
**詳細解答**

まず斉次方程式の特性多項式は

$$
p(r)=r^2-3r+2=(r-1)(r-2).
$$

従って

$$
y_h=C_1e^t+C_2e^{2t}.
$$

右辺は $e^{3t}$ で、$3$ は特性根ではありません。特殊解を

$$
y_p=Ae^{3t}
$$

と置きます。$y_p'=3Ae^{3t}$、$y_p''=9Ae^{3t}$ なので

$$
\begin{aligned}
y_p''-3y_p'+2y_p
&=(9-9+2)Ae^{3t}\\
&=2Ae^{3t}.
\end{aligned}
$$

これを $e^{3t}$ に等しくするため $2A=1$、従って $A=1/2$ です。[非斉次方程式の一般解](#thm-ode2-nonhom-general) より

$$
\boxed{
y=C_1e^t+C_2e^{2t}+\frac12e^{3t}
}.
$$
<!-- solution-end -->

<a id="ex-ode2-a04"></a>
#### ODE2-A04 Cauchy--Euler 方程式
- Level: A

$t>0$ で

$$
t^2y''-3ty'+4y=0
$$

を解け。

<!-- solution-start -->
**詳細解答**

$x=\log t$、$Y(x)=y(e^x)$ と置きます。[Cauchy--Euler 変換](#thm-ode2-cauchy-euler-transform) から

$$
ty'=Y',
\qquad
t^2y''=Y''-Y'.
$$

従って元の方程式は

$$
Y''-Y'-3Y'+4Y=0,
$$

すなわち

$$
Y''-4Y'+4Y=0.
$$

特性方程式は

$$
(r-2)^2=0
$$

なので、重根 $2$ に対して

$$
Y=(C_1+C_2x)e^{2x}.
$$

$x=\log t$ と $e^{2x}=t^2$ を戻せば

$$
\boxed{y=t^2(C_1+C_2\log t)}.
$$
<!-- solution-end -->

### Level B

<a id="ex-ode2-b01"></a>
#### ODE2-B01 共鳴と重複度
- Level: B

$$
y''-2y'+y=e^t
$$

の一般解を求めよ。なぜ特殊解候補に $t^2$ が必要なのかも説明せよ。

<!-- solution-start -->
**詳細解答**

左辺は

$$
D^2-2D+1=(D-1)^2
$$

なので、特性根 $1$ は重複度2です。斉次一般解は

$$
y_h=(C_1+C_2t)e^t.
$$

右辺 $e^t$ はこの重根と共鳴しています。$Ae^t$ も $Ate^t$ も斉次解に含まれるため左辺へ入れると0になります。重複度が2なので $t^2$ を掛けて

$$
y_p=At^2e^t
$$

と置きます。

恒等式

$$
(D-1)(e^tv)=e^tv'
$$

を二回使うと

$$
(D-1)^2(At^2e^t)
=e^t\frac{d^2}{dt^2}(At^2)
=2Ae^t.
$$

右辺 $e^t$ と比較して $2A=1$、従って $A=1/2$ です。よって

$$
\boxed{
y=(C_1+C_2t)e^t+\frac12t^2e^t
}.
$$

$t^2$ は経験的な補正ではなく、$(D-1)^2$ が指数因子を外した後に二階微分として働くため必要になります。
<!-- solution-end -->

<a id="ex-ode2-b02"></a>
#### ODE2-B02 定数変化法
- Level: B

区間 $(-\pi/2,\pi/2)$ 上で

$$
y''+y=\sec t
$$

の一般解を定数変化法で求めよ。

<!-- solution-start -->
**詳細解答**

斉次方程式 $y''+y=0$ の基本解を

$$
y_1=\cos t,\qquad y_2=\sin t
$$

と取ります。Wronskian は

$$
W
=\cos t\cos t-(-\sin t)\sin t
=1.
$$

[二階の定数変化法](#thm-ode2-variation-parameters) より

$$
u_1'=-\frac{y_2g}{W}
=-\sin t\sec t
=-\tan t,
$$

$$
u_2'=\frac{y_1g}{W}
=\cos t\sec t
=1.
$$

この区間では $\cos t>0$ なので

$$
u_1=\int-\tan t\,dt=\log(\cos t),
\qquad
u_2=\int1\,dt=t
$$

と取れます。積分定数は斉次解へ吸収できるため0としてよいです。特殊解は

$$
y_p
=u_1y_1+u_2y_2
=\cos t\log(\cos t)+t\sin t.
$$

従って一般解は

$$
\boxed{
y=C_1\cos t+C_2\sin t
+\cos t\log(\cos t)+t\sin t
}.
$$
<!-- solution-end -->

<a id="ex-ode2-b03"></a>
#### ODE2-B03 初期データと Abel の公式
- Level: B

区間 $I$ 上で $p,q$ が連続とし、

$$
y''+p(t)y'+q(t)y=0
$$

を考える。$t_0\in I$ とし、$y_1,y_2$ をそれぞれ

$$
y_1(t_0)=1,\ y_1'(t_0)=0,
\qquad
y_2(t_0)=0,\ y_2'(t_0)=1
$$

を満たす解とする。

1. $W(t_0)$ を求めよ。
2. [Abel の公式](#thm-ode2-abel-wronskian) から $W(t)$ を求めよ。
3. $y_1,y_2$ が $I$ 上の基本解系であることを示せ。

<!-- solution-start -->
**詳細解答**

初期データ行列は

$$
\begin{pmatrix}
y_1(t_0)&y_2(t_0)\\
y_1'(t_0)&y_2'(t_0)
\end{pmatrix}
=
\begin{pmatrix}1&0\\0&1\end{pmatrix}.
$$

従って

$$
\boxed{W(t_0)=1}.
$$

二階方程式では最高階の一つ下の係数が $p(t)$ です。[Abel の公式](#thm-ode2-abel-wronskian) から

$$
\boxed{
W(t)=\exp\left(-\int_{t_0}^{t}p(s)\,ds\right)
}.
$$

指数関数は0にならないため、全ての $t\in I$ で $W(t)\ne0$ です。従って $y_1,y_2$ は線形独立です。二階斉次方程式の解空間は [2次元](#thm-ode2-solution-space-dim) なので、二本の線形独立な解 $y_1,y_2$ はその基底、すなわち基本解系です。
<!-- solution-end -->

### Level C

<a id="ex-ode2-c01"></a>
#### ODE2-C01 共鳴・初期値・Green 核を一つにつなぐ
- Level: C

初期値問題

$$
y''+y=\sin t,
\qquad
y(0)=0,
\qquad
y'(0)=0
$$

を考える。

1. 未定係数法で特殊解を求め、初期条件まで課して解を求めよ。
2. [調和振動子の Green 核表示](#thm-ode2-oscillator-green) から

$$
y(t)=\int_0^t\sin(t-s)\sin s\,ds
$$

を得ることを確認せよ。
3. 積分を計算し、1. の解と一致することを示せ。

<!-- solution-start -->
**詳細解答**

まず斉次方程式

$$
y''+y=0
$$

の特性根は $\pm i$ なので

$$
y_h=C_1\cos t+C_2\sin t.
$$

右辺 $\sin t$ は斉次解に含まれています。したがって $A\cos t+B\sin t$ を試すと左辺は0になり、共鳴しています。単根の共鳴なので $t$ を一つ掛けます。$\sin t$ に対しては

$$
y_p=At\cos t
$$

と置けば十分です。

微分すると

$$
y_p'=A\cos t-At\sin t,
$$

さらに

$$
y_p''=-A\sin t-A\sin t-At\cos t
=-2A\sin t-At\cos t.
$$

従って

$$
y_p''+y_p=-2A\sin t.
$$

これを $\sin t$ に等しくするため

$$
-2A=1,
\qquad
A=-\frac12.
$$

よって

$$
y=C_1\cos t+C_2\sin t-\frac12t\cos t.
$$

初期条件 $y(0)=0$ から $C_1=0$ です。また

$$
\frac{d}{dt}\left(-\frac12t\cos t\right)
=-\frac12\cos t+\frac12t\sin t
$$

なので

$$
y'(0)=C_2-\frac12=0.
$$

従って $C_2=1/2$ で、

$$
\boxed{
y(t)=\frac12\bigl(\sin t-t\cos t\bigr)
}.
$$

次に [調和振動子の Green 核表示](#thm-ode2-oscillator-green) で $\omega=1$、$t_0=0$、$g(s)=\sin s$ とすると

$$
\boxed{
y(t)=\int_0^t\sin(t-s)\sin s\,ds}.
$$

積分を計算します。積和公式

$$
\sin(t-s)\sin s
=\frac12\{\cos(t-2s)-\cos t\}
$$

を使うと

$$
\begin{aligned}
y(t)
&=\frac12\int_0^t\cos(t-2s)\,ds
-\frac12\int_0^t\cos t\,ds.
\end{aligned}
$$

第一項で $u=t-2s$ と置けば $du=-2ds$ なので

$$
\begin{aligned}
\int_0^t\cos(t-2s)\,ds
&=\frac12\int_{-t}^{t}\cos u\,du\\
&=\frac12[\sin u]_{-t}^{t}\\
&=\sin t.
\end{aligned}
$$

第二項は $t\cos t$ です。従って

$$
y(t)=\frac12\sin t-\frac12t\cos t
=\boxed{\frac12(\sin t-t\cos t)}.
$$

未定係数法と Green 核表示は別々の答えを与えているのではありません。線形初期値問題の一意性により、どちらも同じ唯一解を構成しています。
<!-- solution-end -->

---

## 12. 章末チェック

- $n$ 階線形 ODE の斉次・非斉次を区別できる。
- 高階線形初期値問題の存在・一意性を、ODE3 の行列指数を使わず Picard 反復から説明できる。
- 初期データ写像がなぜ解空間を $\mathbb R^n$ と同型にするか説明できる。
- Wronskian の Abel 公式を、行列式の各行を微分して導ける。
- 「Wronskian が0なら従属」を使うとき、同じ線形 ODE の解という仮定を確認できる。
- [定係数斉次方程式の基本解系](#thm-ode2-constant-coefficient)を使い、特性根の単根・重根・複素根から実基本解系を構成できる。
- 重根で $t^k$ が必要な理由を $(D-r)^m$ の作用から説明できる。
- 非斉次一般解を特殊解＋斉次解へ分解できる。
- 未定係数法で共鳴を判定できる。
- 定数変化法の補助条件が、なぜ高階微分で $u_j'$ の項を消すか追える。
- Cauchy--Euler 方程式を $x=\log t$ で定係数方程式へ変換できる。
- 強制振動子の Green 核表示を微分して元の初期値問題へ戻せる。
