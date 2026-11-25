# CATB4-01 Cartesian射とファイブレーション

## 1. 添字が変わるとき、対象をどう移すか

これまでは一つの圏の内部で対象と射を扱ってきた。今回は集合 $B$ の各元 $b$ に集合 $Y_b$ を割り当てる状況を考える。例えば観測地点ごとに観測記録の集合があるとする。新しい地点集合 $A$ と対応表 $u:A\to B$ が与えられたら、地点 $a$ の記録を $Y_{u(a)}$ と定めれば、新しい添字で記録を参照できる。複数の地点が同じ地点を参照してよく、空の記録集合も許す。

一般の圏では元ごとの式が使えない。そこで「添字に沿って移した対象から元の対象へ向かう射」を、その射を通る因子分解の存在と一意性で特徴づける。これは[引き戻し](../../CAT/CAT2-03/index.md#def-cat2-03-pullback)の普遍性を、関手の上で考える方法である。

以下、$\mathcal E,\mathcal B$ は局所小圏、$p:\mathcal E\to\mathcal B$ は[共変関手](../../CAT/CAT1-06/index.md#def-cat1-06-functor)とする。合成は右から左に書く。$\mathcal B$ を基底圏、$\mathcal E$ を全圏と呼ぶ。$p(x)=a$ なら $x$ は $a$ の上にあり、$p(f)=u$ なら $f$ は $u$ の上にあるという。対象や射の等号は同型でなく厳密な等号とする。

## 2. 一つの基底対象の上にある圏

基底の添字を固定して、記録集合だけを変える操作を取り出したい。基底の恒等射に写る射を垂直射と呼び、これらだけで圏を作る。

<a id="def-catb4-01-fiber"></a>

<!-- formal-statement-start -->
> **定義（ファイバー圏）**
>
> 関手 $p:\mathcal E\to\mathcal B$ と $b\in\mathcal B$ に対し、ファイバー圏 $\mathcal E_b$ の対象は $p(x)=b$ を満たす $x$、射は $p(h)=1_b$ を満たす $h:x\to y$ とする。合成と恒等射は $\mathcal E$ のものを使う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb4-01-fiber -->
**定義の確認。** 集合 $B=\{0,1\}$ を固定する。対象を写像 $q:X\to B$ とし、射 $h:(X,q)\to(X',q')$ を $q'h=q$ を満たす写像とする。これは [スライス圏](../../CAT/CAT1-05/index.md#def-cat1-05-slice) $\mathbf{Set}/B$ である。例えば $X=\{s,t\}$、$X'=\{r\}$、$q(s)=q(t)=q'(r)=0$ とすれば、$h(s)=h(t)=r$ は射となる。添字 $B$ は変えず、各添字に属する元だけを送っている。後で構成する関手の $B$ 上のファイバーがまさにこの圏になる。

一般にも $p(1_x)=1_b$、垂直射 $h:x\to y,k:y\to z$ について $p(kh)=p(k)p(h)=1_b1_b=1_b$ である。従って恒等射と合成が閉じ、結合律と単位律は全圏から受け継がれる。
<!-- definition-example-end -->

ファイバー圏は同じ基底対象の上にある射をすべて含むとは限らない。$b$ の自己射が $1_b$ 以外にもある場合、それに写る射は除く。

## 3. 基底の射を固定した因子分解

$u:a\to b$ に沿って $y$ を移す候補を $x$ とし、$f:x\to y$ が $u$ の上にあるとする。別の対象 $z$ が $c$ の上にあり、$v:c\to a$ を経由する基底射 $uv$ の上に $g:z\to y$ があるとき、$g$ を $f$ 経由でただ一通りに表したい。この性質をCartesian射と呼ぶ。

<a id="def-catb4-01-cartesian"></a>

<!-- formal-statement-start -->
> **定義（Cartesian射）**
>
> 関手 $p:\mathcal E\to\mathcal B$ に対し、$p(x)=a,p(y)=b,p(f)=u:a\to b$ とする。射 $f:x\to y$ がCartesian射であるとは、任意の $z\in\mathcal E$、射 $v:p(z)\to a$ および $g:z\to y$ で $p(g)=uv$ を満たすものに対して、ただ一つの射 $h:z\to x$ が存在し、次を満たすことである。

$$
p(h)=v,\qquad fh=g.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb4-01-cartesian -->
**定義の確認。** $p=1_{\mathcal B}$ とする。任意の $u:a\to b$ に対して $f=u$ と取る。任意の $g:z\to b$ と $v:z\to a$ が $g=uv$ を満たすなら、$h=v$ が二条件を満たす。$p(h)=v$ はここでは $h=v$ そのものなので一意である。従って恒等関手に対してはすべての射がCartesian射である。
<!-- definition-example-end -->

重要なのは $v$ も入力として固定することだ。$fh=g$ だけの一意性ではない。また $v=1_a$ の場合だけでなく、任意の基底対象 $p(z)$ から来る射を調べる。

## 4. 持ち上げがいつでも存在する条件

基底の射 $u:a\to b$ と、その終点上の対象 $y$ を指定する。$y$ を始点 $a$ に移すCartesian射を $u$ に沿う $y$ のCartesian持ち上げと呼ぶ。始域 $x$ は探す対象であって、あらかじめ固定しない。

<a id="def-catb4-01-fibration"></a>

<!-- formal-statement-start -->
> **定義（ファイブレーション）**
>
> 関手 $p:\mathcal E\to\mathcal B$ がファイブレーションであるとは、任意の $y\in\mathcal E$ と任意の基底射 $u:a\to p(y)$ に対し、$p(x)=a$ かつ $p(f)=u$ を満たすCartesian射 $f:x\to y$ が存在することである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb4-01-fibration -->
**定義の確認。** 恒等関手では任意の $y=b$ と $u:a\to b$ に対し、$x=a,f=u$ を取れる。前節の検証は任意の $u$ に適用でき、必要な持ち上げの存在が確かめられた。
<!-- definition-example-end -->

この定義は存在を要求するが、全持ち上げの選び方を指定しない。選択と合成との整合性は次講で扱う。

<a id="thm-catb4-01-unique-lift"></a>

<!-- formal-statement-start -->
> **定理（Cartesian持ち上げの同型一意性）**
>
> 関手 $p$ に対し、同じ $u:a\to b$ と $y$（$p(y)=b$）のCartesian持ち上げ $f:x\to y$ と $f':x'\to y$ があれば、$f'i=f$ を満たす垂直射 $i:x\to x'$ がただ一つ存在し、それはファイバー圏 $\mathcal E_a$ の同型射である。
<!-- formal-statement-end -->

見取り図：二つの持ち上げを互いに因子分解し、その合成と恒等射を一意性で比較する。

<!-- proof-start -->
### 証明

$f'$ の [Cartesian射の定義](#def-catb4-01-cartesian)に $z=x,v=1_a,g=f$ を代入する。$p(f)=u=u1_a$ なので唯一の $i:x\to x'$ が存在し $p(i)=1_a,f'i=f$ となる。

逆に $f$ に $z=x',v=1_a,g=f'$ を代入すると、唯一の $j:x'\to x$ が得られ $p(j)=1_a,fj=f'$ である。

すると $p(ji)=1_a$ かつ $fji=f'i=f$ であり、$1_x$ もこの二条件を満たす。$f$ の一意性を $z=x,v=1_a,g=f$ に適用して $ji=1_x$ を得る。また $p(ij)=1_a$ かつ $f'ij=fj=f'$ なので、$f'$ の一意性により $ij=1_{x'}$ となる。

$i,j$ はともに垂直射であり、互いに逆射なので [同型射の定義](../../CAT/CAT1-03/index.md#def-cat1-03-isomorphism) により $\mathcal E_a$ の同型射である。最初の因子分解で $i$ の一意性も得られている。
<!-- proof-end -->

従って持ち上げの始域は厳密に同じ対象である必要はない。例えば集合のコピーを別の名前で作っても、元の対象への射と整合する一意な同型で比較できる。

<a id="prop-catb4-01-composition"></a>

<!-- formal-statement-start -->
> **命題（Cartesian射の恒等射と合成）**
>
> 任意の関手 $p$ に対して全圏の恒等射はCartesian射である。また $f:x\to y$ と $k:y\to t$ がともにCartesian射なら、$kf:x\to t$ もCartesian射である。
<!-- formal-statement-end -->

見取り図：合成を通る射を、まず $k$、次に $f$ で因子分解する。一意性も同じ順序で使う。

<!-- proof-start -->
### 証明

恒等射 $1_x$ の場合、$g:z\to x$ と $v:p(z)\to p(x)$ が $p(g)=1_{p(x)}v=v$ を満たせば $h=g$ と取れる。$1_xh=g$ は $h=g$ を強制する。

次に $p(f)=u:a\to b,p(k)=w:b\to d$ と置く。$v:p(z)\to a$ と $g:z\to t$ が $p(g)=(wu)v=w(uv)$ を満たすとする。

$k$ の普遍性に $uv$ と $g$ を入れると、唯一の $l:z\to y$ が存在して $p(l)=uv,kl=g$ となる。$f$ の普遍性に $v$ と $l$ を入れると唯一の $h:z\to x$ が存在して $p(h)=v,fh=l$ となる。従って $(kf)h=kl=g$ である。

別の候補 $h'$ が $p(h')=v,kfh'=g$ を満たすなら、$p(fh')=uv$ だから $k$ の一意性により $fh'=l$ である。さらに $f$ の一意性により $h'=h$ となる。これで合成も定義を満たす。
<!-- proof-end -->

<a id="prop-catb4-01-vertical"></a>

<!-- formal-statement-start -->
> **命題（垂直Cartesian射と同型射）**
>
> 任意の関手 $p$ に対し、垂直射 $f:x\to y$（$p(x)=p(y)=b,p(f)=1_b$）がCartesian射であることと、$\mathcal E_b$ の同型射であることは同値である。
<!-- formal-statement-end -->

見取り図：恒等射を持ち上げる場合、逆射が普遍性から得られる。逆射があれば任意の因子分解を作れる。

<!-- proof-start -->
### 証明

$f$ がCartesianなら、$z=y,v=1_b,g=1_y$ と置いて $h:y\to x$ を得る。$p(h)=1_b,fh=1_y$ である。今度は $z=x,v=1_b,g=f$ とする。$hf$ と $1_x$ はともに $1_b$ 上にあり、$f(hf)=(fh)f=f$ なので一意性により $hf=1_x$ である。

逆に垂直な逆射 $h$ が存在すれば、任意の $g:z\to y$ と $v:p(z)\to b$ で $p(g)=1_bv=v$ となるものについて $l=hg$ と取る。$p(l)=1_bv=v,fl=fhg=g$ である。$fl'=g$ なら左から $h$ を合成して $l'=hg=l$ となる。
<!-- proof-end -->

## 5. 集合族を移す

集合族の圏を具体的に作る。対象は $(B,(Y_b)_{b\in B})$、射は基底写像 $u:A\to B$ と成分写像 $\phi_a:X_a\to Y_{u(a)}$ の組 $(u,\phi)$ とする。

次の射 $(w,\psi):(B,Y)\to(D,Z)$ との合成は基底 $wu$ と成分 $\psi_{u(a)}\phi_a$ で与える。恒等射は $(1_A,(1_{X_a})_{a\in A})$ である。三つの射の合成成分は括弧の置き方によらず $\theta_{w(u(a))}\psi_{u(a)}\phi_a$ となり、単位律も成分ごとの写像の単位律から従う。従って圏をなす。基底だけを取る $p$ は、合成を $wu$ に、恒等射を $1_A$ に送るため関手である。

<a id="thm-catb4-01-families"></a>

<!-- formal-statement-start -->
> **定理（集合族のファイブレーション）**
>
> 集合族の圏 $\mathcal F$ から集合と写像の圏への関手 $p$ を、$(B,Y)\mapsto B$、$(u,\phi)\mapsto u$ とする。この関手はファイブレーションであり、$u:A\to B$ に沿う $(B,Y)$ のCartesian持ち上げは次で与えられる。

$$
f=(u,(1_{Y_{u(a)}})_{a\in A}):
(A,(Y_{u(a)})_{a\in A})\to(B,Y).
$$
<!-- formal-statement-end -->

見取り図：基底 $uv$ 上の成分写像は、そのまま $v$ 上の媒介射の成分写像になる。

<!-- proof-start -->
### 証明

任意の $u:A\to B$ と $(B,Y)$ に対して $X_a=Y_{u(a)}$ と置く。表示した $f$ は成分の型 $X_a\to Y_{u(a)}$ を満たし、$p(f)=u$ である。

任意の集合族 $(C,T)$、$v:C\to A$ と射 $g=(uv,\gamma):(C,T)\to(B,Y)$ を取る。各 $c\in C$ で

$$
\gamma_c:T_c\to Y_{u(v(c))}=X_{v(c)}
$$

なので、$h=(v,(\gamma_c)_{c\in C})$ は $(C,T)$ から $(A,X)$ への射である。$p(h)=v$ で、合成 $fh$ の成分は

$$
1_{Y_{u(v(c))}}\gamma_c=\gamma_c
$$

となる。基底も $uv$ なので $fh=g$ である。別の候補 $h'=(v,\delta)$ が $fh'=g$ を満たすなら、各 $c$ について $1_{Y_{u(v(c))}}\delta_c=\gamma_c$、すなわち $\delta_c=\gamma_c$ である。全成分と基底が一致し $h'=h$ となる。空添字でも空の成分族は一意であり、論証は変わらない。

従って $f$ はCartesian射で、任意の $u$ と終点族に対して構成できる。
<!-- proof-end -->

例えば $B=\{0,1\}$、$Y_0=\{r,s\},Y_1=\varnothing$、$A=\{a,b,c\}$、$u(a)=u(c)=0,u(b)=1$ とする。移した族の成分は $\{r,s\},\varnothing,\{r,s\}$ になる。添字 $a,c$ が同じ基底を参照しても成分の所属添字は別である。

一般の射 $(u,\phi)$ がCartesianであることは、各 $\phi_a$ が全単射であることと同値である。実際、上の持ち上げ $f$ を用いれば $(u,\phi)=fi$、$i=(1_A,\phi)$ と書ける。前者がCartesianなら [同型一意性](#thm-catb4-01-unique-lift) から $i$ は垂直同型である。垂直同型の逆成分は各 $\phi_a$ の逆写像となる。逆にすべて全単射なら成分の逆写像で $i$ の逆射を作れ、[垂直Cartesian射の判定](#prop-catb4-01-vertical) と [合成則](#prop-catb4-01-composition) から $fi$ はCartesianとなる。

反例として一元添字上で $\{0,1\}\to\{*\}$ を考える。基底は恒等射である。終点の一元集合から自身への恒等写像を因子分解する候補は、元を $0$ に送るものと $1$ に送るものの二つある。一意性が壊れるのでCartesian射でない。単に基底に沿う射が存在するだけでは不十分である。

## 6. 引き戻しによる別の構成

任意の引き戻しを持つ圏 $\mathcal C$ について、対象を射 $q:X\to B$、射を可換四角形 $(s,u):q\to r$（$r:Y\to D,\ rs=uq$）とする圏を考える。恒等射は $(1_X,1_B)$ で、合成は $(t,w)(s,u)=(ts,wu)$ である。次の対象を $m:Z\to H$ とすれば $mt=wr$ から $mts=wrs=wuq$ となり、合成は再び可換である。単位律・結合律も各成分から従う。終域を取る関手 $p(q)=B,p(s,u)=u$ のファイバーは [スライス圏](../../CAT/CAT1-05/index.md#def-cat1-05-slice) $\mathcal C/B$ である。

<a id="thm-catb4-01-codomain"></a>

<!-- formal-statement-start -->
> **定理（終域関手と引き戻し）**
>
> 圏 $\mathcal C$ がすべての引き戻しを持つなら、上で構成した終域関手はファイブレーションである。さらに、任意の可換四角形 $(s,u):q\to r$ がCartesian射であることと、その四角形が引き戻しであることは同値である。
<!-- formal-statement-end -->

見取り図：可換四角形を通る媒介射の存在と一意性は、引き戻しの普遍性と同じ内容になる。

<!-- proof-start -->
### 証明

$q:X\to A,r:Y\to B,u:A\to B,s:X\to Y$ が $rs=uq$ を満たすとする。まずこの四角形が [引き戻し](../../CAT/CAT2-03/index.md#def-cat2-03-pullback) であると仮定する。

任意の対象 $e:T\to C$ と基底射 $v:C\to A$、射 $(g,uv):e\to r$ を取る。可換条件は $rg=uve$ である。引き戻しの普遍性に二射 $g:T\to Y,ve:T\to A$ を入れると、唯一の $h:T\to X$ が存在し

$$
sh=g,\qquad qh=ve
$$

となる。後者は $(h,v):e\to q$ が可換四角形である条件、前者は $(s,u)(h,v)=(g,uv)$ の第一成分である。基底成分は指定された $v$ なので、引き戻しでの $h$ の一意性がCartesian射の一意性を与える。

逆に $(s,u)$ がCartesianとする。$g:T\to Y,k:T\to A$ が $rg=uk$ を満たすとき、全圏の対象 $e=1_T:T\to T$ と基底射 $v=k$ を取る。$(g,uk):e\to r$ は $rg=uk1_T$ により射である。Cartesian性から唯一の $(h,k):e\to q$ が存在する。可換条件と因子分解式は $qh=k,sh=g$ となる。これらを満たす別の射 $h'$ があれば $(h',k)$ が別の因子分解となるので $h'=h$ である。従って四角形は引き戻しである。

最後に任意の $r:Y\to B$ と $u:A\to B$ に対し、仮定からその引き戻し $q:X\to A,s:X\to Y$ が存在する。前半で $(s,u)$ はCartesianと示したから、任意の基底射に沿う持ち上げが存在する。
<!-- proof-end -->

集合では $X=\{(a,y)\in A\times Y\mid u(a)=r(y)\}$、$q(a,y)=a,s(a,y)=y$ と構成できる。$a$ の上にある元は $r(y)=u(a)$ の条件を満たすものに限られる。第5節の集合族の構成を、添字付きの集合の非交和を使って一つの写像として表したものに対応する。

## 7. 演習

### CATB4-01-A01 基底を固定する

- Level: A

集合族 $A=\{0,1\}$ 上の二族 $X_0=\{a,b\},X_1=\varnothing$ と $Y_0=\{c\},Y_1=\{d,e\}$ の間の垂直射をすべて求めよ。

<!-- solution-start -->
**詳細解答。** [ファイバー圏の定義](#def-catb4-01-fiber)から基底は $1_A$ である。成分は $X_0\to Y_0$ と $X_1\to Y_1$ であり、前者は $a,b$ をともに $c$ に送る写像だけ、後者は空写像だけである。従って垂直射は一つである。逆向きには $Y_1$ から空集合への写像がないので逆射は存在しない。
<!-- solution-end -->

### CATB4-01-A02 添字の移動

- Level: A

$A=\{1,2,3\}, B=\{0,1\}$、$u(1)=u(2)=1,u(3)=0$ とする。$Y_0=\{r\},Y_1=\{s,t\}$ を $u$ に沿って持ち上げ、成分と持ち上げ射を求めよ。

<!-- solution-start -->
**詳細解答。** [集合族のファイブレーション](#thm-catb4-01-families)で $X_i=Y_{u(i)}$ を代入する。従って $X_1=X_2=\{s,t\},X_3=\{r\}$ である。持ち上げは基底 $u$ と、$1,2$ ではそれぞれ $\{s,t\}$ の恒等写像、$3$ では $\{r\}$ の恒等写像を成分とする射である。
<!-- solution-end -->

### CATB4-01-A03 媒介射の型

- Level: A

前問で $C=\{c\},v(c)=2,T_c=\{z\}$ とし、基底 $uv$ 上の射 $g$ の成分が $z\mapsto t$ であるとする。Cartesian持ち上げ $f$ を通る媒介射を求めよ。

<!-- solution-start -->
**詳細解答。** [Cartesian射の定義](#def-catb4-01-cartesian)では媒介射の基底は $v$ である。従って成分の終域は $X_{v(c)}=X_2=\{s,t\}$ となる。$f$ の第2成分は恒等写像なので、$h_c(z)=t$ だけが $f_2h_c(z)=t$ を満たす。基底成分も固定され、これが唯一の射である。
<!-- solution-end -->

### CATB4-01-A04 垂直射の判定

- Level: A

一元添字上の集合 $\{a,b\}$ から $\{r,s\}$ への写像 $\phi(a)=s,\phi(b)=r$ がCartesianであることを確認せよ。

<!-- solution-start -->
**詳細解答。** 逆写像 $\eta(r)=b,\eta(s)=a$ を作ると、$\eta\phi(a)=a,\eta\phi(b)=b,\phi\eta(r)=r,\phi\eta(s)=s$ となる。両射は同じ添字の恒等射上にあるのでファイバー内の逆射である。[垂直Cartesian射と同型射](#prop-catb4-01-vertical)により $\phi$ はCartesianである。
<!-- solution-end -->

### CATB4-01-B01 二段の持ち上げ

- Level: B

$A=\{a,b\},B=\{0,1\},D=\{d\}$、$u(a)=0,u(b)=1$ とし $w:B\to D$ は唯一の写像とする。$Z_d=\{m,n\}$ を $w$、次に $u$ に沿って持ち上げた族と、$wu$ に沿って直接持ち上げた族を比較せよ。

<!-- solution-start -->
**詳細解答。** [集合族のファイブレーション](#thm-catb4-01-families)から $Y_0=Z_{w(0)}=Z_d,Y_1=Z_d$ となる。次に $X_a=Y_0=Z_d,X_b=Y_1=Z_d$ である。直接の構成は $X'_a=Z_{wu(a)}=Z_d,X'_b=Z_{wu(b)}=Z_d$ なので、選んだ具体的構成では同じ族になる。二段の持ち上げの合成成分は $1_{Z_d}1_{Z_d}=1_{Z_d}$、基底は $wu$ である。[Cartesian射の合成則](#prop-catb4-01-composition)により合成はCartesianであり、この構成では直接の射と厳密に一致する。一般の選び方で厳密な一致を保証しているわけではない。
<!-- solution-end -->

### CATB4-01-B02 別のコピーを比較する

- Level: B

一元添字上の $Y=\{r,s\}$ に対し、$f:\{a,b\}\to Y$ を $a\mapsto r,b\mapsto s$、$f':\{0,1\}\to Y$ を $0\mapsto s,1\mapsto r$ とする。基底は恒等射である。持ち上げを比較する同型と逆を求めよ。

<!-- solution-start -->
**詳細解答。** 両写像は全単射で逆写像を同じ添字上に持つので [垂直Cartesian射の判定](#prop-catb4-01-vertical) によりCartesianである。[同型一意性](#thm-catb4-01-unique-lift)の条件 $f'i=f$ を元ごとに解くと、$f'(i(a))=r$ から $i(a)=1$、$f'(i(b))=s$ から $i(b)=0$ である。逆は $j(1)=a,j(0)=b$ で、$ji(a)=a,ji(b)=b,ij(0)=0,ij(1)=1$ を確認できる。従って両持ち上げを結ぶ一意な垂直同型である。
<!-- solution-end -->

### CATB4-01-B03 存在と一意性の区別

- Level: B

一元添字上の $\phi:\{a\}\to\{r,s\}$ を $\phi(a)=r$ とする。基底は恒等射である。因子分解の存在が失敗する具体的な $g,v$ を与えよ。

<!-- solution-start -->
**詳細解答。** $z$ を一元添字上の族 $\{t\}$、$v$ を基底恒等射とし、$g(t)=s$ とする。$p(g)=1=1v$ なので [Cartesian射の定義](#def-catb4-01-cartesian) の入力条件を満たす。しかし唯一可能な成分写像 $h(t)=a$ では $\phi h(t)=r\ne s=g(t)$ である。従って因子分解が存在せず、Cartesianではない。本文の二元集合から一元集合への反例とは失敗する条件が異なる。
<!-- solution-end -->

### CATB4-01-B04 関手でもファイブレーションとは限らない

- Level: B

基底圏を $0\to1$ という一本の非恒等射を持つ圏、全圏を一対象一射の圏とし、唯一の対象を $1$ に送る関手 $p$ を考える。$p$ がファイブレーションでないことを示せ。

<!-- solution-start -->
**詳細解答。** 唯一の恒等射は $1_1$ に写るので関手の恒等射と合成の条件を満たす。全圏の唯一の対象 $y$ に対し、基底射 $u:0\to1=p(y)$ を取る。[ファイブレーションの定義](#def-catb4-01-fibration)は $p(x)=0$ となる始域 $x$ を要求する。しかし全圏には $y$ 以外の対象がなく $p(y)=1$ である。候補の射さえ存在しないので定義を満たさない。
<!-- solution-end -->

### CATB4-01-C01 終域関手の持ち上げを計算する

- Level: C

$A=\{a,b,c\},B=\{0,1\},Y=\{r,s,t\}$ とし、$u(a)=u(b)=0,u(c)=1$、$r_0(r)=0,r_0(s)=r_0(t)=1$ とする。$r_0:Y\to B$ の $u$ に沿うCartesian持ち上げを終域関手で構成せよ。さらに $T=\{m,n\}$、$k(m)=b,k(n)=c$、$g(m)=r,g(n)=t$ について媒介射を求め、任意の $T,k,g$ に対しても一意であることを証明せよ。

<!-- solution-start -->
**詳細解答。** [終域関手と引き戻し](#thm-catb4-01-codomain)により、まず $u$ と $r_0$ の引き戻しを作る。条件 $u(i)=r_0(y)$ を満たす対を列挙すると

$$
X=\{(a,r),(b,r),(c,s),(c,t)\}.
$$

$q:X\to A$ は第一成分、$s_0:X\to Y$ は第二成分を取る。各対について $r_0s_0(i,y)=r_0(y)=u(i)=uq(i,y)$ なので可換である。求める持ち上げは $(s_0,u):q\to r_0$ である。

具体的な $k:T\to A,g:T\to Y$ について $r_0g(m)=0=uk(m),r_0g(n)=1=uk(n)$ である。従って媒介写像を

$$
h(m)=(b,r),\qquad h(n)=(c,t)
$$

と定められる。各元で $qh=k,s_0h=g$ を満たす。これにより全圏では $(h,k):1_T\to q$ が基底 $k$ 上の媒介射になる。

一般に任意の集合 $T$ と写像 $k:T\to A,g:T\to Y$ が $r_0g=uk$ を満たすなら、$h(z)=(k(z),g(z))$ と置く。条件により全ての $z$ で $h(z)\in X$ となる。二射影との合成はそれぞれ $k,g$ である。別の候補 $h'$ は第一成分が $k(z)$、第二成分が $g(z)$ に強制されるので $h'(z)=h(z)$ が全元で成立する。空集合でも空写像は一意である。従って [引き戻しの普遍性](../../CAT/CAT2-03/index.md#def-cat2-03-pullback)を満たし、前記定理からCartesian持ち上げである。

添字ごとに見ると $a,b$ の上にはそれぞれ $r$ に対応する元一つ、$c$ の上には $s,t$ に対応する元二つがある。集合族を移す構成と同じ結果が得られた。
<!-- solution-end -->

## 8. まとめ

ファイブレーションは、基底射に沿って終点側の対象を始点側に移す普遍的な射の存在を保証する。持ち上げは合成でき、同じ基底射と終点に対して一意な垂直同型で比較できる。次講では各持ち上げを選んだ場合に、恒等射や合成とその選択がどう整合するかを調べる。
