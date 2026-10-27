# GR46 GR II 総合演習と後続科目への接続

<!-- definition-example-audit: strict -->

一般相対論 II では、Schwarzschildの延長から始め、帯電した解、回転する解、光線の集束、初期値問題、膨張する宇宙まで進みました。しかし、計量に現れる「分母が零になる半径」をすべて事象の地平線と呼んだり、局所的な集束をそのまま曲率発散と読んだりすると、これらの結果は矛盾したように見えます。

この総合演習では、**解が満たす方程式 → 座標域 → 不変な測定量 → 大域的な仮定**の順番を固定します。最後に、古典的なKilling地平線で求めた量のうち、ブラックホール熱力学・曲がった時空の量子場へ引き渡せるものを確定します。各節の式は既習結果を再計算する入口であり、新たなブラックホールの一意性定理や量子放射の公式を仮定するものではありません。

符号は $(-,+,+,+)$、4次元、特記しなければ $G=c=1$ とし、時間・動径座標 $t,r$ および質量・電荷パラメータ $M,Q$ は長さの単位で表します。Kerrの回転パラメータ $a=J/M$ も長さ、FLRWの宇宙時間は $\tau$ と書きます。$\Lambda$ は宇宙項、$d\Omega^2=d\vartheta^2+\sin^2\vartheta\,d\varphi^2$ です。曲率符号は[GR6の成分規約](../GR6/index.md#prop-gr6-coordinate-curvature)で統一します。

## 1. 四つの時空で「同じように見える式」の役割を分ける

最初に、計量係数から読める局所的な事実と、因果構造を知って初めて言える大域的な事実を分離します。

| 時空 | 解く方程式・源 | 対称性とよく使う座標 | 地平線を調べる際の入口 |
|---|---|---|---|
| Schwarzschild | $\Lambda=0$, $T_{\mu\nu}=0$ の外部真空 | 球対称・静的。面積半径 $r$ | $f_S=1-2M/r$ の零点、正則座標、遠方への因果到達 |
| Reissner–Nordström (RN) | Einstein–Maxwellの**無電流**外部。$Q\ne0$ なら $T^{\rm EM}\ne0$ | 球対称・静的な外部座標 | $f_R=1-2M/r+Q^2/r^2$ の根と延長の領域 |
| Kerr | $\Lambda=0$, $T_{\mu\nu}=0$ の定常・軸対称真空 | Boyer–Lindquist座標。$dt\,d\varphi$ 項あり | $\Delta=r^2-2Mr+a^2$ の根と $g_{tt}=0$ を**別に**調べる |
| FLRW | 完全流体と任意の $\Lambda$。密度・圧力は宇宙時間の関数 | 空間一様・等方的な共動座標 | 光が進める共動距離の積分と未来の存在範囲 |

Schwarzschild計量は[GR16の真空解](../GR16/index.md#thm-gr16-schwarzschild)、RN計量は[GR31のEinstein–Maxwell解](../GR31/index.md#thm-gr31-rn-solution)、Kerr計量は[GR32の定義](../GR32/index.md#def-gr32-kerr-metric)、FLRW計量は[GR41の定義](../GR41/index.md#def-gr41-flrw)をそれぞれ出発点にします。RNで「電流が零」は「電磁場の応力が零」を意味しません。[GR31の応力成分](../GR31/index.md#prop-gr31-maxwell-stress)において、$Q\ne0$ なら $T^t{}_t=-Q^2/(8\pi r^4)$ です。

**曲率の直接比較。** Schwarzschildで[GR25のKretschmann不変量](../GR25/index.md#thm-gr25-kretschmann-schwarzschild)は

$$
K=R_{\alpha\beta\gamma\delta}R^{\alpha\beta\gamma\delta}
=\frac{48M^2}{r^6}.
$$

$r=2M$ では $K=3/(4M^4)$ と有限で、$r\to0^+$ では発散します。前者は元のSchwarzschild座標の破綻ですが、[GR26の入射EF座標](../GR26/index.md#prop-gr26-ef-metric-domain)で越えられます。一方、$M>0$ に対して $r=0$ はこの不変量の発散を伴います。$K=0$ でなければ真空でない、という推論も誤りです。真空条件はRicciを縮約したEinstein方程式であり、真空のSchwarzschild・KerrでもWeyl側の曲率は残ります。

### 1.1 RN：零点を求めてから因果的意味を問う

$M>0$ とし、$f_R=(r^2-2Mr+Q^2)/r^2$ の分子を平方完成します。

$$
r^2-2Mr+Q^2=(r-M)^2-(M^2-Q^2).
$$

$|Q|<M$ なら、異なる正の根を持ちます。

$$
r_\pm=M\pm\sqrt{M^2-Q^2}.
$$

この表示から三つの区間で $f_R$ の符号が順に正・負・正と分かります。

- $r>r_+$ では正。
- $r_-<r<r_+$ では負。
- $0<r<r_-$ では正。

ただし、対角計量の $g_{rr}=f_R^{-1}$ が発散すること**だけ**では地平線と判定できません。[GR31の地平線命題](../GR31/index.md#prop-gr31-horizons)と正則な延長を合わせて使います。

$|Q|=M$ は重根で、$|Q|>M$ なら実根がありません。後者を「裸の特異点を持つ定常解の候補」と呼べても、一般的な重力崩壊からこの状態が生じるとは結論できません。

例えば $M=5,Q=3$ では $r_+=9,r_-=1$ です。$r=3$ で

$$
f_R(3)=1-\frac{10}{3}+\frac9{9}=-\frac43<0
$$

となり、静的外部で時間的だった $\partial_t$ はこの間の領域で時間的ではありません。$f_R<0$ の場所へそのまま「静止観測者の固有時計」を持ち込まないことが必要です。

### 1.2 Kerr：静止極限面と地平線は一致しない

[GR32のKerr計量](../GR32/index.md#def-gr32-kerr-metric)で

$$
\Delta=r^2-2Mr+a^2,\qquad
\Sigma=r^2+a^2\cos^2\vartheta
$$

です。$|a|<M$ の外側の地平線は[GR32の判定](../GR32/index.md#prop-gr32-horizon)により $r_+=M+\sqrt{M^2-a^2}$。これと別に $g_{tt}=-(1-2Mr/\Sigma)=0$ は

$$
r_{\rm stat}(\vartheta)=M+\sqrt{M^2-a^2\cos^2\vartheta}
$$

を与えます（外側の根）。極では $r_{\rm stat}=r_+$、赤道では $r_{\rm stat}=2M$。$0<|a|<M$ なら赤道に $r_+<r<2M$ という幅があり、ここでは無限遠に規格化された $\partial_t$ が空間的でも、[回転するKilling生成場](../GR45/index.md#thm-gr45-kerr)は地平線上で零になります。これは[GR33のergoregion](../GR33/index.md#def-gr33-ergoregion)の入口です。

具体例 $M=5,a=3$ では $r_+=9$、赤道の静止極限は $10$ です。外部から $r\downarrow9$ と近づくと赤道で $g_{tt}\to-(1-10/9)=1/9>0$ となるので、**$\partial_t$ のノルムが零か**を地平線の判定に使うと誤答します。Boyer–Lindquist表示は $\Delta=0$ で特異なので、この値は外部極限として読み、地平線そのものでは正則な回転座標へ延長して解釈します。回転に伴う角速度を含めて生成場を選び直さなければなりません。

## 2. 地平線という語に必要な情報を棚卸しする

[GR29の事象の地平線](../GR29/index.md#def-gr29-event-horizon)は無限遠との因果関係を用いる大域的定義です。[GR29の捕獲面・見かけの地平線](../GR29/index.md#def-gr29-trapped-apparent)には光線束の膨張と空間の切り方が関係し、[Killing地平線](../GR29/index.md#def-gr29-killing-horizon)にはその面を生成するKilling場が必要です。永遠の定常Schwarzschildでは一致する場所があっても、三つの**定義**が同じになるわけではありません。

さらに、崩壊中の[GR30のVaidya模型](../GR30/index.md#prop-gr30-trapped-vs-event)では、局所的に認識できる捕獲の境界と、遠方に届く光の運命で決まる事象の地平線がずれ得ます。「この瞬間の質量を静的解の $M$ に代入する」操作だけでは、未来全体での光線の運命は決まりません。Penrose図に現れる境界の種類も[GR28の分類](../GR28/index.md#prop-gr28-boundary-classification)に照らします。

### 2.1 表面重力は、どの生成場で測ったか

[GR45の表面重力の定義](../GR45/index.md#def-gr45-surface-gravity)は、Killing地平線の生成場 $\chi$ を選んで

$$
\chi^\nu\nabla_\nu\chi^\mu=\kappa_\chi\chi^\mu
$$

としたときの比例係数です。$\chi\mapsto A\chi$ と定数倍すれば[GR45のKilling場の規格化と表面重力](../GR45/index.md#prop-gr45-scaling)により $\kappa\mapsto A\kappa$ です。漸近平坦なSchwarzschild・RN・Kerrでは無限遠の時間基準を使えますが、de Sitter静的パッチでは無限遠に同じ基準がなく、中心観測者などの選択が要ります。

静的球対称の正則な座標

$$
ds^2=-f(r)dv^2+2\,dv\,dr+r^2d\Omega^2
$$

に対して、$\chi=\partial_v$ を選ぶと[GR45の静的地平線定理](../GR45/index.md#thm-gr45-static)から $\kappa_\chi=f'(r_h)/2$ です。例えばRNの $f_R=(r-r_+)(r-r_-)/r^2$ を $r=r_+$ で微分すると

$$
f_R'(r_+)=\frac{r_+-r_-}{r_+^2},\qquad
\kappa_+=\frac{r_+-r_-}{2r_+^2}.
$$

極限 $|Q|\to M$ で $r_+\to r_-\to M$ となり $\kappa_+\to0$ です。表面重力が零であることと時空が曲率零であることは違います。また**$\kappa$ を計算しただけでは温度やエントロピーは導けません**。

### 2.2 宇宙論的な地平線は光の積分から調べる

[GR41のFLRW計量](../GR41/index.md#def-gr41-flrw)で、放射方向の共動距離を $\chi$ とする（ここだけ $\chi$ は座標でありKilling場ではない）と、零条件は $|d\chi|=d\tau/a(\tau)$ です。[GR44の粒子・事象の地平線](../GR44/index.md#prop-gr44-integral-criterion)によれば、粒子地平線は過去端から現在まで、宇宙論的事象の地平線は現在から未来端までの積分が有限かで判定します。

$$
D_{\rm p}(\tau_0)=a(\tau_0)\int_{\tau_i}^{\tau_0}\frac{d\tau}{a(\tau)},\qquad
D_{\rm e}(\tau_0)=a(\tau_0)\int_{\tau_0}^{\tau_f}\frac{d\tau}{a(\tau)}.
$$

例えば $a(\tau)=\tau^{2/3}$、$\tau\in(0,\infty)$ として $\tau_0=1$ で計算します。過去積分は

$$
\int_0^1\tau^{-2/3}d\tau=3<\infty
$$

ですが、未来積分は $\int_1^\infty\tau^{-2/3}d\tau=\infty$ です。従って粒子地平線はあり、宇宙論的事象の地平線はありません。Hubble半径は $H^{-1}=3\tau/2$ と有限ですが、これを事象の地平線と同一視できません。

これに対してde Sitter平坦パッチ $a=e^{H\tau}$ で $H>0$ が一定なら、未来の共動距離積分は $e^{-H\tau_0}/H$ で、固有距離は $D_{\rm e}=H^{-1}$ です。[GR44の静的パッチ](../GR44/index.md#thm-gr44-static-patch)では中心で規格化したKilling場の地平線とこの距離が対応します。その因果的意味は、宇宙論のパッチと未来境界を指定して読みます。

## 3. 局所的な集束・初期値制約と大域的な結論を分ける

曲率とエネルギー条件から、直ちに「必ず裸の特異点ができる」とは言えません。光線束の膨張 $\theta$ を表す[GR34の零Raychaudhuri方程式](../GR34/index.md#thm-gr34-null-raychaudhuri)を、ねじれがなくアフィンパラメータ $\lambda$ を使う光線束に適用すると

$$
\frac{d\theta}{d\lambda}
=-\frac12\theta^2-\sigma_{\mu\nu}\sigma^{\mu\nu}
-R_{\mu\nu}k^\mu k^\nu
$$

です。$\sigma$ は横断方向のせん断、$k$ は零接ベクトルです。[GR35の零エネルギー条件](../GR35/index.md#def-gr35-nec)に加えてEinstein方程式を仮定すれば、$R_{\mu\nu}k^\mu k^\nu=8\pi T_{\mu\nu}k^\mu k^\nu\ge0$ （$g(k,k)=0$ により $\Lambda$ 項は消える）で、$\theta<0$ は有限アフィン長のうちに強く減少します。ここで得るのは**光線束の集束評価**であって、曲率不変量の発散ではありません。[GR37のPenrose型定理](../GR37/index.md#thm-gr37-penrose)の測地不完備性という結論には、捕獲面と非コンパクトCauchy面など追加の大域仮定が必要です。そして測地不完備性と曲率発散も定義上は同義ではありません。[GR38の宇宙検閲仮説](../GR38/index.md#def-gr38-weak-censorship)はさらに別の問題です。

他方、ある時刻の空間的超曲面の幾何を指定するときは、その上の計量 $h_{ij}$、第二基本形式 $K_{ij}$ と物質データを勝手に独立に選べません。[GR39の初期データの定義](../GR39/index.md#def-gr39-initial-data)と[GR40のEinstein制約](../GR40/index.md#thm-gr40-einstein-constraints)から、$K_{ij}=g(\nabla_{e_i}n,e_j)$ とする符号で、法線観測者が測る密度 $\rho=T(n,n)$ に対して

$$
\mathcal R^{(3)}+K^2-K_{ij}K^{ij}=16\pi\rho+2\Lambda.
$$

例えば $\Lambda=0$、平坦な空間計量 $h_{ij}=\delta_{ij}$、$K_{ij}=0$ なら左辺は零です。これを満たすには $\rho=0$ が必要であり、同じデータのまま $\rho>0$ を任意に選ぶことはできません。逆にFLRWの共動切片で $K_{ij}=Hh_{ij}$ とすると $K=3H$、$K_{ij}K^{ij}=3H^2$、$\mathcal R^{(3)}=6k/a^2$ なので

$$
6\left(H^2+\frac{k}{a^2}\right)
=16\pi\rho+2\Lambda
$$

となり、[GR42の第一Friedmann方程式](../GR42/index.md#thm-gr42-friedmann)と一致します。**初期値の制約**と**時間発展**の方程式を区別しつつ、一方をもう一方の検算に使うわけです。

## 4. 何を後続科目へ渡し、何はまだ主張しないか

| 古典論で確認したこと | 後続で新たに必要なこと |
|---|---|
| [Killing表面重力と規格化](../GR45/index.md#def-gr45-surface-gravity)、[地平線の面積非減少に必要な仮定](../GR36/index.md#thm-gr36-smooth-area) | [BHT・ブラックホール熱力学](../../../../../plans/DREAM_THEATER_BLACK_HOLE_THERMODYNAMICS_I_PLAN.md)で温度・エントロピー・第一法則の物理的同定と熱力学的前提を別途議論する |
| [Kruskalの延長](../GR27/index.md#prop-gr27-regular-metric)、[Penrose図](../GR28/index.md#prop-gr28-boundary-classification)、[古典的な崩壊時空](../GR30/index.md#prop-gr30-collapse-event-horizon) | [QCURV・曲がった時空の量子場](../../../../../plans/DREAM_THEATER_QFT_CURVED_SPACETIME_I_PLAN.md)で場の状態・正負周波数の選択・量子場のモード・粒子概念を導入する |
| [Kerrの保存量](../GR32/index.md#prop-gr32-killing-integrals)と[超放射の古典的な散乱関係](../GR33/index.md#thm-gr33-wronskian) | 古典波動の増幅を直ちに量子粒子数や蒸発速度へ置き換えない |

例えば $\kappa$ に適切な単位を復元すれば加速度の次元になりますが、$T\propto\hbar\kappa$ という量子温度の関係を導くには $\hbar$ と量子状態の議論が必要です。同じく面積 $A$ が古典的条件下で減らないことから、量子統計的なエントロピーが $A$ に比例すると結論することはできません。**古典的な入力は整え、量子論の結論は先取りしない**。これが二つの後続科目へ進むときの基本姿勢です。

以下の演習では、答えだけでなく条件・座標域・根拠の既出結果を一緒に書いてください。

## 5. 総合演習

### Level A：各模型の最低限の判定を独立に行う

<a id="ex-gr46-a01"></a>
#### GR46-A01 Schwarzschildの二つの半径
- Level: A

$M>0$ のSchwarzschild外部解の $K=48M^2/r^6$ について、$r=2M$ での値と $r\to0^+$ での極限を求めよ。どちらについて正則な座標延長が可能か、曲率不変量だけで言える範囲を説明せよ。

<!-- solution-start -->
**詳細解答。** [GR25の曲率公式](../GR25/index.md#thm-gr25-kretschmann-schwarzschild)で半径を代入します。

$$
K(2M)=\frac{48M^2}{(2M)^6}
=\frac{48}{64M^4}=\frac3{4M^4}<\infty.
$$

一方 $M>0$ 固定なら $48M^2/r^6\to+\infty$ です。$K$ はスカラー不変量なので $r=0$ の発散を滑らかな座標変換だけで消せません。$r=2M$ で $K$ が有限であること**単独**では延長の存在を証明しませんが、[入射EF計量の正則性](../GR26/index.md#prop-gr26-ef-metric-domain)が独立にそれを与えます。発散のない座標と不変な曲率の二つの情報を合わせて判断します。
<!-- solution-end -->

<a id="ex-gr46-a02"></a>
#### GR46-A02 RNの源と三つの座標域
- Level: A

$G=c=1$、$M=5,Q=3$ のRN解について、$f_R(r)$ を因数分解し、$r>0$ を $f_R$ の符号で区切れ。また $Q\ne0$ の外部がEinstein真空かどうか、電場応力の一成分を挙げて答えよ。

<!-- solution-start -->
**詳細解答。** $r^2-10r+9=(r-9)(r-1)$ だから

$$
f_R(r)=\frac{(r-9)(r-1)}{r^2}.
$$

$r>0$ では分母が正です。従って $r>9$ と $0<r<1$ では $f_R>0$、$1<r<9$ では $f_R<0$、$r=1,9$ が零です。$r=0$ はこの座標式の定義域に含めません。[GR31の応力式](../GR31/index.md#prop-gr31-maxwell-stress)で

$$
T^t{}_t=-\frac{Q^2}{8\pi r^4}=-\frac9{8\pi r^4}\ne0
$$

なので、外部に**電流がなくても** $T_{\mu\nu}=0$ というEinstein真空ではありません。$f_R=0$ の二点がどの地平線かという因果判定には[正則な延長と地平線の検算](../GR31/index.md#prop-gr31-horizons)がさらに必要です。
<!-- solution-end -->

<a id="ex-gr46-a03"></a>
#### GR46-A03 Kerrの二つの境界
- Level: A

$M=5,a=3$ のKerr解で、外側の $\Delta=0$ の根、赤道の $g_{tt}=0$ の外側の根、および外側地平線へ外部から近づくときの赤道の $g_{tt}$ の符号を求めよ。無限遠の時間並進を生成する $\partial_t$ は地平線上で零ベクトルか。

<!-- solution-start -->
**詳細解答。** $\Delta=r^2-10r+9$ の根は $1,9$ なので $r_+=9$ です。[静止極限面の公式](../GR32/index.md#prop-gr32-static-order)で $\vartheta=\pi/2$ とすると $r_{\rm stat}=M+\sqrt{M^2}=10$。赤道では $\Sigma=r^2$ だから

$$
g_{tt}(r_+,\pi/2)=-\left(1-\frac{2M}{r_+}\right)
=-\left(1-\frac{10}{9}\right)=\frac19>0.
$$

したがって $\partial_t$ は地平線への外部極限で**空間的**です。$g_{tt}>0$ と $\partial_t=0$ は別の条件であり、正則座標に延長しても $\partial_t$ が零ベクトルになるわけではありません。地平線の零生成場は回転成分を持つ $\partial_t+\Omega_H\partial_\varphi$ です。
<!-- solution-end -->

<a id="ex-gr46-a04"></a>
#### GR46-A04 べき膨張の地平線積分
- Level: A

平坦FLRWの膨張模型で $a(\tau)=\tau^{2/3}$、$\tau\in(0,\infty)$ とし、$\tau_0=1$ の粒子地平線・宇宙論的事象の地平線の存否を光の共動距離積分から求めよ。$H^{-1}$ の有限性だけでは事象の地平線と判定できない理由も説明せよ。

<!-- solution-start -->
**詳細解答。** [GR44の積分判定](../GR44/index.md#prop-gr44-integral-criterion)の時間下端は $0$、上端は $\infty$ です。過去側は

$$
\int_0^1\frac{d\tau}{\tau^{2/3}}
=\left[3\tau^{1/3}\right]_{0}^{1}=3<\infty
$$

なので粒子地平線が存在します。未来側は上端 $R$ で切ると

$$
\int_1^R\tau^{-2/3}d\tau=3(R^{1/3}-1)
\xrightarrow{R\to\infty}\infty
$$

です。従って宇宙論的事象の地平線はありません。一方 $H=\dot a/a=2/(3\tau)$ だから $H(1)^{-1}=3/2$ は有限です。これはその瞬間の局所的な膨張率から作る長さで、未来までの積分収束条件ではありません。
<!-- solution-end -->

<a id="ex-gr46-a05"></a>
#### GR46-A05 初期データは好きに選べない
- Level: A

$\Lambda=0$ の初期切片上で $h_{ij}=\delta_{ij}$、$K_{ij}=0$ とする。Hamiltonian制約から法線観測者の密度 $\rho$ を求めよ。次にMilne表示の $a(\tau)=\tau,k=-1$ で $K_{ij}=Hh_{ij}$ とした場合、同じ制約の左辺を求め、時空が平坦でも空間切片の曲率が負となり得ることを確かめよ。

<!-- solution-start -->
**詳細解答。** 前半では $\mathcal R^{(3)}=0$、$K=0$、$K_{ij}K^{ij}=0$ です。[GR40のHamiltonian制約](../GR40/index.md#thm-gr40-einstein-constraints)に代入すると $0=16\pi\rho$、従って $\rho=0$ です。

Milneでは $a=\tau>0$、$H=1/\tau$ です。$\mathcal R^{(3)}=6k/a^2=-6/\tau^2$、$K=3H=3/\tau$、$K_{ij}K^{ij}=3H^2=3/\tau^2$ なので

$$
\mathcal R^{(3)}+K^2-K_{ij}K^{ij}
=-\frac6{\tau^2}+\frac9{\tau^2}-\frac3{\tau^2}=0.
$$

真空制約が成立します。[GR41のMilne表示](../GR41/index.md#ex-gr41-c01)はMinkowski時空を別の切片で表したものです。3次元の負曲率と4次元の曲率零は矛盾しません。
<!-- solution-end -->

### Level B：二つ以上の構造を結び付ける

<a id="ex-gr46-b01"></a>
#### GR46-B01 RNの表面重力と極限
- Level: B

$M=5,Q=3$、無限遠で $\partial_t$ を規格化した非極限RN外部について、$r_+,r_-$ を求め、入射EF座標の $\chi=\partial_v$ に関する表面重力 $\kappa_+$ を導出せよ。同じ質量のSchwarzschildの値と比較し、$Q\to M$ での極限を示せ。

<!-- solution-start -->
**詳細解答。** A02と独立に平方完成すると $r_\pm=5\pm\sqrt{25-9}=5\pm4$、よって $r_+=9,r_-=1$ です。正則なEF座標では $\chi=\partial_v$ は地平線で非零の零法線であり、[GR45の静的球対称地平線の表面重力定理](../GR45/index.md#thm-gr45-static)を適用できます。因数分解から

$$
f_R(r)=\frac{(r-r_+)(r-r_-)}{r^2},
$$

$$
f_R'(r)=\frac{(2r-r_+-r_-)r^2
-2r(r-r_+)(r-r_-)}{r^4}.
$$

ここで $r=r_+$ とすると第二項は零、第一項の分子は $(r_+-r_-)r_+^2$ なので

$$
\kappa_+=\frac12f_R'(r_+)
=\frac{9-1}{2\cdot9^2}=\frac4{81}.
$$

Schwarzschildの $f_S=1-2M/r$ では $f_S'(2M)=2M/(2M)^2=1/(2M)$、従って $\kappa_S=1/(4M)=1/20$ です。$4/81<1/20$ を比較すると $80<81$ で確認できます。一般のRNでは

$$
\kappa_+=\frac{\sqrt{M^2-Q^2}}{(M+\sqrt{M^2-Q^2})^2}
\xrightarrow{|Q|\to M^-}0.
$$

この極限で古典的な $\kappa$ が零になることは、曲率が零になることや、量子放射の温度をこの章だけで導いたことを意味しません。
<!-- solution-end -->

<a id="ex-gr46-b02"></a>
#### GR46-B02 Kerrの回転生成場を数値で検算
- Level: B

$M=5,a=3$ のKerr時空について、$r_+$ と $\Omega_H=a/(r_+^2+a^2)$ を計算せよ。Boyer–Lindquist座標の外部から赤道 $r\downarrow r_+$ に近づけた $g_{tt},g_{t\varphi},g_{\varphi\varphi}$ の極限を求め、$\chi=\partial_t+\Omega_H\partial_\varphi$ のノルムが零になることを確認せよ。$g_{tt}>0$ との両立を説明せよ。

<!-- solution-start -->
**詳細解答。** $\Delta=r^2-10r+9$ なので $r_+=9$、$r_+^2+a^2=81+9=90$ より $\Omega_H=3/90=1/30$ です。[GR32の計量](../GR32/index.md#def-gr32-kerr-metric)で赤道 $\sin^2\vartheta=1$ とし、$r>9$ から $r\downarrow9$ の極限を取ると $\Sigma\to81$、$\Delta\to0$ なので

$$
g_{tt}=-\left(1-\frac{2Mr}{\Sigma}\right)=\frac19,
$$

$$
g_{t\varphi}=-\frac{2Mar}{\Sigma}
=-\frac{2\cdot5\cdot3\cdot9}{81}=-\frac{10}{3},
$$

$$
g_{\varphi\varphi}
=\frac{(r^2+a^2)^2-a^2\Delta}{\Sigma}
=\frac{90^2}{81}=100.
$$

従って $\chi^2=g_{tt}+2\Omega_Hg_{t\varphi}+\Omega_H^2g_{\varphi\varphi}$ を代入すると

$$
\chi^2=\frac19+2\cdot\frac1{30}\left(-\frac{10}{3}\right)
+\frac1{900}\cdot100=\frac19-\frac29+\frac19=0.
$$

これは地平線を生成する場の零**ノルム**の極限を検算したのであって、$\chi$ が零ベクトルになるという意味ではありません。$\partial_t$ は同じ極限で $g_{tt}=1/9>0$ と空間的でも、回転成分を組み合わせると零方向を作れます。Boyer–Lindquist座標自体は $\Delta=0$ で使えないため、[GR32の地平線の正則な扱い](../GR32/index.md#prop-gr32-horizon)に従って延長上で解釈します。[GR45のKerr表面重力計算](../GR45/index.md#thm-gr45-kerr)ではさらにその生成場の微分を調べます。
<!-- solution-end -->

<a id="ex-gr46-b03"></a>
#### GR46-B03 集束から何が結論できるか
- Level: B

ねじれが零の滑らかな零測地線束をアフィンパラメータ $\lambda\ge0$ で追い、初期膨張 $\theta(0)=-2/L$、$L>0$ とする。零エネルギー条件およびEinstein方程式を仮定し、断面のせん断二乗が非負であるとき、焦点形成までのアフィン長の上界を導け。これだけから曲率不変量の発散や宇宙検閲を証明したことになるか。

<!-- solution-start -->
**詳細解答。** $k$ は零ベクトルなので、宇宙項 $\Lambda g_{\mu\nu}k^\mu k^\nu$ は零です。[GR35の零エネルギー条件](../GR35/index.md#def-gr35-nec)から $R_{\mu\nu}k^\mu k^\nu\ge0$。ねじれが零なら[零Raychaudhuri方程式](../GR34/index.md#thm-gr34-null-raychaudhuri)は

$$
\theta'=-\frac12\theta^2-\sigma_{\mu\nu}\sigma^{\mu\nu}
-R_{\mu\nu}k^\mu k^\nu\le-\frac12\theta^2.
$$

初期値が負で、滑らかに定義される間は右辺が負なので $\theta<0$ を保ちます。$\theta\ne0$ の区間で $y=1/\theta$ とすると、微分の負号を含めて

$$
y'=-\frac{\theta'}{\theta^2}\ge\frac12,
\qquad y(0)=-\frac L2.
$$

従って $y(\lambda)\ge-L/2+\lambda/2$。もし光線束が $\lambda=L$ まで焦点を作らず有限で負の $\theta$ を保てるなら、$y(L)<0$ であるべきなのに $y(L)\ge0$ となり矛盾します。従って通常の滑らかな光線束の記述が維持される限り、$\lambda\le L$ までに膨張が負方向へ発散する焦点形成の判定が生じます。

ただしこれは局所的な集束評価です。[GR37の特異点定理](../GR37/index.md#thm-gr37-penrose)が測地不完備性を結論するには非コンパクトCauchy面・捕獲面など別の大域的仮定を要します。測地不完備性も曲率不変量の発散と同義ではありません。[GR38の宇宙検閲の定式化](../GR38/index.md#def-gr38-weak-censorship)は、さらに初期データの一般性・可視性・漸近構造を問う仮説です。
<!-- solution-end -->

<a id="ex-gr46-b04"></a>
#### GR46-B04 FLRWの制約・保存・赤方偏移
- Level: B

$G=c=1$、$\Lambda=0,k=0$、$\tau>0$ のFLRW宇宙で $a(\tau)=\tau^{2/3}$、圧力 $p=0$ とする。Friedmann制約から $\rho(\tau)$ を求め、$\dot\rho+3H(\rho+p)=0$ を検算せよ。次に $\tau_{\rm e}=1$ で発した光を $\tau_0=8$ で共動観測者が受けたときの赤方偏移 $z$ を求めよ。

<!-- solution-start -->
**詳細解答。** $\dot a=(2/3)\tau^{-1/3}$ なので $H=\dot a/a=2/(3\tau)$ です。[Friedmann制約](../GR42/index.md#thm-gr42-friedmann)で $k=\Lambda=0$ とすると $H^2=(8\pi/3)\rho$。これを密度について解くと

$$
\rho=\frac{3H^2}{8\pi}
=\frac3{8\pi}\frac4{9\tau^2}
=\frac1{6\pi\tau^2}.
$$

微分と膨張項はそれぞれ

$$
\dot\rho=-\frac1{3\pi\tau^3},\qquad
3H(\rho+p)=\frac2\tau\frac1{6\pi\tau^2}
=\frac1{3\pi\tau^3},
$$

よって和は零です。[GR42の流体保存](../GR42/index.md#prop-gr42-fluid-continuity)と整合します。共動光源・受信者については[GR43の宇宙論的赤方偏移](../GR43/index.md#thm-gr43-redshift-scale)から

$$
1+z=\frac{a(\tau_0)}{a(\tau_{\rm e})}
=\frac{8^{2/3}}{1^{2/3}}=4,
\qquad z=3.
$$

これは近傍の単純なDoppler式を仮定した計算ではなく、膨張中の光線と共動観測者による周波数比です。同じ $a$ でも $H^{-1}$ をそのまま事象の地平線とは呼べません（A04）。
<!-- solution-end -->

### Level C：異なる時空と理論の境界を一つの報告として組み立てる

<a id="ex-gr46-c01"></a>
#### GR46-C01 三つの地平線候補と古典・量子の境界
- Level: C

独立した三つの古典的模型を考える。いずれも $G=c=1$、計量符号 $(-,+,+,+)$ とし、(I) は漸近平坦RNの $M=2,Q=\sqrt3$、(II) は漸近平坦Kerrの $M=2,a=\sqrt3$、(III) は $k=0$ のde Sitter平坦パッチ $a(\tau)=e^{\tau/2}$（$\tau\in\mathbb R$、$H=1/2$）とする。RN・Kerrの時間並進は無限遠で、de Sitterの静的Killing時間は中心観測者で規格化する。

1. (I) の二つの根 $r_\pm$ と外側地平線の $\kappa_+$ を求める。電荷が非零でもEinstein真空である、という主張を検査せよ。
2. (II) の $r_+$、赤道の静止極限半径、$\Omega_H$、$\kappa_+$ を求める。$\partial_t$ と地平線の零生成場を区別せよ。
3. (III) の $\tau_0=0$ での宇宙論的事象の地平線の固有距離、静的パッチでの地平線半径、中心規格化の生成場に対する表面重力の絶対値を求めよ。符号の選択がどこに入るかも述べよ。
4. 以上からBHTに持ち込める古典的な入力を列挙し、この情報**だけ**で温度・エントロピーを確定できない理由を説明せよ。さらにQCURVで新たに必要になる情報を一つ具体的に挙げよ。

<!-- solution-start -->
**詳細解答。** まず三つの計量と生成場の規格化が異なることを確認します。RNは電磁場を源に持つEinstein–Maxwell解、Kerrは古典真空の回転解、de Sitterは $\Lambda>0$ を持つ膨張時空です。根が存在すること、地平線で正則な座標があること、大域的な因果境界であることは論理的に別の検査です。

**（1）RN。** [GR31の根](../GR31/index.md#prop-gr31-horizons)をパラメータへ代入すると

$$
r_\pm=M\pm\sqrt{M^2-Q^2}
=2\pm\sqrt{4-3}=2\pm1,
$$

すなわち $r_+=3,r_-=1$ です。入射EF座標での[GR45の静的球対称地平線の表面重力定理](../GR45/index.md#thm-gr45-static)から

$$
\kappa_+=\frac{r_+-r_-}{2r_+^2}
=\frac{3-1}{2\cdot9}=\frac19.
$$

一方[GR31の電磁場応力](../GR31/index.md#prop-gr31-maxwell-stress)は $T^t{}_t=-Q^2/(8\pi r^4)=-3/(8\pi r^4)$ なので、$r>0$ の外部で零ではありません。従って「無電流」は「Einstein真空」ではありません。

**（2）Kerr。** [GR32の地平線の根](../GR32/index.md#prop-gr32-horizon)は

$$
r_+=2+\sqrt{4-3}=3,\qquad r_-=1.
$$

赤道では[静止極限半径](../GR32/index.md#prop-gr32-static-order)が $r_{\rm stat}=2M=4$ なので、$3<r<4$ はergoregionに入ります。地平線の生成場は $\chi=\partial_t+\Omega_H\partial_\varphi$ であり、

$$
\Omega_H=\frac{a}{r_+^2+a^2}
=\frac{\sqrt3}{9+3}=\frac{\sqrt3}{12}.
$$

[GR45のKerr表面重力](../GR45/index.md#thm-gr45-kerr)は同じ無限遠規格化の生成場について

$$
\kappa_+=\frac{r_+-r_-}{2(r_+^2+a^2)}
=\frac2{2(9+3)}=\frac1{12}.
$$

$r=r_+$ の赤道で $g_{tt}=-(1-2M/r_+)=1/3>0$ なので、$\partial_t$ は零でも光的でもなく空間的です。零ノルムとなるのは回転成分を含めた $\chi$ です。

**（3）de Sitter。** $H=1/2$ 一定として[GR44の未来光線の積分](../GR44/index.md#prop-gr44-integral-criterion)を用います。

$$
\begin{aligned}
D_{\rm e}(0)
&=a(0)\int_0^\infty\frac{d\tau}{a(\tau)}
=\int_0^\infty e^{-\tau/2}d\tau\\
&=\left[-2e^{-\tau/2}\right]_0^\infty=2.
\end{aligned}
$$

[GR44の静的パッチへの変換](../GR44/index.md#thm-gr44-static-patch)では $f(R)=1-H^2R^2$、地平線半径 $R_H=H^{-1}=2$。$\partial_T$ は中心 $R=0$ で $g(\partial_T,\partial_T)=-1$ に規格化されます。$f'(R)=-2H^2R$ だから

$$
\frac12f'(R_H)=-H=-\frac12.
$$

これは静的時間の生成方向を選んだ場合の**符号付き**の非アフィン係数です。地平線の未来向き生成場の選択・向きと符号を合わせて扱う必要があり、中心規格化に対応する表面重力の**絶対値**は $|\kappa|=H=1/2$ です。[GR45の向きと規格化の議論](../GR45/index.md#prop-gr45-scaling)の通り、単に三つの数値を「同じ遠方時計で測った加速度」として並べることはできません。

**（4）理論の引き渡し。** 古典的に確定したのは、(I) のRNの根と表面重力、(II) のKerrの回転生成場・角速度と表面重力、(III) のde Sitter静的パッチの半径と表面重力です。さらに各地平線の球面積を計算できます。

$$
\begin{aligned}
A_R&=4\pi r_+^2=36\pi,\\
A_K&=4\pi(r_+^2+a^2)=48\pi,\\
A_D&=4\pi R_H^2=16\pi.
\end{aligned}
$$

Kerrの面積式は[GR32の地平線上の計量](../GR32/index.md#prop-gr32-horizon)から確認します。角度方向の計量成分は

$$
g_{\vartheta\vartheta}=\Sigma,\qquad
g_{\varphi\varphi}=\frac{(r_+^2+a^2)^2\sin^2\vartheta}{\Sigma}.
$$

両者を掛けた平方根が $(r_+^2+a^2)\sin\vartheta$ です。これを $0\le\vartheta\le\pi$、$0\le\varphi<2\pi$ にわたって積分すると $4\pi(r_+^2+a^2)$ を得ます。

しかし $\kappa$ も $A$ も、この古典的計算だけで熱平衡状態・温度・エントロピーを**定義**していません。熱力学の関係は[BHT](../../../../../plans/DREAM_THEATER_BLACK_HOLE_THERMODYNAMICS_I_PLAN.md)で追加の物理的仮定とともに検討します。[QCURV](../../../../../plans/DREAM_THEATER_QFT_CURVED_SPACETIME_I_PLAN.md)には、例えばこの曲がった時空上の場の**量子状態**と、どのモードを正周波数と見なすかという情報が新たに必要です。古典的な地平線と表面重力だけで、粒子検出率やHawking放射スペクトルは定まりません。
<!-- solution-end -->

## 6. 章を閉じる前の確認

ここまでの演習で、局所的な計量の根・不変量・物質源・Killing場、光線の大域的到達、初期値制約を**異なる種類の根拠**として扱いました。次の点は今後の理論でも繰り返し確認してください。

- 座標の発散を見つけたら、まず正則な別座標と曲率不変量を検査する。
- 地平線を論じるときは、事象・捕獲／見かけ・Killing・宇宙論的という定義、時間向き、未来境界、切片を明示する。
- $\kappa$ の数値にはKilling生成場の規格化を、保存量にはその生成Killing場と測地線条件を添える。
- 局所的な集束評価と大域的な測地不完備性、さらに宇宙検閲の未解決部分を別々に記述する。
- 初期値の制約式と時間発展式、古典的な幾何と量子熱力学の追加仮定を混同しない。

この切り分けができれば、BHTでは表面重力や面積を新しい熱力学的主張の**入力**として、QCURVでは背景時空と因果構造を場の量子化の**入力**として使えるようになります。
