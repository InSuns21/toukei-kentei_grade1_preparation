# AFR11 GL_2(A)上の保型形式

前講ではイデールの乗法指標を用いて、各素点のゼータ積分を一つの大域積分にまとめました。今回はスカラーを行列に替えます。行列の積は可換ではないので、有理行列による左側の同一視と、右側からの変換を区別する必要があります。古典的な上半平面の関数が、この新しい空間の関数としてどのように復元できるかを調べましょう。

以下、基礎体は $\mathbb Q$ に固定します。具体的な持ち上げは全有限素点で整数行列に関して不変となるレベル1の場合です。

## 1. 全素点の可逆行列

[アデール環](../../ANF/ANF19/index.md#def-anf19-adele)を $\mathbb A=\mathbb R\times\mathbb A_f$、[イデール群](../../ANF/ANF19/index.md#def-anf19-idele)を $\mathbb I=\mathbb A^\times$ とします。行列式が零でないという各成分の条件だけでは、逆行列の成分がアデールになるとは限りません。有限素点の大半では、行列も逆行列も整数成分を持つ必要があります。

素点を $v$ とし、実素点を $v=\infty$、有限素点を $v=p$ と書きます。$\mathbb Q_p$ は $p$ 進数体、$\mathbb Z_p=\{a:|a|_p\le1\}$ は整数環です。単元とは環内で乗法逆元を持つ元で、$\mathbb Z_p$ では $|a|_p=1$ と同値です。一般に $GL_2(R)$ は環 $R$ 上で逆行列を持つ2次正方行列の群です。$I$ は単位行列、$\operatorname{diag}(a,d)$ は対角成分が $a,d$ の対角行列です。

[制限付き直積](../../ANF/ANF19/index.md#def-anf19-restricted-product)の考え方を行列へ適用します。積・逆行列は局所成分ごとに計算するので、局所で逆行列を持ち、元の行列と逆行列の全成分がそれぞれ有限個を除いて整であることが、アデール上の可逆性の判定になります。

<a id="def-afr11-adelic-gl2"></a>

<!-- formal-statement-start -->
> **定義（アデール上の一般線形群）**
> $GL_2(\mathbb A)$ はアデール環上の逆行列を持つ2次正方行列の群である。局所成分による表示は

$$
G=GL_2(\mathbb A)
=GL_2(\mathbb R)\times\prod_p'(GL_2(\mathbb Q_p),K_p),
\qquad K_p=GL_2(\mathbb Z_p).
$$

> 有限側の制限付き直積は、有限個を除く素数で $g_p\in K_p$ となる族全体である。位相もこの制限付き直積の位相とする。
<!-- formal-statement-end -->

成分が整数環に入る局所行列を $A=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ とします。行列式が単元なら

$$
A^{-1}=(ad-bc)^{-1}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}
$$

の各成分が整数環に入ります。逆に整数環内で逆行列があれば $\det A\det A^{-1}=1$ なので行列式は単元です。従って各 $g_v$ が局所的に可逆であることと、大半の有限成分で行列式が単元かつ成分が整数であることを合わせれば、上の表示が得られます。

<!-- definition-example-start: def-afr11-adelic-gl2 -->
**定義の確認**

実成分と $p\ne2$ の成分を単位行列とし、2成分を $\operatorname{diag}(2,1)$ とします。

対角成分を掛けると両方とも1になるので、逆行列は2成分だけが $\operatorname{diag}(1/2,1)$ となります。2成分は局所体上で可逆ですが、行列式の絶対値が $1/2$ なので $K_2$ には入りません。

どちらも有限個を除いて整数成分なのでアデール上可逆です。

一方、全素数で $\operatorname{diag}(p,1)$ とした族は行列の各成分こそアデールですが、逆行列に全素数で $1/p$ が現れ、逆行列はアデール上に存在しません。
<!-- definition-example-end -->

有理可逆行列を全素点に対角的に埋め込み、$\Gamma_{\mathbb Q}=GL_2(\mathbb Q)$ と書きます。行列と逆行列の分母の素因数は有限個なので、この埋め込みは $G$ に入ります。

## 2. 左商と有限側の整数行列

AFR1の[群上の重さ付き不変関数](../AFR1/index.md#def-afr1-weight-space)では左からの整数行列を同一視しました。今回は有理行列で同一視します。群論の[右剰余類](../../GRP/GRP2/index.md#def-grp2-cosets) $Hg=\{hg:h\in H\}$ において $H=GL_2(\mathbb Q)$ としたものです。左から掛ける側を固定すれば、右からの行列の掛け算は代表元の選択に依存しません。

<a id="def-afr11-adelic-quotient"></a>

<!-- formal-statement-start -->
> **定義（保型商）**
> $G=GL_2(\mathbb A)$ に対して、保型商は右剰余類の集合

$$
X=GL_2(\mathbb Q)\backslash G
$$

> である。$[g]=[g']$ はある $\gamma\in GL_2(\mathbb Q)$ に対して $g'=\gamma g$ となることを意味する。関数 $\phi:G\to\mathbb C$ がこの商上の関数を与える条件は、全ての $\gamma,g$ について $\phi(\gamma g)=\phi(g)$ となることである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr11-adelic-quotient -->
**定義の確認**

各局所行列式は非零で、有限素点の大半では単元です。従って $\det g$ はイデールであり、[イデールの絶対値](../../ANF/ANF19/index.md#def-anf19-idele-modulus)として

$$
|\det g|_{\mathbb A}=|\det g_\infty|\prod_p|\det g_p|_p
$$

は有限個の1でない正の因子の積です。[数体の大域積公式](../../ANF/ANF19/index.md#thm-anf19-product-formula)によって $|\det\gamma|_{\mathbb A}=1$ です。従って

$$
|\det(\gamma g)|_{\mathbb A}
=|\det\gamma|_{\mathbb A}|\det g|_{\mathbb A}
=|\det g|_{\mathbb A}.
$$

この関数は商上で定まります。左商は一般には商群ではありませんが、右掛け算 $[g]\mapsto[gh]$ は定義できます。
<!-- definition-example-end -->

有限側の整数行列をまとめて $K_f=\prod_pK_p$ と書きます。これはコンパクトな開部分群です（各成分は $\mathbb Z_p^4$ 内の行列式が単元となる閉開集合であり、制限付き直積の位相ではその全体が開です）。$G_\infty^+=GL_2^+(\mathbb R)$ は正の行列式を持つ実行列の群です。

有限成分を $K_f$ に移せれば、残る実変数は古典的な群に近くなります。これを格子で実現します。

<a id="thm-afr11-level-one-decomposition"></a>

<!-- formal-statement-start -->
> **定理（レベル1のアデール分解）**
> $G=GL_2(\mathbb A)$、$K_f=\prod_pGL_2(\mathbb Z_p)$ とする。このとき

$$
G=GL_2(\mathbb Q)(G_\infty^+\times K_f),
\qquad
GL_2(\mathbb Q)\cap(G_\infty^+\times K_f)
=SL_2(\mathbb Z).
$$

> さらに最初の等式の左側の有理行列は上三角行列に選べる。
<!-- formal-statement-end -->

### 証明の見取り図

有限成分 $g_p$ が整数ベクトル全体をどこへ移すかを調べます。各素数の格子を同時に実現する有理ベクトルの格子を作り、上三角の基底を選びます。基底を並べた有理行列で左から割れば、各局所格子が標準格子に戻ります。

<!-- proof-start -->
### 証明

任意の $g=(g_\infty,(g_p)_p)\in G$ を取ります。

$L_p=g_p\mathbb Z_p^2$ とおきます。

各素数で $g_p,g_p^{-1}$ の成分の絶対値をともに $p^{e_p}$ 以下にする非負整数 $e_p$ を最小に選びます。

大半の $e_p$ は0です。

$m=\prod_p p^{e_p}$ とすれば

$$
m\mathbb Z_p^2\subset L_p\subset m^{-1}\mathbb Z_p^2.
$$

右の包含は $g_p$ の成分の評価から、左の包含は $g_p^{-1}m\mathbb Z_p^2\subset\mathbb Z_p^2$ から従います。そこで

$$
L=\{v\in\mathbb Q^2:v\in L_p\ (\text{全ての }p)\}
$$

と置きます。全有限素点で整な有理数は整数なので、$m\mathbb Z^2\subset L\subset m^{-1}\mathbb Z^2$ です。

$L$ の $\mathbb Z_p$ 係数による張る空間が $L_p$ に一致することを確認します。

$M=mL$、$M_p=mL_p$ とおくと

$$
m^2\mathbb Z^2\subset M\subset\mathbb Z^2,\qquad
m^2\mathbb Z_p^2\subset M_p\subset\mathbb Z_p^2.
$$

素数 $p\mid m$ において、任意の $w\in M_p$ の剰余を $p^{2e_p}$ で指定します。

他の $\ell\mid m$ では剰余を0とします。

互いに素な法 $\ell^{2e_\ell}$ に対する[整数の中国剰余定理の構成公式](../../NT/NT1/index.md#thm-nt1-crt-constructive)を各座標に適用して整数ベクトル $u$ を選ぶと、$u$ は全ての $M_\ell$ に属し、従って $u\in M$ です。

また $w-u\in m^2\mathbb Z_p^2$ です。

後者は $M$ の元 $m^2(1,0)$、$m^2(0,1)$ の $\mathbb Z_p$ 線形結合です。

従って $w$ も $M$ の $\mathbb Z_p$ 線形結合です。

$p\nmid m$ では $m^2$ が単元なので、二つの同じベクトルだけで $\mathbb Z_p^2=M_p$ を張ります。

逆包含は $M\subset M_p$ より従います。

$m$ で割って $L$ についての主張を得ます。

次に $M$ の整数基底を具体的に作ります。

第2座標の像は $\mathbb Z$ の非零部分群なので $c\mathbb Z$（$c>0$）と書けます。

第2座標が0の元の第1座標は $a\mathbb Z$（$a>0$）です。

$c$ を第2座標に持つ元 $(b,c)$ を一つ選び、$(a,0)$ の整数倍を引いて $0\le b<a$ とします。

任意の $(x,y)\in M$ は $y=nc$ と書けるので

$$
(x,y)-n(b,c)=(x-nb,0)=j(a,0)
$$

となる整数 $j$ が存在します。逆に二つの基底ベクトルの任意の整数結合は $M$ に入ります。行列式 $ac>0$ から独立性も従います。よって

$$
\gamma_0=\frac1m\begin{pmatrix}a&b\\0&c\end{pmatrix}
$$

は $L$ の基底行列です。

先の局所確認から $\gamma_0\mathbb Z_p^2=g_p\mathbb Z_p^2$ です。

従って $\gamma_0^{-1}g_p$ とその逆は標準格子を保存し、$K_p$ に入ります。

実成分 $\gamma_0^{-1}g_\infty$ の行列式が負なら、$\gamma_0$ の右に $\operatorname{diag}(-1,1)$ を掛けて $\gamma$ とします。

これは整数格子を保存するため有限側の結論は変わらず、実成分の行列式は正になります。

正の場合は $\gamma=\gamma_0$ です。

これで $g=\gamma(h,k_f)$ が得られました。

最後に、交わりに属する有理行列とその逆は全素点で整なので、ともに整数行列です。整数の行列式とその逆数がともに整数であり、行列式は実側で正なので1です。逆に行列式1の整数行列は全条件を満たします。
<!-- proof-end -->

例えば2成分が $\operatorname{diag}(2,1)$ で残りが単位行列の場合、$L=2\mathbb Z\times\mathbb Z$ なので $\gamma=\operatorname{diag}(2,1)$ を取れます。

有限側では2成分が単位行列に、他の素点では $\operatorname{diag}(1/2,1)\in K_p$ に移ります。

実側も同時に $\gamma^{-1}$ 倍される点が重要です。

従って右 $K_f$ 不変な保型商上の関数は $G_\infty^+$ 上の左 $SL_2(\mathbb Z)$ 不変関数へ制限でき、逆にそのような関数 $F$ は $\phi(\gamma(h,k_f))=F(h)$ によって一意的に延長できます。

実際、二つの表示 $\gamma(h,k)=\gamma'(h',k')$ の差 $\gamma'^{-1}\gamma$ は上の交わりに属するため $h'=(\gamma'^{-1}\gamma)h$ となり、$F(h')=F(h)$ です。

## 3. 中心の作用を分離する

スカラー行列 $zI$ は全ての行列と可換です。

逆に対角行列 $\operatorname{diag}(2,1)$ と可換なら非対角成分が0、上三角行列 $\begin{pmatrix}1&1\\0&1\end{pmatrix}$ と可換なら二つの対角成分が等しくなります。

例えば $A=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ とすると、二つの積の差は順に

$$
\begin{aligned}
A\operatorname{diag}(2,1)-\operatorname{diag}(2,1)A
&=\begin{pmatrix}0&-b\\c&0\end{pmatrix},\\
\operatorname{diag}(a,d)\begin{pmatrix}1&1\\0&1\end{pmatrix}
-\begin{pmatrix}1&1\\0&1\end{pmatrix}\operatorname{diag}(a,d)
&=\begin{pmatrix}0&a-d\\0&0\end{pmatrix}.
\end{aligned}
$$

従って中心（すべての群の元と可換な元全体）は $Z(\mathbb A)=\{zI:z\in\mathbb I\}$ です。スカラー行列の逆は $z^{-1}I$ なので、可逆性は $z$ がイデールであることに一致します。

中心方向の変化を自由に許す代わりに、連続な乗法指標（積を複素数の積に移す写像）で固定します。ここでは値が絶対値1であることまでは要求しません。$\mathbb C^\times=\mathbb C\setminus\{0\}$ です。

<a id="def-afr11-central-character"></a>

<!-- formal-statement-start -->
> **定義（中心指標）**
> $\omega:\mathbb I\to\mathbb C^\times$ を連続な乗法準同型で $\mathbb Q^\times$ 上自明なものとする。保型商上の関数 $\phi$ が中心指標 $\omega$ を持つとは、全ての $z\in\mathbb I$ と $g\in G$ について

$$
\phi(zIg)=\omega(z)\phi(g)
$$

> となることである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr11-central-character -->
**定義の確認**

$\phi(g)=|\det g|_{\mathbb A}^{it}$（$t\in\mathbb R$）とします。正の実数 $r$ に対して $r^{it}=\exp(it\log r)$ と定めます。この関数は[積公式による左不変性](#def-afr11-adelic-quotient)を満たします。$\det(zIg)=z^2\det g$ なので

$$
\phi(zIg)=|z|_{\mathbb A}^{2it}\phi(g).
$$

$\omega(z)=|z|_{\mathbb A}^{2it}$ は連続かつ乗法的で、有理数上では[数体の大域積公式](../../ANF/ANF19/index.md#thm-anf19-product-formula)により1です。2次正方行列の行列式を取るため指数に2が現れます。
<!-- definition-example-end -->

非零関数なら、中心指標は有理数上で自明でなければなりません。$qI$ は左の有理行列でもあるため、$\phi(g)\ne0$ の点で $\phi(g)=\omega(q)\phi(g)$ と割り算できるからです。絶対値1を取る中心指標の場合には中心の作用は関数の絶対値を変えません。

## 4. 保型形式の解析的条件

商上の関数は非常に多いので、局所の滑らかさと無限遠での振る舞いを制御します。実成分に関する滑らかさは各有限成分を固定したときの通常の無限回微分可能性です。有限側では、あるコンパクト開部分群 $K_0\subset K_f$ による右掛け算で不変とします。

実側の直交行列群 $O(2)=\{h:h^{\mathsf T}h=I\}$（行列式は $\pm1$）で右移動した関数たちが張る複素ベクトル空間が有限次元となる条件を $O(2)$ 有限性といいます。実行列の[右移動](../../LIE/LIE1/index.md#def-lie1-translations)を関数の引き戻しとして用い、$R(h)\phi(g)=\phi(gh)$ と書きます。

以下、実行列を $G$ の実成分に、有限成分は単位行列として埋め込みます。実行列 $X$ に対して、行列指数 $\exp(tX)=\sum_{n\ge0}t^nX^n/n!$ を用いた右微分を

$$
D_X\phi(g)=\left.\frac{d}{dt}\phi(g\exp(tX))\right|_{t=0}
$$

と定め、複素線形に拡張します。$t$ は実数で、$g,X$ は固定します。$\exp(tX)=I+tX+O(t^2)$ なので、$D_X$ は点 $g$ における方向 $gX$ の微分です。$O(t^2)$ は $t\to0$ で各成分が定数倍の $t^2$ 以下に収まる誤差を表します。[左不変ベクトル場](../../LIE/LIE1/index.md#def-lie1-invariant-vector-fields)の行列表示に対応し、有限成分は微分しません。作用素の積は右端から作用させます。恒等作用素とこれらの微分作用素の有限回の合成の複素線形結合で作る代数を考えます。このうち全ての $D_X$ と可換な作用素全体を $\mathcal Z$ と書きます。$\mathcal Z$ による像が張る空間が有限次元である条件は、微分方程式によって関数を制御するためのものです。これは実Lie代数の普遍包絡代数の中心による有限性の微分作用素としての表現です。

増大を測るため、局所行列 $g_v$ の成分と逆行列の成分の絶対値、および1の最大値を $H_v(g_v)$ とし、$H(g)=\prod_v H_v(g_v)$ と置きます。

大半の素数で因子は1です。

例えば実成分 $\operatorname{diag}(t,t^{-1})$、有限成分が単位行列なら $H(g)=\max(1,|t|,|t|^{-1})$ です。

<a id="def-afr11-automorphic-form"></a>

<!-- formal-statement-start -->
> **定義（アデール上の保型形式）**
> $G=GL_2(\mathbb A)$ 上の複素数値関数 $\phi$ が保型形式であるとは、次の条件を満たすことをいう。
>
> 1. 左 $GL_2(\mathbb Q)$ 不変である。
> 2. 実成分について滑らかで、あるコンパクト開部分群 $K_0\subset K_f$ について右 $K_0$ 不変である。
> 3. 右 $O(2)$ 移動で張られる空間および $\mathcal Z$ の作用で張られる空間がそれぞれ有限次元である。
> 4. ある $C>0$、$M\ge0$ が存在し、全 $g\in G$ で

$$
|\phi(g)|\le CH(g)^M
$$

> が成立する（緩増大条件）。
>
> 中心指標を固定する場合は [中心指標の条件](#def-afr11-central-character) も課す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr11-automorphic-form -->
**定義の確認**

定数関数1は左不変かつ滑らかで、右 $K_f$ 不変です。

右 $O(2)$ 移動で得る関数は1だけなので次元は1です。

正次数の右微分は0であるため、$\mathcal Z$ の作用も定数の空間に留まります。

最後に $C=1,M=0$ で増大条件が成立し、中心指標は自明です。
<!-- definition-example-end -->

右回転の有限性は一つの重さで変換する場合を含み、微分作用素の条件は固有方程式を満たす場合を含みます。後続講ではこれらの右作用で生成される表現を調べます。右から任意の実行列を掛けることが $O(2)$ 有限性を必ず保存する、と主張しているわけではありません。

## 5. カスプ条件を大域的に書く

上半平面の周期方向 $x$ の移動は、上三角行列

$$
n(u)=\begin{pmatrix}1&u\\0&1\end{pmatrix}
$$

で表されます。$n(u)n(v)=n(u+v)$ なので、アデールの加法を行列の乗法へ移せます。[加法商の標準代表元](../AFR8/index.md#thm-afr8-additive-normal-form)より $\mathbb Q\backslash\mathbb A$ は $[0,1)\times\widehat{\mathbb Z}$ で代表できます。ここで $\widehat{\mathbb Z}=\prod_p\mathbb Z_p$ とし、実 Lebesgue 測度と [p進加法Haar測度の規格化](../AFR9/index.md#prop-afr9-local-measure) による有限側の積測度を取り、商の全体積を1とします。この測度は平行移動で不変です。実際、任意の平行移動量も標準代表元 $(a,b)$（$0\le a<1,\ b\in\widehat{\mathbb Z}$）で表せます。代表元 $(x,u_f)$ を移した後、$x+a<1$ なら $(x+a,u_f+b)$、$x+a\ge1$ なら $(x+a-1,u_f+b-1)$ に戻します。二つの実区間はそれぞれ $[a,1)$ と $[0,a)$ に移り、有限側は各区間上で固定された整数成分による平行移動です。従って両部分とも積測度を保存します。

有理数 $r\ne0$ の掛け算もこの商の測度を保存します。

商の自己同型であり、押し出された測度は平行移動不変な確率測度です。

コンパクト群上のそのような測度の一意性は、二つの測度 $\mu,\nu$ と連続関数 $f$ に対して $\iint f(x+y)d\mu(x)d\nu(y)$ を二通りの順序で積分すると $\int f d\mu=\int f d\nu$ となることから分かります。

<a id="def-afr11-cuspidal"></a>

<!-- formal-statement-start -->
> **定義（大域カスプ条件）**
> 連続な左 $GL_2(\mathbb Q)$ 不変関数 $\phi$ の定数項を

$$
C_\phi(g)=\int_{\mathbb Q\backslash\mathbb A}
\phi(n(u)g)\,du
$$

> とする。元の関数 $\phi$ が [保型形式](#def-afr11-automorphic-form) であり、全ての $g\in G$ で $C_\phi(g)=0$ となるとき、$\phi$ をカスプ形式という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr11-cuspidal -->
**定義の確認**

定数関数1は上で保型形式と確認しましたが、積分の値は全ての $g$ で1です。従ってカスプ形式ではありません。一方、零関数は全条件を満たし積分も0です。非零のカスプ形式は次節で古典的な形式から構成します。
<!-- definition-example-end -->

$u$ を $u+q$ に替えると $n(u+q)=n(q)n(u)$ であり、左不変性から被積分関数は変わりません。商は [加法商のコンパクト性](../AFR8/index.md#thm-afr8-additive-quotient-compact) によりコンパクトで、被積分関数は連続なので積分は有限です。

<a id="prop-afr11-constant-term-reduction"></a>

<!-- formal-statement-start -->
> **命題（レベル1の定数項の実積分への還元）**
> $\phi$ を連続で左 $GL_2(\mathbb Q)$ 不変、右 $K_f$ 不変な関数とする。任意の $g$ を $\gamma(h,k_f)$ と上三角の $\gamma\in GL_2(\mathbb Q)$ を使って表すと

$$
C_\phi(g)=\int_0^1\phi((n(x)h,1))\,dx.
$$

> ここで $h\in G_\infty^+$ である。
<!-- formal-statement-end -->

### 証明の見取り図

上三角の有理行列は $n(u)$ を別の $n(u')$ へ共役します。従って左側の有理行列を取り除いた後、有限側の整数成分を右不変性で取り除けます。

<!-- proof-start -->
### 証明

[レベル1のアデール分解](#thm-afr11-level-one-decomposition)により $\gamma=\begin{pmatrix}a&b\\0&d\end{pmatrix}$、$ad\ne0$ とできます。直接掛け算すると

$$
\gamma^{-1}n(u)\gamma=n((d/a)u).
$$

左不変性から

$$
\phi(n(u)\gamma(h,k_f))
=\phi(n((d/a)u)(h,k_f)).
$$

商の変数 $v=(d/a)u$ は有理非零数による自己同型であり、先ほど確認した確率測度を保存するので $C_\phi(g)=C_\phi((h,k_f))$ です。

右 $K_f$ 不変性で $k_f$ を単位行列に替えます。具体的には $n(v)(h,k_f)(1,k_f^{-1})=n(v)(h,1)$ です。

$v$ の代表元を $(x,(v_p)_p)$、$0\le x<1$、$v_p\in\mathbb Z_p$ と選びます。

有限成分 $n(v_p)$ は行列式1の整数行列なので $K_p$ に属します。

従って

$$
\phi(n(v)(h,1))=\phi((n(x)h,1)).
$$

有限側の積測度の質量は1であるため実積分だけが残ります。
<!-- proof-end -->

特に実側の積分が全ての $h$ で0となれば、有限側に別の代表元を取っても大域的に0です。一般の有理行列では $n(u)$ をこの形に共役できるとは限らないため、上三角の分解を用いたことが肝要です。

## 6. 古典形式の持ち上げ

偶数 $k\ge0$ とし、$f$ をレベル1の[正則モジュラー形式](../../MF/MF2/index.md#def-mf2-modular-form)とします。

実行列 $h=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ の行列式が正の場合、$h\cdot z=(az+b)/(cz+d)$、$j(h,z)=cz+d$ とします。$z=x+iy$ は上半平面の点（$x,y$ は実数、$y>0$）、$i$ は虚数単位です。[右回転の定義](../AFR1/index.md#def-afr1-rotation)に従い

$$
k_\theta=\begin{pmatrix}\cos\theta&\sin\theta\\-\sin\theta&\cos\theta\end{pmatrix}.
$$

これは $SO(2)$（行列式1の直交行列）の元で、$k_\theta\cdot i=i$、$j(k_\theta,i)=e^{-i\theta}$ です。

行列式の平方根を用いて $s=h/\sqrt{\det h}\in SL_2(\mathbb R)$ に移すと、$s\cdot i=h\cdot i$、$j(s,i)=j(h,i)/\sqrt{\det h}$ です。

従って AFR1 の[持ち上げの対応](../AFR1/index.md#thm-afr1-lift)を正の行列式の行列へ拡張した式は

$$
F_f(h)=(\det h)^{k/2}j(h,i)^{-k}f(h\cdot i)
$$

となります。

<a id="thm-afr11-classical-lift"></a>

<!-- formal-statement-start -->
> **定理（レベル1正則モジュラー形式のアデール化）**
> 偶数 $k\ge0$ のレベル1正則モジュラー形式 $f$ に対して、$g=\gamma(h,k_f)$ を [レベル1のアデール分解](#thm-afr11-level-one-decomposition) とすると

$$
\phi_f(g)=(\det h)^{k/2}j(h,i)^{-k}f(h\cdot i)
$$

> は代表元に依存せず、右 $K_f$ 不変かつ中心指標が自明な保型形式を与える。実回転 $k_\theta$ に対して右からの変換係数は $e^{ik\theta}$ となる。さらに $f$ が古典的カスプ形式であることと、$\phi_f$ が大域カスプ条件を満たすことは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

実側の左不変性は変換因子の積法則、中心はイデールの標準代表元によって処理します。解析条件では正則性を右微分の消滅に翻訳し、増大を行列成分で評価します。最後に定数項を実側へ戻します。

<!-- proof-start -->
### 証明

まず [変換因子の積法則](../AFR1/index.md#prop-afr1-factor) を使います。この法則は正の行列式の行列でも、列ベクトル $(z,1)^{\mathsf T}$ に行列を続けて掛けて第2成分を比較すれば成立します。[モジュラー形式の変換則](../../MF/MF2/index.md#def-mf2-modular-form) と合わせると $\delta\in SL_2(\mathbb Z)$ に対して

$$
\begin{aligned}
F_f(\delta h)
&=(\det h)^{k/2}j(\delta,h\cdot i)^{-k}
j(h,i)^{-k} f(\delta h\cdot i)\\
&=(\det h)^{k/2}j(h,i)^{-k}f(h\cdot i).
\end{aligned}
$$

[レベル1のアデール分解](#thm-afr11-level-one-decomposition)に続く延長の構成により $\phi_f$ はよく定まり、左有理行列および右 $K_f$ で不変です。有限側の各右剰余類上では $h$ が実成分の固定有理行列倍になるため実変数について滑らかです。

中心について [イデール類群の標準代表元](../AFR8/index.md#thm-afr8-idele-normal-form) を使って $z=q(t,u)$、$q\in\mathbb Q^\times,t>0,u\in\prod_p\mathbb Z_p^\times$ と書きます。

$qI$ は左の有理行列、$uI$ は右の $K_f$ で消せます。

実成分では $\det(th)=t^2\det h$、$j(th,i)=tj(h,i)$、$(th)\cdot i=h\cdot i$ なので

$$
F_f(th)=t^kt^{-k}F_f(h)=F_f(h).
$$

従って中心指標は自明です。

[実行列の座標表示](../AFR1/index.md#thm-afr1-coordinates)で、正のスカラーを除いた $h$ を $s(z)k_\theta$ と書きます。$z=x+iy$ とすると

$$
s(z)=\begin{pmatrix}\sqrt y&x/\sqrt y\\0&1/\sqrt y\end{pmatrix},
\qquad
F_f(s(z)k_\theta)=y^{k/2}e^{ik\theta}f(z).
$$

右回転は角度を足すので、$SO(2)$ 移動の張る空間は高々1次元です。

$O(2)$ の残りの連結成分は $SO(2)$ と固定反射 $\operatorname{diag}(-1,1)$ の積です。

固定反射を $r=\operatorname{diag}(-1,1)$ とすると、その成分の元は $rk_\theta$ と書けます。任意の $g$ について右回転は分解の実成分だけを変えるので $R(k_\theta)\phi_f=e^{ik\theta}\phi_f$ です。$R(rk_\theta)\phi_f=R(r)R(k_\theta)\phi_f=e^{ik\theta}R(r)\phi_f$ なので、全移動は $\phi_f,R(r)\phi_f$ の張る空間に入り、高々2次元です。

次に右微分を調べます。実行列の方向を

$$
H=\begin{pmatrix}1&0\\0&-1\end{pmatrix},
\quad
S=\begin{pmatrix}0&1\\1&0\end{pmatrix},
\quad
T=\begin{pmatrix}0&1\\-1&0\end{pmatrix}
$$

とします。$f'(z)$ は正則関数 $f$ の複素変数 $z$ に関する導関数です。実パラメータ $t$ による曲線 $w(t)$ に沿っては、$d f(w(t))/dt=f'(w(t))w'(t)$ という連鎖律を使います。$z=x+iy$ は以下の右微分の間は固定します。

$h=s(z)$ で評価すると、$\exp(tH)\cdot i=e^{2t}i$、$j(\exp(tH),i)=e^{-t}$ です。$s(z)$ は $w\mapsto x+yw$ と作用し、$j(s(z),w)=1/\sqrt y$ は $w$ に依存しません。従って

$$
F_f(s(z)\exp(tH))=y^{k/2}e^{kt}f(x+iye^{2t}).
$$

$t=0$ で積の微分と連鎖律を適用すると

$$
D_HF_f(s(z))=y^{k/2}(kf(z)+2iyf'(z)).
$$

$\exp(tS)=I+tS+O(t^2)$ から $\exp(tS)\cdot i=i+2t+O(t^2)$、$j(\exp(tS),i)=1+it+O(t^2)$ です。

同じ積法則と $\det\exp(tS)=1$（$S$ の固有値は $1,-1$）を使うと

$$
F_f(s(z)\exp(tS))
=y^{k/2}(1+it+O(t^2))^{-k}f(z+2yt+O(t^2)).
$$

$t=0$ で微分する二つの因子はそれぞれ $-ik$ と $2yf'(z)$ を与えるので

$$
D_SF_f(s(z))=y^{k/2}(-ikf(z)+2yf'(z)).
$$

従って $P_-=D_H-iD_S$ と置くと、この点で

$$
P_-F_f(s(z))
=y^{k/2}\{kf(z)+2iyf'(z)-kf(z)-2iyf'(z)\}=0.
$$

$D_TF_f=ikF_f$ です。

行列の交換子を計算すると $[T,H]=-2S$、$[T,S]=2H$ なので $H-iS$ は $T$ に関して固有値 $-2i$ を持ちます。

具体的に $k_\theta=\exp(\theta T)$ とすると

$$
k_\theta(H-iS)k_\theta^{-1}=e^{-2i\theta}(H-iS).
$$

これは左辺を $\theta$ で微分すると交換子により $-2i$ 倍となり、$\theta=0$ で $H-iS$ になることから従います。

右回転の変換則を微分します。実行列方向 $X$ について $k_\theta\exp(tX)=\exp(tk_\theta Xk_\theta^{-1})k_\theta$ を使うと

$$
D_XF_f(s(z)k_\theta)
=e^{ik\theta}D_{k_\theta Xk_\theta^{-1}}F_f(s(z)).
$$

複素線形拡張で $X=H-iS$ とすると

$$
P_-F_f(s(z)k_\theta)
=e^{ik\theta}e^{-2i\theta}P_-F_f(s(z))=0.
$$

正のスカラー方向の微分は0です。有限側を固定した任意の $g=\gamma(h,k_f)$ についても、実右微分は $F_f(h)$ への右微分に一致するので同じ結論です。

$\mathcal Z$ の作用の有限性を示します。

$P_+=D_H+iD_S$、$P_-$、$D_T$、スカラー方向 $D_I$ は全ての実行列方向の複素線形結合を張ります。

交換関係 $[D_X,D_Y]=D_{XY-YX}$ の符号を確認します。

$D_XD_YF(h)$ は $F(h\exp(tX)\exp(uY))$ の $t,u$ による混合微分です。

順序を逆にしたとき、行列指数の積の $tu$ の係数が $XY$ から $YX$ へ変わります。

関数の二次微分に由来する項は両順序で等しいので、差は方向 $XY-YX$ の一次微分 $D_{XY-YX}F(h)$ です。

作用素の積は隣り合う因子を交換して交換子を足すことで、$P_+^aD_T^bP_-^cD_I^d$ の線形結合に並べ直せます。

交換子は次数を一つ下げるので、この手順は次数と順序の逆転数に関する帰納法で終了します。

$[D_T,P_+]=2iP_+$、$[D_T,P_-]=-2iP_-$ より、その並べ直した各単項式は $[D_T,\cdot]$ の固有値 $2i(a-c)$ を持ちます。

中心の作用素は $D_T$ と可換なので、固有値が0の部分だけで表せます（異なる固有値の空間の和は直和）。

その各項は $a=c$ を満たします。

$d>0$ なら右端の $D_I$ が $\phi_f$ を消し、$c>0$ なら $P_-$ が消します。

残る $a=c=d=0$ の項は $D_T^b$ であり、値は $(ik)^b\phi_f$ です。

よって $\mathcal Z$ は $\phi_f$ の張る1次元以下の空間を保存します。

ここまでで解析的条件のうち増大以外を確認しました。

増大についてはまず任意の $z=x+iy$ に対し、左 $SL_2(\mathbb Z)$ 移動で $|\Re z'|\le1/2$、$|z'|\ge1$ となる $z'$ を選べます。

理由は、互いに素な整数 $c,d$ に対し $|cz+d|$ は正であり、任意の上界を固定すれば $|c|y$ と $|cx+d|$ がその上界以下となる整数の組は有限個だからです。

最小値を与える組を下段に持つ行列を Bézout の等式で作り、整数平行移動で実部を区間に移します。

そこで $|z'|<1$ なら $z'\mapsto-1/z'$ により虚部が増えて最初の最大性に反します。

従って $y'\ge\sqrt3/2$ です。

[周期正則関数のq表示](../../MF/MF2/index.md#thm-mf2-q-coordinate)とモジュラー形式の無限遠の正則性から、$q=e^{2\pi iz}$ で表した関数は $q=0$ にも正則に延長します。従って $f$ は $q$ 座標で $|q|\le\exp(-\pi\sqrt3)$ 上で有界です。

よって $|F_f(h)|=y'^{k/2}|f(z')|\le C(y')^{k/2}$ です。

また下段 $c,d$ が $c=0$ なら $|d|=1$、$c\ne0$ なら $|cz+d|\ge y$ であるため

$$
y'=\frac{y}{|cz+d|^2}\le\max(y,y^{-1}).
$$

$h$ の局所高さを $B=H_\infty(h)\ge1$ とします。

$y=\det h/(c^2+d^2)$（ここで $c,d$ は $h$ の下段）です。

$\det h\le2B^2$ かつ $\det h\ge1/(2B^2)$（逆行列の行列式を評価）です。

また下段の長さは $\sqrt2 B$ 以下で、$h$ の下段と $h^{-1}$ の第2列の内積が1なので $1/(\sqrt2 B)$ 以上です。

従って

$$
(4B^4)^{-1}\le y\le4B^4,\qquad
|F_f(h)|\le C\,2^k B^{2k}.
$$

最後に [アデール分解の構成](#thm-afr11-level-one-decomposition) の $m=\prod_pp^{e_p}$ は $\prod_p H_p(g_p)$ です。

基底の $a,c$ は $m^2$ を割る（$m^2(1,0),m^2(0,1)\in M$）ので $1\le a,c\le m^2$、$0\le b<a$ です。

$\gamma_0=m^{-1}\begin{pmatrix}a&b\\0&c\end{pmatrix}$ の成分は絶対値 $m$ 以下で、逆行列は $m\begin{pmatrix}1/a&-b/(ac)\\0&1/c\end{pmatrix}$ なのでこちらも $m$ 以下です。

符号調整でも評価は変わりません。

$h=\gamma^{-1}g_\infty$ と $h^{-1}=g_\infty^{-1}\gamma$ の成分は2項の積の和なので

$$
H_\infty(h)\le2m H_\infty(g_\infty)=2H(g).
$$

上の評価に代入すれば

$$
|\phi_f(g)|\le C\,2^k(2H(g))^{2k}
=C\,2^{3k}H(g)^{2k}.
$$

従って緩増大条件は指数 $M=2k$ で成立します。

最後に $h=t s(z) k_\theta$（$t>0$）と書きます。$n(x)s(z)=s(z+x)$ なので [定数項の実積分への還元](#prop-afr11-constant-term-reduction) により

$$
C_{\phi_f}((h,1))
=y^{k/2}e^{ik\theta}\int_0^1 f(z+x)\,dx.
$$

[古典的な $q$ 展開](../../MF/MF2/index.md#def-mf2-q-expansion)を $f(z)=\sum_{n\ge0}a_ne^{2\pi inz}$ とすれば、固定した $y>0$ では円 $|q|=e^{-2\pi y}<1$ 上で一様絶対収束するため項別積分できます。

$$
\int_0^1 e^{2\pi inx}dx
=\begin{cases}1&n=0,\\0&n\ne0.\end{cases}
$$

従って $C_{\phi_f}((h,1))=y^{k/2}e^{ik\theta}a_0$ です。係数の前の因子は零でなく、上の還元は任意のアデール行列について成り立ちます。よって大域カスプ条件と $a_0=0$ は同値です。
<!-- proof-end -->

例えば [モジュラー判別式](../../MF/MF2/index.md#def-mf2-discriminant) $\Delta$ は重さ12で定数項0なので、その持ち上げは非零の大域カスプ形式です。

[正規化された Eisenstein 級数のq展開](../../MF/MF2/index.md#thm-mf2-eisenstein-q) $E_4$ は定数項1なので $h=s(2i)$ での定数項は $2^2=4$ です。

持ち上げから古典関数を戻すには、有限成分を全て単位行列にし、

$$
f(z)=y^{-k/2}\phi_f((s(z),1))
$$

とすればよいことも分かります。一般の保型形式がこの方法で正則モジュラー形式になるとは限らず、正則性に対応する右微分条件が必要です。

## 7. 演習と詳細解答

<a id="ex-afr11-a1"></a>

### A1. 行列の逆と有限成分

3成分を $\operatorname{diag}(1,3^{-2})$、他を単位行列とした族が $G$ に入ることを示し、3成分が $K_3$ に属するか判定せよ。

- Level: A
- ID: AFR11-A1

<!-- solution-start -->
**詳細解答**

[アデール上の一般線形群](#def-afr11-adelic-gl2)の条件を確認します。

3成分の逆は $\operatorname{diag}(1,9)$ であり、他の逆成分は単位行列です。

従って行列も逆行列も大半の素数で整なので $G$ に入ります。

一方 $|3^{-2}|_3=9>1$ なので3成分自体は整数行列ではなく $K_3$ に属しません。
<!-- solution-end -->

<a id="ex-afr11-a2"></a>

### A2. 中心指標の指数

$\phi(g)=|\det g|_{\mathbb A}^{3i}$ の中心指標を求め、有理数 $q=2$ 上の自明性を確かめよ。

- Level: A
- ID: AFR11-A2

<!-- solution-start -->
**詳細解答**

$\det(zIg)=z^2\det g$ なので

$$
\frac{\phi(zIg)}{\phi(g)}
=|z^2|_{\mathbb A}^{3i}=|z|_{\mathbb A}^{6i}.
$$

従って [中心指標](#def-afr11-central-character)は $\omega(z)=|z|_{\mathbb A}^{6i}$ です。

また [数体の大域積公式](../../ANF/ANF19/index.md#thm-anf19-product-formula)で全有理非零数上の自明性が従います。具体的に $|2|_\infty=2$、$|2|_2=1/2$、他の絶対値は1なので $|2|_{\mathbb A}=1$、$\omega(2)=1$ です。
<!-- solution-end -->

<a id="ex-afr11-a3"></a>

### A3. 有理行列との交わり

有理可逆行列 $A$ と $A^{-1}$ が全有限素点で整数成分を持つとき、$\det A=\pm1$ となることを示せ。実行列式が正ならどうなるか。

- Level: A
- ID: AFR11-A3

<!-- solution-start -->
**詳細解答**

既約分数の分母が1でなければ、その素因数で付値が負になるので、全有限素点で整な有理数は整数です。

各成分に適用すると $A,A^{-1}$ はともに整数行列です。

行列式も整数であり、その積は $\det(AA^{-1})=1$。

従って整数の組は $(1,1)$ または $(-1,-1)$ だけです。

正の条件を追加すると $\det A=1$ で、$A\in SL_2(\mathbb Z)$ です。

[レベル1のアデール分解](#thm-afr11-level-one-decomposition)の交わりの計算に一致します。
<!-- solution-end -->

<a id="ex-afr11-a4"></a>

### A4. 古典的定数項

$f(z)=a_0+\sum_{n\ge1}a_ne^{2\pi inz}$ を重さ4のレベル1の正則モジュラー形式とし、$a_0=2$ とする。$h=s(3i)k_{\pi/4}$ での持ち上げの定数項を求めよ。

- Level: A
- ID: AFR11-A4

<!-- solution-start -->
**詳細解答**

[定数項の実積分への還元](#prop-afr11-constant-term-reduction)と[古典形式の持ち上げ](#thm-afr11-classical-lift)より

$$
C_{\phi_f}((h,1))=3^2 e^{4i\pi/4}\int_0^1f(3i+x)\,dx.
$$

$y=3$ で級数は一様絶対収束し、$n\ge1$ なら $e^{-6\pi n}(e^{2\pi in}-1)/(2\pi in)=0$ です。

積分は2、回転因子は $-1$ なので答えは $-18$ です。
<!-- solution-end -->

<a id="ex-afr11-b1"></a>

### B1. 二つの素数で格子を指定する

$g_2=\operatorname{diag}(2,1)$、$g_3=\operatorname{diag}(1,1/3)$、他の有限成分と実成分は単位行列とする。

$L$ とその上三角基底行列 $\gamma$ を求め、$g=\gamma(h,k_f)$ を具体化せよ。

- Level: B
- ID: AFR11-B1

<!-- solution-start -->
**詳細解答**

[レベル1のアデール分解](#thm-afr11-level-one-decomposition)で用いた格子の条件を第1、第2座標に分けます。第1座標は2進付値1以上、他で0以上なので $2\mathbb Z$ です。第2座標は3進付値 $-1$ 以上、他で0以上なので $\frac13\mathbb Z$ です。

$$
L=2\mathbb Z\times\tfrac13\mathbb Z,\qquad
\gamma=\operatorname{diag}(2,1/3).
$$

$h=\gamma^{-1}=\operatorname{diag}(1/2,3)$ は正の行列式を持ちます。

有限側では $k_2=\operatorname{diag}(1,3)$、$k_3=\operatorname{diag}(1/2,1)$、その他の $k_p=\operatorname{diag}(1/2,3)$ となります。

どの場合も各対角成分が該当する素数で単元なので $k_p\in K_p$ です。

各成分で左から $\gamma$ を掛けると元の行列に戻ります。
<!-- solution-end -->

<a id="ex-afr11-b2"></a>

### B2. 定数項を有理行列で移す

$\gamma=\begin{pmatrix}2&1\\0&3\end{pmatrix}$ とする。$\gamma^{-1}n(u)\gamma$ を求め、左有理行列不変な連続関数の定数項が $C_\phi(\gamma g)=C_\phi(g)$ を満たすことを示せ。

- Level: B
- ID: AFR11-B2

<!-- solution-start -->
**詳細解答**

逆行列は $\begin{pmatrix}1/2&-1/6\\0&1/3\end{pmatrix}$ であり、

$$
n(u)\gamma=\begin{pmatrix}2&1+3u\\0&3\end{pmatrix},
\quad
\gamma^{-1}n(u)\gamma
=\begin{pmatrix}1&3u/2\\0&1\end{pmatrix}.
$$

従って左不変性を使うと

$$
C_\phi(\gamma g)=\int_{\mathbb Q\backslash\mathbb A}
\phi(n(3u/2)g)\,du.
$$

変数 $v=3u/2$ はコンパクトな加法商の自己同型で、平行移動不変な確率測度を保存します。[定数項の実積分への還元](#prop-afr11-constant-term-reduction)と同じ置換により $C_\phi(\gamma g)=C_\phi(g)$ です。実側だけの区間積分で $3/2$ を掛ける操作とは異なり、全素点を同時に変換しています。
<!-- solution-end -->

<a id="ex-afr11-b3"></a>

### B3. 右微分の二次式

第6節の $H,S,T$ と右微分について、$[H,S]=2T$ を計算で確かめ、$\Omega=D_H^2+D_S^2-D_T^2$ が重さ $k$ の持ち上げに作用すると $(k^2-2k)\phi_f$ になることを示せ。

- Level: B
- ID: AFR11-B3

<!-- solution-start -->
**詳細解答**

$HS=\begin{pmatrix}0&1\\-1&0\end{pmatrix}=T$、$SH=-T$ なので交換子は $2T$ です。

従って $[D_H,D_S]=2D_T$ です。

$$
(D_H+iD_S)(D_H-iD_S)
=D_H^2+D_S^2-2iD_T.
$$

[古典形式の持ち上げの証明](#thm-afr11-classical-lift)で $P_-\phi_f=0$、$D_T\phi_f=ik\phi_f$ を確認しました。よって

$$
\begin{aligned}
\Omega\phi_f
&=(P_+P_-+2iD_T-D_T^2)\phi_f\\
&=0+2i(ik)\phi_f-(ik)^2\phi_f\\
&=(k^2-2k)\phi_f.
\end{aligned}
$$

例えば $k=12$ なら固有値は $144-24=120$ です。

符号は回転方向 $T$ の選び方と上の $\Omega$ の定義に従います。
<!-- solution-end -->

<a id="ex-afr11-c1"></a>

### C1. 持ち上げの逆とカスプ条件

$\phi$ を右 $K_f$ 不変、中心指標が自明で、右 $SO(2)$ 移動が重さ $k\ge0$（偶数）の保型形式とする。

さらに $f(z)=y^{-k/2}\phi((s(z),1))$ が上半平面上で正則であると仮定する。

1. $f$ が古典的な重さ $k$ の変換則を満たすことを示せ。
2. $\phi$ の緩増大条件から $f$ が無限遠で高々多項式増大することを示し、$q=0$ に正則に延長できることを説明せよ。
3. $\phi=\phi_f$ と大域カスプ条件の同値性を示せ。

- Level: C
- ID: AFR11-C1

<!-- solution-start -->
**詳細解答**

(1) 実成分への制限 $\Phi(s)=\phi((s,1))$（$s\in SL_2(\mathbb R)$）を考えます。

$\delta\in SL_2(\mathbb Z)$ の有限成分は $K_f$ に属するので

$$
\Phi(\delta s)=\phi(\delta(s,1)(1,\delta_f^{-1}))
=\phi((s,1)).
$$

また $\Phi(sk_\theta)=e^{ik\theta}\Phi(s)$ です。従って AFR1 の[持ち上げの対応](../AFR1/index.md#thm-afr1-lift)の逆方向により

$$
f(\delta\cdot z)=j(\delta,z)^k f(z),\qquad
\Phi(s)=j(s,i)^{-k}f(s\cdot i)
$$

です。

(2) $0\le x\le1$、$y\ge1$ とすると $s(z)$ と逆行列の成分は絶対値 $\sqrt y$ 以下です（逆行列は $\begin{pmatrix}1/\sqrt y&-x/\sqrt y\\0&\sqrt y\end{pmatrix}$）。

有限成分は1なので $H((s(z),1))=\sqrt y$。

緩増大条件を代入すると

$$
|f(z)|\le C y^{(M-k)/2}.
$$

指数が負なら0以上の指数で評価し直してよく、高々多項式増大です。

変換則を $\delta=n(1)$ に適用すると周期1です。

MF2 の[周期正則関数のq表示](../../MF/MF2/index.md#thm-mf2-q-coordinate)から $q=e^{2\pi iz}$ の穿孔円板上の正則関数 $F(q)$ を得ます。

$q=re^{2\pi ix}$ と置くと $y=-\log r/(2\pi)$ なので、ある $N\ge0$ について $|F(q)|\le C'(1+|\log r|)^N$ です。

[Laurent展開の定理](../../../解析系/CA/CA4/index.md#thm-ca4-laurent)による係数の円周積分（$j\ge1$）は

$$
a_{-j}=\frac1{2\pi i}\int_{|q|=r} F(q)q^{j-1}\,dq,
\qquad
|a_{-j}|\le C'r^j(1+|\log r|)^N.
$$

$r=e^{-t}$ とすると右辺は $C'e^{-jt}(1+t)^N\to0$ です。係数は半径に依存しないので全ての負の次数の係数が0となります。[Laurent展開の定理](../../../解析系/CA/CA4/index.md#thm-ca4-laurent)で残った非負次数の冪級数は $|q|<1$ で正則であり、$q=0$ にも延長できます。従って $f$ は正則モジュラー形式です。

(3) 任意の $g=\gamma(h,k_f)$ を [レベル1のアデール分解](#thm-afr11-level-one-decomposition) で取ります。

$h=t s$、$t=\sqrt{\det h}>0$、$s\in SL_2(\mathbb R)$ と置くと、中心指標の自明性と両側の不変性から

$$
\phi(g)=\phi((s,1))=j(s,i)^{-k}f(s\cdot i)
=(\det h)^{k/2}j(h,i)^{-k}f(h\cdot i).
$$

これは [古典形式の持ち上げ](#thm-afr11-classical-lift)そのものです。

定数項の式は $C_\phi((s(z)k_\theta,1))=y^{k/2}e^{ik\theta}a_0$ です。

大域カスプ条件なら特に $z=i,\theta=0$ で $a_0=0$ です。

逆に $a_0=0$ なら実側の積分は全て0となり、[定数項の実積分への還元](#prop-afr11-constant-term-reduction)で全ての $g$ について0です。
<!-- solution-end -->

## 8. 次講への接続

有限側での整数行列の不変性、中心指標、実回転による重さ、定数項の消滅を一つの関数に記録できました。次講では実行列群の右作用から得られる表現を、重さを動かす微分作用素と結び付けて調べます。

参考文献：Daniel Bump, *Automorphic Forms and Representations*, Cambridge University Press, 1997（古典形式とアデール上の保型形式）；Stephen Gelbart, *Automorphic Forms on Adele Groups*, Princeton University Press, 1975（アデール群上の定式化）。
