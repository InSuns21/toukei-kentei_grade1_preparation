# MQFC20 Haar積分と表現の直交性

[MQFC19 の群値辺接続](../MQFC19/index.md#def-mqfc19-link)では、有限格子の各正向き辺にコンパクト行列群 $G\subset U(N)$ の元を置いた。次の問題は、群元をどの確率で選べば頂点の枠を取り替えても結果が変わらないかである。さらに相互作用を導入した後の計算には、群上の関数の積分を表現の成分ごとに整理する道具が要る。

本講では [LREP2 の正規化左Haar測度](../../../代数系/LREP/LREP2/index.md#def-lrep2-haar-probability) と [Schur の補題](../../../代数系/LREP/LREP2/index.md#thm-lrep2-schur) を使う。一般の存在定理は同講の明示的な入力とし、ここでは有限格子に必要な変数変換、$SU(2)$ での具体的な積分、直交関係と平均による射影を導出する。

## 1. 群の一様な確率分布

$G$ はコンパクト行列群とする。正規化左Haar測度を $\mu$、積分の記号を $dg=d\mu(g)$ とする。[正規化左Haar測度](../../../代数系/LREP/LREP2/index.md#def-lrep2-haar-probability) は全体の測度が1の正則 Borel 測度で、任意の Borel 集合 $A$ と $h\in G$ について $\mu(hA)=\mu(A)$ を満たす。正則性は測度を内側のコンパクト集合と外側の開集合で近似できる性質である。コンパクト群ではこの確率測度は一意に存在する。

例えば $U(1)$ では $g=e^{i\theta}$ に対して角度 $\theta\in[0,2\pi)$ を一様に選べばよい。

$$
\int_{U(1)} f(g)\,dg
=\frac1{2\pi}\int_0^{2\pi}f(e^{i\theta})\,d\theta.
$$

確率1への規格化は $f=1$ を代入すれば確認できる。$h=e^{i\alpha}$ を掛けることは角度を $\alpha$ だけ移すことであり、$2\pi$ 周期性により一周期の積分は不変である。集合の指示関数にもこの変数変換が成立する。区間の端点の同一視は測度零なので確率に影響しない。

非可換群では左乗法と右乗法を区別しなければならない。さらに逆向きの辺は逆元で表すので、逆元への変数変換も必要になる。

<a id="prop-mqfc20-haar-transform"></a>

<!-- formal-statement-start -->
> **命題（正規化Haar積分の変数変換）**
> コンパクト行列群 $G$ の正規化左Haar測度を $dg$ とする。任意の $h,k\in G$ と可積分な複素関数 $f$ について

$$
\int_G f(hgk)\,dg=\int_G f(g)\,dg,
\qquad
\int_G f(g^{-1})\,dg=\int_G f(g)\,dg.
$$
<!-- formal-statement-end -->

右からの移動でできる測度も左不変であり、逆元によって右と左が入れ替わる。一意性が両方の変数変換を保証する。

<!-- proof-start -->
### 証明

[LREP2 の正規化左Haar測度](../../../代数系/LREP/LREP2/index.md#def-lrep2-haar-probability) の直後で示した右不変性を用いる。具体的には $\nu(A)=\mu(Ak)$ は右移動が同相写像であるため正則確率測度であり、$\nu(hA)=\mu(hAk)=\mu(Ak)$ で左不変だから、正規化測度の一意性により $\nu=\mu$ となる。

逆元への写像も同相写像である。$\eta(A)=\mu(A^{-1})$ は正則確率測度であり、

$$
\eta(hA)=\mu((hA)^{-1})
=\mu(A^{-1}h^{-1})=\mu(A^{-1})=\eta(A).
$$

右不変性を使ったので最後から二番目の等号が成立する。一意性より $\eta=\mu$。従って左移動・右移動・逆元写像のそれぞれで測度が保存される。指示関数での積分等式は集合の不変性そのもので、非負単関数、非負可測関数、可積分な複素関数の実部・虚部へと積分の定義に従って延長できる。
<!-- proof-end -->

例えば $G=U(1)$ で整数 $n$ に対し

$$
\int g^n\,dg=
\begin{cases}
1 & n=0,\\
0 & n\ne0
\end{cases}
$$

となる。$n\ne0$ なら原始関数は $e^{in\theta}/(in)$ であり、両端の値が等しい。従って平均によって定数成分だけが残る。この性質を非可換群へ広げるのが次の節以降の目標である。

## 2. SU(2) の平均を球面で計算する

[LREP2 のHaar測度の具体模型](../../../代数系/LREP/LREP2/index.md#def-lrep2-haar-probability) では

$$
U(a,b)=\begin{pmatrix}
a&b\\-\overline b&\overline a
\end{pmatrix},
\qquad |a|^2+|b|^2=1
$$

により $SU(2)$ を $S^3\subset\mathbb R^4$ と対応させた。第1列の単位長と列同士の直交性、行列式1から全ての $SU(2)$ 行列がこの形になり、逆にこの形の行列は $U^\dagger U=I$ と $\det U=1$ を満たす。

ここで $\dagger$ は共役転置を表す。左乗法は第1列 $(a,-\overline b)^{\mathsf T}$ にユニタリ行列を掛ける操作であり、右乗法は第1行 $(a,b)$ にユニタリ行列を掛ける操作である。どちらも実線形で実4次元の長さを保つので球面の面積を保存する。球面面積を全体の面積で割った確率測度は左・右不変であり、正則性と一意性から正規化Haar測度に一致する。

この模型から積分を計算しよう。座標を $a=x_1+ix_2,\ b=x_3+ix_4$ と書く。球面面積は実座標の置換と各座標の符号反転で不変である。符号反転により $\int x_j\,dg=0$ と、$j\ne k$ のとき $\int x_jx_k\,dg=0$ が従う。一方4個の $\int x_j^2\,dg$ は座標置換により同じ値である。球面上では二乗和が1なので、

$$
4\int x_1^2\,dg
=\int\sum_{j=1}^4 x_j^2\,dg=1.
$$

従って

$$
\int |a|^2\,dg=\int |b|^2\,dg=\frac12,
\qquad
\int a^2\,dg=\frac14-\frac14+0=0.
$$

行列の全成分の平均が零になることも各実座標の平均が零であることから分かる。この $1/2$ は後で現れる表現の次元の逆数である。

## 3. 行列要素の平均を線形写像の問題へ移す

[LREP1 の既約表現](../../../代数系/LREP/LREP1/index.md#def-lrep1-irreducible) とは非零の真の不変部分空間を持たない非零表現である。[LREP2 のコンパクト群の平均による不変内積](../../../代数系/LREP/LREP2/index.md#thm-lrep2-compact-averaging) により、有限次元連続複素表現には不変な正定値内積を入れられる。その正規直交基底では表現の行列がユニタリになる。

以下、$\rho:G\to U(d_\rho)$ と $\sigma:G\to U(d_\sigma)$ を連続ユニタリ表現とする。行列要素 $\rho_{ij}(g)$ は第 $j$ 基底ベクトルを $\rho(g)$ で移したときの第 $i$ 成分である。行列要素を積分する代わりに、二つの表現の間の長方形行列 $A$ を群で移して平均する。

<a id="prop-mqfc20-intertwiner-average"></a>

<!-- formal-statement-start -->
> **命題（表現間の平均化）**
> コンパクト行列群 $G$ の連続ユニタリ表現 $\rho,\sigma$ と $d_\rho\times d_\sigma$ 複素行列 $A$ に対し

$$
T(A)=\int_G\rho(g)A\sigma(g)^\dagger\,dg
$$

> は $\sigma$ から $\rho$ への絡作用素である。
<!-- formal-statement-end -->

行列の積分は各成分の積分で定義する。コンパクト性と連続性により各成分は有界である。平均した行列に群元を作用させても積分変数が移動するだけなので、絡作用素の交換関係を得る。

<!-- proof-start -->
### 証明

任意の $h\in G$ に対して、表現の積の条件と共役転置の積の順序を使うと

$$
\begin{aligned}
\rho(h)T(A)\sigma(h)^\dagger
&=\int_G \rho(hg)A
  \sigma(g)^\dagger\sigma(h)^\dagger\,dg\\
&=\int_G\rho(hg)A\sigma(hg)^\dagger\,dg\\
&=T(A).
\end{aligned}
$$

最後は [Haar積分の変数変換](#prop-mqfc20-haar-transform) の左移動である。右から $\sigma(h)$ を掛けると

$$
\rho(h)T(A)=T(A)\sigma(h).
$$

これは [絡作用素の条件](../../../代数系/LREP/LREP1/index.md#def-lrep1-intertwiner) である。
<!-- proof-end -->

この命題に [Schur の補題](../../../代数系/LREP/LREP2/index.md#thm-lrep2-schur) を組み合わせる。非同値な既約表現間では $T(A)=0$ となる。同じ既約表現を両側に置いた場合、$T(A)=cI$ であり、トレースを取ると

$$
d_\rho c=\operatorname{tr}T(A)
=\int_G\operatorname{tr}(\rho(g)A\rho(g)^{-1})\,dg
=\operatorname{tr}A.
$$

ここでは群全体の測度が1であることを使った。従って $T(A)=(\operatorname{tr}A/d_\rho)I$ である。

<a id="thm-mqfc20-matrix-orthogonality"></a>

<!-- formal-statement-start -->
> **定理（既約表現の行列要素の直交性）**
> コンパクト行列群 $G$ の非零有限次元連続複素既約ユニタリ表現について、同値類ごとに一つの表現と正規直交基底を固定する。異なる同値類の代表 $\rho,\sigma$ なら

$$
\int_G\rho_{ij}(g)\overline{\sigma_{kl}(g)}\,dg=0.
$$

> 同じ代表 $\rho$ の成分同士では

$$
\int_G\rho_{ij}(g)\overline{\rho_{kl}(g)}\,dg
=\frac{\delta_{ik}\delta_{jl}}{d_\rho}.
$$

> 添字はそれぞれの表現の基底の範囲を動き、$\delta_{ab}$ は $a=b$ なら1、それ以外は0である。
<!-- formal-statement-end -->

異なる同値類だけでなく、同じ表現の異なる行列成分も直交する。規格化係数の $d_\rho$ は、行列のトレースでスカラーを決定したところから生じる。

<!-- proof-start -->
### 証明

$d_\rho\times d_\sigma$ 行列 $E_{jl}$ を、第 $(j,l)$ 成分だけが1で他は0の行列とする。[表現間の平均化](#prop-mqfc20-intertwiner-average) に $A=E_{jl}$ を入れると

$$
\begin{aligned}
T(E_{jl})_{ik}
&=\int_G\sum_{u=1}^{d_\rho}
\sum_{v=1}^{d_\sigma}
\rho_{iu}(g)(E_{jl})_{uv}
\overline{\sigma_{kv}(g)}\,dg\\
&=\int_G\rho_{ij}(g)
\overline{\sigma_{kl}(g)}\,dg .
\end{aligned}
$$

非同値な既約表現なら [Schur の補題](../../../代数系/LREP/LREP2/index.md#thm-lrep2-schur) により $T(E_{jl})=0$。同じ代表では先ほどのトレースの計算に $A=E_{jl}$ を代入し、

$$
T(E_{jl})=\frac{\delta_{jl}}{d_\rho}I_{d_\rho}.
$$

その $(i,k)$ 成分は $\delta_{jl}\delta_{ik}/d_\rho$ であり、求める式が出る。
<!-- proof-end -->

$SU(2)$ の標準表現は [LREP2 の既約性の具体例](../../../代数系/LREP/LREP2/index.md#thm-lrep2-complete-reducibility) で確認したように既約で、次元2である。[既約表現の行列要素の直交性](#thm-mqfc20-matrix-orthogonality) に $i=j=k=l=1$ と $d_\rho=2$ を代入すると、第2節の $\int |a|^2\,dg=1/2$ を再現できる。同じ次元でも非同値なら積分は0となる。逆に同値な表現で基底だけが違う場合は、上のデルタの式をそのまま適用することはできない。

## 4. トレースで表現の成分を数える

ゲージ不変な閉路の観測量では行列の個々の成分よりトレースが自然に現れる。表現のトレースを取ると共役変換で不変な関数になる。

<a id="def-mqfc20-character"></a>

<!-- formal-statement-start -->
> **定義（表現の指標）**
> 群 $G$ の有限次元連続複素表現 $\rho$ の指標は、群上の関数

$$
\chi_\rho(g)=\operatorname{tr}\rho(g)
$$

> である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc20-character -->
**定義の確認**。$G=U(1)$ で $\rho(g)=\operatorname{diag}(1,g)$ とする。連続であり $\rho(gh)=\operatorname{diag}(1,gh)=\rho(g)\rho(h)$、$\rho(1)=I$ である。全成分の絶対値が有界で行列は可逆である。この2次元表現の指標は $\chi_\rho(g)=1+g$ であり、単位元で2を取る。一般の指標は群準同型とは限らない。1次元の場合には [LREP1 の1次元指標](../../../代数系/LREP/LREP1/index.md#def-lrep1-character) と一致する。
<!-- definition-example-end -->

任意の $h,g\in G$ に対し

$$
\chi_\rho(hgh^{-1})
=\operatorname{tr}(\rho(h)\rho(g)\rho(h)^{-1})
=\chi_\rho(g).
$$

従って指標は共役類（互いに共役な群元の集合）ごとに一定である。このような関数を類関数という。特にユニタリ表現なら $\chi_\rho(g^{-1})=\overline{\chi_\rho(g)}$ である。

<a id="thm-mqfc20-character-orthogonality"></a>

<!-- formal-statement-start -->
> **定理（既約指標の直交性）**
> コンパクト行列群 $G$ の有限次元連続複素既約ユニタリ表現の同値類代表 $\rho,\sigma$ について

$$
\int_G\chi_\rho(g)\overline{\chi_\sigma(g)}\,dg
=\begin{cases}1&\rho=\sigma,\\0&\rho\ne\sigma.\end{cases}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[指標](#def-mqfc20-character) を対角成分の和で展開すると

$$
\int_G\chi_\rho(g)\overline{\chi_\sigma(g)}\,dg
=\sum_{i=1}^{d_\rho}\sum_{k=1}^{d_\sigma}
\int_G\rho_{ii}(g)\overline{\sigma_{kk}(g)}\,dg.
$$

非同値なら [行列要素の直交性](#thm-mqfc20-matrix-orthogonality) により全項が零。同じ代表なら各項は $\delta_{ik}/d_\rho$ であり、$i=k$ の $d_\rho$ 項だけが残るため和は1である。
<!-- proof-end -->

[LREP2 の完全可約性](../../../代数系/LREP/LREP2/index.md#thm-lrep2-complete-reducibility) から任意の有限次元連続複素表現 $D$ は既約表現の有限直和に分解できる。同値類 $\rho$ の出現回数を $m_\rho$ とすると、ブロック対角行列のトレースは各ブロックのトレースの和だから

$$
\chi_D=\sum_\rho m_\rho\chi_\rho.
$$

有限和を [既約指標の直交性](#thm-mqfc20-character-orthogonality) に代入すれば

$$
m_\sigma=\int_G\chi_D(g)\overline{\chi_\sigma(g)}\,dg.
$$

例えば $D(g)=\operatorname{diag}(1,g,g)$ ($g\in U(1)$) では $\chi_D=1+2g$ だから定数表現が1回、$g$ の表現が2回現れる。一般の連続類関数 $f$ についても、有限個の互いに非同値な既約表現からなる集合 $F$ を選べば、その指標の張る空間への $L^2(G,dg)$ での直交射影は

$$
f_F=\sum_{\rho\in F} c_\rho\chi_\rho,\qquad
c_\rho=\int_G f(g)\overline{\chi_\rho(g)}\,dg
$$

である。実際、任意の $\sigma\in F$ に対して $f-f_F$ と $\chi_\sigma$ の内積は $c_\sigma-c_\sigma=0$ となる。これは有限個の正規直交関数への射影である。全ての既約指標が類関数の空間で完全であること（Peter–Weyl 定理に基づく結果）や無限展開の点ごとの収束は、この有限個の指標への直交射影からだけでは従わない。

格子ゲージ作用の重みで必要になる有限の指標展開には、直和だけでなく積も重要である。二つのユニタリ表現の [表現のテンソル積](../../../代数系/LREP/LREP4/index.md#def-lrep4-tensor-product) は、基底を $e_i\otimes f_j$ とすれば対角成分が $\rho_{ii}(g)\sigma_{jj}(g)$ であり、

$$
\chi_{\rho\otimes\sigma}(g)
=\sum_{i,j}\rho_{ii}(g)\sigma_{jj}(g)
=\chi_\rho(g)\chi_\sigma(g).
$$

従って指標の積も完全可約性により非負整数係数の有限指標和になる。これは後に作用の指数関数を冪級数で展開する際の出発点になる。

## 5. 平均は不変な状態への射影になる

表現の全成分を平均すると、群によって動く成分が消え、どの群元でも動かない成分が残る。例えば $C_2=\{e,s\}$ で $D(s)=\operatorname{diag}(1,-1)$ なら $(I+D(s))/2=\operatorname{diag}(1,0)$ である。

<a id="thm-mqfc20-invariant-projection"></a>

<!-- formal-statement-start -->
> **定理（群平均による不変部分空間への直交射影）**
> コンパクト行列群 $G$ の有限次元連続ユニタリ表現 $D$ が作用する複素内積空間を $V$ とする。

$$
V^G=\{v\in V:D(g)v=v\ (\forall g\in G)\},
\qquad P=\int_G D(g)\,dg
$$

> と置くと、$P$ は $V^G$ への直交射影である。
<!-- formal-statement-end -->

左不変性で像が不変部分に入り、既に不変なベクトルは平均しても変わらない。逆元不変性とユニタリ性で自己共役性も従う。

<!-- proof-start -->
### 証明

[Haar積分の変数変換](#prop-mqfc20-haar-transform) より、任意の $h$ に対して

$$
D(h)P=\int_G D(hg)\,dg=P.
$$

従って $Pv$ は全ての $h$ で固定される。逆に $w\in V^G$ なら

$$
Pw=\int_G w\,dg=w.
$$

従って像はちょうど $V^G$ であり、$Pv\in V^G$ に上式を適用すると $P^2v=Pv$。またユニタリ性から $D(g)^\dagger=D(g^{-1})$ なので

$$
P^\dagger=\int_G D(g)^\dagger\,dg
=\int_G D(g^{-1})\,dg=P.
$$

$v=Pv+(v-Pv)$ と分けると $P(v-Pv)=0$。任意の $w\in V^G$ に対し、内積を第一変数について共役線形とすると

$$
\langle w,v-Pv\rangle
=\langle Pw,v-Pv\rangle
=\langle w,P(v-Pv)\rangle=0.
$$

従って $v-Pv$ は $V^G$ に直交する。これが直交射影であることの確認である。
<!-- proof-end -->

さらに有限次元連続ユニタリ表現 $D$ に対し、ある既約代表 $\rho$ と同値な直和因子を全て合わせた部分空間への射影は

$$
P_\rho=d_\rho\int_G\overline{\chi_\rho(g)}D(g)\,dg
$$

で得られる。[不変直交補空間](../../../代数系/LREP/LREP2/index.md#prop-lrep2-orthogonal-complement) を繰り返し取って直交する既約ブロックに分ける。各ブロックでは同値写像で代表の基底を移して行列表現を一致させる。この基底は正規直交である必要はない。計算結果が恒等写像または零写像なので基底を元に戻しても結果は変わらず、ブロック間の直交性から全体は直交射影になる。このブロックの $(i,j)$ 成分は

$$
d_\rho\sum_{k=1}^{d_\rho}
\int_G\sigma_{ij}(g)\overline{\rho_{kk}(g)}\,dg.
$$

[行列要素の直交性](#thm-mqfc20-matrix-orthogonality) により、$\sigma\ne\rho$ なら0、$\sigma=\rho$ なら $\sum_k\delta_{ik}\delta_{jk}=\delta_{ij}$。従って同値なブロックで恒等、それ以外で零となる。この射影の像は選んだ既約直和分解によらない。自明表現（全ての群元を1に写す1次元表現）を選べば直前の $P$ に戻る。

## 6. 有限格子での積分

[MQFC19 の群値辺接続](../MQFC19/index.md#def-mqfc19-link) において正向き辺の集合 $E_+$ は有限であり、配置は $G^{E_+}$ の点として表される。基準測度には各辺の正規化Haar測度の有限直積を使う。

<a id="prop-mqfc20-product-gauge"></a>

<!-- formal-statement-start -->
> **命題（格子の積Haar測度のゲージ不変性）**
> 有限格子の正向き辺の集合を $E_+$、群をコンパクト行列群 $G$ とする。配置空間 $G^{E_+}$ に積確率測度

$$
d\mu_0(U)=\prod_{e\in E_+}dU_e
$$

> を入れる。任意の頂点ゲージ変換 $h$ と可積分な関数 $F$ に対し

$$
\int F(h\cdot U)\,d\mu_0(U)=\int F(U)\,d\mu_0(U).
$$
<!-- formal-statement-end -->

各辺の両端で異なる群元を掛けても測度が保たれることが鍵である。

<!-- proof-start -->
### 証明

[頂点ゲージ変換](../MQFC19/index.md#def-mqfc19-vertex-gauge) によれば、辺 $e=(x,y)$ の変数は $U_e\mapsto h_yU_eh_x^{-1}$ となる。$h$ は固定しているので、この写像は各辺ごとの写像の直積である。[Haar積分の変数変換](#prop-mqfc20-haar-transform) から各辺の写像は測度を保存する。従って Borel 長方形 $\prod_e A_e$ の逆像の測度は

$$
\prod_{e=(x,y)}
\mu(h_y^{-1}A_eh_x)=\prod_e\mu(A_e).
$$

有限直積測度は長方形上の値で一意に決まるので、写像による移送測度は $\mu_0$ と等しい。指示関数から可積分関数へ積分等式を延長して結論を得る。
<!-- proof-end -->

逆向き辺に別の独立変数を置く必要はない。逆向きの座標を選び直すことも [Haar積分の変数変換](#prop-mqfc20-haar-transform) の逆元不変性で正当化できる。

さらに頂点群 $K=G^\Lambda$ に積Haar測度を入れ、連続関数 $F$ に対して

$$
(\mathcal P F)(U)=\int_K F(h^{-1}\cdot U)\,dh
$$

と置けばゲージ不変な関数が得られる。[頂点ゲージ変換の作用則](../MQFC19/index.md#prop-mqfc19-action) により $F(h^{-1}\cdot(k\cdot U))=F((k^{-1}h)^{-1}\cdot U)$。$h=ka$ と変数変換すると $(\mathcal P F)(k\cdot U)=(\mathcal P F)(U)$ である。もともと不変なら $\mathcal P F=F$ なので $\mathcal P^2=\mathcal P$。これは次の格子Hilbert空間の構成で使う平均操作の連続関数上での形である。

なお積Haar測度は相互作用を入れる前の基準測度であり、次講で作用による重みを掛けた後に辺の独立性が保たれるとは限らない。

## 7. 演習

### 演習 MQFC20-A1：円周の行列要素

- Level: A

$U(1)$ の正規化Haar測度で $\int g^3\overline{g^2}\,dg$ と $\int g^{-2}\overline{g^{-2}}\,dg$ を求めよ。

<!-- solution-start -->
**詳細解答**

$g=e^{i\theta}$ と置けば第1式の被積分関数は $e^{3i\theta}e^{-2i\theta}=e^{i\theta}$ である。

$$
\frac1{2\pi}\int_0^{2\pi}e^{i\theta}\,d\theta
=\frac{e^{2\pi i}-1}{2\pi i}=0.
$$

第2式は $e^{-2i\theta}e^{2i\theta}=1$ なので積分は1。異なる1次元表現は直交し、同じ表現のノルムは1になる。
<!-- solution-end -->

### 演習 MQFC20-A2：SU(2) の座標の交差項

- Level: A

第2節の $a,b$ について $\int a\overline b\,dg$ と $\int(\operatorname{Im}b)^2\,dg$ を求めよ。

<!-- solution-start -->
**詳細解答**

球面座標で

$$
a\overline b=x_1x_3+x_2x_4+i(x_2x_3-x_1x_4).
$$

各項は異なる座標の積であり、そのうち一方の座標だけ符号を反転すると符号が変わる。球面測度は保存されるので各積分は自分の負号に等しく0。従って $\int a\overline b\,dg=0$ である。

$\operatorname{Im}b=x_4$。4座標の二乗積分が等しく、その和が1なので $\int x_4^2\,dg=1/4$。
<!-- solution-end -->

### 演習 MQFC20-A3：指標とトレース

- Level: A

$G=U(1)$ 上の表現 $D(g)=\operatorname{diag}(g,g^{-1},1,1)$ の指標と、$\int\chi_D(g)\,dg$ を求めよ。指標の単位元での値と比較せよ。

<!-- solution-start -->
**詳細解答**

[表現の指標](#def-mqfc20-character) より $\chi_D(g)=g+g^{-1}+2$。第1節の円周積分で $\int g\,dg=\int g^{-1}\,dg=0$、$\int 1\,dg=1$ だから平均は2である。一方 $\chi_D(1)=4$ であり全表現の次元を表す。平均値2は自明表現の出現回数であって全次元ではない。
<!-- solution-end -->

### 演習 MQFC20-A4：固定されるベクトル

- Level: A

$G=U(1)$ の表現 $D(g)=\operatorname{diag}(g,1,g^2)$ について不変部分空間とその平均射影を求めよ。

<!-- solution-start -->
**詳細解答**

全ての $g$ に対して $(gv_1,v_2,g^2v_3)=(v_1,v_2,v_3)$ が必要である。$g=i$ を代入すると $(i-1)v_1=0$、$(-1-1)v_3=0$ なので $v_1=v_3=0$。逆にこの条件なら全ての $g$ で固定される。従って $V^G=\mathbb C e_2$。

[群平均による直交射影](#thm-mqfc20-invariant-projection) を成分ごとに計算すると

$$
P=\operatorname{diag}(\int g\,dg,1,\int g^2\,dg)
=\operatorname{diag}(0,1,0).
$$

$P^2=P=P^\dagger$ であり、像が求めた直線と一致する。
<!-- solution-end -->

### 演習 MQFC20-B1：SU(2) の共役平均

- Level: B

$A=\begin{pmatrix}3&2i\\1&-1\end{pmatrix}$ とする。$SU(2)$ の標準表現で $\int UAU^\dagger\,dU$ を求めよ。$A$ が自己共役である必要はあるか。

<!-- solution-start -->
**詳細解答**

標準表現は [LREP2 の既約性の具体例](../../../代数系/LREP/LREP2/index.md#thm-lrep2-complete-reducibility) により既約な2次元連続ユニタリ表現である。[表現間の平均化](#prop-mqfc20-intertwiner-average) で $\rho=\sigma$ とすると平均行列は標準表現と可換する。[Schur の補題](../../../代数系/LREP/LREP2/index.md#thm-lrep2-schur) により $cI_2$ と書ける。トレースの循環性と規格化から

$$
2c=\int\operatorname{tr}(UAU^\dagger)\,dU
=\operatorname{tr}A=3-1=2.
$$

従って $c=1$、結果は $I_2$。証明は $A$ の自己共役性を要求していない。実際、問題の $A$ の非対角成分は互いの複素共役でない。
<!-- solution-end -->

### 演習 MQFC20-B2：有限指標射影

- Level: B

$U(1)$ 上の $f(g)=2+3g+g^{-2}$ を $1,g,g^{-1}$ の張る空間に直交射影せよ。誤差の $L^2$ ノルム二乗を求めよ。

<!-- solution-start -->
**詳細解答**

[既約指標の直交性](#thm-mqfc20-character-orthogonality) を1次元表現 $g\mapsto g^n$ に適用する。係数は

$$
\begin{aligned}
c_0&=\int (2+3g+g^{-2})\,dg=2,\\
c_1&=\int (2g^{-1}+3+g^{-3})\,dg=3,\\
c_{-1}&=\int (2g+3g^2+g^{-1})\,dg=0.
\end{aligned}
$$

よって射影は $2+3g$ であり、残差は $g^{-2}$。絶対値1なので

$$
\int |f-(2+3g)|^2\,dg=\int 1\,dg=1.
$$

残差と選んだ3個の指標の内積は全て0である。有限個の指標への直交射影の誤差は、関数が連続であっても一般には零にならない。
<!-- solution-end -->

### 演習 MQFC20-B3：指標の積と重複度

- Level: B

$U(1)$ の表現 $D(g)=\operatorname{diag}(g,g^{-1})$ を考える。テンソル積 $D\otimes D$ の指標を求め、自明表現の出現回数を積分で確かめよ。

<!-- solution-start -->
**詳細解答**

テンソル積の基底 $e_1\otimes e_1,e_1\otimes e_2,e_2\otimes e_1,e_2\otimes e_2$ に対する作用は順に $g^2,gg^{-1},g^{-1}g,g^{-2}$ 倍である。従って

$$
\chi_{D\otimes D}(g)=g^2+2+g^{-2}
=(g+g^{-1})^2.
$$

定数指標 $1$ との内積は [既約指標の直交性](#thm-mqfc20-character-orthogonality) から重複度であり、

$$
\int(g^2+2+g^{-2})\,dg=2.
$$

実際、中間の二つの基底ベクトルが固定されるので重複度2と一致する。$D$ 自身に自明な成分がなくてもテンソル積には現れ得る。
<!-- solution-end -->

### 演習 MQFC20-B4：非コンパクト群での正規化の失敗

- Level: B

実数の加法群 $\mathbb R$ に平行移動不変な Borel 確率測度が存在しないことを示せ。コンパクト群での正規化との違いは何か。

<!-- solution-start -->
**詳細解答**

存在すると仮定して $p=\mu([0,1))$ とする。不変性により全整数 $n$ で $\mu([n,n+1))=p$。$m$ 個の互いに素な区間を足すと $mp\le1$ が任意の正整数 $m$ で成立するため $p=0$ である。しかし整数で添字付けたこれらの区間は互いに素で全実数を覆う。

$$
1=\mu(\mathbb R)=\sum_{n\in\mathbb Z}\mu([n,n+1))=0
$$

となって矛盾する。通常の長さの測度は平行移動不変だが全実数の測度は無限であるため、確率1へ正規化できない。従ってコンパクト群で使った正規化平均をそのまま適用できない。
<!-- solution-end -->

### 演習 MQFC20-B5：同じ型の成分をまとめる射影

- Level: B

$G=U(1)$、$D(g)=\operatorname{diag}(g,1,g,g^{-1})$ とする。既約代表 $\rho(g)=g$ に対応する第5節の射影を計算し、重複度と射影の階数が一致することを示せ。

<!-- solution-start -->
**詳細解答**

$\rho$ は1次元で $\chi_\rho(g)=g$ だから $d_\rho=1$。第5節の指標による射影に代入すると

$$
P_\rho=\int_G g^{-1}D(g)\,dg
=\int_G\operatorname{diag}(1,g^{-1},1,g^{-2})\,dg
=\operatorname{diag}(1,0,1,0).
$$

第1節の円周積分で非零指数の項が消える。像は $\mathbb C e_1\oplus\mathbb C e_3$ で、どちらも群元 $g$ を $g$ 倍として作用させる直線である。階数は2。別に $\chi_D=2g+1+g^{-1}$ を [既約指標の直交性](#thm-mqfc20-character-orthogonality) に入れても

$$
\int_G \chi_D(g)g^{-1}\,dg
=\int_G(2+g^{-1}+g^{-2})\,dg=2.
$$

この例では代表の次元が1なので、射影の階数と重複度が一致する。一般の既約代表の次元が $d_\rho$ なら階数は $d_\rho m_\rho$ となる。
<!-- solution-end -->

### 演習 MQFC20-C1：一本の共有辺の積分

- Level: C

$G=SU(2)$ の標準表現を用いる。固定した $A,B\in SU(2)$ とHaar分布の群元 $U$ について次を示せ。

1. $\int\operatorname{tr}(AU)\,dU=0$。
2. $\int\operatorname{tr}(AU)\operatorname{tr}(U^{-1}B)\,dU=\operatorname{tr}(AB)/2$。
3. 規格化トレース $W_1=\operatorname{tr}(AU)/2,\ W_2=\operatorname{tr}(U^{-1}B)/2$ に対して $\int W_1W_2\,dU$ を求め、個別平均の積と比較せよ。

<!-- solution-start -->
**詳細解答**

標準表現は2次元既約で自明表現と非同値である。[行列要素の直交性](#thm-mqfc20-matrix-orthogonality) の異なる代表の場合に $\sigma=1$ を入れると各 $U_{ji}$ の平均が0となる。$\operatorname{tr}(AU)=\sum_{i,j}A_{ij}U_{ji}$ だから第1式が従う。

第2式では $U^{-1}=U^\dagger$ を代入し、

$$
\operatorname{tr}(U^{-1}B)=
\sum_{k,l}\overline{U_{lk}}B_{lk}.
$$

従って積分は

$$
\begin{aligned}
&\sum_{i,j,k,l} A_{ij} B_{lk}
  \int U_{ji}\overline{U_{lk}}\,dU\\
&=\frac12\sum_{i,j,k,l} A_{ij}B_{lk}
  \delta_{jl}\delta_{ik}\\
&=\frac12\sum_{i,j}A_{ij}B_{ji}
=\frac12\operatorname{tr}(AB).
\end{aligned}
$$

2番目の等号では [行列要素の直交性](#thm-mqfc20-matrix-orthogonality) の同じ表現の場合に $d_\rho=2$ を入れた。デルタによって $l=j,k=i$ と固定されるので行列の順序は $AB$ になる。

第3式では二つの規格化係数 $1/2$ が掛かるため

$$
\int W_1W_2\,dU=\frac18\operatorname{tr}(AB).
$$

各平均は第1式と [Haar積分の逆元変換](#prop-mqfc20-haar-transform) により零。例えば $A=B=I_2$ なら積の平均は $1/4$、平均の積は0となる。二つの閉路が共有する辺を積分する際は、この共有変数の相関を無視できない。行列要素の直交性は共有辺を消去し、残りの行列の積を結び付ける道具になる。
<!-- solution-end -->

## 8. 次の講義

基準測度を頂点の枠の取り替えと両立させ、表現の行列要素の積分を次元の逆数とデルタで計算できるようになった。次講 MQFC21 ではこの積Haar測度に格子作用の重みを掛けて Wilson 格子ゲージ測度を構成し、有限格子上の期待値を定義する。