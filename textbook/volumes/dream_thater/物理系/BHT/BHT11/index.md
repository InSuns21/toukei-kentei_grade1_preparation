# BHT11 極限ブラックホールと第三法則

<!-- definition-example-audit: strict -->

[BHT10の質量関数](../BHT10/index.md#thm-bht10-mass-conjugates)では、非極限Kerr–Newmanの温度は状態領域の境界で零へ近づきます。しかし、温度が零ならエントロピーも零でしょうか。さらに、温度が零の解を数式で書けることと、物質を落として有限時間でそこへ到達できることは同じでしょうか。

今回の問いは三つです。**定常解の極限**、**動的過程の到達可能性**、**Euclid幾何の極限**を分け、同じ「極限」という言葉で違う操作を混同しないことです。特に第三法則の到達不能性には歴史的な定式化と、その後に見つかった厳密な反例があります。

以下は4次元、漸近平坦なEinstein–Maxwell理論、宇宙項と磁荷なし、計量符号 $(-,+,+,+)$、自然単位 $G=c=\hbar=k_B=1$ です。定常場の時間Killingベクトルは無限遠で規格化し、$M>0$、$J$、$Q$ はそれぞれ質量、軸角運動量、符号付き電荷とします。面積エントロピーは [BHT9の規格化](../BHT9/index.md#def-bht9-area-normalization) に従い $S=A/4$ と書きます。物理的な量子状態・熱浴の存在は各節で別途区別します。

## 1. 極限とは何が一致する状態か

### 1.1 RN解で根が合体する

[BHT4のReissner–Nordström（RN）地平線](../BHT4/index.md#prop-bht4-rn-data)の外側・内側半径を $r_+,r_-$ とすると、$M>|Q|>0$ で

$$
r_\pm=M\pm\sqrt{M^2-Q^2},\qquad
\kappa=\frac{r_+-r_-}{2r_+^2},\qquad A=4\pi r_+^2.
$$

例えば $Q=2$ を固定し $M=\sqrt{4+\varepsilon^2}$（$\varepsilon>0$）とすると、二つの根の間隔は $2\varepsilon$ です。$\varepsilon\downarrow0$ では二つの根が $r=2$ に合体し、表面重力は零へ近づきますが、球面の面積は $16\pi$ に近づきます。この二重根の状態を最初に定義します。

<a id="def-bht11-extremal-rn"></a>

<!-- formal-statement-start -->
> **定義（RNの極限地平線）**
> 4次元、漸近平坦な $M>0$、$Q\ne0$ のRN定常解族で $M\ge |Q|$ とする。$M=|Q|$、すなわち $M^2-Q^2=0$ で二つの地平線半径が $r_+=r_-=M$ に重なる解を**極限RN解**（extremal RN）と呼ぶ。$M>|Q|$ を非極限と呼ぶ。ここでの極限はパラメータ空間の境界条件であり、ある実時間の物理過程で到達したことを意味しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht11-extremal-rn -->
**定義の確認**：$M=Q=2$ では $M>0$、$Q\ne0$、$M^2-Q^2=0$ が全て成り立ち、$r_+=r_-=2$ です。対して $M=5,Q=3$ では $M^2-Q^2=16>0$、$r_+=9,r_-=1$ で、極限ではありません。単に温度が小さいという数値判定ではなく、根の重複条件で区別しています。
<!-- definition-example-end -->

<a id="prop-bht11-rn-limit"></a>

<!-- formal-statement-start -->
> **命題（RNの固定電荷極限）**
> $Q\ne0$ を固定した4次元RN定常解族で $M>|Q|$、$G=c=\hbar=k_B=1$ とする。$\varepsilon=\sqrt{M^2-Q^2}>0$ と置き、$\varepsilon\downarrow0$ とすると

$$
\begin{aligned}
r_+&=\sqrt{Q^2+\varepsilon^2}+\varepsilon\longrightarrow |Q|,\\
T_H&=\frac{\varepsilon}{2\pi r_+^2}\longrightarrow0,\\
S&=\pi r_+^2\longrightarrow\pi Q^2>0.
\end{aligned}
$$

> これは**非極限状態の温度・面積エントロピーの極限値**であり、極限解を別のEuclid境界値問題として量子計算したときのエントロピーをこの操作だけで一意に決める主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

平方根で二根の間隔を求め、[RNの地平線データ](../BHT4/index.md#prop-bht4-rn-data)と[Hawking温度の規格化](../BHT8/index.md#prop-bht8-normalization)へ順に代入します。分母 $r_+^2$ は正の有限値へ近づくため、温度だけが零になります。

<!-- proof-start -->
### 証明

$M=\sqrt{Q^2+\varepsilon^2}$ を代入すると

$$
r_+-r_-=2\sqrt{M^2-Q^2}=2\varepsilon,
\qquad r_+=M+\varepsilon.
$$

非極限では $T_H=\kappa/(2\pi)$ なので

$$
T_H=\frac{r_+-r_-}{4\pi r_+^2}
=\frac{2\varepsilon}{4\pi(\sqrt{Q^2+\varepsilon^2}+\varepsilon)^2}.
$$

$Q\ne0$ を固定したため、$r_+\to|Q|>0$ で分母は零になりません。面積規格化も

$$
S=\frac{4\pi r_+^2}{4}=\pi r_+^2\longrightarrow\pi Q^2.
$$

したがって $T_H\to0$ と $S\to\pi Q^2>0$ が同時に成立します。
<!-- proof-end -->

この結果は、普通の物質の「絶対零度でエントロピーが零」という覚え方がブラックホールではそのまま通用しないことを示します。逆に、$Q=0$ のSchwarzschildで $M\to\infty$ としても $T_H=(8\pi M)^{-1}\to0$ です。この場合は極限地平線への接近ではなく、質量と面積が発散します。**温度が零に近いことだけでは極限地平線を定義できません。**

### 1.2 回転を含む極限境界

[BHT10の状態領域](../BHT10/index.md#def-bht10-state-coordinates)は、$S>0$ と $S^2>\pi^2(Q^4+4J^2)$ を満たす非極限解で構成されていました。固定した有限の $(J,Q)\ne(0,0)$ でこの不等式が等号へ近づくと何が起こるでしょうか。

<a id="prop-bht11-kn-boundary"></a>

<!-- formal-statement-start -->
> **命題（Kerr–Newmanの極限境界と残留面積）**
> 4次元、$\Lambda=0$、磁荷なしの漸近平坦Kerr–Newman定常解族で、自然単位、$M>0$、$a=J/M$ とする。$M^2=a^2+Q^2$ を極限条件とすると、固定した有限の $(J,Q)\ne(0,0)$ に対し

$$
\boxed{S_{\rm ext}=\pi\sqrt{Q^4+4J^2}>0,\qquad
M_{\rm ext}^2=\frac{Q^2+\sqrt{Q^4+4J^2}}{2}.}
$$

> 非極限状態から同じ $J,Q$ を保ってこの境界へ近づけば、[BHT10の温度関数](../BHT10/index.md#thm-bht10-mass-conjugates)は零へ近づく。$(J,Q)=(0,0)$ の境界点 $M=0$ は正質量ブラックホールとして含めない。
<!-- formal-statement-end -->

### 証明の見取り図

極限で $r_+=M$、$a=J/M$ とするため、$S=\pi(r_+^2+a^2)$ の二つの項を、$M^2=a^2+Q^2$ によって整理します。

<!-- proof-start -->
### 証明

極限条件に $a=J/M$ を入れ $M^2$ を掛けると

$$
M^4-Q^2M^2-J^2=0.
$$

$y=M^2>0$ についての二次方程式 $y^2-Q^2y-J^2=0$ の正の根は

$$
y=\frac{Q^2+\sqrt{Q^4+4J^2}}2.
$$

極限では $r_+=M$ なので

$$
\frac{S}{\pi}=M^2+a^2=2M^2-Q^2
=\sqrt{Q^4+4J^2}.
$$

固定 $J,Q$ で $(J,Q)\ne(0,0)$ なら $S_{\rm ext}>0$、$M_{\rm ext}>0$ です。[BHT10の温度公式](../BHT10/index.md#thm-bht10-mass-conjugates)の分子 $S^2-\pi^2(Q^4+4J^2)$ は零へ、分母 $8\pi MS^2$ は正の有限値へ近づくので、$T_H\to0$ です。
<!-- proof-end -->

**検算**：$Q=0,J=3$ の極限Kerrでは $M_{\rm ext}=\sqrt3$、$S_{\rm ext}=6\pi$。$J=0,Q=2$ の極限RNでは $M_{\rm ext}=2$、$S_{\rm ext}=4\pi$ となり、前節と一致します。

## 2. 温度の零極限と熱力学的第三法則

### 2.1 「第三法則」には同じでない主張がある

普通の熱力学でよく用いる二つの言い方を、先に別の要請として整理します。Nernst型の主張は、**制御パラメータの違いによる低温エントロピー差**が消えるというものです。到達不能型の主張は、**有限回・有限時間の許された操作で絶対零度へ到達できない**というものです。一般にこの二つを同値とするには、状態空間と実行できる操作に関する追加の仮定が要ります。

<a id="def-bht11-third-law-forms"></a>

<!-- formal-statement-start -->
> **定義（第三法則の二つの表現を区別する）**
> 熱力学系の平衡状態を $T>0$ と外部制御パラメータ $\lambda$ で記述し、各固定 $\lambda$ の $T\downarrow0$ 極限が存在すると仮定する。
>
> **（N）Nernst型の要請**：任意の許された $\lambda_1,\lambda_2$ について、$S(T,\lambda_1)-S(T,\lambda_2)\to0$ とする（より強い「残留エントロピー零」はさらに別の要請）。
>
> **（U）到達不能型の要請**：指定した物理的に許される有限時間の操作のクラスから始めた $T>0$ の系が、有限時間で厳密に $T=0$ の平衡状態へ移れないとする。
>
> （N）は平衡状態の**値の極限**、（U）は選んだ物理過程の**存在・非存在**に関する主張であり、定義だけから一方は他方を導かない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht11-third-law-forms -->
**定義の確認**：RNを固定電荷 $Q=1$ と $Q=2$ の二つの系列として比べると、[固定電荷極限](#prop-bht11-rn-limit)から $S_{\rm ext}(1)=\pi$、$S_{\rm ext}(2)=4\pi$ です。したがって低温のエントロピー差は $-3\pi$ に近づき、（N）はこの状態族に無条件には成立しません。一方、二つの定常解が数式上存在することだけでは、どちらかへの有限時間の物理過程の可否（U）は判定できません。
<!-- definition-example-end -->

**「第三法則が破れる」の意味を固定する**：極限RN/Kerrの有限面積は、強い「$S\to0$」を直ちに否定し、$Q$ や $J$ を変えたNernst型の一様な残留値にも反例になります。ただし電荷・角運動量が異なる状態を同じ熱力学的操作で比較できるかは別途検討が必要です。さらに、量子微視状態の縮退を論じることと古典面積の極限を求めることも同じ計算ではありません。

### 2.2 低温でも熱容量が必ず発散するわけではない

RNで $Q>0$ を固定し、外側半径 $r=r_+>Q$ を座標にします。地平線根の積 $r_+r_-=Q^2$、和 $r_++r_-=2M$ により

$$
M(r,Q)=\frac{r^2+Q^2}{2r},\quad
T_H(r,Q)=\frac{r^2-Q^2}{4\pi r^3},\quad S(r)=\pi r^2.
$$

<a id="prop-bht11-fixed-charge-response"></a>

<!-- formal-statement-start -->
> **命題（RNの固定電荷熱容量と低温展開）**
> 4次元の非極限RN定常解で自然単位、$Q>0$ 固定、$r=r_+>Q$ とする。$r\ne\sqrt3 Q$ では、固定電荷の微分応答 $C_Q=(\partial M/\partial T_H)_Q$ は

$$
\boxed{C_Q=\frac{2\pi r^2(r^2-Q^2)}{3Q^2-r^2}.}
$$

> 特に $r\downarrow Q$ では $C_Q\to0^+$。さらに $T_H\downarrow0$ に沿って

$$
\boxed{\begin{aligned}
S&=\pi Q^2+4\pi^2Q^3T_H+O(T_H^2),\\
M&=Q+2\pi^2Q^3T_H^2+O(T_H^3).
\end{aligned}}
$$

> これらは**固定電荷の非極限定常解族に沿った**応答と漸近展開であり、時刻依存の冷却速度を与えない。
<!-- formal-statement-end -->

### 証明の見取り図

$r$ による二つの微分の比を取ります。その後 $r=Q+\delta$、$\delta\downarrow0$ とおいて先頭項を求め、$T_H$ へ逆代入します。

<!-- proof-start -->
### 証明

固定 $Q$ のもとで微分すると

$$
\frac{dM}{dr}=\frac12-\frac{Q^2}{2r^2}
=\frac{r^2-Q^2}{2r^2},\qquad
\frac{dT_H}{dr}=\frac1{4\pi}\left(-r^{-2}+3Q^2r^{-4}\right)
=\frac{3Q^2-r^2}{4\pi r^4}.
$$

$r\ne\sqrt3Q$ で後者は非零だから、連鎖律により

$$
C_Q=\frac{dM/dr}{dT_H/dr}
=\frac{(r^2-Q^2)/(2r^2)}{(3Q^2-r^2)/(4\pi r^4)}
=\frac{2\pi r^2(r^2-Q^2)}{3Q^2-r^2}.
$$

$r=Q+\delta$ を代入すると

$$
T_H=\frac{2Q\delta+\delta^2}{4\pi(Q+\delta)^3}
=\frac{\delta}{2\pi Q^2}+O(\delta^2),
\quad
\delta=2\pi Q^2T_H+O(T_H^2).
$$

したがって

$$
\begin{aligned}
S&=\pi(Q+\delta)^2
=\pi Q^2+2\pi Q\delta+O(\delta^2)
=\pi Q^2+4\pi^2Q^3T_H+O(T_H^2),\\
M-Q&=\frac{(r-Q)^2}{2r}
=\frac{\delta^2}{2Q}+O(\delta^3)
=2\pi^2Q^3T_H^2+O(T_H^3).
\end{aligned}
$$

また $C_Q$ の分子は $r\downarrow Q$ で正の零に、分母は $2Q^2>0$ に近づくので $C_Q\to0^+$ です。
<!-- proof-end -->

固定電荷なら極限近傍の $C_Q$ は正ですが、これは「放射を含む全系が安定」「有限時間では到達不能」のどちらも証明しません。熱容量は平衡解族の**偏微分**です。状態が実際にどんな速度で移るかには流束・境界条件・逆作用を与える運動方程式が必要です。

## 3. 力学的な第三法則はどうなったか

### 3.1 到達不能性を定理とみなす際の条件

[BHT6の物理過程版第一法則](../BHT6/index.md#thm-bht6-physical-process-first-law)は、**非極限の**定常背景を微小摂動させ、将来再び定常に落ち着くなどの仮定から求めた一次式です。$\kappa\to0$ にすると、面積変化を求める際に現れる $1/\kappa$ と、一次近似で捨てた高次項の扱いが変わります。したがってこの式だけから「極限化できない」と証明するのは循環的です。

1986年のWerner Israelの[第三法則の定式化と証明](https://doi.org/10.1103/PhysRevLett.57.397)は、見掛けの地平線近傍で流入物質の応力エネルギーテンソルが有界で弱エネルギー条件を満たす連続過程を扱い、有限の進行時間（advanced time）で表面重力を零にできないと主張しました。進行時間は地平線上で用いる未来向きの時間座標であり、熱力学の「有限回操作」とそのまま等しいわけではありません。

しかし、この一般的な到達不能命題は現在では無条件に使えません。

<a id="thm-bht11-kehle-unger"></a>

<!-- formal-statement-start -->
> **定理（Kehle–Ungerによる有限進行時間での極限形成：外部結果）**
> 4次元Einstein–Maxwell系に荷電質量零スカラー場を結合した球対称重力崩壊では、正則で一端を持つ漸近平坦初期データから出発し、見掛けの地平線が以前の時刻にはSchwarzschildのものと一致し、事象地平線に沿う**有限の進行時間以降**は外部が厳密に極限RN解に等長となる解が存在する。よって「正則な古典的崩壊なら有限進行時間で極限状態を形成しない」という一般的到達不能命題は偽である。
<!-- formal-statement-end -->

この結果は [Kehle–Unger, *Gravitational collapse to extremal black holes and the third law of black hole thermodynamics*（JEMS, 2025）](https://doi.org/10.4171/JEMS/1591) の大規模な時空構成定理を**参照結果として使う**ものです。証明は特性初期値面における接合と非摂動的なスカラー場パルス構成を必要とし、本章内で再証明しません。ここで証明するのはこの定理の帰結の論理的な読み方です。

重要なのは、**事象地平線と見掛けの地平線は同じ対象ではない**ことです。[BHT3の面積議論](../BHT3/index.md#prop-bht3-area-rigidity)で学んだ大域的な事象地平線と、各時刻のトラップ面で定義する見掛けの地平線では、時間方向の振舞いが異なり得ます。後の数学的検討では、Israelの議論に見掛けの地平線の連結性について暗黙の仮定があったことが指摘されています（[極限ブラックホールの安定性に関する総説](https://doi.org/10.1007/s10714-025-03394-1)）。

その一方、物質の局所エネルギーと電荷の分布を結び付ける追加制約（**局所的な質量・電荷不等式**）を仮定する別の理論では、有限時間に極限RN地平線を作れないことが証明されています（[Reall, *Third law of black hole mechanics for supersymmetric black holes and a quasilocal mass-charge inequality*](https://doi.org/10.1103/PhysRevD.110.124059)）。この不等式の厳密な形は引用した模型固有の仮定であり、任意の物質に自動で成立するものではありません。従って「到達不能性には成立する模型がある」と「どんな物質に対しても成り立つ」は別の主張です。

### 3.2 何を主張できて、何を主張できないか

| 論点 | 本章で確定すること | そこからは従わないこと |
| --- | --- | --- |
| 極限RN/Kerr–Newman定常解 | $\kappa=0$、固定有限電荷・角運動量で面積は有限正 | その解へ特定の実時間過程で到達できるか |
| 非極限状態の $T_H\downarrow0$ | 固定 $J,Q$ で $S\to S_{\rm ext}>0$ | 厳密な極限解のEuclid経路積分の答えが一意 |
| Nernst型 | $Q$・$J$ の違いに応じた残留面積が異なる | 運動方程式の有限時間到達可能性 |
| Israel型の一般命題 | 歴史的な追加仮定付きの主張として読める | 現在の全Einstein–Maxwell物質系で普遍的に真 |
| Kehle–Unger構成 | 特定の正則荷電物質モデルに有限時間極限形成の実例がある | すべての初期条件・物質・量子蒸発でも形成する |

古典的な反例があることは、極限解の量子場の状態選択や蒸発終状態を決定しません。また、形式的なパラメータ極限を動的な「冷却の所要時間」に読み替えることもできません。

## 4. Euclid幾何ではなぜ極限の順序が効くか

次回のBHT12では非極限地平線近傍をEuclid化して周期を固定します。ここでは計量の最小模型だけを使い、なぜ**非極限を先にEuclid化する場合**と**極限解を先に作る場合**で円錐の滑らかさの条件が変わるかを先取りして確かめます。

RNの静的外部領域 $r>r_+$ の計量は、[RNの幾何](../BHT4/index.md#def-bht4-rn-family)により

$$
ds^2=-f(r)dt^2+f(r)^{-1}dr^2+r^2d\Omega_2^2,
\quad f(r)=\left(1-\frac{r_+}{r}\right)\left(1-\frac{r_-}{r}\right).
$$

$d\Omega_2^2$ は単位二球面の計量です。形式的なEuclid時間 $\tau$ を $t=-i\tau$ で導入すると、時間・半径の2次元部分は $f(r)d\tau^2+f(r)^{-1}dr^2$ になります。これは半古典的な熱平衡状態を自動的に構成する操作ではありません。

<a id="prop-bht11-euclidean-order"></a>

<!-- formal-statement-start -->
> **命題（非極限と極限で変わるEuclid正則性条件）**
> 4次元RNの外部静的領域で $f(r)=(1-r_+/r)(1-r_-/r)$ とし、計量の時間・半径部分を $ds_E^2=f(r)d\tau^2+f(r)^{-1}dr^2$ とする。
>
> **（1）非極限**：$r_+>r_-$ なら、地平線にEuclid座標の円板の中心を滑らかに加えるには、時間座標 $\tau$ の周期を次に固定する必要がある。

$$
\beta=\frac{2\pi}{\kappa},\qquad \kappa=\frac{r_+-r_-}{2r_+^2}>0.
$$
>
> **（2）厳密な極限**：$r_+=r_-=Q>0$ では、計量関数は次の二重零点を持つ。

$$
f(r)=\left(1-\frac Qr\right)^2.
$$

> 外部から $r=Q$ への固有動径距離は無限大となるため、有限距離の極座標原点はなく、円錐の滑らかさは $\tau$ の周期を固定しない。
>
> この二つを交換可能な操作とみなして $\beta$、熱力学的エントロピー、量子状態を同一視してはならない。
<!-- formal-statement-end -->

### 証明の見取り図

非極限では $f$ が単純零点なので地平線からの距離の平方根が極座標半径になります。一方、極限の $f$ は二重零点なので $1/\sqrt f$ が $1/(r-Q)$ のように発散し、地平線は無限のど元に移ります。

<!-- proof-start -->
### 証明

非極限では

$$
f'(r_+)=\frac{r_+-r_-}{r_+^2}=2\kappa,
\qquad f(r)=2\kappa(r-r_+)+O((r-r_+)^2).
$$

$x=r-r_+>0$ として $\rho=\sqrt{2x/\kappa}$ と置けば $x=\kappa\rho^2/2$、$dx=\kappa\rho\,d\rho$ なので

$$
\begin{aligned}
f(r)d\tau^2&=\kappa^2\rho^2d\tau^2+O(\rho^4)d\tau^2,\\
f(r)^{-1}dr^2&=\frac{(\kappa\rho)^2}{\kappa^2\rho^2+O(\rho^4)}d\rho^2
=(1+O(\rho^2))d\rho^2.
\end{aligned}
$$

従って先頭の2次元計量は $d\rho^2+\rho^2d(\kappa\tau)^2$ です。滑らかな円板の中心とするには角度 $\kappa\tau$ が $2\pi$ 周期となり、$\beta=2\pi/\kappa$ を得ます。

厳密な極限では $f(r)=(r-Q)^2/r^2$ です。外部領域 $Q<r_0<r_1$ の動径線の固有距離は

$$
L(r_0,r_1)=\int_{r_0}^{r_1}\frac{dr}{\sqrt{f(r)}}
=\int_{r_0}^{r_1}\frac{r}{r-Q}\,dr
=(r_1-r_0)+Q\log\frac{r_1-Q}{r_0-Q}.
$$

$r_0\downarrow Q$ で対数項は発散します。よって $r=Q$ は円錐中心として加える有限距離の点ではなく、前半の周期固定の論拠が失われます。これは周期が物理的に任意の熱温度を許すという意味ではありません。
<!-- proof-end -->

非極限解では円周が半径零で縮む**円板型の端**を持ちますが、厳密な極限解のEuclid時間円周は無限に延びるのどの先へ退きます。この局所幾何の違いは、後続の作用計算や境界項・経路積分の取り方に影響します。**$S=A/4$ を零へ置換する結論は幾何の計算だけからは出ません。** 面積極限の $S_{\rm ext}$ と「厳密な極限Euclidサドルから何を定義するか」を同一視しないでください。

## 5. 演習――極限の種類を自分で判定する

### Level A：根・面積・残留値・距離

<a id="ex-bht11-a01"></a>

#### BHT11-A01 非極限RNの数値判定

- Level: A
- 問題: 自然単位、RNの $M=5,Q=3$ に対し $r_+,r_-,\kappa,T_H,S$ を計算し、極限か判定せよ。

<!-- solution-start -->
**詳細解答**：[RNの地平線データ](../BHT4/index.md#prop-bht4-rn-data)を使うと

$$
\sqrt{M^2-Q^2}=\sqrt{25-9}=4,\quad r_+=9,\quad r_-=1.
$$

従って

$$
\kappa=\frac{9-1}{2\cdot9^2}=\frac4{81},\quad
T_H=\frac\kappa{2\pi}=\frac2{81\pi},\quad
S=\frac{4\pi\cdot9^2}{4}=81\pi.
$$

$M^2-Q^2=16>0$ で根が重ならないので非極限です。
<!-- solution-end -->

<a id="ex-bht11-a02"></a>

#### BHT11-A02 有限面積をもつ零温度極限

- Level: A
- 問題: $Q=2$ 固定、$M=\sqrt{4+\varepsilon^2}$（$\varepsilon>0$）というRN解列で $r_+,T_H,S$ を $\varepsilon$ で表し、$\varepsilon\downarrow0$ の極限を求めよ。

<!-- solution-start -->
**詳細解答**：根の判別式は $M^2-Q^2=\varepsilon^2$ であり $\varepsilon>0$ なので平方根は $\varepsilon$。よって

$$
r_+=\sqrt{4+\varepsilon^2}+\varepsilon,
\quad T_H=\frac{2\varepsilon}{4\pi r_+^2}
=\frac{\varepsilon}{2\pi(\sqrt{4+\varepsilon^2}+\varepsilon)^2},
$$

$$
S=\pi(\sqrt{4+\varepsilon^2}+\varepsilon)^2.
$$

$r_+\to2$ なので $T_H\to0$、$S\to4\pi$ です。エントロピーが零へ向かうとは結論できません。
<!-- solution-end -->

<a id="ex-bht11-a03"></a>

#### BHT11-A03 回転だけの極限エントロピー

- Level: A
- 問題: Kerr–Newmanの極限条件 $M^2=(J/M)^2+Q^2$ で $Q=0,J=3$ とする。$M_{\rm ext}$ と $S_{\rm ext}=\pi(M^2+(J/M)^2)$ を求めよ。

<!-- solution-start -->
**詳細解答**：$Q=0$ なら $M^4=J^2=9$、正質量なので $M^2=3$、$M=\sqrt3$。また $a^2=(J/M)^2=9/3=3$ で

$$
S_{\rm ext}=\pi(M^2+a^2)=\pi(3+3)=6\pi.
$$

角運動量を固定した境界で面積が有限正に残ります。
<!-- solution-end -->

<a id="ex-bht11-a04"></a>

#### BHT11-A04 厳密な極限ののどの距離

- Level: A
- 問題: 極限RNの $Q=2$、$f(r)=(1-2/r)^2$、$r>2$ とする。$2+\delta$ から $3$ までの外部Euclid動径距離を求め、$\delta\downarrow0$ を判定せよ（$0<\delta<1$）。

<!-- solution-start -->
**詳細解答**：外部では $\sqrt f=(r-2)/r$。ゆえに

$$
L=\int_{2+\delta}^3\frac{dr}{\sqrt f}
=\int_{2+\delta}^3\left(1+\frac2{r-2}\right)dr
=1-\delta+2\log\frac1\delta.
$$

$\log(1/\delta)\to+\infty$ より $L\to+\infty$。有限距離の円板中心という前提が失われます。
<!-- solution-end -->

<a id="ex-bht11-a05"></a>

#### BHT11-A05 Nernst型の検査

- Level: A
- 問題: 非極限RNをそれぞれ $Q=1$ と $Q=2$ に固定して $T_H\downarrow0$ とする。面積エントロピーの極限差を計算し、[Nernst型](#def-bht11-third-law-forms)の要請を判定せよ。

<!-- solution-start -->
**詳細解答**：[RNの固定電荷極限](#prop-bht11-rn-limit)より

$$
\lim_{T_H\downarrow0}S(T_H,1)=\pi,
\quad\lim_{T_H\downarrow0}S(T_H,2)=4\pi.
$$

従って差の極限は $\pi-4\pi=-3\pi\ne0$。この二つの固定電荷分枝を許す状態空間で、同じ残留値を要求するNernst型の主張は成り立ちません。有限時間でどちらへ到達できるかは別問題です。
<!-- solution-end -->

### Level B：平衡微分・力学・Euclid化の区別

<a id="ex-bht11-b01"></a>

#### BHT11-B01 熱容量の符号と極限

- Level: B
- 問題: 非極限RNで $Q>0$ 固定、$r=r_+>Q$ とする。$M=(r^2+Q^2)/(2r)$、$T_H=(r^2-Q^2)/(4\pi r^3)$ から $C_Q=(\partial M/\partial T_H)_Q$ を導き、$Q<r<\sqrt3Q$ と $r>\sqrt3Q$ の符号、$r\downarrow Q$ での値を調べよ。

<!-- solution-start -->
**詳細解答**：$Q$ を定数とした $r$ 微分は

$$
M'=\frac12-\frac{Q^2}{2r^2}=\frac{r^2-Q^2}{2r^2},
\quad T_H'=\frac{-r^2+3Q^2}{4\pi r^4}.
$$

$r\ne\sqrt3Q$ では

$$
C_Q=\frac{M'}{T_H'}
=\frac{2\pi r^2(r^2-Q^2)}{3Q^2-r^2}.
$$

$r>Q$ では分子が正なので $Q<r<\sqrt3Q$ で正、$r>\sqrt3Q$ で負、$r=\sqrt3Q$ では $T_H'=0$ で微分比が発散して有限値として定義できません。$r\downarrow Q$ では分母が $2Q^2>0$、分子が零へ向かうため $C_Q\to0^+$。これは平衡応答であり実際の放射速度を意味しません。
<!-- solution-end -->

<a id="ex-bht11-b02"></a>

#### BHT11-B02 低温での質量とエントロピーの次数

- Level: B
- 問題: $Q>0$ 固定のRNで $r=Q+\delta$（$\delta>0$）とする。$T_H$ の一次展開から $\delta$ を $T_H$ の一次式へ戻し、$M-Q$ と $S-\pi Q^2$ の先頭項が温度の何次か導け。

<!-- solution-start -->
**詳細解答**：出発点は

$$
T_H=\frac{(Q+\delta)^2-Q^2}{4\pi(Q+\delta)^3}
=\frac{2Q\delta+\delta^2}{4\pi(Q+\delta)^3}.
$$

分母の先頭項は $4\pi Q^3$ なので $T_H=\delta/(2\pi Q^2)+O(\delta^2)$、よって $\delta=2\pi Q^2T_H+O(T_H^2)$。また

$$
M-Q=\frac{(r-Q)^2}{2r}=\frac{\delta^2}{2Q}+O(\delta^3)
=2\pi^2Q^3T_H^2+O(T_H^3),
$$

$$
S-\pi Q^2=\pi(2Q\delta+\delta^2)
=4\pi^2Q^3T_H+O(T_H^2).
$$

したがって $M-Q$ は二次、$S-\pi Q^2$ は一次。$dM=T_HdS$ の次数とも一致します。
<!-- solution-end -->

<a id="ex-bht11-b03"></a>

#### BHT11-B03 Euclidの二通りの順序

- Level: B
- 問題: RNの $f(r)=(1-r_+/r)(1-r_-/r)$ を考える。まず $r_+>r_-$ で地平線の単純零点を展開した場合の $\tau$ 周期を求め、その後 $r_+-r_-\to0$ を考えよ。次に最初から $r_+=r_-=Q>0$ とした場合に同じ周期固定が導けない理由を、動径距離で示せ。

<!-- solution-start -->
**詳細解答**：非極限では $f'(r_+)=(r_+-r_-)/r_+^2=2\kappa>0$ なので $f(r)=2\kappa(r-r_+)+O((r-r_+)^2)$。$\rho^2=2(r-r_+)/\kappa$ により2次元計量は先頭で $d\rho^2+\kappa^2\rho^2d\tau^2$。円板中心の滑らかさから $\kappa\beta=2\pi$、すなわち

$$
\beta=\frac{2\pi}{\kappa}=\frac{4\pi r_+^2}{r_+-r_-}\longrightarrow+\infty.
$$

厳密な極限では $f(r)=(r-Q)^2/r^2$ です。$r_0\downarrow Q$ とすると

$$
\int_{r_0}^{r_1}f^{-1/2}\,dr
=(r_1-r_0)+Q\log\frac{r_1-Q}{r_0-Q}\longrightarrow+\infty.
$$

したがって有限距離の原点を消す円錐正則性の条件がありません。「$\beta\to\infty$」と「厳密極限の幾何だけでは $\beta$ が固定されない」は論理的に異なります。
<!-- solution-end -->

<a id="ex-bht11-b04"></a>

#### BHT11-B04 第一法則だけで有限時間を結論できるか

- Level: B
- 問題: 非極限RNの一次関係 $dM=(\kappa/8\pi)dA+\Phi_HdQ$ を仮定し、$\kappa>0$ で $dA$ を解け。$\kappa\to0$ の極限でこの式だけから「有限時間到達は不可能」と言えない理由を、少なくとも二つ挙げよ。

<!-- solution-start -->
**詳細解答**：[RNの第一法則](../BHT4/index.md#thm-bht4-rn-first-law)を移項すると

$$
\frac\kappa{8\pi}dA=dM-\Phi_HdQ,
\qquad dA=\frac{8\pi}{\kappa}(dM-\Phi_HdQ)
$$

です。第一に $\kappa\to0$ では分母が零へ向かい、同時に分子がどう縮むかの情報がないため、一律に発散とも有限とも結論できません。第二にこの式は定常解族間の微分、また[物理過程版](../BHT6/index.md#thm-bht6-physical-process-first-law)では非極限背景の線形近似に基づくもので、地平線近傍の応力や高次摂動、時間依存を別途指定しません。第三に $dM,dQ$ はパラメータ変化であり、時間積分や所要時間の式ではありません。よって到達不能性の証明にはならず、[有限時間の反例](#thm-bht11-kehle-unger)とも矛盾しません。
<!-- solution-end -->

### Level C：固定電荷極限を三つの見方で照合する

<a id="ex-bht11-c01"></a>

#### BHT11-C01 低温応答・第三法則・Euclid正則性の総合

- Level: C
- 問題: 自然単位のRNを $Q=2$ 固定、$r_+=2+\delta$（$\delta>0$）で表す。根の積・和 $r_+r_-=Q^2$、$r_++r_-=2M$ と面積規格化 $S=\pi r_+^2$ を用いる。
  1. $M,T_H,S$ を $\delta$ で表し、$\delta\downarrow0$ の極限と先頭の温度次数を求めよ。
  2. 固定電荷熱容量 $C_Q$ を求め、極限の符号と大きさを判定せよ。
  3. 厳密な $\delta=0$ の外部Euclid計量で $r=2$ への動径距離を検査し、非極限の $\beta$ を単純に代入することの問題を述べよ。
  4. この計算からNernst型と有限時間到達不能型にそれぞれ何が言えるか、[Kehle–Ungerの結果](#thm-bht11-kehle-unger)も使って区別せよ。

<!-- solution-start -->
**詳細解答**：

**1.** $r=r_+=2+\delta$ とし、根の積から $r_-=4/r$。従って

$$
M=\frac12\left(r+\frac4r\right)=\frac{r^2+4}{2r}
=2+\frac{\delta^2}{2(2+\delta)},
$$

$$
T_H=\frac{r-r_-}{4\pi r^2}
=\frac{r^2-4}{4\pi r^3}
=\frac{4\delta+\delta^2}{4\pi(2+\delta)^3},
\qquad S=\pi(2+\delta)^2.
$$

分母は $4\pi\cdot8$ に近づくので

$$
T_H=\frac{\delta}{8\pi}+O(\delta^2),
\quad \delta=8\pi T_H+O(T_H^2),
$$

$$
M=2+\frac{\delta^2}{4}+O(\delta^3)
=2+16\pi^2T_H^2+O(T_H^3),
$$

$$
S=4\pi+4\pi\delta+\pi\delta^2
=4\pi+32\pi^2T_H+O(T_H^2).
$$

ゆえに $T_H\to0$、$M\to2$、$S\to4\pi>0$ で、質量差は二次、エントロピー差は一次です。

**2.** $Q=2$ とした [固定電荷熱容量の公式](#prop-bht11-fixed-charge-response)を確認すると

$$
\frac{dM}{dr}=\frac{r^2-4}{2r^2},\quad
\frac{dT_H}{dr}=\frac{12-r^2}{4\pi r^4},\quad
C_Q=\frac{2\pi r^2(r^2-4)}{12-r^2}.
$$

$r\downarrow2$ で分子は正の零へ、分母は $8>0$ へ近づくので $C_Q\to0^+$。$dM/dT_H=32\pi^2T_H+O(T_H^2)$ とも一致します。

**3.** $\delta=0$ で $M=Q=2$、$f(r)=(1-2/r)^2$。$2+\eta$ から $3$ までの固有動径距離は

$$
\int_{2+\eta}^3\frac{r}{r-2}\,dr
=1-\eta+2\log(1/\eta)\to+\infty.
$$

非極限では $\beta=1/T_H\to\infty$ ですが、厳密な極限では有限距離の円錐原点がなく、幾何の滑らかさだけでは $\beta$ を一意に固定しません。「温度極限」と「極限後の正則性」は別です。

**4.** $Q=2$ の面積エントロピー極限 $4\pi$ は、少なくとも強い $S\to0$ を満たしません。Nernst型の比較には別の電荷値も必要で、例えば $Q=1$ との極限差は $3\pi\ne0$ です。ただしこの平衡状態の計算は時間依存の解を構成しません。有限時間の一般的到達不能性はRNの一変数極限からは導けず、実際、特定の荷電スカラー場模型に有限進行時間での厳密な極限形成が存在します。すべての物質模型に同じ経路があるという結論も出ません。
<!-- solution-end -->

## 6. 次の講義へ

零温度へ近づける計算と、厳密な極限解の幾何が別であると分かりました。次の **BHT12「Euclid周期性と円錐正則性」** では、一般の非極限静的地平線でなぜ周期が $2\pi/\kappa$ に固定されるかを、座標変換・欠損角・温度の意味から詳しく導きます。
