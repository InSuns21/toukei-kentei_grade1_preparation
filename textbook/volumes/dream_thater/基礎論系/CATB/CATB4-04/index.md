# CATB4-04 Grothendieck構成

## 1. 各点の圏から全体の圏を作り直す

前講では、持ち上げを選んだファイブレーションから[反変擬関手](../CATB4-03/index.md#def-catb4-03-indexed)を作った。逆に、各地点の観測記録の集合と、地点を変える際の再添字付けだけが与えられたとき、異なる地点の記録同士を比較する射を作れるだろうか。

基底射 $u:a\to b$ に沿って $b$ 上の対象 $y$ を $a$ 上へ移すと、$a$ 上の対象 $x$ から $u^*y$ への射を考えられる。

この射と基底射を組にする。

二段の移動では比較同型を忘れないようにする。

この組の作り方が本講の中心である。

前提講座：[CATB4-03 添字付き圏と擬関手](../CATB4-03/index.md)、[CATB4-02 Cleavageとsplitファイブレーション](../CATB4-02/index.md)、[CATB4-01 Cartesian射とファイブレーション](../CATB4-01/index.md)。

以下、基底圏 $\mathcal B$ は[局所小圏](../../CAT/CAT1-02/index.md#def-cat1-02-size)とし、値の圏は固定したサイズの小圏とする。合成は右から左に書く。

反変擬関手 $F$ の $b$ における値を $\mathcal F_b$ とする。基底射 $u:a\to b$ に沿う再添字付け関手は

$$
u^*:\mathcal F_b\to\mathcal F_a
$$

である。星印は逆射ではなく関手の作用を表す。$v:c\to a$ に対し $uv=u\circ v$ と書く。

[反変擬関手の構造](../CATB4-03/index.md#def-catb4-03-indexed)と同じく比較と単位の向きは

$$
\alpha_{v,u}:v^*u^*\Rightarrow(uv)^*,
\qquad \epsilon_b:(1_b)^*\Rightarrow I_{\mathcal F_b}
$$

とする。$I_{\mathcal F_b}$ は恒等関手であり、$\alpha_{v,u,y}$ と $\epsilon_{b,y}$ の最後の添字 $y$ は自然同型の成分を取る対象である。これらが恒等自然変換であることは仮定しない。

## 2. 射を組で表す

$x\in\mathcal F_a$ と $y\in\mathcal F_b$ を一つの圏の対象として区別するには、所属する基底対象も記録する必要がある。$f:x\to u^*y$ を持つ組 $(u,f)$ は、基底 $u$ を移動しながら $x$ と $y$ を結ぶ射を表す。

<a id="def-catb4-04-grothendieck"></a>

<!-- formal-statement-start -->
> **定義（Grothendieck構成）**
>
> 反変擬関手 $F:\mathcal B^{op}\to\mathbf{Cat}$ に対し、$\int F$ の対象は組 $(a,x)$（$x\in\mathcal F_a$）とする。$(a,x)$ から $(b,y)$ への射は、基底射とファイバー内の射の組

$$
(u,f),\qquad u:a\to b,\quad f:x\to u^*y
$$

> とする。$v:c\to a$ と $g:z\to v^*x$ に対する合成、及び恒等射は

$$
(u,f)(v,g)=(uv,\alpha_{v,u,y}\,v^*f\,g),
$$

$$
1_{(a,x)}=(1_a,\epsilon_{a,x}^{-1})
$$

> とする。
<!-- formal-statement-end -->

二段のファイバー内の射は

$$
z\xrightarrow{g}v^*x\xrightarrow{v^*f}v^*u^*y
\xrightarrow{\alpha_{v,u,y}}(uv)^*y
$$

である。最後の比較を入れて初めて、基底 $uv$ の上の射として型が合う。恒等射でも $x$ と $(1_a)^*x$ が等しいとは限らないので、単位の逆射を使う。

<!-- definition-example-start: def-catb4-04-grothendieck -->
**定義の確認**。前講の[有限集合族の反変擬関手](../CATB4-03/index.md#def-catb4-03-indexed)を用いる。基底は固定した無限集合の有限部分集合と写像の圏、値は各添字上の有限集合族の圏とし、比較はすべて恒等射である。$c=\{0\},a=\{1,2\},b=\{3\}$ とし、$v(0)=2$、$u(1)=u(2)=3$ とする。族を

$$
Z_0=\{4\},\quad X_1=\{5\},\quad X_2=\{6\},\quad
Y_3=\{7,8\}
$$

と置く。$g_0(4)=6$、$f_1(5)=7$、$f_2(6)=8$ とすると、$(v^*X)_0=X_{v(0)}=X_2$、$(u^*Y)_i=Y_{u(i)}=Y_3$（$i=1,2$）なので、$g$ と $f$ はそれぞれ $Z\to v^*X$ と $X\to u^*Y$ の型を満たす。射の再添字付けも $(v^*f)_0=f_{v(0)}$ である。合成は基底で $uv(0)=3$、成分で

$$
(v^*f)_0(g_0(4))=f_2(6)=8
$$

となる。

恒等射は添字の恒等写像と成分の恒等写像の組であり、前後に合成しても値8を変えない。

任意の三射でも、成分の合成は添字の合成に従う。

例えば第三の基底射 $w:d\to c$ と成分写像 $h_i$ を加えれば、両括り方の $i$ 成分は $f_{v(w(i))}g_{w(i)}h_i$ となり、写像の結合律で一致する。

したがってこの例では組・合成・恒等射が圏の条件を満たす。
<!-- definition-example-end -->

一般の比較同型がある場合も圏になることを次に確かめる。

<a id="thm-catb4-04-category"></a>

<!-- formal-statement-start -->
> **定理（Grothendieck構成の圏構造）**
>
> 局所小圏 $\mathcal B$ 上の小圏値反変擬関手 $F$ に対し、上の組と演算は局所小圏 $\int F$ をなす。第一成分を取る射影 $p_F:\int F\to\mathcal B$ は関手である。
<!-- formal-statement-end -->

見取り図：結合律では比較の自然性を使って第三の射を同じ場所に移し、残った二つの比較の積に三重合成条件を適用する。単位律は単位条件が比較同型を打ち消すことで成立する。

<!-- proof-start -->
### 証明

対象 $(a,x),(b,y)$ を固定すると、その間の射は

$$
\coprod_{u\in\mathcal B(a,b)}\mathcal F_a(x,u^*y)
$$

の元である。ここで $\coprod$ は基底射 $u$ を区別して取る非交和である。基底が局所小で各値が小圏なので、この非交和は集合となる。合成の型は上の三段の射で確認済みである。

第三の射を $(w,h):(d,t)\to(c,z)$ とする。$h:t\to w^*z$ である。左側を先に合成したときの第二成分は、$w^*$ の関手性から

$$
\begin{aligned}
L
&=\alpha_{w,uv,y}\,w^*(\alpha_{v,u,y}v^*f g)h\\
&=\alpha_{w,uv,y}\,w^*\alpha_{v,u,y}\,
w^*v^*f\,w^*g\,h.
\end{aligned}
$$

右側を先に合成したときは

$$
R=\alpha_{vw,u,y}(vw)^*f\,
\alpha_{w,v,x}\,w^*g\,h.
$$

$f:x\to u^*y$ に対する $\alpha_{w,v}$ の自然性は

$$
(vw)^*f\,\alpha_{w,v,x}
=\alpha_{w,v,u^*y}\,w^*v^*f.
$$

これを $R$ に代入する。[反変擬関手の三重合成条件](../CATB4-03/index.md#def-catb4-03-indexed)により

$$
\alpha_{vw,u,y}\alpha_{w,v,u^*y}
=\alpha_{w,uv,y}\,w^*\alpha_{v,u,y}.
$$

従って $R=L$。基底成分も $(uv)w=u(vw)$ なので結合律が成立する。

右単位との合成の第二成分は、単位条件と $\epsilon_a$ の自然性により

$$
\begin{aligned}
\alpha_{1_a,u,y}(1_a)^*f\,\epsilon_{a,x}^{-1}
&=\epsilon_{a,u^*y}(1_a)^*f\,\epsilon_{a,x}^{-1}\\
&=f\epsilon_{a,x}\epsilon_{a,x}^{-1}=f.
\end{aligned}
$$

左単位との合成では

$$
\alpha_{u,1_b,y}\,u^*(\epsilon_{b,y}^{-1})f
=u^*(\epsilon_{b,y}\epsilon_{b,y}^{-1})f=f.
$$

基底成分では通常の単位律が成立する。よって圏の公理がすべて成立する。射影は恒等射を $1_a$ に写し、合成を $uv$ に写すので関手である。
<!-- proof-end -->

## 3. 射影はファイブレーションになる

基底射 $u:a\to b$ に沿う自然な持ち上げの候補は、ファイバー側の射として何も変えない恒等射を選んだ

$$
\chi_{u,y}=(u,1_{u^*y}):(a,u^*y)\to(b,y)
$$

である。ここで恒等射が第二成分に入っていることと、全圏の恒等射であることを区別しよう。[Cartesian射](../CATB4-01/index.md#def-catb4-01-cartesian)の判定では、基底の媒介射を固定した因子分解の存在と一意性を調べる。全ての基底射と終点についてその持ち上げが存在すれば[ファイブレーション](../CATB4-01/index.md#def-catb4-01-fibration)であり、それらを指定するデータが[cleavage](../CATB4-02/index.md#def-catb4-02-cleavage)である。

<a id="thm-catb4-04-fibration"></a>

<!-- formal-statement-start -->
> **定理（Grothendieck構成のファイブレーション）**
>
> 小圏値反変擬関手 $F$ に対する射影 $p_F$ はファイブレーションである。射 $(u,f)$ がCartesian射であることと、$f$ がファイバー内の同型射であることは同値である。上の $\chi_{u,y}$ を選ぶと cleavage が得られる。
<!-- formal-statement-end -->

見取り図：因子分解の基底成分を $v$ と固定すると、第二成分について解くべき式は比較同型を含む一次の合成式になる。比較同型の逆を使えば、選んだ持ち上げを通る因子分解が一意に求まる。

<!-- proof-start -->
### 証明

[Cartesian射の定義](../CATB4-01/index.md#def-catb4-01-cartesian)の入力を $v:c\to a$ と $(uv,k):(c,z)\to(b,y)$ とする。$\chi_{u,y}$ を通る射の候補 $(v,l)$ は

$$
l:z\to v^*u^*y,\qquad
\alpha_{v,u,y}l=k
$$

を満たす必要がある。$\alpha_{v,u,y}$ は同型なので、唯一の解は $l=\alpha_{v,u,y}^{-1}k$ である。任意の $u,y$ でこの構成ができるから、[ファイブレーション](../CATB4-01/index.md#def-catb4-01-fibration)と [cleavage](../CATB4-02/index.md#def-catb4-02-cleavage) が得られる。

一般の $(u,f)$ で $f$ が同型なら、同じ因子分解の式は

$$
\alpha_{v,u,y}v^*f\,l=k
$$

となる。ここで $l:z\to v^*x$ である。$v^*(f^{-1})v^*f=v^*(1_x)=1_{v^*x}$ であり、逆順でも恒等射となるから、$v^*f$ は同型である。比較同型と合わせて逆を取ると、唯一の解は

$$
l=(v^*f)^{-1}\alpha_{v,u,y}^{-1}k
$$

である。

逆に $(u,f)$ がCartesianなら、同じ終点と基底射を持つ $\chi_{u,y}$ との[Cartesian持ち上げの同型一意性](../CATB4-01/index.md#thm-catb4-01-unique-lift)を適用する。すると垂直同型

$$
i:(a,x)\to(a,u^*y),\qquad \chi_{u,y}i=(u,f)
$$

が得られる。

[ファイバー圏](../CATB4-01/index.md#def-catb4-01-fiber)の垂直射 $(1_a,l):(a,x)\to(a,x')$ では $l:x\to(1_a)^*x'$ である。この射と対象を

$$
J_a(1_a,l)=\epsilon_{a,x'}l,\qquad J_a(a,x)=x
$$

と写す。恒等射の像は $\epsilon_{a,x}\epsilon_{a,x}^{-1}=1_x$ となる。垂直射 $(1_a,m):(a,x')\to(a,x'')$ との合成も

$$
\begin{aligned}
\epsilon_{a,x''}\alpha_{1_a,1_a,x''}(1_a)^*m\,l
&=\epsilon_{a,x''}(1_a)^*\epsilon_{a,x''}(1_a)^*m\,l\\
&=\epsilon_{a,x''}(1_a)^*(\epsilon_{a,x''}m)\,l\\
&=(\epsilon_{a,x''}m)\epsilon_{a,x'}l
\end{aligned}
$$

と写る。

最終行は $\epsilon_a$ の自然性である。

逆対応は $q\mapsto(1_a,\epsilon_{a,x'}^{-1}q)$ なので、これはファイバー圏から $\mathcal F_a$ への圏同型である。

特に $i$ の像は同型である。

$\chi_{u,y}i$ の第二成分は $\alpha_{1_a,u,y}l=\epsilon_{a,u^*y}l$ であるから、その像は $f$ に等しい。

従って $f$ は同型である。
<!-- proof-end -->

例えば集合族で $f=(f_i)_{i\in a}$ が同型であるとは、逆の成分写像族 $r$ があり、全ての $i\in a$ で

$$
r_i f_i=1_{X_i},\qquad f_i r_i=1_{Y_{u(i)}}
$$

となることである。従って各 $f_i$ が全単射であることと同値である。このとき任意の $v:c\to a$ と $k$ に対し、媒介射は成分ごとに

$$
l_j=f_{v(j)}^{-1}k_j\qquad(j\in c)
$$

と一意に決まる。一成分でも全単射でなければ $f$ は同型でないので、上の[同型判定](#thm-catb4-04-fibration)によりCartesianではない。空の添字の場合も条件は空虚に成立する。

## 4. 元の圏を復元する

今度はファイブレーション $p:\mathcal E\to\mathcal B$ に cleavage $\chi$ が与えられているとする。

[ファイブレーションからの添字付き圏](../CATB4-03/index.md#thm-catb4-03-fibration)で得る擬関手を $F_p$ と書く。基底上の関手とは射影を保つ関手であり、例えば $K:\int F_p\to\mathcal E$ なら $pK=p_{F_p}$ を満たすことをいう。

<a id="thm-catb4-04-reconstruction"></a>

<!-- formal-statement-start -->
> **定理（全圏と添字付き圏の復元）**
>
> 小さいファイバーを持ち cleavage を備えたファイブレーション $p$ について、関手 $K:\int F_p\to\mathcal E$ を

$$
K(a,x)=x,\qquad K(u,f)=\chi_{u,y}f
$$

> と定めると、基底上の圏同型となり、選んだ持ち上げを保つ。
>
> 逆に、小圏値反変擬関手 $F$ から上の選択を備えた $p_F$ を作って再添字付けを取り出すと、各ファイバーと元の値の圏との同型の下で、元の関手、比較同型、単位同型が復元される。
<!-- formal-statement-end -->

見取り図：全圏の任意の射を基底射に沿う持ち上げと垂直射に一意分解する。その分解の逆操作が $K$ である。逆向きでは垂直射の第二成分に単位同型を合成して、元のファイバー内の射に戻す。

<!-- proof-start -->
### 証明

$p(x)=a$ なので対象の逆は $x\mapsto(p(x),x)$ である。

任意の射 $s:x\to y$ について $u=p(s)$ と置く。

[Cartesian射の定義](../CATB4-01/index.md#def-catb4-01-cartesian)を $\chi_{u,y}$ に対して媒介基底 $1_a$ で適用すると、一意な垂直射 $f:x\to u^*y$ が得られ、$s=\chi_{u,y}f$ となる。

よって $K$ は各射集合で全単射である。

[再添字付け関手](../CATB4-02/index.md#thm-catb4-02-reindex)の式と[比較同型の式](../CATB4-02/index.md#thm-catb4-02-comparison)を用いると

$$
\begin{aligned}
K(u,f)K(v,g)
&=\chi_{u,y}f\chi_{v,x}g\\
&=\chi_{u,y}\chi_{v,u^*y}v^*f\,g\\
&=\chi_{uv,y}\alpha_{v,u,y}v^*f\,g\\
&=K((u,f)(v,g)).
\end{aligned}
$$

恒等射については $\chi_{1_a,x}=\epsilon_{a,x}$ だから $K(1_a,\epsilon_{a,x}^{-1})=1_x$。基底は $p(\chi_{u,y}f)=u1_a=u$。さらに $K(u,1_{u^*y})=\chi_{u,y}$ である。対象・射の全単射と合成・恒等射の保存から逆写像も関手となる。

逆向きでは、[前節のファイバーの圏同型](#thm-catb4-04-fibration) $J_a$ を用い、垂直射の像を $q=\epsilon_{a,x'}l$ と表す。

対象の再添字付けは選んだ持ち上げの始域から $u^*y$ そのものである。$q:y\to y'$ に対応する垂直射と $\chi_{u,y}$ の合成の第二成分は

$$
\alpha_{u,1_b,y'}u^*(\epsilon_{b,y'}^{-1}q)
=u^*q.
$$

一方、$\chi_{u,y'}$ の前に未知の垂直射 $(1_a,l):(a,u^*y)\to(a,u^*y')$ を合成すると、第二成分は

$$
\alpha_{1_a,u,y'}l=\epsilon_{a,u^*y'}l=J_a(1_a,l)
$$

である。[再添字付け関手](../CATB4-02/index.md#thm-catb4-02-reindex)の定義式はこの二つの合成を等しくするので、$J_a(1_a,l)=u^*q$ と一意に決まる。

次に二つの持ち上げの合成は

$$
(u,1_{u^*y})(v,1_{v^*u^*y})=(uv,\alpha_{v,u,y})
$$

である。[比較同型の定義式](../CATB4-02/index.md#thm-catb4-02-comparison)では、これを直接の持ち上げと垂直比較 $(1_c,l)$ との合成に等しくする。その第二成分は

$$
\alpha_{1_c,uv,y}l=\epsilon_{c,(uv)^*y}l=J_c(1_c,l)
$$

である。よって比較も $J_c$ の下で $\alpha_{v,u,y}$ に戻る。

最後に恒等基底射の持ち上げ $(1_b,1_{(1_b)^*y})$ の像は $\epsilon_{b,y}$ であり、単位も戻る。

以上で構造全体が復元された。
<!-- proof-end -->

これは単に対象集合が一致するという主張ではない。

選択、射の合成、非恒等の比較も復元される。

例えば前講の剰余加法の例では、基底は一対象で射が $\mathbb Z/2\mathbb Z$、値の射は $\mathbb Z/4\mathbb Z$ の部分群 $\{0,2\}$、比較は $\alpha_{1,1}=2$ で他は0であった。ここで射の合成は加法、恒等射は0であり、基底射の1は非恒等射である。

構成した全圏では $(1,0)^2=(0,2)$ となる。$(0,2)$ は恒等射 $(0,0)$ ではなく、その二乗は $(0,0)$ である。従って $(1,0)$ は位数4の射になる。

比較を捨ててすべて0にするとこの二乗は恒等射になり、全圏の合成が変わる。

## 5. 圏の間の対応も復元する

二つの添字付き圏 $F,G$ の間で、各点の関手 $T_a:\mathcal F_a\to\mathcal G_a$ だけを与えても、基底射を移す操作との相性が分からない。

そこで、先に移してから $T$ を適用する操作と、先に $T$ を適用してから移す操作を自然同型 $\theta_{u,y}$ で比較する。

以下では $F,G$ の再添字付けをそれぞれ $u_F^*,u_G^*$、比較・単位も上付きの $F,G$ によって区別する。

$\theta_u$ は[自然同型](../../CAT/CAT1-07/index.md#def-cat1-07-natural-isomorphism)であり、$\theta_{u,y}$ はその $y\in\mathcal F_b$ における成分である。二段の再添字付けと恒等基底射についても、比較を通る経路が一致することを要求する。

<a id="def-catb4-04-pseudonatural"></a>

<!-- formal-statement-start -->
> **定義（擬自然変換）**
>
> 同じ基底上の反変擬関手 $F,G$ の間の擬自然変換は、各 $a$ の関手 $T_a:\mathcal F_a\to\mathcal G_a$ と各 $u:a\to b$ の自然同型

$$
\theta_u:T_a u_F^*\Rightarrow u_G^*T_b
$$

> であって、任意の $v:c\to a$ と $y\in\mathcal F_b$ について

$$
\theta_{uv,y}T_c(\alpha^F_{v,u,y})
=\alpha^G_{v,u,T_by}v_G^*(\theta_{u,y})
\theta_{v,u_F^*y},
$$

> 及び任意の $x\in\mathcal F_a$ について

$$
\epsilon^G_{a,T_ax}\theta_{1_a,x}
=T_a(\epsilon^F_{a,x})
$$

> を満たすものである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb4-04-pseudonatural -->
**定義の確認**。有限集合族の添字付き圏を $F=G$ とする。成分集合には遺伝的有限集合（元もその元も有限集合で、有限段で空集合に達するもの）を用いる。これにより順序対による直積を含む小さいモデルを取れる。

各点で各成分集合 $X_i$ に固定した遺伝的有限集合 $S$ との直積を取る関手 $T_a$ を考える。

成分写像 $h_i$ に対する作用は

$$
(x,s)\mapsto(h_i(x),s)
$$

である。$1_{X_i}\times1_S$ は恒等写像であり、合成可能な $h_i,k_i$ に対して

$$
(k_i\times1_S)(h_i\times1_S)(x,s)
=(k_i(h_i(x)),s)
$$

は $(k_i h_i)\times1_S$ の作用に等しいので関手である。再添字付けの前後で得る集合はともに $X_{u(i)}\times S$、射の成分はともに $h_{u(i)}\times1_S$ である。

従って $\theta_u$ は恒等自然変換にできる。自然性は恒等射との合成律、二つの整合条件はすべての比較・単位・$\theta$ が恒等射であることから成立する。
<!-- definition-example-end -->

変換同士を比較するため、ここからは $S$ を固定集合ではなく二つ目の擬自然変換の名前として使う。$T,S:F\to G$ の間に[自然変換](../../CAT/CAT1-07/index.md#def-cat1-07-natural-transformation)の族 $m_a:T_a\Rightarrow S_a$ を置く。

$m_{a,x}$ は $x\in\mathcal F_a$ における成分である。移動とこの族を適用する順序が一致するものを次のように扱う。

<a id="def-catb4-04-modification"></a>

<!-- formal-statement-start -->
> **定義（修正）**
>
> 擬自然変換 $(T,\theta),(S,\sigma):F\to G$ の間の修正（modification）は、各 $a$ の自然変換 $m_a:T_a\Rightarrow S_a$ であり、任意の $u:a\to b$ と $y\in\mathcal F_b$ について

$$
u_G^*(m_{b,y})\theta_{u,y}
=\sigma_{u,y}m_{a,u_F^*y}
$$

> を満たすものとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb4-04-modification -->
**定義の確認**。

直前の直積の例で、$S_0=\{0\}$ と $S_1=\{0,1\}$ を固定集合とした二つの変換を取る。

成分写像 $(x,0)\mapsto(x,0)$ によって自然変換の族を作る。

任意の成分写像 $h_i$ に対して前後どちらから合成しても $(x,0)\mapsto(h_i(x),0)$ となり自然である。

再添字付けしても同じ成分写像を取るだけなので、上の条件の両辺は $(x,0)\mapsto(x,0)$ となる。

これで修正の条件が確認できる。
<!-- definition-example-end -->

全圏の側では、基底を変えずCartesian射をCartesian射へ写す関手を考える。二つのそのような関手を比較する自然変換は、その成分がすべて垂直射であるものに限る。[厳密2-圏](../CATB2-08/index.md#def-catb2-08-strict-two-category)では、各対象対の1射と2射が一つの圏をなし、1射の合成と2射の横合成をまとめて合成関手として扱う。ここで目指す双同値は、その各圏の同値と、対象が同値を除いて尽くされることを合わせた対応である。

<a id="thm-catb4-04-equivalence"></a>

<!-- formal-statement-start -->
> **定理（Grothendieck構成の2圏的対応）**
>
> 固定した局所小基底圏上の小圏値反変擬関手を対象、擬自然変換を1射、修正を2射とする2圏と、小さいファイバーと cleavage を持つファイブレーションを対象、基底上のCartesian射保存関手を1射、垂直成分を持つ自然変換を2射とする2圏は、Grothendieck構成によって双同値になる。
>
> ここで双同値とは、各対象対の1射と2射の圏の間で同値を誘導し、任意の後者の対象が前者のある対象の像と同値になることである。
<!-- formal-statement-end -->

見取り図：擬自然変換は射の第二成分に $\theta$ を合成する関手を与える。逆にCartesian射を保つ関手からは、選んだ持ち上げの像の第二成分を読むことで $\theta$ を取り出せる。2射は垂直成分をファイバーの射に戻せばよい。

<!-- proof-start -->
### 証明

[擬自然変換](#def-catb4-04-pseudonatural)から全圏の関手 $H_T$ を

$$
H_T(a,x)=(a,T_ax),\qquad
H_T(u,f)=(u,\theta_{u,y}T_af)
$$

と定める。第二成分は $T_ax$ から $u_G^*T_by$ への射である。二射の合成を先に取った場合の第二成分は

$$
\theta_{uv,y}T_c(\alpha^F_{v,u,y})T_c(v_F^*f)T_cg.
$$

整合条件を先頭に適用し、次に $\theta_v$ の $f$ に関する自然性を用いると

$$
\begin{aligned}
&\alpha^G_{v,u,T_by}v_G^*(\theta_{u,y})
\theta_{v,u_F^*y}T_c(v_F^*f)T_cg\\
&=\alpha^G_{v,u,T_by}v_G^*(\theta_{u,y})
v_G^*(T_af)\theta_{v,x}T_cg\\
&=\alpha^G_{v,u,T_by}v_G^*(\theta_{u,y}T_af)
\theta_{v,x}T_cg.
\end{aligned}
$$

これは像を先に取った合成の第二成分である。単位条件より

$$
\theta_{1_a,x}T_a(\epsilon^F_{a,x})^{-1}
=(\epsilon^G_{a,T_ax})^{-1}
$$

なので恒等射も保つ。基底は変えない。さらに[Cartesian射の同型判定](#thm-catb4-04-fibration)で $f$ が同型なら $T_af$ と $\theta_{u,y}$ が同型であるため、その合成も同型となり、Cartesian射を保つ。

逆に基底上のCartesian射保存関手 $H:\int F\to\int G$ があれば、そのファイバーへの制限 $H_a$ を[第3節の圏同型](#thm-catb4-04-fibration)で移して

$$
T_a=J_a^G H_a(J_a^F)^{-1}
$$

とする。$J_a^F,J_a^G$ はそれぞれの全圏に対する $J_a$ である。

$\chi_{u,y}$ の像の第二成分を $\theta_{u,y}$ と置くと、同じ同型判定によってこれは同型射である。

$q:y\to y'$ に対し、垂直射 $j_b^F(q)=(J_b^F)^{-1}(q)$ を用いる（以下 $j_a^G$ も同様）。[再添字付けの定義式](../CATB4-02/index.md#thm-catb4-02-reindex)は

$$
\chi^F_{u,y'}j_a^F(u_F^*q)=j_b^F(q)\chi^F_{u,y}
$$

である。$H(j_a^F(r))=j_a^G(T_ar)$ と $H(\chi^F_{u,y})=(u,\theta_{u,y})$ を使って両辺の像を合成する。左辺の第二成分は単位条件 $\alpha^G_{1_a,u}=\epsilon^G_a u_G^*$ と単位の自然性により $\theta_{u,y'}T_a(u_F^*q)$、右辺の第二成分は $\alpha^G_{u,1_b}=u_G^*\epsilon^G_b$ により $u_G^*(T_bq)\theta_{u,y}$ となる。従って

$$
\theta_{u,y'}T_a(u_F^*q)=u_G^*(T_bq)\theta_{u,y}
$$

を得る。ここで $q:y\to y'$ は任意のファイバー射である。よって $\theta_u$ は自然同型である。

[比較同型の定義式](../CATB4-02/index.md#thm-catb4-02-comparison)

$$
\chi^F_{u,y}\chi^F_{v,u_F^*y}
=\chi^F_{uv,y}j_c^F(\alpha^F_{v,u,y})
$$

に $H$ を適用し、組の合成と垂直射の表示を代入すると、第二成分はそれぞれ

$$
\alpha^G_{v,u,T_by}v_G^*(\theta_{u,y})
\theta_{v,u_F^*y},
\qquad
\theta_{uv,y}T_c(\alpha^F_{v,u,y})
$$

となり、等しい。恒等基底射の持ち上げのファイバー像は単位同型である。$J_a^F(\chi^F_{1_a,x})=\epsilon^F_{a,x}$ に $T_a$ を適用した結果は $J_a^G(H(\chi^F_{1_a,x}))$ なので、

$$
T_a(\epsilon^F_{a,x})=\epsilon^G_{a,T_ax}\theta_{1_a,x}
$$

も成立する。

任意の $(u,f)$ は $\chi_{u,y}$ と、ファイバー像が $f$ である垂直射との合成である。この分解に $H$ を適用した第二成分は $\theta_{u,y}T_af$ になる。従って二つの構成は互いに逆である。

次に[修正](#def-catb4-04-modification)から自然変換 $H_T\Rightarrow H_S$ を作る。$(a,x)$ での成分を

$$
(1_a,(\epsilon^G_{a,S_ax})^{-1}m_{a,x})
$$

と置く。これは垂直射で、ファイバー像は $m_{a,x}$ である。任意の $(u,f)$ に対する自然性の二経路の第二成分は

$$
\sigma_{u,y}S_af\,m_{a,x},
\qquad
u_G^*(m_{b,y})\theta_{u,y}T_af.
$$

第一式で $m_a$ の自然性を用いると $\sigma_{u,y}m_{a,u_F^*y}T_af$ となる。

修正の条件により第二式と等しい。

逆に垂直成分を持つ自然変換をファイバーに制限して $m_a$ を得る。

持ち上げ $\chi_{u,y}$ に対する自然性を取れば、上の式で $f=1$ の場合となり、修正の条件そのものが出る。

従って2射も双方向に復元される。

2射の恒等・垂直合成はファイバーの圏同型により保たれる。

1射の合成も確認する。$T:F\to G$ の次に $U:G\to L$ を適用し、$U$ の比較を $\eta$ とする。合成の点ごとの関手は $U_aT_a$、比較は

$$
\eta_{u,T_by}\,U_a(\theta_{u,y}).
$$

全圏の関手を続けて適用した第二成分は

$$
\eta_{u,T_by}\,U_a(\theta_{u,y})\,U_aT_a(f)
$$

となり、合成変換の像と一致する。恒等変換の比較は恒等射なので恒等関手に写る。横合成の2射についても、$m:T\Rightarrow S$ と $n:U\Rightarrow V$ に対する点ごとの成分は $n_{a,S_ax}U_a(m_{a,x})$ である。全圏の横合成は垂直射の合成であり、ファイバー像がこの同じ式になる。これで2圏の演算との整合が確認できた（演算の結合律・交換律は関手と自然変換のそれから従う）。

以上で構成した2圏関手は、各対象対で1射・2射の圏の同型を誘導する。さらに任意の cleavage 付きファイブレーション $p$ は[全圏の復元](#thm-catb4-04-reconstruction)によって $\int F_p$ と基底上で同型である。同型関手は選択を保ち、逆関手もCartesian射を保つ。従って対象についても要求が成立し、双同値を得る。
<!-- proof-end -->

擬自然変換の比較 $\theta$ について、同型という条件を外しても整合条件があれば $H_T$ は関手になる。しかし選んだ持ち上げの像の第二成分は $\theta_{u,y}$ そのものだから、これが同型でなければ[同型判定](#thm-catb4-04-fibration)によりその像はCartesianではない。次講では基底方向を反転した共変の構成を扱う。

## 6. 演習

### CATB4-04-A01 組の合成

- Level: A

基底を $0\to1\to2$ の順序圏、値をすべて遺伝的有限集合の圏（文字は相異なる遺伝的有限集合を表すラベル）、再添字付けを恒等関手、比較を恒等とする。$v:0\to1,u:1\to2$ とし、$g:\{a\}\to\{b,c\}$ は $g(a)=c$、$f:\{b,c\}\to\{d,e\}$ は $f(b)=d,f(c)=e$ とする。二射の合成を求めよ。

<!-- solution-start -->
**詳細解答。** [Grothendieck構成](#def-catb4-04-grothendieck)の合成式で $v^*f=f$、$\alpha_{v,u}=1$ だから第二成分は $fg$。

始域は $\{a\}$、終域は $\{d,e\}$ であり、$(fg)(a)=f(c)=e$。

基底成分は唯一の射 $uv:0\to2$ である。
<!-- solution-end -->

### CATB4-04-A02 非正規化された恒等射

- Level: A

基底は一対象・恒等射のみ、値は一対象で射が $\mathbb Z/3\mathbb Z$ の圏とする。再添字付けは恒等関手、比較と単位はともに1（加法表示）とする。全圏の恒等射と、第二成分が1と2の射の合成を求めよ。

<!-- solution-start -->
**詳細解答。** 比較・単位は逆元2を持ち、自然性は加法の可換性、三重条件の両辺は $1+1=2\pmod3$、単位条件の両辺は1で成立する（恒等基底射に沿う関手は恒等関手である）。

[Grothendieck構成](#def-catb4-04-grothendieck)の恒等射の第二成分は $-1=2$。

第二成分 $f=1,g=2$ の合成は $1+1+2=4\equiv1$。

実際任意の $f$ に対して $1+f+2\equiv f$ なので2は両側単位である。
<!-- solution-end -->

### CATB4-04-A03 因子分解を計算する

- Level: A

A01の設定で $k:\{a\}\to\{d,e\}$ を $k(a)=d$ とする。基底 $uv$ の上の射 $(uv,k)$ を、$u$ に沿う選んだ持ち上げを通して因子分解せよ。

<!-- solution-start -->
**詳細解答。** [Grothendieck構成のファイブレーション](#thm-catb4-04-fibration)の証明の式 $\alpha_{v,u,y}l=k$ を用いる。

比較は恒等写像だから $l=k$ であり、$l(a)=d$。

媒介射は $(v,l):(0,\{a\})\to(1,\{d,e\})$ である。

持ち上げの第二成分は恒等写像なので合成の第二成分は $1l=k$。

他の $l'$ があれば $1l'=k$ から $l'=l$ である。
<!-- solution-end -->

### CATB4-04-A04 Cartesianかどうか

- Level: A

A01の設定で、基底 $u$ の上にある第二成分 $f:\{b,c\}\to\{d,e\}$ を $f(b)=f(c)=d$ に変える。この射がCartesianでないことを因子分解によって直接示せ。

<!-- solution-start -->
**詳細解答。** $z=\{a\}$ と基底射 $v$ を取り、$k(a)=e$ とする。

[Cartesian射](../CATB4-01/index.md#def-catb4-01-cartesian)なら、次の条件を満たす媒介射が必要である。

$$
l:\{a\}\to\{b,c\},\qquad fl=k.
$$

しかし $l(a)$ が $b,c$ のどちらでも

$$
fl(a)=d\ne e=k(a)
$$

となる。存在条件が壊れる。[同型判定](#thm-catb4-04-fibration)でも $f$ は全射でないので同じ結論になる。
<!-- solution-end -->

### CATB4-04-B01 比較の整合条件を外すと何が壊れるか

- Level: B

基底 $0\to1\to2\to3$ の順序圏、値を一対象で射が $\mathbb Z/2\mathbb Z$ の圏、すべての関手を恒等とする。$u:2\to3,v:1\to2,w:0\to1$ とし、単位比較は0、二段比較は $(v,u)$ だけ1で他は0とする。三射の第二成分をすべて0にしたとき、二通りの合成を求めよ。

<!-- solution-start -->
**詳細解答。** [Grothendieck構成](#def-catb4-04-grothendieck)の組の演算を試す。

$(u,0)(v,0)=(uv,1)$ であり、さらに $(w,0)$ を右から合成すると $(uvw,0+1+0)=(uvw,1)$ となる。

逆の括りでは $(v,0)(w,0)=(vw,0)$、さらに左から $(u,0)$ を合成すると $(uvw,0)$ である。

比較は自然同型で単位条件も成り立つが、[反変擬関手の三重合成条件](../CATB4-03/index.md#def-catb4-03-indexed)は $0+1\ne0+0$ で失敗する。

したがって結合律の根拠が失われ、圏を作れない。
<!-- solution-end -->

### CATB4-04-B02 復元した全圏の計算

- Level: B

基底を一対象で射が $\mathbb Z/2\mathbb Z$ の圏、値を一対象で射が $0,2$（4を法とする加法）の圏とする。

再添字付けは恒等、単位は0、比較は $\alpha_{1,1}=2$ で他は0とする。

全圏の射の積を求め、$(u,f)\mapsto u+f\pmod4$ が一対象圏の同型を与えることを示せ。

<!-- solution-start -->
**詳細解答。** $u,v$ は0または1の整数代表とする。

比較は $u+v-(u+v\bmod2)$ である。

$r(n)=n\bmod2\in\{0,1\}$ と書く。三重比較の左辺は

$$
\begin{aligned}
&u+v-r(u+v)+r(u+v)+w-r(r(u+v)+w)\\
&=u+v+w-r(u+v+w),
\end{aligned}
$$

右辺は

$$
\begin{aligned}
&v+w-r(v+w)+u+r(v+w)-r(u+r(v+w))\\
&=u+v+w-r(u+v+w).
\end{aligned}
$$

ここでは整数の偶奇が $r(n)$ で保存されることを使った。従って4を法としても一致する。単位条件は $u$ または $v$ が0なら比較が0であることから成立する。

自然性は加法の可換性である。

従って[Grothendieck構成](#def-catb4-04-grothendieck)で積は

$$
(u,f)(v,g)=(u+v\bmod2,\ f+g+2uv\bmod4).
$$

写像 $K(u,f)=u+f\bmod4$ は四つの組 $(0,0),(1,0),(0,2),(1,2)$ を順に $0,1,2,3$ に写すので全単射。$u+v\bmod2=u+v-2uv$ だから

$$
K((u,f)(v,g))=u+v-2uv+f+g+2uv
=K(u,f)+K(v,g)\pmod4.
$$

恒等射 $(0,0)$ は0に写る。よって一対象圏の同型となる。比較を捨てると $(1,0)^2=(0,0)$ となるため、元の加法の復元は失敗する。
<!-- solution-end -->

### CATB4-04-B03 変換と持ち上げの像

- Level: B

A01の添字付き圏から自分自身への変換を、各ファイバーで固定集合 $S=\{0,1\}$ との直積を取る関手と、恒等比較で定める。A01の $(u,f)$ の像を求め、選んだ持ち上げの像がCartesianであることを確認せよ。

<!-- solution-start -->
**詳細解答。** 各ファイバーで $h$ を $h\times1_S$ に写すと、恒等射と合成を成分ごとに保つ。再添字付けは恒等関手だから比較を恒等とする[擬自然変換](#def-catb4-04-pseudonatural)の条件も満たす。[2圏的対応](#thm-catb4-04-equivalence)による像は $(u,f\times1_S)$。その第二成分は

$$
(b,0)\mapsto(d,0),\quad(b,1)\mapsto(d,1),
$$

$$
(c,0)\mapsto(e,0),\quad(c,1)\mapsto(e,1).
$$

選んだ持ち上げは $(u,1_y)$ だから、像は $(u,1_y\times1_S)=(u,1_{y\times S})$ となる。第二成分は恒等写像で逆を持つので[同型判定](#thm-catb4-04-fibration)によりCartesianである。
<!-- solution-end -->

### CATB4-04-C01 非恒等比較を保つ変換と修正

- Level: C

B02の添字付き圏を $F$ とする。各ファイバー関手を恒等、比較を $\theta_0=0,\theta_1=2$ とする自分自身への変換を考える。擬自然変換であること、全圏で誘導される関手が $\mathbb Z/4\mathbb Z$ のどの写像になるかを求めよ。さらに恒等変換からこの変換への修正が存在するか判定せよ。

<!-- solution-start -->
**詳細解答。** 比較 $\theta_u$ は射 $0,2$ のいずれかで、ともに逆を持つ。値の圏の射の加法は可換なので自然性も成立する。[擬自然変換](#def-catb4-04-pseudonatural)の合成条件を加法表示すると

$$
\theta_{u+v\bmod2}+\alpha_{v,u}
=\alpha_{v,u}+\theta_u+\theta_v\pmod4.
$$

$u=v=0$ なら $0=0$、一方だけ1なら $2=2$、両方1なら左辺 $0+2=2$、右辺 $2+2+2=6\equiv2$ である。単位条件は $\theta_0=0$ なので成立する。

[2圏的対応](#thm-catb4-04-equivalence)の全圏の関手は $(u,f)\mapsto(u,f+2u)$。

B02の同型を通すと $k=u+f$ は $k+2u=3u+f$ に写る。

$f$ は偶数なので $3f\equiv f$。

従って $3u+f\equiv3k\equiv-k$ である。

実際 $0,1,2,3$ は順に $0,3,2,1$ へ移り、$-(k+l)=(-k)+(-l)$ だから合成も保つ。

最後に修正の唯一の点での成分を $m\in\{0,2\}$ とする。恒等変換の比較は0なので、[修正の条件](#def-catb4-04-modification)を $u=1$ で書くと

$$
m+0=2+m\pmod4.
$$

両辺から $m$ を引けば $0=2$ となり矛盾する。従って修正は存在しない。点ごとの関手が同じでも、比較同型の違いが全圏の関手と2射の存在に反映される。
<!-- solution-end -->

## 7. 次講への接続

反変擬関手では、基底射の終点にある対象を始点へ移し、Cartesian射が得られた。次講では始点の対象を終点へ移す場合を考え、共変の添字付き圏と余ファイブレーションの構成を学ぶ。
