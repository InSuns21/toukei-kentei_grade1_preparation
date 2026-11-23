# GBG19 Dirac monopoleの電荷はなぜ量子化されるか

[前講の貼り合わせ束](../GBG18/index.md#def-gbg18-clutching) $P_n\to S^2$ は、赤道を一周すると遷移関数が $n$ 回回る主 $U(1)$ 束であった。巻き数が非零なら大域sectionは存在しない。しかし前講では、[GBG10で導入した曲率2形式](../GBG10/index.md#def-gbg10-curvature)を積分してこの整数を取り出す計算を行っていない。

今回は南北それぞれで滑らかなゲージポテンシャルを作り、両者が同じ**大域接続**を表すことを確かめる。さらに曲率の面積分と赤道の巻き数を結び、磁束が離散的な値を取る仕組みを証明する。

**規約**。$S^2=\{(X,Y,Z)\in\mathbb R^3:X^2+Y^2+Z^2=1\}$ は外向きの向きを持つ。極を除く場所で、極角 $0<\vartheta<\pi$、方位角 $\varphi$ を
$$
(X,Y,Z)=(\sin\vartheta\cos\varphi,\sin\vartheta\sin\varphi,\cos\vartheta)
$$
と置く。向きに対応する面積形式は $\sin\vartheta\,d\vartheta\wedge d\varphi$ である。$\varphi$ は $2\pi$ を法とする角度であり、$d\varphi$ は極を除く領域で定義される1形式であって、球面全体の滑らかな1形式ではない。以下の $d$ は球面上の外微分であり、局所座標では $\vartheta,\varphi$ の両方を変数として微分する。構造群のLie環は $\mathfrak u(1)=i\mathbb R$、右作用の規約は $s_S=s_Ng_{NS}$、局所接続は $A_i=s_i^*\omega$ とする。前講の
[巻き数の定義](../GBG18/index.md#def-gbg18-winding)に合わせ、$g_{NS}=e^{in\varphi}$ と固定する。

## 1. 極で滑らかな二つのポテンシャルを作る

$U_N=S^2\setminus\{\text{南極}\}$、$U_S=S^2\setminus\{\text{北極}\}$ とする。球面上では $d\varphi$ 自体が極で定義できないため、単純な定数倍 $c\,d\varphi$ は一般に極で滑らかにならない。そこで北極では $1-\cos\vartheta$、南極では $1+\cos\vartheta$ を掛け、消える係数で極の問題を解消する。

<a id="def-gbg19-monopole-potentials"></a>

<!-- formal-statement-start -->
> **定義（Dirac monopoleの南北局所接続）**  
> 整数 $n\in\mathbb Z$ と、[球面上のクラッチング主束](../GBG18/index.md#def-gbg18-clutching) $P_n$ を取る。$U_N,U_S$ 上の $i\mathbb R$ 値1形式を、極を除く球面座標で

$$
A_N=-\frac{in}{2}(1-\cos\vartheta)\,d\varphi,\qquad
A_S=\frac{in}{2}(1+\cos\vartheta)\,d\varphi
$$

> と定め、それぞれ北極・南極まで滑らかに延長したものを **Dirac monopoleの局所接続**と呼ぶ。以下で延長の存在と $g_{NS}=e^{in\varphi}$ に関する接続変換則を証明する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg19-monopole-potentials -->
**定義の確認**（$n=1$）。まず重なりで、[局所接続の変換則](../GBG8/index.md#thm-gbg8-local-transform)が要求する差を調べる。
$$
A_S-A_N=\frac{i}{2}\bigl((1+\cos\vartheta)+(1-\cos\vartheta)\bigr)d\varphi
=i\,d\varphi,
\qquad
g_{NS}^{-1}dg_{NS}=e^{-i\varphi}(ie^{i\varphi}d\varphi)=i\,d\varphi.
$$
さらに極での滑らかさを、冒頭で定めた球面のCartesian座標 $(X,Y,Z)$ で確かめる。角度 $\varphi$ は極で使えないので、その微分を極を含む領域でも定義できる座標関数の微分で表す。$X=\sin\vartheta\cos\varphi$、$Y=\sin\vartheta\sin\varphi$ を微分すると、$d\vartheta$ の項が打ち消し合って
$$
X\,dY-Y\,dX=\sin^2\vartheta\,d\varphi
=(1-Z^2)\,d\varphi
$$
となる。よって極以外では
$$
A_N=-\frac{i}{2}\frac{X\,dY-Y\,dX}{1+Z},\qquad
A_S=\frac{i}{2}\frac{X\,dY-Y\,dX}{1-Z}.
$$
右辺はそれぞれ $U_N$ で $1+Z>0$、$U_S$ で $1-Z>0$ だから滑らかである。これにより、重なりでの変換則と、各パッチの極までの滑らかな延長という定義の二条件を直接確認した。
<!-- definition-example-end -->

<a id="prop-gbg19-smooth-gluing"></a>

<!-- formal-statement-start -->
> **命題（南北局所接続の滑らかさと貼り合わせ）**  
> すべての整数 $n$ について、上の $A_N$ は $U_N$ 全体で、$A_S$ は $U_S$ 全体で滑らかな $i\mathbb R$ 値1形式へ延長される。これらは $P_n$ 上の一つの滑らかな主 $U(1)$ 接続 $\omega$ の局所表示になる。
<!-- formal-statement-end -->

**証明の見取り図**。極で不定な $d\varphi$ を、球面に埋め込まれたCartesian座標で表し直す。重なりの非斉次変換則を検算すれば、大域接続の再構成定理を適用できる。

<!-- proof-start -->
### 証明

$X^2+Y^2=\sin^2\vartheta=1-Z^2$ を使う。極以外で
$$
d\varphi=\frac{X\,dY-Y\,dX}{X^2+Y^2}.
$$
これは $X=\sin\vartheta\cos\varphi$、$Y=\sin\vartheta\sin\varphi$ を微分すると
$$
X\,dY-Y\,dX
=\sin^2\vartheta(\cos^2\varphi+\sin^2\varphi)\,d\varphi
=\sin^2\vartheta\,d\varphi
$$
となるためである。従って
$$
(1-Z)d\varphi=\frac{X\,dY-Y\,dX}{1+Z},\qquad
(1+Z)d\varphi=\frac{X\,dY-Y\,dX}{1-Z}.
$$
$U_N$ では $1+Z>0$、$U_S$ では $1-Z>0$ なので、
$$
A_N=-\frac{in}{2}\frac{X\,dY-Y\,dX}{1+Z},\qquad
A_S=\frac{in}{2}\frac{X\,dY-Y\,dX}{1-Z}
$$
がそれぞれの極を含む開領域上で滑らかな延長を与える。分母が零になる反対側の極は定義域に含めていない。

重なりでの遷移関数は $g_{NS}=(X+iY)^n/(X^2+Y^2)^{n/2}=e^{in\varphi}$ であり、$n$ が整数だから一周後も一価で滑らかである。積を微分して
$$
g_{NS}^{-1}dg_{NS}=in\,d\varphi,\qquad
A_S-A_N=in\,d\varphi
$$
を得る。$U(1)$ は可換なので随伴作用は恒等である。この等式は[局所接続からの大域接続の再構成](../GBG8/index.md#thm-gbg8-local-reconstruction)の仮定であり、前講で構成した滑らかな主束 $P_n$ 上に $\omega$ が存在する。
<!-- proof-end -->

**局所形式の違いは誤差ではない**。$A_N$ と $A_S$ は同じ大域接続を異なる局所sectionで読んだものだが、一つの大域1形式として一致する必要はない。極の近くで片方の表示に発生する発散は、その表示を適用範囲の外まで延長したためである。

## 2. 同じ曲率から一つの磁束を計算する

[曲率の局所構造方程式](../GBG10/index.md#thm-gbg10-local-formula)では $F_i=dA_i+\frac12[A_i\wedge A_i]$ である。$U(1)$ のLie環は可換だから括弧項は零で、$F_i=dA_i$ となる。[曲率の局所変換則](../GBG10/index.md#thm-gbg10-gauge-transform)でも $U(1)$ の場合は $F_S=F_N$ であり、球面全体の $i\mathbb R$ 値2形式 $F$ が得られる。

この形式の積分を整数に正規化するには、$i$ の符号を決める必要がある。本講では反Hermite値曲率に対して $i/(2\pi)$ を掛ける。

<a id="def-gbg19-chern-number"></a>

<!-- formal-statement-start -->
> **定義（第一Chern数としての磁束整数）**  
> 向き付けられた $S^2$ 上の滑らかな主 $U(1)$ 束とその滑らかな接続から得られる曲率 $F\in\Omega^2(S^2;i\mathbb R)$ に対し、正規化された曲率積分を

$$
c_1[P,F]=\frac{i}{2\pi}\int_{S^2}F\in\mathbb R
$$

> と書く。後節でこれが整数であることと、接続の取り方に依存しないことを示す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg19-chern-number -->
**定義の確認**（$n=1$）。前節で確かめた滑らかな局所形式について、可換群の曲率公式 $F=dA_i$ を用いると
$$
F=dA_N=-\frac{i}{2}d(1-\cos\vartheta)\wedge d\varphi
=-\frac{i}{2}\sin\vartheta\,d\vartheta\wedge d\varphi.
$$
$F$ は両パッチの滑らかな外微分として極まで延び、$iF=\frac12\sin\vartheta\,d\vartheta\wedge d\varphi$ は実数値2形式である。外向きの球面では $\int_{S^2}\sin\vartheta\,d\vartheta\wedge d\varphi=4\pi$ なので
$$
c_1[P_1,F]=\frac{i}{2\pi}\left(-\frac{i}{2}\right)4\pi=1.
$$
これで正規化積分の実数性だけでなく、この具体例での値も定義から確認できた。
<!-- definition-example-end -->

<a id="thm-gbg19-curvature-flux"></a>

<!-- formal-statement-start -->
> **定理（Dirac monopoleの曲率と第一Chern数）**  
> 外向きに向き付けられた $S^2$ 上の主束 $P_n$（$n\in\mathbb Z$）に、定義した南北接続を入れる。この接続から得られる曲率は

$$
F=-\frac{in}{2}\sin\vartheta\,d\vartheta\wedge d\varphi
$$

> で、正規化された積分は

$$
\frac{i}{2\pi}\int_{S^2}F=n
$$

> となる。
<!-- formal-statement-end -->

**証明の見取り図**。北側と南側でそれぞれ外微分すると同じ曲率が出る。積分では $\vartheta$ と $\varphi$ の範囲および球面の向きを明示し、$i^2=-1$ の符号を追う。

<!-- proof-start -->
### 証明

[曲率の局所構造方程式](../GBG10/index.md#thm-gbg10-local-formula)で $U(1)$ の括弧項が零となることを使う。$U_N$ の極以外では $d(d\varphi)=0$、$d(1-\cos\vartheta)=\sin\vartheta\,d\vartheta$ より
$$
F_N=dA_N=-\frac{in}{2}\sin\vartheta\,d\vartheta\wedge d\varphi.
$$
同じように $d(1+\cos\vartheta)=-\sin\vartheta\,d\vartheta$ なので
$$
F_S=dA_S=\frac{in}{2}(-\sin\vartheta)\,d\vartheta\wedge d\varphi=F_N.
$$
両形式は極まで滑らかだから、一致は球面全体に延長される。外向きの標準球面の向きに関して
$$
\int_{S^2}\sin\vartheta\,d\vartheta\wedge d\varphi
=\int_0^{2\pi}d\varphi\int_0^\pi\sin\vartheta\,d\vartheta
=2\pi[-\cos\vartheta]_0^\pi=4\pi.
$$
よって
$$
\frac{i}{2\pi}\int_{S^2}F
=\frac{i}{2\pi}\left(-\frac{in}{2}\right)4\pi
=\frac{n}{4\pi}4\pi=n.
$$
<!-- proof-end -->

$n=-2$ なら $F=+i\sin\vartheta\,d\vartheta\wedge d\varphi$、積分は $4\pi i$ で $c_1=-2$。赤道の遷移関数の回転方向と曲率の複素係数を別々に数えると符号を間違えやすい。

## 3. どの接続でもなぜ整数になるか

ここまでは特定の接続を計算した。しかし量子化の原因がこの式の見た目だけにあるなら、別の接続で整数以外が出るかもしれない。実際には**南北の貼り合わせが一価な $U(1)$ 写像である**ことが整数性の本質である。

赤道 $E$ は $\varphi$ 増加方向に向き付ける。北半球 $D_N$ の境界は $+E$、南半球 $D_S$ の境界は $-E$ になる。両半球の閉領域は各パッチに含まれ、そこで局所ポテンシャルは滑らかである。

<a id="thm-gbg19-general-integrality"></a>

<!-- formal-statement-start -->
> **定理（任意のU(1)接続の磁束の整数性）**  
> 標準的に向き付けられた $S^2$ 上の滑らかな主 $U(1)$ 束 $P$ と、滑らかな接続 $\omega$ を取る。南北の滑らかな局所sectionを $s_N,s_S$ とし、$s_S=s_Ng_{NS}$、$g_{NS}:U_N\cap U_S\to U(1)$ とする。曲率を $F$ とすると

$$
\frac{i}{2\pi}\int_{S^2}F
=\operatorname{wind}(g_{NS}|_E)\in\mathbb Z
$$

> が成立する。
<!-- formal-statement-end -->

**証明の見取り図**。[一般 Stokes の定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)を二つの半球に適用すると、面積分は赤道上のポテンシャルの差になる。その差が遷移関数の対数微分で、赤道の一周積分は巻き数である。

<!-- proof-start -->
### 証明

$U(1)$ が可換なため $F|_{U_i}=dA_i$。閉北半球と閉南半球に[一般 Stokes の定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)を適用する。境界の向きに注意すると
$$
\begin{aligned}
\int_{S^2}F
&=\int_{D_N}dA_N+\int_{D_S}dA_S\\
&=\int_EA_N-\int_EA_S
=-\int_E(A_S-A_N).
\end{aligned}
$$
[局所ゲージポテンシャルの変換則](../GBG8/index.md#thm-gbg8-local-transform)で可換群の随伴作用は自明だから
$$
A_S-A_N=g_{NS}^{-1}dg_{NS}.
$$
$E$ を $\varphi\in[0,2\pi]$ で一周し、[位相持ち上げ](../GBG18/index.md#def-gbg18-winding)を $g_{NS}(e^{i\varphi})=e^{i\psi(\varphi)}$ と取る。$\psi$ は区間上の実数値関数で滑らかに選べる。実際、前講で構成した連続な持ち上げは、滑らかな $g_{NS}$ の局所的な滑らかな偏角と $2\pi$ の整数倍しか違わないため、局所的にも滑らかである。端点差は $\psi(2\pi)-\psi(0)=2\pi m$（$m\in\mathbb Z$）である。$\varphi$ に関する微分を取り、$d(e^{i\psi})=ie^{i\psi}d\psi$ を用いると
$$
g_{NS}^{-1}dg_{NS}=i\,d\psi,\qquad
\int_Eg_{NS}^{-1}dg_{NS}=i(\psi(2\pi)-\psi(0))=2\pi i m.
$$
従って
$$
\frac{i}{2\pi}\int_{S^2}F
=\frac{i}{2\pi}(-2\pi i m)=m
=\operatorname{wind}(g_{NS}|_E).
$$
局所位相の枝を変えても巻き数は変わらないため、結論は選択に依存しない。
<!-- proof-end -->

この証明にはChern–Weil理論の一般定理も整数係数コホモロジーも使っていない。$S^2$ と $U(1)$ に特化することで、巻き数と[一般 Stokes の定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)だけで整数性を証明した。

<a id="prop-gbg19-connection-invariance"></a>

<!-- formal-statement-start -->
> **命題（局所sectionと接続変更に対する磁束不変性）**  
> 向き付けられた $S^2$ 上の同じ主 $U(1)$ 束 $P$ に対し、局所sectionを滑らかに取り替えても、また滑らかな接続 $\omega$ を別の接続 $\omega'$ に取り替えても、$c_1[P,F]$ は変わらない。
<!-- formal-statement-end -->

**証明の見取り図**。section変更では $F$ 自体が変化しない。接続変更では局所形式の差が球面全体の1形式になり、曲率の差はその外微分となる。

<!-- proof-start -->
### 証明

まず $s_i'=s_ih_i$ とする。$h_i:U_i\to U(1)$ は滑らかであり、[section変更の変換則](../GBG8/index.md#thm-gbg8-local-transform)から
$$
A_i'=A_i+h_i^{-1}dh_i.
$$
可換群では $d(h_i^{-1}dh_i)=0$（局所的に $h_i=e^{i\chi_i}$ と書けば $h_i^{-1}dh_i=i\,d\chi_i$）なので $dA_i'=dA_i=F|_{U_i}$。従って $F$ の積分は変わらない。

次に同じ局所sectionに関する二接続の表示を $A_i,\widetilde A_i$ とする。重なりで両者の変換則は同じ $g_{NS}^{-1}dg_{NS}$ を含むので
$$
\widetilde A_S-A_S=\widetilde A_N-A_N.
$$
従って $\alpha_i=\widetilde A_i-A_i$ は重なりで一致し、滑らかな大域1形式 $\alpha\in\Omega^1(S^2;i\mathbb R)$ に貼り合う。曲率差は
$$
\widetilde F-F=d(\widetilde A_i-A_i)=d\alpha.
$$
境界のない球面に[一般 Stokes の定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)を適用すると $\int_{S^2}d\alpha=0$。したがって正規化積分は同じである。
<!-- proof-end -->

特に $P_n$ 上ではどの接続を選んでも $c_1=n$ である。$n\ne0$ なら曲率が全域で零の接続は存在できない（零曲率なら積分が零になる）。さらに[巻き数による球面主束の非自明性](../GBG18/index.md#thm-gbg18-obstruction)から大域sectionも存在しない。**曲率が必ずどこかで非零**という主張と、**主束が非自明**という主張は別の論証である。

## 4. 物理的な磁束と電荷をどの単位で読むか

数式の整数 $n$ と物理的電荷は同一の量ではない。[EMAG1の電荷](../../../物理系/EMAG/EMAG1/index.md)と[EMAG7の磁束](../../../物理系/EMAG/EMAG7/index.md#def-emag7-magnetic-flux)はこの幾何の物理的な応用であり、以下の計算自体には Maxwell 方程式を必要としない。基準とする非零の電気結合定数 $q_0$ と正の定数 $\hbar$ を選び、磁場ポテンシャルの実数値1形式を $a_i$ とする。接続を
$$
A_i=-\frac{iq_0}{\hbar}a_i
$$
と約束すると、その曲率は
$$
F=-\frac{iq_0}{\hbar}b,\qquad b=da_i
$$
となる。$b$ は重なりで一致する実数値の磁場2形式である。$\Phi=\int_{S^2}b$ を磁束と定める。

例えば本講の $P_n$ では
$$
a_N=\frac{\hbar n}{2q_0}(1-\cos\vartheta)d\varphi,\quad
a_S=-\frac{\hbar n}{2q_0}(1+\cos\vartheta)d\varphi
$$
である。これらは各極で滑らかで、$a_S-a_N=-\hbar n\,d\varphi/q_0$。$b=(\hbar n/(2q_0))\sin\vartheta\,d\vartheta\wedge d\varphi$ だから $\Phi=2\pi\hbar n/q_0$ となる。

荷電場を扱う際には、[滑らかな左線形表現](../GBG4/index.md#def-gbg4-representation) $\rho_k:U(1)\to GL_{\mathbb C}(\mathbb C)$ を使う。$t$ は $2\pi$ を法とする群の角度、$k$ はその**整数重み**であり、$\rho_k(e^{it})v=e^{ikt}v$ とする。場の局所成分 $v_i$ は、[結合束の局所成分変換則](../GBG4/index.md#thm-gbg4-component-transformation)に従う。さらに[共変微分の局所公式](../GBG9/index.md#thm-gbg9-local-formula)は $D_i v_i=dv_i+(\rho_k)_*(A_i)v_i$ であり、$(\rho_k)_*$ は群の角度に沿った微分から得る無限小表現を表す。

<a id="thm-gbg19-dirac-quantization"></a>

<!-- formal-statement-start -->
> **定理（基準電荷に対するDirac量子化条件）**  
> 向き付けられた $S^2$ 上の滑らかな主 $U(1)$ 束 $P$ と滑らかな接続を取る。$q_0\ne0$、$\hbar>0$ を固定し、局所の実数値磁場ポテンシャル $a_i$ が $A_i=-iq_0a_i/\hbar$ を満たすとする。磁場2形式 $b=da_i$ の磁束 $\Phi=\int_{S^2}b$ は

$$
\frac{q_0\Phi}{2\pi\hbar}\in\mathbb Z
$$

> を満たす。さらに $U(1)$ の重み $k\in\mathbb Z$ の表現 $\rho_k(e^{it})=e^{ikt}$ による荷電場は物理的結合 $q=kq_0$ を持ち、その局所成分は $v_S=g_{NS}^{-k}v_N$ で貼り合わされる。
<!-- formal-statement-end -->

**証明の見取り図**。前節の整数性に $F=-iq_0b/\hbar$ を代入する。荷電場の重みが整数でなければ、位相 $t$ と $t+2\pi$ が同一の群元を表すことと両立しない。

<!-- proof-start -->
### 証明

曲率の定義から
$$
c_1[P,F]=\frac{i}{2\pi}\int_{S^2}\left(-\frac{iq_0}{\hbar}b\right)
=\frac{q_0}{2\pi\hbar}\int_{S^2}b
=\frac{q_0\Phi}{2\pi\hbar}.
$$
[任意のU(1)接続の磁束の整数性](#thm-gbg19-general-integrality)により左辺は整数である。

表現 $\rho_k$ が群 $U(1)$ 上で一価になるには、$e^{it}=e^{i(t+2\pi)}$ に対して
$$
e^{ikt}=e^{ik(t+2\pi)}
\quad\Longleftrightarrow\quad e^{2\pi i k}=1
\quad\Longleftrightarrow\quad k\in\mathbb Z
$$
が必要十分である。微分する変数を $t\in\mathbb R$ として群の単位元 $t=0$ で微分すれば、任意の実数 $\lambda$ について
$$
(\rho_k)_*(i\lambda)
=\left.\frac{d}{dt}\right|_{t=0}\rho_k(e^{it\lambda})
=\left.\frac{d}{dt}\right|_{t=0}e^{ikt\lambda}
=ik\lambda.
$$
したがって $(\rho_k)_*(A_i)=kA_i=-i(kq_0/\hbar)a_i$ であり、[共変微分の局所公式](../GBG9/index.md#thm-gbg9-local-formula)は $D_i=d-iqa_i/\hbar$（$q=kq_0$）となる。ここで $d$ は基底多様体上の変数に関する外微分であって、無限小表現を求めた補助変数 $t$ の微分とは異なる。[結合束の局所成分変換則](../GBG4/index.md#thm-gbg4-component-transformation)により $v_S=g_{NS}^{-k}v_N$ であり、遷移関数と共変微分は整合する。
<!-- proof-end -->

球面が空間の原点を囲むと見て磁場を $B=g_m\,\mathbf r/|\mathbf r|^3$（計量・単位系をこの表示に固定）と書けば、球面上で磁場2形式は $b=(B\cdot\mathbf n)\,dS$（$\mathbf n$ は外向き単位法線、$dS$ は面積形式）と対応する。半径 $r$ の球面で $B\cdot\mathbf n=g_m/r^2$、面積が $4\pi r^2$ だから磁束は $\Phi=4\pi g_m$。したがって $q_0g_m=n\hbar/2$ となる。SI単位などで磁場の係数を別の規約にする場合は $g_m$ の数値的定義も変わる。普遍的なのは無次元量 $q_0\Phi/(2\pi\hbar)\in\mathbb Z$ という条件である。

**仮定が働く場所**。ここでの量子化は、球面を覆う滑らかな $U(1)$ 主束と、そこから作る一価な荷電場の接続が存在するという条件から出ている。単に原点を除いた空間で任意の閉2形式 $b$ を書いただけでは、その実数磁束が整数になるとは限らない。例えば $b=c\sin\vartheta\,d\vartheta\wedge d\varphi$ は任意の実数 $c$ について滑らかな2形式だが、$q_0(4\pi c)/(2\pi\hbar)\notin\mathbb Z$ なら、この固定した基準電荷 $q_0$ に対する滑らかな $U(1)$ 接続から得られる曲率としては実現できない。破綻するのは磁場2形式の滑らかさではなく、**局所ポテンシャルの差を一価な遷移関数として積分できる**という条件である。

## 5. 演習と詳細解答

### Level A：局所形式・曲率・向きの基本操作

<a id="ex-gbg19-a01"></a>
#### GBG19-A01 北極で本当に滑らかか
- Level: A

$n=1$ の北側ポテンシャルを $(X,Y,Z)$ で書き、北極で分母が零にならないことを確認せよ。南側の形式が南極で滑らかな理由も述べよ。

<!-- solution-start -->
**詳細解答**。$X^2+Y^2=1-Z^2$、$X\,dY-Y\,dX=(X^2+Y^2)d\varphi$ だから
$$
A_N=-\frac{i}{2}\frac{X\,dY-Y\,dX}{1+Z}.
$$
北極では $Z=1$ で分母は $2$、その近傍でも $1+Z>0$。$X,Y,Z$ は球面上の滑らかな関数なので分子も滑らかな1形式である。従って北極へ延長できる。南側では
$$
A_S=\frac{i}{2}\frac{X\,dY-Y\,dX}{1-Z}
$$
であり、南極の $Z=-1$ では分母が $2$ だから同じ理由で滑らかである。どちらも反対側の極は定義域に含まない。
<!-- solution-end -->

<a id="ex-gbg19-a02"></a>
#### GBG19-A02 遷移関数の符号
- Level: A

$n=-3$ とする。$A_S-A_N$ と $g_{NS}^{-1}dg_{NS}$ を別々に求め、$s_S=s_Ng_{NS}$ の規約と照合せよ。

<!-- solution-start -->
**詳細解答**。定義に $n=-3$ を代入して
$$
A_N=\frac{3i}{2}(1-\cos\vartheta)d\varphi,\quad
A_S=-\frac{3i}{2}(1+\cos\vartheta)d\varphi.
$$
差は
$$
A_S-A_N=-\frac{3i}{2}\bigl(2\bigr)d\varphi=-3i\,d\varphi.
$$
一方、$g_{NS}=e^{-3i\varphi}$ だから $dg_{NS}=-3ie^{-3i\varphi}d\varphi$、
$$
g_{NS}^{-1}dg_{NS}=e^{3i\varphi}(-3ie^{-3i\varphi}d\varphi)=-3i\,d\varphi.
$$
一致するので[局所接続変換則](../GBG8/index.md#thm-gbg8-local-transform)に適合する。
<!-- solution-end -->

<a id="ex-gbg19-a03"></a>
#### GBG19-A03 曲率の複素係数
- Level: A

$n=-2$ の $F_N,F_S$ および $c_1[P_n,F]$ を求めよ。向きは外向きの標準球面とする。

<!-- solution-start -->
**詳細解答**。$A_N=i(1-\cos\vartheta)d\varphi$ より
$$
F_N=dA_N=i\sin\vartheta\,d\vartheta\wedge d\varphi.
$$
$A_S=-i(1+\cos\vartheta)d\varphi$ より
$$
F_S=dA_S=-i(-\sin\vartheta)d\vartheta\wedge d\varphi=F_N.
$$
$\int_{S^2}\sin\vartheta\,d\vartheta\wedge d\varphi=4\pi$ なので
$$
c_1=\frac{i}{2\pi}(4\pi i)=-2.
$$
$i^2=-1$ により負となる。
<!-- solution-end -->

<a id="ex-gbg19-a04"></a>
#### GBG19-A04 赤道で二つの境界を足す
- Level: A

$g_{NS}|_E=e^{4i\varphi}$ とし、$A_S-A_N=g_{NS}^{-1}dg_{NS}$ を満たす局所接続があるとする。二半球への[一般 Stokes の定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)で $c_1$ を求めよ。

<!-- solution-start -->
**詳細解答**。北半球の誘導境界は $\partial D_N=E$、南半球では $\partial D_S=-E$。従って
$$
\int_{S^2}F=\int_E(A_N-A_S)=-\int_Eg_{NS}^{-1}dg_{NS}.
$$
$g_{NS}^{-1}dg_{NS}=4i\,d\varphi$ だから
$$
\int_{S^2}F=-4i\int_0^{2\pi}d\varphi=-8\pi i,\qquad
c_1=\frac{i}{2\pi}(-8\pi i)=4.
$$
境界の向きを逆にすると符号も逆になる。
<!-- solution-end -->

### Level B：接続変更・荷電場・非自明性

<a id="ex-gbg19-b01"></a>
#### GBG19-B01 接続を変えても整数は動かない
- Level: B

$P_2$ 上の局所接続 $A_i$ を $A_i'=A_i+i\lambda\,dZ$（$\lambda\in\mathbb R$）に置き換える。この形式が同じ束の接続を定める理由、曲率と $c_1$ を計算せよ。

<!-- solution-start -->
**詳細解答**。$Z$ は球面全体の滑らかな関数なので $\alpha=i\lambda\,dZ$ は大域 $i\mathbb R$ 値1形式であり、$A_S'-A_N'=A_S-A_N=g_{NS}^{-1}dg_{NS}$ を満たす。よって[局所ポテンシャルからの大域接続の再構成](../GBG8/index.md#thm-gbg8-local-reconstruction)から同じ $P_2$ の接続になる。曲率は
$$
F'=dA_i'=dA_i+i\lambda d^2Z=F
=-i\sin\vartheta\,d\vartheta\wedge d\varphi.
$$
従って $c_1=(i/(2\pi))(-4\pi i)=2$。加えた項は曲率が変わらない特別な接続変更例である。一般の大域 $\alpha$ では $F'=F+d\alpha$ だが、球面上の積分はやはり不変である。
<!-- solution-end -->

<a id="ex-gbg19-b02"></a>
#### GBG19-B02 表現の整数重みと共変微分
- Level: B

$P_3$ と基準電荷 $q_0\ne0$ に対し、重み $k=-2$ の場を考える。赤道の局所成分変換、物理的電荷 $q$、量 $q\Phi/(2\pi\hbar)$ と共変微分 $D_i$ を求め、変換則の整合を微分で検算せよ。

<!-- solution-start -->
**詳細解答**。$g_{NS}=e^{3i\varphi}$、$k=-2$ だから、[結合線束の局所成分](../GBG4/index.md#thm-gbg4-component-transformation)は
$$
v_S=g_{NS}^{-k}v_N=e^{6i\varphi}v_N,\qquad q=kq_0=-2q_0.
$$
$\Phi=2\pi\hbar\cdot3/q_0$ なので $q\Phi/(2\pi\hbar)=-6$。共変微分は
$$
D_i=d+kA_i=d-\frac{iq}{\hbar}a_i.
$$
$A_S=A_N+3i\,d\varphi$ であり
$$
\begin{aligned}
D_Sv_S
&=d(e^{6i\varphi}v_N)-2(A_N+3i\,d\varphi)e^{6i\varphi}v_N\\
&=e^{6i\varphi}(dv_N+6i\,d\varphi\,v_N-2A_Nv_N-6i\,d\varphi\,v_N)\\
&=e^{6i\varphi}D_Nv_N.
\end{aligned}
$$
よって局所共変微分も同じ貼り合わせ規則を満たす。
<!-- solution-end -->

<a id="ex-gbg19-b03"></a>
#### GBG19-B03 非自明束に平坦接続はあるか
- Level: B

$P_n\to S^2$ に曲率 $F=0$ の滑らかな接続があるなら $n=0$ を示せ。さらに $S^1$ の自明主 $U(1)$ 束上で曲率零・非自明holonomyが両立する理由を説明せよ。

<!-- solution-start -->
**詳細解答**。[任意のU(1)接続の磁束の整数性](#thm-gbg19-general-integrality)と[前講の巻き数](../GBG18/index.md#def-gbg18-winding)から
$$
n=\frac{i}{2\pi}\int_{S^2}F.
$$
$F=0$ なら右辺は零なので $n=0$ が必要である。逆に $n=0$ の積束には $A=0$ の平坦接続がある。前講の[巻き数による球面主束の非自明性](../GBG18/index.md#thm-gbg18-obstruction)から、$n\ne0$ で非自明な束に平坦接続は持てない。

一方 $S^1$ は2次元微分形式が零である。$t$ を $2\pi$ を法とする円周の角度とすると、各角度座標の $dt$ は重なりで一致して大域1形式になる。そこで積束の接続 $A=i\alpha\,dt$（$\alpha\in\mathbb R$）は $F=dA=0$ である。しかし[平坦接続とholonomyの具体例](../GBG16/index.md#prop-gbg16-circle-holonomy)のとおり、一周の水平移動は $e^{-2\pi i\alpha}$ となり、$\alpha\notin\mathbb Z$ なら非自明である。曲率の消失だけからholonomyが自明と結論するのは、単連結性に関する条件を落としている。
<!-- solution-end -->

<a id="ex-gbg19-b04"></a>
#### GBG19-B04 section変更と局所角度
- Level: B

$P_1$ の局所sectionを $s_N'=s_Ne^{i\lambda Z}$、$s_S'=s_Se^{-i\lambda Z}$（$\lambda\in\mathbb R$）で変える。新しい $A_i'$ と $g_{NS}'$ を求め、曲率・巻き数の不変性を示せ。

<!-- solution-start -->
**詳細解答**。[局所section変更](../GBG3/index.md#thm-gbg3-transition-change)により
$$
g_{NS}'=e^{-i\lambda Z}e^{i\varphi}e^{-i\lambda Z}
=e^{i\varphi-2i\lambda Z}.
$$
[局所接続変換則](../GBG8/index.md#thm-gbg8-local-transform)から
$$
A_N'=A_N+i\lambda\,dZ,\qquad A_S'=A_S-i\lambda\,dZ.
$$
$A_S'-A_N'=i\,d\varphi-2i\lambda dZ=(g_{NS}')^{-1}dg_{NS}'$ で整合する。$d^2Z=0$ より $F'=F$。赤道では $Z=0$ だから $g_{NS}'|_E=e^{i\varphi}$ となり巻き数は $1$ で不変である。この例では赤道の位相関数まで同じだが、一般のsection変更でも両半球へ延長できる $h_i$ の巻き数は零なので巻き数は変わらない。
<!-- solution-end -->

### Level C：ポテンシャルから量子化条件を逆算する

<a id="ex-gbg19-c01"></a>
#### GBG19-C01 南北形式から束と電荷を復元する
- Level: C

外向きに向き付けられた $S^2$ で、南北局所形式が
$$
A_N=-ic(1-\cos\vartheta)d\varphi,\qquad
A_S=id(1+\cos\vartheta)d\varphi
$$
（$c,d\in\mathbb R$）と与えられている。$s_S=s_Ng_{NS}$ の規約で以下を示せ。

1. 両形式がそれぞれの極で滑らかなこと。
2. 両形式が一つの接続を表すための必要条件。
3. 赤道に沿って一価な遷移関数を持つための必要十分条件。
4. 第一Chern数と束の非自明性。
5. $A_i=-iq_0a_i/\hbar$ で実磁場ポテンシャル $a_i$ を定めたとき、基準電荷 $q_0\ne0$ に対する磁束量子化。

遷移関数の定数位相差は任意に選んでよい。

<!-- solution-start -->
**詳細解答**。

**(1) 極の正則性。** 前節のCartesian座標変換により
$$
A_N=-ic\,\frac{X\,dY-Y\,dX}{1+Z},\qquad
A_S=id\,\frac{X\,dY-Y\,dX}{1-Z}.
$$
前者は $U_N$、後者は $U_S$ で分母が非零なので滑らかである。

**(2) 曲率の一致。** 可換群では局所曲率は外微分であるから
$$
F_N=-ic\sin\vartheta\,d\vartheta\wedge d\varphi,\qquad
F_S=-id\sin\vartheta\,d\vartheta\wedge d\varphi.
$$
同じ大域曲率を表すには $F_N=F_S$ が必要であり、重なりで $\sin\vartheta>0$ だから $c=d$。この条件は後の接続変換則の検算から十分性も従う。

**(3) 一価性と整数性。** $c=d$ のもとで
$$
A_S-A_N=2ic\,d\varphi.
$$
局所遷移関数は $g^{-1}dg=2ic\,d\varphi$ を満たす必要がある。角度 $\varphi$ に沿ってこの等式を評価すると $g'(\varphi)=2ic\,g(\varphi)$ である。区間 $[0,2\pi]$ で $\frac{d}{d\varphi}(e^{-2ic\varphi}g(\varphi))=0$ だから、$g(\varphi)=e^{i(2c\varphi+\beta)}$（$\beta$ は定数）となる。$g(0)=g(2\pi)$ の必要十分条件は
$$
e^{4\pi ic}=1
\quad\Longleftrightarrow\quad 2c\in\mathbb Z.
$$
$n=2c$ と置けば $g=e^{in\varphi}$ と選べ、$A_S-A_N=g^{-1}dg$ が成り立つ。[大域接続の再構成定理](../GBG8/index.md#thm-gbg8-local-reconstruction)で十分性が確認できる。$c\ne d$ のまま一価な $g$ を選んでも、曲率が一致せず同じ接続は構成できない。

**(4) 数と束。** $c=d=n/2$ なので
$$
\int_{S^2}F=-ic\,4\pi=-4\pi ic,\qquad
c_1=\frac{i}{2\pi}(-4\pi ic)=2c=n.
$$
[非零巻き数による非自明性](../GBG18/index.md#thm-gbg18-obstruction)から $n\ne0$ では大域sectionはない。$n=0$ なら二形式は零で束は積束となる。

**(5) 物理的磁束。** $F=-iq_0b/\hbar$ なので
$$
\Phi=\int_{S^2}b
=\frac{i\hbar}{q_0}\int_{S^2}F
=\frac{i\hbar}{q_0}(-2\pi in)
=\frac{2\pi\hbar n}{q_0}.
$$
したがって $q_0\Phi/(2\pi\hbar)=n\in\mathbb Z$。例えば $c=1/3$ なら局所形式は各極で滑らかで曲率も一致するが、$2c=2/3$ は整数でない。壊れるのは重なりの $e^{2ic\varphi}$ の一価性であり、指定した $U(1)$ 主束の接続としては貼り合わない。
<!-- solution-end -->

---

## 6. 次講へ

赤道の巻き数という整数は、局所接続から得られる曲率を球面全体で積分した値でもある。今回は可換群 $U(1)$ と二次元球面に限ったので、[一般 Stokes の定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)から整数性まで直接導けた。次の **GBG20** では、非可換群でも曲率から大域的な微分形式を作れるよう、随伴作用に不変な多項式を調べる。
