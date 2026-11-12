# AQFT3 状態・共変表現・正エネルギー真空

[AQFT2のHaag–Kastler型net](../AQFT2/index.md#def-aqft2-haag-kastler)は、観測領域にC*-代数を割り当て、包含・局所性・Poincaré変換を結び付けました。ところが、netだけでは「実験でどんな期待値が出るか」は決まりません。期待値を指定する[正規化した正線形汎関数](../../OA/OA5/index.md#def-oa5-state)と、それをHilbert空間上で扱う**表現**が必要です。さらに、時空並進を表すユニタリ作用素のエネルギーが正かどうかは、三つのnet公理からはまだ決まりません。

本講は「状態を動かす → 変換しても期待値が変わらない場合にGNS表現上の対称性を作る → エネルギーのスペクトルを制限する → 真空の一意性を別に判定する」という順に進みます。後の自由場構成では、この追加条件を実際に満たす状態を探します。

舞台は $M=\mathbb R^{1,3}$、計量 $(-,+,+,+)$、$c=1$、時間向きは未来です。$G=\mathcal P_+^\uparrow$ は固有時刻向きPoincaré群、$F=(a,\Lambda)$ は $x\mapsto\Lambda x+a$ を表します。$T=\mathbb R^4$ をその平行移動部分群とします。$\mathfrak B$ は[AQFT2のquasilocal C*-環](../AQFT2/index.md#prop-aqft2-quasilocal)として、$F\mapsto\alpha_F$ を単位的*-自己同型の群作用とします。以下、一般の局所netでノルム連続な群作用までは仮定しません。

## 1. 状態を時空変換で運ぶ

既習の[OA5の状態](../../OA/OA5/index.md#def-oa5-state)は、$\omega:\mathfrak B\to\mathbb C$ が線形で、$\omega(A^*A)\ge0$ と $\omega(1)=1$ を満たすものです。例えば単位ベクトル $v\in\mathbb C^2$ に対して $\omega_v(A)=\langle v,Av\rangle$ は $M_2(\mathbb C)$ 上の状態です。自己同型が観測量を移動させるなら、状態は逆向きに引き戻すのが自然です。「変換後の観測量 $A$ の期待値」を「変換前の $\alpha_{F^{-1}}(A)$ の期待値」として計算するためです。

<a id="def-aqft3-state-transform"></a>

<!-- formal-statement-start -->
> **定義（状態のPoincaré変換）**  
> 単位的C*-環 $\mathfrak B$ 上の状態 $\omega$ と、*-自己同型の群作用 $\alpha:G\to\operatorname{Aut}(\mathfrak B)$ に対し、$F\in G$ による変換後の汎関数を
>
$$
(F\cdot\omega)(A):=\omega(\alpha_{F^{-1}}(A)),
\qquad A\in\mathfrak B
$$
>
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft3-state-transform -->
### 直接例：行列の状態を回転させる

$U=\begin{pmatrix}0&1\\1&0\end{pmatrix}$、$\alpha_U(A)=UAU^*$、$v=e_1$ とします。$U^{-1}=U=U^*$ なので、定義から
$$
(U\cdot\omega_{e_1})(A)
=\langle e_1,U^*AUe_1\rangle
=\langle e_2,Ae_2\rangle=\omega_{e_2}(A).
$$
特に $A=\operatorname{diag}(1,0)$ なら元の期待値は $1$、変換後は $0$ です。変換した状態と変換していない状態を区別できました。これは一つのユニタリ自己同型の例であり、まだ時空全体のnetの例だとは主張していません。
<!-- definition-example-end -->

<a id="prop-aqft3-state-action"></a>

<!-- formal-statement-start -->
> **命題（状態の引き戻しは状態の群作用を与える）**  
> 単位的C*-環 $\mathfrak B$ に群 $G$ が単位的*-自己同型として作用するとき、任意の状態 $\omega$ と $F,H\in G$ について $F\cdot\omega$ も状態であり、
>
$$
e\cdot\omega=\omega,\qquad
F\cdot(H\cdot\omega)=(FH)\cdot\omega
$$
>
> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

正値性は変換後の $A^*A$ が再び $B^*B$ になること、群作用の順序は逆元が積の順を反転することから確かめます。

<!-- proof-start -->
### 証明

$F\cdot\omega$ は線形です。自己同型は随伴と積を保つため
$$
(F\cdot\omega)(A^*A)
=\omega\!\left(\alpha_{F^{-1}}(A)^*\alpha_{F^{-1}}(A)\right)\ge0.
$$
また $(F\cdot\omega)(1)=\omega(\alpha_{F^{-1}}(1))=\omega(1)=1$ です。単位元 $e$ では $\alpha_e=\mathrm{id}$ なので $e\cdot\omega=\omega$。最後に任意の $A\in\mathfrak B$ について
$$
\begin{aligned}
(F\cdot(H\cdot\omega))(A)
&=(H\cdot\omega)(\alpha_{F^{-1}}(A))\\
&=\omega(\alpha_{H^{-1}}\alpha_{F^{-1}}(A))\\
&=\omega(\alpha_{(FH)^{-1}}(A))\\
&=((FH)\cdot\omega)(A).
\end{aligned}
$$
ここで $\alpha_{H^{-1}}\circ\alpha_{F^{-1}}=\alpha_{H^{-1}F^{-1}}$ を使いました。$\square$
<!-- proof-end -->

実際に物理的な基準状態を一つ指定するとき、群変換しても同じ状態である場合が特に重要です。

<a id="def-aqft3-invariant-state"></a>

<!-- formal-statement-start -->
> **定義（不変状態）**  
> 群 $G$ が $\mathfrak B$ に自己同型 $\alpha_F$ で作用するとする。状態 $\omega$ が $G$ 不変であるとは、すべての $F\in G$、$A\in\mathfrak B$ について
>
$$
\omega(\alpha_F(A))=\omega(A)
$$
>
> を満たすことをいう。平行移動部分群 $T$ についてだけ成立するときは **平行移動不変** と明記する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft3-invariant-state -->
### 直接例：二つの点の確率的混合

$\mathfrak B=\mathbb C^2$、$\alpha_F=\mathrm{id}$ とすると、$0\le\lambda\le1$ の各値に対し
$$
\omega_\lambda(z_1,z_2)=\lambda z_1+(1-\lambda)z_2
$$
は $\omega_\lambda((z_1,z_2)^*(z_1,z_2))=\lambda|z_1|^2+(1-\lambda)|z_2|^2\ge0$、$\omega_\lambda(1,1)=1$ を満たし、さらに $\omega_\lambda(\alpha_F(A))=\omega_\lambda(A)$ です。$\lambda$ を変えると異なる状態ですが、すべて不変です。**不変な状態の存在は、その状態の一意性を意味しません。**
<!-- definition-example-end -->

## 2. 不変状態から共変GNS表現を作る

[OA5のGNS構成](../../OA/OA5/index.md#thm-oa5-gns)は、状態から $(\mathcal H_\omega,\pi_\omega,\Omega_\omega)$ を作り、
$$
\omega(A)=\langle\Omega_\omega,\pi_\omega(A)\Omega_\omega\rangle,
\qquad
\overline{\pi_\omega(\mathfrak B)\Omega_\omega}=\mathcal H_\omega
$$
を与えます（内積は第2変数線形）。状態が変換で不変なら、同じHilbert空間上で群をユニタリ作用素として実現できそうです。求めるのは、単に群の記号を添えることでなく、代数の変換を作用素の共役で実現することです。

<a id="def-aqft3-covariant-cyclic"></a>

<!-- formal-statement-start -->
> **定義（共変巡回表現）**  
> 単位的C*-環 $\mathfrak B$ 上の群作用 $\alpha:G\to\operatorname{Aut}(\mathfrak B)$ に対し、共変巡回表現とは、単位的*-表現 $\pi:\mathfrak B\to B(\mathcal H)$、巡回単位ベクトル $\Omega\in\mathcal H$、ユニタリ群表現 $U:G\to\mathcal U(\mathcal H)$ であって
>
$$
U(F)\pi(A)U(F)^*=\pi(\alpha_F(A)),
\qquad U(F)\Omega=\Omega
$$
>
> がすべての $F,A$ について成立する組 $(\pi,\mathcal H,\Omega,U)$ をいう。強連続性を要求するときは別途明記する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft3-covariant-cyclic -->
### 直接例：自明な群作用

$\mathfrak B=\mathbb C^2$ に前節の自明な作用を入れ、$0<\lambda<1$ に対するGNS空間を $\mathbb C^2$ と同一視します。$\pi(z_1,z_2)=\operatorname{diag}(z_1,z_2)$、$\Omega=(\sqrt\lambda,\sqrt{1-\lambda})$、$U(F)=I_2$ と置くと、$\pi(\mathfrak B)\Omega$ は両成分を任意に動かせるので巡回的です。$U(F)\pi(A)U(F)^*=\pi(A)=\pi(\alpha_F(A))$、$U(F)\Omega=\Omega$ も直接成立します。GNS表現の構成とこれが一致することは第5節で計算します。
<!-- definition-example-end -->

<a id="thm-aqft3-covariant-gns"></a>

<!-- formal-statement-start -->
> **定理（不変状態の共変GNS実装）**  
> 単位的C*-環 $\mathfrak B$ 上の群作用 $F\mapsto\alpha_F$ と、その下で $G$ 不変な状態 $\omega$ が与えられているとする。$\omega$ のGNS三つ組 $(\mathcal H_\omega,\pi_\omega,\Omega_\omega)$ 上に、各 $F\in G$ に対するユニタリ $U_\omega(F)$ が一意に存在し、
>
$$
U_\omega(F)\pi_\omega(A)\Omega_\omega
=\pi_\omega(\alpha_F(A))\Omega_\omega
$$
>
> を満たす。さらに $(\pi_\omega,\mathcal H_\omega,\Omega_\omega,U_\omega)$ は共変巡回表現になる。**この仮定だけから強連続性やスペクトル条件は結論できない。**
<!-- formal-statement-end -->

### 証明の見取り図

GNSの稠密集合の各ベクトルを動かす式を先に決めます。不変性によりその式が内積を保つので、Hilbert空間全体へ拡張できます。

<!-- proof-start -->
### 証明

[OA5のGNS零空間](../../OA/OA5/index.md#def-oa5-gns-null-space)を
$$
N_\omega=\{A:\omega(A^*A)=0\}
$$
と置き、$[A]$ を $\mathfrak B/N_\omega$ の元とします。内積は $\langle[A],[B]\rangle=\omega(A^*B)$、$\Omega_\omega=[1]$ です。$[A]\mapsto[\alpha_F(A)]$ と定めたいとします。もし $[A]=[B]$ なら
$$
\begin{aligned}
\|\,[\alpha_F(A)]-[\alpha_F(B)]\,\|^2
&=\omega(\alpha_F((A-B)^*(A-B)))\\
&=\omega((A-B)^*(A-B))=0.
\end{aligned}
$$
従って代表元に依存しません。さらに任意の $[A],[B]$ に対して
$$
\langle[\alpha_F(A)],[\alpha_F(B)]\rangle
=\omega(\alpha_F(A^*B))=\omega(A^*B)
$$
なので等長です。逆写像候補 $[\alpha_{F^{-1}}(A)]$ もあるため、稠密な商空間上で全射です。完備化によってユニタリ $U_\omega(F)$ に一意に延長されます。

$\alpha_F\alpha_H=\alpha_{FH}$ から、稠密な $[A]$ 上で $U_\omega(F)U_\omega(H)[A]=U_\omega(FH)[A]$。連続性によりHilbert空間全体で群表現です。また
$$
U_\omega(F)\Omega_\omega=[\alpha_F(1)]=[1]=\Omega_\omega.
$$
$[B]$ 上の作用素の共変性は
$$
\begin{aligned}
U_\omega(F)\pi_\omega(A)U_\omega(F)^*[B]
&=U_\omega(F)\pi_\omega(A)[\alpha_{F^{-1}}(B)]\\
&=U_\omega(F)[A\alpha_{F^{-1}}(B)]\\
&=[\alpha_F(A)B]
=\pi_\omega(\alpha_F(A))[B]
\end{aligned}
$$
です。稠密集合上で一致する有界作用素は全体で一致します。$\square$
<!-- proof-end -->

この証明で、$\omega$ が平行移動不変でしかなければ $T$ 上のユニタリ実装しか作れません。Lorentz変換まで実装するには対応する不変性が必要です。また、群表現があっても $F\to e$ で $U_\omega(F)\psi\to\psi$ となるとは限りません。

<a id="prop-aqft3-strong-continuity"></a>

<!-- formal-statement-start -->
> **命題（GNS実装の強連続性判定）**  
> $G$ を位相群、$\omega$ を $\alpha$ に関する $G$ 不変状態とする。前定理で得た $U_\omega$ は、すべての $A\in\mathfrak B$ について
>
$$
\lim_{F\to e}\omega(A^*\alpha_F(A))=\omega(A^*A)
$$
>
> が成立する場合、かつその場合に限り、強連続なユニタリ表現である。
<!-- formal-statement-end -->

### 証明の見取り図

群作用自体のノルム連続性を要求せず、GNSの状態から測れる二点相関だけを調べます。巡回ベクトルから生成される稠密集合で強収束を確認すれば十分です。

<!-- proof-start -->
### 証明

GNSの $[A]=\pi_\omega(A)\Omega_\omega$ について
$$
\begin{aligned}
\|U_\omega(F)[A]-[A]\|^2
&=\|[\alpha_F(A)]\|^2+\|[A]\|^2
-2\operatorname{Re}\langle[A],[\alpha_F(A)]\rangle\\
&=2\omega(A^*A)-2\operatorname{Re}\omega(A^*\alpha_F(A)).
\end{aligned}
$$
十分性：仮定から右辺は $0$ へ収束します。任意の $\psi\in\mathcal H_\omega$ と $\varepsilon>0$ に対して稠密な $[A]$ を $\|\psi-[A]\|<\varepsilon$ となるよう取ると、
$$
\|U_\omega(F)\psi-\psi\|
\le2\varepsilon+\|U_\omega(F)[A]-[A]\|.
$$
$\limsup_{F\to e}$ を取り、その後 $\varepsilon\downarrow0$ として強連続性が得られます。群性から任意の $F_0$ での連続性も従います。

必要性：強連続なら上のノルムが $0$ に収束するだけでなく、$\langle[A],U_\omega(F)[A]\rangle=\omega(A^*\alpha_F(A))$ は内積の連続性により $\omega(A^*A)$ に収束します。$\square$
<!-- proof-end -->

**使い方**。もし $F\mapsto\alpha_F(A)$ がノルム連続なら、[状態のノルムが1であること](../../OA/OA5/index.md#thm-oa5-positive-functional-norm)から
$$
|\omega(A^*\alpha_F(A))-\omega(A^*A)|
\le\|A\|\,\|\alpha_F(A)-A\|\to0
$$
です。しかしノルム連続性は十分条件であり、共変netの定義だけで自動的に付くものではありません。

## 3. 時間並進から四元運動量へ

ここから $U_\omega$ の平行移動への制限 $U(a)$ が強連続だと**追加仮定**します。[QM7のStoneの定理](../../QM/QM7/index.md#thm-qm7-stone)を各座標の一パラメータ群へ適用すると、自己共役生成作用素 $H,P_1,P_2,P_3$ を得ます。指数の符号を
$$
U(t,\boldsymbol x)
=\exp\!\left(i(tH-x^1P_1-x^2P_2-x^3P_3)\right)
$$
と固定します。これは $\eta=(-+++)$ による四元運動量と時空変位の組合せの**負号**を指数に採った規約です。各一パラメータ群が互いに可換なので、そのスペクトル射影も可換です。重要なのは、個別の $H\ge0$ だけでなく、**四つの生成作用素の同時に可能な値**を調べることです。

[QM6の自己共役スペクトル定理](../../QM/QM6/index.md#thm-qm6-unbounded-self-adjoint-spectral)を可換な射影に適用して得る共同スペクトル測度を $E$ と書きます。具体的には各生成作用素の射影測度を $E_0,E_1,E_2,E_3$ とすると、直方体 $I_0\times I_1\times I_2\times I_3$ に
$$
E(I_0\times I_1\times I_2\times I_3)
=E_0(I_0)E_1(I_1)E_2(I_2)E_3(I_3)
$$
を割り当てます。互いに可換な直交射影の積は射影で、有限分割で加法的です。各 $\psi$ に対する $\langle\psi,E(\,\cdot\,)\psi\rangle$ を可換射影の積の測度として延長し、偏極化によって作用素値測度を得ます。したがって
$$
U(a)=\int_{\mathbb R^4}
e^{\,i(p^0 t-\boldsymbol p\cdot\boldsymbol x)}\,dE(p),
\qquad p=(p^0,\boldsymbol p)
$$
と記述できます。$E$ の支持（$E$ がゼロでない開集合を集めた領域の閉包）が同時スペクトルです。有限次元の同時対角行列なら、この積分は固有値ごとの有限和です。

前方閉光円錐を
$$
\overline V_+:=\{(p^0,\boldsymbol p)\in\mathbb R^4:
p^0\ge|\boldsymbol p|\}
$$
とします。$p^0$ はエネルギー、$\boldsymbol p$ は空間運動量です。$p^0\ge|\boldsymbol p|$ は、計量 $(-+++)$ では $-\,(p^0)^2+|\boldsymbol p|^2\le0$ かつ未来向きであることを意味します。

<a id="def-aqft3-spectrum"></a>

<!-- formal-statement-start -->
> **定義（平行移動のスペクトル条件／正エネルギー条件）**  
> 四次元Minkowski時空の平行移動群 $T=\mathbb R^4$ の強連続ユニタリ表現 $U$ に対して、前方閉光円錐 $\overline V_+$ の外で同時スペクトル測度 $E$ が消えるとき、スペクトル条件を満たすという。すなわち
>
$$
E(\mathbb R^4\setminus\overline V_+)=0.
$$
>
> この条件は $H\ge0$ を含むが、一般の平行移動表現では $H\ge0$ だけより強い。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft3-spectrum -->
### 直接例：同時固有値を光円錐で判定する

$\mathcal H=\mathbb C^3$ とし、$H=\operatorname{diag}(0,2,1)$、$P_1=\operatorname{diag}(0,1,2)$、$P_2=P_3=0$ とします。全作用素は対角なので $U(a)$ は強連続で、同時スペクトルは $(0,0,0,0)$、$(2,1,0,0)$、$(1,2,0,0)$ です。最初の二つは $p^0\ge|\boldsymbol p|$ を満たしますが、最後は $1<2$ なので外れます。全固有値で $H\ge0$ であってもスペクトル条件は失敗します。これは**平行移動群だけ**の表現例であり、Lorentz群への拡張を主張しません。
<!-- definition-example-end -->

完全なLorentz共変性まで要求すると事情が変わります。ある観測者にとってエネルギーが非負でも、空間的四元運動量ならboostでエネルギーの符号が反転し得るためです。

<a id="prop-aqft3-lorentz-positive"></a>

<!-- formal-statement-start -->
> **命題（Lorentz共変性とエネルギー正値性）**  
> $G=\mathcal P_+^\uparrow$ の強連続ユニタリ表現 $U$ があり、平行移動の共同スペクトルを $\Sigma$ とする。Lorentz部分は平行移動を次のように運ぶものとする。
>
$
U(\Lambda)U(a)U(\Lambda)^*=U(\Lambda a).
$
>
> このとき時間並進生成作用素の非負性は、共同スペクトルが前方閉光円錐に入ることと同値である。
>
$
H\ge0\quad\Longleftrightarrow\quad \Sigma\subset\overline V_+.
$
<!-- formal-statement-end -->

### 証明の見取り図

一方向は $p^0\ge|\boldsymbol p|$ から直ちに従います。逆方向では、スペクトルがLorentz変換で不変であることを使い、もし空間的なスペクトル点があればboostで負の時間成分を作って矛盾させます。

<!-- proof-start -->
### 証明

$\Sigma\subset\overline V_+$ なら全スペクトル点で $p^0\ge0$ なので、[スペクトル積分の順序](../../QM/QM6/index.md#thm-qm6-unbounded-self-adjoint-spectral)から $H\ge0$ です。

逆に $H\ge0$ とします。このとき $\Sigma\subset\{p^0\ge0\}$ です。Lorentz共変性と共同スペクトル表示から、$\psi$ がスペクトル集合 $B$ に属するなら $U(\Lambda)\psi$ は $\Lambda B$ に属し、$\Sigma$ は各 $\Lambda\in SO^+(1,3)$ で不変です。これは上の指数の恒等式
$$
p^0t-\boldsymbol p\cdot\boldsymbol x
=(\Lambda p)^0(\Lambda a)^0-
(\Lambda\boldsymbol p)\cdot(\Lambda\boldsymbol a)
$$
（同じベクトルと変位を同時変換）から確認できます。

もし $p=(p^0,\boldsymbol p)\in\Sigma$ が $|\boldsymbol p|>p^0\ge0$ を満たすなら、空間回転で $\boldsymbol p=(q,0,0)$、$q>p^0$ とできます。$p^0/q<v<1$ を選び、$x^1$ 方向の速度 $v$ のLorentz boostを作用させると
$$
p'^0=\gamma(p^0-vq),\qquad
\gamma=(1-v^2)^{-1/2}>0.
$$
従って $p'^0<0$ です。ところが共変性から $p'\in\Sigma$ であり、$H\ge0$ に矛盾します。よって全 $p\in\Sigma$ が $p^0\ge|\boldsymbol p|$ を満たします。$\square$
<!-- proof-end -->

**適用範囲**。上の同値は**全Lorentz群の共変実装**がある場合の主張です。単なる平行移動表現に戻れば直前の $\mathbb C^3$ の反例がそのまま有効です。$H$ の定義域や正値性は、共同スペクトルの支持によって判定します。

## 4. 真空をどの条件で区別するか

netを用意し、状態のGNS表現が得られたとしても、正エネルギーと真空を区別しなければなりません。ここでは「真空」という言葉を、**Poincaré不変状態とその正エネルギーGNS表現**に対して使います（平行移動だけの不変性は弱い条件として別名で呼びます）。真空が一つだけかどうかは、さらに別の問題です。

<a id="def-aqft3-vacuum"></a>

<!-- formal-statement-start -->
> **定義（正エネルギー真空と真空一意性）**  
> $G=\mathcal P_+^\uparrow$ が共変に作用する単位的局所C*netを考える。状態 $\omega$ が (i) $G$ 不変、(ii) その共変GNS実装 $U_\omega$ が強連続、(iii) $U_\omega$ の平行移動同時スペクトルが $\overline V_+$ に含まれる、という条件を満たすとき、この講では $\omega$ を **正エネルギー真空状態**、$\Omega_\omega$ をその真空ベクトルと呼ぶ。さらに $U_\omega$ の下で平行移動不変なベクトル全体が $\mathbb C\Omega_\omega$ であるとき **真空ベクトルが一意** という。異なる状態が存在しないという意味ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft3-vacuum -->
### 直接例：同じnet上の一意性の違い

前節の $\mathbb C^2$ に自明なPoincaré作用を入れたnetでは、混合状態 $\omega_{1/2}$ のGNS空間は二次元で $U(F)=I$。よってスペクトル条件は成立し $\Omega$ も不変ですが、$\Omega$ に直交する $(1,-1)$ の方向にも不変ベクトルがあります。一方、評価状態 $\omega_1(z_1,z_2)=z_1$ のGNS空間は一次元なので、**その表現の中では**不変ベクトルは $\mathbb C\Omega$ のみです。netそのものに他の状態が存在しないとは言っていません。
<!-- definition-example-end -->

<a id="prop-aqft3-zero-momentum"></a>

<!-- formal-statement-start -->
> **命題（零運動量射影と不変ベクトル）**  
> 強連続ユニタリ表現 $U:T=\mathbb R^4\to\mathcal U(\mathcal H)$ の共同スペクトル測度を $E$ とする。すべての平行移動で不変なベクトルの空間は $\operatorname{Ran}E(\{0\})$ である。したがって、不変単位ベクトル $\Omega$ が与えられているとき、その一意性（位相因子を除く）は
>
$$
E(\{0\})=|\Omega\rangle\langle\Omega|
$$
>
> と同値である。
<!-- formal-statement-end -->

### 証明の見取り図

真空の一意性を「状態は一つしかない」と表現せず、同じHilbert空間で四つの生成作用素の零固有空間を調べます。

<!-- proof-start -->
### 証明

各座標方向の一パラメータ群の生成作用素を $K_0=H$、$K_j=-P_j$ と書くと、[Stoneの定理](../../QM/QM7/index.md#thm-qm7-stone)とスペクトル表示より
$$
U(se_\mu)\psi=\psi\ \ (\forall s\in\mathbb R)
\quad\Longleftrightarrow\quad E_\mu(\{0\})\psi=\psi.
$$
逆向きは積分表示で零固有値上の指数が $1$ になることから従います。順向きは
$$
0=\|(U(se_\mu)-I)\psi\|^2
=\int_{\mathbb R}|e^{is\lambda}-1|^2\,d\mu_\psi(\lambda)
$$
がすべての $s$ で成立するので、例えば有理数 $s$ の可算個の条件を併せれば、$\lambda\ne0$ の質量はすべて零であることから従います。

平行移動は座標方向の和で生成されるため、全並進に不変であることは各方向に不変であることと同値です。各射影は可換なのでその共通部分は
$$
\bigcap_{\mu=0}^3\operatorname{Ran}E_\mu(\{0\})
=\operatorname{Ran}\!\left(\prod_{\mu=0}^3E_\mu(\{0\})\right)
=\operatorname{Ran}E(\{0\}).
$$
ここに $\Omega$ が属し、かつ不変ベクトルがその一次元の張る空間だけであることは、直交射影が $|\Omega\rangle\langle\Omega|$ と一致することに等しいです。$\square$
<!-- proof-end -->

真空の存在は $E(\{0\})\ne0$、この表現における真空の一意性は $\operatorname{rank}E(\{0\})=1$。正エネルギー条件は $E$ の**支持領域**への制約なので、$\operatorname{rank}E(\{0\})$ までは決めません。

## 5. 二つの小模型で仮定の独立性を確認する

### 5.1 二点可換net：正エネルギーでも真空は縮退する

$\mathfrak B=\mathbb C^2$、任意の非空開領域 $O\subset M$ に $\mathfrak A(O)=\mathbb C^2$、空領域に $\mathfrak A(\varnothing)=\mathbb C(1,1)$ を割り当て、全 $F\in G$ に $\alpha_F=\mathrm{id}$ とします。isotony は $\mathbb C1\subset\mathbb C^2$、Einstein局所性は全代数が可換であること、共変性は非空性をPoincaré変換が保つことから成立します。これは[AQFT2の基本netの定義](../AQFT2/index.md#def-aqft2-haag-kastler)の全条件を満たします。

<a id="prop-aqft3-two-point"></a>

<!-- formal-statement-start -->
> **命題（二点可換netの真空非一意性）**  
> 上の二点可換netで $0<\lambda<1$ とし、次の状態を取る。
>
$
\omega_\lambda(z_1,z_2)=\lambda z_1+(1-\lambda)z_2.
$
>
> この状態のGNS表現は次の組とユニタリ同値である。
>
$
\begin{aligned}
\mathcal H&=\mathbb C^2,\qquad
\pi(z_1,z_2)=\operatorname{diag}(z_1,z_2),\\
\Omega&=(\sqrt\lambda,\sqrt{1-\lambda}),\qquad U(F)=I_2.
\end{aligned}
$
>
> 従って正エネルギー真空は存在するが、この表現で真空ベクトルは一意でない。
<!-- formal-statement-end -->

### 証明の見取り図

GNSの内積を対角重みから導き、零空間がゼロであることを示します。その後に明示的な等長写像で通常の $\mathbb C^2$ へ移し、共同スペクトルを求めます。

<!-- proof-start -->
### 証明

$\omega_\lambda((z_1,z_2)^*(z_1,z_2))=\lambda|z_1|^2+(1-\lambda)|z_2|^2$ です。$0<\lambda<1$ なので $N_{\omega_\lambda}=\{(0,0)\}$。GNS商空間は $\mathbb C^2$ で、内積は
$$
\langle(z_1,z_2),(w_1,w_2)\rangle_\omega
=\lambda\overline z_1w_1+(1-\lambda)\overline z_2w_2.
$$
写像 $V(z_1,z_2)=(\sqrt\lambda z_1,\sqrt{1-\lambda}z_2)$ は内積を保ち全射です。左乗法 $\pi_\omega(a)[z]=[az]$ は $V$ で共役すると対角行列 $\operatorname{diag}(a_1,a_2)$、$[1]$ は $\Omega$ に移ります。$\Omega$ の両成分は非零なので、対角行列の作用で全空間が生成されます。

$\alpha_F=\mathrm{id}$ から[共変GNS定理](#thm-aqft3-covariant-gns)の実装は $U(F)=I_2$ です。強連続であり、平行移動共同スペクトル測度は $E(\{0\})=I_2$。その支持は $\{0\}\subset\overline V_+$ ですが、$\operatorname{rank}E(\{0\})=2$。よって[零運動量射影と不変ベクトル](#prop-aqft3-zero-momentum)により真空は一意ではありません。$\square$
<!-- proof-end -->

### 5.2 不変な状態でもエネルギーが負になり得る

次は**時間並進部分群だけ**の代数動力学であり、Poincaré共変な局所netの反例だとは主張しません。$\mathfrak B=M_2(\mathbb C)$ に $D=\operatorname{diag}(0,1)$、$V_t=e^{itD}$、$\alpha_t(A)=V_tAV_t^*$ を置きます。正規化トレース $\tau(A)=\operatorname{Tr}(A)/2$ は $\tau(\alpha_t(A))=\tau(A)$ です。しかしGNS空間の行列単位 $E_{ij}$ に
$$
U_t(E_{ij})=V_tE_{ij}V_t^*
=e^{it(d_i-d_j)}E_{ij},
\qquad(d_1,d_2)=(0,1)
$$
として作用します。$E_{12}$ の周波数は $-1$、$E_{21}$ は $+1$、対角成分は $0$。不変性と強連続性だけではエネルギーの非負性は言えません。ここではLorentz共変性がないので第3節の命題には矛盾しません。

## 6. 加法性とtime-sliceも別の仮定である

ここまでで選んだ状態とエネルギーをnet公理から切り分けました。空間を細かい領域へ分けたとき、全体の代数がそれらから生成されるかどうかも別問題です。さらに、ある時間帯の観測量から時空全体の観測量を再構成できるかどうかも、局所性だけでは保証されません。

<a id="def-aqft3-additivity"></a>

<!-- formal-statement-start -->
> **定義（加法性）**  
> 局所net $\mathfrak A$ が加法性を満たすとは、開領域 $O$ の任意の開被覆 $O=\bigcup_i O_i$ に対して、$\mathfrak A(O)$ が部分環 $\mathfrak A(O_i)$ の生成するC*-環に等しいことをいう。
>
$$
\mathfrak A(O)=C^*\!\left(\bigcup_i\mathfrak A(O_i)\right).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft3-additivity -->
### 直接例：一定な可換net

第5節のnetは非空領域に同じ $\mathbb C^2$ を割り当てます。非空な $O$ の開被覆には非空な $O_i$ が少なくとも一つあるため、右辺は $\mathbb C^2$ になり加法性を満たします。$O=\varnothing$ の場合は空被覆から生成される単位的C*-環を $\mathbb C1$ とする規約です。
<!-- definition-example-end -->

<a id="def-aqft3-time-slice"></a>

<!-- formal-statement-start -->
> **定義（time-slice条件：Minkowski全体に対する形）**  
> 四次元Minkowski時空 $M$ における局所net $\mathfrak A$ が本講のtime-slice条件を満たすとは、$M$ のCauchy面を一つ含む任意の開近傍 $N\subset M$ に対して
>
$$
\mathfrak A(N)=\mathfrak A(M)
$$
>
> となることをいう。ここでCauchy面は、すべての非延長な因果曲線と一度だけ交わる面である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft3-time-slice -->
### 直接例：時間帯

$N=\{(t,\boldsymbol x):|t|<1\}$ は $\{t=0\}$ というMinkowskiのCauchy面の開近傍です。一定な可換netなら $\mathfrak A(N)=\mathfrak A(M)=\mathbb C^2$ なので、この $N$ で条件を確認できます。同じ理由で任意のCauchy面近傍でも成立します。一般の大域双曲な部分時空に対する強いtime-slice条件は後の構成と区別します。
<!-- definition-example-end -->

<a id="prop-aqft3-additivity-independent"></a>

<!-- formal-statement-start -->
> **命題（基本net公理から加法性とtime-sliceは従わない）**  
> Minkowski時空 $M=\mathbb R^{1,3}$ と容器 $\mathfrak B=\mathbb C^2$ を取り、任意の開集合 $O\subset M$ へ次の割当てと自明なPoincaré作用を定める。
>
$
\mathfrak A(O)=
\begin{cases}
\mathbb C^2,&O=M,\\
\mathbb C(1,1),&O\ne M,
\end{cases}
\qquad \alpha_F=\mathrm{id}.
$
>
> この割当てはisotony・Einstein局所性・Poincaré共変性を満たすが、加法性も上で定めたtime-slice条件も満たさない。
<!-- formal-statement-end -->

### 証明の見取り図

全体 $M$ だけに追加の観測量を置いたため、狭い領域からは生成できません。公理との衝突がないことは、$\mathbb C^2$ の可換性と、Poincaré変換が $M$ を $M$ へ写すことを使って確認します。

<!-- proof-start -->
### 証明

各 $\mathfrak A(O)$ は $\mathbb C^2$ と単位元を共有する閉C*-部分環です。$O_1\subset O_2$ のとき、$O_1=M$ なら $O_2=M$、それ以外は $\mathfrak A(O_1)=\mathbb C1$ が任意の $\mathfrak A(O_2)$ に含まれるのでisotonyです。$\mathfrak B=\mathbb C^2$ が可換なので全領域の代数の元は相互に交換し、Einstein局所性を満たします。$F(M)=M$ であり、$F$ は全単射なので $O\ne M$ と $F(O)\ne M$ が同値です。よって自明作用でも $\alpha_F(\mathfrak A(O))=\mathfrak A(F(O))$ が成り立ちます。

$M$ は有界なdouble coneの開被覆で覆えます。各 double cone $O_i$ は $M$ と異なるので、生成C*-環は $\mathbb C1$ のみです。しかし $\mathfrak A(M)=\mathbb C^2$ なので加法性に反します。

$N=\{|t|<1\}$ は $t=0$ のCauchy面を含む開近傍ですが、$N\ne M$ なので $\mathfrak A(N)=\mathbb C1\ne\mathfrak A(M)$ です。time-slice条件も破れます。$\square$
<!-- proof-end -->

この例は、加法性の失敗とtime-sliceの失敗を同時に示すものであり、**二条件が互いに独立である**とまでは証明していません。その区別も数学的に重要です。

## 7. 演習

### Level A：状態・共変性・スペクトルを手で読む

<a id="ex-aqft3-a01"></a>
#### AQFT3-A01 ベクトル状態を引き戻す
- Level: A

$M_2(\mathbb C)$ で $U=\begin{pmatrix}0&1\\1&0\end{pmatrix}$、$\alpha(A)=UAU^*$、$\omega(A)=\langle e_1,Ae_1\rangle$ とする。$\omega\circ\alpha^{-1}$ が状態であることを確認し、$A=\operatorname{diag}(3,7)$ の期待値を計算せよ。

<!-- solution-start -->
**詳細解答**。$U=U^*=U^{-1}$ です。任意の $B$ について
$$
(\omega\circ\alpha^{-1})(B^*B)
=\|\,\alpha^{-1}(B)e_1\,\|^2\ge0,
\quad
(\omega\circ\alpha^{-1})(I)=1.
$$
線形性は合成で保存されるため状態です。さらに
$$
UAU^*=\begin{pmatrix}7&0\\0&3\end{pmatrix},
\qquad
(\omega\circ\alpha^{-1})(A)=\langle e_1,UAU^*e_1\rangle=7.
$$
元の $\omega(A)=3$ との違いは、状態が $e_1$ から $e_2$ のベクトル状態へ運ばれたことに対応します。
<!-- solution-end -->

<a id="ex-aqft3-a02"></a>
#### AQFT3-A02 状態への群作用の順序
- Level: A

$\alpha_F\alpha_H=\alpha_{FH}$ とし、$(F\cdot\omega)(A)=\omega(\alpha_{F^{-1}}(A))$ とする。$F\cdot(H\cdot\omega)$ と $(FH)\cdot\omega$ が等しいことを、作用する対象 $A$ を書きながら示せ。

<!-- solution-start -->
**詳細解答**。$A$ に順に作用させると
$$
\begin{aligned}
(F\cdot(H\cdot\omega))(A)
&=(H\cdot\omega)(\alpha_{F^{-1}}(A))\\
&=\omega(\alpha_{H^{-1}}(\alpha_{F^{-1}}(A)))\\
&=\omega(\alpha_{H^{-1}F^{-1}}(A)).
\end{aligned}
$$
$(FH)^{-1}=H^{-1}F^{-1}$ より最後の式は $((FH)\cdot\omega)(A)$ に等しいです。逆元の順序を反転しなければ群作用の等式が壊れます。
<!-- solution-end -->

<a id="ex-aqft3-a03"></a>
#### AQFT3-A03 重み付きGNS内積
- Level: A

$\omega_{1/4}(z_1,z_2)=\frac14z_1+\frac34z_2$ について、$N_\omega$、$\|[(2,0)]\|_\omega$、$V(1,1)$ を求めよ。ただし $V(z_1,z_2)=(\frac12z_1,\frac{\sqrt3}{2}z_2)$ とする。

<!-- solution-start -->
**詳細解答**。$(z_1,z_2)^*(z_1,z_2)=(|z_1|^2,|z_2|^2)$ なので
$$
\omega_{1/4}(z^*z)=\frac14|z_1|^2+\frac34|z_2|^2=0
\Longleftrightarrow z_1=z_2=0.
$$
従って $N_\omega=\{0\}$ です。また
$$
\|[(2,0)]\|_\omega^2=\tfrac14\cdot4=1,
\qquad V(1,1)=(\tfrac12,\tfrac{\sqrt3}{2}).
$$
最後のベクトルのノルム二乗は $1/4+3/4=1$ なので正規化されています。
<!-- solution-end -->

<a id="ex-aqft3-a04"></a>
#### AQFT3-A04 前方光円錐を計算する
- Level: A

四元運動量 $p=(p^0,p^1,p^2,p^3)$ について、$(3,1,2,0)$、$(2,2,0,0)$、$(1,2,0,0)$、$(-3,0,0,0)$ が $\overline V_+$ に属するか判定せよ。各々の時空ノルムも求めよ。

<!-- solution-start -->
**詳細解答**。$\eta(p,p)=-(p^0)^2+(p^1)^2+(p^2)^2+(p^3)^2$、$\overline V_+$ の条件は $p^0\ge|\boldsymbol p|$ です。
$$
\begin{array}{c|c|c|c}
p&p^0&|\boldsymbol p|&\eta(p,p)\\\hline
(3,1,2,0)&3&\sqrt5&-4\\
(2,2,0,0)&2&2&0\\
(1,2,0,0)&1&2&3\\
(-3,0,0,0)&-3&0&-9
\end{array}
$$
前二者だけが $\overline V_+$ に属します。最後は $\eta(p,p)<0$ でも過去向きなので入らず、「二乗が非正」だけでは条件が不足します。
<!-- solution-end -->

### Level B：仮定を使う位置を見極める

<a id="ex-aqft3-b01"></a>
#### AQFT3-B01 GNS実装の強連続性
- Level: B

$\omega$ が $G$ 不変で、すべての $A\in\mathfrak B$ に対し $\|\alpha_F(A)-A\|\to0$（$F\to e$）とする。GNS実装の強連続性を示せ。なぜ「すべての $\psi$ について初めから計算する」必要がないかも説明せよ。

<!-- solution-start -->
**詳細解答**。[状態のノルム](../../OA/OA5/index.md#thm-oa5-positive-functional-norm)が1であるため
$$
|\omega(A^*\alpha_F(A))-\omega(A^*A)|
\le\|A^*\|\,\|\alpha_F(A)-A\|\to0.
$$
一方、[共変GNS実装](#thm-aqft3-covariant-gns)から
$$
\|U(F)[A]-[A]\|^2
=2\omega(A^*A)-2\operatorname{Re}\omega(A^*\alpha_F(A))\to0.
$$
$[A]$ の全体はGNS構成で稠密です。任意の $\psi$ に $[A]$ を $\varepsilon$ 以内で近似すると、$U(F)$ はユニタリゆえ
$$
\|U(F)\psi-\psi\|
\le 2\varepsilon+\|U(F)[A]-[A]\|.
$$
$F\to e$ の後に $\varepsilon\to0$ として全 $\psi$ の強連続性が得られます。
<!-- solution-end -->

<a id="ex-aqft3-b02"></a>
#### AQFT3-B02 不変性から正エネルギーは出ない
- Level: B

$D=\operatorname{diag}(0,2)$、$V_t=e^{itD}$、$\alpha_t(A)=V_tAV_t^*$ を $M_2(\mathbb C)$ に作用させる。正規化トレースの不変性を示し、行列単位 $E_{11},E_{12},E_{21},E_{22}$ のGNS実装の周波数を全て求めよ。

<!-- solution-start -->
**詳細解答**。有限行列のトレースの巡回性から
$$
\tau(\alpha_t(A))=\tfrac12\operatorname{Tr}(V_tAV_t^*)
=\tfrac12\operatorname{Tr}(AV_t^*V_t)=\tau(A).
$$
GNSベクトル $[A]$ は行列空間で同一視でき、実装は $U_t[A]=[V_tAV_t^*]$ です。$d_1=0,d_2=2$ とすれば、$V_tE_{ij}V_t^*=e^{it(d_i-d_j)}E_{ij}$ なので、$E_{11}$ は $0$、$E_{12}$ は $-2$、$E_{21}$ は $+2$、$E_{22}$ は $0$ です。$\Omega=[I]$ は不変でも負の周波数 $-2$ があり、エネルギー非負は成立しません。Lorentz共変性の仮定がない部分群の例です。
<!-- solution-end -->

<a id="ex-aqft3-b03"></a>
#### AQFT3-B03 boostで空間的スペクトルを排除する
- Level: B

Lorentz共変な強連続表現で $H\ge0$ とする。もし共同スペクトルに $p=(1,2,0,0)$ があったら、$x^1$ 方向の速度 $v=3/4$ のboostを用いて矛盾を導け。Lorentz共変性を落とした場合にどこが壊れるかも答えよ。

<!-- solution-start -->
**詳細解答**。$0<v<1$ で $\gamma=(1-v^2)^{-1/2}=4/\sqrt7$ です。このboost後の時間成分は
$$
p'^0=\gamma(p^0-vp^1)
=\frac4{\sqrt7}\left(1-\frac34\cdot2\right)
=-\frac2{\sqrt7}<0.
$$
Lorentz共変性により共同スペクトルはboostで不変なので、$p'$ もスペクトルに入るはずです。しかし $H\ge0$ なら全スペクトル点で $p^0\ge0$ でなければならず矛盾します。Lorentz共変性がなければ「$p'$ もスペクトルに入る」という段階が成立せず、$\mathbb C^3$ の対角模型のような空間的スペクトルを排除できません。
<!-- solution-end -->

<a id="ex-aqft3-b04"></a>
#### AQFT3-B04 大きな領域だけに量を隠す
- Level: B

$M$ の全開集合に対し $\mathfrak A(M)=\mathbb C^2$、$O\ne M$ なら $\mathfrak A(O)=\mathbb C1$、$\alpha_F=\mathrm{id}$ とする。(i) 三つの基本net公理、(ii) $M$ のdouble cone開被覆に関する加法性、(iii) $\{|t|<1\}$ に関するtime-slice条件を判定せよ。

<!-- solution-start -->
**詳細解答**。(i) $O_1\subset O_2$ で $O_1=M$ なら $O_2=M$、それ以外なら $\mathbb C1$ が割当て先に含まれるのでisotony。$\mathbb C^2$ は可換なので空間的に離れた全観測量も交換します。Poincaré変換は $M$ と真の部分開集合をそれぞれ同種の集合へ送るので、$\alpha_F=\mathrm{id}$ で共変性が成立します。

(ii) double coneは全て $M$ の真の部分集合で、被覆の各局所代数は $\mathbb C1$ です。その生成C*-環は $\mathbb C1$ のままですが、$\mathfrak A(M)=\mathbb C^2$ なので加法性に反します。

(iii) $N=\{|t|<1\}$ はCauchy面 $\{t=0\}$ を含みますが $N\ne M$ です。$\mathfrak A(N)=\mathbb C1\ne\mathbb C^2=\mathfrak A(M)$ なのでtime-slice条件も失敗します。
<!-- solution-end -->

### Level C：状態・表現・幾何を統合する

<a id="ex-aqft3-c01"></a>
#### AQFT3-C01 二点netにおける真空条件を完全判定する
- Level: C

第5節の $\mathfrak B=\mathbb C^2$、$\mathfrak A(O)=\mathbb C^2$（非空 $O$）、$\alpha_F=\mathrm{id}$ を考える。状態 $\omega_\lambda(z_1,z_2)=\lambda z_1+(1-\lambda)z_2$（$0\le\lambda\le1$）について、(i) 基本net公理と全状態の不変性、(ii) $\lambda\in(0,1)$ のGNS表現・強連続性・共同スペクトル、(iii) $\lambda=0,1$ のGNS表現と真空一意性、(iv) これらから論理的に何が従わないかを、途中式を含めて示せ。

<!-- solution-start -->
**詳細解答**。

(i) 非空集合への割当ては常に $\mathbb C^2$、空集合では $\mathbb C1$ です。包含での値は $\mathbb C1\subset\mathbb C^2$ の方向なのでisotony、$\mathbb C^2$ の元はすべて可換なので局所性、$F(O)$ と $O$ は非空かどうか一致し $\alpha_F=\mathrm{id}$ なので共変性です。全ての $\omega_\lambda$ について $\omega_\lambda\circ\alpha_F=\omega_\lambda$ が成立します。

(ii) $0<\lambda<1$ なら
$$
\omega_\lambda(z^*z)=\lambda|z_1|^2+(1-\lambda)|z_2|^2
$$
が零となるのは $z_1=z_2=0$ のときだけなので $N_\omega=0$。等長写像
$$
V(z_1,z_2)=(\sqrt\lambda z_1,\sqrt{1-\lambda}z_2)
$$
でGNS空間は $\mathbb C^2$、$\pi(z_1,z_2)=\operatorname{diag}(z_1,z_2)$、$\Omega=(\sqrt\lambda,\sqrt{1-\lambda})$ です。$U(F)[z]=[\alpha_F(z)]=[z]$ なので $U(F)=I_2$、特に強連続です。平行移動の全生成作用素は零だから
$$
E(\{0\})=I_2,\qquad
\operatorname{supp}E=\{0\}\subset\overline V_+.
$$
しかし $\operatorname{rank}E(\{0\})=2$ で真空は一意でありません。

(iii) $\lambda=1$ なら $N_{\omega_1}=\{(0,z_2):z_2\in\mathbb C\}$、商空間は第1成分だけの一次元。$\pi_{\omega_1}(z_1,z_2)$ は $z_1$ 倍、$\Omega=1$、$U=1$ なので $E(\{0\})=I_1$ はrank1です。$\lambda=0$ も第2成分を残して同様に一次元となります。

(iv) 基本net公理や不変状態の存在から、選んだGNS表現での真空一意性は導けません。(ii)が反例です。一方、(iii)で一意なのは**各GNS表現の中の**不変ベクトルであって、異なる真空状態 $\omega_0,\omega_1$ がnet上に存在しないという結論ではありません。正エネルギーであることと、真空状態そのものがnet上で唯一であることも区別できます。
<!-- solution-end -->

## 8. 次講への橋

今回選んだ状態やスペクトル条件は、netの三公理への**追加情報**でした。非可換で無限自由度の物理模型でも正エネルギー真空を実際に作れるかが、次の中心問題です。[AQFT2の局所net](../AQFT2/index.md#def-aqft2-haag-kastler)へ自由Klein–Gordon場を入れるため、次講AQFT4ではGreen作用素とコンパクト台の滑らかな関数が作る商から始めます。特定の自由場の真空二点関数やFock表現は、まだこの章で構成したものではありません。
