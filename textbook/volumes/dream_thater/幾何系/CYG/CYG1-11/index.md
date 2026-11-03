# CYG1-11 Ricci平坦性と特殊ホロノミー

## 1. Ricciが零でも「すべての閉路」はまだ分からない

前章では、連結コンパクトKähler多様体で $c_1(X)_{\mathbb R}=0$ なら、[Yauの定理](../CYG1-10/index.md#thm-cyg1-10-yau)によって**各Kähler類にRicci平坦計量が存在する**ことを学んだ。ただし、これは存在定理であって、初めに選んだ任意の計量がRicci平坦になるわけではない。

では、そのRicci平坦計量で接ベクトルを閉路に沿って平行移動すると、何が保存されるだろう。Kähler接続は長さと複素構造を保存するため、[全ホロノミーのユニタリ性](../../KAH/KAH1-16/index.md#thm-kah1-16-unitary)により $\operatorname{Hol}_x(g)\subseteq U(n)$ である。さらに[制限ホロノミーとRicci平坦性の同値定理](../../KAH/KAH1-16/index.md#thm-kah1-16-su-restricted)は

$$
\rho(g)=0\quad\Longleftrightarrow\quad
\operatorname{Hol}_x^0(g)\subseteq SU(n)
$$

を与える。$U(n)$ は複素内積を保つ行列群、$SU(n)$ はそのうち**複素行列式が1**の行列群である。[全ホロノミー](../../KAH/KAH1-16/index.md#def-kah1-16-holonomy)はすべての閉路、[制限ホロノミー](../../KAH/KAH1-16/index.md#def-kah1-16-restricted)は基点を固定して縮められる閉路だけを見る。

本章の問いは三つに分かれる。

1. なぜRicci形式が「行列式の変化」を測るのか。
2. 縮まない閉路についても行列式1といえるのはいつか。
3. 行列式1と分かっても、なぜホロノミー群が $SU(n)$ **全体**だとは限らないのか。

以降、明示した反例を除いて $X$ は連結な複素次元 $n\ge1$ のKähler多様体、$g$ はそのKähler計量、$\rho$ は

$$
\omega=i g_{j\bar k}\,dz^j\wedge d\bar z^k,\qquad
\rho=-i\partial\bar\partial\log\det(g_{j\bar k})
$$

で定めたRicci形式とする。コンパクト性が必要な箇所では明示する。

## 2. 行列式を追うと、どの曲率が残るか

[標準束と反標準束の定義](../../KAH/KAH1-12/index.md#def-kah1-12-canonical)に従い、接束 $T^{1,0}X$ の最高外冪を $L=\det T^{1,0}X=K_X^{-1}$ と書く。

接束の局所基底 $e_1,\ldots,e_n$ に沿って接続を $De_j=\sum_k e_k A^k{}_j$ と表示すると、同じ接続が $L$ に誘導する係数は $\operatorname{tr}A$ となる。なぜなら

$$
D(e_1\wedge\cdots\wedge e_n)
=\sum_j e_1\wedge\cdots\wedge De_j\wedge\cdots\wedge e_n
=(\operatorname{tr}A)e_1\wedge\cdots\wedge e_n
$$

であり、$De_j$ 中の $e_k$ で $k\ne j$ の項は同じ基底が二度現れて消えるからである。これは「接ベクトルの平行移動の行列式」が「線束 $L$ の平行移動」になる理由を座標で示している。

<a id="prop-cyg1-11-determinant"></a>

<!-- formal-statement-start -->
> **命題（Ricci形式と閉路の行列式）**
>
> $X$ を連結Kähler多様体、$g$ をKähler計量、$x\in X$ とする。$T^{1,0}X$ 上のLevi–Civita接続が誘導する $L=\det T^{1,0}X$ の接続の曲率 $F_L$ は次を満たす。

$$
F_L=-i\rho.
$$

> 閉路 $\gamma$ の平行移動 $P_\gamma\in U(n)$ に対し、$L_x$ 上の平行移動係数は $\det_{\mathbb C}P_\gamma$ である。特に $\rho=0$ なら、縮められる閉路について $\det_{\mathbb C}P_\gamma=1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

曲率公式は[行列式接続の既習命題](../../KAH/KAH1-16/index.md#prop-kah1-16-determinant-transport)で既に証明した。今回は、曲率零と閉路の行列式がつながる部分を復元する。局所的な正則座標で行列式を計算するだけでは、大域閉路の平行移動を決定できない点が重要である。

<!-- proof-start -->
### 証明

[接束の行列式接続の公式](../../KAH/KAH1-12/index.md#prop-kah1-12-determinant-curvature)は $F_L=\bar\partial\partial\log\det G$ を与える。ここで $G=(g_{j\bar k})$ とする。$\bar\partial\partial=-\partial\bar\partial$ と $\rho=-i\partial\bar\partial\log\det G$ から

$$
F_L=-\partial\bar\partial\log\det G=-i\rho.
$$

始点の基底を $u_1,\ldots,u_n$、その平行延長を $U_j(t)$ とすると、誘導接続のLeibniz則により $U_1\wedge\cdots\wedge U_n$ も平行である。終点で $U_j(1)=\sum_k(P_\gamma)^k{}_j u_k$ なので

$$
U_1(1)\wedge\cdots\wedge U_n(1)
=\det_{\mathbb C}(P_\gamma)\,u_1\wedge\cdots\wedge u_n.
$$

縮められる閉路 $\gamma:[0,1]\to X$ を張る円板上で $L$ の単位枠を取り、誘導接続を $d+a$ と書く。ここで $a$ は接続の1形式であり、曲率は円板へ引き戻した $F_L$ に対して $da=F_L$ となる。

平行切断の係数を $c(t)$ と書く。点は曲線のパラメータ $t$ による微分、$a(\dot\gamma)$ は接ベクトル $\dot\gamma(t)$ での1形式の評価である。平行方程式から

$$
\dot c+a(\dot\gamma)c=0
\quad\Longrightarrow\quad
\frac{\dot c}{c}=-a(\dot\gamma)
$$

を得る。初期値 $c(0)\ne0$ は平行移動中も非零だから積分でき、[閉路の行列式と円板積分の既習計算](../../KAH/KAH1-16/index.md#thm-kah1-16-su-restricted)のとおり

$$
\det_{\mathbb C}P_\gamma
=\exp\left(-\oint_\gamma a\right)
=\exp\left(-\int_DF_L\right)
=\exp\left(i\int_D\rho\right).
$$

$\rho=0$ なら右辺は1。区分的に滑らかな零ホモトピック閉路にも平行移動の連続性で拡張できる。$\square$
<!-- proof-end -->

**逆向きも確認しておく。** [制限ホロノミーとの同値定理](../../KAH/KAH1-16/index.md#thm-kah1-16-su-restricted)の逆向きは、小さい円板 $D_\varepsilon$ で $\exp(i\int_{D_\varepsilon}\rho)=1$ を調べる。面積 $O(\varepsilon^2)$ により $\int\rho\to0$ だから十分小さい円板では $\int\rho=0$、面積で割った極限から各 $\rho_x(u,v)=0$ を得る。**制限ホロノミーとRicci平坦性は同値**だが、全ホロノミーには別の大域情報が要る。

## 3. 全閉路を支配する平行な正則体積形式

複素体積を表すのは、[標準束 $K_X$ と大域正則体積形式の対応](../CYG1-01/index.md#def-cyg1-01-criteria)で導入した $(n,0)$ 形式である。形式 $\Omega$ が**平行**とは、その誘導接続で $\nabla\Omega=0$ であることをいう。平行なら、どの曲線に沿っても $\Omega$ の値は変わらない。

逆に、ある一点の非零の複素体積を全閉路が保つなら、始点からの平行移動によって、経路に依存しない大域形式を作れる。ここでは大域的なコンパクト性も、単連結性も必要ない。

<a id="thm-cyg1-11-full-parallel"></a>

<!-- formal-statement-start -->
> **定理（全SU(n)ホロノミーと平行正則体積形式）**
>
> $X$ を連結な複素次元 $n\ge1$ のKähler多様体、$g$ をKähler計量とする。次は同値である。
>
> 1. ある（従って任意の）基点 $x$ で $\operatorname{Hol}_x(g)\subseteq SU(n)$。
> 2. 標準束 $K_X$ にどこでも零にならない大域的な平行切断 $\Omega$ が存在する。
>
> 条件2の $\Omega$ は正則 $(n,0)$ 形式である。また、いずれの条件からも $\rho(g)=0$ が従う。
<!-- formal-statement-end -->

### 証明の見取り図

「平行形式なら閉路が体積を保つ」は行列式の定義で確かめられる。逆向きでは基点の体積を任意の経路で運ぶ。異なる経路は閉路を作るため、全ホロノミーの仮定がちょうど経路独立性を保証する。最後にKähler接続の $(0,1)$ 部分が $\bar\partial$ と一致することを使う。

<!-- proof-start -->
### 証明

まず条件2とする。$x$ のユニタリ基底 $u_1,\ldots,u_n$ を取り、閉路 $\gamma$ に沿う平行移動を $P_\gamma$ とする。$\Omega$ が平行であることから

$$
\Omega_x(P_\gamma u_1,\ldots,P_\gamma u_n)
=\Omega_x(u_1,\ldots,u_n).
$$

左辺は交代多重線形性により $\det_{\mathbb C}(P_\gamma)\Omega_x(u_1,\ldots,u_n)$。右辺の値は $\Omega_x\ne0$ かつ基底であることから非零なので、$\det_{\mathbb C}(P_\gamma)=1$。ユニタリ性と合わせて $P_\gamma\in SU(n)$ となる。

次に条件1とする。$K_{X,x}$ の非零元 $\eta_x$ を選ぶ。$L=\det T^{1,0}X$ 上の平行移動が $\det_{\mathbb C}P_\gamma=1$ であることは[行列式命題](#prop-cyg1-11-determinant)で確認済みで、双対 $K_X=L^*$ 上の閉路の平行移動も1である。任意の $y\in X$ と $x$ から $y$ への区分的に滑らかな経路 $\alpha$ に対し

$$
\Omega_y:=P_\alpha^{K_X}\eta_x
$$

と定める。別の経路 $\beta$ を選ぶと $\alpha$ と $\beta$ を逆向きにつないだ閉路が生じ、その $K_X$ 上の平行移動は1だから $P_\alpha^{K_X}\eta_x=P_\beta^{K_X}\eta_x$。よって定義は経路に依存しない。局所的に滑らかに変わる経路を取ると、接続の平行移動方程式の解の滑らかな依存性から $\Omega$ は滑らかで、各曲線に沿って平行である。

接続はHermite計量を保存するので、非零の $\eta_x$ を運んだ $\Omega$ は全点で非零。Kähler計量のLevi–Civita接続が標準束上で誘導する接続はChern接続であり、その $(0,1)$ 部分が $\bar\partial$ に一致することは[正則束と接続の両立条件](../../KAH/KAH1-16/index.md#prop-kah1-16-volume)の証明で用いた。したがって $\nabla\Omega=0$ から $\bar\partial\Omega=0$ で、$\Omega$ は正則である。

いずれの条件からも $\operatorname{Hol}^0\subseteq SU(n)$。既習の[制限ホロノミーとの同値定理](../../KAH/KAH1-16/index.md#thm-kah1-16-su-restricted)の逆向きから $\rho(g)=0$。$\square$
<!-- proof-end -->

**最小例。** 平坦な $\mathbb C^n/\Lambda$ では、[体積形式 $dz^1\wedge\cdots\wedge dz^n$](../CYG1-04/index.md#prop-cyg1-04-volume-form)が格子の平行移動で不変である。座標枠は平行だから $\Omega$ も平行。全ホロノミーは単に $SU(n)$ に含まれるだけでなく、[実際に自明群](../CYG1-04/index.md#prop-cyg1-04-flat-holonomy)になる。

## 4. コンパクトなとき「正則体積形式」から「平行体積形式」へ

第3節の定理は**平行**形式を仮定する。代数幾何で $K_X\simeq\mathcal O_X$ から直ちに得られるのは、まず**正則**で零にならない形式である。Ricci平坦性とコンパクト性がこの差を埋める。[既習の平行体積形式定理](../CYG1-01/index.md#thm-cyg1-01-parallel-volume)の計算を、使用箇所が見える形で再確認する。

局所正則枠 $\kappa=dz^1\wedge\cdots\wedge dz^n$ で $\Omega=f\kappa$、$f$ は零にならない正則関数とする。計量行列 $G=(g_{j\bar k})$ に対し余接束の計量は逆行列で表されるので、

$$
q:=\|\Omega\|_g^2=\frac{|f|^2}{\det G}>0.
$$

$q$ は大域的な関数である。$f$ の正則対数を局所的に取れるため $\partial\bar\partial\log|f|^2=0$、従って

$$
\partial\bar\partial\log q
=-\partial\bar\partial\log\det G
=-i\rho.
$$

$\rho=0$ なら実関数 $\log q$ はKähler Laplacianに関して調和的である。$X$ が連結コンパクトかつ境界なしなら、[積分による調和関数の定数性とChern接続の既習計算](../CYG1-01/index.md#thm-cyg1-01-parallel-volume)により $\log q$ は定数となる。

このとき、直前に参照した証明に従えば、$\Omega$ 自体を正則枠として見たChern接続の $(1,0)$ 係数は $\partial\log q$、$(0,1)$ 係数は0だから、

$$
\nabla\Omega=(\partial\log q)\otimes\Omega=0.
$$

この最後の一歩が、**ノルム一定**と**平行性**をつなぐ。ノルムだけで直感的に「平行」と決めつけたのではなく、正則枠内でのChern接続公式を使った。

コンパクト性はこの議論で本当に使った。例えば非コンパクトな平坦複素平面 $\mathbb C$ では、$dz$ と $e^z dz$ はともに零にならない正則1形式だが、後者のノルム二乗は $e^{2\operatorname{Re}z}$ で一定ではなく、指定した平坦接続で平行ではない。ここから「非コンパクトなら全ホロノミーが $SU(n)$ に入らない」とは結論しない。平行形式として $dz$ は残っているからである。

<a id="cor-cyg1-11-canonical-full"></a>

<!-- formal-statement-start -->
> **系（Ricci平坦計量の全ホロノミーと標準束）**
>
> $X$ を連結・コンパクト・境界なしの複素次元 $n\ge1$ のKähler多様体とし、$g$ を**Ricci平坦**Kähler計量とする。このとき

$$
K_X\simeq\mathcal O_X
\quad\Longleftrightarrow\quad
\operatorname{Hol}(g)\subseteq SU(n).
$$

> 一方、$\rho(g)=0$ だけからは右辺も左辺も一般には従わない。
<!-- formal-statement-end -->

### 証明の見取り図

左から右は正則体積形式のノルムを調べ、平行性を得てから第3節を使う。右から左は第3節で構成した平行正則体積形式で標準束を自明化する。

<!-- proof-start -->
### 証明

$K_X\simeq\mathcal O_X$ なら、[標準束の自明性と正則体積形式](../CYG1-01/index.md#def-cyg1-01-criteria)から消えない $\Omega$ がある。直前の計算で $\rho=0$、コンパクト性、連結性から $\nabla\Omega=0$。よって[全SU(n)ホロノミーと平行正則体積形式の同値](#thm-cyg1-11-full-parallel)により $\operatorname{Hol}(g)\subseteq SU(n)$。

逆に右辺から[同じ定理](#thm-cyg1-11-full-parallel)によって零にならない大域正則 $(n,0)$ 形式 $\Omega$ がある。線束写像 $\mathcal O_X\to K_X$、$h\mapsto h\Omega$ は各点で線形同型で、逆は正則局所枠での $\Omega$ の非零係数で割ればよい。よって正則線束として $K_X\simeq\mathcal O_X$。$\square$
<!-- proof-end -->

ここで[実第一Chern類の消失とRicci平坦計量の存在](../CYG1-10/index.md#cor-cyg1-10-ricci-flat)を組み合わせると、コンパクトKähler $X$ について $c_1(X)_{\mathbb R}=0$ はRicci平坦**計量の存在**を保証し、$K_X$ の正則自明性はその計量の**全** $SU(n)$ 包含まで保証する。ただし、どちらも等号 $\operatorname{Hol}(g)=SU(n)$ を述べていない。

## 5. 平坦でも縮まない閉路には符号が残る

この区別を実例で確かめる。楕円曲線 $E=\mathbb C/(\mathbb Z+i\mathbb Z)$ の積 $Y=E\times E$ に平坦積計量を入れる。次の写像を考える。

$$
\sigma(z,w)=(z+\tfrac12,-w).
$$

格子商の上で $\sigma^2=\mathrm{id}$。固定点があるなら第1座標で $1/2\in\mathbb Z+i\mathbb Z$ が必要となり矛盾するため、作用は自由である。また $\sigma$ は平坦計量を保ち、商 $X=Y/\langle\sigma\rangle$ はコンパクト平坦Kähler曲面となる。

[平坦商のホロノミー計算](../../KAH/KAH1-16/index.md#prop-kah1-16-flat-quotient)では、$Y$ 上で定数枠の平行移動は $I$ だが、$X$ で閉じる経路を $Y$ に持ち上げると終点が $\sigma$ によって移動する場合がある。接ベクトル $(\delta z,\delta w)$ への微分は、$z\mapsto z+1/2$ の微分が1、$w\mapsto-w$ の微分が $-1$、混合偏微分が零であることから

$$
d\sigma(\delta z,\delta w)=(\delta z,-\delta w),\qquad
[d\sigma]=\begin{pmatrix}1&0\\0&-1\end{pmatrix}.
$$

商の終点の接空間を始点へ戻すのは $d\sigma^{-1}$ であるが、$\sigma^2=\mathrm{id}$ なので $d\sigma^{-1}=d\sigma$ である。従ってこの行列は閉路のホロノミーを表し、全閉路の終点は二枚の被覆のいずれかに限られるので

$$
\rho=0,\qquad
\operatorname{Hol}^0(g)=\{I\},\qquad
\operatorname{Hol}(g)=\{I,\operatorname{diag}(1,-1)\}.
$$

後者には行列式 $-1$ の元があるので $SU(2)$ には入らない。標準束の側でも $Y$ の $dz\wedge dw$ は $\sigma$ によって符号反転するため商へ降りない。しかし二乗 $(dz\wedge dw)^{\otimes2}$ は降り、$K_X^{\otimes2}\simeq\mathcal O_X$ である。コンパクトな $Y$ 上の正則関数が定数であることから、非零で $\sigma$ 不変な正則2形式はほかにも存在せず、$K_X\not\simeq\mathcal O_X$ と分かる。

これは「$F_L=0$ ならどの閉路の平行移動も恒等」という**誤推論への反例**である。曲率零は局所的な平行移動の経路依存を消すが、縮まない閉路の周りの離散的な回転は残りうる。曲率零の $L$ では、行列式の平行移動は閉路のホモトピー類だけで決まり、基本群から単位円への群準同型

$$
\det\operatorname{Hol}:\pi_1(X,x)\longrightarrow U(1)
$$

を定める。これは平坦な行列式線束の**モノドロミー表現**であり、この例ではその像が $\{1,-1\}$ である。基本群からのこの情報を、点ごとのRicci形式の消失だけで読み取ることはできない。

## 6. 積のRicci平坦計量が教える「包含」と「等号」

次は全ホロノミーが確かに $SU(n)$ に含まれても、**真に小さい**例を作る。二つのKähler多様体 $(X_1,g_1)$、$(X_2,g_2)$ の積では、接ベクトルは $(v_1,v_2)$ と二つに分かれる。積計量 $g_1\oplus g_2$ の接続も因子ごとに作用するため、一方の因子の方向が他方へ混ざることはない。

<a id="prop-cyg1-11-product"></a>

<!-- formal-statement-start -->
> **命題（積計量のホロノミー）**
>
> $(X_j,g_j)$（$j=1,2$）を連結Kähler多様体、複素次元をそれぞれ $n_j\ge1$ とする。積 $X_1\times X_2$ に積Kähler計量 $g=g_1\oplus g_2$ を入れる。積の基点と積のユニタリ基底を取ると

$$
\operatorname{Hol}(g)
=\left\{\operatorname{diag}(A,B):
A\in\operatorname{Hol}(g_1),\ 
B\in\operatorname{Hol}(g_2)\right\}\subseteq U(n_1+n_2).
$$

> さらに $g_1,g_2$ がRicci平坦なら $g$ もRicci平坦である。両因子の全ホロノミーがそれぞれ $SU(n_j)$ に含まれれば、積の全ホロノミーは $SU(n_1+n_2)$ に含まれる。
<!-- formal-statement-end -->

### 証明の見取り図

積の接続が対角的であることをまず示し、任意の積の閉路から二因子の閉路へ射影する。逆に一方だけ動かす閉路が両因子のホロノミー元を独立に実現する。

<!-- proof-start -->
### 証明

各因子の局所正則座標を $z^a$（$1\le a\le n_1$）、$w^\mu$（$1\le\mu\le n_2$）とする。Hermite計量の係数は各因子の座標とその共役に依存し、積計量の行列は

$$
G=\begin{pmatrix}G_1(z,\bar z)&0\\0&G_2(w,\bar w)\end{pmatrix}.
$$

[Kähler接続の座標係数](../../KAH/KAH1-03/index.md#prop-kah1-03-chern-coefficients)は

$$
\Gamma^k_{ij}=\sum_\ell g^{k\bar\ell}\partial_i g_{j\bar\ell}
$$

である。$\partial_i$ は全座標 $(z,w)$ の第 $i$ 成分による偏微分、$g^{k\bar\ell}$ は計量行列の逆行列の成分を表す。例えば $i=a$ が第1因子、$j=\mu$ が第2因子なら

$$
\partial_{z^a}g_{\mu\bar\nu}=0,\qquad
g_{\mu\bar b}=0
$$

となる。前者は第2因子の計量係数が第1因子の座標に依存しないため、後者は混合ブロックが零であるためである。逆行列もブロック対角なので、出力添字 $k$ がどちらの因子でも $\Gamma^k_{a\mu}=0$。$z,w$ を交換した場合も同様で、異なる因子間の係数はすべて零となる。

したがって積の曲線 $\gamma(t)=(\gamma_1(t),\gamma_2(t))$ に沿う平行方程式は二本に分離し、

$$
P_\gamma=\operatorname{diag}(P_{\gamma_1},P_{\gamma_2}).
$$

任意の積の閉路は因子ごとの閉路を与えるので、ホロノミーは表示した集合に含まれる。逆に $\gamma_1$ に沿って第1因子だけ動かし第2因子を一定にすれば $\operatorname{diag}(A,I)$ が得られ、第2因子だけ動かせば $\operatorname{diag}(I,B)$ が得られる。両者を合成して任意の $\operatorname{diag}(A,B)$ が得られるため等号である。

また $\det G=(\det G_1)(\det G_2)$ を第1節で定めた $\rho=-i\partial\bar\partial\log\det G$ に代入すると、$\rho(g)=\mathrm{pr}_1^*\rho(g_1)+\mathrm{pr}_2^*\rho(g_2)$。両因子がRicci平坦なら零である。最後に $\det\operatorname{diag}(A,B)=(\det A)(\det B)=1$ で、ユニタリ性も積で保たれる。$\square$
<!-- proof-end -->

**例1：K3曲面と楕円曲線。** [四次K3曲面の標準束自明性](../CYG1-05/index.md#prop-cyg1-05-fermat-smooth-canonical)と[楕円曲線の体積形式](../CYG1-04/index.md#prop-cyg1-04-volume-form)を使い、各因子に[Yauの定理のRicci平坦計量](../CYG1-10/index.md#cor-cyg1-10-ricci-flat)を選ぶ（楕円曲線には平坦計量でよい）。積 $X=S\times E$ は複素次元3で、正則体積形式 $\Omega_S\wedge dz$ があり、

$$
\operatorname{Hol}(g)\subseteq
\left\{\operatorname{diag}(A,1):A\in SU(2)\right\}
\subsetneq SU(3).
$$

右の包含が**真**であることは、$SU(3)$ には第1成分と第3成分を混ぜるユニタリ行列（行列式1）が存在するのに、積のホロノミーは第3成分を固定することで分かる。K3のホロノミーが正確に $SU(2)$ かどうかを先に証明する必要はない。

**例2：K3曲面二つの積。** $S_1\times S_2$ は複素次元4、両因子が単連結K3なら積も単連結である。Ricci平坦積計量を選べば

$$
\operatorname{Hol}(g)\subseteq
SU(2)\times SU(2)\subsetneq SU(4).
$$

つまり**単連結ですら $SU(n)$ との等号には足りない**。積計量が接空間を二つの真の平行直交部分空間に分ける（可約である）ことが等号を阻む。

## 7. 等号を主張するには何が追加で要るか

確認した結論を混ぜずに並べよう。

| 仮定・対象 | 言えること | まだ言えないこと |
| --- | --- | --- |
| 指定したKähler計量で $\rho=0$ | $\operatorname{Hol}^0\subseteq SU(n)$ | 全ホロノミーの包含 |
| さらに $X$ が単連結 | $\operatorname{Hol}=\operatorname{Hol}^0\subseteq SU(n)$ | $SU(n)$ との等号 |
| さらに $X$ がコンパクトで $K_X\simeq\mathcal O_X$（単連結は不要） | 全ホロノミーが $SU(n)$ に含まれる | $SU(n)$ との等号 |
| 平坦な複素トーラス | $\operatorname{Hol}=\{I\}$ | $n\ge2$ で $SU(n)$ 全体とはならない |
| Ricci平坦な $S\times E$（$S$ はK3） | 全ホロノミーは $SU(2)$ ブロックに入る | $SU(3)$ 全体にはならない |

等号 $\operatorname{Hol}=SU(n)$ を主張するには、計量の**既約性**（接空間に真の平行直交分解がないこと）、単連結性、他の特殊ホロノミー型の排除などをさらに検討する必要がある。特に偶数複素次元では、平行な四元数的複素構造を持つ **hyperkähler計量** が現れ、そのホロノミーは四元数線形なユニタリ変換の群 $Sp(m)\subseteq SU(2m)$ に含まれうる。$SU(2)=Sp(1)$ は低次元特例であり、$m\ge2$ の $Sp(m)$ と $SU(2m)$ を同じ群と扱ってはいけない。

これらの可能性を網羅的に分類するBergerのホロノミー分類、および既約分解の大域定理は本章の前提から証明していない外部の深い定理である。K3にRicci平坦計量を入れたときのホロノミーがちょうど $SU(2)$ になるという標準的事実も、その追加議論を要する。本章で証明したのは**包含の正確な条件と、等号が壊れる具体的機構**である。

## 8. 演習：局所曲率、全閉路、積と等号

### Level A

<a id="ex-cyg1-11-a01"></a>
#### CYG1-11-A01 行列式接続の符号
- Level: A

Kähler計量行列 $G$ に対し $F_L=\bar\partial\partial\log\det G$、$\rho=-i\partial\bar\partial\log\det G$ とする。$L=\det T^{1,0}X$ と $K_X=L^*$ の曲率を $\rho$ で表せ。

<!-- solution-start -->
**詳細解答。** 関数 $h=\log\det G$ について $d^2h=0$ の $(1,1)$ 成分は $\bar\partial\partial h=-\partial\bar\partial h$。$\rho=-i\partial\bar\partial h$ から $\partial\bar\partial h=i\rho$ なので

$$
F_L=-\partial\bar\partial h=-i\rho,\qquad
F_{K_X}=-F_L=i\rho.
$$

$L^*$ に誘導した接続の係数1形式は、$L$ 上の係数1形式と符号が逆になるため曲率も逆符号である。
<!-- solution-end -->

<a id="ex-cyg1-11-a02"></a>
#### CYG1-11-A02 体積形式を固定するユニタリ行列
- Level: A

$P\in U(n)$ と非零の交代複素 $n$ 重線形形式 $\eta$ があり、基底 $u_1,\ldots,u_n$ について $\eta(Pu_1,\ldots,Pu_n)=\eta(u_1,\ldots,u_n)$ とする。$P\in SU(n)$ を示せ。

<!-- solution-start -->
**詳細解答。** $Pu_j=\sum_kP^k{}_ju_k$ として交代多重線形性で展開する。同じ $u_k$ を二度含む項は零で、各順列の項の符号付き和が行列式になるから

$$
\eta(Pu_1,\ldots,Pu_n)=\det(P)\eta(u_1,\ldots,u_n).
$$

$\eta\ne0$ で基底上の評価は非零なので両辺をその値で割ると $\det P=1$。与えられた $P\in U(n)$ と合わせて $P\in SU(n)$。
<!-- solution-end -->

<a id="ex-cyg1-11-a03"></a>
#### CYG1-11-A03 平坦トーラスの全ホロノミー
- Level: A

$T=\mathbb C^2/(\mathbb Z+i\mathbb Z)^2$ に正定値定数係数Kähler計量を入れる。$\rho$、全ホロノミー、制限ホロノミーを求め、$\operatorname{Hol}=SU(2)$ か判定せよ。

<!-- solution-start -->
**詳細解答。** 計量行列 $G$ は定数なので $\rho=-i\partial\bar\partial\log\det G=0$。被覆 $\mathbb C^2$ でChristoffel記号は零、平行ベクトルの成分は一定である。閉路の持ち上げの端点は格子平行移動で結ばれ、その微分も $I$。よって全閉路の平行移動が $I$ で、

$$
\operatorname{Hol}(g)=\operatorname{Hol}^0(g)=\{I\}.
$$

$SU(2)$ には例えば $\operatorname{diag}(i,-i)\ne I$ が属するので、包含は真であり等号ではない。
<!-- solution-end -->

<a id="ex-cyg1-11-a04"></a>
#### CYG1-11-A04 正則体積形式のノルム
- Level: A

コンパクト連結Ricci平坦Kähler多様体で零にならない正則 $n$ 形式 $\Omega=f\,dz^1\wedge\cdots\wedge dz^n$ を取る。$q=|f|^2/\det G$ から $\partial\bar\partial\log q=0$ を求め、$q$ が定数となる理由を述べよ。

<!-- solution-start -->
**詳細解答。** $f$ は局所的に正則で非零なので $\log|f|^2=\log f+\overline{\log f}$ と書け、$\partial\bar\partial\log|f|^2=0$。したがって

$$
\partial\bar\partial\log q
=-\partial\bar\partial\log\det G=-i\rho=0.
$$

$q>0$ は大域関数なので $\log q$ は滑らかな実調和関数。コンパクト境界なしで部分積分すると $\int_X|\nabla\log q|^2dV_g=0$、ゆえに勾配零で、連結性から $q$ は定数。
<!-- solution-end -->

<a id="ex-cyg1-11-a05"></a>
#### CYG1-11-A05 複素次元1の例外
- Level: A

$SU(1)$ を定義から求めよ。コンパクトな楕円曲線の平坦計量について $\operatorname{Hol}=SU(1)$ が成立することは、複素次元2以上のトーラスに関する結論と矛盾するか。

<!-- solution-start -->
**詳細解答。** $U(1)=\{z\in\mathbb C:|z|=1\}$ で、一次行列の行列式はその成分 $z$ そのもの。従って $SU(1)=\{1\}$。楕円曲線の平坦計量では全ホロノミーも $\{1\}$ だから等号になる。複素次元2では $SU(2)$ が非自明で $\{I\}\subsetneq SU(2)$ なので、次元の違いによるもので矛盾しない。
<!-- solution-end -->

### Level B

<a id="ex-cyg1-11-b01"></a>
#### CYG1-11-B01 全ホロノミーから体積形式を構成する
- Level: B

連結Kähler多様体のある基点で $\operatorname{Hol}\subseteq SU(n)$ と仮定する。基点で選んだ $K_X$ の非零元を平行移動して大域正則体積形式を構成せよ。経路独立性と正則性を別々に確認すること。

<!-- solution-start -->
**詳細解答。** 基点 $x$ と非零 $\eta_x\in K_{X,x}$ を選ぶ。$x$ から $y$ への経路 $\gamma$ で、候補となる形式を次のように定める。

$$
\Omega_y=P_\gamma^{K_X}\eta_x.
$$

別の経路 $\beta$ との差は閉路を作る。標準束は行列式束の双対なので、その閉路での平行移動係数は

$$
\left(\det P_{\gamma\cdot\beta^{-1}}\right)^{-1}=1.
$$

したがって両経路による値は一致する。局所的に経路族を滑らかに選べば、接続の線形常微分方程式の解が初期値と経路に滑らかに依存するので、$\Omega$ は滑らかになる。定義から $\nabla\Omega=0$ で、計量保存により各点で非零である。最後にKähler接続の $(0,1)$ 部分は $\bar\partial$ だから、$\bar\partial\Omega=0$。よって大域正則体積形式を得た。
<!-- solution-end -->

<a id="ex-cyg1-11-b02"></a>
#### CYG1-11-B02 平坦商のモノドロミー
- Level: B

$E=\mathbb C/(\mathbb Z+i\mathbb Z)$、$Y=E^2$、$\sigma(z,w)=(z+\frac12,-w)$ とする。作用が固定点を持たないこと、商の平坦計量がRicci平坦であること、全ホロノミーが $SU(2)$ に入らないことを検算せよ。

<!-- solution-start -->
**詳細解答。** まず二回作用させると

$$
\sigma^2(z,w)=(z+1,w)=(z,w)
$$

となる。もし固定点があれば、第一因子において $1/2$ は格子 $\mathbb Z+i\mathbb Z$ に入る必要があるが、これは偽なので作用は自由である。

$Y$ 上の定数係数積計量は平行移動と $w\mapsto-w$ の双方で不変だから商へ降り、局所係数行列が定数なので $\rho=0$。一方、$(0,0)$ から $(1/2,0)$ へ進む被覆上の経路は商で閉路になる。被覆上の平行移動は $I$ だが、終端の接空間を始点へ戻す変換は

$$
d\sigma^{-1}=\operatorname{diag}(1,-1),\qquad
\det(d\sigma^{-1})=-1.
$$

従って商の全ホロノミーには行列式 $-1$ の元があり、$SU(2)$ に含まれない。零ホモトピック閉路は被覆でも閉じるため、その平行移動は $I$。制限ホロノミーは $\{I\}$ である。
<!-- solution-end -->

<a id="ex-cyg1-11-b03"></a>
#### CYG1-11-B03 積の接続の分離
- Level: B

複素次元 $p,q$ のKähler多様体に積計量を入れる。各因子の正則座標で、積の混合Christoffel記号が零であることを確かめ、$\operatorname{Hol}(g_1\oplus g_2)=\operatorname{Hol}(g_1)\times\operatorname{Hol}(g_2)$ をブロック埋め込みの意味で示せ。

<!-- solution-start -->
**詳細解答。** 各因子の正則座標を $z,w$ と書く。積計量の係数は $z,\bar z$ または $w,\bar w$ にだけ依存するため、行列は次のブロック表示を持ち、逆行列も同じ構造である。

$$
G=\operatorname{diag}(G_1(z,\bar z),G_2(w,\bar w)).
$$

[Kähler接続の座標係数](../../KAH/KAH1-03/index.md#prop-kah1-03-chern-coefficients)は

$$
\Gamma^k_{ij}=\sum_\ell g^{k\bar\ell}\partial_i g_{j\bar\ell}
$$

である。ここで $\partial_i$ は第 $i$ 正則座標の偏微分である。$i$ が第1因子、$j$ が第2因子の添字なら、$g_{j\bar\ell}$ は第2因子の座標にのみ依存するか、零ブロックに属するため、その第1因子方向の偏微分が零となる。

$i$ と $j$ の因子を交換した場合も同様であり、異なる因子の方向を混ぜる係数は零となる。よって平行移動方程式は分離し、

$$
P_{(\gamma_1,\gamma_2)}
=\operatorname{diag}(P_{\gamma_1},P_{\gamma_2}).
$$

積の閉路からはブロック群への包含が得られる。逆に第一因子のみを動かす閉路で $\operatorname{diag}(A,I)$、第二因子のみを動かす閉路で $\operatorname{diag}(I,B)$ が実現する。それらの合成は $\operatorname{diag}(A,B)$ だから、表示したブロック群全体が積のホロノミーである。
<!-- solution-end -->

<a id="ex-cyg1-11-b04"></a>
#### CYG1-11-B04 K3と楕円曲線の積
- Level: B

標準束が自明なK3曲面 $S$ と平坦楕円曲線 $E$ の積 $S\times E$ にRicci平坦積計量を選ぶ。全ホロノミーが $SU(3)$ に含まれ、しかも等しくないことを、K3単独のホロノミー等号を仮定せずに示せ。

<!-- solution-start -->
**詳細解答。** $K_S\simeq\mathcal O_S$ と $c_1(S)_{\mathbb R}=0$ により[実第一Chern類の消失とRicci平坦計量の存在](../CYG1-10/index.md#cor-cyg1-10-ricci-flat)から $S$ にRicci平坦Kähler計量を選べる。[平行正則体積形式と特殊ユニタリ全ホロノミー](../CYG1-01/index.md#thm-cyg1-01-parallel-volume)により $\operatorname{Hol}(S)\subseteq SU(2)$。$E$ の平坦計量では $\operatorname{Hol}(E)=\{1\}$。[積計量のホロノミー](#prop-cyg1-11-product)から

$$
\operatorname{Hol}(S\times E)\subseteq\{\operatorname{diag}(A,1):A\in SU(2)\}.
$$

右辺は行列式1なので $SU(3)$ に入る。一方、$SU(3)$ には第1・第3標準基底を混ぜる回転行列

$$
\begin{pmatrix}\cos t&0&\sin t\\0&1&0\\-\sin t&0&\cos t\end{pmatrix}
$$

が $0<t<\pi/2$ について属するが、これは第3成分を固定しないので右辺のブロック群には入らない。ゆえに包含は真である。
<!-- solution-end -->

### Level C

<a id="ex-cyg1-11-c01"></a>
#### CYG1-11-C01 複数の「零」と二つのホロノミーを総合判定する
- Level: C

連結コンパクトKähler多様体 $X$ について、次の主張を判定し、成立しないものには具体的な反例または欠けた仮定を示せ。

1. $c_1(X)_{\mathbb R}=0$ なら、いま指定したすべてのKähler計量で $\rho=0$。
2. Ricci平坦な指定計量なら $\operatorname{Hol}^0\subseteq SU(n)$。
3. Ricci平坦な指定計量なら $\operatorname{Hol}\subseteq SU(n)$。
4. $K_X\simeq\mathcal O_X$ なら、Yauの定理で得た任意のRicci平坦Kähler計量は $\operatorname{Hol}\subseteq SU(n)$。
5. $K_X\simeq\mathcal O_X$ でRicci平坦なら $\operatorname{Hol}=SU(n)$。

<!-- solution-start -->
**詳細解答。** 1は偽。[楕円曲線上の非定数係数計量](../CYG1-01/index.md#ex-cyg1-01-nonflat-metric)では $K_X$ が自明なので $c_1(X)_{\mathbb R}=0$ だが、$g_{z\bar z}=1+\varepsilon\cos(2\pi x)$ のRicci形式は $x=0$ で零でない。Yauの定理は**別に選び直す計量の存在**をいう。

2は真。[Ricci平坦性と制限ホロノミーの同値](../../KAH/KAH1-16/index.md#thm-kah1-16-su-restricted)を指定計量へ適用する。

3は偽。第5節の自由な平坦商は $\rho=0$ なのに全閉路の一つの平行移動が $\operatorname{diag}(1,-1)$ で、行列式 $-1$。縮まない閉路に関する情報が欠けている。

4は真。標準束自明なので非零正則体積形式がある。Ricci平坦・コンパクトによりノルムが一定となって平行、[本章の系](#cor-cyg1-11-canonical-full)を適用できる。Kähler類をどれに選んでも、**得られたRicci平坦計量ごとに**同じ包含が成立する。

5は偽。[平坦な複素二次元トーラス](../CYG1-04/index.md#prop-cyg1-04-flat-holonomy)は $K_X$ 自明、Ricci平坦、全ホロノミーは $\{I\}\subsetneq SU(2)$。不足しているのは包含から等号へ進むための既約性などの追加条件である。
<!-- solution-end -->

<a id="ex-cyg1-11-c02"></a>
#### CYG1-11-C02 単連結性と積分解の限界
- Level: C

単連結K3曲面 $S_1,S_2$ にそれぞれRicci平坦Kähler計量を選び、積 $X=S_1\times S_2$ を考える。(i) $X$ が単連結であること、(ii) 全ホロノミーが $SU(4)$ に入ること、(iii) それでも等号でないことを順番に示せ。最後に、この例が破る推論の段階を特定せよ。

<!-- solution-start -->
**詳細解答。** (i) 積の閉路 $\gamma(t)=(\gamma_1(t),\gamma_2(t))$ を任意に取る。K3の単連結性により、各 $\gamma_j$ は基点を固定したホモトピー $H_j(s,t)$ で定数閉路に縮む。積の写像 $H(s,t)=(H_1(s,t),H_2(s,t))$ は $\gamma$ を定数閉路に縮めるので、積も単連結である。

(ii) 各K3は標準束自明で、Ricci平坦を選んだから[平行正則体積形式と特殊ユニタリ全ホロノミー](../CYG1-01/index.md#thm-cyg1-01-parallel-volume)により $\operatorname{Hol}(S_j)\subseteq SU(2)$。[積計量のホロノミー](#prop-cyg1-11-product)を使うと

$$
\operatorname{Hol}(X)
\subseteq\{\operatorname{diag}(A,B):A,B\in SU(2)\}
\subseteq SU(4).
$$

(iii) 積の平行移動は各因子の複素2次元接部分空間を保存する。しかし $SU(4)$ には第1・第3座標を混ぜる実回転（行列式1）があり、その部分空間を保存しない。従ってブロック群は $SU(4)$ の真部分群である。

この例では $\rho=0$、単連結性、全 $SU(4)$ 包含までは何も破綻していない。失敗は**包含から等号を推論する段階**であり、積の平行分解による可約性が原因である。
<!-- solution-end -->

## 9. 次章への橋

Ricci平坦性は指定計量に関する微分幾何の条件、$K_X\simeq\mathcal O_X$ は正則幾何の条件、ホロノミーは平行移動の大域情報である。これらが正確に結び付くのは、**計量の存在と、その計量での全閉路の振る舞いを順に区別したとき**だった。

次のCYG1-12では、平行正則体積形式 $\Omega$ の役割をホロノミーから複素構造の変形へ移す。接ベクトルとの収縮 $\iota_v\Omega$ によって、一次変形と $(n-1,1)$ 型のコホモロジーがどう接続されるかを調べる。
