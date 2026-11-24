# LREP11 有限次元Lorentz既約表現

<!-- definition-example-audit: strict -->

[前講の二重被覆](../LREP10/index.md#thm-lrep10-double-cover)によって、Lorentz変換を行列 $S\in SL(2,\mathbb C)$ で持ち上げられました。しかし二成分ベクトル以外にも、四元ベクトルやより多くの成分を持つ場があります。どのような有限次元の変換則があり得るのでしょうか。

[LREP6の分類](../LREP6/index.md#thm-lrep6-classification)では一つの $\mathfrak{sl}_2(\mathbb C)$ に対し非負整数一つが既約表現を決めました。今回は [LREP9の二因子分解](../LREP9/index.md#thm-lrep9-two-sl2)を利用し、非負整数の組で分類します。計量は $\eta=\operatorname{diag}(-1,1,1,1)$、作用は能動変換とします。対象は非零の有限次元複素ベクトル空間上の滑らかな表現です。

## 1. 実Lie環から二つの独立な作用へ

$G=SL(2,\mathbb C)$ は複素行列からなる群ですが、ここでは実六次元Lie群として扱います。被覆写像の微分は [LREP10の二重被覆定理](../LREP10/index.md#thm-lrep10-double-cover)より実Lie環の同型です。群表現 $D$ を微分すると [群表現の微分定理](../LREP3/index.md#thm-lrep3-differentiation)によりLie環表現 $dD$ が得られます。作用先は複素線形作用素なので、実Lie環の複素化へ

$$
dD_{\mathbb C}(X+iY)=dD(X)+i\,dD(Y)
$$

と延長できます。括弧が保たれるのは、括弧を四項に展開し、それぞれに実Lie環表現の交換子保存性を適用できるからです。

[LREP9の分解](../LREP9/index.md#thm-lrep9-two-sl2)では回転・boost の実生成子 $R_i,B_i$ から

$$
A_i=(R_i+iB_i)/2,\qquad C_i=(R_i-iB_i)/2
$$

を作りました。各組は $\mathfrak{sl}_2(\mathbb C)$ と同型で、互いに可換です。この講では $C$ 側を左、$A$ 側を右とします。この選択は後で標準二成分作用と対応させます。

ここで $A_i,C_i$ の各組を $T_i=-i\sigma_i/2$ へ送る同型は、[二因子分解の証明](../LREP9/index.md#thm-lrep9-two-sl2)で構成したものです。

各因子の基底には [標準三生成子](../LREP6/index.md#def-lrep6-sl2-triple) $H,E,F$ を使い、左と右を添字 $L,R$ で区別します。それぞれの括弧は

$$
[H,E]=2E,\quad [H,F]=-2F,\quad [E,F]=H.
$$

左右のすべての混合括弧は零です。したがって右の作用をしても左のウェイト（$H_L$ の固有値）は変わりません。

## 2. 二つの整数から表現を組み立てる

[LREP6の斉次多項式表現](../LREP6/index.md#def-lrep6-symmetric-power)の空間 $V_m$ を再利用します。$m$ は非負整数で、基底は $x^{m-a}y^a$（$0\le a\le m$）です。今度はもう一組の変数 $u,v$ を使う次数 $n$ の空間も用意します。二組を [テンソル積表現](../LREP4/index.md#def-lrep4-tensor-product)で合わせると、左右の作用を別々に指定できます。

<a id="def-lrep11-pair"></a>

<!-- formal-statement-start -->
> **定義（左右次数による表現）**  
> 非負整数 $m,n$ に対し、複素空間 $W_{m,n}=V_m\otimes V_n$ 上で左因子は第1因子、右因子は第2因子に作用するものとする。$X,Y\in\mathfrak{sl}_2(\mathbb C)$ に対して

$$
\rho(X,Y)=\rho_m(X)\otimes I+I\otimes\rho_n(Y).
$$

> ここで $\rho_m,\rho_n$ は次数 $m,n$ の斉次多項式の微分表現である。半整数の組による表示は $(j_L,j_R)=(m/2,n/2)$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep11-pair -->
**定義の確認**。 $m=n=1$ では基底は $xu,xv,yu,yv$ です。$E_L=x\partial_y$、$F_R=v\partial_u$ なので

$$
E_L(yu)=xu,\qquad F_R(xu)=xv.
$$

逆順でも $F_R(yu)=yv$、$E_L(yv)=xv$ です。一般に異なる因子の作用は $(M\otimes I)(I\otimes N)=M\otimes N=(I\otimes N)(M\otimes I)$ により可換です。同じ因子内では、例えば $[E_L,F_L](xu)=xu=H_L(xu)$ となります。一般の $X,X',Y,Y'$ について混合項が消えるので

$$
[\rho(X,Y),\rho(X',Y')]
=\rho([X,X'],[Y,Y']).
$$

これで複素線形性と括弧保存性を確認できました。四つの単項式は独立であり、次元は $4$ です。
<!-- definition-example-end -->

基底を $w_{a,b}=x^{m-a}y^a u^{n-b}v^b$ と書くと、[多項式模型の既約性と群への積分](../LREP6/index.md#thm-lrep6-polynomial-model)から

$$
\begin{aligned}
H_Lw_{a,b}&=(m-2a)w_{a,b},\\
E_Lw_{a,b}&=a w_{a-1,b},\\
F_Lw_{a,b}&=(m-a)w_{a+1,b}.
\end{aligned}
$$

$$
\begin{aligned}
H_Rw_{a,b}&=(n-2b)w_{a,b},\\
E_Rw_{a,b}&=b w_{a,b-1},\\
F_Rw_{a,b}&=(n-b)w_{a,b+1}.
\end{aligned}
$$

端で係数が零になる項は零とします。左右の固有値が組になって基底を一意に指定する点が、分類証明の鍵です。

<a id="thm-lrep11-classification"></a>

<!-- formal-statement-start -->
> **定理（二因子の有限次元複素既約表現の分類）**  
> 複素Lie環 $\mathfrak{sl}_2(\mathbb C)\oplus\mathfrak{sl}_2(\mathbb C)$ の非零有限次元複素既約表現は、ただ一組の非負整数 $m,n$ に対する $W_{m,n}$ と同値である。各 $W_{m,n}$ は既約であり、

$$
\dim_{\mathbb C}W_{m,n}=(m+1)(n+1)
=(2j_L+1)(2j_R+1).
$$

<!-- formal-statement-end -->

**証明の見取り図。** まず左右のウェイトを同時に上げられなくなるベクトルを探します。二方向の下降作用で長方形の基底を作り、既約性によりそれが空間全体となることを示します。逆に多項式模型では二つのウェイトから任意の基底を取り出せるため、途中だけを残す不変部分空間はありません。

<!-- proof-start -->
### 証明

任意の非零有限次元既約表現 $W$ を取ります。以下、生成子とその作用素を同じ記号で表します。$H_L,H_R$ は可換なので、$H_L$ の固有空間は $H_R$ で不変です。複素数体上でその空間に $H_R$ の固有ベクトルが存在するため、共通固有ベクトルが存在します。

共通固有値の組 $(\lambda,\mu)$ のうち $\operatorname{Re}(\lambda+\mu)$ が最大のものを選び、対応する非零ベクトルを $w$ とします。交換関係から

$$
H_LE_Lw=(\lambda+2)E_Lw,\qquad H_RE_Lw=\mu E_Lw.
$$

もし $E_Lw\ne0$ なら実部の和が2大きくなり、選び方に矛盾します。右側では交換子 $[H_R,E_R]=2E_R$ と $[H_L,E_R]=0$ から

$$
H_RE_Rw=(\mu+2)E_Rw,\qquad H_LE_Rw=\lambda E_Rw.
$$

非零ならやはり実部の和が2大きくなるため $E_Rw=0$ です。

$F_L^a w$ が非零なら $H_L$ の固有値は $\lambda-2a$ です。有限次元性よりある最大の整数 $p\ge0$ で $F_L^p w\ne0$、$F_L^{p+1}w=0$ となります。[昇降公式](../LREP6/index.md#lem-lrep6-ladder)を左の三生成子と最高ウェイトベクトル $w$ に適用すると

$$
E_LF_L^{p+1}w=(p+1)(\lambda-p)F_L^pw=0.
$$

よって $\lambda=p$ です。右にも同じ公式を適用し、$F_R^q w\ne0$、$F_R^{q+1}w=0$ となる最大の $q$ について

$$
E_RF_R^{q+1}w=(q+1)(\mu-q)F_R^qw=0
$$

より $\mu=q$ です。以下 $m=p,n=q$ とします。

$0\le a\le m,0\le b\le n$ に対して $f_{a,b}=F_L^aF_R^bw$ と置きます。左右の可換性と昇降公式を繰り返すと

$$
E_L^aE_R^b f_{a,b}
=\frac{a!m!}{(m-a)!}\frac{b!n!}{(n-b)!}w.
$$

係数は非零なので $f_{a,b}\ne0$ です。これらは共通固有値 $(m-2a,n-2b)$ がすべて異なります。例えば $H_L$ の固有値 $m-2a$ だけを残す多項式

$$
P_a(t)=\prod_{\substack{0\le c\le m\\c\ne a}}
\frac{t-(m-2c)}{(m-2a)-(m-2c)}
$$

と、右の $Q_b$（$m,a,c$ を $n,b,d$ に置換）を使えば、線形関係に $P_a(H_L)Q_b(H_R)$ を作用させて個々の係数が零と分かります。空積は1です。従って全 $f_{a,b}$ は独立です。

その線形包は六生成子で不変です。$H_L,H_R$ は固有値を掛け、$F_L,F_R$ は添字を一つ増やします。端では $F_L^{m+1}w=0$、$F_R^{n+1}w=0$ と可換性から零です。上昇については

$$
E_L f_{a,b}=a(m-a+1)f_{a-1,b},
$$

$$
E_R f_{a,b}=b(n-b+1)f_{a,b-1}.
$$

したがって既約性により線形包は $W$ 全体です。多項式模型と係数をそろえるため、基底を

$$
g_{a,b}=\frac{(m-a)!(n-b)!}{m!n!}f_{a,b}
$$

に取り替えます。$c_{a,b}=(m-a)!(n-b)!/(m!n!)$ と置くと、下降端を除いて

$$
\frac{c_{a,b}}{c_{a+1,b}}=m-a,\qquad
\frac{c_{a,b}}{c_{a,b+1}}=n-b.
$$

従って下降係数はそれぞれ $m-a,n-b$ です。上昇端を除けば

$$
\frac{c_{a,b}}{c_{a-1,b}}=\frac1{m-a+1},\qquad
\frac{c_{a,b}}{c_{a,b-1}}=\frac1{n-b+1}.
$$

これらを昇降公式の係数に掛けると、上昇係数はそれぞれ $a,b$ になります。端では元の作用が零なので、上で示した多項式の全基底作用に一致します。よって $g_{a,b}\mapsto w_{a,b}$ は六作用を保つ線形同型です。

逆に $W_{m,n}$ の非零不変部分空間から任意の非零ベクトルを取り、その非零係数に対応する $P_a(H_L)Q_b(H_R)$ を作用させれば $w_{a,b}$ が得られます。$E_L^aE_R^b$ で $a!b!w_{0,0}$ に至り、下降作用によってすべての基底を得るので既約です。

最後に両作用の固有値の集合の最大値はそれぞれ $m,n$ です。同値な表現では各作用素の固有値が保存されるため、この組は一意です。$\square$
<!-- proof-end -->

## 3. 群の有限変換を構成する

Lie環だけの分類では、有限の変換や被覆の核の作用はまだ分かりません。そこで多項式の変数代入を $SL(2,\mathbb C)$ 全体へ拡張します。$P_k(M)$ は行ベクトル $z$ を $zM$ に置き換える次数 $k$ の作用です。[LREP6の多項式模型](../LREP6/index.md#thm-lrep6-polynomial-model)と同じ結合律が任意の行列式1の複素行列にも成立します。

<a id="thm-lrep11-group"></a>

<!-- formal-statement-start -->
> **定理（被覆群の有限次元既約表現）**  
> 非負整数 $m,n$ に対し $G=SL(2,\mathbb C)$ の実Lie群としての滑らかな複素表現を

$$
D_{m,n}(S)=P_m(S)\otimes P_n((S^\dagger)^{-1})
$$

> と定める。ここで $P_k(M)$ は次数 $k$ の斉次多項式への代入作用である。この表現は既約であり、$G$ の非零有限次元滑らかな複素既約表現はすべてただ一組の $D_{m,n}$ と同値である。
<!-- formal-statement-end -->

**証明の見取り図。** 右側の逆共役転置は積の順序を二度反転するので群準同型になります。微分によって左と右がそれぞれ $C$ と $A$ に対応することを確かめ、先ほどの分類に帰着します。

<!-- proof-start -->
### 証明

$Q(S)=(S^\dagger)^{-1}$ と置くと $\det Q(S)=1$ で、

$$
Q(ST)=(T^\dagger S^\dagger)^{-1}
=(S^\dagger)^{-1}(T^\dagger)^{-1}=Q(S)Q(T).
$$

$P_k(ST)=P_k(S)P_k(T)$ は代入の結合律から得られます。従って $D$ は群法則と単位元を保ち、逆元の作用も存在します。成分は行列要素とその共役の滑らかな関数です。

[LREP10の合同作用](../LREP10/index.md#def-lrep10-sl2c-action)を微分すると $X\mapsto MX+XM^\dagger$ となります。回転とboostに対応する二種類の行列を取ります。

$$
T_i=-i\sigma_i/2,\qquad U_i=\sigma_i/2.
$$

[Pauli行列の積公式](../LREP5/index.md#lem-lrep5-pauli-product)から、回転方向では

$$
[T_i,\sigma_j]=\sum_k\varepsilon_{ijk}\sigma_k
$$

となり、時間成分の単位行列とは可換です。boost方向では

$$
U_i I+IU_i=\sigma_i,\qquad
U_i\sigma_j+\sigma_j U_i=\delta_{ij}I.
$$

これは [回転・boostの定義](../LREP9/index.md#def-lrep9-rotation-boost)の作用に一致するため、$T_i$ は $R_i$、$U_i$ は $B_i$ を誘導します。

$Q(\exp(tM))=\exp(-tM^\dagger)$ なので右因子の微分は $M\mapsto -M^\dagger$ を経由します。$T_i^\dagger=-T_i$、$U_i^\dagger=U_i=iT_i$ です。従って

$$
\begin{aligned}
dD(R_i)&=\rho_m(T_i)\otimes I+I\otimes\rho_n(T_i),\\
dD(B_i)&=i\rho_m(T_i)\otimes I-iI\otimes\rho_n(T_i).
\end{aligned}
$$

複素線形に延長して $C_i=(R_i-iB_i)/2$、$A_i=(R_i+iB_i)/2$ を代入すると

$$
dD_{\mathbb C}(C_i)=\rho_m(T_i)\otimes I,\qquad
dD_{\mathbb C}(A_i)=I\otimes\rho_n(T_i).
$$

これは [二因子の分類定理](#thm-lrep11-classification)の $W_{m,n}$ の作用です。

群の不変複素部分空間は微分で不変です。逆に微分の不変部分空間は指数の級数により各 $D(\exp M)=\exp(dD(M))$ で不変です（[群表現の微分定理](../LREP3/index.md#thm-lrep3-differentiation)）。[Lie 群の指数写像の滑らかさと単位元近傍での局所可逆性](../../LIE/LIE2/index.md#thm-lie2-exponential-local-diffeomorphism)により単位元近傍は指数の像で覆われ、その近傍で生成される部分群は開であり、他の剰余類も開なので閉でもあります。[SL(2,C)の道連結性](../LREP10/index.md#lem-lrep10-polar-connectivity)によりこの部分群は全群です。従って微分の不変部分空間は群でも不変です。複素部分空間であるため微分とその複素化の不変性は同値です。

任意の既約群表現の複素化した微分は既約であり、[二因子の分類](#thm-lrep11-classification)からある $W_{m,n}$ と同値です。その同型はすべての微分作用を絡めるため指数作用も絡めます。近傍が全群を生成するので群表現を絡めます。逆に $D_{m,n}$ は微分が既約なので既約です。一意性は微分の分類に従います。$\square$
<!-- proof-end -->

## 4. どの表現がLorentz群そのものに降りるか

被覆群では $S$ と $-S$ は別の元ですが、同じLorentz変換になります。[被覆核による降下判定](../LREP3/index.md#thm-lrep3-descent-criterion)により、この二つの作用が一致することが必要です。

<a id="thm-lrep11-descent"></a>

<!-- formal-statement-start -->
> **定理（Lorentz群への降下条件）**  
> 被覆群 $SL(2,\mathbb C)$ の表現 $D_{m,n}$ は $SO^+(1,3)$ の滑らかな複素表現へ降下することと $m+n$ が偶数であることが同値である。
<!-- formal-statement-end -->

**証明の見取り図。** 斉次多項式の次数が、核の元 $-I_2$ の作用の符号を決めます。

<!-- proof-start -->
### 証明

$P_m(-I_2)P(z)=P(-z)=(-1)^m P(z)$ であり、$Q(-I_2)=-I_2$ です。従って

$$
D_{m,n}(-I_2)=(-1)^{m+n}I_{(m+1)(n+1)}.
$$

[二重被覆](../LREP10/index.md#thm-lrep10-double-cover)の核は $\{I_2,-I_2\}$ です。[被覆核による降下判定](../LREP3/index.md#thm-lrep3-descent-criterion)をこの核へ適用すると、核が自明に作用するための必要十分条件は $(-1)^{m+n}=1$ です。$\square$
<!-- proof-end -->

| $(j_L,j_R)$ | 次元 | $-I_2$ の作用 | 降下 |
| --- | ---: | ---: | --- |
| $(0,0)$ | 1 | $+1$ | 可 |
| $(1/2,0)$ | 2 | $-1$ | 不可 |
| $(0,1/2)$ | 2 | $-1$ | 不可 |
| $(1/2,1/2)$ | 4 | $+1$ | 可 |

最初の表現はスカラーの自明な作用です。二つの二次元表現は次講のWeylスピノルへつながります。四次元表現が四元ベクトルとどう結び付くかを、次に確認します。

<a id="prop-lrep11-vector"></a>

<!-- formal-statement-start -->
> **命題（四元ベクトルの複素化）**  
> $SO^+(1,3)$ の実四元ベクトル作用を複素線形に延長して被覆群に持ち上げた表現は $D_{1,1}$ と同値である。
<!-- formal-statement-end -->

**証明の見取り図。** 実四元ベクトルをエルミート行列へ移した前講の模型を、複素係数の全行列に拡張します。右側の逆共役転置を、二次元の交代形式によって右からの共役転置へ変換します。

<!-- proof-start -->
### 証明

[エルミート行列模型](../LREP10/index.md#def-lrep10-hermitian-model)の基底 $I_2,\sigma_1,\sigma_2,\sigma_3$ は複素係数でも独立で、全複素2次行列空間を張ります。従って複素化した四元ベクトルの作用は $X\mapsto SXS^\dagger$ です。

$\epsilon=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ とします。[二次元交代形式と行列式](../LREP4/index.md#prop-lrep4-epsilon)を転置行列へ適用するため、任意の行列式1の二次行列 $M=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ に対し、次の積で確かめます。

$$
M\epsilon M^{\mathsf T}
=\begin{pmatrix}-b&a\\-d&c\end{pmatrix}
 \begin{pmatrix}a&c\\b&d\end{pmatrix}
=\epsilon.
$$

特に $M=\overline S$ とすると $\overline S^{-1}\epsilon=\epsilon S^\dagger$ です。次数1の多項式模型を列ベクトルと同一視し、$\Phi(v\otimes w)=vw^{\mathsf T}\epsilon$ と定めます。$e_i e_j^{\mathsf T}$ は全行列の基底であり、右からの $\epsilon$ は可逆なので $\Phi$ は線形同型です。また

$$
\begin{aligned}
\Phi(Sv\otimes Q(S)w)
&=Sv w^{\mathsf T}\overline S^{-1}\epsilon\\
&=S(vw^{\mathsf T}\epsilon)S^\dagger .
\end{aligned}
$$

従って二つの作用を絡めます。$\square$
<!-- proof-end -->

回転だけに制限すると $S\in SU(2)$ では $Q(S)=S$ なので左右の表現を同時に回転させることになります。[Clebsch–Gordan分解](../LREP8/index.md#thm-lrep8-clebsch-gordan)を適用すると回転スピンは $|j_L-j_R|$ から $j_L+j_R$ まで1ずつ現れます。例えば $(1/2,1/2)$ は回転だけならスピン0と1に分かれます。時間成分と空間三成分に対応しますが、boost は両者を混ぜるのでLorentz群としては既約です。

## 5. なぜ有限次元の非自明な作用はユニタリではないか

回転の有限次元表現では正定値内積を保存できました。しかし boost は指数的な拡大と縮小を含みます。内積の選び方を変えても、この性質は消えません。

<a id="thm-lrep11-nonunitary"></a>

<!-- formal-statement-start -->
> **定理（有限次元正定値ユニタリ表現の自明性）**  
> $SL(2,\mathbb C)$ または $SO^+(1,3)$ の有限次元滑らかな複素表現がある正定値エルミート内積を保存するなら、その作用はすべて単位作用素である。
<!-- formal-statement-end -->

**証明の見取り図。** 対角boost の固有値を求めると非自明な既約表現には絶対値1を超える固有値が現れます。内積を保存する作用素にはそのような固有値は存在できません。

<!-- proof-start -->
### 証明

実数 $t$ に対し $S_t=\operatorname{diag}(e^{t/2},e^{-t/2})$ とすると $Q(S_t)=S_t^{-1}$ です。[被覆群の表現](#thm-lrep11-group)の基底で

$$
D_{m,n}(S_t)w_{a,b}
=e^{(m-2a-n+2b)t/2}w_{a,b}.
$$

$a=0,b=n$ を取ると固有値は $e^{(m+n)t/2}$ です。$m+n>0,t>0$ なら1を超えます。正定値内積で非零の固有ベクトル $w$ のノルムを保存すると

$$
\|D(S_t)w\|^2=|\lambda|^2\|w\|^2=\|w\|^2
$$

より $|\lambda|=1$ が必要なので矛盾します。従って正定値内積を保存する既約表現は $m=n=0$ に限られます。

一般の有限次元表現でも不変部分空間 $U$ に対し直交補空間 $U^\perp$ は不変です。実際 $v\in U^\perp,u\in U$ なら

$$
\langle D(S)v,u\rangle=\langle v,D(S^{-1})u\rangle=0.
$$

次元に関する帰納法で既約不変部分空間の直和に分解でき、その各成分は同じ正定値内積を保存するので自明です。Lorentz群の場合も [二重被覆](../LREP10/index.md#thm-lrep10-double-cover)で持ち上げて同じ結論を得て、被覆の全射性から元の作用も自明です。$\square$
<!-- proof-end -->

四元ベクトル作用がMinkowski計量を保存することとは矛盾しません。計量には負の方向があり、正定値内積ではないからです。また有限次元の場の成分と、無限次元の1粒子状態空間は区別する必要があります。

## 6. 演習

### Level A

<a id="ex-lrep11-a01"></a>

#### LREP11-A01 次元と降下
- Level: A
- ID: LREP11-A01

$(j_L,j_R)=(1,1/2),(3/2,1/2),(0,2)$ の次元とLorentz群への降下の可否を求めよ。

<!-- solution-start -->
**詳細解答。** [分類定理](#thm-lrep11-classification)で $m=2j_L,n=2j_R$ と置くと、それぞれ $(2,1),(3,1),(0,4)$ です。[降下条件](#thm-lrep11-descent)から和の偶奇を調べます。

| $(m,n)$ | 次元 | 和 | 降下 |
| --- | ---: | ---: | --- |
| $(2,1)$ | $3\cdot2=6$ | 3 | 不可 |
| $(3,1)$ | $4\cdot2=8$ | 4 | 可 |
| $(0,4)$ | $1\cdot5=5$ | 4 | 可 |
<!-- solution-end -->

<a id="ex-lrep11-a02"></a>

#### LREP11-A02 左右の昇降
- Level: A
- ID: LREP11-A02

$W_{2,1}$ の $xyv$ に $H_L,H_R,E_L,F_R$ を作用させよ。

<!-- solution-start -->
**詳細解答。** $xyv=w_{1,1}$ です。[左右次数の表現](#def-lrep11-pair)より

$$
\begin{aligned}
H_L(xyv)&=(2-2)xyv=0,\\
H_R(xyv)&=(1-2)xyv=-xyv,\\
E_L(xyv)&=x\partial_y(xyv)=x^2v,\\
F_R(xyv)&=v\partial_u(xyv)=0.
\end{aligned}
$$

最後の零は右側がすでに下降端にいるためです。
<!-- solution-end -->

<a id="ex-lrep11-a03"></a>

#### LREP11-A03 逆共役転置の具体計算
- Level: A
- ID: LREP11-A03

$S=\begin{pmatrix}1&z\\0&1\end{pmatrix}$、$z\in\mathbb C$ に対し $Q(S)$ を求め、行列式と逆元を確認せよ。

<!-- solution-start -->
**詳細解答。** [被覆群の表現](#thm-lrep11-group)の右作用を成分で計算します。

$$
S^\dagger=\begin{pmatrix}1&0\\\overline z&1\end{pmatrix},
\quad Q(S)=\begin{pmatrix}1&0\\-\overline z&1\end{pmatrix}.
$$

両方の積は非対角成分が $\overline z-\overline z=0$ で単位行列です。三角行列の対角積より $\det Q(S)=1$ です。
<!-- solution-end -->

<a id="ex-lrep11-a04"></a>

#### LREP11-A04 boostの固有値
- Level: A
- ID: LREP11-A04

$D_{1,1}(S_t)$ の四つの固有値を基底 $xu,xv,yu,yv$ の順に求めよ。

<!-- solution-start -->
**詳細解答。** [群表現](#thm-lrep11-group)の代入で $x\mapsto e^{t/2}x$、$y\mapsto e^{-t/2}y$、$u\mapsto e^{-t/2}u$、$v\mapsto e^{t/2}v$ です。

$$
xu\mapsto xu,\quad xv\mapsto e^t xv,
\quad yu\mapsto e^{-t}yu,\quad yv\mapsto yv.
$$

固有値は $1,e^t,e^{-t},1$ です。$t\ne0$ では一方の指数固有値が1より大きいので正定値内積を保存できません。
<!-- solution-end -->

### Level B

<a id="ex-lrep11-b01"></a>

#### LREP11-B01 二方向の最高ウェイト
- Level: B
- ID: LREP11-B01

二因子の有限次元複素表現で非零の共通最高ウェイトベクトル $w$ を取る。すなわち $E_Lw=E_Rw=0$、$H_Lw=2w$、$H_Rw=w$ とする。このとき $f=F_L^2F_Rw$ が非零であることを上昇作用で確認し、その共通固有値を求めよ。

<!-- solution-start -->
**詳細解答。** [昇降公式](../LREP6/index.md#lem-lrep6-ladder)を左右に使います。$E_R F_Rw=H_Rw=w$ であり、左の作用は右と可換なので $E_R f=F_L^2w$ です。左では

$$
E_LF_L^2w=2(2-2+1)F_Lw=2F_Lw,
$$

$$
E_L^2F_L^2w=2H_Lw=4w.
$$

従って $E_L^2E_Rf=4w\ne0$ であり $f$ は非零です。下降ごとに固有値が2下がるので共通固有値は $(2-4,1-2)=(-2,-1)$ です。
<!-- solution-end -->

<a id="ex-lrep11-b02"></a>

#### LREP11-B02 共通ウェイトの取り出し
- Level: B
- ID: LREP11-B02

$W_{1,1}$ で $h=xu+2xv+3yu+4yv$ から $xv$ の成分だけを生成子の多項式で取り出せ。

<!-- solution-start -->
**詳細解答。** [分類定理の射影構成](#thm-lrep11-classification)を $m=n=1$ に適用します。$H_L$ の固有値は $x$ 側で1、$y$ 側で $-1$ なので $P=(H_L+I)/2$ は $x$ を含む成分を残します。$H_R$ は $v$ 側で $-1$ なので $Q=(I-H_R)/2$ が必要です。

$$
Ph=xu+2xv,\qquad QPh=2xv.
$$

これを2で割れば $xv$ が得られます。$P,Q$ は可換で、どちらの順序でも結果は同じです。
<!-- solution-end -->

<a id="ex-lrep11-b03"></a>

#### LREP11-B03 回転制限での分解
- Level: B
- ID: LREP11-B03

$D_{2,1}$ を $SU(2)$ に制限したときに現れる回転スピンと次元を求めよ。

<!-- solution-start -->
**詳細解答。** $S\in SU(2)$ なら $Q(S)=S$ なので、第1因子はスピン1、第2因子はスピン $1/2$ の回転表現です。[Clebsch–Gordan分解](../LREP8/index.md#thm-lrep8-clebsch-gordan)の範囲は

$$
|1-1/2|=1/2,\qquad 1+1/2=3/2.
$$

よってスピン $1/2$ と $3/2$ がそれぞれ一度現れます。次元は $2+4=6$ で積の次元 $3\cdot2=6$ に一致します。回転に制限して分かれても、[被覆群の分類](#thm-lrep11-group)によって元の表現は既約です。
<!-- solution-end -->

<a id="ex-lrep11-b04"></a>

#### LREP11-B04 右作用と四元行列の橋
- Level: B
- ID: LREP11-B04

$S_t=\operatorname{diag}(e^{t/2},e^{-t/2})$ とし、$v=e_1,w=e_2$ について $\Phi(v\otimes w)$ と変換後の行列を二通りで求めよ。

<!-- solution-start -->
**詳細解答。** [四元ベクトルの複素化](#prop-lrep11-vector)の写像を使います。$e_2^{\mathsf T}\epsilon=(-1,0)$ より $\Phi(e_1\otimes e_2)=-e_1e_1^{\mathsf T}$ です。左因子で $e_1$ に $e^{t/2}$、右因子 $Q(S_t)$ で $e_2$ に $e^{t/2}$ が掛かるため

$$
\Phi(S_te_1\otimes Q(S_t)e_2)=-e^t e_1e_1^{\mathsf T}.
$$

合同作用でも $S_t e_1=e^{t/2}e_1$ かつ $e_1^{\mathsf T} S_t^\dagger=e^{t/2}e_1^{\mathsf T}$ なので同じ行列を得ます。
<!-- solution-end -->

### Level C

<a id="ex-lrep11-c01"></a>

#### LREP11-C01 六次元表現を二つの対称性から調べる
- Level: C
- ID: LREP11-C01

$D_{1,2}$ の共通ウェイト、被覆核の作用、$z$ 軸方向boost の固有値、回転に制限した分解を求めよ。正定値内積が保存できるかも説明せよ。

<!-- solution-start -->
**詳細解答。** [左右次数の表現](#def-lrep11-pair)で $a=0,1$、$b=0,1,2$ です。共通ウェイトは $(1-2a,2-2b)$、boost の指数係数は [非ユニタリ性の証明](#thm-lrep11-nonunitary)より $(1-2a-2+2b)/2$ です。各成分を代入します。

| $(a,b)$ | 共通ウェイト | boost 固有値 |
| --- | --- | --- |
| $(0,0)$ | $(1,2)$ | $e^{-t/2}$ |
| $(0,1)$ | $(1,0)$ | $e^{t/2}$ |
| $(0,2)$ | $(1,-2)$ | $e^{3t/2}$ |
| $(1,0)$ | $(-1,2)$ | $e^{-3t/2}$ |
| $(1,1)$ | $(-1,0)$ | $e^{-t/2}$ |
| $(1,2)$ | $(-1,-2)$ | $e^{t/2}$ |

次元は6です。[降下条件](#thm-lrep11-descent)に $m+n=3$ を代入すると $D(-I_2)=-I_6$ となり、Lorentz群そのものには降下しません。

回転では右因子も $S$ が作用します。[Clebsch–Gordan分解](../LREP8/index.md#thm-lrep8-clebsch-gordan)に $j_L=1/2,j_R=1$ を代入するとスピン $1/2,3/2$ が現れ、次元は $2+4=6$ です。

$t>0$ で $w_{0,2}=xv^2$ の固有値は $e^{3t/2}>1$ なので、そのノルムの二乗は $e^{3t}$ 倍になります。正定値なら元のノルムは非零であり保存できません。回転のユニタリ性をLorentz群全体へ拡張できない理由です。
<!-- solution-end -->

## 7. まとめと次講

二つの非負整数は複素化したLie環の二因子に対応し、次元だけでなく被覆核の符号、boost の固有値、回転に制限したスピンの候補まで決めます。次講では $(1/2,0)$ と $(0,1/2)$ の二成分作用を取り出し、左右Weylスピノルの変換則を詳しく調べます。

