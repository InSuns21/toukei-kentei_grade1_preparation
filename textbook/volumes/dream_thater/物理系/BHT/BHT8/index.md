# BHT8 Hawking温度の熱力学的意味

<!-- definition-example-audit: strict -->

古典的な[Schwarzschildの変分恒等式](../BHT1/index.md#prop-bht1-variation-identity)や[Kerrの第一法則](../BHT5/index.md#thm-bht5-kerr-first-law)に現れる表面重力 $\kappa$ は、これまで地平線の**幾何学的係数**でした。他方、[QCURV11のHawking熱因子](../../QCURV/QCURV11/index.md#thm-qcurv11-thermal-ratio)は量子場の後期波束に温度を与えます。両者の $\kappa$ が同じでも、ただちに「孤立したブラックホールは熱浴と平衡している」とは言えません。

本講の問いは三つです。

1. **どの時計で測った温度か**――地平線を生成するKilling場の規格化と、静止時計への赤方偏移を区別する。
2. **何が熱的なのか**――放射の熱因子、量子状態全体の平衡性、正味流束を区別する。
3. **熱力学へどう渡すか**――幾何学的第一法則の面積係数に温度を代入し、エントロピーの同定に何がまだ必要かを見極める。

基本設定は4次元、漸近平坦、$\Lambda=0$、Einstein重力、計量符号 $(-,+,+,+)$、自然単位 $G=c=\hbar=k_B=1$ です。$M>0$ は幾何単位の質量、$\xi=\partial_t$ は無限遠で $g(\xi,\xi)\to-1$ となる時間並進Killing場です。まず非回転・非荷電のSchwarzschild外部 $r>2M$ を使い、最後に非極限の定常回転・帯電解族へつなぎます。

## 1. Hawking温度はどの時間の温度か

### 1.1 遠方時計と放射のBoltzmann因子

[BHT1のSchwarzschild地平線データ](../BHT1/index.md#prop-bht1-schwarzschild-data)では、面積と表面重力は

$$
A=16\pi M^2,\qquad \kappa=\frac1{4M}.
$$

一方、[QCURV10の崩壊光線の指数則](../../QCURV/QCURV10/index.md#thm-qcurv10-late-exponential)と[QCURV11の正負周波数混合](../../QCURV/QCURV11/index.md#thm-qcurv11-thermal-ratio)から、無限遠のKilling周波数 $\omega>0$ に対応する熱的な比が

$$
e^{-\beta_H\omega},\qquad
\beta_H=\frac{2\pi}{\kappa}=8\pi M,
\qquad T_H=\beta_H^{-1}=\frac{1}{8\pi M}
$$

となります。$\beta_H$ はこの自然単位での**逆温度**です。表面重力そのものが温度なのではなく、量子効果を表す $2\pi$ と $\hbar$（ここでは1）が介在しています。$M\mapsto2M$ なら $\kappa,T_H$ は半分、$\beta_H$ は2倍になります。

さらに、[QCURV11の波束占有数](../../QCURV/QCURV11/index.md#prop-qcurv11-late-packet-planck)は理想化した後期の出射チャネルで

$$
n_H(\omega)=\frac{1}{e^{\beta_H\omega}-1}
$$

となります。**これが全方向の黒体放射の強度そのものではありません。** 実際に遠方へ到達するモードには[QCURV12の灰色体因子](../../QCURV/QCURV12/index.md#def-qcurv12-greybody-factor)が掛かり、初期過渡・周波数帯・場の種類・背景固定近似も指定する必要があります。

### 1.2 規格化を変えた式の意味

上の $T_H$ は **無限遠で単位長の $\xi$ に対応する時刻** $t$ を採用した温度です。地平線生成Killing場を定数倍すると表面重力も定数倍されるため、温度の数値も変わります。しかし測定可能な熱的比がそれで変わっては困ります。比較するエネルギー側も同時に変わることを確かめます。

以下の $\omega$ は、Killing場 $\chi$ の流れで測るスカラー場の正周波数です。モード $\phi$ に対して

$$
\mathcal L_\chi\phi=-i\omega\phi
$$

と書き、$\mathcal L$ はLie微分を表します。回転地平線では、[BHT5の地平線生成場](../BHT5/index.md#prop-bht5-kerr-data)のように $\chi$ は時間並進と軸回転の組合せであり、その軌道は一般に無限遠の座標系で静止せず**共回転**します。

$\chi$ が時間的である領域に限り、$N:=\sqrt{-g(\chi,\chi)}>0$ と置くと、$u=\chi/N$ は単位時間的な観測者の四元速度です。同じモードをこの時計で測る局所エネルギー $E_{\rm loc}$ は、スカラー場に対するLie微分の作用から

$$
\mathcal L_u\phi=\frac1N\mathcal L_\chi\phi
=-i\frac\omega N\phi,
\qquad E_{\rm loc}=\frac\omega N.
$$

したがって $\chi$ 時間での温度パラメータ $\kappa/(2\pi)$ と局所エネルギーは**同じ時計へ換算**して比較します。これだけで回転する外部場の大域的なKMS平衡が存在すると主張するものではありません。

<a id="prop-bht8-normalization"></a>

<!-- formal-statement-start -->
> **命題（Hawking熱因子のKilling規格化不変性）**  
> 非極限の定常Killing地平線で、$\chi$ の表面重力を $\kappa>0$ とし、$\chi$ の時間に関するスカラー場モードの正の周波数を $\omega>0$ とする。$a>0$ を定数として $\chi'=a\chi$ と再規格化すると、$\kappa'=a\kappa$、$\omega'=a\omega$ である。この両方を変換すると、Hawkingの逆温度 $\beta=2\pi/\kappa$ について

$$
\boxed{\beta'\omega'=\beta\omega,\qquad
e^{-\beta'\omega'}=e^{-\beta\omega}.}
$$

> また $\chi$ に沿う時間的軌道（回転時は共回転軌道）で $N=\sqrt{-g(\chi,\chi)}>0$ とすれば、形式的な局所温度パラメータ $T_{\rm loc}=\kappa/(2\pi N)$ はこの再規格化で不変である。この式単独では場のKMS平衡を保証しない。無限遠の規格化を外した $\kappa'/(2\pi)$ を、そのまま無限遠の物理温度と呼んではならない。
<!-- formal-statement-end -->

### 証明の見取り図

周波数は時間流の生成子に対する固有値です。生成子を $a$ 倍すると周波数も $a$ 倍になります。一方、温度が掛かる指数には**逆温度×エネルギー**が入るので、二つの倍率が打ち消し合います。

<!-- proof-start -->
### 証明

導入で指定したスカラーモードの $\mathcal L_\chi\phi=-i\omega\phi$ を使います。Lie微分はKilling場の定数倍に線形なので

$$
\mathcal L_{\chi'}\phi
=\mathcal L_{a\chi}\phi
=a\mathcal L_\chi\phi=-i(a\omega)\phi
$$

より $\omega'=a\omega$ です。表面重力の定義 $\chi^b\nabla_b\chi^a=\kappa\chi^a$ を地平線上で用い、$a$ が定数であることに注意すると

$$
\chi'^b\nabla_b\chi'^a
=a^2\chi^b\nabla_b\chi^a
=a^2\kappa\chi^a
=(a\kappa)\chi'^a.
$$

よって $\kappa'=a\kappa$、$\beta'=2\pi/(a\kappa)=\beta/a$ で、積 $\beta'\omega'=(\beta/a)(a\omega)=\beta\omega$ です。さらに $N'=\sqrt{-g(a\chi,a\chi)}=aN$ だから

$$
T'_{\rm loc}=\frac{\kappa'}{2\pi N'}
=\frac{a\kappa}{2\pi aN}=T_{\rm loc}.
$$

ここで $a>0$ は将来向きと正周波数の向きを保つために必要です。
局所エネルギーも $E'_{\rm loc}=\omega'/N'=(a\omega)/(aN)=E_{\rm loc}$ であり、共回転時計に対する周波数の変換と一致します。
<!-- proof-end -->

**数値による確認。** $\chi'=2\chi$ とすると $\beta'_H=4\pi M$、$\omega'=2\omega$。したがって $\beta'_H\omega'=(4\pi M)(2\omega)=8\pi M\omega$ のままです。物理的に別の質量 $2M$ の解へ移る操作とは違い、**同じ解の時間ラベルを取り換えただけ**です。

## 2. 熱い放射と熱平衡は別の主張

### 2.1 三つの量子状態を比較する

[QCURV13で定義した三状態](../../QCURV/QCURV13/index.md#def-qcurv13-three-states)では、同じ $M$、同じ $T_H$ の式を使っても、外部場の境界条件が違います。入射する場と地平線側から出る場の両方を考える必要があります。

| 状態 | 無限遠からの入射 | 地平線側の出射 | 外部全体の熱平衡 | 無限遠の正味流束 |
| --- | --- | --- | --- | --- |
| Boulware | 真空 | 真空 | Hawking温度の平衡ではない | 0（地平線は非正則） |
| Unruh | 真空 | 後期に熱的 | 非平衡 | 外向きに正 |
| Hartle–Hawking（HH） | 熱的 | 熱的 | Killing時間でKMS平衡 | 0（双方向の流束は存在） |

ここで「出射が熱的」という事実だけから、遠方に届く強度まで理想的な黒体スペクトルに一致すると判断してはいけません。[QCURV13の散乱込み流束定理](../../QCURV/QCURV13/index.md#thm-qcurv13-state-flux)に従えば、単一の角モードについて $n_H=(e^{\beta_H\omega}-1)^{-1}$、透過率 $0\le\Gamma\le1$ として、Unruhの正味占有数流束は $\Gamma n_H$、HHは出射・入射とも $n_H$ なので正味零です。

例えば $n_H=2$、$\Gamma=1/4$ ならUnruhでは正味 $1/2$、HHでは**出射2・入射2・正味0**となります。熱的出射成分を持つことは、単独では平衡性も光度も決めません。

一方で崩壊後の外部は厳密な永遠のSchwarzschild時空ではありません。QCURV11の後期・準定常・波束近似を用いた **Unruh型の放射**は、HHの熱浴に浸った永遠の平衡ブラックホールとは異なります。蒸発に伴う質量変化を求めるには、さらに逆作用とエネルギー保存に基づく光度の計算が必要です。

### 2.2 熱浴を置くとき何を一致させるか

[TH1の熱平衡の定義](../../TH/TH1/index.md#def-th1-thermal-equilibrium)では接触後の正味熱移動の有無を問いました。しかし重力場では、異なる半径の局所温度を数字のまま等置できません。半径 $R>2M$ の静止壁では、固有時間 $\tau_R$ とKilling時間 $t$ の関係は

$$
d\tau_R=N_R\,dt,
\qquad N_R:=\sqrt{1-\frac{2M}{R}}>0.
$$

同じ正周波数モードなら、[QCURV9の赤方偏移](../../QCURV/QCURV9/index.md#prop-qcurv9-redshift)から壁での局所エネルギーは $E_R=\omega_\infty/N_R$ です。局所浴が熱的であれば、浴の重みは $e^{-E_R/T_R}$ であり、地平線側の重み $e^{-\omega_\infty/T_H}$ と比較します。二つの熱因子の一致を調べるため、次に壁と地平線の温度について必要な条件を明確にします。正味流束の消失そのものは、場の状態と散乱境界条件も併せて検査する必要があります。

<a id="def-bht8-bath-matching"></a>

<!-- formal-statement-start -->
> **定義（静止熱浴と地平線の温度整合条件）**  
> $M>0$ のSchwarzschild外部 $R>2M$ に静止する壁を置き、$N_R=\sqrt{1-2M/R}$ とする。$\xi=\partial_t$ は無限遠で単位規格化し、非極限地平線のHawking温度を $T_H=1/(8\pi M)>0$ とする。壁の静止時計で測る正温度 $T_R$ が

$$
\boxed{N_R T_R=T_H}
$$

> を満たすことを、静止熱浴と地平線の**温度整合**と定義する。この条件はKillingエネルギーを交換する局所平衡浴の必要な温度条件であり、単独で全場のKMS性、地平線正則性、有限壁での力学的・熱的安定性を保証しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht8-bath-matching -->
**定義の確認**：直接例として $R=4M$ を選びます。このとき $R>2M$、$N_R=\sqrt{1-1/2}=1/\sqrt2>0$ です。$T_R=\sqrt2/(8\pi M)$ に保った壁について

$$
N_R T_R=\frac1{\sqrt2}\frac{\sqrt2}{8\pi M}
=\frac1{8\pi M}=T_H.
$$

距離条件、Killing規格化、温度の正値、積の等式を確認しました。対照的に $T_R=T_H$ と置くと $N_RT_R=T_H/\sqrt2\ne T_H$ で整合しません。さらにこの等式だけでは、例えば入射真空のUnruh状態に外部平衡が実現したと判定できません。
<!-- definition-example-end -->

<a id="prop-bht8-tolman-bath"></a>

<!-- formal-statement-start -->
> **命題（静止熱浴と地平線のTolman整合）**  
> $M>0$ の永遠のSchwarzschild外部で、場が無限遠規格化のKilling時間に関して $\beta_H=8\pi M$ のKMS性を持つHH状態にあり、半径 $R>2M$ の静止世界線への二点分布の引戻しと定常検出率が存在するとする。このとき静止壁でのKMS温度は

$$
\boxed{T_R=\frac{T_H}{N_R}}
$$

> であり、すべての $\omega_\infty>0$ について $E_R=\omega_\infty/N_R$ と置くと

$$
\boxed{\frac{E_R}{T_R}=\frac{\omega_\infty}{T_H}.}
$$

> 壁の温度整合は成立するが、これはHH状態を既に仮定した結果であり、温度整合だけからHH状態を構成する逆向きの定理ではない。
<!-- formal-statement-end -->

### 証明の見取り図

[QCURV14のKMS-Tolman則](../../QCURV/QCURV14/index.md#thm-qcurv14-tolman)を静止世界線 $r=R$ と逆温度 $\beta_H$ に適用します。壁の固有時間に換算したエネルギーと温度は、**同じ赤方偏移の逆数**だけ大きくなるので比は保存されます。

<!-- proof-start -->
### 証明

仮定から $N_R>0$ で、HH状態はKilling時間 $t$ に関して $\beta_H$-KMSです。[Tolman則](../../QCURV/QCURV14/index.md#thm-qcurv14-tolman)に $r=R$ と $\beta_\infty=\beta_H$ を代入すると

$$
\beta_R=N_R\beta_H,
\qquad T_R=\beta_R^{-1}
=\frac{1}{N_R\beta_H}=\frac{T_H}{N_R}.
$$

また[静止時計の周波数変換](../../QCURV/QCURV9/index.md#prop-qcurv9-redshift)を $r=R$ の同じモードへ適用して $E_R=\omega_\infty/N_R$ を得ます。したがって

$$
\frac{E_R}{T_R}=
\frac{\omega_\infty/N_R}{T_H/N_R}
=\frac{\omega_\infty}{T_H}.
$$

KMS性は全状態についての入力であり、最後の等式だけで入射・出射チャネルの占有を決定したわけではありません。
<!-- proof-end -->

**検出器との照合。** $R=4M$、局所励起ギャップ $E=1/(8\pi M)$ を持つ静止検出器では、[QCURV14のKMS検出率比](../../QCURV/QCURV14/index.md#thm-qcurv14-tolman)により

$$
\frac{\dot{\mathcal F}_R(E)}{\dot{\mathcal F}_R(-E)}
=e^{-E/T_R}=e^{-1/\sqrt2}.
$$

ここで $E$ は**壁の固有時間**に対するエネルギー差です。遠方で定義した $\omega_\infty$ と混ぜて指数へ入れません。$R\downarrow2M$ では $N_R\to0$、静止温度 $T_R\to\infty$ ですが、地平線そのものに静止する時間的観測者は存在しません。自由落下検出器の応答や局所応力の発散を示す式でもありません。

## 3. 幾何学的第一法則へ温度を入れる

### 3.1 面積項を「熱の項」と呼ぶ前に

古典的な[BHT5のKerr–Newman第一法則](../BHT5/index.md#prop-bht5-kn-first-law)は非極限の定常解族の間で

$$
dM=\frac{\kappa}{8\pi}\,dA
+\Omega_H\,dJ+\Phi_H\,dQ
$$

を与えます。$\Omega_H$ は無限遠の非回転枠に対する地平線角速度、$\Phi_H$ は無限遠で零に規格化した電位差です。$dM$ は近傍の定常解同士の質量差の**微分**であって、任意の有限時間の物質流入がそのまま可逆熱交換であるという意味ではありません。

量子場を入れると $\kappa/(2\pi)$ に遠方の温度という測定可能な意味が加わります。しかし温度が分かっただけでは、どの熱力学的状態量をエントロピーと呼ぶのか、積分定数や適用領域をどう定めるのかまでは確定していません。この一歩を次講で扱うため、ここでは **$A/4$ を幾何学的な面積座標として書き換える**ことだけを行います。

<a id="prop-bht8-first-law-area"></a>

<!-- formal-statement-start -->
> **命題（Hawking温度による第一法則の面積係数表示）**  
> 4次元、$\Lambda=0$、$G=c=\hbar=k_B=1$ の漸近平坦なEinstein–Maxwell非極限Kerr–Newman定常解族において、Killing時間と電位を無限遠で規格化し、$\kappa>0$ とする。量子場の温度パラメータが $T_H=\kappa/(2\pi)$ と与えられると仮定する。このとき隣接する定常解の変分について

$$
\boxed{dM-\Omega_H\,dJ-\Phi_H\,dQ
=T_H\,d\left(\frac{A}{4}\right).}
$$

> この恒等式は面積微分の係数を温度で表したものであり、一般の回転・帯電場における量子温度式の独立な導出を意味しない。有限の非平衡過程についての $\delta Q_{\rm heat}=T_H\,d(A/4)$ を無条件に主張せず、$A/4$ の熱力学的エントロピーとしての同定・積分定数の選択も、この命題単独では結論しない。
<!-- formal-statement-end -->

### 証明の見取り図

必要なのは二種類の入力、すなわち**古典的な解族の第一法則**と**量子場からのHawking温度**です。$\kappa>0$ を保つ非極限領域で、面積微分の係数を直接比較します。

<!-- proof-start -->
### 証明

[Kerr–Newmanの第一法則](../BHT5/index.md#prop-bht5-kn-first-law)が適用される非極限定常解族なので

$$
dM-\Omega_HdJ-\Phi_HdQ=\frac{\kappa}{8\pi}dA.
$$

右辺の係数を、Schwarzschildで[QCURV11が導出したHawking温度式](../../QCURV/QCURV11/index.md#thm-qcurv11-thermal-ratio)の一般化として**仮定した** $T_H=\kappa/(2\pi)$ に合わせて分解すると

$$
\frac{\kappa}{8\pi}dA
=\frac{\kappa}{2\pi}\frac{dA}{4}
=T_H\,d(A/4).
$$

$1/4$ は定数なので $d(A/4)=(1/4)dA$ であり、等式が成立します。ここで用いた変分の仮定は第一法則のそれと同じで、有限変化や動的地平線へ拡張していません。
<!-- proof-end -->

**Schwarzschildでの独立検算。** $J=Q=0$ を保つ一パラメータ解族では

$$
\begin{aligned}
T_H\,d(A/4)
&=\frac1{8\pi M}\,d(4\pi M^2)\\
&=\frac1{8\pi M}(8\pi M\,dM)=dM.
\end{aligned}
$$

これは確かに古典的な[BHT1の変分恒等式](../BHT1/index.md#prop-bht1-variation-identity)を再現します。反対に、二状態 $M$ と $2M$ について $T_H(M)\,\Delta(A/4)=\Delta M$ と**有限差の係数を初期値に固定**すると、左辺は

$$
\frac1{8\pi M}\left(4\pi(2M)^2-4\pi M^2\right)
=\frac{3M}{2}\ne M.
$$

正しい微分恒等式を有限差へ取り違えたために失敗しました。実際の動的な質量交換には場の流束・仕事・逆作用を調べる必要があります。

### 3.2 数値を入れると熱の係数はどう見えるか

例えば非極限RN解族で電荷 $Q$ を固定すると、[非極限RN定常解族の第一法則](../BHT4/index.md#thm-bht4-rn-first-law)から $dM=(\kappa/8\pi)dA$ です。温度 $T_H=\kappa/(2\pi)$ と置き換えれば $dM=T_Hd(A/4)$ がやはり成り立ちます。ただし $Q$ を動かすなら $\Phi_HdQ$ を差し引かずに「熱の部分」を取り出すことはできません。同様に回転時は $\Omega_HdJ$ が残ります。

この式が「なぜ $A/4$ が熱的エントロピーになり得るのか」を示す強い手掛かりです。しかし実際に熱力学的エントロピーを定義し、その値が解族の状態だけで決まること、零点と適用域を吟味することはBHT9で行います。ここで古典的な面積非減少と量子蒸発時のエントロピー収支を混同してはいけません。

## 4. 物理単位・質量応答・近似の限界

### 4.1 $M$ をSI質量に戻す

自然単位の $M$ は長さでもあります。SIでの質量を $m>0$（kg）とすると、対応する幾何学的長さは $M=Gm/c^2$ です。$\kappa_{\rm geo}=1/(4M)$ の次元は長さの逆数で、温度へ戻すときには量子作用 $\hbar$、速度 $c$、Boltzmann定数 $k_B$ が必要です。

<a id="prop-bht8-physical-units"></a>

<!-- formal-statement-start -->
> **命題（Schwarzschild温度の物理単位と質量応答）**  
> 4次元の漸近平坦・非回転・非荷電Schwarzschild解で、SI質量 $m>0$、無限遠規格化を固定し、半古典的Hawking温度の式を用いると

$$
\boxed{T_H(m)=\frac{\hbar c^3}{8\pi G k_B m}.}
$$

> この背景解族の温度関数について $dT_H/dm=-T_H/m<0$、したがって $T_H(2m)=T_H(m)/2$ である。この微分は非平衡蒸発の全履歴や、指定されていないアンサンブルの安定性を証明しない。
<!-- formal-statement-end -->

### 証明の見取り図

$1/M$ は逆長さです。量子場の温度式で $\hbar c/k_B$ を掛けるとkelvinになり、最後に $M=Gm/c^2$ を代入します。微分は正の質量上の一変数関数として実施します。

<!-- proof-start -->
### 証明

自然単位では $T_H=1/(8\pi M)$。復元に際し、温度の単位は $\hbar c/(k_B M)$ なので

$$
T_H=\frac{\hbar c}{8\pi k_B M}
=\frac{\hbar c}{8\pi k_B}\frac{c^2}{Gm}
=\frac{\hbar c^3}{8\pi Gk_Bm}.
$$

SI単位は $[\hbar c^3/(Gm)]=\mathrm{J}$ で、$k_B$ で割るとkelvinです。$C=\hbar c^3/(8\pi Gk_B)>0$ と置けば $T_H=Cm^{-1}$ なので $dT_H/dm=-Cm^{-2}=-T_H/m$。$m\mapsto2m$ の式も直接従います。
<!-- proof-end -->

自然単位の固定したSchwarzschild背景で、形式的に $M$ を内部エネルギーの座標とみなすと $dM/dT_H=-8\pi M^2<0$ です。ただし「負の温度応答」と「正準アンサンブルの安定性」とは別です。有限空洞やAdSの境界条件を含む実際の安定性はBHT15・BHT16で判定します。

### 4.2 近似を外したらどこで止まるか

1. **地平線へ静止時計を押し付けない。** $T_H/N_R$ の $R\downarrow2M$ での発散は静止軌道の極限です。自由落下者へそのまま代入できません。
2. **崩壊後期と永遠のHH平衡を同一視しない。** Unruh型後期放射は入射が真空で正味流束を持ちます。HHは両向きの入射・出射が釣り合うKMS状態です。
3. **温度だけで蒸発速度を出さない。** 灰色体因子、状態、場の種数、逆作用を含めたエネルギー収支が要ります。
4. **極限解へ無条件に外挿しない。** 本講の規格化命題や第一法則の書き換えは $\kappa>0$ の非極限定常地平線で述べました。$\kappa\to0$ と、極限地平線に直接量子状態を構成する問題は同じではありません。
5. **熱と仕事を混ぜない。** $\Omega_HdJ$ や $\Phi_HdQ$ が変わるとき、$dM$ 全体を地平線との可逆な熱交換と呼べません。

## 5. 演習――時計・状態・第一法則を結び付ける

### Level A：一つの量・条件を正確に扱う

<a id="ex-bht8-a01"></a>

#### BHT8-A01 質量と温度

- Level: A
- 問題: 自然単位でSchwarzschild質量を $M>0$ とする。$\kappa,T_H,\beta_H$ を求め、質量を $3M$ にしたとき三量がそれぞれ何倍になるか答えよ。

<!-- solution-start -->
**詳細解答**：[地平線データ](../BHT1/index.md#prop-bht1-schwarzschild-data)から $\kappa=1/(4M)$、[Hawking温度](../../QCURV/QCURV11/index.md#thm-qcurv11-thermal-ratio)から

$$
T_H=\frac{\kappa}{2\pi}=\frac{1}{8\pi M},\qquad
\beta_H=\frac{1}{T_H}=8\pi M.
$$

$M\mapsto3M$ の代入により $\kappa$ と $T_H$ は各 $1/3$ 倍、$\beta_H$ は $3$ 倍です。逆温度まで $1/3$ 倍にしないことを確認します。
<!-- solution-end -->

<a id="ex-bht8-a02"></a>

#### BHT8-A02 熱因子と占有数の違い

- Level: A
- 問題: $\beta_H\omega=\ln3$ とする。正の周波数 $\omega$ について、Boltzmann因子 $e^{-\beta_H\omega}$、Planck占有数 $n_H$、$n_H/(1+n_H)$ を順に計算せよ。

<!-- solution-start -->
**詳細解答**：$e^{\beta_H\omega}=3$ なので

$$
e^{-\beta_H\omega}=\frac13,
\qquad n_H=\frac1{3-1}=\frac12.
$$

励起に対応する占有数と自発・誘導放出を含む $1+n_H$ の比は

$$
\frac{n_H}{1+n_H}=\frac{1/2}{1+1/2}=\frac13.
$$

$n_H$ 自身はBoltzmann因子 $1/3$ ではありません。この比の関係は[QCURV11の熱因子](../../QCURV/QCURV11/index.md#thm-qcurv11-thermal-ratio)と一致します。
<!-- solution-end -->

<a id="ex-bht8-a03"></a>

#### BHT8-A03 静止壁の温度

- Level: A
- 問題: $M>0$ のSchwarzschild外部、$R=8M$ の静止壁がある。$N_R$ と地平線に温度整合する $T_R/T_H$ を求め、$R>2M$ を確認せよ。

<!-- solution-start -->
**詳細解答**：$R=8M>2M$ であり、正の静止lapseは

$$
N_R=\sqrt{1-2M/(8M)}=\sqrt{3/4}=\frac{\sqrt3}{2}.
$$

[温度整合の定義](#def-bht8-bath-matching)の $N_RT_R=T_H$ へ代入して

$$
\frac{T_R}{T_H}=\frac1{N_R}=\frac{2}{\sqrt3}.
$$

壁の局所温度の方が無限遠規格化の $T_H$ より高い値です。
<!-- solution-end -->

<a id="ex-bht8-a04"></a>

#### BHT8-A04 同じ背景のKilling規格化

- Level: A
- 問題: 非極限の定常地平線で $\chi'=3\chi$ とした。$\kappa',\omega',\beta'$ をもとの量で表し、$\beta'\omega'$ がどうなるか計算せよ。$\omega>0$ とする。

<!-- solution-start -->
**詳細解答**：[規格化不変性命題](#prop-bht8-normalization)の定数 $a=3$ に対し

$$
\kappa'=3\kappa,\qquad \omega'=3\omega,\qquad
\beta'=\frac{2\pi}{3\kappa}=\frac\beta3.
$$

よって $\beta'\omega'=(\beta/3)(3\omega)=\beta\omega$。同じ解の時刻ラベルの変更であり、質量を三倍にした別解と混同しません。
<!-- solution-end -->

<a id="ex-bht8-a05"></a>

#### BHT8-A05 静止壁を地平線へ近づける極限

- Level: A
- 問題: $R=2M(1+\varepsilon)$、$\varepsilon>0$ と置く。$N_R$ と $T_R/T_H$ を $\varepsilon$ で表し、$\varepsilon\downarrow0$ での極限を求める。この発散から自由落下温度が発散すると結論してよいか。

<!-- solution-start -->
$R>2M$ であることを確認し、定義へ代入すると

$$
N_R=\sqrt{1-\frac1{1+\varepsilon}}
=\sqrt{\frac\varepsilon{1+\varepsilon}},
\qquad
\frac{T_R}{T_H}=\sqrt{\frac{1+\varepsilon}{\varepsilon}}.
$$

$\varepsilon\downarrow0$ では $N_R\to0$、$T_R/T_H\to+\infty$ です。しかし静止世界線の四元速度 $u=\xi/N_R$ は地平線で規格化不能です。自由落下世界線は別の四元速度を持つので、この静止極限だけからその検出器温度を結論できません。[QCURV14の自由落下時計](../../QCURV/QCURV14/index.md#prop-qcurv14-freefall-clock)を参照します。
<!-- solution-end -->

### Level B：既出結果をつなぐ

<a id="ex-bht8-b01"></a>

#### BHT8-B01 壁の固有エネルギーと検出率比

- Level: B
- 問題: HH状態のSchwarzschild外部で $R=4M$ とし、無限遠Killingエネルギー $\omega_\infty=T_H$ のモードを考える。壁でのエネルギー $E_R$、温度 $T_R$、$E_R/T_R$ を求め、壁に静止した検出器の局所ギャップを $E_R$ とした場合の励起・脱励起率比を求めよ。検出率は正で有限と仮定する。

<!-- solution-start -->
**詳細解答**：$N_R=1/\sqrt2$ です。[Killing周波数の赤方偏移](../../QCURV/QCURV9/index.md#prop-qcurv9-redshift)を壁の時計へ適用します。また[静止熱浴と地平線のTolman整合](#prop-bht8-tolman-bath)を $R=4M$ に適用すると

$$
E_R=\frac{\omega_\infty}{N_R}=\sqrt2\,T_H,
\qquad T_R=\frac{T_H}{N_R}=\sqrt2\,T_H.
$$

したがって $E_R/T_R=1$。HHのKMS性と定常率の存在・正値という仮定の下、[QCURV14のKMS検出率比](../../QCURV/QCURV14/index.md#thm-qcurv14-tolman)が与える比は

$$
\frac{\dot{\mathcal F}_R(E_R)}{\dot{\mathcal F}_R(-E_R)}
=e^{-E_R/T_R}=e^{-1}.
$$

局所ギャップを $T_H$ のままにした場合は比が $e^{-1/\sqrt2}$ となり、設問の「$E_R$ とした」という条件が重要です。
<!-- solution-end -->

<a id="ex-bht8-b02"></a>

#### BHT8-B02 熱的な出射があっても平衡とは限らない

- Level: B
- 問題: 単一モードで $n_H=2$、灰色体透過率 $\Gamma=1/4$ とする。UnruhとHHの遠方の入射・出射占有数および正味値を、それぞれ計算せよ。どちらがHawking温度のKMS平衡か、なぜ同じ $n_H$ だけで判断できないか述べよ。

<!-- solution-start -->
**詳細解答**：[QCURV13の散乱込み流束定理](../../QCURV/QCURV13/index.md#thm-qcurv13-state-flux)でUnruhは $n_{\rm in}=0$、出射は地平線側から透過した $\Gamma n_H$ です。従って

$$
(n_{\rm in},n_{\rm out},n_{\rm net})_{U}
=\left(0,\frac14\cdot2,\frac12\right).
$$

HHでは入射と地平線側の両方が熱的で、出射は透過成分と反射成分の和です。

$$
n_{\rm out}=\Gamma n_H+(1-\Gamma)n_H
=\frac12+\frac32=2,
\qquad n_{\rm net}=2-2=0.
$$

ゆえにHHは $(2,2,0)$ です。全外部のKMS平衡は[HHの状態定義](../../QCURV/QCURV13/index.md#def-qcurv13-three-states)の境界条件に依存し、Unruhの「出射側の $n_H$」だけでは入射の有無を決められません。
<!-- solution-end -->

<a id="ex-bht8-b03"></a>

#### BHT8-B03 面積項の係数と仕事

- Level: B
- 問題: 非極限Kerr–Newman定常解の微小変化で $dJ=0$、$dQ\ne0$ とする。$dM$、$\Phi_HdQ$、$T_Hd(A/4)$ の関係を示し、$dM=T_Hd(A/4)$ が一般に従わない理由を述べよ。次にSchwarzschildの $A=16\pi M^2$ で $T_Hd(A/4)=dM$ を直接検算せよ。

<!-- solution-start -->
**詳細解答**：[第一法則の面積係数表示](#prop-bht8-first-law-area)へ $dJ=0$ を代入すると

$$
dM-\Phi_HdQ=T_Hd(A/4),
\quad\text{すなわち}\quad
dM=T_Hd(A/4)+\Phi_HdQ.
$$

$dQ\ne0$ のとき $\Phi_HdQ$ は一般に零とは限らず、差し引かなければ面積項だけにはなりません。Schwarzschildでは $dQ=dJ=0$ かつ $d(A/4)=d(4\pi M^2)=8\pi M\,dM$。よって

$$
T_Hd(A/4)=\frac1{8\pi M}(8\pi M\,dM)=dM.
$$

この検算は定常解族の微分に限られ、任意の有限過程の熱収支とは違います。
<!-- solution-end -->

<a id="ex-bht8-b04"></a>

#### BHT8-B04 同じ局所温度を全半径に置く失敗

- Level: B
- 問題: HH状態のSchwarzschild外部で $R_1=4M$、$R_2=8M$ に静止熱浴を置く。両浴が地平線と温度整合する局所温度を計算し、$T_{R_1}=T_{R_2}$ と置くのが誤りである理由を、正のエネルギー $\omega_\infty$ のBoltzmann指数から説明せよ。

<!-- solution-start -->
**詳細解答**：それぞれ

$$
N_1=\frac1{\sqrt2},\qquad N_2=\frac{\sqrt3}{2},
\qquad
T_{R_1}=\sqrt2 T_H,\quad T_{R_2}=\frac2{\sqrt3}T_H.
$$

両者は異なる局所温度ですが、各壁の局所エネルギー $E_i=\omega_\infty/N_i$ も異なります。したがって

$$
\frac{E_1}{T_{R_1}}
=\frac{\omega_\infty/N_1}{T_H/N_1}
=\frac{\omega_\infty}{T_H}
=\frac{\omega_\infty/N_2}{T_H/N_2}
=\frac{E_2}{T_{R_2}}.
$$

熱の指数は同じです。局所温度だけを等しくすると $N_1T_{R_1}=N_2T_{R_2}$ という[Tolman整合](#prop-bht8-tolman-bath)が壊れます。失った仮定は**共通のKilling時間での平衡**です。
<!-- solution-end -->

### Level C：複数の判定を統合する

<a id="ex-bht8-c01"></a>

#### BHT8-C01 放射・熱浴・第一法則の一体検算

- Level: C
- 問題: $M>0$ のSchwarzschild解を自然単位で考える。半径 $R=4M$ に静止壁を置き、ある正のKilling周波数 $\omega_\infty=1/(8\pi M)$ を選ぶ。次を示せ。
  1. $T_H,\beta_H,N_R,T_R$ を求め、温度整合を確かめる。
  2. 同じモードの壁での局所エネルギー $E_R$、熱指数 $E_R/T_R$ を求める。
  3. $\chi'=2\chi$ に同じ背景で再規格化したとき、熱因子が変わらないことを数値で検算する。
  4. HH状態とUnruh状態のどちらが外部全体の平衡に相当するかを述べる。Unruhに正味放射があっても、直ちに温度だけで質量変化を計算できない理由を述べる。
  5. $dJ=dQ=0$ の定常解族で、温度から面積微分の係数を検算する。有限差へ取り違えないことを説明する。

<!-- solution-start -->
**詳細解答**：まず[Schwarzschildデータ](../BHT1/index.md#prop-bht1-schwarzschild-data)と[Hawking熱因子](../../QCURV/QCURV11/index.md#thm-qcurv11-thermal-ratio)を使います。

$$
T_H=\frac1{8\pi M},\qquad \beta_H=8\pi M,
\qquad N_R=\sqrt{1-\frac{2M}{4M}}=\frac1{\sqrt2}.
$$

[温度整合条件](#def-bht8-bath-matching)から $T_R=T_H/N_R=\sqrt2/(8\pi M)>0$ で、$N_RT_R=T_H$ が成立します。

次に[赤方偏移](../../QCURV/QCURV9/index.md#prop-qcurv9-redshift)を同じ $\omega_\infty=T_H$ に使うと

$$
E_R=\frac{\omega_\infty}{N_R}
=\frac{\sqrt2}{8\pi M},\qquad
\frac{E_R}{T_R}=1.
$$

従って局所熱因子は $e^{-1}$ です。

規格化 $\chi'=2\chi$ のもとで $\kappa'=2\kappa$、$\beta'_H=\beta_H/2=4\pi M$、$\omega'=2\omega_\infty=1/(4\pi M)$ です。[規格化不変性](#prop-bht8-normalization)に数値代入すると

$$
\beta'_H\omega'=(4\pi M)\frac1{4\pi M}=1
=\beta_H\omega_\infty.
$$

HHは[QCURV13の三状態](../../QCURV/QCURV13/index.md#def-qcurv13-three-states)のうち両方向が熱的なKMS平衡で、入出射が釣り合い正味流束は零です。Unruhは後期に熱的な出射があっても入射が真空なので平衡ではありません。灰色体因子が透過率を変え、逆作用を含む質量変化には光度とエネルギー収支が必要です。温度だけから光度や $dM/dt$ を一意には求められません。

最後に $A=16\pi M^2$ だから $d(A/4)=8\pi M\,dM$、したがって

$$
T_Hd(A/4)=\frac{1}{8\pi M}(8\pi M\,dM)=dM.
$$

これは隣接する定常解を結ぶ微分恒等式で、有限差へ初期温度をそのまま掛ける近似ではありません。特に $M\to2M$ では面積が4倍になるため、$T_H(M)\Delta(A/4)=3M/2$ となり、真の $\Delta M=M$ と違います。
<!-- solution-end -->

## 次の講義へ

温度の出所と時計、状態選択、平衡条件を確定し、古典的第一法則の面積項を $T_Hd(A/4)$ と表せました。次は **BHT9：Bekenstein–Hawkingエントロピー**で、この面積微分をどの状態空間・積分定数・物理単位の下で熱力学的エントロピーへ昇格させるかを検証します。
