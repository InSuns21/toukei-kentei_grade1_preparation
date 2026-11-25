# CATB5-06 初等トポスと部分対象分類子

<!-- definition-example-audit: strict -->

## 1. 部分集合を射として記録する

集合 $X=\{a,b,c\}$ の部分集合 $\{a,c\}$ は、$a,c$ に1、$b$ に0を割り当てる写像で記録できる。前講では層の有限極限を構成できた。しかし層のような局所データの圏でも、部分集合に相当するものを一つの射で記録できるだろうか。局所的に真になる条件は、単なる二値では区別できないことがある。

そこで本講では、有限極限、関数の圏論版である指数対象、そして部分対象を記録する対象を組み合わせる。まず集合で確かめ、次に前層では真偽値が篩になる理由を導く。

以下、合成は右から左に書き、圏は局所小とする。終対象を $1$、対象 $X$ からの唯一の射を $!_X:X\to1$ とする。[部分対象](../CATB4-07/index.md#def-catb4-07-subobject)は、終域を固定した同型によるモノ射の同値類である。

## 2. 一つの射で部分対象を指定する

集合では真の値1を選ぶ写像 $\{*\}\to\{0,1\}$ を固定すると、部分集合は特性写像による1の逆像で復元できる。一般の圏で逆像に相当する操作は[引き戻し](../../CAT/CAT2-03/index.md#def-cat2-03-pullback)である。真を選ぶ射と、その引き戻しを指定する射を以下で定める。

<a id="def-catb5-06-classifier"></a>

<!-- formal-statement-start -->
> **定義（部分対象分類子）**
>
> 有限極限を持つ局所小圏 $\mathcal E$ において、対象 $\Omega$ と射 $t:1\to\Omega$ の組が部分対象分類子であるとは、任意のモノ射 $m:M\to X$ に対して次の可換正方形を引き戻しにする射 $\chi_m:X\to\Omega$ が唯一存在することをいう。この射を $m$ の分類射と呼ぶ。

$$
\begin{array}{ccc}
M &\xrightarrow{!_M}&1\\
{\scriptstyle m}\downarrow&&\downarrow{\scriptstyle t}\\
X&\xrightarrow{\chi_m}&\Omega
\end{array}
$$
<!-- formal-statement-end -->

$t$ 自体がモノ射である。実際、任意の二射 $u,v:Z\to1$ は終対象の一意性で等しいので、$tu=tv$ なら $u=v$ というモノ射の条件が成立する。

<!-- definition-example-start: def-catb5-06-classifier -->
**定義の確認：集合の圏。** $\Omega=\{0,1\}$ とし、$t(*)=1$ とする。任意の単射 $m:M\to X$ について、像 $S=m(M)$ を取る。集合でモノ射が単射と同値であることは[集合における特徴付け](../../CAT/CAT1-03/index.md#prop-cat1-03-set-characterization)による。写像を

$$
\chi_m(x)=
\begin{cases}
1 & x\in S,\\
0 & x\notin S
\end{cases}
$$

と置く。各 $a\in M$ で $\chi_m(m(a))=1$ なので正方形は可換である。写像 $u:Z\to X$ が $\chi_m u=t!_Z$ を満たすなら、全ての $z\in Z$ で $u(z)\in S$ である。像の定義から $m(a)=u(z)$ となる $a\in M$ が存在し、単射性から唯一である。この $a$ を $v(z)$ と定めれば $mv=u$ であり、$!_M v=!_Z$ も成立する。従って引き戻しの普遍性を満たす。

別の写像 $\psi:X\to\{0,1\}$ で正方形が引き戻しになるとする。可換性から $x\in S$ なら $\psi(x)=1$。逆に $\psi(x)=1$ なら、一元集合から $x$ を選ぶ写像と終対象への射は引き戻しの条件を満たすので、$m(a)=x$ となる $a$ が存在する。ゆえに $x\in S$。従って $\psi=\chi_m$ であり、一意性も確かめた。

具体的に $S=\{a,c\}\subseteq X=\{a,b,c\}$ なら分類射の値は順に $1,0,1$ である。空部分集合の分類射は定数0、全体の分類射は定数1である。
<!-- definition-example-end -->

分類射を使うと、部分対象の同型類を集合として扱える。さらに別の対象から部分対象を観察するとき、分類射を合成するだけで逆像が求まる。

<a id="thm-catb5-06-classifier-bijection"></a>

<!-- formal-statement-start -->
> **定理（分類射と部分対象の自然な対応）**
>
> 有限極限を持つ局所小圏 $\mathcal E$ に部分対象分類子 $(\Omega,t)$ があるとする。各対象 $X$ について、部分対象の集合とHom集合の間に全単射がある。

$$
\operatorname{Sub}(X)\longrightarrow\mathcal E(X,\Omega),
\qquad [m]\longmapsto\chi_m.
$$

> 射 $f:Y\to X$ による部分対象の逆像は次式で分類される。

$$
\chi_{f^*[m]}=\chi_m f.
$$
<!-- formal-statement-end -->

証明の要点は、分類射の一意性と、逆に任意の射から真の射を引き戻せることにある。

<!-- proof-start -->
### 証明

$m=m'i$ となる同型 $i:M\to M'$ があるとする。$m$ に対する引き戻しの普遍性で得た持ち上げ $v:Z\to M$ を $iv$ に置き換えれば、$m'$ に対する持ち上げになる。逆も $i^{-1}$ で戻せるから、同じ分類射が $m'$ も分類する。一意性から $\chi_m=\chi_{m'}$ であり、対応は代表元に依存しない。

任意の $q:X\to\Omega$ に対し $q$ と $t$ の引き戻しを取る。その第一射影を $m_q:M_q\to X$ とすると、[モノ射の引き戻し](../../CAT/CAT2-03/index.md#prop-cat2-03-pullback-mono)により $m_q$ はモノ射である。分類射の一意性から $\chi_{m_q}=q$ となる。

逆に $q=\chi_m$ なら、$m_q$ と $m$ は同じ二射の引き戻しの射影である。引き戻しの普遍性を二方向に適用して得る射の合成は、それぞれ射影を保つ恒等射と等しい。ゆえに終域 $X$ を固定した同型が存在し、$[m_q]=[m]$ となる。こうして全単射が得られる。右辺は局所小性により集合なので左辺も集合として扱える。

次に $n:N\to Y$ を $f$ と $m$ の引き戻しの射影、$p:N\to M$ をもう一方の射影とする。$mp=fn$ から

$$
\chi_m fn=\chi_m mp=t!_M p=t!_N.
$$

$q:Z\to Y$ が $\chi_m fq=t!_Z$ を満たすとき、$m$ の分類正方形により唯一の $a:Z\to M$ が $ma=fq$ を満たす。さらに $f,m$ の引き戻しから唯一の $b:Z\to N$ が $nb=q,\ pb=a$ を満たす。$nb=q$ を満たす別の $b'$ があれば $mpb'=fq$ だから $pb'=a$ であり、引き戻しの一意性から $b'=b$ となる。従って $n$ の分類射は $\chi_m f$ である。
<!-- proof-end -->

## 3. 初等トポスと集合の圏

[有限完備圏](../../CAT/CAT2-04/index.md#def-cat2-04-complete)は有限図式の極限を持つ圏である。[指数対象](../../CAT/CAT4-05/index.md#def-cat4-05-exponential) $B^A$ は評価射 $\operatorname{ev}:B^A\times A\to B$ を持ち、任意の射 $g:Z\times A\to B$ を唯一の射 $\Lambda(g):Z\to B^A$ に転置できる。有限積と指数対象を備えた圏は[Cartesian閉圏](../../CAT/CAT4-05/index.md#def-cat4-05-ccc)であった。

有限極限で等式や逆像を扱い、指数対象で関数を扱い、部分対象分類子で部分対象を扱える圏をまとめて考える。

<a id="def-catb5-06-elementary-topos"></a>

<!-- formal-statement-start -->
> **定義（初等トポス）**
>
> 局所小圏 $\mathcal E$ が初等トポスであるとは、次の三条件を満たすことをいう。
>
> 1. 全ての有限極限が存在する。
> 2. 任意の二対象 $A,B$ に対して指数対象 $B^A$ が存在する。
> 3. 部分対象分類子が存在する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb5-06-elementary-topos -->
**定義の確認：集合の圏。** 集合の圏 $\mathbf{Set}$ は局所小である。終対象は一元集合、二項積は順序対の集合である。射 $u,v:A\to B$ の等化子は $\{a\in A\mid u(a)=v(a)\}$ の包含写像であり、$uh=vh$ を満たす任意の $h:Z\to A$ はその部分集合に値を取り、包含への因子分解は唯一である。[有限極限の存在判定](../../CAT/CAT2-04/index.md#thm-cat2-04-finite-criterion)で第1条件が成立する。

第2条件について $B^A$ を全写像 $A\to B$ の集合とし、$\operatorname{ev}(h,a)=h(a)$ と置く。任意の写像 $g:Z\times A\to B$ に対して $\Lambda(g)(z)$ を $a\mapsto g(z,a)$ という写像と定めれば、

$$
\operatorname{ev}(\Lambda(g)(z),a)=g(z,a).
$$

別の転置 $k:Z\to B^A$ もこの条件を満たすなら、全ての $z,a$ で $k(z)(a)=g(z,a)$ となるので $k=\Lambda(g)$。従って指数対象が存在する。例えば $|A|=2,|B|=3$ なら $|B^A|=3^2=9$ である。空の $A$ についても空写像は唯一なので $B^A$ は一元集合になる。

第3条件は[部分対象分類子の定義と集合での確認](#def-catb5-06-classifier)で、任意の単射を $\{0,1\}$ への唯一の分類射から引き戻せることを示した。以上の三条件から $\mathbf{Set}$ は初等トポスである。
<!-- definition-example-end -->

三条件のうち有限極限と指数対象だけでは分類子の存在は保証されない。後の演習では二元順序圏でこの差を確認する。

## 4. 前層の部分対象は何を記録するか

小圏 $\mathcal C$ 上の[集合値前層と前層圏](../../CAT/CAT1-12/index.md#def-cat1-12-presheaf)を考える。前層 $F$ の射 $u:V\to U$ に沿う制限は $F(u):F(U)\to F(V)$ と書く。小ささから、二前層間の自然変換は成分写像の集合の直積の部分集合をなすので、前層圏は局所小である。[前層圏の完備性・余完備性](../../CAT/CAT2-07/index.md#cor-cat2-07-presheaf-bicomplete)により有限極限が存在し、[関手圏の極限の点ごとの構成](../../CAT/CAT2-07/index.md#thm-cat2-07-pointwise-limit)により積・引き戻しは点ごとに計算できる。

前層の部分対象を扱うには、モノ射を各成分の単射に翻訳する必要がある。代表可能前層を $yU=\mathcal C(-,U)$ と書く。

<a id="prop-catb5-06-pointwise-mono"></a>

<!-- formal-statement-start -->
> **命題（前層のモノ射の成分判定）**
>
> 小圏 $\mathcal C$ 上の集合値前層の自然変換 $m:G\Rightarrow F$ がモノ射であることと、任意の対象 $U$ で $m_U:G(U)\to F(U)$ が単射であることは同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

各成分が単射であるとし、自然変換 $a,b:H\Rightarrow G$ が $ma=mb$ を満たすとする。各対象 $U$ で $m_Ua_U=m_Ub_U$ だから単射性から $a_U=b_U$ である。従って $a=b$、すなわち $m$ はモノ射である。

逆に $m$ がモノ射とし、$x,x'\in G(U)$ が $m_U(x)=m_U(x')$ を満たすとする。[反変Yonedaの補題](../../CAT/CAT1-11/index.md#thm-cat1-11-contravariant-yoneda)によって対応する自然変換 $a,b:yU\Rightarrow G$ の $V$ 成分は、$u:V\to U$ に対し

$$
a_V(u)=G(u)x,\qquad b_V(u)=G(u)x'.
$$

自然性により

$$
m_Va_V(u)=F(u)m_U(x)=F(u)m_U(x')=m_Vb_V(u).
$$

従って $ma=mb$ であり、モノ射性より $a=b$。$V=U,u=1_U$ で評価すると $x=x'$ となる。
<!-- proof-end -->

この命題から、$m$ の各成分の像 $S(U)=m_U(G(U))$ を取ればよい。$x=m_U(g)\in S(U)$ に対し $F(u)x=m_V(G(u)g)\in S(V)$ なので、制限で閉じている。従って制限写像をそのまま制限して前層 $S$ ができ、包含 $S\Rightarrow F$ はモノ射である。各 $m_U$ はその像への全単射で、逆写像も自然性の等式を逆にたどると自然になる。これにより $m$ は包含と同じ部分対象を表す。以下、こうした前層の部分集合族を部分前層と呼ぶ。

固定した $x\in F(U)$ が $S(U)$ に入るかだけを記録する二値では、$x$ が $U$ では入らず、ある $u:V\to U$ で制限すると入る場合を表せない。そこで、どの射に沿った制限が条件を満たすかを全て記録する。これらの射の集合は、前講までに学んだ[篩](../CATB5-02/index.md#def-catb5-02-sieve)である。篩は前合成で閉じた射の集合だった。

<a id="thm-catb5-06-presheaf-classifier"></a>

<!-- formal-statement-start -->
> **定理（前層圏の部分対象分類子）**
>
> 小圏 $\mathcal C$ 上の前層圏において、$\Omega(U)$ を $U$ 上の全ての篩の集合とする。射 $u:V\to U$ に沿う作用を篩の引き戻しで定め、終対象からの射 $t$ は各対象で最大篩を選ぶものとする。この $(\Omega,t)$ は部分対象分類子である。
>
> 部分前層 $S\subseteq F$ の分類射は次式で与えられる。

$$
\chi_{S,U}(x)=
\{u:V\to U\mid F(u)(x)\in S(V)\}.
$$
<!-- formal-statement-end -->

最大篩を取るという条件は、恒等射が篩に入るという条件と同値である。実際、恒等射が入れば前合成閉性によって全ての射が入る。この同値が引き戻しの計算に効く。

<!-- proof-start -->
### 証明

小圏なので各対象への射は集合をなし、その部分集合のうち篩を満たすものも集合をなす。篩 $R\in\Omega(U)$ に対し

$$
\Omega(u)(R)=u^*R=\{v:W\to V\mid uv\in R\}.
$$

$v$ がこの集合に属し $w:T\to W$ なら $uvw\in R$ なので $vw\in u^*R$。従って篩である。[篩の引き戻しの合成則](../CATB5-02/index.md#prop-catb5-02-sieve-pullback-laws)により恒等則と反変合成則を満たす。終前層は各対象で一元集合、各射で唯一の写像を取る。最大篩は引き戻しても最大篩なので $t$ は自然変換である。

次に $x\in F(U)$ とする。$u\in\chi_{S,U}(x)$ と $v:W\to V$ に対して

$$
F(uv)x=F(v)F(u)x\in S(W)
$$

となるので、$\chi_{S,U}(x)$ は篩である。$h:V\to U$ に沿う自然性について、任意の $v:W\to V$ で

$$
\begin{aligned}
v\in h^*\chi_{S,U}(x)
&\Longleftrightarrow F(hv)x\in S(W)\\
&\Longleftrightarrow F(v)F(h)x\in S(W)\\
&\Longleftrightarrow v\in\chi_{S,V}(F(h)x).
\end{aligned}
$$

よって両篩は等しく、$\chi_S$ は自然変換である。

$\chi_{S,U}(x)$ が最大篩なら $1_U$ が属するから $x=F(1_U)x\in S(U)$。逆に $x\in S(U)$ なら全制限が部分前層に入るので最大篩になる。従って各成分で

$$
\{x\in F(U)\mid \chi_{S,U}(x)=t_U(*)\}=S(U).
$$

[点ごとの極限の構成](../../CAT/CAT2-07/index.md#thm-cat2-07-pointwise-limit)によりこの正方形は前層圏で引き戻しである。

最後に別の自然変換 $\psi:F\Rightarrow\Omega$ が同じ包含を引き戻しとして分類するとする。各成分で $x\in S(U)$ と $\psi_U(x)$ が最大篩であることは同値である。自然性から、任意の $u:V\to U$ について

$$
u^*\psi_U(x)=\psi_V(F(u)x).
$$

任意の篩 $R$ について $u\in R$ であることと $u^*R$ が最大篩であることは同値である（前合成閉性と $1_V$ での判定）。よって

$$
\begin{aligned}
u\in\psi_U(x)
&\Longleftrightarrow u^*\psi_U(x)\text{ は最大篩}\\
&\Longleftrightarrow F(u)x\in S(V)\\
&\Longleftrightarrow u\in\chi_{S,U}(x).
\end{aligned}
$$

従って $\psi=\chi_S$。任意のモノ射は上で示したように部分前層の包含と同型なので、分類正方形の始域をその同型で置き換えれば全てのモノ射について存在・一意性が成立する。
<!-- proof-end -->

具体的に $\mathcal C$ が二対象 $V,U$、非恒等射 $u:V\to U$ だけを持つ圏だとする。$V$ 上の篩は $\varnothing,\{1_V\}$ の二つ。$U$ 上の篩は

$$
\varnothing,\quad\{u\},\quad\{u,1_U\}
$$

の三つである。$\{1_U\}$ は前合成で $u$ が入るべきなので篩ではない。$\Omega(u)$ は空篩を空篩へ、残り二つを $\{1_V\}$ へ送る。

例えば $F(U)=F(V)=\{*\}$ の終前層に対し、$S(U)=\varnothing,\ S(V)=\{*\}$ とすれば、制限は空集合から一元集合への写像なので部分前層である。唯一の $U$ 上の元の分類値は $\{u\}$ であり、$V$ では最大篩である。真偽の区別が三つ必要になる理由がこの例で見える。

## 5. 前層の関数を作る

次に指数対象を構成する。集合の場合のように $G(U)^{F(U)}$ を各対象で作っても、$u:V\to U$ に沿って任意の写像を $F(V)\to G(V)$ に制限できるとは限らない。$F(u)$ が逆写像を持つとは限らないためである。

代わりに $U$ への全ての射 $v:W\to U$ における関数を、制限と両立する一つの自然変換として記録する。代表可能前層 $yU$ により、$U$ への射を全て扱える。

<a id="thm-catb5-06-presheaf-exponential"></a>

<!-- formal-statement-start -->
> **定理（前層圏の指数対象）**
>
> 小圏 $\mathcal C$ 上の集合値前層 $F,G$ に対し、指数対象 $G^F$ は次の前層で与えられる。

$$
(G^F)(U)=\operatorname{Nat}(yU\times F,G).
$$

> $u:V\to U$ に沿う制限は $yu\times1_F$ との前合成である。評価射の $U$ 成分は、$\alpha\in(G^F)(U)$ と $a\in F(U)$ に対して

$$
\operatorname{ev}_U(\alpha,a)=\alpha_U(1_U,a)
$$

> で与えられる。
<!-- formal-statement-end -->

核心は、$H\times F\to G$ の自然変換から、$H$ の各元の全ての制限をまとめて指数対象の元を作ることである。

<!-- proof-start -->
### 証明

$yu:yV\to yU$ の $W$ 成分は $v\mapsto uv$ である。各 $\operatorname{Nat}(yU\times F,G)$ は局所小性により集合である。制限は

$$
(G^F)(u)(\alpha)=\alpha\circ(yu\times1_F).
$$

恒等射では前合成は恒等であり、$u:V\to U,\ v:W\to V$ では $y(uv)=yu\circ yv$ なので

$$
(G^F)(v)(G^F)(u)(\alpha)
=\alpha\circ(y(uv)\times1_F).
$$

従って前層である。評価射の自然性を示す。$\alpha:yU\times F\Rightarrow G$ の自然性を射 $u:V\to U$ と元 $(1_U,a)$ に適用すると

$$
G(u)\alpha_U(1_U,a)=\alpha_V(u,F(u)a).
$$

右辺は $\operatorname{ev}_V((G^F)(u)\alpha,F(u)a)$ に等しい。従って評価射は自然変換である。

任意の前層 $H$ と自然変換 $g:H\times F\Rightarrow G$ を取る。$z\in H(U)$ に対して $\Lambda(g)_U(z)$ を次の自然変換 $\alpha:yU\times F\Rightarrow G$ として定める。$v:W\to U$、$a\in F(W)$ に対し

$$
\alpha_W(v,a)=g_W(H(v)z,a).
$$

$w:T\to W$ に対し、$g$ の自然性を用いると

$$
\begin{aligned}
G(w)\alpha_W(v,a)
&=g_T(H(w)H(v)z,F(w)a)\\
&=g_T(H(vw)z,F(w)a)\\
&=\alpha_T(vw,F(w)a).
\end{aligned}
$$

従って $\alpha$ は自然変換であり、指数対象の元である。さらに $u:V\to U$ に沿って $\Lambda(g)$ の自然性を確かめる。$v:W\to V$ における両辺の成分は

$$
\begin{aligned}
((G^F)(u)\Lambda(g)_U(z))_W(v,a)
&=g_W(H(uv)z,a),\\
(\Lambda(g)_V(H(u)z))_W(v,a)
&=g_W(H(v)H(u)z,a).
\end{aligned}
$$

反変合成則で等しい。よって $\Lambda(g):H\Rightarrow G^F$ は自然変換である。評価後の復元は

$$
\operatorname{ev}_U(\Lambda(g)_U(z),a)
=g_U(H(1_U)z,a)=g_U(z,a).
$$

逆に $\beta:H\Rightarrow G^F$ が評価後に $g$ となると仮定する。$v:W\to U$ に対する $\beta$ の自然性から

$$
\beta_W(H(v)z)=(G^F)(v)(\beta_U(z)).
$$

右辺を $W$ の元 $(1_W,a)$ で評価すれば、$(\beta_U(z))_W(v,a)$ である。左辺の評価は仮定より $g_W(H(v)z,a)$ である。従って

$$
(\beta_U(z))_W(v,a)=g_W(H(v)z,a)
=(\Lambda(g)_U(z))_W(v,a).
$$

任意の $U,z,W,v,a$ で成立するので $\beta=\Lambda(g)$。これが[指数対象の普遍性](../../CAT/CAT4-05/index.md#def-cat4-05-exponential)である。
<!-- proof-end -->

二対象圏 $V\xrightarrow{u}U$ に戻ろう。$yV$ は $U$ で空集合、$V$ で一元集合を取る。$yU$ は両対象で一元集合を取る。従って $(G^F)(V)$ は写像 $F(V)\to G(V)$ の集合であり、$(G^F)(U)$ は写像の組 $(h_U,h_V)$ で

$$
G(u)h_U=h_VF(u)
$$

を満たすものの集合である。制限は $(h_U,h_V)\mapsto h_V$ である。たとえば $F(U)=\varnothing,F(V)=\{*\}$、$G(U)=G(V)=\{0,1\}$、$G(u)$ が恒等なら、$h_U$ は空写像で唯一だが $h_V$ は二通りあり、両者の整合条件は空集合上なので常に成り立つ。従って $(G^F)(U)$ は二元集合であり、点ごとの写像集合 $G(U)^{F(U)}$ は一元集合になる。この差は単なる記法ではない。

## 6. 前層圏は初等トポスになる

<a id="thm-catb5-06-presheaf-topos"></a>

<!-- formal-statement-start -->
> **定理（前層圏の初等トポス性）**
>
> 任意の小圏 $\mathcal C$ に対し、集合値前層圏 $\mathbf{Set}^{\mathcal C^{\mathrm{op}}}$ は初等トポスである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

自然変換は成分写像の集合の直積の部分集合であり、$\mathcal C$ の対象の集合が小さいからHom集合も集合である。[前層圏の完備性・余完備性](../../CAT/CAT2-07/index.md#cor-cat2-07-presheaf-bicomplete)により全ての有限極限が存在する。[前層圏の指数対象](#thm-catb5-06-presheaf-exponential)により任意の二前層の指数対象が存在し、[前層圏の部分対象分類子](#thm-catb5-06-presheaf-classifier)により分類子が存在する。従って[初等トポスの三条件](#def-catb5-06-elementary-topos)を全て満たす。
<!-- proof-end -->

ここで前層圏の真偽値は全ての篩であり、被覆篩だけではない。次講では層条件を追加した圏で三条件を再検討する。

## 7. 演習

### CATB5-06-A01 集合の分類射

- Level: A

$X=\{1,2,3,4\}$、$m:\{a,b\}\to X$ を $m(a)=2,m(b)=4$ とする。分類射を求め、その引き戻しから $m$ が復元されることを確かめよ。

<!-- solution-start -->
**詳細解答**

$m$ は単射であり、像は $\{2,4\}$。[部分対象分類子の集合での確認](#def-catb5-06-classifier)から値は順に $0,1,0,1$ である。$t(*)=1$ との引き戻しは $\{(2,*),(4,*)\}$ である。$a\mapsto(2,*),b\mapsto(4,*)$ は全単射で、第一射影との合成は $m$ になる。従って元のモノ射と終域を固定した同型である。
<!-- solution-end -->

### CATB5-06-A02 逆像と合成

- Level: A

$f:\{a,b,c\}\to\{1,2\}$ が $f(a)=f(c)=1,f(b)=2$ を満たす。$\{1\}$ の逆像とその分類射を求め、合成で分類できることを確かめよ。

<!-- solution-start -->
**詳細解答**

逆像は $f^{-1}(\{1\})=\{a,c\}$。元の分類射 $\chi$ は $\chi(1)=1,\chi(2)=0$ であるから、合成 $\chi f$ の値は $a,b,c$ の順で $1,0,1$。これは逆像の分類射であり、[分類射と部分対象の自然な対応](#thm-catb5-06-classifier-bijection)の式を直接確認できた。
<!-- solution-end -->

### CATB5-06-A03 集合の指数対象

- Level: A

$A=B=\{0,1\}$、$Z=\{s,t\}$ とする。$g:Z\times A\to B$ を $g(s,a)=a,\ g(t,a)=1-a$ と定める。転置の値と評価後の復元を求めよ。

<!-- solution-start -->
**詳細解答**

$B^A$ の元を $(h(0),h(1))$ で表すと $(0,0),(0,1),(1,0),(1,1)$ の四つである。[指数対象の普遍性](../../CAT/CAT4-05/index.md#def-cat4-05-exponential)から $\Lambda(g)(s)=(0,1),\ \Lambda(g)(t)=(1,0)$。評価すれば $s$ では $a$、$t$ では $1-a$ が返る。各元の二座標は評価の等式で強制されるため、他の転置は存在しない。
<!-- solution-end -->

### CATB5-06-A04 三対象の篩

- Level: A

順序圏 $W<V<U$ を考える。各対象の篩を列挙し、$v:V\to U$ に沿う $\Omega(v)$ の値を求めよ。射は順序を表す唯一の射とする。

<!-- solution-start -->
**詳細解答**

$W$ には恒等射しか入らないので篩は空と最大の二つである。$V$ に入る非恒等射を $w:W\to V$ と書くと、篩は $\varnothing,\{w\},\{w,1_V\}$。$U$ 上の篩は前合成閉性から $\varnothing,\{vw\},\{vw,v\},\{vw,v,1_U\}$ の四つである。[前層圏の部分対象分類子](#thm-catb5-06-presheaf-classifier)に従い、$v^*R$ は $v$ と合成して $R$ に入る射を集める。順に $\varnothing,\{w\},\{w,1_V\},\{w,1_V\}$ となる。最後の二つは $v$ を含むので引き戻しが最大篩になる。
<!-- solution-end -->

### CATB5-06-B01 部分前層の分類

- Level: B

二対象圏 $V\xrightarrow{u}U$ で $F(U)=\{a,b\}$、$F(V)=\{p,q\}$、$F(u)a=p,\ F(u)b=q$ とする。$S(U)=\varnothing,S(V)=\{p\}$ が部分前層であることを示し、分類射の全成分と自然性を確かめよ。

<!-- solution-start -->
**詳細解答**

$S(U)$ は空なので $F(u)$ の制限は $S(V)$ に値を取る。従って部分前層である。[前層圏の部分対象分類子](#thm-catb5-06-presheaf-classifier)の式を用いる。$U$ では $1_U$ はどちらの元でも条件を満たさず、$u$ は $a$ でのみ条件を満たす。よって $\chi_U(a)=\{u\}$、$\chi_U(b)=\varnothing$。$V$ では $\chi_V(p)=\{1_V\},\chi_V(q)=\varnothing$。

$\Omega(u)\{u\}=\{1_V\}$ だから $a$ における自然性が成立する。空篩の引き戻しは空なので $b$ においても成立する。最大篩を取る元の集合は $U$ では空、$V$ では $\{p\}$ であり、点ごとの引き戻しが $S$ を復元する。
<!-- solution-end -->

### CATB5-06-B02 指数対象を有限個の写像で求める

- Level: B

同じ二対象圏で $F(U)=\{a,b\}, F(V)=\{c\}$ とし、$F(u)$ は定数写像とする。$G(U)=G(V)=\{0,1\}$、$G(u)=1_{\{0,1\}}$ とする。$G^F$ の両成分、制限、評価を求めよ。

<!-- solution-start -->
**詳細解答**

[前層圏の指数対象](#thm-catb5-06-presheaf-exponential)の構成を使う。$V$ では $yV(U)=\varnothing,yV(V)=\{1_V\}$ なので、自然変換は $h_V:\{c\}\to\{0,1\}$ で決まり、二通りある。

$U$ では $yU$ の両成分が一元集合なので、自然変換は $h_U,h_V$ の組で $G(u)h_U=h_VF(u)$ を満たすものになる。$a,b$ を代入すると

$$
h_U(a)=h_V(c),\qquad h_U(b)=h_V(c).
$$

よって $h_U$ は定数で、その値は $h_V(c)$ に一致する。可能な組は定数0同士と定数1同士の二つである。制限は組から $h_V$ を取り出すので、この二元集合間の全単射である。評価は $U$ で $(h_U,h_V),x$ に対して $h_U(x)$、$V$ で $h_V,c$ に対して $h_V(c)$。自然性は上の二等式そのものである。
<!-- solution-end -->

### CATB5-06-B03 有限極限と指数だけでは足りない

- Level: B

二元順序圏 $0<1$ を考える。有限極限と指数対象が存在すること、部分対象分類子が存在しないことを証明せよ。

<!-- solution-start -->
**詳細解答**

終対象は最大元 $1$、二項積は最小値である。平行射が存在すれば同じ射なので、等化子は始域の恒等射。[有限極限の存在判定](../../CAT/CAT2-04/index.md#thm-cat2-04-finite-criterion)により有限極限が存在する。

指数について $B^0=1,\ B^1=B$ と置く。$A=0$ なら $X\times0=0$ から $B$ への射は常に存在し、$X\to1$ も存在する。$A=1$ なら $X\times1=X$ だから、$X\times1\to B$ と $X\to B$ の存在条件は同じである。順序圏では存在する射は唯一なので、評価射の存在と転置の一意性を満たす。

一方、$t:1\to\Omega$ が存在するには $\Omega=1$ しかない。$0\to1$ と $1\to1$ は異なる部分対象である（異なる対象間には同型がない）。ところが $1\to\Omega=1$ は一射しかない。[分類射と部分対象の自然な対応](#thm-catb5-06-classifier-bijection)の全単射が成立しない。従って分類子は存在しない。
<!-- solution-end -->

### CATB5-06-C01 指数対象と部分対象の分類を接続する

- Level: C

初等トポス $\mathcal E$ と対象 $A,X$ を取る。$X\times A$ の部分対象を $X\to\Omega^A$ の射で分類できることを示せ。さらに $f:Y\to X$ に対して、部分対象を $f\times1_A$ に沿って引き戻す操作が分類する射との合成に対応することを証明せよ。集合の場合に $A=\{1,2\},X=\{p,q\}$、部分集合が $\{(p,1),(q,1),(q,2)\}$ のとき、分類する射の値を求めよ。

<!-- solution-start -->
**詳細解答**

初等トポスの仮定から分類子と指数対象が存在する。[分類射と部分対象の自然な対応](#thm-catb5-06-classifier-bijection)を $X\times A$ に適用し、次に[指数対象の普遍性](../../CAT/CAT4-05/index.md#def-cat4-05-exponential)を $B=\Omega$ に適用する。これにより二つの全単射を合成できる。

$$
\operatorname{Sub}(X\times A)
\cong \mathcal E(X\times A,\Omega)
\cong \mathcal E(X,\Omega^A).
$$

部分対象 $S$ に対応する射を $k=\Lambda(\chi_S)$ とすると

$$
\operatorname{ev}(k\times1_A)=\chi_S.
$$

逆に任意の $k$ から右辺の射を作り、真の射を引き戻せば部分対象が得られる。二つの普遍性の一意性から逆操作である。

次に $S'=(f\times1_A)^*S$ とする。分類射の自然性によって $\chi_{S'}=\chi_S(f\times1_A)$。積の関手律から

$$
\begin{aligned}
\operatorname{ev}((kf)\times1_A)
&=\operatorname{ev}(k\times1_A)(f\times1_A)\\
&=\chi_S(f\times1_A)=\chi_{S'}.
\end{aligned}
$$

転置は唯一なので $\Lambda(\chi_{S'})=kf$ である。

集合の場合、$\Omega^A$ の元は二成分の真偽値である。$p$ では $(p,1)$ だけが部分集合に属するため $k(p)=(1,0)$。$q$ では両方が属するため $k(q)=(1,1)$。これらをそれぞれ $1,2$ で評価すると元の分類射の四つの値が復元される。部分集合の族を一つの射で扱えることが分かる。
<!-- solution-end -->

## 8. まとめ

初等トポスでは有限極限による逆像、指数対象による関数、分類子による部分対象の記録を組み合わせられる。集合の真偽値は二値だが、前層ではどの制限で条件を満たすかを篩として記録する。指数対象も点ごとの写像集合ではなく全制限と両立する写像を集める必要がある。次講 CATB5-07 では、層の圏においてこれらの構成をどのように行うかを学ぶ。
