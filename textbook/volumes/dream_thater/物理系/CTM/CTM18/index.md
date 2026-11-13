# CTM18 ばねとダッシュポットで緩和・クリープを説明できるか

[CTM11 の Hooke 則](../CTM11/index.md#thm-ctm11-hooke)では応力がひずみに比例し、荷重を除けば変形も消える。[CTM15 の Newton 粘性応力](../CTM15/index.md#def-ctm15-newtonian-fluid)は、変形の**速さ**に対して抵抗を生じる。前講 [CTM17 の Stokes 流](../CTM17/index.md#thm-ctm17-plane-poiseuille)では、粘性は流れの抵抗を決めた。

ところが高分子材料などでは、ひずみを一定に保つと応力が時間とともに減り、応力を一定に保つと変形が時間とともに増える。これらをそれぞれ**応力緩和**と**クリープ**という。蓄積と散逸の両方を持つ最小模型を、ばね（弾性）とダッシュポット（粘性）の接続から組み立てる。

## 0. 対象・符号・単位

初期長さ $L_0>0$（m）、一定断面積 $A>0$（m$^2$）の細長い棒の軸方向のみを扱う。基準長さに対する伸びを無次元ひずみ $\varepsilon=\Delta L/L_0$、断面に働く軸力 $F$ を応力 $\sigma=F/A$（Pa）とし、引張を正、圧縮を負とする。各素子は小変形・等温・均質で、準静的に釣り合う（慣性を無視する）と仮定する。$t$ の単位は s、$\dot f=df/dt$ は固定された材料点に付随する時間微分である。

ばねの係数 $E>0$（Pa）は一次元弾性率、ダッシュポットの係数 $\eta_v>0$（Pa s）は**この模型の軸方向粘性係数**とする。実材料棒の一軸応力条件では $E$ は [CTM11 の Young 率の定義](../CTM11/index.md#def-ctm11-young-poisson)に対応するが、以下の接続模型では有効弾性率として扱う。流体の [CTM15 の粘性係数](../CTM15/index.md#def-ctm15-newtonian-fluid)と $\eta_v$ の次元は同じだが、流体のせん断粘性係数と数値的に同一とは仮定しない。時定数を導入するときは $\tau=\eta_v/E>0$（s）とする。

荷重の「ステップ」は数学的理想化である。$t=0$ の左右極限を $f(0-),f(0+)$ と書き、$t>0$ の連続時間の微分方程式と、瞬間的な跳びを**別々に**照合する。理想素子には慣性・破壊・大変形が含まれないため、現実の無限大の負荷速度を忠実に表すと主張しない。

## 1. 二つの素子は何を蓄え、何を失うか

ばねは変形の大きさを、ダッシュポットは変形の速さを応力に結びつける。後者には復元力がないので、荷重を除いても変位が戻るとは限らない。

<a id="def-ctm18-elements"></a>

<!-- formal-statement-start -->
### 定義（一次元ばね・ダッシュポット）

一次元ばねのひずみを $\varepsilon_s$、応力を $\sigma_s$ とし、$E>0$ のもとで

$$
\sigma_s=E\varepsilon_s
$$

を満たす素子とする。一次元ダッシュポットのひずみを $\varepsilon_d$、応力を $\sigma_d$ とし、$\eta_v>0$ のもとで

$$
\sigma_d=\eta_v\dot\varepsilon_d
$$

を満たす素子とする。各素子の単位基準体積当たりのばね蓄積エネルギーと粘性散逸率は、それぞれ

$$
\psi_s=\frac12 E\varepsilon_s^2,\qquad
\mathcal D_d=\eta_v\dot\varepsilon_d^{\,2}\ge0
$$

である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ctm18-elements -->
### **定義の確認**：一次元素子の応力・エネルギー・単位

直接例として $\varepsilon_s=0.01$、$E=10^6$ Pa なら $\sigma_s=10^4$ Pa であり、$\psi_s=50$ J/m$^3$。また $\dot\varepsilon_d=0.005$ s$^{-1}$、$\eta_v=2\times10^6$ Pa s なら $\sigma_d=10^4$ Pa、$\mathcal D_d=50$ W/m$^3$ となる。単位も、$\mathrm{Pa}=\mathrm{J/m^3}$ と $\mathrm{Pa/s}=\mathrm{W/m^3}$ で一致する。いずれも $E,\eta_v>0$ の条件を実際に満たす。

<!-- definition-example-end -->

棒全体の伸びと軸力に直すと、ばねは $F=(EA/L_0)\Delta L$、ダッシュポットは $F=(\eta_v A/L_0)\dot{\Delta L}$ となる。したがって係数 $k=EA/L_0$ の単位は N/m、$c=\eta_v A/L_0$ は N s/m である。「ばね定数」と材料の「弾性率」は別の量である。

## 2. 直列と並列で何を等しくするか

模型全体の基準長さを $L_0$ とし、**各素子に割り当てるひずみ変数は、その素子の伸びを模型全体の $L_0$ で割った一般化ひずみ**として用いる。直列では中間接続点が質量を持たないので力が等しく、伸びは加算される。並列では上下の素子が同じ両端板につながるので伸びが等しく、力が加算される。異なる固有長さの実材料棒を直列につなぐ場合、素子固有の弾性率をそのまま代入せず、$L_0$ に合わせて有効係数を換算する。

力と伸びから接続条件を導く。直列では各素子の軸力を $F_s,F_d$、伸びを $\Delta L_s,\Delta L_d$ とすれば、共通断面積 $A$ に対して

$$
F_s=F_d=F,\qquad
\varepsilon=\frac{\Delta L_s+\Delta L_d}{L_0}
=\varepsilon_s+\varepsilon_d
$$

である。$F_s/A=F_d/A=F/A$ だから応力も等しい。並列では各枝の断面積を $A_s,A_d>0$（$A_s+A_d=A$）とし、両枝の伸びが等しい一方、軸力が加算されるので

$$
\varepsilon_s=\varepsilon_d=\frac{\Delta L}{L_0},\qquad
\sigma=\frac{F_s+F_d}{A}=\frac{F_s}{A}+\frac{F_d}{A}.
$$

ここで並列枝の $\sigma_s:=F_s/A$、$\sigma_d:=F_d/A$ は**模型全断面積当たりの寄与**であり、実材料枝の応力 $F_s/A_s,F_d/A_d$ とは異なる。例えば実材料枝の係数が $E_s,\eta_d$ なら、模型の有効係数は $E=(A_s/A)E_s$、$\eta_v=(A_d/A)\eta_d$ となる。以下の並列の素子法則はこの有効係数で読む。

<a id="def-ctm18-connections"></a>

<!-- formal-statement-start -->
### 定義（Maxwell の直列接続と Kelvin–Voigt の並列接続）

模型全体の基準長さ $L_0$ と、上で定めた一般化ひずみを採用する。並列枝の断面積和は $A$ であり、各枝の応力を全断面積 $A$ で換算した寄与として表す（したがって $E,\eta_v$ は模型の有効係数）。

- **Maxwell 模型（直列）**：各素子に働く応力は等しく $\sigma=\sigma_s=\sigma_d$、全ひずみは $\varepsilon=\varepsilon_s+\varepsilon_d$ とする。
- **Kelvin–Voigt 模型（並列）**：各素子のひずみは等しく $\varepsilon=\varepsilon_s=\varepsilon_d$、全応力は $\sigma=\sigma_s+\sigma_d$ とする。

両模型とも $E,\eta_v>0$、小ひずみ、準静的条件を仮定する。
<!-- formal-statement-end -->

接続の文字模式図では、四角内が素子、両端が負荷点である。並列の上下枝は同じ両端板を共有する。

    Maxwell：端 ─ [ばね E] ─ [ダッシュポット η_v] ─ 端

                   ┌──── [ばね E] ────┐
    Kelvin–Voigt：端                     端
                   └ [ダッシュポット η_v] ┘

<!-- definition-example-start: def-ctm18-connections -->
### **定義の確認**：直列の共通応力と並列の荷重加算

力と伸びの条件を数値で確かめる。Maxwell 模型に $\sigma=10^4$ Pa、$E=10^6$ Pa、$\eta_v=2\times10^6$ Pa s、$\dot\varepsilon_d=0.005$ s$^{-1}$ を与える。このとき

$$
\varepsilon_s=\frac{10^4}{10^6}=0.01,\qquad
\sigma_d=(2\times10^6)(0.005)=10^4\ \mathrm{Pa}.
$$

ばねとダッシュポットの応力が一致する。さらに $t=0+$ で $\varepsilon_d=0$ とし、以後2秒間この応力を一定に保てば、$\dot\varepsilon_s=0$、$\dot\varepsilon_d=0.005$ s$^{-1}$ だから

$$
\varepsilon_d(2)=\int_0^2 0.005\,dt=0.01,\qquad
\varepsilon(2)=\varepsilon_s(2)+\varepsilon_d(2)=0.01+0.01=0.02.
$$

例えば $L_0=1$ m なら二素子の伸びが各0.01 m、模型全体の伸びが0.02 m であり、**直列の伸び加算**も数値で確認できる。

Kelvin–Voigt 模型に $\varepsilon=0.01$、$\dot\varepsilon=0.005$ s$^{-1}$ を与えると、二枝のひずみと速度はそれぞれ等しく、応力は

$$
\sigma_s=E\varepsilon=10^4\ \mathrm{Pa},\qquad
\sigma_d=\eta_v\dot\varepsilon=10^4\ \mathrm{Pa},\qquad
\sigma=\sigma_s+\sigma_d=2\times10^4\ \mathrm{Pa}.
$$

これは模型全断面積で換算した応力の加算である。実際、$A=0.01$ m$^2$、$A_s=A_d=0.005$ m$^2$ とすれば、対応する実材料枝の係数は $E_s=2\times10^6$ Pa、$\eta_d=4\times10^6$ Pa s。したがって

$$
F_s=A_sE_s\varepsilon=100\ \mathrm{N},\qquad
F_d=A_d\eta_d\dot\varepsilon=100\ \mathrm{N},
$$

$$
\frac{F_s+F_d}{A}=\frac{200}{0.01}
=2\times10^4\ \mathrm{Pa}=\sigma.
$$

枝それぞれの実応力は $F_s/A_s=F_d/A_d=2\times10^4$ Pa だが、模型全体への応力寄与はそれぞれ $10^4$ Pa であり、**並列の共通ひずみ・荷重加算・有効係数**を混同せず確認できた。
<!-- definition-example-end -->

## 3. Maxwell 模型：一定ひずみでも応力は減る

一定ひずみでばねが引き伸ばされたままなら、直感的には応力も一定に見える。しかし直列のダッシュポットが時間とともに伸びれば、全ひずみが一定でも**ばねだけの伸び**は減らせる。

<a id="thm-ctm18-maxwell-law"></a>

<!-- formal-statement-start -->
### 定理（Maxwell 模型の構成方程式）

$E,\eta_v>0$ を定数とする [Maxwell の直列接続](#def-ctm18-connections) で、各ひずみ・応力が考える開時間区間で $C^1$ 級なら

$$
\dot\sigma+\frac{\sigma}{\tau}=E\dot\varepsilon,
\qquad \tau=\frac{\eta_v}{E}>0
$$

が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

同じ応力が通るため、ばねとダッシュポットのひずみ速度をそれぞれ応力で表して足す。時間微分を取る前に、**直列では同じ応力が通り、ひずみは加算される**ことを確認するのが肝心である。

<!-- proof-start -->
### 証明

[素子の関係式](#def-ctm18-elements)と直列条件は

$$
\varepsilon_s=\frac{\sigma}{E},\qquad
\dot\varepsilon_d=\frac{\sigma}{\eta_v},\qquad
\varepsilon=\varepsilon_s+\varepsilon_d
$$

である。$E$ が時間によらないから、$C^1$ の各関数に対して

$$
\dot\varepsilon=\dot\varepsilon_s+\dot\varepsilon_d
=\frac{\dot\sigma}{E}+\frac{\sigma}{\eta_v}.
$$

両辺へ $E$ を掛けると $E\dot\varepsilon=\dot\sigma+(E/\eta_v)\sigma$。$\tau=\eta_v/E$ なので $E/\eta_v=1/\tau$ となり、主張を得る。$\square$
<!-- proof-end -->

この一階方程式には初期応力が必要である。単に $\varepsilon(t)$ を書いただけでは、任意の時刻の $\sigma(t)$ は決まらない。

<a id="thm-ctm18-maxwell-step"></a>

<!-- formal-statement-start -->
### 定理（Maxwell 模型の緩和とクリープ）

$t<0$ は無応力・無ひずみの静止状態とし、$t=0$ に次のいずれかの理想化した入力を与える。ダッシュポットひずみは有限応力下で連続とする。

1. **ひずみステップ**：$t\ge0$ で全ひずみを一定値 $\varepsilon_0$ に保つと、$t>0$ の応力は

$$
\sigma(t)=E\varepsilon_0 e^{-t/\tau},
\qquad \sigma(0+)=E\varepsilon_0 .
$$

2. **応力ステップ**：$t\ge0$ で全応力を一定値 $\sigma_0$ に保つと、$t>0$ の全ひずみは

$$
\varepsilon(t)=\frac{\sigma_0}{E}
+\frac{\sigma_0}{\eta_v}t,
\qquad \varepsilon(0+)=\frac{\sigma_0}{E}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

ひずみ固定なら構成方程式の右辺が零になる。応力固定ならばねの伸びが一定となり、ダッシュポットの伸びを積分する。$t=0$ では**ばねは跳べるがダッシュポットひずみは跳べない**ことを別に確かめる。

<!-- proof-start -->
### 証明

ひずみステップでは $\varepsilon_d(0+)=0$ である。これは応力が有限な短時間区間において

$$
\varepsilon_d(\delta)-\varepsilon_d(-\delta)
=\int_{-\delta}^{\delta}\frac{\sigma(s)}{\eta_v}\,ds\to0
\qquad(\delta\downarrow0)
$$

となるためである（$t=0$ の両側の小区間で応力が一様有界なことを使用）。よって $\varepsilon_s(0+)=\varepsilon_0$、$\sigma(0+)=E\varepsilon_0$。$t>0$ では $\dot\varepsilon=0$ なので [Maxwell 方程式](#thm-ctm18-maxwell-law)は $\dot\sigma=-\sigma/\tau$。積分因子 $e^{t/\tau}$ を掛けると

$$
\frac{d}{dt}\bigl(e^{t/\tau}\sigma(t)\bigr)=0,\qquad
e^{t/\tau}\sigma(t)=\sigma(0+)=E\varepsilon_0.
$$

応力ステップでは $\varepsilon_s(0+)=\sigma_0/E$、$\varepsilon_d(0+)=0$。$t>0$ で $\sigma_d=\sigma_0$ だから $\dot\varepsilon_d=\sigma_0/\eta_v$。これを $0$ から $t$ まで積分すると $\varepsilon_d(t)=\sigma_0t/\eta_v$ であり、ばね分と足して主張を得る。$\square$
<!-- proof-end -->

長時間では、ひずみ固定の応力は $0$ へ減衰し、応力固定のひずみは傾き $\sigma_0/\eta_v$ で増大する。後者は無限時間の線形模型の予測であり、任意に大きい変形まで小ひずみ近似が正しいという意味ではない。

## 4. Kelvin–Voigt 模型：変形に遅れが生じる

並列接続では、ばねとダッシュポットが**同じ**ひずみを持つ。全応力のうち、変形を蓄える部分と変形速度に抵抗する部分を足し合わせる。

<a id="thm-ctm18-kelvin-law"></a>

<!-- formal-statement-start -->
### 定理（Kelvin–Voigt 模型の構成方程式）

$E,\eta_v>0$ を定数とする [Kelvin–Voigt の並列接続](#def-ctm18-connections) で $\varepsilon$ が $C^1$ 級なら

$$
\sigma=E\varepsilon+\eta_v\dot\varepsilon
$$

が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

両枝に同じひずみとひずみ速度を代入して、力（断面積一定なので応力）を加える。

<!-- proof-start -->
### 証明

[各素子の法則](#def-ctm18-elements)と $\varepsilon_s=\varepsilon_d=\varepsilon$ から

$$
\sigma_s=E\varepsilon,\qquad
\sigma_d=\eta_v\dot\varepsilon.
$$

並列の力の釣合 $\sigma=\sigma_s+\sigma_d$ にこれを代入して結論を得る。$\square$
<!-- proof-end -->

応力ステップは**有限な応力値への跳び**だが、ひずみステップは $\varepsilon$ 自体の跳びである。幅 $\delta>0$ の時間でひずみを $\Delta\varepsilon\ne0$ だけ変えるなら、その平均変形速度は $\Delta\varepsilon/\delta$ となる。$\delta\downarrow0$ でも変化量を保つ極限は、時間積分が有限な瞬間的衝撃（デルタ状の寄与）として表され、通常の有界な粘性応力とは異なる。

<a id="thm-ctm18-kelvin-step"></a>

<!-- formal-statement-start -->
### 定理（Kelvin–Voigt 模型のクリープとひずみステップの限界）

$t<0$ に $\varepsilon=0,\sigma=0$ とする。$t\ge0$ に有限な一定応力 $\sigma_0$ を負荷すると、$t>0$ のひずみは

$$
\varepsilon(t)=\frac{\sigma_0}{E}(1-e^{-t/\tau}),
\qquad \varepsilon(0+)=0,\qquad \tau=\frac{\eta_v}{E}.
$$

また $\varepsilon$ の有限な跳び $\Delta\varepsilon\ne0$ は、有界な応力では実現できない。理想的なひずみステップを強制するなら、ダッシュポット応力には時間的な衝撃（デルタ状の項）が必要になる。
<!-- formal-statement-end -->

### 証明の見取り図

応力ステップでは一階常微分方程式を初期値 $0$ で解く。逆の制御でひずみを一瞬に跳ばせると、その変化率を含む粘性応力が発散する点が二模型の決定的な違いである。

<!-- proof-start -->
### 証明

まず初期値の連続性を確認する。[Kelvin–Voigt 方程式](#thm-ctm18-kelvin-law)を $\eta_v$ で割り、各滑らかな時間区間では

$$
\dot\varepsilon+\frac{1}{\tau}\varepsilon
=\frac{\sigma(t)}{\eta_v},\qquad
\frac{d}{dt}(e^{t/\tau}\varepsilon)
=\frac{e^{t/\tau}\sigma(t)}{\eta_v}
$$

である。有限な応力ステップを、$t=0$ の左右で有界な $\sigma$ として積分すると

$$
e^{\delta/\tau}\varepsilon(\delta)
-e^{-\delta/\tau}\varepsilon(-\delta)
=\frac{1}{\eta_v}\int_{-\delta}^{\delta}
e^{s/\tau}\sigma(s)\,ds\longrightarrow0
\qquad(\delta\downarrow0).
$$

従って有限な左右極限を持つ解で $\varepsilon(0+)=\varepsilon(0-)=0$ が必要である。$t>0$ では $\sigma(t)=\sigma_0$ なので

$$
\frac{d}{dt}(e^{t/\tau}\varepsilon)
=\frac{\sigma_0}{\eta_v}e^{t/\tau}.
$$

$0$ から $t$ まで積分して $\varepsilon(0+)=0$ を代入すると

$$
e^{t/\tau}\varepsilon(t)
=\frac{\sigma_0\tau}{\eta_v}(e^{t/\tau}-1)
=\frac{\sigma_0}{E}(e^{t/\tau}-1).
$$

さらに $\Delta\varepsilon\ne0$ の跳びを仮定すると左辺の $\varepsilon(0+)-\varepsilon(0-)$ が零にならず、上の有界応力に基づく積分の極限と矛盾する。したがって有限応力のもとでひずみは跳べない。$\square$
<!-- proof-end -->

一方、滑らかなひずみ入力 $\varepsilon(t)=at$（$t>0$、$a$ は s$^{-1}$）なら

$$
\sigma(t)=Eat+\eta_v a.
$$

これは $t>0$ では有限である。速度が $0$ から $a$ へ瞬時に切り替わると応力が有限量だけ跳ぶが、**ひずみそのもの**が跳ぶ場合の無限大の応力とは区別する。

## 5. エネルギー収支は第二法則と両立するか

単に過去に応答する模型を作るだけでは足りない。[CTM10 の Clausius–Duhem 散逸不等式](../CTM10/index.md#thm-ctm10-clausius-duhem)を踏まえ、等温・局所一次元・滑らかな負荷履歴で、応力仕事率が「蓄積エネルギーの増分＋非負散逸」へ分かれるかを確かめる。以下の $\psi$ は単位基準体積当たり（J/m$^3$）であり、温度勾配・熱源はここでは扱わない。

<a id="prop-ctm18-passive-dissipation"></a>

<!-- formal-statement-start -->
### 命題（両模型の受動的なエネルギー分解）

$E,\eta_v>0$、時間的に滑らかなひずみと応力を持つ、等温・小変形の一次元模型について、次の各蓄積エネルギー $\psi$ と散逸率 $\mathcal D$ は

$$
\sigma\dot\varepsilon=\dot\psi+\mathcal D,
\qquad \mathcal D\ge0
$$

を満たす。

- Maxwell：$\psi_M=\sigma^2/(2E)$、$\mathcal D_M=\sigma^2/\eta_v$。
- Kelvin–Voigt：$\psi_K=E\varepsilon^2/2$、$\mathcal D_K=\eta_v\dot\varepsilon^{\,2}$。
<!-- formal-statement-end -->

### 証明の見取り図

ばねに蓄えた分だけを時間微分し、[各構成方程式](#thm-ctm18-maxwell-law)・[Kelvin–Voigt 方程式](#thm-ctm18-kelvin-law)の残りを平方の形にする。

<!-- proof-start -->
### 証明

Maxwell では $E$ 一定なので

$$
\dot\psi_M=\frac{\sigma\dot\sigma}{E}.
$$

[直列素子の速度加算](#thm-ctm18-maxwell-law)によって

$$
\sigma\dot\varepsilon
=\sigma\left(\frac{\dot\sigma}{E}+\frac{\sigma}{\eta_v}\right)
=\dot\psi_M+\frac{\sigma^2}{\eta_v}.
$$

Kelvin–Voigt では

$$
\dot\psi_K=E\varepsilon\dot\varepsilon,\qquad
\sigma\dot\varepsilon
=(E\varepsilon+\eta_v\dot\varepsilon)\dot\varepsilon
=\dot\psi_K+\eta_v\dot\varepsilon^{\,2}.
$$

両係数は正なので散逸は非負である。いずれも単位は Pa/s = W/m$^3$。これらの等式はステップの瞬間に分布を含めた仕事を自動的に扱う式ではなく、滑らかな時刻区間で成立する。$\square$
<!-- proof-end -->

Maxwell のひずみステップ緩和では、$t>0$ に $\dot\varepsilon=0$ でも $\mathcal D_M>0$ であり、蓄積分 $\psi_M$ が減少して熱へ移る。これは**応力零と散逸零の時間経過**を混同しない具体例である。

## 6. 応答を同じ目盛りで読む

$E=10^6$ Pa、$\eta_v=2\times10^6$ Pa s と置くと $\tau=2$ s。引張ひずみ $\varepsilon_0=0.01$ の Maxwell 緩和なら初期応力 $E\varepsilon_0=10$ kPa で、2秒後は $10/e\simeq3.68$ kPa。引張応力 $\sigma_0=10$ kPa の Kelvin–Voigt クリープなら2秒後のひずみは $0.01(1-e^{-1})\simeq0.00632$ となる。いずれも時間の目盛りは同じ $\tau$ だが、変化する物理量は異なる。

| 入力 | Maxwell | Kelvin–Voigt |
| --- | --- | --- |
| ひずみ一定 $\varepsilon_0$ | $\sigma/(E\varepsilon_0)=e^{-t/\tau}$ | 理想瞬間ステップは有界応力では不可 |
| 応力一定 $\sigma_0$ | $E\varepsilon/\sigma_0=1+t/\tau$ | $E\varepsilon/\sigma_0=1-e^{-t/\tau}$ |
| $t=\tau$ の応答 | 緩和応力は初期の $1/e$ | クリープひずみは最終値の $1-1/e$ |
| $t\to\infty$ | 応力緩和で $0$、クリープは無界 | 応力ステップのひずみは $\sigma_0/E$ |

表の $t=\tau$ は、指数関数の特定の時点を**解析式から数値に置き換えて検算**するためのものである。二つをどちらも単に「遅れる」と呼ぶと、最終ひずみが有限か無限か、瞬間の跳びを許すかという違いを見落とす。

本章では直列・並列の条件と閉じた解析解から入力を切り替えた応答を追えるため、追加の動的プレイヤーは採用しない。文字模式図と式・表はJavaScriptがなくても意味を保つ。

## 7. 演習

指定がない限り $E>0,\eta_v>0,\tau=\eta_v/E$ は定数、初期状態は無応力・無ひずみ、$t>0$ の過程は一次元・等温・準静的・小変形とする。理想ステップの瞬間は左右極限を区別する。

### Level A

### A1. 素子の材料定数と棒の定数

$L_0=2$ m、$A=0.01$ m$^2$、$E=2\times10^6$ Pa、$\eta_v=4\times10^6$ Pa s の棒について、ばね定数 $k$、ダッシュポット係数 $c$、一定引張力 $F=100$ N によるばね伸び、ダッシュポット伸び速度を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[一次元素子](#def-ctm18-elements)から $k=EA/L_0$ と $c=\eta_v A/L_0$。数値と次元を代入して

$$
k=\frac{2\times10^6\cdot0.01}{2}=10^4\ \mathrm{N/m},\quad
c=\frac{4\times10^6\cdot0.01}{2}=2\times10^4\ \mathrm{N\,s/m}.
$$

$F=k\Delta L_s$ だから $\Delta L_s=100/10^4=0.01$ m。$F=c\dot{\Delta L}_d$ だから $\dot{\Delta L}_d=100/(2\times10^4)=0.005$ m/s。力を一定にすることと、ばね伸びを増やし続けることは異なる。
<!-- solution-end -->

### A2. 直列の速度加算

Maxwell 直列模型で $E=3$ MPa、$\eta_v=6$ MPa s とする。全ひずみ速度 $\dot\varepsilon=0.004$ s$^{-1}$、その瞬間の応力 $\sigma=6$ kPa なら、$\dot\sigma$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[Maxwell 方程式](#thm-ctm18-maxwell-law)の直前の加算式を用い、$\dot\varepsilon_d=\sigma/\eta_v=6000/(6\times10^6)=0.001$ s$^{-1}$。ゆえにばねの速度は

$$
\dot\varepsilon_s=0.004-0.001=0.003\ \mathrm{s^{-1}},
\qquad
\dot\sigma=E\dot\varepsilon_s=3\times10^6\cdot0.003=9000\ \mathrm{Pa/s}.
$$

直接 $\dot\sigma=E\dot\varepsilon-\sigma/\tau=12000-3000=9000$ Pa/s でも一致する。$\tau=2$ s。
<!-- solution-end -->

### A3. Maxwell の緩和曲線

$E=1$ MPa、$\eta_v=2$ MPa s の Maxwell 模型に $\varepsilon_0=0.01$ のひずみステップを与える。$\sigma(0+)$、$\sigma(2\ {\rm s})$、$\sigma(4\ {\rm s})$ と長時間極限を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[緩和定理](#thm-ctm18-maxwell-step)より $\tau=\eta_v/E=2$ s、$\sigma(0+)=E\varepsilon_0=10^6\cdot0.01=10^4$ Pa。従って

$$
\sigma(t)=10^4e^{-t/2}\ \mathrm{Pa},\quad
\sigma(2)=10^4e^{-1}\simeq3679\ \mathrm{Pa},\quad
\sigma(4)=10^4e^{-2}\simeq1353\ \mathrm{Pa}.
$$

$t\to\infty$ で指数因子は零に収束する。ひずみを保持していても、直列のばねの伸びは減る。
<!-- solution-end -->

### A4. Kelvin–Voigt のクリープ曲線

$E=1$ MPa、$\eta_v=2$ MPa s の Kelvin–Voigt 模型へ $\sigma_0=10$ kPa の応力ステップを与える。$\varepsilon(0+)$、$\varepsilon(2\ {\rm s})$、$\lim_{t\to\infty}\varepsilon(t)$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[Kelvin–Voigt 模型のクリープとひずみステップの限界](#thm-ctm18-kelvin-step)から $\tau=2$ s、$\sigma_0/E=10^4/10^6=0.01$。よって

$$
\varepsilon(0+)=0,\qquad
\varepsilon(2)=0.01(1-e^{-1})\simeq0.006321,\qquad
\lim_{t\to\infty}\varepsilon(t)=0.01.
$$

有限応力では粘性枝に無限大のひずみ速度を与えられないため、初期ひずみは跳ばない。
<!-- solution-end -->

### A5. ステップ入力の落とし穴

初期零状態の Maxwell 模型と Kelvin–Voigt 模型に、(i) 有限応力のステップ、(ii) 有限ひずみのステップを与える。それぞれ瞬間に跳べる量と、その後の応答を説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

Maxwell は [直列接続](#def-ctm18-connections)と [ステップ応答定理](#thm-ctm18-maxwell-step)により、ばねひずみ $\varepsilon_s=\sigma/E$ は跳べるが、有限応力のもとではダッシュポットの $\varepsilon_d$ は連続である。(i) 応力ステップなら全ひずみは直後に $\sigma_0/E$ だけ跳び、その後 $\sigma_0t/\eta_v$ 増える。(ii) ひずみステップなら応力は直後に $E\varepsilon_0$ へ跳び、以後指数緩和する。

Kelvin–Voigt は [並列模型の式](#thm-ctm18-kelvin-law)で粘性枝と全ひずみが同じ。(i) [応力ステップのクリープ定理](#thm-ctm18-kelvin-step)より有限応力のステップでは $\varepsilon(0+)=0$、その後 $\sigma_0(1-e^{-t/\tau})/E$。(ii) ひずみステップ $\Delta\varepsilon\ne0$ を課すには $\eta_v\dot\varepsilon$ の衝撃が必要で、有界な応力履歴としては許されない。荷重と変形のどちらを制御したかを入れ替えない。
<!-- solution-end -->

### Level B

### B1. 応力が線形に増える試験

$t\ge0$ の範囲で初期零状態から $\sigma(t)=at$（$a>0$、単位 Pa/s）という応力履歴を与える。Maxwell と Kelvin–Voigt の各ひずみを求め、$t\to0+$ の主な違いを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

Maxwell は [直列の速度加算](#thm-ctm18-maxwell-law)で

$$
\dot\varepsilon=\frac{\dot\sigma}{E}+\frac{\sigma}{\eta_v}
=\frac{a}{E}+\frac{at}{\eta_v}.
$$

$\varepsilon(0)=0$ から $0$ と $t$ の間で積分すると

$$
\varepsilon_M(t)=\frac{at}{E}+\frac{at^2}{2\eta_v}.
$$

Kelvin–Voigt は [構成方程式](#thm-ctm18-kelvin-law)から $\dot\varepsilon+\varepsilon/\tau=at/\eta_v$。積分因子を掛けて

$$
e^{t/\tau}\varepsilon(t)
=\frac{a}{\eta_v}\int_0^t se^{s/\tau}\,ds.
$$

部分積分で $\int_0^t se^{s/\tau}\,ds=\tau te^{t/\tau}-\tau^2(e^{t/\tau}-1)$ なので

$$
\varepsilon_K(t)=\frac{a}{E}\left[t-\tau(1-e^{-t/\tau})\right].
$$

$t\to0+$ では $e^{-t/\tau}=1-t/\tau+t^2/(2\tau^2)+O(t^3)$ より、Maxwell は $at/E+O(t^2)$、Kelvin–Voigt は $at^2/(2\eta_v)+O(t^3)$。両方ともひずみは連続だが、初期立ち上がりの次数が違う。
<!-- solution-end -->

### B2. ひずみランプと仕事

Kelvin–Voigt 模型に $0<t<T$（$T>0$）で $\varepsilon(t)=at$（$a>0$、s$^{-1}$）を課す。応力、蓄積エネルギーの増分、総入力仕事密度、散逸仕事密度を求め、収支を検算せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[Kelvin–Voigt 方程式](#thm-ctm18-kelvin-law)から $\dot\varepsilon=a$、従って $\sigma(t)=Eat+\eta_v a$。初期蓄積エネルギーは零だから

$$
\Delta\psi=\frac12 E(aT)^2.
$$

応力仕事密度は、$\sigma\dot\varepsilon$ を時間積分して

$$
W=\int_0^T (Eat+\eta_v a)a\,dt
=Ea^2\frac{T^2}{2}+\eta_v a^2 T.
$$

[非負散逸命題](#prop-ctm18-passive-dissipation)による散逸率 $\mathcal D=\eta_v a^2$ を積分すれば $W_{\rm diss}=\eta_v a^2T$。確かに $W=\Delta\psi+W_{\rm diss}$ である。各量の単位は J/m$^3$。瞬間に速度を切り替える部分は積分区間の端点として扱っており、ひずみそのもののステップは課していない。
<!-- solution-end -->

### B3. Maxwell 緩和で失われる弾性エネルギー

初期零状態から Maxwell 模型の全ひずみを $t=0$ に $\varepsilon_0>0$ として保持する。$t>0$ に外部のひずみ仕事率が零であることを示し、$t=0+$ の蓄積エネルギーがその後の散逸の総和に等しいことを積分で確かめよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[緩和定理](#thm-ctm18-maxwell-step)より $t>0$ は $\dot\varepsilon=0$ なので $\sigma\dot\varepsilon=0$。応力は $\sigma=E\varepsilon_0e^{-t/\tau}$ であり、[Maxwell の散逸率](#prop-ctm18-passive-dissipation)は

$$
\mathcal D(t)=\frac{E^2\varepsilon_0^2}{\eta_v}e^{-2t/\tau}.
$$

従って $t=0+$ から無限時間まで積分すると

$$
\int_0^\infty\mathcal D(t)\,dt
=\frac{E^2\varepsilon_0^2}{\eta_v}
\left[-\frac{\tau}{2}e^{-2t/\tau}\right]_0^\infty
=\frac{E^2\varepsilon_0^2}{\eta_v}\frac{\tau}{2}
=\frac12 E\varepsilon_0^2.
$$

$t=0+$ のばねエネルギーは $\psi_M(0+)=(E\varepsilon_0)^2/(2E)=E\varepsilon_0^2/2$、無限時間では零。よって初期蓄積分とその後の散逸が一致する。これは**ステップを作る瞬間**の入力仕事を計算したものではない。
<!-- solution-end -->

### B4. 実験から係数を読み取る

ある Maxwell 模型へ $\varepsilon_0=0.02$ のひずみステップを課すと $\sigma(0+)=12$ kPa、3秒後に $\sigma(3)=\sigma(0+)/e$ となった。$E,\tau,\eta_v$ を同定せよ。同じ係数の Kelvin–Voigt 模型へ12 kPaの応力ステップを与えたとき、3秒後のひずみを予測せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[Maxwell 緩和式](#thm-ctm18-maxwell-step)の初期値 $\sigma(0+)=E\varepsilon_0$ により

$$
E=\frac{12000}{0.02}=6\times10^5\ \mathrm{Pa}.
$$

緩和比 $\sigma(3)/\sigma(0+)=e^{-3/\tau}=1/e$ から $-3/\tau=-1$、$\tau=3$ s。よって $\eta_v=E\tau=1.8\times10^6$ Pa s。これを [Kelvin–Voigt クリープ式](#thm-ctm18-kelvin-step)へ代入すると

$$
\varepsilon_K(3)=\frac{12000}{6\times10^5}(1-e^{-3/3})
=0.02(1-e^{-1})\simeq0.01264.
$$

この最後の値は**異なる接続方式の模型へ同じ数値係数を仮に使用した予測**であり、一つの実験だけで二模型がともに適合すると主張するものではない。
<!-- solution-end -->

### Level C

### C1. 長方形の荷重を加えて除く

$E,\eta_v,\sigma_0,T>0$ を固定する。初期零状態から

$$
\sigma(t)=
\begin{cases}
0,&t<0,\\
\sigma_0,&0\le t<T,\\
0,&t\ge T
\end{cases}
$$

を準静的に与える。Maxwell と Kelvin–Voigt の各ひずみ $\varepsilon(t)$ を $0<t<T$ と $t>T$ で求め、$\varepsilon(0+),\varepsilon(T-),\varepsilon(T+),\lim_{t\to\infty}\varepsilon(t)$ を比較せよ。どちらの模型が永久ひずみを残すかと、その理由を素子レベルで説明せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

**Maxwell の負荷区間。** [直列接続](#def-ctm18-connections)と [応力ステップの解](#thm-ctm18-maxwell-step)から、$0<t<T$ でばねひずみは $\sigma_0/E$、ダッシュポットひずみは $\sigma_0t/\eta_v$。従って

$$
\varepsilon_M(t)=\frac{\sigma_0}{E}+\frac{\sigma_0t}{\eta_v},
\quad
\varepsilon_M(0+)=\frac{\sigma_0}{E},
\quad
\varepsilon_M(T-)=\frac{\sigma_0}{E}+\frac{\sigma_0T}{\eta_v}.
$$

**Maxwell の除荷区間。** $t=T$ で応力を零にすると、ばねは $\sigma/E$ に従って $\sigma_0/E$ だけ瞬時に縮み、ダッシュポットのひずみは有限応力下で連続である。ゆえに

$$
\varepsilon_M(T+)=\frac{\sigma_0T}{\eta_v},\qquad
\dot\varepsilon_d=\frac{\sigma}{\eta_v}=0\quad(t>T),
$$

だから $t>T$ では $\varepsilon_M(t)=\sigma_0T/\eta_v$ が残る。長時間極限もこの値である。

**Kelvin–Voigt の負荷区間。** [並列模型のクリープ解](#thm-ctm18-kelvin-step)より

$$
\varepsilon_K(t)=\frac{\sigma_0}{E}(1-e^{-t/\tau}),\quad
\varepsilon_K(0+)=0,\quad
\varepsilon_K(T-)=\frac{\sigma_0}{E}(1-e^{-T/\tau}).
$$

**Kelvin–Voigt の除荷区間。** ひずみは跳べないので $\varepsilon_K(T+)=\varepsilon_K(T-)$。$t>T$ は $\sigma=0$ で、構成式は

$$
\dot\varepsilon+\frac{\varepsilon}{\tau}=0.
$$

積分因子 $e^{(t-T)/\tau}$ を掛けると $\frac{d}{dt}(e^{(t-T)/\tau}\varepsilon)=0$。$t=T+$ の値を代入して

$$
\varepsilon_K(t)
=\frac{\sigma_0}{E}(1-e^{-T/\tau})e^{-(t-T)/\tau},
\qquad t>T.
$$

よって長時間で零へ戻る。Maxwell は**直列のダッシュポットに累積したひずみが残る**。Kelvin–Voigt は**並列のばねが回復力を出し続け、粘性枝が回復速度だけを遅らせる**。$t=0,T$ の理想ステップの瞬間を通常の微分方程式だけで横断せず、接続条件とひずみの連続性で処理した。
<!-- solution-end -->

## 8. まとめと次講への橋

- Maxwell（直列）：同じ応力・ひずみの和から $\dot\sigma+\sigma/\tau=E\dot\varepsilon$。ひずみ固定で指数緩和、応力固定で無界のクリープ。
- Kelvin–Voigt（並列）：同じひずみ・応力の和から $\sigma=E\varepsilon+\eta_v\dot\varepsilon$。応力固定で有限値へ近づくクリープ、除荷後は回復。
- どちらも $\tau=\eta_v/E$ は秒の次元を持ち、蓄積と非負散逸を分けられる。ただし瞬間ステップの許容性と長時間の極限は同じではない。

次の CTM19 では、単純な二素子模型から一段進み、**過去の履歴を含む応答・周期負荷と散逸**をどう測定・記述するかを扱う。
