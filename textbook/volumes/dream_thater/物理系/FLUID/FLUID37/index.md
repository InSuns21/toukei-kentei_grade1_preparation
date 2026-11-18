# FLUID37 乱流をどんな統計量で定義するか

[FLUID36 の平行剪断流の線形擾乱](../FLUID36/index.md#def-fluid36-mode)では、特定の波数と増幅率を調べた。しかし速度が時空間で複雑に変動するとき、一本の流線や一つの正規モードだけでは、運動量がどの程度揺らぐか、離れた二点がどれほど似ているかを表せない。そこで**瞬時の速度から平均・変動・相関・波数別の分布を順に作り、その数学的な意味と限界を明らかにする**。

ここで「乱流」を単一の数式で厳密に必要十分判定できると主張しない。乱流は多数の空間・時間尺度、非線形相互作用、不規則性を示す流れであり、以下の統計量はその**記述手段**である。ランダムな合成信号が同じ統計量を持っても Navier–Stokes 方程式の乱流解とは限らない。

## 0. 観測量と平均の対象を固定する

位置 $\boldsymbol x\in\mathbb R^3$ [m]、時刻 $t\in\mathbb R$ [s]、実現を表す $\omega\in\Omega$ を用い、速度 $\boldsymbol u(\boldsymbol x,t,\omega)\in\mathbb R^3$ [m/s] を確率場とする。$\mathbb E$ は、[期待値](../../../解析系/F0/F0-00P2A/index.md#def-f0-00p2a-expectation)として**位置・時刻を固定して**実現 $\omega$ の分布について取る集合平均（ensemble mean）である。必要な各成分は可測、二乗可積分とし、確率的な二次量が有限になると仮定する。$\mathbb E$ が時間平均や空間平均を指すわけではない。

[非圧縮 Navier–Stokes 方程式](../../CTM/CTM15/index.md#thm-ctm15-incompressible-navier-stokes)の一定密度の速度を主な動機とするが、本講の平均恒等式は方程式を解かなくても成り立つ。速度場が発散ゼロかどうかも統計量の**定義**の必要条件ではない。成長率や流れの機構に関する[FLUID36 の擾乱エネルギー収支](../FLUID36/index.md#prop-fluid36-energy)と、以下の統計的分散は同じ対象を異なる問いで見るものである。

## 1. 瞬時値を平均と揺らぎに分ける

例えば流速を各時刻に測った列 $(1,3,1,3,\ldots)$ [m/s] は平均 $2$ m/s だが、瞬時値は常に平均から $1$ m/s 離れる。この違いを数式化するのが Reynolds 分解である。ここで速度の $u'$ のプライムは時間・空間微分ではなく、集合平均からの**変動**を表す。

<a id="def-fluid37-reynolds-decomposition"></a>

<!-- formal-statement-start -->
> **定義（集合平均・Reynolds 分解・乱流運動エネルギー）**  
> $\mathbb E|\boldsymbol u(\boldsymbol x,t,\cdot)|^2<\infty$ のとき、固定した $(\boldsymbol x,t)$ での平均速度 $\overline{\boldsymbol u}$、速度変動 $\boldsymbol u'$、単位質量当たりの変動運動エネルギー $k$ を次で定める。

$$
\overline{\boldsymbol u}=\mathbb E\boldsymbol u,\qquad
\boldsymbol u'=\boldsymbol u-\overline{\boldsymbol u},\qquad
k=\frac12\mathbb E|\boldsymbol u'|^2.
$$

> $k$ の単位は m$^2$/s$^2$、単位体積当たりのエネルギーは一定密度 $\rho>0$ の場合 $\rho k$ [J/m$^3$] である。上線はこの集合平均に限る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid37-reynolds-decomposition -->
**定義の確認**：$u=1$ m/s と $u=3$ m/s をそれぞれ確率 $1/2$ でとる一次元速度なら、$\overline u=(1+3)/2=2$ m/s、$u'=-1,1$ m/s、$\mathbb E u'=0$、$\mathbb E(u')^2=1$ m$^2$/s$^2$、$k=1/2$ m$^2$/s$^2$ である。$\overline u^2=4$ と変動の二乗平均 $1$ は異なる。
<!-- definition-example-end -->

平均を取ってよいのは、期待値の線形性と有限性を確認できるときである。平均の二乗と二乗の平均を混同してはいけない。

<a id="prop-fluid37-mean-variance"></a>

<!-- formal-statement-start -->
> **命題（Reynolds 分解の直交性とエネルギー分解）**  
> 固定した $(\boldsymbol x,t)$ で $\boldsymbol u$ が二乗可積分なら、$\mathbb E\boldsymbol u'=\boldsymbol0$ であり、

$$
\mathbb E|\boldsymbol u|^2
=|\overline{\boldsymbol u}|^2+\mathbb E|\boldsymbol u'|^2
=|\overline{\boldsymbol u}|^2+2k.
$$
<!-- formal-statement-end -->

### 証明の見取り図

平均を取ると変動部分は消える。二乗を展開した交差項は、平均速度が実現 $\omega$ に依存しないためゼロになる。

<!-- proof-start -->
### 証明

定義から $\mathbb E\boldsymbol u'=\mathbb E\boldsymbol u-\overline{\boldsymbol u}=\boldsymbol0$。$\boldsymbol u=\overline{\boldsymbol u}+\boldsymbol u'$ を展開して

$$
|\boldsymbol u|^2=|\overline{\boldsymbol u}|^2
+2\overline{\boldsymbol u}\cdot\boldsymbol u'
+|\boldsymbol u'|^2.
$$

両辺に期待値を取ると、$\overline{\boldsymbol u}$ は $(\boldsymbol x,t)$ にだけ依存する定数ベクトルなので、交差項は $2\overline{\boldsymbol u}\cdot\mathbb E\boldsymbol u'=0$。二乗可積分性から交差項も可積分である。よって等式を得る。
<!-- proof-end -->

## 2. 一点の分散から二点の相関へ

分散 $\mathbb E(u_i')^2$ が同じでも、隣り合う点で揺らぎが同じ向きか、互いに打ち消すかは分からない。そこで二つの速度変動を掛け、実現について平均する。添字 $i,j\in\{1,2,3\}$ は速度の成分を指す。

<a id="def-fluid37-two-point-covariance"></a>

<!-- formal-statement-start -->
> **定義（二点共分散テンソルと相関係数）**  
> 二次モーメントが有限な速度確率場に対して、二点の[共分散](../../../解析系/F0/F0-00P3/index.md#def-f0-00p3-covariance-uncorrelated)を

$$
R_{ij}(\boldsymbol x,\boldsymbol y;t,s)
=\mathbb E\left[u_i'(\boldsymbol x,t)\,u_j'(\boldsymbol y,s)\right]
$$

> と定める。単位は m$^2$/s$^2$ である。両点での分散 $\sigma_i^2=R_{ii}(\boldsymbol x,\boldsymbol x;t,t)$、$\sigma_j^2=R_{jj}(\boldsymbol y,\boldsymbol y;s,s)$ がともに正なら、無次元の相関係数を $C_{ij}=R_{ij}/(\sigma_i\sigma_j)$ と定める。分散がゼロのときこの正規化は定義しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid37-two-point-covariance -->
**定義の確認**：同じ速度成分を二点で測る一次元の場合を考える。確率 $1/2$ ずつの符号 $Z=\pm1$ を用いて、その成分の変動を $v'(x)=2Z$、$v'(y)=-3Z$ [m/s] とする。両平均はゼロ、分散は $4,9$、共分散は $\mathbb E[(2Z)(-3Z)]=-6$ [m$^2$/s$^2$]。従って $C=-6/(2\cdot3)=-1$。二点は常に逆向きに変動する。
<!-- definition-example-end -->

<a id="prop-fluid37-covariance-bound"></a>

<!-- formal-statement-start -->
> **命題（相関の対称性・限界）**  
> 二乗可積分な実数の二変動 $X',Y'$ に対し、$\mathbb E[X'Y']=\mathbb E[Y'X']$ であり、

$$
|\mathbb E[X'Y']|^2
\le\mathbb E(X')^2\,\mathbb E(Y')^2.
$$

> よって両分散が正なら $|C|\le1$。一方、異なる位置の二点共分散を交換するときは、位置と成分の添字を**ともに**交換する。
<!-- formal-statement-end -->

### 証明の見取り図

係数 $\lambda$ に対して $\mathbb E(X'-\lambda Y')^2\ge0$ を使う。これは特定の流体方程式に依存しない。

<!-- proof-start -->
### 証明

$V_Y=\mathbb E(Y')^2>0$ とする。任意の実数 $\lambda$ に対して

$$
0\le\mathbb E(X'-\lambda Y')^2
=\mathbb E(X')^2-2\lambda\mathbb E[X'Y']+\lambda^2V_Y.
$$

$\lambda=\mathbb E[X'Y']/V_Y$ を代入して

$$
0\le\mathbb E(X')^2-\frac{(\mathbb E[X'Y'])^2}{V_Y}.
$$

両辺に $V_Y>0$ を掛ければ主張を得る。$V_Y=0$ なら $Y'=0$ がほとんど確実に成り立つので共分散もゼロである。積の可換性は $R_{ij}(\boldsymbol x,\boldsymbol y;t,s)=R_{ji}(\boldsymbol y,\boldsymbol x;s,t)$ を意味するが、同じ位置順のまま添字だけを交換する主張ではない。
<!-- proof-end -->

この不等式により、実際の測定で $|C|>1$ が出れば、正規化、データの整列、欠損処理などを見直す必要がある。相関長の具体的定義には複数あるので、$C$ が小さくなる距離を単独で普遍的な「渦の大きさ」と同一視しない。

## 3. 定常・一様・等方は三つの異なる対称性

「どこで測っても同じ」「いつ測っても同じ」「向きを変えても同じ」は別の条件である。**統計的定常性**は時刻の平行移動、**統計的一様性**は位置の平行移動、**等方性**は空間方向の回転に対する分布の不変性を意味する。ここでは各有限個の時空間点での同時分布が不変という強い意味で定義する。この条件なら平均・共分散についての対応する不変性も従うが、逆は一般に言えない。回転行列の集合 $SO(3)$ は $Q^{\mathsf T}Q=I$、$\det Q=1$ を満たす実 $3\times3$ 行列の集合である。回転後の速度成分は $(Q\boldsymbol u)_i=\sum_{j=1}^3Q_{ij}u_j$ となる。

<a id="def-fluid37-statistical-symmetries"></a>

<!-- formal-statement-start -->
> **定義（統計的定常性・一様性・等方性）**  
> $\mathbb R^3$ 上の速度確率場 $\boldsymbol u$ について、全ての有限個の点と時刻での同時分布が、時刻を共通に $\tau$ だけずらしても不変なら**統計的定常**、位置を共通に $\boldsymbol a$ だけずらしても不変なら**統計的一様**という。さらに、各回転 $Q\in SO(3)$ に対して $\boldsymbol u(Q\boldsymbol x,t)$ と $Q\boldsymbol u(\boldsymbol x,t)$ の有限次元同時分布が一致するとき**等方的**という。等方性の定義では原点を固定する。並進不変性とは別である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid37-statistical-symmetries -->
**定義の確認**：$Z=\pm1$ が等確率、$\boldsymbol u(\boldsymbol x,t)=(0,Z,0)$ [m/s] で全空間・全時刻に同じ $Z$ を用いる場は、時間・空間をずらしても全ての同時分布が変わらず、定常かつ一様である。一方、$90^\circ$ の軸回転で $(0,Z,0)$ は別の座標軸へ移るので、速度の分布は一般に回転不変でなく等方的ではない。またこの場は発散ゼロであっても、時間的に揺れ続ける乱流ではない。

**三条件が成立する直接例**：単位球面 $S^2=\{\boldsymbol n\in\mathbb R^3:|\boldsymbol n|=1\}$ 上の面積を確率 $1$ に正規化した分布から方向 $\boldsymbol N$ を選び、定数 $a>0$ に対して $\boldsymbol u(\boldsymbol x,t)=a\boldsymbol N$ とする。

全点・全時刻に同じ $\boldsymbol N$ を用いるから、時間・空間の平行移動は全ての同時分布を変えない。球面の面積分布は回転で不変なので、任意の $Q\in SO(3)$ に対して $\boldsymbol N$ と $Q\boldsymbol N$ は同分布であり、速度は等方性の定義も満たす。

二軸の符号反転（座標軸まわりの半回転）と座標の交換を適切な回転で実現できる。この回転不変性を各成分に適用すると

$$
\mathbb EN_i=0,\qquad
\mathbb E[N_iN_j]=0\ (i\ne j),\qquad
\mathbb EN_1^2=\mathbb EN_2^2=\mathbb EN_3^2
$$

が従う。さらに $\sum_{i=1}^3N_i^2=1$ なので、次を得る（$\delta_{ij}$ は $i=j$ のとき $1$、それ以外では $0$ の Kronecker 記号）。

$$
\mathbb E[N_i^2]=\frac13,\qquad
\mathbb E[u_i'u_j']=\frac{a^2}{3}\delta_{ij},\qquad
k=\frac{a^2}{2}.
$$

この場も各実現で時間的に一定であり、**等方性は乱流であることも時間エルゴード性も保証しない**。
<!-- definition-example-end -->

時間定常なら $R_{ij}(\boldsymbol x,\boldsymbol y;t,s)$ は時間差 $s-t$ の関数になり、空間一様なら位置差 $\boldsymbol r=\boldsymbol y-\boldsymbol x$ の関数になる。一方の条件だけでは他方を結論できない。

<a id="prop-fluid37-isotropic-covariance"></a>

<!-- formal-statement-start -->
> **命題（等方な一様場の一点共分散）**  
> 有限二次モーメントを持つ一様・等方な三次元速度確率場について、固定した時刻で

$$
R_{ij}(\boldsymbol x,\boldsymbol x;t,t)=q^2\delta_{ij},
\qquad
k=\frac32q^2
$$

> を満たす $q^2\ge0$ が存在する。$\delta_{ij}$ は $i=j$ なら $1$、異なるなら $0$ の Kronecker 記号である。定常性はこの結論には不要である。
<!-- formal-statement-end -->

### 証明の見取り図

位置差ゼロの共分散行列は対称で、回転に対して不変である。座標軸の半回転で非対角成分が消え、軸を交換する回転で対角成分が等しくなる。

<!-- proof-start -->
### 証明

一点共分散の各成分を、標準直交基底 $\boldsymbol e_i$ による速度変動の座標 $u_i'=\boldsymbol e_i\cdot\boldsymbol u'$ を使って

$$
A_{ij}=\mathbb E[u_i'u_j']
=\mathbb E[(\boldsymbol e_i\cdot\boldsymbol u')
           (\boldsymbol e_j\cdot\boldsymbol u')]
$$
と並べたものが共分散行列 $A$ である。一様性から $A$ は位置に依存しない。等方性では $\boldsymbol u(Q\boldsymbol x,t)$ と $Q\boldsymbol u(\boldsymbol x,t)$ が同分布なので、平均を引いた速度変動についても同じ関係が成り立つ。回転後の共分散成分は

$$
\begin{aligned}
\mathbb E[(Q\boldsymbol u')_i(Q\boldsymbol u')_j]
&=\sum_{a,b=1}^3Q_{ia}Q_{jb}\mathbb E[u_a'u_b']\\
&=(QAQ^{\mathsf T})_{ij}.
\end{aligned}
$$

左辺は等方性と一様性によって $A_{ij}$ に等しい。従って任意の $Q\in SO(3)$ について $QAQ^{\mathsf T}=A$ となる。$A_{ij}=A_{ji}$ は実数の積の可換性から従う。

例えば $Q_1=\operatorname{diag}(1,-1,-1)$ は第一軸まわりの半回転であり、$Q_1AQ_1^{\mathsf T}=A$ の $(1,2),(1,3)$ 成分から $A_{12}=-A_{12}$、$A_{13}=-A_{13}$ を得る。第二軸まわりの半回転で $A_{23}=0$ も得る。ゆえに $A$ は対角。第三軸まわりの直角回転は第一・第二軸を交換するので $A_{11}=A_{22}$。第一軸まわりの直角回転で $A_{22}=A_{33}$。共通値を $q^2$ とすると $q^2=\mathbb E(u_1')^2\ge0$。従って $A=q^2I$ である。定義の $k=\frac12\mathbb E|\boldsymbol u'|^2$ に $|\boldsymbol u'|^2=\sum_{i=1}^3(u_i')^2$ を代入すれば

$$
k=\frac12\sum_{i=1}^3A_{ii}
=\frac12\operatorname{tr}A
=\frac32q^2
$$
を得る。
<!-- proof-end -->

**非同値性の確認**：時間に依らず空間位置だけで変わる速度場は定常でも一様とは限らない。上の $Z$ の場は定常・一様でも等方でない。特定の平均や共分散が一様だからといって、全ての高次統計量まで一様と判定してはいけない。

## 4. 一つの時系列から集合平均を推定できるか

集合平均は多数の実現に関する量だが、観測では一本の時間記録しか得られない場合が多い。時間平均を集合平均の代わりにしてよいかは、**定常性とは別の仮定**である。

<a id="def-fluid37-ergodicity"></a>

<!-- formal-statement-start -->
> **定義（時間エルゴード性と平均の一致）**  
> 固定位置での[確率過程](../../../解析系/STO/STO1/index.md#def-sto1-stochastic-process) $X(t)$ が厳密定常であるとする。[エルゴード性の定義](../../../解析系/TSA/TSA5/index.md#def-tsa5-ergodicity)の連続時間版として、経路を時刻 $s$ だけ平行移動する操作を $(\theta_sX)(t)=X(t+s)$ と書く。この過程が時間エルゴード的であるとは、経路に依存する**全ての可積分な観測量** $F$ について、時間平均が存在し、

$$
\lim_{T\to\infty}\frac1T\int_0^T F(\theta_sX)\,ds
=\mathbb E[F(X)]
$$

> がほとんど確実に成り立つことをいう。特に $F(X)=f(X(0))$ を代入すれば、$\frac1T\int_0^T f(X(s))\,ds\to\mathbb E f(X(0))$ が従う。ただし**一点の平均の一致だけでは一般の経路観測量までのエルゴード性は証明できない**。無限時間の極限についての条件であり、有限観測時間での一致や、位置平均との一致を意味しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid37-ergodicity -->
**定義の確認**（反例）：$Z=\pm1$ を等確率とし、$X(t,\omega)=Z(\omega)$ とする。この過程は全ての時刻で同時分布が不変だから厳密定常だが、$f(z)=z$ について時間平均は常に $Z$、集合平均は $\mathbb E Z=0$。各実現では $Z\ne0$ なので、エルゴード性は破れる。失われているのは「一つの軌道が実現間の違いを時間発展で巡る」という機構であり、定常性そのものではない。

**成立する直接例**：$\Phi$ を $[0,2\pi)$ の一様位相、$\omega_0>0$ を固定した角周波数 [rad/s] とし、$X(t)=\cos(\omega_0t+\Phi)$ と置く。時間を $s$ だけずらすと位相が $\omega_0s$ だけ進み、位相の一様分布は変わらないので厳密定常である。任意の可積分な経路観測量 $F$ に対し、$X_\phi(t)=\cos(\omega_0t+\phi)$、$g(\phi)=F(X_\phi)$ と書けば、$g$ は可積分な $2\pi$ 周期関数である。周期 $P=2\pi/\omega_0$ と任意の正整数 $m$ について

$$
\begin{aligned}
\frac1{mP}\int_0^{mP}F(\theta_sX_\Phi)\,ds
&=\frac1{mP}\int_0^{mP}g(\Phi+\omega_0s)\,ds\\
&=\frac1{2\pi}\int_0^{2\pi}g(\phi)\,d\phi
=\mathbb E[F(X)].
\end{aligned}
$$

一般の $T\to\infty$ でも、端数の時間区間は長さ $P$ 未満で、その積分は各実現について一周期の $|g|$ の積分で抑えられる。$T$ で割れば端数の寄与はゼロへ行く。このように**全ての可積分な $F$** に対して定義の極限を確認できるから時間エルゴード的である。一つの観測量だけの平均が一致したことを根拠にしているのではない。
<!-- definition-example-end -->

反対に、ランダム位相を持つ周期波は平均について時間平均が合う例を作れるが、それだけでは**すべての観測関数**についてエルゴード性を示したことにならない。時間的定常性、標本の長さ、標本間の相関を区別する必要がある。

## 5. 相関の距離依存を波数ごとに調べる

二点相関 $R(r)$ を変位 $r$ の関数として眺めると、周期的な構造や長距離の相関を読み取れる。この関数の波数ごとの構造を表すには、Fourier モードの非負の二乗振幅に分ければよい。

ここでは正規化が追えるよう、まず長さ $L>0$ の一次元周期区間で**有限個のモード**だけを持つ実速度変動 $v(x,\omega)$ [m/s] を扱う。$v$ は集合平均ゼロ、二乗可積分で、空間に関して統計的一様と仮定する。時間は固定している。

ここで $x$ は一次元の空間座標、$r$ は同じ時刻での二点間の符号付き変位であり、時間のずれではない。$v$ は速度変動の一成分を取り出した実数値場である。集合平均 $\mathbb Ev(x)=0$ と、各実現での空間平均

$$
\frac1L\int_0^L v(x,\omega)\,dx
$$

は別の量である。

波数 $k_n=2\pi n/L$ [rad/m]、整数 $n$ とすると、$v$ の Fourier 係数 $a_n$ は空間積分で定まり、$v(x)=\sum_n a_ne^{ik_nx}$ と再構成できる。添字付きの $k_n$ は波数であり、第1節の変動運動エネルギー $k$ [m$^2$/s$^2$] とは次元も意味も違う。複素係数は計算上の表現であり、現実の速度は実数だから $a_{-n}=\overline{a_n}$ が必要である。

<a id="def-fluid37-periodic-spectrum"></a>

<!-- formal-statement-start -->
> **定義（周期場の Fourier スペクトル）**  
> 長さ $L$ の実数値有限 Fourier 場 $v(x,\omega)$ に対し、係数と二側スペクトルを

$$
a_n=\frac1L\int_0^L v(x)e^{-ik_nx}\,dx,
\qquad
S_n=\mathbb E|a_n|^2\ge0,\quad k_n=\frac{2\pi n}{L}
$$

> と定義する。$a_n$ は m/s、$S_n$ は m$^2$/s$^2$ の単位を持つ。正負の波数を同時に数える二側表示である。$n\ge1$ の一側表示は $\mathcal E_n=S_n+S_{-n}=2S_n$、ゼロモードは $\mathcal E_0=S_0$ と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid37-periodic-spectrum -->
**定義の確認**：$v(x,\Phi)=A\cos(k_1x+\Phi)$、$A>0$ [m/s]、$\Phi$ は $[0,2\pi)$ 上で一様とする。余弦の指数表示 $2\cos\theta=e^{i\theta}+e^{-i\theta}$ から、係数積分は

$$
a_1=\frac A2e^{i\Phi},\qquad
a_{-1}=\frac A2e^{-i\Phi},\qquad
a_n=0\quad(n\ne\pm1).
$$

位相を一様分布で平均すると、$\mathbb Ev(x)=0$ である。二点積は $\cos\alpha\cos\beta=\{\cos(\alpha-\beta)+\cos(\alpha+\beta)\}/2$ を使って

$$
\begin{aligned}
R(r)&=\frac{A^2}{2\pi}\int_0^{2\pi}
\cos(k_1(x+r)+\phi)\cos(k_1x+\phi)\,d\phi\\
&=\frac{A^2}{4\pi}\int_0^{2\pi}
\{\cos(k_1r)+\cos(2k_1x+k_1r+2\phi)\}\,d\phi\\
&=\frac{A^2}{2}\cos(k_1r).
\end{aligned}
$$

従って $S_{\pm1}=A^2/4$、一側では $\mathcal E_1=S_1+S_{-1}=A^2/2=R(0)$。速度振幅 $A$ が m/s なら、スペクトルと相関はともに m$^2$/s$^2$ である。
<!-- definition-example-end -->

なぜ相関とスペクトルを結び付けられるのか。離散的な直交性

$$
\frac1L\int_0^L e^{i(k_n-k_m)x}\,dx
=\begin{cases}1&n=m,\\0&n\ne m\end{cases}
$$

を使えば、異なる波数が積分で消える。一様性があるため $R(r)=\mathbb E[v(x+r)v(x)]$ は $x$ に依存せず、空間積分で同じ値を計算できる。

<a id="thm-fluid37-parseval-correlation"></a>

<!-- formal-statement-start -->
> **定理（周期場の相関とスペクトル・Parseval 関係）**  
> $L$ 周期の実値確率場 $v(x,\omega)$ は、有限個の Fourier モードからなり、二次モーメントが有限で、集合平均ゼロかつ空間的に統計的一様とする。$R(r)=\mathbb E[v(x+r)v(x)]$、$S_n=\mathbb E|a_n|^2$ とすると

$$
R(r)=\sum_nS_ne^{ik_nr}
=S_0+2\sum_{n\ge1}S_n\cos(k_nr),
\qquad
R(0)=\mathbb E v(x)^2=\sum_nS_n.
$$

> 右辺での和は非零モードに限る。したがって変動運動エネルギーは一次元成分について $\frac12\sum_nS_n$ である。三次元の $k=\frac12\sum_{i=1}^3\mathbb E(u_i')^2$ と区別する。
<!-- formal-statement-end -->

### 証明の見取り図

二点積をまず空間積分し、Fourier 展開の直交性で同じ波数だけを残す。有限和なので積分・期待値との順序交換に無限級数の議論を要しない。

<!-- proof-start -->
### 証明

任意の実現で $v(x+r)=\sum_na_ne^{ik_n(x+r)}$ と書ける。実値性から $v(x)=\overline{v(x)}=\sum_m\overline{a_m}e^{-ik_mx}$。これらの積を空間平均し、直交性を使うと

$$
\begin{aligned}
\frac1L\int_0^L v(x+r)v(x)\,dx
&=\sum_{n,m}a_n\overline{a_m}e^{ik_nr}
 \frac1L\int_0^Le^{i(k_n-k_m)x}\,dx\\
&=\sum_n|a_n|^2e^{ik_nr}.
\end{aligned}
$$

有限和と有限二次モーメントにより期待値を取ってよい。統計的一様性から被積分量の期待値は位置 $x$ に依存せず $R(r)$ なので、左辺の期待値は $R(r)$。右辺の期待値は $\sum_nS_ne^{ik_nr}$ である。実値性より $S_{-n}=S_n$ だから正負の項を合わせれば余弦表示となる。$r=0$ と置けば $R(0)=\sum_nS_n$。同時に $R(0)=\mathbb E[v(x)^2]$ であることから主張が従う。
<!-- proof-end -->

ここでのスペクトル $S_n$ は**離散波数ごとのエネルギー寄与**であり、連続波数に関する単位波数幅当たりのエネルギー量 $E(k)$ [m$^3$/s$^2$] とは単位が異なる。連続極限では $\int E(k)\,dk$ のように波数幅も積分する必要がある。三次元等方場の球殻スペクトルはさらに幾何学的重みが必要で、一次元の $S_n$ と同一視しない。

有限和の仮定を外すなら、十分な二乗平均収束などを用いて積分・極限交換を正当化する必要がある。観測した有限データの離散 Fourier 変換は、この有限和の**近似**を数値的に確かめる道具である。

## 6. 合成速度場で検算する

このラボは $L=2\pi$ m、$U=1.5$ m/s、$N=128$ の周期格子で

$$
u(x)=U+\sum_{n=1}^{M}\frac{1\ {\rm m/s}}{n}\cos(nx/(1\ {\rm m})+\Phi_n)
$$

を生成する。独立な一様位相 $\Phi_n$ を擬似乱数で固定し、格子上の空間平均・二点相関と離散 Fourier 係数を**同じ Python ファイル**で計算する。理論上 $\mathbb E(u-U)^2=\frac12\sum_{n=1}^Mn^{-2}$ [m$^2$/s$^2$]。この例は数学的な合成場であり、Navier–Stokes の時間積分結果、測定データ、エルゴード性の証明ではない。

```python-file-lab
# lab-id: FLUID37-SYNTHETIC-CORRELATION-SPECTRUM
# lab-title: 合成周期速度場の平均・相関・スペクトル
# lab-file: textbook/volumes/dream_thater/物理系/FLUID/FLUID37/synthetic_turbulence_lab.py
# timeout-ms: 30000
# lab-preset: 3モード | --modes 3 --phase-init 37
# lab-preset: 6モード | --modes 6 --phase-init 37
# lab-preset: 12モード | --modes 12 --phase-init 37
# lab-preset: 位相だけ変更 | --modes 6 --phase-init 137
```

速度・相関の曲線は直接同じ格子で計算した値、波数スペクトルは同じ速度データから求めた Fourier 係数である。$M$ を増やすと細かな波数成分が増え、擬似乱数の初期値の変更では瞬時速度の見た目が変わる一方、指定振幅のもとでは理論上の空間平均相関・エネルギー和は変わらない。有限格子の計算誤差と、連続場の定理の区別も確認する。

## 7. 演習：統計量を自分で計算する

### Level A

#### A1. 平均と変動の二乗
- Level: A

一次元速度 $U$ が確率 $1/4,3/4$ でそれぞれ $0,4$ [m/s] をとる。平均、分散、$\mathbb EU^2$、単位質量当たりの変動エネルギーを計算せよ。

<!-- solution-start -->
#### 詳細解答

$\overline U=0\cdot\frac14+4\cdot\frac34=3$ m/s。変動は $-3$（確率 $1/4$）、$1$（確率 $3/4$）だから、

$$
\mathbb E(U-\overline U)^2=9/4+3/4=3\ {\rm m^2/s^2}.
$$

また $\mathbb EU^2=0+16\cdot3/4=12$ m$^2$/s$^2$。実際、[Reynolds 分解のエネルギー命題](#prop-fluid37-mean-variance)を一次元速度 $U$ に適用すれば $\overline U^2+\operatorname{Var}U=9+3=12$。$k=\operatorname{Var}U/2=1.5$ m$^2$/s$^2$。
<!-- solution-end -->

#### A2. 相関係数とゼロ分散
- Level: A

$Z=\pm1$ が等確率とし、$X=Z$、$Y=2Z$、$W=5$ とする。$C_{XY}$ を計算し、$C_{XW}$ がなぜ未定義か説明せよ。

<!-- solution-start -->
#### 詳細解答

$\mathbb EX=\mathbb EY=0$、$\operatorname{Var}X=1$、$\operatorname{Var}Y=4$、$\mathbb E(XY)=\mathbb E(2Z^2)=2$。[二点共分散と相関係数の定義](#def-fluid37-two-point-covariance)に従って $C_{XY}=2/(1\cdot2)=1$。一方 $W-\mathbb EW=0$ が常に成り立ち $\operatorname{Var}W=0$ なので、正規化の分母 $\sigma_X\sigma_W=0$。共分散そのものはゼロでも相関係数は定義されない。
<!-- solution-end -->

#### A3. 定常とエルゴード性の区別
- Level: A

$Z=\pm2$ が等確率、$X(t)=Z$ とする。$X(t)$ が統計的定常かを判定し、時間平均と集合平均を計算してエルゴード性を判定せよ。

<!-- solution-start -->
#### 詳細解答

任意の $(t_1,\ldots,t_m)$ で $(X(t_1),\ldots,X(t_m))=(Z,\ldots,Z)$ だから、共通時間シフトで同時分布は変化せず定常。一方、任意の $T>0$ で $T^{-1}\int_0^T X(t)dt=Z$、$\mathbb EX(t)=\mathbb EZ=(-2+2)/2=0$。確率1で $Z\ne0$ なので、観測関数 $f(z)=z$ だけですでに[時間エルゴード性の定義](#def-fluid37-ergodicity)に違反する。
<!-- solution-end -->

#### A4. 単一モードの Fourier 係数
- Level: A

$L=2\pi$ m、$v(x)=4\cos(2x/(1\ {\rm m})+\phi)$ [m/s]（$\phi$ は定数）について $a_{\pm2}$ と $S_{\pm2}=|a_{\pm2}|^2$ を求め、Parseval の和と空間二乗平均を照合せよ。

<!-- solution-start -->
#### 詳細解答

$4\cos\theta=2e^{i\theta}+2e^{-i\theta}$ だから、$a_2=2e^{i\phi}$ m/s、$a_{-2}=2e^{-i\phi}$ m/s。よって $S_2=S_{-2}=4$ m$^2$/s$^2$、他はゼロ。和は $8$。直接積分して

$$
\frac1{2\pi}\int_0^{2\pi}16\cos^2(2x+\phi)\,dx
=\frac{16}{2\pi}\int_0^{2\pi}\frac{1+\cos(4x+2\phi)}2\,dx=8,
$$

となる（積分中の $x$ はメートル単位の数値座標）。この決定的な波も周期平均に Parseval を適用できるが、単独の決定的な位相では位置についての統計的一様性を自動的に満たさない。
<!-- solution-end -->

#### A5. スペクトルの片側化
- Level: A

実周期場の二側スペクトルで $S_0=1$、$S_1=S_{-1}=2$、$S_2=S_{-2}=3$、ほかはゼロ（単位 m$^2$/s$^2$）とする。一側の各値と全二乗平均を求めよ。

<!-- solution-start -->
#### 詳細解答

[一側スペクトルの定義](#def-fluid37-periodic-spectrum)ではゼロモードは重複しないから $\mathcal E_0=S_0=1$。正波数について $\mathcal E_1=2S_1=4$、$\mathcal E_2=2S_2=6$。全体は $1+4+6=11$ m$^2$/s$^2$ で、二側で直接足した $1+2+2+3+3=11$ と一致する。
<!-- solution-end -->

### Level B

#### B1. 二点相関と正規化
- Level: B

$\Phi$ が $[0,2\pi)$ 一様、$v(x,\Phi)=A\cos(kx+\Phi)$ とする（$A>0$、$k>0$）。集合平均、$R(r)$、$C(r)$ を積分から導き、$r=\pi/(2k)$ の意味を説明せよ。

<!-- solution-start -->
#### 詳細解答

位相積分で $\mathbb Ev(x)=\frac A{2\pi}\int_0^{2\pi}\cos(kx+\phi)d\phi=0$。積和公式より

$$
\begin{aligned}
R(r)&=\frac{A^2}{2\pi}\int_0^{2\pi}
\cos(k(x+r)+\phi)\cos(kx+\phi)\,d\phi\\
&=\frac{A^2}{4\pi}\int_0^{2\pi}
\{\cos(kr)+\cos(2kx+kr+2\phi)\}\,d\phi\\
&=\frac{A^2}2\cos(kr).
\end{aligned}
$$

$R(0)=A^2/2>0$ だから $C(r)=R(r)/R(0)=\cos(kr)$。$r=\pi/(2k)$ では $v(x)=A\cos(kx+\Phi)$ と $v(x+r)=-A\sin(kx+\Phi)$ となり、相関はゼロだが

$$
\left(\frac{v(x)}A\right)^2
+\left(\frac{v(x+r)}A\right)^2=1
$$
が常に成立する。二つの値はこの関係に拘束されており、独立ではない。[無相関と独立の違い](../../../解析系/F0/F0-00P3/index.md#def-f0-00p3-covariance-uncorrelated)を確かめる例である。
<!-- solution-end -->

#### B2. 一様と等方の違い
- Level: B

$Z=\pm1$ が等確率で、$\boldsymbol u(\boldsymbol x,t)=(0,aZ,0)$ ($a>0$) とする。定常・一様・等方性を判定し、一点共分散行列と $k$ を求め、等方性の命題を誤用すると何が起きるか説明せよ。

<!-- solution-start -->
#### 詳細解答

全点・全時刻に同じ $Z$ を使うため、時間・空間の平行移動で有限次元同時分布は不変で、定常かつ一様。一方、$z$ 軸まわりに直角回転すると値の支持が $y$ 軸から $x$ 軸へ移るので等方でない。平均はゼロ、共分散は

$$
A=\mathbb E[\boldsymbol u\boldsymbol u^{\mathsf T}]
=\begin{pmatrix}0&0&0\\0&a^2&0\\0&0&0\end{pmatrix},
\qquad k=\frac12\operatorname{tr}A=\frac{a^2}2.
$$

[等方な一点共分散の命題](#prop-fluid37-isotropic-covariance)を等方性なしに誤用すれば $A=q^2I$ として三方向に同じ分散を割り当ててしまう。欠けた仮定は回転不変性であり、証明で軸の交換を使う段階が成立しない。
<!-- solution-end -->

#### B3. 定理の適用条件を外す
- Level: B

定常でない $v(x,t)=A(t)\cos(kx+\Phi)$（$\Phi$ は一様位相）について、固定時刻での二点相関とスペクトルを求めよ。時間定常性が欠けても相関・Parseval の関係が成り立つ理由を述べよ。$A(t)$ は決定的実関数とする。

<!-- solution-start -->
#### 詳細解答

任意の時刻 $t$ を固定すると、二つの余弦の積を和に展開して位相を積分すると、平均と共分散は

$$
\mathbb Ev(x,t)=0,\qquad
R(r,t)=\frac{A(t)^2}{2}\cos(kr)
$$

となる。基本波数を $k$ とする周期区間で Fourier 展開すれば、非零の係数は $a_{\pm1}(t)=A(t)e^{\pm i\Phi}/2$ のみである。従って Parseval の両辺を具体的に比較すると

$$
S_{\pm1}(t)=\frac{A(t)^2}{4},
\qquad
S_1(t)+S_{-1}(t)=\frac{A(t)^2}{2}=R(0,t).
$$

位相の一様性による空間一様性は各時刻で保持される。一方、$A(t)^2$ が変化すれば、一般に同時分布は時間平行移動に対して不変でない。[相関と Parseval の定理](#thm-fluid37-parseval-correlation)は固定時刻の空間的一様性と有限 Fourier モードだけを仮定し、時間的定常性を使っていない。
<!-- solution-end -->

#### B4. 波数間の直交性を確認する
- Level: B

$L=2\pi$、$v(x)=a\cos x+b\cos2x$ ($a,b$ は実定数) とする。空間二乗平均を直接積分で求め、Fourier 係数からの結果と比べよ。

<!-- solution-start -->
#### 詳細解答

$$
\begin{aligned}
\frac1{2\pi}\int_0^{2\pi}v(x)^2dx
&=\frac1{2\pi}\int_0^{2\pi}
(a^2\cos^2x+2ab\cos x\cos2x+b^2\cos^22x)dx\\
&=\frac{a^2}2+\frac{b^2}2,
\end{aligned}
$$

ここで $\cos x\cos2x=[\cos x+\cos3x]/2$ の周期積分はゼロ、各余弦二乗の積分平均は $1/2$。一方、$a_{\pm1}=a/2$、$a_{\pm2}=b/2$ だから、Fourier 係数の二乗和は $2(a^2/4)+2(b^2/4)=(a^2+b^2)/2$。一致は波数の直交性による。
<!-- solution-end -->

### Level C

#### C1. 二つの位相モードから統計量を完成させる
- Level: C

$L=2\pi$ m、$\Phi_1,\Phi_2$ は独立に $[0,2\pi)$ 一様とし、$v(x)=2\cos(x/(1\ {\rm m})+\Phi_1)+\cos(2x/(1\ {\rm m})+\Phi_2)$ [m/s] とする。(i) 平均・共分散 $R(r)$ を位相積分から求め、(ii) 二側・一側スペクトルと Parseval を確かめ、(iii) $r=\pi/2$ m における相関係数を求め、(iv) この合成場が実乱流を示したとはいえない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

(i) 各余弦は独立な一様位相の平均でゼロ。交差項は独立性から $\mathbb E[\cos(\cdot+\Phi_1)\cos(\cdot+\Phi_2)]=\mathbb E\cos(\cdot+\Phi_1)\,\mathbb E\cos(\cdot+\Phi_2)=0$。同じモード同士は $\cos\alpha\cos\beta=\{\cos(\alpha-\beta)+\cos(\alpha+\beta)\}/2$ で展開する。位相平均では第二項がゼロとなるので、

$$
R(r)=\frac{2^2}{2}\cos(r/(1\ {\rm m}))
+\frac{1^2}{2}\cos(2r/(1\ {\rm m}))
=2\cos(r/(1\ {\rm m}))+\tfrac12\cos(2r/(1\ {\rm m})).
$$

(ii) 指数表示から $a_{\pm1}=e^{\pm i\Phi_1}$、$a_{\pm2}=\frac12e^{\pm i\Phi_2}$ [m/s]。よって $S_{\pm1}=1$、$S_{\pm2}=1/4$、一側では $\mathcal E_1=2$、$\mathcal E_2=1/2$ [m$^2$/s$^2$]。[相関と Parseval の定理](#thm-fluid37-parseval-correlation)の二側和は $1+1+1/4+1/4=5/2=R(0)$。

(iii) $r=\pi/2$ m で $\cos(\pi/2)=0$、$\cos(\pi)=-1$ より $R(\pi/2)=-1/2$。分散は両点とも $R(0)=5/2$ なので、相関係数は $C=-\frac{1/2}{5/2}=-1/5$。

(iv) この場には指定した二つの Fourier モードしかなく、時間変化や非線形相互作用、散逸率、幅広い尺度のエネルギー移送を検証していない。位相の乱数化と実乱流の成立は別問題である。
<!-- solution-end -->

## 8. 何が分かり、何が未解決か

集合平均と時間平均を混同せず、一点分散だけでなく二点相関を調べることで、空間的に離れた変動の関係を測れる。さらに有限周期場の Parseval 関係は、**速度変動の二乗平均が波数別の非負の寄与へ分解できる**ことを保証する。ただしこの分解だけで、何が流れのエネルギーを作り、どう輸送し、どこで散逸するかは決まらない。

次の FLUID38 では、[非圧縮 Navier–Stokes 方程式](../../CTM/CTM15/index.md#thm-ctm15-incompressible-navier-stokes)に平均演算を施し、Reynolds 応力がなぜ未知量を増やすかを調べる。さらに FLUID39 では、波数間のエネルギー移送を考える。本講の合成場の図を、それらの非線形力学の証拠として使わない。
