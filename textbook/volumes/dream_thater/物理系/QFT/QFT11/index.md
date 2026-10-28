# QFT11 漸近状態・S行列とLSZ還元

<!-- definition-example-audit: strict -->

[QFT10の頂点規則](../QFT10/index.md#thm-qft10-vertex-factor)では、外部点を持つ時間順序相関関数をWick収縮から求めました。しかし相関関数の「外部点」は、まだ実験で遠くへ飛んでいく粒子ではありません。外線の伝播関数をただ消して散乱振幅と呼ぶためには、**そもそも遠い過去と未来に一粒子が存在すること**と、場がその一粒子をどの強さで作るかを確かめなければなりません。

この章では、まず自由場の波束で粒子の規格化を固定し、次に相互作用場で必要となる漸近状態と孤立した一粒子極を区別します。その後、時刻面積分を比較する方法からLSZ還元の外線因子を追い、[QFT10の四次頂点](../QFT10/index.md#def-qft10-scalar-interaction)を初めて散乱振幅に結び付けます。

時空はMinkowski空間 $\mathbb R^{1,3}$、計量成分は $\eta_{\mu\nu}=\operatorname{diag}(1,-1,-1,-1)$、$c=\hbar=1$ とし、まず質量 $m>0$ の実スカラー場を扱います。四元ベクトルの積は $p\cdot x=p^0t-\boldsymbol p\cdot\boldsymbol x$（$x^0=t$）です。相互作用理論では $m$ を**物理的な一粒子質量**とし、摂動論の自由質量との差は必要な質量調整により整合させます。場は[作用素値分布](../QFT4/index.md#prop-qft4-operator-distribution)として試験関数でsmearingし、平面波状態・無限体積デルタはその極限の記法とします。有限モードで行うWick計算、有限時間の発展、無限時間の散乱極限を同時に正当化したとは仮定しません。

## 1. 自由一粒子の規格化を固定する

量子場のモード展開には $2E_{\boldsymbol p}$ が現れます。これを省略すると、散乱の運動量保存デルタの係数が合わなくなります。まず[自由Fock空間の生成消滅演算子](../QFT4/index.md#def-qft4-ladder-operators)を、[正エネルギー質量殻](../QFT5/index.md#def-qft5-positive-mass-shell)上のLorentz不変測度で書き直します。

ここで波束の添字 $f_t$ は時刻 $t$ における空間波形を表し、$\partial_t$ は空間座標を固定して微分します。また、[QFT4のHilbert内積](../QFT4/index.md#def-qft4-fock-space)は第1変数線形でしたが、本章のKlein–Gordon内積と物理のブラケット $\langle f|g\rangle$ は**第2変数線形**とします。同じ二つの波束について、後者の値はQFT4流儀の $\langle g,f\rangle$ と一致します。

<a id="def-qft11-invariant-packet"></a>

<!-- formal-statement-start -->
> **定義（Lorentz不変一粒子波束とKlein–Gordon内積）**  
> $m>0$、$E_{\boldsymbol p}=\sqrt{|\boldsymbol p|^2+m^2}$ とし、正エネルギー質量殻上の測度 $d\Pi_p$ と、滑らかでコンパクトな運動量支持を持つ $f$ の正振動数波束 $f_t$ を

$$
d\Pi_p=\frac{d^3\boldsymbol p}{(2\pi)^3\,2E_{\boldsymbol p}},
\qquad
f_t(\boldsymbol x)=\int d\Pi_p\,
f(\boldsymbol p)e^{-iE_{\boldsymbol p}t+i\boldsymbol p\cdot\boldsymbol x}
$$

> とする。同じ質量の二つのKlein–Gordon解 $u,v$ に対し、時刻 $t$ の内積を

$$
(u,v)_{\mathrm{KG}}
=i\int_{\mathbb R^3}d^3\boldsymbol x\,
u^*(t,\boldsymbol x)\overleftrightarrow{\partial_t}v(t,\boldsymbol x),
\quad
u^*\overleftrightarrow{\partial_t}v
=u^*\partial_tv-(\partial_tu^*)v
$$

> とする。正振動数波束に限れば正定値で、対応する一粒子状態を

$$
|f\rangle=\int d\Pi_p\,f(\boldsymbol p)|\boldsymbol p\rangle,
\qquad
\langle\boldsymbol p|\boldsymbol q\rangle
=(2\pi)^3\,2E_{\boldsymbol p}\,
\delta^{(3)}(\boldsymbol p-\boldsymbol q)
$$

> と規格化する。
<!-- formal-statement-end -->

固定した慣性座標では $d\Pi_p$ は三次元運動量積分ですが、[正エネルギー質量殻](../QFT5/index.md#def-qft5-positive-mass-shell)を $2\pi\theta(p^0)\delta(p^2-m^2)d^4p/(2\pi)^4$ で表示しても同じです。実際、$\delta((p^0)^2-E_{\boldsymbol p}^2)$ の正の根 $p^0=E_{\boldsymbol p}$ のJacobianは $1/(2E_{\boldsymbol p})$ です。この四次元表示は時刻の向きを保つLorentz変換で不変なので、誘導された $d\Pi_p$ も不変です。ここで内積が正になるのは**正振動数に限定したから**であり、一般の正負混合解では不定符号になります。

<!-- definition-example-start: def-qft11-invariant-packet -->
### 例：波束の内積を直接計算する

**定義の確認**：$f,g$ の運動量支持がコンパクトなら空間積分と運動量積分を分布として交換でき、$\int d^3x\,e^{i(\boldsymbol q-\boldsymbol p)\cdot\boldsymbol x}=(2\pi)^3\delta^{(3)}(\boldsymbol q-\boldsymbol p)$ を用いられます。時間微分による係数は $E_{\boldsymbol q}+E_{\boldsymbol p}$ です。デルタで $\boldsymbol q=\boldsymbol p$ とすると

$$
\begin{aligned}
(f,g)_{\mathrm{KG}}
&=\int d\Pi_p\,d\Pi_q\,
f^*(\boldsymbol p)g(\boldsymbol q)
(E_{\boldsymbol p}+E_{\boldsymbol q})
(2\pi)^3\delta^{(3)}(\boldsymbol p-\boldsymbol q)\\
&=\int d\Pi_p\,f^*(\boldsymbol p)g(\boldsymbol p).
\end{aligned}
$$

よって $(f,f)_{\mathrm{KG}}>0$（$f\ne0$）、かつ時間に依存しません。これで定義の正定値性と規格化係数を実際に検査しました。
<!-- definition-example-end -->

この表示を[QFT4の自由場のsmearing](../QFT4/index.md#def-qft4-smeared-field)と結び付けます。QFT4では $d\mu_p=d^3\boldsymbol p/(2\pi)^3$ と $1/\sqrt{2E_{\boldsymbol p}}$ を使って場を展開しました。同じ場を $d\Pi_p=d\mu_p/(2E_{\boldsymbol p})$ で書くには、運動量でラベルした演算子を

$$
a_{\mathrm{inv}}(\boldsymbol p)
=\sqrt{2E_{\boldsymbol p}}\,a_{\mathrm{QFT4}}(\boldsymbol p),
\qquad
\int d\Pi_p\,a_{\mathrm{inv}}(\boldsymbol p)e^{-ip\cdot x}
=\int d\mu_p\,\frac{a_{\mathrm{QFT4}}(\boldsymbol p)}{\sqrt{2E_{\boldsymbol p}}}e^{-ip\cdot x}
$$

と再規格化します。以後 $a_{\mathrm{inv}}(\boldsymbol p)$ を単に $a(\boldsymbol p)$ と書きます。[QFT4の交換関係](../QFT4/index.md#thm-qft4-fock-ccr)のデルタを掛け合わせると $[a(\boldsymbol p),a^\dagger(\boldsymbol q)]=(2\pi)^3 2E_{\boldsymbol p}\delta^{(3)}(\boldsymbol p-\boldsymbol q)$ となります。この変換は場を変える操作ではなく、測度と演算子の係数を同時に取り替える操作です。

<a id="prop-qft11-free-packet"></a>

<!-- formal-statement-start -->
> **命題（自由波束の消滅演算子と規格化）**  
> 質量 $m>0$ の自由実スカラー場 $\phi_0$ を正負振動数で展開し、[Fock交換関係](../QFT4/index.md#thm-qft4-fock-ccr)を上記の不変規格化で採用する。滑らかなコンパクト運動量支持の波束 $f,g$ に対して

$$
a_t(f)=i\int d^3\boldsymbol x\,
f_t^*(\boldsymbol x)
\overleftrightarrow{\partial_t}\phi_0(t,\boldsymbol x)
=\int d\Pi_p\,f^*(\boldsymbol p)a(\boldsymbol p)
$$

> は時刻 $t$ に依存しない。さらに

$$
[a_t(f),a_t(g)^\dagger]
=\int d\Pi_p\,f^*(\boldsymbol p)g(\boldsymbol p),
\qquad \langle f|g\rangle=(f,g)_{\mathrm{KG}}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

正振動数の $f_t$ は自由場の消滅演算子部分とだけ非零のKlein–Gordon内積を持ちます。場の生成演算子部分との係数は $E_{\boldsymbol p}-E_{\boldsymbol p}=0$ です。

<!-- proof-start -->
### 証明

自由場を $d\Pi_p$ の規格化で

$$
\phi_0(t,\boldsymbol x)
=\int d\Pi_p\left[
a(\boldsymbol p)e^{-iE_{\boldsymbol p}t+i\boldsymbol p\cdot\boldsymbol x}
+a^\dagger(\boldsymbol p)e^{iE_{\boldsymbol p}t-i\boldsymbol p\cdot\boldsymbol x}
\right]
$$

と書きます。この表示と[正準交換関係](../QFT4/index.md#thm-qft4-fock-ccr)は

$$
[a(\boldsymbol p),a^\dagger(\boldsymbol q)]
=(2\pi)^3 2E_{\boldsymbol p}\delta^{(3)}(\boldsymbol p-\boldsymbol q)
$$

を満たします。$a_t(f)$ への消滅部分の代入では、空間積分がデルタを与え、時間微分により $i[-iE_{\boldsymbol q}-iE_{\boldsymbol p}]=E_{\boldsymbol q}+E_{\boldsymbol p}$ が掛かります。$\boldsymbol q=\boldsymbol p$ で $2E_{\boldsymbol p}$ となり、$d\Pi_q$ の分母と打ち消し合うため $\int d\Pi_p f^*(\boldsymbol p)a(\boldsymbol p)$ になります。生成部分では $\boldsymbol q=-\boldsymbol p$ を選ぶ空間デルタが出ますが、時間微分の係数が $i[iE_{\boldsymbol q}-iE_{\boldsymbol p}]=0$ なので消えます。

最後に交換関係を積分すると

$$
\begin{aligned}
[a(f),a(g)^\dagger]
&=\int d\Pi_p\,d\Pi_q\,
f^*(\boldsymbol p)g(\boldsymbol q)
(2\pi)^3 2E_{\boldsymbol p}\delta^{(3)}(\boldsymbol p-\boldsymbol q)\\
&=\int d\Pi_p\,f^*(\boldsymbol p)g(\boldsymbol p).
\end{aligned}
$$

$|f\rangle=a^\dagger(f)|\Omega_0\rangle$ に作用させれば内積の式も従います。
<!-- proof-end -->

自由場だけなら一粒子は時間が経っても粒子のままです。相互作用を加えると、この時刻非依存性が一般には壊れます。

## 2. いつ「入射」「出射」粒子と呼べるか

散乱中には粒子数が変わり得ますが、相互作用が局所的で、遠い時空で互いに離れた安定粒子の波束を識別できる場合があります。ここで「安定」は時間発展で崩壊しない一粒子、「孤立」はその質量が他の質量スペクトルから隔たっていることを意味します。散乱状態写像が**等長**であるとは波束の内積を保つことです。**漸近完全性**とは、考える粒子種の散乱波束から物理的散乱部分空間全体を得られる条件であり、両写像の値域がその同じ部分空間を尽くすことを要請します。ここで重要なのは、相互作用場の時間発展があることだけでは、**漸近極限の存在は従わない**という点です。

<a id="def-qft11-asymptotic-s"></a>

<!-- formal-statement-start -->
> **定義（漸近in/out状態とS行列）**  
> 一意の並進不変真空 $|\Omega\rangle$ と、質量 $m>0$ の安定な孤立一粒子部分空間を持つ相互作用量子場理論を考える。自由対称Fock空間の有限粒子波束 $\alpha$ に対して、相互作用Hilbert空間への等長な散乱状態写像 $\Omega_{\mathrm{in}}$、$\Omega_{\mathrm{out}}$ が、過去・未来への大時間極限としてそれぞれ存在すると仮定する。このとき

$$
|\alpha,\mathrm{in}\rangle=\Omega_{\mathrm{in}}|\alpha\rangle,
\qquad
|\beta,\mathrm{out}\rangle=\Omega_{\mathrm{out}}|\beta\rangle,
\qquad
S=\Omega_{\mathrm{out}}^\dagger\Omega_{\mathrm{in}}
$$

> とし、$\langle\beta|S|\alpha\rangle=\langle\beta,\mathrm{out}|\alpha,\mathrm{in}\rangle$ を散乱行列要素とする。漸近完全性も仮定できる場合は $S$ が散乱空間上のユニタリ演算子になるが、単に両写像が存在するだけではその結論を置かない。
<!-- formal-statement-end -->

**定義の役割**：$\Omega_{\mathrm{in/out}}$ は真空の記号 $\Omega$ とは別物で、自由粒子の状態を物理的な散乱状態へ写します。相互作用場 $\phi_H$ から波束を取り出す演算子 $a_t^H(f)$ は、[前節の面積分](#prop-qft11-free-packet)で $\phi_0$ を $\phi_H$ に置き換えたものです。ただし、その大時間極限が存在するか、自由波束の規格化とどう対応するかは別に確認する必要があります。

<!-- definition-example-start: def-qft11-asymptotic-s -->
### 例：自由理論では両極限が一致する

**定義の確認**：$\phi_H=\phi_0$ の自由理論なら[自由波束の命題](#prop-qft11-free-packet)によって $a_t(f)=a(f)$ はどの時刻でも同じです。したがってin/out写像は両方とも恒等写像で、波束の内積 $\langle g|f\rangle$ を保ち（等長性）、値域も自由Fock空間全体です（完全性）。$S=I$ で、波束同士の散乱行列要素は $\langle g|S|f\rangle=\int d\Pi_p\,g^*(\boldsymbol p)f(\boldsymbol p)$ です。これは「相互作用しないので何も起こらない」という意味ですが、$S$ の行列要素が零になるわけではありません。
<!-- definition-example-end -->

[QFT9の有限時間Dyson演算子](../QFT9/index.md#def-qft9-dyson)や[QFT10の有限切替 $\mathcal S_g$](../QFT10/index.md#def-qft10-scalar-interaction)は、有限次数の計算を組織するものです。$g\to1$、時間 $\to\pm\infty$、体積 $\to\infty$、紫外cutoff除去という複数の極限を交換できる保証はありません。有限体積では離散スペクトルの再帰もあり、そこから散乱の大時間極限を無条件に推測できません。

## 3. 外線の係数は二点関数の一粒子極に隠れている

自由場の[Feynman二点分布](../QFT6/index.md#def-qft6-feynman-two-point)は運動量表示で $i/(p^2-m^2+i0)$ です。相互作用場ではそれがそのまま残るとは限りません。安定粒子が場によってどれだけ生成されるかを表す係数が必要です。

<a id="def-qft11-stable-pole"></a>

<!-- formal-statement-start -->
> **定義（安定一粒子極と波動関数留数）**  
> 並進不変真空 $|\Omega\rangle$、Hermitianスカラー場 $\phi_H$（必要なら真空期待値を差し引いたもの）、正の物理質量 $m$ を持つ相互作用理論を考える。$|\boldsymbol p\rangle$ を

$$
\langle\boldsymbol p|\boldsymbol q\rangle
=(2\pi)^3 2E_{\boldsymbol p}\delta^{(3)}(\boldsymbol p-\boldsymbol q)
$$

> と規格化した安定一粒子状態とし、Lorentz共変性の下で位相を選び

$$
\langle\Omega|\phi_H(0)|\boldsymbol p\rangle=\sqrt Z,
\qquad Z>0
$$

> が運動量に依らず成立するとき $Z$ を波動関数留数とする。さらに一粒子質量殻が他のスペクトルから孤立しているとき、真空時間順序二点関数のFourier変換の $p^2=m^2$ に現れる孤立単純極を安定一粒子極とする。
<!-- formal-statement-end -->

相互作用場の一粒子重なりは $\sqrt Z$ ですが、二点関数には場が二つあるので波動関数留数は $Z$ です。$Z$ は粒子の電荷でも、同種粒子の統計因子でもありません。**相互作用の裸質量ではなく、実際の極の位置で還元すること**も重要です。

<!-- definition-example-start: def-qft11-stable-pole -->
### 例：自由場では波動関数留数が1

**定義の確認**：自由場のモード展開のうち $\langle\Omega_0|\phi_0(0)a^\dagger(\boldsymbol p)|\Omega_0\rangle$ に寄与するのは消滅部分だけです。[自由交換関係](../QFT4/index.md#thm-qft4-fock-ccr)で規格化すると値は $1$、従って $Z=1$。また[自由二点関数の極](../QFT6/index.md#thm-qft6-feynman-poles)は $p^2=m^2$ の単純極で、他の連続スペクトルを含みません。定義の重なり・正値性・孤立性をそれぞれ確認しました。
<!-- definition-example-end -->

相互作用場の波束演算子 $a_t^H(f)$ は[自由波束の面積分](#prop-qft11-free-packet)の $\phi_0$ を $\phi_H$ に置き換えたものです。上付き $H$ は相互作用場（Heisenberg描像）を、下付き $t$ は面積分を評価する時刻を示し、時間微分ではありません。[波動関数留数](#def-qft11-stable-pole)を用いると、適切な散乱状態上で

$$
a_{\mathrm{in}}(f)
=Z^{-1/2}\lim_{t\to-\infty}a_t^H(f),
\qquad
a_{\mathrm{out}}(f)
=Z^{-1/2}\lim_{t\to+\infty}a_t^H(f)
$$

のような強極限を用いて漸近場を作れることがLSZ法の重要な追加仮定です。一般の場ではこの極限が存在するとは限りません。特に多粒子散乱状態の構成は、一粒子極を発見することだけからは済みません。

<a id="prop-qft11-one-particle-pole"></a>

<!-- formal-statement-start -->
> **命題（安定一粒子状態による二点関数の極）**  
> Poincaré不変な正エネルギー理論のHermitian実スカラー場 $\phi_H$ と並進不変真空 $|\Omega\rangle$ を取り、物理質量 $m>0$ の安定一粒子状態との重なり $\langle\Omega|\phi_H(0)|\boldsymbol p\rangle=\sqrt Z>0$ が存在し、その質量の近傍に他の質量スペクトルがないとする。このとき連結時間順序二点関数は、一粒子極の近くで

$$
\widetilde G_2(p)
=\frac{iZ}{p^2-m^2+i0}
+\widetilde G_{\mathrm{rest}}(p)
$$

> と分解できる。ここで $\widetilde G_{\mathrm{rest}}$ は $p^2=m^2$ の孤立一粒子極を持たない。連続スペクトルの閾値から離れた領域ではその特異性はこの極より弱い。
<!-- formal-statement-end -->

### 証明の見取り図

真空と場の間へ一粒子状態の完全性射影を一度挿入します。各場の行列要素が $\sqrt Z$ なので二点関数には $Z$ が掛かり、残りの時間順序積は自由場と同じ周波数積分になります。

<!-- proof-start -->
### 証明

一粒子部分空間への射影は、上記規格化の下で

$$
P_1=\int d\Pi_p\,|\boldsymbol p\rangle\langle\boldsymbol p|
$$

です。並進共変性から $\langle\Omega|\phi_H(x)|\boldsymbol p\rangle=\sqrt Z\,e^{-ip\cdot x}$（$p^0=E_{\boldsymbol p}$）。$x^0>0$ で二点関数の中間状態に $P_1$ を挿入すると

$$
\langle\Omega|\phi_H(x)P_1\phi_H(0)|\Omega\rangle
=Z\int d\Pi_p\,e^{-ip\cdot x}.
$$

$x^0<0$ では場を逆順に置き、一粒子成分は $Z\int d\Pi_p e^{ip\cdot x}$ となります。従って時間順序の一粒子部分は

$$
G_{2,1}(x)
=Z\int d\Pi_p\left[
\theta(x^0)e^{-ip\cdot x}
+\theta(-x^0)e^{ip\cdot x}
\right].
$$

これは[自由Feynman二点関数](../QFT6/index.md#def-qft6-feynman-two-point)の $Z$ 倍です。時間積分で極の位置を直接追うなら $\varepsilon>0$ に対して

$$
\int_0^\infty dt\,e^{i(p^0-E)t-\varepsilon t}
=\frac{i}{p^0-E+i\varepsilon},
\qquad
\int_{-\infty}^0dt\,e^{i(p^0+E)t+\varepsilon t}
=-\frac{i}{p^0+E-i\varepsilon}.
$$

両項を $1/(2E)$ と合わせて境界値を取ると $i/((p^0)^2-E^2+i0)$ となり、$\widetilde G_{2,1}=iZ/(p^2-m^2+i0)$ です。残る中間状態は一粒子射影に直交するスペクトルの寄与です。仮定した質量の隔たりによって $p^2=m^2$ に同じ孤立単純極を作らず、主張が従います。
<!-- proof-end -->

**失敗例**：質量殻に対応するデルタ型のスペクトル成分がなく、連続成分だけが閾値から始まると、上の $P_1$ に相当する射影が作れません。二点関数が特異でも、その特異性を $iZ/(p^2-m^2+i0)$ と無理に分離することはできません。質量のない光子を伴う荷電粒子の長距離QEDでは、通常の鋭い質量殻極に基づく単純な散乱粒子像が問題になります（infraparticle）。この章の単純なスカラーLSZをそのまま適用しません。

## 4. 時間の端から相関関数の極へ

散乱粒子は十分遠い時間に観測するものですが、摂動論で直接計算できるのは時間順序相関関数です。その橋になるのが、自由波束と相互作用場のKlein–Gordon面積分を時間の両端で比べる操作です。場そのものに自由方程式を仮定する必要はありません。

<a id="lem-qft11-surface-difference"></a>

<!-- formal-statement-start -->
> **補題（Klein–Gordon面積分の時間差）**  
> 質量 $m>0$ の正振動数Klein–Gordon波束 $f$ と、適切にsmearingした場または滑らかな関数 $F(t,\boldsymbol x)$ を取る。空間無限遠での境界項が消え、微分・積分交換が許されるなら、$K=\Box+m^2=\partial_t^2-\nabla^2+m^2$ とおいたとき

$$
\begin{aligned}
A_t(f;F)
&=i\int d^3\boldsymbol x\,
f_t^*(\boldsymbol x)\overleftrightarrow{\partial_t}F(t,\boldsymbol x),\\
A_{t_2}(f;F)-A_{t_1}(f;F)
&=i\int_{t_1}^{t_2}d^4x\,f_t^*(\boldsymbol x)(KF)(x).
\end{aligned}
$$
<!-- formal-statement-end -->

### 証明の見取り図

面積分の時間微分では一階微分どうしの積が相殺します。残る二階微分を自由波束の方程式と空間部分積分で組み合わせると $KF$ だけが残ります。

<!-- proof-start -->
### 証明

$A_t$ を直接微分すると

$$
\frac{dA_t}{dt}
=i\int d^3\boldsymbol x\,
\left[f_t^*\partial_t^2F-(\partial_t^2f_t^*)F\right].
$$

ここで $\partial_t^2f_t^*=(\nabla^2-m^2)f_t^*$ です。したがって右辺は

$$
i\int d^3\boldsymbol x\,
\left[f_t^*(\partial_t^2+m^2)F-(\nabla^2f_t^*)F\right].
$$

空間部分積分を二回行うと、境界項が消える仮定によって $\int(\nabla^2f_t^*)F=\int f_t^*\nabla^2F$ です。よって $dA_t/dt=i\int f_t^*KF$。この等式を $t_1$ から $t_2$ まで積分して結論を得ます。
<!-- proof-end -->

**使い方**：自由場なら $A_t(f;\phi_0)=a_t(f)$ で、$K\phi_0=0$ なので時間差が零です。相互作用場では一般に $K\phi_H\ne0$ であり、大時間端の差が相互作用を反映します。多粒子の行列要素へ適用するときは、時間順序記号を微分した際に生じる等時刻の接触項も含めて扱います。これらを無条件に捨てるのではなく、外線極の係数を取り出す過程で整理します。

[QFT10の連結相関関数](../QFT10/index.md#def-qft10-connected-correlator)では、全外部挿入点が一つの連結成分に属する寄与を選びました。ここでもその四点成分を用い、各外部座標 $x_j$ に共役な四元運動量 $k_j$ を全て内向きに取ってFourier変換します。四元運動量の符号は出射粒子だけ反転させるので、外線の極 $k_j^2=m^2$ は符号反転しても同じ位置です。

<a id="def-qft11-lsz-amputation"></a>

<!-- formal-statement-start -->
> **定義（LSZ外線還元と連結散乱振幅）**  
> 質量 $m>0$ の安定一粒子状態と $Z>0$ の孤立一粒子極を持ち、漸近in/out場が存在する相互作用実スカラー理論を考える。$G_{4,c}(x_1,\ldots,x_4)$ を真空の[**連結**時間順序四点関数](../QFT10/index.md#def-qft10-connected-correlator)とする。全て内向きの四元運動量 $k_1,\ldots,k_4$ に対するFourier変換を

$$
\begin{aligned}
\widetilde G_{4,c}(k_1,\ldots,k_4)
&=\int\prod_{j=1}^4d^4x_j\,
e^{i\sum_j k_j\cdot x_j}G_{4,c}(x_1,\ldots,x_4)\\
&=(2\pi)^4\delta^{(4)}\!\left(\sum_j k_j\right)
\mathcal G_{4,c}(k_1,\ldots,k_4)
\end{aligned}
$$

> と書く。デルタを取り除いた $\mathcal G_{4,c}$ の外線一粒子極を

$$
\mathcal A_4
=\lim_{k_j^2\to m^2}
\left[
\prod_{j=1}^4\frac{k_j^2-m^2}{i\sqrt Z}\,
\mathcal G_{4,c}(k_1,k_2,k_3,k_4)
\right]
$$

> で切断する操作をLSZ外線還元とする。この極限は各外線のFeynman境界値から適切な波束と順序で取る。入射を $p_1,p_2$、出射を $p_3,p_4$ とし、全内向き運動量を

$$
(k_1,k_2,k_3,k_4)=(p_1,p_2,-p_3,-p_4),
\qquad p_a^0=E_{\boldsymbol p_a}>0
$$

> とおく。接続した $2\to2$ の散乱不変振幅 $\mathcal M$ を $\mathcal A_4=i\mathcal M$ と規格化する。
<!-- formal-statement-end -->

この式は「場の方程式を四回掛ける」とも読めます。Fourier変換により $K_{x_j}$ は $-(k_j^2-m^2)$ を掛けるからです。ただし時間順序微分による接触項、境界値と極限の順序、外線重なり $\sqrt Z$ を落としてはいけません。また $\mathcal M$ は後節の振幅であり、確率や断面積そのものではありません。

<!-- definition-example-start: def-qft11-lsz-amputation -->
### 例：二点関数の外線因子を試す

**定義の確認**：[二点関数の一粒子極](#prop-qft11-one-particle-pole)の極部分一個へ

$$
\frac{p^2-m^2}{i\sqrt Z}\,
\frac{iZ}{p^2-m^2+i0}
\ \longrightarrow\ \sqrt Z
$$

を適用すると $\sqrt Z$ が残ります。二点関数には場が二つあるのに、外線を一つだけ外したので重なりが一つ残ったのです。四点関数では四つの外線ごとに $\sqrt Z$ を除いて初めて規格化された粒子の振幅になります。自由理論では $Z=1$ ですが、一般にこの係数を省略できません。
<!-- definition-example-end -->

前の[散乱状態の定義](#def-qft11-asymptotic-s)では、$S$ は**自由漸近Fock空間上**の作用素として定義しました。従って $S=I+iT$ と分けるなら、$iT$ の行列要素も自由漸近状態 $|\alpha\rangle,|\beta\rangle$ で挟みます。物理的なin/out状態の重なりとの関係は

$$
\langle\beta,\mathrm{out}|\alpha,\mathrm{in}\rangle
=\langle\beta|S|\alpha\rangle
=\langle\beta|\alpha\rangle+\langle\beta|iT|\alpha\rangle
$$

です。$\langle\beta,\mathrm{out}|iT|\alpha,\mathrm{in}\rangle$ と書くと、自由空間上の演算子を別の状態空間に無断で作用させることになります。

<a id="thm-qft11-lsz-four-leg"></a>

<!-- formal-statement-start -->
> **定理（漸近場を仮定したLSZ四外線還元）**  
> $3+1$ 次元の局所的・並進不変な実スカラー量子場理論で、(i) 真空が一意、(ii) 物理質量 $m>0$ の孤立安定一粒子部分空間と $Z>0$ の場の重なりが存在、(iii) 適切な波束でin/out散乱状態が存在、(iv) 時間順序相関関数の外線極限・大時間極限とその交換が正当化できる、と仮定する。自由漸近Fock空間上で $S=I+iT$ と書く。このとき連結 $2\to2$ 行列要素は

$$
\langle\boldsymbol p_3,\boldsymbol p_4|
iT|\boldsymbol p_1,\boldsymbol p_2\rangle_{\!c}
=(2\pi)^4\delta^{(4)}(p_1+p_2-p_3-p_4)\,
i\mathcal M(p_1,p_2\to p_3,p_4),
$$

> かつ $i\mathcal M$ は[前定義](#def-qft11-lsz-amputation)の四外線極限で与えられる。これは条件付きのLSZ還元公式であり、本公式が仮定(i)〜(iv)の成立まで保証するわけではない。
<!-- formal-statement-end -->

### 証明の見取り図

外線一個の時間境界を[面積分の補題](#lem-qft11-surface-difference)で時空積分に変えます。時間順序二点関数に一粒子状態を挿入すると、相互作用場の外線には必ず $i\sqrt Z/(k^2-m^2+i0)$ が付いています。これを四回繰り返して、残る連結部分を散乱の行列要素に同定します。

<!-- proof-start -->
### 証明

まず外線を一個だけ還元します。[漸近in/out状態](#def-qft11-asymptotic-s)の条件により、場から作る波束演算子は大時間で $a_{\rm in/out}(f)$ の $\sqrt Z$ 倍になります。二つの時間端の差に[面積分の時間差](#lem-qft11-surface-difference)を適用すると、適切な散乱状態間の行列要素として

$$
a_{\rm out}(f)-a_{\rm in}(f)
=\frac{i}{\sqrt Z}\int_{-\infty}^{\infty}d^4x\,
f_t^*(\boldsymbol x)K_x\phi_H(x)
$$

を得ます。消滅演算子側の $f_t^*$ は $e^{+ip\cdot x}$ を、入射粒子を作る随伴演算子側の $f_t$ は $e^{-ip\cdot x}$ を含み、これが全内向き運動量の符号選択になります。時間順序相関をFourier変換すると、分布の微分の規則により

$$
\int d^4x\,e^{ik\cdot x}K_xG(x,\ldots)
=(m^2-k^2)\widetilde G(k,\ldots),\qquad
\frac{i}{\sqrt Z}(m^2-k^2)
=\frac{k^2-m^2}{i\sqrt Z}
$$

です。したがって面積分の差が外線還元因子を生む理由も符号を含めて追えます。時間順序微分で生じる[QFT6のデルタ源と同種の接触項](../QFT6/index.md#thm-qft6-feynman-poles)は保持し、外線の単純極を取る際の分離は仮定(iv)によります。境界条件の情報は $i0$ 処方に反映されます。

次に、外線の場がつながる残りの行列要素の間へ一粒子状態を挿入します。[一粒子極の命題](#prop-qft11-one-particle-pole)と全く同じ時間積分を使うと、その外線の運動量 $k$ に関する特異部分は

$$
\frac{i\sqrt Z}{k^2-m^2+i0}\,
\mathcal R(k;\hbox{残りの外部状態})
$$

となります。場と一粒子状態の行列要素は $\sqrt Z$ が一つだけであるため、ここでは二点関数の $iZ$ と異なります。$\mathcal R$ は極近傍で残る行列要素です。仮定(iv)により他の閾値・接触項から同じ外線単純極への不当な混入がなく、残余部分の質量殻極限を取れます。

従って一個の外線を取り除く代数操作は

$$
\lim_{k^2\to m^2}
\frac{k^2-m^2}{i\sqrt Z}\,
\frac{i\sqrt Z}{k^2-m^2+i0}\,\mathcal R
=\mathcal R\big|_{k^2=m^2}.
$$

四つの外線について、残りの波束が質量殻極限を許すという仮定の下でこれを順に適用します。その結果、四点関数の連結部から $\prod_j i\sqrt Z/(k_j^2-m^2+i0)$ が除かれ、物理的に規格化された二つのin粒子から二つのout粒子への連結行列要素が残ります。並進不変性で全運動量保存の $(2\pi)^4\delta^{(4)}(k_1+\cdots+k_4)$ を分離すると、前定義の $\mathcal A_4=i\mathcal M$ が得られます。

自由に進むだけの外部粒子の恒等寄与や複数の独立な散乱成分は[QFT10の連結相関](../QFT10/index.md#def-qft10-connected-correlator)には含めません。これらは完全な $S=I+iT$ の非連結行列要素には別に現れます。以上で規格化と連結成分を含む公式を得ました。漸近場の存在自体の証明は仮定(iii)であり、この議論で導出したものではありません。
<!-- proof-end -->

ここで証明したのは**適切な散乱極限と外線極限が成立するなら**という還元の論理です。具体的な相互作用模型でそれらの極限が成立することの一般証明、特に紫外cutoffを除いた四次元相互作用場の非摂動的構成はこの章では行っていません。

## 5. 四次頂点から初めて散乱振幅を得る

前章の $-i\lambda_4$ は単なる摂動相関関数の頂点因子でした。ここで物理質量殻と外線規格化を指定して初めて、木レベルの $2\to2$ 振幅として解釈できます。

<a id="prop-qft11-quartic-tree"></a>

<!-- formal-statement-start -->
> **命題（四次相互作用の木レベル散乱振幅）**  
> 質量 $m>0$ の実スカラー場で正規順序相互作用 $\mathcal H_I=\lambda_4:\!\phi_I^4\!:/4!$ を取る。有限切替・正則化の下で[QFT10の一次四点図](../QFT10/index.md#thm-qft10-vertex-factor)を計算し、その後にLSZの漸近状態・物理質量極・極限の条件を満たす摂動的散乱模型を仮定する。木レベルでは $Z=1+O(\lambda_4^2)$ で、

$$
i\mathcal M_{2\to2}^{\mathrm{tree}}
=-i\lambda_4,
\qquad
\mathcal M_{2\to2}^{\mathrm{tree}}=-\lambda_4.
$$

> 同種の四外線のWick収縮に $4!$ 通りあっても、この振幅へさらに $4!$ や $2!$ を掛けない。
<!-- formal-statement-end -->

### 証明の見取り図

一次四点の連結寄与は $-i\lambda_4$ に外線伝播関数を四本掛けた形です。これをFourier変換して $\prod_j(k_j^2-m^2)/i$ で切断すると、保存デルタと頂点因子だけが残ります。

<!-- proof-start -->
### 証明

$g\in C_c^\infty(\mathbb R^4)$ を切替関数とし、[頂点の階乗と一次頂点規則](../QFT10/index.md#thm-qft10-vertex-factor)から一次の連結四点関数は

$$
G_{4,c}^{(1)}(x_1,\ldots,x_4)
=-i\lambda_4\int d^4y\,g(y)
\prod_{j=1}^4D_F(x_j-y).
$$

ここで $D_F$ は[自由伝播関数](../QFT6/index.md#def-qft6-feynman-two-point)です。$\widetilde D_F(k)=i/(k^2-m^2+i0)$ を各 $x_j$ でFourier変換すると、$x_j$ 積分はその内部運動量を $k_j$ に固定し

$$
\widetilde G_{4,c}^{(1)}(k_1,\ldots,k_4)
=(-i\lambda_4)\left[
\prod_{j=1}^4\frac{i}{k_j^2-m^2+i0}
\right]\int d^4y\,g(y)e^{i(\sum_jk_j)\cdot y}.
$$

$g\to1$ という断熱切替の極限は無条件には存在しませんが、木レベルの分布係数でそれが正当化される場合、最後の積分は $(2\pi)^4\delta^{(4)}(\sum_jk_j)$ です。係数 $\mathcal G_{4,c}^{(1)}$ に[外線還元](#def-qft11-lsz-amputation)を適用し、木レベル $Z=1$ とすれば

$$
\begin{aligned}
i\mathcal M^{\rm tree}
&=\lim_{k_j^2\to m^2}
\left[\prod_{j=1}^4
\frac{k_j^2-m^2}{i}\,
\frac{i}{k_j^2-m^2+i0}\right](-i\lambda_4)\\
&=-i\lambda_4.
\end{aligned}
$$

$4!$ の収縮は初めから $\mathcal H_I$ の $1/4!$ と相殺されていました。外線 $1,2,3,4$ のラベルは固定されており、対称粒子を観測する際の**最終状態の位相空間の $1/2!$** は、この振幅を求める操作とは別の後続課題です。
<!-- proof-end -->

### 例：三次相互作用では三つの伝播経路を足す

同じ仮定で $\mathcal H_I=\lambda_3:\!\phi_I^3\!:/3!$ とすると、[QFT10の三次交換図](../QFT10/index.md#thm-qft10-symmetry-formula)の二頂点から、四点の木図は外部ラベルの三つの分割に対応します。入射 $p_1,p_2$、出射 $p_3,p_4$ として

$$
s=(p_1+p_2)^2,\quad
t=(p_1-p_3)^2,\quad
u=(p_1-p_4)^2
$$

を導入すると、それぞれの内部線は $i/(s-m^2+i0)$ などを運びます。頂点因子は二個で $(-i\lambda_3)^2=-\lambda_3^2$ だから

$$
i\mathcal M_{\phi^3}^{\rm tree}
=-i\lambda_3^2
\left(\frac{1}{s-m^2+i0}
+\frac{1}{t-m^2+i0}
+\frac{1}{u-m^2+i0}\right).
$$

外線四本の伝播関数はLSZで除きましたが、**内部線の伝播関数は除きません**。外部の $p_j^2=m^2$ を代入しても内部の $s,t,u$ は一般に $m^2$ ではありません。これは後続の散乱運動学へつながる具体例です。

## 6. 何が相関関数から言え、何がまだ言えないか

- [連結相関関数](../QFT10/index.md#def-qft10-connected-correlator)から計算するのは、散乱の恒等寄与を除いた接続振幅です。自由場の四点関数は二点関数の積の和で、連結四点関数は零ですが、$S=I$ のままです。
- 質量殻の極が $m$ ではなく $M$ にあるなら、$(k^2-m^2)$ を掛けて $k^2=m^2$ を調べても物理的な一粒子を取り出せません。物理質量で外線を還元する必要があります。
- 正の $Z$ を持つ孤立一粒子極は外線還元の重要な条件ですが、それだけでは漸近多粒子状態の存在・完全性は導けません。長距離相互作用や不安定粒子には同じ公式を無条件に使えません。
- 木レベルの $i\mathcal M$ から断面積へ進むには、入射流束、Lorentz不変な終状態位相空間、同種粒子因子を導出する必要があります。これらは次の散乱運動学で扱います。

## 7. 演習：極と振幅の間の条件を自分で検算する

特に断らなければ $3+1$ 次元Minkowski時空、$\eta=(+---)$、実スカラーの物理質量 $m>0$、$d\Pi_p=d^3\boldsymbol p/[(2\pi)^3 2E_{\boldsymbol p}]$ を用います。無限体積の平面波はsmearingした波束の極限とみなし、相互作用に関する計算は必要な正則化の下で有限次数の係数を扱います。問題で漸近粒子を仮定するときは、その仮定を答えの中でも確認してください。

### Level A：規格化と極を手で確認する

### 演習 QFT11-A1：波束のノルム

正振動数波束 $f,g$ の内積を $(f,g)_{\mathrm{KG}}$ から求めよ。さらに運動量支持が交わらないとき、対応する一粒子状態の内積が零になることを示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[波束の定義](#def-qft11-invariant-packet)で $f^*_t$ と $g_t$ を代入すると、時間微分の和は $E_{\boldsymbol p}+E_{\boldsymbol q}$ です。空間積分は $(2\pi)^3\delta^{(3)}(\boldsymbol p-\boldsymbol q)$ だから

$$
\begin{aligned}
(f,g)_{\mathrm{KG}}
&=\int \frac{d^3p\,d^3q}{(2\pi)^6\,4E_pE_q}
f^*(\boldsymbol p)g(\boldsymbol q)
(E_p+E_q)(2\pi)^3\delta^{(3)}(\boldsymbol p-\boldsymbol q)\\
&=\int\frac{d^3p}{(2\pi)^3\,2E_p}
f^*(\boldsymbol p)g(\boldsymbol p).
\end{aligned}
$$

最後の式の被積分関数は支持が交わらなければすべての $\boldsymbol p$ で零です。従って $\langle f|g\rangle=0$ です。同じ $f$ を入れると $\langle f|f\rangle=\int d\Pi_p |f|^2\ge0$ で、零なら $f=0$（波束関数の意味で）です。
<!-- solution-end -->

### 演習 QFT11-A2：波束消滅演算子

自由場 $\phi_0$ に対し $a_t(f)=i\int d^3x f_t^*\overleftrightarrow{\partial_t}\phi_0$ とする。自由場の消滅部分と生成部分がそれぞれどのように寄与するかを調べ、$a_t(f)$ の時刻依存性を判定せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[自由波束の命題](#prop-qft11-free-packet)のモード表示を代入します。消滅部分の時間微分係数は $i[-iE_q-iE_p]=E_q+E_p$ で、空間積分のデルタが $\boldsymbol q=\boldsymbol p$ を選びます。従って

$$
\begin{aligned}
a_t(f)\big|_{\mathrm{ann}}
&=\int d\Pi_p\,d\Pi_q\,f^*(\boldsymbol p)a(\boldsymbol q)
(E_p+E_q)e^{i(E_p-E_q)t}
(2\pi)^3\delta^{(3)}(\boldsymbol q-\boldsymbol p)\\
&=\int d\Pi_p\,f^*(\boldsymbol p)a(\boldsymbol p).
\end{aligned}
$$

二行目では $E_q=E_p$ となり、係数 $2E_p$ が $d\Pi_q$ の分母を消しました。一方、生成部分は空間デルタで $\boldsymbol q=-\boldsymbol p$ を選ぶので、$E_q=E_p$ から

$$
a_t(f)\big|_{\mathrm{cre}}
=\int d\Pi_p\,d\Pi_q\,f^*(\boldsymbol p)a^\dagger(\boldsymbol q)
i(iE_q-iE_p)e^{i(E_p+E_q)t}
(2\pi)^3\delta^{(3)}(\boldsymbol p+\boldsymbol q)=0.
$$

最終式に $t$ が残らないため $a_t(f)$ は時刻に依存しません。
<!-- solution-end -->

### 演習 QFT11-A3：正負エネルギー極の分母

$E=\sqrt{|\boldsymbol p|^2+m^2}>0$ に対し、$\varepsilon>0$ を使って

$$
\frac{1}{2E}\left[
\frac{i}{p^0-E+i\varepsilon}
-\frac{i}{p^0+E-i\varepsilon}\right]
$$

の境界値が自由Feynman伝播関数の $i/(p^2-m^2+i0)$ を与えることを示し、一粒子重なりが $\sqrt Z$ なら二点関数の極の係数が $Z$ になる理由を説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

通分すると分子は $i[(p^0+E-i\varepsilon)-(p^0-E+i\varepsilon)]=i(2E-2i\varepsilon)$ です。分母は

$$
(p^0-E+i\varepsilon)(p^0+E-i\varepsilon)
=(p^0)^2-E^2+2iE\varepsilon+\varepsilon^2.
$$

$E>0$ なので $\varepsilon\downarrow0$ の境界値は $i/[(p^0)^2-E^2+i0]$ です。[一粒子極の命題](#prop-qft11-one-particle-pole)で完全性射影を挿入すると、一方の場と一粒子との重なりが $\sqrt Z$、もう一方も $\sqrt Z$ です。従って積は $Z$ となり、極部分は $iZ/(p^2-m^2+i0)$ です。
<!-- solution-end -->

### 演習 QFT11-A4：場の再規格化と外線

場 $\phi_H$ を正の定数 $c$ 倍して $\psi=c\phi_H$ とする。$\phi_H$ の一粒子重なりが $\sqrt Z$ のとき、$\psi$ の波動関数留数を求めよ。$\psi$ を四つ用いた相関関数から外線還元した振幅が変わらないことを計算せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[波動関数留数](#def-qft11-stable-pole)から $\langle\Omega|\psi(0)|p\rangle=c\sqrt Z$、従って $Z_\psi=c^2Z$ です。四点関数は $G_{4,c}^\psi=c^4 G_{4,c}^\phi$。一方[LSZの外線因子](#def-qft11-lsz-amputation)を四本掛けると

$$
\prod_{j=1}^4
\frac{k_j^2-m^2}{i\sqrt{Z_\psi}}
=c^{-4}\prod_{j=1}^4
\frac{k_j^2-m^2}{i\sqrt Z}
$$

です。相関関数の $c^4$ と外線因子の $c^{-4}$ が消え、$i\mathcal M$ は不変です。外線に $Z$ でなく $\sqrt Z$ が現れる理由を検査できました。
<!-- solution-end -->

### 演習 QFT11-A5：全内向き運動量

同じ質量 $m$ の $2\to2$ 散乱で、入射を $p_1,p_2$、出射を $p_3,p_4$ とする。全内向き $k_1,k_2,k_3,k_4$ を指定し、保存デルタの引数と $s+t+u$ を求めよ。各外部粒子は $p_a^2=m^2$ を満たす。

- Level: A

<!-- solution-start -->
#### 詳細解答

入射には正符号、出射には負符号を与え、$(k_1,k_2,k_3,k_4)=(p_1,p_2,-p_3,-p_4)$ です。よってデルタは $\delta^{(4)}(p_1+p_2-p_3-p_4)$ です。$s=(p_1+p_2)^2$、$t=(p_1-p_3)^2$、$u=(p_1-p_4)^2$ とすれば

$$
\begin{aligned}
s+t+u
&=6m^2+2p_1\cdot(p_2-p_3-p_4)\\
&=6m^2-2p_1^2=4m^2,
\end{aligned}
$$

です。二行目では運動量保存 $p_2-p_3-p_4=-p_1$ を使いました。四運動量の符号と質量殻条件は異なる役割を担います。
<!-- solution-end -->

### Level B：相関関数から散乱まで

### 演習 QFT11-B1：源を持つ場の面積分

正振動数Klein–Gordon波束 $f$ と、$(\Box+m^2)F=J$ を満たす滑らかな関数 $F$、空間に局在した源 $J$ を考える。十分速い空間減衰を仮定して、$A_{t_2}(f;F)-A_{t_1}(f;F)$ を $J$ で表せ。$J=0$ の場合も論ぜよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[面積分補題](#lem-qft11-surface-difference)の出発点は

$$
\frac{dA_t}{dt}
=i\int d^3x\,\left[f_t^*\partial_t^2F-(\partial_t^2f_t^*)F\right].
$$

$f$ の自由方程式から $\partial_t^2f_t^*=(\nabla^2-m^2)f_t^*$ とします。二回の空間部分積分を行えば

$$
\frac{dA_t}{dt}
=i\int d^3x\,f_t^*
(\partial_t^2-\nabla^2+m^2)F
=i\int d^3x\,f_t^*J.
$$

よって時間積分により

$$
A_{t_2}-A_{t_1}
=i\int_{t_1}^{t_2}dt\int d^3x\,f_t^*(\boldsymbol x)J(t,\boldsymbol x).
$$

$J=0$ なら右辺は零で、自由場での時刻非依存性と一致します。この式だけで $t_{1,2}\to\mp\infty$ の極限が存在するとは言えず、源の減衰と波束極限が別に必要です。
<!-- solution-end -->

### 演習 QFT11-B2：自由四点相関と恒等散乱

自由実スカラー場の四点時間順序真空期待値を二点関数 $D_{ij}=D_F(x_i-x_j)$ で表示せよ。その連結四点関数、LSZで得る接続 $2\to2$ 振幅、$S$ 自体をそれぞれ答え、矛盾しない理由を説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[自由場のWickの定理](../QFT9/index.md#thm-qft9-boson-wick)で四つの場を完全収縮する方法は $(12)(34)$、$(13)(24)$、$(14)(23)$ の三つだから

$$
G_4^{(0)}
=D_{12}D_{34}+D_{13}D_{24}+D_{14}D_{23}.
$$

各項は二つの連結成分の積なので、[連結四点関数](../QFT10/index.md#def-qft10-connected-correlator)は $G_{4,c}^{(0)}=0$ です。従って[LSZ還元](#thm-qft11-lsz-four-leg)では $i\mathcal M^{(0)}=0$。しかし自由では[漸近状態の定義例](#def-qft11-asymptotic-s)から $S=I$、すなわち自由粒子はそのまま出ていきます。$S=I+iT$ の $I$ の部分は接続振幅に含まれないので、両結論は両立します。
<!-- solution-end -->

### 演習 QFT11-B3：有限切替を持つ四次頂点

$g\in C_c^\infty(\mathbb R^4)$ の正規順序四次相互作用で、一次連結四点関数をFourier変換せよ。$g\to1$ が摂動係数の分布極限として認められ、散乱状態が存在すると仮定し、LSZの四外線を切断して $i\mathcal M$ を求めよ。得た式のどの段階で仮定を用いたかも答えよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[四次頂点の命題](#prop-qft11-quartic-tree)へ戻り、外部座標 $x_j$ をそれぞれFourier変換します。四本の外線は $\widetilde D_F(k_j)=i/(k_j^2-m^2+i0)$ だから

$$
\widetilde G_{4,c}^{(1)}
=(-i\lambda_4)
\prod_{j=1}^4\frac{i}{k_j^2-m^2+i0}
\int d^4y\,g(y)e^{i(\sum_jk_j)\cdot y}.
$$

切替極限を認めたところで、最後の積分が $(2\pi)^4\delta^{(4)}(\sum_jk_j)$ になります。その係数に木レベルの $Z=1$ と[外線還元](#def-qft11-lsz-amputation)を適用すると

$$
\lim\prod_{j=1}^4
\left[\frac{k_j^2-m^2}{i}\frac{i}{k_j^2-m^2+i0}\right](-i\lambda_4)
=-i\lambda_4.
$$

従って $i\mathcal M=-i\lambda_4$ です。Wick収縮の有限次数計算自体は散乱状態を要しませんが、$\int g\to(2\pi)^4\delta$ とこの係数を物理的 $S$ に同定する部分では、**断熱・大時間・質量殻極限の仮定**が必要です。
<!-- solution-end -->

### 演習 QFT11-B4：三次交換図の内部線

同一実スカラーの三次相互作用 $\lambda_3:\!\phi_I^3\!:/3!$ の木レベル $2\to2$ 散乱を考える。外線は全て物理質量殻 $p_j^2=m^2$ にあり、漸近状態と断熱極限が成立すると仮定する。$s,t,u$ 各経路の頂点・内部線因子を掛け、不変振幅を求めよ。内部線までLSZで消してはいけない理由を述べよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[頂点因子](../QFT10/index.md#thm-qft10-vertex-factor)は三価頂点ごとに $-i\lambda_3$ です。二頂点を一つの内部線で結び、四外線をラベル固定すると、入射二つが同じ側にある $s$、$p_1,p_3$ が同じ側にある $t$、$p_1,p_4$ が同じ側にある $u$ の三つがあります。例えば $s$ 経路の因子は

$$
(-i\lambda_3)\frac{i}{(p_1+p_2)^2-m^2+i0}(-i\lambda_3)
=-\frac{i\lambda_3^2}{s-m^2+i0}.
$$

他の二経路では中間運動量が $p_1-p_3$、$p_1-p_4$ です。[QFT10の外部ラベル固定](../QFT10/index.md#def-qft10-symmetry-factor)により三経路は別の項として加え、さらに $3!$ を掛けません。従って

$$
\mathcal M
=-\lambda_3^2
\left(\frac1{s-m^2+i0}
+\frac1{t-m^2+i0}
+\frac1{u-m^2+i0}\right).
$$

LSZが外すのは、漸近一粒子へ接続する**四本の外線**の $i/(k_j^2-m^2+i0)$ です。内部線は散乱過程に特有の運動量 $p_1+p_2$ などを運び、外線質量殻 $p_j^2=m^2$ を課しても一般に分母が零になりません。従って内部線は振幅に残ります。
<!-- solution-end -->

### Level C：外線規格化・質量殻・散乱条件を統合する

### 演習 QFT11-C1：見かけの四点頂点を物理振幅へ

相互作用実スカラー場について以下の情報が与えられたとする。並進不変真空があり、物理質量は $M>0$、波動関数留数は $Z>0$ で、外線四本の極の近くの連結四点関数（運動量保存デルタを除いたもの）は、ある実結合定数 $\lambda$ の最低非零次数で

$$
\mathcal G_{4,c}(k_1,k_2,k_3,k_4)
=(-i\lambda)Z^2
\prod_{j=1}^4\frac{i}{k_j^2-M^2+i0}
+\text{各外線の同時単純極より弱い項}
$$

と書ける。以下を解け。

1. $\langle\Omega|\phi_H(0)|\boldsymbol p\rangle$ を書き、なぜ四点の係数が $Z^2$ なのか説明せよ。
2. 全外線を $M$ の質量殻で還元し、$i\mathcal M$ と $2\to2$ 散乱行列要素の連結部を書け。
3. 間違った質量 $m\ne M$ で外線を切断した場合、何が壊れるか説明せよ。
4. もし相関関数だけが与えられ、漸近波束の存在・断熱極限は未確認なら、上の結果を厳密な物理 $S$ 行列の存在証明と呼べるか。また自由理論では接続振幅と $S$ はそれぞれ何か。

- Level: C

<!-- solution-start -->
#### 詳細解答

**(1) 重なりと係数。** [波動関数留数](#def-qft11-stable-pole)を物理質量 $M$ に適用すると、正規化された一粒子に対して $\langle\Omega|\phi_H(0)|\boldsymbol p\rangle=\sqrt Z$ です。各外線は場と一粒子状態の重なりを一つ含みます。四本分の係数は $(\sqrt Z)^4=Z^2$ です。二点関数の波動関数留数 $Z$ を四回掛けて $Z^4$ とするのは誤りです。

**(2) 四外線還元。** 全内向き運動量を $(k_1,k_2,k_3,k_4)=(p_1,p_2,-p_3,-p_4)$ とし、$p_j^2=M^2$、$p_j^0>0$ とします。[LSZの定義](#def-qft11-lsz-amputation)の $m$ を $M$ に置き換え、各外線に $(k_j^2-M^2)/(i\sqrt Z)$ を掛けると

$$
\begin{aligned}
i\mathcal M
&=\lim_{k_j^2\to M^2}
(-i\lambda)Z^2
\prod_{j=1}^4
\left[
\frac{k_j^2-M^2}{i\sqrt Z}
\frac{i}{k_j^2-M^2+i0}
\right]\\
&=(-i\lambda)Z^2(Z^{-1/2})^4
=-i\lambda.
\end{aligned}
$$

仮定した漸近状態と外線極限が実際に成立する場合、[漸近場を仮定したLSZ四外線還元](#thm-qft11-lsz-four-leg)から

$$
\langle p_3,p_4|iT|p_1,p_2\rangle_c
=(2\pi)^4\delta^{(4)}(p_1+p_2-p_3-p_4)(-i\lambda)
$$

です。振幅は $\mathcal M=-\lambda$ であり、$2\to2$ の恒等散乱分は別に扱います。

**(3) 誤った質量。** 極は $k_j^2=M^2$ にあります。$m\ne M$ の点では各外線因子 $i/(k_j^2-M^2+i0)$ は極を持たず、そこを質量殻とする一粒子の射影・規格化も与えられていません。$(k_j^2-m^2)$ を掛けて $k_j^2=m^2$ とすれば形式的には零へ向かうだけで、物理振幅の抽出になりません。質量再規格化をせずに裸質量で切断してはいけません。

**(4) 残る条件と自由模型。** 外線極の**代数的な波動関数留数の計算**はできますが、[漸近in/out状態](#def-qft11-asymptotic-s)で必要な入射・出射の波束極限や、有限切替からの無限時間極限は与えられていません。従ってこのデータだけでは物理 $S$ の存在は証明できず、上の散乱への同定は条件付きです。自由理論では[Wick四点関数](../QFT9/index.md#thm-qft9-boson-wick)は非連結項だけなので $\mathcal M_c=0$、一方、漸近波束は同じままなので $S=I$ です。接続振幅が零でも散乱演算子が零ではないことを確認できます。
<!-- solution-end -->

## 8. まとめと次の問い

自由場の波束内積は $d\Pi_p$ と $2E_{\boldsymbol p}$ を固定し、散乱in/outは大時間極限が**存在する場合に限って**意味を持ちます。安定一粒子の場との重なり $\sqrt Z$ は二点関数の波動関数留数 $Z$ を生み、LSZでは外線ごとに $(k^2-m^2)/(i\sqrt Z)$ を掛けます。連結四点の木レベル四次頂点からは $i\mathcal M=-i\lambda_4$ を得ました。ただしこの計算自体は、一般の相互作用理論での厳密な散乱極限を構成したことにはなりません。

次は $i\mathcal M$ から実際の散乱確率を求めるため、入射流束・位相空間・同種粒子因子・重心系の運動学を導きます。
