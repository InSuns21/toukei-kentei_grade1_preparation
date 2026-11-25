# CATB3-08 局所可呈示圏の随伴判定

## 1. 余極限を保存する関手から右随伴を作りたい

[左随伴の余極限保存](../../CAT/CAT2-11/index.md#thm-cat2-11-left-preserves)によれば、左随伴は部品を余極限で組み立てる操作を保つ。逆に、この組み立てを保つことだけから右随伴を作れるだろうか。

例えば集合 $A$ を固定し、集合 $X$ に対して $A\times X$ を作る。集合 $Y$ に対し、写像 $A\times X\to Y$ の情報を $X$ の各元に対応する写像 $A\to Y$ として整理できる。この整理を表す集合が右随伴の値になる。しかし一般の圏では、このような元による計算は使えない。

[Freydの一般随伴関手定理](../../CAT/CAT2-12/index.md#thm-cat2-12-freyd)の双対を使えば右随伴を得られるが、候補を集合個に抑える条件が必要になる。そこで [局所可呈示圏](../CATB3-05/index.md#def-catb3-05-locally-presentable) の生成条件を使う。大きい対象を一度に扱う代わりに、集合個の表示対象から出る射を整理する。

以下、集合と小さい圏は固定した宇宙内で扱い、選択公理を仮定する。$\mathcal C,\mathcal D$ は[局所小圏](../../CAT/CAT1-02/index.md#def-cat1-02-size)とする。合成は右から左へ書く。記号 $\mathcal C(x,z)$ は $x$ から $z$ への射の集合を表す。

## 2. 射を受け取る側の解集合

関手 $F:\mathcal C\to\mathcal D$ と対象 $d\in\mathcal D$ を固定する。[comma圏](../../CAT/CAT2-10/index.md#def-cat2-10-comma) $F\downarrow d$ の対象は $(x,u:Fx\to d)$ である。二対象 $(x,u),(z,v)$ の間の射は $h:x\to z$ で、次の条件を満たす。

$$
vF(h)=u.
$$

[解集合条件](../../CAT/CAT2-12/index.md#def-cat2-12-solution-set)では射を出す候補を選んだが、今回は逆に射を受ける候補を選ぶ。[終対象](../../CAT/CAT1-04/index.md#def-cat1-04-initial-terminal)ならどの対象からも唯一の射を受ける。まずは一意性を要求せず、少なくとも一本を受ける対象を探す。この性質を弱終性といい、弱終対象の集合は各対象からその集合の少なくとも一つの要素へ射があることを意味する。これは[弱始対象集合](../../CAT/CAT2-12/index.md#def-cat2-12-weak-initial-set)の双対である。

<a id="def-catb3-08-dual-solution"></a>

<!-- formal-statement-start -->
> **定義（双対の解集合条件）**
>
> 局所小圏の関手 $F:\mathcal C\to\mathcal D$ について、$\mathcal D$ の各対象 $d$ に対し、集合 $I_d$ で添字付けられた対象 $x_i\in\mathcal C$ と射 $v_i:Fx_i\to d$ が存在するとする。任意の対象 $x\in\mathcal C$ と射 $u:Fx\to d$ に対し、ある $i\in I_d$ と射 $h:x\to x_i$ が存在して

$$
v_iF(h)=u
$$

> となるとき、$F$ は双対の解集合条件を満たすという。因子分解の一意性は要求しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb3-08-dual-solution -->
**定義の確認**。恒等関手 $F=1_{\mathbf{Set}}$（対象も写像も変えない関手）を取り、集合 $d$ を任意に固定する。集合 $I_d=\{*\}$ に対し $x_*=d$、$v_*=1_d:d\to d$ とする。任意の集合 $x$ と写像 $u:x\to d$ について $h=u:x\to x_*$ と選ぶと、恒等関手なので $F(h)=h$ であり、

$$
v_*F(h)=1_d\circ u=u.
$$

この等式がcomma圏の射 $(x,u)\to(d,1_d)$ の条件そのものである。候補は一つなので集合であり、すべての $x,u$ について因子分解が可能である。$d=\varnothing$ でも、存在する写像に対して同じ確認が成立する。
<!-- definition-example-end -->

この条件は $F\downarrow d$ が弱終対象集合を持つことと同値である。実際、上の因子分解式はちょうど $(x,u)\to(x_i,v_i)$ がcomma圏の射となる条件である。反対圏ではこの射の向きが逆になり、既習の解集合条件と一致する。

## 3. 小さい部品から候補を一つ作る

$\mathcal C$ が局所可呈示なら、ある[正則無限基数](../CATB3-04/index.md#def-catb3-04-regular) $\lambda$ と、[λ-表示対象](../CATB3-04/index.md#def-catb3-04-presentable)の集合 $G$ がある。任意の対象 $x$ は $G$ 内の対象を値とする小さい [λ-フィルター図式](../CATB3-04/index.md#def-catb3-04-filtered)の余極限に同型になる。ここで [局所可呈示圏の定義](../CATB3-05/index.md#def-catb3-05-locally-presentable) による余完備性も使える。

大きい対象 $x$ と射 $u:Fx\to d$ を直接集めると、候補は真の類になり得る。そこで、まず $a\in G$ と射 $v:Fa\to d$ の対だけを集める。これなら局所小性によって集合になる。さらに、対の間の射も含めて小さい図式を作る。すべての対を一度に余極限に送り込めば、任意の $u$ の部品からの射を一つにまとめられる。

<a id="thm-catb3-08-weak-terminal"></a>

<!-- formal-statement-start -->
> **定理（表示対象からの弱終対象の構成）**
>
> $\mathcal C$ を局所可呈示圏、$\mathcal D$ を局所小圏とする。関手 $F:\mathcal C\to\mathcal D$ がすべての小さい余極限を保存するなら、各 $d\in\mathcal D$ について $F\downarrow d$ は弱終対象を持つ。特に $F$ は双対の解集合条件を満たす。
<!-- formal-statement-end -->

見取り図：表示対象だけを使った小さい部分圏を作り、余極限で候補を一つにする。任意の射 $Fx\to d$ を $x$ の表示図式に沿って分解すれば、各部品はその小さい部分圏に入る。その余極限への射を束ねると $x$ から候補への射を得る。

<!-- proof-start -->
### 証明

**1. 候補を小さくする。** 局所可呈示性を与える $\lambda$ と生成集合 $G$ を固定し、$d\in\mathcal D$ を任意に取る。$F\downarrow d$ のうち、第一成分が $G$ に属する対象だけを残し、それらの間の射をすべて含めた充満部分圏を $K_d$ とする。$\operatorname{Ob}K_d$ をその対象全体と書くと、

$$
\operatorname{Ob}K_d
=\{(a,v)\mid a\in G,\ v\in\mathcal D(Fa,d)\}.
$$

$G$ は集合で、各 $\mathcal D(Fa,d)$ は局所小性により集合である。したがってこの集合添字の非交和も集合である。二対象 $(a,v),(b,w)$ 間の射は

$$
K_d((a,v),(b,w))
=\{h\in\mathcal C(a,b)\mid wF(h)=v\}.
$$

これは集合の部分集合であり、全射の集合も集合個のHom集合の非交和として作れる。よって $K_d$ は小さい圏である。恒等射は $vF(1_a)=v$ を満たす。射 $h:(a,v)\to(b,w)$ と $k:(b,w)\to(c,t)$ の合成は

$$
tF(kh)=tF(k)F(h)=wF(h)=v
$$

を満たすので、確かに圏をなす。

**2. 候補をまとめる。** 第一成分を取る関手 $P:K_d\to\mathcal C$ を定める。対象は $a$ に、射 $h$ は $h$ 自身に送るので、恒等射と合成を保つ。$\mathcal C$ の余完備性により

$$
q=\operatorname{colim}_{k\in K_d}P(k)
$$

が存在し、構造射を $j_{(a,v)}:a\to q$ とする。ここで添字 $k=(a,v)$ は候補圏の対象であり、$P(k)=a$ である。余極限の整合性は、任意の $h:(a,v)\to(b,w)$ について

$$
j_{(b,w)}h=j_{(a,v)}
$$

となることである。$F$ は [余極限の保存](../../CAT/CAT2-11/index.md#def-cat2-11-preserve-colimit) の条件を満たすので、$Fq$ と脚 $F(j_{(a,v)})$ は $FP$ の余極限をなす。各 $(a,v)$ に付いた射 $v:Fa\to d$ は、$wF(h)=v$ によって余錐をなす。

[余極限の普遍性](../../CAT/CAT2-05/index.md#def-cat2-05-colimit)を $FP$ に適用すると、ただ一つの射 $e:Fq\to d$ が存在し、

$$
eF(j_{(a,v)})=v
$$

となる。従って $(q,e)$ は $F\downarrow d$ の対象である。$K_d$ が空でも、空余極限（始対象）の保存によりこの射は存在する。

**3. 任意の射を候補へ因子分解する。** $(x,u:Fx\to d)$ を任意に取る。[λ-可到達圏の生成条件](../CATB3-05/index.md#def-catb3-05-accessible)から、小さい $\lambda$-フィルター圏 $J$ 上の図式 $A:J\to\mathcal C$ と余極限余錐 $c_i:A_i\to x$ があり、各 $A_i=A(i)$ は $G$ に属するように取れる。同型を通じて余極限を $x$ に移した場合も脚の普遍性は変わらない。

各段階について

$$
v_i=uF(c_i):FA_i\to d
$$

と置くと $(A_i,v_i)$ は $K_d$ の対象である。$s:i\to l$ に対し余錐の整合性 $c_l A(s)=c_i$ から

$$
v_lF(A(s))
=uF(c_l)F(A(s))
=uF(c_lA(s))
=uF(c_i)=v_i
$$

となる。よって $A(s)$ は $K_d$ の射 $(A_i,v_i)\to(A_l,v_l)$ である。恒等射と合成は $A$ の関手性から保たれるので、$J$ から $K_d$ への関手が得られる。

$q$ の構造射 $b_i=j_{(A_i,v_i)}$ は

$$
b_l A(s)=b_i
$$

を満たすため $A$ の余錐になる。$x$ の余極限性により、唯一の $h:x\to q$ が存在して $hc_i=b_i$ となる。

**4. 最後に $d$ への射を確認する。** 任意の $i$ について

$$
\begin{aligned}
eF(h)F(c_i)
&=eF(hc_i)\\
&=eF(b_i)=v_i\\
&=uF(c_i).
\end{aligned}
$$

$F$ が $A$ の余極限を保存するため、$F(c_i)$ は $F(x)$ を頂点とする余極限余錐の脚である。全脚に前合成して一致した二射 $eF(h),u:Fx\to d$ は同じ余錐の媒介射である。[余極限の普遍性](../../CAT/CAT2-05/index.md#def-cat2-05-colimit) が保証する媒介射の一意性から、両者は等しい。従って $h$ は $(x,u)\to(q,e)$ の射である。

任意の $(x,u)$ に対してそのような射が存在するから、$(q,e)$ は弱終対象である。一個の候補で [双対の解集合条件](#def-catb3-08-dual-solution) を満たす。
<!-- proof-end -->

この証明では、段階の個数が集合であることに加え、生成に使う対象全体が固定した集合 $G$ に入ることが重要である。表示性そのものを使って射を有限段階へ戻すのではなく、表示対象による生成を利用している。候補圏のすべての射を余極限に含めることで、個々の部品の間の関係も保存できる。

### 集合で候補を計算する

$F=1_{\mathbf{Set}}$、$d=\{0,1\}$ とし、$G$ を有限集合の基数代表全体とする。[集合の局所可呈示性](../CATB3-05/index.md#def-catb3-05-locally-presentable)から $\lambda=\aleph_0$ を取れる。

$K_d$ には任意の有限集合 $n$ と色付け $v:n\to d$ の対があり、色付けを保つ写像が射になる。$d$ 自身は基数2と同一視できる。

$(d,1_d)$ は $K_d$ の終対象であり、$(n,v)$ からの唯一の射は $v$ である。

従って $q=d$、構造射 $j_{(n,v)}=v$ と取れる。実際、任意の余錐の $(d,1_d)$ での脚が他のすべての脚を決める。

$e=1_d$ となり、任意の $u:x\to d$ は $h=u$ によって候補へ因子分解される。

## 4. 右随伴を得る

前節の候補はまだ弱終対象であり、射の一意性は保証されない。そこで [Freydの一般随伴関手定理](../../CAT/CAT2-12/index.md#thm-cat2-12-freyd) を反対圏に適用する。

<a id="thm-catb3-08-adjoint-criterion"></a>

<!-- formal-statement-start -->
> **定理（局所可呈示圏からの左随伴の判定）**
>
> 局所可呈示圏 $\mathcal C$、局所小圏 $\mathcal D$ と関手 $F:\mathcal C\to\mathcal D$ を取る。$F$ が右随伴を持つための必要十分条件は、$F$ がすべての小さい余極限を保存することである。
<!-- formal-statement-end -->

見取り図：必要性は左随伴の保存定理である。十分性では反対圏の完備性、極限保存、解集合条件を一つずつ確認する。反対圏で得た左随伴の向きを戻すと、欲しかった右随伴になる。

<!-- proof-start -->
### 証明

必要性は [左随伴の余極限保存](../../CAT/CAT2-11/index.md#thm-cat2-11-left-preserves) を $F$ に適用すれば従う。

十分性を示す。$F$ がすべての小さい余極限を保存すると仮定する。[Freydの一般随伴関手定理](../../CAT/CAT2-12/index.md#thm-cat2-12-freyd)に、次の関手を入力する。

$$
F^{\mathrm{op}}:\mathcal C^{\mathrm{op}}\to\mathcal D^{\mathrm{op}}.
$$

[反対圏](../../CAT/CAT1-04/index.md#def-cat1-04-opposite)では対象はそのまま、射と合成の向きが逆になる。特に $F^{\mathrm{op}}(h^{\mathrm{op}})=F(h)^{\mathrm{op}}$ であり、[局所小性](../../CAT/CAT1-04/index.md#prop-cat1-04-size)も反対圏で保たれる。$\mathcal C$ は局所可呈示性から余完備なので $\mathcal C^{\mathrm{op}}$ は完備である。$F$ の余極限保存を反対圏で読むと $F^{\mathrm{op}}$ はすべての小さい極限を保存する。

残る解集合条件について、[表示対象からの弱終対象の構成](#thm-catb3-08-weak-terminal)により各 $d$ で $e:Fq\to d$ があり、任意の $u:Fx\to d$ は $eF(h)=u$ と因子分解される。反対圏では

$$
u^{\mathrm{op}}
=F^{\mathrm{op}}(h^{\mathrm{op}})\,e^{\mathrm{op}}.
$$

ここで $e^{\mathrm{op}}:d\to F^{\mathrm{op}}q$、$h^{\mathrm{op}}:q\to x$ であり、これは元の定理の解集合条件そのものである。候補は一つである。

以上でFreydの定理のすべての仮定が満たされ、左随伴 $L:\mathcal D^{\mathrm{op}}\to\mathcal C^{\mathrm{op}}$ が存在する。随伴のHom全単射を反対圏から戻すと

$$
\begin{aligned}
\mathcal D(Fx,d)
&=\mathcal D^{\mathrm{op}}(d,F^{\mathrm{op}}x)\\
&\cong\mathcal C^{\mathrm{op}}(Ld,x)\\
&=\mathcal C(x,Ld).
\end{aligned}
$$

上の全単射を $\Phi_{x,d}:\mathcal D(Fx,d)\to\mathcal C(x,Ld)$ と書く。$x$ は $\mathcal C$ の変数、$d$ は $\mathcal D$ の変数であり、前者について反変、後者について共変である。反対圏の随伴では対応の向きと射の向きが逆になるが、自然性の等式は逆向きの全単射についても成立する。具体的に $r:x'\to x$、$s:d\to d'$ を元の圏の射とすると、

$$
\Phi_{x',d}(uF(r))=\Phi_{x,d}(u)r,
$$

$$
\Phi_{x,d'}(su)=L^{\mathrm{op}}(s)\Phi_{x,d}(u).
$$

これは反対圏での二変数自然性をそれぞれ前合成と後合成に読み替えた式である。そこで $R=L^{\mathrm{op}}:\mathcal D\to\mathcal C$ と置く。[Hom集合による随伴](../../CAT/CAT2-08/index.md#def-cat2-08-adjunction) の定義により $F\dashv R$ となる。
<!-- proof-end -->

ここで $\mathcal D$ の局所可呈示性や余完備性を要求していない。必要な像の余極限は、$F$ の保存条件から得られる。小さい候補圏から得た弱終対象がそのまま右随伴の値になるとは限らない。Freydの定理の双対では、[弱始対象集合から始対象を得る定理](../../CAT/CAT2-12/index.md#thm-cat2-12-initial-from-weak)を反対圏で読むことで、弱終対象から終対象への構成と射の一意性が得られる。

## 5. 具体的な右随伴と失敗する仮定

### 積と写像集合

集合 $A$ を固定し、$F(X)=A\times X$、$F(f)(a,x)=(a,f(x))$ とする。恒等写像と合成を保つため関手である。任意の小さい図式を $X_\bullet:I\to\mathbf{Set}$、その値を $X_i=X_\bullet(i)$、余極限を $X$ とする。[小さい余積と余等化子による余極限の構成](../../CAT/CAT2-05/index.md#thm-cat2-05-construction)を集合に適用すると、各段階の元を非交和に入れ、移行写像 $X_\bullet(s):X_i\to X_j$（$s:i\to j$）で対応する元を同一視して得られる。$[i,x]$ は段階 $i$ の元 $x\in X_i$ の同値類を表す。

$A\times X_i$ の余極限では、移行写像は第一座標を変えない。よって比較写像

$$
[i,(a,x)]\longmapsto (a,[i,x])
$$

が定まる。逆写像 $(a,[i,x])\mapsto[i,(a,x)]$ も定まる。実際、同値関係を生成する一つの移行 $x\mapsto X_\bullet(s)(x)$ ごとに第一座標を $a$ に固定すれば、積側の同値関係を生成する移行になる。逆方向も同じ生成関係から従うので、代表元の選択に依存しない。両合成は恒等写像である。空図式では両辺とも空集合なので、この場合も比較写像は全単射である。[比較射による保存判定](../../CAT/CAT2-11/index.md#prop-cat2-11-comparison)により、すべての小さい余極限が保存される。

従って [局所可呈示圏からの左随伴の判定](#thm-catb3-08-adjoint-criterion)から $F$ は右随伴を持つ。値を具体的に計算すると $R(Y)=\mathbf{Set}(A,Y)$ である。$g:Y\to Z$ に対して $R(g)(t)=g\circ t$ と置けば、恒等射・合成を保つ。二つの対応

$$
f:A\times X\to Y
\quad\longmapsto\quad
\widehat f(x)(a)=f(a,x),
$$

$$
k:X\to R(Y)
\quad\longmapsto\quad
\check k(a,x)=k(x)(a)
$$

は互いに逆である。実際、$\check{\widehat f}(a,x)=f(a,x)$、$\widehat{\check k}(x)(a)=k(x)(a)$ が各元で成立する。写像 $p:X'\to X$、$g:Y\to Z$ に対して

$$
\widehat{fF(p)}(x')(a)=f(a,p(x')),
$$

$$
\widehat{gf}(x)(a)=g(f(a,x))
$$

である。一方、右側のHom集合での前合成と後合成はそれぞれ

$$
(\widehat f\circ p)(x')(a)=f(a,p(x')),
$$

$$
(R(g)\circ\widehat f)(x)(a)=g(f(a,x))
$$

となるので、[二変数自然性の分解](../../CAT/CAT2-08/index.md#prop-cat2-08-separate-naturality)により対応は自然である。$A=\varnothing$ なら $F(X)=\varnothing$、$R(Y)$ は一元集合となる。

### 非保存の反例

関手 $T:\mathbf{Set}\to\mathbf{Set}$ を $T(X)=X\times X$、$T(f)=f\times f$ とする。$X=\{a\}$、$Y=\{b\}$ について余積の比較写像は

$$
(X\times X)\sqcup(Y\times Y)\to
(X\sqcup Y)\times(X\sqcup Y).
$$

像は $(a,a),(b,b)$ の二つであり、$(a,b),(b,a)$ は像にない。比較写像が全射でないため余積を保存しない。[左随伴の余極限保存](../../CAT/CAT2-11/index.md#thm-cat2-11-left-preserves)の必要条件に反するので $T$ は右随伴を持たない。集合の圏は局所可呈示でも、関手の保存条件を省くことはできない。

## 6. 演習

### CATB3-08-A01 comma圏の射

- Level: A

$F=1_{\mathbf{Set}}$、$d=\{0,1\}$、$x=\{a,b\}$、$z=\{p,q\}$ とする。$u(a)=0,u(b)=1$、$v(p)=1,v(q)=0$ のとき、$(x,u)\to(z,v)$ の射をすべて求めよ。

<!-- solution-start -->
**詳細解答。** [双対の解集合条件](#def-catb3-08-dual-solution)と同じ向きの式 $vh=u$ が必要である。$v(h(a))=0$ を満たすのは $h(a)=q$、$v(h(b))=1$ を満たすのは $h(b)=p$ だけである。この写像は両式を満たすので唯一の射となる。
<!-- solution-end -->

### CATB3-08-A02 候補の大小

- Level: A

$F=1_{\mathbf{Set}}$、$d=\{0,1\}$ とし、生成対象を有限集合の基数代表 $0=\varnothing$、$1=\{0\}$、$2=\{0,1\}$ の三つに制限した小さい候補圏を作る。その対象数を求めよ。また、全候補の間の射が集合をなす理由を説明せよ。

<!-- solution-start -->
**詳細解答。** 第一成分が $n$ の候補は写像 $n\to d$ と一対一に対応し、個数は $2^n$ である。従って $1+2+4=7$ 個となる。二候補間の射は有限集合間の写像のうち色付けを保つものだけなので有限集合であり、49個の順序付き候補対にわたる非交和も有限集合である。これは[弱終対象の構成](#thm-catb3-08-weak-terminal)における小ささの確認を具体化したものである。ただしこの三対象だけでは任意の集合のフィルター余極限表示を得られるとは主張していない。
<!-- solution-end -->

### CATB3-08-A03 反対圏への変換

- Level: A

$u:Fx\to d$、$e:Fq\to d$、$h:x\to q$ が $eF(h)=u$ を満たすとする。反対圏で三射の型と因子分解式を書け。

<!-- solution-start -->
**詳細解答。** 反対圏では $u^{\mathrm{op}}:d\to F^{\mathrm{op}}x$、$e^{\mathrm{op}}:d\to F^{\mathrm{op}}q$、$h^{\mathrm{op}}:q\to x$ となる。合成順も逆になるため

$$
u^{\mathrm{op}}=F^{\mathrm{op}}(h^{\mathrm{op}})e^{\mathrm{op}}.
$$

これは[解集合条件](../../CAT/CAT2-12/index.md#def-cat2-12-solution-set)で $G=F^{\mathrm{op}}$ と置いた式である。
<!-- solution-end -->

### CATB3-08-A04 空余極限の必要性

- Level: A

定値関手 $T:\mathbf{Set}\to\mathbf{Set}$ がすべての対象を一元集合、すべての射を恒等写像に送るとする。右随伴を持つか。

<!-- solution-start -->
**詳細解答。** 空図式の余極限は空集合である。ところが $T(\varnothing)$ は一元集合であり、例えば二元集合への写像が二つあるため始対象でない。従って空余極限を保存しない。[左随伴の余極限保存](../../CAT/CAT2-11/index.md#thm-cat2-11-left-preserves)に反するので右随伴を持たない。
<!-- solution-end -->

### CATB3-08-B01 候補圏を実際に組み立てる

- Level: B

$F=1_{\mathbf{Set}}$、$d=\{0,1\}$ とし、候補を空集合および一元集合の色付けに制限する。候補圏の全対象と非恒等射を求め、第一成分を取る図式の余極限と $e:q\to d$ を計算せよ。

<!-- solution-start -->
**詳細解答。** 対象は空写像の対 $k_\varnothing$ と、一元集合の元を0または1へ送る対 $k_0,k_1$ の三つである。非恒等射は $k_\varnothing\to k_0$ と $k_\varnothing\to k_1$ の空写像だけである。一元集合間の唯一の写像は異なる色を保たないから $k_0,k_1$ 間に射はない。

第一成分の図式は二つの一元集合に空集合から射が向く形である。その余極限は二つの一元集合の非交和 $q=\{p_0,p_1\}$ となる。実際、任意の余錐は二つの元の行き先を自由に定めることに等しく、$q$ からの媒介写像が唯一存在する。色付けによる余錐を束ねる射は $e(p_i)=i$ である。任意の $u:x\to d$ に対して $h(t)=p_{u(t)}$ とすれば $eh=u$ となる。ここでは $e$ が全単射なので候補は弱終対象にとどまらず終対象である。
<!-- solution-end -->

### CATB3-08-B02 構造射から媒介射を作る

- Level: B

[表示対象からの弱終対象の構成](#thm-catb3-08-weak-terminal)の記号を使う。$A_i\xrightarrow{A(s)}A_l$ が表示図式の射であるとき、$u:Fx\to d$ から作った二つの対の間に射が存在すること、および $eF(h)=u$ が成立することを示せ。

<!-- solution-start -->
**詳細解答。** $v_i=uF(c_i)$、$v_l=uF(c_l)$ とおく。余錐の条件 $c_lA(s)=c_i$ を使うと

$$
\begin{aligned}
v_lF(A(s))
&=uF(c_l)F(A(s))\\
&=uF(c_lA(s))\\
&=uF(c_i)=v_i.
\end{aligned}
$$

従って $A(s)$ は候補圏の射である。候補圏の余極限の脚を $b_i=j_{(A_i,v_i)}$ とすると $b_lA(s)=b_i$ となる。$x$ の余極限性によって唯一の $h:x\to q$ が $hc_i=b_i$ を満たす。各 $i$ で

$$
\begin{aligned}
eF(h)F(c_i)&=eF(hc_i)\\
&=eF(b_i)=v_i\\
&=uF(c_i).
\end{aligned}
$$

$F$ の[余極限保存](../../CAT/CAT2-11/index.md#def-cat2-11-preserve-colimit)から $F(c_i)$ が余極限の脚なので、これらの脚への前合成が一致する二射は[余極限の普遍性](../../CAT/CAT2-05/index.md#def-cat2-05-colimit)により等しい。よって $eF(h)=u$ である。最後の一意性は $h$ がcomma圏で唯一であることではなく、二射 $Fx\to d$ の等しさを得るために使っている。
<!-- solution-end -->

### CATB3-08-B03 対角関手の右随伴

- Level: B

[対角関手](../../CAT/CAT2-08/index.md#thm-cat2-08-diagonal-product) $\Delta:\mathbf{Set}\to\mathbf{Set}\times\mathbf{Set}$ を $\Delta X=(X,X)$、$\Delta f=(f,f)$ で定める。小さい余極限を保存することを示し、右随伴を計算せよ。

<!-- solution-start -->
**詳細解答。** 積圏の射は二つの写像の組で、合成は成分ごとである。

図式 $X_i$ の余極限を $X$、脚を $c_i$ とする。$\Delta X_i$ から $(Y,Z)$ への余錐は、$X_i\to Y$ と $X_i\to Z$ の二つの余錐である。

二つの余錐の脚をそれぞれ $u_i:X_i\to Y$、$v_i:X_i\to Z$ と書く。[余極限の普遍性](../../CAT/CAT2-05/index.md#def-cat2-05-colimit)から唯一の写像 $f:X\to Y$ と $g:X\to Z$ が存在し、各 $i$ について $fc_i=u_i$、$gc_i=v_i$ が成り立つ。従って $(f,g)\Delta(c_i)=(u_i,v_i)$ である。

従って $(f,g)$ が唯一の媒介射となり、$\Delta X$ は余極限である。空図式でも $X=\varnothing$ からの各写像は唯一である。

[局所可呈示圏からの左随伴の判定](#thm-catb3-08-adjoint-criterion)により右随伴が存在する。具体的に、写像の組 $(f,g)$ に写像 $x\mapsto(f(x),g(x))$ を対応させれば

$$
(\mathbf{Set}\times\mathbf{Set})(\Delta X,(Y,Z))
\cong\mathbf{Set}(X,Y\times Z).
$$

逆は二射影との合成である。$p:X'\to X$ で前合成すると $(f(p(x')),g(p(x')))$ になり、$(a,b):(Y,Z)\to(Y',Z')$ で後合成すると $(a(f(x)),b(g(x)))$ となる。従って対応は自然であり、右随伴は $(Y,Z)\mapsto Y\times Z$、射 $(a,b)\mapsto a\times b$ である。
<!-- solution-end -->

### CATB3-08-B04 局所可呈示性がない場合

- Level: B

すべての順序数の順序圏 $\mathbf{Ord}$ から一対象一射の圏 $\mathbf1$ への唯一の関手 $F$ を考える。$\mathbf{Ord}$ は局所小かつ余完備で、$F$ は小さい余極限を保存するが右随伴を持たないことを示し、どの仮定が不足しているか説明せよ。

<!-- solution-start -->
**詳細解答。** [解集合条件を省けない反例](../../CAT/CAT2-12/index.md#prop-cat2-12-no-solution)の反対圏を取る。各Homは空集合か一元集合なので局所小である。小さい図式の対象は集合個の順序数であり、その上限 $\gamma=\bigcup_i\alpha_i$ が最小上界、従って余極限になる。空図式では0が始対象である。$\mathbf1$ ではすべての小さい図式の余極限が唯一の対象なので $F$ は余極限を保存する。

右随伴 $R$ があるとすれば $\mathbf1(F\alpha,*)$ は一元集合なので、$\mathbf{Ord}(\alpha,R*)$ も全順序数 $\alpha$ に対して一元集合となる。すなわち $\alpha\le R*$ が必要だが、$\alpha=R*+1$ で矛盾する。

さらに任意の生成候補集合 $G$ の上限を $\delta$ とすれば、$G$ を値域とする小さい図式の余極限は $\delta$ 以下である。$\delta+1$ はこのように生成できない。従って [局所可呈示圏の定義](../CATB3-05/index.md#def-catb3-05-locally-presentable) の生成条件が成立しない。実際、任意の解集合候補も上限を超える順序数から射を受けられない。
<!-- solution-end -->

### CATB3-08-C01 冪集合で随伴判定を完結させる

- Level: C

集合 $S$ の冪集合を包含で順序付けた圏を $\mathcal P(S)$ とする。部分集合 $A\subseteq S$ に対して $F(X)=A\cap X$ とする。有限部分集合による生成から $\mathcal P(S)$ が局所有限表示圏であることを確認し、$F$ がすべての小さい余極限を保存すること、右随伴の具体式およびその随伴条件を示せ。

<!-- solution-start -->
**詳細解答。** まず $\mathcal P(S)$ は小さい順序圏であり、任意の図式の余極限は対象の和集合である。各対象はその和集合に含まれ、任意の上界は和集合を含むためである。空図式の余極限は空集合となる。

有限部分集合 $P$ を固定し、小さいフィルター圏 $I$ 上の図式 $(X_i)$ の余極限 $\bigcup_{i\in\operatorname{Ob} I}X_i$ を考える。以下、和集合の添字 $i$ は $I$ の対象を動く。既習の[λ-表示性の段階判定](../CATB3-04/index.md#prop-catb3-04-stage)を用いるため、まずすべての小さい余極限が存在することを上で確認した。

$P\subseteq\bigcup_iX_i$ なら各 $p\in P$ はある段階 $X_{i_p}$ に属する。$P$ は有限なのでフィルター性から全ての段階の共通段階 $i$ が存在し、$P\subseteq X_i$ となる。

$P$ が空なら添字圏の非空性から任意の段階を取れる。

二段階から $P$ の射が出ている場合、それらの共通段階で二射は順序圏の射の一意性によって一致する。逆に段階への射が存在すれば和集合への射も存在する。

これで[λ-表示性の段階判定](../CATB3-04/index.md#prop-catb3-04-stage)を $\lambda=\aleph_0$ として確認した。従って有限部分集合は有限表示対象である。

任意の $X\subseteq S$ は有限部分集合の和集合であり、その添字は包含順序で非空かつ有限個の対象に共通上界（有限和集合）がある。平行射は高々一本なのでフィルター圏である。有限部分集合全体は冪集合の部分集合であり、固定した集合からこのような表示を作れる。余完備性と合わせて [局所有限表示圏の定義](../CATB3-03/index.md#def-catb3-03-lfp) を満たす。特に $\lambda=\aleph_0$ とした[局所可呈示圏](../CATB3-05/index.md#def-catb3-05-locally-presentable)である。

次に $F$ は包含を保つから関手である。任意の小さい族 $(X_i)$ について

$$
\begin{aligned}
s\in A\cap\bigcup_iX_i
&\Longleftrightarrow s\in A,\ \exists i:\ s\in X_i\\
&\Longleftrightarrow \exists i:\ s\in A\cap X_i\\
&\Longleftrightarrow s\in\bigcup_i(A\cap X_i).
\end{aligned}
$$

空族でも双方とも空集合である。従って全小余極限を保存し、[局所可呈示圏からの左随伴の判定](#thm-catb3-08-adjoint-criterion)により右随伴が存在する。

その右随伴の候補を $R(Y)=(S\setminus A)\cup Y$ とする。[半順序圏の随伴判定](../../CAT/CAT2-08/index.md#thm-cat2-08-poset)では、すべての $X,Y\subseteq S$ について $F(X)\subseteq Y$ と $X\subseteq R(Y)$ が同値であればよい。実際、

$$
\begin{aligned}
A\cap X\subseteq Y
&\Longleftrightarrow
(\forall s\in X)\ (s\in A\Rightarrow s\in Y)\\
&\Longleftrightarrow X\subseteq(S\setminus A)\cup Y.
\end{aligned}
$$

$R$ は包含を保つ。両Hom集合はともに空か一元集合で、上の同値によって自然な全単射が得られる。自然性は、どちらの合成経路も同じ始域と終域の間の唯一の射になることから従う。

例えば $S=\{1,2,3\}$、$A=\{1,2\}$、$Y=\{2\}$ のとき $R(Y)=\{2,3\}$ であり、$F(X)\subseteq Y$ となる最大の $X$ が実際に $\{2,3\}$ になる。
<!-- solution-end -->

## 7. まとめ

局所可呈示圏では、表示対象の集合による生成が候補圏を小さくする。余完備性と余極限保存からその候補圏の余極限を作り、任意の射を一個の候補へ因子分解できる。Freydの定理を反対圏へ適用すると、局所可呈示圏から局所小圏への関手が右随伴を持つための必要十分条件は全小余極限の保存であると分かる。次の部では、基底圏の射に沿って対象を移すファイブレーションを扱う。
