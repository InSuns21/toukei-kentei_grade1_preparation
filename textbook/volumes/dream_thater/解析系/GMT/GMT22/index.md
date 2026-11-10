# GMT22 BV近似・全変動の下半連続性

<!-- definition-example-audit: strict -->

[GMT21の多変数BV](../GMT21/index.md#def-gmt21-bv)では、関数の微分を有限なベクトル値測度 $Du$ として扱い、$|Du|$ が滑らかな勾配とジャンプの両方を数えることを学びました。では、ジャンプを持つ関数を滑らかな関数で近似すると、変動の大きさまで保てるでしょうか。

一つの落とし穴があります。$L^1$ でよく近づくことと、勾配の積分が近づくことは別です。また、領域の外まで勝手に関数を0と置くと、元の領域では数えなかった境界のジャンプまで平滑化されてしまいます。この講義では、**何が極限で失われ得るか**を双対表示で証明し、**変動質量を失わない滑らかな近似**を開集合の形に依らず構成します。

以下、$d\ge1$、$\Omega\subset\mathbb R^d$ を開集合、$dx$ をLebesgue測度とします。関数の等号と収束は、断らない限り $dx$ に関するものです。測度について「ほとんど至る所（almost everywhere; a.e.）」という表現も使います。$u\in BV(\Omega)$ なら、[BVと測度値分布微分の同値](../GMT21/index.md#thm-gmt21-measure-derivative)から $Du$ が定まり、[全変動測度の双対表示](../GMT21/index.md#thm-gmt21-variation-duality)により $V_\Omega(u)=|Du|(\Omega)$ です。

## 1. ジャンプをなめらかにするには：局所畳み込み

まず、非負で滑らかな関数 $\rho\in C_c^\infty(\mathbb R^d)$ を単位球 $B(0,1)$ に台を持つように取り、$\int\rho\,dx=1$ とします。$\rho_\varepsilon(x)=\varepsilon^{-d}\rho(x/\varepsilon)$ は、半径 $\varepsilon$ の範囲だけを平均する核です。簡単のため必要な例では $\rho(x)=\rho(-x)$ も仮定します。

もし $x$ が境界から $\varepsilon$ より離れていれば、$x-y$ が核の台にある $y$ はすべて $\Omega$ 内です。そこで、そのような点に限り関数を平均します。

<a id="def-gmt22-local-mollification"></a>

<!-- formal-statement-start -->
> **定義（局所平滑化と内部領域）**  
> $\Omega\subset\mathbb R^d$ は開集合、$\varepsilon>0$、$u\in L^1_{\mathrm{loc}}(\Omega)$ とする。内部領域を

$$
\Omega_\varepsilon=\{x\in\Omega:\operatorname{dist}(x,\mathbb R^d\setminus\Omega)>\varepsilon\}
$$

> とし、$\Omega=\mathbb R^d$ のときは $\Omega_\varepsilon=\mathbb R^d$ と約束する。$x\in\Omega_\varepsilon$ に対し、局所平滑化を次で定める。

$$
u_\varepsilon(x)=\int_\Omega \rho_\varepsilon(x-y)u(y)\,dy.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt22-local-mollification -->
### 直接例：区間内部のジャンプ

$\Omega=(-1,1)$、$u=\boldsymbol1_{(0,1)}$、$0<\varepsilon<1/2$ とすると $\Omega_\varepsilon=(-1+\varepsilon,1-\varepsilon)$ です。定義の積分は $y\in(0,1)$ だけが寄与し、$x\in\Omega_\varepsilon$ で

$$
u_\varepsilon(x)=\int_0^1\rho_\varepsilon(x-y)\,dy
=\int_{x-1}^{x}\rho_\varepsilon(t)\,dt.
$$

$x$ が0から $\varepsilon$ 以上離れれば値は元の0または1に一致し、$|x|<\varepsilon$ では連続的につながります。定義域を $\Omega_\varepsilon$ としたので、積分に $\Omega$ 外の値は一切必要ありません。

**定義の確認**：$\Omega_\varepsilon$ は境界から $\varepsilon$ より離れた開区間であり、$x\in\Omega_\varepsilon$ と核の台の条件 $|x-y|<\varepsilon$ から $y\in\Omega$ が従います。$u$ はこの区間の局所可積分関数で、積分は有限です。
<!-- definition-example-end -->

滑らかな核と有限測度の畳み込みでは、微分を核へ移せます。さらに、平均でベクトルの長さが増えないことから、変動の局所評価が得られます。$U+B(0,\varepsilon)$ は $U$ の各点のまわりに半径 $\varepsilon$ の球を加えた集合を表します。

<a id="prop-gmt22-local-convolution"></a>

<!-- formal-statement-start -->
> **命題（局所畳み込みと変動評価）**  
> $u\in BV(\Omega)$、$\varepsilon>0$ とする。$u_\varepsilon\in C^\infty(\Omega_\varepsilon)$ であり、各 $x\in\Omega_\varepsilon$ について

$$
\nabla u_\varepsilon(x)=\int_\Omega\rho_\varepsilon(x-y)\,dDu(y).
$$

> さらに、$U$ は開集合で $\overline U$ が $\Omega_\varepsilon$ 内のコンパクト集合なら、次が成り立つ。

$$
\int_U|\nabla u_\varepsilon(x)|\,dx
\le |Du|\bigl(U+B(0,\varepsilon)\bigr).
$$

> また $u_\varepsilon\to u$ は $\Omega$ 内の各コンパクト集合上で $L^1$ 収束する。
<!-- formal-statement-end -->

### 証明の見取り図

分布微分の定義を平滑化後のテスト関数に適用して $\nabla(u*\rho_\varepsilon)=Du*\rho_\varepsilon$ を得ます。次に [ベクトル値測度の全変動と極分解](../GMT21/index.md#def-gmt21-vector-variation) $Du=\sigma_u|Du|$、$|\sigma_u|=1$ を使い、核の非負性からノルムを積分の内側へ入れます。収束はコンパクト集合上での平行移動の $L^1$ 連続性です。

<!-- proof-start -->
### 証明

任意の $U\Subset\Omega_\varepsilon$ を固定します。$x\in U$ に必要な $y$ は $\Omega$ の内部にあるので、$x$ の近くでは $u$ を局所的に切り出し、通常の畳み込みとして微分できます。$\psi\in C_c^\infty(U)$ と各 $i$ について [Fubiniの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)を適用し（$u$ は必要なコンパクト近傍で可積分、核の台はコンパクト）、変数を交換すると

$$
\begin{aligned}
-\int_U u_\varepsilon(x)\partial_i\psi(x)\,dx
&=-\int_\Omega u(y)\int_U\rho_\varepsilon(x-y)\partial_i\psi(x)\,dx\,dy\\
&=\int_U\psi(x)\int_\Omega\rho_\varepsilon(x-y)\,dD_i u(y)\,dx.
\end{aligned}
$$

最後の等号を確認します。$F(y)=\int_U\psi(x)\rho_\varepsilon(x-y)\,dx$ と置けば、$\partial_{y_i}\rho_\varepsilon(x-y)=-\partial_{x_i}\rho_\varepsilon(x-y)$ です。$x$ で部分積分すると

$$
\partial_{y_i}F(y)
=-\int_U\psi(x)\partial_{x_i}\rho_\varepsilon(x-y)\,dx
=\int_U\partial_i\psi(x)\rho_\varepsilon(x-y)\,dx.
$$

$F$ は $\Omega$ 内にコンパクト台を持つ滑らかなテスト関数なので、[BVと測度値分布微分の同値](../GMT21/index.md#thm-gmt21-measure-derivative)による等式 $-\int u\,\partial_i F\,dy=\int F\,dD_i u$ を適用し、[Fubiniの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)で $x$ の積分を外側へ戻すと上式を得ます。したがって分布微分が主張の滑らかな関数に等しく、古典微分とも一致します。

次に [ベクトル値測度の極分解](../GMT21/index.md#def-gmt21-vector-variation)で $Du=\sigma_u|Du|$ と書きます。非負核に対して各 $x\in U$ で

$$
\left|\int_\Omega\rho_\varepsilon(x-y)\sigma_u(y)\,d|Du|(y)\right|
\le\int_\Omega\rho_\varepsilon(x-y)\,d|Du|(y).
$$

両辺を $U$ 上で積分し [Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)を適用すると

$$
\begin{aligned}
\int_U|\nabla u_\varepsilon|\,dx
&\le\int_\Omega\left(\int_U\rho_\varepsilon(x-y)\,dx\right)d|Du|(y)\\
&\le\int_{U+B(0,\varepsilon)}1\,d|Du|(y).
\end{aligned}
$$

$y\notin U+B(0,\varepsilon)$ なら内側の核は恒等的に0であり、任意の $y$ について内側の積分は高々1だからです。

最後に $K\Subset\Omega$ を取り、$\varepsilon$ を十分小さくします。$K$ と必要な平行移動を含む $K'\Subset\Omega$ を取れるので、変数変換、三角不等式と [Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)によって

$$
\|u_\varepsilon-u\|_{L^1(K)}
\le\int\rho_\varepsilon(h)\|u(\,\cdot-h)-u\|_{L^1(K)}\,dh
\longrightarrow0.
$$

$L^1(K')$ 関数の平行移動の連続性と、$|h|<\varepsilon$ で積分することを用いました。$\square$
<!-- proof-end -->

### 例：ジャンプの変動が薄い層に広がる

上の $u=\boldsymbol1_{(0,1)}$ では、区間内部で [GMT21のジャンプ計算](../GMT21/index.md#ex-gmt21-a03)と同様に $Du=\delta_0$ です。$\rho$ が偶関数なら、$\Omega_\varepsilon$ 上で

$$
u_\varepsilon'(x)=\rho_\varepsilon(x),\qquad
\int_{\Omega_\varepsilon}|u_\varepsilon'|\,dx=1=|Du|(\Omega).
$$

右端 $x=1$ には $\Omega$ 内の分布微分の質量はありません。平滑化は一点のジャンプを幅 $2\varepsilon$ の層へ広げますが、変動の総量1は保たれます。

## 2. $L^1$ 極限で全変動は増えない：下半連続性

$u_n\to u$ が $L^1$ で成り立つとき、$\nabla u_n$ が点ごとに収束するとは限りません。それでも、コンパクト台のテスト場 $\varphi$ との積分なら $u_n\to u$ をそのまま通せます。これが全変動の双対的定義の強みです。

<a id="thm-gmt22-lsc"></a>

<!-- formal-statement-start -->
> **定理（全変動の下半連続性）**  
> $\Omega\subset\mathbb R^d$ は開集合、$u_n,u\in L^1(\Omega)$、$u_n\to u$ が $L^1(\Omega)$ で成り立つとする。このとき拡張実数の意味で

$$
V_\Omega(u)\le\liminf_{n\to\infty}V_\Omega(u_n).
$$

> 特に $u_n\in BV(\Omega)$ で右辺が有限なら $u\in BV(\Omega)$ である。さらに $u_n,u\in BV_{\mathrm{loc}}(\Omega)$、$u_n\to u$ が $L^1_{\mathrm{loc}}(\Omega)$ の場合、任意の開集合 $U\subset\Omega$ について次が成り立つ（両辺は無限大でもよい）。

$$
|Du|(U)\le\liminf_{n\to\infty}|Du_n|(U).
$$
<!-- formal-statement-end -->

### 証明の見取り図

固定したテスト場の積分を極限に通すと、その積分は各 $V_\Omega(u_n)$ 以下です。任意のテスト場について成立したあとで初めて上限を取ります。局所版は、台を $U$ 内に持つテスト場へ同じ議論を繰り返します。

<!-- proof-start -->
### 証明

$\varphi\in C_c^\infty(\Omega;\mathbb R^d)$、$|\varphi|\le1$ を固定します。$\operatorname{div}\varphi$ は有界であり

$$
\left|\int_\Omega(u_n-u)\operatorname{div}\varphi\,dx\right|
\le\|\operatorname{div}\varphi\|_\infty\|u_n-u\|_{L^1(\Omega)}
\longrightarrow0.
$$

[多変数BVと双対変動量の定義](../GMT21/index.md#def-gmt21-bv)から各 $n$ で $\int u_n\operatorname{div}\varphi\le V_\Omega(u_n)$。そこで

$$
\int_\Omega u\operatorname{div}\varphi\,dx
=\lim_{n\to\infty}\int_\Omega u_n\operatorname{div}\varphi\,dx
\le\liminf_{n\to\infty}V_\Omega(u_n).
$$

右辺は $\varphi$ に依存しないので、左辺の許容テスト場すべてについて上限を取れば第一の不等式です。右辺が有限なら $u\in L^1$ と合わせて $u\in BV(\Omega)$ が従います。

局所版では、任意の $U\subset\Omega$ で台が $U$ 内にある $\varphi$ を固定します。収束に使うのは台の上の $L^1$ ノルムだけで足ります。したがって $V_U(u)\le\liminf V_U(u_n)$ です。ここで $u$ が $BV_{\mathrm{loc}}$ のみの場合も、開集合 $U$ に制限した測度の双対表示を使うと $V_U(u)=|Du|(U)$ が成立し、各 $u_n$ にも同じことがいえます。$\square$
<!-- proof-end -->

この不等式の向きは重要です。極限では細かな振動や境界へ移動したジャンプが見えなくなり、**極限の変動は小さくなり得る**のであって、大きく跳ね上がることはありません。

### 反例1：$L^1$ 収束しても変動は収束しない

$\Omega=(0,2\pi)$、$u_n(x)=n^{-1}\sin(nx)$（$n$ は正整数）とします。$|u_n|\le1/n$ より $u_n\to0$ は $L^1$ で成り立ちます。しかし [滑らかな関数の全変動](../GMT21/index.md#prop-gmt21-w11-inclusion)を使うと

$$
|Du_n|(\Omega)=\int_0^{2\pi}|\cos(nx)|\,dx
=\frac1n\int_0^{2\pi n}|\cos t|\,dt=4,
$$

一方 $|D0|(\Omega)=0$ です。下半連続性の $0\le4$ は正しいですが、等号になるとは限りません。振幅 $1/n$ だけを見て微分の大きさまで小さいと判断すると、周波数 $n$ を見落とします。

### 反例2：質量が領域の境界へ逃げる

$\Omega=(0,1)$、$v_n=\boldsymbol1_{(0,1/n)}$（$n\ge2$）とします。$\|v_n\|_{L^1(\Omega)}=1/n\to0$ ですが、テスト関数 $\psi\in C_c^\infty(\Omega)$ に対して

$$
-\int_0^1v_n\psi'\,dx=-\int_0^{1/n}\psi'\,dx=-\psi(1/n),
$$

なので $Dv_n=-\delta_{1/n}$、$|Dv_n|(\Omega)=1$ です。質量の位置 $1/n$ は $\partial\Omega$ の0へ向かい、任意の $K\Subset\Omega$ の上では十分大きな $n$ で $|Dv_n|(K)=0$ です。**内部の局所収束から、領域全体の変動質量の収束は結論できません**。この質量流出こそ、次節で境界処理を慎重に行う理由です。

## 3. $L^1$ より強く、測度ノルム収束より弱いstrict収束

変動を使う後続の幾何学では、$L^1$ 収束に加えて全変動の**総質量**も近づく近似が必要です。しかし $Du_n$ そのものを全変動ノルムで近づける要求は強すぎます。

<a id="def-gmt22-strict"></a>

<!-- formal-statement-start -->
> **定義（BVのstrict収束）**  
> $u_n,u\in BV(\Omega)$ に対し、$u_n$ が $u$ へ **strictに収束する**とは、次の二条件がともに成り立つことをいう。

$$
\|u_n-u\|_{L^1(\Omega)}\to0,\qquad
|Du_n|(\Omega)\to|Du|(\Omega).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt22-strict -->
### 直接例：一つのジャンプのstrict近似

$\Omega=(-1,1)$、$u=\boldsymbol1_{(0,1)}$ とし、前節の偶・非負核を用いて $\widetilde u_\varepsilon=u*\rho_\varepsilon$ を $(-1,1)$ 上で考えます。ここでは $u$ を $\mathbb R$ 上へ同じ段差 $H(x)=\boldsymbol1_{(0,\infty)}$ として延長して畳み込みます。$\varepsilon<1/2$ なら $\Omega$ 内で $u_\varepsilon$ と同じ値です。

差は $(-\varepsilon,\varepsilon)$ の中にしかなく、$|u_\varepsilon-u|\le1$ だから $\|u_\varepsilon-u\|_1\le2\varepsilon\to0$。また $u_\varepsilon'=\rho_\varepsilon\ge0$、核の質量は1であり

$$
|Du_\varepsilon|(\Omega)=\int_{-\varepsilon}^{\varepsilon}\rho_\varepsilon\,dx=1=|Du|(\Omega).
$$

したがってstrict収束です。一方 $Du_\varepsilon=\rho_\varepsilon dx$ と $Du=\delta_0$ は互いに特異です。従ってその差の全変動測度は両者の質量の和を持ち、

$$
|Du_\varepsilon-Du|(\Omega)=2
$$

であり、**分布微分の全変動ノルム収束ではありません**。strict収束の二条件と「測度自体のノルム差が0へ向かうこと」を混同してはいけません。

**定義の確認**：上で $L^1$ 距離が0へ向かうことと変動総量がともに1であることを別々に計算したので、[strict収束の定義](#def-gmt22-strict)の二条件を満たすと判定できます。測度差のノルムが2であることは、この定義の条件には含まれません。
<!-- definition-example-end -->

## 4. 任意の開集合で平滑化しても変動総量を保つ

内部から境界まで一定の半径で畳み込むことはできません。そこで、領域内に台を持つ滑らかな切断関数で $u$ を細かい部分に分け、それぞれ異なる十分小さい半径で平滑化します。重要なのは、切断で発生する余分な勾配を最後に**相殺**することです。

<a id="thm-gmt22-smooth-approx"></a>

<!-- formal-statement-start -->
> **定理（BVの滑らかなstrict近似）**  
> $\Omega\subset\mathbb R^d$ は任意の開集合、$u\in BV(\Omega)$ とする。このとき $u_j\in C^\infty(\Omega)\cap W^{1,1}(\Omega)$ が存在し、

$$
\|u_j-u\|_{L^1(\Omega)}\to0,\qquad
\int_\Omega|\nabla u_j|\,dx\to|Du|(\Omega).
$$

> 特に $u_j\to u$ はBVのstrict収束である。$\Omega$ の境界が滑らかであるという仮定は不要である。
<!-- formal-statement-end -->

### 証明の見取り図

切断関数の分割 $\sum_i\zeta_i=1$ を取り、各 $\zeta_i u$ を十分小さい半径 $\varepsilon_i$ で畳み込みます。微分すると $\zeta_i Du$ の項と $u\nabla\zeta_i\,dx$ の項が現れます。前者の総変動は高々 $|Du|(\Omega)$、後者は $\sum_i u\nabla\zeta_i=u\nabla(\sum_i\zeta_i)=0$ なので、平滑化による誤差だけを小さくできます。下半連続性で逆向きの不等式を得れば変動の収束が確定します。

<!-- proof-start -->
### 証明

任意の $\eta>0$ を固定します。閉包が $\Omega$ 内のコンパクト集合に含まれる小さな開集合で $\Omega$ を覆い、それに従属する局所有限な滑らかな分割統一 $\{\zeta_i\}_{i\ge1}$ を取ります。すなわち、$\zeta_i\in C_c^\infty(\Omega)$、$0\le\zeta_i\le1$、$\sum_i\zeta_i=1$ であり、各台の少し大きい近傍を取っても局所有限となるように選べます。従って各点の近くでは有限個しか非零でなく、

$$
\sum_i\nabla\zeta_i=\nabla\left(\sum_i\zeta_i\right)=0.
$$

この分割を作るには、たとえば $\Omega$ の内部を尽くすコンパクト集合 $K_j$ を $K_j\subset\operatorname{int}K_{j+1}$、$\bigcup_j K_j=\Omega$ となるように選びます（$\Omega=\mathbb R^d$ でも球の列でよい）。$K_j\setminus\operatorname{int}K_{j-1}$ を覆う滑らかな非負の切断関数 $h_j$ を、その少し大きな開近傍内で台がコンパクトになるように取り、$\sum_j h_j>0$ とします。これらの近傍を隣接する数段の殻に限れば局所有限です。最後に $\zeta_j=h_j/(\sum_i h_i)$ と正規化すれば、各条件が確認できます。

$f_i=\zeta_i u$ と $g_i=u\nabla\zeta_i$（ベクトル値 $L^1$ 関数）を置きます。[BVの滑らかな乗数積公式](../GMT21/index.md#prop-gmt21-product)から、各 $i$ について

$$
Df_i=\zeta_i Du+g_i\,dx.
$$

$f_i$ は $\Omega$ 内のコンパクト集合に台を持つため、$\mathbb R^d$ へゼロ拡張しても新たな境界分布微分は生じません。$g_i$ も $\mathbb R^d$ 上の $L^1$ 関数として扱えます。

$L^1(\mathbb R^d)$ における近似恒等核の収束から、各 $i$ ごとに十分小さい $\varepsilon_i>0$ を選んで

$$
\|\rho_{\varepsilon_i}*f_i-f_i\|_1<\eta\,2^{-i-1},
\qquad
\|\rho_{\varepsilon_i}*g_i-g_i\|_1<\eta\,2^{-i-1}
$$

を満たせます。同時に $\operatorname{supp}(\rho_{\varepsilon_i}*f_i)$ が $\Omega$ 内の、前述の局所有限な拡大近傍に収まるよう選びます。畳み込みの台は $\operatorname{supp}f_i+\overline{B(0,\varepsilon_i)}$ に含まれるので、これは半径を小さくすれば可能です。

$$
w_\eta=\sum_i\rho_{\varepsilon_i}*f_i
$$

と置くと、和は局所有限で $w_\eta\in C^\infty(\Omega)$ です。三角不等式を $\Omega$ 上で使い、$\sum_i f_i=u$ と先ほどの誤差を使えば

$$
\|w_\eta-u\|_{L^1(\Omega)}
\le\sum_i\|\rho_{\varepsilon_i}*f_i-f_i\|_1<\eta/2.
$$

次に微分を評価します。$Df_i$ の畳み込みと、局所有限和の微分を交換できるので

$$
\nabla w_\eta
=\sum_i\rho_{\varepsilon_i}*(\zeta_i Du)
+\sum_i\rho_{\varepsilon_i}*g_i.
$$

後半の和に $g_i$ を足し引きします。$\sum_i g_i=u\sum_i\nabla\zeta_i=0$ はa.e.かつ局所有限で成り立つので

$$
\sum_i\rho_{\varepsilon_i}*g_i
=\sum_i(\rho_{\varepsilon_i}*g_i-g_i).
$$

これに対する $L^1$ ノルムは選択した誤差の総和から $\eta/2$ 未満です。前半では、非負核・[ベクトル値測度の全変動と極分解](../GMT21/index.md#def-gmt21-vector-variation)・[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)を用い、各 $i$ について

$$
\|\rho_{\varepsilon_i}*(\zeta_i Du)\|_{L^1(\mathbb R^d)}
\le\int_\Omega\zeta_i\,d|Du|.
$$

よって、無限和の各項に三角不等式を適用し、単調収束で和と測度積分を交換すると

$$
\begin{aligned}
\int_\Omega|\nabla w_\eta|\,dx
&\le\sum_i\int_\Omega\zeta_i\,d|Du|+\eta/2\\
&=\int_\Omega\left(\sum_i\zeta_i\right)d|Du|+\eta/2\\
&=|Du|(\Omega)+\eta/2.
\end{aligned}
$$

右辺は有限であり、$w_\eta\in L^1(\Omega)$ も示したので、滑らかな $w_\eta$ は $W^{1,1}(\Omega)$ に属します（古典微分が可積分だから弱微分でもあります）。

$\eta=1/j$ として $u_j=w_{1/j}$ を選びます。[全変動の下半連続性](#thm-gmt22-lsc)と、[W11関数とBVの比較](../GMT21/index.md#prop-gmt21-w11-inclusion)から

$$
|Du|(\Omega)\le\liminf_j\int_\Omega|\nabla u_j|\,dx
\le\limsup_j\int_\Omega|\nabla u_j|\,dx\le|Du|(\Omega).
$$

したがって求める両方の収束が成立します。$\square$
<!-- proof-end -->

### 境界で何を避けたのか：定数関数のゼロ拡張

$\Omega=(0,1)$、$u\equiv1$ とすれば $Du=0$、$|Du|(\Omega)=0$ です。領域内では $u_j\equiv1$ そのものが滑らかなstrict近似です。

ところが $\mathbb R$ 上へ $u$ をゼロ拡張した $\overline u=\boldsymbol1_{(0,1)}$ を、偶・非負の $\rho_\varepsilon$ で畳み込むと

$$
(\overline u*\rho_\varepsilon)'(x)
=\rho_\varepsilon(x)-\rho_\varepsilon(x-1).
$$

$0<\varepsilon<1/2$ なら二つの山は交わらず、各山の半分だけが $(0,1)$ に入ります。従って

$$
\int_0^1|(\overline u*\rho_\varepsilon)'|\,dx
=\int_0^\varepsilon\rho_\varepsilon(x)\,dx
+\int_{1-\varepsilon}^1\rho_\varepsilon(x-1)\,dx
=\tfrac12+\tfrac12=1.
$$

$\overline u*\rho_\varepsilon\to u$ は $(0,1)$ 上で $L^1$ 収束しますが、変動質量は $0$ に近づきません。失敗した仮定は**領域を越えた延長が元の変動を保つこと**です。strict近似定理では切断してから**各切断片だけを内部で**平滑化し、切断の勾配を相殺しました。

## 5. 演習：局所近似と極限を計算で確かめる

### Level A：定義、変動、収束を一つずつ確認する

<a id="ex-gmt22-a01"></a>
### GMT22-A01 アフィン関数の局所平滑化

- Level: A

$\Omega=(-2,2)$、$u(x)=3x+1$、偶・非負で積分1の $\rho$ を用いる。$0<\varepsilon<1$ とする。$u_\varepsilon$ を $\Omega_\varepsilon$ 上で計算し、$U=(-1,1)$ 上の変動を求めよ。

<!-- solution-start -->
#### 詳細解答

$x\in\Omega_\varepsilon$ とすると核は $y\in\Omega$ にしか当たらないので、$h=x-y$ に置換して

$$
\begin{aligned}
u_\varepsilon(x)
&=\int\rho_\varepsilon(h)\{3(x-h)+1\}\,dh\\
&=(3x+1)\int\rho_\varepsilon(h)\,dh-3\int h\rho_\varepsilon(h)\,dh
=3x+1.
\end{aligned}
$$

最初の積分は1、次の積分は核の偶性から0です。したがって $u_\varepsilon'=3$ であり、[W11関数とBVの比較](../GMT21/index.md#prop-gmt21-w11-inclusion)から

$$
|Du_\varepsilon|(U)=\int_{-1}^1|3|\,dx=6.
$$

$\varepsilon<1$ なので $U\Subset\Omega_\varepsilon$ です。
<!-- solution-end -->

<a id="ex-gmt22-a02"></a>
### GMT22-A02 局所化したジャンプ

- Level: A

$\Omega=(-1,1)$、$u=\boldsymbol1_{(0,1)}$ とする。$\rho$ を偶・非負な核とする。$Du$、$u_\varepsilon'$、$|Du|(\Omega)$、$\int_{\Omega_\varepsilon}|u_\varepsilon'|$ を求めよ（$0<\varepsilon<1/2$）。

<!-- solution-start -->
#### 詳細解答

任意の $\psi\in C_c^\infty((-1,1))$ について

$$
\langle Du,\psi\rangle=-\int_0^1\psi'(x)\,dx
=-\{\psi(1)-\psi(0)\}=\psi(0).
$$

$\psi(1)=0$ は台が $\Omega$ 内でコンパクトだからです。よって $Du=\delta_0$、$|Du|(\Omega)=1$。[$Du$ との畳み込み公式](#prop-gmt22-local-convolution)では

$$
u_\varepsilon'(x)=\int\rho_\varepsilon(x-y)\,d\delta_0(y)=\rho_\varepsilon(x).
$$

核は $(-\varepsilon,\varepsilon)\subset\Omega_\varepsilon$ に台を持つので、非負性・正規化から $\int_{\Omega_\varepsilon}|u_\varepsilon'|=1$ です。
<!-- solution-end -->

<a id="ex-gmt22-a03"></a>
### GMT22-A03 双対表示からBVを保つ

- Level: A

$u_n\in BV((0,1))$、$\|u_n-u\|_1\to0$、$\sup_n|Du_n|((0,1))\le3$ とする。$u\in BV((0,1))$ と $|Du|((0,1))\le3$ を双対テスト場から示せ。

<!-- solution-start -->
#### 詳細解答

$|\varphi|\le1$ を満たす $\varphi\in C_c^\infty((0,1))$ に対して、$\varphi'$ は有界です。ゆえに

$$
\left|\int_0^1(u_n-u)\varphi'\,dx\right|
\le\|\varphi'\|_\infty\|u_n-u\|_1\to0.
$$

[多変数BVと双対変動量](../GMT21/index.md#def-gmt21-bv)より、各 $n$ で $\int u_n\varphi'\le V_{(0,1)}(u_n)\le3$。極限を取ると $\int u\varphi'\le3$ であり、全テスト場について上限を取って $V_{(0,1)}(u)\le3$ です。$u\in L^1$ であることは $L^1$ 収束から従うので $u\in BV$、[全変動測度の双対表示](../GMT21/index.md#thm-gmt21-variation-duality)から $|Du|((0,1))\le3$ です。
<!-- solution-end -->

<a id="ex-gmt22-a04"></a>
### GMT22-A04 振幅だけでは変動を制御できない

- Level: A

$\Omega=(0,2\pi)$、$u_n(x)=n^{-1}\sin(nx)$、$n\in\mathbb N$ とする。$L^1$ 収束先と $|Du_n|(\Omega)$ を求め、strict収束の有無を判定せよ。

<!-- solution-start -->
#### 詳細解答

$\|u_n\|_1\le 2\pi/n\to0$ なので収束先は $u=0$ です。一方 $u_n'=\cos(nx)$ です。$t=nx$ と置けば

$$
|Du_n|(\Omega)
=\int_0^{2\pi}|\cos(nx)|\,dx
=\frac1n\int_0^{2\pi n}|\cos t|\,dt
=\frac1n(4n)=4.
$$

極限関数の全変動は0です。したがって $L^1$ では収束しても、[strict収束の第二条件](#def-gmt22-strict)が成り立たず、strictには収束しません。
<!-- solution-end -->

<a id="ex-gmt22-a05"></a>
### GMT22-A05 境界へ向かう一点のジャンプ

- Level: A

$\Omega=(0,1)$、$v_n=\boldsymbol1_{(0,1/n)}$（$n\ge2$）とする。$Dv_n$ の符号、$|Dv_n|(\Omega)$、$v_n$ の $L^1$ 収束先を求めよ。また任意のコンパクト集合 $K\subset(0,1)$ における $|Dv_n|(K)$ の極限を述べよ。

<!-- solution-start -->
#### 詳細解答

$\psi\in C_c^\infty((0,1))$ に対して

$$
-\int_0^{1/n}\psi'\,dx=-\psi(1/n)+\psi(0)=-\psi(1/n).
$$

従って $Dv_n=-\delta_{1/n}$、全変動は1です。$\|v_n\|_1=1/n\to0$ だから極限は0です。$K\Subset(0,1)$ なら $a=\min K>0$（空集合は自明）であり、$1/n<a$ となる $n$ では $\delta_{1/n}(K)=0$。よって $|Dv_n|(K)\to0$ ですが $|Dv_n|(\Omega)=1$ のままです。
<!-- solution-end -->

### Level B：複数の考え方をつないで証明する

<a id="ex-gmt22-b01"></a>
### GMT22-B01 局所変動評価を一段ずつ導く

- Level: B

$u\in BV(\Omega)$、$U\Subset\Omega_\varepsilon$ とする。[ベクトル値測度の全変動と極分解](../GMT21/index.md#def-gmt21-vector-variation) $Du=\sigma_u|Du|$ と $\rho_\varepsilon\ge0$ を使い、$\int_U|\nabla u_\varepsilon|\le|Du|(U+B(0,\varepsilon))$ を導け。核が非負でない場合、証明のどこが壊れるか述べよ。

<!-- solution-start -->
#### 詳細解答

[$Du$ の畳み込み公式](#prop-gmt22-local-convolution)を始点にし、[ベクトル値測度の全変動と極分解](../GMT21/index.md#def-gmt21-vector-variation)を代入して

$$
|\nabla u_\varepsilon(x)|
=\left|\int\rho_\varepsilon(x-y)\sigma_u(y)\,d|Du|(y)\right|
\le\int\rho_\varepsilon(x-y)\,d|Du|(y).
$$

ここでは $|\sigma_u|=1$ $|Du|$-a.e.、かつ $\rho_\varepsilon\ge0$ を用いました。両辺を $U$ で積分し [Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)で順序を交換すると

$$
\int_U|\nabla u_\varepsilon|\,dx
\le\int_\Omega\left(\int_U\rho_\varepsilon(x-y)\,dx\right)d|Du|(y).
$$

$y$ が $U+B(0,\varepsilon)$ の外なら内側は0、中にあれば $\int_U\rho_\varepsilon(x-y)dx\le1$ です。従って求める評価です。核の符号が変わると最初の三角不等式の右辺は $\int|\rho_\varepsilon|d|Du|$ となり、$\int|\rho_\varepsilon|$ が1以下とは限らないので、定数1の評価が失われます。
<!-- solution-end -->

<a id="ex-gmt22-b02"></a>
### GMT22-B02 ゼロ拡張と境界の二つの半分

- Level: B

$\Omega=(0,1)$、$u\equiv1$ とし、$\overline u=\boldsymbol1_{(0,1)}$ を $\mathbb R$ 上で偶・非負の核 $\rho_\varepsilon$ と畳み込む。$0<\varepsilon<1/2$ のとき、$w_\varepsilon=\overline u*\rho_\varepsilon$ が $u$ に $L^1(\Omega)$ 収束する一方、$\int_\Omega|w_\varepsilon'|=1$ となることを証明せよ。$u$ 自身の変動と比較せよ。

<!-- solution-start -->
#### 詳細解答

$w_\varepsilon(x)=\int_0^1\rho_\varepsilon(x-y)dy$ です。$x\in(\varepsilon,1-\varepsilon)$ では積分が核の全質量1を含むので $w_\varepsilon=1$。他の $x\in(0,1)$ でも $0\le w_\varepsilon\le1$ であり、差があり得る区間の全長は $2\varepsilon$ です。従って $\|w_\varepsilon-u\|_1\le2\varepsilon\to0$。

区間の両端でのジャンプの分布微分は $\delta_0-\delta_1$ なので、畳み込みの微分は $w_\varepsilon'=\rho_\varepsilon(x)-\rho_\varepsilon(x-1)$ です。二つの台は $\Omega$ 内で交わらないため

$$
\int_0^1|w_\varepsilon'|\,dx
=\int_0^\varepsilon\rho_\varepsilon(x)dx
+\int_{1-\varepsilon}^1\rho_\varepsilon(x-1)dx
=\tfrac12+\tfrac12=1.
$$

一方 $\Omega$ 上の $u$ は定数なので $Du=0$ です。従ってstrict収束ではありません。余分な変動はゼロ拡張で生まれた $\partial\Omega$ 上の二つのジャンプを半分ずつ平滑化したものです。
<!-- solution-end -->

<a id="ex-gmt22-b03"></a>
### GMT22-B03 strict収束と測度のノルム

- Level: B

$\Omega=(-1,1)$、$u=\boldsymbol1_{(0,1)}$、$u_\varepsilon=H*\rho_\varepsilon$（$H=\boldsymbol1_{(0,\infty)}$ を $\mathbb R$ 上で定義）とする。$u_\varepsilon\to u$ がstrict収束である一方、$|Du_\varepsilon-Du|(\Omega)=2$ であることを証明せよ。

<!-- solution-start -->
#### 詳細解答

$0<\varepsilon<1/2$ なら $u_\varepsilon=u$ は $(-1,-\varepsilon)\cup(\varepsilon,1)$ で成立し、それ以外の区間でも両者は0と1の間です。従って $\|u_\varepsilon-u\|_1\le2\varepsilon$。

分布微分は $Du=\delta_0$、$Du_\varepsilon=\rho_\varepsilon dx$ であり、非負核の質量は1だから、両者の全変動総量はともに1です。これでstrict収束の二条件を確認しました。

しかし $\rho_\varepsilon dx$ はLebesgue測度に絶対連続、$\delta_0$ は一点に集中するため互いに特異です。この二つの非負測度の差の正負のJordan部分はそれぞれ $\rho_\varepsilon dx$ と $\delta_0$ なので

$$
|Du_\varepsilon-Du|(\Omega)
=\int_\Omega\rho_\varepsilon dx+\delta_0(\Omega)
=1+1=2.
$$

同じ総質量を持つことは測度自体が近いことを意味しません。
<!-- solution-end -->

<a id="ex-gmt22-b04"></a>
### GMT22-B04 二つのジャンプを平滑化する

- Level: B

$\Omega=(0,1)$、$u=\boldsymbol1_{(1/4,3/4)}$ とする。偶・非負核を用い、$\varepsilon<1/8$ のとき $w_\varepsilon=\boldsymbol1_{(1/4,3/4)}*\rho_\varepsilon$ を $\mathbb R$ 上で作り、$\Omega$ へ制限する。$Dw_\varepsilon$、$\int_\Omega|w_\varepsilon'|$、$\|w_\varepsilon-u\|_1$ の上界を求め、strict収束を示せ。

<!-- solution-start -->
#### 詳細解答

$u$ は $1/4$ で0から1へ、$3/4$ で1から0へ跳ぶので、$Du=\delta_{1/4}-\delta_{3/4}$ です。核との畳み込みを微分すると

$$
w_\varepsilon'(x)=\rho_\varepsilon(x-1/4)-\rho_\varepsilon(x-3/4).
$$

$\varepsilon<1/8$ では各核の台は $\Omega$ 内にあり、互いに交わりません。非負性から絶対値の積分は各核の質量の和で $1+1=2=|Du|(\Omega)$ です。

$w_\varepsilon=u$ は二つのジャンプの $\varepsilon$ 近傍の外で成立し、$0\le w_\varepsilon\le1$。差があり得る二つの近傍の全長は $4\varepsilon$ です。従って $\|w_\varepsilon-u\|_1\le4\varepsilon\to0$ であり、変動質量も2のままなのでstrict収束します。ゼロ拡張の余計な境界寄与がないのは、もとの $u$ が境界の近くで0だからです。
<!-- solution-end -->

### Level C：近似・境界・収束を統合する

<a id="ex-gmt22-c01"></a>
### GMT22-C01 内部ジャンプ二つと境界ジャンプ二つ

- Level: C

$\Omega=(0,1)$、$u(x)=1+\boldsymbol1_{(1/3,2/3)}(x)$ とする。$\rho$ は偶・非負で $\int\rho=1$、台が $(-1,1)$ に含まれる。

1. $Du$ と $|Du|(\Omega)$ をテスト関数から求めよ。
2. $v_\varepsilon=1+\boldsymbol1_{(1/3,2/3)}*\rho_\varepsilon$ を $\Omega$ 上で定める。$\varepsilon<1/12$ で $v_\varepsilon\to u$ がstrict収束することを示し、$|Dv_\varepsilon-Du|(\Omega)$ を求めよ。
3. $u$ 全体を $\mathbb R$ 上へゼロ拡張した $\overline u$ を用い、$w_\varepsilon=\overline u*\rho_\varepsilon$ とする。$w_\varepsilon\to u$ は $L^1(\Omega)$ で成り立つが、$\int_\Omega|w_\varepsilon'|$ が $|Du|(\Omega)$ に近づかないことを示し、差の由来を説明せよ。

<!-- solution-start -->
#### 詳細解答

1. $\psi\in C_c^\infty((0,1))$ について $u$ の定数部分は微分0です。ジャンプ部分は

$$
-\int_{1/3}^{2/3}\psi'(x)\,dx
=\psi(1/3)-\psi(2/3).
$$

従って $Du=\delta_{1/3}-\delta_{2/3}$。二つのDirac質量は互いに特異だから $|Du|(\Omega)=2$ です。

2. $v_\varepsilon$ と $u$ の差は $1/3$、$2/3$ の各 $\varepsilon$ 近傍の中だけで、絶対値は1以下です。よって $\|v_\varepsilon-u\|_1\le4\varepsilon\to0$。微分は

$$
v_\varepsilon'(x)
=\rho_\varepsilon(x-1/3)-\rho_\varepsilon(x-2/3).
$$

$\varepsilon<1/12$ なら二つの台は互いに交わらず、$\Omega$ 内に収まるので $\int_\Omega|v_\varepsilon'|=2$。従ってstrict収束です。$Dv_\varepsilon=v_\varepsilon' dx$ はLebesgue絶対連続、$Du$ は二点に集中して互いに特異なので

$$
|Dv_\varepsilon-Du|(\Omega)=|Dv_\varepsilon|(\Omega)+|Du|(\Omega)=2+2=4.
$$

3. $\overline u=\boldsymbol1_{(0,1)}+\boldsymbol1_{(1/3,2/3)}$ なので、$\mathbb R$ 上の分布微分は

$$
D\overline u=\delta_0+\delta_{1/3}-\delta_{2/3}-\delta_1.
$$

したがって $w_\varepsilon'$ は各Dirac測度を核で置き換えた四つの山の符号付き和です。$\varepsilon<1/12$ なら四つの山は交わらず、内部の二つは各質量1、境界の二つは $\Omega$ 内で半分ずつ質量を持ちます。従って

$$
\int_0^1|w_\varepsilon'|\,dx
=\tfrac12+1+1+\tfrac12=3.
$$

$w_\varepsilon$ は $u$ と違う場所が四つの $\varepsilon$ 近傍に限られ、値の差は高々2なので $\|w_\varepsilon-u\|_1\le8\varepsilon\to0$ です。しかし変動の極限は3で、元の2ではありません。原因は $u$ の内部微分ではなく、ゼロ拡張により $0$ と $1$ に人工的に作られたジャンプです。内部部分だけを平滑化して定数1を保つ $v_\varepsilon$ では、その余分な変動が起こりません。
<!-- solution-end -->

## 6. 何ができるようになったか

BVの双対表示から $L^1$ 極限の下半連続性を直接示し、局所畳み込みの微分・変動評価を経て、任意の開集合上で滑らかなstrict近似を構成しました。これでジャンプ関数を滑らかな関数で近似しても、**全変動の総量を保つ**方法が得られました。一方、境界へ逃げる測度の質量と、ゼロ拡張が作る境界の質量は区別する必要があります。

次のGMT23では、この近似と下半連続性を使ってBV有界列のコンパクト性を扱い、レベル集合の周長を積分するBV版coarea公式へ進みます。
