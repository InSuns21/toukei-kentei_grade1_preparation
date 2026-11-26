# ATOP18 相対ホモロジーと長完全列

[ATOP16](../ATOP16/index.md) では空間の中で境界を持たない鎖を調べ、[ATOP17](../ATOP17/index.md) では連続変形がホモロジーを変えないことを学びました。ところが、区間の両端を指定して「端点間を結ぶ道」を調べると、その道は境界を持つため普通の1次サイクルではありません。両端を無視したときには閉じた鎖と考えられないでしょうか。

円板を埋める鎖とその境界円にも同じ関係があります。本講では部分空間の中の鎖を零とすることで、境界が部分空間に入る鎖を扱います。その結果、空間全体・部分空間・両者の相対的な情報を一つの列で結び付けられます。係数は全て整数とし、負次数の通常の鎖群・ホモロジー群は零とします。

## 1. 空間の対と鎖の商

位相空間 $X$ の中で、境界を無視してよい部分を $A$ として選びます。$A$ が開集合や閉集合である必要はありません。$A$ には $X$ からの部分空間位相を入れます。

<a id="def-atop18-pair"></a>

<!-- formal-statement-start -->
> **定義（空間の対）**
> 位相空間 $X$ とその部分空間 $A$ の組 $(X,A)$ を空間の対とする。
> 二つの対 $(X,A),(Y,B)$ の間の写像とは、連続写像 $f:X\to Y$ で $f(A)\subset B$ を満たすものである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-atop18-pair -->
**定義の確認**

$I=[0,1]$、$E=\{0,1\}$ とすれば $E\subset I$ で、部分空間位相は離散位相です。従って $(I,E)$ は対です。$f(t)=1-t$ は連続で $f(0)=1,f(1)=0$ なのでこの対から自身への写像です。一方、定数写像 $g(t)=1/2$ は連続ですが $g(E)=\{1/2\}\not\subset E$ なので対の写像ではありません。
<!-- definition-example-end -->

[特異鎖群](../ATOP16/index.md#def-atop16-singular-chains) $C_n(A)$ は、包含 $i:A\hookrightarrow X$ によって $C_n(X)$ の部分群とみなせます。

実際、二つの異なる連続写像 $\Delta^n\to A$ は $i$ と合成しても異なります。自由アーベル群の異なる基底元が異なる基底元へ移るため、$i_\#$ は単射です。

逆に、$X$ への特異単体で像が $A$ に含まれるものは、部分空間位相の定義から $A$ への連続写像として読めます。

[特異境界作用素](../ATOP16/index.md#def-atop16-singular-boundary)は単体をその面へ制限するので、像が $A$ に含まれるなら全ての面の像も $A$ に入ります。従って $\partial C_n(A)\subset C_{n-1}(A)$ です。これが部分空間の鎖を無視しても境界を計算できる理由です。

相対鎖群では、$A$ の内部だけにある鎖の差を同一視します。以下、鎖の剰余類には上線を付け、ホモロジー類には角括弧を用います。

<a id="def-atop18-relative-chain"></a>

<!-- formal-statement-start -->
> **定義（相対特異鎖群）**
> 空間の対 $(X,A)$ の整数係数相対特異鎖群とその境界作用素を、各非負整数 $n$ に対し

$$
C_n(X,A)=C_n(X)/C_n(A),\qquad
\bar\partial_n\bar c=\overline{\partial_n c}
$$

> とする。ここで $\bar c=c+C_n(A)$ であり、負次数の鎖群は零とする。
<!-- formal-statement-end -->

代表元を $c'=c+a$（$a\in C_n(A)$）に変えると $\partial c'-\partial c=\partial a\in C_{n-1}(A)$ です。従って商での境界は一致します。また加法は元の境界の線形性から保存されます。[特異鎖の二重境界の消滅](../ATOP16/index.md#thm-atop16-singular-boundary-square)により

$$
\bar\partial_{n-1}\bar\partial_n\bar c
=\overline{\partial_{n-1}\partial_n c}=0.
$$

従ってこの商も鎖複体です。

<!-- definition-example-start: def-atop18-relative-chain -->
**定義の確認**

$(I,E)$ を取り、$\sigma:\Delta^1\to I$ を $t$ 座標で $\sigma(t)=t$ とします。点 $x$ の0単体を $\langle x\rangle$ と書くと

$$
\partial\sigma=\langle1\rangle-\langle0\rangle.
$$

両端は $E$ に入るので $\bar\partial\bar\sigma=0$ です。一方、$\sigma$ の像は $E$ に含まれず、自由基底の独立性から $\sigma\notin C_1(E)$、つまり $\bar\sigma\ne0$ です。$E$ に入る定数1単体 $k$ を加えた $\sigma+k$ も同じ相対鎖です。$\partial k=0$ なので境界も一致します。これで零でない相対鎖が相対境界零になる具体例を得ました。
<!-- definition-example-end -->

## 2. 相対サイクルとホモロジー

絶対ホモロジーでは境界が零の鎖を集めました。相対鎖では、元の境界が $A$ 内にあれば商で零になります。また、二つの相対サイクルが相対的な境界だけ異なるとき同じホモロジー類とします。

<a id="def-atop18-relative-homology"></a>

<!-- formal-statement-start -->
> **定義（相対ホモロジー群）**
> 空間の対 $(X,A)$ に対し、整数係数の相対特異鎖複体の相対サイクル群、相対境界群および相対ホモロジー群を各 $n\ge0$ で

$$
\begin{aligned}
Z_n(X,A)&=\ker\bar\partial_n,\\
B_n(X,A)&=\operatorname{im}\bar\partial_{n+1},\\
H_n(X,A)&=Z_n(X,A)/B_n(X,A)
\end{aligned}
$$

> とする。相対サイクル $\bar c$ のホモロジー類を $[\bar c]$ と書く。
<!-- formal-statement-end -->

二重境界が零なので $B_n(X,A)\subset Z_n(X,A)$ であり、商を取れます。代表元を元の空間の鎖で書くと

$$
\bar c\in Z_n(X,A)\ \Longleftrightarrow\
\partial c\in C_{n-1}(A).
$$

二つのサイクル $\bar c,\bar c'$ の類が等しい条件は、差が相対境界になることです。すなわち、ある $b\in C_{n+1}(X)$ と $a\in C_n(A)$ に対して

$$
c'-c=\partial b+a
$$

となることです。実際、商で $\bar c'-\bar c=\overline{\partial b}$ という等式を元の鎖に戻せばこの条件になり、逆にこの等式を商へ送ればホモロジー類が一致します。

<!-- definition-example-start: def-atop18-relative-homology -->
**定義の確認**

$X=I$、$A=\{0\}$ とします。任意の $x\in I$ に対し0鎖 $\overline{\langle x\rangle}$ はサイクルです（0次境界は零）。$\gamma_x(t)=tx$ は連続で

$$
\bar\partial\bar\gamma_x
=\overline{\langle x\rangle-\langle0\rangle}
=\overline{\langle x\rangle}.
$$

任意の0鎖は点の有限整数線形結合なので、その各点に同じ構成を適用すると全ての相対0サイクルが相対境界になります。従って $H_0(I,\{0\})=0$ です。$C_0(I,\{0\})$ 自体は例えば $\overline{\langle1\rangle}\ne0$ を含みます。鎖が零でないこととホモロジー類が零でないことを区別しましょう。
<!-- definition-example-end -->

$A=\varnothing$ なら $C_n(A)=0$ なので $H_n(X,\varnothing)=H_n(X)$、$A=X$ なら商が零なので $H_n(X,X)=0$ です。

対の写像 $f$ は $A$ 内の鎖を $B$ 内へ送るので、商でも写像を作れます。これは相対群を空間の変換に沿って比較するための道具です。

<a id="thm-atop18-relative-map"></a>

<!-- formal-statement-start -->
> **定理（相対ホモロジーの誘導準同型）**
> 対の写像 $f:(X,A)\to(Y,B)$ は全ての $n\ge0$ に対して整数係数の準同型

$$
H_n(f):H_n(X,A)\to H_n(Y,B),\qquad
[\bar c]\mapsto[\overline{f_\#c}]
$$

> を誘導する。この対応は恒等写像と合成を保存する。ここで $f_\#$ は特異鎖の誘導準同型である。
<!-- formal-statement-end -->

見取り図：商で無視する鎖が写像先でも無視できること、境界と写像が交換することの二点を確かめます。

<!-- proof-start -->
### 証明

[特異鎖の誘導準同型](../ATOP16/index.md#def-atop16-induced-chain-map)は単体 $\sigma$ を $f\circ\sigma$ に送ります。$f(A)\subset B$ なので $f_\#C_n(A)\subset C_n(B)$。従って $\bar c$ の代表元の変更は像の剰余類を変えません。[特異鎖の誘導準同型と境界の可換性](../ATOP16/index.md#thm-atop16-chain-map)から

$$
\bar\partial\overline{f_\#c}
=\overline{f_\#\partial c}.
$$

$\partial c$ が $A$ の鎖なら右辺は零です。さらに $c'-c=\partial b+a$ なら

$$
f_\#c'-f_\#c=\partial(f_\#b)+f_\#a,
$$

最後の項は $C_n(B)$ に入ります。従ってホモロジー類の選び方にも依存せず、線形性から加法を保存します。単体上で恒等写像との合成は元の単体、二写像の合成は合成写像による像となります。この等式は有限線形結合、商、ホモロジー類に順に降りるため恒等写像と合成が保存されます。
<!-- proof-end -->

例えば $(I,E)$ の反転 $f(t)=1-t$ は $\bar\sigma$ を $\overline{f\circ\sigma}$ に送ります。その境界の代表元は $\langle0\rangle-\langle1\rangle$ です。向きの逆転を相対類から読み出すには、次の写像が必要です。

## 3. 境界を取り出す接続準同型

相対サイクルの代表元 $c$ は絶対サイクルとは限りません。しかしその境界は $A$ に入っており、さらに境界を取ると零になります。そこで相対サイクルを $A$ の一つ下の次数の絶対サイクルへ送ることができます。重要なのは、代表元を変えても得られるホモロジー類が変わらないことです。

<a id="thm-atop18-connecting"></a>

<!-- formal-statement-start -->
> **定理（相対ホモロジーの接続準同型）**
> 空間の対 $(X,A)$ と整数 $n\ge1$ に対し、整数係数の写像

$$
\delta_n:H_n(X,A)\to H_{n-1}(A),\qquad
\delta_n([\bar c])=[\partial c]
$$

> は代表元によらず定まる準同型である。ここで $c\in C_n(X)$ は $\partial c\in C_{n-1}(A)$ を満たす代表元である。$n=0$ では $\delta_0:H_0(X,A)\to0$ を零写像とする。
<!-- formal-statement-end -->

見取り図：相対類を元の鎖に持ち上げ、その境界を $A$ の鎖として読みます。持ち上げを変更しても、境界の差は $A$ の内部で埋められます。

<!-- proof-start -->
### 証明

相対サイクルの代表元 $c$ について $\partial c\in C_{n-1}(A)$ です。包含が単射で、$A$ でも境界の計算が同じであるため、$\partial^2c=0$ は $A$ 内の等式でもあります。従って $[\partial c]$ は $H_{n-1}(A)$ の元です。

同じ相対ホモロジー類の別の代表元を $c'$ とします。[相対ホモロジー群](#def-atop18-relative-homology)の代表元の条件により $c'-c=\partial b+a$ と書けます。ここで $b\in C_{n+1}(X)$、$a\in C_n(A)$ です。境界を取ると

$$
\partial c'-\partial c=\partial^2b+\partial a=\partial a.
$$

右辺は $A$ の境界鎖なので、$[\partial c']=[\partial c]$ が $H_{n-1}(A)$ で成立します。$b=0$ とすれば同一相対鎖の持ち上げだけを変更した場合も含みます。二つの代表元の和は類の和の代表元となり、境界が加法的なので $\delta_n$ も加法的です。0次では値域が零群なので自動的に準同型です。
<!-- proof-end -->

$(I,E)$ の $\sigma(t)=t$ なら

$$
\delta_1([\bar\sigma])=[\langle1\rangle-\langle0\rangle].
$$

$E$ は離散二点空間であるため、[0次特異ホモロジーと道連結成分](../ATOP16/index.md#thm-atop16-h0-path-components)から $H_0(E)\cong\mathbb Z^2$ です。二つの点をそれぞれ独立な基底とすると上式は座標 $(-1,1)$ であり零ではありません。従って $[\bar\sigma]\ne0$ です。両端を無視した道の相対的な情報を、端点の差として検出できました。

## 4. 三種類の群を結ぶ長い列

$A$ の鎖を $X$ に含める写像 $i$ と、$X$ の鎖を商へ送る写像 $q$ を考えます。各次数で $i$ は単射、$q$ は全射で、$q$ の核がちょうど $i$ の像です。

$$
0\longrightarrow C_n(A)\xrightarrow{i}
C_n(X)\xrightarrow{q}C_n(X,A)
\longrightarrow0.
$$

[完全列](../../../基礎論系/CATB/CATB1-05/index.md#def-catb1-05-exact)の条件をアーベル群の準同型の場合に読み直すと、連続する二写像の中間で前の像と次の核が等しいことです。ここでは圏論的な一般化ではなく、核と像を部分群として扱う具体例だけを使います。

両端に零群がある上式は各次数の[短完全列](../../../基礎論系/CATB/CATB1-05/index.md#def-catb1-05-short-exact)です。ただしホモロジーを取ると同じ短い列のまま完全になるとは限りません。

例えば $H_0(E)\to H_0(I)$ は二つの点の差を零へ送るため単射ではありません。その失われた情報を一つ上の相対群から補うのが接続準同型です。

包含から誘導される写像を $i_*$、商から誘導される写像を $j_*$ と書きます。$j_*[z]=[\bar z]$ は絶対サイクルを相対サイクルへ送り、絶対境界を相対境界へ送るので準同型です。

<a id="thm-atop18-long-exact"></a>

<!-- formal-statement-start -->
> **定理（対のホモロジー長完全列）**
> 任意の空間の対 $(X,A)$ に対し、整数係数の列

$$
\begin{gathered}
\cdots\xrightarrow{\delta_{n+1}}H_n(A)
\xrightarrow{i_*}H_n(X)\\
\xrightarrow{j_*}H_n(X,A)
\xrightarrow{\delta_n}H_{n-1}(A)
\xrightarrow{i_*}\cdots\\
\cdots\longrightarrow H_0(A)\xrightarrow{i_*}H_0(X)
\xrightarrow{j_*}H_0(X,A)\longrightarrow0
\end{gathered}
$$

> は完全である。上段から中段は $n\ge1$ の部分を表す。すなわち各群で直前の写像の像は直後の写像の核に一致する。$i_*$ は包含、$j_*$ は鎖の商から誘導され、$\delta_n[\bar c]=[\partial c]$ である。
<!-- formal-statement-end -->

見取り図：三つの写像を一周するたびに次数が一つ下がります。隣接する写像の合成が零であるだけでは十分ではなく、次の写像で消える元を全て直前の写像の像として復元できることを示します。

<!-- proof-start -->
### 証明

包含を鎖群の実際の包含として書き、境界を $\partial$ と略します。各位置で両方向の包含を確認します。

**(1) $H_n(X)$ での完全性：$\operatorname{im}i_*=\ker j_*$。**

$A$ のサイクル $a$ は商で零なので $j_*i_*[a]=0$ です。逆に $z\in C_n(X)$ がサイクルで $j_*[z]=0$ とします。すると $\bar z=\bar\partial\bar b$ となる $b\in C_{n+1}(X)$ が存在します。よって

$$
a=z-\partial b\in C_n(A),\qquad
\partial a=\partial z-\partial^2 b=0.
$$

$a$ は $A$ のサイクルで、$z-a=\partial b$ は $X$ の境界です。従って $[z]=i_*[a]$ となります。これは $n=0$ でも成立します。

**(2) $H_n(X,A)$ での完全性：$\operatorname{im}j_*=\ker\delta_n$（$n\ge1$）。**

絶対サイクル $z$ は $\partial z=0$ なので $\delta_n j_*[z]=0$ です。逆に $\delta_n[\bar c]=0$ とすると $[\partial c]=0$ が $H_{n-1}(A)$ で成立します。従って $a\in C_n(A)$ で $\partial a=\partial c$ となるものが存在します。

$$
z=c-a,\qquad \partial z=\partial c-\partial a=0.
$$

$z$ は絶対サイクルであり、$\bar z=\bar c$ なので $j_*[z]=[\bar c]$ です。$n=0$ では任意の相対0鎖の持ち上げは絶対0サイクルですから $j_*$ は全射です。これは次が零群である場合の完全性です。

**(3) $H_n(A)$ での完全性：$\operatorname{im}\delta_{n+1}=\ker i_*$（$n\ge0$）。**

相対サイクルの代表元 $c\in C_{n+1}(X)$ に対し $\delta_{n+1}[\bar c]=[\partial c]$ は $X$ で境界なので、$i_*\delta_{n+1}[\bar c]=0$ です。逆に $a\in C_n(A)$ がサイクルで $i_*[a]=0$ とすると、$X$ 内で $a=\partial c$ となる $c\in C_{n+1}(X)$ が存在します。

$$
\bar\partial\bar c=\bar a=0,\qquad
\delta_{n+1}[\bar c]=[a].
$$

ゆえに $[a]$ は接続準同型の像です。以上の三位置と0次末端で列の全ての位置が尽くされました。
<!-- proof-end -->

この証明の要点は、$X$ 内で境界になる $A$ のサイクルは、ちょうど相対的に閉じた鎖の境界だということです。逆向きに、相対サイクルが絶対ホモロジー類に由来するためには、取り出した境界が $A$ の中でも埋められる必要があります。

## 5. 対の写像と長完全列

空間の対を変換すると、長完全列の三つの群がそれぞれ変換されます。接続準同型だけ先に適用してから $A$ 上の写像を適用しても、先に対を変換してから接続準同型を適用しても結果は同じになることを確認しましょう。このように写像の順序を交換しても同じ結果が得られる性質を自然性といいます。

<a id="thm-atop18-naturality"></a>

<!-- formal-statement-start -->
> **定理（対の長完全列の自然性）**
> 対の写像 $f:(X,A)\to(Y,B)$ とその制限 $f_A:A\to B$ に対し、整数係数の長完全列の各対応する四角形は可換である。絶対群上の写像を $H_n(f)$、相対群上の写像を $H_n(f_{\mathrm{rel}})$ と区別して書くと、各 $n\ge0$ で

$$
\begin{aligned}
H_n(f)i_*^X&=i_*^Y H_n(f_A),\\
H_n(f_{\mathrm{rel}})j_*^X&=j_*^Y H_n(f),
\end{aligned}
$$

> また各 $n\ge1$ で

$$
H_{n-1}(f_A)\delta_n^X
=\delta_n^Y H_n(f_{\mathrm{rel}})
$$

> が成立する。上付きの $X,Y$ はそれぞれ対 $(X,A),(Y,B)$ の列を指す。
<!-- formal-statement-end -->

見取り図：包含、商、境界について、どちらの順番で操作しても同じ鎖になることを確認します。

<!-- proof-start -->
### 証明

包含については $f\circ i_X=i_Y\circ f_A$ が点ごとに成立するので、[特異ホモロジーの誘導準同型](../ATOP16/index.md#thm-atop16-induced-homology)の合成保存から第1式を得ます。絶対サイクル $z$ を商と写像で二通りに送ると、[相対ホモロジーの誘導準同型](#thm-atop18-relative-map)によりどちらも $[\overline{f_\#z}]$ となるので第2式が成立します。

相対サイクルの代表元 $c\in C_n(X)$ に対し、[相対ホモロジーの接続準同型](#thm-atop18-connecting)を用いると

$$
\begin{aligned}
H_{n-1}(f_A)\delta_n^X[\bar c]
&=[(f_A)_\#\partial c],\\
\delta_n^Y H_n(f_{\mathrm{rel}})[\bar c]
&=[\partial(f_\#c)].
\end{aligned}
$$

$\partial c\in C_{n-1}(A)$ なので $(f_A)_\#\partial c$ は $B$ の鎖で、その $Y$ 内の像は $f_\#\partial c$ です。[特異鎖の誘導準同型と境界の可換性](../ATOP16/index.md#thm-atop16-chain-map)により $f_\#\partial c=\partial(f_\#c)$ です。$C_{n-1}(B)\to C_{n-1}(Y)$ の単射性から $B$ 内の鎖としても一致し、第3式が従います。0次の末端の四角形は零写像なので可換です。
<!-- proof-end -->

例えば区間反転は $H_0(E)$ の基底を交換するので、端点差を負に変えます。後で示すように区間と両端点の相対1次群は端点差で完全に判定できるため、反転は相対1次群でも符号を逆転します。

## 6. 長完全列による計算

### 区間と両端点

$I$ は点0へ $H(x,t)=(1-t)x$ で収縮します。連続で値が $I$ 内にあり、端点時刻で恒等写像と定数写像になります。[可縮空間の被約特異ホモロジー](../ATOP17/index.md#cor-atop17-contractible)により正次数は零です。$I$ は道連結なので [0次特異ホモロジーと道連結成分](../ATOP16/index.md#thm-atop16-h0-path-components) から $H_0(I)=\mathbb Z$ です。

$E$ の任意の特異単体は定数です。標準単体は道連結（任意の二点を線分で結べる）なので、その連続像は離散二点の一方だけに入ります。各点の定数単体 $k_n$ について

$$
\partial_n k_n=
\begin{cases}
0 & n\text{ が奇数},\\
k_{n-1}& n>0\text{ が偶数}
\end{cases}
$$

となり、正次数のホモロジーは零です。0次は二つの点が基底です。[対のホモロジー長完全列](#thm-atop18-long-exact)の低次数部分は

$$
0\longrightarrow H_1(I,E)
\xrightarrow{\delta_1}\mathbb Z^2
\xrightarrow{i_*}\mathbb Z
\xrightarrow{j_*}H_0(I,E)\longrightarrow0.
$$

$i_*$ は両点を同じ道連結成分に送るため $(u,v)\mapsto u+v$ です。よって全射で、その核は $\{(-v,v):v\in\mathbb Z\}$。完全性により $\delta_1$ は単射で、像がこの核なので

$$
H_1(I,E)\cong\mathbb Z,\qquad H_0(I,E)=0.
$$

$\sigma(t)=t$ の境界は $\langle1\rangle-\langle0\rangle$ なので、この相対類は $H_1(I,E)$ の生成元です。$n\ge2$ では $H_n(I)=0$ と $H_{n-1}(E)=0$ の間に $H_n(I,E)$ が入るため零になります。

### 円板と境界円

$D^2=\{x\in\mathbb R^2:\|x\|\le1\}$、$S^1=\{x:\|x\|=1\}$ とします。$D^2$ は原点への収縮 $(x,t)\mapsto(1-t)x$ を持ち、ノルムが $1$ 以下に保たれるので連続な収縮です。[可縮空間の被約特異ホモロジー](../ATOP17/index.md#cor-atop17-contractible)から正次数の絶対群が零です。また円板と円周は道連結（円板では線分、円周では円弧で結ぶ）なので、[0次特異ホモロジーと道連結成分](../ATOP16/index.md#thm-atop16-h0-path-components)から包含による $H_0(S^1)\to H_0(D^2)$ は $\mathbb Z$ の生成元を生成元へ送る同型です。

$n\ge2$ に対し [対のホモロジー長完全列](#thm-atop18-long-exact) は

$$
0\longrightarrow H_n(D^2,S^1)
\xrightarrow{\delta_n}H_{n-1}(S^1)
\longrightarrow0
$$

となるので $\delta_n$ が同型です。低次数では $H_1(D^2)=0$ と $H_0(S^1)\to H_0(D^2)$ の単射性から $\delta_1$ は単射かつ像が零です。さらに0次の包含写像は全射なので

$$
H_1(D^2,S^1)=H_0(D^2,S^1)=0.
$$

特に $H_2(D^2,S^1)\cong H_1(S^1)$。円周の1サイクルを円板内で埋めることと、その相対2次類が対応するわけです。円周の特異ホモロジー群そのものの計算は後続の講義で整える道具を使って行います。ここでは同型の構成に円周の群の値を仮定していません。

実際に境界を作るには、円周上の任意の特異1サイクル $z$ に対し円板の $H_1(D^2)=0$ を使えば、円板内の2鎖 $c$ で $\partial c=z$ となるものが存在します。$\bar c$ は相対サイクルで $\delta_2[\bar c]=[z]$ です。この説明は円周の三角形分割を特異鎖の計算と無条件に同一視する必要がありません。


具体的な2単体を一つ構成しましょう。円周を一周する道を $\ell(t)=(\cos(2\pi t),\sin(2\pi t))$ とします。標準2単体の重心座標 $(s_0,s_1,s_2)$ に対し $r=s_1+s_2$ と置き、

$$
\tau(s_0,s_1,s_2)=
\begin{cases}
r\ell(s_2/r)&r>0,\\
0&r=0
\end{cases}
$$

とします。$0\le s_2/r\le1$ で $\|\tau\|=r\le1$ なので値域は円板に入ります。

$r>0$ では連続で、$r\to0$ でもノルムが $r$ なので原点へ収束します。よって特異2単体です。

頂点0を除いた面は $r=1$ で $\ell$ になります。頂点1または2を除いた面はそれぞれ $\ell(1)$ または $\ell(0)$ への動径方向の道です。

$\ell(1)=\ell(0)$ なのでこの二つの面は同じ特異1単体 $\rho$ です。[特異境界作用素](../ATOP16/index.md#def-atop16-singular-boundary)から

$$
\partial\tau=\ell-\rho+\rho=\ell.
$$

円周上の道 $\ell$ は始点と終点が一致するのでサイクルです。従って $\bar\tau$ は相対サイクルで、[相対ホモロジーの接続準同型](#thm-atop18-connecting)によって $\delta_2[\bar\tau]=[\ell]$ となります。これが円板内の鎖から境界円上の類を取り出す具体的な計算です。

## 7. 演習

### 演習 ATOP18-A1：対の写像かどうか

- Level: A

$(I,E)$ に対する $f(t)=t^2$ と $g(t)=t/2$ が対の写像かを判定せよ。また $f$ が端点差へ誘導する写像を計算せよ。

<!-- solution-start -->
**詳細解答**

いずれも連続で値域は $I$ に入ります。$f(0)=0,f(1)=1$ なので $f(E)\subset E$ であり、[空間の対](#def-atop18-pair)の条件を満たします。$g(1)=1/2\notin E$ なので $g$ は条件を満たしません。$f|_E$ は恒等写像で、0鎖の誘導写像は各点をその像へ送ります。よって

$$
(f|_E)_\#(\langle1\rangle-\langle0\rangle)
=\langle1\rangle-\langle0\rangle.
$$

[0次特異ホモロジーと道連結成分](../ATOP16/index.md#thm-atop16-h0-path-components)からこの差の座標は $(-1,1)$ のままです。
<!-- solution-end -->

### 演習 ATOP18-A2：相対サイクルの判定

- Level: A

$X=I$、$A=E$ とし、$\alpha(t)=t/2$、$\beta(t)=(1+t)/2$ を特異1単体とする。$\bar\alpha$ と $\overline{\alpha+\beta}$ のうち相対サイクルになるものを判定し、後者の接続準同型の値を求めよ。

<!-- solution-start -->
**詳細解答**

[特異境界作用素](../ATOP16/index.md#def-atop16-singular-boundary)は終点から始点を引きます。

$$
\partial\alpha=\langle1/2\rangle-\langle0\rangle,\qquad
\partial\beta=\langle1\rangle-\langle1/2\rangle.
$$

$\langle1/2\rangle$ は $C_0(E)$ の基底に入らないので $\bar\partial\bar\alpha=\overline{\langle1/2\rangle}\ne0$ です。一方、和を取ると中点が相殺して $\partial(\alpha+\beta)=\langle1\rangle-\langle0\rangle\in C_0(E)$ となります。従って後者だけが相対サイクルです。[相対ホモロジーの接続準同型](#thm-atop18-connecting)よりその像は $H_0(E)$ で座標 $(-1,1)$ です。
<!-- solution-end -->

### 演習 ATOP18-A3：代表元と境界の変化

- Level: A

$c$ を相対 $n$ サイクルの持ち上げとし、$c'=c+\partial b+a$ とする。$n\ge1$、$b\in C_{n+1}(X)$、$a\in C_n(A)$ とする。$c'$ も相対サイクルで、接続準同型の値が同じことを式で示せ。

<!-- solution-start -->
**詳細解答**

境界を取ると $\partial c'=\partial c+\partial^2 b+\partial a$ です。[特異鎖の二重境界の消滅](../ATOP16/index.md#thm-atop16-singular-boundary-square)から中項は零です。$\partial c,\partial a$ はともに $C_{n-1}(A)$ に入るので $c'$ も相対サイクルです。

$$
\partial c'-\partial c=\partial a.
$$

これは $A$ の境界であり $H_{n-1}(A)$ で零になります。従って $[\partial c']=[\partial c]$ です。ここでは $b$ の境界は二重境界の消滅で、$a$ の境界は $A$ のホモロジーで零になるという異なる二つの理由を使っています。
<!-- solution-end -->

### 演習 ATOP18-A4：0次の相対群

- Level: A

$X$ が非空の道連結空間で、$A$ が非空の部分空間とする。$H_0(X,A)$ を、長完全列を使わずに求めよ。

<!-- solution-start -->
**詳細解答**

$a\in A$ を一つ選びます。任意の $x\in X$ について道連結性から $a$ から $x$ への道 $\gamma_x$ が存在します。その境界は $\langle x\rangle-\langle a\rangle$ で、商では $\overline{\langle a\rangle}=0$ です。従って

$$
\bar\partial\bar\gamma_x=\overline{\langle x\rangle}.
$$

任意の相対0鎖 $\sum_x m_x\overline{\langle x\rangle}$ は有限和ですから、その各項に対応する道を同じ係数で足せば境界として表せます。[相対ホモロジー群](#def-atop18-relative-homology)の0次サイクルは全ての相対0鎖なので $H_0(X,A)=0$ です。$A$ の道連結性は使っていません。
<!-- solution-end -->

### 演習 ATOP18-B1：持ち上げを絶対サイクルへ直す

- Level: B

$\bar c$ を相対 $n$ サイクル（$n\ge1$）とする。$[\partial c]=0$ が $H_{n-1}(A)$ で成立するとき、絶対サイクル $z$ で $\bar z=\bar c$ となるものを構成せよ。また $H_{n-1}(X)$ で $[\partial c]=0$ となるだけでは不十分であることを区間の例で示せ。

<!-- solution-start -->
**詳細解答**

$[\partial c]=0$ が $A$ 内で成立するので、ある $a\in C_n(A)$ が存在して $\partial a=\partial c$ となります。$z=c-a$ と置くと

$$
\partial z=\partial c-\partial a=0,\qquad
\bar z=\bar c-\bar a=\bar c.
$$

これは必要な絶対サイクルです。逆に $\bar z=\bar c$ で $\partial z=0$ なら $c-z\in C_n(A)$ で $\partial(c-z)=\partial c$ なので、境界は $A$ の中でも埋まります。

$(I,E)$ の $\sigma(t)=t$ では $\partial\sigma=\langle1\rangle-\langle0\rangle$ は $I$ で境界ですが、$E$ では異なる道連結成分の差なので [0次特異ホモロジーと道連結成分](../ATOP16/index.md#thm-atop16-h0-path-components) により零でありません。従って $E$ の1鎖で同じ境界を持つものがなく、同じ相対鎖を表す絶対サイクルは存在しません。
<!-- solution-end -->

### 演習 ATOP18-B2：三点を指定した区間

- Level: B

$X=I$、$A=\{0,1/2,1\}$ とする。全次数の相対ホモロジー群を求め、道 $\alpha(t)=t/2$、$\beta(t)=(1+t)/2$ が作る相対類が1次群の基底になることを示せ。

<!-- solution-start -->
**詳細解答**

$I$ は可縮なので [可縮空間の被約特異ホモロジー](../ATOP17/index.md#cor-atop17-contractible) より正次数の群が零です。$A$ は離散三点で全ての特異単体が定数です。各点について境界の交代符号の和は正の偶数次数で1、奇数次数で0です。従って正の偶数次数では核が零、奇数次数では核と次の境界の像がともに全体となり、正次数は零です。

0次では [0次特異ホモロジーと道連結成分](../ATOP16/index.md#thm-atop16-h0-path-components) により包含写像は $\mathbb Z^3\to\mathbb Z$ の成分和です。[対のホモロジー長完全列](#thm-atop18-long-exact)より $\delta_1$ は単射で、その像は成分和の核です。

$$
\ker i_*=\{(u,v,w)\in\mathbb Z^3:u+v+w=0\}.
$$

この核の任意の元は $(-u)(-1,1,0)+w(0,-1,1)$ と一意に表せます。第1座標は $u$、第3座標は $w$、第2座標は $-u-w=v$ となるためです。$\delta_1$ は $\alpha,\beta$ の類をそれぞれ $(-1,1,0),(0,-1,1)$ に送ります。従ってこの二つの相対類が基底をなし $H_1(I,A)\cong\mathbb Z^2$ です。

$i_*$ が全射なので $H_0(I,A)=0$。$n\ge2$ では $H_n(I)=H_{n-1}(A)=0$ なので完全性から $H_n(I,A)=0$ です。
<!-- solution-end -->

### 演習 ATOP18-B3：反転の作用を自然性から求める

- Level: B

$(I,E)$ の反転 $f(t)=1-t$ は $H_1(I,E)$ 上でどの準同型を誘導するか。[対の長完全列の自然性](#thm-atop18-naturality)を使って求めよ。

<!-- solution-start -->
**詳細解答**

$f$ は連続で両端を交換するので対の写像です。第6節の計算より $\delta_1$ は $H_1(I,E)$ と $\mathbb Z(\langle1\rangle-\langle0\rangle)$ の間の同型です。$\sigma(t)=t$ の相対類は生成元で、$\delta_1[\bar\sigma]=[\langle1\rangle-\langle0\rangle]$ です。

$$
\begin{aligned}
\delta_1 H_1(f_{\mathrm{rel}})[\bar\sigma]
&=H_0(f|_E)\delta_1[\bar\sigma]\\
&=[\langle0\rangle-\langle1\rangle]\\
&=-\delta_1[\bar\sigma].
\end{aligned}
$$

$\delta_1$ は単射なので $H_1(f_{\mathrm{rel}})[\bar\sigma]=-[\bar\sigma]$。任意の元は生成元の整数倍なので誘導写像は $m\mapsto-m$ です。道を逆転した特異単体と元の単体の負は鎖群では異なりますが、ここでは相対ホモロジー類として等しいことを示しました。
<!-- solution-end -->

### 演習 ATOP18-B4：部分空間が全ての成分を覆わない場合

- Level: B

離散三点空間 $X=\{p,q,r\}$ と部分空間 $A=\{p,q\}$ に対し $H_0(X,A)$ と $H_1(X,A)$ を求めよ。包含準同型の核および像を明示せよ。

<!-- solution-start -->
**詳細解答**

両空間では全特異単体が定数で、正次数のホモロジーは零です（各点で奇数境界が零、正の偶数境界が恒等になります）。[0次特異ホモロジーと道連結成分](../ATOP16/index.md#thm-atop16-h0-path-components) により $H_0(A)=\mathbb Z^2$、$H_0(X)=\mathbb Z^3$ であり、指定順の基底で包含は

$$
i_*(u,v)=(u,v,0).
$$

核は零で像は第3座標が零の部分群です。[対のホモロジー長完全列](#thm-atop18-long-exact)により $H_1(X,A)$ から $H_0(A)$ への接続は単射（直前が零）で像が $\ker i_*=0$ なので $H_1(X,A)=0$ です。また $j_*$ は全射で核が $\operatorname{im}i_*$ です。第3座標によって $\mathbb Z^3/\operatorname{im}i_*$ は $\mathbb Z$ と同型なので $H_0(X,A)\cong\mathbb Z$。残った点 $r$ の相対類が生成元です。
<!-- solution-end -->

### 演習 ATOP18-C1：可縮空間と任意の非空部分空間

- Level: C

$X$ を非空可縮空間、$A$ を非空部分空間とする。$n\ge1$ で $H_n(X,A)\cong\widetilde H_{n-1}(A)$ を示し、$H_0(X,A)$ を求めよ。さらに $A$ が有限個 $k$ 個の非空可縮な道連結成分から成る場合に全次数の相対群を求めよ。

<!-- solution-start -->
**詳細解答**

$X$ の収縮は各点から収縮先への道を与えるので $X$ は道連結です。[可縮空間の被約特異ホモロジー](../ATOP17/index.md#cor-atop17-contractible)より $m>0$ で $H_m(X)=0$。$H_0(X)=\mathbb Z$ です。

$n\ge2$ では [対のホモロジー長完全列](#thm-atop18-long-exact) の $\delta_n$ の直前と直後に零群があるため、核が零かつ像が $H_{n-1}(A)$ 全体です。正次数では [被約特異ホモロジー群](../ATOP17/index.md#def-atop17-reduced-homology) は通常群と等しいため

$$
H_n(X,A)\xrightarrow[\cong]{\delta_n}
\widetilde H_{n-1}(A).
$$

$n=1$ では包含が全ての点を $X$ の一つの成分へ送ります。よって $H_0(A)$ 上で、点の係数の総和を取る写像 $\epsilon$ が $i_*$ に一致します。0次境界は係数和零なのでこの写像はホモロジー類で定まり、$A$ が非空なので全射です。被約0次群は $\ker\epsilon$ です。完全性から

$$
\ker\delta_1=0,\qquad
\operatorname{im}\delta_1=\ker i_*=\widetilde H_0(A).
$$

従って $H_1(X,A)\cong\widetilde H_0(A)$ です。さらに $i_*$ が全射なので $j_*$ は零写像、しかし $j_*$ 自身も全射なので $H_0(X,A)=0$ です。

最後に $A$ の各道連結成分を $A_1,\ldots,A_k$ とします。特異単体の始域は道連結なので、連続像は一つの道連結成分に含まれます。

各面もその成分内に含まれるため

$$
C_m(A)=\bigoplus_{i=1}^k C_m(A_i)
$$

となり、境界は成分ごとに作用します。従ってサイクルと境界も成分ごとの直和、ホモロジー群も各群の直和です。各 $A_i$ が可縮なので正次数は零、0次は $\mathbb Z$ です。

$H_0(A)=\mathbb Z^k$ の係数和の核は、最後の成分を基準にした $e_i-e_k$（$1\le i<k$）を基底とする自由アーベル群です。実際、和が零なら最後の座標は先の $k-1$ 個の座標の負の和と決まります。従って

$$
H_n(X,A)\cong
\begin{cases}
\mathbb Z^{k-1}&n=1,\\
0&n=0\text{ または }n\ge2.
\end{cases}
$$

$k=1$ の場合も $\mathbb Z^0=0$ と読めば成立します。
<!-- solution-end -->

## 8. まとめと次講

相対特異鎖群は部分空間内の鎖を零とする商です。相対サイクルの境界は部分空間のサイクルになり、代表元の変更は部分空間内の境界だけを加えるので接続準同型が定まります。三つの位置の完全性は「商で消えた鎖を戻す」「部分空間で境界を埋める」「空間全体で境界を埋める」という三つの構成から従います。

次講（[ATOP19](../ATOP19/index.md)）では、対のホモロジーを変えずに部分空間の内部を取り除ける条件を調べます。

## 参考文献

- A. Hatcher, [*Algebraic Topology*](https://pi.math.cornell.edu/~hatcher/AT/ATchapters.html), Section 2.1, Relative Homology.
- J. R. Munkres, *Elements of Algebraic Topology*, relative homology.
