# GBG4 主束から物質場の束をどう作るか

[GBG3 の局所sectionと自明化](../GBG3/index.md#thm-gbg3-section-trivialization)は、主束の各ファイバーに群座標を入れた。しかし、物質場の値は普通、群元そのものではない。複素数の荷電スカラーなら複素数、ベクトル場ならベクトルが値になる。同じ主束からこれらの値の「変換の仕方」を指定して、基底多様体上のベクトル束を作りたい。

その変換を担うのが群の**表現**であり、得られるものが**結合ベクトル束**である。本講では商集合を作るだけで終わらず、ファイバーの線形構造と滑らかな局所自明化、場と同変関数の対応まで証明する。

以下、$M$ は Hausdorff・第二可算な有限次元滑らかな多様体、$G$ は有限次元 Lie 群、$\pi:P\to M$ は滑らかな右主 $G$ 束とする。$V$ は有限次元の実または複素ベクトル空間、$\mathbb F=\mathbb R$ または $\mathbb C$ とし、写像の滑らかさは実多様体として考える。$U_{ij}=U_i\cap U_j$、右作用は $pg$、局所sectionの遷移関数は $s_j=s_i g_{ij}$ に固定する。

<!-- definition-example-audit: strict -->

## 1. 群元をベクトルの変換に読み替える

主束の右作用では $p$ を $pg$ に動かした。一方、物質場の値に対しては $g$ に線形変換を対応させる。積の順序を守るため、ここでの表現は $V$ への**左作用**とする。

<a id="def-gbg4-representation"></a>

<!-- formal-statement-start -->
> **定義（滑らかな左線形表現）**  
> 有限次元 Lie 群 $G$ と有限次元 $\mathbb F$ ベクトル空間 $V$ に対して、滑らかな群準同型
$$
\rho:G\longrightarrow GL_{\mathbb F}(V),\qquad
\rho(gh)=\rho(g)\rho(h),\quad \rho(e)=I_V
$$
> を $G$ の $V$ 上の **滑らかな左線形表現** という。$g$ は $v\in V$ に $\rho(g)v$ と作用する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg4-representation -->
**定義の確認**。$G=U(1)=\{z\in\mathbb C:|z|=1\}$、$V=\mathbb C$ とする。整数 $q$ に対し $\rho_q(z)v=z^qv$ と置く。$z^q$ は $q<0$ でも $z\ne0$ なので滑らかであり、
$$
\rho_q(zw)v=(zw)^qv=z^q(w^qv)
=\rho_q(z)\rho_q(w)v.
$$
$\rho_q(1)=1$ で、$|z^q|=1$ だから各 $\rho_q(z)$ は可逆。従って表現の全条件を満たす。$q=0$ は全ての群元を恒等変換へ送る表現である。また $G=GL(n,\mathbb R)$、$V=\mathbb R^n$ の $\rho(A)v=Av$ も、行列積の結合律と可逆性から滑らかな左表現となる。
<!-- definition-example-end -->

表現は忠実（単射）である必要はない。例えば $\rho_0$ はすべての $z$ を恒等変換へ送る。それでも、次の構成は成立する。

## 2. 主束と表現からベクトル束を貼り合わせる

$P\times V$ の点 $(p,v)$ と $(pg,v)$ を、何も変えずに同一視しては表現の情報が消える。基準となる主束の点を $pg$ に変えたなら、ベクトルの側には逆向きの $\rho(g^{-1})$ を作用させて同じ幾何学的な値を表す。

<a id="def-gbg4-associated-bundle"></a>

<!-- formal-statement-start -->
> **定義（結合ベクトル束）**  
> 右主 $G$ 束 $\pi:P\to M$ と滑らかな左線形表現 $\rho:G\to GL_{\mathbb F}(V)$ に対して、$P\times V$ に右作用
$$
(p,v)\cdot g=(pg,\rho(g^{-1})v)
$$
> を入れる。その軌道を $[p,v]$ と書いた商
$$
E=P\times_\rho V=(P\times V)/G
$$
> を **結合ベクトル束** といい、基底への写像を
$$
\pi_E([p,v])=\pi(p)
$$
> とする。同値関係は、同じことを
$$
[pg,v]=[p,\rho(g)v]
$$
> と書いてもよい。
<!-- formal-statement-end -->

右作用であることを先に確かめる。$( (p,v)\cdot g)\cdot h$ は
$$
(pgh,\rho(h^{-1})\rho(g^{-1})v)
=(p(gh),\rho((gh)^{-1})v)
=(p,v)\cdot(gh).
$$
単位元も恒等変換として作用する。ゆえにこの軌道関係は同値関係を与える。$\pi(pg)=\pi(p)$ だから $\pi_E$ は代表元に依存しない。

<!-- definition-example-start: def-gbg4-associated-bundle -->
**定義の確認：積主束**。$P=M\times G$ とし、$\rho$ を任意の滑らかな左表現とする。写像
$$
J([\, (x,g),v\,])=(x,\rho(g)v)
$$
は、代表元を $((x,gh),\rho(h^{-1})v)$ に換えても
$$
\rho(gh)\rho(h^{-1})v=\rho(g)v
$$
だから値が変わらない。逆は $(x,w)\mapsto[(x,e),w]$。従ってこの場合は $E\simeq M\times V$ で、ファイバーは確かに $V$ として働く。$G$ や $\rho$ が非自明でも、積主束から作れば結合束は自明になる。
<!-- definition-example-end -->

商の各ファイバーを線形空間として扱えること、全体が滑らかな束になることを確認する。局所section $s_i$ に対して $p=s_i(x)k_i$ と書けるのは[GBG3 のsectionと自明化の対応](../GBG3/index.md#thm-gbg3-section-trivialization)による。このとき $[p,v]=[s_i(x),\rho(k_i)v]$ である。

<a id="thm-gbg4-associated-vector-bundle"></a>

<!-- formal-statement-start -->
> **定理（結合束の滑らかなベクトル束構造）**  
> $M,G,P,V,\rho$ が上記の仮定を満たすとする。$E=P\times_\rho V$ は階数 $\dim_{\mathbb F}V$ の滑らかな $\mathbb F$ ベクトル束である。$U_i$ 上の滑らかな局所section $s_i$ に対し、局所自明化とその逆は
$$
T_i([s_i(x)k,v])=(x,\rho(k)v),\qquad
T_i^{-1}(x,w)=[s_i(x),w]
$$
> で与えられる。$s_j=s_i g_{ij}$ の重なりでは、そのベクトル座標の遷移は
$$
T_jT_i^{-1}(x,w)=(x,\rho(g_{ij}^{-1})w).
$$
<!-- formal-statement-end -->

### 証明の見取り図

局所sectionを使ってすべての軌道を $[s_i(x),w]$ と一意に表す。同一ファイバーでの加法とスカラー倍をこの $w$ で定め、別のsectionへ移るときの変換が**線形かつ滑らか**であることを示す。これで局所積を貼り合わせて束構造が得られる。

<!-- proof-start -->
### 証明

**1. 軌道代表と座標の一意性**。$p=s_i(x)k$ と書けば、定義の関係から $[p,v]=[s_i(x),\rho(k)v]$。もし $[s_i(x),w]=[s_i(x),w']$ なら、ある $g$ について
$$
(s_i(x)g,\rho(g^{-1})w)=(s_i(x),w').
$$
主束の[自由性](../GBG2/index.md#prop-gbg2-free-transitive)で $g=e$ なので $w=w'$。よって $T_i$ は well-defined な全単射である。

**2. ファイバーの線形構造**。$x\in M$ と $p\in\pi^{-1}(x)$ を固定する。$[p,v]+[p,w]=[p,v+w]$、$a[p,v]=[p,av]$ と定める。別の代表元 $p'=pg$ を選ぶと同じ二点は
$$
[p,v]=[pg,\rho(g^{-1})v],\quad
[p,w]=[pg,\rho(g^{-1})w]
$$
である。$\rho(g^{-1})$ が $\mathbb F$ 線形なので
$$
\rho(g^{-1})(v+w)=\rho(g^{-1})v+\rho(g^{-1})w,\quad
\rho(g^{-1})(av)=a\rho(g^{-1})v.
$$
従って加法・スカラー倍は $p$ の選び方に依存しない。固定 $p$ に対して $v\mapsto[p,v]$ は線形全単射だから、各ファイバーは $V$ と同型な $\mathbb F$ ベクトル空間である。

**3. 局所自明化の滑らかさ**。主束上の[局所同変自明化](../GBG3/index.md#thm-gbg3-section-trivialization)で $p=s_i(x)k$ の $(x,k)$ は滑らかに決まる。$(p,v)\mapsto(x,\rho(k)v)$ は滑らかで、軌道の上で一定なので、商の局所座標として $T_i$ を与える。逆 $T_i^{-1}(x,w)=[s_i(x),w]$ も滑らかである。

**4. 重なりの貼り合わせ**。$s_j=s_i g_{ij}$ より $s_i=s_j g_{ij}^{-1}$。したがって
$$
\begin{aligned}
T_jT_i^{-1}(x,w)
&=T_j([s_i(x),w])\\
&=T_j([s_j(x)g_{ij}^{-1}(x),w])\\
&=(x,\rho(g_{ij}^{-1}(x))w).
\end{aligned}
$$
$g_{ij}$ と $\rho$ は滑らかで、各 $\rho(g_{ij}^{-1})$ は可逆線形。三重重なりでは[GBG1 のcocycle条件](../GBG1/index.md#def-gbg1-cocycle)から
$$
\rho(g_{jk}^{-1})\rho(g_{ij}^{-1})
=\rho((g_{ij}g_{jk})^{-1})
=\rho(g_{ik}^{-1}).
$$
ゆえにこれらの局所座標は滑らかに整合する。局所積 $U_i\times V$ の滑らかな貼り合わせによって $E$ の束構造が得られ、$T_i$ は線形な局所自明化になる。基底が Hausdorff・第二可算でありファイバーも有限次元なので、この貼り合わせの全空間も Hausdorff・第二可算である（異なる基底点は基底で、同じ基底点は一つの局所自明化で分離できる）。これで滑らかなベクトル束の全条件を満たす。
<!-- proof-end -->

**逆向きの式を見分ける**。同じベクトル束の点を $[s_i,v_i]=[s_j,v_j]$ と書くなら、$s_j=s_i g_{ij}$ なので
$$
[s_j,v_j]=[s_i,\rho(g_{ij})v_j],\qquad
v_i=\rho(g_{ij})v_j.
$$
よって $v_j=\rho(g_{ij}^{-1})v_i$。主束の遷移 $g_{ij}$ と、物質場の座標変換 $\rho(g_{ij}^{-1})$ は互いに逆向きになる。

## 3. 物質場を主束上の関数として見る

結合束の**切断**は、各 $x$ にファイバー $E_x$ の値を滑らかに一つずつ選ぶ写像である。すでに[GBG3 のsectionの定義](../GBG3/index.md#def-gbg3-local-section)で学んだ「射影の右逆」と同じ考えだが、今回は値がベクトルである。

逆に $P$ の各点にベクトルを割り当てる関数を考えると、同一ファイバー内で点 $p$ を $pg$ に変更しても、結合束の値が同じになる条件が必要になる。

<a id="def-gbg4-equivariant-map"></a>

<!-- formal-statement-start -->
> **定義（表現に関する同変関数）**  
> 右主 $G$ 束 $P$ と左線形表現 $\rho:G\to GL_{\mathbb F}(V)$ に対し、滑らかな $f:P\to V$ が **$\rho$ に関して同変** であるとは、すべての $p\in P$、$g\in G$ に対して
$$
f(pg)=\rho(g^{-1})f(p)
$$
> を満たすことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg4-equivariant-map -->
**定義の確認**。$P=M\times U(1)$、$\rho_q(z)v=z^qv$、滑らかな $a:M\to\mathbb C$ とする。$f(x,z)=z^{-q}a(x)$ は滑らかであり、
$$
f((x,z)h)=(zh)^{-q}a(x)
=h^{-q}z^{-q}a(x)
=\rho_q(h^{-1})f(x,z).
$$
従って同変である。対照的に $q\ne0$ かつ $a(x)\ne0$ の場所では $f(x,z)=a(x)$ という一定値の取り方は、一般に同変条件を満たさない。
<!-- definition-example-end -->

<a id="thm-gbg4-sections-equivariant"></a>

<!-- formal-statement-start -->
> **定理（結合束の切断と同変関数の対応）**  
> $P\to M$ を滑らかな右主 $G$ 束、$\rho:G\to GL_{\mathbb F}(V)$ を滑らかな左線形表現、$E=P\times_\rho V$ とする。このとき、滑らかな切断 $\sigma:M\to E$ と、滑らかな $\rho$ 同変関数 $f:P\to V$ は一対一に対応する。対応は
$$
\sigma(x)=[p,f(p)]\quad(\pi(p)=x)
$$
> および
$$
\sigma(\pi(p))=[p,f(p)]
$$
> の右辺の $f(p)$ を一意に取り出すことによって与えられる。
<!-- formal-statement-end -->

### 証明の見取り図

同変性が代表元の取り替えを吸収するので、$[p,f(p)]$ は $p$ に依存しない。逆向きでは、固定した $p$ を基準にすると $[p,v]$ の $v$ が一意になることを使う。滑らかさは局所sectionの座標を通して確かめる。

<!-- proof-start -->
### 証明

まず滑らかな同変関数 $f$ が与えられたとする。$x\in M$ と $p\in\pi^{-1}(x)$ に対し $\sigma_f(x)=[p,f(p)]$ と置く。別の $p'=pg$ を選んでも
$$
[p',f(p')]=[pg,\rho(g^{-1})f(p)]
=[p,f(p)]
$$
となるので well-defined である。$\pi_E(\sigma_f(x))=x$ だから切断である。局所section $s_i$ に対して
$$
\sigma_f(x)=[s_i(x),f(s_i(x))]
$$
と書ける。$f\circ s_i$ は滑らかで、[局所自明化](#thm-gbg4-associated-vector-bundle)のもとで切断の座標は $(x,f(s_i(x)))$。従って $\sigma_f$ は滑らか。

逆に滑らかな切断 $\sigma$ があれば、各 $p\in P$ に対して $\sigma(\pi(p))=[p,v]$ と表す $v$ は[軌道代表の一意性](#thm-gbg4-associated-vector-bundle)からただ一つである。それを $f_\sigma(p)$ と置く。$p'=pg$ に対して
$$
[p,f_\sigma(p)]
=[pg,f_\sigma(pg)]
=[p,\rho(g)f_\sigma(pg)]
$$
だから $\rho(g)f_\sigma(pg)=f_\sigma(p)$、すなわち $f_\sigma(pg)=\rho(g^{-1})f_\sigma(p)$。

滑らかさも確認する。$p=s_i(x)k$ とし、$\sigma(x)=[s_i(x),v_i(x)]$ と書く。$v_i$ は滑らかな切断の局所成分である。等式
$$
[s_i(x)k,f_\sigma(s_i(x)k)]
=[s_i(x),\rho(k)f_\sigma(s_i(x)k)]
=[s_i(x),v_i(x)]
$$
と一意性から
$$
f_\sigma(s_i(x)k)=\rho(k^{-1})v_i(x).
$$
$k$ は主束の局所自明化で滑らかに取り出せるため $f_\sigma$ は滑らかである。

二つの対応を続けて施すと $[p,v]$ における $v$ の一意性により元の関数へ戻り、元の切断へも戻る。ゆえに一対一対応である。
<!-- proof-end -->

**幾何学的な意味**。物質場の値は各ファイバー上のベクトルであり、その値を $P$ 上の関数として表すと、基準点の移動に合わせて表現の逆元で補正される。これが物質場のゲージ変換の基礎になる。

## 4. 重なりで局所成分がどう変わるか

各パッチで同変関数の値を $v_i(x)=f(s_i(x))$ と読む。これを切断の局所成分ともいう。新しい量を定義するのではなく、[切断と同変関数の対応](#thm-gbg4-sections-equivariant)の局所表示である。

<a id="thm-gbg4-component-transformation"></a>

<!-- formal-statement-start -->
> **定理（切断の局所成分とsection変更の変換則）**  
> $P\to M$ は右主 $G$ 束、$\rho$ は滑らかな左線形表現、$\sigma$ は $E=P\times_\rho V$ の滑らかな切断とする。$s_j=s_i g_{ij}$ のとき、$\sigma(x)=[s_i(x),v_i(x)]$ と表す局所成分は
$$
v_j=\rho(g_{ij}^{-1})v_i
$$
> を満たす。さらに $s'_i=s_i h_i$ に基準を変更すると、
$$
v'_i=\rho(h_i^{-1})v_i,\qquad
g'_{ij}=h_i^{-1}g_{ij}h_j
$$
> となり、変更後も $v'_j=\rho((g'_{ij})^{-1})v'_i$ が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

前半は同変関数 $f$ を $s_j=s_i g_{ij}$ に代入する。後半は [GBG3 の遷移関数変換則](../GBG3/index.md#thm-gbg3-transition-change) を使い、非可換な $G$ に対しても積の順序を保持する。

<!-- proof-start -->
### 証明

対応する同変関数 $f$ を取る。$x\in U_{ij}$ について
$$
v_j(x)=f(s_j(x))
=f(s_i(x)g_{ij}(x))
=\rho(g_{ij}(x)^{-1})f(s_i(x))
=\rho(g_{ij}(x)^{-1})v_i(x).
$$
同様に $s'_i=s_i h_i$ を代入すれば
$$
v'_i=f(s_i h_i)=\rho(h_i^{-1})v_i.
$$
主束の[section変更定理](../GBG3/index.md#thm-gbg3-transition-change)によって $g'_{ij}=h_i^{-1}g_{ij}h_j$ だから
$$
\begin{aligned}
\rho((g'_{ij})^{-1})v'_i
&=\rho(h_j^{-1}g_{ij}^{-1}h_i)\rho(h_i^{-1})v_i\\
&=\rho(h_j^{-1})\rho(g_{ij}^{-1})\rho(h_i)\rho(h_i^{-1})v_i\\
&=\rho(h_j^{-1})v_j=v'_j.
\end{aligned}
$$
非可換な積は交換していない。
<!-- proof-end -->

逆に、各 $U_i$ 上に滑らかな $v_i:U_i\to V$ があり、この重なり条件を満たせば大域切断を作れる。

<a id="prop-gbg4-local-section-gluing"></a>

<!-- formal-statement-start -->
> **命題（局所成分の貼り合わせ判定）**  
> 上記の主束・表現・開被覆・局所sectionについて、滑らかな写像 $v_i:U_i\to V$ がすべての重なりで $v_j=\rho(g_{ij}^{-1})v_i$ を満たすことと、それらを局所成分とする一意な滑らかな結合束切断 $\sigma:M\to E$ が存在することは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

各パッチ上で $\sigma_i(x)=[s_i(x),v_i(x)]$ と置く。重なりでは $[s_j,v_j]=[s_i,\rho(g_{ij})v_j]=[s_i,v_i]$ となる。局所的な滑らかさが貼り合わされ、大域切断が得られる。

<!-- proof-start -->
### 証明

必要性は[局所成分の変換定理](#thm-gbg4-component-transformation)で示した。十分性について $x\in U_i$ に対し $\sigma(x)=[s_i(x),v_i(x)]$ と置く。$x\in U_i\cap U_j$ なら
$$
[s_j(x),v_j(x)]
=[s_i(x)g_{ij}(x),v_j(x)]
=[s_i(x),\rho(g_{ij}(x))v_j(x)]
=[s_i(x),v_i(x)].
$$
よって値はパッチの選び方に依存しない。$T_i(\sigma(x))=(x,v_i(x))$ は滑らかなので $\sigma$ は全域で滑らか、また $\pi_E\circ\sigma=\operatorname{id}_M$。局所座標が各点の切断の値を一意に決めるため、そのような $\sigma$ は一意である。
<!-- proof-end -->

この命題により、基底全体で一枚の座標を取れなくても、重なり条件を守る局所成分の集まりが一つの物質場を表すことが分かる。

## 5. 二つの重要な結合束

### U(1) の電荷 $q$ をもつ複素線束

[GBG2 の Hopf 主束](../GBG2/index.md#thm-gbg2-hopf-principal) $P=S^3\to S^2$ に $\rho_q(z)v=z^qv$（整数 $q$）を作用させると、$L_q=P\times_{\rho_q}\mathbb C$ は複素階数1の線束になる。$s_z=s_wg_{wz}$、$g_{wz}=|t|/t$（重なりで $t\ne0$）だったので、
$$
v_z=g_{wz}^{-q}v_w
=\left(\frac{t}{|t|}\right)^q v_w.
$$
例えば $t=i$ なら $g_{wz}=-i$、$q=1$ では $v_z=i v_w$、$q=-1$ では $v_z=-i v_w$。同じ主束でも表現の $q$ を変えると局所成分の変換が変わる。

$q=0$ なら $\rho_0(g)=1$ なので遷移がすべて $1$ となり、主束 $P$ の自明性によらず $L_0\simeq S^2\times\mathbb C$。一方 $q=1$ の線束が大域的に自明かどうかは、この一点での位相の違いだけからは決まらない。後の GBG18 では大域的な巻き数から判定する。

### 枠束から接束を取り戻す

[GBG2 の枠束](../GBG2/index.md#thm-gbg2-frame-principal) $P=\operatorname{Fr}(M)$ の群は $GL(n,\mathbb R)$、表現は標準表現 $\rho(A)v=Av$ とする。枠 $p=(e_1,\ldots,e_n)$ を、線形同型 $p:\mathbb R^n\to T_xM$、$p(v)=\sum_a v^a e_a$ と読む。すると
$$
\Theta([p,v])=p(v)=\sum_{a=1}^n v^a e_a
$$
は $E=\operatorname{Fr}(M)\times_{\rho}\mathbb R^n$ から $TM$ への写像を与える。枠を $pA$ に替えると
$$
\Theta([pA,v])=(pA)(v)=p(Av)
=\Theta([p,Av])
$$
で、結合束の同値関係と一致する。各 $x$ では $p:\mathbb R^n\to T_xM$ が同型であり、局所枠に対して両辺の座標は同じ $v$。よって $\Theta$ とその逆は局所座標で恒等写像となる滑らかなベクトル束同型である。

例えば $M=(0,\infty)$ で $y=\log x$ とすると、[GBG3 の局所枠の変更](../GBG3/index.md#thm-gbg3-transition-change)に対応して $e_y=x e_x$ となる。$5e_x$ の成分は $e_x$ 基準では $5$、$e_y$ 基準では $5/x$。これは $GL(1,\mathbb R)$ の標準表現に対する $v_y=x^{-1}v_x$ の具体例である。

---

## 6. 演習と詳細解答

### Level A：同値関係と座標を計算する

<a id="ex-gbg4-a01"></a>
#### GBG4-A01 商の向きを確かめる
- Level: A

$G=GL(2,\mathbb R)$、$V=\mathbb R^2$ は標準表現、$A=\left(\begin{smallmatrix}1&2\\0&1\end{smallmatrix}\right)$、$v=(1,3)^{\mathsf T}$ とする。$[pA,v]$ を $p$ を基準とする代表元で表し、$(p,v)\cdot A$ の第二成分を求めよ。

<!-- solution-start -->
**詳細解答**。結合束の[同値関係](#def-gbg4-associated-bundle)により $[pA,v]=[p,Av]$。行列積は
$$
Av=\begin{pmatrix}1&2\\0&1\end{pmatrix}
\begin{pmatrix}1\\3\end{pmatrix}
=\begin{pmatrix}7\\3\end{pmatrix}
$$
なので $[pA,v]=[p,(7,3)^{\mathsf T}]$。一方、右作用の定義は $(p,v)\cdot A=(pA,A^{-1}v)$ である。$A^{-1}=\left(\begin{smallmatrix}1&-2\\0&1\end{smallmatrix}\right)$ だから第二成分は $(-5,3)^{\mathsf T}$。同一視の式と右作用の式では、どちらのベクトルを固定するかが違う。
<!-- solution-end -->

<a id="ex-gbg4-a02"></a>
#### GBG4-A02 電荷ゼロの束
- Level: A

任意の滑らかな右主 $U(1)$ 束 $P\to M$ に対し、$\rho_0(z)v=v$ で作った $E$ が自明な複素線束であることを、具体的な束同型と逆写像を示して証明せよ。

<!-- solution-start -->
**詳細解答**。$\rho_0(g)=1$ だから $[pg,v]=[p,v]$。そこで $F:E\to M\times\mathbb C$ を $F([p,v])=(\pi(p),v)$ と置けば代表元に依存しない。逆写像は $(x,v)\mapsto[p,v]$、ただし $p\in\pi^{-1}(x)$ は任意とする。主束の各ファイバーは空でなく、異なる二つの $p$ は $pg$ で結ばれるため値は同じ。局所sectionで表せば両写像は $(x,v)\mapsto(x,v)$ なので滑らかで、各ファイバーで線形である。従って束同型であり、$P$ に大域sectionがあることは必要ない。
<!-- solution-end -->

<a id="ex-gbg4-a03"></a>
#### GBG4-A03 U(1) の局所成分
- Level: A

$g_{01}(x)=e^{ix}$、$\rho_2(z)v=z^2v$、$v_0(x)=1+ix$ とする。$v_1(x)$ を求め、$v_1=e^{-2ix}(1+ix)$ が重なりの条件を満たす理由を説明せよ。

<!-- solution-start -->
**詳細解答**。[局所成分の変換則](#thm-gbg4-component-transformation)では $v_1=\rho_2(g_{01}^{-1})v_0$。$g_{01}^{-1}=e^{-ix}$ なので $\rho_2(e^{-ix})=e^{-2ix}$。従って
$$
v_1(x)=e^{-2ix}(1+ix).
$$
逆向きにも $g_{10}=e^{-ix}$ だから $v_0=\rho_2(g_{10}^{-1})v_1=e^{2ix}e^{-2ix}(1+ix)=1+ix$。両側の局所成分は一つの切断の表示になっている。
<!-- solution-end -->

<a id="ex-gbg4-a04"></a>
#### GBG4-A04 枠を変えたベクトル
- Level: A

$e'_1=e_1+e_2$、$e'_2=e_2$ とするとき、$w=2e_1+3e_2$ の新しい枠での成分を求め、二つの表示が同じベクトルを表すことを確かめよ。

<!-- solution-start -->
**詳細解答**。旧枠を列に並べた $p=(e_1,e_2)$ とすると $p'=pA$、$A=\left(\begin{smallmatrix}1&0\\1&1\end{smallmatrix}\right)$ であり $\det A=1$。$w=pv=p'v'$ から $Av'=v$。従って
$$
v'=A^{-1}v
=\begin{pmatrix}1&0\\-1&1\end{pmatrix}
\begin{pmatrix}2\\3\end{pmatrix}
=\begin{pmatrix}2\\1\end{pmatrix}.
$$
実際 $2e'_1+e'_2=2(e_1+e_2)+e_2=2e_1+3e_2$ で一致する。
<!-- solution-end -->

### Level B：滑らかさと非可換な整合性

<a id="ex-gbg4-b01"></a>
#### GBG4-B01 同変関数から切断を復元する
- Level: B

$P=\mathbb R\times U(1)$、$\rho_q(z)v=z^qv$、$q\in\mathbb Z$、$a(x)=x+i$ とする。$f(x,z)=z^{-q}a(x)$ が同変であることを示し、対応する結合束切断を与えよ。さらに $s'(x)=(x,e^{ix})$ を使うときの局所成分を求めよ。

<!-- solution-start -->
**詳細解答**。$z,h\in U(1)$ について
$$
f((x,z)h)=f(x,zh)=(zh)^{-q}(x+i)
=h^{-q}f(x,z)=\rho_q(h^{-1})f(x,z).
$$
関数は滑らかで、[切断と同変関数の対応](#thm-gbg4-sections-equivariant)により $\sigma(x)=[(x,1),x+i]$。新しいsection $s'(x)=(x,e^{ix})$ では
$$
v'(x)=f(s'(x))=e^{-iqx}(x+i).
$$
同じ切断であることは $[(x,e^{ix}),e^{-iqx}(x+i)]=[(x,1),x+i]$ によって直接確認できる。
<!-- solution-end -->

<a id="ex-gbg4-b02"></a>
#### GBG4-B02 非可換な二枚の貼り合わせ
- Level: B

$M=\mathbb R$ を $U_0=U_1=\mathbb R$ で覆う。$G=GL(2,\mathbb R)$ の標準表現と
$$
g_{01}(x)=\begin{pmatrix}1&x\\0&1\end{pmatrix},\qquad
v_0(x)=\begin{pmatrix}x\\1\end{pmatrix}
$$
を用いる。$v_1$ を計算し、これが一意な大域切断を定めることを示せ。

<!-- solution-start -->
**詳細解答**。$\det g_{01}=1$ だから逆行列は
$$
g_{01}^{-1}(x)=\begin{pmatrix}1&-x\\0&1\end{pmatrix}.
$$
局所成分は標準表現について
$$
v_1=g_{01}^{-1}v_0
=\begin{pmatrix}1&-x\\0&1\end{pmatrix}
\begin{pmatrix}x\\1\end{pmatrix}
=\begin{pmatrix}0\\1\end{pmatrix}.
$$
重なりで $[s_1,v_1]=[s_0,g_{01}v_1]=[s_0,v_0]$。双方は滑らかで、[局所貼り合わせ命題](#prop-gbg4-local-section-gluing)から切断は存在かつ一意である。ここで $g_{01}^{-1}v_0$ の順序を逆にしてはならない。
<!-- solution-end -->

<a id="ex-gbg4-b03"></a>
#### GBG4-B03 section を変えたときの二重変換
- Level: B

$G=GL(2,\mathbb R)$ の標準表現と二枚の局所sectionについて、$g_{01}=A$、$h_0=B$、$h_1=C$ を定数可逆行列とする。$v_1=A^{-1}v_0$ を満たすとき、$g'_{01}$ と $v'_0,v'_1$ を表し、変換後の整合条件を行列積で検算せよ。

<!-- solution-start -->
**詳細解答**。[GBG3 のsection変更](../GBG3/index.md#thm-gbg3-transition-change)から $g'_{01}=B^{-1}AC$。[本章の局所成分の変換則](#thm-gbg4-component-transformation)から $v'_0=B^{-1}v_0$、$v'_1=C^{-1}v_1=C^{-1}A^{-1}v_0$。逆行列の順序を反転させると
$$
(g'_{01})^{-1}v'_0
=(B^{-1}AC)^{-1}B^{-1}v_0
=C^{-1}A^{-1}BB^{-1}v_0
=C^{-1}A^{-1}v_0=v'_1.
$$
可換性を一度も使っていないので、行列群の場合にも成立する。
<!-- solution-end -->

<a id="ex-gbg4-b04"></a>
#### GBG4-B04 Hopf 主束の電荷の違い
- Level: B

Hopf 主 $U(1)$ 束で $s_z=s_wg_{wz}$、$g_{wz}=|t|/t$ とする。$t=-i$ で $q=1,-1,2$ のそれぞれについて $v_z$ を $v_w$ で表せ。$q=0$ の場合と何が異なるか述べよ。

<!-- solution-start -->
**詳細解答**。$t=-i$ は $|t|=1$ だから $g_{wz}=1/(-i)=i$。[変換定理](#thm-gbg4-component-transformation)より $v_z=\rho_q(g_{wz}^{-1})v_w=i^{-q}v_w$。したがって
$$
q=1:\ v_z=-iv_w,\qquad
q=-1:\ v_z=iv_w,\qquad
q=2:\ v_z=-v_w.
$$
$q=0$ ではどの $t$ に対しても $v_z=v_w$ である。特定の一点で $v_z\ne v_w$ という事実だけから非自明性は判定できないが、電荷表現ごとに局所変換が異なることは直接分かる。
<!-- solution-end -->

### Level C：商・切断・局所表示を往復する

<a id="ex-gbg4-c01"></a>
#### GBG4-C01 非可換な場の全工程
- Level: C

$M=\mathbb R$、$U_0=U_1=\mathbb R$、$G=GL(2,\mathbb R)$ の標準表現で、
$$
H(x)=\begin{pmatrix}1&x\\0&1\end{pmatrix},\qquad
g_{01}(x)=H(x),\qquad v_0(x)=\begin{pmatrix}x\\1\end{pmatrix}
$$
とする。次の各問を解け。

1. $g_{10},g_{00},g_{11}$ を定めてcocycle条件を確認し、$v_1$ を計算する。
2. このデータが結合束の大域切断を定めることを示す。$p=s_0(x)K$（$K\in GL(2,\mathbb R)$）での同変関数 $f(p)$ を与え、$f(pg)=g^{-1}f(p)$ を確認する。
3. $s'_0=s_0B$、$B(x)=\left(\begin{smallmatrix}1&0\\x&1\end{smallmatrix}\right)$、$s'_1=s_1$ に変更する。$g'_{01}$、$v'_0$、$v'_1$ を具体的に求め、変換後の貼り合わせ条件を検算する。

<!-- solution-start -->
**詳細解答**。

**第1問**。$H$ は $\det H=1$ だから可逆で、
$$
g_{10}=H^{-1}=\begin{pmatrix}1&-x\\0&1\end{pmatrix},
\qquad g_{00}=g_{11}=I.
$$
$g_{01}g_{10}=g_{10}g_{01}=I$ であり、二添字が $0,1$ だけなので三重重なりのすべての組合せはこの逆関係と単位関係に帰着する。局所成分は
$$
v_1=H^{-1}v_0
=\begin{pmatrix}1&-x\\0&1\end{pmatrix}
\begin{pmatrix}x\\1\end{pmatrix}
=\begin{pmatrix}0\\1\end{pmatrix}.
$$

**第2問**。両 $v_i$ は滑らかで $v_1=g_{01}^{-1}v_0$ を満たす。[局所成分の貼り合わせ](#prop-gbg4-local-section-gluing)より $\sigma(x)=[s_0(x),v_0(x)]=[s_1(x),v_1(x)]$ が一意に定まる。$p=s_0(x)K$ での同変関数は、[切断と同変関数の対応](#thm-gbg4-sections-equivariant)から
$$
f(p)=K^{-1}\begin{pmatrix}x\\1\end{pmatrix}.
$$
任意の $g\in GL(2,\mathbb R)$ に対して $pg=s_0(x)Kg$ だから
$$
f(pg)=(Kg)^{-1}v_0
=g^{-1}K^{-1}v_0=g^{-1}f(p).
$$
この関数から作る切断は $[p,f(p)]=[s_0,Kf(p)]=[s_0,v_0]$ で元の $\sigma$ に戻る。

**第3問**。$B$ は $\det B=1$ なので許される滑らかなsection変更である。[GBG3 の遷移変換](../GBG3/index.md#thm-gbg3-transition-change)から $g'_{01}=B^{-1}H$、ここで
$$
B^{-1}=\begin{pmatrix}1&0\\-x&1\end{pmatrix},
\qquad
g'_{01}=\begin{pmatrix}1&x\\-x&1-x^2\end{pmatrix}.
$$
局所成分は
$$
v'_0=B^{-1}v_0
=\begin{pmatrix}x\\1-x^2\end{pmatrix},
\qquad
v'_1=v_1=\begin{pmatrix}0\\1\end{pmatrix}.
$$
直接掛け算すると
$$
g'_{01}v'_1
=\begin{pmatrix}1&x\\-x&1-x^2\end{pmatrix}
\begin{pmatrix}0\\1\end{pmatrix}
=\begin{pmatrix}x\\1-x^2\end{pmatrix}=v'_0.
$$
$\det g'_{01}=1(1-x^2)-x(-x)=1$ で可逆だから、左から $(g'_{01})^{-1}$ を掛ければ $v'_1=(g'_{01})^{-1}v'_0$。section変更後にも同じ大域切断が表される。
<!-- solution-end -->

## 7. 次章へ

主束の右作用、表現の左作用、結合束での同値関係を正しく合わせると、物質場は結合束の切断として大域的に定義できる。その局所成分は $v_j=\rho(g_{ij}^{-1})v_i$ に従う。同じ切断を異なる局所sectionで表示しても、切断そのものは変わらない。

次の GBG5 では**主束そのものの自己同型**を考える。単なる局所sectionの取り替えとの違いを明確にし、ゲージ変換群がどの対象に作用するかを調べる。
