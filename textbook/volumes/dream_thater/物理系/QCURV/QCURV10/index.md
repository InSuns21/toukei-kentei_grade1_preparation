# QCURV10 崩壊時空のin/out光線と波束

<!-- definition-example-audit: strict -->

[QCURV9の指数的なKruskal座標](../QCURV9/index.md#thm-qcurv9-compression)は、**永遠の**Schwarzschild外部にある二つの座標の関係でした。それだけでは、崩壊前に入ってきた光が、崩壊後のどの時刻に届くのか分かりません。ここでは実際に物質の殻を横切る光線を追い、過去の入射時刻と未来の出射時刻を結びます。

中心問いは「**地平線を作る崩壊は、過去の光線の間隔を未来のどのような間隔へ写し、それを量子場のin/out波束の位相へどう渡すか**」です。前半で古典的な光線追跡を完結させ、後半で波束を定義します。正負周波数を混ぜるFourier積分、Hawking粒子数と温度は次の段階で計算します。

4次元の球対称、計量符号 $(-,+,+,+)$、自然単位 $G=c=\hbar=k_B=1$ を使います。$M>0$ は長さの次元を持つ質量パラメータです。角度を固定した動径零光線について幾何光学近似を用い、まず球面上の散乱障壁と角運動量依存性を無視します。この仮定は**波の完全な解**を得たという意味ではありません。

## 1. 入ってきた光と出ていく光を別の無限遠で測る

[GR26の出射・入射零時刻](../../GR/GR26/index.md#def-gr26-null-times)を使うと、遠方の出射光は $u=t-r_*$、入射光は $v=t+r_*$ がそれぞれ一定です。過去へ十分遠い入射光の出発点を**過去零無限遠** $\mathscr I^-$、未来へ逃げる出射光の到達先を**未来零無限遠** $\mathscr I^+$ と表します。これらは無限に遠い光的方向の境界であり、星の表面や地平線ではありません。

過去の遠方で、入射光線を $v_{\rm in}\in\mathbb R$ とラベル付けし、未来の遠方で出射光線を $u_{\rm out}\in\mathbb R$ とラベル付けします。両方の時刻は遠方での平坦時空の時計に合わせて正規化し、後で同じ光線を追った結果を比較します。

<a id="def-qcurv10-ray-map"></a>

<!-- formal-statement-start -->
> **定義（崩壊光線の入出射写像）**
> 球対称の漸近平坦な崩壊時空で、$\mathscr I^-$ から来た各動径零光線が、正則な中心で向きを変え、$\mathscr I^+$ へ一意に逃げる範囲を考える。その光線の過去の入射零時刻を $v_{\rm in}$、未来の出射零時刻を $u$ とし、対応を

$$
v_{\rm in}=p(u),\qquad u=q(v_{\rm in})=p^{-1}(v_{\rm in})
$$

> と書く。$p$ の定義域は**実際に脱出する出射光線の時刻**、値域は**実際に脱出する入射光線の時刻**とする。以下の模型では両写像は狭義単調で逆を持つ。ここでの $p$ は粒子の運動量ではなく、光線のラベルを結ぶ関数である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv10-ray-map -->
### 直接例：殻がない平坦時空ならどうなるか

平坦時空で未来向きの入射光が正則な中心 $r=0$ を通って再び出射する場合、$V=T+r$ は入射側で一定、$U=T-r$ は出射側で一定です。中心では $U=V=T$ なので、同じ光線について $u=U=V=v_{\rm in}$。したがって $p(u)=u$、$q(v)=v$ です。両ラベルの定義域・値域は全実数、導関数は $p'(u)=1>0$ で、逆写像も存在します。殻が加わるとこの直線の対応が曲がります。

**定義の確認**：過去から未来へ通過する各光線に一意の対応があり、全実数上の単調性と逆写像の存在を直接確かめました。
<!-- definition-example-end -->

### どの周波数が「正」なのか

[QCURV3のBogoliubov変換の定義](../QCURV3/index.md#def-qcurv3-bogoliubov)では、モードの正負を指定した時間に関して区別しました。ここでは入射側で $e^{-i\omega'v}$（$\omega'>0$）を正周波数、出射側で $e^{-i\omega u}$（$\omega>0$）を正周波数とします。$\omega',\omega$ はそれぞれ遠方で測る角周波数で、同じ数と仮定しません。これは $\mathscr I^-$ 上の **in** と $\mathscr I^+$ 上の **out** を識別する規約です。未来地平線へ落ちるモードも存在するため、$\mathscr I^+$ の出射モードだけで全解空間が完備になるとは主張しません。

## 2. 入射する薄殻を横切る光線を追う

光線追跡を完全に計算するため、半径方向へ光速で落ち込む薄い球殻を考えます。殻が通過する入射零時刻を $v=v_0$ とし、その**内側**はMinkowski、**外側**は質量 $M$ のSchwarzschildとします。殻の前後で連続に使える面積半径 $r$ と入射EF時刻 $v$ を取り、分布的な殻を含む理想化した計量を

$$
ds^2=-\left(1-\frac{2m(v)}r\right)dv^2+2\,dv\,dr+r^2d\Omega^2,
\qquad m(v)=\begin{cases}0&(v<v_0),\\M&(v>v_0)\end{cases}
$$

とします。$v=v_0$ の薄殻そのものでは係数が跳びますが、殻の各側の滑らかな領域で零光線を解いて接続します。内側では $v=T+r$、出射零時刻を $U=T-r$ と置き、外側では[QCURV9のtortoise座標](../QCURV9/index.md#thm-qcurv9-compression)に現れる

$$
r_*(r)=r+2M\log\left(\frac r{2M}-1\right),\qquad
u=v-2r_*(r)\quad(r>2M)
$$

を使います。$u$ は無限遠の静的時刻から決まる出射ラベルです。殻が事象地平線を形成する場合、後から入射したすべての光が再び遠方へ届くわけではありません。

<a id="def-qcurv10-shell-parameters"></a>

<!-- formal-statement-start -->
> **定義（殻との交差半径と最後の脱出入射時刻）**
> 内側がMinkowski、外側が質量 $M>0$ のSchwarzschildとなる入射薄殻 $v=v_0$ の模型を考える。過去零無限遠から時刻 $v_{\rm in}<v_0$ に入った動径零光線が、正則な中心を通って出射し、殻と交差する半径を $r_c$ とする。最後に脱出できる光線の**臨界入射時刻** $v_H$ と、その手前の正の時刻差 $\delta$ を

$$
v_H:=v_0-4M,\qquad \delta:=v_H-v_{\rm in}>0
$$

> と定める。この $\delta>0$ は脱出する光線に対して課す条件である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv10-shell-parameters -->
### 直接例：殻を $r=4M$ で横切る

内側では中心で $U=V=v_{\rm in}$。殻 $v=v_0$ との交点は $U=v_0-2r_c$ なので $r_c=(v_0-v_{\rm in})/2$ です。$v_{\rm in}=v_0-8M=v_H-4M$ なら $r_c=4M>2M$、$\delta=4M>0$。外側の脱出領域にあり、下で得る写像は $u=v_{\rm in}$ と実際に検算できます。一方 $v_{\rm in}=v_H$ は $r_c=2M$ で地平線の境界、そこからの出射光線は有限の $u$ で $\mathscr I^+$ に届きません。

**定義の確認**：入射時刻が殻より前である条件、正の $\delta$、正の半径と $r_c>2M$、脱出不能になる境界を順に確かめました。
<!-- definition-example-end -->

<a id="thm-qcurv10-shell-tracing"></a>

<!-- formal-statement-start -->
> **定理（薄殻崩壊の厳密な入出射光線写像）**
> 内側Minkowski・外側Schwarzschild（質量 $M>0$）の入射薄殻 $v=v_0$ で、$v_{\rm in}<v_H=v_0-4M$ の光線が内側の正則中心を通り、殻を一度横切って外部へ脱出するものとする。交差半径は $r_c=(v_0-v_{\rm in})/2>2M$ であり、出射時刻 $u$ は

$$
\boxed{u=q(v_{\rm in})=v_{\rm in}-4M\log\frac{v_H-v_{\rm in}}{4M}.}
$$

> これは $(-\infty,v_H)$ から $\mathbb R$ への狭義単調な全単射で、導関数は

$$
\boxed{\frac{du}{dv_{\rm in}}=1+\frac{4M}{v_H-v_{\rm in}}>0.}
$$

> $v_{\rm in}\uparrow v_H$ では $u\to+\infty$。$v_{\rm in}=v_H$ の限界光線とそれより後で殻の内側 $r\le2M$ を通る光線は、この脱出写像の定義域に入らない。
<!-- formal-statement-end -->

### 証明の見取り図

平坦な殻内部では中心で入射時刻と出射時刻が等しくなります。殻との交点で面積半径を合わせ、その点から外部の $u=v-2r_*(r)$ に代入すれば写像が決まります。最後に定義域と単調性を微分で確認します。

<!-- proof-start -->
### 証明

内側の未来向き入射動径零光線上では $V=T+r=v_{\rm in}$、中心 $r=0$ で $T=v_{\rm in}$ です。中心から出射する同じ光線は $U=T-r=v_{\rm in}$ を保ちます。殻では $V=v_0$ でもあるので、$U=V-2r_c$ を解けば

$$
v_{\rm in}=v_0-2r_c,\qquad r_c=\frac{v_0-v_{\rm in}}2.
$$

外側の脱出条件 $r_c>2M$ は $v_0-v_{\rm in}>4M$、すなわち $v_{\rm in}<v_H$ と同値です。殻との交点 $v=v_0,r=r_c$ から外部の出射零光線に沿って一定の $u$ は

$$
\begin{aligned}
u&=v_0-2r_*(r_c)\\
&=v_0-2r_c-4M\log\left(\frac{r_c}{2M}-1\right)\\
&=v_{\rm in}-4M\log\left(\frac{v_0-v_{\rm in}-4M}{4M}\right)\\
&=v_{\rm in}-4M\log\frac{v_H-v_{\rm in}}{4M}.
\end{aligned}
$$

対数の引数は $v_{\rm in}<v_H$ により正です。微分すれば $du/dv_{\rm in}=1+4M/(v_H-v_{\rm in})>0$。$v_{\rm in}\to-\infty$ では線形項が負の無限大、対数項も負の無限大になるので $u\to-\infty$。$v_{\rm in}\uparrow v_H$ では対数が $-\infty$ となり $u\to+\infty$。連続性・狭義単調性により全単射です。境界 $r_c=2M$ は[GR29のSchwarzschild地平線](../../GR/GR29/index.md#prop-gr29-schwarzschild-coincidence)の出射境界であり、後の光線を有限時刻の出射光として扱えません。$\square$
<!-- proof-end -->

この模型の写像は[QCURV9のKruskal座標変換](../QCURV9/index.md#thm-qcurv9-compression)とは違います。後者は一つの静的外部における $u\mapsto U$、前者は**殻の内側から外側まで接続して** $v_{\rm in}\mapsto u$ を求めたものです。同じ指数の係数が現れる理由を次に調べます。

## 3. 遅い時刻に指数則が生まれる

臨界光線より少し早い入射時刻を $v_{\rm in}=v_H-\delta$ と書きます。定理の式を $\delta$ に直すと

$$
u=v_H-\delta-4M\log\frac\delta{4M}.
$$

ここで[QCURV9の無限遠規格化の表面重力](../QCURV9/index.md#prop-qcurv9-kappa) $\kappa=1/(4M)>0$ を用います。$\delta$ が小さいと、線形項より対数項が強く大きな $u$ を作ります。

<a id="thm-qcurv10-late-exponential"></a>

<!-- formal-statement-start -->
> **定理（遅い出射時刻と入射ラベルの指数関係）**
> 内側Minkowski・外側Schwarzschild（質量 $M>0$）の入射薄殻 $v=v_0$ で、正則中心を通る脱出光線を考える。$\kappa=1/(4M)$、$v_H=v_0-4M$ とすると、逆写像 $p(u)=v_{\rm in}$ は $u\to+\infty$ において

$$
\boxed{v_H-p(u)=4M e^{-\kappa(u-v_H)}
+O\!\left(4M e^{-2\kappa(u-v_H)}\right).}
$$

> したがって $A:=4M e^{\kappa v_H}>0$（長さの次元）と置けば、遅い時刻で

$$
\boxed{p(u)=v_H-Ae^{-\kappa u}+O(e^{-2\kappa u})}
$$

> と表せる。最後の $O$ の係数には長さの次元を含み、$M,v_0$ を固定した極限を意味する。また局所の周波数伸張率は

$$
\frac{du}{dv_{\rm in}}=1+\frac{4M}{v_H-v_{\rm in}}
\longrightarrow+\infty
$$

> である。温度・粒子数の主張はこの幾何学的結論に含まれない。
<!-- formal-statement-end -->

### 証明の見取り図

$x:=\delta/(4M)$、$y:=e^{-\kappa(u-v_H)}$ と無次元化すると $y=xe^x$ になります。$x$ が0へ近づくとき $e^x=1+x+O(x^2)$ なので、$x$ を $y$ で解けば $x=y+O(y^2)$。これが指数則の出所です。

<!-- proof-start -->
### 証明

定理の厳密式へ $v_{\rm in}=v_H-\delta$ を代入して、$u-v_H=-\delta-4M\log(\delta/(4M))$。$x=\delta/(4M)>0$ で割ると

$$
-\kappa(u-v_H)=x+\log x,\qquad
y:=e^{-\kappa(u-v_H)}=xe^x.
$$

$u\to+\infty$ では $y\to0^+$。$xe^x\ge x$（$x>0$）なので $0<x\le y\to0$、したがって展開 $e^x=1+x+O(x^2)$ が使えます。さらに

$$
y-x=x(e^x-1)=x^2+O(x^3),\qquad
0\le y-x=O(y^2)
$$

であり、$x=y+O(y^2)$。元に戻して

$$
\delta=4Mx=4M e^{-\kappa(u-v_H)}
+O\!\left(4M e^{-2\kappa(u-v_H)}\right).
$$

$e^{-\kappa(u-v_H)}=e^{\kappa v_H}e^{-\kappa u}$ とまとめれば $A$ の表示を得ます。導関数の極限は厳密写像の $du/dv_{\rm in}=1+4M/\delta$ から従います。$\square$
<!-- proof-end -->

**数値の形の確認**：$u-v_H=4M\log 100$ なら $y=1/100$ です。$x=ye^{-x}$ より $0<x<0.01$ で、$x=0.01+O(10^{-4})$。ゆえに $v_H-v_{\rm in}\simeq0.04M$ です。出射時刻が $4M\log100$ 遅くなると、脱出できる入射時刻の残り幅はおよそ100分の1へ圧縮されます。

### 他の崩壊模型でも使えるための条件

薄殻でない滑らかな崩壊では、光線の入出射対応を再び解く必要があります。ただし地平線近くの正則な出射ラベル $U$ から過去の入射ラベルへの対応が滑らかなら、指数の**形**は保たれます。これは仮定付きの命題であり、どんな時空でも自動的に成立する定理ではありません。

<a id="prop-qcurv10-smooth-transfer"></a>

<!-- formal-statement-start -->
> **命題（正則な接続による指数則の移送）**
> $\kappa>0$、$U(u)=-e^{-\kappa u}$ とする。$U=0$ の近傍で二回連続微分可能な光線接続関数 $F$ が存在し、入射時刻が $p(u)=F(U(u))$ で表され、$F(0)=v_H$、$F'(0)=a>0$ とする。このとき $u\to+\infty$ で

$$
\boxed{v_H-p(u)=a e^{-\kappa u}+O(e^{-2\kappa u}).}
$$

> この結論は関数 $F$ の正則性・単調な向き・係数 $\kappa$ を**仮定した条件付き結果**であり、地平線形成や光線接続の滑らかさ自体を証明するものではない。
<!-- formal-statement-end -->

### 証明の見取り図

地平線を表す $U=0$ で、$F$ の一次Taylor展開を行い、$U=-e^{-\kappa u}$ を代入します。

<!-- proof-start -->
### 証明

$F$ は $U=0$ の近傍で $C^2$ なので、Taylorの定理を点 $0$、評価点 $U$、次数 $1$ に適用すると

$$
F(U)=F(0)+F'(0)U+\frac12F''(\theta U)U^2
=v_H+aU+O(U^2)
$$

となります（$0<\theta<1$、二階導関数は局所有界）。$U=-e^{-\kappa u}$ を代入すれば $p(u)=v_H-ae^{-\kappa u}+O(e^{-2\kappa u})$。$a>0$ だから $u$ を大きくすると $p(u)$ は $v_H$ に下から近づきます。$\square$
<!-- proof-end -->

**条件を落とした反例**：$F(U)=v_H-(-U)^2$（$U\le0$）は $F'(0)=0$ なので、このとき $v_H-p(u)=e^{-2\kappa u}$ となり指数の係数は $2\kappa$ です。「滑らかなら常に $\kappa$」ではなく、**一次係数が正で消えない**ことが必要です。薄殻模型は独立に厳密計算した例であり、上の $F$ の正則性を無条件の崩壊定理として転用していません。

## 4. 光線の写像を量子場のin/out波束へ渡す

今までの光線は古典的な零軌道です。量子場の各モードは位相を持つので、その**光線に沿う位相**を比較します。[QCURV3の波束粒子数の定義](../QCURV3/index.md#def-qcurv3-wavepacket-hs)を崩壊時空の入出射時刻に適用します。散乱障壁を無視した動径幾何光学部分では、遠方の出射モード $e^{-i\omega u}$ を過去へ追うと、脱出側の入射時刻 $v<v_H$ で $e^{-i\omega q(v)}$ の形になります。ただしこれは位相の近似であり、完全な4次元Klein–Gordon解の等式ではありません。中心での反射に伴う全体符号は周波数混合の比には影響しません。

<a id="def-qcurv10-asymptotic-packets"></a>

<!-- formal-statement-start -->
> **定義（入出射正周波数モードと出射波束）**
> 幾何光学の動径成分を1+1次元の遠方で規格化し、過去零無限遠のin基底、未来零無限遠のout基底の位相をそれぞれ

$$
f^{\rm in}_{\omega'}(v)=\frac{e^{-i\omega'v}}{\sqrt{4\pi\omega'}},\qquad
f^{\rm out}_{\omega}(u)=\frac{e^{-i\omega u}}{\sqrt{4\pi\omega}}
\qquad(\omega',\omega>0)
$$

> とする。幅 $\epsilon>0$、周波数帯番号 $j\ge1$（整数）、到着時刻番号 $n\in\mathbb Z$ に対し、規格化した出射波束を

$$
\boxed{f^{\rm out}_{jn}(u)=\frac1{\sqrt\epsilon}
\int_{j\epsilon}^{(j+1)\epsilon}
e^{2\pi i\omega n/\epsilon}f^{\rm out}_{\omega}(u)\,d\omega.}
$$

> 正周波数の帯域内で一様重みとし、$j\ge1$ によって $\omega=0$ を避ける。この規格化は1+1次元の零無限遠におけるKG流束内積のものであり、角度方向の分解や4次元の動径振幅を含む完全モードの規格化とは区別する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv10-asymptotic-packets -->
### 直接例：同じ周波数帯の二つの到着時刻

$j=1$ とし $n=0,1$ を比べます。両者は $\epsilon\le\omega\le2\epsilon$ の**正**周波数だけを持ち、係数の絶対値は帯域内で $1/\sqrt\epsilon$ です。交差内積の周波数積分は

$$
\frac1\epsilon\int_\epsilon^{2\epsilon}
e^{2\pi i\omega(1-0)/\epsilon}\,d\omega
=\left[\frac{e^{2\pi i\omega/\epsilon}}{2\pi i}\right]_\epsilon^{2\epsilon}=0.
$$

同じ $n$ なら積分は $\epsilon/\epsilon=1$。正周波数・帯域・内積・整数ラベルが規格化の全条件を満たすことを確認できます。

**定義の確認**：周波数下限の正値、帯域幅、各波束の単位内積と異なる到着ラベルの直交性まで、定義で要求した条件を計算しました。
<!-- definition-example-end -->

<a id="prop-qcurv10-packet-localization"></a>

<!-- formal-statement-start -->
> **命題（波束の直交性と到着時刻の中心）**
> 上記の $f^{\rm out}_{jn}$ を未来零無限遠のKG流束で比較し、連続基底が $(f^{\rm out}_\omega,f^{\rm out}_{\omega'})=\delta(\omega-\omega')$ と規格化されているとする。このとき

$$
\boxed{(f^{\rm out}_{jn},f^{\rm out}_{j'n'})
=\delta_{jj'}\delta_{nn'}.}
$$

> また周波数帯が十分狭く $\epsilon\ll j\epsilon$ のとき、位相がそろう到着時刻の中心は $u_n=2\pi n/\epsilon$ で、広がりの尺度は $O(1/\epsilon)$ である。$u_n\to+\infty$ の波束を過去へ追えば、幾何光学上の中心入射ラベルは

$$
p(u_n)=v_H-Ae^{-\kappa u_n}+O(e^{-2\kappa u_n})
$$

> へ近づく。誤差項の係数は固定した模型の長さスケールを含む。
<!-- formal-statement-end -->

### 証明の見取り図

連続基底のデルタ規格化で二重積分を一重積分に戻し、同じ周波数帯なら複素指数の整数周期性を使います。波束の位相は $e^{-i\omega(u-2\pi n/\epsilon)}$ なので、その差が0付近で干渉が強まります。

<!-- proof-start -->
### 証明

二つの周波数帯が重ならないなら、デルタ規格化から内積は0です。$j=j'$ の場合は

$$
\begin{aligned}
(f_{jn},f_{jn'})
&=\frac1\epsilon\int_{j\epsilon}^{(j+1)\epsilon}
e^{2\pi i\omega(n'-n)/\epsilon}\,d\omega\\
&=\begin{cases}1&(n'=n),\\
\displaystyle\frac{e^{2\pi i(j+1)(n'-n)}-e^{2\pi ij(n'-n)}}{2\pi i(n'-n)}=0&(n'\ne n).
\end{cases}
\end{aligned}
$$

指数の両端は整数 $j,n,n'$ によりどちらも1です。波束の積分核は $e^{-i\omega(u-u_n)}/\sqrt{4\pi\omega}$ で、$\omega^{-1/2}$ が帯域内でゆっくり変わる $\epsilon\ll j\epsilon$ なら、主な干渉幅は逆帯域幅 $1/\epsilon$ です（厳密にコンパクトな時間的台を持つわけではありません）。最後の入射ラベルは[本章の遅い時刻の定理](#thm-qcurv10-late-exponential)へ $u=u_n$ を代入して得ます。$\square$
<!-- proof-end -->

**何をまだ計算していないか**：$e^{-i\omega q(v)}$ は一般に $v$ の単一の正周波数ではないため、[QCURV3の正負混合](../QCURV3/index.md#def-qcurv3-bogoliubov)を調べる必要があります。ただし $\mathscr I^+$ 上の $f^{\rm out}_{jn}$ の直交性から直ちにin真空中の粒子数は出ません。$\mathscr I^-$ でのFourier係数、地平線へ落ちるモード、波束の有限な規格化、散乱障壁を順に検討して初めて遠方の粒子流束へ進めます。未来側の波束をそのまま古典的な光線の束と同一視しないことも重要です。

## 5. 近似を外したら何が変わるか

| 入力・近似 | 今回確かめたこと | 後の計算で残ること |
| --- | --- | --- |
| 内側平坦・外側Schwarzschildの入射薄殻 | 殻交差で厳密に $v_{\rm in}\leftrightarrow u$ を接続 | 滑らかな物質崩壊での正則接続の吟味 |
| $r_c>2M$ の脱出光線 | 最後の脱出入射時刻 $v_H$ の存在と単調性 | 地平線へ落ちるモードの完全な境界データ |
| $u\to+\infty$ | $v_H-p(u)$ の指数漸近と係数 $\kappa$ | 有限時刻の過渡項、Fourier積分と波束化 |
| 動径幾何光学、散乱障壁なし | 位相の追跡と正周波数帯の波束構成 | 4次元の灰色体因子、角運動量と動径散乱 |

地平線ができない崩壊、零測地線が単調な写像を持たない配置、正則接続の一次係数が零になる模型には、ここで得た指数則を無条件に当てはめられません。指数関係の導出は**量子状態の熱性の導出より一段手前**です。

## 演習

### Level A：殻の交点・定義域・位相を確認する

<a id="ex-qcurv10-a01"></a>
#### QCURV10-A01 殻の交差半径

- Level: A
- 問題: $M>0$、殻が $v=v_0$ を通る薄殻模型で、$v_{\rm in}=v_0-10M$ の入射光線が正則中心を通って出射する。殻との交差半径 $r_c$、$v_H=v_0-4M$、$\delta=v_H-v_{\rm in}$ を計算し、脱出の幾何学的条件を確認せよ。

<!-- solution-start -->
**詳細解答**：内側の出射線は $U=v_{\rm in}$、殻では $U=v_0-2r_c$。したがって $r_c=(v_0-v_{\rm in})/2=10M/2=5M$ です。$v_H=v_0-4M$、$\delta=(v_0-4M)-(v_0-10M)=6M>0$。交差半径は $5M>2M$ でSchwarzschild外部にあり、外向き零光線として $\mathscr I^+$ へ脱出します。負の $\delta$ を対数へ入れることは許されません。
<!-- solution-end -->

<a id="ex-qcurv10-a02"></a>
#### QCURV10-A02 対数写像の一例

- Level: A
- 問題: 脱出光線が $v_{\rm in}=v_H-4M$ を通るとき、厳密写像から $u$ と $du/dv_{\rm in}$ を求めよ。$M>0$ とする。

<!-- solution-start -->
**詳細解答**：$\delta=v_H-v_{\rm in}=4M$ なので対数の引数は $\delta/(4M)=1$、$\log1=0$。よって $u=v_{\rm in}-4M\log1=v_H-4M$。導関数は $1+4M/\delta=1+1=2>0$。この点でも入射と出射の時刻差そのものは0ですが、近傍の微小時間差の比は2であり、写像が恒等写像という意味ではありません。
<!-- solution-end -->

<a id="ex-qcurv10-a03"></a>
#### QCURV10-A03 近地平線の導関数

- Level: A
- 問題: $\delta=v_H-v_{\rm in}>0$ とする。$u=v_H-\delta-4M\log(\delta/(4M))$ を $\delta$ で微分し、これから $du/dv_{\rm in}$ の符号と極限を求めよ。

<!-- solution-start -->
**詳細解答**：$du/d\delta=-1-4M/\delta<0$。一方 $d\delta/dv_{\rm in}=-1$ なので連鎖律で $du/dv_{\rm in}=(-1-4M/\delta)(-1)=1+4M/\delta>0$。$\delta\downarrow0$ では $4M/\delta\to+\infty$。臨界に近い微小な入射差が大きな出射時刻差になるという意味で、光が遠方で無限のエネルギーを持つという結論ではありません。
<!-- solution-end -->

<a id="ex-qcurv10-a04"></a>
#### QCURV10-A04 正周波数と到着時刻

- Level: A
- 問題: $\epsilon>0$、$j=2$、$n=3$ として、出射波束に使う周波数帯、中心到着時刻 $u_n$、積分核の位相を答えよ。$\omega$ は出射側の正の角周波数とする。

<!-- solution-start -->
**詳細解答**：帯域は $[2\epsilon,3\epsilon]$ で、下端は正です。中心は $u_n=2\pi n/\epsilon=6\pi/\epsilon$。重みとモードを掛けると $e^{2\pi i\omega n/\epsilon}e^{-i\omega u}=e^{-i\omega(u-6\pi/\epsilon)}$。従って $u=6\pi/\epsilon$ で帯域内の位相が揃います。$u_n$ は時間、$\epsilon$ は逆時間の次元を持ちます。
<!-- solution-end -->

### Level B：指数近似と写像の条件を検算する

<a id="ex-qcurv10-b01"></a>
#### QCURV10-B01 逆写像の微分

- Level: B
- 問題: 脱出光線について $\delta=v_H-v_{\rm in}>0$、$q'(v_{\rm in})=1+4M/\delta$ とする。逆写像 $p(u)$ の導関数を $\delta$ で表し、$u\to+\infty$ で $p'(u)/(\kappa\delta)$ の極限を求めよ。ただし $\kappa=1/(4M)$。

<!-- solution-start -->
**詳細解答**：正の $q'$ があるため逆関数定理を使えます。$p'(u)=1/q'(p(u))=1/(1+4M/\delta)=\delta/(\delta+4M)$。一方 $\kappa\delta=\delta/(4M)$ なので比は

$$
\frac{p'(u)}{\kappa\delta}
=\frac{\delta}{\delta+4M}\frac{4M}{\delta}
=\frac{4M}{4M+\delta}\longrightarrow1
$$

です。$u\to+\infty$ は厳密写像により $\delta\downarrow0$ と同値です。従って $p'(u)\sim\kappa\delta\sim\kappa Ae^{-\kappa u}$ で、未来に遅い波束ほど過去の狭い入射時刻帯に対応します。
<!-- solution-end -->

<a id="ex-qcurv10-b02"></a>
#### QCURV10-B02 指数則の二次項

- Level: B
- 問題: $x>0$ が $y=xe^x$ を満たし、$y\downarrow0$ とする。$x=y-y^2+O(y^3)$ を導き、薄殻模型の $\delta=v_H-p(u)$ の二次近似を書け。ただし $y=e^{-\kappa(u-v_H)}$。

<!-- solution-start -->
**詳細解答**：$x=O(y)$ は $x\le y$ より従います。Taylor展開を代入すると $y=x+x^2+O(x^3)$。まず $x=y+O(y^2)$ なので $x^2=y^2+O(y^3)$。元の式から

$$
x=y-x^2+O(x^3)=y-y^2+O(y^3).
$$

したがって $\delta=4Mx=4M[y-y^2+O(y^3)]$。一次近似より $4My^2$ だけ小さく、上からの評価 $x\le y$ とも整合します。$y$ は無次元、全体の $\delta$ は長さの次元です。
<!-- solution-end -->

<a id="ex-qcurv10-b03"></a>
#### QCURV10-B03 接続の一次係数が消えるとき

- Level: B
- 問題: $U=-e^{-\kappa u}$、$F(U)=v_H+cU^3$（$c>0,\kappa>0$）とするとき、$p(u)=F(U(u))$ の $v_H-p(u)$ を計算せよ。$F'(0)>0$ を必要とする[命題](#prop-qcurv10-smooth-transfer)を適用できるか、理由を述べよ。

<!-- solution-start -->
**詳細解答**：$U^3=(-e^{-\kappa u})^3=-e^{-3\kappa u}$ なので $p(u)=v_H-ce^{-3\kappa u}$、従って $v_H-p(u)=ce^{-3\kappa u}>0$。$F'(U)=3cU^2$、特に $F'(0)=0$ です。命題の正の一次係数という仮定が破れており、指数の減衰係数は $\kappa$ ではなく $3\kappa$ です。滑らかな関数だけであれば主張が成り立つという誤用を防ぐ例です。
<!-- solution-end -->

<a id="ex-qcurv10-b04"></a>
#### QCURV10-B04 波束の内積を積分で求める

- Level: B
- 問題: 連続出射モードが $\delta(\omega-\omega')$ 規格化され、$\epsilon>0$、$j=2$ とする。$f_{2,n}$ と $f_{2,n+2}$ の内積を積分で求めよ。また同じ $n$ で帯番号 $j=2$ と $j'=3$ の内積も求めよ。

<!-- solution-start -->
**詳細解答**：同じ帯では定義を代入して、$n'-n=2$ より

$$
(f_{2,n},f_{2,n+2})
=\frac1\epsilon\int_{2\epsilon}^{3\epsilon}
e^{4\pi i\omega/\epsilon}\,d\omega
=\left[\frac{e^{4\pi i\omega/\epsilon}}{4\pi i}\right]_{2\epsilon}^{3\epsilon}
=\frac{e^{12\pi i}-e^{8\pi i}}{4\pi i}=0.
$$

異なる帯の内部は $[2\epsilon,3\epsilon]$ と $[3\epsilon,4\epsilon]$ です。共通点は端点一つのみで積分上の測度は0、したがってデルタ規格化で交差内積も0です。どちらも単一周波数を取り出した結果ではありません。
<!-- solution-end -->

### Level C：崩壊光線から後期波束まで一つにつなぐ

<a id="ex-qcurv10-c01"></a>
#### QCURV10-C01 崩壊の光線対応と量子計算の境界

- Level: C
- 問題: 入射薄殻模型 $m(v)=M\Theta(v-v_0)$、$M>0$ に対し、中心で反射して出る光を考える。$v_H=v_0-4M$ とし、次を導け。

  1. $v_{\rm in}<v_H$ での交差半径 $r_c$ と厳密な $u=q(v_{\rm in})$。
  2. $u\to+\infty$ での $v_H-p(u)$ の第一主要項と $p'(u)$ の第一主要項。
  3. $\epsilon>0$、$j\ge1$、$n\in\mathbb Z$ の出射波束の定義、中心到着時刻 $u_n$ と過去に対応する中心 $p(u_n)$。
  4. この結果だけではin真空のout粒子数も、灰色体因子を含む遠方流束も求まらない理由を述べよ。

<!-- solution-start -->
**詳細解答**：

(1) 内部で $V=v_{\rm in}$、中心通過後の出射線で $U=v_{\rm in}$、殻上で $V=v_0$ です。$U=V-2r_c$ より $r_c=(v_0-v_{\rm in})/2$。条件 $v_{\rm in}<v_H=v_0-4M$ は $r_c>2M$ と同値です。外部の $r_*(r)=r+2M\log(r/(2M)-1)$ に交差半径を入れて

$$
\begin{aligned}
u&=v_0-2r_*(r_c)\\
&=v_0-(v_0-v_{\rm in})
-4M\log\frac{v_0-v_{\rm in}-4M}{4M}\\
&=v_{\rm in}-4M\log\frac{v_H-v_{\rm in}}{4M}.
\end{aligned}
$$

(2) $\delta=v_H-v_{\rm in}>0$、$x=\delta/(4M)$、$\kappa=1/(4M)$ と置くと $u-v_H=-4M(x+\log x)$。ゆえに $y=e^{-\kappa(u-v_H)}=xe^x$ です。$u\to\infty$ で $y\to0$、$x\le y$ から $x=y+O(y^2)$ を得るので

$$
\delta=4M e^{-\kappa(u-v_H)}
+O\!\left(4M e^{-2\kappa(u-v_H)}\right).
$$

$A=4Me^{\kappa v_H}$ と書けば $\delta\sim Ae^{-\kappa u}$ です。厳密に $q'(v)=1+4M/\delta$ だから逆微分は $p'(u)=\delta/(\delta+4M)$、従って $p'(u)\sim\delta/(4M)=\kappa A e^{-\kappa u}$。

(3) $f^{\rm out}_{\omega}(u)=e^{-i\omega u}/\sqrt{4\pi\omega}$（$\omega>0$）を採用し、

$$
f^{\rm out}_{jn}(u)=\epsilon^{-1/2}
\int_{j\epsilon}^{(j+1)\epsilon}
e^{2\pi i\omega n/\epsilon}f^{\rm out}_\omega(u)\,d\omega.
$$

被積分位相は $-\omega(u-2\pi n/\epsilon)$ だから $u_n=2\pi n/\epsilon$、時間幅は $O(1/\epsilon)$。遅い波束の過去の中心は $p(u_n)=v_H-Ae^{-\kappa u_n}+O(e^{-2\kappa u_n})$。波束には幅があり、この式は中心光線の対応であって全体を一点へ潰すものではありません。

(4) 正周波数の出射波束は $\mathscr I^+$ で定義しただけです。in真空の粒子数を出すには、$e^{-i\omega q(v)}$ を過去零無限遠の正負周波数基底へ展開してBogoliubov係数を計算し、地平線に吸収される部分も含む正準関係を確認する必要があります。さらに4次元では動径ポテンシャルによる反射・透過を計算するため、今回無視した灰色体因子が遠方流束へ現れます。したがって **指数の係数を温度と読む段階にも、遠方の完全な黒体スペクトルを主張する段階にも達していません**。
<!-- solution-end -->

## 次の計算へ

これで、平坦内部を通ってSchwarzschild外部へ逃げる一つの光線について、入射 $v_{\rm in}$ と出射 $u$ の**厳密な対応**、臨界入射時刻 $v_H$、後期の指数的圧縮、および量子場の出射波束のラベルが得られました。次はこの $q(v)$ を実際にFourier積分へ入れ、正負周波数の係数、Gamma関数の枝、波束粒子数を計算します。
