# PML2-22 数値ソルバを通じた勾配はどう求めるか

## 1. 方程式の解を使って係数を学習するとき

[前講の係数同定](../PML2-21/index.md#def-pml2-21-identification)では、係数 $\kappa$ を変えると Poisson 方程式の解 $u_\kappa$ が変わり、その観測を使って係数を推定した。実際の学習では毎回 PDE を数値的に解き、損失を小さくする方向へ $\kappa$ を更新する。このとき損失の微分には、**係数を変えたことによる解の変化**が含まれる。

[三点差分法](../PML2-03/index.md#def-pml2-03-fd)は、連続関数を有限個の格子点の値へ置き換える。離散系では、パラメータ $\theta\in\mathbb R^p$、格子点値 $u\in\mathbb R^n$ に対して

$$
A(\theta)u(\theta)=b(\theta)
$$

を数値ソルバで解く。$A(\theta)$ は $n\times n$ 行列、$b(\theta)$ は $n$ 次元ベクトルである。観測損失などを $J(u,\theta)\in\mathbb R$ と書けば、実際に最小化する関数は

$$
L(\theta)=J(u(\theta),\theta)
$$

である。この講では、行列 $A$ が可逆で滑らかな**有限次元の離散ソルバ**に問題を固定し、次の四つの問いを同じ出発式から追う。

- 各パラメータ方向の微分をどう計算するか
- 一つの随伴方程式から全勾配をどう求めるか
- 反復を途中で止めたソルバの微分は何を表すか
- 連続問題と離散問題の勾配はどこで異なるか

### 二つの内部点を持つ Poisson の例

$-\kappa u''=1$、$u(0)=u(1)=0$、$\kappa>0$ を、$x_1=1/3,\ x_2=2/3$ の二つの内部点で三点差分にすると、格子幅 $h=1/3$ なので

$$
A(\kappa)=9\kappa
\begin{pmatrix}2&-1\\-1&2\end{pmatrix},
\qquad b=\begin{pmatrix}1\\1\end{pmatrix}.
$$

行列の行列式は $(9\kappa)^2(4-1)=243\kappa^2>0$ で可逆。$M=\begin{pmatrix}2&-1\\-1&2\end{pmatrix}$ と置けば $M(1,1)^T=(1,1)^T$ だから

$$
u(\kappa)=\frac{1}{9\kappa}\begin{pmatrix}1\\1\end{pmatrix}.
$$

数値的に解く対象はこの**離散方程式の解**である。連続方程式の厳密解と比べることは後の第5節で別に行う。

## 2. ソルバの微分とは何か

$A(\theta)$ と $b(\theta)$ が $\theta$ に関して連続微分可能で、$A(\theta)$ が可逆なら、解は $u(\theta)=A(\theta)^{-1}b(\theta)$ と一意に決まる。逆行列を毎回展開せず、**方程式の両辺を微分する**ことが基本になる。

<a id="def-pml2-22-discrete-gradient"></a>

<!-- formal-statement-start -->
> **定義（離散ソルバを通じた全微分）**  
> $\Theta\subset\mathbb R^p$ は開集合とし、次の三つの写像は連続微分可能とする。

$$
A:\Theta\to\mathbb R^{n\times n},\qquad
b:\Theta\to\mathbb R^n,\qquad
J:\mathbb R^n\times\Theta\to\mathbb R.
$$

> 各 $\theta\in\Theta$ で $A(\theta)$ は可逆とし、$u(\theta)$ を次の方程式の唯一解とする。

$$
A(\theta)u(\theta)=b(\theta).
$$
>
> 次の合成関数の勾配を**離散ソルバを通じた全勾配**と呼ぶ。

$$
L(\theta)=J(u(\theta),\theta),\qquad \nabla_\theta L(\theta).
$$

> これは $J$ の状態 $u$ への依存と、$\theta$ への明示的な依存の両方を微分したものである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml2-22-discrete-gradient -->
**定義の確認。** $p=n=1$、$\Theta=(0,\infty)$、$A(\theta)=2\theta$、$b(\theta)=2$、$J(u,\theta)=u^2+\theta$ とする。$A$ はすべての $\theta>0$ で可逆、解は $u(\theta)=1/\theta$、損失は $L(\theta)=\theta^{-2}+\theta$。直接微分すると $L'(\theta)=-2\theta^{-3}+1$ である。$J$ を $\theta$ で偏微分した値 $1$ だけでは全微分にならない。解を作る方程式、可逆性、状態を経由する微分をすべて確認した。
<!-- definition-example-end -->

次の定理で、$\partial_i$ はパラメータ $\theta_i$ に関する偏微分、$\nabla_u J$ は列ベクトルとしての状態勾配を意味する。$\partial_i J$ は状態を固定して微分した値である。

<a id="thm-pml2-22-tangent"></a>

<!-- formal-statement-start -->
> **定理（離散ソルバの感度方程式と直接勾配）**  
> [離散ソルバを通じた全微分](#def-pml2-22-discrete-gradient)の仮定の下で、各 $i=1,\ldots,p$ に対し $s_i=\partial_i u(\theta)\in\mathbb R^n$ は唯一の解として

$$
A(\theta)s_i=\partial_i b(\theta)-(\partial_i A(\theta))u(\theta)
$$

> を満たす。また、同じ点 $(u(\theta),\theta)$ で評価した損失の全微分は

$$
\partial_i L
=\partial_i J+(\nabla_u J)^T s_i
$$

> である。
<!-- formal-statement-end -->

**証明の見取り図。** $A(\theta)u(\theta)=b(\theta)$ の左辺を積の微分法則で展開する。可逆性は、解の存在だけでなく、各 $s_i$ を一意に決める箇所でも必要になる。

<!-- proof-start -->
### 証明

固定した $\theta_0\in\Theta$ について $\det A(\theta_0)\ne0$。行列式は連続なので近傍で $\det A(\theta)\ne0$ が保たれる。逆行列の各成分は余因子を $\det A$ で割った式だから $u=A^{-1}b$ はその近傍で連続微分可能である。

$A(\theta)u(\theta)=b(\theta)$ の各成分を $\theta_i$ で微分すると

$$
\sum_{k=1}^n (\partial_i A_{jk})u_k
+\sum_{k=1}^n A_{jk}(\partial_i u_k)
=\partial_i b_j
\qquad(j=1,\ldots,n).
$$

これを列ベクトルに戻し、

$$
(\partial_i A)u+A(\partial_i u)=\partial_i b,
\qquad
A s_i=\partial_i b-(\partial_i A)u
$$

を得る。$A$ が可逆なので $s_i$ は右辺から一意に決まる。さらに多変数関数 $J(u(\theta),\theta)$ に連鎖律を適用すると

$$
\partial_i L
=\left.\frac{\partial J}{\partial\theta_i}\right|_{u\ {\rm fixed}}
+\sum_{j=1}^n\frac{\partial J}{\partial u_j}\frac{\partial u_j}{\partial\theta_i}
=\partial_i J+(\nabla_u J)^T s_i.
$$

よって両式が成り立つ。
<!-- proof-end -->

**直接法（tangent method）。** 解 $u$ を一回求めた後、パラメータごとに $p$ 本の感度方程式を解く。$A$ を分解して再利用できる場合でも、右辺は $p$ 個必要である。目的関数が一つで $p$ が大きいときには、次の方法が有効になる。

## 3. 随伴法：目的関数が一つなら何を解けばよいか

感度方程式に現れる列ベクトル $\nabla_u J$ と $s_i$ の内積だけが必要なら、$s_i$ 自体をすべて求めなくてもよい。ここで**随伴変数**を導入する。随伴という語は、この有限次元では行列の転置 $A^T$ を用いる方程式に由来する。

<a id="def-pml2-22-adjoint"></a>

<!-- formal-statement-start -->
> **定義（離散随伴変数）**  
> [全微分の定義](#def-pml2-22-discrete-gradient)の仮定の下で、状態解 $u(\theta)$ を固定し、$g=\nabla_u J(u(\theta),\theta)\in\mathbb R^n$ とする。線形方程式

$$
A(\theta)^T\lambda=g
$$

> の唯一解 $\lambda\in\mathbb R^n$ を、この目的関数に対する**離散随伴変数**と呼ぶ。$A^T$ は転置行列である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml2-22-adjoint -->
**定義の確認。** 第1節の $A=9\kappa M$、$\kappa=2$ とし、$J(u,\kappa)=u_1$ とする。このとき $g=(1,0)^T$、$A^T=18M$ は可逆である。$M^{-1}=\frac13\begin{pmatrix}2&1\\1&2\end{pmatrix}$ なので

$$
\lambda=(18M)^{-1}g=\frac1{54}\begin{pmatrix}2\\1\end{pmatrix}.
$$

実際 $18M\lambda=(1,0)^T$ と両成分で確認できる。この例では $\lambda$ は状態 $u$ とは異なるベクトルである。
<!-- definition-example-end -->

<a id="thm-pml2-22-adjoint-gradient"></a>

<!-- formal-statement-start -->
> **定理（離散随伴による全勾配公式）**  
> [全微分の定義](#def-pml2-22-discrete-gradient)の仮定を満たし、$u$ は $Au=b$、$\lambda$ は $A^T\lambda=\nabla_u J$ の解であるとする。このとき各 $i=1,\ldots,p$ について

$$
\partial_i L
=\partial_i J+
\lambda^T\bigl(\partial_i b-(\partial_i A)u\bigr)
$$

> が成立する。$\partial_i J$ は $u$ を固定した偏微分であり、$A,\ b,\ J$ の微分はすべて同じ $\theta$ で評価する。
<!-- formal-statement-end -->

**証明の見取り図。** まず[感度方程式](#thm-pml2-22-tangent)から $As_i$ を求める。状態勾配を $A^T\lambda$ で置き換えると、行列の積の内積を移すだけで未知の $s_i$ を消去できる。

<!-- proof-start -->
### 証明

[直接勾配の式](#thm-pml2-22-tangent)から $\partial_i L=\partial_i J+(\nabla_u J)^Ts_i$。随伴方程式を代入して

$$
(\nabla_u J)^Ts_i
=(A^T\lambda)^Ts_i
=\lambda^T A s_i.
$$

さらに感度方程式 $A s_i=\partial_i b-(\partial_i A)u$ を代入すると

$$
(\nabla_u J)^Ts_i
=\lambda^T\bigl(\partial_i b-(\partial_i A)u\bigr).
$$

両辺に $\partial_i J$ を足せば主張が従う。$A$ と $A^T$ の可逆性から両線形方程式の解は一意であり、余分な解の選択は生じない。
<!-- proof-end -->

**計算量の区別。** 直接法は状態の一解とパラメータ数 $p$ に応じた感度の解を求める。一方、スカラー損失の随伴法は状態解と随伴解の**二種類の線形方程式**を解いた後、各パラメータ方向で内積を計算する。ただし、$\partial_i A$ の形成・作用も無料ではなく、行列の大きさ、疎構造、分解の再利用、目的関数の数によって実際の費用は異なる。

### 二節点の損失を最後まで微分する

第1節の状態 $u_1=u_2=1/(9\kappa)$ を観測し、目標値 $y=1/9$ に対して

$$
J(u,\kappa)=\frac12(u_1-y)^2,\qquad
L(\kappa)=\frac12\left(\frac1{9\kappa}-\frac19\right)^2
$$

を最小化する。$\kappa=2$ で $u=(1/18,1/18)^T$、$u_1-y=-1/18$ である。

**直接微分**では $u_1'(\kappa)=-1/(9\kappa^2)$ だから

$$
L'(2)=\left(-\frac1{18}\right)
\left(-\frac1{36}\right)=\frac1{648}.
$$

**随伴法**では $g=(-1/18,0)^T$、$A=18M$ なので

$$
\lambda=A^{-T}g
=-\begin{pmatrix}1/486\\1/972\end{pmatrix}.
$$

$b'=0$、$A'=9M$、$M u=(1/18,1/18)^T$ から

$$
b'-A'u
=-\begin{pmatrix}1/2\\1/2\end{pmatrix},
\qquad
\lambda^T(b'-A'u)
=\frac1{972}+\frac1{1944}
=\frac1{648}.
$$

二つの方法は**同じ離散損失**を微分しており、厳密計算では一致する。

## 4. 右辺も動き、損失が係数を直接含む場合

前節では $b$ が定数で $J$ が $\theta$ を直接含まなかった。一般の場合に落としやすい二つの項を確かめる。$n=p=1$、$\theta>0$、

$$
A(\theta)=2+\theta,\quad b(\theta)=\theta^2,\quad
J(u,\theta)=\frac12(u-1)^2+\theta^2
$$

とする。$A>0$ で可逆、$u=\theta^2/(2+\theta)$ である。$\theta=1$ で $u=1/3$。感度方程式の右辺は $b'-A'u=2-1/3=5/3$ だから $u'=5/9$。

状態を固定した偏微分は $J_\theta=2\theta=2$、状態勾配は $J_u=u-1=-2/3$。よって

$$
L'(1)=2+\left(-\frac23\right)\frac59
=2-\frac{10}{27}=\frac{44}{27}.
$$

随伴変数は $\lambda=J_u/A=(-2/3)/3=-2/9$ で、

$$
J_\theta+\lambda(b'-A'u)
=2+\left(-\frac29\right)\frac53=\frac{44}{27}.
$$

**注意する点は二つ。** $b'=2$ を落とすと状態の変化を誤る。$J_\theta=2$ を落とすと、ソルバを完全に微分しても損失の全勾配にはならない。

## 5. 「離散方程式を微分」と「連続方程式を微分」はいつ違うか

差分ソルバの出力から計算した勾配は、**その格子幅で定義した離散問題の勾配**である。元の PDE に対する勾配が必ず一致するわけではない。

$a$ を一定にした第1節の問題は二次関数の厳密解を持つため、三点差分が節点値をたまたま正確に再現した。差を見えるように、外力を $f(x)=x^2$ に替えよう。

$$
-\kappa u''(x)=x^2,\quad u(0)=u(1)=0,\quad \kappa>0.
$$

二回積分すると $u''=-x^2/\kappa$、$u'=-x^3/(3\kappa)+C_1$、$u=-x^4/(12\kappa)+C_1x+C_2$。境界条件により $C_2=0$、$C_1=1/(12\kappa)$、したがって

$$
u(x;\kappa)=\frac{x-x^4}{12\kappa},\qquad
u(1/2;\kappa)=\frac7{192\kappa}.
$$

これに対し、$h=1/2$、内部点 $x_1=1/2$ のみの三点差分は

$$
-\kappa\frac{u_0-2u_1+u_2}{h^2}=x_1^2,
\quad u_0=u_2=0,
\quad 8\kappa u_1=\frac14,
$$

だから離散解 $u_h(\kappa)=1/(32\kappa)=6/(192\kappa)$ である。

<a id="prop-pml2-22-discretization-gap"></a>

<!-- formal-statement-start -->
> **命題（連続解と一節点離散解の感度差）**  
> $\kappa>0$ で $-\kappa u''=x^2$、$u(0)=u(1)=0$ とする。連続解の中点観測 $q(\kappa)=u(1/2;\kappa)$ と、$h=1/2$ の中央差分による一節点値 $q_h(\kappa)$ について

$$
q(\kappa)-q_h(\kappa)=\frac1{192\kappa},
\qquad
q'(\kappa)-q_h'(\kappa)=-\frac1{192\kappa^2}
$$

> が成り立つ。よってこの格子での離散感度は、連続方程式の感度と一致しない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

上で積分して得た $q(\kappa)=7/(192\kappa)$ と、差分方程式 $8\kappa q_h=1/4$ からの $q_h=1/(32\kappa)=6/(192\kappa)$ を引けば第一式。$\kappa>0$ なので両方とも微分可能で、

$$
q'=-\frac7{192\kappa^2},\qquad
q_h'=-\frac6{192\kappa^2}.
$$

差を取って第二式を得る。
<!-- proof-end -->

この差は、随伴法が失敗したという意味ではない。随伴法は離散ソルバに対して正しい微分を返す。格子を変えて連続問題への誤差を調べる作業は、[数値誤差の区別](../PML2-04/index.md#def-pml2-04-error)と同じく別の検証である。ここでは「先に離散化してから微分」した $q_h'$ と「連続解を微分してから節点で評価」した $q'$ を直接比較した。

## 6. 反復ソルバを途中で止めたときの勾配

大きな問題では $Au=b$ を厳密に解かず、反復で近似する。自動微分で**反復コードの各操作をたどる**ことと、**方程式の厳密な解を暗黙微分する**ことは、停止途中では別の対象を微分している。

第5節の一節点問題 $8\kappa u=1/4$ を用い、$\kappa>0$、固定ステップ $\alpha>0$ で

$$
u^{(k+1)}=u^{(k)}-\alpha(8\kappa u^{(k)}-1/4),
\qquad u^{(0)}=0
$$

を考える。これは残差に沿った線形の反復である。第一ステップの値は $u^{(1)}=\alpha/4$ だから、**有限回反復の出力を直接微分**すれば $\mathrm d u^{(1)}/\mathrm d\kappa=0$ となる。

一方、収束先（厳密解）は $u_*=1/(32\kappa)$ だから

$$
\frac{\mathrm d u_*}{\mathrm d\kappa}=-\frac1{32\kappa^2}\ne0.
$$

<a id="prop-pml2-22-unrolled-gradient"></a>

<!-- formal-statement-start -->
> **命題（有限回の反復微分と厳密解の微分は異なる）**  
> $\kappa>0$、$0<\alpha\kappa<1/4$、$u^{(0)}=0$ とする。$\alpha$ は $\kappa$ に依存しない固定定数として、次の反復を行う。

$$
u^{(k+1)}=u^{(k)}-\alpha(8\kappa u^{(k)}-1/4).
$$

> 反復は厳密解 $u_*(\kappa)$ に収束するが、一回後の値と勾配は厳密解と異なる。具体的には次を満たす。

$$
u_*=\frac1{32\kappa},\qquad
\frac{\mathrm d u_*}{\mathrm d\kappa}=-\frac1{32\kappa^2},\qquad
u^{(1)}=\frac\alpha4,\qquad
\frac{\mathrm d u^{(1)}}{\mathrm d\kappa}=0.
$$
<!-- formal-statement-end -->

**証明の見取り図。** 真の解からの誤差を引き算して一段の倍率 $1-8\alpha\kappa$ を求める。この絶対値が1より小さいときだけ反復は収束する。

<!-- proof-start -->
### 証明

厳密解は $8\kappa u_*=1/4$ を満たす。反復式から同じ恒等式 $u_*=u_*-\alpha(8\kappa u_*-1/4)$ を引き、

$$
u^{(k+1)}-u_*=(1-8\alpha\kappa)(u^{(k)}-u_*)
$$

を得る。$0<\alpha\kappa<1/4$ なので $-1<1-8\alpha\kappa<1$。よって

$$
u^{(k)}-u_*=(1-8\alpha\kappa)^k(0-u_*)\longrightarrow0.
$$

一方、初期値は常に零なので $u^{(1)}=0-\alpha(0-1/4)=\alpha/4$、$\kappa$ に依存せず微分は零。厳密解 $1/(32\kappa)$ の微分は $-1/(32\kappa^2)$。例えば $\alpha=1/16,\ \kappa=1$ では $u^{(1)}=1/64$、残差 $8u^{(1)}-1/4=-1/8$ が残り、勾配不一致が起きる。
<!-- proof-end -->

**実装上の選択。** 反復回数を固定した計算グラフを自動微分すれば、その**有限回アルゴリズム**の勾配を得る。厳密な方程式を暗黙微分する式を使うなら、状態と随伴の方程式を十分な精度で解く必要がある。反復停止基準、残差、格子幅を記録せずに二つの勾配を比較するのは適切でない。

## 7. 微分可能ソルバの実行と数値検算

次は二節点 Poisson 問題の $J(u,\kappa)=\frac12(u_1-1/9)^2$ を、**標準 Python だけ**で確認するコードである。$\kappa=2$ の状態・直接勾配・随伴勾配を計算し、同じ離散損失の中心差分とも比較する。$2\times2$ の解法はここだけに限定した明示式であり、一般の大規模疎行列には適切な線形ソルバが必要になる。

~~~python
def solve(kappa):
    # 9*kappa*[[2,-1],[-1,2]] @ u = [1,1]
    return (1.0 / (9.0 * kappa), 1.0 / (9.0 * kappa))

def loss(kappa):
    u1, _ = solve(kappa)
    return 0.5 * (u1 - 1.0 / 9.0) ** 2

kappa = 2.0
u1, u2 = solve(kappa)
g1, g2 = u1 - 1.0 / 9.0, 0.0

# A*s = -A'*u. この模型では s_i = -u_i/kappa
s1, s2 = -u1 / kappa, -u2 / kappa
direct = g1 * s1 + g2 * s2

# A^T*lam = [g1,g2]; A=9*kappa*M, M^-1=(1/3)[[2,1],[1,2]]
lam1 = (2.0 * g1 + g2) / (27.0 * kappa)
lam2 = (g1 + 2.0 * g2) / (27.0 * kappa)
# -A'*u = -9*M*u
v1 = -9.0 * (2.0 * u1 - u2)
v2 = -9.0 * (-u1 + 2.0 * u2)
adjoint = lam1 * v1 + lam2 * v2

eps = 1.0e-5
finite_difference = (loss(kappa + eps) - loss(kappa - eps)) / (2.0 * eps)

print("state:", u1, u2)
print("direct:", direct)
print("adjoint:", adjoint)
print("finite difference:", finite_difference)
print("expected:", 1.0 / 648.0)
assert abs(direct - 1.0 / 648.0) < 1.0e-14
assert abs(adjoint - direct) < 1.0e-14
assert abs(finite_difference - direct) < 1.0e-10
~~~

中心差分は $L'(\kappa)$ を近似するための**数値検査**であり、微分の定義そのものを差分で置き換えたわけではない。極端に小さい $\varepsilon$ では丸め誤差が増える点にも注意する。

## 8. 演習と詳細解答

### Level A：方程式と微分の出発式

<a id="ex-pml2-22-a01"></a>

**問題 PML2-22-A01**
- Level: A
- $\theta>0$、$A(\theta)=3\theta$、$b(\theta)=6$ の一変数系で $u(\theta)$ を解き、感度方程式と直接微分が同じ $u'(\theta)$ を与えることを確認せよ。

<!-- solution-start -->
**詳細解答。** $3\theta u=6$ より $u=2/\theta$、従って直接微分は $u'=-2/\theta^2$。一方 $A'=3,\ b'=0$ なので感度方程式は $3\theta s=0-3(2/\theta)=-6/\theta$。$\theta>0$ だから両辺を $3\theta$ で割れ、$s=-2/\theta^2=u'$。可逆性は $A=3\theta\ne0$ から従う。
<!-- solution-end -->

<a id="ex-pml2-22-a02"></a>

**問題 PML2-22-A02**
- Level: A
- $A(\theta)=2+\theta,\ b(\theta)=\theta^2,\ \theta>0$ について、$\theta=1$ の $u$ と $u'$ を感度方程式から求めよ。右辺の微分を落とすと何が起きるか。

<!-- solution-start -->
**詳細解答。** $A(1)=3$、$b(1)=1$ なので $u(1)=1/3$。$A'(1)=1,\ b'(1)=2$ より $3u'(1)=2-1(1/3)=5/3$、従って $u'(1)=5/9$。$b'$ を誤って零と置くと $3u'=-1/3$、$u'=-1/9$ となる。$\theta$ が右辺に入ることを無視したため、符号も値も誤った。
<!-- solution-end -->

<a id="ex-pml2-22-a03"></a>

**問題 PML2-22-A03**
- Level: A
- $A=\begin{pmatrix}2&-1\\-1&2\end{pmatrix}$、$J(u)=u_1$ の離散随伴方程式を解き、$A^T\lambda=(1,0)^T$ を成分で確認せよ。

<!-- solution-start -->
**詳細解答。** $A^T=A$、$\det A=3$ より $A^{-1}=\frac13\begin{pmatrix}2&1\\1&2\end{pmatrix}$。したがって $\lambda=(2/3,1/3)^T$。検算すると第一成分は $2(2/3)-1/3=1$、第二成分は $-(2/3)+2(1/3)=0$。$J=u_1$ の状態勾配が $(1,0)^T$ であることも確認できる。
<!-- solution-end -->

<a id="ex-pml2-22-a04"></a>

**問題 PML2-22-A04**
- Level: A
- $-\kappa u''=x^2$、$u(0)=u(1)=0$、$\kappa>0$ を一節点 $x_1=1/2$ で離散化し、状態値 $u_h(\kappa)$ とその感度を求めよ。連続解の中点値との違いも計算せよ。

<!-- solution-start -->
**詳細解答。** $h=1/2$、$u_0=u_2=0$ なので中央差分は $-\kappa(0-2u_h+0)/(1/2)^2=8\kappa u_h$。右辺は $(1/2)^2=1/4$ より $8\kappa u_h=1/4$、$u_h=1/(32\kappa)$。感度は $u_h'=-1/(32\kappa^2)$。連続解 $u=(x-x^4)/(12\kappa)$ の中点値は $7/(192\kappa)$ なので、離散値との差は $7/(192\kappa)-6/(192\kappa)=1/(192\kappa)$。感度差も $-1/(192\kappa^2)$ と確かめられる。
<!-- solution-end -->

<a id="ex-pml2-22-a05"></a>

**問題 PML2-22-A05**
- Level: A
- $u^{(k+1)}=u^{(k)}-\alpha(8\kappa u^{(k)}-1/4)$、$u^{(0)}=0$ で、$\alpha=1/16,\ \kappa=1$ とする。一回反復の値、残差、出力の $\kappa$ 微分、厳密解の $\kappa$ 微分を求めよ。$\alpha$ は $\kappa$ に依存しない。

<!-- solution-start -->
**詳細解答。** $u^{(1)}=\alpha/4=1/64$。残差は $8\kappa u^{(1)}-1/4=8/64-1/4=-1/8$。一回反復の値 $u^{(1)}=1/64$ は $\kappa$ に依存しないから微分は零。厳密解 $u_*=1/(32\kappa)$ の微分は $u_*'=-1/(32\kappa^2)$、$\kappa=1$ では $-1/32$。残差が非零であり、両者は別の関数を微分している。
<!-- solution-end -->

### Level B：随伴の再構成と勾配不一致の判定

<a id="ex-pml2-22-b01"></a>

**問題 PML2-22-B01**
- Level: B
- $\theta>0$、$A(\theta)=\theta\begin{pmatrix}2&-1\\-1&2\end{pmatrix}$、$b=(1,1)^T$、$J(u)=\frac12(u_1-1)^2$ とする。$\theta=2$ の全勾配を直接法と随伴法で求めて一致させよ。

<!-- solution-start -->
**詳細解答。** $M(1,1)^T=(1,1)^T$ なので $u=(1/\theta,1/\theta)^T$。$\theta=2$ では $u=(1/2,1/2)^T$、$u'=(-1/4,-1/4)^T$、$g=\nabla_uJ=(-1/2,0)^T$。直接法の勾配は $g^T u'=(-1/2)(-1/4)=1/8$。随伴方程式は $2M\lambda=g$ で、$M^{-1}=\frac13\begin{pmatrix}2&1\\1&2\end{pmatrix}$ より $\lambda=(1/2)M^{-1}g=(-1/6,-1/12)^T$。$A'=M$、$b'=0$、$-A'u=-(1/2,1/2)^T$ だから随伴勾配は $\lambda^T(-A'u)=1/12+1/24=1/8$。$\det A=3\theta^2>0$ も成り立つ。
<!-- solution-end -->

<a id="ex-pml2-22-b02"></a>

**問題 PML2-22-B02**
- Level: B
- $\theta>0$、$A=2+\theta,\ b=\theta^2,\ J(u,\theta)=\frac12(u-1)^2+\theta^2$ に対し $\theta=1$ の勾配を、直接法と随伴法で別々に求めよ。$J_\theta$ を状態微分と混同しないこと。

<!-- solution-start -->
**詳細解答。** $u(1)=1/3$、$u'(1)=(b'-A'u)/A=(2-1/3)/3=5/9$。$J_u=u-1=-2/3$、$J_\theta=2\theta=2$ なので直接法では $L'=2+(-2/3)(5/9)=2-10/27=44/27$。随伴法では $A^T\lambda=J_u$ は $3\lambda=-2/3$、$\lambda=-2/9$。$b'-A'u=5/3$ より $L'=J_\theta+\lambda(b'-A'u)=2-10/27=44/27$。明示的な $J_\theta$ と状態経由の項をそれぞれ一回だけ足す。
<!-- solution-end -->

<a id="ex-pml2-22-b03"></a>

**問題 PML2-22-B03**
- Level: B
- $\theta\in\mathbb R$、$A(\theta)=\begin{pmatrix}2&0\\0&1\end{pmatrix}$、$b(\theta)=(\theta,\theta^2)^T$、$J(u)=u_1+3u_2$ とする。随伴変数を一度求め、任意の $\theta$ で $L'(\theta)$ を出せ。直接解との照合も行え。

<!-- solution-start -->
**詳細解答。** $A$ は常に可逆。$g=(1,3)^T$ に対して $A^T\lambda=g$ は $2\lambda_1=1,\ \lambda_2=3$ であり、$\lambda=(1/2,3)^T$。$A'=0$、$b'=(1,2\theta)^T$ だから随伴公式は $L'=\lambda^Tb'=1/2+6\theta$。直接解 $u=(\theta/2,\theta^2)^T$、$L=\theta/2+3\theta^2$ を微分しても $L'=1/2+6\theta$。目的関数が一つなら随伴解を再利用できる例である。
<!-- solution-end -->

<a id="ex-pml2-22-b04"></a>

**問題 PML2-22-B04**
- Level: B
- $a>0,\ \theta>0$、一変数の線形方程式 $\theta u=a$ を考える。初期値 $u^{(0)}=0$、固定 $\alpha>0$ の反復 $u^{(k+1)}=u^{(k)}-\alpha(\theta u^{(k)}-a)$ が収束する条件を求め、二回反復した出力とその $\theta$ 微分を計算せよ。厳密解の微分と比較せよ。

<!-- solution-start -->
**詳細解答。** 厳密解 $u_*=a/\theta$ を反復式から引くと $e^{(k+1)}=(1-\alpha\theta)e^{(k)}$。すべての初期誤差から収束する必要十分条件は $|1-\alpha\theta|<1$、つまり $0<\alpha\theta<2$。一回目は $u^{(1)}=\alpha a$、二回目は $u^{(2)}=\alpha a-\alpha(\theta\alpha a-a)=2\alpha a-\alpha^2a\theta$。$\alpha$ を固定して微分すると $(u^{(2)})'=-\alpha^2a$。厳密解の感度は $u_*'=-a/\theta^2$ であり、一般には異なる。例えば $\alpha\theta=1/2$ なら二回値は $(3/4)a/\theta$、微分値は $-a/(4\theta^2)$ で厳密感度 $-a/\theta^2$ とは一致しない。ここで比較時も $\alpha$ を固定し、$\alpha=1/(2\theta)$ と再定義してから微分しないことが重要である。
<!-- solution-end -->

### Level C：感度・随伴・連続と離散の統合

<a id="ex-pml2-22-c01"></a>

**問題 PML2-22-C01**
- Level: C
- $\kappa>0$ の連続問題 $-\kappa u''=x^2$、$u(0)=u(1)=0$ を考え、中央の真の観測値を $y=0$ とする。$q(\kappa)=u(1/2;\kappa)$、$L(\kappa)=\frac12(q(\kappa)-y)^2$ とする。一方、一節点 $h=1/2$ の差分解 $q_h(\kappa)$ を用いた離散損失 $L_h(\kappa)=\frac12(q_h(\kappa)-y)^2$ を作る。(i) 連続解と離散解をそれぞれ求める。(ii) $L'(\kappa)$ を連続解から、$L_h'(\kappa)$ を離散随伴方程式から求める。(iii) $\kappa=1$ で両勾配の差と、その原因を示す。

<!-- solution-start -->
**詳細解答。** (i) 二階微分を二回積分すると $u(x)=(x-x^4)/(12\kappa)$ であり、$q=7/(192\kappa)$。差分では $A=8\kappa,\ b=1/4$、$q_h=b/A=1/(32\kappa)=6/(192\kappa)$。(ii) 連続損失は $L=\frac12(7/192)^2\kappa^{-2}$ だから $L'=-(7/192)^2\kappa^{-3}=-49/(36864\kappa^3)$。離散随伴は $J(q_h)=q_h^2/2$ より $g=J_u=q_h$、$A^T\lambda=8\kappa\lambda=q_h$、従って $\lambda=q_h/(8\kappa)=1/(256\kappa^2)$。$A'=8,\ b'=0$ なので $b'-A'q_h=-8/(32\kappa)=-1/(4\kappa)$。随伴勾配は $L_h'=\lambda(b'-A'q_h)=-1/(1024\kappa^3)=-36/(36864\kappa^3)$。(iii) $\kappa=1$ で $L'-L_h'=(-49+36)/36864=-13/36864$。元の解を差分近似したときの中点値が $7/192$ と $6/192$ で異なるため、二乗損失とその感度の両方に離散化誤差が入る。離散随伴は $L_h$ を正確に微分しており、計算法の不整合ではない。
<!-- solution-end -->

## 9. 次にどこを検証するか

ここまでの導出で、同一の離散系に対する**直接感度法と離散随伴法は同じ全勾配**を計算すること、反復を途中で止めた場合には**反復アルゴリズムの勾配**を得ること、離散問題の勾配と連続問題の勾配には**離散化誤差**があり得ることを分離できた。

次講 PML2-23 では時間発展に対する tangent / adjoint を扱い、ステップ幅・安定性・長時間積分が勾配へ与える影響を計算する。