# LREP26 有限次元場表現と1粒子表現

<!-- definition-example-audit: strict -->

Dirac方程式の場には四成分がありました。一方、正質量スピン $1/2$ の粒子は各運動量で二つの内部成分を持ちます。四と二は矛盾するのでしょうか。場の成分は時空座標の変換に伴って変わり、粒子の波束は確率を保存するように変わります。この二種類の変換を結ぶ長方形行列を作れば、四成分の場から物理的な二つの自由度がどう現れるかを説明できます。

## 1. 二つの変換の対象

[共通符号規約](../../../../../dream-theater-lorentz-conventions.md)に従い、$c=\hbar=1$、$\eta=\operatorname{diag}(-1,1,1,1)$ とします。$G=SL(2,\mathbb C)$ とし、$Ax$ は[二重被覆](../LREP10/index.md#thm-lrep10-double-cover)による四元ベクトルの変換の略記です。$p\cdot x=\eta(p,x)$ とします。

$m>0$ を固定し、[未来質量殻](../LREP22/index.md#def-lrep22-mass-shell) $\mathcal O_m$ と静止点 $k=(m,\boldsymbol 0)$ を取ります。$p=(E,\boldsymbol p)$、$E=\sqrt{m^2+|\boldsymbol p|^2}$ です。場の値を取る有限次元複素空間を $F=\mathbb C^n$ とし、粒子の内部空間を $V=\mathbb C^d$ とします。一般に $n$ と $d$ は等しくありません。

場は時空の各点に $F$ の列を割り当てます。座標の引き戻しと成分の変換を組み合わせる必要があります。ここでは前講の並進位相 $e^{ip\cdot a}$ に合わせ、引き戻しの引数を $A^{-1}(x+a)$ とします（時空並進を逆向きにラベルする約束です）。

<a id="def-lrep26-field-action"></a>

<!-- formal-statement-start -->
> **定義（有限成分場の共変作用）**
> $F$ を有限次元複素ベクトル空間、$D:G\to GL(F)$ を連続な[有限次元複素線形表現](../LREP1/index.md#def-lrep1-linear-representation)とする。連続な場 $\Phi:\mathbb R^{1,3}\to F$ 上の作用を、被覆Poincare群の元 $(a,A)$ に対して

$$
(T_D(a,A)\Phi)(x)=D(A)\Phi(A^{-1}(x+a))
$$

> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep26-field-action -->
**定義の確認**。 $F=\mathbb C$、全ての $A$ で $D(A)=1$ とすれば、$D(I)=1$、$D(AB)=1=D(A)D(B)$ で連続です。$\Phi(x)=e^{-imt}$ は連続な一成分の場です。$a=(b,\boldsymbol0)$、$A=I$ では $T_D(a,I)\Phi=e^{-imb}\Phi$ となります。一般の $(a,A)$ でも連続なアフィン写像との合成により連続な場を得ます。
<!-- definition-example-end -->

群の積は $(a,A)(b,B)=(a+Ab,AB)$ です。実際に二回作用させると

$$
\begin{aligned}
(T_D(a,A)T_D(b,B)\Phi)(x)
&=D(A)D(B)\Phi(B^{-1}(A^{-1}(x+a)+b))\\
&=D(AB)\Phi((AB)^{-1}(x+a+Ab)).
\end{aligned}
$$

単位元は恒等作用であり、逆元の作用が逆写像になるので、場全体の線形表現になります。ここで $D(A)$ が通常の正定値内積を保存するとは仮定していません。

一方、[正質量の静止安定化群](../LREP23/index.md#thm-lrep23-rest-group)は $K=SU(2)$ です。連続なユニタリ表現 $\rho:K\to U(d)$ と連続な[運動量断面](../LREP25/index.md#def-lrep25-section) $s(p)$ を選び、$s(k)=I_2$ とします。$\rho$ は前講で固定群の表現を表すために使った $D$ に当たります。本講では場の $D$ と区別します。

[断面の固定群補正](../LREP25/index.md#def-lrep25-little-cocycle)と[質量殻上の誘導作用](../LREP25/index.md#def-lrep25-induced)は

$$
w(A,p)=s(Ap)^{-1}As(p)\in K,
$$

$$
(U(a,A)f)(p)=e^{ip\cdot a}\rho(w(A,A^{-1}p))f(A^{-1}p)
$$

です。$f$ は[質量殻波束空間](../LREP25/index.md#def-lrep25-packet-space)の元で、内積を与える測度は $d\mu_m(p)=d^3\boldsymbol p/(2E)$ です。[誘導作用のユニタリ性と強連続性](../LREP25/index.md#thm-lrep25-unitary)から、$U$ はこの空間のノルムを保存します。

| | 場の成分 | 粒子の波束 |
| --- | --- | --- |
| 変換 | $D(A)$ と座標の引き戻し | $U(a,A)$ |
| 変換の対象 | 時空上の $n$ 成分の関数 | 質量殻上の $d$ 成分の関数 |
| 内積 | 成分の標準内積を保存する必要はない | 波束の正定値内積を保存する |

## 2. 静止系の長方形行列から全運動量へ

運動量 $p$ の内部列 $v\in V$ から場の係数を作るには、$F$ に値を取る線形写像 $u(p):V\to F$ が必要です。静止系の係数は $u(k)$ です。静止点を固定する回転 $R$ に対して、内部列を回転させてから場へ移しても、先に場へ移してその成分を回転させても一致してほしいと考えます。これは[絡作用素](../LREP1/index.md#def-lrep1-intertwiner)の考え方です。

<a id="def-lrep26-mode-intertwiner"></a>

<!-- formal-statement-start -->
> **定義（共変モード係数）**
> $m>0$ とし、上記の連続な表現 $D,\rho$ と運動量断面 $s$ を取る。連続な行列値写像 $u:\mathcal O_m\to\operatorname{Hom}(V,F)$ が、任意の $A\in G$、$p\in\mathcal O_m$ に対して

$$
D(A)u(p)=u(Ap)\rho(w(A,p))
$$

> を満たすとき、共変モード係数とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep26-mode-intertwiner -->
**定義の確認**。 $F=V=\mathbb C$、$D(A)=\rho(R)=1$ の自明表現では $u(p)=1$ を選べます。全点で連続な $1\times1$ 行列で、左辺も右辺も1です。従って全ての運動量と変換について条件を満たします。
<!-- definition-example-end -->

この条件を各運動量で独立に解く必要はありません。まず静止点の条件だけを解き、その解を断面で運びます。

<a id="thm-lrep26-rest-extension"></a>

<!-- formal-statement-start -->
> **定理（静止系からの共変モード係数の構成）**
> $m>0$、$D,\rho,s$ を上記のものとし、$s(k)=I_2$ とする。共変モード係数と、全ての $R\in K$ について

$$
D(R)C=C\rho(R),\qquad C\in\operatorname{Hom}(V,F)
$$

> を満たす静止行列 $C$ は一対一に対応する。対応は

$$
C=u(k),\qquad u(p)=D(s(p))C
$$

> である。
<!-- formal-statement-end -->

**証明の見取り図。** 静止点に戻る補正を使って $As(p)=s(Ap)w(A,p)$ と分解し、右端の固定群だけを $C$ の反対側へ移します。

<!-- proof-start -->
### 証明

[共変モード係数](#def-lrep26-mode-intertwiner)の条件で $p=k$、$A=R\in K$ とすると、$Rk=k$、$s(k)=I_2$ より $w(R,k)=R$ です。従って $C=u(k)$ は静止条件を満たします。

次に同じ条件で $p=k$、変換を $s(q)$ とします。$s(q)k=q$ なので

$$
w(s(q),k)=s(q)^{-1}s(q)s(k)=I_2.
$$

従って $u(q)=D(s(q))u(k)$ です。これは必要性と一意性を示します。

逆に静止条件を満たす $C$ に対し $u(p)=D(s(p))C$ と置きます。連続性は $D,s$ の連続性から従います。[断面の固定群補正](../LREP25/index.md#def-lrep25-little-cocycle)を使うと

$$
\begin{aligned}
D(A)u(p)
&=D(As(p))C\\
&=D(s(Ap))D(w(A,p))C\\
&=D(s(Ap))C\rho(w(A,p))\\
&=u(Ap)\rho(w(A,p)).
\end{aligned}
$$

三行目で使った静止条件は、$w(A,p)\in K$ なので適用できます。また $u(k)=D(I_2)C=C$ です。以上で対応が逆写像になりました。$\square$
<!-- proof-end -->

## 3. 波束を場に移すときの変換

各運動量の係数を平面波 $e^{ip\cdot x}$ に掛けて重ね合わせます。まず $f:\mathcal O_m\to V$ を連続かつコンパクト台を持つ関数に限定します。台とは零でない点の集合の閉包です。これなら積分の存在を個々の運動量成分の連続性から確かめられます。

<a id="def-lrep26-packet-field-map"></a>

<!-- formal-statement-start -->
> **定義（正周波数波束の場への写像）**
> $m>0$、共変モード係数 $u$ と連続コンパクト台の内部波束 $f:\mathcal O_m\to V$ に対して

$$
(\mathcal J_u f)(x)=\int_{\mathcal O_m}e^{ip\cdot x}u(p)f(p)\,d\mu_m(p)
$$

> と定める。積分は $F$ の各成分について取る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep26-packet-field-map -->
**定義の確認**。 自明表現の例の $u=1$ を使い、$f(p)=\max(1-|\boldsymbol p|,0)$ とします。連続で閉単位球に台を持ち、$E\ge m>0$ より測度密度は $1/(2m)$ 以下です。従って積分は絶対収束します。$x=0$ では被積分関数は非負で球の内部で正なので $\mathcal J_u f(0)>0$ です。また任意の $x_j\to x$ について指数因子は点ごとに収束し、絶対値は1です。有界な台上の可積分関数 $|f|$ により支配されるので積分値も連続です。
<!-- definition-example-end -->

場と粒子の変換の一致は、次の一つの等式として表せます。

<a id="thm-lrep26-packet-covariance"></a>

<!-- formal-statement-start -->
> **定理（波束写像の共変性）**
> $m>0$、連続な共変モード係数 $u$ と連続コンパクト台の波束 $f$ に対し、任意の被覆Poincare群の元 $(a,A)$ について

$$
\mathcal J_u U(a,A)f=T_D(a,A)\mathcal J_u f
$$

> が成立する。
<!-- formal-statement-end -->

**証明の見取り図。** 左辺では粒子を変換してから平面波を重ねます。積分変数を元の運動量に戻し、[共変モード係数](#def-lrep26-mode-intertwiner)の条件で内部作用を場の成分作用に変換します。

<!-- proof-start -->
### 証明

$U(a,A)f$ は連続で、台は元の台の $A$ による像に含まれます。像はコンパクトなので、この波束にも積分を定義できます。一般の $f$ に対し、台上の連続関数 $\|u(p)\|\|f(p)\|$ は有界で、測度は有限です。従って積分は絶対収束し、指数因子の絶対値が1なので支配収束により $\mathcal J_u f$ は連続です。

[質量殻上の誘導作用](../LREP25/index.md#def-lrep25-induced)を代入します。

$$
\begin{aligned}
(\mathcal J_u U(a,A)f)(x)
&=\int e^{ip\cdot(x+a)}
u(p)\rho(w(A,A^{-1}p))f(A^{-1}p)\,d\mu_m(p).
\end{aligned}
$$

[質量殻測度のLorentz不変性](../LREP22/index.md#thm-lrep22-measure-invariance)から $p=Aq$ と置けば $d\mu_m(p)=d\mu_m(q)$ です。さらに計量保存性により $(Aq)\cdot(x+a)=q\cdot A^{-1}(x+a)$ です。従って

$$
\begin{aligned}
(\mathcal J_u U(a,A)f)(x)
&=\int e^{iq\cdot A^{-1}(x+a)}
u(Aq)\rho(w(A,q))f(q)\,d\mu_m(q)\\
&=D(A)\int e^{iq\cdot A^{-1}(x+a)}u(q)f(q)\,d\mu_m(q)\\
&=D(A)(\mathcal J_u f)(A^{-1}(x+a)).
\end{aligned}
$$

第二行では共変モード係数の条件を用い、定数行列 $D(A)$ を積分の外へ出しました。最後の式は場の共変作用そのものです。$\square$
<!-- proof-end -->

ここでの積分は通常の関数として扱える波束に限定しました。任意の二乗可積分波束に対して各時空点で絶対収束するとは限りません。粒子のHilbert空間におけるユニタリ性と、場が各点で持つ成分のノルムは別の問題です。

## 4. Dirac場の二つの正周波数モード

$F=\mathbb C^4$、$V=\mathbb C^2$、$\rho(R)=R$ とします。[Diracスピノル](../LREP16/index.md#def-lrep16-dirac)の場の表現は

$$
D(A)=\begin{pmatrix}A&0\\0&(A^\dagger)^{-1}\end{pmatrix}.
$$

$R\in SU(2)$ なら $R^\dagger=R^{-1}$ なので $D(R)=\operatorname{diag}(R,R)$ です。上二成分と下二成分は回転だけなら同じように変わります。したがって静止点の二成分を両方に入れられます。Dirac方程式が上下の関係を決めます。

[正質量のDiracモードの構成](../LREP20/index.md#prop-lrep20-boost-modes)と同じ規格化を使い、

$$
C=\sqrt m\begin{pmatrix}I_2\\iI_2\end{pmatrix}
$$

と置きます。$D(R)C=\sqrt m(R,iR)^{\mathsf T}=CR$ なので、これは静止条件を満たす $4\times2$ 行列です。

[正質量の標準boost](../LREP23/index.md#def-lrep23-standard-boost)を断面に取ります。$P=\boldsymbol p\cdot\boldsymbol\sigma$（$\sigma_j$ は[Pauli行列](../LREP5/index.md#def-lrep5-pauli-model)）とすると

$$
s(p)=\frac{(E+m)I_2+P}{\sqrt{2m(E+m)}}.
$$

$s(p)$ はHermitianであり、[静止系からの共変モード係数の構成](#thm-lrep26-rest-extension)を適用すると

$$
u(p)=\sqrt m\begin{pmatrix}s(p)\\i s(p)^{-1}\end{pmatrix}.
$$

各列は前に構成した正周波数Diracモードです。この対応は四成分を二成分へ勝手に削る操作ではなく、二成分を運動量に応じた四成分の解空間へ写す操作です。

<a id="thm-lrep26-dirac-embedding"></a>

<!-- formal-statement-start -->
> **定理（正質量Diracモードによる内部空間の埋め込み）**
> $m>0$、上記の標準boostと行列 $u(p)$ を取る。LREP20の記号で $H=G^0$、$K(p)=EG^0-\sum_{j=1}^3p_jG^j$ とする。このとき

$$
\operatorname{im}u(p)=\ker(K(p)-mI_4),
$$

$$
u(p)^\dagger H u(p)=2mI_2,\qquad
u(p)^\dagger u(p)=2EI_2.
$$

> 特に $u(p)$ は単射であり、左逆行列は $u(p)^\dagger H/(2m)$ である。
<!-- formal-statement-end -->

**証明の見取り図。** 静止点での二つの自由度を可逆なboostで運び、上下のブロックを掛けて規格化を確かめます。

<!-- proof-start -->
### 証明

[LREP20の正質量のDiracモードの構成](../LREP20/index.md#prop-lrep20-boost-modes)により、標準基底を $\chi_1,\chi_2$ としたとき $u(p)\chi_1,u(p)\chi_2$ は核の基底です。従って像と核は一致します。

$s=s(p)$ と略記します。$s^\dagger=s$、$(s^{-1})^\dagger=s^{-1}$ であり、LREP20の同じ構成で $s^2=(EI_2+P)/m$、$s^{-2}=(EI_2-P)/m$ が得られています。$H=\begin{pmatrix}0&-iI_2\\iI_2&0\end{pmatrix}$ なので

$$
Hu(p)=\sqrt m\begin{pmatrix}s^{-1}\\i s\end{pmatrix}.
$$

従って

$$
\begin{aligned}
u^\dagger Hu&=m(s s^{-1}+(-i)i s^{-1}s)=2mI_2,\\
u^\dagger u&=m(s^2+s^{-2})=2EI_2.
\end{aligned}
$$

$m>0$ だから最初の積を $2m$ で割った行列は左逆です。$u(p)v=0$ なら左逆を掛けて $v=0$ が従います。$\square$
<!-- proof-end -->

例えば $m=4$、$\boldsymbol p=(0,0,3)$ なら $E=5$、$s=\operatorname{diag}(\sqrt2,1/\sqrt2)$ です。第1列は $(2\sqrt2,0,i\sqrt2,0)^{\mathsf T}$ で、通常のノルム二乗は $8+2=10=2E$ です。一方、静止点ではノルム二乗は8でした。従って場の成分の変換は標準内積についてユニタリとは限りません。

この二つのノルムの違いは矛盾ではありません。粒子波束のノルムは $\int\|f(p)\|^2\,d\mu_m(p)$ です。場の運動量係数を $g(p)=u(p)f(p)$ と書くと上の定理から

$$
\int\frac{\|g(p)\|^2}{2E}\,d\mu_m(p)
=\int\|f(p)\|^2\,d\mu_m(p).
$$

右辺は保存されるので、左辺も誘導された変換で保存されます。重みを落とした成分ノルムとは異なります。負周波数モードについても静止行列の下側を $-iI_2$ に変えれば固定群条件を満たしますが、負周波数の場の量子化や反粒子の生成消滅作用素は本講の構成とは別です。

## 5. 演習

<a id="ex-lrep26-a01"></a>

#### LREP26-A01 場の成分と粒子の内部成分
- Level: A
- ID: LREP26-A01

$D(A)=\operatorname{diag}(A,(A^\dagger)^{-1})$、$A=\operatorname{diag}(2,1/2)$ とする。$z=(1,0,0,0)^{\mathsf T}$ に対して $\|D(A)z\|^2$ と $\|z\|^2$ を比較せよ。

<!-- solution-start -->
**詳細解答**

$A^\dagger=A$ なので $(A^\dagger)^{-1}=\operatorname{diag}(1/2,2)$ です。上側だけが非零であるため $D(A)z=(2,0,0,0)^{\mathsf T}$。従って $\|D(A)z\|^2=4$、$\|z\|^2=1$ で標準内積を保存しません。
<!-- solution-end -->

<a id="ex-lrep26-a02"></a>

#### LREP26-A02 静止点での回転
- Level: A
- ID: LREP26-A02

$m=1$、$R=\operatorname{diag}(i,-i)$、$C=(I_2,iI_2)^{\mathsf T}$ とする（上下のブロックを並べた行列）。$R\in SU(2)$ と $D(R)C=CR$ を確認せよ。

<!-- solution-start -->
**詳細解答**

$R^\dagger R=I_2$、$\det R=i(-i)=1$ なので $R\in SU(2)$。下ブロックも $(R^\dagger)^{-1}=R$ だから

$$
D(R)C=\begin{pmatrix}R\\iR\end{pmatrix}
=\begin{pmatrix}I_2\\iI_2\end{pmatrix}R=CR.
$$

これが[静止系の構成定理](#thm-lrep26-rest-extension)の静止条件です。
<!-- solution-end -->

<a id="ex-lrep26-a03"></a>

#### LREP26-A03 スカラー波束の並進
- Level: A
- ID: LREP26-A03

$D=\rho=1$、$u(p)=1$、$f$ を連続コンパクト台とする。$a=(b,\boldsymbol 0)$ に対し $\mathcal J_u U(a,I)f$ を計算せよ。

<!-- solution-start -->
**詳細解答**

$p\cdot a=-Eb$ なので [誘導作用](../LREP25/index.md#def-lrep25-induced)は $U(a,I)f=e^{-iEb}f$ です。[波束写像](#def-lrep26-packet-field-map)へ代入すると

$$
\int e^{ip\cdot x}e^{-iEb}f(p)\,d\mu_m(p)
=\int e^{ip\cdot(x+a)}f(p)\,d\mu_m(p).
$$

従って $(\mathcal J_u f)(x+a)$ です。
<!-- solution-end -->

<a id="ex-lrep26-a04"></a>

#### LREP26-A04 boostされた列の規格化
- Level: A
- ID: LREP26-A04

$m=3$、$\boldsymbol p=(0,0,4)$ とする。標準boostの対角成分と正周波数係数の第1列を求め、そのノルム二乗を確認せよ。

<!-- solution-start -->
**詳細解答**

$E=5$、$P=\operatorname{diag}(4,-4)$ です。標準boostの分子は $\operatorname{diag}(12,4)$、分母は $\sqrt{2\cdot3\cdot8}=4\sqrt3$ なので $s=\operatorname{diag}(\sqrt3,1/\sqrt3)$。従って第1列は $\sqrt3(\sqrt3,0,i/\sqrt3,0)^{\mathsf T}=(3,0,i,0)^{\mathsf T}$。ノルム二乗は $9+1=10=2E$ で、[内部空間の埋め込み](#thm-lrep26-dirac-embedding)と一致します。
<!-- solution-end -->

<a id="ex-lrep26-b01"></a>

#### LREP26-B01 静止条件の失敗
- Level: B
- ID: LREP26-B01

$F=\mathbb C$ の自明表現、$V=\mathbb C^2$ の標準回転表現 $\rho(R)=R$ とする。非零の共変モード係数が存在しないことを示せ。

<!-- solution-start -->
**詳細解答**

[静止系の構成定理](#thm-lrep26-rest-extension)の必要条件は $C=C R$ です。$R=-I_2$ は行列式1かつユニタリなので $SU(2)$ に属します。この元を代入すると $C=-C$、従って $2C=0$ より $C=0$。同定理から $u(p)=D(s(p))C=0$ が全点で従います。場がスカラーである限り、この粒子の非零の係数は作れません。
<!-- solution-end -->

<a id="ex-lrep26-b02"></a>

#### LREP26-B02 同一直線方向のboost
- Level: B
- ID: LREP26-B02

$m>0$、$p=(m\cosh r,0,0,m\sinh r)$、$A=\operatorname{diag}(e^{t/2},e^{-t/2})$ とする。標準boost断面で $w(A,p)=I_2$ を示し、$D(A)u(p)$ を計算せよ。

<!-- solution-start -->
**詳細解答**

$s(p)$ の二つの分子は $m(1+\cosh r\pm\sinh r)=m(1+e^{\pm r})$。分母は $2m\cosh(r/2)$ なので $s(p)=\operatorname{diag}(e^{r/2},e^{-r/2})$ です。[エルミート行列模型](../LREP10/index.md#def-lrep10-hermitian-model)では $p$ の行列は $m\operatorname{diag}(e^r,e^{-r})$。$A$ による合同積は $m\operatorname{diag}(e^{r+t},e^{-r-t})$ です。従って $s(Ap)=As(p)$。補正は $(As(p))^{-1}As(p)=I_2$ です。

$s(p),A$ は対角なので可換です。$D(A)=\operatorname{diag}(A,A^{-1})$ より

$$
D(A)u(p)=\sqrt m\begin{pmatrix}As(p)\\iA^{-1}s(p)^{-1}\end{pmatrix}
=\sqrt m\begin{pmatrix}s(Ap)\\i s(Ap)^{-1}\end{pmatrix}=u(Ap).
$$

内部回転が自明である場合の共変条件が確認できました。
<!-- solution-end -->

<a id="ex-lrep26-b03"></a>

#### LREP26-B03 静止行列の回収
- Level: B
- ID: LREP26-B03

正質量Diracモードの運動量係数 $g=u(p)v$ が与えられたとき、$v$ を回収せよ。また $m=0$ へこの式をそのまま延長できない理由を述べよ。

<!-- solution-start -->
**詳細解答**

[内部空間の埋め込み](#thm-lrep26-dirac-embedding)で $u^\dagger H u=2mI_2$ です。$g$ の両辺に $u^\dagger H$ を掛けると $u^\dagger H g=2mv$。$m>0$ より $v=u^\dagger H g/(2m)$ となります。$m=0$ では分母が零であり、静止点 $(m,\boldsymbol0)$ も非零の未来光的軌道に属しません。したがってこの静止点からの構成自体を使えません。
<!-- solution-end -->

<a id="ex-lrep26-c01"></a>

#### LREP26-C01 断面を変えても同じ場になる
- Level: C
- ID: LREP26-C01

$m>0$、連続な $h:\mathcal O_m\to SU(2)$、$h(k)=I_2$ を使って $s'(p)=s(p)h(p)$ とする。静止行列 $C$ は同じとする。新しい係数 $u'(p)$ と新しい波束 $f'(p)$ を求め、同じ場が得られること、波束ノルムが保たれること、誘導作用が対応することを示せ。

<!-- solution-start -->
**詳細解答**

$h(p)k=k$ なので $s'(p)k=s(p)k=p$、また $s'(k)=I_2$ です。連続なので運動量断面です。[静止系の構成定理](#thm-lrep26-rest-extension)と静止条件により

$$
u'(p)=D(s(p))D(h(p))C
=D(s(p))C\rho(h(p))=u(p)\rho(h(p)).
$$

$f'(p)=\rho(h(p))^{-1}f(p)$ と置けば、点ごとに

$$
u'(p)f'(p)=u(p)\rho(h(p))\rho(h(p))^{-1}f(p)=u(p)f(p).
$$

従って連続コンパクト台の波束に対して積分も同じです。$\rho(h(p))$ はユニタリなので $\|f'(p)\|=\|f(p)\|$、積分して波束ノルムが一致します。

新しい固定群補正は

$$
\begin{aligned}
w'(A,q)
&=s'(Aq)^{-1}As'(q)\\
&=h(Aq)^{-1}w(A,q)h(q).
\end{aligned}
$$

$q=A^{-1}p$ とし、[質量殻上の誘導作用](../LREP25/index.md#def-lrep25-induced)に代入します。

$$
\begin{aligned}
(U'(a,A)f')(p)
&=e^{ip\cdot a}\rho(h(p))^{-1}
 \rho(w(A,q))\rho(h(q))f'(q)\\
&=\rho(h(p))^{-1}(U(a,A)f)(p).
\end{aligned}
$$

これは[断面変更による誘導表現の同値性](../LREP25/index.md#thm-lrep25-section-equivalence)が場の係数と波束の両方に現れたものです。内部の基底の選択は変わりましたが、物理状態のノルムと場の値は変わりません。
<!-- solution-end -->

## 6. まとめ

- 場の成分の有限次元表現と粒子の波束のユニタリ表現は変換の対象が異なる。
- 静止系の絡作用条件を満たす行列をboostで運べば、一般運動量での共変モード係数を構成できる。
- 正質量Dirac場では四成分の中に二次元の正周波数解空間があり、粒子の内部二成分をそこへ埋め込む。
- 次講では質量零の光子において場の成分と物理状態の自由度が異なる理由を調べる。
