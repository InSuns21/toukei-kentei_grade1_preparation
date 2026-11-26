# VNP12 E/L：Euclid hub長の節約、k・ℓの最適化とlog指数4/3

[前講の完全ネットワークの切断費用不等式](../VNP11/index.md#thm-vnp11-cut-cost) は、回路から生じる均衡切断のどれかについて成立しました。元の辺の長さを保ち、すべての切断で二つのハブへの接続を短くできれば、中央のwireに大きな情報量が必要になります。ただし、固定した配置で回路サイズが多項式を超えることと、行列次元に対して具体的な超多項式下界を得ることは違います。後者には、切断を選ぶための費用を一様に評価する工夫が必要です。

一次資料：Claude (Anthropic), [VP ≠ VNP over every field, v1](https://hexagonmath.org/2611.00954v1), Appendix E/L、および [Flat.lean](https://github.com/anthropics/formal-math/blob/main/vp-vnp/Paper/Flat.lean)、[Convex.lean](https://github.com/anthropics/formal-math/blob/main/vp-vnp/Paper/Convex.lean)、[Rate.lean](https://github.com/anthropics/formal-math/blob/main/vp-vnp/Paper/Rate.lean)。本講は平坦仮説下の論証です。収縮仮説の場合と全標数への移行は後の講で扱います。

直接前提：[VNP11](../VNP11/index.md)、[VNP9](../VNP9/index.md)、[VNP7](../VNP7/index.md)、[VNP5](../VNP5/index.md)、[VNP3](../VNP3/index.md)、[VNP2](../VNP2/index.md)。

## 1. 切断を選ぶ番号を共有する

体 $K$ を固定します。対数の底はすべて2とし、正整数 $n$ に対して $[n]=\{1,\ldots,n\}$ と書きます。$t^n$ は同じ配列の $n$ 個の積を表し、各partyの添字はその直積になります。[被覆型スペクトル点](../VNP3/index.md#def-vnp3-cover-spectral)を考えます。積の評価は各因子の評価の積に等しく、被覆を与えたときの評価は材料の評価の総和以下です。有限非空party集合 $V$ の非空部分集合 $P$ に対して、[部分集合上の対角テンソル](../VNP3/index.md#def-vnp3-diagonal) を $\langle q\rangle_P$、[対角資源の指数と擬距離](../VNP3/index.md#lem-vnp3-exponents) の指数を $g_\phi(P)$ と書きます。すなわち $g_\phi(P)=\log\phi(\langle2\rangle_P)$ で、$0\le g_\phi(P)\le1$ です。

普通の被覆不等式は材料数を $J$ として $\phi(t)\le J\max_j\phi(T_j)$ を与えます。ここで配列・partyは [多party配列](../VNP2/index.md#def-vnp2-party-array)、被覆は [局所制限の和による被覆](../VNP2/index.md#def-vnp2-sum-restrictions) の意味で用います。しかし各材料を選ぶ番号を必要とするのは、出力添字が非自明なpartyだけです。冪を取って同じ材料の使用回数ごとにまとめると、指数 $g_\phi(P)$ を用いて選択費用を精密化できます。

<a id="thm-vnp12-few"></a>

<!-- formal-statement-start -->
> **補題（少数項の選択費用）**
>
> 体 $K$、有限非空party集合 $V$、非空部分集合 $P\subseteq V$、被覆型スペクトル点 $\phi$ を取る。配列 $t$ の $V\setminus P$ の添字集合はすべて一元集合とする。整数 $J\ge1$ とし、材料 $T_1,\ldots,T_J$ が $t$ を被覆するなら

$$
\phi(t)\le J^{g_\phi(P)}\max_{1\le j\le J}\phi(T_j).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[局所制限の和による被覆](../VNP2/index.md#def-vnp2-sum-restrictions) の定義から、局所線形写像による出力 $t_j$ を使い $t=\sum_{j=1}^J t_j$ と書けます。各 $t_j$ は $t$ と同じ添字集合を持ちます。$M=\max_j\phi(T_j)$ とすると単調性から $\phi(t_j)\le M$ です。$M=0$ の場合は通常の被覆不等式で結論が出るので、$M>0$ とします。

正整数 $n$ に対し、各partyの添字を $n$ 組にした積を展開します。

$$
t^n=\sum_{w\in[J]^n}t_{w_1}\cdots t_{w_n}.
$$

語 $w$ の各文字 $j$ の出現回数を $n_j$ とします。$0\le n_j\le n$ なので、回数の組（型）は高々 $(n+1)^J$ 通りです。型を一つ固定し、属する語の数を $r\ge1$、代表語を $w^0$ とします。各語は代表語の位置を置換して得られます。

代表積に $\langle r\rangle_P$ を掛けます。$P$ 内の各partyでは共有番号 $i$ が指す語の置換を選び、代表積の $n$ 個の局所添字をその順に並べ替え、番号を出力から消します。これは番号と添字組の各基底を一つの添字組へ送る線形写像です。$P$ 外の出力添字は一元集合なので、置換の作用は恒等であり、共有番号を受け取る必要はありません。

対角テンソルの係数が非零なのは番号が全partyで一致する場合だけです。従って出力係数は $r$ 個の置換済み積の係数の和、すなわちこの型に属する全語の和です。同じ出力が複数回生じても、体 $K$ 上でその回数分の和を取るので展開と一致します。

[対角資源の指数と擬距離](../VNP3/index.md#lem-vnp3-exponents) と乗法性により、この型の評価は

$$
r^{g_\phi(P)}\prod_j\phi(t_j)^{n_j}
\le J^{ng_\phi(P)}M^n
$$

です。出現回数が0の因子は積から除きます。$r\le J^n$ と指数の非負性を使いました。型の和を通常の被覆不等式で評価すると

$$
\phi(t)^n\le(n+1)^J(J^{g_\phi(P)}M)^n.
$$

$n$ 乗根を取り、固定した $J$ に対して $J\log(n+1)/n\to0$ とすれば $(n+1)^{J/n}\to1$ です。従って主張が得られます。
<!-- proof-end -->

例えば $J=2,n=3$ では型は $(3,0),(2,1),(1,2),(0,3)$ の四つです。$(2,1)$ の代表積 $t_1t_1t_2$ から番号1,2,3に対応する置換によって $112,121,211$ の和を作ります。$g_\phi(P)=0$ なら最終的な選択費用は1です。一般には $g_\phi(P)$ を距離から評価する必要があります。

## 2. 対角資源の位置を変える

有限非空ラベル集合 $I$ と配置写像 $a:I\to V$ に対し、全ラベルで番号を共有する対角テンソルを $a$ で移したものを考えます。複数のラベルが同じ位置に来ても、局所添字組の全成分が同一の番号である基底だけを残せば、像 $a(I)$ 上の対角テンソルと相互に局所制限できます。そこで既習の指数を配置の関数として

$$
G_\phi(a)=g_\phi(a(I))
$$

と書きます。これはラベルの個数ではなく、配置された位置集合で決まります。

<a id="vnp12-move"></a>

**位置変更の評価**：二つの配置 $a,b$ を取ります。$a(I)$ の共有番号を各 $i\in I$ に対応する [wire資源](../VNP2/index.md#def-vnp2-wire) で移します。$W_2(u,v)$ は二つの番号を共有する端点 $u,v$ のwireです。

$$
W_2(a(i),b(i))
$$

具体的には、出発点 $a(i)$ で共有番号とwire番号が一致する成分だけを残し、到着点 $b(i)$ で到着番号を出力します。同じ位置に複数の番号が到着するときは、それらの一致条件を局所写像に含めます。

$a(i)=b(i)$ ならwireを置かず番号をそのまま使います。全出力の番号が一致する場合に内部番号は一意であり、そうでなければ係数は零です。こうして $b(I)$ の共有番号が得られます。

従って [対角資源の指数と擬距離](../VNP3/index.md#lem-vnp3-exponents) と乗法性から

$$
G_\phi(b)\le G_\phi(a)+\sum_{i\in I}d_\phi(a(i),b(i)).
$$

逆方向も成り立つため、位置変更による指数の差は右辺の距離和で抑えられます。以下でこの評価と幾何的な中点を組み合わせます。$\mathbb R^k$ では [標準内積](../../../基礎科目/F0/F0-00E1/index.md#def-f0-00e1-inner-product) を用います。

$$
\langle x,y\rangle=\sum_{a=1}^k x_a y_a,\qquad
\|x\|=\sqrt{\langle x,x\rangle}.
$$

添字 $a$ は座標番号です。

<a id="lem-vnp12-midpoint"></a>

<!-- formal-statement-start -->
> **補題（対角資源の近似中点評価）**
>
> 体 $K$、有限非空集合 $V\subset\mathbb R^k$ と有限非空ラベル集合 $I$、実数 $\eta>0$ を取る。ある $\delta>0$ が存在し、$V$ 上の任意の被覆型スペクトル点 $\phi$ と実数 $\lambda\ge0$ が

$$
|\lambda d_\phi(u,v)-\|u-v\||<\delta
\qquad(u,v\in V)
$$

> を満たすとき、任意の写像 $a,b,m:I\to V$ で $m(i)=(a(i)+b(i))/2$ なら

$$
\lambda G_\phi(m)
\le\frac{\lambda G_\phi(a)+\lambda G_\phi(b)}{2}+\eta.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

新しいparty $q_i$ を各ラベルに一つ追加し、古い点を固定して $q_i$ を $a(i)$ または $b(i)$ に送る二つの写像を考えます。重みを各 $1/2$ とします。

[スペクトル点の混合拡張](../VNP5/index.md#thm-vnp5-extension) を、全古い点対の次元2のwireと、$m(I)$ 上の対角テンソル $\langle2\rangle_{m(I)}$ の積を指定配列として適用します。各古い因子は二つの写像の下で変わらないので拡張後の評価は元の評価以下です。指定した積の評価は保存され、各因子の評価は正です。したがって各因子の評価も保存されます（一因子でも真に小さければ積も真に小さいためです）。

拡張後のスペクトル点を $\psi$、拡大距離を $D=\lambda d_\psi$ とします。古い点の距離と $\lambda G_\phi(m)$ が保存されています。新しい点の配置を $q:i\mapsto q_i$ とすると、混合評価の上界から

$$
D(q_i,a(i)),D(q_i,b(i))
\le \tfrac12 D(a(i),b(i)),
$$

$$
\lambda G_\psi(q)
\le \tfrac12\lambda(G_\phi(a)+G_\phi(b)).
$$

前者は一方の写像でwireの両端が一致して距離0、他方で $a(i),b(i)$ の距離になること、後者は対角テンソルがそれぞれ $a(I),b(I)$ の対角テンソルと相互制限になることから、評価の対数を取って得られます。

$D$ は [wire単価の極限price](../VNP3/index.md#def-vnp3-price) です。三角不等式により $q_i$ は $D$ での中点です。$R=\max_{u,v\in V}\|u-v\|$、$h=D(a(i),b(i))$ と置きます。$m(i)$ は Euclid中点なので

$$
D(m(i),a(i))
\le \tfrac12\|a(i)-b(i)\|+\delta
\le h/2+3\delta/2
$$

となり、$b(i)$ 側も同じ上界です。[price上の中点二乗評価](../VNP7/index.md#thm-vnp7-price-cn) を $a(i),b(i),q_i,m(i)$ に適用し、$u=3\delta/2$ と置くと

$$
D(q_i,m(i))^2
\le (h/2+u)^2-(h/2)^2=hu+u^2.
$$

$0<\delta\le1$ と選べば $h\le R+1$ なので

$$
hu+u^2\le (2R+4)\delta.
$$

実際、右辺の係数との差は $2R+4-(3(R+1)/2+9/4)=R/2+1/4\ge0$ です。

[位置変更の評価](#vnp12-move) を拡張後の配置 $q,m$ に適用し、$m$ の指数の保存を使うと

$$
\lambda G_\phi(m)
\le\lambda G_\psi(q)+|I|\sqrt{(2R+4)\delta}.
$$

$\delta=\min(1,\eta^2/(|I|^2(2R+4)))$ と取れば誤差は $\eta$ 以下です。$\delta$ は配置写像ではなく有限集合とラベル数だけに依存するため、すべての中点関係について同時に使えます。
<!-- proof-end -->

## 3. 軸上の点を立方体の対角線から作る

[平坦仮説の定義](../VNP9/index.md#def-vnp9-cases) と [wire単価の極限price](../VNP3/index.md#def-vnp3-price) によれば、有限Euclid配置のすべての距離を共通の拡大スペクトル点で近似できます。標準基底 $e_i$ は第 $i$ 座標だけが1で他が0のベクトルです。しかし拡大率 $\lambda$ 自体の一様上界はありません。必要なのは $\lambda g_\phi(P)$ の上界です。軸上の点 $\pm e_i/2$ を立方体の対角線上の二点から中点操作で作れば、その上界は $\sqrt{k}$ 程度になります。

<a id="thm-vnp12-cube"></a>

<!-- formal-statement-start -->
> **命題（軸配置の選択費用）**
>
> 体 $K$ が平坦仮説を満たすとする。整数 $k\ge1$、有限集合 $V\subset\mathbb R^k$、非空部分集合

$$
P\subseteq V\cap\{\pm e_1/2,\ldots,\pm e_k/2\}
$$

> および $\varepsilon>0$ を取る。$e_i$ は標準基底とする。このとき $V$ 上の被覆型スペクトル点 $\phi$ と $\lambda\ge0$ が存在し、全点対で

$$
|\lambda d_\phi(u,v)-\|u-v\||<\varepsilon,
\qquad \lambda g_\phi(P)\le\sqrt{k}+\varepsilon
$$

> を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$V$ に座標が $0,\pm1/2$ の全点を加えた有限集合を $V'$ とします。ラベル集合は $I=P$ とします。各ラベルは $s e_d/2$（$s\in\{-1,1\}$）と一意に書けます。

$0\le j\le k$、符号列 $\chi\in\{-1,1\}^k$ に対し、配置 $a_{j,\chi}$ を

$$
a_{j,\chi}(s e_d/2)=
\begin{cases}
s e_d/2 & d\le j,\\
(s\chi_d/2)\displaystyle\sum_{i>j}\chi_i e_i & d>j
\end{cases}
$$

と定めます。$j=0$ では像が $\pm\chi/2$ の二点に含まれ、両点の距離は $\sqrt{k}$ です。$j=k$ では元の軸配置そのものです。

$j<k$ で $\chi^+,\chi^-$ を $\chi$ の第 $j+1$ 成分だけそれぞれ $+1,-1$ に変えた符号列とします。$a_{j+1,\chi}$ は $a_{j,\chi^+},a_{j,\chi^-}$ の点ごとの中点です。実際、$d\le j$ なら両方とも元の軸点、$d=j+1$ なら第 $d$ 成分が $s/2$ で固定され、残りの成分は符号反転で相殺されます。$d>j+1$ なら第 $j+1$ 成分だけが相殺され、他の成分は同じです。

例えば $k=2$、ラベル $e_2/2$、$\chi=(1,1)$ では最初の二候補は $(1/2,1/2),(-1/2,1/2)$ で中点は $(0,1/2)$ です。一方ラベル $e_1/2$ の候補は $(1/2,1/2),(1/2,-1/2)$ となり中点は $(1/2,0)$ です。

[対角資源の近似中点評価](#lem-vnp12-midpoint) を $V',I,\eta=\varepsilon/(2k)$ に適用し、その $\delta$ を先に確定します。[平坦仮説の定義](../VNP9/index.md#def-vnp9-cases) と [wire単価の極限price](../VNP3/index.md#def-vnp3-price) により、$V'$ 上で距離の誤差が $\min(\delta,\varepsilon/2)$ 未満となる共通の $\phi',\lambda$ を取れます。

$j=0$ では像が二点以下なので、二点なら指数はその距離の指数、一点なら0です。従って $\lambda G_{\phi'}(a_{0,\chi})\le\sqrt{k}+\varepsilon/2$。全符号列に対するこの評価から出発し、中点評価を一段ずつ使うと

$$
\lambda G_{\phi'}(a_{j,\chi})
\le\sqrt{k}+\varepsilon/2+j\varepsilon/(2k).
$$

実際、二候補の右辺がともにこの $j$ 段の値以下なら、平均を取って $\eta$ を加えた値は $j+1$ 段の上界です。$j=k$ を代入すれば $\lambda g_{\phi'}(P)\le\sqrt{k}+\varepsilon$ です。

最後に $V$ への制限を取ります。これは $V$ から $V'$ への包含による [push-forwardの演算と合成](../VNP2/index.md#thm-vnp2-push-laws) と被覆保存で定めるスペクトル点で、$V$ の対角資源とwireの値を変えません。よって距離の誤差上界と $\lambda g_{\phi}(P)$ の上界が同時に成立します。
<!-- proof-end -->

## 4. 二つのハブをどこに置くか

[完全ネットワーク多項式](../VNP11/index.md#def-vnp11-complete-network) の頂点数を $k\ge2$、各辺のビット数を $\ell\ge1$、辺数を $N=k(k-1)/2$ とします。実空間 $\mathbb R^k$ の標準基底を $e_a$ とし、各辺 $\{a,b\}$（$a<b$）の二端を $e_a/2,-e_a/2$ に置きます。位置の重複は許しますが端の添字は消しません。

どの辺も元の長さは1ですから、長さの総和は $N$ です。均衡集合 $S$ は $k/3\le |S|\le2k/3$ を満たす集合です。頂点 $a$ が $S$ に属すれば $\sigma_a=1$、そうでなければ $\sigma_a=-1$ とします。横断辺とは一端だけが $S$ に属する辺、すなわち $\sigma_a\ne\sigma_b$ となる辺です。二つのハブを互いに反対方向へ動かす際、各横断辺が小さい端点の軸に沿ってどれだけ節約に寄与するかを、次のベクトルに集めます。

<a id="def-vnp12-hub-direction"></a>

<!-- formal-statement-start -->
> **定義（均衡切断のハブ方向）**
>
> 整数 $k\ge2$、$k/3\le |S|\le2k/3$ を満たす集合 $S\subset[k]$ とし、$\sigma_a=1$（$a\in S$）、$\sigma_a=-1$（$a\notin S$）とする。実ベクトル

$$
t_S=\sum_{\substack{a<b\\\sigma_a\ne\sigma_b}}\sigma_a e_a
$$

> を切断のハブ方向とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vnp12-hub-direction -->
**定義の確認**：$k=3,S=\{2\}$ では $1\le|S|\le2$ で均衡です。横断辺は12と23だけであり、小さい端点の符号はそれぞれ $-1,+1$ です。辺13は同じ側にあるので和に入りません。各横断辺について小さい端点 $a$ の基底ベクトル $e_a$ に符号 $\sigma_a$ を掛けて足すので、

$$
t_S=(-1)e_1+(+1)e_2=(-1,1,0).
$$

標準内積では基底の異なる成分の積が消えるため、

$$
\|t_S\|^2=(-1)^2+1^2+0^2=2.
$$

従って $\|t_S\|=\sqrt2$ です。この計算で均衡条件、横断辺の選択、符号付きの基底展開を確認できました。
<!-- definition-example-end -->

<a id="thm-vnp12-hub-saving"></a>

<!-- formal-statement-start -->
> **命題（軸配置のハブ長の節約）**
>
> 整数 $k\ge2$、$k/3\le |S|\le2k/3$ を満たす集合 $S\subset[k]$、$N=k(k-1)/2$ を取る。$\sigma_a=1$（$a\in S$）、$\sigma_a=-1$（$a\notin S$）とする。各辺 $a<b$ の端を $p_{ab}=e_a/2,p_{ba}=-e_a/2$ に置く。このときある $x_S\in\mathbb R^k$ が存在し、

$$
\|x_S\|=\frac{2}{9\sqrt{k}},\qquad
\sum_{a\ne b}\|p_{ab}-\sigma_a x_S\|
\le N-\frac{4k}{81}.
$$

> 二つのハブ $x_S,-x_S$ の距離は $4/(9\sqrt{k})$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$s=|S|$ と置けば横断辺数は $s(k-s)$ です。$k/3\le s\le2k/3$ より

$$
s(k-s)=k^2/4-(s-k/2)^2
\ge 2k^2/9.
$$

符号ベクトル $\sigma=(\sigma_1,\ldots,\sigma_k)$ のノルムは $\sqrt{k}$、各横断辺の内積への寄与は $\sigma_a^2=1$ です。[Cauchy–Schwarzの不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz) から

$$
2k^2/9\le \langle t_S,\sigma\rangle
\le\|t_S\|\sqrt{k}.
$$

よって $\|t_S\|\ge2k^{3/2}/9>0$。$\gamma=2/(9\sqrt{k})$、$x_S=\gamma t_S/\|t_S\|$ と取ればノルムは $\gamma$ です。

任意の単位ベクトル $u$ とベクトル $y$ について

$$
\|u/2-y\|
\le \frac12+\|y\|^2-\langle u,y\rangle.
$$

理由は $v=\|u/2-y\|^2\ge0$ に対し $(\sqrt v-1/2)^2\ge0$ なので $\sqrt v\le v+1/4$、さらに $v=1/4+\|y\|^2-\langle u,y\rangle$ だからです。

この評価を辺 $a<b$ の二端に適用します。第一端は $u=e_a,y=\sigma_a x_S$、第二端は $u=-e_a,y=\sigma_b x_S$ です。その和は

$$
\|p_{ab}-\sigma_a x_S\|+\|p_{ba}-\sigma_b x_S\|
\le 1+2\gamma^2-(\sigma_a-\sigma_b)\langle e_a,x_S\rangle.
$$

同じ側なら最後の項は零、異なる側なら $\sigma_a-\sigma_b=2\sigma_a$ です。外側の長さの総和を

$$
B_S=\sum_{a\ne b}\|p_{ab}-\sigma_a x_S\|
$$

と書きます。[均衡切断のハブ方向](#def-vnp12-hub-direction) により、横断辺の一次項を全辺で足して

$$
B_S\le N+2N\gamma^2-2\langle t_S,x_S\rangle
=N+k(k-1)\gamma^2-2\gamma\|t_S\|.
$$

ここで

$$
k(k-1)\gamma^2=4(k-1)/81\le4k/81,
$$

$$
2\gamma\|t_S\|\ge
2\frac{2}{9\sqrt{k}}\frac{2k^{3/2}}9=\frac{8k}{81}.
$$

従って $B_S\le N-4k/81$。中央距離は $\|x_S-(-x_S)\|=2\gamma$ です。
<!-- proof-end -->

ハブ移動の費用は $\gamma^2$ に比例し、節約は $\gamma$ に比例するため、小さな正の移動で節約が生じます。ハブを両方とも原点に固定すると各辺の二端の長さの和は1で節約はありません。


## 5. 固定した頂点数での下界

一様な下界へ進む前に、原著の固定 $k$ の評価を確認します。ここでは各辺の端を $p_{ab}=(e_a-e_b)/(2\sqrt2)$ と置きます。$p_{ba}=-p_{ab}$ なので元の辺長は1です。前節の軸配置とは異なる配置であり、端の選択費用を制御する必要がない代わりに、$\ell$ の閾値は $k$ と体に依存します。

<a id="thm-vnp12-flat-fixed"></a>

<!-- formal-statement-start -->
> **定理（平坦仮説下の固定頂点数の下界）**
>
> 体 $K$ が平坦仮説を満たすとする。各整数 $k\ge2$ に対してある整数 $\ell_0\ge1$ が存在し、$\ell\ge\ell_0$ なら完全ネットワーク多項式 $f_{k,\ell}$ を計算する除算なし二入力回路の全ゲート数 $L$ は

$$
L\ge2^{\ell k^{3/2}/6}
$$

> を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

均衡集合 $S$ について $s=|S|$、符号 $\sigma_a=1$（$a\in S$）、$\sigma_a=-1$（$a\notin S$）とします。$v=(v_1,\ldots,v_k)$ を $v_a=k-s$（$a\in S$）、$v_a=-s$（$a\notin S$）と置きます。すると

$$
\|v\|^2=s(k-s)^2+(k-s)s^2=ks(k-s)\ge2k^3/9.
$$

ここで [軸配置のハブ長の節約](#thm-vnp12-hub-saving) の証明と同じ均衡条件 $s(k-s)\ge2k^2/9$ を使いました。$x=\beta v/\|v\|$、$\beta=1/(6\sqrt{k})$ とし、所属側に応じてハブを $x,-x$ に置きます。ノルムは $\|x\|=\beta$。$\sum_a\sigma_a=2s-k$ です。和に現れる $a,b$ は順序付きの相異なる頂点です。$a=b$ の項は零なので加えても和は変わらず、各添字について独立に足すと

$$
\sum_{a\ne b}\sigma_a(e_a-e_b)
=k\sigma-(2s-k)(1,\ldots,1)=2v.
$$

各成分は $a\in S$ なら $k-(2s-k)=2(k-s)$、それ以外なら $-k-(2s-k)=-2s$ です。

[軸配置のハブ長の節約](#thm-vnp12-hub-saving) の証明中の単位ベクトルの二次評価に $u=(e_a-e_b)/\sqrt2,\ y=\sigma_a x$ を入れ、全端で足します。

$$
\begin{aligned}
B_S&\le N+2N\beta^2-\sqrt2\langle v,x\rangle\\
&=N+k(k-1)\beta^2-\sqrt2\beta\|v\|\\
&\le N+k/36-k/9=N-k/12 .
\end{aligned}
$$

中央距離は $2\beta=1/(3\sqrt{k})$ です。全端と全候補ハブを配置し、[priceの保存則](../VNP3/index.md#thm-vnp3-price-laws) による配置写像での引き戻しと [平坦仮説の定義](../VNP9/index.md#def-vnp9-cases) と [wire単価の極限price](../VNP3/index.md#def-vnp3-price) により誤差 $\delta=1/(150k)$ 未満の拡大スペクトル点を一つ選びます。その拡大率を $\lambda\ge0$ とし、$\ell_0=\max(1,\lceil100\lambda\rceil)$ と取ります。これは $\ell$ を選ぶ前に確定できます。

[完全ネットワークの切断費用不等式](../VNP11/index.md#thm-vnp11-cut-cost) を [近似の誤差評価](../VNP11/index.md#vnp11-price-error) とともに使います。元の辺長和は $N$、外側は $N-k/12$ 以下、中央は $1/(3\sqrt{k})$ なので

$$
\ell(k/12-3N\delta)\le\lambda k+(1/(3\sqrt{k})+\delta)\log L.
$$

$3N\delta=(k-1)/100\le k/100$、$\lambda k\le\ell k/100$、$\delta\le1/(150\sqrt{k})$ です。これらを代入して

$$
\ell k(1/12-2/100)
\le(1/3+1/150)\log L/\sqrt{k}.
$$

$1/12-2/100=19/300$、$1/3+1/150=17/50$ なので

$$
\log L\ge\frac{19}{102}\ell k^{3/2}\ge\frac16\ell k^{3/2}.
$$

指数を取れば結論です。
<!-- proof-end -->

[平坦仮説下の固定頂点数の下界](#thm-vnp12-flat-fixed) だけでも、標数2でない体で、$m$ 次パーマネントを計算する回路の全ゲート数 $s$ が任意の固定 $C>0$ に対して十分大きな $m$ で $s>m^C$ となることを示せます。ここからの $s$ は切断の頂点数ではなく回路サイズです。まず整数 $k$ を固定し、次のように選びます。

$$
\sqrt{k}>24(C+1),\qquad \ell=\left\lfloor\frac{\log m}{2k}\right\rfloor.
$$

十分大きな $m$ なら $\ell\ge\ell_0$ です。$3k^3\ell$ は $\log m$ の定数倍以下なので、さらに次が成り立ちます。

$$
3k^3\ell\le m^{1/2},\qquad 2^{k\ell}\le m^{1/2}.
$$

[完全ネットワークのパーマネント代入](../VNP11/index.md#thm-vnp11-permanent) から $L\le5s$ となり、

$$
\log s\ge\ell k^{3/2}/6-\log5
\ge (\sqrt{k}/12)\log m-k^{3/2}/6-\log5.
$$

$\sqrt{k}/12>2(C+1)>C$ なので十分大きな $m$ で右辺は $C\log m$ を超えます。ただし $\ell_0$ の $k$ 依存性はこの論証では評価していません。従って $m$ とともに $k$ を増やすためには別の一様評価が必要です。

## 6. 平坦仮説の下の一様回路下界

まず端と全均衡集合のハブの配置を同時に固定します。[軸配置の選択費用](#thm-vnp12-cube) をその位置集合に使い、全端の位置集合 $P$ の指数も同時に制御します。位置写像でスペクトル点を端とハブのラベル集合へ引き戻すとは、各配列を位置へ移してから評価することです。[push-forwardによる被覆の保存](../VNP2/index.md#thm-vnp2-push-covers) と積の保存によりこれはスペクトル点であり、端ラベル全体の対角資源の指数は $g_\phi(P)$ です。

<a id="thm-vnp12-flat-rate"></a>

<!-- formal-statement-start -->
> **定理（平坦仮説下の完全ネットワークの一様下界）**
>
> 体 $K$ が平坦仮説を満たすとする。整数 $k\ge2,\ell\ge100\sqrt{k}$ に対し、完全ネットワーク多項式 $f_{k,\ell}$ を計算する除算なし二入力回路の全ゲート数 $L$ は

$$
\log L\ge\frac{\ell k^{3/2}}{14},
\qquad L\ge2^{\ell k^{3/2}/16}
$$

> を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[完全ネットワークの二ハブ被覆](../VNP11/index.md#thm-vnp11-hub-cover) は $J\le2^k$ 材料からなり、出力のハブの添字は一元集合です。[少数項の選択費用](#thm-vnp12-few) を端ラベル集合に適用します。$\phi$ に対する元の辺長和を $A$、外側長和を $B_S$、中央距離を $C_S$、端集合の指数を $G$ と書きます。ここでの $B_S$ は第4・5節の Euclid 長ではなく、拡大前の擬距離の和です。[完全ネットワークの切断費用不等式](../VNP11/index.md#thm-vnp11-cut-cost) の証明と同じ各wireの冪評価を使います。元の端係数配列を $T$、切断 $S$ の材料を $H_S$ とすると、[完全ネットワークのwire係数表示](../VNP11/index.md#lem-vnp11-wire-coefficient) と [対角資源の指数と擬距離](../VNP3/index.md#lem-vnp3-exponents) から

$$
\phi(T)=2^{\ell A},\qquad
\phi(H_S)=2^{\ell B_S+C_S\log L}.
$$

全ハブの出力添字は一元集合であるため、少数項の選択費用を適用でき、

$$
2^{\ell A}\le J^G\max_S\phi(H_S)
\le 2^{kG+\ell B_S+C_S\log L}
$$

です。最後の $S$ は最大の材料の切断です。底2の対数を取ると

$$
\ell A\le kG+\ell B_S+C_S\log L
$$

となります。前講では $G\le1$ として $k$ を使いましたが、ここでは $G$ を残します。

$\varepsilon=1/(1000k)$ と置き、[軸配置の選択費用](#thm-vnp12-cube) と [軸配置のハブ長の節約](#thm-vnp12-hub-saving) を適用します。元の辺は $N$ 本、外側は $2N$ 本なので、共通の $\lambda\ge0$ について

$$
\lambda A\ge N(1-\varepsilon),
\qquad
\lambda B_S\le N-4k/81+2N\varepsilon,
$$

$$
\lambda C_S\le4/(9\sqrt{k})+\varepsilon,
\qquad
\lambda G\le\sqrt{k}+\varepsilon.
$$

回路の全ゲート数は $L\ge1$ ですから $\log L\ge0$。最初の費用不等式に $\lambda$ を掛けて代入し、$N$ を相殺すると

$$
\ell(4k/81-3N\varepsilon)
\le k(\sqrt{k}+\varepsilon)
 +(4/(9\sqrt{k})+\varepsilon)\log L.
$$

誤差と切断選択費用をそれぞれ評価します。

$$
3N\varepsilon=\frac{3(k-1)}{2000}
\le\frac{3k}{2000},
$$

$$
k(\sqrt{k}+\varepsilon)\le
\ell k(1/100+1/10000).
$$

後者は $\ell\ge100\sqrt{k}$ から $\sqrt{k}\le\ell/100$、さらに $\varepsilon\le1/1000\le\ell/10000$（$\ell\ge100$）となるためです。中央距離は $\sqrt{k}\le k$ により

$$
4/(9\sqrt{k})+\varepsilon
\le (4/9+1/1000)/\sqrt{k}.
$$

したがって

$$
\ell k^{3/2}(4/81-3/2000-1/100-1/10000)
\le (4/9+1/1000)\log L.
$$

係数を比較すると

$$
14(4/81-3/2000-1/100-1/10000)
 -(4/9+1/1000)
=\frac{169115}{2025000}>0.
$$

従って $\log L\ge\ell k^{3/2}/14$ です。$\ell k^{3/2}\ge0$ で $1/14\ge1/16$ なので、底2の指数関数の単調性から最後の下界が得られます。
<!-- proof-end -->

拡大率 $\lambda$ 自体を評価していないことが重要です。第5節の固定 $k$ での近似は $\ell$ の閾値が $\lambda$ に依存しました。ここでは $\lambda G$ を $\sqrt{k}+\varepsilon$ 以下に抑えたので、$\ell\ge100\sqrt{k}$ という $k$ だけで決まる閾値が得られました。

## 7. 行列次元の予算を配分する

標数2でない体で、[完全ネットワークのパーマネント代入](../VNP11/index.md#thm-vnp11-permanent) によれば、行列次元 $m$ が $3k^3\ell\,2^{k\ell}$ 以上なら、パーマネントの回路サイズ $s$ から完全ネットワークの回路サイズ $L\le5s$ が得られます。

この予算の対数の主項は $k\ell$ です。下界の指数 $\ell k^{3/2}=(k\ell)\sqrt{k}$ を大きくするには、$k\ell$ の予算を保ちながら $k$ を大きくしたいところです。ただし $\ell\ge100\sqrt{k}$ のため、$k^{3/2}$ が予算に収まる必要があります。そこで $k=r^2,\ell=100r$ とすれば、行列次元の対数は $r^3$ のオーダー、下界の対数は $r^4$ のオーダーになります。

<a id="thm-vnp12-permanent-rate"></a>

<!-- formal-statement-start -->
> **定理（平坦仮説下のパーマネントの定量的下界）**
>
> 標数2でない体 $K$ が平坦仮説を満たすとする。ある整数 $m_0$ が存在し、すべての $m\ge m_0$ について、$m$ 次パーマネントを計算する除算なし二入力回路の全ゲート数 $s$ は

$$
s>2^{(\log m)^{4/3}/1600^2}
$$

> を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

具体的に $m_0=2^{200\cdot6^3}$ と選べます。$m\ge m_0$ とし、$B=\lfloor\log m\rfloor$、$200r^3\le B$ を満たす最大の非負整数 $r$ を取ります。候補は有限で0を含み、$B\ge200\cdot6^3$ なので $r\ge6$ です。

$$
200r^3\le B<200(r+1)^3.
$$

$k=r^2,\ell=100r$ とすると $k\ge2$、$\ell\ge100\sqrt{k}$ です。$3\le2^r,r\le2^r,100r\le2^{100r}$ より

$$
3k^3\ell=3r^6(100r)\le2^{107r}
\le2^{100r^3}.
$$

最後は $107\le100r^2$（$r\ge6$）を使いました。従って代入に必要な行列次元は

$$
3k^3\ell\,2^{k\ell}
\le2^{100r^3}2^{100r^3}
=2^{200r^3}\le2^B\le m.
$$

[完全ネットワークのパーマネント代入](../VNP11/index.md#thm-vnp11-permanent) と [平坦仮説下の完全ネットワークの一様下界](#thm-vnp12-flat-rate) を順に適用すると

$$
5s\ge2^{\ell k^{3/2}/16}
=2^{100r^4/16}.
$$

対数を取って $\log5<3$ を使うと $\log s>100r^4/16-3>r^4$ です。最後は $r\ge6$ なら $(100/16-1)r^4>3$ だからです。

$B$ と $200(r+1)^3$ は整数なので $B+1\le200(r+1)^3$ です。また $r+1\le2r$ より

$$
\log m<B+1\le200(r+1)^3\le1600r^3.
$$

全量が非負なので $4/3$ 乗でき、

$$
(\log m)^{4/3}
\le1600^{4/3}r^4
\le1600^2r^4.
$$

従って $\log s>(\log m)^{4/3}/1600^2$。指数関数の単調性から結論を得ます。
<!-- proof-end -->

特に任意の固定 $C>0$ に対し、$\log m>(1600^2C)^3$ なら $(\log m)^{4/3}/1600^2>C\log m$ です。よって十分大きな $m$ では $s>m^C$ となります。この定量評価は平坦仮説を条件とするもので、標数2のパーマネントやBoolean回路に対して主張していません。

## 8. 演習

<a id="exercise-vnp12-a1"></a>

### A1. 型と選択番号

- Level: A
- ID: VNP12-A1

$J=2,n=4$ とする。文字1が2回、文字2が2回現れる型の語を列挙し、$g_\phi(P)=1/2$ の場合の選択費用を求めよ。

<!-- solution-start -->
**詳細解答**：語は $1122,1212,1221,2112,2121,2211$ の六つです。代表語 $1122$ の1の位置を四つのうち二つ選ぶので $\binom42=6$。 [少数項の選択費用](#thm-vnp12-few) の型ごとの構成では共有番号は6通りであり、評価は $6^{g_\phi(P)}=\sqrt6$ です。すべての16語を一括して選ぶ費用 $16^{1/2}=4$ とは異なります。
<!-- solution-end -->

<a id="exercise-vnp12-a2"></a>

### A2. 切断の方向

- Level: A
- ID: VNP12-A2

$k=4,S=\{1,3\}$ とし、横断辺、$t_S$、$\langle t_S,\sigma\rangle$ を求めよ。

<!-- solution-start -->
**詳細解答**：$|S|=2$ は $4/3\le2\le8/3$ を満たします。$\sigma=(1,-1,1,-1)$、横断辺は12,14,23,34です。[均衡切断のハブ方向](#def-vnp12-hub-direction) から

$$
t_S=e_1+e_1-e_2+e_3=2e_1-e_2+e_3.
$$

$\|t_S\|=\sqrt{4+1+1}=\sqrt6$、内積は $2+1+1=4$。これは横断辺数 $2(4-2)=4$ と一致します。
<!-- solution-end -->

<a id="exercise-vnp12-a3"></a>

### A3. ハブ移動の二次評価

- Level: A
- ID: VNP12-A3

$u=(1,0),y=(1/10,1/5)$ に対して $\|u/2-y\|$ と第4節の二次上界を求め、不等式を確認せよ。

<!-- solution-start -->
**詳細解答**：差は $(2/5,-1/5)$ なので長さは $\sqrt{4/25+1/25}=\sqrt5/5$ です。[軸配置のハブ長の節約](#thm-vnp12-hub-saving) の証明中の単位ベクトルの二次上界は

$$
1/2+(1/100+1/25)-1/10=9/20.
$$

両辺が非負であり、平方は $1/5=80/400$ と $81/400$ なので $\sqrt5/5<9/20$ が確かめられます。
<!-- solution-end -->

<a id="exercise-vnp12-a4"></a>

### A4. 立方体の一段目

- Level: A
- ID: VNP12-A4

$k=3,j=0$ とし、符号列 $\chi^+=(1,1,-1),\chi^-=(-1,1,-1)$ でラベル $-e_2/2$ と $e_1/2$ の二つの配置の中点を求めよ。

<!-- solution-start -->
**詳細解答**：[軸配置の選択費用](#thm-vnp12-cube) の配置式では $-e_2/2$ に対して $s=-1,\chi_2=1$ なので二候補は $(-1,-1,1)/2,(1,-1,1)/2$。中点は $(0,-1,1)/2$ で第1成分が消えます。

$e_1/2$ に対しては $s=1$ で $\chi_1$ が反転するので候補は $(1,1,-1)/2,(1,-1,1)/2$。中点は $(1,0,0)/2$ です。第1軸のラベルはこの段階で元の位置に戻ります。
<!-- solution-end -->

<a id="exercise-vnp12-b1"></a>

### B1. 中点の誤差を逆算する

- Level: B
- ID: VNP12-B1

拡大距離 $D$ で $D(a,b)=4$、$q$ が中点、$D(m,a),D(m,b)\le2+1/10$ とする。priceの中点評価を使って $D(q,m)$ の上界を求めよ。さらに10ラベルで $R=4,\eta=1/10$ とした場合、第2節の $\delta$ を計算せよ。

<!-- solution-start -->
**詳細解答**：[price上の中点二乗評価](../VNP7/index.md#thm-vnp7-price-cn) の右辺は

$$
(2+1/10)^2-2^2=441/100-4=41/100
$$

です。従って $D(q,m)\le\sqrt{41}/10$ です。[対角資源の近似中点評価](#lem-vnp12-midpoint) の選択は

$$
\delta=\frac{(1/10)^2}{10^2(2\cdot4+4)}
=\frac1{120000}.
$$

実際 $10\sqrt{12/120000}=1/10$ となり、全ラベルの誤差の合計が目標以内です。
<!-- solution-end -->

<a id="exercise-vnp12-b2"></a>

### B2. ハブ半径の選択

- Level: B
- ID: VNP12-B2

第4節の配置で、ハブの半径を任意の $\gamma=c/\sqrt{k}$（$c\ge0$）に変更する。$B_S$ の上界を $N,k,c$ で表し、その上界を最小にする $c$ を求めよ。

<!-- solution-start -->
**詳細解答**：[軸配置のハブ長の節約](#thm-vnp12-hub-saving) の証明から

$$
B_S\le N+k(k-1)\gamma^2-2\gamma\|t_S\|.
$$

$\|t_S\|\ge2k^{3/2}/9$ を代入すると

$$
B_S\le N+(k-1)c^2-4kc/9
\le N+k(c^2-4c/9).
$$

緩い方の上界を平方完成すると

$$
N+k((c-2/9)^2-4/81).
$$

よって最小は $c=2/9$、上界は $N-4k/81$ です。より鋭い最初の上界は $k-1>0$ を使って

$$
N+(k-1)\left(c-\frac{2k}{9(k-1)}\right)^2
-\frac{4k^2}{81(k-1)}
$$

と平方完成できます。従って許容範囲 $c\ge0$ 内の最小点は $c=2k/(9(k-1))$、最小値は $N-4k^2/(81(k-1))$ です。本文は定数が $k$ に依存しない半径を選んでいます。
<!-- solution-end -->

<a id="exercise-vnp12-b3"></a>

### B3. 固定した頂点数では何が不足するか

- Level: B
- ID: VNP12-B3

標数2でない平坦仮説を満たす体を考え、整数 $k\ge2$ を固定し、$\ell=\lfloor(\log m)/(2k)\rfloor$ とする。十分大きな $m$ で代入の予算と $\ell\ge100\sqrt{k}$ が成立することを示し、得られる下界の対数のオーダーを求めよ。

<!-- solution-start -->
**詳細解答**：$k\ge2$ を固定します。$\ell\to\infty$ なので閾値はいつか満たされます。$2^{k\ell}\le m^{1/2}$ であり、$3k^3\ell\le (3k^2/2)\log m$ は固定定数倍の対数です。$(\log m)/m^{1/2}\to0$ なので十分大きな $m$ で $3k^3\ell\le m^{1/2}$。従って $3k^3\ell2^{k\ell}\le m$ です。

[平坦仮説下の完全ネットワークの一様下界](#thm-vnp12-flat-rate) と [完全ネットワークのパーマネント代入](../VNP11/index.md#thm-vnp11-permanent) から

$$
\log s\ge\frac{\ell k^{3/2}}{16}-\log5
\ge\frac{\sqrt{k}}{32}\log m-\frac{k^{3/2}}{16}-\log5.
$$

固定した $k$ では右辺は $\log m$ の定数倍のオーダーで、回路サイズに対する一つの多項式下界です。任意の固定次数を超えるには $k$ を次数ごとに選ぶ必要があり、一様な超多項式率を出すには本文のように $m$ とともに $k$ を増やします。
<!-- solution-end -->

<a id="exercise-vnp12-b4"></a>

### B4. 一様評価の誤差予算

- Level: B
- ID: VNP12-B4

$k=4,\ell=200$ とする。軸配置における各点対の距離の許容誤差を $\varepsilon=1/(1000k)$ としたとき、全端の距離誤差 $3N\varepsilon$ と選択費用の上界 $k(\sqrt{k}+\varepsilon)$ を計算せよ。さらに第6節の費用比較から $\log L$ の下界を計算し、$\ell k^{3/2}/14$ と比較せよ。

<!-- solution-start -->
**詳細解答**：$N=6,\varepsilon=1/4000$ なので距離誤差は $3N\varepsilon=18/4000=9/2000$。選択費用の上界は $4(2+1/4000)=8+1/1000$ です。中央距離は $4/(9\sqrt{k})+\varepsilon=2/9+1/4000$ 以下です。

[平坦仮説下の完全ネットワークの一様下界](#thm-vnp12-flat-rate) の証明で導いた費用比較へ代入すると

$$
200(16/81-9/2000)
\le 8+1/1000+(2/9+1/4000)\log L.
$$

よって

$$
\log L\ge
\frac{3200/81-9/10-8-1/1000}{2/9+1/4000}
=\frac{9916076}{72081}.
$$

この値は約137.57で、一般式の下界 $200\cdot8/14=800/7$（約114.29）より大きくなります。一般式は全 $k$ を一つの定数で扱うための余裕を含むからです。
<!-- solution-end -->

<a id="exercise-vnp12-c1"></a>

### C1. 予算と指数を結び直す

- Level: C
- ID: VNP12-C1

$B=\log m>0$ とする。実数での近似モデルとして $k\ge2,\ell\ge100\sqrt{k},k\ell\le B$ を満たすとき、$\ell k^{3/2}\le100^{-1/3}B^{4/3}$ を示せ。$B\ge100\cdot2^{3/2}$ のとき等号を達成する実数の組を求め、本文の整数選択が同じ指数を与えることも確かめよ。

<!-- solution-start -->
**詳細解答**：$100k^{3/2}\le k\ell\le B$ より $k\le(B/100)^{2/3}$ です。従って

$$
\ell k^{3/2}=(k\ell)\sqrt{k}
\le B(B/100)^{1/3}=100^{-1/3}B^{4/3}.
$$

$k=(B/100)^{2/3},\ell=100(B/100)^{1/3}$ とすると $k\ell=B$ かつ $\ell=100\sqrt{k}$。指定された $B$ の下限から $k\ge2$ も成立し、両方の不等式が等号になります。

このモデルは代入の多項式因子と整数条件を除いたものです。[平坦仮説下のパーマネントの定量的下界](#thm-vnp12-permanent-rate) の整数選択では $r$ を $200r^3\le\lfloor B\rfloor<200(r+1)^3$ から決めます。$r\ge1$ なら

$$
200r^3\le B<1600r^3
$$

なので $r$ は $B^{1/3}$ の定数倍の範囲にあります。$k=r^2,\ell=100r$ で $\ell k^{3/2}=100r^4$ ですから、これは $B^{4/3}$ の定数倍の範囲です。本文ではさらに代入因子 $3k^3\ell$ とゲート増加係数5を明示的に処理しており、この近似モデルだけで実際の下界を証明したことにはなりません。
<!-- solution-end -->

## 9. 次の問い

平坦仮説の下では、幾何的配置による長さの節約と選択費用の制御から、パーマネントの定量的下界が得られました。次は [平坦または収縮：D.2](../VNP9/index.md#thm-vnp9-two-cases) のもう一方、収縮仮説が成り立つ場合です。階数方向の距離の収縮を、群上の平均距離と Poincaré型評価へつなげます。
