# CMP8 λ計算・再帰関数・計算可能性の同値像

[CMP1のTuring機械](../CMP1/index.md)では計算をテープ上の操作として定義し、[CMP5の停止問題](../CMP5/index.md#thm-cmp5-halt-undecidable)ではその機械について一般には答えられない問いがあることを証明しました。では、「計算できる」という範囲はテープ・状態・ヘッドを採用したせいで決まっているのでしょうか。

計算を**式の書換え**として記述するλ計算と、**自然数上の関数を組み立てる規則**として記述する再帰関数を調べます。二つとも、一見するとテープ上の機械とは別物です。具体的な計算を三通りで確かめてから、同じ部分関数を計算できる理由を構成の方向ごとに追います。

この章で比較するのは**計算できるか否か**であり、計算時間やメモリ使用量の一致ではありません。また、形式的な計算モデル同士の同値定理と、非形式的な「人間が手順に従って計算できる」という概念へのChurch–Turingの提唱は論理的に区別します。

## 1. 計算を項の書換えとして見る

自然数 $2+1$ のような式を数値へ計算するには、加算という命令が外から与えられています。λ計算では、命令そのものを変数・関数の定義・関数の適用だけで記述します。項中の変数は数値ではなく、別の項を受け取るための名前です。

<a id="def-cmp8-lambda-term"></a>

<!-- formal-statement-start -->
### 定義（λ項と自由変数）

変数を可算無限集合から選ぶ。λ項は次の三規則を有限回用いて作る式である。

1. 各変数 $x$ は項である。
2. $M,N$ が項なら適用 $(M\,N)$ も項である。
3. $M$ が項なら抽象 $(\lambda x.M)$ も項である。

適用は左結合とし、$M\,N\,P$ は $(M\,N)\,P$ を表す。抽象の作用域は右へ最大限伸ばす。項 $M$ の自由変数集合 $FV(M)$ は

$$
\begin{aligned}
FV(x)&=\{x\},\\
FV(M\,N)&=FV(M)\cup FV(N),\\
FV(\lambda x.M)&=FV(M)\setminus\{x\}
\end{aligned}
$$

で定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cmp8-lambda-term -->
### 例：括弧と自由変数を確認する

$\lambda x.x\,y$ は $\lambda x.(x\,y)$ です。内部の $x$ は抽象に束縛され、$y$ は自由なままなので

$$
FV(\lambda x.(x\,y))
=(\{x\}\cup\{y\})\setminus\{x\}
=\{y\}.
$$

一方、$(\lambda x.x)\,y$ は抽象全体を $y$ に適用した項であり、$\lambda x.(x\,y)$ とは別の構造です。
<!-- definition-example-end -->

関数の引数を代入するとき、**同じ名前の変数が偶然束縛されないこと**が必要です。例えば $(\lambda x.\lambda y.x)\,y$ の内側へ機械的に $x:=y$ を書き込んで $\lambda y.y$ とすると、右側の自由な $y$ を誤って束縛します。

<a id="def-cmp8-beta"></a>

<!-- formal-statement-start -->
### 定義（捕獲を避けた代入とβ簡約）

$M[x:=N]$ は、項 $M$ の自由な $x$ を項 $N$ に置き換え、必要なら束縛変数を未使用の名前へ改名する**捕獲回避代入**を表す。束縛変数だけの改名をα変換と呼ぶ。β簡約の一歩は

$$
(\lambda x.M)\,N\ \longrightarrow_\beta\ M[x:=N]
$$

であり、項の内部でも同じ規則を適用できる。β簡約できる部分がない項をβ正規形という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cmp8-beta -->
### 例：自由変数を保存するための改名

$(\lambda x.\lambda y.x)\,y$ では、内側の束縛変数 $y$ を新しい $z$ に改名してから代入します。

$$
\begin{aligned}
(\lambda x.\lambda y.x)\,y
&\equiv_\alpha(\lambda x.\lambda z.x)\,y\\
&\longrightarrow_\beta(\lambda z.x)[x:=y]\\
&=\lambda z.y.
\end{aligned}
$$

結果の自由変数は $\{y\}$ です。誤った $\lambda y.y$ なら自由変数は空集合となるので、捕獲が起きたことを検出できます。
<!-- definition-example-end -->

### 書換えの順序は停止性に影響する

$I=\lambda z.z$、$\Delta=\lambda x.x\,x$、$\Omega=\Delta\,\Delta$ と置きます。$\Omega$ は一歩簡約すると、再び同じ形になります。

$$
\Omega
=(\lambda x.x\,x)\,\Delta
\longrightarrow_\beta \Delta\,\Delta=\Omega.
$$

ところが $(\lambda u.I)\,\Omega$ は外側のβ簡約を先に行えば一歩で $I$ になり、引数 $\Omega$ を先に簡約し続けると進みません。この章でλ項を**実行する**ときは、一番外側に近く、同じ深さでは最も左にあるβ簡約箇所を優先する正規順序（左端最外）を使います。これは有効な一歩の選び方です。「ある計算経路では停止した」と「どの順序で進めても停止する」は同じ主張ではありません。

## 2. Church数で自然数を表す

λ項には数値リテラルがないので、数 $n$ を「操作 $f$ を $n$ 回繰り返す関数」として表します。$f^0(x)=x$、$f^{n+1}(x)=f(f^n(x))$ という反復を、λ項へ移したものです。

<a id="def-cmp8-church"></a>

<!-- formal-statement-start -->
### 定義（Church数）

各自然数 $n\in\mathbb N=\{0,1,2,\ldots\}$ のChurch数を

$$
\overline n=\lambda f.\lambda x.f^n(x)
$$

とする。特に

$$
\overline0=\lambda f.\lambda x.x,\qquad
\overline1=\lambda f.\lambda x.f\,x,\qquad
\overline2=\lambda f.\lambda x.f(f\,x).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-cmp8-church -->
### 例：2は「2回繰り返す」

任意の項 $F,X$ を選ぶと、束縛変数を衝突しないように改名したうえで

$$
\overline2\,F\,X
=(\lambda f.\lambda x.f(f\,x))\,F\,X
\longrightarrow_\beta(\lambda x.F(F\,x))\,X
\longrightarrow_\beta F(F\,X).
$$

従って $\overline2$ は特定の数値演算でなく、受け取った操作を2回適用する働きをします。
<!-- definition-example-end -->

次の項を定めます。

$$
\begin{aligned}
\mathsf{SUCC}&=\lambda n.\lambda f.\lambda x.f(n\,f\,x),\\
\mathsf{ADD}&=\lambda m.\lambda n.\lambda f.\lambda x.m\,f\,(n\,f\,x).
\end{aligned}
$$

<a id="prop-cmp8-church-arithmetic"></a>

<!-- formal-statement-start -->
### 命題（Church数の後者・加算）

任意の自然数 $m,n$ に対し、正規順序のβ簡約により

$$
\mathsf{SUCC}\,\overline n\longrightarrow_\beta^*\overline{n+1},
\qquad
\mathsf{ADD}\,\overline m\,\overline n
\longrightarrow_\beta^*\overline{m+n}
$$

がα同値を除いて成立する。$\longrightarrow_\beta^*$ は有限回のβ簡約を表す。
<!-- formal-statement-end -->

**証明の見取り図**　後者は $f$ の呼出しを外側に1回追加します。加算は、内側の $n$ 回と外側の $m$ 回の反復を連結します。

<!-- proof-start -->
### 証明

束縛変数は必要に応じて互いに異なる名前へ改めます。後者の項は

$$
\begin{aligned}
\mathsf{SUCC}\,\overline n
&=(\lambda n.\lambda f.\lambda x.f(n\,f\,x))\,\overline n\\
&\longrightarrow_\beta \lambda f.\lambda x.f(\overline n\,f\,x)\\
&\longrightarrow_\beta^* \lambda f.\lambda x.f(f^n(x))\\
&=\lambda f.\lambda x.f^{n+1}(x)=\overline{n+1}.
\end{aligned}
$$

加算も左から二つの引数を代入すると

$$
\begin{aligned}
\mathsf{ADD}\,\overline m\,\overline n
&\longrightarrow_\beta^*
\lambda f.\lambda x.\overline m\,f\,(\overline n\,f\,x)\\
&\longrightarrow_\beta^*
\lambda f.\lambda x.\overline m\,f\,(f^n(x))\\
&\longrightarrow_\beta^*
\lambda f.\lambda x.f^m(f^n(x))\\
&=\lambda f.\lambda x.f^{m+n}(x)=\overline{m+n}.
\end{aligned}
$$

最後の等式は関数反復の定義から従います。まず $f^0(f^n(x))=f^n(x)$、さらに $f^m(f^n(x))=f^{m+n}(x)$ を仮定して両辺に $f$ を一回作用させれば $m+1$ でも成立するので、$m$ による帰納法で確かめられます。$\square$
<!-- proof-end -->

例えば $\mathsf{ADD}\,\overline1\,\overline2$ は、任意の $f,x$ に対し

$$
\overline1\,f\,(\overline2\,f\,x)
\longrightarrow_\beta f(f(f\,x))
$$

を返すので $\overline3$ になります。ここでは足し算の組込み命令を呼んでいません。

## 3. 初期関数から関数を作る

λ計算が式の書換えで計算を表したのに対し、再帰関数の方法は**どの関数を材料にし、どの構成規則で新しい関数を得るか**を直接定義します。入力と出力を自然数の組とし、まず全入力で値が定まる関数を考えます。

<a id="def-cmp8-primitive-recursive"></a>

<!-- formal-statement-start -->
### 定義（原始再帰関数）

自然数上の零関数 $Z(n)=0$、後者関数 $S(n)=n+1$、各射影関数 $P_i^k(n_1,\ldots,n_k)=n_i$ を初期関数とする。これらから以下の操作を有限回使って得られる関数を**原始再帰関数**という。

- **合成**：$g_1,\ldots,g_r:\mathbb N^k\to\mathbb N$ と $h:\mathbb N^r\to\mathbb N$ から $f(\boldsymbol x)=h(g_1(\boldsymbol x),\ldots,g_r(\boldsymbol x))$ を作る。
- **原始再帰**：$g:\mathbb N^k\to\mathbb N$、$h:\mathbb N^{k+2}\to\mathbb N$ から、$\boldsymbol x\in\mathbb N^k$、$n\in\mathbb N$ に対し

$$
\begin{aligned}
f(\boldsymbol x,0)&=g(\boldsymbol x),\\
f(\boldsymbol x,n+1)&=h(\boldsymbol x,n,f(\boldsymbol x,n))
\end{aligned}
$$

を満たす関数 $f$ を作る。必要な定数関数は初期関数から合成で作れる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cmp8-primitive-recursive -->
### 例：加算と乗算を定義から構成する

まず $\operatorname{add}(x,0)=x$、$\operatorname{add}(x,n+1)=S(\operatorname{add}(x,n))$ と置きます。基底は $g(x)=x=P_1^1(x)$、更新は $h(x,n,z)=S(z)$ なので、原始再帰の条件に**直接**当てはまります。

次に $\operatorname{mul}(x,0)=0$、$\operatorname{mul}(x,n+1)=\operatorname{add}(\operatorname{mul}(x,n),x)$ とします。基底は $g(x)=Z(x)$、更新は $h(x,n,z)=\operatorname{add}(z,x)$ です。すでに構成した加算と射影の合成なので、これも原始再帰関数です。
<!-- definition-example-end -->

<a id="prop-cmp8-arithmetic"></a>

<!-- formal-statement-start -->
### 命題（原始再帰で構成した加算・乗算）

上の原始再帰によって定めた関数は、すべての $x,n\in\mathbb N$ で

$$
\operatorname{add}(x,n)=x+n,\qquad
\operatorname{mul}(x,n)=xn
$$

を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

加算について $n=0$ では $\operatorname{add}(x,0)=x=x+0$ です。$n$ での等式を仮定すると

$$
\begin{aligned}
\operatorname{add}(x,n+1)
&=S(\operatorname{add}(x,n))\\
&=S(x+n)=x+n+1=x+(n+1).
\end{aligned}
$$

従って帰納法で加算の等式が成立します。乗算の基底では $\operatorname{mul}(x,0)=0=x\cdot0$。$n$ での等式を仮定して、すでに証明した加算の結果を入力 $(z,x)=(xn,x)$ に適用すると

$$
\begin{aligned}
\operatorname{mul}(x,n+1)
&=\operatorname{add}(\operatorname{mul}(x,n),x)\\
&=\operatorname{add}(xn,x)\\
&=xn+x=x(n+1).
\end{aligned}
$$

ゆえに乗算も全ての入力で通常の乗算に一致します。$\square$
<!-- proof-end -->

原始再帰では、$n$ 回だけ更新すれば $f(\boldsymbol x,n)$ を得るので、構成した関数は全域で停止します。ただし全域計算可能関数のすべてが原始再帰関数であるわけではありません。したがって、この段階で「計算可能な関数をすべて得た」と宣言することはできません。

## 4. 停止しない可能性を関数として表す

Turing機械では、ある入力で永遠に計算を続ける場合がありました。再帰関数側でこれに対応するのが、答えが見つかるまで自然数を順番に調べる**最小化**です。

<a id="def-cmp8-minimization"></a>

<!-- formal-statement-start -->
### 定義（最小化と部分再帰関数）

部分関数 $g:\mathbb N^{k+1}\rightharpoonup\mathbb N$ に対し、$\mu y[g(\boldsymbol x,y)=0]$ は、$g(\boldsymbol x,0),g(\boldsymbol x,1),\ldots$ を順に評価し、最初に値 $0$ が得られた添字 $y$ を返す。途中の評価が未定義となった場合、または $0$ が現れない場合、結果は未定義とする。

初期関数から合成、原始再帰、最小化を有限回使って得られる部分関数を**部分再帰関数**という。全入力で定義される部分再帰関数を全域再帰関数という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cmp8-minimization -->
### 例：探索が成功する場合・しない場合

$g(n,y)=|n-y|$ とすると、$g(n,0),\ldots,g(n,n-1)$ は全て正、$g(n,n)=0$ です。したがって $\mu y[g(n,y)=0]=n$ です。$|n-y|$ は切断減算 $a\dotminus b=\max(a-b,0)$ の二方向の和として構成できます。切断減算は $\operatorname{pred}(0)=0,\operatorname{pred}(t+1)=t$ を原始再帰で作り、$a\dotminus0=a$、$a\dotminus(b+1)=\operatorname{pred}(a\dotminus b)$ として作れるので、$g$ は原始再帰関数です。

一方、$g(n,y)=n+1$ と置けばすべての $y$ で正の値になり、最小化はどの入力でも停止しません。**答えが存在しないことを有限時間で見つけて停止する**という意味ではない点に注意します。
<!-- definition-example-end -->

### 途中の未定義値を飛ばしてよいか

例えば $g(0,0)$ は未定義、$g(0,1)=0$ とします。数学的な「$g(0,y)=0$ を満たす最小の $y$」だけを考えれば $1$ と書きたくなります。しかし順次探索は $y=0$ の評価を終えられないため、$y=1$ に達しません。上で定めた最小化の値は**未定義**です。部分関数への最小化では「それ以前の候補の値がすべて定義され、かつ非零」という条件が欠かせません。

## 5. 再帰関数とTuring機械の対応を構成する

この節では自然数を入力とし、定義域の外では値が返らない部分関数を比べます。Turing機械の入力は自然数の有限符号化、出力は定義域上で得られる自然数の有限符号化とします。どちらも一貫した有効符号化を選びます。

<a id="thm-cmp8-recursive-tm"></a>

<!-- formal-statement-start -->
### 定理（部分再帰関数とTuring計算可能な部分関数の一致）

任意の $k\ge1$ について、部分関数 $f:\mathbb N^k\rightharpoonup\mathbb N$ が部分再帰関数であることと、あるTuring機械がすべての $\boldsymbol x$ について、$f(\boldsymbol x)$ が定義される場合にその値を有限時間で出力し、未定義の場合には値を返さないことは同値である。
<!-- formal-statement-end -->

**証明の見取り図**　片方向は、関数の生成規則ごとに機械を作ればよいです。逆方向は、有限個の記号・状態からなる機械の**時刻 $t$ までの計算**を原始再帰で計算し、「最初に結果が出る時刻」を最小化で探します。

<!-- proof-start -->
### 証明

**(I) 部分再帰関数からTuring機械へ。** 初期関数は、出力を0にする、入力に1を加える、指定された入力成分をコピーする有限操作で計算できます。

合成の場合、内側の $g_1,\ldots,g_r$ を順に実行し、すべて値を返せばその値の組を $h$ に渡します。途中で値を返さない関数があれば合成も値を返さず、これは部分関数の合成と一致します。

原始再帰の場合、入力 $(\boldsymbol x,n)$ に対しまず $v:=g(\boldsymbol x)$ とし、$j=0,1,\ldots,n-1$ の順で $v:=h(\boldsymbol x,j,v)$ と更新します。$n$ は有限なので、各部分計算が定義されればちょうど $n$ 回で結果を返します。途中の計算が非停止なら元の原始再帰も未定義です。

最小化の場合は $y=0$ から順番に $g(\boldsymbol x,y)$ の機械を実行し、値が $0$ なら $y$ を返し、正なら $y+1$ へ進みます。最初の未定義値から先へ進まないことも定義に一致します。この四つの構成は有限個の機械の組合せなので、有限回の関数生成全体を機械へ翻訳できます。

**(II) Turing機械から部分再帰関数へ。** 具体的な符号化と一歩の計算を考えます。テープ記号を $0,\ldots,b-1$（$0$ は空白、$b\ge2$）で表し、ヘッドの左側を逆向きに並べた数 $L$、ヘッド位置を最下位桁とする右側の数 $R$ を底 $b$ で符号化します。有限個の状態からなる制御状態を $q$ とし、配置を $(q,L,R)$ で表します。例えば $b=3$、ヘッド位置から右へ記号 $2,1$ が並べば $R=2+3\cdot1=5$ です。

$R=a+bU$ と割り、$a=R\bmod b$ は現在の記号、$U=\lfloor R/b\rfloor$ はその右側の列です。現在の記号を $c$ に書き換える遷移について、右移動なら

$$
(L,R)\longmapsto(c+bL,U)
$$

であり、左移動なら $L=d+bV$（$d=L\bmod b$）と割って

$$
(L,R)\longmapsto(V,d+b(c+bU))
$$

です。移動しない場合は $(L,c+bU)$ です。状態 $q$ からどの記号 $c$ と移動方向が選ばれるかは有限の遷移表で決まります。停止状態は以後そのままにしておきます。

**各算術操作が原始再帰的であること。** 加算・乗算は前節で構成しました。定数 $b$ による商と余りは、$a$ を0から1ずつ増やし余りが $b-1$ に達したときだけ商を1増やし余りを0へ戻す有限回更新で作れます。有限状態の条件分岐は、切断減算、零判定、有限個の加算・乗算で作れます。したがって上の三種類の更新は原始再帰関数です。

複数の自然数の組も、例えば $\langle a,b\rangle=2^a(2b+1)-1$ で一つの自然数へ符号化できます。$u=\langle a,b\rangle$ から $a$ は $u+1$ を割る2の最大冪指数、$b$ は残る奇数部分から得られます。指数も商も $u+1$ 回以下の有界な探索・更新で計算できるため原始再帰的です。これを繰り返して $(q,L,R)$ を単一の数にします。

入力を単項表現（数 $n$ を記号1の $n$ 個の列）にしておけば初期配置の桁列は有限回の原始再帰で生成できます。複数入力は区切り記号で連結します。出力も単項表現の長さを数える有界な計算で読み出します。したがって初期配置 $C_0(\boldsymbol x)$、一歩を表す $T(C)$、停止出力を読み出す $U(C)$ をいずれも原始再帰関数として構成できます。

原始再帰

$$
C(\boldsymbol x,0)=C_0(\boldsymbol x),\qquad
C(\boldsymbol x,t+1)=T(C(\boldsymbol x,t))
$$

により $t$ 歩目の配置 $C(\boldsymbol x,t)$ が求まります。$\chi(\boldsymbol x,t)$ を「その配置が値を返して停止している」なら $0$、それ以外は $1$ とする原始再帰的判定関数とします。ここで停止配置は以後変えないようにしたので、出力は最初の停止時刻の配置から確実に読み取れます。すると

$$
\begin{aligned}
\tau(\boldsymbol x)
&=\mu t[\chi(\boldsymbol x,t)=0],\\
f(\boldsymbol x)
&=U(C(\boldsymbol x,\tau(\boldsymbol x)))
\end{aligned}
$$

です。機械が結果を返すなら有限の $\tau$ が存在し、式はその結果を返します。機械が結果を返さないなら $\chi=1$ が全時刻で続くので $\tau$ は未定義です。右辺は原始再帰関数の合成と最小化から構成され、部分再帰関数です。両方向が成立しました。$\square$
<!-- proof-end -->

ここで構成に用いた商・余り・配置の符号化は、**入力を有限文字列で書く**という既習の符号化と同じ目的を持ちます。比較対象を自然数にそろえるための方法であり、特定の符号化を神聖視する必要はありません。

## 6. λ計算を計算モデルとして完成させる

自然数関数をλ計算で表すには、[Church数](#def-cmp8-church)へ結果が簡約されることを要求します。$\overline{n_1},\ldots,\overline{n_k}$ を与えたとき正規順序で $\overline{f(\boldsymbol n)}$ が得られる場合を定義域内とし、値を得られない場合は定義域外とする表現を考えます。一般に表現項がChurch数以外の正規形で止まる可能性はありますが、ここでは後述の構成が**未定義では正規形へ到達せず、定義域内では正しいChurch数を返す**ように作ります。

まず、分岐と繰返しを作るために以下の項を用意します。

$$
\begin{aligned}
\mathsf{TRUE}&=\lambda a.\lambda b.a,\\
\mathsf{FALSE}&=\lambda a.\lambda b.b,\\
\mathsf{IF}&=\lambda p.\lambda a.\lambda b.p\,a\,b,\\
\mathsf{ISZERO}&=\lambda n.n\,(\lambda z.\mathsf{FALSE})\,\mathsf{TRUE}.
\end{aligned}
$$

例えば $\mathsf{ISZERO}\,\overline0\to_\beta^*\mathsf{TRUE}$ ですが、$n\ge1$ なら最初の反復で $\mathsf{FALSE}$ が生まれ、その後も $\mathsf{FALSE}$ なので $\mathsf{ISZERO}\,\overline n\to_\beta^*\mathsf{FALSE}$ です。$\mathsf{IF}\,\mathsf{TRUE}\,A\,B\to_\beta^* A$ では未選択の $B$ を評価する必要がありません。

前の値を取り出すため、組を $\mathsf{PAIR}=\lambda a.\lambda b.\lambda k.k\,a\,b$、第1・第2成分を $\mathsf{FST}=\lambda p.p\,\mathsf{TRUE}$、$\mathsf{SND}=\lambda p.p\,\mathsf{FALSE}$ と置きます。$\mathsf{STEP}=\lambda p.\mathsf{PAIR}\,(\mathsf{SND}\,p)\,(\mathsf{SUCC}\,(\mathsf{SND}\,p))$ として

$$
\mathsf{PRED}=\lambda n.\mathsf{FST}\,
(n\,\mathsf{STEP}\,(\mathsf{PAIR}\,\overline0\,\overline0))
$$

とすれば、反復0回では第1成分0、1回では組 $(0,1)$、2回では $(1,2)$ になります。帰納法で $n\ge1$ 回後に $(n-1,n)$ となり、$\mathsf{PRED}\,\overline n$ は $\overline{\max(n-1,0)}$ に簡約されます。

### 自己参照する関数を表す

λ計算の再帰の核は、$Y=\lambda f.(\lambda x.f(x\,x))(\lambda x.f(x\,x))$ という項です。

<a id="prop-cmp8-fixedpoint"></a>

<!-- formal-statement-start -->
### 命題（固定点項の展開）

任意のλ項 $F$ に対し、束縛変数の捕獲を避けて

$$
Y\,F\longrightarrow_\beta^* F\,(Y\,F)
$$

が成り立つ。ここで右辺の $Y\,F$ は左辺と同じ項を表す略記である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$D=\lambda x.F(x\,x)$ と置きます。$Y\,F$ の外側を一度簡約すると、$Y$ の定義により $D\,D$ を得ます。もう一度最外側を簡約すると

$$
\begin{aligned}
Y\,F
&=(\lambda f.(\lambda x.f(x\,x))(\lambda x.f(x\,x)))\,F\\
&\longrightarrow_\beta
(\lambda x.F(x\,x))(\lambda x.F(x\,x))\\
&=D\,D\\
&\longrightarrow_\beta F(D\,D).
\end{aligned}
$$

$D\,D$ は $Y\,F$ の最初の一歩で現れた項であり、$F(D\,D)$ を $F(Y\,F)$ と略記するのはβ変換を許した記法です。厳密な等号ではなくβ変換可能である、という主張です。$\square$
<!-- proof-end -->

この機構で、$n=0$ のとき基底 $G$ を使い、そうでなければ $n-1$ へ再帰し更新 $H$ を適用する関数を組み立てられます。$\mathsf{IF}$ は未選択枝を評価しないため、再帰部分が存在しても基底で停止できます。最小化も、$y=0$ から検査し、零でなければ $\mathsf{SUCC}\,y$ で再帰する探索として表せます。

<a id="thm-cmp8-lambda-recursive"></a>

<!-- formal-statement-start -->
### 定理（λ計算と部分再帰関数の自然数関数としての一致）

自然数上の部分関数について、Church数を入出力とし正規順序で評価するλ項によって計算できる部分関数の全体は、部分再帰関数の全体に一致する。したがって、これらはTuring計算可能な数値部分関数と一致する。
<!-- formal-statement-end -->

**証明の見取り図**　λ項を選んで一歩簡約する操作は有限文字列操作なので機械で模擬できます。逆方向は部分再帰関数の生成規則をλ項へ翻訳します。原始再帰は前値と $\mathsf{PRED}$、最小化は「0から探索」を使います。

<!-- proof-start -->
### 証明

**(I) λ計算からTuring機械へ。** 項を有限な文字列として符号化し、括弧を対応させ、抽象と適用の部分木をたどります。β簡約では、選んだ $(\lambda x.M)\,N$ の部分木を取り出し、$FV(N)$ に現れる束縛変数を未使用の変数名へ改名してから、自由な $x$ を $N$ へ置換します。この走査・改名・置換はすべて有限文字列のアルゴリズムです。最外左の簡約箇所は有限木を先頭から探索して選べます。正しいChurch数に到達したらその反復回数を出力し、停止しない場合は模擬し続けます。よってλ計算で得られる数値部分関数はTuring計算可能です。

**(II) 部分再帰関数からλ計算へ。** 初期関数は $\overline0$、$\mathsf{SUCC}$、引数を選ぶ抽象で表せます。合成は、引数を各内側の表現項へ渡し、その出力を外側の表現項へ渡すλ項で表します。$\mathsf{PRED}$、$\mathsf{ISZERO}$、$\mathsf{IF}$ は上で具体的に作りました。

原始再帰の基底関数を表す項を $G$、更新関数を表す項を $H$ とし、簡単のため追加の引数を $\boldsymbol x$ と書きます。以下の右辺は、多引数のλ抽象を有限回入れ子にした略記です。

$$
\begin{aligned}
F_R=\lambda r.\lambda\boldsymbol x.\lambda n.\ 
\mathsf{IF}\,(\mathsf{ISZERO}\,n)\,(G\,\boldsymbol x)\\
\qquad(H\,\boldsymbol x\,(\mathsf{PRED}\,n)\,
(r\,\boldsymbol x\,(\mathsf{PRED}\,n))).
\end{aligned}
$$

$R=Y\,F_R$ とすると、$R\,\overline{\boldsymbol x}\,\overline0$ は固定点の一回展開後、$\mathsf{ISZERO}\,\overline0$ が真となり $G\,\overline{\boldsymbol x}$ へ進みます。$n+1$ では偽となり、

$$
R\,\overline{\boldsymbol x}\,\overline{n+1}
\longrightarrow_\beta^*
H\,\overline{\boldsymbol x}\,\overline n\,
(R\,\overline{\boldsymbol x}\,\overline n)
$$

に進みます。帰納法で $R$ の内側が $\overline{f(\boldsymbol x,n)}$ を返せば、$H$ が更新式の値を返すため $n+1$ でも正しい値を得ます。

最小化では $G$ が $g(\boldsymbol x,y)$ を表す項として、次を用います。

$$
\begin{aligned}
F_\mu=\lambda s.\lambda\boldsymbol x.\lambda y.\
\mathsf{IF}\,(\mathsf{ISZERO}\,(G\,\boldsymbol x\,y))\,y\\
\qquad(s\,\boldsymbol x\,(\mathsf{SUCC}\,y)).
\end{aligned}
$$

$S_\mu=Y\,F_\mu$ とし、$S_\mu\,\overline{\boldsymbol x}\,\overline0$ を評価します。$g(\boldsymbol x,0)$ が0なら $y=0$ を返し、正なら1へ進みます。以後も同じです。最初に $0$ が得られる添字 $t$ までの評価が全て定義される場合は、$t$ 回の再帰の後 $\overline t$ を返します。途中で $G$ が未定義なら零判定が結果を出せず、次の候補にも進みません。すべて正なら再帰が続いて停止しません。従って最小化の部分関数の定義域も値も保存します。

以上、部分再帰関数を作る規則ごとにλ項を構成できました。第5節の定理と合わせて三モデルの数値部分関数は一致します。$\square$
<!-- proof-end -->

ただしこれは数値部分関数についての同値です。λ項同士のあらゆる書換え過程と機械の一歩一歩が一致する、あるいは同じ計算時間で実行できるという意味ではありません。

## 7. Church–Turingの提唱は何を言っているか

[CMP2の計算モデルの頑健性](../CMP2/index.md)では、具体的に定義された機械モデルを互いにシミュレートする考え方を見ました。ここではTuring機械、再帰関数、λ項という非常に異なる定義から**同じ数値部分関数**が得られます。

しかし「人間が紙と鉛筆で、有限な指示に従って機械的に計算できる」は、それ自体が形式的に定義された数値関数の集合ではありません。Church–Turingの提唱は、その非形式的な概念をTuring計算可能性で捉えられるという主張です。形式的な集合の等号を証明する上の定理と異なり、**同じ意味で証明された数学定理ではありません**。

例えば[CMP5の停止問題](../CMP5/index.md#thm-cmp5-halt-undecidable)はTuring機械で決定不能です。第5・6節の同値定理から、これを一般の部分再帰関数やλ計算へモデルを移すだけで決定可能に変えることはできません。一方、非形式的な「計算可能」の解釈をどう正当化するかは提唱の問題として残ります。

## 8. 演習

特に断らなければ、自然数は $0,1,2,\ldots$、λ項は捕獲回避代入と正規順序で扱います。$\overline n$ は[Church数](#def-cmp8-church)、$\mu$ は[最小化](#def-cmp8-minimization)を表します。問題ごとに、式の書換え・帰納法の基底と更新・停止しない分岐を確認してください。

### Level A

### A1. λ項の構造と自由変数

$M=\lambda x.(x\,y)$ と $N=(\lambda x.x)\,y$ の自由変数集合を求めよ。また $M$ と $N$ が同じ項ではない理由を示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$FV(x\,y)=FV(x)\cup FV(y)=\{x,y\}$ なので $FV(M)=\{x,y\}\setminus\{x\}=\{y\}$。$FV(\lambda x.x)=\{x\}\setminus\{x\}=\varnothing$ なので $FV(N)=\varnothing\cup\{y\}=\{y\}$。自由変数集合は一致しますが、$M$ の最外構成子は抽象で、$N$ の最外構成子は適用です。構文木が異なるため同じ項ではありません。さらに $N\to_\beta y$ ですが $M$ はこの形でβ簡約箇所を持ちません。
<!-- solution-end -->

### A2. 変数捕獲を避ける

$(\lambda x.\lambda y.x\,y)\,y$ をβ簡約し、誤って改名しないと何が変化するか、自由変数集合で確かめよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

内側の束縛変数 $y$ を未使用の $z$ に改名します。

$$
\begin{aligned}
(\lambda x.\lambda y.x\,y)\,y
&\equiv_\alpha(\lambda x.\lambda z.x\,z)\,y\\
&\longrightarrow_\beta\lambda z.y\,z.
\end{aligned}
$$

結果の自由変数集合は $FV(y\,z)\setminus\{z\}=\{y\}$ です。改名を忘れると $\lambda y.y\,y$ となり、自由変数集合が空になります。引数として渡した自由な $y$ が内側のλに束縛されてしまうことが誤りです。
<!-- solution-end -->

### A3. 正規順序と発散

$\Delta=\lambda x.x\,x$、$\Omega=\Delta\,\Delta$、$I=\lambda z.z$ とする。$\Omega$ の一歩簡約を書き、$(\lambda u.I)\,\Omega$ の最外簡約と引数先行簡約を比較せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$\Omega=(\lambda x.x\,x)\,\Delta\to_\beta\Delta\,\Delta=\Omega$ です。外側を先に選ぶと $(\lambda u.I)\,\Omega\to_\beta I$ で終了します。引数を先に選ぶと $\Omega\to_\beta\Omega$ が繰り返され、外側へ一歩も進みません。従ってこの項には終了する簡約経路がありますが、任意の簡約順序が終了するわけではありません。
<!-- solution-end -->

### A4. Church数の演算

$\mathsf{SUCC}\,\overline2$ と $\mathsf{ADD}\,\overline2\,\overline1$ を、それぞれ任意の $f,x$ への作用として展開して結果を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$\mathsf{SUCC}\,\overline2$ は $\lambda f.\lambda x.f(\overline2\,f\,x)$ へ簡約されます。さらに $\overline2\,f\,x\to_\beta^*f(f\,x)$ なので $\lambda f.\lambda x.f(f(f\,x))=\overline3$ です。加算は $\lambda f.\lambda x.\overline2\,f\,(\overline1\,f\,x)$ へ簡約されます。内側は $\overline1\,f\,x\to f\,x$、外側は $\overline2\,f\,(f\,x)\to f(f(f\,x))$ なので同じく $\overline3$ です。
<!-- solution-end -->

### A5. 原始再帰の実行表

$\operatorname{mul}(3,n)$ を $n=0,1,2,3$ について原始再帰の定義だけから計算せよ。各更新に使う関数も示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

基底は $v_0=\operatorname{mul}(3,0)=0$ です。更新式は $v_{n+1}=\operatorname{add}(v_n,3)$ で、加算はすでに構成した原始再帰関数です。従って $v_1=\operatorname{add}(0,3)=3$、$v_2=\operatorname{add}(3,3)=6$、$v_3=\operatorname{add}(6,3)=9$。表として $(n,v_n)=(0,0),(1,3),(2,6),(3,9)$ を得ます。乗算を既知の掛け算として使わず、同じ加算を3回行いました。
<!-- solution-end -->

### Level B

### B1. 加算を材料にべき乗を作る

$\operatorname{pow}(x,0)=1$、$\operatorname{pow}(x,n+1)=\operatorname{mul}(\operatorname{pow}(x,n),x)$ とする。原始再帰関数であることを材料と更新の形から示し、任意の $x,n\in\mathbb N$ で $\operatorname{pow}(x,n)=x^n$ を証明せよ。ただし $0^0=1$ とする。

- Level: B

<!-- solution-start -->
#### 詳細解答

定数1は $S(Z(x))$ から作れます。基底 $g(x)=1$ は原始再帰関数、更新 $h(x,n,z)=\operatorname{mul}(z,x)$ は第3節で構成した乗算と射影の合成で原始再帰関数です。従って原始再帰の閉性で $\operatorname{pow}$ も原始再帰関数です。基底では $\operatorname{pow}(x,0)=1=x^0$。$n$ について成立すると仮定すれば

$$
\begin{aligned}
\operatorname{pow}(x,n+1)
&=\operatorname{mul}(\operatorname{pow}(x,n),x)\\
&=\operatorname{mul}(x^n,x)\\
&=x^n x=x^{n+1}.
\end{aligned}
$$

第3の等号では、乗算が通常の乗算と一致する第3節の命題を使いました。$x=0$ でも基底が1であり、$n\ge1$ では値が0となるので規約と矛盾しません。
<!-- solution-end -->

### B2. 最小化の定義域

部分関数 $g$ は $g(0,0)$ が未定義、$g(0,1)=0$、$g(1,0)=2$、$g(1,1)=0$ とし、これ以外の必要な値は定義されないとする。$h(n)=\mu y[g(n,y)=0]$ の $n=0,1$ での値を求めよ。「単に0になる最小添字」と違う理由も述べよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$n=0$ では探索の最初に $g(0,0)$ を評価しますが未定義なので、この呼出しは終了せず $y=1$ へ進めません。従って $h(0)$ は未定義です。$n=1$ では最初の $g(1,0)=2$ が定義済みで非零なので $y=1$ へ進み、$g(1,1)=0$ が得られて $h(1)=1$ です。数学的に $g(0,1)=0$ が存在するだけでは、先行する未定義な評価を飛ばせないことが、順次探索としての最小化の条件です。
<!-- solution-end -->

### B3. 有界受理検査から部分関数へ

Turing機械の正しい記述 $m$、入力 $x$ について、$b_{m,x}(t)=0$ を「$M_m(x)$ が $t$ 歩以内に受理した」、そうでなければ $1$ と定める。$b_{m,x}$ が原始再帰的に計算できる理由を配置の更新から述べ、$h(m,x)=\mu t[b_{m,x}(t)=0]$ の定義域を特定せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$m,x$ の符号を自然数として与え、$m$ の有限な遷移表を配置の符号へ適用する処理を構成します。$t$ 歩目の配置は $C_0(m,x)$ から $C_{j+1}=T_m(C_j)$ を $j=0,\ldots,t-1$ と有限回反復して得られます。各更新は状態と記号の有限場合分け、商と余り、加算・乗算から構成でき、第5節で原始再帰的と確認しました。受理状態に達した配置を固定しておけば、$t$ 歩目の状態を検査するだけで「$t$ 歩以内」を判定できます。従って $b_{m,x}(t)$ は全ての $t$ で0か1を返す原始再帰的な検査です。最初の受理時刻 $t_0$ が存在すればそれ以前の検査はすべて1で $b(t_0)=0$ なので $h(m,x)=t_0$ です。元が拒否停止または非停止なら、どの $t$ でも受理しないので全値1となり $h$ は未定義です。つまり $h$ の定義域は受理問題の正しい対符号に対応します。
<!-- solution-end -->

### B4. 自己参照と停止する枝

$F=\lambda r.\lambda n.\mathsf{IF}\,(\mathsf{ISZERO}\,n)\,\overline0\,(\mathsf{SUCC}\,(r\,(\mathsf{PRED}\,n)))$、$R=Y\,F$ とする。$R\,\overline0$ と $R\,\overline2$ がそれぞれ $\overline0$ と $\overline2$ へ簡約される理由を、停止する基底と再帰回数を区別して説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

固定点の展開により $R\,n\to_\beta^* F\,R\,n$ として評価できます。$n=\overline0$ では $\mathsf{ISZERO}\,\overline0\to^*\mathsf{TRUE}$、さらに $\mathsf{IF}\,\mathsf{TRUE}\,\overline0\,B\to^*\overline0$ なので、未選択の再帰枝 $B$ は評価しません。$n=\overline1$ では零判定が偽で、$\mathsf{PRED}\,\overline1\to^*\overline0$ だから

$$
R\,\overline1\to_\beta^*\mathsf{SUCC}\,(R\,\overline0)
\to_\beta^*\mathsf{SUCC}\,\overline0
\to_\beta^*\overline1.
$$

同じく $n=\overline2$ では $\mathsf{PRED}\,\overline2\to^*\overline1$ なので

$$
R\,\overline2\to_\beta^*\mathsf{SUCC}\,(R\,\overline1)
\to_\beta^*\mathsf{SUCC}\,\overline1
\to_\beta^*\overline2.
$$

全体を有限回で評価できるのは、入力が1ずつ減り、0の枝で $R$ を展開しないからです。
<!-- solution-end -->

### Level C

### C1. 三つのモデルと決定不能性をつなぐ

正しいTuring機械記述 $m$ と入力 $x$ に対し、$b_{m,x}(t)$ をB3の有界受理検査とする。

1. $h(m,x)=\mu t[b_{m,x}(t)=0]$ が部分再帰関数であることを、最小化の各条件を確認して示せ。
2. $M_m(x)$ が (i)受理、(ii)拒否、(iii)非停止の各場合で $h(m,x)$ の値を判定せよ。
3. 第6節の構成を用い、各固定した $(m,x)$ について $h(m,x)$ をChurch数として得るλ項が存在する理由を述べよ。
4. この対応から停止問題や受理問題の**全域決定器**が得られるか判定せよ。最後に形式的同値定理とChurch–Turingの提唱の論理的身分を区別せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

**(1)** $t$ を与えたとき有限回の配置更新で「$t$ 歩以内に受理したか」を0か1で答えられます。更新の状態とテープ記号は有限、数値操作は商・余り・加算など原始再帰的な操作なので $b_{m,x}$ は原始再帰関数です。入力 $m,x$ を変数に含めても、遷移表の有限符号を走査し有限個の分岐を選ぶ計算を有界な反復で実行できます。従って $h$ は原始再帰関数への最小化を一回適用した部分再帰関数です。

**(2)** (i) 元が時刻 $t_0$ に初めて受理するなら $t<t_0$ では $b=1$、$b(t_0)=0$ なので $h(m,x)=t_0$ です。(ii) 拒否停止では受理状態へ入らないので全時刻で $b=1$、(iii) 非停止でも全時刻で $b=1$ です。(ii),(iii) のどちらでも最小化の結果は未定義であり、拒否の時刻を返すことはありません。

**(3)** 第6節の $F_\mu$ を使い、$G$ として有界検査を表すλ項を指定します。$S_\mu=YF_\mu$ の初期入力を $\overline0$ とすれば、各時刻の $b$ を順番に評価し、1なら $\mathsf{SUCC}$ で次へ進み、0で現在のChurch数を返します。原始再帰関数のλ表現は第6節の初期関数・合成・再帰の構成から得られるため、この $G$ も構成できます。受理時には有限時刻で $\overline{t_0}$ を返し、その他の場合には探索が続くので値を返しません。

**(4)** 部分再帰関数やλ項が存在することは、定義域の外でも必ず止まって「いいえ」と返すことを意味しません。もし受理問題の全域決定器が得られれば、[CMP5の受理問題の決定不能性](../CMP5/index.md#thm-cmp5-atm-undecidable)に矛盾します。停止問題についても、受理停止と拒否停止を両方検査する有界判定へ変えれば、非停止の場合の最小化は未定義なので、やはり全域決定器は得られません。形式的なモデル同士の関数クラスの一致は第5・6節の**数学的定理**であり、「機械的に計算可能」という非形式的概念をそのクラスが尽くすというChurch–Turingの提唱は**提唱**です。
<!-- solution-end -->

## 9. 次の問いへ

形式言語から始まった二つの計算理論科目によって、「何を計算できるか」と「何が決定できないか」を異なるモデルから見られるようになりました。次に問うべきは、**計算できるとして、どれくらいの時間と空間が必要か**です。計算量理論では入力長を測り、[Turing機械](../CMP1/index.md)のステップ数と記憶量を区別するところから出発します。
