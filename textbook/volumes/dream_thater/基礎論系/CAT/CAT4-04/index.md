# CAT4-04 モノイダル関手とモノイド対象

## 1. 「積を保存する」は何を意味するか

[モノイダル圏の定義](../CAT4-01/index.md#def-cat4-01-monoidal)により、対象を組み合わせる演算 $\otimes$ と単位対象 $I$ がある。[整合性定理](../CAT4-02/index.md#thm-cat4-02-coherence)は括弧の付け替えに伴う射を一意にする。しかし二つのモノイダル圏を結ぶ関手 $F$ について、一般には
$$
F(X)\otimes'F(Y)=F(X\otimes Y)
$$
という対象の等号を要求できない。

代わりに左から右への比較射を用意し、三対象を掛け合わせる順序と単位を扱う順序によらず同じ射になることを要求する。比較射の可逆性は要求しない場合と要求する場合を区別する。この条件を以下で正確に定義すると、後半では「内部に掛け算を持つ対象」を関手で別の圏へ移せる。

本講では射の合成 $gf$ を「先に $f$、次に $g$」の順で読む。$\mathcal C$ のテンソルと単位を $\otimes,I$、$\mathcal D$ のそれらを $\otimes',J$、結合子を $\alpha,\alpha'$、単位子を $\lambda,\rho,\lambda',\rho'$ と書く。$FX$ と $Ff$ はそれぞれ $F(X)$ と $F(f)$ の略記であり、$\otimes'$ は $\mathcal D$ におけるテンソルである。圏の小ささは必要としない。

## 2. モノイダル関手の比較射

### 2.1 三つの因子と単位で比較する

[関手](../CAT1-06/index.md#def-cat1-06-functor) $F:\mathcal C\to\mathcal D$ が、各対象対 $X,Y$ に比較射
$$
\phi_{X,Y}:FX\otimes'FY\longrightarrow F(X\otimes Y)
$$
を与えられたとする。射 $f:X\to X'$、$g:Y\to Y'$ に対しても比較が一致するよう、[自然性](../CAT1-07/index.md#def-cat1-07-natural-transformation)を課す。

三対象の場合、始域 $(FX\otimes'FY)\otimes'FZ$ から $F(X\otimes(Y\otimes Z))$ へ二経路がある。先に左側をまとめる道では $\phi_{X,Y}$、次に $\phi_{X\otimes Y,Z}$、最後に $F\alpha$ を使う。他方、$\alpha'$ で括弧を動かし、$\phi_{Y,Z}$、$\phi_{X,Y\otimes Z}$ を使う。単位については $J\to FI$ という比較射も必要になる。

<a id="def-cat4-04-lax"></a>

<!-- formal-statement-start -->
> **定義（laxモノイダル関手）**  
> モノイダル圏 $(\mathcal C,\otimes,I,\alpha,\lambda,\rho)$ と $(\mathcal D,\otimes',J,\alpha',\lambda',\rho')$ に対し、**lax モノイダル関手**とは、関手 $F:\mathcal C\to\mathcal D$ と、対象対に関して自然な射 $\phi_{X,Y}:FX\otimes'FY\to F(X\otimes Y)$、射 $\phi_0:J\to FI$ であって、次の三条件を満たすものである。
>
> **（A）結合との両立**：任意の $X,Y,Z\in\mathcal C$ について

$$
\begin{aligned}
&F(\alpha_{X,Y,Z})\,
\phi_{X\otimes Y,Z}\,(\phi_{X,Y}\otimes'1_{FZ})\\
&\qquad=\phi_{X,Y\otimes Z}\,
(1_{FX}\otimes'\phi_{Y,Z})\,\alpha'_{FX,FY,FZ}.
\end{aligned}
$$

> **（L）左単位との両立**：任意の $X$ について

$$
F(\lambda_X)\,\phi_{I,X}(\phi_0\otimes'1_{FX})
=\lambda'_{FX}.
$$

> **（R）右単位との両立**：任意の $X$ について

$$
F(\rho_X)\,\phi_{X,I}(1_{FX}\otimes'\phi_0)
=\rho'_{FX}.
$$

> また比較射 $\phi_{X,Y}$ と $\phi_0$ がすべて同型射なら、**強モノイダル関手**という。
<!-- formal-statement-end -->

**型の点検。** （A）の両辺は
$$
(FX\otimes'FY)\otimes'FZ
\longrightarrow F(X\otimes(Y\otimes Z))
$$
である。（L）の両辺は $J\otimes'FX\to FX$、（R）は $FX\otimes'J\to FX$ である。自然性の二経路は、$f:X\to X'$、$g:Y\to Y'$ に対して
$$
F(f\otimes g)\,\phi_{X,Y}
=\phi_{X',Y'}(Ff\otimes'Fg)
$$
であり、始域 $FX\otimes'FY$、終域 $F(X'\otimes Y')$ を共有する。

### 2.2 直接例：恒等関手

同じモノイダル圏の恒等関手 $1_{\mathcal C}$ では、比較射を
$$
\phi_{X,Y}=1_{X\otimes Y},\qquad\phi_0=1_I
$$
と選ぶ。自然性は両辺とも $f\otimes g$、（A）は両辺とも $\alpha_{X,Y,Z}$、（L）は両辺とも $\lambda_X$、（R）は両辺とも $\rho_X$ になる。すべての比較射は同型である。

<!-- definition-example-start: def-cat4-04-lax -->
**定義の確認**。 恒等関手の例では、比較射の型は $(X\otimes Y)\to(X\otimes Y)$ と $I\to I$。自然性、三つの整合条件を上記のように個別に確かめたので、これは強モノイダル関手である。
<!-- definition-example-end -->

### 2.3 非可逆な例：冪集合関手

集合 $X$ の部分集合全体を $\mathcal P(X)$ と書く。写像 $f:X\to Y$ に対して $\mathcal P(f)(A)=f[A]$ と置く。像の写像は恒等写像と合成を保つから $\mathcal P:\mathbf{Set}\to\mathbf{Set}$ は関手である。両側に[直積のモノイダル構造](../CAT4-01/index.md#thm-cat4-01-cartesian-monoidal)を使い、単位対象は一元集合 $1=\{*\}$ とする。

比較射を次のように置く。
$$
\phi_{X,Y}(A,B)=A\times B,\qquad
\phi_0(*)=\{*\}\in\mathcal P(1).
$$

この比較射に[自然性の条件](#def-cat4-04-lax)を適用し、両経路を部分集合上で計算すると
$$
(f\times g)[A\times B]=f[A]\times g[B]
$$
となる。左辺の元は $(f(a),g(b))$、右辺の元も $a\in A,b\in B$ から得られる全ての同じ対なので、両包含が成り立つ。（A）は
$$
((A\times B)\times C)\longmapsto A\times(B\times C)
$$
という集合の括弧移動で両経路が一致する。（L）では $\phi_0(*)=\{*\}$ を先に送り、$\phi_{1,X}(\{*\},A)=\{*\}\times A$ としてから、像の写像 $\mathcal P(\lambda_X)$ により $A$ へ移る。（R）でも $\phi_{X,1}(A,\{*\})=A\times\{*\}$ の $\mathcal P(\rho_X)$ による像が $A$ である。これはそれぞれ $\mathcal P(X)$ の左・右単位子と同じ写像なので、（L）と（R）が成立する。

<a id="prop-cat4-04-powerset"></a>

<!-- formal-statement-start -->
> **命題（冪集合関手はlaxだが強とは限らない）**  
> $\mathbf{Set}$ に直積モノイダル構造を与える。上記の $\mathcal P$、$\phi_{X,Y}$、$\phi_0$ は lax モノイダル関手をなす。しかし、$X=Y=\{0,1\}$ では $\phi_{X,Y}$ は全射でなく、強モノイダル関手ではない。
<!-- formal-statement-end -->

### 証明の見取り図

結合・単位・自然性を集合の対の元に戻す。非同型性は、どんな直積集合 $A\times B$ にもならない斜めの二点集合を示せば足りる。

<!-- proof-start -->
### 証明

関手性は $\mathcal P(1_X)(A)=A$ と $\mathcal P(gf)(A)=(gf)[A]=g[f[A]]=\mathcal P(g)\mathcal P(f)(A)$ より成立する。自然性は直前で両包含を示した。

結合条件の左経路は $((A,B),C)$ に $(A\times B,C)$ を対応させ、最終的に $(a,(b,c))$ 全体からなる $A\times(B\times C)$ を与える。右経路では $((A,B),C)\mapsto(A,(B,C))\mapsto(A,B\times C)\mapsto A\times(B\times C)$ となり、同じ集合である。左右単位条件も $\{*\}\times A$ および $A\times\{*\}$ で直接成り立つ。

$X=Y=\{0,1\}$ とし、$R=\{(0,0),(1,1)\}\subseteq X\times Y$ を取る。$A\times B=R$ なら第一・第二座標への射影から $A=B=\{0,1\}$ が必要。しかしその直積には $(0,1)$ も入り、矛盾する。従って $\phi_{X,Y}$ は全射でなく、同型ではない。
<!-- proof-end -->

この失敗は lax 条件の失敗ではない。**強さは比較射の可逆性という追加条件**である。

## 3. 対象の内部に掛け算を置く

[モノイダル圏](../CAT4-01/index.md#def-cat4-01-monoidal)では対象をテンソルで組み合わせられる。では一つの対象 $M$ 上で、二つの入力 $M\otimes M$ を一つの出力 $M$ へ送り、単位 $I$ から $M$ への射を選び、結合・単位の法則を課せるだろうか。必要な三条件を次の定義で確定させる。

### 3.1 結合・単位を型付きで書く

<a id="def-cat4-04-monoid"></a>

<!-- formal-statement-start -->
> **定義（モノイド対象）**  
> モノイダル圏 $(\mathcal C,\otimes,I,\alpha,\lambda,\rho)$ の **モノイド対象**とは、対象 $M$ と射 $m:M\otimes M\to M$、$e:I\to M$ の組 $(M,m,e)$ で、次を満たすものである。
>
> **（結合律）**

$$
m(m\otimes1_M)=m(1_M\otimes m)\,\alpha_{M,M,M}.
$$

> **（左単位律）**

$$
m(e\otimes1_M)=\lambda_M.
$$

> **（右単位律）**

$$
m(1_M\otimes e)=\rho_M.
$$
<!-- formal-statement-end -->

結合律の両辺は $(M\otimes M)\otimes M\to M$、左単位律は $I\otimes M\to M$、右単位律は $M\otimes I\to M$ という型である。結合子や単位子を「等号で消す」と、別の始域を持つ射を比較してしまうので注意する。

### 3.2 直接例：集合では通常のモノイド

$\mathbf{Set}$ で $\otimes=\times$、$I=1=\{*\}$ とする。$m:M\times M\to M$ を $m(a,b)=a\cdot b$、$e(*)=u$ と置く。結合律の始域の元 $((a,b),c)$ に左辺を適用すると
$$
m(m\times1_M)((a,b),c)=(a\cdot b)\cdot c
$$
となる。右経路は $\alpha((a,b),c)=(a,(b,c))$ を先に通り、
$$
m(1_M\times m)\alpha((a,b),c)=a\cdot(b\cdot c)
$$
となる。左単位の元 $(*,a)$ は $u\cdot a$、右単位の元 $(a,*)$ は $a\cdot u$ へ移る。

<!-- definition-example-start: def-cat4-04-monoid -->
**定義の確認**。 非負整数全体 $M=\mathbb N_0$ に加法を用いると、$m(a,b)=a+b$、$e(*)=0$。整数加法の結合律で $(a+b)+c=a+(b+c)$、単位律で $0+a=a$ と $a+0=a$ が各元で成立し、上の三つの射の等式を満たす。
<!-- definition-example-end -->

<a id="prop-cat4-04-set-monoids"></a>

<!-- formal-statement-start -->
> **命題（直積モノイダル圏でのモノイド対象）**  
> $\mathbf{Set}$ の直積モノイダル構造について、モノイド対象 $(M,m,e)$ を指定することと、集合 $M$ に結合的な二項演算と両側単位元を指定することは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

モノイド対象の三本の射等式を全ての元で評価すれば、通常の三公理に戻る。逆方向には通常の三公理から射の等式を得る。

<!-- proof-start -->
### 証明

モノイド対象から $\cdot$ と $u$ を $a\cdot b=m(a,b)$、$u=e(*)$ と定める。先の始域の計算により、結合律は任意の $a,b,c$ について $(a\cdot b)\cdot c=a\cdot(b\cdot c)$ と同値である。左右単位律は、それぞれ任意の $a$ に対する $u\cdot a=a$ と $a\cdot u=a$ に同値である。逆にこの三公理があれば、射を始域の各元で比べてモノイド対象の三条件が成り立つ。二つの構成は演算と単位元を変更しないので互いに逆である。
<!-- proof-end -->

### 3.3 テンソル積では結合代数になる

体 $k$ 上のベクトル空間と線形写像の圏で、[テンソル積の定義](../../../基礎科目/LA/LA3E/index.md#def-la3e-tensor-product)を使う。ここでモノイダル圏の記号 $\otimes$ は体 $k$ 上のテンソル積 $\otimes_k$ を表す。線形写像 $f,g$ のテンソルは純テンソル上で $(f\otimes_k g)(v\otimes w)=f(v)\otimes g(w)$ と定まる。結合子は $((u\otimes v)\otimes w)\mapsto u\otimes(v\otimes w)$、単位対象は $k$ であり、これらの写像と単位子を純テンソル上で合成すると[モノイダル圏の五角形・三角形条件](../CAT4-01/index.md#def-cat4-01-monoidal)を満たす（各テンソル積は純テンソルの線形結合で張られる）。このため、以下の射の等式は純テンソル上で判定できる。

$k$-双線形写像 $b:V\times V\to V$ は、テンソル積の普遍性によってただ一つの線形写像
$$
m:V\otimes_k V\to V,\qquad m(v\otimes w)=b(v,w)
$$
を与える。$e:k\to V$ は $u=e(1)$ によって一意に決まり、線形性から $e(t)=tu$ である。単位対象は $k$、左右単位子は $t\otimes v\mapsto tv$、$v\otimes t\mapsto tv$。

<a id="prop-cat4-04-algebra"></a>

<!-- formal-statement-start -->
> **命題（ベクトル空間のモノイド対象）**  
> 体 $k$ 上のベクトル空間のテンソル積モノイダル圏において、モノイド対象を与えることは、$k$-双線形かつ結合的な積 $b:V\times V\to V$ と両側単位元 $u\in V$ を与えることと同値である。すなわち、単位元を持つ結合 $k$-代数の構造と同じである。
<!-- formal-statement-end -->

### 証明の見取り図

自由に書いた純テンソル $v\otimes w$ がテンソル積全体を線形結合で生成することを使う。三つの射等式を純テンソル上で評価すれば、通常の代数公理になる。

<!-- proof-start -->
### 証明

線形写像 $m$ と $e$ から $b(v,w)=m(v\otimes w)$、$u=e(1)$ とする。標準の結合子が $((v\otimes w)\otimes z)\mapsto v\otimes(w\otimes z)$ を与えるので、結合律の左辺と右辺はそれぞれ $b(b(v,w),z)$ と $b(v,b(w,z))$。純テンソルの線形結合が始域を張るから、射の一致とこの元ごとの等式は同値である。左単位律は
$$
m(e(t)\otimes v)=b(tu,v)=t\,b(u,v)
$$
が $\lambda_V(t\otimes v)=tv$ と一致する条件であり、$t=1$ を代入すれば $b(u,v)=v$ を得る。逆は双線形性から従う。右も $b(v,u)=v$ と同値。

逆に双線形で結合的な積と単位元を与えれば、テンソル積の普遍性で $m$ が一意に存在し、$e(t)=tu$ は線形である。純テンソル上で三法則が成り立つので線形写像として三つの射等式が成立する。
<!-- proof-end -->

ここで行列の数値計算は必要ない。**テンソル積が双線形な入力を線形写像に変換する**ことが、定義から判定への橋渡しになっている。

## 4. モノイド対象の間を結ぶ射

モノイドの間の写像を考えるには、積と単位を保つ必要がある。同じ考えをモノイド対象の構造射で記述する。

<a id="def-cat4-04-monoid-morphism"></a>

<!-- formal-statement-start -->
> **定義（モノイド対象の準同型）**  
> 同じモノイダル圏内のモノイド対象 $(M,m,e)$ と $(N,n,d)$ の間の**モノイド対象の準同型**とは、射 $h:M\to N$ で

$$
h\,m=n(h\otimes h),\qquad h\,e=d
$$

> を満たすものをいう。
<!-- formal-statement-end -->

第一の等式は $M\otimes M\to N$、第二の等式は $I\to N$ の射を比較している。積の保存では $M\otimes M\xrightarrow{h\otimes h}N\otimes N\xrightarrow{n}N$ と $M\otimes M\xrightarrow{m}M\xrightarrow{h}N$ を照合する。

<!-- definition-example-start: def-cat4-04-monoid-morphism -->
**定義の確認**。 $(\mathbb N_0,+,0)$ から $(\mathbb N_0,+,0)$ への $h(n)=2n$ を考える。$h(a+b)=2a+2b=h(a)+h(b)$ と $h(0)=0$ を各元で検査できるので、上の二つの射等式を満たす。
<!-- definition-example-end -->

<a id="prop-cat4-04-monoid-category"></a>

<!-- formal-statement-start -->
> **命題（モノイド対象と準同型は圏をなす）**  
> 任意のモノイダル圏 $\mathcal C$ において、モノイド対象を対象、上の準同型を射とし、恒等射・合成を $\mathcal C$ から受け継ぐと圏が得られる。
<!-- formal-statement-end -->

### 証明の見取り図

恒等射は自明な保存式を満たす。準同型を二本続けても、[テンソル双関手の合成保存](../CAT4-01/index.md#def-cat4-01-tensor-bifunctor)により積・単位を保つ。

<!-- proof-start -->
### 証明

恒等射 $1_M$ は $1_Mm=m(1_M\otimes1_M)$ と $1_Me=e$ を満たす。$h:M\to N$、$k:N\to P$ が準同型とし、$P$ の積を $p$、単位を $u$ とすると
$$
\begin{aligned}
(kh)m&=k(hm)=k\,n(h\otimes h)\\
&=p(k\otimes k)(h\otimes h)\\
&=p((kh)\otimes(kh)),\\
(kh)e&=k(he)=kd=u.
\end{aligned}
$$
三行目でテンソルが双関手であることを使用した。結合律・単位律は $\mathcal C$ の射の合成から継承する。
<!-- proof-end -->

## 5. laxモノイダル関手は掛け算を運ぶ

これが本講の中心定理である。$F$ が強でなくても比較射の向き
$$
FM\otimes'FM\xrightarrow{\ \phi_{M,M}\ }F(M\otimes M)
$$
が正しければ、元の積 $m$ を $F$ で送って新しい積を作れる。単位についても $J\xrightarrow{\phi_0}FI\xrightarrow{Fe}FM$ を用いる。

<a id="thm-cat4-04-transport"></a>

<!-- formal-statement-start -->
> **定理（laxモノイダル関手によるモノイド対象の移送）**  
> $(F,\phi,\phi_0):\mathcal C\to\mathcal D$ を lax モノイダル関手、$(M,m,e)$ を $\mathcal C$ のモノイド対象とする。このとき

$$
m_F=F(m)\phi_{M,M},\qquad e_F=F(e)\phi_0
$$

> は $\mathcal D$ のモノイド対象 $(FM,m_F,e_F)$ を定める。さらにモノイド対象の準同型 $h:M\to N$ は $Fh:FM\to FN$ に移り、この対応は恒等射と合成を保存する。比較射が同型であることは必要ない。
<!-- formal-statement-end -->

### 証明の見取り図

まず $\phi$ の自然性を使って $Fm$ を比較射の内側へ動かす。次に lax 結合条件（A）で比較する順番を変更し、元の $m$ の結合律を適用する。単位では（L）と（R）がちょうど必要になる。

<!-- proof-start -->
### 証明

積の型は
$$
FM\otimes'FM\xrightarrow{\phi_{M,M}}F(M\otimes M)
\xrightarrow{Fm}FM
$$
であり、単位の型は $J\xrightarrow{\phi_0}FI\xrightarrow{Fe}FM$ である。

**（1）結合律。** 自然性を $(m,1_M)$ に適用すると
$$
\phi_{M,M}(Fm\otimes'1_{FM})
=F(m\otimes1_M)\phi_{M\otimes M,M}.
$$
ゆえに
$$
\begin{aligned}
&m_F(m_F\otimes'1_{FM})\\
&=Fm\,\phi_{M,M}
 ((Fm\,\phi_{M,M})\otimes'1_{FM})\\
&=F(m(m\otimes1_M))\,
 \phi_{M\otimes M,M}(\phi_{M,M}\otimes'1_{FM}).
\end{aligned}
$$
元のモノイド対象の結合律は $m(m\otimes1_M)=m(1_M\otimes m)\alpha_{M,M,M}$。これを代入し、[lax関手の結合条件](#def-cat4-04-lax)（A）を用いて
$
\begin{aligned}
m_F(m_F\otimes'1_{FM})
&=F(m(1_M\otimes m))\,
 \phi_{M,M\otimes M}
 (1_{FM}\otimes'\phi_{M,M})\alpha'_{FM,FM,FM}\\
&=Fm\,\phi_{M,M}(1_{FM}\otimes'Fm)
 (1_{FM}\otimes'\phi_{M,M})\alpha'_{FM,FM,FM}\\
&=m_F(1_{FM}\otimes'm_F)\alpha'_{FM,FM,FM}.
\end{aligned}
$
を得る。二行目は $\phi$ の自然性を $(1_M,m)$ に適用したもの、最後は[テンソル双関手の合成保存](../CAT4-01/index.md#def-cat4-01-tensor-bifunctor)による。

**（2）左単位。** 自然性を $(e,1_M)$ に適用して
$$
\phi_{M,M}(Fe\otimes'1_{FM})
=F(e\otimes1_M)\phi_{I,M}
$$
とする。従って
$$
\begin{aligned}
m_F(e_F\otimes'1_{FM})
&=Fm\,F(e\otimes1_M)
 \phi_{I,M}(\phi_0\otimes'1_{FM})\\
&=F(m(e\otimes1_M))
 \phi_{I,M}(\phi_0\otimes'1_{FM})\\
&=F\lambda_M\,\phi_{I,M}(\phi_0\otimes'1_{FM})\\
&=\lambda'_{FM}.
\end{aligned}
$$
第三行目は元の左単位律、第四行目は（L）である。右単位では、自然性を $(1_M,e)$ に適用して
$
\phi_{M,M}(1_{FM}\otimes'Fe)
=F(1_M\otimes e)\phi_{M,I}
$
を得る。従って、元の右単位律 $m(1_M\otimes e)=\rho_M$ と（R）を順に使うと
$
\begin{aligned}
m_F(1_{FM}\otimes'e_F)
&=Fm\,\phi_{M,M}(1_{FM}\otimes'Fe)
 (1_{FM}\otimes'\phi_0)\\
&=Fm\,F(1_M\otimes e)\phi_{M,I}
 (1_{FM}\otimes'\phi_0)\\
&=F\rho_M\,\phi_{M,I}
 (1_{FM}\otimes'\phi_0)\\
&=\rho'_{FM}.
\end{aligned}
$
両辺は $FM\otimes'J\to FM$ の射である。

**（3）準同型。** $h:(M,m,e)\to(N,n,d)$ を準同型とする。自然性と $hm=n(h\otimes h)$ から
$$
\begin{aligned}
(Fh)m_F
&=F(hm)\phi_{M,M}\\
&=Fn\,F(h\otimes h)\phi_{M,M}\\
&=Fn\,\phi_{N,N}(Fh\otimes'Fh).
\end{aligned}
$$
また $(Fh)e_F=F(he)\phi_0=Fd\,\phi_0$。従って $Fh$ は準同型である。恒等射・合成は関手 $F$ 自身の公理から保存される。
<!-- proof-end -->

### 5.1 冪集合へ適用すると何が起きるか

自然数の加法モノイド $(\mathbb N_0,+,0)$ に[冪集合のlax構造](#prop-cat4-04-powerset)を適用すると、元は部分集合 $A\subseteq\mathbb N_0$、積は
$$
A\star B=\{a+b\mid a\in A,\ b\in B\},\qquad E=\{0\}
$$
となる。例えば $\{1,3\}\star\{2,4\}=\{3,5,7\}$。任意の三集合について
$$
(A\star B)\star C
=\{(a+b)+c\mid a\in A,\ b\in B,\ c\in C\}
=\{a+(b+c)\mid a\in A,\ b\in B,\ c\in C\}
=A\star(B\star C)
$$
である。左右単位も $\{0\}\star A=A=A\star\{0\}$。比較射は強ではなかったが、モノイド構造は正しく運ばれた。

## 6. 演習：構造射の型・非可逆性・移送

### 問題1：比較射の型

- Level: A
- ID: CAT4-04-A01

lax モノイダル関手 $F$ について、$f:X\to X'$、$g:Y\to Y'$ を固定する。$\phi$ の自然性の二経路を書き、双方の始域・終域を示せ。

<!-- solution-start -->
**詳細解答。** 始域は $FX\otimes'FY$、終域は $F(X'\otimes Y')$。上経路はまず $\phi_{X,Y}$ で $F(X\otimes Y)$ に進み、次に $F(f\otimes g)$ を作用させる。下経路は $Ff\otimes'Fg$ で $FX'\otimes'FY'$ に進み、次に $\phi_{X',Y'}$ を作用させる。従って自然性は[定義](#def-cat4-04-lax)により
$$
F(f\otimes g)\phi_{X,Y}
=\phi_{X',Y'}(Ff\otimes'Fg).
$$
逆向きの $F(X\otimes Y)\to FX\otimes'FY$ を勝手に使えないことにも注意する。
<!-- solution-end -->

### 問題2：結合条件の型

- Level: A
- ID: CAT4-04-A02

比較射 $\phi_{X,Y}$ を二回使い、$((FX\otimes'FY)\otimes'FZ)$ から $F(X\otimes(Y\otimes Z))$ へ至る二経路を列挙せよ。

<!-- solution-start -->
**詳細解答。** 第一経路の中間対象は
$$
(FX\otimes'FY)\otimes'FZ
\longrightarrow F(X\otimes Y)\otimes'FZ
\longrightarrow F((X\otimes Y)\otimes Z)
\longrightarrow F(X\otimes(Y\otimes Z)).
$$
射は $\phi_{X,Y}\otimes'1_{FZ}$、$\phi_{X\otimes Y,Z}$、$F\alpha_{X,Y,Z}$。第二経路は
$$
(FX\otimes'FY)\otimes'FZ
\longrightarrow FX\otimes'(FY\otimes'FZ)
\longrightarrow FX\otimes'F(Y\otimes Z)
\longrightarrow F(X\otimes(Y\otimes Z)),
$$
射は $\alpha'_{FX,FY,FZ}$、$1_{FX}\otimes'\phi_{Y,Z}$、$\phi_{X,Y\otimes Z}$。両経路の等式が[条件（A）](#def-cat4-04-lax)である。
<!-- solution-end -->

### 問題3：単位の向き

- Level: A
- ID: CAT4-04-A03

$\phi_0:J\to FI$ である理由を、$J\otimes'FX$ から $FX$ へ至る左単位経路の型から説明せよ。

<!-- solution-start -->
**詳細解答。** $J\otimes'FX$ に最初に $\phi_0\otimes'1_{FX}$ を作用させるには $\phi_0:J\to FI$ が必要である。その後の経路は
$$
J\otimes'FX\longrightarrow FI\otimes'FX
\longrightarrow F(I\otimes X)\longrightarrow FX
$$
であり、各射は順に $\phi_0\otimes'1$、$\phi_{I,X}$、$F\lambda_X$。比較する $\lambda'_{FX}$ も $J\otimes'FX\to FX$。逆向きの $FI\to J$ だけではこの経路は作れない。
<!-- solution-end -->

### 問題4：集合のモノイド対象

- Level: A
- ID: CAT4-04-A04

$\mathbf{Set}$ で $M=\{0,1\}$、$a\cdot b=\min(a,b)$、単位元 $u=1$ とする。モノイド対象の三条件を元で確認せよ。

<!-- solution-start -->
**詳細解答。** 積は $\min$ なので $\min(\min(a,b),c)=\min\{a,b,c\}=\min(a,\min(b,c))$。結合子は $((a,b),c)$ を $(a,(b,c))$ に移すから、これはモノイド対象の結合律そのものである。また $a\in\{0,1\}$ について $\min(1,a)=a=\min(a,1)$。$e(*)=1$ とすれば左右単位子の写像と一致する。[直積の特徴づけ](#prop-cat4-04-set-monoids)によりモノイド対象である。
<!-- solution-end -->

### 問題5：準同型と非例

- Level: A
- ID: CAT4-04-A05

加法モノイド $\mathbb N_0$ 上の $h(n)=3n$、$r(n)=n+1$ のどちらがモノイド対象の準同型か。積と単位の二条件をそれぞれ調べよ。

<!-- solution-start -->
**詳細解答。** $h(a+b)=3(a+b)=3a+3b=h(a)+h(b)$、$h(0)=0$ なので $h$ は準同型。$r(a+b)=a+b+1$ だが $r(a)+r(b)=a+b+2$ なので積を保たず、$r(0)=1\ne0$ なので単位も保たない。射の等式 $hm=m(h\times h)$ と $he=e$ を、同じ元に適用して判定した。
<!-- solution-end -->

### 問題6：冪集合の非強性と自然性

- Level: B
- ID: CAT4-04-B01

集合写像 $f:X\to X'$、$g:Y\to Y'$ に対し、$\mathcal P$ の自然性を二包含で証明せよ。また $X=Y=\{0,1\}$ の斜め集合が比較射の像でない理由を、射影を使って示せ。

<!-- solution-start -->
**詳細解答。** $(x',y')\in(f\times g)[A\times B]$ なら、ある $a\in A,b\in B$ により $(x',y')=(f(a),g(b))$。よって $x'\in f[A],y'\in g[B]$ で右辺 $f[A]\times g[B]$ に入る。逆に $(x',y')\in f[A]\times g[B]$ ならそれぞれの定義から $a\in A,b\in B$ があり、$(x',y')=(f\times g)(a,b)$。よって二包含が示された。

$R=\{(0,0),(1,1)\}$ の各射影は $\{0,1\}$ である。$R=A\times B$ なら射影から $A=B=\{0,1\}$ が強制されるが、その積には $(0,1)$ が入る。従ってこの $R$ に原像がなく、比較射 $\phi_{X,Y}$ は全射ではない。
<!-- solution-end -->

### 問題7：テンソル積と環

- Level: B
- ID: CAT4-04-B02

体 $k$ 上の $V=k[t]$ に多項式の積と単位元 $1$ を与える。$V\otimes_k V\to V$ に誘導される線形写像 $m$ と $e:k\to V$ を定め、結合律と左右単位律を純テンソル上で検証せよ。

<!-- solution-start -->
**詳細解答。** 多項式積 $(p,q)\mapsto pq$ は各変数で $k$-線形なので、[テンソル積の普遍性](../../../基礎科目/LA/LA3E/index.md#def-la3e-tensor-product)から一意な線形写像 $m(p\otimes q)=pq$ がある。単位は $e(a)=a\cdot1$ とする。左経路は
$$
m(m\otimes1)((p\otimes q)\otimes r)=(pq)r,
$$
右経路は
$$
m(1\otimes m)\alpha((p\otimes q)\otimes r)=p(qr).
$$
多項式積の結合律で等しい。左単位は $m(e(a)\otimes p)=ap=\lambda_V(a\otimes p)$、右単位は $m(p\otimes e(a))=ap=\rho_V(p\otimes a)$。純テンソルがそれぞれのテンソル積を線形に張るため、三条件は射の等式として成立する。
<!-- solution-end -->

### 問題8：移送の準同型

- Level: B
- ID: CAT4-04-B03

$(\mathbb N_0,+,0)$ の準同型 $h(n)=2n$ に冪集合の lax 関手を適用する。$\mathcal P(h)$ が部分集合の積 $\star$ と単位を保つことを、元の表示と定理の両方から示せ。

<!-- solution-start -->
**詳細解答。** $\mathcal P(h)(A)=\{2a\mid a\in A\}$ である。左辺を展開すると
$$
\mathcal P(h)(A\star B)
=\{2(a+b)\mid a\in A,b\in B\}
=\{2a+2b\mid a\in A,b\in B\}.
$$
右辺は
$$
\mathcal P(h)(A)\star\mathcal P(h)(B)
=\{x+y\mid x=2a,\ y=2b,\ a\in A,b\in B\},
$$
で同じ集合。単位について $\mathcal P(h)(\{0\})=\{0\}$。抽象的には $h$ は $h(a+b)=h(a)+h(b)$ と $h(0)=0$ を満たすため、[移送定理](#thm-cat4-04-transport)の準同型部分を $F=\mathcal P$ に適用した結論と一致する。
<!-- solution-end -->

### 問題9：冪集合モノイドの可逆な元

- Level: C
- ID: CAT4-04-C01

群 $G$ を通常の積と単位元 $1_G$ を持つモノイドとし、[冪集合の移送](#thm-cat4-04-transport)から得た $(\mathcal P(G),\star,\{1_G\})$ を考える。

1. この構造がモノイドであることを、群の結合律と定理の両方で確認せよ。
2. 逆元を持つ部分集合は、ちょうど一元集合 $\{g\}$（$g\in G$）であると証明せよ。
3. この可逆部分の積が $G$ の積を再現することを示せ。

<!-- solution-start -->
**詳細解答。**

**（1）** 定義より $A\star B=\{ab\mid a\in A,b\in B\}$。従って $(A\star B)\star C$ と $A\star(B\star C)$ はそれぞれ $(ab)c$ と $a(bc)$ の全体だから群の結合律で一致する。$\{1_G\}\star A=A=A\star\{1_G\}$ も成り立つ。また $G$ は[直積のモノイド対象](#prop-cat4-04-set-monoids)なので、[移送定理](#thm-cat4-04-transport)を冪集合 lax 関手に適用しても同じ結論を得る。

**（2）** $A\star B=B\star A=\{1_G\}$ を仮定する。右辺は空でないから、$A$ と $B$ は非空である。$b\in B$ を一つ固定すると、すべての $a\in A$ が $ab=1_G$ を満たす。群では右から $b^{-1}$ を掛けられるので $a=b^{-1}$ となる。従って $A$ は一元集合 $\{b^{-1}\}$。同様に $a\in A$ を固定すれば $B=\{a^{-1}\}$ となる。逆に $\{g\}\star\{g^{-1}\}=\{1_G\}=\{g^{-1}\}\star\{g\}$ で、どの一元集合も可逆。

**（3）** 写像 $i:G\to\mathcal P(G)$、$i(g)=\{g\}$ は積について $i(g)\star i(h)=\{gh\}=i(gh)$ と単位について $i(1_G)=\{1_G\}$ を満たす。（2）によって像は可逆な部分集合全体で、$i$ は単射。従って可逆部分の群は $G$ と同型である。比較射 $\mathcal P(X)\times\mathcal P(Y)\to\mathcal P(X\times Y)$ が全射でないことは、この結論に影響しない。
<!-- solution-end -->

## 7. どこまで一般化できたか

モノイダル関手には、単なる関手性とは別に自然性・結合・二つの単位条件が必要である。比較射が可逆な「強」と、必ずしも可逆ではない「lax」を混同しない。モノイド対象は、積と単位の射をモノイダル圏の結合子・単位子に照らして検証する構造であり、集合のモノイドとベクトル空間の結合代数を同じ形で扱う。最大の収穫は **lax で十分モノイド対象を運べる**という定理である。

次講では、掛け算 $-\otimes A$ に右随伴があるとき、写像を「内部の対象」として扱う閉モノイダル構造へ進む。
