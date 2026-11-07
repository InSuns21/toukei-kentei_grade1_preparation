# ITD8 有限時間の記憶消去：確率流・活動度・余分な散逸

[ITD5のLandauer原理](../ITD5/index.md#thm-itd5-reset-work-bound)では、記憶ビットを消す平均仕事の下限を、始点と終点の非平衡自由エネルギー差から求めました。そこで得た下限へ近づく操作は、十分ゆっくり進める準静的極限を使います。実際の装置で、決められた時間内に、しかも状態遷移の速さに限界があるなら、どれだけ余計に仕事が必要でしょうか。

本章では、**分布を動かす速さと、遷移の回数と、散逸の大きさ**を有限状態の計算だけでつなぎます。使うのは[ITD1の局所詳細釣合い](../ITD1/index.md#def-itd1-local-detailed-balance)と[ITD7で導入した連続時間ジャンプの率](../ITD7/index.md#def-itd7-labeled-jump)、対数の不等式、Cauchy–Schwarz不等式です。確率微分方程式や一般の経路測度を仮定しません。

温度 $T>0$ は一つの平衡熱浴で一定とし、$k_{\mathrm B}>0$、$\beta=(k_{\mathrm B}T)^{-1}$、$\log$ は自然対数とします。仕事 $W$ は外部から系へした仕事を正、$Q_{\mathrm{bath}}$ は系から浴へ出た熱を正とします。従って[ITD1の第一法則](../ITD1/index.md#thm-itd1-first-law)は $\Delta U=W-Q_{\mathrm{bath}}$ です。ここで扱うエントロピー生成 $\Sigma$ は $k_{\mathrm B}$ で割った無次元量（nat）です。

## 1. 同じ分布変化でも遷移の忙しさが違う

二状態 $0,1$ で、単位時間に $0\to1$ へ進む確率の量は $p_0k_{01}$、逆向きは $p_1k_{10}$ です。差を取れば、どちらへ確率が動くかが分かります。一方、和を取れば、打ち消し合う往復も含めて**どれだけジャンプが起きているか**が分かります。前者を確率流、後者を遷移活動度と呼びます。

空でない有限状態集合 $S$ に任意の全順序 $<$ を固定し、各辺を $x<y$ の向きで一度だけ数えます。時間 $t\in[0,\tau]$ における分布は $p_t(x)>0$、遷移率は $k_{xy}(t)>0$（$x\ne y$ で許した辺とその逆辺）とします。率と分布は時間について区分的連続で、分布は絶対連続、各量の積分は有限とします。許さない辺では両方向の率を零とし、和から除きます。これらは通常の有限状態master方程式

$$
\dot p_t(x)=\sum_{y\ne x}\{p_t(y)k_{yx}(t)-p_t(x)k_{xy}(t)\}
$$

を満たすとします。実験開始・終了の分布を勝手に定常分布と置く必要はありません。

<a id="def-itd8-flux-activity"></a>

<!-- formal-statement-start -->
> **定義（確率流と遷移活動度）**  
> 上の有限状態・双方向正率の模型で、許された各辺 $x<y$ について、前向き・後ろ向きの確率流量を $a_{xy}=p_t(x)k_{xy}(t)$、$b_{xy}=p_t(y)k_{yx}(t)$ とする。辺の正味確率流 $J_{xy}$ と活動度 $A_{xy}$ を

$$
J_{xy}(t)=a_{xy}(t)-b_{xy}(t),\qquad
A_{xy}(t)=a_{xy}(t)+b_{xy}(t)>0
$$

> と定める。全活動度 $\mathcal A(t)$ と時間 $[0,\tau]$ の平均ジャンプ回数 $N$ は

$$
\mathcal A(t)=\sum_{x<y}A_{xy}(t),\qquad
N=\int_0^\tau\mathcal A(t)\,dt
$$

> である。$\mathcal A$ は単位時間当たり、$N$ は無次元である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-itd8-flux-activity -->
### 直接例：往復流と正味流を分ける

**定義の確認**：各辺の前向き量と逆向き量は、確率と対応する遷移率の積です。

$p=(1/2,1/2)$、$k_{01}=1$、$k_{10}=3$（率の単位は毎秒）とします。まず両方向の量を一つずつ計算すると

$$
a_{01}=\tfrac12\cdot1=\tfrac12,\qquad
b_{01}=\tfrac12\cdot3=\tfrac32.
$$

従って $J_{01}=-1$（確率は $1\to0$ へ流れる）、$A_{01}=2$（両方向のジャンプを数える）です。master方程式の $\dot p_1=J_{01}=-1$ と一致します。確率流が $-1$ だからといって、期待ジャンプ回数が負になるわけではありません。
<!-- definition-example-end -->

活動度はジャンプ回数の**期待値**に対応します。時刻 $t$ に辺 $x\leftrightarrow y$ を通るジャンプの期待回数は短い時間 $dt$ で $(a_{xy}+b_{xy})dt+o(dt)$ なので、全辺・全時間で足すと $N$ です。実際の一つの標本経路で必ず $N$ 回跳ぶという意味ではありません。

## 2. 確率流に沿ったエントロピー生成と仕事の差額

各状態のエネルギー $E_t(x)$ は時間について連続かつ区分的に $C^1$ 級で、外から準位を動かせるとします（瞬間quenchの仕事はここでは含めません）。許された遷移には、その時刻の同じエネルギーと単一熱浴について[局所詳細釣合い](../ITD1/index.md#def-itd1-local-detailed-balance)

$$
\log\frac{k_{xy}(t)}{k_{yx}(t)}
=\beta\{E_t(x)-E_t(y)\}
$$

を課します。これは任意の率から自動的に従う恒等式ではなく、熱浴模型への仮定です。Shannonエントロピーを $H(p)=-\sum_xp(x)\log p(x)$、平均内部エネルギーを $U(t)=\sum_xp_t(x)E_t(x)$、非平衡自由エネルギーを $\mathcal F(t)=U(t)-k_{\mathrm B}TH(p_t)$ とします。この $\mathcal F$ は[ITD3の非平衡自由エネルギー](../ITD3/index.md#thm-itd3-work-bound)と同じ量です。

<a id="thm-itd8-entropy-rate"></a>

<!-- formal-statement-start -->
> **定理（瞬間エントロピー生成率と仕事収支）**  
> 上記の有限状態master方程式・双方向正率・単一熱浴の局所詳細釣合い・微分積分の正則性を満たすとする。系への平均仕事率と浴への平均放熱率を

$$
\dot W=\sum_xp_t(x)\dot E_t(x),\qquad
\dot Q_{\mathrm{bath}}=\sum_{x<y}J_{xy}\{E_t(x)-E_t(y)\}
$$

> とする。このとき無次元の全エントロピー生成率は

$$
\sigma(t)=\dot H(p_t)+\beta\dot Q_{\mathrm{bath}}
=\sum_{x<y}J_{xy}(t)\log\frac{a_{xy}(t)}{b_{xy}(t)}\ge0.
$$

> さらに $\Sigma=\int_0^\tau\sigma(t)\,dt$、$W=\int_0^\tau\dot W(t)\,dt$ とすれば

$$
W-\{\mathcal F(\tau)-\mathcal F(0)\}=k_{\mathrm B}T\Sigma.
$$

> $\sigma(t)=0$ は、その時刻の全許容辺で $a_{xy}=b_{xy}$ が成り立つことと同値である。
<!-- formal-statement-end -->

### 証明の見取り図

各辺の正味流 $J$ に、両端のエネルギー差または $\log p$ の差を掛けます。するとmaster方程式から内部エネルギーとShannonエントロピーの変化が求まります。最後に局所詳細釣合いを代入すると、同じ辺の二つの方向の量 $a,b$ の比になります。

<!-- proof-start -->
### 証明

master方程式で辺 $x<y$ の $x$ から $y$ への正味流は $J_{xy}$ なので、この辺の分布変化への寄与は $\dot p_x=-J_{xy}$、$\dot p_y=+J_{xy}$ です。$\sum_x\dot p_x=0$ を使い、$p_x>0$ で $H$ を微分すると

$$
\dot H=-\sum_x\dot p_x(\log p_x+1)
=\sum_{x<y}J_{xy}(\log p_x-\log p_y).
$$

一方、$U=\sum_xp_xE_x$ の積の微分と同じ辺の寄与から

$$
\dot U=\sum_xp_x\dot E_x+\sum_{x<y}J_{xy}(E_y-E_x)
=\dot W-\dot Q_{\mathrm{bath}}.
$$

局所詳細釣合いを代入し、二つの寄与を一つにまとめると

$$
\begin{aligned}
\dot H+\beta\dot Q_{\mathrm{bath}}
&=\sum_{x<y}J_{xy}\left\{\log\frac{p_x}{p_y}+\log\frac{k_{xy}}{k_{yx}}\right\}\\
&=\sum_{x<y}(a_{xy}-b_{xy})\log\frac{a_{xy}}{b_{xy}}.
\end{aligned}
$$

$\log$ は狭義単調増加なので、各項は非負で、零になるのは $a=b$ のときだけです。最後に $\mathcal F=U-k_{\mathrm B}TH$、$\beta^{-1}=k_{\mathrm B}T$ より

$$
k_{\mathrm B}T\sigma=k_{\mathrm B}T\dot H+\dot Q_{\mathrm{bath}}
=\dot W-\frac{d\mathcal F}{dt}.
$$

両辺を積分し、区分的微分可能な区間をつなぐと主張を得ます。
<!-- proof-end -->

この定理は「平均仕事が非平衡自由エネルギー差を上回った分」を、瞬間の双方向流の非対称性で分解したものです。[ITD5の可逆reset構成](../ITD5/index.md#prop-itd5-quasistatic-reset)は、時間を長く取って流の非対称性を小さくする仕組みでした。では限られた活動度で、分布を大きく動かすとどうなるでしょうか。

## 3. 流れを速くすると散逸する：対数の不等式

流が $J=a-b$ であり、往復の総量が $A=a+b$ だとします。$A$ が固定されたまま $|J|$ を大きくすれば、二方向の比 $a/b$ は1から離れます。これを明示的な不等式にします。

<a id="lem-itd8-log-flux"></a>

<!-- formal-statement-start -->
> **補題（対数比と確率流の不等式）**  
> 任意の $a,b>0$ に対し

$$
(a-b)\log\frac ab\ge\frac{2(a-b)^2}{a+b}.
$$

> 等号は $a=b$ の場合に限る。
<!-- formal-statement-end -->

### 証明の見取り図

$u=(a-b)/(a+b)$ と置くと $|u|<1$ です。比 $a/b$ は $(1+u)/(1-u)$ となり、$\log$ の差を積分で評価できます。

<!-- proof-start -->
### 証明

$a+b>0$ より $u\in(-1,1)$、$a/b=(1+u)/(1-u)$ です。関数 $f(u)=\log\{(1+u)/(1-u)\}$ は $f(0)=0$、

$$
f'(u)=\frac1{1+u}+\frac1{1-u}=\frac2{1-u^2}\ge2.
$$

$u\ge0$ なら $f(u)=\int_0^u f'(s)ds\ge2u$。$u\le0$ なら $f(u)=-\int_u^0 f'(s)ds\le2u$。従って両方の場合に $u f(u)\ge2u^2$ であり、

$$
(a-b)\log(a/b)=(a+b)u f(u)
\ge2(a+b)u^2=\frac{2(a-b)^2}{a+b}.
$$

$u\ne0$ のとき積分区間の正の長さを持つ部分で $f'(s)>2$ となるので、等号は $u=0$ のみです。
<!-- proof-end -->

### 直接計算：流の非対称性と散逸

$a=3$, $b=1$ なら $J=2$, $A=4$ です。左辺は $2\log3\simeq2.197$、右辺は $2\cdot4/4=2$ です。反対向きへ両値を入れ替えても、$J$ と $\log(a/b)$ の符号が同時に反転し、散逸は変わりません。

## 4. 総変動距離と有限時間の速度限界

確率が状態間を移動した「距離」を、分布の成分差から計ります。有限集合では、各状態で増減した確率の絶対値を足して2で割れば、片側から他側へ移動した正味確率の量になります。これを総変動距離と呼びます。

<a id="def-itd8-total-variation"></a>

<!-- formal-statement-start -->
> **定義（有限状態の総変動距離）**  
> 同じ有限状態集合 $S$ 上の確率分布 $p,q$ について

$$
d_{\mathrm{TV}}(p,q)=\frac12\sum_{x\in S}|p(x)-q(x)|
$$

> と定める。$0\le d_{\mathrm{TV}}\le1$ で、零は $p=q$ と同値である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-itd8-total-variation -->
### 直接例：ビットの消去量

**定義の確認**：各状態の確率の差の絶対値を足し、増加側と減少側を二重に数えないため2で割ります。

一様ビット $p=(1/2,1/2)$ を $r=(3/4,1/4)$ へ変えた場合、

$$
d_{\mathrm{TV}}(p,r)=\tfrac12\bigl(|\tfrac12-\tfrac34|+|\tfrac12-\tfrac14|\bigr)=\tfrac14.
$$

同じ量 $1/4$ が状態1から状態0へ移りました。一般の $r=(1-\varepsilon,\varepsilon)$、$0\le\varepsilon\le1/2$ では距離は $1/2-\varepsilon$ です。定義の $1/2$ を忘れると、同じ移動を増加側と減少側で二重に数えます。
<!-- definition-example-end -->

<a id="thm-itd8-speed-limit"></a>

<!-- formal-statement-start -->
> **定理（有限時間の散逸と活動度の速度限界）**  
> [瞬間エントロピー生成率の定理](#thm-itd8-entropy-rate)の全仮定を満たす有限状態ジャンプ過程を $[0,\tau]$ で考える。$N=\int_0^\tau\mathcal A(t)dt>0$ とし、始点・終点分布の総変動距離を $d=d_{\mathrm{TV}}(p_0,p_\tau)$ とすると

$$
\Sigma\ge\frac{2d^2}{N},\qquad
W\ge\Delta\mathcal F+\frac{2k_{\mathrm B}Td^2}{N}.
$$

> 特に全活動度がほとんど至る所で $\mathcal A(t)\le K$（$K>0$ は時間当たりの上限）なら $N\le K\tau$ なので

$$
\Sigma\ge\frac{2d^2}{K\tau},\qquad
W\ge\Delta\mathcal F+\frac{2k_{\mathrm B}Td^2}{K\tau}.
$$

> $N=0$ の場合は $p_\tau=p_0$ であり、$d=0$ とするが $2d^2/N$ の商は定義しない。
<!-- formal-statement-end -->

### 証明の見取り図

[対数比の補題](#lem-itd8-log-flux)で流れの二乗を散逸で抑え、辺についてのCauchy–Schwarzで「正味流量の合計」を評価します。次にmaster方程式を積分して、分布の始点と終点の距離が、途中の正味流量の合計を超えないと示します。最後に時間についてもう一度Cauchy–Schwarzを使います。

<!-- proof-start -->
### 証明

各辺で $a_{xy},b_{xy}>0$ です。[対数比と確率流の不等式](#lem-itd8-log-flux)を各辺へ適用すると

$$
\sigma(t)\ge 2\sum_{x<y}\frac{J_{xy}(t)^2}{A_{xy}(t)}.
$$

$L(t)=\sum_{x<y}|J_{xy}(t)|$ と置きます。有限個の辺へのCauchy–Schwarz不等式を $|J_{xy}|/\sqrt{A_{xy}}$ と $\sqrt{A_{xy}}$ に適用すれば

$$
L(t)^2\le\left(\sum_{x<y}\frac{J_{xy}^2}{A_{xy}}\right)
\left(\sum_{x<y}A_{xy}\right)
\le\frac{\sigma(t)}2\mathcal A(t)
$$

です。時間方向では $\int_0^\tau L(t)dt$ にCauchy–Schwarzを用い、

$$
\begin{aligned}
\left(\int_0^\tau L(t)dt\right)^2
&=\left(\int_0^\tau\frac{L(t)}{\sqrt{\mathcal A(t)}}\sqrt{\mathcal A(t)}dt\right)^2\\
&\le\left(\int_0^\tau\frac{L(t)^2}{\mathcal A(t)}dt\right)
\left(\int_0^\tau\mathcal A(t)dt\right)\\
&\le\frac{\Sigma N}{2}.
\end{aligned}
$$

許容辺の全活動度が零の時刻にはすべての $J$ も零なので、$L/\sqrt{\mathcal A}$ は零と定めます。次にmaster方程式を各 $x$ で時間積分し、三角不等式を二度使うと

$$
\begin{aligned}
2d&=\sum_x\left|\int_0^\tau\dot p_t(x)dt\right|
\le\int_0^\tau\sum_x|\dot p_t(x)|dt\\
&\le\int_0^\tau 2\sum_{x<y}|J_{xy}(t)|dt
=2\int_0^\tau L(t)dt.
\end{aligned}
$$

各辺の流 $J_{xy}$ は $x$ 側と $y$ 側に符号を反転して1回ずつ現れるため、二行目の係数2が出ます。以上から $d^2\le\Sigma N/2$、すなわち $\Sigma\ge2d^2/N$ です。仕事の式は[前節の収支](#thm-itd8-entropy-rate)に代入します。$N\le K\tau$ なら $N>0$ のもとで $1/N\ge1/(K\tau)$。$N=0$ ならほとんど至る所で全辺の流が零で、master方程式から分布は変化しません。
<!-- proof-end -->

この下限は $d>0$ かつ有限の $N$ なら正です。ただし「有限時間」だけから普遍的な正の加算値が生じるわけではありません。遷移率をいくらでも大きくできる模型では同じ時間内でも $N$ を増やせます。**速さの制約を何で測ったか**（活動度 $N$ か、活動度率 $K$ か）を忘れないでください。

## 5. 二状態の緩和と有限時間Landauer評価

まず制御をしない二状態緩和を計算して、何が時間とともに減るかを見ます。$k_{01}=1$、$k_{10}=3$（毎秒）、$p_1(0)=1/2$ と置くと、master方程式は

$$
\dot p_1=(1-p_1)-3p_1=1-4p_1.
$$

$q(t)=p_1(t)-1/4$ と置けば $\dot q=-4q$、$q(0)=1/4$ なので

$$
p_1(t)=\frac14+\frac14e^{-4t},\quad
J_{01}(t)=-e^{-4t},\quad
\mathcal A(t)=\frac32+\frac12e^{-4t}.
$$

従って $d=(1-e^{-4\tau})/4$、$N=3\tau/2+(1-e^{-4\tau})/8$ です。開始時には $\sigma(0)=(-1)\log\{(1/2)/(3/2)\}=\log3>0$、十分長い時間の後には流が零へ近づきます。これは $E(1)-E(0)=k_{\mathrm B}T\log3$ の**固定された非対称準位**での緩和です。初期・終端を等エネルギーに戻すreset操作とは異なるので、この例へ直ちに $k_{\mathrm B}T\log2$ を代入してはいけません。

では、記憶ビットの始点・終点をどちらも $E(0)=E(1)=0$ とし、途中で準位を操作して $p_0=(1/2,1/2)$ から $p_\tau=(1-\varepsilon,\varepsilon)$ へ運ぶ有限時間のresetを考えます。$0<\varepsilon\le1/2$ とし、熱浴は単一温度、許容遷移は双方向正率、全過程は本章のmaster方程式を満たすとします。[ITD5の誤り付きreset](../ITD5/index.md#prop-itd5-biased-error)で用いた二値エントロピーは $h(\varepsilon)=-(1-\varepsilon)\log(1-\varepsilon)-\varepsilon\log\varepsilon$ です。

<a id="cor-itd8-finite-reset"></a>

<!-- formal-statement-start -->
> **系（誤り付き二状態resetの有限時間仕事下限）**  
> 上記の等エネルギー両端・一様初期分布・終端誤り率 $0<\varepsilon\le1/2$ の二状態resetで、平均ジャンプ回数 $N>0$ が有限なら

$$
W_{\mathrm{reset}}\ge k_{\mathrm B}T
\left\{\log2-h(\varepsilon)+\frac{2(1/2-\varepsilon)^2}{N}\right\}.
$$

> 両方向の瞬間遷移率が常に $K>0$ 以下なら $\mathcal A(t)\le K$ となり、同じ下限の $N$ を $K\tau$ に置き換えられる。
<!-- formal-statement-end -->

### 証明の見取り図

終端で二状態が等エネルギーなので平均エネルギー変化は零です。自由エネルギー差はShannonエントロピーの減少に $k_{\mathrm B}T$ を掛けたものです。あとは[有限時間の速度限界](#thm-itd8-speed-limit)を適用します。

<!-- proof-start -->
### 証明

初期・終端のエネルギーがいずれも零なので、$\Delta U=0$ です。$H(p_0)=\log2$、$H(p_\tau)=h(\varepsilon)$ より

$$
\Delta\mathcal F=\Delta U-k_{\mathrm B}T\{H(p_\tau)-H(p_0)\}
=k_{\mathrm B}T\{\log2-h(\varepsilon)\}.
$$

[有限状態の総変動距離](#def-itd8-total-variation)に二つの分布を代入すると $d=1/2-\varepsilon$ です。[速度限界](#thm-itd8-speed-limit)の $W\ge\Delta\mathcal F+2k_{\mathrm B}Td^2/N$ に代入して主張を得ます。$k_{01}(t),k_{10}(t)\le K$ なら

$$
\mathcal A(t)=p_t(0)k_{01}(t)+p_t(1)k_{10}(t)
\le K\{p_t(0)+p_t(1)\}=K
$$

なので $N\le K\tau$ です。
<!-- proof-end -->

### 直接例：四分の一の誤りを残すreset

$\varepsilon=1/4$、$N=2$ と測定されたなら $d=1/4$ なので、上乗せの下限は $2(1/4)^2/2=1/16$ です。従って

$$
W_{\mathrm{reset}}\ge k_{\mathrm B}T
\{\log2-h(1/4)+1/16\}.
$$

$N=2$ は装置の一回の運転で観察されたジャンプ数そのものではなく、同じ操作を繰り返したときの**平均**です。この評価は与えられた $\varepsilon$ と $N$ で実現可能な装置の仕事下限であり、等号達成を主張していません。

なお、率上限から $d\le\int_0^\tau L(t)dt\le N\le K\tau$ も必要です。たとえば $K\tau<1/2-\varepsilon$ なら、その誤り率へのreset自体が不可能です。また総変動距離が零でも、循環する確率流によって散逸が正になることがあります。速度限界は散逸の**下限**であって、散逸を総変動距離だけで決定する公式ではありません。[ITD7の定常二浴熱流](../ITD7/index.md#prop-itd7-two-bath-current)は、その違いを理解するための例です。ただしITD7の二浴模型に、本章の単一浴の仕事式をそのまま当てはめてはいけません。

## 6. どこまで使えるか

| 条件 | この章の結論 | 条件を外した場合 |
| --- | --- | --- |
| 有限状態、正の双方向遷移率 | 流の対数比と非負性を辺ごとに計算 | 片方向だけが許されると対数が発散し、支持の扱いが必要 |
| 単一温度と局所詳細釣合い | $W-\Delta\mathcal F=k_{\mathrm B}T\Sigma$ | 複数浴では浴別の $\beta_rQ_r$ を区別する |
| 有限の平均ジャンプ回数 $N$ | $\Sigma\ge2d^2/N$ | 活動度を観測・制御できない場合は数値下限を確定できない |
| 全活動度率の上限 $K$ | 有限時間 $\tau$ に応じた $1/(K\tau)$ の下限 | 時間制約だけで一定の追加費用を主張できない |
| 等エネルギー両端の二状態reset | $\log2-h(\varepsilon)$ と散逸の上乗せ | 終端エネルギーを変えたなら自由エネルギー差を再計算 |

複数熱浴・非Markov性・量子測定・連続状態の経路を扱うには、それぞれの確率・エネルギー・情報の定義と適用条件を作り直す必要があります。有限状態の補題があるからといって、それらの仕事下限まで証明済みにはなりません。

## 7. 演習：有限時間の代償を再構成する

以下では特記なければ自然対数、単一浴温度 $T>0$、無次元のエントロピー生成 $\Sigma$ を用います。各問では確率流の向き、活動度の単位、仕事の正負を確認してください。

### Level A：定義と数値下限

#### A1. 二状態の正味流とジャンプ活動度

$p=(1/2,1/2)$、$k_{01}=2$、$k_{10}=4$（毎秒）とする。$J_{01}$、$A_{01}$、$\dot p_1$、$\sigma$ を求めよ。

- Level: A
- ID: ITD8-A1

<!-- solution-start -->
**詳細解答**

前向き量は $a_{01}=(1/2)2=1$、逆向き量は $b_{01}=(1/2)4=2$ です。[確率流と遷移活動度](#def-itd8-flux-activity)より $J_{01}=1-2=-1$、$A_{01}=1+2=3$（毎秒）。master方程式より $\dot p_1=J_{01}=-1$（毎秒）。[エントロピー生成率の定理](#thm-itd8-entropy-rate)で $\sigma=J\log(a/b)=(-1)\log(1/2)=\log2$（毎秒）です。活動度と散逸は非負ですが、向き付き流は負になれます。
<!-- solution-end -->

#### A2. 対数不等式の数値検算

$a=4$, $b=1$ に対し、$J$, $A$, $(a-b)\log(a/b)$ と $2J^2/A$ を求め、不等式の方向を確認せよ。

- Level: A
- ID: ITD8-A2

<!-- solution-start -->
**詳細解答**

$J=4-1=3$、$A=4+1=5$。左辺は $3\log4\simeq4.159$、右辺は $2\cdot9/5=18/5=3.6$ です。[対数比の補題](#lem-itd8-log-flux)の左辺が右辺より大きく、$a\ne b$ なので等号にはなりません。単に $\log4>0$ とだけ確認しても定量下限の検算にはなりません。
<!-- solution-end -->

#### A3. 三状態での総変動距離

$p=(1/2,1/3,1/6)$ と $q=(1/3,1/2,1/6)$ の総変動距離を求めよ。どの状態間で正味確率が動いたと読めるか。

- Level: A
- ID: ITD8-A3

<!-- solution-start -->
**詳細解答**

[有限状態の総変動距離](#def-itd8-total-variation)より

$$
d_{\mathrm{TV}}(p,q)=\frac12\left(\frac16+\frac16+0\right)=\frac16.
$$

第1状態の確率が $1/6$ 減り、第2状態が $1/6$ 増えたと解釈できます。実際に第1状態から第2状態へ直接ジャンプしたかどうかは、始点・終点分布だけでは分かりません。
<!-- solution-end -->

#### A4. 与えられたジャンプ予算から散逸を制限する

ある有限状態過程の始点と終点の総変動距離が $d=2/5$、平均ジャンプ回数が $N=2$ である。無次元の $\Sigma$ の下限を求めよ。

- Level: A
- ID: ITD8-A4

<!-- solution-start -->
**詳細解答**

[有限時間の速度限界](#thm-itd8-speed-limit)に $d=2/5$、$N=2$ を代入すると

$$
\Sigma\ge\frac{2(2/5)^2}{2}=\frac4{25}.
$$

距離を二乗する点と、分母が運転時間ではなく平均ジャンプ回数である点を確認します。この値は下限であり、実際の $\Sigma$ が等しいと断定できません。
<!-- solution-end -->

#### A5. 誤り付き消去の追加仕事

等エネルギー両端の一様ビットを誤り率 $\varepsilon=1/4$ へresetし、平均ジャンプ回数が $N=1$ とする。仕事の下限を $k_{\mathrm B}T$ を単位として書け。

- Level: A
- ID: ITD8-A5

<!-- solution-start -->
**詳細解答**

出発分布と終端分布の距離は $d=1/2-1/4=1/4$。エネルギー差が両端で零なので自由エネルギー差は $k_{\mathrm B}T\{\log2-h(1/4)\}$ です。[有限時間resetの系](#cor-itd8-finite-reset)へ $N=1$ を代入すると

$$
\frac{W_{\mathrm{reset}}}{k_{\mathrm B}T}
\ge\log2-h(1/4)+\frac{2(1/4)^2}{1}
=\log2-h(1/4)+\frac18.
$$

$\log2$ だけを答えにすると、終端誤りによる緩和分と、有限活動度による上乗せを両方見落とします。
<!-- solution-end -->

### Level B：仮定と中間式を自分で作る

#### B1. master方程式から収支式へ

有限状態の双方向正率過程で $\log(k_{xy}/k_{yx})=\beta(E_x-E_y)$ とする。$\dot H$ と $\dot U$ を向き付き流 $J_{xy}$ の辺和に書き直し、$\sigma=\sum_{x<y}J_{xy}\log(a_{xy}/b_{xy})$ を導け。

- Level: B
- ID: ITD8-B1

<!-- solution-start -->
**詳細解答**

$x<y$ の正味流は $x$ の確率を $-J_{xy}$、$y$ の確率を $+J_{xy}$ だけ毎秒変えます。従って $H=-\sum_xp_x\log p_x$ を微分し、$\sum\dot p_x=0$ を使うと

$$
\dot H=-\sum_x\dot p_x\log p_x
=\sum_{x<y}J_{xy}(\log p_x-\log p_y).
$$

一方、$U=\sum_xp_xE_x$ では、$\dot E_x$ の寄与を仕事率 $\dot W$ とし、分布の移動の寄与を辺ごとにまとめて

$$
\dot U=\dot W+\sum_{x<y}J_{xy}(E_y-E_x)
=\dot W-\dot Q_{\mathrm{bath}}.
$$

浴の局所詳細釣合いから $\beta(E_x-E_y)=\log(k_{xy}/k_{yx})$ を代入すると

$$
\sigma=\dot H+\beta\dot Q_{\mathrm{bath}}
=\sum_{x<y}J_{xy}\log\frac{p_xk_{xy}}{p_yk_{yx}}
=\sum_{x<y}(a_{xy}-b_{xy})\log\frac{a_{xy}}{b_{xy}}.
$$

最後の形は各辺で非負です。単一浴と局所詳細釣合いを使った場所を明示したので、一般の非熱的な率にこの結論を無条件で持ち込んではいません。
<!-- solution-end -->

#### B2. 速度限界を三段階で再導出する

有限個の正の活動度 $A_e$ と確率流 $J_e$ を持つ過程で、$\sigma\ge2\sum_eJ_e^2/A_e$ とする。辺のCauchy–Schwarz、時間のCauchy–Schwarz、master方程式を使い、$\Sigma\ge2d_{\mathrm{TV}}(p_0,p_\tau)^2/N$ を示せ。

- Level: B
- ID: ITD8-B2

<!-- solution-start -->
**詳細解答**

まず $L=\sum_e|J_e|$、$\mathcal A=\sum_eA_e$ とすると

$$
L^2=\left(\sum_e\frac{|J_e|}{\sqrt{A_e}}\sqrt{A_e}\right)^2
\le\left(\sum_e\frac{J_e^2}{A_e}\right)\mathcal A
\le\frac12\sigma\mathcal A.
$$

次に時間方向で $\int L=\int(L/\sqrt{\mathcal A})\sqrt{\mathcal A}$ と分けてCauchy–Schwarzを適用すると $\left(\int L\right)^2\le(\Sigma/2)N$ です。最後に辺の $J_e$ は両端の $\dot p$ に反対符号で寄与するため、

$$
2d_{\mathrm{TV}}(p_0,p_\tau)=\sum_x\left|\int_0^\tau\dot p_xdt\right|
\le\int_0^\tau\sum_x|\dot p_x|dt\le2\int_0^\tau Ldt.
$$

よって $d_{\mathrm{TV}}^2\le\Sigma N/2$。$N>0$ なら両辺を $N/2$ で割り、$\Sigma\ge2d_{\mathrm{TV}}^2/N$ を得ます。$N=0$ は分布が動かない別の場合で、零除算しません。
<!-- solution-end -->

#### B3. 固定準位の二状態緩和

$k_{01}=1$、$k_{10}=3$（毎秒）、$p_1(0)=1/2$ の二状態過程について、$p_1(t)$、$J_{01}(t)$、$\mathcal A(t)$、$N$ を出発点から求めよ。これは等エネルギー両端のresetか。

- Level: B
- ID: ITD8-B3

<!-- solution-start -->
**詳細解答**

master方程式 $\dot p_1=(1-p_1)-3p_1=1-4p_1$ を、$q=p_1-1/4$ で $\dot q=-4q$ に直します。$q(0)=1/4$ より $q(t)=(1/4)e^{-4t}$。従って

$$
p_1(t)=\frac{1+e^{-4t}}4,\qquad
J_{01}=(1-p_1)-3p_1=-e^{-4t},
$$

$$
\mathcal A=(1-p_1)+3p_1=1+2p_1=\frac32+\frac12e^{-4t}.
$$

よって

$$
N=\int_0^\tau\mathcal A(t)dt
=\frac{3\tau}2+\frac{1-e^{-4\tau}}8.
$$

局所詳細釣合いは $\log(1/3)=\beta(E_0-E_1)$ を要求するので $E_1-E_0=k_{\mathrm B}T\log3$ です。両端で等エネルギー準位のresetではなく、準位を固定した緩和です。ここにLandauerの等エネルギー公式を代入してはいけません。
<!-- solution-end -->

#### B4. 正の散逸と零の分布変化

三状態 $0,1,2$ で、各辺の一方向の確率流量 $a_e$ を3、逆向きの量 $b_e$ を1とし、向き $0\to1\to2\to0$ に同じ流れを循環させる。$p=(1/3,1/3,1/3)$ が一定になること、$\sigma$ が正であることを確かめよ。また単一浴の局所詳細釣合いと時間不変エネルギーの両方を満たす例として扱えるか説明せよ。

- Level: B
- ID: ITD8-B4

<!-- solution-start -->
**詳細解答**

各向きの正味流は $J_e=a_e-b_e=2$ です。各状態には一つの辺から流量2が入り、次の辺へ2が出るので、$\dot p_x=2-2=0$。従って始点と終点の総変動距離は零です。一方、各辺で $J_e\log(a_e/b_e)=2\log3$ が生じ、三辺を足せば $\sigma=6\log3>0$ です。

ただし、ここで計算した $\sigma$ は確率流の対数比の形式的な和であって、単一熱浴の熱力学的エントロピー生成と同一視できるとは限りません。各辺の $p_x$ は同じなので、指定された流量比を実現する率は各周回方向で $k_{xy}/k_{yx}=3$ となります。単一浴で固定エネルギーがあるなら局所詳細釣合いは三辺を足した

$$
\log\frac{k_{01}}{k_{10}}+\log\frac{k_{12}}{k_{21}}
+\log\frac{k_{20}}{k_{02}}
=\beta\{(E_0-E_1)+(E_1-E_2)+(E_2-E_0)\}=0
$$

を要求しますが、左辺は $3\log3\ne0$。従って**この循環率は単一浴・固定エネルギーの模型では実現不能**です。非熱的な駆動や複数浴など別の機構が必要です。それでも確率流・活動度の数学的下限が「分布が変わらないなら散逸零」という逆を意味しないことを示します。
<!-- solution-end -->

### Level C：前提を合わせて境界を判定する

#### C1. 有限時間で記憶を消去する設計の判定

等エネルギー二状態の記憶を $p_0=(1/2,1/2)$ から $r=(3/4,1/4)$ へ、時間 $\tau$ 内に単一温度浴と準位制御でresetする。途中の全率は双方向正で局所詳細釣合いを満たし、各瞬間の両方向遷移率は $K$ 以下とする。

1. 達成可能性に必要な $K\tau$ の下限を示せ。
2. 達成可能なら $W_{\mathrm{reset}}$ と $Q_{\mathrm{bath}}$ の下限を求めよ。
3. $K\tau=1/8$ という提案と、「$\tau$ が有限だから、率の制限がなくても一律に追加の $k_{\mathrm B}T/8$ が必要」という提案を、それぞれ判定せよ。

- Level: C
- ID: ITD8-C1

<!-- solution-start -->
**詳細解答**

**1. 到達可能性。** [有限状態の総変動距離](#def-itd8-total-variation)から $d=1/4$。master方程式と $|J_{01}|\le A_{01}$ より

$$
\frac14=d=\left|\int_0^\tau J_{01}(t)dt\right|
\le\int_0^\tau|J_{01}|dt
\le\int_0^\tau A_{01}dt=N.
$$

率がそれぞれ $K$ 以下なら $A_{01}=p_0k_{01}+p_1k_{10}\le K$ なので $N\le K\tau$。従って必要条件は $K\tau\ge1/4$ です。これは十分条件ではありません。特に正率で $|J|<A$ なので、非零の分布移動を有限時間で実現するには実際には $K\tau>1/4$ が必要です。

**2. 仕事と放熱。** [ITD5の誤り付き仕事下限](../ITD5/index.md#prop-itd5-biased-error)では両端の内部エネルギー差が零で、$\Delta\mathcal F=k_{\mathrm B}T\{\log2-h(1/4)\}$。本章の[有限時間resetの系](#cor-itd8-finite-reset)と $N\le K\tau$ から

$$
W_{\mathrm{reset}}\ge k_{\mathrm B}T
\left\{\log2-h(1/4)+\frac{1}{8K\tau}\right\}.
$$

同じ両端エネルギーなので第一法則 $0=W_{\mathrm{reset}}-Q_{\mathrm{bath}}$ より $Q_{\mathrm{bath}}=W_{\mathrm{reset}}$。放熱にも同じ下限が成立します。ここで仕事は記憶にした仕事、浴熱は浴へ出た熱を正としています。

**3. 二案の判定。** $K\tau=1/8$ は必要条件 $K\tau\ge1/4$ を破るため、どれほど大きな仕事を用意してもこの模型では実現できません。他方 $k_{\mathrm B}T/8$ という一定の追加量は、率上限のない有限時間条件だけからは導けません。上式の追加項は $k_{\mathrm B}T/(8K\tau)$ で、$K$ を大きくすればこの下限は小さくなります。率の上限を隠した主張と、達成不能な速度の主張を分けて退けます。
<!-- solution-end -->
