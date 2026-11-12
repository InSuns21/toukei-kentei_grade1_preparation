# AQFT9 GNSから局所von Neumann環へ

[AQFT6で作った局所Weyl C*net](../AQFT6/index.md#def-aqft6-local-weyl-net)は、有限個の観測量の和・積・随伴と**ノルム極限**を含みます。[AQFT8のMinkowski真空](../AQFT8/index.md#prop-aqft8-gns-fock)を選べば、その観測量をFock空間上の有界作用素として表すこともできます。しかし作用素の列が**各ベクトルに作用した結果**だけ収束するとき、その極限は元のC*環に入るとは限りません。

局所観測量の強作用素・弱作用素極限も扱いたい。そこで、状態から得たGNS表現を先に固定し、その**像の二重可換子**を取ります。本講の問いは「何を閉包すると局所性が残り、状態はどの意味で連続になり、状態を替えると何が変わるのか」です。

使用する既習結果は、[OA5のGNS構成](../../OA/OA5/index.md#thm-oa5-gns)、[VN2の二重可換子定理](../../VN/VN2/index.md#thm-vn2-bicommutant)、[VN5の正規状態](../../VN/VN5/index.md#def-vn5-normal-state)です。計量は $(-,+,+,+)$ とし、時空領域の空間的分離は[AQFT1の定義](../AQFT1/index.md#def-aqft1-separated-regions)に従います。この段階ではReeh–Schlieder性、Haag双対性、局所von Neumann環のType III性は仮定も証明もしません。

## 1. 一つの状態を選んでから弱閉包を取る

[AQFT2のquasilocal C*環](../AQFT2/index.md#prop-aqft2-quasilocal)を $\mathfrak A$ とし、各領域 $O$ に単位元を共有するC*部分環 $\mathfrak A(O)\subset\mathfrak A$ が割り当てられているとします。$\omega$ は $\mathfrak A$ 上の状態、すなわち $\omega(A^*A)\ge0$、$\omega(1)=1$ を満たす複素線形汎関数です。

[OA5のGNS定理](../../OA/OA5/index.md#thm-oa5-gns)をこの $\mathfrak A,\omega$ に適用すると、Hilbert空間 $\mathcal H_\omega$、単位的 $*$-表現 $\pi_\omega:\mathfrak A\to B(\mathcal H_\omega)$、単位巡回ベクトル $\Omega_\omega$ があり、

$$
\omega(A)=\langle\Omega_\omega,\pi_\omega(A)\Omega_\omega\rangle,
\qquad
\overline{\pi_\omega(\mathfrak A)\Omega_\omega}=\mathcal H_\omega
$$

となります。内積は第2変数線形とします。**この巡回性は全域 $\mathfrak A$ に対するもの**です。

続いて[VN2の可換子](../../VN/VN2/index.md#def-vn2-commutant)を使います。有界作用素の集合 $S\subset B(\mathcal H_\omega)$ を取ります。$S'$ は $S$ のすべての元と可換な有界作用素の集合です。さらに、その可換子を取って得る二重可換子は

$$
S''=(S')'
$$

です。単位元を含み随伴で閉じた代数に対しては、[von Neumannの二重可換子定理](../../VN/VN2/index.md#thm-vn2-bicommutant)により、この $S''$ が強作用素位相（SOT）と弱作用素位相（WOT）の閉包に一致します。

これらの位相のうち、[VN1の強作用素位相（SOT）](../../VN/VN1/index.md#def-vn1-sot)では、作用素の族 $T_\alpha$ が $T$ に収束するとは、各 $\eta\in\mathcal H_\omega$ に作用させたベクトルがノルム収束することです。

$$
\|(T_\alpha-T)\eta\|\longrightarrow0
\qquad(\eta\in\mathcal H_\omega)
$$

一方、[VN1の弱作用素位相（WOT）](../../VN/VN1/index.md#def-vn1-wot)での収束は、すべてのベクトル対に対して行列係数が収束することです。すなわち、

$$
\langle\xi,T_\alpha\eta\rangle\longrightarrow
\langle\xi,T\eta\rangle\qquad
(\xi,\eta\in\mathcal H_\omega)
$$

が成り立ちます。

<a id="def-aqft9-local-vn-net"></a>

<!-- formal-statement-start -->
> **定義（状態に伴う局所von Neumann net）**  
> $\mathfrak A$ を単位的quasilocal C*環、$O\mapsto\mathfrak A(O)$ を単位元を共有する局所C*net、$\omega$ を $\mathfrak A$ 上の状態とし、$(\pi_\omega,\mathcal H_\omega,\Omega_\omega)$ をそのGNS三つ組とする。各領域 $O$ の**局所von Neumann環**および全域の環を
$$
\mathcal M_\omega(O):=\pi_\omega(\mathfrak A(O))''
\subset B(\mathcal H_\omega),
\qquad
\mathcal M_\omega:=\pi_\omega(\mathfrak A)''
$$
> と定義する。二重可換子はどちらも同じ $B(\mathcal H_\omega)$ の中で取る。
<!-- formal-statement-end -->

定義の $''$ は「二度随伴を取る」のではなく、「可換子を二度取る」の意味です。$O$ ごとに異なるHilbert空間へ表現してから可換子を取るわけでもありません。

<!-- definition-example-start: def-aqft9-local-vn-net -->
### 直接例：二点可換環の局所閉包

**定義の確認**。元のC*netの包含と局所性、選んだ状態のGNS表現、像の二重可換子を順に計算し、同じHilbert空間上の局所von Neumann環が確かに得られることを確認します。

$\mathfrak A=\mathbb C^2$、任意の非空領域で $\mathfrak A(O)=\mathbb C^2$ とします。積と随伴は成分ごとに定めます。この割当ては包含に対して単調で、異なる領域間の観測量もすべて可換です。

状態 $\omega_{\rm av}(a,b)=(a+b)/2$ を選ぶと、GNS商の零空間は $\{0\}$ です。実際、

$$
\omega_{\rm av}((a,b)^*(a,b))
=\frac{|a|^2+|b|^2}{2}=0
\quad\Longleftrightarrow\quad a=b=0.
$$

なぜここで対角行列を使えるのでしょうか。[OA5のGNS商内積](../../OA/OA5/index.md#prop-oa5-quotient-inner-product)をこの状態へ適用すると、零空間がないため商の元を $[(c,d)]$ と書けて、

$$
\langle[(a,b)],[(c,d)]\rangle_{\rm av}
=\frac{\overline a c+\overline b d}{2}.
$$

従って $e_1=\sqrt2[(1,0)]$、$e_2=\sqrt2[(0,1)]$ は正規直交基底です。[GNSの左乗法表現](../../OA/OA5/index.md#prop-oa5-left-multiplication-bounded)は

$$
\pi_{\rm av}(a,b)[(c,d)]=[(ac,bd)]
$$

なので、この**基底での**行列が $\operatorname{diag}(a,b)$ となります。さらにGNS巡回ベクトルは単位元の類 $[(1,1)]$ だから、基底座標では

$$
\mathcal H_{\rm av}\simeq\mathbb C^2,\qquad
\pi_{\rm av}(a,b)=\operatorname{diag}(a,b),\qquad
\Omega_{\rm av}=\frac{1}{\sqrt2}(1,1).
$$

内積による状態の再現と巡回性は

$$
\langle\Omega_{\rm av},\pi_{\rm av}(a,b)\Omega_{\rm av}\rangle
=\frac{a+b}{2},
\qquad
\pi_{\rm av}(\mathbb C^2)\Omega_{\rm av}=\mathbb C^2
$$

から確かめられます。対角行列全体 $D$ と可換な $2\times2$ 行列 $T=(t_{ij})$ は、$P=\operatorname{diag}(1,0)$ と可換であるため $t_{12}=t_{21}=0$。よって $D'=D$、$D''=D$ となり、

$$
\mathcal M_{\rm av}(O)=D.
$$

C*環の像と局所von Neumann環が**有限次元では一致する**ことまで確認できました。
<!-- definition-example-end -->

## 2. 局所性と包含は弱閉包しても失われない

[AQFT2の包含単調性とEinstein局所性](../AQFT2/index.md#def-aqft2-locality)を仮定します。元の観測量は離れた領域で可換ですが、その極限を許すと可換性が壊れないでしょうか。鍵は**可換子自体がWOTで閉じている**ことです。

<a id="thm-aqft9-isotony-locality"></a>

<!-- formal-statement-start -->
> **定理（局所von Neumann netの包含単調性と局所性）**  
> 単位的局所C*net $O\mapsto\mathfrak A(O)\subset\mathfrak A$ が包含単調性とEinstein局所性を満たすとする。任意の状態 $\omega$ のGNS表現について次が成り立つ。
>
> **（1）** $O_1\subset O_2$ なら $\mathcal M_\omega(O_1)\subset\mathcal M_\omega(O_2)\subset\mathcal M_\omega$。
>
> **（2）** $O_1$ と $O_2$ が空間的に分離していれば
$$
[\mathcal M_\omega(O_1),\mathcal M_\omega(O_2)]=\{0\},
\qquad
\mathcal M_\omega(O_1)\subset\mathcal M_\omega(O_2)'.
$$
> ここで可換性の式は、任意の $X\in\mathcal M_\omega(O_1)$、$Y\in\mathcal M_\omega(O_2)$ に対し $XY=YX$ という意味である。
<!-- formal-statement-end -->

### 証明の見取り図

包含は二重可換子の順序保存性を追います。局所性では、一方の局所代数の像が他方の**可換子**へ入ることを先に示し、[可換子のWOT閉性](../../VN/VN2/index.md#prop-vn2-commutant-wot-closed)を使って二度にわたり極限へ拡張します。

<!-- proof-start -->
### 証明

**（1）** $O_1\subset O_2$ とします。元のnetの包含単調性から

$$
\mathfrak A(O_1)\subset\mathfrak A(O_2)\subset\mathfrak A.
$$

$\pi_\omega$ を写せば同じ包含が像で成立します。$S\subset T$ なら、$T$ のすべてと可換な作用素は $S$ のすべてとも可換なので $T'\subset S'$、もう一度可換子を取ると $S''\subset T''$ です。[可換子の順序則](../../VN/VN2/index.md#prop-vn2-commutant-order)を各像に適用して結論します。

**（2）** 空間的に分離した $O_1,O_2$ を取ります。[Einstein局所性](../AQFT2/index.md#def-aqft2-locality)により、$A\in\mathfrak A(O_1)$、$B\in\mathfrak A(O_2)$ について $AB=BA$。表現は積を保つため

$$
\pi_\omega(A)\pi_\omega(B)
=\pi_\omega(AB)=\pi_\omega(BA)
=\pi_\omega(B)\pi_\omega(A).
$$

$S=\pi_\omega(\mathfrak A(O_1))$、$T=\pi_\omega(\mathfrak A(O_2))$ と書くと $S\subset T'$ です。[可換子のWOT閉性](../../VN/VN2/index.md#prop-vn2-commutant-wot-closed)と[von Neumannの二重可換子定理](../../VN/VN2/index.md#thm-vn2-bicommutant)から、$S$ のWOT閉包 $S''$ も $T'$ に入ります：

$$
S''\subset T'.
$$

従って $T\subset(S'')'$。再び[可換子のWOT閉性](../../VN/VN2/index.md#prop-vn2-commutant-wot-closed)を用いると $T''\subset(S'')'$ です。これは $S''$ の各元が $T''$ の各元と可換であることそのものです。したがって

$$
\mathcal M_\omega(O_1)
=S''\subset(T'')'
=\mathcal M_\omega(O_2)'
$$

を得ます。
<!-- proof-end -->

ここで結論は**包含**です。$\mathcal M_\omega(O')=\mathcal M_\omega(O)'$ という等号（Haag双対性）は一般には出ません。また、空間的補集合 $O'$ における局所von Neumann環を定義するには、その領域が採用した領域族に属するか、含まれる有界領域の環から生成するかも指定する必要があります。

## 3. GNS状態は局所von Neumann環上で正規になる

C*環の状態は最初からWOT連続だとは言えません。そもそも弱作用素位相は**表現した後**に決まります。しかしGNSベクトルを使うと、対応する局所von Neumann環には正規状態が自然にあります。[VN5の正規状態](../../VN/VN5/index.md#def-vn5-normal-state)とは、その環のultraweak位相に連続な正規化正汎関数です。

<a id="prop-aqft9-local-normal-state"></a>

<!-- formal-statement-start -->
> **命題（局所von Neumann環へのGNS状態の正規な延長）**  
> 前節の仮定の下、各領域 $O$ に対して
$$
\widetilde\omega_O(X)
:=\langle\Omega_\omega,X\Omega_\omega\rangle,
\qquad X\in\mathcal M_\omega(O)
$$
> は $\mathcal M_\omega(O)$ 上の正規状態である。また $A\in\mathfrak A(O)$ なら
$$
\widetilde\omega_O(\pi_\omega(A))=\omega(A).
$$
> ただし $\omega$ が $\mathfrak A$ 上で忠実であること、あるいは $\widetilde\omega_O$ が局所von Neumann環上で忠実であることは仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

ベクトル状態の正性・規格化を直接計算し、正規性はrank-one密度作用素で表します。大域の状態を固定したことが重要です。

<!-- proof-start -->
### 証明

$X\in\mathcal M_\omega(O)$ なら

$$
\widetilde\omega_O(X^*X)
=\langle X\Omega_\omega,X\Omega_\omega\rangle
=\|X\Omega_\omega\|^2\ge0.
$$

単位元は $\pi_\omega(1)=I$ ですから $\widetilde\omega_O(I)=\|\Omega_\omega\|^2=1$ です。

$\Omega_\omega$ への直交射影 $P_\Omega$ を $\mathcal H_\omega$ 上の階数1作用素とすると、[VN5の密度作用素による正規状態の表示](../../VN/VN5/index.md#thm-vn5-density-state-correspondence)を $B(\mathcal H_\omega)$ に適用できます。実際、$\operatorname{Tr}(P_\Omega)=1$、$P_\Omega\ge0$ で

$$
\operatorname{Tr}(XP_\Omega)
=\langle\Omega_\omega,X\Omega_\omega\rangle
$$

です。よって $B(\mathcal H_\omega)$ 上で正規であり、その部分von Neumann環 $\mathcal M_\omega(O)$ への制限もultraweak連続、すなわち正規です。最後にGNSの再現公式を $\pi_\omega(A)$ に適用すれば

$$
\widetilde\omega_O(\pi_\omega(A))
=\langle\Omega_\omega,\pi_\omega(A)\Omega_\omega\rangle
=\omega(A)
$$

となります。
<!-- proof-end -->

**正規性と忠実性は違います。** 正規性は極限との適合性、忠実性は正作用素 $X\ge0$ に対し $\widetilde\omega_O(X)=0$ なら $X=0$ となることです。例えば $\mathbb C^2$ の対角表示でベクトル $e_1=(1,0)$ を使うと、状態 $X\mapsto\langle e_1,Xe_1\rangle$ は有限次元なので正規ですが、零でない射影 $\operatorname{diag}(0,1)$ を零へ写すため忠実ではありません。なおこのベクトルは対角代数上の巡回ベクトルではありません。**この例は正規性と忠実性の論理的な違いの確認**です。

## 4. 表現依存性：同じC*netでも局所von Neumann環は変わる

前節の「状態を選んでから表現する」という順序は飾りではありません。元のC*netを固定しても、状態を替えると作用するHilbert空間、零に潰れる観測量、さらには局所von Neumann環が変わり得ます。

<a id="prop-aqft9-state-dependent"></a>

<!-- formal-statement-start -->
> **命題（二点netの異なるGNS局所von Neumann環）**  
> すべての非空領域に同じ可換C*環 $\mathfrak A(O)=\mathbb C^2$ を割り当て、元のquasilocal環も $\mathbb C^2$ とする。二つの状態
$$
\omega_0(a,b)=a,\qquad
\omega_{\rm av}(a,b)=\frac{a+b}{2}
$$
> のGNS局所von Neumann環は、任意の非空 $O$ でそれぞれ
$$
\mathcal M_{\omega_0}(O)\cong\mathbb C,\qquad
\mathcal M_{\omega_{\rm av}}(O)\cong\mathbb C^2
$$
> となり、単位的 $*$-代数として同型ではない。
<!-- formal-statement-end -->

### 証明の見取り図

GNS零空間と商の次元をそれぞれ計算し、有限次元では二重可換子を取っても像が増えないことを用います。

<!-- proof-start -->
### 証明

$\omega_0$ ではGNS零空間が

$$
N_0=\{(a,b):\omega_0((a,b)^*(a,b))=|a|^2=0\}
=\{(0,b):b\in\mathbb C\}
$$

です。従って商 $\mathbb C^2/N_0$ は1次元で、$\mathcal H_{\omega_0}=\mathbb C$、$\pi_{\omega_0}(a,b)z=az$、$\Omega_{\omega_0}=1$ です。$\pi_{\omega_0}(\mathbb C^2)=B(\mathbb C)=\mathbb C$ だから二重可換子も $\mathbb C$ です。

$\omega_{\rm av}$ では第1節の計算によりGNS零空間は零で、表現は対角行列全体 $D$ です。既に $D'=D$ を直接計算したので $D''=D\cong\mathbb C^2$ となります。

最後に $\mathbb C$ は複素ベクトル空間として1次元、$\mathbb C^2$ は2次元です。単位的 $*$-代数の同型は線形全単射なので、両者は同型ではありません。
<!-- proof-end -->

この差は「無限自由度だから」ではなく、**非忠実な状態がGNS表現で観測量を潰す**だけでも発生します。無限自由度で表現が非同値になる機構はAQFT10で別に扱います。反対に、同じ状態のGNS三つ組を別の基底で実現するだけなら、[OA5のGNS一意性](../../OA/OA5/index.md#thm-oa5-gns-uniqueness)がユニタリ同値を与え、局所二重可換子も同じユニタリで対応します。

## 5. ノルム閉包と弱閉包は本当に異なる

有限次元の例だけを見ると、局所C*環をわざわざ弱閉包する意味が見えません。次の無限次元模型では、**連続関数の乗法作用素から不連続な射影が出現する**ことを示します。

$\mathcal H=L^2([0,1],dt)$ に $\mathfrak A=C([0,1])$ を乗法表現 $\pi(f)=M_f$ で表します。ここで $t\in[0,1]$ は積分変数であり、$\xi\in\mathcal H$ に対し $(M_f\xi)(t)=f(t)\xi(t)$（ほとんど至る所）です。この表現は忠実です。なぜなら連続関数 $f$ が零でない点の近くで $|f|$ は正の下限を持ち、その区間の指示関数に掛けると非零になるからです。

<a id="prop-aqft9-weak-closure-new-projection"></a>

<!-- formal-statement-start -->
> **命題（乗法表現の弱閉包に新しい射影が現れる）**  
> 上の忠実表現 $\pi:C([0,1])\to B(L^2([0,1]))$ に対し、区間 $[0,1/2]$ の指示関数による乗法作用素 $P$ は
$$
P\in\pi(C([0,1]))''
\quad\text{だが}\quad
P\notin\pi(C([0,1])).
$$
> 従ってこの表現でのvon Neumann環は、元のC*環の像より真に大きい。
<!-- formal-statement-end -->

### 証明の見取り図

不連続関数を連続関数で幅 $1/n$ の帯の中だけ滑らかにつなぎ、各ベクトルに作用した誤差の $L^2$ ノルムを評価します。連続関数が指示関数にほとんど至る所で一致できないことも確認します。

<!-- proof-start -->
### 証明

$E=[0,1/2]$ とおきます。指示関数は実数値で $\mathbf1_E^2=\mathbf1_E$ を満たすので、乗法作用素について

$$
P^*=M_{\overline{\mathbf1_E}}=P,\qquad
P^2=M_{\mathbf1_E^2}=P
$$

です。従って $P$ は確かに直交射影です。

$n\ge3$ とし、$f_n\in C([0,1])$ を

$$
f_n(t)=
\begin{cases}
1,&0\le t\le 1/2-1/n,\\
n(1/2-t),&1/2-1/n<t<1/2,\\
0,&1/2\le t\le1
\end{cases}
$$

で定義します。$0\le f_n\le1$ で、$t\ne1/2$ の各点で $f_n(t)\to\mathbf 1_{[0,1/2]}(t)$ が成立します。$t=1/2$ の値の差は測度零なので乗法作用素には影響しません。

任意の $\xi\in L^2([0,1])$ に対して

$$
\|(\pi(f_n)-P)\xi\|_2^2
=\int_0^1|f_n(t)-\mathbf 1_{[0,1/2]}(t)|^2|\xi(t)|^2\,dt
\longrightarrow0.
$$

被積分関数は $|\xi|^2\in L^1$ で上から抑えられ、ほとんど至る所で零へ収束するため、[Lebesgueの優収束定理](../../F0/F0-00D2B/index.md#thm-f0-00d2b-01)を適用しました。これがSOT収束です。[von Neumannの二重可換子定理](../../VN/VN2/index.md#thm-vn2-bicommutant)から $P\in\pi(C([0,1]))''$ です。

仮に $P=\pi(f)$ となる連続関数 $f$ があれば、$f=1$ が $(0,1/2)$ 上のほとんど至る所、$f=0$ が $(1/2,1)$ 上のほとんど至る所で成立します。連続性からそれぞれの開区間の**全点**で同じ等式が成立します。よって $t\uparrow1/2$ での左極限は1、$t\downarrow1/2$ での右極限は0となり、連続性に矛盾します。
<!-- proof-end -->

ここで弱閉包の演算は**ノルム閉包とは違う**と分かりました。上記の $f_n$ は $P$ に作用素ノルムでは近づきません。実際 $1/2$ の直前の小区間には $f_n(t)$ が0に近い点が存在する一方、指示関数は1なので、

$$
\|\pi(f_n)-P\|=\operatorname*{ess\,sup}_{t}|f_n(t)-\mathbf1_{[0,1/2]}(t)|=1.
$$

## 6. C*状態が任意の表現で正規とは限らない

第3節では「状態 $\omega$ の**GNS表現**を用いれば、そのGNSベクトル状態が局所von Neumann環上で正規になる」と示しました。これを「どんな状態でも、**先に指定した別の表現**の弱閉包へ正規に延長できる」と読み替えてはいけません。

ここで使う点評価 $\delta_0(f)=f(0)$ は、$\delta_0(f^*f)=|f(0)|^2\ge0$、$\delta_0(1)=1$ を満たすため、確かに $C([0,1])$ 上の状態です。

<a id="prop-aqft9-nonnormal-extension"></a>

<!-- formal-statement-start -->
> **命題（点評価状態は乗法表現へ正規に延長できない）**  
> 前節の $\pi:C([0,1])\to B(L^2([0,1]))$ に対し、C*状態 $\delta_0(f)=f(0)$ は、$\pi(C([0,1]))''$ 上の正規汎関数として延長できない。
<!-- formal-statement-end -->

### 証明の見取り図

原点で値が1のまま、支持区間だけ縮む連続関数を選びます。作用素はSOTで零へ収束しますが、点評価はずっと1なので、正規性と矛盾します。

<!-- proof-start -->
### 証明

$f_n(t)=\max\{1-nt,0\}$ とします。$0\le f_n\le1$、$f_n(0)=1$ で、$t>0$ を固定すると十分大きな $n$ で $f_n(t)=0$ です。任意の $\xi\in L^2([0,1])$ について

$$
\|\pi(f_n)\xi\|_2^2
=\int_0^1|f_n(t)|^2|\xi(t)|^2\,dt\longrightarrow0
$$

が[Lebesgueの優収束定理](../../F0/F0-00D2B/index.md#thm-f0-00d2b-01)から従います。つまり $\pi(f_n)\to0$ はSOT収束、かつ $\|\pi(f_n)\|\le1$ です。[VN4のWOTとultraweak位相の比較](../../VN/VN4/index.md#prop-vn4-wot-ultraweak)を適用すると、一様ノルム有界なこの列はultraweakでも零へ収束します。

もし正規な延長 $\varphi$ があれば、[正規汎関数の定義](../../VN/VN5/index.md#def-vn5-normal-functional)から $\varphi(\pi(f_n))\to\varphi(0)=0$ のはずです。しかし延長条件から $\varphi(\pi(f_n))=\delta_0(f_n)=1$ であり矛盾します。
<!-- proof-end -->

点評価状態の**自分自身のGNS表現**は1次元で、その上では正規です。非正規性は状態だけの性質でなく、**どのvon Neumann環に延長しようとしているか**に依存します。この区別は、後続の無限自由度の表現比較でも重要です。

## 7. 共変性はユニタリ共役で弱閉包へ運ばれる

元のnetがPoincaré共変であり、状態がその作用で不変なら、[AQFT3の共変GNS実装](../AQFT3/index.md#thm-aqft3-covariant-gns)によりユニタリ $U_\omega(g)$ が得られます。

<a id="prop-aqft9-vn-covariance"></a>

<!-- formal-statement-start -->
> **命題（不変状態の局所von Neumann netの共変性）**  
> $g$ を採用するPoincaré群の元とする。$\alpha_g(\mathfrak A(O))=\mathfrak A(gO)$ を満たす共変C*netと、$\omega\circ\alpha_g=\omega$ を満たす状態 $\omega$ を仮定する。このときAQFT3のGNSユニタリ $U_\omega(g)$ は
$$
U_\omega(g)\mathcal M_\omega(O)U_\omega(g)^*
=\mathcal M_\omega(gO)
$$
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

GNSの共変性を各局所C*環へ適用し、共役で可換子を取る操作が保たれることを確かめます。

<!-- proof-start -->
### 証明

[不変状態の共変GNS実装](../AQFT3/index.md#thm-aqft3-covariant-gns)により

$$
U_\omega(g)\pi_\omega(A)U_\omega(g)^*
=\pi_\omega(\alpha_g(A))
$$

が全ての $A\in\mathfrak A$ で成立します。$A\in\mathfrak A(O)$ に制限すれば

$$
U_\omega(g)\pi_\omega(\mathfrak A(O))U_\omega(g)^*
=\pi_\omega(\mathfrak A(gO)).
$$

任意の集合 $S\subset B(\mathcal H_\omega)$ とユニタリ $U$ について、$X$ が $USU^*$ の全元と可換であることは $U^*XU$ が $S$ の全元と可換であることと同値です。したがって

$$
(USU^*)'=US'U^*,
\qquad
(USU^*)''=US''U^*.
$$

この恒等式を上式の左辺に適用すると、定義どおり $\mathcal M_\omega(O)$ と $\mathcal M_\omega(gO)$ が現れます。
<!-- proof-end -->

**追加条件の境界**：この命題で必要なのは共変netと状態の不変性です。強連続性や正エネルギースペクトル条件をこの代数的な共役等式の証明に使ってはいません。それらは物理的な真空表現を選ぶための別の条件です。

## 8. 自由Klein–Gordon場では何が弱閉包されるか

抽象構成を[AQFT8のFock真空](../AQFT8/index.md#prop-aqft8-gns-fock)に戻しましょう。$M=\mathbb R^{1+3}$ を四次元Minkowski時空、$m>0$ を質量とします。この節の $P$ は第5節の射影ではなく、時間座標 $t$ と空間座標 $\boldsymbol x$ に作用するKlein–Gordon微分作用素

$$
P=\frac{\partial^2}{\partial t^2}-\Delta_{\boldsymbol x}+m^2,
\qquad
\Delta_{\boldsymbol x}=\sum_{j=1}^3\frac{\partial^2}{\partial x_j^2}
$$

です。$C_c^\infty(M,\mathbb R)$ は実数値の滑らかなコンパクト支持試験関数の空間であり、その商を

$$
\mathcal V=C_c^\infty(M,\mathbb R)/PC_c^\infty(M,\mathbb R)
$$

とします。[AQFT6の局所商](../AQFT6/index.md#def-aqft6-local-weyl-net)を $\mathcal V(O)$ と書きます。これは台が $O$ に含まれる実試験関数の同値類が全域商で作る部分空間です。

真空Fock空間 $\mathcal F$ 上では $F\mapsto W_{\mathcal F}(F)$ がWeyl関係を満たします。$\pi_{\mathcal F}$ はそれを実現するquasilocal C*環の表現です。

<a id="def-aqft9-fock-local-vn"></a>

<!-- formal-statement-start -->
> **定義（真空Fock局所von Neumann環）**  
> 上の $m>0$ の実自由Klein–Gordon場とAQFT8のMinkowski Fock真空に対し、各領域 $O$ の真空Fock局所von Neumann環を
$$
\mathcal M_{\rm vac}(O)
:=\{W_{\mathcal F}(F):F\in\mathcal V(O)\}''
\subset B(\mathcal F)
$$
> と定義する。可換子はFock空間上の全有界作用素に対して取る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft9-fock-local-vn -->
### 直接例：零源・実スケールと局所可換性

**定義の確認**。領域 $O$ の実源商に対し、零元・実数倍・随伴から単位的Weyl生成族を確かめ、さらに空間的に分離した二領域で生成元と二重可換子の可換性を確認します。

$\mathcal V(O)$ は実線形部分空間なので、$0\in\mathcal V(O)$ と $\lambda F\in\mathcal V(O)$（$\lambda\in\mathbb R$ は実スケール）を含みます。ここでの $\lambda$ は上の時間座標 $t$ とは別の変数です。[Weyl関係](../AQFT6/index.md#def-aqft6-weyl-ccr)から

$$
W_{\mathcal F}(0)=I,\qquad
W_{\mathcal F}(F)^*=W_{\mathcal F}(-F)
$$

です。従ってこれらが生成する $*$-代数は単位を含み、随伴で閉じます。二重可換子はvon Neumann環を与えます。

さらに空間的に分離した $O_1,O_2$ に源を取れば、[AQFT5の局所シンプレクティック直交性](../AQFT5/index.md#prop-aqft5-local-orthogonality)により $\sigma(F,G)=0$ です。Weyl積の二つの順序はそれぞれ

$$
W_{\mathcal F}(F)W_{\mathcal F}(G)
=e^{-i\sigma(F,G)/2}W_{\mathcal F}(F+G),
$$

$$
W_{\mathcal F}(G)W_{\mathcal F}(F)
=e^{i\sigma(F,G)/2}W_{\mathcal F}(F+G)
$$

なので一致します。[局所von Neumann netの包含単調性と局所性](#thm-aqft9-isotony-locality)を用いれば、生成したvon Neumann環同士も可換になります。零源・随伴・局所性の全条件を確認しました。
<!-- definition-example-end -->

<a id="thm-aqft9-fock-gns-local"></a>

<!-- formal-statement-start -->
> **定理（自由場のGNS局所von Neumann環とFock局所von Neumann環の一致）**  
> $m>0$ のMinkowski真空Weyl状態 $\omega_{\rm vac}$ について、AQFT8で構成したFock表現はそのGNS表現とユニタリ同値である。したがってGNSから作る局所von Neumann環は各領域 $O$ ごとに上の $\mathcal M_{\rm vac}(O)$ とユニタリ共役で一致する。特にFock局所von Neumann環は包含単調性とEinstein局所性を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

GNS空間をFock空間へ同一視するユニタリを一つ固定し、局所Weyl生成元を共役してから二重可換子を取ります。局所巡回性を仮定する必要はありません。

<!-- proof-start -->
### 証明

[AQFT8の真空GNS–Fock同値](../AQFT8/index.md#prop-aqft8-gns-fock)により、あるユニタリ $V:\mathcal H_{\omega_{\rm vac}}\to\mathcal F$ が存在して

$$
V\Omega_{\omega_{\rm vac}}=\Omega_{\mathcal F},
\qquad
V\pi_{\omega_{\rm vac}}(W(F))V^*=W_{\mathcal F}(F)
$$

が全ての $F\in\mathcal V$ について成立します。

局所C*環は[AQFT6の構成](../AQFT6/index.md#def-aqft6-local-weyl-net)から

$$
\mathfrak A(O)
=C^*(W(F):F\in\mathcal V(O))
$$

です。$V$ による共役は積・随伴・ノルムを保つので、

$$
V\pi_{\omega_{\rm vac}}(\mathfrak A(O))V^*
=C^*(W_{\mathcal F}(F):F\in\mathcal V(O)).
$$

両辺の二重可換子を取り、第7節で証明したユニタリ共役と可換子の交換則を適用します。集合の二重可換子は、その集合が生成する単位的C*環の二重可換子と同じです（可換になる対象が生成元と全てのノルム極限で一致するため）。よって

$$
\begin{aligned}
V\mathcal M_{\omega_{\rm vac}}(O)V^*
&=V\pi_{\omega_{\rm vac}}(\mathfrak A(O))''V^*\\
&=\bigl(C^*(W_{\mathcal F}(F):F\in\mathcal V(O))\bigr)''\\
&=\{W_{\mathcal F}(F):F\in\mathcal V(O)\}''\\
&=\mathcal M_{\rm vac}(O).
\end{aligned}
$$

最後に、[AQFT6の局所C*netの定理](../AQFT6/index.md#thm-aqft6-haag-kastler)が元のC*netの包含単調性とEinstein局所性を保証します。[局所von Neumann netの包含単調性と局所性](#thm-aqft9-isotony-locality)をそのGNS表現に適用し、ユニタリ $V$ で共役すればFock局所von Neumann環にも両性質が移ります。
<!-- proof-end -->

[AQFT8で示した真空のFock巡回性](../AQFT8/index.md#prop-aqft8-gns-fock)は**全域Weyl代数**についての結論です。$\overline{\mathcal M_{\rm vac}(O)\Omega_{\mathcal F}}=\mathcal F$ や、$X\Omega_{\mathcal F}=0\Rightarrow X=0$ が各局所 $O$ について成立するとは、ここでは結論しません。前者の局所巡回性は後のReeh–Schlieder定理で、後者の分離性は非空な空間的補領域と局所性を組み合わせて検討します。

## 9. 演習と詳細解答

### Level A：定義と一段ずつの計算

<a id="ex-aqft9-a01"></a>
#### AQFT9-A01 二重可換子の順序
- Level: A

$S\subset T\subset B(H)$ とする。$T'\subset S'$ および $S''\subset T''$ を定義から示せ。

<!-- solution-start -->
**詳細解答。** $X\in T'$ とすると、全ての $t\in T$ に対して $Xt=tX$ です。$S\subset T$ なので全ての $s\in S$ にも $Xs=sX$ が成立し、$X\in S'$ です。従って $T'\subset S'$。この包含にもう一度可換子の順序反転を適用すると

$$
(S')'\subset(T')',
\quad\text{すなわち}\quad
S''\subset T''
$$

を得ます。この最後の包含は、元の集合に対する**二重**可換子である点が重要です。
<!-- solution-end -->

<a id="ex-aqft9-a02"></a>
#### AQFT9-A02 二点の対角代数
- Level: A

$D=\{\operatorname{diag}(a,b):a,b\in\mathbb C\}\subset M_2(\mathbb C)$ について $D'$ と $D''$ を計算せよ。

<!-- solution-start -->
**詳細解答。** $X=(x_{ij})$ と $P=\operatorname{diag}(1,0)\in D$ に対し

$$
XP=\begin{pmatrix}x_{11}&0\\x_{21}&0\end{pmatrix},
\qquad
PX=\begin{pmatrix}x_{11}&x_{12}\\0&0\end{pmatrix}.
$$

従って $XP=PX$ は $x_{12}=x_{21}=0$ を要求します。逆に対角行列は全ての $D$ の元と可換なので $D'=D$、したがって $D''=(D')'=D$ です。
<!-- solution-end -->

<a id="ex-aqft9-a03"></a>
#### AQFT9-A03 ベクトル状態の正性と規格化
- Level: A

$H=\mathbb C^2$、$\Omega=(\sqrt{3}/2,1/2)$ とする。$\varphi(X)=\langle\Omega,X\Omega\rangle$ は $B(H)$ の状態であることを示し、$P=\operatorname{diag}(1,0)$ の期待値を求めよ。

<!-- solution-start -->
**詳細解答。** $\|\Omega\|^2=3/4+1/4=1$ より $\varphi(I)=1$ です。任意の $X$ について

$$
\varphi(X^*X)=\langle X\Omega,X\Omega\rangle=\|X\Omega\|^2\ge0
$$

なので正です。さらに $P\Omega=(\sqrt3/2,0)$ だから

$$
\varphi(P)=\langle\Omega,P\Omega\rangle=3/4.
$$

有限次元ではこの状態は正規でもありますが、正性と正規性は異なる要件です。
<!-- solution-end -->

<a id="ex-aqft9-a04"></a>
#### AQFT9-A04 Weyl元の局所可換性
- Level: A

空間的に分離した二領域の $F,G$ に対し $\sigma(F,G)=0$ とする。[AQFT6のWeyl関係](../AQFT6/index.md#def-aqft6-weyl-ccr)から $W(F)$ と $W(G)$ が可換であることを直接検算せよ。

<!-- solution-start -->
**詳細解答。** 定義から

$$
W(F)W(G)=e^{-i\sigma(F,G)/2}W(F+G)
=W(F+G),
$$

$$
W(G)W(F)=e^{-i\sigma(G,F)/2}W(G+F)
=e^{i\sigma(F,G)/2}W(F+G)
=W(F+G).
$$

両者が一致します。実スケールでの直交性を確認しないまま、たまたま位相が $2\pi$ の整数倍になることだけから $\sigma(F,G)=0$ と逆推論してはいけません。
<!-- solution-end -->

### Level B：複数の結果をつないで使う

<a id="ex-aqft9-b01"></a>
#### AQFT9-B01 一つのnetを二つの状態で表す
- Level: B

任意の非空領域に $\mathbb C^2$ を割り当てる可換netについて $\omega_0(a,b)=a$ と $\omega_{\rm av}(a,b)=(a+b)/2$ を選ぶ。GNS零空間、GNS空間の次元、局所二重可換子を比較し、二つの環が同型でない理由を述べよ。

<!-- solution-start -->
**詳細解答。** [OA5のGNS零空間](../../OA/OA5/index.md#def-oa5-gns-null-space)は $\omega(A^*A)=0$ を満たす元全体です。まず二状態について

$$
\omega_0((a,b)^*(a,b))=|a|^2,\qquad
\omega_{\rm av}((a,b)^*(a,b))=\frac{|a|^2+|b|^2}{2}
$$

を計算します。従って零空間はそれぞれ

$$
N_0=\{(0,b):b\in\mathbb C\},\qquad N_{\rm av}=\{0\}.
$$

点状態の商は $[(a,b)]\mapsto a$ で1次元と同一視でき、左乗法は $\pi_0(a,b)z=az$ です。よって局所像と二重可換子はいずれも $\mathbb C$ です。

平均状態の商は2次元で、[第1節のGNS商内積と正規直交基底の計算](#def-aqft9-local-vn-net)によって $\pi_{\rm av}(a,b)=\operatorname{diag}(a,b)$ です。[A02の計算](#ex-aqft9-a02)からその二重可換子は $D\cong\mathbb C^2$ です。

$\mathbb C$ と $\mathbb C^2$ は複素ベクトル空間の次元が異なり、単位的 $*$-同型を持ちません。したがって元のnetが同一でも、GNS局所von Neumann環は状態によって変わり得ます。
<!-- solution-end -->

<a id="ex-aqft9-b02"></a>
#### AQFT9-B02 連続乗法作用素の極限
- Level: B

$H=L^2([0,1])$、$\pi(f)=M_f$ とし、第5節の $f_n$ と $P=M_{\mathbf1_{[0,1/2]}}$ について、任意の $\xi\in H$ で $\|(M_{f_n}-P)\xi\|_2\to0$ を示す一方、$\|M_{f_n}-P\|\to0$ とはならないことを証明せよ。

<!-- solution-start -->
**詳細解答。** $|f_n-\mathbf1_{[0,1/2]}|\le1$ で、$t\ne1/2$ では点wiseに零へ収束します。従って $\xi\in L^2$ を固定すると、被積分関数の上界 $|\xi|^2$ は可積分です。[Lebesgueの優収束定理](../../F0/F0-00D2B/index.md#thm-f0-00d2b-01)より

$$
\|(M_{f_n}-P)\xi\|_2^2
=\int_0^1|f_n-\mathbf1_{[0,1/2]}|^2|\xi|^2\,dt\to0.
$$

一方、$t<1/2$ を $1/2$ に下側から近づけると、$f_n(t)=n(1/2-t)\to0$ で指示関数は1のままです。したがって任意の $\varepsilon>0$ について正の測度を持つ区間上で差の絶対値が $1-\varepsilon$ を超えます。よって本質的上限は1、すなわち

$$
\|M_{f_n}-P\|=1
$$

です。SOT収束とノルム収束が異なることを具体的に示しました。
<!-- solution-end -->

<a id="ex-aqft9-b03"></a>
#### AQFT9-B03 GNS状態の正規性と別表現での失敗
- Level: B

$\delta_0(f)=f(0)$ を $C([0,1])$ 上の状態とする。次を示せ。

1. $\delta_0$ のGNS局所von Neumann環は1次元で、対応する状態は正規である。
2. $L^2([0,1])$ の乗法表現では、$\delta_0$ に一致する正規延長は存在しない。

<!-- solution-start -->
**詳細解答。** まず $\delta_0(f^*f)=|f(0)|^2$ なので零空間は $\{f:f(0)=0\}$ です。GNS商は値 $f(0)$ だけで決まり1次元、表現は $\pi_{\delta_0}(f)z=f(0)z$ です。像とその二重可換子は $B(\mathbb C)=\mathbb C$、状態は単位上で1を取る恒等汎関数であり、有限次元のため正規です。

一方、乗法表現で $g_n(t)=\max\{1-nt,0\}$ とすると、$|g_n|\le1$ で、$t>0$ では $g_n(t)\to0$ です。任意の $\xi\in L^2([0,1])$ を固定すれば

$$
\|M_{g_n}\xi\|_2^2
=\int_0^1|g_n(t)|^2|\xi(t)|^2\,dt\longrightarrow0
$$

となります。これは被積分関数を可積分な $|\xi|^2$ で支配して[Lebesgueの優収束定理](../../F0/F0-00D2B/index.md#thm-f0-00d2b-01)を適用したものです。$\|M_{g_n}\|\le1$ なので、一様有界なSOT収束から[VN4の位相比較](../../VN/VN4/index.md#prop-vn4-wot-ultraweak)によりultraweak収束も成立します。しかし正規延長 $\varphi$ が存在すれば

$$
\varphi(M_{g_n})\longrightarrow\varphi(0)=0,
\qquad
\varphi(M_{g_n})=\delta_0(g_n)=g_n(0)=1
$$

となり矛盾です。ここで別表現を**固定したこと**が失敗の理由です。
<!-- solution-end -->

<a id="ex-aqft9-b04"></a>
#### AQFT9-B04 共変性を可換子に運ぶ
- Level: B

$U$ をHilbert空間上のユニタリ、$S\subset B(H)$ とする。$(USU^*)'=US'U^*$ を示し、$\pi(\mathfrak A(gO))=U\pi(\mathfrak A(O))U^*$ から局所von Neumann環の共変性を導け。

<!-- solution-start -->
**詳細解答。** $X\in(USU^*)'$ は全ての $s\in S$ に対して $XUsU^*=UsU^*X$ を意味します。両辺を左から $U^*$、右から $U$ で挟むと $(U^*XU)s=s(U^*XU)$、すなわち $U^*XU\in S'$ です。逆向きにも同じ操作が可能なので

$$
(USU^*)'=US'U^*.
$$

さらに $S'$ に同じ式を適用すると $(USU^*)''=US''U^*$ を得ます。$S=\pi(\mathfrak A(O))$ として共変性の仮定に代入すれば

$$
\mathcal M(gO)=\pi(\mathfrak A(gO))''
=(U\pi(\mathfrak A(O))U^*)''
=U\mathcal M(O)U^*
$$

となります。正エネルギー条件を仮定していない点も確認できます。
<!-- solution-end -->

### Level C：構成・局所性・正規性を統合する

<a id="ex-aqft9-c01"></a>
#### AQFT9-C01 真空Weyl状態から局所W*netへ
- Level: C

$m>0$ の四次元Minkowski自由Klein–Gordon場について、[AQFT6の局所Weyl C*net](../AQFT6/index.md#def-aqft6-local-weyl-net)と[AQFT8の真空GNS–Fock同値](../AQFT8/index.md#prop-aqft8-gns-fock)を前提として、次を示せ。

1. $\mathcal M_{\rm vac}(O)=\{W_{\mathcal F}(F):F\in\mathcal V(O)\}''$ がGNS局所von Neumann環とユニタリ同値である。
2. $O_1\subset O_2$ と空間的に分離した $O_1,O_3$ のそれぞれで、包含と可換子包含を示せ。
3. Fock真空が $\mathcal M_{\rm vac}(O)$ 上の正規状態を与えることを証明し、局所巡回・分離性については何が未証明か述べよ。

<!-- solution-start -->
**詳細解答。** **（1）** [AQFT8のGNS–Fock同値](../AQFT8/index.md#prop-aqft8-gns-fock)から得られるユニタリ $V$ は全域Weyl元に対して

$$
V\pi_{\omega_{\rm vac}}(W(F))V^*=W_{\mathcal F}(F)
$$

を満たします。$\mathfrak A(O)$ が $F\in\mathcal V(O)$ のWeyl元のC*生成環であることから、共役をノルム閉包まで延長して

$$
V\pi_{\omega_{\rm vac}}(\mathfrak A(O))V^*
=C^*(W_{\mathcal F}(F):F\in\mathcal V(O))
$$

と書けます。共役は二重可換子と交換し、$C^*$生成環の可換子は生成元集合の可換子に一致するので

$$
V\mathcal M_{\omega_{\rm vac}}(O)V^*
=\{W_{\mathcal F}(F):F\in\mathcal V(O)\}''
$$

を得ます。

**（2）** $O_1\subset O_2$ なら、全域源商内の局所部分空間は $\mathcal V(O_1)\subset\mathcal V(O_2)$ です。Weyl生成元の包含からC*生成環の包含を得て、[二重可換子の順序則](#ex-aqft9-a01)より $\mathcal M_{\rm vac}(O_1)\subset\mathcal M_{\rm vac}(O_2)$。空間的に分離した $O_1,O_3$ の源については[AQFT5の直交性](../AQFT5/index.md#prop-aqft5-local-orthogonality)から $\sigma(F,G)=0$。Weyl積の位相が消えるので各生成元は可換です。[第2節の弱閉包による局所性の保存](#thm-aqft9-isotony-locality)を適用すると

$$
\mathcal M_{\rm vac}(O_1)\subset\mathcal M_{\rm vac}(O_3)'
$$

となります。

**（3）** 真空 $\Omega_{\mathcal F}$ はノルム1です。$\rho=|\Omega_{\mathcal F}\rangle\langle\Omega_{\mathcal F}|$ は正の階数1作用素、$\operatorname{Tr}(\rho)=1$ であり、

$$
\varphi_O(X)=\langle\Omega_{\mathcal F},X\Omega_{\mathcal F}\rangle
=\operatorname{Tr}(X\rho)
$$

と書けます。[VN5の正規状態と密度作用素の対応](../../VN/VN5/index.md#thm-vn5-density-state-correspondence)からこの $B(\mathcal F)$ 上の汎関数は正規で、局所von Neumann環への制限も正規です。

ただし[AQFT8の巡回性](../AQFT8/index.md#prop-aqft8-gns-fock)は全域代数の話です。ここから局所 $O$ に対する $\overline{\mathcal M_{\rm vac}(O)\Omega_{\mathcal F}}=\mathcal F$ は導けず、$\mathcal M_{\rm vac}(O)$ の各 $X$ に対する $X\Omega_{\mathcal F}=0\Rightarrow X=0$ も未証明です。前者にはReeh–Schlieder型の解析性議論、後者には局所巡回性と空間的補領域の局所性が必要となります。
<!-- solution-end -->

## 10. 到達点と次講

**状態 $\omega$ を選ぶ → GNS表現 $\pi_\omega$ を作る → 各局所C*環の像を弱閉包する**、という三段階を分けて扱えるようになりました。包含単調性・Einstein局所性は局所von Neumann環へ移ります。GNSベクトル状態は選んだ表現で正規ですが、別の表現で任意のC*状態が正規に延長できるとは限りません。

次のAQFT10では、有限モードで得られる表現の一意性が無限モード極限ではどう崩れるかを比較します。その先で、正エネルギーと解析性を使う局所真空の巡回・分離性へ進みます。
