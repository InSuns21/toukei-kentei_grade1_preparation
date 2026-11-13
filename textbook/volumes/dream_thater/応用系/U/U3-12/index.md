# U3-12 ランダムウォークから Brown 運動への極限

<!-- definition-example-audit: strict -->

前講の [CRR 木](../U3-11/index.md#def-u3-11-crr) では、時間刻みを細かくしたとき、対数株価の増分の平均と分散が一定の時間スケールを持つことまで確認しました。ただし、**平均と分散が収束しただけでは、確率分布も価格の時間経路も収束したとは言えません**。例えば同じ平均0・分散1の正規分布と2点分布は、異なる確率法則です。

今度は、有限個の上下分岐で作る折れ線が、時間を連続的に動かす Brown 運動へどの意味で近づくかを問います。最初に対称な格子歩行を手で確認し、次に金融モデル固有の「評価用確率が刻み幅ごとに変化する」CRR 木を扱います。極限の一般的な証明は [Donsker 不変原理](../../../解析系/STO/STO3A/index.md#thm-sto3a-donsker) で学び、本講では**CRR の具体的な係数を代入し、その適用に必要な修正と仮定を確認**します。

## 1. なぜ上下の変化幅は時間刻みの平方根か

期間を $T>0$ 年、分割数を整数 $N\ge1$、一刻みを $h=T/N$ 年とします。確率変数 $\varepsilon_1,\ldots,\varepsilon_N$ を互いに独立で、それぞれ $+1$ と $-1$ を確率 $1/2$ ずつ取るものとします。まず金利も株価も考えず、時間 $kh$ での歩行位置を

$$
W_{kh}^{(N)}=\sqrt h\sum_{j=1}^k\varepsilon_j,\qquad
W_0^{(N)}=0
$$

と置きます。時刻 $kh$ と $(k+1)h$ の間は、両端を直線で結びます。具体的に $0\le k<N$、$kh\le t\le(k+1)h$ では、$k$ は左端の格子番号、$t$ は連続的に動かす時刻として

$
W_t^{(N)}=W_{kh}^{(N)}+\frac{t-kh}{h}\sqrt h\,\varepsilon_{k+1}
$

とします。$t=T$ でも最後の区間 $k=N-1$ の式を使います。各枝の縦幅 $\sqrt h$ は「年の平方根」を単位とする無次元化した歩行の幅です。

この尺度の理由は、**独立増分の分散が足し算できる**ことにあります。1回の増分は平均0、分散 $h$ なので、$k$ 回で平均0、分散 $kh$。特に満期 $T=Nh$ では

$$
E[W_T^{(N)}]=0,\qquad
\operatorname{Var}(W_T^{(N)})=Nh=T.
$$

もし幅を $h$ とすれば分散は $Nh^2=Th\to0$ で経路が潰れます。反対に幅を定数にすれば分散は $N$ とともに発散します。**非退化な時間分散**を期待するなら $\sqrt h$ が自然です。

例えば $T=1$ 年、$N=4$、$h=1/4$ 年では、枝幅は $1/2$。順に $(+1,-1,+1,+1)$ が出た経路の位置は、時刻 $0,1/4,1/2,3/4,1$ において $0,1/2,0,1/2,1$ です。同じ終点でも途中の最大値が異なる経路があり、[Lookback の受取額](../U3-10/index.md#def-u3-10-lookback-payoff) には時点ごとの形が重要です。

<a id="def-u3-12-polygonal-walk"></a>

<!-- formal-statement-start -->
> **定義（時間スケール付き対称格子歩行）**  
> $T>0$、$N\ge1$、$h=T/N$ とする。互いに独立で各符号 $+1,-1$ を確率 $1/2$ ずつ取る $\varepsilon_1,\ldots,\varepsilon_N$ を用いる。以下の格子値を持ち、区間 $[kh,(k+1)h]$ では線形補間する連続過程 $W^{(N)}:[0,T]\to\mathbb R$ を考える。
>
$$
W_0^{(N)}=0,\qquad
W_{kh}^{(N)}=\sqrt h\sum_{j=1}^{k}\varepsilon_j
\quad(k=1,\ldots,N).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-12-polygonal-walk -->
**定義の確認**：直前の4刻みの経路は $W_0=0$、$W_{1/4}=1/2$、$W_{1/2}=0$、$W_{3/4}=1/2$、$W_1=1$ です。区間 $[1/4,1/2]$ では $W_t=1/2-2(t-1/4)$ と補間するため、例えば $W_{3/8}=1/4$ です。全区間で連続であり、格子点では指定した独立増分の和に一致します。
<!-- definition-example-end -->

**これから得るのは、単一の経路が一様に近づくという主張ではありません。** [連続経路空間の弱収束](../../../解析系/STO/STO3A/index.md#def-sto3a-function-weak-convergence)を使い、全ての有界連続な経路関数 $F$ に対して $E[F(W^{(N)})]\to E[F(B)]$ となることを意味させます。極限 $B$ は [標準 Brown 運動](../../../解析系/STO/STO4/index.md#def-sto4-brownian-motion) です。そこでは $B_0=0$、経路が連続、長さ $t-s$ の増分 $B_t-B_s$ が平均0・分散 $t-s$ の正規分布で、互いに重ならない時間区間の増分は独立です。

<a id="prop-u3-12-symmetric-moments"></a>

<!-- formal-statement-start -->
> **命題（対称歩行の格子上のモーメントと二乗増分）**  
> 上の時間スケール付き対称格子歩行について、任意の整数 $0\le k\le N$ に対して
>
$$
E[W_{kh}^{(N)}]=0,\qquad
\operatorname{Var}(W_{kh}^{(N)})=kh,
\qquad
\sum_{j=1}^{N}
(W_{jh}^{(N)}-W_{(j-1)h}^{(N)})^2=T
$$
>
> が成り立つ。最後の恒等式は全ての標本結果で成立する。
<!-- formal-statement-end -->

### 証明の見取り図

独立な平均0の増分は分散を足せます。一方、二乗増分は各枝で $h$ に等しいため、その和には偶然性がありません。

<!-- proof-start -->
### 証明

$\varepsilon_j$ の期待値は $(1-1)/2=0$、二乗は恒等的に1で、分散も1です。従って

$$
E[W_{kh}^{(N)}]
=\sqrt h\sum_{j=1}^k E[\varepsilon_j]=0.
$$

独立性によって $i\ne j$ の共分散は0ですから

$$
\operatorname{Var}(W_{kh}^{(N)})
=h\sum_{j=1}^k\operatorname{Var}(\varepsilon_j)
=kh.
$$

最後に差分は $\sqrt h\varepsilon_j$ なので、全標本結果で

$$
\sum_{j=1}^N(\sqrt h\varepsilon_j)^2
=\sum_{j=1}^Nh
=Nh=T.
$$

<!-- proof-end -->

有限格子で二乗増分和が残ることは、Brown 運動の [二次変分](../../../解析系/STO/STO5/index.md#thm-sto5-brownian-qv) が時間 $t$ になることと整合します。ただし、**格子和の恒等式から任意の分割に沿う二次変分の定理そのものが証明できたわけではありません**。

## 2. CRR の対数株価を格子歩行として読む

次に単位を金融モデルへ戻します。初期価格 $S_0>0$ 円、一定の連続複利金利 $r\in\mathbb R$ 年$^{-1}$、ボラティリティ係数 $\sigma>0$ 年$^{-1/2}$、満期 $T>0$ 年を固定します。配当・費用なしの [CRR 木](../U3-11/index.md#def-u3-11-crr) の倍率を

$$
u_h=e^{\sigma\sqrt h},\qquad
d_h=e^{-\sigma\sqrt h},\qquad
R_h=e^{rh}
$$

とします。評価用確率 $Q_N$ は、条件 $d_h<R_h<u_h$ を満たす十分大きい $N$ に対してのみ定義し、1期の上昇確率を

$$
q_h=\frac{e^{rh}-e^{-\sigma\sqrt h}}
{e^{\sigma\sqrt h}-e^{-\sigma\sqrt h}}
$$

とします。$Q_N$ の下で各期の枝は独立で、対数株価の増分は $+\sigma\sqrt h$ または $-\sigma\sqrt h$ です。添字 $h$ は刻み幅を変えると符号の確率法則も変わること、$j=1,\ldots,N$ は枝を選ぶ期を表します。各期の符号列の確率は $q_h$ と $1-q_h$ の積で決まります。**$Q_N$ は各 $N$ ごとに異なる有限モデルの評価用確率**であり、現実の価格変動を予測する確率 $P$ と同一視しません。

<a id="def-u3-12-crr-log-path"></a>

<!-- formal-statement-start -->
> **定義（CRR 対数価格の線形補間過程）**  
> $T>0,S_0>0,\sigma>0,r\in\mathbb R$ を固定し、$h=T/N$、$e^{-\sigma\sqrt h}<e^{rh}<e^{\sigma\sqrt h}$ とする。$Q_N$ の下で独立な $\varepsilon_{h,j}\in\{-1,1\}$ が $Q_N(\varepsilon_{h,j}=1)=q_h$ を満たすとき、格子点上で
>
$$
X_{kh}^{(N)}
=\log(S_{kh}^{(N)}/S_0)
=\sigma\sqrt h\sum_{j=1}^k\varepsilon_{h,j}
$$
>
> と定め、時刻 $kh$ と $(k+1)h$ の間を直線で結ぶ。すなわち $0\le k<N$、$kh\le t\le(k+1)h$、$\theta=(t-kh)/h\in[0,1]$ に対して $X_t^{(N)}=X_{kh}^{(N)}+\theta\sigma\sqrt h\,\varepsilon_{h,k+1}$ とする。$m_h=E_{Q_N}[\sigma\sqrt h\,\varepsilon_{h,1}]$ を1期の平均対数増分とする。$X^{(N)}$ から格子ごとの平均傾向を引いた過程を
>
$$
Z_t^{(N)}=X_t^{(N)}-\frac{m_h}{h}t
$$
>
> とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-12-crr-log-path -->
**定義の確認**：$r=0$、$T=1$ 年、$N=4$、$\sigma=0.2$ 年$^{-1/2}$ なら $h=1/4$、$u_h=e^{0.1}$、$d_h=e^{-0.1}$、$R_h=1$ です。$d_h<1<u_h$ を満たし

$$
q_h=\frac{1-e^{-0.1}}{e^{0.1}-e^{-0.1}}
=\frac1{1+e^{0.1}}
\approx0.4750208125.
$$

枝列 $(+1,-1,+1,+1)$ の対数価格 $X^{(4)}$ は時刻 $0,1/4,1/2,3/4,1$ において $(0,0.1,0,0.1,0.2)$。$t=3/8$ は第2期の中点（$k=1,\theta=1/2$）なので、$X_{3/8}^{(4)}=0.1+(1/2)(-0.1)=0.05$ です。この補間は区間端で一致して連続であり、[CRR の株価表示](../U3-11/index.md#def-u3-11-crr)から格子点で $S_{kh}=S_0e^{X_{kh}}>0$ です。さらに $d_h<R_h<u_h$ を確認したので、$0<q_h<1$ で各枝の確率も定義できます。

1期の平均は $m_h=0.1(2q_h-1)\approx-0.0049958375$ です。格子点だけでなく補間時刻でも $E_{Q_4}[X_t^{(4)}]=(m_h/h)t$ となります。実際、第2期の中点では独立な同分布符号の期待値を使って

$
E_{Q_4}[X_{3/8}^{(4)}]
=m_h+\tfrac12m_h=\frac{m_h}{h}\frac38,
\qquad
Z_{3/8}^{(4)}=0.05-\frac{m_h}{h}\frac38\approx0.0574937562.
$

従って $Z_0=0$、さらに全ての $0\le t\le T$ で $E_{Q_4}[Z_t^{(4)}]=0$ です。枝列を1本示すことと枝列全体の独立性を検証することは別で、独立性は $Q_4$ の積による構成から従います。
<!-- definition-example-end -->

**株価と対数株価は異なる量**です。$S_t$ は円、$X_t=\log(S_t/S_0)$ は無次元です。また $m_h$ は株価の期待収益率ではなく、**対数増分の平均**です。ここを混同すると後に現れる $-\sigma^2/2$ を落とします。

<a id="prop-u3-12-crr-moments"></a>

<!-- formal-statement-start -->
> **命題（CRR 対数増分の平均・分散）**  
> $r\in\mathbb R$、$\sigma,T>0$ を固定する。$h=T/N\downarrow0$ で $q_h\in(0,1)$ が成立する CRR モデルの1期対数増分 $Y_h=\sigma\sqrt h\,\varepsilon_{h,1}$ に対し
>
$$
\begin{aligned}
m_h&=E_{Q_N}[Y_h]
=\sigma\sqrt h(2q_h-1)
=(r-\tfrac12\sigma^2)h+O(h^2),\\
v_h&=\operatorname{Var}_{Q_N}(Y_h)
=\sigma^2h-m_h^2
=\sigma^2h+O(h^2)
\end{aligned}
$$
>
> となる。特に $X_T^{(N)}$ の平均と分散はそれぞれ
>
$$
E_{Q_N}[X_T^{(N)}]\longrightarrow(r-\tfrac12\sigma^2)T,\qquad
\operatorname{Var}_{Q_N}(X_T^{(N)})\longrightarrow\sigma^2T.
$$
<!-- formal-statement-end -->

### 証明の見取り図

対数増分は2点分布なので、平均と二乗平均を直接求められます。$q_h$ に入る指数関数を **$h$ の次数まで丁寧に展開**すると、$r$ だけでなく $-\sigma^2/2$ が出ます。

<!-- proof-start -->
### 証明

$a=\sigma\sqrt h$ と置きます。分母・分子を $a$ の冪で展開すると、$rh=O(a^2)$ ですから

$$
\begin{aligned}
e^{rh}-e^{-a}
&=a+(r-\tfrac12\sigma^2)h+\tfrac16a^3+O(h^2),\\
e^a-e^{-a}
&=2a+\tfrac13a^3+O(h^{5/2}).
\end{aligned}
$$

従って分子・分母を $2a$ で割り、$1/(1+z)=1-z+O(z^2)$ を用いると

$$
\begin{aligned}
q_h
&=\frac{1}{2}
+\frac{r-\sigma^2/2}{2\sigma}\sqrt h
+O(h^{3/2}).
\end{aligned}
$$

ここで $h$ の次数の項が消える理由は、分子の $a^3/6$ と分母の $a^3/3$ に由来する補正が互いに打ち消すためです。実際、

$$
\frac{a^3/6}{2a}-\frac12\frac{a^3/3}{2a}
=\frac{a^2}{12}-\frac{a^2}{12}=0.
$$

$Y_h$ は値 $\pm a$ を確率 $q_h,1-q_h$ で取るので

$$
E_{Q_N}[Y_h]=a q_h-a(1-q_h)=a(2q_h-1).
$$

上の展開を代入して $m_h=(r-\sigma^2/2)h+O(h^2)$。また $Y_h^2=a^2=\sigma^2h$ が恒等的に成立するため

$$
v_h=E[Y_h^2]-E[Y_h]^2=\sigma^2h-m_h^2
=\sigma^2h+O(h^2).
$$

最後に $X_T^{(N)}=\sum_{j=1}^NY_{h,j}$、各期は独立、$N=T/h$ なので

$$
\begin{aligned}
E[X_T^{(N)}]&=Nm_h
=(r-\tfrac12\sigma^2)T+O(h),\\
\operatorname{Var}(X_T^{(N)})&=Nv_h
=\sigma^2T+O(h).
\end{aligned}
$$

<!-- proof-end -->

平均の補正は、評価用確率の条件 $E_{Q_N}[S_{(k+1)h}\mid S_{kh}]=e^{rh}S_{kh}$ と矛盾しません。一般に **対数の期待値を指数に入れても価格の期待値にはならない**からです。

## 3. どの意味で Brown 運動に近づくか

有限個の時刻 $(t_1,\ldots,t_\ell)$ だけの分布が収束することと、経路全体の分布が収束することは異なります。折れ線の細かい振動が暴走しないことを追加で示す必要があり、この役割を果たすのが [タイトネス](../../../解析系/STO/STO3A/index.md#def-sto3a-tightness) です。

ここでは、一般の [Donsker 不変原理](../../../解析系/STO/STO3A/index.md#thm-sto3a-donsker) の証明を反復せず、**CRR 固有の三角配列**で何を確認すべきかを示します。三角配列とは、分割数 $N$ ごとに $\varepsilon_{h,1},\ldots,\varepsilon_{h,N}$ という別の有限列を作り、列の長さと分布がともに $N$ に依存する配置です。通常の独立同分布版 Donsker 定理を、各 $N$ で確率 $q_h$ が変わる状況へそのまま代入するのは誤りです。

<a id="thm-u3-12-crr-brownian-limit"></a>

<!-- formal-statement-start -->
> **定理（CRR 対数価格の Brown 運動極限）**  
> $T>0$、$S_0>0$、$\sigma>0$、$r\in\mathbb R$ を固定する。各 $N$ で $h=T/N$ とし、十分大きい $N$ に対して $q_h\in(0,1)$ の CRR 評価用確率 $Q_N$ の下で独立な対数増分 $\pm\sigma\sqrt h$ を作る。その累積和を線形補間した $X^{(N)}\in C([0,T])$ は、連続経路空間上の弱収束の意味で
>
$$
X^{(N)}\ \Longrightarrow\
X,\qquad X_t=(r-\tfrac12\sigma^2)t+\sigma B_t
\quad(0\le t\le T)
$$
>
> を満たす。ここで $B$ は標準 Brown 運動であり、極限の法則は Brown 運動の法則で定まる。特に任意の固定 $t\in[0,T]$ において
>
$$
X_t^{(N)}\ \Longrightarrow\
N\bigl((r-\tfrac12\sigma^2)t,\sigma^2t\bigr)
$$
>
> が成立する（$t=0$ では一点0に集中する退化分布とする）。
<!-- formal-statement-end -->

### 証明の見取り図

**有限次元の確認**では、互いに重ならない時間ブロックの中心化増分に特性関数の2次展開を適用します。**経路全体の確認**では、中心化増分の四乗平均が時間差の二乗で抑えられることからタイトネスを得ます。二つを合わせて初めて経路空間の弱収束になります。

<!-- proof-start -->
### 証明

$m_h,v_h$ を [対数増分の命題](#prop-u3-12-crr-moments) の値とします。各期の中心化増分を $D_{h,j}=Y_{h,j}-m_h$ とすると、独立で平均0、分散 $v_h$ です。$q_h\in(0,1)$ なので $|m_h|\le\sigma\sqrt h$、従って $|D_{h,j}|\le2\sigma\sqrt h$ が一様に成立します。

**(1) 重ならない時間ブロックの収束。** 固定した $0\le s<t\le T$ に対し、$[s,t]$ の内部に完全に含まれる格子区間の個数を $k_h$ とすると $k_hh\to t-s$。対応する中心化増分和を $A_h=\sum_{j=1}^{k_h}D_{h,j}$ とします。各増分の特性関数を0の周りで2次展開すると、任意の固定 $u\in\mathbb R$ について

$$
E[e^{iuD_{h,1}}]
=1-\tfrac12u^2v_h+R_h(u),\qquad
|R_h(u)|\le\tfrac16|u|^3E|D_{h,1}|^3=O(h^{3/2}).
$$

独立性により $E[e^{iuA_h}]=(E[e^{iuD_{h,1}}])^{k_h}$。$v_h=\sigma^2h+O(h^2)$、$k_h=O(1/h)$ であり、$\log(1+z)=z+O(z^2)$ を適用すると

$$
\begin{aligned}
\log E[e^{iuA_h}]
&=k_h\{-\tfrac12u^2v_h+O(h^{3/2})+O(h^2)\}\\
&\longrightarrow-\tfrac12u^2\sigma^2(t-s).
\end{aligned}
$$

右辺は平均0・分散 $\sigma^2(t-s)$ の正規分布の特性関数です。[格子歩行の有限次元収束](../../../解析系/STO/STO3A/index.md#prop-sto3a-fdd-convergence)の証明で用いる特性関数による分布収束の判定と同じ手順から、$A_h$ は平均0・分散 $\sigma^2(t-s)$ の正規分布へ収束します。境界にかかる端数区間は高々2個であり、その中心化寄与は絶対値 $4\sigma\sqrt h$ 以下なので消えます。互いに重ならない複数ブロックは独立で、その特性関数は各ブロックの積です。ゆえに中心化過程 $Z^{(N)}$ の有限次元分布は、独立な正規増分を持つ $\sigma B$ のものへ収束します。

**(2) 四次増分の一様評価。** $k$ 個の完全な格子区間での和 $A=\sum_{j=1}^kD_{h,j}$ について、独立性・中心化から

$$
E[A^4]
=\sum_{j=1}^kE[D_{h,j}^4]
+6\sum_{i<j}E[D_{h,i}^2]E[D_{h,j}^2].
$$

$E[D_{h,j}^4]\le16\sigma^4h^2$、$v_h\le\sigma^2h$ なので、$k\ge1$ では

$$
E[A^4]\le16\sigma^4kh^2+3\sigma^4k(k-1)h^2
\le19\sigma^4(kh)^2.
$$

補間区間内の長さ $\delta\le h$ の増分は $\delta D_{h,j}/h$ なので、その四乗平均は $16\sigma^4\delta^4/h^2\le16\sigma^4\delta^2$ です。一般の $s<t$ も次のように分けて確かめます。

- $s,t$ が同じ格子区間にあるときは $\delta=t-s\le h$ とした直前の評価で十分です。
- 異なる格子区間にあるときは、左端・右端で横切る時間の長さを $\delta_1,\delta_2$、間に完全に入る格子区間の個数を $k$ とします。$0\le\delta_i\le h$ かつ $\delta_1+kh+\delta_2=t-s$ です。端数増分を $P_1,P_2$、完全区間の和を $A$ とすれば

$
\begin{aligned}
E|Z_t^{(N)}-Z_s^{(N)}|^4
&=E|P_1+A+P_2|^4\\
&\le27\bigl(E|P_1|^4+E|A|^4+E|P_2|^4\bigr)\\
&\le27\sigma^4\bigl(16\delta_1^2+19(kh)^2+16\delta_2^2\bigr)\\
&\le513\sigma^4(\delta_1+kh+\delta_2)^2
=513\sigma^4|t-s|^2.
\end{aligned}
$

ここで $k=0$ なら $A=0$ とします。最後の不等式は非負数について $\delta_1^2+(kh)^2+\delta_2^2\le(\delta_1+kh+\delta_2)^2$ を用いました。従って両場合を合わせて、$N,s,t$ に依存しない $C=513\sigma^4$ を取れば

$$
E|Z_t^{(N)}-Z_s^{(N)}|^4\le C|t-s|^2
$$

となります。特に、端数部分を分けることで $|t-s|<h$ も含まれています。

**(3) 経路分布の収束。** $Z_0^{(N)}=0$ かつ (2) の一様四次増分評価があるので、時間を $t=Tu$ に換えた $[0,1]$ 上の過程に [Kolmogorov型タイトネス判定](../../../解析系/STO/STO3A/index.md#thm-sto3a-kolmogorov-tightness) を適用できます。$Z^{(N)}$ の経路分布は $C([0,T])$ でタイトです。(1) で得た有限次元の法則は [標準 Brown 運動](../../../解析系/STO/STO4/index.md#def-sto4-brownian-motion) のものです。ここで [Donsker 定理の証明にある「タイトネスと有限次元分布から経路分布を決める」議論](../../../解析系/STO/STO3A/index.md#thm-sto3a-donsker) を用います。実際、タイトネスから任意の部分列に弱収束部分列が存在し、その極限法則は連続な時刻評価写像によって (1) と同じ有限次元分布を持ちます。連続経路の法則は有理時刻の有限次元分布で一意に定まるので、どの部分列極限も $\sigma B$ の法則です。従って [経路空間上の弱収束](../../../解析系/STO/STO3A/index.md#def-sto3a-function-weak-convergence) の意味で $Z^{(N)}\Longrightarrow\sigma B$ です。この段階は各 $N$ に共通の独立同分布列を要求せず、(1) と (2) の成立を使います。

**(4) 平均部分を戻す。** 線形補間した過程の各時刻で

$$
X_t^{(N)}=Z_t^{(N)}+\frac{m_h}{h}t.
$$

[平均の展開](#prop-u3-12-crr-moments) から $\frac{m_h}{h}=r-\sigma^2/2+O(h)$。したがって決定論的な傾きの差は $\sup_{0\le t\le T}|(m_h/h-r+\sigma^2/2)t|\le CT h\to0$ です。固定した連続関数 $g(t)=(r-\sigma^2/2)t$ を加える写像 $f\mapsto f+g$ は一様ノルムで連続です。実際 $\|(f+g)-(\tilde f+g)\|_\infty=\|f-\tilde f\|_\infty$。$g_h(t)=(m_h/h)t$ は $\|g_h-g\|_\infty\to0$ なので、[Donsker の証明でも用いた連続写像による極限移行](../../../解析系/STO/STO3A/index.md#thm-sto3a-donsker) と決定論的な一様誤差の消失により、$X^{(N)}=Z^{(N)}+g_h\Longrightarrow\sigma B+g$ です。固定時刻の評価写像 $f\mapsto f(t)$ は一様ノルムで連続なので、最後の一時刻の正規極限も従います。

<!-- proof-end -->

この結論は **確率法則の収束**です。全 $N$ の歩行を同じ確率空間に置いた際のほとんど確実な一様収束や、一般の経路依存オプション価格に関する期待値の収束まで主張していません。とりわけ受取額が非有界なら、分布収束だけで期待値の収束を結論することはできず、一様可積分性など追加条件が必要です。

## 4. 二乗増分・正規極限・価格評価を混同しない

CRR の対数増分は、確率に関係なく1回ごとに二乗が $\sigma^2h$ です。この性質は前講で扱った満期の受取額の格子評価とは別の、経路の細かさに関する情報です。

<a id="prop-u3-12-log-qv"></a>

<!-- formal-statement-start -->
> **命題（CRR 対数増分の二乗和）**  
> $T>0$、$N\ge1$、$\sigma>0$ とし、各期の CRR 対数増分が $\pm\sigma\sqrt{T/N}$ のいずれかであるとする。任意の枝列に対して、格子点の対数価格差の二乗和は
>
$$
\sum_{j=1}^N
\left(X_{jh}^{(N)}-X_{(j-1)h}^{(N)}\right)^2
=\sigma^2 T,\qquad h=T/N
$$
>
> となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

1期の差は $Y_{h,j}=\sigma\sqrt h\,\varepsilon_{h,j}$ で、$\varepsilon_{h,j}^2=1$ です。従って各項は $\sigma^2h$、$N$ 個の和は $N\sigma^2h=\sigma^2T$ です。枝の確率は使いません。

<!-- proof-end -->

対して極限の $\sigma B_t$ の [二次変分定理](../../../解析系/STO/STO5/index.md#thm-sto5-brownian-qv) では、**同じ連続過程を固定し、その分割を細かくする**操作を行います。ここでの式は **分割数ごとに異なる過程**に対する厳密な恒等式です。両者は整合していますが同一の論理ではありません。

満期株価については、時刻 $T$ の評価写像 $f\mapsto f(T)$ が $|f(T)-g(T)|\le\|f-g\|_\infty$ により連続であり、$x\mapsto S_0e^x$ も連続です。[Donsker の証明で使った連続写像による極限移行](../../../解析系/STO/STO3A/index.md#thm-sto3a-donsker) をこの合成へ適用すると、[経路極限](#thm-u3-12-crr-brownian-limit)から

$$
S_T^{(N)}\Longrightarrow
S_0\exp\{(r-\tfrac12\sigma^2)T+\sigma B_T\}
$$

が従います。右辺が正であること、対数が正規分布に従うことは確認できます。しかし [株式と債券の複製価格](../U3-04/index.md#thm-u3-04-unique-price) にまで直ちに飛ぶことはできません。連続時間モデルの取引戦略と割引価格の扱いは後の講義で条件を明確にして学びます。

### モデル仮定を外すと何が壊れるか

- **分散スケーリングを $h$ に変える**：満期の分散が $Th\to0$ となり、Brown 運動の非退化な変動に近づきません。
- **独立増分を外す**：分散に共分散項が現れ、正規増分の独立性も結論できません。全期同じ符号を使えば、分散は $N^2h=TN$ と発散します。
- **CRR の正の評価用確率条件を外す**：$q_h$ が $[0,1]$ の外になり、確率分布としての議論自体が定義できません。十分細かい刻みでのみ [有効条件](../U3-11/index.md#prop-u3-11-crr-admissible) を満たします。
- **二次モーメントだけ確認する**：有限次元分布の形と経路のタイトネスが未確認で、経路の弱収束を主張できません。

## 5. 有限刻みの数値検証

実装可能な再現用コードは [平均・分散の厳密評価と標本検証](assets/brownian_limit.py) に置きます。標準ライブラリだけで、CRR の有効条件、理論平均・理論分散、乱数標本の平均・分散を独立に確認します。**標本誤差と時間刻み誤差は別**なので、標本数を固定したまま刻みを細かくしても必ず値が滑らかに収束するわけではありません。

$r=0$ 年$^{-1}$、$\sigma=0.2$ 年$^{-1/2}$、$T=1$ 年、$N=4$ とすると、上昇確率は $q_h=1/(1+e^{0.1})$。従って

$$
\begin{aligned}
m_h&=0.1(2q_h-1)\approx-0.00499583750,\\
v_h&=0.01-m_h^2\approx0.00997504161,\\
E_{Q_4}[X_T^{(4)}]&=4m_h\approx-0.01998334998,\\
\operatorname{Var}_{Q_4}(X_T^{(4)})&=4v_h\approx0.03990016643.
\end{aligned}
$$

連続極限の値はそれぞれ $(r-\sigma^2/2)T=-0.02000000000$、$\sigma^2T=0.04000000000$ です。$N=4$ ですでに近い一方、有限分割の誤差が残ることも数字で分かります。

## 6. 演習

本節のすべての確率は、指定しない限り各問題に記した歩行の確率です。詳細解答では、使う独立性・分散の定義・極限の意味をその都度確認してください。

<a id="ex-u3-12-a1"></a>
### A1：枝幅を変えると何が起きるか
- Level: A

$T>0$、$h=T/N$ とし、独立で対称な $\varepsilon_j\in\{\pm1\}$ を考える。$V_N=h^\alpha\sum_{j=1}^N\varepsilon_j$ の平均と分散を求め、$N\to\infty$ で分散が正の有限な値へ収束する $\alpha$ を求めよ。

<!-- solution-start -->
**詳細解答**：$E[\varepsilon_j]=0$、$\operatorname{Var}(\varepsilon_j)=1$、相互独立なので

$$
E[V_N]=h^\alpha\sum_j0=0,\qquad
\operatorname{Var}(V_N)=h^{2\alpha}\sum_{j=1}^N1
=Nh^{2\alpha}=T h^{2\alpha-1}.
$$

$\alpha>1/2$ なら分散は0へ、$\alpha<1/2$ なら無限大へ発散します。$\alpha=1/2$ のときのみ $\operatorname{Var}(V_N)=T$ が正の有限な定数になります。この計算は分散だけの必要条件であり、分布収束そのものはまだ示していません。
<!-- solution-end -->

<a id="ex-u3-12-a2"></a>
### A2：線形補間が作る途中の値
- Level: A

$T=1$、$N=4$、$\varepsilon=(+1,-1,-1,+1)$ の対称歩行で、$W_0,W_{1/4},W_{1/2},W_{3/4},W_1$ と $W_{3/8}$ を求めよ。経路が連続である理由も述べよ。

<!-- solution-start -->
**詳細解答**：$h=1/4$、幅 $\sqrt h=1/2$ なので累積値は

$$
(0,\tfrac12,0,-\tfrac12,0).
$$

時刻 $3/8$ は $1/4$ と $1/2$ の中点で、線形補間によって $(1/2+0)/2=1/4$ です。各閉区間では一次関数として連続であり、隣接する区間は共通の格子端点の値に一致するので、区間を結合した $[0,1]$ 全体でも連続です。
<!-- solution-end -->

<a id="ex-u3-12-a3"></a>
### A3：対数増分の正確な分散
- Level: A

$Y$ が確率 $q$ で $+a$、確率 $1-q$ で $-a$ を取る。ただし $a>0$、$0<q<1$。$E[Y]$、$E[Y^2]$、$\operatorname{Var}(Y)$ を求めよ。

<!-- solution-start -->
**詳細解答**：

$$
E[Y]=aq-a(1-q)=a(2q-1).
$$

どちらの値も二乗すると $a^2$ なので $E[Y^2]=a^2$。分散の恒等式から

$$
\operatorname{Var}(Y)
=E[Y^2]-E[Y]^2
=a^2\{1-(2q-1)^2\}
=4a^2q(1-q).
$$

$q=1/2$ では分散 $a^2$、$q$ が0または1に近づくと分散が0へ近づきます。
<!-- solution-end -->

<a id="ex-u3-12-a4"></a>
### A4：Brown 運動の増分を読む
- Level: A

標準 Brown 運動 $B$ について、$B_{3/4}-B_{1/4}$ の分布と、$B_{1/4}$ との共分散を求めよ。$B_{1/4}$ と増分は独立か。

<!-- solution-start -->
**詳細解答**：[標準Brown運動](../../../解析系/STO/STO4/index.md#def-sto4-brownian-motion)により時間差は $3/4-1/4=1/2$ なので、増分は $N(0,1/2)$ に従います。区間 $[0,1/4]$ の増分 $B_{1/4}-B_0$ と区間 $[1/4,3/4]$ の増分は独立です。両方とも二乗可積分で平均0だから

$$
\operatorname{Cov}(B_{1/4},B_{3/4}-B_{1/4})
=E[B_{1/4}(B_{3/4}-B_{1/4})]-0=0.
$$

独立性は共分散が0だからではなく、Brown 運動の独立増分という仮定から直接従います。
<!-- solution-end -->

<a id="ex-u3-12-a5"></a>
### A5：CRR の確率境界
- Level: A

$r=0.5$ 年$^{-1}$、$\sigma=0.2$ 年$^{-1/2}$、$T=1$ 年の CRR 木で、評価用確率が厳密に $(0,1)$ に入る最小の整数 $N$ を求めよ。

<!-- solution-start -->
**詳細解答**：[CRR の有効条件](../U3-11/index.md#prop-u3-11-crr-admissible)へ $h=T/N$ を代入すると、$|r|\sqrt{T/N}<\sigma$ です。両辺が非負なので二乗して

$$
\frac{r^2T}{N}<\sigma^2
\ \Longleftrightarrow\
N>\frac{0.5^2\cdot1}{0.2^2}
=\frac{0.25}{0.04}=6.25.
$$

よって最小整数は $N=7$。$N=6$ は条件を満たさず、等号が許されても正の二枝確率にはなりません。
<!-- solution-end -->

<a id="ex-u3-12-b1"></a>
### B1：四乗平均を途中式から導く
- Level: B

$D_1,\ldots,D_k$ は相互独立で、$E[D_j]=0$、$E[D_j^2]=v$、$E[D_j^4]=\mu_4<\infty$ とする。$E[(\sum_jD_j)^4]$ を展開し、$kv^2$ に関する項を正しく数えよ。

<!-- solution-start -->
**詳細解答**：四乗展開のうち、添字が1回だけ現れる積の期待値は、独立性と $E[D_j]=0$ によって消えます。残るのは「同じ添字が4回」と「異なる2添字がそれぞれ2回」の場合です。後者で添字の組 $(i,j)$ の選び方は $k(k-1)/2$ 通り、4か所から $i$ の位置を2つ選ぶ方法は $\binom42=6$ 通りです。従って

$$
E\left[\left(\sum_{j=1}^kD_j\right)^4\right]
=k\mu_4+6\binom{k}{2}v^2
=k\mu_4+3k(k-1)v^2.
$$

特に $\mu_4\le Ch^2$、$v\le C'h$ なら $k\ge1$ について右辺は $(C+3{C'}^2)(kh)^2$ 以下です。これが [経路極限定理](#thm-u3-12-crr-brownian-limit) の四次増分評価に使う核心です。
<!-- solution-end -->

<a id="ex-u3-12-b2"></a>
### B2：CRR の補正ドリフトを再導出する
- Level: B

$h=T/N$ として $q_h=(e^{rh}-e^{-\sigma\sqrt h})/(e^{\sigma\sqrt h}-e^{-\sigma\sqrt h})$ を用いる。$r\in\mathbb R$、$\sigma,T>0$ 固定の下で、$m_h/h\to r-\sigma^2/2$ を $q_h$ の Taylor 展開から導け。$r=0$ の場合に平均対数増分が正か負かも答えよ。

<!-- solution-start -->
**詳細解答**：$a=\sigma\sqrt h$ として

$$
e^{rh}=1+rh+O(h^2),\quad
e^{-a}=1-a+\tfrac12a^2-\tfrac16a^3+O(a^4),\quad
e^a-e^{-a}=2a+\tfrac13a^3+O(a^5).
$$

分子は $a+(r-\sigma^2/2)h+a^3/6+O(h^2)$。これを分母で割ると

$$
q_h=\tfrac12+
\frac{r-\sigma^2/2}{2\sigma}\sqrt h+O(h^{3/2}).
$$

[2点増分の平均](#prop-u3-12-crr-moments)を計算して

$$
\frac{m_h}{h}
=\frac{\sigma\sqrt h}{h}(2q_h-1)
=r-\frac{\sigma^2}{2}+O(h).
$$

$r=0$ では $\sigma>0$ より極限は $-\sigma^2/2<0$。実際、有限の $h$ でも $q_h=1/(1+e^{\sigma\sqrt h})<1/2$ なので $m_h<0$ です。
<!-- solution-end -->

<a id="ex-u3-12-b3"></a>
### B3：分布収束と価格期待値
- Level: B

実数値確率変数 $Y_N$ が確率 $1-1/N$ で0、確率 $1/N$ で $N$ を取る（$N\ge2$）。$Y_N$ の分布収束先と期待値を求めよ。なぜ分布収束だけから非有界な受取額の期待値収束を推論できないか説明せよ。

<!-- solution-start -->
**詳細解答**：$P(Y_N\ne0)=1/N\to0$ なので $Y_N\to0$ は確率収束、従って分布収束します。しかし

$$
E[Y_N]
=0\cdot(1-1/N)+N\cdot(1/N)=1
$$

であり、極限変数0の期待値0へは収束しません。稀な事象の損失・利益が $N$ 倍に増え、出現確率の $1/N$ と打ち消し合うためです。$x\mapsto x$ は有界連続関数ではないので、[弱収束の定義](../../../解析系/STO/STO3A/index.md#def-sto3a-function-weak-convergence)によってこの期待値の極限は保証されません。
<!-- solution-end -->

<a id="ex-u3-12-b4"></a>
### B4：二乗和の意味を分ける
- Level: B

$\sigma>0$、$T>0$、$h=T/N$ の CRR 対数増分 $\Delta X_j\in\{\pm\sigma\sqrt h\}$ に対し、$\sum_j(\Delta X_j)^2$ を求めよ。また中心化した増分 $D_j=\Delta X_j-m_h$ の二乗和も常に同じ定数か。$q_h\ne1/2$ として $N=2$ の2つの枝列を比べよ。

<!-- solution-start -->
**詳細解答**：非中心化の和は各項が $\sigma^2h$ なので常に $\sigma^2T$ です。一方、中心化差分の二乗は、上枝で $(a-m_h)^2$、下枝で $(-a-m_h)^2$（$a=\sigma\sqrt h$）。両者の差は

$$
(a-m_h)^2-(-a-m_h)^2=-4am_h.
$$

$q_h\ne1/2$ なら $m_h=a(2q_h-1)\ne0$ なので差は0ではありません。$N=2$ の2上昇 $UU$ では $\sum D_j^2=2(a-m_h)^2$、2下降 $DD$ では $2(-a-m_h)^2$ となり、一般には異なります。中心化した和まで厳密に定数だと誤読してはいけません。
<!-- solution-end -->

<a id="ex-u3-12-c1"></a>
### C1：CRR の過程極限を説明する
- Level: C

$T>0,\sigma>0,r\in\mathbb R$ 固定、$h=T/N$ とし、十分大きい $N$ で $d_h<e^{rh}<u_h$ の CRR 木を考える。対数株価の線形補間過程 $X^{(N)}$ について、(i) 1期の平均・分散の漸近形、(ii) 中心化増分の有限次元正規極限の理由、(iii) 経路全体へ収束を強めるための条件、(iv) 満期株価の分布極限を順に述べよ。現実確率 $P$ と評価用確率 $Q_N$ の違いにも触れよ。

<!-- solution-start -->
**詳細解答**：

(i) $Y_h=\pm\sigma\sqrt h$、上昇確率 $q_h$ から

$$
m_h=\sigma\sqrt h(2q_h-1)
=(r-\sigma^2/2)h+O(h^2),\qquad
v_h=\sigma^2h-m_h^2=\sigma^2h+O(h^2).
$$

(ii) 中心化増分 $D_{h,j}=Y_{h,j}-m_h$ は独立、平均0、分散 $v_h$、絶対値 $2\sigma\sqrt h$ 以下です。$[s,t]$ の完全格子区間の個数を $k_h$ とすれば $k_hh\to t-s$、$k_hv_h\to\sigma^2(t-s)$。特性関数は

$$
\left(1-\tfrac12u^2v_h+O(h^{3/2})\right)^{k_h}
\longrightarrow e^{-u^2\sigma^2(t-s)/2}.
$$

この極限は $N(0,\sigma^2(t-s))$ の特性関数です。独立な時間ブロックで同じ議論ができ、有限次元分布の極限は $\sigma B$ のものとなります。

(iii) 有限次元分布だけでは細かな経路振動を制御しないため、タイトネスが必要です。例えば独立性・四乗展開を使って

$$
E|Z_t^{(N)}-Z_s^{(N)}|^4\le C|t-s|^2
$$

を示し、[Kolmogorov型判定](../../../解析系/STO/STO3A/index.md#thm-sto3a-kolmogorov-tightness)によりタイトネスを得ます。すると $Z^{(N)}\Longrightarrow\sigma B$。さらに $m_h/h\to r-\sigma^2/2$ なので

$$
X^{(N)}\Longrightarrow\bigl(t\mapsto(r-\sigma^2/2)t+\sigma B_t\bigr)
$$

です。これは過程の法則の収束であって、ある固定された経路へのほとんど確実収束ではありません。

(iv) 時刻 $T$ での評価 $f\mapsto f(T)$ と実数の指数関数 $x\mapsto S_0e^x$ は連続なので

$$
S_T^{(N)}=S_0e^{X_T^{(N)}}
\Longrightarrow S_0e^{(r-\sigma^2/2)T+\sigma B_T}.
$$

各 $Q_N$ は有限 CRR 木の**無裁定評価用確率**であって、現実の上昇確率 $P$ についてこの極限を断定するものではありません。価格の期待値の収束は、受取額の可積分性など別途確認が必要です。
<!-- solution-end -->

---

次の **U3-13** では、Brown 運動を使う金融モデルの関数変換に進みます。対数変換や割引をすると、通常の微分則では消えてしまう二次の補正が現れます。そこで既習の [Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula) を、株価と割引過程に具体的に適用します。
