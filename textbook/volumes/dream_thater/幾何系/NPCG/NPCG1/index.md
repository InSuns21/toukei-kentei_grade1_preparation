# NPCG1 距離・擬距離・商・完備化：Cauchy列から構成

<!-- definition-example-audit: strict -->

距離幾何学では、座標や微分を使えない集合でも、点間の距離から空間の形を調べます。まず、点の区別が粗い場合と、近づくべき極限点が欠けている場合を区別しましょう。

例えば、観測できるのが二次元の点の横座標だけなら、$(1,2)$ と $(1,5)$ は区別できません。一方、正の実数だけの空間では $1/n$ は0に近づきますが、0は空間の点ではありません。前者は区別できない点をまとめ、後者は足りない点を加えることで解決します。

## 1. 点を区別できない距離

[距離空間の定義](../../../基礎科目/F0/F0-00B/index.md#def-f0-00b-01)では、距離が0であることと二点が等しいことが同値でした。その条件の逆向きだけを外し、異なる点でも0になれるようにします。

<a id="def-npcg1-pseudometric"></a>

<!-- formal-statement-start -->
> **定義（擬距離）**
>
> 集合 $X$ 上の関数 $p:X\times X\to[0,\infty)$ が、任意の $x,y,z\in X$ に対して次を満たすとき、$p$ を擬距離という。

$$
\begin{aligned}
p(x,x)&=0,\\
p(x,y)&=p(y,x),\\
p(x,z)&\le p(x,y)+p(y,z).
\end{aligned}
$$

> 距離と異なり、$p(x,y)=0$ から $x=y$ が従う必要はない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-npcg1-pseudometric -->
### 1.1 横座標しか測らない例

$X=\mathbb R^2$ で $x=(a,b)$、$y=(c,e)$ とし、$p(x,y)=|a-c|$ と置きます。絶対値は非負で、$p(x,x)=|a-a|=0$、$|a-c|=|c-a|$ です。さらに $z=(u,v)$ に対し

$$
\begin{aligned}
p(x,z)&=|a-u|\\
&=|(a-c)+(c-u)|\\
&\le |a-c|+|c-u|\\
&=p(x,y)+p(y,z).
\end{aligned}
$$

よって擬距離です。しかし $p((1,2),(1,5))=0$ なので距離ではありません。
<!-- definition-example-end -->

この例では、縦座標をどのように変えても、他の点までの擬距離は変わりません。実は、この性質は任意の擬距離に共通します。

<a id="lem-npcg1-four-point-bound"></a>

<!-- formal-statement-start -->
> **補題（擬距離の四点評価）**
>
> 擬距離 $p$ を持つ集合 $X$ の任意の四点 $x,y,u,v$ について

$$
|p(x,y)-p(u,v)|\le p(x,u)+p(y,v)
$$

> が成り立つ。
<!-- formal-statement-end -->

一方の点を $x$ から $u$、他方を $y$ から $v$ へ移したときの距離の変化は、それぞれの移動量の和で抑えられます。

<!-- proof-start -->
### 証明

三角不等式を二回使うと

$$
\begin{aligned}
p(x,y)&\le p(x,u)+p(u,y)\\
&\le p(x,u)+p(u,v)+p(v,y).
\end{aligned}
$$

対称性を使い、$p(u,v)$ を左へ移すと

$$
p(x,y)-p(u,v)\le p(x,u)+p(y,v).
$$

今度は $(x,y)$ と $(u,v)$ を交換します。

$$
p(u,v)-p(x,y)\le p(x,u)+p(y,v).
$$

正負両方向を評価できたので、絶対値の評価が得られます。
<!-- proof-end -->

例えば $p(x,u)=0$ なら $v=y$ と置くことで $p(x,y)=p(u,y)$ が従います。

## 2. 零距離の点をまとめる

[同値関係](../../../基礎科目/SET/SET-U1/index.md#def-setu1-equivalence-relation)を利用し、区別できない点を一つの点へまとめます。ここで単に集合をまとめるだけでなく、まとめた後も距離の値を保持したいことが重要です。

<a id="thm-npcg1-zero-distance-quotient"></a>

<!-- formal-statement-start -->
> **定理（零距離商）**
>
> 集合 $X$ 上の擬距離 $p$ に対し、$x\sim y$ を $p(x,y)=0$ で定めると同値関係になる。同値類を $[x]$、商集合を $Q=X/{\sim}$ とする。このとき

$$
d_Q([x],[y])=p(x,y)
$$

> は代表元の選び方に依存せず、$Q$ 上の距離となる。標準射影 $q:X\to Q$ は全射であり、

$$
d_Q(q(x),q(y))=p(x,y)
$$

> を満たす。
<!-- formal-statement-end -->

### 見取り図

零距離という条件から同値関係を得ます。次に、代表元の変更で距離が変わらないことを[四点評価](#lem-npcg1-four-point-bound)から確認します。最後に、異なる同値類の距離が0になることはないので、真の距離が得られます。

<!-- proof-start -->
### 証明

反射律は $p(x,x)=0$、対称律は $p(x,y)=p(y,x)$ から従います。推移律は $x\sim y$ と $y\sim z$ のとき

$$
0\le p(x,z)\le p(x,y)+p(y,z)=0
$$

となるので成立します。

[商集合・標準射影の定義](../../../基礎科目/SET/SET-U1/index.md#def-setu1-quotient-set)により $Q$ の各点は同値類です。$[x]=[u]$、$[y]=[v]$ のとき、[四点評価](#lem-npcg1-four-point-bound)から

$$
|p(x,y)-p(u,v)|\le 0+0=0.
$$

従って代表元を変えても値は変わりません。

非負性・対称性は $p$ の条件から従います。分離条件は

$$
\begin{aligned}
d_Q([x],[y])=0
&\iff p(x,y)=0\\
&\iff x\sim y\\
&\iff [x]=[y]
\end{aligned}
$$

です。三角不等式についても

$$
\begin{aligned}
d_Q([x],[z])
&=p(x,z)\\
&\le p(x,y)+p(y,z)\\
&=d_Q([x],[y])+d_Q([y],[z]).
\end{aligned}
$$

従って $d_Q$ は距離です。任意の同値類はある $x$ の $[x]$ なので $q$ は全射であり、距離の式は定義そのものです。
<!-- proof-end -->

### 2.1 例：平面から直線を取り出す

第1節の擬距離では、$[(a,b)]$ は横座標が $a$ のすべての点の集合です。横座標の等しさが同値類の等しさと一致するので、

$$
T:Q\to\mathbb R,\qquad T([(a,b)])=a
$$

は代表元に依存せず、単射です。任意の実数 $a$ には $[(a,0)]$ が対応するので全射でもあります。さらに

$$
|T([x])-T([y])|=|a-c|=d_Q([x],[y]).
$$

すなわちこの商は通常の実直線と距離を保つ全単射で対応します。

任意の同値関係に対して元の距離をこのように移せるわけではありません。例えば通常距離の実直線で0と1を同一視し、2はそのままにすると、0から2の距離は2、1から2の距離は1です。同じ類の代表元で値が異なります。零距離商では代表元の間の距離が0であることが、四点評価を通じてこの問題を防ぎます。

## 3. 足りない点を加える

零距離商で点の区別はできるようになりました。しかし、極限点が欠けている可能性は残っています。例えば $X=(0,1)\times\{0,1\}$ に横座標の擬距離を入れると、商は $(0,1)$ であり、境界点0と1が欠けています。

[距離空間のCauchy列](../../../基礎科目/F0/F0-00D/index.md#def-f0-00d-01)と同じ条件を $p$ で考えます。すなわち、任意の $\varepsilon>0$ に対してある $N$ が存在し、

$$
m,n\ge N\Longrightarrow p(x_m,x_n)<\varepsilon
$$

となる点列を考えます。零距離商の公式によって、これは $(q(x_n))$ が $Q$ のCauchy列であることと同値です。

既習の[一般距離空間の完備化](../../../基礎科目/F0/F0-00D0A/index.md#def-f0-00d0a-completion)では、Cauchy列を、対応する項の距離が0に近づくときに同一視します。擬距離でも同じ式を直接使えます。

<a id="thm-npcg1-pseudometric-completion"></a>

<!-- formal-statement-start -->
> **定理（擬距離のCauchy列による完備化）**
>
> 空でない集合 $X$ と擬距離 $p$ を取る。任意の $\varepsilon>0$ に対してある自然数 $N$ が存在し、

$$
m,n\ge N\Longrightarrow p(x_m,x_n)<\varepsilon
$$

> を満たす $X$ の点列全体を $\mathcal C_p$ とする。関係 $(x_n)\approx(y_n)$ を

$$
\lim_{n\to\infty}p(x_n,y_n)=0
$$

> で定めると同値関係になる。商集合 $M=\mathcal C_p/{\approx}$ に

$$
D([(x_n)],[(y_n)])=\lim_{n\to\infty}p(x_n,y_n)
$$

> を入れると、代表列に依存しない完備な距離が得られる。写像 $j:X\to M$ を $j(x)=[(x,x,\ldots)]$ とすると、その像は稠密で、

$$
D(j(x),j(y))=p(x,y)
$$

> を満たす。
<!-- formal-statement-end -->

### 見取り図

先に零距離商 $Q$ を作り、既習の完備化を適用します。各項を $q$ で写すとCauchy条件も列間の距離も変わりません。このため、$p$ を使って直接作る点の集合と、$Q$ の完備化は同じ距離構造になります。

<!-- proof-start -->
### 証明

まず[四点評価](#lem-npcg1-four-point-bound)より

$$
|p(x_m,y_m)-p(x_n,y_n)|
\le p(x_m,x_n)+p(y_m,y_n).
$$

右辺は二つの列のCauchy条件により、任意の $\varepsilon>0$ に対して十分大きい $m,n$ で $\varepsilon$ 未満です。従って左辺の距離列は実数のCauchy列であり、[実数の完備性](../../../基礎科目/RA/RA1/index.md#thm-ra1-real-completeness)から有限の極限を持ちます。

反射性、対称性は $p$ の条件から従います。推移性は $(x_n)\approx(y_n)$、$(y_n)\approx(z_n)$ に対し

$$
0\le p(x_n,z_n)\le p(x_n,y_n)+p(y_n,z_n)\to0
$$

から従います。代表列を変えた場合も[四点評価](#lem-npcg1-four-point-bound)により

$$
|p(x_n,y_n)-p(u_n,v_n)|
\le p(x_n,u_n)+p(y_n,v_n)\to0
$$

となるので極限値は同じです。

[零距離商](#thm-npcg1-zero-distance-quotient)を $Q$ とし、その[完備化の台集合](../../../基礎科目/F0/F0-00D0A/index.md#def-f0-00d0a-completion)を $\widehat Q$ とします。各列の項ごとに $q$ を作用させ、

$$
F:M\to\widehat Q,\qquad
F([(x_n)])=[(q(x_n))]
$$

と定めます。$d_Q(q(x_m),q(x_n))=p(x_m,x_n)$ なので、右辺は $Q$ のCauchy列の類です。また

$$
d_Q(q(x_n),q(y_n))=p(x_n,y_n)
$$

なので、右辺の二つの類が等しいことと左辺の二つの類が等しいことは同値です。従って $F$ は代表列に依存せず単射です。

任意の $\widehat Q$ の点を代表するCauchy列 $(a_n)$ を取ります。$q$ が全射なので、各 $n$ について $q(x_n)=a_n$ となる $x_n$ を選べます。この列は

$$
p(x_m,x_n)=d_Q(a_m,a_n)
$$

によりCauchy条件を満たします。従って $F([(x_n)])=[(a_n)]$ となり $F$ は全射です。

[完備化距離のwell-defined性](../../../基礎科目/F0/F0-00D0A/index.md#thm-f0-00d0a-metric-well-defined)で得た距離を $\widehat d_Q$ とすると、

$$
\begin{aligned}
\widehat d_Q(F([(x_n)]),F([(y_n)]))
&=\lim_{n\to\infty}d_Q(q(x_n),q(y_n))\\
&=\lim_{n\to\infty}p(x_n,y_n)\\
&=D([(x_n)],[(y_n)]).
\end{aligned}
$$

従って $D$ は距離です。実際、非負性・対称性・三角不等式は $\widehat d_Q$ から移り、分離条件は $F$ の単射性から従います。

[完備化空間は完備](../../../基礎科目/F0/F0-00D0A/index.md#thm-f0-00d0a-complete)なので、$M$ の任意のCauchy列 $(\xi_k)$ の像 $(F(\xi_k))$ は $\widehat Q$ のある点 $\eta$ に収束します。$F$ の全射性で $\eta=F(\xi)$ となる $\xi$ を取ると

$$
D(\xi_k,\xi)=\widehat d_Q(F(\xi_k),\eta)\to0.
$$

よって $M$ は完備です。

定数列 $j(x)=[(x,x,\ldots)]$ に対しては

$$
D(j(x),j(y))=\lim_{n\to\infty}p(x,y)=p(x,y).
$$

最後に任意の $\xi=[(x_n)]$ と $\varepsilon>0$ を取ります。Cauchy条件を $\varepsilon/2$ で使い、$m,n\ge N$ で $p(x_m,x_n)<\varepsilon/2$ となる $N$ を選びます。$n=N$ と固定して $m\to\infty$ とすると、

$$
D(\xi,j(x_N))
=\lim_{m\to\infty}p(x_m,x_N)
\le\varepsilon/2<\varepsilon.
$$

これで $j(X)$ が稠密であることも確認できました。
<!-- proof-end -->

### 3.1 例：二つの端点を加える

$X=(0,1)\times\{0,1\}$、$p((a,b),(c,e))=|a-c|$ とします。列

$$
x_n=(1/(n+1),0),\qquad
y_n=(1/(n+2),1)
$$

はどちらもCauchy条件を満たします。実際、$m,n\ge N$ なら $p(x_m,x_n)\le 2/(N+1)$、$p(y_m,y_n)\le 2/(N+2)$ で、どちらも任意に小さくできます。さらに

$$
p(x_n,y_n)=\frac1{(n+1)(n+2)}\to0.
$$

従って同じ新しい点を表します。もう一方の境界は $z_n=(1-1/(n+1),0)$ で近似でき、$x_n$ と $z_n$ の完備化での距離は

$$
\lim_{n\to\infty}|1-2/(n+1)|=1.
$$

商で既存の点をまとめる操作と、完備化で極限点を加える操作の違いが見えます。

### 3.2 何が保存されるか

$D(j(x),j(y))=p(x,y)$ なので、すべての元の点間の値が保存されます。$j$ は擬距離が真の距離の場合に限り単射です。完備化に座標や曲率の仮定は必要ありません。次講では、距離だけを使って二点を結ぶ道の長さを調べます。

## 4. 演習

<a id="ex-npcg1-a01"></a>

### NPCG1-A01 値を通じて測る

- Level: A
- 目安時間: 8分
- 主題: 擬距離

実数上の $p(x,y)=|x^2-y^2|$ が擬距離だが距離ではないことを示せ。

<!-- solution-start -->
#### 詳細解答

絶対値は非負、$p(x,x)=0$、$|x^2-y^2|=|y^2-x^2|$ です。任意の $z$ について

$$
\begin{aligned}
p(x,z)&=|(x^2-y^2)+(y^2-z^2)|\\
&\le |x^2-y^2|+|y^2-z^2|\\
&=p(x,y)+p(y,z).
\end{aligned}
$$

[擬距離の定義](#def-npcg1-pseudometric)の条件をすべて確認できました。しかし $p(1,-1)=|1-1|=0$ で $1\ne-1$ なので距離ではありません。
<!-- solution-end -->

<a id="ex-npcg1-a02"></a>

### NPCG1-A02 有限集合をまとめる

- Level: A
- 目安時間: 8分
- 主題: 零距離商

$X=\{a,b,c,d\}$ とし、$f(a)=f(b)=0$、$f(c)=2$、$f(d)=5$ とする。擬距離 $p(s,t)=|f(s)-f(t)|$ の零距離商の点と距離をすべて求めよ。

<!-- solution-start -->
#### 詳細解答

$p(s,t)=0$ は $f(s)=f(t)$ と同値です。従って同値類は $A=\{a,b\}$、$C=\{c\}$、$E=\{d\}$ の3個です。[零距離商](#thm-npcg1-zero-distance-quotient)に従って代表元を選ぶと、

$$
d_Q(A,C)=2,\quad d_Q(C,E)=3,\quad d_Q(A,E)=5.
$$

対称性と自分自身への距離が0であることから、距離表は

$$
\begin{array}{c|ccc}
 &A&C&E\\ \hline
A&0&2&5\\
C&2&0&3\\
E&5&3&0
\end{array}
$$

となります。
<!-- solution-end -->

<a id="ex-npcg1-a03"></a>

### NPCG1-A03 距離の測定誤差

- Level: A
- 目安時間: 6分
- 主題: 四点評価

擬距離 $p$ において $p(x,u)\le 0.2$、$p(y,v)\le 0.3$、$p(u,v)=4$ とする。$p(x,y)$ の取り得る範囲を評価せよ。

<!-- solution-start -->
#### 詳細解答

[四点評価](#lem-npcg1-four-point-bound)を四点 $x,y,u,v$ に適用すると

$$
|p(x,y)-4|\le 0.2+0.3=0.5.
$$

絶対値を外すと $-0.5\le p(x,y)-4\le 0.5$。両辺に4を加えて

$$
3.5\le p(x,y)\le4.5.
$$

通常の実直線で $u=0$、$v=4$、$x=-0.2$、$y=4.3$ と選ぶと上端4.5を実現できます。$x=0.2$、$y=3.7$ なら下端3.5になります。
<!-- solution-end -->

<a id="ex-npcg1-a04"></a>

### NPCG1-A04 観測できない座標

- Level: A
- 目安時間: 8分
- 主題: Cauchy条件

$X=\mathbb R^2$ に $p((a,b),(c,e))=|a-c|$ を入れる。$x_n=(1/n,(-1)^n n)$ が $p$ のCauchy条件を満たし、$(0,0)$ と $(0,1)$ の両方への擬距離が0に近づくことを示せ。

<!-- solution-start -->
#### 詳細解答

$m,n\ge N$ なら

$$
p(x_m,x_n)=|1/m-1/n|\le 2/N.
$$

任意の $\varepsilon>0$ に対し $N>2/\varepsilon$ と選べば右辺は $\varepsilon$ 未満です。さらに任意の $b\in\mathbb R$ について

$$
p(x_n,(0,b))=|1/n|=1/n\to0.
$$

よって指定された二点にも擬距離0へ近づきます。これは極限が一意になる真の距離の場合と異なりますが、二点の同値類は等しいので商では一つの点になります。
<!-- solution-end -->

<a id="ex-npcg1-b01"></a>

### NPCG1-B01 任意の商で距離を作る失敗

- Level: B
- 目安時間: 12分
- 主題: 三角不等式の反例

通常距離の実数の部分集合 $\{0,1,3,4\}$ を $A=\{0\}$、$B=\{1,3\}$、$C=\{4\}$ に分ける。二類の距離候補を、それぞれの類から一点ずつ取った距離の最小値で定める。三角不等式が成立しないことを示し、零距離商との違いを説明せよ。

<!-- solution-start -->
#### 詳細解答

候補を $\delta$ と書きます。$A$ と $B$ の点の距離は1と3なので $\delta(A,B)=1$、$B$ と $C$ では3と1なので $\delta(B,C)=1$ です。しかし $A$ と $C$ は一点ずつしか持たず、$\delta(A,C)=4$ です。従って

$$
\delta(A,C)=4>1+1=\delta(A,B)+\delta(B,C).
$$

前半の最小値は $B$ の代表1、後半の最小値は代表3で実現されます。その二点の距離2を無視してしまったため、経由する道の長さが実際より短くなりました。[零距離商](#thm-npcg1-zero-distance-quotient)では同じ類の代表間の擬距離が0なので、この不一致は起きません。
<!-- solution-end -->

<a id="ex-npcg1-b02"></a>

### NPCG1-B02 商の完備性

- Level: B
- 目安時間: 15分
- 主題: Cauchy条件と完備性

空でない集合 $X$ と擬距離 $p$ を取る。零距離商 $Q$ が完備であることと、$p$ のCauchy条件を満たすすべての列 $(x_n)$ に対して、ある $x\in X$ が存在して $p(x_n,x)\to0$ となることが同値であることを示せ。

<!-- solution-start -->
#### 詳細解答

まず $Q$ が完備とします。[零距離商](#thm-npcg1-zero-distance-quotient)の距離公式により

$$
d_Q(q(x_m),q(x_n))=p(x_m,x_n).
$$

従って $(q(x_n))$ は $Q$ のCauchy列です。完備性によりある $a\in Q$ に収束します。全射性から $a=q(x)$ と書けるので

$$
p(x_n,x)=d_Q(q(x_n),a)\to0.
$$

逆に問題の後半の条件を仮定します。$Q$ の任意のCauchy列 $(a_n)$ に対し、各 $n$ について $q(x_n)=a_n$ となる代表元 $x_n$ を取ります。

$$
p(x_m,x_n)=d_Q(a_m,a_n)
$$

だから $(x_n)$ は $p$ のCauchy条件を満たします。仮定から $p(x_n,x)\to0$ となる $x$ が存在します。すると

$$
d_Q(a_n,q(x))=p(x_n,x)\to0.
$$

従って任意のCauchy列が $Q$ の点へ収束し、[完備距離空間の定義](../../../基礎科目/F0/F0-00D/index.md#def-f0-00d-02)から $Q$ は完備です。
<!-- solution-end -->

<a id="ex-npcg1-b03"></a>

### NPCG1-B03 完備化を具体的に同定する

- Level: B
- 目安時間: 15分
- 主題: 商と完備化

$X=(0,\infty)$ とし、$g(x)=x/(1+x)$、$p(x,y)=|g(x)-g(y)|$ とする。零距離商が通常距離の区間 $(0,1)$ と距離を保つ全単射で対応すること、完備化が $[0,1]$ で表せることを示せ。

<!-- solution-start -->
#### 詳細解答

絶対値の性質から $p$ は非負、対角で0、対称であり、

$$
|g(x)-g(z)|
\le |g(x)-g(y)|+|g(y)-g(z)|
$$

なので擬距離です。任意の正の $x,y$ に対し

$$
g(x)-g(y)
=\frac{x(1+y)-y(1+x)}{(1+x)(1+y)}
=\frac{x-y}{(1+x)(1+y)}
$$

だから $p(x,y)=0$ は $x=y$ と同値です。各類は一点だけであり、$T([x])=g(x)$ は単射です。$0<g(x)<1$ であり、任意の $t\in(0,1)$ には $x=t/(1-t)>0$ を取ると

$$
g(x)=\frac{t/(1-t)}{1+t/(1-t)}=t
$$

となるので全射でもあります。[零距離商](#thm-npcg1-zero-distance-quotient)の公式から

$$
|T([x])-T([y])|=d_Q([x],[y]).
$$

閉区間 $[0,1]$ は完備な実直線の閉部分集合なので、[完備空間の閉部分集合は完備](../../../基礎科目/F0/F0-00D/index.md#thm-f0-00d-01)から完備です。開区間の各点は自分自身で近似でき、両端は $1/(n+1)$ と $1-1/(n+1)$ で近似できるので像は稠密です。従って[完備化の一意性](../../../基礎科目/F0/F0-00D0A/index.md#thm-f0-00d0a-uniqueness)を $Q$ とこの閉区間の等長稠密埋め込みに適用すれば、求める完備化になります。

例えば $x_n=n$ の像は $g(x_n)=1-1/(n+1)$ であり、完備化では端点1に近づきます。元の座標で際限なく大きくなる列でも、距離を変えるとCauchy列になることが分かります。
<!-- solution-end -->

<a id="ex-npcg1-c01"></a>

### NPCG1-C01 距離を増やさない写像を完備化へ延長する

- Level: C
- 目安時間: 25分
- 主題: 代表列の選択と極限

空でない集合 $X$ に擬距離 $p$ を入れ、$(M,D)$ と $j$ を[擬距離のCauchy列による完備化](#thm-npcg1-pseudometric-completion)で構成する。完備距離空間 $(Y,\rho)$ への写像 $f:X\to Y$ が

$$
\rho(f(x),f(y))\le p(x,y)
$$

をすべての $x,y\in X$ について満たすとする。

1. $f$ は同じ零距離類の元を同じ点へ送ることを示せ。
2. $F([(x_n)])=\lim_{n\to\infty}f(x_n)$ が $M$ 上の写像として定まり、$\rho(F(\xi),F(\eta))\le D(\xi,\eta)$ を満たすことを示せ。
3. $F\circ j=f$ が成り立ち、この条件と距離を増やさない条件を満たす写像は一意であることを示せ。

<!-- solution-start -->
#### 詳細解答

1. $p(x,y)=0$ なら $0\le\rho(f(x),f(y))\le0$ となります。$\rho$ は距離なので $f(x)=f(y)$ です。
2. 任意の代表Cauchy列 $(x_n)$ を取ります。仮定から

   $$
   \rho(f(x_m),f(x_n))\le p(x_m,x_n).
   $$

   右辺は十分大きい $m,n$ で任意に小さくなります。従って $(f(x_n))$ はCauchy列です。$Y$ は完備なので極限が存在します。

   別の代表 $(y_n)$ が同じ点を表すなら $p(x_n,y_n)\to0$ です。$a=\lim f(x_n)$、$b=\lim f(y_n)$ と置くと

   $$
   \begin{aligned}
   \rho(a,b)&\le\rho(a,f(x_n))
   +\rho(f(x_n),f(y_n))+\rho(f(y_n),b)\\
   &\le\rho(a,f(x_n))+p(x_n,y_n)+\rho(f(y_n),b).
   \end{aligned}
   $$

   右辺は0に近づくので $a=b$。よって $F$ は代表列に依存しません。

   今度は $\xi=[(x_n)]$、$\eta=[(y_n)]$ を任意に取ります。同じ三角不等式から

   $$
   \rho(F(\xi),F(\eta))
   \le\rho(F(\xi),f(x_n))
   +p(x_n,y_n)+\rho(f(y_n),F(\eta)).
   $$

   $n\to\infty$ で最初と最後は0、中央は $D(\xi,\eta)$ へ収束します。従って

   $$
   \rho(F(\xi),F(\eta))\le D(\xi,\eta).
   $$

3. 定数列を入れると $F(j(x))=\lim f(x)=f(x)$ です。

   別の写像 $G:M\to Y$ が同じ二条件を満たすとします。[擬距離のCauchy列による完備化](#thm-npcg1-pseudometric-completion)の稠密性から、任意の $\xi\in M$ に対し $D(\xi,j(u_n))<1/n$ となる $u_n\in X$ を取れます。$F(j(u_n))=G(j(u_n))$ なので

   $$
   \begin{aligned}
   \rho(F(\xi),G(\xi))
   &\le \rho(F(\xi),F(j(u_n)))
   +\rho(G(j(u_n)),G(\xi))\\
   &\le 2D(\xi,j(u_n))<2/n.
   \end{aligned}
   $$

   $n\to\infty$ とすると $\rho(F(\xi),G(\xi))=0$。距離の分離条件から $F(\xi)=G(\xi)$ であり、一意性が従います。
<!-- solution-end -->

## 5. 到達点

- 擬距離の条件と、距離と異なる条件を具体例で確認できる。
- 四点評価を導き、零距離商の代表元非依存性と距離の条件を証明できる。
- Cauchy列を用いた完備化と零距離商の完備化との対応を説明できる。
- 距離を保存する構成と、距離を増やさない写像の延長を使える。

参考：Burago–Burago–Ivanov, [A Course in Metric Geometry](https://doi.org/10.1090/gsm/033)；Bridson–Haefliger, [Metric Spaces of Non-Positive Curvature](https://link.springer.com/book/10.1007/978-3-662-12494-9)。
