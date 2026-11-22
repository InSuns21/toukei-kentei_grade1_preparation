# ANF16 局所類体論：ノルム群と存在

[前講：ANF15 局所相互法則への導入](../ANF15/index.md)では、非分岐拡大のノルム群を付値だけで計算し、分岐二次拡大では単数の剰余が障害になることを調べました。この講の問いは、それらをどこまで一般化できるか、そして**どの部分から本格的な存在定理が必要になるか**です。

この講では、$K$ を有限拡大 $\mathbb Q_p$ の局所体、$\mathcal O_K$ を整数環、$\mathfrak p_K=(\pi_K)$ を極大イデアル、$k_K$ を位数 $q$ の剰余体とします。正規化付値は $v_K(\pi_K)=1$ とし、$\mathcal O_K^\times$ を単数群、$U_K^m=1+\mathfrak p_K^m$（$m\ge1$）を主単数群とします。これらの基本構成は[局所単数の段階商](../ANF12/index.md#thm-anf12-graded-units)で学びました。

**この講で実際に証明すること**は、有限拡大のノルム群が開かつ有限指数であること、その商の付値部分と単数部分の分離、緩分岐巡回拡大におけるノルム群の完全計算です。任意の開有限指数部分群から Abel 拡大を作る一般の存在定理は、これらの初等計算だけからは出ません。最後に正確な定理を述べ、追加で必要な理論を明らかにします。

## 1. ノルム群を、基礎体のどこで測るか

$L/K$ を有限拡大とし、[局所ノルムの付値公式](../ANF12/index.md#prop-anf12-norm-valuation)を思い出します。$f=f(L/K)=[k_L:k_K]$ を剰余次数とすると、任意の $x\in L^\times$ に対して

$$
v_K(N_{L/K}(x))=f\,v_L(x).
$$

したがってノルムの付値は必ず $f$ の倍数です。しかし逆に、付値が $f$ の倍数であれば必ずノルムになるわけではありません。単数に障害が残ることがあります。

この障害を一つの群として記録するため、ノルムである元をまとめて除いた商を考えます。

<a id="def-anf16-norm-subgroup"></a>

<!-- formal-statement-start -->
> **定義（ノルム部分群とノルム指数）**  
> $L/K$ を有限拡大とする。体ノルムの像
>
$$
H_{L/K}=N_{L/K}(L^\times)\subset K^\times
$$
>
> をノルム部分群という。商群 $K^\times/H_{L/K}$ が有限のとき、その位数 $[K^\times:H_{L/K}]$ をノルム指数という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf16-norm-subgroup -->
**定義の確認。** $L=\mathbb Q_3(i)$、$K=\mathbb Q_3$、$i^2=-1$ の非分岐二次拡大では、[非分岐ノルム群](../ANF15/index.md#prop-anf15-unramified-norm-quotient)により

$$
H_{L/K}=3^{2\mathbb Z}\mathbb Z_3^\times.
$$

積と逆元で閉じた $K^\times$ の部分群で、剰余類は $[1],[3]$ の二つです。$3$ はノルムではない一方 $9=N_{L/K}(3)$ はノルムです。よってノルム指数は $2$ です。
<!-- definition-example-end -->

次の完全列は、商に残る二種類の情報を直接分離します。

<a id="prop-anf16-valuation-unit-sequence"></a>

<!-- formal-statement-start -->
> **命題（ノルム商の付値・単数完全列）**  
> $L/K$ を有限拡大、$f=f(L/K)$ とする。このとき単数のノルム群は
>
$$
N_{L/K}(\mathcal O_L^\times)
=H_{L/K}\cap\mathcal O_K^\times
$$
>
> に等しく、付値が誘導する次の群準同型の列は完全である。
>
$$
1\longrightarrow
\mathcal O_K^\times/N_{L/K}(\mathcal O_L^\times)
\longrightarrow K^\times/H_{L/K}
\xrightarrow{\ \bar v_K\ }\mathbb Z/f\mathbb Z
\longrightarrow0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

元がノルムなら、その付値は $f$ の倍数です。逆に任意の $f$ の倍数の付値は $N(\pi_L^j)$ で実現できます。付値を取り除いた後には単数のノルムだけが残ります。

<!-- proof-start -->
### 証明

$x\in\mathcal O_L^\times$ なら $v_L(x)=0$ ですから、付値公式によって $N(x)$ は $K$ の単数です。逆に $a=N(x)\in\mathcal O_K^\times$ なら

$$
0=v_K(a)=f\,v_L(x).
$$

$f\ge1$ なので $v_L(x)=0$、すなわち $x\in\mathcal O_L^\times$ です。これで最初の等式を示しました。

次に $aH_{L/K}\mapsto v_K(a)\bmod f$ を考えます。代表元を $aN(x)$ へ取り替えると付値は $f\,v_L(x)$ だけ変化するので、写像は well-defined です。$\pi_K^j$ は任意の $j\in\mathbb Z$ を実現するから全射です。

この写像の核に属する $a$ は $v_K(a)=fj$ と書けます。$b=N(\pi_L^j)$ と置けば $v_K(b)=fj$ なので $u=ab^{-1}$ は $K$ の単数です。従って $aH_{L/K}=uH_{L/K}$。また、二つの単数 $u,u'$ が同じ剰余類を表すことと $u/u'\in H_{L/K}\cap\mathcal O_K^\times=N(\mathcal O_L^\times)$ は同値です。よって核は左辺の単数商に一致します。
<!-- proof-end -->

この完全列から、ノルム指数が有限ならば

$$
[K^\times:H_{L/K}]
=f\,[\mathcal O_K^\times:N_{L/K}(\mathcal O_L^\times)]
$$

となります。**剰余次数 $f$ は付値の障害、残りは単数の障害**です。

## 2. ノルム群は必ず開かつ有限指数

ここでいう「開」とは、$p$ 進位相でノルム部分群が開集合となることです。$K^\times$ の部分群 $H$ について、ある $m\ge1$ で $U_K^m\subset H$ なら、$H$ は開です。実際、各 $h\in H$ のまわりの開集合 $hU_K^m$ が $H$ の中に入り、その和集合が $H$ となるからです。

任意の有限拡大のノルムに、十分深い主単数群が含まれることを証明します。重要なのは、$L/K$ が Galois である必要はない点です。

<a id="lem-anf16-deep-power-roots"></a>

<!-- formal-statement-start -->
> **補題（十分深い主単数は $n$ 乗）**  
> $K/\mathbb Q_p$ を有限拡大、$n\ge1$ を整数、$d=v_K(n)$ とする。整数 $m>2d$ かつ $m\ge1$ を取れば、任意の $u\in U_K^m$ に対し $x\in\mathcal O_K^\times$ が存在して $x^n=u$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

$F(X)=X^n-u$ の初期値 $X=1$ では、$F(1)=1-u$ が十分小さく、$F'(1)=n\ne0$ です。[強い形の Hensel の補題](../ANF10/index.md#thm-anf10-hensel-strong)の Newton 反復を $K$ の正規化付値で行えば、根が持ち上がります。

<!-- proof-start -->
### 証明

$u=1$ なら $x=1$ でよいので、以下 $u\ne1$ とします。$F(X)=X^n-u\in\mathcal O_K[X]$ とおき、$r=v_K(F(1))=v_K(1-u)\ge m>2d$ とします。$F'(1)=n$ なので $v_K(F'(1))=d$ です。

ここで一般の完備離散付値環 $\mathcal O_K$ でも、Newton 反復 $a_{j+1}=a_j-F(a_j)/F'(a_j)$ は $\mathcal O_K$ 内で構成できます。初期点 $a_0=1$ において $r>2d$ であり、帰納的に $d_j=v_K(F'(a_j))=d$、$r_j=v_K(F(a_j))>2d$ が保たれ、

$$
v_K(a_{j+1}-a_j)=r_j-d,\qquad
r_{j+1}\ge2(r_j-d)
$$

となります。前者は増大して無限大へ向かいます。従って完備性から $a_j\to x\in\mathcal O_K$、多項式の連続性から $F(x)=0$ です。最初の差は $\mathfrak p_K^{r-d}\subset\mathfrak p_K$ に入り、後の補正もさらに深いため $x\equiv1\pmod{\mathfrak p_K}$ です。特に $x\in\mathcal O_K^\times$ で、$x^n=u$ が成立します。
<!-- proof-end -->

補題は、$n$ が $p$ で割り切れても、主単数の段を十分深く取れば $n$ 乗根を求められることを示します。これを体ノルムに戻します。

<a id="thm-anf16-norm-open-finite"></a>

<!-- formal-statement-start -->
> **定理（有限局所拡大のノルム群は開・有限指数）**  
> $K/\mathbb Q_p$ を有限拡大、$L/K$ を次数 $n\ge1$ の任意の有限拡大とする。このとき $H_{L/K}=N_{L/K}(L^\times)$ は $K^\times$ の開部分群であり、
>
$$
[K^\times:H_{L/K}]<\infty.
$$
>
> さらに $m>\!2v_K(n)$、$m\ge1$ なら $U_K^m\subset H_{L/K}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

ノルムは $K$ に属する元について $N_{L/K}(a)=a^n$ です。前補題によって深い主単数はすべて $n$ 乗、従ってノルムです。一方、単数群をこの主単数群で割った商は有限群です。

<!-- proof-start -->
### 証明

任意の $a\in K^\times$ を $L$ の元と見れば、$K$ 上の $n$ 次元線形空間 $L$ 上で「$a$ を掛ける写像」の行列式が $a^n$ なので $N_{L/K}(a)=a^n$ です。

$m>2v_K(n)$、$m\ge1$ を選びます。[深い主単数の補題](#lem-anf16-deep-power-roots)から、各 $u\in U_K^m$ は $x^n$（$x\in\mathcal O_K^\times$）と表せます。従って

$$
U_K^m\subset (K^\times)^n\subset H_{L/K}.
$$

上で確かめた開部分群の条件から $H_{L/K}$ は開です。

次に $K^\times=\pi_K^{\mathbb Z}\mathcal O_K^\times$ と分解します。$N_{L/K}(\pi_L)$ の付値は剰余次数 $f$ なので、$H_{L/K}$ の付値像は $f\mathbb Z$ です。[単数の段階商](../ANF12/index.md#thm-anf12-graded-units)により、$\mathcal O_K^\times/U_K^m$ は有限です。実際、第一段は $k_K^\times$（位数 $q-1$）、以降の各 $U_K^j/U_K^{j+1}$ は加法群 $k_K$（位数 $q$）です。従って

$$
[\mathcal O_K^\times:U_K^m]=(q-1)q^{m-1}<\infty.
$$

[付値・単数完全列](#prop-anf16-valuation-unit-sequence)と $U_K^m\subset N(\mathcal O_L^\times)$ から

$$
[K^\times:H_{L/K}]
=f\,[\mathcal O_K^\times:N(\mathcal O_L^\times)]
\le f(q-1)q^{m-1}.
$$

よって指数は有限です。
<!-- proof-end -->

**ここで証明したのは指数の有限性であって、指数が $[L:K]$ に等しいことではありません。** 後者は有限 Abel 拡大に関する局所類体論の重要な主張です。Hilbert 90 のみから導いてはいけません。

## 3. 緩分岐巡回拡大では指数を最後まで計算できる

一般定理へ進む前に、分岐していても全計算ができる族を調べます。$e\ge2$ が $q-1$ を割るとします。このとき $p\nmid e$ で、剰余体 $k_K^\times$ に $e$ 個の $e$ 乗根が存在します。[単純根の Hensel の補題](../ANF10/index.md#thm-anf10-hensel-simple)によってそれらは $K$ の $e$ 乗根へ持ち上がります。

$\alpha^e=\pi_K$ となる根 $\alpha$ を取り、$L=K(\alpha)$ とします。$X^e-\pi_K$ は [Eisenstein 既約性](../ANF10/index.md#thm-anf10-eisenstein-irreducible)で既約、$L/K$ は次数 $e$ の全分岐拡大です。$e$ 個の根 $\zeta\alpha$（$\zeta^e=1$）がすべて $L$ にあるため、これは巡回 Galois 拡大です。

<a id="prop-anf16-tame-kummer-norm"></a>

<!-- formal-statement-start -->
> **命題（緩分岐 Kummer 巡回拡大のノルム群）**  
> $K/\mathbb Q_p$ を有限拡大、$q=|k_K|$、$e\ge2$ を $e\mid(q-1)$ を満たす整数とする。$\alpha^e=\pi_K$、$L=K(\alpha)$ とする。剰余写像 $\mathcal O_K^\times\to k_K^\times$ を $u\mapsto\bar u$ と書けば、
>
$$
\begin{aligned}
N_{L/K}(\mathcal O_L^\times)
&=\{u\in\mathcal O_K^\times:\bar u\in(k_K^\times)^e\},\\
N_{L/K}(L^\times)
&=\langle(-1)^{e+1}\pi_K\rangle\,
\{u\in\mathcal O_K^\times:\bar u\in(k_K^\times)^e\}.
\end{aligned}
$$
>
> 特にノルム指数は $e=[L:K]$ である。
<!-- formal-statement-end -->

### 証明の見取り図

全分岐だから剰余体は変わりません。全ての Galois 共役は剰余体上で同じ元になるため、単数のノルムの剰余は $e$ 乗です。逆方向は、剰余が $e$ 乗なら Hensel で $K$ の中に $e$ 乗根を作り、それ自身を $L$ の元とみなしてノルムを取ります。

<!-- proof-start -->
### 証明

まず $X^e-\pi_K$ が Eisenstein なので $[L:K]=e$、$v_L(\alpha)=1$、$f(L/K)=1$ です。$p\nmid e$ なので $X^e-1$ の相異なる $e$ 個の剰余体根は Hensel により $K$ に持ち上がり、$\alpha\mapsto\zeta\alpha$（$\zeta^e=1$）が $e$ 個の自己同型を与えます。$k_K^\times$ は巡回で、$e$ 個の根は巡回群を作るので Galois 群も巡回です。

$x\in\mathcal O_L^\times$ とすると、全分岐拡大の各 Galois 自己同型は剰余体上で恒等的に作用します。[惰性群の完全列](../ANF13/index.md#thm-anf13-inertia-exact)の $f=1$ の場合です。従って

$$
\overline{N_{L/K}(x)}
=\overline{\prod_{\sigma\in\operatorname{Gal}(L/K)}\sigma(x)}
=\prod_{\sigma}\bar x
=\bar x^{\,e}.
$$

ゆえに単数ノルムの剰余は $e$ 乗です。逆に $u\in\mathcal O_K^\times$ の剰余が $e$ 乗であれば、$a_0\in k_K^\times$ で $a_0^e=\bar u$ を選べます。$F(T)=T^e-u$ の導関数は $F'(a_0)\equiv e a_0^{e-1}\ne0\pmod{\mathfrak p_K}$ なので Hensel により $a\in\mathcal O_K^\times$ が存在して $a^e=u$ となります。$a$ は基礎体の元ですから $N_{L/K}(a)=a^e=u$ です。これで単数ノルムの両包含が分かりました。

$\alpha$ の最小多項式は $T^e-\pi_K$ なので、根の積から

$$
N_{L/K}(\alpha)=(-1)^{e+1}\pi_K.
$$

任意の $x\in L^\times$ は $x=\alpha^j w$（$w\in\mathcal O_L^\times$）と一意に書けます。ノルムの乗法性と上の単数ノルムの表示から、第二の等式が従います。

最後に $f=1$ なので[付値・単数完全列](#prop-anf16-valuation-unit-sequence)より指数は単数ノルム商の位数です。有限体の乗法群 $k_K^\times$ は位数 $q-1$ の巡回群で、$e\mid(q-1)$ ですから $e$ 乗写像の核は $e$ 個、像の指数も $e$ です。従って

$$
[K^\times:N_{L/K}(L^\times)]
=[k_K^\times:(k_K^\times)^e]=e.
$$
<!-- proof-end -->

### 一様化元がノルムかどうかには符号も効く

$K=\mathbb Q_3$、$e=2$、$\alpha=\sqrt3$ では、$k_K^\times=\{1,2\}$ の平方集合は $\{1\}$ です。そこで

$$
N_{\mathbb Q_3(\sqrt3)/\mathbb Q_3}(L^\times)
=\langle-3\rangle(1+3\mathbb Z_3).
$$

$-3=N(\sqrt3)$ はノルムですが、$3$ はノルムではありません。実際 $3=(-3)(-1)$ で $-1\bmod3=2$ は非平方だからです。付値が $1$ というだけでは判定できません。

一方 $K=\mathbb Q_5$、$e=2$ のときは $-1\bmod5=4$ が平方です。従って $-5$ がノルムなら $5$ もノルムです。これは[前講の $\mathbb Q_5(\sqrt5)$ の計算](../ANF15/index.md#prop-anf15-ramified-quadratic-norm)と一致します。

さらに $K=\mathbb Q_5$、$e=4$ とすると $L=\mathbb Q_5(\sqrt[4]5)$ は巡回四次拡大で、$\mathbb F_5^\times$ の四乗集合は $\{1\}$ です。ゆえに

$$
N_{L/K}(L^\times)=\langle-5\rangle(1+5\mathbb Z_5),
\qquad [K^\times:N(L^\times)]=4.
$$

ここでは $-5$ はノルムですが、$5$ はノルムではありません。実際 $-1\bmod5=4$ は四乗剰余でないからです。

## 4. 中間体とノルムの向き

有限体拡大の塔 $L/M/K$ については、ノルムの推移律を考えます（以下で合成ノルムの等式も証明します）。

<a id="prop-anf16-norm-tower"></a>

<!-- formal-statement-start -->
> **命題（ノルム部分群の塔での包含）**  
> $L/M/K$ を局所体の有限拡大の塔とする。このとき
>
$$
N_{L/K}(L^\times)\subset N_{M/K}(M^\times).
$$
>
> 従って自然な全射 $K^\times/N_{L/K}(L^\times)\to K^\times/N_{M/K}(M^\times)$ がある。
<!-- formal-statement-end -->

### 証明の見取り図

$L$ から $K$ へのノルムは、まず $M$ まで取って、もう一度 $K$ へ取ります。したがって $L$ からのノルムは、必ず $M$ からのノルムにもなります。

<!-- proof-start -->
### 証明

有限拡大は標数 $0$ なので分離的です。$M$ の $K$ 上の埋め込みを $\tau:M\hookrightarrow\overline K$ と書き、各 $\tau$ の $L$ への延長を $\sigma:L\hookrightarrow\overline K$ と書きます。各 $\tau$ はちょうど $[L:M]$ 個の延長を持つため、積の順序を並べ替えると任意の $x\in L^\times$ について

$$
\begin{aligned}
N_{L/K}(x)
&=\prod_{\sigma:L\hookrightarrow\overline K}\sigma(x)
=\prod_{\tau:M\hookrightarrow\overline K}\left(\prod_{\sigma|_M=\tau}\sigma(x)\right)\\
&=\prod_{\tau:M\hookrightarrow\overline K}\tau(N_{L/M}(x))
=N_{M/K}(N_{L/M}(x)).
\end{aligned}
$$

これがノルムの推移律です。

$N_{L/M}(x)\in M^\times$ なので右辺は $N_{M/K}(M^\times)$ の元です。両部分群は $K^\times$ の正規部分群（$K^\times$ は可換）なので、剰余類 $aN_{L/K}(L^\times)\mapsto aN_{M/K}(M^\times)$ は well-defined な全射準同型です。
<!-- proof-end -->

先ほどの巡回四次拡大 $L=\mathbb Q_5(\sqrt[4]5)$ の中間体 $M=\mathbb Q_5(\sqrt5)$ では、ノルム商は位数 $4$ から位数 $2$ の商へ写ります。具体的な核の元は統合演習で求めます。

## 5. 「開・有限指数」から「存在」への飛躍

ここで、ノルム部分群の必要条件と、拡大を作れるという十分条件を分けます。$H\subset K^\times$ が開部分群で指数有限であっても、**第2節で示したのは既存の拡大から作ったノルム群がそうなるという向きだけ**です。逆向きは局所類体論の中心定理です。

<a id="def-anf16-class-field-subgroup"></a>

<!-- formal-statement-start -->
> **定義（類体論で扱う開有限指数部分群）**  
> $K/\mathbb Q_p$ を有限拡大とする。$K^\times$ の部分群 $H$ が開かつ指数有限であるとき、ここでは $H$ を類体論の候補部分群と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf16-class-field-subgroup -->
**定義の確認。** $H=\pi_K^{3\mathbb Z}\mathcal O_K^\times$ とすると積と逆元に関して閉じています。また $U_K^1\subset H$ なので開です。$K^\times=\pi_K^{\mathbb Z}\mathcal O_K^\times$ から $K^\times/H\cong\mathbb Z/3\mathbb Z$、したがって指数 $3$ です。[非分岐ノルム群](../ANF15/index.md#prop-anf15-unramified-norm-quotient)によって、この候補部分群は非分岐三次拡大のノルム群として実際に現れます。
<!-- definition-example-end -->

<a id="thm-anf16-local-existence"></a>

<!-- formal-statement-start -->
> **定理（局所類体論の存在定理・一般形）**  
> $K/\mathbb Q_p$ を有限拡大とし、$K$ の分離閉包を一つ固定する。任意の開有限指数部分群 $H\subset K^\times$ に対し、$K$ の有限 Abel Galois 拡大 $L$ がこの分離閉包内にただ一つ存在して
>
$$
N_{L/K}(L^\times)=H
$$
>
> を満たす。さらに
>
$$
[K^\times:H]=[L:K]
$$
>
> が成り立つ。異なる拡大の包含関係は、対応するノルム部分群の逆向きの包含関係に対応する。
<!-- formal-statement-end -->

### なぜこの定理の証明は先ほどの計算だけでは完了しないか

この一般定理は**ここでは外部定理として用います**。本講で証明した[ノルム群の開性・有限指数](#thm-anf16-norm-open-finite)は必要条件であり、[緩分岐巡回拡大の計算](#prop-anf16-tame-kummer-norm)は具体的な十分性の一族ですが、任意の候補部分群に拡大を割り当てる構成にはなっていません。

標準的な証明の一つでは、以下の追加段階が必要です。

1. 非分岐拡大の[算術的 Frobenius とノルム商](../ANF15/index.md#thm-anf15-unramified-reciprocity)を全ての次数について両立させる。
2. 緩分岐だけでなく、$p$ で割れる次数を持つ**激分岐** Abel 拡大も構成・制御する。例えば Lubin–Tate 形式群の捩れ点から得られる拡大とその Galois 作用が一つの証明経路になる。形式群の構成・必要なノルムの記述は本講までの補題からは従わない。
3. 構成した Abel 拡大が全ての開有限指数部分群を実現すること、およびノルム群が一致すれば対応する Abel 拡大も一致することを示す。
4. 全ての有限 Abel 拡大でのノルム指数 $[K^\times:N_{L/K}(L^\times)]=[L:K]$ と、塔に関する両立性を確立する。

別の標準的な証明経路では局所体の Brauer 群とその不変量、巡回代数の分裂判定を用います。これらは[Hilbert の定理90](../ANF14/index.md#thm-anf14-cyclic90)だけでは得られません。

証明の範囲を厳密に言えば、第1〜4節の命題・定理は本講内または既習結果に還元して証明済みです。上の**一般存在定理と一般ノルム指数等式は追加理論を必要とする既知の深い定理**として扱います。詳細な標準的証明は J. S. Milne, *Class Field Theory*（https://www.jmilne.org/math/CourseNotes/cft.html）および J.-P. Serre, *Local Fields* の局所類体論部分を参照できます。

次講 ANF17では、一般の局所相互法則の規格化・射影系への整合と関手性を扱います。一般定理から何を利用し、何を実際に証明するかを区別した上で進みます。

## 6. 演習：ノルムの必要条件と存在の違い

### A1. 付値・単数完全列から指数を計算する

有限拡大 $L/K$ について $f(L/K)=2$、$[\mathcal O_K^\times:N(\mathcal O_L^\times)]=3$ であると仮定する。ノルム指数を求め、付値による商の大きさを述べよ。

- Level: A
- ID: ANF16-A1

<!-- solution-start -->
**詳細解答。** [付値・単数完全列](#prop-anf16-valuation-unit-sequence)により、真ん中の商の指数は右端の $\mathbb Z/2\mathbb Z$ の位数 $2$ と左端の単数商の位数 $3$ の積です。従って $[K^\times:N(L^\times)]=2\cdot3=6$ です。付値による商は位数 $2$、残る単数の障害は位数 $3$ です。これだけでは商が巡回位数 $6$ かどうかまでは判断していません。
<!-- solution-end -->

### A2. 深い単数とノルム

$K=\mathbb Q_3$、$L/K$ を次数 $6$ の有限拡大とする。任意の $u\in1+27\mathbb Z_3$ がノルムになることを示せ。

- Level: A
- ID: ANF16-A2

<!-- solution-start -->
**詳細解答。** $n=6$ について $v_3(n)=1$ です。$u-1$ は $27\mathbb Z_3$ に属し $v_3(u-1)\ge3>2v_3(6)=2$ です。そこで[深い主単数の補題](#lem-anf16-deep-power-roots)を $n=6$、$m=3$ に適用すると、ある $x\in\mathbb Z_3^\times$ に対し $x^6=u$。$x\in K^\times\subset L^\times$ だから $N_{L/K}(x)=x^{[L:K]}=x^6=u$ です。
<!-- solution-end -->

### A3. 分岐二次の単数障害

$L=\mathbb Q_5(\sqrt5)$、$K=\mathbb Q_5$ とする。$f(L/K)$ と $\mathcal O_K^\times/N(\mathcal O_L^\times)$ の位数を求めよ。

- Level: A
- ID: ANF16-A3

<!-- solution-start -->
**詳細解答。** $X^2-5$ は Eisenstein だから全分岐で $f=1$ です。[前講の分岐ノルム群](../ANF15/index.md#prop-anf15-ramified-quadratic-norm)から単数ノルムは、剰余が $\mathbb F_5^\times$ の平方である単数の集合です。平方集合 $\{1,4\}$ は $\mathbb F_5^\times=\{1,2,3,4\}$ の指数 $2$ の部分群なので、単数ノルム商の位数は $2$ です。付値側の $\mathbb Z/1\mathbb Z$ は自明です。
<!-- solution-end -->

### A4. 三進体では $3$ と $-3$ が異なる

$L=\mathbb Q_3(\sqrt3)$、$K=\mathbb Q_3$ において、$-3$ と $3$ がそれぞれノルムかどうか調べよ。

- Level: A
- ID: ANF16-A4

<!-- solution-start -->
**詳細解答。** $\alpha=\sqrt3$ の共役は $-\alpha$ なので $N(\alpha)=\alpha(-\alpha)=-3$ です。よって $-3$ はノルムです。[緩分岐ノルムの命題](#prop-anf16-tame-kummer-norm)で $e=2,q=3$ とすると、単数ノルムは $1+3\mathbb Z_3$ です。$3=(-3)(-1)$ なので、もし $3$ もノルムなら $-1$ は単数ノルムですが、$-1\equiv2\pmod3$ は平方剰余ではありません。従って $3$ はノルムではありません。
<!-- solution-end -->

### A5. ノルムの塔

有限拡大の塔 $L/M/K$ を取り、$a=N_{L/K}(x)$（$x\in L^\times$）とする。$a$ が $M/K$ のノルムでもあることを、ノルムの中間値を示して説明せよ。

- Level: A
- ID: ANF16-A5

<!-- solution-start -->
**詳細解答。** $y=N_{L/M}(x)$ は $M^\times$ に属します。[ノルムの塔での包含の証明](#prop-anf16-norm-tower)にある推移律を $L/M/K$ に使うと

$$
a=N_{L/K}(x)=N_{M/K}(N_{L/M}(x))=N_{M/K}(y).
$$

従って $a\in N_{M/K}(M^\times)$ です。これは部分群の包含 $H_{L/K}\subset H_{M/K}$ を具体的な元で確かめたものです。
<!-- solution-end -->

### B1. 緩分岐巡回拡大の指数

$K/\mathbb Q_p$ の剰余体の位数を $q$ とし、$e\mid(q-1)$、$e\ge2$ とする。$L=K(\sqrt[e]{\pi_K})$ が巡回全分岐次数 $e$ である理由、単数ノルムの剰余条件、ノルム指数を示せ。

- Level: B
- ID: ANF16-B1

<!-- solution-start -->
**詳細解答。** $X^e-\pi_K$ は [Eisenstein 既約性](../ANF10/index.md#thm-anf10-eisenstein-irreducible)で既約なので $[L:K]=e$、剰余次数は $1$ です。$e\mid(q-1)$ から $p\nmid e$ で、$\mathbb F_q^\times$ の $e$ 個の $e$ 乗根は [Hensel](../ANF10/index.md#thm-anf10-hensel-simple)で $K$ に持ち上がります。これらを $\zeta$ とすれば $\sqrt[e]{\pi_K}\mapsto\zeta\sqrt[e]{\pi_K}$ がすべての自己同型を与え、Galois 群は巡回位数 $e$ です。

全分岐なので単数の全ての共役は剰余で一致し、$N(x)\bmod\mathfrak p_K=(\bar x)^e$ です。逆に単数 $u$ の剰余が $e$ 乗なら、$T^e-u$ は単純剰余根を持ち、Hensel による $a^e=u$（$a\in K^\times$）から $N(a)=u$ となります。従って単数ノルムの剰余はちょうど $(k_K^\times)^e$ です。$f=1$ と[完全列](#prop-anf16-valuation-unit-sequence)から指数は $[k_K^\times:(k_K^\times)^e]=e$ です。
<!-- solution-end -->

### B2. 四次拡大で $5$ がノルムでない理由

$L=\mathbb Q_5(\sqrt[4]5)$、$K=\mathbb Q_5$ とする。ノルム部分群と指数を求め、$5$ と $-5$ の判定を行え。

- Level: B
- ID: ANF16-B2

<!-- solution-start -->
**詳細解答。** $e=4$ は $q-1=4$ を割るので[緩分岐巡回拡大の命題](#prop-anf16-tame-kummer-norm)を適用できます。$\mathbb F_5^\times$ の四乗は $\{1\}$ だから $N(\mathcal O_L^\times)=1+5\mathbb Z_5$、また最小多項式 $T^4-5$ の定数項から $N(\sqrt[4]5)=(-1)^5 5=-5$ です。従って

$$
N(L^\times)=\langle-5\rangle(1+5\mathbb Z_5),
\qquad [K^\times:N(L^\times)]=4.
$$

$-5$ は表示からノルムです。しかし $5=(-5)(-1)$ で $-1\bmod5=4\notin\{1\}$、従って $-1$ は単数ノルムではなく、$5$ はノルムではありません。
<!-- solution-end -->

### B3. 非分岐三次の候補部分群を実現する

$K/\mathbb Q_p$ を有限拡大とし、$H=\pi_K^{3\mathbb Z}\mathcal O_K^\times$ とする。$H$ が開有限指数であることと、非分岐三次拡大 $E/K$ のノルム群に等しいことを確認せよ。

- Level: B
- ID: ANF16-B3

<!-- solution-start -->
**詳細解答。** $K^\times=\pi_K^{\mathbb Z}\mathcal O_K^\times$ から $K^\times/H$ は付値を $3$ で割った剰余によって $\mathbb Z/3\mathbb Z$ と同型です。よって指数 $3$。$U_K^1\subset\mathcal O_K^\times\subset H$ なので $H$ は開です。

有限体 $\mathbb F_{q^3}/\mathbb F_q$ の非分岐持ち上げにより非分岐三次拡大 $E/K$ が存在します。[非分岐ノルム商](../ANF15/index.md#prop-anf15-unramified-norm-quotient)は $N_{E/K}(E^\times)=\pi_K^{3\mathbb Z}\mathcal O_K^\times$ を与えます。従ってこの $H$ については一般存在定理を使わずに実現できました。
<!-- solution-end -->

### B4. 必要条件と存在定理の論理

$K=\mathbb Q_3$、$H=3^{2\mathbb Z}(1+3\mathbb Z_3)$ とする。$H$ の指数を求め、(i) 第2節だけから言えること、(ii) 一般存在定理を使えば追加で言えることを区別せよ。

- Level: B
- ID: ANF16-B4

<!-- solution-start -->
**詳細解答。** $K^\times=3^{\mathbb Z}\mathbb Z_3^\times$ で、$\mathbb Z_3^\times/(1+3\mathbb Z_3)\cong\mathbb F_3^\times$ は位数 $2$ です。付値の偶奇にも位数 $2$ の商があるので

$$
[K^\times:H]=2\cdot2=4.
$$

$U_K^1=1+3\mathbb Z_3\subset H$ より $H$ は開です。(i) [有限拡大ノルム群の開性定理](#thm-anf16-norm-open-finite)は「既に $L$ があればそのノルム群は開有限指数」を述べるので、$H$ が開であるという逆向きの情報だけでは $L$ の存在を導けません。(ii) [一般存在定理](#thm-anf16-local-existence)を外部定理として用いるなら、この $H$ をノルム群とする有限 Abel 拡大 $L/K$ が一意に存在し、$[L:K]=[K^\times:H]=4$ と結論できます。ここで存在の根拠は第2節ではなく一般存在定理です。
<!-- solution-end -->

### C1. 四次・二次のノルム群と商の射影

$K=\mathbb Q_5$、$L=K(\sqrt[4]5)$、$M=K(\sqrt5)\subset L$ とする。

1. $L/K$ と $M/K$ のノルム部分群 $H_L,H_M$ を求め、それぞれの指数を計算せよ。
2. $H_L\subset H_M$ を単数と付値の両方から確認せよ。
3. $K^\times/H_L$ が $[2]$ で生成される位数 $4$ の巡回群であり、$[5]=[2]^2$ であることを示せ。
4. 自然な全射 $K^\times/H_L\to K^\times/H_M$ の核を記述し、全分岐でも一様化元の類が自明とは限らない理由を説明せよ。

- Level: C
- ID: ANF16-C1

<!-- solution-start -->
**詳細解答。**

**第1問。** [緩分岐ノルムの命題](#prop-anf16-tame-kummer-norm)を $e=4$ と $e=2$ に適用します。$e=4$ では $\mathbb F_5^\times$ の四乗集合が $\{1\}$、$e=2$ では平方集合が $\{1,4\}$ です。いずれもノルム一様化元は $-5$ ですが、$e=2$ では $-1$ が単数ノルムであるため $5$ もノルムです。よって

$$
\begin{aligned}
H_L&=\langle-5\rangle(1+5\mathbb Z_5),&
[K^\times:H_L]&=4,\\
H_M&=5^{\mathbb Z}
\{u\in\mathbb Z_5^\times:\bar u\in\{1,4\}\},&
[K^\times:H_M]&=2.
\end{aligned}
$$

**第2問。** $1+5\mathbb Z_5$ の剰余は全て $1$ で、従って $H_M$ の単数部分に入ります。$-5=5(-1)$ で $-1\bmod5=4$ は平方なので $-5\in H_M$ です。$H_L$ の二つの生成部分がいずれも $H_M$ に含まれるので $H_L\subset H_M$。これは[塔の命題](#prop-anf16-norm-tower)とも一致します。

**第3問。** $2\bmod5$ は $\mathbb F_5^\times$ の生成元で、四乗集合は $\{1\}$ です。従って $[2]$ の位数は $4$。一方 $[4]=[2]^2$ で、$5/4=(-5)(-1/4)$ の単数部分 $-1/4$ は法 $5$ で $1$ なので $-1/4\in1+5\mathbb Z_5$ です。従って $5/4\in H_L$、すなわち $[5]=[4]=[2]^2$ です。

**第4問。** 商の自然な全射で $[2]\in K^\times/H_L$ は $H_M$ でも非平方剰余なので非自明な類へ写りますが、$[2]^2$ は平方剰余なので自明な類へ写ります。従って核は $\{[1],[2]^2\}$ で位数 $2$ です。$L/K$ は全分岐で $f=1$ ですが、$5$ の類は四次ノルム商で $[2]^2\ne1$ です。全分岐が保証するのはノルムの付値が全整数に届くことだけであり、$5$ 自体がノルムになるかは符号を含む単数成分で決まります。
<!-- solution-end -->

この講で計算した開有限指数部分群の例は、一般の存在定理の具体的な影です。次はこれらの商を局所 Galois 群へ矛盾なく対応させる方法を学びます。
