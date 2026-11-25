# CATB4-05 余ファイブレーションと双対

## 1. 添字を前向きに移す

前講までは、基底射 $u:a\to b$ に対し、$b$ 上の対象を $a$ 上に移す方法を学んだ。今度は $a$ 上の対象から出発したい。例えば地点 $a$ の記録を新しい地点 $u(a)$ に集約するなら、同じ地点に移る複数の集合を出所を区別したまままとめる必要がある。

前提講座：[CATB4-04 Grothendieck構成](../CATB4-04/index.md)、[CATB4-03 添字付き圏と擬関手](../CATB4-03/index.md)、[CATB4-02 Cleavageとsplitファイブレーション](../CATB4-02/index.md)、[CATB4-01 Cartesian射とファイブレーション](../CATB4-01/index.md)、[CAT1-04 反対圏と双対原理](../../CAT/CAT1-04/index.md)。

以下、全圏 $\mathcal E$ と基底圏 $\mathcal B$ は[局所小圏](../../CAT/CAT1-02/index.md#def-cat1-02-size)、$p:\mathcal E\to\mathcal B$ は[共変関手](../../CAT/CAT1-06/index.md#def-cat1-06-functor)とする。

合成は右から左に書き、$gf=g\circ f$ とする。$1_x$ は対象 $x$ の恒等射である。

[ファイバー圏](../CATB4-01/index.md#def-catb4-01-fiber) $\mathcal E_a$ の射は基底の恒等射 $1_a$ に写る垂直射である。

## 2. 始域からの普遍的な持ち上げ

[Cartesian射](../CATB4-01/index.md#def-catb4-01-cartesian)では終域を固定して入ってくる射を因子分解した。今度は始域を固定し、そこから出ていく射を因子分解する。基底で $a\xrightarrow{u}b\xrightarrow{v}c$ と進むとき、$a$ から $c$ までの移動を、先に $u$ に沿う移動を行ってから残りの移動を行う形に分けたい。

<a id="def-catb4-05-cocartesian"></a>

<!-- formal-statement-start -->
> **定義（coCartesian射）**
>
> 関手 $p:\mathcal E\to\mathcal B$ に対し、$p(x)=a,p(y)=b,p(f)=u:a\to b$ とする。射 $f:x\to y$ がcoCartesian射であるとは、任意の対象 $z$、基底射 $v:b\to p(z)$、射 $k:x\to z$ で $p(k)=vu$ を満たすものについて、ただ一つの射 $h:y\to z$ が存在して

$$
p(h)=v,\qquad hf=k
$$

> を満たすことである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb4-05-cocartesian -->
**定義の確認**。[積圏](../../CAT/CAT1-05/index.md#def-cat1-05-product)の射影 $p:\mathbf{Set}\times\mathcal B\to\mathcal B$ を取る。任意の集合 $X$ と $u:a\to b$ に対し、$f=(1_X,u):(X,a)\to(X,b)$ とする。

任意の $z=(Z,c)$、$v:b\to c$ と $k=(q,vu)$ に対し、$h=(q,v)$ と置けば

$$
hf=(q1_X,vu)=(q,vu)=k.
$$

また $p(h)=v$ である。別の候補は $(q',v)$ の形であり、因子分解式の第一成分から $q'=q$。したがって全ての入力に対して存在と一意性が確認された。
<!-- definition-example-end -->

基底射 $u$ と始域 $x$ が与えられたとき、この条件を満たす $f$ を $x$ の $u$ に沿う持ち上げと呼ぶ。終域はあらかじめ指定しない。

<a id="def-catb4-05-opfibration"></a>

<!-- formal-statement-start -->
> **定義（余ファイブレーション）**
>
> 関手 $p:\mathcal E\to\mathcal B$ が余ファイブレーションであるとは、任意の $x$ と任意の $u:p(x)\to b$ に対して、$p(y)=b$ かつ $p(f)=u$ を満たすcoCartesian射 $f:x\to y$ が存在することである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb4-05-opfibration -->
**定義の確認**。上の積圏の射影では、任意の $(X,a)$ と $u:a\to b$ に対して $(X,b)$ と $(1_X,u)$ を選べる。直前の[因子分解の検証](#def-catb4-05-cocartesian)は任意の $X,u$ に適用できるので、余ファイブレーションである。
<!-- definition-example-end -->

### 2.1 反対圏で何を反転するか

全圏だけを反転すると、元の射の基底成分の向きと合わなくなる。そこで全圏と基底圏を同時に[反対圏](../../CAT/CAT1-04/index.md#def-cat1-04-opposite)に移す。$f^{op}$ は反対圏の射であり、逆射 $f^{-1}$ ではない。

関手 $p^{op}$ は対象を $p(x)$ に、射 $f^{op}$ を $p(f)^{op}$ に送る。元の合成に対して

$$
p^{op}((gf)^{op})=(p(g)p(f))^{op}
=p(f)^{op}p(g)^{op}
$$

となり、反転した合成と恒等射を保つ。

[ファイブレーション](../CATB4-01/index.md#def-catb4-01-fibration)では、各終域と基底射に対してCartesian持ち上げを要求していた。

<a id="prop-catb4-05-duality"></a>

<!-- formal-statement-start -->
> **命題（余ファイブレーションの双対性）**
>
> 関手 $p:\mathcal E\to\mathcal B$ に対し、$f$ がcoCartesian射であることと、$f^{op}$ が $p^{op}:\mathcal E^{op}\to\mathcal B^{op}$ に対するCartesian射であることは同値である。従って $p$ が余ファイブレーションであることと $p^{op}$ がファイブレーションであることは同値である。
<!-- formal-statement-end -->

見取り図：[反対圏](../../CAT/CAT1-04/index.md#def-cat1-04-opposite)で合成を反転し、普遍性の入力と出力を一つずつ対応させる。

<!-- proof-start -->
### 証明

$f:x\to y$ が $u:a\to b$ 上にあるとする。反対圏では $f^{op}:y\to x$ が $u^{op}:b\to a$ 上にある。

[Cartesian射の定義](../CATB4-01/index.md#def-catb4-01-cartesian)における媒介基底は $v^{op}:p(z)\to b$、入力射は $k^{op}:z\to x$ である。基底の条件は

$$
p^{op}(k^{op})=u^{op}v^{op}=(vu)^{op}.
$$

これは元の $p(k)=vu$ と同値である。媒介射 $h^{op}:z\to y$ に対する条件も

$$
p^{op}(h^{op})=v^{op},\qquad
f^{op}h^{op}=(hf)^{op}=k^{op}
$$

であり、元の $p(h)=v,hf=k$ と同値である。反対圏の射は元の射と一対一に対応するから、存在・一意性は両方向に移る。

さらに元の始域 $x$ と $u:p(x)\to b$ は反対圏の終域 $x$ と $u^{op}:b\to p(x)$ になる。従って持ち上げの全称条件も対応し、[ファイブレーションの定義](../CATB4-01/index.md#def-catb4-01-fibration)と一致する。
<!-- proof-end -->

この対応により、同じ始域と基底射を持つ二つのcoCartesian持ち上げ $f:x\to y,f':x\to y'$ は、一意な垂直同型 $i:y\to y'$ で $if=f'$ を満たす。[Cartesian持ち上げの同型一意性](../CATB4-01/index.md#thm-catb4-01-unique-lift)を反対圏の $f^{op},(f')^{op}$ に適用した結果である。また[Cartesian射の恒等射と合成](../CATB4-01/index.md#prop-catb4-01-composition)を反対圏に適用すればcoCartesian射も恒等射と合成について閉じる。[垂直Cartesian射と同型射](../CATB4-01/index.md#prop-catb4-01-vertical)から垂直なcoCartesian射はちょうどファイバー内の同型射である。

## 3. 集合族を前向きに集約する

[集合族の圏](../CATB4-01/index.md#thm-catb4-01-families)では、$u:A\to B$ 上の射は各 $a\in A$ の写像 $\phi_a:X_a\to Y_{u(a)}$ の族で表される。

例えば $A=\{0,1\}$、$B=\{2,3\}$、$u(0)=u(1)=2$ とする。$X_0=\{s\},X_1=\{s,t\}$ なら、単なる和集合では二つの $s$ を区別できない。そこで出所を記録した非交和を取る。移動先2には $(0,s),(1,s),(1,t)$ が入り、3には何も入らない。

<a id="thm-catb4-05-family"></a>

<!-- formal-statement-start -->
> **定理（集合族の余ファイブレーション）**
>
> 集合族の圏から添字集合の圏への射影は余ファイブレーションである。写像 $u:A\to B$ と集合族 $X=(X_a)_{a\in A}$ に対して

$$
(u_!X)_b=\{(a,t):a\in A,\ u(a)=b,\ t\in X_a\}
$$

> と置くと、成分写像 $j_a:X_a\to(u_!X)_{u(a)}$、$j_a(t)=(a,t)$ を持つ射 $(u,j)$ はcoCartesian射である。
<!-- formal-statement-end -->

見取り図：新しい集合の元は出所と元の組である。従って元の各成分からの写像が指定されれば、集約後の集合からの写像を全ての元について決められる。

<!-- proof-start -->
### 証明

任意の $v:B\to C$ と集合族 $Z$、基底 $vu$ 上の射 $(vu,k)$ を取る。すなわち $k_a:X_a\to Z_{v(u(a))}$ である。

媒介射 $(v,h)$ の成分を

$$
h_b:(u_!X)_b\to Z_{v(b)},\qquad h_b(a,t)=k_a(t)
$$

と定める。$u(a)=b$ なので右辺は確かに $Z_{v(b)}$ の元である。組の第一成分で出所が確定するため定義は一意であり、空の成分では空写像となる。

[集合族の射の合成式](../CATB4-01/index.md#thm-catb4-01-families)では、最初の成分 $j_a$ の後に移動先 $u(a)$ に対応する成分 $h_{u(a)}$ を合成する。第二成分を計算すると

$$
(h_{u(a)}j_a)(t)=h_{u(a)}(a,t)=k_a(t).
$$

基底成分は $vu$ だから $(v,h)(u,j)=(vu,k)$。任意の別の候補 $h'$ についても、全ての $(a,t)\in(u_!X)_b$ は $j_a(t)$ であるため

$$
h'_b(a,t)=h'_{u(a)}j_a(t)=k_a(t)=h_b(a,t).
$$

従って各成分で一致する。[coCartesian射の定義](#def-catb4-05-cocartesian)が成立し、任意の $X,u$ に対して構成できるので[余ファイブレーション](#def-catb4-05-opfibration)である。
<!-- proof-end -->

同じ集合族の圏で、後ろ向きの移動は $(u^*Y)_a=Y_{u(a)}$、前向きの移動は上の非交和となる。両者は一般には同じ操作ではない。例えば先の例で、後ろ向きに移すと地点2の集合を2回参照するが、前向きには地点0と1の元を一つの集合に集める。

## 4. 持ち上げの選択から共変擬関手へ

余ファイブレーションに対して各 $u:a\to b,x\in\mathcal E_a$ の持ち上げ $\lambda_{u,x}:x\to u_!x$ を選ぶ。記号 $u_!x$ は選んだ持ち上げの終域であり、$\lambda_{u,x}$ の添字は基底射と出発対象を指定する。選択の存在を仮定し、ここからは各ファイバーが[小圏](../../CAT/CAT1-02/index.md#def-cat1-02-size)である場合を扱う。垂直射 $q:x\to x'$ に対し、$\lambda_{u,x'}q$ は $u$ 上にある。従って一意な垂直射 $u_!q$ が存在して

$$
(u_!q)\lambda_{u,x}=\lambda_{u,x'}q
$$

を満たす。これは前向きの移動の射への作用である。$q=1_x$ なら $1_{u_!x}$ が解であり、$q':x'\to x''$ については

$$
(u_!q')(u_!q)\lambda_{u,x}
=(u_!q')\lambda_{u,x'}q
=\lambda_{u,x''}q'q.
$$

一意性から $u_!(q'q)=(u_!q')(u_!q)$。従って $u_!:\mathcal E_a\to\mathcal E_b$ は関手となる。

二段の持ち上げと直接の持ち上げを比べると、終域は必ずしも等しくないが、一意な同型で結ばれる。[反変擬関手](../CATB4-03/index.md#def-catb4-03-indexed)と同じ発想で、移動を前向きにした対応の構造を定める。

二段と直接を比べる自然同型を $\mu_{v,u}$、何もしない操作と恒等基底射に沿う移動を比べる自然同型を $\eta_a$ とする。[自然同型](../../CAT/CAT1-07/index.md#def-cat1-07-natural-isomorphism)は対象ごとに同型射を持ち、対象間の射に対して自然性を満たす。最後の添字 $x$ はその対象における成分を表す。比較の成分の型は

$$
\mu_{v,u,x}:v_!u_!x\to(vu)_!x,
\qquad
\eta_{a,x}:x\to(1_a)_!x.
$$

$I_{\mathcal G_a}$ は値の圏 $\mathcal G_a$ の恒等関手である。三段の移動をまとめる二経路が一致することと、恒等基底射に沿う余分な移動を単位同型で打ち消せることを条件にする。

<a id="def-catb4-05-covariant-indexed"></a>

<!-- formal-statement-start -->
> **定義（共変擬関手）**
>
> 基底圏 $\mathcal B$ 上の小圏値共変擬関手 $G$ は、各対象 $a$ の圏 $\mathcal G_a$、各射 $u:a\to b$ の関手 $u_!:\mathcal G_a\to\mathcal G_b$ と、自然同型

$$
\mu_{v,u}:v_!u_!\Rightarrow(vu)_!,
\qquad \eta_a:I_{\mathcal G_a}\Rightarrow(1_a)_!
$$

> からなり、任意の合成可能な $u,v,w$ と対象 $x$ について

$$
\mu_{w,vu,x}\,w_!(\mu_{v,u,x})
=\mu_{wv,u,x}\,\mu_{w,v,u_!x},
$$

$$
\mu_{1_b,u,x}\eta_{b,u_!x}=1_{u_!x},
\qquad
\mu_{u,1_a,x}u_!(\eta_{a,x})=1_{u_!x}
$$

> が成立するものである。ここで $u:a\to b,v:b\to c,w:c\to d$、$x\in\mathcal G_a$ とし、最後の添字は自然同型の成分を表す。
<!-- formal-statement-end -->

三重条件の二経路はともに $w_!v_!u_!x$ から $(wvu)_!x$ への射である。左辺は $w_!(vu)_!x$、右辺は $(wv)_!u_!x$ を経由する。単位条件の二辺はともに $u_!x$ の自己射である。

<!-- definition-example-start: def-catb4-05-covariant-indexed -->
**定義の確認**。基底を $0<1<2$ の[順序圏](../../CAT/CAT1-02/index.md#prop-cat1-02-order-category)（合成射 $0\to2$ と各恒等射も含む）とする。固定した有限集合 $S=\{s,t,r,m,n\}$ の全部分集合とその間の全ての写像からなる小圏を、各値の圏とする。対象と射はいずれも有限個であり、合成と恒等写像はこの圏の中にある。全ての関手を恒等関手とする。

$\mu,\eta$ は恒等自然変換とする。関手の恒等・合成保存はそのまま成立し、自然性は任意の写像 $q$ について $1q=q1$。三重条件の両辺も $1\cdot1=1$、左右の単位条件も同じ恒等射となる。よって全条件を満たす。
<!-- definition-example-end -->

<a id="thm-catb4-05-indexed"></a>

<!-- formal-statement-start -->
> **定理（余ファイブレーションからの共変擬関手）**
>
> 小さいファイバーを持ちcoCartesian持ち上げの選択 $\lambda$ が与えられた余ファイブレーションは、上の関手 $u_!$ と次の式で定まる一意な垂直同型により共変擬関手を与える。

$$
\mu_{v,u,x}\lambda_{v,u_!x}\lambda_{u,x}
=\lambda_{vu,x},
\qquad
\eta_{a,x}=\lambda_{1_a,x}.
$$
<!-- formal-statement-end -->

見取り図：比較の両辺を元の持ち上げに合成すると一致することを利用する。単位同型の向きは $x\to(1_a)_!x$ であり、前講の単位の向きと逆である。

<!-- proof-start -->
### 証明

第2節の[双対性](#prop-catb4-05-duality)による同型一意性と合成の閉性から、二段の持ち上げと直接の持ち上げの間に指定の $\mu$ が一意に存在する。恒等基底射の持ち上げ $\eta$ は垂直なcoCartesian射だから同型である。

$q:x\to x'$ を垂直射とする。$\mu$ の自然性の二辺を $L=\lambda_{v,u_!x}\lambda_{u,x}$ に右から合成する。一方は

$$
(vu)_!q\,\mu_{v,u,x}L
=(vu)_!q\,\lambda_{vu,x}
=\lambda_{vu,x'}q.
$$

他方も、射への作用の定義を二回用いると

$$
\begin{aligned}
\mu_{v,u,x'}v_!u_!q\,L
&=\mu_{v,u,x'}\lambda_{v,u_!x'}u_!q\,\lambda_{u,x}\\
&=\mu_{v,u,x'}\lambda_{v,u_!x'}\lambda_{u,x'}q\\
&=\lambda_{vu,x'}q.
\end{aligned}
$$

$L$ はcoCartesianであるから垂直媒介射は一意であり、二辺は一致する。$\eta$ の自然性は $u=1_a$ に対する射への作用の定義式であり、

$$
(1_a)_!q\,\eta_{a,x}=\eta_{a,x'}q
$$

となる。各成分は垂直同型なので、[自然同型の成分判定](../../CAT/CAT1-07/index.md#prop-cat1-07-componentwise-iso)により $\mu,\eta$ は自然同型である。

三重条件の二辺を

$$
M=\lambda_{w,v_!u_!x}\lambda_{v,u_!x}\lambda_{u,x}
$$

に右から合成する。左辺では垂直射 $\mu_{v,u,x}$ に対する関手 $w_!$ の定義式を使う。

$$
\begin{aligned}
&\mu_{w,vu,x}w_!(\mu_{v,u,x})M\\
&=\mu_{w,vu,x}\lambda_{w,(vu)_!x}\mu_{v,u,x}
  \lambda_{v,u_!x}\lambda_{u,x}\\
&=\mu_{w,vu,x}\lambda_{w,(vu)_!x}\lambda_{vu,x}\\
&=\lambda_{wvu,x}.
\end{aligned}
$$

右辺では $u_!x$ を出発対象とする比較を先に使う。

$$
\begin{aligned}
&\mu_{wv,u,x}\mu_{w,v,u_!x}M\\
&=\mu_{wv,u,x}\lambda_{wv,u_!x}\lambda_{u,x}\\
&=\lambda_{wvu,x}.
\end{aligned}
$$

$M$ はcoCartesianなので一意性から三重条件が成立する。

左単位条件の左辺に $\lambda_{u,x}$ を右から合成すると、$\mu_{1_b,u,x}\lambda_{1_b,u_!x}\lambda_{u,x}=\lambda_{u,x}$ となる。右単位条件でも

$$
\begin{aligned}
\mu_{u,1_a,x}u_!(\eta_{a,x})\lambda_{u,x}
&=\mu_{u,1_a,x}\lambda_{u,(1_a)_!x}\lambda_{1_a,x}\\
&=\lambda_{u,x}.
\end{aligned}
$$

$\lambda_{u,x}$ の一意性で両単位条件を得る。
<!-- proof-end -->

第3節の集合族の例でも、この比較と同じ形を成分ごとに計算できる（全ての集合を許すファイバーの小ささはここでは仮定しない）。基底射を重ねると出所のタグが入れ子になる。例えば $u:A\to B,v:B\to C$ に対し、比較は $(b,(a,t))\mapsto(a,t)$ であり、逆は $(a,t)\mapsto(u(a),(a,t))$。単位は $t\mapsto(a,t)$ である。したがって自然な比較があっても、対象の厳密な等号を要求する必要はない。

## 5. 共変擬関手から全圏を作る

前向きの移動 $u_!$ が与えられたら、異なる基底の対象間の射を $u_!x\to y$ で表せる。前講の反変の場合は $x\to u^*y$ であったことと対照的である。

<a id="def-catb4-05-covariant-grothendieck"></a>

<!-- formal-statement-start -->
> **定義（共変Grothendieck構成）**
>
> 小圏値共変擬関手 $G$ に対し、対象を $(a,x)$（$x\in\mathcal G_a$）、$(a,x)$ から $(b,y)$ への射を $(u,f)$（$u:a\to b,f:u_!x\to y$）とする。合成と恒等射は

$$
(v,g)(u,f)=(vu,g\,v_!f\,\mu_{v,u,x}^{-1}),
\qquad 1_{(a,x)}=(1_a,\eta_{a,x}^{-1})
$$

> で定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb4-05-covariant-grothendieck -->
**定義の確認**。第4節の恒等関手の例で $u:0\to1,v:1\to2$、$f:\{s\}\to\{t,r\}$ を $f(s)=r$、$g:\{t,r\}\to\{m,n\}$ を $g(t)=m,g(r)=n$ とする。$u_!$ と $v_!$ は恒等なので第二成分の型は普通の写像の型そのものである。

$$
(v,g)(u,f)=(vu,gf),\qquad (gf)(s)=n.
$$

恒等射は $(1_a,1_x)$ であり、前後から合成しても第二成分を変えない。三射の合成も写像の結合律と基底の結合律から一致する。
<!-- definition-example-end -->

一般には第二成分は次の順に合成される。

$$
(vu)_!x\xrightarrow{\mu^{-1}_{v,u,x}}v_!u_!x
\xrightarrow{v_!f}v_!y\xrightarrow{g}z.
$$

比較の逆を先頭に置かなければ始域が合わない。

<a id="thm-catb4-05-construction"></a>

<!-- formal-statement-start -->
> **定理（共変構成と余ファイブレーション）**
>
> 局所小基底圏上の小圏値共変擬関手 $G$ に対する共変Grothendieck構成は局所小圏をなし、第一成分を取る射影は余ファイブレーションである。$(u,f)$ がcoCartesian射であることと $f$ が同型射であることは同値である。
<!-- formal-statement-end -->

見取り図：圏公理は反対圏に移して前講の定理を適用する。普遍性については第二成分の方程式を直接解く。

<!-- proof-start -->
### 証明

基底を $\mathcal B^{op}$ とし、値を $\mathcal G_a^{op}$ とする反変擬関手 $F$ を作る。$u^{op}:b\to a$ に対する再添字関手は $(u_!)^{op}:\mathcal G_a^{op}\to\mathcal G_b^{op}$ である。

比較を $\alpha_{v^{op},u^{op}}=(\mu_{v,u}^{-1})^{op}$、単位を $\epsilon_a=\eta_a^{op}$ とする。[反変擬関手](../CATB4-03/index.md#def-catb4-03-indexed)の単位は $(1_a)^*\Rightarrow I$ の向きなので、ここでは $\eta_a$ 自体を反転する。自然同型を反対圏に移すと向きが逆になるので、比較の型は $(v_!)^{op}(u_!)^{op}\Rightarrow((vu)_!)^{op}$ となる。三重条件の両辺の逆を取ると

$$
w_!(\mu_{v,u,x}^{-1})\mu_{w,vu,x}^{-1}
=\mu_{w,v,u_!x}^{-1}\mu_{wv,u,x}^{-1}.
$$

反対圏へ移すと合成順序が逆になり、これは

$$
\alpha_{w^{op},(vu)^{op},x}\,
(w_!)^{op}\alpha_{v^{op},u^{op},x}
=\alpha_{(wv)^{op},u^{op},x}\,
\alpha_{w^{op},v^{op},u_!x}
$$

となる。ここで反変の比較 $\alpha_{v^{op},u^{op}}$ は $(\mu_{v,u}^{-1})^{op}$ を表す。これは反変の三重条件である。左右の単位条件から

$$
\mu_{1_b,u,x}^{-1}=\eta_{b,u_!x},
\qquad
\mu_{u,1_a,x}^{-1}=u_!(\eta_{a,x})
$$

を得るので、反対圏で比較の片方の基底射が恒等射の場合には、それぞれ単位 $\eta_b^{op}$ と $(u_!)^{op}\eta_a^{op}$ になる。自然性も各 $\mu^{-1},\eta$ の自然性の等式を反転したものなので成立する。従って[反変擬関手](../CATB4-03/index.md#def-catb4-03-indexed)の仮定が成立する。

[Grothendieck構成の圏構造](../CATB4-04/index.md#thm-catb4-04-category)を適用し、その全圏の反対圏を取る。反変側で $(u^{op},f^{op}):(b,y)\to(a,x)$ となる。二射の反変側の合成の第二成分は

$$
(\mu_{v,u,x}^{-1})^{op}(v_!f)^{op}g^{op}
=(g\,v_!f\,\mu_{v,u,x}^{-1})^{op}.
$$

恒等射の第二成分は $(\eta_{a,x}^{op})^{-1}=(\eta_{a,x}^{-1})^{op}$。従って反対圏に戻した演算は共変構成と一致し、圏公理・局所小性・射影の関手性が得られる。

選んだ持ち上げ $(u,1_{u_!x})$ に対し、任意の $v:b\to c$ 上の媒介射 $(v,h)$ と $vu$ 上の入力 $(vu,k)$ の因子分解式は

$$
h\,\mu_{v,u,x}^{-1}=k,\qquad
h:v_!u_!x\to z.
$$

唯一の解は $h=k\mu_{v,u,x}$ である。従って任意の $u,x$ で持ち上げが存在する。

一般の $(u,f)$ で $f$ が同型なら、[関手の同型保存](../../CAT/CAT1-06/index.md#prop-cat1-06-preservation)により $v_!f$ も同型である。媒介射の第二成分は $h:v_!y\to z$ であり、方程式 $h\,v_!f\,\mu_{v,u,x}^{-1}=k$ は

$$
h=k\mu_{v,u,x}(v_!f)^{-1}
$$

を唯一の解とする。逆に $(u,f)$ がcoCartesianなら、[双対性](#prop-catb4-05-duality)から反変側の $(u^{op},f^{op})$ はCartesianである。[Grothendieck構成のファイブレーション](../CATB4-04/index.md#thm-catb4-04-fibration)の同型判定を適用すると $f^{op}$ は同型。反対圏で逆射を戻せば $f$ も同型である。
<!-- proof-end -->

余ファイブレーションから作った共変擬関手をこの構成に入れると、全圏の射 $s:x\to y$（$p(s)=u$）は $s=f\lambda_{u,x}$ と一意に分解できる。この対応が全圏を復元することを演習C01で確かめる。

## 6. 演習

### CATB4-05-A01 普遍性を確認する

- Level: A

基底を任意の局所小圏とし、恒等関手に対する任意の射 $u:a\to b$ がcoCartesianであることを示せ。

<!-- solution-start -->
**詳細解答。** 任意の $k:a\to c,v:b\to c$ について $k=vu$ を仮定する。[coCartesian射](#def-catb4-05-cocartesian)の条件は $h=v,hu=k$ である。$h=v$ とすれば仮定から第二条件も成立し、第一条件が $h=v$ を強制するので一意である。
<!-- solution-end -->

### CATB4-05-A02 集合族の集約

- Level: A

$A=\{0,1\},B=\{2,3\}$、$u(0)=u(1)=2$、$X_0=\{s\},X_1=\{s,t\}$ とする。$(u_!X)_2,(u_!X)_3$ と持ち上げの成分写像を求めよ。

<!-- solution-start -->
**詳細解答。** [集合族の余ファイブレーション](#thm-catb4-05-family)の式に代入すると、2の逆像は $\{0,1\}$、3の逆像は空集合だから

$$
(u_!X)_2=\{(0,s),(1,s),(1,t)\},\qquad
(u_!X)_3=\varnothing.
$$

$j_0(s)=(0,s)$、$j_1(s)=(1,s)$、$j_1(t)=(1,t)$ である。どの元も出所ごとに区別されている。
<!-- solution-end -->

### CATB4-05-A03 媒介射を求める

- Level: A

A02の設定で $v:B\to\{4\}$ を唯一の写像とし、$Z_4=\{m,n\}$ とする。入力射の成分を $k_0(s)=m,k_1(s)=n,k_1(t)=m$ とする。媒介射を求め、一意性を示せ。

<!-- solution-start -->
**詳細解答。** [集合族の余ファイブレーション](#thm-catb4-05-family)の因子分解式は $h_{u(a)}j_a=k_a$ である。従って $h_2(0,s)=m,h_2(1,s)=n,h_2(1,t)=m$、$h_3$ は空集合から $Z_4$ への唯一の写像である。

$j_0,j_1$ の像は合わせて $(u_!X)_2$ の全元を尽くし、各元の値が式によって指定されるため、別の媒介射は存在しない。
<!-- solution-end -->

### CATB4-05-A04 同型でない成分

- Level: A

第5節の恒等関手の例で $u:0\to1$、$f:\{s,t\}\to\{r\}$ を定値写像とする。$(u,f)$ がcoCartesianでないことを直接示せ。

<!-- solution-start -->
**詳細解答。** $v:1\to2$ と $k:\{s,t\}\to\{m,n\}$ を $k(s)=m,k(t)=n$ と取る。[coCartesian射の定義](#def-catb4-05-cocartesian)から媒介射 $(v,h)$ は $hf=k$ を満たす必要がある。しかし $hf(s)=h(r)=hf(t)$ であり、$m\ne n$ と矛盾する。従って存在条件が成立しない。
<!-- solution-end -->

### CATB4-05-B01 持ち上げの合成を直接証明する

- Level: B

$u:a\to b$ 上のcoCartesian射 $f:x\to y$ と、$v:b\to c$ 上のcoCartesian射 $g:y\to z$ を取る。任意の対象 $t$、$d=p(t)$、基底射 $w:c\to d$ と $wvu$ 上の $k:x\to t$ を用いて $gf$ の普遍性を直接証明せよ。

<!-- solution-start -->
**詳細解答。** $f$ の[普遍性](#def-catb4-05-cocartesian)に媒介基底 $wv$ と $k$ を入れると、唯一の $l:y\to t$ が存在して $p(l)=wv,lf=k$ となる。次に $g$ に $w,l$ を入れると唯一の $h:z\to t$ が得られ、$p(h)=w,hg=l$ である。従って $hgf=lf=k$。

別の候補 $h'$ は $p(h'g)=wv$ と $h'gf=k$ を満たすので $f$ の一意性から $h'g=l$。さらに $g$ の一意性から $h'=h$。これで合成がcoCartesianとなる。
<!-- solution-end -->

### CATB4-05-B02 比較の逆が必要な理由

- Level: B

基底を一対象で恒等射のみの圏、値を射が $\mathbb Z/3\mathbb Z$ の[一対象圏](../../CAT/CAT1-02/index.md#prop-cat1-02-one-object)とする。射の合成は3を法とする加法で、恒等射は剰余類 $0$ である。関手を恒等とし、唯一の対象成分を略記して $\eta=1,\mu=2$ とする。擬関手の条件を確認し、共変構成の恒等射と第二成分 $f=1,g=0$ の合成を求めよ。

<!-- solution-start -->
**詳細解答。** 任意の剰余類 $q$ について $q+2=2+q$、$q+1=1+q$ なので比較と単位は自然である。比較 $2$ の逆元は $1$、単位 $1$ の逆元は $2$ である。

三重条件の両辺は $2+2\equiv1$、単位条件は $2+1\equiv0$（いずれも3を法とする）なので[共変擬関手](#def-catb4-05-covariant-indexed)の条件が成立する。

[共変Grothendieck構成](#def-catb4-05-covariant-grothendieck)の恒等射の第二成分は $-\eta=2$、合成は

$$
g+f-\mu=0+1-2=-1\equiv2\pmod3.
$$

任意の $f$ に対し $2+f-2=f=f+2-2$ だから恒等射の条件も確認できる。逆を取らず $+\mu$ を使うと $2+f+2=f+1$ となり単位律が壊れる。
<!-- solution-end -->

### CATB4-05-B03 集合族の比較

- Level: B

$u:A\to B,v:B\to C,w:C\to D$ とする。第3節の集約関手で三重移動した元を $(c,(b,(a,t)))$ と書く。二通りの比較が一致すること、および比較が自然であることを示せ。

<!-- solution-start -->
**詳細解答。** [集合族の集約](#thm-catb4-05-family)を三回適用すると、入れ子の条件は $u(a)=b,v(b)=c$、最終添字は $w(c)$ である。[共変擬関手の三重条件](#def-catb4-05-covariant-indexed)の二経路を、このタグの除去として計算する。先に内側を比較すると

$$
(c,(b,(a,t)))\mapsto(c,(a,t))\mapsto(a,t).
$$

先に外側を比較すると $(c,(b,(a,t)))\mapsto(b,(a,t))\mapsto(a,t)$。どちらも同じ出所と元を残す。各比較の逆は、消したタグを $u(a)$ や $v(u(a))$ から復元すればよい。

垂直射の成分 $q_a:X_a\to X'_a$ は、タグを変えず $t$ を $q_a(t)$ に写す。比較前後のどちらで作用させても $(a,q_a(t))$ となるため比較は自然である。空の成分では両辺とも空写像である。
<!-- solution-end -->

### CATB4-05-C01 全圏を復元する

- Level: C

小さいファイバーを持ちcoCartesian持ち上げ $\lambda$ を選んだ余ファイブレーション $p$ から、第4節の共変擬関手 $G$ を作る。第5節の共変構成から $\mathcal E$ への写像を $(a,x)\mapsto x$、$(u,f)\mapsto f\lambda_{u,x}$ で定める。この写像が基底上の圏同型であり、選んだ持ち上げを保存することを示せ。

<!-- solution-start -->
**詳細解答。** 対象の逆写像は $x\mapsto(p(x),x)$ である。射 $s:x\to y$ について $u=p(s)$ と置く。[coCartesian射の定義](#def-catb4-05-cocartesian)に媒介基底 $1_{p(y)}$ を入れると、唯一の垂直射 $f:u_!x\to y$ が存在し $s=f\lambda_{u,x}$ となる。よって射についても一対一である。

$K$ を問題の写像とし、合成可能な $(u,f):(a,x)\to(b,y)$ と $(v,g):(b,y)\to(c,z)$ を取る。ここで $f:u_!x\to y$ は $\mathcal E_b$ の垂直射なので、$v_!$ を適用できる。[共変擬関手への構成](#thm-catb4-05-indexed)で得た射への作用と比較の式により

$$
\begin{aligned}
K(v,g)K(u,f)
&=g\lambda_{v,y}f\lambda_{u,x}\\
&=g v_!f\,\lambda_{v,u_!x}\lambda_{u,x}\\
&=g v_!f\,\mu_{v,u,x}^{-1}\lambda_{vu,x}.
\end{aligned}
$$

これは[共変Grothendieck構成](#def-catb4-05-covariant-grothendieck)の合成の像に等しい。恒等射の像は

$$
K(1_a,\eta_{a,x}^{-1})
=\eta_{a,x}^{-1}\lambda_{1_a,x}
=1_x.
$$

さらに $p(f\lambda_{u,x})=1_bu=u$ であるから基底も保存する。対象と射で全単射な関手の逆写像は、合成と恒等射の保存式を逆に読めば関手になる。従って基底上の圏同型である。選んだ持ち上げ $(u,1_{u_!x})$ の像は $1_{u_!x}\lambda_{u,x}=\lambda_{u,x}$ となり、選択も保存する。
<!-- solution-end -->

## 7. まとめ

Cartesian射は終域を固定して入る射を、coCartesian射は始域を固定して出る射を因子分解する。全圏と基底圏を同時に反転することで二つの普遍性を相互に移せる。集合族では逆向きの再添字付けと前向きの非交和がこの違いを具体化する。選んだ前向きの持ち上げは共変擬関手を与え、比較同型を含めて全圏を組み直せる。次講では基底そのものを別の圏へ変更する場合を考える。
