# AG2-11 滑らかな超曲面と正則性

前章の[余法完全列](../AG2-10/index.md#thm-ag2-10-conormal-sequence)は、局所方程式の偏微分の少なくとも一つが零でないときに分裂しました。しかし「偏微分が零でない」という条件をチャートごとに確認するだけでは、なぜそれが図形そのものの正則性を意味するのかが見えません。本章では**方程式の一次部分・Zariski接空間・局所環**の三つの見方を照合して、超曲面が滑らかであることの意味を調べます。

基礎体を $k=\mathbb C$ とし、$n\ge2$ とします。$F\in k[X_0,\ldots,X_n]$ は次数 $d\ge1$ の非零斉次式で、**平方因子を持たない**と仮定します。射影超曲面 $Y=V_+(F)\subset\mathbb P^n_k$ は、この場合、[射影零点集合の定義](../AG2-01/index.md#def-ag2-01-projective-zero-set)に付随する被約な代数的集合として扱えます。平方因子を許すと、同じ点集合でも方程式が異なる一次情報を与えるので、最後にその違いも説明します。

## 1. 射影座標で勾配をどのように判定するか

点 $p=[a_0:\cdots:a_n]\in Y$ の $a_i\ne0$ を選び、チャート $U_i$ で $x_j=X_j/X_i$（$j\ne i$）と書きます。$X_i=1$ と規格化したアフィン方程式は $f_i(x)=F(x_0,\ldots,1,\ldots,x_n)$ です。斉次式の偏微分は規格化した代表点で評価します。方程式の一次部分と接方向は、[Jacobianの核の命題](../AG1-10/index.md#prop-ag1-10-jacobian-kernel)で既に計算できます。

<a id="prop-ag2-11-euler-gradient"></a>

<!-- formal-statement-start -->
> **命題（Euler恒等式とチャートJacobian）**  
> $k=\mathbb C$、$F\in k[X_0,\ldots,X_n]$ が次数 $d\ge1$ の斉次式とする。全変数の斉次偏微分を $F_j=\partial F/\partial X_j$ と書くと、
$$
\sum_{j=0}^n X_jF_j=dF
$$
> が成立する。$p\in V_+(F)\cap U_i$ では、$f_i$ の $n$ 個の偏微分がすべて零となることと、$F_0,\ldots,F_n$ がすべて零となることは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

各単項式について次数を数え、足し合わせます。チャートでは $j\ne i$ の偏微分が $F_j$ になり、残った $F_i$ はEuler恒等式と $F(p)=0$ から求められます。

<!-- proof-start -->
### 証明

次数 $d$ の単項式 $M=X_0^{b_0}\cdots X_n^{b_n}$ では、$\sum b_j=d$ より $\sum_j X_j\partial_jM=(\sum_jb_j)M=dM$ です。係数を掛けて和を取れば $F$ についても成立します。

$X_i=1$ と置いたチャートで、$j\ne i$ の微分には連鎖律の余分な項がなく、
$$
\frac{\partial f_i}{\partial x_j}(p)=F_j(a_0/a_i,\ldots,1,\ldots,a_n/a_i).
$$
いま $f_i(p)=0$ かつ $j\ne i$ の全偏微分が零なら、同じ規格化点で
$$
F_i=dF-\sum_{j\ne i}x_jF_j=0.
$$
逆向きは $f_i$ の偏微分表示から直ちに従います。代表点を $\lambda a$ に替えると各 $F_j$ は $\lambda^{d-1}$ 倍されるので、同時零か否かは射影座標の選び方によらず確定します。
<!-- proof-end -->

**まず一例。** $F=X_0X_2-X_1^2$ は $F_0=X_2,F_1=-2X_1,F_2=X_0$ を持ちます。これらが全て零なら $[X_0:X_1:X_2]=[0:0:0]$ となり射影点ではありません。したがって、この二次曲線には一次微分が全部消える点がありません。

## 2. 滑らかな点と特異点

周囲が $n$ 次元で一つの独立な方程式を課すなら、接方向は $n-1$ 次元になるはずです。この「一つの独立な一次条件」が失われた点こそ特異点です。ここで使う滑らかさは複素解析上の微分可能性を新たに仮定するものではなく、**多項式の一次式で判定する代数幾何学的な条件**です。

<a id="def-ag2-11-smooth-hypersurface"></a>

<!-- formal-statement-start -->
> **定義（超曲面の滑らかさと特異性）**  
> 基礎体を $k=\mathbb C$ とし、$F$ は次数 $d\ge1$ の平方因子を持たない斉次式とする。$Y=V_+(F)\subset\mathbb P^n_k$ の点 $p$ を固定する。
>
> ある（したがって任意の）チャートの局所方程式 $f_i$ に対し、
$$
df_i(p)\ne0
$$
> なら $p$ を **滑らかな点** といい、$df_i(p)=0$ なら $p$ は **特異である** という。すべての点が滑らかなとき $Y$ を **滑らかな超曲面** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag2-11-smooth-hypersurface -->
**定義の確認**： $F=X_0X_2-X_1^2$ に対し $p=[1:0:0]$ を取ります。$U_0$ では $x=X_1/X_0,y=X_2/X_0$ で $f=y-x^2$ です。$df(p)=dy$ は零でないので、$p$ は滑らかです。さらに前節の三つの斉次偏微分は射影点で同時零にならず、曲線全体が滑らかです。
<!-- definition-example-end -->

<a id="thm-ag2-11-jacobian-criterion"></a>

<!-- formal-statement-start -->
> **定理（射影超曲面のJacobian判定）**  
> $k=\mathbb C$、$n\ge2$ とし、平方因子を持たない次数 $d\ge1$ の斉次式 $F$ が定める $Y=V_+(F)\subset\mathbb P^n_k$ を考える。各 $p\in Y$ について次は同値である。
>
> (i) $p$ は滑らかな点である。
>
> (ii) $p$ を代表する非零ベクトル $a$ で $\nabla F(a)\ne0$ である。
>
> (iii) $T_pY$ の次元は $n-1$ である。
>
> このとき特異点集合は $F=F_0=\cdots=F_n=0$ を満たす射影点全体である。
<!-- formal-statement-end -->

### 証明の見取り図

チャートで接方向は一次線形写像 $df_i(p):k^n\to k$ の核です。非零なら階数1、零なら階数0です。[前節のチャートの同値性](#prop-ag2-11-euler-gradient)で射影的な条件に戻せます。

<!-- proof-start -->
### 証明

$p\in U_i$ とし、そのチャートで $Y$ を $f_i=0$ と記します。平方因子を持たないので、この局所方程式は超曲面の被約な局所方程式であり、[生成方程式によるZariski接空間の表示](../AG1-10/index.md#prop-ag1-10-jacobian-kernel)が適用できます。したがって
$$
T_pY=\ker\left(
\frac{\partial f_i}{\partial x_j}(p)\right)_{j\ne i}.
$$
この行列は $1\times n$ です。$df_i(p)\ne0$ なら階数は1で、[階数・退化次数の定理](../../../基礎科目/F0/F0-00F/index.md#thm-f0-00f-01)から $\dim T_pY=n-1$ です。$df_i(p)=0$ なら階数0で $\dim T_pY=n$ です。これが (i) と (iii) の同値を示します。

また[Euler恒等式とチャートJacobian](#prop-ag2-11-euler-gradient)により $df_i(p)=0$ と $\nabla F(a)=0$ が同値なので、(i) と (ii) も同値です。両者が同時に零になる条件に $p\in Y$ を加えたものが最後の特異点集合の表示です。
<!-- proof-end -->

ここで**特異点でもZariski接空間は存在します**。ただし本来の $n-1$ 次元より一つ大きくなり、一次近似が曲面を十分に切り出せなくなります。

## 3. 局所環で正則性を測る

Jacobianは埋め込み座標で計算しました。点の周りの関数だけを残すと、特異性を座標によらず説明できます。[点の局所環](../AG1-04/index.md#def-ag1-04-point-local-ring) $R=\mathcal O_{Y,p}$ と極大イデアル $\mathfrak m$ を用いれば、$\mathfrak m/\mathfrak m^2$ は関数の一次変化だけを記録します。

<a id="def-ag2-11-regular-local"></a>

<!-- formal-statement-start -->
> **定義（正則局所環と埋め込み次元）**  
> $R$ をNoether局所環、$\mathfrak m$ を極大イデアル、$\kappa=R/\mathfrak m$ を剰余体とする。$\dim_\kappa(\mathfrak m/\mathfrak m^2)$ を **埋め込み次元** と呼ぶ。これがKrull次元 $\dim R$ と等しいとき $R$ を **正則局所環** という。複素代数的集合の閉点 $p$ において $\mathcal O_{Y,p}$ が正則局所環なら $p$ を **正則点** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag2-11-regular-local -->
**定義の確認**： $R=\mathbb C[t]_{(t)}$ では $\mathfrak m=(t)$、$\mathfrak m^2=(t^2)$ で、$\mathfrak m/\mathfrak m^2$ は $[t]$ を基底に持ちます。素イデアル列 $(0)\subsetneq(t)$ があり、$R$ の非零素イデアルは $(t)$ だけなので、$\dim R=1=\dim_{\mathbb C}(\mathfrak m/\mathfrak m^2)$ です。
<!-- definition-example-end -->

次の補題では、超曲面の局所的な次元を求める部分に注意が要ります。$n-1$ という数字を「方程式が一つだから」とだけ言って済ませてはいけません。

<a id="lem-ag2-11-local-dimension"></a>

<!-- formal-statement-start -->
> **補題（超曲面の閉点での局所次元）**  
> $k=\mathbb C$、$n\ge2$ とする。$A=k[x_1,\ldots,x_n]/(f)$、$f$ は非定数かつ平方因子を持たない多項式、$a\in V(f)$、$\mathfrak m_a$ は点 $a$ の極大イデアルとする。このとき
$$
\dim A_{\mathfrak m_a}=n-1.
$$
<!-- formal-statement-end -->

### 証明の見取り図

まず $a$ を含む既約成分 $V(g)$ を選びます。線形座標変換で $g$ を一変数についてモニックにすると、残り $n-1$ 変数の多項式環上の有限整拡大になります。[整拡大の素イデアルの持ち上げ・非比較性](../AG1-09/index.md#lem-ag1-09-integral-prime-lifting)を利用する際は、特定の閉点の下で鎖を取る必要があります。

<!-- proof-start -->
### 証明

$f$ を相異なる既約多項式の積 $f=cg_1\cdots g_s$ と分解します。$a\in V(f)$ なので、少なくとも一つの $g_\ell(a)$ が零です。環 $A$ の $a$ を通る既約成分は $k[x]/(g_\ell)$ に対応します。

**上界。** $g_\ell$ は零でない非定数式です。適切な線形座標変換の後、最高次数部分が新しい $x_n$ 軸上で非零となるように選べます。係数を定数倍して $g_\ell$ を $x_n$ に関してモニックにします。したがって
$$
k[x_1,\ldots,x_{n-1}]
\longrightarrow k[x_1,\ldots,x_n]/(g_\ell)
$$
は有限整拡大です。[整拡大における非比較性](../AG1-09/index.md#lem-ag1-09-integral-prime-lifting)により、どの素イデアル鎖も基底の多項式環へ収縮して真の鎖になるため、その長さは高々 $n-1$ です。$A$ の任意の素イデアル鎖はある最小素イデアル $(g_\ell)/(f)$ から始まる鎖へ延長できるので、局所化後にも長さの上界 $n-1$ が成り立ちます。

**下界。** 閉点 $a$ を含む既約成分 $V(g_\ell)$ を固定し、上の線形座標変換後の環を
$$
B=k[y_1,\ldots,y_{n-1}],\qquad C=B[t]/(g_\ell)
$$
と置きます。$g_\ell$ は $t$ についてモニックな次数 $e\ge1$ の多項式なので、$1,t,\ldots,t^{e-1}$ の剰余類は $C$ の $B$-加群としての基底です。実際、モニック多項式による割り算で任意の元をこの形へ書け、次数が $e$ 未満の多項式が $g_\ell$ の倍数となるのは零多項式だけです。

$a$ の $y$ 座標を $b=(b_1,\ldots,b_{n-1})$ とし、$B$ の素イデアルの列
$$
\mathfrak p_j=(y_1-b_1,\ldots,y_j-b_j),
\qquad 0\le j\le n-1
$$
を取ります。$\mathfrak p_0=(0)$、$\mathfrak p_{n-1}$ は $b$ の極大イデアルです。各商 $B/\mathfrak p_j$ は残りの変数の多項式環という整域なので、列は長さ $n-1$ の真の素イデアル鎖です。

この鎖を、**終点を $a$ に固定して** $C$ へ引き戻します。必要な一段の構成を示します。$B$ の素イデアル $\mathfrak p\subset\mathfrak q$ と、$C$ の素イデアル $\mathfrak Q$ で $\mathfrak Q\cap B=\mathfrak q$ を仮定します。$\mathfrak p C$ は $\mathfrak Q$ に含まれます。$S=B\setminus\mathfrak p$ とし、$C_{\mathfrak Q}$ において $\mathfrak p C_{\mathfrak Q}$ と $S$ が交わらないことを証明します。

もし $s\in S$ が $\mathfrak p C_{\mathfrak Q}$ に属すれば、ある $h\in C\setminus\mathfrak Q$ に対して $hs\in\mathfrak p C$ です。$C/\mathfrak p C$ は上記の $B$-加群基底を剰余へ移した **自由な $B/\mathfrak p$-加群** です。$B/\mathfrak p$ は整域で $s\notin\mathfrak p$ なので、この自由加群上の $s$ 倍写像は単射です。従って $hs\in\mathfrak p C$ から $h\in\mathfrak p C\subseteq\mathfrak Q$ となりますが、これは $h$ の選び方と矛盾します。

ゆえに
$$
S^{-1}\bigl(C_{\mathfrak Q}/\mathfrak p C_{\mathfrak Q}\bigr)\ne0.
$$
零でない可換環には極大イデアルが存在するので、その逆像を取れば、$\mathfrak Q$ に含まれ、$B$ への収縮がちょうど $\mathfrak p$ となる素イデアル $\mathfrak P$ を得ます。これは自由加群であることだけを用いた**一段の下降構成**です。

最初に $\mathfrak Q_{n-1}$ を $C$ の点 $a$ に対応する極大イデアルとして選び、上記の一段構成を $\mathfrak p_{n-2},\ldots,\mathfrak p_0$ の順に適用します。すると
$$
\mathfrak Q_0\subsetneq\mathfrak Q_1
\subsetneq\cdots\subsetneq\mathfrak Q_{n-1}=\mathfrak m_a(C)
$$
が得られます。収縮が $\mathfrak p_j$ で互いに異なるため各包含は真です。これを点 $a$ で局所化すると長さ $n-1$ の素イデアル鎖が残ります。さらに $C=k[x]/(g_\ell)$ の素イデアルを $A=k[x]/(f)$ へ逆像で戻すと鎖は保たれ、$A_{\mathfrak m_a}$ の次元も少なくとも $n-1$ です。上界と合わせて等号が示されました。
<!-- proof-end -->

この議論は、一般の整拡大についての鎖の下降定理を前提にしていません。**モニックな一変数多項式による有限自由性**を使い、必要な鎖を終点から具体的に作ったものです。

<a id="thm-ag2-11-regular-equivalence"></a>

<!-- formal-statement-start -->
> **定理（超曲面の滑らかさと正則局所環）**  
> $Y\subset\mathbb P^n_{\mathbb C}$ を平方因子を持たない一つの斉次式で定義される射影超曲面、$p\in Y$ とする。次は同値である。
>
> (i) $p$ で斉次勾配が非零である。
>
> (ii) 点の局所環 $\mathcal O_{Y,p}$ は正則局所環である。
>
> (iii) $\dim_{\mathbb C}(\mathfrak m_p/\mathfrak m_p^2)=n-1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

[Jacobianと局所環のZariski余接空間の双対](../AG1-10/index.md#thm-ag1-10-intrinsic-tangent)が (i) と (iii) をつなぎます。局所環のKrull次元が $n-1$ という[次元補題](#lem-ag2-11-local-dimension)を加えると (ii) と (iii) が一致します。

<!-- proof-start -->
### 証明

$p\in U_i$ で $f_i=0$ とし、$R=\mathbb C[x_j:j\ne i]_{(x-a)}/(f_i)$、$\mathfrak m=\mathfrak m_p$ と置きます。[Zariski接空間とZariski余接空間の自然同型](../AG1-10/index.md#thm-ag1-10-intrinsic-tangent)により
$$
\dim_{\mathbb C}(\mathfrak m/\mathfrak m^2)
=\dim_{\mathbb C}T_pY
=n-\operatorname{rank}df_i(p).
$$
行 $df_i(p)$ の階数は0または1なので、[Euler恒等式とチャートJacobian](#prop-ag2-11-euler-gradient)により $\nabla F(p)\ne0$ のとき、かつそのときに限り埋め込み次元は $n-1$ です。これで (i) と (iii) が同値です。

[局所次元補題](#lem-ag2-11-local-dimension)により $\dim R=n-1$ です。従って正則局所環の[定義](#def-ag2-11-regular-local)で要求する $\dim_{\mathbb C}(\mathfrak m/\mathfrak m^2)=\dim R$ は、まさに (iii) です。
<!-- proof-end -->

**注意。** 次元の計算とZariski接空間の計算は別物です。節点の曲線は局所次元1ですが、交点でのZariski接空間は2次元です。「次元が1だから接線も1本」と推論してはいけません。

## 4. 正則点の近傍と微分形式

局所環の一次条件が非零なら、実際に微分が局所自由になることも確認できます。これは[前章の余法完全列](../AG2-10/index.md#thm-ag2-10-conormal-sequence)で使った仮定の中身です。

<a id="prop-ag2-11-local-basis"></a>

<!-- formal-statement-start -->
> **命題（滑らかな超曲面での局所余接基底）**  
> $Y=V_+(F)\subset\mathbb P^n_{\mathbb C}$ を平方因子を持たない超曲面とする。点 $p\in Y\cap U_i$ の局所方程式を $f_i$ とし、次を仮定する。
$$
\frac{\partial f_i}{\partial x_r}(p)\ne0.
$$
> このとき $p$ のあるZariski開近傍 $W$ で $\Omega_Y^1|_W$ は階数 $n-1$ の局所自由層となる。その基底は $dx_j$（$j\ne i,r$）である。
<!-- formal-statement-end -->

### 証明の見取り図

係数 $f_{i,r}$ が零でない領域で逆数を使い、関係式 $df_i=0$ から $dx_r$ を消去します。

<!-- proof-start -->
### 証明

$U_i$ の $Y$ 上で $f_{i,r}$ が零でない開集合を $W$ とします。そこでは $f_{i,r}$ は正則関数の単元です。[Kähler微分の商表示](../AG2-08/index.md#prop-ag2-08-polynomial-differentials)は2変数の場合の結果なので、ここで $n$ 変数へ拡張する手順を確認します。$P=\mathbb C[x_j:j\ne i]$ と置くと、単項式 $x^\alpha$ の微分は積の規則から
$$
d(x^\alpha)=\sum_{j\ne i}\alpha_jx^{\alpha-e_j}\,dx_j
$$
です（$\alpha_j=0$ の項は省きます）。各形式的偏微分 $\partial/\partial x_j$ は微分則を満たすので、$dx_j$ の係数を取り出す写像を与えます。従って $\Omega^1_{P/\mathbb C}=\bigoplus_{j\ne i}P\,dx_j$ であり、これらの生成元に余分な関係はありません。

次に $P/(f_i)$ へ移ると、$f_i=0$ の微分 $df_i=0$ が必要です。逆に任意の代表元の変更 $g\mapsto g+f_ih$ に対し、$d(f_ih)=h\,df_i+f_i\,dh$ は商で零となるので、この関係だけで微分を定められます。[微分の局所化公式](../AG2-08/index.md#lem-ag2-08-localization)によって $W$ 上でも同じ商表示が成り立ちます。関係を展開すると
$$
0=df_i=\sum_{j\ne i}f_{i,j}\,dx_j,\qquad
dx_r=-f_{i,r}^{-1}\sum_{j\ne i,r}f_{i,j}\,dx_j.
$$
この式は $dx_r$ が残りの微分から生成されることを示します。残りが一次独立であることは、写像
$$
\bigoplus_{j\ne i,r}\mathcal O_W\,dx_j
\longrightarrow \Omega_Y^1|_W
$$
の逆として、各微分 $dx_r$ を上式へ、他の $dx_j$ をそれ自身へ送る写像が商の関係 $df_i$ を零に送ることから従います。従って示した $n-1$ 本は基底です。
<!-- proof-end -->

滑らかな点の近傍では自由な微分が $n-1$ 本あり、[余法層と接完全列](../AG2-10/index.md#thm-ag2-10-normal-tangent)が局所的に分裂します。一方特異点では、一次係数がすべて非単元であるため、上記の消去操作を開始できません。

## 5. 代表的な超曲面を判定する

### Fermat型：非零勾配が必ず残る

$F=X_0^d+\cdots+X_n^d$（$d\ge2$）では
$$
F_j=dX_j^{d-1}.
$$
標数0なので $d\ne0$ です。全偏微分が零なら全 $X_j=0$ で、射影点ではありません。したがって[Jacobian判定](#thm-ag2-11-jacobian-criterion)により任意の $n,d$ で滑らかです。特に $n=4,d=5$ の場合は、[随伴公式](../AG2-10/index.md#thm-ag2-10-adjunction)へ代入して
$$
\omega_Y\simeq\mathcal O_Y(5-4-1)=\mathcal O_Y
$$
となります。この計算は滑らかさを先に検査したから適用できます。

### 二次円錐：一つの頂点で階数が落ちる

$\mathbb P^3$ の $F=X_0X_1-X_2^2$ を考えます。$X_3$ を含まないので
$$
(F_0,F_1,F_2,F_3)=(X_1,X_0,-2X_2,0).
$$
全偏微分が零なら $X_0=X_1=X_2=0$ となり、唯一の射影点 $q=[0:0:0:1]$ が残ります。$F(q)=0$ なので[Jacobian判定](#thm-ag2-11-jacobian-criterion)により $q$ は特異点です。$U_3$ では $f=x_0x_1-x_2^2$ で二次の項しかありません。一次接条件が空になり $T_qY\simeq\mathbb C^3$、超曲面の局所次元は2です。**方程式が二次以上から始まる**ことがZariski接空間の膨張として現れます。

### 可約でも滑らかな点はある

$F=X_0X_1$ による $\mathbb P^2$ 内の二直線の和を考えます。勾配は $(X_1,X_0,0)$ です。$[0:0:1]$ のみで消え、そこでは二本が交差します。一方 $[0:1:0]$ では $F_0=1$ なので[Jacobian判定](#thm-ag2-11-jacobian-criterion)により滑らかです。可約であることと「すべての点が特異」という主張は異なります。

### 同じ集合を二乗してはいけない

$F=X_0$ と $G=X_0^2$ は同じ射影零点集合を与えますが、$G$ の偏微分は $2X_0$ で零点集合上すべて消えます。本章で**平方因子のない式に限定した**のはこのためです。$G$ を使うと、被約な射影直線ではなく厚みのある非被約方程式を見ています。後のスキーム論ではこの違いを構造層の情報として保持します。

## 6. 演習：勾配・局所環・余接層

### A1. 二次曲線と斉次勾配

$Y=V_+(X_0X_2-X_1^2)\subset\mathbb P^2$ のすべての点が滑らかなことを示し、$[1:0:0]$ のZariski接空間を $U_0$ で求めよ。

- Level: A
- ID: AG2-11-A1

<!-- solution-start -->
**詳細解答。** $F_0=X_2,F_1=-2X_1,F_2=X_0$ なので、三つが同時に零なら非零座標がありません。[Jacobian判定](#thm-ag2-11-jacobian-criterion)により滑らかです。$U_0$ では $x=X_1/X_0,y=X_2/X_0$ として $f=y-x^2$ です。$p=(0,0)$ の勾配は $(0,1)$ なので接方向 $(u,v)$ は $v=0$、従って $T_pY=\mathbb C(1,0)$ です。
<!-- solution-end -->

### A2. 円錐の頂点

$Y=V_+(X_0X_1-X_2^2)\subset\mathbb P^3$ の特異点をすべて求め、そこでのZariski接空間の次元を計算せよ。

- Level: A
- ID: AG2-11-A2

<!-- solution-start -->
**詳細解答。** $F_0=X_1,F_1=X_0,F_2=-2X_2,F_3=0$ です。同時零なら $X_0=X_1=X_2=0$ で、残るのは $q=[0:0:0:1]$ のみです。これは $F=0$ も満たします。$U_3$ の局所方程式 $f=x_0x_1-x_2^2$ の一次係数はすべて零です。[Zariski接空間の核表示](../AG1-10/index.md#prop-ag1-10-jacobian-kernel)で $T_qY=\ker(0,0,0)=\mathbb C^3$、次元は3です。
<!-- solution-end -->

### A3. Euler恒等式で抜けた成分を復元

次数3で平方因子を持たない斉次式 $F$ の零点 $p=[1:a:b]\in\mathbb P^2$ で $F_1(p)=F_2(p)=0$ とする。$F_0(p)$ を求め、$p$ の滑らかさを判定せよ。

- Level: A
- ID: AG2-11-A3

<!-- solution-start -->
**詳細解答。** [Euler恒等式](#prop-ag2-11-euler-gradient)へ次数 $d=3$ を代入し、$p\in V_+(F)$ を用いると $F_0(p)+aF_1(p)+bF_2(p)=3F(p)=0$ です。仮定の二つが零なので $F_0(p)=0$ です。全ての偏微分が零になったため、問題の平方因子を持たないという仮定と[Jacobian判定](#thm-ag2-11-jacobian-criterion)により $p$ は特異点です。
<!-- solution-end -->

### A4. 一変数の局所正則性

$R=\mathbb C[t]_{(t)}$ と $S=\mathbb C[x,y]_{(x,y)}/(xy)$ に対し、極大イデアルの一次剰余空間の次元をそれぞれ求めよ。

- Level: A
- ID: AG2-11-A4

<!-- solution-start -->
**詳細解答。** $R$ の極大イデアルは $(t)$ で、その平方は $(t^2)$ です。任意の $th(t)/s(t)$（$s(0)\ne0$）は平方を法として $(h(0)/s(0))t$ と合同なので一次剰余は $\mathbb C$ 上1次元です。$S$ では $xy\in(x,y)^2$ ですから、極大イデアルを平方で割ったとき関係 $xy=0$ は一次関係を増やしません。従って $[x],[y]$ が独立に残り $\dim_{\mathbb C}\mathfrak m_S/\mathfrak m_S^2=2$ です。$xy$ は平方因子を持たない非定数多項式なので、[超曲面の閉点での局所次元](#lem-ag2-11-local-dimension)を $n=2$ として適用すると $\dim S=1$ です。埋め込み次元 $2$ と局所次元 $1$ が一致しないため、交点の局所環は正則ではありません。
<!-- solution-end -->

### B1. Fermat型三次曲面

$Y=V_+(X_0^3+X_1^3+X_2^3+X_3^3)\subset\mathbb P^3$ が滑らかなことを示し、標準束を求めよ。

- Level: B
- ID: AG2-11-B1

<!-- solution-start -->
**詳細解答。** 斉次偏微分は $(3X_0^2,3X_1^2,3X_2^2,3X_3^2)$ です。$3\ne0$、$\mathbb C$ は体なので、全成分が零なら全座標が零となり射影点に反します。したがって[Jacobian判定](#thm-ag2-11-jacobian-criterion)で滑らかです。[随伴公式](../AG2-10/index.md#thm-ag2-10-adjunction)の $n=3,d=3$ を適用すると $\omega_Y\simeq\mathcal O_Y(3-3-1)=\mathcal O_Y(-1)$ です。先に滑らかさを検証しなければ、この随伴公式を適用する根拠がありません。
<!-- solution-end -->

### B2. 二直線の和の正則点

$Y=V_+(X_0X_1)\subset\mathbb P^2$ の特異点をすべて求め、$[0:1:0]$ の局所余接微分の基底をチャート $U_1$ で示せ。

- Level: B
- ID: AG2-11-B2

<!-- solution-start -->
**詳細解答。** 勾配は $(X_1,X_0,0)$ なので、同時零で曲線に乗る点は $[0:0:1]$ だけです。$U_1$ で $x=X_0/X_1,z=X_2/X_1$ とすれば $f=x$、$df=dx$ です。[滑らかな超曲面での局所余接基底](#prop-ag2-11-local-basis)で消去する添字を $r=x$ と選ぶと、余接層は $dz$ 一本を基底に持ちます。これは直線 $x=0$ の自由な方向が $z$ 方向であることにも一致します。
<!-- solution-end -->

### B3. 特異な三次曲線の局所条件

$C=V_+(Y^2Z-X^3)\subset\mathbb P^2$ の特異点を求める。$Z\ne0$ で $x=X/Z,y=Y/Z$ とした局所方程式から、原点のZariski接空間を計算せよ。

- Level: B
- ID: AG2-11-B3

<!-- solution-start -->
**詳細解答。** $F_X=-3X^2,F_Y=2YZ,F_Z=Y^2$ です。三つが零なら $X=Y=0$、よって $p=[0:0:1]$ のみが候補であり、$F(p)=0$ です。$Z=0$ にある唯一の曲線点 $[0:1:0]$ では $F_Z=1$ なので滑らかです。$U_2$ の方程式は $f=y^2-x^3$ で、$f_x=-3x^2,f_y=2y$ は $(0,0)$ でともに零です。Zariski接空間は $\ker(0,0)=\mathbb C^2$、一方、$f=y^2-x^3$ は平方因子を持たない非定数多項式なので、[超曲面の閉点での局所次元](#lem-ag2-11-local-dimension)から局所次元は $2-1=1$ です。この階数差が特異性を検出します。
<!-- solution-end -->

### B4. 滑らかなチャートで微分を消去する

$Y\subset\mathbb A^3$ を $f=z^2-x-y^2=0$ で定める。点 $(0,0,0)$ の滑らかさを判定し、$\Omega_Y^1$ の局所基底を選んで $dx$ をその基底で表示せよ。

- Level: B
- ID: AG2-11-B4

<!-- solution-start -->
**詳細解答。** $df=-dx-2y\,dy+2z\,dz$ で、$f_x=-1$ は全域で単元です。従って原点を含むすべての点でJacobianの階数は1、滑らかです。$\Omega_Y^1$ の関係 $df=0$ から $dx=-2y\,dy+2z\,dz$ を得ます。[滑らかな超曲面での局所余接基底](#prop-ag2-11-local-basis)に従い $dy,dz$ が局所基底です。係数 $-1$ が可逆なので、$dx$ の消去は全域で成立します。
<!-- solution-end -->

### C1. 五次超曲面の正則性と随伴公式

$\mathbb P^4$ の五次式 $F=\sum_{i=0}^4X_i^5$ が定める $Y$ について、(a) 全点でのJacobian判定、(b) 正則点での局所余接層の階数、(c) 標準束を順に求めよ。なぜ (a) の確認が (c) に先行するのかも述べよ。

- Level: C
- ID: AG2-11-C1

<!-- solution-start -->
**詳細解答。** (a) $F_i=5X_i^4$ で、標数0ゆえ全偏微分が零なら全座標零となるので射影点に反します。従って[Jacobian判定](#thm-ag2-11-jacobian-criterion)で $Y$ は滑らかです。(b) 点 $p=[a]$ で非零な $a_i$ を一つ選んでチャート $U_i$ に入ります。もし $j\ne i$ の偏微分が全部零なら、[本章の斉次式の次数恒等式](#prop-ag2-11-euler-gradient)より $F_i(a)=dF(a)-\sum_{j\ne i}a_jF_j(a)=0$ となって全勾配が零という (a) に矛盾します。従ってある $j\ne i$ の $F_j(a)$ は非零で、$U_i$ の局所方程式では $f_{i,j}(p)\ne0$ となり、近傍で単元です。[滑らかな超曲面での局所余接基底](#prop-ag2-11-local-basis)により $\Omega_Y^1$ は階数 $4-1=3$ の局所自由層です。(c) [随伴公式](../AG2-10/index.md#thm-ag2-10-adjunction)の $d=5,n=4$ より $\omega_Y\simeq\mathcal O_Y(5-4-1)=\mathcal O_Y$ です。(a) がなければ前章の余法完全列の局所分裂が保証されず、(c) をこの形で導いた証明を適用できません。
<!-- solution-end -->

### C2. 被約・非被約・特異点の区別

$\mathbb P^2$ における二直線の和 $F=X_0X_1$ と、同じ零点集合を持つ二つの方程式 $H=X_0$, $G=X_0^2$ を比較する。(a) 三者の零点集合を求める。(b) 斉次偏微分が同時零になる点を、各零点集合上で求める。(c) $p=[0:1:0]$ の局所環で $H$ と $G$ の一次情報を比較し、同じ点集合でも違いが生じる理由を説明せよ。

- Level: C
- ID: AG2-11-C2

<!-- solution-start -->
**詳細解答。** (a) $V_+(F)=V_+(X_0)\cup V_+(X_1)$ は異なる二直線の和です。一方 $V_+(H)=V_+(G)=V_+(X_0)$ は、点集合として同じ直線です。

(b) $F$ の勾配は $(X_1,X_0,0)$ で、$[0:0:1]$ だけで同時零となります。$H$ の勾配は $(1,0,0)$ なので同時零となる点はありません。$G$ の勾配は $(2X_0,0,0)$ なので、$V_+(G)$ の全点で零になります。$G$ は平方因子を持つため、この計算に[被約超曲面のJacobian判定](#thm-ag2-11-jacobian-criterion)をそのまま適用してはいけません。

(c) $p=[0:1:0]$ を含む $U_1$ で $u=X_0/X_1$, $v=X_2/X_1$ と置くと、$H$ の方程式は $u=0$、$G$ は $u^2=0$ です（$F$ もこのチャートでは $u=0$ ですが、もう一方の直線は $U_1$ に入りません）。$p$ での局所環はそれぞれ
$$
R=\mathbb C[u,v]_{(u,v)}/(u),\qquad
S=\mathbb C[u,v]_{(u,v)}/(u^2)
$$
です。$R$ では $u=0$ なので $\mathfrak m_R/\mathfrak m_R^2=\mathbb C\,[v]$ は $[v]$ を基底とする1次元の $\mathbb C$-ベクトル空間です。一方 $S$ では $u^2=0$ は二次の関係にすぎず、一次剰余空間の $[u],[v]$ は独立に残るので
$$
\dim_{\mathbb C}(\mathfrak m_R/\mathfrak m_R^2)=1,\qquad
\dim_{\mathbb C}(\mathfrak m_S/\mathfrak m_S^2)=2.
$$
従って点集合が一致しても、$G$ の商環には零でない冪零元 $u$ が残り、非被約な厚みとして異なる一次情報を持ちます。
<!-- solution-end -->

## 7. この判定を次にどう使うか

本章では、滑らかさを「勾配非零」「接方向が期待どおりの次元」「局所環の一次情報が期待どおり」として比較しました。次章で平面三次曲線や五次超曲面を計算するときは、先に本章のJacobian判定を行い、滑らかな場合に限って[随伴公式](../AG2-10/index.md#thm-ag2-10-adjunction)を適用します。特異点を含む場合は、滑らかな場合の微分束を無条件に流用しません。
