# CATB2-05 重み付き極限と余極限

## 1. 脚の本数だけでなく、その構造を指定する

通常の[定値図式と錐](../../CAT/CAT2-01/index.md#def-cat2-01-cone)では、図式の各対象 $Dj$ に向けて試験対象 $X$ から一本ずつ脚を出し、図式の射に沿った一致を要求する。例えば二対象の離散図式では二本の脚を独立に選び、その選び方全体を積が表す。

では一つの対象へ二本の脚を出したいときや、脚の集まり自体に線形構造を持たせたいときはどうすればよいか。各 $j$ における脚の添字や構造を、別の豊穣関手で指定する。前講の[豊穣自然変換のHom対象](../CATB2-04/index.md#def-catb2-04-natural-hom)を使えば、条件を満たす脚の族全体も基底の対象として扱える。この族を一つの対象からのHomで表すのが本講の中心である。

基底 $\mathcal V$ は局所小な[対称モノイダル圏](../../CAT/CAT4-03/index.md#def-cat4-03-symmetric)で、[右閉](../../CAT/CAT4-05/index.md#def-cat4-05-right-closed)かつ[完備](../../CAT/CAT2-04/index.md#def-cat2-04-complete)とする。単位を $I$、内部Homを $[U,Z]$ と書く。基底自身の豊穣化 $\underline{\mathcal V}$ は[自己豊穣化の定理](../CATB2-04/index.md#thm-catb2-04-self-enrichment)による。添字豊穣圏 $\mathcal J$ の対象集合は小さいとし、$\mathcal C$ は同じ基底上の豊穣圏とする。積・等化子の存在は基底についての仮定であり、$\mathcal C$ の極限の存在は別途問題になる。

以下では[Mac Laneの整合性定理](../../CAT/CAT4-02/index.md#thm-cat4-02-coherence)により括弧・単位子を適宜省略する。テンソル因子を交換する場合には対称性を用いる。

## 2. 重み付きの脚を集める

豊穣関手 $D:\mathcal J\to\mathcal C$ が図式を与える。固定した $X$ から各 $Dj$ へ向かうHomを

$$
H_X(j)=\mathcal C(X,Dj)
$$

と置く。[豊穣表現可能関手の関手律](../CATB2-04/index.md#prop-catb2-04-representable-functor)と $D$ の関手律により $H_X$ は共変豊穣関手である。具体的にその作用は

$$
\mathcal J(i,j)\otimes\mathcal C(X,Di)
\xrightarrow{D_{ij}\otimes1}
\mathcal C(Di,Dj)\otimes\mathcal C(X,Di)
\xrightarrow{m}\mathcal C(X,Dj)
$$

であり、図式の射を脚の後ろにつなぐ。

ここに共変豊穣関手 $W:\mathcal J\to\underline{\mathcal V}$ を指定する。$Wj$ は脚の添字や脚に課す構造を与え、$W$ の作用は図式の射に沿って添字を移す。これが極限側の重みである。例えば集合では $Wj$ の各元が一本の脚を指定し、自然性が脚同士の整合を要求する。

$W$ から $H_X$ への豊穣自然変換を集めたHom対象を $N(W,H_X)$ と書く。[自然変換のHom対象の普遍性](../CATB2-04/index.md#prop-catb2-04-natural-hom-universal)によれば、任意の基底の対象 $P$ からこの対象への射は自然性を満たす族

$$
t_j:P\otimes Wj\to\mathcal C(X,Dj)
$$

と一対一に対応する。$P=I$ の場合は通常の豊穣自然変換である。$P$ も動かすのは、単に変換の個数が一致するだけでなく、基底の構造まで保存する普遍性を得るためである。

## 3. 重み付き極限

通常の極限は錐の集合を表現した。ここでは $N(W,H_X)$ をHom対象で表現する。候補 $L$ の脚 $\lambda_j$ に、$X$ から $L$ への射を前合成すれば $X$ からの脚が得られる。この操作がすべての $X$ について同型になることを要求する。

<a id="def-catb2-05-weighted-limit"></a>

<!-- formal-statement-start -->
> **定義（重み付き極限）**
>
> 局所小な対称右閉・完備モノイダル圏 $\mathcal V$ 上の豊穣圏 $\mathcal J,\mathcal C$ を取り、$\mathcal J$ の対象集合は小さいとする。図式 $D:\mathcal J\to\mathcal C$ と重み $W:\mathcal J\to\underline{\mathcal V}$ は豊穣関手とする。
>
> 対象 $L$ と豊穣自然変換 $\lambda:W\Rightarrow\mathcal C(L,D-)$ が重み付き極限をなすとは、各 $X\in\mathcal C$ に対して $\lambda$ から前合成で誘導される射

$$
\Phi_X:\mathcal C(X,L)\longrightarrow N(W,\mathcal C(X,D-))
$$

> が基底 $\mathcal V$ の同型であることをいう。$L$ を $\{W,D\}$ と書く。誘導射は次の族に対応する。

$$
\mathcal C(X,L)\otimes Wj
\xrightarrow{\sigma}Wj\otimes\mathcal C(X,L)
\xrightarrow{\lambda_j\otimes1}
\mathcal C(L,Dj)\otimes\mathcal C(X,L)
\xrightarrow{m}\mathcal C(X,Dj).
$$
<!-- formal-statement-end -->

ここで $\lambda_j:Wj\to\mathcal C(L,Dj)$ は自然変換の成分を評価で表した射である。誘導族の自然性を確認するには、$\mathcal J(i,j)$ の作用と $\lambda_i$ の脚、$\mathcal C(X,L)$ の射を順に合成する。$\lambda$ の自然性によって先に $\mathcal J(i,j)$ を $Wi$ に作用させても同じ脚になり、豊穣圏の結合律によって $X$ からの射をどちらの段階で前合成しても結果は一致する。従って [パラメータ付き自然性](../CATB2-04/index.md#def-catb2-04-natural-family)を満たし、上の $\Phi_X$ が確かに存在する。

<!-- definition-example-start: def-catb2-05-weighted-limit -->
**定義の確認。** 基底を集合、添字圏を対象一つ・恒等射だけの圏、図式の値を $A=\{0,1,2\}$、重みの値を $S=\{p,q\}$ とする。どちらの関手も恒等射を恒等射へ送るので自然性の追加条件はない。$L=A^S$ を $S$ から $A$ への写像の集合とし、$\lambda_p,\lambda_q:L\to A$ はそれぞれ $p,q$ での評価とする。

任意の集合 $X$ について、誘導写像は $f:X\to L$ に族 $(\lambda_p f,\lambda_q f)$ を対応させる。逆に二写像 $g_p,g_q:X\to A$ から

$$
f(x)(p)=g_p(x),\qquad f(x)(q)=g_q(x)
$$

と定めれば $f(x)$ は $S\to A$ の写像となる。両操作は互いに逆である。従って $\Phi_X$ は全単射であり、重み付き極限は $3^2=9$ 元を持つ。通常の一対象図式の極限 $A$ は3元なので、重みを変えると極限も変わる。
<!-- definition-example-end -->

## 4. 余極限では重みが反変になる

余極限の脚は $Dj$ から試験対象 $X$ へ向かう。今度は

$$
K_X(j)=\mathcal C(Dj,X)
$$

と置く。$i\to j$ に沿って $Dj\to X$ を $Di\to X$ に移すには前合成するため、$K_X$ は $\mathcal J^{\mathrm{op}}$ 上の豊穣関手になる。反対豊穣圏はHomの向きを逆転させ、対称性で合成の入力を交換したものである（[豊穣Yonedaの反変形](../CATB2-04/index.md#thm-catb2-04-enriched-yoneda)参照）。

そこで余極限の重みも $W:\mathcal J^{\mathrm{op}}\to\underline{\mathcal V}$ とする。極限側と同じ文字 $W$ を使うが定義域が異なる。脚の族を余極限候補 $Q$ からのHom対象で表したい。

<a id="def-catb2-05-weighted-colimit"></a>

<!-- formal-statement-start -->
> **定義（重み付き余極限）**
>
> 局所小な対称右閉・完備モノイダル圏 $\mathcal V$ 上の豊穣圏 $\mathcal J,\mathcal C$ を取り、$\mathcal J$ の対象集合は小さいとする。図式 $D:\mathcal J\to\mathcal C$ と重み $W:\mathcal J^{\mathrm{op}}\to\underline{\mathcal V}$ は豊穣関手とする。
>
> 対象 $Q$ と豊穣自然変換 $\iota:W\Rightarrow\mathcal C(D-,Q)$ が重み付き余極限をなすとは、各 $X\in\mathcal C$ に対して $\iota$ から後合成で誘導される射

$$
\Psi_X:\mathcal C(Q,X)\longrightarrow N(W,\mathcal C(D-,X))
$$

> が基底 $\mathcal V$ の同型であることをいう。$Q$ を $W\star D$ と書く。誘導射は次の族に対応する。

$$
\mathcal C(Q,X)\otimes Wj
\xrightarrow{1\otimes\iota_j}
\mathcal C(Q,X)\otimes\mathcal C(Dj,Q)
\xrightarrow{m}\mathcal C(Dj,X).
$$
<!-- formal-statement-end -->

誘導族は、$\iota$ の自然性と合成の結合律により自然である。実際、$i\to j$ に対応するHom対象からの入力を $Dj$ への脚の前に合成してから $Q\to X$ を後合成する経路と、先に $Q\to X$ を後合成してから前合成する経路は結合律で一致する。重みの作用との一致は $\iota$ の自然性で保証される。

<!-- definition-example-start: def-catb2-05-weighted-colimit -->
**定義の確認。** 第3節と同じ一対象の集合値図式と重み $S$ を用いる。今度は $Q=S\times A$ として $\iota_s:A\to Q$ を $a\mapsto(s,a)$ とする。$f:Q\to X$ は二写像 $g_s=f\iota_s:A\to X$ を与える。逆に $g_p,g_q$ があれば $f(s,a)=g_s(a)$ と置ける。この定義は $Q$ の各元で一意であり、$f\iota_s=g_s$、逆方向も $f(s,a)$ が元に戻る。恒等射以外の自然性条件はなく、$\Psi_X$ は全単射である。$Q$ は $2\cdot3=6$ 元を持つ。
<!-- definition-example-end -->

## 5. 表現普遍性から分かること

重み付き極限・余極限の定義は、基底のHom対象の同型を要求している。そこから通常の射による一意な因子分解も取り出せる。さらに普遍写像が試験対象の射と両立することを確かめる。

<a id="thm-catb2-05-weighted-uniqueness"></a>

<!-- formal-statement-start -->
> **定理（重み付き極限・余極限の普遍性と一意性）**
>
> 局所小な対称右閉・完備モノイダル圏を基底とし、小さい対象集合を持つ添字豊穣圏からの図式 $D$ を取る。共変豊穣関手 $W$ による重み付き極限 $(L,\lambda)$ が存在するとする。
>
> 任意の試験対象 $X$ と豊穣自然変換
>
$
t:W\Rightarrow\mathcal C(X,D-)
$

> に対し、$\lambda$ を前合成して $t$ を得る台となる圏の射 $f:X\to L$ が一意に存在する。
>
> 反変豊穣関手 $W$ による重み付き余極限 $(Q,\iota)$ が存在するとする。任意の豊穣自然変換

$
t:W\Rightarrow\mathcal C(D-,X)
$

> に対し、$\iota$ を後合成して $t$ を得る射 $Q\to X$ が一意に存在する。
>
> 二つの重み付き極限は脚を保つ一意な同型で結ばれる。二つの重み付き余極限についても脚を保つ一意な同型が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

同型に単位対象からのHomを適用すると一意な因子分解が得られる。二つの候補の間で互いの脚を因子分解し、合成を恒等射と比較する。

<!-- proof-start -->
### 証明

[台となる圏の構成](../CATB2-01/index.md#thm-catb2-01-underlying-category)により、$X\to L$ は基底の射 $I\to\mathcal C(X,L)$ である。[Hom対象の普遍性](../CATB2-04/index.md#prop-catb2-04-natural-hom-universal)の $P=I$ の場合から、$t$ は基底の射 $b:I\to N(W,H_X)$ と対応する。$\Phi_X$ が同型なので

$$
f=\Phi_X^{-1}b:I\to\mathcal C(X,L)
$$

が唯一の逆像である。$\Phi_X$ の定義によりこれが脚の前合成で $t$ を復元する。余極限の場合も $b:I\to N(W,K_X)$ に対して $g=\Psi_X^{-1}b$ であり、脚の後合成が $b$ に対応する。

極限候補を $(L,\lambda),(L',\lambda')$ とする。$X=L'$ として $\lambda'$ を因子分解すると $f:L'\to L$、$X=L$ として $\lambda$ を因子分解すると $g:L\to L'$ を得る。台となる圏の射による前合成を $\circ$ で書けば、各 $j$ で

$$
\lambda_j\circ f=\lambda'_j,\qquad
\lambda'_j\circ g=\lambda_j.
$$

従って $(\lambda_j\circ f)\circ g=\lambda'_j\circ g=\lambda_j$ である。恒等射 $1_L$ も同じ脚を与えるので、因子分解の一意性から $fg=1_L$。同じく $(\lambda'_j\circ g)\circ f=\lambda'_j$ より $gf=1_{L'}$ を得る。

余極限候補 $(Q,\iota),(Q',\iota')$ には $h:Q\to Q'$ と $k:Q'\to Q$ が一意に存在し、$h\circ\iota_j=\iota'_j$、$k\circ\iota'_j=\iota_j$ を満たす。$(kh)\circ\iota_j=k\circ\iota'_j=\iota_j$ より $kh=1_Q$、$(hk)\circ\iota'_j=h\circ\iota_j=\iota'_j$ より $hk=1_{Q'}$ である。いずれも脚を保つ射そのものが一意なので、求める同型も一意である。
<!-- proof-end -->

この表現同型の自然性も、前合成・後合成から直接確認できる。極限側で $v:X'\to X$ を取る。$f:X\to L$ を先に $v$ と合成してから脚を作ると各成分は $\lambda_j\circ(fv)$ となる。一方、先に脚を作ると $(\lambda_j\circ f)\circ v$ となる。豊穣圏の結合律で一致する。単に台の射でなく、$\mathcal C(X',X)\otimes\mathcal C(X,L)\otimes Wj$ 全体を入力とした二つの構造射についても、対称性で $Wj$ を先頭に移せば同じ結合律で一致する。第2節のHom対象の普遍性で成分が全て一致することから、同型は $X$ について豊穣自然である。余極限側で $v:X\to X'$ とすれば $v\circ(f\circ\iota_j)=(vf)\circ\iota_j$ であり、$\mathcal C(X,X')\otimes\mathcal C(Q,X)\otimes Wj$ を入力とする構造射も同じ結合律で一致する。

## 6. 一元集合の重みで通常の極限を取り戻す

普通の圏は集合に豊穣化した場合である。通常の錐は各対象へ一本の脚を持つので、各対象に一元集合を割り当て、各射を一元集合の恒等写像に送る重みを考える。

<a id="thm-catb2-05-conical-set"></a>

<!-- formal-statement-start -->
> **定理（通常の極限・余極限は一元集合の重みの場合）**
>
> 基底を $\mathbf{Set}$（直積と一元集合によるモノイダル構造）とし、小さい圏 $\mathcal J$ から局所小圏 $\mathcal C$ への図式 $D$ を取る。
>
> 定値関手 $W:\mathcal J\to\mathbf{Set}$ の値が一元集合なら、$W$ による重み付き極限と通常の極限は同じ普遍性を持つ。
>
> 定値関手 $W:\mathcal J^{\mathrm{op}}\to\mathbf{Set}$ の値が一元集合なら、$W$ による重み付き余極限と通常の余極限は同じ普遍性を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

一元集合からHom集合への写像は一本の脚を選ぶ。重みの作用が恒等写像であるため自然性が錐・余錐の整合条件になる。

<!-- proof-start -->
### 証明

$Wj=\{*\}$ とする。極限側の成分 $t_j:\{*\}\to\mathcal C(X,Dj)$ は脚 $t_j(*)=\ell_j:X\to Dj$ と一対一に対応する。$u:i\to j$ に対する自然性は

$$
D(u)t_i(*)=t_j(W(u)(*))=t_j(*),
$$

すなわち $D(u)\ell_i=\ell_j$ である。これは[定値図式と錐](../../CAT/CAT2-01/index.md#def-cat2-01-cone)の条件そのものである。

集合の場合、[Hom対象の構成](../CATB2-04/index.md#def-catb2-04-natural-hom)は成分の写像の直積から自然性を満たす族を取り出した部分集合である。よって $N(W,H_X)$ は錐の集合と全単射であり、$\Phi_X$ は $f:X\to L$ を脚 $\lambda_j f$ の族に送る通常の写像と一致する。その全単射性は[図式の極限](../../CAT/CAT2-01/index.md#def-cat2-01-limit)の存在・一意な因子分解条件と同値である。

余極限側では成分が $t_j:\{*\}\to\mathcal C(Dj,X)$ で、脚を $r_j=t_j(*)$ と書く。$u:i\to j$ に対応する反対圏の射 $j\to i$ に対して自然性は

$$
r_jD(u)=t_i(W(u^{\mathrm{op}})(*))=r_i.
$$

これは[余錐](../../CAT/CAT2-05/index.md#def-cat2-05-cocone)の条件である。従って $N(W,K_X)$ は余錐の集合であり、$\Psi_X$ は $f:Q\to X$ を脚 $f\iota_j$ の族へ送る。その全単射性は[図式の余極限](../../CAT/CAT2-05/index.md#def-cat2-05-colimit)の因子分解条件と同値である。
<!-- proof-end -->

例えば矢印一本 $0\xrightarrow{u}1$ の集合値図式 $D0=\{a,b\}$、$D1=\{c\}$、$D(u)(a)=D(u)(b)=c$ を取る。一元集合重みの極限は $D0$ で、脚は恒等写像と $D(u)$ である。任意の錐の第二脚は第一脚に $D(u)$ を合成したものに強制される。余極限は $D1$ で、脚は $D(u)$ と恒等写像である。余錐の第一脚は第二脚を $D(u)$ と合成したものに強制される。

一般の基底では、一元集合の代わりに単位 $I$ を使う場合にも、各Hom対象から $I$ への作用を指定する必要がある。$I$ は一般に終対象とは限らないので、任意の豊穣圏でそのような定値豊穣関手が自動的に得られるとは限らない。また、台となる圏での普遍性だけから基底のHom対象の同型を結論してはいけない。本節の定理は集合の場合についての主張である。

## 7. 基底自身における一対象図式

基底に線形構造があるとき、重み付き極限・余極限は単なる脚の複製を超える。例えば一つのベクトル空間 $A$ に向けた脚をベクトル空間 $S$ で添字付けし、添字に関しても線形であることを要求できる。これを一般の閉モノイダル圏で計算する。

添字圏を対象 $*$ 一つ、Hom対象 $I$、合成と単位を単位子と恒等射で与えた豊穣圏とする。図式・重みはそれぞれ対象 $A,S$ を指定し、作用は単位子で決まる。自然性は単位律だけなので、前講の等化子の二射が一致し、$N(W,H_X)=[S,[X,A]]$ となる。余極限側では $N(W,K_X)=[S,[A,X]]$ となる。

<a id="thm-catb2-05-single-object"></a>

<!-- formal-statement-start -->
> **定理（一対象図式の重み付き極限・余極限）**
>
> 局所小な対称右閉・完備モノイダル圏 $\mathcal V$ の自己豊穣化を対象圏とする。添字豊穣圏は一対象でHom対象が $I$、作用は単位子とする。図式の値が $A$、重みの値が $S$ のとき、重み付き極限と重み付き余極限はそれぞれ

$$
\{W,D\}=[S,A],\qquad W\star D=S\otimes A
$$

> で与えられる。極限の脚は評価射の転置、余極限の脚はテンソル積の恒等射の転置で与えられる。
<!-- formal-statement-end -->

### 証明の見取り図

閉構造の転置を二回行い、試験対象からのHom対象と自然変換のHom対象が同型になることを確かめる。

<!-- proof-start -->
### 証明

[評価とカリー化の普遍性](../../CAT/CAT4-05/index.md#thm-cat4-05-evaluation-curry)から、任意の基底の対象 $P$ に対して次の対応は自然な全単射である。

$$
\begin{aligned}
\mathcal V(P,[X,[S,A]])
&\cong\mathcal V(P\otimes X,[S,A])\\
&\cong\mathcal V(P\otimes X\otimes S,A)\\
&\cong\mathcal V(P\otimes S\otimes X,A)\\
&\cong\mathcal V(P,[S,[X,A]]).
\end{aligned}
$$

中央では対称性で $X,S$ を交換し、最終行では二回転置した。$L=[S,A]$ の脚 $\lambda:S\to[[S,A],A]$ は $S\otimes[S,A]\to A$ を対称性で入れ替えて評価する射の転置である。上の対応で $P\to[X,L]$ の逆転置を $b:P\otimes X\to L$ とすると、三引数の射は

$$
P\otimes S\otimes X
\xrightarrow{1\otimes\sigma}P\otimes X\otimes S
\xrightarrow{b\otimes1}[S,A]\otimes S
\xrightarrow{e_{S,A}}A.
$$

これは第3節の誘導射 $\Phi_X$ をさらに逆転置したものに一致する。従って $\mathcal V(P,\Phi_X)$ が任意の $P$ で全単射となる。一般に射 $h:B\to C$ がこの性質を持てば、$P=C$ で $1_C$ の逆像 $k:C\to B$ を取り $hk=1_C$ を得る。$P=B$ では $hkh=h=h1_B$ なので単射性から $kh=1_B$。従って $h$ は同型であり、$\Phi_X$ も同型である。

余極限側では

$$
\begin{aligned}
\mathcal V(P,[S\otimes A,X])
&\cong\mathcal V(P\otimes(S\otimes A),X)\\
&\cong\mathcal V((P\otimes S)\otimes A,X)\\
&\cong\mathcal V(P\otimes S,[A,X])\\
&\cong\mathcal V(P,[S,[A,X]]).
\end{aligned}
$$

$Q=S\otimes A$ の脚 $\iota:S\to[A,Q]$ は $1_{S\otimes A}$ の転置である。$P\to[Q,X]$ の逆転置 $b:P\otimes Q\to X$ を取ると、上の対応で得る三引数の射は $P\otimes S\otimes A$ を結合子で $P\otimes Q$ に移し、$b$ を適用するものである。これは $\iota$ の評価が恒等射であるため、第4節の $\Psi_X$ を逆転置したものに等しい。先ほどの全単射性による同型判定を $\Psi_X$ に適用すれば、余極限の普遍性も成立する。
<!-- proof-end -->

ベクトル空間の場合には $S=k^2$、$A=k^3$ とすれば、極限 $[S,A]$ は $3\times2$ 行列の空間、余極限 $S\otimes A$ は六つの基底テンソル $e_i\otimes f_j$ で張られる空間である。どちらも6次元だが、極限は評価で脚を出す空間、余極限は双線形写像を受け取る空間である。次元が等しいことだけが普遍性ではない。

## 8. 演習

### CATB2-05-A01 重みと図式の向き

- Level: A

$D:\mathcal J\to\mathcal C$ に対して、極限側の $\mathcal C(X,D-)$ と余極限側の $\mathcal C(D-,X)$ がそれぞれどちらの向きの関手か、$u:i\to j$ に沿う合成を書いて答えよ。

<!-- solution-start -->
**詳細解答。** 極限側は $f:X\to Di$ を $D(u)f:X\to Dj$ に送るので共変である。余極限側は $g:Dj\to X$ を $gD(u):Di\to X$ に送るので反変である。従って [重み付き極限](#def-catb2-05-weighted-limit)の重みは $\mathcal J$ 上、[重み付き余極限](#def-catb2-05-weighted-colimit)の重みは $\mathcal J^{\mathrm{op}}$ 上に必要である。
<!-- solution-end -->

### CATB2-05-A02 集合の重み付き極限

- Level: A

一対象・恒等射のみの図式で $A=\{0,1\}$、$S=\{a,b,c\}$ とする。重み付き極限の元を列挙し、評価射を求めよ。

<!-- solution-start -->
**詳細解答。** [一対象図式の重み付き極限・余極限](#thm-catb2-05-single-object)により $A^S$ である。順に $a,b,c$ での値を並べると $000,001,010,011,100,101,110,111$ の8元となる。評価射は $e_a(x_a,x_b,x_c)=x_a$、$e_b(x_a,x_b,x_c)=x_b$、$e_c(x_a,x_b,x_c)=x_c$。任意の三写像 $g_a,g_b,g_c:X\to A$ から $f(x)=(g_a(x),g_b(x),g_c(x))$ が一意に定まり、各 $e_sf=g_s$ となる。
<!-- solution-end -->

### CATB2-05-A03 集合の重み付き余極限

- Level: A

A02と同じ $A,S$ に対し余極限の元と脚を求めよ。$X=\{0,1\}$ に対して余極限からの写像は何本か。

<!-- solution-start -->
**詳細解答。** [一対象図式の重み付き極限・余極限](#thm-catb2-05-single-object)により $S\times A$ であり、元は $(a,0),(a,1),(b,0),(b,1),(c,0),(c,1)$。脚は $i_s(x)=(s,x)$ である。各元の行先は独立に2通りあるので写像は $2^6=64$ 本。脚ごとの写像は $2^2=4$ 本ずつだから三本の組は $4^3=64$ 組であり、$f(s,x)=g_s(x)$ で対応が明示できる。
<!-- solution-end -->

### CATB2-05-A04 空の重み

- Level: A

集合の一対象図式で値を任意の集合 $A$、重みを空集合とする。重み付き極限と余極限を求め、空集合 $A$ の場合も確認せよ。

<!-- solution-start -->
**詳細解答。** [一対象図式の重み付き極限・余極限](#thm-catb2-05-single-object)によって極限は $A^\varnothing$、余極限は $\varnothing\times A$ である。空集合から $A$ への写像は空写像ただ一つなので前者は一元集合である。後者には第一成分が存在しないので空集合である。$A=\varnothing$ の場合も空写像は一つであり、結論は変わらない。任意の $X$ から一元集合への写像も、空集合から $X$ への写像も唯一で、空の脚の族と対応する。
<!-- solution-end -->

### CATB2-05-B01 矢印図式と非定値重み

- Level: B

集合で $D0=\{a,b\},D1=\{0,1\}$、$D(u)(a)=D(u)(b)=0$ とする。$W0=\{p,q\},W1=\{r\}$、$W(u)(p)=W(u)(q)=r$ の重み付き極限を求めよ。任意の試験集合に対する普遍性も確認せよ。

<!-- solution-start -->
**詳細解答。** [重み付き極限](#def-catb2-05-weighted-limit)の脚は $g_p,g_q:X\to D0$ と $h_r:X\to D1$ で、自然性は $D(u)g_p=h_r=D(u)g_q$。$D(u)$ は定値0なので $h_r$ は定値0に強制され、$g_p,g_q$ は自由である。従って $L=D0\times D0$ の4元が候補となる。脚は二射影と定値0写像であり自然性を満たす。任意の族から $f(x)=(g_p(x),g_q(x))$ が定まり、三脚と合成すれば元の族になる。二射影が $f$ の二成分を指定するため一意である。
<!-- solution-end -->

### CATB2-05-B02 反変重みの余極限

- Level: B

集合で $D0=\{a\}$、$D1=\{b,c\}$、$D(u)(a)=b$ とする。$W1=\{p,q\}$、$W0=\{r\}$、$W(u^{\mathrm{op}})(p)=W(u^{\mathrm{op}})(q)=r$ とする。重み付き余極限の元と普遍性を求めよ。

<!-- solution-start -->
**詳細解答。** [重み付き余極限](#def-catb2-05-weighted-colimit)の脚を $g_r:D0\to X$、$h_p,h_q:D1\to X$ とすると、自然性は $h_p(b)=g_r(a)=h_q(b)$。$h_p(c),h_q(c)$ は独立である。従って $Q=\{B,C_p,C_q\}$ とし、$\iota_r(a)=B$、$\iota_p(b)=\iota_q(b)=B$、$\iota_p(c)=C_p$、$\iota_q(c)=C_q$ とする。この脚は自然性を満たす。任意の自然な族に対して $f(B)=g_r(a)$、$f(C_p)=h_p(c)$、$f(C_q)=h_q(c)$ と置けば、上の一致条件によって全ての脚の値が復元される。三元全部の値が指定されるため一意である。
<!-- solution-end -->

### CATB2-05-B03 線形な重みと評価

- Level: B

基底を $k$ 上のベクトル空間、$S=k^2,A=k^3$ とする。一対象図式の極限の脚を $s=(2,3)$ と $M=\begin{pmatrix}1&0\\0&1\\1&1\end{pmatrix}$ について評価せよ。また任意の線形写像 $X\otimes S\to A$ から極限への射を復元する式を書け。

<!-- solution-start -->
**詳細解答。** [一対象図式の重み付き極限・余極限](#thm-catb2-05-single-object)により極限は $[S,A]$ であり、脚は $s$ における評価である。行列 $M$ は標準基底での線形写像を表すので

$$
Ms=\begin{pmatrix}2\\3\\2+3\end{pmatrix}
=\begin{pmatrix}2\\3\\5\end{pmatrix}.
$$

線形写像 $T:X\otimes S\to A$ から $F:X\to[S,A]$ を $F(x)(s)=T(x\otimes s)$ と置く。テンソル積の双線形性と $T$ の線形性により $s$ について線形、さらに $x$ についても線形である。評価すれば $F(x)(s)=T(x\otimes s)$ を回収し、純テンソルは全体を張るため $T$ が一意に復元される。逆方向も全ての $s$ での値が $F(x)$ を決定する。
<!-- solution-end -->

### CATB2-05-C01 集合値図式の一般構成

- Level: C

小さい圏 $\mathcal J$、図式 $D:\mathcal J\to\mathbf{Set}$、共変重み $W:\mathcal J\to\mathbf{Set}$ を取る。集合

$$
L=\left\{(a_{j,w})\in\prod_j\prod_{w\in Wj}Dj:
D(u)(a_{i,w})=a_{j,W(u)(w)}\right\}
$$

を考える。条件は全ての $u:i\to j$ と $w\in Wi$ に課す。この集合が重み付き極限であることを証明せよ。さらに反変重み $V:\mathcal J^{\mathrm{op}}\to\mathbf{Set}$ の場合、非交和 $\coprod_j(Vj\times Dj)$ に関係

$$
(i,V(u^{\mathrm{op}})(v),a)\sim(j,v,D(u)(a))
$$

（$u:i\to j,\ v\in Vj,\ a\in Di$）を課し、これが生成する同値関係で割った集合が重み付き余極限であることを証明せよ。

<!-- solution-start -->
**詳細解答。** 小ささから積と非交和は集合である。まず極限候補の脚を $e_{j,w}:L\to Dj$、$e_{j,w}((a_{k,z}))=a_{j,w}$ とする。$L$ の定義条件により $D(u)e_{i,w}=e_{j,W(u)(w)}$ なので自然である。

試験集合 $X$ からの自然な族 $t_{j,w}:X\to Dj$ は、すべての $x\in X$ で

$$
D(u)(t_{i,w}(x))=t_{j,W(u)(w)}(x)
$$

を満たす。従って $f(x)=(t_{j,w}(x))_{j,w}$ は $L$ に属し、写像 $f:X\to L$ ができる。各射影を取ると $e_{j,w}f=t_{j,w}$。逆にこの等式を満たす $f'$ は全ての成分で $f'(x)=f(x)$ だから一意である。集合でのHom対象は自然な族の集合なので [重み付き極限の定義](#def-catb2-05-weighted-limit)を満たす。

余極限候補を $Q$、同値類を $[j,v,a]$ と書く。脚 $\iota_{j,v}:Dj\to Q$ は $a\mapsto[j,v,a]$ と定める。生成関係から

$$
\iota_{i,V(u^{\mathrm{op}})(v)}(a)
=\iota_{j,v}(D(u)(a))
$$

となり自然性が成立する。任意の自然な族 $t_{j,v}:Dj\to X$ から非交和上の写像 $g(j,v,a)=t_{j,v}(a)$ を作る。自然性により生成関係の両側の $g$ の値は等しい。値の一致は反射的・対称的・推移的であるため、その関係が生成する全同値類の中でも値は一定である。従って $f([j,v,a])=t_{j,v}(a)$ が矛盾なく定義できる。各脚と合成すれば $f\iota_{j,v}=t_{j,v}$。全ての同値類は何らかの $(j,v,a)$ の類なので、これらの式が $f$ の全ての値を決定し一意である。従って [重み付き余極限の定義](#def-catb2-05-weighted-colimit)を満たす。重みが空の成分では添字が存在せず、積の条件も非交和の元も追加されないので、空の図式・空の重みの場合にも同じ証明が適用できる。
<!-- solution-end -->

## 9. 次に向けて

極限では共変重み、余極限では反変重みを使う。重要なのはHom対象の同型であり、台となる圏の普遍性はそこから従う。基底自身では一対象図式から内部Homとテンソル積が得られた。次講ではこの表現普遍性を豊穣随伴とKan拡張に用いる。

参考文献：G. M. Kelly, [Basic Concepts of Enriched Category Theory](https://www.tac.mta.ca/tac/reprints/articles/10/tr10abs.html), 第3章。
