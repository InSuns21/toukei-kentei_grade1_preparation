# QFT14 自由場の二点関数から散乱確率までの総合演習

自由場の二点関数は粒子の伝播を記述し、Wick収縮はその伝播を頂点へつなぎ、LSZ還元は場の相関から粒子の散乱振幅を取り出します。しかし、各段階で $i$、$2E_{\boldsymbol p}$、$Z$、同種粒子の $1/2!$ を落とすと、最後の断面積はもっともらしい形のまま誤った値になります。ここでは別々に学んだ式を、出発点から一続きに計算する練習をします。

中心となる問いは三つです。

1. 二点相関が零でないことと、因果的な信号が伝わることはどう違うか。
2. 真空相関関数の外線の極から、どの仮定の下で規格化された粒子の振幅が得られるか。
3. 同じ振幅を断面積と光学定理の両側へ代入したとき、どの因子が一致を保証するか。

時空は $3+1$ 次元のMinkowski空間、計量は $\eta=\operatorname{diag}(1,-1,-1,-1)$、$\hbar=c=1$ とします。実スカラー場の自由質量は $m>0$ とし、$\omega_{\boldsymbol p}=\sqrt{|\boldsymbol p|^2+m^2}$ と書きます。積分核として現れる場の積は、[QFT5のWightman二点分布](../QFT5/index.md#def-qft5-wightman)と同じく試験関数へ作用する分布であって、点で定義された非有界作用素の積を無条件に意味しません。

散乱側では、相互作用を摂動的に切り替えられ、安定な一粒子状態と適切なin/out波束が存在すると仮定します。まず $\mathcal L_I=-\lambda\phi^4/4!$、実数 $\lambda$ の木レベルを考えます。木計算では外線の物理質量を $m$、[一粒子極の係数](../QFT11/index.md#def-qft11-stable-pole)を $Z=1$ と置きます。$s>4m^2$ の重心系で二粒子弾性散乱を計算し、閾値 $s=4m^2$ の値は上側からの極限で扱います。四次元相互作用場の厳密な非摂動構成まで仮定から証明するものではありません。

## 1. 同じ二点核を三通りに読む

[QFT5の自由真空二点関数](../QFT5/index.md#thm-qft5-wightman-positive)は、時空差 $z=x-y$ について

$$
W(z)=\int\frac{d^3p}{(2\pi)^3\,2\omega_{\boldsymbol p}}\,
e^{-i\omega_{\boldsymbol p}z^0+i\boldsymbol p\cdot\boldsymbol z}.
$$

ここから引数を交換した $W(-z)$ を引いたものが[Pauli–Jordan交換子の核](../QFT5/index.md#def-qft5-pauli-jordan)です。他方、時刻順序を指定した[QFT6のFeynman二点分布](../QFT6/index.md#def-qft6-feynman-two-point)は

$$
D_F(z)=\theta(z^0)W(z)+\theta(-z^0)W(-z).
$$

両者の用途は異なります。

- 交換子 $W(z)-W(-z)$ は観測の順序を交換した差で、[局所的可換性](../QFT5/index.md#thm-qft5-locality)により空間的分離で零になります。
- $D_F$ は時間順序積の真空期待値で、[エネルギー極の処方](../QFT6/index.md#thm-qft6-feynman-poles)により運動量表示が $i/(k^2-m^2+i0)$ となります。空間的分離で零である必要はありません。
- 遅延基本解は外力への応答に用いる別の分布です。[QFT6の支持定理](../QFT6/index.md#thm-qft6-fundamental-support)に従い、光円錐外で消えます。時間順序と遅延性を同一視しません。

**小さな検算**：$z^0=0$ のとき積分の $\boldsymbol p\mapsto-\boldsymbol p$ により $W(0,\boldsymbol z)=W(0,-\boldsymbol z)$ です。従って等時刻の交換子は零ですが、$D_F(0,\boldsymbol z)=W(0,\boldsymbol z)$ は一般に零ではありません。分布の等時刻制限や空間的に離れた試験関数での評価として解釈してください。

## 2. 外線の極を切り取り、図の数を間違えない

相互作用による時間順序四点関数の**連結部**を考えます。[QFT9のWickの定理](../QFT9/index.md#thm-qft9-boson-wick)で四つの外部場が四次頂点の四つの場と結びつく方法は $4!$ 通りです。[QFT10の頂点因子](../QFT10/index.md#thm-qft10-vertex-factor)では作用の $1/4!$ と打ち消し合い、接触頂点の係数は $-i\lambda$ です。全外線を内向き $k=(p_1,p_2,-p_3,-p_4)$ として、全運動量保存デルタを分離した自由外線近似では

$$
\mathcal G_{4,c}^{(1)}(k_1,\ldots,k_4)=
\left[\prod_{j=1}^{4}\frac{i}{k_j^2-m^2+i0}\right](-i\lambda).
$$

この式の $\prod$ は、四つの外線にそれぞれ付くFeynman二点分布の運動量因子を掛けたものです。$-i\lambda$ はそれらを取り除いた核です。[QFT11のLSZ外線還元](../QFT11/index.md#def-qft11-lsz-amputation)は一粒子極を各外線から除くので、$Z=1$ の木レベルでは

$$
\begin{aligned}
i\mathcal M^{(1)}
&=\lim_{k_j^2\to m^2}
\prod_{j=1}^4\frac{k_j^2-m^2}{i}\,
\mathcal G_{4,c}^{(1)}(k_1,\ldots,k_4)\\
&=-i\lambda,\qquad
\mathcal M^{(1)}=-\lambda.
\end{aligned}
$$

一般の相互作用場の二点関数に孤立一粒子極があるとき、その極近傍の係数は $iZ$ です。[QFT11の一粒子極](../QFT11/index.md#prop-qft11-one-particle-pole)および[四外線還元の条件](../QFT11/index.md#thm-qft11-lsz-four-leg)により、各外線の極因子 $i\sqrt Z/(k_j^2-m^2+i0)$ と還元係数 $(k_j^2-m^2)/(i\sqrt Z)$ が一対ずつ打ち消し合います。$Z=1$ は普遍的な恒等式ではなく、ここでの最低次数の規約です。

## 3. 最後の二つの因子を位相空間で追う

[QFT12の二体位相空間](../QFT12/index.md#def-qft12-phase-space)はラベル付き終状態を積分します。等質量の弾性散乱では、$p=\sqrt{s/4-m^2}$ と置いて

$$
\frac{d\Phi_2}{d\Omega}
=\frac{p}{16\pi^2\sqrt s},\qquad
\mathcal F=\sqrt{(p_1\cdot p_2)^2-m^4}
=p\sqrt s.
$$

最初の式の分母は $2E$ を二本掛け、エネルギーのデルタで $p$ を積分した[Jacobian](../QFT12/index.md#prop-qft12-two-body-phase-space)から生じます。二つ目は[入射流束](../QFT12/index.md#def-qft12-rate-cross-section)で、初期状態の対向運動を記述します。同種の**終**状態を全角度でラベル付き積分すると二重に数えるので、ここで $1/2!$ を掛けます。Wick収縮で用いた $4!$ との混同は禁物です。

以下の命題では、この三つの段階をまとめて検算します。既出の式を単に並べ直すのではなく、各係数がどの仮定・積分から来るかを再確認するための命題です。

<a id="prop-qft14-normalization-chain"></a>

<!-- formal-statement-start -->
> **命題（四次実スカラーの二点関数から単位性までの規格化連鎖）**
>
> $3+1$ 次元、$\eta=\operatorname{diag}(1,-1,-1,-1)$、$\hbar=c=1$ とする。質量 $m>0$ の実スカラー場の相互作用が $\mathcal L_I=-\lambda\phi^4/4!$ であり、安定な漸近粒子とLSZの外線極限が存在し、木レベルでは $Z=1$ とする。$s>4m^2$ で同一粒子二体弾性散乱が定義され、最低次数で他の終状態が寄与しないとする。このとき木レベルの接触振幅と全断面積、ならびに単位性が次次数へ要求する前方虚部は

$$
\begin{aligned}
\mathcal M^{(1)}&=-\lambda,\\
\frac{d\sigma^{(2)}}{d\Omega}
&=\frac{\lambda^2}{128\pi^2s},\qquad
\sigma^{(2)}=\frac{\lambda^2}{32\pi s},\\
\operatorname{Im}\mathcal M^{(2)}(s,0)
&=\frac{\lambda^2}{32\pi}\sqrt{1-\frac{4m^2}{s}}.
\end{aligned}
$$

> $\sigma^{(2)}$ は振幅の一次の二乗により結合定数二次となる最低非零断面積である。最後の式は光学定理が要求する虚部であり、ループの実部を計算したものではない。
<!-- formal-statement-end -->

### 証明の見取り図

四次頂点の $4!$ と作用の $1/4!$ を相殺し、四本のFeynman外線をLSZで切断します。続いて二体位相空間と流束の $p$ を相殺し、同種終状態の $1/2!$ を掛けます。最後に $S$ 行列の単位性で、**木レベル振幅の二乗**と**次次数の虚部**を比較します。

<!-- proof-start -->
### 証明

[Wick展開](../QFT9/index.md#thm-qft9-boson-wick)と[頂点則](../QFT10/index.md#thm-qft10-vertex-factor)により、四外線を接触頂点に結ぶ $4!$ 通りと作用の $1/4!$ が相殺されます。外線のFourier伝播関数は[QFT6のFeynman極](../QFT6/index.md#thm-qft6-feynman-poles)から $i/(k_j^2-m^2+i0)$ です。従って[LSZ還元](../QFT11/index.md#thm-qft11-lsz-four-leg)を四回適用し、$i\mathcal M=-i\lambda$ を得ます。$i$ で割ると $\mathcal M=-\lambda$ です。

次に[断面積の定義](../QFT12/index.md#thm-qft12-rate-formulas)と[二体位相空間の角度表示](../QFT12/index.md#prop-qft12-two-body-phase-space)を使います。重心系の等質量弾性散乱では $\mathcal F=p\sqrt s$、終状態も $p_{\rm f}=p$ なので

$$
\begin{aligned}
\frac{d\sigma^{(2)}}{d\Omega}
&=\frac1{4p\sqrt s}\frac1{2!}
\frac{p}{16\pi^2\sqrt s}\,|\mathcal M^{(1)}|^2\\
&=\frac1{4p\sqrt s}\frac12
\frac{p}{16\pi^2\sqrt s}\lambda^2
=\frac{\lambda^2}{128\pi^2s}.
\end{aligned}
$$

振幅は角度に依存しないため、$\int d\Omega=4\pi$ から

$$
\sigma^{(2)}
=4\pi\frac{\lambda^2}{128\pi^2s}
=\frac{\lambda^2}{32\pi s}.
$$

[QFT13の光学定理](../QFT13/index.md#thm-qft13-optical-theorem)の $2\operatorname{Im}\mathcal M^{(2)}=(1/2!)\int d\Phi_2|\mathcal M^{(1)}|^2$ で、ラベル付き二体位相空間の全積分を先に求めると

$$
\int d\Phi_2
=4\pi\frac{p}{16\pi^2\sqrt s}
=\frac{p}{4\pi\sqrt s}.
$$

ゆえに

$$
\begin{aligned}
2\operatorname{Im}\mathcal M^{(2)}
&=\frac12\frac{p}{4\pi\sqrt s}\lambda^2
=\frac{\lambda^2p}{8\pi\sqrt s},\\
\operatorname{Im}\mathcal M^{(2)}
&=\frac{\lambda^2p}{16\pi\sqrt s}
=\frac{\lambda^2}{32\pi}\sqrt{1-\frac{4m^2}{s}}.
\end{aligned}
$$

別の経路で[光学定理](../QFT13/index.md#thm-qft13-optical-theorem)の $\operatorname{Im}\mathcal M=2\mathcal F\sigma_{\rm tot}$ を用いれば、$2p\sqrt s\cdot\lambda^2/(32\pi s)=\lambda^2p/(16\pi\sqrt s)$ となり一致します。光学定理の左辺で $\mathcal M^{(1)}$ の虚部を取っても零です。右辺は結合定数二次なので矛盾はなく、次次数の $\mathcal M^{(2)}$ の虚部が必要です。
<!-- proof-end -->

### 係数を見失ったときの戻り先

| 失いやすいもの | 確認する段階 | 間違えたときの兆候 |
| --- | --- | --- |
| $i$ と正・負エネルギー極 | 時間順序二点分布 | 遅延核と同じ極配置にしてしまう |
| 四次頂点の $4!$ | Wick収縮と作用 | 振幅に余計な階乗が残る |
| $\sqrt Z$ | LSZの四外線 | 場の再規格化で粒子の振幅が変わってしまう |
| エネルギーdeltaのJacobian | 二体位相空間 | 断面積の質量次元が合わない |
| $1/2!$ | 同種の終状態和 | 断面積と光学定理の虚部がともに2倍になる |
| 摂動次数 | $S^\dagger S=I$ | 実数の木振幅に直ちに虚部を要求してしまう |

以下の演習では、必要な出発式を各問に再掲します。問題文だけを見て手を動かし、詳細解答では符号・積分範囲・極限を順に照合してください。

## 4. 演習：一段ずつ規格化を復元する

### 演習 QFT14-A1：等時刻の相関と交換子

質量 $m>0$ の自由実スカラー場の真空二点分布を

$$
W(t,\boldsymbol r)=\int\frac{d^3p}{(2\pi)^3\,2\omega_{\boldsymbol p}}\,
e^{-i\omega_{\boldsymbol p}t+i\boldsymbol p\cdot\boldsymbol r},
\qquad \omega_{\boldsymbol p}=\sqrt{\boldsymbol p^2+m^2}
$$

とする。等時刻で $W(0,\boldsymbol r)-W(0,-\boldsymbol r)=0$ を示せ。また、この等式だけから $W(0,\boldsymbol r)=0$ と結論してよいか答えよ。積分は緩増加分布として解釈する。

- Level: A

<!-- solution-start -->
**詳細解答**

[Wightman二点分布の表示](../QFT5/index.md#thm-qft5-wightman-positive)で $t=0$ とし、$W(0,-\boldsymbol r)$ の積分変数を $\boldsymbol q=-\boldsymbol p$ と取り替えます。Jacobianの絶対値は1、$\omega_{-\boldsymbol q}=\omega_{\boldsymbol q}$ なので

$$
\begin{aligned}
W(0,-\boldsymbol r)
&=\int\frac{d^3p}{(2\pi)^3\,2\omega_{\boldsymbol p}}
e^{-i\boldsymbol p\cdot\boldsymbol r}\\
&=\int\frac{d^3q}{(2\pi)^3\,2\omega_{\boldsymbol q}}
e^{i\boldsymbol q\cdot\boldsymbol r}
=W(0,\boldsymbol r).
\end{aligned}
$$

従って差は零です。しかし同じ二つの量の**差**が零でも各量は零とは限りません。例えば正の時間順序二点分布は等時刻で $W$ に等しく、一般の空間的分離に相関が残ります。[局所的可換性](../QFT5/index.md#thm-qft5-locality)が要求するのは交換子の消滅であって相関の消滅ではありません。評価は空間的に離れた試験関数によるsmearing、または許される等時刻分布の意味で行います。
<!-- solution-end -->

### 演習 QFT14-A2：Feynman極の上下

質量 $m>0$、固定した空間運動量 $\boldsymbol p$ に対して $\omega=\sqrt{\boldsymbol p^2+m^2}$ とする。分母 $(p^0)^2-\omega^2+i\varepsilon$、$\varepsilon>0$ が零になる二つの複素 $p^0$ を一次の $\varepsilon$ まで求め、正・負エネルギー極が実軸のどちら側にあるかを示せ。両極を下半平面へ移す遅延処方と比較せよ。

- Level: A

<!-- solution-start -->
**詳細解答**

まず

$$
(p^0)^2=\omega^2-i\varepsilon
$$

です。$\omega>0$ の周りで平方根を展開します。$(\omega+\delta)^2=\omega^2+2\omega\delta+O(\delta^2)$ なので、$\delta=-i\varepsilon/(2\omega)+O(\varepsilon^2)$ です。二つの根は

$$
p^0_+=\omega-\frac{i\varepsilon}{2\omega}+O(\varepsilon^2),
\qquad
p^0_-=-\omega+\frac{i\varepsilon}{2\omega}+O(\varepsilon^2).
$$

正の極は**下**、負の極は**上**です。[Feynman二点分布の極](../QFT6/index.md#thm-qft6-feynman-poles)は $t>0$ で虚部が負の側に輪郭を閉じて正振動数を、$t<0$ で虚部が正の側に閉じて負振動数を選びます。これに対して[遅延Green核のFourier処方](../QFT6/index.md#thm-qft6-causal-fourier)では両極が下側にあり、負時刻の応答が零になるようにします。極の配置は「伝播」の名称だけからは決まりません。
<!-- solution-end -->

### 演習 QFT14-A3：接触四点の階乗

自由実スカラー場に一次の相互作用 $-\lambda\phi^4/4!$ を加える。四つの区別した外部挿入 $x_1,\ldots,x_4$ を、位置 $y$ の四次頂点へ一本ずつWick収縮する。外部点がすべて頂点へつながる収縮の数を求め、Dyson一次項の係数と掛けて頂点因子を計算せよ。

- Level: A

<!-- solution-start -->
**詳細解答**

頂点の四つの場へ、まず $x_1$ の場を結ぶ選択肢が4個、次いで $x_2$ が3個、$x_3$ が2個、最後の $x_4$ が1個です。従って

$$
N=4\cdot3\cdot2\cdot1=4!=24.
$$

[Dyson一次項](../QFT9/index.md#thm-qft9-dyson-order)は $i\int d^4y\,\mathcal L_I(y)$ なので、[頂点則](../QFT10/index.md#thm-qft10-vertex-factor)に従えば、係数は

$$
i\left(-\frac{\lambda}{4!}\right)N
=-\frac{i\lambda}{24}\cdot24
=-i\lambda.
$$

四つの外部点が一つの頂点に連結しているため、この寄与は連結四点関数に入ります。この $4!$ は収縮の数であり、後で**二つの同種終状態を数える** $1/2!$ とは役割が異なります。
<!-- solution-end -->

### 演習 QFT14-A4：外線留数を消す

[QFT11で定義した安定一粒子極の波動関数係数](../QFT11/index.md#def-qft11-stable-pole)が $Z>0$ の実スカラー理論を考える。四点連結相関の極部分が、全運動量保存デルタを除いて

$$
\mathcal G_{4,c}=
\prod_{j=1}^4\frac{i\sqrt Z}{k_j^2-m^2+i0}\,\mathcal V(k_1,\ldots,k_4)
$$

で与えられ、$\mathcal V$ は各 $k_j^2=m^2$ で有限な核とする。各外線に $(k_j^2-m^2)/(i\sqrt Z)$ を掛け、四外線の極限を求めよ。なぜ $1/Z$ を一外線あたり掛けてはいけないか。

- Level: A

<!-- solution-start -->
**詳細解答**

[LSZの外線切断](../QFT11/index.md#def-qft11-lsz-amputation)で、外線 $j$ について

$$
\frac{k_j^2-m^2}{i\sqrt Z}
\frac{i\sqrt Z}{k_j^2-m^2+i0}
\longrightarrow1
$$

です。有限な残余核を保ち、四本を順に切断すれば

$$
\lim_{k_j^2\to m^2}
\left[\prod_{j=1}^4\frac{k_j^2-m^2}{i\sqrt Z}\right]
\mathcal G_{4,c}
=\mathcal V\big|_{k_j^2=m^2}.
$$

場一個と漸近一粒子状態との重なりは $\sqrt Z$ です。[二点関数の極](../QFT11/index.md#prop-qft11-one-particle-pole)の $Z$ は**二個**の重なりの積なので、一個の外線へ $1/Z$ を掛けると余分に $1/\sqrt Z$ が残ります。四外線では誤って $Z^{-2}$ 倍の振幅になります。ここでは外線極の分離と極限の存在を仮定しています。
<!-- solution-end -->

### 演習 QFT14-A5：二体デルタのJacobian

重心系の総エネルギーを $\sqrt s>2m$ とし、ラベル付き等質量終状態の位相空間を空間運動量デルタで積分した後の式

$$
d\Phi_2=\frac{1}{16\pi^2}
\frac{k^2\,dk\,d\Omega}{E(k)^2}
\delta(\sqrt s-2E(k)),\qquad E(k)=\sqrt{k^2+m^2}
$$

から、$d\Phi_2/d\Omega=p/(16\pi^2\sqrt s)$ を導け。ただし $p=\sqrt{s/4-m^2}>0$ とする。

- Level: A

<!-- solution-start -->
**詳細解答**

デルタ内の関数を $h(k)=\sqrt s-2E(k)$ と置きます。$h(p)=0$、$E(p)=\sqrt s/2$ であり、

$$
h'(k)=-\frac{2k}{E(k)},\qquad
|h'(p)|=\frac{2p}{E(p)}=\frac{4p}{\sqrt s}.
$$

従って $k\ge0$ でデルタの変数変換を行うと

$$
\delta(h(k))
=\frac{E(p)}{2p}\delta(k-p)
=\frac{\sqrt s}{4p}\delta(k-p).
$$

これを $d\Phi_2$ へ代入して $k$ を積分します。

$$
\frac{d\Phi_2}{d\Omega}
=\frac1{16\pi^2}
\frac{p^2}{E(p)^2}\frac{E(p)}{2p}
=\frac{p}{32\pi^2E(p)}
=\frac{p}{16\pi^2\sqrt s}.
$$

この位相空間は**ラベル付き**です。同一粒子二個の過剰計数を取り除く $1/2!$ はまだ掛けていません。[QFT12の導出](../QFT12/index.md#prop-qft12-two-body-phase-space)と同じく、$p=0$ では $h'(p)=0$ なので閾値の等号上でこの変数変換を使わず、上側から極限を取ります。
<!-- solution-end -->

### 演習 QFT14-A6：単位性の次数と同種因子

$m>0$ の同一実スカラー二体散乱で $\mathcal M^{(1)}=-\lambda$、$s>4m^2$、$p=\sqrt{s/4-m^2}$ とする。最低次数で二粒子終状態のみが寄与し、ラベル付き全二体位相空間が $p/(4\pi\sqrt s)$ と与えられるとき、

$$
2\operatorname{Im}\mathcal M^{(2)}(s,0)
=\frac1{2!}\int d\Phi_2\,|\mathcal M^{(1)}|^2
$$

から虚部を求めよ。また木レベルの虚部が零でも矛盾しない理由を述べよ。

- Level: A

<!-- solution-start -->
**詳細解答**

[前方光学定理](../QFT13/index.md#thm-qft13-optical-theorem)の右辺で同種終状態の $1/2!$ を入れ、

$$
2\operatorname{Im}\mathcal M^{(2)}
=\frac12\frac{p}{4\pi\sqrt s}\lambda^2
=\frac{\lambda^2p}{8\pi\sqrt s}.
$$

両辺を2で割り、$p/\sqrt s=\tfrac12\sqrt{1-4m^2/s}$ を使って

$$
\operatorname{Im}\mathcal M^{(2)}(s,0)
=\frac{\lambda^2}{32\pi}\sqrt{1-\frac{4m^2}{s}}.
$$

$\mathcal M^{(1)}$ の虚部は一次 $O(\lambda)$ で零ですが、右辺は $|\mathcal M^{(1)}|^2=O(\lambda^2)$ です。単位性の各次数を比較すると、$O(\lambda)$ と $O(\lambda^2)$ は別の条件です。[QFT13の次数の命題](../QFT13/index.md#prop-qft13-unitarity-order)の通り、必要なのは次次数の虚部であり、実部や任意のループの全積分値まで求めたことにはなりません。
<!-- solution-end -->

## 5. 演習：異なる計算段階を接続する

### 演習 QFT14-B1：自由四点関数から散乱は出ない

質量 $m>0$ の自由実スカラー場で、真空の四点時間順序関数が

$$
\langle\Omega,T\phi_1\phi_2\phi_3\phi_4\Omega\rangle
=D_{12}D_{34}+D_{13}D_{24}+D_{14}D_{23},
\qquad D_{ab}=D_F(x_a-x_b)
$$

と与えられる。これがWickの定理と整合することを説明し、連結四点関数が零になる理由を示せ。連結四外線LSZで非自明な $2\to2$ 振幅を得られるか。最後に、自由粒子が全く移動しないという意味になるか考察せよ。

- Level: B

<!-- solution-start -->
**詳細解答**

[Wickの定理](../QFT9/index.md#thm-qft9-boson-wick)で四場を二本ずつ完全収縮します。最初の場を結ぶ相手は2、3、4の三通りで、残り二場の相手は一意なので、三つの積になります。真空では正規順序された非零粒子数の項は期待値が零です。

三つの項の各々は二点関数二個の積であり、一つの連結成分に四つの外部点を含みません。[連結相関の定義](../QFT10/index.md#def-qft10-connected-correlator)により

$$
G_{4,c}^{\mathrm{free}}=0.
$$

従って[四外線LSZ還元](../QFT11/index.md#thm-qft11-lsz-four-leg)の入力へ連結部を入れると

$$
i\mathcal M_{\mathrm{free},c}
=\lim_{k_j^2\to m^2}\prod_{j=1}^4\frac{k_j^2-m^2}{i}\,
\mathcal G_{4,c}^{\mathrm{free}}=0.
$$

完全な $S$ 行列が零という意味ではありません。自由理論では $S=I$ であり、同じ運動量の粒子がそのまま伝わる恒等行列要素は存在します。しかしそれは連結散乱 $T$ の非自明な遷移ではなく、$S=I+iT$ の **$I$** に含まれます。連結四点と完全な四点の区別をしなければ、自由伝播を散乱の確率と誤認します。
<!-- solution-end -->

### 演習 QFT14-B2：角度依存と同種終状態の全角積分

等質量 $m>0$ の同一実スカラー粒子の弾性 $2\to2$ 散乱を重心系 $s>4m^2$ で考える。近似的な実振幅が

$$
\mathcal M(s,z)=a+bz^2,\qquad z=\cos\theta,\qquad a,b\in\mathbb R
$$

と与えられるとする。ラベル付き二体位相空間と不変流束から同種終状態因子を含む $d\sigma/d\Omega$ を作り、全断面積を積分せよ。$z\mapsto-z$ に対する対称性が何を確認し、何を確認しないか述べよ。

- Level: B

<!-- solution-start -->
**詳細解答**

等質量弾性では、[QFT12の断面積公式](../QFT12/index.md#prop-qft12-cm-cross-section)の $p_{\rm f}/p_{\rm i}=1$ であり、同一の終状態二粒子をラベル付き全角で数えるため $S_{\rm f}=2!$ です。

$$
\frac{d\sigma}{d\Omega}
=\frac{|a+bz^2|^2}{128\pi^2s}
=\frac{a^2+2abz^2+b^2z^4}{128\pi^2s}.
$$

$d\Omega=d\varphi\,dz$、$\varphi\in[0,2\pi)$、$z\in[-1,1]$ を使い、角度積分は

$$
\begin{aligned}
\int_{-1}^1dz&=2,\\
\int_{-1}^1z^2dz&=\left[\frac{z^3}{3}\right]_{-1}^1=\frac23,\\
\int_{-1}^1z^4dz&=\left[\frac{z^5}{5}\right]_{-1}^1=\frac25.
\end{aligned}
$$

従って

$$
\begin{aligned}
\sigma
&=\frac{2\pi}{128\pi^2s}
\left(2a^2+\frac{4ab}{3}+\frac{2b^2}{5}\right)\\
&=\frac1{32\pi s}\left(a^2+\frac{2ab}{3}+\frac{b^2}{5}\right).
\end{aligned}
$$

$z\mapsto-z$ は二つの同種終状態 $p_3\leftrightarrow p_4$ を入れ替えるので、偶関数であることはその交換対称性と整合します。しかし[QFT13の交差関係](../QFT13/index.md#prop-qft13-crossing-tree)は異なる物理領域の**解析的振幅**の関係であり、角度の偶性だけで交差対称性全体や単位性が証明されたわけではありません。
<!-- solution-end -->

### 演習 QFT14-B3：三チャネルの閾値から断面積まで

実スカラー場の三次・四次相互作用を $\mathcal L_I=-g\phi^3/3!-\lambda\phi^4/4!$ とし、正の質量 $m$ の等質量弾性散乱を考える。外線の安定性と木レベル近似の成立を仮定して、振幅

$$
\mathcal M_{\mathrm{tree}}=-\lambda-g^2
\left(\frac1{s-m^2}+\frac1{t-m^2}+\frac1{u-m^2}\right)
$$

から $s\downarrow4m^2$ の角度に依存しない極限を求め、同種終状態の全断面積の極限を求めよ。三つの図の振幅をそれぞれ二乗してから足す手法が誤りである理由も示せ。

- Level: B

<!-- solution-start -->
**詳細解答**

[重心系運動学](../QFT12/index.md#prop-qft12-cm-momentum)では $p^2=s/4-m^2$、$t=-2p^2(1-z)$、$u=-2p^2(1+z)$ です。$s\downarrow4m^2$ では $p\downarrow0$ なので $t,u\to0$ は $-1\le z\le1$ で一様です。三分母を一つずつ評価すると

$$
\frac1{s-m^2}\longrightarrow\frac1{3m^2},
\qquad
\frac1{t-m^2}\longrightarrow-\frac1{m^2},
\qquad
\frac1{u-m^2}\longrightarrow-\frac1{m^2}.
$$

和は $-5/(3m^2)$ なので、[三チャネル木振幅](../QFT13/index.md#prop-qft13-tree-amplitude)の閾値極限は

$$
\mathcal M_0=-\lambda+\frac{5g^2}{3m^2}.
$$

[同種二体角度分布](../QFT13/index.md#prop-qft13-angular-scattering)の $d\sigma/d\Omega=|\mathcal M|^2/(128\pi^2s)$ から、極限の一定振幅を全立体角 $4\pi$ で積分します。

$$
\begin{aligned}
\lim_{s\downarrow4m^2}\sigma_{\mathrm{tree}}
&=\frac{4\pi}{128\pi^2(4m^2)}|\mathcal M_0|^2\\
&=\frac{1}{128\pi m^2}
\left|-\lambda+\frac{5g^2}{3m^2}\right|^2.
\end{aligned}
$$

同一最終状態へ至る三つの交換図と接触図は確率の代替事象ではなく、同じ振幅への**干渉する寄与**です。例えば $|\mathcal M_0|^2$ には $-2\lambda(5g^2/3m^2)$ の干渉項があり、各図を別々に二乗するとこれを落とします。なお三次ポテンシャル単独での真空安定性は保証されないため、安定化した模型の適切な真空近傍の摂動近似として読みます。
<!-- solution-end -->

### 演習 QFT14-B4：交差した領域で断面積の式を流用できるか

質量 $m>0$ の同一実スカラーの弾性散乱で、重心系の正の運動量の大きさを $p$、散乱角の余弦を $z$ とする。$s=4(m^2+p^2)$、$t=-2p^2(1-z)$、$u=-2p^2(1+z)$ の運動学を用いる。

1. 物理領域 $p>0$、$-1\le z\le1$ での $s$、$t$、$u$ の範囲を示せ。
2. 解析的な四点木振幅 $\mathcal M(s,t,u)$ が引数の入替えに対称であっても、観測可能な弾性全断面積 $\sigma(s)$ に $s\leftrightarrow t$ をそのまま代入して別の物理反応の断面積と呼べない理由を述べよ。

- Level: B

<!-- solution-start -->
**詳細解答**

まず $p>0$ より

$$
s=4(m^2+p^2)>4m^2.
$$

$-1\le z\le1$ なので $0\le1\pm z\le2$ です。従って

$$
-4p^2\le t\le0,\qquad -4p^2\le u\le0.
$$

また $t+u=-4p^2$ より

$$
s+t+u=4(m^2+p^2)-4p^2=4m^2.
$$

[QFT13の交差関係](../QFT13/index.md#prop-qft13-crossing-tree)は外線を全入射向きに揃え、解析的な同一の四点振幅の運動量を入れ替える関係です。しかし元の $t\le0$ を新しい物理反応の $s'$ と読むと $s'=t\le0$ となり、正エネルギーの等質量二体入射に必要な $s'\ge4m^2$ に反します。新しい正エネルギー物理領域へは解析接続と外線の入出射の再解釈が必要です。

さらに[断面積の定義](../QFT12/index.md#thm-qft12-rate-formulas)は、その反応の入射流束、終状態の開いた位相空間、同種性、閾値に依存します。従って解析振幅の変数対称性は、観測断面積の数値の単純な等置を意味しません。
<!-- solution-end -->

## 6. 総合演習：二点分布と観測量を往復する

### 演習 QFT14-C1：一つの実スカラーの全規格化

質量 $m>0$ の自由実スカラー場の正振動数二点核と時間順序核を

$$
\begin{aligned}
W(t,\boldsymbol r)
&=\int\frac{d^3p}{(2\pi)^3\,2\omega_{\boldsymbol p}}
e^{-i\omega_{\boldsymbol p}t+i\boldsymbol p\cdot\boldsymbol r},\\
D_F(t,\boldsymbol r)
&=\theta(t)W(t,\boldsymbol r)+\theta(-t)W(-t,-\boldsymbol r)
\end{aligned}
$$

とする。$\omega_{\boldsymbol p}=\sqrt{\boldsymbol p^2+m^2}$、時空は $3+1$ 次元、計量は $(+---)$ とする。摂動的な相互作用は $-\lambda\phi^4/4!$、$\lambda\in\mathbb R$ とする。安定一粒子状態、LSZの極限、木レベルの $Z=1$ を仮定する。$s>4m^2$ の等質量弾性 $2\to2$ で、他の最低次数終状態は存在しないとする。

1. $D_F$ の運動量表示と正・負エネルギー極の向きを示し、等時刻の交換子と時間順序相関を区別せよ。
2. 四点連結相関の一次項から外線切断により $\mathcal M^{(1)}=-\lambda$ を導け。
3. 終状態のデルタ関数のJacobianを明記し、$d\sigma^{(2)}/d\Omega$ と $\sigma^{(2)}$ を求めよ。
4. $S^\dagger S=I$ の $O(\lambda^2)$ の条件から $\operatorname{Im}\mathcal M^{(2)}(s,0)$ を求め、$2\mathcal F\sigma^{(2)}$ と照合せよ。
5. $1/2!$ を入れなかった場合に変わる結果、さらに「前方虚部が求まったので全1ループ振幅も求まった」と言えない理由を説明せよ。

- Level: C

<!-- solution-start -->
**詳細解答**

**1. 二点量**：$D_F$ の空間Fourier係数は $t>0$ では $e^{-i\omega t}/(2\omega)$、$t<0$ では $e^{i\omega t}/(2\omega)$ です。時間Fourier変換で微小減衰を入れると[QFT6のFeynman極](../QFT6/index.md#thm-qft6-feynman-poles)から

$$
\widehat D_F(k)=\frac{i}{k^2-m^2+i0}.
$$

正エネルギー極は下、負エネルギー極は上です。$W(0,\boldsymbol r)-W(0,-\boldsymbol r)=0$ は $\boldsymbol p\mapsto-\boldsymbol p$ により従いますが、これは交換子だけの話です。$D_F(0,\boldsymbol r)=W(0,\boldsymbol r)$ は一般に零とは限りません。[局所的可換性](../QFT5/index.md#thm-qft5-locality)は相関自体の消滅を主張していません。

**2. Wickから外線切断**：[Wickの定理](../QFT9/index.md#thm-qft9-boson-wick)による四外線を一つの頂点へ結ぶ収縮は $4!$ 通りなので、Dyson一次の $i(-\lambda/4!)$ を掛けると $-i\lambda$ です。全内向きの外線を $(k_1,k_2,k_3,k_4)=(p_1,p_2,-p_3,-p_4)$ として、運動量保存デルタを除くと

$$
\mathcal G^{(1)}_{4,c}
=\left[\prod_{j=1}^{4}\frac{i}{k_j^2-m^2+i0}\right](-i\lambda).
$$

[LSZ四外線還元](../QFT11/index.md#def-qft11-lsz-amputation)の各因子 $(k_j^2-m^2)/i$ を掛けると外線の四つの極だけが消えます。従って

$$
i\mathcal M^{(1)}
=\lim_{k_j^2\to m^2}\prod_{j=1}^4\frac{k_j^2-m^2}{i}\,
\mathcal G_{4,c}^{(1)}
=-i\lambda,\qquad \mathcal M^{(1)}=-\lambda.
$$

ここで真空bubbleや自由伝播の非連結四点は連結振幅の入力から除かれています。

**3. 位相空間と流束**：$p=\sqrt{s/4-m^2}$ とし、空間運動量デルタで $\boldsymbol k_4=-\boldsymbol k_3$ とした後、$k=|\boldsymbol k_3|$ と置けば

$$
d\Phi_2=\frac{k^2\,dk\,d\Omega}{16\pi^2E(k)^2}
\delta(\sqrt s-2E(k)).
$$

$E(k)=\sqrt{k^2+m^2}$、$h(k)=\sqrt s-2E(k)$ に対して

$$
h(p)=0,\qquad |h'(p)|=\frac{2p}{E(p)}
=\frac{4p}{\sqrt s}.
$$

ゆえに $\delta(h(k))=\sqrt s\,\delta(k-p)/(4p)$ であり、

$$
\frac{d\Phi_2}{d\Omega}
=\frac{p^2}{16\pi^2E(p)^2}\frac{\sqrt s}{4p}
=\frac{p}{16\pi^2\sqrt s}.
$$

入射流束の不変量は $\mathcal F=p\sqrt s$ です。同種終状態をラベル付き積分したので $1/2!$ を別に掛け、[QFT12のS行列規格化からの崩壊率と断面積](../QFT12/index.md#thm-qft12-rate-formulas)より

$$
\begin{aligned}
\frac{d\sigma^{(2)}}{d\Omega}
&=\frac1{4p\sqrt s}\frac12
\frac{p}{16\pi^2\sqrt s}\lambda^2
=\frac{\lambda^2}{128\pi^2s},\\
\sigma^{(2)}
&=\int_0^{2\pi}d\varphi\int_{-1}^{1}dz\,
\frac{\lambda^2}{128\pi^2s}
=\frac{\lambda^2}{32\pi s}.
\end{aligned}
$$

**4. 光学定理**：$S=I+iT$ を $S^\dagger S=I$ に代入すると

$$
(I-iT^\dagger)(I+iT)=I
\quad\Longrightarrow\quad
-i(T-T^\dagger)=T^\dagger T.
$$

前方行列要素と全終状態の完全性から[QFT13の光学定理](../QFT13/index.md#thm-qft13-optical-theorem)に移り、$O(\lambda^2)$ では二粒子中間状態だけを使います。ラベル付き二体位相空間の積分は

$$
\int d\Phi_2=4\pi\frac{p}{16\pi^2\sqrt s}
=\frac{p}{4\pi\sqrt s}.
$$

よって

$$
2\operatorname{Im}\mathcal M^{(2)}
=\frac12\frac{p}{4\pi\sqrt s}\lambda^2
=\frac{\lambda^2p}{8\pi\sqrt s},
$$

すなわち

$$
\operatorname{Im}\mathcal M^{(2)}
=\frac{\lambda^2p}{16\pi\sqrt s}
=\frac{\lambda^2}{32\pi}\sqrt{1-\frac{4m^2}{s}}.
$$

別経路として $2\mathcal F\sigma^{(2)}$ を計算すると

$$
2p\sqrt s\,\frac{\lambda^2}{32\pi s}
=\frac{\lambda^2p}{16\pi\sqrt s}
$$

となり同じ虚部です。

**5. 誤差の発見と適用範囲**：$1/2!$ を忘れると上の断面積は $\lambda^2/(16\pi s)$、単位性右辺から得る虚部も $\lambda^2p/(8\pi\sqrt s)$ となり、正しい値の2倍です。虚部を決めるのは質量殻上の**包摂和**であり、ループ振幅の実部、正則化・反項、解析的な全振幅は決まりません。また一般の相互作用や長距離相互作用で安定漸近状態・極限が存在するという主張もしていません。最低次数の実振幅と次次数の正の虚部は異なる摂動次数なので矛盾しません。
<!-- solution-end -->

### 演習 QFT14-C2：異種粒子へ切り替えると何が変わるか

同じ質量 $m>0$ の**異なる**実スカラー場 $\phi,\chi$ を考える。自由質量と外線の規格化は同じで、相互作用は

$$
\mathcal L_I=-\frac h4\phi^2\chi^2,\qquad h>0
$$

のみとする。安定な漸近粒子が存在し、木レベルで $Z_\phi=Z_\chi=1$、$s>4m^2$ の $\phi\chi\to\phi\chi$ 弾性散乱を考える。最低次数の切断へ寄与する二体中間状態は $\phi\chi$ のみと仮定する。

1. 一次頂点のWick収縮の数を求め、木振幅を導け。
2. ラベル付き二体位相空間から微分断面積・全断面積を導け。QFT14-C1の同じ数値の結合定数の場合と比較せよ。
3. 前方光学定理により次次数の虚部を計算し、$2\mathcal F\sigma$ と比較せよ。
4. 二つの場が違うのに $\phi\chi$ 終状態へ $1/2!$ を掛ける誤り、逆に$\phi\phi$ の計算から $1/2!$ を外す誤りがどの段階で生じるか説明せよ。

- Level: C

<!-- solution-start -->
**詳細解答**

**1. 頂点とLSZ**：頂点の二つの $\phi$ を、入射と出射の $\phi$ 外線へ結ぶ順序は $2!$ 通りです。同様に二つの $\chi$ の順序は $2!$ 通りなので、合わせて $2!\,2!=4$ 通りになります。Dyson一次項は $i(-h/4)$ ですから

$$
i\left(-\frac h4\right)(2!)(2!)=-ih.
$$

四外線のFeynman極を切断する[LSZ規格化](../QFT11/index.md#def-qft11-lsz-amputation)で、$Z_\phi=Z_\chi=1$ とすると

$$
i\mathcal M^{(1)}_{\phi\chi\to\phi\chi}=-ih,
\qquad \mathcal M^{(1)}=-h.
$$

これは同種四次頂点の $4!$ の代わりに二種の $2!2!$ を数えた結果です。いずれも相互作用に含まれる階乗と打ち消し合い、頂点因子は結合定数の $-i$ 倍になります。

**2. 異種終状態の断面積**：等質量弾性の重心系では $p=\sqrt{s/4-m^2}$、$\mathcal F=p\sqrt s$、[二体位相空間](../QFT12/index.md#prop-qft12-two-body-phase-space)は

$$
\frac{d\Phi_2}{d\Omega}
=\frac{p}{16\pi^2\sqrt s}.
$$

終状態の一粒子は $\phi$、もう一粒子は $\chi$ と種類で区別できるため、$S_{\rm f}=1$ です。したがって

$$
\begin{aligned}
\frac{d\sigma^{(2)}}{d\Omega}
&=\frac1{4p\sqrt s}\frac{p}{16\pi^2\sqrt s}\,h^2
=\frac{h^2}{64\pi^2s},\\
\sigma^{(2)}
&=4\pi\frac{h^2}{64\pi^2s}
=\frac{h^2}{16\pi s}.
\end{aligned}
$$

$h=\lambda$ の数値比較では、同種模型の $\lambda^2/(32\pi s)$ の2倍です。ただし**別の理論**なので、これは終状態計数の効果を隔離した比較であり、両理論の全高次振幅が等しいという意味ではありません。

**3. 単位性**：[QFT13の光学定理](../QFT13/index.md#thm-qft13-optical-theorem)の右辺で最低次数の $\phi\chi$ の終状態和に $1/2!$ は付きません。従って

$$
\begin{aligned}
2\operatorname{Im}\mathcal M^{(2)}(s,0)
&=\int d\Phi_2\,|-h|^2
=\frac{p}{4\pi\sqrt s}h^2,\\
\operatorname{Im}\mathcal M^{(2)}(s,0)
&=\frac{h^2p}{8\pi\sqrt s}
=\frac{h^2}{16\pi}\sqrt{1-\frac{4m^2}{s}}.
\end{aligned}
$$

独立の検算では

$$
2\mathcal F\sigma^{(2)}
=2p\sqrt s\frac{h^2}{16\pi s}
=\frac{h^2p}{8\pi\sqrt s}
$$

で、前方虚部に一致します。

**4. 誤りの位置**：収縮の $2!2!$ は同一頂点の**外線結合方法**を数えたものです。終状態の過剰計数はこれとは別で、$\phi(\boldsymbol k_3)\chi(\boldsymbol k_4)$ と $\phi(\boldsymbol k_4)\chi(\boldsymbol k_3)$ は種類と運動量を結びつけた異なる終状態です。よって異種状態に $1/2!$ を掛ければ断面積・単位性右辺を半分にしてしまいます。他方 $\phi\phi$ では二つの最終粒子のラベル交換が同じ状態を重複計数するため、因子を外すと両者を2倍にしてしまいます。両ケースで**振幅は先に干渉を含めて計算し、確率へ移るときに終状態因子を決める**のが正しい順序です。
<!-- solution-end -->

## 7. まとめ：式の前に成立条件を確認する

計算の入口は自由場の二点分布ですが、散乱までの矢印は無条件にはつながりません。時間順序核の極、真空と一粒子状態の重なり、in/out状態の存在、外線極限、位相空間の正エネルギー条件がそれぞれ役割を持ちます。

自由場の局所的可換性は相関の消滅ではなく**交換子の消滅**です。Wickの収縮数は**頂点係数**を決め、同種の終状態階乗は**振幅を二乗した後の計数**を決めます。最後に、光学定理は木振幅の実数性を否定するのではなく、木振幅の二乗が次次数に必要とする虚部を予測します。

これらを自分の手で照合できたら、次に扱う量子電磁力学・ループ・くりこみでは、どの追加条件・計算が必要になったかを見分けられます。
