# QFT39 カイラル対称性の量子異常・FujikawaのJacobianと軸性Ward恒等式

[QFT32のカイラリティ](../QFT32/index.md#def-qft32-chirality)によれば、質量零のDirac場は左成分と右成分に分かれます。[QFT33の大域対称性とNoether流](../QFT33/index.md#thm-qft33-goldstone)では、対称性と保存流を結び付けました。一方、[QFT19のBerezin積分](../QFT19/index.md#def-qft19-berezin)では、フェルミオンの積分測度が変数変換の行列式の**逆数**を受け取ることを学びました。

ここには一つの緊張があります。**古典作用がカイラル回転で不変でも、量子論の積分測度まで不変とは限りません。** 本講では、質量を持たないDirac場の軸性電流を古典論で導き、有限個のGrassmann変数から測度のJacobianを計算し、ゲージ不変な熱核正則化で四次元の軸性異常を求めます。さらに、背景場が零の場合、質量が正の場合、非可換群に拡張する場合を区別します。

まずMinkowski空間では計量 $\eta=\operatorname{diag}(1,-1,-1,-1)$、$\hbar=c=1$、$\gamma^5=i\gamma^0\gamma^1\gamma^2\gamma^3$ を使います。量子測度の計算では[QFT20のEuclid化](../QFT20/index.md#def-qft20-euclidean-action)の考え方に従い、正定値内積 $x\cdot y=\sum_{\mu=1}^4x^\mu y^\mu$ を持つ $\mathbb R^4$ を**四次元Euclid空間**として導入します。座標を $x^1,\ldots,x^4$、$\delta_{\mu\nu}$ を計量、$\varepsilon^{1234}=+1$ と固定します。Euclidの $\gamma_E^\mu$ はHermitianで $\{\gamma_E^\mu,\gamma_E^\nu\}=2\delta^{\mu\nu}$、$\Gamma_5=\gamma_E^1\gamma_E^2\gamma_E^3\gamma_E^4$ と定めます。この規約では $\Gamma_5^2=1$ です。**Euclid式の符号を説明なしにMinkowskiの電場・磁場の式へ転写しません。**

## 1. 古典論では何が保存するか

通常の位相回転では、左右の成分を同じ位相で回します。それに対して軸性回転では左右の成分を**逆向き**に回します。[QFT32の射影子](../QFT32/index.md#def-qft32-chirality) $P_{L,R}=(1\mp\gamma^5)/2$ から、$e^{i\alpha\gamma^5}\psi_L=e^{-i\alpha}\psi_L$、$e^{i\alpha\gamma^5}\psi_R=e^{i\alpha}\psi_R$ です。

<a id="def-qft39-axial-rotation"></a>

<!-- formal-statement-start -->
> **定義（ベクトル・軸性回転と電流）**
> 四次元Minkowski空間で、一つの電荷 $q\in\mathbb R$ を持つDirac場 $\psi$ と外部の実 $U(1)$ ポテンシャル $A_\mu$ を取る。$D_\mu=\partial_\mu+iqA_\mu$、$\bar\psi=\psi^\dagger\gamma^0$ とし、$\mathcal L=\bar\psi(i\gamma^\mu D_\mu-m)\psi$ とする。定数実数 $\beta,\alpha$ に対するベクトル回転と軸性回転はそれぞれ $\psi\mapsto e^{i\beta}\psi$、$\psi\mapsto e^{i\alpha\gamma^5}\psi$ である。対応する電流を

$$
j_V^\mu=\bar\psi\gamma^\mu\psi,\qquad
j_5^\mu=\bar\psi\gamma^\mu\gamma^5\psi
$$

> と定義する。軸性回転では $\bar\psi\mapsto\bar\psi e^{i\alpha\gamma^5}$ と変換する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft39-axial-rotation -->
### 例：左右に逆の位相が掛かることを確かめる

**定義の確認**：Weyl表示で $\gamma^5=\operatorname{diag}(-I_2,I_2)$ とすると、$e^{i\alpha\gamma^5}=\operatorname{diag}(e^{-i\alpha}I_2,e^{i\alpha}I_2)$ です。$\psi=(\chi_L,\chi_R)^T$ を直接掛ければ左右が逆位相になることが分かります。また $\gamma^0\gamma^5=-\gamma^5\gamma^0$ と $\gamma^5$ のHermitian性から、変換後の随伴は $\bar\psi e^{i\alpha\gamma^5}$ です。これが $\bar\psi\mapsto\bar\psi e^{-i\alpha\gamma^5}$ ではない点が重要です。
<!-- definition-example-end -->

質量項は $\bar\psi_L\psi_R+\bar\psi_R\psi_L$ を結びます。したがって $m>0$ なら軸性回転は明示的に破れます。この効果と、$m=0$ でも残る量子異常は別物です。

<a id="thm-qft39-classical-ward"></a>

<!-- formal-statement-start -->
> **定理（古典軸性電流の発散）**
> 上の $C^1$ 級Dirac場と滑らかな外部 $U(1)$ ポテンシャルがEuler–Lagrange方程式およびその随伴方程式を満たすとする。電荷 $q$ は実数、質量 $m\ge0$ は定数とする。このとき

$$
\partial_\mu j_V^\mu=0,\qquad
\partial_\mu j_5^\mu=2im\bar\psi\gamma^5\psi.
$$

> 特に $m=0$ の軸性電流は古典的には保存する。
<!-- formal-statement-end -->

### 証明の見取り図

場の方程式を $\psi$ に、随伴方程式を $\bar\psi$ に作用させ、$\gamma^5$ が全ての $\gamma^\mu$ と反交換することを使います。両辺に含まれる $A_\mu$ は、左右からの共変微分を足すと相殺します。

<!-- proof-start -->
### 証明

Dirac方程式 $i\gamma^\mu D_\mu\psi=m\psi$ を $i\gamma^\mu D_\mu\psi-m\psi=0$ と書き、その随伴を

$$
i(D_\mu\bar\psi)\gamma^\mu=-m\bar\psi,\qquad
D_\mu\bar\psi=\partial_\mu\bar\psi-iqA_\mu\bar\psi
$$

とする。二つを合わせると $\partial_\mu(\bar\psi\gamma^\mu\psi)=(D_\mu\bar\psi)\gamma^\mu\psi+\bar\psi\gamma^\mu D_\mu\psi=im\bar\psi\psi-im\bar\psi\psi=0$。同様に計算する際の符号を明記すると

$$
\begin{aligned}
\partial_\mu j_5^\mu
&=(D_\mu\bar\psi)\gamma^\mu\gamma^5\psi
+\bar\psi\gamma^\mu\gamma^5D_\mu\psi\\
&=im\bar\psi\gamma^5\psi
-\bar\psi\gamma^5\gamma^\mu D_\mu\psi\\
&=im\bar\psi\gamma^5\psi+im\bar\psi\gamma^5\psi.
\end{aligned}
$$

二行目で $\{\gamma^5,\gamma^\mu\}=0$、三行目で $\gamma^\mu D_\mu\psi=-im\psi$ を使いました。式は $m=0$ でも成立します。
<!-- proof-end -->

## 2. Grassmann測度はどう変換するか

[QFT19の有限次元Berezin積分](../QFT19/index.md#def-qft19-berezin)で、独立変数 $\theta_1,\ldots,\theta_N$ を $\theta'_i=U_{ij}\theta_j$ と変換すると、係数抽出を保つ測度は $d\theta'_N\cdots d\theta'_1=(\det U)^{-1}d\theta_N\cdots d\theta_1$ です。通常のLebesgue積分と**逆**になります。例えば一変数で $\theta'=u\theta$ とすると $\int d\theta'\,\theta'=1$ であるため、$d\theta'=u^{-1}d\theta$ が必要です。

場の測度は無限個のモードを含むので、いきなり「行列式が1」とはできません。まず $N$ 個の直交規格化モード $\phi_n(x)$ で $\psi=\sum_n a_n\phi_n$、$\bar\psi=\sum_n\bar b_n\phi_n^\dagger$ と展開し、$a_n,\bar b_n$ を独立Grassmann変数と見ます。

<a id="def-qft39-regulated-jacobian"></a>

<!-- formal-statement-start -->
> **定義（正則化した軸性Jacobian）**
> 四次元Euclid空間の滑らかな外部 $U(1)$ 場 $A_\mu$ に対して

$$
\nabla_\mu=\partial_\mu+iqA_\mu,\qquad
\mathcal D_E=\gamma_E^\mu\nabla_\mu,\qquad
K=\mathcal D_E^\dagger\mathcal D_E=-\mathcal D_E^2
$$

> とする。局所量 $\alpha(x)$ による $\psi\mapsto e^{i\alpha\Gamma_5}\psi$、$\bar\psi\mapsto\bar\psi e^{i\alpha\Gamma_5}$ に対し、正則化した局所トレースと測度Jacobian $J$ を

$$
\mathcal A(x)=\lim_{M\to\infty}\operatorname{tr}_{\rm spin}
\langle x|\Gamma_5e^{-K/M^2}|x\rangle,\qquad
\log J=-2i\int d^4x\,\alpha(x)\mathcal A(x)+O(\alpha^2)
$$

> で定める。局所式は平坦な $\mathbb R^4$ 上の滑らかな背景場で考え、必要なら有限体積の赤外正則化を置いてから $M\to\infty$ とする。$\operatorname{tr}_{\rm spin}$ は四成分スピノル添字の跡である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft39-regulated-jacobian -->
### 例：二モードで符号と二倍を確認する

**定義の確認**：$\Gamma_5=\operatorname{diag}(1,-1)$ とした二つの有限モードで、定数 $\alpha$ なら $U=\operatorname{diag}(e^{i\alpha},e^{-i\alpha})$、$\det U=1$ です。$a$ と $\bar b$ の測度はそれぞれ $(\det U)^{-1}$ を受けるので全体で $(\det U)^{-2}=1$。片方の固有モードだけを残した切断なら $\det U=e^{i\alpha}$、測度は $e^{-2i\alpha}$ となります。**有限切断の選び方**が重要であり、ゲージ共変な $K$ の固有モードで切断することが次の問題です。
<!-- definition-example-end -->

<a id="prop-qft39-jacobian-modes"></a>

<!-- formal-statement-start -->
> **命題（有限モードのJacobianから熱核へ）**
> $K$ の正規直交固有モード $\phi_n$ を有限個残し、$\alpha$ を実の滑らかなコンパクト台関数とする。無限小変換では

$$
U_{mn}=\delta_{mn}+i\int d^4x\,\alpha(x)\phi_m^\dagger(x)\Gamma_5\phi_n(x)+O(\alpha^2)
$$

> であり、Jacobianの対数は

$$
\log J_N=-2i\sum_{n=1}^N\int d^4x\,\alpha(x)\phi_n^\dagger(x)\Gamma_5\phi_n(x)+O(\alpha^2)
$$

> となる。固有値に重み $e^{-\lambda_n/M^2}$ を掛けた極限では前の $\mathcal A$ を得る。
<!-- formal-statement-end -->

### 証明の見取り図

両方の独立Grassmann測度の逆行列式を掛け、$\log\det(I+\delta U)=\operatorname{tr}(\delta U)+O(\alpha^2)$ を使います。熱核重みの採用は任意のモード切断と異なり、背景ゲージ変換に共変です。

<!-- proof-start -->
### 証明

$\psi'=e^{i\alpha\Gamma_5}\psi$ をモード展開して左から $\phi_m^\dagger$ を積分すると上の $U_{mn}$ が出ます。$\bar b$ の変換も独立に同じ $U$ の行列式を与える（添字順の転置は行列式を変えない）ので

$$
J_N=(\det U)^{-1}(\det U)^{-1}=(\det U)^{-2}.
$$

$\log\det U=\operatorname{tr}(U-I)+O(\alpha^2)$ より

$$
\log J_N=-2i\sum_{n=1}^N\int d^4x\,\alpha(x)\phi_n^\dagger(x)\Gamma_5\phi_n(x)+O(\alpha^2).
$$

$K\phi_n=\lambda_n\phi_n$、$\lambda_n\ge0$ とすると $\sum_n e^{-\lambda_n/M^2}\phi_n(x)\phi_n^\dagger(x)=\langle x|e^{-K/M^2}|x\rangle$。したがって重み付き和が定義の $\mathcal A(x)$ を与えます。
<!-- proof-end -->

## 3. 四次元の係数はどこから現れるか

上の局所トレースは、無限大を無造作に引き算した値ではありません。$K$ が外部ゲージ変換で共変に変わるため、その熱核も共変に変わり、跡は局所ゲージ不変量となります。ここで $F_{\mu\nu}=\partial_\mu A_\nu-\partial_\nu A_\mu$ とします。

<a id="thm-qft39-fujikawa-abelian"></a>

<!-- formal-statement-start -->
> **定理（四次元Euclid Dirac場の軸性熱核係数）**
> 上のEuclid規約、滑らかな外部 $U(1)$ 接続 $\nabla_\mu=\partial_\mu+iqA_\mu$、Hermitian $\gamma_E^\mu$、$\Gamma_5=\gamma_E^1\gamma_E^2\gamma_E^3\gamma_E^4$ を用いる。$q\in\mathbb R$ とし、局所熱核の短時間展開が適用できる平坦四次元領域で

$$
\boxed{\mathcal A(x)=-\frac{q^2}{32\pi^2}\varepsilon^{\mu\nu\rho\sigma}
F_{\mu\nu}(x)F_{\rho\sigma}(x)}
$$

> が成り立つ。$\varepsilon^{1234}=+1$ とする。すなわち $\widetilde F_E^{\mu\nu}=\frac12\varepsilon^{\mu\nu\rho\sigma}F_{\rho\sigma}$ と定義すると $\mathcal A=-q^2F_{\mu\nu}\widetilde F_E^{\mu\nu}/(16\pi^2)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$K$ を二乗すると、通常の共変Laplace作用素のほかに、$F_{\mu\nu}$ と二つの $\gamma$ 行列の積が現れます。$\Gamma_5$ の跡は**四つの $\gamma$** を含まなければ零です。そこでこの曲率項を二回取ると初めて寄与し、運動量Gaussian積分が $1/(16\pi^2)$ を生みます。

<!-- proof-start -->
### 証明

反交換関係から $\mathcal D_E^2=\gamma_E^\mu\gamma_E^\nu\nabla_\mu\nabla_\nu$ を対称部・反対称部に分けます。$[\nabla_\mu,\nabla_\nu]=iqF_{\mu\nu}$ を使うと

$$
\begin{aligned}
\mathcal D_E^2
&=\nabla_\mu\nabla_\mu
+\frac14[\gamma_E^\mu,\gamma_E^\nu][\nabla_\mu,\nabla_\nu]\\
&=\nabla^2+\frac{iq}{4}[\gamma_E^\mu,\gamma_E^\nu]F_{\mu\nu},\\
K&=-\nabla^2-\frac{iq}{4}[\gamma_E^\mu,\gamma_E^\nu]F_{\mu\nu}.
\end{aligned}
$$

計算点の近くで共変熱核を高運動量展開します。$\Gamma_5$ と $I,\gamma^\mu\gamma^\nu$ の跡は零なので、曲率項を二回選んだ次数だけが $M^0$ で残ります（共変微分の係数、曲率の導関数の項はこの次数の四つのClifford行列を作らず、次次数以降は $M\to\infty$ で消えます）。この項は

$$
\frac12\left(\frac{iq}{4M^2}\right)^2
F_{\mu\nu}F_{\rho\sigma}
\operatorname{tr}_{\rm spin}
\left(\Gamma_5[\gamma_E^\mu,\gamma_E^\nu]
[\gamma_E^\rho,\gamma_E^\sigma]\right).
$$

$\operatorname{tr}(\Gamma_5\gamma_E^\mu\gamma_E^\nu\gamma_E^\rho\gamma_E^\sigma)=4\varepsilon^{\mu\nu\rho\sigma}$ で、交換子を展開するとその跡は $16\varepsilon^{\mu\nu\rho\sigma}$。一方、各点での自由Gaussian運動量積分は

$$
\int_{\mathbb R^4}\frac{d^4p}{(2\pi)^4}e^{-p^2/M^2}
=\left(\frac{M}{2\sqrt\pi}\right)^4=\frac{M^4}{16\pi^2}.
$$

従って残る係数は

$$
\frac{M^4}{16\pi^2}\cdot\frac{-q^2}{32M^4}\cdot16
=-\frac{q^2}{32\pi^2}
$$

であり、$F_{\mu\nu}F_{\rho\sigma}\varepsilon^{\mu\nu\rho\sigma}$ を掛ければ結論を得ます。これは滑らかな背景場に対する局所短時間係数の計算であり、任意の強結合四次元場の非摂動的構成を主張していません。
<!-- proof-end -->

### 例：二つの互いに直交する曲率成分

**係数の確認**：ある点で $F_{12}=B_1$、$F_{34}=B_2$ とそれらの反対称成分以外が零なら、$\varepsilon^{\mu\nu\rho\sigma}F_{\mu\nu}F_{\rho\sigma}=8B_1B_2$ です。$12|34$ と $34|12$ の二通り、各組の添字反転二通りずつで計八項になるためです。よって $\mathcal A=-q^2B_1B_2/(4\pi^2)$。どちらか一方の成分しかなければこの異常密度は零です。

## 4. 量子Ward恒等式と三つの区別

外部場を固定してDirac場だけを積分するEuclid汎関数積分を考えます。$S_E=\int d^4x\,\bar\psi(\mathcal D_E+m)\psi$ とし、$j_{5,E}^\mu=\bar\psi\gamma_E^\mu\Gamma_5\psi$ と書きます。$\psi$ と $\bar\psi$ はBerezin積分では独立です。局所軸性変換で $\alpha$ をコンパクト台に取り、外部演算子の挿入がない領域をまず考えます。零モードがある背景で $m=0$ とすると規格化因子 $Z[A]$ が零になる場合があるため、規格化期待値は $Z[A]\ne0$ の場合に用い、それ以外では未規格化の相関関数または質量正からの極限として解釈します。

<a id="thm-qft39-axial-ward-anomaly"></a>

<!-- formal-statement-start -->
> **定理（Euclid軸性Ward恒等式とABJ異常）**
> 前の定理と同じEuclid規約で、$m\ge0$ とし、外部の滑らかな $U(1)$ 背景場に対しゲージ共変な熱核正則化を用いる。赤外正則化の後の $Z[A]\ne0$ を仮定し、適切に正則化したDirac場の規格化相関関数について、他の演算子挿入の点から離れた場所では

$$
\boxed{\partial_\mu\langle j_{5,E}^\mu(x)\rangle_A
=2m\langle\bar\psi\Gamma_5\psi(x)\rangle_A
-\frac{q^2}{16\pi^2}\varepsilon^{\mu\nu\rho\sigma}F_{\mu\nu}F_{\rho\sigma}(x)}
$$

> が成り立つ。複合演算子・接触項の定義はこの正則化に従う。異常項は軸性変換の測度Jacobianに由来し、質量項に由来しない。
<!-- formal-statement-end -->

### 証明の見取り図

局所変換によるEuclid作用の変分は、部分積分後に $-i\alpha\partial j_{5,E}+2i\alpha m\bar\psi\Gamma_5\psi$ となります。変数変換した積分は元と等しいので、作用の変分と測度の $\log J$ が釣り合います。係数二倍は $\psi$ と $\bar\psi$ の両方に由来します。

<!-- proof-start -->
### 証明

$\{\mathcal D_E,\Gamma_5\}=0$ により、一階変分は

$$
\begin{aligned}
\delta S_E
&=i\int d^4x\left[(\partial_\mu\alpha)j_{5,E}^\mu
+2\alpha m\bar\psi\Gamma_5\psi\right]\\
&=i\int d^4x\,\alpha\left[-\partial_\mu j_{5,E}^\mu
+2m\bar\psi\Gamma_5\psi\right],
\end{aligned}
$$

ただし $\alpha$ の台外に境界項がないことを使いました。[Jacobianの命題](#prop-qft39-jacobian-modes)による $\delta\log J=-2i\int\alpha\mathcal A$ を入れ、$Z[A]=\int\mathcal D\bar\psi\mathcal D\psi\,e^{-S_E}$ の変数変換不変性から

$$
0=\left\langle-\delta S_E+\delta\log J\right\rangle_A
=i\int d^4x\,\alpha\left[
\langle\partial_\mu j_{5,E}^\mu-2m\bar\psi\Gamma_5\psi\rangle_A
-2\mathcal A(x)\right].
$$

任意の滑らかなコンパクト台 $\alpha$ から $\langle\partial j_5\rangle_A=2m\langle\bar\psi\Gamma_5\psi\rangle_A+2\mathcal A$。ここへ[熱核係数](#thm-qft39-fujikawa-abelian)を代入すると表示の式になります。$\psi$ などの挿入があるときは、それ自体の軸性変換が追加の接触項を生みます。
<!-- proof-end -->

**第一の区別：明示的破れと量子異常。** 質量を零にすると $2m\bar\psi\Gamma_5\psi$ は消えますが、背景で $\varepsilon FF\ne0$ なら異常は残ります。反対に $F=0$ ならこの局所異常項は零です。「全てのカイラル電流があらゆる場で非保存」という意味ではありません。

**第二の区別：軸性対称性とゲージ対称性。** ベクトル回転では $\psi\mapsto e^{i\beta}\psi$、$\bar\psi\mapsto\bar\psi e^{-i\beta}$ です。二つのBerezin Jacobianは互いに逆で相殺し、背景ゲージ不変な正則化の下でベクトルWard恒等式を守れます。**軸性の大域的対称性の異常を、直ちにゲージ理論の不整合（ゲージ異常）と呼ばない**ことが大切です。標準模型のカイラルゲージ表現の異常相殺は次の別問題です。

**第三の区別：Euclid式と実時間式。** Euclidの $\Gamma_5$、$\varepsilon^{1234}=+1$、$\nabla=\partial+iqA$ で得た負符号を明記しました。Minkowskiで $F\widetilde F$ や $\boldsymbol E\cdot\boldsymbol B$ に移すには、$A_4$、$\gamma_E$、$\varepsilon^{0123}$ の解析接続規約を一式揃える必要があります。係数の絶対値と、$\psi,\bar\psi$ による二倍はその選択で変わりません。

### 非可換背景では何が変わるか

[QFT28のYang–Mills曲率](../QFT28/index.md#def-qft28-curvature)を用い、$\nabla_\mu=\partial_\mu+igA_\mu^aT_R^a$ とします。有限次元ユニタリ表現 $R$ のHermitian生成子が $\operatorname{tr}_R(T_R^aT_R^b)=T(R)\delta^{ab}$ を満たすように正規化します。この $T(R)$ は表現のDynkin指数で、[QFT30の随伴Casimir](../QFT30/index.md#def-qft30-adjoint-casimir) $C_A$ とは異なります。

<a id="prop-qft39-nonabelian-axial"></a>

<!-- formal-statement-start -->
> **命題（Dirac表現Rにおける非可換軸性異常）**
> 四次元Euclid空間における滑らかな外部 $SU(N)$ 背景場 $F_{\mu\nu}^a$、一つのDiracフェルミオンの有限次元ユニタリ表現 $R$、上記の $T(R)$ の規約で、局所短時間展開が適用できるとする。このとき

$$
\mathcal A_R=-\frac{g^2T(R)}{32\pi^2}
\varepsilon^{\mu\nu\rho\sigma}F_{\mu\nu}^aF_{\rho\sigma}^a,
\qquad
\partial_\mu\langle j_{5,E}^\mu\rangle_A
=2m\langle\bar\psi\Gamma_5\psi\rangle_A+2\mathcal A_R.
$$

> ゲージ場の添字 $a$ について和を取る。軸性電流は色成分の和である。
<!-- formal-statement-end -->

### 証明の見取り図

Abelianの場合の $qF$ を行列 $gF^aT_R^a$ に置き換え、二つの曲率を掛けたところで表現の跡を取ります。

<!-- proof-start -->
### 証明

$[\nabla_\mu,\nabla_\nu]=igF_{\mu\nu}^aT_R^a$ なので、[Abelian熱核係数の証明](#thm-qft39-fujikawa-abelian)と同じ次数で、スピンの跡 $16\varepsilon^{\mu\nu\rho\sigma}$ とGaussian積分 $M^4/(16\pi^2)$ が生じます。色の跡だけが新しく

$$
\operatorname{tr}_R[(gF_{\mu\nu}^aT_R^a)(gF_{\rho\sigma}^bT_R^b)]
=g^2T(R)\delta^{ab}F_{\mu\nu}^aF_{\rho\sigma}^b
$$

です。従って $q^2F_{\mu\nu}F_{\rho\sigma}$ をこの式に置き換えて表示の $\mathcal A_R$ を得ます。Ward恒等式は前節と同じJacobianの二倍で得ます。
<!-- proof-end -->

**具体例**：$SU(2)$ の基本表現では $T^a=\sigma^a/2$、$\operatorname{tr}(\sigma^a\sigma^b)=2\delta^{ab}$ より $T(R)=1/2$ です。したがって質量零で $\partial j_5=-g^2\varepsilon F^aF^a/(32\pi^2)$ となります。これは**Dirac場一つ**の軸性異常であり、左Weyl場一つのゲージ異常係数ではありません。

## 5. 演習：古典保存から量子測度まで

### 演習 QFT39-A1：軸性回転の左右成分

- Level: A
- 問題：$\gamma^5=\operatorname{diag}(-I_2,I_2)$、$\psi=(\chi_L,\chi_R)^T$ とする。$e^{i\alpha\gamma^5}\psi$ と、質量結合 $\bar\psi_L\psi_R$ の変換位相を求めよ。

<!-- solution-start -->
### 詳細解答

$e^{i\alpha\gamma^5}\psi=(e^{-i\alpha}\chi_L,e^{i\alpha}\chi_R)^T$。$\bar\psi_L$ は $\psi_L$ の随伴なので $e^{i\alpha}\bar\psi_L$、$\psi_R$ は $e^{i\alpha}\psi_R$ です。よって $\bar\psi_L\psi_R\mapsto e^{2i\alpha}\bar\psi_L\psi_R$。一般の $\alpha$ では不変でなく、$m=0$ の条件が重要です。
<!-- solution-end -->

### 演習 QFT39-A2：古典発散と質量

- Level: A
- 問題：$i\gamma^\mu D_\mu\psi=m\psi$、$i(D_\mu\bar\psi)\gamma^\mu=-m\bar\psi$、$\{\gamma^\mu,\gamma^5\}=0$ から $\partial_\mu(\bar\psi\gamma^\mu\gamma^5\psi)$ を求めよ。$A_\mu$ の項の相殺も示せ。

<!-- solution-start -->
### 詳細解答

$\partial_\mu\bar\psi=(D_\mu\bar\psi)+iqA_\mu\bar\psi$、$\partial_\mu\psi=D_\mu\psi-iqA_\mu\psi$ なので二つの $iqA_\mu$ 項が相殺します。残りは $(D_\mu\bar\psi)\gamma^\mu\gamma^5\psi+\bar\psi\gamma^\mu\gamma^5D_\mu\psi=im\bar\psi\gamma^5\psi-\bar\psi\gamma^5(-im\psi)=2im\bar\psi\gamma^5\psi$ です。
<!-- solution-end -->

### 演習 QFT39-A3：Berezin測度の逆行列式

- Level: A
- 問題：独立Grassmann変数 $a_1,a_2$ に $a'_1=2a_1$、$a'_2=3a_2$ を施す。$da'_2da'_1$ を $da_2da_1$ で表せ。別の独立な $\bar b_1,\bar b_2$ にも同じ変換を施すと全測度の倍率はいくらか。

<!-- solution-start -->
### 詳細解答

$\int da'_2da'_1\,a'_1a'_2=1$ を満たすため、$a'_1a'_2=6a_1a_2$ に対し $da'_2da'_1=(1/6)da_2da_1$ です。$\bar b$ も $1/6$ なので全測度は $1/36$ 倍。通常の体積積分での6倍と逆です。
<!-- solution-end -->

### 演習 QFT39-A4：反対称テンソルの八項

- Level: A
- 問題：四次元Euclid空間で $F_{12}=b$、$F_{34}=c$、反対称性で決まる成分以外は零とする。$\varepsilon^{\mu\nu\rho\sigma}F_{\mu\nu}F_{\rho\sigma}$ を展開し、$\mathcal A$ を求めよ。

<!-- solution-start -->
### 詳細解答

$(\mu\nu,\rho\sigma)=(12,34),(21,34),(12,43),(21,43)$ の四項は各 $bc$ であり、二組を交換した四項も各 $bc$ です。合計 $8bc$。よって $\mathcal A=-(q^2/(32\pi^2))8bc=-q^2bc/(4\pi^2)$ です。$c=0$ では零になります。
<!-- solution-end -->

### 演習 QFT39-A5：ベクトル回転の測度

- Level: A
- 問題：有限 $N$ モードで $\psi'=e^{i\beta}\psi$、$\bar\psi'=\bar\psi e^{-i\beta}$ と変換する。二つのBerezin Jacobianを求め、ベクトル回転では相殺することを示せ。

<!-- solution-start -->
### 詳細解答

$a'=e^{i\beta}a$ なので $D a'=(e^{iN\beta})^{-1}Da=e^{-iN\beta}Da$。独立な $\bar b$ では $D\bar b'=e^{iN\beta}D\bar b$ です。積は $1$。軸性回転と異なり、同じ符号が二回足されることはありません。
<!-- solution-end -->

### 演習 QFT39-B1：熱核の係数を一から求める

- Level: B
- 問題：$K=-\nabla^2-(iq/4)[\gamma_E^\mu,\gamma_E^\nu]F_{\mu\nu}$、$\operatorname{tr}(\Gamma_5[\gamma^\mu,\gamma^\nu][\gamma^\rho,\gamma^\sigma])=16\varepsilon^{\mu\nu\rho\sigma}$ が与えられる。四次元Gaussian積分を実行し、$M\to\infty$ に残る $F^2$ 項の係数を求めよ。

<!-- solution-start -->
### 詳細解答

曲率項の一回目は二個の $\gamma$ しかないため $\Gamma_5$ の跡は零。二回目のTaylor係数は $\frac12(iq/4M^2)^2=-q^2/(32M^4)$ です。一次元積分 $\int dp\,e^{-p^2/M^2}=M\sqrt\pi$ を四回掛け、$(2\pi)^{-4}$ で割ると $M^4/(16\pi^2)$。従って $M^4/(16\pi^2)\times[-q^2/(32M^4)]\times16=-q^2/(32\pi^2)$ で、$\mathcal A=-q^2\varepsilon FF/(32\pi^2)$ です。
<!-- solution-end -->

### 演習 QFT39-B2：質量とJacobianを含めたWard式

- Level: B
- 問題：$\delta S_E=i\int\alpha(-\partial j_5+2mP)$、$\delta\log J=-2i\int\alpha\mathcal A$ とする。$0=\langle-\delta S_E+\delta\log J\rangle_A$ から $\partial\langle j_5\rangle$ を導き、$m=0$ かつ $F_{12}=b,F_{34}=c$ の値を求めよ。

<!-- solution-start -->
### 詳細解答

変分恒等式の $i\alpha$ の係数は $\langle\partial j_5\rangle-2m\langle P\rangle-2\mathcal A$ です。任意の $\alpha$ から $\partial\langle j_5\rangle=2m\langle P\rangle+2\mathcal A$。$m=0$ では $2\mathcal A=-q^2\varepsilon FF/(16\pi^2)$ です。$\varepsilon FF=8bc$ を代入すると $-q^2bc/(2\pi^2)$。$m=0$ としてもこの値は一般には消えません。
<!-- solution-end -->

### 演習 QFT39-B3：$SU(2)$ の色の跡

- Level: B
- 問題：$SU(2)$ の基本表現 $T^a=\sigma^a/2$、$\operatorname{tr}(\sigma^a\sigma^b)=2\delta^{ab}$ とする。$T(R)$ を求め、Dirac場一つの $\mathcal A_R$ を表示せよ。なぜ $C_A=2$ を代入してはいけないか。

<!-- solution-start -->
### 詳細解答

$\operatorname{tr}(T^aT^b)=\frac14\operatorname{tr}(\sigma^a\sigma^b)=\delta^{ab}/2$ なので $T(R)=1/2$。ゆえに $\mathcal A_R=-g^2\varepsilon F^aF^a/(64\pi^2)$ です。$C_A=2$ は随伴表現の構造定数の縮約に由来する別の不変量で、フェルミオンの**基本表現**の二生成子の跡ではありません。
<!-- solution-end -->

### 演習 QFT39-B4：消える異常と消えない異常

- Level: B
- 問題：質量零の電荷 $q$ と $2q$ の二つのDirac場が同じ外部 $U(1)$ 背景に結合している。各場の軸性電流を足した電流のEuclid異常係数を求めよ。また $j_{5,1}-\frac14j_{5,2}$ の異常項を調べよ。両方の場のベクトル電流には同じ意味での異常があるか。

<!-- solution-start -->
### 詳細解答

場ごとの係数は $-q^2\varepsilon FF/(16\pi^2)$ と $-(2q)^2\varepsilon FF/(16\pi^2)=-4q^2\varepsilon FF/(16\pi^2)$。和は $-5q^2\varepsilon FF/(16\pi^2)$ です。差 $j_{5,1}-j_{5,2}/4$ では $-q^2+\frac14(4q^2)=0$ となります。ベクトル測度は $\psi$ と $\bar\psi$ の逆位相でJacobianが相殺するので、背景ゲージ不変な正則化ではこの軸性異常に対応するベクトル異常はありません。
<!-- solution-end -->

### 演習 QFT39-C1：古典対称性から量子Ward式へ

- Level: C
- 問題：Euclid空間の一つのDirac場について $\nabla=\partial+iqA$、$\Gamma_5=\gamma_E^1\gamma_E^2\gamma_E^3\gamma_E^4$、$S_E=\int\bar\psi(\mathcal D_E+m)\psi$ とする。(1) 無限小局所軸性回転での作用の変分を導く。(2) 有限モードのBerezin測度が $-2i\operatorname{tr}(\alpha\Gamma_5)$ を与える理由を説明する。(3) 熱核の曲率項とGaussian積分を用いて係数を導く。(4) $m=0$、$F_{12}=b,F_{34}=c$ の軸性発散を求める。(5) ゲージ異常との違いを述べよ。

<!-- solution-start -->
### 詳細解答

**(1)** $\delta\psi=i\alpha\Gamma_5\psi$、$\delta\bar\psi=i\alpha\bar\psi\Gamma_5$ とする。$\{\Gamma_5,\mathcal D_E\}=0$ より定数 $\alpha$ の運動項は相殺し、局所性から $\delta S_E=i\int[(\partial_\mu\alpha)\bar\psi\gamma_E^\mu\Gamma_5\psi+2m\alpha\bar\psi\Gamma_5\psi]$。部分積分で $i\int\alpha(-\partial j_5+2mP)$ です。

**(2)** $N$ モードの変換行列を $U=I+i\alpha_{mn}\Gamma_{5,mn}+O(\alpha^2)$ と書くと、$\log\det U=i\operatorname{tr}(\alpha\Gamma_5)+O(\alpha^2)$。$Da$ と $D\bar b$ は各 $(\det U)^{-1}$ 倍なので $\log J=-2i\operatorname{tr}(\alpha\Gamma_5)$。無限モードでは $e^{-K/M^2}$ で正則化します。

**(3)** $[\nabla_\mu,\nabla_\nu]=iqF_{\mu\nu}$ から $K=-\nabla^2-(iq/4)[\gamma_E^\mu,\gamma_E^\nu]F_{\mu\nu}$。$\Gamma_5$ の跡に寄与するのは曲率項を二回取った次数で、$\frac12(iq/4M^2)^2=-q^2/(32M^4)$。跡 $16\varepsilon^{\mu\nu\rho\sigma}$、運動量積分 $M^4/(16\pi^2)$ を掛けて $\mathcal A=-q^2\varepsilon FF/(32\pi^2)$ です。

**(4)** $0=\langle-\delta S_E+\delta\log J\rangle$ から $\partial\langle j_5\rangle=2m\langle P\rangle+2\mathcal A$。$m=0$、$\varepsilon FF=8bc$ なので $\partial\langle j_5\rangle=-q^2bc/(2\pi^2)$。

**(5)** ここで破れるのはDirac場の**大域軸性**回転であり、外部 $U(1)$ のベクトルゲージ対称性を保つ正則化を採用しています。ゲージ電流の非保存を意味するカイラルゲージ異常とは、変換対象と整合性条件が違います。
<!-- solution-end -->

## 6. まとめと次の問い

古典の質量零Dirac作用では軸性電流は保存します。しかし、ゲージ共変に正則化したGrassmann測度のJacobianは一般に1でなく、四次元の局所係数は曲率二つと $\Gamma_5$ の跡から決まります。ここでは $\varepsilon^{1234}=+1$ と $\nabla=\partial+iqA$ のEuclid規約で、$\partial\langle j_5\rangle=2m\langle\bar\psi\Gamma_5\psi\rangle-q^2\varepsilon FF/(16\pi^2)$ を導きました。

次は、**軸性の大域対称性の異常**と区別して、標準模型のカイラルな**ゲージ電流**を保つにはどの表現・電荷の組合せが必要かを調べます。三角図の係数の和、世代ごとの異常相殺、局所異常と大域異常の境界が新しい問いになります。
