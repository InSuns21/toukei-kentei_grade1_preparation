# MIR1-08 Gauss–Manin接続・Hodge構造の変動

<!-- definition-example-audit: strict -->

## 1. 周期を微分すると何が変わるか

前講で、Dwork型の滑らかな五次超曲面とその正則3形式・周期を構成した。しかし、異なるパラメータのファイバーは別の空間である。閉路を固定せずに周期を微分すると、「積分する形式が変わった分」と「積分路を勝手に動かした分」が混ざってしまう。

[前講の留数形式と周期](../MIR1-07/index.md#def-mir1-07-period)を、次の規約で使う。

$$
F_\psi(x)=\sum_{i=0}^4x_i^5-5\psi P(x),\qquad
P(x)=x_0x_1x_2x_3x_4,
$$

$$
X_\psi=\{F_\psi=0\}\subset\mathbb P^4_{\mathbb C},\qquad
\omega_\psi=\operatorname{Res}_{X_\psi}\left(\frac{\Omega}{F_\psi}\right),
$$

$$
\Omega=\sum_{i=0}^4(-1)^ix_i\,
dx_0\wedge\cdots\wedge\widehat{dx_i}\wedge\cdots\wedge dx_4.
$$

[滑らかさの判定](../MIR1-06/index.md#prop-mir1-06-smooth-locus)から、基底を $U=\{\psi\in\mathbb C:\psi^5\ne1\}$ とすれば各ファイバーは滑らかである。$\mathcal X=\{(x,\psi):F_\psi(x)=0\}\subset\mathbb P^4\times U$ とし、射影 $\pi:\mathcal X\to U$ を考える。射影空間のコンパクト性と方程式の閉性から $\pi$ は固有であり、各ファイバーの偏微分のうち一つが非零なので局所的にファイバー座標を解け、$\pi$ は正則沈め込みである。

したがって既習の[Gauss–Manin接続](../../DEF/DEF1-12/index.md#def-def1-12-gauss-manin)と[Hodge構造の正則変動](../../DEF/DEF1-13/index.md#thm-def1-13-holomorphic-variation)を、この族に適用できる。一般理論を作り直すのでなく、どの閉路とどの微分が実際のquintic計算に現れるかを追う。

## 2. サイクルの平行移動とGauss–Manin微分

局所系とは、十分小さい連結領域でベクトル空間の基底を一定のものとして選び、重なりでは局所定数の行列で貼り合わせる仕組みである。[ファイバーコホモロジー局所系](../../DEF/DEF1-12/index.md#def-def1-12-cohomology-local-system)を用いると、次数3のコホモロジーを局所的に同一視できる。双対の整数ホモロジー類も局所的に平行移動できる。ただし大きなループを一周したときに同じ基底へ戻るとは限らない。

固定した $\psi_0\in U$ の周りに単連結な小円板 $D\subset U$ を取り、$[\gamma_\psi]\in H_3(X_\psi,\mathbb Z)$ を局所的に平行なサイクル類とする。「平行」は各ファイバーの実3次元サイクルが全く同じ点集合になることではなく、滑らかな局所自明化で同一のホモロジー類へ対応することである。

以後、$\psi=u+iv$ に対する基底方向の微分記号を

$$
\partial_\psi=\frac12\left(\frac{\partial}{\partial u}-i\frac{\partial}{\partial v}\right)
$$

とする。正則関数 $\Pi(\psi)$ には $\partial_\psi\Pi=d\Pi/d\psi$ が成り立つ。一方、$\partial_\psi F_\psi(x)$ は射影座標 $x$ を固定したパラメータ偏微分であり、$\partial_\psi(\Phi_\psi^*\omega_\psi)$ は局所自明化で固定ファイバーへ引き戻した形式の係数を微分する。作用対象を取り違えない。

<a id="prop-mir1-08-period-connection"></a>

<!-- formal-statement-start -->
> **命題（Dwork族の周期とGauss–Manin微分）**
>
> $D\subset\{\psi:\psi^5\ne1\}$ を単連結な小円板とし、上記Dwork族の平行な実3サイクル類 $[\gamma_\psi]$ を選ぶ。$\omega_\psi$ のコホモロジー類を $s(\psi)=[\omega_\psi]\in H^3(X_\psi,\mathbb C)$ とすると、周期 $\Pi_\gamma(\psi)=\int_{\gamma_\psi}\omega_\psi$ は正則であり、

$$
\frac{d\Pi_\gamma}{d\psi}
=\int_{\gamma_\psi}\nabla^{\mathrm{GM}}_{\partial_\psi}s
$$

> が成り立つ。右辺はGauss–Manin微分のコホモロジー類を任意の閉3形式で代表した周期積分である。
<!-- formal-statement-end -->

### 証明の見取り図

「閉路も動いているから積分路の導関数が要る」と考える代わりに、局所自明化によって閉路を固定した座標に移す。そこで閉形式を微分し、そのde Rham類を取る。この操作がちょうどGauss–Manin接続である。

<!-- proof-start -->
### 証明

$\pi$ は境界のないコンパクトな滑らかなファイバーを持つ固有沈め込みなので、[局所自明化と平坦性の定理](../../DEF/DEF1-12/index.md#thm-def1-12-flatness)の仮定を満たす。$D$ を縮めて $\Phi_\psi:X_{\psi_0}\to X_\psi$ を滑らかな局所自明化とし、$\gamma_\psi$ を $\Phi_{\psi*}\gamma_{\psi_0}$ で代表する。このとき

$$
\Pi_\gamma(\psi)
=\int_{\gamma_{\psi_0}}\Phi_\psi^*\omega_\psi.
$$

右辺では積分領域が固定されている。コンパクトなサイクルの各単体上で引き戻した形式とその $\psi$ 微分は滑らかだから、微分と積分を交換し、

$$
\frac{d\Pi_\gamma}{d\psi}
=\int_{\gamma_{\psi_0}}
\partial_\psi\bigl(\Phi_\psi^*\omega_\psi\bigr).
$$

[Gauss–Manin接続のde Rham表示](../../DEF/DEF1-12/index.md#prop-def1-12-de-rham-formula)では、この微分した閉形式のコホモロジー類が $\nabla_{\partial_\psi}^{\mathrm{GM}}[\omega_\psi]$ となる。完全形式を代表に足しても閉路上の積分はStokesの定理で零であり、元のファイバーに戻せば所望の式を得る。正則性は[前講の周期の正則性](../MIR1-07/index.md#prop-mir1-07-period-holomorphic)で、固定管状サイクルと正則な被積分関数から従う。$\square$
<!-- proof-end -->

**確認例：積族では余分な微分が生まれない。** $X_\psi=X$、$\omega_\psi=(1+\psi)\eta$（$\eta$ は固定された閉3形式）なら、平行閉路 $\gamma$ の周期は $\Pi=(1+\psi)\int_\gamma\eta$。局所定数枠で $\nabla_{\partial_\psi}[(1+\psi)\eta]=[\eta]$ となり、双方の微分は $\int_\gamma\eta$ に一致する。閉路を任意に取り替えると、この結論は保証されない。

## 3. 留数表示から導関数を実際に計算する

[管状サイクルの留数公式](../MIR1-07/index.md#prop-mir1-07-tube)を使えば、ファイバー上の動く積分を、周囲の射影空間上の固定した管状4サイクル $T_0$ の積分へ移せる。$\psi_0$ 近傍で $T_0$ がすべての $X_\psi$ を避けるよう円板を縮める。

<a id="prop-mir1-08-pole-derivatives"></a>

<!-- formal-statement-start -->
> **命題（Dwork周期の高次パラメータ微分）**
>
> $\psi_0^5\ne1$ の周りに十分小さい円板 $D$ を取り、コンパクトな閉4サイクル $T_0\subset\mathbb P^4$ がすべての $\psi\in D$ で $X_\psi$ と交わらないとする。$\Pi(\psi)=(2\pi i)^{-1}\int_{T_0}\Omega/F_\psi$ とおく。このとき任意の整数 $k\ge0$ について、

$$
\Pi^{(k)}(\psi)
=\frac{k!\,5^k}{2\pi i}
\int_{T_0}\frac{P^k\Omega}{F_\psi^{\,k+1}}.
$$

> ここで微分は $\psi$ に関して行い、$P$ と $\Omega$ は $\psi$ に依存しない。右辺は高次の極を持つ有理4形式の**管状積分**であって、単純極の留数定義をそのまま当てはめた式ではない。
<!-- formal-statement-end -->

### 証明の見取り図

$\partial_\psi F_\psi=-5P$ を使って逆数を微分する。一度微分すると分母が二乗になる。二度目以降は積の微分ではなく、$P$ がパラメータに依存しないことを利用する帰納法で係数を決める。

<!-- proof-start -->
### 証明

$\Omega/F_\psi$ は射影空間上の有理4形式だが、斉次多項式 $F_\psi$ の絶対値は射影点上の関数ではない。そこで $T_0$ を覆う有限個のアフィンチャートと、パラメータに依存しない分割の1を選び、積分を各チャート内のコンパクトな台を持つ積分の和にする。任意の小閉円板 $\overline D'\subset D$ について、各チャートでの局所分母 $f_\psi$ はそのコンパクトな台と $\overline D'$ の積で非零なので、$|f_\psi|$ に正の下限がある。局所分子の係数とその有限階の $\psi$ 微分も有界である。従って各局所積分で微分と積分を反復して交換でき、その有限和である管状積分でも交換できる。

$k=0$ は定義そのもの。$\partial_\psi F_\psi=-5P$ だから

$$
\partial_\psi(F_\psi^{-1})
=-F_\psi^{-2}(-5P)=5P F_\psi^{-2}.
$$

任意の $k$ で $\partial_\psi^k(F_\psi^{-1})=k!5^kP^kF_\psi^{-k-1}$ と仮定すると、

$$
\partial_\psi^{k+1}(F_\psi^{-1})
=k!5^kP^k\,(-k-1)F_\psi^{-k-2}(-5P)
=(k+1)!5^{k+1}P^{k+1}F_\psi^{-k-2}.
$$

帰納法と微分積分交換から結論が得られる。$\square$
<!-- proof-end -->

**係数の直接検算。** 最初の3段は

$$
\Pi=\frac1{2\pi i}\int_{T_0}\frac{\Omega}{F_\psi},\qquad
\Pi'=\frac1{2\pi i}\int_{T_0}\frac{5P\Omega}{F_\psi^2},
$$

$$
\Pi''=\frac1{2\pi i}\int_{T_0}\frac{50P^2\Omega}{F_\psi^3},\qquad
\Pi'''=\frac1{2\pi i}\int_{T_0}\frac{750P^3\Omega}{F_\psi^4}.
$$

$5^2\cdot2!=50$、$5^3\cdot3!=750$ であり、符号はいずれも正である。前講の単純極の局所式は $1/F_\psi$ に対するもので、$1/F_\psi^2$ 以降を単純極として扱ってはいけない。次講では、こうした高次極のコホモロジー類を低い極次数で表す手順を学ぶ。

## 4. Hodgeフィルトレーションはどこまで動くか

コホモロジーの平行移動は滑らかな族の**位相的**な同一視であり、正則形式の型を保存するとは限らない。滑らかな射影三次元多様体 $X_\psi$ はコンパクトKählerなので、[純Hodge構造](../../HOD/HOD1-15/index.md#def-hod1-15-pure-hodge)と[Hodgeフィルトレーション](../../HOD/HOD1-15/index.md#def-hod1-15-filtration)を持つ。

重さ3では $H^3(X_\psi,\mathbb C)$ が $H^{3,0}\oplus H^{2,1}\oplus H^{1,2}\oplus H^{0,3}$ に分かれ、

$$
F_\psi^3=H^{3,0},\quad
F_\psi^2=H^{3,0}\oplus H^{2,1},\quad
F_\psi^1=F_\psi^2\oplus H^{1,2},\quad F_\psi^0=H^3
$$

となる。quinticではHodge数が $(h^{3,0},h^{2,1},h^{1,2},h^{0,3})=(1,101,101,1)$ であり、これらの部分空間の次元は順に $1,102,203,204$。次元だけ一定でも、その部分空間が平坦な枠に対して**同じ位置にある**とは限らない。

<a id="prop-mir1-08-hodge-variation"></a>

<!-- formal-statement-start -->
> **命題（Dwork族のGriffiths横断性）**
>
> $U=\{\psi\in\mathbb C:\psi^5\ne1\}$ のDwork族 $\pi:\mathcal X\to U$ に、次数3のGauss–Manin接続 $\nabla^{\mathrm{GM}}$ とHodgeフィルトレーション束 $\mathcal F^p$ を入れる。任意の局所正則切断 $s\in\mathcal F^p$ について、

$$
\nabla_{\partial_\psi}^{\mathrm{GM}}s\in\mathcal F^{p-1}
$$

> が成り立つ。特に正則3形式の類 $[\omega_\psi]\in\mathcal F^3$ について、

$$
\nabla_{\partial_\psi}^{\mathrm{GM}}[\omega_\psi]\in\mathcal F^2.
$$

> ただし一般には $\mathcal F^3$ の中に留まるとは主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

滑らかで固有な正則族という仮定を確認して、既習の[Griffiths横断性](../../DEF/DEF1-13/index.md#thm-def1-13-griffiths)を $k=3$、$B=U$、方向 $\partial_\psi$ に代入する。新しい計算は $F^3$ の生成元が前講の留数形式であることの確認である。

<!-- proof-start -->
### 証明

第1節で $\pi$ が滑らかなファイバーを持つ固有正則沈め込みであることを確かめた。射影的な各ファイバーはコンパクトKählerである。従って[Hodgeフィルトレーションの正則変動](../../DEF/DEF1-13/index.md#thm-def1-13-holomorphic-variation)と[Griffiths横断性定理](../../DEF/DEF1-13/index.md#thm-def1-13-griffiths)の全仮定を満たす。後者に $k=3$、$p$、$\partial_\psi$ を代入すれば第一式を得る。

[前講の大域非消失正則3形式](../MIR1-07/index.md#prop-mir1-07-global-volume)により $\omega_\psi$ は相対正則3形式を与え、$[\omega_\psi]$ は局所正則な $\mathcal F^3$ の切断である。$h^{3,0}=1$ なので各点で非零な $\omega_\psi$ は $F_\psi^3$ を張る。第一式を $p=3$ に適用して第二式を得る。$\square$
<!-- proof-end -->

**微分で型が一段下がる機構。** $v$ を基底の変形方向とし、[Beltrami表示](../../DEF/DEF1-02/index.md#def-def1-02-beltrami-graph)に従って、その代表を局所座標 $u^1,u^2,u^3$ で

$$
\mu_v=\sum_{i,j}\mu^i_{\bar j}\,d\bar u^j\otimes\partial_{u^i}
$$

と書く。$\mu_v\lrcorner\omega$ は $\sum_{i,j}\mu^i_{\bar j}d\bar u^j\wedge\iota_{\partial_{u^i}}\omega$ を表す。[周期写像の微分とKodaira–Spencer収縮](../../DEF/DEF1-13/index.md#prop-def1-13-infinitesimal-period)は、最上段の正則3形式について、接続微分を $F^3$ で割った成分を

$$
[\nabla_v\omega]\bmod F^3
=[-\mu_v\lrcorner\omega]\in F^2/F^3
$$

と表す。局所的に $\omega=h\,du^1\wedge du^2\wedge du^3$ と書くと、$\iota_{\partial_{u^i}}\omega$ は正則微分を一つだけ取り去り、$d\bar u^j$ が一つ加わるので、出力は $(2,1)$ 型となる。

一度の微分で $(1,2)$ 型が突然現れない理由は、この一因子ずつの置換にある。負号は既習のBeltrami規約によるもので、極次数の計算から推測した符号ではない。

**条件の直接確認：楕円曲線の小模型。** $\operatorname{Im}\tau>0$ として $E_\tau=\mathbb C/(\mathbb Z+\tau\mathbb Z)$ を考える。実トーラスの座標 $(x,y)\in\mathbb R^2/\mathbb Z^2$ を固定し、複素座標 $u=x+\tau y$ を採用する。正則1形式は

$$
\eta_\tau=du=dx+\tau\,dy,\qquad
\nabla_{\partial_\tau}^{\mathrm{GM}}[\eta_\tau]=[dy].
$$

固定された平坦枠 $([dx],[dy])$ で微分したため右式を得る。$F^1_\tau=\mathbb C[\eta_\tau]$ は1次元だが、$[dy]$ がその中にあると仮定すると $[dy]=c([dx]+\tau[dy])$ となり、$[dx]$ の係数から $c=0$、$[dy]$ の係数から $1=0$ で矛盾する。一方 $F^0_\tau=H^1(E_\tau,\mathbb C)$ は2次元なので $[dy]\in F^0_\tau$。これは「平坦なのにHodge型が動く」ことを、定義に戻って確認した例である。

## 5. なぜ四階以下の微分方程式が出るのか

周期を何度も微分すると高次極が現れ続ける。しかしそれらのコホモロジー類が住む空間は、有限次元である。「無限に新しい独立な類が生まれるわけではない」ことが、微分方程式への入口になる。

元の滑らかなquinticの第3 Betti数は

$$
b_3(X_\psi)=2+2h^{2,1}(X_\psi)=2+2\cdot101=204
$$

である。一方、ミラー計算では[位相群による正則3形式の不変性](../MIR1-04/index.md#prop-mir1-04-residue-invariant)を利用し、群 $G$ に不変な第3コホモロジーの部分空間を取る。

[Greene–Plesser型のHodge数計算](../MIR1-05/index.md#prop-mir1-05-hodge-count)では、恒等元寄与にあたる不変部分のHodge次元は次のとおりである。

$$
\bigl(h_G^{3,0},h_G^{2,1},h_G^{1,2},h_G^{0,3}\bigr)=(1,1,1,1),
\qquad
\dim_{\mathbb C}H^3(X_\psi,\mathbb C)^G=4.
$$

この内訳では、[正則3形式の群不変性](../MIR1-04/index.md#prop-mir1-04-residue-invariant)が $(3,0)$ の1次元を、上記のJacobian商の計算が $(2,1)$ の1次元を与え、複素共役が残り二つの次元を与える。

接続による保存性も確認する。有限群 $G$ は各ファイバーに作用し、$\pi\circ g=\pi$ を満たす。局所自明化を作る水平分布は、任意のRiemann計量を $G$ で平均してからファイバー接空間の直交補を取れば $G$ と可換に選べる。従ってコホモロジーの平行移動は各 $g^*$ と可換であり、

$$
e_G=\frac1{|G|}\sum_{g\in G}g^*,\qquad
\nabla_{\partial_\psi}^{\mathrm{GM}}(e_Gs)
=e_G\nabla_{\partial_\psi}^{\mathrm{GM}}s
$$

となる。$e_G^2=e_G$ で、その像が $H^3(X_\psi,\mathbb C)^G$ だから、不変部分は接続で保たれる。商とcrepant解消後の第3コホモロジーのランク4とも整合するが、元の第3コホモロジー**全体が4次元なのではない**。

<a id="prop-mir1-08-finite-ode"></a>

<!-- formal-statement-start -->
> **命題（有限ランク接続からの周期微分方程式）**
>
> $D\subset U$ を単連結な小円板とする。$E\to D$ を階数 $r$ の正則ベクトル束、$\nabla$ を正則平坦接続とする。
>
> $s$ を正則切断、$\gamma$ を接続の双対局所系の平行切断とする。両者を組にして周期関数を

$$
\Pi(\psi)=\langle\gamma_\psi,s(\psi)\rangle
$$

> と定める。このとき $D$ の十分小さい開部分で、零でない最高次係数を持つ有理型（meromorphic）係数の斉次線形常微分方程式が存在し、その階数は高々 $r$ である。
>
> 特に、Dwork五次族の $G$ 不変な周期については局所的に階数 **4以下** の方程式が存在する。ただし、これだけから最小階数が4であることや、その係数が特定の多項式であることは結論できない。
<!-- formal-statement-end -->

### 証明の見取り図

$s,\nabla_{\partial_\psi}s,\ldots,\nabla_{\partial_\psi}^{r}s$ は $r+1$ 本の切断である。係数を正則関数から有理型関数まで広げても、ベクトル空間の次元は $r$。従って線形従属な関係が存在する。その関係を平行なサイクルと組にすると、Gauss–Manin微分が周期の普通の導関数へ変わる。

<!-- proof-start -->
### 証明

$D$ の点 $\psi_0$ での有理型関数の芽の体を $K$ とし、$E$ の有理型切断の芽を $E_K$ とする。これは $K$ 上で次元 $r$ のベクトル空間である。$v_k=\nabla_{\partial_\psi}^k s$（$0\le k\le r$）を考えると、$r+1$ 本の $v_k$ は $K$ 上で線形従属だから、

$$
a_0v_0+\cdots+a_mv_m=0,\qquad
a_j\in K,\quad a_m\ne0,\quad 1\le m\le r
$$

という関係が得られる。もし $s=0$ なら $\Pi=0$ が成立し、一階の方程式 $\Pi'=0$ を取ればよい。それ以外では $v_0\ne0$ なので、最初に線形従属となる次数 $m$ は少なくとも1である。分母を払って開領域を縮めれば、$a_j$ は有理型係数として解釈できる。

平行な $\gamma$ に対して、[平行サイクル上の周期微分](../../DEF/DEF1-12/index.md#prop-def1-12-period)により、まず $\Pi'=\langle\gamma,\nabla_{\partial_\psi}s\rangle$ であり、同じ式を $v_1,v_2,\ldots$ に繰り返せば帰納的に $\Pi^{(k)}=\langle\gamma,v_k\rangle$ である。従って上の線形従属関係を $\gamma$ と組にすれば

$$
a_m(\psi)\Pi^{(m)}(\psi)+\cdots+
a_1(\psi)\Pi'(\psi)+a_0(\psi)\Pi(\psi)=0.
$$

$a_m$ が消えない小領域では最高階で割れる。Dwork族の $G$ 不変部分の階数は4で、$s=[\omega_\psi]$ はそこに属するから $r=4$ を代入して結論する。$\square$
<!-- proof-end -->

**誤った推論を避ける。** ランク4から分かるのは「4階以下の何らかの局所方程式がある」ことであって、「いま表示された有理型係数が正則な全領域で使える」「四つの局所解が常に独立」「4階作用素を導出済み」という意味ではない。局所関係の係数には、もとの判別点以外にも見かけの極が現れ得る。次々講では極次数の低減を使って具体的な4階作用素を導く。

**二次元の直接例。** 上の楕円曲線の平行サイクルを $a:x\mapsto(x,0)$、$b:y\mapsto(0,y)$ とすると、

$$
\int_a\eta_\tau=1,\qquad
\int_b\eta_\tau=\tau.
$$

任意の固定整数係数 $m,n$ に対する周期は $\Pi_{ma+nb}(\tau)=m+n\tau$。実際に二度微分して $\Pi''=0$ を得る。コホモロジーのランク2が微分方程式の階数2以下の上限となる、最も単純な計算例である。

## 6. $\psi$ と $z$ の微分を混同しない

[前々講の座標](../MIR1-06/index.md#def-mir1-06-z-coordinate)は、$\psi\ne0$ のもとで $z=(5\psi)^{-5}$ だった。$\psi$ を固定した微分ではなく $z$ 微分を使うときは、局所的な逆関数の分枝を一つ選ばなければならない。

<a id="prop-mir1-08-z-derivative"></a>

<!-- formal-statement-start -->
> **命題（z座標への周期微分の変換）**
>
> $\psi\in\mathbb C^*$、$\psi^5\ne1$ の小さい単連結領域で $z=(5\psi)^{-5}$ とし、$\psi=\psi(z)$ の局所分枝と平行サイクルの周期 $\Pi(\psi)$ を選ぶ。このとき、

$$
\frac{d\psi}{dz}=-\frac{\psi}{5z},\qquad
\frac{d\Pi}{dz}
=-\frac{\psi}{5z}\frac{d\Pi}{d\psi}.
$$

> さらに $\widehat\Pi(z)=\psi(z)\Pi(\psi(z))$ と再規格化した場合は、

$$
\frac{d\widehat\Pi}{dz}
=-\frac{\psi}{5z}\left(\Pi+\psi\frac{d\Pi}{d\psi}\right).
$$

> これらは局所分枝上の式であり、$z=0$ や $\psi=0$ へそのまま代入する式ではない。
<!-- formal-statement-end -->

### 証明の見取り図

$z=5^{-5}\psi^{-5}$ を一度微分し、非零性を使って逆数を取る。再規格化には積の微分が加わるため、単なる変数変換と同じ式にはならない。

<!-- proof-start -->
### 証明

$\psi\ne0$ では

$$
\frac{dz}{d\psi}=-5\cdot5^{-5}\psi^{-6}
=-\frac{5z}{\psi}\ne0.
$$

[逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)から局所逆 $\psi(z)$ が存在し、$d\psi/dz=-\psi/(5z)$。連鎖律を $\Pi(\psi(z))$ に適用して第二式を得る。最後に積の微分より

$$
\frac{d}{dz}(\psi\Pi)
=\frac{d\psi}{dz}\Pi+
\psi\frac{d\Pi}{d\psi}\frac{d\psi}{dz},
$$

ここへ $d\psi/dz$ を代入すれば第三式になる。$\square$
<!-- proof-end -->

**再規格化する理由。** $\zeta^5=1$ とし、射影座標の変換 $h(x_0,x_1,\ldots,x_4)=(\zeta x_0,x_1,\ldots,x_4)$ を考える。計算すると $F_\psi(hx)=F_{\zeta\psi}(x)$ かつ $h^*\Omega=\zeta\Omega$ だから、$h:X_{\zeta\psi}\to X_\psi$ に関して

$$
h^*\omega_\psi=\zeta\,\omega_{\zeta\psi},\qquad
h^*(\psi\omega_\psi)=(\zeta\psi)\omega_{\zeta\psi}.
$$

すなわち $\omega_\psi$ 自身はこの同一視で非自明な倍率を受けるが、$\psi\omega_\psi$ は互換的になる。この関係を確かめずに「$z$ が同じだから周期も同じ」と断言してはいけない。ここでもサイクル側は $h$ により対応させる必要がある。$\psi=0$ では $\psi\omega_\psi$ が零になるため、この規格化は $\psi\ne0$ に限る。

## 7. 演習：平行移動・型・微分方程式を接続する

### Level A：一つの操作を確実に実行する

<a id="ex-mir1-08-a01"></a>
#### MIR1-08-A01 平行周期の微分
- Level: A

積族 $X\times D$ と閉形式 $\eta,\xi$、平行サイクル $\gamma$ に対し $\omega_\psi=\eta+\psi\xi$ とする。周期と微分を計算し、Gauss–Manin微分と照合せよ。

<!-- solution-start -->
**詳細解答。** 積族の局所自明化は恒等写像で、$\gamma$ はパラメータで変わらない。積分の線形性により

$$
\Pi_\gamma(\psi)=\int_\gamma\eta+\psi\int_\gamma\xi.
$$

従って $\Pi_\gamma'=\int_\gamma\xi$。平坦なコホモロジー枠で $[\eta]$ と $[\xi]$ は一定なので、[Gauss–Manin接続の定義](../../DEF/DEF1-12/index.md#def-def1-12-gauss-manin)のLeibniz則から $\nabla_{\partial_\psi}[\eta+\psi\xi]=[\xi]$。その周期も $\int_\gamma\xi$ で一致する。
<!-- solution-end -->

<a id="ex-mir1-08-a02"></a>
#### MIR1-08-A02 二階・三階の極と係数
- Level: A

$\partial_\psi F_\psi=-5P$ を用いて $\partial_\psi^2(\Omega/F_\psi)$ と $\partial_\psi^3(\Omega/F_\psi)$ を計算せよ。

<!-- solution-start -->
**詳細解答。** $\Omega,P$ はパラメータに依存しない。一階微分は $5P\Omega/F_\psi^2$。二階は分母の微分だけが効き、

$$
\partial_\psi^2(\Omega/F_\psi)
=5P\Omega\cdot(-2)F_\psi^{-3}(-5P)
=\frac{50P^2\Omega}{F_\psi^3}.
$$

さらに

$$
\partial_\psi^3(\Omega/F_\psi)
=50P^2\Omega\cdot(-3)F_\psi^{-4}(-5P)
=\frac{750P^3\Omega}{F_\psi^4}.
$$

係数は $2!\,5^2=50$ と $3!\,5^3=750$。負号が二つずつ打ち消される。
<!-- solution-end -->

<a id="ex-mir1-08-a03"></a>
#### MIR1-08-A03 quinticのフィルトレーションの次元
- Level: A

$h^{3,0}=h^{0,3}=1$、$h^{2,1}=h^{1,2}=101$ とする。$F^3,F^2,F^1,F^0$ の次元を求め、$\nabla F^3\subset F^2$ という条件が何を禁じるか述べよ。

<!-- solution-start -->
**詳細解答。** [Hodgeフィルトレーション](../../HOD/HOD1-15/index.md#def-hod1-15-filtration)は第一添字が $p$ 以上のHodge成分の直和なので、

$$
\dim F^3=1,\quad \dim F^2=1+101=102,
$$

$$
\dim F^1=1+101+101=203,\quad
\dim F^0=1+101+101+1=204.
$$

$\nabla_{\partial_\psi}$ が $F^3$ の切断へ作用した結果は $(3,0)$ と $(2,1)$ の和に属する。従って一度の微分で $(1,2)$ や $(0,3)$ の成分が現れることを禁じる。ただし結果が常に $F^3$ に留まるわけではない。
<!-- solution-end -->

<a id="ex-mir1-08-a04"></a>
#### MIR1-08-A04 変数変換の符号
- Level: A

$z=(5\psi)^{-5}$、$\psi\ne0$ のとき $d\psi/dz$ を計算し、$\Pi(\psi)=\psi^2$ について $d\Pi/dz$ を二通りで求めよ。

<!-- solution-start -->
**詳細解答。** $dz/d\psi=-5z/\psi$ だから $d\psi/dz=-\psi/(5z)$。連鎖律で

$$
\frac{d\Pi}{dz}=2\psi\left(-\frac{\psi}{5z}\right)
=-\frac{2\psi^2}{5z}.
$$

別法として $\psi^5=(5^5z)^{-1}$ より、局所分枝で $\Pi=\psi^2=(5^5z)^{-2/5}$。べきの微分は $(-2/5)(5^5)^{-2/5}z^{-7/5}$ となり、これは $-2\psi^2/(5z)$ に一致する。
<!-- solution-end -->

### Level B：仮定・座標・型の違いを説明する

<a id="ex-mir1-08-b01"></a>
#### MIR1-08-B01 楕円曲線の横断性を両方の周期で調べる
- Level: B

$E_\tau=\mathbb C/(\mathbb Z+\tau\mathbb Z)$、$\operatorname{Im}\tau>0$、$\eta_\tau=dx+\tau dy$ とする。$a,b$ サイクルの周期、Gauss–Manin微分、$F^1$ に留まらない理由を示せ。

<!-- solution-start -->
**詳細解答。** 実トーラスの基底サイクルを $a:(x,y)=(t,0)$ と $b:(x,y)=(0,t)$（$0\le t\le1$）とする。$a$ 上では $dx=dt,dy=0$、$b$ 上では $dx=0,dy=dt$ なので

$$
\int_a\eta_\tau=1,\qquad\int_b\eta_\tau=\tau.
$$

固定平坦枠で $\nabla_{\partial_\tau}[\eta_\tau]=[dy]$。微分周期は $0$ と $1$ となり、上の式の $\tau$ 微分と一致する。もし $[dy]=c[\eta_\tau]$ なら平坦基底 $([dx],[dy])$ における成分比較は $(0,1)=c(1,\tau)$ となる。第一成分で $c=0$、第二成分で $1=0$ は矛盾。したがって $\nabla\eta_\tau\notin F^1$ だが $F^0=H^1$ に入るので[横断性](../../DEF/DEF1-13/index.md#thm-def1-13-griffiths)と整合する。
<!-- solution-end -->

<a id="ex-mir1-08-b02"></a>
#### MIR1-08-B02 群不変部分のランクを区別する
- Level: B

元のquinticのHodge数が $(1,101,101,1)$、$G$ 不変な各Hodge成分の次元が $(1,1,1,1)$ とする。両者の第3 Betti数を求め、有限ランクの議論だけから言える常微分方程式の階数の上限を答えよ。

<!-- solution-start -->
**詳細解答。** 複素第3コホモロジーの次元はHodge成分の次元の総和だから、元の空間では $1+101+101+1=204$、不変部分では $1+1+1+1=4$。Gauss–Manin接続は群作用と可換なので、不変部分の切断を繰り返し微分しても不変部分から出ない。そのため元の空間だけを使った一般的な上限は204階、不変部分に属する切断の周期では4階以下である。独立な4本の微分類を検証していないので、最小階数が4とはまだ断定できない。
<!-- solution-end -->

<a id="ex-mir1-08-b03"></a>
#### MIR1-08-B03 正規化とz微分は交換しない
- Level: B

$z=(5\psi)^{-5}$、$\widehat\Pi(z)=\psi\Pi(\psi)$ とする。$\Pi(\psi)=c$（定数）の場合と $\Pi(\psi)=\psi$ の場合に $\widehat\Pi'(z)$ を計算し、「$\widehat\Pi'=\psi\Pi'$」が成り立たない理由を示せ。

<!-- solution-start -->
**詳細解答。** まず $\Pi=c$ なら $\widehat\Pi=c\psi$ で

$$
\widehat\Pi'=\frac{d\psi}{dz}\,c
=-\frac{c\psi}{5z}.
$$

次に $\Pi=\psi$ なら $\widehat\Pi=\psi^2$ だから

$$
\widehat\Pi'=2\psi\frac{d\psi}{dz}
=-\frac{2\psi^2}{5z}.
$$

一方、$\psi\,d\Pi/d\psi$ はそれぞれ $0$ と $\psi$ であり、$z$ 微分ですらない。正しい積の微分は

$$
\frac{d(\psi\Pi)}{dz}
=\frac{d\psi}{dz}\Pi+\psi\frac{d\Pi}{d\psi}\frac{d\psi}{dz}.
$$

最初の項が規格化係数の変化、第二項が形式の周期の変化である。$\psi\ne0$ かつ $z\ne0$ の局所分枝上でのみこの計算を行う。
<!-- solution-end -->

<a id="ex-mir1-08-b04"></a>
#### MIR1-08-B04 有理型係数と見かけの極
- Level: B

階数2の平坦束に $s,\nabla s,\nabla^2s$ があるとき、線形従属性から何が従うか。$s$ と $\nabla s$ が独立でない点があっても、なぜ元のファイバーの特異性とは限らないか説明せよ。

<!-- solution-start -->
**詳細解答。** 有理型切断の芽の体 $K$ 上で束の階数が2だから、三つの切断は従属し、$a_0s+a_1\nabla s+a_2\nabla^2s=0$（全係数零ではない）が存在する。平行な双対切断 $\gamma$ と組にすると

$$
a_0\Pi+a_1\Pi'+a_2\Pi''=0.
$$

$a_2\ne0$ の領域では二階方程式であるが、もし最高次係数が恒等的に零なら次数を下げて考える。見かけの極が生まれる仕組みを具体的に見る。局所枠 $e_1,e_2$ を使って $s=s_1e_1+s_2e_2$、$\nabla s=t_1e_1+t_2e_2$ と展開すると、二つの切断を列に並べた係数行列は

$$
A(\psi)=\begin{pmatrix}s_1&t_1\\s_2&t_2\end{pmatrix}
$$

である。この行列は二つの切断が基底をなすかを表し、$\det A=0$ ならその点では係数を一意に解けない。これはファイバーのJacobian判定とは別の行列である。

実際に平坦な積束 $E=D\times\mathbb C^2$ の一定枠で $s=e_1+\psi^2e_2$ とすると、

$$
\nabla s=2\psi e_2,\qquad
\nabla^2s=2e_2,\qquad
\Pi''-\frac1\psi\Pi'=0\quad(\psi\ne0)
$$

となる。$\psi=0$ では $s$ と $\nabla s$ が独立でなく、係数に $1/\psi$ が現れるが、元の平坦束に特異性はない。平行な双対切断と組にした周期は $\Pi=c_1+c_2\psi^2$ と正則である。従って方程式の見かけの極を幾何学的判別点と同一視できない。
<!-- solution-end -->

### Level C：一つの周期から微分方程式の入口まで

<a id="ex-mir1-08-c01"></a>
#### MIR1-08-C01 Dwork五次の周期変動を一続きで説明する
- Level: C

$\psi_0\in\mathbb C^*$、$\psi_0^5\ne1$ を選び、近傍に固定管状サイクル $T_0$ があるとする。$\Pi(\psi)=(2\pi i)^{-1}\int_{T_0}\Omega/F_\psi$ とする。

1. $\Pi',\Pi''$ を積分で表示し、微分積分交換の仮定を明記せよ。
2. $[\omega_\psi]\in F^3$ のGauss–Manin微分がどのフィルトレーションに入るか示し、なぜ $F^3$ 自体に入るとまでは言えないか述べよ。
3. $G$ 不変コホモロジーのランク4から微分方程式が得られる線形代数の手順を述べよ。
4. $z=(5\psi)^{-5}$ に替えて $\widehat\Pi=\psi\Pi$ としたときの微分を導け。また $z=0$ の扱いを説明せよ。

<!-- solution-start -->
**詳細解答。**

(1) $F_\psi=\sum x_i^5-5\psi P$ から $\partial_\psi F_\psi=-5P$。$T_0$ に固定した有限個のアフィンチャートと分割の1を選ぶ。各チャートの局所分母は、対応するコンパクトな積分片と十分小さい閉円板の積で非零だから、その絶対値には正の一様下限がある。従って有理4形式の局所係数と一階・二階の $\psi$ 微分が有界で、局所積分ごとの微分積分交換を二回行える。

$$
\Pi'(\psi)=\frac1{2\pi i}\int_{T_0}\frac{5P\Omega}{F_\psi^2}.
$$

二階では $\partial_\psi(F_\psi^{-2})=-2F_\psi^{-3}(-5P)=10P/F_\psi^3$ を代入し、

$$
\Pi''(\psi)=\frac1{2\pi i}\int_{T_0}
5P\Omega\frac{10P}{F_\psi^3}
=\frac1{2\pi i}\int_{T_0}\frac{50P^2\Omega}{F_\psi^3}.
$$

(2) ファイバーは滑らかな射影多様体でKähler、族は固有正則沈め込みだから[Griffiths横断性](../../DEF/DEF1-13/index.md#thm-def1-13-griffiths)を $p=3$ に適用できる。$\omega_\psi$ は[非消失正則3形式](../MIR1-07/index.md#prop-mir1-07-global-volume)なので $[\omega_\psi]\in F^3$、従って $\nabla_{\partial_\psi}[\omega_\psi]\in F^2=H^{3,0}\oplus H^{2,1}$ である。横断性は一段下までの包含しか保証せず、変形で $(2,1)$ 成分が現れる可能性を排除しない。実際、楕円曲線の小模型では微分が最上段から出る。

(3) [既出の群不変なHodge数計算](../MIR1-05/index.md#prop-mir1-05-hodge-count)から不変部分の次元は $1+1+1+1=4$。群作用と接続は可換で、$\omega_\psi$ は群不変だから、五つの切断

$$
s,\ \nabla s,\ \nabla^2s,\ \nabla^3s,\ \nabla^4s,\qquad s=[\omega_\psi]
$$

はいずれも階数4の有理型切断空間に入る。よって有理型係数で非自明な線形関係が存在する。平行サイクルと組にして $\nabla^k s$ を $\Pi^{(k)}$ へ替えれば、4階以下の局所線形常微分方程式になる。これだけでは具体的係数も最小階数も決まらない。

(4) $dz/d\psi=-5z/\psi\ne0$ なので $d\psi/dz=-\psi/(5z)$。積の微分と連鎖律を順に適用すると

$$
\frac{d\widehat\Pi}{dz}
=\frac{d\psi}{dz}\Pi+\psi\frac{d\Pi}{d\psi}\frac{d\psi}{dz}
=-\frac{\psi}{5z}\left(\Pi+\psi\Pi'\right).
$$

$z=0$ は $\psi\to\infty$ の退化境界であり、上の有限 $\psi$・滑らかな族の局所計算を直接代入してはいけない。そこへの延長や局所解の振る舞いは後のPicard–Fuchs方程式・モノドロミーの問題である。
<!-- solution-end -->

## 8. 次講への接続

今回は「平行サイクルを選ぶ → Gauss–Manin微分で周期の導関数を表す → Hodge型の変化は一段ずつ → 有限ランクから微分方程式が存在する」という鎖を確認した。微分した留数の分母には $F_\psi^2,F_\psi^3,\ldots$ が現れる。次の **MIR1-09** では、この高次極をJacobianの関係と全微分で低減し、有限階の方程式を実際に計算できる形へ近づける。

**参考文献**：[D. Cox / S. Katz, *Mirror Symmetry and Algebraic Geometry*](https://doi.org/10.1090/surv/068)、[K. Horiほか, *Mirror Symmetry*](https://www.claymath.org/resource/mirror-symmetry/)、[C. Voisin, *Hodge Theory and Complex Algebraic Geometry II*](https://www.cambridge.org/core/books/hodge-theory-and-complex-algebraic-geometry-ii/47F0D9D694725A426F9CAFDFA830DB11)。Gauss–Manin接続・横断性の一般証明はリンク先の既習講義を用い、本講はDwork族に適用した。
