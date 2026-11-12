# CAT3-09 end・coendとKan公式

## 1. Kan拡張を「射と値の組」から読み直す

[点ごとの左Kan拡張](../CAT3-07/index.md#thm-cat3-07-pointwise)は、$Ka\to b$ を持つ対象を集めた余極限だった。[右Kan拡張](../CAT3-08/index.md#thm-cat3-08-pointwise)は $b\to Ka$ を集めた極限だった。どちらも正しいが、添字の対象に「射 $u$ と値 $x$」を毎回書くのは煩雑である。

例えば $K:\mathcal A\to\mathcal B$、$F:\mathcal A\to\mathbf{Set}$、$b\in\mathcal B$ を固定する。左Kan拡張の $b$ での元は、まず射 $u:Ka\to b$ と $x\in F(a)$ の組で表せる。射 $f:a\to a'$ と $u':Ka'\to b$ を取ると、$K(f):Ka\to Ka'$ だから、$u'Kf=u'\circ K(f):Ka\to b$ も射になる。このとき次の二つの組
$$
(u'Kf,x)\quad\text{と}\quad(u',F(f)(x))
$$

は同じ元を表すべきである。この「異なる添字の情報を同一視する」仕組みが **coend（余端）** である。反対に、右Kan拡張では各 $u:b\to Ka$ へ値を割り当て、それらが射 $f$ に沿って一致する条件が必要となる。この「全成分の整合性」を普遍的に扱う構成も必要となる。

本講では $\mathcal A,\mathcal B$ は小さい圏、$\mathcal C$ は必要に応じて積・等化子・余積・余等化子を持つ局所小圏とする。積や余積の添字は集合であり、$gf$ は $f$ の後に $g$ を合成する。集合値の公式では $\mathcal C=\mathbf{Set}$ とする。$\int_a$ と $\int^a$ は通常の実数値積分ではなく、圏論的な端・余端の記法である。

## 2. end：変数を二つ持つ図式を整合させる

### 2.1 くさびとdinaturality

[自然変換](../CAT1-07/index.md#def-cat1-07-natural-transformation)では二つの関手の同じ対象での成分を、各射に沿って比較した。ここでは一つの関手が $H:\mathcal A^{\mathrm{op}}\times\mathcal A\to\mathcal C$ の形を持つ。$H(a,b)$ は第一変数について反変、第二変数について共変である。

対角上の $H(a,a)$ を各 $a$ で取り出し、共通の対象 $E$ から射を出すとする。射 $f:a\to b$ に関して、$H(a,b)$ へ至る二つの経路が一致することを求める。これは自然変換とは定義域が異なるので、**dinaturality（双自然性）** と呼んで区別する。

具体的に、第二変数へ $f$ を作用させると $H(1_a,f):H(a,a)\to H(a,b)$、第一変数へ反変に作用させると $H(f,1_b):H(b,b)\to H(a,b)$ となる。両方とも終域が $H(a,b)$ だから、$E$ からの二つの合成射を比較できる。たとえば $H(x,y)=\operatorname{Hom}_{\mathcal A}(x,y)$ では、前者は射の**後合成** $g\mapsto fg$、後者は**前合成** $h\mapsto hf$ である。

<a id="def-cat3-09-wedge"></a>

<!-- formal-statement-start -->
> **定義（くさびとdinaturality）**
> 小圏 $\mathcal A$、圏 $\mathcal C$、関手 $H:\mathcal A^{\mathrm{op}}\times\mathcal A\to\mathcal C$ を取る。対象 $E\in\mathcal C$ からの **くさび**は射の族 $\omega_a:E\to H(a,a)$ であり、すべての $f:a\to b$ について、終域が $H(a,b)$ の次の等式を満たす。
>
$$
H(1_a,f)\,\omega_a
=
H(f,1_b)\,\omega_b
:E\longrightarrow H(a,b).
$$
>
> この条件をくさびのdinaturalityという。左辺は第二変数を $a$ から $b$ に進め、右辺は第一変数を $b$ から $a$ に戻す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat3-09-wedge -->
**定義の確認**（Homの恒等射）。 $\mathcal A=\mathbf2$ を $0\xrightarrow{f}1$ の圏、$H(a,b)=\operatorname{Hom}_{\mathcal A}(a,b)$、$E=\{*\}$ とする。$\omega_a(*)=1_a$ と置く。$f$ について

$$
H(1_0,f)(1_0)=f1_0=f
=1_1f=H(f,1_1)(1_1).
$$

恒等射についても両辺は $\omega_a$ なので条件を満たす。第一変数の矢印を逆向きに作用させる点が要点である。
<!-- definition-example-end -->

### 2.2 普遍的なくさび

どのくさびも一つの標準的なくさびを経由して一意に作れるなら、そのくさびにはどんな普遍性が必要だろうか。ここでは「各 $a$ の成分を指定した射の族」が先にあり、その族全体を代表する対象を求める。

<a id="def-cat3-09-end"></a>

<!-- formal-statement-start -->
> **定義（end）**
> 小圏 $\mathcal A$、圏 $\mathcal C$、関手 $H:\mathcal A^{\mathrm{op}}\times\mathcal A\to\mathcal C$ を取る。
> くさび $(e_a:E\to H(a,a))_a$ が **end** であるとは、任意のくさび $(\omega_a:T\to H(a,a))_a$ に対して、唯一の射 $h:T\to E$ が存在し、すべての $a$ で次を満たすことをいう。
>
$$
e_a h=\omega_a.
$$
>
> 存在するとき次のように記す。
>
$$
E=\int_{a\in\mathcal A}H(a,a).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat3-09-end -->
**定義の確認**。 前の $\mathbf2$ と $H(a,b)=\operatorname{Hom}_{\mathbf2}(a,b)$ を使う。$H(0,0)$ と $H(1,1)$ はどちらも一元集合であり、唯一の候補は $(1_0,1_1)$ である。前の計算でdinaturalityが成立する。どんな集合 $T$ からのくさびも、二つの一元集合への唯一の写像の組なので、$T\to\{*\}=E$ で一意に因子分解する。従って end は一元集合である。
<!-- definition-example-end -->

end は単に各 $H(a,a)$ の積を取るものではない。異なる $a$ に属する成分が、$f:a\to b$ に沿って一致する条件が付いている。

<a id="prop-cat3-09-end-equalizer"></a>

<!-- formal-statement-start -->
> **命題（endの等化子表示）**
> $\mathcal A$ が小さく、$\mathcal C$ に以下の二つの小さい積とその二射の等化子が存在するとする。
>
$$
P=\prod_{a\in\operatorname{Ob}\mathcal A}H(a,a),
\qquad
Q=\prod_{f:a\to b}H(a,b).
$$
>
> $P\rightrightarrows Q$ の射 $d_0,d_1$ を、$f:a\to b$ 成分がそれぞれ
>
$$
(d_0)_f=H(1_a,f)\,p_a,
\qquad
(d_1)_f=H(f,1_b)\,p_b
$$
>
> であるものとする。すると $d_0,d_1$ の等化子 $E\to P$ とその各射影は $H$ の end を与える。
<!-- formal-statement-end -->

### 証明の見取り図

積 $P$ はすべての対角成分を集めるだけであり、二本の射 $d_0,d_1$ が各 $f$ の両経路を比較する。[等化子](../CAT2-03/index.md#def-cat2-03-equalizer)に制限すると、ちょうどdinaturalityを満たす成分だけが残る。

<!-- proof-start -->
### 証明

等化子を $i:E\to P$ とし、$e_a=p_ai$ と置く。$d_0i=d_1i$ を $f:a\to b$ 成分へ射影すると

$$
H(1_a,f)e_a=H(f,1_b)e_b
$$

となり、$(e_a)$ はくさびである。逆に任意のくさび $\omega_a:T\to H(a,a)$ を取る。[小さい積の普遍性](../CAT2-04/index.md#def-cat2-04-small-product)により、全 $a$ で $p_a q=\omega_a$ を満たす唯一の $q:T\to P$ がある。くさび条件から、各 $f$ で

$$
(d_0)_f q=H(1_a,f)\omega_a
=H(f,1_b)\omega_b=(d_1)_f q.
$$

$Q$ の各射影による判定で $d_0q=d_1q$、等化子の普遍性から唯一の $h:T\to E$ があり $ih=q$。従って $e_ah=p_aih=p_aq=\omega_a$。別の $h'$ が全成分で同じ条件を満たせば、積の一意性で $ih'=q$、等化子の一意性で $h'=h$ となる。
<!-- proof-end -->

$\mathcal C$ が[完備圏](../CAT2-04/index.md#def-cat2-04-complete)なら必要な積と等化子が常にあり、すべての小圏 $\mathcal A$ に対する end が存在する。ただし、個々の end の存在には完備性全体は必要ない。

## 3. coend：対角成分を関係で貼り合わせる

### 3.1 余くさびと普遍性

今度は各 $H(a,a)$ から共通の対象へ射を出し、$H(b,a)$ から来る二つの成分を同一視する。射 $f:a\to b$ に対し、第一変数の反変性による $H(f,1_a):H(b,a)\to H(a,a)$ と、第二変数の共変性による $H(1_b,f):H(b,a)\to H(b,b)$ がある。共通の始域 $H(b,a)$ からの二つの経路を比較する点が、くさびの場合との違いである。

<a id="def-cat3-09-coend"></a>

<!-- formal-statement-start -->
> **定義（余くさびとcoend）**
> 小圏 $\mathcal A$、圏 $\mathcal C$、関手 $H:\mathcal A^{\mathrm{op}}\times\mathcal A\to\mathcal C$ に対する **余くさび**は、射の族 $\iota_a:H(a,a)\to D$ で、すべての $f:a\to b$ に対し、始域が $H(b,a)$ の等式
>
$$
\iota_a\,H(f,1_a)
=
\iota_b\,H(1_b,f)
:H(b,a)\longrightarrow D
$$
>
> を満たすものである。余くさび $(\iota_a)$ が **coend** であるとは、任意の余くさび $j_a:H(a,a)\to T$ に対して、全 $a$ で $h\iota_a=j_a$ を満たす唯一の $h:D\to T$ が存在することをいう。存在するとき $D=\int^{a\in\mathcal A}H(a,a)$ と記す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat3-09-coend -->
**定義の確認**（写像で貼り合わせる）。 $\mathcal A=\mathbf2$ とし、$X:\mathcal A^{\mathrm{op}}\to\mathbf{Set}$ は一元集合を値に持つ定値関手、$Y:\mathcal A\to\mathbf{Set}$ は

$$
Y(0)=\{p,q\},\quad Y(1)=\{r\},
\quad Y(f)(p)=Y(f)(q)=r
$$

とする。$H(b,a)=X(b)\times Y(a)$ である。対角の元は $( *,p),( *,q)$（$a=0$）と $( *,r)$（$a=1$）。$H(1,0)$ の各 $( *,s)$（$s=p,q$）から生じる二経路は

$$
(*,s)\longmapsto(*,s)\in H(0,0),
\qquad
(*,s)\longmapsto(*,r)\in H(1,1).
$$

従って三元を同一視した一元集合 $D$ と、それへの商写像 $\iota_0,\iota_1$ は余くさびである。任意の余くさび $j_0,j_1$ は $j_0(*,p)=j_1(*,r)=j_0(*,q)$ を満たすので、商集合 $D$ からの写像 $h$ が一意に定まる。よって普遍性まで確認できた。
<!-- definition-example-end -->

### 3.2 余等化子から作る

<a id="prop-cat3-09-coend-coequalizer"></a>

<!-- formal-statement-start -->
> **命題（coendの余等化子表示）**
> 小圏 $\mathcal A$ と関手 $H:\mathcal A^{\mathrm{op}}\times\mathcal A\to\mathcal C$ に対し、次の余積と二射の余等化子が存在するとする。
>
$$
S=\coprod_{f:a\to b}H(b,a),
\qquad
T=\coprod_{a}H(a,a).
$$
>
> $S\rightrightarrows T$ の二射 $s_0,s_1$ は各 $f:a\to b$ の余積成分で
>
$$
s_0|_f=\operatorname{in}_a\,H(f,1_a),
\qquad
s_1|_f=\operatorname{in}_b\,H(1_b,f)
$$
>
> と定める。その[余等化子](../CAT2-05/index.md#def-cat2-05-coequalizer) $q:T\to D$ から $\iota_a=q\operatorname{in}_a$ を作ると、$D$ は $H$ の coend である。
<!-- formal-statement-end -->

### 証明の見取り図

余積で全成分を並べ、$s_0,s_1$ で「同じ $f$ から来た二つの見え方」を対応づける。[余等化子の普遍性](../CAT2-05/index.md#def-cat2-05-coequalizer)が、余くさびからの写像を一意に作る。

<!-- proof-start -->
### 証明

$q s_0=q s_1$ を各 $f:a\to b$ の余積成分に制限すると

$$
q\operatorname{in}_a H(f,1_a)
=q\operatorname{in}_b H(1_b,f).
$$

これは $\iota_aH(f,1_a)=\iota_bH(1_b,f)$ である。任意の余くさび $j_a:H(a,a)\to U$ に対し、[余積の普遍性](../CAT2-05/index.md#def-cat2-05-coproduct)で唯一の $t:T\to U$ があり $t\operatorname{in}_a=j_a$。各 $f$ において

$$
t s_0|_f=j_a H(f,1_a)
=j_b H(1_b,f)=t s_1|_f.
$$

余積の一意性から $ts_0=ts_1$。余等化子から唯一の $h:D\to U$ が存在して $hq=t$ となる。従って $h\iota_a=hq\operatorname{in}_a=j_a$。別の媒介射も全 $\iota_a$ との合成が等しければ $q$ との合成が余積の各成分で等しく、余等化子の一意性により同じ射である。
<!-- proof-end -->

$\mathcal C$ が[余完備圏](../CAT2-05/index.md#def-cat2-05-cocomplete)なら、小さい $\mathcal A$ に対する coend はすべて存在する。とくに $\mathbf{Set}$ では余等化子が商集合なので、

$$
\int^{a}H(a,a)
=
\left(\coprod_a H(a,a)\right)\big/\sim
$$

となる。$\sim$ は $z\in H(b,a)$、$f:a\to b$ について $H(f,1_a)(z)\sim H(1_b,f)(z)$ を含む**最小の同値関係**である。単に元を一方向へ書き換える規則ではなく、対称性・推移性も含む商を取る。

## 4. （余）Yonedaの公式を元で証明する

### 4.1 共変co-Yoneda：すべての「射と値」を一点へ集める

$F:\mathcal A\to\mathbf{Set}$ と $b\in\mathcal A$ を取る。$H(x,y)=\operatorname{Hom}_{\mathcal A}(x,b)\times F(y)$ は第一変数について反変、第二変数について共変な集合値関手である。

<a id="thm-cat3-09-coyoneda"></a>

<!-- formal-statement-start -->
> **定理（共変co-Yoneda公式）**
> 小圏 $\mathcal A$、共変集合値関手 $F:\mathcal A\to\mathbf{Set}$、対象 $b\in\mathcal A$ に対し、自然な全単射
>
$$
\Phi_b:
\int^{a\in\mathcal A}
\operatorname{Hom}_{\mathcal A}(a,b)\times F(a)
\overset{\cong}{\longrightarrow} F(b),
\quad [u,x]\longmapsto F(u)(x)
$$
>
> が存在する。逆写像は $y\mapsto[1_b,y]$。この対応は $b$ の射と $F$ の自然変換について自然である。
<!-- formal-statement-end -->

### 証明の見取り図

射 $u:a\to b$ によって $x\in F(a)$ を $F(b)$ へ運ぶ。異なる表示の同一視は、関手の合成則により像を変えない。逆に $b$ に到達済みの値は恒等射 $1_b$ で表せる。

<!-- proof-start -->
### 証明

[coendの商表示](#prop-cat3-09-coend-coequalizer)により、$f:a\to a'$、$u':a'\to b$、$x\in F(a)$ に対して

$$
[u'f,x]=[u',F(f)(x)]
$$

という関係が成り立つ。そこで $\Phi_b([u,x])=F(u)(x)$ と置く。この関係の両側の像は

$$
F(u'f)(x)=F(u')F(f)(x)
$$

で一致するので、同値関係で割った後にも写像が定義できる。$\Psi_b(y)=[1_b,y]$ と置けば $\Phi_b\Psi_b(y)=F(1_b)(y)=y$。

逆向きには $f=u:a\to b$、$u'=1_b$ を商関係に代入する。

$$
\Psi_b\Phi_b([u,x])
=[1_b,F(u)(x)]
=[1_bu,x]=[u,x].
$$

従って互いに逆写像である。$v:b\to b'$ による coend 側の作用は $[u,x]\mapsto[vu,x]$ であり、$F$ 側では $F(v)$ である。

$$
\Phi_{b'}([vu,x])=F(vu)(x)=F(v)F(u)(x).
$$

また自然変換 $\alpha:F\Rightarrow G$ についても

$$
G(u)\alpha_a(x)=\alpha_b F(u)(x)
$$

なので $[u,x]\mapsto[u,\alpha_a(x)]$ とした対応は可換である。
<!-- proof-end -->

**具体例。** $\mathcal A=\mathbf2$、$F(0)=\{p,q\}$、$F(1)=\{r\}$、$F(f)$ が両元を $r$ へ送るとする。$b=1$ の coend には $[f,p],[f,q],[1_1,r]$ が現れるが、上の関係から三つとも一致し、$F(1)$ の元 $r$ に対応する。$b=0$ では $0$ へ入る射が恒等射だけなので $[1_0,p],[1_0,q]$ の二元が残る。

### 4.2 反変co-Yoneda：射を引き戻して値を得る

<a id="thm-cat3-09-contravariant-coyoneda"></a>

<!-- formal-statement-start -->
> **定理（反変co-Yoneda公式）**
> 小圏 $\mathcal A$、反変集合値関手 $P:\mathcal A^{\mathrm{op}}\to\mathbf{Set}$、$b\in\mathcal A$ に対して、自然な全単射
>
$$
\int^{a\in\mathcal A}
P(a)\times\operatorname{Hom}_{\mathcal A}(b,a)
\overset{\cong}{\longrightarrow}P(b),
\qquad [x,u]\longmapsto P(u)(x)
$$
>
> があり、逆写像は $y\mapsto[y,1_b]$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$u:b\to a$ が反変関手の値を $P(a)$ から $P(b)$ へ戻す。商の関係も共変の場合と左右が逆になる。

<!-- proof-start -->
### 証明

$f:a\to a'$、$x'\in P(a')$、$u:b\to a$ に対する余くさびの関係は

$$
[P(f)(x'),u]=[x',fu].
$$

左辺の像は $P(u)P(f)(x')$、右辺は $P(fu)(x')$ である。反変関手の合成則 $P(fu)=P(u)P(f)$ から一致する。$\Psi(y)=[y,1_b]$ に対し

$$
\Phi\Psi(y)=P(1_b)(y)=y,
\qquad
\Psi\Phi([x,u])=[P(u)(x),1_b]=[x,u]
$$

である。最後の等号は上の商関係に $f=u:b\to a$、$x'=x$、$u$ に代わる射 $1_b:b\to b$ を代入した結果である。自然性も式で確認する。$v:b'\to b$ について coend 側は $[x,u:b\to a]\mapsto[x,uv:b'\to a]$ と作用する。その像を評価すると

$$
P(uv)(x)=P(v)\,P(u)(x)
$$

であり、$P(b)\to P(b')$ の $P(v)$ と一致する。自然変換 $\alpha:P\Rightarrow Q$ については $[x,u]\mapsto[\alpha_a(x),u]$ としたとき

$$
Q(u)(\alpha_a(x))=\alpha_b(P(u)(x))
$$

となるため、$P$ についても自然である。
<!-- proof-end -->

### 4.3 自然変換はendの元である

端の整合条件は、実は[自然変換の自然性](../CAT1-07/index.md#def-cat1-07-natural-transformation)そのものである。

<a id="prop-cat3-09-nat-end"></a>

<!-- formal-statement-start -->
> **命題（自然変換集合のend表示）**
> 小圏 $\mathcal A$、共変集合値関手 $U,V:\mathcal A\to\mathbf{Set}$ に対し $H(x,y)=\operatorname{Hom}_{\mathbf{Set}}(U(x),V(y))$ と置くと、自然な全単射
>
$$
\operatorname{Nat}(U,V)
\cong
\int_{a\in\mathcal A}
\operatorname{Hom}_{\mathbf{Set}}(U(a),V(a))
$$
>
> がある。右辺の end の元は $a$ ごとの関数 $\alpha_a:U(a)\to V(a)$ の族である。
<!-- formal-statement-end -->

### 証明の見取り図

[等化子によるend表示](#prop-cat3-09-end-equalizer)に $H$ を代入すると、二本の射が $V(f)\alpha_a$ と $\alpha_b U(f)$ を比較する。

<!-- proof-start -->
### 証明

$f:a\to b$ と $\alpha_a\in H(a,a)$ を取る。第二変数を $f$ で進める写像は後合成なので

$$
H(1_a,f)(\alpha_a)=V(f)\alpha_a.
$$

第一変数を $f$ で逆に進める写像は前合成なので

$$
H(f,1_b)(\alpha_b)=\alpha_b U(f).
$$

従って end のdinaturalityは $V(f)\alpha_a=\alpha_b U(f)$ に等しい。これはまさに自然変換の自然性である。集合間の互いに逆な対応は各成分をそのまま読む写像で与えられ、関手 $U,V$ の変更とも可換である。
<!-- proof-end -->

ここで[共変Yonedaの補題](../CAT1-11/index.md#thm-cat1-11-covariant-yoneda)を適用すると、次の end 形も得られる。

<a id="thm-cat3-09-end-yoneda"></a>

<!-- formal-statement-start -->
> **定理（end形の共変Yoneda公式）**
> 小圏 $\mathcal A$、$b\in\mathcal A$、共変集合値関手 $F:\mathcal A\to\mathbf{Set}$ に対して
>
$$
\int_{a\in\mathcal A}
\operatorname{Hom}_{\mathbf{Set}}
(\operatorname{Hom}_{\mathcal A}(b,a),F(a))
\cong F(b)
$$
>
> である。対応は整合する関数族 $(\alpha_a)$ を $\alpha_b(1_b)$ へ送り、その逆は $y\mapsto\bigl(u\mapsto F(u)(y)\bigr)_a$ である。
<!-- formal-statement-end -->

### 証明の見取り図

まず[自然変換のend表示](#prop-cat3-09-nat-end)で左辺を $\operatorname{Nat}(\operatorname{Hom}_{\mathcal A}(b,-),F)$ に同一視する。次に[共変Yonedaの補題](../CAT1-11/index.md#thm-cat1-11-covariant-yoneda)の評価写像を使う。

<!-- proof-start -->
### 証明

end の元は $a$ ごとの関数 $\alpha_a:\operatorname{Hom}(b,a)\to F(a)$ であり、$f:a\to a'$ と $u:b\to a$ について整合条件は

$$
F(f)(\alpha_a(u))=\alpha_{a'}(fu).
$$

$y=\alpha_b(1_b)$ と取って $a=b$、$f=u:b\to a$ に代入すると $\alpha_a(u)=F(u)(y)$。逆に $y\in F(b)$ に対してこの式で関数族を作れば

$$
F(f)F(u)(y)=F(fu)(y)
$$

なので整合条件を満たす。また $a=b,u=1_b$ では $F(1_b)(y)=y$ だから二方向の写像は逆になる。
<!-- proof-end -->

## 5. 左右のKan拡張を（余）endで計算する

以下 $K:\mathcal A\to\mathcal B$、$F:\mathcal A\to\mathbf{Set}$ は小圏上の関手とする。$\mathbf{Set}$ は小さい極限・余極限を持つので、前2講の点ごとのKan拡張が存在する。

### 5.1 左Kan拡張はcoend

<a id="thm-cat3-09-lan-coend"></a>

<!-- formal-statement-start -->
> **定理（集合値左Kan拡張のcoend公式）**
> 小圏 $\mathcal A,\mathcal B$、関手 $K:\mathcal A\to\mathcal B$、$F:\mathcal A\to\mathbf{Set}$、$b\in\mathcal B$ に対し、
>
$$
(\operatorname{Lan}_K F)(b)
\cong
\int^{a\in\mathcal A}
\operatorname{Hom}_{\mathcal B}(Ka,b)\times F(a)
$$
>
> が $b$ と $F$ について自然に成立する。右辺の元 $[u:Ka\to b,x\in F(a)]$ は左Kan拡張のcomma圏余極限の脚で表される元へ対応する。
<!-- formal-statement-end -->

### 証明の見取り図

[点ごとの左Kan拡張公式](../CAT3-07/index.md#thm-cat3-07-pointwise)は $(K\downarrow b)$ の余極限である。coendの商の生成関係を、comma圏の射 $(a,u)\to(a',u')$ の条件 $u=u'Kf$ と突き合わせる。

<!-- proof-start -->
### 証明

$b$ を固定し、$L(b)=\operatorname{colim}_{(K\downarrow b)}F(a)$ とし、余極限余錐の脚を $i_{a,u}:F(a)\to L(b)$ と書く。[coendの商表示](#prop-cat3-09-coend-coequalizer)では

$$
[u'Kf,x]\sim[u',F(f)(x)]
\quad(f:a\to a',\ u':Ka'\to b,\ x\in F(a))
$$

が生成関係となる。一方、$(K\downarrow b)$ において $f:(a,u'Kf)\to(a',u')$ は射であり、余錐の条件は

$$
i_{a,u'Kf}(x)=i_{a',u'}(F(f)(x)).
$$

従って $[u,x]\mapsto i_{a,u}(x)$ は商に降り、写像 $\Phi$ が定まる。逆向きには各余極限の脚で $x\mapsto[u,x]$ と置く。上記生成関係によってこれらは余錐をなし、[余極限の普遍性](../CAT2-05/index.md#def-cat2-05-colimit)から唯一の $\Psi:L(b)\to\int^a\operatorname{Hom}(Ka,b)\times F(a)$ が定まる。$\Psi\Phi([u,x])=[u,x]$、$\Phi\Psi(i_{a,u}(x))=i_{a,u}(x)$ なので互いに逆である。

$v:b\to b'$ に対して $\operatorname{Lan}_K F(v)$ は余極限余錐の脚 $i_{a,u}$ を $i_{a,vu}$ へ運ぶ。coend 側も $[u,x]\mapsto[vu,x]$ であり、$\Phi$ と可換である。自然変換 $\alpha:F\Rightarrow G$ の場合は両側とも $x\mapsto\alpha_a(x)$ として定まり、自然性は $\alpha_{a'}F(f)=G(f)\alpha_a$ が生成関係を保つことで確認できる。
<!-- proof-end -->

### 5.2 右Kan拡張はend

<a id="thm-cat3-09-ran-end"></a>

<!-- formal-statement-start -->
> **定理（集合値右Kan拡張のend公式）**
> 小圏 $\mathcal A,\mathcal B$、関手 $K:\mathcal A\to\mathcal B$、$F:\mathcal A\to\mathbf{Set}$、$b\in\mathcal B$ に対し、
>
$$
(\operatorname{Ran}_K F)(b)
\cong
\int_{a\in\mathcal A}
\operatorname{Hom}_{\mathbf{Set}}
(\operatorname{Hom}_{\mathcal B}(b,Ka),F(a))
$$
>
> が $b$ と $F$ について自然に成立する。右辺の元は、すべての $u:b\to Ka$ に対して $\phi_a(u)\in F(a)$ を与え、$f:a\to a'$ について次を満たす関数族である。
>
$$
F(f)(\phi_a(u))=\phi_{a'}(K(f)u).
$$
<!-- formal-statement-end -->

### 証明の見取り図

[点ごとの右Kan拡張公式](../CAT3-08/index.md#thm-cat3-08-pointwise)の極限における点は、comma圏の各 $(a,u)$ で値を一つ選び、射に沿う整合性を満たす族である。endのdinaturalityもまったく同じ条件になる。

<!-- proof-start -->
### 証明

$R(b)=\operatorname{lim}_{(b\downarrow K)}F(a)$ と置き、射影を $p_{a,u}:R(b)\to F(a)$ とする。$r\in R(b)$ から

$$
\phi_a^r:\operatorname{Hom}_{\mathcal B}(b,Ka)\to F(a),
\qquad
\phi_a^r(u)=p_{a,u}(r)
$$

を定める。$f:a\to a'$ と $u:b\to Ka$ について $(a,u)\to(a',Kf\,u)$ はcomma圏の射なので

$$
F(f)\phi_a^r(u)=F(f)p_{a,u}(r)
=p_{a',Kf\,u}(r)=\phi_{a'}^r(Kf\,u).
$$

逆にこの関係を満たす関数族 $(\phi_a)$ から $q_{a,u}:\{*\}\to F(a)$、$q_{a,u}(*)=\phi_a(u)$ を作ると、これは $(b\downarrow K)$ 上の錐である。[極限の普遍性](../CAT2-01/index.md#def-cat2-01-limit)によって一意の $\{*\}\to R(b)$、すなわち $r\in R(b)$ が得られる。各射影による一意性で二方向の対応は互いに逆になる。

$v:b\to b'$ について [右Kan関手の射への作用](../CAT3-08/index.md#prop-cat3-08-transport)は $p^{b'}_{a,u'}R(v)=p^b_{a,u'v}$ である。従って end 側では $\phi_a(u')\mapsto\phi_a(u'v)$ に一致する。自然変換 $\alpha:F\Rightarrow G$ に対しては、関数族 $(\phi_a)$ を $\phi'_a(u)=\alpha_a(\phi_a(u))$ へ送る。実際、$f:a\to a'$ について
$$
G(f)(\phi'_a(u))
=G(f)\alpha_a(\phi_a(u))
=\alpha_{a'}F(f)(\phi_a(u))
=\alpha_{a'}(\phi_{a'}(Kf\,u))
=\phi'_{a'}(Kf\,u)
$$
であり、自然変換の自然性から end の整合条件も保存される。この作用は $b$ の射による前合成とも可換である。
<!-- proof-end -->

**左右の式の対比。**

$$
\begin{aligned}
(\operatorname{Lan}_KF)(b)
&\cong\int^{a}\operatorname{Hom}_{\mathcal B}(Ka,b)\times F(a),\\
(\operatorname{Ran}_KF)(b)
&\cong\int_{a}\operatorname{Hom}_{\mathbf{Set}}(\operatorname{Hom}_{\mathcal B}(b,Ka),F(a)).
\end{aligned}
$$

左は「射 $Ka\to b$ と元を並べて商を取る」、右は「射 $b\to Ka$ から元への関数を並べて整合条件で絞る」。$F$ が一般の圏に値を持つ場合、右式の集合間Homをそのまま使うことはできない。値域に対応する冪・余冪等の構造があるときに一般化できるが、ここで証明した式は**集合値**に対する公式である。

## 6. 演習：商と整合性を別々に手で計算する

### 問題1：Homの恒等射族はくさびか

- Level: A
- 問題ID: CAT3-09-WEDGE-HOM

$\mathcal A=\mathbf2$、$H(a,b)=\operatorname{Hom}_{\mathcal A}(a,b)$ とする。$\omega_a:\{*\}\to H(a,a)$ を $\omega_a(*)=1_a$ で定め、非恒等射 $f:0\to1$ と恒等射に関するくさびの条件を逐一確認せよ。またこのendの元の個数を求めよ。

<!-- solution-start -->
**詳細解答。** $H(1_0,f)$ は射 $g:0\to0$ を $fg:0\to1$ に送り、$H(f,1_1)$ は射 $h:1\to1$ を $hf:0\to1$ に送る。従って

$$
H(1_0,f)(\omega_0(*))=f1_0=f
=1_1f=H(f,1_1)(\omega_1(*)).
$$

恒等射 $1_a$ では両作用が $H(1_a,1_a)=1_{H(a,a)}$ だから等しい。対角Hom集合は各一元集合で、異なる選び方がない。唯一の族は上で確認した通りくさびである。ゆえに[等化子表示](#prop-cat3-09-end-equalizer)から end の元は一つである。
<!-- solution-end -->

### 問題2：離散二点のendとcoend

- Level: A
- 問題ID: CAT3-09-DISCRETE-ENDS

$\mathcal A$ は対象 $p,q$ と恒等射のみを持つ離散圏、$H:\mathcal A^{\mathrm{op}}\times\mathcal A\to\mathbf{Set}$ は任意の関手とする。$H(p,p)=X$、$H(q,q)=Y$ と置く。endとcoendを具体的に求めよ。$H(p,q)$ と $H(q,p)$ が結果に現れない理由を述べよ。

<!-- solution-start -->
**詳細解答。** 添字圏には非恒等射がないので、くさびの等式は恒等射についての自明な等式だけである。従って任意の $T$ からのくさびは $T\to X,T\to Y$ の組で、[積の普遍性](../CAT2-02/index.md#def-cat2-02-binary-product)から end は $X\times Y$ である。

余くさびは $X\to T,Y\to T$ の組で、[余積の普遍性](../CAT2-05/index.md#def-cat2-05-coproduct)から coend は $X\amalg Y$ となる。非対角値 $H(p,q),H(q,p)$ が関係を生むのは $p\to q$ または $q\to p$ の射があるときだけである。離散圏では該当する射がなく、等化子・余等化子の追加条件がない。
<!-- solution-end -->

### 問題3：三元を貼り合わせるcoend

- Level: A
- 問題ID: CAT3-09-QUOTIENT-ARROW

$\mathcal A=\mathbf2$、$X:\mathcal A^{\mathrm{op}}\to\mathbf{Set}$ を一元集合の定値関手、$Y(0)=\{p,q\}$、$Y(1)=\{r\}$、$Y(f)(p)=Y(f)(q)=r$ とする。$H(b,a)=X(b)\times Y(a)$ の coend を生成関係から計算し、任意の余くさびが商を通る理由を述べよ。

<!-- solution-start -->
**詳細解答。** 対角値の余積の元は $(*,p)_0,(*,q)_0,(*,r)_1$ の三個。$f:0\to1$ による関係は、$s=p,q$ のそれぞれについて

$$
(*,s)_0\sim(*,Y(f)(s))_1=(*,r)_1.
$$

従って推移性で三元すべて同値になり、商は一元集合である。任意の余くさび $j_0,j_1$ は各 $s$ で $j_0(*,s)=j_1(*,r)$ を満たすため、三元を同じ値へ送る。商の唯一の元の行き先をその共通値と定めれば一意の写像となる。これは[coendの余等化子表示](#prop-cat3-09-coend-coequalizer)を元で確認したものでもある。
<!-- solution-end -->

### 問題4：co-Yonedaの逆写像

- Level: A
- 問題ID: CAT3-09-COYONEDA-INVERSE

小圏 $\mathcal A$、共変集合値関手 $F$、$u:a\to b$、$x\in F(a)$ に対し、coend $\int^c\operatorname{Hom}(c,b)\times F(c)$ において $[u,x]=[1_b,F(u)(x)]$ を定義から導け。また $b\xrightarrow{v}b'$ との自然性を検算せよ。

<!-- solution-start -->
**詳細解答。** [商関係](#prop-cat3-09-coend-coequalizer)は $f:c\to c'$、$u':c'\to b$ について $[u'f,z]=[u',F(f)z]$ である。$c=a,c'=b,f=u,u'=1_b,z=x$ を代入すると

$$
[1_bu,x]=[1_b,F(u)(x)]
$$

となる。$1_bu=u$ なので求める等式を得る。$v:b\to b'$ で像を取れば左辺の代表は $[vu,x]$、右辺は $[v,F(u)(x)]$ である。関係に $f=u$、$u'=v$ を入れれば両者は等しい。一方、$F(v)F(u)(x)=F(vu)(x)$ であるから、[共変co-Yoneda公式](#thm-cat3-09-coyoneda)の自然性とも整合する。
<!-- solution-end -->

### 問題5：自然変換のendを具体的に計算する

- Level: A
- 問題ID: CAT3-09-NAT-ARROW

$\mathcal A=\mathbf2$、$U$ は値がどちらも $\{*\}$ で射も恒等写像となる関手、$V$ は $Z_0\xrightarrow{g}Z_1$ とする。$\operatorname{Nat}(U,V)$ を集合として求め、endの等化子条件と照合せよ。

<!-- solution-start -->
**詳細解答。** 自然変換の成分は $U(0)\to Z_0$ と $U(1)\to Z_1$ の写像なので、元 $z_0\in Z_0$ と $z_1\in Z_1$ を選ぶことと同じである。$f:0\to1$ に対する自然性は

$$
g(z_0)=z_1.
$$

従って $z_0$ を選べば $z_1$ は強制され、$\operatorname{Nat}(U,V)\cong Z_0$。[自然変換のend表示](#prop-cat3-09-nat-end)では積 $Z_0\times Z_1$ のうち $g(z_0)=z_1$ を満たす部分集合がendとなるため、同じ答えである。$Z_0=\varnothing$ でも両辺は空集合になり成立する。
<!-- solution-end -->

### 問題6：反変co-Yonedaの商の個数

- Level: B
- 問題ID: CAT3-09-CONTRA-COUNT

$\mathcal A=\mathbf2$、反変集合値関手 $P$ を $P(0)=\{0,1\}$、$P(1)=\{*\}$、$P(f)(*)=0$ とする。$\int^a P(a)\times\operatorname{Hom}(b,a)$ を $b=0,1$ の両方で求め、[反変co-Yoneda公式](#thm-cat3-09-contravariant-coyoneda)を検証せよ。

<!-- solution-start -->
**詳細解答。** $b=0$ では $a=0$ に対応する元 $(0,1_0),(1,1_0)$ と、$a=1$ に対応する元 $(*,f)$ がある。射 $f$ からの関係は

$$
(P(f)(*),1_0)=(0,1_0)\sim(*,f).
$$

他に $1$ と $0$ を結ぶ関係はないため、商は二元であり $P(0)$ に一致する。$b=1$ では $\operatorname{Hom}(1,0)=\varnothing$、$\operatorname{Hom}(1,1)=\{1_1\}$ なので唯一の元 $(*,1_1)$ だけが残り、商は一元集合 $P(1)$ に一致する。両場合に写像 $[x,u]\mapsto P(u)x$ がこれらの対応を実現し、その逆は $y\mapsto[y,1_b]$ である。
<!-- solution-end -->

### 問題7：end形Yonedaの射への作用

- Level: B
- 問題ID: CAT3-09-END-YONEDA-ARROW

$\mathcal A=\mathbf2$、$F=(X\xrightarrow{h}Y)$ は集合値関手とする。$b=0$ と $b=1$ それぞれについて

$$
\int_a\operatorname{Hom}_{\mathbf{Set}}(\operatorname{Hom}_{\mathcal A}(b,a),F(a))
$$

の元をすべて記述し、$b=0$ の元 $x\in X$ がどの成分に現れるかを確認せよ。

<!-- solution-start -->
**詳細解答。** $b=0$ では $\operatorname{Hom}(0,0)=\{1_0\}$、$\operatorname{Hom}(0,1)=\{f\}$。成分関数は $\alpha_0(1_0)=x\in X$ と $\alpha_1(f)=y\in Y$ の指定であり、[endの整合条件](#prop-cat3-09-nat-end)は

$$
h(x)=y.
$$

よって $x$ は任意、$y$ は $h(x)$ に決まり、endは $X$ に同型である。$b=1$ では $\operatorname{Hom}(1,0)=\varnothing$、$\operatorname{Hom}(1,1)=\{1_1\}$。空集合から $X$ への写像は一つ、$1_1$ に与える値は任意の $y\in Y$ なのでendは $Y$ に同型である。これは[共変Yonedaの評価公式](#thm-cat3-09-end-yoneda)を二対象圏で直接検算している。
<!-- solution-end -->

### 問題8：左Kan拡張をcoendで延長する

- Level: B
- 問題ID: CAT3-09-LAN-EXAMPLE

$K:\mathbf1\to\mathbf2$ が $0$ を選び、$F(*)=X$ とする。$\operatorname{Lan}_K F$ の値を各 $b=0,1$ で[集合値左Kan拡張のcoend公式](#thm-cat3-09-lan-coend)から求め、$0\to1$ に対する作用も求めよ。元を表す組の型を明記せよ。

<!-- solution-start -->
**詳細解答。** $\mathbf1$ の対象を $*$ とすると、[左Kanのcoend公式](#thm-cat3-09-lan-coend)で用いる組は $(u:0\to b,x\in X)$。$b=0$ には $u=1_0$ だけなので代表 $[1_0,x]$ が各 $x$ に一つ、$b=1$ には $u=f:0\to1$ だけなので代表 $[f,x]$ が各 $x$ に一つある。$\mathbf1$ には恒等射しかないので異なる $x$ の間に関係は生じない。

$$
L(0)\cong X,\qquad L(1)\cong X,
\qquad L(f)([1_0,x])=[f,x].
$$

両辺を $X$ と同一視すれば $L(f)=1_X$ となる。[点ごとの左Kan拡張](../CAT3-07/index.md#thm-cat3-07-pointwise)の $X\xrightarrow{1_X}X$ と一致する。
<!-- solution-end -->

### 問題9：右Kan拡張をendで延長する

- Level: B
- 問題ID: CAT3-09-RAN-EXAMPLE

問題8と同じ $K,F$ で $\operatorname{Ran}_K F$ の値を $b=0,1$ で[集合値右Kan拡張のend公式](#thm-cat3-09-ran-end)から求め、$0\to1$ の作用を記述せよ。空集合からの写像が何個あるかも説明せよ。

<!-- solution-start -->
**詳細解答。** [右Kanのend公式](#thm-cat3-09-ran-end)では、唯一の添字 $a=*$ に対し $\operatorname{Hom}_{\mathbf{Set}}(\operatorname{Hom}_{\mathbf2}(b,0),X)$ を考える。$b=0$ なら内側は一元集合 $\{1_0\}$ なので、その元に任意の $x\in X$ を割り当て、endは $X$。$b=1$ なら内側は空集合であり、空集合から $X$ への写像は $X$ が空でも必ず一つ（空関数）だから end は一元集合である。

$$
R(0)\cong X,\qquad R(1)\cong\{*\}.
$$

$f:0\to1$ による作用は $u:1\to0$ の全候補に対する値を前合成で制限するが、その候補は空である。従って $R(f):X\to\{*\}$ は唯一の関数になる。[点ごとの右Kan拡張](../CAT3-08/index.md#thm-cat3-08-pointwise)と一致する。
<!-- solution-end -->

### 問題10：余極限と極限を同じ図式で比較する

- Level: C
- 問題ID: CAT3-09-KAN-COLLAPSE

$\mathcal A=\mathbf2$、$\mathcal B=\mathbf1$、$K:\mathcal A\to\mathcal B$ を唯一の関手、$F:\mathbf2\to\mathbf{Set}$ を $X\xrightarrow{f}Y$ とする。

1. coendとendの公式から、それぞれ $L(*)=(\operatorname{Lan}_K F)(*)$、$R(*)=(\operatorname{Ran}_K F)(*)$ を求めよ。
2. 左Kan拡張の単位 $F\Rightarrow LK$、右Kan拡張の余単位 $RK\Rightarrow F$ を具体的に書き、両者の普遍性を任意の集合 $Z$ に対する写像の一意性で検証せよ。
3. $X=\{0,1\}$、$Y=\{*\}$、$f$ が唯一の写像である場合を使い、左右の値が一般には同型とは限らないことを示せ。

<!-- solution-start -->
**詳細解答。**

**1. coendとend。** $\mathcal B=\mathbf1$ には恒等射しかない。したがって各 $a$ で $\operatorname{Hom}_{\mathcal B}(Ka,*)$ は一元集合となる。

[左Kanのcoend公式](#thm-cat3-09-lan-coend)は、$X\amalg Y$ に射 $f:0\to1$ からの関係を課す商になる。

$$
x\sim f(x)\qquad(x\in X).
$$

各 $x$ は $f(x)\in Y$ と同値だが、異なる $y\in Y$ を直接結ぶ生成関係はない。また上の関係を何回つないでも、二つの異なる $Y$ の元を同一視できない（すべての関係は $x$ とその唯一の像 $f(x)$ を結ぶ）。よって商は $Y$ と全単射である。

[右Kanのend公式](#thm-cat3-09-ran-end)では、両方の内側のHom集合が一元集合である。従って元は $(x,y)\in X\times Y$ で、整合条件 $f(x)=y$ を満たす組である。すなわち

$$
L(*)\cong Y,\qquad
R(*)\cong\{(x,f(x)):x\in X\}\cong X.
$$

**2. 比較変換と普遍性。** $L(*)=Y$、$R(*)=X$ と選ぶと、左Kanの単位は二成分 $\eta_0=f:X\to Y$、$\eta_1=1_Y$ であり、自然性は $1_Yf=f$。右Kanの余単位は $\varepsilon_0=1_X$、$\varepsilon_1=f:X\to Y$ であり、自然性は $f1_X=f$。

任意の集合 $Z$ と自然変換 $\beta:F\Rightarrow \operatorname{const}Z$ は写像 $\beta_0:X\to Z$、$\beta_1:Y\to Z$ の組で、$\beta_0=\beta_1f$ が必要十分である。$\theta=\beta_1:Y=L(*)\to Z$ が唯一の媒介射であり、$\theta\eta_1=\beta_1$ と $\theta\eta_0=\beta_1f=\beta_0$ が同時に成立する。

一方、自然変換 $\gamma:\operatorname{const}Z\Rightarrow F$ は $\gamma_0:Z\to X$、$\gamma_1:Z\to Y$ の組で、$\gamma_1=f\gamma_0$ が必要十分である。$\phi=\gamma_0:Z\to X=R(*)$ が唯一の媒介射であり、$\varepsilon_0\phi=\gamma_0$、$\varepsilon_1\phi=f\gamma_0=\gamma_1$ を満たす。これは[左右Kan拡張の定義](../CAT3-06/index.md#def-cat3-06-left-kan)および[右Kan拡張の定義](../CAT3-06/index.md#def-cat3-06-right-kan)の要求を直接示す。

**3. 同型にならない例。** 指定した $f$ では $L(*)$ は一元集合、$R(*)$ は二元集合である。有限集合の間に全単射はないため、両者は $\mathbf{Set}$ で同型ではない。左右の違いは、coendでは $f$ に沿って元を貼り合わせる一方、endでは $f(x)=y$ を満たす組を選ぶという機構の違いに由来する。
<!-- solution-end -->

## 7. 次へ：すべての前層を表現可能なものから組み立てる

coendは「代表元と射による同一視」、endは「全成分の自然な整合性」を記述した。[共変co-Yoneda公式](#thm-cat3-09-coyoneda)は $F(b)$ をすべての $F(a)$ から復元できることを示し、[Kan公式](#thm-cat3-09-lan-coend)は添字圏を変えた同じ操作を与えた。次講 CAT3-10 では、反変集合値関手そのものを表現可能関手の余極限で組み立てる密度定理へ進む。
