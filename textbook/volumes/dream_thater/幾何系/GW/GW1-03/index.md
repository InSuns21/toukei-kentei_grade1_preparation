# GW1-03 楕円型正則性と線形化

<!-- definition-example-audit: strict -->

## 1. 方程式を解く前に「解の近く」を測る

[前講の擬正則方程式](../GW1-02/index.md#def-gw1-02-cr-operator)は、滑らかな写像 $u:(\Sigma,j)\to(X,J)$ に対し $\bar\partial_Ju=0$ を要求した。[エネルギー恒等式](../GW1-02/index.md#thm-gw1-02-energy-identity)は解の大きさを制約する。しかし解を少し動かしたとき再び解になるか、解全体の局所的な自由度はいくつか、という問いには答えていない。

有限次元で $F(x)=0$ を調べるときは、まず微分 $dF_x$ の核と余核を調べる。ここでも同じ考えを使う。ただし未知数は写像だから無限次元であり、「滑らかな写像全体」の微分だけから有限次元の解集合を結論することはできない。**微分を何階まで二乗可積分に制御するかを指定し、線形化が楕円型であることを確かめる**。楕円性が、無限次元の方程式に有限次元の核・余核をもたらす。

本講の基本設定は、連結な**コンパクト・境界なし**のRiemann面 $(\Sigma,j)$（種数 $g$）、滑らかな $2m$ 次元概複素多様体 $(X,J)$、滑らかな写像 $u:\Sigma\to X$ とする。$X$ のコンパクト性は局所線形化と固定された $u$ のFredholm性には不要である。$TX$ の複素階数は $m$、$\chi(\Sigma)=2-2g$ とする。後でシンプレクティック曲線を考える場合は前講と同じ適合 $(\omega,J)$ を用いる。

## 2. なぜSobolev完備化を使うのか

[多様体Sobolev空間](../../GA/GA2/index.md#def-ga2-sobolev)は、座標ごとの弱微分を積分してノルムを作り、滑らかな対象の極限も収容する。この発想を写像にも用いる。まず滑らかな $u$ に沿う束 $E=u^*TX$ を固定し、標的のRiemann計量と[切断の接続](../../CM/CM2-10/index.md#def-cm2-10-connection)を一つ選ぶ。この接続により切断 $\xi$ の共変微分 $\nabla\xi$ を測れる。

<a id="def-gw1-03-sobolev-sections"></a>

<!-- formal-statement-start -->
> **定義（写像に沿うSobolev切断）**  
> コンパクトRiemann面 $\Sigma$ 上の滑らかな実ベクトル束 $E$ に計量と接続を固定する。整数 $k\ge0$ に対し、滑らかな切断のノルム

$$
\|\xi\|_{H^k(E)}^2=\sum_{\ell=0}^k\int_\Sigma|\nabla^\ell\xi|^2\,d\operatorname{vol}_\Sigma
$$

> による完備化を $H^k(\Sigma,E)$ とする。$H^0=L^2$ である。有限個の座標・局所枠による定義はこれと同値であり、異なる滑らかな計量・接続でも同じ空間を与える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gw1-03-sobolev-sections -->
**定義の確認**。平坦な単位トーラス $T^2=\mathbb R^2/\mathbb Z^2$ 上の自明複素線束で $\xi(s,t)=e^{2\pi i(ns+kt)}$ とする。これは周期的で滑らかな切断であり、$|\xi|=1$、$|\partial_s\xi|^2=(2\pi n)^2$、$|\partial_t\xi|^2=(2\pi k)^2$ なので

$$
\|\xi\|_{H^1}^2=1+4\pi^2(n^2+k^2).
$$

$L^2$ だけでは高周波の微分を検出できないが、$H^1$ は検出する。接続を滑らかな行列値1形式 $A$ だけ替えると $\nabla'\xi=\nabla\xi+A\xi$ となり、コンパクト性から $\|A\xi\|_2\le C\|\xi\|_2$。逆向きも $-A$ で評価でき、$H^1$ ノルムの同値性が見える。
<!-- definition-example-end -->

[GA2のSobolev埋め込み](../../GA/GA2/index.md#thm-ga2-embedding)を二次元・$k=2$ に適用すると $H^2$ の写像は連続な代表を持つ。標的の指数写像で基準写像 $u$ の近くを $v=\exp_u\xi$ と書けば、小さな $\xi\in H^2(u^*TX)$ は $H^2$ 写像の局所座標になる。積・合成のSobolev評価により、滑らかな $J$ のもとで

$$
\bar\partial_J:H^2(\Sigma,X)\longrightarrow
H^1\bigl(\Sigma,\Lambda^{0,1}_{j,J}T^*\Sigma\otimes v^*TX\bigr)
$$

を局所自明化して滑らかな非線形写像として扱える。右辺の束は $v$ によって変わるので、**固定した線形空間への写像ではなく、写像空間上の束の切断**である。$\Lambda^{0,1}$ の実線形元 $A:T\Sigma\to TX$ は $A(jw)=-JA(w)$ を満たし、各点で $A(\partial_s)$ を指定すれば全体が決まる。

## 3. 線形化で生じる三つの項

線形化とは、解 $u$ を $u_\varepsilon$ へ動かし、$\varepsilon=0$ で方程式の値を微分することだ。変化の方向は $\xi=\left.\partial_\varepsilon u_\varepsilon\right|_0\in\Gamma(u^*TX)$ である。標的のRiemann計量のLevi-Civita接続 $\nabla$ で、異なる点の接空間の値を比較する。**接続が捩率零**なので、変分と定義域方向の共変微分を交換できる。

<a id="def-gw1-03-linearization"></a>

<!-- formal-statement-start -->
> **定義（Cauchy–Riemann作用素の線形化）**  
> 滑らかな $J$-正則写像 $u:\Sigma\to X$ と滑らかな概複素構造 $J$ を固定する。$E=u^*TX$ とし、滑らかな変分 $u_\varepsilon$ の初速度 $\xi$ に対して

$$
D_u\xi=\left.\nabla_{\partial_\varepsilon}(\bar\partial_Ju_\varepsilon)\right|_{\varepsilon=0}
$$

> と定める。これは方程式の解 $u$ における実線形な一階微分作用素である。
<!-- formal-statement-end -->

「線形化」は $\xi$ に関して線形でも、一般には複素線形とは限らない。また値域は $E$ 値の反複素線形1形式である。

<a id="prop-gw1-03-local-linearization"></a>

<!-- formal-statement-start -->
> **命題（局所線形化の公式）**  
> $\Sigma$ の正則座標 $z=s+it$ を取り、$u_s=du(\partial_s)$、$u_t=du(\partial_t)$ とする。上の捩率零接続に関し

$$
(D_u\xi)(\partial_s)=\frac12\left(
\nabla_s\xi+J(u)\nabla_t\xi+
(\nabla_\xi J)u_t\right).
$$

> さらに $(D_u\xi)(\partial_t)=-J(D_u\xi)(\partial_s)$ である。ここで $(\nabla_\xi J)$ は $J$ を $(1,1)$ テンソルとして共変微分したものとする。
<!-- formal-statement-end -->

### 証明の見取り図

[非線形作用素の定義](../GW1-02/index.md#def-gw1-02-cr-operator)を $\partial_s$ へ代入し、$u_s$ と $J(u)u_t$ の双方を変分する。後者では積の微分により、**$J$ 自身の変化**が必要になる。

<!-- proof-start -->
### 証明

局所式は次のように書ける。

$$
2\bar\partial_Ju_\varepsilon(\partial_s)
=(u_\varepsilon)_s+J(u_\varepsilon)(u_\varepsilon)_t.
$$

捩率零により、二変数写像 $U(\varepsilon,s,t)$ の方向微分について

$$
\nabla_{\partial_\varepsilon}(U_s)
-\nabla_{\partial_s}(U_\varepsilon)
=T^\nabla(U_\varepsilon,U_s)=0
$$

が成立し、$\varepsilon=0$ で $\nabla_\varepsilon(U_s)=\nabla_s\xi$ となる。積のLeibniz則をもう一方に使うと

$$
\nabla_\varepsilon(J(U)U_t)
=(\nabla_\xi J)u_t+J(u)\nabla_t\xi.
$$

二式を加えて $\tfrac12$ を掛けると公式を得る。すべての $\varepsilon$ で
$\bar\partial_Ju_\varepsilon(\partial_t)=-J(U)\bar\partial_Ju_\varepsilon(\partial_s)$。
変分すると追加項 $-(\nabla_\xi J)\bar\partial_Ju(\partial_s)$ が現れるので、**一般の $u$ では**単純な反複素線形性の式は変分に使用する束の接続の取り方に依存する。特に本命題の後半は **$u$ が擬正則**な場合に成立する。
<!-- proof-end -->

**解でない写像との違い**。命題の第1式自体は、任意の滑らかな $u$ で座標成分の変分公式として成立する。しかし一般の $u$ では、反複素線形性の微分に追加項が現れるため、第2式と値域束の同一視には補正が必要である。本講のFredholm線形化は一貫して $\bar\partial_Ju=0$ の解に沿って定めた。

<!-- definition-example-start: def-gw1-03-linearization -->
**定義の確認**（直接例）。$X=\mathbb C$、$J=i$、標準平坦接続、$u(z)=z^2$ とする。$\nabla J=0$ なので

$$
(D_u\xi)(\partial_s)=\tfrac12(\partial_s\xi+i\partial_t\xi)
=\partial_{\bar z}\xi.
$$

$\xi(z)=z$ なら $\partial_s\xi=1$、$\partial_t\xi=i$ から $D_u\xi=0$。$\xi(z)=\bar z$ なら $\partial_s\xi=1$、$\partial_t\xi=-i$ なので $(D_u\xi)(\partial_s)=1$ となる。滑らかな変分の方向を二つとも実際に代入し、定義の零／非零を判定した。
<!-- definition-example-end -->

## 4. 主シンボル：高周波では何が残るか

線形化の公式には $\nabla\xi$ の一階微分と、$(\nabla_\xi J)u_t$ の零階項がある。高周波で支配するのは一階部分だけである。微分を形式的な余ベクトルに置き換えた行列を調べれば、局所方程式が楕円型かどうか判定できる。

<a id="def-gw1-03-principal-symbol"></a>

<!-- formal-statement-start -->
> **定義（主シンボルと楕円性）**  
> 同じ実階数 $2m$ の束の間の一階作用素 $P=\sum_{a=1}^2 A^a(x)\partial_{x^a}+B(x)$ に対し、零でない実余ベクトル $\eta=\eta_sds+\eta_tdt$ での主シンボルを

$$
\sigma_P(x,\eta)=A^s(x)\eta_s+A^t(x)\eta_t
$$

> と定める（Fourier変換の定義で付く共通因子 $i$ は省く）。すべての $\eta\ne0$ でこれが可逆なら $P$ を楕円型という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gw1-03-principal-symbol -->
**定義の確認**。平面の $\partial_{\bar z}=\tfrac12(\partial_s+i\partial_t)$ は実二次元の値域を複素数として識別すると、主シンボルは複素数 $\tfrac12(\eta_s+i\eta_t)$ の乗法である。$\eta\ne0$ なら絶対値は $|\eta|/2>0$。逆写像は複素共役数を掛けて $4/|\eta|^2$ で割る操作なので可逆性が実際に確認できる。$\eta=0$ では逆がなく、定義がその点を除外する理由も分かる。
<!-- definition-example-end -->

<a id="thm-gw1-03-ellipticity"></a>

<!-- formal-statement-start -->
> **定理（線形化の楕円性）**  
> 閉Riemann面 $\Sigma$ 上の滑らかな $J$-正則写像 $u:\Sigma\to X$ に沿う線形化 $D_u$ の主シンボルは、正則座標で値域の $\partial_s$ 成分を用いて識別すると

$$
\sigma_{D_u}(p,\eta)=\tfrac12(\eta_s I+\eta_tJ_{u(p)}).
$$

> 各 $\eta\ne0$ でこれは実線形同型である。従って $D_u$ は楕円型である。
<!-- formal-statement-end -->

### 証明の見取り図

零階項はシンボルに現れない。$J^2=-I$ により $(aI+bJ)(aI-bJ)=(a^2+b^2)I$ が成り立つ。

<!-- proof-start -->
### 証明

[局所線形化の公式](#prop-gw1-03-local-linearization)で、$\nabla_s\xi=\partial_s\xi+\Gamma(u_s)\xi$、$\nabla_t\xi=\partial_t\xi+\Gamma(u_t)\xi$ と局所枠に展開すると、一階微分の係数は $I/2$ と $J/2$ である。残りはすべて $\xi$ 自身に掛かる零階項である。

$J^2=-I$ を使い

$$
(\eta_sI+\eta_tJ)(\eta_sI-\eta_tJ)
=(\eta_s^2+\eta_t^2)I.
$$

$\eta\ne0$ では $\eta_s^2+\eta_t^2>0$ だから

$$
\sigma_{D_u}(p,\eta)^{-1}
=\frac{2(\eta_sI-\eta_tJ)}{\eta_s^2+\eta_t^2}.
$$

これで各点・各非零余ベクトルの可逆性を直接確認した。値域の $\partial_s$ 成分による識別は、擬正則な $u$ での反複素線形性により正当化される。
<!-- proof-end -->

**何が分かったか。** 任意の高周波方向で一階微分を回収できるので、解の微分が局所的に制御できる。ただし境界のある曲面では楕円性だけではFredholm性を保証しない。境界条件が別に必要になる。

## 5. 楕円型評価から有限次元の核・余核へ

<a id="thm-gw1-03-elliptic-estimate"></a>

<!-- formal-statement-start -->
> **定理（閉曲面上の一階楕円型評価と正則性）**  
> $\Sigma$ を滑らかなコンパクト・境界なし曲面、$E,F$ を同じ実階数の滑らかな計量付き束、$D:C^\infty(E)\to C^\infty(F)$ を滑らかな係数の一階楕円型作用素とする。任意の整数 $k\ge1$ に対し定数 $C_k$ が存在し、

$$
\|\xi\|_{H^k(E)}
\le C_k\left(\|D\xi\|_{H^{k-1}(F)}+\|\xi\|_{L^2(E)}\right)
$$

> が成立する。特に $D\xi=f$ が分布の意味で成り立ち、$f$ が滑らかなら $\xi$ も滑らかである。
<!-- formal-statement-end -->

### 証明の見取り図

固定係数の場合はFourier変換で微分の大きさをシンボルから評価する。変係数では点の近くで係数を凍結し、小さい誤差を左辺へ吸収する。有限個の座標近傍を貼り合わせると大域評価になる。これは[GA6のHodge楕円型評価](../../GA/GA6/index.md#lem-ga6-elliptic)と同じ局所化の機構だが、今回は一階・束間作用素に適用する。

<!-- proof-start -->
### 証明

**固定係数での主要計算。** $D_0=A^s\partial_s+A^t\partial_t$ が $\mathbb R^2$ 上で楕円型なら、単位円上で $\sigma_{D_0}(\eta)^{-1}$ が連続であるため $\min_{|\eta|=1,|v|=1}|\sigma_{D_0}(\eta)v|=c>0$。同次性から

$$
|\sigma_{D_0}(\eta)v|^2\ge c^2|\eta|^2|v|^2.
$$

Fourier変換とPlancherelの等式により、コンパクト台切断 $\zeta$ について

$$
\|\nabla\zeta\|_2^2
=\int|\eta|^2|\widehat\zeta(\eta)|^2\,d\eta
\le c^{-2}\int|\widehat{D_0\zeta}(\eta)|^2\,d\eta.
$$

**変係数での吸収。** 点 $p$ の小円盤に台を持つ $\zeta$ について $D=D_p+R$ と書く。最高階係数の差を $\sup|A(x)-A(p)|<\varepsilon$ にし、零階項を $C\|\zeta\|_2$ で評価すると

$$
\|\nabla\zeta\|_2
\le C\|D\zeta\|_2+C\varepsilon\|\nabla\zeta\|_2+C'\|\zeta\|_2.
$$

円盤を縮め $C\varepsilon<1/2$ とすると右辺の勾配項を吸収できる。有限個の座標と分割関数 $\rho_a$ を選び、$D(\rho_a\xi)=\rho_aD\xi+[D,\rho_a]\xi$ を使う。交換子 $[D,\rho_a]$ は零階なので $L^2$ 項に吸収され、$k=1$ の大域評価を得る。

**高階化と弱解。** 局所化した式に弱微分 $\partial^\alpha$（$|\alpha|=k-1$）を作用させると、$[D,\partial^\alpha]$ の各項は係数の導関数と $\xi$ の高々 $k-1$ 階の微分からなる。帰納的に低階ノルムを右辺へまとめると $H^k$ 評価になる。

初めから弱微分があることを仮定しない場合は、[GA3の差分商による局所正則性](../../GA/GA3/index.md#thm-ga3-local-regularity)と同じく、コンパクト台切断に差分商を適用して一様評価を取り、弱コンパクト性で微分を得る。この一階版では凍結した行列の可逆シンボルによる上記評価が勾配の制御を担当する。

$f$ がすべての $H^{k-1}_{\mathrm{loc}}$ に属するなら帰納的に $\xi$ もすべての $H^k_{\mathrm{loc}}$ に属し、[Sobolev埋め込み](../../GA/GA2/index.md#thm-ga2-embedding)から滑らかとなる。
<!-- proof-end -->

この評価では $\|\xi\|_{L^2}$ を消していない。それは $D\xi=0$ の非零解、すなわち核が存在し得るからである。核が有限次元であることを導くには、[Rellichのコンパクト性](../../GA/GA2/index.md#thm-ga2-rellich)を一緒に使う。

<a id="def-gw1-03-fredholm"></a>

<!-- formal-statement-start -->
> **定義（Fredholm作用素と実指数）**  
> Banach空間の間の有界線形作用素 $D:B_1\to B_2$ が、閉じた像、有限次元の核、有限次元の余核 $B_2/\operatorname{im}D$ を持つときFredholm作用素といい、

$$
\operatorname{ind}_{\mathbb R}D
=\dim_{\mathbb R}\ker D-\dim_{\mathbb R}\operatorname{coker}D
$$

> を実Fredholm指数という。指数は核の次元そのものではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gw1-03-fredholm -->
**定義の確認**。$D:\mathbb R^3\to\mathbb R^2$、$D(x,y,z)=(x,y)$ は有界で、像は $\mathbb R^2$ 全体（閉）、核は $\{(0,0,z)\}$（実一次元）、余核は零。従ってFredholmで指数は $1-0=1$。一方 $D(x,y,z)=(x,0)$ なら核は二次元、像は一次元の閉部分空間、余核も一次元で、指数は $2-1=1$。同じ指数でも核と余核は異なる。
<!-- definition-example-end -->

<a id="thm-gw1-03-fredholm"></a>

<!-- formal-statement-start -->
> **定理（閉曲面上の楕円作用素はFredholm）**  
> 前定理の仮定で、$D:H^1(E)\to L^2(F)$ は実Fredholm作用素である。任意の $k\ge1$ に対する $D:H^k(E)\to H^{k-1}(F)$ もFredholmで、核・余核の次元と指数は $k$ によらない。特に滑らかな擬正則写像に沿う $D_u$ に適用できる。
<!-- formal-statement-end -->

### 証明の見取り図

[楕円型評価](#thm-gw1-03-elliptic-estimate)と[Rellich](../../GA/GA2/index.md#thm-ga2-rellich)を組み合わせ、核の無限個の独立な元や閉じない像が生じるのを防ぐ。余核は形式的随伴 $D^*$ の核に同一視する。

<!-- proof-start -->
### 証明

$D\xi=0$、$\|\xi\|_{L^2}\le1$ の列には評価により $H^1$ 有界性がある。[Rellich](../../GA/GA2/index.md#thm-ga2-rellich)で $L^2$ 収束部分列があり、差に評価を使うと $H^1$ にも収束する。従って核の単位球はコンパクトであり、核は有限次元である。

$L^2$ で核に直交する $\xi$ に対し、$\|\xi\|_{H^1}\le C\|D\xi\|_2$ が成立することを背理法で示す。成立しなければ $\|\xi_n\|_{H^1}=1$、$\xi_n\perp\ker D$、$\|D\xi_n\|_2\to0$ が取れる。Rellichで $\xi_n\to\xi$ が $L^2$ で成り立つ部分列を取り、弱微分の極限を試験切断に対して確認すると $D\xi=0$。直交性から $\xi=0$。しかし楕円型評価に戻すと $\|\xi_n\|_{H^1}\to0$ となり矛盾する。これで核の補空間上の逆評価が得られ、像は閉じる。

コンパクト境界なし多様体では積分による形式的随伴 $D^*$ を定義できる。主シンボルは $\sigma_D(\eta)^*$ なので可逆であり、$D^*$ にも同じ評価と核の有限次元性を適用できる。閉像定理とHilbert空間の直交分解により

$$
\operatorname{coker}D
\simeq(\operatorname{im}D)^\perp
=\ker D^*,
$$

ゆえに余核も有限次元である。高階の核は[正則性定理](#thm-gw1-03-elliptic-estimate)により滑らかな同じ解からなる。余核も随伴の滑らかな核と同一視されるため指数は同じである。
<!-- proof-end -->

非コンパクトな $\Sigma=\mathbb C$ では、標準 $\bar\partial$ に対して局所のシンボル可逆性は変わらないのに、上の証明で使った**有限被覆とRellichの大域コンパクト性**が失われる。境界付き領域でも境界条件なしに同じFredholm結論を述べない。

## 6. 指数公式：なぜ種数とChern数だけで決まるか

**実指数と複素指数を区別する。** $E=u^*TX$ は $J$ によって複素階数 $m$ の束になる。$D_u$ は一般に実線形だが、その主シンボルは複素線形なDolbeault作用素 $\bar\partial_E$ と一致する。両者の違いは零階の束写像である。従って

$$
D_\tau=(1-\tau)\bar\partial_E+\tau D_u,\qquad 0\le\tau\le1
$$

は同じ楕円シンボルを持つ実Fredholm作用素の連続な道である。指数はこの道で一定である（核と余核は別々には跳び得る）。複素線形作用素では実指数は複素指数の二倍となる。

<a id="thm-gw1-03-rr-computation"></a>

<!-- formal-statement-start -->
> **定理（Riemann面上のDolbeault指数の計算）**  
> $\Sigma$ を種数 $g$ のコンパクト・連結Riemann面、$E$ を複素階数 $m$ の滑らかな複素ベクトル束とし、複素線形なDolbeault作用素 $\bar\partial_E$ を任意に一つ選ぶ。このとき

$$
\operatorname{ind}_{\mathbb C}\bar\partial_E
=m(1-g)+\langle c_1(E),[\Sigma]\rangle.
$$

> $c_1(E)$ は第一Chern類、$[\Sigma]$ は複素向きの基本類である。
<!-- formal-statement-end -->

### 証明の見取り図

まず直和を使って階数1へ帰着する。線束は点に対応する正則線束を一回テンソルするとEuler標数が1変わる。基準となる自明線束のEuler標数は $1-g$ である。ここで使うHodge・層の結果は、それぞれ既習定理と直接結び付ける。

<!-- proof-start -->
### 証明

**(1) 基準となる自明線束。** $H^0(\Sigma,\mathcal O)$ はコンパクト連結Riemann面上の正則関数であり、最大値原理から定数のみ、よって複素次元1である。

各Riemann面は複素次元1なので任意のHermite計量の基本2形式 $\omega$ に対し $d\omega=0$（3形式が零）でKählerである。

[Dolbeaultの調和代表](../../HOD/HOD1-06/index.md#thm-hod1-06-dolbeault-harmonic)と[Hodge分解](../../HOD/HOD1-06/index.md#thm-hod1-06-hodge-decomposition)により、$H^1(\Sigma,\mathcal O)$ の次元は $h^{0,1}$ である。複素共役で $h^{1,0}=h^{0,1}$、一方 $b_1=2g=h^{1,0}+h^{0,1}$ だから $h^{0,1}=g$。

従って

$$
\chi(\mathcal O)=h^0-h^1=1-g.
$$

**(2) 点を一つ増やす。** 点 $p$ の小円盤で正則座標 $z$ を使う。[因子が線束を作る構成](../../../代数系/AG/AG2-07/index.md#def-ag2-07-associated-line-bundle)と同じ局所貼り合わせで、正則線束 $L(p)=L\otimes\mathcal O(p)$ を作る。

$p$ の周辺では $L$ の正則枠 $e$ に対し $L(p)$ の局所切断は $z^{-1}f(z)e$ を許す。

$L$ の切断 $f(z)e$ を埋め込んだ商は、$f(0)$ という一つの複素数で決まる。よって層の短完全列

$$
0\longrightarrow\mathcal O(L)
\longrightarrow\mathcal O(L(p))
\longrightarrow\mathbb C_p\longrightarrow0
$$

を得る。$\mathbb C_p$ は点 $p$ だけに台を持ち、$H^0(\mathbb C_p)=\mathbb C$、$H^1(\mathbb C_p)=0$ である。[層コホモロジーの長完全列](../../../代数系/AG/AG3-08/index.md#thm-ag3-08-long-exact)の交代次元和から

$$
\chi(L(p))-\chi(L)=1.
$$

逆に点を一つ引けば差は $-1$ となる。有限の符号付き点の和 $D=\sum n_pp$ について帰納的に $\chi(\mathcal O(D))=1-g+\sum n_p$ を得る。ここで複素次元1の局所 $\bar\partial$-Poincaré補題と滑らかな形式の分割一の性質により、Dolbeault複体は正則切断層の非輪状分解である。[局所補題](../../CM/CM2-03/index.md#thm-cm2-03-local-dbar-poincare)と[Dolbeaultコホモロジーの定義](../../CM/CM2-04/index.md#def-cm2-04-dolbeault-cohomology)から、上の $H^q$ を $\bar\partial_L$ の核・余核と同一視できる。

**(3) 任意の滑らかな線束。** コンパクト向き付き曲面の複素線束は整数の第一Chern数で分類される。

具体的には一点を除いた曲面では $H^2=0$ なので線束を自明化でき、その点の小円盤との境界円上の遷移関数 $S^1\to\mathbb C^\times$ の巻き数が $d=\langle c_1(L),[\Sigma]\rangle$ である。

$\mathcal O(p)$ は局所遷移関数 $z^{-1}$ を使い、正の複素向きで次数 $+1$ を持つ。従って滑らかな複素束として $L\simeq\mathcal O(dp)$。

異なる $\bar\partial$ 構造は同じ一階シンボルを持ち、差は零階なので線形補間で指数が変わらない。このため任意の線束で $\operatorname{ind}_{\mathbb C}\bar\partial_L=1-g+d$。

**(4) 階数 $m$。** $m\ge2$ の複素束は、実二次元の基底上で零でない滑らかな切断を持つ。実際、細胞分割の0・1骨格上で切断を非零に延長でき、2細胞への障害は球面 $S^{2m-1}$ の $\pi_1=0$（$m\ge2$）で消える。Hermite直交補空間で階数を一つ落とし、これを繰り返すと滑らかな複素束として $E\simeq\underline{\mathbb C}^{m-1}\oplus L$ となる。直和上のDolbeault作用素へ零階変形できる。直和の核と余核は各成分の核と余核の直和になるため、指数は各指数の和であり

$$
\begin{aligned}
\operatorname{ind}_{\mathbb C}\bar\partial_E
&=(m-1)\operatorname{ind}_{\mathbb C}\bar\partial_{\mathcal O}
+\operatorname{ind}_{\mathbb C}\bar\partial_L\\
&=(m-1)(1-g)+(1-g+\deg L)\\
&=m(1-g)+\langle c_1(E),[\Sigma]\rangle.
\end{aligned}
$$

最後の $c_1(E)=c_1(L)$ は、$c_1$ を行列式線束から計算すると $\det(E)\simeq\det(\underline{\mathbb C}^{m-1})\otimes L\simeq L$ となることによる。$m=1$ は(3)で済んでいる。以上で公式を得た。
<!-- proof-end -->

<a id="thm-gw1-03-index"></a>

<!-- formal-statement-start -->
> **定理（擬正則写像の線形化の実指数）**  
> $(\Sigma,j)$ を種数 $g$ のコンパクト・連結・境界なしRiemann面、$(X^{2m},J)$ を滑らかな概複素多様体、$u:\Sigma\to X$ を滑らかな $J$-正則写像とする。$E=u^*TX$ と $\beta=u_*[\Sigma]\in H_2(X;\mathbb Z)$ に対し

$$
\operatorname{ind}_{\mathbb R}D_u
=m(2-2g)+2\langle c_1(TX),\beta\rangle.
$$

> これは**固定した定義域の、パラメータ付き写像に関する線形化**の指数であり、標点・再パラメータ化・定義域の複素構造変形の自由度を含まない。
<!-- formal-statement-end -->

### 証明の見取り図

[楕円性](#thm-gw1-03-ellipticity)でFredholm性を、[Dolbeault指数定理](#thm-gw1-03-rr-computation)で指数値を得る。複素指数から実指数への係数2を落とさない。

<!-- proof-start -->
### 証明

$E=u^*TX$ の複素階数は $m$ である。複素接続を選び $\bar\partial_E$ を作ると、そのシンボルは[線形化のシンボル](#thm-gw1-03-ellipticity)と同じである。両作用素の差は零階であり、線形補間の各時点は一階楕円型であるから[閉曲面Fredholm定理](#thm-gw1-03-fredholm)が適用できる。指数は連続なFredholm作用素の道で一定なので

$$
\begin{aligned}
\operatorname{ind}_{\mathbb R}D_u
&=\operatorname{ind}_{\mathbb R}\bar\partial_E
=2\operatorname{ind}_{\mathbb C}\bar\partial_E\\
&=2\{m(1-g)+\langle c_1(E),[\Sigma]\rangle\}.
\end{aligned}
$$

第一Chern類の自然性により $c_1(E)=u^*c_1(TX)$、基本類との評価は $\langle u^*c_1(TX),[\Sigma]\rangle=\langle c_1(TX),u_*[\Sigma]\rangle$。また $2m(1-g)=m(2-2g)$ なので結論を得る。
<!-- proof-end -->

### 直接例：定数写像と射影直線

$u:\mathbb{CP}^1\to X$ が定数なら $E$ は自明な複素階数 $m$ の束、$g=0$、$\beta=0$。従って指数は $2m$。実際 $D_u=\bar\partial$ に零階項はなく、[射影直線のDolbeault群](../../CM/CM2-05/index.md#thm-cm2-05-projective-line-four-groups)から $\ker$ は複素次元 $m$、$\operatorname{coker}=0$ なので $2m$ と一致する。

$X=\mathbb{CP}^1$、$u([Z_0:Z_1])=[Z_0^d:Z_1^d]$（整数 $d\ge1$）を考える。$T\mathbb{CP}^1\simeq\mathcal O(2)$ なので $E\simeq\mathcal O(2d)$。従って $m=1,g=0,c_1(E)[\Sigma]=2d$ を代入して

$$
\operatorname{ind}_{\mathbb R}D_u=2+4d.
$$

標準可積分 $J$ とFubini–Study計量では $D_u$ は正則束のDolbeault作用素に一致し、[射影直線の線束コホモロジー](../../../代数系/AG/AG3-08/index.md#thm-ag3-08-p1-cohomology)によって $\dim_{\mathbb C}H^0(\mathcal O(2d))=2d+1$、$H^1=0$。よって核の実次元は $4d+2$、余核は零であり、指数の具体値を再現する。これは**パラメータ付き**写像の自由度であって、曲線の像の数ではない。

### 横断性と障害はまだ別の問い

$D_u$ が全射なら陰関数定理により（適切な局所座標を固定した）解空間は近傍で滑らかな有限次元多様体となり、実次元は $\dim\ker D_u=\operatorname{ind}_{\mathbb R}D_u$。しかし楕円性・Fredholm性から全射性は従わない。余核が非零なら線形化だけでは局所解空間をその指数次元と判定できない。また、再パラメータ化群の作用、多重被覆の固定点、種数・標点の変形はこの計算の外にある。次講はここから始める。

## 7. 演習：局所公式から指数まで

### Level A

<a id="ex-gw1-03-a01"></a>
#### GW1-03-A01 FourierモードのSobolevノルム
- Level: A

単位平坦トーラス上の $\xi=e^{2\pi i(2s-3t)}$ に対し $\|\xi\|_{H^1}^2$ を計算せよ。

<!-- solution-start -->
**詳細解答**。[Sobolev切断の定義](#def-gw1-03-sobolev-sections)の三項を用いる。$\int|\xi|^2=1$、$\partial_s\xi=4\pi i\xi$、$\partial_t\xi=-6\pi i\xi$ なので二乗微分ノルムは $16\pi^2$ と $36\pi^2$。従って $\|\xi\|_{H^1}^2=1+52\pi^2$。
<!-- solution-end -->

<a id="ex-gw1-03-a02"></a>
#### GW1-03-A02 線形化を実成分で確かめる
- Level: A

$X=\mathbb C$、$J=i$、$u(z)=z^2$、$\xi(z)=\bar z$ で $D_u\xi(\partial_s)$ を求めよ。

<!-- solution-start -->
**詳細解答**。[局所線形化](#prop-gw1-03-local-linearization)で $\nabla J=0$、$\partial_s\xi=1$、$\partial_t\xi=-i$ を代入すると $(D_u\xi)(\partial_s)=\tfrac12(1+i(-i))=1$。よって $\xi$ は核に入らない。
<!-- solution-end -->

<a id="ex-gw1-03-a03"></a>
#### GW1-03-A03 シンボルの逆を検算する
- Level: A

標準 $\mathbb C$ に対し $\eta=3ds+4dt$ で $\sigma=\tfrac12(3+4i)$ の逆写像を計算せよ。

<!-- solution-start -->
**詳細解答**。[この節で定めたシンボル](#def-gw1-03-principal-symbol)から逆の複素数は $\frac2{3+4i}=\frac{2(3-4i)}{3^2+4^2}=\frac{6-8i}{25}$。積は $\tfrac12(3+4i)(6-8i)/25=1$。$|\eta|=5>0$ なので楕円性の条件に一致する。
<!-- solution-end -->

<a id="ex-gw1-03-a04"></a>
#### GW1-03-A04 有限次元の指数と余核
- Level: A

$A:\mathbb R^4\to\mathbb R^3$、$A(x_1,x_2,x_3,x_4)=(x_1,x_2,0)$ の核・余核と指数を求めよ。

<!-- solution-start -->
**詳細解答**。$A(x)=0$ は $x_1=x_2=0$ で、$x_3,x_4$ は自由だから $\dim\ker A=2$。像は $\{(a,b,0)\}$（閉じた二次元部分空間）、商 $\mathbb R^3/\operatorname{im}A$ は第三成分で代表され一次元。従って[指数の定義](#def-gw1-03-fredholm)から $\operatorname{ind}_{\mathbb R}A=2-1=1$。
<!-- solution-end -->

<a id="ex-gw1-03-a05"></a>
#### GW1-03-A05 定数写像の種数依存
- Level: A

種数 $g=2$ の閉Riemann面から実次元6の標的への定数擬正則写像の線形化指数を計算せよ。

<!-- solution-start -->
**詳細解答**。標的の複素次元は $m=3$。定数写像の曲線類 $\beta=0$ なので $c_1(TX)\cdot\beta=0$。[指数公式](#thm-gw1-03-index)に $g=2$ を代入すると $\operatorname{ind}_{\mathbb R}D_u=3(2-4)+0=-6$。負の指数でも核の次元は負ではない。余核が核より6次元大きいことを表す。
<!-- solution-end -->

### Level B

<a id="ex-gw1-03-b01"></a>
#### GW1-03-B01 変分時の $J$ の微分を落とさない
- Level: B

$\bar\partial_Ju(\partial_s)=\tfrac12(u_s+J(u)u_t)$ を使い、$u_\varepsilon$ の変分で線形化を導け。どの仮定で $\nabla_\varepsilon(u_\varepsilon)_t=\nabla_t\xi$ が成立するか述べよ。

<!-- solution-start -->
**詳細解答**。$U(\varepsilon,s,t)=u_\varepsilon(s,t)$ とする。接続の捩率の定義により $\nabla_\varepsilon U_t-\nabla_tU_\varepsilon=T^\nabla(U_\varepsilon,U_t)$ であり、Levi-Civita接続なら右辺は零。従って $\nabla_\varepsilon U_s=\nabla_s\xi$、$\nabla_\varepsilon U_t=\nabla_t\xi$。積の微分は $\nabla_\varepsilon(J(U)U_t)=(\nabla_\xi J)u_t+J\nabla_t\xi$。最初の項と加え二で割れば[局所線形化公式](#prop-gw1-03-local-linearization)の前半となる。$J$ が一定でない場合に $(\nabla_\xi J)u_t$ を消すのは誤りである。
<!-- solution-end -->

<a id="ex-gw1-03-b02"></a>
#### GW1-03-B02 楕円型評価とRellichから核の次元を示す
- Level: B

閉曲面上の一階楕円型 $D$ の核が無限次元だと仮定し矛盾を導け。

<!-- solution-start -->
**詳細解答**。[楕円型評価](#thm-gw1-03-elliptic-estimate)は $D\xi=0$ なら $\|\xi\|_{H^1}\le C\|\xi\|_2$ を与える。核が無限次元なら $L^2$ 直交する単位切断 $\xi_n$ を無限個取れる。そのような列は $H^1$ 有界である。ここで[GA2のRellich埋め込み](../../GA/GA2/index.md#thm-ga2-rellich)を適用すると $L^2$ 収束部分列があるはずだが、相異なる二項の距離は $\|\xi_n-\xi_k\|_2=\sqrt2$ でありCauchy部分列がない。矛盾するので核は有限次元である。
<!-- solution-end -->

<a id="ex-gw1-03-b03"></a>
#### GW1-03-B03 点を加えるとEuler標数が一つ増える
- Level: B

Riemann面の正則線束 $L$ と点 $p$ に対し、短完全列 $0\to L\to L(p)\to\mathbb C_p\to0$ から $\chi(L(p))-\chi(L)$ を求めよ。

<!-- solution-start -->
**詳細解答**。$p$ の局所座標 $z$ では $L(p)$ の切断に $z^{-1}$ までの極を許し、もとの正則切断で割った商は $z^{-1}$ の係数一つ、すなわち $\mathbb C_p$ である。

[長完全列](../../../代数系/AG/AG3-08/index.md#thm-ag3-08-long-exact)の交代次元和を取り $\chi(L(p))=\chi(L)+\chi(\mathbb C_p)$。点層では $h^0=1,h^1=0$ なので差は $+1$。

これは[指数計算](#thm-gw1-03-rr-computation)の次数補正そのものである。
<!-- solution-end -->

<a id="ex-gw1-03-b04"></a>
#### GW1-03-B04 射影直線の次数で核と指数を照合する
- Level: B

$u:\mathbb{CP}^1\to\mathbb{CP}^1$ が次数2の正則写像のとき、指数、核と余核の実次元を計算せよ。

<!-- solution-start -->
**詳細解答**。$E=u^*T\mathbb{CP}^1\simeq\mathcal O(4)$ なので $g=0,m=1,c_1(E)[\Sigma]=4$。[実指数公式](#thm-gw1-03-index)から $2+2\cdot4=10$。標準複素構造に対するDolbeault作用素の核・余核は $H^0(\mathcal O(4))$ と $H^1(\mathcal O(4))$ に対応する。[射影直線の線束コホモロジー](../../../代数系/AG/AG3-08/index.md#thm-ag3-08-p1-cohomology)により前者の複素次元は $4+1=5$、後者は零。実次元は核10・余核0、差は10と一致する。
<!-- solution-end -->

### Level C

<a id="ex-gw1-03-c01"></a>
#### GW1-03-C01 作用素の楕円性から球面写像の自由度へ
- Level: C

$\Sigma=\mathbb{CP}^1$、$X=\mathbb{CP}^1$、$u([Z_0:Z_1])=[Z_0^d:Z_1^d]$（$d\ge1$）とする。次の四点を示せ。

1. 標準 $J$ に関する主シンボルと可逆性
2. $u^*TX$ の次数と実Fredholm指数
3. 全射性と核の次元の検算
4. 指数が「像としての曲線の数」を直ちに与えない理由

<!-- solution-start -->
**詳細解答**。

(1) [シンボルの定理](#thm-gw1-03-ellipticity)から局所正則座標で $\sigma(\eta)=\tfrac12(\eta_s+J\eta_t)$。$\eta\ne0$ に対し $\sigma(\eta)^{-1}=2(\eta_s-J\eta_t)/(\eta_s^2+\eta_t^2)$ だから可逆である。$u$ の分岐点でも、式は $du$ でなく $J$ と $\eta$ だけに依存しており楕円性は失われない。

(2) $T\mathbb{CP}^1\simeq\mathcal O(2)$、次数 $d$ の引き戻しは $\mathcal O(2d)$ だから $\langle c_1(u^*TX),[\Sigma]\rangle=2d$。[指数定理](#thm-gw1-03-index)に $m=1,g=0$ を入れて $\operatorname{ind}_{\mathbb R}D_u=2+4d$。

(3) 可積分な標準 $J$ で $u$ が正則なので、線形化は $\bar\partial_{\mathcal O(2d)}$。前問と同じ[線束コホモロジー](../../../代数系/AG/AG3-08/index.md#thm-ag3-08-p1-cohomology)で $h^0=2d+1$、$h^1=0$。従って余核零すなわち全射であり、核は実次元 $2(2d+1)=4d+2$。指数と一致する。

(4) この核は写像の**パラメータ**も動かせる空間の接空間である。[三点固定による自己同型](../GW1-01/index.md#prop-gw1-01-three-marks)の議論のように、定義域の自己同型で写像を再パラメータ化しても像は変わらない。さらに標点・安定性の条件もまだ課していないため、指数をそのまま曲線の本数と同一視できない。
<!-- solution-end -->

## 8. どこまで証明したか、何が次に残るか

本講は、固定した閉Riemann面上の滑らかな擬正則写像について、線形化の型と符号、楕円シンボル、Sobolev評価、Fredholm性、そして種数・第一Chern数による実指数公式を結んだ。一般のRiemann面上の指数計算には、先行するHodge・層コホモロジーの結果を具体的に適用した。

しかし **指数は局所解空間の実際の次元ではない**。全射性、再パラメータ化商、多重被覆、定義域の変形を別々に調べなければならない。次講「正則性・横断性と多重被覆」でその差を追う。
