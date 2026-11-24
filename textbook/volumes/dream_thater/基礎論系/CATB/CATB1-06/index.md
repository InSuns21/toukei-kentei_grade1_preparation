# CATB1-06 Snakeの補題と図式追跡

## 1. 二つの完全列の間を移動する

前講の[短完全列の特徴づけ](../CATB1-05/index.md#thm-catb1-05-short-exact-test)では、中央の対象を部分と商に分けた。今度は同じ形の二つの列を縦の射で結ぶ。縦の射の核と余核は、互いにどのような関係を持つだろうか。

以下、局所小な[アーベル圏](../CATB1-04/index.md#def-catb1-04-abelian-category)で考える。零対象を $0$ と書き、合成は $vu=v\circ u$ とする。二つの横の列は短完全列である。

$$
0\xrightarrow{} A\xrightarrow{i} B\xrightarrow{p} C\xrightarrow{}0
$$

$$
0\xrightarrow{} A'\xrightarrow{i'} B'\xrightarrow{p'} C'\xrightarrow{}0
$$

縦の射を左から $a:A\to A'$, $b:B\to B'$, $c:C\to C'$ とし、二つの四角形が可換、すなわち

$$
bi=i'a,\qquad p'b=cp
$$

と仮定する。横の射 $i,i'$ は核、$p,p'$ は余核である。これは[短完全列の特徴づけ](../CATB1-05/index.md#thm-catb1-05-short-exact-test)の適用であり、特に $i,i'$ はモノ射、$p,p'$ はエピ射になる。

縦の射 $v=a,b,c$ の核の対象を $K_v$、核射を $k_v$、余核の対象を $Q_v$、余核射を $q_v$ と書く。

### 1.1 整数で起こる小さな謎

可換群の圏で上下とも $0\to\mathbb Z\xrightarrow{\times2}\mathbb Z\to\mathbb Z/2\mathbb Z\to0$ とし、縦の射をすべて倍写像にする（右端では零射になる）。倍写像は単射、その像は偶数全体、商射の核も偶数全体なので両列は短完全である。左の四角形は $2(2x)=2(2x)$、右は $[2x]_2=2[x]_2=0$ から可換である。

[加群の核と余核の構成](../CATB1-04/index.md#thm-catb1-04-module-category)で計算すると、

$$
K_a=K_b=0,\quad K_c=\mathbb Z/2\mathbb Z,
$$

$$
Q_a=Q_b=Q_c=\mathbb Z/2\mathbb Z.
$$

$K_c$ の元 $[1]_2$ は上段の整数 $1$ から来るが、$1$ は中央の縦射で $2$ に移るので核には属さない。ところが $2=i'(1)$ であり、左下の $1$ へ戻せる。この $1$ の余核における類 $[1]_2$ が、持ち上げが縦の核に入らなかったことを測る。これが右上の核から左下の余核へ進む新しい射の原型である。

## 2. 核と余核の間の射

$i k_a$ は $b i k_a=i'a k_a=0$ を満たす。したがって[核の普遍性](../CATB1-04/index.md#def-catb1-04-kernel)から唯一の $\alpha:K_a\to K_b$ が存在し、

$$
k_b\alpha=i k_a
$$

を満たす。$cp k_b=p'b k_b=0$ に同じ普遍性を適用すれば、唯一の $\beta:K_b\to K_c$ が存在し $k_c\beta=p k_b$ となる。

一方 $q_b i'a=q_bbi=0$ なので[余核の普遍性](../CATB1-04/index.md#def-catb1-04-cokernel)から唯一の $\gamma:Q_a\to Q_b$ が存在し $\gamma q_a=q_b i'$。$q_c p'b=q_c cp=0$ から唯一の $\eta:Q_b\to Q_c$ が存在し $\eta q_b=q_c p'$ となる。

核側の二射は $k_c\beta\alpha=pi k_a=0$ から $\beta\alpha=0$。余核側は $\eta\gamma q_a=q_c p'i'=0$ から $\eta\gamma=0$ である。ここで核射のモノ射性、余核射のエピ射性をそれぞれ使った。

しかし $K_c$ と $Q_a$ の間にはまだ射がない。加群なら元を持ち上げられるが、一般の圏で対象の内部の元を直接扱うことはできない。そこで任意の対象 $T$ からの射 $x:T\to X$ を、$T$ を変域とする元のように扱う。等式 $x=y$ は射の等式であり、$T$ を固定すると加法も使える。

## 3. エピ射に沿って持ち上げる方法

エピ射 $e:X\to Y$ であっても、任意の射 $y:T\to Y$ に対して $ex=y$ となる $x:T\to X$ が存在するとは限らない。例えば商射 $\mathbb Z\to\mathbb Z/2\mathbb Z$ と $y=1_{\mathbb Z/2\mathbb Z}$ では、そのような $x$ は存在しない。$2x([1]_2)=0$ なら整数 $x([1]_2)$ は零だからである。

そこで $T$ 自体をエピ射 $s:S\to T$ で置き換え、$ex=ys$ を満たす $x:S\to X$ を求める。$s$ はエピ射なので、後から $s$ を合成した等式から元の等式を回復できる。

<a id="lem-catb1-06-epi-lift"></a>

<!-- formal-statement-start -->
> **補題（エピ射に沿う持ち上げ）**
>
> アーベル圏で $e:X\to Y$ がエピ射、$y:T\to Y$ が任意の射なら、引き戻し $P$ の射 $u:P\to X$, $s:P\to T$ は $eu=ys$ を満たし、$s$ はエピ射である。
<!-- formal-statement-end -->

見取り図：引き戻しを双積からの差の核として作り、$s$ を零にする射が必ず零になると示す。

<!-- proof-start -->
### 証明

[双積](../CATB1-03/index.md#def-catb1-03-biproduct) $X\oplus T$ からの射 $d=(e,-y):X\oplus T\to Y$ を取る。$d$ はエピ射である。実際 $w d=0$ なら第1成分への包含を合成して $we=0$、よって $w=0$ となり、[零射によるエピ射の判定](../CATB1-04/index.md#prop-catb1-04-zero-test)を適用できる。

$d$ の核 $j:P\to X\oplus T$ の二成分を $u,s$ とする。任意の $u_0:V\to X,s_0:V\to T$ が $eu_0=ys_0$ を満たせば、双積への射 $(u_0,s_0)$ は $d$ との合成が零なので $j$ を通じて一意に分解する。これは[引き戻し](../../CAT/CAT2-03/index.md#def-cat2-03-pullback)の普遍性そのものである。

$w:T\to W$ が $ws=0$ を満たすとする。すると $(0,w)j=ws=0$。エピ射 $d$ は[正規射の核・余核による復元](../CATB1-04/index.md#prop-catb1-04-normal-recovery)から $j$ の余核である。したがって $(0,w)=hd$ となる $h:Y\to W$ が存在する。二つの包含と合成すると

$$
0=he,\qquad w=-hy.
$$

$e$ のエピ射性から $h=0$、従って $w=0$。再び零射による判定で $s$ はエピ射である。
<!-- proof-end -->

例えば $e:\mathbb Z\to\mathbb Z/2\mathbb Z$ と $y=1$ の場合、$P=\mathbb Z$、$u=1_{\mathbb Z}$、$s=e$ と選べる。任意の両立する射の組では $s_0=eu_0$ だから、分解射は $u_0$ のみである。$s$ は全射であり、先ほど不可能だった持ち上げが $T$ の取り替えによって可能になった。

次に完全性を同じ方法で判定する。$g:X\to Y$ と $h:Y\to Z$ の合成が零であるとき、$h$ で零になる射が、エピ射による変域の取り替えの後に $g$ の値として書けるかを調べる。

<a id="prop-catb1-06-local-exactness"></a>

<!-- formal-statement-start -->
> **命題（持ち上げによる完全性の判定）**
>
> アーベル圏で $g:X\to Y$, $h:Y\to Z$ は $hg=0$ を満たすとする。列が $Y$ で完全であることと、任意の $y:T\to Y$ で $hy=0$ なら、あるエピ射 $s:S\to T$ と $x:S\to X$ が存在して $gx=ys$ となることは同値である。
<!-- formal-statement-end -->

見取り図：完全なら核へのエピ射を引き戻す。逆向きは $y$ として $h$ の核射自身を取り、余核に写してからエピ射を消去する。

<!-- proof-start -->
### 証明

[完全性の判定](../CATB1-05/index.md#prop-catb1-05-exactness-test)により、完全性の下では $g=ke$ と書ける。$k:K\to Y$ は $h$ の核、$e:X\to K$ はエピ射である。$hy=0$ より $y=kt$ となる $t:T\to K$ を取る。[持ち上げの補題](#lem-catb1-06-epi-lift)を $e,t$ に適用し $ex=ts$ を得ると、

$$
gx=kex=kts=ys.
$$

逆に持ち上げ条件を仮定する。$y=k$ として $gx=ks$ を得る。$q:Y\to Q$ を $g$ の余核とすると $qks=qgx=0$、$s$ がエピ射だから $qk=0$。従って $k$ は $q$ の核を経由する。[像と余像の比較同型](../CATB1-05/index.md#thm-catb1-05-image-coimage)で $q$ の核は $g$ の像である。一方 $hg=0$ なので $h$ は $q$ を経由し、$q$ の核は $h$ の核を経由する。二つのモノ射が相互に分解するので、その分解射の合成は各モノ射の消去性から恒等射になる。よって[完全列の定義](../CATB1-05/index.md#def-catb1-05-exact)を満たす。
<!-- proof-end -->

## 4. 接続射を構成する

$K_c$ から $Q_a$ に向かう射を接続射と呼ぶ。これを構成するため、$p:B\to C$ と $k_c:K_c\to C$ の引き戻しを取る。射を $u:P\to B$, $s:P\to K_c$ とする。すると $pu=k_cs$ で、[持ち上げの補題](#lem-catb1-06-epi-lift)により $s$ はエピ射である。

$$
p'bu=cpu=ck_cs=0.
$$

$i'$ は $p'$ の核なので $i'v=bu$ を満たす唯一の $v:P\to A'$ がある。こうして $P$ 上では $q_a v:P\to Q_a$ が得られた。問題は、この射が $s$ を経由して $K_c$ 上で定まるかどうかである。

<a id="def-catb1-06-connecting"></a>

<!-- formal-statement-start -->
> **定義（接続射）**
>
> アーベル圏の二つの短完全列の間に射 $a,b,c$ があり、横の射をそれぞれ $i,p$ と $i',p'$ として $bi=i'a$, $p'b=cp$ が成立するとする。$k_c$ を $c$ の核、$q_a$ を $a$ の余核とする。
>
> $p$ と $k_c$ の引き戻しの射を $u:P\to B$, $s:P\to K_c$ とし、$i'v=bu$ となる $v:P\to A'$ を取る。このとき次の等式を満たす射 $\delta:K_c\to Q_a$ を接続射という。
 
$$
\delta s=q_a v.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb1-06-connecting -->
**定義の確認。** 第1節の整数の例では $K_c=C=\mathbb Z/2\mathbb Z$、$k_c=1$ なので $P=B=\mathbb Z$, $u=1$, $s=p$ と取れる。$i'v(n)=2v(n)=2n$ より $v(n)=n$。$q_a(n)=[n]_2$ だから $\delta([n]_2)=[n]_2$ とすれば $\delta s=q_av$ を満たす。$s$ が全射なのでこの $\delta$ は一意であり、代表元を $n+2t$ に替えても値は変わらない。
<!-- definition-example-end -->

一般の場合にもこの射が存在する。$l:L\to P$ を $s$ の核とすると $pul=k_csl=0$。$i=\ker p$ より $ul=iw$ となる $w:L\to A$ が存在する。従って

$$
i'vl=bul=biw=i'aw.
$$

$i'$ のモノ射性から $vl=aw$、よって $q_avl=q_aaw=0$。エピ射 $s$ は[正規射の復元](../CATB1-04/index.md#prop-catb1-04-normal-recovery)により $l$ の余核だから、$\delta s=q_av$ を満たす $\delta$ が一意に存在する。

この構成は引き戻しの選択にも依存しない。二つの引き戻しの普遍性から、それぞれの二射と両立する互いに逆の射が存在する。片方の $s,u,v$ をもう片方の射で引き戻せば、$i'$ のモノ射性により $v$ も一致する。従って接続射の等式はどちらの選択でも同じになり、$s$ のエピ射性から一致する。

加群の場合には、$x\in K_c$ に対して $pz=x$ となる $z\in B$ を取り、$i'w=bz$ を解いて $\delta(x)=[w]$ と計算する。別の持ち上げ $z_1$ との差は $z_1-z=it$ であり、

$$
i'(w_1-w)=b(z_1-z)=bit=i'at.
$$

よって $w_1-w=at$ なので $[w_1]=[w]$。二つの元の和には持ち上げの和を選べるので、この計算は加法を保つ。加群ならスカラー倍についても持ち上げのスカラー倍を選べる。この式は一般圏の構成における $q_avl=0$ に対応する。

## 5. Snakeの補題

得られた射は、核の列と余核の列をつなぐ。下の列の途中でどこまで値が届くかを、次の射の核によって決定できる。

<a id="lem-catb1-06-snake"></a>

<!-- formal-statement-start -->
> **補題（Snakeの補題）**
>
> アーベル圏の二つの短完全列
>
$$
0\to A\xrightarrow{i}B\xrightarrow{p}C\to0,\qquad
0\to A'\xrightarrow{i'}B'\xrightarrow{p'}C'\to0
$$
> の間に射 $a:A\to A'$, $b:B\to B'$, $c:C\to C'$ があり、二つの四角形が可換とする。各縦射 $v$ の核と余核の対象を $K_v,Q_v$ とする。核・余核の普遍性から誘導される四射と、上で定義した接続射 $\delta$ により次の列は完全になる。

$$
0\to K_a\xrightarrow{\alpha}K_b\xrightarrow{\beta}K_c
\xrightarrow{\delta}Q_a
$$

$$
Q_a\xrightarrow{\gamma}Q_b\xrightarrow{\eta}Q_c\to0.
$$
<!-- formal-statement-end -->

二つの表示式は $Q_a$ で接続する一続きの列である。見取り図：隣り合う射の合成が零であることを示し、逆向きは[持ち上げによる完全性の判定](#prop-catb1-06-local-exactness)で調べる。エピ射に沿って持ち上げるたびに変域が変わるので、既に得た射にも同じエピ射を合成して型を合わせる。これを図式追跡と呼ぶ。

<!-- proof-start -->
### 証明

**端点。** $k_b\alpha=i k_a$ はモノ射の合成だからモノ射であり、$\alpha x=\alpha y$ なら $i k_ax=i k_ay$、よって $x=y$。$\eta q_b=q_c p'$ はエピ射の合成なので、$x\eta=y\eta$ なら $xq_cp'=yq_cp'$、よって $x=y$。従って $\alpha$ はモノ射、$\eta$ はエピ射である。

**$K_b$ での完全性。** 第2節で $\beta\alpha=0$ を示した。$x:T\to K_b$ が $\beta x=0$ を満たすなら $pk_bx=k_c\beta x=0$。$i$ は $p$ の核なので $iz=k_bx$ となる $z:T\to A$ がある。$i'az=biz=bk_bx=0$ より $az=0$。従って $z=k_ay$ となる $y:T\to K_a$ があり、

$$
k_b\alpha y=i k_a y=iz=k_bx.
$$

$k_b$ を消去して $\alpha y=x$。持ち上げによる判定では恒等射をエピ射に選べる。

**$K_c$ での完全性。** $u_0=k_b:K_b\to B$ と $s_0=\beta$ は $pu_0=k_cs_0$ を満たすので、引き戻し $P$ への射 $t:K_b\to P$ が存在して $ut=k_b$, $st=\beta$。$i'vt=but=bk_b=0$ から $vt=0$。従って $\delta\beta=\delta st=q_avt=0$。

$x:T\to K_c$ が $\delta x=0$ を満たすとする。[持ち上げの補題](#lem-catb1-06-epi-lift)を $s:P\to K_c$ と $x$ に適用し、エピ射 $e:S\to T$ と $t:S\to P$ を取り $st=xe$ とする。$q_avt=\delta st=\delta xe=0$。$a$ の[像分解](../CATB1-05/index.md#thm-catb1-05-image-coimage)を $a=m_a d_a$ と書く。$m_a$ は $q_a$ の核、$d_a$ はエピ射なので $vt=m_a z$ となる $z:S\to\operatorname{Im}a$ がある。再び持ち上げの補題を $d_a,z$ に適用し、エピ射 $e_1:S_1\to S$ と $w:S_1\to A$ で $d_aw=ze_1$ とする。従って $aw=vte_1$。

ここで $y=ute_1-iw:S_1\to B$ と置くと、

$$
by=i'vte_1-i'aw=0,
$$

$$
py=k_cste_1-piw=k_cxee_1.
$$

$by=0$ より $y=k_bz_1$ と分解でき、$k_c\beta z_1=py=k_cxee_1$。$k_c$ を消去すると $\beta z_1=xee_1$。合成 $ee_1$ はエピ射なので[完全性の判定](#prop-catb1-06-local-exactness)が使える。

**$Q_a$ での完全性。** $\gamma\delta s=\gamma q_av=q_bi'v=q_bbu=0$ なので $s$ を消去して $\gamma\delta=0$。

$x:T\to Q_a$ が $\gamma x=0$ を満たすとする。エピ射 $q_a$ に沿って持ち上げ、$e:S\to T$, $w:S\to A'$ を取り $q_aw=xe$ とする（以下の持ち上げも[持ち上げの補題](#lem-catb1-06-epi-lift)による）。すると $q_bi'w=\gamma q_aw=0$。$b=m_bd_b$ と像分解すれば $i'w=m_bz$ となる $z:S\to\operatorname{Im}b$ がある。エピ射 $d_b$ に沿って持ち上げ、$e_1:S_1\to S$ と $y:S_1\to B$ で $d_by=ze_1$ とする。従って $by=i'we_1$。

$$
cpy=p'by=p'i'we_1=0.
$$

よって $py=k_ct$ となる $t:S_1\to K_c$ がある。引き戻しの普遍性で $r:S_1\to P$ を取り $ur=y$, $sr=t$ とする。$i'vr=bur=by=i'we_1$ より $vr=we_1$。従って

$$
\delta t=\delta sr=q_avr=q_awe_1=xee_1.
$$

合成 $ee_1$ はエピ射なので[完全性の判定](#prop-catb1-06-local-exactness)により完全である。

**$Q_b$ での完全性。** 第2節で $\eta\gamma=0$ を示した。$x:T\to Q_b$ が $\eta x=0$ を満たすとする。エピ射 $q_b$ に沿って持ち上げ、$e:S\to T$, $y:S\to B'$ で $q_by=xe$ とする。$q_cp'y=\eta q_by=0$。$c=m_cd_c$ と像分解して $p'y=m_cz$ とし、エピ射 $d_c$ に沿って $e_1:S_1\to S$, $t:S_1\to C$ を取り $d_ct=ze_1$ とする。従って $ct=p'ye_1$。

さらにエピ射 $p$ に沿って $e_2:S_2\to S_1$, $v_0:S_2\to B$ を取り $pv_0=te_2$ とする。すると

$$
p'(ye_1e_2-bv_0)=p'ye_1e_2-cpv_0=0.
$$

$i'$ は $p'$ の核なので $i'w=ye_1e_2-bv_0$ となる $w:S_2\to A'$ がある。従って

$$
\gamma q_aw=q_bi'w=q_bye_1e_2-q_bbv_0=xee_1e_2.
$$

合成 $ee_1e_2$ はエピ射なので[完全性の判定](#prop-catb1-06-local-exactness)が使える。以上で四つの中間対象で完全性が成立し、端点と合わせて結論を得る。
<!-- proof-end -->

## 6. 何を測っているか

第1節の例で $\alpha,\beta$ の始域はいずれも零対象である。$\delta$ は恒等射、$\gamma$ は $[n]_2\mapsto[2n]_2=0$、$\eta$ は恒等射である。従って $K_c$ で像は零、核も零、$Q_a$ で像は全体、核も全体、$Q_b$ で像は零、核も零になり、[完全列の定義](../CATB1-05/index.md#def-catb1-05-exact)を直接確認できる。

加群で $x\in K_c$ が $\delta(x)=0$ を満たすことは、$x$ に $K_b$ に属する持ち上げがあることと同値である。任意の持ち上げ $z$ について $bz=i'w$ とすると、$\delta(x)=0$ は $w=at$ と書けることを意味する。すると $b(z-it)=i'w-i'at=0$ で $p(z-it)=x$。逆に最初から核に属する持ち上げを取れば $w=0$ である。

短完全性を失うと、この構成は壊れ得る。上下段をともに $0\to0\to\mathbb Z\xrightarrow{\times2}\mathbb Z\to0$、縦射をすべて零とする。両四角形は可換で中央では完全だが、右端の倍写像は全射でない。$K_c=\mathbb Z$ の元 $1$ は上段で持ち上がらない。しかも $K_b\to K_c$ は倍写像、$Q_a=0$ なので、どんな $\delta$ でも $K_c$ で完全にすることは不可能である。横のエピ射性が必要な理由が分かる。

複数の短完全列が連なる場面では、核と余核をつなぐこの構成が、後にコホモロジーを通じて障害を記述する際の基本になる。

## 7. 演習

### CATB1-06-A01 核と余核を計算する

- Level: A

第1節の倍写像の例で、六つの対象と $\beta,\gamma,\eta$ を求めよ。

<!-- solution-start -->
**詳細解答。** $a,b$ は整数の倍写像で $2n=0$ なら $n=0$、像は $2\mathbb Z$。$c$ は $\mathbb Z/2\mathbb Z$ の零射だから核と余核はいずれも $\mathbb Z/2\mathbb Z$。従って $K_a=K_b=0$, $K_c=Q_a=Q_b=Q_c=\mathbb Z/2\mathbb Z$。$\beta$ は零対象からの射。$\gamma q_a=q_bi'$ より $\gamma([n]_2)=[2n]_2=0$。$\eta q_b=q_cp'$ より $\eta([n]_2)=[n]_2$。各商射は全射なのでこれらの式は射を一意に決める。
<!-- solution-end -->

### CATB1-06-A02 接続射の持ち上げの選択

- Level: A

上下とも $0\to\mathbb Z\xrightarrow{\times3}\mathbb Z\to\mathbb Z/3\mathbb Z\to0$ とし、縦射は3倍写像とする。$[2]_3$ の二つの持ち上げ $2,5$ から接続射の値を計算せよ。

<!-- solution-start -->
**詳細解答。** 両横列は短完全で、縦射と横射は乗法および剰余類の計算で可換。右の縦射は零なので $[2]_3\in K_c$。第4節の[接続射](#def-catb1-06-connecting)を使う。$b(2)=6=i'(2)$、$b(5)=15=i'(5)$ なので、$w=2,5$ を得る。$Q_a=\mathbb Z/3\mathbb Z$ で $[2]_3=[5]_3$。差 $5-2=3=a(1)$ だから余核では消える。
<!-- solution-end -->

### CATB1-06-A03 核から余核への非自明な射

- Level: A

上下とも $0\to\mathbb Z\xrightarrow{\times6}\mathbb Z\to\mathbb Z/6\mathbb Z\to0$ とし、縦射は4倍写像とする。$K_c$ と $Q_a$、接続射の値を求めよ。

<!-- solution-start -->
**詳細解答。** 横は短完全で、$4(6n)=6(4n)$、$[4n]_6=4[n]_6$ から可換。$4x$ が6の倍数であることは $2x$ が3の倍数、従って $x$ が3の倍数であることと同値。$K_c=\{[0]_6,[3]_6\}$。$Q_a=\mathbb Z/4\mathbb Z$。$[3]_6$ の持ち上げ $z=3$ に対して $bz=12=i'(2)$。従って $\delta([3]_6)=[2]_4$。$[0]_6$ には $z=0$ を選ぶと値は $[0]_4$ となる。別の持ち上げ $3+6t$ からは $w=2+4t$ となり、値は変わらない。
<!-- solution-end -->

### CATB1-06-A04 エピ射と右逆射を区別する

- Level: A

商射 $e:\mathbb Z\to\mathbb Z/3\mathbb Z$ がエピ射であることと、$ex=1$ となる群準同型 $x:\mathbb Z/3\mathbb Z\to\mathbb Z$ が存在しないことを示せ。

<!-- solution-start -->
**詳細解答。** $e$ は全射なので $ue=ve$ なら各類 $[n]_3=e(n)$ で $u([n]_3)=v([n]_3)$。よってエピ射である。もし $x$ が存在すれば $3x([1]_3)=x([3]_3)=x([0]_3)=0$。整数の加法群には非零の3倍して零になる元がないので $x([1]_3)=0$。しかし $ex([1]_3)=[1]_3$ に反する。第3節の持ち上げに変域の取り替えが必要な理由である。
<!-- solution-end -->

### CATB1-06-B01 引き戻しによる持ち上げの具体化

- Level: B

$e:\mathbb Z\to\mathbb Z/3\mathbb Z$, $y:\mathbb Z/6\mathbb Z\to\mathbb Z/3\mathbb Z$ を自然な商射とする。引き戻しを構成し、射影がエピ射になることを確かめよ。

<!-- solution-start -->
**詳細解答。** $y([r]_6)=[r]_3$ は $r$ を6の倍数だけ変えても値が変わらないので定義できる。

$$
P=\{(n,[r]_6):[n]_3=[r]_3\}
$$

と取る。二つの射影を $u,s$ とすれば $eu=ys$。条件は加法と逆元で保存されるので $P$ は可換群である。任意の両立する二射 $f:V\to\mathbb Z$, $g:V\to\mathbb Z/6\mathbb Z$ に対して、$v\mapsto(f(v),g(v))$ は条件により $P$ に入り加法を保つ。射影を固定すると各成分が決まり、分解は一意。従ってこれは[引き戻し](../../CAT/CAT2-03/index.md#def-cat2-03-pullback)である。任意の $[r]_6$ は $(r,[r]_6)\in P$ の射影なので $s$ は全射で、エピ射になる。$P$ 上では $eu=ys$ が成立するが、変域 $\mathbb Z/6\mathbb Z$ のままで $ex=y$ は不可能である。実際 $6x([1]_6)=0$ から $x([1]_6)=0$ となり $ex([1]_6)=[1]_3$ に反する。
<!-- solution-end -->

### CATB1-06-B02 接続射の核を計算する

- Level: B

加群の短完全列の可換図式において、$\delta(x)=0$ なら $x\in K_c$ を $K_b$ の元へ持ち上げられることを、元の追跡で証明せよ。

<!-- solution-start -->
**詳細解答。** $p$ が全射なので $pz=x$ となる $z\in B$ を選ぶ。$p'bz=cpz=cx=0$ より $bz\in\ker p'=\operatorname{Im}i'$。従って $i'w=bz$ となる $w\in A'$ があり、$i'$ が単射なので一意。[接続射の定義](#def-catb1-06-connecting)から $\delta(x)=[w]$。これが零なら $w\in\operatorname{Im}a$ なので $at=w$ となる $t\in A$ を取れる。

$$
b(z-it)=bz-bit=i'w-i'at=0,
$$

$$
p(z-it)=pz-pit=x.
$$

従って $z-it\in K_b$ が求める持ち上げである。逆に $z\in K_b$ かつ $pz=x$ なら $i'w=bz=0$ から $w=0$、$\delta(x)=0$。これで $K_c$ での完全性を元から再現できる。
<!-- solution-end -->

### CATB1-06-B03 接続射と図式の射の両立

- Level: B

第4節の可換図式から別の同じ形の可換図式への射があるとする。上段の三射を $F_A,F_B,F_C$、下段の三射を $G_A,G_B,G_C$ とし、すべての横・縦の四角形が可換とする。移り先の縦射を $\tilde a,\tilde b,\tilde c$ と書く。核に誘導される $F_K:K_c\to K_{\tilde c}$ と余核に誘導される $G_Q:Q_a\to Q_{\tilde a}$ について、$\tilde\delta F_K=G_Q\delta$ を示せ。

<!-- solution-start -->
**詳細解答。** まず $\tilde c F_C k_c=G_C c k_c=0$ なので核の普遍性で $\tilde k_c F_K=F_C k_c$ を満たす射が一意に存在する。また $\tilde q_a G_A a=\tilde q_a\tilde a F_A=0$ より余核の普遍性で $G_Q q_a=\tilde q_aG_A$ を満たす射が一意に存在する。

移り先の引き戻しを $\tilde P$ とし、その射を $\tilde u,\tilde s$ とする。上段の可換性から

$$
\tilde p F_B u=F_Cpu=F_Ck_cs=\tilde k_c F_Ks.
$$

従って引き戻しの普遍性で $r:P\to\tilde P$ が存在し、$\tilde u r=F_Bu$, $\tilde s r=F_Ks$。下段と縦の可換性から

$$
\tilde i'\tilde v r=\tilde b\tilde u r
=\tilde b F_Bu=G_Bbu
=G_Bi'v=\tilde i'G_Av.
$$

$\tilde i'$ を消去して $\tilde v r=G_Av$。両接続射の定義を適用すると

$$
\tilde\delta F_Ks=\tilde\delta\tilde s r
=\tilde q_a\tilde v r
=\tilde q_aG_Av
=G_Qq_av=G_Q\delta s.
$$

$s$ は[持ち上げの補題](#lem-catb1-06-epi-lift)でエピ射なので消去でき、結論を得る。
<!-- solution-end -->

### CATB1-06-C01 二つの整数から完全列を組み立てる

- Level: C

正整数 $m,n$ に対して上下とも

$$
0\to\mathbb Z\xrightarrow{\times n}\mathbb Z\to\mathbb Z/n\mathbb Z\to0
$$

とし、縦射を $m$ 倍写像とする。$d=\gcd(m,n)$ と置く。六つの対象を求め、接続射と余核側の二射を計算し、完全性を直接確かめよ。

<!-- solution-start -->
**詳細解答。** 横列は単射、像と核が $n\mathbb Z$、商射が全射なので短完全である。$m(nx)=n(mx)$ と $[mx]_n=m[x]_n$ から可換。$m>0$ なので $K_a=K_b=0$、$Q_a=Q_b=\mathbb Z/m\mathbb Z$。

$m=dm_0,n=dn_0$ と書けば $m_0,n_0$ は互いに素である。$c([x]_n)=0$ は $n\mid mx$、すなわち $n_0\mid m_0x$ と同値。互いに素なので Bézout の等式から $n_0\mid x$。逆に $x=n_0t$ なら $mx=nm_0t$。従って

$$
K_c=\{[n_0t]_n:0\le t<d\}.
$$

$t$ と $t'$ が同じ類を与える条件は $n\mid n_0(t-t')$、すなわち $d\mid t-t'$。よって $K_c$ は $\mathbb Z/d\mathbb Z$ と同型である。

$c$ の像は $[mx]_n$ の全体。どれも $d$ の倍数の類であり、Bézout の等式 $d=um+vn$ から $[d]_n=[um]_n$ が像に属す。従って像は $d$ の倍数の類全体、$Q_c=\mathbb Z/d\mathbb Z$ と選べる（$[x]_n\mapsto[x]_d$ は全射で、核がちょうどこの像）。

接続射では $[n_0t]_n$ の持ち上げ $n_0t$ を選ぶと $b(n_0t)=nm_0t=i'(m_0t)$ である。従って

$$
\delta([n_0t]_n)=[m_0t]_m.
$$

$t$ を $d$ だけ変えると値は $m_0d=m$ だけ変わるので定義できる。値が零なら $m\mid m_0t$、すなわち $d\mid t$ だから $\delta$ は単射。$K_c$ での完全性が成立する。

余核から誘導される二射は

$$
\gamma([x]_m)=[nx]_m,\qquad
\eta([x]_m)=[x]_d.
$$

前者は代表元の差 $m$ が $nm$ に移り、後者は $d\mid m$ により定義できる。$\gamma q_a=q_bi'$ と $\eta q_b=q_cp'$ の等式でこれらの射が得られる。

$\ker\gamma$ は $m\mid nx$ を満たす類である。これは $m_0\mid n_0x$、従って $m_0\mid x$ と同値。よって $\ker\gamma$ は $m_0$ の倍数の類で、$\delta$ の像と一致する。$\operatorname{Im}\gamma$ は $n$ の倍数の類であり、$d=um+vn$ から $[d]_m=[vn]_m$。従って $\operatorname{Im}\gamma$ は $d$ の倍数の類全体で、$\ker\eta$ と一致する。$\eta$ は全射であり、左端の二つの核は零。こうして [Snakeの補題](#lem-catb1-06-snake) の完全性をすべて具体的に確認できた。$d=1$ のとき $K_c,Q_c$ は零となり、$\gamma$ は同型である。
<!-- solution-end -->
