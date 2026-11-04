# CYG1-10 Yauの定理は何を存在させ、一意にするか

## 1. 第一Chern類が零でも、計量のRicci形式は零とは限らない

前章までに、滑らかなquinticや完全交叉の標準束が自明になる条件を計算した。[滑らかな完全交叉の随伴公式](../CYG1-09/index.md#prop-cyg1-09-adjunction)から標準束を求め、[標準束と第一Chern類の関係](../CYG1-01/index.md#prop-cyg1-01-chern-chain)によって $c_1(X)_{\mathbb R}=0$ も分かる。しかし、これだけでは**いま選んでいる計量**のRicci形式は零にならない。

この違いを、曲率の「形」とコホモロジーの「類」の違いとして考えたい。[Ricci形式と第一Chern類の公式](../../KAH/KAH1-12/index.md#thm-kah1-12-ricci-chern)は

$$
[\rho(\omega)]=2\pi c_1(X)_{\mathbb R}
$$

を与える。右辺が零なら左辺の**類**は零だが、個々の2形式 $\rho(\omega)$ が零とは限らない。前者は位相的な制約、後者は計量の微分方程式である。ここから自然な問いが生じる。

> 複素構造とKähler類を動かさずに、計量だけ選び直してRicci形式を指定できるだろうか。

本章の舞台は、滑らか・連結・境界なし・コンパクトな複素次元 $n\ge1$ のKähler多様体 $X$ である。正則座標 $z^1,\ldots,z^n$ では

$$
\omega=i\sum_{j,k=1}^n g_{j\bar k}\,dz^j\wedge d\bar z^k,\qquad
\rho(\omega)=-i\partial\bar\partial\log\det(g_{j\bar k})
$$

と書く。$[\omega]\in H^2_{\mathrm{dR}}(X;\mathbb R)$ は[正の実閉 $(1,1)$ 形式で表されるKähler類](../../KAH/KAH1-13/index.md#def-kah1-13-class)であり、$c_1(X)_{\mathbb R}$ は**実係数**第一Chern類である。

## 2. Ricci形式は、体積比の対数でどう変わるか

異なる二つのKähler計量の比較では、係数行列の全成分を比べる代わりに、その行列式（局所体積密度）を比べるのが近道である。[Kähler形式と正定値Hermite行列の対応](../../KAH/KAH1-02/index.md#prop-kah1-02-matrix-criterion)によれば、正則座標で $\omega=i g_{j\bar k}dz^j\wedge d\bar z^k$ と書いたとき、接ベクトル $v=v^j\partial_j$ に対する正値条件は

$$
-i\omega(v,\bar v)=\sum_{j,k}g_{j\bar k}v^j\overline{v^k}>0\qquad(v\ne0)
$$

に等しい。従って係数行列 $G=(g_{j\bar k})$ は正定値で、$\det G>0$ だから対数を取れる。$\omega_1^n/\omega_0^n$ は両者の最高次外積の比で、正則座標の選び方によらない正の滑らかな関数になる。

<a id="prop-cyg1-10-ricci-volume-ratio"></a>

<!-- formal-statement-start -->
> **命題（Ricci形式の差と体積比）**
>
> 複素次元 $n\ge1$ の複素多様体 $X$ 上の二つのKähler形式を $\omega_0,\omega_1$ とする。いずれのRicci形式も上記の符号規約で定める。このとき

$$
\rho(\omega_1)-\rho(\omega_0)
=-i\partial\bar\partial\log\frac{\omega_1^n}{\omega_0^n}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

同じ正則座標で二つの正定値Hermite行列を $G_0,G_1$ と書く。最高次外積は定数倍の $\det G_a$ なので比では定数と座標体積形式が消え、[Ricci形式の局所行列式公式](../../KAH/KAH1-11/index.md#thm-kah1-11-local-ricci)を引けばよい。

<!-- proof-start -->
### 証明

任意の正則座標近傍で $\omega_a=i(G_a)_{j\bar k}dz^j\wedge d\bar z^k$ と書く。外積を展開すると、同じ $dz^j$ または $d\bar z^k$ が二度現れる項は零となり、各添字が一度ずつ現れる項だけが行列式を作る。よって

$$
\omega_a^n=n!i^n\det(G_a)\,
dz^1\wedge d\bar z^1\wedge\cdots\wedge dz^n\wedge d\bar z^n
$$

である（右辺の一定の順序を両者で共通に取る）。したがって $\omega_1^n/\omega_0^n=\det G_1/\det G_0>0$。これを[局所Ricci形式の公式](../../KAH/KAH1-11/index.md#thm-kah1-11-local-ricci)へ代入し、

$$
\begin{aligned}
\rho(\omega_1)-\rho(\omega_0)
&=-i\partial\bar\partial\log\det G_1
  +i\partial\bar\partial\log\det G_0\\
&=-i\partial\bar\partial\log(\det G_1/\det G_0)\\
&=-i\partial\bar\partial\log(\omega_1^n/\omega_0^n).
\end{aligned}
$$

両辺とも大域的な2形式なので、各座標近傍での等式は $X$ 全体で成立する。$\square$
<!-- proof-end -->

この命題は**計算で証明できた部分**である。対照的に、与えた体積比を実現する正のKähler形式が必ず存在するか、という難問にはまだ答えていない。

## 3. 指定するものと、未知なものを分ける

第一の入力は、Kähler形式 $\omega$ が代表する固定の類 $\alpha=[\omega]$ である。第二の入力は、Ricci形式の目標として選ぶ滑らかな実閉 $(1,1)$ 形式 $\eta$ である。$\eta$ は必ずしも正の形式ではないが、[Ricci形式のChern類表示](../../KAH/KAH1-12/index.md#thm-kah1-12-ricci-chern)により、次の類を持つ必要がある。

$$
[\eta]=2\pi c_1(X)_{\mathbb R}.
$$

未知量は、$\alpha$ を代表する別の正のKähler形式 $\omega'$ であり、解きたい等式は $\rho(\omega')=\eta$ である。$[\eta]=2\pi c_1$ は必要条件にすぎず、その必要条件がコンパクトKähler上で十分になることが核心である。

先に、方程式の形だけを変換しておこう。同じ類に属する二つの実閉 $(1,1)$ 形式の差は、[大域 $\partial\bar\partial$ 補題](../../HOD/HOD1-08/index.md#thm-hod1-08-ddbar-lemma)の[純型 $d$ 完全形式への帰結](../../HOD/HOD1-08/index.md#cor-hod1-08-d-exact)から、ある大域的な滑らかな実関数の $i\partial\bar\partial$ と書ける。ここでは二つの場面に適用する。

1. $\omega'$ と $\omega$ は同じde Rham類なので、未知の実関数 $\varphi$ を使って $\omega'=\omega+i\partial\bar\partial\varphi$ と表せる。ただし **$\omega'>0$ の正値条件は別に満たす必要がある**。
2. $\eta$ と $\rho(\omega)$ は同じde Rham類なので、既知の実関数 $u$ を選んで $\eta=\rho(\omega)+i\partial\bar\partial u$ と表せる。$u$ は定数を加える不定性を持つ。

実形式 $\beta$ について補題から $\beta=\partial\bar\partial v$（複素値 $v$）を得た場合、複素共役は $\overline{\partial\bar\partial v}=-\partial\bar\partial\bar v$ だから

$$
\beta=\frac12\partial\bar\partial(v-\bar v)
=i\partial\bar\partial\operatorname{Im}v.
$$

これが実関数のポテンシャルに直せる理由である。ここでの「同じ類」は、**同じ閉形式**という意味ではない。

<a id="prop-cyg1-10-monge-ampere-reduction"></a>

<!-- formal-statement-start -->
> **命題（Ricci形式指定と体積方程式の同値性）**
>
> $X$ を連結・コンパクト・境界なしの複素次元 $n\ge1$ のKähler多様体、$\omega$ をKähler形式とする。$\eta$ を滑らかな実閉 $(1,1)$ 形式で $[\eta]=2\pi c_1(X)_{\mathbb R}$ とし、実関数 $u$ を $\eta=\rho(\omega)+i\partial\bar\partial u$ で選ぶ。実関数 $\varphi$ について $\omega_\varphi=\omega+i\partial\bar\partial\varphi>0$ とすると、$\rho(\omega_\varphi)=\eta$ は次の体積方程式と同値である。

$$
(\omega+i\partial\bar\partial\varphi)^n
=e^{C-u}\omega^n,\qquad
e^C=\frac{\int_X\omega^n}{\int_Xe^{-u}\omega^n}.
$$

> 分母は正かつ有限である。$\varphi$ に定数を加えても $\omega_\varphi$ は変わらない。
<!-- formal-statement-end -->

### 証明の見取り図

[体積比の命題](#prop-cyg1-10-ricci-volume-ratio)を使えばRicci形式の等式は「体積比の対数と $-u$ の差が $\partial\bar\partial$ で消える」という主張になる。コンパクト連結な複素多様体上の実数値多重調和関数は定数である。最後に、同じKähler類の最高次外積の積分は等しいことから定数 $C$ が決まる。

<!-- proof-start -->
### 証明

[体積比の等式](#prop-cyg1-10-ricci-volume-ratio)から

$$
\rho(\omega_\varphi)=\eta
\iff i\partial\bar\partial
\left(\log\frac{\omega_\varphi^n}{\omega^n}+u\right)=0.
$$

括弧内は大域的な滑らかな実関数 $h$ である。$G^{-1}=(g^{j\bar k})$ は計量係数行列の逆行列、$\partial_j=\partial/\partial z^j$、$\partial_{\bar k}=\partial/\partial\bar z^k$ は各複素座標に関する偏微分を表す。$i\partial\bar\partial h=0$ はすべての $\partial_j\partial_{\bar k}h$ が零ということなので、計量による複素跡も

$$
2\sum_{j,k}g^{j\bar k}\partial_j\partial_{\bar k}h=0
$$

となる。これは実Laplacianが零という条件である（Hodge Laplacianを非負に取る流儀では全体に負号が付くが、零条件は同じ）。コンパクト・連結・境界なしの $X$ では調和実関数は定数だから、$h=C$。ゆえに

$$
\log(\omega_\varphi^n/\omega^n)=C-u,\qquad
\omega_\varphi^n=e^{C-u}\omega^n.
$$

逆に最後の式を[体積比の命題](#prop-cyg1-10-ricci-volume-ratio)へ代入すれば $\rho(\omega_\varphi)=\rho(\omega)+i\partial\bar\partial u=\eta$ が従う。

定数の値を決めるため、$\theta=i\partial\bar\partial\varphi=d(i\bar\partial\varphi)$ は $d$ 完全な実2形式で、$\omega$ と $\theta$ は閉じていることに注意する。任意の $1\le k\le n$ に対して

$$
\theta^k\wedge\omega^{n-k}
=d\bigl(i\bar\partial\varphi\wedge\theta^{k-1}\wedge\omega^{n-k}\bigr)
$$

なので、Stokesの定理で積分が零になる。二項展開より

$$
\int_X\omega_\varphi^n
=\sum_{k=0}^n\binom nk\int_X\theta^k\wedge\omega^{n-k}
=\int_X\omega^n.
$$

体積方程式の両辺を積分すると

$$
e^C\int_Xe^{-u}\omega^n=\int_X\omega^n,
$$

となる。$\omega^n$ は正の体積形式、$e^{-u}>0$ はコンパクト $X$ 上で有界なので、分母は正かつ有限である。$\square$
<!-- proof-end -->

この形は複素Monge–Ampère方程式と呼ばれる。**方程式を得たことと、正値性を保つ解 $\varphi$ が存在することは別**である。解の存在には大域的な非線形解析が必要となる。

## 4. Yauの定理――量化の順序が肝心

ここで初めて、必要条件から解の存在へ進む。**Yauの定理（Calabi予想の解決）**は、本講では次の正確な形を外部定理として使う。その完全な存在証明（連続性の方法、事前評価、楕円正則性）は別講義の課題とする。

<a id="thm-cyg1-10-yau"></a>

<!-- formal-statement-start -->
> **定理（YauのRicci形式指定定理：存在を外部入力とする）**
>
> $X$ を滑らか・連結・コンパクト・境界なしの複素次元 $n\ge1$ のKähler多様体とする。**任意の**Kähler類 $\alpha\in H^2_{\mathrm{dR}}(X;\mathbb R)$ と、**任意の**滑らかな実閉 $(1,1)$ 形式 $\eta$ で

$$
[\eta]=2\pi c_1(X)_{\mathbb R}
$$

> を満たすものに対し、**ただ一つのKähler形式** $\omega_{\alpha,\eta}$ が存在して

$$
[\omega_{\alpha,\eta}]=\alpha,\qquad
\rho(\omega_{\alpha,\eta})=\eta
$$

> を満たす。複素構造 $X$ は固定される。ポテンシャル関数 $\varphi$ の一意性は加法定数を除く意味である。
<!-- formal-statement-end -->

この定理の存在部分は証明せず、外部入力であると明示して用いる。一意性は次節で既習結果から導く。定理が言っている量化の順序は

$$
\forall\alpha\ \forall\eta\ 
\bigl([\eta]=2\pi c_1(X)_{\mathbb R}\bigr)
\Longrightarrow\exists!\omega_{\alpha,\eta}.
$$

**「Kähler類ごとに一意」**であって、$X$ 上にRicci形式 $\eta$ の計量が全体で一つしかないという意味ではない。また、任意の閉2形式を $\eta$ としてよいわけではなく、**実 $(1,1)$ 型・滑らか・正しいChern類の代表**が要る。一方 $\eta$ 自身には正値性を要求しない。

### 最小例：平坦トーラスの類を固定する

格子 $\Lambda=\mathbb Z+i\mathbb Z$ を用いる楕円曲線 $T=\mathbb C/\Lambda$ に、[平坦Kähler形式と標準束の計算](../CYG1-04/index.md#prop-cyg1-04-flat-holonomy)から

$$
\omega_0=i\,dz\wedge d\bar z,\qquad \rho(\omega_0)=0,\qquad c_1(T)_{\mathbb R}=0
$$

がある。$\alpha=[\omega_0]$ と $\eta=0$ を指定すれば、既知の解 $\omega_0$ があり、[YauのRicci形式指定定理](#thm-cyg1-10-yau)によりこれが**その類では唯一**のRicci平坦Kähler形式である。

しかし $2\omega_0$ もRicci平坦である。[Kähler類の非零性](../../KAH/KAH1-13/index.md#thm-kah1-13-compact-nonzero)より $[2\omega_0]\ne[\omega_0]$ なので、固定した類が違い、矛盾はない。

## 5. 一意性は既習の道具で実際に証明できる

Yauの存在証明は難しいが、固定類での一意性は[大域 $\partial\bar\partial$ 補題](../../HOD/HOD1-08/index.md#thm-hod1-08-ddbar-lemma)とStokesの定理で確認できる。ここでは正の2形式の外積が非負になることを使う。

<a id="prop-cyg1-10-uniqueness"></a>

<!-- formal-statement-start -->
> **命題（同じKähler類とRicci形式を持つ計量の一意性）**
>
> $X$ を連結・コンパクト・境界なしの複素次元 $n\ge1$ のKähler多様体とし、$\omega_1,\omega_2$ をKähler形式とする。次の二条件が成り立つと仮定する。

$$
[\omega_1]=[\omega_2],\qquad
\rho(\omega_1)=\rho(\omega_2).
$$

> このとき $\omega_1=\omega_2$ である。
<!-- formal-statement-end -->

### 証明の見取り図

[体積比の命題](#prop-cyg1-10-ricci-volume-ratio)によって二つの体積形式は定数倍であり、同じ類の体積積分が一致するため倍率は1になる。$\omega_2-\omega_1=i\partial\bar\partial\psi$ と書き、差の$n$乗を因数分解して $\psi$ を掛けて積分する。正値性によって $d\psi$ の消失が強制される。

<!-- proof-start -->
### 証明

$\rho(\omega_1)=\rho(\omega_2)$ と[体積比の公式](#prop-cyg1-10-ricci-volume-ratio)から、$h=\log(\omega_2^n/\omega_1^n)$ は $\partial\bar\partial h=0$ を満たす。第3節と同じコンパクト連結な調和関数の議論で $h=C$ は定数。両形式は同じde Rham類だから、Stokesの定理と二項展開で $\int_X\omega_2^n=\int_X\omega_1^n$。よって $e^C=1$、すなわち

$$
\omega_2^n=\omega_1^n.
$$

[大域補題の純型 $d$ 完全形式への系](../../HOD/HOD1-08/index.md#cor-hod1-08-d-exact)から実関数 $\psi$ が存在し、$\omega_2-\omega_1=i\partial\bar\partial\psi$。偶次数の外積は可換なので、$a^n-b^n=(a-b)\sum_{k=0}^{n-1}a^kb^{n-1-k}$ を外積へ適用する。$S=\sum_{k=0}^{n-1}\omega_2^k\wedge\omega_1^{n-1-k}$ は閉じた実 $(n-1,n-1)$ 形式であり、

$$
0=\omega_2^n-\omega_1^n=i\partial\bar\partial\psi\wedge S.
$$

両辺に $\psi$ を掛けて積分し、$\partial S=0$ とStokesを用いると

$$
0=\int_X\psi\,i\partial\bar\partial\psi\wedge S
=-\int_Xi\partial\psi\wedge\bar\partial\psi\wedge S.
$$

ここで積の符号を確かめる。各点で $\omega_1$ に関して正規直交となり、同時に $\omega_2$ が対角となる正則座標の一次変換を選ぶと、その点では

$$
\omega_1=i\sum_{j=1}^n dz^j\wedge d\bar z^j,\qquad
\omega_2=i\sum_{j=1}^n\lambda_j\,dz^j\wedge d\bar z^j,\quad\lambda_j>0.
$$

この枠で $\partial\psi=\sum_j\psi_jdz^j$ とすると、$i\partial\psi\wedge\bar\partial\psi\wedge\omega_2^k\wedge\omega_1^{n-1-k}$ の係数には $|\psi_j|^2$ と、$j$ 以外の添字から選んだ $k$ 個の $\lambda_\ell$ の積が現れる。すべて非負なので各混合外積の被積分密度は非負である。特に $k=0$、すなわち $\omega_1^{n-1}$ の項は

$$
i\partial\psi\wedge\bar\partial\psi\wedge\omega_1^{n-1}
=\frac1n\left(\sum_{j=1}^n|\psi_j|^2\right)\omega_1^n.
$$

したがって $\partial\psi\ne0$ の点でこの項は厳密に正であり、積分が零なら $\partial\psi=0$ が全点で成立する。$\psi$ は実関数なので $d\psi=0$、ゆえに $i\partial\bar\partial\psi=0$。結局 $\omega_2=\omega_1$。$\square$
<!-- proof-end -->

この証明で不可欠なのは、**コンパクト性**（Stokesと調和関数の定数性）、**同一Kähler類**（大域ポテンシャル）、**正値性**（最後の積分）である。存在までこの積分から示したわけではない。

## 6. Ricci平坦性の存在と、残る論理の隙間

いま $\eta=0$ と選べるのは、$0$ が $2\pi c_1(X)_{\mathbb R}$ の代表である場合、すなわち $c_1(X)_{\mathbb R}=0$ の場合に限る。

<a id="cor-cyg1-10-ricci-flat"></a>

<!-- formal-statement-start -->
> **系（実第一Chern類の消失とRicci平坦計量の存在）**
>
> $X$ を滑らか・連結・コンパクト・境界なしの複素次元 $n\ge1$ のKähler多様体とする。次の二条件は同値である。
>
> 1. $c_1(X)_{\mathbb R}=0$。
> 2. $X$ はRicci平坦Kähler計量を少なくとも一つ持つ。
>
> 条件1が成り立つとき、**各Kähler類**にはRicci平坦Kähler形式がただ一つ存在する。
<!-- formal-statement-end -->

### 証明の見取り図

逆方向は[Ricci形式のChern類表示](../../KAH/KAH1-12/index.md#thm-kah1-12-ricci-chern)の必要条件。順方向は[YauのRicci形式指定定理](#thm-cyg1-10-yau)で各Kähler類と $\eta=0$ を指定する。

<!-- proof-start -->
### 証明

条件2の計量を $\omega$ とすると $\rho(\omega)=0$。[Ricci形式とChern類](../../KAH/KAH1-12/index.md#thm-kah1-12-ricci-chern)から $2\pi c_1(X)_{\mathbb R}=[0]=0$、従って条件1が成立する。

逆に条件1が成立し、任意のKähler類 $\alpha$ を取る。$0$ は滑らかな実閉 $(1,1)$ 形式であり、$[0]=2\pi c_1(X)_{\mathbb R}$ を満たす。[YauのRicci形式指定定理](#thm-cyg1-10-yau)を $\eta=0$ に適用して

$$
[\omega_{\alpha,0}]=\alpha,\qquad
\rho(\omega_{\alpha,0})=0
$$

となる唯一のKähler形式を得る。$\square$
<!-- proof-end -->

この系から、[滑らかなquinticの標準束自明性](../CYG1-08/index.md#prop-cyg1-08-smooth-canonical)と[射影多様体のKähler性](../../KAH/KAH1-14/index.md#thm-kah1-14-projective-integral)を組み合わせれば、quinticの各Kähler類にRicci平坦計量が存在する。しかしここから**Riemann曲率テンソル全体が零**とも、**全ホロノミー群がちょうど $SU(3)$** とも結論しない。ホロノミーを論じるには[制限ホロノミーの包含](../../KAH/KAH1-16/index.md#thm-kah1-16-su-restricted)とさらに大域的な情報を区別する必要がある。

逆含意にも注意する。$c_1(X)_{\mathbb R}=0$ から標準束 $K_X$ が正則自明だとは言えない。[Enriques曲面の2-torsion標準束](../CYG1-03/index.md#prop-cyg1-03-enriques-chern)は非自明だが実第一Chern類が零となる。Enriques曲面は射影的でKählerなのでYauの系によってRicci平坦Kähler計量を持つ。それでも非零の大域正則最高次形式を持つとは断定できない。

### 例：同じ類の非平坦Ricci形式から、零へ戻す

楕円曲線 $T=\mathbb C/(\mathbb Z+i\mathbb Z)$ の座標を $z=x+iy$ とする。$0<|\varepsilon|<1$ を固定し、格子で周期的な関数 $f(x)=1+\varepsilon\cos(2\pi x)$ を用いて

$$
\omega_\varepsilon=f(x)\,i\,dz\wedge d\bar z
$$

を考える。$f>0$ であり、実二次元では任意の2形式は閉じるからKähler形式である。ここで複素偏微分と実偏微分の対応を明示しておく。$\partial_z=\tfrac12(\partial_x-i\partial_y)$、$\partial_{\bar z}=\tfrac12(\partial_x+i\partial_y)$ はそれぞれ $z,\bar z$ を独立な座標として微分する演算子であり、滑らかな関数に作用させると

$$
\partial_z\partial_{\bar z}=\tfrac14(\partial_x^2+\partial_y^2),\qquad
\partial\bar\partial\varphi=(\partial_z\partial_{\bar z}\varphi)\,dz\wedge d\bar z.
$$

$\varphi(x)=-\varepsilon\cos(2\pi x)/\pi^2$ と置けば、$\partial_x^2\varphi=4\varepsilon\cos(2\pi x)$、$\partial_y\varphi=0$ なので

$$
i\partial\bar\partial\varphi
=\varepsilon\cos(2\pi x)i\,dz\wedge d\bar z
=\omega_\varepsilon-\omega_0.
$$

つまり $[\omega_\varepsilon]=[\omega_0]$。一方、[Ricci形式の局所行列式公式](../../KAH/KAH1-11/index.md#thm-kah1-11-local-ricci)から

$$
\rho(\omega_\varepsilon)
=-\frac i4\frac{d^2}{dx^2}\log f(x)\,dz\wedge d\bar z
$$

となり、$x=0$ では係数が $i\pi^2\varepsilon/(1+\varepsilon)\ne0$。この計量はRicci平坦ではない。それでも[Yauの系](#cor-cyg1-10-ricci-flat)は、同じ類で $\rho=0$ とする唯一の形式を保証する。ここでは既知の $\omega_0$ がその解である。**類の消失から、すべての代表の曲率が消えるわけではない**ことを手で確認できた。

### 仮定が破れると何が起きるか

- **Chern類を間違える：** $\mathbb{CP}^1$ のFubini–Study形式はアフィン座標 $z$ 上では局所的に $\omega_{\mathrm{FS}}=i\partial\bar\partial\log(1+|z|^2)$ と表せ、$\rho(\omega_{\mathrm{FS}})=2\omega_{\mathrm{FS}}$。対数の式は大域的なポテンシャル関数ではなく、各チャートでの表示である。$c_1(\mathbb{CP}^1)_{\mathbb R}\ne0$ なので $\eta=0$ は許されない。存在定理が失敗したのではなく、入力条件を満たしていない。
- **Kähler類を固定しない：** 平坦トーラスの $\omega_0$ と $2\omega_0$ は同じRicci形式だが違う類に属する。一意性の結論を大域的に拡張してはいけない。
- **コンパクト性を外す：** $\mathbb C$ 上の $\omega_0=i\,dz\wedge d\bar z$ と $2\omega_0$ は共にRicci平坦で、$H^2_{\mathrm{dR}}(\mathbb C;\mathbb R)=0$ だから同じ類にある。一意性の証明で使ったコンパクトな積分と最大値原理が失われ、実際に一意性は偽になる。
- **Kähler性を外す：** 大域 $\partial\bar\partial$ 補題と正値性の議論をそのまま使えなくなる。非Kähler空間にこの定理を無条件に拡張してはいけない。

## 7. 演習――存在と一意性を自分で分ける

<a id="ex-cyg1-10-a01"></a>
#### CYG1-10-A01 Ricci形式の差を導く
- Level: A

複素次元一の同じ座標 $z$ で $\omega_0=i\,dz\wedge d\bar z$、$\omega_1=if(z,\bar z)\,dz\wedge d\bar z$ とする。$f>0$ は滑らかとする。$\rho(\omega_1)-\rho(\omega_0)$ を $f$ で表せ。

<!-- solution-start -->
**詳細解答。** 係数行列はそれぞれ $(1)$ と $(f)$ なので、行列式は $1$ と $f$。[Ricci形式の局所行列式公式](../../KAH/KAH1-11/index.md#thm-kah1-11-local-ricci)を順に代入すると

$$
\rho(\omega_0)=-i\partial\bar\partial\log1=0,\qquad
\rho(\omega_1)=-i\partial\bar\partial\log f.
$$

よって差は $-i\partial\bar\partial\log f$。$f$ が正なので実対数が定義できる。これは[体積比の命題](#prop-cyg1-10-ricci-volume-ratio)で $\omega_1/\omega_0=f$ とした場合とも一致する。
<!-- solution-end -->

<a id="ex-cyg1-10-a02"></a>
#### CYG1-10-A02 正規化定数を計算する
- Level: A

連結コンパクトKähler多様体 $(X,\omega)$ 上で $\eta=\rho(\omega)+i\partial\bar\partial u$ とし、$u$ は定数関数 $u=a\in\mathbb R$ とする。[体積方程式](#prop-cyg1-10-monge-ampere-reduction)の $C$ を求め、方程式が何になるか述べよ。

<!-- solution-start -->
**詳細解答。** $u=a$ なら $i\partial\bar\partial u=0$、従って $\eta=\rho(\omega)$。体積 $V=\int_X\omega^n>0$ とおくと

$$
e^C=\frac{V}{e^{-a}V}=e^a,\qquad C=a.
$$

ゆえに $e^{C-u}=e^{a-a}=1$ となり、方程式は $\omega_\varphi^n=\omega^n$。既知の解 $\varphi=0$ があり、[一意性命題](#prop-cyg1-10-uniqueness)により同じ類のKähler形式は $\omega$ に限られる。
<!-- solution-end -->

<a id="ex-cyg1-10-a03"></a>
#### CYG1-10-A03 許されないRicci形式を見抜く
- Level: A

$X=\mathbb{CP}^1$ 上のFubini–Study形式を考える。アフィン座標 $z$ 上では $\omega_{\mathrm{FS}}=i\partial\bar\partial\log(1+|z|^2)$ と局所表示される。$\rho(\omega_{\mathrm{FS}})=2\omega_{\mathrm{FS}}$ を用い、目標 $\eta=0$ が[YauのRicci形式指定定理](#thm-cyg1-10-yau)の仮定を満たすか判定せよ。

<!-- solution-start -->
**詳細解答。** [Ricci形式のChern類表示](../../KAH/KAH1-12/index.md#thm-kah1-12-ricci-chern)により $2\pi c_1(X)_{\mathbb R}=2[\omega_{\mathrm{FS}}]$。コンパクトKähler類は[非零](../../KAH/KAH1-13/index.md#thm-kah1-13-compact-nonzero)なので $2[\omega_{\mathrm{FS}}]\ne0$。一方 $[\eta]=[0]=0$。ゆえに $[\eta]\ne2\pi c_1(X)_{\mathbb R}$ となり、定理の入力条件を満たさない。
<!-- solution-end -->

<a id="ex-cyg1-10-a04"></a>
#### CYG1-10-A04 定数倍とKähler類
- Level: A

連結コンパクトKähler多様体 $(X,\omega)$ の複素次元を $n\ge1$ とし、$t>0$ を定数とする。$\rho(t\omega)$ と $[t\omega]$ をそれぞれ求め、$t\ne1$ のとき同一類でないことを説明せよ。

<!-- solution-start -->
**詳細解答。** 計量行列を $G$ とすると $t\omega$ の行列は $tG$、行列式は $t^n\det G$。したがって

$$
\rho(t\omega)=-i\partial\bar\partial(n\log t+\log\det G)
=\rho(\omega)
$$

である。一方 $[t\omega]=t[\omega]$。コンパクトKähler類は[非零](../../KAH/KAH1-13/index.md#thm-kah1-13-compact-nonzero)なので、$t\ne1$ なら $(t-1)[\omega]\ne0$、ゆえに $[t\omega]\ne[\omega]$。Ricci形式が等しくても一意性への反例ではない。
<!-- solution-end -->

<a id="ex-cyg1-10-a05"></a>
#### CYG1-10-A05 周期ポテンシャルで類の等号を示す
- Level: A

$T=\mathbb C/(\mathbb Z+i\mathbb Z)$、$\omega_0=i\,dz\wedge d\bar z$ とする。$0<|\varepsilon|<1$ に対し $\omega_\varepsilon=(1+\varepsilon\cos2\pi x)\omega_0$、$z=x+iy$ と置く。正値性、閉性、$[\omega_\varepsilon]=[\omega_0]$ を示せ。

<!-- solution-start -->
**詳細解答。** $-1\le\cos2\pi x\le1$ だから $1+\varepsilon\cos2\pi x\ge1-|\varepsilon|>0$。従って正値である。実次元二の $T$ 上では3形式は零なので $d\omega_\varepsilon=0$。周期関数 $\varphi=-\varepsilon\cos(2\pi x)/\pi^2$ は $T$ 上へ降りる。$\partial_z\partial_{\bar z}=\frac14(\partial_x^2+\partial_y^2)$ と $\partial_x^2\cos2\pi x=-4\pi^2\cos2\pi x$ を使うと

$$
i\partial\bar\partial\varphi
=\varepsilon\cos(2\pi x)i\,dz\wedge d\bar z
=\omega_\varepsilon-\omega_0.
$$

差は大域的に $d$ 完全だから、de Rham類は等しい。
<!-- solution-end -->

<a id="ex-cyg1-10-b01"></a>
#### CYG1-10-B01 与えられた曲率に体積方程式を対応させる
- Level: B

前問のトーラスで $u(x)=-\log(1+\varepsilon\cos2\pi x)$ とし、$\eta=\rho(\omega_0)+i\partial\bar\partial u$ を指定する。$\int_T\omega_0^1$ に対する正規化係数 $C$ を求め、どのKähler形式が解になるかを検証せよ。

<!-- solution-start -->
**詳細解答。** $\rho(\omega_0)=0$ なので、$\eta=i\partial\bar\partial(-\log f)=-i\partial\bar\partial\log f$、ここで $f=1+\varepsilon\cos2\pi x$。[体積比の公式](#prop-cyg1-10-ricci-volume-ratio)より $\eta=\rho(\omega_\varepsilon)$。

一方、$e^{-u}=f$ であり、$T$ の基本領域 $0\le x,y\le1$ 上では $\omega_0=2\,dx\wedge dy$、$\int_0^1\cos2\pi x\,dx=0$ だから

$$
\int_Te^{-u}\omega_0=\int_Tf\omega_0
=2\int_0^1\int_0^1(1+\varepsilon\cos2\pi x)\,dx\,dy
=2=\int_T\omega_0.
$$

従って $e^C=1$、$C=0$。体積方程式は $\omega_\varphi=f\omega_0$ であり、前問の $\varphi$ により $\omega_\varepsilon$ がその類に属する正の解だと確かめられた。[一意性命題](#prop-cyg1-10-uniqueness)から他に同類の解はない。
<!-- solution-end -->

<a id="ex-cyg1-10-b02"></a>
#### CYG1-10-B02 二次元複素多様体で一意性の積分を再構成する
- Level: B

連結コンパクトKähler曲面 $X$ 上の同一類のKähler形式 $\omega_1,\omega_2$ が同じRicci形式を持つとする。二つの体積形式が等しいことを示したうえで、$\omega_2-\omega_1=i\partial\bar\partial\psi$ を使い、$\psi$ が定数であることを証明せよ。

<!-- solution-start -->
**詳細解答。** [体積比の命題](#prop-cyg1-10-ricci-volume-ratio)とコンパクト連結性から $\omega_2^2=e^C\omega_1^2$。同一類なので[Stokesによる積分不変性](#prop-cyg1-10-monge-ampere-reduction)を使うと $\int_X\omega_2^2=\int_X\omega_1^2$、正の体積から $e^C=1$。また[大域 $\partial\bar\partial$ 補題](../../HOD/HOD1-08/index.md#thm-hod1-08-ddbar-lemma)により実関数 $\psi$ があり、差が $i\partial\bar\partial\psi$ となる。

複素次元二なので

$$
0=\omega_2^2-\omega_1^2
=(\omega_2-\omega_1)\wedge(\omega_2+\omega_1)
=i\partial\bar\partial\psi\wedge(\omega_2+\omega_1).
$$

閉性とStokesから

$$
0=\int_X\psi\,i\partial\bar\partial\psi\wedge(\omega_2+\omega_1)
=-\int_Xi\partial\psi\wedge\bar\partial\psi\wedge(\omega_2+\omega_1).
$$

$\omega_1+\omega_2$ は正のKähler形式である。右辺の負号を除いた被積分密度は非負で、$\partial\psi\ne0$ なら正になる。積分零から $\partial\psi=0$、実関数なので $d\psi=0$。連結性から $\psi$ は定数、従って $\omega_1=\omega_2$。
<!-- solution-end -->

<a id="ex-cyg1-10-b03"></a>
#### CYG1-10-B03 Enriques曲面で同値でない結論を分ける
- Level: B

$X$ は滑らかな複素射影Enriques曲面であり、$K_X$ は非自明な2-torsion正則線束であるという既知の結果を用いてよい。次を判定し、根拠を述べよ。

1. $c_1(X)_{\mathbb R}=0$。
2. $X$ にRicci平坦Kähler計量が存在する。
3. $K_X\simeq\mathcal O_X$。

<!-- solution-start -->
**詳細解答。** [Enriques曲面のChern類](../CYG1-03/index.md#prop-cyg1-03-enriques-chern)により $2c_1(K_X)=0$ であり、整数類は非零だが実係数へ送れば零になる。$c_1(X)_{\mathbb R}=-c_1(K_X)_{\mathbb R}=0$、従って1は真。射影的なので[射影多様体のKähler性](../../KAH/KAH1-14/index.md#thm-kah1-14-projective-integral)が使え、滑らか・コンパクトなので[Yauの系](#cor-cyg1-10-ricci-flat)により2も真。$K_X$ は非自明という仮定だから3は偽である。**実係数Chern類の消失は正則束の自明性より弱い**。
<!-- solution-end -->

<a id="ex-cyg1-10-b04"></a>
#### CYG1-10-B04 非コンパクトな場合に一意性が壊れる
- Level: B

$X=\mathbb C$ 上で $\omega_1=i\,dz\wedge d\bar z$、$\omega_2=2i\,dz\wedge d\bar z$ を考える。両者のKähler性、Ricci形式、de Rham類を比較し、[一意性命題](#prop-cyg1-10-uniqueness)のどの仮定が必要であるか説明せよ。

<!-- solution-start -->
**詳細解答。** 両者は正の係数一定の実 $(1,1)$ 形式で、実次元二では自動的に閉じる。計量係数は $1,2$ だから

$$
\rho(\omega_1)=-i\partial\bar\partial\log1=0,\qquad
\rho(\omega_2)=-i\partial\bar\partial\log2=0.
$$

$\mathbb C$ は可縮なので $H^2_{\mathrm{dR}}(\mathbb C;\mathbb R)=0$、従って $[\omega_1]=[\omega_2]=0$。しかし $\omega_1\ne\omega_2$。一意性命題の**コンパクト性**が失われたので、体積積分によって倍率を1へ固定する議論は使えず、実際に結論が偽になる。
<!-- solution-end -->

<a id="ex-cyg1-10-c01"></a>
#### CYG1-10-C01 同一Kähler類の曲率を設計する
- Level: C

$T=\mathbb C/(\mathbb Z+i\mathbb Z)$、$\omega_0=i\,dz\wedge d\bar z$、$f(x)=1+\varepsilon\cos(2\pi x)$（$0<|\varepsilon|<1$）とし、$\omega_\varepsilon=f(x)\omega_0$ とする。次を一続きに判定せよ。

1. $\omega_\varepsilon$ と $\omega_0$ は同じKähler類か。
2. $\rho(\omega_\varepsilon)$ は零か（$x=0$ で判定してよい）。
3. Ricci形式 $\eta=\rho(\omega_\varepsilon)$ を指定した場合と $\eta=0$ を指定した場合、それぞれそのKähler類の唯一の解は何か。
4. この例が「$c_1(T)_{\mathbb R}=0$ なら任意のKähler計量がRicci平坦」という主張の反例になる理由は何か。

<!-- solution-start -->
**詳細解答。** まず $f\ge1-|\varepsilon|>0$、実次元二なので $\omega_\varepsilon$ は閉じる。$\varphi=-\varepsilon\cos(2\pi x)/\pi^2$ について

$$
i\partial\bar\partial\varphi
=\frac{i}{4}\frac{d^2\varphi}{dx^2}\,dz\wedge d\bar z
=i\varepsilon\cos(2\pi x)\,dz\wedge d\bar z,
$$

従って $[\omega_\varepsilon]=[\omega_0]$。次に $\log\det g_\varepsilon=\log f$。$f'(0)=0$、$f''(0)=-4\pi^2\varepsilon$ だから

$$
\left.\frac{d^2}{dx^2}\log f\right|_{x=0}
=\left.\left(\frac{f''}{f}-\frac{(f')^2}{f^2}\right)\right|_{x=0}
=-\frac{4\pi^2\varepsilon}{1+\varepsilon}.
$$

ゆえに

$$
\rho(\omega_\varepsilon)|_{x=0}
=\frac{i\pi^2\varepsilon}{1+\varepsilon}\,dz\wedge d\bar z\ne0.
$$

[$\rho(\omega_\varepsilon)$ と体積比の関係](#prop-cyg1-10-ricci-volume-ratio)はこの計算と一致する。指定 $\eta=\rho(\omega_\varepsilon)$ では $\omega_\varepsilon$ が解なので、[YauのRicci形式指定定理](#thm-cyg1-10-yau)（または[一意性命題](#prop-cyg1-10-uniqueness)）からそれが唯一。指定 $\eta=0$ では $\omega_0$ がRicci平坦であり、同じく唯一である。最後に $c_1(T)_{\mathbb R}=0$ だが $\omega_\varepsilon$ 自身のRicci形式は非零だから、**存在する代表の選択**と**すべての代表の性質**を混同する主張は偽である。
<!-- solution-end -->

<a id="ex-cyg1-10-c02"></a>
#### CYG1-10-C02 quintic・射影直線・トーラスを横断判定する
- Level: C

次の三対象について、固定Kähler類 $\alpha$ に $\eta=0$ のRicci平坦Kähler形式が存在するか、存在するなら一意かを判断せよ。また「Ricci平坦なら全ホロノミー群がちょうど $SU(n)$」という追加結論が自動では従わない理由を述べよ。

1. 滑らかな五次超曲面 $Q\subset\mathbb P^4$（複素次元三）。
2. $\mathbb{CP}^1$。
3. 平坦複素トーラス $\mathbb C^n/\Lambda$（複素次元 $n\ge1$）。

<!-- solution-start -->
**詳細解答。** まず三対象はいずれもコンパクト・連結・Kählerである。$Q$ は滑らかな射影多様体であり、[超曲面の標準束計算](../CYG1-08/index.md#prop-cyg1-08-smooth-canonical)から $K_Q\simeq\mathcal O_Q$、従って $c_1(Q)_{\mathbb R}=0$。[$\eta=0$ の存在・一意性](#cor-cyg1-10-ricci-flat)により任意のKähler類 $\alpha$ にただ一つのRicci平坦Kähler形式がある。

$\mathbb{CP}^1$ では[第一Chern類のRicci代表](../../KAH/KAH1-12/index.md#thm-kah1-12-ricci-chern)をFubini–Study形式へ適用して $2\pi c_1=2[\omega_{\mathrm{FS}}]\ne0$ を得る。従って $\eta=0$ は許されず、Ricci平坦Kähler形式は存在しない。

トーラスは[平坦Kähler形式](../CYG1-04/index.md#prop-cyg1-04-flat-holonomy)を持ち $c_1(X)_{\mathbb R}=0$。任意のKähler類 $\alpha$ でRicci平坦解が一意に存在する。とくに平坦形式の類ではその平坦形式自身が解である。

ただしYauの定理は**Ricci形式**を指定するだけで、Riemann曲率テンソルや全ホロノミー群を指定しない。実際、トーラスの平坦計量の全ホロノミーは自明群であり、複素次元 $n\ge2$ では $SU(n)$ より真に小さい。[制限ホロノミーの $SU(n)$ 包含](../../KAH/KAH1-16/index.md#thm-kah1-16-su-restricted)も等号を保証しない。従って追加の等号を自動的に結論してはいけない。
<!-- solution-end -->

## 8. 次の問い――Ricciが零なら、どのホロノミーまで絞れるか

Yauの定理で、実第一Chern類の消失から**各Kähler類でのRicci平坦計量の存在**が得られた。ここで選ぶのは計量であり、標準束の正則自明性や全ホロノミーの等号ではない。次章では、Ricci曲率が零の計量について[制限ホロノミー](../../KAH/KAH1-16/index.md#thm-kah1-16-su-restricted)がなぜ $SU(n)$ に収まるか、さらに全ホロノミーを論じるときに何が不足するかを追う。

### 参考文献

- S.-T. Yau, "On the Ricci curvature of a compact Kähler manifold and the complex Monge–Ampère equation, I", *Communications on Pure and Applied Mathematics* **31** (1978), 339–411. （存在定理の原著論文）
- D. Joyce, *Compact Manifolds with Special Holonomy*, Oxford University Press, 2000, Chapter 5. （Ricci平坦Kähler計量と特殊ホロノミーの関係）
