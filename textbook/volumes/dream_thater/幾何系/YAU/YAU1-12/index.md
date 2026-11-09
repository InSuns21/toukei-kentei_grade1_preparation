# YAU1-12 閉性から存在へ

## 1. 開性だけでは終点に届かない

[可解集合の開性](../YAU1-05/index.md#thm-yau1-05-openness)は、一つの解から近くのパラメータに解を移せることをいう。しかし $[0,1/2)$ も $[0,1]$ の中では開であり、出発点 $0$ を含む。目標の $t=1$ に届くには、解のある時刻が極限へ近づいても解が消えない、という**閉性**が要る。

ここで困るのは、各時刻の解が滑らかでも、その解列が収束するとは限らないこと、また正値計量の極限が退化しかねないことである。前章の[一様高階事前評価](../YAU1-11/index.md#thm-yau1-11-higher-estimates)は第一の危険を、[一様な二側計量評価](../YAU1-09/index.md#thm-yau1-09-global-second-order)は第二の危険を排除する。以下では「どこで何を使うか」を一段ずつ確かめる。

$X$ を複素次元 $n\ge1$ の境界のないコンパクト**連結**Kähler多様体、$\omega$ をそのKähler形式、$g$ を対応する背景計量とする。$F\in C^\infty(X;\mathbb R)$ は

$$
V:=\int_X\omega^n>0,\qquad
\int_X e^F\omega^n=V
$$

を満たすとする。[体積正規化された連続性のパス](../YAU1-05/index.md#def-yau1-05-path)を

$$
\rho_t=1-t+te^F,\qquad
\omega_{\varphi_t}=\omega+i\partial\bar\partial\varphi_t>0,
\qquad \omega_{\varphi_t}^n=\rho_t\omega^n,
\qquad\int_X\varphi_t\omega^n=0
$$

と書く。ここで $t\in[0,1]$ である。$e^F$ はコンパクト $X$ 上で正の最小値を持つので

$$
\min\{1,\min_Xe^F\}\le \rho_t(x)
\le\max\{1,\max_Xe^F\}
\quad(x\in X,\ 0\le t\le1).
$$

この密度の上下界だけでは、未知の計量 $\omega_{\varphi_t}$ の固有値すべてを制御できない。正値性を保つためには二階評価の行列不等式を別途使う。

## 2. 一様評価を「滑らかな極限」へ変換する

関数列の値だけを収束させても、$i\partial\bar\partial\varphi$ の極限や行列式は評価できない。必要なのは少なくとも二階微分までの収束であり、しかも解が滑らかだと結論するためには全次数での収束を同じ部分列で得る必要がある。

固定した有限座標被覆の各小コンパクトチャートで、関数とその座標微分を比較する。**$C^m$ 収束**とは、次数 $m$ 以下のすべての偏微分がそのチャート上で一様に収束することをいう。全ての整数 $m\ge0$ でこれを満たすとき、$C^\infty$ 収束という。これらの局所的定義は固定された滑らかなチャート間の遷移写像の下で整合する。

例えば $u_k(x)=k^{-1}\sin(kx)$ は値としては一様に零へ収束するが $u_k'(x)=\cos(kx)$ は一様収束しない。一方、全階の微分に一様な上界があれば、より低い階の微分の振動も抑えられる。ここで使う道具が、有限チャート上のArzelà–Ascoliの定理と部分列の対角化である。

<a id="lem-yau1-12-smooth-compactness"></a>

<!-- formal-statement-start -->
> **補題（高階一様評価からの滑らかな部分列）**  
> $X$ をコンパクトな滑らかな多様体、$g$ を固定計量とする。滑らかな実関数列 $(u_k)_{k\ge1}$ が、ある固定 $0<\alpha<1$ に対して各整数 $m\ge0$ で

$$
\sup_{k\ge1}\|u_k\|_{C^{m+1,\alpha}(X,g)}\le M_m<\infty
$$

> を満たすなら、一つの部分列 $(u_{k_j})$ と $u_\ast\in C^\infty(X;\mathbb R)$ が存在し、任意の $m\ge0$ について $u_{k_j}\to u_\ast$ が $C^m(X)$ で成立する。さらに固定滑らかな体積形式 $dV$ について $\int_Xu_k\,dV=0$ なら、$\int_Xu_\ast\,dV=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$C^{m+1,\alpha}$ の有界性は、$m$ 階までの微分を一様有界かつ等連続にする。有限チャートでArzelà–Ascoliを用いて各階の収束部分列を作り、次数 $0,1,2,\ldots$ に対して入れ子にして対角部分列を取る。平均ゼロは一様収束と有限体積から保たれる。

<!-- proof-start -->
### 証明

固定有限座標被覆の小さい閉チャート $K_a$ を、内側で $X$ を覆うように選ぶ。仮定の $C^{m+1,\alpha}$ ノルムは、各 $|\beta|\le m$ の座標微分 $D^\beta u_k$ の一様有界性を与える。また一階高い微分が有界だから、チャート内の二点 $x,y$ を結ぶ短い線分で微積分の基本定理を適用して

$$
|D^\beta u_k(x)-D^\beta u_k(y)|\le C_{m,a}|x-y|
$$

を得る（必要なら $K_a$ を小さい凸閉球で細分する）。すなわち各 $D^\beta u_k$ は等連続である。各階の微分は有限個なので、[Arzelà–Ascoliの定理](../../../基礎科目/RA/RA8/index.md#thm-ra8-arzela-ascoli)を有限回適用して、まず $C^m$ 収束する部分列を取れる。極限が微分と整合するのは、一変数の線分に沿って

$$
D^\beta u_k(y)-D^\beta u_k(x)
=\int_0^1 D(D^\beta u_k)(x+s(y-x))(y-x)\,ds
$$

と書き、被積分関数の一様収束で極限を通せるからである。

次数 $m=0$ 用の部分列から始め、その中から $m=1$ 用を選び、以下同様に入れ子にする。第 $j$ 段階の部分列の第 $j$ 項を選ぶ対角列は、固定した $m$ に対し $j\ge m$ で第 $m$ 段階の部分列に属するので $C^m$ 収束する。$C^0$ の極限は共通だから、これを $u_\ast$ とすれば $u_\ast$ は各 $m$ で $C^m$、従って滑らかである。

最後に $\|u_{k_j}-u_\ast\|_{C^0}\to0$ と $\int_XdV<\infty$ から

$$
\left|\int_Xu_{k_j}\,dV-\int_Xu_\ast\,dV\right|
\le\left(\int_XdV\right)\|u_{k_j}-u_\ast\|_{C^0}\longrightarrow0.
$$

各積分が零なら極限の積分も零となる。$\square$
<!-- proof-end -->

この補題が与えるのは**部分列**の収束であり、元の解列全体の収束ではない。閉性を示すには部分列が一つあれば十分である。収束先の一意性まで言いたいときは、後で[解の定数差一意性](../YAU1-04/index.md#thm-yau1-04-uniqueness)を別途使う。

## 3. 極限で計量が退化しないことを検算する

局所複素座標 $z^1,\ldots,z^n$ を固定し、$p,q=1,\ldots,n$ を動く添字として、$\omega=i\sum_{p,q}g_{p\bar q}\,dz^p\wedge d\bar z^q$、$\omega_{\varphi_k}=i\sum_{p,q}h_{k,p\bar q}\,dz^p\wedge d\bar z^q$ と書く。ここで $h_{k,p\bar q}=g_{p\bar q}+\partial_p\partial_{\bar q}\varphi_k$ で、$\partial_p=\partial/\partial z^p$、$\partial_{\bar q}=\partial/\partial\bar z^q$ は複素座標の偏微分を表す。

[正値Kählerポテンシャルの定義](../YAU1-03/index.md#def-yau1-03-positive-domain)と[実 $(1,1)$ 形式の係数行列による正値判定](../../KAH/KAH1-02/index.md#prop-kah1-02-matrix-criterion)を、$v=\sum_p v^p\partial_p\ne0$ に適用すると、

$
-i\,\omega_{\varphi_k}(v,\bar v)
=\sum_{p,q}h_{k,p\bar q}v^p\overline{v^q}
>0.
$

したがって $h_k=(h_{k,p\bar q})$ はこの複素接基底でのHermite形式の係数行列であり、形式の正値性は行列の正値性と同値である。$C^2$ 収束から $h_k$ の各成分は収束するが、それだけでは厳密な正値性を保証しない。例えば正値行列 $\operatorname{diag}(1/k,1)$ は $\operatorname{diag}(0,1)$ へ収束して退化する。

一方、[二階評価の大域閉包](../YAU1-09/index.md#thm-yau1-09-global-second-order)では、解のある $t$ に共通の $c>0$ があり

$$
c g\le h_k\le C g
$$

となる。ここで $h_k=h_{t_k}$ は可解時刻 $t_k$ での行列を表し、同じ $c,C$ がすべての $k$ に使える。この下限こそ、極限を許容Kählerポテンシャルの**開いた**正値領域に留める保証である。

<a id="lem-yau1-12-limit-equation"></a>

<!-- formal-statement-start -->
> **補題（極限での正値性と方程式の保存）**  
> $(X,\omega)$ を境界のないコンパクトKähler多様体、$F\in C^\infty(X;\mathbb R)$ とする。実関数 $\varphi_k,\varphi_\ast\in C^2(X;\mathbb R)$ に対し $\omega_\varphi:=\omega+i\partial\bar\partial\varphi$ と置く。$t_k\to t_\ast\in[0,1]$、$\varphi_k\to\varphi_\ast$ が $C^2(X)$ で成立すると仮定し、各 $\varphi_k$ が

$$
\omega_{\varphi_k}>0,\qquad
\omega_{\varphi_k}^n=(1-t_k+t_ke^F)\omega^n,
\qquad c\omega\le\omega_{\varphi_k}\le C\omega
$$

> を満たすとする。ただし $c,C>0$ は $k$ に依存しない。すると $\omega_{\varphi_\ast}$ は正値で、次の極限方程式が成立する。

$$
\omega_{\varphi_\ast}^n=(1-t_\ast+t_\ast e^F)\omega^n.
$$
<!-- formal-statement-end -->

### 証明の見取り図

各点と任意の接ベクトルで二側不等式を極限に通し、同じ $c>0$ の下界を残す。方程式は局所行列式の連続性を使う。右辺は固定 $F$ と $t_k\to t_\ast$ により一様収束する。

<!-- proof-start -->
### 証明

任意の $x\in X$ と $0\ne v\in T_x^{1,0}X$ で $h_k(v,\bar v)\ge c g(v,\bar v)$。$C^2$ 収束により $h_k(x)\to h_\ast(x)$ が成分ごとに成立するので、

$$
h_\ast(v,\bar v)=\lim_{k\to\infty}h_k(v,\bar v)
\ge c g(v,\bar v)>0.
$$

上側も同様に $h_\ast\le Cg$。従って $\omega+i\partial\bar\partial\varphi_\ast$ は**連続で厳密に正値な**実 $(1,1)$ 形式であり、分布の意味で閉じている。ただし $C^2$ 収束だけから $\varphi_\ast$ の滑らかさは言えず、この段階で滑らかなKähler形式とは呼ばない。閉性定理では先の滑らかな部分列補題がこの不足を補う。

係数行列から体積形式へ移る理由も確認する。最高次外積の交代性から、固定座標で

$
\omega_{\varphi_k}^n
=n!\det(h_k)\bigwedge_{p=1}^n(i\,dz^p\wedge d\bar z^p),\qquad
\omega^n=n!\det(g)\bigwedge_{p=1}^n(i\,dz^p\wedge d\bar z^p).
$

この共通因子が消えるので体積方程式は $\det(h_k)=\rho_{t_k}\det(g)$ と同値になる（[既習の行列式による体積比](../YAU1-03/index.md#def-yau1-03-log-ma)）。行列式は行列成分の多項式なので、$C^2$ 収束から

$$
\det(h_\ast)=\lim_{k\to\infty}\det(h_k)
=\lim_{k\to\infty}(1-t_k+t_ke^F)\det(g)
=(1-t_\ast+t_\ast e^F)\det(g).
$$

チャートを取り替える際の正則な遷移写像のJacobian行列を $J$（$J^\ast$ は共役転置）とすると、係数行列は $J^\ast hJ$、背景側は $J^\ast gJ$ に変わり、両行列式には同じ $|\det J|^2$ が掛かる。従って比 $\det h/\det g$ はチャートに依らず、上の局所等式は大域の体積形式の等式となる。$\square$
<!-- proof-end -->

**何を混同してはいけないか。** 正の行列式は「全ての固有値が正」と同値ではない。たとえば $\operatorname{diag}(-1,-1)$ の行列式も $1$ である。また各 $k$ で全固有値が正でも、下限が $k$ に依存すれば退化を防げない。極限方程式だけから正値性を結論せず、二側評価を先に極限へ渡す。

## 4. 可解集合が閉じていることを示す

ここでは「解がある」という言葉を、滑らかな実関数の[平均ゼロ規格化](../YAU1-04/index.md#def-yau1-04-mean-zero)を満たす許容解が存在すること、と固定する。

$$
\mathcal S_\infty
=\{t\in[0,1]:\exists\varphi_t\in C^\infty(X;\mathbb R),\ 
\omega_{\varphi_t}>0,\ \omega_{\varphi_t}^n=\rho_t\omega^n,
\ \int_X\varphi_t\omega^n=0\}.
$$

これは[連続性のパスの定義](../YAU1-05/index.md#def-yau1-05-path)で関数クラスを滑らかな関数に指定したものである。$t_k$ が可解集合に属し $t_k\to t_\ast$ なら、各時刻から**一つずつ**解を選べる。平均ゼロは定数を除くため、前章の一様評価をそのまま適用できる。

<a id="thm-yau1-12-closedness"></a>

<!-- formal-statement-start -->
> **定理（連続性の方法における閉性）**  
> $(X,\omega)$ を複素次元 $n\ge1$ の境界のないコンパクト連結Kähler多様体、$F\in C^\infty(X;\mathbb R)$ を滑らかな実関数とし、体積整合条件を仮定する。

$$
\int_Xe^F\omega^n=\int_X\omega^n.
$$

> $\rho_t=1-t+te^F$、$\omega_{\varphi_t}:=\omega+i\partial\bar\partial\varphi_t$ と置く。$\omega_{\varphi_t}>0$、$\omega_{\varphi_t}^n=\rho_t\omega^n$、$\int_X\varphi_t\omega^n=0$ を満たす滑らかな実関数 $\varphi_t$ が存在する時刻 $t\in[0,1]$ の集合 $\mathcal S_\infty$ は、$[0,1]$ の相対閉集合である。
<!-- formal-statement-end -->

### 証明の見取り図

任意の可解時刻列 $t_k\to t_\ast$ から解 $\varphi_k$ を取る。前章の全階一様評価で一つの滑らかな収束部分列を得る。平均ゼロ、正値下限、行列式の方程式を極限で順に確認すれば $t_\ast$ も可解である。

<!-- proof-start -->
### 証明

$t_k\in\mathcal S_\infty$、$t_k\to t_\ast\in[0,1]$ とする。各 $k$ の解 $\varphi_k$ を選ぶ。$X,g,F$ が固定され、$0\le t_k\le1$、解は滑らかかつ平均ゼロなので、[高階事前評価](../YAU1-11/index.md#thm-yau1-11-higher-estimates)を $m+1$ 階と $\alpha=1/2$ に適用できる。各 $m\ge0$ で

$$
\sup_k\|\varphi_k\|_{C^{m+1,1/2}}\le C_{m+1,1/2}
$$

を得る。[滑らかな部分列の補題](#lem-yau1-12-smooth-compactness)で $\varphi_{k_j}\to\varphi_\ast$ が全ての $C^m$ で成り立つ滑らかな $\varphi_\ast$ を取れる。同補題を固定体積形式 $dV=\omega^n$ に適用して

$$
\int_X\varphi_\ast\omega^n
=\lim_{j\to\infty}\int_X\varphi_{k_j}\omega^n=0.
$$

さらに[二側計量評価](../YAU1-09/index.md#thm-yau1-09-global-second-order)で同じ $c,C>0$ に対し $c\omega\le\omega_{\varphi_{k_j}}\le C\omega$。部分列は $C^2$ 収束し、時刻も $t_{k_j}\to t_\ast$ だから、[極限保存補題](#lem-yau1-12-limit-equation)より

$$
\omega_{\varphi_\ast}>0,\qquad
\omega_{\varphi_\ast}^n=\rho_{t_\ast}\omega^n.
$$

ゆえに $\varphi_\ast$ は $t_\ast$ の滑らかな平均ゼロ許容解であり、$t_\ast\in\mathcal S_\infty$。距離空間 $[0,1]$ では列の極限を含むことと閉集合であることが同値だから、$\mathcal S_\infty$ は相対閉である。$\square$
<!-- proof-end -->

## 5. 閉性と開性をつないで存在を得る

最後の論理には、開性で使った関数空間と今の滑らかな解の可解集合を接続する手続きが一つ必要である。[開性定理](../YAU1-05/index.md#thm-yau1-05-openness)は $s=2n+1$ とし、$H^{s+2}$ の固定平均ゼロ・正値開領域に属する解の集合 $\mathcal S_s$ を扱った。同章では滑らかな正密度をもつ解の[局所正則性](../YAU1-05/index.md#thm-yau1-05-openness)を証明しているため、$\mathcal S_s=\mathcal S_\infty$ である。滑らかな解は $H^{s+2}$ に入り、逆向きには $H^{s+2}$ 解が滑らかになるからである。

開かつ閉じた空でない部分集合が連結区間全体と一致する事実を、ここでは $\mathcal S_\infty$ に適用する。これで解析的な評価が、求める**存在定理**へ結び付く。

<a id="thm-yau1-12-existence"></a>

<!-- formal-statement-start -->
> **定理（正規化複素Monge–Ampère方程式の存在と一意性）**  
> $(X,\omega)$ を複素次元 $n\ge1$ の境界のないコンパクト連結Kähler多様体、$F\in C^\infty(X;\mathbb R)$ を実関数とし、体積整合条件

$$
\int_Xe^F\omega^n=\int_X\omega^n
$$

> を仮定する。このとき滑らかな実関数 $\varphi$ が存在し、

$$
\omega_\varphi:=\omega+i\partial\bar\partial\varphi>0,
\qquad \omega_\varphi^n=e^F\omega^n,
\qquad\int_X\varphi\omega^n=0
$$

> を満たす。そのような平均ゼロの $\varphi$ は一意である。平均ゼロを外した許容解は定数差まで一意である。
<!-- formal-statement-end -->

### 証明の見取り図

初期時刻 $0$ には $\varphi=0$ がある。開性と直前の閉性を同じ可解集合に適用する。区間 $[0,1]$ が連結なので $1$ が可解となり、その右辺は $e^F$ である。一意性は存在証明とは別に、既習の定数差一意性を使う。

<!-- proof-start -->
### 証明

まず[パスの整合性](../YAU1-05/index.md#prop-yau1-05-path-compatibility)により $\rho_0=1$、$\varphi_0=0$ が方程式・正値性・平均ゼロを満たすから $0\in\mathcal S_\infty$。前述の $\mathcal S_s=\mathcal S_\infty$ と[連続性の方法における可解集合の開性](../YAU1-05/index.md#thm-yau1-05-openness)から $\mathcal S_\infty$ は $[0,1]$ 内で相対開である。[連続性の方法における閉性](#thm-yau1-12-closedness)から相対閉でもある。

$[0,1]$ が連結で、$\mathcal S_\infty$ は空でない開かつ閉じた部分集合だから $\mathcal S_\infty=[0,1]$。特に $1\in\mathcal S_\infty$ なので、滑らかな正値計量を与える平均ゼロ解 $\varphi_1$ が存在する。端点では

$$
\rho_1=1-1+e^F=e^F,
\qquad \omega_{\varphi_1}^n=e^F\omega^n.
$$

これで存在を示した。二解 $\varphi,\psi$ に[複素Monge–Ampère方程式の解の定数差一意性](../YAU1-04/index.md#thm-yau1-04-uniqueness)を適用すると、許容性・同じ $F$ という仮定により $\psi-\varphi=c$。両者が平均ゼロなら

$$
0=\int_X(\psi-\varphi)\omega^n=cV,
\qquad V>0\ \Longrightarrow\ c=0.
$$

従って正規化解は一意。逆に定数の $\partial\bar\partial$ は零だから、平均ゼロを外すと $\varphi+c$ は全て解である。$\square$
<!-- proof-end -->

**直接例：平坦楕円曲線。** [パスの定義例](../YAU1-05/index.md#def-yau1-05-path)の $T=\mathbb C/(\mathbb Z+i\mathbb Z)$、$\omega_0=i\,dz\wedge d\bar z$ を使い、$z=x+iy$（$x,y$ は実座標）、$0<|a|<1$、$e^F=1-a\cos(2\pi x)$ とする。各 $t\in[0,1]$ に

$
\varphi_t=\frac{ta}{\pi^2}\cos(2\pi x)
$

と置く。[Wirtinger微分の定義](../../CM/CM2-02/index.md#def-cm2-02-wirtinger-operators)より $\partial_z=(\partial_x-i\partial_y)/2$、$\partial_{\bar z}=(\partial_x+i\partial_y)/2$ であり、混合微分の交換から $\partial_z\partial_{\bar z}=(\partial_x^2+\partial_y^2)/4$ となる。$\varphi_t$ は $y$ に依存しないから

$
\partial_z\partial_{\bar z}\varphi_t
=\frac14\partial_x^2\left(\frac{ta}{\pi^2}\cos(2\pi x)\right)
=\frac14(-4ta\cos(2\pi x))
=-ta\cos(2\pi x)
$

が成り立つ。従って計量係数は $1-ta\cos(2\pi x)\ge1-|a|>0$、密度も同じ $\rho_t$、平均は余弦の一周期積分が零なので零である。$t_k\to t_\ast$ なら $\varphi_{t_k}\to\varphi_{t_\ast}$ は全階で成立する。これは抽象的な閉性を、明示解と具体的な下界で確かめた例である。

## 6. 仮定が失われるとどこで止まるか

1. **体積整合がない。** $F\equiv\log2$ では $\int_Xe^F\omega^n=2V$ だが、固定Kähler類の[体積不変性](../YAU1-03/index.md#prop-yau1-03-compatibility)から $\int_X\omega_\varphi^n=V$。従って解は存在せず、そもそも $\rho_t$ の積分整合が崩れる。
2. **下側楕円定数がない。** $h_k=\operatorname{diag}(1/k,1)$ は全て正値でも極限は退化する。[極限保存補題](#lem-yau1-12-limit-equation)の $c>0$ が消え、許容領域への帰属を証明できない。
3. **高階一様評価がない。** $u_k(x)=k^{-1}\sin(kx)$ は $C^0$ 収束するが微分は振動する。[滑らかな部分列補題](#lem-yau1-12-smooth-compactness)の高階仮定が失われ、極限方程式への二階微分の代入が正当化できない。
4. **連結性がない。** [開性の線形化同型](../YAU1-05/index.md#thm-yau1-05-poisson-isomorphism)でLaplacianの核が全体の定数だけではなくなる。全体平均ゼロだけでは同型が保証されず、連続性の方法をそのまま適用できない。

## 7. 演習：極限操作から存在結論まで

### Level A

<a id="ex-yau1-12-a01"></a>

#### YAU1-12-A01 密度の上下界
- Level: A

$e^F$ が $0<m\le e^F\le M$ を満たすとき、$\rho_t=1-t+te^F$ の $t\in[0,1]$ に共通する上下界を導け。

<!-- solution-start -->
**詳細解答。** $\rho_t=(1-t)\cdot1+t\cdot e^F$ は $1$ と $e^F$ を非負係数（和は $1$）で重み付けした平均なので

$$
(1-t)\min\{1,m\}+t\min\{1,m\}\le\rho_t
\le(1-t)\max\{1,M\}+t\max\{1,M\}.
$$

左右の係数和が $1$ だから、$\min\{1,m\}\le\rho_t\le\max\{1,M\}$ となる。ただしこれは体積密度の評価であって、$h_t$ の全固有値の上下界ではない。
<!-- solution-end -->

<a id="ex-yau1-12-a02"></a>

#### YAU1-12-A02 平均ゼロの極限
- Level: A

コンパクト $X$ の有限体積形式 $dV$ に対して $u_j\to u$ が $C^0$ で成立し、全ての $j$ で $\int_Xu_j\,dV=0$ なら $\int_Xu\,dV=0$ を証明せよ。

<!-- solution-start -->
**詳細解答。** $V=\int_XdV<\infty$ と置く。三角不等式と一様収束から

$$
\left|\int_Xu\,dV\right|
=\left|\int_X(u-u_j)\,dV\right|
\le\int_X|u-u_j|\,dV\le V\|u-u_j\|_{C^0}\to0.
$$

ゆえに極限の平均も零となる。正規化は方程式の微分構造とは独立に保持される。
<!-- solution-end -->

<a id="ex-yau1-12-a03"></a>

#### YAU1-12-A03 正値下限を極限へ渡す
- Level: A

正値Hermite行列 $H_j$ が $H_j\to H$ と $H_j\ge cG$（固定正値 $G$ と $c>0$）を満たすとき、$H$ が正値であることを示せ。

<!-- solution-start -->
**詳細解答。** 任意の非零複素列ベクトル $v$ に $v^\ast H_jv\ge c v^\ast Gv$ を適用する。有限個の行列成分の収束から $v^\ast H_jv\to v^\ast Hv$ なので

$$
v^\ast Hv\ge c v^\ast Gv>0.
$$

$G$ の正値性と $c>0$ が厳密不等号を保証する。$c=c_j\downarrow0$ ではこの結論は導けない。
<!-- solution-end -->

<a id="ex-yau1-12-a04"></a>

#### YAU1-12-A04 行列式の極限
- Level: A

$2\times2$ 行列 $H_j=\begin{pmatrix}a_j&b_j\\\overline{b_j}&d_j\end{pmatrix}$ の各成分が $a,b,d$ に収束するとき $\det H_j\to ad-|b|^2$ を示し、方程式に二階微分の収束が要る理由を述べよ。

<!-- solution-start -->
**詳細解答。** 二次行列式を展開すると $\det H_j=a_jd_j-b_j\overline{b_j}=a_jd_j-|b_j|^2$。複素共役・和・積は連続だから極限は $ad-|b|^2$。Monge–Ampèreの $H_j$ には $g_{p\bar q}+\partial_p\partial_{\bar q}\varphi_j$ が入るので、$\varphi_j$ の値の収束だけでは各成分の収束を得られず、$C^2$ 収束が必要になる。
<!-- solution-end -->

<a id="ex-yau1-12-a05"></a>

#### YAU1-12-A05 楕円曲線の解列
- Level: A

$\varphi_t=(ta/\pi^2)\cos(2\pi x)$、$|a|<1$ の楕円曲線の例で、$t_j\to1$ に対する $C^m$ 収束と計量係数の下限を確認せよ。

<!-- solution-start -->
**詳細解答。** $x$ の $r$ 階微分の差は $a(t_j-1)(2\pi)^r/\pi^2$ に余弦または正弦を掛けたものなので

$$
\|\partial_x^r(\varphi_{t_j}-\varphi_1)\|_\infty
\le\frac{|a|}{\pi^2}|t_j-1|(2\pi)^r\to0
$$

であり、$y$ 微分を含むものは零。任意の固定 $m$ で $C^m$ 収束する。$\partial_z\partial_{\bar z}\varphi_{t_j}=-t_ja\cos(2\pi x)$ より計量係数は $1-t_ja\cos(2\pi x)\ge1-|a|>0$。極限でも同じ下界を持つ。
<!-- solution-end -->

### Level B

<a id="ex-yau1-12-b01"></a>

#### YAU1-12-B01 対角部分列の量化
- Level: B

各 $m\ge0$ について、関数列の中に $C^m$ 収束する部分列が存在するというだけで、なぜ同一部分列の全階収束をまだ主張できないか。入れ子の部分列から構成する手続きを述べよ。

<!-- solution-start -->
**詳細解答。** 次数ごとに別々の部分列を選ぶだけでは、それらが共通の項を無限に含む保証はない。そこで、まず次数 $0$ で収束する部分列 $I_0$ を取り、その**中から**次数 $1$ で収束する部分列 $I_1$ を取る。これを繰り返すと、次の入れ子構造になる。

$$
I_0\supset I_1\supset I_2\supset\cdots.
$$

$I_j$ の第 $j$ 項を選んで対角部分列を作る。固定した次数 $m$ について、対角列の十分後ろの項は全て $I_m$ に属する。したがって $I_m$ での $C^m$ 収束を引き継ぐ。次数 $0$ の極限は共通だから、どの次数でも同じ関数に収束する。
<!-- solution-end -->

<a id="ex-yau1-12-b02"></a>

#### YAU1-12-B02 密度と一様楕円性の違い
- Level: B

$H_k=\operatorname{diag}(k,1/k)$（$k\ge1$）について、正値性・行列式・固有値の上下界・収束部分列の有無を調べ、「$\det H_k=1$ だから閉性が従う」という議論の誤りを説明せよ。

<!-- solution-start -->
**詳細解答。** $H_k$ の固有値は $k,1/k$ でどちらも正、行列式は $k\cdot(1/k)=1$。しかし最大固有値 $k\to\infty$ なので一様な上界 $H_k\le CG$ は固定 $G=I$ に対して存在しない。最小固有値 $1/k\to0$ なので共通の正の下界もない。第1成分が無限大に発散するため、有限行列への成分収束部分列すらない。行列式は固有値の**積**だけを固定し、各固有値を別々に制御しない。閉性の証明は二側計量評価と全階事前評価を別途必要とする。
<!-- solution-end -->

<a id="ex-yau1-12-b03"></a>

#### YAU1-12-B03 Sobolev解と滑らかな解
- Level: B

$s=2n+1$ のSobolev可解集合 $\mathcal S_s$ と滑らかな可解集合 $\mathcal S_\infty$ が一致する理由を、両包含ごとに既習結果と仮定を明示して証明せよ。

<!-- solution-start -->
**詳細解答。** まず滑らかな許容解は、コンパクト $X$ 上の全階Sobolev空間に属する。平均ゼロ・正値条件も満たすので、[固定平均零Sobolev領域](../YAU1-05/index.md#def-yau1-05-fixed-spaces)に入る。従って一つ目の包含を得る。

$$
\mathcal S_\infty\subset\mathcal S_s.
$$

逆に $t\in\mathcal S_s$ の解 $u$ は $H^{s+2}$ に属する。$s=2n+1$ でのSobolev埋め込みから $u\in C^2$。許容領域の定義から $\omega_u>0$ であり、右辺 $\rho_t$ は固定された滑らかな $F$ によって滑らかかつ正である。

ここで $G_u=G+\partial\bar\partial u$ の成分は $H^s$、正値性からその逆行列も定義される。$\log\det G_u-\log\det G=\log\rho_t$ を実座標方向に微分すると、$\partial_\ell u$ に対する一様楕円型の線形方程式を得る。[YAU1-05第7節の局所正則性の議論](../YAU1-05/index.md#thm-yau1-05-openness)では、その方程式に内部 $H^2$ 評価を繰り返し適用して $u\in H^m$ を任意の $m$ まで上げる。従ってSobolev埋め込みから $u\in C^\infty$ を得る。平均ゼロも保持されるから逆の包含も成立し、結局

$$
\mathcal S_s=\mathcal S_\infty
$$

である。
<!-- solution-end -->

### Level C

<a id="ex-yau1-12-c01"></a>

#### YAU1-12-C01 連続性の方法を完結させる
- Level: C

境界のないコンパクト連結Kähler多様体 $(X,\omega)$ と滑らかな実関数 $F$ で $\int_Xe^F\omega^n=\int_X\omega^n$ を仮定する。YAU1-05 の開性、YAU1-09 の二側計量評価、YAU1-11 の高階評価を入力として、平均ゼロ正規化した $\omega_\varphi^n=e^F\omega^n$ の解の存在と一意性を、(i) 可解集合、(ii) コンパクト性、(iii) 極限の条件、(iv) 位相的結論、(v) 一意性の順に独立に組み立てよ。

<!-- solution-start -->
**詳細解答。**

(i) $\rho_t=1-t+te^F$ と $\mathcal S_\infty$ を第4節のように定める。$\rho_0=1$ と $\varphi_0=0$ から $0\in\mathcal S_\infty$。滑らかな右辺のSobolev解は滑らかになるので $\mathcal S_s=\mathcal S_\infty$、[開性定理](../YAU1-05/index.md#thm-yau1-05-openness)が相対開性を与える。

(ii) 任意の $t_j\in\mathcal S_\infty$ が $t_j\to t_\ast$ なら平均ゼロ解 $\varphi_j$ を選ぶ。[高階評価](../YAU1-11/index.md#thm-yau1-11-higher-estimates)は全 $m$ に一様 $C^{m+1,1/2}$ 上界を与える。有限チャートでArzelà–Ascoliと対角化を行い $\varphi_{j_\ell}\to\varphi_\ast$ を全 $C^m$ で得る。

(iii) 一様収束から $\int_X\varphi_\ast\omega^n=0$。$C^2$ 収束と[二側計量評価](../YAU1-09/index.md#thm-yau1-09-global-second-order)の $c\omega\le\omega_{\varphi_j}$ を組み合わせ、任意の $v\ne0$ に

$$
h_\ast(v,\bar v)=\lim_\ell h_{j_\ell}(v,\bar v)
\ge cg(v,\bar v)>0.
$$

成分ごとの行列式の連続性と $\rho_{t_{j_\ell}}\to\rho_{t_\ast}$ から $\omega_{\varphi_\ast}^n=\rho_{t_\ast}\omega^n$。滑らかで正値かつ平均ゼロだから $t_\ast\in\mathcal S_\infty$、すなわち相対閉。

(iv) $\mathcal S_\infty$ は連結区間 $[0,1]$ 内の空でない開かつ閉じた集合なので全区間と等しい。$t=1$ で $\rho_1=e^F$ となり解が存在する。

(v) 二解 $\varphi,\psi$ に[定数差一意性](../YAU1-04/index.md#thm-yau1-04-uniqueness)を適用して $\psi-\varphi=c$。平均ゼロを積分すれば $cV=0$、$V>0$ より $c=0$。これで正規化解の一意性を得る。
<!-- solution-end -->
