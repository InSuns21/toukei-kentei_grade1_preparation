# SM2 微正準アンサンブルとBoltzmannエントロピー

[SM1の有限アンサンブル](../SM1/index.md#def-sm1-ensemble)では、どの微視的状態にも確率を自由に指定できました。また[エネルギー窓の状態数](../SM1/index.md#def-sm1-density-of-states)を数えました。しかし孤立系について、どの状態をどの確率で数えるかはまだ決めていません。状態数が大きいだけで、確率が一様になるわけではありません。

この章では「エネルギー制約で許される状態に等しい確率を置く」という**追加の統計的仮定**を明示します。その上で、状態数の対数がなぜ重要か、二つの系がエネルギーを交換すると何が起きるか、温度を状態数から読むには何がさらに必要かを、有限模型から順に導きます。[TH4で構成した熱力学的エントロピー](../../TH/TH4/index.md#def-th4-entropy)との一致は、単なる数え上げからは出ないことにも注意します。

## 1. エネルギーが決まれば、確率も決まるのか

エネルギーが一定範囲にある孤立系を考えます。エネルギーを測る精度が有限なら、窓幅を固定して対象の状態を選ぶのが自然です。ここで「許される」という条件と「等確率」という条件は別々です。

<a id="def-sm2-microcanonical"></a>

<!-- formal-statement-start -->
> **定義（有限微正準アンサンブル）**  
> 空でない有限集合 $\Omega$、エネルギー関数 $H:\Omega\to\mathbb R$、$E\in\mathbb R$、$\Delta>0$ を固定する。[SM1の半開エネルギー窓](../SM1/index.md#def-sm1-density-of-states)を

$$
\Gamma_{E,\Delta}=\{\omega\in\Omega:E\le H(\omega)<E+\Delta\},
\qquad W(E,\Delta)=|\Gamma_{E,\Delta}|
$$

> と書き、$W(E,\Delta)\ge1$ と仮定する。有限微正準アンサンブルとは、確率

$$
p_{\mathrm{mc}}(\omega)=
\begin{cases}
1/W(E,\Delta),&\omega\in\Gamma_{E,\Delta},\\
0,&\omega\notin\Gamma_{E,\Delta}
\end{cases}
$$

> を指定した有限アンサンブルである。離散準位 $u\in H(\Omega)$ のみを許す場合は、$\Gamma_u=\{\omega:H(\omega)=u\}$ と $W(u)=|\Gamma_u|$ を使う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sm2-microcanonical -->
### 例：二スピンの窓を選ぶ

**定義の確認**：$\Omega=\{-1,+1\}^2$、$h>0$、

$$
H(\sigma)=-h(\sigma_1+\sigma_2)
$$

とします。[SM1の準位の例](../SM1/index.md#def-sm1-density-of-states)によれば $-2h,0,2h$ の多重度は $1,2,1$ です。$E=0,\Delta=2h$ とすると窓は $[0,2h)$ なので $\Gamma_{0,2h}=\{(+,-),(-,+)\}$、$W=2$ です。許される二配置の確率はそれぞれ $1/2$、残りの確率は0で、和は1です。$2h$ の準位は**右端なので入らない**ことを確認してください。
<!-- definition-example-end -->

この一様性は、状態の時間発展が必ず全配置を均等に巡るという定理ではありません。系の時間発展でエネルギー以外にも値が変わらない量があれば、その値によって到達可能な状態集合をさらに制限する必要があります。微正準分布は、どの集合を許容するかを固定した上で採用する平衡記述のモデルです。

<a id="prop-sm2-uniform-observables"></a>

<!-- formal-statement-start -->
> **命題（微正準分布の規格化と観測量）**  
> [有限微正準アンサンブル](#def-sm2-microcanonical)に対し、$p_{\mathrm{mc}}$ は確率分布であり、任意の $A:\Omega\to\mathbb R$ と集合 $B\subseteq\Gamma_{E,\Delta}$ について

$$
\mathbb E_{\mathrm{mc}}[A]
=\frac{1}{W(E,\Delta)}
 \sum_{\omega\in\Gamma_{E,\Delta}}A(\omega),
\qquad
P_{\mathrm{mc}}(B)=\frac{|B|}{W(E,\Delta)}
$$

> が成り立つ。とくに巨視的写像 $M$ の値 $m$ の確率は、窓と $M^{-1}(\{m\})$ の共通部分の状態数を $W(E,\Delta)$ で割ったものである。
<!-- formal-statement-end -->

### 証明の見取り図

窓の外の確率は0で、窓の中には同じ重みをちょうど $W(E,\Delta)$ 回足します。巨視的状態の多重度は窓の中だけで数え直します。

<!-- proof-start -->
### 証明

$W=W(E,\Delta)\ge1$ とおきます。$p_{\mathrm{mc}}\ge0$ であり、

$$
\sum_{\omega\in\Omega}p_{\mathrm{mc}}(\omega)
=\sum_{\omega\in\Gamma_{E,\Delta}}\frac1W
=W\frac1W=1
$$

です。期待値は有限和の定義から、窓外の項を消して第一式を得ます。$B\subseteq\Gamma_{E,\Delta}$ なら

$$
P_{\mathrm{mc}}(B)
=\sum_{\omega\in B}\frac1W=\frac{|B|}{W}.
$$

最後に $B=\Gamma_{E,\Delta}\cap M^{-1}(\{m\})$ と選び、[SM1の巨視的確率の定義](../SM1/index.md#prop-sm1-pushforward)に代入します。窓に含まれない状態は $M=m$ を満たしても寄与しません。
<!-- proof-end -->

## 2. 状態数を掛け算から足し算に変える

許される状態が2倍、3倍となるとき、その状態数の違いをどのような量で表すと、独立な二つの系を合わせやすいでしょうか。数の積を和に変換する自然対数を使います。

<a id="def-sm2-boltzmann-entropy"></a>

<!-- formal-statement-start -->
> **定義（Boltzmannエントロピー）**  
> 有限で $W(E,\Delta)\ge1$ のエネルギー窓を指定し、正の定数 $k_{\mathrm B}$（Boltzmann定数）に対して

$$
S_{\mathrm B}(E,\Delta)=k_{\mathrm B}\log W(E,\Delta)
$$

> と定める。$k_{\mathrm B}$ の単位を $\mathrm{J/K}$ とすれば $S_{\mathrm B}$ も $\mathrm{J/K}$ である。離散的な厳密エネルギー準位では $S_{\mathrm B}(u)=k_{\mathrm B}\log W(u)$ とする。対数は自然対数とし、$W=0$ にはこの定義を適用しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sm2-boltzmann-entropy -->
### 例：一状態と四状態

**定義の確認**：許容集合が一状態なら $W=1$ で $S_{\mathrm B}=k_{\mathrm B}\log1=0$ です。四状態なら $S_{\mathrm B}=k_{\mathrm B}\log4=2k_{\mathrm B}\log2$。これは許容状態の数を表す情報で、エネルギーの値そのものではありません。エネルギー窓を取り替えて $W$ が変わればエントロピーも変わります。
<!-- definition-example-end -->

エントロピーの絶対値には模型の状態の数え方や窓の選択が反映されます。[TH4のエントロピー](../../TH/TH4/index.md#def-th4-entropy)は可逆熱積分から状態差を構成したもので、両者を物理的に同一視するには、巨視的な熱力学と統計模型が整合することを別途示す必要があります。また、任意の非一様分布に対する確率のエントロピーと、**許容状態数の対数**は定義が異なります。

## 3. 二つの系を合わせたときの状態数

系Aと系Bがそれぞれ状態集合 $\Omega_A,\Omega_B$ を持ち、複合系の状態を組 $(a,b)$ と数え、相互作用エネルギーを無視できるとします。このとき総エネルギーは $H_A(a)+H_B(b)$ です。各系のエネルギーまで**別々に固定**するか、**合計だけ固定**するかによって、数え上げの仕方が変わります。

<a id="def-sm2-additive-composite"></a>

<!-- formal-statement-start -->
> **定義（加法的な複合有限系）**  
> 空でない有限集合 $\Omega_A,\Omega_B$ と関数 $H_A:\Omega_A\to\mathbb R$、$H_B:\Omega_B\to\mathbb R$ に対して、複合系を

$$
\Omega_{AB}=\Omega_A\times\Omega_B,\qquad
H_{AB}(a,b)=H_A(a)+H_B(b)
$$

> とする。この定義では組 $(a,b)$ を重複なく数え、系間の相互作用項は含めない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sm2-additive-composite -->
### 例：二組の二準位模型

**定義の確認**：AとBがそれぞれ状態 $\{0,1\}$ を持ち、エネルギーを $H_A(a)=\varepsilon a$、$H_B(b)=\varepsilon b$（$\varepsilon>0$）とすると、複合状態は四組あります。$(0,1),(1,0)$ の総エネルギーはともに $\varepsilon$、$(0,0)$ は0、$(1,1)$ は $2\varepsilon$ です。加法性と組の一意性を両方確認できました。
<!-- definition-example-end -->

<a id="prop-sm2-composite-counting"></a>

<!-- formal-statement-start -->
> **命題（固定分割の積と総エネルギーの畳み込み）**  
> [加法的な複合有限系](#def-sm2-additive-composite)で、各系の厳密準位の状態数を $W_A(u)=|\{a:H_A(a)=u\}|$、$W_B(v)=|\{b:H_B(b)=v\}|$ とし、存在しない準位の状態数は0と約束する。各系のエネルギーを $u,v$ に固定した組の数は $W_A(u)W_B(v)$ であり、総エネルギーだけを $U$ に固定した状態数は

$$
W_{AB}(U)=\sum_{u\in H_A(\Omega_A)}
  W_A(u)\,W_B(U-u)
$$

> である。最初の固定分割で両状態数が正なら、Boltzmannエントロピーは加法的になる。

$$
S_{\mathrm B,AB}(u,v)
=S_{\mathrm B,A}(u)+S_{\mathrm B,B}(v).
$$
<!-- formal-statement-end -->

### 証明の見取り図

一つの分割 $u,v$ に限ればAの状態選択とBの状態選択を独立に組にでき、積の法則になります。総エネルギーしか指定しなければ、可能な $u$ を全部足すので、一般には積ではなく**積の和**です。

<!-- proof-start -->
### 証明

$A_u=\{a:H_A(a)=u\}$、$B_v=\{b:H_B(b)=v\}$ とおきます。写像 $(a,b)\mapsto(a,b)$ によって、エネルギー分割を指定した複合状態の集合は厳密に $A_u\times B_v$ です。したがって、その要素数は

$$
|A_u\times B_v|=|A_u|\,|B_v|=W_A(u)W_B(v).
$$

総エネルギー $U$ の状態 $(a,b)$ を一つ取ると、$u=H_A(a)$ は一意で $H_B(b)=U-u$ です。異なる $u$ に属する状態集合は交わらず、全部を合わせれば $H_{AB}=U$ の集合になります。有限な互いに素な和なので

$$
\begin{aligned}
W_{AB}(U)
&=\sum_{u\in H_A(\Omega_A)}|A_u\times B_{U-u}|\\
&=\sum_{u\in H_A(\Omega_A)}W_A(u)W_B(U-u).
\end{aligned}
$$

両方の状態数が正の固定分割では、[Boltzmannエントロピーの定義](#def-sm2-boltzmann-entropy)と $\log(xy)=\log x+\log y$（$x,y>0$）より

$$
\begin{aligned}
S_{\mathrm B,AB}(u,v)
&=k_{\mathrm B}\log[W_A(u)W_B(v)]\\
&=k_{\mathrm B}\log W_A(u)+k_{\mathrm B}\log W_B(v).
\end{aligned}
$$

総エネルギーのみを固定したときには、一般に $\log\sum_u W_A(u)W_B(U-u)$ を一つの積の対数に置き換えることはできません。
<!-- proof-end -->

### 例：どのエネルギー分割が多いか

各系の準位 $0,\varepsilon,2\varepsilon$ の状態数がそれぞれ $1,2,1$ とします。総エネルギー $2\varepsilon$ なら許される分割は

$$
(0,2\varepsilon),\quad(\varepsilon,\varepsilon),
\quad(2\varepsilon,0)
$$

であり、その複合状態数は順に $1\cdot1=1$、$2\cdot2=4$、$1\cdot1=1$。よって $W_{AB}(2\varepsilon)=6$ です。全6状態に一様な微正準分布を指定すると、分割 $(\varepsilon,\varepsilon)$ の確率は $4/6=2/3$ になります。一つ一つの複合微視的状態は等確率でも、**エネルギー分割は等確率でない**ことが見えます。

<a id="prop-sm2-energy-split-probability"></a>

<!-- formal-statement-start -->
> **命題（エネルギー分割の確率）**  
> 前命題の複合系で $W_{AB}(U)>0$ とする。総エネルギー $U$ の微正準分布のもとでは、Aのエネルギーが $u$ である確率は

$$
P(H_A=u\mid H_{AB}=U)
=\frac{W_A(u)W_B(U-u)}{W_{AB}(U)}.
$$

> ただし左辺は「総エネルギー $U$ の許容集合上の一様分布による確率」の略記である。
<!-- formal-statement-end -->

### 証明の見取り図

一つの分割の配置数を、全分割の配置数で割ります。確率の一様性は複合微視的状態に対してだけ仮定します。

<!-- proof-start -->
### 証明

[複合系の状態数](#prop-sm2-composite-counting)により分子は $|A_u\times B_{U-u}|$、分母は $H_{AB}=U$ を満たす全複合状態数です。[微正準確率の命題](#prop-sm2-uniform-observables)で $B=A_u\times B_{U-u}$ と選ぶと

$$
P(H_A=u\mid H_{AB}=U)
=\frac{|A_u\times B_{U-u}|}{|\{(a,b):H_{AB}(a,b)=U\}|}
=\frac{W_A(u)W_B(U-u)}{W_{AB}(U)}.
$$

分子を全ての $u$ で足すと分母になるため、これらの確率の総和も1です。
<!-- proof-end -->

## 4. 最頻のエネルギー分割から温度を読む条件

前節の例では中央の分割に最も多くの微視的状態がありました。大きな系では、どのエネルギー分割に圧倒的多数の状態が集まるかを調べることが平衡の記述につながります。ただし、有限系のエネルギーは離散的であり、差分から勝手に微分係数を作ることはできません。

ここからは次の**追加仮定**を置きます。多数の状態を持つ大きな系について、各系のBoltzmannエントロピーに対応する滑らかなエネルギー関数 $S_A(U_A),S_B(U_B)$ が、考える区間でよい近似または熱力学極限の状態関数として確立されているものとします。

<a id="def-sm2-statistical-temperature"></a>

<!-- formal-statement-start -->
> **定義（エントロピー微分による統計的温度）**  
> $S(U,V,N)$ がエネルギー $U$ に関して開区間上で微分可能で、$V,N$ を固定した偏微分が存在するとする。その偏微分が非零である点で

$$
\frac1{T_{\mathrm{stat}}}
=\left(\frac{\partial S}{\partial U}\right)_{V,N}
$$

> により温度 $T_{\mathrm{stat}}$ を定義する。$S=k_{\mathrm B}\log W$ に対応する滑らかな状態数表示があるなら

$$
\frac1{k_{\mathrm B}T_{\mathrm{stat}}}
=\left(\frac{\partial\log W}{\partial U}\right)_{V,N}.
$$

> 正の絶対温度を扱う領域では右辺が正であることを仮定する。有限な離散準位上の $W$ に対し、補間・極限の仮定なくこの微分を書かない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sm2-statistical-temperature -->
### 例：状態数の指数型モデル

**定義の確認**：区間 $I$ で滑らかな状態数近似が $\log W(U)=c+\alpha U$（$\alpha>0$、$\alpha$ の単位はエネルギーの逆数）と表せると仮定します。$\partial_U S=k_{\mathrm B}\alpha>0$ なので

$$
T_{\mathrm{stat}}=\frac1{k_{\mathrm B}\alpha}>0.
$$

これは連続変数に対する近似模型の確認であり、有限状態数が全実数 $U$ に対して指数関数になるという主張ではありません。
<!-- definition-example-end -->

<a id="thm-sm2-equilibrium-temperature"></a>

<!-- formal-statement-start -->
> **定理（固定総エネルギー下の内部極値と温度の一致）**  
> 相互作用エネルギーを無視できる二系A、Bについて、総エネルギー $U$ と各系の体積・粒子数を固定する。許容されるAのエネルギーの開区間 $I$ 上で $S_A(u)$、$S_B(U-u)$ が微分可能とし、合成関数

$$
F(u)=S_A(u)+S_B(U-u)
$$

> が内部点 $u_*$ で局所最大となるなら

$$
S_A'(u_*)=S_B'(U-u_*).
$$

> 両微分が正で[統計的温度](#def-sm2-statistical-temperature)を定義できるなら、$T_A(u_*)=T_B(U-u_*)>0$ である。さらに $F''(u)<0$ が区間全体で成立し、$F'(u_*)=0$ なら $u_*$ はその区間で唯一の最大点である。
<!-- formal-statement-end -->

### 証明の見取り図

分割ごとの複合状態数は積なので、その対数は二つのエントロピーの和です。その和の増減をAへ渡すエネルギー $u$ で微分します。Bのエネルギーは $U-u$ なので、連鎖律で負号が出ます。ここで使うのは有限準位の差分でなく、追加仮定した滑らかな関数です。

<!-- proof-start -->
### 証明

$u$ が増えるとBのエネルギーは $U-u$ に減ります。したがって連鎖律を各項へ適用して

$$
\begin{aligned}
F'(u)
&=\frac{d}{du}S_A(u)+\frac{d}{du}S_B(U-u)\\
&=S_A'(u)+S_B'(U-u)\frac{d(U-u)}{du}\\
&=S_A'(u)-S_B'(U-u).
\end{aligned}
$$

内部点 $u_*$ が局所最大で $F$ が微分可能なので、正負の小さな増分による差商の符号から $F'(u_*)=0$ です。よって $S_A'(u_*)=S_B'(U-u_*)$。各微分が正なら[統計的温度](#def-sm2-statistical-temperature)により

$$
\frac1{T_A(u_*)}=S_A'(u_*)
=S_B'(U-u_*)=\frac1{T_B(U-u_*)}.
$$

二つの温度は正なので逆数の一致から温度も一致します。

追加の $F''<0$ の場合、$F'$ は区間上で狭義減少です。よって $u<u_*$ では $F'(u)>F'(u_*)=0$、$u>u_*$ では $F'(u)<0$ であり、左側で増加、右側で減少するため $u_*$ は一意な最大点です。
<!-- proof-end -->

[TH4の基本関係式](../../TH/TH4/index.md#prop-th4-fundamental-fixed-n)では、適切な平衡状態の状態関数 $U(S,V,N)$ について、固定した $V,N$ で $dU=T\,dS$ を用いました。$T\ne0$ かつ局所的に $S$ を $U$ の関数として解ける領域なら

$$
\left(\frac{\partial S}{\partial U}\right)_{V,N}
=\frac1{\left(\frac{\partial U}{\partial S}\right)_{V,N}}
=\frac1T
$$

です。したがって両エントロピーの熱力学的一致が示された場合に、統計的温度を通常の絶対温度と同定できます。**温度の一致は内部最大の必要条件**であり、有限の任意の系が内部最大を持つこと、あるいは等確率が力学から導かれることまで証明したわけではありません。境界で最大となる例、滑らかな補間がない離散系では別の議論が要ります。

## 5. 熱力学極限へ：二値スピンのエントロピー密度

[SM1の中央多重度の定理](../SM1/index.md#thm-sm1-central-growth)は、上向きが半分の状態数について $N^{-1}\log W_N\to\log2$ を示しました。上向き比率が一般の $q$ に近づく場合はどうでしょうか。この問いは、巨視的状態の状態数を指数精度で比較する手段を与えます。

<a id="thm-sm2-binary-entropy-density"></a>

<!-- formal-statement-start -->
> **定理（二値スピンの多重度のエントロピー率）**  
> 各整数 $N\ge1$ について $\Omega_N=\{-1,+1\}^N$ とし、$k_N\in\{0,\ldots,N\}$ が $k_N/N\to q\in(0,1)$ を満たすとする。上向きが $k_N$ 個の状態数を $W_N(k_N)=\binom N{k_N}$ とし、

$$
h(q)=-q\log q-(1-q)\log(1-q)
$$

> とおく。このとき

$$
\lim_{N\to\infty}\frac1N\log W_N(k_N)=h(q),
\qquad
\lim_{N\to\infty}\frac{S_{\mathrm B,N}(k_N)}N
=k_{\mathrm B}h(q).
$$

> ここで $S_{\mathrm B,N}(k)=k_{\mathrm B}\log\binom Nk$ はその巨視的状態の厳密多重度に対するBoltzmannエントロピーである。
<!-- formal-statement-end -->

### 証明の見取り図

$\binom Nk$ を階乗から直接近似しなくても、成功確率 $p=k/N$ の二項分布を補助的に使えます。その分布ではちょうど $k$ 回成功する確率が最大で、$N+1$ 個の確率の和は1です。これを上限・下限に挟むと、対数を $N$ で割った誤差は $\log(N+1)/N$ 以下になります。

<!-- proof-start -->
### 証明

まず $1\le k\le N-1$ とし、$p=k/N\in(0,1)$ を置きます。$j=0,\ldots,N$ に対し

$$
b_j=\binom Nj p^j(1-p)^{N-j}
$$

とおくと、二項定理により $\sum_{j=0}^N b_j=(p+1-p)^N=1$ です。$0\le j<N$ の隣接比は

$$
\frac{b_{j+1}}{b_j}
=\frac{N-j}{j+1}\,\frac{p}{1-p}
=\frac{(N-j)k}{(j+1)(N-k)}.
$$

$j=k-1$ なら $(N-k+1)/(N-k)>1$、$j=k$ なら $k/(k+1)<1$ です。さらに比の第一因子 $(N-j)/(j+1)$ は $j$ とともに減るため、$b_j$ は $j=k$ まで増加し、その後減少します。従って $b_k=\max_j b_j$ です。全 $N+1$ 項が非負で和1なので

$$
\frac1{N+1}\le b_k\le1.
$$

$p=k/N$ について指数をまとめると

$$
p^k(1-p)^{N-k}
=\exp\{N[p\log p+(1-p)\log(1-p)]\}
=e^{-Nh(p)}.
$$

これを $b_k=\binom Nk e^{-Nh(p)}$ に代入し、正の数の対数を取ると

$$
Nh(p)-\log(N+1)
\le\log\binom Nk
\le Nh(p).
$$

さらに $N>0$ で割って

$$
h(p)-\frac{\log(N+1)}N
\le\frac1N\log\binom Nk
\le h(p).
$$

仮定 $k_N/N\to q\in(0,1)$ により、十分大きい $N$ では $1\le k_N\le N-1$ でこの評価を適用できます。$h$ は $(0,1)$ 上連続、$\log(N+1)/N\to0$ なので挟みうちにより第一の極限が成立します。第二の極限は[Boltzmannエントロピーの定義](#def-sm2-boltzmann-entropy)に $W=\binom N{k_N}$ を代入し、$k_{\mathrm B}>0$ を掛ければ得られます。
<!-- proof-end -->

### 例：中央が最大だが、全配置ではない

$q=1/2$ では $h(1/2)=\log2$ となり、[SM1の中央多重度](../SM1/index.md#thm-sm1-central-growth)の極限を回収します。$q\ne1/2$ なら $h(q)<\log2$ です。実際、

$$
h'(q)=\log\frac{1-q}{q},\qquad
h''(q)=-\frac1q-\frac1{1-q}<0
$$

なので、唯一の最大は $q=1/2$ です。ただし単一の $k$ の微正準確率は、許容集合全体をどう選んだかにも依存します。状態数の対数の最大と、任意のアンサンブルで確率1へ集中するという主張を混同してはいけません。

## 6. 演習：状態の一様性から巨視的な温度まで

### Level A：定義と有限和

#### A1. エネルギー窓の微正準確率

$\Omega=\{a,b,c,d,e\}$ とし、エネルギーを順に $0,0,\varepsilon,2\varepsilon,2\varepsilon$（$\varepsilon>0$）とする。$E=0,\Delta=2\varepsilon$ の微正準分布と、観測量 $A(a)=A(b)=1$、それ以外で0の期待値を求めよ。

- Level: A
- ID: SM2-A1

<!-- solution-start -->
**詳細解答**　半開区間 $[0,2\varepsilon)$ に入るのは $a,b,c$ です。従って[微正準分布](#def-sm2-microcanonical)の $W=3$ で、$p(a)=p(b)=p(c)=1/3$、$p(d)=p(e)=0$。和は $3(1/3)=1$ です。[期待値の命題](#prop-sm2-uniform-observables)から

$$
\mathbb E[A]
=\frac13[A(a)+A(b)+A(c)]
=\frac13(1+1+0)=\frac23.
$$

$2\varepsilon$ の二状態を加えないことが鍵です。
<!-- solution-end -->

#### A2. 状態数の比とエントロピー差

同じ $k_{\mathrm B}>0$ について、窓1は $W_1=6$、窓2は $W_2=24$ の状態を含む。$S_2-S_1$ を求めよ。状態数が0ならどうなるか。

- Level: A
- ID: SM2-A2

<!-- solution-start -->
**詳細解答**　[Boltzmannエントロピー](#def-sm2-boltzmann-entropy)から

$$
S_2-S_1=k_{\mathrm B}(\log24-\log6)
=k_{\mathrm B}\log(24/6)=k_{\mathrm B}\log4.
$$

対数は正の状態数に対してのみ定義しました。$W=0$ の空の許容集合には規格化された微正準分布が存在せず、この定義で $S_{\mathrm B}$ は定めません。
<!-- solution-end -->

#### A3. 固定された二系の準位

Aにエネルギー $u$ の状態が3個、Bにエネルギー $v$ の状態が4個ある。加法的な複合系で、それぞれのエネルギーを固定した複合状態数とBoltzmannエントロピーを求めよ。

- Level: A
- ID: SM2-A3

<!-- solution-start -->
**詳細解答**　Aの3状態の各々にBの4状態を組み合わせられるので、[固定分割の命題](#prop-sm2-composite-counting)から $W_{AB}=3\cdot4=12$ です。

$$
S_{\mathrm B,AB}=k_{\mathrm B}\log12
=k_{\mathrm B}\log3+k_{\mathrm B}\log4.
$$

「合計エネルギーが $u+v$ だけ指定された」という別の問題なら、他の分割が存在するか調べなければなりません。
<!-- solution-end -->

#### A4. 統計的温度の次元

区間上の滑らかな近似で $S(U)=S_0+(2k_{\mathrm B}/\varepsilon)U$（$\varepsilon>0$）とする。統計的温度を求め、正であることを確認せよ。

- Level: A
- ID: SM2-A4

<!-- solution-start -->
**詳細解答**　固定された他変数のもとで

$$
\frac{\partial S}{\partial U}=\frac{2k_{\mathrm B}}{\varepsilon}>0,
\qquad
T_{\mathrm{stat}}=\left(\frac{2k_{\mathrm B}}{\varepsilon}\right)^{-1}
=\frac{\varepsilon}{2k_{\mathrm B}}.
$$

エネルギーを $\mathrm J$、$k_{\mathrm B}$ を $\mathrm{J/K}$ とすれば比の単位は $\mathrm K$ です。有限準位に対する直接の微分ではなく、問題が仮定した滑らかな近似への適用です。
<!-- solution-end -->

#### A5. $N=4$ の中央エントロピー

四個の二値スピンで上向き個数 $k=2$ を指定する。状態数とBoltzmannエントロピーを求め、全配置16個のエントロピーとの差を表せ。

- Level: A
- ID: SM2-A5

<!-- solution-start -->
**詳細解答**　[SM1の数え上げ](../SM1/index.md#prop-sm1-counting)から $W_4(2)=\binom42=6$ です。従って制約付きのエントロピーは $k_{\mathrm B}\log6$、全配置を許せば $k_{\mathrm B}\log16$ です。その差は

$$
k_{\mathrm B}\log16-k_{\mathrm B}\log6
=k_{\mathrm B}\log(16/6)
=k_{\mathrm B}\log(8/3)>0.
$$

何を許容集合としたかで比較している量が変わります。
<!-- solution-end -->

### Level B：仮定・数え上げ・平衡条件

#### B1. 総エネルギーと分割ごとの確率

AとBはそれぞれ準位 $0,\varepsilon,2\varepsilon$ に状態数 $1,2,1$ を持ち、エネルギーは加法的とする。総エネルギー $2\varepsilon$ の微正準分布で、Aのエネルギー分布と期待値を求めよ。

- Level: B
- ID: SM2-B1

<!-- solution-start -->
**詳細解答**　[畳み込みの命題](#prop-sm2-composite-counting)で、Aの準位を $0,\varepsilon,2\varepsilon$ と動かすと、Bの準位はそれぞれ $2\varepsilon,\varepsilon,0$ です。複合状態数は

$$
1\cdot1=1,\qquad2\cdot2=4,\qquad1\cdot1=1,
\qquad W_{AB}(2\varepsilon)=6.
$$

[分割確率](#prop-sm2-energy-split-probability)により Aの分布は $(1/6,4/6,1/6)$ です。よって

$$
\mathbb E[H_A]
=0\cdot\frac16+\varepsilon\frac46
+2\varepsilon\frac16
=\frac{6\varepsilon}{6}=\varepsilon.
$$

微視的状態が一様でも、この分割の確率は $1/3$ ずつではありません。
<!-- solution-end -->

#### B2. 滑らかなエントロピーから最適分割

$U>0$ を総エネルギー、$u_0>0$ を固定した基準エネルギーとする。$0<u<U$ に対し、滑らかなエントロピーが

$$
S_A(u)=a\log\frac{u}{u_0},\qquad
S_B(U-u)=b\log\frac{U-u}{u_0}
$$

で与えられるとする（$a,b>0$、単位はエントロピーと同じ）。総エントロピーを最大にする $u$ と、その点での統計的温度の一致を証明せよ。

- Level: B
- ID: SM2-B2

<!-- solution-start -->
**詳細解答**　総エントロピーは

$$
F(u)=a\log\frac{u}{u_0}
+b\log\frac{U-u}{u_0}
$$

です。$u_0,u,U-u$ はすべて正なので対数の引数は正の無次元量です。$u_0$ は定数であり、

$$
\frac{d}{du}\log\frac{u}{u_0}=\frac1u,\qquad
\frac{d}{du}\log\frac{U-u}{u_0}=-\frac1{U-u}
$$

より、

$$
F'(u)=\frac au-\frac b{U-u},\qquad
F''(u)=-\frac a{u^2}-\frac b{(U-u)^2}<0.
$$

基準エネルギー $u_0$ は $F$ の値に定数項を加えるだけで、最大点も温度の微分関係も変えません。

$F'(u)=0$ を解くと $a(U-u)=bu$、つまり

$$
u_*=\frac{aU}{a+b}\in(0,U),\qquad
U-u_*=\frac{bU}{a+b}.
$$

この計算で $F''(u)<0$ を確認したので、[固定総エネルギー下の内部極値と温度の一致](#thm-sm2-equilibrium-temperature)の一意性の結論を適用でき、唯一の最大です。温度の逆数はそれぞれ $a/u_*$ と $b/(U-u_*)$ なので、

$$
\frac1{T_A}=\frac a{u_*}=\frac{a+b}U
=\frac b{U-u_*}=\frac1{T_B},
\qquad T_A=T_B=\frac U{a+b}>0.
$$
<!-- solution-end -->

#### B3. 最大点が境界にある場合

$0\le u\le U$（$U>0$）で $S_A(u)=au$、$S_B(U-u)=b(U-u)$、$a>b>0$ とする。総エントロピーの最大点を求め、温度一致を結論してよいか判定せよ。

- Level: B
- ID: SM2-B3

<!-- solution-start -->
**詳細解答**　$F(u)=au+b(U-u)=bU+(a-b)u$ なので、傾き $a-b>0$ により $u=U$ で最大です。これは許容区間の**境界**であって内部点ではありません。内部の微分は常に

$$
F'(u)=a-b>0
$$

で零にはなりません。[内部極値の定理](#thm-sm2-equilibrium-temperature)の仮定を満たさないため $a=b$ や温度一致は導けません。温度を定めれば $T_A=1/a$、$T_B=1/b$ と異なります。
<!-- solution-end -->

#### B4. 離散的な温度推定の限界

三つの準位 $0,\varepsilon,2\varepsilon$（$\varepsilon>0$）で多重度が $1,3,1$ の有限系を考える。各準位の $S_{\mathrm B}$ と隣接差商を計算し、この値だけから滑らかな温度関数が一意に定まるか論じよ。

- Level: B
- ID: SM2-B4

<!-- solution-start -->
**詳細解答**　[Boltzmannエントロピー](#def-sm2-boltzmann-entropy)は順に $0,k_{\mathrm B}\log3,0$ です。隣接差商は

$$
\frac{S(\varepsilon)-S(0)}{\varepsilon}
=\frac{k_{\mathrm B}\log3}{\varepsilon}>0,\qquad
\frac{S(2\varepsilon)-S(\varepsilon)}{\varepsilon}
=-\frac{k_{\mathrm B}\log3}{\varepsilon}<0.
$$

差商は区間ごとの有限差分で、任意の点での微分係数ではありません。この違いを具体的な補間で確かめます。$c=k_{\mathrm B}\log3$、$\lambda\in\mathbb R$ として滑らかな関数

$$
\widetilde S_\lambda(u)
=c\left[1-\left(\frac{u-\varepsilon}{\varepsilon}\right)^2\right]
+\frac{\lambda c}{\varepsilon^3}u(u-\varepsilon)(u-2\varepsilon)
$$

を考えます。$u=0,\varepsilon,2\varepsilon$ では三次式の項がすべて0で、第一項は順に $0,c,0$ です。しかし $u=\varepsilon$ で微分すると、三次式の導関数は

$$
\left.\frac{d}{du}\bigl[u(u-\varepsilon)(u-2\varepsilon)\bigr]\right|_{u=\varepsilon}
=\varepsilon(\varepsilon-2\varepsilon)=-\varepsilon^2
$$

なので、

$$
\widetilde S_\lambda'(\varepsilon)=-\frac{\lambda c}{\varepsilon}.
$$

同じ三つのエントロピー値を与えても、$\lambda=0$ なら微分は0、$\lambda=-1$ なら正、$\lambda=1$ なら負です。従って[統計的温度の定義](#def-sm2-statistical-temperature)を、補間や熱力学極限の根拠なしに一意に適用できません。符号の変化は準位の多重度が山型であることを示しますが、有限系の熱平衡を証明してはいません。
<!-- solution-end -->

### Level C：多重度・極限・熱力学を接続する

#### C1. 固定磁化の二値スピンと状態数

$N\ge2$、$\varepsilon>0$、$\Omega_N=\{-1,+1\}^N$ とし、各配置 $\sigma$ のエネルギーを

$$
H_N(\sigma)=-\varepsilon\sum_{i=1}^N\sigma_i
$$

とする。整数 $k_N\in\{0,\ldots,N\}$ について上向きの個数をちょうど $k_N$ に制限した微正準アンサンブルを考え、$k_N/N\to q\in(0,1)$ とする。

1. エネルギー $E_{k_N}$、許容状態数、各許容配置の確率を求めよ。
2. $\mathbb E_{\mathrm{mc}}[\sigma_1]$ を求めよ（座標の対称性を数え上げで示すこと）。
3. Boltzmannエントロピー密度とエネルギー密度の極限を求めよ。
4. $q=1/2$ と $q\ne1/2$ の多重度の指数成長率を比較し、そこから絶対温度が自動的に決定するか説明せよ。

- Level: C
- ID: SM2-C1

<!-- solution-start -->
**詳細解答**

**(1)**　上向きが $k_N$ 個、下向きが $N-k_N$ 個なので和は $2k_N-N$ です。[SM1の二値スピン計数](../SM1/index.md#prop-sm1-counting)から

$$
E_{k_N}=-\varepsilon(2k_N-N),\qquad
W_N(k_N)=\binom N{k_N}.
$$

$\varepsilon>0$ のため異なる $k$ は異なるエネルギーを与えます。厳密な準位を指定した[微正準分布](#def-sm2-microcanonical)により、許される各配置の確率は $\binom N{k_N}^{-1}$、残りは0です。

**(2)**　第一座標が $+1$ である配置は、残る $N-1$ 座標から $k_N-1$ 個の上向きを選ぶので $\binom{N-1}{k_N-1}$ 個です。第一座標が $-1$ である配置は、残る座標から $k_N$ 個の上向きを選ぶので $\binom{N-1}{k_N}$ 個です。範囲外の二項係数は0と約束します。

まず $1\le k_N\le N-1$ では階乗を展開して

$$
\begin{aligned}
\frac{\binom{N-1}{k_N-1}}{\binom N{k_N}}
&=\frac{(N-1)!}{(k_N-1)!(N-k_N)!}
  \frac{k_N!(N-k_N)!}{N!}
=\frac{k_N}{N},\\
\frac{\binom{N-1}{k_N}}{\binom N{k_N}}
&=\frac{(N-1)!}{k_N!(N-1-k_N)!}
  \frac{k_N!(N-k_N)!}{N!}
=\frac{N-k_N}{N}.
\end{aligned}
$$

端点 $k_N=0$ では全スピンが $-1$、$k_N=N$ では全スピンが $+1$ であり、それぞれ対応する配置が一つだけです。従って両端点でも上の二つの比は順に $(0,1)$ と $(1,0)$ となり、同じ公式が成立します。

従って

$$
\mathbb E_{\mathrm{mc}}[\sigma_1]
=(+1)\frac{k_N}{N}+(-1)\frac{N-k_N}{N}
=\frac{2k_N}{N}-1.
$$

座標1に特別な役割はないので、他の座標でも同じです。

**(3)**　[エントロピー率の定理](#thm-sm2-binary-entropy-density)は $k_N/N\to q\in(0,1)$ を仮定として持つので、

$$
\lim_{N\to\infty}\frac{S_{\mathrm B,N}(k_N)}N=k_{\mathrm B}h(q).
$$

エネルギーについては $E_{k_N}/N=-\varepsilon(2k_N/N-1)$ と代入できるため

$$
\lim_{N\to\infty}\frac{E_{k_N}}N=-\varepsilon(2q-1).
$$

**(4)**　$h'(q)=\log((1-q)/q)$、$h''(q)<0$ なので $h(1/2)=\log2$ が唯一の最大です。$q\ne1/2$ なら $h(q)<\log2$ ですが、これは**制約を固定した状態数の指数成長率**の比較に過ぎません。温度にはエネルギー変数に対する滑らかなエントロピーの微分、および熱力学的エントロピーと統計的エントロピーの同定が必要です。指定された有限系の等確率という仮定だけで絶対温度を結論してはいけません。
<!-- solution-end -->

## 7. どこまで導出し、何が残るか

有限微正準アンサンブルの下では、許容状態は等確率でも巨視的なエネルギー分割は**多重度で重み付けされる**と分かりました。Boltzmannエントロピーは積を和へ変え、エネルギーを交換できる二つの大きな系で内部最大が成立すれば、エントロピー微分が一致します。それを温度と呼ぶには滑らかな状態関数と熱力学との対応が必要です。

次章SM3では、孤立した複合系の一部分に注目し、エネルギーが揺らぐ系の分布を導いて正準アンサンブルと分配関数を導入します。ここでの「総エネルギー固定」と「部分系のエネルギーは可変」という区別が、その出発点になります。
