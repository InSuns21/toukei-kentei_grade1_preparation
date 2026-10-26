# GR38 宇宙検閲仮説の論理と既知の限界

<!-- definition-example-audit: strict -->

[GR37のPenrose型特異点定理](../GR37/index.md#thm-gr37-penrose)は、捕獲面と集束条件から**未来向きの光的測地線が有限アフィン長で終わること**を導きました。それでも「不完備な場所を遠くから観測できるか」「初期条件からの予測がそこで破綻するか」には答えていません。前者と後者は、そもそも異なる問いです。

そこで本章は、遠方からの可視性を問う**弱宇宙検閲**と、初期値の決定性を問う**強宇宙検閲**の論理を、正確な初期データ・正則性の範囲に戻して整理します。式を手で確かめられる例は荷電したReissner–Nordström（RN）解です。既知の定理の条件を広げて一般相対論全体の証明と読み替えてはなりません。

以下、時空は時間向き付き、符号は $(-,+,+,+)$、$G=c=1$ です。RN・Kerrの古典的計算は宇宙項 $\Lambda=0$、RNの質量 $M>0$ と電荷 $Q$ を使います。必要に応じ、[GR28の未来零無限遠](../GR28/index.md#def-gr28-infinities)、[GR29の事象地平線](../GR29/index.md#def-gr29-event-horizon)、[LORG13のCauchy地平線](../../../幾何系/LORG/LORG13/index.md#def-lorg13-cauchy-horizon)を区別して使います。

## 1. 二種類の「隠す」と、初期値の決定性

ブラックホールの外から見えないことは、初期値から未来が一意に決まることと同じではありません。事象地平線は遠方の観測者へ送信できるかで決まり、Cauchy地平線は初期データだけで因果的に決定できる範囲の境界です。ブラックホール内部に後者が現れる可能性があります。

ここで必要になるのは、Einstein方程式の**初期値問題**という見方です。空間的三次元面 $\Sigma$ に幾何・物質データを指定し、Einstein方程式の制約式を満たす場合に、そこから得られる時空（発展）を考えます。詳しい分解・制約式はGR39–40で導きますが、本章では初期データが制約を満たして滑らかな発展を持つと仮定し、その因果論的な意味だけを使います。

[Cauchy面の定義](../../../幾何系/LORG/LORG15/index.md#def-lorg15-cauchy)は、両側非延長な未来向き**因果曲線（光的曲線も含む）**が初期面をちょうど一度通ることです。[大域双曲性とCauchy面の特徴付け](../../../幾何系/LORG/LORG16/index.md#thm-lorg16-characterization)により、初期値から因果的に決定される領域を一つの時空として扱えます。

<a id="def-gr38-mghd"></a>

<!-- formal-statement-start -->
> **定義（最大大域双曲的発展）**
> Einstein方程式（指定された物質模型を含む）の滑らかで制約を満たす初期データ $(\Sigma,\text{data})$ を固定する。そのデータを誘導するCauchy面を含み、方程式を満たす大域双曲的発展 $(D,g)$ のうち、同じ初期データから生じる他の任意の大域双曲的発展を、初期面を保つ等長埋め込みにより含むものを**最大大域双曲的発展**（MGHD）という。ここでの「最大」は、大域双曲的な発展のクラスでの最大性である。
<!-- formal-statement-end -->

滑らかな適切な初期データについて、MGHDの存在と初期面を保つ等長同型を除いた一意性は、Einstein方程式の初期値問題の大定理（Choquet-Bruhat–Geroch）です。この定理の偏微分方程式論による証明は本章の前提外なので、**ここでは使用する定理として明示的に受け入れます**。これは「MGHDの外へあらゆる正則性で延長できない」という主張ではありません。

<!-- definition-example-start: def-gr38-mghd -->
**定義の確認**：平坦な全Minkowski時空で $t=0$ を $\Sigma$ とすると、[Minkowskiの非延長因果曲線の全時刻通過](../../../幾何系/LORG/LORG15/index.md#lem-lorg15-full-time)により、光線も含めて $\Sigma$ はCauchy面です。$-1<t<1$ の開スラブでも、因果曲線の空間座標は時刻について1-Lipschitzなので、有限な中間時刻で抜け落ちることはなく、各非延長因果曲線は $t=-1$ と $t=1$ の間の全時刻を通ります。従って $\Sigma$ はここでもCauchy面です。

スラブと全Minkowskiは $t=0$ の近傍で同じ計量を持つため同じ初期データを誘導しますが、スラブは全Minkowskiへ真に等長埋め込みできるので、**スラブは最大ではありません**。一方、開半空間 $t>0$ はそもそも $\Sigma$ を含まず、この初期データの発展になりません。これで「同じデータ」「Cauchy面」「より大きい発展への埋め込み」の判定を分けられます。全候補に対する最大性の証明は、この一例での比較だけではなくMGHDの存在・一意性定理を使う段階です。
<!-- definition-example-end -->

初期値問題の最大性と幾何学的な延長の正則性を区別するため、次の定義を使います。

<a id="def-gr38-regular-extension"></a>

<!-- formal-statement-start -->
> **定義（計量の正則性別延長可能性）**
> 連結なLorentz時空 $(D,g)$ と整数 $k\ge0$ を考える。$D$ を同次元の、真に大きい連結Lorentz多様体 $(\widetilde D,\widetilde g)$ の真の開部分へ等長埋め込みでき、$\widetilde g$ が座標表示で $C^k$ 級の非退化Lorentz計量なら、$(D,g)$ は **$C^k$ 延長可能**という。そのような延長が存在しなければ **$C^k$ 非延長可能**という。$C^0$ は計量係数の連続性を要求し、$C^2$ は係数の二階微分までの連続性を要求する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr38-regular-extension -->
**定義の確認**：Minkowski時空の領域 $D=\{t>0\}$ に制限した計量 $-dt^2+dx^2+dy^2+dz^2$ は、全Minkowskiへ恒等的に埋め込めます。座標基底 $(\partial_t,\partial_x,\partial_y,\partial_z)$ の計量行列は $\operatorname{diag}(-1,1,1,1)$ で、固有値の符号は一つだけ負、行列式は $-1\ne0$ です。従って非退化なLorentz計量で、係数は定数ゆえ滑らかです。$D$ は全空間の**真の開部分**なので、この領域は $C^0$、$C^2$、さらには滑らかに延長可能です。[GR37の不完備性の例](../GR37/index.md#def-gr37-geodesic-incompleteness)とも整合します。不完備だから非延長可能、とはなりません。
<!-- definition-example-end -->

## 2. 弱宇宙検閲：遠方に露出するか

「裸の特異点」という語だけでは数学的な命題になりません。裸とはどの観測者に対してか、特異性は測地不完備なのか曲率発散なのか、初期データのうちどれだけ広い集合について述べるのか、を決める必要があります。

非コンパクトな漸近平坦初期面からの発展では、遠くへ出る未来光の到達先を[未来零無限遠 $\mathscr I^+$](../GR28/index.md#def-gr28-infinities)で表します。光線の十分遠方における「行き止まり」を排除する代表的な定式化は、$\mathscr I^+$ の適切な完備性を要求するものです。

<a id="def-gr38-weak-censorship"></a>

<!-- formal-statement-start -->
> **定義（弱宇宙検閲の代表的定式化）**
> 滑らかで漸近平坦な、適切なEinstein–物質方程式の初期データのクラスと、そのクラスでの「一般的」（generic）の意味を固定する。このクラスの一般的なデータからの発展では、遠方の観測者に対応する未来零無限遠 $\mathscr I^+$ が適切な意味で完備である、という**未解決の一般的仮説**を弱宇宙検閲（WCC）の一つの代表的定式化と呼ぶ。可視性を $J^-(\mathscr I^+)$ から定めるので、漸近平坦性・共形境界の存在などを前提にする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr38-weak-censorship -->
**定義の確認**：Minkowski時空の未来向き光線を、例えば $\gamma(\lambda)=(t_0+\lambda,x_0+\lambda,y_0,z_0)$（$\lambda\ge0$）と書けます。接続係数は零、接ベクトルは零ベクトルではなく光的で、$\lambda$ は上限のないアフィンパラメータです。[未来零無限遠の定義](../GR28/index.md#def-gr28-infinities)に従ってこの光線は $\mathscr I^+$ に達し、[事象地平線の定義例](../GR29/index.md#def-gr29-event-horizon)では $J^-(\mathscr I^+)=D$ です。Minkowskiの全光線は並進・回転で同様に調べられます。これはWCCと矛盾しない一例ですが、一般の重力崩壊を証明してはいません。対して、$r=0$ の曲率特異性を持つ $|Q|>M$ の形式的RN解は[地平線分類](../GR31/index.md#prop-gr31-horizons)で正の地平線を持ちません。ただし**この静的解の存在だけでは、許容する滑らかな初期データから一般的にその裸特異性が形成される、とは言えません**。
<!-- definition-example-end -->

「一般的」の曖昧さは飾りではありません。特異な解が一つ存在することと、わずかに初期データを変えても裸特異性が残ることは違います。また未来零無限遠の完備性と「すべての測地線が完備」という命題も違います。[GR37のPenrose型定理](../GR37/index.md#thm-gr37-penrose)が保証するのはどこかの光的測地線の不完備性であって、それが $J^-(\mathscr I^+)$ にあるかは同定しません。

## 3. 強宇宙検閲：初期値からの未来を延長できるか

別の問題は、初期データの情報が届かない領域を、同じ計量に続く時空として追加できてしまうかです。そこには[依存領域とCauchy地平線の定義](../../../幾何系/LORG/LORG13/index.md#def-lorg13-cauchy-horizon)が必要です。一般の延長時空で初期面の依存領域に境界が現れれば、その先の出来事は初期面だけでは決められません。

<a id="def-gr38-strong-censorship"></a>

<!-- formal-statement-start -->
> **定義（強宇宙検閲の代表的定式化）**
> あるEinstein–物質方程式、滑らかで制約を満たす初期データのクラス、genericの意味、および $k\ge0$ を固定する。そのクラスの一般的なデータから得られる**最大大域双曲的発展**が $C^k$ Lorentz計量を持つ時空へ延長不可能である、という**一般的仮説**を $C^k$ 版の強宇宙検閲（SCC）と呼ぶ。$k=0$ と $k=2$ は異なる命題である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr38-strong-censorship -->
**定義の確認**：滑らかなMGHDがもしCauchy地平線の先へ滑らかに延長できても、MGHDの**大域双曲的クラスでの最大性**とは矛盾しません。延長した方では元の $\Sigma$ がCauchy面でなくなる場合があるからです。また $C^0$ 延長可能性を確認しても、$C^2$ 延長可能性は自動的には従いません。後者では曲率を構成する計量の二階微分まで必要だからです。
<!-- definition-example-end -->

弱い方は**遠方の可視性**、強い方は**初期値からの一意な予測可能性**を問います。弱い検閲が成立してブラックホールが外部を遮っていても、内部のCauchy地平線を通して滑らかな延長ができれば、強い検閲にとって問題です。互いにどちらかを単純に含意する関係ではありません。

## 4. RNの内側の零面は、式の上では「壁」ではない

[GR31のRN計量と地平線半径](../GR31/index.md#def-gr31-rn-horizon-radii)を、$0<|Q|<M$（劣極限）の場合に考えます。$r_\pm=M\pm\sqrt{M^2-Q^2}$ で $0<r_-<r_+$ です。静的座標の係数 $f^{-1}$ は根で発散しますが、座標上の発散と不変な曲率の発散は同一ではありません。

<a id="prop-gr38-rn-extension"></a>

<!-- formal-statement-start -->
> **命題（RN内側の正則な局所延長と有限固有時）**
> $M>0$、$0<|Q|<M$ のRN計量を考え、$r_-<r<r_+$ の領域で入射する単位質量の径方向時間的測地線を取る。保存エネルギー $E=f\,dt/d\tau>0$ を持つとする。
>
> 1. 入射Eddington–Finkelstein座標 $(v,r)$ での計量は $r=r_-$ を含む $r>0$ の局所開領域へ滑らかで非退化なLorentz計量として延長できる。
> 2. 上の測地線は有限の固有時間で $r=r_-$ に達し、$v$ も有限である。この局所計算だけでは、最大解析延長のどの零面がCauchy地平線か、また一般の摂動の運命までは結論しない。
<!-- formal-statement-end -->

### 証明の見取り図

[GR31の正則座標の命題](../GR31/index.md#prop-gr31-horizons)を実際に行列で確認します。次に測地線の四元速度の規格化とKilling保存量から $dr/d\tau$ を求め、積分の分母が内側の根の近くで零にならないことを示します。$v$ の導関数では一見 $0/0$ になる式を、有理化して有限値を得ます。

<!-- proof-start -->
### 証明

先に定義域を確かめます。$f(r)$ は $r>0$ で滑らかで、劣極限では

$$
f(r)=1-\frac{2M}r+\frac{Q^2}{r^2}
=\frac{(r-r_+)(r-r_-)}{r^2}.
$$

$f\ne0$ の部分で $dv=dt+dr/f$ と置くと、$dt=dv-dr/f$ だから

$$
\begin{aligned}
-f\,dt^2+f^{-1}dr^2
&=-f\left(dv-\frac{dr}{f}\right)^2+\frac{dr^2}f\\
&=-f\,dv^2+2\,dv\,dr.
\end{aligned}
$$

この最終式は $f=0$ でも有限であり、$r_-$ の近傍では

$$
g_{(v,r)}=\begin{pmatrix}-f&1\\1&0\end{pmatrix},\qquad
\det g_{(v,r)}=-1,
\qquad
g_{(v,r)}^{-1}=\begin{pmatrix}0&1\\1&f\end{pmatrix}.
$$

$r_->0$ なので球面部分 $r^2d\Omega^2$ も球面の局所座標では滑らかで正定値です。上の行列は実対称で、その二固有値の積が $-1<0$ だから一つが負、もう一つが正です。従って二つの正固有値を持つ球面部分と合わせた全計量の符号は $(-,+,+,+)$ で、非退化です。座標の交差項 $2\,dv\,dr$ が行列の非対角成分 $g_{vr}=g_{rv}=1$ を与えることが、この行列で判定できる理由です。計量の係数と逆行列が滑らかだから、ここで曲率の有限性も局所的に従います（$r=0$ は除外）。

次に時間的測地線の固有時微分を点で表します。$t$ の並進対称性から[GR14のKilling保存量](../GR14/index.md#thm-gr14-killing-charge)で $E=f\dot t$ が一定です。$g(\dot\gamma,\dot\gamma)=-1$ に代入すると

$$
-1=-f\dot t^2+f^{-1}\dot r^2
=-\frac{E^2}{f}+\frac{\dot r^2}{f},\qquad
\dot r^2=E^2-f.
$$

内向きの根を選び $\dot r=-\sqrt{E^2-f}$ とします。$r_-<r<r_+$ では $f<0$ なので $\sqrt{E^2-f}>E>0$。したがって任意の $r_0\in(r_-,r_+)$ からの固有時差は

$$
\tau_- -\tau_0
=\int_{r_-}^{r_0}\frac{dr}{\sqrt{E^2-f(r)}}
\le\frac{r_0-r_-}{E}<\infty.
$$

同じ測地線で $\dot v=\dot t+\dot r/f=(E+\dot r)/f$ です。分子分母に $E-\dot r$ を掛け、$E^2-\dot r^2=f$ を使えば

$$
\dot v=\frac{E^2-\dot r^2}{f(E-\dot r)}
=\frac1{E-\dot r}.
$$

$r\downarrow r_-$ では $\dot r\to-E$、従って $\dot v\to1/(2E)$。固有時差は有限で $v$ の変化率も有界です。この入射枝では $(v,r)$ が有限な値に達し、正則な計量の下で測地線を続けられます。$\square$
<!-- proof-end -->

**数値で確かめる。** $M=5$、$Q=4$ とすると $r_+=8$、$r_-=2$、$f=(r-8)(r-2)/r^2$ です。$r=2$ での $g_{(v,r)}$ は $\begin{pmatrix}0&1\\1&0\end{pmatrix}$、行列式は $-1$ です。$E=1$ の落下では $2<r<8$ における固有時間は高々 $6$、内側境界への到達時に $\dot r=-1$、$\dot v=1/2$。静的座標の $1/f$ の発散を特異点と誤認してはいけません。

RNの**最大解析延長の大域構造**では、内側にCauchy地平線が現れます。しかしこの命題の検算はあくまで入射枝の局所計量と測地線です。[LORG13のCauchy地平線の定義](../../../幾何系/LORG/LORG13/index.md#def-lorg13-cauchy-horizon)にある全因果曲線の条件を、この行列式だけから確定したことにはなりません。厳密なRNの対称性が壊れた場合に同じ正則性が維持されるとも言えません。

## 5. 曲率が発散しても連続計量は残り得る

曲率は計量からChristoffel係数（一次微分）を組み立て、さらにその導関数（二次微分）を使って計算します。したがって、曲率不変量がある境界点へ近づくと発散するなら、そこを通る $C^2$ 延長は排除できます。しかし $C^0$ 延長なら二階微分を要求しません。

<a id="prop-gr38-curvature-obstruction"></a>

<!-- formal-statement-start -->
> **命題（曲率スカラー発散によるC2延長障害）**
> 滑らかなLorentz時空 $(D,g)$ に対し、$D$ 内の点列 $p_n$ が仮想的な延長の境界点 $p$ へ収束するとする。スカラー曲率や $R_{abcd}R^{abcd}$ など計量から作る曲率スカラーの一つが $p_n$ 上で絶対値無限大へ発散するなら、その点列を $p$ へ送る **$C^2$ 非退化Lorentz計量の延長は存在しない**。
<!-- formal-statement-end -->

### 証明の見取り図

曲率スカラーが座標に依存しないことと、$C^2$ 計量から作った曲率スカラーは局所連続であることを組み合わせます。

<!-- proof-start -->
### 証明

背理法で、等長埋め込み後の $p_n$ が $p$ に収束し、その近傍に $C^2$ 非退化計量 $\widetilde g$ があるとします。$\widetilde g_{ab}$ と逆行列は二階まで（逆行列についても）必要な連続性を持ち、

$$
\Gamma^a_{bc}=\frac12\widetilde g^{ad}
(\partial_b\widetilde g_{dc}+\partial_c\widetilde g_{db}-\partial_d\widetilde g_{bc})
$$

は $C^1$ 級です。曲率 $R^a{}_{bcd}=\partial_c\Gamma^a_{db}-\partial_d\Gamma^a_{cb}+\Gamma^a_{ce}\Gamma^e_{db}-\Gamma^a_{de}\Gamma^e_{cb}$ は連続になります。従って曲率と計量を有限回縮約したスカラー $I$ は $p$ 近傍で連続であり、$I(p_n)\to I(p)$ は有限です。$D$ 上の等長性により $I(p_n)$ は元の曲率スカラーと一致するので、発散の仮定と矛盾します。$\square$
<!-- proof-end -->

**定義の違いを手で確かめる模型**。Einstein方程式の解とは主張しない、二次元の $t>0$ における滑らかな計量を考えます。

$$
ds^2=-dt^2+a(t)^2dx^2,\qquad a(t)=1+t^{3/2}.
$$

$t\downarrow0$ で $a\to1$ です。そこで**開いた全平面** $\widetilde D=\mathbb R^2$ に

$$
\widetilde a(t)=\begin{cases}1,&t\le0,\\1+t^{3/2},&t>0,\end{cases}
\qquad \widetilde g=-dt^2+\widetilde a(t)^2dx^2
$$

を定めます。座標基底 $(\partial_t,\partial_x)$ での行列は $\operatorname{diag}(-1,\widetilde a^2)$ です。$\widetilde a$ は連続で正なので、二固有値の符号は $(-,+)$、行列式は $-\widetilde a^2\ne0$ です。元の $D=\{t>0\}$ は真の開部分で、恒等埋め込みが等長となるため、これは**定義の全条件を満たす $C^0$ 延長**です。

一方、$t>0$ での非零なChristoffel係数は $\Gamma^t_{xx}=aa'$、$\Gamma^x_{tx}=\Gamma^x_{xt}=a'/a$ です。[曲率成分の四項公式](../GR6/index.md#prop-gr6-coordinate-curvature)の添字に $(t,x,t,x)$、$(x,t,x,t)$ を代入すると

$$
\begin{aligned}
R^t{}_{xtx}&=\partial_t(aa')-(aa')(a'/a)=aa'',\\
R^x{}_{txt}&=-\partial_t(a'/a)-(a'/a)^2=-a''/a.
\end{aligned}
$$

[Lorentz時空のRicci曲率](../GR6/index.md#def-gr6-ricci-scalar)の定義より $\operatorname{Ric}_{xx}=aa''$、$\operatorname{Ric}_{tt}=-a''/a$。同じ箇所で定義したスカラー曲率に対し、逆計量の $g^{tt}=-1$、$g^{xx}=a^{-2}$ を使うと

$$
R=(-1)\left(-\frac{a''}{a}\right)
 +a^{-2}(aa'')=\frac{2a''}{a}
=\frac{3}{2}\frac{t^{-1/2}}{1+t^{3/2}}
\longrightarrow+\infty.
$$

[曲率発散による障害](#prop-gr38-curvature-obstruction)により、$t=0$ を境界点としてこの列を収束させる $C^2$ 延長はできません。

実際、**別の境界からの $C^2$ 延長でも逃れられない**ことを次のように確かめられます。時間的測地線では $x$ が循環座標なので[循環座標の保存量](../GR14/index.md#prop-gr14-cyclic-coordinate) $p=a^2\dot x$ が一定で、規格化から

$$
\dot t^2=1+\frac{p^2}{a^2},\qquad
1\le|\dot t|\le\sqrt{1+p^2},\qquad
|\dot x|\le|p|.
$$

この評価により、有限固有時で元の領域から出る時間的測地線の座標は $t\downarrow0$ 以外の場所で発散できません（$t>0$ の内部なら滑らかな測地線方程式で続けられます）。もし真の連結な $C^2$ 延長があれば、延長領域の境界を横切る短い時間的測地線を局所的に選べるので、その元の領域内の枝は有限固有時で $t=0$ に向かいます。しかしどの $x$ でも $R\to+\infty$ で、延長計量から計算する連続な曲率と矛盾します。

従ってこの模型は**$C^0$ 延長可能だが $C^2$ 非延長可能**です。計量は連続的に続けられても、曲率は続けられないのです。これが「弱い零特異性（weak null singularity）」を研究する際に正則性を明記する理由の入門的な類比です。ただしこの二次元例は零地平線の模型ではありません。

<a id="prop-gr38-regularity-logic"></a>

<!-- formal-statement-start -->
> **命題（延長の正則性についての含意）**
> 同じLorentz時空 $(D,g)$ について、$C^2$ 延長可能なら $C^0$ 延長可能である。従って $C^0$ 非延長可能なら $C^2$ 非延長可能である。しかし、$C^2$ 非延長可能から $C^0$ 非延長可能は一般には導けない。
<!-- formal-statement-end -->

### 証明の見取り図

微分可能性の包含 $C^2\subset C^0$ を使い、逆向きには直前の模型があることを確認します。

<!-- proof-start -->
### 証明

$C^2$ 延長 $\widetilde g$ があればその係数は連続で、同じ等長埋め込みがそのまま $C^0$ 延長です。対偶により $C^0$ 非延長可能なら $C^2$ 非延長可能です。一方、$t>0$ の計量 $-dt^2+(1+t^{3/2})^2dx^2$ は上で $C^0$ 延長を構成しましたが、境界 $t=0$ で曲率スカラーが発散するため $C^2$ には延長できません。従って逆の含意は成立しません。$\square$
<!-- proof-end -->

## 6. 既知の成果と、そこから飛べない結論

「内側の地平線は不安定」と一言で済ませると、何の方程式・どの摂動・どの正則性について述べているのかが消えてしまいます。

1. **球対称のEinstein–無質量実スカラー場模型**：Christodoulouは1994年に球対称重力崩壊で裸特異性の例を構成し、1999年にその摂動不安定性を示しました。これは特定の模型・データの正則性クラスにおける重要な成果ですが、すべての物質や非球対称崩壊についての弱宇宙検閲の一般定理ではありません。
2. **球対称のEinstein–Maxwell–実スカラー場模型**：Luk–Ohらの二つの論文では、二端の漸近平坦な初期データのクラスで、一般的な $C^2$ 非延長可能性が証明されています。一方、同じ模型では適切な解の内部に**連続計量のCauchy地平線**が存在します。したがってこの定理を $C^0$ 版SCCの証明と表現するのは誤りです。
3. **回転するKerrの真空摂動**：Dafermos–Lukの結果は、特定の内側領域の仮定を満たす動的な真空ブラックホールのCauchy地平線が $C^0$ の意味で安定に残ることを証明します。これは一般の滑らかな初期データからの全大域的発展について、$C^2$ 版SCCの真偽を一括解決した主張ではありません。

これらは相互に矛盾しません。**$C^0$ まで計量が続くこと**と、**二階微分からなる曲率が強く発散すること**は両立するからです。電荷・回転・宇宙項・物質模型・データ空間と「一般的」の意味を変更すれば、別の命題になります。

### 一次論文を読むための入口

- D. Christodoulou, [*Examples of naked singularity formation in the gravitational collapse of a scalar field*](https://annals.math.princeton.edu/1994/140-3/p03)（1994）と[*The instability of naked singularities in the gravitational collapse of a scalar field*](https://annals.math.princeton.edu/articles/12445)（1999）。球対称スカラー場における構成と、その後の不安定性の証明。
- J. Luk and S.-J. Oh, [*Strong cosmic censorship in spherical symmetry for two-ended asymptotically flat initial data I*](https://annals.math.princeton.edu/2019/190-1/p01) と [Part II](https://doi.org/10.1007/s40818-019-0062-7)（2019）。$C^2$ 版と $C^0$ 版を区別する数学的結果。
- M. Dafermos and J. Luk, [*The interior of dynamical vacuum black holes I: The $C^0$-stability of the Kerr Cauchy horizon*](https://annals.math.princeton.edu/2025/202-2/p01)（2025）。真空Kerr型内部での連続計量の延長。

本章が完全証明したのは [RNの正則な局所延長](#prop-gr38-rn-extension)、[曲率発散による $C^2$ 障害](#prop-gr38-curvature-obstruction)、[正則性の含意](#prop-gr38-regularity-logic)です。上記の研究論文の非線形偏微分方程式の主要定理は、ここで再証明したものではありません。

## 7. 演習：仮説の量化と正則性を自分で判定する

### Level A：定義と基本計算

<a id="ex-gr38-a01"></a>
#### GR38-A01 二つの地平線を混同しない
- Level: A

時間向き付き漸近平坦時空の事象地平線と、初期面 $\Sigma$ の未来Cauchy地平線について、それぞれ「何を境界にするか」を述べよ。二者が同じ集合であると定義だけから言えるか。

<!-- solution-start -->
**詳細解答**：[事象地平線の定義](../GR29/index.md#def-gr29-event-horizon)は $\partial_D J^-(\mathscr I^+)$ です。到達先は未来零無限遠であり、遠方へ出る情報の可否を問います。一方、[Cauchy地平線の定義](../../../幾何系/LORG/LORG13/index.md#def-lorg13-cauchy-horizon)は初期集合の依存領域の境界により、非延長因果曲線が初期データと交わるかを問います。定義に現れる集合は異なるので同一性を導けません。特定の時空で一致を主張するなら別途大域的な因果解析が必要です。
<!-- solution-end -->

<a id="ex-gr38-a02"></a>
#### GR38-A02 RNの劣極限の判定
- Level: A

$M=5,Q=4$ のRN計量で $r_\pm$、$f(r)$ とその符号を $r<2$、$2<r<8$、$r>8$ に分けて求めよ（$r>0$）。

<!-- solution-start -->
**詳細解答**：[RNの地平線半径](../GR31/index.md#def-gr31-rn-horizon-radii)で判別式は $M^2-Q^2=25-16=9>0$、従って $r_\pm=5\pm3$ で $r_+=8,r_-=2$ です。和は $10$、積は $16$ なので

$$
f(r)=1-\frac{10}r+\frac{16}{r^2}
=\frac{(r-8)(r-2)}{r^2}.
$$

分母は正で、$0<r<2$ では両因子が負なので $f>0$、$2<r<8$ では一方だけ負なので $f<0$、$r>8$ では両方正なので $f>0$ です。零点の数だけからCauchy地平線の因果的性質を証明したことにはなりません。
<!-- solution-end -->

<a id="ex-gr38-a03"></a>
#### GR38-A03 正則性の論理
- Level: A

「$C^2$ 延長可能なら $C^0$ 延長可能」「$C^2$ 非延長可能なら $C^0$ 非延長可能」の二命題のうち、常に正しい方を選び、理由を述べよ。

<!-- solution-start -->
**詳細解答**：$C^2$ 級関数は連続なので $C^2\subset C^0$ です。[正則性の含意命題](#prop-gr38-regularity-logic)の前半より第一命題は正しいです。第二命題は逆向きの含意で偽です。たとえば本章の $a(t)=1+t^{3/2}$ の模型では $C^0$ 延長は存在し、曲率発散によって $C^2$ 延長はできません。非延長性を主張するときはどの $k$ かを残します。
<!-- solution-end -->

<a id="ex-gr38-a04"></a>
#### GR38-A04 不完備性が教えないこと
- Level: A

未来光的測地線が一本不完備であると分かった。これだけからWCCの破れ、SCCの破れ、曲率発散をそれぞれ主張できるか。

<!-- solution-start -->
**詳細解答**：いずれも主張できません。[測地不完備性の定義](../GR37/index.md#def-gr37-geodesic-incompleteness)は極大アフィンパラメータの有限端点だけを述べます。WCCは $\mathscr I^+$ の完備性など遠方可視性を別途要求し、SCCはMGHDの計量延長可能性を問います。曲率は計量の二階微分から作る不変量です。例えば平坦な開半時空 $t<0$ の未来向き光線 $\gamma(\lambda)=(\lambda,\lambda,0,0)$（$\lambda<0$）は未来端 $\lambda=0$ で不完備ですが、曲率は零で、全Minkowskiへの滑らかな延長も存在します。この開半時空は指定初期データのMGHDと断定できないので、SCCの反例ともなりません。三つとも別の検査が要ります。
<!-- solution-end -->

<a id="ex-gr38-a05"></a>
#### GR38-A05 内側の零面で行列式を検算
- Level: A

入射EF座標のRN計量 $ds^2=-f\,dv^2+2dv\,dr+r^2d\Omega^2$ で、$(v,r)$ ブロックの逆行列と $dr$ のノルムを求め、$f=0$ が零面であることを確認せよ。

<!-- solution-start -->
**詳細解答**：計量行列は $A=\begin{pmatrix}-f&1\\1&0\end{pmatrix}$ で、$\det A=-1$ です。積を直接取ると

$$
A\begin{pmatrix}0&1\\1&f\end{pmatrix}
=\begin{pmatrix}1&0\\0&1\end{pmatrix}.
$$

従って $g^{rr}=f$ です。超曲面 $r=\text{const}$ の法共ベクトルは $dr$ で、長さは $g^{-1}(dr,dr)=g^{rr}=f$。$f=0$ で法線は光的となり、$r_h>0$ では球面成分も非退化なので、ここは正則な零超曲面です。これだけで事象地平線かCauchy地平線かを判定したわけではありません。
<!-- solution-end -->

### Level B：式と論理をつなぐ

<a id="ex-gr38-b01"></a>
#### GR38-B01 内側への有限固有時を導く
- Level: B

$0<|Q|<M$ のRNの $r_-<r<r_+$ で、径方向単位時間的測地線の保存量 $E=f\dot t>0$ を用い、内向きに $r_-$ へ到達する固有時が有限であることと、$\dot v$ の極限を再導出せよ。

<!-- solution-start -->
**詳細解答**：[Killing保存量](../GR14/index.md#thm-gr14-killing-charge)と $g(\dot\gamma,\dot\gamma)=-1$ から

$$
-1=-\frac{E^2}{f}+\frac{\dot r^2}{f},\qquad
\dot r=-\sqrt{E^2-f}.
$$

区間 $r_-<r<r_+$ で $f<0$ だから $|\dot r|\ge E>0$ です。$r_0$ からの固有時差は

$$
\tau_- -\tau_0=\int_{r_-}^{r_0}\frac{dr}{\sqrt{E^2-f(r)}}
\le\frac{r_0-r_-}{E}.
$$

さらに $dv=dt+dr/f$ と $E^2-\dot r^2=f$ から

$$
\dot v=\frac{E+\dot r}{f}
=\frac{(E+\dot r)(E-\dot r)}{f(E-\dot r)}
=\frac1{E-\dot r}\longrightarrow\frac1{2E}.
$$

よって $v$ も有限な値に収束します。$\dot v$ の式の有理化が、静的な $1/f$ の見掛けの発散を解消する核心です。
<!-- solution-end -->

<a id="ex-gr38-b02"></a>
#### GR38-B02 曲率発散と延長の正則性
- Level: B

$t>0$ で $ds^2=-dt^2+(1+t^{3/2})^2dx^2$ を考える。$t=0$ で $C^0$ 延長ができること、スカラー曲率が発散すること、同じ境界へ $C^2$ 延長できないことを順に示せ。

<!-- solution-start -->
**詳細解答**：$a(t)=1+t^{3/2}$ と置けば、計量行列 $\mathrm{diag}(-1,a^2)$ の行列式は $-a^2$ で、$t\downarrow0$ に $-1$ に収束します。$t\le0$ に $\widetilde a=1$、$t>0$ に $\widetilde a=a$ と定めた全平面上の計量は連続・非退化で、元の領域を真の開部分として含みます。Christoffel係数は $\Gamma^t_{xx}=aa'$、$\Gamma^x_{tx}=a'/a$ です。[曲率公式](../GR6/index.md#prop-gr6-coordinate-curvature)に代入すると $R^t{}_{xtx}=\partial_t(aa')-(a')^2=aa''$、$R^x{}_{txt}=-\partial_t(a'/a)-(a'/a)^2=-a''/a$。従って $\operatorname{Ric}_{xx}=aa''$、$\operatorname{Ric}_{tt}=-a''/a$、[スカラー曲率の縮約](../GR6/index.md#def-gr6-ricci-scalar)で $R=2a''/a$ となり、

$$
a'=\frac32t^{1/2},\qquad
a''=\frac34t^{-1/2},\qquad
R=\frac{3t^{-1/2}}{2(1+t^{3/2})}\to+\infty.
$$

[曲率スカラー発散による障害](#prop-gr38-curvature-obstruction)を境界 $t=0$ に適用すると、その境界で曲率が連続になる $C^2$ 非退化計量を構成できません。さらに $p=a^2\dot x$ が一定な時間的測地線では $\dot t^2=1+p^2/a^2$、$|\dot x|\le|p|$ なので有限固有時で出られるのは $t\downarrow0$ のみです。従って別の境界を通る $C^2$ 延長もなく、$C^2$ 非延長性が従います。計量自体の連続延長とは矛盾しません。
<!-- solution-end -->

<a id="ex-gr38-b03"></a>
#### GR38-B03 反例はgenericの証明か
- Level: B

$|Q|>M$ の静的RN解に地平線がない事実と、球対称スカラー場のある裸特異性解の存在を考える。これら二つを根拠に「一般的な滑らかな重力崩壊はWCCを破る」と結論する推論の欠落を三点に分けて説明せよ。

<!-- solution-start -->
**詳細解答**：第一に[RNの地平線分類](../GR31/index.md#prop-gr31-horizons)は**既に与えた厳密解**であり、その曲率特異性が許容する滑らかな初期データから動的に形成される証明ではありません。第二に「一般的」はデータ空間と位相、例外集合の意味を要求し、一つの解の存在ではその条件を満たしません。第三に球対称・特定の物質模型の結論を非球対称や別の物質へ拡張するには追加定理が必要です。Christodoulouの球対称スカラー場の不安定性の成果は、むしろ解の存在と一般性を分ける重要な事例です。
<!-- solution-end -->

<a id="ex-gr38-b04"></a>
#### GR38-B04 強い検閲と二つの正則性
- Level: B

ある初期データのクラスについて「一般的なMGHDは $C^0$ 延長可能だが $C^2$ 延長不可能」と証明されたと仮定する。$C^0$ 版と $C^2$ 版SCCに対して何が言えるか。弱宇宙検閲については何が言えるか。

<!-- solution-start -->
**詳細解答**：[SCCの定式化](#def-gr38-strong-censorship)は一般的なMGHDの非延長性を問います。仮定は一般的に $C^0$ 延長**可能**なので、同じデータクラス・genericの意味では $C^0$ 版SCCは成立しません。一方 $C^2$ 延長**不可能**なので、そのクラスでは $C^2$ 版SCCを支持し、仮定が本当に一般的全体を覆うならその版の主張を与えます。しかし[WCCの定式化](#def-gr38-weak-censorship)は未来零無限遠の完備性に関するもので、内部の延長の正則性だけでは判定できません。
<!-- solution-end -->

### Level C：初期値からの問いを統合する

<a id="ex-gr38-c01"></a>
#### GR38-C01 RNを出発点として宇宙検閲を判定する
- Level: C

$M=5$、$Q=4$ の厳密RN解を起点に、次の順で論じよ。

1. 内外の根、正則な入射EF計量と径方向落下の有限固有時を検算する。
2. その局所計算からWCCとSCCの一般的真偽を結論できない理由を述べる。
3. $C^0$ 版と $C^2$ 版の違いを曲率スカラーにより説明する。
4. 球対称Einstein–Maxwell–実スカラー場とKerr型真空摂動で、既知の数学的成果の射程を正確に言い分ける。

<!-- solution-start -->
**詳細解答**：まず $M^2-Q^2=9$ だから $r_+=8,r_-=2$ で、

$$
f(r)=\frac{(r-8)(r-2)}{r^2}.
$$

入射EF表示の $(v,r)$ 計量は $\begin{pmatrix}-f&1\\1&0\end{pmatrix}$ で、行列式は $-1$。$r=2>0$ でも滑らかなLorentz計量を与えます。$E=f\dot t>0$ の内向き時間的測地線では

$$
\dot r=-\sqrt{E^2-f},\qquad
0<\tau_--\tau_0\le\frac{r_0-2}{E},\qquad
\dot v=\frac1{E-\dot r}\to\frac1{2E}.
$$

したがって一つの枝での局所延長と有限固有時が確認できました。しかしこれは指定された**厳密な対称解**の計算であり、[WCC](#def-gr38-weak-censorship)の遠方での $\mathscr I^+$ の完備性や、[SCC](#def-gr38-strong-censorship)の一般的な初期データのMGHDの非延長性を判定しません。RNの最大解析延長のCauchy地平線は大域構造の情報であり、$\det g=-1$ の局所式だけでは判定できない点も重要です。

正則性は $C^2\subset C^0$ ですが逆はありません。曲率スカラーが境界へ向かって発散すれば、[曲率障害命題](#prop-gr38-curvature-obstruction)でその点を通る $C^2$ 延長は不可能です。一方、計量が連続で残ることはあり得ます。本章の $a(t)=1+t^{3/2}$ の例はその論理を明示します。

最後に、Luk–Ohの球対称Einstein–Maxwell–実スカラー場については、特定の二端漸近平坦データのクラスで**一般的 $C^2$ 非延長性**と**$C^0$ 延長**が両立します。Dafermos–LukのKerr型真空内部については**仮定を満たす内部摂動の $C^0$ 安定性**を与える結果です。いずれも全物質・全データについて両版SCCとWCCを同時に解決したという意味ではありません。これは計算結果・大域構造・一般性・正則性という四つの論理段階を分けた結論です。
<!-- solution-end -->

## 8. 次の章へ

強宇宙検閲の問題を正確に立てるには、まず初期面に何を指定してEinstein方程式の発展を求めるのかを知る必要があります。次のGR39では時空を空間的超曲面へ分け、時間の進み方を表すlapse・shiftと初期データの幾何を導入します。GR40では、どんな数値を初期面に置いてもよいわけではない理由を制約方程式で確認します。
