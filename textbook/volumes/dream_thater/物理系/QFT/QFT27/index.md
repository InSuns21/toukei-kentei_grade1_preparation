# QFT27 赤外発散・軟光子と包摂的観測量

[QFT17のQED頂点](../QFT17/index.md#def-qft17-vertex)で電子の散乱振幅を計算できるようになりました。しかし、そのまま「光子を一つも出さない散乱」の確率を高次まで計算すると、光子のエネルギーが零へ近づく領域で対数発散が現れます。光子が非常に軟らかければ、有限の分解能を持つ検出器はその有無を区別できません。**区別できない終状態の確率を足してから極限を取る**と何が変わるのでしょうか。

この講義では質量が正の荷電外線と十分軟らかい光子を扱い、放出振幅の先頭項、軟光子積分の係数、仮想・実放射の相殺を実際に計算します。相殺は赤外での**同じ特異な寄与**についての主張であり、任意の有限な断面積の全補正を求める公式ではありません。

計量は $\eta=\operatorname{diag}(1,-1,-1,-1)$、単位系は $\hbar=c=1$ とし、微細構造定数を $\alpha=e^2/(4\pi)$ とします。

硬い過程の特性エネルギーを $E$、光子を見分ける分解能を $\Delta$、赤外側の共通カットオフを $\lambda$ とします。以下の範囲を考えます。

$$
0<\lambda<\Delta\ll E.
$$

ここで $\lambda$ は**光子の質量ではなく、先頭の軟領域のエネルギー積分を切る補助下限**です。仮想側も同じ赤外規約で比較し、カットオフ独立の有限項までこの簡略な規約で決定したとはみなしません。荷電粒子の質量はすべて正とし、共線発散は最後に別に検討します。

## 1. 光子が軟らかいほど放出はどう変わるか

硬い散乱過程の振幅を $\mathcal M_0$ とし、各外線の四元運動量を $p_i^2=m_i^2>0$、エネルギーを $p_i^0>0$、符号付き電荷を $q_i$ とします。外線が入射なら $\eta_i=-1$、出射なら $\eta_i=+1$ と書き、電荷保存 $\sum_i\eta_iq_i=0$ を仮定します。ここで硬い過程は赤外補助カットオフを固定して切り出した振幅であり、厳密なQEDの裸の荷電Fock状態に対して赤外極限まで存在するS行列を仮定しているわけではありません。

放出する光子の運動量を $k^\mu=\omega(1,\boldsymbol n)$、$\omega>0$、$|\boldsymbol n|=1$ とします。軟光子とは $\omega/E$ が小さい光子です。荷電外線が光子を放出する図では、外線に隣接する伝播核の分母に $2p_i\cdot k$ が現れるため、振幅の先頭には $1/\omega$ が現れます。

<a id="def-qft27-soft-current"></a>

<!-- formal-statement-start -->
> **定義（外線の軟光子電流）**  
> 質量 $m_i>0$、正エネルギーの質量殻運動量 $p_i$ を持つ有限本の荷電外線について、入射に $\eta_i=-1$、出射に $\eta_i=+1$、符号付き電荷に $q_i$ を用いる。$k=\omega(1,\boldsymbol n)$、$\omega>0$ に対して

$$
J^\mu(k)=\sum_i\eta_iq_i\frac{p_i^\mu}{p_i\cdot k},
\qquad
H^\mu(\boldsymbol n)=\omega J^\mu(k)
=\sum_i\eta_iq_i\frac{p_i^\mu}{p_i\cdot\widehat k},
\quad \widehat k=(1,\boldsymbol n)
$$

> をそれぞれ**軟光子電流**、その角度依存部分とする。$p_i\cdot k=\omega p_i^0(1-\boldsymbol v_i\cdot\boldsymbol n)>0$、$\boldsymbol v_i=\boldsymbol p_i/p_i^0$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft27-soft-current -->
### 例：同じ電荷が方向を変えた場合

**定義の確認**：一つの荷電粒子が運動量 $p$ で入射し、同じ符号付き電荷 $q$ を保って $p'$ で出射するとします。外線は二本で $\eta_{\mathrm{in}}=-1,\eta_{\mathrm{out}}=+1$ です。従って

$$
J^\mu(k)=q\left(\frac{p'^\mu}{p'\cdot k}
-\frac{p^\mu}{p\cdot k}\right),
\qquad
k_\mu J^\mu=q(1-1)=0.
$$

質量が正なら $|\boldsymbol v|<1$ なので、どの放出方向でも分母は零になりません。$p'=p$ なら電流全体が零です。逆に方向が変わると一般に零ではなく、外線が加速される散乱で軟放射が生じることを示唆します。
<!-- definition-example-end -->

<a id="thm-qft27-soft-factor"></a>

<!-- formal-statement-start -->
> **定理（質量を持つ外線からの軟光子放出因子）**  
> QEDの摂動的な硬い過程が、正の質量を持つ有限本の荷電外線 $p_i$ と電荷 $q_i$ を持ち、全体として電荷が保存され、外線に付けた光子以外の部分が $k\to0$ で正則とする。[軟光子電流](#def-qft27-soft-current)を使い、光子の物理偏極を $\varepsilon^\mu_\sigma(k)$ とすると、放出振幅の先頭項は

$$
\mathcal M_{\gamma,\sigma}(k)
=\bigl[J(k)\cdot\varepsilon_\sigma^*(k)\bigr]\mathcal M_0
+O(\omega^0).
$$

> 電荷保存の下で $k\cdot J(k)=0$ であり、偏極の $\varepsilon_\sigma\mapsto\varepsilon_\sigma+c\,k$ という変更は先頭項を変えない。誤差項は硬い運動量を固定した軟極限での振幅次数を表す。
<!-- formal-statement-end -->

### 証明の見取り図

出射フェルミオン外線に光子を付けると、内部伝播核は $(p+k)^2-m^2=2p\cdot k$ を持ちます。分子の $\not p+m$ を質量殻のDirac方程式で簡約すると $2p\cdot\varepsilon$ が残ります。入射外線は符号が逆になり、全線を足すと $J$ になります。

<!-- proof-start -->
### 証明

出射Dirac外線一本の寄与を、硬い部分を $\mathcal A$ と書いて考えます。[QFT17の頂点](../QFT17/index.md#def-qft17-vertex)と自由伝播核により、結合定数の全体位相を除く軟極限の特異項は

$$
q\,\bar u(p)\gamma^\mu
\frac{\not p+\not k+m}{(p+k)^2-m^2}\mathcal A\,
\varepsilon_\mu^*(k).
$$

質量殻 $p^2=m^2$ と $k^2=0$ から分母は $2p\cdot k$。さらに $\bar u(p)(\not p-m)=0$ と $\{\gamma^\mu,\gamma^\nu\}=2\eta^{\mu\nu}$ により

$$
\bar u(p)\gamma^\mu(\not p+m)
=\bar u(p)(2p^\mu-\not p\gamma^\mu+m\gamma^\mu)
=2p^\mu\bar u(p).
$$

$\not k$ を含む分子は $O(\omega)$ で、$p\cdot k=O(\omega)$ で割ると $O(1)$ です。先頭項は $q\,p\cdot\varepsilon^*/(p\cdot k)$ 倍となります。入射外線の場合は隣接する線の運動量が $p-k$ なので分母は $-2p\cdot k$ となり、同じ計算で符号が逆です。反粒子を含む場合は符号付き電荷 $q_i$ を使います。仮定より内部線等への放出は $O(1)$ です。各外線の先頭項を合計すると主張する因子になります。

最後に $k_\mu J^\mu=\sum_i\eta_iq_i(p_i\cdot k)/(p_i\cdot k)=\sum_i\eta_iq_i=0$。従って偏極に $c\,k$ を加えても先頭項は不変です。これは[QFT18の外線Ward恒等式](../QFT18/index.md#prop-qft18-polarization-shift)と整合します。
<!-- proof-end -->

外線からの放出が特異なのは、質量殻に近い伝播核が長い距離の効果を拾うためです。正の質量があるので $p_i\cdot\widehat k>0$ ですが、エネルギー積分の $d\omega/\omega$ はまだ残ります。

## 2. 軟光子の個数に対数が現れる

[QFT12の正エネルギー位相空間](../QFT12/index.md#def-qft12-phase-space)に従い、一つの光子の積分要素は $d^3k/((2\pi)^3 2\omega)$ です。軟極限では硬い過程の位相空間と振幅を先頭次数で固定できると仮定します。偏極和は電荷保存を使うと

$$
\sum_{\sigma=1}^2|H(\boldsymbol n)\cdot\varepsilon_\sigma|^2
=-H_\mu(\boldsymbol n)H^\mu(\boldsymbol n)\ge0
$$

と書けます。これは[QFT15の二物理偏極](../QFT15/index.md#thm-qft15-two-polarizations)を使い、$H\cdot\widehat k=0$ によってゲージ依存項を落としたものです。

<a id="def-qft27-angular-coefficient"></a>

<!-- formal-statement-start -->
> **定義（軟放射の角度係数と平均個数）**  
> 電荷保存 $\sum_i\eta_iq_i=0$ を満たす正質量の荷電外線について、[軟電流の角度部分](#def-qft27-soft-current)を $H(\boldsymbol n)$ とする。有限で非負の角度係数 $B$ と、エネルギー帯域 $0<a<b\ll E$ における先頭軟放射の平均個数 $N(a,b)$ を

$$
B=\frac1{2(2\pi)^3}\int_{S^2}d\Omega\,
\bigl[-H(\boldsymbol n)^2\bigr],
\qquad
N(a,b)=B\log\frac ba
$$

> で定める。角度積分の測度は通常の立体角 $d\Omega$ で、同種光子の多重放出には $1/n!$ を付ける。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft27-angular-coefficient -->
### 例：方向を変えない荷電粒子

**定義の確認**：前節の一入射・一出射模型で $p'=p$ なら $H(\boldsymbol n)=0$ です。従って任意の $\boldsymbol n$ で $-H^2=0$、$B=0$、$N(a,b)=0$ です。これは光子が全く生成されないあらゆる過程を主張するのではなく、**外線の先頭軟因子**の消滅を確認しています。
<!-- definition-example-end -->

<a id="prop-qft27-soft-log"></a>

<!-- formal-statement-start -->
> **命題（軟光子位相空間の対数）**  
> 質量の正の外線と電荷保存を仮定し、$0<a<b\ll E$ で硬い振幅と運動学を先頭軟次数に固定する。[角度係数 $B$](#def-qft27-angular-coefficient)を用いると、一個の軟光子放出による硬い過程の確率に対する比の特異な先頭項は

$$
\int_{a<|\boldsymbol k|<b}
\frac{d^3k}{(2\pi)^3\,2|\boldsymbol k|}
\sum_\sigma|J(k)\cdot\varepsilon_\sigma|^2
=B\log\frac ba.
$$

> $a\downarrow0$ で $B>0$ なら対数発散する。この式は先頭軟因子の積分であり、硬い光子の領域や有限の $O(\omega^0)$ 振幅との干渉による項を含まない。
<!-- formal-statement-end -->

### 証明の見取り図

$d^3k=\omega^2d\omega\,d\Omega$、$J=H/\omega$ と置くと、測度の $\omega$ と振幅二乗の $\omega^{-2}$ が合わさって $d\omega/\omega$ になります。

<!-- proof-start -->
### 証明

定義に従い $\boldsymbol k=\omega\boldsymbol n$ と変換すると

$$
\begin{aligned}
&\int_a^b\frac{\omega^2d\omega}{(2\pi)^3\,2\omega}
\int d\Omega\sum_\sigma
\left|\frac{H\cdot\varepsilon_\sigma}{\omega}\right|^2\\
&=\int_a^b\frac{d\omega}{\omega}\,
\frac1{2(2\pi)^3}\int d\Omega\,(-H^2)
=B[\log\omega]_{a}^{b}
=B\log(b/a).
\end{aligned}
$$

正質量から $1-\boldsymbol v_i\cdot\boldsymbol n\ge1-|\boldsymbol v_i|>0$ なので角度積分は有限です。$B>0$ なら下端の対数だけが発散します。
<!-- proof-end -->

特に一つの粒子が散乱で運動量を $p\to p'$ に変える場合、両者の相対的な速さを $0\le\beta<1$、相対ラピディティを $\chi=\operatorname{artanh}\beta$ とします。等質量 $m>0$ で $p\cdot p'/m^2=\cosh\chi$ です。

<a id="prop-qft27-deflection-coefficient"></a>

<!-- formal-statement-start -->
> **命題（一荷電粒子の方向転換と角度係数）**  
> 符号付き電荷 $q$ と質量 $m>0$ の粒子の外線が $p$ から $p'$ へ変化し、$p^2=p'^2=m^2$、$p^0,p'^0>0$、$\eta_{\rm in}=-1,\eta_{\rm out}=+1$ とする。$\cosh\chi=p\cdot p'/m^2$、$\beta=\tanh\chi$ と置くと、[角度係数](#def-qft27-angular-coefficient)は

$$
B=\frac{q^2}{2\pi^2}(\chi\coth\chi-1)
=\frac{q^2}{2\pi^2}
\left(\frac{\operatorname{artanh}\beta}{\beta}-1\right).
$$

> $\beta=0$ では連続極限で $B=0$ とする。$q=e$ なら $B=(2\alpha/\pi)(\chi\coth\chi-1)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

入射粒子の静止系で $p=(m,\boldsymbol0)$、$p'=m\gamma(1,0,0,\beta)$ を選びます。角度積分の自己項は各 $4\pi$、交差項は $4\pi\operatorname{artanh}\beta/\beta$ です。

<!-- proof-start -->
### 証明

$\widehat k=(1,\boldsymbol n)$、$u=\cos\theta$ とすると $p\cdot\widehat k=m$、$p'\cdot\widehat k=m\gamma(1-\beta u)$。従って

$$
-H^2=q^2\left[
\frac{2}{1-\beta u}-1
-\frac{1-\beta^2}{(1-\beta u)^2}
\right].
$$

二つの積分を評価すると

$$
\begin{aligned}
\int_{S^2}\frac{d\Omega}{1-\beta u}
&=2\pi\int_{-1}^{1}\frac{du}{1-\beta u}
=\frac{4\pi}{\beta}\operatorname{artanh}\beta,\\
\int_{S^2}\frac{(1-\beta^2)d\Omega}{(1-\beta u)^2}
&=2\pi(1-\beta^2)
\left[\frac{1}{\beta(1-\beta u)}\right]_{-1}^{1}
=4\pi.
\end{aligned}
$$

従って $\int d\Omega(-H^2)=8\pi q^2(\operatorname{artanh}\beta/\beta-1)$。係数 $1/[2(2\pi)^3]=1/(16\pi^3)$ を掛けて結論を得ます。$\operatorname{artanh}\beta/\beta=1+\beta^2/3+O(\beta^4)$ なので $B\ge0$ であり、$\beta=0$ で零となります。
<!-- proof-end -->

ここで見えた対数は紫外の[QFT25のくりこみ群対数](../QFT25/index.md#def-qft25-rg-equation)とは異なります。積分が問題になるのは**光子のエネルギーの下端**であり、結合の走りを指定しただけでは消えません。

## 3. 検出器が区別しない終状態を足す

検出器が $\omega>\Delta$ の光子を識別し、$\omega\le\Delta$ の光子は見分けないとします。現実の検出器で重要なのは全放射エネルギーや角度・受容範囲を含む測定関数ですが、まず各光子のエネルギー閾値という模型を使います。[QFT13の終状態への包摂和](../QFT13/index.md#def-qft13-inclusive-sum)と同じく、区別しない状態の確率を足します。

<a id="def-qft27-inclusive-probability"></a>

<!-- formal-statement-start -->
> **定義（軟光子について包摂的な確率）**  
> 硬い散乱チャネルを固定し、赤外下限 $0<\lambda<\Delta<E$ を置く。軟光子のうち $\Delta<\omega<E$ を放出した終状態を除外し、$\lambda<\omega\le\Delta$ の光子の個数・方向・偏極を区別せずに確率を足した量を $P_{\mathrm{inc}}(\Delta,\lambda)$ とする。ここで $E$ は軟近似を積分する模型上の上端であり、硬い放射の厳密な境界を表すものではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft27-inclusive-probability -->
### 例：一光子の有無を区別しない

**定義の確認**：軟光子が零個の終状態は条件を満たします。ちょうど一個で $\lambda<\omega\le\Delta$ の終状態も満たすため、二つの**確率を加算**します。一個でも $\omega>\Delta$ なら、この定義の確率には入りません。二個以上の各光子が閾値以下ならすべて足しますが、**光子の総エネルギーが $\Delta$ 以下**という別の測定条件とは一致しません。
<!-- definition-example-end -->

仮想光子は観測される終状態の光子ではありません。にもかかわらず、それを含むループの赤外対数と、実際に放出した低エネルギー光子の対数は、確率を規格化すると同じ係数で逆符号に現れます。この仕組みを、軟光子が独立な調和振動子として結合する先頭軟近似で導きます。

<a id="thm-qft27-inclusive-cancellation"></a>

<!-- formal-statement-start -->
> **定理（先頭軟対数の実・仮想相殺）**  
> 正質量の荷電外線と電荷保存を持つ固定された摂動的硬い過程を考える。[軟光子因子](#thm-qft27-soft-factor)が成立し、$\lambda<\omega<E$ の軟モードが外線の古典的線形電流に結合する独立な量子振動子として因子化し、硬い過程の反跳・非軟補正を無視する先頭軟対数近似を仮定する。$P_{\rm hard}$ をこれらの軟因子を除いた硬い過程の確率、$B$ を[角度係数](#def-qft27-angular-coefficient)とする。この模型で軟光子を一個も出さない確率と、[包摂的確率](#def-qft27-inclusive-probability)はそれぞれ

$$
P_0(\lambda)=P_{\rm hard}\exp\left[-B\log\frac E\lambda\right],
\qquad
P_{\rm inc}(\Delta,\lambda)
=P_{\rm hard}\exp\left[-B\log\frac E\Delta\right].
$$

> 特に一次の軟対数では

$$
\delta_{\rm virtual}^{\rm soft}=-B\log\frac E\lambda,
\qquad
\delta_{\rm real}^{\rm unresolved}=+B\log\frac\Delta\lambda,
\qquad
\delta_{\rm inc}^{\rm soft}=-B\log\frac E\Delta.
$$

> したがって $\lambda\downarrow0$ で包摂的確率の先頭軟対数は有限となる。これらの指数式は指定した独立軟モード模型における結果で、完全QEDの非対数有限項、運動量保存による反跳、総放射エネルギーカットの高次補正を含まない。
<!-- formal-statement-end -->

### 証明の見取り図

外線の電流で駆動された各光子モードはコヒーレント状態になります。規格化により零光子の確率は指数の負号、$n$ 光子放出確率は $1/n!$ を含みます。分解能以下の光子について全個数を足すと、その帯域の負の指数だけが打ち消されます。

<!-- proof-start -->
### 証明

有限箱・有限モードから始めます。[QFT4のボース生成消滅作用素の交換関係](../QFT4/index.md#thm-qft4-fock-ccr)を使い、一つの光子モードの生成消滅作用素を $a^\dagger,a$、正規化された軟放射の複素振幅を $f$ とし、$[a,a^\dagger]=1$ とします。線形電流が作る単位的な変位作用素は

$$
D(f)=\exp(fa^\dagger-\overline f\,a)
=e^{-|f|^2/2}e^{fa^\dagger}e^{-\overline f\,a}.
$$

最後の等式は $[fa^\dagger,-\overline f a]=|f|^2$ が数であることから従います。真空に作用させると

$$
D(f)|0\rangle
=e^{-|f|^2/2}\sum_{n=0}^\infty
\frac{f^n}{\sqrt{n!}}|n\rangle,
\quad
P(n)=e^{-|f|^2}\frac{|f|^{2n}}{n!}.
$$

和を取れば $\sum_nP(n)=e^{-|f|^2}e^{|f|^2}=1$ です。多数の独立モードでは $|f|^2$ を和で置き換え、その連続極限は[軟光子積分](#prop-qft27-soft-log)によって $N(\lambda,E)=B\log(E/\lambda)$ となります。零放出確率は $e^{-N(\lambda,E)}$ です。これは仮想軟補正が確率の規格化に現れることを表し、一次で $-N$ となります。

軟モードを $\lambda<\omega\le\Delta$ と $\Delta<\omega<E$ に分割すると、平均個数もそれぞれ $N_< =B\log(\Delta/\lambda)$、$N_>=B\log(E/\Delta)$ に分かれます。高い方の帯域は零光子を選び、低い方の帯域では全個数を足すので

$$
\begin{aligned}
\frac{P_{\rm inc}}{P_{\rm hard}}
&=e^{-(N_<+N_>)}\sum_{n=0}^\infty\frac{N_<^n}{n!}\\
&=e^{-N_>}=\exp[-B\log(E/\Delta)].
\end{aligned}
$$

最後に $e^{-N}=1-N+O(N^2)$ を使い、$P_0$ の一次補正 $-B\log(E/\lambda)$ と、ちょうど一個の未分解光子による $+B\log(\Delta/\lambda)$ を足せば主張する一次式を得ます。
<!-- proof-end -->

この証明は「全てのQEDループ積分をコヒーレント状態へ置き換えた」という主張ではありません。**普遍的な先頭軟部分**だけを抜き出した計算です。QEDの完全な一ループ断面積では、仮想図の有限部分、硬い実放射、測定関数を含む残りも計算しなければなりません。赤外安全性を持つ観測量は、光子を無限に軟らかく追加しても測定値が変わらないことが相殺の鍵です。

## 4. 何を足せば有限で、何はまだ発散するか

### 分解能を変えると予測は変わる

同じ $B>0$、$E$ で閾値を $\Delta_1<\Delta_2$ とすると、[包摂的軟確率](#thm-qft27-inclusive-cancellation)の比は

$$
\frac{P_{\rm inc}(\Delta_2)}{P_{\rm inc}(\Delta_1)}
=\exp\left[B\log\frac{\Delta_2}{\Delta_1}\right].
$$

大きな $\Delta$ は多くの放射を「未検出」とみなすため確率が増えます。補助下限 $\lambda$ が消えても、**実験的な分解能 $\Delta$ の依存は残る**のです。$E$ 付近の非軟領域まで含む予測では、軟近似と硬い光子の計算を重複なく接続する必要があります。

### 荷電粒子の質量を零へ近づけると

[方向転換の係数](#prop-qft27-deflection-coefficient)では $\beta\to1$ とすると

$$
\operatorname{artanh}\beta
=\frac12\log\frac{1+\beta}{1-\beta}\to\infty.
$$

これは光子のエネルギーが零になる**軟発散**とは異なり、光子がほぼ荷電粒子の進行方向へ平行になる**共線発散**です。粒子質量 $m>0$ の下では角度分母が $1-|\boldsymbol v|>0$ で抑えられますが、$m\to0$ でこの下限が失われます。質量のない荷電粒子を扱うには、同じ方向へ細く集まる粒子群を同一の観測結果とみなす定義や、必要な初期状態の扱いも検討しなければなりません。

また、$\Delta\downarrow0$ の「正確に光子零個」の確率は $B>0$ なら零へ近づきます。正の確率を持つ硬い散乱そのものが消えたのではなく、分解能を無限に上げた**排他的な終状態の定義**が適切でないことを表します。長距離QEDでは裸の荷電粒子を通常の自由Fock漸近状態と同一視できないこともあり、[QFT11のLSZに必要な漸近粒子の仮定](../QFT11/index.md#def-qft11-asymptotic-s)を無条件には適用できません。

## 5. 演習

### 演習 QFT27-A1：電荷保存と軟電流の横性

- Level: A
- 問題：入射する電荷 $+e$ の粒子二本が、出射する電荷 $+e$ の粒子二本へ散乱する。各運動量を $p_1,p_2,p_3,p_4$、$p_i^2=m_i^2>0$ とする。入射を $i=1,2$、出射を $i=3,4$ とし、[軟電流](#def-qft27-soft-current)を記して $k_\mu J^\mu=0$ を直接示せ。

<!-- solution-start -->
**詳細解答**

入射に $\eta=-1$、出射に $\eta=+1$ を代入すると

$$
J^\mu=e\left(-\frac{p_1^\mu}{p_1\cdot k}
-\frac{p_2^\mu}{p_2\cdot k}
+\frac{p_3^\mu}{p_3\cdot k}
+\frac{p_4^\mu}{p_4\cdot k}\right).
$$

$k$ と縮約すると各分母が消え、

$$
k_\mu J^\mu=e(-1-1+1+1)=0.
$$

従って物理偏極を $\varepsilon\mapsto\varepsilon+c k$ と変えても先頭軟振幅は変わりません。
<!-- solution-end -->

### 演習 QFT27-A2：対数の出所

- Level: A
- 問題：$\lambda<\omega<\Delta$、$0<\lambda<\Delta$、$J(k)=H(\boldsymbol n)/\omega$ とする。質量正の外線で角度積分が有限であるとき、位相空間測度 $d^3k/[(2\pi)^3 2\omega]$ から $\log(\Delta/\lambda)$ が生じることを導け。

<!-- solution-start -->
**詳細解答**

$d^3k=\omega^2d\omega d\Omega$ と $|J\cdot\varepsilon|^2=|H\cdot\varepsilon|^2/\omega^2$ を代入すると、エネルギー積分の冪は

$$
\frac{\omega^2d\omega}{2\omega}\frac1{\omega^2}
=\frac{d\omega}{2\omega}.
$$

従って[角度係数の定義](#def-qft27-angular-coefficient)を使うと $\int_\lambda^\Delta B\,d\omega/\omega=B[\log\omega]_\lambda^\Delta=B\log(\Delta/\lambda)$ です。
<!-- solution-end -->

### 演習 QFT27-A3：無加速の外線

- Level: A
- 問題：同じ質量・電荷の一入射粒子 $p$ と一出射粒子 $p'=p$ について、$J^\mu(k)$、$B$、$N(\lambda,\Delta)$ を求めよ。これだけで硬い過程が存在しないと結論できるか。

<!-- solution-start -->
**詳細解答**

[定義](#def-qft27-soft-current)に入れると $J=q[p/(p\cdot k)-p/(p\cdot k)]=0$ です。従って $H=\omega J=0$、$B=\int d\Omega\,0=0$、$N=B\log(\Delta/\lambda)=0$。結論は**先頭軟放射が消える**ことであり、硬い散乱や有限エネルギーの放射の有無を判定していません。
<!-- solution-end -->

### 演習 QFT27-A4：相対速度が小さいとき

- Level: A
- 問題：一入射・一出射の等質量・電荷 $q$ の粒子に対し、相対速度 $\beta\ll1$ で $B=q^2(\operatorname{artanh}\beta/\beta-1)/(2\pi^2)$ を $\beta^4$ まで展開せよ。

<!-- solution-start -->
**詳細解答**

$|\beta|<1$ で $\operatorname{artanh}\beta=\beta+\beta^3/3+\beta^5/5+O(\beta^7)$ です。$\beta$ で割り定数を引くと

$$
\frac{\operatorname{artanh}\beta}{\beta}-1
=\frac{\beta^2}{3}+\frac{\beta^4}{5}+O(\beta^6).
$$

従って $B=\frac{q^2}{2\pi^2}(\beta^2/3+\beta^4/5)+O(\beta^6)$。小さな速度変化での先頭係数は非負で $\beta^2$ から始まります。
<!-- solution-end -->

### 演習 QFT27-A5：実・仮想の一次対数

- Level: A
- 問題：$B>0$、$0<\lambda<\Delta<E$ とする。仮想の一次軟補正が $-B\log(E/\lambda)$、一個の未分解実光子補正が $+B\log(\Delta/\lambda)$ であるとき、和を計算し、補助下限 $\lambda$ への依存を判定せよ。

<!-- solution-start -->
**詳細解答**

対数の差をそのまま計算すると

$$
-B(\log E-\log\lambda)
+B(\log\Delta-\log\lambda)
=-B\log(E/\Delta).
$$

$+B\log\lambda$ と $-B\log\lambda$ が相殺したので、$\lambda\downarrow0$ としてもこの先頭軟対数の式は有限です。ただし有限な非対数補正は与えられていません。
<!-- solution-end -->

### 演習 QFT27-B1：相対速度による角度積分

- Level: B
- 問題：質量 $m>0$、電荷 $q$ の粒子が $p=(m,\boldsymbol0)$ から $p'=m\gamma(1,0,0,\beta)$ へ変化する。$0<\beta<1$、$\gamma=(1-\beta^2)^{-1/2}$ とする。$H=q[p'/(p'\cdot\widehat k)-p/(p\cdot\widehat k)]$ を用い、$B$ の角度積分を出発点から導け。

<!-- solution-start -->
**詳細解答**

$u=\cos\theta$ とすると、$p'\cdot\widehat k=m\gamma(1-\beta u)$ です。四元ベクトルの内積を展開して

$$
\begin{aligned}
-H^2/q^2
&=-\left[\frac{m^2}{(p'\cdot\widehat k)^2}
+\frac{m^2}{(p\cdot\widehat k)^2}
-\frac{2p\cdot p'}{(p\cdot\widehat k)(p'\cdot\widehat k)}\right]\\
&=\frac{2}{1-\beta u}-1-\frac{1-\beta^2}{(1-\beta u)^2}.
\end{aligned}
$$

$\int_{-1}^1du/(1-\beta u)=2\operatorname{artanh}\beta/\beta$、$\int_{-1}^1(1-\beta^2)du/(1-\beta u)^2=2$ より

$$
\int d\Omega(-H^2)
=2\pi q^2\left[\frac{4\operatorname{artanh}\beta}{\beta}-4\right].
$$

$2(2\pi)^3=16\pi^3$ で割ると $B=q^2[\operatorname{artanh}\beta/\beta-1]/(2\pi^2)$ を得ます。[方向転換の命題](#prop-qft27-deflection-coefficient)と一致します。
<!-- solution-end -->

### 演習 QFT27-B2：分解能を倍にしたとき

- Level: B
- 問題：$B>0$ と $E$ を固定する。$\Delta<E/2$ とし、二つの閾値 $\Delta$ と $2\Delta$ で先頭軟近似の包摂確率を比較せよ。また $B\ll1$ で一次まで展開し、なぜ閾値を上げると確率が増えるか説明せよ。

<!-- solution-start -->
**詳細解答**

[包摂確率の定理](#thm-qft27-inclusive-cancellation)から

$$
\frac{P_{\rm inc}(2\Delta)}{P_{\rm inc}(\Delta)}
=\frac{e^{-B\log(E/(2\Delta))}}{e^{-B\log(E/\Delta)}}
=e^{B\log2}=2^B.
$$

$B\ll1$ で $2^B=1+B\log2+O(B^2)$。$\Delta<\omega\le2\Delta$ の光子を、後者では許容する終状態へ追加するため、確率は増えます。
<!-- solution-end -->

### 演習 QFT27-B3：コヒーレント状態の確率の和

- Level: B
- 問題：一つの規格化された光子モードの放出個数が $P(n)=e^{-\nu}\nu^n/n!$、$\nu\ge0$ に従うとする。$\sum_{n\ge0}P(n)$ と $P(0)+P(1)$ を求めよ。また二帯域の独立な光子個数の平均を $\nu_<=B\log(\Delta/\lambda)$、$\nu_>=B\log(E/\Delta)$ とするとき、高い帯域で零光子、低い帯域で任意個を許す確率を導け。

<!-- solution-start -->
**詳細解答**

指数関数の級数 $\sum_{n\ge0}\nu^n/n!=e^\nu$ より $\sum_nP(n)=e^{-\nu}e^\nu=1$。零個と一個のみの和は $e^{-\nu}(1+\nu)$ です。二帯域は独立なので

$$
\begin{aligned}
P(n_{\rm high}=0,\ n_{\rm low}\text{ 任意})
&=e^{-\nu_>}\sum_{n=0}^\infty e^{-\nu_<}\frac{\nu_<^n}{n!}\\
&=e^{-\nu_>}e^{-\nu_<}e^{\nu_<}
=e^{-B\log(E/\Delta)}.
\end{aligned}
$$

二つの指数 $-\nu_<$ と $+\nu_<$ が消えることが、未分解の光子を足す役割です。
<!-- solution-end -->

### 演習 QFT27-B4：共線極限の別の発散

- Level: B
- 問題：電荷 $q\ne0$ の正質量粒子について、$B=q^2[\operatorname{artanh}\beta/\beta-1]/(2\pi^2)$、$\beta=\sqrt{1-\gamma^{-2}}$ とする。$\gamma\gg1$ での $B$ の先頭を求め、どの仮定が $\gamma\to\infty$ で失われるか説明せよ。

<!-- solution-start -->
**詳細解答**

$\gamma\gg1$ で $\beta=1-\frac1{2\gamma^2}+O(\gamma^{-4})$。従って

$$
\operatorname{artanh}\beta
=\frac12\log\frac{1+\beta}{1-\beta}
=\log(2\gamma)+O(\gamma^{-2}).
$$

$1/\beta=1+O(\gamma^{-2})$ を代入すると

$$
B=\frac{q^2}{2\pi^2}
\left[\log(2\gamma)-1+O\left(\frac{\log\gamma}{\gamma^2}\right)\right].
$$

正の質量を固定した有限な $\gamma$ では角度分母が下から正に抑えられますが、質量を零に近づけて $\gamma\to\infty$ とすると、$\boldsymbol n$ が速度方向に近い部分で $1-\boldsymbol v\cdot\boldsymbol n$ が零に近づきます。これはエネルギー下限 $\lambda$ を除いても残る共線の問題です。
<!-- solution-end -->

### 演習 QFT27-C1：硬い散乱から測定確率まで

- Level: C
- 問題：電荷 $q=e$、質量 $m>0$ の粒子が硬い外部相互作用によって $p\to p'$ と散乱し、相対速度が $\beta=3/5$ である。硬い過程の確率を $P_{\rm hard}$、軟領域の上端を $E$、分解能を $0<\lambda<\Delta\ll E$ とし、先頭軟・独立モード近似を採用する。

  1. $B$ を $\alpha=e^2/(4\pi)$ で表し、正であることを確認せよ。
  2. ちょうど一個の未分解軟光子の一次対数と、仮想軟光子の一次対数をそれぞれ求めよ。
  3. (2) を足し、$\lambda\to0$ と $\Delta\to0$ の各極限の意味を区別せよ。
  4. 任意個の未分解軟光子を足した確率を求め、$\Delta$ を $2\Delta$ に変えるときの比を求めよ。
  5. この解答だけで測定断面積の完全な一ループ値が決まらない理由を二つ説明せよ。

<!-- solution-start -->
**詳細解答**

(1) $\beta=3/5$ なら $\operatorname{artanh}\beta=\frac12\log[(1+3/5)/(1-3/5)]=\frac12\log4=\log2$ です。[係数の命題](#prop-qft27-deflection-coefficient)に代入し

$$
B=\frac{e^2}{2\pi^2}\left(\frac{5\log2}{3}-1\right)
=\frac{2\alpha}{\pi}\left(\frac{5\log2}{3}-1\right).
$$

$\log2>3/5$ なので括弧は正で、$B>0$ です。

(2) [軟光子積分](#prop-qft27-soft-log)から一個の未分解実光子は $\delta_{\rm real}=B\log(\Delta/\lambda)$。独立軟モードの規格化による仮想項は $\delta_{\rm virtual}=-B\log(E/\lambda)$ です。

(3) 両者の和は

$$
\delta_{\rm inc}=-B\log(E/\lambda)+B\log(\Delta/\lambda)
=-B\log(E/\Delta).
$$

$\lambda\to0$ は計算を助ける赤外下限を外す操作で、この式は有限です。$\Delta\to0$ は検出器の分解能を無限に高くする異なる操作で、上式の負の対数は大きくなり一次摂動だけでは確率の解釈が壊れます。

(4) 独立軟モードを指数に再和すると

$$
P_{\rm inc}(\Delta)=P_{\rm hard}e^{-B\log(E/\Delta)}
=P_{\rm hard}(\Delta/E)^B.
$$

$2\Delta<E$ なら $P_{\rm inc}(2\Delta)/P_{\rm inc}(\Delta)=2^B$ です。$\Delta\downarrow0$ では $B>0$ なのでこの**排他的確率の極限**は零となります。

(5) 第一に、$\omega\sim E$ の硬い光子放出や非軟補正は軟因子に含まれていません。第二に、仮想ループの赤外有限項と反跳・エネルギーや角度に依存する実際の測定関数を計算していません。従って先頭対数の相殺と完全な断面積予測は区別します。
<!-- solution-end -->

## 6. 学びの整理

- [軟光子放出因子](#thm-qft27-soft-factor)は、正質量の外線に隣接する質量殻伝播核から生じます。電荷保存が偏極のゲージシフトへの不変性を保証します。
- [軟光子の位相空間](#prop-qft27-soft-log)には $d\omega/\omega$ が現れ、係数は正の[角度係数](#def-qft27-angular-coefficient)です。一粒子の方向転換では[相対速度の式](#prop-qft27-deflection-coefficient)まで直接積分できます。
- [包摂的な確率](#def-qft27-inclusive-probability)で未分解終状態を足すと、[先頭軟対数の相殺](#thm-qft27-inclusive-cancellation)によって補助的な赤外下限は消えます。しかし測定分解能への依存と共線の問題は別に残ります。

次は非可換ゲージ理論へ進み、光子自身が電荷を持たないQEDと異なり、ゲージ場自身が相互作用する場合を考えます。
