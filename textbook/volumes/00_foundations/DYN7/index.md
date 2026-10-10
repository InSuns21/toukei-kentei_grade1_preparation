# DYN7 円周回転・有理回転と無理回転

[DYN6の位相共役と半共役](../DYN6/index.md#def-dyn6-semiconjugacy)では、異なる空間の点を同一視するときに、どの軌道の情報が残るかを調べました。今度は、一直線の上を一定の長さずつ進む運動を考えます。実直線上では点が際限なく遠ざかりますが、長さ1だけ進んだ点を元の点と同じものと扱えば、円周を何周も回る運動になります。

この単純な規則に意外な違いがあります。1周の長さに対する回転幅が有理数なら必ず同じ場所へ戻り、無理数なら一度も元へ戻らないのに、**どんな小さな弧にも繰り返し近づく**のです。「戻らない」と「近づかない」は全く別の性質です。有限回のグラフ描画では見分けられないこの違いを、整数の計算と鳩の巣原理だけから証明します。

## 1. 区間の両端を同じ点とみなして円周を作る

実数の $x$ と $x+1$ が同じ円周上の点を表すようにします。より一般に、差が整数なら同じ点とします。$[x]$ は実数 $x$ と同じ点を表す数全体の集まりであり、$[x]=[y]$ は $x-y$ が整数であることと同値です。特に $[0]=[1]$ です。

<a id="def-dyn7-circle"></a>

<!-- formal-statement-start -->
### 定義（整数による同一視と円周）

実数 $x,y$ に対して $x\sim y$ を $x-y\in\mathbb Z$ で定める。**円周**をその同値類の集合 $S^1=\mathbb R/\mathbb Z=\{[x]:x\in\mathbb R\}$ とする。円周上の距離を

$$
d([x],[y])=\min_{k\in\mathbb Z}|x-y-k|
$$

と定める。対応 $q:\mathbb R\to S^1$, $q(x)=[x]$ を同一視写像という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-dyn7-circle -->

**定義の確認**　$[0]=[1]$ なのは $0-1=-1\in\mathbb Z$ だからです。一方 $[1/4]\ne[3/4]$ なのは差 $-1/2$ が整数でないためです。また

$$
d([0.98],[0.02])=\min_{k\in\mathbb Z}|0.96-k|=0.04.
$$

実数としては離れた $0.98$ と $0.02$ も、円周上では端点をまたいで近くなります。
<!-- definition-example-end -->

この式が代表元の選び方で変わらず、距離の三角不等式を満たすことを確かめます。これを確認しないと、円周上の「近づく」「稠密」という言葉の意味が曖昧なままです。

<a id="prop-dyn7-circle-distance"></a>

<!-- formal-statement-start -->
### 命題（円周距離の正当性）

$S^1=\mathbb R/\mathbb Z$ について、$d([x],[y])=\min_{k\in\mathbb Z}|x-y-k|$ は代表元に依存しない距離であり、任意の $x,y\in\mathbb R$ で

$$
d(q(x),q(y))\le |x-y|
$$

が成立する。従って同一視写像 $q$ は連続な全射であり、$q|_{[0,1]}$ も連続な全射であるが単射ではない。
<!-- formal-statement-end -->

### 証明の見取り図

距離の最小値は、差に最も近い整数を選んで得られます。代表元を整数だけずらしても、整数を探索する集合は同じです。最後の距離の評価では、二つの整数を足してから絶対値の和の不等式 $|u+v|\le|u|+|v|$ を適用します。

<!-- proof-start -->
### 証明

任意の実数 $u$ に最も近い整数を一つ選べば、$|u-k|\le1/2$ です。その周囲から離れた整数ほど絶対値は大きくなるので最小値は存在します。$x'=x+a$, $y'=y+b$（$a,b\in\mathbb Z$）なら

$$
|x'-y'-k|=|x-y-(k-a+b)|.
$$

$k$ が全整数を動けば $k-a+b$ も全整数を動くため、最小値は変わりません。非負性と対称性は絶対値から従い、$d([x],[y])=0$ なら $x-y$ 自身が整数で $[x]=[y]$ です。

三角不等式には、$d([x],[y])$ と $d([y],[z])$ を実現する整数 $k,\ell$ をそれぞれ選びます。絶対値について $|u+v|\le|u|+|v|$ を二つの差 $u=x-y-k$, $v=y-z-\ell$ に適用すると

$$
\begin{aligned}
d([x],[z])
&\le |x-z-(k+\ell)|\\
&=|(x-y-k)+(y-z-\ell)|\\
&\le |x-y-k|+|y-z-\ell|\\
&=d([x],[y])+d([y],[z]).
\end{aligned}
$$

したがって距離です。$k=0$ を選べることから $d(q(x),q(y))\le|x-y|$。ゆえに $x_n\to x$ なら $d(q(x_n),q(x))\to0$ で、$q$ は連続です。任意の類 $[x]$ は $x$ から写るので $q$ は全射です。整数部分を差し引けば各類には $[0,1)$ の代表元があり、$[0,1]$ への制限も全射です。ただし $q(0)=q(1)$ なので単射ではありません。$\square$
<!-- proof-end -->

注意したいのは、円周で $0$ と $1$ は**異なる二点が近い**のではなく、**初めから同じ一点**だということです。

## 2. 回転は一歩の加法だけで決まる

回転幅 $\alpha$ を「1周を1とした向き付きの移動量」とします。$\alpha=1/4$ は一歩で4分の1周、$\alpha=-1/4$ は逆向きへ4分の1周です。位置の実数表示を変えても結果が同じでなければ円周上の写像になりません。

<a id="def-dyn7-rotation"></a>

<!-- formal-statement-start -->
### 定義（円周回転）

$\alpha\in\mathbb R$ に対し、$S^1=\mathbb R/\mathbb Z$ の写像 $R_\alpha:S^1\to S^1$ を

$$
R_\alpha([x])=[x+\alpha]
$$

と定める。この写像を幅 $\alpha$ の**円周回転**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-dyn7-rotation -->

**定義の確認**　$\alpha=1/4$、初期点 $[0]$ なら $[0]\mapsto[1/4]\mapsto[1/2]\mapsto[3/4]\mapsto[1]=[0]$ です。同じ初期点を $[1]$ と書いても最初の像は $[5/4]=[1/4]$ なので、代表元に依存しません。
<!-- definition-example-end -->

<a id="prop-dyn7-rotation-isometry"></a>

<!-- formal-statement-start -->
### 命題（回転の可逆性・等距離性と半共役）

円周 $S^1=\mathbb R/\mathbb Z$ と任意の $\alpha\in\mathbb R$ について次を満たす。

1. $R_\alpha([x])=[x+\alpha]$ は正しく定まり、全単射な等距離写像である。逆写像は $R_{-\alpha}$、従って $R_\alpha$ は同相写像である。
2. 任意の $n\in\mathbb Z$ について $R_\alpha^n([x])=[x+n\alpha]$ である（負の反復は逆写像の反復）。
3. $F_\alpha:\mathbb R\to\mathbb R$, $F_\alpha(x)=x+\alpha$ と同一視写像 $q(x)=[x]$ は

$$
q\circ F_\alpha=R_\alpha\circ q
$$

を満たし、$q$ は実直線上の平行移動から円周回転への位相的半共役である。
<!-- formal-statement-end -->

### 証明の見取り図

代表元が整数だけ違うと像も同じ整数だけ違います。距離は二点の差だけから計算されるので、両方へ同じ $\alpha$ を足しても変わりません。平行移動を先に行うか同一視を先に行うかの比較が、半共役の可換式です。

<!-- proof-start -->
### 証明

$x-y\in\mathbb Z$ なら $(x+\alpha)-(y+\alpha)=x-y\in\mathbb Z$ なので定義は代表元によらず一定です。また

$$
\begin{aligned}
d(R_\alpha([x]),R_\alpha([y]))
&=\min_{k\in\mathbb Z}|(x+\alpha)-(y+\alpha)-k|\\
&=\min_{k\in\mathbb Z}|x-y-k|=d([x],[y]).
\end{aligned}
$$

等距離性は連続性を与えます。$R_{-\alpha}(R_\alpha([x]))=[x]$、逆の合成も $[x]$ なので逆写像は $R_{-\alpha}$。こちらも等距離なので連続です。反復公式は $n=0$ で成立し、$n$ から $n+1$ へ $+\alpha$ を加える帰納法と逆写像によって全整数へ拡張されます。

最後に任意の実数 $x$ で

$$
(q\circ F_\alpha)(x)=q(x+\alpha)=[x+\alpha]
=(R_\alpha\circ q)(x).
$$

$q$ は第1節で確認した連続全射であり、両自己写像は連続なので半共役です。$\square$
<!-- proof-end -->

**区間の端点をつなぐときの落とし穴**　$[0,1)$ 上の小数部分の写像 $t\mapsto\{t+\alpha\}$（$\{u\}=u-\lfloor u\rfloor$）を、通常の距離を持つ $[0,1]$ の連続自己写像と取り違えてはいけません。例えば $\alpha=1/2$ なら $t=1/2$ の左側で値は1へ、右側で値は0へ近づくため、実数値の関数として跳躍があります。円周距離では1と0を同一視しているため、$R_\alpha$ は連続です。

## 3. 有理回転は戻り、無理回転は戻らない

一歩の幅が分数 $\alpha=a/b$ で、分母 $b>0$、分子と分母が互いに素なら、$b$ 歩で $a$ 周するので必ず戻ります。ここから「何歩で**初めて**戻るか」を証明するには、分数が既約であることを使います。

<a id="thm-dyn7-periodicity"></a>

<!-- formal-statement-start -->
### 定理（有理回転の最小周期と無理回転の非周期性）

任意の $\alpha\in\mathbb R$ と $x\in S^1$ に対して、$R_\alpha^n(x)=x$ となる正整数 $n$ が存在することと $\alpha\in\mathbb Q$ は同値である。

特に $\alpha=a/b$（$a\in\mathbb Z$, $b\in\mathbb N$, $\gcd(|a|,b)=1$）なら全点の最小周期はちょうど $b$ であり、$\alpha$ が無理数なら周期点は一つもない。
<!-- formal-statement-end -->

### 証明の見取り図

点が戻る条件を同値類の等しさへ戻すと、回転幅の $n$ 倍が整数であるという条件になります。約分済みの分母 $b$ は、この整数条件を初めて満たす回数です。

<!-- proof-start -->
### 証明

$x=[t]$ と置き、[回転の反復の式](#prop-dyn7-rotation-isometry) に $[t]$ と整数 $n$ を代入すると

$$
R_\alpha^n([t])=[t+n\alpha].
$$

定義により $[t+n\alpha]=[t]$ は $(t+n\alpha)-t=n\alpha\in\mathbb Z$ と同値です。もし正整数 $n$ で戻れば $\alpha=k/n$（$k\in\mathbb Z$）なので有理数です。逆に $\alpha=a/b$ なら $b\alpha=a\in\mathbb Z$ なので $b$ 歩で戻ります。

最小性は $n a/b\in\mathbb Z$ から $b\mid na$、互いに素という仮定から $b\mid n$ を得ます。従って正の戻り時間は $b,2b,\dots$ に限られ、最小周期は $b$。無理数なら $n\alpha$ はすべての正整数 $n$ で整数になれないため、周期点は存在しません。$\square$
<!-- proof-end -->

例えば $\alpha=2/5$ は $[0],[2/5],[4/5],[1/5],[3/5]$ を一度ずつ訪れて5歩目に戻ります。一方 $\alpha=\sqrt2-1$ は無理数なので戻ることはありません。しかし戻らないだけでは「円の大部分を避けて進む」可能性をまだ排除できません。

## 4. 鳩の巣原理で小さな回転を作る

無理数を回すとき、最初の数点が離れて見えても、十分な数の点を有限個の弧へ振り分ければ、近接する二点が現れます。その時間差だけ回転すると、円周上で**0に近い移動量**が得られます。これは計算機の絵ではなく、任意の分割数で成立する事実です。

<a id="lem-dyn7-small-return"></a>

<!-- formal-statement-start -->
### 補題（有限分割による小さな回転）

$\alpha\in\mathbb R\setminus\mathbb Q$、整数 $N\ge2$ とする。このとき正整数 $m$（$1\le m\le N$）が存在して

$$
0<d([m\alpha],[0])<\frac1N
$$

を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

$0,\alpha,\ldots,N\alpha$ の小数部分は $N+1$ 個あります。長さ $1/N$ の半開区間を $N$ 個並べれば、どこかに二点が入ります。その二時刻の差を取れば、回転幅が円周上で $1/N$ より小さくなります。

<!-- proof-start -->
### 証明

$j=0,\ldots,N$ に対し、$u_j=j\alpha-\lfloor j\alpha\rfloor\in[0,1)$ を取ります。$[0,1)$ を

$$
I_r=\left[\frac rN,\frac{r+1}{N}\right)
\qquad (r=0,1,\ldots,N-1)
$$

という $N$ 個の互いに交わらない区間に分けます。$N+1$ 個の $u_j$ を入れるので、鳩の巣原理から相異なる $0\le i<j\le N$ が同じ $I_r$ に入ります。従って

$$
|u_j-u_i|<\frac1N.
$$

差を展開すると

$$
u_j-u_i=(j-i)\alpha-(\lfloor j\alpha\rfloor-\lfloor i\alpha\rfloor).
$$

$m=j-i$、$k=\lfloor j\alpha\rfloor-\lfloor i\alpha\rfloor$ とすれば $1\le m\le N$、$k\in\mathbb Z$、$|m\alpha-k|<1/N$ です。また $m\alpha=k$ なら $\alpha=k/m$ が有理数になり仮定に反します。よって $0<|m\alpha-k|<1/N$。距離はすべての整数との差の最小値なので

$$
0<d([m\alpha],[0])\le|m\alpha-k|<\frac1N.
$$

$\square$
<!-- proof-end -->

この補題では「0に近い」の向きがまだ決まっていません。$m\alpha$ の小数部分は、小さな正の数 $\delta$ か、1から小さな数 $\delta$ を引いたものです。次の証明では**両方の向き**を扱います。

## 5. 無理回転の各軌道は円周に稠密である

円周上の任意の開いた小さな弧の中へ軌道点が入るとき、その軌道は円周に**稠密**であるといいます。円周距離で言えば、任意の点 $y$ と任意の $\varepsilon>0$ に対し、いずれかの反復点が距離 $\varepsilon$ 未満に入ることです。

<a id="def-dyn7-dense-orbit"></a>

<!-- formal-statement-start -->
### 定義（前方軌道の稠密性）

距離空間 $(X,d)$ の自己写像 $f:X\to X$ と点 $x\in X$ について、前方軌道 $\{f^n(x):n\ge0\}$ が **$X$ に稠密**であるとは、任意の $y\in X$ と $\varepsilon>0$ に対して $n\ge0$ が存在し、$d(f^n(x),y)<\varepsilon$ を満たすことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-dyn7-dense-orbit -->

**定義の確認**　恒等回転 $R_0$ の $[0]$ からの軌道は $\{[0]\}$ だけです。$y=[1/2]$ と $\varepsilon=1/4$ を選ぶと、すべての $n$ で $d(R_0^n([0]),y)=1/2\ge\varepsilon$。従ってこの軌道は稠密ではありません。逆に稠密性を示すには、特定の観察点ではなく任意の $y$ と $\varepsilon$ を扱う必要があります。
<!-- definition-example-end -->

<a id="thm-dyn7-irrational-dense"></a>

<!-- formal-statement-start -->
### 定理（無理回転の全前方軌道の稠密性）

$\alpha\in\mathbb R\setminus\mathbb Q$ とし、$R_\alpha([x])=[x+\alpha]$ を $S^1=\mathbb R/\mathbb Z$ 上の回転とする。このとき任意の $x\in S^1$ の前方軌道 $\{R_\alpha^n(x):n\ge0\}$ は $S^1$ に稠密である。

より具体的には、任意の $\varepsilon>0$ に対し整数 $M\ge0$ が存在し、どの初期点 $x$ と目標点 $y$ に対しても $0\le n\le M$ で $d(R_\alpha^n(x),y)<\varepsilon$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

先ほどの補題で正の時刻 $m$ の小回転を得ます。$m$ 歩ずつ進む部分列を取ると、円周上にほぼ等間隔の細かな網目ができます。$m\alpha$ の小数部分が1に近ければ逆向きの網目になりますが、**使う時間 $0,m,2m,\ldots$ はすべて非負**です。網目の隙間を任意に小さくできれば、初期点がどこでも全ての弧へ到達します。

<!-- proof-start -->
### 証明

任意の $\varepsilon>0$ を固定します。整数 $N\ge2$ を $1/N<\varepsilon$ となるように選び、補題から $1\le m\le N$ と

$$
0<d([m\alpha],[0])<\frac1N
$$

を得ます。$m\alpha$ の小数部分を $r\in(0,1)$ とすると、$r$ は無理数です（もし $r$ が有理数なら $m\alpha=\lfloor m\alpha\rfloor+r$ も有理数になり、$\alpha$ も有理数になるため）。距離の定義から

$$
\delta=\min(r,1-r)\in(0,1/N)
$$

と置けます。従って $[m\alpha]=[\delta]$ または $[m\alpha]=[-\delta]$ です。$\delta$ も無理数なので $1/\delta$ は整数ではありません。そこで $L=\lfloor1/\delta\rfloor$ とすれば

$$
0<L\delta<1,\qquad 0<1-L\delta<\delta.
$$

実数区間 $[0,1)$ 上に $0,\delta,2\delta,\ldots,L\delta$ を並べると、隣り合う点の距離は $\delta$、末尾 $L\delta$ から1を経て先頭0へ戻る弧の長さは $1-L\delta<\delta$ です。よって円周のどの点も、この有限個の点のいずれかから円周距離で $\delta$ 以下、特に $\varepsilon$ 未満です。

もし $[m\alpha]=[\delta]$ なら、この網目は $R_\alpha^{jm}([0])=[j\delta]$（$j=0,\ldots,L$）です。もし $[m\alpha]=[-\delta]$ なら、網目は $[-j\delta]$ であり、反転 $[u]\mapsto[-u]$ は円周距離を保つので同じ隙間評価が成り立ちます。いずれも **非負の時刻 $jm$** だけを使いました。

最後に任意の初期点 $x=[t]$ では、上の網目を $[t]$ だけ平行移動した

$$
R_\alpha^{jm}(x)=[t+jm\alpha]
\qquad(j=0,\ldots,L)
$$

を得ます。回転は等距離なので、任意の目標点 $y$ はこのいずれかと距離 $\varepsilon$ 未満です。$M=mL$ と置けば $0\le jm\le M$ なので定理の強い形も成立し、特に各前方軌道は稠密です。$\square$
<!-- proof-end -->

**意味**　無理回転の軌道は元の点に一度も戻りませんが、円周のどの開いた弧にも入ります。「周期点がない」と「軌道が稠密」は両立します。ただし前方軌道は可算個の点なので円周上の全点を一度ずつ訪れるわけではありません。

## 6. 稠密性から何が言えるか

[前方不変集合](../DYN6/index.md#def-dyn6-exact-invariant)は、軌道がそこから出ない集合でした。無理回転では、ある点とその全ての行き先を含む集合は、稠密な点を含みます。ただし稠密な集合が円周の全体に等しいとは限りません。**閉集合**という仮定を加えると結論が変わります。

<a id="prop-dyn7-closed-invariant"></a>

<!-- formal-statement-start -->
### 命題（無理回転の閉じた前方不変集合）

$\alpha\in\mathbb R\setminus\mathbb Q$、$R_\alpha:S^1\to S^1$ を円周回転とする。非空な閉集合 $A\subseteq S^1$ が $R_\alpha(A)\subseteq A$ を満たすなら、$A=S^1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$A$ から一つ点を取れば、その前方軌道は不変性によって $A$ の中に残ります。しかしその軌道は円周に稠密です。閉集合は、その中の点列の極限も含むので円周全体を含みます。

<!-- proof-start -->
### 証明

非空性から $x\in A$ を取ります。$R_\alpha(A)\subseteq A$ を帰納的に使うと $R_\alpha^n(x)\in A$ がすべての $n\ge0$ で成立します。任意の $y\in S^1$ について、稠密性の定理を $\varepsilon=1/j$（$j=1,2,\ldots$）へ適用すれば、各 $j$ について非負整数 $n_j$ を選べて

$$
d(R_\alpha^{n_j}(x),y)<\frac1j.
$$

従って $R_\alpha^{n_j}(x)\to y$ です。もし $y\notin A$ なら、$A$ が閉集合なので補集合 $S^1\setminus A$ は開集合です。よってある $\eta>0$ について $d(y,z)<\eta$ となる全ての $z$ は $A$ に属しません。しかし $1/j<\eta$ を満たす $j$ を選ぶと $d(R_\alpha^{n_j}(x),y)<1/j<\eta$ で、しかもこの反復点は $A$ に入ります。矛盾するので $y\in A$。$y$ は任意だから $A=S^1$ です。$\square$
<!-- proof-end -->

閉集合という条件を外すと、この命題は偽です。$\alpha$ を無理数とし、$A=\{R_\alpha^n([0]):n\ge0\}$ と置けば $R_\alpha(A)\subseteq A$ で非空ですが、$[1/2]\notin A$ です。なぜなら $[n\alpha]=[1/2]$ となる正整数 $n$ があれば $n\alpha-1/2$ は整数となり $\alpha$ が有理数になってしまい、$n=0$ でも一致しないからです。この $A$ は稠密ですが真部分集合であり、**閉性を失うと軌道の極限点を加えることができない**のです。

さらに回転の等距離性から、異なる二点の距離は何歩進めても不変です。従って一方の軌道が他方の軌道へ次第に吸い寄せられることもありません。固定点へ縮んでいく[DYN2の模型](../DYN2/index.md#thm-dyn2-attracting-multiplier)とは異なる、安定性の一つの境界例です。

## 7. 次の極限集合へ

周期点のない無理回転にも「何度でも任意に近く戻る」という規則性があります。実際、稠密性の定理を時刻 $s$ 以後の点 $R_\alpha^s(x)$ に適用すれば、どの開いた弧にも時刻 $s$ 以後に到達します。$s$ を任意に大きくできるので、同じ弧を無限回訪れます。

次のDYN8では、反復の**有限時刻の通過点**と、長い時間が経っても繰り返し近づく**極限点の集合**を分けて調べます。

## 8. 演習と詳細解答

以下、$S^1=\mathbb R/\mathbb Z$、$q(t)=[t]$、$d([x],[y])=\min_{k\in\mathbb Z}|x-y-k|$、$R_\alpha([x])=[x+\alpha]$ とする。必要なら $[x]=[y]\Longleftrightarrow x-y\in\mathbb Z$ を用いてよい。

### A1. 端点をまたぐ距離

$d([9/10],[1/10])$ と $d([1/4],[3/4])$ を計算し、$[0]=[1]$ である理由を示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$9/10-1/10=4/5$ は整数1から $1/5$ 離れ、整数0から $4/5$ 離れます。従って $d([9/10],[1/10])=1/5$ です。$1/4-3/4=-1/2$ は整数0と整数 $-1$ からいずれも $1/2$ 離れるので距離は $1/2$ です。$0-1=-1\in\mathbb Z$ より $[0]=[1]$ です。
<!-- solution-end -->

### A2. 既約分数の回転の最小周期

$\alpha=3/8$、$x=[0]$ とする。最初の5時刻の位置を求め、どの点についても最小周期が8であることを説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$R_\alpha^n([0])=[3n/8]$ より $n=0,1,2,3,4$ で順に

$$
[0],\ [3/8],\ [6/8],\ [9/8]=[1/8],\ [12/8]=[1/2]
$$

となります。任意の $[t]$ について $R_\alpha^n([t])=[t]$ は $3n/8\in\mathbb Z$ と同値です。$3$ と $8$ は互いに素なので $8\mid n$ であり、正の戻り時刻の最小値は8です。
<!-- solution-end -->

### A3. 無理数と非周期性

$\alpha=\sqrt2-1$ とする。もしある点 $x\in S^1$ が正整数 $n$ で元へ戻るなら $\sqrt2$ が有理数になることを示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$x=[t]$ とすると $R_\alpha^n(x)=x$ は $n(\sqrt2-1)\in\mathbb Z$ を意味します。その整数を $k$ とすれば

$$
\sqrt2-1=\frac{k}{n},\qquad
\sqrt2=1+\frac{k}{n}=\frac{n+k}{n}.
$$

右辺は有理数ですが $\sqrt2$ は無理数なので矛盾します。初期点 $t$ は差を取ると消えるため、どの点にも周期はありません。
<!-- solution-end -->

### A4. 平行移動との半共役

実数上の $F_{2/3}(t)=t+2/3$ と円周上の $R_{2/3}$ に対して、$qF_{2/3}=R_{2/3}q$ を示せ。$q$ が共役写像にならない理由も述べよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

任意の $t\in\mathbb R$ で

$$
q(F_{2/3}(t))=[t+2/3]=R_{2/3}([t])=R_{2/3}(q(t)).
$$

$q$ は円周距離について $d(q(s),q(t))\le|s-t|$ なので連続で、各類に代表元があるので全射です。従って半共役です。しかし $q(0)=q(1)$ で $0\ne1$ だから単射でなく、同相写像でもないため共役ではありません。
<!-- solution-end -->

### A5. 二点間の距離は縮まない

任意の実数 $\alpha$ と $x=[0]$, $y=[1/3]$ に対し、すべての整数 $n\ge0$ で $d(R_\alpha^n(x),R_\alpha^n(y))$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

二点の $n$ 回反復はそれぞれ $[n\alpha]$, $[1/3+n\alpha]$ です。従って

$$
\begin{aligned}
d(R_\alpha^n(x),R_\alpha^n(y))
&=\min_{k\in\mathbb Z}|n\alpha-(1/3+n\alpha)-k|\\
&=\min_{k\in\mathbb Z}|-1/3-k|=1/3.
\end{aligned}
$$

回転の等距離性により最初の距離がすべての時刻で保たれます。
<!-- solution-end -->

### B1. 小さな回転の具体的な構成

$\alpha=\sqrt2-1$ とする。$7/5<\sqrt2<10/7$ を両辺の二乗で確かめ、$m=5$ に対して $0<d([m\alpha],[0])<1/5$ を分数の不等式だけで示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$(7/5)^2=49/25<2$、$(10/7)^2=100/49>2$ で、両端は正なので $7/5<\sqrt2<10/7$ です。$5\alpha=5\sqrt2-5$ より

$$
0<5\sqrt2-7<\frac17
$$

となります（左端は $5\cdot7/5-7=0$、右端は $5\cdot10/7-7=1/7$）。従って整数2との距離を選べば

$$
0<d([5\alpha],[0])\le |5\alpha-2|=5\sqrt2-7<\frac17<\frac15.
$$

左端の厳密不等式は $\alpha$ が無理数なので $5\alpha$ が整数でないことからも確認できます。この $m=5$ は正の時刻で、小さな正向きの回転を実現しています。
<!-- solution-end -->

### B2. 実数での跳躍と円周の連続性

$[0,1)$ の関数 $u(t)=\{t+1/2\}$ が $t=1/2$ で連続でないことを、左右の極限で示せ。一方 $R_{1/2}$ が円周距離で連続であることを証明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$0\le t<1/2$ なら $u(t)=t+1/2$、$1/2\le t<1$ なら $u(t)=t-1/2$ です。従って

$$
\lim_{t\uparrow1/2}u(t)=1,\qquad
u(1/2)=0,\qquad
\lim_{t\downarrow1/2}u(t)=0.
$$

実数の距離では左極限と関数値が異なるので不連続です。一方任意の $[x],[y]$ に対して

$$
d(R_{1/2}([x]),R_{1/2}([y]))
=\min_{k\in\mathbb Z}|x+1/2-(y+1/2)-k|
=d([x],[y]).
$$

任意の $\varepsilon>0$ に対し $\delta=\varepsilon$ とすれば距離 $\delta$ 未満の二点の像も距離 $\varepsilon$ 未満なので、$R_{1/2}$ は連続です。同一視後の距離では1と0が同じ点になることが差の理由です。
<!-- solution-end -->

### B3. 無理回転の稠密性を再構成する

$\alpha$ は無理数とする。任意の $\varepsilon>0$ に対して、鳩の巣原理で $m>0$ と $0<\delta<\varepsilon$ を取り、$m$ 歩刻みの非負時刻だけを使って任意の初期点からの軌道が $\varepsilon$ 稠密になることを証明せよ。$[m\alpha]=[-\delta]$ の場合を省略しないこと。

- Level: B

<!-- solution-start -->
#### 詳細解答

$N\ge2$ を $1/N<\varepsilon$ となるように取り、$0,\alpha,\ldots,N\alpha$ の小数部分を長さ $1/N$ の $N$ 区間へ分配します。$N+1$ 点なので $i<j$ が同じ区間へ入り、$m=j-i\in\{1,\ldots,N\}$ について

$$
0<d([m\alpha],[0])<1/N<\varepsilon
$$

となります。$r=\{m\alpha\}$、$\delta=\min(r,1-r)$ とすると $\delta$ は正の無理数で $[m\alpha]=[\delta]$ または $[-\delta]$ です。$L=\lfloor1/\delta\rfloor$ と置くと

$$
L\delta<1,\quad 1-L\delta<\delta.
$$

従って $[0],[\delta],\ldots,[L\delta]$ は円周を長さ高々 $\delta$ の弧に切り分けます。逆向き $[0],[-\delta],\ldots,[-L\delta]$ でも、円周の反転が距離を保つため隣接点間の隙間の長さは変わらず、同じ性質を持ちます。前向き時間 $0,m,2m,\ldots,Lm$ に現れる点が、初期点の平行移動後にこのどちらかの網目になるので、任意の目標点から距離 $\delta<\varepsilon$ にあるものが少なくとも一つあります。よってすべての初期点の前方軌道が稠密です。
<!-- solution-end -->

### B4. 閉性を外すと反例ができる

$\alpha$ を無理数とし、$A=\{R_\alpha^n([0]):n\ge0\}$ とする。$A$ が非空で前方不変、稠密でありながら $S^1$ と等しくないことを証明し、非空な閉前方不変集合の定理と矛盾しない理由を述べよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$[0]\in A$ なので非空です。$R_\alpha(R_\alpha^n([0]))=R_\alpha^{n+1}([0])\in A$ なので $R_\alpha(A)\subseteq A$。無理回転の稠密性定理を初期点 $[0]$ に適用すれば $A$ は稠密です。しかし $[1/2]\in A$ ならある $n\ge0$ で $[n\alpha]=[1/2]$ となります。$n=0$ なら $[0]\ne[1/2]$、$n\ge1$ なら $n\alpha-1/2=k\in\mathbb Z$ より $\alpha=(k+1/2)/n\in\mathbb Q$ となり矛盾です。従って $A\ne S^1$。

もし $A$ が閉なら、任意の $y\in S^1$ に距離 $1/j$ 未満で近づく $A$ の点列の極限 $y$ も $A$ に入り $A=S^1$ になるはずです。実際には $[1/2]\notin A$ なので $A$ は閉ではありません。
<!-- solution-end -->

### C1. 周期性・稠密性・半共役・不変集合の総合

$\alpha=3/7$、$\beta=\sqrt2-1$ とし、実直線上の平行移動 $F_\gamma(t)=t+\gamma$、円周上の回転 $R_\gamma([t])=[t+\gamma]$ を $\gamma=\alpha,\beta$ について考える。

(a) $qF_\gamma=R_\gamma q$ と $R_\gamma$ の等距離性を両方の $\gamma$ で示せ。

(b) $\alpha$ と $\beta$ のそれぞれについて、周期点の有無・最小周期・軌道の稠密性を判定せよ。

(c) $\beta$ について[有限分割による小回転補題](#lem-dyn7-small-return)の証明から前方軌道の稠密性の論証を再現し、非空閉前方不変集合が全円周となることを示せ。

(d) $\beta$ の回転で、異なる二点間の距離が0へ収束することがない理由と、どの初期点の軌道も一つの点へ収束しない理由を説明せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

(a) $\gamma$ がどちらであっても、実数 $t$ に対し

$$
q(F_\gamma(t))=[t+\gamma]=R_\gamma([t])=R_\gamma(q(t)).
$$

$q$ は連続全射です。$R_\gamma$ について

$$
d(R_\gamma([s]),R_\gamma([t]))
=\min_{k\in\mathbb Z}|s+\gamma-t-\gamma-k|=d([s],[t]).
$$

従って両回転とも等距離で、$q$ は半共役です。$q(0)=q(1)$ より共役ではありません。

(b) $\alpha=3/7$ は既約分数です。$n\alpha\in\mathbb Z$ は $7\mid n$ と同値なので、すべての点の最小周期は7です。その軌道は7点しか含まず、例えば円周上のその7点と異なる目標点 $y$ を選び、その有限集合との最小距離の半分を $\varepsilon$ に取れば稠密性は成立しません。$\beta$ は無理数なので $n\beta\notin\mathbb Z$ が全 $n\ge1$ に対して成立し、周期点はありません。一方 (c) により各前方軌道は稠密です。

(c) 任意の $\varepsilon>0$ に対して $1/N<\varepsilon$ となる $N\ge2$ を取ります。$u_j=\{j\beta\}$（$0\le j\le N$）を長さ $1/N$ の $N$ 区間へ分けると、二つが同じ区間に入り、差 $m=j-i$（$1\le m\le N$）について

$$
0<d([m\beta],[0])<1/N.
$$

$r=\{m\beta\}$、$\delta=\min(r,1-r)$ と置けば $0<\delta<\varepsilon$ です。$\delta$ は無理数であるため $L=\lfloor1/\delta\rfloor$ について $0<1-L\delta<\delta$。$0,\delta,\ldots,L\delta$ は円周の隙間を $\delta$ 以下にし、$m\beta$ が $-\delta$ に対応する場合も順序の反転だけで同様です。全ての時刻 $0,m,\ldots,Lm$ は非負なので、この部分軌道はどの初期点からも全ての $\varepsilon$ 球へ入ります。従って各前方軌道は稠密です。$A$ を非空閉前方不変集合とし、$x\in A$ を選ぶと全反復点は $A$ 内です。任意の $y$ に対し $1/j$ 未満で近づく反復点を各 $j$ で選ぶとそれらは $y$ に収束し、閉性から $y\in A$。従って $A=S^1$ です。

(d) 異なる $x,y$ なら $d(x,y)>0$ であり、等距離性から全ての $n$ について

$$
d(R_\beta^n(x),R_\beta^n(y))=d(x,y)>0.
$$

よってこの距離は0に収束しません。さらに、もし $R_\beta^n(x)\to p$ なら連続性から $R_\beta(R_\beta^n(x))\to R_\beta(p)$ ですが、左辺は同じ列の一つ先 $R_\beta^{n+1}(x)$ なので $p$ にも収束します。距離空間の極限の一意性から $R_\beta(p)=p$。しかし (b) により無理回転に固定点はないので矛盾です。
<!-- solution-end -->
