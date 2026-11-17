# FLUID46 格子を細かくすれば必ず正しくなるか

[FLUID45の有限体積更新](../FLUID45/index.md#def-fluid45-numerical-flux)は、隣接セルの面フラックスを共有すれば総量が相殺されることを示した。しかし、保存は「正しい形で伝わる」ことではない。[一次風上法の非負性](../FLUID45/index.md#prop-fluid45-upwind-positivity)には刻みの条件が必要であり、中心流束は総量を保存しても負値を生む。

今回の問いは、**格子を細かくする操作そのものが正解を保証するか**、である。答えは否である。離散化の整合性、誤差が時間発展で増幅しない安定性、格子幅と時間刻みを一緒に減らしたときの収束性を、それぞれ確かめなくてはならない。本講は一次元の線形移流に問題を絞り、Fourierモードの計算とセル平均誤差の評価まで証明し、最後に同じ式をブラウザPythonで再現する。

## 0. 何を近似し、何を固定するか

速度 $a>0$ [m/s] で右へ流れる線密度 $q(x,t)$ [kg/m] を、周期長 $L>0$ の区間上で考える。

$$
\partial_tq+a\partial_xq=0,\qquad
q(x+L,t)=q(x,t),\qquad q(x,0)=q_0(x).
$$

周期的な初期値なら厳密解は $q(x,t)=q_0(x-at)$ である。$q_t=-a q_0'(x-at)$、$q_x=q_0'(x-at)$ を代入すると方程式を満たす。セル数 $N\geq4$、セル幅 $h=L/N$、時刻 $t_n=n\Delta t$（$\Delta t>0$）を定める。周期添字を $Q_{j+N}^n=Q_j^n$ とし、**点値ではなくセル平均**を計算する。

[FLUID45のセル平均](../FLUID45/index.md#def-fluid45-cell-average)を $u_j(t)=h^{-1}\int_{jh}^{(j+1)h}q(x,t)\,dx$ と書き、その近似を $Q_j^n$ とする。正速度の一次風上法は

$$
Q_j^{n+1}=Q_j^n-\lambda(Q_j^n-Q_{j-1}^n),
\qquad \lambda=\frac{a\Delta t}{h}.
$$

これは[単一面フラックスによる更新](../FLUID45/index.md#def-fluid45-numerical-flux)へ $F_{j+1/2}=aQ_j$ を代入した式である。同じ保存形で中心流束 $F_{j+1/2}=\tfrac a2(Q_j+Q_{j+1})$ を選ぶと

$$
Q_j^{n+1}=Q_j^n-\frac{\lambda}{2}(Q_{j+1}^n-Q_{j-1}^n).
$$

後者を「中心差分＋陽的Euler時間更新（FTCS）」と呼ぶ。本講で不安定と証明するのは**この組合せ**であり、あらゆる中心空間差分や時間積分法が不安定という主張ではない。実験では $L=1$ m、$a=1$ m/s、$T\leq0.5$ s に固定する。

## 1. 速度と刻みを一つの数で比較する

時間を短くすることと空間を細かくすることは独立の操作である。たとえば $a=2$ m/s、$h=0.1$ m のとき、$\Delta t=0.04$ s の移動距離は $0.08$ m、$\Delta t=0.06$ s なら $0.12$ m。後者は一刻みで一セル幅を超える。

<a id="def-fluid46-cfl"></a>

<!-- formal-statement-start -->
> **定義（Courant数と格子細分経路）**  
> 一次元の一定速度 $a>0$、幅 $h>0$、時間刻み $\Delta t>0$ に対し、無次元数
>
$$
\lambda=\frac{a\Delta t}{h}
$$
>
> をCourant数と呼ぶ。格子細分経路とは、$h_r\to0$ と $\Delta t_r\to0$ を同時に指定する列である。一次風上法の条件 $0<\lambda_r\leq1$ は、この経路に対するCFL条件である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid46-cfl -->
**定義の確認**：上記の二刻みで $\lambda=2(0.04)/0.1=0.8$ と $\lambda=2(0.06)/0.1=1.2$ を得る。幅を半分の $0.05$ m にして時間刻みを $0.04$ s に据え置けば $\lambda=1.6$ に上がる。反対に $h$ と $\Delta t$ をともに半分にすれば $\lambda=0.8$ のままである。単位も $(\mathrm{m/s})\mathrm{s}/\mathrm{m}=1$ で消える。
<!-- definition-example-end -->

**CFLはどんな離散化にも共通する万能の十分条件ではない。** 本講では、特定の風上法についてこの範囲が安定性を与えると証明する。中心FTCSには同じ範囲を与えても安定性が得られない。

## 2. 一つの波が増えるか減るかを調べる

不規則な初期値をいきなり調べる代わりに、周期格子の一つの波を入力する。ここで $i^2=-1$ とする複素数を計算上の道具として使い、実数の波は実部・虚部を取ることで回収する。$m=0,\ldots,N-1$ に対し $\theta_m=2\pi m/N$ とし、波形 $e^{ij\theta_m}$ を考える。

<a id="def-fluid46-fourier"></a>

<!-- formal-statement-start -->
> **定義（Fourier増幅因子と格子の安定性）**  
> 周期格子の線形更新に $Q_j^n=G(\theta)^n e^{ij\theta}$（$\theta=2\pi m/N$）を代入したときの複素数 $G(\theta)$ を、その波の一歩の増幅因子と呼ぶ。$|G|$ は一歩の振幅倍率、$-\arg G$ は一歩の右向き位相進行量である。格子ノルムを
>
$$
\|V\|_{2,h}^2=h\sum_{j=0}^{N-1}|V_j|^2
$$
>
> とする。固定した終時刻 $T$ に対し、$h,\Delta t$ に依存しない定数 $C_T$ が存在して、$0\leq n\Delta t\leq T$ の全更新で $\|Q^n\|_{2,h}\leq C_T\|Q^0\|_{2,h}$ となるとき、その格子細分経路上で安定という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid46-fourier -->
**定義の確認**：更新が単に $Q_j^{n+1}=\tfrac12Q_j^n$ なら、波 $e^{ij\theta}$ に対し $G=1/2$ で振幅は半分、位相進行は零である。別の例として $Q_j^{n+1}=Q_{j-1}^n$ なら $G=e^{-i\theta}$、振幅1でちょうど一セル分右へ動く。前者は減衰、後者は減衰を伴わない移送であり、**振幅と位相は別の情報**である。
<!-- definition-example-end -->

なぜ単一の波を調べて全格子値に言及できるのか。$m\ne\ell$ なら等比級数の公式より

$$
\sum_{j=0}^{N-1}e^{ij(\theta_m-\theta_\ell)}
=\frac{1-e^{iN(\theta_m-\theta_\ell)}}
{1-e^{i(\theta_m-\theta_\ell)}}=0
$$

であり、$m=\ell$ なら和は $N$ である。$N$ 個の波は互いに直交し、$N$ 次元の複素ベクトル空間の基底をなす。任意の初期格子値は $Q_j^0=\sum_m c_m e^{ij\theta_m}$ と展開できる。各波が倍率 $G_m^n$ で進めば、交差項は上の直交性で消え、

$$
\|Q^n\|_{2,h}^2
=Nh\sum_{m=0}^{N-1}|c_m|^2|G_m|^{2n}.
$$

よってすべての波で $|G_m|\leq1$ なら $C_T=1$ で安定である。逆に格子細分につれてある波の $|G_m|^n$ が無限に増大すれば、一様な $C_T$ は存在しない。これは**周期・定係数・線形**という本講の仮定を使った判定法である。

## 3. 一次風上法の安定性を証明する

風上更新に $Q_j^n=G^n e^{ij\theta}$ を代入して、共通因子 $G^n e^{ij\theta}$ を除くと

$$
G_{\rm up}(\theta)=1-\lambda(1-e^{-i\theta})
=(1-\lambda)+\lambda\cos\theta-i\lambda\sin\theta.
$$

複素数の大きさの二乗を計算する。$\cos^2\theta+\sin^2\theta=1$ を用いて

$$
\begin{aligned}
|G_{\rm up}|^2
&=(1-\lambda+\lambda\cos\theta)^2+\lambda^2\sin^2\theta\\
&=(1-\lambda)^2+2\lambda(1-\lambda)\cos\theta+\lambda^2\\
&=1-2\lambda(1-\lambda)(1-\cos\theta).
\end{aligned}
$$

<a id="thm-fluid46-upwind-stability"></a>

<!-- formal-statement-start -->
> **定理（周期一次風上法の安定範囲）**  
> $a>0$、$L>0$、$N\geq4$ の偶数、$h=L/N$ と $\Delta t>0$ を用いた一次風上更新を考える。$0<\lambda=a\Delta t/h\leq1$ なら、全周期格子値について
>
$$
\|Q^{n+1}\|_{2,h}\leq\|Q^n\|_{2,h},
\qquad
\min_jQ_j^n\leq Q_j^{n+1}\leq\max_jQ_j^n
$$
>
> が成立する（後半は実数の格子値）。$\lambda>1$ なら交互符号の格子波に $|G_{\rm up}|>1$ が生じ、$\lambda$ を一定に保って格子を細分する経路では安定でない。
<!-- formal-statement-end -->

### 証明の見取り図

上の $|G|^2$ において $1-\cos\theta\geq0$ である。$\lambda\leq1$ なら振幅が増えず、波の直交展開から全格子ノルムに戻せる。セル値の上下限は[前講の非負重み更新](../FLUID45/index.md#prop-fluid45-upwind-positivity)の仮定をここで再確認する。失敗側では $\theta=\pi$ を一つ選ぶ。

<!-- proof-start -->
### 証明

$0<\lambda\leq1$ なら $\lambda(1-\lambda)\geq0$ なので、任意の許された $\theta$ で $|G_{\rm up}(\theta)|^2\leq1$。先に示した直交展開から

$$
\|Q^{n+1}\|_{2,h}^2
=Nh\sum_m|c_m|^2|G_m|^{2(n+1)}
\leq Nh\sum_m|c_m|^2|G_m|^{2n}
=\|Q^n\|_{2,h}^2.
$$

さらに風上更新は $(1-\lambda)Q_j^n+\lambda Q_{j-1}^n$ であり、二係数は非負で和が1だから各新値は旧値の最小と最大の間にある。

$\lambda>1$ かつ偶数 $N$ なら $m=N/2$ を選べるので $\theta=\pi$ である。このとき

$$
G_{\rm up}(\pi)=1-2\lambda,\qquad |G_{\rm up}(\pi)|=2\lambda-1>1.
$$

初期値 $Q_j^0=(-1)^j$ では $Q_j^n=(1-2\lambda)^n(-1)^j$、したがってノルムは $(2\lambda-1)^n$ 倍になる。固定した $T>0$ と $\Delta t=\lambda h/a$ に対し $n=\lfloor T/\Delta t\rfloor\to\infty$ なので、格子に依存しない $C_T$ で上から抑えることはできない。
<!-- proof-end -->

$\lambda>1$ の例でも[面流束の相殺による総量保存](../FLUID45/index.md#thm-fluid45-global-balance)自体は成立する。全質量が変わらないことと、局所誤差が増幅しないことは独立である。

## 4. 同じCFLでも中心FTCSが不安定な理由

中心差分の更新へ同じ波を代入する。

$$
\begin{aligned}
G_{\rm cen}(\theta)
&=1-\frac{\lambda}{2}(e^{i\theta}-e^{-i\theta})\\
&=1-i\lambda\sin\theta,\\
|G_{\rm cen}(\theta)|^2&=1+\lambda^2\sin^2\theta.
\end{aligned}
$$

<a id="thm-fluid46-centered-instability"></a>

<!-- formal-statement-start -->
> **定理（中心FTCSの不安定性）**  
> 周期長 $L>0$ の一次元移流方程式を、中心空間差分と陽的Euler時間更新で解く。方程式と速度の条件は

$
q_t+aq_x=0,\qquad a>0.
$

> セル数 $N$ は4の倍数とし、格子幅を $h=L/N$ とする。正のCourant数を固定して格子細分するとき、

$
0<\lambda=\frac{a\Delta t}{h},\qquad h\to0,
$

> この格子細分経路は上で定義した格子 $L^2$ 型ノルムに関して不安定である。
<!-- formal-statement-end -->

### 証明の見取り図

格子に許される波数 $\theta=\pi/2$ を選ぶと、振幅倍率が $\sqrt{1+\lambda^2}>1$ となる。固定時間までの更新回数が格子細分で増えるため、増幅が無制限になる。

<!-- proof-start -->
### 証明

$N$ が4の倍数なので $m=N/4$ とおくと $\theta_m=\pi/2$、$\sin\theta_m=1$ である。上式より

$$
|G_{\rm cen}(\pi/2)|=\sqrt{1+\lambda^2}>1.
$$

実数初期値として $Q_j^0=\cos(j\pi/2)$ を取ると、更新はその正弦・余弦成分を回転・拡大し、二成分全体のノルムは各歩で $\sqrt{1+\lambda^2}$ 倍になる。$T>0$ を固定し $n=\lfloor T/\Delta t\rfloor$ とすれば、$\Delta t=\lambda L/(aN)$ から $n\to\infty$ である。したがって

$$
\frac{\|Q^n\|_{2,h}}{\|Q^0\|_{2,h}}
=(1+\lambda^2)^{n/2}\longrightarrow\infty.
$$

[Fourier増幅因子の安定性定義](#def-fluid46-fourier)の一様上界に反する。
<!-- proof-end -->

この反例は細分するたびに選ぶ高周波の格子波である。固定した滑らかな正弦波一つの有限回実験が穏やかに見えても、**すべての格子擾乱を抑える安定性**の証明にはならない。逆に「中心差分は必ず大振幅になる」という言い方も不正確である。たとえば $\theta=\pi$ では $\sin\theta=0$ で $|G|=1$、そのモードだけは一歩では成長しない。

## 5. 正しく見える波が広がり、遅れるのはなぜか

安定な風上更新でも山が少し低くなり、谷が少し高くなる場合がある。実際の方程式にはその作用がないのに、離散化が作り出すこのような平滑化を**数値拡散**と呼ぶ。以下では、滑らかな波に対してその強さを係数で求める。これが物理的な粘性に由来する拡散とは区別すべき点である。

### 5.1 数値拡散の主要係数

安定していても、風上法は一般に振幅を小さくする。これを連続方程式と比べるには、滑らかな関数を差分式へ代入してTaylor展開する。ここでは $q$ が必要な階数まで微分可能で、$\lambda=a\Delta t/h$ を固定することを仮定する。 この計算は点値法だけの議論ではない。セル平均を連続位置 $x$ に拡張した $v_h(x,t)=h^{-1}\int_{x-h/2}^{x+h/2}q(y,t)\,dy$ は $v_{h,t}+a v_{h,x}=0$ を満たし、$Q_j^n$ が近似するのは格子中心 $x_j$ における $v_h(x_j,t_n)$ である。以下のTaylor式では、この平均化した滑らかな場を簡単のため再び $q$ と記す。

時間側と左差分側をそれぞれ展開すると

$$
\begin{aligned}
\frac{q(x,t+\Delta t)-q(x,t)}{\Delta t}
&=q_t+\frac{\Delta t}{2}q_{tt}+O(\Delta t^2),\\
\frac{q(x,t)-q(x-h,t)}h
&=q_x-\frac h2q_{xx}+O(h^2).
\end{aligned}
$$

厳密な移流解では $q_t=-aq_x$、二回微分して $q_{tt}=a^2q_{xx}$ なので、主要な差を右辺へ集める。

<a id="prop-fluid46-modified"></a>

<!-- formal-statement-start -->
> **命題（一次風上法の主要な数値拡散）**  
> 一次風上更新を滑らかな関数へ適用した形式的な修正方程式は、$\Delta t=\lambda h/a$（$a>0$、$\lambda$ 固定）のもとで
>
$$
q_t+aq_x=\nu_{\rm num}q_{xx}+O(h^2),
\qquad
\nu_{\rm num}=\frac{ah}{2}(1-\lambda).
$$
>
> これは滑らかな波の主要誤差の記述であり、不連続波の全域へ同じTaylor展開を適用できるという主張ではない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

二つのTaylor展開を風上差分式に代入すると

$$
q_t+\frac{\Delta t}{2}q_{tt}+O(\Delta t^2)
=-aq_x+\frac{ah}{2}q_{xx}+O(h^2).
$$

右辺へ $\frac{\Delta t}{2}q_{tt}$ を移し、移流方程式の先頭近似 $q_{tt}=a^2q_{xx}$ を代入すると

$$
q_t+aq_x=\left(\frac{ah}{2}-\frac{a^2\Delta t}{2}\right)q_{xx}
+O(h^2+\Delta t^2).
$$

$\Delta t=\lambda h/a$ を代入して係数を $\frac{ah}2(1-\lambda)$ とする。$\lambda$ が固定なら $\Delta t^2=O(h^2)$ である。
<!-- proof-end -->

例えば $a=1$ m/s、$h=0.02$ m、$\lambda=0.8$ なら $\nu_{\rm num}=0.002\ {\rm m^2/s}$、$\lambda=0.4$ なら $\nu_{\rm num}=0.006\ {\rm m^2/s}$ になる。**同じ格子で時間刻みだけ短くすると、主要な数値拡散がむしろ増える**場合がある。これは時間精度だけを改善しても全誤差が単調減少するとは限らないという例である。$\lambda=1$ なら更新は $Q_j^{n+1}=Q_{j-1}^n$ となり、一定速度で厳密に一セル分移動するので、この特殊な格子移送ではセル平均が厳密である。

### 5.2 振幅誤差と位相誤差

一つの波 $e^{ij\theta}$ の厳密な一歩の進行は $G_{\rm exact}=e^{-i\lambda\theta}$ であり、振幅は1、右向きの位相進行量は $\lambda\theta$ である。数値法では増幅因子を $G=|G|e^{-i\phi}$ と書ける。$n$ 歩後に振幅は $|G|^n$ 倍、位相進行は $n\phi$ だから、**振幅の減少（拡散）**と **$n(\phi-\lambda\theta)$ の位相ずれ（分散誤差）**を別々に測る。

風上法の $\phi$ は、象限を保つ関数 $\operatorname{atan2}$ を用いて

$$
\phi=\operatorname{atan2}\left(\lambda\sin\theta,\,
1-\lambda+\lambda\cos\theta\right)
$$

と表せる。ただし $G=0$ では位相は定義できない。例えば $\lambda=1/2,\theta=\pi$ なら $G=0$ で振幅が一歩で消え、位相を比較する意味はない。中心FTCSでは振幅が増える一方、$\phi=\operatorname{atan2}(\lambda\sin\theta,1)$ であり、振幅と位相の誤りが同時に存在し得る。

## 6. 「収束」を言うための比較対象と証明

[セル平均の定義](../FLUID45/index.md#def-fluid45-cell-average)に戻り、滑らかな厳密解のセル平均 $u_j(t_n)$ と数値セル値 $Q_j^n$ を比べる。セル中心での点値を比較相手にしない。

<a id="def-fluid46-errors"></a>

<!-- formal-statement-start -->
> **定義（セル平均誤差と観測収束次数）**  
> 終時刻 $T=n\Delta t$ の厳密セル平均 $u_j(T)$ と数値値 $Q_j^n$ の誤差を $e_j^n=Q_j^n-u_j(T)$ とする。区間長 $L=Nh$ について
>
$$
E_1(h,\Delta t;T)=h\sum_{j=0}^{N-1}|e_j^n|,
\qquad
E_\infty(h,\Delta t;T)=\max_j|e_j^n|
$$
>
> を定める。終時刻とCFLの指定方法を揃え、幅を $h$ から $h/2$ にした二計算で $E_1>0$ なら観測収束次数を
>
$$
p_{\rm obs}=\log_2
\frac{E_1(h,\Delta t;T)}
{E_1(h/2,\Delta t';T)}
$$
>
> と定義する。これは有限個の数値結果から計算する指標であり、普遍的な収束定理そのものではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid46-errors -->
**定義の確認**：$L=1$、$N=2$、$h=1/2$、厳密平均 $(1,1)$、数値平均 $(1.1,0.9)$ なら $e=(0.1,-0.1)$、$E_1=\tfrac12(0.1+0.1)=0.1$ kg、$E_\infty=0.1$ kg/m である。全質量差は $\tfrac12(0.1-0.1)=0$ kg であり、**総量が正確でも誤差ノルムは零ではない**。次の細分格子で同じ時刻の $E_1=0.05$ kg なら $p_{\rm obs}=\log_2(0.1/0.05)=1$ となる。
<!-- definition-example-end -->

### 6.1 滑らかなデータでは一次風上法が収束する

局所誤差が小さいというだけでは、反復で増幅される可能性がある。[一次風上法の安定性定理](#thm-fluid46-upwind-stability)があるからこそ、局所誤差を足し合わせて全誤差を制御できる。

<a id="thm-fluid46-smooth-convergence"></a>

<!-- formal-statement-start -->
> **定理（滑らかな周期解に対する一次風上法の収束）**  
> $a>0$、$L>0$ を固定し、$q_0$ は周期的な $C^2$ 級関数、$M=\sup_x|q_0''(x)|<\infty$ とする。$N\geq4$、$h=L/N$、$\Delta t>0$、$0<\lambda=a\Delta t/h\leq1$、$T=n\Delta t$ とする。初期セル値を厳密平均 $Q_j^0=u_j(0)$ として周期一次風上更新を $n$ 回行えば
>
$$
E_\infty(h,\Delta t;T)
\leq 2aMTh+\frac{a^2MT}{2}\Delta t,
\qquad
E_1(h,\Delta t;T)\leq L E_\infty(h,\Delta t;T).
$$
>
> 特に $T$ を固定し、CFL条件を守って $h,\Delta t\to0$ とすれば $E_1,E_\infty\to0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

厳密なセル平均を一歩更新式へ入力し、左差分による誤差と時間Taylor展開の誤差を別々に上から評価する。数値解との差を一歩ずつ追うと、CFL条件によって既存誤差は非負係数の平均でしか伝わらない。各歩の新しい局所誤差だけを加える。

<!-- proof-start -->
### 証明

厳密解 $q(x,t)=q_0(x-at)$ は二階まで微分でき、任意の $x,t$ で $|q_{xx}(x,t)|\leq M$、$|q_{tt}(x,t)|=a^2|q_{xx}(x,t)|\leq a^2M$ である。厳密セル平均について

$$
u_j'(t)=-\frac{a}{h}\int_{jh}^{(j+1)h}q_x(x,t)\,dx.
$$

一方、差分の積分表示は

$$
\frac{u_j(t)-u_{j-1}(t)}h
=\frac{1}{h^2}\int_0^h\int_{(j-1)h+s}^{jh+s}
q_x(y,t)\,dy\,ds.
$$

右辺は $q_x$ を隣接する長さ $h$ の区間で平均した値であり、前の式はセル $[jh,(j+1)h]$ での平均である。両平均に現れる点の距離は高々 $2h$。$q_x$ のLipschitz定数が $M$ なので、二つの平均値の差は高々 $2Mh$ である。従って

$$
\left|u_j'(t)+a\frac{u_j(t)-u_{j-1}(t)}h\right|
\leq 2aMh.
$$

さらに $|u_j''(t)|\leq a^2M$ だから、時間Taylor展開の積分剰余より

$$
|u_j(t+\Delta t)-u_j(t)-\Delta t\,u_j'(t)|
\leq \frac{a^2M}{2}\Delta t^2.
$$

両式を合わせると、厳密平均を風上更新に一歩代入した残差 $r_j^n$ は

$$
\begin{aligned}
u_j(t_{n+1})&=(1-\lambda)u_j(t_n)+
\lambda u_{j-1}(t_n)+r_j^n,\\
|r_j^n|&\leq 2aMh\Delta t+\frac{a^2M}{2}\Delta t^2.
\end{aligned}
$$

数値値から厳密平均を引いた $e_j^n=Q_j^n-u_j(t_n)$ は

$$
e_j^{n+1}=(1-\lambda)e_j^n+\lambda e_{j-1}^n-r_j^n.
$$

CFL条件により $1-\lambda,\lambda\geq0$ で和が1だから、最大絶対値を取ると

$$
\max_j|e_j^{n+1}|
\leq\max_j|e_j^n|+
2aMh\Delta t+\frac{a^2M}{2}\Delta t^2.
$$

$e_j^0=0$ から $n$ 回足す。$n\Delta t=T$ を代入すると

$$
E_\infty\leq
n\left(2aMh\Delta t+\frac{a^2M}{2}\Delta t^2\right)
=2aMTh+\frac{a^2MT}{2}\Delta t.
$$

最後に $E_1=h\sum|e_j^n|\leq Nh E_\infty=L E_\infty$。両刻みを減らせば右辺は零へ向かう。
<!-- proof-end -->

この定理は**線形・一定速度・周期境界・滑らかな初期値・正確な初期セル平均**という範囲の結論である。不連続解を含むEuler系や高次元流体への一般的保証ではない。段差のある初期値では上の $M$ が有限でないため、この証明はそのまま使えない。格子を固定して時間刻みだけ減らす場合も、右辺の $2aMTh$ は残るので収束定理の結論とは異なる。

## 7. 実行ラボ：安定、発散、誤差の減少を混同しない

このPythonラボは、周期一次元移流の**厳密セル平均**を解析積分で作り、同じ配列更新で風上法と中心FTCSを比較する。正弦波初期値の厳密セル平均は、波数 $k$（整数）と中心 $x_j=(j+\tfrac12)h$ を用いて

$$
u_j(t)=1+A\frac{\sin(\pi kh/L)}{\pi kh/L}
\sin\frac{2\pi k(x_j-at)}L.
$$

前章と同様、$\sin z/z$ はセルでの積分に由来し、点値を代用していない。$k=1$ は同じ滑らかな初期値を格子間で比較する実験、$k=N/4$ は**格子に依存する高周波擾乱**を使った安定性の反例である。後者を収束次数の測定に用いてはいけない。

<!-- python-file-lab -->
# lab-id: FLUID46-STABILITY-CONVERGENCE
# lab-title: 風上法と中心FTCS・厳密セル平均・誤差比較
# lab-file: textbook/volumes/dream_thater/物理系/FLUID/FLUID46/grid_convergence_lab.py
# timeout-ms: 30000
# lab-preset: 安定な風上・48セル | --grid 48 --scheme upwind --case smooth --cfl 0.8 --time 0.4
# lab-preset: 安定な風上・96セル | --grid 96 --scheme upwind --case smooth --cfl 0.8 --time 0.4
# lab-preset: 空間格子細分（CFL一定） | --study space
# lab-preset: 時間刻みだけ細分（格子一定） | --study time
# lab-preset: 不安定な中心FTCS・高周波 | --grid 64 --scheme centered --case high --cfl 0.8 --time 0.2
# lab-preset: 不安定な風上・CFL超過 | --grid 64 --scheme upwind --case high --cfl 1.2 --time 0.2
# lab-preset: Python自己検算 | --self-test
<!-- python-file-lab-end -->

各ラボ出力では、実際の $\Delta t$ とCFL、Fourier増幅倍率、質量残差、$E_1$ と $E_\infty$ を区別して記録する。Pythonソースタブから同じファイルを読める。安定プリセットでは曲線と誤差を一緒に見られるが、不安定プリセットには明示的に **UNSTABLE** と表示する。計算が有限値を返したり総質量が一致したりしても、収束に成功した意味にはしない。振幅が安全上限を超えた場合は計算を打ち切り、未計算時刻の誤差を数値として偽装しない。

空間細分では $N=24,48,96$ に対し目標CFLを揃え、各段で実際の時間刻みを終時刻に合わせて微調整する。実際のCFLは出力で確認する。時間細分では $N=48$ を固定して刻みを減らす。これらは有限個の比較にすぎず、全格子での収束の**根拠は[収束定理の証明](#thm-fluid46-smooth-convergence)**にある。

## 8. 演習：保存・安定・精度を分けて判定する

### Level A

#### A1. CFLと細分経路
- Level: A

$a=3$ m/s、$h=0.06$ m、$\Delta t=0.015$ s のCourant数を計算せよ。$h$ だけを半分にした場合と、$h,\Delta t$ をともに半分にした場合も調べ、一次風上法の安定性を判定せよ。

<!-- solution-start -->
#### 詳細解答

[Courant数と格子細分経路](#def-fluid46-cfl)で定めた $\lambda=a\Delta t/h$ を使うと

$$
\lambda=\frac{3(0.015)}{0.06}=0.75.
$$

$h=0.03$ m、$\Delta t=0.015$ s なら $\lambda=3(0.015)/0.03=1.5$ で[風上安定定理](#thm-fluid46-upwind-stability)の条件を満たさない。両方を半分にすると $\lambda=3(0.0075)/0.03=0.75$ で条件を満たす。空間だけを細かくする操作はCFLを悪化させ得る。
<!-- solution-end -->

#### A2. 風上法の倍率
- Level: A

$\lambda=1/2,\theta=\pi$ の風上増幅因子と振幅を計算せよ。その結果を交互符号初期値の一歩後と照合せよ。

<!-- solution-start -->
#### 詳細解答

[風上安定定理](#thm-fluid46-upwind-stability)の計算から

$$
G_{\rm up}(\pi)=1-\tfrac12(1-(-1))=0,\qquad |G_{\rm up}|=0.
$$

$Q_j^0=(-1)^j$ なら $Q_{j-1}^0=-Q_j^0$ なので、更新は

$$
Q_j^1=\tfrac12Q_j^0+\tfrac12Q_{j-1}^0=0.
$$

交互符号の波は一歩で完全に消える。これは保存総量零とは別の、波形に関する情報である。
<!-- solution-end -->

#### A3. 誤差と質量差は同じか
- Level: A

$L=1$ m、$N=4$、厳密セル平均 $(1,1,1,1)$ kg/m、数値値 $(1.2,0.8,1.1,0.9)$ kg/m の $E_1,E_\infty$ と総質量差を求めよ。

<!-- solution-start -->
#### 詳細解答

[誤差の定義](#def-fluid46-errors)より $h=1/4$ m、誤差は $(0.2,-0.2,0.1,-0.1)$ kg/m である。従って

$$
E_1=\frac14(0.2+0.2+0.1+0.1)=0.15\ {\rm kg},
\qquad E_\infty=0.2\ {\rm kg/m}.
$$

総質量差は $h(0.2-0.2+0.1-0.1)=0$ kg。正負誤差が相殺されても $E_1$ は相殺されない。
<!-- solution-end -->

#### A4. 中心FTCSの一波
- Level: A

$\lambda=0.8,\theta=\pi/2$ で中心FTCSの $G$ と $|G|$ を求めよ。CFLが1より小さければ安定という主張を判定せよ。

<!-- solution-start -->
#### 詳細解答

[中心FTCSの不安定性定理](#thm-fluid46-centered-instability)の導出を適用して

$$
G=1-i(0.8)\sin(\pi/2)=1-0.8i,
\qquad |G|=\sqrt{1+0.8^2}=\sqrt{1.64}\approx1.2806.
$$

一歩で振幅が約28%増す波が存在する。$0.8<1$ だが、この離散化は安定ではない。CFL範囲の十分性は風上法など具体的な更新に対して判定すべきである。
<!-- solution-end -->

#### A5. 一セル分の厳密な移送
- Level: A

一次風上法で $\lambda=1$ のときの更新を求め、どの初期セル値に対して正確に一セル右へ移るかを答えよ。さらにそのときの数値拡散係数を求めよ。

<!-- solution-start -->
#### 詳細解答

風上更新へ $\lambda=1$ を入れて

$$
Q_j^{n+1}=(1-1)Q_j^n+1\cdot Q_{j-1}^n=Q_{j-1}^n.
$$

区間長 $L$ の周期セル平均で初期値 $Q_j^0=u_j(0)$ を用い、速度 $a>0$ で $\Delta t=h/a$ とすれば、厳密解の移送距離は $a\Delta t=h$ である。ゆえに $u_j(t+\Delta t)=u_{j-1}(t)$ が成立し、滑らかさを問わずセル平均は正確に更新される。[主要数値拡散係数](#prop-fluid46-modified)は $\nu_{\rm num}=ah(1-1)/2=0$ である。ただしこの特殊性を任意の速度・境界・多次元格子へ拡張できない。
<!-- solution-end -->

### Level B

#### B1. 中心FTCSの反例を作る
- Level: B

$N=4k$、$0<\lambda$ 固定として $\theta=\pi/2$ の実数波を入力せよ。一歩の二つの成分と増幅倍率を示し、固定終時刻 $T$ での安定性の破綻を論証せよ。

<!-- solution-start -->
#### 詳細解答

入力 $Q_j^0=\cos(j\pi/2)$ とする。中心FTCS更新に対して

$$
\begin{aligned}
Q_j^1
&=\cos(j\pi/2)-\frac{\lambda}{2}
[\cos((j+1)\pi/2)-\cos((j-1)\pi/2)]\\
&=\cos(j\pi/2)+\lambda\sin(j\pi/2).
\end{aligned}
$$

二行目は $\cos(A+B)-\cos(A-B)=-2\sin A\sin B$ と $\sin(\pi/2)=1$ から従う。直交する余弦・正弦の係数が $(1,\lambda)$ になり、ノルム倍率は $\sqrt{1+\lambda^2}>1$。各歩で同じ更新行列が作用するので $n$ 歩の倍率は $(1+\lambda^2)^{n/2}$。$h=L/N$、$\Delta t=\lambda h/a$ より $n=\lfloor T/\Delta t\rfloor$ は $N\to\infty$ で増加する。[安定性の定義](#def-fluid46-fourier)に必要な一様上界は存在しない。
<!-- solution-end -->

#### B2. 時間だけ細かくするとどうなるか
- Level: B

$a=1$ m/s、$h=0.04$ m で $\lambda=0.8$ と $0.4$ を採用する。両者の $\Delta t$、[風上数値拡散の主要係数](#prop-fluid46-modified)を計算せよ。後者の全誤差が必ず小さいという判断の是非を述べよ。

<!-- solution-start -->
#### 詳細解答

[Courant数](#def-fluid46-cfl)から $\Delta t=\lambda h/a$ である。したがって

$$
\Delta t_{0.8}=0.8(0.04)/1=0.032\ {\rm s},
\qquad
\Delta t_{0.4}=0.4(0.04)/1=0.016\ {\rm s}.
$$

[数値拡散係数](#prop-fluid46-modified)へ代入すると

$$
\nu_{0.8}=\frac{1(0.04)}2(1-0.8)=0.004\ {\rm m^2/s},
\qquad
\nu_{0.4}=\frac{1(0.04)}2(1-0.4)=0.012\ {\rm m^2/s}.
$$

刻みは後者で半分になったが主要拡散係数は3倍である。よって総誤差が必ず小さくなるとは言えない。これは修正方程式による滑らかな波についての主要誤差の比較であり、任意の初期値・時刻の誤差を厳密に大小比較したものではない。
<!-- solution-end -->

#### B3. 収束定理の最終段階を導く
- Level: B

厳密セル平均を初期値として、一歩の局所残差が一様に $|r_j^n|\leq A h\Delta t+B\Delta t^2$、更新が $Q_j^{n+1}=(1-\lambda)Q_j^n+\lambda Q_{j-1}^n$（$0\leq\lambda\leq1$）とする。固定 $T=n\Delta t$ で $E_\infty,E_1$ を評価し、$h,\Delta t\to0$ の結論を出せ。

<!-- solution-start -->
#### 詳細解答

厳密値と数値値の差 $e_j^n$ は、局所残差を差し引くことで

$$
e_j^{n+1}=(1-\lambda)e_j^n+\lambda e_{j-1}^n-r_j^n
$$

を満たす。$0\leq\lambda\leq1$ であり、絶対値の基本評価 $|x+y|\leq|x|+|y|$ を順に用いると

$$
\max_j|e_j^{n+1}|
\leq(1-\lambda)\max_j|e_j^n|+
\lambda\max_j|e_j^n|+Ah\Delta t+B\Delta t^2.
$$

係数の和が1で初期誤差は零だから、$n$ 回足して

$$
E_\infty\leq n(Ah\Delta t+B\Delta t^2)
=T(Ah+B\Delta t).
$$

[セル平均誤差](#def-fluid46-errors)について $E_1=h\sum_j|e_j|\leq Nh E_\infty=L T(Ah+B\Delta t)$。$A,B,L,T$ が格子によらず有限なら両刻みを減らすと零へ行く。[本章の滑らかな解の収束定理](#thm-fluid46-smooth-convergence)では $A=2aM$、$B=a^2M/2$ に相当する。
<!-- solution-end -->

#### B4. 位相と振幅を別々に判定する
- Level: B

一次風上法で $\lambda=0.8,\theta=\pi/2$ とする。$|G|$、数値的な右向き位相 $\phi$、厳密な位相 $\lambda\theta$ を計算せよ。波が一歩でどのように変わるか説明せよ。

<!-- solution-start -->
#### 詳細解答

[風上増幅因子](#thm-fluid46-upwind-stability)の式へ代入する。

$$
G=(1-0.8)+0.8\cos(\pi/2)-i0.8\sin(\pi/2)
=0.2-0.8i.
$$

よって

$$
|G|=\sqrt{0.2^2+0.8^2}=\sqrt{0.68}\approx0.8246.
$$

位相進行量は $\phi=\operatorname{atan2}(0.8,0.2)=\arctan4\approx1.3258$ rad。厳密な位相は $\lambda\theta=0.8(\pi/2)\approx1.2566$ rad だから、一歩の位相差は約 $0.0692$ rad。振幅は約17.5%減衰し、位相は厳密な進行より約0.069 rad多く進む。前者が振幅誤差、後者が位相誤差である。波の山が低くなることと位置がずれることは区別する。
<!-- solution-end -->

### Level C

#### C1. 収束の証拠を設計し、誤判定を排除する
- Level: C

周期一次元移流の同じ滑らかな初期値を終時刻 $T$ まで数値計算したい。$a=1$ m/s、$L=1$ m、$N=40,80,160$ とする。

1. 一次風上法を $\lambda=0.8$ を目標として実行する場合の $h,\Delta t$ を求め、同じ $T$ に合わせて整数歩へ調整するときに何を記録するべきか述べよ。
2. $E_1$ が順に $0.032,0.016,0.008$ kg だったとき、二つの観測次数を計算せよ。これだけで全初期値への収束を証明できるか。
3. 中心FTCSが同じ計算で総質量を正確に保ち、ある滑らかな一波の誤差も小さく見えたとする。それでも中心FTCSの収束を主張してはいけない理由を、具体的なFourier波と関連づけて説明せよ。
4. 比較の基準を点値に変えてはいけない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

（1）格子幅は $h=L/N$ なので

$$
h_{40}=0.025,\quad h_{80}=0.0125,\quad
h_{160}=0.00625\ {\rm m}.
$$

目標 $\Delta t=\lambda h/a$ により

$$
\Delta t_{40}=0.02,\quad \Delta t_{80}=0.01,\quad
\Delta t_{160}=0.005\ {\rm s}.
$$

終時刻 $T$ が各刻みの整数倍でないなら、例えば $n_N=\lceil T/(0.8h_N/a)\rceil$ と置き、実刻みを $\Delta t_N=T/n_N$ とする。これで終時刻を揃え、実際の $\lambda_N=a\Delta t_N/h_N\leq0.8$ も保持できる。比較記録には $N,h_N,n_N,\Delta t_N,\lambda_N,T$、初期値の作り方、境界条件を含める。

（2）[観測次数](#def-fluid46-errors)から

$$
p_{40\to80}=\log_2(0.032/0.016)=1,\qquad
p_{80\to160}=\log_2(0.016/0.008)=1.
$$

これは指定した三格子、同じ初期値と時刻で一次の減少が観測されたというだけである。極限 $h\to0$ や別の初期値についての定理は導かない。滑らかな周期データへの理論保証は[収束定理](#thm-fluid46-smooth-convergence)とその仮定に基づく。

（3）中心FTCSは各内部面に同じフラックスを使うので、[前講の総量保存定理](../FLUID45/index.md#thm-fluid45-global-balance)で質量保存は成立する。しかし格子数を4の倍数にしたとき $\theta=\pi/2$、すなわち $m=N/4$ の波の振幅は一歩ごとに $\sqrt{1+\lambda^2}>1$ 倍となる。[中心FTCSの不安定性](#thm-fluid46-centered-instability)より、固定 $T$ までの多ステップでは一様上界がなく、保存・低周波一例の見栄えを全格子の安定性に置き換えられない。

（4）有限体積法の未知量は[セル平均](../FLUID45/index.md#def-fluid45-cell-average)だから、評価すべき厳密値は $\frac1h\int_{jh}^{(j+1)h}q(x,T)\,dx$ である。正弦波なら節7の $\sin(\pi kh/L)/(\pi kh/L)$ 係数があり、セル中心の点値とは一般に異なる。点値を相手にすれば、セル平均近似誤差に「点値と平均値の違い」を混ぜてしまう。

従って、**保存残差、安定性、厳密セル平均との誤差、格子・時間刻み、初期値の滑らかさ**を別々に記録してはじめて数値結果の意味を判断できる。
<!-- solution-end -->

---

## 本講の到達点

- 格子を細かくする際、時間刻みを据え置くとCFLが悪化し得る。
- 一次風上法の $0<\lambda\leq1$ は非負性とFourier安定性を与え、$\lambda>1$ では高周波が増幅する。
- 中心FTCSはCFLを小さくしても高周波の一様な増幅を抑えられない。
- 数値拡散・位相誤差は保存とは別であり、滑らかなデータの収束には局所誤差と安定性の両方が必要である。

次のFLUID47では、ここで区別した保存・安定・誤差の観点を、二次元非圧縮流れの圧力・速度分離に適用する。
