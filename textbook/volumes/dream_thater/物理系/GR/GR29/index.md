# GR29 事象・見かけ・Killing地平線

<!-- definition-example-audit: strict -->

[GR28の共形因果図](../GR28/index.md#def-gr28-causal-diagram)を使うと、Schwarzschild時空の光線が遠方へ届くか、内部にとどまるかを図にできます。しかし、地平線を「光が脱出できなくなる場所」と呼ぶだけでは、**未来の全歴史を調べて初めて決まる境界**と、**いまこの場所の光線が収束する境界**を区別できません。さらに、静的時空の時間並進対称性から生まれる別の地平線もあります。

この三つは静的Schwarzschild模型では同じ半径を取ります。だからこそ、何を計算して得た半径なのかを区別する必要があります。本章では (i) 遠方への因果到達、(ii) 二球面の面積変化、(iii) Killing場が零超曲面の法線になる条件、の順に判定法を導きます。最後に時間依存模型で三者が分かれることを検算します。

計量の符号は $(-,+,+,+)$ とし、まず光速 $c$ とNewton定数 $G$ を明示して $r_s=2GM/c^2$ と書きます。以後の座標 $v$ は長さの次元を持つ $x^0=ct$ 型の入射零時刻であり、必要な箇所では $a(v)$ を長さの次元を持つ可変のSchwarzschild半径として使います。$d\Omega^2=d\vartheta^2+\sin^2\vartheta\,d\varphi^2$ とします。

## 1. 遠方へ知らせられるか：未来事象地平線

[LORG6の因果的過去・未来](../../../幾何系/LORG/LORG6/index.md#def-lorg6-chronological-causal-future)は、未来向き因果曲線で到達できる集合を記述します。一方、前章の[未来零無限遠 $\mathscr I^+$](../GR28/index.md#def-gr28-infinities)は、光が遠方へ逃げるという極限の終点を表します。これらを組み合わせると、遠方の観測者へ信号を送れる領域を指定できます。

ここでの時空は時間向き付きで漸近的に平坦とし、適切な共形完成の未来零無限遠 $\mathscr I^+$ が定まっていると仮定します。$J^-(\mathscr I^+)$ は、**元の時空内**の未来向き因果曲線を未来の共形境界まで延長できる点の集合です。永遠のKruskal解に左右二つの無限遠がある場合は、両方の $\mathscr I^+$ を対象にします。片側の観測者だけを指定するなら別の相対的な境界になるため、対象とする無限遠を先に固定します。

<a id="def-gr29-event-horizon"></a>

<!-- formal-statement-start -->
> **定義（未来事象地平線）**
> 時間向き付き漸近平坦時空 $(\mathcal M,g)$ に未来零無限遠 $\mathscr I^+$ を持つ共形完成が与えられているとする。ブラックホール領域 $\mathcal B$ と未来事象地平線 $\mathcal H^+$ を次で定義する。境界 $\partial_{\mathcal M}$ は元の時空内で取る。

$$
\boxed{\mathcal B:=\mathcal M\setminus J^-(\mathscr I^+),\qquad
\mathcal H^+:=\partial_{\mathcal M}J^-(\mathscr I^+).}
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr29-event-horizon -->
**定義の確認**。平坦な四次元Minkowski時空全体では、任意の点から未来向きの外向き光線を無限遠まで延ばせます。たとえば $(t_0,r_0)$ から $r(t)=r_0+c(t-t_0)$ を取れば、時間が増すにつれ $r\to\infty$ です。よって $J^-(\mathscr I^+)=\mathcal M$、$\mathcal B$ も $\mathcal H^+$ も空です。他方、[GR27のKruskal未来内部](../GR27/index.md#prop-gr27-causal-radius)では未来向き因果曲線の面積半径が減少し、遠方へ出られません。どちらも「点での曲率値」を判定に使っていないことに注意してください。
<!-- definition-example-end -->

地平線が大域的だというのは単なる言い回しではありません。ある時刻の計量・曲率を局所測定しても、その点から**将来ずっと**脱出できる曲線が存在するかは一般には決まりません。また、[LORG13のCauchy horizon](../../../幾何系/LORG/LORG13/index.md#def-lorg13-cauchy-horizon)は初期集合の依存領域に対する境界です。事象地平線とは定義の集合が異なり、名前に「horizon」が共通しても同一ではありません。

## 2. 二球面の光が広がるか：零膨張率

大域的な未来を知らなくても、ある二球面から出る光がその場で広がるかどうかなら測れます。球対称時空で、面積半径 $r$ の二球面 $S$ の面積は $A=4\pi r^2$ です。時間向きに沿う二つの独立した未来向き零法線のうち、外向きのものを $\ell$、内向きのものを $n$ とし、$g(\ell,n)=-1$ と規格化します。将来に向かう「外向き」は、遠方で半径が増す方向を連続的に選んだラベルであり、強い重力場内で $\ell(r)>0$ と保証する言葉ではありません。

面積要素を $dA_S$ として、その零法線方向の相対変化率を考えます。零法線を定数で倍すればパラメータの進み方が変わるため、膨張率の数値は変わりますが、符号と零かどうかは正の倍率で不変です。

<a id="def-gr29-null-expansion"></a>

<!-- formal-statement-start -->
> **定義（零法線の膨張率）**
> 時間向き付き四次元Lorentz時空の滑らかな閉じた空間的二曲面 $S$ に、未来向き零法線場 $\ell,n$ を $g(\ell,n)=-1$ で選ぶ。各零法線の変形に沿う面積要素の一次変化率を

$$
\boxed{\theta_{(\ell)}:=\frac{\mathcal L_\ell(dA_S)}{dA_S},
\qquad\theta_{(n)}:=\frac{\mathcal L_n(dA_S)}{dA_S}}
$$

> と定める。$\mathcal L$ は面積要素を法線方向へ運ぶLie微分であり、分母は正の面積密度を意味する。$\ell$ を正の関数 $h$ 倍し $n$ を $h^{-1}$ 倍しても、膨張率の零集合と符号は変わらない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr29-null-expansion -->
**定義の確認**。Minkowski時空の球対称部分を $ds^2=-dt^2+dr^2+r^2d\Omega^2$（$t=ct_{\rm physical}$）とします。$\ell=(\partial_t+\partial_r)/\sqrt2$、$n=(\partial_t-\partial_r)/\sqrt2$ はともに未来向きで、直接計算すると $g(\ell,n)=-1$ です。面積密度は $r^2\sin\vartheta$ なので

$$
\theta_{(\ell)}=\frac{\ell(r^2)}{r^2}=\frac{\sqrt2}{r}>0,
\qquad \theta_{(n)}=-\frac{\sqrt2}{r}<0.
$$

これは「外へ出る光は広がり、内へ進む光は収束する」という平坦空間の基準例です。点 $r=0$ では球面が退化するので定義例の領域は $r>0$ としています。
<!-- definition-example-end -->

<a id="prop-gr29-spherical-expansion"></a>

<!-- formal-statement-start -->
> **命題（球対称二球面の零膨張率）**
> 面積半径 $r>0$ を持つ滑らかな球対称四次元時空で、対称性に沿う丸い二球面 $S$ とその未来向き零法線 $k$ を取る。$k$ は角度方向の成分を持たないとする。このとき

$$
\boxed{\theta_{(k)}=\frac{2k(r)}{r}.}
$$

> 特に $h>0$ なら $\theta_{(hk)}=h\theta_{(k)}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

面積密度の $r^2$ のみが零方向への変位で変わるため、微分すれば係数 $2/r$ が出ます。角度座標を固定して面積を計算できるのは球対称性と法線の角度成分ゼロによります。

<!-- proof-start -->
### 証明

球対称二球面の誘導計量は $q_{AB}=r^2\gamma_{AB}$ で、$\gamma$ は単位二球面の計量です。したがって正の面積要素は

$$
dA_S=\sqrt{\det q}\,d\vartheta\,d\varphi
=r^2\sin\vartheta\,d\vartheta\,d\varphi.
$$

角度方向に成分を持たない $k$ に沿って $\vartheta,\varphi$ を保って運ぶと、$k(\sin\vartheta)=0$ です。連鎖律より

$$
\mathcal L_k(dA_S)=k(r^2)\sin\vartheta\,d\vartheta\,d\varphi
=2r\,k(r)\sin\vartheta\,d\vartheta\,d\varphi.
$$

面積密度で割ると $\theta_{(k)}=2k(r)/r$ です。$h$ を滑らかな正の関数とすると $(hk)(r)=h\,k(r)$ であり、同じ式に代入して $\theta_{(hk)}=h\theta_{(k)}$ を得ます。ここでは $k(h)$ の項はありません。零法線の再尺度が引き起こす $h$ の変化は、面積要素に沿う角度方向の発散を追加しないからです。
<!-- proof-end -->

## 3. 捕獲面と見かけの地平線

二方向の膨張率を見れば、「内へ向かう光だけが収束する」通常の球面と、「外へ出ようとする光まで収束する」球面を区別できます。この符号条件は**球面そのものの準局所的な性質**です。一方、見かけの地平線という名称は、ある空間的な時刻切片（葉）を選んだ上で、その葉の中でどこが捕獲領域の外縁かを問うものです。

<a id="def-gr29-trapped-apparent"></a>

<!-- formal-statement-start -->
> **定義（捕獲面・限界外向き捕獲面・見かけの地平線）**
> 時間向き付き四次元時空で、外向き $\ell$ と内向き $n$ の未来向き零法線が定まる滑らかな閉じた空間的二曲面 $S$ を考える。
>
> - **未来捕獲面**：$\theta_{(\ell)}<0$ かつ $\theta_{(n)}<0$ が $S$ 上の各点で成立する面。
> - **限界外向き捕獲面（MOTS）**：$\theta_{(\ell)}=0$ かつ $\theta_{(n)}<0$ が $S$ 上の各点で成立する面。
> - **見かけの地平線**：選んだ空間的切片 $\Sigma$ における未来捕獲領域の外側境界を指す。適切な滑らかさ・外側性の下では、その境界は最外側MOTSで与えられる。これは $\Sigma$ に依存する定義である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr29-trapped-apparent -->
**定義の確認**。球対称の正則な入射座標で $r>a$、$r=a$、$0<r<a$ の丸い二球面を考えます。後で示すように規格化零法線で

$$
\theta_{(\ell)}=\frac1r\left(1-\frac ar\right),
\qquad \theta_{(n)}=-\frac2r
$$

です。よって $r>a$ では両方負ではなく、$r=a$ では $\theta_{(\ell)}=0$・$\theta_{(n)}<0$ となり、$0<r<a$ は未来捕獲面です。ただし $r=a$ の**各二球面がMOTSであること**から、任意の時空・任意の切片でそこが最外側MOTSと結論することはできません。ここでは球対称な丸い二球面を比較する枠組みに限定しています。
<!-- definition-example-end -->

注意すべき区別は三つあります。MOTSは「外向き膨張率が零になる面」、その面を並べた管状の三次元集合は「限界捕獲管」、見かけの地平線は指定した切片の外縁です。一般時空ではこれらを無条件に同義語として使えません。特に時刻切片が変われば、最外側という比較対象自体が変わり得ます。

## 4. Killing地平線：対称性だけで十分か

[GR14のKilling場](../GR14/index.md#def-gr14-killing-field)は、$\mathcal L_\xi g=0$ を満たす時空の連続対称性を表します。静的Schwarzschild外部の時間並進は例ですが、「Killing場の長さが零になる場所」という検査だけでは、そこが地平線かどうかは分かりません。境界が**零超曲面**であり、そのKilling場が法線として働くことが必要です。

ここで超曲面 $F=0$ の法線共変ベクトルは $dF$ です。超曲面が零であるとは、その法線の逆計量による長さ $g^{-1}(dF,dF)$ が零であることをいいます。Killing場 $\xi$ が法線であるとは、計量で添字を下げた $\xi^\flat=g(\xi,\cdot)$ が、その面上で $dF$ に比例することです。

<a id="def-gr29-killing-horizon"></a>

<!-- formal-statement-start -->
> **定義（Killing地平線）**
> 時間向き付きLorentz時空 $(\mathcal M,g)$ にKillingベクトル場 $\xi$ があるとする。滑らかな零超曲面 $\mathcal K$ の正則な部分で、$\xi$ が零ベクトルでなく $\mathcal K$ に法線として接するなら、$\mathcal K$ を $\xi$ のKilling地平線という。このとき $\mathcal K$ 上で

$$
\boxed{g(\xi,\xi)=0,\qquad \xi^\flat\big|_{\mathcal K}=\lambda\,dF\big|_{\mathcal K}}
$$

> が成り立つ。ただし局所的に $\mathcal K=\{F=0\}$、$dF\ne0$、$\lambda\ne0$ とする。Killing場が零になる分岐二球面などは、必要なら正則部分の閉包として扱う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr29-killing-horizon -->
**定義の確認**。[GR26の入射Eddington–Finkelstein計量](../GR26/index.md#prop-gr26-ef-metric-domain)で $F=r-r_s$、$\xi=\partial_v$ を選びます。定数 $r_s>0$ なので $\partial_v g_{\mu\nu}=0$ であり、$\xi$ はKilling場です。$\xi^\flat=-f\,dv+dr$、$f=1-r_s/r$ ですから、$r=r_s$ では $\xi^\flat=dr=dF$。逆計量より $g^{-1}(dF,dF)=f=0$ です。したがって $r=r_s$ の未来側の正則部分はKilling地平線です。$\xi$ 自体はそこで零ベクトルにはなりません。**零になるのはノルム**です。
<!-- definition-example-end -->

## 5. Schwarzschildで三者が一致する理由

以下の計算は単一の外部から未来地平線を横断する入射EF座標を用います。永遠のKruskal最大延長には左右二つの外部と過去の白色穴領域もあるため、ここでの $r=r_s$ はそのうちの**未来事象地平線の正則な片側**を表します。

<a id="prop-gr29-schwarzschild-coincidence"></a>

<!-- formal-statement-start -->
> **命題（Schwarzschildの三種類の地平線の一致）**
> $r_s>0$ が定数の漸近平坦Schwarzschild時空について、入射EF領域の計量を

$$
ds^2=-f(r)\,dv^2+2\,dv\,dr+r^2d\Omega^2,
\qquad f(r)=1-\frac{r_s}{r}
$$

> とする。未来向き零法線を $\ell=\partial_v+(f/2)\partial_r$、$n=-\partial_r$ と選ぶと、丸い二球面の膨張率は

$$
\theta_{(\ell)}=\frac{f}{r},\qquad
\theta_{(n)}=-\frac{2}{r}.
$$

> したがって $r=r_s$ の二球面はMOTS、内側 $0<r<r_s$ の二球面は未来捕獲面である。標準的な球対称切片における最外側の丸いMOTSの位置は $r=r_s$ であり、その未来側は遠方への因果到達で決まる未来事象地平線および $\partial_v$ のKilling地平線と一致する。
<!-- formal-statement-end -->

### 証明の見取り図

零法線の規格化を計算し、[球対称二球面の膨張率公式](#prop-gr29-spherical-expansion)へ $\ell(r),n(r)$ を代入します。事象地平線との一致は、外側の出射光線が無限遠へ進めるのに対し、内側から未来向き因果曲線が半径を増せないという違いによって決まります。Killing地平線の条件は前節の法線計算を使います。

<!-- proof-start -->
### 証明

$(v,r)$ 成分の計量とその逆行列を明示すると

$$
(g_{ab})=\begin{pmatrix}-f&1\\1&0\end{pmatrix},\qquad
(g^{ab})=\begin{pmatrix}0&1\\1&f\end{pmatrix}.
$$

$\ell=(1,f/2)$、$n=(0,-1)$ を代入して

$$
\begin{aligned}
g(\ell,\ell)&=-f+2\cdot\frac f2=0,\\
g(n,n)&=0,\\
g(\ell,n)&=g_{vr}(1)(-1)=-1.
\end{aligned}
$$

いずれも未来向きです。$n$ は入射光線を向きに沿って辿る方向であり、$\ell$ は外部で半径が増加する出射方向から連続的に定めた方向です。$\ell(r)=f/2$、$n(r)=-1$ を[球対称二球面の膨張率公式](#prop-gr29-spherical-expansion)に入れると

$$
\theta_{(\ell)}=\frac{2(f/2)}r=\frac fr,
\qquad \theta_{(n)}=\frac{2(-1)}r=-\frac2r.
$$

$f$ は $r>r_s$ で正、$r=r_s$ で零、$0<r<r_s$ で負なので、主張したMOTSと捕獲面の符号条件を得ます。ここでMOTSの確認に使ったのは**局所的な零膨張率**であり、まだ事象地平線とは呼んでいません。

次に $\ell$ に沿う動径出射光線の式は

$$
\frac{dr}{dv}=\frac12\left(1-\frac{r_s}{r}\right).
$$

$r>r_s$ では右辺が正で、進行中に $r$ は減らず、初期値 $r_0>r_s$ について $r\ge r_0$、したがって $dr/dv\ge(1-r_s/r_0)/2>0$ です。ゆえに $r$ は未来に無限大へ向かい、その出射光線は漸近的な $\mathscr I^+$ へ達します。一方、内側 $r<r_s$ では[GR26の未来向き因果曲線の半径減少](../GR26/index.md#prop-gr26-interior-causality)により光的・時間的のどちらでも未来に半径が増えず、$\mathscr I^+$ へは出られません。境界の零生成子は $r=r_s$ に留まります。したがって対象の未来地平線は $r=r_s$ です。

最後に $\xi=\partial_v$ について計量は $v$ に依存せず、$\xi^\flat=-f\,dv+dr$ です。$F=r-r_s$ の上で $\xi^\flat=dF$、$g^{-1}(dF,dF)=f=0$ となり、[Killing地平線の定義](#def-gr29-killing-horizon)も満たします。三者はそれぞれ別の判定を経て一致しました。
<!-- proof-end -->

この一致から「$g_{vv}=0$ をどの時空でも解けば事象地平線が得られる」と一般化してはいけません。次節では $g_{vv}$ の零点と未来への因果到達が異なるように、**未来の質量変化**を入れます。

## 6. 動的模型：半径が増える限界面と事象地平線

先に比較の射程を固定します。これから使う入射Vaidya模型は、球対称な入射零物質流に対応する時間依存計量です。厳密な物質源と接合の解析は次章以降に譲り、本章では与えられた計量の零光線・二球面・面の法線を直接調べます。$v$ は長さの次元を持ち、$a(v)>0$ は滑らかな非減少関数で、ある有限 $v_1$ 以降は定数 $a_1>0$ とします。$v<v_1$ の変化中も $r>0$ を対象にします。

$$
ds^2=-f(v,r)\,dv^2+2\,dv\,dr+r^2d\Omega^2,
\qquad f(v,r)=1-\frac{a(v)}r.
$$

因果図の終端は $v\ge v_1$ の定常Schwarzschild外部へつなぎ、その未来零無限遠への脱出可否で未来事象地平線を定義するものとします。$r=a(v)$ という式は、まず膨張率が零となる場所の候補です。非定常領域で事象地平線の式として仮定しません。

<a id="prop-gr29-vaidya-separation"></a>

<!-- formal-statement-start -->
> **命題（Vaidyaの限界面と未来事象地平線の分離）**
> 上の入射Vaidya計量で $a\in C^1$、$a>0$、$a'\ge0$、$a(v)=a_1$（$v\ge v_1$）とする。未来向き零法線 $\ell=\partial_v+(f/2)\partial_r$、$n=-\partial_r$ に対して、丸いMOTSは $r=a(v)$ となる。$a'(v)>0$ の区間ではそのMOTSを並べた管は空間的で、$\partial_v$ はKilling場ではない。
>
> 未来事象地平線の出射零生成子を $r=r_E(v)>0$ とし、未来の定常部分との接続条件を $r_E(v_1)=a_1$ とする。存在する正の解について

$$
\boxed{r_E'(v)=\frac12\left(1-\frac{a(v)}{r_E(v)}\right),
\qquad r_E(v)-a(v)=
\int_v^{v_1}a'(s)\exp\left(-\int_v^s\frac{du}{2r_E(u)}\right)ds}
$$

> が成立する。特に $v$ より後の区間 $(v,v_1)$ に $a'>0$ の部分があれば、$r_E(v)>a(v)$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

膨張率が零となる管の半径 $a(v)$ は、その時刻の計量で決まります。しかし事象地平線の出射光線は、**将来のSchwarzschild地平線から逆向きに辿って**位置を決めます。差 $\delta=r_E-a$ の一次線形方程式を解けば、未来の $a'$ が過去の差へ寄与することが積分の形で現れます。

<!-- proof-start -->
### 証明

計量の $(v,r)$ 部分と逆行列は前節と同形で、ただし $f$ は $v$ にも依存します。零法線のノルムと $g(\ell,n)=-1$ は $f$ の微分を使わない代数式なのでそのまま成り立ちます。[球対称二球面の零膨張率公式](#prop-gr29-spherical-expansion)から

$$
\theta_{(\ell)}=\frac fr=\frac{r-a(v)}{r^2},
\qquad \theta_{(n)}=-\frac2r.
$$

$r>0$ かつ $a(v)>0$ より $\theta_{(\ell)}=0$ はちょうど $r=a(v)$ です。管 $F(v,r)=r-a(v)=0$ の法線は $dF=dr-a'(v)dv$ です。逆計量でノルムを計算すると

$$
g^{-1}(dF,dF)=g^{rr}-2a'g^{vr}+(a')^2g^{vv}
=f-2a'.
$$

管の上では $f=0$ なので $g^{-1}(dF,dF)=-2a'<0$ です。法線が時間的なら超曲面は空間的です。したがって $a'>0$ ではこの管は零超曲面ではなく、Killing地平線にもなりません。また $\xi=\partial_v$ について $\mathcal L_\xi g=\partial_v g$ の $vv$ 成分は

$$
(\mathcal L_{\partial_v}g)_{vv}=\partial_v(-1+a(v)/r)=\frac{a'(v)}r\ne0.
$$

よって動的区間の $\partial_v$ はKilling場ではありません。

動径出射方向の $\ell$ は $dv/d\lambda=1$ とパラメータ化すれば $dr/dv=f/2$ です。$\delta(v):=r_E(v)-a(v)$ とおくと、分子を明示して

$$
\delta'=r_E'-a'
=\frac{r_E-a}{2r_E}-a'
=\frac{\delta}{2r_E}-a'.
$$

$q(v):=1/(2r_E(v))$ とし、終端条件 $\delta(v_1)=0$ を使います。積分因子 $I(v)=\exp(-\int_{v_0}^v q(u)du)$ を掛けると

$$
\frac{d}{dv}\bigl(I(v)\delta(v)\bigr)=-I(v)a'(v).
$$

$v$ から $v_1$ まで積分して

$$
-I(v)\delta(v)=-\int_v^{v_1}I(s)a'(s)\,ds,
$$

したがって $I(s)/I(v)=\exp(-\int_v^s q(u)du)$ を代入すれば命題の積分表示が得られます。指数因子は正なので、未来の $a'$ が非負でどこか正なら $\delta(v)>0$ です。これにより外側のMOTSの位置と事象地平線は異なります。
<!-- proof-end -->

**この差の読み方**。$r_E(v)>a(v)$ は「事象地平線の外側から信号が出られない」という意味ではありません。事象地平線の位置の方が大きいので、**MOTSの外側だが事象地平線の内側**の領域が存在し得るという意味です。局所膨張率が正でも、将来の質量流入によって長期的には光が無限遠へ逃げられない場合があります。一方、この計算だけであらゆる葉層の見かけの地平線が $r=a(v)$ と言い切ることはできません。丸い球面の自然な球対称な葉層での判定です。

## 7. もう一つの落とし穴：Killingノルムが零でも地平線ではない

動的模型ではKilling場そのものが失われました。逆に、**平坦な時空にKilling場があって、そのノルムが零になっても地平線ではない**例を作れます。これはKilling地平線の定義で超曲面の零性と法線条件を独立に課した理由を示します。

<a id="prop-gr29-light-cylinder"></a>

<!-- formal-statement-start -->
> **命題（Killingノルム零集合の反例）**
> 四次元Minkowski時空の円柱座標 $(t,r,\varphi,z)$（$r>0$）で

$$
ds^2=-dt^2+dr^2+r^2d\varphi^2+dz^2,
\qquad \xi=\partial_t+\Omega\partial_\varphi,
\qquad\Omega>0
$$

> とする。$\xi$ はKilling場であり、$r=1/\Omega$ では $g(\xi,\xi)=0$ となる。しかし超曲面 $r=1/\Omega$ はKilling地平線ではない。
<!-- formal-statement-end -->

### 証明の見取り図

$\partial_t$ と $\partial_\varphi$ はどちらも計量の座標独立性からKilling場です。ノルムが零になる円柱と、円柱そのものが零超曲面かどうかは、別の検査です。

<!-- proof-start -->
### 証明

計量係数は $t$ と $\varphi$ に依存しないので、[GR14の座標によるKilling判定](../GR14/index.md#prop-gr14-killing-coordinate-test)から $\mathcal L_{\partial_t}g=0$、$\mathcal L_{\partial_\varphi}g=0$ です。一定係数の和 $\xi$ もKilling場です。$g_{t\varphi}=0$ なので

$$
g(\xi,\xi)=g_{tt}+2\Omega g_{t\varphi}+\Omega^2g_{\varphi\varphi}
=-1+\Omega^2r^2.
$$

確かに $r=1/\Omega$ で零ですが、$F=r-1/\Omega$ の法線は $dF=dr$ で、逆計量は $g^{rr}=1$ です。よって

$$
g^{-1}(dF,dF)=1>0.
$$

法線は空間的、超曲面そのものは時間的です。さらに $\xi^\flat=-dt+\Omega r^2d\varphi$ で、$dr$ に比例しません。したがって[Killing地平線の定義](#def-gr29-killing-horizon)の「零超曲面」「法線」の二条件を満たしません。この円柱は回転座標系の光円柱であり、平坦な時空のブラックホール境界ではありません。
<!-- proof-end -->

## 8. 演習：三種の地平線の判定を取り違えない

### Level A：各条件を一つずつ確かめる

<a id="ex-gr29-a01"></a>
#### GR29-A01 二球面の面積変化
- Level: A

球対称の丸い二球面 $S$ の面積が $4\pi r^2$ であり、角度方向に成分を持たない零法線 $k$ が $k(r)=\alpha$ を満たす。$r>0$ として膨張率を導き、$\alpha$ の符号と膨張率の符号を比較せよ。

<!-- solution-start -->
**詳細解答。** 面積要素は $dA=r^2\sin\vartheta\,d\vartheta\,d\varphi$ です。$k$ の角度方向成分は零なので $k(\sin\vartheta)=0$ です。したがって

$$
\mathcal L_k(dA)=k(r^2)\sin\vartheta\,d\vartheta\,d\varphi
=2r\alpha\sin\vartheta\,d\vartheta\,d\varphi.
$$

これを $dA$ で割ると $\theta_{(k)}=2\alpha/r$ です。$2/r>0$ なので膨張率の符号は $\alpha$ の符号と一致します。
<!-- solution-end -->

<a id="ex-gr29-a02"></a>
#### GR29-A02 零法線の規格化変更
- Level: A

$g(\ell,n)=-1$、$\theta_{(\ell)}=3/r$、$\theta_{(n)}=-2/r$ の二球面で、$h=2$ として $\widetilde\ell=h\ell$、$\widetilde n=h^{-1}n$ とする。新しい規格化と膨張率を計算し、MOTS判定が正の再尺度で不変となる理由を述べよ。

<!-- solution-start -->
**詳細解答。** 双線形性により $g(2\ell,n/2)=2(1/2)g(\ell,n)=-1$ です。[球対称二球面の零膨張率](#prop-gr29-spherical-expansion)の再尺度式から

$$
\theta_{(\widetilde\ell)}=2\cdot\frac3r=\frac6r,
\qquad\theta_{(\widetilde n)}=\frac12\left(-\frac2r\right)=-\frac1r.
$$

正数を掛けても零か否かと正負は変わらないので、$\theta_{(\ell)}=0$ かつ $\theta_{(n)}<0$ という条件は不変です。この具体例は $\theta_{(\ell)}>0$ なので、再尺度前後ともMOTSではありません。
<!-- solution-end -->

<a id="ex-gr29-a03"></a>
#### GR29-A03 静的な光線の傾き
- Level: A

$r_s=4$ の入射EF計量について、未来向き出射零光線の $dr/dv$ を $r=3,4,8$ でそれぞれ計算し、その符号が意味することを説明せよ。

<!-- solution-start -->
**詳細解答。** $dr/dv=(1-4/r)/2$ を使います。$r=3$ では $\tfrac12(1-\tfrac43)=-1/6$、$r=4$ では零、$r=8$ では $\tfrac12(1-\tfrac12)=1/4$ です。負は「出射と連続的に定義した未来向き光線ですら半径が減少する」こと、零は地平線上に留まること、正は外部で半径が増加することを表します。符号だけでは光線の全未来を調べたことにはならないため、一般の非定常時空の事象地平線判定に転用してはいけません。
<!-- solution-end -->

<a id="ex-gr29-a04"></a>
#### GR29-A04 Killing場は消えない
- Level: A

$f=1-r_s/r$ の入射EF計量で $\xi=\partial_v$、$F=r-r_s$ とする。$r=r_s$ で $g(\xi,\xi)$ と $\xi^\flat$ を求め、$\xi=0$ かどうかを判定せよ。

<!-- solution-start -->
**詳細解答。** $g(\xi,\xi)=g_{vv}=-f$ ですから地平線上で零です。しかし $\xi$ の $(v,r)$ 成分は $(1,0)$ のままで、零ベクトルではありません。添字を下げると

$$
\xi^\flat=g_{vv}dv+g_{rv}dr=-f\,dv+dr,
$$

$r=r_s$ で $\xi^\flat=dr=dF$ です。$g^{-1}(dF,dF)=g^{rr}=f=0$ も確かめられます。よって「ノルム零」と「ベクトル場零」は異なり、ここではKilling地平線の法線条件まで成立します。
<!-- solution-end -->

<a id="ex-gr29-a05"></a>
#### GR29-A05 捕獲面の三分類
- Level: A

$a>0$ が定数、$\theta_{(\ell)}=(r-a)/r^2$、$\theta_{(n)}=-2/r$ の丸い二球面で、$r=a/2$、$r=a$、$r=2a$ をそれぞれ未来捕獲面、MOTS、どちらでもない面に分類せよ。

<!-- solution-start -->
**詳細解答。** $r=a/2$ では $r-a=-a/2<0$、$r^2>0$ なので $\theta_{(\ell)}<0$、さらに $\theta_{(n)}<0$ で未来捕獲面です。$r=a$ では分子が零で、$\theta_{(n)}=-2/a<0$ だからMOTSです。$r=2a$ では $\theta_{(\ell)}=a/(4a^2)=1/(4a)>0$ となるのでどちらでもありません。半径が正である仮定が符号判定に必要です。
<!-- solution-end -->

### Level B：局所条件と大域条件をつなぐ

<a id="ex-gr29-b01"></a>
#### GR29-B01 Schwarzschildの因果的脱出
- Level: B

$r_s>0$ のSchwarzschild入射EF計量で $r_0>r_s$ からの出射動径零光線が $r\to\infty$ に向かうことを、$dr/dv=(1-r_s/r)/2$ から不等式で示せ。一方 $r_0<r_s$ では未来向き因果曲線による脱出が不可能な理由を既習結果と結び付けよ。

<!-- solution-start -->
**詳細解答。** $r_0>r_s$ では微分方程式の右辺が正です。解は増加するので $r(v)\ge r_0$ が維持され、

$$
\frac{dr}{dv}=\frac12\left(1-\frac{r_s}{r(v)}\right)
\ge\frac12\left(1-\frac{r_s}{r_0}\right)=:b>0.
$$

初期時刻 $v_0$ から積分すると $r(v)\ge r_0+b(v-v_0)$、よって $v\to\infty$ で $r\to\infty$ です。漸近平坦Schwarzschild外部の零光線なので未来零無限遠へ達します。一方内部 $r_0<r_s$ では[GR26の未来向き半径減少](../GR26/index.md#prop-gr26-interior-causality)が任意の未来向き因果曲線へ適用され、半径は増えません。したがって地平線 $r=r_s$ を外側へ越せず、$\mathscr I^+$ へ達しません。この二つの因果判定から境界が $r=r_s$ と決まります。
<!-- solution-end -->

<a id="ex-gr29-b02"></a>
#### GR29-B02 動的な限界捕獲管の符号
- Level: B

入射Vaidya計量 $f(v,r)=1-a(v)/r$ について $a'(v)>0$ の区間で $F=r-a(v)$ を考える。$F=0$ の法線ノルムを求め、管が零・時間的・空間的のどれかを判定せよ。また $a'(v)=0$ と対比せよ。

<!-- solution-start -->
**詳細解答。** $(v,r)$ 部分の逆計量は $g^{vv}=0,g^{vr}=g^{rv}=1,g^{rr}=f$ です。$\partial_vF=-a'$、$\partial_rF=1$ を代入して

$$
g^{ab}\partial_aF\partial_bF
=0\cdot(a')^2+2(1)(-a')(1)+f(1)^2
=f-2a'.
$$

$F=0$ 上では $r=a$ なので $f=0$、ノルムは $-2a'<0$。法線が時間的なので管は空間的です。$a'=0$ なら法線ノルムも零になり管は零超曲面ですが、その**一点の判定だけで**定常性やKilling地平線であることまでは結論できません。
<!-- solution-end -->

<a id="ex-gr29-b03"></a>
#### GR29-B03 回転座標の光円柱
- Level: B

Minkowski円柱座標で $\xi=\partial_t+\Omega\partial_\varphi$、$\Omega>0$ とする。$\xi$ のノルム零集合を求め、その超曲面の法線ノルムと $\xi^\flat$ を計算してKilling地平線でないことを示せ。

<!-- solution-start -->
**詳細解答。** 計量は $-dt^2+dr^2+r^2d\varphi^2+dz^2$ で、$t,\varphi$ に依存しないため $\xi$ はKilling場です。内積は

$$
g(\xi,\xi)=-1+\Omega^2r^2,
$$

したがって $r=1/\Omega$ で零です。しかし $F=r-1/\Omega$ の法線は $dr$ で、そのノルムは $g^{rr}=1$ です。超曲面は零でなく時間的です。さらに $\xi^\flat=-dt+\Omega r^2d\varphi$ は $dr$ の倍数ではありません。ゆえにKilling地平線の必要条件を二つとも満たしません。ノルム零だけでは不十分な理由が具体的に分かります。
<!-- solution-end -->

<a id="ex-gr29-b04"></a>
#### GR29-B04 未来の変化を積分で読む
- Level: B

正の関数 $r_E(v)$ と非減少の $a(v)$ が $r_E'=(1-a/r_E)/2$、$a(v_1)=r_E(v_1)$ を満たすとする。$\delta=r_E-a$ の方程式を立て、終端値から $\delta(v)$ を積分表示せよ。$a'=0$ が $[v,v_1]$ 全体で成立する場合と、どこかで正となる場合を区別せよ。

<!-- solution-start -->
**詳細解答。** まず $r_E-a=\delta$ を右辺の分子に入れると

$$
\delta'=r_E'-a'=\frac{\delta}{2r_E}-a'.
$$

$q=1/(2r_E)$、$I(v)=\exp(-\int_{v_0}^v q(u)du)$ と選び、$I'=-qI$ を用いると

$$
(I\delta)'=I'\delta+I\delta'=-qI\delta+I(q\delta-a')=-Ia'.
$$

$v$ から $v_1$ へ積分し、$\delta(v_1)=0$ を代入します。

$$
\delta(v)=\int_v^{v_1} a'(s)\frac{I(s)}{I(v)}ds
=\int_v^{v_1}a'(s)\exp\left(-\int_v^s\frac{du}{2r_E(u)}\right)ds.
$$

$r_E>0$ なので指数は正です。$a'=0$ が全区間で成立すれば積分は零、連続な $a'\ge0$ が一部で正なら積分は正です。未来の変化が現在の $r_E-a$ を決めていることが式で分かります。
<!-- solution-end -->

### Level C：三つの判定を一つの模型でつなぐ

<a id="ex-gr29-c01"></a>
#### GR29-C01 質量が増える時間帯とその前の事象地平線
- Level: C

入射Vaidya模型で $a_0>0,\Delta>0$ とし、$v$ の長さ単位を固定して $0\le v\le1$ の間だけ

$$
a(v)=a_0+\Delta\left(v-\frac{\sin(2\pi v)}{2\pi}\right)
$$

とし、$v\le0$ では $a=a_0$、$v\ge1$ では $a=a_1:=a_0+\Delta$ とする。次を示せ。

1. $0<v<1$ で $a'>0$、端点では $a'=0$ であり、三つの区間で $a$ は少なくとも $C^1$ でつながる。
2. 各丸い二球面の膨張率からMOTSの位置を求め、$0<v<1$ でその管の因果型と $\partial_v$ がKilling場かどうかを判定する。
3. 未来の定常部分で $r_E(1)=a_1$ と置いた事象地平線を逆向きに辿る。$v=0$ において $r_E(0)>a_0$ を証明し、$v<0$ で質量が一定でも、局所的な零膨張率の位置と事象地平線が異なり得る理由を説明する。

<!-- solution-start -->
**詳細解答。**

**（1）** 区間内で微分すると

$$
a'(v)=\Delta(1-\cos(2\pi v))
=2\Delta\sin^2(\pi v).
$$

$\Delta>0$ なので $0<v<1$ では厳密に正、$v=0,1$ では零です。関数値は $a(0)=a_0$、$a(1)=a_0+\Delta=a_1$ なので外側の定数区間と連続であり、片側微分も零に一致します。よって少なくとも $C^1$ です。

**（2）** 逆計量と零法線から[球対称二球面の零膨張率](#prop-gr29-spherical-expansion)を用い、

$$
\theta_{(\ell)}=\frac{r-a(v)}{r^2},\qquad
\theta_{(n)}=-\frac2r
$$

を得ます。従って $r=a(v)$ の丸い二球面がMOTSです。管 $F=r-a(v)$ の法線ノルムは

$$
g^{-1}(dF,dF)=f-2a',
\qquad\left.g^{-1}(dF,dF)\right|_{F=0}=-2a'<0
$$

であり、$0<v<1$ の管は空間的です。また $\partial_v g_{vv}=a'(v)/r>0$ なので $\partial_v$ はKilling場ではありません。従ってこの管をKilling地平線と同一視できません。

**（3）** 未来の定常部分はSchwarzschild計量で、そこでは事象地平線の出射光線は $r=a_1$ に留まります。$v=1$ の終端から逆向きに解く正の光線 $r_E$ について、[Vaidyaの限界面と未来事象地平線の分離](#prop-gr29-vaidya-separation)により

$$
r_E(0)-a_0
=\int_0^1 2\Delta\sin^2(\pi s)
\exp\left(-\int_0^s\frac{du}{2r_E(u)}\right)ds>0.
$$

被積分関数は $(0,1)$ で正ですから不等号は厳密です。さらに $v<0$ では $a'=0$ ですが、$\delta'=\delta/(2r_E)$ を $v=0$ から逆向きに解くと $\delta(v)>0$ が有限の過去の区間で維持されます。これは局所計量がその時刻に静的でも、**事象地平線を確定する未来全体**は静的でないためです。MOTSの位置 $r=a_0$ はその時刻の面積変化だけで決まりますが、事象地平線は後に来る入射流の情報を反映します。
<!-- solution-end -->

## 9. まとめ：判定の入力を取り違えない

| 種類 | 何から決めるか | 特に必要な条件 | 時間依存で何が起こるか |
| --- | --- | --- | --- |
| 未来事象地平線 | $\partial J^-(\mathscr I^+)$ | 適切な未来無限遠と時空全体の因果構造 | 未来の変化を過去の位置へ反映する |
| MOTS・見かけの地平線 | 二方向の零膨張率、選んだ空間的切片の外縁 | 零法線、外向きの選択、最外側性 | 限界捕獲管は零でなく空間的にもなれる |
| Killing地平線 | Killing場が零超曲面の法線になるか | 実在する対称性と法線条件 | 一般には該当するKilling場がない |

Schwarzschildで半径が一致することは、三つの定義の同値性を意味しません。次章GR30では物質が重力崩壊する具体的な時空を扱い、未来の形成過程と地平線の位置をさらに追います。
