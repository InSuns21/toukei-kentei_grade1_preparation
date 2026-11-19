# SYZ1-04 正則体積形式・位相とSLag方程式

## 1. 較正の等号を、計算できる方程式へ変える

前講では、平坦な $\mathbb C^n$ で $\operatorname{Re}(e^{-i\theta}\Omega)$ が較正になることを[複素行列式の等号条件](../SYZ1-03/index.md#lem-syz1-03-complex-determinant)から証明した。そこで現れた特殊Lagrange（以下SLag）条件は「接平面がLagrangeで、正しい位相を持つ」というものだった。

しかし一般の複素多様体では、正則体積形式 $\Omega$ の大きさを勝手に1としてはいけない。また、Lagrangeであることを座標計算で確かめても、位相を確かめなければ体積最小性は得られない。

この講義では、まず規格化の意味を接基底で確定し、Lagrange部分多様体の位相を測る。その後、勾配グラフの接ベクトルに $\Omega$ を実際に代入する。最後には一つの実関数 $f$ に対する非線形偏微分方程式が得られる。

## 2. 正則体積形式の規格化：何を1にそろえるか

複素次元 $n\ge1$ のKähler多様体 $(X,J,g,\omega)$ を考える。$J$ は複素構造、$g$ はRiemann計量、$\omega(u,v)=g(Ju,v)$ はKähler形式である。$X$ には各点で零にならない正則 $n$ 形式 $\Omega$ を置く。正則 $n$ 形式とは、正則座標で

$$
\Omega=h(z)\,dz^1\wedge\cdots\wedge dz^n
$$

と書ける形式で、$h$ が正則関数であるものをいう。[複素トーラスの正則最高次形式](../../CYG/CYG1-04/index.md#prop-cyg1-04-volume-form)は具体例である。

**正規化を調べる基底。** 点 $p$ で、$e_1,\ldots,e_n$ が実ベクトルとして正規直交し、さらに $(e_1,Je_1,\ldots,e_n,Je_n)$ が $T_pX$ の正規直交基底になるように選ぶ。このとき $e_1,\ldots,e_n$ はLagrange平面を張る。どのような基底を選んでも、複素行列式の絶対値が1であることから

$$
c(p)=|\Omega_p(e_1,\ldots,e_n)|>0
$$

は基底の取り方によらない。ここで言う**規格化**とは、この $c(p)$ がすべての点で1となることを指す。

本章で一般の $X$ について較正を主張するときは、次を**明示的な仮定**とする。

$$
c(p)=1\quad(p\in X).
$$

たとえば平坦トーラスの標準計量と $\Omega=dz^1\wedge\cdots\wedge dz^n$ はこれを満たす。連結なRicci平坦Kähler多様体に平行な零でない正則体積形式が与えられる場合も、その長さは一定なので、$\Omega$ に一つの正の定数を掛けて規格化できる。一方、一般の非零正則形式に点ごとに $1/c(p)$ を掛けると、**正則性や閉性を失うことがある**。したがってこれは較正を作る一般的方法ではない。

正則座標では

$$
d\Omega
=\sum_{j=1}^n \frac{\partial h}{\partial z^j}\,
dz^j\wedge dz^1\wedge\cdots\wedge dz^n
+\sum_{j=1}^n\frac{\partial h}{\partial\bar z^j}\,
d\bar z^j\wedge dz^1\wedge\cdots\wedge dz^n=0.
$$

最初の和は同じ $dz^j$ の重複、次の和は $h$ の正則性によって消える。従って $\Omega$ と $\operatorname{Re}(e^{-i\theta}\Omega)$ は閉形式である。

### 直接例：規格化は位相条件とは別である

$\mathbb C^2$ に標準計量を入れ、$\Omega_0=dz^1\wedge dz^2$ とする。実水平平面の正規直交基底 $(\partial_{x^1},\partial_{x^2})$ では $\Omega_0=1$、従って $c=1$ である。ところが $\Omega_1=2\Omega_0$ なら評価は2で、comassも2となり、$\operatorname{Re}\Omega_1$ は較正形式ではない。虚部の零条件は変わらないのに較正が壊れる。後で虚部だけを調べる際にも、規格化の仮定を忘れてはいけない。

ここで[較正形式の定義](../SYZ1-03/index.md#def-syz1-03-calibration)は「閉形式でcomassが **1以下**」であり、「comassがちょうど1」とは異なる。例えば $\Omega_{1/2}=\Omega_0/2$ の実部は閉形式でcomassが $1/2$ だから較正形式だが、どの接平面にも体積形式との等号を与えない。本節の $c=1$ は、位相から **較正の等号** を得るための規格化である。

## 3. Lagrange部分多様体の位相写像と向き

実 $n$ 次元の向き付きLagrange部分多様体 $L\subset X$ を考える。[Lagrange部分多様体の定義](../../SYM/SYM6/index.md#def-sym6-lagrangian-submanifold)は次元 $n$ と $\omega|_L=0$ を同時に要求する。$L$ 上で正の向きの $g$-正規直交接基底 $(v_1,\ldots,v_n)$ を取ると、規格化と[複素行列式のLagrange等号条件](../SYZ1-03/index.md#lem-syz1-03-complex-determinant)により

$$
|\Omega(v_1,\ldots,v_n)|=1.
$$

正の向きの正規直交基底どうしの変換は $SO(n)$ に属し、その実行列式は1である。よって $\Omega(v_1,\ldots,v_n)$ は基底によらず、単位円 $S^1=\{w\in\mathbb C:|w|=1\}$ 上の値として決まる。この値を**位相写像**と呼ぶ。連続な実数値の位相角 $\beta$ を $L$ 全体で選べるとは限らず、一般に $\beta$ は $2\pi$ を法としてだけ定まる。

<a id="def-syz1-04-phase-map"></a>

<!-- formal-statement-start -->
> **定義（特殊Lagrange位相写像）**  
> $(X,J,g,\omega,\Omega)$ を上記の規格化条件 $c(p)=1$ を満たす複素 $n$ 次元Kähler多様体とし、$L\subset X$ を向き付きの滑らかな実 $n$ 次元Lagrange部分多様体とする。$p\in L$ における正の向きの正規直交接基底に対して
>
$$
e^{i\beta_L(p)}=\Omega_p(v_1,\ldots,v_n)\in S^1
$$
>
> と置く。基底によらない写像 $e^{i\beta_L}:L\to S^1$ を $L$ の位相写像と呼ぶ。局所的に選んだ実数値の $\beta_L$ を位相角と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-04-phase-map -->
### 直接例：水平平面の位相を定義から確かめる

**定義の確認**：標準 $\mathbb C^2$ に $\Omega=dz^1\wedge dz^2$ を置き、$L=\mathbb R^2_x\times\{0\}$ を $(x^1,x^2)$ の増加方向に向ける。外積を接ベクトルに評価すると

$$
(dz^1\wedge dz^2)(v_1,v_2)
=dz^1(v_1)dz^2(v_2)-dz^1(v_2)dz^2(v_1)
=\det\bigl(dz^j(v_k)\bigr)_{j,k=1}^2
$$

となる。この行列式は、[前講の複素体積形式の評価](../SYZ1-03/index.md#lem-syz1-03-complex-determinant)と同じく、交代形式を基底に適用した値を表す。これを使い、定義の各条件を個別に確認する。

1. $F(x^1,x^2)=(x^1,x^2,0,0)$ は埋め込みで、$L$ は実2次元である。接基底 $(v_1,v_2)=(\partial_{x^1},\partial_{x^2})$ は標準計量で正規直交であり、$\omega(v_1,v_2)=0$ なのでLagrange条件を満たす。
2. $dz^j(v_k)=\delta^j_k$ だから $\Omega(v_1,v_2)=\det I_2=1$。また、この計量での規格化係数は $c(p)=1$ である。ゆえに位相写像は全点で $e^{i\beta_L}=1$ となり、$\beta_L=0$ を選べる。
3. 別の正の向きの正規直交接基底 $(w_1,w_2)$ との変換行列 $A$ は $SO(2)$ に属する。従って $\Omega(w_1,w_2)=\det A\,\Omega(v_1,v_2)=1$ となり、選ぶ基底によらない。
4. 向きを逆転して $(v_2,v_1)$ を正の接基底とすると、$\Omega(v_2,v_1)=-1$。従って位相は $\pi$ に変わる。

位相は「向きを無視した角度」ではない。
<!-- definition-example-end -->

<a id="prop-syz1-04-slag-conditions"></a>

<!-- formal-statement-start -->
> **命題（規格化したSLag条件の同値性）**  
> $(X,J,g,\omega,\Omega)$ を複素 $n$ 次元のKähler多様体とし、$\Omega$ は零でない正則 $n$ 形式で、各点の規格化 $c(p)=1$ を満たすとする。$L\subset X$ を向き付きの滑らかな実 $n$ 次元部分多様体、$\theta\in\mathbb R$ を一定値とする。次は同値である。
>
> **（a）** $L$ は $\operatorname{Re}(e^{-i\theta}\Omega)$ で較正される。
>
> **（b）** $L$ はLagrangeで、位相写像が $e^{i\beta_L}=e^{i\theta}$ に等しい。
>
> **（c）** 次の三条件を満たす。

$$
\omega|_L=0,\qquad
\operatorname{Im}(e^{-i\theta}\Omega)|_L=0,\qquad
\operatorname{Re}(e^{-i\theta}\Omega)|_L=\operatorname{vol}_L.
$$

> 最後の等式は、最初の二条件と、**与えた向きに対する実部の正値性**に置き換えられる。
<!-- formal-statement-end -->

### 証明の見取り図

正規直交接枠で形式を評価すると、前講の較正不等式とLagrange等号条件が点ごとに使える。Lagrangeであれば $\Omega=e^{i\beta_L}\operatorname{vol}_L$ となるので、残るのは単位複素数の実部が1になる条件である。

<!-- proof-start -->
### 証明

各 $p\in X$ で上の $J$ に適合した正規直交基底を取り、$\Omega_p$ の評価を標準 $\mathbb C^n$ の $\Omega_0$ の評価へ移す。$c(p)=1$ であり、[複素行列式の不等式とLagrange等号条件](../SYZ1-03/index.md#lem-syz1-03-complex-determinant)を適用すると、任意の実正規直交 $n$ 組 $w_1,\ldots,w_n$ について

$$
\operatorname{Re}\bigl(e^{-i\theta}\Omega(w_1,\ldots,w_n)\bigr)
\le|\Omega(w_1,\ldots,w_n)|\le1.
$$

$\Omega$ の閉性は第2節で確認した。従って実部はcomassが高々1の閉形式であり、$J$ に適合した基底を一つ位相回転すれば値1を取るのでcomassは1。較正の等号が成立すると、二つの不等式の等号から $\omega|_{T_pL}=0$ と $\Omega(v_1,\ldots,v_n)=e^{i\theta}$ を得る。これは（b）である。

逆に（b）なら $\Omega|_L=e^{i\theta}\operatorname{vol}_L$。ゆえに

$$
\operatorname{Re}(e^{-i\theta}\Omega)|_L
=\operatorname{vol}_L,\qquad
\operatorname{Im}(e^{-i\theta}\Omega)|_L=0,
$$

となり（c）を満たす。（c）から（a）は[較正形式と較正部分多様体の定義](../SYZ1-03/index.md#def-syz1-03-calibration)そのものである。

最後にLagrange条件の下で虚部が0なら、$e^{-i\theta}e^{i\beta_L}$ は $+1$ または $-1$。与えた向きでの実部の正値性が $-1$ を排除し、体積形式との等号を与える。
<!-- proof-end -->

**どこで正値性が必要か。** $\mathbb C$ の実軸を増加方向に向けると $\Omega=dz$ は位相0だが、$\theta=\pi$ なら $\operatorname{Im}(e^{-i\pi}\Omega)|_L=0$ にもかかわらず $\operatorname{Re}(e^{-i\pi}\Omega)|_L=-\operatorname{vol}_L$。虚部0という式だけでは、向きを逆にした解を排除できない。

[較正された部分多様体の体積最小性](../SYZ1-03/index.md#thm-syz1-03-volume-minimization)を使う場合は、さらに比較する部分多様体のコンパクト性、境界、同一ホモロジー類など、積分比較に必要な仮定が別途必要である。非コンパクトなグラフ全体に大域的最小性を無条件で主張しない。

## 4. 勾配グラフから複素行列式を導く

ここから $\mathbb C^n=\mathbb R_x^n\times\mathbb R_y^n$ に移り、

$$
z^j=x^j+i y^j,\qquad
g=\sum_j\bigl((dx^j)^2+(dy^j)^2\bigr),\qquad
\omega=\sum_j dx^j\wedge dy^j,\qquad
\Omega=\bigwedge_{j=1}^n dz^j
$$

とする。$U\subset\mathbb R^n$ を開集合、$f:U\to\mathbb R$ を滑らかな実関数とする。$y=\nabla f(x)$ を表す写像を

$$
F(x)=\bigl(x^1,\ldots,x^n,f_1(x),\ldots,f_n(x)\bigr),
\quad f_j=\frac{\partial f}{\partial x^j}
$$

と置く。$x$ 射影が $F$ の左逆なので $F$ は埋め込みで、像は実次元 $n$。向きは $dx^1\wedge\cdots\wedge dx^n$ を正として定める。

最初に、何のためにHessianを作るかを確認する。$F$ の接ベクトルは

$$
F_j=\frac{\partial F}{\partial x^j}
=\partial_{x^j}+\sum_{k=1}^n f_{kj}\partial_{y^k},
\qquad
f_{kj}=\frac{\partial^2f}{\partial x^k\partial x^j}.
$$

そこで $H=(f_{kj})_{k,j}$ と書く。このHessianは、**グラフの接ベクトルが各 $y$ 方向へどれだけ傾くか**を表す実 $n\times n$ 行列である。混合偏導関数の交換により $H^T=H$。さらに

$$
F^*\omega=\sum_j dx^j\wedge df_j
=\sum_{j,k}f_{jk}\,dx^j\wedge dx^k=0.
$$

よって[閉1形式のグラフのLagrange判定](../../SYM/SYM6/index.md#thm-sym6-graph-criterion)と同じ結論を直接再計算できた。ここで偏導関数の交換を使っており、一般の係数写像 $y=a(x)$ では対称性が必要になる。

次は位相を測る。$dz^k(F_j)=\delta_{kj}+i f_{kj}$ である。従って $\Omega(F_1,\ldots,F_n)$ は $n$ 列の複素行列 $I+iH$ の行列式となり、

$$
F^*\Omega=\det(I+iH)\,dx^1\wedge\cdots\wedge dx^n.
$$

この行列は突然現れたものではなく、**$F_j$ に $dz^k$ を代入した値を第 $k$ 行・第 $j$ 列に並べたもの**である。

しかし $(F_j)$ は一般に正規直交ではない。誘導計量のGram行列を直接計算すると

$$
G_{jk}=g(F_j,F_k)
=\delta_{jk}+\sum_a f_{aj}f_{ak},
\qquad G=I+H^TH=I+H^2.
$$

$H$ は実対称なので実固有値 $\lambda_j$ を持つ。$I+H^2$ の固有値は $1+\lambda_j^2>0$ だから、グラフの誘導計量は正定値である。行列式についても

$$
\begin{aligned}
\det G
&=\det\bigl((I+iH)(I-iH)\bigr)\\
&=\det(I+iH)\det(I-iH)
=|\det(I+iH)|^2.
\end{aligned}
$$

よってグラフの体積形式は

$$
\operatorname{vol}_{L_f}
=\sqrt{\det G}\,dx^1\wedge\cdots\wedge dx^n
=|\det(I+iH)|\,dx^1\wedge\cdots\wedge dx^n.
$$

特に $1+i\lambda_j\ne0$ だから $\det(I+iH)\ne0$。この非零性が、位相を議論するための出発点になる。

<a id="thm-syz1-04-graph-equation"></a>

<!-- formal-statement-start -->
> **定理（勾配グラフの特殊Lagrange方程式）**  
> $U\subset\mathbb R^n$ を開集合、$f\in C^\infty(U;\mathbb R)$ とする。標準 $\mathbb C^n$ で勾配グラフ $L_f=\{x+i\nabla f(x):x\in U\}$ を $x^1,\ldots,x^n$ の増加方向に向ける。$H=D^2f$、$\theta\in\mathbb R$ は一定とする。
>
> $L_f$ が位相 $\theta$ の特殊Lagrange部分多様体であるための必要十分条件は、すべての $x\in U$ で

$$
\operatorname{Im}\!\left(e^{-i\theta}\det(I+iD^2f)\right)=0,
\qquad
\operatorname{Re}\!\left(e^{-i\theta}\det(I+iD^2f)\right)>0
$$

> が成立することである。$D^2f$ の実固有値を $\lambda_1,\ldots,\lambda_n$ とすると、同値に

$$
\sum_{j=1}^n\arctan\lambda_j
\equiv\theta\pmod{2\pi}
$$

> が成立する。$\arctan\lambda_j\in(-\pi/2,\pi/2)$ とし、合同は $2\pi$ を法とする。
<!-- formal-statement-end -->

### 証明の見取り図

グラフのLagrange性はHessianの対称性で確認済み。誘導計量を計算したため $\Omega|_{L_f}$ の大きさが体積形式に一致することも分かった。従って残りは $\det(I+iH)$ の偏角が $\theta$ と一致することだけである。固有値表示では、各因子 $1+i\lambda_j$ の偏角が $\arctan\lambda_j$ となる。

<!-- proof-start -->
### 証明

上の計算で $F$ は埋め込み、$F^*\omega=0$、$F^*\Omega=\det(I+iH)\,dx^1\wedge\cdots\wedge dx^n$ である。また誘導体積形式は $|\det(I+iH)|$ を係数に持つ。

[規格化したSLag条件の同値性](#prop-syz1-04-slag-conditions)を $L=L_f$ に適用すると、虚部が0かつ実部が正であることと、正の向きで較正されることが同値になる。$\det(I+iH)\ne0$ だから、虚部0・実部正は複素数 $e^{-i\theta}\det(I+iH)$ の偏角が0（$2\pi$ を法として）であることと同値である。

実対称行列 $H$ を実直交行列 $Q$ で対角化し、$H=Q\operatorname{diag}(\lambda_1,\ldots,\lambda_n)Q^T$ とすると

$$
\begin{aligned}
\det(I+iH)
&=\det Q\,\det\operatorname{diag}(1+i\lambda_1,\ldots,1+i\lambda_n)\,\det Q^T\\
&=\prod_{j=1}^n(1+i\lambda_j)\\
&=\left(\prod_{j=1}^n\sqrt{1+\lambda_j^2}\right)
\exp\!\left(i\sum_{j=1}^n\arctan\lambda_j\right).
\end{aligned}
$$

ここで $\det Q\det Q^T=1$、各 $1+i\lambda_j$ は実部が1で正なので、示した逆正接の分枝が使える。積の正の実係数は体積密度に一致するため、偏角の一致が必要十分である。
<!-- proof-end -->

**分枝についての注意。** $U$ が連結なら、連続関数 $\sum_j\arctan\lambda_j-\theta$ が常に $2\pi\mathbb Z$ に属することから、同じ整数 $k$ に対して

$$
\sum_j\arctan\lambda_j=\theta+2\pi k
$$

と書ける。これはグラフ上で得られる実数値の位相の持ち上げであり、一般のLagrange多様体上に大域的な位相角が存在するという主張ではない。また虚部0のみなら合同は $\pi$ を法とするので、向きの反転を含んでしまう。

### 直接例：Hessianの対角成分が位相を決める

$\mathbb R^2$ 上の

$$
f(x^1,x^2)=\frac a2(x^1)^2+\frac b2(x^2)^2
$$

を考える。$H=\operatorname{diag}(a,b)$ は対称で、したがってグラフはLagrangeである。グラフの複素接列は $(1+ia,0)^T$ と $(0,1+ib)^T$ なので

$$
\det(I+iH)=(1+ia)(1+ib)=(1-ab)+i(a+b).
$$

位相0の条件は $a+b=0$、かつ $1-ab>0$。前者から $b=-a$ だから後者は $1+a^2>0$ として自動的に従う。例えば $a=2,b=-2$ なら $\Omega(F_1,F_2)=5$、$\operatorname{vol}_{L_f}=5\,dx^1\wedge dx^2$ であり、二つのSLag条件と向きを直接検算できる。

## 5. 低次元ではどの偏微分方程式になるか

$n=1$ なら $H=D^2f=(f'')$ である。ここで $f''=d^2f/dx^2$ は実変数 $x$ による2階の通常微分を表し、第4節の $f_{11}=\partial^2 f/\partial(x^1)^2$ と同じ量である。従って

$$
\det(I+iH)=1+if''.
$$

位相0のグラフでは $f''=0$、従って各連結区間で $f(x)=ax+b$。$\theta=\pi/2$ については実部の正値性を満たす有限の傾きは存在せず、位相 $\pi/2$ の縦直線はそもそも $x$ に関するグラフにならない。これは座標表示の限界であってSLag自体の不存在ではない。

$n=2$ では $H=\begin{pmatrix}a&b\\b&c\end{pmatrix}$ として、行列式の二項展開から

$$
\begin{aligned}
\det(I+iH)
&=(1+ia)(1+ic)-(ib)^2\\
&=1-ac+b^2+i(a+c)\\
&=(1-\det H)+i\operatorname{tr}H.
\end{aligned}
$$

したがって[グラフの特殊Lagrange方程式](#thm-syz1-04-graph-equation)は、一般位相 $\theta$ について

$$
\cos\theta\,\Delta f-\sin\theta(1-\det D^2f)=0,
$$

かつ

$$
\cos\theta(1-\det D^2f)+\sin\theta\,\Delta f>0
$$

となる。$\theta=0$ なら $\Delta f=0$ であり、そのとき $H$ は実対称かつtrace零なので固有値は $(\lambda,-\lambda)$。従って $1-\det H=1+\lambda^2>0$ が自動的に従う。**二複素次元の位相0の勾配グラフは、調和関数の勾配グラフと一致する。**

一方 $\theta=\pi/2$ なら

$$
\det D^2f=1,\qquad \Delta f>0.
$$

実対称 $2\times2$ 行列は行列式が正でtraceが正なら二つの固有値がともに正なので、これは正定値Hessianを持つ凸な解のMonge–Ampère方程式である。虚部の方程式だけを残して $\det D^2f=1$ と書くと、負定値Hessianまで誤って取り込んでしまう。

$n=3$ では、実対称 $H$ の固有値を $\lambda_1,\lambda_2,\lambda_3$ とし、基本対称式を $\sigma_1=\sum\lambda_j$、$\sigma_2=\sum_{j<k}\lambda_j\lambda_k$、$\sigma_3=\lambda_1\lambda_2\lambda_3$ と定める。積を次数ごとに展開すると

$$
\prod_{j=1}^3(1+i\lambda_j)
=1+i\sigma_1-\sigma_2-i\sigma_3
=(1-\sigma_2)+i(\sigma_1-\sigma_3).
$$

よって位相0では $\operatorname{tr}D^2f=\det D^2f$ と $1-\sigma_2(D^2f)>0$ を**併せて**要求する。二次元のように常に調和方程式になるわけではない。

### 直接例：曲がったSLagグラフと失敗するグラフ

$\mathbb R^2$ の $f(x,y)=x^3-3xy^2$ は

$$
D^2f=\begin{pmatrix}6x&-6y\\-6y&-6x\end{pmatrix},
\quad \Delta f=0,\quad
\det D^2f=-36(x^2+y^2).
$$

従って

$$
\det(I+iD^2f)=1+36(x^2+y^2)>0.
$$

グラフは全域で滑らかな埋め込みLagrangeであり、位相0のSLagである。Hessianは点ごとに変化するため、平面だけがSLagなのではない。

これに対して $f=(x^2+y^2)/2$ なら $H=I_2$ で、$\det(I+iH)=2i$、誘導体積密度は2である。これは位相 $\pi/2$ のSLagだが、位相0のSLagではない。同じLagrangeグラフでも位相の検算は不可欠である。

## 6. 何を変えると方程式が変わるか

**向きを逆転する場合。** $\Omega|_L=e^{i\beta_L}\operatorname{vol}_L$ において $\operatorname{vol}_L$ は向き付きである。向きを反転すれば $\Omega$ の正の接基底に対する評価が $-1$ 倍となり、位相は $\pi$ 増える。同じ無向の部分集合であっても、同じ $\theta$ の較正とは限らない。

**正則体積形式を回転する場合。** 規格化された $\Omega$ を $\Omega'=e^{i\alpha}\Omega$ に取り換えると

$$
\operatorname{Im}(e^{-i(\theta+\alpha)}\Omega')
=\operatorname{Im}(e^{-i\theta}\Omega).
$$

したがって同じ幾何学的Lagrange部分多様体の位相表示は $\theta+\alpha$ になる。**規格化の大きさ**を正数倍で変えることとは異なる。

**局所グラフを離れる場合。** $L$ の $x$ 座標への射影の微分が可逆でなければ、グラフ $y=\nabla f(x)$ をその点の近くで使うことはできない。例えば $\mathbb C$ の縦直線は位相 $\pi/2$ で較正されるが $x$ 射影は定数である。一般のSLagを常に一つの実関数の方程式へ還元したわけではない。

## 7. 演習と詳細解答

### Level A：条件を一つずつ測る

<a id="ex-syz1-04-a01"></a>

#### SYZ1-04-A01 一変数の位相とグラフ表示

- Level: A

$\mathbb C$ に標準構造を入れ、$f(x)=ax^2/2$（$a\in\mathbb R$）の勾配グラフの位相と体積密度を求めよ。位相0となる $a$ を決定せよ。

<!-- solution-start -->
### 詳細解答

$F(x)=x+iax$ だから、実変数 $x$ に関する通常微分は $F'(x)=dF/dx=1+ia$ である。これは第4節の偏微分表記 $F_j=\partial F/\partial x^j$ を一変数にしたものである。複素体積形式 $dz$ の評価は $1+ia$ で、誘導計量は $g(F',F')=1+a^2$。よって体積密度は $\sqrt{1+a^2}$、位相は実部が正の $1+ia$ の偏角 $\arctan a$ である。

位相0なら $\arctan a\equiv0\pmod{2\pi}$。$\arctan a\in(-\pi/2,\pi/2)$ なので $a=0$ に限る。
<!-- solution-end -->

<a id="ex-syz1-04-a02"></a>

#### SYZ1-04-A02 二次元の調和グラフ

- Level: A

$f(x,y)=3xy$ とする。$D^2f$、$\det(I+iD^2f)$、誘導体積密度を求め、位相0のSLagであることを全条件から確認せよ。

<!-- solution-start -->
### 詳細解答

$$
D^2f=\begin{pmatrix}0&3\\3&0\end{pmatrix},
\quad \Delta f=0,\quad\det D^2f=-9.
$$

$F(x,y)=(x,y,3y,3x)$ は $x,y$ 射影で逆を持つ埋め込みである。Hessianが対称なので $F^*\omega=0$。行列式は

$$
\det(I+iD^2f)=1-\det D^2f+i\Delta f=10.
$$

誘導計量は $G=I+H^2=10I$、従って体積密度は $\sqrt{\det(10I)}=10$。虚部0、実部10が正で体積密度と等しい。ゆえに与えた向きで位相0のSLagである。
<!-- solution-end -->

<a id="ex-syz1-04-a03"></a>

#### SYZ1-04-A03 虚部0でも正の較正とは限らない

- Level: A

標準 $\mathbb C$ の水平実軸を増加方向に向ける。$\theta=0$ と $\theta=\pi$ について $e^{-i\theta}dz$ の虚部と実部を正の単位接ベクトルで評価し、どちらが較正するかを判定せよ。

<!-- solution-start -->
### 詳細解答

正の単位接ベクトルは $v=\partial_x$、$dz(v)=1$ である。$\theta=0$ なら $e^{-i\theta}dz(v)=1$ なので虚部0、実部1で、体積形式との等号が成り立つ。$\theta=\pi$ なら $e^{-i\pi}dz(v)=-1$ で虚部は同じく0だが、実部は $-1$。従って較正されない。失われているのは実部の正値性、すなわち向きの選択である。
<!-- solution-end -->

<a id="ex-syz1-04-a04"></a>

#### SYZ1-04-A04 正則体積形式の大きさ

- Level: A

標準 $\mathbb C^2$ で $\Omega_a=a\,dz^1\wedge dz^2$（$a>0$）と置き、実形式 $\operatorname{Re}\Omega_a$ のcomassを求める。$\operatorname{Re}\Omega_a$ が較正になる $a$ を求め、虚部の零条件だけでは判定できない理由を説明せよ。

<!-- solution-start -->
### 詳細解答

正の正規直交水平基底で $\Omega_a(\partial_{x^1},\partial_{x^2})=a$。[複素行列式の不等式](../SYZ1-03/index.md#lem-syz1-03-complex-determinant)に $a$ を掛けると、任意の実正規直交2組での $\operatorname{Re}\Omega_a$ の評価の絶対値は高々 $a$。水平基底でこの上限が達成されるので

$$
\|\operatorname{Re}\Omega_a\|_*=a.
$$

$\Omega_a$ は定数係数であり $d(\operatorname{Re}\Omega_a)=0$ である。[較正形式の定義](../SYZ1-03/index.md#def-syz1-03-calibration)は **comassが1以下** と閉性を要求するから、$\operatorname{Re}\Omega_a$ が較正形式となる必要十分条件は $0<a\le1$ である。

ただし「較正形式である」と「水平平面を較正する」は異なる。$0<a<1$ ではどの正規直交接基底で評価しても値は高々 $a<1$ だから、体積形式との等号を満たす部分多様体は存在しない。$a=1$ では水平平面で等号が成立する。$a>1$ ではcomass条件が破れる。一方、どの $a>0$ に対しても $\operatorname{Im}\Omega_a=a\operatorname{Im}\Omega_0$ の零点集合は変わらないので、虚部だけでは較正形式かどうかも、較正等号が成立するかどうかも判定できない。
<!-- solution-end -->

<a id="ex-syz1-04-a05"></a>

#### SYZ1-04-A05 三次元の対称式展開

- Level: A

$H=\operatorname{diag}(t,-t,0)$（$t\in\mathbb R$）について $\sigma_1,\sigma_2,\sigma_3$ と $\det(I+iH)$ を計算し、位相0の等号条件を確認せよ。

<!-- solution-start -->
### 詳細解答

固有値は $t,-t,0$ なので

$$
\sigma_1=t-t+0=0,\qquad
\sigma_2=-t^2,\qquad
\sigma_3=0.
$$

直接積を取っても

$$
\det(I+iH)=(1+it)(1-it)\cdot1=1+t^2.
$$

一般の三次元式 $(1-\sigma_2)+i(\sigma_1-\sigma_3)$ へ代入しても同じ。正の実数だから位相0であり、Hessianが対称な二次ポテンシャルのグラフはLagrangeかつ較正される。
<!-- solution-end -->

### Level B：位相・曲率・向きの論証をつなぐ

<a id="ex-syz1-04-b01"></a>

#### SYZ1-04-B01 任意の位相の二次元方程式

- Level: B

$\mathbb R^2$ 上の滑らかな $f$ の勾配グラフに対し、$\operatorname{Im}(e^{-i\theta}\det(I+iD^2f))=0$ と実部正の条件を、$\Delta f$、$\det D^2f$、$\sin\theta$、$\cos\theta$ で導出せよ。$\theta=0$ のとき正値性が自動となる理由も説明せよ。

<!-- solution-start -->
### 詳細解答

$H=\begin{pmatrix}a&b\\b&c\end{pmatrix}$ と置く。各列への $dz^j$ の評価を用いる[グラフの特殊Lagrange方程式](#thm-syz1-04-graph-equation)では

$$
D=\det(I+iH)
=(1+ia)(1+ic)-(ib)^2
=1-ac+b^2+i(a+c).
$$

ここで $u=1-\det H$、$v=\Delta f$ と置くと $D=u+iv$。$e^{-i\theta}=\cos\theta-i\sin\theta$ を掛けて

$$
e^{-i\theta}D
=(u\cos\theta+v\sin\theta)
+i(v\cos\theta-u\sin\theta).
$$

従って必要十分な条件は

$$
v\cos\theta-u\sin\theta=0,\qquad
u\cos\theta+v\sin\theta>0.
$$

$\theta=0$ では $v=\Delta f=0$。実対称な $H$ の固有値は $(\lambda,-\lambda)$ だから $\det H=-\lambda^2$。よって $u=1+\lambda^2>0$ である。
<!-- solution-end -->

<a id="ex-syz1-04-b02"></a>

#### SYZ1-04-B02 Hessian行列から誘導体積へ

- Level: B

$\mathbb R^2$ 上で $f(x,y)=\frac12(2x^2-2y^2)+xy$ とする。グラフの接ベクトル、誘導計量、$\Omega$ の引戻しを求め、位相と向き付き体積形式を照合せよ。

<!-- solution-start -->
### 詳細解答

勾配は $(2x+y,x-2y)$ である。以下で $F_x=\partial F/\partial x$、$F_y=\partial F/\partial y$ と書き、接ベクトルを $(x,y,y^1,y^2)$ の順に並べると

$$
F_x=(1,0,2,1),\qquad F_y=(0,1,1,-2).
$$

従って誘導計量の成分は $g(F_x,F_x)=g(F_y,F_y)=6$、$g(F_x,F_y)=2\cdot1+1\cdot(-2)=0$ であり、$G=6I$。よって体積形式は $6\,dx\wedge dy$。

$H=\begin{pmatrix}2&1\\1&-2\end{pmatrix}$ は対称なので $\omega(F_x,F_y)=0$、つまりグラフはLagrangeである。さらに

$$
F^*\Omega=\det\begin{pmatrix}1+2i&i\\i&1-2i\end{pmatrix}\,dx\wedge dy
=\bigl((1+2i)(1-2i)-i^2\bigr)\,dx\wedge dy
=6\,dx\wedge dy.
$$

虚部0、実部は正で誘導体積形式に等しい。従って位相0のSLagである。
<!-- solution-end -->

<a id="ex-syz1-04-b03"></a>

#### SYZ1-04-B03 非線形の調和ポテンシャル

- Level: B

$\mathbb R^2$ の $f(x,y)=x^3-3xy^2$ のグラフが位相0のSLagとなることを、グラフの埋め込み性、Lagrange性、複素体積形式、実部の正値性をすべて確認して示せ。

<!-- solution-start -->
### 詳細解答

$F(x,y)=(x,y,f_x,f_y)$ は最初の二成分が恒等写像なので埋め込み。偏導関数を求めると $f_x=3x^2-3y^2$、$f_y=-6xy$ であり、

$$
H=\begin{pmatrix}6x&-6y\\-6y&-6x\end{pmatrix}=H^T.
$$

従って $F^*\omega=0$。traceは $6x-6x=0$、行列式は $-36x^2-36y^2$ だから

$$
F^*\Omega=\bigl(1-\det H+i\operatorname{tr}H\bigr)\,dx\wedge dy
=\bigl(1+36(x^2+y^2)\bigr)\,dx\wedge dy.
$$

係数は全点で正。さらに $\det G=|\det(I+iH)|^2$ だから、誘導体積形式も同じ係数を持つ。これで[規格化したSLag条件](#prop-syz1-04-slag-conditions)の全条件が満たされる。Hessianが非定数でも位相は一定である。
<!-- solution-end -->

<a id="ex-syz1-04-b04"></a>

#### SYZ1-04-B04 規格化・位相回転・向き反転

- Level: B

標準 $\mathbb C^2$ の水平平面 $L=\{y^1=y^2=0\}$ を $x^1,x^2$ の増加方向に向け、$\Omega=dz^1\wedge dz^2$ とする。次の操作をそれぞれ行った後の位相と較正条件を調べよ。

1. $\Omega'=e^{i\pi/3}\Omega$ に変更する。
2. $\Omega''=3\Omega$ に変更する。
3. $\Omega$ をそのままに $L$ の向きを逆にする。

<!-- solution-start -->
### 詳細解答

水平平面の正の正規直交接基底 $(e_1,e_2)$ では $\omega(e_1,e_2)=0$、$\Omega(e_1,e_2)=1$。

**1.** $\Omega'(e_1,e_2)=e^{i\pi/3}$。大きさは1のままなので規格化が保たれ、位相 $\pi/3$ の較正等号が成り立つ。すなわち $\operatorname{Re}(e^{-i\pi/3}\Omega')|_L=\operatorname{vol}_L$。

**2.** $\Omega''(e_1,e_2)=3$。偏角は0だがcomassは3になり、$\operatorname{Re}\Omega''$ は較正形式でない。位相だけの検査と規格化の検査を分離する必要がある。

**3.** 正の接基底の二本を交換すると $\Omega(e_2,e_1)=-1$。規格化は変わらず、位相は $\pi$ となる。$\theta=0$ では実部が負だが、$\theta=\pi$ の較正にはなる。
<!-- solution-end -->

### Level C：異なる位相のSLag方程式を統合する

<a id="ex-syz1-04-c01"></a>

#### SYZ1-04-C01 位相 $\pi/2$ の方程式と向きの選択

- Level: C

標準 $\mathbb C^2$ に $L_f=\{x+i\nabla f(x):x\in\mathbb R^2\}$ を考え、$x^1,x^2$ の増加方向を正とする。$f(x^1,x^2)=\frac12\bigl(a(x^1)^2+b(x^2)^2\bigr)$ とし、$a,b\ne0$ は実定数とする。

1. Lagrange性を接ベクトルから確かめ、複素体積形式と誘導体積密度を計算せよ。
2. 位相 $\pi/2$ のSLagとなる $a,b$ の必要十分条件を、行列式・trace・正値性に分けて示せ。
3. $a=b=1$ と $a=b=-1$ の二例で、虚部の方程式だけでは区別できないことを示せ。
4. 位相0の場合、$a=-b$ を満たす例が位相 $\pi/2$ の例とは別になる理由を説明せよ。
5. $L_f$ が非コンパクトなことを踏まえて、較正からどのような体積比較が言えるか、競合曲面の仮定を述べよ。

<!-- solution-start -->
### 詳細解答

**1.** $\nabla f=(ax^1,bx^2)$、$F_j=\partial_{x^j}+\lambda_j\partial_{y^j}$（$\lambda_1=a,\lambda_2=b$）。二本は独立で、$x$ 射影が逆写像を与える。異なる座標方向なので $\omega(F_1,F_2)=0$、グラフはLagrangeである。$\Omega$ の評価と計量は

$$
F^*\Omega=(1+ia)(1+ib)\,dx^1\wedge dx^2
=\bigl(1-ab+i(a+b)\bigr)\,dx^1\wedge dx^2,
$$

$$
G=\operatorname{diag}(1+a^2,1+b^2),\qquad
\operatorname{vol}_{L_f}=\sqrt{(1+a^2)(1+b^2)}\,dx^1\wedge dx^2.
$$

**2.** $\theta=\pi/2$ では $e^{-i\theta}=-i$。従って

$$
-i(1-ab+i(a+b))=(a+b)+i(ab-1).
$$

[グラフの特殊Lagrange方程式](#thm-syz1-04-graph-equation)の虚部0条件は $ab=1$、実部正条件は $a+b>0$。両条件の下では $a,b$ は同符号かつ和が正なので、$a>0,b>0$。逆に $ab=1$ かつ $a,b>0$ なら条件を満たすから、これが必要十分条件である。

**3.** $a=b=1$ では $\det(I+iH)=(1+i)^2=2i$、$-i\det(I+iH)=2$、誘導体積密度2で較正される。一方 $a=b=-1$ では $\det(I+iH)=(1-i)^2=-2i$、$-i\det(I+iH)=-2$。いずれも虚部は0で、体積密度は2だが、後者は実部が負であり与えた向きでは位相 $\pi/2$ の較正でない。

**4.** $a=-b$ なら $\det(I+iH)=1+a^2>0$ なので位相0である。$ab=-a^2\le0$ であるため、位相 $\pi/2$ に必要な $ab=1$ は満たせない。二つの方程式は同じLagrange性に異なる位相の等号を加えたものである。

**5.** [較正による体積最小性](../SYZ1-03/index.md#thm-syz1-03-volume-minimization)を非コンパクトな $L_f$ 全体へそのまま適用することはできない。$L_f$ のコンパクトな向き付き部分 $K$ とコンパクトな競合曲面 $N$ が同じ境界を持ち、$K-N=\partial C$ となる鎖 $C$ が存在するなら、閉形式 $\varphi_{\pi/2}=\operatorname{Re}(-i\Omega)$ に対し

$$
\operatorname{Area}(K)=\int_K\varphi_{\pi/2}
=\int_N\varphi_{\pi/2}
\le\operatorname{Area}(N).
$$

この結論は第2問の正の較正条件を満たすグラフの部分について成立する。任意の非コンパクト競合曲面との無条件の比較ではない。
<!-- solution-end -->

## 8. 次の問い：SLagを微小に動かすと何が残るか

SLagの条件は、Lagrange性を保つことと、位相を一定に保つことの二つに分解できた。グラフ座標ではHessianを使ってそれを非線形方程式にしたが、一般のSLagは一つのグラフで覆えない。

次の **SYZ1-05「McLean理論I――変形方程式の線形化」** では、法線方向の微小変形を1形式に変換し、これら二条件の一次部分が閉性と余閉性の方程式になることを調べる。
