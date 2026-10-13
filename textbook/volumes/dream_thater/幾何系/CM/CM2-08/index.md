# CM2-08 標準束・双対束・テンソル束

<!-- definition-example-audit: strict -->

## 1. 束を作る操作はなぜ必要か

前章の[正則ベクトル束](../CM2-07/index.md#def-cm2-07-holomorphic-vector-bundle)では、局所基底を $\mathcal E_j=\mathcal E_iG_{ij}$ と交換することで束を記述した。射影空間上の線束を一つ構成しても、複素接束やベクトル束間の正則線形写像を調べるにはそれだけでは足りない。

各繊維で線形代数の双対、テンソル積、線形写像、外冪を作り、それらが基点とともに**正則に変化するか**を確認したい。局所的には線形代数と同じだが、貼り合わせで生じる行列は異なる。特に双対では「逆行列」だけでなく「転置」も必要となる。

本章では列係数を用い、基底変更の約束 $\mathcal E_j=\mathcal E_iG_{ij}$ を維持する。[枠変更公式](../CM2-07/index.md#prop-cm2-07-gauge-frame-change)と向きを揃えれば、構成の正則性を局所計算から確認できる。

## 2. 射影空間の部分線束と商束

[複素射影空間のアトラス](../CM1-10/index.md#thm-cm1-10-projective-atlas)で、一点 $\ell=[Z_0:\cdots:Z_n]$ は $\mathbb C^{n+1}$ の一次元部分空間を表す。この直線そのものを繊維にするのが普遍部分線束であり、射影直線の場合は[普遍線束](../CM2-06/index.md#def-cm2-06-tautological-bundle)として構成した。

しかし、直線 $\ell$ の外側の方向を扱うには、固定された補空間を選ぶよりも、商ベクトル空間 $\mathbb C^{n+1}/\ell$ を使う方が自然である。補空間はチャートによって変わっても、商そのものは一意である。

<a id="def-cm2-08-standard-quotient"></a>

<!-- formal-statement-start -->
> **定義（射影空間の普遍部分束と標準商束）**  
> $n\ge1$ とし、$X=\mathbb{CP}^n$ とする。各点 $\ell\subset\mathbb C^{n+1}$ は一次元複素部分空間である。繊維 $S_\ell=\ell$ の正則線束を普遍部分束 $S=\mathcal O(-1)$、繊維 $Q_\ell=\mathbb C^{n+1}/\ell$ の階数 $n$ の正則ベクトル束を標準商束 $Q$ と呼ぶ。各繊維の包含と商写像が定める列を標準完全列と呼ぶ。

$$
0\longrightarrow S\xrightarrow{\ \iota\ }
X\times\mathbb C^{n+1}
\xrightarrow{\ p\ }Q\longrightarrow0.
$$

> 完全とは各点で $\iota$ が単射、$p$ が全射、かつ $\operatorname{im}\iota=\ker p$ であることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm2-08-standard-quotient -->
**定義の確認**。$X=\mathbb{CP}^1$ で $U_0$ の座標を $z=Z_1/Z_0$、$U_\infty$ の座標を $w=Z_0/Z_1$ とする。直線の局所生成元は $v_0=(1,z)$、$v_\infty=(w,1)$。商繊維では $q_0=[(0,1)]$、$q_\infty=[(1,0)]$ がそれぞれ非零である。実際 $q_0=0$ なら $(0,1)=c(1,z)$ となり第一成分から $c=0$ で矛盾し、$q_\infty$ も第二成分で同様に確認できる。重なりでは

$$
(1,0)=(1,z)-z(0,1)
\quad\Longrightarrow\quad
q_\infty=-zq_0.
$$

> $g^Q_{0\infty}(z)=-z$ は $\mathbb C^\times$ 上の非零正則関数、逆は $-z^{-1}=-w$。よって[線束の余輪条件](../CM2-06/index.md#def-cm2-06-transition-cocycle)を満たす。定数による枠変更で $g^Q_{0\infty}=z$ とできるので、$Q$ は $\mathcal O(1)$ と正則同型である。
<!-- definition-example-end -->

<a id="prop-cm2-08-standard-exact"></a>

<!-- formal-statement-start -->
> **命題（標準商束の正則局所自明化）**  
> 複素射影空間 $\mathbb{CP}^n$ の各標準チャート $U_i=\{Z_i\ne0\}$ で、上記の $S$ と $Q$ は正則局所自明であり、標準完全列の写像 $\iota,p$ は正則な束写像である。各点 $\ell$ で $\ker p_\ell=S_\ell$ が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

同次座標の第 $i$ 成分を $1$ にしたベクトルを、部分線束の各チャートでの基底に使う。商空間の基底は、それ以外の標準基底の剰余類で作れる。

<!-- proof-start -->
### 証明

$U_i$ 上で $v_i(Z)=Z/Z_i$ と定める。これは第 $i$ 成分が $1$ の正則ベクトル値関数である。従って $S|_{U_i}$ の局所基底は $v_i$ である。$\mathbb C^{n+1}$ の標準基底を $e_0,\ldots,e_n$ とし、$a\ne i$ に対して $q_{ia}=[e_a]\in Q_{[Z]}$ と置く。

任意の $u=\sum_a u_ae_a$ は

$$
u=u_iv_i+\sum_{a\ne i}(u_a-u_i(v_i)_a)e_a
$$

と一意に分解できる。第 $i$ 成分を比較すれば右辺の第 $i$ 成分は $u_i$、他の第 $a$ 成分は $u_i(v_i)_a+(u_a-u_i(v_i)_a)=u_a$。従って商で

$$
[u]=\sum_{a\ne i}(u_a-u_i(v_i)_a)q_{ia}.
$$

表示係数は座標 $[Z]$ と $u$ に関して正則である。各 $q_{ia}$ は商繊維の基底となるため、重なりで異なる商繊維の基底を比較する行列は、二つの係数表示の合成から求まる。逆向きも同じ表示で計算でき、どちらも正則である。[行列値余輪からの貼り合わせ](../CM2-07/index.md#thm-cm2-07-gluing)により、商束 $Q$ の正則構造が得られる。

包含写像と商写像を $U_i$ の座標で表示すると、

$$
\iota_i(x,c)=(x,cv_i(x)),
\qquad
p_i(x,u)=\left(x,(u_a-u_i(v_i)_a)_{a\ne i}\right)
$$

となる。各成分は正則である。繊維ごとの商写像は $u\mapsto[u]$ であり、その核は

$$
\ker p_\ell=\ell=S_\ell.
$$

包含は非零ベクトル $v_i$ によるスカラー倍なので単射、商写像は剰余類の基底によって全射である。ゆえに標準完全列は正則な束写像からなる。$ \square$
<!-- proof-end -->

## 3. 双対束：逆転置はどこから出るか

線形汎関数の値は、基底を変更しても同じでなければならない。各繊維 $E_x$ の双対 $E_x^\vee=\operatorname{Hom}_{\mathbb C}(E_x,\mathbb C)$ を束として並べると、局所双対基底の変更行列が自然に決まる。

<a id="def-cm2-08-dual-bundle"></a>

<!-- formal-statement-start -->
> **定義（正則双対束）**  
> 複素多様体 $X$ 上の階数 $r$ の正則ベクトル束 $E$ に対し、繊維 $E_x^\vee=\operatorname{Hom}_{\mathbb C}(E_x,\mathbb C)$ を持つ束を双対束 $E^\vee$ とする。局所基底 $\mathcal E_i=(e_{i1},\ldots,e_{ir})$ の双対枠 $\mathcal E_i^\vee=(e_i^1,\ldots,e_i^r)$ は $e_i^a(e_{ib})=\delta^a_b$ で定義し、遷移行列は

$$
G_{ij}^{\vee}=(G_{ij}^{-1})^{\mathsf T}
$$

> とする。正則性と余輪条件により、これは階数 $r$ の正則ベクトル束を与える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm2-08-dual-bundle -->
**定義の確認**。$G_{01}(z)=\begin{pmatrix}1&z\\0&1\end{pmatrix}$ なら

$$
G_{01}^{-1}=\begin{pmatrix}1&-z\\0&1\end{pmatrix},
\qquad
G_{01}^{\vee}=\begin{pmatrix}1&0\\-z&1\end{pmatrix}.
$$

> 行列式は $1$、成分は正則であり、逆方向の双対遷移行列との積は単位行列となる。単に $G^{-1}$ とするだけでは双対基底の評価が保存されない。
<!-- definition-example-end -->

<a id="prop-cm2-08-dual-evaluation"></a>

<!-- formal-statement-start -->
> **命題（双対遷移と評価の座標不変性）**  
> 複素多様体 $X$ 上の正則ベクトル束 $E$ の局所基底を $\mathcal E_i$ とし、重なりで次を仮定する。

$$
\mathcal E_j=\mathcal E_iG_{ij}.
$$

> 双対枠の変換は次の式で与えられる。

$$
\mathcal E_j^\vee
=\mathcal E_i^\vee(G_{ij}^{-1})^{\mathsf T}.
$$

> 正則局所切断 $\lambda$（$E^\vee$ の切断）と $s$（$E$ の切断）が各領域で整合して大域切断を定めるなら、評価 $\lambda(s)$ は大域正則関数である。また $(E^\vee)^\vee\cong E$ は正則束同型である。
<!-- formal-statement-end -->

### 証明の見取り図

基底 $e_{jb}$ を $i$ の基底で展開して、新しい双対基底がその値を $\delta^a_b$ にするように行列を解く。

<!-- proof-start -->
### 証明

$\mathcal E_j^\vee=\mathcal E_i^\vee K_{ij}$ と書くと、$j$ 側の双対基底を $j$ 側の基底に評価した行列は

$$
K_{ij}^{\mathsf T}G_{ij}=I_r.
$$

これは $\bigl(\sum_a(e_i^a)(K_{ij})_{ab}\bigr)\bigl(\sum_c(e_{ic})(G_{ij})_{cd}\bigr)$ の値を $b,d$ ごとに整理した式である。右から $G_{ij}^{-1}$ を掛けると $K_{ij}^{\mathsf T}=G_{ij}^{-1}$、従って $K_{ij}=G_{ij}^{-\mathsf T}$。三重重なりでは

$$
(G_{ij}G_{jk})^{-\mathsf T}
=G_{ij}^{-\mathsf T}G_{jk}^{-\mathsf T}
$$

となる（逆行列と転置でそれぞれ順序が反転するため二回反転する）。従って[余輪条件](../CM2-07/index.md#def-cm2-07-transition-matrices)を保つ。

局所係数を $s=\mathcal E_iv_i$、$\lambda=\mathcal E_i^\vee a_i$ と表せば $\lambda(s)=a_i^{\mathsf T}v_i$。重なりで $v_i=G_{ij}v_j$、$a_i=G_{ij}^{-\mathsf T}a_j$ なので

$$
a_i^{\mathsf T}v_i
=a_j^{\mathsf T}G_{ij}^{-1}G_{ij}v_j
=a_j^{\mathsf T}v_j.
$$

各局所式は正則で値が一致するから大域正則関数へ貼り合う。最後に自然写像 $E_x\to E_x^{\vee\vee}$、$v\mapsto(\lambda\mapsto\lambda(v))$ は有限次元線形代数により同型であり、局所表示は単位行列なので正則束同型になる。$ \square$
<!-- proof-end -->

例えば $L=\mathcal O(k)$ の遷移が $z^k$ なら、双対 $L^\vee$ の遷移は $z^{-k}$。したがって $L^\vee\cong\mathcal O(-k)$ である。$k=1$ の場合、非自明な線束を双対に取っても、一般には自明にならない。

## 4. テンソル積とその正則性

二つの線束を重ねるとき、局所基底の遷移係数は積となる。高階数でも各繊維のテンソル積を使えば同じ操作を行えるが、遷移行列は通常の行列積ではなく **Kronecker 積**となる。

<a id="def-cm2-08-tensor-bundle"></a>

<!-- formal-statement-start -->
> **定義（正則テンソル積束）**  
> 複素多様体 $X$ 上の階数 $r,s$ の正則ベクトル束 $E,F$ に対し、各繊維が $E_x\otimes_{\mathbb C}F_x$ である階数 $rs$ の束を $E\otimes F$ と呼ぶ。局所基底 $e_{ia}$、$f_{ib}$ に対し $(e_{ia}\otimes f_{ib})_{a,b}$ を辞書式順序の局所基底に取り、遷移行列を

$$
G_{ij}^{E\otimes F}=G_{ij}^{E}\otimes G_{ij}^{F}
$$

> と定める。右辺の $\otimes$ は行列の Kronecker 積である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm2-08-tensor-bundle -->
**定義の確認**。階数二の束 $E$ と線束 $L$ で $G_{01}^E=\operatorname{diag}(z,1)$、$g^L_{01}=z^{-1}$ とすると

$$
G_{01}^{E\otimes L}
=\operatorname{diag}(z,1)\otimes(z^{-1})
=\operatorname{diag}(1,z^{-1}).
$$

> 各成分は $\mathbb C^\times$ 上正則で行列式 $z^{-1}\ne0$。逆向きの遷移行列との積は $I_2$ で、階数が $2\cdot1=2$ であることも確認できる。
<!-- definition-example-end -->

<a id="prop-cm2-08-tensor-cocycle"></a>

<!-- formal-statement-start -->
> **命題（テンソル積束の遷移と正則切断）**  
> $E,F$ を階数 $r,s$ の正則ベクトル束とする。上記の Kronecker 積は正則な $GL_{rs}(\mathbb C)$ 値余輪を定め、階数 $rs$ の正則ベクトル束 $E\otimes F$ を構成する。$E,F$ の正則切断 $u,v$ に対する点ごとのテンソル $u\otimes v$ は $E\otimes F$ の正則切断になる。
<!-- formal-statement-end -->

### 証明の見取り図

各基底テンソルの係数を積として展開する。三重重なりの行列積と切断係数の両方で同じ分配法則が働く。

<!-- proof-start -->
### 証明

$e_{jc}=\sum_a e_{ia}(G_{ij}^E)_{ac}$ と $f_{jd}=\sum_b f_{ib}(G_{ij}^F)_{bd}$ より

$$
e_{jc}\otimes f_{jd}
=\sum_{a,b}(e_{ia}\otimes f_{ib})
(G_{ij}^E)_{ac}(G_{ij}^F)_{bd}.
$$

従って行列の $(a,b),(c,d)$ 成分は定義の Kronecker 積そのもの。積の恒等式 $(A\otimes B)(C\otimes D)=AC\otimes BD$ を成分ごとに確認すると

$$
(G_{ij}^E\otimes G_{ij}^F)
(G_{jk}^E\otimes G_{jk}^F)
=(G_{ik}^E\otimes G_{ik}^F).
$$

逆は $(G_{ij}^E)^{-1}\otimes(G_{ij}^F)^{-1}$ であり、各成分は正則だから[正則束の貼り合わせ](../CM2-07/index.md#thm-cm2-07-gluing)を適用できる。$u_i=G_{ij}^Eu_j$、$v_i=G_{ij}^Fv_j$ なら

$$
u_i\otimes v_i
=(G_{ij}^E\otimes G_{ij}^F)(u_j\otimes v_j).
$$

局所係数は正則関数の積だから正則で、重なりで一致する。$ \square$
<!-- proof-end -->

特に射影直線の $\mathcal O(a)$ と $\mathcal O(b)$ では、局所基底の変換係数の積 $z^az^b=z^{a+b}$ から

$$
\mathcal O(a)\otimes\mathcal O(b)\cong\mathcal O(a+b).
$$

これは「線束の次数が加法的になる」という最初の具体例である。線束の整数 $a$ はここでは貼り合わせ係数 $z^a$ の指数として扱っており、曲率による次数の理論はまだ必要ない。

## 5. 束の間の線形写像も束にする

各点の線形写像 $A_x:E_x\to F_x$ を並べたとき、単に行列の成分を正則にすればよいのではない。基点を跨いで同じ写像を表しているかを調べる必要がある。

<a id="def-cm2-08-hom-bundle"></a>

<!-- formal-statement-start -->
> **定義（正則 Hom 束）**  
> 階数 $r$ の正則ベクトル束 $E$ と階数 $s$ の正則ベクトル束 $F$ に対し、繊維が $\operatorname{Hom}_{\mathbb C}(E_x,F_x)$ である階数 $sr$ の正則ベクトル束を $\operatorname{Hom}(E,F)$ とする。局所基底に関する行列を $A_i\in M_{s\times r}(\mathbb C)$ と書き、重なりでは

$$
A_i=G_{ij}^F A_j(G_{ij}^E)^{-1}
$$

> とする。局所的な正則行列値関数で、この条件を満たすものが正則束準同型 $E\to F$ を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm2-08-hom-bundle -->
**定義の確認**。$E=\mathcal O(1)$、$F=\mathcal O(3)$ の場合、$A_i$ は $1\times1$ 行列、つまり関数である。重なりでは

$$
A_0=z^3 A_\infty z^{-1}=z^2A_\infty.
$$

> これは $\mathcal O(2)$ の切断の変換則である。例えば $A_0(z)=1+z^2$ と置くと $A_\infty(w)=w^2A_0(1/w)=1+w^2$ は $w=0$ でも正則。よって非零の正則束準同型 $\mathcal O(1)\to\mathcal O(3)$ を定める。
<!-- definition-example-end -->

<a id="prop-cm2-08-hom-identification"></a>

<!-- formal-statement-start -->
> **命題（Hom と双対テンソル積の同型）**  
> 正則ベクトル束 $E,F$ に対し、評価による自然写像は正則束同型

$$
F\otimes E^\vee\xrightarrow{\ \simeq\ }\operatorname{Hom}(E,F),
\qquad f\otimes\lambda\longmapsto(v\mapsto\lambda(v)f)
$$

> を与える。局所行列 $A_i$ が同一の束準同型を表す条件は $A_iG_{ij}^E=G_{ij}^FA_j$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$E_i$ の係数で入力、$F_i$ の係数で出力を表示する。両側の座標変更を順に書いてから行列方程式を解く。

<!-- proof-start -->
### 証明

入力切断 $v$ の局所係数を $v_i=G_{ij}^Ev_j$ とする。$i$ 側で出力係数が $A_iv_i$、$j$ 側で $A_jv_j$ なら、同じ出力を表す必要十分条件は

$$
A_iG_{ij}^Ev_j=G_{ij}^FA_jv_j
\quad\text{for all }v_j\in\mathbb C^r.
$$

任意の列ベクトルで成立するので $A_iG_{ij}^E=G_{ij}^FA_j$。右から $(G_{ij}^E)^{-1}$ を掛ければ定義の変換則となる。双対テンソル積の基底 $f_{ib}\otimes e_i^a$ は $v\mapsto e_i^a(v)f_{ib}$ という行列単位（第 $b,a$ 成分だけ $1$）へ写り、$sr$ 個の行列単位をすべて与える。従って繊維ごとに同型。

重なりで[双対の公式](#prop-cm2-08-dual-evaluation)と[テンソル積束の遷移](#prop-cm2-08-tensor-cocycle)を基底に適用する。$F$ と $E^\vee$ の局所枠の変換を成分で展開すると、

$$
f_{jc}\otimes e_j^d
=\sum_{b,a}(G_{ij}^F)_{bc}
\bigl((G_{ij}^E)^{-\mathsf T}\bigr)_{ad}
(f_{ib}\otimes e_i^a).
$$

左辺を $j$ 側の行列単位 $M_{cd}$（第 $(c,d)$ 成分だけが $1$ の $s\times r$ 行列）へ送ると、その $i$ 側での行列は

$$
G_{ij}^F M_{cd}(G_{ij}^E)^{-1}
$$

となる。実際、その第 $(b,a)$ 成分は $(G_{ij}^F)_{bc}((G_{ij}^E)^{-1})_{da}$ であり、上のテンソル積の係数 $(G_{ij}^F)_{bc}((G_{ij}^E)^{-\mathsf T})_{ad}$ と等しい。従って両束の貼り合わせは一致する。局所写像と逆写像は行列成分の並べ替えで正則だから、束同型である。$ \square$
<!-- proof-end -->

特に $\operatorname{Hom}(E,E)$ の単位写像は、各チャートで $I_r$ と表せる。

$$
G_{ij}^E I_r (G_{ij}^E)^{-1}=I_r.
$$

従って単位写像そのものは大域正則切断になる。これは $E$ が自明であることを意味しない。単位写像は各点の自己同型であって、各点に共通の大域基底を選んだわけではない。

## 6. 行列式束と階数の検査

行列式は、$r$ 本の基底ベクトルを交代的に一つの数へまとめる。各繊維の最高外冪を取ると一次元になり、階数 $r$ の束から線束が作れる。

<a id="def-cm2-08-determinant-bundle"></a>

<!-- formal-statement-start -->
> **定義（行列式束）**  
> 階数 $r\ge1$ の正則ベクトル束 $E$ に対し、最高外冪の線束 $\det E=\bigwedge^rE$ を行列式束と呼ぶ。局所基底 $\mathcal E_i=(e_{i1},\ldots,e_{ir})$ に対し、局所基底は $e_{i1}\wedge\cdots\wedge e_{ir}$ であり、遷移係数は

$$
g_{ij}^{\det E}=\det G_{ij}^{E}.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm2-08-determinant-bundle -->
**定義の確認**。$E=\mathcal O(2)\oplus\mathcal O(-1)$ なら遷移行列は $\operatorname{diag}(z^2,z^{-1})$ である。その行列式は $z$。これは $\mathbb C^\times$ 上で非零正則、逆は $z^{-1}$ なので、$\det E\cong\mathcal O(1)$ となる。元の束の階数は $2$、行列式束の階数は $1$ である。
<!-- definition-example-end -->

<a id="prop-cm2-08-determinant-identities"></a>

<!-- formal-statement-start -->
> **命題（行列式束の基本公式）**  
> 複素多様体 $X$ 上の階数 $r,s$ の正則ベクトル束 $E,F$ について、正則線束として

$$
\det(E\oplus F)\cong(\det E)\otimes(\det F),
\qquad
\det(E^\vee)\cong(\det E)^\vee
$$

> が成立する。特に $E=\bigoplus_{a=1}^r\mathcal O(k_a)$ が $\mathbb{CP}^1$ 上の直和束なら $\det E\cong\mathcal O(\sum_a k_a)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

直和の遷移はブロック対角、双対の遷移は逆転置なので、その行列式をとる。

<!-- proof-start -->
### 証明

[直和の遷移](../CM2-07/index.md#prop-cm2-07-direct-sum-sections)とブロック対角行列の行列式から

$$
\det\begin{pmatrix}G_{ij}^E&0\\0&G_{ij}^F\end{pmatrix}
=(\det G_{ij}^E)(\det G_{ij}^F).
$$

右辺は二つの行列式線束のテンソル積の遷移である。一方、双対の遷移は $(G_{ij}^E)^{-\mathsf T}$ だから

$$
\det((G_{ij}^E)^{-\mathsf T})
=\det((G_{ij}^E)^{-1})
=(\det G_{ij}^E)^{-1}.
$$

ここでは $\det(A^{\mathsf T})=\det A$ と $\det(AB)=\det A\det B$ に $B=A^{-1}$ を代入した。右辺は行列式線束の双対の遷移である。いずれも局所基底の対応が重なりで一致するため、正則線束同型が得られる。最後は $z^{k_1}\cdots z^{k_r}=z^{\sum k_a}$ を代入する。$ \square$
<!-- proof-end -->

## 7. 射影空間の接束を標準束から作る

射影空間上で点 $\ell$ を動かすとき、$\ell$ の中の一つの代表ベクトルは任意の非零スカラー倍までしか決まらない。速度ベクトルのうち直線自身に沿う成分は射影空間の変化として観測できない。従って、接方向は「直線 $\ell$ から商 $\mathbb C^{n+1}/\ell$ への線形写像」で記述できる。

<a id="thm-cm2-08-projective-tangent"></a>

<!-- formal-statement-start -->
> **定理（射影空間の正則接束の標準表示）**  
> $n\ge1$ とする。$\mathbb{CP}^n$ の普遍部分線束 $S$ と標準商束 $Q$ について、正則ベクトル束の自然同型

$$
T^{1,0}\mathbb{CP}^n
\cong\operatorname{Hom}(S,Q)
\cong S^\vee\otimes Q
$$

> がある。ここで $T^{1,0}$ は正則接束であり、束の階数はいずれも $n$ である。
<!-- formal-statement-end -->

### 証明の見取り図

曲線で代表ベクトルを動かした速度を、元の直線で割った剰余類にする。スカラー倍の取り替えをしても写像が同じことを示し、標準チャートで逆方向も計算する。

<!-- proof-start -->
### 証明

点 $\ell=[v]$ の接ベクトルを、$\ell(t)=[v(t)]$、$v(0)=v\ne0$ という局所正則曲線の速度と考える。$v(t)$ は $\ell$ の局所的な非零正則代表である。写像

$$
\Theta_\ell(\dot\ell(0)):\ell\longrightarrow\mathbb C^{n+1}/\ell,
\qquad
\Theta_\ell(\dot\ell(0))(cv)=c[v'(0)]
$$

を定める。代表を $\widetilde v(t)=a(t)v(t)$ と取り替えた場合、$a(0)\ne0$ であり

$$
\widetilde v'(0)=a'(0)v+a(0)v'(0),
\quad
[\widetilde v'(0)]=a(0)[v'(0)].
$$

新しい始点は $\widetilde v(0)=a(0)v$ だから、$\widetilde v(0)\mapsto[\widetilde v'(0)]$ は同じ線形写像 $\ell\to\mathbb C^{n+1}/\ell$ を与える。速度の表示に依存しない。

さらに $U_i$ で第 $i$ 成分が $1$ の代表 $v_i=(v_{i0},\ldots,1,\ldots,v_{in})$ を使えば、座標速度 $(\dot v_{ia})_{a\ne i}$ は

$$
v_i\longmapsto\left[\sum_{a\ne i}\dot v_{ia}e_a\right]
=\sum_{a\ne i}\dot v_{ia}q_{ia}
$$

と移る。前節の[標準商束の局所基底](#prop-cm2-08-standard-exact)では $q_{ia}$ が基底であるから、これは $\mathbb C^n\to\operatorname{Hom}(\mathbb Cv_i,Q_\ell)$ の線形同型で、逆は係数 $(\dot v_{ia})$ を取る写像となる。両向きの成分は標準チャートで正則であり、代表変更の不変性から重なりで一致する。ゆえに束全体の正則同型となる。最後の同型は[Hom と双対テンソル積](#prop-cm2-08-hom-identification)を $E=S,F=Q$ に適用したもの。$ \square$
<!-- proof-end -->

射影直線で確認しよう。$z$ チャートと $w=1/z$ チャートの接枠をそれぞれ $\partial/\partial z$、$\partial/\partial w$ とすると、[接束の座標変換則](../CM1-05/index.md#thm-cm1-05-frame-change)により

$$
\frac{\partial}{\partial w}
=\frac{dz}{dw}\frac{\partial}{\partial z}
=-z^2\frac{\partial}{\partial z}.
$$

したがって接束の遷移は $-z^2$ で、定数の枠変更により $\mathcal O(2)$ と同型になる。標準束側でも $S^\vee$ の遷移は $z$、$Q$ は $-z$ だからその積は $-z^2$。両方の構成が同じ変換を与えることを直接確かめられた。

[ねじれ線束の大域正則切断](../CM2-06/index.md#prop-cm2-06-ok-sections)の分類を $k=2$ に適用すると、射影直線の大域正則ベクトル場は複素三次元である。$z$ チャートでは

$$
(a+bz+cz^2)\frac{\partial}{\partial z}
\qquad(a,b,c\in\mathbb C)
$$

と書ける。非零ベクトル場でも大域的に零点を持ち得る。多項式が定数で零点を持たない場合にも、$w$ チャートの係数は $-w^2(a+b/w+c/w^2)$ なので $w=0$ で零になる。

## 8. 演習：遷移行列から束の演算を再構成する

### Level A

<a id="ex-cm2-08-a01"></a>
#### CM2-08-A01 双対行列の逆転置
- Level: A

$G(z)=\begin{pmatrix}2&z\\0&3\end{pmatrix}$ を局所遷移行列とする。双対の遷移行列を求め、行列式が非零であることを確かめよ。

<!-- solution-start -->
**詳細解答**。[双対の遷移](#def-cm2-08-dual-bundle)は $G^{-\mathsf T}$ である。三角行列の逆行列は

$$
G^{-1}=\begin{pmatrix}1/2&-z/6\\0&1/3\end{pmatrix}
$$

であり、実際 $GG^{-1}$ の右上成分は $2(-z/6)+z/3=0$。転置すると

$$
G^{-\mathsf T}
=\begin{pmatrix}1/2&0\\-z/6&1/3\end{pmatrix},
\qquad
\det G^{-\mathsf T}=\frac16\ne0.
$$

どちらも全平面で正則で、双対束の局所基底の変更として適切である。
<!-- solution-end -->

<a id="ex-cm2-08-a02"></a>
#### CM2-08-A02 評価は変わらない
- Level: A

$G=\operatorname{diag}(z,2)$（$z\in\mathbb C^\times$）で、$j$ 側のベクトル係数を $v_j=(1,3)^T$、双対係数を $a_j=(2,1)^T$ とする。$i$ 側へ移して評価が等しいことを確認せよ。

<!-- solution-start -->
**詳細解答**。[切断の局所整合](../CM2-07/index.md#def-cm2-07-holomorphic-section)より $v_i=Gv_j=(z,6)^T$。[双対評価の公式](#prop-cm2-08-dual-evaluation)から

$$
a_i=G^{-\mathsf T}a_j
=\operatorname{diag}(z^{-1},1/2)
\begin{pmatrix}2\\1\end{pmatrix}
=\begin{pmatrix}2/z\\1/2\end{pmatrix}.
$$

従って

$$
a_i^{\mathsf T}v_i=(2/z)z+(1/2)6=2+3=5
=a_j^{\mathsf T}v_j.
$$

$z=0$ では $G$ が可逆でないため、この計算の定義域は $\mathbb C^\times$ に限る。
<!-- solution-end -->

<a id="ex-cm2-08-a03"></a>
#### CM2-08-A03 テンソル積の階数と遷移
- Level: A

$E$ の遷移行列を $\operatorname{diag}(z,1)$、$F$ の遷移を $\operatorname{diag}(1,z^2)$ とする。$E\otimes F$ の階数と遷移対角成分を辞書式順序で求めよ（$z\ne0$）。

<!-- solution-start -->
**詳細解答**。各階数は $2$ だから[テンソル積の定義](#def-cm2-08-tensor-bundle)より階数は $2\cdot2=4$。$E$ の第一基底と $F$ の第一・第二基底、次に $E$ の第二基底と $F$ の第一・第二基底の順に取ると

$$
\operatorname{diag}(z,1)\otimes\operatorname{diag}(1,z^2)
=\operatorname{diag}(z,z^3,1,z^2).
$$

行列式は $z\cdot z^3\cdot1\cdot z^2=z^6$ で、$z\ne0$ 上では非零である。
<!-- solution-end -->

<a id="ex-cm2-08-a04"></a>
#### CM2-08-A04 行列式束の計算
- Level: A

$E=\mathcal O(-2)\oplus\mathcal O(3)\oplus\mathcal O(0)$ とする。$\det E$ の遷移係数と正則同型な線束を求めよ。

<!-- solution-start -->
**詳細解答**。直和束の遷移行列は $\operatorname{diag}(z^{-2},z^3,1)$ である。[行列式束の公式](#prop-cm2-08-determinant-identities)より

$$
g^{\det E}_{0\infty}(z)
=z^{-2}z^3\cdot1=z,
\qquad
\det E\cong\mathcal O(1).
$$

もとの $E$ の階数は $3$、最高外冪の階数は $1$。$z$ は重なり $\mathbb C^\times$ で非零正則なので正則線束の遷移係数になる。
<!-- solution-end -->

<a id="ex-cm2-08-a05"></a>
#### CM2-08-A05 商束の局所座標
- Level: A

$\mathbb{CP}^2$ の $U_0$ で直線を $v_0=(1,z_1,z_2)$ と書く。$u=(a,b,c)$ の剰余類 $[u]\in\mathbb C^3/\mathbb Cv_0$ を $q_{01}=[e_1]$、$q_{02}=[e_2]$ で表示せよ。係数の一意性も確認せよ。

<!-- solution-start -->
**詳細解答**。[商束の局所分解](#prop-cm2-08-standard-exact)を $i=0$ に適用する。まず

$$
u=a(1,z_1,z_2)+(0,b-az_1,c-az_2)
$$

である。第一項は直線内にあるため商では零になり、

$$
[u]=(b-az_1)q_{01}+(c-az_2)q_{02}.
$$

もし $Aq_{01}+Bq_{02}=0$ なら $(0,A,B)$ が $(1,z_1,z_2)$ のスカラー倍であり、第一成分からスカラーは零、ゆえに $A=B=0$。従って表示は一意であり係数は $z_1,z_2$ に関して正則である。
<!-- solution-end -->

### Level B

<a id="ex-cm2-08-b01"></a>
#### CM2-08-B01 Hom 束の正則写像
- Level: B

$\mathbb{CP}^1$ 上の $E=\mathcal O(2)$、$F=\mathcal O(4)$ に対して $\operatorname{Hom}(E,F)$ を線束として同定せよ。$U_0$ 上で $A_0(z)=1+3z+z^2$ とする局所行列が大域正則束準同型になることを、$U_\infty$ 側の係数から確認せよ。

<!-- solution-start -->
**詳細解答**。[Hom と双対テンソル積の同型](#prop-cm2-08-hom-identification)より $\operatorname{Hom}(E,F)\cong F\otimes E^\vee$。$E^\vee\cong\mathcal O(-2)$ なので

$$
F\otimes E^\vee\cong
\mathcal O(4)\otimes\mathcal O(-2)
\cong\mathcal O(2).
$$

局所行列は $A_0=z^{4}A_\infty z^{-2}=z^2A_\infty$ を満たす。従って $z=1/w$ を代入して

$$
A_\infty(w)=w^2A_0(1/w)
=w^2+3w+1.
$$

これは $w=0$ でも正則である。両チャートの係数が重なりで必要な式を満たすから、正則束準同型に貼り合う。
<!-- solution-end -->

<a id="ex-cm2-08-b02"></a>
#### CM2-08-B02 行列の左右に現れる変換
- Level: B

階数二の束 $E,F$ について、重なりで $G^E=\operatorname{diag}(z,1)$、$G^F=\operatorname{diag}(1,z^2)$ とする。$j$ 側の束写像の行列が $A_j=\begin{pmatrix}1&2\\3&4\end{pmatrix}$ のとき、$i$ 側の $A_i$ を求めよ（$z\ne0$）。入力切断 $v_j=(1,1)^T$ を使い、出力の貼り合わせも確認せよ。

<!-- solution-start -->
**詳細解答**。[正則 Hom 束](#def-cm2-08-hom-bundle)の定義により

$$
A_i=G^FA_j(G^E)^{-1}
=\begin{pmatrix}1&0\\0&z^2\end{pmatrix}
\begin{pmatrix}1&2\\3&4\end{pmatrix}
\begin{pmatrix}z^{-1}&0\\0&1\end{pmatrix}
=\begin{pmatrix}z^{-1}&2\\3z&4z^2\end{pmatrix}.
$$

入力は $v_i=G^Ev_j=(z,1)^T$ だから

$$
A_iv_i=\begin{pmatrix}1+2\\3z^2+4z^2\end{pmatrix}
=\begin{pmatrix}3\\7z^2\end{pmatrix}.
$$

$j$ 側では $A_jv_j=(3,7)^T$、従って $G^F(A_jv_j)=(3,7z^2)^T$。一致するので出力切断は正しく貼り合う。$z^{-1}$ の項は重なり上では正則であり、各チャートの原点への延長はこの設問では要求していない。
<!-- solution-end -->

<a id="ex-cm2-08-b03"></a>
#### CM2-08-B03 接束と線束の一致を二通りで
- Level: B

$\mathbb{CP}^1$ の接束について、$w=1/z$ の連鎖律による遷移係数を求めよ。また $S$ の遷移 $z^{-1}$、$Q$ の遷移 $-z$ から $S^\vee\otimes Q$ の遷移を求め、二つが等しいことを検算せよ。

<!-- solution-start -->
**詳細解答**。[正則接束の枠変更](../CM1-05/index.md#thm-cm1-05-frame-change)において $w=z^{-1}$ だから

$$
\frac{dw}{dz}=-z^{-2},
\qquad
\frac{dz}{dw}=-z^2,
\qquad
\frac{\partial}{\partial w}
=-z^2\frac{\partial}{\partial z}.
$$

従って接束の遷移は $-z^2$。一方、[双対の公式](#prop-cm2-08-dual-evaluation)より $S^\vee$ の遷移は $(z^{-1})^{-1}=z$ であり、[テンソル積束の遷移と正則切断](#prop-cm2-08-tensor-cocycle)より

$$
g_{0\infty}^{S^\vee\otimes Q}
=z(-z)=-z^2.
$$

両者は完全に一致する。$z\ne0$ で非零正則であり、逆も存在する。
<!-- solution-end -->

<a id="ex-cm2-08-b04"></a>
#### CM2-08-B04 双対と行列式は可換か
- Level: B

階数二の束の遷移を $G=\begin{pmatrix}z&1\\0&z^{-1}\end{pmatrix}$（$z\in\mathbb C^\times$）とする。$E^\vee$ の遷移、$\det E$ の遷移、$\det(E^\vee)$ の遷移を具体的に求め、最後の二つが双対の関係にあることを確認せよ。

<!-- solution-start -->
**詳細解答**。$\det G=z\cdot z^{-1}=1$ であり

$$
G^{-1}=\begin{pmatrix}z^{-1}&-1\\0&z\end{pmatrix},
\qquad
G^{-\mathsf T}
=\begin{pmatrix}z^{-1}&0\\-1&z\end{pmatrix}.
$$

右辺の積で $GG^{-1}$ の右上成分は $z(-1)+1\cdot z=0$。従って[双対の遷移](#def-cm2-08-dual-bundle)を正しく求めた。行列式は

$$
g^{\det E}=\det G=1,
\qquad
g^{\det(E^\vee)}=\det G^{-\mathsf T}=z^{-1}z=1.
$$

$(\det E)^\vee$ の遷移は $(g^{\det E})^{-1}=1$ であり、$\det(E^\vee)$ と一致する。これは[行列式束の基本公式](#prop-cm2-08-determinant-identities)の具体的検証である。
<!-- solution-end -->

### Level C

<a id="ex-cm2-08-c01"></a>
#### CM2-08-C01 射影直線の標準完全列から接束へ
- Level: C

$X=\mathbb{CP}^1$、$S=\mathcal O(-1)$、$Q_\ell=\mathbb C^2/\ell$ とする。$U_0$ の座標 $z$、$U_\infty$ の座標 $w=1/z$ を用いて次を示せ。

1. $S,Q$ の局所基底 $v_0,v_\infty,q_0,q_\infty$ の遷移を求め、$Q\cong\mathcal O(1)$ を証明せよ。
2. $S^\vee\otimes Q$ の遷移を求め、接束 $T^{1,0}X$ と同型であることを、両チャートの接枠の遷移と比較して確かめよ。
3. 大域正則ベクトル場の $U_0$ における全局所表示を求め、その空間の複素次元を示せ。
4. どこでも零にならない大域正則ベクトル場が存在しないことを示し、局所自明性との違いを説明せよ。

<!-- solution-start -->
**詳細解答**。

1. [普遍線束の局所基底](../CM2-06/index.md#def-cm2-06-tautological-bundle)から $v_0=(1,z)$、$v_\infty=(w,1)=z^{-1}v_0$ であり、$g^S_{0\infty}=z^{-1}$。商繊維で $q_0=[(0,1)]$、$q_\infty=[(1,0)]$ と取ると

$$
q_\infty=[(1,z)-z(0,1)]=-zq_0.
$$

従って $g^Q_{0\infty}=-z$。$q'_\infty=-q_\infty$ に局所基底を取り替えると $q'_\infty=zq_0$ となるから、[ねじれ線束の遷移](../CM2-06/index.md#prop-cm2-06-ok-sections)の $k=1$ と一致し $Q\cong\mathcal O(1)$。

2. [双対束](#prop-cm2-08-dual-evaluation)の遷移から $g^{S^\vee}_{0\infty}=z$。これと $g^Q_{0\infty}=-z$ の積により

$$
g^{S^\vee\otimes Q}_{0\infty}
=z(-z)=-z^2.
$$

他方 $w=1/z$ なので $\dfrac{dz}{dw}=-w^{-2}=-z^2$。よって[接枠の変換](../CM1-05/index.md#thm-cm1-05-frame-change)も

$$
\frac{\partial}{\partial w}
=-z^2\frac{\partial}{\partial z}
$$

となる。両線束は同じ二枚のチャート上で同じ遷移係数を持ち、[貼り合わせ定理](../CM2-06/index.md#thm-cm2-06-gluing)によって正則同型である。

3. 前問の遷移から $T^{1,0}X\cong\mathcal O(2)$。[大域切断の分類](../CM2-06/index.md#prop-cm2-06-ok-sections)を指数 $k=2$ に適用すると、$U_0$ 側の係数は次数高々二の多項式に限る。従って全ての場は

$$
V=(a+bz+cz^2)\frac{\partial}{\partial z},
\qquad a,b,c\in\mathbb C
$$

であり、$1,z,z^2$ が一次独立なため複素次元は $3$。

4. $P(z)=a+bz+cz^2$ が恒等的零なら全点で零である。$P$ が非定数なら、$c=0$ の場合は $b\ne0$ で $z=-a/b$ が根になる。$c\ne0$ の場合は複素数 $b^2-4ac$ の平方根 $\delta$ を選び、$z=(-b+\delta)/(2c)$ と置く。このとき

$$
4cP(z)=(2cz+b)^2-(b^2-4ac)
=\delta^2-(b^2-4ac)=0.
$$

従っていずれも有限点で $V=0$。$P=a\ne0$ が定数の場合は無限遠チャートへ移し、

$$
V=-w^2P(1/w)\frac{\partial}{\partial w}
=-aw^2\frac{\partial}{\partial w}
$$

であるから $w=0$ で零となる。従って零でない大域場でも必ずどこかで零になる。[大域枠による自明性判定](../CM2-07/index.md#thm-cm2-07-global-frame-triviality)により接束は正則に自明でない。一方、各 $U_0,U_\infty$ 上では接枠 $\partial_z,\partial_w$ が非零であり、局所的には自明である。両者は矛盾しない。
<!-- solution-end -->

## 9. 何を次章へ持ち越すか

双対・テンソル・Hom・行列式束は、局所の線形代数を正則な遷移則へ持ち上げる操作であった。標準完全列から接束まで、枠の交換を具体的に計算することで構成できた。

しかし現段階では、どの繊維にも内積を選んだとき、それらが束全体で滑らかに変化し、枠の変更と整合するかを論じていない。次章の Hermite 計量はその問いに進み、続く Chern 接続・曲率の準備となる。
