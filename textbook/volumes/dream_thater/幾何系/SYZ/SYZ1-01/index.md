# SYZ1-01 複素トーラス・双対トーラスとSYZの中心問い

<!-- definition-example-audit: strict -->

## 1. なぜ鏡像の候補が「トーラスの双対」なのか

[複素トーラスの構成](../../CM/CM1-09/index.md#def-cm1-09-complex-torus)と[正則体積形式の計算](../../CYG/CYG1-04/index.md#prop-cyg1-04-volume-form)では、実 $2n$ 方向の格子で $\mathbb C^n$ を割ることで、コンパクトな複素 $n$ 次元多様体を得た。[YauのRicci形式指定定理](../../CYG/CYG1-10/index.md#thm-cyg1-10-yau)は、適切なコンパクトKähler多様体の固定Kähler類でRicci平坦計量を選べることを述べる。しかし、これらの結果は**鏡像となる別の多様体をどう作るか**までは教えない。

一方、[Lagrange部分多様体の定義](../../SYM/SYM6/index.md#def-sym6-lagrangian-submanifold)では、シンプレクティック $2n$ 次元多様体内の実 $n$ 次元の部分多様体に、2形式が零になる条件を課した。鏡像対称性の Strominger–Yau–Zaslow（SYZ）の見方は、さらに特殊な条件を満たすLagrangeトーラスを使って、**各トーラス上の平坦な $U(1)$ 局所系をすべて並べる**ことから出発する。

最初に、三つの対象を区別する。

- 複素トーラス $T=\mathbb C^n/\Lambda$ は実次元 $2n$ の**全体空間の例**である。
- $\Lambda\simeq\mathbb Z^{2n}$ 上の $U(1)$ 値文字を集めると、別の実 $2n$ 次元トーラス $\widehat T$ が得られる。
- SYZで双対化したいファイバー $L_b$ は、複素 $n$ 次元のCalabi–Yau全体 $X$ の中の**実 $n$ 次元**トーラスであり、$\widehat L_b$ は実 $n$ 次元である。したがって $\widehat L_b$ だけを鏡像全体と取り違えない。

本講では格子とホロノミーから双対化を構成する。較正・特殊Lagrange方程式は第3〜4講、実際の変形理論と滑らかなトーラス束は第5〜7講以降で扱う。ここでは**トーラス束が存在することを無条件には証明しない**。

## 2. 複素トーラスを実周期で読み直す

$n\ge1$ とする。$V=\mathbb C^n$ を実 $2n$ 次元ベクトル空間 $V_{\mathbb R}$ として見て、実線形独立な $2n$ 個のベクトル $\lambda_1,\ldots,\lambda_{2n}$ を選ぶ。[全格子の定義](../../CM/CM1-09/index.md#def-cm1-09-full-lattice)に従い、

$$
\Lambda=\bigoplus_{a=1}^{2n}\mathbb Z\lambda_a,\qquad
T=V_{\mathbb R}/\Lambda
$$

と置く。実数 $s^a$ による写像

$$
(s^1,\ldots,s^{2n})
\longmapsto
\left[\sum_{a=1}^{2n}s^a\lambda_a\right]
$$

は、各 $s^a$ を整数だけ変えても同じ点を与える。逆に像が等しければ、基底の実線形独立性から各座標差が整数となる。したがって

$$
T\simeq \mathbb R^{2n}/\mathbb Z^{2n}
\simeq(\mathbb R/\mathbb Z)^{2n}
$$

である。この実トーラス表示は位相と群構造を明示するが、複素構造 $J$ の情報を式の右辺だけで指定したことにはならない。複素構造は $V$ での $Jv=iv$ から商へ降りる。[格子商の正則座標](../../CM/CM1-09/index.md#thm-cm1-09-quotient-atlas)によって、平行移動が複素線形微分 $I$ を持つので複素構造は貼り合う。

**直接計算。** $\tau=a+ib\in\mathbb C$、$b>0$ とし、

$$
E_\tau=\mathbb C/(\mathbb Z+\tau\mathbb Z),\qquad
z=s+\tau t \quad(s,t\in\mathbb R)
$$

を考える。格子ベクトル $1,\tau$ は実平面で $(1,0),(a,b)$ に対応し、その行列式は $b>0$。従って実線形独立であり、$(s,t)$ を各々整数でずらした点を同一視する実2次元トーラスとなる。$\tau=i$ なら正方形、$\tau=1/2+i$ なら平行四辺形が基本領域である。**基本領域の形は変わっても実トーラスとしての群は同型**であるが、複素構造の情報まで消してよいわけではない。

## 3. 基本群の文字を集める

実トーラスの閉路を一つ選ぶと、持ち上げの終点は格子元だけ始点からずれる。これにより $\pi_1(T,[0])\simeq\Lambda$ が得られる。$U(1)=\{z\in\mathbb C:|z|=1\}$ は積を演算とする群である。位相的に非自明な閉路へ、位相因子を矛盾なく割り当てる道具が**文字（character）**である。

<a id="def-syz1-01-character-dual"></a>

<!-- formal-statement-start -->
> **定義（格子の文字と双対トーラス）**  
> $V_{\mathbb R}$ を実次元 $r\ge1$ のベクトル空間、$\Lambda\subset V_{\mathbb R}$ を階数 $r$ の全格子とする。**文字**とは、加法群 $\Lambda$ から乗法群 $U(1)$ への群準同型 $\chi$ であり、

$$
\chi(\lambda+\mu)=\chi(\lambda)\chi(\mu),
\qquad \chi(0)=1
$$

> を満たす。すべての文字の集合を、各点での積を群演算として

$$
\widehat T=\operatorname{Hom}_{\mathbb Z}(\Lambda,U(1))
$$

> と記し、$T=V_{\mathbb R}/\Lambda$ の**双対トーラス**と呼ぶ。ここで $\Lambda$ には離散群としての構造を用い、$\widehat T$ には $U(1)^r$ から誘導する位相を入れる。
>
> さらに $V_{\mathbb R}^*=\operatorname{Hom}_{\mathbb R}(V_{\mathbb R},\mathbb R)$ とし、全格子上で整数値を取る線形汎関数の集合を

$$
\Lambda^\vee
=\{\xi\in V_{\mathbb R}^*:\xi(\lambda)\in\mathbb Z
\text{ for every }\lambda\in\Lambda\}
$$

> と定め、**実双対格子**と呼ぶ。
<!-- formal-statement-end -->

文字を構成するには基底 $\lambda_a$ の値だけを選べば十分である。実数 $\theta_a$ を用いて

$$
\chi\!\left(\sum_{a=1}^{r}m_a\lambda_a\right)
=\exp\!\left(2\pi i\sum_{a=1}^{r}m_a\theta_a\right)
\qquad (m_a\in\mathbb Z)
$$

と置くと、加法を指数の積へ移すので文字になる。基底の実線形独立性により整数表示が一意だから、この定義は曖昧でない。逆に任意の文字は $\chi(\lambda_a)\in U(1)$ からこの形に戻る。$\theta_a$ は整数だけ変えても同じ文字である。

<!-- definition-example-start: def-syz1-01-character-dual -->
**定義の確認**。$E_i=\mathbb C/(\mathbb Z+i\mathbb Z)$ の格子元 $\lambda=m+ni$ に対し、

$$
\chi_{u,v}(m+ni)=e^{2\pi i(mu+nv)},
\qquad(u,v)\in\mathbb R^2
$$

とする。積の法則は指数の和から従い、$\chi_{u,v}(0)=1$ である。さらに $\chi_{u+m_0,v+n_0}=\chi_{u,v}$（$m_0,n_0\in\mathbb Z$）なので、文字のパラメータは $(\mathbb R/\mathbb Z)^2$ の点になる。例えば $(u,v)=(1/2,1/3)$ は二つの基本閉路へそれぞれ $-1,e^{2\pi i/3}$ を割り当てる。

もう一つの定義条件である実双対格子も同じ基底で確かめる。実線形汎関数は $\xi(s+it)=as+bt$（$a,b\in\mathbb R$）と一意に書け、格子元に対して

$$
\xi(m+ni)=am+bn.
$$

これがすべての $m,n\in\mathbb Z$ で整数となることは、特に $(1,0),(0,1)$ への値 $a,b$ がともに整数であることと同値である。ここで $ds,dt$ は実座標 $s,t$ を取り出す線形汎関数（$ds(s+it)=s$、$dt(s+it)=t$）を表し、後でトーラス上の対応する定数係数1形式としても用いる。従って $\Lambda^\vee=\mathbb Z\,ds\oplus\mathbb Z\,dt$ であり、$(u,v)$ の整数シフトだけが文字に見えないことを、定義から直接確認できた。
<!-- definition-example-end -->

定義した実双対格子を基底で計算しよう。$\lambda_a$ に対する双対基底を $\varepsilon^a(\lambda_b)=\delta^a_b$ とすると、$\Lambda^\vee$ は $\varepsilon^a$ の整数線形結合である。実際、$\xi=\sum_a c_a\varepsilon^a$ と書いたとき、全ての $\lambda_b$ における値が整数である条件は $c_b\in\mathbb Z$ と同値になる。この集合が重要なのは、$e^{2\pi i\xi(\lambda)}$ では整数値の差だけが見えなくなるためである。

<a id="prop-syz1-01-character-quotient"></a>

<!-- formal-statement-start -->
> **命題（文字トーラスの格子商表示）**  
> $V_{\mathbb R}$ を実次元 $r$ のベクトル空間、$\Lambda$ を全格子、$\Lambda^\vee$ を上記の実双対格子とする。このとき

$$
\Phi:V_{\mathbb R}^*/\Lambda^\vee
\longrightarrow\operatorname{Hom}_{\mathbb Z}(\Lambda,U(1)),
\qquad
[\xi]\longmapsto
\bigl(\lambda\mapsto e^{2\pi i\xi(\lambda)}\bigr)
$$

> は連続な群同型であり、その逆も連続である。特に $\widehat T$ は実次元 $r$ のコンパクトトーラスである。
<!-- formal-statement-end -->

### 証明の見取り図

線形汎関数の値を格子基底上で指定し、指数の核が整数であることを使う。核・全射・位相の三点をそれぞれ確認する。

<!-- proof-start -->
### 証明

$\xi\in V_{\mathbb R}^*$ に対して $\chi_\xi(\lambda)=e^{2\pi i\xi(\lambda)}$ と置く。任意の $\lambda,\mu\in\Lambda$ について、実線形性と指数の積法則を順に計算すると

$$
\begin{aligned}
\chi_\xi(\lambda+\mu)
&=e^{2\pi i[\xi(\lambda)+\xi(\mu)]}\\
&=e^{2\pi i\xi(\lambda)}e^{2\pi i\xi(\mu)}
=\chi_\xi(\lambda)\chi_\xi(\mu)
\end{aligned}
$$

となり、$\chi_\xi(0)=1$ も成立するので文字になる。$\eta\in\Lambda^\vee$ なら、任意の $\lambda\in\Lambda$ に対して $e^{2\pi i\eta(\lambda)}=1$ なので、$\xi$ と $\xi+\eta$ は同じ文字を与える。

逆に二つの線形汎関数 $\xi,\xi'$ の文字が等しければ、

$$
e^{2\pi i(\xi-\xi')(\lambda_a)}=1
\quad\Longrightarrow\quad
(\xi-\xi')(\lambda_a)\in\mathbb Z
$$

が全基底 $\lambda_a$ で成り立つ。任意の格子元は整数線形結合だから、$\xi-\xi'\in\Lambda^\vee$。これで核が正確に $\Lambda^\vee$ だと分かった。

任意の文字 $\chi$ について、各 $a$ で $u_a\in\mathbb R$ を $e^{2\pi iu_a}=\chi(\lambda_a)$ となるように取る。$\lambda_a$ は $V_{\mathbb R}$ の実基底なので、$\xi(\lambda_a)=u_a$ を満たす実線形汎関数 $\xi$ は一意に存在する。すると格子の任意の元 $\sum m_a\lambda_a$ について

$$
e^{2\pi i\xi(\sum m_a\lambda_a)}
=\prod_a\chi(\lambda_a)^{m_a}
=\chi\!\left(\sum m_a\lambda_a\right).
$$

したがって全射でもある。基底を使って両辺をそれぞれ $(\mathbb R/\mathbb Z)^r$ と $U(1)^r$ に同一視すると、$\Phi$ は座標ごとの指数写像 $[u_a]\mapsto e^{2\pi iu_a}$ であり、位相同型である。$\square$
<!-- proof-end -->

**区別が必要な二種類の文字**。この $\widehat T$ は $\operatorname{Hom}(\Lambda,U(1))$ であり、元の**コンパクト群 $T$ 自身**から $U(1)$ への連続文字群ではない。後者は

$$
\operatorname{Hom}_{\mathrm{cont}}(T,U(1))
\simeq\Lambda^\vee\simeq\mathbb Z^r
$$

という離散群である。実際、$T=\mathbb R/\mathbb Z$ の連続文字は $[s]\mapsto e^{2\pi iks}$（$k\in\mathbb Z$）のみだが、$\pi_1(T)=\mathbb Z$ の文字は $1\mapsto e^{2\pi iu}$（$[u]\in\mathbb R/\mathbb Z$）を自由に選べる。この両者の混同は「双対トーラスが離散集合になってしまう」典型的な誤りである。

連続文字が整数で添字付けられる根拠も確かめる。連続準同型 $h:\mathbb R\to U(1)$ は $h(0)=1$ を満たす。原点の近くでは連続な実偏角 $\varphi$ を選んで

$$
h(s)=e^{i\varphi(s)},\qquad \varphi(0)=0
$$

と書ける。十分小さい $s,t,s+t$ に対し、準同型性 $h(s+t)=h(s)h(t)$ を用いる。偏角の差は $2\pi$ の整数倍だが、連続性と原点での値からその整数は零である。従って

$$
\varphi(s+t)=\varphi(s)+\varphi(t).
$$

連続な加法関数は $\varphi(s)=2\pi as$（実数 $a$）に限る。任意の $s$ も、十分大きな自然数 $N$ で $s/N$ を原点近くに取れば $h(s)=h(s/N)^N$ だから、

$$
h(s)=e^{2\pi ias}\qquad(s\in\mathbb R)
$$

が従う。この文字が円周 $\mathbb R/\mathbb Z$ に降りる必要十分条件は $h(1)=1$、つまり $a\in\mathbb Z$ である。一般の $r$ 次元トーラスでも各座標円周への制限を掛け合わせれば、整数 $r$ 個で連続文字が尽くされる。

## 4. 文字を平坦な局所系として実現する

文字の $U(1)$ 値は単なる記号ではなく、閉路に沿って平行移動したベクトルが何倍されるか、という**ホロノミー**として現れる。これを幾何学的に定義する。

まず、複素直線束 $L\to M$ は各点の上に複素1次元のベクトル空間を置き、局所的には $U\times\mathbb C$ と表示できる束である。各繊維に正定値のHermitian内積を入れる。単位枠での内積は次の形になる。

$$
h(z,w)=z\overline w.
$$

これは交代2形式によるLagrange条件とは別の構造であり、[既習のHermitian計量と正値性](../../KAH/KAH1-05/index.md#prop-kah1-05-constant-model)と同じ種類の内積である。

**接続** $\nabla$ は局所切断 $f$ の微分を与える作用素で、単位枠では次の形を取る。

$$
\nabla f=df+Af.
$$

ここで $A$ は純虚数値の1形式、$d$ は基底座標に関する外微分である。例えば座標を $s,t$ とすると、

$$
df=\frac{\partial f}{\partial s}\,ds
+\frac{\partial f}{\partial t}\,dt.
$$

接続が**内積を保存する**とは、平行移動が各繊維の長さを保つことである。複素直線束の**曲率**は2形式であり、この局所枠では

$$
F_\nabla=dA,\qquad
\text{平坦}\iff F_\nabla=0
$$

と書ける。**平行切断**は $\nabla f=0$ を満たす切断で、平行移動はこの微分方程式を経路に沿って解く操作である。曲率零なら局所的な平行枠を選べるが、閉路全体のホロノミーは1とは限らない。

<a id="def-syz1-01-flat-local-system"></a>

<!-- formal-statement-start -->
> **定義（平坦U(1)局所系）**  
> 滑らかな連結多様体 $M$ 上の**平坦 $U(1)$ 局所系**とは、Hermitian複素直線束 $L\to M$ と、そのHermitian内積を保存し曲率が零である接続 $\nabla$ の組から得られる、局所平行切断の系をいう。二つの組は、内積と接続を保つ束同型があるとき同値とする。基点における単位ベクトルを選ぶと、各閉路の平行移動は $U(1)$ の元を与える。
<!-- formal-statement-end -->

ここで接続の曲率零とは、局所的な単位枠で $\nabla=d+A$ と書いたときの $dA=0$ を意味する（線束なので $A\wedge A=0$）。$A$ は純虚数値1形式である。曲率零は局所的な平行枠の存在を保証するが、**大域的な閉路では平行移動が恒等になるとは限らない**。

<a id="thm-syz1-01-holonomy-classification"></a>

<!-- formal-statement-start -->
> **定理（平坦局所系のホロノミー分類）**  
> $T=V_{\mathbb R}/\Lambda$ を全格子による実トーラスとする。$T$ 上の平坦 $U(1)$ 局所系の同型類の集合は、平行移動ホロノミーによって自然に

$$
\operatorname{Hom}(\pi_1(T),U(1))
\simeq\operatorname{Hom}_{\mathbb Z}(\Lambda,U(1))
=\widehat T
$$

> と一対一に対応する。任意の文字 $\chi$ に対応する局所系は、被覆空間上の自明線束に次の格子作用を入れた商で構成できる。

$$
\lambda\cdot(v,z)
=(v+\lambda,\chi(\lambda)^{-1}z).
$$
<!-- formal-statement-end -->

### 証明の見取り図

平坦接続を一つの閉路で平行移動すると文字が得られる。逆に文字で被覆空間のファイバーを貼り合わせる。式の $\chi^{-1}$ は慣習上の飾りではない。この符号を外すと、ここで採用した平行移動の向きではホロノミーが $\chi^{-1}$ になる。

<!-- proof-start -->
### 証明

**ホロノミーから文字へ。** $T$ に基点 $x_0$ を固定し、平坦接続を持つHermitian線束の $x_0$ における単位ベクトルを取る。曲率零なので、端点を固定するホモトピーの間で閉路の平行移動は変わらない。閉路の連結で平行移動は積となり、線上の積は可換である。従って

$$
\operatorname{Hol}_\nabla:\pi_1(T,x_0)\to U(1)
$$

は群準同型である。$\pi_1(T,x_0)\simeq\Lambda$ は、持ち上げの始点から終点への格子変位で同一視する。基点の単位ベクトルを取り替えても $U(1)$ が可換なので文字は変わらない。

**文字から局所系へ。** 文字 $\chi$ に対し、$V_{\mathbb R}\times\mathbb C$ 上の接続 $d$ を取り、上記の格子作用で割る。$\chi$ の積法則より

$$
\lambda\cdot\bigl(\mu\cdot(v,z)\bigr)
=(v+\lambda+\mu,\chi(\lambda)^{-1}\chi(\mu)^{-1}z)
=(\lambda+\mu)\cdot(v,z)
$$

となる。作用はファイバーを単位複素数倍するから内積を保ち、しかも係数は $v$ に依存しないので $d$ を保つ。従って商上に曲率零のunitary接続が降りる。

格子元 $\lambda$ の閉路を、$V_{\mathbb R}$ では $v_0$ から $v_0+\lambda$ への道として持ち上げる。$d$ に関する平行ベクトルは一定 $z$ であり、商では

$$
(v_0+\lambda,z)
\sim(v_0,\chi(\lambda)z)
$$

だから、ホロノミーはちょうど $\chi(\lambda)$ である。

**分類の一意性。** 任意の平坦unitary線束を単連結な $V_{\mathbb R}$ へ引き戻す。曲率零のため、固定した単位ベクトルを任意の経路に沿って平行移動すると経路に依存しない。実際、二経路は単連結性により端点固定ホモトピーで結ばれ、そのホモトピーに沿うホロノミー変化は曲率積分が零なので消える。こうして被覆上に大域平行単位枠ができ、元の束を記述する各格子移動は定数の $U(1)$ 倍となる。既に求めたホロノミーとの対応からその定数は $\chi(\lambda)^{-1}$ である。従って同じ文字から作る組は接続を保つ同型で一致する。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-syz1-01-flat-local-system -->
**定義の確認**（分類もあわせて検算）。 $T=(\mathbb R/\mathbb Z)^2$ の座標を $s,t$ とし、$u,v\in\mathbb R$ を固定して自明なHermitian線束に

$$
\nabla=d-2\pi i(u\,ds+v\,dt)
$$

を入れる。係数は純虚数値、$d(ds)=d(dt)=0$ なので曲率は零。水平切断の方程式 $\nabla f=0$ は

$$
df=2\pi i(u\,ds+v\,dt)f
$$

である。被覆空間 $\mathbb R^2$ 上では、積の微分法則を用いて

$$
d\bigl(e^{-2\pi i(us+vt)}f\bigr)
=e^{-2\pi i(us+vt)}\bigl(df-2\pi i(u\,ds+v\,dt)f\bigr)=0
$$

となる。従って括弧内の関数は連結な被覆空間上で定数であり、$(0,0)$ から $(m,n)$ へ平行移動した値は

$$
f(m,n)=e^{2\pi i(mu+nv)}f(0,0).
$$

よってホロノミーは $\chi_{u,v}(m,n)$ と一致する。例えば $u=1/2,v=1/3$ なら基本閉路で $-1$ と $e^{2\pi i/3}$ を得る。曲率が零でも、これらは必ずしも1ではない。
<!-- definition-example-end -->

## 5. 双対トーラスに複素構造はあるか

第3節の $\widehat T$ はまず**実**トーラスであった。元の $T$ に複素構造がある場合には、実双対空間上でも複素構造を作れる。ただし、$\Lambda^\vee$ を複素線形空間の複素部分空間と誤解してはいけない。格子はあくまで実の離散部分群である。

元の $V_{\mathbb R}$ 上の複素構造を $J$（$J^2=-I$）とし、その実双対空間上で

$$
J^\vee\xi=-\xi\circ J
\qquad(\xi\in V_{\mathbb R}^*)
$$

と定める。なぜマイナスを入れるかは、次の二乗計算で分かる。

<a id="prop-syz1-01-dual-complex"></a>

<!-- formal-statement-start -->
> **命題（双対トーラスの複素構造）**  
> $T=V_{\mathbb R}/\Lambda$ を複素構造 $J$ を持つ実次元 $2n$ の複素トーラスとする。実双対空間の作用素 $J^\vee\xi=-\xi\circ J$ は $(J^\vee)^2=-I$ を満たす。$\Lambda^\vee$ による平行移動は $J^\vee$ を保つので、商

$$
\widehat T=V_{\mathbb R}^*/\Lambda^\vee
$$

> は複素次元 $n$ の複素トーラスとなる。ここで $J^\vee(\Lambda^\vee)\subseteq\Lambda^\vee$ は**仮定しない**。
<!-- formal-statement-end -->

### 証明の見取り図

複素構造が商へ降りる条件は「格子を複素構造が整数係数のまま写す」ことではなく、**格子平行移動が複素構造を保つ**ことである。

<!-- proof-start -->
### 証明

任意の $\xi\in V_{\mathbb R}^*$ と $v\in V_{\mathbb R}$ について

$$
\begin{aligned}
(J^\vee)^2\xi(v)
&=- (J^\vee\xi)(Jv)\\
&=-\bigl[-\xi(J(Jv))\bigr]\\
&=\xi(J^2v)=-\xi(v).
\end{aligned}
$$

従って $(J^\vee)^2=-I$ であり、$V_{\mathbb R}^*$ を複素 $n$ 次元ベクトル空間とみなせる。このベクトル空間で $J^\vee$ に適合する定数係数座標を取り、$\eta\in\Lambda^\vee$ による平行移動 $t_\eta(\xi)=\xi+\eta$ を考える。微分は $dt_\eta=I$ なので

$$
dt_\eta\circ J^\vee=J^\vee\circ dt_\eta.
$$

すなわち全ての格子平行移動は正則である。格子は実全格子なので商に正則座標が貼り合い、複素トーラスになる。[複素トーラスの商構成](../../CM/CM1-09/index.md#thm-cm1-09-quotient-atlas)で用いた同じ論法である。必要なのは平行移動の微分が複素線形であることであり、$J^\vee$ が個々の格子点を別の格子点へ写すことではない。$\square$
<!-- proof-end -->

**楕円曲線の直接計算。** $E_\tau$ で $z=s+\tau t$、$\tau=a+ib$、$b>0$ とする。$z$ を $i$ 倍して得る $s',t'$ を解くと

$$
t'=\frac{s+at}{b},\qquad
s'=-\frac{as+|\tau|^2t}{b}.
$$

ここで $J$ の行列は、実基底 $(1,\tau)$ における $J(1)$ と $J(\tau)$ の係数を各列に並べたものである。上の座標式に二つの基底ベクトルを代入すると、

$$
J(1)=i=-\frac ab\cdot1+\frac1b\tau,\qquad
J(\tau)=i\tau=-\frac{|\tau|^2}{b}\cdot1+\frac ab\tau.
$$

双対基底 $(ds,dt)$ でも、定義 $J^\vee\xi=-\xi\circ J$ を元の基底ベクトルに評価すれば、成分は $(J^\vee)_{ab}=-J_{ba}$ になる。従って $J^\vee=-J^{\mathsf T}$ であり、二つの行列はそれぞれ

$$
J=\frac1b\begin{pmatrix}-a&-|\tau|^2\\1&a\end{pmatrix},
\qquad
J^\vee=\frac1b\begin{pmatrix}a&-1\\|\tau|^2&-a\end{pmatrix}.
$$

複素座標を $w=u-v/\tau$ と置けば、代入して $w(J^\vee(u,v))=i\,w(u,v)$ を確かめられる。$u,v$ の整数シフトは

$$
w\longmapsto w+m-\frac{n}{\tau},
\qquad m,n\in\mathbb Z,
$$

となる。従ってこの複素構造を持つ双対は

$$
\widehat E_\tau\simeq
\mathbb C\big/\left(\mathbb Z-\frac1\tau\mathbb Z\right).
$$

$\operatorname{Im}(-1/\tau)=b/|\tau|^2>0$ なので右辺も全格子商である。$\tau=i$ では $w=u+iv$ となり、二周期は $1,i$。文字の集合が実トーラスであるという第3節の記述と矛盾しない。ここでは元の複素構造から**追加の複素構造を指定した**のである。

## 6. 滑らかなファイバーを双対にすると何ができるか

SYZでのファイバーは $X$ 全体ではない。まず $X$ を実 $2n$ 次元のシンプレクティック多様体とし、$B_0$ を実 $n$ 次元の開いた基底とする。次の滑らかな射影を**追加で仮定**する。

$$
\pi:X_0\longrightarrow B_0
$$

各 $b\in B_0$ におけるファイバー $L_b=\pi^{-1}(b)$ は実 $n$ 次元トーラスである。また、Lagrange条件は次の式である。

$$
\omega|_{L_b}=0
$$

[Lagrange部分多様体の定義](../../SYM/SYM6/index.md#def-sym6-lagrangian-submanifold)は既習だが、特殊Lagrangeの追加条件は次講以降で明確にする。

各ファイバーの第一整数ホモロジー群は $H_1(L_b;\mathbb Z)\simeq\mathbb Z^n$ であり、これは基本群のAbel化である。トーラスの基本群はすでに可換なので、平坦 $U(1)$ 局所系の分類には $H_1$ を使ってよい。

<a id="prop-syz1-01-fiberwise-duality"></a>

<!-- formal-statement-start -->
> **命題（滑らかなトーラス束のファイバー双対化）**  
> $B_0$ を滑らかな実 $n$ 次元多様体、$\pi:X_0\to B_0$ をファイバーが実 $n$ 次元トーラス $L_b$ である滑らかな局所自明束とする。各 $L_b$ 上の平坦 $U(1)$ 局所系の同型類を集めた空間を

$$
\check X_0=
\bigsqcup_{b\in B_0}
\operatorname{Hom}\bigl(H_1(L_b;\mathbb Z),U(1)\bigr)
$$

> と置く。この空間は、局所的に $U\times(\mathbb R/\mathbb Z)^n$ の形を持つ滑らかな実 $2n$ 次元のトーラス束をなす。基底上の貼り合わせには元の周期群の $GL(n,\mathbb Z)$ 作用に対する双対作用が現れる。**この主張だけでは** $\check X_0$ に鏡像の複素構造やKähler計量、特異ファイバーを越える拡張が与えられたことにはならない。
<!-- formal-statement-end -->

### 証明の見取り図

局所自明化ではファイバーの閉路を整数基底で表せる。基底変更を文字に反映すると、整数行列の逆転置による貼り合わせになる。実次元は基底とファイバーの和で数える。

<!-- proof-start -->
### 証明

$B_0$ の十分小さい可縮な開集合 $U$ で束を自明化し、各 $H_1(L_b;\mathbb Z)$ の整数基底 $\gamma_1(b),\ldots,\gamma_n(b)$ を連続的に選ぶ。文字は各 $\gamma_a$ に割り当てる位相 $e^{2\pi i\theta_a}$ で一意に決まる。[文字商表示の命題](#prop-syz1-01-character-quotient)をこの階数 $n$ の周期格子に適用すると、

$$
\check X_0|_U\simeq U\times(\mathbb R/\mathbb Z)^n.
$$

二つの自明化が重なる連結開集合で、閉路基底は $A\in GL(n,\mathbb Z)$ によって変わる。$A$ は整数値かつ連続的なのでその重なりでは局所定数である。閉路を列に並べる規約で新基底を $\gamma'=A\gamma$ と書く。文字 $\chi$ は準同型なので $\chi(\gamma'_a)=\prod_b\chi(\gamma_b)^{A_{ab}}$。従って同じ文字の位相座標は

$$
\theta'_a=\sum_b A_{ab}\theta_b\pmod{\mathbb Z},
\qquad \theta'=A\theta\pmod{\mathbb Z^n}.
$$

一方、整数値線形汎関数の双対基底の変換は別である。新基底を未知行列 $B$ で表すと、

$$
\varepsilon^a(\gamma_b)=\delta^a_b,\qquad
\varepsilon'^a=\sum_c B_{ac}\varepsilon^c.
$$

これを $\gamma'_b=\sum_c A_{bc}\gamma_c$ に評価すると、

$$
\delta^a_b=\sum_c B_{ac}A_{bc},
\qquad BA^{\mathsf T}=I,
\qquad B=A^{-{\mathsf T}}.
$$

**双対基底自体**は逆転置変換する一方、固定した文字を新基底に評価した**位相座標**は $A$ で変換する。$A\in GL(n,\mathbb Z)$ より両行列は整数格子を保ち可逆なので、チャートは滑らかに貼り合う。

局所モデルの実次元は $\dim_{\mathbb R}U+n=n+n=2n$ である。ここまでの構成は位相的・滑らかな束の双対化であり、複素座標やシンプレクティック形式は追加していない。$\square$
<!-- proof-end -->

**最小例**。$B_0=(0,1)$、$X_0=B_0\times(\mathbb R/\mathbb Z)$ とし、$(b,\theta)$ に2形式 $\omega=db\wedge d\theta$ を入れる。$b$ 一定の円周 $L_b$ では $db=0$ だから $\omega|_{L_b}=0$。各 $L_b$ の整数閉路は一本なので、

$$
\check X_0=B_0\times\operatorname{Hom}(\mathbb Z,U(1))
\simeq B_0\times(\mathbb R/\mathbb Z).
$$

この円筒状の局所模型は次元を確かめる例であり、それ自体をコンパクトCalabi–Yauの鏡像と呼んではいない。

## 7. SYZの予想と、この講義で証明した範囲

SYZの幾何学的着想は、Calabi–Yau多様体上で、**位相・較正の条件を満たす特殊Lagrangeトーラスのファイブレーション**が適切な極限で存在し、鏡像の滑らかな部分をその**双対トーラス上の平坦局所系の空間**として見る、というものである。これは1996年の [Strominger–Yau–Zaslow, *Mirror Symmetry Is T-Duality*](https://arxiv.org/abs/hep-th/9606040) に由来する。

ここで区別すべき論理は以下である。

| 主張 | 本講での位置 |
|---|---|
| 全格子 $\Lambda$ の文字を全部集めると $\widehat T$ が実トーラスになる | 第3節で証明 |
| 文字と平坦 $U(1)$ 局所系の同型類が対応する | 第4節で証明 |
| **滑らかな**トーラス束が与えられたらファイバーごとに双対化できる | 第6節で追加仮定の下に証明 |
| 任意のCalabi–Yauに必要な特殊Lagrangeトーラス束が大域的に存在する | 本講では証明していない一般的な期待 |
| 特異ファイバーを越えて鏡像の複素構造が補正込みで大域的に貼り合う | 本講の滑らかな束の議論からは従わない |

特異ファイバーでは閉路が縮んだり、$H_1(L_b;\mathbb Z)$ の階数や周期の振る舞いが滑らかな場合と異なったりする。単に「各点で $\operatorname{Hom}(H_1,U(1))$ を取る」式だけでは、鏡像の滑らかな貼り合わせが完成しない。**特殊Lagrangeの変形（第5〜6講）、周期と整数アフィン構造（第8講）、semi-flatの構成（第10〜11講）、特異性と補正（第14〜17講）**が残る理由はここにある。

## 8. 演習と詳細解答

### Level A：格子・文字・ホロノミーを一つずつ確かめる

<a id="ex-syz1-01-a01"></a>

#### SYZ1-01-A01 斜め格子の全格子条件

- Level: A

$\tau=1/2+2i$ とし、$\Lambda=\mathbb Z+\tau\mathbb Z$ とする。$(1,\tau)$ が $\mathbb C$ の実基底であることを確認し、$T=\mathbb C/\Lambda$ の実トーラス表示を求めよ。

<!-- solution-start -->
### 詳細解答

$1=(1,0)$、$\tau=(1/2,2)$ と実座標で表示でき、その行列式は

$$
\det\begin{pmatrix}1&1/2\\0&2\end{pmatrix}=2\ne0.
$$

従って両者は実線形独立であり、全格子を生成する。$z=s+\tau t$ で $s,t\in\mathbb R$ と書くと、$z$ と $z+m+\tau n$ の違いは $(s,t)\mapsto(s+m,t+n)$（$m,n\in\mathbb Z$）。よって

$$
T\simeq(\mathbb R/\mathbb Z)^2.
$$

$\tau$ が純虚数でなくても、実群としては積の二円周になる。
<!-- solution-end -->

<a id="ex-syz1-01-a02"></a>

#### SYZ1-01-A02 文字の核と整数シフト

- Level: A

$\Lambda=\mathbb Z^2$ に対して $\chi_{u,v}(m,n)=e^{2\pi i(mu+nv)}$ と置く。文字であることを確認し、$\chi_{u,v}=\chi_{u',v'}$ の必要十分条件を求めよ。

<!-- solution-start -->
### 詳細解答

$(m,n)+(p,q)$ の指数は $(m+p)u+(n+q)v$ で、指数の積法則から準同型条件を満たす。$(0,0)$ では指数は0なので文字の値は1。

文字が等しければ、特に $(1,0)$ と $(0,1)$ に代入して

$$
e^{2\pi iu}=e^{2\pi iu'},
\qquad e^{2\pi iv}=e^{2\pi iv'}.
$$

実指数の周期は整数なので $u-u',v-v'\in\mathbb Z$。逆に差が整数なら、任意の整数 $m,n$ について $m(u-u')+n(v-v')\in\mathbb Z$ となり、文字は等しい。これは[文字商表示](#prop-syz1-01-character-quotient)の核を座標で確かめたものである。
<!-- solution-end -->

<a id="ex-syz1-01-a03"></a>

#### SYZ1-01-A03 曲率零でも非自明なホロノミー

- Level: A

$T=(\mathbb R/\mathbb Z)^2$ 上の $\nabla=d-2\pi i(\frac14\,ds+\frac12\,dt)$ の曲率と、二つの基本閉路のホロノミーを求めよ。

<!-- solution-start -->
### 詳細解答

第4節の局所接続表示 $\nabla=d+A$ において、$A=-2\pi i(\frac14\,ds+\frac12\,dt)$ は純虚数値である。係数は一定で $d(ds)=d(dt)=0$ だから $dA=0$。$U(1)$ は可換だから $A\wedge A=0$ で、曲率は零。

水平切断は $df=2\pi i(\frac14ds+\frac12dt)f$ を満たす。$s$ 方向に1周すると

$$
f(1,0)/f(0,0)=e^{2\pi i/4}=i.
$$

$t$ 方向に1周すると $e^{2\pi i/2}=-1$。曲率零でも閉路に沿う位相は非自明である。
<!-- solution-end -->

<a id="ex-syz1-01-a04"></a>

#### SYZ1-01-A04 どちらの文字群か

- Level: A

$T=\mathbb R/\mathbb Z$ に対して、(i) $\operatorname{Hom}_{\mathrm{cont}}(T,U(1))$ と (ii) $\operatorname{Hom}(\pi_1(T),U(1))$ の元をそれぞれパラメータ表示し、片方が離散・片方が円周になる理由を述べよ。

<!-- solution-start -->
### 詳細解答

(i) 連続群準同型を実直線へ引き戻すと、一パラメータ群の連続文字 $s\mapsto e^{2\pi ias}$ になる。$s$ と $s+1$ が $T$ で同じ点なので $e^{2\pi ia}=1$ が必要十分で、$a\in\mathbb Z$。従って文字群は $\mathbb Z$。

(ii) $\pi_1(T)=\mathbb Z$ は離散群で、準同型は生成元1の像を任意の $e^{2\pi iu}$ に選べる。$u$ と $u+k$（$k\in\mathbb Z$）は同じ像なので、文字空間は $\mathbb R/\mathbb Z$。二つは**定義域が異なる**ため、同じ「文字」という語から同一視できない。
<!-- solution-end -->

<a id="ex-syz1-01-a05"></a>

#### SYZ1-01-A05 正方格子の双対複素構造

- Level: A

$\tau=i$ のとき $J$ と $J^\vee$ の行列を計算し、双対の複素座標 $w$ を求めよ。

<!-- solution-start -->
### 詳細解答

$a=0,b=1,|\tau|^2=1$ を[双対複素構造の行列](#prop-syz1-01-dual-complex)に代入すると

$$
J=J^\vee=
\begin{pmatrix}0&-1\\1&0\end{pmatrix}.
$$

従って $J^\vee(u,v)=(-v,u)$。$w=u+iv$ と置けば

$$
w(J^\vee(u,v))=-v+iu=i(u+iv)=iw(u,v).
$$

$(u,v)$ の整数シフトは $w$ を $m+in$ ずらすので、$\widehat E_i\simeq\mathbb C/(\mathbb Z+i\mathbb Z)$。
<!-- solution-end -->

### Level B：文字・格子・局所系の対応をつなぐ

<a id="ex-syz1-01-b01"></a>

#### SYZ1-01-B01 閉路基底を変えたときの文字座標

- Level: B

$\Lambda$ の基底 $\lambda_1,\lambda_2$ を $\lambda'_1=\lambda_1$、$\lambda'_2=\lambda_1+\lambda_2$ に替える。旧基底で $\chi(\lambda_1)=e^{2\pi iu}$、$\chi(\lambda_2)=e^{2\pi iv}$ のとき、新基底の位相座標と逆変換を求め、整数格子を保つことを確認せよ。

<!-- solution-start -->
### 詳細解答

準同型条件より

$$
\chi(\lambda'_1)=e^{2\pi iu},\qquad
\chi(\lambda'_2)=\chi(\lambda_1)\chi(\lambda_2)
=e^{2\pi i(u+v)}.
$$

よって新位相は $(u',v')=(u,u+v)\pmod{\mathbb Z^2}$ となる。行列表示は

$$
\begin{pmatrix}u'\\v'\end{pmatrix}
=\begin{pmatrix}1&0\\1&1\end{pmatrix}
\begin{pmatrix}u\\v\end{pmatrix},
\qquad
\begin{pmatrix}u\\v\end{pmatrix}
=\begin{pmatrix}1&0\\-1&1\end{pmatrix}
\begin{pmatrix}u'\\v'\end{pmatrix}.
$$

両行列は整数成分かつ行列式1であるため、$\mathbb Z^2$ のシフトを $\mathbb Z^2$ のシフトへ写す。文字トーラスの座標変更がwell-definedである。
<!-- solution-end -->

<a id="ex-syz1-01-b02"></a>

#### SYZ1-01-B02 整数周期差をunitaryゲージ変換で消す

- Level: B

$\nabla_{u,v}=d-2\pi i(u\,ds+v\,dt)$ と $\nabla_{u+m,v+n}$（$m,n\in\mathbb Z$）が、$T=(\mathbb R/\mathbb Z)^2$ 上でunitaryゲージ同値になることを具体式で示せ。

<!-- solution-start -->
### 詳細解答

$g(s,t)=e^{2\pi i(ms+nt)}$ と置く。$s,t$ を整数だけずらしても $g$ は変わらないので、$T$ 上の大域的な $U(1)$ 値関数である。また

$$
g^{-1}dg=2\pi i(m\,ds+n\,dt).
$$

従って接続のゲージ変換を計算すると

$$
\begin{aligned}
g^{-1}\nabla_{u+m,v+n}g
&=d+g^{-1}dg-2\pi i[(u+m)\,ds+(v+n)\,dt]\\
&=d-2\pi i(u\,ds+v\,dt)=\nabla_{u,v}.
\end{aligned}
$$

従って両局所系は同型である。整数シフトなら全閉路のホロノミーも同じであることと整合し、[分類定理](#thm-syz1-01-holonomy-classification)を具体的な接続で再現している。
<!-- solution-end -->

<a id="ex-syz1-01-b03"></a>

#### SYZ1-01-B03 斜め楕円格子の双対パラメータ

- Level: B

$\tau=1+i$ について、双対複素構造 $J^\vee$ の行列と $w=u-v/\tau$ を計算せよ。$J^\vee(1,0)$ の複素座標が $i\,w(1,0)$ になること、および双対側の複素格子の二周期を確認せよ。

<!-- solution-start -->
### 詳細解答

$a=b=1$、$|\tau|^2=2$ だから

$$
J^\vee=\begin{pmatrix}1&-1\\2&-1\end{pmatrix},
\quad J^\vee(1,0)=(1,2).
$$

一方 $1/\tau=(1-i)/2$ なので、

$$
w(u,v)=u-\frac{1-i}{2}v,
\qquad
w(1,2)=1-(1-i)=i=i\,w(1,0).
$$

位相座標 $(u,v)$ の二つの整数シフトは $w\mapsto w+1$ と $w\mapsto w-1/\tau$ である。従って双対複素格子は

$$
\mathbb Z+\frac{-1+i}{2}\mathbb Z.
$$

二周期の虚部の行列式は $1/2>0$ だから全格子になり、複素次元1のトーラスができる。
<!-- solution-end -->

<a id="ex-syz1-01-b04"></a>

#### SYZ1-01-B04 文字トーラスから格子を取り戻す

- Level: B

$\Lambda=\mathbb Z\lambda_1\oplus\mathbb Z\lambda_2$ とし、$\widehat T=\operatorname{Hom}(\Lambda,U(1))$ とする。各 $\lambda\in\Lambda$ に対して

$$
F_\lambda:\widehat T\to U(1),\qquad F_\lambda(\chi)=\chi(\lambda)
$$

を定める。$F_\lambda$ が連続文字であることを示し、$\operatorname{Hom}_{\mathrm{cont}}(\widehat T,U(1))\simeq\Lambda$ を座標で証明せよ。

<!-- solution-start -->
### 詳細解答

各点での文字の積に対し、$F_\lambda(\chi_1\chi_2)=\chi_1(\lambda)\chi_2(\lambda)$ となるので群準同型である。$\widehat T\simeq U(1)^2$ での評価は積と冪で書け、連続である。

$\lambda=k_1\lambda_1+k_2\lambda_2$ とすれば

$$
F_\lambda(\chi_{u,v})
=e^{2\pi i(k_1u+k_2v)}.
$$

逆に $(\mathbb R/\mathbb Z)^2$ の連続文字を二つの座標円周へ制限すると、それぞれ $e^{2\pi ik_1u},e^{2\pi ik_2v}$（$k_i\in\mathbb Z$）に限られる。積群の元 $(u,v)=(u,0)+(0,v)$ での準同型条件から、その連続文字は両者の積で尽くされる。この $k_1,k_2$ に対応する $\lambda$ は一意である。従って $\lambda\mapsto F_\lambda$ という対応は $\Lambda$ から $\operatorname{Hom}_{\mathrm{cont}}(\widehat T,U(1))$ への全単射である。
<!-- solution-end -->

### Level C：滑らかな双対化と未証明の期待を仕分ける

<a id="ex-syz1-01-c01"></a>

#### SYZ1-01-C01 円周ファイバーの双対と特異性の境界

- Level: C

$B_0=(0,1)$、$X_0=B_0\times(\mathbb R/\mathbb Z)$ に $\omega=db\wedge d\theta$ を入れ、$\pi(b,\theta)=b$ とする。

1. $\omega$ がシンプレクティック形式で、各ファイバー $L_b$ がLagrangeであることを確認せよ。
2. 平坦 $U(1)$ 局所系を文字で表示し、$\check X_0$ の実次元を求めよ。
3. 別の模型として、平面の開円板 $D^2\subset\mathbb R^2$ を $r=\sqrt{x^2+y^2}$ で円周ファイバーへ分ける場合を考える。$r=0$ を通じて第6節の「滑らかな円周束」の証明をそのまま使えない理由を特定せよ。
4. (1)〜(3)から一般Calabi–Yauの鏡像が完成したと結論できるか、必要な追加条件を述べよ。

<!-- solution-start -->
### 詳細解答

**第1問**。$\omega=db\wedge d\theta$ は閉形式である。接基底 $(\partial_b,\partial_\theta)$ への値は

$$
\omega(\partial_b,\partial_\theta)=1,\qquad
\begin{pmatrix}0&1\\-1&0\end{pmatrix}
$$

となり、行列式1なので非退化。従ってシンプレクティック形式である。$L_b$ は接方向 $\partial_\theta$ だけを持つ実1次元部分多様体であり、$db(\partial_\theta)=0$ より $\omega|_{L_b}=0$。全体の実次元2の半分の次元でもあるから、[Lagrange部分多様体の定義](../../SYM/SYM6/index.md#def-sym6-lagrangian-submanifold)を満たす。

**第2問**。$\pi_1(L_b)\simeq\mathbb Z$ の生成元を $\theta$ が1周する閉路とする。平坦局所系は[ホロノミー分類](#thm-syz1-01-holonomy-classification)により

$$
\chi_u(m)=e^{2\pi imu},
\qquad [u]\in\mathbb R/\mathbb Z
$$

で尽くされる。従って

$$
\check X_0\simeq(0,1)\times(\mathbb R/\mathbb Z),
\qquad\dim_{\mathbb R}\check X_0=1+1=2.
$$

**第3問**。$r>0$ なら半径 $r$ のファイバーは円周で、$H_1(L_r;\mathbb Z)\simeq\mathbb Z$ である。しかし $r=0$ のファイバーは原点一点なので $H_1(L_0;\mathbb Z)=0$ である。さらに $r$ は原点で滑らかな劣没写像にならない。局所自明な円周束なら全ファイバーは円周に同相で第一ホモロジーの階数は一定のはずであり、この仮定が破れている。従って第6節のトーラス束の貼り合わせ証明を原点へ延長できない。この模型は**一般のSYZ特異ファイバーの分類**ではなく、滑らかな束仮定が壊れる最小例である。

**第4問**。結論できない。(1)は滑らかな局所Lagrange円周束、(2)はその平坦局所系の分類に過ぎない。鏡像の構成には、対象のCalabi–Yau計量と正則体積形式、特殊Lagrangeの位相・較正条件、（必要なら）適切な大域ファイブレーション、鏡像の複素・Kähler構造を与える追加データがいる。特異ファイバーがあれば(3)のように滑らかな束の証明が途切れ、補正を伴う貼り合わせも別問題となる。これがSYZの局所的に証明できる部分と一般的な予想を分ける理由である。
<!-- solution-end -->

## 9. この講義の結論

一つの格子基底 $\lambda_1,\ldots,\lambda_r$ があれば、文字は位相の組 $[u_1],\ldots,[u_r]$ で尽くされ、平坦 $U(1)$ 局所系も同じ組で分類される。その一方で、**実トーラスを双対にすること、鏡像の複素構造を作ること、大域的に特殊Lagrangeファイブレーションが存在すること**は異なる数学的主張である。

次の **SYZ1-02「Lagrangeグラフとその局所変形」** では、トーラスの各点ではなく部分多様体そのものをどう動かすかを、余接束のグラフと閉1形式から具体的に計算する。
