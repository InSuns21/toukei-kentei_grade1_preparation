# IWA12 控制定理（control）の原型

[IWA11の局所／大域単数の完全列](../IWA11/index.md#thm-iwa11-local-global-exact)は、**一つの数体**で局所単数・大域単数・類群の関係を記述しました。[ノルムと局所化の可換性](../IWA11/index.md#prop-iwa11-norm-localization)により、塔の隣り合う層でも対応する矢印を作れます。しかし、各層で完全列があっても、無限層の加群を有限層に戻す操作で同じ群が得られるとは限りません。

本講の中心問いは、**逆極限から作った無限層の加群を coinvariants で下ろしたとき、有限層との差はどこに現れ、いつ一様に小さく抑えられるか**です。まず任意の有限アーベル $p$ 群の塔で比較写像とその核・余核を自力で証明します。次に完全一致・有限誤差・失敗の例を計算し、最後に類群の塔で追加すべき算術的仮定を明確にします。

本講の定理は**抽象的な control の原型**です。すべての数体の類群に対する一様な control を仮定なしで主張するものではありません。

## 1. 無限層を有限層に戻す二通りの方法

奇素数 $p$、位相的巡回群 $\Gamma\simeq\mathbb Z_p$ と位相的生成元 $\gamma$ を固定します。[岩澤代数の冪級数表示](../IWA3/index.md#thm-iwa3-power-series-isomorphism)により

$$
\Lambda=\mathbb Z_p[[\Gamma]]\simeq\mathbb Z_p[[T]],
\qquad T=\gamma-1
$$

です。また [有限層作用素とcoinvariants](../IWA7/index.md#def-iwa7-layer-quotient)を使い

$$
\Gamma_n=\overline{\langle\gamma^{p^n}\rangle},
\qquad \omega_n=(1+T)^{p^n}-1=\gamma^{p^n}-1,
\qquad M_{\Gamma_n}=M/\omega_nM
$$

と置きます。添字 $n$ は $0$ から始まり、$\Gamma/\Gamma_n$ の位数は $p^n$ です。

各 $n$ に有限アーベル $p$ 群 $A_n$ があり、$m\ge n$ に対し遷移準同型 $N_{m,n}:A_m\to A_n$ があって $N_{\ell,n}=N_{m,n}N_{\ell,m}$ を満たすとします。各 $A_n$ は $\Gamma/\Gamma_n$ の作用を持ち、$N_{m,n}$ は $\Gamma$ 作用と可換であると仮定します。すなわち $\Gamma_n$ は **$A_n$ には自明に作用**します。

[逆極限の定義](../IWA4/index.md#def-iwa4-inverse-limit)に従って

$$
X=\varprojlim_n A_n
=\{(a_n)_n:N_{n+1,n}(a_{n+1})=a_n\}
$$

と置きます。$\Gamma$ は各成分へ作用するので $X$ にも連続に作用し、$X$ はコンパクトな $\Lambda$ 加群です。射影 $\pi_n:X\to A_n$ は第 $n$ 成分を取る写像です。

ここには「$X$ の $\Gamma_n$ 作用の差を消す」操作 $X/\omega_nX$ と、「もともと第 $n$ 層にあった群を読む」操作 $A_n$ の二つがあります。前者と後者を比べる自然な写像があることから始めます。

<a id="def-iwa12-control-map"></a>

<!-- formal-statement-start -->
> **定義（有限層への比較写像）**  
> 上の有限アーベル $p$ 群の逆系 $(A_n,N_{m,n})$ と $\Gamma/\Gamma_n$ 作用に対し、射影 $\pi_n:X\to A_n$ が誘導する写像を
>
$$
c_n:X_{\Gamma_n}=X/\omega_nX\longrightarrow A_n,
\qquad x+\omega_nX\longmapsto\pi_n(x)
$$
>
> と定め、**比較写像**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa12-control-map -->
**定義の確認。** 全層で $A_n=\mathbb Z/3\mathbb Z$、遷移写像は恒等写像、$\Gamma$ は自明に作用するとします。整合列は $(a,a,\ldots)$ の形なので $X=\mathbb Z/3\mathbb Z$ です。$\omega_nX=0$、$\pi_n(a)=a$ ですから $c_n$ はすべての $n$ で恒等写像です。定義が単に記号を並べたものではなく、各層に戻す具体的な写像になっていると確かめられます。
<!-- definition-example-end -->

比較写像が定義できる理由も計算で確かめます。$a_n\in A_n$ には $\gamma^{p^n}$ が自明に作用するため、

$$
\pi_n(\omega_n x)
=(\gamma^{p^n}-1)\pi_n(x)=0
$$

です。つまり $\omega_nX\subseteq\ker\pi_n$ であり、代表元を $x+\omega_n y$ に取り替えても値が変わりません。

## 2. 核と余核はどこから生じるか

$\pi_n$ の核を $K_n=\ker\pi_n$、像を $I_n=\operatorname{im}\pi_n$ と書きます。$K_n$ は「第 $n$ 層では見えない整合列」、$\omega_nX$ は「$\Gamma_n$ の作用差で説明できる整合列」です。両者が等しければ比較写像は単射になります。

<a id="thm-iwa12-comparison-exact"></a>

<!-- formal-statement-start -->
> **定理（比較写像の核・余核の完全列）**  
> 第1節の仮定の下、任意の $n\ge0$ について次のアーベル群の列は完全である。
>
$$
0\longrightarrow K_n/\omega_nX
\longrightarrow X/\omega_nX
\xrightarrow{\ c_n\ } A_n
\longrightarrow A_n/I_n
\longrightarrow0.
$$
>
> 特に $c_n$ が同型となる必要十分条件は $K_n=\omega_nX$ かつ $I_n=A_n$ である。
<!-- formal-statement-end -->

### 証明の見取り図

[第1節の定義](#def-iwa12-control-map)で $\omega_nX\subseteq K_n$ を確認済みです。商群の元が $c_n$ で零になる条件を直接調べ、最後に余核を射影の像で割って求めます。

<!-- proof-start -->
### 証明

$\omega_nX\subseteq K_n$ より包含写像 $K_n\hookrightarrow X$ は $\overline\iota:K_n/\omega_nX\to X/\omega_nX$ を誘導します。もし $k+\omega_nX$ が零なら $k\in\omega_nX$ ですから $\overline\iota$ は単射です。

$x+\omega_nX$ が $\ker c_n$ に入ることは、定義から $\pi_n(x)=0$、つまり $x\in K_n$ と同値です。ゆえに

$$
\ker c_n=\{x+\omega_nX:x\in K_n\}
=\operatorname{im}\overline\iota.
$$

一方、$\operatorname{im}c_n=\operatorname{im}\pi_n=I_n$ です。自然な商写像 $A_n\to A_n/I_n$ は全射で核が $I_n$ なので右側でも完全です。従って表示した列の全ての場所で、前の写像で得られる元全体が次の写像で零になる元全体と一致します。$c_n$ が単射である条件は $K_n/\omega_nX=0$、全射である条件は $A_n/I_n=0$ であり、同型条件が従います。
<!-- proof-end -->

**どちらの障害も分けて見ること。** $K_n/\omega_nX$ は、無限層の情報が有限層で余分に消える **核の誤差** です。$A_n/I_n$ は、上層から整合的に降りて来られない有限層の元を表す **余核の誤差** です。これらを混同すると、「ノルムが全射だから control が成立する」という誤推論につながります。

## 3. 余核を有限層だけから計算する

第 $n$ 層の元が上層へ持ち上がるかどうかを調べるには、各 $m\ge n$ に対する $\operatorname{im}N_{m,n}$ を比較します。像は $m$ が増すほど小さくなりますが $A_n$ は有限なので、十分上の層では一定になります。

<a id="def-iwa12-stable-image"></a>

<!-- formal-statement-start -->
> **定義（上層からの安定像）**  
> 有限アーベル群の逆系 $(A_n,N_{m,n})$ に対し、
>
$$
J_n=\bigcap_{m\ge n}\operatorname{im}(N_{m,n}:A_m\to A_n)
$$
>
> を第 $n$ 層の **安定像** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa12-stable-image -->
**定義の確認。** $A_0=(\mathbb Z/3\mathbb Z)^2$、$A_m=\mathbb Z/3^m\mathbb Z$（$m\ge1$）とし、$N_{1,0}(a)=(a\bmod3,0)$、その上の写像を還元とします。$m\ge1$ からの像はすべて $\{(a,0):a\in\mathbb Z/3\mathbb Z\}$ です。従って $J_0$ はこの位数3の部分群で、$A_0$ 全体（位数9）ではありません。
<!-- definition-example-end -->

<a id="prop-iwa12-stable-image"></a>

<!-- formal-statement-start -->
> **命題（射影の像と安定像）**  
> 第1節の有限群逆系では、すべての $n\ge0$ について $I_n=J_n$ が成り立つ。従ってすべての遷移写像 $N_{n+1,n}$ が全射なら $c_n$ も全射である。
<!-- formal-statement-end -->

### 証明の見取り図

整合列はどの上層からも降ろせるので $I_n\subseteq J_n$ です。逆に安定像の一つの元を固定し、それを与える全上層の候補から**両立する候補**を選びます。有限性がここで効きます。

<!-- proof-start -->
### 証明

$x=(a_m)_m\in X$ なら $a_n=N_{m,n}(a_m)$（$m\ge n$）なので、$\pi_n(x)=a_n$ はすべての $N_{m,n}$ の像に入ります。よって $I_n\subseteq J_n$。

逆に $a\in J_n$ を取ります。各 $m\ge n$ で $N_{m,n}(b_m)=a$ を満たす候補の集合

$$
B_m(a)=\{b\in A_m:N_{m,n}(b)=a\}
$$

は有限かつ非空です。$m>n$ の候補は下位層へ射影できますが、**候補を任意に選ぶと整合しない**ので注意します。任意の上限 $r\ge n$ に対して、$b_r\in B_r(a)$ を一つ選び、$b_m=N_{r,m}(b_r)$（$n\le m\le r$）と置けば、長さ $r$ までの整合族が作れます。

各 $B_m(a)$ は有限離散集合なのでコンパクトです。整合条件 $N_{m+1,m}(b_{m+1})=b_m$ は等式で指定された閉条件です。上の構成から任意有限個の条件は同時に満たせるため、有限交叉性によって全ての条件を満たす $(b_m)_{m\ge n}$ が存在します。下位層 $m<n$ は $N_{n,m}(a)$ で補えば $X$ の元となり、$\pi_n(x)=a$ です。ゆえに $J_n\subseteq I_n$。

すべての隣接遷移が全射なら $N_{m,n}$ も全射なので $J_n=A_n$、従って $c_n$ も全射です。
<!-- proof-end -->

無限層から有限層への **全射性** はこの命題で確保できます。しかし [比較完全列](#thm-iwa12-comparison-exact)の左端 $K_n/\omega_nX$ を零または有限にする議論は、まだ残っています。

## 4. 一様有界という control の中身

本講でいう**一様有界なcontrol**とは、「有限層ごとに誤差が有限」という弱い条件ではなく、$n$ に依存しない一つの定数で誤差を抑えることです。核の有限性と余核の有限性を別々に要求します。

<a id="def-iwa12-uniform-control"></a>

<!-- formal-statement-start -->
> **定義（一様有界なcontrol）**  
> 第1節の逆系について、比較写像 $c_n:X_{\Gamma_n}\to A_n$ が **一様有界な control** を満たすとは、ある定数 $B\ge1$ が存在してすべての $n\ge0$ で $\ker c_n$ と $\operatorname{coker}c_n$ が有限、かつ
>
$$
|\ker c_n|\le B,\qquad
|\operatorname{coker}c_n|\le B
$$
>
> が成り立つことをいう。両者がすべて零なら **完全 control**（$c_n$ は全層で同型）という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa12-uniform-control -->
**定義の確認。** 第1節の $A_n=\mathbb Z/3\mathbb Z$、遷移・$\Gamma$ 作用が恒等の例では $c_n$ は恒等写像で、全層で核・余核は零です。従って $B=1$ で一様有界であり、さらに完全 control です。「群の位数が一定」という事実だけでなく、写像の核・余核を計算したことが判定の根拠です。
<!-- definition-example-end -->

核を直接計算する代わりに、**すべての層で同じ有限部分群が誤差を覆う**と示せる場合があります。以下では、この条件から**有限誤差によるcontrol判定**を導きます。

<a id="thm-iwa12-finite-error-control"></a>

<!-- formal-statement-start -->
> **定理（有限誤差によるcontrol判定）**  
> 第1節の有限アーベル $p$ 群の逆系について $X=\varprojlim A_n$ とする。ある **固定された有限部分群** $F\subseteq X$ と整数 $C\ge1$ が存在し、全ての $n\ge0$ で
>
$$
K_n\subseteq\omega_nX+F,\qquad
[A_n:J_n]\le C
$$
>
> が成立すると仮定する。このとき $c_n$ は一様有界な control を満たし、
>
$$
|\ker c_n|\le |F|,
\qquad |\operatorname{coker}c_n|\le C
$$
>
> である。特に $F=0$、$J_n=A_n$ なら完全 control である。
<!-- formal-statement-end -->

### 証明の見取り図

左の仮定は「第 $n$ 層で消えた元のうち作用差で説明できないものは、同じ有限群 $F$ から来る」という意味です。右の仮定は、安定像に入らない元の数を抑えます。それぞれ [完全列](#thm-iwa12-comparison-exact)の左端・右端を評価します。

<!-- proof-start -->
### 証明

$\omega_nX\subseteq K_n$ は既に示しました。任意の $k\in K_n$ は仮定から $k=\omega_nx+f$（$f\in F$）と書けます。$k$ と $\omega_nx$ はともに $K_n$ に属するので、差 $f$ も $K_n\cap F$ に属します。よって

$$
K_n=\omega_nX+(K_n\cap F)
$$

です。商 $K_n/\omega_nX$ は有限群 $K_n\cap F$ の像なので、その位数は $|F|$ 以下です。[比較完全列](#thm-iwa12-comparison-exact)によりこれが $\ker c_n$ です。

また [安定像命題](#prop-iwa12-stable-image)から $I_n=J_n$、従って $\operatorname{coker}c_n=A_n/J_n$、位数は $[A_n:J_n]\le C$。$B=\max(|F|,C)$ を取れば [定義](#def-iwa12-uniform-control)の両不等式が全 $n$ で成立します。
<!-- proof-end -->

この定理の仮定 $K_n\subseteq\omega_nX+F$ は control の結論を言い換えただけではありません。例えば有限次元の明示的な加群で、核に現れる余分な元を一つの**固定有限群**へ押し込められるなら、全層の群の位数を調べなくても control を結論できます。算術への適用では、その固定有限群や安定像の指数を局所的な分岐条件などから**別途示す**必要があります。

## 5. 完全一致と有限誤差を手で計算する

### 5.1 $1+3$ の作用が作る完全 control

$p=3$ とし、$X=\mathbb Z_3$（加法群）上で $\gamma x=4x$ と作用させます。$\gamma$ の整数冪作用は $3$ 進連続なので $\Gamma\simeq\mathbb Z_3$ の作用になります。$\omega_n$ は $4^{3^n}-1$ の掛け算です。

この数の $3$ 進付値を確認します。$a=1+3^rb$（$r\ge1$、$3\nmid b$）なら

$$
a^3-1=3^{r+1}b+3^{2r+1}b^2+3^{3r}b^3.
$$

第1項の付値は $r+1$、残りは少なくとも $r+2$ なので $v_3(a^3-1)=r+1$ です。$4-1=3$ を出発点に帰納すると

$$
v_3(4^{3^n}-1)=n+1,\qquad
\omega_nX=3^{n+1}\mathbb Z_3.
$$

そこで $A_n=\mathbb Z/3^{n+1}\mathbb Z$ とし、遷移写像を還元、$\gamma$ の作用を $a\mapsto4a$ とします。$\gamma^{3^n}$ は $A_n$ に自明に作用します。整合列の逆極限は $X=\mathbb Z_3$ なので

$$
X_{\Gamma_n}=\mathbb Z_3/3^{n+1}\mathbb Z_3
\xrightarrow[\simeq]{\ c_n\ }A_n.
$$

この例は完全 control です。さらに $\bigl|A_n\bigr|=3^{n+1}$ まで具体的に読めます。$X\simeq\Lambda/(T-3)$ と見れば、$\omega_n$ の代入計算とも一致します。

### 5.2 第0層にだけ有限の核がある例

今度は $X=\mathbb Z_3\oplus F$、$F=\mathbb Z/3\mathbb Z$ とし、$\gamma(x,f)=(4x,f)$ と作用させます。$n\ge1$ では

$$
A_n=(\mathbb Z/3^{n+1}\mathbb Z)\oplus F
$$

とし、$A_0=\mathbb Z/3\mathbb Z$ とします。$n\ge1$ の遷移は第1成分の還元と第2成分の恒等写像、$N_{1,0}(a,f)=a\bmod3$ です。すべて全射です。逆極限は宣言した $X$ と一致します。

$n\ge1$ では $\omega_nX=3^{n+1}\mathbb Z_3\oplus0$、従って $c_n$ は同型です。しかし $n=0$ では

$$
X_{\Gamma_0}
=(\mathbb Z/3\mathbb Z)\oplus F
\xrightarrow{\ c_0\ }\mathbb Z/3\mathbb Z,
\qquad (a,f)\longmapsto a.
$$

核は $F$（位数3）、余核は零です。この系には **$B=3$ の control** はありますが、完全 control はありません。有限層の取り方を一つ変えると、無限層からの比較に小さな核が残り得ることが分かります。

### 5.3 余核にだけ有限の誤差がある例

第5.1節と同じ $X=\mathbb Z_3$、$\gamma x=4x$ を使います。$n\ge1$ の $A_n$ は同じですが、第0層だけ

$$
A_0=(\mathbb Z/3\mathbb Z)^2,\qquad
N_{1,0}(a)=(a\bmod3,0)
$$

に変更します。$\Gamma$ は $A_0$ に自明に作用するので仮定と整合します。逆極限は依然 $X=\mathbb Z_3$ です。$n\ge1$ で $c_n$ は同型ですが、第0層では

$$
c_0:\mathbb Z/3\mathbb Z\longrightarrow(\mathbb Z/3\mathbb Z)^2,
\qquad a\longmapsto(a,0)
$$

なので $\ker c_0=0$、$\operatorname{coker}c_0\simeq\mathbb Z/3\mathbb Z$。この例でも $B=3$ の一様有界 control が成り立ちますが、全射ではありません。

## 6. なぜノルムの全射性だけでは足りないか

最も重要な反例は、$X$ の作用が自明なときに現れます。$p=3$、$A_n=\mathbb Z/3^{n+1}\mathbb Z$ とし、遷移写像を還元、$\Gamma$ 作用を全層で自明にします。すべての $N_{n+1,n}$ は全射で、$X=\mathbb Z_3$ です。

しかし $\gamma x=x$ だから $\omega_nX=0$ であり、

$$
X_{\Gamma_n}=\mathbb Z_3,\qquad
c_n:\mathbb Z_3\longrightarrow\mathbb Z/3^{n+1}\mathbb Z
$$

は通常の還元です。核は $3^{n+1}\mathbb Z_3\simeq\mathbb Z_3$ という**無限群**です。第3節で保証したのは余核が零であることだけでした。核の有限性すら従いません。

この $X$ は $\Lambda/(T)$ として有限生成 torsion $\Lambda$ 加群でもあります。「$X$ が torsion であれば $X/\omega_nX$ は自動的に有限」という主張も誤りです。$\omega_n$ と $T$ の共通因子によって coinvariants が無限になるからです。

算術的な議論で「ノルムが全射」「類群は有限」「無限層の加群は torsion」を並べても、[有限誤差判定](#thm-iwa12-finite-error-control)の核に関する仮定を証明したことにはなりません。

## 7. 類群の塔では何をさらに証明するか

数体 $F$ の $\mathbb Z_p$ 拡大 $F_\infty/F$ の有限層 $F_n$ を取り、[IWA4のノルムと類群の逆極限](../IWA4/index.md#thm-iwa4-iwasawa-action)に従い

$$
A_n=\operatorname{Cl}(F_n)[p^\infty],\qquad
X_\infty=\varprojlim_n A_n
$$

とします。$\Gamma=\operatorname{Gal}(F_\infty/F)$ の作用は各 $A_n$ で $\Gamma/\Gamma_n$ を経由し、イデアルノルムと可換です。従って本講の [比較写像](#def-iwa12-control-map)

$$
(X_\infty)_{\Gamma_n}\longrightarrow A_n
$$

が作れます。写像の存在は形式的ですが、同型や一様有界性は形式的ではありません。

[IWA11の単数と類群の完全列](../IWA11/index.md#thm-iwa11-local-global-exact)は有限層で局所条件がどこに現れるかを示し、[局所化・ノルムの可換性](../IWA11/index.md#prop-iwa11-norm-localization)はその列を塔で結びます。実際の算術的 control には、例えば次を**その拡大について証明**しなければなりません。

1. 上層から降りる類群の安定像 $J_n$ の指数が $n$ に依存せず有界か（または全射か）。
2. 第 $n$ 層で消える逆極限の元が $\omega_nX_\infty$ と、同じ有限群の誤差とで記述できるか。
3. それらの誤差が、分岐素点・局所ノルム・大域単数の閉包や capitulation（上層で主イデアルになる現象）からどう制御されるか。

第1・第2項を示せたなら [有限誤差判定](#thm-iwa12-finite-error-control)を適用できます。一方、この講義では個別の数体に対する分岐・単数の評価までを一般に証明していません。したがって**類群の control がすべての $\mathbb Z_p$ 拡大で一様に成立する**という定理を得たわけではありません。

## 8. 演習と詳細解答

### Level A

<a id="ex-iwa12-a1"></a>

**A1. 作用差が有限層で消える理由**
- Level: A
- ID: IWA12-A1

$p=3$、$\Gamma$ の生成元 $\gamma$ が $A_1=\mathbb Z/9\mathbb Z$ に $a\mapsto4a$ と作用するとする。$\omega_1=\gamma^3-1$ が $A_1$ で零となることを計算し、比較写像の well-defined 性を説明せよ。

<!-- solution-start -->
**詳細解答。** $4^3-1=64-1=63=7\cdot9$ だから $\omega_1a=63a=0$（法9）です。$\Gamma_1$ が $A_1$ に自明に作用する条件が確認できました。従って任意の $x,y\in X$ に対して $\pi_1(x+\omega_1y)=\pi_1(x)+\omega_1\pi_1(y)=\pi_1(x)$ であり、$x+\omega_1X$ の代表元によらず $c_1$ が定まります。
<!-- solution-end -->

<a id="ex-iwa12-a2"></a>

**A2. 射影の核と比較の核**
- Level: A
- ID: IWA12-A2

$X=\mathbb Z_3$、$\gamma x=4x$、$A_0=\mathbb Z/3\mathbb Z$ への射影が還元であるとする。$K_0$ と $\omega_0X$ をそれぞれ求め、$c_0$ の核を求めよ。

<!-- solution-start -->
**詳細解答。** $K_0=\ker(\mathbb Z_3\to\mathbb Z/3\mathbb Z)=3\mathbb Z_3$ です。また $\omega_0=\gamma-1$ は $4-1=3$ の掛け算なので $\omega_0X=3\mathbb Z_3$ です。[比較完全列](#thm-iwa12-comparison-exact)を適用すると $\ker c_0=K_0/\omega_0X=3\mathbb Z_3/3\mathbb Z_3=0$。射影 $\pi_0$ 自体は単射でなくても、比較写像は単射になり得ます。
<!-- solution-end -->

<a id="ex-iwa12-a3"></a>

**A3. 安定像と消えた一成分**
- Level: A
- ID: IWA12-A3

$A_0=(\mathbb Z/3\mathbb Z)^2$、$A_m=\mathbb Z/3^{m+1}\mathbb Z$（$m\ge1$）、$N_{1,0}(a)=(a\bmod3,0)$、上層の遷移は還元とする。$J_0$ と $A_0/J_0$ の位数を求めよ。

<!-- solution-start -->
**詳細解答。** 上層 $A_m$ から $A_0$ への写像は $a\mapsto(a\bmod3,0)$ で、$m\ge1$ に関係なく像は $J_0=\{(0,0),(1,0),(2,0)\}$ です。$|A_0|=9$、$|J_0|=3$ なので $|A_0/J_0|=9/3=3$。この商の非零類は第2成分が1または2の元で代表されます。
<!-- solution-end -->

<a id="ex-iwa12-a4"></a>

**A4. 三乗すると付値が一つ増える**
- Level: A
- ID: IWA12-A4

$r\ge1$、$3\nmid b$ に対し $a=1+3^rb$ とする。$v_3(a^3-1)=r+1$ を展開によって示し、$v_3(4^9-1)$ を求めよ。

<!-- solution-start -->
**詳細解答。** 二項定理で $a^3-1=3^{r+1}b+3^{2r+1}b^2+3^{3r}b^3$。第1項の付値は $r+1$、第2項は $2r+1\ge r+2$、第3項は $3r\ge r+2$（$r\ge1$）です。最小付値の項が一つなので和の付値は $r+1$。$4=1+3$ から $v_3(4^3-1)=2$、続けて $v_3(4^9-1)=3$ です。
<!-- solution-end -->

<a id="ex-iwa12-a5"></a>

**A5. coinvariants が無限になる例**
- Level: A
- ID: IWA12-A5

$X=\Lambda/(T)$ とする。各 $\omega_n$ の $X$ への作用と $X_{\Gamma_n}$ を求め、有限生成 torsion 性から coinvariants の有限性を結論できない理由を述べよ。

<!-- solution-start -->
**詳細解答。** $T=0$ を代入すると $\omega_n=(1+T)^{3^n}-1=0$ です（ここでは $p=3$）。$X=\Lambda/(T)\simeq\mathbb Z_3$ なので $\omega_nX=0$、従って $X_{\Gamma_n}=\mathbb Z_3$ は無限群です。他方 $T\ne0$ は $X$ を零化するので $X$ は有限生成 torsion $\Lambda$ 加群です。torsion とは $\Lambda$ の非零元で元が零化されることを意味し、$\omega_n$ による商が有限になることまでは意味しません。
<!-- solution-end -->

### Level B

<a id="ex-iwa12-b1"></a>

**B1. 有限誤差を一つの群で抑える**
- Level: B
- ID: IWA12-B1

$X=\mathbb Z_3\oplus\mathbb Z/3\mathbb Z$、$\gamma(x,f)=(4x,f)$ とし、第5.2節の $A_n$ と遷移写像を使う。$K_0/\omega_0X$ と $K_1/\omega_1X$ を求め、定理の有限群 $F$ を指定せよ。

<!-- solution-start -->
**詳細解答。** $A_0=\mathbb Z/3\mathbb Z$ への射影は $(x,f)\mapsto x\bmod3$ なので $K_0=3\mathbb Z_3\oplus F$ です。$\omega_0(x,f)=(3x,0)$ から $\omega_0X=3\mathbb Z_3\oplus0$ であり、商は $F\simeq\mathbb Z/3\mathbb Z$。$n=1$ では $K_1=9\mathbb Z_3\oplus0$、$\omega_1(x,f)=(63x,0)$ なので $63\mathbb Z_3=9\mathbb Z_3$（7は3進単数）、従って商は0です。固定有限群として $F=\{0\}\oplus\mathbb Z/3\mathbb Z$ を取れ、全層で $K_n\subseteq\omega_nX+F$、しかも遷移は全射で $J_n=A_n$。ゆえに $B=3$ が使えます。
<!-- solution-end -->

<a id="ex-iwa12-b2"></a>

**B2. 全射ノルムでも control が壊れる**
- Level: B
- ID: IWA12-B2

$A_n=\mathbb Z/3^{n+1}\mathbb Z$、遷移は還元、$\Gamma$ 作用は自明とする。$X$、$c_n$、$\ker c_n$ をすべて求め、[有限誤差判定](#thm-iwa12-finite-error-control)の左の仮定を満たす固定有限群 $F$ が存在しないことを示せ。

<!-- solution-start -->
**詳細解答。** 還元の逆極限は $X=\mathbb Z_3$ です。作用が自明なので $\omega_nX=0$ となり、$c_n:\mathbb Z_3\to\mathbb Z/3^{n+1}\mathbb Z$ は還元。核は $K_n=3^{n+1}\mathbb Z_3$ で、これは無限集合です。もし固定有限群 $F$ に対し $K_n\subseteq\omega_nX+F=F$ が成り立てば、無限群 $K_n$ が有限群に含まれる矛盾です。全射ノルムが保証するのは $J_n=A_n$、すなわち余核0だけです。
<!-- solution-end -->

<a id="ex-iwa12-b3"></a>

**B3. 有限核と有限余核の区別**
- Level: B
- ID: IWA12-B3

第5.2節と第5.3節について、$n=0$ と $n=1$ の $|\ker c_n|$、$|\operatorname{coker}c_n|$ を表にして比較し、両方が完全 control ではない理由を説明せよ。

<!-- solution-start -->
**詳細解答。** 第5.2節の $n=0$ は $(|\ker|,|\operatorname{coker}|)=(3,1)$、$n=1$ は $(1,1)$ です。第5.3節の $n=0$ は $(1,3)$、$n=1$ は $(1,1)$ です。ここでは零群の位数を1と数えました。前者は第0層で $F$ が忘れられるため単射でなく、後者は第0層の第2成分に整合する上層の元がないため全射でありません。ともに $B=3$ の一様有界 control を満たしますが、完全 control には全ての核と余核が零である必要があります。
<!-- solution-end -->

<a id="ex-iwa12-b4"></a>

**B4. 安定像による余核の算出**
- Level: B
- ID: IWA12-B4

一般の有限群逆系で $N_{m,n}$ が必ずしも全射でないとする。固定した $n$ に対し $\operatorname{im}N_{m,n}$ が十分大きな $m$ で一定になることを説明し、$|\operatorname{coker}c_n|$ が安定した像の指数に一致することを証明せよ。

<!-- solution-start -->
**詳細解答。** $m'\ge m\ge n$ に対し、ノルムの合成則から

$
N_{m',n}=N_{m,n}N_{m',m},
\qquad
\operatorname{im}N_{m',n}\subseteq\operatorname{im}N_{m,n}
$

です。$A_n$ は有限群なので像の狭義減少は高々 $|A_n|-1$ 回で止まり、十分高い層では像が一定の群 $J_n$ になります。

さらに [安定像命題](#prop-iwa12-stable-image)の有限交叉性による構成で $I_n=J_n$ です。[比較完全列](#thm-iwa12-comparison-exact)を適用すると

$
\operatorname{coker}c_n=A_n/I_n=A_n/J_n,
\qquad
|\operatorname{coker}c_n|=[A_n:J_n].
$

像の減少が止まることと、全層に整合する元が存在することは別の段階なので、両方を証明する必要があります。
<!-- solution-end -->

### Level C

<a id="ex-iwa12-c1"></a>

**C1. 有限層と無限層を比較する総合問題**
- Level: C
- ID: IWA12-C1

$p=3$ とし $X=\mathbb Z_3\oplus(\mathbb Z/3\mathbb Z)$、$\gamma(x,f)=(4x,f)$ とする。$n\ge1$ では $A_n=(\mathbb Z/3^{n+1}\mathbb Z)\oplus(\mathbb Z/3\mathbb Z)$ として通常の還元で結び、第0層だけ $A_0=\mathbb Z/3\mathbb Z$、$N_{1,0}(a,f)=a\bmod3$ とする。(i) この逆系の逆極限が指定した $X$ になること、(ii) $c_n$ の核・余核が各 $n$ で何か、(iii) $|A_n|$ の式、(iv) 遷移写像の全射だけでは (ii) が保証されない理由を示せ。

<!-- solution-start -->
**詳細解答。** (i) $n\ge1$ の第1成分は $3^{n+1}$ を法とする整合族で、逆極限は $\mathbb Z_3$。第2成分は恒等遷移なので同じ $f\in\mathbb Z/3\mathbb Z$ を全ての $n\ge1$ で保ちます。第0成分は第1成分の法3で一意に決まるため、新たな制約を与えません。従って逆極限は指定した $X$ です。

(ii) $v_3(4^{3^n}-1)=n+1$ なので $\omega_nX=3^{n+1}\mathbb Z_3\oplus0$。$n\ge1$ は $X/\omega_nX=A_n$ で $c_n$ は同型、従って核・余核とも零。$n=0$ は $X/\omega_0X=(\mathbb Z/3\mathbb Z)^2$、$c_0(a,f)=a$ なので核は $\mathbb Z/3\mathbb Z$、余核は零です。

(iii) $|A_0|=3$、$n\ge1$ では第1成分の位数が $3^{n+1}$、第2成分が3なので $|A_n|=3^{n+2}$。

(iv) 遷移写像はすべて全射なので [安定像命題](#prop-iwa12-stable-image)により全射の比較写像は得られます。しかしその命題は $\ker c_n=K_n/\omega_nX$ を評価しません。例えば第0層では $K_0=3\mathbb Z_3\oplus\mathbb Z/3\mathbb Z$、$\omega_0X=3\mathbb Z_3\oplus0$ で差が残っています。$F=\{0\}\oplus\mathbb Z/3\mathbb Z$ が全層の差を覆うという**追加の証明**を使って初めて一様有界性が言えます。
<!-- solution-end -->

## 9. 次講への接続

本講では、[coinvariants](../IWA7/index.md#def-iwa7-layer-quotient)と [逆極限](../IWA4/index.md#def-iwa4-inverse-limit)を結ぶ比較写像について、核・余核の完全列、安定像の特徴付け、有限誤差からの一様有界性を証明しました。数値例から、全射ノルム・torsion 性だけでは核を抑えられないことも確かめました。

次の IWA13 では、有限層で整合する**測度の値**を逆極限として組み立て、$\Lambda$ と $p$ 進積分のつながりを調べます。類群の算術的 control と測度の整合条件は別の対象ですが、どちらも「有限層の整合情報を無限層にした後、どう有限層へ戻すか」という同じ発想を使います。
