# CATB5-10 siteの比較と層の幾何

<!-- definition-example-audit: strict -->

## 1. 局所データの取り方を変える

前講では[幾何学的射](../CATB5-09/index.md#def-catb5-09-geometric-morphism)を使って異なる層圏を結んだ。今講では、一つの空間を記述する局所データの取り方を変えても、層の情報が失われない条件を探す。

例えば実数直線のすべての開集合の代わりに、有理数を端点とする開区間だけで関数の切断を記録したい。どの開集合もそのような区間で覆われ、二つの区間の重なりも小さい区間で調べられる。貼り合わせの存在と一意性があれば、記録しなかった開集合の切断も復元できそうである。

この考え方を、開集合の包含以外にも射を持つ圏で実行する。以下、小さい圏上の集合値層を扱う。合成は右から左に書き、前層 $F$ の射 $u:e\to c$ に沿う制限を $F(u):F(c)\to F(e)$ と書く。

## 2. 部分圏の対象だけで局所的に覆う

$(\mathcal C,J)$ を[site](../CATB5-02/index.md#def-catb5-02-grothendieck-topology)とする。$\mathcal D$ は $\mathcal C$ の充満部分圏、すなわち選んだ対象間の射をすべて残す部分圏とする。各対象 $c$ に対し、$\mathcal D$ の対象を始域とするすべての射 $d\to c$ が生成する篩を $H_c$ と書く。[生成篩](../CATB5-02/index.md#def-catb5-02-generated-sieve)の定義から、その元はそのような射を経由する射である。

<a id="def-catb5-10-dense"></a>

<!-- formal-statement-start -->
> **定義（被覆に関する稠密部分圏）**
>
> 小さいsite $(\mathcal C,J)$ の充満部分圏 $\mathcal D$ が被覆に関して稠密であるとは、すべての対象 $c$ に対し、$\mathcal D$ の対象から $c$ への射全体が生成する篩 $H_c$ が $J(c)$ に属することをいう。個々の射がエピ射であるという条件ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb5-10-dense -->
**定義の確認**。離散二点空間 $X=\{p,q\}$ の開集合圏を $\mathcal C$、単点二つだけの充満部分圏を $\mathcal D$ とする。二単点の間には恒等射しかない。$X$ への二つの単点包含が生成する篩は単点と空集合からの包含を含み、それらの合併は $X$ である。各単点では恒等射が篩を生成するので最大篩になる。空集合では生成篩は空だが、その合併は空集合である。[開集合圏のGrothendieck位相](../CATB5-02/index.md#thm-catb5-02-open-site)により四つの対象すべてで被覆条件が成立する。従って $\mathcal D$ は稠密である。
<!-- definition-example-end -->

対象 $c$ 上の一般の篩 $S$ に対して、始域が $\mathcal D$ に属する射だけを残した族を $S_{\mathcal D}$ とする。その生成篩を $\langle S_{\mathcal D}\rangle_{\mathcal C}$ と書く。

<a id="lem-catb5-10-cover-detection"></a>

<!-- formal-statement-start -->
> **補題（稠密部分圏による被覆判定）**
>
> 小さいsite $(\mathcal C,J)$ の稠密充満部分圏 $\mathcal D$ と対象 $c$ 上の篩 $S$ に対し、
 
$$
S\in J(c)
\iff
\langle S_{\mathcal D}\rangle_{\mathcal C}\in J(c).
$$
<!-- formal-statement-end -->

証明の核心は、$S$ の射の始域をさらに $\mathcal D$ の対象で覆えば、合成射がすべて $S_{\mathcal D}$ に入ることである。

<!-- proof-start -->
### 証明

$T=\langle S_{\mathcal D}\rangle_{\mathcal C}$ と置く。$S$ は篩だから $T\subseteq S$ であり、$T$ が被覆なら[被覆篩の上方閉性](../CATB5-02/index.md#prop-catb5-02-cover-closure)から $S$ も被覆である。

逆に $S\in J(c)$ とする。

任意の $S$ に属する $f:e\to c$ に対し、任意の $d\in\mathcal D$ を満たす $h:d\to e$ について $fh\in S_{\mathcal D}$ である。

従って[篩の引き戻し](../CATB5-02/index.md#def-catb5-02-sieve-pullback) $f^*T$ は $H_e$ を含む。

稠密性により $H_e\in J(e)$ なので、上方閉性から $f^*T\in J(e)$ となる。

$S$ は被覆であり、そのすべての射に沿う $T$ の引き戻しが被覆なので、[Grothendieck位相の推移性](../CATB5-02/index.md#def-catb5-02-grothendieck-topology)を $S,T$ に適用して $T\in J(c)$ を得る。
<!-- proof-end -->

## 3. 部分圏にも被覆を入れる

$\mathcal D$ の対象 $d$ 上の篩 $R$ は、$\mathcal C$ で見れば必ずしも篩ではない。$\mathcal D$ の外から来る射でも前合成できるように、$\mathcal C$ 内で生成する篩を取って被覆かどうかを判定する。

<a id="def-catb5-10-induced"></a>

<!-- formal-statement-start -->
> **定義（稠密部分圏の誘導被覆）**
>
> 小さいsite $(\mathcal C,J)$ の稠密充満部分圏 $\mathcal D$ に対し、対象 $d\in\mathcal D$ 上の $\mathcal D$ の篩 $R$ を誘導被覆とする条件を

$$
R\in J_{\mathcal D}(d)
\iff
\langle R\rangle_{\mathcal C}\in J(d)
$$

> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb5-10-induced -->
**定義の確認**。前節の離散二点空間の $\mathcal D$ では、各単点の篩は空篩か恒等射を含む最大篩だけである。空篩は $\mathcal C$ でも空篩を生成し、非空の単点を覆わない。最大篩は $\mathcal C$ で恒等射を含むから、空集合からの包含も含む最大篩を生成して被覆となる。従って各対象の誘導被覆は最大篩だけである。
<!-- definition-example-end -->

<a id="prop-catb5-10-induced-topology"></a>

<!-- formal-statement-start -->
> **命題（誘導被覆のGrothendieck位相性）**
>
> 小さいsite $(\mathcal C,J)$ の稠密充満部分圏 $\mathcal D$ 上で、誘導被覆 $J_{\mathcal D}$ はGrothendieck位相となる。
<!-- formal-statement-end -->

充満性は、$\mathcal C$ で生成した篩を $\mathcal D$ に戻すと元の篩に一致することを保証する。

<!-- proof-start -->
### 証明

$\mathcal D$ の篩 $R$ について、$\langle R\rangle_{\mathcal C}$ のうち始域が $\mathcal D$ にある射はちょうど $R$ である。実際、$v=ru$ と表せて $r\in R$、$v$ の始域も $\mathcal D$ に属するなら、充満性により $u$ は $\mathcal D$ の射である。従って $v\in R$ である。逆包含は恒等射による分解から従う。

最大篩は恒等射を含むから $\mathcal C$ の最大篩を生成し、被覆となる。

次に $R\in J_{\mathcal D}(d)$ と $\mathcal D$ に属する $a:b\to d$ を取る。$T=\langle R\rangle_{\mathcal C}$ とすると、$a^*T\in J(b)$ である。始域が $\mathcal D$ の射 $k$ に対して

$$
k\in a^*T \iff ak\in T \iff ak\in R
\iff k\in a^*R.
$$

最後の篩は $\mathcal D$ 内で取る。[被覆判定補題](#lem-catb5-10-cover-detection)を $a^*T$ に適用すると、$\langle a^*R\rangle_{\mathcal C}\in J(b)$ となり、引き戻し安定性が従う。

推移性について、$R\in J_{\mathcal D}(d)$ と $d$ 上の篩 $Q$ を取り、すべての $R$ に属する $r:b\to d$ について $r^*Q\in J_{\mathcal D}(b)$ と仮定する。$\langle r^*Q\rangle_{\mathcal C}$ は $r^*\langle Q\rangle_{\mathcal C}$ に含まれるため、後者も被覆である。任意の $\langle R\rangle_{\mathcal C}$ に属する $f:e\to d$ は $f=ru$ と分解する。[篩の引き戻しの合成則](../CATB5-02/index.md#prop-catb5-02-sieve-pullback-laws)から

$$
f^*\langle Q\rangle_{\mathcal C}
=u^*(r^*\langle Q\rangle_{\mathcal C})
\in J(e).
$$

$\langle R\rangle_{\mathcal C}$ が被覆なので、$\mathcal C$ における推移性により $\langle Q\rangle_{\mathcal C}\in J(d)$ となる。よって $Q\in J_{\mathcal D}(d)$ であり、三公理が成立した。
<!-- proof-end -->

## 4. 制限と延長を組み立てる

$\operatorname{Sh}(\mathcal C,J)$ の対象 $F$ を $\mathcal D$ に制限する。逆向きには、$\mathcal D$ 上の層 $G$ から、各 $c$ への $\mathcal D$ の射に沿う整合族を作る。

<a id="def-catb5-10-extension"></a>

<!-- formal-statement-start -->
> **定義（部分siteからの整合族による延長）**
>
> 小さいsite $(\mathcal C,J)$ の稠密充満部分圏 $\mathcal D$ とその誘導位相上の集合値層 $G$ に対し、前層 $EG$ の $c$ での値を、各射 $d\in\mathcal D$ を満たす $f:d\to c$ に対する元 $x_f\in G(d)$ の族で、すべての $\mathcal D$ の射 $h:b\to d$ について

$$
G(h)x_f=x_{fh}
$$

> を満たすものの集合とする。射 $u:e\to c$ に沿う制限は $(x_f)_f$ を $(x_{ug})_g$ に送る。ただし $g:b\to e$ は $\mathcal D$ の対象を始域とする射を走る。層の射 $\alpha:G\to G'$ に対しては各成分に $\alpha_d$ を作用させる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb5-10-extension -->
**定義の確認**。離散二点空間の部分圏に $G(\{p\})=A$、$G(\{q\})=B$ を置く。被覆が最大篩だけなので任意の集合の対が層になる。各単点への $\mathcal D$ の射は恒等射だけで、全体 $X$ には二つの包含がある。$\mathcal D$ の非恒等射がないので整合条件は恒等写像の条件だけである。

$$
EG(\{p\})=A,\quad EG(\{q\})=B,
$$

$$
EG(X)=A\times B,\quad EG(\varnothing)=1.
$$

空の添字集合上の族は空族一つだけなので最後の値は一元集合である。全体からの制限は二つの射影、空集合への制限は唯一の写像であり、合成と両立する。成分ごとの写像の対 $(a:A\to A',b:B\to B')$ は全体で $(x,y)\mapsto(a(x),b(y))$ を誘導し、射影との自然性も満たす。
<!-- definition-example-end -->

一般の場合、制限した族の整合性は $G(h)x_{ug}=x_{ugh}$ から従う。二回制限すれば添字は $uvg$ になるので合成を保存し、恒等射では添字が変わらない。$\alpha$ の自然性から成分ごとの作用も整合条件を保存し、制限と交換する。従って $E$ は前層への関手を与える。

<a id="prop-catb5-10-restriction"></a>

<!-- formal-statement-start -->
> **命題（稠密部分siteへの制限）**
>
> 小さいsite $(\mathcal C,J)$ の稠密充満部分圏 $\mathcal D$ に対し、集合値層の制限は誘導位相上の層となる。従って制限は関手

$$
R:\operatorname{Sh}(\mathcal C,J)\to
\operatorname{Sh}(\mathcal D,J_{\mathcal D})
$$

> を与える。
<!-- formal-statement-end -->

部分圏で整合している切断を、生成篩のすべての射に沿って延ばす。異なる分解が与える切断の一致は、さらに稠密被覆へ制限して確かめる。

<!-- proof-start -->
### 証明

$F$ を $\mathcal C$ 上の層、$T\in J_{\mathcal D}(d)$、$(s_t)_{t\in T}$ を $RF$ の整合族とする。$\langle T\rangle_{\mathcal C}$ に属する $v:e\to d$ を $v=tu$ と分解し、候補を $s_v=F(u)s_t$ と置く。

別の分解 $v=t'u'$ があるとする。任意の $b\in\mathcal D$ を満たす $h:b\to e$ に対し、充満性から $uh,u'h$ は $\mathcal D$ の射なので

$$
F(h)F(u)s_t=s_{tuh}=s_{t'u'h}
=F(h)F(u')s_{t'}.
$$

両切断は $H_e$ の生成射上で一致し、さらに前合成したすべての射上でも一致する。$H_e$ が被覆であるため、[site上の層の一意性](../CATB5-03/index.md#def-catb5-03-site-sheaf)から $F(u)s_t=F(u')s_{t'}$ となる。

$v$ をさらに $k$ と前合成すると $vk=t(uk)$ だから

$$
s_{vk}=F(uk)s_t=F(k)s_v.
$$

こうして生成篩上の整合族が得られる。生成篩は誘導被覆の定義により被覆なので、$F$ の層条件から $s\in F(d)$ が一意に得られる。元の $t\in T$ では $u$ を恒等射に取れるため $F(t)s=s_t$ である。別の貼り合わせも生成篩上で同じ制限を持つので一致する。射の制限は自然性・恒等射・合成をそのまま保つ。
<!-- proof-end -->

<a id="prop-catb5-10-extension-sheaf"></a>

<!-- formal-statement-start -->
> **命題（整合族による延長の層性）**
>
> 小さいsite $(\mathcal C,J)$ の稠密充満部分圏 $\mathcal D$ の誘導位相上の集合値層 $G$ に対し、整合族による延長 $EG$ は $\mathcal C$ 上の層である。
<!-- formal-statement-end -->

被覆上の $EG$ の局所切断を貼るため、まず任意の $f:d\to c$ に沿って $G(d)$ の元を復元する。$f$ 自身が被覆篩に含まれなくても、$f$ を十分細かい射で前合成すれば被覆篩に入る。

<!-- proof-start -->
### 証明

$S\in J(c)$ と $EG$ の整合族 $(z_v)_{v\in S}$ を取る。$v:e\to c$ なら $z_v\in EG(e)$ であり、$z_v$ の成分を $(z_v)_g$ と書く。

各 $d\in\mathcal D$ を満たす $f:d\to c$ について $\mathcal D$ の篩

$$
T_f=\{h:b\to d\text{ in }\mathcal D\mid fh\in S\}
$$

を取る。前合成で閉じている。$f^*S\in J(d)$ であり、$T_f$ はその $\mathcal D$ に属する始域の射の族だから、[被覆判定補題](#lem-catb5-10-cover-detection)より $T_f\in J_{\mathcal D}(d)$ となる。

$T_f$ に属する $h:b\to d$ に対し

$$
y_h=(z_{fh})_{1_b}\in G(b)
$$

と定める。$\mathcal D$ に属する $k:a\to b$ に対し、$z_{fh}$ 自身の成分の整合性と $(z_v)$ の整合性を順に使うと

$$
G(k)y_h=(z_{fh})_k
=(z_{fhk})_{1_a}=y_{hk}.
$$

従って $G$ の[層条件](../CATB5-03/index.md#def-catb5-03-site-sheaf)で $x_f\in G(d)$ が一意に存在し、すべての $h\in T_f$ について $G(h)x_f=y_h$ となる。

次に $\mathcal D$ に属する $l:b\to d$ を取る。$T_{fl}$ に属する $k:a\to b$ なら $lk\in T_f$ だから

$$
G(k)G(l)x_f=G(lk)x_f=(z_{flk})_{1_a}.
$$

右辺は $G(k)x_{fl}$ にも等しい。$T_{fl}$ が被覆であることによる一意性から $G(l)x_f=x_{fl}$ となり、$x=(x_f)_f\in EG(c)$ が得られる。

$S$ に属する $v:e\to c$ と $b\in\mathcal D$ を満たす $g:b\to e$ に対して $vg\in S$ なので、$1_b\in T_{vg}$ である。よって

$$
x_{vg}=(z_{vg})_{1_b}=(z_v)_g.
$$

これは $EG(v)x=z_v$ を成分ごとに示している。最後に別の貼り合わせ $x'$ があれば、各 $h\in T_f$ について

$$
G(h)x'_f=x'_{fh}=(z_{fh})_{1_b}.
$$

$T_f$ 上での一意性から $x'_f=x_f$ が全成分で成立する。空被覆の場合にも $T_f$ が空の被覆なら $G(d)$ の切断が一意になるため、同じ論証が成立する。従って $EG$ は層である。
<!-- proof-end -->

## 5. 稠密充満部分siteの比較定理

制限と延長が互いに逆になることを示すには、切断の集合が一致するだけでなく、各制限写像および層の射に対して自然であることまで確かめる。

<a id="thm-catb5-10-comparison"></a>

<!-- formal-statement-start -->
> **定理（稠密充満部分siteの比較定理）**
>
> 小さいsite $(\mathcal C,J)$ と被覆に関して稠密な充満部分圏 $\mathcal D$ に対し、誘導位相 $J_{\mathcal D}$ を入れると、層の制限関手 $R$ と整合族による延長関手 $E$ は互いに逆の圏同値を与える。

$$
\operatorname{Sh}(\mathcal C,J)
\simeq
\operatorname{Sh}(\mathcal D,J_{\mathcal D}).
$$
<!-- formal-statement-end -->

$\mathcal D$ の対象では恒等射の成分を取り出せば元に戻る。$\mathcal C$ の一般の対象では稠密被覆上の整合族を貼れば元に戻る。この二つの復元操作が証明の核心である。

<!-- proof-start -->
### 証明

[制限の層性](#prop-catb5-10-restriction)と[延長の層性](#prop-catb5-10-extension-sheaf)から $R,E$ は層圏間の関手である。

まず $\mathcal D$ 上の層 $G$ に対し、各 $d\in\mathcal D$ で

$$
(REG)(d)\to G(d),\qquad
x\mapsto x_{1_d}
$$

とする。逆向きには $s\in G(d)$ を族 $(G(f)s)_f$ に送る。充満性により添字 $f:b\to d$ はすべて $\mathcal D$ の射であり、反変関手の合成則からこの族は整合する。恒等射の成分は $s$ であり、整合族では $x_f=G(f)x_{1_d}$ だから互いに逆である。射 $h:b\to d$ に沿う制限の後で恒等射成分を取ると $x_h=G(h)x_{1_d}$ となる。さらに層の射 $\alpha:G\to G'$ に対して恒等射成分は $\alpha_d(x_{1_d})$ に写る。従って $RE\cong 1$ は自然である。

次に $\mathcal C$ 上の層 $F$ に対して

$$
\eta_c:F(c)\to ERF(c),\qquad
s\mapsto(F(f)s)_f
$$

と定める。制限の合成則により整合族になる。単射性は、二つの切断が $\mathcal D$ の対象を始域とするすべての射で一致すれば生成篩 $H_c$ 全体で一致し、稠密性による層の一意性から等しいことによる。

全射性を示す。$x\in ERF(c)$ を取り、$H_c$ に属する $v:e\to c$ を $v=fu$ と分解する。ただし $d\in\mathcal D$ を満たす $f:d\to c$ とする。$s_v=F(u)x_f$ と置く。別分解 $v=f'u'$ について任意の $b\in\mathcal D$ を満たす $h:b\to e$ に制限すれば

$$
F(h)s_v=x_{fuh}=x_{f'u'h}.
$$

ここで $uh,u'h$ は充満性から $\mathcal D$ の射であり、$x$ の整合性を使った。$H_e$ 上での一意性から $s_v$ は分解によらない。さらに $s_{vk}=F(k)s_v$ なので $H_c$ 上の整合族となる。$H_c$ は被覆だから一意な $s\in F(c)$ が存在する。$v=f$ では $u=1_d$ と取れるため $F(f)s=x_f$ であり、$\eta_c(s)=x$ となる。

$u:e\to c$ に関して、$\eta_e(F(u)s)$ の $g:b\to e$ 成分は $F(g)F(u)s=F(ug)s$ である。これは $\eta_c(s)$ の制限の成分と等しい。層の射 $\beta:F\to F'$ についても自然性から

$$
\beta_d(F(f)s)=F'(f)\beta_c(s)
$$

となるので $\eta:1\to ER$ は層の射に関して自然である。各成分が全単射だから自然同型である。二つの自然同型により圏同値を得る。
<!-- proof-end -->

## 6. 開集合の基底とトポスの表示

位相空間 $X$ の基底 $\mathcal B$ は、各開集合がその中に含まれる基底開集合の合併となる開集合の族である。基底は有限交差で閉じている必要はない。二つの基底開集合の共通部分に属する各点は、その共通部分内の基底開集合に含まれるからである。

<a id="cor-catb5-10-basis"></a>

<!-- formal-statement-start -->
> **系（開集合の基底による層圏の表示）**
>
> 位相空間 $X$ の基底 $\mathcal B$ を包含射の圏とし、合併が対象に一致する篩を被覆とする位相 $J_{\mathcal B}$ を入れる。このとき制限は圏同値

$$
\operatorname{Sh}(X)\simeq
\operatorname{Sh}(\mathcal B,J_{\mathcal B})
$$

> を与える。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\mathcal C=\mathcal O(X)$ とする。[開集合圏のGrothendieck位相](../CATB5-02/index.md#thm-catb5-02-open-site)では篩が被覆である条件は、その始域の開集合の合併が対象開集合に等しいことである。$\mathcal B$ は充満で、任意の開集合 $U$ がその中の基底開集合の合併なので稠密である。空集合も空合併で覆える。

$\mathcal B$ の篩 $T$ が $\mathcal C$ で生成する篩の始域は、$T$ に属する基底開集合の部分開集合すべてである。従ってその合併は $T$ の始域の合併と等しい。誘導位相の被覆条件は上記の合併条件と一致する。[稠密充満部分siteの比較定理](#thm-catb5-10-comparison)を適用し、[開集合圏の層条件との同値性](../CATB5-03/index.md#thm-catb5-03-open-equivalence)を使えば結論を得る。
<!-- proof-end -->

例えば離散三点空間では全開集合の圏は八対象、単点基底の圏は三対象であり、これらの圏自体は同値でない。包含の圏では異なる対象は同型でないので、対象の同型類の数が異なるからである。しかし層圏はいずれも集合の三つ組の圏に同値であり、任意の開集合 $U$ の切断は単点の切断の直積になる。

稠密性を落とすと、離散二点空間から $\{p\}$ だけを残した場合のように、$q$ の情報が消える。$p$ で一元集合、$q$ で一元集合または二元集合を取る二つの層は同型でないが、制限先では同じ層となる。$q$ への射が残らず $H_{\{q\}}$ が被覆でないため、比較定理の一意復元が破れる。

[Grothendieckトポス](../CATB5-07/index.md#def-catb5-07-grothendieck-topos)はあるsiteの層圏と同値な圏である。

今講の比較定理は、siteがそのトポスの表示の一つであり、表示自体は一意とは限らないことを示す。

圏同値は有限極限を保存する。

実際、極限錐に向かう射の普遍性は、同値関手がHom集合の全単射を与え、すべての対象が像と同型であることから移送される。

また $EG$ から $F$ への層の射 $\phi$ に $R\phi$ と $G\cong REG$ の合成を対応させると、$G\to RF$ への自然な全単射が得られる。

逆対応は $\psi:G\to RF$ に $E\psi$ と $ERF\cong F$ の合成を取ることである。

恒等射成分と制限成分の復元式から二つの対応は互いに逆となる。

従って $E$ を逆像、$R$ を直像とする[幾何学的射](../CATB5-09/index.md#def-catb5-09-geometric-morphism)は圏同値を与える。

これがsiteの変更を層の幾何の変更と区別する理由である。

## 7. 演習と詳細解答

### CATB5-10-A01 稠密性の判定

- Level: A

離散三点空間の開集合圏から単点三つだけを取る。稠密性を示し、空集合と二点集合の $H_U$ を具体的に書け。

<!-- solution-start -->
**詳細解答**

$U=\varnothing$ では単点からの包含が存在せず $H_U$ は空篩である。

空合併は空集合なので被覆である。

$U=\{p,q\}$ では二つの単点包含が生成射であり、前合成によって空集合からの包含も入る。

始域の合併は $\{p,q\}$ となる。

任意の非空の $U$ でも $U$ 内の単点の合併が $U$ となるため、[開集合圏の被覆条件](../CATB5-02/index.md#thm-catb5-02-open-site)により $H_U$ は被覆である。

部分圏は包含射をすべて残すので充満であり、[稠密性](#def-catb5-10-dense)を満たす。
<!-- solution-end -->

### CATB5-10-A02 誘導位相

- Level: A

離散二点空間の単点基底において、各対象のすべての篩と被覆篩を列挙せよ。そのsiteの任意の前層が層になることを示せ。

<!-- solution-start -->
**詳細解答**

各単点 $d$ へ入る部分圏の射は $1_d$ のみなので篩は $\varnothing$ と $\{1_d\}$ の二つである。[誘導被覆](#def-catb5-10-induced)に従い生成篩を元の開集合圏で取ると、前者は空篩のまま、後者は空集合からの包含と恒等射を含む最大篩である。後者だけが非空の $d$ を覆う。

最大篩上の整合族は恒等射での元一つであり、制限写像は恒等写像である。従って任意の集合 $G(d)$ の任意の元が一意に貼られる。[site上の層条件](../CATB5-03/index.md#def-catb5-03-site-sheaf)を満たすので任意の前層が層になる。
<!-- solution-end -->

### CATB5-10-A03 延長の切断と射

- Level: A

離散三点空間の単点基底で切断集合を $A=\{0,1\}$、$B=\{a,b,c\}$、$C=\{*\}$ とする。延長した層の全体と $\{p,r\}$ および空集合での切断数、対応する制限写像を求めよ。

<!-- solution-start -->
**詳細解答**

[整合族による延長](#def-catb5-10-extension)では全体への三つの単点包含が添字となり、恒等射以外の整合条件がない。従って

$$
EG(X)=A\times B\times C,\qquad
EG(\{p,r\})=A\times C.
$$

空集合には添字がなく、空族一つなので $EG(\varnothing)=1$ である。切断数は順に $2\cdot3\cdot1=6$、$2\cdot1=2$、$1$ である。全体から $\{p,r\}$ への制限は $(x,y,z)\mapsto(x,z)$、空集合への制限は唯一の写像となる。
<!-- solution-end -->

### CATB5-10-A04 非稠密な部分圏

- Level: A

離散二点空間で $\mathcal D$ を単点 $\{p\}$ のみとする。稠密でないことを示し、制限が忠実でないことを層の射で示せ。

<!-- solution-start -->
**詳細解答**

$\{q\}$ への $\{p\}$ からの包含が存在せず、$H_{\{q\}}$ は空篩である。合併が $\{q\}$ にならないので被覆ではなく、稠密性が失われる。

$p$ で一元集合、$q$ で二元集合 $\{0,1\}$ を取る層 $F$ を考える。全開集合の切断は単点の切断の直積として構成する。$F$ の恒等射と、$p$ で恒等写像、$q$ で定値写像 $0$ を取る射は、全体で成分ごとの写像を使えば制限と交換する。二射は $q$ で異なるが、$p$ のみへの制限は同じである。従って制限はHom集合上で単射ではなく、忠実でない。
<!-- solution-end -->

### CATB5-10-B01 基底の交差を細分する

- Level: B

$X=\{1,2,3,4\}$ を離散空間とする。全単点と $U=\{1,2,3\}$、$V=\{2,3,4\}$ からなる基底を取る。$U\cap V$ が基底に属さないことを確かめ、基底上の層 $G$ の $U,V$ での切断 $s,t$ が $X$ に貼れるための必要十分条件を示せ。

<!-- solution-start -->
**詳細解答**

共通部分は $\{2,3\}$ であり、列挙した基底の元に含まれない。しかし各単点が基底に属するので共通部分は $\{2\}$ と $\{3\}$ で覆われる。

必要性は、全体からの切断を $U,V$ へ制限した後に各単点へ制限すると、どちらも全体から単点への制限と一致することによる。従って条件は

$$
s|_{\{2\}}=t|_{\{2\}},\qquad
s|_{\{3\}}=t|_{\{3\}}
$$

である。十分性について、単点四つで順に $s|_{\{1\}},s|_{\{2\}},s|_{\{3\}},t|_{\{4\}}$ を選ぶ。上の一致条件により $V$ の単点制限もこの族と一致する。

基底内の他の対象は $U,V$ だけであるため、これらには $s,t$ を割り当てればすべての包含射に関する整合条件を満たす。[延長](#def-catb5-10-extension)により一つの $EG(X)$ の元となる。別の元が同じ $s,t$ に制限されるなら、全単点成分もその制限で決まり、全成分が一致する。従って貼り合わせは一意である。
<!-- solution-end -->

### CATB5-10-B02 被覆判定と中間対象

- Level: B

小さいsiteの稠密充満部分圏を $\mathcal D$ とする。対象 $c$ 上の任意の被覆篩 $S$ と任意の $S$ に属する $v:e\to c$ に対し、$\mathcal D$ の対象から $e$ への射を使って $v^*\langle S_{\mathcal D}\rangle_{\mathcal C}$ が被覆であることを示せ。

<!-- solution-start -->
**詳細解答**

任意の $d\in\mathcal D$ を満たす $h:d\to e$ を取る。$S$ は篩だから $vh\in S$ であり、始域 $d$ が $\mathcal D$ にあるため $vh\in S_{\mathcal D}$ となる。[篩の引き戻し](../CATB5-02/index.md#def-catb5-02-sieve-pullback)の定義から

$$
h\in v^*\langle S_{\mathcal D}\rangle_{\mathcal C}.
$$

この引き戻しは篩なので、そのような $h$ を生成射とする $H_e$ 全体を含む。稠密性から $H_e\in J(e)$ であり、[被覆篩の上方閉性](../CATB5-02/index.md#prop-catb5-02-cover-closure)により求める引き戻しも $J(e)$ に属する。ここでは $e$ 自身が $\mathcal D$ に属するとは仮定していない。
<!-- solution-end -->

### CATB5-10-B03 二つの分解の独立性

- Level: B

稠密充満部分圏 $\mathcal D$ と $\mathcal C$ 上の層 $F$ を取る。$x\in ERF(c)$ と射 $v:e\to c$ が二つの分解 $v=fu=f'u'$ を持ち、$f,f'$ の始域が $\mathcal D$ に属するとする。$F(u)x_f$ と $F(u')x_{f'}$ が等しいことを示せ。どの仮定が一意性に必要か。

<!-- solution-start -->
**詳細解答**

任意の $b\in\mathcal D$ を満たす $h:b\to e$ を取る。$uh,u'h$ は始域と終域が $\mathcal D$ に属し、充満性からその射である。$x$ の[整合条件](#def-catb5-10-extension)と反変関手の合成則により

$$
F(h)F(u)x_f=F(uh)x_f=x_{fuh},
$$

$$
F(h)F(u')x_{f'}=F(u'h)x_{f'}=x_{f'u'h}.
$$

$fuh=vh=f'u'h$ なので両辺が一致する。生成篩 $H_e$ の任意の射はこの $h$ のいずれかにさらに前合成した射なので、そのすべての射でも一致する。$H_e$ が被覆であることは稠密性から従い、$F$ の[層条件の一意性](../CATB5-03/index.md#def-catb5-03-site-sheaf)によって元の切断が一致する。充満性が整合条件の適用を、稠密性と層の一意性が切断の等しさを支える。
<!-- solution-end -->

### CATB5-10-C01 交差を残した基底での層と射

- Level: C

離散三点空間 $X=\{p,q,r\}$ の基底 $\mathcal D$ を全単点と $U=\{p,q\}$、$V=\{q,r\}$ からなる充満部分圏とする。誘導位相上の層 $G$ の単点の値を $A,B,C$ とする。

1. $G(U),G(V)$ を単点の値から復元せよ。
2. $EG(X)$ を $G(U),G(V)$ の整合条件で記述し、$A\times B\times C$ との全単射を構成せよ。
3. 別の層 $G'$ の単点の値を $A',B',C'$ とし、自然変換 $\alpha:G\to G'$ の単点成分を $a,b,c$ とする。$E\alpha$ の全体での成分を求めよ。
4. 基底に $X$ を追加しても層圏が変わらない理由を、定理の仮定を確認して説明せよ。

<!-- solution-start -->
**詳細解答**

1. $U$ の二単点包含が生成する基底内の篩は被覆である。単点同士には共通の非空基底部分集合がないため整合条件は各恒等射の条件だけである。層条件により

$$
G(U)\cong A\times B,\qquad G(V)\cong B\times C.
$$

各全単射は単点への制限の対であり、逆は一意な貼り合わせである。

2. [整合族による延長](#def-catb5-10-extension)を使う。$X$ への基底包含は $U,V$ と三単点からの五本である。$U,V$ での二つの切断の $q$ での制限が等しければ、三単点成分はそれらから決まる。従って

$$
EG(X)\cong
\{((x,y),(y',z))\mid y=y'\}
$$

である。ただし $(x,y)\in A\times B$、$(y',z)\in B\times C$ とする。対応 $((x,y),(y,z))\mapsto(x,y,z)$ と逆対応 $(x,y,z)\mapsto((x,y),(y,z))$ は互いに逆である。空の集合があっても両方向の定義は成り立つ。$U,V$ への制限はそれぞれ $(x,y)$、$(y,z)$ を取り出す写像となる。

3. 自然性から $U$ での写像は単点への制限と交換するので、直積表示で $(x,y)\mapsto(a(x),b(y))$ となる。$V$ でも $(y,z)\mapsto(b(y),c(z))$ となる。従って全体の整合条件 $y=y'$ は $b(y)=b(y')$ に移り、

$$
(E\alpha)_X(x,y,z)=(a(x),b(y),c(z))
$$

となる。これは各単点への射影と交換し、$U,V$ への制限とも交換する。

4. $\mathcal D'=\mathcal D\cup\{X\}$ は包含射の充満部分圏である。両方とも全単点を含むため、各開集合をその中の単点で覆える。空集合も空合併で覆えるので、両方が $\mathcal O(X)$ の稠密部分圏である。合併による被覆は誘導位相に一致することを[基底による層圏の表示](#cor-catb5-10-basis)で確認した。従って両者の層圏は $\operatorname{Sh}(X)$ と同値であり、互いにも同値となる。$X$ の新しい切断集合は第2問の整合族から一意に復元され、独立なデータを追加しない。
<!-- solution-end -->

## 8. 次の問い

siteの表示を変えても層圏の構造を保つ条件を得た。次は一つのトポスの中で部分対象がどのような論理演算を持つかを調べる。局所的に成立する命題を貼り合わせるとき、集合上の古典論理とどこが異なるのかが焦点となる。
