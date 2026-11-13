# AQFT22 Tomitaの可換子定理

[AQFT21の左Hilbert環](../AQFT21/index.md#def-aqft21-left-hilbert)では、左乗算は有界でも、同じベクトル代数の**代数的な右乗算**は非有界となり得ることを学びました。このため、行列の随伴に似た反ユニタリ $J$ を得ても、ただちに $J\mathcal M J=\mathcal M'$ とは言えません。

今回の中心問題は、巡回・分離ベクトル $\Omega$ と閉Tomita作用素 $S=J\Delta^{1/2}$ の**解析的な情報**から、どのように有界作用素環の可換子を復元するか、です。右乗算の形式的操作を有界と決めつけず、レゾルベント、共通グラフ core、積分変換をつないで両包含を証明します。モジュラー流の自己同型群としての性質は次講で改めて扱います。

内積は従来どおり**第2変数線形**です。以下の長い可換子証明では、作用素を左側から書きやすくするため、補助的に
$$
[x,y]:=\langle y,x\rangle
$$
と置きます。角括弧は**第1変数線形**です。この変換は内積の規約を変更せず、たとえば $[Ax,y]=[x,A^*y]$ です。$\varphi(A)=[A\Omega,\Omega]=\langle\Omega,A\Omega\rangle$ とします。

## 1. 問題設定と両包含の区別

複素Hilbert空間 $\mathcal H$ 上の単位的von Neumann環 $\mathcal M\subset B(\mathcal H)$ と、単位長の[巡回・分離ベクトル](../AQFT18/index.md#def-aqft18-standard-pair) $\Omega$ を固定します。[Tomita作用素の閉包](../AQFT18/index.md#thm-aqft18-tomita-closable) $S$、[極分解](../AQFT19/index.md#thm-aqft19-polar) $S=J\Delta^{1/2}$、[モジュラー関係](../AQFT19/index.md#thm-aqft19-modular-relations)
$$
J^2=I,\quad J\Delta J=\Delta^{-1},\quad
S^\sharp=J\Delta^{-1/2}=\Delta^{1/2}J,\quad
J\Omega=\Omega,\quad\Delta\Omega=\Omega
$$
を使います。$\Delta$ は正自己共役・単射ですが、その逆は一般に非有界です。$\mathcal M'$ の[定義](../../VN/VN2/index.md#def-vn2-commutant)は、全ての $A\in\mathcal M$ と交換する有界作用素の集合です。

<a id="def-aqft22-conjugate-algebra"></a>

<!-- formal-statement-start -->
> **定義（反ユニタリ共役で移された代数）**  
> $(\mathcal M,\Omega)$ を標準対、$J$ を付随する反ユニタリ対合とする。
$$
J\mathcal M J=\{JAJ:A\in\mathcal M\}\subset B(\mathcal H)
$$
> を**共役代数**と呼ぶ。$A\mapsto JAJ$ は複素係数を共役するが、作用素の積の順序は保つ。可換子 $\mathcal M'$ との等号は、定義ではなく証明すべき結論である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft22-conjugate-algebra -->
### 直接例：二準位Hilbert–Schmidt模型

[AQFT20の有限次元模型](../AQFT20/index.md#thm-aqft20-modular-formulas)で $\mathcal H=M_2(\mathbb C)$、$\mathcal M=\{L_A:X\mapsto AX\}$、$JX=X^*$ とします。$A,X\in M_2(\mathbb C)$ に対して
$$
JL_AJ(X)=(AX^*)^*=XA^*=R_{A^*}(X).
$$
従って $\{JL_AJ:A\in M_2\}=\{R_B:B\in M_2\}$ です。実際 $L_AR_B(X)=AXB=R_BL_A(X)$ なので $\{R_B\}\subset\mathcal M'$。逆に $T\in\mathcal M'$ なら $T(X)=T(L_XI)=L_XT(I)=XT(I)$ であり、$T=R_{T(I)}$。**両包含**が成立します。$J(\alpha A)J=\bar\alpha JAJ$、$JABJ=(JAJ)(JBJ)$、$(JAJ)^*=JA^*J$ も直接確認できます。
<!-- definition-example-end -->

無限次元では $I$ というHilbert–Schmidtベクトルが存在するとは限りません。ここから先の一般証明では $T(I)$ の代わりとなる有界元を構成します。

## 2. 可換子ベクトルから有界なレゾルベント元を作る

記号 $F=S^\sharp$ は反線形随伴です。[可換子側の初期作用素](../AQFT18/index.md#def-aqft18-commutant-initial)について $F(B\Omega)=B^*\Omega$（$B\in\mathcal M'$）が成り立ちます。$F=\overline{F_0}$ はまだ使いません。$F_0\subset F$ だけで十分です。

$B\in\mathcal M'$、$-\pi<\theta<\pi$ に対し $\lambda=e^{i\theta}$ とします。正の実軸に $-\lambda$ は乗らないため、[関数計算](../../QM/QM6/index.md#def-qm6-borel-functional-calculus)による $(\Delta+\lambda)^{-1}$ は有界で、像は $\operatorname{Dom}\Delta$ に入ります。驚くべき点は、**その像のベクトルが $\mathcal M\Omega$ に属する**ことです。

<a id="lem-aqft22-resolvent"></a>

<!-- formal-statement-start -->
> **補題（有界元を回復するレゾルベント補題）**  
> 標準対 $(\mathcal M,\Omega)$ と $B\in\mathcal M'$、$-\pi<\theta<\pi$、$\lambda=e^{i\theta}$ に対し、一意な $A\in\mathcal M$ が存在し、
$$
A\Omega=(\Delta+\lambda)^{-1}B\Omega
$$
> を満たす。特に $0\le B\le I$ なら $\|A\|\le[2\cos(\theta/2)]^{-1}$。一般の $B$ に対しても $\|A\|\le C_\theta\|B\|$ という有界評価が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

$\varphi$ に支配される正汎関数を $\mathcal M$ の自己共役な縮小作用素で表示します。その後、等式を $S$ のグラフ core 上で照合し、反線形随伴の定義によって $\Delta A\Omega$ の式へ変えます。単に「レゾルベントは有界」と言うだけでは $A\in\mathcal M$ は出ません。

<!-- proof-start -->
### 証明

まず $0\le B\le I$ とします。$Y\in\mathcal M$ に
$$
\chi(Y)=[Y\Omega,B\Omega]
=\varphi(BY)
$$
を対応させると、$B$ と $Y$ は可換なので、$Y\ge0$ では
$$
\chi(Y)=[YB^{1/2}\Omega,B^{1/2}\Omega]\ge0.
$$
同じ計算を $I-B$ に行うと $0\le\chi\le\varphi$ です。

$\alpha=(1+\lambda)^{-1}$ と置けば $\alpha+\bar\alpha=1$、$\bar\alpha=\lambda\alpha$ であり、$|\alpha|=(2\cos(\theta/2))^{-1}$。$C=C^*\in\mathcal M$、$\|C\|\le1$ に対し
$$
\chi_C(Y)=\varphi(\alpha CY+\bar\alpha YC)
$$
と置きます。$Y=Y^*$ で $\chi_C(Y)$ は実数です。自己共役単位球のコンパクト性をここで確認します。$\|C\|\le1$ ならすべての $x,y\in\mathcal H$ について $|\langle x,Cy\rangle|\le\|x\|\|y\|$ です。行列係数の値域は複素平面の閉円板であり、[FA4の直積コンパクト性定理](../../FA/FA4/index.md#thm-fa4-compact-hausdorff-product)によりそれらの直積はコンパクトです。行列係数の座標ごとの極限は、同じ評価を満たす有界な半双線形形式を定め、Rieszの表現によって一意な $C\in B(\mathcal H)$ に戻ります。したがって $B(\mathcal H)$ の単位球は弱作用素位相でコンパクトです。$\mathcal M$ は弱作用素閉で、自己共役性も行列係数の等式で閉条件となるため、$\mathcal M$ の自己共役単位球もコンパクトです。

固定した $Y$ に対して $\varphi(CY)=\langle\Omega,CY\Omega\rangle$ と $\varphi(YC)=\langle Y^*\Omega,C\Omega\rangle$ は $C$ の行列係数なので、この位相で連続です。従って $\{\chi_C\}$ は自己共役元全体を添字集合とする実数の直積空間でコンパクト・凸です。

もし $\chi$ がこの集合の外なら、有限個の座標へ射影して実有限次元の凸集合を分離することで、ある $Y=Y^*\in\mathcal M$ について
$$
\chi(Y)>\sup_{C=C^*,\,\|C\|\le1}\chi_C(Y)
$$
が成り立ちます。しかし、$Y$ の正負部分の和 $|Y|$ により $-\,|Y|\le Y\le|Y|$、正汎関数の単調性から
$$
\chi(Y)\le\chi(|Y|)\le\varphi(|Y|).
$$
[自己共役元のBorel関数計算](../../QM/QM6/index.md#def-qm6-borel-functional-calculus)で $C=\operatorname{sgn}(Y)$ と取れば、$C=C^*$、$\|C\|\le1$、$CY=YC=|Y|$ だから
$$
\chi_C(Y)=(\alpha+\bar\alpha)\varphi(|Y|)
=\varphi(|Y|).
$$
これは厳密な分離不等式と矛盾します。よってある自己共役縮小作用素 $C\in\mathcal M$ について $\chi=\chi_C$ です。

任意の $Y\in\mathcal M$ にその等式を代入し、$S(Y\Omega)=Y^*\Omega$ および $C=C^*$ を用いると
$$
[Y\Omega,B\Omega-\bar\alpha C\Omega]
=[\bar\alpha C\Omega,S(Y\Omega)].
$$
ここで右側は反線形随伴の検査式です。$S_0$ の[グラフ core 性](../AQFT21/index.md#prop-aqft21-left-regular)によって任意の $x\in\operatorname{Dom}S$ へ拡張でき、
$$
\bar\alpha C\Omega\in\operatorname{Dom}F,\qquad
F(\bar\alpha C\Omega)=B\Omega-\bar\alpha C\Omega.
$$
$S(C\Omega)=C\Omega$ と反線形性 $S(\alpha C\Omega)=\bar\alpha C\Omega$ により、$A=\alpha C$ は
$$
\Delta A\Omega=FS(A\Omega)
=F(\bar\alpha C\Omega)=B\Omega-\bar\alpha C\Omega.
$$
$\bar\alpha=\lambda\alpha$ なので
$$
(\Delta+\lambda)A\Omega=B\Omega,\quad
\|A\|\le|\alpha|.
$$

一般の $B$ は実部と虚部のそれぞれの正負部分（4つの正作用素）の線形結合で表せます。各正部分をそのノルムで正規化して上述の構成を線形結合すれば $A$ の存在と $\|A\|\le C_\theta\|B\|$ を得ます。$\Omega$ が分離的なので $A\Omega$ を決める $A$ は一意です。
<!-- proof-end -->

上の補題が、「$B\Omega$ を形式的に右から掛ける」を「$A\Omega$ という代数元を実際に作る」へ変換する第一歩です。$\operatorname{Dom}\Delta$ に関する式を使用した場所では、$FS(A\Omega)$ の定義域まで確かめました。

## 3. 二つの半べきを同時に近似する

[AQFT21のスペクトル切断](../AQFT21/index.md#lem-aqft21-spectral-core)は $\operatorname{Dom}\Delta^r$ ごとには core を与えますが、積を使える $\mathcal M\Omega$ に含まれるとは限りません。今回の証明では**代数元であり、同時に両側の半べきの定義域に属する**近似が必要です。

<a id="lem-aqft22-joint-core"></a>

<!-- formal-statement-start -->
> **補題（両側半べきに対する代数的共通core）**  
> $\mathcal D=\operatorname{Dom}\Delta^{1/2}\cap\operatorname{Dom}\Delta^{-1/2}$ に
$$
\|x\|_{\mathcal D}^2
=\|x\|^2+\|\Delta^{1/2}x\|^2+\|\Delta^{-1/2}x\|^2
$$
> を入れる。このとき $\mathcal M\Omega\cap\mathcal D$ は $\mathcal D$ で稠密である。つまり $x\in\mathcal D$ に対し $A_n\in\mathcal M$、$A_n\Omega\in\mathcal D$ が存在し、$A_n\Omega\to x$ と $\Delta^{\pm1/2}A_n\Omega\to\Delta^{\pm1/2}x$ が同時に成立する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\mathcal D$ 上の正作用素 $T=\Delta^{1/2}+\Delta^{-1/2}$ のスペクトル乗数は $r^{1/2}+r^{-1/2}\ge2$ です。従って $T^{-1}$ は全域有界で、$\operatorname{Ran}T^{-1}=\mathcal D$ です。$r>0$ ごとに計算すると
$$
\begin{aligned}
T^{-1}&=\Delta^{1/2}(1+\Delta)^{-1},\\
\Delta^{1/2}T^{-1}&=\Delta(1+\Delta)^{-1},\\
\Delta^{-1/2}T^{-1}&=(1+\Delta)^{-1}.
\end{aligned}
$$
右辺の3作用素はいずれも有界です。また両半べきの積はスペクトル切断上で恒等作用素だから
$$
\|Tx\|^2=\|\Delta^{1/2}x\|^2+\|\Delta^{-1/2}x\|^2+2\|x\|^2.
$$
[AQFT18の可換子側作用素](../AQFT18/index.md#def-aqft18-commutant-initial)から $F(B\Omega)=B^*\Omega$（$B\in\mathcal M'$）であり、[極分解](../AQFT19/index.md#thm-aqft19-polar) $F=J\Delta^{-1/2}$ により
$$
\Delta^{-1/2}B\Omega=JB^*\Omega.
$$
$\mathcal M'\Omega$ は稠密で $J$ は全射等長だから、右辺の集合も稠密です。従って任意の $x\in\mathcal D$ に対して $B_n\in\mathcal M'$ を
$$
\Delta^{-1/2}B_n\Omega\longrightarrow Tx
$$
となるよう選べます。$\lambda=1$ の[レゾルベント補題](#lem-aqft22-resolvent)により
$$
x_n=(1+\Delta)^{-1}B_n\Omega
=T^{-1}\Delta^{-1/2}B_n\Omega=A_n\Omega
\quad(A_n\in\mathcal M)
$$
です。3つの有界乗数の強連続性から、$x_n\to x$、$\Delta^{1/2}x_n\to\Delta^{1/2}x$、$\Delta^{-1/2}x_n\to\Delta^{-1/2}x$ が成立します。
<!-- proof-end -->

## 4. 二つの包含を結ぶ積分恒等式

ここでは $U_t=\Delta^{it}$ と書きます。$J\Delta J=\Delta^{-1}$ を反線形性込みで読むと $JU_t=U_tJ$ です（$J\Delta^{it}J=\Delta^{it}$ であり、$\Delta^{-it}$ **ではありません**）。

$a\in\mathcal M$、$b\in\mathcal M'$ をレゾルベント補題に従って
$$
(\Delta+\lambda)a\Omega=b\Omega
$$
となるよう対応させ、$Y=Ja^*J$ とします。次の補題は、$Y$ の有界性から $b$ を再構成するためのものです。証明中に $Y$ が $\operatorname{Dom}\Delta^{1/2}$ を保存すると仮定しません。

<a id="lem-aqft22-pairing"></a>

<!-- formal-statement-start -->
> **補題（可換子と共役作用素の二重半べき恒等式）**  
> 上の設定で、すべての $x,y\in\mathcal D$ に対して
$$
[b x,y]
=[Y\Delta^{-1/2}x,\Delta^{1/2}y]
+\lambda[Y\Delta^{1/2}x,\Delta^{-1/2}y]
$$
> が成り立つ。両辺のベクトルと内積は指定された定義域で well-defined である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $x=v\Omega$、$y=u\Omega$（$v,u\in\mathcal M$、両者は $\mathcal D$ に属す）とします。$b$ と $v$ の交換性、$\Delta=FS$ と随伴対の関係により
$$
\begin{aligned}
[bx,y]
&=[(\Delta+\lambda)a\Omega,v^*u\Omega]\\
&=[S(v^*u\Omega),Sa\Omega]+\lambda[va\Omega,u\Omega]\\
&=[v\Omega,ua^*\Omega]+\lambda[va\Omega,u\Omega].
\end{aligned}
$$
第一項では $a\Omega\in\operatorname{Dom}\Delta$ かつ $v^*u\Omega\in\operatorname{Dom}S$、$S(v^*u\Omega)=u^*v\Omega$ を使いました。一方
$$
\begin{aligned}
[Y\Delta^{-1/2}x,\Delta^{1/2}y]
&=[Ja^*Fx,Ju^*\Omega]\\
&=[au^*\Omega,Fx]\\
&=[x,S(au^*\Omega)]
=[x,ua^*\Omega].
\end{aligned}
$$
また $Y\Delta^{1/2}x=Ja^*v^*\Omega=JS(va\Omega)=\Delta^{1/2}(va\Omega)$ なので
$$
[Y\Delta^{1/2}x,\Delta^{-1/2}y]
=[va\Omega,y].
$$
ここで $\Delta^{1/2}$ と $\Delta^{-1/2}$ の左右への移動は、いったんスペクトル切断で検査してから閉作用素の積の定義域へ極限を取れます。$Y$ を非有界作用素の定義域に作用させる必要はありません。

以上を[共通core補題](#lem-aqft22-joint-core)により一般の $x,y\in\mathcal D$ へ延長します。各項は $b,Y$ の有界性と $\|\,\cdot\,\|_{\mathcal D}$ に関して連続です。
<!-- proof-end -->

積分による逆変換には、複素係数を保ったCauchy型の分母が現れます。$w(t)=2\cosh(\pi t)$、$\lambda=e^{i\theta}$、$|\theta|<\pi$ として
$$
k_\theta(t)=\frac{e^{-\theta t-i\theta/2}}{w(t)}.
$$

<a id="lem-aqft22-cosh-transform"></a>

<!-- formal-statement-start -->
> **補題（cosh核の変換と一意性）**  
> $\lambda=e^{i\theta}$（$|\theta|<\pi$）に対し、$k_\theta\in L^1(\mathbb R)$ かつ
$$
\int_{\mathbb R}k_\theta(t)r^{-it}\,dt
=\frac{\sqrt r}{r+\lambda},\qquad
\|k_\theta\|_1=\frac1{2\cos(\theta/2)}
\quad(r>0).
$$
> また $X,Y\in B(\mathcal H)$ がすべての $x,y\in\mathcal D$ について
$$
[Xx,y]
=[Y\Delta^{-1/2}x,\Delta^{1/2}y]
+\lambda[Y\Delta^{1/2}x,\Delta^{-1/2}y]
$$
> を満たすことと、
$$
Y=\int_{\mathbb R}k_\theta(t)U_{-t}XU_t\,dt
$$
> は同値である。積分は各ベクトルに作用させたBochner積分であり、$\|Y\|\le\|k_\theta\|_1\|X\|$ を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $u\in\mathbb C$、$|\operatorname{Im}u|<\pi$ とし、
$$
I(u)=\int_{\mathbb R}\frac{e^{-iut}}{2\cosh(\pi t)}\,dt.
$$
$\cosh(\pi z)$ の零点 $z=i/2$ を囲む高さ1の長方形に $e^{-iuz}/(2\cosh\pi z)$ を[CA4の留数定理](../../CA/CA4/index.md#thm-ca4-residue)に従って積分すると、$z=i/2$ の留数は $e^{u/2}/(2\pi i)$。左右の縦辺は $|\operatorname{Im}u|<\pi$ の指数減衰で消え、上辺では $\cosh(\pi(t+i))=-\cosh(\pi t)$ と $e^{-iu(t+i)}=e^ue^{-iut}$ を用います。上下辺の向きを考慮すると
$$
(1+e^u)I(u)=e^{u/2},\quad
I(u)=\frac1{2\cosh(u/2)}.
$$
$u=\log r-i\theta$ を代入し、$e^{-i\theta/2}$ を掛ければ
$$
\int k_\theta(t)r^{-it}dt
=\frac{e^{(\log r-i\theta)/2}e^{-i\theta/2}}
{1+e^{\log r-i\theta}}
=\frac{\sqrt r}{r+e^{i\theta}}.
$$
最後の分母・位相は複素数 $e^{i\theta}$ を掛けて整理したものです。$r=1$ と絶対値を取る計算から $\int e^{-\theta t}/w(t)dt=(2\cos(\theta/2))^{-1}$。

逆変換は $E_n=\boldsymbol1_{[1/n,n]}(\Delta)$ で両辺を挟んで証明します。$E_n\mathcal H$ 上の $\Delta_n$ は有界可逆で、内積恒等式は
$$
\Delta_n^{1/2}X_n\Delta_n^{1/2}
=\Delta_nY_n+\lambda Y_n\Delta_n
$$
に等価です。有限スペクトルの場合、固有値 $r_i,r_j$ の行列ブロックでは
$$
(r_i+\lambda r_j)(Y_n)_{ij}
=\sqrt{r_ir_j}(X_n)_{ij}.
$$
提案した積分の係数は
$$
\int k_\theta(t)(r_i/r_j)^{-it}dt
=\frac{\sqrt{r_ir_j}}{r_i+\lambda r_j},
$$
なので各ブロックが一致します。一般の有界 $\Delta_n$ は区間 $[1/n,n]$ 上で階段関数により作用素ノルム近似でき、指数関数・平方根・積分の収束は $|k_\theta|$ を支配関数として示せます。

一意性は $Z$ が $\Delta_nZ+\lambda Z\Delta_n=0$ を満たすとき、$c=e^{-i\theta/2}$ として
$$
\frac d{ds}\left(e^{-cs\Delta_n}Ze^{-c\lambda s\Delta_n}\right)=0
$$
である一方、$\operatorname{Re}c=\operatorname{Re}(c\lambda)=\cos(\theta/2)>0$ により $s\to\infty$ で両指数が零に収束することから従います。$E_nYE_n\to Y$ は強収束で、半べきも $\mathcal D$ 上でグラフ収束するので、切断を外せます。
<!-- proof-end -->

以上の二補題から、$b\in\mathcal M'$ と対応する $a$ に対し
$$
Ja^*J=\int k_\theta(t)\,U_{-t}bU_t\,dt.
$$
反ユニタリで挟む際には係数が共役されます。$B_t=JU_{-t}bU_tJ$ と置くと、**作用素としての式（I）** は
$
a^*=\int\overline{k_\theta(t)}\,B_t\,dt.
$$
一方 $a\Omega=(\Delta+\lambda)^{-1}b\Omega$ と $S(a\Omega)=a^*\Omega$、[cosh積分](#lem-aqft22-cosh-transform)を関数計算へ適用すると
**ベクトルとしての式（II）** は
$
a^*\Omega
=J\Delta^{1/2}(\Delta+\lambda)^{-1}b\Omega
=\int\overline{k_\theta(t)}\,JU_{-t}b\Omega\,dt.
$$
ここには**作用素 $a^*$ の式（I）** と、**その $\Omega$ への作用の式（II）** の二種類があります。両式を比較すると可換子との交換性が引き出せます。

## 5. Tomitaの可換子定理

<a id="thm-aqft22-commutant"></a>

<!-- formal-statement-start -->
> **定理（Tomitaの可換子定理）**  
> $\mathcal H$ を複素Hilbert空間、$\mathcal M\subset B(\mathcal H)$ を単位的von Neumann環、$\Omega\in\mathcal H$ を巡回・分離的な単位ベクトルとする。[Tomita作用素](../AQFT18/index.md#def-aqft18-tomita-initial)の閉包 $S=J\Delta^{1/2}$ に付随する反ユニタリ対合 $J$ は
$$
\boxed{J\mathcal M J=\mathcal M'}
$$
> を満たす。これは標準対の一般定理であり、有限次元性・factor性・traceの存在を仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

最初に $J\mathcal M'J\subset\mathcal M$ をレゾルベントと積分の一意性から得ます。その後、$S$ と $F=S^\sharp$ の定義域を保った内積計算を行い $J\mathcal M J\subset\mathcal M'$ を示します。両者は論理的に別の包含です。

<!-- proof-start -->
### 証明

**第一の包含。** $b,d\in\mathcal M'$ を任意に固定します。$a^*\in\mathcal M$ は $d$ と交換するので、（I）を $d\Omega$ に作用させ、（II）の両辺へ $d$ を作用させたものを引きます。$w(t)=2\cosh\pi t$、$\overline{k_\theta(t)}=e^{-\theta t+i\theta/2}/w(t)$ を使い、非零の共通位相を除くと
$$
\int_{\mathbb R}\frac{e^{-\theta t}}{w(t)}
\bigl(B_td\Omega-dJU_{-t}b\Omega\bigr)\,dt=0
\qquad(-\pi<\theta<\pi).
$$
括弧のベクトルを $v(t)$ とします。$\|v(t)\|\le2\|b\|\|d\|$ であり、$U_t$ の強連続性から $v(t)$ は連続です。任意の $\eta\in\mathcal H$ に対し
$$
G_\eta(z)=\int_{\mathbb R}
\frac{e^{-zt}}{w(t)}[v(t),\eta]\,dt
\quad(|\operatorname{Re}z|<\pi)
$$
は、$e^{-(z-z_0)t}$ を冪級数展開し $e^{r|t|}/w(t)$ で項別積分を正当化すれば正則です。実軸上の値は先の等式により零なので、正則関数の一致定理により帯全体で零。$z=is$ とすれば
$$
\int_{\mathbb R}e^{-ist}\frac{[v(t),\eta]}{w(t)}\,dt=0
\quad(s\in\mathbb R).
$$
ここで使うFourier変換の一意性は、Gaussianによる近似単位を作用させると示せます。具体的に被積分関数 $f(t)=[v(t),\eta]/w(t)$ は連続かつ絶対可積分で、変換が恒等的に零なら
$$
(f*g_\varepsilon)(u)=
\frac1{2\pi}\int_{\mathbb R}e^{isu}
e^{-\varepsilon s^2}\widehat f(s)\,ds=0,
\quad
g_\varepsilon(t)=\frac{e^{-t^2/(4\varepsilon)}}{\sqrt{4\pi\varepsilon}}.
$$
$g_\varepsilon$ が近似単位だから $(f*g_\varepsilon)(u)\to f(u)$、よって $f=0$ です。$\eta$ の任意性と $w(t)>0$ から $v(t)=0$。$\Omega$ は $J$ と $U_t$ に固定されるため
$$
B_t\Omega=JU_{-t}b\Omega,\qquad
B_td\Omega=dB_t\Omega.
$$
$d_1,d_2\in\mathcal M'$ にこの等式を $d_1d_2$、次に $d_2$ へ適用すると
$$
B_td_1d_2\Omega=d_1B_td_2\Omega.
$$
$\mathcal M'\Omega$ が稠密なので $B_td_1=d_1B_t$ が全空間で成立します。従って $B_t\in(\mathcal M')'=\mathcal M$。特に $t=0$ では
$$
J\mathcal M'J\subset\mathcal M. \tag{3}
$$

**第二の包含。** $a,y\in\mathcal M$、$b\in\mathcal M'$ とし、(3) により $c=JbJ\in\mathcal M$ と置きます。$a^*c^*\Omega\in\operatorname{Dom}S$、$J(a^*c^*\Omega)\in\operatorname{Dom}F$ であり、$y^*\Omega\in\operatorname{Dom}S$ です。[極分解の随伴関係](../AQFT19/index.md#thm-aqft19-modular-relations) $FJ=JS$ と [反線形随伴](../AQFT18/index.md#def-aqft18-antilinear-adjoint)の関係を使うと
$$
\begin{aligned}
[yJa\Omega,b^*\Omega]
&=[bJa\Omega,y^*\Omega]\\
&=[Jca\Omega,y^*\Omega]\\
&=[JS(a^*c^*\Omega),y^*\Omega]\\
&=[FJa^*Jb^*\Omega,y^*\Omega]\\
&=[S(y^*\Omega),Ja^*Jb^*\Omega]\\
&=[JaJy\Omega,b^*\Omega].
\end{aligned}
$$
定義域を確認すると、$a^*c^*\Omega\in\mathcal M\Omega\subset\operatorname{Dom}S$ です。$S(a^*c^*\Omega)=ca\Omega$、$c^*=Jb^*J$ および $J\Omega=\Omega$ より、$Ja^*Jb^*\Omega=J(a^*c^*\Omega)\in\operatorname{Dom}F$。また $y^*\Omega\in\operatorname{Dom}S$ なので、上の反線形随伴の移項はすべて定義されています。

$\mathcal M'\Omega$ が稠密だから
$$
yJa\Omega=(JaJ)y\Omega.
$$
$\Omega=J\Omega$ を用いると $(JaJ)\Omega=Ja\Omega$ なので、$y=y_1y_2$ の式と $y=y_2$ の式を比べて $y_1(JaJ)y_2\Omega=(JaJ)y_1y_2\Omega$。$\mathcal M\Omega$ の稠密性から $JaJ\in\mathcal M'$。すなわち
$$
J\mathcal M J\subset\mathcal M'. \tag{4}
$$
(3) を $J$ で共役すると $ \mathcal M'\subset J\mathcal M J$。これと (4) を合わせて等号を得ます。
<!-- proof-end -->

**注意。** 上の第一包含では、実は各 $t$ で $JU_{-t}\mathcal M'U_tJ\subset\mathcal M$ まで得ています。これを共役し $\pm t$ と可換子を使うと、モジュラー流が代数を保つという結論にも到達します。ただし自己同型群の連続性と解析的代数元、作用の細部は[AQFT23](../AQFT23/index.md)で整理します（次講の本文完成前には既習結果として援用しません）。

## 6. 定理の意味と誤用の防止

この定理は、$J$ が右側の有界な作用をすべて作り出すという主張です。$A\Omega\mapsto AB\Omega$ のような**代数的右乗算の有界性**を言うものではありません。先に見た[AQFT21の反例](../AQFT21/index.md#prop-aqft21-right-unbounded)と矛盾しません。また、局所代数を考える場合、$\mathcal M(O)'$ は**全Hilbert空間での可換子**であり、因果補集合側の局所代数 $\mathcal M(O')$ と同じだとは限りません。[Haag双対性の条件](../AQFT14/index.md)を別に確認する必要があります。

無限次元の確認例として、Hilbert–Schmidt空間 $\mathsf{HS}(\ell^2)$ 上の左乗算 $\mathcal M=L(B(\ell^2))$、忠実で零へ減衰する $\rho$ と $\Omega=\rho^{1/2}$ を取ると、$J(X)=X^*$ です。$JL_AJ=R_{A^*}$ は有界で、$T\in L(B(\ell^2))'$ が全てのランク1左乗算と交換することを行列単位に当てると $T$ の各列・行の作用が右からの一つの有界作用素に一致します。これに対し[AQFT21で定義した非有界な $T_V$](../AQFT21/index.md#prop-aqft21-right-unbounded)は $R_V$ とは別です。

## 7. 演習と詳細解答

### Level A：共役と定義域を手で確かめる

<a id="ex-aqft22-a01"></a>
#### AQFT22-A01 共役による積と係数
$J$ を反ユニタリ対合とし、$A,B\in B(\mathcal H)$、$\alpha\in\mathbb C$ とする。$J(\alpha A+B)J$、$J(AB)J$、$(JAJ)^*$ を計算せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $J(\alpha A+B)Jx=J(\alpha AJx+BJx)=\bar\alpha JAJx+JBJx$ なので $J(\alpha A+B)J=\bar\alpha JAJ+JBJ$。$J^2=I$ を間に挿入して $(JAJ)(JBJ)=JA(JJ)BJ=JABJ$。反ユニタリ性から $[JAJx,y]=[Jx,A^*Jy]$ と移項できるため $(JAJ)^*=JA^*J$。従って共役代数は積と随伴を保ちますが複素線形の写像ではありません。
<!-- solution-end -->

<a id="ex-aqft22-a02"></a>
#### AQFT22-A02 両包含が必要な理由
$\mathcal H=\mathbb C^2$、$\mathcal A=\mathbb CI$、$\mathcal B=\{\operatorname{diag}(s,t):s,t\in\mathbb C\}$ とする。$\mathcal A\subset\mathcal B$ と逆包含を判定し、集合の包含一方向だけで等号は言えるか答えよ。

- Level: A

<!-- solution-start -->
**詳細解答。** 任意の $zI=\operatorname{diag}(z,z)$ は $\mathcal B$ に入るため $\mathcal A\subset\mathcal B$。しかし $\operatorname{diag}(1,0)\in\mathcal B$ は $zI$ と表せないので逆包含は成立しません。従って $J\mathcal M J\subset\mathcal M'$ という一方向のみから等号を結論できないことが分かります。
<!-- solution-end -->

<a id="ex-aqft22-a03"></a>
#### AQFT22-A03 レゾルベントの係数
$\Delta=\operatorname{diag}(4,1/4)$、$\lambda=1$ とし、$x=(2,3)$ とする。$(\Delta+1)^{-1}x$ とその $\Delta$ による像を求め、和が $x$ になることを確認せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $\Delta+1=\operatorname{diag}(5,5/4)$ より逆は $\operatorname{diag}(1/5,4/5)$。したがって $y=(2/5,12/5)$。$\Delta y=(8/5,3/5)$ なので $\Delta y+y=(10/5,15/5)=(2,3)=x$。$\Delta$ はここでは有界ですが、一般の非有界 $\Delta$ でもレゾルベントの像は $\operatorname{Dom}\Delta$ に入ることが必要です。
<!-- solution-end -->

<a id="ex-aqft22-a04"></a>
#### AQFT22-A04 反線形な虚べきの共役
$\Delta E_{12}=3E_{12}$、$\Delta E_{21}=\frac13E_{21}$、$JE_{12}=E_{21}$ とし、$J$ は反線形とする。$J\Delta^{it}E_{12}$ と $\Delta^{it}JE_{12}$ を比べよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $J(3^{it}E_{12})=3^{-it}E_{21}$ です。もう一方は $\Delta^{it}E_{21}=(1/3)^{it}E_{21}=3^{-it}E_{21}$。従って一致します。$\Delta$ の固有値が逆数になり、$J$ が複素係数を共役する効果を**両方**数える必要があります。
<!-- solution-end -->

### Level B：核心補題を具体化する

<a id="ex-aqft22-b01"></a>
#### AQFT22-B01 二準位レゾルベントの全行列
$\rho=\operatorname{diag}(p,q)$、$p,q>0$、$p+q=1$、$\Omega=\rho^{1/2}$、$\Delta(X)=\rho X\rho^{-1}$ とする。$B=R_C$、$C=(c_{ij})\in M_2(\mathbb C)$、$\lambda=e^{i\theta}$（$|\theta|<\pi$）に対し、$(\Delta+\lambda)A\Omega=B\Omega$ を成分で解け。

- Level: B

<!-- solution-start -->
**詳細解答。** $A\Omega=A\rho^{1/2}$ より $(A\Omega)_{ij}=a_{ij}\sqrt{p_j}$（$p_1=p,p_2=q$）。$B\Omega=\rho^{1/2}C$ なので $(B\Omega)_{ij}=\sqrt{p_i}c_{ij}$。$\Delta E_{ij}=(p_i/p_j)E_{ij}$ を代入して
$$
\left(\frac{p_i}{p_j}+\lambda\right)a_{ij}\sqrt{p_j}
=\sqrt{p_i}c_{ij}.
$$
従って
$$
a_{ij}=\frac{\sqrt{p_ip_j}}{p_i+\lambda p_j}\,c_{ij}.
$$
$p_i,p_j>0$ で $-\lambda$ が正実軸上にないため分母は非零です。有限次元なので全 $A$ が有界であり、一般の[レゾルベント補題](#lem-aqft22-resolvent)と一致します。
<!-- solution-end -->

<a id="ex-aqft22-b02"></a>
#### AQFT22-B02 共通coreのグラフノルム
$\mathcal H=\ell^2(\mathbb N)$、$\Delta e_j=j^2e_j$ とする。$\mathcal D=\operatorname{Dom}\Delta^{1/2}\cap\operatorname{Dom}\Delta^{-1/2}$ を級数で書き、有限支え切断 $P_nx=\sum_{j\le n}x_je_j$ が $\|\,\cdot\,\|_{\mathcal D}$ で収束することを示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** $\Delta^{1/2}e_j=je_j$、$\Delta^{-1/2}e_j=j^{-1}e_j$ なので
$$
\mathcal D=\left\{x:\sum_{j\ge1}(1+j^2+j^{-2})|x_j|^2<\infty\right\}.
$$
$x\in\mathcal D$ に対して
$$
\|x-P_nx\|_{\mathcal D}^2
=\sum_{j>n}(1+j^2+j^{-2})|x_j|^2\to0
$$
です。一般の標準対ではこの近似が $\mathcal M\Omega$ に入るとは限らないので、[共通core補題](#lem-aqft22-joint-core)ではレゾルベントを別途用いた点が重要です。
<!-- solution-end -->

<a id="ex-aqft22-b03"></a>
#### AQFT22-B03 cosh積分の係数を確かめる
$\theta=0$、$r=4$ とする。$\int_{\mathbb R}r^{-it}/(2\cosh\pi t)\,dt$ を[cosh核補題](#lem-aqft22-cosh-transform)で計算し、$r\mapsto r^{-1}$ での値を比較せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $\theta=0$ の補題より $\sqrt r/(r+1)$。$r=4$ では $2/5$ です。$r^{-1}=1/4$ では $(1/2)/(5/4)=2/5$。$r\mapsto r^{-1}$ で同じ値になるのは
$$
\frac{\sqrt{1/r}}{1+1/r}=\frac{\sqrt r}{1+r}
$$
だからであり、核が偶関数であることとも整合します。
<!-- solution-end -->

<a id="ex-aqft22-b04"></a>
#### AQFT22-B04 Fourierの一意性でどこまで言えるか
連続な有界ベクトル値関数 $v:\mathbb R\to\mathcal H$ が、任意の $|\theta|<\pi$ について $\int e^{-\theta t}v(t)/(2\cosh\pi t)\,dt=0$ を満たすとする。$v(t)=0$ の証明の要点を、解析接続・Fourier変換・近似単位の3段に分けよ。

- Level: B

<!-- solution-start -->
**詳細解答。** 任意の $\eta$ でスカラー化し、$G_\eta(z)=\int e^{-zt}[v(t),\eta]/w(t)\,dt$ を作ります。$w(t)^{-1}$ の指数減衰が $|\operatorname{Re}z|<\pi$ で局所一様な積分支配を与えるため正則です。実軸上で零なので一致定理から $z=is$ でも零。すなわち $f_\eta(t)=[v(t),\eta]/w(t)$ のFourier変換は全周波数で零です。Gaussian近似単位 $g_\varepsilon$ に対して $f_\eta*g_\varepsilon=0$、しかも連続性から $f_\eta*g_\varepsilon(u)\to f_\eta(u)$、よって $f_\eta=0$。$\eta$ の任意性と $w>0$ から $v=0$。**1点 $\theta=0$ の積分が零**というだけでは十分ではありません。
<!-- solution-end -->

### Level C：一般定理と反例をつなぐ

<a id="ex-aqft22-c01"></a>
#### AQFT22-C01 二つの包含から一般等号まで
標準対 $(\mathcal M,\Omega)$ について (i) $J\mathcal M'J\subset\mathcal M$、(ii) $J\mathcal M J\subset\mathcal M'$ が示されたとする。$J^2=I$ を用いて等号を導け。また (i) と (ii) のそれぞれが本文のどの計算に依存するか説明せよ。

- Level: C

<!-- solution-start -->
**詳細解答。** (i) を $J$ で左右から共役すると $J(J\mathcal M'J)J\subset J\mathcal M J$。$J^2=I$ より $\mathcal M'\subset J\mathcal M J$ です。(ii) と合わせて $\mathcal M'\subset J\mathcal M J\subset\mathcal M'$、従って等号です。(i) はレゾルベント元 $a\in\mathcal M$ を構成し、積分表示 (1) と (2) の差のLaplace型積分を全 $\theta$ で消し、Fourier一意性から $JU_{-t}bU_tJ\in\mathcal M$ とする部分に依存します。(ii) は (i) が保証する $c=JbJ\in\mathcal M$ を使った随伴の内積計算に依存します。一般の定理を証明する際、有限次元の右乗算表示は使っていません。
<!-- solution-end -->

<a id="ex-aqft22-c02"></a>
#### AQFT22-C02 有界な右側の作用と非有界な右乗算
$\mathsf{HS}(\ell^2)$ 上の $\mathcal M=L(B(\ell^2))$ と $\Omega=\rho^{1/2}$ を考える。$\rho=\operatorname{diag}(c2^{-j^2})$、$V e_j=e_{j+1}$ とし、$T_V(A\Omega)=AV\Omega$ と $R_V(X)=XV$ を比較せよ。$J\mathcal M J=\mathcal M'$ と両立することをノルム評価まで示せ。

- Level: C

<!-- solution-start -->
**詳細解答。** $A=E_{1j}$（$j\ge2$）とすると、$E_{1j}V=E_{1,j-1}$。$x_j=E_{1j}\Omega/\sqrt{p_j}$ は単位ベクトルですが、
$$
\|T_Vx_j\|_2^2=\frac{p_{j-1}}{p_j}=2^{2j-1}\to\infty.
$$
従って $T_V$ は $\mathcal H$ 上の有界作用素ではありません。一方
$$
\|R_V(X)\|_2^2=\operatorname{Tr}(V^*X^*XV)
\le\|V\|^2\operatorname{Tr}(X^*X)=\|X\|_2^2
$$
です（無限次元でもHilbert–Schmidtの右側作用は有界）。$\mathcal M$ と交換するのは $R_V$ であり、$J L_{V^*}J=R_V$ がその具体式です。定理の右辺 $\mathcal M'$ は**有界な可換子**であるため、非有界な $T_V$ を含まず、矛盾はありません。
<!-- solution-end -->

## 8. 次講への接続

得られた等号 $J\mathcal M J=\mathcal M'$ は、実際の時空領域の因果補集合との等号を自動的には意味しません。さらに本証明の積分部は $JU_{-t}\mathcal M'U_tJ\subset\mathcal M$ という強い情報を含んでいます。次講[AQFT23「Takesakiのモジュラー不変性」](../AQFT23/index.md)では、これを $\Delta^{it}$ の自己同型群へ整理し、解析的元を $\mathcal M$ 内で構成して、強連続性と各定義域の適用条件を検証します。

### 参考資料

- M. Takesaki, *Theory of Operator Algebras II*, モジュラー理論の章。
- J. Sorce, [A short proof of Tomita's theorem](https://arxiv.org/abs/2309.16762), *Journal of Functional Analysis* **286** (2024) 110420。
- [Modular time from a faithful normal state](https://kokunoyumeto.github.io/open-math-courses-public/courses/OA-MOD/OA-MOD-FS.html), 公開講義資料（有界レゾルベントとcosh核による証明経路）。