# AG3-01 関手的視点とSpec

[アフィン代数的集合と座標環の反変対応](../AG1-03/index.md#thm-ag1-03-morphism-hom)では、多項式方程式の零点を調べ、幾何学的な写像を環準同型へ翻訳しました。しかし、通常の点だけでは環が持つ情報をすべて読み取れません。例えば $k[\varepsilon]/(\varepsilon^2)$ の $k$ 値点では $\varepsilon$ は必ず0になります。$\varepsilon$ 自体は環の中で0ではないのに、零点集合だけを眺めると見えなくなるのです。

本章では二つの方向からこの限界を越えます。一つは**任意の $k$ 代数を値域とする点**を考え、零でない冪零元も試すこと。もう一つは**素イデアルを点として採用**し、通常の閉点だけでなく既約な曲線全体に対応する点も用意することです。後者が $\operatorname{Spec}A$ の出発点になります。

本章の環と準同型はすべて可換・単位元付きとし、準同型は $1$ を $1$ に写します。$k$ は体です。$\operatorname{Spec}A$ の位相と構造層は次章で構成するため、本章ではまず**集合としての点、環から誘導される写像、関手的な意味**を厳密に扱います。

## 1. 方程式の「解の値域」を変えてみる

以前は $k$ を固定し、$k[x,y]/(xy)$ の点を $(a,b)\in k^2$ で $ab=0$ を満たすものと考えました。ところが $k$ をもっと大きな体 $K$、さらには別の $k$ 代数 $B$ に取り替えると、方程式 $xy=0$ は $B$ 内の元についても意味を持ちます。

<a id="def-ag3-01-b-points"></a>

<!-- formal-statement-start -->
> **定義（代数の $B$ 値点）**  
> 体 $k$ 上の可換 $k$ 代数 $A$ と可換 $k$ 代数 $B$ に対し、$A$ の $B$ 値点の集合を

$$
h_A(B)=\operatorname{Hom}_{k\text{-}\mathrm{Alg}}(A,B)
$$

> とする。$k$ 代数準同型 $\varphi:B\to C$ に対して $h_A(\varphi)(u)=\varphi\circ u$ と置く。
<!-- formal-statement-end -->

単に点が増えるのではなく、値域を変更する準同型に合わせて点を移す操作まで用意しています。$h_A$ は $k$ 代数の圏から集合の圏への**共変関手**です。ここで関手という語は「対象に集合を、準同型に集合の写像を対応させ、恒等と合成を保存する規則」を意味します。

<!-- definition-example-start: def-ag3-01-b-points -->
### 例：多項式の値を代入する

**定義の確認。** $A=k[t]$ とすると、任意の $u:k[t]\to B$ は $u(t)=b$ で決まります。実際、$u(\sum a_it^i)=\sum a_ib^i$ であり、逆に各 $b\in B$ はこの代入準同型を与えます。したがって $h_{k[t]}(B)\simeq B$ です。$\varphi:B\to C$ を作用させると、$t$ の像は $\varphi(b)$ に移ります。恒等準同型では $b$ は不変、$B\to C\to D$ の合成では $b\mapsto\varphi(b)\mapsto\psi(\varphi(b))$ となり、関手の二条件を実際に満たします。

$A=k[x,y]/(xy)$ の場合は、準同型が $x,y$ の像 $b,c$ で決まり、商環の関係が $bc=0$ を課します。

$$
h_A(B)\simeq\{(b,c)\in B^2\mid bc=0\}.
$$

$B$ が整域なら少なくとも一方が0ですが、零因子を持つ環では $b,c$ が両方非零でも積が0になる場合があります。
<!-- definition-example-end -->

この見方は既習の[座標環と正則写像](../AG1-03/index.md#thm-ag1-03-morphism-hom)を拡張します。元の幾何学的な写像の構成に戻ると、$k$ 代数準同型 $\alpha:A\to A'$ は、値域が $B$ の点 $u:A'\to B$ を $u\circ\alpha:A\to B$ に変えます。したがって「環の矢印の向きが反転する」という現象は、一つの値域 $k$ に限定されません。

## 2. $k$ 値点だけでは区別できない環

具体的に $D=k[\varepsilon]/(\varepsilon^2)$ を考えます。$\varepsilon$ と書くのはその剰余類であり、$\varepsilon^2=0$ でも $\varepsilon\ne0$ です。

$k$ 代数準同型 $u:D\to k$ では、$u(\varepsilon)^2=u(\varepsilon^2)=0$。体 $k$ に非零の冪零元はないので $u(\varepsilon)=0$ です。従って $h_D(k)$ は一点です。$h_k(k)$ も一点です。普通の $k$ 値点からは $D$ と $k$ が同じように見えます。

一方、値域を $B=D$ とすれば、$u_0(\varepsilon)=0$ と $u_1(\varepsilon)=\varepsilon$ は異なる $k$ 代数準同型です。$u_1$ が存在することは、環の中の冪零元がただの記号ではなく、値域を変えると検出される情報であることを示します。より一般に $h_D(B)$ は $B$ の平方零元全体と対応します。

この例を覚えておくと、後にスキームが「点集合」だけでなく「構造層」も必要とする理由が分かります。**$\operatorname{Spec}$ の点集合だけでも $k$ と $D$ の冪零情報は区別できません。** 関手的な点と局所的な関数環の両方が重要です。

## 3. 素イデアルも点として扱う

素イデアルは、商環が整域になるという条件で[既約性との関係](../AG1-02/index.md#thm-ag1-02-irreducible-prime)を持ちます。既約集合を「一つのまとまり」と見るなら、その情報を担う素イデアル自体を点と呼ぶ道があります。

<a id="def-ag3-01-spec"></a>

<!-- formal-statement-start -->
> **定義（素スペクトル）**  
> 可換単位的環 $A$ の**素スペクトル**を、$A$ のすべての真の素イデアルを元とする集合

$$
\operatorname{Spec}A
=\{\mathfrak p\subsetneq A\mid\mathfrak p\text{ は素イデアル}\}
$$

> とする。各 $\mathfrak p$ を $\operatorname{Spec}A$ の点と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag3-01-spec -->
### 例：一次式の零点と一般点

**定義の確認。** $k[t]$ は整域だから $(0)$ は素イデアルです。また $(t-a)$ は、商環 $k[t]/(t-a)\simeq k$ が体なので素イデアルです。ゆえに $(0)$ と各 $(t-a)$ はいずれも $\operatorname{Spec}k[t]$ の点です。$k$ が代数閉体なら[弱Hilbertの零点定理](../AG1-07/index.md#thm-ag1-07-weak-nullstellensatz)により極大イデアルはすべて $(t-a)$ の形ですが、$(0)$ は極大でありません。従来の $a\in k$ のほかに、直線全体に対応する点が現れます。

$D=k[\varepsilon]/(\varepsilon^2)$ では、素イデアル $\mathfrak p$ に $\varepsilon^2=0$ が属するため、素性から $\varepsilon\in\mathfrak p$ です。$(\varepsilon)$ は商が $k$ なので素イデアルであり、ほかの素イデアルはありません。$\operatorname{Spec}D$ と $\operatorname{Spec}k$ は集合としてともに一点です。
<!-- definition-example-end -->

$\operatorname{Spec}k[t]$ に $(0)$ が加わることは、$k$ 値点が無限に並ぶこととは異なります。この点は一つの具体的な値 $t=a$ でなく、非零多項式が恒等的には消えない直線全体を表します。後にZariski位相を入れると、$(0)$ の閉包が直線全体になるため、**一般点**という名前が自然になります。

## 4. 素イデアルの点にはどんな値があるか

通常の点 $a$ なら多項式は $f(a)\in k$ という値を持ちます。素イデアル $\mathfrak p$ の場合は、$A/\mathfrak p$ は整域ですが体とは限りません。そこで分数体を作り、値域として使います。これは既習の[局所化の普遍性](../AG1-04/index.md#thm-ag1-04-universal)を思い出す場面です。

<a id="def-ag3-01-residue-field"></a>

<!-- formal-statement-start -->
> **定義（素点の剰余体）**  
> 可換単位的環 $A$ と $\mathfrak p\in\operatorname{Spec}A$ に対し、剰余体を

$$
\kappa(\mathfrak p)
=\operatorname{Frac}(A/\mathfrak p)
$$

> とする。自然な写像 $A\to A/\mathfrak p\to\kappa(\mathfrak p)$ をその点での評価写像とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag3-01-residue-field -->
### 例：有限の点と一般点では剰余体が違う

**定義の確認。** $A=k[t]$ とし $\mathfrak p=(t-a)$ とすると、$A/\mathfrak p\simeq k$ は整域であり、その分数体も $k$ です。$t$ の評価値は $a$ です。一方 $\mathfrak p=(0)$ では商が $k[t]$ という整域になり、その分数体は $k(t)$ です。この点での $t$ の値は固定された数でなく、有理関数体の元 $t$ そのものです。
<!-- definition-example-end -->

<a id="prop-ag3-01-field-points"></a>

<!-- formal-statement-start -->
> **命題（体値点と素点）**  
> 可換単位的環 $A$ と体 $K$ に対し、単位元を保つ環準同型 $u:A\to K$ の核は素イデアル $\mathfrak p$ であり、$u$ は一意的に単射 $\kappa(\mathfrak p)\hookrightarrow K$ を経由する。逆に各 $\mathfrak p\in\operatorname{Spec}A$ には自然な環準同型 $A\to\kappa(\mathfrak p)$ がある。
<!-- formal-statement-end -->

### 証明の見取り図

体では積が0なら一方が0です。核で割って整域から体への単射にした後、分母となる非零元の像が逆元を持つことを使います。

<!-- proof-start -->
### 証明

$u(1)=1$ だから $\ker u$ は真のイデアルです。$ab\in\ker u$ なら

$$
u(a)u(b)=u(ab)=0
$$

です。$K$ は体なので $u(a)=0$ または $u(b)=0$、すなわち $a\in\ker u$ または $b\in\ker u$ です。従って $\mathfrak p=\ker u$ は素イデアルです。

$u$ は商写像 $q:A\to A/\mathfrak p$ を用いて $\bar u:A/\mathfrak p\to K$ と因数分解します。$\bar u(a+\mathfrak p)=u(a)$ は、$a-b\in\mathfrak p$ なら $u(a)=u(b)$ なので well-defined です。$\bar u(a+\mathfrak p)=0$ は $a\in\mathfrak p$ と同値であり、$\bar u$ は単射です。

整域 $A/\mathfrak p$ の非零元 $s$ に対し $\bar u(s)\ne0$ なので、$K$ では $\bar u(s)^{-1}$ が存在します。[局所化の普遍性](../AG1-04/index.md#thm-ag1-04-universal)を乗法的集合 $(A/\mathfrak p)\setminus\{0\}$ に適用すると、唯一の準同型

$$
\widetilde u:\kappa(\mathfrak p)\longrightarrow K,\qquad
\widetilde u(a/s)=\bar u(a)\bar u(s)^{-1}
$$

を得ます。体から非零環への単位的準同型の核は0です。実際、非零の $r$ が核にあれば $1=r^{-1}r$ も核に入って矛盾するので、$\widetilde u$ は単射です。

逆向きは商写像と分数体への自然な包含を合成すればよく、その核は $\mathfrak p$ です。
<!-- proof-end -->

これは「体値点と素イデアルが一対一」という主張ではありません。同じ $\mathfrak p$ を核とする $A\to K$ は複数ありえますし、値域の体も異なります。正確には各素点に**標準的な剰余体値点**が存在し、任意の体値点はその剰余体を通して表される、という主張です。

## 5. 環準同型で点はどちらに動くか

<a id="prop-ag3-01-contraction"></a>

<!-- formal-statement-start -->
> **命題（素スペクトルの反変写像）**  
> 可換単位的環の準同型 $\alpha:A\to B$ は集合の写像

$$
\operatorname{Spec}(\alpha):
\operatorname{Spec}B\longrightarrow\operatorname{Spec}A,\qquad
\mathfrak q\longmapsto\alpha^{-1}(\mathfrak q)
$$

> を定める。恒等準同型は恒等写像を、合成 $A\xrightarrow{\alpha}B\xrightarrow{\beta}C$ は $\operatorname{Spec}(\alpha)\circ\operatorname{Spec}(\beta)$ を与える。
<!-- formal-statement-end -->

### 証明の見取り図

点の逆像を取ると、商環の計算をしなくても素性を示せます。合成の順序は逆像集合の計算から分かります。

<!-- proof-start -->
### 証明

$\mathfrak q\subsetneq B$ が素イデアルなら、$1_B\notin\mathfrak q$ です。$\alpha(1_A)=1_B$ なので $1_A\notin\alpha^{-1}(\mathfrak q)$ で、逆像は真のイデアルです。$a_1a_2\in\alpha^{-1}(\mathfrak q)$ の場合、

$$
\alpha(a_1)\alpha(a_2)=\alpha(a_1a_2)\in\mathfrak q
$$

となります。$\mathfrak q$ の素性から少なくとも一方の $\alpha(a_i)$ が $\mathfrak q$ に入り、その $a_i$ が逆像に入るため素性が成立します。

恒等準同型については $\operatorname{id}^{-1}(\mathfrak q)=\mathfrak q$ です。$A\xrightarrow{\alpha}B\xrightarrow{\beta}C$ と $\mathfrak r\in\operatorname{Spec}C$ に対しては、

$$
(\beta\circ\alpha)^{-1}(\mathfrak r)
=\{a\in A\mid\beta(\alpha(a))\in\mathfrak r\}
=\alpha^{-1}(\beta^{-1}(\mathfrak r)).
$$

これが反変の合成則です。
<!-- proof-end -->

**手で追う例。** $k=\mathbb C$、$\alpha:k[t]\to k[s]$ を $t\mapsto s^2$ とします。$\mathfrak q=(s-a)$ の逆像は $(t-a^2)$ です。なぜなら $f(t)$ が逆像に属するのは $f(s^2)$ が $s=a$ で消えるとき、すなわち $f(a^2)=0$ のときであり、これは $t-a^2$ で割り切れることに同値だからです。また $(0)$ の逆像は $(0)$ です。実際、$f(s^2)=0$ という多項式等式は $f=0$ を意味します。点の写像は幾何学での $s\mapsto s^2$ に対応します。

## 6. 関手の情報は環をどこまで決めるか

<a id="thm-ag3-01-natural-transformation"></a>

<!-- formal-statement-start -->
> **定理（代数の値点関手の自然変換）**  
> 可換 $k$ 代数 $A,C$ に対し、すべての可換 $k$ 代数 $B$ で定まる $h_A(B)=\operatorname{Hom}_{k\text{-}\mathrm{Alg}}(A,B)$ と $h_C(B)$ の間の自然変換は、$k$ 代数準同型 $C\to A$ と一対一に対応する。この対応は $\alpha:C\to A$ に対し、各 $B$ で $u:A\to B$ を $u\circ\alpha:C\to B$ に送るものである。
<!-- formal-statement-end -->

自然変換とは、各 $B$ で写像 $\eta_B:h_A(B)\to h_C(B)$ を一つずつ選び、$B\to B'$ で値域を変えても結果が一致する規則です。一つの $B$ だけではなく、**すべての値域に対して一貫した選び方**という条件が肝心です。

### 証明の見取り図

すべての値域を調べる代わりに、$B=A$ で恒等準同型 $\operatorname{id}_A$ がどこへ送られるかを先に見ます。その一つの情報から、任意の $u:A\to B$ での値を自然性で復元します。

<!-- proof-start -->
### 証明

自然変換 $\eta:h_A\Rightarrow h_C$ が与えられたとします。$B=A$ において

$$
\alpha=\eta_A(\operatorname{id}_A)\in h_C(A)
=\operatorname{Hom}_{k\text{-}\mathrm{Alg}}(C,A)
$$

と置きます。任意の $k$ 代数 $B$ と準同型 $u:A\to B$ を固定し、値域変更を与える準同型として $u$ 自身を使います。自然性により次の正方形が可換です。

$$
\eta_B(h_A(u)(\operatorname{id}_A))
=h_C(u)(\eta_A(\operatorname{id}_A)).
$$

左辺では $h_A(u)(\operatorname{id}_A)=u\circ\operatorname{id}_A=u$、右辺では $h_C(u)(\alpha)=u\circ\alpha$ なので

$$
\eta_B(u)=u\circ\alpha.
$$

ゆえに $\eta$ は $\alpha$ だけで一意に決まります。

逆に $\alpha:C\to A$ が与えられたとき、$\eta_B(u)=u\circ\alpha$ と定めれば $C\to B$ の準同型なので写像は well-defined です。値域変更 $\varphi:B\to B'$ に対し

$$
\eta_{B'}(\varphi\circ u)
=(\varphi\circ u)\circ\alpha
=\varphi\circ(u\circ\alpha)
=h_C(\varphi)(\eta_B(u))
$$

が成り立ち、自然性を満たします。両構成を続けると、$\operatorname{id}_A$ における値も任意の $B$ での写像も元に戻るので一対一です。
<!-- proof-end -->

この結果は本章で使う範囲の**Yoneda的な原理**です。圏論の一般のYonedaの補題を既知として使わず、必要な形を直接証明しました。$A$ の冪零元も含めた環の情報は、すべての代数を値域とする値点関手から復元できることになります。次章以降では $\operatorname{Spec}A$ に位相と構造層を入れ、幾何学的な対象としてこの反変性を実現します。

## 7. 演習：普通の点から素点へ

### A1. 厚みを持つ一点の素点集合

$k$ を体、$D=k[\varepsilon]/(\varepsilon^2)$ とする。$\operatorname{Spec}D$ の全素イデアルを求めよ。

- Level: A
- ID: AG3-01-A1

<!-- solution-start -->
**詳細解答。** $\mathfrak p$ が素なら $\varepsilon^2=0\in\mathfrak p$ より $\varepsilon\in\mathfrak p$。したがって $(\varepsilon)\subseteq\mathfrak p$ です。商 $D/(\varepsilon)\simeq k$ は体で、$(\varepsilon)$ は極大かつ素です。これを真に含む真のイデアルは存在しないので、$\operatorname{Spec}D=\{(\varepsilon)\}$ です。$\varepsilon\ne0$ でも点は一つしかないことに注意します。
<!-- solution-end -->

### A2. 一変数多項式の $B$ 値点

$k$ を体、$B$ を可換 $k$ 代数とする。$h_{k[t]}(B)\simeq B$ を証明し、$k$ 代数準同型 $\varphi:B\to C$ による値域変更を求めよ。

- Level: A
- ID: AG3-01-A2

<!-- solution-start -->
**詳細解答。** $u:k[t]\to B$ の値は $u(t)=b$ を指定すると、単位と加法・乗法の保存から $u(\sum a_it^i)=\sum a_ib^i$ と一意に決まります。逆に任意の $b\in B$ についてこの代入式は $k$ 代数準同型を定めます。従って全単射 $u\mapsto u(t)$ を得ます。$\varphi\circ u$ の $t$ における値は $\varphi(u(t))=\varphi(b)$ なので、集合 $B\simeq h_{k[t]}(B)$ 上の値域変更は $\varphi$ 自身です。
<!-- solution-end -->

### A3. 二本の軸の代数値点

$A=k[x,y]/(xy)$ とし、任意の可換 $k$ 代数 $B$ に対して $h_A(B)$ を $B$ の元の組として記述せよ。$B=k[u,v]/(uv)$ なら両成分が非零の例を作れ。

- Level: A
- ID: AG3-01-A3

<!-- solution-start -->
**詳細解答。** 準同型は $x,y$ の像 $b,c\in B$ で決まり、$xy=0$ を保つ必要十分条件は $bc=0$ です。従って $h_A(B)=\{(b,c)\in B^2\mid bc=0\}$ です。$B=k[u,v]/(uv)$ では $(\bar u,\bar v)$ が該当します。$\bar u\ne0$ は $k[u,v]/(v)\simeq k[u]$ へ移すと確認でき、$\bar v\ne0$ も $k[u,v]/(u)\simeq k[v]$ から確認できます。一方 $\bar u\bar v=0$ です。整域値の解とは違い、両方非零が可能です。
<!-- solution-end -->

### A4. 二乗写像が素点に与える作用

$\alpha:k[t]\to k[s]$ を $t\mapsto s^2$ とする。$(s)$、$(s-2)$、$(0)$ の逆像を求めよ。

- Level: A
- ID: AG3-01-A4

<!-- solution-start -->
**詳細解答。** $\alpha^{-1}((s-a))$ は $f(s^2)$ が $s=a$ で0になる $f(t)$ 全体、すなわち $f(a^2)=0$ を満たす多項式全体です。因数定理で $(t-a^2)$ です。$a=0,2$ に対し順に $(t)$、$(t-4)$ となります。さらに $\alpha^{-1}((0))=\{f(t)\mid f(s^2)=0\}$ です。非零 $f$ の最高次数項 $c_nt^n$ は $cs^{2n}$ となって消えないので $f=0$ だけが属し、逆像は $(0)$ です。
<!-- solution-end -->

### B1. 剰余体で一般点を評価する

$k$ を体、$A=k[t]$ とする。$\mathfrak p=(0)$、$\mathfrak m=(t-3)$ の剰余体と、$t$ の評価値を求めよ。$k$ の標数は0とする。

- Level: B
- ID: AG3-01-B1

<!-- solution-start -->
**詳細解答。** $(0)$ は整域 $k[t]$ の素イデアルなので $\kappa((0))=\operatorname{Frac}(k[t])=k(t)$ です。写像 $k[t]\to k(t)$ は包含で、$t$ の像は不定元 $t$ のままです。$(t-3)$ では $k[t]/(t-3)\simeq k$ により $\kappa((t-3))=k$ で、$t$ の像は $3$ です。いずれも核は元の素イデアルで、前者は「座標を固定しない点」であることが分かります。
<!-- solution-end -->

### B2. 軸の埋め込みと素点の逆像

$k$ を体、$A=k[x,y]/(xy)$、$B=k[t]$ とする。$k$ 代数準同型 $\alpha:A\to B$ を $x\mapsto t,\ y\mapsto0$ で定める。$(0)$ と各 $(t-a)$ の逆像を求め、それぞれが素イデアルであることを示せ。

- Level: B
- ID: AG3-01-B2

<!-- solution-start -->
**詳細解答。** $xy$ の像は $t\cdot0=0$ なので、商環からの準同型 $\alpha$ は well-defined です。多項式表示 $f(x,y)$ に対して $\alpha(\bar f)=f(t,0)$ となります。$(0)$ の逆像は $f(t,0)=0$ となる元全体で、$f(x,0)=0$ と同値です。多項式を $y$ で割った余りは $f(x,0)$ なので、これは $(y)$ です。$A/(y)\simeq k[x]$ が整域なので素です。$(t-a)$ の逆像は $f(a,0)=0$ を満たす元全体、すなわち $(y,x-a)$ です。$A/(y,x-a)\simeq k$ は体なので素です。特に $a=0$ のときは二本の軸が交わる $(x,y)$ へ写ります。
<!-- solution-end -->

### B3. 代数閉でない基礎体

$A=\mathbb R[t]/(t^2+1)$ とする。$\operatorname{Spec}A$、$h_A(\mathbb R)$、$h_A(\mathbb C)$ をそれぞれ求め、三者が異なる情報を持つ理由を説明せよ。

- Level: B
- ID: AG3-01-B3

<!-- solution-start -->
**詳細解答。** $t^2+1$ は $\mathbb R$ 上既約なので $A$ は体で、$A\simeq\mathbb C$ です。体の真の素イデアルは $(0)$ だけで、$\operatorname{Spec}A=\{(0)\}$ となります。$\mathbb R$ への単位的 $\mathbb R$ 代数準同型があれば $t$ の像 $r\in\mathbb R$ は $r^2+1=0$ を満たす必要がありますが不可能なので $h_A(\mathbb R)=\varnothing$ です。$\mathbb C$ への $\mathbb R$ 代数準同型では $t$ の像は $i$ または $-i$ です。両方とも代入準同型を定め、$h_A(\mathbb C)$ は二点です。素点集合の一点は剰余体 $\kappa((0))\simeq\mathbb C$ を持ち、値域体の選び方で実現する準同型の数が変化します。
<!-- solution-end -->

### B4. 冪零元を関手で検出する

$D=k[\varepsilon]/(\varepsilon^2)$ とする。$h_D(k)$ と $h_D(D)$ の元の個数を比較し、$h_D$ と $h_k$ が同じ関手にはなれないことを示せ。

- Level: B
- ID: AG3-01-B4

<!-- solution-start -->
**詳細解答。** $h_D(B)$ は $b^2=0$ を満たす $b\in B$ と対応します。$B=k$ では体に非零の平方零元がないため $b=0$ の一通りです。$B=D$ では少なくとも $b=0$ と $b=\varepsilon$ の二通りがあります。実際 $\varepsilon^2=0$ かつ $\varepsilon\ne0$ です。一方 $k$ から任意の $k$ 代数 $B$ への $k$ 代数準同型は構造写像の一通りなので、$h_k(D)$ は一点です。$D$ での値の個数が異なり、関手 $h_D$ と $h_k$ は自然同型ではありません。
<!-- solution-end -->

### C1. 自然変換を全値域で決定する

$k$ を体、$A=k[t]$、$C=k[z]/(z^2)$ とする。自然変換 $h_A\Rightarrow h_C$ が一つしかないことを、定理の証明と同じ出発点から再導出せよ。また $B=C$ のとき、その変換がどの点を送るか述べよ。

- Level: C
- ID: AG3-01-C1

<!-- solution-start -->
**詳細解答。** 自然変換 $\eta$ があれば $\alpha=\eta_A(\operatorname{id}_A):C\to A$ を取ります。$z^2=0$ より $\alpha(z)^2=0$ です。$A=k[t]$ は整域なので $\alpha(z)=0$ だけが可能であり、$C\to A$ はこの指定で唯一に決まります。任意の $u:A\to B$ に対し、値域変更 $u:A\to B$ と自然性を使えば $\eta_B(u)=u\circ\alpha$ です。逆にこの式は $\eta_{B'}(\varphi\circ u)=\varphi\circ\eta_B(u)$ を満たすので自然変換を定めます。従ってただ一つです。$B=C$ における $u$ は $u(t)=b\in C$ で決まりますが、$\eta_C(u)(z)=(u\circ\alpha)(z)=u(0)=0$ です。$b$ の選び方に関係なく、$h_C(C)$ の零点に送られます。
<!-- solution-end -->

### C2. 二本の軸と三種類の素点

$k$ を代数閉体、$A=k[x,y]/(xy)$ とする。$(x)$、$(y)$、$(x,y)$ がそれぞれ素イデアルであることを商環で示し、二本の座標軸の $k$ 値点とどう違うかを説明せよ。また $A\to k[t]$ を $x\mapsto t,y\mapsto0$ とする写像の下で、$(0)\in\operatorname{Spec}k[t]$ がどこへ写るかを求めよ。

- Level: C
- ID: AG3-01-C2

<!-- solution-start -->
**詳細解答。** $(x)$ で割ると $A/(x)\simeq k[y]$、$(y)$ で割ると $A/(y)\simeq k[x]$ となり、ともに整域です。$(x,y)$ で割ると $A/(x,y)\simeq k$ となるので、三つとも素イデアルです。$(x,y)$ は原点 $(0,0)$ の極大イデアルであり、各軸上の $k$ 値点は $(x-a,y)$ または $(x,y-b)$ の形です。一方 $(x)$ と $(y)$ は極大でなく、各軸を一つの既約なまとまりとして表す素点です。指定の環準同型 $\alpha$ は $xy$ を0に送るので well-defined で、その核は $f(t,0)=0$ となる元の集合、すなわち $(y)$ です。したがって $\operatorname{Spec}(\alpha)((0))=\alpha^{-1}((0))=(y)$ です。これは $x$ 軸の一般点に対応します。
<!-- solution-end -->

次章では $\operatorname{Spec}A$ の素点の間にZariski位相を入れ、各開集合へ局所化環を割り当てて構造層を作ります。今回得た反変写像が、位相・層を備えた空間の射へどう持ち上がるかが次の中心問題です。
