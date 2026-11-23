# IWA4 ノルム・制限と逆極限

[IWA2で作った円分塔](../IWA2/index.md#thm-iwa2-compatible-tower)を $K_0\subset K_1\subset\cdots$ と書き、$[K_n:\mathbb Q]=p^n$、$\Gamma_n=\operatorname{Gal}(K_n/\mathbb Q)\simeq\mathbb Z/p^n\mathbb Z$ とします。$p$ は任意の素数です。[IWA3の岩澤代数](../IWA3/index.md#def-iwa3-completed-group-ring)は $\Lambda=\mathbb Z_p[[\Gamma]]\simeq\mathbb Z_p[[T]]$ でした。しかし環ができても、各層の類群や単数をどの向きの写像で結べばよいかはまだ決まっていません。

本講の中心問いは、**有限層にある算術的情報を失わず、整合した無限塔の元として扱うには何が必要か**です。上の層から下の層へ送るノルム、下から上へ送るイデアルの延長、およびGalois群の制限を区別します。最後に、それらと両立する類群の整合列全体に $\Lambda$ が作用することを具体的に証明します。

## 1. 三つの矢印を区別する

有限Galois数体拡大 $E/F$ と、そのGalois群 $G=\operatorname{Gal}(E/F)$ を考えます。$x\in E^\times$ の全ての共役を掛けると $F^\times$ の元ができます。この共役の積を次の定義で扱います。

<a id="def-iwa4-field-norm"></a>

<!-- formal-statement-start -->
> **定義（体のノルム）**  
> 有限Galois拡大 $E/F$、$G=\operatorname{Gal}(E/F)$ に対して、$x\in E^\times$ のノルムを

$$
N_{E/F}(x)=\prod_{\sigma\in G}\sigma(x)\in F^\times
$$

> で定める。積は $G$ の置換で不変なので $F$ に属する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa4-field-norm -->
**定義の確認**。 $E=\mathbb Q(i)$、$F=\mathbb Q$ とします。$G=\{1,c\}$、$c(a+bi)=a-bi$ だから

$$
N_{\mathbb Q(i)/\mathbb Q}(2+i)
=(2+i)(2-i)=5,\qquad
N_{\mathbb Q(i)/\mathbb Q}(i)=i(-i)=1.
$$

両値は $\mathbb Q^\times$ に入り、例えば $N(i(2+i))=1\cdot5$ です。ノルムが和を保つとは主張しません。
<!-- definition-example-end -->

実際の塔ではGalois群も下の層へ写りますが、こちらは共役を掛ける操作ではありません。$\tau\in\operatorname{Gal}(K_{n+1}/\mathbb Q)$ を部分体 $K_n$ に制限する写像

$$
\operatorname{res}_{n+1,n}(\tau)=\tau|_{K_n}\in\Gamma_n
$$

は群準同型です。[円分塔の制限列](../IWA2/index.md#prop-iwa2-cyclotomic-restriction)から全射であり、その核は位数 $p$ です。ここで **res はGalois自己同型の制限**であって、イデアル類のノルムではありません。

イデアルの向きも確認しましょう。$F$ の非零分数イデアル $\mathfrak a$ を $E$ に延ばした $\mathfrak a\mathcal O_E$ は上向きの矢印です。一方、$E$ の素イデアル $\mathfrak P$ の下には $\mathfrak p=\mathfrak P\cap\mathcal O_F$ があり、[剰余次数の定義](../../ANF/ANF4/index.md#def-anf4-ramification-residue)から

$$
f(\mathfrak P/\mathfrak p)=[\mathcal O_E/\mathfrak P:\mathcal O_F/\mathfrak p]
$$

が決まります。これを指数に使えば、イデアルのノルムが定義できます。

<a id="def-iwa4-ideal-norm-extension"></a>

<!-- formal-statement-start -->
> **定義（イデアルのノルムと延長）**  
> 有限Galois数体拡大 $E/F$ に対し、$E$ の非零分数イデアルの素イデアル分解 $\mathfrak A=\prod_{\mathfrak P}\mathfrak P^{a_{\mathfrak P}}$（指数は整数、零でないものは有限個）について

$$
N_{E/F}(\mathfrak A)
=\prod_{\mathfrak P}
(\mathfrak P\cap\mathcal O_F)^{f(\mathfrak P/\mathfrak p)a_{\mathfrak P}}
$$

> と定める。$F$ の非零分数イデアル $\mathfrak a$ の延長は $j_{E/F}(\mathfrak a)=\mathfrak a\mathcal O_E$ と定める。
<!-- formal-statement-end -->

[素イデアル分解の一意性](../../ANF/ANF3/index.md#thm-anf3-prime-ideal-factorization)によりこの式は分数イデアル上で一意に定まります。ノルムは指数を足す積に対して乗法的で、延長もイデアルの積を保ちます。

<!-- definition-example-start: def-iwa4-ideal-norm-extension -->
**定義の確認**。 $E=\mathbb Q(i)$、$F=\mathbb Q$ で $5=(2+i)(2-i)$ と因数分解できます。$(2+i)$ と $(2-i)$ は互いに異なる素イデアルで、その剰余体はどちらも $\mathbb F_5$ です。ゆえに各剰余次数は1で、

$$
N_{E/F}((2+i))=(5),\qquad
j_{E/F}((5))=(2+i)(2-i).
$$

一段上へ延ばしてからノルムを取れば $N_{E/F}(j((5)))=(5)^2=(25)$ となります。単に $(5)$ に戻るわけではありません。
<!-- definition-example-end -->

## 2. 主イデアルと類群に降りるか

ノルムを類群へ適用するには、主分数イデアルを主分数イデアルへ写す必要があります。[イデアル類群の定義](../../ANF/ANF6/index.md#def-anf6-ideal-class-group)では主分数イデアル同士の差を忘れるので、この確認を飛ばせません。

<a id="prop-iwa4-principal-compatibility"></a>

<!-- formal-statement-start -->
> **命題（主イデアルと次数の整合性）**  
> $E/F$ を次数 $d$ の有限Galois数体拡大とする。任意の $x\in E^\times$ と $F$ の非零分数イデアル $\mathfrak a$ について

$$
N_{E/F}((x))=(N_{E/F}(x)),\qquad
N_{E/F}(j_{E/F}(\mathfrak a))=\mathfrak a^d.
$$

> 従ってイデアルのノルムと延長はイデアル類群の準同型を誘導し、それらの合成は $[\mathfrak a]\mapsto[\mathfrak a]^d$ である。
<!-- formal-statement-end -->

### 証明の見取り図

一番目は素イデアルごとの指数を比較します。二番目では分岐指数 $e$ と剰余次数 $f$ の積の和が拡大次数に等しいことを使います。

<!-- proof-start -->
### 証明

$F$ の素イデアル $\mathfrak p$ とその上の素イデアル $\mathfrak P$ を一つ固定し、$e=e(\mathfrak P/\mathfrak p)$、$f=f(\mathfrak P/\mathfrak p)$ とします。$E/F$ はGaloisなので、$\mathfrak p$ の上の $g$ 個の素イデアルは $G$ によって推移的に置換され、$d=efg$ です（[次数公式](../../ANF/ANF4/index.md#thm-anf4-fundamental-identity)）。各素イデアルを固定する自己同型は $ef$ 個です。

$x$ の分数イデアル $(x)$ における $\mathfrak P'$ の指数を $v_{\mathfrak P'}(x)$ と書きます。$N(x)=\prod_{\sigma\in G}\sigma(x)$ の $\mathfrak P$ における指数は

$$
\begin{aligned}
v_{\mathfrak P}(N(x))
&=\sum_{\sigma\in G}v_{\mathfrak P}(\sigma(x))\\
&=\sum_{\sigma\in G}v_{\sigma^{-1}\mathfrak P}(x)\\
&=ef\sum_{\mathfrak P'\mid\mathfrak p}v_{\mathfrak P'}(x).
\end{aligned}
$$

一方 $N(x)\in F^\times$ なので $v_{\mathfrak P}(N(x))=e\,v_{\mathfrak p}(N(x))$ です。両式を比較して正整数 $e$ で割ると

$$
v_{\mathfrak p}(N(x))
=f\sum_{\mathfrak P'\mid\mathfrak p}v_{\mathfrak P'}(x),
$$

これは[イデアルのノルム](#def-iwa4-ideal-norm-extension)の $\mathfrak p$ の指数です。全素イデアルについて等しいから最初の等式が成立します。

次に $\mathfrak a=\mathfrak p$ の場合を調べます。$\mathfrak p\mathcal O_E=\prod_{\mathfrak P\mid\mathfrak p}\mathfrak P^e$ なので

$$
N_{E/F}(\mathfrak p\mathcal O_E)
=\mathfrak p^{\sum_{\mathfrak P\mid\mathfrak p}ef}
=\mathfrak p^d.
$$

任意の分数イデアルでは素イデアルごとの積と負の指数へ乗法的に拡張すればよいです。最後に、主イデアルの像は主イデアルなので、商群である類群に両準同型が降り、合成式も降ります。
<!-- proof-end -->

特に $d=p$ の一段では、下から延長して上からノルムを取ると $p$ 倍（加法記法）です。**逆向きの二つの写像を互いの逆写像とみなすのは誤り**です。

同じ拡大で上側のイデアル $\mathfrak A$ を先にノルムしてから延長すると、Galois共役の積になります。

<a id="prop-iwa4-conjugate-product"></a>

<!-- formal-statement-start -->
> **命題（延長後のノルムは共役の積）**  
> 有限Galois数体拡大 $E/F$ のGalois群を $G$ とする。$E$ の非零分数イデアル $\mathfrak A$ に対し

$$
j_{E/F}(N_{E/F}(\mathfrak A))
=\prod_{\sigma\in G}\sigma(\mathfrak A).
$$

> 同じ式はイデアル類群でも成立する。
<!-- formal-statement-end -->

### 証明の見取り図

素イデアル $\mathfrak P$ 一つについて、左辺と右辺の各共役素イデアルの指数を数えます。

<!-- proof-start -->
### 証明

$\mathfrak P$ が $\mathfrak p$ の上にあり、分岐指数 $e$、剰余次数 $f$ とします。左辺は

$$
j(N(\mathfrak P))=j(\mathfrak p^f)
=\prod_{\mathfrak Q\mid\mathfrak p}\mathfrak Q^{ef}.
$$

右辺では $G$ の作用が $\mathfrak p$ 上の $g$ 個の素イデアルを推移的に動かし、それぞれの素イデアルが $|\operatorname{Stab}_G(\mathfrak P)|=d/g=ef$ 回現れます。従って右辺も同じ積です。素イデアルの積・逆を取る操作へ延長すれば一般の $\mathfrak A$ に成立し、主イデアル類との両立性は[前命題](#prop-iwa4-principal-compatibility)から従います。
<!-- proof-end -->

## 3. 塔でノルムを合成する

$K_n$ における[有限イデアル類群](../../ANF/ANF6/index.md#thm-anf6-minkowski-class-bound)を $\mathrm{Cl}_n$ と書き、その中の位数が $p$ の冪となる元全体を $A_n=\mathrm{Cl}_n[p^\infty]$ とします。類群が有限Abel群なので $A_n$ は有限Abel $p$ 群です。

一段ノルム $N_{n+1,n}:A_{n+1}\to A_n$ は存在します。$p^r a=0$（加法記法）なら $p^r N(a)=N(p^r a)=0$ だから、確かに $p$ 部分群へ写ります。一方、拡大写像 $j_{n,n+1}$ は上向きです。

<a id="prop-iwa4-norm-transitivity"></a>

<!-- formal-statement-start -->
> **命題（ノルムの塔での合成とGalois作用）**  
> 有限Galois数体の塔 $F\subset E\subset L$ に対し、分数イデアルおよびイデアル類群上で

$$
N_{L/F}=N_{E/F}\circ N_{L/E}
$$

> が成り立つ。さらに $F/\mathbb Q$、$E/\mathbb Q$ がGaloisで $\sigma\in\operatorname{Gal}(E/\mathbb Q)$ の $F$ への制限を $\bar\sigma$ とすると、

$$
N_{E/F}(\sigma a)=\bar\sigma N_{E/F}(a)
$$

> がイデアル類 $a\in\mathrm{Cl}(E)$ に対して成立する。
<!-- formal-statement-end -->

### 証明の見取り図

合成則は素イデアルの剰余次数が塔で掛け算になることから確かめます。共変性は素イデアルの下への縮約と自己同型の作用が交換するためです。

<!-- proof-start -->
### 証明

$L$ の素イデアル $\mathfrak R$ の縮約を $E$ で $\mathfrak P$、$F$ で $\mathfrak p$ とします。剰余体の塔から

$$
f(\mathfrak R/\mathfrak p)
=f(\mathfrak R/\mathfrak P)f(\mathfrak P/\mathfrak p).
$$

従って[イデアルのノルム](#def-iwa4-ideal-norm-extension)を二度適用すると

$$
N_{E/F}(N_{L/E}(\mathfrak R))
=N_{E/F}(\mathfrak P^{f(\mathfrak R/\mathfrak P)})
=\mathfrak p^{f(\mathfrak R/\mathfrak P)f(\mathfrak P/\mathfrak p)}
=N_{L/F}(\mathfrak R).
$$

素イデアル分解による乗法性から全分数イデアルへ広がります。主イデアルを主イデアルへ送るので、類群でも成立します。

共変性は $\sigma(\mathfrak P)\cap\mathcal O_F=\bar\sigma(\mathfrak p)$ と、$\sigma$ が剰余体の同型を与えるため $f(\sigma\mathfrak P/\bar\sigma\mathfrak p)=f(\mathfrak P/\mathfrak p)$ となることから、素イデアルについて

$$
N_{E/F}(\sigma\mathfrak P)
=(\bar\sigma\mathfrak p)^f
=\bar\sigma N_{E/F}(\mathfrak P).
$$

再び積と商へ延長し、類群に降ろせます。
<!-- proof-end -->

この二式が後に整合列を作るための鍵です。特に、全ての $m\ge n$ について $N_{m,n}$ が定まり、

$$
N_{\ell,n}=N_{m,n}\circ N_{\ell,m}\quad(\ell\ge m\ge n)
$$

という一貫した遷移写像になります。

## 4. 局所単数もノルムで結ぶ

数体の整数環の単数とは別に、有限次 $p$ 進局所体 $L/\mathbb Q_p$ の整数環 $\mathcal O_L$ と極大イデアル $\mathfrak m_L$ について、[ANF12の局所単数の階層](../../ANF/ANF12/index.md#def-anf12-unit-filtration)を使います。$\mathcal O_L^\times$ は付値0の元の群、$U_L^1=1+\mathfrak m_L$ は剰余体で1となる単数の群です。有限局所Galois拡大では体ノルムが単数を単数へ送り、主単数も主単数へ送ります。

その確かめ方は、$u\in\mathcal O_L^\times$ なら各共役 $\sigma(u)$ も単数で、積も単数となることです。また $u\in1+\mathfrak m_L$ なら全ての共役は剰余体で1に一致しますから、積は下の体の整数環でも剰余1となります。

<a id="def-iwa4-local-unit-system"></a>

<!-- formal-statement-start -->
> **定義（局所単数のノルム系）**  
> $p$ を奇素数、$n\ge0$ とし、局所体を次で指定する。

$$
L_n=\mathbb Q_p(\zeta_{p^{n+1}}).
$$

> $\mathfrak m_n$ を $\mathcal O_{L_n}$ の極大イデアルとする。主単数群と遷移写像を

$$
U_n^1=1+\mathfrak m_n,\qquad
N_{n+1,n}:U_{n+1}^1\longrightarrow U_n^1
$$

> と定める。ここで $N_{n+1,n}$ は体のノルム $N_{L_{n+1}/L_n}$ を主単数群へ制限した写像である。この群と写像の列を局所主単数のノルム系とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa4-local-unit-system -->
**定義の確認**。 $\zeta_{p^{n+1}}$ は剰余体で1となるので $U_n^1$ に入ります。$L_{n+1}/L_n$ の位数 $p$ の自己同型は $\zeta=\zeta_{p^{n+2}}$ を $\zeta^{1+kp^{n+1}}$（$0\le k<p$）へ送ります。従って奇素数 $p$ では

$$
\begin{aligned}
N_{L_{n+1}/L_n}(\zeta)
&=\prod_{k=0}^{p-1}\zeta^{1+kp^{n+1}}\\
&=\zeta^{p+p^{n+1}p(p-1)/2}\\
&=\zeta^p=\zeta_{p^{n+1}}.
\end{aligned}
$$

第三式では $p(p-1)/2$ が $p$ の倍数であることを使いました。よって $(\zeta_{p^{n+1}})_n$ は実際にノルム整合的な主単数の列です。
<!-- definition-example-end -->

ここで $L_n$ は局所体の**全円分塔**であり、前節の $K_n$（$\Delta$ を除いた大域の $\mathbb Z_p$ 塔）と同一視してはいけません。上の具体計算は奇素数の場合だけを扱います。$p=2$ では同じ指数計算に符号が残るため、そのまま転用できません。

[ANF12の非分岐ノルム定理](../../ANF/ANF12/index.md#thm-anf12-unramified-norm)は非分岐拡大の単元ノルムの全射性を述べますが、今の円分局所塔は分岐しているので、その定理を使って全射性を結論してはいけません。**ノルムで結べること**と**ノルムが全射であること**は別の性質です。

## 5. 整合列を極限にまとめる

$x_n\in A_n$ を各層で勝手に選んでも、無限塔の元にはなりません。下の層で一致するという条件を加える必要があります。

<a id="def-iwa4-inverse-limit"></a>

<!-- formal-statement-start -->
> **定義（逆極限）**  
> 群 $B_n$（$n\ge0$）と群準同型 $q_{n+1,n}:B_{n+1}\to B_n$ の列に対し、逆極限を

$$
\varprojlim_n B_n
=\left\{(b_n)_{n\ge0}\in\prod_{n\ge0}B_n:
q_{n+1,n}(b_{n+1})=b_n\ \text{for all }n\right\}
$$

> と定義する。群演算は成分ごとに行い、射影を $\pi_n((b_j)_j)=b_n$ とする。位相群を扱う場合は積位相からの部分空間位相を入れる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa4-inverse-limit -->
**定義の確認**。 $B_n=\mathbb Z/p^{n+1}\mathbb Z$、$q_{n+1,n}$ を自然な還元とします。整数 $10$ の剰余類を各段に並べた $(10\bmod p^{n+1})_n$ は還元後に一致するので逆極限の元です。一方 $p=3$ のとき $b_0=1\bmod3$ と $b_1=2\bmod9$ は、$2\bmod3\ne1\bmod3$ なので整合的でありません。[IWA1の $p$ 進整数の有限商](../IWA1/index.md#prop-iwa1-residue-quotients)から、この逆極限は $\mathbb Z_p$ になります。
<!-- definition-example-end -->

逆極限の構成は集合としての式だけでなく、写像を一意に作れるという性質を持ちます。

<a id="thm-iwa4-inverse-limit-universal"></a>

<!-- formal-statement-start -->
> **定理（逆極限の普遍性）**  
> 群の逆系 $(B_n,q_{n+1,n})$ と任意の群 $H$ を取る。準同型 $f_n:H\to B_n$ が全ての $n$ で $q_{n+1,n}\circ f_{n+1}=f_n$ を満たすなら、各射影との合成が $f_n$ になる唯一の群準同型

$$
f:H\longrightarrow\varprojlim_n B_n
$$

> がある。各群を位相群として $f_n$ が連続なら、$f$ も連続である。
<!-- formal-statement-end -->

### 証明の見取り図

候補は $h$ を成分列 $(f_n(h))_n$ に送るものしかありません。その列が整合条件を満たすこと、写像が連続であることを積の座標で確認します。

<!-- proof-start -->
### 証明

各 $h\in H$ に対し $f(h)=(f_n(h))_{n\ge0}$ と置きます。仮定から

$$
q_{n+1,n}(f_{n+1}(h))=f_n(h)
$$

ですから、この列は逆極限に属します。各 $f_n$ が準同型なので

$$
f(hh')=(f_n(h)f_n(h'))_n=f(h)f(h')
$$

となり、$f$ は準同型です。$g:H\to\varprojlim B_n$ が $\pi_n g=f_n$ を全ての $n$ で満たせば、$g(h)$ の第 $n$ 成分は必ず $f_n(h)$ です。したがって $g=f$ で一意です。

位相については、積位相の写像 $H\to\prod B_n$ が連続となる必要十分条件が各座標写像 $f_n$ の連続性です。その像は逆極限の部分集合に入るため、部分空間位相による $f$ も連続になります。
<!-- proof-end -->

**全射性は仮定していません。** 例えば $B_n=\mathbb Z/p^{n+1}\mathbb Z$ に遷移写像 $q_{n+1,n}(x)=p x\bmod p^{n+1}$ を入れても逆系です。このとき整合列は

$$
b_n=p^k b_{n+k}\bmod p^{n+1}
$$

を全 $k$ で満たし、$k=n+1$ とすれば $b_n=0$ です。よって逆極限は零群です。先ほどの還元系の逆極限 $\mathbb Z_p$ とは全く違います。遷移写像の選択が本質的です。

## 6. 類群の逆極限に岩澤代数が作用する

本講で主役にする対象を

$$
X=\varprojlim_n(A_n,N_{n+1,n}),\qquad
A_n=\mathrm{Cl}(K_n)[p^\infty]
$$

と置きます。各 $A_n$ は有限群であり、積の離散位相から $X$ に部分空間位相を入れれば $X$ はコンパクトHausdorffな位相Abel群です。有限離散群の積はコンパクトであり、整合条件は閉条件だからです。射影 $X\to A_n$ が全射とは限りません。

$\Gamma_n=\operatorname{Gal}(K_n/\mathbb Q)$ は、イデアルを $\mathfrak A\mapsto\sigma\mathfrak A$ と送ることで $A_n$ に作用します。主イデアルも主イデアルへ移るので類群の作用になります。さらに $A_n$ は有限 $p$ 群なので、ある $m$ で $p^m A_n=0$ です。従って、$\Gamma_n$ の作用を係数ごとに足せば有限群環 $(\mathbb Z/p^m\mathbb Z)[\Gamma_n]$ が $A_n$ に作用します。

<a id="thm-iwa4-iwasawa-action"></a>

<!-- formal-statement-start -->
> **定理（類群の逆極限への岩澤代数作用）**  
> $K_n/\mathbb Q$ を[IWA2の円分 $\mathbb Z_p$ 塔](../IWA2/index.md#thm-iwa2-compatible-tower)とし、$A_n=\mathrm{Cl}(K_n)[p^\infty]$、$X=\varprojlim_n(A_n,N_{n+1,n})$ とする。このとき $X$ に連続な $\Lambda=\mathbb Z_p[[\Gamma]]$ 加群構造が一意に定まり、各 $x=(x_n)_n$ と $\lambda\in\Lambda$ の第 $n$ 成分は、十分大きい $m$ について

$$
(\lambda x)_n=\lambda_{m,n}\,x_n
$$

> で与えられる。ここで $\lambda_{m,n}$ は $\lambda$ の $(\mathbb Z/p^m\mathbb Z)[\Gamma_n]$ への像である。
<!-- formal-statement-end -->

### 証明の見取り図

有限段の群環作用を定義し、係数の法 $p^m$ の選択によらないことを確かめます。次にノルムとGalois作用の可換性を使って、結果の列が整合的であることを証明します。

<!-- proof-start -->
### 証明

固定した $n$ では $A_n$ が有限 $p$ 群なので $p^{e_n}A_n=0$ となる整数 $e_n\ge1$ が存在します。$m\ge e_n$ を選び、$\lambda_{m,n}=\sum_{\sigma\in\Gamma_n}a_\sigma[\sigma]$ と書くと

$$
\lambda_{m,n}x_n
=\sum_{\sigma\in\Gamma_n}a_\sigma(\sigma x_n)
$$

が定義できます。$m$ を大きくすると $a_\sigma$ は法 $p^m$ の持ち上げに変わるだけで、$p^{e_n}A_n=0$ だから結果は変わりません。従って式は $m$ の選び方によらず定義されます。

次に $n+1$ と $n$ を比較します。$m$ を両方の指数 $e_{n+1},e_n$ 以上に選んでおきます。[ノルムのGalois共変性](#prop-iwa4-norm-transitivity)より各 $\sigma\in\Gamma_{n+1}$ に対し

$$
N_{n+1,n}(\sigma x_{n+1})
=\operatorname{res}_{n+1,n}(\sigma)\,N_{n+1,n}(x_{n+1}).
$$

この等式を係数 $a_\sigma$ で線形結合します。[有限群環の遷移写像](../IWA3/index.md#def-iwa3-completed-group-ring)は同じ $\operatorname{res}$ を使うので

$$
\begin{aligned}
N_{n+1,n}(\lambda_{m,n+1}x_{n+1})
&=\operatorname{res}_{*}(\lambda_{m,n+1})\,N_{n+1,n}(x_{n+1})\\
&=\lambda_{m,n}x_n.
\end{aligned}
$$

したがって $(\lambda_{m,n}x_n)_n$ は逆極限に属します。各有限段の群環の加法・積の作用は、$\lambda$ の加法・積と両立するため、$X$ 上でも加群公理を満たします。

最後に第 $n$ 成分の作用は有限群環への射影 $\Lambda\to(\mathbb Z/p^{e_n}\mathbb Z)[\Gamma_n]$ と $X\to A_n$ のみで決まります。両者が連続で有限群上の作用も連続だから、各成分写像 $\Lambda\times X\to A_n$ は連続です。積の位相の特徴付けにより $\Lambda\times X\to X$ も連続です。各成分を指定する式から一意性も従います。
<!-- proof-end -->

ここで**有限生成性やtorsion性は結論していません**。$X$ が $\Lambda$ 加群になることと、その構造が有限生成であることは別問題です。次講で扱う不変量や擬同型は、必要な有限生成性などを確認してから使用します。

## 7. 演習：写像の向きと整合性を再計算する

### A1. 体ノルムは乗法的

$E=\mathbb Q(i)$、$F=\mathbb Q$ とする。$x=1+2i$、$y=1-i$ について $N(x)$、$N(y)$、$N(xy)$ を求め、$N(xy)=N(x)N(y)$ を確認せよ。

- Level: A
- ID: IWA4-A1

<!-- solution-start -->
**詳細解答。** 複素共役を $c$ とすれば $N(z)=zc(z)$ です。従って

$$
N(x)=(1+2i)(1-2i)=5,\quad N(y)=(1-i)(1+i)=2.
$$

積は $xy=(1+2i)(1-i)=3+i$ なので $N(xy)=(3+i)(3-i)=10=5\cdot2$ です。乗法性は $c(xy)=c(x)c(y)$ から一般にも成り立ちます。
<!-- solution-end -->

### A2. イデアルの上向きと下向き

$\mathbb Z[i]/\mathbb Z$ で $(5)=(2+i)(2-i)$ を用い、$j((5))$、$N((2+i))$、$N(j((5)))$ を求めよ。

- Level: A
- ID: IWA4-A2

<!-- solution-start -->
**詳細解答。** 素イデアル $(2+i)$ と $(2-i)$ はそれぞれ指数1、剰余次数1を持ちます。従って延長の定義から $j((5))=(2+i)(2-i)$、ノルムの定義から $N((2+i))=(5)$ です。乗法性を使えば

$$
N(j((5)))=N((2+i))N((2-i))=(5)(5)=(25).
$$

拡大次数が2なので、これは[次数公式](#prop-iwa4-principal-compatibility)の $(5)^2$ と一致します。
<!-- solution-end -->

### A3. 整合する剰余類

$B_n=\mathbb Z/3^{n+1}\mathbb Z$ に還元写像を入れる。$10$ の定める最初の3成分を書け。また $(b_0,b_1)=(1\bmod3,5\bmod9)$ が延長可能か判定せよ。

- Level: A
- ID: IWA4-A3

<!-- solution-start -->
**詳細解答。** $10\bmod3=1$、$10\bmod9=1$、$10\bmod27=10$ なので最初は $(1,1,10)$ です。$10\bmod9=1$ かつ $10\bmod3=1$ で、還元条件を満たします。一方、$5\bmod3=2$ で $b_0=1$ と異なるので後者は最初の二段で整合条件に違反し、どのような高段成分を選んでも延長できません。
<!-- solution-end -->

### A4. 円分局所単数のノルム

$p=3$ とし $L_0=\mathbb Q_3(\zeta_3)$、$L_1=\mathbb Q_3(\zeta_9)$ とする。$L_1/L_0$ の自己同型を列挙し、$N_{L_1/L_0}(\zeta_9)$ を求めよ。

- Level: A
- ID: IWA4-A4

<!-- solution-start -->
**詳細解答。** $\zeta_9\mapsto\zeta_9^a$ のうち $\zeta_3=\zeta_9^3$ を固定するのは $a\equiv1\pmod3$ で、$a=1,4,7$（法9）です。よって

$$
N(\zeta_9)=\zeta_9\zeta_9^4\zeta_9^7
=\zeta_9^{12}=\zeta_9^3=\zeta_3.
$$

両方とも各局所体で剰余1となる単数です。[局所単数系の例](#def-iwa4-local-unit-system)を数値で再現しました。
<!-- solution-end -->

### A5. p 部分群への制限

有限Abel群 $C$ の元 $a$ が $p^r a=0$ を満たすとする。準同型 $f:C\to D$ の像 $f(a)$ も $p$ 冪位数であると示せ。さらに $p=3$、$C=\mathbb Z/18\mathbb Z$ の $3$ 部分群を求めよ。

- Level: A
- ID: IWA4-A5

<!-- solution-start -->
**詳細解答。** $p^r f(a)=f(p^r a)=f(0)=0$ なので $f(a)$ の位数は $p^r$ を割ります。$C=\mathbb Z/18$ の位数が3の冪となる元は $0,2,4,6,8,10,12,14,16$（法18）です。これは偶数剰余の部分群 $\langle2\rangle\simeq\mathbb Z/9$ です。
<!-- solution-end -->

### B1. 延長とノルムの合成

有限Galois数体拡大 $E/F$ の次数を $d$ とする。$F$ の素イデアル $\mathfrak p$ が $E$ で $\mathfrak p\mathcal O_E=\prod_{i=1}^g\mathfrak P_i^e$ と分解し、剰余次数が全て $f$ であるとする。$N(j(\mathfrak p))=\mathfrak p^d$ を導け。

- Level: B
- ID: IWA4-B1

<!-- solution-start -->
**詳細解答。** ノルムの定義から各 $\mathfrak P_i^e$ は $\mathfrak p^{ef}$ に移ります。従って

$$
N(j(\mathfrak p))=\prod_{i=1}^g\mathfrak p^{ef}
=\mathfrak p^{efg}.
$$

[分岐・剰余次数の次数公式](../../ANF/ANF4/index.md#thm-anf4-fundamental-identity)で $efg=[E:F]=d$ だから結論が出ます。主イデアルに限らない計算です。
<!-- solution-end -->

### B2. ノルムと共役作用

$E/F$ を有限Abel数体拡大とし、$\sigma\in\operatorname{Gal}(E/F)$ とする。$\mathfrak P$ の下の素イデアルを $\mathfrak p$、剰余次数を $f$ として、$N(\sigma\mathfrak P)=N(\mathfrak P)$ を示せ。また $j(N(\mathfrak P))=\prod_\tau\tau\mathfrak P$ を分岐指数で説明せよ。

- Level: B
- ID: IWA4-B2

<!-- solution-start -->
**詳細解答。** $\sigma$ は $F$ を固定するので $\sigma\mathfrak P$ の縮約も $\mathfrak p$ です。剰余体を同型に移すので剰余次数も $f$ です。従って $N(\sigma\mathfrak P)=\mathfrak p^f=N(\mathfrak P)$ となります。下へのノルムを上へ戻したものは

$$
j(N(\mathfrak P))=j(\mathfrak p^f)
=\prod_{\mathfrak Q\mid\mathfrak p}\mathfrak Q^{ef}.
$$

Galois群の作用は $\mathfrak p$ 上の素イデアルを推移的に置換し、各 $\mathfrak Q$ が $ef$ 回現れるので、右辺は $\prod_\tau\tau\mathfrak P$ と一致します。これは[共役積の命題](#prop-iwa4-conjugate-product)の直接確認です。
<!-- solution-end -->

### B3. 遷移写像を変えると極限が変わる

$B_n=\mathbb Z/2^{n+1}\mathbb Z$ について、(i) 還元を遷移写像とする系、(ii) $q_{n+1,n}(x)=2x\bmod2^{n+1}$ とする系を比較し、後者の逆極限が零群であることを示せ。

- Level: B
- ID: IWA4-B3

<!-- solution-start -->
**詳細解答。** (i) は [p進整数の逆極限表示](../IWA1/index.md#prop-iwa1-residue-quotients)により $\mathbb Z_2$ です。例えば $(1\bmod2^{n+1})_n$ は非零の整合列です。(ii) では整合条件を $k$ 回使えば

$$
b_n=2^k b_{n+k}\bmod 2^{n+1}.
$$

$k=n+1$ と選ぶと右辺は法 $2^{n+1}$ で0です。全 $n$ で $b_n=0$ なので逆極限は零群のみです。どちらも各段の群は同じであり、差は遷移写像です。
<!-- solution-end -->

### B4. 普遍性による写像の構成

群 $H=\mathbb Z$ から $B_n=\mathbb Z/5^{n+1}\mathbb Z$ への還元 $f_n$ を考える。これらが定める $f:\mathbb Z\to\varprojlim B_n$ を構成し、像が稠密であることを示せ。

- Level: B
- ID: IWA4-B4

<!-- solution-start -->
**詳細解答。** 還元は $q_{n+1,n}\circ f_{n+1}=f_n$ を満たすので、[普遍性](#thm-iwa4-inverse-limit-universal)から

$$
f(k)=(k\bmod5^{n+1})_{n\ge0}
$$

が唯一の写像です。稠密性は逆極限の基本開集合で調べます。整合列 $b$ の第 $0,\ldots,N$ 成分を固定した近傍は、第 $N$ 成分 $b_N$ を代表する整数 $k$ を取れば $f(k)$ を含みます。従って全ての基本開近傍が $f(\mathbb Z)$ と交わり、像は稠密です。
<!-- solution-end -->

### C1. 形式的な岩澤加群を自分で組み立てる

$\Gamma_n\simeq\mathbb Z/p^n\mathbb Z$ が $B_n=\mathbb Z/p^{n+1}\mathbb Z$ に自明に作用するとし、$B_{n+1}\to B_n$ は還元とする。(i) $X=\varprojlim B_n$ を求めよ。(ii) $N$ のGalois共変性に相当する条件を確認せよ。(iii) $\Lambda\simeq\mathbb Z_p[[T]]$ が $X$ にどう作用するか求めよ。(iv) $T$ の作用が零である理由と、この例だけから一般の類群逆極限に同じ性質を主張できない理由を述べよ。

- Level: C
- ID: IWA4-C1

<!-- solution-start -->
**詳細解答。** (i) 還元による整合列全体なので $X\simeq\mathbb Z_p$ です。[逆極限の定義](#def-iwa4-inverse-limit)で各座標を計算すると、$a\in\mathbb Z_p$ に $(a\bmod p^{n+1})_n$ が対応します。

(ii) $\sigma\in\Gamma_{n+1}$、$b\in B_{n+1}$ とすると作用が自明なので $\sigma b=b$ です。従って

$$
q_{n+1,n}(\sigma b)=q_{n+1,n}(b)
=\bar\sigma\,q_{n+1,n}(b).
$$

(iii) [岩澤代数の冪級数表示](../IWA3/index.md#thm-iwa3-power-series-isomorphism)で $\gamma\mapsto1+T$ です。$\gamma$ は全ての $B_n$ に自明に作用するので $T=\gamma-1$ は零として作用します。よって $f(T)=\sum_{r\ge0}a_rT^r$ はその定数項 $a_0$ による $\mathbb Z_p$ の乗法として作用します。

(iv) この系では $\Gamma_n$ の作用を最初から自明と指定しました。一方、実際のイデアル類群の $\Gamma_n$ 作用は、素イデアル類をその共役へ動かし得ます。[類群の岩澤作用定理](#thm-iwa4-iwasawa-action)は作用の存在を証明するだけで、$\gamma-1$ の作用が零とは主張しません。この違いを忘れると次講の $\Lambda$ 加群構造を誤解します。
<!-- solution-end -->

## 8. 次講への問い

逆極限 $X$ はノルムで整合した有限層の類群情報を保持し、$\Lambda$ が連続に作用することまで証明できました。次の IWA5 では、こうした $\Lambda$ 加群をどの条件の下で有限生成torsion加群として調べられるのか、擬同型と有限部分の違いを学びます。
