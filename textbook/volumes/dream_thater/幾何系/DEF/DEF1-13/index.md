# DEF1-13 Hodge構造の変動と周期写像

## 1. コホモロジーは平坦なのに、型はなぜ動くのか

前章の[Gauss–Manin接続](../DEF1-12/index.md#def-def1-12-gauss-manin)は、固有な滑らかな族のコホモロジー群を局所的に同一視した。この同一視では平行な類は一定である。しかし楕円曲線

$$
E_\tau=\mathbb C/(\mathbb Z+\tau\mathbb Z),\qquad \operatorname{Im}\tau>0
$$

の平坦な実座標 $x,y$ に対して、正則形式の類は

$$
[dz_\tau]=[dx]+\tau[dy]
$$

と動く。ここで $[dx],[dy]$ は平坦だが、$\mathbb C[dz_\tau]$ は一般に平坦でない。「平坦な空間の中で、複素構造が選び出す部分空間がどう動くか」が今回の問いである。

固定ファイバーの[純Hodge構造](../../HOD/HOD1-15/index.md#def-hod1-15-pure-hodge)と[Hodgeフィルトレーション](../../HOD/HOD1-15/index.md#def-hod1-15-filtration)は既習である。これらをファイバーごとに組み立て、部分空間の動きを記録する写像を作り、その微分が一段しかHodgeフィルトレーションを下げないことを証明する。

本章を通じ、$B$ を連結な複素多様体、$\pi:\mathcal X\to B$ を全射・固有な正則沈め込みとし、ファイバー $X_b$ を連結で境界のないコンパクトKähler多様体（複素次元 $n$）と仮定する。必要に応じ $B$ を小さくし、ファイバー上でKählerとなる滑らかな相対 $(1,1)$ 形式を選べるものとする。これは一様な解析的議論をするための局所仮定である。整数 $0\le k\le2n$ を固定する。

「全空間が射影的」「有理な偏極がある」という強い条件は、ここでは仮定しない。偏極付きの周期領域を考える箇所でのみ追加する。

## 2. Hodgeフィルトレーションを束にする

[Gauss–Manin接続の平坦性](../DEF1-12/index.md#thm-def1-12-flatness)から得られる局所系を

$$
\mathscr L^k_{\mathbb Q}=R^k\pi_*\underline{\mathbb Q},\qquad
\mathcal H^k_{\mathcal O}=\mathscr L^k_{\mathbb Q}\otimes_{\underline{\mathbb Q}_B}\mathcal O_B
$$

と書く。$\mathcal O_B$ は正則関数の層であり、局所的な平坦基底に正則係数を掛けて得る正則ベクトル束である。この正則構造では $\nabla^{\mathrm{GM}}$ の $(0,1)$ 成分が $\bar\partial$ と一致する。

各 $b$ で[コンパクトKähler多様体のHodge分解](../../HOD/HOD1-06/index.md#thm-hod1-06-hodge-decomposition)により

$$
H^k(X_b,\mathbb C)=\bigoplus_{r+s=k}H^{r,s}(X_b)
$$

となる。右辺の和を第一添字 $r\ge p$ に制限すると部分空間 $F_b^p$ を得る。これを点ごとに集めたとき、単に滑らかな部分束であるだけでなく、正則な部分束になるかが問題となる。

<a id="def-def1-13-hodge-bundle"></a>

<!-- formal-statement-start -->
> **定義（Kähler族のHodgeフィルトレーション束）**
>
> $\pi:\mathcal X\to B$ を上記の固有正則沈め込みとし、各 $X_b$ をコンパクトKählerとする。$0\le k\le2n$ と $p\in\mathbb Z$ に対し

$$
F_b^pH^k(X_b,\mathbb C)
=\bigoplus_{\substack{r+s=k\\r\ge p}}H^{r,s}(X_b)
$$

> と置く。これらのファイバーからなる $\mathcal H^k_{\mathcal O}$ の部分集合を $\mathcal F^p$ と記し、**Hodgeフィルトレーション束**と呼ぶ。$\mathcal F^{p+1}\subseteq\mathcal F^p$、$\mathcal F^0=\mathcal H^k_{\mathcal O}$、$\mathcal F^{k+1}=0$ である（$0\le k$）。
<!-- formal-statement-end -->

<!-- definition-example-start: def-def1-13-hodge-bundle -->
**定義の確認**（積族）。$X$ を固定したコンパクトKähler多様体、$\mathcal X=X\times B$ とする。[Hodge分解](../../HOD/HOD1-06/index.md#thm-hod1-06-hodge-decomposition)の各 $H^{r,s}(X)$ は $b$ に依存しない。したがって

$$
\mathcal F^p
=\left(\bigoplus_{r\ge p}H^{r,k-r}(X)\right)\times B
$$

となる。$r\ge p+1$ は $r\ge p$ に含まれ、$r\ge0$ は全項を含み、$r\ge k+1$ には $s=k-r<0$ しかないので零である。定義の三条件を直接検査できた。
<!-- definition-example-end -->

この段階では「束」と名付けただけで局所自由性をまだ証明していない。点ごとの $F_b^p$ の次元が一定であることと、局所で**正則に**基底を選べることの両方が必要である。

## 3. 正則性を相対de Rham複体から導く

相対正則微分形式の層 $\Omega^r_{\mathcal X/B}$ は、正則な全微分形式から基底方向の微分 $dt^a$ を含む項を除いたものを表す。局所正則沈め込み座標 $(t^a,z^i)$ では、その切断は正則係数の $dz^{i_1}\wedge\cdots\wedge dz^{i_r}$ の和である。ファイバー方向の外微分 $d_{\mathcal X/B}$ による複体

$$
\mathcal O_{\mathcal X}\xrightarrow{d_{\mathcal X/B}}
\Omega^1_{\mathcal X/B}\xrightarrow{d_{\mathcal X/B}}
\cdots\xrightarrow{d_{\mathcal X/B}}\Omega^n_{\mathcal X/B}
$$

を**相対正則de Rham複体**と呼ぶ。$r\ge p$ の項だけを残した部分複体を $\Omega^{\ge p}_{\mathcal X/B}$ と書く。微分は形式の次数を上げるので、実際に部分複体である。

<a id="ref-def1-13-analytic-input"></a>

ここで使う解析的入力を明示する。**解析的コホモロジーと基底変更の定理**（Grauert型の定理）によれば、固有正則写像の整合的な層 $\Omega^r_{\mathcal X/B}$ について、ファイバー上の $H^q(X_b,\Omega^r_{X_b})$ の次元が局所一定なら $R^q\pi_*\Omega^r_{\mathcal X/B}$ は局所自由で、ファイバーへの制限は同型となる。さらに相対正則Poincaréの補題は、相対de Rham複体の超コホモロジーを $\mathscr L^k_{\mathbb C}\otimes\mathcal O_B$ と同定する。これらは複素解析の大きな定理であり、**単なるGauss–Manin接続の平坦性から従うわけではない**。本章では必要な形を解析的入力として明記し、その先のフィルトレーションと微分の議論を展開する。

<a id="thm-def1-13-holomorphic-variation"></a>

<!-- formal-statement-start -->
> **定理（Hodgeフィルトレーションの正則変動）**
>
> $\pi:\mathcal X\to B$ を固有正則沈め込みとし、すべてのファイバーをコンパクトKähler多様体とする。[前段で条件を示したGrauert型の解析的入力](#ref-def1-13-analytic-input)を用いると、各 $k,p$ について $\mathcal F^p\subseteq\mathcal H^k_{\mathcal O}$ は階数

$$
f_k^p=\sum_{\substack{r+s=k\\r\ge p}}h^{r,s}(X_b)
$$

> の正則部分束である。そのファイバーは[Hodgeフィルトレーション](../../HOD/HOD1-15/index.md#def-hod1-15-filtration) $F_b^p$ であり、$f_k^p$ は $b$ に依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

滑らかな局所自明性で $b_k$ を固定する。各Hodge数は正則形式のコホモロジー次元なので上半連続だが、同じ次数での和が一定だから全Hodge数が一定になる。基底変更定理から型別のコホモロジーが正則束になる。Kähler上のHodge–de Rhamスペクトル系列の第1頁退化により、その型別成分を相対de Rham複体の次数フィルトレーションとして貼り合わせられる。

<!-- proof-start -->
### 証明

まず[Ehresmannの局所自明化](../DEF1-01/index.md#thm-def1-01-ehresmann)で $H^k(X_b,\mathbb C)$ の次元 $b_k$ は局所一定である。Dolbeaultコホモロジーの次元

$$
h^{r,s}(X_b)=\dim_{\mathbb C}H^s(X_b,\Omega^r_{X_b})
$$

は固有正則族について上半連続である。$b_0\in B$ を固定して $U$ を十分小さくすると、$b\in U$ で各 $h^{r,s}(X_b)\le h^{r,s}(X_{b_0})$ とできる。ところが[Kähler Hodge分解](../../HOD/HOD1-06/index.md#thm-hod1-06-hodge-decomposition)により

$$
\sum_{r+s=k}h^{r,s}(X_b)=b_k
=\sum_{r+s=k}h^{r,s}(X_{b_0}).
$$

非負整数の各項が増えずに和だけ等しいので、すべての $h^{r,s}$ が $U$ で一定となる。各次数 $k$ について繰り返せばよい。

上記の基底変更定理を $\Omega^r_{\mathcal X/B}$ に適用し、$R^s\pi_*\Omega^r_{\mathcal X/B}$ は局所自由でファイバーが $H^s(X_b,\Omega^r)$ である。相対正則de Rham複体の次数によるスペクトル系列では

$$
E_1^{r,s}=R^s\pi_*\Omega^r_{\mathcal X/B}
\quad\Longrightarrow\quad
\mathbb H^{r+s}(\mathcal X/B,\Omega^\bullet_{\mathcal X/B}).
$$

各ファイバー上で第1頁の全次元が $b_k$ に等しいため、[Hodge分解](../../HOD/HOD1-06/index.md#thm-hod1-06-hodge-decomposition)と比較すると第1頁以後に次元を減らす微分はない。基底変更後も各 $E_1^{r,s}$ の階数が固定なので、局所的な退化とフィルトレーションの各段の局所自由性が従う。相対正則Poincaréの補題による同定の下で、$\Omega^{\ge p}_{\mathcal X/B}$ の像のファイバーは

$$
\bigoplus_{r\ge p}H^{r,k-r}(X_b)=F_b^p
$$

である。したがって $\mathcal F^p$ は正則部分束になり、階数は表示の $f_k^p$。$\square$
<!-- proof-end -->

**確認（楕円曲線）。** $E_\tau$ の重さ1では $F_\tau^1=\mathbb C(e_1+\tau e_2)$、$F_\tau^0=\mathbb Ce_1\oplus\mathbb Ce_2$、$F_\tau^2=0$（$e_1=[dx],e_2=[dy]$）。$\tau\mapsto e_1+\tau e_2$ は零にならない正則切断なので、$F^1$ は平坦枠 $(e_1,e_2)$ の中で正則な直線部分束である。$F^1$ が平行という主張ではない。

## 4. 平坦空間内で動く旗を記録する

同じ次元の入れ子の部分空間

$$
V_{\mathbb C}=F^0\supseteq F^1\supseteq\cdots\supseteq F^{k+1}=0,
\qquad \dim F^p=f_k^p
$$

を一組の**旗（flag）**という。このような旗全体は複素多様体である旗多様体 $\operatorname{Flag}(f_k^\bullet,V_{\mathbb C})$ を作る。局所的に $F^p$ の基底を列に並べた行列を使えば、部分空間の動きは行列の小行列式が零でないチャートで正則座標を持つ。単なる部分空間の集合ではなく、正則写像の行き先として使える。

ファイバーごとに存在する[反対フィルトレーション条件](../../HOD/HOD1-15/index.md#thm-hod1-15-opposite-filtration)も忘れてはいけない。固定した有理ベクトル空間 $V_{\mathbb Q}$ の共役を使って、すべての $p$ で $V_{\mathbb C}=F^p\oplus\overline{F^{k-p+1}}$ を満たす旗の集合を $D_k$ とする。これは旗多様体の開部分で、**非偏極のHodge旗の分類領域**である。偏極による追加の二次条件は、この定義に含めない。

<a id="def-def1-13-period-map"></a>

<!-- formal-statement-start -->
> **定義（周期写像）**
>
> $\pi:\mathcal X\to B$ をコンパクトKählerファイバーを持つ固有正則沈め込み、$k$ を固定次数とする。単連結な開集合 $U\subseteq B$ と基準点 $b_0\in U$ を選び、[Gauss–Manin並行移動](../DEF1-12/index.md#thm-def1-12-flatness)で $H^k(X_b,\mathbb Q)$ を $V_{\mathbb Q}=H^k(X_{b_0},\mathbb Q)$ に同定する。各 $b$ のHodgeフィルトレーションをこの固定空間へ移した旗

$$
\Phi_k(b)=\bigl(F_b^pH^k(X_b,\mathbb C)\bigr)_p\in D_k
$$

> を対応させる写像 $\Phi_k:U\to D_k$ を**第 $k$ 周期写像**という。表示中の $F_b^p$ は平行同定後の部分空間を意味する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-def1-13-period-map -->
**定義の確認**（楕円曲線）。$U$ を $\mathbb H=\{\operatorname{Im}\tau>0\}$ 内の小円板とする。重さ1で $V_{\mathbb Q}=\mathbb Qe_1\oplus\mathbb Qe_2$、旗は $F^1_\tau=\mathbb C(e_1+\tau e_2)$ だけで決まる。係数列 $(1,\tau)^{\mathsf T}$ の第1成分は常に1なので、射影直線のこの座標チャートで周期写像は $\tau\mapsto\tau$ となる。共役した直線の係数列 $(1,\bar\tau)^{\mathsf T}$ との行列式は $\bar\tau-\tau=-2i\operatorname{Im}\tau\ne0$。従って反対条件を満たし、確かに $D_1$ に入る。
<!-- definition-example-end -->

[正則変動定理](#thm-def1-13-holomorphic-variation)により、平坦枠での $\mathcal F^p$ の基底を正則な係数行列で表せる。旗多様体の座標はこれらの行列成分の比で与えられるから、$\Phi_k$ は**正則写像**である。

**大域的な注意。** 一般の $B$ 上では平坦枠は一価に選べない。[モノドロミー](../DEF1-12/index.md#thm-def1-12-flatness)を $\rho_k:\pi_1(B,b_0)\to\operatorname{GL}(V_{\mathbb Q})$ とする。普遍被覆 $\widetilde B$ 上で道に沿う平行移動の逆写像により基準ファイバーへ同定すると、対応する $\widetilde\Phi_k$ は

$$
\widetilde\Phi_k(\gamma\widetilde b)
=\rho_k(\gamma)^{-1}\widetilde\Phi_k(\widetilde b)
$$

を満たす（閉路と道の合成順序をこの式になるよう固定した）。従って大域的な周期写像は一般には $B\to D_k$ ではなく、モノドロミーを考慮した表示になる。旗の変化、モノドロミー、偏極は異なる情報である。

## 5. Griffiths横断性：一度の微分で下がるのは一段だけ

正則な部分束が平坦接続で保存されるとは限らない。実際、楕円曲線で $\nabla^{\mathrm{GM}}_{\partial_\tau}(e_1+\tau e_2)=e_2$ は一般に $F_\tau^1$ に入らない。しかし $e_2$ は必ず $F_\tau^0$ に入る。高次の場合も、微分が $F^p$ から出るときは一段下の $F^{p-1}$ に収まる。

<a id="thm-def1-13-griffiths"></a>

<!-- formal-statement-start -->
> **定理（Griffiths横断性）**
>
> $\pi:\mathcal X\to B$ を固有正則沈め込みとし、すべてのファイバーをコンパクトKählerとする。$\mathcal H^k_{\mathcal O}$ に[Gauss–Manin接続](../DEF1-12/index.md#def-def1-12-gauss-manin)、$\mathcal F^p$ に[正則Hodgeフィルトレーション束](#thm-def1-13-holomorphic-variation)を入れる。このとき $\mathcal F^p$ の任意の局所正則切断 $s$ に対して

$$
\nabla^{\mathrm{GM}}s\in
\Omega_B^1\otimes_{\mathcal O_B}\mathcal F^{p-1}
$$

> が成り立つ。特に $v\in T_b^{1,0}B$ に対する $\nabla_v^{\mathrm{GM}}s$ の類は $F_b^{p-1}$ に属する。
<!-- formal-statement-end -->

### 証明の見取り図

相対形式を全空間の形式へ持ち上げて、基底方向に一度微分する。局所正則座標の取り替えでは、基底方向のベクトル場の差は**ファイバー方向の正則ベクトル場**である。形式をこのベクトル場で一回収縮すると、相対正則微分の次数は多くても一つだけ下がる。これが $p\to p-1$ の理由である。なお微分した形式をただ単に「同じ型」とみなすのは誤りで、局所持ち上げの貼り合わせ差を追う必要がある。

<!-- proof-start -->
### 証明

$b\in B$ の近傍で正則座標 $t^a$ と、$\pi$ が $(t,z)\mapsto t$ になる全空間の局所正則座標を選ぶ。固定した $v=\partial/\partial t^a$ について各チャートに正則持ち上げ $s_i=\partial_{t^a}|_{z_i}$ がある。重なりの差 $\kappa_{ij}=s_j-s_i$ はファイバーに接する正則ベクトル場であり、[Kodaira–Spencer類の構成](../DEF1-01/index.md#def-def1-01-kodaira-spencer)と同じものである。

相対正則de Rham複体の $\Omega^{\ge p}_{\mathcal X/B}$ によって $s$ を局所的なČech–de Rhamコサイクルで表す。次数 $r\ge p$ の相対正則形式 $\alpha_i$ は、各座標系で同じ $dz_i$ の外積を全空間の正則形式 $\widetilde\alpha_i$ へ持ち上げられる。隣接チャート間で $s_i$ を $s_j$ に替えたとき、方向微分の差は $\mathcal L_{\kappa_{ij}}\widetilde\alpha_i$ である。ファイバー方向の外微分を $d_F$ とすると、[Cartanの公式](../../GEO/GEO7/index.md#thm-geo7-cartan-formula)の相対版から

$$
\mathcal L_{\kappa_{ij}}\alpha_i
=d_F(\iota_{\kappa_{ij}}\alpha_i)
  +\iota_{\kappa_{ij}}(d_F\alpha_i).
$$

この式はČech–de Rham総複体にも次数と符号を付けて適用できる。第一項の原始形式 $\iota_{\kappa_{ij}}\alpha_i$ は正則微分の次数が $r-1$、第二項は $r$ のままである。相対複体の微分を使ったコサイクル条件と合わせると、基底方向の微分によって生じた貼り合わせ差は **相対正則次数 $r-1$ 以上** のコチェインで補正できる。特に出発点が $r\ge p$ なら、得られるGauss–Manin微分の類は $\Omega^{\ge p-1}_{\mathcal X/B}$ の超コホモロジーから来る。

前節の相対de Rham同定と[正則変動定理](#thm-def1-13-holomorphic-variation)で、この像は $\mathcal F^{p-1}$ に等しい。各 $\partial/\partial t^a$ について成り立つので

$$
\nabla^{\mathrm{GM}}_{\partial/\partial t^a}s
\in\mathcal F^{p-1},\qquad
\nabla^{\mathrm{GM}}s
=\sum_a dt^a\otimes\nabla^{\mathrm{GM}}_{\partial/\partial t^a}s.
$$

ここで $s$ は正則切断なので、平坦枠での係数が正則、従って $(0,1)$ 方向の微分は零である。以上で結論を得る。$\square$
<!-- proof-end -->

> 横断性は $\nabla\mathcal F^p\subseteq\Omega_B^1\otimes\mathcal F^{p-1}$ であり、$\nabla\mathcal F^p\subseteq\Omega_B^1\otimes\mathcal F^p$ ではない。後者は「Hodgeフィルトレーション自体が平坦」という通常偽の強い主張になる。

## 6. 微分の一段先の成分はKodaira–Spencer類が測る

横断性を「一段下へ入る」という包含関係だけで終わらせず、その一段下の商への成分を計算する。[Hodgeフィルトレーションの型復元](../../HOD/HOD1-15/index.md#thm-hod1-15-opposite-filtration)から、点 $b$ における商は

$$
F_b^{p-1}/F_b^p\simeq H^{p-1,k-p+1}(X_b)
$$

と同定できる。この商へ $\nabla_v s$ を写す操作は、$s$ の延長の取り方に依存しない。実際、延長の差が $b$ で零なら、局所枠 $e_j\in\mathcal F^p$ を用いて $\sum f_je_j$（$f_j(b)=0$）と表せ、その微分の値は $\sum (vf_j)(b)e_j(b)\in F_b^p$ だからである。

<a id="prop-def1-13-infinitesimal-period"></a>

<!-- formal-statement-start -->
> **命題（周期写像の微分とKodaira–Spencer収縮）**
>
> $\pi:\mathcal X\to B$ をコンパクトKählerファイバーの固有正則沈め込みとし、$b\in B$、$v\in T_b^{1,0}B$、$p+q=k$ とする。次数 $k$ の周期写像の微分を $F_b^p/F_b^{p+1}$ から $F_b^{p-1}/F_b^p$ への成分に射影した写像を $\theta_v^{p,q}$ と書く。これは延長の選択によらない線形写像であり、[Kodaira–Spencer類](../DEF1-01/index.md#def-def1-01-kodaira-spencer)を $\mu_v\in A^{0,1}(T^{1,0}X_b)$ で表すと、[Hodge分解](../../HOD/HOD1-06/index.md#thm-hod1-06-hodge-decomposition)の調和代表 $\alpha^{p,q}$ に対して

$$
\theta_v^{p,q}[\alpha^{p,q}]
=-\bigl[\mu_v\mathbin{\lrcorner}\alpha^{p,q}\bigr]
\in H^{p-1,q+1}(X_b).
$$

> 収縮の記号は $\mu_v=\sum\mu^i_{\bar j}\,d\bar z^j\otimes\partial_{z^i}$ に対して $\mu_v\lrcorner\alpha=\sum\mu^i_{\bar j}\,d\bar z^j\wedge\iota_{\partial_{z^i}}\alpha$ と定める。負号は [DEF1-02の摂動された $(0,1)$ 方向](../DEF1-02/index.md#def-def1-02-beltrami-graph)を $\partial_{\bar z}+\mu\partial_z$ とする規約による。
<!-- formal-statement-end -->

### 証明の見取り図

変形した $(0,1)$ ベクトルが正則 $(1,0)$ 形式を消す条件を一次展開する。$dz^i$ を $dz^i-\mu^i_{\bar j}d\bar z^j$ に取り替えるため、$(p,q)$ 形式の一つの $dz$ を $d\bar z$ に替えた成分だけが商へ残る。二個以上の取り替えは一次微分には現れない。

<!-- proof-start -->
### 証明

滑らかな局所自明化で中心ファイバー $X_b$ を固定し、基底の方向 $v$ を局所座標 $t$ の $\partial_t$ とする。[Beltrami表示](../DEF1-02/index.md#def-def1-02-beltrami-graph)で $(0,1)$ 方向は

$$
\partial_{\bar z^j}
+t\sum_i\mu^i_{\bar j}\partial_{z^i}+O(t^2)
$$

となる（$t$ の正則一次方向を考えている）。これを消す $(1,0)$ 余接の生成元は、一次まで

$$
\vartheta_t^i
=dz^i-t\sum_j\mu^i_{\bar j}d\bar z^j+O(t^2)
$$

である。実際に上のベクトルへ作用させると $t\mu^i_{\bar j}-t\mu^i_{\bar j}+O(t^2)=O(t^2)$ となる。

調和代表 $\alpha^{p,q}$ を $p$ 個の $dz$ と $q$ 個の $d\bar z$ の和として書く。$dz$ の各因子を $\vartheta_t$ で置換して $t$ の係数を取ると、一次項のうち型 $(p-1,q+1)$ の和は

$$
-\sum_{i,j}\mu^i_{\bar j}\,d\bar z^j
\wedge\iota_{\partial_{z^i}}\alpha^{p,q}
=-\mu_v\lrcorner\alpha^{p,q}.
$$

ほかに生じる型 $(p,q)$ 以上の成分は $F_b^p$ への射影で消える。調和代表は $\partial\alpha=\bar\partial\alpha=0$ を満たし、Kodaira–Spencerの代表は $\bar\partial\mu_v=0$ を満たすため、Leibniz則で $\bar\partial(\mu_v\lrcorner\alpha)=0$。$\mu_v$ を $\mu_v+\bar\partial w$ に替えると差は

$$
(\bar\partial w)\lrcorner\alpha
=\bar\partial(w\lrcorner\alpha)
  -w\lrcorner(\bar\partial\alpha)
=\bar\partial(w\lrcorner\alpha)
$$

であり、Dolbeault類は不変である。よって表示は選択に依存せず、横断性の商への微分を与える。$\square$
<!-- proof-end -->

これは各 $v$ と各次数 $p,q$ に対する**微分の式**であり、周期写像の局所単射性やTorelli型の結論を自動的に意味しない。$\theta_v=0$ でも二次以上で周期が動くことはあり、逆に$\theta_v$ が非零でも大域的に周期が異なるファイバーを一意に識別できるとは限らない。

## 7. 楕円曲線の周期と偏極の必要条件

先ほどの $E_\tau$ を固定実トーラスで表すと、$e_1=[dx],e_2=[dy]$ は平坦。$dz_\tau=dx+\tau dy$ は正則形式で、$F^1_\tau=\mathbb C(e_1+\tau e_2)$。この単純な計算は、周期写像・横断性・Kodaira–Spencer収縮を一度に検査する。

<a id="prop-def1-13-elliptic-period"></a>

<!-- formal-statement-start -->
> **命題（楕円曲線族の周期写像）**
>
> $B=\mathbb H=\{\tau\in\mathbb C:\operatorname{Im}\tau>0\}$ 上の $E_\tau=\mathbb C/(\mathbb Z+\tau\mathbb Z)$ について、平坦基底 $e_1=[dx],e_2=[dy]$ を選ぶ。第1周期写像は旗多様体 $\mathbb P^1$ のチャートで $\Phi_1(\tau)=\tau$ と表され、

$$
\nabla^{\mathrm{GM}}_{\partial_\tau}[dz_\tau]=e_2,
\qquad
\theta_{\partial_\tau}^{1,0}([dz_\tau])
=-\frac{1}{\tau-\bar\tau}[d\bar z_\tau].
$$

> 特に $\theta_{\partial_\tau}^{1,0}\ne0$ である。積分の向きを $x,y$ の標準順序としたとき、交叉形式 $Q$ の $Q(e_1,e_2)=1$ という規約で

$$
i\int_{E_\tau}dz_\tau\wedge\overline{dz_\tau}
=2\operatorname{Im}\tau>0.
$$

> この正値性は楕円曲線の重さ1の偏極条件を表す。
<!-- formal-statement-end -->

### 証明の見取り図

まず $dy=(dz_\tau-d\bar z_\tau)/(\tau-\bar\tau)$ と解く。Gauss–Manin微分は $dy$ だが、その $(0,1)$ 型成分だけが $\theta$ に残る。最後の正値性は外積の符号を明示して面積積分へ戻す。

<!-- proof-start -->
### 証明

$dz_\tau=dx+\tau dy$ と $d\bar z_\tau=dx+\bar\tau dy$ の差から

$$
dy=\frac{dz_\tau-d\bar z_\tau}{\tau-\bar\tau}.
$$

平坦基底の係数微分を取る[Gauss–Manin接続の定義](../DEF1-12/index.md#def-def1-12-gauss-manin)より $\nabla_{\partial_\tau}[dz_\tau]=e_2$。その商 $H^1/F^1\simeq H^{0,1}$ への射影は、上の式で $d\bar z_\tau$ の係数を読むと $-1/(\tau-\bar\tau)$ となる。$\operatorname{Im}\tau>0$ なので分母は非零である。

一方、$dx\wedge dx=dy\wedge dy=0$、$dy\wedge dx=-dx\wedge dy$ より

$$
dz_\tau\wedge d\bar z_\tau
=(\bar\tau-\tau)\,dx\wedge dy
=-2i\operatorname{Im}\tau\,dx\wedge dy.
$$

$\int_{E_\tau}dx\wedge dy=1$ だから $i\int dz_\tau\wedge d\bar z_\tau=2\operatorname{Im}\tau>0$。基本閉路に沿う周期はそれぞれ $1,\tau$ であり、旗のチャートの係数比も $\tau$ となる。$\square$
<!-- proof-end -->

**偏極をどこで仮定したか。** 一般のコンパクトKähler族の $F^p$ と $\Phi_k$ は、有理偏極なしに作った。一方で、交叉形式が**有理**で、各ファイバーのHodge構造を偏極し、その形式が局所系上で平行に保たれるとき、周期写像の行き先を対応する偏極付き周期領域へ狭められる。[偏極の条件](../../HOD/HOD1-15/index.md#def-hod1-15-polarization)では単なるHodge分解の存在に加えて双線形形式の直交条件と符号付き正値性を要求する。一般の高次コホモロジーでは原始部分とLefschetz作用素の指定も必要であり、楕円曲線の $i\int dz\wedge d\bar z>0$ だけを全次数の偏極条件と混同しない。

**失敗例（非Kähler）。** 一般の固有正則族にKähler仮定を落とすと、ファイバー上の $(p,q)$ 型のDolbeault群は定義できても、その直和が de Rham コホモロジー全体に一致するとは限らない。[非KählerでのHodge分解の限界](../../HOD/HOD1-09/index.md#cor-hod1-09-odd-b1)が示すように、前節の $\sum_{r+s=k}h^{r,s}=b_k$ を使う箇所が壊れる。したがって本証明の正則部分束の構成を、仮定なしに非Kählerへ拡張することはできない。

## 8. 演習

<a id="ex-def1-13-a01"></a>
### 演習 A1：Hodge数から旗の階数を数える

- Level: A

重さ2の純Hodge構造が $h^{2,0}=h^{0,2}=1$、$h^{1,1}=2$ を持つとする。$F^0,F^1,F^2,F^3$ の次元と各商 $F^p/F^{p+1}$ の次元を求めよ。どの等式に[純Hodge構造の定義](../../HOD/HOD1-15/index.md#def-hod1-15-pure-hodge)を使ったか述べよ。

<!-- solution-start -->
**詳細解答**

重さが2なので型は $(2,0),(1,1),(0,2)$ である。直和性を使うと $\dim H^2=1+2+1=4$。第一添字が $p$ 以上という[フィルトレーションの定義](../../HOD/HOD1-15/index.md#def-hod1-15-filtration)に従えば

$$
\begin{aligned}
F^0&=H^{2,0}\oplus H^{1,1}\oplus H^{0,2},
&\dim F^0&=4,\\
F^1&=H^{2,0}\oplus H^{1,1},
&\dim F^1&=3,\\
F^2&=H^{2,0},&\dim F^2&=1,\\
F^3&=0,&\dim F^3&=0.
\end{aligned}
$$

包含する部分空間の差の次元を取るので $\dim(F^0/F^1)=4-3=1$、$\dim(F^1/F^2)=3-1=2$、$\dim(F^2/F^3)=1$。これらは $h^{0,2},h^{1,1},h^{2,0}$ に等しい。直和で次元を足せる理由と共役により $h^{2,0}=h^{0,2}$ となる理由が、純Hodge構造の二条件の使いどころである。
<!-- solution-end -->

<a id="ex-def1-13-a02"></a>
### 演習 A2：積族での横断性

- Level: A

コンパクトKähler多様体 $X$ の積族 $X\times\mathbb C_t\to\mathbb C_t$ を考える。固定した $u_1,\ldots,u_r\in F^pH^k(X,\mathbb C)$ と正則関数 $f_j(t)$ に対する $s(t)=\sum f_j(t)u_j$ について、$\nabla_{\partial_t}^{\mathrm{GM}}s$ を計算し、横断性より強い結論を示せ。

<!-- solution-start -->
**詳細解答**

積族の平行同定は恒等写像なので $u_j$ は[Gauss–Maninの平行切断](../DEF1-12/index.md#thm-def1-12-flatness)である。Leibniz則を項ごとに適用すると

$$
\nabla_{\partial_t}^{\mathrm{GM}}s
=\sum_j\bigl(f'_j(t)u_j+f_j(t)\nabla_{\partial_t}^{\mathrm{GM}}u_j\bigr)
=\sum_j f'_j(t)u_j.
$$

各 $u_j$ は同じ固定 $F^p$ に入るので、結果は $F^p$ に属する。従って積族では $\nabla\mathcal F^p\subseteq\Omega_B^1\otimes\mathcal F^p$ まで成り立つ。一般の族ではこの強い包含は仮定できない。
<!-- solution-end -->

<a id="ex-def1-13-a03"></a>
### 演習 A3：楕円曲線の一段下の成分

- Level: A

$\tau=2i$ の楕円曲線で $e_1=[dx],e_2=[dy]$ とする。$[dz_\tau]$ のGauss–Manin微分を $H^{1,0}\oplus H^{0,1}$ に分解し、$F^1$ に入らないことを確かめよ。

<!-- solution-start -->
**詳細解答**

$[dz_\tau]=e_1+\tau e_2$ で、平坦基底の係数を微分するので $\nabla_{\partial_\tau}[dz_\tau]=e_2$。[楕円曲線の周期命題](#prop-def1-13-elliptic-period)の連立方程式を $\tau=2i$ に代入すると

$$
e_2=[dy]=\frac{1}{4i}[dz_{2i}]-\frac{1}{4i}[d\bar z_{2i}].
$$

後者の $(0,1)$ 成分の係数 $-1/(4i)=i/4$ は零でない。$F^1=H^{1,0}$ なので $e_2\notin F^1$、しかし $e_2\in F^0=H^1$。横断性と「フィルトレーションが平坦」という偽の強化を区別できた。
<!-- solution-end -->

<a id="ex-def1-13-a04"></a>
### 演習 A4：端点での横断性

- Level: A

重さ $k$ のKähler族で $p=0$、$p=k+1$ の[Griffiths横断性](#thm-def1-13-griffiths)がなぜ自動的かを説明せよ。したがって重さ1ではどの $p$ が実質的な制約になるか。

<!-- solution-start -->
**詳細解答**

$p=0$ では $\mathcal F^0=\mathcal H^k_{\mathcal O}$、$\mathcal F^{-1}=\mathcal H^k_{\mathcal O}$ であるから、接続の値が全束に入るという通常の事実だけになる。$p=k+1$ では $\mathcal F^{k+1}=0$ なのでその唯一の切断は零、微分も零である。重さ1では $F^0=H^1$、$F^2=0$ だから残る $p=1$ の $\nabla F^1\subseteq\Omega_B^1\otimes F^0$ が横断性の非自明なチェック対象（ただし行き先が全空間なので自動）となる。意味のある量は、その商 $F^0/F^1$ に落ちる $\theta^{1,0}$ の値である。
<!-- solution-end -->

<a id="ex-def1-13-a05"></a>
### 演習 A5：基底変更で一次変化を消す

- Level: A

楕円曲線族のパラメータを $\tau=i+s^2$（$|s|$ を十分小さくする）に替える。$s=0$ で周期写像の微分と $\theta_{\partial_s}$ を求めよ。族全体が一定と結論してよいか。

<!-- solution-start -->
**詳細解答**

固定平坦基底で $[dz_s]=e_1+(i+s^2)e_2$。連鎖律から

$$
\nabla_{\partial_s}^{\mathrm{GM}}[dz_s]
=\frac{d\tau}{ds}\,e_2=2s\,e_2.
$$

[楕円曲線の商への射影](#prop-def1-13-elliptic-period)で $e_2$ の $(0,1)$ 成分を読むと

$$
\theta_{\partial_s}^{1,0}([dz_s])
=-\frac{2s}{\tau(s)-\overline{\tau(s)}}[d\bar z_s].
$$

$s=0$ では両方零であるが、$s\ne0$ なら $2s\ne0$ なので一次変化は一般に非零。これは[Kodaira–Spencer写像の基底変更](../DEF1-01/index.md#prop-def1-01-base-change)と一致する。$s=0$ の一次微分だけでは二次変化を否定できず、族が一定とは結論できない。
<!-- solution-end -->

<a id="ex-def1-13-b01"></a>
### 演習 B1：平坦でない枠と一定のHodge部分空間

- Level: B

固定した楕円曲線 $E_i$ の積族を考え、平坦基底を $e_1=[dx],e_2=[dy]$、一定のHodge直線を $\mathcal F^1=\mathcal O_B w$、$w=e_1+i e_2$ とする。零点のない正則関数 $g(t)$ で $u(t)=g(t)w$ と枠を変えた場合、$\nabla u$ を求めよ。この結果は $\mathcal F^1$ が平坦な部分束であることと矛盾するか。

<!-- solution-start -->
**詳細解答**

$\nabla w=0$ なので Leibniz則から

$$
\nabla u=dg\otimes w=\frac{dg}{g}\otimes u.
$$

例えば $g(t)=e^t$ なら $\nabla_{\partial_t}u=u\ne0$。しかし値はすべて $\mathcal F^1$ 内に残る。平坦な**部分束**という性質は接続がその部分束を保存すること、平坦な**枠**という性質は各枠ベクトルの接続微分が零であることを意味する。二つは別で、矛盾しない。楕円曲線 $E_\tau$ では $F_\tau^1$ 自体が動くため、これより強い「保存」すら一般に成立しない。
<!-- solution-end -->

<a id="ex-def1-13-b02"></a>
### 演習 B2：積の族で収縮が導分になること

- Level: B

楕円曲線の二つの独立パラメータ $\tau,\sigma\in\mathbb H$ を持つ積族 $E_\tau\times E_\sigma$ を考える。$z=x+\tau y$、$w=u+\sigma v$ とし、$\Omega=dz\wedge dw$ と置く。方向 $\partial_\tau$ で $\nabla\Omega$ の型 $(1,1)$ 成分を計算し、[Kodaira–Spencer収縮](#prop-def1-13-infinitesimal-period)で $\Omega$ のどの因子が変化しているか説明せよ。

<!-- solution-start -->
**詳細解答**

$[dx],[dy],[du],[dv]$ は平坦であり、$dz=dx+\tau dy$、$dw=du+\sigma dv$ なので

$$
\nabla_{\partial_\tau}^{\mathrm{GM}}[\Omega]
=[dy\wedge dw]+[dz\wedge\underbrace{\partial_\tau(dw)}_{0}]
=[dy\wedge dw].
$$

$dy=(dz-d\bar z)/(\tau-\bar\tau)$ を代入すると

$$
[dy\wedge dw]
=\frac{1}{\tau-\bar\tau}[dz\wedge dw]
-\frac{1}{\tau-\bar\tau}[d\bar z\wedge dw].
$$

第1項は $(2,0)$、第2項は $(1,1)$ 型であり、商 $F^1/F^2$ へ落ちるのは第2項。$\partial_\tau$ は第1因子の $dz$ だけを変え、第2因子 $dw$ は固定する。収縮 $\mu_\tau\lrcorner(dz\wedge dw)$ は外積の各因子に作用する導分で、第2因子への作用が零なので、表示と一致する。
<!-- solution-end -->

<a id="ex-def1-13-b03"></a>
### 演習 B3：周期比の基底変更と虚部の正値性

- Level: B

楕円曲線の基本閉路 $\gamma_1,\gamma_2$ を、それぞれ $\gamma'_1=a\gamma_1+b\gamma_2$、$\gamma'_2=c\gamma_1+d\gamma_2$ に取り替える。$a,b,c,d\in\mathbb Z$、$ad-bc=1$ とする。周期比 $\tau'=\int_{\gamma'_2}dz/\int_{\gamma'_1}dz$ を求め、$\operatorname{Im}\tau'>0$ を証明せよ。

<!-- solution-start -->
**詳細解答**

元の周期は $\int_{\gamma_1}dz=1$、$\int_{\gamma_2}dz=\tau$。従って新しい二つの周期は $a+b\tau$ と $c+d\tau$ で、$\operatorname{Im}\tau>0$ なら $a+b\tau\ne0$（$b\ne0$ では虚部が非零、$b=0$ では $a=\pm1$）。よって

$$
\tau'=\frac{c+d\tau}{a+b\tau}.
$$

分母の共役を掛けて虚部を取ると

$$
\begin{aligned}
\tau'-\overline{\tau'}
&=\frac{(c+d\tau)(a+b\bar\tau)
-(c+d\bar\tau)(a+b\tau)}{|a+b\tau|^2}\\
&=\frac{(ad-bc)(\tau-\bar\tau)}{|a+b\tau|^2}
=\frac{\tau-\bar\tau}{|a+b\tau|^2}.
\end{aligned}
$$

従って $\operatorname{Im}\tau'=\operatorname{Im}\tau/|a+b\tau|^2>0$。整数の向き保存基底変更は、偏極の正値条件を保つ。基底を変えても同じ楕円曲線を記述し得るため、周期座標と大域的なモジュライ座標を同一視してはいけない。
<!-- solution-end -->

<a id="ex-def1-13-b04"></a>
### 演習 B4：Kodaira–Spencer代表との符号照合

- Level: B

$E_i$ を中心とする $\tau=i+t$ の族で、滑らかな固定座標 $z=x+iy$ を使う。[DEF1-01のBeltrami計算](../DEF1-01/index.md#def-def1-01-kodaira-spencer)の規約 $\mu=(1/(2i))d\bar z\otimes\partial_z$ と、[収縮命題](#prop-def1-13-infinitesimal-period)から $\theta_{\partial_t}[dz]$ を求めよ。周期の直接微分と一致することを確かめよ。

<!-- solution-start -->
**詳細解答**

$\mu\lrcorner dz=(1/(2i))d\bar z$ である。$dz$ は調和な $(1,0)$ 形式なので収縮命題を適用でき、

$$
\theta_{\partial_t}([dz])=-\frac1{2i}[d\bar z].
$$

直接には $dz_t=dx+(i+t)dy=dz+t\,dy$ だから $\nabla_{\partial_t}[dz_t]_{t=0}=[dy]$。さらに

$$
dy=\frac{dz-d\bar z}{2i}
=\frac1{2i}dz-\frac1{2i}d\bar z.
$$

$H^1/F^1\simeq H^{0,1}$ では第1項が消え、同じ $-1/(2i)[d\bar z]$ が残る。$dz$ を消す変形後の $(0,1)$ ベクトル場を $\partial_{\bar z}+\mu\partial_z$ としたため、正則余接の変化が $-\mu\lrcorner dz$ になる。この負号は偶然ではない。
<!-- solution-end -->

<a id="ex-def1-13-c01"></a>
### 演習 C1：二変数の周期写像と横断性の総合

- Level: C

$B=\mathbb H\times\mathbb H$ 上の積族 $X_{\tau,\sigma}=E_\tau\times E_\sigma$ を考える。$z=x+\tau y$、$w=u+\sigma v$ とする。

1. $H^2(X_{\tau,\sigma},\mathbb C)$ のHodge数 $h^{2,0},h^{1,1},h^{0,2}$ と $\dim F^2,\dim F^1$ を求めよ。
2. $\Omega=dz\wedge dw$ が $F^2$ を生成することを示し、方向 $V=A\partial_\tau+C\partial_\sigma$（$A,C\in\mathbb C$）で $\nabla_V[\Omega]$ を計算せよ。
3. $F^1/F^2\simeq H^{1,1}$ への射影を明示し、$A,C$ が同時に零でないならその射影が零でないことを示せ。計算が横断性のどの段を実証しているか説明せよ。

<!-- solution-start -->
**詳細解答**

**(1)** 各楕円曲線の第1コホモロジーは $H^{1,0}\oplus H^{0,1}$ で、各成分は一次元。積の第2コホモロジーは各因子の $H^2$ からの2次元と、両方の $H^1$ のテンソル積の4次元からなる。前二者は $(1,1)$、後者は $(2,0)$ が1次元、$(1,1)$ が2次元、$(0,2)$ が1次元。従って

$$
h^{2,0}=1,\qquad h^{1,1}=4,\qquad h^{0,2}=1,
\qquad \dim F^2=1,\quad\dim F^1=5.
$$

**(2)** $dz$ と $dw$ はそれぞれ正則かつ閉じた一次形式なので $\Omega=dz\wedge dw$ は非零の閉 $(2,0)$ 形式である。上の次元計算で $h^{2,0}=1$ だから、その類は $F^2=H^{2,0}$ を生成する。固定実トーラスで $dx,dy,du,dv$ が平坦なので

$$
\nabla_V^{\mathrm{GM}}[\Omega]
=A[dy\wedge dw]+C[dz\wedge dv].
$$

両項は外積を一度だけ微分したもので、型は $(2,0)$ または $(1,1)$ であり、$(0,2)$ は生じない。

**(3)** 楕円曲線それぞれの連立方程式を解くと

$$
dy=\frac{dz-d\bar z}{\tau-\bar\tau},
\qquad
dv=\frac{dw-d\bar w}{\sigma-\bar\sigma}.
$$

これを代入して型を分けると

$$
\begin{aligned}
\nabla_V[\Omega]
&=\left(\frac{A}{\tau-\bar\tau}
 +\frac{C}{\sigma-\bar\sigma}\right)[dz\wedge dw]\\
&\quad-\frac{A}{\tau-\bar\tau}[d\bar z\wedge dw]
-\frac{C}{\sigma-\bar\sigma}[dz\wedge d\bar w].
\end{aligned}
$$

第1項は $F^2$ に属するので商で消え、

$$
\theta_V^{2,0}[\Omega]
=-\frac{A}{\tau-\bar\tau}[d\bar z\wedge dw]
 -\frac{C}{\sigma-\bar\sigma}[dz\wedge d\bar w]
$$

となる。後二者は $H^{0,1}(E_\tau)\otimes H^{1,0}(E_\sigma)$ と $H^{1,0}(E_\tau)\otimes H^{0,1}(E_\sigma)$ という別々の直和成分に属する。どちらも非零で、$\tau-\bar\tau,\sigma-\bar\sigma$ は非零だから、和が零になるのは $A=C=0$ の場合だけ。よって第2コホモロジーの $F^2$ の一段下への微分は二方向を検出できる。これは

$$
\nabla_VF^2\subseteq F^1
$$

という[Griffiths横断性](#thm-def1-13-griffiths)の具体的検算であり、すべてのファイバーの大域同型判定を証明したものではない。
<!-- solution-end -->

## 9. 次章へ：quinticの101方向

本章で、平坦なコホモロジーの中で動くHodgeフィルトレーションを正則な旗として記述し、一次の動きをKodaira–Spencer収縮へ結び付けた。次の **DEF1-14** では滑らかなquintic三次元多様体の複素変形を数え、$h^{2,1}=101$ と周期の一次変動がどのようにつながるかを具体的に検算する。
