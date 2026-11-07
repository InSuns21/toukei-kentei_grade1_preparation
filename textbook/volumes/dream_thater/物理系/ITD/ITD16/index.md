# ITD16 慣性から位置拡散へ：Smoluchowski–Kramers極限と消えない運動エネルギー

<!-- definition-example-audit: strict -->

[ITD15の慣性付きLangevin実験](../ITD15/index.md#def-itd15-inertial-langevin)では位置 $Z_t$ と速度 $V_t$ を同時に追い、[ITD14の等温位置拡散](../ITD14/index.md#def-itd14-isothermal-diffusion)では位置だけを追いました。摩擦が速度を速く緩和させると、位置だけの模型が現れそうです。けれども、**位置が近づくことと、熱まで近づくことは同じでしょうか。**

この章では一般の力場を一足飛びに扱わず、一定外力の自由粒子を厳密に解きます。質量 $m$ を小さくすると位置の運動はBrown運動を持つ過減衰模型へ収束します。その一方、速度の大きさは $m^{-1/2}$ 程度なので、運動エネルギー $mV^2/2$ は消えません。この違いを変位、仕事、熱、エントロピー生成という四つの帳簿で確認します。

## 1. 解ける模型で速い速度を残しておく

質量 $m>0$、摩擦 $\gamma>0$、逆温度 $\beta=(k_{\mathrm B}T)^{-1}>0$、一定の外力 $F\in\mathbb R$ を固定します。長さ $L>0$ の円周上の位置を $X_t=Z_t\pmod L$ と表し、$Z_t$ は一周回数を失わない実数への持ち上げです。摩擦の時間尺度を $m/\gamma$、力が釣り合う平均速度を $F/\gamma$ と見込んでおきます。

この二つをそれぞれ $a=\gamma/m$、$u=F/\gamma$ と記します。以下で「平衡初期速度」は、力を加える**直前**の浴と平衡なMaxwell分布を意味し、力を加えた後の定常分布ではありません。

<a id="def-itd16-constant-force"></a>

<!-- formal-statement-start -->
> **定義（一定力の慣性付き実験）**  
> $m,\gamma,\beta,L>0$、$F\in\mathbb R$、観測時間 $\tau>0$ を固定する。Brown運動 $B$ と独立な初期位置 $X_0$ は円周上で密度 $1/L$ を持ち、初期速度 $V_0$ は $X_0,B$ と独立とする。位置の持ち上げ $Z_0\in[0,L)$ は $X_0$ に対応させ、力 $F$ の慣性付き実験を

$$
\begin{aligned}
dZ_t&=V_t\,dt,\qquad X_t=Z_t\pmod L,\\
m\,dV_t&=(F-\gamma V_t)\,dt+\sqrt{2\gamma/\beta}\,dB_t
\end{aligned}
$$

> で定める。初期速度として次の二通りを区別する。
>
> - 平衡初期化：$V_0\sim N(0,1/(\beta m))$。
> - 駆動定常初期化：$V_0\sim N(u,1/(\beta m))$、ただし $u=F/\gamma$。
>
> 外部がした仕事、浴へ放出した熱、運動エネルギーは

$$
W_t=F(Z_t-Z_0),\qquad
K_t=\frac m2V_t^2,\qquad
Q_t^{\mathrm{bath}}=W_t-(K_t-K_0)
$$

> とする。これは[ITD15の第一法則](../ITD15/index.md#thm-itd15-first-law)をポテンシャル $U=0$ に特殊化したものである。
<!-- formal-statement-end -->

外力が一定でも、円周の上では仕事を単に $F(X_t-X_0)$ と書けません。一周すると位置 $X$ は元へ戻りますが、持ち上げた $Z$ は $L$ だけ進み、外力は $FL$ の仕事をするからです。

<!-- definition-example-start: def-itd16-constant-force -->
**定義の確認**

**直接例（力を入れない模型）**：$F=0$、$V_0\sim N(0,1/(\beta m))$ とします。$u=0$、外力による仕事は $W_t=0$ です。[ITD15の自由なOrnstein–Uhlenbeck速度](../ITD15/index.md#def-itd15-inertial-langevin)は平均零、分散 $1/(\beta m)$ を保ちます。したがって初期速度は正規化されたMaxwell分布、初期位置の密度 $1/L$ も正規化されており、Brown運動との独立性と正の係数を含め定義の条件を満たします。第一法則は $Q_t^{\mathrm{bath}}=K_0-K_t$ となります。後で、この熱が小質量でも消えないことを確かめます。
<!-- definition-example-end -->

### 速度を先に解いてから位置を積分する

微分方程式の速度項 $-\gamma V/m$ を消す積分因子は $e^{at}$ です。速度を先に解けば、時間積分が位置の式を与えます。Ito積分の核は確定的なので積分順序の交換も確認できます。

<a id="thm-itd16-explicit-solution"></a>

<!-- formal-statement-start -->
> **定理（速度・位置の積分表示と変位の分布）**  
> [一定力の慣性付き実験](#def-itd16-constant-force)について、$a=\gamma/m$、$u=F/\gamma$ と置く。任意の $t\in[0,\tau]$ に対して

$$
\begin{aligned}
V_t&=u+(V_0-u)e^{-at}
+\frac{\sqrt{2\gamma/\beta}}m
\int_0^t e^{-a(t-s)}\,dB_s,\\
Z_t-Z_0&=ut+\frac{1-e^{-at}}a(V_0-u)
+\sqrt{\frac2{\beta\gamma}}\int_0^t
(1-e^{-a(t-s)})\,dB_s.
\end{aligned}
$$

> 平衡初期化の場合は変位が正規分布であり、$A_m(t)=t-(1-e^{-at})/a$ と置けば

$$
\mathbb E[Z_t-Z_0]=uA_m(t),\qquad
\operatorname{Var}(Z_t-Z_0)=\frac2{\beta\gamma}A_m(t).
$$

> 駆動定常初期化では同じ分散を持ち、平均のみ $ut$ に置き換わる。
<!-- formal-statement-end -->

### 証明の見取り図

速度方程式を積分因子で解き、$Z_t-Z_0=\int_0^tV_sds$ に代入します。最後のGaussian核の分散は[Itô等長性](../../../解析系/STO/STO6/index.md#thm-sto6-ito-isometry-simple)で計算し、初期Maxwell分布の分散と合わせます。

<!-- proof-start -->
### 証明

$c=\sqrt{2\gamma/\beta}$ とおくと $d(V_t-u)=-a(V_t-u)dt+(c/m)dB_t$ です。[Itô product rule](../../../解析系/STO/STO7/index.md#cor-sto7-product-rule)を確率過程 $e^{at}(V_t-u)$ へ適用すると

$$
d\{e^{at}(V_t-u)\}=(c/m)e^{at}dB_t.
$$

時刻 $0$ から $t$ まで積分し、$e^{-at}$ を掛けて速度の表示を得ます。続いて時間積分すると

$$
\begin{aligned}
\int_0^t(V_s-u)ds
&=\frac{1-e^{-at}}a(V_0-u)
+\frac cm\int_0^t\int_0^s e^{-a(s-r)}dB_r\,ds\\
&=\frac{1-e^{-at}}a(V_0-u)
+\frac cm\int_0^t\frac{1-e^{-a(t-r)}}a\,dB_r.
\end{aligned}
$$

積分核の二乗積分は有限であるため、確定核に対する確率積分の順序交換は単純関数近似と[Itô等長性](../../../解析系/STO/STO6/index.md#thm-sto6-ito-isometry-simple)で正当化されます。$c/(ma)=c/\gamma=\sqrt{2/(\beta\gamma)}$ より位置の表示も得られます。

初期速度の平均を $\mu_0$ とすれば、Brown運動と独立なので平均変位は $ut+(\mu_0-u)(1-e^{-at})/a$ です。両方の初期化で速度分散は $1/(\beta m)$ ですから、独立な二つのGaussian項の分散和は

$$
\begin{aligned}
\operatorname{Var}(Z_t-Z_0)
&=\frac{(1-e^{-at})^2}{\beta m a^2}
+\frac2{\beta\gamma}\int_0^t
(1-e^{-a(t-s)})^2ds\\
&=\frac2{\beta\gamma}
\left\{\frac{(1-e^{-at})^2}{2a}
+t-\frac{2(1-e^{-at})}a
+\frac{1-e^{-2at}}{2a}\right\}\\
&=\frac2{\beta\gamma}
\left\{t-\frac{1-e^{-at}}a\right\}.
\end{aligned}
$$

二行目の最初の項では $ma=\gamma$ を用いました。$\mu_0=0$ では平均が $ut-u(1-e^{-at})/a=uA_m(t)$、$\mu_0=u$ では $ut$ です。
<!-- proof-end -->

**直接例（短時間と長時間）**：$t$ が $m/\gamma$ より短いとき、$1-e^{-at}=at-a^2t^2/2+O(t^3)$ より $A_m(t)=at^2/2+O(t^3)$ です。初期の変位分散は $t^2/(\beta m)+O(t^3)$ で、速度を持った滑らかな位置運動を反映します。一方 $t\gg m/\gamma$ なら $A_m(t)\simeq t-m/\gamma$、変位の分散は時間にほぼ比例します。**どの時間尺度を見るか**で、同じ粒子が慣性運動にも拡散運動にも見えます。

## 2. 位置だけにするとどの確率過程になるか

質量が十分小さければ、速度は時間尺度 $m/\gamma$ で緩和します。位置だけを観測する比較模型では、力による速度 $u$ とBrown運動のゆらぎだけを残します。これを過減衰比較実験として明示します。

<a id="def-itd16-overdamped"></a>

<!-- formal-statement-start -->
> **定義（位置だけの過減衰比較実験）**  
> [一定力の慣性付き実験](#def-itd16-constant-force)と同じ $F,\gamma,\beta,L$、同じ初期位置 $Z_0$ と同じBrown運動 $B$ を用いる。実数上の比較位置 $Y_t$ と円周上の比較位置 $\overline X_t$ を

$$
Y_t=Z_0+ut+\sqrt{\frac2{\beta\gamma}}B_t,\qquad
\overline X_t=Y_t\pmod L,\qquad u=F/\gamma
$$

> と定める。位置のみの模型で定義する仕事と浴熱は、一定外力について

$$
W_t^{\mathrm{od}}=F(Y_t-Y_0),\qquad
Q_t^{\mathrm{od}}=F(Y_t-Y_0)
$$

> である。運動エネルギーを状態変数に含めないため、この比較模型では両者を等しく置く。
<!-- formal-statement-end -->

初期位置を $Z_0=z$ に固定したときの **$Y_t$ の分布**は、$t>0$ では $B_t\sim N(0,t)$ と初期位置からの独立性により

$$
Y_t\mid Z_0=z\sim N\!\left(z+ut,\frac{2t}{\beta\gamma}\right).
$$

時刻 $0$ では $Y_0=z$ が確定します。初期位置 $Z_0$ 自体は一様な確率変数なので、$Y_t$ の無条件分布を上の正規分布と取り違えてはいけません。一方、$\overline X_t=Y_t\pmod L$ は、独立な一様初期位置を平行移動したものだから、各時刻に円周上で一様です。ここで比較するのは、変数の数が異なる二つの模型です。熱の式を等しく置いたのは近似の**定義**であって、慣性付き模型の熱が実際にそこへ収束するという結論ではありません。

<!-- definition-example-start: def-itd16-overdamped -->
**定義の確認**

**直接例（力のない比較）**：$F=0$ とすれば $u=0$、$Y_t=Z_0+\sqrt{2/(\beta\gamma)}B_t$ です。Brown運動は $Z_0$ と独立で、比較模型の位置は円周へ射影でき、$W_t^{\mathrm{od}}=Q_t^{\mathrm{od}}=0$ です。温度・摩擦・初期位置・Brown運動は慣性付き実験と共通ですが、速度そのものは比較模型に存在しません。
<!-- definition-example-end -->

<a id="thm-itd16-position-limit"></a>

<!-- formal-statement-start -->
> **定理（位置のSmoluchowski–Kramers極限）**  
> [一定力の慣性付き実験](#def-itd16-constant-force)で $\gamma,\beta,F,\tau,L$ を固定し、$m\downarrow0$ とする。各 $m$ で初期速度を平衡または駆動定常Maxwell分布とし、初期位置とBrown運動は[過減衰比較実験](#def-itd16-overdamped)と共通にとる。任意の固定時刻 $t\in[0,\tau]$ で

$$
\mathbb E[|Z_t-Y_t|^2]
\le \frac{4m}{\beta\gamma^2}
+\frac{2m^2u^2}{\gamma^2}.
$$

> よって $\mathbb E|Z_t-Y_t|^2\to0$ が成立し、任意の有限個の固定観測時刻について位置ベクトルも確率収束する。円周上の位置も円周距離で確率収束する。この定理は速度・熱の収束を主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

二つの位置へ同じBrown運動を用いたので、差は速度の初期層と指数核を含むItô積分だけです。双方の二乗平均を抑えれば十分です。

<!-- proof-start -->
### 証明

[積分表示](#thm-itd16-explicit-solution)から直接引き算すると

$$
Z_t-Y_t=\frac{1-e^{-at}}a(V_0-u)
-\sqrt{\frac2{\beta\gamma}}\int_0^t e^{-a(t-s)}dB_s.
$$

$(r+s)^2\le2r^2+2s^2$ と[Itô等長性](../../../解析系/STO/STO6/index.md#thm-sto6-ito-isometry-simple)を使い、$0\le1-e^{-at}\le1$、$a=\gamma/m$ に注意すると

$$
\begin{aligned}
\mathbb E|Z_t-Y_t|^2
&\le\frac2{a^2}\mathbb E[(V_0-u)^2]
+\frac4{\beta\gamma}\int_0^t e^{-2a(t-s)}ds\\
&\le\frac{2m^2}{\gamma^2}
\left(\frac1{\beta m}+u^2\right)
+\frac4{\beta\gamma}\frac1{2a}\\
&=\frac{4m}{\beta\gamma^2}
+\frac{2m^2u^2}{\gamma^2}.
\end{aligned}
$$

平衡初期化では $\mathbb E[(V_0-u)^2]=1/(\beta m)+u^2$、駆動定常初期化では $1/(\beta m)$ なので、両方を同じ上界で覆えます。有限個の時刻では、各時刻の誤差二乗の和の期待値も零へ向かいます。円周距離は実数の持ち上げの差以下なので、円周への射影でも収束します。
<!-- proof-end -->

この証明が示したのは固定時刻の平均二乗誤差が零へ近づくことです。時刻全体での一様収束や、位置依存摩擦・温度勾配への一般化を、この評価だけから主張してはいけません。

## 3. 仕事は収束し、第二法則の式もつながる

一定外力を時刻 $0$ に加える実験を考えます。初めは力のない浴と平衡なMaxwell速度なので、速度の平均は零から $u$ へ緩和します。仕事は変位のみに依存するため位置極限と相性がよい一方、有限質量の仕事分布には立ち上がりの遅れが残ります。

<a id="thm-itd16-gaussian-work"></a>

<!-- formal-statement-start -->
> **定理（Gaussian仕事関係と散逸の帳簿）**  
> [一定力の慣性付き実験](#def-itd16-constant-force)を平衡初期化し、$a=\gamma/m$、$u=F/\gamma$、$r_t=e^{-at}$、$A_m(t)=t-(1-r_t)/a$ と置く。任意の $t\in(0,\tau]$ について、仕事 $W_t=F(Z_t-Z_0)$ はGaussianであり

$$
\begin{aligned}
\mathbb E[W_t]&=\frac{F^2}{\gamma}A_m(t),&
\operatorname{Var}(W_t)&=\frac{2F^2}{\beta\gamma}A_m(t),\\
\mathbb E[e^{-\beta W_t}]&=1.
\end{aligned}
$$

> また、[ITD15の全エントロピー生成](../ITD15/index.md#thm-itd15-path-ratio)を $\sigma_t$ とし、実終端速度分布と平衡Maxwell分布の相対エントロピーを $D_t$ とする。このとき

$$
\begin{aligned}
\mathbb E[\sigma_t]
&=\beta\gamma u^2
\left\{t-\frac{2(1-r_t)}a+\frac{1-r_t^2}{2a}\right\},\\
D_t&=\frac{\beta m u^2}{2}(1-r_t)^2,\\
\beta\mathbb E[W_t]&=\mathbb E[\sigma_t]+D_t.
\end{aligned}
$$

> 特に $m\downarrow0$ では $\mathbb E[\sigma_t]\to\beta F^2t/\gamma$、$D_t\to0$、$\mathbb E[W_t]\to F^2t/\gamma$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

Gaussianの指数平均を明示して[ITD15のJarzynski等式](../ITD15/index.md#thm-itd15-jarzynski)を直接検算します。散逸は平均速度の二乗から積分でき、終端の速度分布のずれは正規分布同士の相対エントロピーで測れます。

<!-- proof-start -->
### 証明

[変位の分布](#thm-itd16-explicit-solution)へ $F$ を掛けると、仕事の平均と分散が直ちに得られます。平均 $\mu$、分散 $s^2$ のGaussian変数 $G$ は、標準正規密度の平方完成により $\mathbb E[e^{zG}]=e^{z\mu+z^2s^2/2}$ を満たします。$z=-\beta$ とすると

$$
\begin{aligned}
\mathbb E[e^{-\beta W_t}]
&=\exp\left\{-\beta\frac{F^2}{\gamma}A_m(t)
+\frac{\beta^2}2\frac{2F^2}{\beta\gamma}A_m(t)\right\}=1.
\end{aligned}
$$

外力を入れる前後で $U=0$ のHamiltonianを変更しないため、平衡自由エネルギー差は零であり、これは[Jarzynski等式](../ITD15/index.md#thm-itd15-jarzynski)とも一致します。

速度の明示式から $V_t$ の平均は $\mu_t=u(1-r_t)$、分散は常に $1/(\beta m)$ です。$Z_t-Z_0$ と $V_t$ は初期速度 $V_0$ とBrown運動 $B$ だけで定まり、密度 $1/L$ の $X_0$ と独立です。円周上の任意の区間 $A$ と速度の事象 $C$ に対して、初期位置の密度 $1/L$ は円周上の平行移動で変わらないので

$$
\begin{aligned}
P(X_t\in A,\ V_t\in C)
&=E\!\left[\boldsymbol1_{\{V_t\in C\}}
P(X_0+(Z_t-Z_0)\in A\pmod L\mid V_0,B)\right]\\
&=\frac{|A|}{L}P(V_t\in C).
\end{aligned}
$$

したがって $X_t$ は一様で $V_t$ と独立であり、結合密度は $\rho_t(x,v)=L^{-1}N(\mu_t,1/(\beta m))(v)$ と分解できます。[ITD15のKramers不可逆流](../ITD15/index.md#thm-itd15-kramers-current)に $\partial_v\log\rho_t=-\beta m(v-\mu_t)$ を入れると

$$
J_{v,t}^{\mathrm{irr}}
=-\frac{\gamma}{m}\mu_t\rho_t.
$$

[ITD15の散逸平方公式](../ITD15/index.md#thm-itd15-dissipation)に $D_v=\gamma/(\beta m^2)$ を代入すると、単位時間の平均生成は $\beta\gamma\mu_t^2$ です。これを積分して

$$
\mathbb E[\sigma_t]
=\beta\gamma u^2\int_0^t(1-e^{-as})^2ds
=\beta\gamma u^2
\left\{t-\frac{2(1-r_t)}a+\frac{1-r_t^2}{2a}\right\}.
$$

終端の二つの正規密度の分散は同じです。密度比を展開して実終端分布で期待値をとると

$$
\begin{aligned}
D_t&=\mathbb E_{\rho_t}\left[
-\frac{\beta m}{2}(V_t-\mu_t)^2
+\frac{\beta m}{2}V_t^2\right]\\
&=\frac{\beta m}{2}
\{\mathbb E[V_t^2]-\mathbb E[(V_t-\mu_t)^2]\}
=\frac{\beta m\mu_t^2}{2}.
\end{aligned}
$$

$m/\gamma=1/a$ を使って両者を足すと、角括弧内の差が $(1-r_t)^2/(2a)$ に等しいため

$$
\mathbb E[\sigma_t]+D_t
=\beta\gamma u^2
\left\{t-\frac{1-r_t}a\right\}
=\beta\mathbb E[W_t].
$$

$t>0$ を固定して $m\downarrow0$ とすれば $r_t\to0$、$1/a\to0$ なので末尾の極限が従います。
<!-- proof-end -->

**読み方**：有限時間では、投入した平均仕事の一部が浴への散逸となり、一部がまだ緩和しきっていない速度分布の偏りに蓄えられます。$D_t$ を抜かして平均仕事と全エントロピー生成を等号で結ぶと、速度の立ち上がり期間で誤ります。

## 4. 熱については同じ極限を取れない

[位置の極限](#thm-itd16-position-limit)により仕事 $F(Z_t-Z_0)$ は比較模型の $F(Y_t-Y_0)$ に近づきます。しかし慣性付きの熱には $-\Delta K$ がありました。質量が小さいと速度の分散は大きくなるので、$\Delta K$ が零とは限りません。まず外力さえない場合を調べます。

<a id="thm-itd16-kinetic-boundary"></a>

<!-- formal-statement-start -->
> **定理（運動エネルギー境界項の非消失）**  
> [一定力の慣性付き実験](#def-itd16-constant-force)で $F=0$、平衡Maxwell初期速度とし、任意の固定 $t>0$ を取る。$r_t=e^{-\gamma t/m}$ とする。このとき

$$
\begin{aligned}
\mathbb E[Q_t^{\mathrm{bath}}]&=0,&
\operatorname{Var}(Q_t^{\mathrm{bath}})
&=\frac{1-r_t^2}{\beta^2}.
\end{aligned}
$$

> さらに $m\downarrow0$ で、互いに独立な標準正規変数 $G_0,G_1$ を用いて

$$
Q_t^{\mathrm{bath}}
\ \Longrightarrow\ \frac{G_0^2-G_1^2}{2\beta}
$$

> と分布収束する。したがって慣性付きの浴熱は零へ確率収束しない。一方、[過減衰比較実験](#def-itd16-overdamped)の浴熱は同じ $F=0$ で常に $Q_t^{\mathrm{od}}=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

速度は定常Gaussian過程で、時刻 $0,t$ の相関は $e^{-\gamma t/m}$ です。速度を $\sqrt{\beta m}$ 倍すると分散1となり、質量を小さくすると異なる固定時刻の速度は独立に近づきます。ただし $mV^2/2$ の分布は質量によらず残ります。

<!-- proof-start -->
### 証明

$F=0$ で $V_0$ は平衡Maxwell分布です。[速度の明示解](#thm-itd16-explicit-solution)から

$$
\operatorname{Cov}(V_0,V_t)
=e^{-\gamma t/m}\operatorname{Var}(V_0)
=\frac{r_t}{\beta m}.
$$

$H_0=\sqrt{\beta m}V_0$、$H_t=\sqrt{\beta m}V_t$ とすると、双方は標準正規で相関 $r_t$、かつ $(H_0,H_t)$ は二変量Gaussianです。独立な標準正規 $G_0,G_1$ について、同じ分布を持つ対を

$$
(H_0,H_t)\ \overset{\mathrm d}{=}
(G_0,r_tG_0+\sqrt{1-r_t^2}\,G_1)
$$

と表せます。$K_s=H_s^2/(2\beta)$、$W_t=0$ なので

$$
Q_t^{\mathrm{bath}}=K_0-K_t
=\frac{H_0^2-H_t^2}{2\beta}.
$$

二つの運動エネルギーの平均はどちらも $1/(2\beta)$ です。また標準正規の四乗平均は $3$ であり、独立な $G_0,G_1$ の積の期待値から

$$
\begin{aligned}
\mathbb E[H_0^2H_t^2]
&=3r_t^2+(1-r_t^2)=1+2r_t^2,\\
\operatorname{Var}(H_0^2-H_t^2)
&=3+3-2(1+2r_t^2)=4(1-r_t^2).
\end{aligned}
$$

これを $4\beta^2$ で割れば熱の分散が得られます。$m\downarrow0$ では $r_t\to0$ なので、上のGaussian表現から連続写像によって熱は $(G_0^2-G_1^2)/(2\beta)$ に分布収束します。その極限は分散 $1/\beta^2>0$ の非退化な分布であり、零への確率収束は不可能です。
<!-- proof-end -->

**重要な区別**：$F=0$ で浴熱の平均はどちらの模型でも零です。それでも、個々の慣性付き軌道の浴熱は零ではありません。小質量極限では位置の観測だけで運動エネルギーの境界変動を再現できないのです。$F\ne0$ でも $Q_t^{\mathrm{bath}}=F(Z_t-Z_0)-\Delta K_t$ なので、位置仕事の収束だけから熱の収束は導けません。

## 5. 演習（全問詳細解答）

### A1. 速度の積分因子

- Level: A
- ID: ITD16-A1
- 問題: $m\,dV=(F-\gamma V)dt+\sqrt{2\gamma/\beta}\,dB$ に $e^{\gamma t/m}$ を掛け、$V_t$ の積分表示を導け。$V_0=v_0$ が確定的な場合の平均も求めよ。

<!-- solution-start -->
**詳細解答**

$a=\gamma/m$、$u=F/\gamma$、$c=\sqrt{2\gamma/\beta}$ とする。$d(V-u)=-a(V-u)dt+(c/m)dB$ です。確定的な積分因子 $e^{at}$ と $V-u$ に[Itô product rule](../../../解析系/STO/STO7/index.md#cor-sto7-product-rule)を適用すると $d(e^{at}(V-u))=(c/m)e^{at}dB$ です。両辺を $[0,t]$ で積分して $e^{-at}$ を掛けると

$$
V_t=u+(v_0-u)e^{-at}+\frac cm\int_0^t e^{-a(t-s)}dB_s.
$$

Itô積分の平均は零なので $\mathbb E[V_t]=u+(v_0-u)e^{-at}$ です。
<!-- solution-end -->

### A2. 速度積分の確率核

- Level: A
- ID: ITD16-A2
- 問題: A1の速度を時間積分して $Z_t-Z_0$ を求め、Brown運動の係数が $\sqrt{2/(\beta\gamma)}$ になることを確かめよ。

<!-- solution-start -->
**詳細解答**

$\int_0^t e^{-as}ds=(1-e^{-at})/a$ です。確率積分の核は決定的で二乗積分可能なので、順序を交換して

$$
\begin{aligned}
Z_t-Z_0
&=ut+\frac{1-e^{-at}}a(V_0-u)
+\frac cm\int_0^t\left\{\int_r^t e^{-a(s-r)}ds\right\}dB_r\\
&=ut+\frac{1-e^{-at}}a(V_0-u)
+\frac c{ma}\int_0^t(1-e^{-a(t-r)})dB_r.
\end{aligned}
$$

$ma=\gamma$ より $c/(ma)=\sqrt{2\gamma/\beta}/\gamma=\sqrt{2/(\beta\gamma)}$ です。
<!-- solution-end -->

### A3. 力の印加直後の平均

- Level: A
- ID: ITD16-A3
- 問題: 平衡初期化と駆動定常初期化で $\mathbb E[V_t]$ と $\mathbb E[Z_t-Z_0]$ を比べよ。$t\downarrow0$ における変位の平均の主要項も求めよ。

<!-- solution-start -->
**詳細解答**

平衡初期化では $\mathbb E[V_0]=0$ なので、[積分表示](#thm-itd16-explicit-solution)から

$$
\mathbb E[V_t]=u(1-e^{-at}),\quad
\mathbb E[\Delta Z]=u\left\{t-\frac{1-e^{-at}}a\right\}.
$$

指数関数を $e^{-at}=1-at+a^2t^2/2+O(t^3)$ と展開すれば $\mathbb E[\Delta Z]=ua t^2/2+O(t^3)$ です。駆動定常初期化では $\mathbb E[V_0]=u$ であり、$\mathbb E[V_t]=u$、$\mathbb E[\Delta Z]=ut$ です。初期条件が異なるので短時間の主要項も異なります。
<!-- solution-end -->

### A4. 定常速度の相関

- Level: A
- ID: ITD16-A4
- 問題: $F=0$ の平衡Maxwell初期速度で $\operatorname{Cov}(V_0,V_t)$ を求め、規格化速度 $H_t=\sqrt{\beta m}V_t$ の相関係数を示せ。

<!-- solution-start -->
**詳細解答**

$V_t=e^{-at}V_0+(c/m)\int_0^t e^{-a(t-s)}dB_s$ です。初期速度とBrown運動は独立なので第二項と $V_0$ の共分散は零です。従って

$$
\operatorname{Cov}(V_0,V_t)
=e^{-at}\operatorname{Var}(V_0)
=\frac{e^{-at}}{\beta m}.
$$

定常速度の両時刻の分散は $1/(\beta m)$ だから、$H_0,H_t$ の分散は1、共分散は $e^{-at}$ です。よって相関係数も $e^{-at}$ です。
<!-- solution-end -->

### A5. 運動エネルギーの平均

- Level: A
- ID: ITD16-A5
- 問題: $V\sim N(0,1/(\beta m))$ のとき $K=mV^2/2$ の平均と分散を求めよ。$m\to0$ で消えるかを判定せよ。

<!-- solution-start -->
**詳細解答**

$G=\sqrt{\beta m}V$ とすれば $G\sim N(0,1)$、$K=G^2/(2\beta)$ です。標準正規の二乗平均は1、四乗平均は3なので

$$
\mathbb E[K]=\frac1{2\beta},\qquad
\operatorname{Var}(K)=\frac{3-1}{4\beta^2}=\frac1{2\beta^2}.
$$

どちらも $m$ に依存しません。したがって「質量が小さいから運動エネルギーは零」とする推論は誤りです。
<!-- solution-end -->

### B1. 変位分散の二通りの導出

- Level: B
- ID: ITD16-B1
- 問題: 駆動定常初期化で $\operatorname{Cov}(V_s,V_r)=e^{-a|s-r|}/(\beta m)$ を示し、二重積分から $\operatorname{Var}(Z_t-Z_0)$ を求めよ。

<!-- solution-start -->
**詳細解答**

中心化速度 $V-u$ は定常なOrnstein–Uhlenbeck過程です。$s\ge r$ のとき時間区間 $[r,s]$ のBrown増分は $V_r$ と独立なので

$$
\operatorname{Cov}(V_s,V_r)
=e^{-a(s-r)}\operatorname{Var}(V_r)
=\frac{e^{-a(s-r)}}{\beta m}.
$$

$s<r$ は対称性によります。変位は速度の積分だから

$$
\begin{aligned}
\operatorname{Var}(\Delta Z)
&=\int_0^t\int_0^t\operatorname{Cov}(V_s,V_r)\,ds\,dr\\
&=\frac2{\beta m}\int_0^t\int_0^s e^{-a(s-r)}dr\,ds\\
&=\frac2{\beta ma}\int_0^t(1-e^{-as})ds
=\frac2{\beta\gamma}\left\{t-\frac{1-e^{-at}}a\right\}.
\end{aligned}
$$

これは[定理の分散](#thm-itd16-explicit-solution)と一致します。
<!-- solution-end -->

### B2. 仕事の指数平均

- Level: B
- ID: ITD16-B2
- 問題: 平衡初期化で $F\ne0$ とする。仕事の平均 $\mu$ と分散 $s^2$ を求め、Gaussianの指数平均を直接計算して $\mathbb E[e^{-\beta W_t}]=1$ を示せ。$\mathbb E[W_t]$ が零でない理由も述べよ。

<!-- solution-start -->
**詳細解答**

$A=A_m(t)>0$ と置くと $\mu=F^2A/\gamma$、$s^2=2F^2A/(\beta\gamma)$ です。Gaussian変数の指数平均から

$$
\mathbb E[e^{-\beta W_t}]
=\exp(-\beta\mu+\beta^2s^2/2)
=\exp\left(-\frac{\beta F^2A}{\gamma}
+\frac{\beta F^2A}{\gamma}\right)=1.
$$

一方 $\mathbb E[W_t]=F^2A/\gamma>0$ です。指数平均は負の仕事をした稀な軌道も指数的に重く数えるため、通常の平均仕事とは異なります。
<!-- solution-end -->

### B3. 熱が零へ近づかない検算

- Level: B
- ID: ITD16-B3
- 問題: $F=0$ の平衡初期化で、$r=e^{-\gamma t/m}$、$H_t=\sqrt{\beta m}V_t$ とする。$\mathbb E[H_0^2H_t^2]$ と $\operatorname{Var}(Q_t^{\mathrm{bath}})$ を計算し、$m\downarrow0$ の極限を求めよ。

<!-- solution-start -->
**詳細解答**

[規格化速度の二変量Gaussian表示](#thm-itd16-kinetic-boundary)を $H_0=G_0$、$H_t=rG_0+\sqrt{1-r^2}G_1$ と使います。独立な標準正規 $G_0,G_1$ の奇数次積の期待値は零です。よって

$$
\mathbb E[H_0^2H_t^2]
=r^2\mathbb E[G_0^4]+(1-r^2)\mathbb E[G_0^2]\mathbb E[G_1^2]
=3r^2+1-r^2=1+2r^2.
$$

$Q^{\mathrm{bath}}=(H_0^2-H_t^2)/(2\beta)$ なので、各四乗平均3を用いると

$$
\operatorname{Var}(Q^{\mathrm{bath}})
=\frac{3+3-2(1+2r^2)}{4\beta^2}
=\frac{1-r^2}{\beta^2}
\longrightarrow\frac1{\beta^2}.
$$

分散は零にならず、[定理の非退化な分布極限](#thm-itd16-kinetic-boundary)と整合します。
<!-- solution-end -->

### B4. 緩和時の散逸と終端補正

- Level: B
- ID: ITD16-B4
- 問題: 平衡初期化・一定力 $F$ で、$\mu_s=u(1-e^{-as})$ とする。$\beta\gamma\int_0^t\mu_s^2ds$ と $D_t=\beta m\mu_t^2/2$ を足し、$\beta F^2A_m(t)/\gamma$ に等しいことを途中式から証明せよ。

<!-- solution-start -->
**詳細解答**

指数関数の積分を別々に行うと

$$
\begin{aligned}
\int_0^t\mu_s^2ds
&=u^2\int_0^t(1-2e^{-as}+e^{-2as})ds\\
&=u^2\left\{t-\frac{2(1-e^{-at})}a
+\frac{1-e^{-2at}}{2a}\right\}.
\end{aligned}
$$

$r=e^{-at}$、$m=\gamma/a$ と置けば $D_t=\beta\gamma u^2(1-r)^2/(2a)$ です。従って

$$
\begin{aligned}
\mathbb E[\sigma_t]+D_t
&=\beta\gamma u^2\left\{
t-\frac{2(1-r)}a
+\frac{1-r^2+(1-r)^2}{2a}\right\}\\
&=\beta\gamma u^2\left\{t-\frac{1-r}a\right\}
=\frac{\beta F^2}{\gamma}A_m(t),
\end{aligned}
$$

ここで $1-r^2+(1-r)^2=2(1-r)$ を使いました。[仕事の収支](#thm-itd16-gaussian-work)を代数的に再検算できました。
<!-- solution-end -->

### C1. 小質量で何が収束するか

- Level: C
- ID: ITD16-C1
- 問題: 平衡初期化した一定力 $F$ の実験で、(i) $m$ に依存する変位の平均・分散と極限、(ii) 平均仕事・Gaussian指数平均・平均散逸・終端補正の極限、(iii) $F=0$ に特殊化した熱の極限を、一つの表ではなく式を導いて比較せよ。最後に、位置の収束から熱の収束が従わない理由を述べよ。

<!-- solution-start -->
**詳細解答**

(i) $a=\gamma/m$、$r=e^{-at}$、$A_m=t-(1-r)/a$ とする。[積分表示](#thm-itd16-explicit-solution)から

$$
\mathbb E[\Delta Z]=\frac F\gamma A_m,\qquad
\operatorname{Var}(\Delta Z)=\frac2{\beta\gamma}A_m.
$$

固定 $t>0$ では $r\to0$、$1/a\to0$ なので、平均は $Ft/\gamma$、分散は $2t/(\beta\gamma)$ へ収束します。[位置極限定理](#thm-itd16-position-limit)は同じBrown運動を使って平均二乗誤差が零へ近づくことまで示しています。

(ii) $W=F\Delta Z$ はGaussianで、平均と分散はそれぞれ $F^2A_m/\gamma$ と $2F^2A_m/(\beta\gamma)$ です。指数平均は

$$
\mathbb E[e^{-\beta W}]
=\exp\left\{-\frac{\beta F^2A_m}{\gamma}
+\frac{\beta^2}{2}\frac{2F^2A_m}{\beta\gamma}\right\}=1.
$$

[散逸と終端補正](#thm-itd16-gaussian-work)は

$$
\begin{aligned}
\mathbb E[\sigma_t]
&=\frac{\beta F^2}{\gamma}
\left\{t-\frac{2(1-r)}a+\frac{1-r^2}{2a}\right\},\\
D_t&=\frac{\beta mF^2}{2\gamma^2}(1-r)^2.
\end{aligned}
$$

それぞれ $\beta F^2t/\gamma$ と $0$ へ収束します。有限 $m$ では $\beta\mathbb E[W]=\mathbb E[\sigma]+D_t$、極限では $\beta\mathbb E[W]\to\beta F^2t/\gamma$ です。

(iii) $F=0$ とすると仕事は両模型で零ですが、慣性付きの熱は $Q^{\mathrm{bath}}=K_0-K_t$ です。[熱の定理](#thm-itd16-kinetic-boundary)により、その分布極限は $(G_0^2-G_1^2)/(2\beta)$、分散極限は $1/\beta^2$ です。一方、過減衰比較模型では熱は恒等的に零です。位置仕事は $Z_t-Y_t\to0$ から近づきますが、熱には位置では測れない運動エネルギー差 $-\Delta K$ が加わるので、同じ推論を適用できません。
<!-- solution-end -->

## 6. 何が示され、何はまだ示されていないか

一定温度・一定摩擦・一定力という模型では、慣性付き位置の小質量極限、変位のGaussian分布、仕事の指数平均、平均散逸の極限を明示的に比較できました。**位置が過減衰模型へ収束しても、慣性付き浴熱の境界揺らぎは消えない**という点が核心です。

ここから、位置依存摩擦の一般極限、温度勾配に伴う散逸、時間全体の経路空間での収束、速度依存力、複数浴を扱うには新たな仮定と別の証明が必要です。また、固定 $t>0$ の極限と $t\downarrow0$ の極限は同じではありません。速度の緩和時間 $m/\gamma$ を解像できる観測では、過減衰近似だけでは足りません。
