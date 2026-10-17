# MF8 Modularity TheoremとFermatの最終定理への橋

[MF7のレベル11のnewform](../MF7/index.md#prop-mf7-level-eleven)は $q-2q^2-q^3+2q^4+q^5+\cdots$ という係数列を持ちます。一方、[EC7の有限体上の点数](../../EC/EC7/index.md#def-ec7-rational-points)は楕円曲線の方程式を素数ごとに解いて得られます。一つは上半平面の正則関数、もう一つは有限体の方程式です。この二つの計算が同じ整数を生み出すことに、どのような数学的意味があるのでしょうか。[EC11の既出の係数照合](../../EC/EC11/index.md#thm-ec11-euler-factor-identity)を出発点として、次はその一致を保証する存在定理へ進みます。

鍵になるのは、[EC10のHasse–Weil $L$ 関数](../../EC/EC10/index.md#def-ec10-hasse-weil-l)と[MF7のnewformの局所因子](../MF7/index.md#prop-mf7-local-factor)を同じ素数ごとに比較することです。係数の一致を実例で検算し、全素数にわたる一致を主張する **Modularity Theorem** の正確な内容を述べます。その後、仮にFermat方程式に反例があれば構成できる曲線が、なぜこの定理とRibetの結果に矛盾するのかを追います。

**この章の証明範囲。** 導手11の点数・還元、Frey曲線の判別式・不変量、レベル2のカスプ形式の消失、そして外部定理からの論理的帰結を証明します。局所因子からのEuler積の一致は[EC11の既出定理](../../EC/EC11/index.md#thm-ec11-euler-factor-identity)を使います。Modularity Theorem、Ribetのlevel lowering、一般のGalois表現・Jacobianの構成は外部大定理として**証明せず**、必要な対象・仮定・結論を明示します。

<!-- definition-example-audit: strict -->

## 1. 有限体の点数とFourier係数を実際に比べる

まず使う楕円曲線を固定します。[EC1の一般Weierstrass方程式](../../EC/EC1/index.md#def-ec1-weierstrass-curve)の整数係数の例として

$$
E_{11}:\quad y^2+y=x^3-x^2-10x-20
$$

を考えます。これはレベル11のnewformと対応する例ですが、今は対応を仮定せず有限体上で独立に計算します。

[EC1の判別式](../../EC/EC1/index.md#def-ec1-invariants)の記号で $a_1=0,a_2=-1,a_3=1,a_4=-10,a_6=-20$ とすると

$$
\begin{aligned}
b_2&=-4,&b_4&=-20,&b_6&=-79,&b_8&=-21,\\
\Delta_E&=-b_2^2b_8-8b_4^3-27b_6^2+9b_2b_4b_6\\
&=336+64000-168507-56880=-121051=-11^5.
\end{aligned}
$$

したがって $p\ne11$ ではこの整数モデルの判別式が $p$ で零にならず、[EC9の良い還元の判定](../../EC/EC9/index.md#def-ec9-good-reduction)によって良い還元を持ちます。

$p=2$ では右辺は $x^3-x^2$ で、$x=0,1$ のいずれでも0です。左辺 $y^2+y$ も $y=0,1$ の両方で0なので、アフィン解は4点、無限遠点を加えて

$$
\#E_{11}(\mathbb F_2)=5,\qquad a_2(E_{11})=2+1-5=-2.
$$

$p=3$ では $x=0,1,2$ に対する右辺は順に $1,0,0$ です。左辺 $y^2+y$ は $y=0,1,2$ に対して $0,2,0$ であるため、右辺が0の各 $x$ に2解ずつ存在し、

$$
\#E_{11}(\mathbb F_3)=1+0+2+2=5,\qquad
a_3(E_{11})=3+1-5=-1.
$$

[MF7の積表示で証明した展開](../MF7/index.md#prop-mf7-level-eleven)は $a_2(f_{11})=-2,\ a_3(f_{11})=-1$ を与えます。今は**二つの素数での計算の一致**を確認しただけです。有限個の係数を合わせても、一般の楕円曲線に対応するnewformの存在を証明したことにはなりません。

## 2. 比較すべきものは素数ごとの局所Euler因子

良い素数だけなら点数差を比べればよさそうです。しかし $p\mid N_E$ では楕円曲線の還元は特異で、二次因子をそのまま使えません。またnewformについても、レベルを割る素数では[MF7の $U_p$ と局所因子](../MF7/index.md#prop-mf7-local-factor)によって一次因子または自明因子へ変わります。

以下、$E/\mathbb Q$ の導手を[EC9で定義したもの](../../EC/EC9/index.md#def-ec9-conductor)として $N_E$ と書きます。$f=\sum_{n\ge1}a_n(f)q^n$ は[MF7の正規化newform](../MF7/index.md#thm-mf7-newform)のうち、重さ2・自明指標のものとします。二種類の対象を一つの記号で混ぜないよう、係数には $(E)$ または $(f)$ を付けます。

素数別の比較は[EC11の定義](../../EC/EC11/index.md#def-ec11-local-match)ですでに導入済みです。[MF7のnewformの局所因子](../MF7/index.md#prop-mf7-local-factor)を重さ2に特殊化すると、

$$
P_p(f,T)=
\begin{cases}
1-a_p(f)T+pT^2,&p\nmid N_E,\\
1-a_p(f)T,&p\mid N_E.
\end{cases}
$$

後者では[MF7の悪い素数の固有値定理](../MF7/index.md#thm-mf7-bad-eigenvalues)により、$v_p(N_E)=1$ なら $a_p(f)=\pm1$、$v_p(N_E)\ge2$ なら $a_p(f)=0$ です。曲線側では[EC10のよい素数](../../EC/EC10/index.md#def-ec10-good-local-polynomial)と[悪い素数](../../EC/EC10/index.md#def-ec10-bad-local-polynomial)の局所多項式を用います。[EC11の素数別照合命題](../../EC/EC11/index.md#prop-ec11-primewise-dictionary)が、三つの還元型ごとに比較すべき係数を確定しています。

**直接計算。** 導手11の曲線 $E_{11}$ とnewform $f_{11}$ について、よい素数2、3での点数とFourier係数は独立に求めたので

$$
\begin{aligned}
P_2(E_{11},T)&=1+2T+2T^2=P_2(f_{11},T),\\
P_3(E_{11},T)&=1+T+3T^2=P_3(f_{11},T).
\end{aligned}
$$

悪い素数11では $E_{11}$ の還元の特異点は $(x,y)=(5,5)$ です。$x=5+u,\ y=5+v$ を代入して11を法とした二次部分は

$$
v^2-3u^2=(v-5u)(v+5u)\pmod {11}.
$$

$5^2\equiv3\pmod{11}$ なので二接線は $\mathbb F_{11}$ 上で分かれ、[EC9の還元型](../../EC/EC9/index.md#def-ec9-reduction-types)により分裂乗法的還元です。$v_{11}(\Delta_E)=5<12$ なので[EC9の最小性判定](../../EC/EC9/index.md#prop-ec9-minimal-criterion)でモデルの最小性を確認できます。11以外ではよい還元なので、[EC9の局所導手指数](../../EC/EC9/index.md#thm-ec9-local-conductor-types)から $N_E=11$ となります。

曲線側は $P_{11}(E_{11},T)=1-T$ です。[MF7の係数 $a_{11}(f_{11})=1$](../MF7/index.md#prop-mf7-level-eleven)により形式側も $P_{11}(f_{11},T)=1-T$。悪い素数で二次項を付けないことが重要です。

全素数で局所因子が一致したら、Euler積とDirichlet係数も一致することは[EC11の定理](../../EC/EC11/index.md#thm-ec11-euler-factor-identity)で示されました。そこでは有限素数集合の積から出発し、[EC10の絶対収束](../../EC/EC10/index.md#thm-ec10-absolute-convergence)を使って極限を取り、素数冪係数の一致を素因数分解で全正整数へ拡張します。ここで新たに問題となるのは、**任意の楕円曲線に対応するnewformが存在する理由**です。

反対向きには、十分右の半平面で二つのDirichlet級数が一致すれば、その係数は一意です。ただし「**良い素数でだけ**一致」から、悪い素数の因子まで一致することをこの命題だけで導いてはいけません。そこには、導手・局所表現を照合する別の算術的入力が必要です。

## 3. Modularity Theoremの正確な主張

上の例はレベル11の一曲線です。任意の $E/\mathbb Q$ について「対応するnewformが存在する」と一般化するには、これまでの初等計算では届きません。この存在と全素数での照合を保証するのが外部大定理です。

<a id="thm-mf8-modularity"></a>
<!-- formal-statement-start -->
> **定理（Modularity Theorem：外部大定理）**  
> 任意の楕円曲線 $E/\mathbb Q$ について、その導手 $N_E$ をレベルとする重さ2・自明指標・有理Fourier係数の[正規化newform](../MF7/index.md#thm-mf7-newform) $f_E$ が存在する。これは $a_1(f_E)=1$ の規約を持ち、展開を

$$
f_E(\tau)=\sum_{n\ge1}a_n(f_E)q^n
$$

> と書くと、すべての素数 $p$ において $P_p(E,T)=P_p(f_E,T)$ となる。従って共通の絶対収束領域で

$$
L(E,s)=L(f_E,s).
$$

> 特に $p\nmid N_E$ では

$$
a_p(f_E)=p+1-\#\widetilde E(\mathbb F_p).
$$

> $p\mid N_E$ では良い素数の二次因子ではなく、還元型に応じた一次因子または自明因子が一致する。
<!-- formal-statement-end -->

**証明の所在。** これは本講義の既習定理からは導かれません。半安定楕円曲線のmodularityを示したWilesとTaylor–Wilesの仕事から始まり、全ての $E/\mathbb Q$ への拡張はBreuil–Conrad–Diamond–Taylorらによって達成されました。Galois表現、変形環とHecke環の比較、modularity liftingなどが核心で、この章では証明しません。

この定理の各条件は独立に重要です。重さは2、指標は自明、レベルは曲線の**導手** $N_E$ であり、単に判別式の絶対値ではありません。[MF7の係数体の定義](../MF7/index.md#def-mf7-coefficient-field)の意味で係数体が $\mathbb Q$ です。全ての重さ2newformに逆向きの楕円曲線対応を無条件に主張しているわけでもありません。

Modularity Theorem と[MF6のMellin積分・関数等式](../MF6/index.md#thm-mf6-functional-equation)を合わせれば、[EC10で外部帰結として述べた解析接続と関数等式](../../EC/EC10/index.md#thm-ec10-modularity-consequences)を得ます。この順序を逆にして、EC10の解析接続からModularity Theoremの存在を証明したとみなすのは循環です。

## 4. モジュラー曲線から楕円曲線への射

解析的な係数一致には幾何学的な顔もあります。[MF4の複素モジュラー曲線](../MF4/index.md#def-mf4-modular-curve)は最初、$\Gamma_0(N)\backslash\mathbb H$ にカスプを加えたコンパクトRiemann面として構成しました。しかし「$\mathbb Q$ 上の射」を語るには、それだけでなく $X_0(N)$ の**$\mathbb Q$ 上の代数曲線としてのモデル**が必要です。このモデルの存在と幾何学的構成は以下では外部入力とします。

$\mathbb Q$ 上で定義された有理写像では、単に複素点の間に正則写像があるというだけでなく、座標表示を $\mathbb Q$ 上に取れることを要求します。射は全点で定義される写像です。モジュラー曲線から曲線への非定数射を、次のように定めます。

<a id="def-mf8-modular-parametrization"></a>
<!-- formal-statement-start -->
> **定義（modular parametrization）**  
> 導手 $N_E$ の楕円曲線 $E/\mathbb Q$ と、$\mathbb Q$ 上の代数曲線としての $X_0(N_E)$ に対し、$\mathbb Q$ 上で定義された非定数射

$$
\varphi:X_0(N_E)\longrightarrow E
$$

> を $E$ のmodular parametrizationという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mf8-modular-parametrization -->
**定義の確認**。 $E_{11}$ は導手11です。[MF4の種数公式](../MF4/index.md#thm-mf4-genus)から $X_0(11)$ は種数1であり、$E_{11}$ に対する $\mathbb Q$ 上のmodular parametrizationが存在することは以下の外部定理の具体例となります。ただし「両者が種数1だから、任意の複素同型が$\mathbb Q$ 上の射である」という議論は成立しません。存在は $\mathbb Q$ 上の代数モデルとmodularityを使う定理から保証します。
<!-- definition-example-end -->

<a id="thm-mf8-parametrization"></a>
<!-- formal-statement-start -->
> **定理（modular parametrizationの存在：外部大定理）**  
> 任意の楕円曲線 $E/\mathbb Q$（導手 $N_E$）について、$X_0(N_E)$ の $\mathbb Q$ 上の代数モデルから $E$ への非定数 $\mathbb Q$-射が存在する。尖点 $\infty$ を原点 $O_E$ に送るように選べる。
<!-- formal-statement-end -->

概略の依存関係は、$X_0(N)$ の有理カスプを基点として曲線をJacobian $J_0(N)$ に写すこと、重さ2newformがJacobianの適切な商に対応すること、さらに $E$ が該当する $\mathbb Q$-同種類の楕円曲線として得られることです。この三段階の存在定理はここでは**引用**します。Jacobian、Abelian variety、Galois表現を未導入のまま定義済みの道具として証明へ使用しません。

[MF4の重さ2の正則微分](../MF4/index.md#thm-mf4-weight-two-differentials)は複素解析側にあり、$\varphi$ の下で楕円曲線の非零正則微分を引き戻すと、対応する重さ2形式の $2\pi i f_E(\tau)\,d\tau$ の非零定数倍になります。ただしこの具体的な対応付けも上記の深い幾何学的入力に依存します。

## 5. Fermatの反例を仮定すると何が構成できるか

Fermatの最終定理は、整数 $n>2$ に対し非零整数 $x,y,z$ が $x^n+y^n=z^n$ を満たさない、という主張です。一般の $n$ について直接楕円曲線を構成するより、指数を素数へ落とすことから始めます。

$n$ が奇素数 $\ell$ を割り切れば $a=x^{n/\ell},b=y^{n/\ell},c=z^{n/\ell}$ として指数 $\ell$ の解を作れます。$n$ が2の冪なら $n\ge4$ で4が $n$ を割るので指数4の解に帰着します。指数3と4は古典的な別証明で除外されており、以下で深いmodularityを使うのは**奇素数 $\ell\ge5$** の場合です。

原始解を仮定するなら $\gcd(a,b,c)=1$ にでき、この等式から三数は実際に互いに素です。三数のうち丁度一つが偶数になるので、必要なら移項と符号の入れ替えによって

$$
a^\ell+b^\ell=c^\ell,\qquad
a\text{ は偶数},\quad b,c\text{ は奇数}
$$

とできます。$a,b,c$ は非零で、$\gcd(a,b)=1$ です。

ここで用いるのは三つの有理な根を持つ三次式です。$A=a^\ell,\ B=b^\ell$ と書き、その根を $0,A,-B$ として選べば、差に $A+B=c^\ell$ が現れます。

<a id="def-mf8-frey-curve"></a>
<!-- formal-statement-start -->
> **定義（Frey曲線）**  
> 奇素数 $\ell\ge5$ と、互いに素な非零整数 $a,b,c$ で $a^\ell+b^\ell=c^\ell$、$a$ 偶数、$b,c$ 奇数を満たすものを仮定する。これに対し

$$
E_{a,b,\ell}:\quad y^2=x(x-a^\ell)(x+b^\ell)
$$

> で与えられる $\mathbb Q$ 上の曲線を、この仮想的Fermat解から得るFrey曲線とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mf8-frey-curve -->
**定義の確認**。 $A=a^\ell$ と $B=b^\ell$ を置いた方程式の右辺は

$$
x^3+(B-A)x^2-ABx
$$

です。根は $0,A,-B$ で、その差は $A,B,A+B=c^\ell$ です。仮定 $abc\ne0$ により三つとも非零であり、根は相異なります。従って[EC1の非特異性判定](../../EC/EC1/index.md#thm-ec1-discriminant-criterion)を満たす楕円曲線です。「仮想の解を一つ固定すれば、この曲線を作れる」という条件付き構成であり、解の存在を主張していません。
<!-- definition-example-end -->

<a id="prop-mf8-frey-invariants"></a>
<!-- formal-statement-start -->
> **命題（Frey曲線の判別式と奇素数での還元）**  
> 上記の仮想的原始解に対応するFrey曲線の判別式と $c_4$ は

$$
\Delta=16(abc)^{2\ell},\qquad
c_4=16(A^2+AB+B^2)
$$

> である。また奇素数 $r\mid abc$ に対し $v_r(c_4)=0$ であり、$r$ での還元は乗法的である。従ってその導手の $r$-指数は1であり、$v_r(\Delta)=2\ell v_r(abc)$ は $\ell$ の倍数である。
<!-- formal-statement-end -->

### 証明の見取り図

三つの根の差を判別式に代入し、$c_4$ をWeierstrass不変量から計算します。$r\mid a,b,c$ の各場合を分けると、$c_4$ が消えないことを直接確かめられます。

<!-- proof-start -->
### 証明

$y^2=(x-e_1)(x-e_2)(x-e_3)$ の三次多項式の判別式は $\prod_{i<j}(e_i-e_j)^2$ で、Weierstrass曲線の判別式はその16倍である。[EC1の判別式](../../EC/EC1/index.md#def-ec1-invariants)を $e_1=0,e_2=A,e_3=-B$ に適用して

$$
\Delta=16 A^2 B^2(A+B)^2
=16a^{2\ell}b^{2\ell}c^{2\ell}
$$

となる。展開形 $y^2=x^3+(B-A)x^2-ABx$ では $a_1=a_3=a_6=0$, $a_2=B-A$, $a_4=-AB$ なので

$$
\begin{aligned}
b_2&=4(B-A),&b_4&=-2AB,\\
c_4&=b_2^2-24b_4
=16(B-A)^2+48AB\\
&=16(A^2+AB+B^2).
\end{aligned}
$$

$r$ を奇素数で $r\mid abc$ とする。互いに素な $a,b,c$ のうち、$r$ が割るのは高々一つである。$r\mid a$ なら $A\equiv0$、$B\not\equiv0\pmod r$ なので $c_4\equiv16B^2\not\equiv0$。$r\mid b$ なら同様に $c_4\equiv16A^2\ne0$。$r\mid c$ なら $A+B\equiv0$、かつ $A,B\not\equiv0$ だから

$$
A^2+AB+B^2\equiv A^2-A^2+A^2=A^2\not\equiv0\pmod r.
$$

いずれも $v_r(c_4)=0$ である。この整数モデルは $r$-最小である。なぜなら、[EC1の座標変換と不変量](../../EC/EC1/index.md#prop-ec1-admissible-change)で最小化できると仮定すると $c_4$ の付値を4以上下げる必要が生じ、もとの付値0と矛盾するからである。$\Delta$ は $r\mid abc$ により $r$ で割れる一方 $c_4$ は割れないので、[EC9の乗法的還元判定](../../EC/EC9/index.md#def-ec9-reduction-types)が適用できる。従って[EC9の導手指数](../../EC/EC9/index.md#thm-ec9-local-conductor-types)は1である。また $r$ は奇数なので16には寄与せず

$$
v_r(\Delta)=2\ell\,v_r(abc).
$$

これで奇素数の場合は示された。**素数2についてはこの議論をそのまま用いず**、以下の引用定理の局所解析へ委ねる。
<!-- proof-end -->

この命題だけではFermatの反例が排除されたわけではありません。Frey曲線の「多くの素数で判別式の付値が $\ell$ の倍数」という性質を、**mod $\ell$ のGalois表現**（楕円曲線の$\ell$-等分点へ作用する絶対Galois群の線形表現）から生じる低レベルの形式へ移すには、深い別の結果が要ります。表現の構成とlevel loweringの証明は本章では行いません。

## 6. Ribetの結果とレベル2での矛盾

一般にモジュラー形式の「レベルを下げる」ことは、任意のnewformを好きな低レベルへ移すことではありません。特定の素数 $\ell$ で係数を還元したGalois表現が、素数ごとの分岐条件を満たす場合に限って、同じ残余表現を持つ別レベルのnewformが存在する、という精密な議論です。Frey曲線の場合に必要な帰結を一つの引用定理として掲げます。

<a id="thm-mf8-ribet-frey"></a>
<!-- formal-statement-start -->
> **定理（Frey–Ribetの帰結：外部大定理）**  
> 奇素数 $\ell\ge5$ に対して、原始非零整数解 $a^\ell+b^\ell=c^\ell$ が存在すると仮定し、上記のFrey曲線 $E_{a,b,\ell}$ を作る。この曲線がModularity Theoremによりモジュラーであるなら、Frey曲線の残余Galois表現に対するRibetのlevel lowering（その適用に必要な既約性・局所条件の検証を含む）から、レベル2・重さ2・自明指標の非零newformが存在する。
<!-- formal-statement-end -->

この外部定理には、残余表現の既約性、素数2の最小モデル・導手、$\ell$ における局所条件、level loweringを適用するための算術的検証が**すべて含まれます**。これらを判別式の計算だけで証明したとは主張しません。[前節の判別式と $c_4$ の命題](#prop-mf8-frey-invariants)は深い定理の適用条件を理解する重要な入口ですが、その全条件を証明したことにはなりません。

帰結の矛盾相手を、これまでのモジュラー曲線の理論から自分の手で計算します。

<a id="prop-mf8-level-two-zero"></a>
<!-- formal-statement-start -->
> **命題（レベル2の重さ2カスプ形式は存在しない）**  
> 自明指標のカスプ形式空間は

$$
S_2(\Gamma_0(2))=\{0\}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

レベル2の指数・カスプ数・楕円固定点数を用いて種数を0と計算し、重さ2カスプ形式と正則微分を対応させます。

<!-- proof-start -->
### 証明

[MF4の部分群指数公式](../MF4/index.md#thm-mf4-subgroup-index)から

$$
\mu=[SL_2(\mathbb Z):\Gamma_0(2)]
=2\left(1+\frac12\right)=3.
$$

[MF4の素数レベルのカスプ](../MF4/index.md#prop-mf4-prime-cusps)よりカスプは $\infty,0$ の2個である。レベル2の楕円固定点については位数2の軌道が1個、位数3の軌道が0個である（[MF4の種数公式と固定点計算](../MF4/index.md#thm-mf4-genus)のレベル2への代入）。従って

$$
\begin{aligned}
g(X_0(2))
&=1+\frac{\mu}{12}-\frac{e_2}{4}-\frac{e_3}{3}-\frac{c}{2}\\
&=1+\frac3{12}-\frac14-\frac0{3}-\frac22\\
&=0.
\end{aligned}
$$

[MF4の重さ2カスプ形式と正則微分の同型](../MF4/index.md#thm-mf4-weight-two-differentials)により $\dim_{\mathbb C}S_2(\Gamma_0(2))=g(X_0(2))=0$。よって空間は零である。
<!-- proof-end -->

<a id="cor-mf8-flt-bridge"></a>
<!-- formal-statement-start -->
> **系（Fermatの最終定理への論理的帰結）**  
> Modularity Theorem、上記Frey–Ribetの帰結、指数3と4の場合の古典的なFermat定理を外部定理として認めると、任意の整数 $n>2$ に対し、非零整数 $x,y,z$ で $x^n+y^n=z^n$ を満たすものは存在しない。
<!-- formal-statement-end -->

### 証明の見取り図

一般の指数を3、4、または5以上の奇素数へ帰着し、最後の場合だけFrey曲線を作ります。modularityは**存在を与える向き**、Ribetの帰結は**レベルを下げる向き**に使います。

<!-- proof-start -->
### 証明

反例 $(x,y,z,n)$ を仮定する。$n$ が3または4で割り切れれば、前述の冪への置換でそれぞれ指数3または4の反例を得るが、これは引用した古典的結果に反する。そうでなければ $n>2$ は奇素数 $\ell\ge5$ を因数に持つ。指数 $\ell$ に落とし、共通因子を除いて原始解を得る。必要に応じて移項・符号を変え、一つの底を偶数 $a$ とする。

[定義したFrey曲線](#def-mf8-frey-curve)は$\mathbb Q$ 上の楕円曲線である。従って[Modularity Theorem](#thm-mf8-modularity)によりモジュラーである。仮想的な原始Fermat解、$\ell\ge5$、modularityという[引用定理の仮定](#thm-mf8-ribet-frey)が揃うので、非零のレベル2・重さ2newformが存在する。しかし[レベル2の消失命題](#prop-mf8-level-two-zero)によりそのようなnewformは存在できない。矛盾。ゆえに反例はない。
<!-- proof-end -->

**論理を逆にしない。** 矛盾の原因は「Modularity Theoremが誤り」ではなく、「Fermatの反例が存在する」という最初の仮定です。二つの外部大定理の証明責務は残っていますが、それらを仮定した論理的導出は完結しています。

## 7. 演習と詳細解答

### A1. 良い素数2の点数を検算する
- Level: A
- 問題：$E_{11}:y^2+y=x^3-x^2-10x-20$ を $\mathbb F_2$ に還元する。全てのアフィン解を列挙し、無限遠点を含む点数と $a_2(E_{11})$ を求めよ。また2で良い還元である理由を述べよ。

<!-- solution-start -->
**詳細解答。** $\Delta_E=-11^5$ は2で割れないので[良い還元](../../EC/EC9/index.md#def-ec9-good-reduction)である。右辺は $x^3-x^2$ となり、$x=0,1$ の両方で0である。左辺は $y=0$ でも $y=1$ でも0なので、アフィン解は $(0,0),(0,1),(1,0),(1,1)$ の4点。[EC7の点数の定義](../../EC/EC7/index.md#def-ec7-rational-points)により無限遠点1点を加えて5点となる。[EC10の良い素数の係数](../../EC/EC10/index.md#def-ec10-good-local-polynomial)から $a_2=2+1-5=-2$。従って $P_2(E_{11},T)=1+2T+2T^2$ である。
<!-- solution-end -->

### A2. 良い素数3の点数を検算する
- Level: A
- 問題：同じ $E_{11}$ について $p=3$ のアフィン解の個数を $x=0,1,2$ ごとに求め、$a_3(E_{11})$ と局所Euler多項式を求めよ。

<!-- solution-start -->
**詳細解答。** $\Delta_E=-11^5$ は3で割れない。右辺 $x^3-x^2-10x-20$ の値は $x=0,1,2$ でそれぞれ $1,0,0$ となる。$y^2+y$ は $y=0,1,2$ で $0,2,0$ なので、右辺1には解0個、右辺0には解2個ずつ。無限遠点を含め $\#E_{11}(\mathbb F_3)=1+0+2+2=5$。ゆえに $a_3=3+1-5=-1$、$P_3(E_{11},T)=1+T+3T^2$。$f_{11}$ の $q^3$ の係数 $-1$ と一致する。
<!-- solution-end -->

### A3. 良い素数と悪い素数の因子
- Level: A
- 問題：$N_E=11$ の曲線とレベル11の重さ2newformが局所因子で一致すると仮定する。$a_5=1$、$a_{11}=1$ のとき $p=5,11$ の局所Euler多項式と局所因子 $L_p(s)$ をそれぞれ書け。11で二次項を入れない理由を述べよ。

<!-- solution-start -->
**詳細解答。** $5\nmid11$ なので良い素数の式から $P_5(T)=1-a_5T+5T^2=1-T+5T^2$。従って $L_5(s)=(1-5^{-s}+5^{1-2s})^{-1}$。一方 $11\mid11$ では[MF7の悪い素数の式](../MF7/index.md#prop-mf7-local-factor)により $P_{11}(T)=1-a_{11}T=1-T$、$L_{11}(s)=(1-11^{-s})^{-1}$。$p\mid N$ では $U_p$ の漸化式は一次であり、良い素数の $pT^2$ を引き継がない。ここで良い素数の式を使うと別の局所因子になってしまう。
<!-- solution-end -->

### A4. Frey曲線の判別式
- Level: A
- 問題：$A,B,A+B$ が零でない有理数のとき、$E:y^2=x(x-A)(x+B)$ の判別式を根の差から導け。さらに $A=a^\ell,B=b^\ell,A+B=c^\ell$ と置いたときの結果を書け。

<!-- solution-start -->
**詳細解答。** 三次式の根は $e_1=0,e_2=A,e_3=-B$ である。根の差の二乗積は

$$
(e_1-e_2)^2(e_1-e_3)^2(e_2-e_3)^2
=A^2B^2(A+B)^2.
$$

[EC1のWeierstrass判別式](../../EC/EC1/index.md#def-ec1-invariants)はこの16倍なので $\Delta=16A^2B^2(A+B)^2$。代入すると $\Delta=16a^{2\ell}b^{2\ell}c^{2\ell}=16(abc)^{2\ell}$。三つの差が非零なので $\Delta\ne0$、従って曲線は非特異である。
<!-- solution-end -->

### B1. 新しい素数7で係数を照合する
- Level: B
- 問題：$E_{11}$ を $\mathbb F_7$ に還元し、各 $x=0,\dots,6$ で $x^3-x^2-10x-20$ の値と方程式 $y^2+y=t$ の解の数を調べよ。点数から $a_7$ を求め、MF7の $f_{11}$ の $q^7$ の係数と比べよ。

<!-- solution-start -->
**詳細解答。** $\Delta_E=-11^5$ は7で割れないので良い還元である。右辺 $x^3-x^2-10x-20$ を各 $x$ で7を法として計算する。左辺 $y^2+y$ の値は $y=0,1,2,3,4,5,6$ でそれぞれ $0,2,6,5,6,2,0$ なので、右辺の値が $0,2,5,6$ のときに解が存在する。

| $x$ | $x^3-x^2-10x-20\pmod7$ | $y$ の個数 |
| --- | ---: | ---: |
| 0 | 1 | 0 |
| 1 | 5 | 1 |
| 2 | 6 | 2 |
| 3 | 3 | 0 |
| 4 | 2 | 2 |
| 5 | 2 | 2 |
| 6 | 2 | 2 |

従ってアフィン解は $0+1+2+0+2+2+2=9$ 個で、無限遠点を加えて $\#E_{11}(\mathbb F_7)=10$ となる。[EC10の良い素数の式](../../EC/EC10/index.md#def-ec10-good-local-polynomial)により $a_7=7+1-10=-2$ で、[MF7の係数 $a_7(f_{11})=-2$](../MF7/index.md#prop-mf7-level-eleven) と一致する。
<!-- solution-end -->

### B2. 局所Euler因子の係数を二段階で出す
- Level: B
- 問題：レベル11の重さ2の正規化newform $f_{11}$ は $a_2=-2$ を持つ。良い素数2の生成関数 $(1-a_2T+2T^2)^{-1}$ の $T^2$ までの係数を、未知数 $c_1,c_2$ を置いて求めよ。$a_4$ を得て、[MF7の $q$ 展開](../MF7/index.md#prop-mf7-level-eleven)と比較せよ。

<!-- solution-start -->
**詳細解答。** $G(T)=1+c_1T+c_2T^2+O(T^3)$ と置く。良い素数の式は $(1+2T+2T^2)G(T)=1$ なので $T^1$ 係数は $c_1+2=0$、従って $c_1=-2$。$T^2$ 係数は $c_2+2c_1+2=0$ であり $c_2=-2(-2)-2=2$。よって $a_4=a_{2^2}=2$ となり、MF7の $q^4$ の係数と一致する。一次式 $(1+2T)^{-1}$ なら $T^2$ の係数は4になってしまう。良い素数で二次項を落とすのは誤りである。
<!-- solution-end -->

### B3. $c_4$ が消えないことと乗法的還元
- Level: B
- 問題：$\ell\ge5$ を奇素数とし、互いに素な非零整数 $a,b,c$ に $a^\ell+b^\ell=c^\ell$ を仮定する。$A=a^\ell,B=b^\ell$ とする。奇素数 $r\mid c$ のとき $c_4=16(A^2+AB+B^2)$ が $r$ で割れないことを示せ。また、その事実が「導手の $r$-指数は1」に結び付くときの既習の判定法を述べよ。

<!-- solution-start -->
**詳細解答。** $r\mid c$ なので $A+B=c^\ell\equiv0\pmod r$、つまり $B\equiv-A$。$\gcd(a,c)=1$ だから $r\nmid a$、従って $A\not\equiv0$。よって $A^2+AB+B^2\equiv A^2-A^2+A^2=A^2\not\equiv0\pmod r$。$r$ は奇素数なので16も単元であり $v_r(c_4)=0$。一方 $r\mid c$ だから $v_r(\Delta)=2\ell v_r(abc)>0$。$c_4$ が単元の整数モデルは $r$-最小で、判別式は $r$ で消えるので[EC9の還元型判定](../../EC/EC9/index.md#def-ec9-reduction-types)によって乗法的還元である。[EC9の導手指数](../../EC/EC9/index.md#thm-ec9-local-conductor-types)では乗法的還元の指数は1である。ただしこの議論は $r=2$ にはそのまま適用できない。
<!-- solution-end -->

### B4. なぜレベル2に重さ2newformはないのか
- Level: B
- 問題：$\Gamma_0(2)$ の指数が3、カスプ数が2、位数2の楕円点軌道が1、位数3の軌道が0であるとする。[MF4の種数公式](../MF4/index.md#thm-mf4-genus)を使って $S_2(\Gamma_0(2))=\{0\}$ を示せ。この結果は $S_2(\Gamma_0(11))$ の次元1と矛盾するか。

<!-- solution-start -->
**詳細解答。** 種数公式に $\mu=3,c=2,e_2=1,e_3=0$ を入れると

$$
g=1+\frac3{12}-\frac14-\frac0{3}-\frac22=0.
$$

[重さ2カスプ形式と正則微分の同型](../MF4/index.md#thm-mf4-weight-two-differentials)から $\dim S_2(\Gamma_0(2))=g=0$。従って非零newformもない。レベル11では $g(X_0(11))=1$ なので非零形式があるが、レベル2と11は異なる空間でありそれ自体は矛盾しない。矛盾が生じるのは、Frey–Ribetの**追加仮定の下でレベル2のnewformが必要だ**と結論した場合だけである。
<!-- solution-end -->

### B5. 複素曲線と有理数体上の射を区別する
- Level: B
- 問題：[MF4の種数公式](../MF4/index.md#thm-mf4-genus)によって $g(X_0(11))=1$ と分かり、[MF7](../MF7/index.md#prop-mf7-level-eleven)にはレベル11の有理係数newformがある。(1) この二事実だけで、$X_0(11)$ から $E_{11}/\mathbb Q$ への非定数 $\mathbb Q$-射の存在が初等的に証明できたといえるか。(2) 存在を確定するために本章で引用した定理を挙げよ。(3) 非定数という条件が必要な理由を説明せよ。

<!-- solution-start -->
**詳細解答。** (1) いえない。種数の計算は複素Riemann面の位相・正則微分の情報を与え、newformは解析関数の存在を与える。しかし$\mathbb Q$ 上の代数モデルとその上の射が定義できることは、複素解析的構成から自動的に出ない。(2) [modular parametrizationの存在定理](#thm-mf8-parametrization)を適用する。$E_{11}$ は判別式 $-11^5$、11で分裂乗法的還元、他で良い還元なので導手11であり、引用定理の仮定 $E/\mathbb Q$ と $N_E=11$ を満たす。従って非定数 $\mathbb Q$-射 $X_0(11)\to E_{11}$ が存在する。(3) 定数写像ならどんな曲線からも任意の有理点への写像を作れてしまい、newformのFourier係数や楕円曲線の算術情報との関連を表さない。非定数性が本質である。
<!-- solution-end -->

### B6. 良い素数での一致だけでは足りない
- Level: B
- 問題：レベル11の二つの仮想的なEuler積が $p\ne11$ ですべて等しい局所因子を持ち、$p=11$ の因子だけ一方が $(1-11^{-s})^{-1}$、他方が $(1+11^{-s})^{-1}$ であるとする。(1) これらの積の比を求めよ。(2) 良い素数での係数一致から完全な$L$関数の一致を結論できるか。(3) Modularity Theoremが追加で保証する情報を述べよ。

<!-- solution-start -->
**詳細解答。** 共通の素数 $p\ne11$ の因子を $G_p(s)$ とすると、絶対収束する右半平面で

$$
L_+(s)=\left(\prod_{p\ne11}G_p(s)\right)(1-11^{-s})^{-1},
\qquad
L_-(s)=\left(\prod_{p\ne11}G_p(s)\right)(1+11^{-s})^{-1}.
$$

従って

$$
\frac{L_+(s)}{L_-(s)}
=\frac{1+11^{-s}}{1-11^{-s}}.
$$

これは恒等的に1ではなく、例えば局所冪級数では $11^{-s}$ の係数が $+1$ と $-1$ で異なる。ゆえに (2) 良い素数での一致だけでは完全なEuler積の一致を結論できない。(3) [Modularity Theorem](#thm-mf8-modularity)は対応するnewformが**導手と同じレベル**を持つことに加えて、悪い素数を含む全素数で適切な局所因子が一致することを保証する。良い素数の係数一致だけを定理全体と置き換えてはならない。
<!-- solution-end -->

### C1. Frey–RibetとmodularityからFLTを導く
- Level: C
- 問題：次の三つの外部入力を認める。(i) 全ての $E/\mathbb Q$ はモジュラーである。(ii) 奇素数 $\ell\ge5$ の原始Fermat解が与えるFrey曲線がモジュラーなら、非零のレベル2・重さ2newformがある。(iii) 指数3と4では非零整数解がない。任意の $n>2$ について $x^n+y^n=z^n$ に非零整数解がないことを論証し、(i)と(ii)の使う順序を示せ。

<!-- solution-start -->
**詳細解答。** 反例がある整数 $n>2$ を選ぶ。$3\mid n$ なら $m=n/3$ とし $(x^m)^3+(y^m)^3=(z^m)^3$ が生じ、(iii)に反する。$4\mid n$ なら同じ操作で指数4の反例となり(iii)に反する。これらが起きない場合、$n$ が2だけを素因数に持つことはできないので、奇素数 $\ell\ge5$ が $n$ を割る。指数 $\ell$ へ置換した後、共通因子を除いて原始解 $(a,b,c)$ に直す。三つのうち一つだけが偶数なので、移項と符号の変更で $a$ を偶数、$b,c$ を奇数に取れる。

[この章のFrey曲線](#def-mf8-frey-curve)の判別式は[判別式命題](#prop-mf8-frey-invariants)から $16(abc)^{2\ell}\ne0$ なので、これは $\mathbb Q$ 上の楕円曲線である。まず(i)を**この曲線に適用してモジュラー性を得る**。次に(ii)の「仮想的原始解」「奇素数 $\ell\ge5$」「モジュラー性」が揃ったので、非零の重さ2・レベル2newformが存在すると結論する。しかし[レベル2の消失命題](#prop-mf8-level-two-zero)からその形式は零でなければならず矛盾する。従ってすべての指数で反例はない。

(ii)はlevel loweringの深い帰結であり、[判別式の計算](#prop-mf8-frey-invariants)だけから自動的に導かれたわけではない。逆に「矛盾したからFrey曲線は非モジュラー」と結論して(i)の代わりに使うと、証明の論理を取り違える。
<!-- solution-end -->

## 8. 残る大定理の証明責務

この講義で自力再現したのは、有限体の点数と局所多項式の計算、局所因子の一致がEuler積を一致させる議論、Frey曲線の判別式・奇素数での乗法的還元、レベル2での重さ2空間の消失、および**外部大定理を仮定して**矛盾へ至る論理です。

一般の曲線とnewformの対応を証明するには、$\mathbb Q$ 上のモジュラー曲線とJacobianの算術、残余Galois表現、modularity liftingが要ります。Frey曲線からレベル2へ降ろすにはRibetのlevel loweringとその局所条件が要ります。これらは主張と役割を明示した引用結果であって、ここで証明済みにはしていません。

楕円曲線側の独立した点数・局所Euler因子は[EC10](../../EC/EC10/index.md#def-ec10-hasse-weil-l)、形式側のold/newと悪い素数のEuler因子は[MF7](../MF7/index.md#prop-mf7-local-factor)を繰り返し参照して比較できます。[EC11の定理](../../EC/EC11/index.md#thm-ec11-euler-factor-identity)を参照すれば、全局所因子の一致から大域的な一致へ至る証明と、本章の存在定理の役割を区別できます。
