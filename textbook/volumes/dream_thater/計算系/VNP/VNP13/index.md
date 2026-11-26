# VNP13 F：unitriangular群のランク方向収縮と弱いPoincaré

前講までは平坦仮説で下界を構成しました。ここからは [平坦仮説と収縮仮説](../VNP9/index.md#def-vnp9-cases) の後者を固定します。大きな行列を多数の小さな操作で動かすと、普通は操作数に比例して距離が増えます。しかし階数方向の収縮があれば、平均的な距離はそれより小さくなります。本講では三角行列の群にこの効果を移し、次講で局所評価を一様評価に改善する準備をします。

一次資料：Claude (Anthropic), [VP ≠ VNP over every field, v1](https://hexagonmath.org/2611.00954v1), Appendix F.1, Lemmas F.1–F.3。直接前提：[VNP12](../VNP12/index.md)、[VNP9](../VNP9/index.md)、[VNP8](../VNP8/index.md)、[VNP3](../VNP3/index.md)。

## 1. 行列の操作を距離として測る

$\mathbb F_2$ は二元体で、以下の行列演算はこの体上で行います。添字は $0,\ldots,n-1$ とします。対角が全部1、対角より下が全部0の行列は積を取ってもこの形を保ちます。こうした行列全体を使えば、離れた座標への操作も隣接座標の操作から組み立てられます。

<a id="def-vnp13-unitriangular"></a>

<!-- formal-statement-start -->
> **定義（上単位三角群）**
>
> 正整数 $n$ に対し、$\mathbb F_2$ 上の狭義上三角行列 $N$ による行列 $I_n+N$ の全体を $U_n$ とする。演算は行列積とする。行列単位 $E_{ij}$ は位置 $(i,j)$ だけが1の行列であり、隣接操作を $x_j=I_n+E_{j,j+1}$ とする（$0\le j<n-1$）。
<!-- formal-statement-end -->

群であることを確認します。狭義上三角行列の積も狭義上三角で、$N^n=0$ です。

$$
(I+N)(I+M)=I+N+M+NM,\qquad
(I+N)^{-1}=\sum_{t=0}^{n-1}N^t.
$$

逆行列の式は積を取れば中間項が標数2で消え、$I+N^n=I$ が残るので成立します。例えば $U_3$ の要素は上三角の三つの成分が任意なので8個あります。$x_0^2=x_1^2=I$ ですが、$x_0x_1$ の $(0,2)$ 成分は1、$x_1x_0$ の同成分は0です。隣接操作は一般に可換ではありません。

次に、群要素に対して非負の費用を割り当てます。ゼロ費用の非単位元も許すことで、擬距離から作る費用を扱えます。

<a id="def-vnp13-length"></a>

<!-- formal-statement-start -->
> **定義（群の収縮長さ関数）**
>
> 群 $G$ 上の長さ関数は非負実数値関数 $L$ で、任意の $g,h\in G$ について
>
$$
L(e)=0,\quad L(g^{-1})=L(g),\quad
L(gh)\le L(g)+L(h)
$$
>
> を満たすものとする。整数 $\mu\ge3$ と実数 $1\le s<\sqrt\mu$ を固定する。任意の加法群からの準同型 $\theta:\operatorname{Mat}_{\mu}(\mathbb F_2)\to G$ に対して
>
$$
\mathbb E_{\operatorname{rank}W=\mu} L(\theta(W))^2
\le s^2\mathbb E_{\operatorname{rank}W=1} L(\theta(W))^2
$$
>
> が成立するとき、$L$ は収縮するという。各平均は指定階数の有限集合上の一様平均である。
<!-- formal-statement-end -->

例として $L(g)=0$（$g=e$）、それ以外で $L(g)=1$ を考えると、逆元で値が変わらず、積が非単位元なら少なくとも一方が非単位元なので長さの条件を満たします。ただし収縮条件は別に検証する必要があります。零関数なら全条件が成立します。非零の例として $G=(\mathbb F_2,+)$ で $L(1)=1$ を取る場合は、準同型ごとに階数別平均の比較が必要であり、長さの三条件だけから収縮を結論することはできません。

<a id="prop-vnp13-map-length"></a>

<!-- formal-statement-start -->
> **命題（写像から作る平均変位の長さ）**
>
> 有限群 $G$、擬距離空間 $(Y,d)$ と写像 $f:G\to Y$ に対し
>
$$
L_f(g)=\left(\mathbb E_{a\in G}d(f(a),f(ga))^2\right)^{1/2}
$$
>
> は長さ関数である。さらに $d$ が収縮仮説の成立する体上のpriceであるなら $L_f$ は同じ $\mu,s$ で収縮する。
<!-- formal-statement-end -->

証明の要点は、左からの乗算が有限群の一様分布を変えないことです。写像自体に準同型性は必要ありません。

<!-- proof-start -->
### 証明

単位元では距離が0です。逆元について $b=g^{-1}a$ と置けば

$$
L_f(g^{-1})^2=\mathbb E_b d(f(gb),f(b))^2=L_f(g)^2.
$$

三角不等式を $f(a),f(ha),f(gha)$ に適用します。有限集合上の二乗平均ノルムの三角不等式により

$$
L_f(gh)\le L_f(h)+
\left(\mathbb E_a d(f(ha),f(gha))^2\right)^{1/2}
=L_f(h)+L_f(g).
$$

ここで二乗平均ノルムの三角不等式は、二乗を展開して交差項をCauchy–Schwarz不等式で評価すれば得られます。

$\theta$ と $a$ を固定し、$W\mapsto f(\theta(W)a)$ で距離を引き戻します。[priceの性質](../VNP3/index.md#def-vnp3-price) による引き戻しと [収縮仮説](../VNP9/index.md#def-vnp9-cases) を適用します。指定階数 $r$ の差を持つ対の一様平均は、一様な $V$ と一様な階数 $r$ の $W$ により $V,V+W$ と書けます。準同型性により $\theta(V+W)=\theta(W)\theta(V)$ です。$a$ についても平均すると、各 $V$ について $b=\theta(V)a$ は一様なので、階数 $r$ の二乗平均距離は $\mathbb E_{\operatorname{rank}W=r}L_f(\theta(W))^2$ に一致します。したがって $r=\mu$ と $r=1$ の比較が所望の収縮条件になります。
<!-- proof-end -->

## 2. 階数方向に収縮を反復する（F.1）

階数 $\mu$ の場合だけが収縮条件に含まれています。任意の階数へ拡張するため、階数を $\mu$ 倍する操作と階数を加算する操作を組み合わせます。

<a id="lem-vnp13-rank-growth"></a>

<!-- formal-statement-start -->
> **補題（階数別平均長さの増大評価）**
>
> 収縮する長さ関数 $L$ を持つ群 $G$ と準同型 $\theta:\operatorname{Mat}_k(\mathbb F_2)\to G$ を取る。$1\le r\le k$ に対し
>
$$
D(r)=\left(\mathbb E_{\operatorname{rank}W=r}L(\theta(W))^2\right)^{1/2}.
$$
>
> $j=\lfloor\log_\mu r\rfloor$ とすると
>
$$
D(r)\le \mu(j+1)s^j D(1).
$$
<!-- formal-statement-end -->

例えば $r=10,\mu=3$ なら $10=9+1$ です。階数9の平均を階数1から二回の収縮で評価し、残る階数1を足せば $(s^2+1)D(1)$ が得られます。一般の桁でも同じ仕組みを使います。

<!-- proof-start -->
### 証明

まず $\mu i\le k$ とします。列階数 $\mu i$ の $k\times\mu i$ 行列 $A$ と行階数 $\mu i$ の $\mu i\times k$ 行列 $B$ を独立かつ一様に選びます。写像

$$
Z\longmapsto A(Z\otimes I_i)B
$$

は加法を保ちます。$B$ は全射、$A$ は単射なので像の階数は $i\operatorname{rank}Z$ です。実際、$Z$ を可逆な行列で標準形 $\operatorname{diag}(I_r,0)$ に変換すると、$Z\otimes I_i$ も可逆なブロック行列で $\operatorname{diag}(I_{ri},0)$ に変換されます。固定した $Z$ に対し、$A,B$ の分布はそれぞれ左・右からの可逆行列の乗算で不変です。階数 $ri$ の行列はこの左右作用で一つの軌道をなすので、像は同じ階数上で一様です。$\theta$ と合成した準同型に収縮条件を適用し、$A,B$ について平均すると

$$
D(\mu i)^2\le s^2 D(i)^2.
$$

次に $i+i'\le k$ とし、$W,W'$ を [横断対の階数別一様性](../VNP8/index.md#lem-vnp8-uniform-transversal) に従って選びます。具体的には互いに重ならない対角ブロックに階数 $i,i'$ の単位行列を置き、共通の独立一様な左右可逆行列を掛ければよいです。それぞれの周辺分布は指定階数で一様で、和も階数 $i+i'$ で一様です。長さの三角不等式と二乗平均ノルムの三角不等式より

$$
D(i+i')\le D(i)+D(i').
$$

$r=\sum_{t=0}^j d_t\mu^t$（$0\le d_t<\mu$）と展開します。すべての部分和は $r\le k$ 以下であるため加算評価を反復でき、また $D(\mu^t)\le s^tD(1)$ です。従って

$$
D(r)\le\sum_{t=0}^j d_t s^tD(1)
\le \mu(j+1)s^jD(1).
$$

最後に $s\ge1$ を用いて各 $s^t$ を $s^j$ で抑えました。
<!-- proof-end -->

## 3. 階数1のブロックを隣接操作で作る（F.2）

$U_n$ を最初の $k$ 座標と残りの $n-k$ 座標で分けます。右上ブロックだけを変える行列

$$
T(W)=\begin{pmatrix}I_k&W\\0&I_{n-k}\end{pmatrix}
$$

は $T(W)T(V)=T(W+V)$ を満たします。右上ブロックが階数1なら $W=\xi\omega^{\mathsf T}$ と書けます。この形を境界の操作 $x_{k-1}$ から作ります。

<a id="lem-vnp13-rank-one-word"></a>

<!-- formal-statement-start -->
> **補題（階数1ブロックの長さ評価）**
>
> $1\le k<n$、非零列ベクトル $\xi\in\mathbb F_2^k,\omega\in\mathbb F_2^{n-k}$、$U_n$ 上の任意の長さ関数 $L$ に対し
>
$$
L(T(\xi\omega^{\mathsf T}))
\le 18\sum_{j=0}^{n-2}L(x_j).
$$
<!-- formal-statement-end -->

実際には以下で各生成元を高々16回使う表現を得るので、18は余裕を持たせた定数です。

<!-- proof-start -->
### 証明

まず $\xi$ の末尾と $\omega$ の先頭が1とします。左ブロックの最後の単位ベクトルを $e$、右ブロックの最初の単位ベクトルを $e'$ とします。左ブロックの $x_j$ は列の成分 $j$ に成分 $j+1$ を加えます。積 $x_0x_1\cdots x_{k-2}$ を $e$ に作用させると右端から順に1が伝わり、全成分1になります。次に $\xi_j=0$ の位置 $j$ を小さい順に処理して $x_j$ を左から作用させます。その時点で成分 $j+1$ はまだ1なので、成分 $j$ だけを0にできます。こうして $Ae=\xi$ となる左ブロック行列 $A$ を得ます。各生成元は高々2回現れます。

右ブロックでは行ベクトルへの右乗算 $x_j$ が成分 $j$ を成分 $j+1$ に加えます。$e'^{\mathsf T}$ に右から添字の昇順で作用させて全成分を1にし、目標で0の成分を右端から順に消します。すると $e'^{\mathsf T}B=\omega^{\mathsf T}$ となる右ブロック行列 $B$ が得られ、各生成元の使用回数は高々2回です。

$x_{k-1}=T(ee'^{\mathsf T})$ です。$H=\operatorname{diag}(A,B^{-1})$ と置いてブロック積を取ると

$$
Hx_{k-1}H^{-1}
=\begin{pmatrix}I_k&Aee'^{\mathsf T}B\\0&I_{n-k}\end{pmatrix}
=T(\xi\omega^{\mathsf T}).
$$

左・右ブロックの生成元は逆行列を含めて高々4回、境界の生成元は1回です。逆行列では $x_j^{-1}=x_j$ を使います。

一般の場合、$\xi$ の末尾が0なら $\xi=e+(\xi+e)$ と分解し、両項の末尾を1にします。末尾が1なら分解不要です。$\omega$ も先頭が0なら $e'+(\omega+e')$ と分解します。外積を展開すると高々4個の先ほどの型の外積の和となります。$T$ は加法を積へ移すので、この4個の語を連結すればよく、各生成元は高々16回です。長さの三角不等式を反復して $16\sum_jL(x_j)\le18\sum_jL(x_j)$ を得ます。
<!-- proof-end -->

例えば $n=3,k=1$ で $T((0,1))=I+E_{02}$ は $x_0x_1x_0x_1$ です。実際 $x_0x_1=I+E_{01}+E_{12}+E_{02}$ で、この平方は $I+E_{02}$ です。このように隣接していない成分も生成できます。

## 4. 群全体への平均評価（F.3）

右上ブロックを一つの階数で評価できたので、行列を半分に分け、対角ブロックにも同じ手順を適用します。重要なのは半分に分けても生成元の費用を二重に数えないことです。

<a id="thm-vnp13-weak-length"></a>

<!-- formal-statement-start -->
> **定理（上単位三角群の平均長さ評価）**
>
> $\mu\ge3$、$1\le s<\sqrt\mu$ を固定する。任意の正整数 $n$ と同じ $\mu,s$ で収縮する $U_n$ 上の長さ関数 $L$ に対し、$n,\mu,s$ のみで定まる $\vartheta_n$ が存在して
>
$$
(\mathbb E_{g\in U_n}L(g)^2)^{1/2}
\le\vartheta_n\sum_{j=0}^{n-2}L(x_j),
\qquad n\vartheta_n^2=o(n^2).
$$
<!-- formal-statement-end -->

ここで $o(n^2)$ は $n^2$ で割ると $n\to\infty$ で0に収束することを意味します。一定の $\mu,s$ のもとでの主張です。

<!-- proof-start -->
### 証明

まず $n=2m$ が2の冪の場合を扱い、$n=1$ では $\vartheta_1=0$ とします。任意の行列は一意に

$$
g=\begin{pmatrix}P&R\\0&Q\end{pmatrix}
=T(RQ^{-1})\operatorname{diag}(P,I_m)\operatorname{diag}(I_m,Q)
$$

と分解できます。$P,Q$ は $U_m$ に属します。$g$ が一様なら $P,Q,R$ は独立一様で、$Q$ を固定したとき $R\mapsto RQ^{-1}$ は全単射です。従って $W=RQ^{-1}$ も独立一様です。

右上ブロックの準同型 $T$ に [階数別平均長さの増大評価](#lem-vnp13-rank-growth) を適用します。$d=\lfloor\log_\mu n\rfloor$ とすれば、$1\le r\le m$ で

$$
D(r)\le\mu(d+1)s^dD(1).
$$

階数0は単位元なので平均長さ0です。階数ごとの二乗平均を階数の確率で重み付けして足すと

$$
(\mathbb E_W L(T(W))^2)^{1/2}
\le\mu(d+1)s^dD(1).
$$

[階数1ブロックの長さ評価](#lem-vnp13-rank-one-word) で $D(1)\le18\sum_j L(x_j)$ と評価できます。両対角ブロックに制限した長さ関数も収縮します。なぜなら任意の準同型を部分群の包含と合成すれば元の収縮条件が使えるからです。帰納法の仮定と二乗平均ノルムの三角不等式から

$$
\begin{aligned}
(\mathbb E_g L(g)^2)^{1/2}
&\le18\mu(d+1)s^d\sum_{j=0}^{n-2}L(x_j)\\
&\quad+\vartheta_m\sum_{j=0}^{m-2}L(x_j)\\
&\quad+\vartheta_m\sum_{j=m}^{n-2}L(x_j).
\end{aligned}
$$

二つの末尾の和は互いに素な添字集合を使うため、$\vartheta_n=\vartheta_m+18\mu(d+1)s^d$ とできます。2の冪の各段で $d$ は最終段の値以下であるから、$n=2^a$ のとき

$$
\vartheta_n\le18a\mu(d+1)s^d.
$$

一般の $n$ では $N=2^{\lceil\log_2 n\rceil}$ とし、$U_N$ の左上 $n\times n$ ブロックへの射影 $\pi$ を取ります。上三角性によりこの射影は準同型であり、ブロック対角埋め込みがあるので全射です。有限群の全射の各ファイバーは同じ大きさであるため、一様分布は一様分布に移ります。$L\circ\pi$ は収縮し、$j<n-1$ の生成元は $x_j$ に、残りは単位元に移ります。従って $\vartheta_n=\vartheta_N$ を使えます。

$\alpha=\log_\mu s$ と置きます。$N<2n$（$n=1$ は別扱い）であり $s^{\lfloor\log_\mu N\rfloor}\le N^\alpha$ なので

$$
\vartheta_n=O((1+\log n)^2 n^\alpha).
$$

$s^2<\mu$ は $2\alpha<1$ と同値です。よって

$$
\frac{n\vartheta_n^2}{n^2}
=O((1+\log n)^4 n^{2\alpha-1})\longrightarrow0.
$$

最後の極限は正のべきが任意の固定次数の対数より速く増えることによります。
<!-- proof-end -->

<a id="cor-vnp13-weak-poincare"></a>

<!-- formal-statement-start -->
> **系（弱いPoincaré不等式）**
>
> 収縮仮説が成立する体上のprice空間 $(Y,d)$ と写像 $f:U_n\to Y$ に対して、独立一様な $a,b\in U_n$ を取ると
>
$$
\mathbb E_{a,b}d(f(a),f(b))^2
\le C(n)\sum_{j=0}^{n-2}\mathbb E_a d(f(a),f(x_ja))^2,
\quad C(n)=n\vartheta_n^2=o(n^2).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[写像から作る平均変位の長さ](#prop-vnp13-map-length) を使います。独立一様な $g,a$ について $(a,ga)$ は $U_n^2$ 上の一様分布です。従って左辺は $\mathbb E_g L_f(g)^2$ です。[上単位三角群の平均長さ評価](#thm-vnp13-weak-length) を二乗し、

$$
\left(\sum_{j=0}^{n-2}L_f(x_j)\right)^2
\le(n-1)\sum_{j=0}^{n-2}L_f(x_j)^2
\le n\sum_{j=0}^{n-2}L_f(x_j)^2
$$

を適用すれば結論を得ます。$n=1$ では両辺が0です。
<!-- proof-end -->

この評価は $C(n)$ が二次より遅く増えることを保証しますが、$n$ によらない定数は保証しません。次講では部分群の固定点への射影と重なり合う区間を利用して、この局所的な評価から一様評価を導きます。

## 5. 演習

### VNP13-A1

- Level: A

$U_3$ で $x_0^2=x_1^2=I$ と $(x_0x_1)^2=I+E_{02}$ を計算せよ。

<!-- solution-start -->
#### 詳細解答

$E_{01}^2=E_{12}^2=0$ なので標数2では $(I+E_{ij})^2=I+2E_{ij}+E_{ij}^2=I$ です。$E_{01}E_{12}=E_{02}$ より $x_0x_1=I+N$、$N=E_{01}+E_{12}+E_{02}$。行列単位の積 $E_{ij}E_{kl}=\delta_{jk}E_{il}$ から $N^2=E_{02}$ で、$(I+N)^2=I+E_{02}$ です。
<!-- solution-end -->

### VNP13-A2

- Level: A

$G=U_2=\{e,x_0\}$、実数値写像 $f(e)=2,f(x_0)=5$ について $L_f(e),L_f(x_0)$ を求め、長さの条件を確認せよ。

<!-- solution-start -->
#### 詳細解答

[写像から作る平均変位の長さ](#prop-vnp13-map-length) の式で、$L_f(e)=0$、$L_f(x_0)^2=(|2-5|^2+|5-2|^2)/2=9$ なので $L_f(x_0)=3$ です。両要素は自分自身が逆元です。積に単位元が含まれると三角不等式は等号、$x_0x_0=e$ なら $0\le6$ です。実数距離を使ったことだけで収縮条件を主張することはできません。
<!-- solution-end -->

### VNP13-A3

- Level: A

$\mu=3,s=3/2,r=17,k\ge17$ のとき、階数の桁を使った $D(17)$ の上界を求めよ。

<!-- solution-start -->
#### 詳細解答

$17=9+2\cdot3+2$ です。[階数別平均長さの増大評価](#lem-vnp13-rank-growth) の証明で得た加算・倍率評価から $D(9)\le(9/4)D(1)$、$D(3)\le(3/2)D(1)$。従って

$$
D(17)\le(9/4+3+2)D(1)=29D(1)/4.
$$

一般上界では $j=2$ なので $3\cdot3\cdot9/4=81/4$ となり、桁を個別に使う方が鋭いです。
<!-- solution-end -->

### VNP13-A4

- Level: A

$k=2,n=4$、$\xi=(0,1)^{\mathsf T},\omega=(1,1)^{\mathsf T}$ のとき、右上ブロックとそれを実現する隣接操作の語を求めよ。

<!-- solution-start -->
#### 詳細解答

外積は第1行が $(0,0)$、第2行が $(1,1)$ です。境界操作は $x_1$、左の $A=I_2$、右の $B=I_2+E_{01}$（全体で $x_3$ ではなく $x_2$）とすれば $Ae=\xi$、$e'^{\mathsf T}B=(1,1)$。 [階数1ブロックの長さ評価](#lem-vnp13-rank-one-word) の構成に従い $x_2x_1x_2=I+E_{12}+E_{13}$ を得ます。積を展開すると $E_{23}E_{12}=0$、$E_{12}E_{23}=E_{13}$、二つの $E_{23}$ は消えます。
<!-- solution-end -->

### VNP13-B1

- Level: B

$Z=\begin{pmatrix}1&1\\1&1\end{pmatrix}$ と $i=2$ について $Z\otimes I_i$ の階数を計算し、前後から単射・全射を掛けても階数が変わらない理由を示せ。

<!-- solution-start -->
#### 詳細解答

$Z$ は非零で行が一致するので階数1です。$Z\otimes I_2$ の二つのブロック行はともに $(I_2,I_2)$ です。写像として $(u,v)\mapsto(u+v,u+v)$ なので像は $\{(w,w):w\in\mathbb F_2^2\}$、階数2です。全射 $B$ なら $\operatorname{im}((Z\otimes I_2)B)=\operatorname{im}(Z\otimes I_2)$。単射 $A$ はこの像に制限しても単射なので次元2を保ちます。これは [階数別平均長さの増大評価](#lem-vnp13-rank-growth) の倍率操作の具体例です。
<!-- solution-end -->

### VNP13-B2

- Level: B

$n=4,k=2$ で $\xi=(1,0)^{\mathsf T},\omega=(0,1)^{\mathsf T}$ の外積を末尾・先頭が1のベクトルに分解し、右上ブロックの加法が群の積になることを確認せよ。

<!-- solution-start -->
#### 詳細解答

$\xi=(0,1)^{\mathsf T}+(1,1)^{\mathsf T}$、$\omega=(1,0)^{\mathsf T}+(1,1)^{\mathsf T}$ です。4外積は順に

$$
\begin{pmatrix}0&0\\1&0\end{pmatrix},
\quad\begin{pmatrix}0&0\\1&1\end{pmatrix},
\quad\begin{pmatrix}1&0\\1&0\end{pmatrix},
\quad\begin{pmatrix}1&1\\1&1\end{pmatrix}.
$$

標数2で加えると $\begin{pmatrix}0&1\\0&0\end{pmatrix}$ です。$T(W)T(V)$ の右上は $I W'$ と $W I$ の和、すなわち $V+W$ で、対角は単位行列です。[階数1ブロックの長さ評価](#lem-vnp13-rank-one-word) の各語を掛けると目的の $I+E_{03}$ を得ます。
<!-- solution-end -->

### VNP13-B3

- Level: B

$U_4$ を二等分し、右上ブロック $R$ が一様なとき $RQ^{-1}$ が $Q$ と独立一様であることを数え上げで示せ。

<!-- solution-start -->
#### 詳細解答

$Q\in U_2$ は2通り、$R\in\operatorname{Mat}_2(\mathbb F_2)$ は16通りです。固定した $q,w$ に対し $Rq^{-1}=w$ を満たす $R$ は $wq$ だけです。独立一様な $(R,Q)$ の32通りの中の1通りなので確率は $1/32=(1/16)(1/2)$。よって独立一様です。これは [上単位三角群の平均長さ評価](#thm-vnp13-weak-length) でブロックの長さを個別に平均できる理由です。
<!-- solution-end -->

### VNP13-C1

- Level: C

$\mu=4,s=\sqrt2$ とする。平均長さ評価を $n$ が2の冪でない場合も含めて適用し、弱いPoincaré不等式の係数が $o(n^2)$ であることを確認せよ。さらに $s=2$ としたとき同じ導出から何が失われるか述べよ。

<!-- solution-start -->
#### 詳細解答

[上単位三角群の平均長さ評価](#thm-vnp13-weak-length) の証明に従い $N=2^{\lceil\log_2 n\rceil}$ とします。左上ブロック射影で長さを引き戻すと、$n$ 以降の座標に関する隣接操作の長さは0で、元の群の平均長さも保存されます。$\alpha=\log_4\sqrt2=1/4$ なので

$$
\vartheta_n\le18\mu\log_2 N
(1+\lfloor\log_\mu N\rfloor)s^{\lfloor\log_\mu N\rfloor}
=O((1+\log n)^2 n^{1/4}).
$$

従って [弱いPoincaré不等式](#cor-vnp13-weak-poincare) の係数は

$$
C(n)=O((1+\log n)^4 n^{3/2}),\qquad
C(n)/n^2=O((1+\log n)^4/\sqrt n)\to0.
$$

$s=2$ では $\alpha=1/2$ となり、同じ評価は $C(n)=O((1+\log n)^4 n^2)$ に留まります。これは二次より小さいことを保証しません。厳密な収縮 $s^2<\mu$ が極限に必要であり、等号の場合に実際の係数が必ず二次以上になると主張しているわけではありません。
<!-- solution-end -->
