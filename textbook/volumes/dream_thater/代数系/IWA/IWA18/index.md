# IWA18 Selmer群とPontryagin双対

円分塔では無分岐という条件で類群に対応するGalois群を取り出しました。楕円曲線では、有理点を割り算して得られる情報を各素点で比較したいのですが、割った点そのものは有理点であるとは限りません。そこで、割った点がGalois作用でどれだけずれるかを記録し、各完備化で許されるずれだけを選びます。最後に無限塔で集めた情報をコンパクトな岩澤加群に変換します。

## 1. Galois作用のずれを記録する

数体 $F$ の代数閉包を $\bar F$、絶対Galois群を $G_F=\operatorname{Gal}(\bar F/F)$ とします。有限Galois拡大での制限写像を通じて $G_F$ に逆極限位相を入れます。有限商への射影の核が単位元の近傍をなします。以下、$G$ はこのような射有限群、$A$ は離散位相を持つ加法的Abel群で、$G$ が連続に群自己同型として作用するものです。連続性は各 $a\in A$ の固定群が開であることと同値です。

[ANF14の加法的第1余サイクルと余境界](../../ANF/ANF14/index.md#def-anf14-additive-cocycle) を、連続写像に限る形で射有限群へ拡張します。以下では余サイクル（コサイクル）、余境界（コバウンダリ）を同じ意味で使います。点 $b$ に対し $g b-b$ を考えると、積 $gh$ に対するずれは

$$
ghb-b=(gb-b)+g(hb-b).
$$

この形を満たす連続写像を1-コサイクル、点のずれだけから生じるものを1-コバウンダリといいます。それらの商を取れば、点の選び方に依存しない情報が残ります。

<a id="def-iwa18-h1"></a>

<!-- formal-statement-start -->
> **定義（連続1次群コホモロジー）**
> 射有限群 $G$ が離散Abel群 $A$ に連続に作用するものとする。連続写像の加法群の部分群
>
$$
Z^1(G,A)=\{c:G\to A\mid c(gh)=c(g)+gc(h)\}
$$
$$
B^1(G,A)=\{g\mapsto gb-b\mid b\in A\}
$$
>
> をそれぞれ1-コサイクル、1-コバウンダリの群とする（前者の写像は連続なものに限る）。その商を
>
$$
H^1(G,A)=Z^1(G,A)/B^1(G,A)
$$
>
> とする。
<!-- formal-statement-end -->

先ほどの恒等式で $B^1\subseteq Z^1$ です。加法と逆元についても条件式の両辺を加減できるので部分群です。部分群 $H\subseteq G$ に制限するとコサイクル条件を保ち、$gb-b$ は $hb-b$ に制限されるため商にも制限写像 $\operatorname{res}_H$ が誘導されます。

<!-- definition-example-start: def-iwa18-h1 -->
**定義の確認**。$G=\langle s\mid s^3=1\rangle$ が $A=\mathbb Z/9\mathbb Z$ に自明に作用するとします。このときコサイクルは準同型です。$c(s)=a$ とすると $c(s^2)=2a$、$c(1)=3a=0$ が必要です。逆に $3a=0$ なら $c(s^i)=ia$ は指数を法3で変えても同じ値で、積の条件を満たします。有限離散群なので連続です。許される $a$ は $0,3,6$。自明作用なので $gb-b=0$ であり、商は $\mathbb Z/3\mathbb Z$ と同型です。
<!-- definition-example-end -->

この例に対し、非自明作用ではコサイクルを通常の準同型に置き換えられません。例えば位数2の群が $\mathbb Z/3\mathbb Z$ に符号反転で作用すると、$c(s)=a$ の条件は $a-a=0$ で全ての $a$ が許されます。しかし $sb-b=-2b$ は全ての値を取るので $H^1=0$ です。準同型の集合が同じ零群になることと、ずれの商が零になる理由は異なります。

## 2. 点の割り算からコホモロジー類へ

楕円曲線 $E/F$ の点の群を加法で書き、原点を $O$ とします。

素数 $p$ と整数 $m\ge1$ に対し $n=p^m$ と置きます。

[倍数写像の次数](../../EC/EC4/index.md#thm-ec4-multiplication-degree) は $n^2>0$ なので、標数0の代数閉体では $[n]$ は非定数の有限射として全射です。

[標数とtorsionの構造](../../EC/EC4/index.md#thm-ec4-torsion-structure) により核 $E[n]$ は $(\mathbb Z/n\mathbb Z)^2$ に同型です。

点 $P\in E(F)$ に対し $nQ=P$ となる $Q\in E(\bar F)$ を選ぶと、$gP=P$ だから $n(gQ-Q)=O$ です。

このずれを1次コホモロジーへ送る写像が Kummer 写像です。

<a id="def-iwa18-kummer"></a>

<!-- formal-statement-start -->
> **定義（楕円曲線のKummer写像）**
> 標数0の体 $F$ 上の楕円曲線 $E$ と正整数 $n$ に対し、$P\in E(F)$ の $n$ 等分点 $Q\in E(\bar F)$ を選び、
>
$$
\delta_n:E(F)/nE(F)\longrightarrow H^1(G_F,E[n]),
\qquad [P]\longmapsto[g\mapsto gQ-Q]
$$
>
> とする。
<!-- formal-statement-end -->

<a id="thm-iwa18-kummer-exact"></a>

<!-- formal-statement-start -->
> **定理（楕円曲線のKummer完全列）**
> 標数0の体 $F$、楕円曲線 $E/F$、正整数 $n$ に対して次の列は完全である。右の写像は係数の包含から誘導される。$[n]$ は $n$ 倍写像、角括弧 $[n]$ を群の後ろに付けたものは $n$ 倍で消える部分群を表す。
>
$$
0\to E(F)/nE(F)\xrightarrow{\delta_n}
H^1(G_F,E[n])
\to H^1(G_F,E(\bar F))[n]\to0.
$$
<!-- formal-statement-end -->

証明の核心は、コバウンダリを引く操作が割り算に使った点を取り替えることに対応する点です。

<!-- proof-start -->
### 証明

$gQ-Q$ は前節の恒等式を満たし、$Q$ の座標が有限拡大に属するため連続です。別の等分点 $Q'$ との差 $R=Q'-Q$ は $E[n]$ に属し、コサイクルの差は $gR-R$ です。$P$ を $P+nU$（$U\in E(F)$）に替えると $Q+U$ を選べ、ずれは変わりません。二点の和には等分点の和を使えるので準同型です。

$\delta_n([P])=0$ なら $gQ-Q=gR-R$ を満たす $R\in E[n]$ が存在します。従って $Q-R$ は全ての $g$ に固定され、$E(F)$ に属します。$n(Q-R)=P$ だから $[P]=0$。逆に $P=nU$ なら $U$ を等分点に選べてずれは零です。

係数の包含で $\delta_n([P])$ は $E(\bar F)$ 内のコバウンダリになるので零です。逆に $E[n]$ 値コサイクル $c$ が包含後に零なら $c(g)=gQ-Q$ と書けます。$nc(g)=O$ より $nQ$ は固定され、$P=nQ\in E(F)$。したがって $[c]=\delta_n([P])$ です。

最後に $[d]\in H^1(G_F,E(\bar F))[n]$ を取ると、$nd(g)=gR-R$ となる $R\in E(\bar F)$ が存在します。[倍数写像の次数](../../EC/EC4/index.md#thm-ec4-multiplication-degree) から得た全射性により $nQ=R$ を選び、

$$
c(g)=d(g)-(gQ-Q)
$$

と置けば $nc(g)=nd(g)-(gR-R)=O$ です。$c$ は連続コサイクルであり、包含後の類は $[d]$ です。これで右端の全射性と全ての完全性を示しました。
<!-- proof-end -->

<!-- definition-example-start: def-iwa18-kummer -->
**定義の確認**。

$F=\mathbb Q$、$E:y^2=x^3-x$、$n=2$、$P=(0,0)$ とします。

等分点は例えば $Q=(i,1-i)$ です。

実際 $(1-i)^2=-2i=i^3-i$。

[割線・接線による加法](../../EC/EC2/index.md#def-ec2-chord-tangent-addition) で、接線の傾きは $(3i^2-1)/(2(1-i))=-1-i$、倍点の座標は $x(2Q)=(-1-i)^2-2i=0$、$y(2Q)=(-1-i)i-(1-i)=0$。

従って $2Q=P$ です。

$Q$ の座標は $\mathbb Q(i)$ にあり、複素共役 $\sigma$ に対するずれ $\sigma Q-Q$ は2倍で零になります。

すべての $g$ に対しても $2(gQ-Q)=gP-P=O$ であり、恒等式と有限拡大からコサイクル条件と連続性が従います。

別の等分点による差は [Kummer完全列](#thm-iwa18-kummer-exact) の証明で確認した通りコバウンダリです。

$P$ は有理点の2倍ではありません。有理点 $U=(x,y)$ で $y\ne0$ のとき、倍点の $x$ 座標は
$$
x(2U)=\frac{(x^2+1)^2}{4x(x^2-1)}.
$$
分子は接線の傾きの二乗から $2x$ を引き、共通分母 $4x(x^2-1)$ に通分したものです。実際、分子は $(3x^2-1)^2-8x^2(x^2-1)=x^4+2x^2+1$ です。これは $x\in\mathbb Q$ で零になりません。$y=0$ の点と $O$ の2倍は $O$ です。従って $[P]\ne0$ であり、単射性から $\delta_2([P])\ne0$ です。
<!-- definition-example-end -->

## 3. 各完備化で許される類だけを選ぶ

数体 $F$ の素点 $v$ における完備化を $F_v$ とし、代数閉包への埋め込みを選んで $G_{F_v}\to G_F$ を得ます。異なる選択は共役を通じて同じ局所条件を与えます（後で共役作用を計算します）。各局所体でも前節のKummer写像が作れます。大域の類のうち、その制限が局所Kummer写像の像に入るものを選びます。

一般に、有限集合 $S$ に含まれない有限素点で不分岐な最大拡大を $F_S$ と書き、$G_{F,S}=\operatorname{Gal}(F_S/F)$ とします。有限素点で不分岐とは惰性群が自明に作用することです。係数の作用も $G_{F,S}$ を経由する必要があります。$S$ は無限素点、$p$ の上の素点、および係数が分岐する素点を含めます。局所の部分群 $L_v\subseteq H^1(G_{F_v},A)$ を指定すれば、局所条件付きの大域群を作れます。

<a id="def-iwa18-local-selmer"></a>

<!-- formal-statement-start -->
> **定義（局所条件付きSelmer群）**
> 数体 $F$、有限素点集合と無限素点からなる有限集合 $S$、連続な離散 $p$ べきねじれ係数群 $A$ を取り、$A$ の作用が $G_{F,S}$ を経由するとする。各 $v\in S$ に部分群 $L_v$ を指定する。Selmer群を次の核とする。
>
$$
\operatorname{Sel}_{L}(F,A)=
\ker\left(H^1(G_{F,S},A)
\to\prod_{v\in S}H^1(G_{F_v},A)/L_v\right).
$$
>
> 写像は制限の後に商へ移すものとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa18-local-selmer -->
**定義の確認**。

$F=\mathbb Q$、$p=3$、$A=\mathbb Z/3\mathbb Z$ を自明作用とし、$S$ を3と無限素点の集合とします。

[IWA9のS分岐拡大の例](../IWA9/index.md#def-iwa9-s-ramified-extension) で扱った円分体 $\mathbb Q(\zeta_9)$ の次数3の部分体は3以外で不分岐で、Galois群は位数3の巡回群です。

その商への射影を $A$ と同一視した準同型 $c$ は連続で、大域コサイクル条件を満たします。

3はこの拡大で完全分岐なので $G_{\mathbb Q_3}$ からの制限も全射で非零です。

$L_3=0$ とすれば $[c]$ は核に入りません。

$L_3=H^1(G_{\mathbb Q_3},A)$ とし、無限素点でも全体を許せば制限の商は全て零になり $[c]$ は核に入ります。

自明作用でコバウンダリは零なので、実際に非零の類を局所条件が選別しています。
<!-- definition-example-end -->

楕円曲線についてはまず全絶対Galois群と全素点で定義しておくと、有限集合への置き換えに必要な還元条件を隠さずに済みます。

<a id="def-iwa18-elliptic-selmer"></a>

<!-- formal-statement-start -->
> **定義（楕円曲線の有限係数Selmer群とTate–Shafarevich群）**
> 数体 $F$ と楕円曲線 $E/F$、素数 $p$、整数 $m\ge1$ を取り、$n=p^m$ とする。全素点 $v$ について局所 [Kummer写像](#def-iwa18-kummer) の像を $L_{v,n}$ とする。
>
$$
\operatorname{Sel}_{n}(E/F)=
\ker\left(H^1(G_F,E[n])
\to\prod_v H^1(G_{F_v},E[n])/L_{v,n}\right).
$$
>
> Tate–Shafarevich群は局所で零になる $E(\bar F)$ 値の類からなる群
>
$$
\operatorname{Sha}(E/F)=\ker\left(H^1(G_F,E(\bar F))
\to\prod_v H^1(G_{F_v},E(\overline{F_v}))\right)
$$
>
> とする。
<!-- formal-statement-end -->

<a id="thm-iwa18-selmer-exact"></a>

<!-- formal-statement-start -->
> **定理（有限係数Selmer完全列）**
> 数体 $F$、楕円曲線 $E/F$、$n=p^m$ に対し次の列は完全である。
>
$$
0\to E(F)/nE(F)\to
\operatorname{Sel}_{n}(E/F)\to\operatorname{Sha}(E/F)[n]\to0.
$$
<!-- formal-statement-end -->

大域のKummer列を各局所のKummer列と比較します。局所の商はちょうど局所の $H^1(E)[n]$ に対応します。

<!-- proof-start -->
### 証明

[楕円曲線のKummer完全列](#thm-iwa18-kummer-exact) を $F$ と各 $F_v$ に適用します。$P$ の等分点を局所の代数閉包へ写せば同じずれの式になるため、制限とKummer写像は可換です。従って大域のKummer像は全ての局所条件を満たします。局所列の完全性より、局所条件は包含後の $H^1(G_{F_v},E(\overline{F_v}))[n]$ で零になることと同値です。よって大域のSelmer群からの像は $\operatorname{Sha}(E/F)[n]$ に入ります。

逆に $\alpha\in\operatorname{Sha}(E/F)[n]$ を取ります。大域のKummer列の全射性により、$\alpha$ の持ち上げ $c\in H^1(G_F,E[n])$ が存在します。各 $v$ で $\alpha$ の制限は零だから、局所完全列より $\operatorname{res}_v(c)$ は $L_{v,n}$ に属します。よって $c$ はSelmer群の元です。最後に大域列の核はちょうど大域Kummer像なので、Selmer群への制限でも核は変わりません。
<!-- proof-end -->

<!-- definition-example-start: def-iwa18-elliptic-selmer -->
**定義の確認**。

前節の $E:y^2=x^3-x$ と $P=(0,0)$、$n=2$ を使います。

$P$ は全ての $\mathbb Q_v$ にも属し、等分点のずれは局所Kummer写像で作った類です。

したがって全素点の商で零になり、$\delta_2([P])$ は非零のSelmer元です。

一方、係数を $E(\bar{\mathbb Q})$ へ拡大すると同じ $Q$ がコバウンダリを与えるため、この元の $\operatorname{Sha}$ への像は零です。

$\operatorname{Sha}$ の定義では全ての局所の制限が零であることが必要で、有限係数でのSelmer条件は局所の類自体が零であることを要求していません。
<!-- definition-example-end -->

## 4. 係数と体の二方向で極限を取る

$E[p^\infty]=\bigcup_m E[p^m]$ とします。係数の包含によるコホモロジー写像に対応して、左端の点の商の遷移は $[P]\mapsto[pP]$ です。実際 $p^mQ=P$ なら $p^{m+1}Q=pP$ なので同じずれが使えます。右端の $\operatorname{Sha}[p^m]$ の遷移は包含です。

有向直極限では、二つの層の元がある共通の上層で一致するとき同じ元とみなします。有限係数のSelmer群をこの遷移で直極限にして $\operatorname{Sel}_{p^\infty}(E/F)$ を得ます。各短完全列を極限にすると

$$
0\to E(F)\otimes\mathbb Q_p/\mathbb Z_p
\to\operatorname{Sel}_{p^\infty}(E/F)
\to\operatorname{Sha}(E/F)[p^\infty]\to0.
$$

完全性は元で確認できます。

極限で像が零になる元はある上層で像が零になり、その層の核から来ます。

極限での右端の元は代表を取った層で持ち上げられます。

単射も上層での零性と各層の単射性から従います。

左端の同定には $P\otimes (a/p^m+\mathbb Z_p)\mapsto[aP]$ を使います。

ただし $a\in\mathbb Z_p$ は法 $p^m$ で合同な整数で代表させ、その整数倍を取ります。

代表の差は $p^mE(F)$ に入るため結果は変わりません。

 分母を一段上げると分子が $pa$ になるため遷移と一致します。

次に円分 $\mathbb Z_p$ 拡大 $F_\infty/F$ の第 $j$ 層を $F_j$ と書きます。体の方向の写像は制限であり、ノルムではありません。$F_j$ の点は上層でも点であり、局所Kummer像の制限も上層の局所Kummer像に入るのでSelmer群の遷移が定まります。

<a id="def-iwa18-tower-selmer"></a>

<!-- formal-statement-start -->
> **定義（円分塔のp無限Selmer群）**
> 数体 $F$、楕円曲線 $E/F$、円分 $\mathbb Z_p$ 拡大 $F_\infty/F$ とその有限層 $F_j$ に対し
>
$$
D=\operatorname{Sel}_{p^\infty}(E/F_\infty)
=\varinjlim_j\varinjlim_m\operatorname{Sel}_{p^m}(E/F_j)
$$
>
> とする。係数方向は包含、体方向は制限による写像を使い、$D$ に離散位相を入れる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa18-tower-selmer -->
**定義の確認**。$F=\mathbb Q$、$p=2$、第0層の $E:y^2=x^3-x$ の $P=(0,0)$ のKummer類を考えます。係数を4に上げると点の商では $[2P]=[O]$ になります。従って非零の有限係数Selmer元でも直極限では零になる例です。体方向へ移す前に既に零になるので塔の直極限でも零です。直極限は各層の群の単なる和集合とは限りません。
<!-- definition-example-end -->

$\Gamma=\operatorname{Gal}(F_\infty/F)$ の作用を確認します。有限層のコサイクル $c$ に対して $G_F$ の元 $\sigma$ は

$$
(\sigma c)(h)=\sigma c(\sigma^{-1}h\sigma)
$$

と作用します。$h\in G_{F_j}$ についてコサイクル条件を代入すると、積の条件とコバウンダリが保たれます。特に $\sigma\in G_{F_j}$ なら

$$
\sigma c(\sigma^{-1}h\sigma)
=c(h)+h c(\sigma)-c(\sigma).
$$

右の追加項はコバウンダリです。よって作用は $G_F/G_{F_j}$ を経由します。局所条件も、素点の置換と点の移送により保たれます。したがって $D$ の各元は有限層の $\Gamma$ の開部分群に固定され、作用は連続です。局所埋め込みの選択を替えた場合も共役と同じ点の移送を使うため条件は不変です。

## 5. 離散群をコンパクト加群へ変換する

$p$ べきで消える離散Abel群 $D$ を、$p$ 進数の加法群の商 $\mathbb Q_p/\mathbb Z_p$ への準同型で調べます。位数 $p^k$ の元の像は $p^{-k}\mathbb Z_p/\mathbb Z_p$ に入ります。これにより有限部分群の上での値を一つずつ指定できます。

<a id="def-iwa18-pontryagin"></a>

<!-- formal-statement-start -->
> **定義（離散pべきねじれ群のPontryagin双対）**
> 全ての元がある $p$ べきで消える離散Abel群 $D$ の双対を
>
$$
D^\vee=\operatorname{Hom}(D,\mathbb Q_p/\mathbb Z_p)
$$
>
> とする。有限部分群 $B\subseteq D$ 上での制限を通じた逆極限位相を入れる。連続な左 $\Gamma$ 作用が $D$ にある場合、双対の左作用を
>
$$
(\gamma f)(a)=f(\gamma^{-1}a)
$$
>
> で定める。
<!-- formal-statement-end -->

有限個の元が生成する部分群は有限なので、全ての有限部分群上の準同型の整合族は $D$ 全体の準同型を一意に与えます。各有限群の双対は有限であり、整合条件は有限離散群の直積の閉条件です。従って双対はコンパクトなHausdorff群です。上の作用は $\gamma_1(\gamma_2 f)(a)=f(\gamma_2^{-1}\gamma_1^{-1}a)$ となり左作用を満たします。有限部分群の生成元を固定する開部分群を取れば作用の連続性も従います。

<!-- definition-example-start: def-iwa18-pontryagin -->
**定義の確認**。$D=\mathbb Z/9\mathbb Z$、$p=3$ とします。$f(1)$ は $9f(1)=0$ を満たすので $b/9+\mathbb Z_3$（$b$ は法9）です。逆に $f_b(x)=bx/9+\mathbb Z_3$ は代表を9だけ変えても変わらず、準同型です。有限群なので双対は有限離散群です。$\gamma$ が $x\mapsto4x$ と作用すれば逆は $7x$ です（$4\cdot7=28\equiv1\bmod9$）。よって $\gamma f_b=f_{7b}$ となり、$\gamma^3$ は両方で恒等作用です。
<!-- definition-example-end -->

<a id="thm-iwa18-dual-exact"></a>

<!-- formal-statement-start -->
> **定理（離散pべきねじれ群の双対完全性）**
> 離散 $p$ べきねじれAbel群の短完全列 $0\to A\to B\to C\to0$ に対し、準同型の合成による列
>
$$
0\to C^\vee\to B^\vee\to A^\vee\to0
$$
>
> は完全である。
<!-- formal-statement-end -->

重要なのは部分群上の準同型を全体へ延長できる点です。分数の分母をさらに $p$ べきに増やせるため、延長時の障害がありません。

<!-- proof-start -->
### 証明

$B\to C$ が全射なので合成による $C^\vee\to B^\vee$ は単射です。$A$ に零な準同型は剰余類で同じ値を取るので $C=B/A$ 上の準同型へ一意に降ります。

全射性を示します。$A$ 上の準同型 $f$ を延長した部分群の族を包含で順序付けると、鎖の合併上で整合した準同型が定まります。Zornの補題により極大延長 $f_M:M\to\mathbb Q_p/\mathbb Z_p$ が存在します。$M\ne B$ と仮定し $b\in B\setminus M$ を取ります。$b+M$ の位数はある $p^k$ です。$p^k y=f_M(p^k b)$ となる $y$ が存在します。実際、右辺の代表を $\mathbb Q_p$ で $u$ と取れば $y=u/p^k+\mathbb Z_p$ です。

$$
f'(x+jb)=f_M(x)+jy\qquad(x\in M,\ j\in\mathbb Z)
$$

と置きます。二つの表示の差を取ると $(j-j')b=x'-x\in M$ なので $j-j'=p^k t$ です。

$$
f_M(x'-x)=t f_M(p^k b)=p^k t y.
$$

これで二つの値が一致します。

$f'((x+jb)+(x'+j'b))=f_M(x+x')+(j+j')y=f'(x+jb)+f'(x'+j'b)$ であり、$f'$ は $M+\mathbb Zb$ 上の延長で極大性に矛盾します。

従って $M=B$ で全射性が成立します。
<!-- proof-end -->

例えば $0\to\mathbb Z/3\to\mathbb Z/9\to\mathbb Z/3\to0$ の左の包含は $1\mapsto3$ です。双対の制限は $f_b(3)=b/3$ なので法9から法3への還元となります。核は $b=0,3,6$ で、商から来た準同型と一致します。

## 6. 岩澤代数の作用と有限生成性

塔のSelmer群の双対を $X=D^\vee$ と書きます。

$\Gamma$ の位相的生成元を $\gamma$ とし、[岩澤代数の冪級数表示](../IWA3/index.md#thm-iwa3-power-series-isomorphism) に従って $\Lambda=\mathbb Z_p[[T]]$、$T=\gamma-1$ とします。

$D$ の有限個の元が生成する $\Gamma$ 不変部分群は有限です。

各元の軌道が有限で、全ての軌道元が有限 $p$ べき位数を持つからです。

そのような部分群 $B$ の双対には $\Gamma$ の有限商と $\mathbb Z/p^m\mathbb Z$ が作用します。

この有限群環作用を逆極限にすることで $X$ は連続な $\Lambda$ 加群になります。

不変元を調べることは、双対側の $T$ による商を調べることに対応します。

<a id="prop-iwa18-invariants"></a>

<!-- formal-statement-start -->
> **命題（Selmer双対の不変元と商の対応）**
> 離散 $p$ べきねじれ群 $D$ が $\Gamma\simeq\mathbb Z_p$ の連続作用を持つとする。$X=D^\vee$ と置き、双対作用を上の規約で定める。$D^\Gamma$ を全ての $\Gamma$ の元で固定される部分群とすると
>
$$
(D^\Gamma)^\vee\simeq X/TX.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

連続作用と $\gamma$ の生成する部分群の稠密性から $D^\Gamma=\ker(\gamma^{-1}-1:D\to D)$ です。写像 $u=\gamma^{-1}-1$ の像を $B$ とすると、$0\to D^\Gamma\to D\to B\to0$ は完全です。[双対完全性](#thm-iwa18-dual-exact) により $X\to(D^\Gamma)^\vee$ は全射で、核は $B^\vee$ の像です。$B\subseteq D$ への制限 $X\to B^\vee$ も同じ定理で全射です。二つの写像を合成したものは $f\mapsto f\circ u$ であり、

$$
(f\circ u)(a)=f(\gamma^{-1}a)-f(a)=(Tf)(a).
$$

従って核は $TX$ で、主張が従います。$TX$ はコンパクト群の連続像なので閉です。
<!-- proof-end -->

<a id="thm-iwa18-finite-generation"></a>

<!-- formal-statement-start -->
> **定理（Selmer双対の有限生成判定）**
> 上の $D,X,\Gamma,\Lambda,T$ に対し、$D[p]^\Gamma$ が有限なら $X$ は有限生成 $\Lambda$ 加群である。逆に $X$ が有限生成なら $D[p]^\Gamma$ は有限である。
<!-- formal-statement-end -->

ここで $D[p]^\Gamma$ は $p$ 倍で消え、かつ $\Gamma$ に固定される元です。最も小さい商 $X/(pX+TX)$ の生成元を持ち上げるだけで全体を生成できることを示します。

<!-- proof-start -->
### 証明

[不変元と商の対応](#prop-iwa18-invariants) と同じ完全性の議論を $D^\Gamma$ 上の $p$ 倍写像に使うと

$$
(D[p]^\Gamma)^\vee\simeq X/(pX+TX).
$$

有限な場合、その商の $\mathbb F_p$ 基底の持ち上げ $x_1,\ldots,x_r$ を選びます。$Y=\sum_i\Lambda x_i$ とすると、$\Lambda^r$ の連続像なので $Y$ はコンパクトで閉です。$X=Y+pX+TX$ です。

$Y\ne X$ なら、$X$ を有限 $\Gamma$ 不変部分群の双対への逆極限として見たとき、ある有限商 $V$ で $Y$ の像 $W$ が $V$ 全体でないものが存在します。そうでなければ $Y$ は全ての有限座標近傍と交わって稠密となり、閉性と矛盾するからです。

$U=V/W$ とすれば $U=pU+TU$。有限商ではある $p^a$ が $U$ を消し、$\gamma^{p^b}=1$ が作用するので、法 $p$ で

$$
T^{p^b}=(\gamma-1)^{p^b}=\gamma^{p^b}-1=0
\quad\text{on }U/pU.
$$

従って $T^{p^b}U\subseteq pU$、反復して $T^{ap^b}U=0$。可換な $p,T$ の単項式で、総次数が $a+ap^b$ 以上なら $p^a$ または $T^{ap^b}$ が因子に入ります。一方 $U=pU+TU$ を反復すると $U=(p,T)^N U$ が全ての $N$ で成立するので $U=0$ となり矛盾します。従って $X=Y$ です。

逆に $X$ が $r$ 個の元で生成されるなら、$X/(pX+TX)$ は $\mathbb F_p^r$ の商なので有限です。

離散 $p$ べきねじれ群は双対で元を分離できます。

実際、非零元が生成する巡回部分群から非零の値を取る準同型を作り、[双対完全性](#thm-iwa18-dual-exact) により延長できます。

特に $A=D[p]^\Gamma$ の双対が有限なら、全ての文字を $f_1,\dots,f_s$ と列挙できます。

各 $f_i(a)$ は $p$ 倍で零になるため、写像 $a\mapsto(f_1(a),\dots,f_s(a))$ は有限集合 $(p^{-1}\mathbb Z_p/\mathbb Z_p)^s$ に値を取り、文字が元を分離することから単射です。

従って $A$ は有限です。

これで逆も示しました。
<!-- proof-end -->

有限生成性とねじれ性は異なります。有限生成性が示された上で $X/TX$ が有限なら、[有限なT商からtorsionを導く命題](../IWA5/index.md#prop-iwa5-finite-coinvariants) を適用でき、$X$ はねじれ加群になります。例えば $X=\Lambda$ は1元で生成されますが $X/TX=\mathbb Z_p$ は無限で、非零の係数では $1$ を消せません。

算術側では、例えば $E/\mathbb Q$ が奇素数 $p$ で良い普通還元を持つとき、Mazurの控制定理（[有限層の比較写像](../IWA12/index.md#def-iwa12-control-map) の楕円曲線版）は有限層のSelmer群から塔の不変元への制限写像の核・余核を有限かつ層によらず有界にします。この深い定理は局所点群の解析を要するのでここでは引用します。普通還元とは良い還元の上で幾何学的な $p$ 等分点が $p$ 個ある場合です。[標数とtorsionの構造](../../EC/EC4/index.md#thm-ec4-torsion-structure) のもう一方、1個の場合を超特異還元といい、この場合には通常の普通還元の控制をそのまま適用せず、符号付きSelmer群などの局所条件を使います。良い還元の意味は [良い還元・悪い還元](../../EC/EC9/index.md#def-ec9-good-reduction) を参照してください。

双対が有限生成である離散加群を余有限生成といいます。

上の普通還元の場合、底層の $p$ で消える部分群の有限性を次のように確認できます。

有限係数Selmer群の有限性は数体の有限分岐算術を用いる標準結果で、ここでは引用します。

[有限係数Selmer完全列](#thm-iwa18-selmer-exact) より $\operatorname{Sha}(E/\mathbb Q)[p]$ は有限です。

[Mordell–Weil定理](../../EC/EC6/index.md#thm-ec6-general-mw) により $E(\mathbb Q)\simeq\mathbb Z^r\oplus B$（$B$ は有限）なので、$E(\mathbb Q)\otimes\mathbb Q_p/\mathbb Z_p\simeq(\mathbb Q_p/\mathbb Z_p)^r$ です。

有限群の寄与が消えるのは、任意の分数を群の指数で割れるからです。

この左端の $p$ で消える部分は $(\mathbb Z/p)^r$ です。

第4節の極限完全列で底層のSelmer群の $p$ で消える部分を右端へ写すと像は有限、核もこの左端の部分群なので有限です。

控制写像の有限核・余核と合わせると $D[p]^\Gamma$ も有限です。

具体的に、像を $I$、核を $K$ とすると、$I[p]$ の元を持ち上げた元の $p$ 倍は $K$ に入り、$I[p]\to K/pK$ の核は底層の $p$ で消える群の像です。

従って $I[p]$ は有限。

さらに $D[p]^\Gamma/I[p]$ は有限な余核に単射します。

[有限生成判定](#thm-iwa18-finite-generation) から $X$ は有限生成です。

これは特徴イデアルを論じる第一段階であり、ねじれ性や主予想の等式は別の算術的主張です。

## 7. 2次コホモロジーと大域双対

局所条件を全て零にした場合、制限で消える大域の1次類がどの群と対応するかを知りたいと思います。その対応には2次コホモロジーが現れます。

連続な2変数写像 $z:G\times G\to A$ について、三つの群元を掛ける順序の整合性を表す条件を課します。1変数写像 $b$ のずれから作られる2変数写像を除いて商にします。

<a id="def-iwa18-h2"></a>

<!-- formal-statement-start -->
> **定義（連続2次群コホモロジー）**
> 射有限群 $G$ と連続な離散 $G$ 加群 $A$ に対し、連続写像 $z:G^2\to A$ で
>
$$
gz(h,k)-z(gh,k)+z(g,hk)-z(g,h)=0
$$
>
> を満たすものの加法群を $Z^2$ とする。連続写像 $b:G\to A$ に対し
>
$$
(db)(g,h)=gb(h)-b(gh)+b(g)
$$
>
> と書き、これらの像の群を $B^2$ とする。$H^2(G,A)=Z^2/B^2$ とする。
<!-- formal-statement-end -->

$z=db$ を条件式に代入すると $ghb(k),gb(hk),gb(h),b(ghk),b(gh),b(g)$ がそれぞれ正負1回ずつ現れて消えるので $B^2\subseteq Z^2$ です。制限はこれらの条件と像を保つため $H^2$ にも誘導されます。

<!-- definition-example-start: def-iwa18-h2 -->
**定義の確認**。位数2の群を $\{0,1\}$ の加法で表し、自明作用の $\mathbb Z/2\mathbb Z$ を係数とします。$z(g,h)=gh$（法2）とすれば条件の左辺は $hk+(g+h)k+g(h+k)+gh=0$ です。有限群なので連続です。もし $z=db$ なら $(0,0)$ で $b(0)=0$ が必要ですが、$(1,1)$ では $db(1,1)=2b(1)-b(0)=0$、$z(1,1)=1$ となり矛盾します。よって非零の2次類が得られます。
<!-- definition-example-end -->

奇素数 $p$ と有限 $p$ べきねじれ群 $A$ を固定し、ある $p^m$ が $A$ を消すとします。$\mu_{p^m}$ は代数閉包内の $p^m$ 乗単位根の群で、Galois群は根の置換で作用します。双対係数を $A^D=\operatorname{Hom}(A,\mu_{p^m})$ と置き、作用を $(g f)(a)=g(f(g^{-1}a))$ とします。値域にも作用する点が前節のPontryagin双対と異なります。次の核を区別します。

$$
K_S^i(F,A)=\ker\left(H^i(G_{F,S},A)
\to\prod_{v\in S}H^i(G_{F_v},A)\right).
$$

<a id="thm-iwa18-poitou-tate"></a>

<!-- formal-statement-start -->
> **定理（Poitou–Tate双対の核の対応）**
> $F$ は数体、$p$ は奇素数とする。$A$ は有限 $p$ べきねじれの連続Galois加群で、$p^mA=0$ とする。有限集合 $S$ は無限素点、$p$ の上の素点、$A$ の分岐する全素点を含むものとする。$A^D=\operatorname{Hom}(A,\mu_{p^m})$ を上記のGalois作用で取る。
>
> 各 $i=1,2$ に対し、局所制限の核の間に完全な双対性がある。特に有限群として
>
$$
K_S^1(F,A)\simeq K_S^2(F,A^D)^\vee.
$$
<!-- formal-statement-end -->

これは大域類体論と局所Tate双対を使う外部定理です。証明全体は Sharifi の [Duality in Galois cohomology, Theorem A.0.6](https://math.ucla.edu/~sharifi/notes/iwasawa-app-a.html) の参照先で扱われます。奇素数に限定したので実素点の高次の $p$ べきねじれコホモロジーは零です。$p=2$ を含める場合は無限素点のTateコホモロジーによる修正が必要です。$S$ は $p$ の上を含むので双対係数の作用も $G_{F,S}$ を経由します。

この定理の使い方は、例えば $K_S^2(F,A^D)$ が零なら $K_S^1(F,A)$ も零と判定することです。一方、右辺は大域 $H^2$ 全体ではなくその局所制限の核です。局所条件 $L_v=0$ のSelmer群とは直接対応しますが、楕円曲線の局所Kummer像は一般に零ではないため、[有限係数Selmer群](#def-iwa18-elliptic-selmer) の大きさをこの式だけで求めることはできません。局所条件を一般に変える場合は局所双対での直交補空間も変える必要があります。また無限塔では係数・体の極限と局所項の遷移写像を調べる必要があります。類群の $\mu=0$ から一般の $H^2$ の位数有界性が直ちに従うわけではありません。

## 8. 演習と詳細解答

<a id="ex-iwa18-a1"></a>

**A1. 巡回群のコサイクル**
- Level: A
- ID: IWA18-A1

位数3の巡回群が $A=\mathbb Z/7\mathbb Z$ に生成元 $s$ を通して $sa=2a$ と作用する。$H^1(G,A)$ を求めよ。

<!-- solution-start -->
**詳細解答。** $2^3\equiv1\bmod7$ なので作用は定義できます。[連続1次群コホモロジー](#def-iwa18-h1) の条件から $c(1)=0$、$c(s)=a$ とすると $c(s^2)=a+2a=3a$。$c(s^3)=3a+4a=7a=0$ で任意の $a$ が許されます。逆に指数を3で還元しても値が変わらないのでこの値はコサイクルを与えます。コバウンダリの生成元での値は $sb-b=2b-b=b$ で全ての $a$ が得られます。従って $H^1=0$ です。
<!-- solution-end -->

<a id="ex-iwa18-a2"></a>

**A2. 等分点の変更**
- Level: A
- ID: IWA18-A2

楕円曲線の点 $P\in E(F)$ に対し $nQ=P=nQ'$ とする。二つのずれが同じ1次類を与えることを示せ。

<!-- solution-start -->
**詳細解答。** $R=Q'-Q$ とすると $nR=P-P=O$ なので $R\in E[n]$。差は
$$
(gQ'-Q')-(gQ-Q)=gR-R.
$$
これは $E[n]$ 値のコバウンダリです。[Kummer写像](#def-iwa18-kummer) の定義により商では同じ類です。
<!-- solution-end -->

<a id="ex-iwa18-a3"></a>

**A3. 局所条件による選別**
- Level: A
- ID: IWA18-A3

大域群の模型を $\mathbb F_5^2$、局所制限を $r_1(x,y)=x+y$、$r_2(x,y)=y$ とする。局所条件を $(L_1,L_2)=(0,\mathbb F_5)$ とした場合と $(0,0)$ とした場合の核を求めよ。

<!-- solution-start -->
**詳細解答。** [局所条件付きSelmer群](#def-iwa18-local-selmer) の核の操作を用います。最初は $x+y=0$ のみ必要なので $(-y,y)$ の形、位数5。次はさらに $y=0$ なので $x=0$、位数1です。条件を強めると群が小さくなります。
<!-- solution-end -->

<a id="ex-iwa18-a4"></a>

**A4. 双対作用の逆元**
- Level: A
- ID: IWA18-A4

$p=5$、$D=\mathbb Z/25\mathbb Z$ とし $\gamma a=6a$ とする。双対の作用と $T$ の像、$X/TX$ を求めよ。

<!-- solution-start -->
**詳細解答。** $6\cdot21=126\equiv1\bmod25$ です。[Pontryagin双対](#def-iwa18-pontryagin) で $f_b(a)=ba/25+\mathbb Z_5$ と書くと $\gamma f_b=f_{21b}$。したがって $Tf_b=f_{20b}$ です。$20b$ の像は法25で5の倍数全体なので $TX$ は位数5、商は $\mathbb Z/5\mathbb Z$ です。$6a=a$ の条件は $5a=0$ だから $D^\Gamma$ も位数5で、[不変元と商の対応](#prop-iwa18-invariants) と一致します。
<!-- solution-end -->

<a id="ex-iwa18-b1"></a>

**B1. 有限係数からp無限係数へ**
- Level: B
- ID: IWA18-B1

点の群の模型 $M=\mathbb Z\oplus\mathbb Z/9\mathbb Z$ で $p=3$ とする。$M/3^mM$ の $[P]\mapsto[3P]$ による直極限を求めよ。

<!-- solution-start -->
**詳細解答。** 自由部分は $\mathbb Z/3^m\mathbb Z$。写像 $[a]\mapsto a/3^m+\mathbb Z_3$ は分母を上げても $3a/3^{m+1}=a/3^m$ なので整合し、全ての $3$ べき分母の類を尽くします。各段で単射なので極限は $\mathbb Q_3/\mathbb Z_3$ です。有限部分の商は $m\ge2$ で $\mathbb Z/9\mathbb Z$ になり、二段遷移で $9b=0$ となるため全ての元が極限で消えます。従って全体は $\mathbb Q_3/\mathbb Z_3$ です。有限位数点の寄与と $\operatorname{Sha}$ の寄与を同一視してはいけません。
<!-- solution-end -->

<a id="ex-iwa18-b2"></a>

**B2. 双対完全列の非分裂**
- Level: B
- ID: IWA18-B2

$0\to\mathbb Z/5\to\mathbb Z/25\to\mathbb Z/5\to0$ の左の写像を $a\mapsto5a$、右を法5の還元とする。双対列の二つの写像を求め、直和分解にならない理由を述べよ。

<!-- solution-start -->
**詳細解答。** 双対をそれぞれ分母5、25、5の分数で表示します。[双対完全性](#thm-iwa18-dual-exact) に従い右の還元の双対は $b/5$ を $5b/25$ に送るので $b\mapsto5b$ です。左の包含の双対は $c(5a)/25=ca/5$ より $c\mapsto c\bmod5$ です。核は $5$ の倍数で像と一致します。しかし中央群には位数25の元がある一方、$\mathbb Z/5\oplus\mathbb Z/5$ の全元は5倍で零になります。完全であることと分裂することは異なります。
<!-- solution-end -->

<a id="ex-iwa18-b3"></a>

**B3. 2次コサイクルの境界**
- Level: B
- ID: IWA18-B3

位数3の巡回群を $\{0,1,2\}$ の法3の加法とし、自明作用の $\mathbb F_3$ を係数とする。$z(g,h)=\lfloor(g+h)/3\rfloor$ が2次コサイクルでコバウンダリでないことを示せ。

<!-- solution-start -->
**詳細解答。** $[g+h]_3$ を法3の代表とすると $g+h=[g+h]_3+3z(g,h)$。三つの和を左から足す場合、
$$
g+h+k=[g+h+k]_3+3\{z(g,h)+z([g+h]_3,k)\}.
$$
右から足す場合も同じ整数の和なので中括弧の値が一致します。これは [連続2次群コホモロジー](#def-iwa18-h2) の条件です。もし $z=db$ なら $z(0,0)=0$ より $b(0)=0$。$g=0,1,2$、$h=1$ について和を取ると左辺の和は $0+0+1=1$。右辺は
$$
\sum_{g=0}^2(b(1)-b([g+1]_3)+b(g))=3b(1)=0
$$
となって矛盾します。
<!-- solution-end -->

<a id="ex-iwa18-b4"></a>

**B4. 大域双対の適用範囲**
- Level: B
- ID: IWA18-B4

奇素数 $p$ と有限係数 $A$、必要な分岐集合 $S$ について、大域 $H^2(G_{F,S},A^D)$ の位数が $p^5$、局所制限の像の位数が $p^2$ とする。零局所条件のSelmer群の位数を求め、局所像の位数を知らない場合とKummer条件の場合も説明せよ。

<!-- solution-start -->
**詳細解答。** 制限の核の位数は $p^5/p^2=p^3$ です。[Poitou–Tate双対](#thm-iwa18-poitou-tate) により $K_S^1(F,A)$ はその双対で、有限Abel $p$ 群の双対は巡回因子ごとに同じ位数を持つので位数は $p^3$。局所像の位数が不明なら大域群の位数からは上界 $p^5$ しか得られません。Kummer像を許す条件は零局所条件より弱く、核の双対のこの式ではその余分な類を計算していません。
<!-- solution-end -->

<a id="ex-iwa18-c1"></a>

**C1. 有限生成とねじれ性を分離する**
- Level: C
- ID: IWA18-C1

$p=3$、$\Gamma\simeq\mathbb Z_3$ とし、離散群 $D$ が連続作用を持つとする。$D^\Gamma\simeq(\mathbb Z/9)^2$ という模型を考える。

1. $D[3]^\Gamma$ と双対 $X$ の $X/(3X+TX)$ を求めよ。
2. $X$ の有限生成性とねじれ性を判定せよ。
3. これらの結果だけから $X$ の特徴イデアルを一意に決定できるか。$X_1=(\Lambda/(T-9))^2$ と $X_2=(\Lambda/(T+9))^2$ の $T$ 商と特徴イデアルを比較せよ。

<!-- solution-start -->
**詳細解答。** $D[3]^\Gamma=(D^\Gamma)[3]$ なので各 $\mathbb Z/9$ で3の倍数を選び $(\mathbb Z/3)^2$ です。[有限生成判定](#thm-iwa18-finite-generation) の証明中の同型により
$$
X/(3X+TX)\simeq(\mathbb Z/3)^2.
$$
二つの基底の持ち上げが $X$ を生成し、1元では法 $(3,T)$ の商が2次元にならないため最小生成元数は2です。[不変元と商の対応](#prop-iwa18-invariants) により $X/TX\simeq(\mathbb Z/9)^2$ は有限です。有限生成性とこの有限性を確認したので [有限なT商からtorsionを導く命題](../IWA5/index.md#prop-iwa5-finite-coinvariants) によりねじれ性が成立します。

しかし $X_1/TX_1=(\Lambda/(T,T-9))^2=(\mathbb Z/9)^2$ で、$X_2$ でも $(T,T+9)=(T,9)$ となり同じ商です。各直和の特徴イデアルは [特徴イデアル](../IWA6/index.md#def-iwa6-characteristic) によりそれぞれ $((T-9)^2)$ と $((T+9)^2)$ です。二つは一致しません。$T=9$ で評価すれば前者は零、後者は $18^2$ で非零です。$9$ は3進絶対値が1未満なので冪級数の評価が収束します。従って有限層の一つの商の情報は主予想の等式に必要な特徴イデアルを決定しません。
<!-- solution-end -->

## 9. 次章へ

局所Kummer像は大域点の情報を残しながら、局所では点で説明できる類を選びます。その双対は岩澤代数上のコンパクト加群となり、有限生成性、ねじれ性、特徴イデアルを順に調べる対象になります。次講 IWA19 では複素乗法を持つ楕円曲線の追加の対称性から、Hecke指標と $p$ 進L関数への接続を学びます。

## 参考文献

- Romyar Sharifi, [Iwasawa Theory, §2.5–2.6](https://math.ucla.edu/~sharifi/notes/iwasawa-ch02.html), Pontryagin双対と作用の反転。
- 同 [Appendix A](https://math.ucla.edu/~sharifi/notes/iwasawa-app-a.html), 局所・大域双対の適用条件。
- Ralph Greenberg, [The structure of Selmer groups](https://pmc.ncbi.nlm.nih.gov/articles/PMC34504/), 岩澤理論での局所条件と双対加群。
- Francesc Castella, [On the Iwasawa theory of elliptic curves at Eisenstein primes](https://web.math.ucsb.edu/~castella/ICTS.pdf), §1、控制定理と有限生成性。
