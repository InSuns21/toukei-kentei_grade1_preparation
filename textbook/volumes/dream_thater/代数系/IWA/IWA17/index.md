# IWA17 主予想の証明戦略とEuler systems

[IWA16 円分岩澤主予想](../IWA16/index.md#thm-iwa16-main-conjecture) は無分岐岩澤加群と $p$ 進L関数の特徴イデアルが一致するという定理でした。どちらも直接計算するのは困難です。今回は、明示的な単数から類群の大きさを抑える仕組みを学び、片方向の整除から等式に至るまでに何が必要なのかを追います。

## 1. 塔の横方向にもノルムを取る

[IWA10 円分単数のノルム分布関係](../IWA10/index.md#thm-iwa10-norm-distribution) では $p$ 冪の導手を一段ずつ変えました。今度は有限層を固定して、$p$ とは異なる補助素数を導手に加えます。

奇素数 $p$、整数 $k\ge1$ に対して $m=p^k$ と置き、$\zeta_m$ を原始 $m$ 乗根とします。$F=\mathbb Q(\zeta_m+\zeta_m^{-1})$ を最大実部分体とします。補助素数は $\ell\equiv1\pmod m$ を満たすものに限ります。相異なる補助素数の積 $r$（空積は1）ごとに

$$
F_r=F(\zeta_\ell:\ell\mid r),\qquad z_r=\prod_{\ell\mid r}\zeta_\ell
$$

と置きます。各 $\zeta_\ell$ は原始 $\ell$ 乗根で、$z_1=1$ です。中国剰余定理で導手 $m,r$ の作用を独立に選べるため、$F_r/F$ のGalois群は各 $(\mathbb Z/\ell\mathbb Z)^\times$ の直積です。

$\ell\nmid s$ のとき $\phi_\ell$ を $F_s$ 上で $F$ を固定し、各 $\zeta_q$（$q\mid s$）を $\zeta_q^\ell$ に移す自己同型とします。これは $\ell$ における算術的Frobeniusの作用です。

体の乗法群への群環作用を指数で書きます。整数係数の群環元 $D=\sum_\sigma a_\sigma\sigma$ に対して $x^D=\prod_\sigma\sigma(x)^{a_\sigma}$ です。たとえば $x^{\phi_\ell-1}=\phi_\ell(x)/x$、群の全元の和による作用は [体のノルム](../IWA4/index.md#def-iwa4-field-norm) です。

異なる補助素数の層で、単にノルムが一致するのではなく、Frobeniusによる補正を伴って整合する元を用意します。これが円分単数による Euler system（Euler 系）の具体的な入口です。

<a id="def-iwa17-cyclotomic-euler-system"></a>

<!-- formal-statement-start -->
> **定義（円分単数のEuler系）**
> 奇素数 $p$、整数 $k\ge1$ に対し $m=p^k$ とする。$r$ は $\ell\equiv1\pmod m$ を満たす相異なる素数の積とし、空積1も許す。
> $\zeta_m,\zeta_\ell$ はそれぞれ原始根、$F=\mathbb Q(\zeta_m+\zeta_m^{-1})$ とする。
>
$$
F_r=F(\zeta_\ell:\ell\mid r),\qquad
z_r=\prod_{\ell\mid r}\zeta_\ell.
$$
>
> 次の元の族を円分単数のEuler系と呼ぶ。
>
$$
c_r=(1-\zeta_m z_r)(1-\zeta_m^{-1}z_r).
$$
>
> この族は、$\ell\mid r$、$s=r/\ell$ に対して次のノルム関係と合同関係を満たす。
>
$$
N_{F_r/F_s}(c_r)=c_s^{\phi_\ell-1}.
$$
$$
c_r\equiv c_s\pmod{\mathfrak L}
$$
>
> ただし $\phi_\ell$ は $F$ を固定し、$\zeta_q$ を $\zeta_q^\ell$ に移す $F_s$ の自己同型である（$q\mid s$）。
> $\mathfrak L$ は $F_r$ の $\ell$ の上の任意の素イデアルである。$r>1$ では $c_r$ は整数環の単数である。
<!-- formal-statement-end -->

この講ではこの特定の族を扱います。一般のGalois表現に対するEuler系の定義では、表現に応じたEuler因子がノルム関係に現れます。

<a id="thm-iwa17-euler-norm"></a>

<!-- formal-statement-start -->
> **定理（円分Euler系のノルムと合同）**
> [円分単数のEuler系](#def-iwa17-cyclotomic-euler-system) の元 $c_r$ は $F_r$ の非零代数的整数である。定義に掲げたノルム関係、合同関係、$r>1$ での単数性が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

$\zeta_\ell$ の全共役について積を取り、恒等式 $\prod_{a=0}^{\ell-1}(1-u\zeta_\ell^a)=1-u^\ell$ から $a=0$ の因子を除きます。合同関係は標数 $\ell$ に還元すると $\ell$ 乗根が1になることから出ます。

<!-- proof-start -->
### 証明

$c_r=1-(\zeta_m+\zeta_m^{-1})z_r+z_r^2$ だから $F_r$ に属する代数的整数です。$\zeta_m^{\pm1}z_r$ の位数は $m$ を因子に持ち1ではないので非零です。

$s=r/\ell$ と置き、まず $u=\zeta_m z_s$ を取ります。$u\ne1$ です。$F_r/F_s$ の共役は $\zeta_\ell$ を $\zeta_\ell^a$（$1\le a\le\ell-1$）に移す全作用です。積を大きい体で計算すると

$$
\prod_{a=1}^{\ell-1}(1-u\zeta_\ell^a)
=\frac{1-u^\ell}{1-u}.
$$

$u=\zeta_m^{-1}z_s$ でも同じ計算をします。$\ell\equiv1\pmod m$ なので $\zeta_m^{\pm\ell}=\zeta_m^{\pm1}$ です。二つの式を掛けると

$$
N_{F_r/F_s}(c_r)
=\frac{(1-\zeta_m z_s^\ell)(1-\zeta_m^{-1}z_s^\ell)}
{(1-\zeta_m z_s)(1-\zeta_m^{-1}z_s)}
=\frac{\phi_\ell(c_s)}{c_s}.
$$

ここでは $\zeta_m$ 自体が $F_r$ に属するとは仮定していません。二つの因子を掛けた式を $F_r$ で評価しています。

$\mathfrak L$ の剰余体は標数 $\ell$ です。そこで $x^\ell-1=(x-1)^\ell$ なので $\zeta_\ell$ の像は1です。従って $z_r$ の像は $z_s$ の像に一致し、$c_r\equiv c_s$ となります。

$r>1$ なら任意に $\ell\mid r$ を取れます。[ノルムの塔での合成](../IWA4/index.md#prop-iwa4-norm-transitivity) から

$$
N_{F_r/\mathbb Q}(c_r)
=\frac{N_{F_s/\mathbb Q}(\phi_\ell(c_s))}
{N_{F_s/\mathbb Q}(c_s)}=1.
$$

最後の等号は自己同型が共役の集合を置換するためです。代数的整数で絶対ノルムが1なら逆元も代数的整数です（他の共役の積が逆元）。したがって $c_r$ は単数です。
<!-- proof-end -->

<!-- definition-example-start: def-iwa17-cyclotomic-euler-system -->
**定義の確認**。 $p=3,k=1$、$m=3$、$\ell=7$ とします。$7\equiv1\pmod3$、$F=\mathbb Q$ で $\zeta_3+\zeta_3^{-1}=-1$ です。従って $c_1=3$、

$$
c_7=1+\zeta_7+\zeta_7^2
=\frac{1-\zeta_7^3}{1-\zeta_7}.
$$

$3$ は法7の単元なので、分子の全共役の積は分母の全共役の積と一致します。ノルムは1であり、$\phi_7(c_1)/c_1=3/3=1$ です。7の上の素点で $\zeta_7\equiv1$ だから $c_7\equiv3=c_1$。非零性、単数性、二つの整合条件を全て確認できました。一般の $r$ については [ノルムと合同の定理](#thm-iwa17-euler-norm) が保証します。
<!-- definition-example-end -->

$c_1$ は単数である必要はありません。補助素数を除くノルムが常に $c_s$ そのものだと考えると、今の例では $1=3$ となり破綻します。

## 2. ノルム関係を冪剰余類に移す

単数 $c_r$ のままでは主イデアルが自明なので、類群の非自明な元を直接拘束することはできません。群環の特別な元を作用させ、$p$ 冪乗の差を無視するとGalois作用で固定される類を作ります。

$M=p^a$（$a\ge1$）を固定し、補助素数に $\ell\equiv1\pmod M$ も課します。$\ell$ の成分群の位数を $d=\ell-1$、生成元を $\sigma_\ell$ とします。

<a id="def-iwa17-derivative"></a>

<!-- formal-statement-start -->
> **定義（Kolyvagin微分作用素）**
> 位数 $d=\ell-1$ の巡回群の生成元 $\sigma_\ell$ に対して、整数係数群環の元
>
$$
D_\ell=\sum_{j=1}^{d-1}j\sigma_\ell^j,\qquad
N_\ell=\sum_{j=0}^{d-1}\sigma_\ell^j
$$
>
> を取る。補助素数の積 $r$ に対して $D_r=\prod_{\ell\mid r}D_\ell$ とする。$D_1=1$ とする。
<!-- formal-statement-end -->

ここでの微分は変数の微分ではなく、巡回群の作用に重みをつけた和です。

<!-- definition-example-start: def-iwa17-derivative -->
**定義の確認**。 例えば $d=4$ なら $D_\ell=\sigma_\ell+2\sigma_\ell^2+3\sigma_\ell^3$。$N_\ell=1+\sigma_\ell+\sigma_\ell^2+\sigma_\ell^3$ となり、定義の全係数が具体的に決まります。空積なら $D_1=1$、例えば位数4と6の二つの成分なら $D_{5\cdot7}=D_5D_7$ と各成分の作用を順に適用します（群環の計算だけを示す例です。ここでは $m,M$ を指定しておらず、5と7が第1節の仮定を満たすとは主張していません）。
<!-- definition-example-end -->

<a id="lem-iwa17-derivative-identity"></a>

<!-- formal-statement-start -->
> **補題（微分作用素とノルム元の恒等式）**
> [Kolyvagin微分作用素](#def-iwa17-derivative) の記号で
>
$$
(\sigma_\ell-1)D_\ell=d-N_\ell
$$
>
> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

$\sigma_\ell D_\ell$ の添字を一つずらし、最後の項に $\sigma_\ell^d=1$ を用います。

<!-- proof-start -->
### 証明

$\sigma=\sigma_\ell$ と略記します。

$$
\sigma D_\ell=\sum_{j=2}^{d}(j-1)\sigma^j
=(d-1)+\sum_{j=2}^{d-1}(j-1)\sigma^j.
$$

$D_\ell$ を引くと、定数項は $d-1$、$\sigma$ の係数は $-1$、$2\le j\le d-1$ でも係数は $(j-1)-j=-1$ です。

$$
(\sigma-1)D_\ell=(d-1)-\sum_{j=1}^{d-1}\sigma^j=d-N_\ell.
$$
<!-- proof-end -->

$d=4$ の例では $\sigma D_\ell=3+\sigma^2+2\sigma^3$ なので、差は $3-\sigma-\sigma^2-\sigma^3=4-N_\ell$ です。

### 冪を無視すると何が固定されるか

$L^\times/L^{\times M}$ は非零元を $M$ 乗元の倍数まで区別する乗法群です。$[x]=[y]$ は $x/y$ が $M$ 乗であることを意味します。

<a id="thm-iwa17-invariant-derivative"></a>

<!-- formal-statement-start -->
> **定理（微分後の冪剰余類の不変性）**
> [円分単数のEuler系](#def-iwa17-cyclotomic-euler-system) について、$M=p^a$、$a\ge1$ とする。$r$ の全素因子 $\ell$ が $\ell\equiv1\pmod M$ を満たすなら
>
$$
[c_r^{D_r}]\in (F_r^\times/F_r^{\times M})^{\operatorname{Gal}(F_r/F)}.
$$
>
> 右辺はGalois群の全作用で固定される元の集合である。
<!-- formal-statement-end -->

### 証明の見取り図

微分作用素の恒等式で作用差をノルムに置き換えます。ノルムは一つ小さい $s$ に帰着し、そこで既に固定されることを帰納法で使います。

<!-- proof-start -->
### 証明

$r=1$ ならGalois群は自明なので成立します。$r>1$ とし、少ない素因子数について成立すると仮定します。任意の $\ell\mid r$ に対し $s=r/\ell$ と置きます。

群は可換で $D_r=D_sD_\ell$ なので [微分作用素の恒等式](#lem-iwa17-derivative-identity) と [ノルム関係](#thm-iwa17-euler-norm) により

$$
(c_r^{D_r})^{\sigma_\ell-1}
=c_r^{D_s(d-N_\ell)}
=(c_r^{D_s})^d(c_s^{D_s})^{1-\phi_\ell}.
$$

第1因子は $M\mid d$ により $M$ 乗です。帰納法の仮定では $[c_s^{D_s}]$ が $F_s/F$ の全自己同型で固定されます。$\phi_\ell$ もその一つなので第2因子も $F_s$ での $M$ 乗です。したがって積は $F_r$ での $M$ 乗です。

これが全ての $\sigma_\ell$ で成立します。これらは直積の各成分を生成するため、全Galois群で剰余類が固定されます。
<!-- proof-end -->

$M\mid d$ の条件を失えば第1因子が $M$ 乗だと結論できません。例えば $M=3$、$d=4$ なら形式的に $x^4$ と $x$ の冪剰余類は同じで、一般には自明ではありません。

### 基礎体への降下

ここでは固定剰余類が実際に基礎体の元で代表できるところまで確認します。

<a id="prop-iwa17-descent"></a>

<!-- formal-statement-start -->
> **命題（冪剰余類の降下）**
> $L/K$ を有限Galois拡大、$M\ge2$ を整数とし、$L$ に1以外の $M$ 乗単位根が存在しないと仮定する。このとき自然写像
>
$$
K^\times/K^{\times M}\longrightarrow
(L^\times/L^{\times M})^{\operatorname{Gal}(L/K)}
$$
>
> は同型である。
<!-- formal-statement-end -->

### 証明の見取り図

固定剰余類を代表する $x$ に対し、$\sigma(x)/x$ の $M$ 乗根は一意です。その一意性で乗法的な整合式を得て、Hilbert 90 で作用差を取り除きます。

<!-- proof-start -->
### 証明

$y\in K^\times$ が $L$ で $u^M$ と書けるなら、任意の $\sigma$ に対し $(\sigma(u)/u)^M=1$。仮定から $\sigma(u)=u$、従って $u\in K^\times$ です。よって自然写像は単射です。

次に $[x]$ が固定されるとします。各 $\sigma$ に対し $b_\sigma^M=\sigma(x)/x$ となる $b_\sigma\in L^\times$ が存在し一意です。

$$
(b_\sigma\sigma(b_\tau))^M
=\frac{\sigma(x)}x\frac{\sigma\tau(x)}{\sigma(x)}
=\frac{\sigma\tau(x)}x.
$$

一意性から $b_{\sigma\tau}=b_\sigma\sigma(b_\tau)$ です。ここで整合式から実際に $u$ を構成します。$G=\operatorname{Gal}(L/K)$ とし、$t\in L$ に対して

$$
u(t)=\sum_{\tau\in G}b_\tau^{-1}\tau(t)
$$

と置きます。異なる体の自己同型は $L$ 上で線形独立な写像なので、ある $t$ では $u(t)\ne0$ です。この独立性も短く確認できます。非零係数の個数が最小の関係 $\sum_j a_j\sigma_j(t)=0$ が全ての $t$ で成立すると仮定します。1項だけなら $t=1$ で矛盾です。2項以上なら $\sigma_1(v)\ne\sigma_2(v)$ となる $v$ を取り、$t$ を $vt$ に替えた関係から元の関係の $\sigma_1(v)$ 倍を引きます。

$$
\sum_{j\ge2}a_j(\sigma_j(v)-\sigma_1(v))\sigma_j(t)=0.
$$

第2項の係数は非零で、項数が減るため最小性に矛盾します。

非零となる $t$ を固定し $u=u(t)$ とします。整合式 $b_{\sigma\tau}=b_\sigma\sigma(b_\tau)$ を用いると

$$
\sigma(u)=\sum_{\tau\in G}\frac{b_\sigma}{b_{\sigma\tau}}\sigma\tau(t)
=b_\sigma u.
$$

最後の等号は $\tau\mapsto\sigma\tau$ が $G$ の置換だからです。従って $b_\sigma=\sigma(u)/u$。これは乗法的Hilbert 90の証明にもなっています。

従って

$$
\frac{\sigma(x/u^M)}{x/u^M}
=\frac{b_\sigma^M}{(\sigma(u)/u)^M}=1.
$$

$x/u^M\in K^\times$ であり、その類は $[x]$ に写ります。全射性が示されました。
<!-- proof-end -->

この講の $F_r$ には非自明な $p$ 冪乗根の単位根がありません。実際 $\mathbb Q(\zeta_{mr})$ の自己同型で $\zeta_m\mapsto\zeta_m^{-1}$、全 $\zeta_\ell\mapsto\zeta_\ell$ とするものは中国剰余定理で存在し、$F_r$ を点ごとに固定しますが $\zeta_p$ を固定しません。$p$ が奇素数なので $\zeta_p^{-1}\ne\zeta_p$。非自明な $p$ 冪位数の根を含めばその冪として原始 $p$ 乗根を含むため、矛盾します。

従って [微分後の冪剰余類の不変性](#thm-iwa17-invariant-derivative) と [降下命題](#prop-iwa17-descent) を順に適用し、$F^\times/F^{\times M}$ の一意な類 $\kappa_r$ を得ます。これを Kolyvagin 微分と呼びます。

最小例として $K=\mathbb Q$、$L=\mathbb Q(\sqrt2)$、$M=3$ を考えます。$x=2(1+\sqrt2)^3$ に対し非自明な共役を $\sigma$ とすると

$$
\frac{\sigma(x)}x=\left(\frac{1-\sqrt2}{1+\sqrt2}\right)^3.
$$

従って $[x]$ は固定されます。$L$ は実数体の部分体なので3乗単位根は1だけです。降下の代表元は $x/(1+\sqrt2)^3=2$ で、$K$ の冪剰余類 $[2]$ に降下します。

## 3. 類群の大きさをどのように抑えるか

$\kappa_r$ の代表元を $x_r\in F^\times$ とします。$c_r^{D_r}=x_r u^M$ となる $u\in F_r^\times$ が存在します。$r>1$ なら左辺は単数なので、$F_r$ の素イデアル $\mathfrak L$ で付値を取ると

$$
0=e(\mathfrak L/\mathfrak q)v_{\mathfrak q}(x_r)+M v_{\mathfrak L}(u),
\qquad \mathfrak q=\mathfrak L\cap\mathcal O_F.
$$

補助素数以外では $F_r/F$ は無分岐なので $e=1$。従ってそのような $\mathfrak q$ における $v_{\mathfrak q}(x_r)$ は $M$ の倍数です。代表元を $M$ 乗倍しても付値の法 $M$ の値は変わりません。

[IWA11のS単数・付値・類群の完全列](../IWA11/index.md#thm-iwa11-s-unit-exact) で見たように、主イデアルから得る付値の組は類群で関係式を与えます。今得た剰余類は、補助素数の上にだけ非自明な付値を残し得るという点が重要です。

例えば類群の元 $a_1,a_2$ について、補助素数から $p^2 a_1=0$、$p a_2\in\langle a_1\rangle$ という関係を得られたとします。この場合、生成する群の位数は高々 $p^3$ です。以下の命題がこの計算を一般化します。

<a id="prop-iwa17-class-bound"></a>

<!-- formal-statement-start -->
> **命題（逐次関係による位数上界）**
> 有限アーベル $p$ 群 $A$ が $a_1,\ldots,a_h$ で生成されるとする。$A_0=0$、$A_j=\langle a_1,\ldots,a_j\rangle$ とする。非負整数 $b_j$ が
>
$$
p^{b_j}a_j\in A_{j-1}\qquad(1\le j\le h)
$$
>
> を満たすなら $|A|$ は $p^{\sum_j b_j}$ を割る。
<!-- formal-statement-end -->

### 証明の見取り図

生成元を一つ加えるごとの商は巡回群になります。各商の位数を抑えて掛け合わせます。

<!-- proof-start -->
### 証明

$A_j/A_{j-1}$ は $a_j$ の像で生成され、その像は $p^{b_j}$ 倍すると零です。従って $\mathbb Z/p^{b_j}\mathbb Z$ からこの商への全射が存在し、商の位数は $p^{b_j}$ を割ります。

$$
|A|=\prod_{j=1}^h[A_j:A_{j-1}].
$$

各因子の位数の整除を掛け合わせると主張が得られます。
<!-- proof-end -->

$A=\mathbb Z/9\mathbb Z\oplus\mathbb Z/3\mathbb Z$ なら標準生成元に $b_1=2,b_2=1$ を取れて上界は27、実際の位数も27です。関係が緩い場合には等号とは限りません。

実際の Rubin・Kolyvagin の方法では、指定したイデアル類を表す補助素数を選び、前の微分の冪剰余情報を次の微分の付値情報へ移します。さらに有限層の関係を岩澤代数上の整除へ持ち上げます。素数選択には Chebotarev の定理とKummer理論、付値への移送には局所的な計算、無限塔への移行にはcontrolが必要です。これらの全てをノルム関係だけから導くことはできません。

## 4. 主予想に戻るための二つの算術入力

前講と同じく $K_n=\mathbb Q(\zeta_{p^{n+1}})$、$\Lambda=\mathbb Z_p[[T]]$、$\chi=\omega^i$（$2\le i\le p-3$、$i$ は偶数）とします。[指標射影子](../IWA8/index.md#def-iwa8-character-idempotent) による成分を上付き $(i)$ で表します。

各層の全単数、円分単数、$p$ の上の局所主単数を $p$ 進完備化し、ノルムによる逆極限をそれぞれ $E,C,U$ とします。ここで $p$ 進完備化は、有限生成アーベル群 $H$ なら $\varprojlim_a H/H^{p^a}$ を取る操作です。$E$ の偶非自明成分は局所化で $U$ の中に入るので、この成分では $C^{(i)}\subseteq E^{(i)}\subseteq U^{(i)}$ と考えます。

$X$ は無分岐岩澤加群、$\mathfrak X$ は $p$ の上以外で無分岐な最大アーベル pro-$p$ 拡大のGalois群です。[IWA16の反射置換](../IWA16/index.md#prop-iwa16-reflection-substitution) で比較する解析側の級数を $F_i$ とします。

以下は独立に証明される外部入力です。主予想そのものを仮定するのではなく、その証明に必要な別の定理を取り出します。

<a id="thm-iwa17-arithmetic-inputs"></a>

<!-- formal-statement-start -->
> **定理（円分単数比較とEuler系による整除：外部定理）**
> $p$ を奇素数、$K_n=\mathbb Q(\zeta_{p^{n+1}})$ とし、上記のノルム逆極限を取る。$\chi=\omega^i$ は非自明な偶指標とする。次の加群は有限生成ねじれ $\Lambda$ 加群であり、以下の関係が成立する。
>
> （I）局所・大域の単数とGalois群の完全列
>
$$
0\to B_i\to V_i\to Y_i\to A_i\to0,
$$
>
> ただし $B_i=E^{(i)}/C^{(i)}$、$V_i=U^{(i)}/C^{(i)}$、$Y_i=\mathfrak X^{(i)}$、$A_i=X^{(i)}$ とする。
>
> （II）Iwasawaの円分単数比較
>
$$
\operatorname{char}_\Lambda V_i=(F_i).
$$
>
> （III）Rubin型のEuler系による整除
>
$$
\operatorname{char}_\Lambda B_i\subseteq
\operatorname{char}_\Lambda A_i.
$$
<!-- formal-statement-end -->

(I) は [局所／大域単数とp分岐Galois群](../IWA11/index.md#thm-iwa11-local-global-exact) の有限層版を無限塔で扱う算術的比較です。(II) はColeman写像（局所単数系を冪級数に変換する写像）による計算です。(III) がEuler系による深い上界です。[Sharifi 第6章](https://www.math.ucla.edu/~sharifi/notes/iwasawa-ch06.html) の 6.1.3、6.1.4、6.3.3、6.5.6 を参照してください。6.5.6 の仮定 $\chi(p)\ne1$、$(\chi\omega^{-1})(p)\ne1$ は、今回どちらも導手 $p$ の非自明指標であり、Dirichlet指標として $p$ では0となるため満たします。

特徴イデアルの生成元で書くと (III) は $a_i\mid b_i$ です。$A_i$ の特徴イデアルが小さい、という言い方をすると包含の向きが逆になるので、生成元の整除とイデアル包含を区別します。

<a id="prop-iwa17-exact-comparison"></a>

<!-- formal-statement-start -->
> **命題（完全列による特徴イデアルの比較）**
> 有限生成ねじれ $\Lambda$ 加群の完全列 $0\to B\to V\to Y\to A\to0$ が与えられたとする。このとき
>
$$
\operatorname{char} B\cdot\operatorname{char} Y
=\operatorname{char} V\cdot\operatorname{char} A.
$$
>
> 特に $\operatorname{char}Y=\operatorname{char}V$ と $\operatorname{char}A=\operatorname{char}B$ は同値である。
<!-- formal-statement-end -->

### 証明の見取り図

中央の写像の像で完全列を二つに切り、特徴イデアルの乗法性を二度使います。

<!-- proof-start -->
### 証明

$W=\operatorname{im}(V\to Y)$ とすると、完全性から

$$
0\to B\to V\to W\to0,\qquad
0\to W\to Y\to A\to0
$$

が短完全列です。[特徴イデアルの乗法性](../IWA6/index.md#prop-iwa6-exact-additivity) により

$$
\operatorname{char}V=\operatorname{char}B\operatorname{char}W,
\qquad
\operatorname{char}Y=\operatorname{char}W\operatorname{char}A.
$$

両式から結論の積の等式を得ます。特徴イデアルは非零主イデアルですから、共通の生成元を整域の中で消去できます。これによって後半の同値も従います。
<!-- proof-end -->

例えば $\operatorname{char}A=(T)$、$\operatorname{char}B=(T^2)$、$\operatorname{char}W=(T+p)$ とすると、$\operatorname{char}V=(T^2(T+p))$、$\operatorname{char}Y=(T(T+p))$ です。片方向の整除だけでは等式に届きません。

## 5. 全成分の比較で残りの整除を回収する

すべての非自明偶成分を同時に比較する理由を、代数的に確認します。

<a id="lem-iwa17-total-balance"></a>

<!-- formal-statement-start -->
> **補題（整除と全成分の指数比較）**
> 有限集合 $I$ の各 $i$ について非零元 $a_i,b_i\in\Lambda$ が $a_i\mid b_i$ を満たすとする。係数付値とWeierstrass次数について
>
$$
\sum_{i\in I}\mu(b_i)\le\sum_{i\in I}\mu(a_i),
$$
$$
\sum_{i\in I}\lambda(b_i)\le\sum_{i\in I}\lambda(a_i)
$$
>
> なら、全ての $i$ に対し $(a_i)=(b_i)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

整除の商に残る $\mu,\lambda$ は非負です。全成分の和で余分な指数が残らなければ、各商が単元になります。

<!-- proof-start -->
### 証明

$b_i=a_i q_i$ と書きます。[積の指数公式](../IWA6/index.md#prop-iwa6-order-additivity) から

$$
\mu(b_i)-\mu(a_i)=\mu(q_i)\ge0,\qquad
\lambda(b_i)-\lambda(a_i)=\lambda(q_i)\ge0.
$$

仮定により両方の非負数の和は0以下なので、各 $q_i$ で両指数が0です。係数付値が0で、法 $p$ での最低非零次数が0ということは、定数項が $p$ 進単元であることを意味します。従って $q_i$ は冪級数環の単元であり、主イデアルは等しくなります。
<!-- proof-end -->

例えば二成分で $a_1=T$、$a_2=T+p$、$b_1=T(1+T)$、$b_2=2(T+p)$（$p$ は奇素数）なら、両側の $\mu$ の和は0、$\lambda$ の和は2です。各商 $1+T,2$ は単元です。これに対し $b_1=T^2$ なら全次数は3となり、仮定は成立しません。

実際の算術で全成分を比べる際には、[円分単数の有限指数と実類数](../IWA10/index.md#thm-iwa10-finite-index) が入口になります。最大実部分体の各有限層で、全単数と円分単数の指数の $p$ 部分は実類群の $p$ 部分の位数に等しくなります。

有限層の等式から無限層の指数比較に移る際には [一様有界なcontrol](../IWA12/index.md#def-iwa12-uniform-control) が必要です。非自明偶指標での単数比較写像と類群比較写像について、Sharifi 第6章 6.5.1–6.5.2 は必要な有限誤差の制御を与えます。円分単数は [ノルムが全射](../IWA10/index.md#thm-iwa10-surjective-norm) なので、単数の比較写像を円分単数で割った写像でも有限誤差が一様に抑えられます。具体的に、円分単数の下層の元を上から持ち上げれば、商の比較写像の核は元の核の像となり、余核は変わりません。

自明指標に対応する類群の $p$ 部分は零です。これは有理数体の円分 $\mathbb Z_p$ 拡大で $p$ が唯一の完全分岐素数であり、底体の類数が1であることから従うIwasawaの定理（[Greenberg, Iwasawa Theory—Past and Present, Chapter 2](https://sites.math.washington.edu/~greenber/book.pdf)）を使います。

自明指標の固定体への拡大次数は $p-1$ で $p$ と互いに素です。類群の延長 $j$ とノルム $N$ について次の二式が加法表記で成立します。

$$
Nj=p-1,\qquad jN=\sum_{\delta\in\Delta}\delta.
$$

これらは [イデアルのノルムと延長](../IWA4/index.md#prop-iwa4-conjugate-product) の公式です。

$p$ 部分では $p-1$ の掛け算が可逆で、右の和は自明成分上で $p-1$ 倍です。従って $j$ は固定体の $p$ 部分類群と自明指標成分との同型を与えます。

実部分体への拡大次数は2であり、奇素数 $p$ に対して可逆です。単数と類群のノルム・延長にも上と同じ二つの合成式（次数倍と共役の和）が成り立つので、実部分体の $p$ 部分を複素共役で固定される成分と同一視できます。円分単数についても [実単数と群の生成](../IWA10/index.md#prop-iwa10-realness) によって実円分単数と単位根の積であり、単位根の $p$ 部分は奇成分にあるため偶成分の商に影響しません。

そこで各非自明偶成分の有限層の指数を足すと、単数商の合計は全単数商の指数以下、全単数商の指数は類群の非自明偶成分の合計に等しくなります。

$$
\sum_i v_p(|B_{i,n}|)\le \sum_i v_p(|A_{i,n}|).
$$

ここで $B_{i,n},A_{i,n}$ はそれぞれ有限層での単数商・類群の成分です。有限誤差を除けば各位数の指数は $\mu p^n+\lambda n+O(1)$ です。これは [構造定理](../IWA5/index.md#thm-iwa5-structure) と [初等加群の成長公式](../IWA7/index.md#prop-iwa7-elementary-growth) を組み合わせた標準的な成長比較です。

有限な核・余核は指数に一様有界な差しか生じません。実際、有限誤差を持つ写像 $L_1\to L_2$ をその像を挟んだ二つの短完全列に分けます。各列に $(1+T)^{p^n}-1$ の掛け算を作用させると、商の比較で新たに現れる核・余核は元の有限誤差群の部分群または商群です。従って位数は元の有限群の位数で抑えられ、対数の差は $n$ に依存しない定数で抑えられます。

また有限層とのcontrolでcoinvariantsが有限となるため、初等因子に $(1+T)^{p^n}-1$ と共通する因子はありません。

[円分単数比較とEuler系による整除](#thm-iwa17-arithmetic-inputs) で $a_i\mid b_i$（$a_i,b_i$ は $A_i,B_i$ の特徴イデアルの生成元）を得ています。従って全成分について

$$
0\le\sum_i(\mu(b_i)-\mu(a_i)),\qquad
0\le\sum_i(\lambda(b_i)-\lambda(a_i)).
$$

有限層の不等式に成長式を代入すると

$$
p^n\sum_i(\mu(b_i)-\mu(a_i))
+n\sum_i(\lambda(b_i)-\lambda(a_i))\le O(1).
$$

両係数は非負なので、一方でも正なら左辺は発散します。従って両方0です。[整除と全成分の指数比較](#lem-iwa17-total-balance) により $\operatorname{char}A_i=\operatorname{char}B_i$ が成り立ちます。

最後に [完全列による特徴イデアルの比較](#prop-iwa17-exact-comparison) を使って $\operatorname{char}Y_i=\operatorname{char}V_i=(F_i)$ を得ます。反射定理と [円分座標の反転置換](../IWA16/index.md#prop-iwa16-reflection-substitution)（Sharifi Proposition 6.3.2）を適用すると

$$
\operatorname{char}_\Lambda X^{(1-i)}
=\left(F_i\left(\frac{1+p}{1+T}-1\right)\right)
=(f_i)
$$

となります。前講の [主予想の定式化](../IWA16/index.md#thm-iwa16-main-conjecture) です。ここでは外部入力を明記した上で、整除から等式へ戻る論理を証明しました。

### Ferrero–Washington の定理の役割

[Ferrero–Washingtonのμ=0定理](../IWA7/index.md#thm-iwa7-ferrero-washington) はアーベル数体の円分 $\mathbb Z_p$ 拡大で類群の岩澤加群の $\mu$ が0という定理です。この章の塔に適用できますが、$\lambda$ や個々の既約因子は決めません。

例えば $a=T$ と $b=T+p$ はどちらも $\mu=0,\lambda=1$ ですが、$(a)\ne(b)$ です。実際 $b$ の定数項は $p\ne0$ であり $T$ は $b$ を割りません。従って $\mu=0$ のみから主予想の等式を導くことはできません。

Mazur–Wiles の1984年の方法は保型曲線のコホモロジーと Eisenstein 型の合同を使ってGalois表現を構成する経路です。一方、Rubin の方法は円分単数のEuler系から類群の関係式を作る経路です。共通の目標は特徴イデアルを比較することですが、深い算術入力は異なります。

## 6. 演習と詳細解答

### Level A

<a id="ex-iwa17-a1"></a>

**A1. ノルムを積で求める**
- Level: A
- ID: IWA17-A1

$m=3,\ell=13$ とする。$c_{13}$ を $\zeta_{13}$ で表し、その絶対ノルムと13の上の素点での剰余を求めよ。

<!-- solution-start -->
**詳細解答。** $13\equiv1\pmod3$、$F=\mathbb Q$ であり、$\zeta_3+\zeta_3^{-1}=-1$ だから

$$
c_{13}=1+\zeta_{13}+\zeta_{13}^2
=\frac{1-\zeta_{13}^3}{1-\zeta_{13}}.
$$

$a=1,\ldots,12$ に対し $3a$ は法13の非零剰余類を全て一度ずつ走るので、ノルムの分子と分母は同じ積です。従ってノルムは1。13の上で $\zeta_{13}\equiv1$ なので $c_{13}\equiv3$ です。[ノルムと合同](#thm-iwa17-euler-norm) の両条件と一致します。
<!-- solution-end -->

<a id="ex-iwa17-a2"></a>

**A2. 群環の係数**
- Level: A
- ID: IWA17-A2

位数6の巡回群で $D=\sigma+2\sigma^2+3\sigma^3+4\sigma^4+5\sigma^5$ とする。$(\sigma-1)D$ を計算せよ。

<!-- solution-start -->
**詳細解答。** $\sigma^6=1$ を用いて

$$
\sigma D=5+\sigma^2+2\sigma^3+3\sigma^4+4\sigma^5.
$$

$D$ を引くと $5-\sigma-\sigma^2-\sigma^3-\sigma^4-\sigma^5$。これは $6-N$（$N=1+\sigma+\cdots+\sigma^5$）です。[微分作用素の恒等式](#lem-iwa17-derivative-identity) を具体的に確認しました。
<!-- solution-end -->

<a id="ex-iwa17-a3"></a>

**A3. 補助素数の条件**
- Level: A
- ID: IWA17-A3

$p=3,m=9,M=27$ とする。19、37、109のうち二つの合同条件を満たす素数を選べ。いずれも素数としてよい。

<!-- solution-start -->
**詳細解答。** いずれも9で割った余りは1です。一方、$19-1=18$、$37-1=36$、$109-1=108=4\cdot27$。最初の二つは27で割り切れず、109だけが $\ell\equiv1\pmod{27}$ を満たします。従って109です。これは [微分後の不変性](#thm-iwa17-invariant-derivative) の $M\mid\ell-1$ に必要です。
<!-- solution-end -->

<a id="ex-iwa17-a4"></a>

**A4. 整除の向き**
- Level: A
- ID: IWA17-A4

$\Lambda=\mathbb Z_5[[T]]$ とし、$a=T$、$b=T(T+5)$ とする。$a\mid b$ か、$(a)\subseteq(b)$ か、逆向きの包含かを判定せよ。

<!-- solution-start -->
**詳細解答。** $b=a(T+5)$ なので $a\mid b$、任意の $bH$ は $a((T+5)H)$ と書けるため $(b)\subseteq(a)$ です。逆向きなら $a=bQ$ となり、消去して $1=(T+5)Q$ となりますが、定数項の右辺は5の倍数で矛盾します。従って真の包含です。
<!-- solution-end -->

### Level B

<a id="ex-iwa17-b1"></a>

**B1. 二つの補助素数による不変性**
- Level: B
- ID: IWA17-B1

$m=M=3$、$r=7\cdot13$ とする。$\sigma_7$ による $[c_r^{D_r}]$ の不変性を、ノルムと微分の式を使って示せ。

<!-- solution-start -->
**詳細解答。** $D_r=D_7D_{13}$ で、群は可換です。[微分作用素の恒等式](#lem-iwa17-derivative-identity) で $(\sigma_7-1)D_7=6-N_7$。さらに [ノルム関係](#thm-iwa17-euler-norm) で $c_r^{N_7}=c_{13}^{\phi_7-1}$ です。

$$
(c_r^{D_r})^{\sigma_7-1}
=(c_r^{D_{13}})^6(c_{13}^{D_{13}})^{1-\phi_7}.
$$

第1因子は3乗です。$s=13$ では $N_{13}(c_{13})=1$ だから、再び微分の式から $(c_{13}^{D_{13}})^{\sigma_{13}-1}=c_{13}^{12}$ となり、3乗です。

$\phi_7$ は13の巡回成分のある元なので、$\sigma_{13}$ で固定された剰余類は $\phi_7$ でも固定されます。従って第2因子も3乗です。全体が3乗なので所望の不変性が成立します。
<!-- solution-end -->

<a id="ex-iwa17-b2"></a>

**B2. 付値から関係式へ**
- Level: B
- ID: IWA17-B2

有限アーベル5群 $A$ が $a_1,a_2,a_3$ で生成され、$25a_1=0$、$5a_2\in\langle a_1\rangle$、$a_3\in\langle a_1,a_2\rangle$ とする。位数の上界を求め、その上界が達成される例を作れ。

<!-- solution-start -->
**詳細解答。** [逐次関係による位数上界](#prop-iwa17-class-bound) で $b_1=2,b_2=1,b_3=0$ です。最初の商の位数は25を割り、二番目は5を割り、三番目は1です。従って $|A|\mid5^3=125$。

$A=\mathbb Z/25\mathbb Z\oplus\mathbb Z/5\mathbb Z$ とし、$a_1=(1,0),a_2=(0,1),a_3=(1,1)$ と取ります。最初の二つで生成され、三つの関係を満たし、位数は125なので達成されます。
<!-- solution-end -->

<a id="ex-iwa17-b3"></a>

**B3. 完全列の未知の特徴イデアル**
- Level: B
- ID: IWA17-B3

有限生成ねじれ $\Lambda$ 加群の完全列 $0\to B\to V\to Y\to A\to0$ について

$$
\operatorname{char}B=(T^2),\quad
\operatorname{char}V=(T^2(T+p)^3),\quad
\operatorname{char}A=(T+p)
$$

とする。$\operatorname{char}Y$ を求めよ。

<!-- solution-start -->
**詳細解答。** [完全列による特徴イデアルの比較](#prop-iwa17-exact-comparison) を使うと

$$
(T^2)\operatorname{char}Y=(T^2(T+p)^4).
$$

両辺の生成元は単元倍まで一致します。$T^2$ は非零なので整域で消去して $\operatorname{char}Y=((T+p)^4)$ です。この例では $T+p$ は $T^2$ を割らないため（$T=-p$ で評価すると $T^2=p^2\ne0$）、$\operatorname{char}B\subseteq\operatorname{char}A$ は成立しません。完全列自体とEuler系による整除は別の入力です。
<!-- solution-end -->

<a id="ex-iwa17-b4"></a>

**B4. μ消失の限界**
- Level: B
- ID: IWA17-B4

$p=5$、$a=T-5$、$b=(T-5)(T-10)$ とする。両方の $\mu,\lambda$ とイデアル包含を求めよ。$\mu=0$ と片方向の整除で等式が従うか。

<!-- solution-start -->
**詳細解答。** [係数付値とWeierstrass次数](../IWA6/index.md#def-iwa6-orders) により、法5の還元は $a\equiv T$、$b\equiv T^2$。いずれも非零なので $\mu(a)=\mu(b)=0$、最低非零次数から $\lambda(a)=1,\lambda(b)=2$。$b=a(T-10)$ なので $(b)\subseteq(a)$ です。しかし $T-10$ の定数項は5の倍数なので単元ではなく、包含は真です。$\mu=0$ だけでは余分な正次数の因子を取り除けません。
<!-- solution-end -->

<a id="ex-iwa17-b5"></a>

**B5. 冪剰余類の降下の条件**
- Level: B
- ID: IWA17-B5

$K=\mathbb Q$、$L=\mathbb Q(\sqrt3)$、$M=3$ とする。$x=5(2+\sqrt3)^3$ の剰余類が固定されることを確かめ、$K$ に降下した類を求めよ。さらに $M=2$ に変更したとき、自然写像の単射性が壊れる例を示せ。

<!-- solution-start -->
**詳細解答。** 非自明な自己同型 $\sigma$ は $\sqrt3$ を $-\sqrt3$ に移します。従って

$$
\sigma(x)/x=\left(\frac{2-\sqrt3}{2+\sqrt3}\right)^3.
$$

商は $L$ の3乗元なので $[x]$ は固定されます。$L\subseteq\mathbb R$ には1以外の3乗単位根はありません。[冪剰余類の降下](#prop-iwa17-descent) が適用でき、$x/(2+\sqrt3)^3=5$ から降下した類は $[5]\in\mathbb Q^\times/\mathbb Q^{\times3}$ です。

一方 $M=2$ では $-1$ が非自明な2乗単位根です。有理数3は $\mathbb Q$ では平方でないので $[3]\ne[1]$ ですが、$L$ では $3=(\sqrt3)^2$ であり $[3]=[1]$ になります。自然写像は単射ではありません。降下命題で用いた「冪根の一意性」が失われたことが原因です。
<!-- solution-end -->

### Level C

<a id="ex-iwa17-c1"></a>

**C1. 全成分から主予想型の等式へ**
- Level: C
- ID: IWA17-C1

$p=7$ の模型で二つの偶非自明指標 $i=2,4$ を考える。各成分で第4節の完全列が与えられ、$a_i\mid b_i$ とする。$a_2=T-7$、$a_4=(T+7)^2$ であり、有限層の単数商と類群の指数の差の合計が一様有界であるとする。各成分の成長式は $\mu p^n+\lambda n+O(1)$ とする。

1. $b_i$ の特徴イデアルを求めよ。
2. $V_2,V_4$ の特徴イデアルが $(T^2+7),(T+14)$ の場合に $Y_2,Y_4$ の特徴イデアルを求めよ。
3. $Y_i$ に対応する無分岐加群の指標を求め、$\mu=0$ だけではこの推論のどこが不足するか説明せよ。

<!-- solution-start -->
**詳細解答。** [係数付値とWeierstrass次数](../IWA6/index.md#def-iwa6-orders) によれば法7の還元は $T,T^2$ です。従って $\mu$ の和は0、$\lambda$ の和は3です。

$b_i=a_iq_i$ と書きます。[積の指数公式](../IWA6/index.md#prop-iwa6-order-additivity) により成長指数の差は

$$
7^n\bigl(\mu(q_2)+\mu(q_4)\bigr)
+n\bigl(\lambda(q_2)+\lambda(q_4)\bigr)+O(1).
$$

この差が一様有界で、各係数が非負であるため、両方の和が0です。[整除と全成分の指数比較](#lem-iwa17-total-balance) により両 $q_i$ は単元。従って

$$
(b_2)=(T-7),\qquad (b_4)=((T+7)^2).
$$

次に [完全列による特徴イデアルの比較](#prop-iwa17-exact-comparison) において $\operatorname{char}B_i=\operatorname{char}A_i$ なので、非零主イデアルを消去すると $\operatorname{char}Y_i=\operatorname{char}V_i$ です。

$$
\operatorname{char}Y_2=(T^2+7),\qquad
\operatorname{char}Y_4=(T+14).
$$

[IWA16の反射指標](../IWA16/index.md#thm-iwa16-main-conjecture) で $1-i$ を法6で取るので、$i=2$ は $j=5$、$i=4$ は $j=3$ に対応します。生成元を無分岐加群の座標へ移すには別途 [円分座標の反転置換](../IWA16/index.md#prop-iwa16-reflection-substitution) が必要です。

$\mu=0$ だけでは $q_i$ の法7の還元の最低次数が0とは限りません。例えば $q_2=T$、$q_4=1$ なら $\mu$ は両方0でも $\lambda$ の和は1です。成長比較がこの余分な次数を排除して初めて等式を得られます。この模型の多項式は実際の $p$ 進L関数を主張するものではありません。
<!-- solution-end -->

## 7. まとめ

円分単数のEuler系は、補助素数方向のノルム・合同関係を持ちます。群環の微分作用素により固定された冪剰余類を作り、降下して類群の関係式を得ることが証明戦略の入口です。深いEuler系の整除定理と有限層の指数比較を合わせることで、特徴イデアルの等式に戻ります。

次講 IWA18 では、特定の分岐条件を課してGaloisコホモロジーの類を選ぶ Selmer 群と、その Pontryagin 双対を学びます。

## 参考文献

- Romyar Sharifi, [Iwasawa Theory, Chapter 6](https://www.math.ucla.edu/~sharifi/notes/iwasawa-ch06.html), §§6.1, 6.3–6.6。特に補助素数の構成と微分の恒等式、整除定理の仮定。
- John Coates and R. Sujatha, [Cyclotomic Fields and Zeta Values](https://link.springer.com/book/10.1007/978-3-540-33069-1), 円分単数とEuler系を用いる主予想の証明。
- Karl Rubin, [Euler Systems](https://doi.org/10.1515/9781400865208), 一般のEuler系と岩澤理論。
