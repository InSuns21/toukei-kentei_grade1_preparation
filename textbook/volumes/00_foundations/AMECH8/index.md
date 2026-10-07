# AMECH8 Hamilton--Jacobi 理論

<!-- definition-example-audit: strict -->

AMECH7 では、第2種母関数 $F_2(q,P,t)$ を使うと

$$
p_i=\frac{\partial F_2}{\partial q_i},
\qquad
Q_i=\frac{\partial F_2}{\partial P_i},
$$

$$
K(Q,P,t)
=
H(q,p,t)
+
\frac{\partial F_2}{\partial t}
$$

となることを示しました。

ここで最も大胆な選択は、新しい Hamiltonian を単に簡単にするのではなく

$$
K=0
$$

にしてしまうことです。もしこれができれば、新しい Hamilton 方程式は

$$
\dot Q_i=0,
\qquad
\dot P_i=0
$$

となり、新変数は全部定数になります。

つまり元の運動を直接積分する代わりに、**運動を定数へ写す母関数を探す**問題へ変えられます。その母関数が満たす偏微分方程式が Hamilton--Jacobi 方程式です。

本章の中心問いは次です。

> **Hamilton 方程式の軌道を直接追わず、1個の関数 $S$ を求めることで運動全体を再構成できるか。**

本章では

$$
\text{母関数で }K=0
\longrightarrow
\text{Hamilton--Jacobi 方程式}
\longrightarrow
\text{主関数}
\longrightarrow
\text{完全積分}
\longrightarrow
\text{軌道の再構成}
$$

という流れを作り、さらに自律系の特性関数、1自由度の求積、中心力へ進みます。

Hamilton--Jacobi 方程式を一般一階 PDE として扱う理論、特性曲線、焦散、古典解破綻後の粘性解は
[PDE12](../PDE12/index.md?id=def-pde12-hamilton-jacobi)
が正本です。本章は解析力学から式が現れる理由と、その式から軌道を回収する方法に集中します。

---

## 1. $K=0$ を要求すると Hamilton--Jacobi 方程式が現れる

AMECH7 の第2種母関数を

$$
F_2(q,P,t)=S(q,P,t)
$$

と書き直します。

元の運動量は

$$
p_i=\frac{\partial S}{\partial q_i}
$$

です。したがって新 Hamiltonian は

$$
K
=
H\left(
q,
\frac{\partial S}{\partial q},
t
\right)
+
\frac{\partial S}{\partial t}.
$$

ここで $K=0$ を要求すれば、求めるべき $S$ の方程式が得られます。

<a id="thm-amech8-hj-reduction"></a>

<!-- formal-statement-start -->
> **定理（母関数による Hamilton--Jacobi 還元）**  
> $H(q,p,t)$ を $C^2$ 級 Hamiltonian とする。$S(q,P,t)$ を $C^2$ 級関数とし、
>
$$
p_i=\frac{\partial S}{\partial q_i},
\qquad
Q_i=\frac{\partial S}{\partial P_i}
$$
>
> が局所的な第2種正準変換を定めるとする。すなわち混合 Hessian
>
$$
\left(
\frac{\partial^2S}{\partial q_i\partial P_j}
\right)_{i,j}
$$
>
> が考えている領域で可逆であるとする。このとき、新 Hamiltonian を $K=0$ にする条件は
>
$$
\boxed{
\frac{\partial S}{\partial t}
+
H\left(
q,
\frac{\partial S}{\partial q},
t
\right)
=
0
}
$$
>
> である。この式を満たすと、新正準変数は
>
$$
\dot Q_i=0,
\qquad
\dot P_i=0
$$
>
> を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

AMECH7 の時間依存第2種母関数の公式から

$$
K
=
H(q,p,t)
+
\frac{\partial S}{\partial t}
$$

です。

また母関数の定義から

$$
p_i
=
\frac{\partial S}{\partial q_i}.
$$

したがって右辺の $p$ を $S_q$ で置き換えると

$$
K
=
H\left(
q,
\frac{\partial S}{\partial q},
t
\right)
+
\frac{\partial S}{\partial t}.
$$

よって $K=0$ とする条件は

$$
\frac{\partial S}{\partial t}
+
H\left(
q,
\frac{\partial S}{\partial q},
t
\right)
=
0.
$$

さらに新変数は Hamilton 方程式

$$
\dot Q_i
=
\frac{\partial K}{\partial P_i},
\qquad
\dot P_i
=
-
\frac{\partial K}{\partial Q_i}
$$

に従います。$K$ が恒等的に 0 なら、そのすべての偏微分も 0 なので

$$
\dot Q_i=0,
\qquad
\dot P_i=0.
$$

これで示されました。
<!-- proof-end -->

ここで重要なのは、Hamilton--Jacobi 法が微分方程式を消しているわけではないことです。

元の $2n$ 本の一階常微分方程式を

$$
(q(t),p(t))
$$

について解く問題を、1個の一階偏微分方程式を

$$
S(q,P,t)
$$

について解く問題へ移しています。

この移し替えが有利なのは、変数分離や対称性により $S$ の形を体系的に選べるときです。

---

## 2. 主関数は「実際の軌道に沿った作用」を端点の関数にしたもの

Hamilton--Jacobi 方程式に現れる $S$ は、単なる計算上の母関数ではありません。

AMECH3 の作用

$$
\mathcal S[q]
=
\int_{t_0}^{t}
L(q,\dot q,\tau)\,d\tau
$$

を、Euler--Lagrange 方程式を満たす実際の軌道に沿って評価します。初期端点 $(q_0,t_0)$ を固定し、終端 $(q,t)$ を動かして得られる値を、終端の関数として見ます。

この関数が Hamilton の主関数です。

<a id="def-amech8-principal-function"></a>

<!-- formal-statement-start -->
> **定義（Hamilton の主関数）**  
> 正則な Lagrangian $L(q,\dot q,t)$ を考える。固定した初期端点 $(q_0,t_0)$ と、近傍の終端 $(q,t)$ の間に、境界条件を満たす古典軌道 $q_{\mathrm{cl}}(\tau)$ が局所的に一意に存在するとする。このとき
>
$$
\boxed{
S(q,t)
=
\int_{t_0}^{t}
L\left(
q_{\mathrm{cl}}(\tau),
\dot q_{\mathrm{cl}}(\tau),
\tau
\right)d\tau
}
$$
>
> を、固定した初期端点に対する Hamilton の主関数という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-amech8-principal-function -->
### 例：自由粒子の主関数

**定義の確認**として、一次元自由粒子

$$
L=\frac{m}{2}\dot q^2
$$

で、$(q_0,t_0)$ から $(q,t)$ を結ぶ古典軌道は等速運動です。

$$
q_{\mathrm{cl}}(\tau)
=
q_0
+
\frac{q-q_0}{t-t_0}
(\tau-t_0).
$$

したがって

$$
\dot q_{\mathrm{cl}}
=
\frac{q-q_0}{t-t_0}
$$

は一定です。

作用を積分すると

$$
\begin{aligned}
S(q,t)
&=
\int_{t_0}^{t}
\frac{m}{2}
\left(
\frac{q-q_0}{t-t_0}
\right)^2
d\tau\\
&=
\frac{m}{2}
\left(
\frac{q-q_0}{t-t_0}
\right)^2
(t-t_0)\\
&=
\boxed{
\frac{m(q-q_0)^2}{2(t-t_0)}
}.
\end{aligned}
$$

この式を後で Hamilton--Jacobi 方程式へ直接代入して確かめます。
<!-- definition-example-end -->

主関数を端点で微分すると、終端の運動量と Hamiltonian が出てきます。

<a id="thm-amech8-endpoint-derivatives"></a>

<!-- formal-statement-start -->
> **定理（主関数の端点微分）**  
> 上の定義の仮定に加え、古典軌道が終端 $(q,t)$ に関して滑らかに変化するとする。終端での共役運動量を
>
$$
p_i
=
\frac{\partial L}{\partial \dot q_i}
$$
>
> とし、Hamiltonian を
>
$$
H(q,p,t)
=
p\cdot\dot q-L
$$
>
> とする。このとき
>
$$
\boxed{
\frac{\partial S}{\partial q_i}=p_i
}
$$
>
> および
>
$$
\boxed{
\frac{\partial S}{\partial t}=-H(q,p,t)
}
$$
>
> が成り立つ。従って
>
$$
\boxed{
S_t+H(q,S_q,t)=0
}
$$
>
> であり、主関数は Hamilton--Jacobi 方程式を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

軌道全体を変分すると、積分内部には Euler--Lagrange 方程式が現れます。古典軌道上ではその項が消え、端点項だけが残ります。

時間端点も動かすと、終端で

$$
p\cdot \delta q-H\,\delta t
$$

が残ります。これを $S$ の全微分

$$
\delta S
=
S_q\cdot\delta q+S_t\delta t
$$

と比較します。

<!-- proof-start -->
### 証明

古典軌道を $q_{\mathrm{cl}}$ とします。終端を

$$
(q,t)
\longmapsto
(q+\delta q,t+\delta t)
$$

と変化させ、それに伴う古典軌道の変化を $\delta q(\tau)$ と書きます。

作用の一次変分は

$$
\delta S
=
\delta
\int_{t_0}^{t}
L(q,\dot q,\tau)\,d\tau.
$$

まず上端の変化から

$$
L(q,\dot q,t)\,\delta t
$$

が出ます。積分内部の変化は

$$
\int_{t_0}^{t}
\left(
\frac{\partial L}{\partial q_i}\delta q_i
+
\frac{\partial L}{\partial \dot q_i}\delta \dot q_i
\right)d\tau
$$

です。

第2項を部分積分すると

$$
\int_{t_0}^{t}
\frac{\partial L}{\partial \dot q_i}
\delta \dot q_i\,d\tau
=
\left[
p_i\delta q_i
\right]_{t_0}^{t}
-
\int_{t_0}^{t}
\dot p_i\delta q_i\,d\tau.
$$

初期端点は固定なので

$$
\delta q(t_0)=0.
$$

また古典軌道上では Euler--Lagrange 方程式

$$
\dot p_i
=
\frac{\partial L}{\partial q_i}
$$

が成り立つので、積分内部は

$$
\int_{t_0}^{t}
\left(
\frac{\partial L}{\partial q_i}
-
\dot p_i
\right)\delta q_i\,d\tau
=
0
$$

です。

ただし、終端時刻が変化するとき、軌道上の終端変位と座標として指定した終端変位を区別する必要があります。

時刻が $\delta t$ だけ延びれば、元の軌道は

$$
\dot q(t)\,\delta t
$$

だけ進みます。したがって、変分場の終端値は

$$
\delta q_{\mathrm{field}}(t)
=
\delta q-\dot q(t)\delta t.
$$

以上から

$$
\begin{aligned}
\delta S
&=
L\,\delta t
+
p\cdot
\left(
\delta q-\dot q\,\delta t
\right)\\
&=
p\cdot\delta q
+
\left(
L-p\cdot\dot q
\right)\delta t.
\end{aligned}
$$

Hamiltonian の定義

$$
H=p\cdot\dot q-L
$$

を使うと

$$
\boxed{
\delta S
=
p\cdot\delta q
-
H\,\delta t
}.
$$

一方、$S(q,t)$ の全微分は

$$
\delta S
=
\frac{\partial S}{\partial q}\cdot\delta q
+
\frac{\partial S}{\partial t}\delta t.
$$

$\delta q$ と $\delta t$ は独立に選べるので係数を比較して

$$
\frac{\partial S}{\partial q_i}=p_i,
\qquad
\frac{\partial S}{\partial t}=-H.
$$

最後に $p=S_q$ を代入すると

$$
S_t+H(q,S_q,t)=0
$$

を得ます。
<!-- proof-end -->

自由粒子の例で確認します。

$$
S(q,t)
=
\frac{m(q-q_0)^2}{2(t-t_0)}
$$

なので

$$
S_q
=
\frac{m(q-q_0)}{t-t_0}
=
p.
$$

また

$$
S_t
=
-
\frac{m(q-q_0)^2}{2(t-t_0)^2}.
$$

自由粒子の Hamiltonian

$$
H=\frac{p^2}{2m}
$$

へ $p=S_q$ を代入すると

$$
H
=
\frac{m(q-q_0)^2}{2(t-t_0)^2}.
$$

従って

$$
S_t+H=0
$$

です。

---

## 3. 一つの解ではなく「$n$ 個の定数を持つ解族」が運動全体を作る

Hamilton--Jacobi 方程式の一つの解 $S(q,t)$ だけでは、一つの波面あるいは一つの軌道族しか表せません。

$n$ 自由度の Hamilton 系の一般解には、初期条件を表すために合計 $2n$ 個の定数が必要です。

そこで Hamilton--Jacobi 方程式の解を

$$
S(q,\alpha,t),
\qquad
\alpha=(\alpha_1,\ldots,\alpha_n)
$$

という $n$ 個のパラメータを持つ族として求めます。

さらに $\alpha$ が本当に独立な新運動量として働くためには

$$
\frac{\partial^2 S}
{\partial q_i\partial \alpha_j}
$$

が退化してはいけません。

<a id="def-amech8-complete-integral"></a>

<!-- formal-statement-start -->
> **定義（完全積分）**  
> $n$ 自由度の Hamilton--Jacobi 方程式
>
$$
S_t+H(q,S_q,t)=0
$$
>
> に対し、$n$ 個のパラメータ
>
$$
\alpha=(\alpha_1,\ldots,\alpha_n)
$$
>
> を持つ $C^2$ 級解族 $S(q,\alpha,t)$ を考える。混合 Hessian
>
$$
\boxed{
\det
\left(
\frac{\partial^2S}
{\partial q_i\partial\alpha_j}
\right)
\ne0
}
$$
>
> が成り立つとき、$S(q,\alpha,t)$ を完全積分という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-amech8-complete-integral -->
### 例：一次元自由粒子の完全積分

**定義の確認**として、自由粒子

$$
H(q,p)=\frac{p^2}{2m}
$$

に対し

$$
S(q,\alpha,t)
=
\alpha q
-
\frac{\alpha^2}{2m}t
$$

とします。

まず

$$
S_t
=
-\frac{\alpha^2}{2m},
\qquad
S_q=\alpha.
$$

したがって

$$
S_t+\frac{S_q^2}{2m}
=
-\frac{\alpha^2}{2m}
+
\frac{\alpha^2}{2m}
=
0.
$$

次に

$$
\frac{\partial^2S}{\partial q\partial\alpha}
=
1
\ne0.
$$

従ってこの $S$ は完全積分です。

ここで $\alpha$ はそのまま一定運動量になります。
<!-- definition-example-end -->

完全積分を母関数として使うと

$$
P_i=\alpha_i
$$

を新運動量に選べます。対応する新座標は

$$
Q_i
=
\frac{\partial S}{\partial\alpha_i}.
$$

Hamilton--Jacobi 方程式により $K=0$ なので、これらも定数になります。

<a id="thm-amech8-complete-reconstruction"></a>

<!-- formal-statement-start -->
> **定理（完全積分からの運動再構成）**  
> $S(q,\alpha,t)$ を完全積分とする。第2種母関数として
>
$$
F_2(q,P,t)=S(q,P,t)
$$
>
> と置き、新運動量を $P=\alpha$ とする。このとき
>
$$
\boxed{
\beta_i
=
\frac{\partial S}{\partial\alpha_i}(q,\alpha,t)
}
$$
>
> は運動に沿って定数である。さらに
>
$$
\boxed{
p_i
=
\frac{\partial S}{\partial q_i}(q,\alpha,t)
}
$$
>
> である。従って、定数 $(\alpha,\beta)$ を指定し、
>
$$
\beta
=
S_\alpha(q,\alpha,t)
$$
>
> を局所的に $q$ について解けば $q(t)$ が得られ、その後 $p=S_q$ から $p(t)$ が得られる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

完全積分の非退化条件から

$$
F_2(q,P,t)=S(q,P,t)
$$

は局所的に第2種母関数として使えます。

したがって

$$
p_i
=
\frac{\partial S}{\partial q_i},
\qquad
Q_i
=
\frac{\partial S}{\partial P_i}.
$$

新運動量を

$$
P_i=\alpha_i
$$

と書けば

$$
Q_i
=
\frac{\partial S}{\partial\alpha_i}.
$$

Hamilton--Jacobi 方程式により新 Hamiltonian は

$$
K=0.
$$

従って

$$
\dot P_i
=
-
\frac{\partial K}{\partial Q_i}
=
0,
$$

$$
\dot Q_i
=
\frac{\partial K}{\partial P_i}
=
0.
$$

よって

$$
P_i=\alpha_i,
\qquad
Q_i=\beta_i
$$

はすべて定数です。

最後に

$$
\beta_i
=
\frac{\partial S}{\partial\alpha_i}(q,\alpha,t)
$$

を $q$ について解き、

$$
p_i
=
\frac{\partial S}{\partial q_i}
$$

へ代入すれば元の正準変数が回収されます。
<!-- proof-end -->

自由粒子の完全積分

$$
S
=
\alpha q-\frac{\alpha^2}{2m}t
$$

では

$$
\beta
=
\frac{\partial S}{\partial\alpha}
=
q-\frac{\alpha}{m}t.
$$

従って

$$
q(t)
=
\beta+\frac{\alpha}{m}t.
$$

また

$$
p=S_q=\alpha.
$$

つまり

$$
\boxed{
q(t)=q_0+\frac{p_0}{m}t,
\qquad
p(t)=p_0
}
$$

という通常の自由粒子解が、完全積分から回収されました。

---

## 4. 自律系では時間を分離して特性関数を作る

Hamiltonian が時刻に陽に依存しない

$$
H=H(q,p)
$$

とします。

エネルギーを $E$ として

$$
S(q,t)
=
W(q)-Et
$$

という形を試します。

すると

$$
S_t=-E,
\qquad
S_q=W_q.
$$

Hamilton--Jacobi 方程式は

$$
-E+H(q,W_q)=0
$$

となるので

$$
\boxed{
H(q,W_q)=E
}
$$

という時間を含まない方程式へ移ります。

この $W$ を Hamilton の特性関数と呼びます。

<a id="def-amech8-characteristic-function"></a>

<!-- formal-statement-start -->
> **定義（Hamilton の特性関数）**  
> 時間に陽に依存しない Hamiltonian $H(q,p)$ に対し、定数 $E$ を用いて
>
$$
S(q,t)=W(q)-Et
$$
>
> と書ける Hamilton--Jacobi 解を考える。このとき
>
$$
\boxed{
H\left(
q,
\frac{\partial W}{\partial q}
\right)
=
E
}
$$
>
> を満たす $W$ を Hamilton の特性関数という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-amech8-characteristic-function -->
### 例：自由粒子の特性関数

**定義の確認**として、一次元自由粒子では

$$
\frac{1}{2m}
\left(
\frac{dW}{dq}
\right)^2
=
E.
$$

従って、運動量の符号を一つ固定した区間では

$$
\frac{dW}{dq}
=
\sigma\sqrt{2mE},
\qquad
\sigma\in\{+1,-1\}.
$$

積分すると

$$
W(q,E)
=
\sigma\sqrt{2mE}\,q+C(E).
$$

$C(E)$ は $q$ に依存しないので、軌道を作る局所計算では基準の選択に対応します。
<!-- definition-example-end -->

自律系で完全積分を作る場合、$n$ 個の独立定数の一つを $E$ に選び、残りを $\alpha_2,\ldots,\alpha_n$ とするのが典型です。

---

## 5. 1自由度では Hamilton--Jacobi 方程式が求積に下がる

一次元の自然な Hamiltonian

$$
H(q,p)
=
\frac{p^2}{2m}
+
V(q)
$$

を考えます。

特性関数の方程式は

$$
\frac{1}{2m}
\left(
\frac{dW}{dq}
\right)^2
+
V(q)
=
E.
$$

したがって

$$
\frac{dW}{dq}
=
\sigma
\sqrt{
2m(E-V(q))
}
$$

です。

<a id="prop-amech8-one-dof-quadrature"></a>

<!-- formal-statement-start -->
> **命題（1自由度 Hamilton--Jacobi 法の求積）**  
> 区間 $I$ 上で
>
$$
E>V(q)
$$
>
> とし、運動量の符号 $\sigma\in\{+1,-1\}$ を固定する。この区間で
>
$$
\boxed{
W(q,E)
=
\int_{q_*}^{q}
\sigma
\sqrt{
2m(E-V(\xi))
}
\,d\xi
}
$$
>
> と置けば
>
$$
S(q,E,t)=W(q,E)-Et
$$
>
> は Hamilton--Jacobi 方程式を満たす。また
>
$$
\boxed{
\beta
=
\frac{\partial W}{\partial E}(q,E)-t
}
$$
>
> は運動に沿って一定であり、
>
$$
\boxed{
t-\tilde t_0
=
\int_{q_*}^{q}
\frac{m\,d\xi}
{\sigma\sqrt{2m(E-V(\xi))}}
}
$$
>
> という通常の時間積分を再現する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

積分の上端微分から

$$
\frac{\partial W}{\partial q}
=
\sigma
\sqrt{
2m(E-V(q))
}.
$$

従って

$$
\frac{1}{2m}
\left(
\frac{\partial W}{\partial q}
\right)^2
+
V(q)
=
E.
$$

よって

$$
S=W-Et
$$

は Hamilton--Jacobi 方程式を満たします。

次に完全積分の再構成公式から

$$
\beta
=
\frac{\partial S}{\partial E}
=
\frac{\partial W}{\partial E}-t
$$

は定数です。

積分の被積分関数を $E$ で微分すると

$$
\frac{\partial}{\partial E}
\sqrt{2m(E-V)}
=
\frac{m}
{\sqrt{2m(E-V)}}.
$$

したがって

$$
\frac{\partial W}{\partial E}
=
\int_{q_*}^{q}
\frac{m\,d\xi}
{\sigma\sqrt{2m(E-V(\xi))}}
+
C'(E).
$$

$C'(E)$ と $-\beta$ を合わせて時間原点 $\tilde t_0$ に吸収すれば

$$
t-\tilde t_0
=
\int_{q_*}^{q}
\frac{m\,d\xi}
{\sigma\sqrt{2m(E-V(\xi))}}.
$$

一方 Hamilton 方程式では

$$
\dot q
=
\frac{p}{m}
=
\frac{\sigma}{m}
\sqrt{2m(E-V(q))}.
$$

従って

$$
dt
=
\frac{m\,dq}
{\sigma\sqrt{2m(E-V(q))}},
$$

であり、同じ時間積分を得ます。
<!-- proof-end -->

### 転回点では一つの枝だけでは足りない

転回点では

$$
E=V(q)
$$

となり

$$
p=0.
$$

その前後で運動量の符号が変わるので、一つの $\sigma$ を固定した式だけで軌道全体を覆うことはできません。

Hamilton--Jacobi 法は局所的には非常に強力ですが、**枝の選択と非退化条件を無視して一枚の式を全域へ延長してはいけません。**

この局所性は PDE12 の特性焦散や古典解の多価化ともつながります。

---

## 6. 調和振動子では位相が角度として現れる

一次元調和振動子

$$
H
=
\frac{p^2}{2m}
+
\frac12m\omega^2q^2
$$

を考えます。

エネルギー $E>0$ に対して

$$
p
=
\frac{dW}{dq}
=
\sigma
\sqrt{
2mE-m^2\omega^2q^2
}.
$$

転回点は

$$
q=\pm A,
\qquad
A=
\sqrt{
\frac{2E}{m\omega^2}
}.
$$

です。

時間積分は

$$
t-\tilde t_0
=
\int
\frac{m\,dq}
{\sqrt{2mE-m^2\omega^2q^2}}.
$$

$q=A\sin\theta$ と置くと

$$
dq=A\cos\theta\,d\theta
$$

であり、分母は

$$
m\omega A|\cos\theta|
$$

です。一つの枝で $\cos\theta$ の符号を固定すれば

$$
t-\tilde t_0
=
\frac{\theta}{\omega}
+
\text{定数}.
$$

従って

$$
\theta
=
\omega(t-t_0)
$$

とでき、

$$
\boxed{
q(t)
=
A\sin\bigl(\omega(t-t_0)\bigr)
}
$$

を得ます。

Hamilton--Jacobi 法では、調和振動子の周期運動が「特性関数をエネルギーで微分した量」から角度変数として現れます。

ただし、作用角変数の一般論は後続の可積分系の講義へ送ります。本章ではこの具体例までを扱います。

---

## 7. 中心力では $r$ と $\theta$ が分離する

平面内の中心力を極座標で考えます。

Hamiltonian は

$$
H
=
\frac{p_r^2}{2m}
+
\frac{p_\theta^2}{2mr^2}
+
V(r).
$$

$\theta$ は循環座標なので

$$
p_\theta=\ell
$$

は一定です。

Hamilton--Jacobi 方程式に対し

$$
S(r,\theta,t)
=
W_r(r;E,\ell)
+
\ell\theta
-
Et
$$

という分離形を試します。

すると

$$
\frac{\partial S}{\partial r}
=
\frac{dW_r}{dr},
\qquad
\frac{\partial S}{\partial\theta}
=
\ell,
\qquad
\frac{\partial S}{\partial t}
=
-E.
$$

代入して

$$
\frac{1}{2m}
\left(
\frac{dW_r}{dr}
\right)^2
+
\frac{\ell^2}{2mr^2}
+
V(r)
=
E.
$$

したがって

$$
\boxed{
\frac{dW_r}{dr}
=
p_r
=
\sigma
\sqrt{
2m(E-V(r))
-
\frac{\ell^2}{r^2}
}
}.
$$

これは AMECH5 で見た有効ポテンシャル

$$
V_{\mathrm{eff}}(r)
=
V(r)
+
\frac{\ell^2}{2mr^2}
$$

をそのまま含んでいます。

<a id="prop-amech8-central-force-separation"></a>

<!-- formal-statement-start -->
> **命題（中心力 Hamilton--Jacobi 方程式の分離）**  
> 平面中心力 Hamiltonian
>
$$
H
=
\frac{p_r^2}{2m}
+
\frac{p_\theta^2}{2mr^2}
+
V(r)
$$
>
> に対し、局所的に
>
$$
S
=
W_r(r;E,\ell)
+
\ell\theta
-
Et
$$
>
> と置く。このとき
>
$$
\boxed{
W_r(r;E,\ell)
=
\int^r
\sigma
\sqrt{
2m(E-V(\rho))
-
\frac{\ell^2}{\rho^2}
}
\,d\rho
}
$$
>
> とできる。さらに完全積分の定数
>
$$
\beta_E
=
\frac{\partial S}{\partial E},
\qquad
\beta_\ell
=
\frac{\partial S}{\partial\ell}
$$
>
> から
>
$$
\boxed{
t-t_0
=
\int
\frac{m\,dr}{p_r}
}
$$
>
> および
>
$$
\boxed{
\theta-\theta_0
=
\int
\frac{\ell\,dr}{r^2p_r}
}
$$
>
> が得られる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず

$$
p_r
=
\frac{\partial S}{\partial r}
=
\frac{dW_r}{dr},
$$

$$
p_\theta
=
\frac{\partial S}{\partial\theta}
=
\ell.
$$

Hamilton--Jacobi 方程式へ代入すると

$$
-E
+
\frac{1}{2m}
\left(
\frac{dW_r}{dr}
\right)^2
+
\frac{\ell^2}{2mr^2}
+
V(r)
=
0.
$$

従って

$$
p_r
=
\frac{dW_r}{dr}
=
\sigma
\sqrt{
2m(E-V(r))
-
\frac{\ell^2}{r^2}
}.
$$

次に

$$
\beta_E
=
\frac{\partial S}{\partial E}
=
\frac{\partial W_r}{\partial E}
-t
$$

は一定です。

被積分関数 $p_r$ を $E$ で微分すると

$$
\frac{\partial p_r}{\partial E}
=
\frac{m}{p_r}.
$$

従って

$$
\frac{\partial W_r}{\partial E}
=
\int
\frac{m\,dr}{p_r},
$$

なので定数を時間原点へ吸収して

$$
t-t_0
=
\int
\frac{m\,dr}{p_r}.
$$

同様に

$$
\beta_\ell
=
\frac{\partial S}{\partial\ell}
=
\theta
+
\frac{\partial W_r}{\partial\ell}
$$

は一定です。

今度は

$$
\frac{\partial p_r}{\partial\ell}
=
-
\frac{\ell}{r^2p_r}.
$$

したがって

$$
\frac{\partial W_r}{\partial\ell}
=
-
\int
\frac{\ell\,dr}{r^2p_r}.
$$

よって定数を $\theta_0$ と書けば

$$
\theta-\theta_0
=
\int
\frac{\ell\,dr}{r^2p_r}.
$$

これは Hamilton 方程式から得る

$$
\frac{d\theta}{dr}
=
\frac{\dot\theta}{\dot r}
=
\frac{\ell/(mr^2)}{p_r/m}
=
\frac{\ell}{r^2p_r}
$$

と一致します。
<!-- proof-end -->

中心力で Hamilton--Jacobi 法が強い理由は、保存量 $E,\ell$ をそのまま分離定数に使い、二次元の軌道問題を一変数の積分へ落とせることです。

---

## 8. 幾何光学との類似では $S=\text{const.}$ が波面になる

Hamilton--Jacobi 方程式では

$$
p=\nabla S
$$

です。

従って $S(q,t)=\text{const.}$ という等位面に対し、運動量 $p$ はその法線方向を向きます。

幾何光学でも、位相を表す関数の等位面を波面とみなし、その法線方向に光線を追います。

この対応は

$$
\text{力学の軌道}
\longleftrightarrow
\text{光線}
$$

$$
\text{Hamilton の主関数}
\longleftrightarrow
\text{位相関数}
$$

という形で現れます。

ただし、本章では「似ている」という比喩だけで済ませません。数学的な共通部分は、どちらも一階 Hamilton--Jacobi 型方程式を持ち、その特性が Hamilton の正準方程式に従うことです。

アイコナール方程式や特性曲線の一般理論は PDE12 が担当します。

---

## 9. 半古典近似では作用が量子力学の位相へ入る

後続の数理量子力学では、波動関数の位相に古典作用が現れる近似を学びます。

典型的には小さいパラメータ $\hbar$ に対して

$$
\psi
\sim
A\,e^{iS/\hbar}
$$

のような形を仮定すると、最も高い振動を支配する位相 $S$ に対して、先頭次数で古典的 Hamilton--Jacobi 方程式が現れます。

この考え方が WKB・半古典近似への入口です。

ここで重要なのは

$$
\boxed{
\text{古典力学の作用 }S
\text{ が、量子論では位相を支配する}
}
$$

という接続です。

本章では量子力学の方程式そのものは前提にしません。量子化、作用素、Schrödinger 方程式、WKB の正当化は数理量子力学側で扱います。

---

## 10. PDE12 との責務分担

Hamilton--Jacobi 方程式は、解析力学と PDE の両方に属する境界上の主題です。

本章で閉じたことは次です。

- 正準変換の母関数から Hamilton--Jacobi 方程式が出ること
- 主関数が古典軌道上の作用であること
- 完全積分から $2n$ 個の積分定数を回収すること
- 自律系で特性関数へ分離すること
- 1自由度と中心力で軌道積分へ落とすこと

一方、PDE12 が担当するのは次です。

- 一般一階非線形 PDE としての位置付け
- Charpit の特性系
- Hamilton--Jacobi 方程式の特性曲線
- 特性写像からの局所古典解再構成
- 特性焦散
- Burgers 方程式との接続
- 古典解破綻後に必要となる粘性解への入口

同じ方程式を二重に証明するのではなく、**解析力学では母関数と作用、PDE では特性と解理論**を正本として分担します。

---

## 11. 解析力学 I の終点と次の道

ここまでで、解析力学 I は

$$
\text{拘束}
\to
\text{Lagrange 方程式}
\to
\text{作用}
\to
\text{Noether}
\to
\text{Hamilton 形式}
\to
\text{Poisson 括弧}
\to
\text{正準変換}
\to
\text{Hamilton--Jacobi}
$$

という一周を閉じました。

この先には複数の方向があります。

解析力学 II では、正準変換をシンプレクティック幾何と Lie 群作用の言葉で整理します。

変分問題では、第一変分だけでなく第二変分、Jacobi 場、安定性へ進みます。

可積分系では、Hamilton--Jacobi の分離可能性を作用角変数、Liouville--Arnold 理論、摂動論へ発展させます。

数理量子力学では、Hamiltonian、Poisson 括弧、作用、Hamilton--Jacobi 理論が、作用素・交換子・半古典近似へ接続します。

---

## 12. 本章で何ができるようになったか

本章では次を閉じました。

1. 第2種母関数で $K=0$ を要求し、Hamilton--Jacobi 方程式を導ける。
2. Hamilton の主関数を古典軌道上の作用として定義し、$S_q=p$、$S_t=-H$ を導ける。
3. 完全積分の非退化条件を説明し、$\alpha,\beta$ から元の運動を再構成できる。
4. 自律系で $S=W-Et$ と分離し、Hamilton の特性関数を使える。
5. 1自由度の自然な Hamiltonian を求積へ落とせる。
6. 調和振動子で位相を回収できる。
7. 中心力で $r,\theta$ を分離し、時間積分と軌道積分を導ける。
8. 幾何光学・WKB への接続を、共通する Hamilton--Jacobi 構造から説明できる。

---

# 演習

## Level A

### A1. 母関数から Hamilton--Jacobi 方程式を導く

$n$ 自由度の Hamiltonian $H(q,p,t)$ と第2種母関数 $S(q,P,t)$ を考える。

1. $p=S_q$ を使って新 Hamiltonian $K$ を $S$ で表せ。
2. $K=0$ を要求して Hamilton--Jacobi 方程式を導け。
3. このとき $Q,P$ が定数になる理由を示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

AMECH7 の時間依存第2種母関数の公式は

$$
K
=
H(q,p,t)+S_t
$$

です。

また

$$
p_i=S_{q_i}.
$$

従って

$$
K
=
H(q,S_q,t)+S_t.
$$

ここで $K=0$ を要求すると

$$
\boxed{
S_t+H(q,S_q,t)=0
}
$$

を得ます。

新変数は

$$
\dot Q_i=K_{P_i},
\qquad
\dot P_i=-K_{Q_i}
$$

に従います。

$K$ が恒等的に 0 なので

$$
K_{P_i}=0,
\qquad
K_{Q_i}=0.
$$

従って

$$
\boxed{
\dot Q_i=0,
\qquad
\dot P_i=0
}.
$$
<!-- solution-end -->

### A2. 自由粒子の完全積分から軌道を回収する

一次元自由粒子

$$
H=\frac{p^2}{2m}
$$

に対し

$$
S(q,\alpha,t)
=
\alpha q-\frac{\alpha^2}{2m}t
$$

を考える。

1. Hamilton--Jacobi 方程式を満たすことを確認せよ。
2. 完全積分の非退化条件を確認せよ。
3. $\beta=S_\alpha$ から $q(t)$ を求めよ。
4. $p=S_q$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

まず

$$
S_t
=
-\frac{\alpha^2}{2m},
\qquad
S_q=\alpha.
$$

従って

$$
S_t+\frac{S_q^2}{2m}
=
-\frac{\alpha^2}{2m}
+
\frac{\alpha^2}{2m}
=
0.
$$

次に

$$
S_{q\alpha}=1\ne0
$$

なので一次元の完全積分の非退化条件を満たします。

新座標は

$$
\beta
=
S_\alpha
=
q-\frac{\alpha}{m}t.
$$

よって

$$
\boxed{
q(t)
=
\beta+\frac{\alpha}{m}t
}.
$$

また

$$
\boxed{
p(t)=S_q=\alpha
}.
$$

$\alpha$ が初期運動量、$\beta$ が時刻 $0$ の位置に対応します。
<!-- solution-end -->

### A3. 自律系の時間分離

時間に陽に依存しない Hamiltonian $H(q,p)$ に対し

$$
S(q,t)=W(q)-Et
$$

と置く。

1. $S_t$ と $S_q$ を求めよ。
2. Hamilton--Jacobi 方程式から $W$ の方程式を導け。
3. $E$ の力学的意味を説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

直接微分して

$$
S_t=-E,
\qquad
S_q=W_q.
$$

Hamilton--Jacobi 方程式

$$
S_t+H(q,S_q)=0
$$

へ代入すると

$$
-E+H(q,W_q)=0.
$$

従って

$$
\boxed{
H(q,W_q)=E
}.
$$

元の Hamiltonian は自律系なので、運動に沿って Hamiltonian は保存されます。

また $p=W_q$ なので

$$
H(q,p)=E.
$$

従って $E$ は保存エネルギーです。
<!-- solution-end -->

### A4. 1自由度の求積と時間積分

$$
H(q,p)
=
\frac{p^2}{2m}+V(q)
$$

を考え、区間 $I$ 上で $E>V(q)$ とする。

1. $W_q$ を求めよ。
2. $W(q,E)$ を積分表示せよ。
3. $W_E$ を計算し、通常の $dt=m\,dq/p$ と一致することを示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

特性関数は

$$
\frac{1}{2m}W_q^2+V(q)=E
$$

を満たします。

従って一つの運動量枝を選び

$$
W_q
=
\sigma
\sqrt{2m(E-V(q))}
$$

とします。

よって

$$
\boxed{
W(q,E)
=
\int_{q_*}^{q}
\sigma
\sqrt{2m(E-V(\xi))}
\,d\xi
}.
$$

被積分関数を $E$ で微分すると

$$
\frac{\partial}{\partial E}
\left[
\sigma\sqrt{2m(E-V)}
\right]
=
\frac{m}
{\sigma\sqrt{2m(E-V)}}.
$$

したがって

$$
W_E
=
\int_{q_*}^{q}
\frac{m\,d\xi}
{\sigma\sqrt{2m(E-V(\xi))}}.
$$

一方

$$
p
=
\sigma\sqrt{2m(E-V(q))}
$$

なので Hamilton 方程式

$$
\dot q=\frac{p}{m}
$$

から

$$
dt=\frac{m\,dq}{p}
=
\frac{m\,dq}
{\sigma\sqrt{2m(E-V(q))}}.
$$

よって $W_E$ から得られる積分と一致します。
<!-- solution-end -->

## Level B

### B1. 自由粒子の端点作用から運動量と Hamiltonian を読む

一次元自由粒子の固定初期端点 $(q_0,t_0)$ に対する主関数

$$
S(q,t)
=
\frac{m(q-q_0)^2}{2(t-t_0)}
$$

を考える。

1. $S_q$ を求め、終端運動量に一致することを示せ。
2. $S_t$ を求めよ。
3. $S_t+H(q,S_q)=0$ を確認せよ。
4. $S$ が $t=t_0$ で正則でない理由を説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

まず

$$
S_q
=
\frac{m(q-q_0)}{t-t_0}.
$$

古典軌道は等速運動なので

$$
\dot q
=
\frac{q-q_0}{t-t_0}.
$$

従って

$$
m\dot q
=
\frac{m(q-q_0)}{t-t_0}
=
S_q.
$$

よって

$$
\boxed{
S_q=p
}.
$$

次に $q$ を固定して $t$ で微分すると

$$
S_t
=
-
\frac{m(q-q_0)^2}
{2(t-t_0)^2}.
$$

自由粒子の Hamiltonian は

$$
H=\frac{p^2}{2m}.
$$

$p=S_q$ を代入すれば

$$
H(q,S_q)
=
\frac{1}{2m}
\frac{m^2(q-q_0)^2}{(t-t_0)^2}
=
\frac{m(q-q_0)^2}{2(t-t_0)^2}.
$$

従って

$$
S_t+H(q,S_q)=0.
$$

最後に $t=t_0$ では、異なる位置 $q\ne q_0$ を時間ゼロで結ぶ有限速度の古典軌道は存在しません。

式でも

$$
S(q,t)
=
\frac{m(q-q_0)^2}{2(t-t_0)}
$$

の分母が 0 になります。

これは主関数が固定初期端点からの局所的な端点生成関数であり、全時空で滑らかな一枚の関数になるとは限らないことを示します。
<!-- solution-end -->

### B2. 調和振動子を Hamilton--Jacobi 法で解く

一次元調和振動子

$$
H
=
\frac{p^2}{2m}
+
\frac12m\omega^2q^2
$$

を考え、$E>0$ とする。

1. $W_q$ を求めよ。
2. 振幅
   $$
   A=\sqrt{\frac{2E}{m\omega^2}}
   $$
   を用いて $q=A\sin\theta$ と置け。
3. $W_E-t=\beta$ から $\theta=\omega(t-t_0)$ が得られることを示せ。
4. $q(t)$ を求めよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

特性関数は

$$
\frac{1}{2m}W_q^2
+
\frac12m\omega^2q^2
=
E
$$

を満たします。

従って

$$
W_q
=
p
=
\sigma
\sqrt{
2mE-m^2\omega^2q^2
}.
$$

振幅

$$
A=
\sqrt{
\frac{2E}{m\omega^2}
}
$$

を使うと

$$
2mE=m^2\omega^2A^2.
$$

よって

$$
p
=
\sigma m\omega
\sqrt{A^2-q^2}.
$$

一つの枝で

$$
q=A\sin\theta
$$

と置けば

$$
dq=A\cos\theta\,d\theta,
$$

$$
\sqrt{A^2-q^2}
=
A|\cos\theta|.
$$

枝の内部で $\sigma$ と $\cos\theta$ の符号を整合させれば

$$
\frac{m\,dq}{p}
=
\frac{d\theta}{\omega}.
$$

一方、完全積分の定数から

$$
W_E-t=\beta.
$$

従って

$$
t-\tilde t_0
=
W_E
=
\int\frac{m\,dq}{p}
=
\frac{\theta}{\omega}
+
\text{定数}.
$$

定数を $t_0$ に吸収すると

$$
\theta=\omega(t-t_0).
$$

したがって

$$
\boxed{
q(t)
=
A\sin\bigl(\omega(t-t_0)\bigr)
}.
$$

転回点では枝を切り替える必要がありますが、つなぎ合わせると通常の周期解になります。
<!-- solution-end -->

### B3. 中心力の分離から軌道微分方程式を出す

平面中心力

$$
H
=
\frac{p_r^2}{2m}
+
\frac{p_\theta^2}{2mr^2}
+
V(r)
$$

に対し

$$
S
=
W_r(r;E,\ell)
+
\ell\theta
-
Et
$$

と置く。

1. $p_r$ を $E,\ell,r$ で表せ。
2. $\beta_\ell=S_\ell$ が一定であることから
   $$
   \frac{d\theta}{dr}
   =
   \frac{\ell}{r^2p_r}
   $$
   を導け。
3. Hamilton 方程式から同じ式を独立に確認せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

Hamilton--Jacobi 方程式へ分離形を代入すると

$$
-E
+
\frac{1}{2m}
\left(
\frac{dW_r}{dr}
\right)^2
+
\frac{\ell^2}{2mr^2}
+
V(r)
=
0.
$$

従って

$$
p_r
=
\frac{dW_r}{dr}
=
\sigma
\sqrt{
2m(E-V(r))
-
\frac{\ell^2}{r^2}
}.
$$

次に

$$
\beta_\ell
=
S_\ell
=
\theta
+
\frac{\partial W_r}{\partial\ell}
$$

は一定です。

したがって

$$
d\theta
+
d\left(
\frac{\partial W_r}{\partial\ell}
\right)
=
0.
$$

固定した $E,\ell$ に対し

$$
\frac{\partial W_r}{\partial\ell}
=
\int
\frac{\partial p_r}{\partial\ell}\,dr.
$$

$p_r^2=2m(E-V)-\ell^2/r^2$ を $\ell$ で微分すると

$$
2p_r
\frac{\partial p_r}{\partial\ell}
=
-\frac{2\ell}{r^2}.
$$

従って

$$
\frac{\partial p_r}{\partial\ell}
=
-\frac{\ell}{r^2p_r}.
$$

よって

$$
\frac{d\theta}{dr}
=
\boxed{
\frac{\ell}{r^2p_r}
}.
$$

Hamilton 方程式からも

$$
\dot r
=
\frac{\partial H}{\partial p_r}
=
\frac{p_r}{m},
$$

$$
\dot\theta
=
\frac{\partial H}{\partial p_\theta}
=
\frac{\ell}{mr^2}.
$$

従って

$$
\frac{d\theta}{dr}
=
\frac{\dot\theta}{\dot r}
=
\frac{\ell/(mr^2)}{p_r/m}
=
\frac{\ell}{r^2p_r}.
$$

両者は一致します。
<!-- solution-end -->

## Level C

### C1. Kepler 問題を Hamilton--Jacobi 法から円錐曲線まで戻す

引力 Kepler potential

$$
V(r)=-\frac{k}{r},
\qquad
k>0
$$

を平面内で考える。角運動量を $\ell\ne0$、エネルギーを $E$ とする。

1. 分離形
   $$
   S=W_r(r;E,\ell)+\ell\theta-Et
   $$
   から
   $$
   p_r^2
   =
   2mE+\frac{2mk}{r}-\frac{\ell^2}{r^2}
   $$
   を示せ。
2. $u=1/r$ と置き、
   $$
   p_r=-\ell\frac{du}{d\theta}
   $$
   を示せ。
3. $u$ が
   $$
   \left(\frac{du}{d\theta}\right)^2
   +u^2
   -\frac{2mk}{\ell^2}u
   =
   \frac{2mE}{\ell^2}
   $$
   を満たすことを示せ。
4. 微分して
   $$
   u''+u=\frac{mk}{\ell^2}
   $$
   を得よ。
5. 軌道を
   $$
   \boxed{
   r(\theta)
   =
   \frac{\ell^2/(mk)}
   {1+e\cos(\theta-\theta_0)}
   }
   $$
   と表し、
   $$
   \boxed{
   e^2
   =
   1+\frac{2E\ell^2}{mk^2}
   }
   $$
   を導け。

- Level: C

<!-- solution-start -->
#### 詳細解答

Hamiltonian は

$$
H
=
\frac{p_r^2}{2m}
+
\frac{\ell^2}{2mr^2}
-
\frac{k}{r}.
$$

エネルギー $E$ と等しいので

$$
\frac{p_r^2}{2m}
+
\frac{\ell^2}{2mr^2}
-
\frac{k}{r}
=
E.
$$

両辺を $2m$ 倍して

$$
p_r^2
+
\frac{\ell^2}{r^2}
-
\frac{2mk}{r}
=
2mE.
$$

従って

$$
\boxed{
p_r^2
=
2mE
+
\frac{2mk}{r}
-
\frac{\ell^2}{r^2}
}.
$$

次に

$$
u=\frac1r.
$$

B3 で得た

$$
\frac{d\theta}{dr}
=
\frac{\ell}{r^2p_r}
$$

を逆数にすると

$$
\frac{dr}{d\theta}
=
\frac{r^2p_r}{\ell}.
$$

一方

$$
u=\frac1r
$$

を $\theta$ で微分すると

$$
\frac{du}{d\theta}
=
-\frac{1}{r^2}
\frac{dr}{d\theta}.
$$

上の式を代入して

$$
\frac{du}{d\theta}
=
-\frac{1}{r^2}
\frac{r^2p_r}{\ell}
=
-\frac{p_r}{\ell}.
$$

従って

$$
\boxed{
p_r
=
-\ell u'
}.
$$

これをエネルギー式へ代入します。$1/r=u$ なので

$$
\ell^2(u')^2
=
2mE+2mku-\ell^2u^2.
$$

両辺を $\ell^2$ で割り、すべて左へ移すと

$$
\boxed{
(u')^2
+
u^2
-
\frac{2mk}{\ell^2}u
=
\frac{2mE}{\ell^2}
}.
$$

この式を $\theta$ で微分します。

$$
2u'u''
+
2uu'
-
\frac{2mk}{\ell^2}u'
=
0.
$$

$u'\ne0$ の区間では $2u'$ で割って

$$
u''+u-\frac{mk}{\ell^2}=0.
$$

従って

$$
\boxed{
u''+u
=
\frac{mk}{\ell^2}
}.
$$

転回点で $u'=0$ でも、左右の区間で得た滑らかな解を連続的に延長すれば同じ二階方程式が成り立ちます。

定数

$$
c=\frac{mk}{\ell^2}
$$

と置くと一般解は

$$
u(\theta)
=
c
+
A\cos(\theta-\theta_0).
$$

ここで

$$
e=\frac{A}{c}
$$

と書けば

$$
u
=
\frac{mk}{\ell^2}
\left[
1+e\cos(\theta-\theta_0)
\right].
$$

従って

$$
\boxed{
r(\theta)
=
\frac{\ell^2/(mk)}
{1+e\cos(\theta-\theta_0)}
}.
$$

最後に $e$ と $E$ の関係を求めます。

一次積分

$$
(u')^2+u^2-2cu
=
\frac{2mE}{\ell^2}
$$

へ

$$
u=c+A\cos\phi,
\qquad
u'=-A\sin\phi
$$

を代入します。

左辺は

$$
A^2\sin^2\phi
+
(c+A\cos\phi)^2
-
2c(c+A\cos\phi).
$$

展開すると

$$
A^2\sin^2\phi
+
c^2
+
2cA\cos\phi
+
A^2\cos^2\phi
-
2c^2
-
2cA\cos\phi.
$$

従って

$$
A^2-c^2
=
\frac{2mE}{\ell^2}.
$$

$A=ec$ なので

$$
c^2(e^2-1)
=
\frac{2mE}{\ell^2}.
$$

さらに

$$
c^2
=
\frac{m^2k^2}{\ell^4}
$$

だから

$$
\frac{m^2k^2}{\ell^4}(e^2-1)
=
\frac{2mE}{\ell^2}.
$$

両辺に $\ell^4/(m^2k^2)$ を掛けて

$$
e^2-1
=
\frac{2E\ell^2}{mk^2}.
$$

従って

$$
\boxed{
e^2
=
1+\frac{2E\ell^2}{mk^2}
}.
$$

これにより

- $E<0$ なら $0\le e<1$ の楕円
- $E=0$ なら $e=1$ の放物線
- $E>0$ なら $e>1$ の双曲線

という Kepler 軌道の分類が Hamilton--Jacobi 分離から回収されました。
<!-- solution-end -->
