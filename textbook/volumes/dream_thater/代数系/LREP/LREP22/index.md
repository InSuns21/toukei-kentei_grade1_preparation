# LREP22 質量・スピンと不変量

<!-- definition-example-audit: strict -->

[前講の共同スペクトル表示](../LREP21/index.md#thm-lrep21-translation-spectrum)では、四元運動量を四つの独立したラベルではなく、一つの共同射影値測度で扱いました。観測者が変わるとエネルギーと運動量は変わります。しかし同じ粒子を別の種類の粒子として数える必要はありません。今回は変換で変わらない質量を取り出し、回転・boostの生成作用素を組み合わせてスピンの不変量を作ります。

[共通の符号規約](../../../../../dream-theater-lorentz-conventions.md)に従い、$c=\hbar=1$、$\eta=\operatorname{diag}(-1,1,1,1)$ とします。四元運動量は $p=(p^0,\boldsymbol p)$、下付き成分は $p_0=-p^0$、$p_i=p^i$ とします。繰り返す上下添字は0から3まで総和し、空間添字は1から3までです。

## 1. 運動量の軌道と標準運動量

例えば $p=(5,3,0,0)$ はエネルギー5、運動量の大きさ3を表します。その二次形式は $-25+9=-16$。観測者を適切に選ぶと空間運動量を0にできますが、そのときの時間成分は5ではなく4です。Lorentz変換全体で到達できる点の集合を軌道として捉えます。

<a id="def-lrep22-mass-shell"></a>

<!-- formal-statement-start -->
> **定義（未来質量殻）**
> $m\ge0$ に対し、原点を除いた未来向きの四元運動量の集合

$$
\mathcal O_m=\{p\in\mathbb R^4:p^0>0,\ \eta(p,p)=-m^2\}
$$

> を質量 $m$ の未来質量殻とする。空間運動量 $\boldsymbol q$ による表示は

$$
p(\boldsymbol q)=(E_{\boldsymbol q},\boldsymbol q),
\qquad E_{\boldsymbol q}=\sqrt{m^2+|\boldsymbol q|^2}.
$$

> $m>0$ では $\boldsymbol q\in\mathbb R^3$、$m=0$ では $\boldsymbol q\in\mathbb R^3\setminus\{0\}$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep22-mass-shell -->
**定義の確認。** $p=(5,3,0,0)$ では $p^0=5>0$、$\eta(p,p)=-16$ なので $\mathcal O_4$ に属します。また $p=(3,0,0,3)$ では $\eta(p,p)=-9+9=0$、$p^0>0$ なので $\mathcal O_0$ に属します。負エネルギーの $(-5,3,0,0)$ は二次形式が同じでも未来質量殻には入りません。原点は未来閉光円錐に含まれますが、この定義の $p^0>0$ は満たしません。
<!-- definition-example-end -->

<a id="thm-lrep22-orbits"></a>

<!-- formal-statement-start -->
> **定理（未来円錐のLorentz軌道）**
> $L=SO^+(1,3)$ の未来閉光円錐上の軌道は、原点、各 $m>0$ の $\mathcal O_m$、および $\mathcal O_0$ である。標準運動量として

$$
k_m=(m,0,0,0)\quad(m>0),
\qquad k_0=(1,0,0,1)
$$

> を選べる。
<!-- formal-statement-end -->

**証明の見取り図。** 二次形式の保存から異なる殻は混ざりません。殻の中では回転で空間運動量の向きをそろえ、boostで大きさを調整します。

<!-- proof-start -->
### 証明

[Lorentz群と単位元成分](../LREP9/index.md#def-lrep9-lorentz-group)の条件から二次形式と未来方向は保存され、原点は線形変換で固定されます。

$m>0$ の点 $p$ では $r=|\boldsymbol p|$ と置くと $E^2-r^2=m^2$。$r>0$ なら空間回転で $\boldsymbol p$ を $(0,0,r)$ へ移します。$r=0$ ならすでに標準運動量です。[回転生成子とboost生成子](../LREP9/index.md#def-lrep9-rotation-boost)の $z$ 方向boostで、ラピディティ $\chi$ を

$$
\cosh\chi=E/m,\qquad \sinh\chi=r/m
$$

と選べます。実際 $\chi=\log((E+r)/m)$ と置けば $e^{-\chi}=(E-r)/m$ となるため、双曲線関数の定義に代入して両式を得ます。すると $e^{\chi B_3}k_m=(E,0,0,r)$ です。先ほどの回転の逆を作用させれば元の $p$ になります。

$m=0$ では $r=E>0$ であり、回転後の点は $(r,0,0,r)$。$e^{\chi B_3}k_0=(e^\chi,0,0,e^\chi)$ なので $\chi=\log r$ を選び、逆回転で元の点へ戻せます。どの操作も $L$ に属し逆変換を持つため、それぞれの殻は一つの軌道です。未来円錐の点は原点かこれらのいずれかに属します。$\square$
<!-- proof-end -->

質量零の粒子では運動量の向きもエネルギーも変更できますが、非零の光的ベクトルを静止運動量に移すことはできません。もし空間成分が0なら二次形式0から時間成分も0となり、可逆な変換で非零点が原点に移ることになるからです。

## 2. 質量殻の不変測度

前講では $d^3q$ を用いた波束にJacobianの平方根を掛けてノルムを保存しました。ここでは、そもそも運動量の座標変換で変わらない積分測度を探します。boostにより空間体積要素とエネルギーが同じ比率で伸びることが鍵です。

<a id="def-lrep22-shell-measure"></a>

<!-- formal-statement-start -->
> **定義（質量殻測度）**
> $m\ge0$ とし、未来質量殻 $\mathcal O_m$ のBorel集合 $B$ に対して

$$
\mu_m(B)=
\int_{\{\boldsymbol q:p(\boldsymbol q)\in B\}}
\frac{d^3q}{2E_{\boldsymbol q}}
$$

> と定める。$m=0$ では積分の座標領域から $\boldsymbol q=0$ を除く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep22-shell-measure -->
**定義の確認。** 空間座標への逆写像は単なる射影なのでBorel集合の逆像はBorel集合です。密度 $1/(2E_{\boldsymbol q})$ は座標領域で正、可測であり、Lebesgue積分の可算加法性から $\mu_m$ は正測度です。$m=0$ の球殻 $1<|\boldsymbol q|<2$ では球座標により

$$
\mu_0(B)=4\pi\int_1^2\frac{r^2}{2r}\,dr
=2\pi\left[\frac{r^2}{2}\right]_1^2=3\pi.
$$

原点に近い領域でも $\mu_0(0<r<R)=\pi R^2$ と有限になります。分母が原点で零になることと、原点近傍の測度が無限になることは別の問題です。
<!-- definition-example-end -->

<a id="thm-lrep22-measure-invariance"></a>

<!-- formal-statement-start -->
> **定理（質量殻測度のLorentz不変性）**
> 任意の $m\ge0$、$\Lambda\in SO^+(1,3)$、Borel集合 $B\subset\mathcal O_m$ に対し

$$
\mu_m(\Lambda B)=\mu_m(B).
$$

> 特に非負可測関数または $\mu_m$ 可積分関数の積分は $p\mapsto\Lambda p$ による変数変換で不変である。
<!-- formal-statement-end -->

**証明の見取り図。** 空間回転では体積もエネルギーも不変です。$z$ 方向boostでは $q'_3$ だけが変わるのでJacobianを直接求め、一般のLorentz変換をboostと回転へ分けます。

<!-- proof-start -->
### 証明

回転 $R$ では $\boldsymbol q'=R\boldsymbol q$ なので $E'=E$、$|\det R|=1$ です。次に $z$ 方向のboostで $C=\cosh\chi$、$S=\sinh\chi$ と置きます。

$$
E'=CE+Sq_3,\qquad
q'_3=SE+Cq_3,\qquad q'_1=q_1,\quad q'_2=q_2.
$$

$m>0$ または $m=0,\boldsymbol q\ne0$ で $\partial E/\partial q_j=q_j/E$。従って微分行列は

$$
\frac{\partial\boldsymbol q'}{\partial\boldsymbol q}=
\begin{pmatrix}
1&0&0\\
0&1&0\\
Sq_1/E&Sq_2/E&C+Sq_3/E
\end{pmatrix}.
$$

その行列式は $C+Sq_3/E=E'/E$。未来方向が保存され $E'>0$、$E>0$ なので絶対値を外せます。逆変換はラピディティ $-\chi$ のboostであり、座標領域の微分同相です。変数変換により

$$
\frac{d^3q'}{2E'}=\frac{E'}{E}\frac{d^3q}{2E'}
=\frac{d^3q}{2E}.
$$

一般の $\Lambda$ に対し $u=\Lambda(1,0,0,0)$ は未来向き単位時間的ベクトルです。[未来円錐のLorentz軌道](#thm-lrep22-orbits)の構成によって、回転と $z$ 方向boostの積 $B_u$ で $B_u e_0=u$ とできます。$Q=B_u^{-1}\Lambda$ は $e_0$ を固定します。$\eta(Qv,e_0)=\eta(v,Q^{-1}e_0)=0$ が時間成分0の全ての $v$ に成り立つため、$Q$ はその空間を保ちます。制限は通常のEuclid内積を保ち、$\det Q=1$ から空間回転です。よって $\Lambda=B_uQ$ は既に不変性を証明した変換の積です。各段階で変数変換を施せば集合の測度も関数の積分も保存されます。$\square$
<!-- proof-end -->

係数 $1/2$ は規格化の慣習で、測度を定数倍しても不変性は変わりません。波束にこの測度を採用すれば、スカラー波束の変換 $f(p)\mapsto f(\Lambda^{-1}p)$ はJacobian補正なしにノルムを保存します。次の計算で具体的に使います。

## 3. 第一の不変量：質量の二乗

群表現の運動量が一つの質量を持つとは、すべての状態が同じ運動量を持つという意味ではありません。共同測度を質量の二乗へ移して考えます。

<a id="thm-lrep22-mass-casimir"></a>

<!-- formal-statement-start -->
> **定理（質量二乗の不変性）**
> $U$ を非零複素Hilbert空間上の被覆Poincare群の強連続正エネルギーユニタリ表現、$F$ を並進の共同PVMとする。自己共役作用素

$$
C_m=\int (-\eta(p,p))\,dF(p)
$$

> は非負で、その全スペクトル射影は群表現と可換である。定義域は

$$
D(C_m)=\left\{\psi:
\int |\eta(p,p)|^2\,d\langle\psi,F(p)\psi\rangle<\infty
\right\}.
$$

> $U$ が既約なら、ある一意な $m\ge0$ について $C_m=m^2 I$ である。
<!-- formal-statement-end -->

**証明の見取り図。** $p$ の二次形式がLorentz変換で変わらないことを共同PVMの共変性に移します。既約な場合、可換な射影は0か恒等射影しか取れないため質量が固定されます。

<!-- proof-start -->
### 証明

[正エネルギー表現](../LREP21/index.md#def-lrep21-positive-energy)では $p^0\ge|\boldsymbol p|$ がPVMの意味で成立するので $h(p)=-\eta(p,p)\ge0$ です。[並進の共同スペクトル表示](../LREP21/index.md#thm-lrep21-translation-spectrum)から $h$ のスペクトル積分で自己共役作用素と上記の定義域が得られます（実関数の像測度 $F_h(D)=F(h^{-1}(D))$ を用います）。

任意のBorel集合 $D\subset\mathbb R$ について $F_h(D)$ は並進の位相積分と可換です。また [共同スペクトルのLorentz共変性](../LREP21/index.md#thm-lrep21-covariance) により

$$
V(A)F_h(D)V(A)^{-1}=F(\Lambda h^{-1}(D)).
$$

$h(\Lambda p)=h(p)$ から $\Lambda h^{-1}(D)=h^{-1}(D)$、従ってこれは $F_h(D)$ に等しくなります。$U(a,A)=T(a)V(A)$ なので群全体と可換です。

既約性を閉不変部分空間が0か全空間だけであることとして使います。可換な直交射影の像は閉不変部分空間なので $F_h(D)$ は0か $I$ です。$t\ge0$ で $G(t)=F_h([0,t])$ と置くと単調であり、$t\to\infty$ で強収束して $I$ になります。従って $I$ を取る $t$ が存在し、その下限を $b$ と置けます。$t<b$ では0、$t>b$ では $I$。測度の上からの連続性を $[0,b+1/n]$ へ適用すると $F_h([0,b])=I$、下からの連続性で $F_h([0,b))=0$（$b=0$ なら空集合）です。差を取れば $F_h(\{b\})=I$ です。よって $m=\sqrt b$ とすれば $C_m=m^2I$ であり、非零空間なので $m$ は一意です。$\square$
<!-- proof-end -->

形式的には $C_m=-P_\mu P^\mu=(P^0)^2-\sum_{i=1}^3(P^i)^2$ です。ただし一般の状態については個々の二乗の定義域が一致するとは限りません。上の共同スペクトル積分を作用素の定義とし、全生成作用素の積を取れる部分空間では形式的な式と一致します。

$m=0$ の場合は原点と非零光的軌道の区別が質量だけではできません。原点への射影も群と可換なので、既約表現では原点だけに集中する場合と原点への射影が0の場合に分かれます。

## 4. スピンの四元的な表現

角運動量の三成分は空間回転には自然ですが、boostを施すと回転生成子も混ざります。[LREP9の回転・boost生成子](../LREP9/index.md#def-lrep9-rotation-boost)を反対称な二添字にまとめ、運動量と組み合わせます。

ここからは $U$ の滑らかなベクトルの空間 $\mathcal D$、すなわち $g\mapsto U(g)\psi$ がノルムで無限回微分可能な $\psi$ の全体で計算します。これは群の作用で不変で、微分生成作用素を適用しても滑らかです。後者は $U(g)dU(X)\psi$ が $(g,t)\mapsto U(g\exp(tX))\psi$ の $t=0$ での微分であることから従います。

この空間は稠密です。単位元近傍に台を持つ滑らかな非負関数 $\phi_n$ を左不変体積に関して積分1に規格化し、その台を単位元へ縮めます。左不変体積は単位元の体積形式を左移動して作れます。任意の $\psi$ に対して $\psi_n=\int\phi_n(g)U(g)\psi\,dg$ と置くと、

$$
U(h)\psi_n=\int\phi_n(h^{-1}k)U(k)\psi\,dk.
$$

$h$ を固定した点のコンパクト近傍に制限すると、被積分関数の各微分は共通のコンパクト台を持ち有界なので、積分内の微分で $\psi_n\in\mathcal D$ が従います。また $\|\psi_n-\psi\|\le\sup_{g\in\operatorname{supp}\phi_n}\|U(g)\psi-\psi\|\to0$ です。

$\mu,\nu=0,1,2,3$ に対し、実行列 $X^{\mu\nu}$ を

$$
(X^{\mu\nu}p)^\alpha
=\eta^{\alpha\nu}p^\mu-\eta^{\alpha\mu}p^\nu
$$

と定めます。これは $X^{\nu\mu}=-X^{\mu\nu}$ を満たし、$\eta(v,X^{\mu\nu}w)=v^\nu w^\mu-v^\mu w^\nu$ からLorentz Lie環の元です。例えば $X^{01}=B_1$、$X^{12}=R_3$ であり、全てのboostと回転を表せます。被覆群ではこのLie環元を被覆の微分の逆で持ち上げます。以下の $M^{\mu\nu}$ は $i$ を掛けた微分作用素です。

<a id="def-lrep22-pauli-lubanski"></a>

<!-- formal-statement-start -->
> **定義（Pauli–Lubanskiベクトル）**
> 被覆Poincare群の強連続ユニタリ表現 $U$ の滑らかなベクトル空間 $\mathcal D$ 上で

$$
M^{\mu\nu}=i\,dU(0,X^{\mu\nu}),\qquad
M_{\rho\sigma}=\eta_{\rho\alpha}\eta_{\sigma\beta}M^{\alpha\beta}
$$

> とする。$P^\mu$ を並進の生成作用素、$\varepsilon^{\mu\nu\rho\sigma}$ を $\varepsilon^{0123}=1$ の完全反対称記号とするとき、

$$
W^\mu=\frac12\varepsilon^{\mu\nu\rho\sigma}P_\nu M_{\rho\sigma}
$$

> をPauli–Lubanskiベクトルとする。積は共通不変領域 $\mathcal D$ 上の作用素積である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep22-pauli-lubanski -->
**定義の確認。** [前講のスカラー波束表現](../LREP21/index.md#thm-lrep21-translation-spectrum)に対応する、質量 $m>0$ の $L^2(\mathcal O_m,\mu_m)$ を使います。並進は $T(a)f(p)=e^{ip\cdot a}f(p)$、Lorentz変換は $V(A)f(p)=f(\rho(A)^{-1}p)$。不変測度によりユニタリで、逆は逆変換、積は合成則に従います。群積と位相は $p\cdot\Lambda b=(\Lambda^{-1}p)\cdot b$ から整合します。コンパクト台の滑らかな関数上では、台と各微分が局所的に共通コンパクト集合に収まるため強連続かつ滑らかです。稠密性とノルム保存で強連続性は全空間へ延長されます。

$P^\mu$ は $p^\mu$ の乗算であり、$M^{\rho\sigma}$ は $-i(X^{\rho\sigma}p)$ 方向の微分です。従って添字を下げれば

$$
M_{\rho\sigma}=-i(p_\rho\partial_\sigma-p_\sigma\partial_\rho)
$$

と書けます。$\partial_\sigma$ は四元座標への局所的な滑らかな延長を微分したもので、括弧内の方向は殻に接するので延長によらない値です。定義に代入すると

$$
W^\mu f=-\frac i2\varepsilon^{\mu\nu\rho\sigma}
p_\nu(p_\rho\partial_\sigma-p_\sigma\partial_\rho)f=0.
$$

$p_\nu p_\rho$ と $p_\nu p_\sigma$ は対応する添字に関して対称、$\varepsilon$ は反対称なので各縮約が0です。この模型では質量は正でもスピン不変量は0になります。
<!-- definition-example-end -->

空間回転の生成作用素を $J_1=M^{23},J_2=M^{31},J_3=M^{12}$、boostの生成作用素を $K_i=M^{0i}$ と書きます。回転部分の規約は [角運動量演算子](../LREP7/index.md#def-lrep7-angular-momentum) の $i\,dU$ と一致します。$M_{0i}=-K_i$、$M_{ij}=M^{ij}$ に注意します。

例えば $\mu=1$ の成分は $\varepsilon^{1023}=-1,\varepsilon^{1203}=1,\varepsilon^{1302}=-1$ から

$$
W^1=-P_0 M_{23}+P_2 M_{03}-P_3 M_{02}
=P^0J_1-P^2K_3+P^3K_2.
$$

二つずつ現れる添字の順序を入れ替えた項は同じ値なので係数 $1/2$ が消えます。全成分について

$$
W^0=\boldsymbol P\cdot\boldsymbol J,\qquad
\boldsymbol W=P^0\boldsymbol J-\boldsymbol P\times\boldsymbol K.
$$

積の順序は定義と同じく運動量が左です。$P_\mu W^\mu=0$ も確認できます。共同PVMによって $P_\mu,P_\nu$ は $\mathcal D$ 上で可換なので、$\varepsilon^{\mu\nu\rho\sigma}P_\mu P_\nu M_{\rho\sigma}$ の $\mu,\nu$ の対称・反対称性により零になります。

## 5. 第二の不変量：Pauli–Lubanskiの二乗

回転・boostの生成作用素には、座標原点を動かしたときに生じる軌道角運動量の変化も含まれます。$W^\mu$ では、その変化が反対称縮約で打ち消されます。

<a id="thm-lrep22-pl-covariance"></a>

<!-- formal-statement-start -->
> **定理（Pauli–Lubanskiの共変性とCasimir）**
> 上の強連続ユニタリ表現の共通不変領域 $\mathcal D$ 上で、$\Lambda=\rho(A)$ とすると

$$
T(a)W^\mu T(a)^{-1}=W^\mu,\qquad
V(A)W^\mu V(A)^{-1}=(\Lambda^{-1})^\mu{}_\nu W^\nu.
$$

> 従って $[P^\nu,W^\mu]=0$、$P_\mu W^\mu=0$ であり、

$$
C_W=W_\mu W^\mu
$$

> は群の作用と可換である。特に $C_W$ は全てのLie環生成作用素と $\mathcal D$ 上で可換である。
<!-- formal-statement-end -->

**証明の見取り図。** 並進で $M$ は運動量を含む項だけ変化します。その項を $W$ に代入すると対称な二つの運動量が反対称記号で消えます。Lorentz変換では $P,M$ の添字が同じ逆行列で変換され、計量と向きを保つため二乗が不変になります。

<!-- proof-start -->
### 証明

[被覆Poincare群の積](../LREP21/index.md#def-lrep21-covered-poincare)によって、$X$ をLorentz Lie環元とすると

$$
(a,I)(0,\exp(tX))(-a,I)
=(a-e^{tX}a,\exp(tX))
$$

です（右の行列を被覆群へ持ち上げている）。$\mathcal D$ 上で $t=0$ の微分を取り、並進位相 $e^{ip\cdot b}$ と $M=i\,dU$ を代入すると

$$
T(a)M^{\mu\nu}T(a)^{-1}
=M^{\mu\nu}+P_\alpha(X^{\mu\nu}a)^\alpha
=M^{\mu\nu}+a^\mu P^\nu-a^\nu P^\mu .
$$

添字を下げると変化量は $a_\rho P_\sigma-a_\sigma P_\rho$ です。並進は $P$ と可換なので $W$ の変化は

$$
\frac12\varepsilon^{\mu\nu\rho\sigma}
P_\nu(a_\rho P_\sigma-a_\sigma P_\rho)=0.
$$

各項は二つの可換な運動量を反対称記号で縮約しているからです。従って $T(a)$ との可換性が成り立ち、その式を $a=te_\nu$ で微分すれば $[P^\nu,W^\mu]=0$ となります。

次にLorentz変換について、[共同スペクトルのLorentz共変性](../LREP21/index.md#thm-lrep21-covariance) から $V(A)P^\mu V(A)^{-1}=(\Lambda^{-1})^\mu{}_\nu P^\nu$。$M$ は群共役 $A\exp(tX)A^{-1}$ の微分で変換します。$L^\mu{}_\alpha=(\Lambda^{-1})^\mu{}_\alpha$ と書けば

$$
\Lambda X^{\mu\nu}\Lambda^{-1}
=L^\mu{}_\alpha L^\nu{}_\beta X^{\alpha\beta}.
$$

実際、左辺を $p$ に作用させた第 $\gamma$ 成分は

$$
\Lambda^\gamma{}_\delta
(\eta^{\delta\nu}L^\mu{}_\alpha p^\alpha
-\eta^{\delta\mu}L^\nu{}_\beta p^\beta).
$$

$\Lambda\eta^{-1}=\eta^{-1}(\Lambda^{-1})^{\mathsf T}$ を使うと $\Lambda^\gamma{}_\delta\eta^{\delta\nu}=\eta^{\gamma\beta}L^\nu{}_\beta$ となり、右辺の定義と一致します。よって $M^{\mu\nu}$ も二つの添字に $L$ を掛ける法則で変換します。

下付き添字では $L$ の代わりに $\eta L\eta^{-1}=\Lambda^{\mathsf T}$ が現れます。$W$ の式に代入すると反対称記号に三つの $\Lambda$ が掛かります。$\det\Lambda=1$ の行列式展開から

$$
\varepsilon^{\mu\nu\rho\sigma}
\Lambda^\alpha{}_\nu\Lambda^\beta{}_\rho\Lambda^\gamma{}_\sigma
=L^\mu{}_\delta\varepsilon^{\delta\alpha\beta\gamma}
$$

です（両辺に $\Lambda^\kappa{}_\mu$ を掛ければ四添字の行列式公式になります）。従って $W$ の変換は主張どおりです。計量保存 $L^{\mathsf T}\eta L=\eta$ より

$$
V(A)C_WV(A)^{-1}
=\eta_{\mu\nu}L^\mu{}_\alpha L^\nu{}_\beta
W^\alpha W^\beta=C_W.
$$

並進との可換性も各 $W^\mu$ から従い、群との可換式を微分すれば生成作用素との交換子が0になります。直前に求めた $P_\mu W^\mu=0$ と合わせて証明が完了しました。$\square$
<!-- proof-end -->

このように生成作用素の積で作られ、全ての生成作用素と可換になる式をCasimir演算子と呼びます。第一の不変量は $P_\mu P^\mu=-C_m$、第二は $C_W$ です。$C_m$ は共同スペクトル積分で自己共役性まで確立しましたが、$C_W$ の一般の自己共役閉包やスペクトル分解については共通領域での代数的可換性だけでは結論できません。

## 6. 静止運動量でスピンを測る

$m>0$ の殻では $k_m=(m,0,0,0)$ を標準運動量にできます。標準運動量を固定する回転の作用を内部の有限次元空間に持つ模型を考えます。次講ではこの回転の群と、一般の運動量での内部空間の変換を構成します。ここではその分類を仮定せず、固定運動量での不変量を計算します。

運動量ごとの有限次元空間を滑らかな局所座標で表示し、状態を滑らかなベクトル値関数 $f(p)$ として表す模型では、Lorentz作用は $f(\Lambda^{-1}p)$ に運動量依存の行列を掛ける形になります。微分した $M_{\rho\sigma}$ は、第4節の軌道微分と内部行列の和です。Pauli–Lubanskiの縮約で軌道微分が消えることは第4節と同じ対称性によって全成分で成立します。従って $W^\mu$ はその模型では各運動量で内部行列を作用させます。標準運動量を固定する回転では引数の変化も0なので、$J_i$ はその点で内部の回転生成作用素になります。

<a id="prop-lrep22-rest-spin"></a>

<!-- formal-statement-start -->
> **命題（正質量の静止系スピン不変量）**
> $m>0$ の質量殻上の滑らかな有限次元内部空間の模型で、静止運動量における回転がスピン $s$ の有限次元既約ユニタリ $SU(2)$ 表現であるとする。この内部空間上のPauli–Lubanski成分は

$$
W^0(k_m)=0,\qquad W^i(k_m)=mJ_i .
$$

> その二乗は

$$
C_W(k_m)=m^2s(s+1)I.
$$

> Lorentz共変な内部空間の作用を持つとき、この値は同じ質量殻の全点に移される。
<!-- formal-statement-end -->

**証明の見取り図。** 静止運動量では空間運動量が0なのでboost生成作用素の項が消えます。残る回転生成作用素の二乗和は既習の $SU(2)$ Casimirです。

<!-- proof-start -->
### 証明

運動量の乗算が左にある [Pauli–Lubanskiベクトル](#def-lrep22-pauli-lubanski) の成分表示で $p^0=m,\boldsymbol p=0$ とすると、$W^0=0$、$\boldsymbol W=m\boldsymbol J$。軌道微分は縮約で消えているためこれは静止点の内部空間上の行列等式です。計量は $(-+++)$ なので

$$
W_\mu W^\mu=-(W^0)^2+\sum_{i=1}^3(W^i)^2
=m^2\sum_{i=1}^3J_i^2 .
$$

[有限次元スピンの量子化と昇降公式](../LREP7/index.md#thm-lrep7-spin-spectrum) はスピン $s$ の既約ユニタリ表現で $\sum J_i^2=s(s+1)I$ を与えます。これを代入すれば主張の値が得られます。

任意の $p$ は [未来円錐のLorentz軌道](#thm-lrep22-orbits) から $p=\Lambda k_m$ と書けます。内部空間の間の可逆な変換で [Pauli–Lubanskiの二乗の共変性](#thm-lrep22-pl-covariance) を適用すると、$C_W(p)$ は $C_W(k_m)$ の共役になります。スカラー行列は共役で変わらないので同じ値です。$\square$
<!-- proof-end -->

例えば $s=1/2$ なら $J_i=\sigma_i/2$ で各 $J_i^2=I/4$、従って $C_W=3m^2I/4$。$s=0$ では $C_W=0$ です。質量殻上の一点は通常の波束空間で正規化された運動量固有ベクトルを与えません。ここでの静止系の計算は運動量ごとの内部空間に関するものです。

質量零で $m^2s(s+1)$ に $m=0$ を代入してスピンの全分類を得ることはできません。静止運動量へのboostが存在しないためです。非零光的標準運動量を固定する群を別に調べる必要があります。

## 7. 演習

### Level A

<a id="ex-lrep22-a01"></a>

#### LREP22-A01 質量殻の判定
- Level: A
- ID: LREP22-A01

$p=(7,2,3,6),q=(5,3,0,0),r=(-5,3,0,0)$ について未来質量殻への所属と質量を求めよ。

<!-- solution-start -->
**詳細解答。** [未来質量殻](#def-lrep22-mass-shell) の条件を用いる。$p$ の空間ノルムの二乗は $4+9+36=49$ なので $-\eta(p,p)=49-49=0$。時間成分は正であり $p\in\mathcal O_0$。$q$ は $-\eta(q,q)=25-9=16$、$q^0>0$ より $\mathcal O_4$。$r$ も二次形式は同じだが時間成分が負なので、未来質量殻には入らない。
<!-- solution-end -->

<a id="ex-lrep22-a02"></a>

#### LREP22-A02 静止系へのラピディティ
- Level: A
- ID: LREP22-A02

$p=(5,0,0,3)$ を静止運動量へ移す $z$ 方向boostのラピディティを求めよ。

<!-- solution-start -->
**詳細解答。** [未来円錐のLorentz軌道](#thm-lrep22-orbits) から $m=\sqrt{25-9}=4$。静止点から $p$ へのラピディティは $\log((5+3)/4)=\log2$ なので、逆は $-\log2$。このとき $\cosh\chi=5/4,\sinh\chi=-3/4$。新しい時間成分は $(25-9)/4=4$、空間の第三成分は $(-15+15)/4=0$ となる。
<!-- solution-end -->

<a id="ex-lrep22-a03"></a>

#### LREP22-A03 光的な球殻の体積
- Level: A
- ID: LREP22-A03

$m=0$ で $2<|\boldsymbol q|<4$ の測度を求めよ。

<!-- solution-start -->
**詳細解答。** [質量殻測度](#def-lrep22-shell-measure) では $E=r$。球座標の角度積分は $4\pi$ なので

$$
\mu_0(B)=4\pi\int_2^4\frac{r^2}{2r}\,dr
=\pi(16-4)=12\pi.
$$
<!-- solution-end -->

<a id="ex-lrep22-a04"></a>

#### LREP22-A04 静止スピンの二乗
- Level: A
- ID: LREP22-A04

$m=2$、$s=1/2$ の内部空間について $W^0,W^i,C_W$ をPauli行列で求めよ。

<!-- solution-start -->
**詳細解答。** [角運動量演算子](../LREP7/index.md#def-lrep7-angular-momentum) では $J_i=\sigma_i/2$ である。[静止系スピン不変量](#prop-lrep22-rest-spin) より $W^0=0,W^i=2(\sigma_i/2)=\sigma_i$。各Pauli行列は二乗が $I_2$ なので $C_W=\sum_i\sigma_i^2=3I_2$。公式からも $m^2s(s+1)=4(1/2)(3/2)=3$ となる。
<!-- solution-end -->

### Level B

<a id="ex-lrep22-b01"></a>

#### LREP22-B01 boostのJacobianを数値で確認する
- Level: B
- ID: LREP22-B01

$m=4$、$\boldsymbol q=(0,0,3)$ に $\cosh\chi=5/4,\sinh\chi=3/4$ のboostを施せ。新しい運動量、Jacobian、不変測度の密度の比を求めよ。

<!-- solution-start -->
**詳細解答。** $E=5$。従って $E'=(25+9)/4=17/2$、$q'_3=(15+15)/4=15/2$。二次形式の負は $(289-225)/4=16$ で質量は不変である。[質量殻測度のLorentz不変性](#thm-lrep22-measure-invariance) の微分行列では第三行の最初の二項が0、最後の項は $5/4+(3/4)(3/5)=17/10$ で、行列式も $17/10$。密度の比は $(1/(2E'))/(1/(2E))=E/E'=10/17$。積が1なので体積要素の伸びと密度の減少が打ち消し合う。
<!-- solution-end -->

<a id="ex-lrep22-b02"></a>

#### LREP22-B02 質量の異なる直和
- Level: B
- ID: LREP22-B02

質量1と質量2のスカラー波束表現の直和 $\mathcal H_1\oplus\mathcal H_2$ を考える。状態 $\psi=(f,g)$ が $\|f\|^2=1/3,\|g\|^2=2/3$ を満たすとき、質量二乗の分布と平均を求め、既約でないことを説明せよ。

<!-- solution-start -->
**詳細解答。** [質量二乗の不変性](#thm-lrep22-mass-casimir) の作用素は各殻で定数なので $C_m(f,g)=(f,4g)$。固有値1への射影は $(f,g)\mapsto(f,0)$、4への射影は $(f,g)\mapsto(0,g)$。確率はそれぞれ $1/3,2/3$、期待値は $1/3+8/3=3$。値3が測定されるわけではない。各射影は非零かつ恒等でなく、表現と可換である。特に $\mathcal H_1\oplus0$ は非自明な閉不変部分空間なので既約ではない。
<!-- solution-end -->

<a id="ex-lrep22-b03"></a>

#### LREP22-B03 Pauli–Lubanskiの時間成分と直交性
- Level: B
- ID: LREP22-B03

$\varepsilon^{0123}=1$ の規約から $W^0=\boldsymbol P\cdot\boldsymbol J$ を導出し、$P_\mu W^\mu=0$ を三次元成分で確認せよ。

<!-- solution-start -->
**詳細解答。** [Pauli–Lubanskiベクトル](#def-lrep22-pauli-lubanski) の $\mu=0$ では残りの添字は1,2,3の順列である。$(1,2,3),(2,3,1),(3,1,2)$ は正符号で、逆順は $M_{ij}$ の反対称性によって同じ寄与を与える。係数 $1/2$ が消え、

$$
W^0=P_1M_{23}+P_2M_{31}+P_3M_{12}
=\sum_iP^iJ_i .
$$

空間成分は $P^0\boldsymbol J-\boldsymbol P\times\boldsymbol K$ だから

$$
P_\mu W^\mu=-P^0\sum_iP^iJ_i
+\sum_iP^iP^0J_i-\sum_{i,j,k}\varepsilon_{ijk}P^iP^jK_k.
$$

最初の二項は共同PVMの可換性で打ち消し合う。最後の項は $P^iP^j$ が対称であり、$\varepsilon_{ijk}$ が反対称だから0。$K_k$ を運動量の左へ移動していない点に注意する。
<!-- solution-end -->

### Level C

<a id="ex-lrep22-c01"></a>

#### LREP22-C01 不変測度からスカラー波束を組み立てる
- Level: C
- ID: LREP22-C01

$m>0$ の $\mathcal H=L^2(\mathcal O_m,\mu_m)$ 上で

$$
(U(a,A)f)(p)=e^{ip\cdot a}f(\rho(A)^{-1}p)
$$

と置く。群法則、ユニタリ性、強連続性、質量二乗、滑らかなコンパクト台の関数における $W^\mu$ の値を確認せよ。

<!-- solution-start -->
**詳細解答。** $\Lambda=\rho(A),\Gamma=\rho(B)$ と置く。二つの作用を合成すると

$$
(U(a,A)U(b,B)f)(p)
=e^{ip\cdot a}e^{i(\Lambda^{-1}p)\cdot b}
f(\Gamma^{-1}\Lambda^{-1}p).
$$

計量保存から $(\Lambda^{-1}p)\cdot b=p\cdot\Lambda b$、また $\Gamma^{-1}\Lambda^{-1}=(\Lambda\Gamma)^{-1}$。よってこれは $U(a+\Lambda b,AB)f$ であり [被覆Poincare群の積](../LREP21/index.md#def-lrep21-covered-poincare) と一致する。単位元の作用は恒等で、逆元が逆作用素を与える。位相の絶対値は1であり、[質量殻測度の不変性](#thm-lrep22-measure-invariance) から

$$
\|U(a,A)f\|^2=\int|f(\Lambda^{-1}p)|^2d\mu_m(p)
=\int|f(q)|^2d\mu_m(q).
$$

従って全射でノルムを保つ線形作用素、すなわちユニタリである。

強連続性を単位元で確かめる。滑らかなコンパクト台の $f$ では $e^{ip\cdot a}f(\Lambda^{-1}p)\to f(p)$ が各点で成立する。$\Lambda$ をコンパクトな単位元近傍に制限すれば変換された台は共通コンパクト集合 $K$ に含まれ、差の二乗は $4\sup|f|^2\mathbf1_K$ 以下である。$\mu_m(K)<\infty$ なので優収束によってノルム差は0へ収束する。一般の $f$ には稠密な滑らかなコンパクト台の関数 $g$ を選び、

$$
\|U(a,A)f-f\|\le2\|f-g\|+\|U(a,A)g-g\|
$$

を使えばよい。まず群の元を単位元へ、次に $g$ を $f$ へ近づける。任意の群の元での連続性は群法則とノルム保存から従う。

共同PVMは $(F(B)f)(p)=\mathbf1_B(p)f(p)$ である。射影の積と可算加法性は指示関数と優収束から従い、並進の位相積分が $T(a)$ を再現するので [共同スペクトル表示](../LREP21/index.md#thm-lrep21-translation-spectrum) の一意性を適用できる。従って $C_m$ は $-\eta(p,p)=m^2$ の乗算、すなわち全空間で $m^2I$。

最後に滑らかなコンパクト台の関数では群の作用を微分でき、$M_{\rho\sigma}$ は $-i(p_\rho\partial_\sigma-p_\sigma\partial_\rho)$ となる。これを [Pauli–Lubanskiベクトル](#def-lrep22-pauli-lubanski) へ代入すると

$$
W^\mu f=-\frac i2\varepsilon^{\mu\nu\rho\sigma}
(p_\nu p_\rho\partial_\sigma-p_\nu p_\sigma\partial_\rho)f.
$$

第一項の $\nu,\rho$、第二項の $\nu,\sigma$ を交換するとそれぞれ自分自身の負になるので両項とも0である。従ってこの模型では $W^\mu f=0$、$C_Wf=0$ となる。これは質量が正でも内部のスピンが0である具体例である。
<!-- solution-end -->

## 8. 次の講義へ

質量殻はLorentz軌道であり、その上には不変測度があります。質量二乗は共同スペクトルの不変量で、Pauli–Lubanskiの二乗は回転とboostを含むもう一つの不変量です。正質量の静止点では後者が通常の角運動量の二乗に帰着します。次講では静止運動量を固定する群を実際に同定し、一般の運動量で内部スピンがどう変換されるかを調べます。
