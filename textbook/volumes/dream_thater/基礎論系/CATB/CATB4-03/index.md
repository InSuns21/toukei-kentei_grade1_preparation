# CATB4-03 添字付き圏と擬関手

## 1. 基底の各点に圏を配置する

前講の[再添字付け関手](../CATB4-02/index.md#thm-catb4-02-reindex)によって、基底射 $u:a\to b$ に沿い、$b$ 上の対象と射を $a$ 上へ移せる。直接移す場合と二段で移す場合の選択が異なると、結果は等しいとは限らない。しかし両者を比較する同型がある。三段で移したとき、比較の順序を変えても同じ射になるだろうか。本講ではその条件まで取り出し、基底と各点の圏だけで記述する。

前提講座：[CATB4-02 Cleavageとsplitファイブレーション](../CATB4-02/index.md)、[CAT1-07 自然変換と自然同型](../../CAT/CAT1-07/index.md)、[CATB2-08 双圏と弱い結合律](../CATB2-08/index.md)。

合成は右から左に書く。基底圏を $\mathcal B$ とし、サイズを固定して[小圏](../../CAT/CAT1-02/index.md#def-cat1-02-size)を対象、関手を射、自然変換を2次元の射として扱う [小圏の厳密2-圏 Cat](../CATB2-08/index.md#thm-catb2-08-cat) を考える。大きなファイバーを扱う場合はそれらが小さくなるように集合のサイズの基準を拡大する。

## 2. 合成を同型で比較する

各点 $b$ に圏 $\mathcal F_b$ を置き、各 $u:a\to b$ に関手 $u^*:\mathcal F_b\to\mathcal F_a$ を置く。$y\in\mathcal F_b$ と同じ圏の射 $h:y\to z$ に対して、関手の対象・射への作用はそれぞれ $u^*y=u^*(y)$、$u^*h=u^*(h)$ と略記する。これは[反変関手](../../CAT/CAT1-06/index.md#def-cat1-06-contravariant)と同じ向きである。すなわち基底の[反対圏](../../CAT/CAT1-04/index.md#def-cat1-04-opposite) $\mathcal B^{op}$ から $\mathbf{Cat}$ へ向かう。ここで $uv=u\circ v$ と書く。ただし普通の関手のように二段と直接の合成の等号を要求せず、[自然同型](../../CAT/CAT1-07/index.md#def-cat1-07-natural-isomorphism)で比較する。自然であるとは、対象ごとの比較だけでなく、対象間の射を移す操作とも可換であることをいう。

$u:a\to b,v:c\to a,w:d\to c$ を取る。二段から直接への比較を $\alpha_{v,u}$、恒等基底射に沿う操作から何もしない操作への比較を $\epsilon_b$ と書く。自然変換の成分を表す最後の添字は対象である。$y\in\mathcal F_b$ に対して

$$
\alpha_{v,u,y}:v^*(u^*y)\to(uv)^*y,
\qquad
\epsilon_{b,y}:(1_b)^*y\to y
$$

と書く。例えば $w^*(\alpha_{v,u,y})$ は $\mathcal F_c$ の比較射を関手 $w^*$ で $\mathcal F_d$ の射へ移したものである。三段から直接へは、先に $u,v$ をまとめる経路と先に $v,w$ をまとめる経路がある。この二経路の一致と恒等基底射の扱いを条件に加え、基底の各点の圏とその間の移動を一つのデータとして扱う。

<a id="def-catb4-03-indexed"></a>

<!-- formal-statement-start -->
> **定義（反変擬関手）**
>
> 圏 $\mathcal B$ 上の添字付き圏とは、次のデータと条件を持つ反変擬関手 $\mathcal B^{op}\to\mathbf{Cat}$ である。
>
> - 各対象 $b$ に小圏 $\mathcal F_b$。
> - 各射 $u:a\to b$ に関手 $u^*:\mathcal F_b\to\mathcal F_a$。
> - 各合成可能な二射 $v:c\to a,u:a\to b$ に対する比較自然同型 $\alpha_{v,u}$ と、各基底対象 $b$ に対する単位自然同型 $\epsilon_b$：

$$
\alpha_{v,u}:v^*u^*\Rightarrow(uv)^*,
\qquad
\epsilon_b:(1_b)^*\Rightarrow I_{\mathcal F_b}.
$$

> 任意の三射 $w:d\to c,v:c\to a,u:a\to b$ と $y\in\mathcal F_b$ について、三重合成の条件

$$
\alpha_{w,uv,y}\,w^*(\alpha_{v,u,y})
=
\alpha_{vw,u,y}\,\alpha_{w,v,u^*y}
$$

> が成立する。また任意の $u:a\to b$ と $y\in\mathcal F_b$ について、単位条件

$$
\alpha_{1_a,u,y}=\epsilon_{a,u^*y},
\qquad
\alpha_{u,1_b,y}=u^*(\epsilon_{b,y})
$$

> が成立する。ここで $I_{\mathcal F_b}$ は恒等関手である。
<!-- formal-statement-end -->

左辺と右辺の三重合成はともに $w^*v^*u^*y\to(uvw)^*y$ である。左辺の中間点は $w^*(uv)^*y$、右辺の中間点は $(vw)^*u^*y$ になる。単位条件の第一式は $(1_a)^*u^*y\to u^*y$、第二式は $u^*(1_b)^*y\to u^*y$ の射の等号である。単位の向きを逆に選ぶ流儀もあるが、本講では上の向きを一貫して使う。

<!-- definition-example-start: def-catb4-03-indexed -->
**定義の確認**。基底を固定した無限集合 $U$ の有限部分集合とその間の写像の圏とする。各基底対象 $b$ に対し、値の圏 $\mathcal F_b$ の対象は $b$ で添字付けた有限集合の族、射 $h:Y\to Z$ は各成分の写像 $h_j:Y_j\to Z_j$ の族とする。恒等射と合成は成分ごとに定める。これは[集合族のファイブレーション](../CATB4-01/index.md#thm-catb4-01-families)のファイバーを、成分集合を $U$ の有限部分集合に限定して取り出したものである。対象と射の集まりは集合となるので各値は小圏になる。$b$ 上の族 $Y=(Y_j)_{j\in b}$ に対し、$u:a\to b$ に対し、$u^*Y$ の $i\in a$ 成分は $Y_{u(i)}$、成分写像 $h$ に対して $(u^*h)_i=h_{u(i)}$ とする。

[関手の二条件](../../CAT/CAT1-06/index.md#def-cat1-06-functor)を、任意の族 $Y$ と合成可能な成分写像族 $h:Y\to Z$、$k:Z\to T$ で確かめる。恒等写像の成分は

$$
(u^*1_Y)_i=1_{Y_{u(i)}}=(1_{u^*Y})_i
$$

となり、成分合成は

$$
(u^*(kh))_i=k_{u(i)}h_{u(i)}
=(u^*k)_i(u^*h)_i
$$

となるから関手である。さらに $v:c\to a$ と $i\in c$ に対して、二段と直接を成分ごとに比べる。

$$
(v^*u^*Y)_i=Y_{u(v(i))}=((uv)^*Y)_i,
$$

$$
(v^*u^*h)_i=h_{u(v(i))}=((uv)^*h)_i.
$$

従って対象と射の両方で一致する。恒等基底射では添字が変わらない。従って比較をすべて恒等射にできる。任意の射 $h:Y\to Z$ に対して、二段と直接の関手が一致するから、比較の[自然性](../../CAT/CAT1-07/index.md#def-cat1-07-natural-transformation)は

$$
(uv)^*h\,1_{(uv)^*Y}
= (uv)^*h
=1_{(uv)^*Z}\,v^*u^*h
$$

となる。単位比較の自然性も $(1_b)^*h=h$ と恒等律から従う。比較成分は恒等射であり、その逆も恒等射である。三重合成・単位の各辺も同じ対象の恒等射になる。空の添字でも両方とも空の族なので成立する。以上で全条件が確認できた。
<!-- definition-example-end -->

この例は厳密な合成を持つが、一般には比較射が恒等射でなくてもよい。次節でファイブレーションからその条件が自動的に出ることを示す。

## 3. 持ち上げの一意性から整合条件を導く

前講の[選んだ持ち上げの比較同型](../CATB4-02/index.md#thm-catb4-02-comparison)では、二段と直接の比較が垂直同型であることを証明した。[ファイブレーション](../CATB4-01/index.md#def-catb4-01-fibration)の[cleavage](../CATB4-02/index.md#def-catb4-02-cleavage)は、基底射 $u:a\to b$ と $p(y)=b$ に対して[Cartesian射](../CATB4-01/index.md#def-catb4-01-cartesian) $\chi_{u,y}:u^*y\to y$ を一つ選ぶデータである。ここで[ファイバー圏](../CATB4-01/index.md#def-catb4-01-fiber) $\mathcal E_b$ は基底が $b$ の対象と基底が $1_b$ の射（垂直射）からなる。ここでは、比較の自然性と三重合成の一致を、同じ終点への持ち上げを通した因子分解で証明する。

<a id="thm-catb4-03-fibration"></a>

<!-- formal-statement-start -->
> **定理（ファイブレーションからの添字付き圏）**
>
> 小さいファイバーを持つファイブレーション $p:\mathcal E\to\mathcal B$ に cleavage が与えられているとする。各ファイバー $\mathcal E_b$ と選んだCartesian持ち上げから得る再添字付け関手 $u^*$ を取る。各合成可能な $v:c\to a,u:a\to b$ と $y\in\mathcal E_b$ に対し、垂直同型 $\alpha_{v,u,y}:v^*u^*y\to(uv)^*y$ および $\epsilon_{b,y}:(1_b)^*y\to y$ を

$$
\chi_{uv,y}\alpha_{v,u,y}
=\chi_{u,y}\chi_{v,u^*y},
\qquad
\epsilon_{b,y}=\chi_{1_b,y}
$$

> で定めると、これらは[反変擬関手](#def-catb4-03-indexed)の構造を与える。
<!-- formal-statement-end -->

見取り図：自然性では、二経路を終点への持ち上げ $\chi_{uv,z}$ と合成する。三重合成では $\chi_{uvw,y}$ と合成する。いずれも合成結果は共通の射となり、媒介する垂直射が一意なので比較前の二経路も一致する。

<!-- proof-start -->
### 証明

[Cleavage](../CATB4-02/index.md#def-catb4-02-cleavage)による選択を $\chi_{u,y}:u^*y\to y$ とする。[ファイバー圏](../CATB4-01/index.md#def-catb4-01-fiber)では射の基底が恒等射である。[再添字付け関手](../CATB4-02/index.md#thm-catb4-02-reindex)は垂直射 $h:y\to z$ に対して

$$
\chi_{u,z}u^*h=h\chi_{u,y}
$$

を満たす。 [選んだ持ち上げの比較同型](../CATB4-02/index.md#thm-catb4-02-comparison)により、各 $\alpha_{v,u,y}$ と $\epsilon_{b,y}$ は垂直同型として存在する。

まず $\alpha$ の自然性を調べる。両経路は $v^*u^*y\to(uv)^*z$ の垂直射である。左から $\chi_{uv,z}$ を合成すると

$$
\begin{aligned}
\chi_{uv,z}(uv)^*h\,\alpha_{v,u,y}
&=h\chi_{uv,y}\alpha_{v,u,y}\\
&=h\chi_{u,y}\chi_{v,u^*y},
\end{aligned}
$$

$$
\begin{aligned}
\chi_{uv,z}\alpha_{v,u,z}v^*u^*h
&=\chi_{u,z}\chi_{v,u^*z}v^*(u^*h)\\
&=\chi_{u,z}u^*h\chi_{v,u^*y}\\
&=h\chi_{u,y}\chi_{v,u^*y}.
\end{aligned}
$$

[Cartesian射の定義](../CATB4-01/index.md#def-catb4-01-cartesian)を $\chi_{uv,z}$ に適用する。入力は $v^*u^*y$、媒介基底は $1_c$、終点への射は上の共通の射である。媒介射の一意性から $(uv)^*h\,\alpha_{v,u,y}=\alpha_{v,u,z}v^*u^*h$ を得る。

$\epsilon$ の自然性は再添字付け関手の定義式に $u=1_b$ を代入して

$$
\epsilon_{b,z}(1_b)^*h=h\epsilon_{b,y}
$$

となることから従う。各成分は同型なので[自然同型の成分判定と逆の自然性](../../CAT/CAT1-07/index.md#prop-cat1-07-componentwise-iso)により両比較は自然同型である。

次に三重合成を調べる。左辺に $\chi_{uvw,y}$ を合成する。

$$
\begin{aligned}
&\chi_{uvw,y}\alpha_{w,uv,y}w^*(\alpha_{v,u,y})\\
&=\chi_{uv,y}\chi_{w,(uv)^*y}w^*(\alpha_{v,u,y})\\
&=\chi_{uv,y}\alpha_{v,u,y}\chi_{w,v^*u^*y}\\
&=\chi_{u,y}\chi_{v,u^*y}\chi_{w,v^*u^*y}.
\end{aligned}
$$

二番目の等号は垂直射 $\alpha_{v,u,y}$ に対する再添字付けの式である。右辺にも同じ持ち上げを合成すると

$$
\begin{aligned}
&\chi_{uvw,y}\alpha_{vw,u,y}\alpha_{w,v,u^*y}\\
&=\chi_{u,y}\chi_{vw,u^*y}\alpha_{w,v,u^*y}\\
&=\chi_{u,y}\chi_{v,u^*y}\chi_{w,v^*u^*y}.
\end{aligned}
$$

入力は $w^*v^*u^*y$、媒介基底は $1_d$。共通の射の基底は $uvw$ なので $\chi_{uvw,y}$ のCartesian性による一意性が使える。従って[反変擬関手の三重合成条件](#def-catb4-03-indexed)が成立する。

最後に単位条件を調べる。第一式について $u1_a=u$ なので

$$
\chi_{u,y}\alpha_{1_a,u,y}
=\chi_{u,y}\chi_{1_a,u^*y}
=\chi_{u,y}\epsilon_{a,u^*y}.
$$

両媒介射の基底は $1_a$ なので一意性から第一式を得る。第二式では $1_bu=u$ より

$$
\chi_{u,y}\alpha_{u,1_b,y}
=\chi_{1_b,y}\chi_{u,(1_b)^*y}
=\epsilon_{b,y}\chi_{u,(1_b)^*y}.
$$

右端は垂直射 $\epsilon_{b,y}:(1_b)^*y\to y$ の再添字付けの定義により $\chi_{u,y}u^*(\epsilon_{b,y})$ と等しい。媒介基底 $1_a$ の一意性から第二式を得る。これで全条件が成立した。
<!-- proof-end -->

[splitファイブレーション](../CATB4-02/index.md#def-catb4-02-split)の場合、正規化から $\epsilon_b$ は恒等自然変換、合成条件から $\alpha_{v,u}$ も恒等自然変換となる。[split選択の厳密な関手合成](../CATB4-02/index.md#prop-catb4-02-strict)により関手の等号も成立する。逆に上の構成で全比較が恒等なら、単位と合成の持ち上げの定義式から選択はsplitである。

## 4. 関手が等しくても比較が恒等とは限らない

前講と同じく、加法を合成とする[一対象圏](../../CAT/CAT1-02/index.md#prop-cat1-02-one-object)の例を考える。全圏は一対象で射が $\mathbb Z/4\mathbb Z$、基底も一対象で射が $\mathbb Z/2\mathbb Z$、関手は剰余を取る写像とする。合成は加法である。全圏の射 $f$ に対し、基底の射 $v$ と射 $g$ が $p(g)=p(f)+v$ を満たすなら $h=g-f$ が唯一の媒介射で、$p(h)=v$ である。従って[Cartesian射の定義](../CATB4-01/index.md#def-catb4-01-cartesian)を満たす。剰余写像が全射なので各基底射に沿う持ち上げが存在し、[ファイブレーション](../CATB4-01/index.md#def-catb4-01-fibration)になる。

この例では対象が一つなので、持ち上げと比較の対象添字 $y$ を省く。選択を $\chi_0=0,\chi_1=1$ とする。ファイバーの射は $0,2$ の二つで、一対象圏である。垂直射 $h$ の再添字付けの式は

$$
\chi_u+u^*h=h+\chi_u.
$$

加法が可換なので $u^*h=h$。どちらの基底射でも再添字付け関手は恒等関手になる。しかし[ファイブレーションからの添字付き圏](#thm-catb4-03-fibration)の比較の定義式は、合成を加法で書けば $\chi_{u+v}+\alpha_{v,u}=\chi_u+\chi_v$ である。従って

$$
\alpha_{v,u}=\chi_u+\chi_v-\chi_{u+v}
\pmod4
$$

であり、基底の加法は2を法としている。従って $\alpha_{1,1}=2$、他は $0$。恒等射は $0$ であるため、$\alpha_{1,1}$ は恒等ではない。自然性は任意の $h\in\{0,2\}$ について $h+2=2+h$ から従う。

三重合成は各比較の式を足して確認できる。

$$
\begin{aligned}
\alpha_{w,u+v}+\alpha_{v,u}
&=\chi_u+\chi_v+\chi_w-\chi_{u+v+w},\\
\alpha_{v+w,u}+\alpha_{w,v}
&=\chi_u+\chi_v+\chi_w-\chi_{u+v+w}.
\end{aligned}
$$

単位条件も $\chi_0=0$ から成り立つ。比較を忘れて関手の等号だけを記録すると、この選択の情報が失われる。

## 5. 演習

### CATB4-03-A01 関手の向き

- Level: A

第2節の例で、$U$ は以下の元をすべて含むとし、添字集合を $b=\{0,1\},a=\{r,s\},c=\{t\}$ とする。写像と族を次で指定する。

$$
u(r)=1,\quad u(s)=0,\quad v(t)=s,
$$

$$
Y_0=\{2\},\quad Y_1=\{3,4\}.
$$

この族を二段と直接で移せ。

<!-- solution-start -->
**詳細解答。** [反変擬関手](#def-catb4-03-indexed)の集合族の例では

$$
(u^*Y)_r=Y_1=\{3,4\},\qquad (u^*Y)_s=Y_0=\{2\}.
$$

さらに移すと $(v^*u^*Y)_t=(u^*Y)_s=\{2\}$。直接も $uv(t)=u(s)=0$ なので $((uv)^*Y)_t=Y_0=\{2\}$。両者は同じ添字集合上の同一の族となり、比較はその恒等射である。
<!-- solution-end -->

### CATB4-03-A02 比較の型

- Level: A

$u:a\to b,v:c\to a,w:d\to c$ と $y\in\mathcal F_b$ を取る。三重合成条件の二経路の中間点と終点を求めよ。

<!-- solution-start -->
**詳細解答。** [反変擬関手](#def-catb4-03-indexed)の比較に従い、第一経路は

$$
w^*v^*u^*y
\xrightarrow{w^*\alpha_{v,u,y}}w^*(uv)^*y
\xrightarrow{\alpha_{w,uv,y}}(uvw)^*y.
$$

第二経路は

$$
w^*v^*u^*y
\xrightarrow{\alpha_{w,v,u^*y}}(vw)^*u^*y
\xrightarrow{\alpha_{vw,u,y}}(uvw)^*y.
$$

いずれも $\mathcal F_d$ の射である。基底での結合律により $(uv)w=u(vw)$ なので終点が共通になる。
<!-- solution-end -->

### CATB4-03-A03 単位条件の型

- Level: A

$u:a\to b$ と $y\in\mathcal F_b$ について、二つの単位条件の始域と終域を求めよ。$\epsilon_{b,y}$ を第一式の右辺に直接使えない理由を述べよ。

<!-- solution-start -->
**詳細解答。** [反変擬関手](#def-catb4-03-indexed)の第一式は $(1_a)^*u^*y\to u^*y$ である。第二式は $u^*(1_b)^*y\to u^*y$ であり、$\epsilon_{b,y}$ に $u^*$ を適用して作る。$\epsilon_{b,y}$ 自体は $\mathcal F_b$ にあり、第一式は $\mathcal F_a$ の射なので一般に型が合わない。
<!-- solution-end -->

### CATB4-03-A04 剰余加法の比較

- Level: A

第4節で選択を $\chi_0=0,\chi_1=3$ に変え、四つの比較を計算せよ。

<!-- solution-start -->
**詳細解答。** [ファイブレーションからの添字付き圏](#thm-catb4-03-fibration)の比較の式を加法で書き、二段から直接の持ち上げを引いた差を4を法として求める。$(v,u)=(0,0)$ では $0+0-0=0$、$(0,1)$ と $(1,0)$ ではそれぞれ $3+0-3=0$ と $0+3-3=0$。$(1,1)$ では $3+3-0=6\equiv2$。したがって比較は以前と同じであり、選択を変えてもこの場合には恒等比較にはならない。
<!-- solution-end -->

### CATB4-03-B01 自然性の具体計算

- Level: B

基底を $0<1<2$ の順序圏とし、全圏を非負整数全体 $\mathbb N_0=\{0,1,2,\ldots\}$ の有限部分集合と写像の圏、および基底の[積圏](../../CAT/CAT1-05/index.md#def-cat1-05-product)とする。基底への関手 $p$ は第二成分を取る。$u:1\to2,v:0\to1$。通常は恒等写像で持ち上げ、終点の集合が $S=\{0,1\}$ で基底が $uv$ の場合だけ入替写像 $s:S\to S$（$s(0)=1,s(1)=0$）を選ぶ。$h:S\to T=\{0,1,2\}$ を $h(0)=0,h(1)=2$ とし、$\alpha$ の自然性を第一成分で確認せよ。

<!-- solution-start -->
**詳細解答。** 基底射 $q:a\to b$ に沿う選んだ持ち上げを $(f,q):(X,a)\to(X,b)$ と書く。$f$ は恒等写像または入替写像なので全単射である。任意の $(g,qr):(Z,c)\to(X,b)$ と基底射 $r:c\to a$ に対し、媒介射 $(k,r)$ の条件は $fk=g$ であり、$k=f^{-1}g$ に一意に定まる。よって[Cartesian射の定義](../CATB4-01/index.md#def-catb4-01-cartesian)を満たす。

$u,v$ では両集合の持ち上げが恒等だから $v^*u^*h=h$。直接の再添字付けでは終点 $T$ の持ち上げが恒等、始域 $S$ の持ち上げが $s$ なので、[再添字付け関手](../CATB4-02/index.md#thm-catb4-02-reindex)の式から $(uv)^*h=hs$。[比較同型の定義式](#thm-catb4-03-fibration)を使う。ここで $\alpha_S=\alpha_{v,u,S}$、$\alpha_T=\alpha_{v,u,T}$ と略記する。比較の定義式の第一成分は

$$
s\alpha_S=1_S,\qquad 1_T\alpha_T=1_T.
$$

従って比較は $S$ で $s^{-1}=s$、$T$ で恒等である。自然性の両辺は

$$
(uv)^*h\,\alpha_S=hss=h,\qquad
\alpha_Tv^*u^*h=h.
$$

両方とも $0\mapsto0,1\mapsto2$。例えば直接の再添字付けを $hs$ のままにして比較だけを恒等射に変えると、左辺は $hs$（$0\mapsto2,1\mapsto0$）、右辺は $h$（$0\mapsto0,1\mapsto2$）となり、自然性が壊れる。
<!-- solution-end -->

### CATB4-03-B02 正規化しない単位

- Level: B

基底を一対象・恒等射のみの圏とし、全圏を一対象で射が $\mathbb Z/3\mathbb Z$ の圏とする。基底への関手はすべての射を唯一の基底射 $u$ に送る。全圏の恒等射は剰余類 $0$ だが、$u$ の持ち上げに剰余類 $1$ を選ぶ。再添字付け関手、単位、二段比較を求め、擬関手条件を確認せよ。

<!-- solution-start -->
**詳細解答。** 全圏の任意の射 $f$ に対して、因子分解の式

$$
f+h=g\pmod 3
$$

の解は $h=g-f$ に一意に定まり、基底条件は自動的に満たされる。従って選択した射はCartesianである。

[再添字付け関手](../CATB4-02/index.md#thm-catb4-02-reindex)と[比較同型](#thm-catb4-03-fibration)の定義式はそれぞれ

$$
1+u^*h=h+1,\qquad 1+\alpha=1+1
$$

である。両辺から1を引くと、再添字付けは恒等関手、比較は $\alpha=1$ となる。単位も $\epsilon=1$ である。比較と単位は逆射2を持ち、任意の射との加法が可換なので自然である。

三重条件の各辺は $1+1=2$、両単位条件の各辺は1となる。よって[反変擬関手](#def-catb4-03-indexed)の全条件が成立するが、単位比較は恒等射0ではない。
<!-- solution-end -->

### CATB4-03-B03 三重合成が壊れるデータ

- Level: B

基底を $0<1<2<3$ の順序圏とし、すべての値を一対象で射が $\mathbb Z/2\mathbb Z$ の圏、すべての関手を恒等とする。単位比較は $0$、二段比較は $u:2\to3,v:1\to2$ の組だけ $1$、他は $0$ とする。どの条件が壊れるか。

<!-- solution-start -->
**詳細解答。** 各比較は加法の可換性から自然であり、$0,1$ はともに自己逆射だから同型である。恒等射を含む組の比較はすべて $0$ なので単位条件は成立する。しかし $w:0\to1$ を取ると

$$
\alpha_{w,uv}+\alpha_{v,u}=0+1=1,
$$

$$
\alpha_{vw,u}+\alpha_{w,v}=0+0=0.
$$

両者は異なる。従って自然同型を組ごとに指定しただけでは[反変擬関手](#def-catb4-03-indexed)の三重合成条件は保証されない。
<!-- solution-end -->

### CATB4-03-C01 選択の変更と三重比較

- Level: C

同一のファイブレーションの二つのcleavageを $\chi,\widetilde\chi$ とし、比較を $\alpha,\widetilde\alpha$ とする。各 $u,y$ に対し、$\widetilde\chi_{u,y}\theta_{u,y}=\chi_{u,y}$ を満たす垂直同型を取る。二つの再添字付け関手の間で $\theta$ が自然であること、および

$$
\theta_{uv,y}\alpha_{v,u,y}
=\widetilde\alpha_{v,u,y}\,
\widetilde v^*(\theta_{u,y})\,\theta_{v,u^*y}
$$

を証明せよ。新しい選択の関手にはチルダを付ける。

<!-- solution-start -->
**詳細解答。** [Cartesian持ち上げの同型一意性](../CATB4-01/index.md#thm-catb4-01-unique-lift)により $\theta_{u,y}:u^*y\to\widetilde u^*y$ が存在する。任意の垂直射 $h:y\to z$ について、二経路は $u^*y\to\widetilde u^*z$ である。[再添字付け関手](../CATB4-02/index.md#thm-catb4-02-reindex)の式により

$$
\begin{aligned}
\widetilde\chi_{u,z}\widetilde u^*h\,\theta_{u,y}
&=h\widetilde\chi_{u,y}\theta_{u,y}=h\chi_{u,y},\\
\widetilde\chi_{u,z}\theta_{u,z}u^*h
&=\chi_{u,z}u^*h=h\chi_{u,y}.
\end{aligned}
$$

媒介基底は $1_a$ なので一意性から自然性が従う。

次に比較の二経路は $v^*u^*y$ から $\widetilde{(uv)}^*y$ への垂直射である。左辺に $\widetilde\chi_{uv,y}$ を合成すると

$$
\widetilde\chi_{uv,y}\theta_{uv,y}\alpha_{v,u,y}
=\chi_{uv,y}\alpha_{v,u,y}
=\chi_{u,y}\chi_{v,u^*y}.
$$

右辺に同じ射を合成すると、[ファイブレーションからの添字付き圏](#thm-catb4-03-fibration)の比較の式と再添字付けの式から

$$
\begin{aligned}
&\widetilde\chi_{uv,y}\widetilde\alpha_{v,u,y}
\widetilde v^*(\theta_{u,y})\theta_{v,u^*y}\\
&=\widetilde\chi_{u,y}\widetilde\chi_{v,\widetilde u^*y}
\widetilde v^*(\theta_{u,y})\theta_{v,u^*y}\\
&=\widetilde\chi_{u,y}\theta_{u,y}
\widetilde\chi_{v,u^*y}\theta_{v,u^*y}\\
&=\chi_{u,y}\chi_{v,u^*y}.
\end{aligned}
$$

ここで $\widetilde v^*$ は $\theta_{u,y}:u^*y\to\widetilde u^*y$ を新しい選択で移している。二番目の等号はこの垂直射に対する[再添字付け関手](../CATB4-02/index.md#thm-catb4-02-reindex)の定義式を用いた。両媒介射の基底は $1_c$ であり、$\widetilde\chi_{uv,y}$ のCartesian性から等しい。単位についても $\widetilde\epsilon_{b,y}\theta_{1_b,y}=\epsilon_{b,y}$ が $\theta$ の定義そのものである。このように選択を変えても比較を含む整合した対応が得られる。
<!-- solution-end -->

## 6. まとめ

基底の各対象に圏を置き、基底射と逆向きに関手を置き、二段合成と単位を自然同型で比較する。三重合成と単位の整合条件により比較の順序を変えられる。ファイブレーションではCartesian持ち上げの一意性がこれらの条件を保証する。次講では逆に、このデータから一つの全圏を組み立てる。
