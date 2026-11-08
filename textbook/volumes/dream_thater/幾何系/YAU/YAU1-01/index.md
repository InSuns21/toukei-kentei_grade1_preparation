# YAU1-01 Calabi予想は何を固定し何を指定するか

## 1. 曲率を指定する前に、動かしてよいものを決める

前の講座では、[Ricci形式と実第一Chern類の関係](../../KAH/KAH1-12/index.md#thm-kah1-12-ricci-chern)と、[YauのRicci形式指定定理](../../CYG/CYG1-10/index.md#thm-cyg1-10-yau)を学んだ。そこでは後者の**存在**を外から与えられた定理として使った。本講座では、その存在を解析的に証明する。まず、何を入力し何を求める問題なのかを固定しよう。

一つの複素多様体でもKähler計量は多数ある。計量を選び直すとRicci形式は変わるが、[Ricci形式のde Rham類](../../KAH/KAH1-12/index.md#thm-kah1-12-ricci-chern)は変わらない。しかも、計量を無制限に動かすと「唯一」という結論は偽になる。そこで、正値な実閉 $(1,1)$ 形式から定まる[**Kähler類**](../../KAH/KAH1-13/index.md#def-kah1-13-class)を固定しておく。

以下、$X$ は**境界のない、滑らかで連結かつコンパクトな複素次元 $n\ge1$ のKähler多様体**とする。複素構造 $J$ は動かさない。$\mathcal K_X$ は $X$ のKähler類の集合、$H^2_{\mathrm{dR}}(X;\mathbb R)$ は実係数de Rhamコホモロジーである。二つの記号の役割を区別する。

- $\alpha\in\mathcal K_X$：**固定する**Kähler類。これを代表するKähler形式 $\omega$ は最初に一つ選べる。
- $\eta$：**指定する**Ricci形式。これは滑らかな実閉 $(1,1)$ 形式であり、正値である必要はない。

未知量は、同じ複素構造 $J$ のもとで $\alpha$ を代表する新しいKähler形式 $\widehat\omega$ である。未知量に課す二条件は

$$
[\widehat\omega]=\alpha,\qquad
\rho(\widehat\omega)=\eta.
$$

ここで $\rho$ は[Ricci形式の局所行列式公式](../../KAH/KAH1-11/index.md#thm-kah1-11-local-ricci)に従い、正則座標で

$$
\widehat\omega=i\sum_{j,k=1}^n\widehat g_{j\bar k}\,dz^j\wedge d\bar z^k,
\qquad
\rho(\widehat\omega)=-i\partial\bar\partial\log\det(\widehat g_{j\bar k})
$$

と定める。係数行列 $\widehat G=(\widehat g_{j\bar k})$ は[正値形式の行列判定](../../KAH/KAH1-02/index.md#prop-kah1-02-matrix-criterion)により正定値Hermite行列で、$\det\widehat G>0$ だから対数は意味を持つ。添字 $j,\bar k$ はそれぞれ正則・反正則座標方向を示す。

### 許容される入力を定義する

どんな $\eta$ でもよいわけではない。Ricci形式の類が計量によらない以上、目標のde Rham類を揃える必要がある。この事実を入力条件に組み込む。

<a id="def-yau1-01-data"></a>

<!-- formal-statement-start -->
> **定義（Ricci指定問題の許容データ）**
>
> $X$ を上記のコンパクト連結Kähler多様体とする。次を満たす組 $(\alpha,\eta)$ を、$X$ 上の **Ricci指定問題の許容データ** とする。
>
> **（D1）** $\alpha\in\mathcal K_X$ はKähler類である。
>
> **（D2）** $\eta$ は滑らかな実閉 $(1,1)$ 形式である。
>
> **（D3）** $\eta$ の実de Rham類は次を満たす。

$$
[\eta]=2\pi c_1(X)_{\mathbb R}\in H^2_{\mathrm{dR}}(X;\mathbb R).
$$

> ここで $c_1(X)_{\mathbb R}$ は接束の第一Chern類を実係数へ写したものである。許容データの**解**は、$[\widehat\omega]=\alpha$ かつ $\rho(\widehat\omega)=\eta$ を満たすKähler形式 $\widehat\omega$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-yau1-01-data -->
**定義の確認**（平坦楕円曲線）。$T=\mathbb C/(\mathbb Z+i\mathbb Z)$ とし、標準座標 $z=x+iy$ 上の

$$
\omega_0=i\,dz\wedge d\bar z=2\,dx\wedge dy,\qquad
\alpha=[\omega_0],\qquad\eta=0
$$

を取る。$\omega_0$ は周期的なので商へ降り、実 $(1,1)$ 型、正値、閉性をそれぞれ満たす。従って（D1）を満たす。（D2）では零形式は実・滑らか・閉で型 $(1,1)$ に属する。[平坦トーラスのRicci形式](../../CYG/CYG1-04/index.md#prop-cyg1-04-flat-holonomy)は零であり、[Ricci形式と反標準束の第一Chern形式](../../KAH/KAH1-12/index.md#thm-kah1-12-ricci-chern)から $c_1(T)_{\mathbb R}=0$、従って（D3）も満たす。$\widehat\omega=\omega_0$ は実際の解である。
<!-- definition-example-end -->

この例で目標が零なのは特別な場合であって、定義は $\eta$ の正値性も零性も要求していない。

## 2. なぜChern類と型の整合が必要なのか

Ricci形式は単なる任意の閉2形式ではない。局所行列式から作るので実 $(1,1)$ 型であり、積分コホモロジーの情報を持つ。

<a id="prop-yau1-01-necessary"></a>

<!-- formal-statement-start -->
> **命題（指定Ricci形式の必要条件）**
>
> $X$ を境界のないコンパクト連結複素次元 $n\ge1$ のKähler多様体とする。滑らかなKähler形式 $\widehat\omega$ に対して $\eta=\rho(\widehat\omega)$ と置くなら、$\eta$ は滑らかな実閉 $(1,1)$ 形式で、

$$
[\eta]=2\pi c_1(X)_{\mathbb R}
$$

> を満たす。特に $c_1(X)_{\mathbb R}\ne0$ の場合、$\rho(\widehat\omega)=0$ を満たすKähler形式は存在しない。
<!-- formal-statement-end -->

### 証明の見取り図

局所表示の $\partial\bar\partial$ は型 $(1,1)$ を作り、全体の閉性とChern類の一致は[既習のRicci–Chern同定](../../KAH/KAH1-12/index.md#thm-kah1-12-ricci-chern)が保証する。零Ricci形式ならそのde Rham類も零である。

<!-- proof-start -->
### 証明

正則座標で $G=(g_{j\bar k})$ は正値Hermite行列なので、$\log\det G$ は実数値滑らかな関数である。よって局所的に

$$
\rho(\widehat\omega)=-i\partial\bar\partial\log\det G
$$

は実 $(1,1)$ 型である。$\partial^2=\bar\partial^2=0$、$\partial\bar\partial+\bar\partial\partial=0$ から $d\rho=0$。座標変換時の行列式の変換も含めて、[Ricci–Chern同定定理](../../KAH/KAH1-12/index.md#thm-kah1-12-ricci-chern)を $\widehat\omega$ に適用すると

$$
[\rho(\widehat\omega)]=2\pi c_1(X)_{\mathbb R}.
$$

$\rho(\widehat\omega)=0$ なら左辺は $[0]=0$。$2\pi\ne0$ より $c_1(X)_{\mathbb R}=0$ が従う。$\square$
<!-- proof-end -->

必要条件だけでは、指定された形式を実際に実現できるとは言えない。「類が合う」から「正値な計量が見つかる」への飛躍が、Calabi予想の大きな難所である。

### 許容されない例：射影直線の零Ricci指定

$X=\mathbb{CP}^1$ のFubini–Study形式 $\omega_{\mathrm{FS}}$ は[局所表示と貼り合わせ](../../KAH/KAH1-07/index.md#thm-kah1-07-global-fs)でKähler形式を与え、[Ricci形式の計算](../../KAH/KAH1-15/index.md#thm-kah1-15-fs)は

$$
\rho(\omega_{\mathrm{FS}})=2\omega_{\mathrm{FS}}
$$

を与える。$[\omega_{\mathrm{FS}}]$ は[コンパクト上のKähler類の非零性](../../KAH/KAH1-13/index.md#thm-kah1-13-compact-nonzero)により零でないので、

$$
2\pi c_1(\mathbb{CP}^1)_{\mathbb R}=2[\omega_{\mathrm{FS}}]\ne0.
$$

従って $\eta=0$ は（D3）を満たさない。どのKähler類を選んでも解がないことは定理と矛盾せず、**入力が許容されない**のである。ここで $\eta=2\omega_{\mathrm{FS}}$ なら許容され、既知の解 $\omega_{\mathrm{FS}}$ を持つ。

## 3. 「任意」「存在」「一意」を一行ずつ読む

許容データの集合が定まれば、問いは量化記号で書ける。まず $X$ と複素構造は固定し、次にKähler類 $\alpha$ を任意に取る。そのあと整合条件を満たすRicci目標 $\eta$ を任意に指定する。答えとして得られるのは、**その組ごとに**ただ一つのKähler形式である。

<a id="thm-yau1-01-precise"></a>

<!-- formal-statement-start -->
> **定理（Calabi予想の精密な量化）**
>
> $X$ を滑らかな、境界のないコンパクト連結Kähler多様体（複素次元 $n\ge1$）とする。各Kähler類 $\alpha\in\mathcal K_X$ と、各滑らかな実閉 $(1,1)$ 形式 $\eta$ で $[\eta]=2\pi c_1(X)_{\mathbb R}$ を満たすものに対し、ただ一つのKähler形式 $\widehat\omega_{\alpha,\eta}$ が存在して

$$
[\widehat\omega_{\alpha,\eta}]=\alpha,\qquad
\rho(\widehat\omega_{\alpha,\eta})=\eta
$$

> を満たす。複素構造は固定する。「ただ一つ」は **$(\alpha,\eta)$ ごとのKähler形式**についての一意性である。
<!-- formal-statement-end -->

これは[CYG1-10で外部入力として述べたYauの定理](../../CYG/CYG1-10/index.md#thm-cyg1-10-yau)を、今後の証明のために再掲して量化を固定したものである。**存在を本章で新たに証明したのではない。** 存在に必要な連続性の方法、$C^0$・二階・三階評価、正則性と閉性は後続の講義で構成する。一意性は[CYG1-10の積分による一意性命題](../../CYG/CYG1-10/index.md#prop-cyg1-10-uniqueness)として既に証明されている。

論理式では、$\mathcal A_X$ を[許容データ](#def-yau1-01-data)の集合と書くと、

$$
\forall(\alpha,\eta)\in\mathcal A_X\quad
\exists!\widehat\omega\in\mathcal K\!F_X:
\quad [\widehat\omega]=\alpha\ \land\ \rho(\widehat\omega)=\eta
$$

となる。$\mathcal K\!F_X$ は $X$ 上の全Kähler形式の集合をここで表す記号であって、Kähler**類**の集合 $\mathcal K_X$ と区別する。$\exists!$ は「存在し、かつその条件を満たすものが一つだけ」という意味である。

注意したい誤読は次の三つである。

1. **全Kähler類を通じた一意性ではない。** $\alpha$ を変えると別の計量が許される。
2. **目標$\eta$を選ばず、Chern類だけで計量が決まるわけではない。** 同じ類の異なるRicci形式を目標にできる。
3. **ポテンシャルそのものは一意ではない。** その定数差は次節で扱う。

### 楕円曲線で量化の順序を確かめる

第1節の $\omega_0$ に対し $t>0$ を取れば $\omega_t=t\omega_0$ もKähler形式で、

$$
[\omega_t]=t[\omega_0],\qquad
\rho(\omega_t)=-i\partial\bar\partial\log t=0.
$$

楕円曲線では $\int_T\omega_t=t\int_T\omega_0$ なので $t\ne1$ なら類は異なる。同じ $\eta=0$ でも、**異なる入力類**には異なる解が存在する。この例は定理の量化に反しない。むしろ類の固定を取り去ると一意性が壊れることを直接示す。

## 4. 計量の一意性とポテンシャルの定数差は別の主張

解くべき未知量は計量を表す形式 $\widehat\omega$ だが、解析では実関数 $\varphi$ を用いる。[大域$\partial\bar\partial$補題の帰結](../../HOD/HOD1-08/index.md#cor-hod1-08-d-exact)により、同じ類にある二つの実閉 $(1,1)$ 形式は、差を実関数の $i\partial\bar\partial$ として表せるからである。

$$
\omega_\varphi=\omega+i\partial\bar\partial\varphi,\qquad
\omega_\varphi>0,\qquad [\omega_\varphi]=[\omega].
$$

$\omega_\varphi>0$ は[正の実 $(1,1)$ 形式の条件](../../KAH/KAH1-02/index.md#def-kah1-02-positive-form)で、単に $\varphi$ が滑らかというだけでは保証されない。$\varphi$ に定数を加えても二階微分は変わらないため、関数の一意性には追加の規格化が要る。

<a id="prop-yau1-01-gauge"></a>

<!-- formal-statement-start -->
> **命題（ポテンシャルの定数差と計量の一意性）**
>
> $X$ を境界のないコンパクト連結Kähler多様体、$\omega$ をKähler形式とする。滑らかな実関数 $\varphi,\psi$ を取り、次の二形式がKähler形式であると仮定する。

$$
\omega_\varphi=\omega+i\partial\bar\partial\varphi>0,\qquad
\omega_\psi=\omega+i\partial\bar\partial\psi>0.
$$
>
> **（1）** $\omega_\varphi=\omega_\psi$ なら $\varphi-\psi$ は定数であり、逆も成り立つ。
>
> **（2）** $\rho(\omega_\varphi)=\rho(\omega_\psi)$ なら $\omega_\varphi=\omega_\psi$ である。従って、両者が同じRicci形式を持つとき、$\varphi-\psi$ は定数である。
<!-- formal-statement-end -->

### 証明の見取り図

（1）は $i\partial\bar\partial(\varphi-\psi)=0$ を積分して示す。（2）は両方が $[\omega]$ に属することを確認し、[固定類での一意性](../../CYG/CYG1-10/index.md#prop-cyg1-10-uniqueness)を適用する。

<!-- proof-start -->
### 証明

$h=\varphi-\psi$ と置く。（1）の仮定から $i\partial\bar\partial h=0$ となる。$\omega$ は閉じており $X$ はコンパクトで境界がないから、[一般 Stokes の定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)を $h\,i\bar\partial h\wedge\omega^{n-1}$ の外微分へ適用できる。具体的には

$$
\begin{aligned}
0&=\int_X h\,i\partial\bar\partial h\wedge\omega^{n-1}\\
 &=-\int_X i\partial h\wedge\bar\partial h\wedge\omega^{n-1}.
\end{aligned}
$$

任意の点で $\omega$ の係数行列を正規直交化する正則座標の一次変換を取り、$\partial h=\sum_jh_jdz^j$ と書く。[正値Hermite行列との対応](../../KAH/KAH1-02/index.md#prop-kah1-02-matrix-criterion)から

$$
i\partial h\wedge\bar\partial h\wedge\omega^{n-1}
=\frac1n\sum_{j=1}^n|h_j|^2\omega^n\ge0.
$$

右辺は連続な非負密度であり、積分が零なので $h_j=0$ が全点で成り立つ。実関数 $h$ について $\partial h=0$ なら $dh=0$。連結性によって $h$ は定数である。逆に定数の $\partial\bar\partial$ は零なので形式は一致する。

（2）では $\omega_\varphi-\omega=i\partial\bar\partial\varphi$ と $\omega_\psi-\omega=i\partial\bar\partial\psi$ がともに完全形式である。従って

$$
[\omega_\varphi]=[\omega_\psi]=[\omega].
$$

両者が正のKähler形式でRicci形式も等しいという[一意性命題](../../CYG/CYG1-10/index.md#prop-cyg1-10-uniqueness)のすべての仮定を満たすため $\omega_\varphi=\omega_\psi$。これに（1）を適用する。$\square$
<!-- proof-end -->

例えば $\int_X\varphi\,\omega^n=0$ と指定すれば、定数の不定性は消える。$h=c$ が定数なら

$$
0=\int_Xh\,\omega^n=c\int_X\omega^n
$$

であり、Kähler体積が正だから $c=0$ となる。ただし「$\int_X\varphi\,\omega^n=0$」は**ポテンシャルの表記規約**であり、定理が指定する幾何学的データに新しい条件を加えるものではない。

## 5. 体積を合わせる定数は、自由なパラメータではない

指定された $\eta$ と、基準のKähler形式 $\omega\in\alpha$ に対し、[大域$\partial\bar\partial$補題](../../HOD/HOD1-08/index.md#cor-hod1-08-d-exact)と[Ricci–Chern同定](../../KAH/KAH1-12/index.md#thm-kah1-12-ricci-chern)から、ある滑らかな実関数 $u$ が存在して

$$
\eta=\rho(\omega)+i\partial\bar\partial u
$$

と書ける。$\eta$ と $\rho(\omega)$ が同じ類の閉 $(1,1)$ 形式だから、この引き算が可能である。別の実関数 $u$ は定数だけ異なる。

未知のKähler形式は $\omega_\varphi>0$ と表す。[Ricci形式の差と体積比](../../CYG/CYG1-10/index.md#prop-cyg1-10-ricci-volume-ratio)の命題から、$\rho(\omega_\varphi)=\eta$ は

$$
\partial\bar\partial\left(
\log\frac{\omega_\varphi^n}{\omega^n}+u
\right)=0
$$

を意味する。括弧内は大域的な実関数であり、コンパクト連結なKähler多様体では前節と同じ積分論法から定数 $C$ となる。従って、解が存在すれば

$$
\omega_\varphi^n=e^{C-u}\omega^n
$$

を満たす。しかし $C$ は任意に選べない。

<a id="prop-yau1-01-volume"></a>

<!-- formal-statement-start -->
> **命題（体積正規化の整合性）**
>
> $X$ を境界のないコンパクト連結Kähler多様体（複素次元 $n\ge1$）とし、$\omega$ をKähler形式、$u$ を滑らかな実関数とする。$\omega_\varphi=\omega+i\partial\bar\partial\varphi>0$ が

$$
\omega_\varphi^n=e^{C-u}\omega^n
$$

> を満たすなら、定数 $C$ は必ず

$$
C=\log\frac{\displaystyle\int_X\omega^n}
{\displaystyle\int_Xe^{-u}\omega^n}
$$

> である。$u$ を $u+a$（$a\in\mathbb R$）へ変えた場合、$C$ は $C+a$ となり、右辺の密度 $e^{C-u}$ は変わらない。
<!-- formal-statement-end -->

### 証明の見取り図

同じKähler類にある二形式の最高次外積の積分は一致する。これは外積の因数分解とStokesから従う。その等式を体積方程式へ代入すれば $C$ が決まる。

<!-- proof-start -->
### 証明

$i\partial\bar\partial\varphi=d(i\bar\partial\varphi)$ であり、$\omega$ と $\omega_\varphi$ は閉じる。偶次数の外積が可換であることから

$$
\omega_\varphi^n-\omega^n
=d(i\bar\partial\varphi)\wedge
\sum_{k=0}^{n-1}\omega_\varphi^k\wedge\omega^{n-1-k}.
$$

右辺の総和を $S$、$i\bar\partial\varphi$ を $\theta$ とおく。$dS=0$ かつ $\theta$ は1形式なので

$$
d(\theta\wedge S)=d\theta\wedge S-\theta\wedge dS=d\theta\wedge S.
$$

つまり体積形式の差は完全形式である。コンパクトで境界のない $X$ 上で[一般 Stokes の定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)を適用すると

$$
V:=\int_X\omega^n=\int_X\omega_\varphi^n
=e^C\int_Xe^{-u}\omega^n.
$$

$V>0$ で、$e^{-u}>0$ はコンパクトな $X$ 上で滑らかだから分母も正かつ有限である。よって $e^C=V/\int_Xe^{-u}\omega^n$。実対数を取って結論の式を得る。さらに $u'=u+a$ とすると

$$
\int_Xe^{-u'}\omega^n=e^{-a}\int_Xe^{-u}\omega^n,\quad
C'=\log\frac{V}{e^{-a}\int_Xe^{-u}\omega^n}=C+a,
$$

従って $C'-u'=C-u$。$\square$
<!-- proof-end -->

この計算は**必要な正規化**を与えたのであって、任意の右辺に対する $\omega_\varphi>0$ の存在を証明したのではない。存在のためには非線形方程式の解の事前評価が必要になる。既習の[体積方程式との同値性](../../CYG/CYG1-10/index.md#prop-cyg1-10-monge-ampere-reduction)は、ここで行った入力と出力の区別をより一般的な形で述べている。

## 6. 三つの仮定がどこに効くのか

- **Kähler類を固定する理由：** $\omega_0$ と $2\omega_0$ は平坦楕円曲線上で同じRicci形式を持つが、面積が違うので別のKähler類に属する。類を自由にすれば一意性は成立しない。
- **Chern類の整合条件：** $\mathbb{CP}^1$ で $\eta=0$ は必要条件に反する。「存在定理が失敗した例」ではなく、そもそも許されない入力である。
- **コンパクト性の役割：** 非コンパクトな $\mathbb C$ 上では $H^2_{\mathrm{dR}}(\mathbb C;\mathbb R)=0$。$\omega_0=i\,dz\wedge d\bar z$ と $2\omega_0$ は同じde Rham類かつRicci形式零だが異なる。前節の体積積分・Stokes、前々節の一意性の積分にはコンパクト性が使われていた。

さらに、連結性はポテンシャルの定数を**一個**にするために必要である。非連結な二つのコンパクト成分上では $i\partial\bar\partial h=0$ の実関数 $h$ は各成分で別の定数を取れる。これは計量が二通りあるという意味ではない。

## 7. 演習：量化・整合条件・正規化を自力で検算する

<a id="ex-yau1-01-a01"></a>
#### YAU1-01-A01 入力と未知量を仕分ける
- Level: A

コンパクト連結Kähler多様体 $X$ で、複素構造 $J$、Kähler類 $\alpha$、目標Ricci形式 $\eta$、未知形式 $\widehat\omega$ のうち、Calabi予想の指定Ricci形式問題で固定するもの、指定するもの、解くものを答え、未知形式の二条件を書け。

<!-- solution-start -->
**詳細解答。** 複素構造 $J$ と多様体 $X$ は固定する。$\alpha$ と $\eta$ はそれぞれ固定類と指定目標であり、[許容データ](#def-yau1-01-data)の（D1）〜（D3）を満たす必要がある。未知量 $\widehat\omega$ はこの固定複素構造上の正の実閉 $(1,1)$ 形式で、満たすべき二条件は

$$
[\widehat\omega]=\alpha,\qquad \rho(\widehat\omega)=\eta.
$$

この二条件に加えて $\widehat\omega>0$ と $d\widehat\omega=0$ がKähler形式の定義の中に含まれる。
<!-- solution-end -->

<a id="ex-yau1-01-a02"></a>
#### YAU1-01-A02 零Ricci目標が可能な条件
- Level: A

コンパクト連結Kähler多様体 $X$ で $\eta=0$ を許容データとして指定できるための、$c_1(X)_{\mathbb R}$ に関する必要十分条件を示せ。ただし、指定できることと実際の解の存在を区別せよ。

<!-- solution-start -->
**詳細解答。** 零形式は滑らかな実閉 $(1,1)$ 形式なので（D2）は自動的に成立する。Kähler類 $\alpha$ は任意に一つ選べるから（D1）も満たせる。残る（D3）は

$$
[0]=2\pi c_1(X)_{\mathbb R}
\iff c_1(X)_{\mathbb R}=0
$$

であり、$2\pi\ne0$ を使った。この条件は入力を許すための必要十分条件である。解の存在は[指定Ricci形式定理](#thm-yau1-01-precise)の存在部分をさらに使って初めて結論できる。
<!-- solution-end -->

<a id="ex-yau1-01-a03"></a>
#### YAU1-01-A03 定数倍でKähler類を変える
- Level: A

$T=\mathbb C/(\mathbb Z+i\mathbb Z)$、$\omega_0=i\,dz\wedge d\bar z$ とする。$t>0$ について $\omega_t=t\omega_0$ のRicci形式と面積を求め、$t\ne1$ なら $\omega_t$ が同じRicci形式を持つ別のKähler類に属することを示せ。

<!-- solution-start -->
**詳細解答。** 座標表示の係数行列は複素次元1では $(t)$ で、[Ricci形式の局所行列式公式](../../KAH/KAH1-11/index.md#thm-kah1-11-local-ricci)より

$$
\rho(\omega_t)=-i\partial\bar\partial\log t=0.
$$

$z=x+iy$ に対して $\omega_t=2t\,dx\wedge dy$ だから、基本領域 $0\le x,y\le1$ で $\int_T\omega_t=2t$。$t\ne1$ なら積分が $2$ と異なり、もしde Rham類が等しければ積分も等しいことに反する。従って $[\omega_t]\ne[\omega_0]$。
<!-- solution-end -->

<a id="ex-yau1-01-a04"></a>
#### YAU1-01-A04 ポテンシャルの規格化
- Level: A

$X$ を境界のないコンパクト連結Kähler多様体、$\omega$ をKähler形式とする。$\varphi$ を滑らかな実関数とし、$\widetilde\varphi=\varphi+a$ とする。$\omega_{\widetilde\varphi}=\omega_\varphi$ を示し、$\int_X\widetilde\varphi\omega^n=0$ とする唯一の $a$ を求めよ。

<!-- solution-start -->
**詳細解答。** $\partial\bar\partial a=0$ だから $\omega_{\widetilde\varphi}=\omega+i\partial\bar\partial\varphi=\omega_\varphi$。$V=\int_X\omega^n>0$ と置けば

$$
\int_X\widetilde\varphi\omega^n
=\int_X\varphi\omega^n+aV.
$$

従って唯一の定数は $a=-V^{-1}\int_X\varphi\omega^n$ である。非零体積のため解の存在と一意性が成立する。
<!-- solution-end -->

<a id="ex-yau1-01-a05"></a>
#### YAU1-01-A05 正規化の定数
- Level: A

コンパクトKähler多様体 $X$ において $V=\int_X\omega^n$、$\int_Xe^{-u}\omega^n=3V$ とする。体積方程式 $\omega_\varphi^n=e^{C-u}\omega^n$ を満たすために必要な $C$ を求めよ。

<!-- solution-start -->
**詳細解答。** [正規化命題](#prop-yau1-01-volume)を代入すると

$$
e^C=\frac{V}{3V}=\frac13,\qquad C=-\log3.
$$

正規化定数は与えられた積分から決まり、任意に $C=0$ と置くことはできない。
<!-- solution-end -->

<a id="ex-yau1-01-b01"></a>
#### YAU1-01-B01 量化の順序を論理式にする
- Level: B

$\mathcal A_X$ を許容データ集合、$\mathcal K\!F_X$ をKähler形式の集合とする。次の二文のうちYauの定理が保証するものを論理式で書き、他方が誤りであることを楕円曲線で示せ。

1. 各許容データ $(\alpha,\eta)$ に対し唯一の解がある。
2. すべての許容データに共通する一つのKähler形式がある。

<!-- solution-start -->
**詳細解答。** 正しい文1は

$$
\forall(\alpha,\eta)\in\mathcal A_X\quad
\exists!\widehat\omega\in\mathcal K\!F_X:
([\widehat\omega]=\alpha\land\rho(\widehat\omega)=\eta)
$$

である。文2は $\exists\widehat\omega\,\forall(\alpha,\eta)$ という逆の順序を主張する。楕円曲線の $\alpha_1=[\omega_0]$ と $\alpha_2=[2\omega_0]$ は異なる。共通の $\widehat\omega$ があれば $[\widehat\omega]=\alpha_1$ かつ $[\widehat\omega]=\alpha_2$ となるが、積分すると $2=4$ を要求して矛盾する。
<!-- solution-end -->

<a id="ex-yau1-01-b02"></a>
#### YAU1-01-B02 正規化はポテンシャルの選び方に依存しない
- Level: B

$X$ を境界のないコンパクト連結Kähler多様体、$\omega$ をKähler形式、$u$ を実関数とする。$u'=u+a$（$a$ は定数）としたとき、$\eta=\rho(\omega)+i\partial\bar\partial u$ と正規化済み体積密度 $e^{C-u}$ がともに不変であることを示せ。

<!-- solution-start -->
**詳細解答。** 定数の微分が零だから

$$
i\partial\bar\partial(u+a)=i\partial\bar\partial u.
$$

次に $I=\int_Xe^{-u}\omega^n$ とおくと $I'=e^{-a}I$。従って

$$
C'=\log\frac{V}{I'}=\log\frac{V}{e^{-a}I}
=C+a,\qquad C'-u'=C-u.
$$

よって $\eta$ と $e^{C-u}$ は不変。これは $u$ の定数不定性が幾何的な入力を変えないことを表す。
<!-- solution-end -->

<a id="ex-yau1-01-b03"></a>
#### YAU1-01-B03 コンパクトでないと一意性が失われる
- Level: B

$X=\mathbb C$ 上で $\omega_1=i\,dz\wedge d\bar z$、$\omega_2=2i\,dz\wedge d\bar z$ とする。両者が同じde Rham類と同じRicci形式を持つにもかかわらず異なることを示し、[一意性命題](#prop-yau1-01-gauge)のどの仮定が破れているか答えよ。

<!-- solution-start -->
**詳細解答。** $\mathbb C$ は可縮なので $H^2_{\mathrm{dR}}(\mathbb C;\mathbb R)=0$。従って二つの閉2形式の類はともに零で一致する。係数行列は $(1)$ と $(2)$ でいずれも定数だから、[Ricci形式の局所行列式公式](../../KAH/KAH1-11/index.md#thm-kah1-11-local-ricci)より $\rho(\omega_1)=\rho(\omega_2)=0$。しかし非零2形式について $\omega_2=2\omega_1\ne\omega_1$。失われたのは**コンパクト性**であり、Stokesの積分および調和関数の大域的な定数性を使う証明機構が適用できない。
<!-- solution-end -->

<a id="ex-yau1-01-b04"></a>
#### YAU1-01-B04 Ricci目標を変えれば解も変わる
- Level: B

境界のないコンパクト連結Kähler多様体 $X$ の同一Kähler類 $\alpha$ に対して、異なる許容Ricci目標 $\eta_1\ne\eta_2$ を取ったとする。対応する解 $\widehat\omega_1,\widehat\omega_2$ が同じ形式にはなれないことを示し、「一意性」の量化と矛盾しない理由を述べよ。

<!-- solution-start -->
**詳細解答。** 仮に $\widehat\omega_1=\widehat\omega_2$ とすると、Ricci形式は計量から一意に決まるので

$$
\eta_1=\rho(\widehat\omega_1)
=\rho(\widehat\omega_2)=\eta_2,
$$

となり $\eta_1\ne\eta_2$ に矛盾する。定理が保証する一意性は**同じ**組 $(\alpha,\eta)$ を固定したときだけである。ここでは $\eta$ が変わっており、二つの解が異なるのは自然である。
<!-- solution-end -->

<a id="ex-yau1-01-c01"></a>
#### YAU1-01-C01 楕円曲線で同じ類の異なるRicci目標を構成する
- Level: C

$T=\mathbb C/(\mathbb Z+i\mathbb Z)$、$z=x+iy$、$\omega_0=i\,dz\wedge d\bar z$ とする。$0<\varepsilon<1$ を固定し、

$$
\omega_\varepsilon=(1+\varepsilon\cos 2\pi x)\omega_0
$$

と置く。次を証明せよ。

1. $\omega_\varepsilon$ はKähler形式で、$[\omega_\varepsilon]=[\omega_0]$。
2. $\eta_\varepsilon=\rho(\omega_\varepsilon)$ と $\eta_0=0$ はともに $\alpha=[\omega_0]$ に対する許容目標で、しかも異なる。
3. 同じ類で異なる二つの許容目標に対して解が異なることが、Yauの一意性と両立する理由を述べよ。

<!-- solution-start -->
**詳細解答。** $f(x)=1+\varepsilon\cos(2\pi x)>0$ なので正値であり、実次元2の3形式は零だから $d\omega_\varepsilon=0$。実 $(1,1)$ 型・滑らかさも明らかに満たし、Kähler形式である。類の比較には周期的な実関数

$$
\varphi(x)=-\frac{\varepsilon}{\pi^2}\cos(2\pi x)
$$

を用いる。$\partial_z\partial_{\bar z}=\frac14(\partial_x^2+\partial_y^2)$ で、$\partial_x^2\varphi=4\varepsilon\cos(2\pi x)$、$\partial_y^2\varphi=0$。従って

$$
i\partial\bar\partial\varphi
=\varepsilon\cos(2\pi x)\,i\,dz\wedge d\bar z
=\omega_\varepsilon-\omega_0.
$$

差は完全形式だから $[\omega_\varepsilon]=[\omega_0]$。[Ricci形式の局所行列式公式](../../KAH/KAH1-11/index.md#thm-kah1-11-local-ricci)を次に適用して

$$
\eta_\varepsilon=-\frac i4(\log f)''(x)\,dz\wedge d\bar z.
$$

$f'(0)=0$、$f''(0)=-4\pi^2\varepsilon$ なので

$$
(\log f)''(0)=\frac{f''(0)}{f(0)}
-\frac{(f'(0))^2}{f(0)^2}
=-\frac{4\pi^2\varepsilon}{1+\varepsilon}\ne0.
$$

従って $\eta_\varepsilon\ne0=\eta_0$。一方、双方は実閉 $(1,1)$ 形式であり、[Ricci–Chern同定](../../KAH/KAH1-12/index.md#thm-kah1-12-ricci-chern)から同じ $2\pi c_1(T)_{\mathbb R}=0$ を代表する。従ってそれぞれ許容データで、$\omega_\varepsilon$ と $\omega_0$ が明示的な解である。定理は「同じ $\alpha$ と同じ $\eta$」での唯一性を保証するだけで、$\eta$ が異なる場合に同じ解であるとは述べない。
<!-- solution-end -->

<a id="ex-yau1-01-c02"></a>
#### YAU1-01-C02 三つの失敗を必要条件と十分条件に分解する
- Level: C

次の主張をそれぞれ判定し、真なら根拠、偽なら具体例と証明の破綻箇所を述べよ。

1. コンパクトKähler多様体で $c_1(X)_{\mathbb R}=0$ なら、**選んだすべてのKähler計量**がRicci平坦である。
2. コンパクト連結Kähler多様体で $c_1(X)_{\mathbb R}=0$ なら、**各Kähler類に**Ricci平坦計量がただ一つ存在する。
3. 任意の連結Kähler多様体では、同じde Rham類・同じRicci形式を持つ二つのKähler計量が一致する。

<!-- solution-start -->
**詳細解答。** 1は偽。[楕円曲線の周期的な例](#ex-yau1-01-c01)では $c_1(T)_{\mathbb R}=0$ だが $\eta_\varepsilon\ne0$ の $\omega_\varepsilon$ が存在する。Chern類の零性はRicci形式の**類**が零であることしか意味せず、各代表が零という結論は出ない。

2は真。$\eta=0$ は[許容データ](#def-yau1-01-data)の整合条件を満たすので、任意の $\alpha$ に対して[指定Ricci形式定理](#thm-yau1-01-precise)を適用し、唯一の $\widehat\omega_{\alpha,0}$ を得る。存在にはYauの存在定理という非自明な入力が必要であり、Chern類の等号だけでは導けない。

3は偽。[複素直線の反例](#ex-yau1-01-b03)では $\omega_1$ と $2\omega_1$ は類・Ricci形式が一致するが異なる。連結性は満たすもののコンパクト性を欠き、積分を使った一意性の証明は成立しない。
<!-- solution-end -->

## 8. ここから先の証明で埋めるもの

本章で確かめたのは、入力の型とChern類の整合条件、量化の正しい読み方、既習の一意性の使い方、体積方程式へ移る際の必要な正規化である。**任意の許容データから正値な解が本当に作れる理由**はまだ示していない。

次に、Ricci差と大域ポテンシャルの対応を精密化し、複素Monge–Ampère方程式の楕円性を調べる。そのあと連続性の方法と一様評価を組み立て、解が失われないことを示すと、ここで宣言した存在命題を証明として閉じられる。

### 参考文献

- [V. V. Datar, *Lecture Notes on Calabi’s Conjectures and Kähler–Einstein Metrics*](https://math.iisc.ac.in/~vvdatar/Lecture_Notes/Calabi_Yau.pdf) — 問題の指定データと連続性の方法。
- [Z. Błocki, *The Complex Monge–Ampère Equation on Compact Kähler Manifolds*](https://www3.nd.edu/~jdiller/teaching/archive/spring11_80380/blocki2.pdf) — 体積方程式と解析的な存在証明。
