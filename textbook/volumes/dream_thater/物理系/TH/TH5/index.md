# TH5 熱力学ポテンシャルとLegendre変換

[TH4の基本関係式](../TH4/index.md#prop-th4-fundamental-fixed-n)では、物質量を固定すれば内部エネルギーの自然な独立変数はエントロピー $S$ と体積 $V$ でした。しかし実験では、$S$ を指定するより熱浴の温度 $T$ を指定し、$V$ の代わりに外圧 $p$ を指定する方が自然な場合があります。独立変数を変えるたびに熱力学の法則を作り直す必要はありません。**変数に適した状態関数を作り、その全微分の係数から物理量を読む**のが本章の方法です。

この章で扱うのは単一成分・単相の単純圧縮平衡系です。物質量 $N>0$ は mol 単位で表し、温度は $T>0$、体積は $V>0$ とします。微分を取る領域では状態関数が必要な次数だけ滑らかであり、独立な平衡変数として使える局所領域を明示します。実際の不可逆過程で出入りする熱と仕事を、状態関数の全微分と混同しません。

## 1. 状態関数の独立変数を交換する

[TH4で定義した化学ポテンシャル](../TH4/index.md#def-th4-chemical-potential)を含む拡張基本関係を、この章の出発点とします。物質量可変を考える場合、この式は物質移動のある実過程のエネルギー収支から無条件に導くものではなく、平衡基本関係についての追加仮定です。

$$
dU=T\,dS-p\,dV+\mu\,dN.
$$

例えば、温度 $T$ を独立に指定したいときは $T=(\partial U/\partial S)_{V,N}$ を使って $S$ を $T,V,N$ の関数として解き直します。その際、元の $U$ の全微分に残る $T\,dS$ を打ち消すため、積 $TS$ を差し引きます。この「微分係数を新しい変数へ交換する」という操作を先に一変数で確かめます。

<a id="def-th5-legendre"></a>

<!-- formal-statement-start -->
> **定義（局所Legendre変換）**  
> $x$ と他の変数 $y$ の開領域で、$C^2$ 級関数 $f(x,y)$ が与えられているとする。$q=f_x(x,y)$ であり、考える点で $f_{xx}\ne0$ とする。近傍で $x=x(q,y)$ と解けるとき、その変数交換に対応する関数を

$$
\mathcal L_x f(q,y)=f(x(q,y),y)-q\,x(q,y)
$$

> と定義する。ここで用いる符号は熱力学での変数交換に合わせたものである。複数の変数を同時に交換するときは、変換する変数の組から共役変数の組への写像が**一組として局所可逆**であることを要する。個々の偏微分が非零という条件だけでは、連立した逆写像の存在を保証しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-th5-legendre -->
### 例：二次関数を変数交換する

**定義の確認**：$f(x,y)=ax^2/2+by^2$ とし $a\ne0$ とします。$q=f_x=ax$、$f_{xx}=a\ne0$ なので $x=q/a$ がただ一つ決まります。代入すると

$$
\mathcal L_x f(q,y)
=\frac{q^2}{2a}+by^2-\frac{q^2}{a}
=-\frac{q^2}{2a}+by^2.
$$

元の関数の $x$ 方向の微分係数が新しい変数 $q$ になり、変換後の $q$ 微分は $-q/a=-x$ となります。
<!-- definition-example-end -->

<a id="prop-th5-legendre-differential"></a>

<!-- formal-statement-start -->
> **命題（Legendre変換の全微分）**  
> 前定義の仮定の下で $g(q,y)=f(x(q,y),y)-qx(q,y)$ とすると、

$$
dg=-x\,dq+f_y\,dy,
\qquad
g_q=-x,\quad g_y=f_y
$$

> が成立する。$f_y$ は変換前の点 $(x(q,y),y)$ で評価する。
<!-- formal-statement-end -->

### 証明の見取り図

積の微分で出る二つの $dx$ が相殺されます。ここで相殺されるのは $f_x=q$ という定義を満たす場合だけです。

<!-- proof-start -->
### 証明

合成関数として $f(x(q,y),y)$ を微分し、次に積 $qx(q,y)$ を微分します。

$$
dg=f_x\,dx+f_y\,dy-q\,dx-x\,dq.
$$

定義から $f_x=q$ なので、$f_x\,dx-q\,dx=(f_x-q)\,dx=0$ です。この相殺により

$$
dg=-x\,dq+f_y\,dy.
$$

局所座標 $(q,y)$ について全微分の係数を比較すれば $g_q=-x$、$g_y=f_y$ です。局所可逆性も確認すると、$(x,y)\mapsto(f_x(x,y),y)$ の微分行列は

$$
\begin{pmatrix}
f_{xx}&f_{xy}\\
0&1
\end{pmatrix},
\qquad \det=f_{xx}\ne0.
$$

したがって考える点の近傍で $(q,y)$ から $(x,y)$ を一意に復元でき、前述の係数比較が正当化されます。$f_{xx}=0$ の点にはこの根拠をそのまま適用できません。
<!-- proof-end -->

**失敗例**：$f(x,y)=a x+h(y)$ なら $q=f_x=a$ は $x$ によらず、$f_{xx}=0$ です。異なる $x$ が同じ $q$ に潰れ、$x=x(q,y)$ が一意に定まりません。上の証明の係数相殺という計算は形式的に残っても、新しい独立変数を持つ関数としては構成できないのです。

## 2. 温度や圧力を固定するときの四つの関数

独立変数を切り替えるときに使う状態関数が、Helmholtz自由エネルギー $F$、エンタルピー $H$、Gibbs自由エネルギー $G$ です。まずは定義そのものを確認しましょう。

<a id="def-th5-potentials"></a>

<!-- formal-statement-start -->
> **定義（熱力学ポテンシャル）**  
> 単一成分の平衡状態で $U,S,V,T,p$ が定まるとき、エンタルピー、Helmholtz自由エネルギー、Gibbs自由エネルギーをそれぞれ

$$
H=U+pV,\qquad F=U-TS,\qquad
G=U-TS+pV
$$

> と定義する。これらは状態量の組合せであり、その定義だけで各変数組が独立座標になることまでは主張しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-th5-potentials -->
### 例：差し引く項の符号を確かめる

**定義の確認**：ある平衡状態で $U=100\,\mathrm J$、$TS=30\,\mathrm J$、$pV=20\,\mathrm J$ とします。単位がすべてエネルギーなので加減が可能であり、

$$
H=120\,\mathrm J,\quad F=70\,\mathrm J,\quad G=90\,\mathrm J
$$

となります。$G=F+pV=H-TS$ のどちらで計算しても $90\,\mathrm J$ です。これらの値がただちに取り出せる仕事の量を意味するわけではありません。
<!-- definition-example-end -->

<a id="prop-th5-natural-variables"></a>

<!-- formal-statement-start -->
> **命題（四つのポテンシャルの自然変数）**  
> 単一成分・単相の平衡系で $U(S,V,N)$ が $C^2$ 級、$S,V,N$ が局所独立で、[拡張基本関係](../TH4/index.md#def-th4-chemical-potential)が成り立つとする。各組 $(T,V,N)$、$(S,p,N)$、$(T,p,N)$ が対象近傍の独立局所座標として成立する場合、対応するポテンシャルの全微分は

$$
\begin{aligned}
dU&=T\,dS-p\,dV+\mu\,dN,\\
dF&=-S\,dT-p\,dV+\mu\,dN,\\
dH&=T\,dS+V\,dp+\mu\,dN,\\
dG&=-S\,dT+V\,dp+\mu\,dN.
\end{aligned}
$$

> したがって $F$ の自然変数は $(T,V,N)$、$H$ は $(S,p,N)$、$G$ は $(T,p,N)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

[Legendre変換の微分](#prop-th5-legendre-differential)と同じ相殺を、$TS$ と $pV$ の二種類の積に対して行います。圧力の共役量は $-p$ なので、圧力を新しい変数にするときは **$+pV$** を加えます。

<!-- proof-start -->
### 証明

まず $F=U-TS$ について、積の微分 $d(TS)=T\,dS+S\,dT$ を用います。[拡張基本関係](../TH4/index.md#def-th4-chemical-potential)へ代入すると

$$
\begin{aligned}
dF&=dU-T\,dS-S\,dT\\
&=(T\,dS-p\,dV+\mu\,dN)-T\,dS-S\,dT\\
&=-S\,dT-p\,dV+\mu\,dN.
\end{aligned}
$$

次に $H=U+pV$ では $d(pV)=p\,dV+V\,dp$ です。従って

$$
\begin{aligned}
dH&=dU+p\,dV+V\,dp\\
&=T\,dS-p\,dV+\mu\,dN+p\,dV+V\,dp\\
&=T\,dS+V\,dp+\mu\,dN.
\end{aligned}
$$

最後に $G=F+pV$ とおき、先ほど求めた $dF$ を代入します。

$$
\begin{aligned}
dG&=dF+p\,dV+V\,dp\\
&=(-S\,dT-p\,dV+\mu\,dN)+p\,dV+V\,dp\\
&=-S\,dT+V\,dp+\mu\,dN.
\end{aligned}
$$

それぞれの全微分の右辺で $dT,dV,dN$ などを独立に変化させられる局所座標の仮定の下で、係数が偏微分に一致します。
<!-- proof-end -->

たとえば $F$ については

$$
S=-\left(\frac{\partial F}{\partial T}\right)_{V,N},\qquad
p=-\left(\frac{\partial F}{\partial V}\right)_{T,N},\qquad
\mu=\left(\frac{\partial F}{\partial N}\right)_{T,V}.
$$

$G$ についても $S=-G_T$、$V=G_p$、$\mu=G_N$ です。添字は常に**残る二変数を固定する条件**を表します。$T$ を固定しないまま $F$ を $V$ で微分しても、圧力が得られるとは限りません。

### 局所的に変数交換できる条件

$U$ を $(S,V,N)$ の関数とする場合、$F$ への交換には $(\partial T/\partial S)_{V,N}=U_{SS}\ne0$ が十分です。$H$ には $(\partial p/\partial V)_{S,N}=-U_{VV}\ne0$ が十分です。$G$ で $S,V$ を同時に $T,p$ へ交換するときは、$N$ を固定した写像 $(S,V)\mapsto (T,p)$ 全体の可逆性を調べます。[拡張基本関係](../TH4/index.md#def-th4-chemical-potential)による $T=U_S$、$p=-U_V$ から各成分を微分すると

$$
\frac{\partial(T,p)}{\partial(S,V)}
=
\begin{pmatrix}
T_S&T_V\\
p_S&p_V
\end{pmatrix}
=
\begin{pmatrix}
U_{SS}&U_{SV}\\
-U_{VS}&-U_{VV}
\end{pmatrix}.
$$

$U$ が $C^2$ 級なので $U_{VS}=U_{SV}$ です。$2\times2$ 行列の対角成分の積から、もう一方の二成分の積を差し引くと

$$
\begin{aligned}
\det\frac{\partial(T,p)}{\partial(S,V)}
&=U_{SS}(-U_{VV})-U_{SV}(-U_{VS})\\
&=-U_{SS}U_{VV}+U_{SV}^{\,2}\\
&=-\bigl(U_{SS}U_{VV}-U_{SV}^{\,2}\bigr).
\end{aligned}
$$

この値が非零なら、$(T,p)$ を局所独立座標として採用できます。例えば $U_{SS}$ と $U_{VV}$ が個別に非零でも $U_{SS}U_{VV}=U_{SV}^{\,2}$ なら、二変数を同時に交換することはできません。実際、物質量 $N$ を固定し、エネルギーの尺度 $E_*>0$、エントロピーの尺度 $S_*>0$、体積の尺度 $V_*>0$ を定数とする数学的模型を考えます。

$$
U(S,V,N)=\frac{E_*}{2}
\left(\frac{S}{S_*}-\frac{V}{V_*}\right)^2,
\qquad \frac{S}{S_*}>\frac{V}{V_*}>0.
$$

この形なら括弧内は無次元であり、$U$ はエネルギーの単位を持ちます。$z=S/S_*-V/V_*>0$ と置いて偏微分すると

$$
T=\frac{E_*}{S_*}z>0,\qquad
p=\frac{E_*}{V_*}z>0,
$$

$$
U_{SS}=\frac{E_*}{S_*^2},\qquad
U_{VV}=\frac{E_*}{V_*^2},\qquad
U_{SV}=-\frac{E_*}{S_*V_*}.
$$

したがって $U_{SS}U_{VV}-U_{SV}^2=0$ で、$p=(S_*/V_*)T$ という拘束が常に残ります。対角成分は正でも $T$ と $p$ を独立に指定できません。これは同時変換の可逆性を調べるための数学的模型であり、安定な物質の構成を意図していません。

この条件は全ての状態で自動的に成り立つものではありません。特に相転移近傍で単一の滑らかな座標表示が破れる場合、形式的な微分式を大域的に使わないことが重要です。凸性や安定性との関連はTH6で検討します。

## 3. Maxwell関係式を偏微分の交換から作る

$F$ の全微分を知れば、エントロピーの体積依存と圧力の温度依存が無関係ではないと分かります。別々に測定できる応答量を、同じ関数の二階微分として比較できる点が強力です。

<a id="thm-th5-maxwell"></a>

<!-- formal-statement-start -->
> **定理（Maxwell関係式）**  
> 前節の各ポテンシャルが記載した自然変数の開領域上で $C^2$ 級であり、各変数が局所独立とする。このとき単一成分系では次の四関係が成立する。すべての偏微分では $N$ を固定する。

$$
\begin{aligned}
\left(\frac{\partial T}{\partial V}\right)_{S,N}
&=-\left(\frac{\partial p}{\partial S}\right)_{V,N},\\
\left(\frac{\partial S}{\partial V}\right)_{T,N}
&=\left(\frac{\partial p}{\partial T}\right)_{V,N},\\
\left(\frac{\partial T}{\partial p}\right)_{S,N}
&=\left(\frac{\partial V}{\partial S}\right)_{p,N},\\
\left(\frac{\partial S}{\partial p}\right)_{T,N}
&=-\left(\frac{\partial V}{\partial T}\right)_{p,N}.
\end{aligned}
$$
<!-- formal-statement-end -->

### 証明の見取り図

各ポテンシャルの自然変数に関する混合二階偏微分を二通りの順序で計算します。例えば $F_T=-S$、$F_V=-p$ なので $F_{TV}=F_{VT}$ が二番目の式を生みます。微分の順序を交換するには $C^2$ 級が必要です。

<!-- proof-start -->
### 証明

[自然変数の命題](#prop-th5-natural-variables)により、$N$ 固定で $U_S=T$、$U_V=-p$、$F_T=-S$、$F_V=-p$、$H_S=T$、$H_p=V$、$G_T=-S$、$G_p=V$ です。それぞれを、保持している**同じ独立変数**で再び微分します。

$$
\begin{aligned}
U_{SV}&=(U_S)_V=T_V,& U_{VS}&=(U_V)_S=-p_S,\\
F_{TV}&=(F_T)_V=-S_V,&F_{VT}&=(F_V)_T=-p_T,\\
H_{Sp}&=(H_S)_p=T_p,&H_{pS}&=(H_p)_S=V_S,\\
G_{Tp}&=(G_T)_p=-S_p,&G_{pT}&=(G_p)_T=V_T.
\end{aligned}
$$

$C^2$ 級関数の混合偏微分は交換できるので、各行の左右を等置します。最初の行は $T_V=-p_S$、二行目は $-S_V=-p_T$、三行目は $T_p=V_S$、四行目は $-S_p=V_T$。これらが主張の四式です。
<!-- proof-end -->

### 例：理想気体で非零の両辺を検算する

物質量 $N$ を固定し、状態方程式を $pV=NRT$ とする理想気体を考えます。$R>0$、定積モル熱容量 $c_V>0$ が一定なら、[理想気体のエントロピー差](../TH4/index.md#prop-th4-ideal-gas-entropy)から、基準の $T_*>0$、モル体積 $v_*>0$ を用い、基準定数を選んで

$$
S(T,V,N)=Nc_V\log\frac{T}{T_*}
+NR\log\frac{V}{Nv_*}
$$

と表せます。$T,N$ を固定した偏微分は

$$
\left(\frac{\partial S}{\partial V}\right)_{T,N}
=\frac{NR}{V}.
$$

一方、$p=NRT/V$ より $V,N$ 固定で

$$
\left(\frac{\partial p}{\partial T}\right)_{V,N}
=\frac{NR}{V}.
$$

二つの独立な計算が一致し、[二番目のMaxwell関係式](#thm-th5-maxwell)を具体的に確認できます。

## 4. 示量性からEuler関係式を導く

変数交換だけでは $U,F,G,H$ の関係をすべて尽くしたわけではありません。実験系を同じ状態のまま二倍の大きさにしたとき、$S,V,N,U$ がすべて二倍になるという**示量性**を追加すると、ポテンシャル間に新しい恒等式が生まれます。ただし界面エネルギーや長距離相互作用が無視できない系へ無条件に適用する仮定ではありません。

<a id="def-th5-extensive"></a>

<!-- formal-statement-start -->
> **定義（基本関係の一次同次性）**  
> $S,V,N$ を同じ正の倍率で拡大できる錐状領域上の平衡基本関係 $U(S,V,N)$ が、任意の $\lambda>0$（両辺の状態が領域内にある場合）について

$$
U(\lambda S,\lambda V,\lambda N)
=\lambda U(S,V,N)
$$

> を満たすとき、$U$ は示量変数について一次同次であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-th5-extensive -->
### 例：変数の比を固定した拡大

**定義の確認**：[TH4の例](../TH4/index.md#def-th4-chemical-potential)に現れた $U=A S^2/N+B N^2/V+CN$ を $A,B>0$、$S,V,N>0$ で使うと、第一項は $(\lambda S)^2/(\lambda N)=\lambda S^2/N$、第二項は $(\lambda N)^2/(\lambda V)=\lambda N^2/V$、第三項も $\lambda CN$ です。三項とも $\lambda$ 倍になるため、条件を直接満たします。
<!-- definition-example-end -->

<a id="thm-th5-euler"></a>

<!-- formal-statement-start -->
> **定理（Euler関係式）**  
> 単一成分平衡系の $U(S,V,N)$ が、正の錐状領域上で $C^1$ 級の一次同次関数であり、$T=U_S$、$p=-U_V$、$\mu=U_N$ と定められるなら、

$$
U=TS-pV+\mu N,\qquad G=\mu N
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

倍率 $\lambda$ を変化させる一変数関数を作り、$\lambda=1$ で微分します。右辺の一次同次性の微分と左辺の連鎖律が同じ量になることが核心です。

<!-- proof-start -->
### 証明

状態 $(S,V,N)$ を固定して、$h(\lambda)=U(\lambda S,\lambda V,\lambda N)$ を定めます。定義の一次同次性から $h(\lambda)=\lambda U(S,V,N)$ なので、$h'(1)=U(S,V,N)$ です。他方、$U$ の $C^1$ 級性と連鎖律により

$$
h'(\lambda)
=U_S(\lambda S,\lambda V,\lambda N)S
+U_V(\lambda S,\lambda V,\lambda N)V
+U_N(\lambda S,\lambda V,\lambda N)N.
$$

$\lambda=1$ を代入して $h'(1)=U_SS+U_VV+U_NN$。偏微分の物理量への対応を入れると

$$
U=T S+(-p)V+\mu N=TS-pV+\mu N.
$$

最後に[ポテンシャルの定義](#def-th5-potentials)へ代入します。

$$
G=U-TS+pV
=(TS-pV+\mu N)-TS+pV
=\mu N.
$$

一次同次性がない系では、最後の $G=\mu N$ を一般に主張できません。
<!-- proof-end -->

<a id="thm-th5-gibbs-duhem"></a>

<!-- formal-statement-start -->
> **定理（Gibbs–Duhem関係式）**  
> 単一成分系の $U(S,V,N)$ が一次同次かつ $C^2$ 級であり、拡張基本関係 $dU=T\,dS-p\,dV+\mu\,dN$ が成り立つ局所領域では、

$$
S\,dT-V\,dp+N\,d\mu=0
$$

> が成立する。特に $N>0$ の単相領域で $T,p$ を独立な座標に取れるなら、$\mu$ の変化は

$$
d\mu=-\frac{S}{N}\,dT+\frac{V}{N}\,dp
$$

> となる。
<!-- formal-statement-end -->

### 証明の見取り図

[Euler関係式](#thm-th5-euler)の両辺を全微分した式と、[拡張基本関係](../TH4/index.md#def-th4-chemical-potential)を引き算します。$dS,dV,dN$ の項がすべて相殺され、示強量の間の拘束だけが残ります。

<!-- proof-start -->
### 証明

[Euler関係式](#thm-th5-euler)の $U=TS-pV+\mu N$ を全微分すると、積の微分から

$$
\begin{aligned}
dU={}&T\,dS+S\,dT-p\,dV-V\,dp\\
&+\mu\,dN+N\,d\mu.
\end{aligned}
$$

ここから[拡張基本関係](../TH4/index.md#def-th4-chemical-potential)の $T\,dS-p\,dV+\mu\,dN$ を差し引けば

$$
0=S\,dT-V\,dp+N\,d\mu.
$$

$N>0$ なので $N$ で割ることができ、$d\mu=-(S/N)dT+(V/N)dp$ です。$T,p$ を局所独立変数に選べるとき、これは $\mu_T=-S/N$、$\mu_p=V/N$ という偏微分表示も与えます。
<!-- proof-end -->

物質量を固定したとき、温度と圧力は一般に独立な示強変数として測れますが、**化学ポテンシャルまで第三の独立変数として自由に指定できるわけではありません**。この制約を持つことがGibbs–Duhem関係式の意味です。

## 5. 四つのポテンシャルを同じ模型から計算する

[TH4の基本関係の例](../TH4/index.md#def-th4-chemical-potential)を用い、$A,B>0$、$C$ は定数、$S,V,N>0$ とします。

$$
U(S,V,N)=A\frac{S^2}{N}+B\frac{N^2}{V}+CN.
$$

ここでは $T=2AS/N>0$、$p=BN^2/V^2>0$ です。前者から $S=NT/(2A)$、後者から $V=N\sqrt{B/p}$ が一意に得られるので、正の領域で必要な局所座標変換が実際に可能です。$U_{SS}=2A/N>0$、$U_{VV}=2BN^2/V^3>0$ で、混合二階微分 $U_{SV}=0$ です。

### 温度を選べばHelmholtz自由エネルギー

$S=NT/(2A)$ を $U-TS$ へ順に代入すると

$$
\begin{aligned}
F(T,V,N)
&=A\frac{(NT/(2A))^2}{N}
+B\frac{N^2}{V}+CN-T\frac{NT}{2A}\\
&=-\frac{NT^2}{4A}+B\frac{N^2}{V}+CN.
\end{aligned}
$$

偏微分すれば $-F_T=NT/(2A)=S$、$-F_V=BN^2/V^2=p$ で、自然変数の意味も確認できます。

### 圧力を選べばエンタルピー

$V=N\sqrt{B/p}$ と $pV=N\sqrt{Bp}$ なので、

$$
\begin{aligned}
H(S,p,N)
&=A\frac{S^2}{N}
+B\frac{N^2}{N\sqrt{B/p}}+CN
+N\sqrt{Bp}\\
&=A\frac{S^2}{N}+2N\sqrt{Bp}+CN.
\end{aligned}
$$

$H_p=N\sqrt{B/p}=V$ です。最後に両方を交換すれば

$$
G(T,p,N)=-\frac{NT^2}{4A}+2N\sqrt{Bp}+CN.
$$

[自然変数の命題](#prop-th5-natural-variables)を確認するため、$T,p,N$ をそれぞれ独立変数として微分します。

$$
\begin{aligned}
G_T&=-\frac{NT}{2A}=-S,\\
G_p&=2N\frac{B}{2\sqrt{Bp}}
=N\sqrt{\frac Bp}=V,\\
G_N&=-\frac{T^2}{4A}+2\sqrt{Bp}+C.
\end{aligned}
$$

一方、元の基本関係を **$S,V$ を固定して** $N$ で微分した化学ポテンシャルは

$$
\mu=U_N=-\frac{AS^2}{N^2}+\frac{2BN}{V}+C.
$$

ここへ $S=NT/(2A)$ と $V=N\sqrt{B/p}$ を代入すれば

$$
\begin{aligned}
\mu
&=-\frac{A(NT/(2A))^2}{N^2}
+\frac{2BN}{N\sqrt{B/p}}+C\\
&=-\frac{T^2}{4A}+2\sqrt{Bp}+C=G_N.
\end{aligned}
$$

さらに $G=N[-T^2/(4A)+2\sqrt{Bp}+C]=N\mu$ です。この模型が一次同次であることを確認したうえで、[Euler関係式](#thm-th5-euler)の結論とも一致します。

## 6. 演習：変数、微分、示量性を行き来する

### Level A：一つの操作を確実に行う

#### A1. Helmholtz自由エネルギーの微分

$N$ 一定の系で $dU=T\,dS-p\,dV$ が成り立つ。$F=U-TS$ の微分を求め、自然変数を述べよ。

- Level: A
- ID: TH5-A1

<!-- solution-start -->
**詳細解答**　[閉鎖系の基本関係](../TH4/index.md#prop-th4-fundamental-fixed-n)を出発点に、$d(TS)=T\,dS+S\,dT$ を引きます。

$$
dF=(T\,dS-p\,dV)-T\,dS-S\,dT
=-S\,dT-p\,dV.
$$

従って局所的に $T,V$ を独立に取れれば自然変数は $T,V$ であり、$F_T=-S$、$F_V=-p$ です。体積微分の際は $T$ を固定します。
<!-- solution-end -->

#### A2. エンタルピーの符号

$N$ 一定の系で $H=U+pV$ とする。$dH$ の式を導け。

- Level: A
- ID: TH5-A2

<!-- solution-start -->
**詳細解答**　積の微分は $d(pV)=p\,dV+V\,dp$ です。[基本関係](../TH4/index.md#prop-th4-fundamental-fixed-n)へ加えると

$$
dH=T\,dS-p\,dV+p\,dV+V\,dp
=T\,dS+V\,dp.
$$

$-p\,dV$ と $+p\,dV$ が相殺するため、符号は $+V\,dp$ です。
<!-- solution-end -->

#### A3. Gibbs自由エネルギーの数値

$U=400\,\mathrm J$、$T=300\,\mathrm K$、$S=1\,\mathrm{J/K}$、$pV=80\,\mathrm J$ の平衡状態について $F,H,G$ を求めよ。

- Level: A
- ID: TH5-A3

<!-- solution-start -->
**詳細解答**　まず $TS=300\times1=300\,\mathrm J$。次に[定義](#def-th5-potentials)へ代入します。

$$
F=400-300=100\,\mathrm J,\quad
H=400+80=480\,\mathrm J,\quad
G=400-300+80=180\,\mathrm J.
$$

$H-TS=480-300=180\,\mathrm J$ と計算し直しても同じです。
<!-- solution-end -->

#### A4. 混合偏微分の符号

$N$ を固定した $C^2$ 級関数 $F(T,V)$ が $F_T=-S$、$F_V=-p$ を満たす。[Maxwell関係式](#thm-th5-maxwell)のうち $F$ から得る一式を導出せよ。

- Level: A
- ID: TH5-A4

<!-- solution-start -->
**詳細解答**　$F_T=-S$ を $V$ で微分して $F_{TV}=-S_V$。$F_V=-p$ を $T$ で微分して $F_{VT}=-p_T$ です。$C^2$ 級性から両者は等しいので

$$
-S_V=-p_T,\qquad
\left(\frac{\partial S}{\partial V}\right)_{T,N}
=\left(\frac{\partial p}{\partial T}\right)_{V,N}.
$$

両辺の固定条件が異なるのは、もともと $F$ の独立変数が $T,V$ だからです。
<!-- solution-end -->

#### A5. Euler関係式の適用条件

$U(S,V,N)=K S^2/N$ ($K>0,S,N>0$) を考え、$V>0$ とは独立とする。一次同次性を検証し、$T,p,\mu$ を求めてEuler関係式を確かめよ。

- Level: A
- ID: TH5-A5

<!-- solution-start -->
**詳細解答**　$U(\lambda S,\lambda V,\lambda N)=K(\lambda S)^2/(\lambda N)=\lambda U$ です。偏微分をそれぞれ実行すると

$$
T=\frac{2KS}{N},\qquad p=-U_V=0,\qquad
\mu=-\frac{KS^2}{N^2}.
$$

[Euler関係式](#thm-th5-euler)の右辺は

$$
TS-pV+\mu N
=\frac{2KS^2}{N}-0-\frac{KS^2}{N}
=\frac{KS^2}{N}=U.
$$

これは一次同次性を示す数学的な例であり、機械的な圧力応答がある現実の物質模型ではありません。
<!-- solution-end -->

### Level B：二つ以上の結果を接続する

#### B1. 非線形な基本関係と二つの変数交換

$U(S,V,N)=A S^2/N+B N^2/V$ ($A,B>0,S,V,N>0$) とする。$F(T,V,N)$ と $G(T,p,N)$ を求め、$G_T=-S,G_p=V$ を検算せよ。

- Level: B
- ID: TH5-B1

<!-- solution-start -->
**詳細解答**　$T=U_S=2AS/N$、$p=-U_V=BN^2/V^2$ から

$$
S=\frac{NT}{2A},\qquad V=N\sqrt{\frac{B}{p}}.
$$

$F=U-TS$ へ最初の式を代入して

$$
F=A\frac{N^2T^2}{4A^2N}+\frac{BN^2}{V}
-\frac{NT^2}{2A}
=-\frac{NT^2}{4A}+\frac{BN^2}{V}.
$$

次に $G=F+pV$ で $V=N\sqrt{B/p}$ を代入すれば

$$
G=-\frac{NT^2}{4A}
+\frac{BN^2}{N\sqrt{B/p}}+pN\sqrt{\frac{B}{p}}
=-\frac{NT^2}{4A}+2N\sqrt{Bp}.
$$

微分すると $G_T=-NT/(2A)=-S$、$G_p=NB/\sqrt{Bp}=N\sqrt{B/p}=V$ であり、[自然変数の命題](#prop-th5-natural-variables)を満たします。
<!-- solution-end -->

#### B2. 理想気体のMaxwell関係式と熱容量

$N,R,c_V,T_*,v_*>0$ を定数、$T,V,p>0$ とし、$N$ を固定した理想気体の状態方程式を $pV=NRT$ とする。定積モル熱容量 $c_V$ は一定で、エントロピーを

$$
S=Nc_V\log(T/T_*)+NR\log(V/(Nv_*))
$$

とする。$(T,p)$ 表示に直し、$S_p|_{T,N}=-V_T|_{p,N}$ と $C_p-C_V=NR$ を示せ。熱容量は $C_p=T(\partial S/\partial T)_{p,N}$、$C_V=T(\partial S/\partial T)_{V,N}$ と定義する。

- Level: B
- ID: TH5-B2

<!-- solution-start -->
**詳細解答**　状態方程式を $V=NRT/p$ と解き、$V/(Nv_*)=RT/(pv_*)$ をエントロピーへ代入します。

$$
S(T,p)=Nc_V\log\frac{T}{T_*}
+NR\log\frac{RT}{pv_*}.
$$

$T,N$ 一定で $p$ 微分すると $S_p=-NR/p$。他方、$V(T,p)=NRT/p$ を $p,N$ 一定で $T$ 微分すると $V_T=NR/p$。従って $S_p=-V_T$ で[Maxwell関係式](#thm-th5-maxwell)と一致します。

熱容量は、上の $S(T,p)$ を $T$ 微分して

$$
C_p=T\left(\frac{Nc_V}{T}+\frac{NR}{T}\right)
=N(c_V+R)
$$

です。もとの $S(T,V)$ を $V$ 固定で微分して $C_V=Nc_V$。差を取れば $C_p-C_V=NR$ です。
<!-- solution-end -->

#### B3. Gibbs–Duhem関係と化学ポテンシャルの自由度

物質量 $N>0$ 一定の一成分単相系で、示量性と $C^2$ 級性を仮定する。$T$ 一定で $dp$ だけ圧力を変えるとき、$d\mu$ を求めよ。また $T,p$ 両方が一定なら $d\mu$ はどうなるか。

- Level: B
- ID: TH5-B3

<!-- solution-start -->
**詳細解答**　[Gibbs–Duhem関係式](#thm-th5-gibbs-duhem)は

$$
S\,dT-V\,dp+N\,d\mu=0.
$$

$T$ 一定なので $dT=0$ を代入し、$N\,d\mu=V\,dp$。$N>0$ で割れば

$$
d\mu=\frac{V}{N}\,dp.
$$

従って $dp=0$ も課せば $d\mu=0$ です。これは同じ単相平衡状態の近傍で $T,p,\mu$ を三つ同時に独立指定できないことを意味し、相共存点での変化を一括して議論しているわけではありません。
<!-- solution-end -->

#### B4. 変数交換に失敗する系

$U(S,V,N)=aS+bV+cN$ （$a>0$、$S,V,N>0$）を考える。$T,p,\mu$ と $F=U-TS$ を計算し、なぜ $F(T,V,N)$ を独立変数の滑らかな関数として構成できないか説明せよ。

- Level: B
- ID: TH5-B4

<!-- solution-start -->
**詳細解答**　偏微分すると $T=U_S=a$、$p=-U_V=-b$、$\mu=U_N=c$ です。$F=U-aS=bV+cN$ は元の $S$ に依存しません。しかし $T=a$ は $S$ の値に関係なく一定であり、異なる $S$ に対して同じ $T$ が対応します。

$$
\left(\frac{\partial T}{\partial S}\right)_{V,N}
=U_{SS}=0.
$$

従って $S=S(T,V,N)$ と逆に解く局所座標が成立しません。形式的に $F=bV+cN$ と書いて $F_T=0$ としてしまうと、$-F_T=S>0$ と矛盾するように見えますが、これは**独立な $T$ 方向が存在しない**ためその偏微分自体を正当化できないという意味です。[Legendre変換の定義](#def-th5-legendre)に必要な局所可逆性が失われています。
<!-- solution-end -->

### Level C：自然変数と示量性の統合

#### C1. 理想気体のGibbs自由エネルギー

$N>0$ を変化させられる物質量とし、$c_V,R,T_*,v_*>0$ は $N$ に依存しない定数とする。一成分理想気体の基本関係が、$T,V>0$ の平衡状態で $U=Nc_VT$、$pV=NRT$ と

$$
S=Nc_V\log\frac{T}{T_*}
+NR\log\frac{V}{Nv_*}
$$

を満たすとする。$F(T,V,N)$、$G(T,p,N)$ を構成し、$-G_T=S$、$G_p=V$、$G_N=\mu=G/N$、および $S\,dT-V\,dp+N\,d\mu=0$ を示せ。

- Level: C
- ID: TH5-C1

<!-- solution-start -->
**詳細解答**　まず定義 $F=U-TS$ に与式を代入します。

$$
F=Nc_VT\left(1-\log\frac{T}{T_*}\right)
-NRT\log\frac{V}{Nv_*}.
$$

$G=F+pV$ で $pV=NRT$ を使い、$V=NRT/p$ に変換すると

$$
G(T,p,N)=N\left[
c_VT\left(1-\log\frac{T}{T_*}\right)
+RT\left(1-\log\frac{RT}{pv_*}\right)
\right].
$$

角括弧は $T,p$ のみの関数なので、$G$ は $N$ の一次式です。まず $T$ で微分します。固定 $p,N$ の下では、$T_*,R,p,v_*$ は定数であるため

$$
\begin{aligned}
\frac{\partial}{\partial T}
\left[T\left(1-\log\frac{T}{T_*}\right)\right]
&=1-\log\frac{T}{T_*}-T\frac1T
=-\log\frac{T}{T_*},\\
\frac{\partial}{\partial T}
\left[T\left(1-\log\frac{RT}{pv_*}\right)\right]
&=1-\log\frac{RT}{pv_*}
-T\frac{R/(pv_*)}{RT/(pv_*)}\\
&=-\log\frac{RT}{pv_*}.
\end{aligned}
$$

従って

$$
-G_T=Nc_V\log\frac{T}{T_*}
+NR\log\frac{RT}{pv_*}=S(T,p,N).
$$

$G$ の $p$ 依存は $-NRT\log(RT/(pv_*))$ の項だけなので

$$
G_p=-NRT\left(-\frac1p\right)=\frac{NRT}{p}=V.
$$

[自然変数の命題](#prop-th5-natural-variables)によれば、$T,p$ 一定での $G_N$ が化学ポテンシャルです。ここでは $G=N g(T,p)$ と書けて $g$ は $N$ に依存しないため、$G_N=g$ となります。具体的に

$$
\mu=G_N
=c_VT\left(1-\log\frac{T}{T_*}\right)
+RT\left(1-\log\frac{RT}{pv_*}\right)
=\frac GN.
$$

これは $G$ が $N$ に一次同次であることに対応する[Euler関係式](#thm-th5-euler)の検算です。さらに $d\mu$ は $G/N$ の $T,p$ 微分から

$$
d\mu
=-\left[c_V\log\frac{T}{T_*}
+R\log\frac{RT}{pv_*}\right]dT
+\frac{RT}{p}\,dp.
$$

角括弧は $S/N$、$RT/p$ は $V/N$ だから

$$
d\mu=-\frac SN\,dT+\frac VN\,dp.
$$

両辺に $N$ を掛けて項を移すと $S\,dT-V\,dp+N\,d\mu=0$。これは[Gibbs–Duhem関係](#thm-th5-gibbs-duhem)とも一致します。計算中は $T,p,N$ を独立に微分できる $T,p,N>0$ の単相領域を使い、$S$ の基準定数は与えられた基本関係に固定しています。
<!-- solution-end -->

## 7. 次に何を問うか

ここで分かったのは、**滑らかな局所座標の下で**自然変数を交換すると、同じ物理量を異なる偏微分から読めるということです。Maxwell関係式は微分の整合性、Euler関係式とGibbs–Duhem関係式は示量性による制約を表します。一方、局所座標が取れるだけでは、その平衡状態が外乱に対して安定かどうかは決まりません。TH6では熱容量・圧縮率とポテンシャルの曲率を結び付けます。
