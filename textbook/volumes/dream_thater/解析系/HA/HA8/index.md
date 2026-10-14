# HA8 Littlewood–Paley理論と周波数局在

[Fourier変換の$L^2$反転とPlancherel](../../FOU/FOU4/index.md#thm-fou4-l2-inversion)により、関数全体のエネルギーを周波数側で測れるようになりました。しかし高周波だけを増幅すると、関数の微分可能性や作用素の評価は変わります。周波数を単純な指示関数で切る方法では、切断後の核が十分滑らかとは限りません。そこで周波数帯を重なりのある**滑らかな二進分割**で切り分け、各帯域の大きさを二乗和で測ります。

本章は、まず[HA5の特異積分に対する強型評価](../HA5/index.md#thm-ha5-stronglp)までを既習とし、その核条件を周波数側から検証し直すところに特徴があります。$L^2$ の評価はPlancherelで得られます。$L^p$ の評価ではランダムな符号を使って周波数成分を一つの作用素へまとめ、核の消去と滑らかさを確かめます。最後に帯域の半径から導関数と積分指数の関係を読み取ります。

以下 $d\ge1$、$1<p<\infty$ とし、積分は $\mathbb R^d$ 上で行います。Fourier規約は

$$
\widehat f(\xi)=\int_{\mathbb R^d}e^{-ix\cdot\xi}f(x)\,dx,\qquad
f(x)=(2\pi)^{-d}\int_{\mathbb R^d}e^{ix\cdot\xi}\widehat f(\xi)\,d\xi
$$

です。[FOU4の一変数のPlancherel](../../FOU/FOU4/index.md#thm-fou4-plancherel-core)を各座標へ順に適用し、積分をFubiniで交換して稠密な滑らかな関数から延長すれば、$d$ 次元では

$$
\|f\|_2^2=(2\pi)^{-d}\|\widehat f\|_2^2
$$

となります。以後この正規化で議論します。$\mathcal S(\mathbb R^d)$ は各多重指数 $\alpha,\beta$ について $x^\alpha\partial^\beta f(x)$ が有界な無限回微分可能関数（Schwartz関数）の全体です。コンパクト台の滑らかな関数はその例です。滑らかなコンパクト台の周波数関数の逆Fourier変換も、各座標で繰り返し部分積分するとSchwartz関数になります。これを核の可積分性に利用します。

## 1. 低周波を残した滑らかな分割

尺度 $2^j$ の周波数を取り出すには、半径に関して単調な滑らかな切断関数を一つ用意すれば十分です。非負性まで確保すると、各周波数帯の二乗和が消えないことも直ちに分かります。

$a\le b$ について、$t\le a$ で $1$、$t\ge b$ で $0$、その間で滑らかに単調減少する $C^\infty$ 関数を取れます（例えば区間内部で $e^{-1/u}$ を使って端で全階微分が零となる補間を作れます）。これを $|\xi|^2$ に適用して、次の $\varphi$ を選びます。

<a id="def-ha8-dyadic"></a>
<!-- formal-statement-start -->
> **定義（滑らかなdyadic周波数分割）**  
> $d\ge1$ とし、$\varphi\in C_c^\infty(\mathbb R^d)$ は放射状で $0\le\varphi\le1$、半径に関して単調非増加で、$|\xi|\le1$ では $\varphi=1$、$|\xi|\ge2$ では $\varphi=0$ とする。
>
> $\psi(\xi)=\varphi(\xi)-\varphi(2\xi)$ および $\psi_j(\xi)=\psi(2^{-j}\xi)$（$j\in\mathbb Z$）と定める。このとき $\psi_j\ge0$ であり
>
$$
\operatorname{supp}\psi_j\subset
\{\xi:2^{j-1}\le|\xi|\le2^{j+1}\}.
$$
>
> **非斉次分割**は $\varphi$ と $(\psi_j)_{j\ge1}$ の組、**斉次分割**は $(\psi_j)_{j\in\mathbb Z}$ の組とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ha8-dyadic -->
**定義の確認**　$|\xi|=2^k$（$k\ge2$）で考えると、$\psi_j(\xi)$ が零でない可能性があるのは $j=k-1,k,k+1$ だけです。なぜなら非零の条件 $1/2<2^{-j}|\xi|<2$ を $2^k$ に代入すると $k-1<j<k+1$（境界では滑らかcutoffの値が零）となるからです。連続的な $\xi$ についても、周波数帯の重複数は高々4で一定です。また $\varphi(\xi)-\varphi(2\xi)\ge0$ は半径についての単調性によります。単に台の包含だけで非負性を主張してはいません。
<!-- definition-example-end -->

分割の和は別の仮定ではなく、定義の差から導きます。整数 $M\ge1$ について

$$
\begin{aligned}
\varphi(\xi)+\sum_{j=1}^M\psi_j(\xi)
&=\varphi(\xi)+\sum_{j=1}^M
\{\varphi(2^{-j}\xi)-\varphi(2^{1-j}\xi)\}\\
&=\varphi(2^{-M}\xi).
\end{aligned}
$$

$M\to\infty$ で右辺は $\varphi(0)=1$ となります。斉次の場合も、$N,M\ge1$ なら

$$
\sum_{j=-N}^M\psi_j(\xi)
=\varphi(2^{-M}\xi)-\varphi(2^{N+1}\xi).
$$

$\xi\ne0$ なら二項は順に $1$ と $0$ に収束します。一方 $\xi=0$ ではすべての $\psi_j(0)=0$ です。**斉次分割の和が1となるのは原点以外**であり、この一点の違いが分布を扱う際には多項式の曖昧さになります。

## 2. 周波数射影を畳み込みに戻す

射影という名称は、各帯域の周波数成分を取り出す意味です。重なりがあるため一般に $\Delta_j^2=\Delta_j$ とはなりません。特に直交射影と取り違えないでください。

<a id="def-ha8-projection"></a>
<!-- formal-statement-start -->
> **定義（Littlewood–Paley射影）**  
> 上の[分割](#def-ha8-dyadic)について、$f\in\mathcal S(\mathbb R^d)$ に対し
>
$$
\widehat{\Delta_0 f}=\varphi\widehat f,\qquad
\widehat{\Delta_j f}=\psi_j\widehat f\quad(j\ge1)
$$
>
> と定める。斉次射影はすべての $j\in\mathbb Z$ に対して $\widehat{\dot\Delta_j f}=\psi_j\widehat f$ とする。各作用素はFourier乗算の $L^2$ 延長によって $L^2$ 全体にも定まる。
<!-- formal-statement-end -->

核を導出します。$\check\psi(x)=(2\pi)^{-d}\int e^{ix\cdot\xi}\psi(\xi)\,d\xi$ とおき、逆変換で $\eta=2^{-j}\xi$ と変数変換すると

$$
\begin{aligned}
(2\pi)^{-d}\int e^{ix\cdot\xi}\psi(2^{-j}\xi)\,d\xi
&=2^{jd}(2\pi)^{-d}\int e^{i(2^jx)\cdot\eta}\psi(\eta)\,d\eta\\
&=2^{jd}\check\psi(2^jx)=:K_j(x).
\end{aligned}
$$

したがって $\Delta_jf=K_j*f$ です。$\psi(0)=0$ より $\int K_j(x)\,dx=0$ であり、$\varphi(0)=1$ より低周波核 $K_0=\check\varphi$ は $\int K_0=1$ です。この二つの質量条件が高周波の消去と低周波の保持を区別します。

<!-- definition-example-start: def-ha8-projection -->
**定義の確認**　$\widehat f$ が $3\le|\xi|\le4$ に台を持つSchwartz関数だとします。$\Delta_0f=0$ です。$\Delta_jf$ のFourier台は元の台と $\{2^{j-1}\le|\xi|\le2^{j+1}\}$ の共通部分ですから、重ならない $j\ge4$ と $j=1$ の外側では零になります。$j=1,2,3$ のうち重なる帯域だけが寄与し、各点で $\sum_{j\ge1}\psi_j=1$ のため和は元の $f$ です。特定の一つの帯域が必ず全体を保持するとは限りません。
<!-- definition-example-end -->

<a id="prop-ha8-decomposition"></a>
<!-- formal-statement-start -->
> **命題（非斉次・斉次分解のL2収束）**  
> $f\in L^2(\mathbb R^d)$ なら
>
$$
f=\Delta_0f+\sum_{j=1}^{\infty}\Delta_jf,\qquad
f=\lim_{N,M\to\infty}\sum_{j=-N}^M\dot\Delta_jf
$$
>
> がいずれも $L^2$ の意味で成立する。ここで後者の極限は $N,M$ が独立に無限大へ向かうものとする。
<!-- formal-statement-end -->

### 証明の見取り図

有限和のFourier乗数は先ほどの望遠和から低周波cutoffとなります。周波数ごとの極限と $0\le\varphi\le1$ を使い、[Plancherel](../../FOU/FOU4/index.md#thm-fou4-plancherel-core)で $L^2$ 収束へ移します。

<!-- proof-start -->
### 証明

非斉次部分和の乗数は $\varphi(2^{-M}\xi)$ です。従ってPlancherelを $f-(\Delta_0+\cdots+\Delta_M)f$ に適用すると

$$
\left\|f-\sum_{j=0}^M\Delta_jf\right\|_2^2
=(2\pi)^{-d}\int
|1-\varphi(2^{-M}\xi)|^2|\widehat f(\xi)|^2\,d\xi.
$$

被積分関数は各点で零へ収束し、$4|\widehat f|^2$ 以下で可積分です。[優収束定理](../../F0/F0-00D2B/index.md#thm-f0-00d2b-01)を適用して極限は零です（参照先の定理はLebesgue積分の支配関数を持つ場合に適用しています）。

斉次有限和の乗数は $\varphi(2^{-M}\xi)-\varphi(2^{N+1}\xi)$ です。$\xi\ne0$ で1へ収束し、原点はLebesgue測度零のため無視できます。差の絶対値は1以下なので、同じく $\widehat f$ の二乗を支配関数として優収束を使います。
<!-- proof-end -->

## 3. 二乗和でエネルギーを測る

一帯域では位相により正負が打ち消し合います。各帯域の絶対値を二乗してから加えると、異なる帯域の相殺を避けて大きさを測れます。これが平方関数です。

<a id="def-ha8-square"></a>
<!-- formal-statement-start -->
> **定義（Littlewood–Paley平方関数）**  
> 上の[非斉次射影](#def-ha8-projection)を使い、$f\in L^2(\mathbb R^d)$ に対して
>
$$
Sf(x)=\left(|\Delta_0f(x)|^2+
\sum_{j=1}^{\infty}|\Delta_jf(x)|^2\right)^{1/2}
$$
>
> と定める。和は非負項の単調極限（値 $+\infty$ を許す）である。斉次版は $\dot Sf=(\sum_{j\in\mathbb Z}|\dot\Delta_j f|^2)^{1/2}$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ha8-square -->
**定義の確認**　$\widehat f$ が $|\xi|\le1$ に台を持つ非零の $L^2$ 関数なら、$\varphi=1$ かつ全 $\psi_j=0$ がその台上で成り立つので $\Delta_0f=f$、$\Delta_jf=0$（$j\ge1$）。従って $Sf=|f|$ です。逆に $|\xi|\approx2^k$ の入力はその近くの有限個の帯域で測られます。定義の和が実際にどの項から成るかをFourier台で確認しました。
<!-- definition-example-end -->

<a id="thm-ha8-l2"></a>
<!-- formal-statement-start -->
> **定理（L2平方関数評価）**  
> 上記の非負で滑らかなdyadic分割を固定する。任意の $f\in L^2(\mathbb R^d)$ について
>
$$
\frac12\|f\|_2\le\|Sf\|_2\le\|f\|_2.
$$
>
> 同様に斉次平方関数でも $c\|f\|_2\le\|\dot Sf\|_2\le\|f\|_2$ が成り立つ（ある普遍的な $c>0$）。
<!-- formal-statement-end -->

### 証明の見取り図

一つの周波数 $\xi$ は高々4個のcutoffにしか現れません。それらの値は非負で和が1です。Cauchy–Schwarzから二乗和が下からも制御され、Plancherelで積分できます。

<!-- proof-start -->
### 証明

各 $\xi$ において、$a_0=\varphi(\xi)$、$a_j=\psi_j(\xi)$（$j\ge1$）と置きます。$a_j\ge0$、$\sum a_j=1$、非零項数は高々4です。従って

$$
1=\left(\sum a_j\right)^2\le4\sum a_j^2,\qquad
\sum a_j^2\le\left(\sum a_j\right)^2=1.
$$

非負項なので[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)で積分と和を交換し、Plancherelを各 $\Delta_j f$ に使うと

$$
\begin{aligned}
\|Sf\|_2^2
&=\sum_{j\ge0}\|\Delta_jf\|_2^2\\
&=(2\pi)^{-d}\int|\widehat f(\xi)|^2
\left(\varphi(\xi)^2+\sum_{j\ge1}\psi_j(\xi)^2\right)\,d\xi.
\end{aligned}
$$

括弧内が $1/4$ 以上1以下なので、元の $\|f\|_2^2$ と比較できます。斉次版も $\xi\ne0$ では同じ非負分割・有限重複を持ちます。原点は測度零なので $L^2$ 積分には影響しません。
<!-- proof-end -->

ここまでの議論は周波数帯の直交性を**仮定していません**。各帯の重複が一様に有限であることだけで、$L^2$ のエネルギーに上下から比較できています。次節ではこの事実を $L^p$ に拡張しますが、そこではPlancherelだけでは足りません。

## 4. ランダム符号から $L^p$ 平方関数へ

$L^2$ では $\sum_j\|\Delta_j f\|_2^2$ と $\|f\|_2^2$ を直接比べられました。一方、$p\ne2$ では

$$
\left\|\left(\sum_j|\Delta_j f|^2\right)^{1/2}\right\|_p
$$

を $\sum_j\|\Delta_j f\|_p^2$ と同一視できません。周波数成分に独立な符号を付け、符号に関する平均を取ると二乗和が現れる仕組みを構築します。

ここで使う確率的な平均は、有限通りの符号の算術平均にすぎません。確率解析を新たな前提にする必要はありません。

<a id="def-ha8-rademacher"></a>
<!-- formal-statement-start -->
> **定義（Rademacher符号）**  
> 有限集合 $F$ の各添字 $j$ に対して、$\varepsilon_j\in\{-1,1\}$ を独立に、各値を確率 $1/2$ で取る確率変数をRademacher符号という。$\mathbb E H(\varepsilon)$ は全 $2^{|F|}$ 通りの符号にわたる関数 $H$ の算術平均である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ha8-rademacher -->
**定義の確認**　$F=\{1,2\}$ なら $(\varepsilon_1,\varepsilon_2)$ は $(1,1),(1,-1),(-1,1),(-1,-1)$ をそれぞれ確率 $1/4$ で取ります。そのため $\mathbb E\varepsilon_1=0$、$\mathbb E(\varepsilon_1\varepsilon_2)=(1-1-1+1)/4=0$、$\mathbb E\varepsilon_1^2=1$ です。
<!-- definition-example-end -->

<a id="lem-ha8-khintchine"></a>
<!-- formal-statement-start -->
> **補題（Rademacher符号のモーメント比較）**  
> $0<p<\infty$ とする。任意の有限複素数列 $(a_j)_{j\in F}$ と独立なRademacher符号 $(\varepsilon_j)_{j\in F}$ に対し、$p$ だけに依存する $0<c_p\le C_p<\infty$ が存在して
>
$$
c_p\left(\sum_{j\in F}|a_j|^2\right)^{p/2}
\le \mathbb E\left|\sum_{j\in F}\varepsilon_j a_j\right|^p
\le C_p\left(\sum_{j\in F}|a_j|^2\right)^{p/2}.
$$
>
> 定数は $|F|$ と係数には依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

二乗平均は正確に係数の二乗和です。四乗平均で大きすぎる振幅を制限すれば下側の確率が得られ、指数モーメントで尾部を制限すれば任意の $p$ の上側が得られます。

<!-- proof-start -->
### 証明

$X=\sum_{j\in F}\varepsilon_j a_j$、$A^2=\sum|a_j|^2$ とします。$A=0$ は自明です。独立性と $\mathbb E\varepsilon_j=0$、$\mathbb E\varepsilon_j^2=1$ から

$$
\mathbb E|X|^2
=\sum_{j,k}a_j\overline{a_k}\mathbb E(\varepsilon_j\varepsilon_k)
=\sum_j|a_j|^2=A^2.
$$

四乗を展開すると、添字が偶数回現れる積だけが残ります。四つの位置の対の組合せを数えて

$$
\begin{aligned}
\mathbb E|X|^4
&=2A^4+\left|\sum_j a_j^2\right|^2-2\sum_j|a_j|^4\\
&\le3A^4
\end{aligned}
$$

です。実際 $|\sum_j a_j^2|\le\sum_j|a_j|^2=A^2$ を使いました。

$E=\{|X|>A/\sqrt2\}$ とおくと $E^c$ では $|X|^2\le A^2/2$ です。そのため

$$
\frac{A^2}{2}\le \mathbb E(|X|^2\boldsymbol1_E)
\le (\mathbb E|X|^4)^{1/2}\mathbb P(E)^{1/2}
\le\sqrt3\,A^2\mathbb P(E)^{1/2}.
$$

従って $\mathbb P(E)\ge1/12$ であり、すべての $p>0$ について

$$
\mathbb E|X|^p\ge
\mathbb P(E)\left(\frac A{\sqrt2}\right)^p
\ge\frac{A^p}{12\cdot2^{p/2}}.
$$

上側は実係数 $b_j$ について、$\cosh u\le e^{u^2/2}$ より

$$
\mathbb E e^{t\sum_j\varepsilon_j b_j}
=\prod_j\cosh(tb_j)
\le e^{t^2\sum_j b_j^2/2}.
$$

[Markovの不等式](../../F0/F0-00P2A/index.md#thm-f0-00p2a-markov)を指数関数へ適用し、$t=uA/\sum b_j^2$ を選ぶと

$$
\mathbb P\left(\left|\sum_j\varepsilon_j b_j\right|>uA\right)
\le2e^{-u^2/2}
$$

を得ます（$\sum b_j^2=0$ なら左辺は零）。複素係数は実部と虚部に分け、$|z|>uA$ なら少なくとも一方の絶対値が $uA/\sqrt2$ を超えることから

$$
\mathbb P(|X|>uA)\le4e^{-u^2/4}.
$$

最後に非負変数について層別積分を使い、

$$
\mathbb E|X|^p
=p\int_0^\infty t^{p-1}\mathbb P(|X|>t)\,dt
\le4pA^p\int_0^\infty u^{p-1}e^{-u^2/4}\,du.
$$

右辺の積分は $p>0$ なら原点と無限遠の両方で収束します。これで上下の定数が得られました。
<!-- proof-end -->

符号の平均だけでは空間変数を制御できません。次に、符号を任意に付けても**同じ** $L^p$ 定数が使えることを示します。

<a id="lem-ha8-uniform-cz"></a>
<!-- formal-statement-start -->
> **補題（符号付き周波数乗数の一様Lp有界性）**  
> $1<p<\infty$ とする。$F$ を $\{0,1,2,\ldots\}$ の任意の有限部分集合とし、$\varepsilon_j\in\{-1,1\}$ とする。
>
$$
T_{\varepsilon,F}f=\sum_{j\in F}\varepsilon_j\Delta_j f
$$
>
> は $L^p(\mathbb R^d)$ 上で
>
$$
\|T_{\varepsilon,F}f\|_p\le C_{p,d,\varphi}\|f\|_p
$$
>
> を満たす。定数は $F$ と符号の選び方に依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

$L^2$ 有界性は乗数の重複数から得られます。核は $2^{jd}\check\psi(2^j x)$ の符号付き和なので、$2^j|x|\le1$ と $2^j|x|>1$ に分割して幾何級数を足すと、核の大きさ $|x|^{-d}$ と微分 $|x|^{-d-1}$ が一様に得られます。これで[HA5の標準CZ作用素](../HA5/index.md#def-ha5-cz-operator)の仮定がそろいます。

<!-- proof-start -->
### 証明

乗数は $m_{\varepsilon,F}=\sum_{j\in F}\varepsilon_j m_j$（$m_0=\varphi$、$m_j=\psi_j$）です。各 $\xi$ で非零項は高々4個、$0\le m_j\le1$ なので $|m_{\varepsilon,F}(\xi)|\le4$ です。[Plancherel](../../FOU/FOU4/index.md#thm-fou4-plancherel-core)より

$$
\|T_{\varepsilon,F}f\|_2\le4\|f\|_2.
$$

$\kappa=\check\psi$ はSchwartz関数です。従って任意の $N>d+2$ について

$$
|2^{jd}\kappa(2^jx)|
\le C_N2^{jd}(1+2^j|x|)^{-N},
$$

$$
|\nabla[2^{jd}\kappa(2^jx)]|
\le C_N2^{j(d+1)}(1+2^j|x|)^{-N}.
$$

ここで $x\ne0$、$r=|x|$ を固定します。$2^jr\le1$ の項は

$$
\sum_{2^jr\le1}2^{jd}\le C_dr^{-d},\qquad
\sum_{2^jr\le1}2^{j(d+1)}\le C_dr^{-d-1}
$$

です。例えば $2^Jr\le1<2^{J+1}r$ とすると左辺はそれぞれ $2^{Jd}\sum_{k\ge0}2^{-kd}$ 以下と $2^{J(d+1)}\sum_{k\ge0}2^{-k(d+1)}$ 以下です。

他方 $2^jr>1$ では $(1+2^jr)^{-N}\le(2^jr)^{-N}$ なので

$$
\sum_{2^jr>1}2^{jd}(2^jr)^{-N}
=r^{-N}\sum_{2^jr>1}2^{j(d-N)}
\le C_{d,N}r^{-d}.
$$

最後の不等式は最小の該当整数 $J+1$ の $2^{J+1}r>1$ と $2^Jr\le1$ による幾何級数の和です。微分についても $d$ を $d+1$ に置き換え、$N>d+1$ を使えば $Cr^{-d-1}$ になります。低周波核 $\check\varphi$ とその[勾配](../../../幾何系/VC/VC1/index.md#def-vc1-gradient)はSchwartzなので、それぞれ $C|x|^{-d}$ と $C|x|^{-d-1}$ 以下に抑えられます。

以上から有限和の畳み込み核 $k_{\varepsilon,F}$ は、$x\ne0$ で

$$
|k_{\varepsilon,F}(x)|\le C|x|^{-d},\qquad
|\nabla k_{\varepsilon,F}(x)|\le C|x|^{-d-1}
$$

を満たし、定数は符号と有限集合に依存しません。$|y-y'|\le|x-y|/2$ なら線分上の平均値評価によって

$$
|k_{\varepsilon,F}(x-y)-k_{\varepsilon,F}(x-y')|
\le C\frac{|y-y'|}{|x-y|^{d+1}}
$$

となり、第1変数も同様です。各有限和はSchwartz核との畳み込みなので、コンパクト台の $L^2$ 入力の台の外で核積分表示が成立します。$L^2$ 上の有界性と合わせて[HA5の強型定理](../HA5/index.md#thm-ha5-stronglp)を $\delta=1$、$A=C$、$B=4$ として適用でき、結論を得ます。
<!-- proof-end -->

この補題は全ての符号付けに対して一様に成り立つ点が重要です。ひとつの符号列についてだけ有界という主張では、次の有限平均に同じ定数を持ち込めません。

<a id="thm-ha8-lp"></a>
<!-- formal-statement-start -->
> **定理（Littlewood–PaleyのLp平方関数評価）**  
> $d\ge1$、$1<p<\infty$ とし、[非斉次射影](#def-ha8-projection)の畳み込みによる $L^p$ 拡張を使う。任意の $f\in L^p(\mathbb R^d)$ に対して
>
$$
c_{p,d,\varphi}\|f\|_p
\le \|Sf\|_p
\le C_{p,d,\varphi}\|f\|_p.
$$
>
> また非斉次部分和 $\sum_{j=0}^M\Delta_j f$ は $L^p$ で $f$ に収束する。
<!-- formal-statement-end -->

### 証明の見取り図

上界は [Khintchine型補題](#lem-ha8-khintchine)で二乗和を符号平均に変え、[一様CZ評価](#lem-ha8-uniform-cz)を適用します。下界は帯域をもう少し広げた補助cutoffを使い、$L^p$ 双対性に移します。再構成の収束は、低周波核を近似恒等族として扱います。

<!-- proof-start -->
### 証明

**上側。**　$f\in\mathcal S$、$S_Mf=(\sum_{j=0}^M|\Delta_jf|^2)^{1/2}$ とします。各 $x$ で[符号補題](#lem-ha8-khintchine)の係数 $a_j=\Delta_jf(x)$ を選ぶと

$$
c_p|S_Mf(x)|^p
\le2^{-(M+1)}\sum_{\varepsilon\in\{-1,1\}^{M+1}}
\left|\sum_{j=0}^M\varepsilon_j\Delta_jf(x)\right|^p.
$$

積分し、[一様CZ評価](#lem-ha8-uniform-cz)をそれぞれの符号へ適用すれば

$$
c_p\|S_Mf\|_p^p
\le2^{-(M+1)}\sum_\varepsilon
\|T_{\varepsilon,\{0,\ldots,M\}}f\|_p^p
\le C_{p,d,\varphi}^p\|f\|_p^p.
$$

$M\to\infty$ で $S_Mf\uparrow Sf$ なので[単調収束定理](../../F0/F0-00D2B/index.md#ref-limit-integral-exchange)から $\|Sf\|_p\le C\|f\|_p$ です。各 $K_j\in L^1$ による $\Delta_j:L^p\to L^p$ の有界性と[Schwartz関数の稠密性](../../MT/MT7/index.md#thm-mt7-cc-dense)を用い、同じ有限和評価を一般の $f\in L^p$ に移してから単調極限を取れます。

**再構成。**　[望遠和](#def-ha8-dyadic)から

$$
\sum_{j=0}^M\Delta_jf
=\mathcal F^{-1}(\varphi(2^{-M}\cdot)\widehat f)
=L_M*f,\quad L_M(x)=2^{Md}\check\varphi(2^Mx).
$$

$\int\check\varphi=1$ で $\check\varphi\in L^1$ です。平行移動 $\tau_yf=f(\cdot-y)$ を用いると

$$
\|L_M*f-f\|_p
\le\int|\check\varphi(z)|
\|\tau_{2^{-M}z}f-f\|_p\,dz.
$$

$L^p$ 平行移動連続性は $C_c$ 稠密性を使ってFOU4と同じ三角不等式で示せます。積分内は各 $z$ で零へ収束し、$2\|f\|_p|\check\varphi(z)|$ に支配されるので優収束により右辺は零へ収束します。

**下側。**　$\widetilde\varphi\in C_c^\infty$ を $\operatorname{supp}\varphi$ 上で1となる実値関数とし、$\widetilde\psi\in C_c^\infty$ を $\operatorname{supp}\psi$ 上で1、原点近くで0となる実値関数とします。これらの逆変換核による射影を $\widetilde\Delta_0,\widetilde\Delta_j$ と書きます。補助乗数も台が一様な有限重複の環帯にあり、同じ尺度計算で[一様CZ補題](#lem-ha8-uniform-cz)の証明が成立します。したがって先ほどのKhintchine議論を補助射影へ適用でき、

$$
\left\|\left(\sum_{j\ge0}|\widetilde\Delta_jg|^2\right)^{1/2}\right\|_{p'}
\le C_{p',d,\varphi}\|g\|_{p'}.
$$

$f,g\in\mathcal S$ について、$\widetilde\varphi\varphi=\varphi$ と $\widetilde\psi_j\psi_j=\psi_j$、$\sum_jm_j=1$ をFourier側で使うと

$$
\begin{aligned}
\int f\overline g\,dx
&=\sum_{j\ge0}\int\Delta_j f\,
\overline{\widetilde\Delta_jg}\,dx\\
&\le\int Sf(x)
\left(\sum_{j\ge0}|\widetilde\Delta_jg(x)|^2\right)^{1/2}\,dx\\
&\le C_{p',d,\varphi}\|Sf\|_p\|g\|_{p'}.
\end{aligned}
$$

最初の等式はFourier側の有限部分和で計算し、$L^2$ 収束を使って極限を取ります。二行目は数列のCauchy–Schwarz、三行目は[Hölderの不等式](../../F0/F0-00D2D/index.md#thm-f0-00d2d-01)です。[MT7のLp双対性](../../MT/MT7/index.md#thm-mt7-lp-duality)とSchwartz稠密性から $\|f\|_p\le C\|Sf\|_p$ となります。一般の $f\in L^p$ への延長は $f_n\in\mathcal S$、$\|f_n-f\|_p\to0$ とし、既に証明した上側評価で $Sf_n$ の元となるベクトル値列が $L^p(\ell^2)$ でCauchyであることから従います。
<!-- proof-end -->

補足すると、$L^p$ 定理は $p=1,\infty$ を含みません。[HA5のCZ強型定理](../HA5/index.md#thm-ha5-stronglp)自体が $1<p<\infty$ を要求するためです。端点を入れるには Hardy 空間や BMO など別の構造が必要になります。

## 5. Bernstein不等式：帯域の幅と空間の積分指数

周波数を半径 $2^j$ 以下に制限すると、激しく振動することはできません。しかし同じ入力について $L^p$ から $L^q$（$q\ge p$）へノルムを変えると、半径に応じた係数が現れます。この係数を畳み込み核の伸縮から導きます。

<a id="lem-ha8-young"></a>
<!-- formal-statement-start -->
> **補題（Schwartz核の畳み込み評価）**  
> $1\le p,r,q\le\infty$、$1+1/q=1/p+1/r$ とする。$f\in L^p(\mathbb R^d)$、$g\in\mathcal S(\mathbb R^d)$ なら $f*g\in L^q$ で
>
$$
\|f*g\|_q\le\|f\|_p\|g\|_r.
$$
<!-- formal-statement-end -->

### 証明の見取り図

積分の積を三因子に分け、Hölderの指数を畳み込みの指数条件から選びます。$q=\infty$ は直接のHölder評価で扱います。

<!-- proof-start -->
### 証明

$q=\infty$ なら $1/p+1/r=1$ なので、各 $x$ について[Hölderの不等式](../../F0/F0-00D2D/index.md#thm-f0-00d2d-01)を $f(x-y)$ と $g(y)$ に適用し、$|f*g(x)|\le\|f\|_p\|g\|_r$ を得ます。

$q<\infty$ なら指数条件から $p\le q$、$r\le q$ です。被積分関数を

$$
|f(x-y)g(y)|
=\bigl(|f(x-y)|^p|g(y)|^r\bigr)^{1/q}
|f(x-y)|^{1-p/q}|g(y)|^{1-r/q}
$$

と分けます。三因子のHölder指数の逆数は $1/q$、$1/p-1/q$、$1/r-1/q$ であり、その和は $1$ です。指数が零の因子は定数1として扱います。従って

$$
|f*g(x)|
\le\left(\int|f(x-y)|^p|g(y)|^r\,dy\right)^{1/q}
\|f\|_p^{1-p/q}\|g\|_r^{1-r/q}.
$$

$q$ 乗して $x$ で積分し、非負積分なのでTonelliで順序を交換すると

$$
\begin{aligned}
\|f*g\|_q^q
&\le\|f\|_p^{q-p}\|g\|_r^{q-r}
\iint|f(x-y)|^p|g(y)|^r\,dy\,dx\\
&=\|f\|_p^{q-p}\|g\|_r^{q-r}
\|f\|_p^p\|g\|_r^r
=\|f\|_p^q\|g\|_r^q.
\end{aligned}
$$

$q$ 乗根を取って結論となります。
<!-- proof-end -->

<a id="thm-ha8-bernstein"></a>
<!-- formal-statement-start -->
> **定理（周波数局在のBernstein不等式）**  
> $d\ge1$、$A>0$、$j\in\mathbb Z$、$1\le p\le q\le\infty$、$\beta\in\mathbb N_0^d$ とする。$f\in\mathcal S(\mathbb R^d)$ のFourier変換の台が $\{|\xi|\le A2^j\}$ に含まれるなら
>
$$
\|\partial^\beta f\|_q
\le C_{A,d,\beta,p,q}\,
2^{j(|\beta|+d(1/p-1/q))}\|f\|_p.
$$
>
> ここで $1/\infty=0$ とする。また滑らかな射影 $\Delta_jf$ に対しては、入力が $L^p$ のみであっても畳み込みにより同じ型の評価が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

入力周波数の台上で1となる滑らかなcutoffを掛けます。導関数はFourier側で $(i\xi)^\beta$ を掛ける操作なので、新しい畳み込み核を逆変換で作ります。その核の $L^r$ ノルムを伸縮で計算し、[Schwartz核の畳み込み評価](#lem-ha8-young)の指数を合わせます。

<!-- proof-start -->
### 証明

$\eta\in C_c^\infty(\mathbb R^d)$ を $|\xi|\le A$ で1、$|\xi|\ge2A$ で0とします。$f$ のFourier台上で $\eta(2^{-j}\xi)=1$ です。$h_\beta=\mathcal F^{-1}[(i\xi)^\beta\eta(\xi)]$ はSchwartz関数で、尺度変換すると

$$
\mathcal F^{-1}[(i\xi)^\beta\eta(2^{-j}\xi)](x)
=2^{j(d+|\beta|)}h_\beta(2^jx)=:H_{j,\beta}(x).
$$

従って $\partial^\beta f=H_{j,\beta}*f$ です。$1+1/q=1/p+1/r$ となる $r\in[1,\infty]$ を選びます。$p\le q$ なので $1/r=1+1/q-1/p$ は $[0,1]$ に入り、選択できます。核のノルムを $u=2^jx$ で計算すれば

$$
\begin{aligned}
\|H_{j,\beta}\|_r
&=2^{j(d+|\beta|)}2^{-jd/r}\|h_\beta\|_r\\
&=2^{j(|\beta|+d(1-1/r))}\|h_\beta\|_r\\
&=2^{j(|\beta|+d(1/p-1/q))}\|h_\beta\|_r.
\end{aligned}
$$

$r=\infty$ でも同じ式を本質的上限で読めます。[上の補題](#lem-ha8-young)を用いると

$$
\|\partial^\beta f\|_q
\le\|H_{j,\beta}\|_r\|f\|_p
\le C\,2^{j(|\beta|+d(1/p-1/q))}\|f\|_p.
$$

一般の $f\in L^p$ に対する帯域射影 $\Delta_jf$ も $L^1$ 核との畳み込みとして存在します。$\eta$ を $\operatorname{supp}\psi$ 上で1に選べば、$\partial^\beta\Delta_jf=H_{j,\beta}*\Delta_jf$ が核の畳み込みの恒等式として成立し、上のYoung評価を直接適用できます。
<!-- proof-end -->

$\Delta_j f$ の周波数台は $|\xi|\le2^{j+1}$ に含まれます。定理で $A=2$ として

$$
\|\partial^\beta\Delta_jf\|_q
\le C\,2^{j(|\beta|+d(1/p-1/q))}\|\Delta_jf\|_p
\qquad(j\ge1).
$$

低周波 $\Delta_0f$ には $j=0$ を使います。$p=q=2$、$|\beta|=1$ なら係数は $2^j$、$|\beta|=2$ なら $2^{2j}$ です。周波数を二倍にすると一次微分の大きさは二倍、二次微分は四倍となります。

## 6. Sobolev正則性と斉次分解の限界

Sobolev正則性は微分の大きさを周波数ごとに重み付けして測れます。ここでは $L^2$ に限れば、前節までのPlancherelだけで分解表示を正確に証明できます。$L^p$ における一般の微分作用素との同値は乗数定理の追加が要るため、後続のHA9で扱います。

<a id="cor-ha8-sobolev"></a>
<!-- formal-statement-start -->
> **系（L2 Sobolevノルムのdyadic表示）**  
> $s\in\mathbb R$ とし、Fourier変換の意味で
>
$$
\|f\|_{H^s}^2=(2\pi)^{-d}
\int_{\mathbb R^d}(1+|\xi|^2)^s|\widehat f(\xi)|^2\,d\xi
$$
>
> が有限な $f\in L^2(\mathbb R^d)$ を考える。次の量は同じ収束・発散を持ち、有限の場合は正の定数倍の範囲で互いに評価できる。
>
$$
\|f\|_{H^s}^2\asymp
\|\Delta_0 f\|_2^2+\sum_{j=1}^\infty
2^{2js}\|\Delta_j f\|_2^2.
$$
>
> 比較定数は $d,s,\varphi$ に依存するが $f$ には依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

$\psi_j$ が零でない場所では $|\xi|$ が $2^j$ の定数倍です。従って各帯域の重み $2^{2js}$ は $(1+|\xi|^2)^s$ と比較できます。これを周波数ごとの非負分割に掛け、Plancherelで積分します。

<!-- proof-start -->
### 証明

$j\ge1$ かつ $\psi_j(\xi)\ne0$ なら $2^{j-1}<|\xi|<2^{j+1}$ です。この範囲では

$$
c_s 2^{2js}\le(1+|\xi|^2)^s
\le C_s2^{2js}
$$

となります。$s<0$ の場合は不等号の向きに注意し、上下の定数を交換して取れば同じ比較形です。$j=0$ かつ $\varphi(\xi)\ne0$ なら $|\xi|<2$ なので $(1+|\xi|^2)^s$ は1の定数倍の範囲に入ります。

また [平方関数定理](#thm-ha8-l2)の証明から、各 $\xi$ で

$$
\frac14\le\varphi(\xi)^2+\sum_{j\ge1}\psi_j(\xi)^2\le1.
$$

よって以上の重み比較を掛け合わせると、ある $a_s,b_s>0$ について

$$
a_s(1+|\xi|^2)^s
\le\varphi(\xi)^2+\sum_{j\ge1}2^{2js}\psi_j(\xi)^2
\le b_s(1+|\xi|^2)^s.
$$

両辺に $(2\pi)^{-d}|\widehat f(\xi)|^2$ を掛けて積分し、非負和はTonelliで交換します。[Plancherel](../../FOU/FOU4/index.md#thm-fou4-plancherel-core)から右辺の中央の積分は $\|\Delta_0f\|_2^2+\sum 2^{2js}\|\Delta_jf\|_2^2$ に一致します。
<!-- proof-end -->

**斉次分解で消えるもの。**　$1$ は $L^2(\mathbb R^d)$ には属しませんが、核がSchwartzなので各 $\dot\Delta_j1$ は畳み込みとして計算できます。

$$
\dot\Delta_j1(x)=\int_{\mathbb R^d}K_j(y)\,dy
=\psi_j(0)=0.
$$

一般の多項式 $P$ に対しても $P(x-y)$ を $y$ の多項式として展開し、各係数の[モーメント](../../F0/F0-00P2A/index.md#def-f0-00p2a-moment)

$$
\int_{\mathbb R^d}y^\alpha K_j(y)\,dy
=i^{|\alpha|}(\partial^\alpha\psi_j)(0)=0
$$

を使うと $\dot\Delta_jP=0$ です。$\psi_j$ は原点の近傍で恒等的に零なので、すべての導関数が原点で零であることが根拠です。従って斉次分解だけから一般の関数・分布を一意に復元できるわけではありません。$L^2$ の場合は零周波数が測度零で多項式も非零の $L^2$ 元にはならないため、[再構成命題](#prop-ha8-decomposition)と矛盾しません。

## 7. 演習と詳細解答

最初に分割・尺度を直接計算し、次に符号と核の評価を独立に再現します。最後に $L^p$ の平方関数とBernstein・Sobolev評価を一つの入力で接続します。

<a id="ex-ha8-a01"></a>
**演習 HA8-A01（望遠和）**  
- Level: A

$\psi_j(\xi)=\varphi(2^{-j}\xi)-\varphi(2^{1-j}\xi)$ とする。$\sum_{j=1}^M\psi_j$ と $\sum_{j=-N}^M\psi_j$ をそれぞれ二つの $\varphi$ の差で表せ。$\xi=0$ で斉次和の極限を確かめよ。

<!-- solution-start -->
**詳細解答**　途中の $\varphi(2^{1-j}\xi)$ は次の添字 $j-1$ の正項と打ち消し合います。従って

$$
\sum_{j=1}^M\psi_j(\xi)
=\varphi(2^{-M}\xi)-\varphi(\xi),
$$

$$
\sum_{j=-N}^M\psi_j(\xi)
=\varphi(2^{-M}\xi)-\varphi(2^{N+1}\xi).
$$

$\xi=0$ なら両方の $\varphi$ の値は1なので、斉次和はすべての $N,M$ で零です。$\xi\ne0$ なら $N,M\to\infty$ でそれぞれ1と0になり、和は1です。[分割の定義](#def-ha8-dyadic)がなぜ原点を除外するかが確認できます。
<!-- solution-end -->

<a id="ex-ha8-a02"></a>
**演習 HA8-A02（畳み込み核の伸縮）**  
- Level: A

$\check\psi=\mathcal F^{-1}\psi$ とする。$\psi(2^{-j}\xi)$ の逆Fourier変換とその $L^1$ ノルムを計算し、積分が零であることを示せ。

<!-- solution-start -->
**詳細解答**　$\xi=2^j\eta$ と変数変換すると

$$
\begin{aligned}
K_j(x)&=(2\pi)^{-d}\int e^{ix\cdot\xi}\psi(2^{-j}\xi)\,d\xi\\
&=2^{jd}(2\pi)^{-d}\int e^{i(2^jx)\cdot\eta}\psi(\eta)\,d\eta
=2^{jd}\check\psi(2^jx).
\end{aligned}
$$

さらに $u=2^jx$ として

$$
\|K_j\|_1=\int 2^{jd}|\check\psi(2^jx)|\,dx
=\int|\check\psi(u)|\,du=\|\check\psi\|_1.
$$

逆変換とFourier変換の零点の関係から $\int K_j=\psi(0)=\varphi(0)-\varphi(0)=0$ です。
<!-- solution-end -->

<a id="ex-ha8-a03"></a>
**演習 HA8-A03（二乗和の下限）**  
- Level: A

非負数 $a_1,\ldots,a_m$ が和1であるとき $\sum a_k^2\ge1/m$ を証明し、非斉次周波数分割へ適用せよ。

<!-- solution-start -->
**詳細解答**　有限次元のCauchy–Schwarzから

$$
1=\left(\sum_{k=1}^m a_k\right)^2
\le\left(\sum_{k=1}^m1^2\right)\left(\sum_{k=1}^m a_k^2\right)
=m\sum_{k=1}^m a_k^2.
$$

従って $\sum a_k^2\ge1/m$ です。[dyadic分割](#def-ha8-dyadic)では各 $\xi$ で非零cutoffが高々4個なので、$m\le4$ とし $\varphi^2+\sum_{j\ge1}\psi_j^2\ge1/4$ です。これは[平方関数定理](#thm-ha8-l2)の下限の核心です。
<!-- solution-end -->

<a id="ex-ha8-a04"></a>
**演習 HA8-A04（一次・二次微分）**  
- Level: A

$d=3$、$p=2$、$q=6$ のとき $\Delta_jf$ の $L^q$ ノルムと一次微分の $L^q$ ノルムを $\|\Delta_jf\|_2$ で評価せよ。$j\ge1$ とする。

<!-- solution-start -->
**詳細解答**　[Bernstein不等式](#thm-ha8-bernstein)の指数は

$$
d(1/p-1/q)=3(1/2-1/6)=1
$$

です。$\beta=0$ なら

$$
\|\Delta_jf\|_6\le C2^j\|\Delta_jf\|_2.
$$

一次導関数 $\partial_{x_k}$ なら $|\beta|=1$ を加えて

$$
\|\partial_{x_k}\Delta_jf\|_6
\le C2^{2j}\|\Delta_jf\|_2.
$$

比較係数の差は周波数半径一個分であり、単なる次元の違いではありません。
<!-- solution-end -->

<a id="ex-ha8-a05"></a>
**演習 HA8-A05（多項式が消える仕組み）**  
- Level: A

$d=1$、$P(x)=3x^2+2x+1$ とする。$\int K_j=0$、$\int yK_j(y)\,dy=0$、$\int y^2K_j(y)\,dy=0$ を使い、$\dot\Delta_jP(x)=0$ を直接計算せよ。

<!-- solution-start -->
**詳細解答**　まず

$$
P(x-y)=3x^2+2x+1-(6x+2)y+3y^2
$$

です。従って

$$
\begin{aligned}
\dot\Delta_jP(x)
&=(3x^2+2x+1)\int K_j(y)\,dy\\
&\quad-(6x+2)\int yK_j(y)\,dy+3\int y^2K_j(y)\,dy=0.
\end{aligned}
$$

三つのモーメントが零なのは $\psi_j$ が原点近傍で零で、零点での0階・1階・2階微分がすべて零だからです。斉次分解は多項式を見分けられないことが直接確認できます。
<!-- solution-end -->

<a id="ex-ha8-b01"></a>
**演習 HA8-B01（有限符号平均の四乗）**  
- Level: B

独立な二つのRademacher符号 $\varepsilon_1,\varepsilon_2$ と実数 $a,b$ について、$\mathbb E|\varepsilon_1 a+\varepsilon_2b|^2$ および四乗平均を直接計算せよ。一般の[符号補題](#lem-ha8-khintchine)の四乗の上限と比較せよ。

<!-- solution-start -->
**詳細解答**　$X=\varepsilon_1a+\varepsilon_2b$ とすると $X^2=a^2+b^2+2\varepsilon_1\varepsilon_2ab$ なので

$$
\mathbb EX^2=a^2+b^2.
$$

さらに二乗すると

$$
X^4=(a^2+b^2)^2+4(a^2+b^2)\varepsilon_1\varepsilon_2ab+4a^2b^2.
$$

[期待値](../../F0/F0-00P2A/index.md#def-f0-00p2a-expectation)の定義と独立な符号の組合せから符号の積の期待値は零だから

$$
\mathbb EX^4=a^4+6a^2b^2+b^4
\le3(a^2+b^2)^2.
$$

実際、差は $3(a^2+b^2)^2-(a^4+6a^2b^2+b^4)=2a^4+2b^4\ge0$ です。四乗の一様上限が $m=2$ でも成り立ちます。
<!-- solution-end -->

<a id="ex-ha8-b02"></a>
**演習 HA8-B02（CZ核の二つの尺度）**  
- Level: B

$\kappa\in\mathcal S(\mathbb R^d)$、$N>d+1$ とする。$\sum_{j\ge1}2^{jd}(1+2^j|x|)^{-N}\le C|x|^{-d}$（$x\ne0$）を $2^j|x|\le1$ と $>1$ に分けて証明せよ。微分核に必要な $N$ の条件も述べよ。

<!-- solution-start -->
**詳細解答**　$r=|x|$ とし、$2^Jr\le1<2^{J+1}r$ を満たす整数 $J$ を取ります。低い側は集合を全整数 $j\le J$ に広げると

$$
\sum_{\substack{j\ge1\\j\le J}}2^{jd}
\le\sum_{j\le J}2^{jd}
=\frac{2^{Jd}}{1-2^{-d}}
\le\frac{r^{-d}}{1-2^{-d}}.
$$

高い側は $N>d$ なので

$$
\begin{aligned}
\sum_{\substack{j\ge1\\j\ge J+1}}2^{jd}(2^jr)^{-N}
&\le r^{-N}\sum_{j\ge J+1}2^{j(d-N)}\\
&=\frac{r^{-N}2^{(J+1)(d-N)}}{1-2^{d-N}}
\le C_{d,N}r^{-d}.
\end{aligned}
$$

最後は $2^{J+1}r$ が1と2の間にあることを使います。勾配核は $2^{j(d+1)}$ を持つので $N>d+1$ が必要です。[一様CZ補題](#lem-ha8-uniform-cz)の核心計算を再現しました。
<!-- solution-end -->

<a id="ex-ha8-b03"></a>
**演習 HA8-B03（双対を使う理由）**  
- Level: B

$f,g\in\mathcal S$ とし、$\widetilde\psi_j=1$ が $\psi_j$ の台上で成り立つ補助乗数を用いる。$\int f\overline g=\sum_j\int\Delta_jf\,\overline{\widetilde\Delta_jg}$ をFourier側で説明し、$L^p$ 平方関数の下界へ至る三つの不等式を示せ。

<!-- solution-start -->
**詳細解答**　[再構成命題](#prop-ha8-decomposition)とPlancherelにより

$$
\begin{aligned}
\sum_j\int\Delta_jf\,\overline{\widetilde\Delta_jg}
&=(2\pi)^{-d}\int
\sum_j\psi_j(\xi)\widetilde\psi_j(\xi)
\widehat f(\xi)\overline{\widehat g(\xi)}\,d\xi\\
&=(2\pi)^{-d}\int\widehat f\overline{\widehat g}\,d\xi
=\int f\overline g\,dx.
\end{aligned}
$$

二番目の等号では $\psi_j\widetilde\psi_j=\psi_j$ と $\sum_j\psi_j=1$ を使います。次に、各点でCauchy–Schwarz、その後空間でHölder、最後に補助射影の平方関数上界を使って

$$
\begin{aligned}
\left|\int f\overline g\right|
&\le\int Sf\left(\sum_j|\widetilde\Delta_jg|^2\right)^{1/2}\\
&\le\|Sf\|_p\left\|\left(\sum_j|\widetilde\Delta_jg|^2\right)^{1/2}\right\|_{p'}\\
&\le C\|Sf\|_p\|g\|_{p'}.
\end{aligned}
$$

[MT7の双対定理](../../MT/MT7/index.md#thm-mt7-lp-duality)で $\|g\|_{p'}\le1$ の上限を取れば $\|f\|_p\le C\|Sf\|_p$ です。
<!-- solution-end -->

<a id="ex-ha8-b04"></a>
**演習 HA8-B04（Sobolev重みと端点）**  
- Level: B

$s=-1$、$d=2$ とする。$j\ge2$ で $\psi_j(\xi)\ne0$ なら $(1+|\xi|^2)^{-1}$ が $2^{-2j}$ の正の定数倍の範囲に入ることを示せ。また $p=1$ で $L^p$ 平方関数定理を本章の証明から主張できない理由を述べよ。

<!-- solution-start -->
**詳細解答**　$2^{j-1}<|\xi|<2^{j+1}$ だから

$$
1+2^{2j-2}<1+|\xi|^2<1+2^{2j+2}.
$$

逆数を取ると

$$
\frac1{1+2^{2j+2}}<(1+|\xi|^2)^{-1}
<\frac1{1+2^{2j-2}}.
$$

$j\ge2$ では左辺は $2^{-2j}/5$ 以上、右辺は $4\cdot2^{-2j}$ 以下と評価できます。従って[dyadic Sobolev表示](#cor-ha8-sobolev)の各帯域で比較できます。$p=1$ については[HA5の強型CZ定理](../HA5/index.md#thm-ha5-stronglp)が $1<p<\infty$ でしか成立せず、符号付き作用素の一様強型 $(1,1)$ を本証明から得られないため、$L^1$ 平方関数定理を付け加えることはできません。
<!-- solution-end -->

<a id="ex-ha8-c01"></a>
**演習 HA8-C01（周波数局在から正則性まで）**  
- Level: C

$d=3$、$f\in\mathcal S(\mathbb R^3)$ とする。以下を順に証明せよ。

1. 非斉次射影の周波数台と畳み込み核を記述し、$\sum_{j\ge0}\Delta_jf=f$ が $L^2$ で成立することを示せ。
2. $1<p<\infty$ に対して $\|Sf\|_p\le C\|f\|_p$ を得るために必要な符号付き作用素の $L^2$ 評価と核の二つの評価を明示し、適用する既出定理の仮定を点検せよ。
3. $j\ge1$、$p=2$、$q=6$ のとき $\|\nabla\Delta_jf\|_6$ を $\|\Delta_jf\|_2$ で評価せよ。
4. $s=1$ の場合に $\sum_{j\ge1}2^{2j}\|\Delta_jf\|_2^2+\|\Delta_0f\|_2^2$ が $\|f\|_{H^1}^2$ と同等である理由を周波数ごとに示し、定数関数へ斉次分解を適用すると何が起きるか説明せよ。

<!-- solution-start -->
**詳細解答**

**1.** [射影の定義](#def-ha8-projection)より、$\operatorname{supp}\widehat{\Delta_j f}$ は $2^{j-1}\le|\xi|\le2^{j+1}$（$j\ge1$）の中にあります。$\Delta_0$ の台は $|\xi|\le2$ です。$K_j(x)=2^{3j}\check\psi(2^jx)$、$\Delta_jf=K_j*f$ です。望遠和から有限部分和の乗数は $\varphi(2^{-M}\xi)$ であり、

$$
\left\|f-\sum_{j=0}^M\Delta_jf\right\|_2^2
=(2\pi)^{-3}\int|1-\varphi(2^{-M}\xi)|^2|\widehat f(\xi)|^2\,d\xi\to0
$$

です。積分は $4|\widehat f|^2$ で支配されます。

**2.** [一様CZ補題](#lem-ha8-uniform-cz)の乗数は有限重複なので $\|T_{\varepsilon,F}\|_{2\to2}\le4$。その核は $k_{\varepsilon,F}=\sum_{j\in F}\varepsilon_jK_j$（$j=0$ は $\check\varphi$）であり、$\kappa=\check\psi$ のSchwartz減衰を $2^j|x|\le1$ と $>1$ に分けて和を取れば

$$
|k_{\varepsilon,F}(x)|\le C|x|^{-3},\qquad
|\nabla k_{\varepsilon,F}(x)|\le C|x|^{-4}
\quad(x\ne0)
$$

です。二つ目の勾配評価を平均値の積分へ代入すれば標準核の両変数の滑らかさ（$\delta=1$）が出ます。有限核との畳み込みは台外積分表示も持つので、[HA5の強型定理](../HA5/index.md#thm-ha5-stronglp)を適用できます。その結果 $\|T_{\varepsilon,F}f\|_p\le C_p\|f\|_p$ は符号に依存しません。[Khintchine型補題](#lem-ha8-khintchine)を各点で $a_j=\Delta_jf(x)$ に適用し、有限平均を積分してから単調極限を取ると $\|Sf\|_p\le C_p'\|f\|_p$ となります。

**3.** [Bernstein不等式](#thm-ha8-bernstein)を $|\beta|=1$、$d=3$、$p=2$、$q=6$、$A=2$ で使います。指数は

$$
|\beta|+d(1/p-1/q)=1+3(1/2-1/6)=2.
$$

従って各成分で $\|\partial_{x_k}\Delta_jf\|_6\le C2^{2j}\|\Delta_jf\|_2$。三成分を足すと $\|\nabla\Delta_jf\|_6\le C'2^{2j}\|\Delta_jf\|_2$ です。

**4.**　周波数帯 $\psi_j\ne0$ では $2^{j-1}\le|\xi|\le2^{j+1}$ より $(1+|\xi|^2)\asymp2^{2j}$、低周波 $\varphi\ne0$ では $(1+|\xi|^2)\asymp1$ です。さらに[平方関数の証明](#thm-ha8-l2)の二乗和は周波数ごとに $1/4$ 以上1以下なので、これを掛けて積分しPlancherelにより

$$
\|f\|_{H^1}^2\asymp\|\Delta_0 f\|_2^2+
\sum_{j\ge1}2^{2j}\|\Delta_jf\|_2^2.
$$

一方、定数 $1$ に対して各高周波核の積分は零なので $\dot\Delta_j1=0$（全整数 $j$）。斉次分解は定数の情報を失い、非斉次分解では $\Delta_0 1=1$ が保持されます。
<!-- solution-end -->

## 8. 次のFourier乗数へ

各周波数帯の核の減衰と重複数を確認すると、特異な乗数でも $L^p$ で制御できる場合があります。次章HA9では、任意の乗数 $m(\xi)$ の微分の大きさを仮定して同種の核評価を構成し、Mikhlin–Hörmander型の定理を証明します。ここで扱った滑らかなcutoffの結果だけから、任意の不連続乗数へ一般化してはいけません。
