# MMX30 有限サイズのgate/rank/border rank・漸近rank、Zariski閉包の冪と体拡大、tight tensor予想への反例の検算

前講で、有限体上の下界を任意の体の形式回路へ移しました。指数が決まっただけで、特定の行列サイズで何個の積が必要かも分かるのでしょうか。さらに、階数が小さいテンソルの近似を許した場合にはどうでしょうか。今回は一つのサイズを固定し、その冪を取ることでこれらを比較します。

直接前提：[MMX6](../MMX6/index.md)、[MMX29](../MMX29/index.md)、[TSP8](../../TSP/TSP8/index.md)、[TSP9](../../TSP/TSP9/index.md)、[TSP10](../../TSP/TSP10/index.md)、[TSP11](../../TSP/TSP11/index.md)、[TSP12](../../TSP/TSP12/index.md)、[TSP13](../../TSP/TSP13/index.md)、[TSP14](../../TSP/TSP14/index.md)。

## 1. 四種類の費用を区別する

体 $F$ と整数 $n\ge2$ を固定します。[行列積テンソル](../../TSP/TSP7/index.md#def-tsp7-matrix-multiplication)を、原論文に合わせて第三因子の基底を転置して

$$
T_n=\sum_{i,j,k=1}^n e_{ij}\otimes e_{jk}\otimes e_{ki}
$$

と書きます。第三因子の $e_{ki}$ は出力の $(i,k)$ 成分に対応します。各因子は $n^2$ 次元です。第7講の $M_{n,n,n}$ における左・右入力の座標写像 $a^{ij},b^{jk}$ と出力基底 $E_{ik}$ を、それぞれ第一・第二・第三因子の $e_{ij},e_{jk},e_{ki}$ に対応させています。これは各因子の基底の付け替えなので、階数を保ちます。

$R_K(T)$ は体 $K$ 上の[テンソル階数](../../TSP/TSP2/index.md#def-tsp2-tensor-rank)、すなわち単純テンソルの和の最小項数です。[テンソル階数と双線形複雑性の一致](../../TSP/TSP7/index.md#thm-tsp7-rank-complexity)により、双線形算法で必要な積の数を表します。一般の形式回路では途中結果が双線形でなくてもよく、非スカラー乗算・除算の数 $q$ を別に数えます。[除算を許す形式回路](../MMX29/index.md#def-mmx29-formal-circuit)の意味での数え方です。

[境界階数](../../TSP/TSP8/index.md#def-tsp8-border-rank)は複素数上で学びました。ここでは任意の体を扱うため、その代数閉包 $L=\overline F$ 上で多項式の零点条件を使います。代数閉包は、元の体を含み、任意の非定数一変数多項式が根を持ち、元の体上代数的な拡大体です。係数の近似を実数の距離で定める必要はありません。各因子の基底を固定し、[多因子テンソル積の基底展開](../../TSP/TSP1/index.md#thm-tsp1-multifactor-basis)で得られる係数を座標にします。[Zariski 位相](../../../代数系/AG/AG1-01/index.md#def-ag1-01-zariski-topology)では、座標多項式の共通零点集合を閉集合とします。集合 $S$ を含む最小の閉集合を Zariski 閉包と書き、$\overline S^{Z}$ は $S$ 上で消える全ての座標多項式の共通零点集合です。ここでは多項式の係数も $L$ の元とします。

<a id="def-mmx30-geometric-border"></a>

<!-- formal-statement-start -->
> **定義（幾何的境界階数）**
>
> 体 $F$ 上の有限次元三因子テンソル空間の元 $T$ を取る。$L=\overline F$ に係数を拡張した空間を $V$ とし、$S_r=\{v\in V:R_L(v)\le r\}$ とする。
>
> $T$ の幾何的境界階数を

$$
\underline R_{\mathrm{geom}}(T)
=\min\{r\in\mathbb Z_{\ge0}: T\in\overline{S_r}^{\,Z}\}
$$

> とする。上線の $Z$ は $V$ 内の Zariski 閉包を表す。
<!-- formal-statement-end -->

$S_r$ 上で消える全ての座標多項式が $T$ でも消えることが閉包への所属条件です。係数拡張は元の基底を保つため $T$ を $V$ の元として扱えます。有限次元なので基底テンソルの展開から有限階数の分解があり、最小値を取る集合は空ではありません。$S_r$ 自体が閉とは限らない点が重要です。

<!-- definition-example-start: def-mmx30-geometric-border -->
**定義の確認**。

例えば $F=\mathbb F_2$ とし、各因子に基底 $e_1,e_2$ を持つ空間を取ります。$T=e_1\otimes e_2\otimes(e_1+e_2)$ は $L$ 上でも単純テンソル一項なので $S_1$ に属します。基底テンソルによる展開は

$$
T=e_1\otimes e_2\otimes e_1+
e_1\otimes e_2\otimes e_2.
$$

です。従って座標 $(1,2,1)$ を取り出す一次多項式は $T$ で1になります。一方 $S_0=\{0\}$ は全座標多項式が零となる閉集合ですから、その閉包に $T$ は属しません。従って幾何的境界階数は1です。有限体上の有限個の点だけの閉包を取ったのではなく、代数閉包上の $S_1$ を使いました。
<!-- definition-example-end -->

最後に、[漸近階数](../../TSP/TSP9/index.md#def-tsp9-asymptotic-rank)を任意の体 $K$ 上で

$$
\widetilde R_K(T)=\lim_{j\to\infty}R_K(T^{\boxtimes j})^{1/j}
$$

と書きます。$\boxtimes$ は対応する三因子をそれぞれまとめる[Kronecker積](../../TSP/TSP5/index.md#def-tsp5-kronecker)です。添字 $j$ は反復回数です。非零テンソルの各冪も非零（非零座標の積が非零）なので階数が1以上であり、[階数の劣乗法性](../../TSP/TSP5/index.md#thm-tsp5-rank-subrank-operations)と[Fekete補題](../../TSP/TSP9/index.md#lem-tsp9-fekete)を $h_j=\log R_K(T^{\boxtimes j})$ に適用できます。$h_{j+k}\le h_j+h_k$ かつ $0\le h_j/j\le \log R_K(T)$ なので、任意の体でも極限が存在します。零テンソルでは全ての冪の階数が0なので、漸近階数も0です。

直接比較できるのは $\underline R_{\mathrm{geom}}(T)\le R_L(T)\le R_F(T)$ です。漸近階数は冪を使う別の量なので、閉包や拡大体との関係には証明が必要です。

## 2. 閉包にある点の冪を線形結合に戻す

$T$ が $S_r$ の閉包に入っても、$T$ 自体が $S_r$ に入るとは限りません。そこで、$T$ の冪を少数の $S_r$ の元の冪の線形結合にできれば、指数に影響しない係数を代償にして通常の階数を比較できます。この補題の $v^{\otimes j}$ は $V$ 自体を一つの因子として $j$ 回テンソル積を取る記法です。三因子テンソルとしての $\boxtimes$ との対応は証明後に示します。

<a id="lem-mmx30-power-span"></a>

<!-- formal-statement-start -->
> **補題（Zariski閉包の冪の線形包）**
>
> 代数閉体 $L$ 上の有限次元空間 $V$ の次元を $D\ge1$ とする。集合 $S\subset V$ と点 $v\in\overline S^{\,Z}$、正整数 $j$ を取る。
>
> $v^{\otimes j}$ は $s^{\otimes j}$（$s\in S$）の高々

$$
N_j=\binom{j+D-1}{D-1}
$$

> 個の線形結合で表される。
<!-- formal-statement-end -->

見取り図は二段階です。まず「指定された線形部分空間に入る」という条件を多項式の零点条件にします。次に、冪の座標には同じ単項式が何度も出ることを利用して線形包の次元を抑えます。

<!-- proof-start -->
### 証明

$W_j=\operatorname{span}_L\{s^{\otimes j}:s\in S\}$ と置く。$W_j$ の基底を $V^{\otimes j}$ の基底へ延長し、その余分な基底に対応する座標線形形式を $\ell_1,\ldots,\ell_m$ とする。従って $z\in W_j$ と全ての $\ell_a(z)=0$ は同値である。

基底 $u_1,\ldots,u_D$ で $x=\sum_i x_i u_i$ と書けば、

$$
x^{\otimes j}=\sum_{i_1,\ldots,i_j=1}^D
x_{i_1}\cdots x_{i_j}\,
u_{i_1}\otimes\cdots\otimes u_{i_j}.
$$

従って $\ell_a(x^{\otimes j})$ は $x$ の座標の斉次多項式である。$s\in S$ なら $s^{\otimes j}\in W_j$ だから全て零になる。$v$ は $S$ の Zariski 閉包にあるので $\ell_a(v^{\otimes j})=0$ が全ての $a$ で成立する。従って $v^{\otimes j}\in W_j$ である。

次に、添字列で数 $i$ が出現する回数を $\alpha_i$ とする。各 $\alpha_i$ は非負整数で $|\alpha|=\sum_{i=1}^D\alpha_i=j$ である。ここで $\alpha=(\alpha_1,\ldots,\alpha_D)$ と書く。同じ出現回数を持つ基底テンソルの和を $w_\alpha$ と置くと、先ほどの展開は

$$
x^{\otimes j}=\sum_{|\alpha|=j}
x_1^{\alpha_1}\cdots x_D^{\alpha_D}w_\alpha
$$

となる。この書き方は係数を階乗で割らないので正標数でも成立する。全ての冪は $w_\alpha$ の線形包に入り、$W_j$ の次元はその個数以下である。非負整数解の個数は、$j$ 個の印と $D-1$ 個の仕切りを並べて各区間の印の数を読むことにより $\binom{j+D-1}{D-1}$ 個である。

$W_j$ を張る元 $s^{\otimes j}$ から独立なものを順に選べば、有限次元性から高々 $N_j$ 個で基底になる。$v^{\otimes j}$ はこの基底の線形結合である。
<!-- proof-end -->

例えば $D=2,j=2$ では、$x=au_1+bu_2$ の冪は

$$
a^2u_1\otimes u_1
+ab(u_1\otimes u_2+u_2\otimes u_1)
+b^2u_2\otimes u_2
$$

です。四つの基底座標があっても、独立に変わる単項式は三つだけです。標数2でも中央の二つは異なる基底テンソルであり、消えません。

これを幾何的境界階数 $r$ のテンソル $T$ に使います。$V=U_1\otimes U_2\otimes U_3$ とすると、[Kronecker積](../../TSP/TSP5/index.md#def-tsp5-kronecker)の並べ替えを $j$ 回分に拡張して

$$
V^{\otimes j}\longrightarrow
U_1^{\otimes j}\otimes U_2^{\otimes j}\otimes U_3^{\otimes j}
$$

とします。各基底テンソルの因子を位置ごとにまとめる写像であり、逆の並べ替えがあるので線形同型です。この写像で $T^{\otimes j}$ は $T^{\boxtimes j}$ へ移ります。[幾何的境界階数](#def-mmx30-geometric-border)の定義から $T\in\overline{S_r}^{Z}$ なので、[Zariski閉包の冪の線形包](#lem-mmx30-power-span)を適用して

$$
T^{\boxtimes j}=\sum_{a=1}^m c_a S_a^{\boxtimes j},
\quad m\le N_j,\quad R_L(S_a)\le r.
$$

各 $S_a$ の分解を $j$ 回展開すれば高々 $r^j$ 項になり、$c_a$ は第一因子に吸収できます。[階数の劣乗法性](../../TSP/TSP5/index.md#thm-tsp5-rank-subrank-operations)と分解の連結により $R_L(T^{\boxtimes j})\le N_j r^j$ です。固定した $D$ について $N_j\le(j+D-1)^{D-1}$ で、$\log N_j/j\to0$ なので $N_j^{1/j}\to1$ です。ゆえに $\widetilde R_L(T)\le r$ です。この議論には複素解析的な極限や標数0の仮定がありません。

## 3. 拡大体で得た分解を元の体へ戻す

代数閉包上で長さ $r$ の分解が得られても、係数が $F$ にあるとは限りません。しかし一つの分解は有限個の係数しか使いません。有限個の代数的元を順次添加すると、各段の次数は有限で、全体の次数はその積以下です。従ってそれらの係数はある有限拡大体に含まれます。

<a id="lem-mmx30-rank-descent"></a>

<!-- formal-statement-start -->
> **補題（有限拡大体からの冪の階数降下）**
>
> 体の有限拡大 $E/F$ の次数を $d$ とする。$F$ 上の有限次元三因子テンソル $T$ が $E$ 上で長さ $r$ の単純テンソル分解を持つなら、全正整数 $t$ に対し

$$
R_F(T^{\boxtimes t})\le d^3 r^t
$$

> が成立する。
<!-- formal-statement-end -->

見取り図：拡大体で先に冪を取ってから、三本のベクトルをそれぞれ $F$ 係数へ分け、係数積から $1$ の成分だけを取り出します。

<!-- proof-start -->
### 証明

$E/F$ の基底 $\beta_1=1,\beta_2,\ldots,\beta_d$ を選ぶ。非零の $1$ を基底へ延長できるため、この選択は任意の有限拡大で可能である。$F$ 線形写像 $\lambda:E\to F$ を $\lambda(\sum_a c_a\beta_a)=c_1$ と置くと $\lambda|_F=\mathrm{id}$ である。

長さ $r$ の分解の $t$ 冪を展開すると $r^t$ 個の単純テンソルの和となる。各項の三本のベクトルを、対応する $F$ 上のテンソル因子の基底で展開し、さらに各係数を $\beta_a$ で展開する。例えば第一因子は $u=\sum_{a=1}^d\beta_a u_a$ と書け、$u_a$ は $F$ 上のベクトルである。第二・第三因子も $v=\sum_b\beta_b v_b$、$w=\sum_c\beta_c w_c$ と書く。従って一項は

$$
u\otimes v\otimes w
=\sum_{a,b,c=1}^d \beta_a\beta_b\beta_c
(u_a\otimes v_b\otimes w_c).
$$

全項を足した左辺は $T^{\boxtimes t}$ であり、その座標は $F$ に属する。全座標に $\lambda$ を適用すると左辺はそのまま、右辺の各係数は $\lambda(\beta_a\beta_b\beta_c)\in F$ になる。この係数を第一因子に吸収したものは $F$ 上の単純テンソルである。一項当たり高々 $d^3$ 項、元が $r^t$ 項なので結論を得る。
<!-- proof-end -->

例として $E=\mathbb Q(\sqrt2)$、$\beta_1=1,\beta_2=\sqrt2$ なら、$\lambda(3+5\sqrt2)=3$ です。$\lambda(\sqrt2\sqrt2\cdot1)=2$ なので、三本を別々に射影してから掛ける操作とは違います。$\lambda$ は乗法を保つ必要はありません。

$d$ は固定した分解に対して一定です。$d^{3/t}\to1$ なので、先に冪を取る順序が本質になります。サイズごとに拡大次数が増大する場合も、次節でこの順序を保ちます。

## 4. 正方行列積の四種類の量を比較する

[任意の体上の行列積指数の上界](../MMX6/index.md#thm-mmx6-field-upper-bound)と[形式回路の指数下界の移送](../MMX29/index.md#thm-mmx29-transfer)を合わせると、講読中の論文の正方版の結論は $\omega_K^{\mathrm{div}}=9/4$ です。ここで $\omega_K^{\mathrm{div}}$ は第29講の加減乗除を含む全演算数の指数です。一方、第14講の $\omega_K$ はテンソル階数による指数であり、固定サイズの階数分解から除算なしの回路を構成すると $\omega_K^{\mathrm{div}}\le\omega_K$ が従います。ここから導く系と、それを支える先行講の証明を区別します。

<a id="thm-mmx30-finite-bounds"></a>

<!-- formal-statement-start -->
> **定理（正方行列積の有限サイズ下界と漸近階数）**
>
> 任意の体上の形式回路による正方行列積指数が $9/4$ であるとする。体 $F$、整数 $n\ge2$、その代数閉包 $L$ に対し、

$$
R_F(T_n)\ge R_L(T_n)\ge
\underline R_{\mathrm{geom}}(T_n)\ge n^{9/4},
\qquad
\widetilde R_F(T_n)=n^{9/4}.
$$

> また $T_n$ に対応する行列積を形式恒等式として計算する $F$ 上の回路の非スカラー乗算・除算の合計 $q$ は

$$
q\ge\lceil n^{9/4}/2\rceil
$$

> を満たす。
<!-- formal-statement-end -->

見取り図：小さい階数分解を一つでも得ると、それを繰り返して指数を下げられます。境界階数の仮想的な改善も第2節によって同じ矛盾を起こします。上界の方向は第3節で元の体へ戻します。

<!-- proof-start -->
### 証明

任意の体 $K$ について、[行列積テンソルの積と階数評価](../../TSP/TSP7/index.md#thm-tsp7-product)から、対応する添字を $j$ 個の組にすれば $T_n^{\boxtimes j}\simeq T_{n^j}$ である。[行列積指数と漸近階数の一致](../../TSP/TSP14/index.md#thm-tsp14-omega-rank)で固定サイズ $n^j$ を選ぶと、双線形計算の指数は $\log_{n^j}R_K(T_{n^j})$ 以下になる。同じ[第14講の定理の後の全演算数の評価](../../TSP/TSP14/index.md#thm-tsp14-omega-rank)では、固定サイズ $B=n^j$、$A=R_K(T_B)\ge B^2$ の分解による再帰の全演算数が $O(kA^k)$ と評価されている。零埋めも含めて任意の正の指数増分を許せば、この回路の指数は $\log_B A$ 以下である。従って仮定の形式回路指数についても

$$
9/4\le\log_{n^j}R_K(T_{n^j})
$$

が成立する。底 $n^j>1$ で指数に戻せば $R_K(T_{n^j})\ge n^{9j/4}$ である。特に $K=L$ とする。

$r=\underline R_{\mathrm{geom}}(T_n)$ と置く。[Zariski閉包の冪の線形包](#lem-mmx30-power-span)により、$D=\dim_L V=n^6$ を固定して

$$
n^{9j/4}\le R_L(T_n^{\boxtimes j})\le N_jr^j.
$$

$j$ 乗根を取れば $n^{9/4}\le N_j^{1/j}r$ となる。$N_j^{1/j}\to1$ より $n^{9/4}\le r$ である。定義から $r\le R_L(T_n)$、係数拡張から $R_L(T_n)\le R_F(T_n)$ も成立する。

一般回路については[形式回路の双線形化](../MMX29/index.md#lem-mmx29-bilinearization)をサイズ $n$、非スカラー演算数 $q$ に適用すると $R_L(T_n)\le2q$。直前の下界から $n^{9/4}\le2q$ なので、$q$ が整数であることから所望の結論を得る。

漸近階数の下界は、$K=F$ で各 $j$ の階数の下界の $j$ 乗根を取り、$j\to\infty$ として得る。上界については $\varepsilon>0$ を固定する。[任意の体上の行列積指数の上界](../MMX6/index.md#thm-mmx6-field-upper-bound)の回路族の演算数は $Cn^{j(9/4+\varepsilon)}$ 以下とできる。定数 $C$ は $j$ に依存しない。[形式回路の双線形化](../MMX29/index.md#lem-mmx29-bilinearization)をサイズ $n^j$ に適用すると $T_{n^j}$ に $L$ 上で長さ $r_j\le2Cn^{j(9/4+\varepsilon)}$ の分解がある。

ここで一つの $j$ を固定する。この分解の有限個の係数が生成する有限拡大体を $E_j$、次数を $d_j$ とする。[有限拡大体からの冪の階数降下](#lem-mmx30-rank-descent)により

$$
R_F(T_n^{\boxtimes jt})\le d_j^3 r_j^t.
$$

$jt$ 乗根を取ると

$$
R_F(T_n^{\boxtimes jt})^{1/(jt)}
\le d_j^{3/(jt)}r_j^{1/j}.
$$

$j$ を固定したまま $t\to\infty$ とすれば $d_j^{3/(jt)}\to1$ であり、漸近階数の極限は部分列でも同じ値になる。よって

$$
\widetilde R_F(T_n)\le r_j^{1/j}
\le (2C)^{1/j}n^{9/4+\varepsilon}.
$$

この不等式は全 $j\ge1$ で成立するので、次に $j\to\infty$ として $\widetilde R_F(T_n)\le n^{9/4+\varepsilon}$。最後に $\varepsilon\downarrow0$ とし、下界と合わせれば等式が成立する。
<!-- proof-end -->

サイズ $n=2^8$ の場合には $n^{9/4}=2^{18}=262144$ です。原論文が比較する Sun の初版の境界階数上界案 $2^{17}=131072$ とは同じ幾何的境界階数について両立しません。非スカラー演算の下界は $2^{17}$ ですが、これは境界階数の下界と異なる量です。$n=2$ なら $2^{9/4}\approx4.757$ なので、整数である階数・境界階数は少なくとも5、$q$ は少なくとも3です。これらの下界だけから有限サイズでの最適算法は確定しません。

また、漸近階数の等式は $R_F(T_{n^j})^{1/j}$ の極限の主張であり、全サイズで $O(n^{9/4})$ の算法が存在することまで保証するものではありません。

## 5. tight tensor の予想を検算する

[テンソルの台](../../TSP/TSP13/index.md#def-tsp13-support)は、基底を固定して非零係数の添字だけを取り出した集合です。行列積の台は三つの添字対の接続関係を反映しています。[テンソルの平坦化](../../TSP/TSP3/index.md#def-tsp3-flattening)とは、基底展開の係数を一方の添字を行、残りを列として並べる操作です。ここでは一因子を行、残る二因子を列にするので $n^2\times n^4$ 行列になります。この関係を整数の重みで表せるなら、平坦化の階数だけで漸近階数も分かるのではないか、という予想がありました。

<a id="def-mmx30-tight"></a>

<!-- formal-statement-start -->
> **定義（tight tensor）**
>
> 体 $K$ 上の三因子テンソル $T$ に対し、各因子の基底を選び、その基底の添字集合を順に $I,J,H$、対応する台を $S\subset I\times J\times H$ とする。
>
> 三つの単射 $a:I\to\mathbb Z$、$b:J\to\mathbb Z$、$c:H\to\mathbb Z$ が存在して

$$
a(i)+b(j)+c(k)=0
\quad ((i,j,k)\in S)
$$

> を満たすとき、その台を tight とする。tight な台を持つ基底が存在するテンソルを tight tensor とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mmx30-tight -->
**定義の確認**。

各因子を二次元とし、基底を $(e_1,e_2),(f_1,f_2),(g_1,g_2)$ として対角テンソル $e_1\otimes f_1\otimes g_1+e_2\otimes f_2\otimes g_2$ を取ります。基底展開から台は $\{(1,1,1),(2,2,2)\}$ です。第一・第二因子の重みをそれぞれ $1,2$、第三因子を $-2,-4$ とします。各因子内で二つの値が異なるので単射です。台の二点では $1+1-2=0$ と $2+2-4=0$ が成立し、係数はいずれも1なので全標数で条件を満たします。重みは体の元ではなく整数です。
<!-- definition-example-end -->

単射条件がなければ、全てに零を割り当てるだけでどんな台でも条件を満たしてしまいます。

<a id="thm-mmx30-tight-counterexample"></a>

<!-- formal-statement-start -->
> **定理（正方行列積のtight性と漸近階数予想への反例）**
>
> 任意の体 $F$ と整数 $n\ge2$ に対し $T_n$ は tight tensor であり、三つの一因子平坦化の階数はすべて $n^2$ である。
>
> 正方行列積指数が全ての体で $9/4$ であるという先の定理の仮定の下では、

$$
\widetilde R_F(T_n)=n^{9/4}>n^2.
$$

> 従って tight tensor の漸近階数を一因子平坦化階数の最大値とする予想は成立しない。
<!-- formal-statement-end -->

見取り図：整数の位取りにより各添字対を区別し、三つの重みの和を相殺します。非零の位置が重ならない行を調べます。

<!-- proof-start -->
### 証明

整数 $B>n$ を取り、三因子の基底添字 $(i,j),(j,k),(k,i)$ にそれぞれ

$$
a_{ij}=i-Bj,\quad
b_{jk}=Bj-B^2k,\quad c_{ki}=B^2k-i
$$

を割り当てる。$a_{ij}=a_{i'j'}$ なら $i-i'=B(j-j')$ であり、左辺は $|i-i'|\le n-1<B$ を満たす。右辺は $B$ の倍数だから0であり、$j=j'$ と $i=i'$ を得る。$b_{jk}=b_{j'k'}$ なら $B$ で割って $j-j'=B(k-k')$、同じ絶対値評価から $k=k',j=j'$ を得る。$c_{ki}=c_{k'i'}$ なら $B^2(k-k')=i-i'$、$n-1<B^2$ だから $k=k',i=i'$ を得る。

各写像は単射である。台の各点では三つを足すと $i-Bj+Bj-B^2k+B^2k-i=0$ である。[tight tensor](#def-mmx30-tight)の条件を全て満たす。

[テンソルの平坦化](../../TSP/TSP3/index.md#def-tsp3-flattening)に従って第一因子を行、残る二因子を列に取る。行 $(i,j)$ の非零列は $((j,k),(k,i))$（$1\le k\le n$）で、その値は1である。一つの列が二つの行の非零位置に現れるなら列から $i,j$ が決まるので両行は同じである。各行は非零で互いに台が交わらない。従って行の線形結合が零なら各行から非零列を一つ選んで係数が0と分かる。全 $n^2$ 行は独立で、階数は $n^2$ である。

第二因子を行にすれば行 $(j,k)$ の非零列は $((i,j),(k,i))$、第三因子なら行 $(k,i)$ の非零列は $((i,j),(j,k))$ である。いずれも列から行の二添字が一意に決まり、各行に $n$ 個の1がある。従ってそれぞれ全行が独立である。

[正方行列積の有限サイズ下界と漸近階数](#thm-mmx30-finite-bounds)から漸近階数は $n^{9/4}$。$n\ge2$ なら $n^{1/4}>1$ なので $n^{9/4}=n^2n^{1/4}>n^2$ となる。
<!-- proof-end -->

原論文が引用する Strassen の1994年の予想（Conjecture 5.3）はこの台の構造に関する予想です。重みの単射性と平坦化の計算自体は行列積指数の新しい証明を必要としません。反例としての結論に新しい指数の下界が必要です。[三因子テンソルのスペクトル極値公式](../../TSP/TSP12/index.md#thm-tsp12-three-tensor)と[平坦化階数によるスペクトル点](../../TSP/TSP11/index.md#thm-tsp11-flattening-spectral-point)を合わせると、平坦化はスペクトルの一部に過ぎず、他のスペクトル点によってより大きな値が生じ得ることが分かります。

## 6. 演習と詳細解答

### Level A

<a id="ex-mmx30-a01"></a>

#### MMX30-A01 整数への丸め

- Level: A

$n=16$ の階数、幾何的境界階数、非スカラー演算数の下界と漸近階数を求めよ。

<!-- solution-start -->
**詳細解答**

$16=2^4$ なので $16^{9/4}=2^9=512$。[正方行列積の有限サイズ下界と漸近階数](#thm-mmx30-finite-bounds)より階数と幾何的境界階数は512以上、非スカラー演算数は $\lceil512/2\rceil=256$ 以上、漸近階数は512である。最初の三つは下界であり、等号が成立するかはこの計算からは分からない。
<!-- solution-end -->

<a id="ex-mmx30-a02"></a>

#### MMX30-A02 三次の冪の次元

- Level: A

$D=3,j=3$ のとき、斉次単項式の個数を出現回数で分類して求めよ。

<!-- solution-start -->
**詳細解答**

出現回数の型は $(3,0,0)$ の順列3通り、$(2,1,0)$ の順列6通り、$(1,1,1)$ の1通りである。合計10通りで、[Zariski閉包の冪の線形包](#lem-mmx30-power-span)の上限 $\binom{5}{2}=10$ と一致する。$3^3=27$ は元のテンソル空間の次元であり、同じ単項式をまとめた後の上限とは異なる。
<!-- solution-end -->

<a id="ex-mmx30-a03"></a>

#### MMX30-A03 拡大体の座標射影

- Level: A

$\lambda:\mathbb Q(\sqrt3)\to\mathbb Q$ を $1$ の座標への射影とする。$\lambda((1+\sqrt3)(2-\sqrt3)\sqrt3)$ を求め、各因子の射影の積と比較せよ。

<!-- solution-start -->
**詳細解答**

最初の二因子の積は $2-\sqrt3+2\sqrt3-3=-1+\sqrt3$。第三因子を掛けると $3-\sqrt3$、従って射影は3である。各因子の射影は $1,2,0$ なのでその積は0である。[有限拡大体からの冪の階数降下](#lem-mmx30-rank-descent)では積を先に作ってから射影する必要がある。
<!-- solution-end -->

<a id="ex-mmx30-a04"></a>

#### MMX30-A04 小サイズのtight性

- Level: A

$n=2,B=3$ で各因子の四つの重みを列挙し、$(i,j,k)=(2,1,2)$ で和を確認せよ。

<!-- solution-start -->
**詳細解答**

[tight性の定理](#thm-mmx30-tight-counterexample)の証明で選んだ重み $a_{ij}=i-3j,\ b_{jk}=3j-9k,\ c_{ki}=9k-i$ を使う。第一因子の $(i,j)=(1,1),(1,2),(2,1),(2,2)$ に対し $a=-2,-5,-1,-4$。第二因子の $(j,k)$ を同じ順に並べれば $b=-6,-15,-3,-12$。第三因子の $(k,i)$ を同じ順に並べれば $c=8,7,17,16$。各集合の四値は相異なる。指定された添字では $a_{21}=-1,b_{12}=-15,c_{22}=16$ であり、和は0である。
<!-- solution-end -->

### Level B

<a id="ex-mmx30-b01"></a>

#### MMX30-B01 閉包と線形包

- Level: B

代数閉体 $L$ 上で $S=\{(1,t):t\in L,\ t\ne0\}$ とする。$(1,0)$ が $S$ の Zariski 閉包に属する理由を示し、その二乗テンソルを $S$ の元の二乗の線形結合で表せ。標数2も含めて扱え。

<!-- solution-start -->
**詳細解答**

代数閉体 $L$ は無限体である。実際、有限体だと仮定すれば $\prod_{a\in L}(z-a)-1$ は $L$ のどの元でも $-1$ となり、根を持たない非定数多項式になってしまう。[Zariski 位相](../../../代数系/AG/AG1-01/index.md#def-ag1-01-zariski-topology)の閉包判定により、$S$ 上で消える多項式 $p(x,y)$ について $p(1,t)$ は無限個の根を持つ一変数多項式である。従って零多項式となり $p(1,0)=0$。閉包の定義で $(1,0)$ は所属する。

相異なる三つの非零元 $t_1,t_2,t_3$ を選ぶ。$f(t)=(e_1+te_2)^{\otimes2}$ は次数2のベクトル値多項式である。各基底座標に対して次数2以下の一変数多項式を補間する。積の添字 $b$ は $\{1,2,3\}$ のうち $a$ 以外を動く。このとき

$$
f(0)=\sum_{a=1}^3 f(t_a)
\prod_{b\ne a}\frac{-t_b}{t_a-t_b}.
$$

実際、右辺の $-t_b$ を $t-t_b$ に置き換えた補間多項式は各 $t_a$ で $f(t_a)$ と一致し、差は次数2以下で三つの異なる根を持つから零である。分母は相異なる点の差で全て非零であり、標数2でも成立する。$f(0)=e_1^{\otimes2}$ は所望の線形結合である。
<!-- solution-end -->

<a id="ex-mmx30-b02"></a>

#### MMX30-B02 拡大次数と極限の順序

- Level: B

固定 $j$ ごとに $d_j=2^{j^2}$、$r_j=3^j$ とし、非零テンソル $T$ が全 $t\ge1$ に対して $R_F(T^{\boxtimes jt})\le d_j^3r_j^t$ を満たすとする。漸近階数の上界を求めよ。$t=1$ 固定の議論も比較せよ。

<!-- solution-start -->
**詳細解答**

[漸近階数](../../TSP/TSP9/index.md#def-tsp9-asymptotic-rank)の計算のため、固定した $j$ に対し $jt$ 乗根を取ると

$$
R_F(T^{\boxtimes jt})^{1/(jt)}
\le (2^{3j^2}3^{jt})^{1/(jt)}
=2^{3j/t}\cdot3.
$$

$j$ 固定で $t\to\infty$ とすると右辺は3に収束し、漸近階数の極限の部分列も同じ極限を持つので $\widetilde R_F(T)\le3$。一方 $t=1$ 固定なら上界は $3\cdot2^{3j}$ となり $j\to\infty$ で発散する。従って拡大次数を無視してサイズの極限を先に取ることはできない。
<!-- solution-end -->

<a id="ex-mmx30-b03"></a>

#### MMX30-B03 平坦化の四行

- Level: B

$T_2$ の第一因子平坦化で各行の非零列を列挙して階数を求めよ。標数2のときも同じか。

<!-- solution-start -->
**詳細解答**

[テンソルの平坦化](../../TSP/TSP3/index.md#def-tsp3-flattening)に従って $4\times16$ 行列を作り、列を $((j,k),(k,i))$ と書く。行 $(1,1)$ の非零列は $((1,1),(1,1)),((1,2),(2,1))$。行 $(1,2)$ は $((2,1),(1,1)),((2,2),(2,1))$。行 $(2,1)$ は $((1,1),(1,2)),((1,2),(2,2))$。行 $(2,2)$ は $((2,1),(1,2)),((2,2),(2,2))$ である。

八列は相異なり、各行の二成分の値は1である。線形結合の零条件を各行の最初の非零列で評価すると、四つの行係数がそれぞれ0になる。従って階数は4。標数2でも $1\ne0$ なので変わらない。
<!-- solution-end -->

<a id="ex-mmx30-b04"></a>

#### MMX30-B04 位取りの条件

- Level: B

$n=3,B=2$ として tight 性の証明で使った第一因子の重みに衝突が生じることを示せ。これは $T_3$ が tight でないことを意味するか。

<!-- solution-start -->
**詳細解答**

$a_{11}=1-2=-1$、$a_{32}=3-4=-1$ なので異なる添字対が同じ値となる。証明の単射性判定で $|i-i'|\le n-1=2$ が $B=2$ 未満にならず、非零の倍数を除けない。

ただし [tight tensor](#def-mmx30-tight)の定義は重みの存在を要求するだけである。$B=4>3$ を選び直せば [正方行列積のtight性と漸近階数予想への反例](#thm-mmx30-tight-counterexample) の単射性の証明が適用できる。失敗したのは一つの重みの選択であって tight 性そのものではない。
<!-- solution-end -->

### Level C

<a id="ex-mmx30-c01"></a>

#### MMX30-C01 仮想的な境界階数改善

- Level: C

$n=16$ で幾何的境界階数が500以下だという仮説を立てる。Zariski 閉包から冪の階数上界を導き、正方行列積指数 $9/4$ と矛盾することを示せ。さらに漸近階数の等式から元の階数が512に等しいと結論できるか答えよ。

<!-- solution-start -->
**詳細解答**

$L=\overline F$ で各因子の次元は $16^2=256$、三因子テンソル空間の次元は $D=256^3=16^6$。仮説から $T_{16}$ は $S_{500}$ の Zariski 閉包に属する。[Zariski閉包の冪の線形包](#lem-mmx30-power-span)を $v=T_{16},S=S_{500}$ に適用して

$$
R_L(T_{16}^{\boxtimes j})\le
\binom{j+D-1}{D-1}500^j.
$$

一方、[行列積指数と漸近階数の一致](../../TSP/TSP14/index.md#thm-tsp14-omega-rank)と第4節の全演算数の比較から $9/4=\omega_L^{\mathrm{div}}\le\omega_L\le\log_{16^j}R_L(T_{16^j})$。従って $R_L(T_{16^j})\ge(16^j)^{9/4}=512^j$。[行列積テンソルの積と階数評価](../../TSP/TSP7/index.md#thm-tsp7-product)で二つの階数を比較して

$$
512\le\binom{j+D-1}{D-1}^{1/j}500.
$$

$D$ は固定であり、二項係数の対数を $j$ で割ると0に収束するので、$j\to\infty$ により $512\le500$ となり矛盾する。

漸近階数が512でも $R_F(T_{16})=512$ は従わない。例えば抽象的な劣乗法的整数列 $a_j=2\cdot512^j$ は $a_{p+q}\le a_pa_q$ を満たし、$a_j^{1/j}\to512$ だが $a_1=1024$ である。この例は特定テンソルの階数列だとは主張していない。極限だけでは第一項を確定できないことを示している。
<!-- solution-end -->

## 7. 次講への接続

今回の論証は、正方行列積の指数から、通常階数・幾何的境界階数・漸近階数・回路の有限サイズの下界を区別して引き出しました。次講では三つの添字の範囲が異なる長方形行列積を扱い、正方版から従う範囲と追加の結果を分けます。

参考：[OpenAI, The matrix multiplication exponent is nine fourths (2026-11-24), consequences.tex](https://github.com/openai/math/blob/main/preprints/The-matrix-multiplication-exponent-is-nine-fourths-November-24-2026/build/consequences.tex)、同 [intro.tex](https://github.com/openai/math/blob/main/preprints/The-matrix-multiplication-exponent-is-nine-fourths-November-24-2026/build/intro.tex)。本講は Corollary と tight tensor の議論を、各係数と極限の順序を明示して再構成しています。
