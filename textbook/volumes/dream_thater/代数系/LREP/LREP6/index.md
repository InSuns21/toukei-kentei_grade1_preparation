# LREP6 SU(2)の有限次元既約表現

<!-- definition-example-audit: strict -->

[LREP5の二重被覆](../LREP5/index.md#thm-lrep5-double-cover)では、二次元の複素ベクトルに作用する $SU(2)$ の元 $U$ と $-U$ が、三次元空間では同じ回転を表すと分かりました。しかし標準表現だけを眺めても、三次元・四次元・さらに高次元の表現がすべて現れるのかは分かりません。

今回の問いは、**有限次元複素既約表現を漏れなく作り、その次元と回転群への降下条件を決定すること**です。先に群の近くを微分して三つの行列の交換関係を調べ、最も高い固有値を持つベクトルから残りの基底を作ります。そのあとで群全体の表現へ戻します。ここで扱う表現は滑らかな有限次元複素表現です。

直接の前提は [Lie環表現](../LREP3/index.md#def-lrep3-lie-algebra-representation)、[既約表現](../LREP1/index.md#def-lrep1-irreducible)、[群からの微分](../LREP3/index.md#thm-lrep3-differentiation)、[SU(2)のLie環の形](../../LIE/LIE3/index.md#thm-lie3-unitary)、および [Pauli行列の積公式](../LREP5/index.md#lem-lrep5-pauli-product)です。双対・テンソル積は必要な箇所で [LREP4](../LREP4/index.md#def-lrep4-tensor-product)に接続します。

## 1. 三つの無限小作用へ言い換える

$SU(2)$ のLie環は反エルミートかつ跡が零の $2\times2$ 行列からなります。[Pauli行列](../LREP5/index.md#def-lrep5-pauli-model) $\sigma_1,\sigma_2,\sigma_3$ を用い、実基底を $A_j=(-i/2)\sigma_j$（$j=1,2,3$）と取ります。ここで $i^2=-1$ は虚数単位、$j$ は三つの行列を区別する添字です。

実基底の係数を実数から複素数へ広げることを**複素化**といいます。$A_j$ の複素線形結合はすべて跡零であり、以下の三つの組合せが任意の跡零複素 $2\times2$ 行列を張ります。この空間を $\mathfrak{sl}_2(\mathbb C)$ と記します。実Lie環とその複素化を区別したうえで、三つの生成子を導入します。

<a id="def-lrep6-sl2-triple"></a>
<!-- formal-statement-start -->
> **定義（標準三生成子）**  
> $SU(2)$ の実Lie環 $\mathfrak{su}(2)$ を複素化したLie環 $\mathfrak{su}(2)\otimes_{\mathbb R}\mathbb C$ を $\mathfrak{sl}_2(\mathbb C)$ と同一視する。この複素Lie環において
>
$$
H=2iA_3=\begin{pmatrix}1&0\\0&-1\end{pmatrix},\quad
E=iA_1-A_2=\begin{pmatrix}0&1\\0&0\end{pmatrix},\quad
F=iA_1+A_2=\begin{pmatrix}0&0\\1&0\end{pmatrix}
$$
>
> を**標準三生成子**とする。$H$ を基準となる対角作用素、$E$ を上昇作用素、$F$ を下降作用素として用いる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep6-sl2-triple -->
**定義の確認**。 [SU(2)のLie環の表示](../../LIE/LIE3/index.md#thm-lie3-unitary)に従う $A_1,A_2,A_3$ を代入します。$A_3=(-i/2)\operatorname{diag}(1,-1)$ なので $2iA_3=H$ です。また
$$
iA_1=\frac12\begin{pmatrix}0&1\\1&0\end{pmatrix},
\qquad
A_2=\frac12\begin{pmatrix}0&-1\\1&0\end{pmatrix}
$$
だから差が $E$、和が $F$ になります。任意の跡零複素行列は
$$
\begin{pmatrix}a&b\\c&-a\end{pmatrix}
=aH+bE+cF\qquad(a,b,c\in\mathbb C)
$$
と一意に書けます。したがってこの三つの行列は、実Lie環の複素化を跡零行列で表すための基底になっています。
<!-- definition-example-end -->

行列の積を確かめると、$HE=E$、$EH=-E$、$HF=-F$、$FH=F$、$EF=\operatorname{diag}(1,0)$、$FE=\operatorname{diag}(0,1)$ です。

<a id="lem-lrep6-brackets"></a>
<!-- formal-statement-start -->
> **補題（標準三生成子の交換関係）**  
> $\mathfrak{sl}_2(\mathbb C)$ の上の $H,E,F$ は
>
$$
[H,E]=2E,\qquad [H,F]=-2F,\qquad [E,F]=H
$$
>
> を満たし、この三つの行列は $\mathfrak{sl}_2(\mathbb C)$ の複素基底である。
<!-- formal-statement-end -->

**証明の見取り図。** 前段の六つの積の差を取ります。一般の跡零行列が対角・上下非対角の三成分に一意に分かれることが基底性を示します。

<!-- proof-start -->
### 証明

$[H,E]=HE-EH=E-(-E)=2E$、$[H,F]=HF-FH=-F-F=-2F$ です。また
$$
[E,F]=\begin{pmatrix}1&0\\0&0\end{pmatrix}
-\begin{pmatrix}0&0\\0&1\end{pmatrix}=H.
$$
任意の $\begin{pmatrix}a&b\\c&-a\end{pmatrix}$ は $aH+bE+cF$ と一意に書けるため、三つは複素基底です。$\square$
<!-- proof-end -->

## 2. 固有値の上端を見つける

一般のLie環表現 $\rho:\mathfrak{sl}_2(\mathbb C)\to\operatorname{End}_{\mathbb C}(V)$ では、同じ文字 $H,E,F$ を作用素 $\rho(H),\rho(E),\rho(F)$ にも使います。この約束を使うのは本講の以降です。

$Hv=\lambda v$ という固有値方程式を出発点にします。[交換関係](#lem-lrep6-brackets)から
$$
H(Ev)=E(Hv)+[H,E]v=(\lambda+2)Ev,
\qquad
H(Fv)=F(Hv)+[H,F]v=(\lambda-2)Fv.
$$
つまり、$Ev\ne0$ なら固有値が $2$ 増え、$Fv\ne0$ なら $2$ 減ります。有限次元では固有値の種類に限りがあるため、上へ動けないベクトルを選べるはずです。

<a id="def-lrep6-highest-weight"></a>
<!-- formal-statement-start -->
> **定義（ウェイトと最高ウェイトベクトル）**  
> $V$ を $\mathfrak{sl}_2(\mathbb C)$ の複素表現とする。零でない $v\in V$ が $Hv=\lambda v$ を満たすとき、$\lambda\in\mathbb C$ を $v$ の**ウェイト**、$v$ をウェイトベクトルという。さらに
>
$$
Hv=\lambda v,\qquad Ev=0,\qquad v\ne0
$$
>
> を満たすとき、$v$ を**最高ウェイトベクトル**、$\lambda$ をその**最高ウェイト**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep6-highest-weight -->
**定義の確認**。 標準表現 $V=\mathbb C^2$ に上の行列そのものを作用させ、列ベクトル $e_1=(1,0)^{\mathsf T}$ を取ります。$He_1=e_1$、$Ee_1=0$、$e_1\ne0$ なので $e_1$ は最高ウェイト $1$ のベクトルです。一方 $He_2=-e_2$ かつ $Ee_2=e_1\ne0$ なので $e_2$ はウェイト $-1$ のベクトルですが最高ウェイトベクトルではありません。両条件を別々に検査しました。
<!-- definition-example-end -->

最高ウェイトから $F$ を繰り返し作用させると、ウェイト $\lambda,\lambda-2,\lambda-4,\dots$ が生まれます。次の補題が「いつ止まるか」を決めます。

<a id="lem-lrep6-ladder"></a>
<!-- formal-statement-start -->
> **補題（昇降公式）**  
> $\rho$ を $\mathfrak{sl}_2(\mathbb C)$ の複素表現とし、$0\ne v\in V$ が $Hv=\lambda v$、$Ev=0$ を満たすとする。整数 $k\ge1$ に対し
>
$$
HF^kv=(\lambda-2k)F^kv,\qquad
EF^kv=k(\lambda-k+1)F^{k-1}v
$$
>
> が成立する。ここで $F^0v=v$ とする。
<!-- formal-statement-end -->

**証明の見取り図。** 第一式は $[H,F]=-2F$ を繰り返します。第二式では $E$ を $F$ の各因子の右側へ移し、$[E,F]=H$ を足し合わせます。係数は等差数列の和になります。

<!-- proof-start -->
### 証明

まず $HF=FH-2F$ です。$k=0$ は仮定 $Hv=\lambda v$ そのものです。$HF^{k-1}v=(\lambda-2(k-1))F^{k-1}v$ を仮定すると
$$
\begin{aligned}
HF^kv&=(FH-2F)F^{k-1}v\\
&=F(\lambda-2(k-1))F^{k-1}v-2F^kv\\
&=(\lambda-2k)F^kv.
\end{aligned}
$$
従って第一式が帰納的に成立します。次に積に対する交換子公式を $k$ 個の $F$ へ適用すると
$$
[E,F^k]=\sum_{j=0}^{k-1}F^j[E,F]F^{k-1-j}
=\sum_{j=0}^{k-1}F^jHF^{k-1-j}.
$$
右辺を $v$ に作用させます。第一式を $F^{k-1-j}v$ に適用して
$$
\begin{aligned}
[E,F^k]v
&=\sum_{j=0}^{k-1}(\lambda-2(k-1-j))F^{k-1}v\\
&=\left(k\lambda-2\sum_{m=0}^{k-1}m\right)F^{k-1}v\\
&=k(\lambda-k+1)F^{k-1}v.
\end{aligned}
$$
$Ev=0$ だから $EF^kv=[E,F^k]v+F^kEv$ の第二項は零となり、主張を得ます。$\square$
<!-- proof-end -->

## 3. 最高ウェイトから分類まで

ここで有限次元性を使います。互いに異なる固有値を持つ固有ベクトルは線形独立なので、下降が無限に続くことはありません。表現が既約であれば、下降で作った空間だけで $V$ 全体を張ります。

<a id="thm-lrep6-classification"></a>
<!-- formal-statement-start -->
> **定理（有限次元複素既約表現の分類）**  
> $V\ne\{0\}$ を有限次元複素ベクトル空間、$\rho:\mathfrak{sl}_2(\mathbb C)\to\operatorname{End}_{\mathbb C}(V)$ を既約な複素Lie環表現とする。このとき一意な整数 $n\ge0$ があり、最高ウェイトは $n$、複素次元は $n+1$ となる。適当な基底 $v_0,\dots,v_n$ について、$v_{-1}=v_{n+1}=0$ と書けば
>
$$
Hv_k=(n-2k)v_k,\quad
Ev_k=k\,v_{k-1},\quad
Fv_k=(n-k)v_{k+1}
\quad(0\le k\le n).
$$
>
> 逆にこの作用は各 $n\ge0$ で既約表現を与え、同じ $n$ の二つの有限次元複素既約表現は同値である。
<!-- formal-statement-end -->

**証明の見取り図。** $H$ の固有値の実部が最大の固有ベクトルから出発し、$E$ がそれを零にすることを示します。[昇降公式](#lem-lrep6-ladder)の最後の一段が $\lambda=n$ を強制します。その鎖が全空間を張るのは既約性によります。逆向きの存在は次節の具体的な多項式模型で構成し、そこまで含めて定理を閉じます。

<!-- proof-start -->
### 証明

複素数体上で $H$ は少なくとも一つ固有値を持ちます。有限次元ゆえ固有値集合は有限です。その中で実部が最大の $\lambda$ を選び、$0\ne v$、$Hv=\lambda v$ を満たすようにします。[交換関係](#lem-lrep6-brackets)と $Hv=\lambda v$ から $H(Ev)=E(Hv)+2Ev=(\lambda+2)Ev$ です。もし $Ev\ne0$ なら $\lambda+2$ が固有値となって実部最大性に反します。従って $Ev=0$ です。

$F^kv$ が非零なら [昇降公式](#lem-lrep6-ladder)によりその $H$ 固有値は $\lambda-2k$ です。これらは $k$ ごとに異なるので、非零の $F^kv$ が無限に存在すると有限次元性に反します。そこで $F^nv\ne0$、$F^{n+1}v=0$ となる最大の整数 $n\ge0$ を選びます。後者に $E$ を掛けると
$$
0=EF^{n+1}v=(n+1)(\lambda-n)F^nv.
$$
$n+1\ne0$ かつ $F^nv\ne0$ なので $\lambda=n$、特に非負整数です。

$W=\operatorname{span}_{\mathbb C}\{v,Fv,\dots,F^nv\}$ は $F$ で不変、[昇降公式](#lem-lrep6-ladder)により $H$ と $E$ でも不変です。三生成子はLie環全体を張るため、$W$ は表現の不変部分空間です。$v\ne0$ と既約性から $W=V$ です。各元の $H$ 固有値が異なるため基底となり、$\dim V=n+1$ です。

係数をそろえるため $v_k=\frac{(n-k)!}{n!}F^kv$ と置きます（$n=0$ では $v_0=v$）。すると
$$
\begin{aligned}
Fv_k&=\frac{(n-k)!}{n!}F^{k+1}v=(n-k)v_{k+1},\\
Ev_k&=\frac{(n-k)!}{n!}k(n-k+1)F^{k-1}v=k v_{k-1},
\end{aligned}
$$
および $Hv_k=(n-2k)v_k$ を得ます。最後の $Fv_n=0$、最初の $Ev_0=0$ も成り立ちます。

この基底上の三作用は $n$ だけで完全に決まります。同じ $n$ の二つの表現をそれぞれの $v_k$ を対応させる線形同型で結べば、$H,E,F$ と可換な [絡作用素](../LREP1/index.md#def-lrep1-intertwiner)になります。存在と逆向きの既約性は次節で示します。$\square$
<!-- proof-end -->

**何が重要だったか。** 最初から $H$ が対角化できると仮定していません。有限次元性で一つの最高ウェイトベクトルを取り、既約性でその下降鎖が全空間になると分かって、初めて対角化と次元公式が結論されます。この順序が分類の核心です。

## 4. 多項式で全表現を実際に作る

抽象的な基底の存在だけでは、元の $SU(2)$ がどう作用するか分かりません。ここで二変数の斉次多項式を使います。斉次とは、各項の $x,y$ の次数の和が同じであることです。例えば $x^2,xy,y^2$ は次数2で、三つを係数付きで足した空間は三次元です。

[テンソル積表現](../LREP4/index.md#def-lrep4-tensor-product)を $n$ 個重ね、テンソル因子をどのように並べ替えても変わらないベクトルの空間を**対称テンソルべき** $\operatorname{Sym}^n(\mathbb C^2)$ と呼びます（$n=0$ では $\mathbb C$）。この空間では $e_1$ と $e_2$ の個数だけが基底の種類を決め、その個数を単項式 $x^{n-k}y^k$ に記録できます。次の定義は、この対応を使って群作用を具体化するものです。

<a id="def-lrep6-symmetric-power"></a>
<!-- formal-statement-start -->
> **定義（斉次多項式表現）**  
> 整数 $n\ge0$ に対し、複素係数の二変数斉次多項式
>
$$
V_n=\left\{\sum_{k=0}^{n}c_kx^{n-k}y^k:\ c_k\in\mathbb C\right\}
$$
>
> を考える。$U=\begin{pmatrix}a&b\\c&d\end{pmatrix}\in SU(2)$ と行ベクトル $z=(x,y)$ に対し
>
$$
(D_n(U)P)(x,y)=P(ax+cy,bx+dy)=P(zU)
$$
>
> と定める。$D_n$ を**次数 $n$ の多項式表現**という。この模型は標準表現の対称テンソルべき $\operatorname{Sym}^n(\mathbb C^2)$ と同型である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep6-symmetric-power -->
**定義の確認**。 $D_n(U)$ は行ベクトル $z=(x,y)$ を $zU$ へ変換してから多項式 $P$ を評価する線形作用です。$n=2$ とし、$P=x^2+xy$、$U=\operatorname{diag}(u,u^{-1})$（$|u|=1$）を取ります。この $U$ は $U^\dagger U=I_2$ かつ $\det U=1$ なので $SU(2)$ の元です。代入すると
$$
D_2(U)P=(ux)^2+(ux)(u^{-1}y)=u^2x^2+xy
$$
で、再び次数2の斉次多項式です。$D_2(I)P=P$ であり、$U_1,U_2$ について
$$
D_2(U_1)D_2(U_2)P(z)
=P((zU_1)U_2)=D_2(U_1U_2)P(z)
$$
です。逆元では $D_2(U^{-1})D_2(U)=I$ なので可逆性も成立します。一般の $n$ でも代入の次数・結合律は同じです。
<!-- definition-example-end -->

多項式と対称テンソルの関係は [テンソル積の基底](../../../基礎科目/LA/LA3E/index.md#thm-la3e-tensor-product-existence-basis)から具体的に作れます。標準基底 $e_1,e_2$ を使った $n$ 重テンソル積を考えます。

$e_1$ を $n-k$ 個、$e_2$ を $k$ 個含む単純テンソルを、異なる並べ方すべてにわたって平均します。この対称テンソルを単項式 $x^{n-k}y^k$ に対応させます。

作用 $U^{\otimes n}$ はテンソル因子の置換と可換なので、対称部分空間を保ちます。作用と代入が一致する理由を $n=2$ で確かめましょう。$U=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ とすれば、列ベクトルへの作用は $Ue_1=ae_1+ce_2$、$Ue_2=be_1+de_2$ です。$s=\tfrac12(e_1\otimes e_2+e_2\otimes e_1)$ とおくと
$$
(U\otimes U)s
=ab(e_1\otimes e_1)+(ad+bc)s+cd(e_2\otimes e_2).
$$
これは $xy$ の像 $(ax+cy)(bx+dy)=abx^2+(ad+bc)xy+cdy^2$ と係数ごとに一致します。一般の $n$ でも各テンソル因子に $U$ を作用させて展開すると $P(zU)$ の単項式展開になり、この対応は基底を基底へ写す線形同型で群作用にも両立します。

<a id="thm-lrep6-polynomial-model"></a>
<!-- formal-statement-start -->
> **定理（多項式模型の既約性と群への積分）**  
> 各整数 $n\ge0$ について、$D_n:SU(2)\to GL_{\mathbb C}(V_n)$ は滑らかな $(n+1)$ 次元の既約複素表現である。その微分を複素線形に拡張すると
>
$$
H=x\partial_x-y\partial_y,\qquad
E=x\partial_y,\qquad
F=y\partial_x
$$
>
> となり、$v_k=x^{n-k}y^k$ に対して [分類定理](#thm-lrep6-classification)の三作用を与える。従って有限次元複素既約 $\mathfrak{sl}_2(\mathbb C)$ 表現はすべて $V_n$ と同値である。
<!-- formal-statement-end -->

**証明の見取り図。** 行ベクトル $z$ に右から $U$ を掛ける代入作用の群法則を検算します。次に $SU(2)$ の実Lie環方向での微分を連鎖律で求め、その複素線形拡張を $H,E,F$ に適用します。最後は、任意の不変部分空間が必ず $x^n$ を含み、下降作用で全基底を含むことを示します。

<!-- proof-start -->
### 証明

斉次次数は一次変数変換で保たれます。任意の $U_1,U_2\in SU(2)$ に対し
$$
\begin{aligned}
(D_n(U_1)D_n(U_2)P)(z)
&=(D_n(U_2)P)(zU_1)\\
&=P((zU_1)U_2)=D_n(U_1U_2)P(z).
\end{aligned}
$$
$D_n(I)=I$、$D_n(U)^{-1}=D_n(U^{-1})$ です。各係数は $U$ の成分の次数 $n$ の多項式なので滑らかです。単項式 $x^{n-k}y^k$ ($0\le k\le n$) が基底であるため次元は $n+1$ です。

微分と複素化をつなぎます。$Y\in\mathfrak{sl}_2(\mathbb C)$ に対し、$zY=(\alpha(x,y),\beta(x,y))$ と書きます。$\partial_xP$ は $y$ を固定した $x$ による偏微分、$\partial_yP$ は $x$ を固定した $y$ による偏微分です。実変数 $t$ による全微分は連鎖律から
$$
\begin{aligned}
L_YP(z)
&:=\left.\frac{d}{dt}\right|_{t=0}P(z+t\,zY)\\
&=\left.\frac{d}{dt}\right|_{t=0}
 P(x+t\alpha(x,y),y+t\beta(x,y))\\
&=\alpha(x,y)\partial_xP+\beta(x,y)\partial_yP
\end{aligned}
$$
となります。$X\in\mathfrak{su}(2)$ のとき $\exp(tX)=I_2+tX+O(t^2)$ なので、[群表現の微分](../LREP3/index.md#thm-lrep3-differentiation)における $dD_n(X)$ はこの $L_X$ に一致します。上式は $Y$ の成分について複素線形だから、$L_Y$ が $dD_n$ の複素線形拡張です。特に
$$
zH=(x,-y),\qquad zE=(0,x),\qquad zF=(y,0)
$$
を代入すると
$$
H=x\partial_x-y\partial_y,\qquad
E=x\partial_y,\qquad F=y\partial_x
$$
が得られます。ここで左辺の $H,E,F$ は多項式への作用素、右辺は偏微分作用素です。複素Lie環元 $H,E,F$ に対応する指数曲線を $SU(2)$ 内の実曲線と取り違える必要はありません。単項式へ作用させると
$$
\begin{aligned}
Hv_k&=(n-k-k)x^{n-k}y^k=(n-2k)v_k,\\
Ev_k&=k x^{n-k+1}y^{k-1}=k v_{k-1},\\
Fv_k&=(n-k)x^{n-k-1}y^{k+1}=(n-k)v_{k+1}.
\end{aligned}
$$

既約性を示します。$0\ne W\subseteq V_n$ が $H,E,F$ に関して不変とします。$H$ の固有値 $n,n-2,\dots,-n$ は相異なります。$0\ne w=\sum c_kv_k\in W$ の $c_j\ne0$ を一つ選ぶと、多項式
$$
p_j(T)=\prod_{\substack{0\le k\le n\\k\ne j}}
\frac{T-(n-2k)}{(n-2j)-(n-2k)}
$$
は $p_j(H)w=c_jv_j$ を与えます。ここで $T$ は一変数多項式の形式変数であり、各分母は $2(k-j)\ne0$ です（$n=0$ の空積は1）。$W$ の不変性から $v_j\in W$ です。$E^jv_j=j!v_0$ なので $v_0\in W$ であり、さらに
$$
F^kv_0=n(n-1)\cdots(n-k+1)v_k\ne0
\quad(0\le k\le n)
$$
だから全 $v_k\in W$ です。従って $W=V_n$ で既約です。[分類定理](#thm-lrep6-classification)の存在も証明されました。$\square$
<!-- proof-end -->

**手で見る最小例。** $n=0$ は $V_0=\mathbb C$ 上の自明表現、$n=1$ は $\mathbb C^2$ の標準表現です。$n=2$ の基底 $(x^2,xy,y^2)$ では
$$
H=\begin{pmatrix}2&0&0\\0&0&0\\0&0&-2\end{pmatrix},\quad
E=\begin{pmatrix}0&1&0\\0&0&2\\0&0&0\end{pmatrix},\quad
F=\begin{pmatrix}0&0&0\\2&0&0\\0&1&0\end{pmatrix}.
$$
例えば $EF-FE$ の対角成分は順に $2,0,-2$ で、$[E,F]=H$ と一致します。二次元の標準表現を「二次」にしただけで三次元表現が生まれました。

### なぜLie環だけの分類が群全体の分類になるのか

ここまでの計算は微分した作用を分類しましたが、元の群の表現が別々に存在する可能性も排除する必要があります。[指数曲線と表現の微分](../LREP3/index.md#thm-lrep3-differentiation)を使えば、$SU(2)$ ではこの心配が解消します。

<a id="prop-lrep6-group-lie-equivalence"></a>
<!-- formal-statement-start -->
> **命題（群表現と微分表現の既約性・同値性）**  
> $D:SU(2)\to GL_{\mathbb C}(V)$ を滑らかな有限次元複素群表現とし、その微分の複素線形拡張を $\rho:\mathfrak{sl}_2(\mathbb C)\to\operatorname{End}_{\mathbb C}(V)$ とする。部分空間 $W\subseteq V$ が $D$ に関して不変であることと $\rho$ に関して不変であることは同値である。また二つのこのような群表現の微分が同値なら、群表現も同値である。従って任意の有限次元複素既約 $SU(2)$ 表現は、ただ一つの $D_n$ と同値になる。
<!-- formal-statement-end -->

**証明の見取り図。** 群不変なら微分で不変です。逆向きはLie環の不変性から行列指数の不変性を導き、$SU(2)$ の全元が指数で表せることを使います。同値性にも同じ指数公式を適用します。

<!-- proof-start -->
### 証明

$W$ が $D(U)W\subseteq W$ を全ての $U\in SU(2)$ で満たすなら、$X\in\mathfrak{su}(2)$ と $w\in W$ に対して曲線 $t\mapsto D(\exp(tX))w$ は $W$ に入ります。$W$ は有限次元の線形部分空間だからその $t=0$ における導関数 $dD(X)w$ も $W$ に入ります。複素線形に延長しても同様です。

逆に $\rho(\mathfrak{sl}_2(\mathbb C))W\subseteq W$ なら、特に各実Lie環元 $X\in\mathfrak{su}(2)$ に対し $dD(X)W\subseteq W$ です。作用を反復して $dD(X)^mW\subseteq W$ となり、行列指数の冪級数（有限次元では収束する）により
$$
\exp(t\,dD(X))W\subseteq W.
$$
[指数と群表現の関係](../LREP3/index.md#thm-lrep3-differentiation)から左辺は $D(\exp(tX))W$ です。[SU(2)の軸角表示](../LREP5/index.md#prop-lrep5-rodrigues)により、任意の $U\in SU(2)$ は、ある実数 $\theta$ と単位 $\boldsymbol n$ を用いて
$$
U=\exp(-i\theta\,\boldsymbol n\cdot\boldsymbol\sigma/2)
$$
と書けるので、$W$ はすべての群元で不変です。これで既約性の同値を得ます。

二つの微分表現を結ぶ可逆な線形写像 $T$ があれば、各 $X$ に対し $T\,dD(X)=dD'(X)\,T$ です。冪級数で $T\exp(dD(X))=\exp(dD'(X))T$、従って同じ軸角表示から全 $U$ について $TD(U)=D'(U)T$ です。逆向きも微分すれば成立します。

任意の既約群表現を微分すると既約な $\mathfrak{sl}_2(\mathbb C)$ 表現になるので、[分類定理](#thm-lrep6-classification)により一意な $n$ に対応します。[多項式模型](#thm-lrep6-polynomial-model)の微分と同値であるため、今示した結果で群表現としても $D_n$ と同値です。$\square$
<!-- proof-end -->

## 5. 直交基底・整数条件・三次元回転

$U\in SU(2)$ は標準内積を保存します。[テンソル積表現の群法則と次元](../LREP4/index.md#thm-lrep4-tensor-representation)から、各因子の内積を掛けて作る内積は $U^{\otimes n}$ で保存されます。従って対称部分空間上の $D_n$ はユニタリです。

先ほどの単項式基底は正規直交基底ではありません。$n$ 個の位置のうち $k$ 個に $e_2$ が現れる配置の数を
$$
\binom nk=\frac{n!}{k!(n-k)!}
$$
と書きます。異なる配置の単純テンソルは互いに直交し、各ノルムは1です。従って全配置を平均した対称テンソルのノルム二乗は $1/\binom nk$ です。このノルムを1に直すと
$$
u_k=\sqrt{\binom nk}\,x^{n-k}y^k
\quad(0\le k\le n)
$$
が正規直交基底となります。

<a id="prop-lrep6-unitary-ladder"></a>
<!-- formal-statement-start -->
> **命題（正規直交基底の昇降係数）**  
> $V_n$ に上の $SU(2)$ 不変内積を与えると、正規直交基底 $u_k=\sqrt{\binom nk}x^{n-k}y^k$ において
>
$$
Hu_k=(n-2k)u_k,\quad
Eu_k=\sqrt{k(n-k+1)}\,u_{k-1},\quad
Fu_k=\sqrt{(k+1)(n-k)}\,u_{k+1}.
$$
>
> 端では $Eu_0=Fu_n=0$ であり、$H^\dagger=H$、$E^\dagger=F$ が成り立つ。
<!-- formal-statement-end -->

**証明の見取り図。** [多項式模型](#thm-lrep6-polynomial-model)の係数へ二つの組合せ数の比を代入します。随伴関係は隣り合う二つの基底の行列要素で確認します。

<!-- proof-start -->
### 証明

$Ev_k=k v_{k-1}$ より
$$
Eu_k=k\sqrt{\frac{\binom nk}{\binom n{k-1}}}\,u_{k-1}
=k\sqrt{\frac{n-k+1}{k}}\,u_{k-1}
=\sqrt{k(n-k+1)}\,u_{k-1}.
$$
下降作用にも二つの係数の比を入れます。
$$
\begin{aligned}
Fu_k
&=(n-k)\sqrt{\frac{\binom nk}{\binom n{k+1}}}\,u_{k+1}\\
&=(n-k)\sqrt{\frac{k+1}{n-k}}\,u_{k+1}\\
&=\sqrt{(k+1)(n-k)}\,u_{k+1}.
\end{aligned}
$$
$H$ は実数 $n-2k$ を対角成分に持つので自己共役です。また $E$ の $(k-1,k)$ 成分と $F$ の $(k,k-1)$ 成分は同じ非負実数 $\sqrt{k(n-k+1)}$ であり、互いに随伴です。$\square$
<!-- proof-end -->

前講の回転群 $SO(3)$ へ表現が降りる条件も、中心元の作用を調べるだけです。

<a id="thm-lrep6-descent"></a>
<!-- formal-statement-start -->
> **定理（回転群への降下と次元の偶奇）**  
> $D_n$ を $SU(2)$ の有限次元複素既約表現 $V_n$（$n\ge0$）とする。このとき
>
$$
D_n(-I_2)=(-1)^n I_{V_n}.
$$
>
> 従って $D_n$ が [二重被覆](../LREP5/index.md#thm-lrep5-double-cover)を経由して $SO(3)$ の通常の線形表現に降りるための必要十分条件は、$n$ が偶数であることである。
<!-- formal-statement-end -->

**証明の見取り図。** 多項式の変数 $(x,y)$ を $(-x,-y)$ に替えると、斉次次数だけ符号が現れます。その符号が被覆の核で恒等作用になるかを検査します。

<!-- proof-start -->
### 証明

[斉次多項式表現](#def-lrep6-symmetric-power)から
$$
D_n(-I_2)P(x,y)=P(-x,-y)
=\sum_{k=0}^n c_k(-x)^{n-k}(-y)^k
=(-1)^nP(x,y).
$$
[LREP5で求めた被覆の核](../LREP5/index.md#thm-lrep5-kernel-surjectivity)は $\{I_2,-I_2\}$ で、[二重被覆](../LREP5/index.md#thm-lrep5-double-cover)は滑らかな全射です。$D_n=\overline D_n\circ\Phi$ と因数分解できるなら、$\Phi(-I_2)=I_3$ より $D_n(-I_2)=I_{V_n}$ が必要です。

逆に $D_n(-I_2)=I_{V_n}$ とします。任意の $R\in SO(3)$ の持ち上げ $U\in SU(2)$ を選び、$\overline D_n(R):=D_n(U)$ と置きます。別の持ち上げは $-U$ なので
$$
D_n(-U)=D_n(-I_2)D_n(U)=D_n(U).
$$
従って定義は持ち上げによらず、群準同型性も $D_n$ から従います。二重被覆の局所的な滑らかな逆写像で $U$ を選べるため、$\overline D_n$ も滑らかです。これは [被覆核による降下判定](../LREP3/index.md#thm-lrep3-descent-criterion)と同じ核条件を、この具体的な被覆で直接検証したものです。よって必要十分条件は $(-1)^n=1$、すなわち $n$ が偶数であることです。$\square$
<!-- proof-end -->

例えば $n=1$ は二次元で降りず、$n=2$ は三次元で降ります。$SU(2)$ 上のすべての有限次元複素既約表現は $n+1$ 次元で存在しますが、$SO(3)$ の通常の表現に降りるのは奇数次元のものだけです。後講では $j=n/2$ と書き換え、整数・半整数の量子数として読みます。

## 6. 演習

### Level A

<a id="ex-lrep6-a01"></a>
#### LREP6-A01 三つの交換子を検算する
- Level: A

$H=\operatorname{diag}(1,-1)$、$E=\begin{pmatrix}0&1\\0&0\end{pmatrix}$、$F=\begin{pmatrix}0&0\\1&0\end{pmatrix}$ について、$[H,E]$、$[H,F]$、$[E,F]$ を成分ごとに求めよ。

<!-- solution-start -->
**詳細解答。** 定義より $[A,B]=AB-BA$ です。まず行列積を成分で求めると
$$
\begin{aligned}
HE&=\begin{pmatrix}0&1\\0&0\end{pmatrix},&
EH&=\begin{pmatrix}0&-1\\0&0\end{pmatrix},\\
HF&=\begin{pmatrix}0&0\\-1&0\end{pmatrix},&
FH&=\begin{pmatrix}0&0\\1&0\end{pmatrix},\\
EF&=\begin{pmatrix}1&0\\0&0\end{pmatrix},&
FE&=\begin{pmatrix}0&0\\0&1\end{pmatrix}.
\end{aligned}
$$
それぞれの差を取れば $[H,E]=2E$、$[H,F]=-2F$、$[E,F]=\operatorname{diag}(1,-1)=H$ となり、[交換関係](#lem-lrep6-brackets)に一致します。
<!-- solution-end -->

<a id="ex-lrep6-a02"></a>
#### LREP6-A02 二次多項式のウェイト
- Level: A

$V_2$ の基底 $(x^2,xy,y^2)$ において、$H,E,F$ の作用を各基底へ計算し、最高ウェイトベクトルを特定せよ。

<!-- solution-start -->
**詳細解答。** [多項式模型の微分作用](#thm-lrep6-polynomial-model)に $n=2$ を代入します。
$$
\begin{array}{c|ccc}
 &x^2&xy&y^2\\ \hline
H&2x^2&0&-2y^2\\
E&0&x^2&2xy\\
F&2xy&y^2&0
\end{array}
$$
例えば $E(xy)=x\partial_y(xy)=x^2$ です。$x^2\ne0$、$Hx^2=2x^2$、$Ex^2=0$ なので [最高ウェイトの定義](#def-lrep6-highest-weight)を全て満たし、最高ウェイトは2です。$xy$、$y^2$ は $E$ で零にならないため最高ウェイトベクトルではありません。
<!-- solution-end -->

<a id="ex-lrep6-a03"></a>
#### LREP6-A03 四次元の昇降係数
- Level: A

$V_3$ の単項式基底 $v_k=x^{3-k}y^k$ ($0\le k\le3$) について $Ev_2$、$Fv_2$、$Hv_2$ を求めよ。さらに $EFv_2-FEv_2$ が $Hv_2$ に一致することを示せ。

<!-- solution-start -->
**詳細解答。** $v_2=xy^2$ です。$E=x\partial_y$、$F=y\partial_x$ から
$$
Ev_2=2x^2y=2v_1,\qquad
Fv_2=y^3=v_3,\qquad
Hv_2=(1-2)xy^2=-v_2.
$$
さらに $Ev_3=3v_2$、$Fv_1=2v_2$ なので
$$
(EF-FE)v_2=E(v_3)-F(2v_1)=3v_2-4v_2=-v_2=Hv_2.
$$
[昇降公式](#lem-lrep6-ladder)を、具体的な多項式の微分からも検算できました。
<!-- solution-end -->

<a id="ex-lrep6-a04"></a>
#### LREP6-A04 被覆核での符号
- Level: A

$V_0,V_1,V_2,V_3$ のそれぞれで $-I_2$ がどう作用するか求め、$SO(3)$ へ降りる表現を挙げよ。

<!-- solution-start -->
**詳細解答。** [多項式表現の定義](#def-lrep6-symmetric-power)へ $-I_2$ を代入すると、次数 $n$ の任意の単項式は
$$
(-x)^{n-k}(-y)^k=(-1)^{n-k+k}x^{n-k}y^k=(-1)^n x^{n-k}y^k
$$
と変わります。従って $V_0,V_1,V_2,V_3$ での作用は順に $+I,-I,+I,-I$ です。[降下の定理](#thm-lrep6-descent)から $V_0,V_2$ のみが $SO(3)$ に降ります。
<!-- solution-end -->

### Level B

<a id="ex-lrep6-b01"></a>
#### LREP6-B01 昇降公式を帰納法で証明する
- Level: B

$[H,F]=-2F$、$[E,F]=H$、$Hv=\lambda v$、$Ev=0$ とする。$EF^{k+1}v$ を $EF^kv$ と $HF^kv$ から導き、$EF^kv=k(\lambda-k+1)F^{k-1}v$ を帰納的に証明せよ。

<!-- solution-start -->
**詳細解答。** $k=1$ では $EFv=(FE+H)v=Hv=\lambda v$ で、式の右辺は $1(\lambda-1+1)v=\lambda v$ です。$k$ で成立すると仮定します。まず $HF^kv=(\lambda-2k)F^kv$ は $HF=FH-2F$ を $k$ 回使って得ます。次に
$$
\begin{aligned}
EF^{k+1}v
&=(FE+H)F^kv\\
&=F(EF^kv)+HF^kv\\
&=k(\lambda-k+1)F^kv+(\lambda-2k)F^kv\\
&=(k+1)(\lambda-k)F^kv.
\end{aligned}
$$
これは $k+1$ に対する公式です。基底の $k=1$ と帰納段階が成立するので全 $k\ge1$ で成立します。
<!-- solution-end -->

<a id="ex-lrep6-b02"></a>
#### LREP6-B02 正規直交基底の隣接係数
- Level: B

$V_4$ の $u_k=\sqrt{\binom4k}x^{4-k}y^k$ に対し、$Eu_2$、$Fu_2$、$Eu_3$ を計算し、$\langle Eu_3,u_2\rangle=\langle u_3,Fu_2\rangle$ を検算せよ。内積は第一変数を共役線形、第二変数を線形とする。

<!-- solution-start -->
**詳細解答。** [正規直交基底の係数](#prop-lrep6-unitary-ladder)に $n=4$ を入れると
$$
Eu_2=\sqrt{2(4-2+1)}u_1=\sqrt6\,u_1,\quad
Fu_2=\sqrt{(2+1)(4-2)}u_3=\sqrt6\,u_3,
$$
$$
Eu_3=\sqrt{3(4-3+1)}u_2=\sqrt6\,u_2.
$$
従って正規直交性から $\langle Eu_3,u_2\rangle=\sqrt6$、$\langle u_3,Fu_2\rangle=\sqrt6$ で一致します。これは $E^\dagger=F$ の $(3,2)$ 成分の検算です。
<!-- solution-end -->

<a id="ex-lrep6-b03"></a>
#### LREP6-B03 標準表現のテンソル二乗を分解する
- Level: B

$\mathbb C^2\otimes\mathbb C^2$ に $U\otimes U$ を作用させる。$e_1\otimes e_2-e_2\otimes e_1$ が張る直線と、対称テンソルの三次元空間を不変部分空間と示し、それぞれ $V_0,V_2$ と同値であることを説明せよ。

<!-- solution-start -->
**詳細解答。** [二次元の交代形式と行列式](../LREP4/index.md#prop-lrep4-epsilon)により、$U=\begin{pmatrix}a&b\\c&d\end{pmatrix}\in SU(2)$ で
$$
(U\otimes U)(e_1\otimes e_2-e_2\otimes e_1)
=(ad-bc)(e_1\otimes e_2-e_2\otimes e_1)
=e_1\otimes e_2-e_2\otimes e_1.
$$
従ってこの直線は自明表現 $V_0$ です。一方 $U\otimes U$ は二因子を入れ替える作用 $T(v\otimes w)=w\otimes v$ と可換です。従って $T$ の固有値 $+1$ の空間も不変です。その基底は
$$
e_1\otimes e_1,\quad
\tfrac12(e_1\otimes e_2+e_2\otimes e_1),\quad
e_2\otimes e_2
$$
で、[対称多項式模型](#def-lrep6-symmetric-power)の $(x^2,xy,y^2)$ にそれぞれ対応し、作用が一致します。よって $V_2$ であり、[多項式模型の既約性](#thm-lrep6-polynomial-model)から既約です。交代・対称部分の次元は $1+3=4$ で全空間を張り、共通部分は零ですから $V_1\otimes V_1\cong V_0\oplus V_2$ です。
<!-- solution-end -->

<a id="ex-lrep6-b04"></a>
#### LREP6-B04 有限次元条件を失うと何が起きるか
- Level: B

任意の $\lambda\in\mathbb C$ と基底 $w_0,w_1,\dots$ の複素ベクトル空間（有限線形結合のみ）に
$$
Hw_k=(\lambda-2k)w_k,\quad Fw_k=w_{k+1},\quad
Ew_0=0,\quad Ew_k=k(\lambda-k+1)w_{k-1}\ (k\ge1)
$$
を与える。$[E,F]w_k=Hw_k$ と $[H,E]w_k=2Ew_k$、$[H,F]w_k=-2Fw_k$ を示し、$\lambda=\tfrac12$ でも無限次元表現が存在することを説明せよ。

<!-- solution-start -->
**詳細解答。** $k\ge0$ で（$k=0$ の第二項は零）
$$
\begin{aligned}
[E,F]w_k
&=Ew_{k+1}-FEw_k\\
&=((k+1)(\lambda-k)-k(\lambda-k+1))w_k\\
&=(\lambda-2k)w_k=Hw_k.
\end{aligned}
$$
$k\ge1$ では
$$
\begin{aligned}
[H,E]w_k
&=k(\lambda-k+1)(\lambda-2(k-1))w_{k-1}\\
&\quad-(\lambda-2k)k(\lambda-k+1)w_{k-1}\\
&=2k(\lambda-k+1)w_{k-1}=2Ew_k.
\end{aligned}
$$
$k=0$ は両辺零です。また
$$
[H,F]w_k=(\lambda-2k-2)w_{k+1}-(\lambda-2k)w_{k+1}=-2Fw_k.
$$
よって三生成子のLie環関係を満たします。$\lambda=1/2$ でも各作用は有限線形結合を有限線形結合へ送るので定義できます。$F^kw_0=w_k$ は全て非零であり、[分類定理](#thm-lrep6-classification)の証明で使った「下降が停止する」という有限次元性の部分が失われます。従って非整数の最高ウェイトもこの無限次元模型では可能です。
<!-- solution-end -->

### Level C

<a id="ex-lrep6-c01"></a>
#### LREP6-C01 四次元既約表現を最初から復元する
- Level: C

$V$ を $SU(2)$ の滑らかな四次元複素既約表現とする。$SU(2)$ はコンパクトなので [平均による不変内積](../LREP2/index.md#thm-lrep2-compact-averaging)を選ぶ。$H,E,F$ は表現の微分を複素線形に拡張した作用素とする。

1. 最高ウェイト $n$ と $H$ の固有値を求めよ。
2. 正規直交基底における $E,F$ の非零行列要素を求めよ。
3. $U(\theta)=\operatorname{diag}(e^{-i\theta/2},e^{i\theta/2})$ に対する群表現の固有値を求め、$\theta=2\pi$ の作用と $SO(3)$ への降下を判定せよ。

<!-- solution-start -->
**詳細解答。**

**設問1。** [有限次元既約表現の分類](#thm-lrep6-classification)より $\dim V=n+1$ です。$n+1=4$ から $n=3$ です。$k=0,1,2,3$ において $H$ の固有値は $n-2k$ なので、順に $3,1,-1,-3$ です。

**設問2。** 分類によって $V\cong V_3$ であり、$V_3$ の不変内積をその同型で $V$ に移せば、対応する $u_0,u_1,u_2,u_3$ は正規直交基底です。[正規直交基底の昇降公式](#prop-lrep6-unitary-ladder)を $n=3$ に適用すると
$$
\begin{aligned}
Eu_1&=\sqrt{1\cdot3}\,u_0=\sqrt3\,u_0,&
Eu_2&=\sqrt{2\cdot2}\,u_1=2u_1,&
Eu_3&=\sqrt{3\cdot1}\,u_2=\sqrt3\,u_2,\\
Fu_0&=\sqrt{1\cdot3}\,u_1=\sqrt3\,u_1,&
Fu_1&=\sqrt{2\cdot2}\,u_2=2u_2,&
Fu_2&=\sqrt{3\cdot1}\,u_3=\sqrt3\,u_3.
\end{aligned}
$$
従って $(u_0,u_1,u_2,u_3)$ の基底で $E$ は上側の隣接成分が $(\sqrt3,2,\sqrt3)$、$F=E^\dagger$ は下側の同成分を持ち、それ以外は零です。

**設問3。** [多項式表現](#def-lrep6-symmetric-power)へ $n=3$、$u=e^{-i\theta/2}$ を代入します。$u_k$ は $x^{3-k}y^k$ に定数を掛けたものなので
$$
D_3(U(\theta))u_k
=e^{-i(3-k)\theta/2}e^{ik\theta/2}u_k
=e^{-i(3-2k)\theta/2}u_k.
$$
四つの固有値は $e^{-3i\theta/2},e^{-i\theta/2},e^{i\theta/2},e^{3i\theta/2}$ です。$\theta=2\pi$ では各固有値は $-1$、すなわち $D_3(-I_2)=-I_4$ です。[降下条件](#thm-lrep6-descent)を満たさないので、この表現は $SO(3)$ の通常の四次元線形表現には降りません。
<!-- solution-end -->

## 7. まとめと次講

$\mathfrak{sl}_2(\mathbb C)$ の三つの交換関係から、最高ウェイト $n$ は非負整数に限られ、有限次元複素既約表現は一意に $V_n=\operatorname{Sym}^n(\mathbb C^2)$、次元 $n+1$ と分類できました。$SU(2)$ への積分は多項式の代入によって具体的に構成され、$-I_2$ は $(-1)^n$ 倍として作用します。従って偶数 $n$ の表現だけが通常の $SO(3)$ 表現に降ります。

次の **LREP7「角運動量とスピン量子数」** では、$n/2$ を $j$ と書き、正規直交基底で得た昇降係数と回転の生成子を量子力学の角運動量演算子に結び付けます。
