# YAU1-14 総合証明と仮定の破綻例

## 1. 曲率の指定から存在・一意性まで、どこが論理の橋か

これまでに、[Ricci形式を体積比の方程式へ移す方法](../YAU1-02/index.md#prop-yau1-02-real-potential)、[連続性の方法の開性](../YAU1-05/index.md#thm-yau1-05-openness)、[閉性から得るMonge–Ampère解](../YAU1-12/index.md#thm-yau1-12-existence)を別々に確かめた。しかし「各段階の結論を知っている」ことと「最初の幾何的な問いから最後まで証明を再構成できる」ことは異なる。

例えば体積の整合だけでは、可解な正値計量はまだ得られない。開性だけでは端点まで進めず、全階の微分評価だけでは極限での**正値下限**を確認しなければならない。今回は、どの仮定をどの式で使うか、失うとどこで止まるかを一本の論証にまとめる。

以下、特に断らなければ $X$ は境界のない滑らかな**コンパクト連結**複素多様体、複素次元は $n\ge1$ とする。$\alpha$ は固定Kähler類、その代表 $\omega\in\alpha$ はKähler形式であり、体積を

$$
V=\int_X\omega^n>0
$$

と書く。$\rho(\omega)$ はRicci形式、$\eta$ は指定する滑らかな実閉 $(1,1)$ 形式とする。$\partial,\bar\partial$ は複素構造による微分で、[Ricci形式の局所行列式公式](../../KAH/KAH1-11/index.md#thm-kah1-11-local-ricci)と[正値判定](../../KAH/KAH1-02/index.md#prop-kah1-02-matrix-criterion)を用いる。

まず結論の種類を分離する。

1. **指定Ricci形式**：$[\eta]=2\pi c_1(X)_{\mathbb R}$ を満たす $\eta$ を実際の計量のRicci形式にする。
2. **固定類一意性**：同じ $\alpha$ 内でそのRicci形式を持つKähler形式は一つだけである。
3. **ポテンシャル一意性**：固定した $\omega$ に対する $\varphi$ は定数差だけ不定で、$\int_X\varphi\omega^n=0$ により一つに決まる。

特に $\eta=0$ を指定できる条件と、Ricci平坦性からRiemann曲率が全て消えるかという問いは別である（[前章の零Ricci目標](../YAU1-13/index.md#lem-yau1-13-normalized-density)）。

## 2. 指定Ricci形式の定理を最後まで証明する

前提は「与えられた $\eta$ の類が合う」ことだけであり、**$\eta$ 自体が正値である必要はない**。正値性が要求されるのは未知のKähler計量である。この区別を保って次の主張を考える。

<a id="thm-yau1-14-prescribed-ricci"></a>

<!-- formal-statement-start -->
> **定理（指定Ricci形式に対する総合証明）**
> $X$ を境界のないコンパクト連結Kähler多様体、$\dim_{\mathbb C}X=n\ge1$ とする。$\alpha$ を任意のKähler類、$\omega\in\alpha$ をその代表とし、$\eta$ を滑らかな実閉 $(1,1)$ 形式で

$$
[\eta]=2\pi c_1(X)_{\mathbb R}
$$

> を満たすものとする。このとき、$\alpha$ 内にただ一つのKähler形式 $\widehat\omega$ が存在して $\rho(\widehat\omega)=\eta$ となる。$\widehat\omega=\omega+i\partial\bar\partial\varphi$ と書いたとき、滑らかな実ポテンシャル $\varphi$ は定数差まで一意であり、$\int_X\varphi\omega^n=0$ の条件で一意となる。
<!-- formal-statement-end -->

### 証明の見取り図

コホモロジー類の一致は実Ricciポテンシャル $u$ を作るために使い、その後 $F=-u+C$ を体積で正規化する。$1$ から $e^F$ への正の密度パスに対して、線形化の可逆性が**開性**、$C^0$・二階・三階・高階の一様評価が**閉性**を与える。最後に[Ricci形式の差と体積比](../../CYG/CYG1-10/index.md#prop-cyg1-10-ricci-volume-ratio)で目標へ戻る。一意性は「同じRicci形式なら体積比が定数」という段階を介してMonge–Ampèreの一意性へ帰着させる。

<!-- proof-start -->
### 証明

**第1段階：Ricci形式の差を実関数へ移す。** [Ricci–Chern同定](../../KAH/KAH1-12/index.md#thm-kah1-12-ricci-chern)により $[\rho(\omega)]=2\pi c_1(X)_{\mathbb R}=[\eta]$ である。両者は滑らかな実閉 $(1,1)$ 形式だから、[実Ricciポテンシャルの存在命題](../YAU1-02/index.md#prop-yau1-02-real-potential)で実 $u\in C^\infty(X)$ を選んで

$$
\eta=\rho(\omega)+i\partial\bar\partial u
$$

とできる。$u$ の定数の自由度を一旦残しておく。

**第2段階：密度を体積に合わせる。** $e^{-u}>0$ とコンパクト性から $I=\int_Xe^{-u}\omega^n$ は有限かつ正である。そこで

$$
C=\log\frac VI,\qquad F=-u+C
$$

と置けば

$$
\int_X e^F\omega^n=e^CI=\frac VI I=V.
$$

$u\mapsto u+a$ では $I\mapsto e^{-a}I$、$C\mapsto C+a$ なので $F$ は変わらない。これは[既習の体積正規化](../YAU1-02/index.md#prop-yau1-02-reference-change)と同じ操作である。**この正規化定数と、未知の $\varphi$ の平均ゼロは別物**である。

**第3段階：開性を持つ方程式へ移す。** [許容Kählerポテンシャル](../YAU1-03/index.md#def-yau1-03-positive-domain)の領域で、[正規化密度パス](../YAU1-05/index.md#def-yau1-05-path)

$$
\rho_t=1-t+te^F,\qquad
\omega_{\varphi_t}:=\omega+i\partial\bar\partial\varphi_t>0,\qquad
\omega_{\varphi_t}^n=\rho_t\omega^n,\qquad
\int_X\varphi_t\omega^n=0
$$

を考える。$0\le t\le1$、$e^F$ はコンパクト上で正の最小値を持つので、$m=\min\{1,\min_Xe^F\}>0$、$M=\max\{1,\max_Xe^F\}$ と置くと

$$
0<m\le\rho_t(x)\le M,\qquad
\int_X\rho_t\omega^n=(1-t)V+tV=V.
$$

$t=0$ では $\varphi_0=0$ が解である。任意の可解時刻で局所係数行列を $G=(g_{j\bar k})$、$H=G+(\varphi_{j\bar k})$ と書くと、体積密度は $Q(\varphi)=\det H/\det G$。Jacobiの行列式微分から

$$
\begin{aligned}
DQ|_\varphi(v)
&=\frac{\det H}{\det G}\operatorname{tr}\bigl(H^{-1}(v_{j\bar k})\bigr)\\
&=Q(\varphi)\,g_\varphi^{j\bar k}v_{j\bar k}.
\end{aligned}
$$

正値な $H$ は最高階係数 $g_\varphi^{j\bar k}$ の一様楕円性を局所的に保証する。定数方向の核を平均ゼロで除き、値域を固定体積 $\omega^n$ に関する平均零にすれば、[Poisson線形化の同型定理](../YAU1-05/index.md#thm-yau1-05-poisson-isomorphism)と[陰関数論による開性定理](../YAU1-05/index.md#thm-yau1-05-openness)が使える。従って滑らかな許容解の可解集合 $\mathcal S$ は $[0,1]$ 内で相対開である。

**第4段階：閉性に必要な定数の独立性。** 可解な $t$ 全体に対して、$X,\omega,F$ と $m,M$ は固定されている。[Green核による上限・$L^1$評価](../YAU1-06/index.md#thm-yau1-06-upper-l1)と[勾配エネルギーからのMoser反復](../YAU1-07/index.md#thm-yau1-07-moser)を同じ平均ゼロの $\varphi_t$ に適用すると

$$
\sup_{t\in\mathcal S}\|\varphi_t\|_{C^0(X)}\le C_0.
$$

ここでは最大値原理のみで下限を得たとは主張していない。$L^1$ から $L^\infty$ への引き上げが必要である。

次に相対跡 $S_t=\operatorname{tr}_\omega\omega_{\varphi_t}>0$ に対し、[局所対数跡評価](../YAU1-08/index.md#prop-yau1-08-log-trace)と[最大値原理による大域二階評価](../YAU1-09/index.md#thm-yau1-09-global-second-order)を使う。補助関数

$$
\log S_t-A\varphi_t
$$

の最大点で逆跡 $\sum_j\lambda_j^{-1}$ を抑える。$\lambda_j>0$ を $H$ の $G$ に対する固有値とすれば、

$$
\sum_j\lambda_j=S_t,\qquad
\prod_j\lambda_j=\rho_t\in[m,M],\qquad
\lambda_j\ge\frac{m}{C_2^{\,n-1}}\quad
\text{if }\sum_j\lambda_j\le C_2.
$$

最後の式は $\lambda_j=m/(\prod_{k\ne j}\lambda_k)$ ではなく、$\lambda_j=(\prod_k\lambda_k)/(\prod_{k\ne j}\lambda_k)$ とし、各 $\lambda_k\le C_2$ を代入した結果である。これにより、**全ての可解時刻に共通な** $c,C>0$ で

$$
c\omega\le\omega_{\varphi_t}\le C\omega
$$

を得る。次に[Calabi型三階評価](../YAU1-10/index.md#thm-yau1-10-global-third-order)を適用する。$h$ を $\omega_{\varphi_t}$ の計量、$\Psi=\Gamma(h)-\Gamma(g)$ を接続差とすれば、[Calabi型三階量の定義](../YAU1-10/index.md#def-yau1-10-calabi-energy)により、その平方量は

$$
\mathcal C_t
=h^{i\bar a}h^{j\bar b}h_{k\bar c}
\Psi_{ij}^k\overline{\Psi_{ab}^c}\ge0
$$

も一様に抑えられる。この三階制御と二側計量評価が係数のHölder連続性を与え、[Schauderブートストラップ](../YAU1-11/index.md#thm-yau1-11-higher-estimates)で全ての $k$ に対して

$$
\sup_{t\in\mathcal S}\|\varphi_t\|_{C^{k,\beta}(X)}\le C_{k,\beta}
\quad(0<\beta<1)
$$

を得る。$C_{k,\beta}$ は $t$ に依存しない。

**第5段階：解列を極限へ渡す。** $t_\ell\in\mathcal S$、$t_\ell\to t_\ast\in[0,1]$ を取る。[高階一様評価からの滑らかな部分列](../YAU1-12/index.md#lem-yau1-12-smooth-compactness)により一つの部分列で $\varphi_{t_{\ell_j}}\to\varphi_\ast$ が全階で収束し、平均ゼロも保たれる。とくに二階微分は一様収束するので、上の $c\omega$ 下限を極限に渡して $\omega_{\varphi_\ast}\ge c\omega>0$。局所行列式の連続性で

$$
\omega_{\varphi_\ast}^n
=\lim_{j\to\infty}\rho_{t_{\ell_j}}\omega^n
=\rho_{t_\ast}\omega^n.
$$

つまり[閉性定理](../YAU1-12/index.md#thm-yau1-12-closedness)の仮定と結論をすべて満たす。$\mathcal S$ は相対閉でもある。非空で開かつ閉の $\mathcal S$ は連結区間 $[0,1]$ に等しい。よって $t=1$ に平均ゼロの滑らかな許容解 $\varphi$ があり、

$$
\widehat\omega^n=e^F\omega^n,\qquad
\widehat\omega:=\omega+i\partial\bar\partial\varphi>0.
$$

**第6段階：Ricci指定へ戻す。** $i\partial\bar\partial\varphi$ は完全2形式だから $[\widehat\omega]=[\omega]=\alpha$ である。[Ricci形式の差と体積比](../../CYG/CYG1-10/index.md#prop-cyg1-10-ricci-volume-ratio)を正の二体積形式へ適用して

$$
\begin{aligned}
\rho(\widehat\omega)
&=\rho(\omega)-i\partial\bar\partial\log\frac{\widehat\omega^n}{\omega^n}\\
&=\rho(\omega)-i\partial\bar\partial(-u+C)\\
&=\rho(\omega)+i\partial\bar\partial u=\eta.
\end{aligned}
$$

**第7段階：固定類での一意性。** $\widehat\omega_1,\widehat\omega_2\in\alpha$ が同じ $\eta$ を与えたとする。両者はKählerで、[Ricci形式の差と体積比](../../CYG/CYG1-10/index.md#prop-cyg1-10-ricci-volume-ratio)から

$$
i\partial\bar\partial\log\frac{\widehat\omega_1^n}{\widehat\omega_2^n}=0.
$$

対数比を $h$ と置く。$h$ は実滑らかで、たとえば $\widehat\omega_2$ によるLaplacianで $\Delta_{\widehat\omega_2}h=0$ だから、コンパクト連結性と[強最大値原理](../../GA/GA3/index.md#thm-ga3-strong-maximum)より定数となる。従ってある $a\in\mathbb R$ について

$$
\widehat\omega_1^n=e^a\widehat\omega_2^n.
$$

両者は同じ類なので[体積不変性](../YAU1-03/index.md#prop-yau1-03-compatibility)から共に積分 $V$ を持つ。従って $V=e^aV$、$V>0$ より $a=0$。

二つの形式は基準 $\omega$ からの実ポテンシャルで書ける（[大域 $\partial\bar\partial$-補題による帰着](../YAU1-02/index.md#prop-yau1-02-real-potential)）。同じ体積方程式を満たすので[Monge–Ampère一意性定理](../YAU1-04/index.md#thm-yau1-04-uniqueness)からポテンシャルの差は定数、形式は一致する。平均ゼロならその差 $a_0$ に対して $a_0V=0$ だから $a_0=0$。$\square$
<!-- proof-end -->

この定理に $\eta=0$ を入れると、[零Ricci目標の構成](../YAU1-13/index.md#lem-yau1-13-normalized-density)を再び得る。必要十分な位相条件は $c_1(X)_{\mathbb R}=0$ であり、標準束の正則自明性までは必要ない。また **固定Kähler類を外した一意性ではない**。

## 3. 楕円曲線で、抽象的な七段階を数値の式に戻す

$T=\mathbb C/(\mathbb Z+i\mathbb Z)$、$z=x+iy$、$\omega=i\,dz\wedge d\bar z$ とし、$0<|a|<1$ を固定する。右辺を $e^F=1+a\cos(2\pi x)$ とする。$x,y$ は周期1の実座標、$\omega=2dx\wedge dy$ であるから、

$$
\int_Te^F\omega=2\int_0^1(1+a\cos2\pi x)\,dx=2=V.
$$

[Wirtinger微分の定義](../../CM/CM2-02/index.md#def-cm2-02-wirtinger-operators)より $\partial_z\partial_{\bar z}=\frac14(\partial_x^2+\partial_y^2)$ である。そこで

$$
\varphi_t=-\frac{ta}{\pi^2}\cos(2\pi x),\qquad
\partial_z\partial_{\bar z}\varphi_t=ta\cos(2\pi x)
$$

と置くと

$$
\omega_{\varphi_t}
=(1+ta\cos2\pi x)\omega,\quad
\rho_t=1+ta\cos2\pi x\ge1-|a|>0,\quad
\int_T\varphi_t\omega=0.
$$

したがって全 $t$ で可解であり、二側評価も $1-|a|\le\omega_{\varphi_t}/\omega\le1+|a|$ と目で確認できる。$t=1$ では[Ricci形式の差と体積比](../../CYG/CYG1-10/index.md#prop-cyg1-10-ricci-volume-ratio)から

$$
\rho(\omega_{\varphi_1})
=-i\partial\bar\partial\log(1+a\cos2\pi x).
$$

これは $\rho(\omega)=0$ に対し $u=-\log(1+a\cos2\pi x)$ を取った $\eta=\rho(\omega)+i\partial\bar\partial u$ と一致する。$e^{-u}=1+a\cos2\pi x$ の積分は $V$ なので、正規化定数は $C=0$。この例は**存在の結論だけでなく、密度・正値・平均・Ricci符号**を一度に検算できる。

## 4. 仮定を消したとき、どの歯車が止まるか

### 体積整合を外す：開始前に矛盾する

任意のコンパクトKähler $X$ で $F\equiv\log2$ を選ぶと $\int_Xe^F\omega^n=2V$。しかし[体積不変性](../YAU1-03/index.md#prop-yau1-03-compatibility)により同じ類の許容 $\omega_\varphi$ では $\int_X\omega_\varphi^n=V$ だから、

$$
\omega_\varphi^n=2\omega^n
\quad\Longrightarrow\quad V=2V,
$$

となり $V>0$ に反する。$t>0$ のパスでも $\int_X\rho_t\omega^n=(1+t)V\ne V$。これは「評価が難しい」のではなく、解が存在しないという**厳密な障害**である。

### Kähler正値性を外す：行列式だけでは楕円性を選べない

複素次元2の局所座標で、背景形式を $\omega=i\sum_{j=1}^2 dz^j\wedge d\bar z^j$ とする。$H_+=\operatorname{diag}(1,1)$ と $H_-=\operatorname{diag}(-1,-1)$ はともに行列式1を持つが、

$$
v^\ast H_+v=|v^1|^2+|v^2|^2>0,\qquad
v^\ast H_-v=-|v^1|^2-|v^2|^2<0.
$$

$H_-$ は局所的に $\varphi=-2(|z^1|^2+|z^2|^2)$ を使うと $G+\partial\bar\partial\varphi=-I$ として実現する。しかし $H_-$ はKähler計量ではない。**行列式が正**だけでは、正値領域、線形化の正の二階係数、Moserエネルギーの符号、最大値原理の適用条件を保証できない。この局所例をコンパクトな固定類の反例と取り違えないこと。

実際に平坦な楕円曲線上でも、$\varphi=(a/\pi^2)\cos2\pi x$ に対して係数は $1-a\cos2\pi x$。$a=1$ では $x=0$ で零となり、$a>1$ では負の領域ができる。平均積分はなお整合するが、もはや許容Kähler形式ではない。

### コンパクト性を外す：同じ類・同じRicciでも一意でない

$X=\mathbb C$ 上の $\omega_1=i\,dz\wedge d\bar z$ と $\omega_2=2i\,dz\wedge d\bar z$ は両方とも正で閉じており、係数行列式は定数だから $\rho(\omega_1)=\rho(\omega_2)=0$。さらに

$$
\omega_2-\omega_1=i\partial\bar\partial|z|^2,\qquad
[\omega_1]=[\omega_2]=0\in H^2_{\mathrm{dR}}(\mathbb C).
$$

それでも $\omega_1\ne\omega_2$。どちらの体積も全空間では無限大なので、積分で定数比を1へ固定する段階が使えない。関数は最大値を取るとも限らず、コンパクト上のGreen核・Sobolev定数や解列の部分列抽出もそのままでは移植できない。非コンパクトで追加の成長・境界条件が必要になる理由である。

### 連結性を外す：体積条件も定数差も成分ごとになる

離れた二つの平坦楕円曲線 $X=T_1\sqcup T_2$ の体積をどちらも $V_0>0$ とする。全体で $\int_Xe^F\omega=2V_0$ という条件を課しても、例えば $e^F$ を $T_1$ 上で $3/2$、$T_2$ 上で $1/2$ とすれば積分は

$$
\frac32V_0+\frac12V_0=2V_0
$$

となるが、各成分では目標体積が一致しない。[固定類体積不変性](../YAU1-03/index.md#prop-yau1-03-compatibility)を成分ごとに適用すると解は存在しない。これを一般化しておく。

<a id="prop-yau1-14-components"></a>

<!-- formal-statement-start -->
> **命題（非連結な場合の成分別体積障害）**
> $X=\bigsqcup_{j=1}^r X_j$ を有限個の境界のないコンパクト連結Kähler多様体の非交和とし、$\omega$ を各成分上でKählerな形式、$F\in C^\infty(X;\mathbb R)$ とする。$X$ 上で $\omega+i\partial\bar\partial\varphi>0$ と

$$
(\omega+i\partial\bar\partial\varphi)^n=e^F\omega^n
$$

> を満たす滑らかな実 $\varphi$ が存在するための必要十分条件は、**各成分** $X_j$ で $\int_{X_j}e^F\omega^n=\int_{X_j}\omega^n$ が成立することである。解が存在する場合、ポテンシャルの差は各成分上で定数であり、その定数は成分ごとに独立に選べる。
<!-- formal-statement-end -->

### 証明の見取り図

必要性はStokesの定理を一成分ずつ適用する。十分性は各連結成分での[Monge–Ampère存在定理](../YAU1-12/index.md#thm-yau1-12-existence)を適用する。連結性が使われる定数差一意性も成分ごとに適用すればよい。

<!-- proof-start -->
### 証明

解が存在するなら、各 $X_j$ 上の $\omega_\varphi-\omega=i\partial\bar\partial\varphi$ は完全形式である。[体積不変性の証明](../YAU1-03/index.md#prop-yau1-03-compatibility)を境界のない各 $X_j$ に適用して

$$
\int_{X_j}e^F\omega^n
=\int_{X_j}\omega_\varphi^n
=\int_{X_j}\omega^n
$$

を得る。逆に成分別整合条件があるなら、各 $X_j$ はコンパクト連結であり正値Kähler形式・滑らかな正密度を持つ。[存在定理](../YAU1-12/index.md#thm-yau1-12-existence)で各成分の滑らかな解 $\varphi_j$ を得て、非交和の上で $\varphi|_{X_j}=\varphi_j$ と貼ればよい。成分間の境界で滑らかさを照合する必要はない。

二解の差に[連結成分上の一意性](../YAU1-04/index.md#thm-yau1-04-uniqueness)を適用すると、差は各 $X_j$ 上で定数 $a_j$。逆に独立な $a_j$ を加えても $\partial\bar\partial a_j=0$ なので方程式は変わらない。$\square$
<!-- proof-end -->

例えば $r=2$ で全体の平均ゼロ条件を一つ課すだけなら、$a_1V_0+a_2V_0=0$、すなわち $a_2=-a_1$ という非自明な自由度が残る。連結性は単なる飾りではない。

## 5. 演習：総合証明を自分の手で組み直す

### Level A

<a id="ex-yau1-14-a01"></a>

#### YAU1-14-A01 同じKähler類の体積
- Level: A

コンパクトで境界のないKähler多様体 $X$ で $\omega_\varphi=\omega+i\partial\bar\partial\varphi$ がKählerとする。$\int_X\omega_\varphi^n=\int_X\omega^n$ を示し、$F\equiv\log3$ の体積方程式が解を持たないことを説明せよ。

<!-- solution-start -->
**詳細解答。** $i\partial\bar\partial\varphi=d(i\bar\partial\varphi)$ なので、$\omega_s=\omega+s\,i\partial\bar\partial\varphi$ は閉形式である。$\omega_s$ が正値かどうかはこの積分恒等式には不要で、

$$
\frac d{ds}\omega_s^n
=n\,d(i\bar\partial\varphi)\wedge\omega_s^{n-1}
=n\,d(i\bar\partial\varphi\wedge\omega_s^{n-1}).
$$

Stokesの定理で $\frac d{ds}\int_X\omega_s^n=0$。$s=0,1$ を比べて体積不変性を得る。一方 $F=\log3$ なら右辺の積分は $3V$、左辺は $V$ である。$V>0$ だから $V=3V$ は不可能。
<!-- solution-end -->

<a id="ex-yau1-14-a02"></a>

#### YAU1-14-A02 パスの正値と体積
- Level: A

$e^F$ が滑らかで $0<m\le e^F\le M$、$\int_Xe^F\omega^n=V$ とする。$\rho_t=1-t+te^F$ の上下界と体積を求め、$t=0$ の許容解を挙げよ。

<!-- solution-start -->
**詳細解答。** $0\le t\le1$ で $1-t,t\ge0$、和が1だから点ごとに

$$
\min(1,m)\le(1-t)\cdot1+t e^F(x)\le\max(1,M).
$$

下限は正である。積分は $(1-t)V+tV=V$。$t=0$ で $\rho_0=1$、$\varphi_0=0$ なら $\omega_{\varphi_0}=\omega>0$、$\omega_{\varphi_0}^n=\omega^n$、$\int_X\varphi_0\omega^n=0$ が全て成立する。
<!-- solution-end -->

<a id="ex-yau1-14-a03"></a>

#### YAU1-14-A03 行列式と正値性は違う
- Level: A

$A=\operatorname{diag}(2,1/2)$ と $B=\operatorname{diag}(-2,-1/2)$ を複素二次元のHermite行列とする。行列式を計算し、正値性を定義の二次形式で判定せよ。

<!-- solution-start -->
**詳細解答。** $\det A=2(1/2)=1$、$\det B=(-2)(-1/2)=1$。一方、任意の $v=(v_1,v_2)\ne0$ では

$$
v^\ast Av=2|v_1|^2+\tfrac12|v_2|^2>0,
\qquad
v^\ast Bv=-2|v_1|^2-\tfrac12|v_2|^2<0.
$$

したがって $A$ は正定値で $B$ は負定値。同じ正の行列式を持っても、[Kähler形式の正値判定](../../KAH/KAH1-02/index.md#prop-kah1-02-matrix-criterion)で要求する全ての非零ベクトルへの正の値は後者にない。
<!-- solution-end -->

<a id="ex-yau1-14-a04"></a>

#### YAU1-14-A04 Ricci差の符号と定数
- Level: A

$\eta=\rho(\omega)+i\partial\bar\partial u$、$F=-u+C$ とする。$\omega_\varphi^n=e^F\omega^n$ を満たす許容解について $\rho(\omega_\varphi)=\eta$ を計算せよ。$u$ に定数を加えても目標が変わらないことも示せ。

<!-- solution-start -->
**詳細解答。** 両計量は正値なので体積形式の比は正で対数が取れる。[Ricci形式の差と体積比](../../CYG/CYG1-10/index.md#prop-cyg1-10-ricci-volume-ratio)から

$$
\rho(\omega_\varphi)
=\rho(\omega)-i\partial\bar\partial F
=\rho(\omega)+i\partial\bar\partial u-i\partial\bar\partial C
=\eta.
$$

$C$ は定数なので微分は零。さらに $u'=u+a$ とすれば $I'=\int e^{-u'}\omega^n=e^{-a}I$、$C'=\log(V/I')=C+a$。従って $F'=-(u+a)+(C+a)=F$ となる。
<!-- solution-end -->

<a id="ex-yau1-14-a05"></a>

#### YAU1-14-A05 非連結な場合の平均ゼロ
- Level: A

体積が等しい二つの連結Kähler多様体の非交和上で、解のポテンシャルに各成分別の定数 $a_1,a_2$ を加える。全体で平均ゼロを維持する条件を求めよ。

<!-- solution-start -->
**詳細解答。** 各体積を $V_0$ とすると、元の解を各成分で平均ゼロに取った場合、新しい全体の積分は

$$
\int_X(\varphi+a_j)\omega^n=a_1V_0+a_2V_0.
$$

したがって条件は $a_1+a_2=0$。例えば $a_1=1,a_2=-1$ は非零でも全体平均を変えず、$\partial\bar\partial$ は両成分で定数を消す。連結成分ごとに平均ゼロを指定しなければポテンシャルは一意にならない。
<!-- solution-end -->

### Level B

<a id="ex-yau1-14-b01"></a>

#### YAU1-14-B01 楕円曲線の全パス
- Level: B

$T=\mathbb C/(\mathbb Z+i\mathbb Z)$、$\omega=i\,dz\wedge d\bar z$、$e^F=1+a\cos(2\pi x)$（$z=x+iy$、$|a|<1$）とする。平均ゼロの $\varphi_t$、正値下限、目標Ricci形式を求め、体積正規化まで確認せよ。

<!-- solution-start -->
**詳細解答。** $\omega=2dx\wedge dy$ より $V=2$、また余弦の平均が零だから $\int_Te^F\omega=2$。パスは $\rho_t=1+ta\cos2\pi x$ である。[Wirtinger微分](../../CM/CM2-02/index.md#def-cm2-02-wirtinger-operators)を使うと

$$
\partial_z\partial_{\bar z}
\left(-\frac{ta}{\pi^2}\cos2\pi x\right)
=\frac14\frac{d^2}{dx^2}
\left(-\frac{ta}{\pi^2}\cos2\pi x\right)
=ta\cos2\pi x.
$$

従って $\varphi_t=-(ta/\pi^2)\cos2\pi x$ は体積方程式を満たし、係数は $1+ta\cos2\pi x\ge1-|a|>0$。$\int_T\varphi_t\omega=-2ta/\pi^2\int_0^1\cos2\pi x\,dx=0$。基準Ricci形式は零なので $u=-\log(1+a\cos2\pi x)$ とすると $\eta=i\partial\bar\partial u$。$e^{-u}=1+a\cos2\pi x$ の積分が $V$ に等しく $C=0$ だから、$F=-u$ と一致し、端点のRicci形式は $-i\partial\bar\partial\log(1+a\cos2\pi x)=\eta$。
<!-- solution-end -->

<a id="ex-yau1-14-b02"></a>

#### YAU1-14-B02 成分ごとの質量が合わない密度
- Level: B

体積 $V_0$ の平坦楕円曲線二つの非交和 $X=T_1\sqcup T_2$ で、$e^F|_{T_1}=3/2$、$e^F|_{T_2}=1/2$ とする。全体の体積条件と各成分の条件を計算し、解の有無を結論せよ。

<!-- solution-start -->
**詳細解答。** 全体では

$$
\int_Xe^F\omega=(3/2)V_0+(1/2)V_0=2V_0=\int_X\omega.
$$

ところが $T_1$ 上では $\int_{T_1}e^F\omega=3V_0/2\ne V_0$、$T_2$ 上では $V_0/2\ne V_0$。[成分別体積障害](#prop-yau1-14-components)の必要条件が両方で破れる。各成分は境界なしでありStokesにより左辺の解の体積は必ず $V_0$ なので、全体の積分が合っていても解は存在しない。
<!-- solution-end -->

<a id="ex-yau1-14-b03"></a>

#### YAU1-14-B03 二階評価の代数部分
- Level: B

正の固有値 $\lambda_1,\lambda_2$ が $\lambda_1+\lambda_2\le C$、$\lambda_1\lambda_2\ge m>0$ を満たすとする。二側評価を求めよ。正値性を削った場合に同じ推論ができない例を挙げよ。

<!-- solution-start -->
**詳細解答。** 正値性から $0<\lambda_j\le\lambda_1+\lambda_2\le C$。したがって

$$
\lambda_1=\frac{\lambda_1\lambda_2}{\lambda_2}\ge\frac mC,
\qquad
\lambda_2=\frac{\lambda_1\lambda_2}{\lambda_1}\ge\frac mC.
$$

よって $(m/C)I\le\operatorname{diag}(\lambda_1,\lambda_2)\le CI$。正値性を外すと $\operatorname{diag}(-1,-1)$ は積1でも「各固有値は正」という出発点を失う。さらに和の上界 $-2\le C$ をどれだけ満たしても、正の下限を結論できない。
<!-- solution-end -->

<a id="ex-yau1-14-b04"></a>

#### YAU1-14-B04 非コンパクトな固定類一意性の失敗
- Level: B

$X=\mathbb C$ で $\omega_1=i\,dz\wedge d\bar z$、$\omega_2=2\omega_1$ とする。両者がKähler、同じde Rham類、同じRicci形式を持つことを式で確かめよ。コンパクトな場合の一意性証明のどの行が使えないか述べよ。

<!-- solution-start -->
**詳細解答。** $\omega_j$ のHermite係数はそれぞれ1, 2で正、係数は定数だから $d\omega_j=0$。$\omega_2-\omega_1=i\partial\bar\partial|z|^2$ は完全なので同じde Rham類である。[Ricci形式の局所行列式公式](../../KAH/KAH1-11/index.md#thm-kah1-11-local-ricci)から

$$
\rho(\omega_1)=-i\partial\bar\partial\log1=0,\qquad
\rho(\omega_2)=-i\partial\bar\partial\log2=0.
$$

だが $\omega_1\ne\omega_2$。コンパクトであれば体積比が定数 $2$ と分かったあと $\int\omega_2=\int\omega_1<\infty$ から $2=1$ と矛盾させるが、ここでは両積分が無限大でその割り算ができない。ポテンシャル $|z|^2$ も全空間で最大を取らず、コンパクト上の最大値原理の使い方とは異なる。
<!-- solution-end -->

### Level C

<a id="ex-yau1-14-c01"></a>

#### YAU1-14-C01 Calabi予想を入力から再構成する
- Level: C

$X$ をコンパクト連結Kähler多様体、$\omega\in\alpha$ をKähler形式、$\eta$ を $[\eta]=2\pi c_1(X)_{\mathbb R}$ を満たす滑らかな実閉 $(1,1)$ 形式とする。$u,F,\rho_t$ を構成し、開性・閉性にどの定理とどの一様評価が必要かを説明したうえで、$\rho(\widehat\omega)=\eta$ と固定類一意性を証明せよ。$e^F$ が正である理由、定数正規化の種類、極限で正値性を保つ理由も明記せよ。

<!-- solution-start -->
**詳細解答。** [Ricci–Chern同定](../../KAH/KAH1-12/index.md#thm-kah1-12-ricci-chern)で $[\rho(\omega)-\eta]=0$。[実ポテンシャルの存在](../YAU1-02/index.md#prop-yau1-02-real-potential)から $\eta=\rho(\omega)+i\partial\bar\partial u$ となる滑らかな実 $u$ がある。$I=\int_Xe^{-u}\omega^n$ はコンパクト性と実性から有限かつ正なので、

$$
F=-u+\log(V/I),\qquad
\int_Xe^F\omega^n=V.
$$

指数は正であり、さらにコンパクト性から正の下界を持つ。$\rho_t=1-t+te^F$ は正で $\int_X\rho_t\omega^n=V$、$t=0$ の解は0である。正値Kählerポテンシャルの領域で、$Q(\varphi)=\det(g+\varphi_{j\bar k})/\det g$ の微分は

$$
DQ_\varphi(v)=Q(\varphi)\,g_\varphi^{j\bar k}v_{j\bar k}.
$$

係数が正定値、核は定数なので固定平均ゼロ空間で[Poisson同型](../YAU1-05/index.md#thm-yau1-05-poisson-isomorphism)を使い[開性](../YAU1-05/index.md#thm-yau1-05-openness)を得る。閉性には[Green核・$L^1$](../YAU1-06/index.md#thm-yau1-06-upper-l1)と[Moser反復](../YAU1-07/index.md#thm-yau1-07-moser)で一様 $C^0$、[二階大域評価](../YAU1-09/index.md#thm-yau1-09-global-second-order)で $c\omega\le\omega_{\varphi_t}\le C\omega$、[三階評価](../YAU1-10/index.md#thm-yau1-10-global-third-order)と[Schauder高階評価](../YAU1-11/index.md#thm-yau1-11-higher-estimates)で全階一様上界を得る。可解時刻列から滑らかな部分列を取り、二階収束で計量の下限 $c>0$ と行列式方程式を保存するので[閉性](../YAU1-12/index.md#thm-yau1-12-closedness)。区間の連結性から端点1に解がある。

この $\widehat\omega=\omega+i\partial\bar\partial\varphi$ は正かつ固定類内であり、

$$
\rho(\widehat\omega)
=\rho(\omega)-i\partial\bar\partial F
=\rho(\omega)+i\partial\bar\partial u
=\eta.
$$

二つの解が同じ $\eta$ を与えれば対数体積比は実調和関数で定数、同じ類の積分体積は等しいので比は1。[Monge–Ampère一意性](../YAU1-04/index.md#thm-yau1-04-uniqueness)よりポテンシャルは定数差、形式は一致する。$F$ の定数は**密度の体積整合**を、$\int_X\varphi\omega^n=0$ は**未知関数の定数ゲージ**を固定するので混同しない。
<!-- solution-end -->

<a id="ex-yau1-14-c02"></a>

#### YAU1-14-C02 四つの破綻を診断し、正しい主張に直す
- Level: C

次の主張の誤りをそれぞれ反例・計算で示し、証明の停止位置と正しい修正版を述べよ。

1. 「全体の体積が合えば非連結な場合も必ず解ける。」
2. 「正の行列式を持つHermite行列はKähler計量を定める。」
3. 「非コンパクトでも同じ類と同じRicci形式があれば一意である。」
4. 「Ricci形式が零なら、Kähler類を固定せず計量が一つに決まる。」

<!-- solution-start -->
**詳細解答。**

1. $X=T_1\sqcup T_2$、各体積 $V_0$、密度 $3/2$ と $1/2$ なら、全体では $2V_0$ で一致するが、各成分で $3V_0/2\ne V_0$、$V_0/2\ne V_0$。成分別Stokesが矛盾を与える。[成分別体積命題](#prop-yau1-14-components)のように**各連結成分で**体積を合わせるのが修正である。
2. $H=\operatorname{diag}(-1,-1)$ は $\det H=1>0$ だが $v^\ast Hv=-\|v\|^2<0$。行列式は固有値の積しか見ていない。正値領域での線形化・最大値原理と二階評価の代数を使うには、**全ての非零ベクトルで $v^\ast Hv>0$** が必要である。
3. $\mathbb C$ の $\omega_1=i\,dz\wedge d\bar z$ と $\omega_2=2\omega_1$ は、差が $i\partial\bar\partial|z|^2$、Ricci形式は共に零だが異なる。全空間の体積は無限で「定数体積比を積分して1へ固定」の行が使えず、最大値の存在もない。**コンパクト連結**という仮定を戻すか、非コンパクトでは適切な境界・漸近条件を別途課す必要がある。
4. コンパクトな複素トーラス $T$ で $\omega$ を定数正定値Hermite形式から作ると $\omega$ も $2\omega$ もRicci形式は零である。しかし

$$
\int_T(2\omega)^n=2^n\int_T\omega^n\ne\int_T\omega^n
$$

なので同じKähler類ではない。よって**固定したKähler類の中で唯一**が正しい定理であり、異なる類同士の一意性を主張しない。
<!-- solution-end -->

## 6. 本系列の終点

指定Ricci形式のコホモロジー条件を確認し、実ポテンシャルと体積正規化を作り、開性と四段階の一様評価から閉性を証明して、初めて存在へ到達する。さらに、同じRicci形式から体積比が定数と分かるだけでは一意性は終わらず、**固定類の有限体積**でその定数を1へ戻す必要がある。

これで「Calabi予想とYauの定理」全14講の主証明と仮定の切り分けが揃った。一般のFano Kähler–Einstein存在問題、非コンパクト問題、特異解や退化Kähler類では、ここで列挙した仮定を変更するため別の理論が必要になる。
