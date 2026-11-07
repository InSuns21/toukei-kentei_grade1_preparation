# ITD12 位置依存ポテンシャルのLangevin拡散：確率流・定常散逸・自由エネルギー

[ITD11の一定駆動円周模型](../ITD11/index.md#def-itd11-driven-ring)では、持ち上げ変位を使って経路の熱と時間反転比を求めました。しかし粒子が場所によって異なる力を受けると、増分はもはや同じ平均を持つ正規分布の積では表せません。では、**経路確率比を直接計算できなくても、どこで散逸が生じたかを連続した確率の流れから評価できるでしょうか。**

今回は拡散係数を一定に保ち、滑らかな周期ポテンシャルを追加します。確率密度の保存則から確率流を導き、その流れが運ぶ熱と系のエントロピー変化を足すと、非負の平方積分が現れます。さらに非平衡定常状態を実際に解いて、**分布が時間変化しないことと熱力学的可逆性は違う**ことを確かめます。

記号は長さ $L>0$、時間 $\tau>0$、移動度 $\mu>0$、温度 $T>0$、$D=\mu k_{\mathrm B}T$、$\beta=(k_{\mathrm B}T)^{-1}$ とし、対数は自然対数です。$W$ は外部から系へ入る仕事、$Q_{\mathrm{bath}}$ は浴へ出る熱を正として、$\Delta U=W-Q_{\mathrm{bath}}$ とします。

## 1. 坂道のある円周で仕事と熱を分ける

長さ $L$ の円周を $[0,L)$ の両端を貼り合わせた空間とし、実数値の持ち上げ軌道 $Z_t$ と円周上の位置 $X_t=Z_t\pmod L$ を区別します。周期関数 $U(x+L)=U(x)$ を粒子の内部エネルギーとし、一定の外力 $F\in\mathbb R$ は円周を周回するたびに仕事を供給できる外部駆動とします。$U$ は $C^3$ 級とし、導関数も周期的です。

局所的な合力は $f(x)=F-U'(x)$ です。外力 $F$ がした仕事は $F$ と持ち上げ変位を掛けたものですが、$-U'$ による保存力の仕事はポテンシャルの変化と相殺されます。この区別を [ITD7のStratonovich熱の定義](../ITD7/index.md#def-itd7-langevin-heat)に合わせます。

<a id="def-itd12-potential-ring"></a>

<!-- formal-statement-start -->
> **定義（周期ポテンシャル下のLangevin経路と浴熱）**  
> $U:\mathbb R\to\mathbb R$ を $L$ 周期の $C^3$ 関数、$F\in\mathbb R$、$f=F-U'$ とする。$Z_0\in[0,L)$ はBrown運動 $B$ と独立で、正の $C^2$ 級周期確率密度 $\rho_0$ を持つとする。過減衰Langevin経路は

$$
dZ_t=\mu f(X_t)\,dt+\sqrt{2D}\,dB_t,
\qquad X_t=Z_t\pmod L
$$

> を満たす連続過程である。$Y_t=Z_t-Z_0$ を持ち上げ変位とし、$0\le t\le\tau$ において外力の仕事、浴への熱を

$$
W_t=FY_t,\qquad
Q_{\mathrm{bath},t}=\int_0^t f(X_s)\circ dZ_s
$$

> と定める。丸印はStratonovich積分を表し、内部エネルギーは $U(X_t)$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-itd12-potential-ring -->
### 直接例：山を越えた熱と一周した仕事

初期位置は $Z_0$ とBrown運動 $B$ を独立に取り、次の一様密度から選びます。

$$
\rho_0(x)=\frac1L,\qquad
\int_0^L\rho_0(x)\,dx=1.
$$

この密度は正の $C^2$ 級周期関数です。以下の $X_0=0$ は経路を説明するために選んだ標本値です。

$U(x)=A\cos(2\pi x/L)$（$A>0$）なら、$U'(x)=-(2\pi A/L)\sin(2\pi x/L)$ です。$X_0=0$ から $X_t=L/2$ へ移動する持ち上げ軌道について $Y_t=L/2$ なら、仕事は $FL/2$、内部エネルギー変化は $-2A$、浴熱は $FL/2+2A$ となります。同じ場所 $X_0=X_t=0$ に一周して戻る経路では、$Y_t=L$ かつ $\Delta U=0$ なので $W_t=Q_{\mathrm{bath},t}=FL$ です。

**定義の確認**：この $U$ は滑らかで周期的であり、$f'=-U''$ は有界なので平均値の定理から $f$ は大域Lipschitz連続です。また $0\le Z_0<L$ より $\mathbb E[Z_0^2]<\infty$ です。したがって [STO9の大域Lipschitz SDEの存在一意性定理](../../../解析系/STO/STO9/index.md#thm-sto9-global-existence-uniqueness)を適用でき、連続な強解が一意に存在します。[STO7のStratonovich連鎖律](../../../解析系/STO/STO7/index.md#thm-sto7-stratonovich-composition)を、周期性により $U(X_t)=U(Z_t)$ とみなして適用すると $\int_0^t U'(X_s)\circ dZ_s=U(X_t)-U(X_0)$ となるので、全ての軌道で

$$
Q_{\mathrm{bath},t}
=FY_t-\{U(X_t)-U(X_0)\},
\qquad \Delta U_t=W_t-Q_{\mathrm{bath},t}
$$

が確かめられます。ここで具体的な端点は経路の実現可能性を説明するためのもので、端点を正確に取る事象が正の確率を持つと主張しているわけではありません。
<!-- definition-example-end -->

## 2. 確率密度はどの方向へ流れるか

単一軌道は揺らいでいても、多数の独立な試行における位置の確率密度 $\rho_t(x)$ は確定した時間発展をします。円周を通過する**確率流** $J_t(x)$ を、単位時間当たりに点 $x$ を右向きへ横切る正味確率とみなします。区間 $[a,b]$ 内の確率の増減は、左から入る流れと右から出る流れの差です。

以下で $U'(x)$、$f'(x)$、$\rho_0'(x)$ のプライムは位置 $x$ についての通常の導関数です。一方、$\rho_t(x)$ の下付き $t$ は**時刻を指定する添字**であって微分ではありません。$\partial_t\rho_t(x)$ は位置 $x$ を固定した時間微分、$\partial_x\rho_t(x)$ は時刻 $t$ を固定した空間微分を表します。また $C^{1,2}$ は時間について1階、空間について2階の連続偏導関数があることを意味します。

<a id="def-itd12-probability-current"></a>

<!-- formal-statement-start -->
> **定義（円周拡散の確率流）**  
> [周期ポテンシャル下のLangevin経路](#def-itd12-potential-ring)について、$\rho_t(x)$ を $L$ 周期の正の確率密度とする。確率流と連続の式を

$$
J_t(x):=\mu f(x)\rho_t(x)-D\,\partial_x\rho_t(x),
\qquad \partial_t\rho_t(x)=-\partial_xJ_t(x)
$$

> と書く。$\int_0^L\rho_t(x)\,dx=1$ とし、以下の計算では $\rho$ が $t>0$ で $C^{1,2}$ 級であるとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-itd12-probability-current -->
### 直接例：密度が偏っていても力がなければ拡散する

$U=0,F=0$、初期密度 $\rho_0(x)=\{1+\varepsilon\cos(2\pi x/L)\}/L$（$|\varepsilon|<1$）とします。$\rho_0>0$、積分は1です。$k=2\pi/L$ とおくと、定義から

$$
J_0(x)=\frac{D\varepsilon k}{L}\sin(kx),
\qquad -\partial_xJ_0(x)
=-\frac{D\varepsilon k^2}{L}\cos(kx).
$$

**定義の確認**：$|\varepsilon|<1$ なので初期密度は全点で正、余弦の一周期積分は零で規格化されます。表示した $J_0$ は $J_0=\mu f\rho_0-D\rho_0'$（ここでは $f=0$）へ実際に代入したものです。さらに時間依存の密度と流れを

$$
\rho_t(x)=\frac{1+\varepsilon e^{-Dk^2t}\cos(kx)}{L},
\qquad
J_t(x)=\frac{D\varepsilon k e^{-Dk^2t}}{L}\sin(kx)
$$

と置くと、$t\ge0$ で $\rho_t>0$、規格化と周期性が保たれ、$\rho$ は $C^{1,2}$ 級です。実際

$$
\partial_t\rho_t(x)
=-\frac{D\varepsilon k^2e^{-Dk^2t}}{L}\cos(kx)
=-\partial_xJ_t(x)
$$

なので連続の式も満たし、$t=0$ では表示した初期の値に一致します。流れを発生させるのは外力だけでなく、$-D\partial_x\rho$ という密度勾配でもあり、密度の山は低くなります。
<!-- definition-example-end -->

<a id="thm-itd12-current-and-heat"></a>

<!-- formal-statement-start -->
> **定理（確率流の保存則と平均浴熱）**  
> [定義したLangevin経路](#def-itd12-potential-ring)の密度が正で滑らかであるとする。$J_t$ は [確率流の定義](#def-itd12-probability-current)を満たし、任意の円周区間 $[a,b]$ で

$$
\frac{d}{dt}\int_a^b\rho_t(x)\,dx
=J_t(a)-J_t(b)
$$

> が成り立つ。また平均の仕事率、浴熱率、内部エネルギー率は

$$
\frac{d}{dt}\mathbb E[W_t]=F\int_0^LJ_t\,dx,
\qquad
\frac{d}{dt}\mathbb E[Q_{\mathrm{bath},t}]
=\int_0^LfJ_t\,dx,
$$

$$
\frac{d}{dt}\mathbb E[U(X_t)]
=\int_0^LU'J_t\,dx
$$

> であり、平均でも第一法則が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

まず [STO7のItô公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)を周期的な試験関数に適用すると、確率の時間変化が $J$ の微分として書けます。次にStratonovich積分をItô積分へ変換すると、平均浴熱の $D f'$ 項が、確率流の拡散項と一致します。

<!-- proof-start -->
### 証明

滑らかな $L$ 周期の関数 $\varphi$ を取ります。[STO7のItô公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)で、ドリフト $b=\mu f$、二次変動率 $2D$ を代入すると

$$
d\varphi(X_t)
=\{\mu f(X_t)\varphi'(X_t)+D\varphi''(X_t)\}\,dt
+\sqrt{2D}\varphi'(X_t)\,dB_t.
$$

導関数は円周上で有界なのでItô積分の期待値は零です。期待値を取り、周期境界で積分を一度部分積分すると

$$
\begin{aligned}
\frac{d}{dt}\int_0^L\varphi\rho_t\,dx
&=\int_0^L\{\mu f\varphi'\rho_t+D\varphi''\rho_t\}\,dx\\
&=\int_0^L\varphi'\{\mu f\rho_t-D\rho_t'\}\,dx\\
&=-\int_0^L\varphi\,\partial_xJ_t\,dx.
\end{aligned}
$$

全ての滑らかな周期的 $\varphi$ について成り立ち、密度も滑らかだから $\partial_t\rho_t=-\partial_xJ_t$ です。$[a,b]$ で積分すれば保存則が出ます。

次に $\mathbb E[dZ_t]/dt=\mu\int f\rho_t\,dx$ であり、$\int_0^L\rho_t'\,dx=0$ なので $\int J_t\,dx=\mu\int f\rho_t\,dx$ です。従って仕事率は $F\int J_t$ です。

[STO7のItô--Stratonovich変換](../../../解析系/STO/STO7/index.md#thm-sto7-ito-stratonovich-conversion)を使うと、$d[f(X),Z]_t=2D f'(X_t)\,dt$ から

$$
f(X_t)\circ dZ_t=f(X_t)\,dZ_t+D f'(X_t)\,dt
$$

となります。期待値を取って周期的部分積分 $\int f'\rho=-\int f\rho'$ を行うと

$$
\begin{aligned}
\frac{d}{dt}\mathbb E[Q_{\mathrm{bath},t}]
&=\mu\int_0^Lf^2\rho_t\,dx+D\int_0^Lf'\rho_t\,dx\\
&=\int_0^Lf(\mu f\rho_t-D\rho_t')\,dx
=\int_0^LfJ_t\,dx.
\end{aligned}
$$

$U(X_t)$ の期待値の微分も $\int U\,\partial_t\rho=-\int UJ'=\int U'J$ です。差を取れば

$$
F\int J-\int fJ=\int (F-f)J=\int U'J,
$$

すなわち平均の第一法則です。
<!-- proof-end -->

## 3. 流れの平方が散逸になる

次の問いは、同じ密度 $\rho$ があっても右向きの流れが残ると、どれだけ不可逆かということです。系のShannonエントロピーは連続密度の対数を含むので、長さの単位に依存しないよう $L\rho$ を対数の引数にします。$L$ は固定なので、その時間微分には影響しません。

<a id="def-itd12-entropy-production"></a>

<!-- formal-statement-start -->
> **定義（平均全エントロピー生成率）**  
> 正で滑らかな $L$ 周期密度 $\rho_t$ について、系の無次元エントロピーと、浴および全体の平均エントロピー生成率を

$$
H_t=-\int_0^L\rho_t(x)\log\{L\rho_t(x)\}\,dx,
\qquad
\dot\Sigma_{\mathrm{bath}}(t)=\beta\int_0^LfJ_t\,dx,
$$

$$
\dot\Sigma_{\mathrm{tot}}(t)
=\frac{dH_t}{dt}+\dot\Sigma_{\mathrm{bath}}(t)
$$

> と定める。$k_{\mathrm B}H_t$ は系の熱力学的エントロピー、$\dot\Sigma$ はnat/時間単位である。浴の項は平均浴熱率を $k_{\mathrm B}T$ で割った値であり、単独では負になってもよい。
<!-- formal-statement-end -->

<!-- definition-example-start: def-itd12-entropy-production -->
### 直接例：一様密度でも定常的に熱を捨てる

$U=0$、$F\ne0$、$\rho_t=1/L$ では $J_t=\mu F/L$ は一定なので $dH_t/dt=0$ です。一方

$$
\dot\Sigma_{\mathrm{bath}}
=\beta\int_0^LF\frac{\mu F}{L}\,dx
=\beta\mu F^2>0.
$$

**定義の確認**： $\rho=1/L$ は全点で正で規格化され、$J$ は $x$ に依存しないため連続の式も $\partial_t\rho=0$ として成立します。$H=-\int_0^L(1/L)\log1\,dx=0$ は一定です。従って定義した各条件は満たされ、外力による正味の周回流と、浴へ捨て続ける熱が両立します。$F=0$ なら同じ一様密度のもとで流れも散逸も零です。
<!-- definition-example-end -->

<a id="thm-itd12-entropy-balance"></a>

<!-- formal-statement-start -->
> **定理（確率流の平方による第二法則と仕事収支）**  
> [Langevin模型](#def-itd12-potential-ring)の密度 $\rho_t$ が正で滑らかとする。確率流 $J_t$ に対し

$$
\dot\Sigma_{\mathrm{tot}}(t)
=\int_0^L\frac{J_t(x)^2}{D\rho_t(x)}\,dx\ge0
$$

> が成り立ち、等号は $J_t(x)=0$ が全ての $x$ で成り立つとき、かつそのときに限る。さらに連続密度の非平衡自由エネルギーを

$$
\mathcal F[\rho_t]
=\int_0^L\rho_tU\,dx
+k_{\mathrm B}T\int_0^L\rho_t\log(L\rho_t)\,dx
$$

> とすると、固定された $U,F,T$ について

$$
\frac{d}{dt}\mathcal F[\rho_t]
=F\int_0^LJ_t\,dx
-k_{\mathrm B}T\dot\Sigma_{\mathrm{tot}}(t).
$$

> 特に $F=0$ なら $\mathcal F$ は非増加である。
<!-- formal-statement-end -->

### 証明の見取り図

密度保存則から $dH/dt=-\int J\,\partial_x\log\rho$ を導きます。これに浴熱率を足すと、$\beta f-\partial_x\log\rho=J/(D\rho)$ が現れます。自由エネルギーの式は、平均内部エネルギーの変化から $k_{\mathrm B}T$ 倍の系エントロピー変化を引くと得られます。

<!-- proof-start -->
### 証明

$\int_0^L\partial_t\rho_t\,dx=0$ なので、$\log(L\rho)$ の微分に伴う追加の $\int\partial_t\rho$ は消えます。[保存則](#thm-itd12-current-and-heat)と周期境界での部分積分から

$$
\begin{aligned}
\frac{dH_t}{dt}
&=-\int_0^L\partial_t\rho_t\log(L\rho_t)\,dx\\
&=\int_0^L\partial_xJ_t\log(L\rho_t)\,dx\\
&=-\int_0^LJ_t\,\partial_x\log\rho_t\,dx.
\end{aligned}
$$

同じ [保存則と浴熱率](#thm-itd12-current-and-heat)で $\dot\Sigma_{\mathrm{bath}}=\beta\int fJ$ だから

$$
\dot\Sigma_{\mathrm{tot}}
=\int_0^LJ_t\{\beta f-\partial_x\log\rho_t\}\,dx.
$$

冒頭で固定した関係 $D=\mu/\beta$ を [確率流の定義](#def-itd12-probability-current) に代入すると

$$
J_t=\mu f\rho_t-D\rho_t'
=D\rho_t\{\beta f-\partial_x\log\rho_t\}.
$$

$D\rho_t>0$ なので括弧を $J_t/(D\rho_t)$ に置き換えられ、平方積分になることと等号条件が分かります。

次に $\mathcal F=\mathbb E[U(X_t)]-k_{\mathrm B}TH_t$ を微分します。第一法則より

$$
\frac{d\mathcal F}{dt}
=\frac{d}{dt}\mathbb E[W_t]
-\frac{d}{dt}\mathbb E[Q_{\mathrm{bath},t}]
-k_{\mathrm B}T\frac{dH_t}{dt}.
$$

右辺後二項の和は $-k_{\mathrm B}T\dot\Sigma_{\mathrm{tot}}$ で、仕事率は $F\int J$ です。結論の収支が得られます。
<!-- proof-end -->

ここで第二法則は**平均**の評価です。各軌道に対して浴熱が常に正だという意味ではありません。またこの章ではITD11の一般位置依存版の経路Radon--Nikodym比を証明したわけではなく、時間・空間について微分可能な確率密度と確率流から平均散逸を導いています。

## 4. 分布が定常でも流れは消えない

定常状態とは $\partial_t\rho=0$ のことです。[連続の式](#def-itd12-probability-current)から $\partial_xJ=0$、すなわち $J$ が場所に依存しないことは分かります。しかし $J=0$ とは限りません。この違いを解の公式まで求めて確かめます。

この連続拡散模型では、定常状態で**各位置の正味確率流が零**という条件を詳細釣合いの判定条件として使います。これは有限状態ジャンプ模型での[局所詳細釣合い](../ITD1/index.md#def-itd1-local-detailed-balance)の遷移確率比を、そのまま拡散へ代入するという意味ではありません。

<a id="prop-itd12-equilibrium"></a>

<!-- formal-statement-start -->
> **命題（零駆動の平衡密度と詳細釣合い）**  
> [Langevin模型](#def-itd12-potential-ring)で $F=0$ とすると、唯一の正の定常確率密度は

$$
\pi(x)=\frac{e^{-\beta U(x)}}{Z_U},
\qquad Z_U=\int_0^Le^{-\beta U(y)}\,dy
$$

> であり、その確率流は零である。逆に固定 $U$ の定常状態で $J=0$ なら $F=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$J=0$ の微分方程式を解けばBoltzmann型の密度が現れます。$J=0$ なら周期の一周で外力がした仕事 $FL$ は零でなくてはならないことも確認します。

<!-- proof-start -->
### 証明

$F=0$ として $J=0$ を課すと

$$
0=-\mu U'\rho-D\rho',
\qquad \frac{\rho'}{\rho}=-\beta U'.
$$

積分して $\log\rho(x)=-\beta U(x)+C$、規格化で $C=-\log Z_U$ を得ます。この $\pi$ を[確率流の定義](#def-itd12-probability-current)へ戻すと $\pi'=-\beta U'\pi$ だから $J=-\mu U'\pi+D\beta U'\pi=0$ です。

一方、定常で $J=0$ なら一般に $\partial_x\log\rho=\beta(F-U')$ です。$0$ から $L$ まで積分すると、$\rho(L)=\rho(0)$、$U(L)=U(0)$ より左辺も $U'$ の積分も零で、$0=\beta FL$。$\beta,L>0$ より $F=0$ です。$F=0$ の定常状態では $J$ は定数であり、$J=-D e^{-\beta U}(e^{\beta U}\rho)'$ です。これを一周積分して

$$
0=[e^{\beta U}\rho]_0^L
=-\frac{J}{D}\int_0^Le^{\beta U(x)}\,dx
$$

となります。積分は正だから $J=0$、よって正規化した $\pi$ が唯一です。
<!-- proof-end -->

<a id="thm-itd12-steady-current"></a>

<!-- formal-statement-start -->
> **定理（周期ポテンシャルを流れる定常確率流）**  
> [Langevin模型](#def-itd12-potential-ring)で固定した $F\in\mathbb R$、$L$ 周期の $C^3$ ポテンシャル $U$ を取る。実数上の関数とその周期的な積分因子を

$$
\Psi(x)=\beta\{U(x)-Fx\},\qquad
R(x)=e^{-\Psi(x)}\int_x^{x+L}e^{\Psi(y)}\,dy
$$

> とする。このとき唯一の正の定常確率密度 $\rho_*$ と一定の定常流 $J_*$ は

$$
\rho_*(x)=\frac{R(x)}{\int_0^LR(z)\,dz},
\qquad
J_*=\frac{D(1-e^{-\beta FL})}{\int_0^LR(z)\,dz}.
$$

> $F=0$ では $J_*=0$、$F\ne0$ では $J_*$ の符号は $F$ と一致し、その平均全エントロピー生成率は

$$
\dot\Sigma_*=\beta FLJ_*>0\qquad(F\ne0)
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

定常の連続の式によって $J_*$ は定数です。$\rho'=\beta(F-U')\rho-J_*/D$ は一階線形方程式なので、積分因子 $e^{\Psi}$ を掛けて一周の境界条件を使います。正規化で定数を決め、散逸の式では周期的な対数微分が消えることを利用します。

<!-- proof-start -->
### 証明

定常状態で $J_*$ は定数です。[確率流の定義](#def-itd12-probability-current)を $\rho'$ について解くと

$$
\rho_*'=\beta(F-U')\rho_*-J_*/D
=-\Psi'\rho_*-J_*/D.
$$

両辺に $e^{\Psi}$ を掛けると

$$
\frac{d}{dx}\{e^{\Psi(x)}\rho_*(x)\}
=-\frac{J_*}{D}e^{\Psi(x)}.
$$

これを $x$ から $x+L$ まで積分します。$\rho_*(x+L)=\rho_*(x)$、$\Psi(x+L)=\Psi(x)-\beta FL$ なので

$$
\{e^{-\beta FL}-1\}e^{\Psi(x)}\rho_*(x)
=-\frac{J_*}{D}\int_x^{x+L}e^{\Psi(y)}\,dy.
$$

$F\ne0$ なら両辺を整理して $\rho_*(x)=J_*R(x)/\{D(1-e^{-\beta FL})\}$ です。$\int_0^L\rho_*=1$ で規格化すると定理の二式が得られます。

$F=0$ の場合に上の割り算は使えませんが、$J_*=0$ として [平衡密度](#prop-itd12-equilibrium)を直接得ます。この場合、周期性から $\int_x^{x+L}e^{\beta U(y)}\,dy=\int_0^Le^{\beta U(y)}\,dy$ なので $R(x)$ は $e^{-\beta U(x)}$ に比例します。また $F\to0$ では有限区間上で指数関数の被積分関数が連続に変化し、$\int_0^LR$ は正の極限を持ちます。したがって $J_*\to0$ となり、密度の公式も $F=0$ へ連続的に延長できます。

どの $F$ でも $R(x)>0$ です。さらに $y=z+L$ と置換し、$\Psi(z+L)=\Psi(z)-\beta FL$ を使うと

$$
\begin{aligned}
R(x+L)
&=e^{-\Psi(x+L)}\int_{x+L}^{x+2L}e^{\Psi(y)}\,dy\\
&=e^{-\Psi(x)+\beta FL}\int_x^{x+L}e^{\Psi(z)-\beta FL}\,dz
=R(x).
\end{aligned}
$$

従って提示した $\rho_*$ は正で周期的、規格化されています。積分因子の微分を逆にたどればその流れは $J_*$ です。一階方程式は $F\ne0$ では周期条件と規格化で、$F=0$ では $J_*=0$ と規格化で解が唯一に定まります。

分母が正なので $J_*$ の符号は $1-e^{-\beta FL}$、従って $F$ と一致します。[平方による第二法則](#thm-itd12-entropy-balance)の途中式を定常密度へ適用すると

$$
\begin{aligned}
\dot\Sigma_*
&=\int_0^LJ_*\{\beta(F-U')-\partial_x\log\rho_*\}\,dx\\
&=J_*\{\beta FL-\beta(U(L)-U(0))
-\log\rho_*(L)+\log\rho_*(0)\}\\
&=\beta FLJ_*.
\end{aligned}
$$

$F\ne0$ なら $FJ_*>0$ で結論を得ます。
<!-- proof-end -->

この定常状態では $H_t$ も $\mathbb E[U(X_t)]$ も一定です。にもかかわらず

$$
\frac{d}{dt}\mathbb E[W_t]=FLJ_*,\qquad
\frac{d}{dt}\mathbb E[Q_{\mathrm{bath},t}]=FLJ_*
$$

となり、外部から受け取った仕事が全て熱浴へ流れます。これは「定常だから可逆」という誤解に対する反例です。

## 5. 特殊例と適用の境界

- **平坦な円周 $U=0$：** $R(x)=(1-e^{-\beta FL})/(\beta F)$（$F=0$ では極限 $L$）が $x$ に依存しないため、$\rho_*=1/L$、$J_*=\mu F/L$ です。[ITD11の一定駆動模型](../ITD11/index.md#def-itd11-driven-ring)を回収し、$\dot\Sigma_*=\beta\mu F^2$ になります。
- **駆動なし $F=0$：** 定常分布は $e^{-\beta U}/Z_U$ で、定常散逸は零です。ただし初期密度が平衡からずれている時間帯には $J_t\ne0$ となり、$\mathcal F$ は散逸に応じて減少します。
- **一般の拡散係数 $D(x)$：** 本章の $J=\mu f\rho-D\rho'$ やStratonovich補正をそのまま使うことはできません。拡散率に依存するドリフト規約と浴の模型を明示する必要があります。
- **境界・測定・量子系：** 非周期境界では部分積分の端点流が残ります。粗視化や測定を入れる場合は観測の条件付き分布、量子系では測定反作用と非可換性を別途扱います。この章の平均散逸公式だけで一般の経路ゆらぎ関係や量子版第二法則を証明したことにはなりません。

## 6. 演習：力・流れ・散逸を別々に検算する

特記しない限り $L,\mu,T>0$、$D=\mu k_{\mathrm B}T$、$\beta=(k_{\mathrm B}T)^{-1}$ で、全ての関数は $L$ 周期とします。この節の $\dot H$ は $dH_t/dt$、$\dot W$ と $\dot Q_{\mathrm{bath}}$ はそれぞれ $d\mathbb E[W_t]/dt$ と $d\mathbb E[Q_{\mathrm{bath},t}]/dt$ の略記です。後二者は**平均の率**であり、確率的な各軌道の時間微分ではありません。

### A1. 保存力と外力を分ける

- Level: A
- ID: ITD12-A1
- 問題: $U(x)=A\cos(2\pi x/L)$、$A>0$、$F\in\mathbb R$ とする。$X_0=0$ から持ち上げ変位 $Y=L/2$ で $X_t=L/2$ へ達した経路の $W,\Delta U,Q_{\mathrm{bath}}$ を求めよ。また $F=0$ のときの熱の符号を説明せよ。

<!-- solution-start -->
**詳細解答**

$U(0)=A$、$U(L/2)=A\cos\pi=-A$ なので $\Delta U=-2A$ です。[仕事と熱の定義](#def-itd12-potential-ring)へ $Y=L/2$ を代入すると

$$
W=FL/2,\qquad Q_{\mathrm{bath}}=W-\Delta U=FL/2+2A.
$$

$F=0$ では外から仕事が入らず、内部エネルギーが $2A$ 減るので浴へ $2A$ の熱が出ます。$Q_{\mathrm{bath}}>0$ が系から浴へ出る向きです。
<!-- solution-end -->

### A2. 平坦な円周の密度勾配

- Level: A
- ID: ITD12-A2
- 問題: $U=F=0$、$k=2\pi/L$、$\rho_0(x)=(1+\varepsilon\cos kx)/L$、$0<\varepsilon<1$ とする。$J_0(x)$ と $\partial_t\rho_t(x)|_{t=0}$ を求め、密度の山 $x=0$ の変化の符号を述べよ。

<!-- solution-start -->
**詳細解答**

$\rho_0'=-\varepsilon k\sin kx/L$ で、力は零です。[確率流の定義](#def-itd12-probability-current)と連続の式から

$$
J_0=-D\rho_0'=\frac{D\varepsilon k}{L}\sin kx,
\qquad \partial_t\rho|_0=-J_0'=-\frac{D\varepsilon k^2}{L}\cos kx.
$$

$x=0$ では $\cos0=1$ なので時間微分は負です。正規化は $\int_0^L\partial_t\rho|_0dx=0$ で保たれます。
<!-- solution-end -->

### A3. Boltzmann密度の流れ

- Level: A
- ID: ITD12-A3
- 問題: $F=0$、$U$ は滑らかで周期的、$\pi(x)=Z_U^{-1}e^{-\beta U(x)}$ とする。$\int_0^L\pi=1$ を示し、$J[\pi]$ を直接計算せよ。ここで $J[\pi]$ は[確率流の定義](#def-itd12-probability-current)の密度に $\pi$ を代入したものを表す。

<!-- solution-start -->
**詳細解答**

$Z_U=\int_0^Le^{-\beta U(y)}dy$ は正かつ有限なので、$\pi$ は正で積分1です。[確率流の定義](#def-itd12-probability-current)へ代入するため微分して $\pi'=-\beta U'\pi$ を得ます。従って

$$
J[\pi]=-\mu U'\pi-D\pi'
=(-\mu+D\beta)U'\pi=0
$$

です。最後は $D\beta=\mu$ を使っています。
<!-- solution-end -->

### A4. 一様定常でも正の散逸

- Level: A
- ID: ITD12-A4
- 問題: $U=0$、$F\ne0$、$\rho=1/L$ の定常模型で $J$、平均仕事率、平均浴熱率、全エントロピー生成率を求め、単位を検算せよ。

<!-- solution-start -->
**詳細解答**

確率流は $J=\mu F/L$、密度が不変なので $dH/dt=0$ です。[平均熱の式](#thm-itd12-current-and-heat)から

$$
\frac{d}{dt}\mathbb E[W_t]
=\frac{d}{dt}\mathbb E[Q_{\mathrm{bath},t}]
=F\int_0^LJdx=\mu F^2.
$$

従って $\dot\Sigma=\beta\mu F^2$ です。$\mu F$ は長さ/時間、$F$ はエネルギー/長さなので $\mu F^2$ はエネルギー/時間。$\beta$ を掛けると無次元/時間です。
<!-- solution-end -->

### A5. Stratonovich補正の出所

- Level: A
- ID: ITD12-A5
- 問題: $dZ=\mu f(X)dt+\sqrt{2D}dB$ で $f\in C^2$ が周期的であるとき、$f(X)\circ dZ=f(X)dZ+D f'(X)dt$ を共変分から導き、$\int fJ=\mu\int f^2\rho+D\int f'\rho$ を示せ。

<!-- solution-start -->
**詳細解答**

$f\in C^2$ なので [STO7の多次元Itô公式](../../../解析系/STO/STO7/index.md#thm-sto7-multidimensional-ito)を $f(X)$ に適用できます。$f(X)$ のBrown運動係数は $\sqrt{2D}f'(X)$、$Z$ の係数は $\sqrt{2D}$ なので、[共変分連鎖律](../../../解析系/STO/STO7/index.md#lem-sto7-covariation-composition)より

$$
d[f(X),Z]_t=f'(X_t)\,d[Z,Z]_t
=2Df'(X_t)\,dt.
$$

[STO7のItô--Stratonovich変換](../../../解析系/STO/STO7/index.md#thm-sto7-ito-stratonovich-conversion)は共変分の半分を足すので、$f(X)\circ dZ=f(X)dZ+Df'(X)dt$ です。

Itô積分項の期待値は零なので、$d\mathbb E[\int_0^t f(X_s)\,dZ_s]/dt=\mu\int_0^Lf^2\rho_t\,dx$ です。一方、[確率流の定義](#def-itd12-probability-current)の $J=\mu f\rho-D\partial_x\rho$ に $f$ を掛けて積分すると

$$
\int_0^LfJ\,dx
=\mu\int_0^Lf^2\rho\,dx-D\int_0^Lf\rho'\,dx
=\mu\int_0^Lf^2\rho\,dx+D\int_0^Lf'\rho\,dx.
$$

周期境界で $[f\rho]_0^L=0$ となることが最後の等号の条件です。
<!-- solution-end -->

### B1. エントロピーの符号を再導出する

- Level: B
- ID: ITD12-B1
- 問題: 正で滑らかな周期密度について、$H=-\int\rho\log(L\rho)$ の時間微分から $\dot\Sigma_{\mathrm{tot}}=\int J^2/(D\rho)$ を導き、等号条件を述べよ。途中の部分積分とEinstein関係を明示せよ。

<!-- solution-start -->
**詳細解答**

[確率流の保存則](#thm-itd12-current-and-heat)を $\partial_t\rho=-\partial_xJ$ と書き、規格化の時間微分 $\int_0^L\partial_t\rho\,dx=0$ を用います。ここで $\rho_t$ の添字は時刻で、$\partial_t\rho$ と混同しません。周期境界で部分積分すると、

$$
\dot H=-\int_0^L\partial_t\rho\log(L\rho)\,dx
=\int_0^L(\partial_xJ)\log(L\rho)\,dx
=-\int_0^LJ\frac{\partial_x\rho}{\rho}\,dx.
$$

[平均浴熱率](#thm-itd12-current-and-heat)は $\int_0^LfJ\,dx$ だから、[平均全エントロピー生成率](#def-itd12-entropy-production)より

$$
\dot\Sigma_{\mathrm{tot}}
=\int_0^LJ\left(\beta f-\frac{\partial_x\rho}{\rho}\right)\,dx.
$$

$D\beta=\mu$ より $D\rho(\beta f-\partial_x\rho/\rho)=\mu f\rho-D\partial_x\rho=J$ です。$D\rho>0$ なので $\dot\Sigma_{\mathrm{tot}}=\int_0^L J^2/(D\rho)\,dx\ge0$。連続な非負被積分関数の積分が零なのは $J$ が各点で零の場合に限ります。
<!-- solution-end -->

### B2. 一階方程式から定常流を求める

- Level: B
- ID: ITD12-B2
- 問題: $\Psi=\beta(U-Fx)$ とおく。定常の $J_*$ が定数であることを使い、$\rho_*'= -\Psi'\rho_*-J_*/D$ の積分因子法から $R(x)$ および $J_*$ の公式を求めよ。$F=0$ を途中で割り算せず別に扱え。

<!-- solution-start -->
**詳細解答**

[連続の式](#def-itd12-probability-current)の定常条件 $0=-J_*'$ より $J_*$ は一定です。$\Psi'=\beta(U'-F)$ なので与式へ $e^\Psi$ を掛けると $(e^\Psi\rho_*)'=-(J_*/D)e^\Psi$ です。$x$ から $x+L$ まで積分し、$\Psi(x+L)=\Psi(x)-\beta FL$ を使うと

$$
(e^{-\beta FL}-1)e^{\Psi(x)}\rho_*(x)
=-(J_*/D)\int_x^{x+L}e^{\Psi(y)}dy.
$$

$F\ne0$ では $\rho_*=J_*R/\{D(1-e^{-\beta FL})\}$、$R=e^{-\Psi}\int_x^{x+L}e^{\Psi}$。$\int\rho_*=1$ から $J_*=D(1-e^{-\beta FL})/\int R$、よって $\rho_*=R/\int R$ です。

$F=0$ なら周期性から $J_*\int_x^{x+L}e^{\beta U(y)}dy=0$、積分が正なので $J_*=0$ です。すると $\rho_*=Z_U^{-1}e^{-\beta U}$ が得られ、公式も連続的に成り立ちます。
<!-- solution-end -->

### B3. 初期一様分布は平衡とは限らない

- Level: B
- ID: ITD12-B3
- 問題: $F=0$、$U=A\cos(kx)$、$k=2\pi/L$、$A\ne0$ とし、$\rho_0=1/L$ から運動を始める。初期の流れ $J_0(x)$、$\dot H_0$、浴熱率、全散逸率を求めよ。

<!-- solution-start -->
**詳細解答**

$f=-U'=Ak\sin(kx)$ なので

$$
J_0(x)=\mu f/L=\frac{\mu Ak}{L}\sin(kx).
$$

$\rho_0'=0$ だから[エントロピー収支](#thm-itd12-entropy-balance)の導出式より $\dot H_0=-\int_0^LJ_0(\rho_0'/\rho_0)\,dx=0$ です。[平均浴熱率](#thm-itd12-current-and-heat)は

$$
\int_0^LfJ_0\,dx
=\frac{\mu A^2k^2}{L}\int_0^L\sin^2(kx)dx
=\frac{\mu A^2k^2}{2}.
$$

従って $\dot\Sigma_0=\beta\mu A^2k^2/2>0$ です。別に平方公式でも

$$
\int_0^L\frac{J_0^2}{D\rho_0}dx
=\frac{\mu^2 A^2 k^2}{DL}\frac L2
=\frac{\beta\mu A^2k^2}{2},
$$

となります。初期密度が一様でも、$U$ が一定でなければ定常ではありません。
<!-- solution-end -->

### B4. 駆動の向きと散逸の向き

- Level: B
- ID: ITD12-B4
- 問題: $U$ を任意の滑らかな周期ポテンシャルとし、$F\ne0$ の定常密度を考える。確率流の式を一周積分して $\dot\Sigma_*=\beta FLJ_*$ を再導出し、$F<0$ でも散逸が正となる理由を述べよ。

<!-- solution-start -->
**詳細解答**

$J_*=D\rho_*(\beta(F-U')-\partial_x\log\rho_*)$ なので

$$
\begin{aligned}
\dot\Sigma_*
&=\int_0^LJ_*\{\beta(F-U')-\partial_x\log\rho_*\}\,dx\\
&=J_*\left(\beta FL-\beta\int_0^LU'dx
-\int_0^L\partial_x\log\rho_*dx\right)=\beta FLJ_*.
\end{aligned}
$$

最後の二積分は $U$ と $\rho_*$ が周期的なので零です。[定常流の公式](#thm-itd12-steady-current)の分子 $1-e^{-\beta FL}$ は $F$ と同符号、分母は正です。従って $F<0$ なら $J_*<0$ ですが、積 $FJ_*$ は正です。
<!-- solution-end -->

### C1. 平衡と非平衡定常を一枚の収支表にする

- Level: C
- ID: ITD12-C1
- 問題: 固定 $U,F$ の円周Langevin拡散について、次の3項目をそれぞれ定義から導け。

  1. 確率流と平均浴熱率。
  2. 平均エントロピー生成と自由エネルギー収支。
  3. 定常密度・定常流と $F=0$ および $U=0$ の極限。

  さらに $F\ne0$ で定常でも散逸が零にならない理由を、仕事・熱と自由エネルギーの両方の収支式で確認せよ。

<!-- solution-start -->
**詳細解答**

**(i) 保存則と熱。** $f=F-U'$ と置き、滑らかな周期試験関数 $\varphi$ に[STO7のItô公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)を適用します。ドリフトは $\mu f$、二次変動率は $2D$ なので、Itô積分の平均が零であることから

$$
\frac{d}{dt}\int_0^L\varphi\rho\,dx
=\int_0^L(\mu f\varphi'+D\varphi'')\rho\,dx
=\int_0^L\varphi'(\mu f\rho-D\partial_x\rho)\,dx.
$$

周期境界で再び部分積分すると、全ての $\varphi$ に対して上式は $-\int\varphi\,\partial_xJ$ に等しいため、

$$
J=\mu f\rho-D\partial_x\rho,\qquad
\partial_t\rho=-\partial_xJ
$$

を得ます。次に[STO7のItô--Stratonovich変換](../../../解析系/STO/STO7/index.md#thm-sto7-ito-stratonovich-conversion)を使います。二次共変分 $d[f(X),Z]_t=2Df'(X_t)\,dt$ の半分が補正となるので

$$
\begin{aligned}
\dot Q_{\mathrm{bath}}
&=\mu\int_0^Lf^2\rho\,dx+D\int_0^Lf'\rho\,dx\\
&=\int_0^Lf(\mu f\rho-D\partial_x\rho)\,dx
=\int_0^LfJ\,dx.
\end{aligned}
$$

第二の等号は周期境界で $[f\rho]_0^L=0$ として部分積分したものです。また $\int_0^L\partial_x\rho\,dx=0$ より

$$
\dot W=F\mu\int_0^Lf\rho\,dx
=F\int_0^LJ\,dx.
$$

内部エネルギー率は保存則から

$$
\frac{d}{dt}\mathbb E[U(X_t)]
=\int_0^LU\partial_t\rho\,dx
=\int_0^LU'J\,dx
=\dot W-\dot Q_{\mathrm{bath}}.
$$

**(ii) 第二法則と自由エネルギー。** 密度の規格化から $\int_0^L\partial_t\rho\,dx=0$ なので、$\rho\log(L\rho)$ の微分で出る $+1$ の項は消えます。保存則と周期境界を使うと

$$
\dot H=-\int_0^L\partial_t\rho\log(L\rho)\,dx
=\int_0^L(\partial_xJ)\log(L\rho)\,dx
=-\int_0^LJ\partial_x\log\rho\,dx.
$$

浴の寄与 $\beta\dot Q_{\mathrm{bath}}$ と足し、Einstein関係 $D\beta=\mu$ を使って

$$
\begin{aligned}
\dot\Sigma_{\mathrm{tot}}
&=\int_0^LJ(\beta f-\partial_x\log\rho)\,dx,\\
D\rho(\beta f-\partial_x\log\rho)
&=\mu f\rho-D\partial_x\rho=J,\\
\dot\Sigma_{\mathrm{tot}}
&=\int_0^L\frac{J^2}{D\rho}\,dx\ge0.
\end{aligned}
$$

$D\rho>0$ の下で積分が零になるのは連続な $J$ が全点で零の場合だけです。$\mathcal F=\mathbb E U-k_{\mathrm B}TH$ を微分し、(i) の第一法則を代入すると

$$
\dot{\mathcal F}
=\dot W-\dot Q_{\mathrm{bath}}-k_{\mathrm B}T\dot H
=F\int_0^LJ\,dx-k_{\mathrm B}T\dot\Sigma_{\mathrm{tot}}.
$$

**(iii) 定常解と二つの極限。** 定常条件 $\partial_t\rho_*=0$ から $J_*$ は $x$ に依存しません。$\Psi(x)=\beta\{U(x)-Fx\}$ と置き、確率流の式を $\rho_*'$ について解いて $e^\Psi$ を掛けると

$$
\rho_*'=-\Psi'\rho_*-J_*/D,\qquad
(e^{\Psi}\rho_*)'=-(J_*/D)e^{\Psi}.
$$

$x$ から $x+L$ へ積分し、$\rho_*(x+L)=\rho_*(x)$ と $\Psi(x+L)=\Psi(x)-\beta FL$ を使えば

$$
(1-e^{-\beta FL})e^{\Psi(x)}\rho_*(x)
=\frac{J_*}{D}\int_x^{x+L}e^{\Psi(y)}\,dy.
$$

$F\ne0$ の場合、右の正の積分と規格化 $\int_0^L\rho_*=1$ から

$$
R(x)=e^{-\Psi(x)}\int_x^{x+L}e^{\Psi(y)}\,dy,\qquad
\rho_*(x)=\frac{R(x)}{\int_0^LR(z)\,dz},\qquad
J_*=\frac{D(1-e^{-\beta FL})}{\int_0^LR(z)\,dz}.
$$

$F=0$ では $1-e^{-\beta FL}$ で割らず、積分した式から $J_*\int_x^{x+L}e^{\beta U(y)}\,dy=0$ を得ます。積分は正なので $J_*=0$、したがって $(e^{\beta U}\rho_*)'=0$ から $\rho_*=e^{-\beta U}/Z_U$ です。これは上の $R$ の公式にも一致し、$F\to0$ の極限です。

$U=0,F\ne0$ なら指数を直接積分して $R(x)=(1-e^{-\beta FL})/(\beta F)$ は一定です。よって $\rho_*=1/L$、

$$
J_*=\frac{D\beta F}{L}=\frac{\mu F}{L}.
$$

$F=0$ では $R=L$ として同じ結果の極限 $J_*=0$ を得ます。

定常では $\dot H=d\mathbb E[U(X_t)]/dt=\dot{\mathcal F}=0$ です。(i) の熱・仕事収支と (ii) の自由エネルギー収支はそれぞれ

$$
\dot Q_{\mathrm{bath}}=\dot W=FLJ_*,
\qquad
k_{\mathrm B}T\dot\Sigma_*=FLJ_*
$$

となります。別途 $\dot\Sigma_*=\int_0^LJ_*\{\beta(F-U')-\partial_x\log\rho_*\}\,dx$ を一周積分しても、$U,\rho_*$ の周期性から $\dot\Sigma_*=\beta FLJ_*$ です。定常公式の分母は正、分子 $1-e^{-\beta FL}$ は $F$ と同符号なので、$F\ne0$ では $FJ_*>0$ となり、定常と正の散逸が両立します。
<!-- solution-end -->

## 7. 学習のまとめ

ITD11で経路全体の比を求めた一定駆動拡散を、周期ポテンシャルのある模型へ拡張しました。今回は **確率流 $J$ を計算し、浴熱とShannonエントロピー変化を結び付ける**ことで、平均第二法則を

$$
\dot\Sigma_{\mathrm{tot}}=\int_0^L\frac{J^2}{D\rho}\,dx\ge0
$$

と可視化できました。定常状態でも外力の周回流があれば仕事が浴熱へ流れ続けます。次に連続過程の一般的な経路ゆらぎ関係や、位置依存拡散・量子測定へ進むには、それぞれ確率測度の対応、拡散規約、測定の物理モデルを改めて定める必要があります。
