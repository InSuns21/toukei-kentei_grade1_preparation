# LREP21 Poincare群と正エネルギー表現

<!-- definition-example-audit: strict -->

[前講の平面波モード](../LREP20/index.md#def-lrep20-plane-wave)では時空の移動が位相の変化として現れました。一方、Lorentz変換は運動量そのものを変えます。両方の変換を一つの群にまとめ、粒子の状態空間でその群を表現すると、エネルギーと運動量を同時に測るための数学的な仕組みが得られます。今回からは有限次元の場の添字ではなく、波束も含む複素Hilbert空間上の作用を考えます。

## 1. 原点も変える時空の対称性

[共通規約](../../../../../dream-theater-lorentz-conventions.md)に従い、$c=\hbar=1$、$\eta=\operatorname{diag}(-1,1,1,1)$ とします。時空ベクトル $x=(t,\boldsymbol x)$、並進ベクトル $a=(a^0,\boldsymbol a)$、四元運動量 $p=(p^0,\boldsymbol p)$ を取ります。上付きの $\mu=0,1,2,3$ は成分番号であり、0 は時間成分（運動量ならエネルギー）、$j=1,2,3$ は空間成分です。Minkowski 内積は

$$
p\cdot a=p^{\mathsf T}\eta a
=-p^0a^0+\sum_{j=1}^3p^ja^j
$$

と書きます。右辺の空間部分だけは通常の Euclid 内積です。$L=SO^+(1,3)$ は[Lorentz群の単位元成分](../LREP9/index.md#def-lrep9-lorentz-group)であり、未来向きの時間的・光的ベクトルの向きを保ちます。

原点を保つ $x\mapsto\Lambda x$ だけでなく、原点を $a$ に移す変換 $x\mapsto a+\Lambda x$ も考えます。先に $b+\Gamma x$ を作用させると $a+\Lambda b+\Lambda\Gamma x$ となります。第二の並進 $b$ が $\Lambda$ で変換されることが直積との違いです。このように一方の群が他方の群に自己同型で作用する積を半直積と呼びます。

<a id="def-lrep21-poincare"></a>

<!-- formal-statement-start -->
> **定義（Poincare群）**
> $V=\mathbb R^{1,3}$ を加法群、$L=SO^+(1,3)$ とする。恒等変換と連結なPoincare群を半直積 $G=V\rtimes L$ と定める。元は $(a,\Lambda)$、積は

$$
(a,\Lambda)(b,\Gamma)=(a+\Lambda b,\Lambda\Gamma).
$$

> 単位元は $(0,I)$、逆元は $(-\Lambda^{-1}a,\Lambda^{-1})$ であり、時空に $x\mapsto a+\Lambda x$ と作用する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep21-poincare -->
**定義の確認**。標準座標の単位ベクトルを $e_0,e_1,e_2,e_3$ とし、$b=e_1=(0,1,0,0)$ を取ります。$R$ は時間・第3空間成分を固定し、$e_1\mapsto e_2,\ e_2\mapsto-e_1$ とする90度回転です。この基底での表示は

$$
R=
\begin{pmatrix}
1&0&0&0\\
0&0&-1&0\\
0&1&0&0\\
0&0&0&1
\end{pmatrix}.
$$

列は各基底ベクトルの像なので $Rb=e_2=(0,0,1,0)$ です。

この行列は

$$
R^{\mathsf T}\eta R=\eta,\qquad \det R=1,\qquad Re_0=e_0
$$

を満たし、回転角を0から90度まで連続に動かせるので $R\in L$ です。従って両方の組は [Poincare群](#def-lrep21-poincare) の元です。

$(0,R)(b,I)=(Rb,R)$ は、先に $x$ 方向へ1だけ移動し、それから回す変換です。逆順は $(b,R)$ です。例えば原点の像はそれぞれ $Rb$ と $b$ なので異なります。逆元の左右の積も別々に確かめます。

$$
(Rb,R)(-b,R^{-1})=(Rb-Rb,I)=(0,I),
$$

$$
(-b,R^{-1})(Rb,R)=(-b+R^{-1}Rb,I)=(0,I).
$$

確かに定義の逆元が作用を取り消します。
<!-- definition-example-end -->

結合法則は任意の3元で確かめられます。左から二元を合成してから第三元 $(d,\Delta)$ を掛けると

$$
((a,\Lambda)(b,\Gamma))(d,\Delta)
=(a+\Lambda b+\Lambda\Gamma d,\Lambda\Gamma\Delta).
$$

右から二元を合成しても $a+\Lambda(b+\Gamma d)=a+\Lambda b+\Lambda\Gamma d$ となります。単位元との左右の積は元自身、逆元との積の並進成分はそれぞれ $a-\Lambda\Lambda^{-1}a=0$ と $-\Lambda^{-1}a+\Lambda^{-1}a=0$。従って群の全条件が成立します。

並進全体は正規部分群です。実際、

$$
(0,\Lambda)(b,I)(0,\Lambda^{-1})=(\Lambda b,I).
$$

一般の $(a,\Lambda)$ で共役しても並進成分は $a+\Lambda b-a=\Lambda b$ です。この式が後で運動量の変換則を生みます。

## 2. スピンを扱うための被覆群

[LREP10の二重被覆](../LREP10/index.md#thm-lrep10-double-cover)では $\rho:SL(2,\mathbb C)\to L$ が全射のLie群準同型で、核は $\{I,-I\}$ でした。回転で符号が変わるスピノルを扱うには、Lorentz行列だけでなくその持ち上げを覚えておく必要があります。並進の成分を残したまま Lorentz 成分を持ち上げましょう。

$\rho$ は群準同型なので

$$
\rho(AB)=\rho(A)\rho(B)
$$

であり、各 $\rho(A)$ は $V$ の可逆線形写像です。従って $A$ の積を並進の自己同型の合成へ移せます。これが半直積の下付き記号 $\rtimes_\rho$ の意味です。

<a id="def-lrep21-covered-poincare"></a>

<!-- formal-statement-start -->
> **定義（被覆Poincare群）**
> $V=\mathbb R^{1,3}$、$\rho:SL(2,\mathbb C)\to L$ を上記の二重被覆とする。被覆Poincare群を $\widetilde G=V\rtimes_\rho SL(2,\mathbb C)$ とし、積を

$$
(a,A)(b,B)=(a+\rho(A)b,AB)
$$

> とする。単位元は $(0,I)$、逆元は $(-\rho(A)^{-1}a,A^{-1})$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep21-covered-poincare -->
**定義の確認**。任意の $a,b$ に対し $(a,-I)(b,I)=(a+b,-I)$。$\rho(-I)=I$ なので時空上では $(a,-I)$ と $(a,I)$ の作用は同じですが、第二成分は異なります。逆元は $(-a,-I)$ で、積を左右とも計算すれば $(0,I)$ になります。また $(0,-I)^2=(0,I)$ です。
<!-- definition-example-end -->

<a id="prop-lrep21-cover"></a>

<!-- formal-statement-start -->
> **命題（Poincare群の二重被覆）**
> 上記の $G,\widetilde G$ に対して写像 $\pi(a,A)=(a,\rho(A))$ は二重被覆のLie群準同型である。核は $\{(0,I),(0,-I)\}$ である。
<!-- formal-statement-end -->

**証明の見取り図。** Lorentz成分の準同型性を積へ代入します。並進はそのままなので、二枚の持ち上げはLorentz成分だけに由来します。

<!-- proof-start -->
### 証明

$\rho(AB)=\rho(A)\rho(B)$ なので、三元の積の並進成分はどちらの括り方でも $a+\rho(A)b+\rho(A)\rho(B)d$、第二成分は $ABD$ です。逆元と単位元の条件も第1節の計算で $\Lambda=\rho(A)$、第二成分を $A$ に置き換えて成立します。

$$
\pi((a,A)(b,B))
=(a+\rho(A)b,\rho(A)\rho(B))
=\pi(a,A)\pi(b,B).
$$

任意の $(a,\Lambda)$ に対して [Lorentz群の二重被覆](../LREP10/index.md#thm-lrep10-double-cover)から $A,-A$ のちょうど二つが $\rho(A)=\Lambda$ を満たします。特に単位元の逆像は $(0,\pm I)$ です。

$\Lambda$ の近傍で二枚に分かれる被覆の局所表示に $V$ の恒等写像を掛ければ、$\pi$ も局所的に二枚の微分同相となります。積と逆元は線形作用と行列の積・逆行列からなる滑らかな写像です。$\square$
<!-- proof-end -->

被覆群の表現で $U(0,-I)=I$ なら $U(a,A)=U(a,-A)$ となり、元の群にも表現を定められます。スピンを含む一般の状態ではこの条件を課さずに $\widetilde G$ を扱います。

## 3. 状態を動かすユニタリ作用

場の有限次元表現は一般に通常の正定値内積を保ちません。粒子の状態では確率の総和が保たれる必要があるので、複素Hilbert空間 $\mathcal H$ の内積を保つ全射線形写像、すなわちユニタリ作用素を用います。その全体を合成に関する群 $\mathcal U(\mathcal H)$ と書きます。また群の元を少し変えたとき、各状態ベクトルの変化がノルムで小さくなることを要求します。

<a id="def-lrep21-unitary-representation"></a>

<!-- formal-statement-start -->
> **定義（強連続ユニタリ表現）**
> $\mathcal H$ を複素Hilbert空間、$G_*$ を $G$ または $\widetilde G$ とする。$U:G_*\to\mathcal U(\mathcal H)$ が

$$
U(e)=I,\qquad U(gh)=U(g)U(h)
$$

> を満たし、任意の $\psi\in\mathcal H$ と $g\in G_*$ に対して

$$
\lim_{h\to g}\|U(h)\psi-U(g)\psi\|=0
$$

> であるとき、強連続ユニタリ表現と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep21-unitary-representation -->
**定義の確認**。$\mathcal H=\mathbb C$ で全ての元に $U(g)z=z$ と定めます。線形で全射、$|U(g)z|=|z|$、積と単位元の条件を満たし、ノルム差は常に0です。従って強連続ユニタリ表現です。これは全ての対称性が状態に恒等的に作用する例であり、非零運動量を持つ例は第6節で構成します。
<!-- definition-example-end -->

以下では $\widetilde G$ の表現を使い、$T(a)=U(a,I)$、$V(A)=U(0,A)$ と略記します。ここからの $V(A)$ は第1節の並進ベクトル空間 $V$ ではなく、Hilbert 空間上のユニタリ作用素です。元の群 $G$ についても、$A$ の代わりに $\Lambda$、$\rho(A)$ の代わりに $\Lambda$ を用いれば同じ計算ができます。$(a,A)=(a,I)(0,A)$ より $U(a,A)=T(a)V(A)$。群法則を表現へ移すと

$$
T(a+b)=T(a)T(b),\qquad
V(A)T(b)V(A)^{-1}=T(\rho(A)b).
$$

時空並進は互いに可換です。各座標 $\mu$ を固定し、実数 $s$ だけを変える $s\mapsto T(se_\mu)$ は [強連続1パラメータユニタリ群](../../../解析系/QM/QM7/index.md#def-qm7-strongly-continuous-unitary-group) です。[Stone の定理](../../../解析系/QM/QM7/index.md#thm-qm7-stone) に $\hbar=1$ を代入し、時間並進には $e^{-itP^0}$、空間並進には $e^{isP^j}$ を採用します。自己共役生成作用素と、強微分で定義される無限小生成作用素を区別すると、各作用素の定義域上で

$$
\left.\frac{d}{dt}T(te_0)\psi\right|_{t=0}=-iP^0\psi,
\qquad
\left.\frac{d}{ds}T(se_j)\psi\right|_{s=0}=iP^j\psi
$$

です。微分するのは並進の実パラメータだけで、$\psi$ と $j$ は固定します。[強微分可能性と定義域](../../../解析系/QM/QM7/index.md#thm-qm7-generator-domain) により、この強微分が存在するベクトルがそれぞれ $D(P^\mu)$ です。$H=P^0$ と書けば、位相は $e^{ip\cdot a}$ で前講の正周波数と一致します。

## 4. 四つの生成作用素を一つの測度にまとめる

四つの自己共役作用素を形式的に足すだけでは、非有界作用素の定義域を扱えません。必要なのは四つの観測量を一緒に指定したときの射影です。[射影値測度](../../../解析系/QM/QM3/index.md#def-qm3-pvm)（PVM）はBorel集合を直交射影へ移し、全空間を $I$ に、互いに素な集合の和を強収束する射影の和に移します。四次元のBorel集合に対しても同じ条件を使います。以下、固定した $\psi$ について $\mu_\psi(B)=\langle\psi,F(B)\psi\rangle$ と置き、$d\langle\psi,F(p)\psi\rangle$ はこの有限正測度による積分を意味するものとします（$F(p)$ という点ごとの作用素を微分しているわけではありません）。

<a id="thm-lrep21-translation-spectrum"></a>

<!-- formal-statement-start -->
> **定理（並進の共同スペクトル表示）**
> $T$ を $\mathbb R^{1,3}$ の強連続ユニタリ表現とする。一意なPVM $F$ が $\mathbb R^4$ 上に存在し、

$$
T(a)=\int_{\mathbb R^4}e^{ip\cdot a}\,dF(p).
$$

> 時間および空間並進の自己共役生成作用素は

$$
P^\mu=\int p^\mu\,dF(p),\qquad
T(te_0)=e^{-itP^0},\quad T(se_j)=e^{isP^j}
$$

> である。ここで $e_\mu$ は座標単位ベクトル、$j=1,2,3$ である。各 $P^\mu$ の定義域は

$$
D(P^\mu)=
\left\{\psi:\int |p^\mu|^2\,d\langle\psi,F(p)\psi\rangle<\infty\right\}.
$$

> 各生成作用素のスペクトル射影は互いに可換である。
<!-- formal-statement-end -->

**証明の見取り図。** 各軸の並進へStoneの定理を適用します。可換な並進から、可換な有界作用素（Cayley変換）を取り出します。これらを同時に座標関数として表し、実数座標へ戻すと共同PVMになります。この手続きにより、非有界作用素の積を無条件に計算する必要がなくなります。

<!-- proof-start -->
### 証明

各 $t\mapsto T(te_\mu)$ は強連続な1パラメータユニタリ群です。[Stone の定理](../../../解析系/QM/QM7/index.md#thm-qm7-stone)から一意な自己共役作用素を得ます。空間成分ではStoneの通常の $e^{-itH}$ の生成作用素の負を $P^j$ として採用します。各 $\mu$ のスペクトル測度を $F_\mu$ とします。

任意の実数 $s,t$ と座標番号 $\mu,\nu$ について、並進は可換なので

$$
T(se_\mu)T(te_\nu)=T(te_\nu)T(se_\mu).
$$

固定したユニタリ作用素 $Q=T(se_\mu)$ で $P^\nu$ を共役します。$Q T(te_\nu)Q^{-1}=T(te_\nu)$ を $t=0$ で強微分すると、微分可能なベクトルの集合も変わらず、共役した生成作用素は同じ1パラメータ群を生成します。[Stone の定理](../../../解析系/QM/QM7/index.md#thm-qm7-stone)の一意性より

$$
T(se_\mu)P^\nu T(se_\mu)^{-1}=P^\nu
$$

です（定義域も共役されます）。[非有界自己共役作用素のスペクトル定理](../../../解析系/QM/QM6/index.md#thm-qm6-unbounded-self-adjoint-spectral)の一意性により、任意のBorel集合 $B$ について

$$
T(se_\mu)F_\nu(B)=F_\nu(B)T(se_\mu).
$$

従って反射 $I-2F_\nu(B)$ も全ての $T(se_\mu)$ と可換です。この反射はユニタリなので、再度 [Stone の定理](../../../解析系/QM/QM7/index.md#thm-qm7-stone) と [スペクトル定理](../../../解析系/QM/QM6/index.md#thm-qm6-unbounded-self-adjoint-spectral) の一意性を適用すると

$$
(I-2F_\nu(B))F_\mu(C)=F_\mu(C)(I-2F_\nu(B))
$$

が任意のBorel集合 $C$ に対して成り立ちます。両辺の共通項を引き、$-2$ で割れば全てのスペクトル射影の可換性が得られます。

[Cayley変換](../../../解析系/QM/QM6/index.md#def-qm6-cayley-transform)を使い、

$$
C_\mu=(P^\mu-iI)(P^\mu+iI)^{-1}
=\int\frac{q-i}{q+i}\,dF_\mu(q)
$$

と置きます。積分を有界単関数で近似すると、上の射影の可換性から $C_\mu$ と $C_\nu,C_\nu^*$ は可換です。$C_\mu$ はユニタリで $1$ の固有ベクトルは存在しません。実際 $I-C_\mu=2i(P^\mu+iI)^{-1}$ の核は零です。

四つの $C_\mu$ と随伴と $I$ が生成するノルム閉部分環は可換な単位的 $C^*$ 環です。[可換 Gelfand--Naimark 定理](../../../解析系/OA/OA4/index.md#thm-oa4-commutative-gelfand-naimark)を適用すると $C(K)$ と同型になります。ここで $K$ はそのcharacter空間（非零の複素数値代数準同型全体）です。

各characterは四つの $C_\mu$ とその随伴の多項式上の値で決まり、連続性によりそのノルム閉包でも決まります。$C_\mu^*C_\mu=I$ なので各characterの値は単位円上にあり、$K$ は四つの単位円の直積のコンパクト部分集合として同一視でき、$C_\mu$ は座標関数 $z_\mu$ に対応します。

この同型から得る単位的 $*$ 準同型を $\Pi:C(K)\to B(\mathcal H)$ と書きます（第2節の被覆写像 $\pi$ とは別です）。[可換関数環表現の射影値測度表示](../../../解析系/OA/OA6/index.md#thm-oa6-commutative-representation-pvm) は平面のコンパクト集合について述べられていますが、その証明をここで必要なコンパクト距離空間へ適用できる理由を確認します。

まず実数値連続関数 $h\ge0$ について $\Pi(h)=\Pi(\sqrt h)^*\Pi(\sqrt h)$ なので

$$
\langle\psi,\Pi(h)\psi\rangle
=\|\Pi(\sqrt h)\psi\|^2\ge0.
$$

$K$ はコンパクト Hausdorff 空間で $C_c(K)=C(K)$（実数値部分を先に取る）です。[Riesz--Markov の定理](../../../解析系/MT/MT5/index.md#thm-mt5-riesz-markov-positive) により正測度 $\mu_\psi$ を得ます。複素数値関数については実部と虚部に分ければ積分表示が成立します。全質量は

$$
\mu_\psi(K)=\langle\psi,\Pi(1)\psi\rangle=\|\psi\|^2
$$

です。OA6 と同じ偏極および [Hilbert 空間の Riesz 表現定理](../../../解析系/F0/F0-02C2/index.md#ref-riesz-representation) から、Borel 集合 $B$ ごとに 次の性質を満たす作用素を得ます。

$$
0\le E(B)\le I,\qquad
\langle\psi,E(B)\psi\rangle=\mu_\psi(B).
$$

積の規則も座標に依存しません。OA6 の測度構成を有界 Borel 関数の積分 $M(f)=\int f\,dE$ に拡張します。連続関数 $f,g$ について $M(fg)=M(f)M(g)$ は $\Pi$ の準同型性です。一方の関数を固定して有界各点収束を取ると、偏極した有限測度による積分は弱作用素の意味で収束し、固定した有界作用素との積も弱収束を保ちます。閉集合 $D$ の指示関数は距離関数を使う連続関数 $\max(0,1-n\,d(z,D))$ の各点極限です（空集合は零関数）。閉集合は Borel 集合を生成するので、OA6 の単調族の議論を二つの変数に順に適用して全有界 Borel 関数へ積の規則を拡張できます。特に

$$
E(B)E(C)=M(\mathbf1_B\mathbf1_C)=E(B\cap C).
$$

$C=B$ とすれば $E(B)^2=E(B)$。互いに素な集合の射影は直交し、弱可算加法性と直交性から射影の部分和は強収束します。従って $E$ は PVM です。一意性は連続関数上の積分表示と Riesz--Markov の一意性、偏極から従います。以上の議論に平面への埋め込みは不要であり、

$$
C_\mu=\int_K z_\mu\,dE(z)
$$

となります。$E(\{z:z_\mu=1\})$ の像は $C_\mu-I$ の核です。なぜなら

$$
\|(C_\mu-I)\psi\|^2
=\int_K|z_\mu-1|^2\,d\langle\psi,E(z)\psi\rangle
$$

であり、右辺が0であることと $\psi$ の測度が $z_\mu=1$ に集中することが同値だからです。核は零なのでその射影も零です。四つの例外集合の和にも射影は零です。

残りの集合を $K_0=\{z\in K:z_\mu\ne1\ (\mu=0,1,2,3)\}$ とします。$z_\mu=(p^\mu-i)/(p^\mu+i)$ を解くと

$$
(z_\mu-1)p^\mu=-i(1+z_\mu),
\qquad
p^\mu=\frac{i(1+z_\mu)}{1-z_\mu}.
$$

$|z_\mu|=1$ かつ $z_\mu\ne1$ なのでこの値は実数です。四つの逆 Cayley 写像をまとめた連続写像を $c:K_0\to\mathbb R^4$ とし、$F(B)=E(c^{-1}(B))$ と定めます。逆像は交わり・可算和を保ち、$E(K_0)=I$ なので、これは正規化されたPVMです。[非有界スペクトル積分の定義域とノルム](../../../解析系/QM/QM6/index.md#prop-qm6-unbounded-integral-domain)および [Cayley変換の基本性質](../../../解析系/QM/QM6/index.md#prop-qm6-cayley-properties)により実座標積分は元の $P^\mu$ と一致します。従って座標軸ごとの並進を掛け合わせると

$$
T(a)=\prod_{\mu=0}^3T(a^\mu e_\mu)
=\int e^{-ip^0a^0+i\sum_{j=1}^3p^ja^j}\,dF(p).
$$

最後に一意性を確認します。別のPVMが同じ $T$ を表すなら、各座標への像測度は [Stone の定理](../../../解析系/QM/QM7/index.md#thm-qm7-stone) と [スペクトル定理](../../../解析系/QM/QM6/index.md#thm-qm6-unbounded-self-adjoint-spectral) の一意性で $F_\mu$ に一致します。直積集合 $B_0\times\cdots\times B_3$ への射影は座標ごとの射影の積 $\prod_\mu F_\mu(B_\mu)$ です。Borel集合を生成するこの直積集合上で一致するので、各ベクトルの有限正測度は全Borel集合で一致します。偏極により作用素も一致します。$\square$
<!-- proof-end -->

例えば $\mathbb C^2$ で $p_1=(2,0,0,0)$、$p_2=(3,1,0,0)$ とし、$T(a)=\operatorname{diag}(e^{ip_1\cdot a},e^{ip_2\cdot a})$ とします。位相の積は加法に対応し、各対角要素の絶対値は1、連続性も成り立ちます。共同PVMは $F(B)=\operatorname{diag}(\mathbf1_B(p_1),\mathbf1_B(p_2))$ です。生成作用素は $P^0=\operatorname{diag}(2,3)$、$P^1=\operatorname{diag}(0,1)$、$P^2=P^3=0$ です。個々のスペクトルの直積には $(2,1,0,0)$ も含まれますが、その点の共同射影は零です。共同スペクトルには観測量の相関も含まれます。

## 5. Lorentz変換とエネルギー条件

共同PVMのうち、任意の近傍の射影が零でない点を集めた閉集合を共同スペクトル $\Sigma$ と呼びます。$\mathbb R^4$ は可算基を持つので、$\Sigma$ の補集合は射影が零の可算個の開集合で覆われ、$F(\Sigma)=I$ です。ここでは未来閉光円錐を

$$
\overline V_+=\{p:p^0\ge|\boldsymbol p|\}
$$

と書きます。時間並進のエネルギーが負でないことだけでなく、全ての慣性系に移っても負にならないことが重要です。

<a id="def-lrep21-positive-energy"></a>

<!-- formal-statement-start -->
> **定義（正エネルギー表現）**
> $U$ をPoincare群またはその被覆群の強連続ユニタリ表現、$F$ を並進の共同PVMとする。次の条件を満たすとき正エネルギー表現と呼ぶ。

$$
F(\overline V_+)=I
$$

> すなわち共同スペクトルは $\overline V_+$ に含まれる。零運動量を許す非負エネルギーの条件である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep21-positive-energy -->
**定義の確認**。第3節の自明な表現では $T(a)=I=e^{i0\cdot a}I$ で、[並進の共同スペクトル表示](#thm-lrep21-translation-spectrum)の一意性より $F(B)=\mathbf1_B(0)I$。$0\in\overline V_+$ なので $F(\overline V_+)=I$ です。[強連続ユニタリ表現](#def-lrep21-unitary-representation) の条件は第3節で確かめたため、正エネルギー表現の全条件を満たします。第6節では零でない連続運動量を持つ例も構成します。
<!-- definition-example-end -->

<a id="thm-lrep21-covariance"></a>

<!-- formal-statement-start -->
> **定理（共同スペクトルのLorentz共変性）**
> $U$ を被覆Poincare群の強連続ユニタリ表現、$F$ をその並進の共同PVM、$V(A)=U(0,A)$、$\Lambda=\rho(A)$ とする（元の群の表現では $V(A)$ を $U(0,\Lambda)$ に読み替える）。任意のBorel集合 $B\subset\mathbb R^4$ に対し

$$
V(A)F(B)V(A)^{-1}=F(\Lambda B).
$$

> 従って共同スペクトル $\Sigma$ は $\Lambda\Sigma=\Sigma$ を満たす。さらに各生成作用素について

$$
V(A)P^\mu V(A)^{-1}
=\int(\Lambda^{-1}p)^\mu\,dF(p)
$$

> が自己共役作用素として成り立つ（右辺の二次モーメント条件で定義域も指定する）。
<!-- formal-statement-end -->

**証明の見取り図。** Lorentz変換で並進を共役すると並進方向が変わります。位相の内積を変形すれば、共同測度の変数変換が分かり、測度の一意性が共変性を与えます。

<!-- proof-start -->
### 証明

[被覆Poincare群](#def-lrep21-covered-poincare) の積を三元に適用します。この積の計算は $V(A)T(a)V(A)^{-1}=T(\Lambda a)$ となります。左辺は [共同スペクトル表示](#thm-lrep21-translation-spectrum) によってPVM $B\mapsto V(A)F(B)V(A)^{-1}$ の位相積分になります。右辺は[Minkowski内積の保存](../LREP9/index.md#def-lrep9-lorentz-group) $p\cdot\Lambda a=(\Lambda^{-1}p)\cdot a$ から

$$
T(\Lambda a)=\int e^{i(\Lambda^{-1}p)\cdot a}\,dF(p).
$$

$p\mapsto\Lambda^{-1}p$ の像測度は $B\mapsto F(\Lambda B)$ です。共同PVMの一意性から主張の式が成立します。$\Lambda$ は同相であり、ユニタリ共役は射影が零かどうかを変えないため、$\Sigma$ の各点の開近傍の条件も保存されます。

座標関数のスペクトル積分を共役すると、まず有界な切断関数 $p^\mu\mathbf1_{|p^\mu|\le n}$ について像測度の式が成り立ちます。切断を外すと [非有界スペクトル積分の定義域とノルム](../../../解析系/QM/QM6/index.md#prop-qm6-unbounded-integral-domain)により、共役作用素の定義域は

$$
\int |(\Lambda^{-1}p)^\mu|^2
\,d\langle\psi,F(p)\psi\rangle<\infty
$$

を満たす $\psi$ の集合となり、そこでは切断積分がノルム収束します。従って作用素として等しいことが示されました。$\square$
<!-- proof-end -->

例えば $F$ がある運動量の小さな近傍 $B$ への測定を表すなら、$V(A)$ で変換した状態の $\Lambda B$ における測定確率は元の状態の $B$ における確率と同じです。生成作用素の共役式に逆行列が現れることと、状態の運動量が $\Lambda$ で移ることは矛盾しません。

<a id="prop-lrep21-energy-cone"></a>

<!-- formal-statement-start -->
> **命題（非負時間生成作用素と未来円錐）**
> $U$ をPoincare群または被覆Poincare群の強連続ユニタリ表現とする。このとき $P^0$ が非負であることと、共同スペクトルが未来閉光円錐に含まれることは同値である。
<!-- formal-statement-end -->

**証明の見取り図。** 空間的な運動量は適切なboostで時間成分を負にできます。群全体の共変性があると、その負の時間成分も同じ共同スペクトルに現れてしまいます。

<!-- proof-start -->
### 証明

円錐条件から $p^0\ge0$ がPVMの意味で成立します。任意の $\psi\in D(P^0)$ について

$$
\langle\psi,P^0\psi\rangle=\int p^0\,d\mu_\psi(p)\ge0
$$

となるので $P^0$ は非負です。逆に $P^0\ge0$ とします。$B_n=\{p:-n\le p^0\le-1/n\}$ の射影が零でなければ、非零の $\psi\in F(B_n)\mathcal H$ は [共同スペクトル表示](#thm-lrep21-translation-spectrum) の二次モーメント条件を満たし、

$$
\langle\psi,P^0\psi\rangle\le-\|\psi\|^2/n<0
$$

となって矛盾します。全ての $n\ge1$ で $F(B_n)=0$、これらの増大和は $\{p:p^0<0\}$ なのでその射影も零です。従って $\Sigma\subset\{p:p^0\ge0\}$ です。

ある $p\in\Sigma$ が円錐外なら $0\le p^0<k=|\boldsymbol p|$ です。空間回転で $\boldsymbol p=(k,0,0)$ に移します。次に速度 $\beta$ が $p^0/k<\beta<1$ を満たすboostを選び、

$$
p'^0=\gamma(p^0-\beta k),\qquad
p'^1=\gamma(k-\beta p^0),\quad
\gamma=(1-\beta^2)^{-1/2}
$$

とします。これは任意の時空ベクトルの第0・第1成分に同じ係数を掛け、残りの2成分を固定する線形変換です。任意の実数 $u,v$ に対して

$$
-\gamma^2(u-\beta v)^2+\gamma^2(v-\beta u)^2
=-u^2+v^2
$$

なので全ベクトルについて計量を保存します。$\beta=0$ から連続につながるので [Lorentz群の単位元成分](../LREP9/index.md#def-lrep9-lorentz-group) に属します。$p'^0<0$ です。[共同スペクトルのLorentz共変性](#thm-lrep21-covariance)より $p'\in\Sigma$ となり矛盾します。従って $\Sigma\subset\overline V_+$ です。$\square$
<!-- proof-end -->

並進だけの表現ではこの命題は成立しません。例えば $\mathbb C$ 上の $T(a)=e^{ip\cdot a}$、$p=(1,2,0,0)$ は時間生成作用素が1ですが円錐外です。この表現を同じ空間上のPoincare群表現へ延長することはできません。欠けている条件は共同スペクトルのLorentz不変性です。

## 6. 連続運動量の具体例

正質量 $m>0$ を固定し、$p(\boldsymbol q)=(E_{\boldsymbol q},\boldsymbol q)$、$E_{\boldsymbol q}=\sqrt{m^2+|\boldsymbol q|^2}$ とします。$\mathcal H=L^2(\mathbb R^3,d^3q)$ の要素は運動量を変数とする波束です。ここではLebesgue測度を使い、Lorentz変換に対するJacobian補正でノルムを保つ例を作ります。

以下では空間運動量 $\boldsymbol q$ を短く $q$ とも書きます。$p(q)$ の像は $p\cdot p=-m^2,\ p^0>0$ で定まる未来向き質量殻です。[Lorentz群](../LREP9/index.md#def-lrep9-lorentz-group) は計量と未来向きを保つので、この集合を保存します。$\ell_\Lambda(q)$ を $\Lambda p(q)$ の空間成分と定めると、正の時間成分は空間成分から一意に復元でき、

$$
p(\ell_\Lambda(q))=\Lambda p(q),\qquad
\ell_\Lambda\circ\ell_\Gamma=\ell_{\Lambda\Gamma}
$$

となります。特に逆写像は $\ell_{\Lambda^{-1}}$ です。$m>0$ により $p(q)$ は全ての $q$ で滑らかであり、空間成分の取り出しも線形なので両写像は滑らかな微分同相です。

$D\ell_\Lambda(q)$ は $\Lambda$ を固定して $q^1,q^2,q^3$ で微分する $3\times3$ の Jacobian 行列、すなわち

$$
(D\ell_\Lambda(q))_{ij}
=\frac{\partial(\ell_\Lambda(q))^i}{\partial q^j}
=\Lambda^i{}_0\,\frac{q^j}{E_q}+\Lambda^i{}_j,
\qquad i,j=1,2,3
$$

です。$D\ell_{\Lambda^{-1}}(\ell_\Lambda(q))D\ell_\Lambda(q)=I_3$ なので行列式は零になりません。変数変換の体積倍率を $J_\Lambda(q)=|\det D\ell_\Lambda(q)|>0$ と書きます。

$$
(T(a)f)(q)=e^{ip(q)\cdot a}f(q),
$$

$$
(V(A)f)(q)=
\sqrt{J_{\rho(A)^{-1}}(q)}
f(\ell_{\rho(A)^{-1}}(q)).
$$

位相の絶対値は1です。また $r=\ell_{\Lambda^{-1}}(q)$ と変数変換すれば

$$
\|V(A)f\|^2
=\int J_{\Lambda^{-1}}(q)|f(\ell_{\Lambda^{-1}}(q))|^2d^3q
=\int|f(r)|^2d^3r.
$$

$\Gamma=\rho(B)$ とします。逆写像の合成順は $\ell_{(\Lambda\Gamma)^{-1}}=\ell_{\Gamma^{-1}}\circ\ell_{\Lambda^{-1}}$ です。[多変数の連鎖律](../../../基礎科目/RA/RA6/index.md#thm-ra6-chain-rule) をこの合成に適用すると

$$
D\ell_{(\Lambda\Gamma)^{-1}}(q)
=D\ell_{\Gamma^{-1}}(\ell_{\Lambda^{-1}}(q))D\ell_{\Lambda^{-1}}(q)
$$

となります。両辺の行列式の絶対値を取り、$|\det(XY)|=|\det X|\,|\det Y|$ を使うと

$$
J_{(\Lambda\Gamma)^{-1}}(q)
=J_{\Gamma^{-1}}(\ell_{\Lambda^{-1}}(q))J_{\Lambda^{-1}}(q).
$$

従って

$$
\begin{aligned}
(V(A)V(B)f)(q)
&=\sqrt{J_{\Lambda^{-1}}(q)J_{\Gamma^{-1}}(\ell_{\Lambda^{-1}}(q))}
 f(\ell_{\Gamma^{-1}}(\ell_{\Lambda^{-1}}(q)))\\
&=(V(AB)f)(q).
\end{aligned}
$$

$V(I)=I$ なので $V(A)^{-1}=V(A^{-1})$ であり、ノルム保存と合わせて全射ユニタリ性が得られます。さらに $p(\ell_{\Lambda^{-1}}(q))\cdot b=p(q)\cdot\Lambda b$ なので

$$
V(A)T(b)=T(\Lambda b)V(A).
$$

従って $U(a,A)=T(a)V(A)$ と定めると

$$
U(a,A)U(b,B)=T(a+\Lambda b)V(AB).
$$

これで群法則とユニタリ性を確認しました。

強連続性も確かめます。並進については各点で位相が連続で、

$$
|(T(a)f)(q)-f(q)|^2\le4|f(q)|^2
$$

です。優収束により単位元での強連続性が従います。

$V(A)$ についてまず連続コンパクト台の $f$ を取ります。$A\to I$ のとき $\ell_{\Lambda^{-1}}(q)\to q$、Jacobianは1に収束します。$A$ を単位元のコンパクト近傍に制限すれば、合成関数の台は元の台の像の和に含まれ、共通のコンパクト集合に収まります。

その集合上でJacobianは連続で有界なので、優収束で $\|V(A)f-f\|\to0$ です。連続コンパクト台の関数は $L^2$ で稠密です。任意の $f$ に対しそのような $g$ を選ぶと

$$
\|V(A)f-f\|\le2\|f-g\|+\|V(A)g-g\|.
$$

まず $A\to I$、次に $\|f-g\|\to0$ とすれば任意の $f$ で強連続です。積 $U$ の単位元での連続性は三角不等式、任意の元での連続性は群法則とノルム保存から従います。

この例の共同PVMは

$$
(F(B)f)(q)=\mathbf1_B(p(q))f(q).
$$

各射影は指示関数の二乗が自身であることと実数値であることから直交射影です。互いに素な集合の可算和では指示関数の部分和が各点で収束し、$|f|^2$ を上界に優収束を使えば強可算加法性が成立します。全空間の射影は $I$、位相積分が $T(a)$ になるので一意性によりこの $F$ が共同PVMです。$E_q\ge|q|$ なので正エネルギー条件も満たされます。

特に $P^0$ は $E_q$ を掛ける作用素で、定義域は $\int E_q^2|f(q)|^2d^3q<\infty$ です。状態のノルムが有限でもこの積分は発散する場合があるため、並進表現は全状態で定義されることと生成作用素の定義域を区別します。

## 7. 演習

### Level A

<a id="ex-lrep21-a01"></a>

#### LREP21-A01 回転と並進の順序
- Level: A
- ID: LREP21-A01

$R$ を $xy$ 平面で180度回す回転、$a=(1,2,0,0)$、$b=(0,0,3,0)$ とする。$(a,R)(b,I)$ とその逆元を求めよ。

<!-- solution-start -->
**詳細解答。** [Poincare群の積](#def-lrep21-poincare)では $Rb=(0,0,-3,0)$ なので、積は $(c,R)$、$c=(1,2,-3,0)$ です。$R^{-1}=R$ であり $R^{-1}c=(1,-2,3,0)$。逆元は $((-1,2,-3,0),R)$ です。左から積を取ると並進成分は $(-1,2,-3,0)+(1,-2,3,0)=0$、Lorentz成分は $R^2=I$ です。
<!-- solution-end -->

<a id="ex-lrep21-a02"></a>

#### LREP21-A02 被覆の二枚
- Level: A
- ID: LREP21-A02

$\rho(A)=\Lambda$ とし、$(a,\Lambda)$ の逆像を全て求め、二つの逆像の商を計算せよ。

<!-- solution-start -->
**詳細解答。** [二重被覆](#prop-lrep21-cover)から逆像は $(a,A),(a,-A)$ です。後者の逆元は $(-\Lambda^{-1}a,-A^{-1})$。前者を左から掛けると並進成分は $a-\Lambda\Lambda^{-1}a=0$、行列成分は $A(-A^{-1})=-I$ なので商は $(0,-I)$ です。
<!-- solution-end -->

<a id="ex-lrep21-a03"></a>

#### LREP21-A03 位相から生成作用素を読む
- Level: A
- ID: LREP21-A03

$\mathbb C^2$ 上で $T(a)=\operatorname{diag}(e^{-2ia^0},e^{-5ia^0+3ia^1})$ とする。四つの生成作用素と共同PVMを求めよ。

<!-- solution-start -->
**詳細解答。** [並進の共同スペクトル表示](#thm-lrep21-translation-spectrum)の位相規約から、時間軸で $P^0=\operatorname{diag}(2,5)$、第一空間軸で $P^1=\operatorname{diag}(0,3)$、残りは $P^2=P^3=0$。共同運動量は $r=(2,0,0,0)$、$s=(5,3,0,0)$ です。よって $F(B)=\operatorname{diag}(\mathbf1_B(r),\mathbf1_B(s))$。この測度の位相積分が与えられた $T$ を再現するので一意性から答えです。
<!-- solution-end -->

<a id="ex-lrep21-a04"></a>

#### LREP21-A04 正エネルギー条件の判定
- Level: A
- ID: LREP21-A04

四元運動量 $(3,1,2,2),(2,1,2,2),(-4,0,0,0),(0,0,0,0)$ のうち未来閉光円錐に入るものを選べ。

<!-- solution-start -->
**詳細解答。** 最初の二点の空間ノルムはいずれも $\sqrt{1+4+4}=3$ です。[正エネルギー条件](#def-lrep21-positive-energy)では時間成分がこの値以上必要です。従って第一点は境界上、第二点は外部です。第三点は $-4<0$ なので外部。第四点は $0=0$ なので円錐に含まれます。
<!-- solution-end -->

### Level B

<a id="ex-lrep21-b01"></a>

#### LREP21-B01 空間的運動量の負エネルギー化
- Level: B
- ID: LREP21-B01

$p=(2,3,0,0)$ に $\beta=4/5$ の第5節のboostを施し、時間成分とLorentz二次形式を計算せよ。非負の時間生成作用素を持つPoincare表現の共同スペクトルにこの点が入らない理由を述べよ。

<!-- solution-start -->
**詳細解答。** $\gamma=(1-16/25)^{-1/2}=5/3$ です。従って

$$
p'^0=(5/3)(2-12/5)=-2/3,
$$

$$
p'^1=(5/3)(3-8/5)=7/3.
$$

二次形式は $-(p'^0)^2+(p'^1)^2=-4/9+49/9=5$ で、元の $-4+9=5$ と一致します。[共同スペクトルのLorentz共変性](#thm-lrep21-covariance)により $p$ が共同スペクトルに入れば $p'$ も入ります。しかし $p'^0<0$ なので、時間成分の周辺スペクトルにも負の値が現れ、$P^0\ge0$ に反します。
<!-- solution-end -->

<a id="ex-lrep21-b02"></a>

#### LREP21-B02 生成作用素の定義域
- Level: B
- ID: LREP21-B02

$\ell^2(\mathbb N)$ 上で $(T(a)c)_n=e^{-ina^0}c_n$ とする。$c_n=1/n$ は状態空間に属するか、時間生成作用素の定義域に属するか。規格化しても結論が変わるか。

<!-- solution-start -->
**詳細解答。** $\sum_{n\ge1}|c_n|^2=\sum n^{-2}<\infty$ なので $c\in\ell^2$ です。共同PVMは $n$ 番目の成分を運動量 $(n,0,0,0)$ に割り当てます。[共同スペクトル表示](#thm-lrep21-translation-spectrum)の定義域条件は $\sum n^2|c_n|^2<\infty$ ですが、各項は1で発散します。従って $c\notin D(P^0)$。有限の非零定数で割って規格化しても発散は変わりません。位相を掛ける $T(a)c$ は全ての $a$ で存在します。
<!-- solution-end -->

<a id="ex-lrep21-b03"></a>

#### LREP21-B03 共同分布と周辺分布
- Level: B
- ID: LREP21-B03

$\mathbb C^2$ の共同運動量を $r=(4,1,0,0)$、$s=(5,2,0,0)$ とし、状態 $\psi=(1,2)^{\mathsf T}/\sqrt5$ を取る。$p^0\ge5$ と $p^1\le1$ が同時に成立する確率、およびそれぞれの周辺確率を求めよ。

<!-- solution-start -->
**詳細解答。** [共同スペクトル表示](#thm-lrep21-translation-spectrum)では各点への射影が対応する座標射影です。第一の条件は $s$ だけなので確率は $|2/\sqrt5|^2=4/5$、第二の条件は $r$ だけなので $1/5$。同時に成立する点はありません。対応する射影の積は $\operatorname{diag}(0,1)\operatorname{diag}(1,0)=0$ なので確率は0です。周辺確率の積 $4/25$ とは異なります。
<!-- solution-end -->

### Level C

<a id="ex-lrep21-c01"></a>

#### LREP21-C01 回転と並進の波束表現を構成する
- Level: C
- ID: LREP21-C01

$m>0$ とし、第6節の $\mathcal H=L^2(\mathbb R^3,d^3q)$ で、空間回転 $R\in SO(3)$ に対して $(W(R)f)(q)=f(R^{-1}q)$ とする。時空並進 $T(a)$ と組み合わせ、$(a,R)$ に対するユニタリ表現を作れ。強連続性と共同PVMの共変性を確認し、エネルギー射影の正値性を説明せよ。

<!-- solution-start -->
**詳細解答。** $R$ は空間ノルムを保つので $E_{R^{-1}q}=E_q$。$R$ を時間成分を固定する四次変換にも用います。$\det R=1$ なので変数変換 $q=Rr$ で

$$
\int|f(R^{-1}q)|^2d^3q=\int|f(r)|^2d^3r.
$$

$W(R^{-1})$ が逆作用素、$W(R)W(S)f(q)=f(S^{-1}R^{-1}q)=W(RS)f(q)$。位相については

$$
p(R^{-1}q)\cdot b=-E_q b^0+(R^{-1}q)\cdot\boldsymbol b
=p(q)\cdot Rb.
$$

従って $W(R)T(b)=T(Rb)W(R)$。$U(a,R)=T(a)W(R)$ と置けば、積は $T(a+Rb)W(RS)$ となり [Poincare群の積](#def-lrep21-poincare)を回転部分群に制限した法則に一致します。各因子がユニタリなので積もユニタリです。

強連続性は、回転についてまず連続コンパクト台の $g$ を取ると $g(R^{-1}q)\to g(q)$ で、台は回転によらず共通の閉球内に収まり、差の二乗はその球の指示関数に $4\sup|g|^2$ を掛けたもの以下です。優収束でノルム差は0へ収束し、任意の $f$ には $\|W(R)f-f\|\le2\|f-g\|+\|W(R)g-g\|$ を使います。並進の連続性も $|e^{ip(q)\cdot a}-1|^2|f(q)|^2\le4|f(q)|^2$ と各点収束から従います。従って積の表現も強連続です。

共同PVMは第6節の $F(B)$ です。[共同スペクトル表示](#thm-lrep21-translation-spectrum) の一意性により、回転部分群への制限でも並進が同じなら測度は変わりません。

$$
(W(R)F(B)W(R)^{-1}f)(q)
=\mathbf1_B(p(R^{-1}q))f(q)
=\mathbf1_{RB}(p(q))f(q).
$$

よって回転部分群において [共同スペクトルの共変性](#thm-lrep21-covariance) の式を直接確認できました。時間生成作用素は $E_q$ の乗算で、$E_q\ge m>0$ です。負の時間成分を持つ集合への射影は零であり、全ての共同運動量は未来閉光円錐にあります。この演習の回転・並進表現は第6節で構成した全群の表現を制限したものです。
<!-- solution-end -->

## 8. 次の講義へ

並進の四つの生成作用素は共同PVMにまとめられ、Lorentz変換はその測度を共変的に動かします。正エネルギー条件は未来閉光円錐を選びます。次は、その内部でLorentz変換が変えられない量として質量を、さらに回転とboostの生成作用素を組み合わせた量としてスピンを扱います。
