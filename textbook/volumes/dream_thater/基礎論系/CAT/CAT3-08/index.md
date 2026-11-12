# CAT3-08 点ごとの右Kan拡張

## 1. 制限した図式から、元の圏へ戻す値を作る

前講では [点ごとの左Kan拡張](../CAT3-07/index.md#thm-cat3-07-pointwise)を、$Ka\to b$ を並べた図式の**余極限**で構成した。今回の問いは、[右Kan拡張の普遍性](../CAT3-06/index.md#def-cat3-06-right-kan)を満たす関手の値を実際に計算することである。

例として、$0\xrightarrow{u}1$ という二対象の圏 $\mathbf2$ のうち $0$ だけを見て、集合 $X$ が与えられたとする。$0$ で $X$ に一致する図式 $H(0)\to H(1)$ から、終点の値を「できるだけ普遍的」に付け足したい。右Kan拡張が返す図式は $X\to\{*\}$ である。終点を一元集合にすれば、どんな写像 $H(0)\to H(1)$ からも $H(1)\to\{*\}$ が一意に定まり、始点の比較と両立するからだ。

この一元集合は偶然の選択ではない。$1$ から $K$ の像 $0$ へ向かう射が**存在しない**ことに対応して、空図式の**極限（終対象）**として現れる。左との違いは、対象の値だけでなく射の向きと比較変換の向きにある。

以後、$\mathcal A,\mathcal B$ は[小さい圏](../CAT1-02/index.md#def-cat1-02-size)、$\mathcal C$ は[局所小圏](../CAT1-02/index.md#def-cat1-02-size)、$K:\mathcal A\to\mathcal B$ と $F:\mathcal A\to\mathcal C$ は関手とする。$gf$ は $f$ の後に $g$ を合成する記法である。[完備圏](../CAT2-04/index.md#def-cat2-04-complete)であれば以下で必要なすべての小極限が存在するが、実際に必要なのは各 $b$ の添字図式の極限だけである。

## 2. $b$ から $Ka$ へ向かう射を集める

$b$ を固定すると、求めたい $R(b)$ から各 $F(a)$ に**射影**を作るための添字が必要になる。それが $u:b\to Ka$ である。このような射を、射の間の関係も含めて集める。既習の [comma圏](../CAT2-10/index.md#def-cat2-10-comma) の特別な場合であり、$(b\downarrow K)$ と記す。

<a id="def-cat3-08-comma-diagram"></a>

<!-- formal-statement-start -->
> **定義（右Kan拡張のcomma添字図式）**
> 小圏 $\mathcal A,\mathcal B$、関手 $K:\mathcal A\to\mathcal B$、$b\in\mathcal B$ を取る。圏 $(b\downarrow K)$ の対象は $(a,u)$（$a\in\mathcal A$、$u:b\to Ka$）である。射 $(a,u)\to(a',u')$ は $\mathcal A$ の射 $f:a\to a'$ で、次を満たすものとする。

$$
K(f)\,u=u'.
$$

> 恒等射と合成は $\mathcal A$ のものを用いる。射影関手 $\pi_b:(b\downarrow K)\to\mathcal A$ は $(a,u)\mapsto a$、$f\mapsto f$ とし、極限を取る図式は次の合成関手である。

$$
D_b=F\pi_b:(b\downarrow K)\longrightarrow\mathcal C.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat3-08-comma-diagram -->
**定義の確認**。$\mathcal B=\mathbf2$、$K:\mathbf1\to\mathbf2$ は $0$ を選び、$F(*)=X$ とする。$(0\downarrow K)$ には $0\to0$ があるので $(*,1_0)$ が一つある。$(1\downarrow K)$ には $1\to0$ がないので対象はない。

恒等射 $1_*$ は $K(1_*)1_0=1_0$ を満たす。一般に $f:(a,u)\to(a',u')$、$g:(a',u')\to(a'',u'')$ なら

$$
K(gf)u=K(g)K(f)u=K(g)u'=u''
$$

なので合成しても条件が保たれる。射影は $\pi_b(gf)=gf=\pi_b(g)\pi_b(f)$ を満たす。従って対象・射・合成を本当に持つ圏と関手になった。
<!-- definition-example-end -->

**小ささの確認。** 添字圏の対象は各 $a$ について $\operatorname{Hom}_{\mathcal B}(b,Ka)$ を集めた集合であり、

$$
\operatorname{Ob}(b\downarrow K)
=\coprod_{a\in\operatorname{Ob}(\mathcal A)}
\operatorname{Hom}_{\mathcal B}(b,Ka).
$$

$\mathcal A$ は小さく、$\mathcal B$ のHomは集合なので右辺は集合である。また、固定した二対象 $(a,u),(a',u')$ の間の射集合は

$
\operatorname{Hom}_{(b\downarrow K)}((a,u),(a',u'))
=\{f\in\operatorname{Hom}_{\mathcal A}(a,a')\mid K(f)u=u'\}
$

である。各Hom集合は集合であり、対象の組も集合をなすので、全射の集まりも集合になる。従って $(b\downarrow K)$ は小さい。$\mathcal A$ が大きい場合には、この結論を無条件に使ってはいけない。

## 3. 極限から値と射を作る

[極限錐](../CAT2-01/index.md#def-cat2-01-limit)は、ある頂点から図式の各対象へ向かう射の族であり、図式中の射と可換になる。今は $R(b)$ を頂点として $F(a)$ への射影を取りたい。

<a id="def-cat3-08-pointwise"></a>

<!-- formal-statement-start -->
> **定義（点ごとの右Kan拡張の極限構成）**
> 小圏 $\mathcal A,\mathcal B$、局所小圏 $\mathcal C$ と関手 $K,F$ を取る。各 $b\in\mathcal B$ で $D_b=F\pi_b$ の極限が存在すると仮定し、その一つを $R(b)$ と選ぶ。各 $(a,u:b\to Ka)$ に対する極限錐の射を $p^b_{a,u}:R(b)\to F(a)$ と書く。すなわち

$$
R(b)=\underset{(a,u:b\to Ka)\in(b\downarrow K)}
{\operatorname{lim}}F(a).
$$

> 任意の $f:(a,u)\to(a',u')$ に対して錐の関係は

$$
F(f)\,p^b_{a,u}=p^b_{a',u'}
$$

> である。また $Q$ から各 $F(a)$ へ向かう整合する射 $q_{a,u}$ には、$p^b_{a,u}h=q_{a,u}$ を全添字で満たす一意の $h:Q\to R(b)$ が存在する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat3-08-pointwise -->
**定義の確認**。第2節の $K(*)=0$ の場合、$(0\downarrow K)$ は一対象だけなので $R(0)=X$、射影は $p^0_{*,1_0}=1_X$ にできる。任意の錐 $q:Q\to X$ の唯一の媒介射は $h=q$ である。一方、$(1\downarrow K)$ は空圏なので、$R(1)=\{*\}$ とする。空図式への錐には成分がなく、任意の集合 $Q$ から $\{*\}$ へ唯一の写像があるため、これは極限の普遍性を満たす。
<!-- definition-example-end -->

極限を各 $b$ で選んだだけでは、まだ $\mathcal B$ 上の関手ではない。$v:b\to b'$ の像を作る。

<a id="prop-cat3-08-transport"></a>

<!-- formal-statement-start -->
> **命題（添字の引き戻しと右Kan関手）**
> 上の全ての極限を選ぶ。$v:b\to b'$ に対して、合成によって関手

$$
v^*:(b'\downarrow K)\longrightarrow(b\downarrow K),
\qquad(a,u')\longmapsto(a,u'v),\quad f\longmapsto f
$$

> が定まる。さらに次を全ての $(a,u':b'\to Ka)$ で満たす一意の射 $R(v):R(b)\to R(b')$ が存在する。

$$
p^{b'}_{a,u'}R(v)=p^b_{a,u'v}.
$$

> $b\mapsto R(b)$、$v\mapsto R(v)$ は関手 $R:\mathcal B\to\mathcal C$ を定める。
<!-- formal-statement-end -->

### 証明の見取り図

$v^*$ の向きは **$b'$ 側の添字から $b$ 側**である。一方、極限の普遍性で得る射 $R(v)$ は **$R(b)$ から $R(b')$**へ向かう。右辺の射影が $D_{b'}$ への錐をなすことが核心である。

<!-- proof-start -->
### 証明

$f:(a,u')\to(a',u'')$ なら $Kf\,u'=u''$ である。右から $v$ を合成すれば

$$
Kf(u'v)=(Kf\,u')v=u''v
$$

となるから、同じ $f$ は $(a,u'v)\to(a',u''v)$ の射である。恒等射・合成を保つことは $\mathcal A$ の射を変えないことから従う。

$D_{b'}$ の射 $f$ に対して

$$
Ff\,p^b_{a,u'v}=p^b_{a',u''v}
$$

が成立する。ゆえに $(p^b_{a,u'v})$ は $R(b)$ を頂点とする $D_{b'}$ への錐である。[極限の普遍性](../CAT2-01/index.md#def-cat2-01-limit)から唯一の $R(v):R(b)\to R(b')$ を得る。

$v=1_b$ の場合は $p^b_{a,u}R(1_b)=p^b_{a,u}$。恒等射 $1_{R(b)}$ も同じ等式を満たすので $R(1_b)=1_{R(b)}$。

$b\xrightarrow{v}b'\xrightarrow{w}b''$ とすると、どの $(a,t:b''\to Ka)$ に対しても

$$
\begin{aligned}
p^{b''}_{a,t}R(w)R(v)
&=p^{b'}_{a,tw}R(v)\\
&=p^b_{a,(tw)v}\\
&=p^b_{a,t(wv)}
=p^{b''}_{a,t}R(wv).
\end{aligned}
$$

極限への媒介射の一意性から $R(w)R(v)=R(wv)$。従って $R$ は関手である。
<!-- proof-end -->

## 4. 余単位から右Kan拡張の普遍性へ

各 $a\in\mathcal A$ に対し $(a,1_{Ka})$ は $(Ka\downarrow K)$ の対象である。その射影を比較成分に選ぶ。

$$
\varepsilon_a=p^{Ka}_{a,1_{Ka}}:
R(Ka)\longrightarrow F(a).
$$

$f:a\to a'$ に対し、まず $(Ka\downarrow K)$ において

$
f:(a,1_{Ka})\longrightarrow(a',Kf)
$

は $Kf\,1_{Ka}=Kf$ を満たす射である。この添字圏での錐条件から

$
Ff\,p^{Ka}_{a,1_{Ka}}=p^{Ka}_{a',Kf}.
$

一方、[添字の引き戻し](#prop-cat3-08-transport)を $v=Kf:Ka\to Ka'$ と $(a',1_{Ka'})\in(Ka'\downarrow K)$ に適用すると、

$
p^{Ka'}_{a',1_{Ka'}}R(Kf)=p^{Ka}_{a',Kf}.
$

従って両式をつないで

$
\begin{aligned}
Ff\,\varepsilon_a
&=Ff\,p^{Ka}_{a,1_{Ka}}\\
&=p^{Ka}_{a',Kf}\\
&=p^{Ka'}_{a',1_{Ka'}}R(Kf)\\
&=\varepsilon_{a'}R(Kf).
\end{aligned}
$

両辺は $R(Ka)\to F(a')$ であり、$\varepsilon:RK\Rightarrow F$ が自然変換であることが証明された。

<a id="thm-cat3-08-pointwise"></a>

<!-- formal-statement-start -->
> **定理（点ごとの右Kan拡張の公式と普遍性）**
> $\mathcal A,\mathcal B$ を小圏、$\mathcal C$ を局所小圏、$K:\mathcal A\to\mathcal B$、$F:\mathcal A\to\mathcal C$ を関手とする。全ての $b$ で図式 $F\pi_b:(b\downarrow K)\to\mathcal C$ の極限が存在すると仮定する。第3節の $R$ と $\varepsilon_a=p^{Ka}_{a,1_{Ka}}$ の組は [右Kan拡張](../CAT3-06/index.md#def-cat3-06-right-kan)をなす。特に

$$
(\operatorname{Ran}_K F)(b)
\cong\underset{(a,u:b\to Ka)}{\operatorname{lim}}F(a).
$$

> 任意の $H:\mathcal B\to\mathcal C$ に対して

$$
\operatorname{Nat}(H,R)\xrightarrow{\ \cong\ }
\operatorname{Nat}(HK,F),
\quad \phi\longmapsto\varepsilon(\phi K)
$$

> は $H$ に自然な全単射である。$\mathcal C$ が[完備](../CAT2-04/index.md#def-cat2-04-complete)なら、任意の $F$ にこの構成を適用できる。
<!-- formal-statement-end -->

### 証明の見取り図

$\beta:HK\Rightarrow F$ から、$u:b\to Ka$ に対して $\beta_aH(u):H(b)\to F(a)$ を作る。これが錐であることから $\phi_b:H(b)\to R(b)$ を得る。$\phi$ の自然性と一意性は、全ての極限射影と合成して比較する。

<!-- proof-start -->
### 証明

**(1) 錐の構成。** 任意の $H$ と $\beta:HK\Rightarrow F$ を固定する。$b$ と $(a,u:b\to Ka)$ について

$$
q^b_{a,u}=\beta_a H(u):H(b)\longrightarrow F(a)
$$

と定める。$(a,u)\xrightarrow{f}(a',u')$ なら $Kf\,u=u'$。$\beta$ の自然性 $Ff\,\beta_a=\beta_{a'}H(Kf)$ を使うと

$$
\begin{aligned}
Ff\,q^b_{a,u}
&=Ff\,\beta_a H(u)\\
&=\beta_{a'}H(Kf)H(u)\\
&=\beta_{a'}H(Kf\,u)
=\beta_{a'}H(u')
=q^b_{a',u'}.
\end{aligned}
$$

従って $q^b$ は $D_b$ への錐である。

**(2) 各成分と自然性。** 極限の普遍性から唯一の $\phi_b:H(b)\to R(b)$ が存在して

$$
p^b_{a,u}\phi_b=\beta_aH(u)
$$

を満たす。$v:b\to b'$ に対して、$\phi_{b'}H(v)$ と $R(v)\phi_b$ はいずれも $H(b)\to R(b')$ であり、任意の $(a,u':b'\to Ka)$ について

$$
\begin{aligned}
p^{b'}_{a,u'}\phi_{b'}H(v)
&=\beta_aH(u')H(v)
=\beta_aH(u'v),\\
p^{b'}_{a,u'}R(v)\phi_b
&=p^b_{a,u'v}\phi_b
=\beta_aH(u'v).
\end{aligned}
$$

極限への媒介射の一意性から $\phi_{b'}H(v)=R(v)\phi_b$。よって $\phi:H\Rightarrow R$ は自然変換になる。

**(3) 比較条件。** $b=Ka,u=1_{Ka}$ を代入すると

$$
\varepsilon_a\phi_{Ka}
=p^{Ka}_{a,1_{Ka}}\phi_{Ka}
=\beta_aH(1_{Ka})=\beta_a.
$$

従って $\varepsilon(\phi K)=\beta$ が成立する。

**(4) 一意性。** $\phi':H\Rightarrow R$ も同じ $\beta$ を与えるとする。[引き戻しの式](#prop-cat3-08-transport)へ $u:b\to Ka$ と $(a,1_{Ka})$ を代入すると

$$
p^b_{a,u}=p^{Ka}_{a,1_{Ka}}R(u)
=\varepsilon_aR(u).
$$

$\phi'$ の自然性と比較条件により

$$
\begin{aligned}
p^b_{a,u}\phi'_b
&=\varepsilon_a R(u)\phi'_b\\
&=\varepsilon_a\phi'_{Ka}H(u)\\
&=\beta_aH(u)
=p^b_{a,u}\phi_b.
\end{aligned}
$$

すべての射影で等しいので、極限の普遍性から $\phi'_b=\phi_b$。従って $\phi'=\phi$ である。

**(5) $H$ に関する自然性。** $t:H'\Rightarrow H$ を取る。比較写像は

$$
\varepsilon((\phi t)K)
=\varepsilon(\phi K)(tK)
=\beta(tK)
$$

を満たす。これは両側のHom集合への $t$ による前合成と可換である。以上により自然な全単射が得られた。$\mathcal C$ が完備なら小さい $(b\downarrow K)$ に対する全極限が存在する。
<!-- proof-end -->

**注意。** 任意の右Kan拡張が無条件にこの極限として与えられるとは主張していない。各comma図式の極限の存在という十分条件から、**点ごとの**構成を証明した。別の右Kan拡張との比較は[Kan拡張の同型一意性](../CAT3-06/index.md#prop-cat3-06-uniqueness)による。

## 5. 図式の変更と随伴

$F$ の値や射が変化したときの対応も必要である。$\sigma:F\Rightarrow G$ があるなら、$F(a)$ への射影を $\sigma_a:F(a)\to G(a)$ で合成すると $G$ への錐になる。

<a id="prop-cat3-08-functoriality"></a>

<!-- formal-statement-start -->
> **命題（右Kan拡張のFに関する関手性）**
> 小圏 $\mathcal A,\mathcal B$、完備な局所小圏 $\mathcal C$ と $K:\mathcal A\to\mathcal B$ を取る。各 $F$ の点ごとの右Kan拡張を $R_F$ と選ぶ。$\sigma:F\Rightarrow G$ に対し、次の等式は自然変換 $R\sigma:R_F\Rightarrow R_G$ を一意に定める。

$$
p^{G,b}_{a,u}(R\sigma)_b
=\sigma_a p^{F,b}_{a,u}.
$$

> この対応は関手 $\operatorname{Ran}_K:[\mathcal A,\mathcal C]\to[\mathcal B,\mathcal C]$ を定め、[前合成関手](../CAT3-06/index.md#def-cat3-06-precomposition) $K^*$ の右随伴となる。
<!-- formal-statement-end -->

### 証明の見取り図

錐の条件、$b$ に関する自然性、$\sigma$ の恒等・合成保存のいずれも射影で確かめる。最後に第4節の全単射が $F$ にも自然であることを検証する。

<!-- proof-start -->
### 証明

$f:(a,u)\to(a',u')$ について $\sigma_{a'}Ff=Gf\,\sigma_a$ なので

$$
Gf\,\sigma_a p^{F,b}_{a,u}
=\sigma_{a'}Ff\,p^{F,b}_{a,u}
=\sigma_{a'}p^{F,b}_{a',u'}.
$$

従って $(\sigma_a p^{F,b}_{a,u})$ は $G\pi_b$ への錐であり、極限から $(R\sigma)_b:R_F(b)\to R_G(b)$ が一意に得られる。

$v:b\to b'$ について、任意の $(a,u':b'\to Ka)$ で

$$
\begin{aligned}
p^{G,b'}_{a,u'}(R\sigma)_{b'}R_F(v)
&=\sigma_a p^{F,b'}_{a,u'}R_F(v)
=\sigma_a p^{F,b}_{a,u'v},\\
p^{G,b'}_{a,u'}R_G(v)(R\sigma)_b
&=p^{G,b}_{a,u'v}(R\sigma)_b
=\sigma_a p^{F,b}_{a,u'v}.
\end{aligned}
$$

ゆえに $(R\sigma)_{b'}R_F(v)=R_G(v)(R\sigma)_b$。恒等変換の場合、射影上で $p^{F,b}(R1_F)=p^{F,b}$ なので $R1_F=1_{R_F}$。$\sigma:F\Rightarrow G$、$\tau:G\Rightarrow J$ について

$$
\begin{aligned}
p^{J,b}_{a,u}(R\tau)_b(R\sigma)_b
&=\tau_a p^{G,b}_{a,u}(R\sigma)_b\\
&=\tau_a\sigma_a p^{F,b}_{a,u}\\
&=p^{J,b}_{a,u}(R(\tau\sigma))_b
\end{aligned}
$$

だから $R(\tau\sigma)=R\tau\,R\sigma$。また $b=Ka,u=1_{Ka}$ とすれば

$$
\varepsilon_{G,a}(R\sigma)_{Ka}
=\sigma_a\varepsilon_{F,a},
$$

すなわち余単位は $F$ に自然である。第4節の全単射について、$H$ に自然であることは既に証明した。$F$ の射 $\sigma$ についても

$$
\sigma\,\varepsilon_F(\phi K)
=\varepsilon_G((R\sigma)K)(\phi K)
=\varepsilon_G(((R\sigma)\phi)K)
$$

が成り立つ。従って全単射は二変数に自然であり、[右随伴判定](../CAT3-06/index.md#thm-cat3-06-right-adjoint)から $K^*\dashv\operatorname{Ran}_K$ が成立する。
<!-- proof-end -->

## 6. 極限の値を実際に計算する

### 6.1 一つの値を二対象へ延長する

$\mathbf2=(0\xrightarrow{u}1)$、$F(*)=X$ とする。

- $K:\mathbf1\to\mathbf2$ が $0$ を選ぶと、$(0\downarrow K)$ は一対象、$(1\downarrow K)$ は空圏。従って $R(0)=X,R(1)=\{*\}$、$R(u):X\to\{*\}$ は唯一の写像である。余単位は $\varepsilon_*:R(0)\to X$ で、$1_X$ である。
- $K$ が $1$ を選ぶと、$(0\downarrow K)$ は $( *,u)$、$(1\downarrow K)$ は $(*,1_1)$ のそれぞれ一対象。$R(0)=R(1)=X$、$R(u)=1_X$、$\varepsilon_*=1_X$ と選べる。

これが**制限・延長**の具体例である。たとえば $H=(Z_0\xrightarrow{h}Z_1)$ を任意の集合値図式とする。$K$ が $0$ を選ぶ場合、$H\to(X\to\{*\})$ は始点での写像 $f:Z_0\to X$ を選べば、終点では唯一の $Z_1\to\{*\}$ で決まる。可換性は $!_X f=!_{Z_1}h$ で確かめられる。従って

$$
\operatorname{Nat}(H,R)\cong\operatorname{Hom}(Z_0,X).
$$

右辺は制限 $HK$ から $F$ への自然変換全体である。左Kan拡張で生じた空集合・余積と、右の終対象・積は取り違えられない。

### 6.2 二つの値を一点で読む：積と関数

$\mathcal A$ は離散二点 $p,q$、$\mathcal B=\mathbf1$、$K$ は唯一の関手とし、$F(p)=X,F(q)=Y$ とする。$( *\downarrow K)$ には二対象と恒等射しかない。極限の[積としての普遍性](../CAT2-01/index.md#def-cat2-01-limit)により

$$
R(*)=X\times Y,\qquad
p_{p,1_*}(x,y)=x,\quad p_{q,1_*}(x,y)=y.
$$

例えば $X=\{0,1\}$、$Y=\{a,b,c\}$ なら六組の組があり、二つの射影は組の第1・第2成分を返す。任意の集合 $Z$ と関数 $f:Z\to X$、$g:Z\to Y$ があれば、比較写像は

$$
\phi(z)=(f(z),g(z)):Z\longrightarrow X\times Y.
$$

射影で $p_p\phi=f,p_q\phi=g$、またこの二条件を満たす写像は全ての $z$ で同じ組を返すので一意である。これは単なる積の計算にとどまらず、右Kanの自然変換の普遍性そのものを具体化している。

### 6.3 一本の矢印を一点へ潰す：始点が極限になる

$K:\mathbf2\to\mathbf1$ を唯一の関手とし、$F=(X\xrightarrow{f}Y)$ とする。$( *\downarrow K)$ は $0\to1$ と同型で、$D_*$ は $X\xrightarrow{f}Y$ である。錐 $(q_0:Q\to X,q_1:Q\to Y)$ の条件は $fq_0=q_1$。従って

$$
R(*)=X,\qquad p_0=1_X,\quad p_1=f.
$$

錐の媒介写像は $h=q_0$ と強制され、$p_1h=fq_0=q_1$ も満たす。余単位は $\varepsilon_0=1_X,\varepsilon_1=f$ である。前講の左Kan拡張が同じ図式の**終点 $Y$**を返したことと対照的である。

### 6.4 順序圏の極限は共通部分

集合 $S$ の部分集合を対象、包含を射とする順序圏 $\mathcal P(S)$ を値域に取る。離散二点 $p,q$ の値を $P,Q\subseteq S$ とすれば、同じ離散comma図式の錐の条件は $T\subseteq P$ かつ $T\subseteq Q$ である。両方を満たす最大の下界は $P\cap Q$ なので

$$
R(*)=P\cap Q.
$$

極限の「全ての対象へ向かう錐」という条件を包含関係へ翻訳したからこそ、この答えが得られる。前講の余極限は反対に和集合であった。

## 7. 充満忠実性と存在の境界

<a id="prop-cat3-08-fully-faithful"></a>

<!-- formal-statement-start -->
> **命題（充満忠実な関手に沿う右Kan拡張の余単位）**
> $K:\mathcal A\to\mathcal B$ を小圏間の[充満忠実な関手](../CAT1-09/index.md#def-cat1-09-fully-faithful)とし、$F:\mathcal A\to\mathcal C$ の点ごとの右Kan拡張 $(R,\varepsilon)$ が第4節の極限構成から得られたとする。このとき各 $a$ で $\varepsilon_a:R(Ka)\to F(a)$ は同型である。
<!-- formal-statement-end -->

### 証明の見取り図

$(Ka\downarrow K)$ の $(a,1_{Ka})$ が**始対象**になることを証明する。始対象を持つ図式の極限は、その始対象における値で表せることを射から確かめる。

<!-- proof-start -->
### 証明

任意の $(a',u:Ka\to Ka')$ を取る。$K$ は充満なので $Kf=u$ を満たす $f:a\to a'$ が存在する。忠実なので $f$ は一意。しかも $Kf\,1_{Ka}=u$ だから $(a,1_{Ka})\to(a',u)$ の唯一の射である。従って $(a,1_{Ka})$ は始対象である。

この射 $f$ に対して $Ff:F(a)\to F(a')$ を対応させると、始対象からの射の一意性により錐ができる。任意の錐 $q_{a',u}:Q\to F(a')$ は、$f$ に関する錐条件から

$$
q_{a',u}=Ff\,q_{a,1_{Ka}}
$$

を満たす。従って媒介射は $q_{a,1_{Ka}}:Q\to F(a)$ の一通りだけである。つまり $F(a)$ はこの図式の極限で、$(R(Ka),p)$ と極限として同型である。比較射 $p^{Ka}_{a,1_{Ka}}=\varepsilon_a$ 自身がその同型である。
<!-- proof-end -->

充満性を欠くと $f$ が存在せず、忠実性を欠くと一意性が崩れる可能性がある。ここで示したのは十分条件であり、逆を無条件に主張するものではない。

次に[右Kan拡張の定義](../CAT3-06/index.md#def-cat3-06-right-kan)は、各comma極限が存在しない圏でも自動的に解を保証するわけではない。

<a id="prop-cat3-08-obstruction"></a>

<!-- formal-statement-start -->
> **命題（終対象がないため右Kan拡張が存在しない例）**
> $\mathcal A=\varnothing$（空圏）、$\mathcal B=\mathbf1$、$K$ は唯一の関手とする。$\mathcal C$ を二元以上の有限集合と全写像の圏 $\mathbf{FinSet}_{\ge 2}$ とする。唯一の $F:\mathcal A\to\mathcal C$ に対する右Kan拡張は存在しない。
<!-- formal-statement-end -->

### 証明の見取り図

右Kan拡張があるなら $R(*)$ は終対象でなければならない。しかし二元集合から任意の候補への異なる定数写像が存在する。

<!-- proof-start -->
### 証明

任意の $H:\mathbf1\to\mathcal C$ に対し、$HK$ と $F$ はともに空圏上の関手である。自然変換 $HK\Rightarrow F$ は成分を指定しないため一つしかない。もし $(R,\varepsilon)$ が右Kan拡張なら[普遍射・自然全単射](../CAT3-06/index.md#prop-cat3-06-correspondence)より

$$
\operatorname{Hom}_{\mathcal C}(H(*),R(*))
\cong\operatorname{Nat}(HK,F)=\{*\}
$$

である。ところが $R(*)$ は少なくとも二元を持つ有限集合である。$H(*)=\{0,1\}$ と取れば、それぞれ $R(*)$ の異なる元へ送る二つの定数写像が存在し、Hom集合は一元ではない。矛盾する。
<!-- proof-end -->

欠けたのは空comma図式の**極限（終対象）**である。一般の完備性は点ごとの構成の十分条件だが、この例では必要な極限そのものが存在しない。

## 8. 演習：射の向きと普遍性を自力で確かめる

### 問題1：始点を選ぶ関手と空comma圏

- Level: A
- 問題ID: CAT3-08-COMMA-ARROW

$\mathbf2$ を $0\xrightarrow{u}1$ とし、$K:\mathbf1\to\mathbf2$ が $0$ を選ぶ。$F(*)=X$ は集合である。$(0\downarrow K)$、$(1\downarrow K)$ の対象・射を挙げ、$R(0),R(1),R(u)$ と余単位を求めよ。空図式の極限の普遍性も述べよ。

<!-- solution-start -->
**詳細解答**：$0\to K(*)=0$ は $1_0$ だけなので $(0\downarrow K)$ は $(*,1_0)$ と恒等射の一対象圏である。$1\to0$ はないので $(1\downarrow K)=\varnothing$。一対象の極限は $X$ で射影 $1_X$、空図式の極限は終対象 $\{*\}$ である。実際、空図式への錐は任意の頂点について一通りで、任意の集合 $Q$ から $\{*\}$ への写像が唯一である。

$$
R(0)=X,\qquad R(1)=\{*\},\qquad R(u)=!:X\to\{*\}.
$$

$R(u)$ の特徴づけは $b'=1$ 側に射影がないため条件が空で、終対象への唯一の射で定まる。余単位は $\varepsilon_*=p^0_{*,1_0}=1_X$。
<!-- solution-end -->

### 問題2：二つの関数を組の関数にする

- Level: A
- 問題ID: CAT3-08-DISCRETE-PRODUCT

$\mathcal A=\{p,q\}$ を離散圏、$\mathcal B=\mathbf1$、$K$ は唯一の関手、$F(p)=\{0,1\},F(q)=\{a,b\}$ とする。$R(*)$ と射影を書け。$Z=\{s,t\}$ とし、$f(s)=0,f(t)=1$、$g(s)=b,g(t)=a$ から唯一の $h:Z\to R(*)$ を求め、極限の条件を検証せよ。

<!-- solution-start -->
**詳細解答**：$( *\downarrow K)$ は $(p,1_*),(q,1_*)$ の二対象で恒等射のみなので、$R(*)=\{0,1\}\times\{a,b\}$。射影 $p_p(x,y)=x$、$p_q(x,y)=y$ は型 $R(*)\to F(p),F(q)$ の関数である。

$$
h(s)=(0,b),\qquad h(t)=(1,a).
$$

すると $p_ph(s)=0=f(s)$、$p_qh(s)=b=g(s)$、$t$ でも $p_ph(t)=1=f(t)$、$p_qh(t)=a=g(t)$。同じ条件を満たす $h'$ については各 $z$ で $h'(z)=(p_ph'(z),p_qh'(z))=(f(z),g(z))=h(z)$ なので $h'=h$。
<!-- solution-end -->

### 問題3：一本の矢印の極限

- Level: A
- 問題ID: CAT3-08-ARROW-COLLAPSE

$K:\mathbf2\to\mathbf1$ を唯一の関手、$F=(X\xrightarrow{f}Y)$ とする。$(*\downarrow K)$ の射を記述し、$R(*)$ と $\varepsilon_0,\varepsilon_1$ を求めよ。任意の錐の媒介射が一意である理由を示せ。

<!-- solution-start -->
**詳細解答**：添字対象は $(0,1_*),(1,1_*)$、非恒等射は $u:0\to1$ による一つで、$K(u)1_*=1_*$ を満たす。$D_*$ は $X\xrightarrow{f}Y$。錐 $(q_0:Q\to X,q_1:Q\to Y)$ には $fq_0=q_1$ が必要である。$R(*)=X$、$p_0=1_X,p_1=f$ とすれば $fp_0=p_1$。媒介射 $h$ は $p_0h=q_0$ により $h=q_0$ と強制され、そのとき $p_1h=fq_0=q_1$。従って極限で、$\varepsilon_0=p_0=1_X$、$\varepsilon_1=p_1=f$ である。
<!-- solution-end -->

### 問題4：余単位の自然性を導く

- Level: A
- 問題ID: CAT3-08-COUNIT-NATURALITY

小圏 $\mathcal A,\mathcal B$、関手 $K,F$ と必要な極限を仮定する。$f:a\to a'$ を固定し、$(Ka'\downarrow K)$ で使用する射を一つ作れ。[引き戻しの式](#prop-cat3-08-transport)と錐条件を用いて $Ff\,\varepsilon_a=\varepsilon_{a'}R(Kf)$ を再導出し、型を記せ。

<!-- solution-start -->
**詳細解答**：$(Ka\downarrow K)$ の対象 $(a,1_{Ka})$ と $(a',Kf)$ を取る。$Kf\,1_{Ka}=Kf$ より $f:(a,1_{Ka})\to(a',Kf)$ はcomma圏の射である。この添字圏の錐条件は

$
Ff\,p^{Ka}_{a,1_{Ka}}=p^{Ka}_{a',Kf}.
$

一方、[引き戻しの式](#prop-cat3-08-transport)に $v=Kf:Ka\to Ka'$ と $(a',1_{Ka'})$ を代入すると

$
p^{Ka'}_{a',1_{Ka'}}R(Kf)=p^{Ka}_{a',Kf}.
$

左の式の $p^{Ka}_{a',Kf}$ に右の式を代入して

$
\begin{aligned}
Ff\,\varepsilon_a
&=Ff\,p^{Ka}_{a,1_{Ka}}\\
&=p^{Ka}_{a',Kf}\\
&=p^{Ka'}_{a',1_{Ka'}}R(Kf)\\
&=\varepsilon_{a'}R(Kf).
\end{aligned}
$

両辺は $R(Ka)\to F(a')$ である。
<!-- solution-end -->

### 問題5：終対象の非存在を見抜く

- Level: A
- 問題ID: CAT3-08-NONEXISTENCE

$\mathcal A=\varnothing,\mathcal B=\mathbf1$ とし、値域を二元以上の有限集合の圏とする。右Kan拡張が存在するとすればどのHom集合が一元集合となるか、なぜ二元集合を入力すると矛盾するか、欠ける極限は何かを述べよ。

<!-- solution-start -->
**詳細解答**：空圏上の自然変換 $HK\Rightarrow F$ は一つなので、右Kan拡張の普遍性は任意の $H(*)$ について $\operatorname{Hom}(H(*),R(*))$ が一元集合であることを要求する。$H(*)=\{0,1\}$ とすると、$R(*)$ は二元以上だからその異なる二元 $r_0,r_1$ へそれぞれ一定に送る写像 $c_0,c_1$ があり、$c_0\ne c_1$。従って普遍性は成立しない。$( *\downarrow K)$ は空圏で、その極限に必要な終対象が値域には存在しない。
<!-- solution-end -->

### 問題6：離散二点を矢印圏に埋め込む

- Level: B
- 問題ID: CAT3-08-MIXED-ARROW

$\mathcal A$ を離散二点 $p,q$、$\mathcal B=\mathbf2$ を $0\xrightarrow{v}1$ とする。$K(p)=0,K(q)=1$、$F(p)=X,F(q)=Y$ は集合とする。

1. $(0\downarrow K),(1\downarrow K)$ を記述し、$R(0),R(1),R(v),\varepsilon_p,\varepsilon_q$ を求めよ。
2. $H=(Z_0\xrightarrow{h}Z_1)$ と $\beta_p:Z_0\to X,\beta_q:Z_1\to Y$ が与えられたとき、唯一の自然変換 $\phi:H\Rightarrow R$ を書き、比較条件と自然性を確かめよ。

<!-- solution-start -->
**詳細解答**：

1. $0$ から $Kp=0$ へは $1_0$、$Kq=1$ へは $v$ がある。$\mathcal A$ は離散なので $(0\downarrow K)$ の二対象 $(p,1_0),(q,v)$ の間に射はない。$1$ から $0$ へは射がなく、$1$ から $1$ へは $1_1$ のみだから $(1\downarrow K)$ は $(q,1_1)$ の一対象圏である。従って

   $$
   R(0)=X\times Y,\qquad R(1)=Y.
   $$

   引き戻しは $(q,1_1)$ を $(q,v)$ へ送るので $R(v)=\operatorname{pr}_Y:X\times Y\to Y$。余単位は $\varepsilon_p=\operatorname{pr}_X$、$\varepsilon_q=1_Y$。

2. $HK$ 上では射がないから二つの $\beta$ は自然変換をなす。比較条件は $\varepsilon_p\phi_0=\beta_p$、$\varepsilon_q\phi_1=\beta_q$ なので第1成分は $\beta_p$、$\phi_1=\beta_q$。自然性 $R(v)\phi_0=\phi_1h$ は $\operatorname{pr}_Y\phi_0=\beta_qh$ だから、

   $$
   \phi_0(z)=(\beta_p(z),\beta_q(h(z))),\qquad
   \phi_1=\beta_q.
   $$

   各 $z\in Z_0$ で $\operatorname{pr}_X\phi_0(z)=\beta_p(z)$、$\operatorname{pr}_Y\phi_0(z)=\beta_qh(z)$。よって比較条件と自然性が成立する。別の $\phi'$ も同じ比較条件と自然性を満たせば積の二射影が一致するので $\phi'_0=\phi_0$、$\phi'_1=\phi_1$。
<!-- solution-end -->

### 問題7：充満忠実性をどう使うか

- Level: B
- 問題ID: CAT3-08-FULLY-FAITHFUL

$K:\mathcal A\to\mathcal B$ を小圏間の充満忠実な関手とし、各comma極限が存在するとする。$(a,1_{Ka})$ が $(Ka\downarrow K)$ の始対象であることと、$\varepsilon_a$ が同型であることを、極限錐の射を実際に構成して証明せよ。

<!-- solution-start -->
**詳細解答**：任意の対象 $(a',u:Ka\to Ka')$ について、充満性から $u=Kf$ を満たす $f:a\to a'$ が存在する。忠実性からその $f$ は一意で、$Kf\,1_{Ka}=u$ により $(a,1_{Ka})\to(a',u)$ のcomma圏の射である。従って $(a,1_{Ka})$ は始対象となる。

[第7節の命題](#prop-cat3-08-fully-faithful)の証明を構成から再確認する。$(a',u)$ への射影を $p_{a',u}=Ff:F(a)\to F(a')$ と置く。射 $g:(a',u)\to(a'',u'')$ に対し

$$
K(gf)=K(g)u=u'',\qquad
F(g)p_{a',u}=F(gf)=p_{a'',u''}
$$

が成り立つ。従って $(p_{a',u})$ は $F(a)$ を頂点とする錐になる。

任意の錐 $(q_{a',u}:Q\to F(a'))$ について、始対象からの唯一の射 $f$ を用いると

$$
q_{a',u}=F(f)\,q_{a,1_{Ka}}
$$

である。よって媒介射は $q_{a,1_{Ka}}:Q\to F(a)$ の一通りだけ。従って $F(a)$ も極限であり、選んだ極限 $R(Ka)$ からの射影 $\varepsilon_a$ は極限同士の同型になる。充満性は射 $f$ の存在、忠実性はその一意性に使った。
<!-- solution-end -->

### 問題8：$F$ を変えたときの積の写像

- Level: B
- 問題ID: CAT3-08-FUNCTOR-IN-F

離散二点 $p,q$ を一点に送る $K$ を考え、$F(p)=X,F(q)=Y$、$G(p)=X',G(q)=Y'$ とする。$\sigma:F\Rightarrow G$ の成分が $s:X\to X',t:Y\to Y'$ のとき $(R\sigma)_*:X\times Y\to X'\times Y'$ を求め、$\tau:G\Rightarrow J$（成分 $r:X'\to X'',z:Y'\to Y''$）との合成を検証せよ。

<!-- solution-start -->
**詳細解答**：$G$ の極限の射影 $\operatorname{pr}_{X'},\operatorname{pr}_{Y'}$ に関する条件は

$$
\operatorname{pr}_{X'}(R\sigma)=s\,\operatorname{pr}_{X},
\qquad
\operatorname{pr}_{Y'}(R\sigma)=t\,\operatorname{pr}_{Y}.
$$

よって $(R\sigma)(x,y)=(s(x),t(y))$ であり、積の普遍性によって一意。次に $(R\tau)(x',y')=(r(x'),z(y'))$ だから

$$
\begin{aligned}
(R\tau)(R\sigma)(x,y)
&=(R\tau)(s(x),t(y))\\
&=(r(s(x)),z(t(y)))\\
&=R(\tau\sigma)(x,y).
\end{aligned}
$$

恒等変換の場合は $(x,y)\mapsto(x,y)$ であり、$R1_F=1_{R_F}$ も成立する。
<!-- solution-end -->

### 問題9：順序圏で共通部分が極限になる条件

- Level: B
- 問題ID: CAT3-08-POSET-MEET

$S$ の部分集合の順序圏 $\mathcal P(S)$ に、離散二点 $p,q$ から $F(p)=P,F(q)=Q$ を置く。右Kan拡張の値と普遍性を包含で示せ。値域を非空部分集合の順序圏に変えたとき、$P\cap Q=\varnothing$ ならこの極限がなぜ存在しないかも示せ。ただし $P,Q$ はそれぞれ非空とする。

<!-- solution-start -->
**詳細解答**：$(*\downarrow K)$ は離散二点である。頂点 $T$ からの錐は、部分集合の包含射

$$
T\subseteq P,\qquad T\subseteq Q
$$

を両方持つことを要求する。これは $T\subseteq P\cap Q$ と同値である。

$P\cap Q$ 自身には $P,Q$ への二つの包含射があり、任意の錐 $T$ から $P\cap Q$ への包含射が唯一ある。従って極限は $P\cap Q$ である。

値域を非空部分集合だけに限定し $P\cap Q=\varnothing$ とすると、どの非空 $T$ も両方の包含条件を満たせない。従ってこの図式には極限錐の頂点が存在せず、極限を構成できない。圏全体の完備性は十分条件だが、今回必要な極限がない場合は点ごとの公式を使えない。
<!-- solution-end -->

### 問題10：右Kan拡張を二段階で行う

- Level: C
- 問題ID: CAT3-08-COMPOSITION

$\mathcal A,\mathcal B,\mathcal D$ は小圏、$\mathcal C$ は完備な局所小圏とする。関手 $K:\mathcal A\to\mathcal B$、$J:\mathcal B\to\mathcal D$、$F:\mathcal A\to\mathcal C$ がある。$(R,\varepsilon^K)=\operatorname{Ran}_K F$、$(S,\varepsilon^J)=\operatorname{Ran}_J R$ を点ごとの構成で選ぶ。

1. $\delta_a=\varepsilon^K_a\varepsilon^J_{Ka}:S(JKa)\to F(a)$ が自然変換 $\delta:SJK\Rightarrow F$ を定めることを示せ。
2. 任意の $H:\mathcal D\to\mathcal C$ と $\beta:HJK\Rightarrow F$ から、$\beta=\delta(\phi JK)$ となる唯一の $\phi:H\Rightarrow S$ を二つの右Kan普遍性で作れ。
3. $S\cong\operatorname{Ran}_{JK}F$ を、比較自然変換を保つ同型として結論せよ。

<!-- solution-start -->
**詳細解答**：

1. $f:a\to a'$ に対して、まず余単位 $\varepsilon^J_b:S(Jb)\to R(b)$ の自然性を $b=Ka$ と $Kf:Ka\to Ka'$ に適用し、続いて $\varepsilon^K$ の自然性を $f$ に適用する。

   $$
   \begin{aligned}
   Ff\,\delta_a
   &=Ff\,\varepsilon^K_a\varepsilon^J_{Ka}\\
   &=\varepsilon^K_{a'}R(Kf)\varepsilon^J_{Ka}\\
   &=\varepsilon^K_{a'}\varepsilon^J_{Ka'}S(JKf)\\
   &=\delta_{a'}S(JKf).
   \end{aligned}
   $$

   両辺は $S(JKa)\to F(a')$ なので $\delta$ は自然変換である。

2. まず $R=\operatorname{Ran}_K F$ の普遍性を $HJ:\mathcal B\to\mathcal C$ と $\beta:(HJ)K\Rightarrow F$ に適用する。唯一の $\gamma:HJ\Rightarrow R$ が存在して

   $$
   \beta=\varepsilon^K(\gamma K)
   $$

   を満たす。次に $S=\operatorname{Ran}_J R$ の普遍性を $\gamma:HJ\Rightarrow R$ に適用し、唯一の $\phi:H\Rightarrow S$ を得る。その条件は

   $$
   \gamma=\varepsilon^J(\phi J)
   $$

   である。各 $a$ について二式を代入すれば

   $$
   \begin{aligned}
   \beta_a
   &=\varepsilon^K_a\gamma_{Ka}\\
   &=\varepsilon^K_a\varepsilon^J_{Ka}\phi_{JKa}\\
   &=\delta_a\phi_{JKa}.
   \end{aligned}
   $$

   一意性も二段階で示す。別の $\phi'$ が同じ $\beta$ を与えるなら $\gamma'=\varepsilon^J(\phi'J)$ と置く。第1段階の一意性で $\gamma'=\gamma$、第2段階で $\phi'=\phi$。

3. 第2問より $(S,\delta)$ は [右Kan拡張の定義](../CAT3-06/index.md#def-cat3-06-right-kan)を満たす。一方 $JK:\mathcal A\to\mathcal D$ に対する各 $(d\downarrow JK)$ は小さく、$\mathcal C$ は完備だから [点ごとの公式](#thm-cat3-08-pointwise)によって $\operatorname{Ran}_{JK}F$ が存在する。[同型一意性](../CAT3-06/index.md#prop-cat3-06-uniqueness)より、比較 $\delta$ を保つ自然同型

   $$
   \operatorname{Ran}_J(\operatorname{Ran}_K F)
   \xrightarrow{\ \cong\ }\operatorname{Ran}_{JK}F
   $$

   を得る。左は二段階の極限、右は一段階の極限として作ったので、対象や射の選択の**等号**は一般に主張しない。
<!-- solution-end -->

## 9. 次の講義へ

右Kan拡張は、$b\to Ka$ の全ての到達経路を並べた**極限**によって値を持ち、自然な射・余単位・二変数の自然全単射を備えることが分かった。具体的な集合の関数や順序の共通部分にも落とせる。

次の CAT3-09「end・coendとKan公式」では、この極限・余極限をHom関手で重み付けした形へ組み替える。そのために通常の自然性と異なる dinaturality を導入し、end・coend を等化子・余等化子から構成する。
