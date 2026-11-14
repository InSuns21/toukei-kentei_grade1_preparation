# U3-25 Barrier/Asian の PDE：境界と状態追加

[前講の American 障害問題](../U3-24/index.md#def-u3-24-lcp)では「いま行使できる」という選択を価格に組み込みました。一方、[Barrier 商品](../U3-09/index.md#def-u3-09-barrier-contract)は途中で障壁に触れたか、[Asian 商品](../U3-08/index.md#def-u3-08-asian-payoff)は途中までの株価をどれだけ足したかで満期支払額が変わります。同じ現在株価でも過去が違えば、将来の支払額が異なることがあります。

そこで今回は、現在株価以外に何を記録すれば PDE で将来の支払額を評価できるかを考えます。**Barrier の knock-out は障壁に達したら計算領域から退出させ、Asian は累積積分を新たな座標として持つ**、という二つの異なる解決策です。連続監視と離散監視の違い、境界の数学的意味、格子計算の誤差までを一つのモデルで確かめます。

## 1. モデルと価格の意味

以下、通貨は円、時間は年です。満期 $T>0$、初期株価 $S_0>0$、行使価格 $K\ge0$、金利 $r\ge0$、連続配当利回り $q\ge0$（いずれも年$^{-1}$）、ボラティリティ $\sigma>0$（年$^{-1/2}$）を固定します。リスク中立測度 $Q$ の下で

$$
dS_t=(r-q)S_t\,dt+\sigma S_t\,dW_t^Q,\qquad 0\le t\le T
$$

とします。これは[幾何 Brown 運動の解](../U3-14/index.md#thm-u3-14-explicit-gbm)であり、$S_t>0$ がほとんど確実に成立します。[リスク中立価格付け](../U3-17/index.md#def-u3-17-valuation)では、将来の円建て支払額の条件付き期待値を $e^{-r(T-t)}$ 倍します。以降の PDE は、この価格と一致することを確認しながら導きます。$P$ 下の損失予測を行うわけではありません。

[配当付き Black–Scholes–Merton 方程式](../U3-16/index.md#prop-u3-16-dividend-pde)の空間作用素を

$$
\mathcal L_s f
=\tfrac12\sigma^2s^2 f_{ss}+(r-q)sf_s
$$

と書きます。$f=f(t,s)$ に対して $f_s=\partial f/\partial s$、$f_{ss}=\partial^2f/\partial s^2$、$V_t=\partial V/\partial t$ とし、偏微分では他方の変数を固定します。通常の欧州型価格は $V_t+\mathcal L_sV-rV=0$ です。ただし、この式に満期支払額だけを入れればすべての経路依存商品を扱えるわけではありません。何を覚える必要があるかが次の問題です。

## 2. Barrier：触れたら消える契約と吸収境界

下側障壁 $B$ を $0<B<S_0$ と固定します。時刻 $t$ から満期までに障壁へ触れたら失効し、触れなければ満期に $G(S_T)$ 円を払う down-and-out 契約を考えます。

ここで満期受取関数は有界可測な

$$
G:[0,\infty)\longrightarrow[0,\infty)
$$

とします。失効した経路では満期株価が障壁未満の場合もあります。したがって、受取額を全経路上で定義するには、障壁未満でも関数の値が必要です。もっとも失効した経路では受取額に0を掛けるため、この部分の値は価格に影響しません。

以後、まだ失効していない契約だけを評価します。$E^Q_{t,s}[\cdot]$ は、時刻 $t$ に $S_t=s$ から始める株価過程に関する、リスク中立測度 $Q$ の下での期待値です。

<a id="def-u3-25-barrier"></a>

<!-- formal-statement-start -->
> **定義（連続監視 down-and-out と吸収境界）**  
> $0\le t<T$、$s>B>0$、有界可測な $G:[0,\infty)\to[0,\infty)$ とし、$Q$ 下の株価過程を $S_t=s$ から始める。障壁への最初の到達時刻を

$$
H_B=\inf\{u\in[t,T]:S_u\le B\}
$$

> とし、集合が空なら $H_B=\infty$ とする。継続中の契約の支払額と価格を

$$
X_T^{\rm out}=G(S_T)\mathbf1_{\{H_B>T\}},
\qquad
V^{\rm out}(t,s)
=E^Q_{t,s}\!\left[e^{-r(T-t)}X_T^{\rm out}\right]
$$

> とする。触れた瞬間から支払額を0とする条件 $V^{\rm out}(t,B)=0$ を **吸収境界**と呼ぶ。既に触れた契約は、現在株価にかかわらず価格0である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-25-barrier -->
**定義の確認**：障壁 $B=80$ 円、初期株価 $100$ 円で、満期の $G(s)=1$ 円とします。途中で $79$ 円を記録して満期に $110$ 円となった経路は $H_B\le T$ なので受取額0円です。最低値が $81$ 円で満期に $90$ 円となった経路は受取額1円です。満期株価だけでは判定できません。$s=B$ から始めれば $H_B=t$ なので、その場で0円です。これは上式の境界値と一致します。
<!-- definition-example-end -->

固定した状態 $(t,s)$ の「生存中の値」に限定すれば、過去の到達フラグを新しい連続変数にせずに済みます。**初めて $B$ に到達するところが状態空間の出口**だからです。逆に knock-in（触れたら有効化）や rebate（失効時に支払う現金）がある契約へ、同じ0の境界をそのまま当てはめることはできません。

<a id="prop-u3-25-killed-pde"></a>

<!-- formal-statement-start -->
> **命題（吸収境界付き Barrier 価格 PDE）**  
> 上の down-and-out 契約について $V^{\rm out}$ が $(0,T)\times(B,\infty)$ で $C^{1,2}$、有界で、境界と満期の内部極限が価格表現に一致すると仮定する。このとき内部で

$$
V_t+\tfrac12\sigma^2s^2V_{ss}
+(r-q)sV_s-rV=0,\quad s>B,\ t<T
$$

> が成立し、障壁では $V(t,B)=0$、満期では $V(T,s)=G(s)$（$s>B$）となる。逆に、この PDE・境界・満期条件を満たす有界な古典解があれば、その値は上の停止付き期待値に等しい。
<!-- formal-statement-end -->

### 証明の見取り図

株価が障壁に届くまで、[割引価値関数への Itô 公式](../U3-13/index.md#prop-u3-13-discounted-function)で割引価格を微分します。到達した場合は境界値0、到達しなければ満期値 $G$ が残ります。障壁への初到達で計算を止めた期待値が、価格の式に戻ることが核心です。境界までの停止を含む[Feynman–Kac の考え方](../U3-17/index.md#thm-u3-17-fk-existence)を具体化します。

<!-- proof-start -->
### 証明

まず $V\in C^{1,2}$ の古典解が条件を満たすとします。$h=\min(H_B,T)$ とし、必要なら $s$ を有界区間に止めてから区間を広げます。[割引価値関数への Itô 公式](../U3-13/index.md#prop-u3-13-discounted-function)を $e^{-r(u-t)}V(u,S_u)$ に適用すると、$u<h$ では

$$
d\{e^{-r(u-t)}V(u,S_u)\}
=e^{-r(u-t)}\{V_t+\mathcal L_sV-rV\}\,du
+e^{-r(u-t)}\sigma S_uV_s\,dW_u^Q.
$$

PDE によって $du$ 項は0です。局所化した確率積分の期待値は0なので、停止時点で期待値を取ります。有界な $V$ と有限な $T$ により局所化を外せます。$H_B\le T$ の標本路では $S_h=B$（連続標本路）で $V(h,B)=0$、$H_B>T$ なら $h=T$ で $V(T,S_T)=G(S_T)$ です。従って

$$
V(t,s)=E^Q_{t,s}\!\left[
 e^{-r(T-t)}G(S_T)\mathbf1_{\{H_B>T\}}
\right].
$$

この恒等式は有界な古典解の一意性も与えます。期待値から PDE を導く方向では、$0<\Delta<T-t$、$h_\Delta=\min\{H_B,t+\Delta\}$ とします。[Brown 運動の強マルコフ性](../../../解析系/STO/STO4/index.md#thm-sto4-brownian-strong-markov)を用いた停止時点の条件付き価格表現と、[割引価値関数の微分公式](../U3-13/index.md#prop-u3-13-discounted-function)から

$$
V(t,s)=E^Q_{t,s}[e^{-r(h_\Delta-t)}V(h_\Delta,S_{h_\Delta})],
$$

$$
0=E^Q_{t,s}\left[\int_t^{h_\Delta}e^{-r(u-t)}
(V_t+\mathcal L_sV-rV)(u,S_u)\,du\right]
$$

を得ます。

内点では障壁までの対数距離と対数ドリフトを

$$
\delta=\log(s/B)>0,\qquad \mu=r-q-\sigma^2/2
$$

とします。[GBM の対数表示](../U3-14/index.md#thm-u3-14-explicit-gbm)から、短時間の株価は

$$
\log\frac{S_{t+v}}B
=\delta+\mu v+\sigma(W_{t+v}^Q-W_t^Q),
\qquad 0\le v\le\Delta
$$

です。$\Delta$ を十分小さくして $\delta-|\mu|\Delta>0$ とすれば、障壁への到達には Brown 増分の絶対値が次の閾値以上になる必要があります。

$$
\sup_{0\le v\le\Delta}|W_{t+v}^Q-W_t^Q|
\ge\frac{\delta-|\mu|\Delta}{\sigma}.
$$

[反射原理](../../../解析系/STO/STO4/index.md#thm-sto4-reflection-principle)を正負両方向に適用し、正規尾を評価すると、ある正定数 $c$ に対して

$$
Q(H_B\le t+\Delta)
\le 4\exp\left(-\frac{(\delta-|\mu|\Delta)^2}{2\sigma^2\Delta}\right)
=O(e^{-c/\Delta})=o(\Delta)
$$

を得ます。この評価によって短時間の停止境界への到達は一次の時間幅よりも小さくなります。内点付近で局所化し、上の停止積分の式を時間幅で割ってから0へ近づけます。被積分関数の連続性と停止前経路の連続性により、その極限は

$$
(V_t+\mathcal L_sV-rV)(t,s)=0
$$

です。こうして内部 PDE が出ます。

なお $G(B+)\ne0$ なら角 $(T,B)$ で終端値と境界値は不連続です。この角までの古典解の連続性は仮定していません。
<!-- proof-end -->

### knock-in との価格関係と境界の違い

同じ障壁 $B$、同じ連続監視、同じ満期受取関数 $G$、失効時の rebate なしで、knock-in の受取額を $G(S_T)\mathbf1_{\{H_B\le T\}}$ とします。標本路ごとに二つの指示関数の和が1なので、[U3-09 の in/out parity](../U3-09/index.md#prop-u3-09-in-out-parity)と同じく

$$
V^{\rm in}(t,s)+V^{\rm out}(t,s)
=E^Q_{t,s}[e^{-r(T-t)}G(S_T)]
=V^{\rm vanilla}(t,s).
$$

この価格関係は、同一の評価測度・同一の監視規則で両者を足しているから成立します。失効時に別の時刻で rebate を払えば、上式の和へその割引現金額が加わり、単純な等号は崩れます。

## 3. 連続監視と満期時だけの監視は違う

離散監視日 $D\subset[t,T]$ を取れば「$D$ に属する時刻でだけ $S_u\le B$ を判定する」契約になります。連続監視では、格子点と格子点の間で一度でも触れれば失効します。両端の株価が障壁を超えていても、その間の到達を排除できません。

<a id="prop-u3-25-monitoring"></a>

<!-- formal-statement-start -->
> **命題（監視集合の包含と価格の順序）**  
> $G\ge0$、$r\ge0$、失効時支払なしとする。$D_1\subset D_2\subset[t,T]$ が決定論的な有限監視集合なら、両契約を同じ $Q$ 下の株価経路で評価した価格は

$$
V^{\rm out}_{D_2}(t,s)
\le V^{\rm out}_{D_1}(t,s).
$$

> 連続監視の価格はすべての有限監視集合による価格以下である。
<!-- formal-statement-end -->

### 証明の見取り図

観測日が多いほど「一度も失効しない」経路の集合は狭くなります。確率の大小だけでなく、**非負の受取額**という仮定に注意します。

<!-- proof-start -->
### 証明

$A_D=\{S_u>B\ \text{for all }u\in D\}$ とおきます。$D_1\subset D_2$ より $A_{D_2}\subset A_{D_1}$ です。従って標本路ごとに

$$
0\le G(S_T)\mathbf1_{A_{D_2}}
\le G(S_T)\mathbf1_{A_{D_1}}.
$$

割引係数 $e^{-r(T-t)}>0$ を掛けて期待値を取れば結論です。連続監視の生存事象 $\{\min_{t\le u\le T}S_u>B\}$ は各 $A_D$ の部分集合です。ここで実際の連続監視の失効事象は $\min S_u\le B$ です。$G$ が負なら不等式の向きが保たれるとは限りません。
<!-- proof-end -->

この順序を、**正確に計算できる特殊例**で確かめます。$\sigma=0.20$、$q=0$、$r=\sigma^2/2=0.02$、$S_0=100$ 円、$B=80$ 円、$T=1$ 年、$G\equiv1$ 円を取ります。$X_u=\log(S_u/B)$ は[対数 GBM の式](../U3-14/index.md#thm-u3-14-explicit-gbm)から

$$
X_u=x+\sigma W_u^Q,\qquad x=\log(100/80)>0
$$

となります。対数ドリフトがちょうど0なので、Brown 運動の[反射原理](../../../解析系/STO/STO4/index.md#thm-sto4-reflection-principle)で生存確率を計算できます。

<a id="prop-u3-25-reflection"></a>

<!-- formal-statement-start -->
> **命題（対数ドリフト0の障壁デジタル厳密価格）**  
> $0<B<s$、$T>0$、$\sigma>0$、$r-q=\sigma^2/2$ とし、満期に1円を支払う rebate なしの連続監視 down-and-out とする。$\Phi$ を標準正規分布関数とすると、時刻0の価格は

$$
V_{\rm cont}
=e^{-rT}\left[
2\Phi\!\left(\frac{\log(s/B)}{\sigma\sqrt T}\right)-1
\right].
$$

> 一方、満期 $T$ のみを監視する価格は

$$
V_{\{T\}}
=e^{-rT}\Phi\!\left(\frac{\log(s/B)}{\sigma\sqrt T}\right).
$$
<!-- formal-statement-end -->

### 証明の見取り図

対数株価を障壁からの距離へ写すと、問題は「正の出発点から始まる Brown 運動が0へ達するか」になります。終点が正である確率から、途中で0に達して終点だけ正へ戻った確率を差し引きます。

<!-- proof-start -->
### 証明

$X_u=x+\sigma W_u^Q$ と $z=x/(\sigma\sqrt T)$ を置きます。$X_T>0$ は $W_T>-x/\sigma$ だから

$$
Q(X_T>0)=\Phi(z).
$$

Brown 運動の[反射原理](../../../解析系/STO/STO4/index.md#thm-sto4-reflection-principle)では、0への最初の到達後の増分の符号を反転する写像により

$$
Q\left(\min_{0\le u\le T}X_u\le0,\ X_T>0\right)
=Q(X_T<0)=\Phi(-z).
$$

従って全期間生存は $Q(X_T>0)-\Phi(-z)=\Phi(z)-(1-\Phi(z))=2\Phi(z)-1$ です。満期のみ監視では生存事象が単に $X_T>0$ です。どちらも満期に1円を支払うので $e^{-rT}$ を掛けます。
<!-- proof-end -->

数値は次のとおりです。

| 契約 | 時刻0価格（円） |
| --- | ---: |
| 連続監視 down-and-out | 0.720894008 |
| 満期時だけの監視 | 0.850546340 |
| 見落とす途中の越境に対応する差 | 0.129652333 |

差の0.12965円は、**有限差分の丸め誤差ではありません**。監視する契約そのものを変えた価格差です。後の U3-35 で扱う Brownian bridge による越境補正も、この区別を出発点とします。

## 4. Barrier PDE を吸収境界付き格子へ移す

$\tau=T-t$ と $u(\tau,s)=V(T-\tau,s)$ を置きます。[残存時間への変換](../U3-22/index.md#def-u3-22-grid)と同じく $u_\tau=-V_t$ だから

$$
u_\tau=\tfrac12\sigma^2s^2u_{ss}+(r-q)su_s-ru,
\qquad u(\tau,B)=0,\qquad u(0,s)=G(s).
$$

格子の左端を **$s=0$ でなく $s=B$** に合わせる点が重要です。$s=0$ での欧州型の境界条件を流用すれば、障壁に触れた瞬間の失効を表せません。

さらに $x=\log(s/B)$、$w(\tau,x)=u(\tau,Be^x)$ とします。連鎖律から

$$
u_s=\frac{w_x}{s},
\qquad
u_{ss}=\frac{w_{xx}-w_x}{s^2}.
$$

実際、$w_x=s u_s$ をもう一度 $x$ 微分すると $w_{xx}=s u_s+s^2u_{ss}$ です。これを PDE へ代入すると

$$
w_\tau=\tfrac12\sigma^2w_{xx}
+\mu w_x-rw,\qquad
\mu=r-q-\tfrac12\sigma^2,\quad x>0.
$$

対数ドリフト0の前節の例では $\mu=0$ です。**以下の陽的格子式はこの特殊例 $\mu=0$ に限ります。** $\mu\ne0$ なら $\mu w_x$ の差分項も必要です。計算領域を $0\le x\le L$（$L>0$）で打ち切り、$x_i=ih$（$0\le i\le M$）、$\tau_n=nk$（$0\le n\le N$）、$h=L/M$、$k=T/N$ とします。$U_i^n\approx w(\tau_n,x_i)$ を節点価格とすると、前進 Euler と中心差分で

$$
U_i^{n+1}
=\frac{k\sigma^2}{2h^2}U_{i-1}^n
+\left(1-\frac{k\sigma^2}{h^2}-rk\right)U_i^n
+\frac{k\sigma^2}{2h^2}U_{i+1}^n
$$

となります。$U_0^n=0$ は正確な吸収値です。上端 $x=L$ は有限打切りなので、$G\equiv1$ の場合は $U_M^n=e^{-r\tau_n}$ と近似します（真の上端値はこれよりわずかに低い）。係数がすべて非負である十分条件は

$$
k\left(\frac{\sigma^2}{h^2}+r\right)\le1.
$$

その場合、非負データは非負のまま進み、内部の係数和は $1-rk\le1$ です。ただし $G\equiv1$ は障壁端で不連続な初期条件を持つので、**滑らかな解に対する誤差次数**を無条件に言うことはできません。時間刻み、空間刻み、上端打切り、監視規則の違いを分離して検査します。

## 5. Asian：過去の株価の積分を新しい座標にする

[離散型 Asian の累積和](../U3-08/index.md#def-u3-08-augmented-state)を連続時間へ移します。離散的に $\sum_j S_{t_j}$ を持ったのと同様に、連続時間では株価の**面積**を覚えます。ここでは開始時刻0から満期 $T$ までの時間平均を使い、監視窓の途中で時刻を切り直さないことに注意します。

<a id="def-u3-25-asian"></a>

<!-- formal-statement-start -->
> **定義（連続算術平均 Asian と累積積分状態）**  
> $T>0$、$S_t>0$ に対し

$$
A_t=\int_0^tS_u\,du,\qquad dA_t=S_t\,dt,\qquad A_0=0
$$

> と置く。$A_t$ の単位は円・年である。満期支払額を

$$
G_{\rm Asian}(S_T,A_T)
=\left(\frac{A_T}{T}-K\right)_+
$$

> とする固定行使価格の連続算術平均 Asian call を考える。時刻 $t$ の未失効価値を $V(t,s,a)$ と表すとき、$s$ は現在株価、$a$ は既に積み上がった $A_t$ の値であり、組 $(s,a)$ が評価の拡張状態となる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-25-asian -->
**定義の確認**：$T=1$ 年で、株価が前半の0.5年に120円、後半の0.5年に80円である区分的に一定の経路なら、積分は $A_T=120(0.5)+80(0.5)=100$ 円・年、平均は100円です。逆順の経路も平均は100円ですが、**途中時刻** $t=0.5$ 年での累積値は前者が60円・年、後者が40円・年と異なります。より一般には現在株価が同じでも、累積値が異なれば、満期に残る支払額は違います。この数値経路は状態の算術的確認用で、GBM の典型標本路を主張するものではありません。
<!-- definition-example-end -->

$A_t$ の増分 $S_t\,dt$ は、株価の Brown 運動項と違って $dt$ のみです。従って $(S_t,A_t)$ は二次元状態ですが、乱数の源は一次元であり、$a$ 方向に二階微分は現れません。以降、$E^Q_{t,s,a}[\cdot]$ は $(S_t,A_t)=(s,a)$ を出発状態とする $Q$ 期待値です。既存の累積値 $a$ は確定値として保持し、以後の確率的な株価積分だけを追加します。

<a id="prop-u3-25-asian-pde"></a>

<!-- formal-statement-start -->
> **命題（Asian の増次元 Black–Scholes PDE）**  
> 上の GBM と $A_t$ を $Q$ 下で考える。満期支払額 $H(a)=(a/T-K)_+$ の条件付き割引期待値

$$
V(t,s,a)=E^Q_{t,s,a}\!\left[e^{-r(T-t)}H(A_T)\right]
$$

> が内部で $C^{1,2,1}$（$t$ に1回、$s$ に2回、$a$ に1回微分可能）で、微分・期待値操作を正当化する成長条件を満たすと仮定する。このとき $0\le t<T$、$s>0$、$a>0$ の領域で

$$
V_t+\tfrac12\sigma^2s^2V_{ss}
+(r-q)sV_s+sV_a-rV=0,
\qquad V(T,s,a)=H(a).
$$

> 残存時間 $\tau=T-t$ で $u(\tau,s,a)=V(T-\tau,s,a)$ と書けば、同値に

$$
u_\tau=\tfrac12\sigma^2s^2u_{ss}
+(r-q)su_s+su_a-ru,\qquad u(0,s,a)=H(a)
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

新しい状態 $a$ に沿う増分は $da=s\,dt$ なので、通常の株価方向の Itô 項に $sV_a\,dt$ だけが加わります。$dA$ に Brown 運動項がないから $V_{aa}$ も $V_{sa}$ も現れません。

<!-- proof-start -->
### 証明

$F(t,S_t,A_t)$ へ、[多次元 Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-multidimensional-ito)に沿って有限変動座標 $A$ を加えた連鎖律を適用します。$dA_t=S_tdt$、$(dS_t)^2=\sigma^2 S_t^2dt$、$(dA_t)^2=dS_t\,dA_t=0$ なので

$$
dF=\left(F_t+(r-q)S_tF_s+S_tF_a
+\tfrac12\sigma^2 S_t^2F_{ss}\right)dt
+\sigma S_tF_s\,dW_t^Q.
$$

$F=V$ とし、積の微分則から

$$
d(e^{-rt}V)
=e^{-rt}\left[
V_t+\tfrac12\sigma^2S_t^2V_{ss}
+(r-q)S_tV_s+S_tV_a-rV\right]dt
+e^{-rt}\sigma S_tV_s\,dW_t^Q.
$$

期待値で表した価格は割引後の条件付き期待値過程なので、適当な局所化と可積分性の下でその $dt$ ドリフトは0です。角括弧を0とおけば PDE が得られます。$\tau=T-t$ と置くと $u_\tau=-V_t$、$u_s=V_s$、$u_a=V_a$ であり、式の移項により残存時間の式を得ます。満期 $\tau=0$ では以後の積分が増えず $A_T=a$ だから $u(0,s,a)=H(a)$ です。
<!-- proof-end -->

境界を区別しましょう。$s=0$ では GBM は0に留まり、以後 $A$ も増えないため

$$
u(\tau,0,a)=e^{-r\tau}(a/T-K)_+.
$$

一方、**累積状態の下端 $a=0$ に値0を課してはいけません**。現在株価が正なら、その後の累積量は増加します。したがって累積量がまだ0でも正のオプション価格を持ち得ます。

PDE は累積量が正の内部で導出しました。下端の値は、右側にある累積状態からの変化によって決まるので、独立の値0という境界条件には置き換えません。

この違いは、後退時間の PDE に現れる輸送項

$$
u_\tau=su_a+\cdots
$$

からも読み取れます。株価が正なら情報は累積量の大きい側から小さい側へ伝わるので、数値計算には右向き差分と上端側の境界情報が必要です。

## 6. 境界値を厳密に検査できる Asian の特別な場合

行使価格 $K=0$、または状態 $a\ge KT$ なら、株価と累積積分が非負なので将来の支払額は常に $A_T/T-K$ です。この領域では「正の部分」の折れ目が消え、価格を厳密に計算できます。これを二次元 PDE と境界実装の検査関数に使います。

<a id="prop-u3-25-asian-affine"></a>

<!-- formal-statement-start -->
> **命題（Asian 線形領域の厳密価格）**  
> $0\le\tau\le T$、$s\ge0$、$a\ge KT$、$r,q\ge0$、$\sigma>0$ とする。上の Asian call の価格は

$$
u(\tau,s,a)=e^{-r\tau}\left[
\frac aT-K+\frac{s}{T}J(\tau)
\right],\qquad
J(\tau)=\int_0^\tau e^{(r-q)v}\,dv.
$$

> $r\ne q$ なら $J(\tau)=(e^{(r-q)\tau}-1)/(r-q)$、$r=q$ なら $J(\tau)=\tau$ である。特に $K=0,a=0,t=0$ の価格は $e^{-rT}S_0J(T)/T$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

既に積み上がった $a$ と、残り $\tau$ 年に積み上がる $S$ の期待値を分けます。[GBM の条件付き平均](../U3-14/index.md#prop-u3-14-conditional)を積分すれば、複雑な二変数分布を計算せずに済みます。

<!-- proof-start -->
### 証明

$a\ge KT$ かつ $S_u\ge0$ なので、$A_T=a+\int_t^T S_u\,du\ge KT$、ゆえに正の部分は不要です。初期状態 $(t,s,a)$ の下で[GBM の条件付き平均](../U3-14/index.md#prop-u3-14-conditional)から

$$
E^Q_{t,s}[S_{t+v}]=s e^{(r-q)v},\qquad 0\le v\le\tau.
$$

$S$ は非負可測で、時間区間は有限、$Q$ は確率測度です。このため[Tonelli の定理](../../../解析系/F0/F0-00D2C/index.md#thm-tonelli)を時間測度と $Q$ の積に適用して積分と期待値を交換できます。積分後の指数関数は有限区間で可積分なので、期待値は有限です。

$$
E^Q_{t,s,a}[A_T]
=a+\int_0^\tau E^Q_{t,s}[S_{t+v}]\,dv
=a+s\int_0^\tau e^{(r-q)v}\,dv=a+sJ(\tau).
$$

従って割引期待値は表示された式です。PDE にも直接代入できます。$u_{ss}=0$、$u_s=e^{-r\tau}J/T$、$u_a=e^{-r\tau}/T$。$J'=e^{(r-q)\tau}=1+(r-q)J$ なので

$$
u_\tau=-ru+e^{-r\tau}\frac{s}{T}\{1+(r-q)J\}
=\tfrac12\sigma^2s^2u_{ss}+(r-q)su_s+su_a-ru.
$$

満期の $\tau=0$ では $J(0)=0$ だから $u(0,s,a)=a/T-K$ です。
<!-- proof-end -->

たとえば $r=0.02,q=0,\sigma=0.20,T=1,S_0=100,K=0,a=0$ とすると

$$
u(T,100,0)
=100\,\frac{1-e^{-0.02}}{0.02}
\approx99.006633466\ \mathrm{JPY}.
$$

この価格はボラティリティに依存しません。価格が株価積分に**線形**なので、必要なのは平均値だけだからです。$K>0$ で正の部分の折れ目をまたぐ状態には、この式をそのまま適用できません。

## 7. 状態を増やした格子の作り方

二次元格子 $s_i=ih_s$、$a_j=jh_a$、残存時間 $\tau_n=nk$ を使います。[U3-22 の三点差分](../U3-22/index.md#def-u3-22-explicit)から、株価方向の係数を

$$
\alpha_i=\tfrac12\{\sigma^2i^2-(r-q)i\},\quad
\beta_i=-(\sigma^2i^2+r),\quad
\gamma_i=\tfrac12\{\sigma^2i^2+(r-q)i\}
$$

と置きます。$a$ 方向の輸送項は、$s_i>0$ のとき $u_\tau=s_i u_a+\cdots$ と**大きい $a$ の情報から小さい $a$ を更新する**ため、$u_a$ を右向き差分で近似します。具体的には $u_a(\tau_n,s_i,a_j)\approx(U_{i,j+1}^n-U_{i,j}^n)/h_a$ と置くので、$s_i u_a$ の寄与は右隣の $+s_i/h_a$ と中心の $-s_i/h_a$ に分かれます。株価方向の三点係数とこの輸送係数を時間幅 $k$ 倍して足すのが次の更新です。

<a id="def-u3-25-asian-scheme"></a>

<!-- formal-statement-start -->
> **定義（Asian の右向き累積量差分）**  
> $h_s,h_a,k>0$ とし、各格子点の値を $U_{i,j}^n\approx u(nk,ih_s,jh_a)$ とする。内部点 $1\le i<M_s$、$0\le j<M_a$ で、次の陽的更新を用いる。

$$
\begin{aligned}
U_{i,j}^{n+1}={}&k\alpha_i U_{i-1,j}^n
+k\gamma_iU_{i+1,j}^n
+k\frac{s_i}{h_a}U_{i,j+1}^n\\
&+\left[1-k\left(\sigma^2i^2+r+\frac{s_i}{h_a}\right)\right]U_{i,j}^n.
\end{aligned}
$$

> $a$ 上端は別途与える。$a_{M_a}\ge KT$ なら、[線形領域の厳密価格](#prop-u3-25-asian-affine)を右端境界に使用できる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-25-asian-scheme -->
**定義の確認**：$r=q=0$、$\sigma=0.2$、$i=2$、$s_i=100$ 円（従って $h_s=50$ 円）、$h_a=5$ 円・年、$k=0.01$ 年とします。$\alpha_2=\gamma_2=0.08$、$\sigma^2i^2=0.16$、$s_i/h_a=20$ なので、左・右の株価方向の係数は各0.0008、累積量の右隣は0.20、中心は $1-0.01(0.16+20)=0.7984$ です。4係数は非負で和は1。$a=0$ の節点でも $U_{i,1}$ を参照でき、仮の0境界を課していません。
<!-- definition-example-end -->

<a id="prop-u3-25-asian-positive"></a>

<!-- formal-statement-start -->
> **命題（Asian 陽的更新の非負性と刻み条件）**  
> $r\ge0$、各内部点で $\alpha_i,\gamma_i\ge0$ とし、時間幅 $k$ が全内部点で

$$
k\left(\sigma^2i^2+r+\frac{s_i}{h_a}\right)\le1
$$

> を満たすとする。初期節点値および設定した $s$・$a$ 境界値が非負なら、上の更新で得られる全内部節点値は非負である。境界を固定した二つの更新の差は、各ステップで最大値ノルムを増やさない。
<!-- formal-statement-end -->

### 証明の見取り図

$su_a$ を株価方向と同じ中心差分にすると負係数が現れます。右向き差分にすれば、刻み条件の下ですべての重みが非負になり、同じ非負値の重み付き和として解釈できます。

<!-- proof-start -->
### 証明

$\alpha_i,\gamma_i,s_i/h_a$ は非負で、条件により中心係数も非負です。係数の総和は

$$
k(\alpha_i+\gamma_i+s_i/h_a)
+1-k(\sigma^2i^2+r+s_i/h_a)
=1-kr\le1,
$$

ここで $\alpha_i+\gamma_i=\sigma^2i^2$ を使いました。更新値は非負数の非負結合だから、初期と境界から時間帰納法で非負が保たれます。同じ境界データで二つの計算をすると、差の更新では境界項が相殺されます。各差成分の絶対値は係数和 $1-kr\le1$ 倍の旧差の最大値以下なので、最大値ノルムは増えません。**これは非負性・安定性の十分条件**であり、格子誤差が自動的に小さいことを意味しません。
<!-- proof-end -->

空間の $M_s\times M_a$ 点を $N$ 段進めるなら演算数は $O(NM_sM_a)$、旧・新時刻だけを保存するならメモリは $O(M_sM_a)$ です。$a$ 上端を任意の0にしないこと、$s$ 上端を大きくし直して打切り影響を確認すること、満期 payoff の折れ目で精度次数を無断適用しないことが重要です。

## 8. 再現可能な数値検証

最初に、Barrier の**対数座標一次元格子**を、前節の厳密解と照合します。上端は $L=8\log(100/80)$ とし、初期点 $x_0=\log(100/80)$ が常に格子点に一致するよう $M=40,80,160,320$ を取ります。後退時間の PDE に対する陽的更新は第4節の式で、$k$ は正係数条件を満たすよう自動で選びます。続いて Asian の**厳密な連続平均**と、$N$ 個の等間隔な満期までの観測値の算術平均（時刻0は含めない）の価格を比べます。後者は契約を離散平均へ変えたときの偏りであり、格子の丸め誤差ではありません。

~~~python
import math

r, q, sigma, T = 0.02, 0.0, 0.20, 1.0
s0, barrier = 100.0, 80.0
x0 = math.log(s0 / barrier)
Phi = lambda x: 0.5 * (1.0 + math.erf(x / math.sqrt(2.0)))
z = x0 / (sigma * math.sqrt(T))
continuous_barrier = math.exp(-r*T) * (2.0*Phi(z) - 1.0)
maturity_only = math.exp(-r*T) * Phi(z)

def barrier_fd(M):
    L = 8.0*x0
    h = L/M
    N = math.ceil(T*sigma*sigma/(0.8*h*h))
    k = T/N
    assert k*(sigma*sigma/(h*h)+r) <= 1.0
    u = [1.0]*(M+1)             # initial payoff, x > 0
    u[0] = 0.0                   # absorbing lower boundary
    for n in range(N):
        v = [0.0]*(M+1)
        v[M] = math.exp(-r*(n+1)*k)  # remote upper boundary
        for i in range(1, M):
            v[i] = u[i] + k*(
                0.5*sigma*sigma*(u[i-1]-2*u[i]+u[i+1])/(h*h)
                -r*u[i]
            )
        u = v
    i0 = round(x0/h)
    return N, u[i0], abs(u[i0]-continuous_barrier)

print("Barrier exact:", continuous_barrier)
print("Maturity only:", maturity_only)
for M in (40, 80, 160, 320):
    print("Barrier FD", M, barrier_fd(M))

asian_exact = s0*(1.0-math.exp(-r*T))/(r*T)  # K=0, q=0
print("Asian integral:", asian_exact)
for N in (1, 4, 16, 64):
    # E[(S_(T/N)+...+S_T)/N] discounted, K=0
    price = math.exp(-r*T)*s0/N*sum(
        math.exp((r-q)*j*T/N) for j in range(1, N+1)
    )
    print("Asian discrete", N, price, abs(price-asian_exact))
~~~

| $M$（Barrier） | 時間段数 $N$ | 格子価格（円） | 厳密連続監視価格との差（円） |
| ---: | ---: | ---: | ---: |
| 40 | 26 | 0.716497340 | 0.004396668 |
| 80 | 101 | 0.719767984 | 0.001126024 |
| 160 | 402 | 0.720611469 | 0.000282539 |
| 320 | 1607 | 0.720823350 | 0.000070658 |

| 離散 Asian 平均の観測数 | $K=0$ の価格（円） | 連続平均の厳密値との差（円） |
| ---: | ---: | ---: |
| 1 | 100.000000000 | 0.993366534 |
| 4 | 99.254356314 | 0.247722847 |
| 16 | 99.068525504 | 0.061892037 |
| 64 | 99.022104058 | 0.015470592 |
| 連続平均 | 99.006633466 | 0 |

前半で誤差が約4分の1になるのは、この特殊例・選択した刻みの実測結果です。一般の障壁 payoff に二次収束を保証する主張ではありません。後半は離散平均という**別の商品**が連続平均へ近づく様子を確認するものです。この二つを混同すると、コードが正しいのに商品条件を間違えることになります。

## 9. 演習：境界・増次元・誤差を自分でつなぐ

<a id="ex-u3-25-a1"></a>
### U3-25-A1：触れたかどうかと監視集合
- Level: A

$B=80$ 円、$G\equiv1$ 円、$r=0$ とする。$S_0=100$、$S_{1/2}=75$、$S_1=105$ の経路について、(i) 連続監視、(ii) $\{1\}$ のみの監視、(iii) $\{1/2,1\}$ 監視の満期受取額を求めよ。$S$ は時刻間でも連続とする。

<!-- solution-start -->
**詳細解答**：(i) 時刻 $1/2$ に $75\le80$ を満たすので、連続監視では必ず到達し受取額0円。(ii) 満期 $S_1=105>80$ しか判定しないため、受取額1円。(iii) 時刻 $1/2$ が監視日に含まれ $75\le80$ だから受取額0円。満期値105円だけを見ると (i) と (iii) の失効を見落とす。
<!-- solution-end -->

<a id="ex-u3-25-a2"></a>
### U3-25-A2：対数座標への連鎖律
- Level: A

$w(\tau,x)=u(\tau,Be^x)$ とする。$u_s,u_{ss}$ を $w_x,w_{xx}$ で表し、対数座標の drift 係数を導け。

<!-- solution-start -->
**詳細解答**：$s=Be^x$、$ds/dx=s$ なので $w_x=u_s s$、従って $u_s=w_x/s$。次に $w_{xx}=d(su_s)/dx=s u_s+s^2u_{ss}$ より $u_{ss}=(w_{xx}-w_x)/s^2$。従って $\tfrac12\sigma^2s^2u_{ss}+(r-q)su_s=\tfrac12\sigma^2w_{xx}+(r-q-\tfrac12\sigma^2)w_x$。drift は $\mu=r-q-\sigma^2/2$。
<!-- solution-end -->

<a id="ex-u3-25-a3"></a>
### U3-25-A3：吸収境界と満期の角
- Level: A

$G(s)=1$ 円（$s>B$）の Barrier 契約で、$V(T,s)=1$（$s>B$）と $V(t,B)=0$（$t<T$）を確認する。点 $(T,B)$ に連続な解を仮定してよいか述べよ。

<!-- solution-start -->
**詳細解答**：満期以前に障壁へ触れていない株価 $s>B$ で、時刻 $T$ には監視を終えているので受取額1円。障壁上ではその瞬間に失効するので、$t<T$ なら価値0円。$s\downarrow B$ を満期上で取った極限は1、$t\uparrow T$ を障壁上で取った極限は0。二つの極限が違うので $(T,B)$ まで連続な古典解は要求できない。内部の PDE と各辺の境界条件は両立する。
<!-- solution-end -->

<a id="ex-u3-25-a4"></a>
### U3-25-A4：Asian の単位と満期条件
- Level: A

$T=2$ 年、$S_u=100$ 円（$0\le u\le2$）の経路、$K=90$ 円について $A_T$、平均、payoff を計算せよ。$A_t$ の単位を答え、満期 PDE の条件を記せ。

<!-- solution-start -->
**詳細解答**：$A_T=\int_0^2 100\,du=200$ 円・年。$A_T/T=200/2=100$ 円。payoff は $(100-90)_+=10$ 円。$A_t$ をそのまま $K$ と引き算すると単位が違う。満期条件は $V(T,s,a)=(a/T-K)_+$ であり、終端値は $s$ には直接依存しない。
<!-- solution-end -->

<a id="ex-u3-25-a5"></a>
### U3-25-A5：累積量格子の係数
- Level: A

$r=q=0,\sigma=0.2,i=2,s_i=100,h_a=5,k=0.01$ の更新について、$U_{i-1,j},U_{i,j},U_{i+1,j},U_{i,j+1}$ の係数をすべて求め、非負性と和を検算せよ。

<!-- solution-start -->
**詳細解答**：$i=2$ なので $\alpha_2=\gamma_2=\frac12(0.04\cdot4)=0.08$。株価左・右は $k\alpha_2=k\gamma_2=0.0008$。累積量方向は $ks_i/h_a=0.01(100/5)=0.2$。中心は $1-k(\sigma^2i^2+r+s_i/h_a)=1-0.01(0.16+20)=0.7984$。和は $0.0008+0.0008+0.2+0.7984=1$、すべて非負。$a=0$ でも右隣を使う。
<!-- solution-end -->

<a id="ex-u3-25-b1"></a>
### U3-25-B1：監視頻度の証明と破綻例
- Level: B

監視集合 $D_1\subset D_2$ の下で、非負 $G$ に対する down-and-out 価格が $V_{D_2}\le V_{D_1}$ となることを標本路から証明せよ。また $G\equiv-1$ 円という形式的な支払額に変えた場合、何が壊れるか述べよ。

<!-- solution-start -->
**詳細解答**：$A_{D_j}=\{S_u>B,\ \forall u\in D_j\}$ とおけば $D_1\subset D_2$ より $A_{D_2}\subset A_{D_1}$。従って $G(S_T)\mathbf1_{A_{D_2}}\le G(S_T)\mathbf1_{A_{D_1}}$ は $G\ge0$ のとき経路ごとに成立する。正の割引係数を掛け期待値を取れば価格不等式が出る。$G=-1$ なら $-\mathbf1_{A_{D_2}}\ge-\mathbf1_{A_{D_1}}$ となり向きが反転する。生存事象の包含は壊れず、**非負額で掛けたときにだけ不等式の向きが保たれる**箇所が壊れる。
<!-- solution-end -->

<a id="ex-u3-25-b2"></a>
### U3-25-B2：障壁デジタルと監視規則の差
- Level: B

$S_0=100,B=80,\sigma=0.2,r=0.02,q=0,T=1$、$G\equiv1$ 円の設定で、$z=\log(100/80)/0.2$ とする。(i) 連続監視価格、(ii) 満期のみ監視価格、(iii) 価格差の式を[反射原理](../../../解析系/STO/STO4/index.md#thm-sto4-reflection-principle)から導き、数値を小数第6位まで求めよ。

<!-- solution-start -->
**詳細解答**：対数株価のドリフトを先に確かめる。

$$
r-q-\frac{\sigma^2}{2}=0.02-0.02=0,
\qquad X_t=z\sigma+\sigma W_t^Q.
$$

従って満期に正である確率は $\Phi(z)$。[反射原理](../../../解析系/STO/STO4/index.md#thm-sto4-reflection-principle)より、途中で0へ到達して満期に正となる確率は $\Phi(-z)=1-\Phi(z)$。連続生存の確率は

$$
\Phi(z)-\Phi(-z)=2\Phi(z)-1.
$$

割引率は $e^{-0.02}$ なので、求める価格と差は

$$
\begin{aligned}
V_{\rm cont}&=e^{-0.02}(2\Phi(z)-1)\approx0.720894\ \mathrm{JPY},\\
V_{\{T\}}&=e^{-0.02}\Phi(z)\approx0.850546\ \mathrm{JPY},\\
V_{\{T\}}-V_{\rm cont}
&=e^{-0.02}\{1-\Phi(z)\}\approx0.129652\ \mathrm{JPY}.
\end{aligned}
$$

途中の越境を観測しないことが差の原因であり、有限差分誤差とは異なる。
<!-- solution-end -->

<a id="ex-u3-25-b3"></a>
### U3-25-B3：Asian の生成作用素を作る
- Level: B

$(S_t,A_t)$ の下で $F(t,s,a)=s^2a$ と置き、$dF$ の $dt$ 係数と $dW_t^Q$ 係数を計算せよ。$F_{aa}$ と $F_{sa}$ の二階 Itô 項がない理由を示せ。

<!-- solution-start -->
**詳細解答**：$F_t=0,F_s=2sa,F_{ss}=2a,F_a=s^2$。$dS=(r-q)Sdt+\sigma SdW$、$dA=Sdt$ なので、$dt$ 係数は $(r-q)s(2sa)+s(s^2)+\tfrac12\sigma^2s^2(2a)=\{2(r-q)+\sigma^2\}s^2a+s^3$。$dW$ 係数は $\sigma sF_s=2\sigma s^2a$。$dA$ は有限変動過程の増分なので $dA\,dA=0$、$dS\,dA=0$。従って $F_{aa}$ と $F_{sa}$ を掛ける二次変動項は0である。
<!-- solution-end -->

<a id="ex-u3-25-b4"></a>
### U3-25-B4：$a$ 境界の誤設定を検出する
- Level: B

$K=0$ の Asian call について $r=0.02,q=0,T=1,s=100,a=0$ とする。$a=0$ の境界値を常に0とする数値コードが誤りであることを、[線形領域の公式](#prop-u3-25-asian-affine)を用いて示せ。また $a_{\max}>0$ 上端には何を指定できるか述べよ。

<!-- solution-start -->
**詳細解答**：$K=0$ なので $a\ge KT=0$ で公式が使える。$\tau=1$、$J(1)=(e^{0.02}-1)/0.02$ を代入し、$u(1,100,0)=e^{-0.02}100J(1)\approx99.006633$ 円で正。$a=0$ を0に固定すると、この初期状態の価格を丸ごと破壊する。上端 $a=a_{\max}\ge0$ では $u(\tau,s,a_{\max})=e^{-r\tau}\{a_{\max}/T-K+sJ(\tau)/T\}$ が厳密値であり、$K=0$ なら任意の非負上端で使用できる。
<!-- solution-end -->

<a id="ex-u3-25-c1"></a>
### U3-25-C1：障壁と Asian の二種類の PDE を統合する
- Level: C

$r,q\ge0,\sigma>0$ の GBM を用いる。(i) $B>0$ での連続監視 down-and-out の PDE と二つの境界・終端条件を導き、満期のみに監視を変えた場合の違いを説明する。(ii) 連続時間平均の Asian call について状態と PDE、$s=0$ 境界を導き、$a=0$ に Dirichlet 0 を課せない理由を述べる。(iii) $\alpha_i,\gamma_i\ge0$ の下で Asian 陽的格子の非負条件を導き、$K=0$ の厳密解を検算用に与える。(iv) Barrier で格子価格と真の契約価格が違う理由を、少なくとも三種類に分けて整理せよ。

<!-- solution-start -->
**詳細解答**：(i) 生存中の価格は、障壁への到達時刻 $H_B$ を用いた割引期待値である。

$$
V(t,s)=E^Q_{t,s}\!\left[
e^{-r(T-t)}G(S_T)\mathbf1_{\{H_B>T\}}
\right].
$$

[停止付き PDE](#prop-u3-25-killed-pde)では、内部で次の方程式を満たす。

$$
V_t+\tfrac12\sigma^2s^2V_{ss}+(r-q)sV_s-rV=0.
$$

障壁で $V(t,B)=0$、満期には $V(T,s)=G(s)$（$s>B$）を課す。到達時の価値0を停止後の Itô 公式へ代入して PDE との一致を得る。

満期だけ監視なら $S_T\le B$ のときだけ受取額を消し、途中で障壁に触れた経路は失効しない。その場合は**全株価領域で通常の欧州型 PDE**を解き、満期受取額を

$$
G(s)\mathbf1_{\{s>B\}}
$$

とする。$s=B$ の吸収条件を満期前に課すのは誤り。

(ii) $A_t=\int_0^tS_u\,du$、$dA_t=S_tdt$。$V(t,s,a)=E[e^{-r(T-t)}(A_T/T-K)_+]$ とすると $dV$ の $dt$ 係数は $V_t+(r-q)sV_s+sV_a+\frac12\sigma^2s^2V_{ss}$。割引値の drift を0にして $V_t+\frac12\sigma^2s^2V_{ss}+(r-q)sV_s+sV_a-rV=0$、$V(T,s,a)=(a/T-K)_+$。$s=0$ では以後 $S=0,A_T=a$ だから $V(t,0,a)=e^{-r(T-t)}(a/T-K)_+$。$a=0,s>0$ なら満期まで $A$ が増えるので、価格が必ず0とは言えない。

(iii) $s_i=ih_s$ として $a_i$ の記号は累積量と混同するため、株価三点係数を $\alpha_i,\beta_i,\gamma_i$ と呼ぶ。隣接株価重みは $k\alpha_i,k\gamma_i$、累積量の右隣重みは $ks_i/h_a$、中心は $1-k(\sigma^2i^2+r+s_i/h_a)$。[非負更新命題](#prop-u3-25-asian-positive)の仮定 $k(\sigma^2i^2+r+s_i/h_a)\le1$ なら係数は非負、和は $1-kr$。$K=0$ なら $u(\tau,s,a)=e^{-r\tau}[a/T+sJ(\tau)/T]$ を数値解と比較できる。$J'=1+(r-q)J$ から $u_\tau=-ru+e^{-r\tau}s\{1+(r-q)J\}/T$ は空間作用素の代入結果と一致する。

(iv) 誤差・差異は別々に検査する。第一に空間刻み $h$ と時間刻み $k$ による PDE 離散化誤差。第二に有限上端 $L$ の境界打切り・近似値による誤差。第三に監視を連続から離散へ変えて商品そのものが違うことによる価格差。さらに反復解法を使う場合は連立方程式残差も別に計測する。連続監視障壁を満期のみ監視する PDE の payoff で代用しても、格子を細かくするだけでは正しい連続監視価格へ近づかない。
<!-- solution-end -->

## 10. 次講への接続

Barrier では「**失効する吸収境界**」を、Asian では「**累積積分という追加座標**」を同じリスク中立価格から求めました。吸収境界、輸送方向、累積量上端、監視契約の違いを分ければ、PDE が高次元になっても何を数値化しているかを確認できます。

次の U3-26 では、同じ期待値を多数の確率経路の平均として数値化し、**時間・空間の離散化誤差と標本誤差**を分けて検証します。
