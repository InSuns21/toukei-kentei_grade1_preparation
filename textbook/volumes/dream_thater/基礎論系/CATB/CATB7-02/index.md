# CATB7-02 鎖ホモトピー・シフト・写像錐

## 1. 複体の射をどこまで区別するか

前講の[コホモロジーの関手性](../CATB7-01/index.md#thm-catb7-01-cohomology-functor)では、余鎖写像から各次数のコホモロジー上の射を作った。例えば次数0,1に整数の二項複体 $\mathbb Z\xrightarrow{2}\mathbb Z$ を置くと、恒等写像と3倍写像は異なるが、次数1の商 $\mathbb Z/2\mathbb Z$ 上では同じ写像になる。差の2倍写像が微分を経由するからである。この差を複体全体で記述し、さらに複体間の写像そのものを新しい複体に組み込む方法を学ぶ。

以下、局所小な[アーベル圏](../CATB1-04/index.md#def-catb1-04-abelian-category) $\mathcal A$ で考える。第2、3節のコホモロジーを使わない構成は加法圏でもできる。余鎖次数は整数で、微分 $d_C^n:C^n\to C^{n+1}$ は次数を1増やす。合成は右から左へ行う。

双積への射を列、双積からの射を行、双積間の射を行列で表すのは[双積の射の行列表示](../CATB1-03/index.md#thm-catb1-03-matrix)による。可換群の例では $\mathbb Z$ 加群の圏を使い、零対象を $0$ と記す。

## 2. 差を微分で説明する

二つの余鎖写像の差を、微分の前後に次数を1下げる射を挟んだ和として表したい。次数を下げる射の族をホモトピーと呼ぶ。連続写像の連続変形とは異なり、ここでは以下の代数的等式が定義である。

<a id="def-catb7-02-cochain-homotopy"></a>

<!-- formal-statement-start -->
> **定義（余鎖ホモトピー）**
>
> 加法圏の余鎖複体 $C^\bullet,D^\bullet$ と平行な余鎖写像 $f,g:C^\bullet\to D^\bullet$ を取る。射の族 $h^n:C^n\to D^{n-1}$ が全整数 $n$ で

$$
f^n-g^n=d_D^{n-1}h^n+h^{n+1}d_C^n
$$

> を満たすとき、$h$ を $f$ と $g$ の余鎖ホモトピー（鎖ホモトピー）といい、$f\simeq g$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb7-02-cochain-homotopy -->
**定義の確認**。冒頭の二項複体を $C=D$ とし、$f$ を3倍、$g$ を恒等射とする。どちらも微分の2倍写像と可換である。$h^1:\mathbb Z\to\mathbb Z$ を恒等射とし、他の $h^n$ を零とする。

次数0では $d^{-1}h^0+h^1d^0=0+2$、次数1では $d^0h^1+h^2d^1=2+0$。他の次数では両辺が零になる。したがって全次数で差 $3-1=2$ を説明できる。
<!-- definition-example-end -->

この等式の二項は、いずれも $C^n$ から $D^n$ への射である。次の結果によって、コホモロジーがホモトピーで変わらないことと、ホモトピーを射の同一視に使えることが分かる。

<a id="thm-catb7-02-homotopy-invariance"></a>

<!-- formal-statement-start -->
> **定理（余鎖ホモトピーの同値性とコホモロジー不変性）**
>
> 加法圏の余鎖複体間の平行な余鎖写像について $\simeq$ は同値関係であり、前後からの余鎖写像の合成と和に両立する。さらに圏がアーベル圏なら、$f\simeq g$ のとき全整数 $n$ で

$$
H^n(f)=H^n(g).
$$
<!-- formal-statement-end -->

見取り図：ホモトピーの零・符号反転・和が同値関係を作る。核に制限すると右辺の第2項が消え、第1項は微分の像に入るので、商に移すと差が零になる。

<!-- proof-start -->
### 証明

$f-f=0$ は零の族、$g-f=-(f-g)$ は $-h$、$f-k=(f-g)+(g-k)$ は対応する二つの族の和で表される。これで反射性・対称性・推移性が成立する。二組のホモトピーの和も定義の等式を成分ごとに加えれば和の写像を結ぶ。

余鎖写像 $u:B^\bullet\to C^\bullet$、$v:D^\bullet\to E^\bullet$ を取る。$vfu-vgu$ の次数 $n$ での差は

$$
\begin{aligned}
v^n(f^n-g^n)u^n
&=v^nd_D^{n-1}h^nu^n+v^nh^{n+1}d_C^nu^n\\
&=d_E^{n-1}v^{n-1}h^nu^n
+v^nh^{n+1}u^{n+1}d_B^n.
\end{aligned}
$$

第2の等号は両方の[余鎖写像の条件](../CATB7-01/index.md#def-catb7-01-cochain-map)を用いた。よって $v^{n-1}h^nu^n$ が必要なホモトピーである。

次に $k_C^n:Z_C^n\to C^n$ を微分の核、$q_C^n:Z_C^n\to H^n(C)$ をコホモロジーへの余核射とし、$D$ でも同じ記法を用いる。[コホモロジーの関手性](../CATB7-01/index.md#thm-catb7-01-cohomology-functor)で得る核上の誘導射を $z_f,z_g$ と書くと、

$$
k_D^n(z_f-z_g)=(f^n-g^n)k_C^n
=d_D^{n-1}h^nk_C^n.
$$

ここで $d_C^nk_C^n=0$ を使った。前講の[コホモロジーの構成](../CATB7-01/index.md#def-catb7-01-cohomology)に従い、$d_D^{n-1}=k_D^nj_D^ne_D^{n-1}$ と像を経由して分解する。核射 $k_D^n$ を左から消去して

$$
z_f-z_g=j_D^ne_D^{n-1}h^nk_C^n.
$$

$q_D^nj_D^n=0$ なので $q_D^n(z_f-z_g)=0$。誘導射の特徴づけより

$$
(H^n(f)-H^n(g))q_C^n=0.
$$

余核射 $q_C^n$ はエピ射だから消去でき、結論が従う。
<!-- proof-end -->

### 2.1 恒等写像まで消える場合

複体が零対象だけからできていなくても、恒等写像が零写像とホモトピーで結ばれる場合がある。この場合には、複体の情報をホモトピーの意味で全て消すことができる。

<a id="def-catb7-02-contractible"></a>

<!-- formal-statement-start -->
> **定義（可縮余鎖複体）**
>
> 加法圏の余鎖複体 $C^\bullet$ が可縮であるとは、$1_C\simeq0$ となること、すなわち全整数 $n$ に対して $s^n:C^n\to C^{n-1}$ があり、

$$
d_C^{n-1}s^n+s^{n+1}d_C^n=1_{C^n}
$$

> が成立することである。この族を縮約と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb7-02-contractible -->
**定義の確認**。次数0,1に $\mathbb Z\xrightarrow{1}\mathbb Z$ を置き、他は零とする。$s^1=1_{\mathbb Z}$、他は零なら次数0で $s^1d^0=1$、次数1で $d^0s^1=1$ であり、残る次数では零対象の恒等射も零射である。したがって対象自体は非零だが可縮である。
<!-- definition-example-end -->

[コホモロジー不変性](#thm-catb7-02-homotopy-invariance)を $1_C$ と零写像に適用すると $1_{H^n(C)}=0$ となる。この対象への任意の射もこの対象からの任意の射も恒等射との合成により零になるから、$H^n(C)$ は零対象である。全次数のコホモロジーが零対象である複体を非輪状複体（acyclic complex）という。

逆は一般に成り立たない。次数0,1,2の複体

$$
\mathbb Z\xrightarrow{2}\mathbb Z\xrightarrow{p}\mathbb Z/2\mathbb Z
$$

を考える。$p(x)=[x]_2$ とする。合成は零、左端の微分は単射、中央の核は $2\mathbb Z$ で前の微分の像に一致する、右端への微分は全射である。[完全性とコホモロジーの消滅](../CATB7-01/index.md#thm-catb7-01-exact-cohomology)より全次数のコホモロジーが零になる。

しかし縮約が存在すれば次数2で $ps^2=1_{\mathbb Z/2\mathbb Z}$。任意の群準同型 $s^2:\mathbb Z/2\mathbb Z\to\mathbb Z$ について $2s^2([1]_2)=s^2([0]_2)=0$、従って $s^2([1]_2)=0$ となるので $ps^2$ は恒等射にならない。完全性は前の微分の像が次の微分の核に一致することを保証するが、微分を戻る射を選べることまでは保証しない。

## 3. 次数をずらし、写像を複体に組み込む

複体を1次数ずらすと、元の次数 $n+1$ が新しい次数 $n$ になる。単に対象をずらすだけでなく微分の符号も反転させる。この選択は後で二つの微分の交差項を相殺するために必要になる。

<a id="def-catb7-02-shift"></a>

<!-- formal-statement-start -->
> **定義（余鎖複体のシフト）**
>
> 加法圏の余鎖複体 $C^\bullet$ と整数 $r$ に対し、シフト $C[r]$ を

$$
C[r]^n=C^{n+r},\qquad d_{C[r]}^n=(-1)^r d_C^{n+r}
$$

> で定める。余鎖写像 $f:C^\bullet\to D^\bullet$ に対しては $f[r]^n=f^{n+r}$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb7-02-shift -->
**定義の確認**。次数0,1に $\mathbb Z\xrightarrow{3}\mathbb Z$ を置いた $C$ の $C[1]$ は次数 $-1,0$ に $\mathbb Z\xrightarrow{-3}\mathbb Z$ を置いた複体である。微分の始域と終域は新しい隣接次数に一致し、連続する二つの微分の一方は必ず零なので合成は零。

元の複体の2倍自己写像をシフトした場合も $(-3)2=2(-3)$ である。$C[-1]$ は次数1,2に同じ $-3$ を置いたものになる。
<!-- definition-example-end -->

一般にも

$$
d_{C[r]}^{n+1}d_{C[r]}^n
=(-1)^{2r}d_C^{n+r+1}d_C^{n+r}=0
$$

なので複体である。余鎖写像の条件の両辺に $(-1)^r$ を掛ければ $f[r]$ の条件が成立する。$C[r][s]^n=C^{n+s+r}$ で、微分の係数は $(-1)^s(-1)^r=(-1)^{r+s}$。したがって $C[r][s]=C[r+s]$ である。

アーベル圏では微分の符号を反転しても同じ核射を選べる。実際、任意の射 $t:T\to C^{n+r}$ について $d_C^{n+r}t=0$ と $(-1)^r d_C^{n+r}t=0$ は同値なので、[核の普遍性](../CATB1-04/index.md#def-catb1-04-kernel)を同じ射が満たす。

像の包含も同じものを選べる。[像と余像の比較同型](../CATB1-05/index.md#thm-catb1-05-image-coimage)による分解 $d=me$ に対し、符号を変えた射は $(-1)^r d=m((-1)^r e)$ と分解する。$(-1)^r e$ はエピ射だから、同じモノ射 $m$ が像の包含になる。[コホモロジーの構成](../CATB7-01/index.md#def-catb7-01-cohomology)で同じ核・像・余核を選べば

$$
H^n(C[r])\cong H^{n+r}(C)
$$

となる。先ほどの $C[1]$ では $H^{-1}=0$、$H^0=\mathbb Z/3\mathbb Z$ である。

### 3.1 写像の情報を一つの微分にする

余鎖写像 $f:C^\bullet\to D^\bullet$ を取る。$D^n$ と $C^{n+1}$ を並べれば、$f^{n+1}:C^{n+1}\to D^{n+1}$ を新しい微分の交差成分として使える。$C$ 側にシフトの負号を入れると、次の微分を掛けたときに $f$ を通る二つの経路が打ち消し合う。この二つの経路を相殺する構成を次のように定義する。

<a id="def-catb7-02-cone"></a>

<!-- formal-statement-start -->
> **定義（写像錐）**
>
> 加法圏の余鎖写像 $f:C^\bullet\to D^\bullet$ に対し、写像錐 $\operatorname{Cone}(f)$ を次の対象と微分で定める。

$$
\begin{gathered}
\operatorname{Cone}(f)^n=D^n\oplus C^{n+1},\\
d_{\operatorname{Cone}(f)}^n=
\begin{pmatrix}
d_D^n&f^{n+1}\\
0&-d_C^{n+1}
\end{pmatrix}.
\end{gathered}
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb7-02-cone -->
**定義の確認**。$C,D$ をともに次数0の整数だけからなる複体とし、$f^0$ を5倍とする。微分が零なので $f$ は余鎖写像である。

双積の非零成分は次数 $-1$ の $C^0$ と次数0の $D^0$ だけであり、微分は交差成分 $f^0$ により $\mathbb Z\xrightarrow{5}\mathbb Z$ になる。隣接する二微分の合成は零。従って $H^{-1}=0$、$H^0=\mathbb Z/5\mathbb Z$ である。写像錐は5倍写像が全射でないことを商として記録している。
<!-- definition-example-end -->

<a id="prop-catb7-02-cone-complex"></a>

<!-- formal-statement-start -->
> **命題（写像錐の複体条件と短完全列）**
>
> 加法圏の余鎖写像 $f:C^\bullet\to D^\bullet$ の写像錐の微分の二乗は零である。さらに圏がアーベル圏なら、包含 $i^n=(1,0)^{\mathsf T}$ と射影 $p^n=(0,1)$ は余鎖写像をなし、各次数で短完全な列

$$
0\to D^\bullet\xrightarrow{i}\operatorname{Cone}(f)
\xrightarrow{p}C[1]\to0
$$

> を与える。
<!-- formal-statement-end -->

見取り図：行列積の右上は余鎖写像の条件の差となる。残りの対角成分は元の複体の微分の二乗である。

<!-- proof-start -->
### 証明

[双積の射の行列表示](../CATB1-03/index.md#thm-catb1-03-matrix)に従い、二つの微分を合成する。

$$
\begin{aligned}
d_{\operatorname{Cone}(f)}^{n+1}d_{\operatorname{Cone}(f)}^n
&=\begin{pmatrix}
d_D^{n+1}d_D^n&d_D^{n+1}f^{n+1}-f^{n+2}d_C^{n+1}\\
0&d_C^{n+2}d_C^{n+1}
\end{pmatrix}\\
&=\begin{pmatrix}0&0\\0&0\end{pmatrix}.
\end{aligned}
$$

右上が零なのは次数 $n+1$ での[余鎖写像条件](../CATB7-01/index.md#def-catb7-01-cochain-map)による。負号を入れなければ差ではなく和となり、例えば整数加群で $f=1$、微分が2倍の二項複体の場合には右上が4倍になってしまう。

包含と射影については

$$
d_{\operatorname{Cone}(f)}^ni^n=\binom{d_D^n}{0}
=i^{n+1}d_D^n,
$$

$$
p^{n+1}d_{\operatorname{Cone}(f)}^n=(0,-d_C^{n+1})
=d_{C[1]}^np^n.
$$

各次数で $pi=0$、$i$ は左逆を持ち、$p$ は右逆を持つ。$pt=0$ なら双積の分解により $t=i\pi_D t$ と一意に書けるので $i$ は $p$ の核である。

第2成分の包含を $j_C:C^{n+1}\to\operatorname{Cone}(f)^n$ とする。$wi=0$ なら $w=w j_Cp$ と一意に書けるので $p$ は $i$ の余核である。[短完全列の特徴づけ](../CATB1-05/index.md#thm-catb1-05-short-exact-test)から各次数で短完全となる。
<!-- proof-end -->

## 4. 短完全な複体の列をコホモロジーで読む

写像錐の列のように、各次数では短完全でも、そのままコホモロジーを取った三項列が短完全になるとは限らない。右端のコサイクル（微分で零になる情報）を中央へ持ち上げて微分すると左端に戻ることに注目する。これにより一つ上の次数への射を作れる。

<a id="thm-catb7-02-long-exact"></a>

<!-- formal-statement-start -->
> **定理（余鎖複体のコホモロジー長完全列）**
>
> アーベル圏で余鎖写像 $i:A^\bullet\to B^\bullet$、$p:B^\bullet\to C^\bullet$ があり、各整数 $n$ で

$$
0\to A^n\xrightarrow{i^n}B^n\xrightarrow{p^n}C^n\to0
$$

> が短完全であるとする。このときコホモロジー対象間の射 $\delta^n:H^n(C)\to H^{n+1}(A)$ が存在し、次のように次数をまたぐ列は全ての位置で完全である。

$$
\begin{gathered}
\cdots\to H^n(A)\xrightarrow{H^n(i)}H^n(B)
\xrightarrow{H^n(p)}H^n(C)\\
\xrightarrow{\delta^n}H^{n+1}(A)
\xrightarrow{H^{n+1}(i)}H^{n+1}(B)\to\cdots.
\end{gathered}
$$

> $\delta^n$ は以下の持ち上げ条件で一意に特徴づけられる。$T$ を任意の対象とし、$b:T\to B^n$、$z:T\to Z_C^n$ が $p^nb=k_C^nz$ を満たし、$i^{n+1}a=d_B^nb$ となる $a:T\to A^{n+1}$ を取る。すると $a=k_A^{n+1}w$ と一意に因子化でき、

$$
\delta^n q_C^n z=q_A^{n+1}w
$$

> が成立する。ここで $k_X^m:Z_X^m\to X^m$ は微分の核、$q_X^m:Z_X^m\to H^m(X)$ はコホモロジーへの余核射である。
<!-- formal-statement-end -->

見取り図：可換群なら $[c]$ を $\delta^n([c])=[a]$ に送る。$p(b)=c$ として $i(a)=db$ と解く。持ち上げ $b$ を変えても $a$ の差は左端の微分の像であり、$c$ を微分の像だけ変えても結果は変わらない。一般のアーベル圏では元の代わりに任意の対象からの射を使い、エピ射に沿って変域を取り替える。完全性はこの持ち上げを逆方向にも行って示す。

<!-- proof-start -->
### 証明

記号を簡潔にするため、型から次数が決まる場合は微分・包含・射影の上付き添字を省く。$k_X,q_X$ は上の核射・余核射である。

前講の[コホモロジーの構成](../CATB7-01/index.md#def-catb7-01-cohomology)では $d_X^{m-1}=k_X^mj_X^me_X^{m-1}$、$j_X^m$ はモノ射、$e_X^{m-1}$ はエピ射、$q_X^m$ は $j_X^m$ の余核であった。アーベル圏では $j_X^m$ は自分の余核の核である（[正規射の核・余核による復元](../CATB1-04/index.md#prop-catb1-04-normal-recovery)）。

**持ち上げの約束。** [エピ射に沿う持ち上げ](../CATB1-06/index.md#lem-catb1-06-epi-lift)により、エピ射 $e:U\to V$ と射 $v:T\to V$ に対し、あるエピ射 $s:S\to T$ の後で $eu=vs$ となる $u:S\to U$ を選べる。何度か変域を取り替える場合は、それまでの全ての射を新しいエピ射と合成する。エピ射の合成もエピ射である。以下「局所的に」とはこの操作を指す。

特に $q_Xz=0$ なら $z=j_Xt$ と因子化し、$e_X$ に沿い局所的に $k_Xz=d_Xu$ と書ける。逆に $k_Xz=d_Xu$ なら $k_X$ の消去と $q_Xj_X=0$ によって $q_Xz=0$。この二つを以下で繰り返し使う。

**接続射の存在。** $p^n$ と $k_C^n$ の引き戻し $P$ を取り、射を $b:P\to B^n$、$s:P\to Z_C^n$ とする。$p^nb=k_C^ns$ で $s$ はエピ射である。

$$
p^{n+1}d_B^nb=d_C^np^nb=d_C^nk_C^ns=0.
$$

短完全性より $i^{n+1}$ は $p^{n+1}$ の核なので $i^{n+1}a=d_B^nb$ となる $a:P\to A^{n+1}$ が一意に存在する。さらに

$$
i^{n+2}d_A^{n+1}a=d_B^{n+1}i^{n+1}a
=d_B^{n+1}d_B^nb=0.
$$

$i^{n+2}$ はモノ射なので $d_A^{n+1}a=0$、従って $a=k_A^{n+1}w$ と一意に因子化する。

$s$ の核射を $l:L\to P$ とすると $p^nbl=k_C^nsl=0$。よって $bl=i^nu$ となる $u:L\to A^n$ がある。微分して $i^{n+1}al=i^{n+1}d_A^nu$、従って $k_A^{n+1}wl=d_A^nu$。上の約束から $q_A^{n+1}wl=0$。エピ射 $s$ はその核の余核なので、唯一の $\theta:Z_C^n\to H^{n+1}(A)$ が $\theta s=q_A^{n+1}w$ を満たす。

引き戻しの普遍性により、任意の両立する $b',z'$ は $P$ への射を経由する。従って同じ特徴式 $\theta z'=q_A^{n+1}w'$ が成り立つ。

次に $\theta j_C^n=0$ を示す。$p^{n-1}$ に沿って $1_{C^{n-1}}$ を局所的に持ち上げ、エピ射 $t:S\to C^{n-1}$ と $u:S\to B^{n-1}$ で $p^{n-1}u=t$ とする。$b'=d_B^{n-1}u$、$z'=j_C^ne_C^{n-1}t$ と置くと

$$
p^nb'=d_C^{n-1}t=k_C^nz',
\qquad d_B^nb'=0.
$$

よって $w'=0$、従って $\theta j_C^ne_C^{n-1}t=0$。二つのエピ射を消去して $\theta j_C^n=0$。余核 $q_C^n$ の普遍性から唯一の $\delta^n$ が $\delta^nq_C^n=\theta$ を満たす。これで所望の特徴式が成立し、$s$ と $q_C^n$ がエピ射なので一意性も従う。

**隣接する二射の合成が零であること。** $H^n(p)H^n(i)=0$ は $pi=0$ と[コホモロジーの関手性](../CATB7-01/index.md#thm-catb7-01-cohomology-functor)から従う。

中央の核射 $k_B^n$ を持ち上げに使うと $d_B^nk_B^n=0$ なので $\delta^n H^n(p)q_B^n=0$。$q_B^n$ を消去すれば $\delta^n H^n(p)=0$。

最後に、引き戻し上で $i^{n+1}k_A^{n+1}w=d_B^nb$ は微分の像を経由するから $H^{n+1}(i)q_A^{n+1}w=0$。従って $H^{n+1}(i)\delta^n q_C^ns=0$ であり、二つのエピ射を消去して最後の合成も零となる。

**完全性の逆向き。** [持ち上げによる完全性の判定](../CATB1-06/index.md#prop-catb1-06-local-exactness)を三箇所に適用する。各場合で任意の射 $y:T\to H$ が次の射により零になると仮定する。$q$ はエピ射なので局所的にコサイクルの射で代表できる。

以下、変域のエピ射による取り替えをその都度行い、取り替え後も記号 $y,b,c,a$ を使う。最後に得た等式は元の $y$ と合成エピ射の積に対する等式となる。

- $H^n(B)$ で：$y=q_Bz_B$、$b=k_Bz_B$ と代表する。$H^n(p)y=0$ より $pb$ は局所的に $d_C^{n-1}c_0$ と書ける。$c_0$ を $p^{n-1}$ に沿って局所的に持ち上げ $p b_0=c_0$ とする。すると

  $$
  p(b-db_0)=0,\qquad b-db_0=ia
  $$

  と一意に書ける。さらに

  $$
  i\,da=d(b-db_0)=0
  $$

  なので $da=0$。$a=k_Az_A$ とすれば $H^n(i)q_Az_A=y$ である。実際、$b$ との差は微分の像なので商上で消える。
- $H^n(C)$ で：$y=q_Cz_C$、$c=k_Cz_C$ と代表し、局所的に $pb=c$ を満たす $b$ を取る。上の構成で $db=ia$、$a=k_Aw$ となる。$\delta^ny=0$ より $q_Aw=0$、従って局所的に $a=da_0$ と書ける。すると $d(b-ia_0)=db-i\,da_0=0$、かつ $p(b-ia_0)=c$。$b-ia_0=k_Bz_B$ と書けば $H^n(p)q_Bz_B=y$。
- $H^{n+1}(A)$ で：$y=q_Az_A$、$a=k_Az_A$ と代表する。$H^{n+1}(i)y=0$ より局所的に $ia=db$ と書ける（$b$ の次数は $n$）。$d_C(pb)=p\,db=pi a=0$ なので $pb=k_Cz_C$ と書ける。接続射の特徴式にこの $b,z_C,a$ を代入して $\delta^nq_Cz_C=q_Az_A=y$ を得る。

各場合で判定命題の持ち上げ条件を満たした。$n$ は任意なので全ての位置で完全である。
<!-- proof-end -->

### 4.1 接続射が非零になる例

各次数で短完全な列でも、接続射が零とは限らない。次の三つの複体を取る。

$$
A=(0\to\mathbb Z),\quad
B=(\mathbb Z\xrightarrow{2}\mathbb Z),\quad
C=(\mathbb Z\to0).
$$

いずれも次数0,1に置く。$i$ は次数1の恒等射と次数0の零射、$p$ は次数0の恒等射と次数1の零射である。次数0では $0\to0\to\mathbb Z\xrightarrow{1}\mathbb Z\to0$、次数1では $0\to\mathbb Z\xrightarrow{1}\mathbb Z\to0\to0$ となり短完全。余鎖写像条件も $d_B i^0=0=i^1 d_A$ および $p^1d_B=0=d_Cp^0$ である。

$H^0(C)=\mathbb Z$、$H^1(A)=\mathbb Z$。$c=x$ を中央へ持ち上げるには $b=x$ とすればよく、$d_Bb=2x=i^1(2x)$。したがって[長完全列の接続射](#thm-catb7-02-long-exact)は $\delta^0(x)=2x$ となる。関係する部分は

$$
0\to\mathbb Z\xrightarrow{2}\mathbb Z
\to\mathbb Z/2\mathbb Z\to0
$$

である。$H^1(A)\to H^1(B)$ は剰余類への射であり、核 $2\mathbb Z$ と接続射の像が一致する。

### 4.2 写像錐への適用

[写像錐の短完全列](#prop-catb7-02-cone-complex)に[コホモロジー長完全列](#thm-catb7-02-long-exact)を適用すると、シフトのコホモロジーを読み替えて

$$
\cdots\to H^n(C)\xrightarrow{H^n(f)}H^n(D)
\to H^n(\operatorname{Cone}(f))
\to H^{n+1}(C)\xrightarrow{H^{n+1}(f)}H^{n+1}(D)\to\cdots
$$

を得る。接続射の符号を確認する。$k_C^{n+1}:Z_C^{n+1}\to C^{n+1}$ を射影へ持ち上げる射は $(0,k_C^{n+1})^{\mathsf T}$ である。写像錐の微分を合成すると

$$
d_{\operatorname{Cone}(f)}^n\binom{0}{k_C^{n+1}}
=\binom{f^{n+1}k_C^{n+1}}{-d_C^{n+1}k_C^{n+1}}
=\binom{f^{n+1}k_C^{n+1}}{0}.
$$

第1成分は $D$ のコサイクルを通じて因子化する。接続射の特徴式と[コホモロジーの関手性](../CATB7-01/index.md#thm-catb7-01-cohomology-functor)から、余核射を消去すると接続射は $H^{n+1}(f)$ に一致する。次講でこの列を用いて写像の同型性を比較する。

## 5. 演習

### CATB7-02-A01 ホモトピーの計算

- Level: A

次数0,1に $\mathbb Z\xrightarrow{4}\mathbb Z$ を置く。9倍写像と恒等写像の余鎖ホモトピーを一つ求めよ。

<!-- solution-start -->
いずれも4倍微分と可換である。差は8倍なので $h^1$ を2倍、他を零とする。[余鎖ホモトピーの定義](#def-catb7-02-cochain-homotopy)の右辺は次数0で $h^1d^0=2\cdot4=8$、次数1で $d^0h^1=4\cdot2=8$。その他の次数では零である。よって求める族となる。コホモロジー上でも次数1では $[9x]_4=[x]_4$ である。
<!-- solution-end -->

### CATB7-02-A02 負のシフト

- Level: A

次数0,1に $\mathbb Z\xrightarrow{6}\mathbb Z$ を置く複体 $C$ について $C[-1]$ の非零対象・微分・コホモロジーを求めよ。

<!-- solution-start -->
[余鎖複体のシフト](#def-catb7-02-shift)に $r=-1$ を代入する。$C[-1]^n=C^{n-1}$ が非零となるのは $n-1=0,1$、すなわち $n=1,2$ である。微分は $(-1)^{-1}6=-6$ 倍。核は次数1で零、次数2で整数全体であり、前の微分の像は $(-6)\mathbb Z=6\mathbb Z$。従って $H^1=0$、$H^2=\mathbb Z/6\mathbb Z$、他は零。
<!-- solution-end -->

### CATB7-02-A03 二項の写像錐

- Level: A

$C,D$ が次数0のみで $\mathbb Z$ を持ち、$f^0$ が7倍のとき、写像錐の非零次数とコホモロジーを求めよ。

<!-- solution-start -->
[写像錐の定義](#def-catb7-02-cone)より次数 $-1$ は $0\oplus\mathbb Z$、次数0は $\mathbb Z\oplus0$。交差成分 $f^0$ が7倍なので二項複体 $\mathbb Z\xrightarrow{7}\mathbb Z$ となる。7倍の核は零、像は $7\mathbb Z$ であり、次の微分は零。従って $H^{-1}=0$、$H^0=\mathbb Z/7\mathbb Z$、残る次数は零である。
<!-- solution-end -->

### CATB7-02-A04 縮約の存在

- Level: A

次数2,3に $\mathbb Z\xrightarrow{-1}\mathbb Z$ を置いた複体が可縮であることを示せ。

<!-- solution-start -->
[可縮余鎖複体の定義](#def-catb7-02-contractible)に従い $s^3$ を $-1$ 倍、他を零とする。次数2で $s^3d^2=(-1)(-1)=1$、次数3で $d^2s^3=(-1)(-1)=1$。他の次数は零対象で、恒等射も零だから等式が成立する。ゆえに可縮である。
<!-- solution-end -->

### CATB7-02-B01 同じコホモロジーの射を与える条件

- Level: B

正整数 $m$ に対し次数0,1の複体 $\mathbb Z\xrightarrow{m}\mathbb Z$ を考える。両次数の $a$ 倍写像と $b$ 倍写像がホモトピーで結ばれる条件を求め、コホモロジー上の射が一致する条件と比較せよ。

<!-- solution-start -->
整数加群の自己射は $1$ の像で決まり整数倍である。次数を1下げる射のうち $h^1$ だけが非零になり得るので、これを $t$ 倍と置く。[余鎖ホモトピーの定義](#def-catb7-02-cochain-homotopy)の両次数の条件は

$$
a-b=tm=mt.
$$

従って $m$ が $a-b$ を割ることが必要十分であり、そのとき $t=(a-b)/m$ を選べる。

コホモロジーは次数1の $\mathbb Z/m\mathbb Z$ 以外で零。次数1で両誘導射が一致するなら $[1]_m$ の像から $[a]_m=[b]_m$、すなわち $m\mid(a-b)$ が必要である。逆にその条件なら全ての整数 $x$ に対して $(a-b)x$ が $m$ の倍数なので一致する。この例では二条件が同値であるが、一般の複体について逆向きの主張はできない。B03で具体的な反例を確認する。
<!-- solution-end -->

### CATB7-02-B02 恒等写像の錐

- Level: B

任意の加法圏の余鎖複体 $C$ に対し、$\operatorname{Cone}(1_C)$ が可縮であることを、双積の行列を用いて示せ。

<!-- solution-start -->
$E=\operatorname{Cone}(1_C)$ と置く。[写像錐](#def-catb7-02-cone)より $E^n=C^n\oplus C^{n+1}$。$s^n:E^n\to E^{n-1}=C^{n-1}\oplus C^n$ を

$$
s^n=\begin{pmatrix}0&0\\1_{C^n}&0\end{pmatrix}
$$

と定める。各成分は表示した始域・終域を持つ。[双積の射の行列表示](../CATB1-03/index.md#thm-catb1-03-matrix)を使って、

$$
d_E^{n-1}s^n=
\begin{pmatrix}1&0\\-d_C^n&0\end{pmatrix},
\qquad
s^{n+1}d_E^n=
\begin{pmatrix}0&0\\d_C^n&1\end{pmatrix}.
$$

両者の和は $E^n$ の恒等射である。[可縮余鎖複体](#def-catb7-02-contractible)の条件を全次数で満たす。
<!-- solution-end -->

### CATB7-02-B03 完全性と可縮性

- Level: B

整数 $m\ge2$ について次数0,1,2の複体 $\mathbb Z\xrightarrow{m}\mathbb Z\xrightarrow{\bmod m}\mathbb Z/m\mathbb Z$ はコホモロジーが全て零だが可縮でないことを示せ。

<!-- solution-start -->
合成は $[mx]_m=0$。次数0の核は零、次数1の核は $m\mathbb Z$ で前の微分の像に一致する、次数2の像は全体である。よって[完全性とコホモロジーの消滅](../CATB7-01/index.md#thm-catb7-01-exact-cohomology)から全次数で零である。

もし縮約 $s$ が存在したら次数2で $p s^2=1$。しかし $s^2$ の値 $s^2([1]_m)$ は整数であり、$m s^2([1]_m)=s^2([0]_m)=0$ なので零。よって $p s^2([1]_m)=0\ne[1]_m$ となり矛盾する。

さらにこの複体の恒等射と零射は全コホモロジーで同じ射を誘導するにもかかわらずホモトピーで結ばれない。
<!-- solution-end -->

### CATB7-02-B04 剰余類からの接続射

- Level: B

整数 $m\ge2$ とし、次数0,1に $A=(\mathbb Z\xrightarrow{m}\mathbb Z)$、$B=(\mathbb Z\xrightarrow{1}\mathbb Z)$、$C=(\mathbb Z/m\mathbb Z\to0)$ を置く。

$i^0$ は $m$ 倍、$i^1$ は恒等射、$p^0$ は剰余射、$p^1$ は零射とする。各次数で短完全な余鎖写像の列であることを確認し、接続射を求めよ。代表元を変えても結果が変わらないことを具体的に示せ。

<!-- solution-start -->
次数0では $i^0$ が単射、像が $m\mathbb Z$ で $p^0$ の核に一致し、$p^0$ が全射である。次数1では $0\to\mathbb Z\xrightarrow{1}\mathbb Z\to0\to0$ なので短完全。その他は零対象である。

[余鎖写像の条件](../CATB7-01/index.md#def-catb7-01-cochain-map)は $d_B^0i^0(x)=mx=i^1d_A^0(x)$ と $p^1d_B^0(x)=0=d_C^0p^0(x)$ から成立する。

[コホモロジーの構成](../CATB7-01/index.md#def-catb7-01-cohomology)によれば $H^1(A)=\mathbb Z/m\mathbb Z$、$H^0(C)=\mathbb Z/m\mathbb Z$ であり、それ以外は全て零である。実際、$A$ の微分は単射で像が $m\mathbb Z$、$B$ の微分は恒等射なので核は零かつ像は全体、$C$ は次数0にしか対象がない。

[長完全列の接続射](#thm-catb7-02-long-exact)の特徴式に従って $[x]_m$ を $b=x$ に持ち上げる。$d_B^0 b=x=i^1(x)$ なので $a=x$、$H^1(A)$ の類は $[x]_m$ となる。

別の持ち上げは $b'=x+mt$ と書け、そのとき $d_B^0 b'=x+mt=i^1(x+mt)$ なので $a'=x+mt$。$a'-a=mt=d_A^0(t)$ は左の微分の像に入る。従って $[a']_m=[a]_m$ である。

結論は $\delta^0([x]_m)=[x]_m$、すなわち同型である。長完全列の非零部分は

$$
0\to\mathbb Z/m\mathbb Z\xrightarrow{1}\mathbb Z/m\mathbb Z\to0
$$

となり、恒等射の核は零、像は全体だから両位置で完全である。
<!-- solution-end -->

### CATB7-02-C01 ホモトピーが錐を変えるか

- Level: C

加法圏の余鎖写像 $f,g:C^\bullet\to D^\bullet$ が $f-g=d_Dh+hd_C$ を満たすとする。各次数で $F^n:\operatorname{Cone}(f)^n\to\operatorname{Cone}(g)^n$ を

$$
F^n=\begin{pmatrix}1&h^{n+1}\\0&1\end{pmatrix}
$$

と定める。余鎖写像条件を検証し、逆射を構成せよ。さらにアーベル圏の場合に二つの錐のコホモロジーを比較せよ。

<!-- solution-start -->
$h^{n+1}:C^{n+1}\to D^n$ なので $F^n$ の右上の型は正しい。[写像錐の定義](#def-catb7-02-cone)を使い、それぞれの順で掛けると、

$$
d_{\operatorname{Cone}(g)}^nF^n
=\begin{pmatrix}
d_D^n&d_D^nh^{n+1}+g^{n+1}\\
0&-d_C^{n+1}
\end{pmatrix},
$$

$$
F^{n+1}d_{\operatorname{Cone}(f)}^n
=\begin{pmatrix}
d_D^n&f^{n+1}-h^{n+2}d_C^{n+1}\\
0&-d_C^{n+1}
\end{pmatrix}.
$$

仮定の次数 $n+1$ の式は $f^{n+1}-g^{n+1}=d_D^nh^{n+1}+h^{n+2}d_C^{n+1}$。移項すれば右上同士が等しくなる。従って全次数で余鎖写像条件が成立する。

逆射候補を $G^n=\begin{pmatrix}1&-h^{n+1}\\0&1\end{pmatrix}$ と置くと、$G^nF^n$ と $F^nG^n$ はともに対角成分が恒等射、右上は $h^{n+1}-h^{n+1}=0$ なので恒等行列となる。

余鎖写像の条件 $d_g^nF^n=F^{n+1}d_f^n$ に左から $G^{n+1}$、右から $G^n$ を合成すると $G^{n+1}d_g^n=d_f^nG^n$。よって $G$ も余鎖写像で、$F$ は複体の同型である。

アーベル圏では[コホモロジーの関手性](../CATB7-01/index.md#thm-catb7-01-cohomology-functor)により $H^n(G)H^n(F)=1$、$H^n(F)H^n(G)=1$。従って全次数で二つの錐のコホモロジーは同型である。
<!-- solution-end -->

## 6. まとめ

余鎖ホモトピーは微分を使って余鎖写像の差を記述し、コホモロジー上の射を保存する。シフトの符号によって写像錐の微分の交差項が相殺される。短完全な複体の列は接続射を介して長完全列となり、写像錐は元の写像のコホモロジー上での振る舞いを記録する。次講では複体の同型より弱い同値性を体系的に扱う。
