# SG5 Ghirlanda–Guerra恒等式とultrametricity

[SG4のレプリカoverlap分布](../SG4/index.md#def-sg4-overlap-law)では、無秩序を共有するレプリカ同士の重なりが一つの数へ集中するとは限らないことを見た。二水準の模型は階層を想像する助けになるが、[SK模型のoverlap](../SG3/index.md#def-sg3-overlap)が本当に階層を作るかは別問題である。

鍵は、次の標本とすでに観測した標本との重なりが、過去の重なりからどのように決まるかを問うことである。Ghirlanda–Guerra（GG）恒等式は、その**条件付き分布の混合則**を厳密に与える。そこから有限段階の階層が現れる仕組みを証明し、さらに一般の極限を扱う深い構造定理へ進む。

ここで区別すべき論理は三つある。有限サイズのGaussian部分積分は正確な式であり、そこからGG恒等式を極限へ渡すにはエネルギー密度の自己平均化が必要である。また、**GG恒等式そのものと超距離性の結論は同じ式ではない**。後者には、overlap行列がGram行列であることを含む強い構造定理が働く。

## 1. overlap行列を確率的な対象として見る

整数 $N\ge1$ について $\Sigma_N=\{-1,+1\}^N$、レプリカ $\sigma^1,\sigma^2,\ldots$ を、無秩序を固定したGibbs測度から独立に抽出する。添字 $\ell\ne m$ のoverlapは

$$
R_{\ell m}^{(N)}=\frac1N\sum_{i=1}^N\sigma_i^\ell\sigma_i^m,
\qquad R_{\ell\ell}^{(N)}=1.
$$

レプリカ番号を有限個だけ入れ替えても同時分布は不変である。一方、各実現について任意の実数 $a_1,\ldots,a_n$ は

$$
\sum_{\ell,m=1}^n a_\ell a_m R_{\ell m}^{(N)}
=\frac1N\sum_{i=1}^N\left(\sum_{\ell=1}^n a_\ell\sigma_i^\ell\right)^2
\ge0
$$

を満たす。つまり有限サイズのoverlap行列は対称な**半正定値Gram行列**である。この性質は有限個の成分の分布極限でも保存される。

以下、$\mathbb E\langle\cdot\rangle$ は、同じ無秩序下で必要な個数のレプリカを引いたGibbs平均と、その後の無秩序平均を表す。極限配列を $R=(R_{\ell m})_{\ell,m\ge1}$ と記すとき、その期待値は単に $\mathbf E$ と書く。

## 2. Ghirlanda–Guerra恒等式は「新しい一人」の規則である

最初の $n$ 人のoverlapを全部知っているとして、$n+1$ 人目と1人目との重なりを考える。一部はもとの二人のoverlap分布から新たに選ばれ、一部は既知の重なりのどれかを再利用する、という混合則を記述したい。

<a id="def-sg5-gg"></a>

<!-- formal-statement-start -->
> **定義（Ghirlanda–Guerra恒等式）**  
> $0\le c\le1$ とする。$R_{\ell\ell}=c$ かつ $|R_{\ell m}|\le c$ を満たす無限対称確率配列 $R$ に対し（有限SKのoverlapなら $c=1$）、任意の整数 $n\ge2$、最初の $n$ 個のoverlapの有界Borel可測関数 $f$、$[-1,1]$ 上の有界Borel可測関数 $\psi$ について
>
$$
\begin{aligned}
\mathbf E\bigl[f\psi(R_{1,n+1})\bigr]
&=\frac1n\mathbf E[f]\,\mathbf E[\psi(R_{12})]\\
&\quad+\frac1n\sum_{\ell=2}^n
\mathbf E\bigl[f\psi(R_{1\ell})\bigr]
\end{aligned}
$$
>
> が成り立つとき、$R$ は**完全なGG恒等式**を満たすという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sg5-gg -->
### 最初の三人で混合係数を確認する

$n=2$ とすると、先の式は

$$
\mathbf E[f(R_{12})\psi(R_{13})]
=\frac12\mathbf E[f(R_{12})]\mathbf E[\psi(R_{12})]
+\frac12\mathbf E[f(R_{12})\psi(R_{12})]
$$

となる。**定義の確認**：$f\equiv1$ とすれば右辺は $\frac12\mathbf E\psi(R_{12})+\frac12\mathbf E\psi(R_{12})$ で、レプリカ交換可能性による左辺 $\mathbf E\psi(R_{13})$ と一致する。さらに $f(r)=\psi(r)=r$ なら

$$
\mathbf E[R_{12}R_{13}]
=\frac12(\mathbf ER_{12})^2+\frac12\mathbf E[R_{12}^2].
$$

この非自明な二次モーメント制約は、単なる「任意の対が同分布」という交換可能性からは出ない。
<!-- definition-example-end -->

<a id="prop-sg5-conditional-mixture"></a>

<!-- formal-statement-start -->
> **命題（新レプリカの条件付き混合則）**  
> $R$ が完全なGG恒等式を満たし、$\mu$ を $R_{12}$ の分布とする。最初の $n\ge2$ 人の重なり行列が生成する情報を $\mathcal F_n$ とすると、$R_{1,n+1}$ の $\mathcal F_n$ に関する条件付き分布は
>
$$
\frac1n\mu+\frac1n\sum_{\ell=2}^{n}\delta_{R_{1\ell}}
$$
>
> である。
<!-- formal-statement-end -->

### 証明の見取り図

恒等式は任意の有界関数 $f$ に対して成り立つ。$\psi$ を集合の指示関数にすれば、条件付き確率の定義そのものになる。

<!-- proof-start -->
### 証明

Borel集合 $A\subseteq[-1,1]$ を固定し、$\psi(r)=\mathbf1_A(r)$ を[GG恒等式](#def-sg5-gg)へ代入する。右辺は

$$
\mathbf E\left[
f\left\{\frac{\mu(A)}n+
\frac1n\sum_{\ell=2}^n\mathbf1_{\{R_{1\ell}\in A\}}\right\}
\right]
$$

となる。中括弧の中は $\mathcal F_n$ 可測かつ有界である。よって全ての有界 $\mathcal F_n$ 可測な $f$ について、$R_{1,n+1}\in A$ の指示関数と中括弧との積分が一致する。これが条件付き期待値の特徴付けである。各 $A$ に対して成立するから、主張の条件付き分布が得られる。
<!-- proof-end -->

例えば $\mu=\frac13\delta_0+\frac23\delta_{3/4}$、$R_{12}=3/4$ が観測されたなら、次の人の $R_{13}$ は、条件付きで

$$
\frac12\mu+\frac12\delta_{3/4}
=\frac16\delta_0+\frac56\delta_{3/4}
$$

に従う。**既存の値が再登場する確率が増える**。この「既知の値の再利用」が、階層の幾何を理解する手がかりとなる。ただし、混合則が指定するのは $R_{1,n+1}$ 一成分の条件付き法則であり、新レプリカの全overlapベクトルを各成分独立に発生させる規則ではない。

## 3. Gaussian部分積分がGG恒等式を生む箇所

混合則を最初から仮定するのではなく、[SG2の共分散付きGaussian部分積分](../SG2/index.md#prop-sg2-correlated-ibp)から導いてみる。

整数 $p\ge1$ ごとに独立な標準正規係数 $J_{i_1\ldots i_p}^{(p)}$ を用意し、補助Gaussian場を

$$
g_{N,p}(\sigma)
=N^{-(p-1)/2}\sum_{i_1,\ldots,i_p=1}^{N}
J_{i_1\ldots i_p}^{(p)}\sigma_{i_1}\cdots\sigma_{i_p}
$$

とする。重複添字も和に含める。異なる添字組の共分散が0なので

$$
\begin{aligned}
\mathbb E[g_{N,p}(\sigma)g_{N,p}(\tau)]
&=N^{-(p-1)}\sum_{i_1,\ldots,i_p}
\prod_{j=1}^p\sigma_{i_j}\tau_{i_j}\\
&=N^{-(p-1)}
\left(\sum_{i=1}^N\sigma_i\tau_i\right)^p
=N R(\sigma,\tau)^p.
\end{aligned}
$$

もとのSKの指数とは独立な補助場 $g_{N,p}$ を、強さ $a>0$ で指数へ加えてGibbs測度を定める。補助場だけに関するGaussian平均も $\mathbb E$ に含める。$f$ は初めの $n$ レプリカのoverlapの有界関数とする。

<a id="thm-sg5-gaussian-identity"></a>

<!-- formal-statement-start -->
> **定理（有限サイズのGaussian恒等式）**  
> $N,p\ge1$、$n\ge2$、$a>0$ とする。上記の補助場を $a g_{N,p}$ としてGibbs指数へ加え、残りの指数の乱数は $g_{N,p}$ と独立とする。このとき任意の有界 $f$ に対し
>
$$
\begin{aligned}
\frac1N\mathbb E\langle f g_{N,p}(\sigma^1)\rangle
&=a\,\mathbb E\Bigl\langle
f\left(1+\sum_{\ell=2}^n R_{1\ell}^{p}
-nR_{1,n+1}^{p}\right)\Bigr\rangle,\\
\frac1N\mathbb E\langle g_{N,p}(\sigma^1)\rangle
&=a\left(1-\mathbb E\langle R_{12}^{p}\rangle\right).
\end{aligned}
$$
<!-- formal-statement-end -->

### 証明の見取り図

共分散核が $NR^p$ であることを使い、補助場でGibbsの分子を微分する。**分子からは既存の $n$ 人、分母からは新しい $n+1$ 人目**が現れる。その係数が混合則の $1/n$ を作る。

<!-- proof-start -->
### 証明

固定した $g_{N,p}$ 以外の乱数とスピンに依存する因子を $W(\sigma)>0$ と書く。$n$ レプリカの重みは

$$
w_n(\sigma^1,\ldots,\sigma^n)
=f(R^n)\frac{\prod_{\ell=1}^n
W(\sigma^\ell)e^{a g_{N,p}(\sigma^\ell)}}{Z^n},
\quad
Z=\sum_{\tau\in\Sigma_N}W(\tau)e^{a g_{N,p}(\tau)}.
$$

各配置 $\tau$ に対応するGaussian座標で微分すると

$$
\frac{\partial w_n}{\partial g_{N,p}(\tau)}
=a\,w_n\left(
\sum_{\ell=1}^n\mathbf1_{\{\sigma^\ell=\tau\}}
-n\frac{W(\tau)e^{a g_{N,p}(\tau)}}Z\right).
$$

ここでは $f(R^n)$ が配置だけの関数なので、Gaussian座標に関する追加の微分項を持たない。有限次元の[Gaussian部分積分](../SG2/index.md#prop-sg2-correlated-ibp)を $g_{N,p}(\sigma^1)$ に適用し、その共分散 $NR(\sigma^1,\tau)^p$ を代入する。分子に由来する項は

$$
\frac{a}{N}\sum_{\ell=1}^n
\mathbb E\langle f\,N R_{1\ell}^{p}\rangle
=a\,\mathbb E\left\langle f\sum_{\ell=1}^nR_{1\ell}^p\right\rangle.
$$

分母に由来する項では、新たに同じGibbs分布から $\sigma^{n+1}$ を取ると

$$
-\frac{an}{N}\mathbb E\left\langle
f\,\sum_{\tau}\frac{W(\tau)e^{a g_{N,p}(\tau)}}Z
N R(\sigma^1,\tau)^p\right\rangle
=-an\,\mathbb E\langle fR_{1,n+1}^p\rangle.
$$

$R_{11}=1$ を分子の和へ代入して第1式を得る。$n=1$、$f\equiv1$ として同じ微分を行うと $a(1-\mathbb E\langle R_{12}^p\rangle)$ となり、第2式が従う。
<!-- proof-end -->

有限サイズではまだGG恒等式になっていない。余分な項は「補助エネルギーの一人分が全体平均からどれほどずれるか」である。

<a id="thm-sg5-self-averaging-gg"></a>

<!-- formal-statement-start -->
> **定理（自己平均化からGG恒等式へ）**  
> $p\ge1$、$a>0$ を固定し、上記の補助場を含むGibbs測度の列を考える。エネルギー密度の自己平均化条件
>
$$
\Delta_{N,p}:=
\mathbb E\left\langle
\left|
\frac{g_{N,p}(\sigma^1)}N-
\frac1N\mathbb E\langle g_{N,p}(\sigma^1)\rangle
\right|\right\rangle
\longrightarrow0
$$
>
> を仮定する。このとき任意の $n\ge2$ と有界 $f=f(R^n)$ について
>
$$
\begin{aligned}
&\mathbb E\langle fR_{1,n+1}^{p}\rangle
-\frac1n\mathbb E\langle f\rangle
\mathbb E\langle R_{12}^{p}\rangle\\
&\qquad-\frac1n\sum_{\ell=2}^n
\mathbb E\langle fR_{1\ell}^{p}\rangle
\longrightarrow0.
\end{aligned}
$$
>
> さらに全ての整数 $p\ge1$ に対し独立な $g_{N,p}$ を係数 $a_p>0$、$\sum_{p\ge1}a_p^2<\infty$ で**同じGibbs指数へ同時に導入**し、全ての $p$ について同じ部分列上で上記の自己平均化条件が成立して任意の固定個数のoverlap成分の同時分布が収束するなら、極限配列は完全なGG恒等式を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

[有限サイズのGaussian恒等式](#thm-sg5-gaussian-identity)を2通りに用い、一人のエネルギーの平均からの偏差を取り出す。最後の一般化では $r^p$ の恒等式を、多項式近似により連続な $\psi(r)$ へ広げる。

<!-- proof-start -->
### 証明

[有限サイズのGaussian恒等式](#thm-sg5-gaussian-identity)の第1式から、第2式に $\mathbb E\langle f\rangle$ を掛けた式を引く。$R_{11}=1$ の項が消えて

$$
\begin{aligned}
&\mathbb E\left\langle
f\left\{\frac{g_{N,p}(\sigma^1)}N
-\frac1N\mathbb E\langle g_{N,p}(\sigma^1)\rangle\right\}
\right\rangle\\
&=a\left\{
\sum_{\ell=2}^n\mathbb E\langle fR_{1\ell}^p\rangle
-n\mathbb E\langle fR_{1,n+1}^p\rangle
+\mathbb E\langle f\rangle\,\mathbb E\langle R_{12}^p\rangle
\right\}.
\end{aligned}
$$

左辺の絶対値は $\|f\|_\infty\Delta_{N,p}$ 以下であり、右辺の波括弧を $-an$ で割った誤差の絶対値は $\|f\|_\infty\Delta_{N,p}/(an)$ 以下になる。$a>0$ 固定で $\Delta_{N,p}\to0$ だから第1の結論が従う。

同じGibbs測度に関して全ての $p\ge1$ の恒等式が同じ部分列で成立するなら、定数 $\psi\equiv1$ の場合は自明なので、線形性により任意の多項式に拡張できる。

$[-1,1]$ 上の連続関数 $\psi$ は多項式で一様近似できる。近似誤差は両辺とも $\|\psi-\psi_m\|_\infty$ で抑えられるため、連続関数に対する恒等式を得る。

連続な $f,\psi$ に対し、固定個数のoverlap変数の同時分布の弱収束を用いて極限へ渡す。測度の一意性と単調族の議論で有界Borel可測な関数に拡張して[完全なGG恒等式](#def-sg5-gg)を得る。
<!-- proof-end -->

**重要な条件の境界**：ここで証明したのは「自己平均化**ならば**GG」であり、元のSK模型のすべての温度で、摂動なしに上の $\Delta_{N,p}\to0$ が成り立つと主張してはいない。また $p=2$ だけでは $R^2$ に対する式しか得られない。偶数 $p$ しか制御しなければ $R$ の符号を識別できない。十分小さいgeneric Gaussian摂動を導入し、自由エネルギーの凸性・集中性から必要な自己平均化を得るのが、研究上の典型的な接続方法である。微小摂動の取り方と極限順序は別途検証が必要になる。

## 4. ultrametricityは三角形の「弱い二辺」を揃える

[SG4の二水準overlap模型](../SG4/index.md#def-sg4-two-level-rsb)では「同じグループか」という構造を手で与えた。一般のoverlapでも、距離 $d_{\ell m}=q_*-R_{\ell m}$ に対応する三角形が、通常の距離より強い制約を満たすかを調べる。

<a id="def-sg5-ultrametric"></a>

<!-- formal-statement-start -->
> **定義（overlapの超距離性）**  
> 対称な配列 $R$ がほとんど確実に全ての相異なる三添字 $i,j,k$ について
>
$$
R_{jk}\ge\min(R_{ij},R_{ik})
$$
>
> を満たすとき、$R$ は **ultrametric（超距離的）** であるという。$R_{ij}\le q_*$、$R_{ii}=q_*$ となる配列では $d_{ij}=q_*-R_{ij}$ と置くと、これは
>
$$
d_{jk}\le\max(d_{ij},d_{ik})
$$
>
> と同値である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sg5-ultrametric -->
### 三人で条件を直接確認する

$R_{12}=3/4$、$R_{13}=1/4$、$R_{23}=1/4$ とすれば三つの不等式は順に $1/4\ge\min(3/4,1/4)$、$1/4\ge\min(3/4,1/4)$、$3/4\ge\min(1/4,1/4)$ で成り立つ。**定義の確認**：いずれも右辺との比較を直接行った。反対に $(R_{12},R_{13},R_{23})=(3/4,3/4,1/4)$ は $R_{23}<\min(R_{12},R_{13})$ で失敗する。これは値の組の検査であって、いずれの三角形も無限交換可能Gram配列として実現可能だと主張するものではない。
<!-- definition-example-end -->

<a id="prop-sg5-threshold-partitions"></a>

<!-- formal-statement-start -->
> **命題（閾値ごとの階層的同値関係）**  
> $R_{ii}=q_*$、$R_{ij}\le q_*$ で、対称な配列 $R$ がultrametricであるとする。任意の実数 $q\le q_*$ について
>
$$
i\sim_q j\quad\Longleftrightarrow\quad R_{ij}\ge q
$$
>
> は同値関係である。また $q<q'$ なら、$\sim_{q'}$ の各同値類は $\sim_q$ のいずれかの同値類に含まれる。
<!-- formal-statement-end -->

### 証明の見取り図

高い閾値ほど「近い」と判定される組が減る。推移律がまさにultrametric不等式である。

<!-- proof-start -->
### 証明

$R_{ii}=q_*\ge q$ なので反射律が成立する。$R_{ij}=R_{ji}$ より対称律が成立する。$i\sim_q j$ かつ $j\sim_q k$ なら、[ultrametricの定義](#def-sg5-ultrametric)で添字を入れ替えると

$$
R_{ik}\ge\min(R_{ij},R_{jk})\ge q
$$

であり、$i\sim_q k$ となる。従って同値関係である。$q<q'$ で $R_{ij}\ge q'$ なら $R_{ij}\ge q$ でもあるので、$\sim_{q'}$ の同値類内の全員は $\sim_q$ でも同値であり、包含関係が従う。
<!-- proof-end -->

この命題が「階層」の数学的意味である。二段のグループ分けを恣意的に絵にしたのではなく、overlapの大きさで切る**どの閾値**でも矛盾しない入れ子の分割になる。

## 5. GG恒等式から最上位の階層を証明する

一般の定理の難しさを見るため、まず重なりが二つの値しか取らない場合を出発点から証明する。

乱数である確率測度 $G$ が可分実Hilbert空間 $H$ の単位球上にあり、$G$ を固定して $\sigma^1,\sigma^2,\ldots$ を独立同分布に抽出する。異なる添字のoverlapを $R_{ij}=\sigma^i\cdot\sigma^j$、対角を $R_{ii}=1$ とする。この表現では条件付き独立性を明示している。有限SKのoverlap行列をこの形で有限$N$ の各Gibbs測度から構成すること自体はできるが、極限で同じ表現が保たれることには別の表現定理が関係する。

<a id="thm-sg5-top-overlap"></a>

<!-- formal-statement-start -->
> **定理（最大overlapの原子と最上位クラス）**  
> 上記のランダム測度 $G$ から得た無限配列が完全なGG恒等式を満たすとする。相異なるレプリカのoverlapの法則が有限集合に値を取り、その最大値 $q_*>0$ の確率 $p_*=\mathbf P(R_{12}=q_*)$ が正とする。このときほとんど確実に $G$ はノルム $\sqrt{q_*}$ の球面上の高々可算個の原子に集中し、
>
$$
R_{ij}=q_*\quad\Longleftrightarrow\quad\sigma^i=\sigma^j
\qquad(i\ne j)
$$
>
> が成り立つ。したがって $R_{12}=q_*$ かつ $R_{13}=q_*$ なら $R_{23}=q_*$ である。
<!-- formal-statement-end -->

### 証明の見取り図

第一に、取り得る最大の内積が $q_*$ なら、Gibbs測度が置く点のノルムは $\sqrt{q_*}$ 以下である。

第二に、GG混合則から、どのレプリカも最大内積を持つ相手をいつか見つける。

第三に、Cauchy–Schwarzの等号条件により、その相手は同じ球面上の同一点である。

<!-- proof-start -->
### 証明

**第1段階：$G$ が置く点のノルムを抑える。** $G$ の実現を固定し、$G$ の台の点 $v$ が $\|v\|^2>q_*$ を満たしたと仮定する。内積の連続性から $v$ の十分小さい開球 $B(v,\varepsilon)$ の任意の $u,w$ は $u\cdot w>q_*$ を満たす。台の定義により $G(B(v,\varepsilon))>0$ なので、二つの独立標本がともにこの球へ入る確率はその二乗で正となる。これは相異なる標本の内積が最大 $q_*$ 以下という仮定に反する。従って $G$ は閉球 $\{\|v\|^2\le q_*\}$ に集中する。

**第2段階：最大overlapを持つ相手の存在。** $A_n$ を「$\sigma^1$ と $\sigma^2,\ldots,\sigma^n$ の全てのoverlapが $q_*$ 未満」の事象とする。$f=\mathbf1_{A_n}$、$\psi(r)=\mathbf1_{\{r=q_*\}}$ を[GG恒等式](#def-sg5-gg)へ代入すると、既存の各項は $A_n$ 上で消えるため

$$
\mathbf P(A_n,\ R_{1,n+1}=q_*)
=\frac{p_*}{n}\mathbf P(A_n).
$$

$A_{n+1}$ は $A_n$ からこの事象を除いたものなので

$$
\mathbf P(A_{n+1})=\left(1-\frac{p_*}{n}\right)\mathbf P(A_n),
\qquad
\mathbf P(A_2)=1-p_*.
$$

したがって帰納的に

$$
\mathbf P(A_n)=\prod_{k=1}^{n-1}\left(1-\frac{p_*}{k}\right)
\le\exp\left(-p_*\sum_{k=1}^{n-1}\frac1k\right)
\longrightarrow0.
$$

最後は $1-x\le e^{-x}$ と調和級数の発散を用いた。$A_n$ は減少事象であるから、確率1で最初のレプリカには最大overlapを持つ後続レプリカが存在する。

**第3段階：原子性と球面性。** 第1段階と[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)より

$$
\sigma^1\cdot\sigma^j=q_*
\le\|\sigma^1\|\,\|\sigma^j\|\le q_*.
$$

等号が全て成立するので、両ノルムは $\sqrt{q_*}$、両ベクトルは同方向で同じノルムを持ち、$\sigma^1=\sigma^j$ である。条件付き独立な後続標本が $\sigma^1$ と一致する確率が正でないと、そのような標本は確率1で一度も現れない。従って上で示した出現確率1から、$G(\{\sigma^1\})>0$ がほとんど確実に従う。

よって $G$ から選んだ点はほとんど確実に原子であり、その原子のノルムは $\sqrt{q_*}$。正の重みを持つ原子は高々可算個なので $G$ はその可算集合に集中する。逆に同じ原子なら内積はそのノルムの二乗 $q_*$ である。最後に $R_{12}=R_{13}=q_*$ なら $\sigma^1=\sigma^2=\sigma^3$ より $R_{23}=q_*$ となる。
<!-- proof-end -->

<a id="cor-sg5-two-overlap"></a>

<!-- formal-statement-start -->
> **系（二値overlapのultrametricity）**  
> [最大overlapの原子と最上位クラス](#thm-sg5-top-overlap)の仮定の下、相異なるレプリカのoverlapが二値 $q_0<q_1$ だけを取るなら、配列 $R$ はultrametricである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$q_*=q_1$ と置く。三角形に $q_1$ の辺が0本または1本なら、いずれの辺についても他の二辺の最小値を下回らない。もし2本が $q_1$ なら[最大overlapの原子と最上位クラス](#thm-sg5-top-overlap)により残りも $q_1$ となる。これらが二値の場合の全ての組合せである。
<!-- proof-end -->

## 6. 一般のultrametricity定理と証明上の境界

二値の場合の証明は、最上位のoverlapが同じ原子を意味することを利用した。三値以上では、最上位の原子同士が異なる場合にも中間閾値で群分けできるかをさらに証明する必要がある。これは上の二値系だけからは従わない。

<a id="thm-sg5-panchenko"></a>

<!-- formal-statement-start -->
> **定理（Panchenkoのultrametricity定理）**  
> 可分実Hilbert空間の単位球上のランダム確率測度 $G$ から、$G$ を固定して独立同分布に取った点列 $\sigma^1,\sigma^2,\ldots$ を考える。相異なる添字のoverlap $R_{ij}=\sigma^i\cdot\sigma^j$ の無限配列が**完全なGG恒等式**を満たすなら、ほとんど確実に全ての相異なる $i,j,k$ について
>
$$
R_{jk}\ge\min(R_{ij},R_{ik})
$$
>
> が成立する。
<!-- formal-statement-end -->

この研究級定理はD. Panchenko, *The Parisi ultrametricity conjecture*, Annals of Mathematics **177** (2013), 383–393, [原論文](https://annals.math.princeton.edu/2013/177-1/p08) による。原論文の完全証明では、[Ghirlanda–Guerra恒等式](#def-sg5-gg)から導かれる測度の不変性・複製構成とGram幾何が組み合わされる。ここでの[最大overlapの原子と最上位クラス](#thm-sg5-top-overlap)は二値の場合を完全に閉じた証明であるが、**それを一般のPanchenko定理の完全証明と取り違えない**。一般定理の原論文の証明は独立の研究級論証である。

### 有限個のoverlap値の場合：階層の帰納法

一般の定理の証明を展開する前に、値が $q_1<\cdots<q_k$ の有限個に限られる場合には、帰納法の全体を見通せる。ここでは一つだけ外部の確率表現定理を明示的に使用する。

**使用する表現定理（Dovbysh–Sudakov）**：対称・半正定値・弱交換可能な無限確率配列 $Q$ で対角が定数 $c$ なら、ある可分Hilbert空間 $H'$ 上のランダム確率測度から条件付き独立同分布に選んだ $(v_i,b_i)$ に対し、

$$
Q_{ij}\ \stackrel d=\ v_i\cdot v_j+b_i\mathbf1_{\{i=j\}},\qquad b_i\ge0
$$

と表せる。この表現定理自体の証明はここでは引用する。重要なのは、$Q$ に条件付き独立標本を再導入できることである。以下の帰納法の残りはGG恒等式とGram行列の計算で直接追える。

最上位の値を $q_k$、その出現確率を $p_k>0$ とする。[最大overlapの原子と最上位クラス](#thm-sg5-top-overlap)より、元のランダム測度 $G$ の標本で $R_{ij}=q_k$ となることは、二点が同じ原子であることと同値である。

ここで**対角の扱いを区別する**。元の配列は $R_{ii}=1$ と約束したが、実際の内積で全成分を定めた $T_{ij}=\sigma^i\cdot\sigma^j$ は、上の定理によって $T_{ii}=\|\sigma^i\|^2=q_k$ をほとんど確実に満たす。相異なる添字では $T_{ij}=R_{ij}$ である。以下で条件付き分布から構成するGram行列には $T$ を使う。$R$ の対角成分1を、理由なく $q_k$ に置き換えるわけではない。

最初の $n$ 個の原子が**互いに異なる**事象を

$$
B_n=\{R_{ij}<q_k\text{ for all }1\le i<j\le n\}
$$

とする。$B_n$ 上で第 $n+1$ レプリカがどれか既存の原子と一致する事象は互いに排反である。[GG恒等式](#def-sg5-gg)を各 $\ell\le n$ に適用して $\psi(r)=\mathbf1_{\{r=q_k\}}$ と置くと、有界な $f=f(R^n)$ に対し

$$
\mathbf E\left[f\mathbf1_{B_n}\mathbf1_{\{R_{\ell,n+1}=q_k\}}\right]
=\frac{p_k}{n}\mathbf E[f\mathbf1_{B_n}].
$$

実際、和に現れる $\mathbf1_{\{R_{\ell j}=q_k\}}$ は $B_n$ 上で全て0になる。従って $n$ 個の排反事象を足すと

$$
\mathbf E[f\mathbf1_{B_{n+1}}]
=(1-p_k)\mathbf E[f\mathbf1_{B_n}],
\qquad
\mathbf P(B_n)=(1-p_k)^{n-1}.
$$

ここでは $0<p_k<1$ とする。$p_k=1$ なら全ての異なるレプリカのoverlapが同じ値なのでultrametric性はすでに成立する。

$\mathbf P_n^*$ を、$B_n$ で条件付けた $n$ 次の $T$ 行列の分布とする。直前の確率式を用いると、次の周辺分布の一貫性が得られる。

$$
\mathcal L\left((T_{ij})_{1\le i,j\le n}\mid B_{n+1}\right)
=\mathbf P_n^*.
$$

これを確認するには、任意の有界な初めの $n$ 人の関数を直前の期待値式の $f$ に代入し、両辺を $\mathbf P(B_{n+1})$ で割ればよい。

対角 $T_{ii}=q_k$ は確定しており、非対角では $T_{ij}=R_{ij}$ である。可算個の有界座標の有限次元分布が周辺化と整合すれば、それらを周辺分布にもつ確率配列が存在する。この確率測度の拡張を適用して、無限配列 $Q$ を得る。

$B_n$ は添字の置換で不変であり、各条件付き $T$ 行列はHilbert内積のGram行列である。従って $Q$ は弱交換可能で半正定値であり、対角は $q_k$、非対角は $q_1,\ldots,q_{k-1}$ に値を取る。

次に、$Q$ 自身もGG恒等式を満たすことを確認する。$f$ は最初の $n$ 成分に依存するとし、$\psi$ は有界関数とする。$B_n$ 上で既存の $\ell$ と新しい点が一致すると、$R_{1,n+1}=R_{1\ell}$ となる。$\ell=1$ の場合だけ値は $q_k$ である。そこで

$$
\begin{aligned}
&\mathbf E[f\psi(R_{1,n+1})\mathbf1_{B_{n+1}}]\\
&=\mathbf E[f\psi(R_{1,n+1})\mathbf1_{B_n}]\\
&\quad-\frac{p_k}{n}
\mathbf E\left[f\mathbf1_{B_n}
\left\{\psi(q_k)+\sum_{\ell=2}^n\psi(R_{1\ell})\right\}\right].
\end{aligned}
$$

最初の右辺に元の[GG恒等式](#def-sg5-gg)を代入し、同類項をまとめると

$$
\begin{aligned}
&\mathbf E[f\psi(R_{1,n+1})\mathbf1_{B_{n+1}}]\\
&=\frac1n\mathbf E[f\mathbf1_{B_n}]
\{\mathbf E\psi(R_{12})-p_k\psi(q_k)\}\\
&\quad+\frac{1-p_k}{n}
\sum_{\ell=2}^n\mathbf E[f\psi(R_{1\ell})\mathbf1_{B_n}].
\end{aligned}
$$

両辺を $(1-p_k)\mathbf P(B_n)$ で割る。すると

$$
\begin{aligned}
\mathbf E_Q[f\psi(Q_{1,n+1})]
&=\frac1n\mathbf E_Q[f]\,
\mathbf E_Q[\psi(Q_{12})]\\
&\quad+\frac1n\sum_{\ell=2}^n
\mathbf E_Q[f\psi(Q_{1\ell})]
\end{aligned}
$$

が得られる。実際、二つのレプリカが異なる原子に属するという条件付けから

$$
\mathbf E_Q\psi(Q_{12})
=\frac{\mathbf E\psi(R_{12})-p_k\psi(q_k)}{1-p_k}
$$

となる。

残る問題は、$Q$ の**対角がまだ $q_k$** なのに、非対角の最大値が $q_{k-1}$ へ下がった点である。ここに先ほどのDovbysh–Sudakov表現を適用する。$Q_{ij}=v_i\cdot v_j$（$i\ne j$）の標本表現が得られ、[最大overlapの原子定理の第1段階](#thm-sg5-top-overlap)と同じ開球の議論によって

$$
\|v_i\|^2\le q_{k-1}\quad\text{ほとんど確実に}
$$

が従う。特に $q_{k-1}\ge0$ でなければならない。$q_{k-1}=0$ なら $v_i=0$ がほとんど確実で、$Q$ の非対角値はすべて0となり、すでに超距離的である。以下、$q_{k-1}>0$ とする。このとき対角だけを $q_{k-1}$ へ置き換えた配列 $\widetilde Q$ は、有限個の係数 $a_i$ について

$$
\begin{aligned}
\sum_{i,j}a_i a_j\widetilde Q_{ij}
&=\left\|\sum_i a_i v_i\right\|^2
+\sum_i a_i^2\{q_{k-1}-\|v_i\|^2\}\\
&\ge0
\end{aligned}
$$

なので半正定値である。非対角値とそのGG恒等式は変更されない。従って、$k-1$ 種類の値に対する同じ主張を帰納法の仮定として用いれば、$B_3$ 上の三角形は超距離的である。

$B_3$ の外では、少なくとも二点が同じ原子である。この二点と第三点との重なりは等しいので、やはり三角形は超距離的になる。以上で有限値の場合の帰納法が閉じる。

**証明の境界**：この帰納法ではDovbysh–Sudakov表現定理を外部結果として使った。さらに連続的なoverlap値の場合は「最大原子を取り除く」操作を有限回繰り返せないため、これだけで一般の[Panchenko定理](#thm-sg5-panchenko)を証明したことにはならない。一般の場合の証明には同論文の不変性原理と複製構成が必要になる。

ここまでの論理をまとめると、Gaussian部分積分と適切な自己平均化からGG恒等式へ進み、Hilbert空間上の極限overlapについて[GG恒等式](#def-sg5-gg)が成立すれば、[Panchenkoのultrametricity定理](#thm-sg5-panchenko)で階層性が従う。**有限サイズのSK模型がそのままultrametricだという主張ではない**。階層の各節点へどの確率重みが乗るか、極限圧力がどの変分汎関数で決まるかは、次のRuelle確率カスケードとParisi変分原理で扱う。

## 演習問題

### Level A：定義と一段階の計算

**SG5-A1（GG恒等式の三人の場合）**
- Level: A

完全なGG恒等式を満たす配列について $m=\mathbf E R_{12}$、$s=\mathbf E R_{12}^2$ とする。$\mathbf E(R_{12}R_{13})$ を求め、$m=0,s=1/4$ の値を計算せよ。

<!-- solution-start -->
**詳細解答**

[GG恒等式](#def-sg5-gg)へ $n=2$、$f(R^2)=R_{12}$、$\psi(r)=r$ を代入する。右辺第1項は $(\mathbf ER_{12})^2/2=m^2/2$、第2項は $\mathbf ER_{12}^2/2=s/2$。従って

$$
\mathbf E(R_{12}R_{13})=\frac{m^2+s}{2}.
$$

指定された値では $(0+1/4)/2=1/8$ である。独立な二対の積なら $m^2=0$ となるため、GG配列の異なるoverlapを無条件で独立とみなしてはならない。
<!-- solution-end -->

**SG5-A2（条件付き混合則）**
- Level: A

$R_{12}=q_0$、$R_{13}=q_1$ を観測した $n=3$ の場合に、$R_{14}$ の条件付き法則を $\mu$ と原子測度で表し、その質量が1であることを確認せよ。

<!-- solution-start -->
**詳細解答**

[条件付き混合則](#prop-sg5-conditional-mixture)で $n=3$ と置くと

$$
\mathcal L(R_{14}\mid\mathcal F_3)
=\frac13\mu+\frac13\delta_{q_0}+\frac13\delta_{q_1}.
$$

それぞれの測度の全質量は1なので、全質量は $1/3+1/3+1/3=1$。ここで $q_0=q_1$ なら追加された二つの原子測度の寄与は合算して $2/3$ となる（$\mu$ 自体にもその点の質量があれば別途 $\mu(\{q_0\})/3$ が加わる）。
<!-- solution-end -->

**SG5-A3（Gaussian場の共分散）**
- Level: A

$p=2,N=2$ の補助Gaussian場を定義式から書き下し、$\sigma=(1,1)$、$\tau=(1,-1)$ に対する共分散を直接計算せよ。

<!-- solution-start -->
**詳細解答**

定義より

$$
g_{2,2}(\sigma)=\frac1{\sqrt2}
\left(J_{11}\sigma_1^2+J_{12}\sigma_1\sigma_2+
J_{21}\sigma_2\sigma_1+J_{22}\sigma_2^2\right).
$$

$\sigma=(1,1)$ では全係数が $+1$、$\tau=(1,-1)$ では $J_{11},J_{22}$ は $+1$、$J_{12},J_{21}$ は $-1$ である。独立標準正規変数の共分散は同じ添字で1、異なれば0なので

$$
\mathbb E[g_{2,2}(\sigma)g_{2,2}(\tau)]
=\frac12(1-1-1+1)=0.
$$

一方 $R(\sigma,\tau)=(1-1)/2=0$ だから、一般式 $N R^2=2\cdot0^2=0$ と一致する。
<!-- solution-end -->

**SG5-A4（ultrametric三角形）**
- Level: A

三辺のoverlapが $(R_{12},R_{13},R_{23})=(a,b,c)$ で $a>b>c$ とする。ultrametric条件が失敗する向きを具体的に示せ。$(a,b,c)=(3/4,1/4,1/4)$ は満たすか。

<!-- solution-start -->
**詳細解答**

$b>c$ かつ $a>b$ なので $\min(R_{12},R_{13})=\min(a,b)=b$。従って $R_{23}=c<b$ となり、[ultrametricの定義](#def-sg5-ultrametric)の $R_{23}\ge\min(R_{12},R_{13})$ が破れる。後者は $R_{12}=3/4$、$R_{13}=R_{23}=1/4$ なので、残りの各辺についても最小値を比較すると $1/4\ge1/4$、$3/4\ge1/4$ が成立する。
<!-- solution-end -->

### Level B：仮定と証明機構を接続する

**SG5-B1（自己平均化誤差の明示）**
- Level: B

[自己平均化定理](#thm-sg5-self-averaging-gg)の仮定の下で $\|f\|_\infty\le M$ とする。有限$N$のGG式の残差の絶対値を $\Delta_{N,p},a,n$ で上から抑えよ。$a=a_N\downarrow0$ とするとき、どの条件を別に確認する必要があるか。

<!-- solution-start -->
**詳細解答**

[有限サイズのGaussian恒等式](#thm-sg5-gaussian-identity)を第3節と同様に引き算し、残差を $D_{N,p,n}(f)$ と書けば

$$
-anD_{N,p,n}(f)
=\mathbb E\left\langle
f\left(\frac{g_{N,p}(\sigma^1)}N
-\frac1N\mathbb E\langle g_{N,p}(\sigma^1)\rangle\right)
\right\rangle.
$$

絶対値を取り、$|f|\le M$ を使えば

$$
|D_{N,p,n}(f)|\le\frac{M\Delta_{N,p}}{an}.
$$

$a_N\downarrow0$ の場合、$\Delta_{N,p}\to0$ だけでは不十分であり、少なくとも $\Delta_{N,p}/a_N\to0$ が必要である。補助摂動の大きさと自己平均化誤差の相対的な速さを確認する必要がある。
<!-- solution-end -->

**SG5-B2（閾値の同値類）**
- Level: B

$R_{ii}=1$ とし、異なる点は同じ小集団内で $3/4$、別の小集団だが同じ大集団内で $1/2$、別の大集団間で $0$ のoverlapを持つとする。任意の三人についてultrametric条件を確認し、閾値 $q=2/3$ と $q=1/4$ の同値類を記述せよ。

<!-- solution-start -->
**詳細解答**

三人が同じ小集団なら三辺は全て $3/4$。同じ大集団で二人のみ同じ小集団なら三辺は $(3/4,1/2,1/2)$、全員異なる小集団なら $(1/2,1/2,1/2)$。別の大集団を含む場合、三辺は $(3/4,0,0)$、$(1/2,0,0)$、または $(0,0,0)$ のいずれかになる。いずれも最小の値が少なくとも二本の辺に現れ、[ultrametricの定義](#def-sg5-ultrametric)を満たす。

$q=2/3$ では $R_{ij}\ge2/3$ となるのは同じ小集団の二人のみだから、同値類は小集団である。$q=1/4$ では $1/2\ge1/4$ だが $0<1/4$ なので、同値類は大集団となる。[閾値分割命題](#prop-sg5-threshold-partitions)どおり、小集団が大集団に包含される。
<!-- solution-end -->

**SG5-B3（最大overlapを避け続ける確率）**
- Level: B

完全なGG恒等式の下で $p_*=\mathbf P(R_{12}=q_*)=1/2$ とする。$A_n=\{R_{1j}<q_*,\,2\le j\le n\}$ に対して $\mathbf P(A_3),\mathbf P(A_4)$ を求め、$\mathbf P(A_n)\to0$ の理由を説明せよ。

<!-- solution-start -->
**詳細解答**

[最大overlapの原子定理の証明](#thm-sg5-top-overlap)で導いた再帰式より $\mathbf P(A_2)=1-p_*=1/2$ である。$n=2$ の式を使い

$$
\mathbf P(A_3)=\left(1-\frac{1/2}{2}\right)\frac12
=\frac34\cdot\frac12=\frac38.
$$

次に $n=3$ として

$$
\mathbf P(A_4)=\left(1-\frac{1/2}{3}\right)\frac38
=\frac56\cdot\frac38=\frac5{16}.
$$

一般には $\mathbf P(A_n)=\prod_{k=1}^{n-1}(1-1/(2k))$。$1-x\le e^{-x}$ から

$$
\mathbf P(A_n)\le\exp\left(-\frac12\sum_{k=1}^{n-1}\frac1k\right)
\longrightarrow0
$$

となる。最大overlapを持つ相手を無限に避け続ける確率は0である。
<!-- solution-end -->

### Level C：Gaussian部分積分から階層までを再構成する

**SG5-C1（Gaussian部分積分・GG・ultrametricityの論理）**
- Level: C

(a) 共分散が $N R(\sigma,\tau)^p$ の独立Gaussian補助場を強さ $a>0$ でGibbs指数に加える。$n$ レプリカの有界関数 $f$ を用いて、[Gaussian部分積分](../../../解析系/HDP/HDP5/index.md#lem-hdp5-gaussian-ibp)から $\mathbb E\langle f g_{N,p}(\sigma^1)/N\rangle$ をoverlapで表せ。

(b) エネルギー密度の自己平均化が成立するとき、$n=2,p=2$ のGG式を導け。

(c) 完全なGG恒等式が成立するランダムHilbert測度でoverlapが二値 $q_0<q_1$、$\mathbf P(R_{12}=q_1)>0$ なら、なぜultrametricか証明せよ。

(d) (b)のみで一般のSK模型のultrametricityを結論できるか答えよ。

<!-- solution-start -->
**詳細解答**

(a) $g=g_{N,p}$、$W(\sigma)>0$ を補助場と独立な残りのGibbs重みとおき、$n$ レプリカの重みと一人のGibbs確率をそれぞれ

$$
\begin{aligned}
w_n&=f(R^n)\frac{\prod_{\ell=1}^nW(\sigma^\ell)e^{ag(\sigma^\ell)}}{Z^n},\\
\pi(\tau)&=\frac{W(\tau)e^{ag(\tau)}}{Z}
\end{aligned}
$$

とおく。$f$ は配置の関数でGaussian場に直接依存しないので、積と商を微分すると

$$
\frac{\partial w_n}{\partial g(\tau)}
=a w_n\left\{\sum_{\ell=1}^n\mathbf1_{\{\sigma^\ell=\tau\}}-n\pi(\tau)\right\}.
$$

[Gaussian部分積分](../../../解析系/HDP/HDP5/index.md#lem-hdp5-gaussian-ibp)を共分散 $\mathbb E[g(\sigma^1)g(\tau)]=NR(\sigma^1,\tau)^p$ で適用する。和の第1項から $a\sum_{\ell=1}^n\mathbb E\langle fR_{1\ell}^p\rangle$ が出る。第2項では $\sum_\tau\pi(\tau)R(\sigma^1,\tau)^p$ を独立な追加レプリカによる平均に書き換えるので、$-an\mathbb E\langle fR_{1,n+1}^p\rangle$ となる。$R_{11}=1$ を代入して

$$
\frac1N\mathbb E\langle fg_{N,p}(\sigma^1)\rangle
=a\left\{\mathbb E\langle f\rangle+
\sum_{\ell=2}^n\mathbb E\langle f R_{1\ell}^p\rangle
-n\mathbb E\langle fR_{1,n+1}^p\rangle\right\}.
$$

(b) $f\equiv1,n=1$ の同じ式は $a(1-\mathbb E\langle R_{12}^p\rangle)$。これに $\mathbb E\langle f\rangle$ を掛けて(a)から引く。自己平均化の誤差が消えるとき、$n=2,p=2$ では

$$
\lim_{N\to\infty}\left\{
\mathbb E\langle fR_{13}^2\rangle
-\frac12\mathbb E\langle f\rangle\mathbb E\langle R_{12}^2\rangle
-\frac12\mathbb E\langle fR_{12}^2\rangle
\right\}=0.
$$

(c) $G$ を固定した独立な二点の内積の平均は

$$
\mathbf E[R_{12}\mid G]=\left\|\int_H v\,G(dv)\right\|^2\ge0
$$

である。二値 $q_0<q_1$ がともに正の確率で現れるなら、$q_1\le0$ は上の非負性に反する。従って最大値 $q_1$ は正である。

そこで $q_*=q_1$ と置き、[最大overlapの原子と最上位クラス](#thm-sg5-top-overlap)を適用する。$R_{12}=q_1$ は $\sigma^1=\sigma^2$ と同値だから、三角形のうち二辺が $q_1$ なら残りも $q_1$ となる。

最大値の辺が0本または1本なら、最小の値が少なくとも二辺に現れる。この二つの場合も含め、すべての三角形でultrametric不等式が成立する。

(d) **結論できない**。(b) は $R^2$ に対する一つの恒等式であり、完全なGG恒等式ではない。加えて(c)は二値分布とHilbert測度表示を仮定している。一般のSK極限にはこれらの仮定の確保と、二値制限を外した[Panchenko定理](#thm-sg5-panchenko)が必要になる。有限サイズのoverlap行列にも、そのまま超距離性を宣言することはできない。
<!-- solution-end -->

## 参考文献

- D. Panchenko (2013), [The Parisi ultrametricity conjecture](https://annals.math.princeton.edu/2013/177-1/p08), *Annals of Mathematics*, 177, 383–393.
- D. Panchenko (2011), [Ghirlanda–Guerra identities and ultrametricity: An elementary proof in the discrete case](https://www.numdam.org/articles/10.1016/j.crma.2011.06.021/), *Comptes Rendus Mathématique*, 349, 813–816.
