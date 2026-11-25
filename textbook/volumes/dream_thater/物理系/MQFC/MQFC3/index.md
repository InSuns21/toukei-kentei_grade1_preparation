# MQFC3 Wightman公理とスペクトル条件

前講の[共通不変領域上の作用素値緩増加分布](../MQFC2/index.md#def-mqfc2-field-domain)によって、場を有限回掛けた状態が定義できました。しかし任意の作用素値分布が相対論的量子場になるわけではありません。観測者を変えても同じ物理を記述でき、光より速く信号を伝えず、エネルギーが下から安定していることを、同じHilbert空間上の条件として組み合わせます。今回は質量正の自由実スカラー場で全条件を確認し、次講で相関から場を逆に構成する準備をします。

直接の前提は [MQFC2](../MQFC2/index.md)、[QFT5](../../QFT/QFT5/index.md)、[AQFT3](../../../解析系/AQFT/AQFT3/index.md)、[AQFT8](../../../解析系/AQFT/AQFT8/index.md)、[LREP2](../../../代数系/LREP/LREP2/index.md)、[LREP22](../../../代数系/LREP/LREP22/index.md) です。計量は $(-,+,+,+)$、自然単位を使い、内積は第1引数線形です。

## 1. 場に要求する時空と状態の条件

時空点を $x=(t,\boldsymbol x)$、四元運動量を $p=(E,\boldsymbol p)$ と書き、$p^0=E$ はエネルギー、$|\boldsymbol p|$ は空間3成分のEuclidノルム、$\eta$ はMinkowski内積です。位相の符号を固定します。

$$
b(p,x)=Et-\boldsymbol p\cdot\boldsymbol x=-\eta(p,x).
$$

未来と過去を入れ替えず、空間の向きも保つLorentz変換 $\Lambda$ と平行移動 $a$ を組み合わせた変換を $h:x\mapsto \Lambda x+a$ とします。この変換全体が[固有時向きPoincaré群](../../../代数系/LREP/LREP21/index.md#def-lrep21-poincare) $G$ です。積は $(a,\Lambda)(c,L)=(a+\Lambda c,\Lambda L)$ です。スカラーの試験関数は座標の引き戻し $f_h(x)=f(h^{-1}x)$ で移します。$\Lambda$ はMinkowski内積を保存し、座標表示では $\Lambda^{\mathsf T}\eta\Lambda=\eta$ です。Jacobian行列は $\Lambda$ であり、行列式を取ると $(\det\Lambda)^2=1$ なのでJacobian絶対値は1です。

[ユニタリ表現](../../../代数系/LREP/LREP2/index.md#def-lrep2-invariant-inner-product)をHilbert空間に拡張して考えます。表現 $U$ は群の積を作用素の積に写し、内積を保存する全射です。[強連続ユニタリ表現](../../../代数系/LREP/LREP21/index.md#def-lrep21-unitary-representation)において強連続であるとは各固定状態 $\psi$ について $h\to e$ で $\|U(h)\psi-\psi\|\to0$ となることです。並進に制限すると、[平行移動のスペクトル条件](../../../解析系/AQFT/AQFT3/index.md#def-aqft3-spectrum)で用いた共同スペクトル測度 $E_U$ により

$$
U(a)=\int_{\mathbb R^4}e^{ib(p,a)}\,dE_U(p)
$$

と表示されます。測度の値は直交射影で、ある運動量集合に属する状態の成分を選びます。未来閉光円錐は

$$
\overline V_+=\{(p^0,\boldsymbol p):p^0\ge|\boldsymbol p|\}.
$$

です。スペクトル条件はその外側への射影が零であることです。単に $p^0\ge0$ だけを課すのではありません。[Lorentz共変性とエネルギー正値性](../../../解析系/AQFT/AQFT3/index.md#prop-aqft3-lorentz-positive)によれば全群の共変表現がある場合には両者は同値になりますが、並進だけでは同値でありません。

真空は単位ベクトルで全群に不変な状態を選びます。さらに真空へ有限回場を作用させたベクトルの線形包が稠密なら、場だけで全状態へ近似できることになります。この性質を場に関する巡回性といいます。真空の一意性は別の要請で、並進に不変なベクトルの空間が真空の一次元空間に限られることです。

最後に、離れた観測の順序を変えても結果が変わらないことを、[空間的分離した試験関数の支持](../../QFT/QFT5/index.md#def-qft5-spacelike-support)と[局所的可換性](../../QFT/QFT5/index.md#def-qft5-locality)で述べます。支持の全点対で空間的に分離するコンパクト台の試験関数を用います。

場の定義域には前講の[作用素値緩増加分布](../MQFC2/index.md#def-mqfc2-field-domain)を用います。$\mathcal S$ はSchwartz試験関数の空間、$\operatorname{End}(D)$ は共通領域 $D$ から自身への線形写像全体です。各固定した二状態の行列要素が試験関数の連続線形汎関数であることを要求します。$\bar f$ は点ごとの複素共役で、随伴条件は内積の中で場を反対側へ移す規則です。スカラー共変性とは、状態を $U(h)$ で変換した場が試験関数を $f_h$ へ変えた場と一致することです。

<a id="def-mqfc3-wightman-axioms"></a>

<!-- formal-statement-start -->
> **定義（実スカラー場のWightman公理）**
> 四次元Minkowski時空において、複素Hilbert空間 $\mathcal H$、稠密線形部分空間 $D$、単位ベクトル $\Omega\in D$、固有時向きPoincaré群の強連続ユニタリ表現 $U$、複素線形な作用素値緩増加分布 $\Phi:\mathcal S(\mathbb R^4)\to\operatorname{End}(D)$ を取る。以下を要求する。
>
> **条件1：** 共通領域 $D$ は全 $U(h)$ で不変で、場の随伴条件を満たす。

$$
\langle\Phi(f)\psi,\chi\rangle
=\langle\psi,\Phi(\bar f)\chi\rangle
\quad(\psi,\chi\in D).
$$

> **条件2：** スカラー共変性が $D$ 上で成立する。

$$
U(h)\Phi(f)U(h)^{-1}=\Phi(f_h).
$$

> **条件3：** 並進の共同スペクトル測度は未来閉光円錐に支持される。

$$
E_U(\mathbb R^4\setminus\overline V_+)=0.
$$

> **条件4：** 真空は全群で不変であり、並進不変ベクトルの空間は $\mathbb C\Omega$ である。
> **条件5：** 真空は場に関して巡回的である。

$$
\overline{\operatorname{span}
\{\Phi(f_1)\cdots\Phi(f_n)\Omega:n\ge0,\ f_j\in\mathcal S\}}
=\mathcal H.
$$

> ここで $n=0$ の積は恒等作用素である。
> **条件6：** 空間的に分離した支持を持つ任意の $f,g\in C_c^\infty(\mathbb R^4)$ について、$D$ 上で

$$
[\Phi(f),\Phi(g)]=0.
$$

> Hilbert空間の内積は正定値とする。
<!-- formal-statement-end -->

これは単一の実スカラー場について真空一意性を含めた形です。一般の場の多成分性、スピンや反交換関係は扱いません。正定値性は相関の階層に非自明な不等式を生じさせます。

<!-- definition-example-start: def-mqfc3-wightman-axioms -->
### 直接例：最小の模型

**定義の確認**。全ての公理を具体的に検証します。

$\mathcal H=D=\mathbb C$、$\Omega=1$、$U(h)=I$、$\Phi(f)=(\int f(x)d^4x)I$ とします。各場は複素数を複素数へ写すので $D$ を保ちます。固定した $z,w\in D$ について行列要素は $z\bar w\int f$ です。積分の線形性と、[Schwartz半ノルム](../MQFC1/index.md#def-mqfc1-schwartz) $p_{N,0}(f)=\sup_x(1+|x|)^N|f(x)|$ を使った整数 $N>4$ に対する

$$
\left|\int f(x)d^4x\right|
\le p_{N,0}(f)\int(1+|x|)^{-N}d^4x
$$

により行列要素は緩増加分布です。積分と共役は交換するので随伴条件が成立します。Jacobianが1の変数変換で $\int f_h=\int f$ となり共変性が成立します。$U$ は恒等作用素だけからなる強連続ユニタリ表現です。Borel集合 $B$ に対し $E_U(B)=\mathbf1_B(0)I$ とすると、スペクトル積分は $e^{ib(0,a)}I=I=U(a)$ です。ここで $\mathbf1_B$ は集合 $B$ の指示関数です。従ってスペクトルは $\{0\}$ で円錐内にあります。真空は不変で、空間そのものが $\mathbb C\Omega$ なので真空一意性と巡回性が成立します。全作用素は数の倍数なので交換子は零です。内積は $z\bar w$ で正定値です。全条件を満たしますが、励起状態は存在しません。公理に加えて非自明性を問う理由です。
<!-- definition-example-end -->

## 2. 真空期待値はどのような正値性を持つか

真空へ一連の場を作用させた期待値を考えます。順序を固定するため $W_n(f_1,\ldots,f_n)=\langle\Phi(f_1)\cdots\Phi(f_n)\Omega,\Omega\rangle$ とし、$W_0=1$ と置きます。ここではまず分離した試験関数上の多重線形形式として計算します。一般の多変数試験関数への延長は第5節で自由場について扱います。

真空から作る有限個の状態を $\xi_i=\Phi(f_{i1})\cdots\Phi(f_{in_i})\Omega$ と書きます。長さ $n_i$ は互いに異なってよく、零でも構いません。内積の正定値性から、次数の違う真空期待値を組み合わせた不等式が得られます。

<a id="prop-mqfc3-hierarchy-positivity"></a>

<!-- formal-statement-start -->
> **命題（真空期待値階層の正値性）**
> 実スカラー場のWightman公理を満たす系で、任意の有限個の試験関数列 $(f_{i1},\ldots,f_{in_i})$ と複素係数 $c_i$ を取る。上記の真空期待値を用いると

$$
\sum_{i,j}\bar c_i c_j
W_{n_i+n_j}(\bar f_{in_i},\ldots,\bar f_{i1},
 f_{j1},\ldots,f_{jn_j})\ge0.
$$

> 空の列は省略し、$W_0=1$ とする。
<!-- formal-statement-end -->

### 証明の見取り図

長さの違う列から作る状態の線形結合のノルムを二乗し、左側の場を随伴で一つずつ移動します。場の順番が逆になる点が重要です。

<!-- proof-start -->
### 証明

共通不変領域により $\xi_i,\xi_j\in D$ です。随伴条件を使って内積の第2引数から場を移します。例えば $n_i=2$ の場合、

$$
\begin{aligned}
\langle\xi_j,\Phi(f_{i1})\Phi(f_{i2})\Omega\rangle
&=\langle\Phi(\bar f_{i1})\xi_j,\Phi(f_{i2})\Omega\rangle\\
&=\langle\Phi(\bar f_{i2})\Phi(\bar f_{i1})\xi_j,\Omega\rangle.
\end{aligned}
$$

一般の $n_i$ でも第2引数の左端から順に移せば、新たな場は第1引数の左端に加わるので列の順番が逆になります。従って

$$
\langle\xi_j,\xi_i\rangle
=W_{n_i+n_j}(\bar f_{in_i},\ldots,\bar f_{i1},
 f_{j1},\ldots,f_{jn_j}).
$$

最後に内積の第1引数線形性により

$$
\left\|\sum_j c_j\xi_j\right\|^2
=\sum_{i,j}\bar c_i c_j\langle\xi_j,\xi_i\rangle\ge0.
$$

これが目的の不等式です。
<!-- proof-end -->

例えば $\xi_0=\Omega,\xi_1=\Phi(f)\Omega$ なら、$c_0=-W_1(f),c_1=1$ を選んで

$$
W_2(\bar f,f)-|W_1(f)|^2
=\|\Phi(f)\Omega-W_1(f)\Omega\|^2\ge0
$$

を得ます。二点の対角値が正であることだけでは、異なる次数を混ぜた不等式を保証できません。次講はこのノルムの二乗に当たる式から内積を作る方向へ進みます。

## 3. 自由場にPoincaré群を作用させる

[自由場の共通領域とSchwartz評価](../MQFC2/index.md#thm-mqfc2-free-field-estimate)で得た質量 $m>0$ の自由場を使います。一粒子空間は $\mathfrak h=L^2(\mathbb R^3,d\mu)$、$d\mu=d^3p/(2\pi)^3$ とします。$\omega_{\boldsymbol p}=\sqrt{|\boldsymbol p|^2+m^2}$、$p=(\omega_{\boldsymbol p},\boldsymbol p)$ とし、

$$
\widetilde f(p)=\int f(x)e^{ib(p,x)}d^4x,\qquad
u_f(\boldsymbol p)=\frac{\widetilde f(p)}{\sqrt{2\omega_{\boldsymbol p}}}.
$$

ここで $\widetilde f(E,\boldsymbol p)$ は4変数のFourier変換で、$u_f$ では $E=\omega_{\boldsymbol p}$ に制限しています。[Schwartz空間のFourier変換](../MQFC1/index.md#thm-mqfc1-fourier)の記法とは $\widetilde f(E,\boldsymbol p)=\widehat f(-E,\boldsymbol p)$ の関係にあります。

[対称Fock空間](../../QFT/QFT4/index.md#def-qft4-fock-space)は $\mathcal F=\bigoplus_{n\ge0}\mathfrak h^{\otimes_s n}$ です。$\otimes_s$ は粒子の置換に対して対称なテンソル部分空間を表し、零粒子空間は $\mathbb C$ です。有限個の粒子数だけが非零で各波束がSchwartz級である領域を $D_{\mathcal S}$ とします。[生成・消滅演算子](../../QFT/QFT4/index.md#def-qft4-ladder-operators) $a^\dagger(v),a(v)$ はそれぞれ粒子数を一つ増減し、$v$ に関し線形、共役線形です。この領域で

$$
\Phi(f)=a(u_{\bar f})+a^\dagger(u_f)
$$

です。$\Lambda^{-1}p$ の空間成分を $\boldsymbol q$ と置きます。[AQFT8の自由場の正エネルギー構成](../../../解析系/AQFT/AQFT8/index.md#thm-aqft8-vacuum-spectrum)を本講の波束の規格化で実行します。

<a id="thm-mqfc3-free-wightman"></a>

<!-- formal-statement-start -->
> **定理（質量正の自由実スカラー場のWightman公理）**
> 四次元Minkowski時空、質量 $m>0$、一粒子空間 $\mathfrak h=L^2(\mathbb R^3,d^3p/(2\pi)^3)$ の自由実スカラー場を上記の質量殻波束で構成し、共通領域を有限粒子Schwartz領域とする。零粒子成分を単位真空 $\Omega=(1,0,\ldots)$ とする。
> $h=(a,\Lambda)$ に対し $p=(\omega_{\boldsymbol p},\boldsymbol p)$、$\Lambda^{-1}p=(\omega_{\boldsymbol q},\boldsymbol q)$ とし、一粒子上の作用を

$$
(T(h)v)(\boldsymbol p)
=e^{ib(p,a)}
\sqrt{\frac{\omega_{\boldsymbol q}}{\omega_{\boldsymbol p}}}
v(\boldsymbol q)
$$

> と定める。Fock空間上で $U(h)$ を各 $n$ 粒子成分の $T(h)^{\otimes n}$ の直和とし、零粒子成分では恒等作用素とする。この系は実スカラー場のWightman公理を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

[質量殻測度のLorentz不変性](../../../代数系/LREP/LREP22/index.md#thm-lrep22-measure-invariance)がユニタリ性を、波束の変換式が場の共変性を与えます。各粒子の未来向き運動量を足すと全運動量も未来向きであり、質量正なら励起状態に零運動量はありません。任意の一粒子Schwartz波束を時空試験関数から作り、最高粒子数成分を取り出す帰納法で巡回性を確認します。局所性は既習の因果核の支持を用います。

<!-- proof-start -->
### 証明

**(1) 一粒子表現と強連続性。** まず $f_h(x)=f(\Lambda^{-1}(x-a))$ の変換で $x=\Lambda y+a$ と置きます。位相は

$$
b(p,\Lambda y+a)=b(\Lambda^{-1}p,y)+b(p,a)
$$

なので

$$
\widetilde{f_h}(p)=e^{ib(p,a)}\widetilde f(\Lambda^{-1}p),
\qquad u_{f_h}=T(h)u_f.
$$

[質量殻測度](../../../代数系/LREP/LREP22/index.md#def-lrep22-shell-measure)と[正エネルギー質量殻の測度表示](../../QFT/QFT5/index.md#prop-qft5-spectrum-kg)で用いた不変測度 $d^3p/(2\omega_{\boldsymbol p})$ は、$d^4p\,\mathbf1_{p^0>0}\delta(\eta(p,p)+m^2)$ の $p^0$ 積分から得られます。根は $p^0=\omega_{\boldsymbol p}$、微分の絶対値は $2\omega_{\boldsymbol p}$ なので係数も一致します。従って $d^3p/\omega_{\boldsymbol p}=d^3q/\omega_{\boldsymbol q}$ で、

$$
\begin{aligned}
\|T(h)v\|^2
&=\int |v(\boldsymbol q)|^2
\frac{\omega_{\boldsymbol q}}{\omega_{\boldsymbol p}}
\frac{d^3p}{(2\pi)^3}\\
&=\int |v(\boldsymbol q)|^2\frac{d^3q}{(2\pi)^3}.
\end{aligned}
$$

二回作用させる場合、$q=\Lambda^{-1}p$、$r=L^{-1}q$ を四元運動量として、その空間成分を $\boldsymbol q,\boldsymbol r$ と書きます。

$$
\begin{aligned}
(T(a,\Lambda)T(c,L)v)(\boldsymbol p)
&=e^{i[b(p,a)+b(q,c)]}
\sqrt{\frac{q^0}{p^0}}\sqrt{\frac{r^0}{q^0}}v(\boldsymbol r)\\
&=e^{ib(p,a+\Lambda c)}
\sqrt{\frac{r^0}{p^0}}v(\boldsymbol r).
\end{aligned}
$$

ここで $b(q,c)=b(p,\Lambda c)$、$r=(\Lambda L)^{-1}p$ であり、全エネルギー成分は正です。従って $T(a,\Lambda)T(c,L)=T(a+\Lambda c,\Lambda L)$、特に $T(h^{-1})$ が逆写像です。内積を保存し全射なのでユニタリです。

コンパクト台の滑らかな波束 $v$ では $h\to e$ のとき点ごとに $T(h)v\to v$ です。恒等元近傍で支持は共通の有界集合に入り、重みも有界なので二乗差に優収束定理を適用できます。一般の $v$ をそのような波束 $v_k$ で近似すると

$$
\|T(h)v-v\|\le2\|v-v_k\|+\|T(h)v_k-v_k\|.
$$

先に $k$ を大きくし、次に $h\to e$ として強連続性を得ます。単純テンソル $v_1\otimes\cdots\otimes v_n$ では各因子を一つずつ置換する差の和から

$$
\left\|\bigotimes_{j=1}^n T(h)v_j-\bigotimes_{j=1}^n v_j\right\|
\le \sum_{j=1}^n\|T(h)v_j-v_j\|
\prod_{\ell\ne j}\|v_\ell\|
\longrightarrow0.
$$

対称化はノルム1以下の射影で $T(h)^{\otimes n}$ と可換なので、対称単純テンソルでも強連続であり、有限和の対称単純テンソルの稠密性で全 $n$ 粒子空間へ延長できます。最後に任意のFockベクトルを有限粒子切断で近似します。ユニタリ性で切断の誤差を両端から評価すると $U$ も強連続です。

**(2) 共通領域と場の共変性。** $\boldsymbol p\mapsto\boldsymbol q$ は滑らかで、各階導関数は高々多項式増大です。実際 $\boldsymbol q$ は $\omega_{\boldsymbol p}$ と $\boldsymbol p$ の線形結合であり、$m>0$ により分母の $\omega$ は零になりません。逆変換も同じ形であるため、ある定数 $C$ に対し

$$
1+|\boldsymbol p|\le C(1+|\boldsymbol q|)
$$

が成立します。位相・重みの各階導関数も高々多項式増大なので、連鎖律と積の微分を使うと任意のSchwartz半ノルムを有限個の元の半ノルムで抑えられます。従って $T(h)$ と逆写像はSchwartz空間を保ちます。各粒子数でこの議論を適用すると $U(h)$ は $D_{\mathcal S}$ を保ちます。

[生成・消滅演算子](../../QFT/QFT4/index.md#def-qft4-ladder-operators)の生成の成分式は $\sqrt{n+1}$ 倍の対称化です。$T(h)^{\otimes(n+1)}$ は置換と可換なので、共通領域上で

$$
U(h)a^\dagger(v)U(h)^{-1}=a^\dagger(T(h)v).
$$

消滅については両辺の領域内での随伴等式を取り、生成の式とユニタリ性を使って $U(h)a(v)U(h)^{-1}=a(T(h)v)$ を得ます。これは全Hilbert空間上の非有界作用素の等号を主張するものではありません。

さらに $\overline{f_h}=(\bar f)_h$ なので、

$$
\begin{aligned}
U(h)\Phi(f)U(h)^{-1}
&=a(T(h)u_{\bar f})+a^\dagger(T(h)u_f)\\
&=a(u_{\overline{f_h}})+a^\dagger(u_{f_h})\\
&=\Phi(f_h).
\end{aligned}
$$

作用素値分布性と随伴条件は[前講の自由場のSchwartz評価](../MQFC2/index.md#thm-mqfc2-free-field-estimate)が同じ領域と波束について証明しています。

**(3) スペクトル条件と真空一意性。** 並進 $h=(a,I)$ は一粒子波束に $e^{ib(p,a)}$ を掛けます。従って $n$ 粒子成分では

$$
(U(a)\psi)_n=e^{ib(P_n,a)}\psi_n,\qquad
P_n=\sum_{j=1}^n(\omega_{\boldsymbol p_j},\boldsymbol p_j).
$$

共同スペクトル測度は各成分に $\mathbf1_{P_n\in B}$ を掛ける射影の直和です。零粒子では $P_0=0$ とします。指示関数の積は集合の共通部分に対応し、可算加法性は互いに素な集合での二乗ノルムの和から従います。この測度を指数関数で積分すれば上の並進作用を復元します。

三角不等式から

$$
\begin{aligned}
P_n^0&=\sum_j\omega_{\boldsymbol p_j}
\ge\sum_j|\boldsymbol p_j|
\ge|\boldsymbol P_n|,\\
P_n^0&\ge nm.
\end{aligned}
$$

従って全成分の射影は未来閉光円錐に支持されます。$n\ge1$ なら $P_n^0>0$ なので、$E_U(\{0\})$ は零粒子成分への射影に等しいです。[零運動量射影と不変ベクトル](../../../解析系/AQFT/AQFT3/index.md#prop-aqft3-zero-momentum)を適用すると並進不変ベクトルは $\mathbb C\Omega$ に限られます。零粒子成分は全群で恒等作用なので $\Omega$ は全群で不変です。

**(4) 巡回性。** 任意の $v\in\mathcal S(\mathbb R^3)$ を取ります。$\chi\in C_c^\infty(\mathbb R)$ を $\chi(0)=1$ となるよう選び、

$$
F(E,\boldsymbol p)
=\sqrt{2\omega_{\boldsymbol p}}\,v(\boldsymbol p)
\chi(E-\omega_{\boldsymbol p})
$$

と置きます。$F$ の支持上では $|E|\le\omega_{\boldsymbol p}+R$（$R$ は $\chi$ の支持半径）なので $1+|E|+|\boldsymbol p|\le C(1+|\boldsymbol p|)$ です。導関数は $v$ の導関数と $\chi$ の導関数に多項式増大因子を掛けた有限和になります。$v$ は任意次数の減衰を持つので $F$ はSchwartz級です。[Schwartz空間のFourier変換](../MQFC1/index.md#thm-mqfc1-fourier)の逆変換で $\widetilde f=F$ となる $f$ を選べば $u_f=v$ です。

場の積の線形包を $M$ とします。$\Omega\in M$ で、$\Phi(f)M\subset M$ です。任意の $v$ に対し一粒子状態 $\Phi(f)\Omega=v$ も $M$ に入ります。$n$ 以下の対称単純テンソルがすべて $M$ に入ると仮定し、そのうち純粋な $n$ 粒子状態 $\psi$ を取ります。$u_f=v$ となる $f$ に対し

$$
a^\dagger(v)\psi=\Phi(f)\psi-a(u_{\bar f})\psi.
$$

右辺第一項は $M$ に入り、第二項は $n-1$ 粒子の対称単純テンソルの有限和です。実際、$S_n$ を $n$ 因子の対称化射影とし、$\psi=S_n(v_1\otimes\cdots\otimes v_n)$ と書くと、[消滅演算子の成分式](../../QFT/QFT4/index.md#def-qft4-ladder-operators)より $n\ge1$ で

$$
a(w)\psi=\frac1{\sqrt n}\sum_{j=1}^n
\langle v_j,w\rangle
S_{n-1}(v_1\otimes\cdots\otimes\widehat v_j\otimes\cdots\otimes v_n).
$$

帽子はその因子を除くことを表し、$S_0$ は零粒子成分の恒等作用です。$n$ 通りの位置のうち各因子が消滅される割合は $1/n$ で、成分式の $\sqrt n$ を掛けて係数 $1/\sqrt n$ が得られます。ここでは $w=u_{\bar f}$ です。帰納仮定から第二項も $M$ に入ります。従って生成した $\sqrt{n+1}$ 倍の対称テンソルも $M$ に入ります。係数を割れば任意の $n+1$ 因子の対称単純テンソルが得られます。

Schwartz波束が一粒子空間で稠密であるため、それらの単純テンソルの線形包は各粒子空間で稠密です。対称化は連続な直交射影なので対称部分空間でも稠密となり、有限粒子の切捨てでFock空間全体に稠密です。よって巡回性が成立します。

**(5) 局所性。** [自由実スカラー場の局所的可換性](../../QFT/QFT5/index.md#thm-qft5-locality)の仮定は質量正、同じ有限粒子Schwartz領域、空間的に分離したコンパクト台です。ここで全て一致します。実試験関数の場合に定理を適用し、複素試験関数を実部と虚部に分けた四つの交換子も同じ支持条件で零になるので複素の場合も成立します。

最後にFock空間はHilbert直和なので内積は正定値です。以上で全公理を確認しました。
<!-- proof-end -->

例えば $m=2$ で一粒子運動量が $(3,0,0)$ なら $p^0=\sqrt{13}$ です。逆向きの運動量を持つ一粒子を加えると合計は $(2\sqrt{13},0,0,0)$ となります。総空間運動量が零でも励起状態のエネルギーは零になりません。

## 4. スペクトル条件は相関にも現れる

二つの場の間に並進を入れた量を考えると、共同スペクトル測度を数値測度へ落とせます。$v=\Phi(f)\Omega$、$w=\Phi(g)\Omega$ に対し、$E_U(B)$ を間に入れた内積を測度として使います。

<a id="prop-mqfc3-positive-frequency"></a>

<!-- formal-statement-start -->
> **命題（真空二点量の並進スペクトル）**
> 実スカラー場のWightman公理を満たす系で $f,g\in\mathcal S(\mathbb R^4)$、$g_a(x)=g(x-a)$ とする。$v=\Phi(f)\Omega$、$w=\Phi(g)\Omega$ とおくと、有限複素測度

$$
\nu_{f,g}(B)=\langle E_U(B)w,v\rangle
$$

> は未来閉光円錐に支持され、

$$
W_2(\bar f,g_a)=\int e^{ib(p,a)}d\nu_{f,g}(p).
$$

> $g=f$ なら測度は非負で、全質量は $\|\Phi(f)\Omega\|^2$ である。
<!-- formal-statement-end -->

### 証明の見取り図

並進共変性と真空不変性によって、試験関数の平行移動を状態のユニタリ作用へ置き換えます。

<!-- proof-start -->
### 証明

共変性から $\Phi(g_a)\Omega=U(a)\Phi(g)U(a)^{-1}\Omega=U(a)w$ です。随伴条件によって

$$
W_2(\bar f,g_a)=\langle\Phi(g_a)\Omega,\Phi(f)\Omega\rangle
=\langle U(a)w,v\rangle.
$$

[平行移動のスペクトル条件](../../../解析系/AQFT/AQFT3/index.md#def-aqft3-spectrum)のスペクトル積分を右辺へ代入すると求める式になります。測度の可算加法性は射影値測度の強可算加法性から従います。有限個の互いに素な $B_k$ について、

$$
\begin{aligned}
\sum_k|\langle E_U(B_k)w,v\rangle|
&=\sum_k|\langle E_U(B_k)w,E_U(B_k)v\rangle|\\
&\le\left(\sum_k\|E_U(B_k)w\|^2\right)^{1/2}
\left(\sum_k\|E_U(B_k)v\|^2\right)^{1/2}\\
&\le\|w\|\|v\|.
\end{aligned}
$$

従って全変動は有限です。円錐外の射影が零なので測度も零になります。$v=w$ なら $\nu_{f,f}(B)=\|E_U(B)v\|^2\ge0$ で、全空間の射影は恒等作用素なので全質量は $\|v\|^2$ です。
<!-- proof-end -->

自由場の場合は $v=u_f,w=u_g$ が一粒子成分だけにあるため、明示的に

$$
\nu_{f,g}(B)=
\int_{\{(\omega_{\boldsymbol p},\boldsymbol p)\in B\}}
\frac{\overline{\widetilde f(p)}\widetilde g(p)}{2\omega_{\boldsymbol p}}
\frac{d^3p}{(2\pi)^3}
$$

となります。$g=f$ なら重みは絶対値の二乗で正です。ここで位相が正符号なのは第2の試験関数を未来へ移しているためです。二点分布を時空差 $x-y$ で書くと逆符号になります。[Wightman二点分布](../../QFT/QFT5/index.md#def-qft5-wightman)の符号と矛盾しません。

## 5. 自由場の多点量を分布として扱う

分離した試験関数だけでなく、全変数をまとめた試験関数 $F(x_1,\ldots,x_n)$ に対しても期待値を定義したいところです。自由場では[生成・消滅演算子の交換関係](../../QFT/QFT4/index.md#thm-qft4-fock-ccr)からそれを直接構成できます。

<a id="prop-mqfc3-free-kernels"></a>

<!-- formal-statement-start -->
> **命題（自由場真空期待値の多点分布）**
> 質量 $m>0$ の自由実スカラー場の $W_n$ は、奇数 $n$ では零で、偶数 $n=2k$ では各添字を二つずつ組に分ける全ての対分割 $\pi$ に対する二点期待値の積の和である。

$$
W_{2k}(f_1,\ldots,f_{2k})
=\sum_{\pi}\prod_{(i,j)\in\pi,\ i<j}W_2(f_i,f_j).
$$

> 各項は $\mathcal S(\mathbb R^{4(2k)})$ 上の緩増加分布に拡張できる。
<!-- formal-statement-end -->

### 証明の見取り図

左端の消滅演算子を右へ移動し、途中の生成演算子との交換子だけを残します。各対の運動量は別々の変数なので、積を同一変数上で取る必要がありません。

<!-- proof-start -->
### 証明

左端の生成演算子から来る項は真空との内積で零です。左端の消滅演算子を右へ一つ移すには $AB=BA+[A,B]$ を使います。[Fock生成・消滅演算子の交換関係](../../QFT/QFT4/index.md#thm-qft4-fock-ccr)により、交換子

$$
[a(u_{\bar f_1}),\Phi(f_j)]
=\langle u_{f_j},u_{\bar f_1}\rangle I
=W_2(f_1,f_j)I
$$

が現れます。右端まで移した項は真空を消滅させて零です。従って

$$
W_n(f_1,\ldots,f_n)=
\sum_{j=2}^n W_2(f_1,f_j)
W_{n-2}(f_2,\ldots,\widehat f_j,\ldots,f_n)
$$

です。帽子はその引数を除くことを表します。$W_0=1,W_1=0$ から奇数は零、偶数では添字1の相手を選び、残りを同様に組にする全対分割を重複なく数えます。

多変数Fourier変換は各変数に第3節と同じ位相を用います。一つの対分割を固定し、対 $(i,j)$ ごとに独立の運動量 $\boldsymbol p_\ell$ を置き、$p_\ell=(\omega_{\boldsymbol p_\ell},\boldsymbol p_\ell)$ とします。Fourier変換の第 $i$ 引数を $-p_\ell$、第 $j$ 引数を $p_\ell$ にした列を $Q_\pi$ と書きます。二点期待値の積に対応する線形汎関数は

$$
F\longmapsto
\int \widetilde F(Q_\pi)
\prod_{\ell=1}^{k}
\frac{d^3p_\ell}{(2\pi)^3\,2\omega_{\boldsymbol p_\ell}}.
$$

分離した $F=\prod_j f_j(x_j)$ ではFourier変換が積に分かれ、[二点の質量殻表示](../../QFT/QFT5/index.md#thm-qft5-wightman-positive)と一致します。一般の $F$ では $R^2=\sum_\ell|\boldsymbol p_\ell|^2$ とすると $|Q_\pi|\ge R$ です。[Schwartz空間のFourier変換](../MQFC1/index.md#thm-mqfc1-fourier)によって

$$
|\widetilde F(Q_\pi)|\le C p_{N,M}(F)(1+R)^{-s}
$$

となる固定半ノルムがあり、$s>3k$ を選べます。$1/(2\omega_{\boldsymbol p_\ell})\le1/(2m)$ なので積分の絶対値は定数と半ノルムと

$$
\int_{\mathbb R^{3k}}(1+R)^{-s}d^{3k}p
$$

の積以下です。この積分は原点で有限、無限遠では半径積分の指数が $3k-1-s<-1$ なので有限です。従って各項は緩増加分布で、その有限和も同様です。
<!-- proof-end -->

例えば四点には $(12)(34),(13)(24),(14)(23)$ の3通りが現れます。これは自由場の特殊性であり、一般の相互作用場の四点量が二点量だけで決まるとは限りません。一般のWightman再構成では多変数分布を入力とします。

## 6. 演習

### 演習 MQFC3-A1：円錐と加算

- Level: A
- 目安時間: 10分

$p=(5,3,0,0)$、$q=(4,-2,0,0)$ は未来閉光円錐に属するか。和も確認せよ。

<!-- solution-start -->
#### 詳細解答

スペクトル条件の円錐は時間成分が空間ノルム以上である点の集合です。$5\ge3$、$4\ge2$ なので両者とも属します。和は $(9,1,0,0)$ で $9\ge1$ です。一般にも $p^0+q^0\ge|\boldsymbol p|+|\boldsymbol q|\ge|\boldsymbol p+\boldsymbol q|$ なので和は円錐内にあります。
<!-- solution-end -->

### 演習 MQFC3-A2：試験関数の並進

- Level: A
- 目安時間: 10分

$a=(s,\boldsymbol a)$、$f_a(x)=f(x-a)$ として、$\widetilde{f_a}(p)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$y=x-a$ とすると $d^4x=d^4y$、$b(p,x)=b(p,y)+p^0s-\boldsymbol p\cdot\boldsymbol a$ です。従って

$$
\begin{aligned}
\widetilde{f_a}(p)
&=\int f(y)e^{ib(p,y+a)}d^4y\\
&=e^{i(p^0s-\boldsymbol p\cdot\boldsymbol a)}\widetilde f(p).
\end{aligned}
$$

[自由場の共変作用](#thm-mqfc3-free-wightman)を導く際に得た波束変換式の $\Lambda=I$ の場合です。
<!-- solution-end -->

### 演習 MQFC3-A3：零運動量射影

- Level: A
- 目安時間: 10分

質量 $m=1$ の自由場で二粒子以下の状態 $\psi=(z,v,w,0,\ldots)$ に零運動量射影を作用させよ。$w$ は二粒子波束である。

<!-- solution-start -->
#### 詳細解答

[自由場のWightman公理の検証](#thm-mqfc3-free-wightman)で得た各粒子数のエネルギーは、一粒子では1以上、二粒子では2以上です。従って両成分に $\mathbf1_{P_n=0}$ を掛けると零になります。零粒子成分だけは $P_0=0$ なので

$$
E_U(\{0\})\psi=(z,0,0,0,\ldots)=z\Omega.
$$

真空一意性の確認には空間運動量の和だけでなく時間成分が必要です。
<!-- solution-end -->

### 演習 MQFC3-A4：一つの状態を混ぜた正値性

- Level: A
- 目安時間: 15分

$W_1(f)=2i$ と仮定する。$W_2(\bar f,f)$ の下界を求めよ。

<!-- solution-start -->
#### 詳細解答

[真空期待値階層の正値性](#prop-mqfc3-hierarchy-positivity)で空の列と長さ1の列を取り、係数を $-2i,1$ にします。$\xi=\Phi(f)\Omega$ とすれば $\langle\xi,\Omega\rangle=2i$、$\|\Omega\|=1$ なので

$$
\begin{aligned}
0&\le\|\xi-2i\Omega\|^2\\
&=\|\xi\|^2+4-4-4\\
&=W_2(\bar f,f)-4.
\end{aligned}
$$

従って下界は4です。自由場では $W_1(f)=0$ ですが、一般の場ではこのような非零期待値を許します。
<!-- solution-end -->

### 演習 MQFC3-B1：並進だけでは不十分

- Level: B
- 目安時間: 20分

$\mathbb C^2$ 上で $U(a)=\operatorname{diag}(1,e^{i(t-2x^1)})$ とする。共同スペクトル、エネルギーの非負性、円錐条件、並進不変空間を求めよ。

<!-- solution-start -->
#### 詳細解答

標準正規直交基底を $e_1,e_2$ とします。$U(a)e_1=e_1$、$U(a)e_2=e^{i(t-2x^1)}e_2$ なので、指数の係数と $b(p,a)=p^0t-\boldsymbol p\cdot\boldsymbol x$ を比較すると運動量は $p_1=0,p_2=(1,2,0,0)$ です。[共同スペクトル測度とスペクトル条件](../../../解析系/AQFT/AQFT3/index.md#def-aqft3-spectrum)の積分表示に対応する射影は

$$
E_U(B)(z_1e_1+z_2e_2)
=\mathbf1_B(p_1)z_1e_1+\mathbf1_B(p_2)z_2e_2.
$$

指数関数をこの測度で積分すると与えられた $U(a)$ を復元します。各成分の指数関数は連続で絶対値1、位相は加法的なので、これは強連続ユニタリ表現です。従ってスペクトルは $\{0,(1,2,0,0)\}$ です。時間成分は0と1で非負ですが $1<2$ なので円錐条件は失敗します。並進に不変な空間は第1座標のみです。

さらにこの表現が全Poincaré群へ延長できると仮定すると、[Lorentz共変性とエネルギー正値性](../../../解析系/AQFT/AQFT3/index.md#prop-aqft3-lorentz-positive)により $H\ge0$ から円錐条件が従ってしまいます。よってそのような共変延長は存在しません。
<!-- solution-end -->

### 演習 MQFC3-B2：共変作用で重みが必要な理由

- Level: B
- 目安時間: 20分

第3節の一粒子空間で $a=0$ とし、重みを付けない作用 $Sv(\boldsymbol p)=v(\boldsymbol q)$ と正しい $T(0,\Lambda)$ のノルムを比較せよ。非零のboostでは一般に $S$ はユニタリでない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

[質量殻測度のLorentz不変性](../../../代数系/LREP/LREP22/index.md#thm-lrep22-measure-invariance)を第3節と同じ規格化で使うと $d^3p=(\omega_{\boldsymbol p}/\omega_{\boldsymbol q})d^3q$ です。そのため

$$
\|Sv\|^2=\int |v(\boldsymbol q)|^2
\frac{\omega_{\boldsymbol p}}{\omega_{\boldsymbol q}}d\mu(\boldsymbol q).
$$

$\boldsymbol q=0$ の点を非零のboostで移すと、$\omega_{\boldsymbol p}=\gamma m$、$\omega_{\boldsymbol q}=m$ なので比は $\gamma>1$ です。連続性により原点近傍で比は1より大きいままです。その近傍に支持を持つ非零の滑らかな波束なら $\|Sv\|^2>\|v\|^2$ となります。一方、

$$
\|T(0,\Lambda)v\|^2
=\int |v(\boldsymbol q)|^2
\frac{\omega_{\boldsymbol q}}{\omega_{\boldsymbol p}}
\frac{\omega_{\boldsymbol p}}{\omega_{\boldsymbol q}}d\mu(\boldsymbol q)
=\|v\|^2.
$$

逆変換も同じ表現に含まれるため $T$ は全射で、ユニタリです。
<!-- solution-end -->

### 演習 MQFC3-B3：空間的分離と期待値の順序

- Level: B
- 目安時間: 20分

$f$ は $|t|\le1,|\boldsymbol x|\le1$、$g$ は $|s|\le1,|\boldsymbol y-5\boldsymbol e_1|\le1$ に支持を持つ実コンパクト台滑らか関数とする。$W_3(h,f,g)=W_3(h,g,f)$ を示せ。$h$ は任意のSchwartz関数とする。一般にこの等式から $W_2(f,g)=0$ と言えるか。

<!-- solution-start -->
#### 詳細解答

全点対で時間差は $|t-s|\le2$ です。三角不等式より空間差は

$$
|\boldsymbol x-\boldsymbol y|
\ge5-|\boldsymbol x|-|\boldsymbol y-5\boldsymbol e_1|\ge3.
$$

従って空間差が時間差より大きく、[Wightman公理の局所性条件](#def-mqfc3-wightman-axioms)を適用できます。共通不変領域上で

$$
\begin{aligned}
W_3(h,f,g)-W_3(h,g,f)
&=\langle\Phi(h)[\Phi(f),\Phi(g)]\Omega,\Omega\rangle\\
&=0.
\end{aligned}
$$

しかし交換子は差についての条件にすぎません。例えば第1節の一次元模型で積分が正の $f,g$ を取れば $W_2(f,g)=(\int f)(\int g)>0$ です。自由場でも[空間的分離した二点相関の例](../../QFT/QFT5/index.md#ref-qft5-spacelike-wightman)で非零の相関が確認されています。
<!-- solution-end -->

### 演習 MQFC3-B4：有限複素測度から二点量を復元

- Level: B
- 目安時間: 20分

仮に $\Phi(f)\Omega$ が互いに直交する二つの共同固有ベクトルの和 $v_1+v_2$ で、運動量が $(2,0,0,0),(3,1,0,0)$、ノルムの二乗が2と1とする。$\nu_{f,f}$ と $W_2(\bar f,f_{(s,0)})$ を求めよ。

<!-- solution-start -->
#### 詳細解答

[真空二点量の並進スペクトル](#prop-mqfc3-positive-frequency)で $E_U(B)$ は対応する固有ベクトルだけを残します。二つの運動量を $p_1,p_2$ と書けば、$E_U(B)v_j=\mathbf1_B(p_j)v_j$ です。直交性から

$$
\langle E_U(B)(v_1+v_2),v_1+v_2\rangle
=2\mathbf1_B(p_1)+\mathbf1_B(p_2).
$$

点質量 $\delta_p$ は $\delta_p(B)=\mathbf1_B(p)$ の意味なので、

$$
\nu_{f,f}=2\delta_{(2,0,0,0)}+\delta_{(3,1,0,0)}
$$

です。両運動量とも未来閉光円錐内にあります。時間並進では位相は $e^{ip^0s}$ なので積分は

$$
W_2(\bar f,f_{(s,0)})=2e^{2is}+e^{3is}.
$$

$s=0$ では3となり、$\|v_1+v_2\|^2=2+1$ と一致します。これは共同固有ベクトルを仮定したスペクトル計算の模型で、連続な質量殻を持つ自由場の正規化可能な固有状態を仮定してはいません。
<!-- solution-end -->

### 演習 MQFC3-C1：四点相関と異なる次数の正値性

- Level: C
- 目安時間: 35分

自由場の実試験関数 $f$ について $r=\|u_f\|^2>0$ とする。$W_4(f,f,f,f)$ を計算し、$\xi=\Phi(f)^2\Omega-\alpha\Omega$ のノルムの二乗を任意の $\alpha\in\mathbb C$ について求めよ。最小化する $\alpha$ と、そのときのノルムが零かどうかを判定せよ。粒子数成分からも結果を検算せよ。

<!-- solution-start -->
#### 詳細解答

[自由場真空期待値の多点分布](#prop-mqfc3-free-kernels)で四点を分ける対分割は $(12)(34),(13)(24),(14)(23)$ の3通りです。各二点が $r$ なので $W_4=3r^2$ です。$f$ は実で随伴条件により、$\langle\Phi(f)^2\Omega,\Omega\rangle=W_2(f,f)=r$、$\|\Phi(f)^2\Omega\|^2=W_4$ です。従って

$$
\begin{aligned}
\|\xi\|^2
&=3r^2-\bar\alpha r-\alpha r+|\alpha|^2\\
&=2r^2+|\alpha-r|^2.
\end{aligned}
$$

最小化するのは $\alpha=r$ であり、$2r^2>0$ なので零にはなりません。

粒子数成分から確認します。真空に $\Phi(f)$ を一度作用させると一粒子波束 $u_f$ です。[生成・消滅演算子の交換関係](../../QFT/QFT4/index.md#thm-qft4-fock-ccr)で $a(u_f)a^\dagger(u_f)\Omega=r\Omega$、生成を二度行った成分は $\sqrt2\,u_f\otimes u_f$ です。従って

$$
\Phi(f)^2\Omega=r\Omega+\sqrt2\,u_f\otimes u_f.
$$

零粒子と二粒子は直交するため

$$
\|\xi\|^2=|r-\alpha|^2+2\|u_f\|^4
=|r-\alpha|^2+2r^2.
$$

同じ値が得られました。二点だけでなく、零次と二次の状態を混ぜたノルムが四点相関の制約になることが分かります。
<!-- solution-end -->

## 7. 次の講義

Wightman公理は場の定義域、時空対称性、スペクトル、局所性、真空とHilbert空間の正値性を一体にしたものです。本講では自由場でこれらを検証し、相関階層の正値不等式と多点分布の構成を得ました。MQFC4では逆に、相関階層を与えたとき、零ノルムの方向を除いてHilbert空間と場をどう構成するかを学びます。
