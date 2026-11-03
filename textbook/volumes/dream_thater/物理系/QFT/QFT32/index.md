# QFT32 Poincaré粒子表現・質量とヘリシティ・Weyl／Majorana場

[QFT7のLorentzスピノル変換](../QFT7/index.md#def-qft7-spinor-transform)は、時空点ごとに置いた四成分場がどう混ざるかを教えてくれました。一方、[QFT8のフェルミオンFock空間](../QFT8/index.md#def-qft8-fermion-fock)では、その場が作る**一粒子状態**をHilbert空間のベクトルとして扱いました。場の成分の変換行列は一般にユニタリではないのに、粒子状態の対称変換は確率を保存するためユニタリでなければなりません。この二つは矛盾するのでしょうか。

粒子を特徴付ける質量とスピン、質量零粒子の**運動方向に沿ったスピン成分**が、**どの運動量を固定する変換が残るか**から現れることを計算します。その後、左・右Weyl成分、Dirac質量、場が自身の電荷共役と等しい条件の適用範囲を同じ視点から区別します。ここで扱うのは自由場・安定な漸近一粒子状態の対称性です。相互作用する理論の全状態が常に自由粒子へ分解できるとは仮定しません。

時空は $3+1$ 次元Minkowski空間、計量 $\eta=\operatorname{diag}(1,-1,-1,-1)$、$c=\hbar=1$ です。$p^2=(p^0)^2-|\boldsymbol p|^2$、$p\cdot x=p^0t-\boldsymbol p\cdot\boldsymbol x$ とします。Lorentz変換は連結成分 $SO^+(1,3)$、量子状態のスピンを記すときはその二重被覆を使います。以下の運動量のデルタ関数、平面波状態は波束に積分して解釈します。

## 1. 時空の移動と粒子状態の移動は一つの群を作る

Lorentz変換 $\Lambda$ は $p^2$ と正の時間方向を保ち、平行移動 $a\in\mathbb R^{1,3}$ は時空点を $x\mapsto x+a$ と動かします。両方を順に作用させると、後からの平行移動には先の座標変換が掛かるので、単純な直積にはなりません。

<a id="def-qft32-poincare"></a>

<!-- formal-statement-start -->
> **定義（Poincaré群とユニタリ粒子表現）**
> $a,b\in\mathbb R^{1,3}$、$\Lambda,M\in SO^+(1,3)$ とし、時空変換 $x\mapsto\Lambda x+a$ の組 $(a,\Lambda)$ に

$$
(a,\Lambda)(b,M)=(a+\Lambda b,\Lambda M)
$$

> という積を入れた群を（連結）Poincaré群と呼ぶ。量子系のHilbert空間 $\mathcal H$ 上で $U(g)$ がユニタリであり、$U(g_2g_1)=U(g_2)U(g_1)$ を満たすときユニタリ表現と呼ぶ。半整数スピンではLorentz部分を二重被覆へ持ち上げる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft32-poincare -->
### 例：平行移動とboostは順序を入れ替えられない

**定義の確認**：二つの組がともにPoincaré群の元であること、積の二成分と可換性の成否を調べます。

$\Lambda$ を $x^1$ 方向の速さ $v$ のboost、$b=(T,0,0,0)$、$a=0$ とします。$(0,\Lambda)(b,I)$ は平行移動 $\Lambda b=(\gamma T,\gamma vT,0,0)$ を持ちます（boostの向きはこの符号規約とします）。一方、$(b,I)(0,\Lambda)$ の平行移動は $(T,0,0,0)$ のままです。$vT\ne0$ なら異なります。積の第2成分はどちらも $\Lambda$ なので、非可換性の原因は第1成分だと直接確認できます。
<!-- definition-example-end -->

では、ユニタリ性を計算できる一番小さな模型を作ります。[SREL3の正エネルギー質量殻](../../SREL/SREL3/index.md#def-srel3-mass-shell)に従い $m\ge0$ とし、$E_{\boldsymbol p}=\sqrt{m^2+|\boldsymbol p|^2}$ と置きます。$m=0$ の原点は測度零として除きます。

<a id="prop-qft32-mass-shell-measure"></a>

<!-- formal-statement-start -->
> **命題（正エネルギー質量殻の不変積分）**
> $m\ge0$、$\Lambda\in SO^+(1,3)$、質量殻上で可積分な関数 $F$ に対し

$$
\int_{\mathbb R^3}\frac{d^3p}{2E_{\boldsymbol p}}F(E_{\boldsymbol p},\boldsymbol p)
=\int_{\mathbb R^3}\frac{d^3p}{2E_{\boldsymbol p}}F\bigl(\Lambda(E_{\boldsymbol p},\boldsymbol p)\bigr).
$$

> 特に $\mathcal H_m=L^2(\mathbb R^3,d^3p/((2\pi)^3 2E_{\boldsymbol p}))$ 上で
> $(U(a,\Lambda)f)(p)=e^{ip\cdot a}f(\Lambda^{-1}p)$（$p$ は正エネルギー質量殻上）はユニタリ表現になる。
<!-- formal-statement-end -->

デルタ関数は4次元体積から質量殻を抜き出すために使います。ここで $\theta(s)$ は $s>0$ で1、$s<0$ で0となる階段関数で、$\theta(p^0)$ が正エネルギー枝を選びます。$p^0$ だけ積分すると係数 $1/(2E_{\boldsymbol p})$ が生じる、というのが測度の由来です。

### 証明の見取り図

$d^4p$ と $\theta(p^0)\delta(p^2-m^2)$ のLorentz不変性を使い、正エネルギーの根だけを残します。ユニタリ性では位相の絶対値が1であることも使います。

<!-- proof-start -->
### 証明

$m>0$ の場合、$p^2-m^2=(p^0-E_{\boldsymbol p})(p^0+E_{\boldsymbol p})$ です。正の根 $p^0=E_{\boldsymbol p}$ の近傍で $u=(p^0)^2-E_{\boldsymbol p}^2$ と変数変換すると、$du=2p^0dp^0$ です。従って正の根ではJacobianが $1/(2E_{\boldsymbol p})$ となり、

$$
\begin{aligned}
&\int_{\mathbb R^4}d^4p\,\theta(p^0)\delta(p^2-m^2)F(p)\\
&=\int_{\mathbb R^3}d^3p\int_0^\infty dp^0\,
  \frac{\delta(p^0-E_{\boldsymbol p})}{2E_{\boldsymbol p}}F(p^0,\boldsymbol p)\\
&=\int_{\mathbb R^3}\frac{d^3p}{2E_{\boldsymbol p}}F(E_{\boldsymbol p},\boldsymbol p).
\end{aligned}
$$

$m=0$ でも $\boldsymbol p\ne0$ なら同じ公式が成立し、原点は測度零です。$\det\Lambda=1$ より $d^4(\Lambda p)=d^4p$、Lorentz性より $(\Lambda p)^2=p^2$、$SO^+(1,3)$ が未来向きの正エネルギー枝を保つことから $\theta((\Lambda p)^0)=\theta(p^0)$ です。変数 $q=\Lambda p$ と置けば最初の等式が従います。

ノルムは

$$
\begin{aligned}
\|U(a,\Lambda)f\|^2
&=\int d\mu_m(p)\,|e^{ip\cdot a}f(\Lambda^{-1}p)|^2\\
&=\int d\mu_m(q)\,|f(q)|^2=\|f\|^2
\end{aligned}
$$

となります。ここで $d\mu_m=d^3p/((2\pi)^3 2E_{\boldsymbol p})$ です。また

$$
\begin{aligned}
U(a,\Lambda)U(b,M)f(p)
&=e^{ip\cdot a}e^{i(\Lambda^{-1}p)\cdot b}f(M^{-1}\Lambda^{-1}p)\\
&=e^{ip\cdot(a+\Lambda b)}f((\Lambda M)^{-1}p)
\end{aligned}
$$

です。第2行には四元ベクトルの内積を保つ性質 $(\Lambda^{-1}p)\cdot b=p\cdot(\Lambda b)$ を使いました。これは[群の合成則](#def-qft32-poincare)と一致します。逆変換もあるので等長写像は全射であり、ユニタリです。
<!-- proof-end -->

### 例：$m>0$ の休止系で位相を確かめる

**命題の確認**：質量殻測度を使う表現の二つの要件、位相の絶対値1とLorentz変換後の積分不変性を分けて調べます。

$p=(m,\boldsymbol0)$、時間平行移動 $a=(T,\boldsymbol0)$ なら波束の各運動量成分には $e^{iET}$ が掛かります。$|e^{iET}|^2=1$ であるため規格化は変わりません。運動量を変えるboostでは $d^3p$ 単独では不変になりませんが、上の $1/(2E)$ がJacobianを打ち消します。これは両条件をそれぞれ確認した例です。

## 2. 運動量を固定する変換から質量とスピンを読む

ある運動量を選び、それを変えないLorentz変換だけを集めた**安定化群**を考えます。質量正なら休止系で回転だけが残り、質量零なら休止系が存在せず別の群になります。この安定化群を次で定義します。

<a id="def-qft32-little-group"></a>

<!-- formal-statement-start -->
> **定義（little group）**
> 正エネルギーの非零四運動量 $k$ に対して

$$
G_k=\{\Lambda\in SO^+(1,3):\Lambda k=k\}
$$

> を $k$ のlittle groupと呼ぶ。半整数スピンを扱うときは、その二重被覆側の安定化群を用いる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft32-little-group -->
### 例：休止運動量を固定する回転

**定義の確認**：little groupの定義にある「運動量を固定する」を回転とboostの両方で判定します。

$k=(m,0,0,0)$、$m>0$ なら空間回転 $\Lambda=\operatorname{diag}(1,R)$、$R\in SO(3)$ は $\Lambda k=k$ を満たします。対して速さ $v\ne0$ のboostは $k\mapsto(\gamma m,\gamma vm,0,0)$ と動かすので入りません。定義の「固定する」を実際に判定しました。
<!-- definition-example-end -->

二つのlittle groupを行列で区別しましょう。Pauli行列を

$$
\sigma_1=\begin{pmatrix}0&1\\1&0\end{pmatrix},\quad
\sigma_2=\begin{pmatrix}0&-i\\i&0\end{pmatrix},\quad
\sigma_3=\begin{pmatrix}1&0\\0&-1\end{pmatrix}
$$

とし、実四元ベクトル $p$ を二行二列Hermitian行列へ対応させます。

$$
X(p)=p^0I+p^1\sigma_1+p^2\sigma_2+p^3\sigma_3
=\begin{pmatrix}p^0+p^3&p^1-ip^2\\p^1+ip^2&p^0-p^3\end{pmatrix}.
$$

この表示を使う理由は、**Minkowski内積の判定が行列式になる**ことです。二行二列の行列式を展開すれば

$$
\det X(p)=(p^0)^2-(p^3)^2-(p^1)^2-(p^2)^2=p^2.
$$

$A\in SL(2,\mathbb C)$（複素二行二列で $\det A=1$）に $X\mapsto AXA^\dagger$ と作用させると、Hermitian性と行列式が保たれます。

未来向きであることも行列から判定できます。Pauli行列の反交換関係と $\operatorname{tr}(\boldsymbol p\cdot\boldsymbol\sigma)=0$ から、固有値は次のように求まります。
$
(\boldsymbol p\cdot\boldsymbol\sigma)^2=|\boldsymbol p|^2I,
\qquad
\lambda_\pm(X(p))=p^0\pm|\boldsymbol p|
$
です。正エネルギーの非零質量殻上では両固有値が非負で、$X(p)$ は非零の半正定値Hermitian行列です。任意の二成分列ベクトル $v$ について
$
v^\dagger AX(p)A^\dagger v
=(A^\dagger v)^\dagger X(p)(A^\dagger v)\ge0
$
であり、$\det A=1$ から $A$ は可逆なので、合同変換後も非零半正定値です。従って
$
p'{}^0=\frac12\operatorname{tr}(AX(p)A^\dagger)>0
$
となり、未来向きの枝を保ちます。これがなぜLorentz群の**二重被覆**になるかも確かめます。

まず $A=\operatorname{diag}(e^{\rho/2},e^{-\rho/2})$（実数 $\rho$）を代入すると、$X(p)$ の対角成分は $e^\rho(p^0+p^3)$ と $e^{-\rho}(p^0-p^3)$、非対角成分は不変です。和と差を取れば

$$
p'{}^0=\cosh\rho\,p^0+\sinh\rho\,p^3,\qquad
p'{}^3=\sinh\rho\,p^0+\cosh\rho\,p^3.
$$

これは $z$ 方向のboostです。一方 $A=\operatorname{diag}(e^{-i\theta/2},e^{i\theta/2})$ なら非対角成分 $p^1-ip^2$ は $e^{-i\theta}$ 倍となり、$z$ 軸回転を与えます。座標軸を回してこれらを組み合わせれば任意方向のboostと回転を作れます。

実際、任意の $\Lambda\in SO^+(1,3)$ に対し、$u=\Lambda(1,0,0,0)$ は $u^2=1,u^0>0$ を満たします。$\boldsymbol\beta=\boldsymbol u/u^0$ と置けば $|\boldsymbol\beta|<1$、$\gamma=(1-|\boldsymbol\beta|^2)^{-1/2}=u^0$ です。この速度のboost $B$ は $(1,0,0,0)$ を $u$ へ移します。そこで $B^{-1}\Lambda$ は $(1,0,0,0)$ を固定するので空間回転です。よってboostと回転の積で全群を覆います。

また全てのHermitian $X$ を固定する $A$ は、$X=I$ を使うと $AA^\dagger=I$、さらに $A\sigma_i=\sigma_iA$（$i=1,2,3$）です。$\sigma_3$ と可換なら $A$ は対角、$\sigma_1$ とも可換なら $A=\lambda I$ であり、$\det A=1$ から $\lambda=\pm1$ です。従って核はちょうど $\{I,-I\}$。これで $SL(2,\mathbb C)\to SO^+(1,3)$ が二対一であることと、スピノルに符号が残る理由を確かめました。

次の安定化群を比較するため、$SU(2)=\{A\in SL(2,\mathbb C):AA^\dagger=I\}$ を特殊ユニタリ群と呼びます。また $ISO(2)=\mathbb R^2\rtimes SO(2)$ は平面の向きを保つ剛体運動群で、回転と平行移動を含みます。被覆群の全既約表現を分類するのではなく、安定化行列を直接求めます。

<a id="thm-qft32-little-groups"></a>

<!-- formal-statement-start -->
> **定理（質量正と質量零のlittle group）**
> $SL(2,\mathbb C)$ の $X\mapsto AXA^\dagger$ 作用において、$m>0$ の $k_m=(m,0,0,0)$ の安定化群は $SU(2)$ である。一方、$\kappa>0$ の $k_0=(\kappa,0,0,\kappa)$ の安定化群は

$$
\left\{\begin{pmatrix}e^{-i\theta/2}&z\\0&e^{i\theta/2}\end{pmatrix}:
\theta\in\mathbb R,\ z\in\mathbb C\right\}
$$

> であり、回転角の部分と実二次元の並進に相当する部分からなる（$ISO(2)$ の二重被覆に対応）。これはともに正エネルギー軌道の標準運動量を固定する群である。
<!-- formal-statement-end -->

### 証明の見取り図

休止運動量では $X=mI$、光的運動量では $X=2\kappa\,\operatorname{diag}(1,0)$ です。前者はユニタリ条件、後者は行列の第1列に関する条件へ帰着します。

<!-- proof-start -->
### 証明

$X(k_m)=mI$ ですから、$AX(k_m)A^\dagger=X(k_m)$ は $mAA^\dagger=mI$、すなわち $AA^\dagger=I$ に同値です。$\det A=1$ と合わせると定義通り $A\in SU(2)$ です。逆に任意の $SU(2)$ 行列はこの式を満たすので、両方向を示せました。

光的な $k_0$ では $X(k_0)=2\kappa e_1e_1^\dagger$（$e_1=(1,0)^T$）です。第1列 $u=Ae_1$ を用いると

$$
AX(k_0)A^\dagger=2\kappa uu^\dagger
$$

なので、固定条件は $uu^\dagger=e_1e_1^\dagger$ です。$(2,2)$ 成分から $|u_2|^2=0$、$(1,1)$ 成分から $|u_1|=1$ を得ます。よって $u=(e^{-i\theta/2},0)^T$ と書けます。第2列の第1成分を任意の $z\in\mathbb C$ と置けば、$\det A=1$ により第2列の第2成分は $e^{i\theta/2}$ に決まります。逆に表示された任意の行列は $u u^\dagger=e_1e_1^\dagger$ を満たすので必要十分です。

最後に $z$ の実部・虚部が二つの実パラメータ、$\theta$ が一つの回転角です。積を取ると三角行列形を保ち、回転が $z$ を回す半直積構造を持ちます。$z=0$ の円部分を除いた $z$ 方向が、質量零の場合に余分に現れる成分です。
<!-- proof-end -->

### 例：質量零の場合に回転だけで済ませられない

**定理の確認**：安定化条件を満たすがユニタリ条件を満たさない行列を作り、両群を区別します。

$z=1$、$\theta=0$ とした $A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ は $\det A=1$ ですが $AA^\dagger=\begin{pmatrix}2&1\\1&1\end{pmatrix}\ne I$ です。したがって休止運動量のlittle groupには入りません。しかし $Ae_1=e_1$ なので光的運動量は固定します。**質量零のlittle groupを単なる回転群と同一視するのは誤り**です。

## 3. Wigner回転と質量零ヘリシティ

粒子の運動量 $p$ を標準運動量 $k$ から作るLorentz変換を一つずつ選び、$B(p)k=p$ とします。質量正では休止系からのboost、質量零では $k_0$ から任意の正エネルギー光的 $p$ への回転とboostを組み合わせます。$B(p)$ の取り方は一意ではありません。

任意の $\Lambda$ を作用させたとき、標準運動量からの二つの道筋 $\Lambda B(p)$ と $B(\Lambda p)$ は同じ $\Lambda p$ へ着きます。そこで、その差がlittle groupに入ることを使います。

<a id="def-qft32-wigner"></a>

<!-- formal-statement-start -->
> **定義（Wigner回転）**
> 質量殻上の標準運動量 $k$ と各点で選んだ $B(p)\in SO^+(1,3)$（$B(p)k=p$）に対し

$$
W(\Lambda,p)=B(\Lambda p)^{-1}\Lambda B(p)
$$

> をWigner回転（質量零の場合はlittle groupの一般元）と呼ぶ。$W(\Lambda,p)k=k$ だから $W(\Lambda,p)\in G_k$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft32-wigner -->
### 例：標準運動量を固定する回転

**定義の確認**：標準変換の条件とWigner回転の安定化条件を順に確かめます。

$p=k_m$、$B(k_m)=I$ とし、$\Lambda=R$ を空間回転とします。$Rk_m=k_m$ より $W(R,k_m)=I^{-1}RI=R$ です。$W$ が確かに運動量を固定し、スピンに作用する回転となることを両条件で確かめました。
<!-- definition-example-end -->

<a id="prop-qft32-wigner-cocycle"></a>

<!-- formal-statement-start -->
> **命題（Wigner回転の合成則）**
> 上の $B(p)$ を固定して、$\Lambda_1,\Lambda_2\in SO^+(1,3)$ とすると

$$
W(\Lambda_2\Lambda_1,p)
=W(\Lambda_2,\Lambda_1p)\,W(\Lambda_1,p).
$$

> little group のユニタリ表現 $D$ を使うと、共変規格化された一粒子状態 $|p,\alpha\rangle$ に

$$
U(\Lambda)|p,\alpha\rangle
=\sum_\beta|\Lambda p,\beta\rangle
D_{\beta\alpha}(W(\Lambda,p))
$$

> と作用させる規則が、群の合成と整合する（質量殻測度と $D$ のユニタリ性の下でノルムも保存する）。
<!-- formal-statement-end -->

### 証明の見取り図

$W$ の定義を二つ並べ、途中の $B(\Lambda_1p)$ とその逆を打ち消します。これが粒子ラベルの回転と時空変換の組み合わせを保証します。

<!-- proof-start -->
### 証明

$$
\begin{aligned}
&W(\Lambda_2,\Lambda_1p)W(\Lambda_1,p)\\
&=B(\Lambda_2\Lambda_1p)^{-1}\Lambda_2 B(\Lambda_1p)
 B(\Lambda_1p)^{-1}\Lambda_1B(p)\\
&=B(\Lambda_2\Lambda_1p)^{-1}\Lambda_2\Lambda_1B(p)
=W(\Lambda_2\Lambda_1,p).
\end{aligned}
$$

先に $\Lambda_1$、次に $\Lambda_2$ を作用させると係数は

$$
\sum_\beta D_{\gamma\beta}(W(\Lambda_2,\Lambda_1p))
 D_{\beta\alpha}(W(\Lambda_1,p))
=D_{\gamma\alpha}(W(\Lambda_2\Lambda_1,p))
$$

となり、行列積と上の合成則によって一回の作用と等しくなります。運動量の積分は[不変な質量殻測度](#prop-qft32-mass-shell-measure)に従い、$D^\dagger D=I$ によりスピン成分の二乗和も保存されます。
<!-- proof-end -->

質量正のlittle groupは $SU(2)$ なので、スピン $j$ の有限次元ユニタリ表現（$j=0,\frac12,1,\ldots$）を選べます。一般の全既約表現分類をここで証明したわけではなく、スカラーの $j=0$ と[QFT7の二成分スピン](../QFT7/index.md#def-qft7-plane-waves)に対応する $j=\frac12$ は具体的に使えます。

質量零のlittle groupには $z$ 方向の成分もあります。通常の有限個の物理偏極を持つ質量零粒子を表す場合は**この成分が物理的一粒子状態へ自明に作用する**という仮定を加えます。これを課さなければ、一般に回転部分だけの1次元位相表示とはなりません。

<a id="def-qft32-helicity"></a>

<!-- formal-statement-start -->
> **定義（ヘリシティ）**
> $\boldsymbol p\ne0$ の一粒子状態で、回転生成子 $\boldsymbol J$ と運動量方向 $\widehat{\boldsymbol p}=\boldsymbol p/|\boldsymbol p|$ に対する作用素

$$
h=\boldsymbol J\cdot\widehat{\boldsymbol p}
$$

> の固有値をヘリシティと呼ぶ。質量零でlittle groupの並進部分が自明に作用する既約粒子状態では、運動量方向の角度 $\theta$ の回転は位相 $e^{-ih\theta}$ で作用する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft32-helicity -->
### 例：光子の二つの物理偏極

**定義の確認**：進行方向と回転生成子を指定し、回転位相からヘリシティ固有値を読み取ります。

$\boldsymbol p$ を $+z$ 方向に取り、横偏極ベクトル $\boldsymbol e_\pm=(1,\pm i,0)/\sqrt2$ を考えます。$z$ 回りの回転行列を実成分へ作用させると

$$
R_z(\theta)\boldsymbol e_+=e^{-i\theta}\boldsymbol e_+,\qquad
R_z(\theta)\boldsymbol e_-=e^{i\theta}\boldsymbol e_-.
$$

したがって位相の定義に従い、ヘリシティはそれぞれ $+1,-1$ です。[QFT15で取り出した二つの物理偏極](../QFT15/index.md#thm-qft15-two-polarizations)と対応します。四元ポテンシャルの縦・時間成分をそのまま一粒子の別ヘリシティに数えないのは、ゲージ冗長性を取り除く必要があるからです。
<!-- definition-example-end -->

なお質量正の粒子には休止系があり、運動量とスピンの相対向きをboostで変えられます。質量零で有限ヘリシティ表現を選んだ場合のヘリシティ不変性を、そのまま質量正へ延長してはいけません。

## 4. Weyl・Dirac・Majoranaは何を数えているか

一粒子状態では $D(W)$ がユニタリである必要がありました。一方、局所場は時空上の添字を持つため、有限次元のLorentzスピノル行列によって変換します。非コンパクトなboostの有限次元スピノル行列は通常の正定値内積に関してユニタリではありません。これは場の成分と粒子状態が**異なる対象**だからです。

[QFT7のClifford関係](../QFT7/index.md#def-qft7-clifford)を満たす行列を、以下のWeyl表示で具体化します。$\sigma^\mu=(I,\boldsymbol\sigma)$、$\bar\sigma^\mu=(I,-\boldsymbol\sigma)$ とし、

$$
\gamma^\mu=\begin{pmatrix}0&\sigma^\mu\\\bar\sigma^\mu&0\end{pmatrix},
\qquad
\gamma^5=i\gamma^0\gamma^1\gamma^2\gamma^3
=\begin{pmatrix}-I&0\\0&I\end{pmatrix}.
$$

ここで $\sigma_1\sigma_2=i\sigma_3$ と $\sigma_3^2=I$ を使うと、$\gamma^0\gamma^1\gamma^2\gamma^3=\operatorname{diag}(iI,-iI)$ となり、上の $\gamma^5$ の符号を検算できます。

場のLorentz変換を成分まで確定しておきます。前節の $X(p)=p^0I+\boldsymbol p\cdot\boldsymbol\sigma$ に対し

$$
\bar X(p)=p^0I-\boldsymbol p\cdot\boldsymbol\sigma
=\begin{pmatrix}p^0-p^3&-p^1+ip^2\\-p^1-ip^2&p^0+p^3\end{pmatrix}
$$

は $X$ の随伴行列（adjugate、余因子行列の転置）です。$\det A=1$ なら、$X'=AXA^\dagger$ の随伴行列は

$$
\bar X'=(A^\dagger)^{-1}\bar X A^{-1}.
$$

ここで四元運動量の添字を下げると $p_\mu=(p^0,-\boldsymbol p)$ なので、質量零のWeyl方程式に出る行列は
$$
\bar\sigma^\mu p_\mu=X(p),\qquad \sigma^\mu p_\mu=\bar X(p)
$$
です。$\bar\sigma^\mu$ と $\bar X$ は同じ記号「バー」があっても、前者には下付き運動量との縮約があるため取り違えてはいけません。$A_L=(A^\dagger)^{-1}\in SL(2,\mathbb C)$ とおくと、左成分は $\chi_L\mapsto A_L\chi_L$、右成分は $\chi_R\mapsto A\chi_R$ と変換します。実際、
$$
X'(A_L\chi_L)=AX\chi_L,\qquad
\bar X'(A\chi_R)=A_L\bar X\chi_R
$$
ですから、**左の $X\chi_L=0$ と右の $\bar X\chi_R=0$** はそれぞれ変換後も成立します。

この向きは[質量零のlittle group](#thm-qft32-little-groups)で直接検算できます。$k=(\kappa,0,0,\kappa)$、左の正エネルギー解 $\xi_L=e_2=(0,1)^T$ を取り、運動量を固定する三角行列を
$$
A_z=\begin{pmatrix}1&z\\0&1\end{pmatrix},\qquad
L_z=(A_z^\dagger)^{-1}
=\begin{pmatrix}1&0\\-z^*&1\end{pmatrix}
$$
とします。$X(k)e_2=0$ であり、正しい左成分変換なら $B_ze_2=e_2$ と解を保ちます。一方、右成分用の $A_z$ を誤って左へ使うと
$$
A_ze_2=\begin{pmatrix}z\\1\end{pmatrix},
\qquad
X(k)A_ze_2=\begin{pmatrix}2\kappa z\\0\end{pmatrix}\ne0
\quad(z\ne0)
$$
となり、Weyl方程式自体に反します。$A$ も $A_L$ も一般にはユニタリではなく、例えば実数 $\rho\ne0$ のboostで $A^\dagger A\ne I$ です。場の二成分ノルムを確率とはみなさない理由が具体的に見えます。

$\gamma^5$ は四成分を固有値 $-1$ と $+1$ に分けます。この分割が**カイラリティ**であり、運動量に沿ったスピンであるヘリシティとは別の定義です。

<a id="def-qft32-chirality"></a>

<!-- formal-statement-start -->
> **定義（カイラリティとWeyl成分）**
> 上のWeyl表示で四成分スピノル $\Psi=(\chi_L,\chi_R)^T$ に対し

$$
P_L=\frac{I_4-\gamma^5}{2},\qquad
P_R=\frac{I_4+\gamma^5}{2},\qquad
P_L\Psi=\begin{pmatrix}\chi_L\\0\end{pmatrix},\quad
P_R\Psi=\begin{pmatrix}0\\\chi_R\end{pmatrix}
$$

> と定める。$\chi_L$、$\chi_R$ を左・右Weyl成分と呼ぶ。質量零Dirac方程式 $i\gamma^\mu\partial_\mu\Psi=0$ は

$$
i\bar\sigma^\mu\partial_\mu\chi_L=0,\qquad
i\sigma^\mu\partial_\mu\chi_R=0
$$

> という独立な二成分方程式に分解する。
<!-- formal-statement-end -->

上の分解は[QFT7のDirac方程式のLorentz共変性](../QFT7/index.md#thm-qft7-covariance)と両立します。ただし局所場 $\chi_L$ の二成分は回転・boostで混ざる場の表示であり、運動量が固定された一粒子の2状態と機械的に同一視しません。

<!-- definition-example-start: def-qft32-chirality -->
### 例：射影子を実際に掛ける

**定義の確認**：射影性と相補性の式を成分表示で確かめ、運動量なしにはヘリシティを定められないことを区別します。

$\Psi=(a,b,c,d)^T$ とすると $\gamma^5\Psi=(-a,-b,c,d)^T$ です。従って $P_L\Psi=(a,b,0,0)^T$、$P_R\Psi=(0,0,c,d)^T$、$P_L+P_R=I_4$、$P_LP_R=0$、$P_L^2=P_L$ を成分ごとに確かめられます。ここでは運動量を選んでいないので、ヘリシティはまだ決まっていません。
<!-- definition-example-end -->

<a id="prop-qft32-weyl-helicity"></a>

<!-- formal-statement-start -->
> **命題（質量零Weyl方程式の粒子ヘリシティ）**
> $p^0=|\boldsymbol p|>0$、$\boldsymbol p\ne0$、平面波を $e^{-ip\cdot x}$ とし、上のWeyl表示を使う。左Weyl方程式の非零な正振動数二成分振幅 $\xi_L$ は

$$
(\boldsymbol\sigma\cdot\widehat{\boldsymbol p})\xi_L=-\xi_L,
$$

> 右Weyl方程式の $\xi_R$ は $(\boldsymbol\sigma\cdot\widehat{\boldsymbol p})\xi_R=+\xi_R$ を満たす。従って正エネルギー**粒子**のヘリシティは左で $-\frac12$、右で $+\frac12$ となる。反粒子・質量正の状態にこの同一視を無条件に適用してはならない。
<!-- formal-statement-end -->

### 証明の見取り図

Weyl方程式に平面波を代入すると、微分は $-ip_\mu$ に置き換わります。$\bar\sigma^\mu p_\mu=p^0I+\boldsymbol\sigma\cdot\boldsymbol p$ という添字の符号が決め手です。

<!-- proof-start -->
### 証明

$i\partial_\mu e^{-ip\cdot x}=p_\mu e^{-ip\cdot x}$ なので、左成分では $\bar\sigma^\mu p_\mu\xi_L=0$ です。$p_\mu=(p^0,-\boldsymbol p)$ と $\bar\sigma^i=-\sigma_i$ を代入すると

$$
(p^0I+\boldsymbol\sigma\cdot\boldsymbol p)\xi_L=0.
$$

$p^0=|\boldsymbol p|$ で割り、$(\boldsymbol\sigma\cdot\widehat{\boldsymbol p})\xi_L=-\xi_L$ を得ます。右成分では $\sigma^\mu p_\mu=p^0I-\boldsymbol\sigma\cdot\boldsymbol p$ だから固有値は $+1$ です。二成分スピンの回転生成子は $\boldsymbol J=\boldsymbol\sigma/2$ なので、[ヘリシティの定義](#def-qft32-helicity)を作用させると固有値はそれぞれ $\mp1/2$ となります。
<!-- proof-end -->

質量 $m>0$ のDirac方程式では左右は独立ではありません。質量項は $\chi_L$ と $\chi_R$ を結びます。

$$
\begin{aligned}
p_\mu\sigma^\mu\xi_R&=m\xi_L,\\
p_\mu\bar\sigma^\mu\xi_L&=m\xi_R.
\end{aligned}
$$

例えば休止運動量 $p=(m,\boldsymbol0)$ では $\xi_R=\xi_L$ であり、片方だけを非零にした質量正解は作れません。これは[QFT7の平面波Dirac解](../QFT7/index.md#def-qft7-plane-waves)の二成分分解を直接確認したものです。

Dirac質量を持つ二成分場では、Lorentz不変な項 $-m(\chi_R^\dagger\chi_L+\chi_L^\dagger\chi_R)$ が左右を結びます。実際、上の変換則と $A^\dagger A_L=I$ から
$$
\chi_R^\dagger\chi_L
\longmapsto\chi_R^\dagger A^\dagger A_L\chi_L
=\chi_R^\dagger\chi_L
$$
です。連続 $U(1)$ で左右の電荷を $q_L,q_R$ とすれば、この積には $e^{i(q_L-q_R)\alpha}$ が掛かるため、非零質量を許すには $q_L=q_R$ が必要です。これは電荷を持つDirac粒子でも許されますが、左右が適切に同じゲージ表現の電荷を持つことが必要です。標準模型では後のHiggs結合を介するまで電弱対称性の下でこの形の質量項が許されない場合があります。

一方、左Weyl場だけでも、[QFT19で導入したGrassmann反交換性](../QFT19/index.md#def-qft19-grassmann)を持つ場なら、二つの成分を反対称行列で縮約できます。ここでは $\varepsilon=i\sigma_2=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ とし、Grassmann成分の積の順序を保持します。

<a id="def-qft32-majorana"></a>

<!-- formal-statement-start -->
> **定義（Majorana条件）**
> Weyl表示の四成分スピノル $\Psi=(\chi_L,\chi_R)^T$ に対し

$$
\Psi^c=i\gamma^2\Psi^*
=\begin{pmatrix}\varepsilon\chi_R^*\\-\varepsilon\chi_L^*\end{pmatrix}
$$

> を電荷共役スピノルとする。この規約で $\Psi^c=\Psi$ を満たすスピノルをMajoranaスピノルと呼ぶ。任意の左Weyl成分 $\chi$ から

$$
\Psi_M=\begin{pmatrix}\chi\\-\varepsilon\chi^*\end{pmatrix}
$$

> を構成できる。量子場ではこの条件を反粒子生成・消滅作用素まで整合する場の条件として読む。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft32-majorana -->
### 例：共役を二回取って元へ戻る

**定義の確認**：四成分のMajorana条件を上下二成分で直接検算します。

$\varepsilon$ は実行列で $\varepsilon^2=-I$ です。$\chi_R=-\varepsilon\chi^*$ とおくと、定義の上成分は

$$
\varepsilon\chi_R^*=\varepsilon(-\varepsilon\chi)=-\varepsilon^2\chi=\chi,
$$

下成分は $-\varepsilon\chi_L^*=-\varepsilon\chi^*$ です。ゆえに $\Psi_M^c=\Psi_M$ を二成分とも直接確かめました。

さらに $A=\begin{pmatrix}a&b\\c&d\end{pmatrix}$、$ad-bc=1$ なら二行二列の積から $A\varepsilon A^T=(ad-bc)\varepsilon=\varepsilon$ です。従って $A_L=(A^\dagger)^{-1}$ として
$$
-\varepsilon(A_L\chi)^*
=-\varepsilon(A^T)^{-1}\chi^*
=-A\varepsilon\chi^*
=A(-\varepsilon\chi^*)
$$
となり、右成分の規則 $\chi_R\mapsto A\chi_R$ と一致します。これはMajorana条件がLorentz変換に対して閉じることの確認です。$\chi$ は任意の二成分でよいものの、質量項が対称性を保つかは次の電荷の制約によって決まります。
<!-- definition-example-end -->

<a id="prop-qft32-majorana-u1"></a>

<!-- formal-statement-start -->
> **命題（Majorana質量と連続U(1)電荷の制約）**
> 反交換する左Weyl場 $\chi$ と実質量 $m$ に対し

$$
\mathcal L_M=-\frac m2\bigl(\chi^T\varepsilon\chi+
(\chi^T\varepsilon\chi)^\dagger\bigr)
$$

> はLorentz変換の下で不変である。連続 $U(1)$ 対称性 $\chi\mapsto e^{iq\alpha}\chi$ の下では、$m\ne0$ で任意の実数 $\alpha$ に対して不変になるには $q=0$ が必要である。一つのMajorana場は非零の保存された通常の $U(1)$ 電荷を担えない。
<!-- formal-statement-end -->

### 証明の見取り図

$SL(2,\mathbb C)$ の行列式1の性質から $A^T\varepsilon A=\varepsilon$ が成り立ちます。$U(1)$ の位相は二つの場の積で二倍になり、連続対称性なら零電荷だけが残ります。

<!-- proof-start -->
### 証明

$A=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ に対し、直接掛けると

$$
A^T\varepsilon A
=\begin{pmatrix}0&ad-bc\\bc-ad&0\end{pmatrix}
=(\det A)\varepsilon=\varepsilon.
$$

左Weyl成分の実際の変換は $A_L\chi$（$A_L=(A^\dagger)^{-1}$）です。$\det A_L=1$ なので、上で任意の行列式1の行列について導いた恒等式を $A_L$ に適用すると
$$
(A_L\chi)^T\varepsilon(A_L\chi)
=\chi^TA_L^T\varepsilon A_L\chi
=\chi^T\varepsilon\chi
$$
です。また反交換性 $\chi_1\chi_2=-\chi_2\chi_1$ より $\chi^T\varepsilon\chi=2\chi_1\chi_2$ で、数値的な可換成分の積なら零になる点も区別します。

連続位相変換では

$$
(e^{iq\alpha}\chi)^T\varepsilon(e^{iq\alpha}\chi)
=e^{2iq\alpha}\chi^T\varepsilon\chi.
$$

$m\ne0$ で任意の $\alpha$ に対して作用の質量項が不変なら、$e^{2iq\alpha}=1$ が全ての $\alpha$ で必要です。$\alpha=0$ で微分して $2iq=0$、従って $q=0$ です。$m=0$ ならこの質量項による制約はなく、離散的な位相対称性を連続 $U(1)$ と混同しません。
<!-- proof-end -->

次の標準模型では、場がどのゲージ群のどの表現に属するかを指定した上で、質量項やYukawa結合の不変性を判定します。ここでの**中性Majorana質量**はその判定の最小模型です。自由場の二成分という数え方と、相互作用下の粒子・反粒子の識別を同一視しないことが重要です。

## 5. 演習：運動量の対称性から場の条件まで

### 演習 QFT32-A1：群積の非可換性

- Level: A
- 問題：$a=(T,0,0,0)$、$\Lambda$ を $x^1$ 方向の速さ $v$ のboost（$t'=\gamma(t+vx^1)$）とする。$(0,\Lambda)(a,I)$ と $(a,I)(0,\Lambda)$ の平行移動成分を求め、$vT\ne0$ で異なることを示せ。

<!-- solution-start -->
**詳細解答**

[Poincaré群の積](#def-qft32-poincare)で $b=a$、$M=I$ を代入すると、前者は $(\Lambda a,\Lambda)$ です。$a$ の空間成分は零だから

$$
\Lambda a=(\gamma T,\gamma vT,0,0).
$$

後者は $(a+\!I0,I\Lambda)=(a,\Lambda)$ です。第1成分の空間部分は前者が $\gamma vT$、後者が零なので異なります。$\gamma=(1-v^2)^{-1/2}$ で $|v|<1$ です。
<!-- solution-end -->

### 演習 QFT32-A2：質量殻測度の係数

- Level: A
- 問題：$m>0$、$E_{\boldsymbol p}=\sqrt{|\boldsymbol p|^2+m^2}$ とする。$\int_0^\infty dp^0\,\delta((p^0)^2-E_{\boldsymbol p}^2)F(p^0)$ を評価し、なぜ $d^3p/E_{\boldsymbol p}$ ではなく $d^3p/(2E_{\boldsymbol p})$ が自然に現れるか説明せよ。

<!-- solution-start -->
**詳細解答**

$g(s)=s^2-E_{\boldsymbol p}^2$ の根は $\pm E_{\boldsymbol p}$、微分は $g'(s)=2s$ です。正の半直線に含まれる根は $+E_{\boldsymbol p}$ だけなので、[不変測度の導出](#prop-qft32-mass-shell-measure)と同じ置換により

$$
\int_0^\infty ds\,\delta(g(s))F(s)
=\frac{F(E_{\boldsymbol p})}{|g'(E_{\boldsymbol p})|}
=\frac{F(E_{\boldsymbol p})}{2E_{\boldsymbol p}}.
$$

分母の2は二次式の微分の係数です。$(2\pi)^{-3}$ はFourier規格化の任意な全体定数で、$1/(2E)$ の変換上の必要性とは別です。
<!-- solution-end -->

### 演習 QFT32-A3：Hermitian行列と質量の判定

- Level: A
- 問題：$p=(5,3,0,0)$ に $X(p)=p^0I+\boldsymbol p\cdot\boldsymbol\sigma$ を対応させよ。行列式と固有値を求め、$p$ が正エネルギー質量殻上であるときの質量を求めよ。

<!-- solution-start -->
**詳細解答**

Pauli行列の定義を代入すると

$$
X(p)=\begin{pmatrix}5&3\\3&5\end{pmatrix},\qquad
\det X=25-9=16.
$$

特性方程式は $(5-\lambda)^2-9=0$ で、固有値は $8,2$ とともに正です。$\det X=p^2=m^2$、$p^0=5>0$ なので $m=4$ です。$E_{\boldsymbol p}=\sqrt{3^2+4^2}=5$ も確認できます。
<!-- solution-end -->

### 演習 QFT32-A4：光的little groupの具体行列

- Level: A
- 問題：$k=(\kappa,0,0,\kappa)$、$\kappa>0$、$A=\begin{pmatrix}1&i\\0&1\end{pmatrix}$ とする。$A\in SL(2,\mathbb C)$、$AX(k)A^\dagger=X(k)$、$AA^\dagger\ne I$ をそれぞれ直接確認せよ。

<!-- solution-start -->
**詳細解答**

$\det A=1$ です。$X(k)=2\kappa\begin{pmatrix}1&0\\0&0\end{pmatrix}$ なので、$AX(k)=X(k)$、さらに $X(k)A^\dagger=X(k)$（$A^\dagger=\begin{pmatrix}1&0\\-i&1\end{pmatrix}$）です。よって固定条件を満たします。一方

$$
AA^\dagger=\begin{pmatrix}2&i\\-i&1\end{pmatrix}\ne I.
$$

従って[二つのlittle groupの定理](#thm-qft32-little-groups)のうち光的な側にだけ属します。
<!-- solution-end -->

### 演習 QFT32-A5：カイラリティ射影と質量

- Level: A
- 問題：Weyl表示で $\Psi=(1,0,0,1)^T$、$\gamma^5=\operatorname{diag}(-1,-1,1,1)$ とする。$P_L\Psi,P_R\Psi$ を求めよ。また $m>0$ の休止運動量 $p=(m,0,0,0)$ に対し、$\chi_R=0$ かつ $\chi_L\ne0$ が自由Dirac方程式の正エネルギー解になれるか判定せよ。

<!-- solution-start -->
**詳細解答**

[カイラリティとWeyl成分](#def-qft32-chirality)で定義した射影子より

$$
P_L\Psi=(1,0,0,0)^T,\qquad P_R\Psi=(0,0,0,1)^T.
$$

休止系のDirac方程式は $m\chi_R=m\chi_L$ と $m\chi_L=m\chi_R$ です。$m>0$ で割ると $\chi_L=\chi_R$ なので、$\chi_R=0$ なら $\chi_L=0$ です。片方だけが非零という仮定と矛盾します。
<!-- solution-end -->

### 演習 QFT32-B1：Wigner回転の基準の変更

- Level: B
- 問題：標準運動量 $k$ を固定し、$B'(p)=B(p)H(p)$、$H(p)\in G_k$ と選び直す。$W'(\Lambda,p)$ と $W(\Lambda,p)$ の関係を導け。特に $H(p)$ が一定ならどうなるか。

<!-- solution-start -->
**詳細解答**

[Wigner回転の定義](#def-qft32-wigner)へ代入すると

$$
\begin{aligned}
W'(\Lambda,p)
&=B'(\Lambda p)^{-1}\Lambda B'(p)\\
&=H(\Lambda p)^{-1}B(\Lambda p)^{-1}\Lambda B(p)H(p)\\
&=H(\Lambda p)^{-1}W(\Lambda,p)H(p).
\end{aligned}
$$

$H(p)=H_0$ が運動量に依らないなら $W'=H_0^{-1}WH_0$、すなわち同じlittle groupの表現の基底を取り替えた共役です。一般の $H(p)$ は運動量依存のスピン基底変更であり、個々のWigner行列が変わっても物理的な変換法則の整合性は残ります。
<!-- solution-end -->

### 演習 QFT32-B2：ヘリシティとカイラリティの符号を導く

- Level: B
- 問題：質量零で $p=(E,0,0,E)$、$E>0$、$e^{-ip\cdot x}$ の正振動数解を考える。左・右Weyl方程式を二行二列行列として書き、零空間の基底を一つずつ示し、ヘリシティを計算せよ。

<!-- solution-start -->
**詳細解答**

$p_\mu=(E,0,0,-E)$ です。左について

$$
p_\mu\bar\sigma^\mu=E(I+\sigma_3)
=E\begin{pmatrix}2&0\\0&0\end{pmatrix},
$$

なので零空間は $\operatorname{span}\{(0,1)^T\}$ です。右について

$$
p_\mu\sigma^\mu=E(I-\sigma_3)
=E\begin{pmatrix}0&0\\0&2\end{pmatrix},
$$

なので零空間は $\operatorname{span}\{(1,0)^T\}$ です。$+z$ 方向では $h=J_3=\sigma_3/2$ なので、左は $-1/2$、右は $+1/2$ です。[Weyl粒子ヘリシティの命題](#prop-qft32-weyl-helicity)で使った質量零・正振動数という条件を全て確認しました。$m>0$ のときは両成分が結合するので同じ議論はできません。
<!-- solution-end -->

### 演習 QFT32-B3：Majorana質量はなぜ反交換場で非零か

- Level: B
- 問題：$\varepsilon=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$、$\chi=(\chi_1,\chi_2)^T$ とする。成分が通常の可換複素数の場合と反交換するGrassmann数の場合とで $\chi^T\varepsilon\chi$ を求めよ。更に $\chi\mapsto e^{iq\alpha}\chi$ の連続対称性を課すとき、非零Majorana質量の条件を導け。

<!-- solution-start -->
**詳細解答**

行列積を先に取り

$$
\chi^T\varepsilon\chi
=(\chi_1,\chi_2)\begin{pmatrix}\chi_2\\-\chi_1\end{pmatrix}
=\chi_1\chi_2-\chi_2\chi_1.
$$

可換数なら零、Grassmann数なら $\chi_2\chi_1=-\chi_1\chi_2$ より $2\chi_1\chi_2$ です。位相変換で二つの場から $e^{2iq\alpha}$ が現れます。任意の実 $\alpha$ で質量項が不変かつ $m\ne0$ なら $e^{2iq\alpha}\equiv1$、$\alpha=0$ における微分から $q=0$ です。[Majorana質量の命題](#prop-qft32-majorana-u1)の条件を再構成しました。
<!-- solution-end -->

### 演習 QFT32-B4：場の表示がユニタリでない理由

- Level: B
- 問題：$A=\operatorname{diag}(e^{\rho/2},e^{-\rho/2})\in SL(2,\mathbb C)$、実数 $\rho\ne0$ とする。$A^\dagger A$ を計算し、二成分Weyl場のLorentz変換を量子的一粒子Hilbert空間のユニタリ作用とそのまま同一視できない理由を、[質量殻積分](#prop-qft32-mass-shell-measure)との比較で説明せよ。

<!-- solution-start -->
**詳細解答**

$$
A^\dagger A=\begin{pmatrix}e^\rho&0\\0&e^{-\rho}\end{pmatrix}\ne I
$$

なので二成分の通常のEuclidノルムは変わります。例えば $\chi_R=\chi_L=(1,0)^T$ をそれぞれ右・左Weyl成分の初期値として選ぶと、$A$ と $A_L=(A^\dagger)^{-1}$ の変換で
$
\|A\chi_R\|^2=e^\rho,\qquad
\|A_L\chi_L\|^2=e^{-\rho}
$
となり、元のノルム二乗1とは異なります。

一方、[ユニタリ粒子表現](#def-qft32-poincare)では運動量そのものも $\Lambda^{-1}p$ へ移し、$d^3p/(2E)$ の不変性とlittle groupのユニタリ行列 $D(W)$ を組み合わせるため波束のHilbertノルムを保存します。**固定時空点での場の成分ノルム**と**全運動量の波束ノルム**を比べていたことが誤った同一視の原因です。
<!-- solution-end -->

### 演習 QFT32-C1：質量零粒子から中性質量項までの統合判定

- Level: C
- 問題：$k=(\kappa,0,0,\kappa)$（$\kappa>0$）、$\varepsilon=i\sigma_2$ とする。次を一続きに判定せよ。
  1. $X(k)$ と $\det X(k)$ を求め、little groupの三角行列に任意の $z$ が残る理由を第1列から説明せよ。
  2. 物理状態で $z$ 部分が自明に作用する場合、$+z$ 方向の回転 $R_z(\theta)$ に対し左Weylの正振動数解の位相を求め、ヘリシティと照合せよ。
  3. 左Weyl場 $\chi$ から $\Psi_M=(\chi,-\varepsilon\chi^*)^T$ を作り、$\Psi_M^c=\Psi_M$ を検算せよ。
  4. $\chi$ の連続 $U(1)$ 電荷が $q\ne0$ ならMajorana質量の可否を判定し、「質量零の有限ヘリシティ」と「Majorana条件」が同義でない理由を述べよ。

<!-- solution-start -->
**詳細解答**

1. [光的little groupの定理](#thm-qft32-little-groups)の行列表示を直接検算します。Pauli表示に代入すると

   $
   X(k)=\begin{pmatrix}2\kappa&0\\0&0\end{pmatrix},\qquad
   \det X(k)=0.
   $$

   $A X(k)A^\dagger=2\kappa(Ae_1)(Ae_1)^\dagger$ です。$Ae_1=(e^{-i\theta/2},0)^T$ なら固定条件を満たし、第2列の第1成分 $z$ はこの積に現れません。$\det A=1$ から下対角は $e^{i\theta/2}$ と決まるので、任意の複素数 $z$ が残ります。

2. [Weyl粒子ヘリシティの命題](#prop-qft32-weyl-helicity)で $\chi_L$ の振幅は $\xi_L=(0,1)^T$ に比例します。[光的little group](#thm-qft32-little-groups)の一般元と左Weyl成分の変換行列は

   $$
   A=\begin{pmatrix}e^{-i\theta/2}&z\\0&e^{i\theta/2}\end{pmatrix},
   \qquad
   A_L=(A^\dagger)^{-1}
   =\begin{pmatrix}e^{-i\theta/2}&0\\-z^*&e^{i\theta/2}\end{pmatrix}
   $$

   です。$\bar\sigma^\mu p_\mu=X(k)$ の零空間である $\xi_L$ に実際に作用させると

   $$
   A_L\xi_L=e^{i\theta/2}\xi_L
   =e^{-i(-1/2)\theta}\xi_L.
   $$

   [ヘリシティの定義](#def-qft32-helicity)と比較して $h=-1/2$ です。$z$ 部分はこの正エネルギー解に自明に作用しますが、一般のlittle group表現に最初から自明作用を仮定してよいわけではありません。

3. $\varepsilon^*=\varepsilon$、$\varepsilon^2=-I$ を使います。[Majorana条件](#def-qft32-majorana)による電荷共役は

   $$
   \Psi_M^c
   =\begin{pmatrix}\varepsilon(-\varepsilon\chi^*)^*\\-\varepsilon\chi^*\end{pmatrix}
   =\begin{pmatrix}-\varepsilon^2\chi\\-\varepsilon\chi^*\end{pmatrix}
   =\Psi_M.
   $$

4. 非零質量 $m$ の二次項は $\chi^T\varepsilon\chi$ とそのHermitian共役です。$\chi\mapsto e^{iq\alpha}\chi$ で前者に $e^{2iq\alpha}$ が掛かるため、任意の $\alpha$ で不変となるには $q=0$ が必要です。$q\ne0$ なら[Majorana質量の命題](#prop-qft32-majorana-u1)の条件に反して質量項は禁じられます。質量零のヘリシティは**運動量を固定する時空対称性の表現**の情報で、Majorana条件は**場とその電荷共役を同一視する条件**です。前者だけでは後者も、質量項の許可も導けません。
<!-- solution-end -->

## 6. まとめ：次に「どの対称性が破れるか」を問う

- 質量正の粒子の内部スピン回転は $SU(2)$、質量零では並進型部分を含むlittle groupから出発し、有限ヘリシティ粒子にはその自明作用という追加条件を課す。
- Wigner回転は一粒子のユニタリ変換に現れる。局所Weyl・Dirac場の有限次元Lorentz行列が通常の意味でユニタリでないこととは矛盾しない。
- 質量零・正エネルギーのWeyl**粒子**ではカイラリティとヘリシティの符号が対応する。ただし反粒子や質量正の場へ無条件には拡張できない。
- Dirac質量は左右のWeyl成分を結び、Majorana質量は反交換する中性Weyl場の自己縮約を使う。どちらを許すかは局所ゲージ表現まで指定して初めて判定できる。

この区別があれば、次は「真空が対称性を保たない」とき何が起こるかを議論できます。Goldstone粒子とHiggs機構では、場の自由度、局所ゲージ冗長性、観測可能な粒子状態をこの順で数え直します。
