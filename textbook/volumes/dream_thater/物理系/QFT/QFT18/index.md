# QFT18 QEDのWard–Takahashi恒等式と木レベル光子ゲージ不変性

[QFT17の一光子交換](../QFT17/index.md#prop-qft17-tree-amplitude)では、質量殻にある電子・ミューオンの電流を光子運動量で縮約すると零になり、内部光子の共変ゲージパラメータが消えました。しかしその確認だけでは、**電子線の途中へ光子を差し込んだ相関関数**や、光子が二本付く散乱で何が起こるかは分かりません。そもそも質量殻の外では電流の縮約は一般に零でありません。

この講義の問いは、**局所的な電荷保存が、異なるGreen関数の間にどのような等式を強制し、実際の散乱振幅ではどうゲージ依存性を相殺するのか？** です。Dirac作用素の逆核の差から木レベルWard–Takahashi恒等式を導き、位置空間に現れるデルタ関数の接触項を計算します。その後、電子と光子のCompton散乱で二つの木図を足す必要を、両方の光子脚について検算します。

時空は $3+1$ 次元Minkowski時空で、計量は $\eta=\operatorname{diag}(1,-1,-1,-1)$、単位系は $c=\hbar=1$ です。運動量とgamma行列の縮約は

$$
\not p=\gamma^\mu p_\mu
$$

と記します。[QFT7のClifford関係](../QFT7/index.md#def-qft7-clifford)と[Diracスピノルの平面波解](../QFT7/index.md#def-qft7-plane-waves)を使います。

荷電Dirac場の質量は $m>0$、符号付き電荷は定数 $q$ とします。[QFT17の最小結合](../QFT17/index.md#def-qft17-qed-action)と[三点頂点](../QFT17/index.md#def-qft17-vertex)の規約は

$$
D_\mu=\partial_\mu+iqA_\mu,\qquad
V^\mu=-iq\gamma^\mu
$$

です。電子なら $q=-e$、$e>0$ とします。

以下の恒等式は、自由場の伝播核と摂動論の**木レベル**での等式です。内部運動量の極ではFeynmanの $i0$ を分布的に理解し、積・積分は必要に応じ試験関数でsmearingした形式的摂動係数として扱います。[QFT11の漸近状態・LSZの条件](../QFT11/index.md#def-qft11-asymptotic-s)を満たす外線に限って散乱振幅と同定します。質量零光子を持つ現実のQEDで、赤外問題を含む厳密な孤立荷電粒子のS行列がこの計算だけで構成されたわけではありません。

## 1. 頂点を縦向きに縮約すると何が残るか

外線を質量殻に置く前の電子線には、左と右で異なる運動量 $p'=p+k$ が流れます。ここで $k$ は光子が電子線へ**入る**四元運動量です。従来の外線電流の横性を最初から仮定せず、自由Dirac方程式の左辺を運動量空間で見ることにします。

行列 $K(p)=\not p-mI_4$ はDirac作用素 $i\not\partial-m$ のFourier記号です。伝播関数にはこれに加えて係数 $i$ が付くため、両者を混同しないように次の記法を固定します。

<a id="def-qft18-inverse-kernel"></a>

<!-- formal-statement-start -->
> **定義（自由Dirac逆核と切断前の伝播核）**  
> 質量 $m>0$ と四元運動量 $p$ に対し、四次正方行列

$$
K(p)=\not p-mI_4
$$

> を自由Dirac逆核（逆伝播核の記号）とする。$p^2\ne m^2$ ではその逆行列を $R(p)=K(p)^{-1}$ と書き、極では $i0$ 処方による境界値を取る。

$$
R(p)=\frac{\not p+mI_4}{p^2-m^2+i0},
\qquad S_F(p)=iR(p).
$$

> $S_F$ は[QFT8の時間順序Dirac伝播関数](../QFT8/index.md#thm-qft8-propagator)の運動量空間表示である。$R$ は数値係数 $i$ を外した核であり、$K(p)R(p)=R(p)K(p)=I_4$ は極の外では通常の行列等式、$i0$ 極限では分布等式を表す。
<!-- formal-statement-end -->

逆行列が生じる理由を確かめましょう。[Clifford関係](../QFT7/index.md#def-qft7-clifford)により対称テンソル $p_\mu p_\nu$ と反交換子だけが残り、

$$
\begin{aligned}
(\not p-m)(\not p+m)
&=\gamma^\mu\gamma^\nu p_\mu p_\nu-m^2I_4\\
&=\tfrac12\{\gamma^\mu,\gamma^\nu\}p_\mu p_\nu-m^2I_4\\
&=(p^2-m^2)I_4.
\end{aligned}
$$

従って $p^2\ne m^2$ なら分子が逆行列の候補になります。有限の $\varepsilon>0$ で $\frac{p^2-m^2}{p^2-m^2+i\varepsilon}$ は厳密に1ではありませんが、$\varepsilon\downarrow0$ の分布極限で1になります。以下の積の変形はまず極を避けて行い、その後処方を保って読みます。

<!-- definition-example-start: def-qft18-inverse-kernel -->
### 例：静止電子の近傍で逆核を比べる

**定義の確認**：$p=(m,0,0,0)$、$k=(0,\kappa,0,0)$（$\kappa\ne0$）とすれば、

$$
K(p)=m\gamma^0-mI_4,\quad
K(p+k)=m\gamma^0-\kappa\gamma^1-mI_4.
$$

従って $K(p+k)-K(p)=-\kappa\gamma^1=\not k$ です。ここで $p$ は質量殻上なので $R(p)$ を通常の逆行列としては使えません。一方 $(p+k)^2=m^2-\kappa^2\ne m^2$ なので $R(p+k)$ は通常の行列として定まります。**逆核の差は両端が質量殻外でなくても定義でき、逆行列の積を取るときだけ極への注意が必要**です。
<!-- definition-example-end -->

頂点の行列部分 $\gamma^\mu$ と伝達運動量 $k_\mu$ の縮約が、二つの逆核の差そのものであることが本講義の出発点です。これは一つの散乱模型に依存しない行列恒等式です。

<a id="thm-qft18-tree-ward"></a>

<!-- formal-statement-start -->
> **定理（木レベル三点頂点のWard–Takahashi恒等式）**  
> 質量 $m>0$ の自由Dirac逆核を $K(p)=\not p-mI_4$、$p'=p+k$ とする。同一種のDirac場に付く木レベル頂点のgamma行列部分 $\Gamma_0^\mu=\gamma^\mu$ は、任意の四元運動量 $p,k$ に対して

$$
k_\mu\Gamma_0^\mu=K(p')-K(p)
$$

> を満たす。さらに $p^2\ne m^2$、$p'^2\ne m^2$ では

$$
k_\mu R(p')\Gamma_0^\mu R(p)=R(p)-R(p').
$$

> 物理的な三点頂点 $V^\mu=-iq\Gamma_0^\mu$ を使う場合、両辺に $-iq$ を掛ける。これは電荷 $q$ を落としたという意味ではない。
<!-- formal-statement-end -->

### 証明の見取り図

最初の式は質量項が左右で消えるだけです。二番目は左から $R(p')$、右から $R(p)$ を掛け、左右に接した逆核をそれぞれ相殺します。左右の逆核は別の運動量に属するので順番を保ちます。

<!-- proof-start -->
### 証明

$p'=p+k$ を代入すると

$$
\begin{aligned}
K(p')-K(p)
&=(\gamma^\mu p'_\mu-mI_4)-(\gamma^\mu p_\mu-mI_4)\\
&=\gamma^\mu(p'_\mu-p_\mu)=\gamma^\mu k_\mu.
\end{aligned}
$$

両端の運動量が質量殻外なら[逆核の定義](#def-qft18-inverse-kernel)に従い

$$
\begin{aligned}
R(p')\,k_\mu\gamma^\mu\,R(p)
&=R(p')[K(p')-K(p)]R(p)\\
&=R(p')K(p')R(p)-R(p')K(p)R(p)\\
&=R(p)-R(p').
\end{aligned}
$$

二行目の第一項で $R(p')K(p')=I_4$、第二項で $K(p)R(p)=I_4$ を使いました。ここでは行列を任意に交換していません。分布境界値については各逆核と同じFeynman処方を保つ形式的恒等式として読むことができます。
<!-- proof-end -->

この等式は「光子運動量との縮約は零」という式ではありません。**質量殻外で残る差**が、位置空間では相関関数の挿入点が他の場と重なるときの接触項になります。

## 2. 三点関数にはなぜデルタ接触項があるか

時間順序積を微分すると、場の時間発展に加えて時間順序の段差も微分されます。そのため、[QFT17の保存電流](../QFT17/index.md#thm-qft17-eom-current)が運動方程式上で $\partial_\mu j^\mu=0$ を満たすことと、任意の時間順序相関関数の発散が点ごとに零になることは別です。

具体的に、電荷 $q$ と伝播関数の数値係数を一度外し、二つの自由電子核の間へgamma行列を挿入した量を調べます。$z$ が電子線の始点、$y$ が終点、$x$ が電流を挿入する点です。両端の自由伝播核を取り除かずに残すことを「非切断」と呼びます。

位置空間の自由二点核は、[QFT8のDirac時間順序伝播関数](../QFT8/index.md#thm-qft8-propagator)から全体の $i$ を外し、四元運動量 $r$ でFourier逆変換した

$$
R(y-z):=\int\frac{d^4r}{(2\pi)^4}e^{-ir\cdot(y-z)}R(r)
$$

です。これは二つの端点を結ぶ $4\times4$ 行列値分布です。以下、$\partial_{x^\mu}$ は他の位置 $y,z$ を固定して挿入点の座標 $x^\mu$ で偏微分する記号とし、$\partial_{x^\mu}\mathscr G^\mu$ では反復する $\mu=0,1,2,3$ を足し合わせます。

<a id="def-qft18-three-point-kernel"></a>

<!-- formal-statement-start -->
> **定義（木レベル三点核と接触項）**  
> 質量 $m>0$ の自由Dirac核 $R(p)$ と $p'=p+k$ に対して、全体の電荷・$i$ 因子を外した木レベルの非切断三点核を

$$
\mathscr G^\mu(p',p)=R(p')\gamma^\mu R(p)
$$

> とする。位置空間核は次のFourier規約で定める。

$$
\mathscr G^\mu(y,x,z)=
\int\frac{d^4p'\,d^4p}{(2\pi)^8}
e^{-ip'\cdot(y-x)}e^{-ip\cdot(x-z)}
\mathscr G^\mu(p',p).
$$

> 挿入点が端点と一致することに集中する $\delta^{(4)}(x-y)$、$\delta^{(4)}(x-z)$ に比例した分布項を、この三点核の**接触項**と呼ぶ。分布等式は試験関数との積分で理解する。
<!-- formal-statement-end -->

散乱振幅で外線の伝播核を除く操作は、この非切断核から両端の $R$ を除く操作と対になります。[QFT9のフェルミオンWick収縮](../QFT9/index.md#thm-qft9-fermion-wick)による自由場三点関数の該当項から得られる構造ですが、ここでは符号と数値係数を定義で固定し、相関関数の時間順序の一般恒等式と無言で同一視しません。

<!-- definition-example-start: def-qft18-three-point-kernel -->
### 例：二つの端点の接触寄与を試験関数で識別する

**定義の確認**：挿入点の任意の滑らかなコンパクト台関数 $f(x)$ で積分すると

$$
\begin{aligned}
\int d^4x\,f(x)\delta^{(4)}(x-y)R(y-z)&=f(y)R(y-z),\\
\int d^4x\,f(x)\delta^{(4)}(x-z)R(y-z)&=f(z)R(y-z).
\end{aligned}
$$

したがって $f(y)\ne f(z)$ となる選び方なら二つの接触寄与の差が残ります。$x$ が $y,z$ のいずれからも離れた領域に支持を持つ $f$ では両方とも零です。「接触」は相関関数がすべての点で保存則に反するという意味ではなく、**場の挿入点が一致する分布的境界**を指します。
<!-- definition-example-end -->

<a id="thm-qft18-contact-identity"></a>

<!-- formal-statement-start -->
> **定理（非切断三点核の接触項恒等式）**  
> [木レベル三点核](#def-qft18-three-point-kernel)を同じFeynman境界値で定義し、$R(y-z)$ をその二点核とする。このとき、分布の意味で

$$
\partial_{x^\mu}\mathscr G^\mu(y,x,z)
=i\left[\delta^{(4)}(x-y)-\delta^{(4)}(x-z)\right]R(y-z).
$$

> 運動量空間でこれと等価な式は

$$
k_\mu\mathscr G^\mu(p',p)=R(p)-R(p'),\qquad k=p'-p.
$$

> 電荷を含む電流挿入の核 $q\mathscr G^\mu$ では両辺に $q$ が掛かる。実際の時間順序相関関数へ戻す場合は、選択した $i$ 因子と場の並べ方による符号も戻す必要がある。
<!-- formal-statement-end -->

### 証明の見取り図

運動量では[木レベルWard恒等式](#thm-qft18-tree-ward)をそのまま利用できます。位置空間では挿入点 $x$ の微分がFourier指数から $i(p'-p)_\mu$ を取り出します。差の一方は $p'$ の積分で、他方は $p$ の積分でデルタ関数になります。

<!-- proof-start -->
### 証明

まず[木レベル三点頂点のWard–Takahashi恒等式](#thm-qft18-tree-ward)より

$$
k_\mu\mathscr G^\mu(p',p)
=R(p')\not k R(p)
=R(p)-R(p').
$$

位置空間の指数を $x$ で微分すると

$$
\partial_{x^\mu}
\bigl[e^{-ip'\cdot(y-x)}e^{-ip\cdot(x-z)}\bigr]
=i(p'_\mu-p_\mu)e^{-ip'\cdot(y-x)}e^{-ip\cdot(x-z)}.
$$

この式を[三点核のFourier表示](#def-qft18-three-point-kernel)へ代入し、上の差を使うと

$$
\begin{aligned}
\partial_{x^\mu}\mathscr G^\mu
&=i\int\frac{d^4p'\,d^4p}{(2\pi)^8}
e^{-ip'\cdot(y-x)}e^{-ip\cdot(x-z)}
[R(p)-R(p')]\\
&=i\delta^{(4)}(y-x)R(x-z)
-iR(y-x)\delta^{(4)}(x-z)\\
&=i[\delta^{(4)}(x-y)-\delta^{(4)}(x-z)]R(y-z).
\end{aligned}
$$

第二行の第一項は $p'$ 積分、第二項は $p$ 積分を先に行いました。第三行ではデルタ分布の支持上で $x=y$ または $x=z$ と置きました。全てを試験関数と組み合わせれば、点値を不正に取る操作ではありません。
<!-- proof-end -->

電子と陽電子の電荷が逆であることを反映し、二つの接触項は反対符号です。これは局所位相変換で $\psi$ と $\bar\psi$ の位相が逆になる[QFT17の局所U(1)不変性](../QFT17/index.md#thm-qft17-u1-invariance)とも整合します。接触項を無視して $k_\mu\mathscr G^\mu=0$ と置くと、両端の逆伝播核の差を消してしまいます。

## 3. 質量殻にして初めて外線の縮約は零になる

今度は端点の核を外した三点頂点を、物理的な入射・出射電子スピノルで挟みます。出射を $p'=p+k$ とし、**同じ質量 $m$** の二つの正エネルギー質量殻運動量とします。

<a id="cor-qft18-on-shell-ward"></a>

<!-- formal-statement-start -->
> **系（質量殻外線のWard恒等式）**  
> 質量 $m>0$ の自由Diracスピノル $u_s(p)$、$u_{s'}(p')$ が $p^2=p'^2=m^2$、$p^0,p'^0>0$ を満たし、$k=p'-p$ とする。このとき木レベル頂点の外線電流は

$$
k_\mu\bar u_{s'}(p')\gamma^\mu u_s(p)=0.
$$

> しかし、両端をDirac方程式の解に制限しない四成分ベクトル $v,w$ では一般に $k_\mu\bar v\gamma^\mu w\ne0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

[逆核の差](#thm-qft18-tree-ward)に外線を挟みます。出射側には左から働く随伴Dirac方程式、入射側には右から働くDirac方程式を適用します。二つの質量が異なるベクトルを同一の電子線の端点とみなすことはできません。

<!-- proof-start -->
### 証明

[QFT7の質量殻スピノル](../QFT7/index.md#def-qft7-plane-waves)は

$$
K(p)u_s(p)=0,\qquad
\bar u_{s'}(p')K(p')=0
$$

を満たします。従って

$$
\begin{aligned}
k_\mu\bar u_{s'}(p')\gamma^\mu u_s(p)
&=\bar u_{s'}(p')[K(p')-K(p)]u_s(p)\\
&=\underbrace{\bar u_{s'}(p')K(p')}_{0}u_s(p)
-\bar u_{s'}(p')\underbrace{K(p)u_s(p)}_{0}=0.
\end{aligned}
$$

一方、任意の $v,w$ にこの二つの零条件はありません。従って逆核の差を零にする理由はなく、後の例で非零を直接示します。
<!-- proof-end -->

### 例：一端だけ質量殻から外す

$p=(m,0,0,0)$ とし、規格化 $\bar u(p)\gamma^0u(p)=2m$ のスピノルを選びます。$\Delta\ne0$ として $p'=p+(\Delta,0,0,0)$、$k=(\Delta,0,0,0)$ と置き、出射側にも同じ四成分 $\bar u(p)$ を**試験的に**使うと

$$
k_\mu\bar u(p)\gamma^\mu u(p)
=\Delta\,\bar u(p)\gamma^0u(p)=2m\Delta\ne0.
$$

この $\bar u(p)$ は一般に $p'$ に対する出射質量殻解ではありません。したがって[系](#cor-qft18-on-shell-ward)への反例ではなく、**質量殻条件を落とせば縮約が消えない**ことの直接例です。

## 4. 二つのCompton木図を足して光子ゲージ不変性を確かめる

光子を二本付けると、一方の光子を電子線の前に、もう一方を後に置く二通りが存在します。[QFT17のQED三点頂点](../QFT17/index.md#def-qft17-vertex)を二回使う最小の非自明な検査です。どちらか片方だけを取ると、縦偏極に対する相殺が失われます。

入射電子 $p$、入射光子 $k$、出射電子 $p'$、出射光子 $k'$ の過程

$$
e^-(p)+\gamma(k)\longrightarrow e^-(p')+\gamma(k')
$$

を考えます。全て正エネルギー、$p^2=p'^2=m^2>0$、$k^2=k'^2=0$、$p+k=p'+k'$ です。内部電子線は一方が $p+k$、もう一方が $p-k'$ です。

<a id="def-qft18-compton-tree"></a>

<!-- formal-statement-start -->
> **定義（Compton散乱の二つの木図）**  
> 上の質量殻・保存則を満たすCompton過程について、電子線の中間運動量が $p+k$ または $p-k'$ である二つの木レベル寄与を、全体の頂点係数を除いたテンソル

$$
B^{\mu\nu}(p',k';p,k)=
\bar u(p')\left[
\gamma^\nu R(p+k)\gamma^\mu
+\gamma^\mu R(p-k')\gamma^\nu
\right]u(p)
$$

> で定める。$\mu$ は入射光子、$\nu$ は出射光子のLorentz添字である。物理的な偏極ベクトルを $\epsilon_\mu(k)$、$\epsilon_\nu^*(k')$ とすると、本章の頂点 $-iq\gamma^\mu$ と伝播関数 $iR$ から

$$
\mathcal M=-q^2\epsilon_\mu(k)\epsilon_\nu^*(k')B^{\mu\nu}
$$

> となる。内部核は $R(p+k)$、$R(p-k')$ の分母が零にならない領域で扱う。
<!-- formal-statement-end -->

二つの項の順序を確認します。電子線を**右から左**へ読むと、第一項では入射光子 $\gamma^\mu$ を先に吸収し、第二項では出射光子 $\gamma^\nu$ を先に放出します。[Dyson級数の二次項](../QFT9/index.md#def-qft9-dyson)の二頂点は時空点の交換二通りで $2!$ を相殺し、電子線への二つの光子の順序だけが区別されます。

<!-- definition-example-start: def-qft18-compton-tree -->
### 例：二つの内部線の分母を直接確認する

**定義の確認**：$p+k=p'+k'$、$p^2=p'^2=m^2$、$k^2=k'^2=0$ なので、

$$
\begin{aligned}
(p+k)^2-m^2&=2p\cdot k,\\
(p-k')^2-m^2&=-2p\cdot k',\\
(p+k)^2&=(p'+k')^2,\\
(p-k')^2&=(p'-k)^2.
\end{aligned}
$$

電子が未来向きの時間的ベクトル、両光子が非零の未来向き光的ベクトルなら $p\cdot k>0$、$p\cdot k'>0$ です。従ってこの物理的なCompton運動学では分母は零ではありません。第一項と第二項を**同じ運動量の伝播核**としてまとめることはできません。
<!-- definition-example-end -->

<a id="thm-qft18-compton-ward"></a>

<!-- formal-statement-start -->
> **定理（Compton散乱の二つの光子脚の横性）**  
> $m>0$ とし、$p^2=p'^2=m^2$、$k^2=k'^2=0$、$p+k=p'+k'$、全エネルギー正、光子のエネルギー非零のCompton過程を考える。電子外線は自由Dirac方程式を満たし、[二つの木図](#def-qft18-compton-tree)のテンソルを

$$
B^{\mu\nu}=\bar u(p')[
\gamma^\nu R(p+k)\gamma^\mu
+\gamma^\mu R(p-k')\gamma^\nu]u(p)
$$

> とする。ただし $R(r)=(\not r+mI_4)/(r^2-m^2+i0)$ である。このとき

$$
k_\mu B^{\mu\nu}=0,\qquad
k'_\nu B^{\mu\nu}=0
$$

> が成立する。各木図は通常は横性を単独では満たさず、二図の和で成立する。
<!-- formal-statement-end -->

### 証明の見取り図

入射光子の $k_\mu$ を縮約すると、第一項は $+\bar u(p')\gamma^\nu u(p)$、第二項はその負になります。出射光子の $k'_\nu$ でも、今度は反対側から逆核の差を使って同じ相殺が起こります。**別々の二つのWard検査**を行うことが重要です。

<!-- proof-start -->
### 証明

以下では $\bar u=\bar u(p')$、$u=u(p)$、$K(r)=\not r-mI_4$ と略記します。分母が零でないので $R(r)=K(r)^{-1}$ を通常の逆行列として使えます。

まず入射光子について、$k=(p+k)-p$ より[逆核の差](#thm-qft18-tree-ward)を入れると

$$
\begin{aligned}
k_\mu\bar u\gamma^\nu R(p+k)\gamma^\mu u
&=\bar u\gamma^\nu R(p+k)[K(p+k)-K(p)]u\\
&=\bar u\gamma^\nu[I_4-R(p+k)K(p)]u\\
&=+\bar u\gamma^\nu u.
\end{aligned}
$$

一方、運動量保存から $k=p'-(p-k')$ です。$k$ は第二項の**左側**に作用するので

$$
\begin{aligned}
k_\mu\bar u\gamma^\mu R(p-k')\gamma^\nu u
&=\bar u[K(p')-K(p-k')]R(p-k')\gamma^\nu u\\
&=[\bar uK(p')R(p-k')-\bar u]\gamma^\nu u\\
&=-\bar u\gamma^\nu u.
\end{aligned}
$$

和は零です。次に出射光子では $k'=(p+k)-p'$ および $k'=p-(p-k')$ を使います。第一項の**左側**から

$$
\begin{aligned}
k'_\nu\bar u\gamma^\nu R(p+k)\gamma^\mu u
&=\bar u[K(p+k)-K(p')]R(p+k)\gamma^\mu u\\
&=[\bar u-\bar uK(p')R(p+k)]\gamma^\mu u\\
&=+\bar u\gamma^\mu u.
\end{aligned}
$$

第二項の**右側**からは

$$
\begin{aligned}
k'_\nu\bar u\gamma^\mu R(p-k')\gamma^\nu u
&=\bar u\gamma^\mu R(p-k')[K(p)-K(p-k')]u\\
&=\bar u\gamma^\mu[R(p-k')K(p)-I_4]u\\
&=-\bar u\gamma^\mu u.
\end{aligned}
$$

ここで全ての零は外線条件 $\bar u(p')K(p')=0$、$K(p)u(p)=0$ によります。従って $k_\mu B^{\mu\nu}=k'_\nu B^{\mu\nu}=0$ です。
<!-- proof-end -->

二図の相殺は、単に「光子は横偏極だけ」という宣言からは出ません。電子線上の**二つの挿入順序と逆核の差**から導かれる具体的な代数的制約です。

<a id="prop-qft18-polarization-shift"></a>

<!-- formal-statement-start -->
> **命題（外部偏極のゲージシフトに対する振幅不変性）**  
> [Compton散乱の木レベル振幅](#def-qft18-compton-tree)を、上の[横性定理](#thm-qft18-compton-ward)の仮定の下で考える。入射・出射光子の偏極に対する任意の複素定数 $a,b$ の置換

$$
\epsilon_\mu(k)\longmapsto\epsilon_\mu(k)+ak_\mu,\qquad
\epsilon_\nu^*(k')\longmapsto\epsilon_\nu^*(k')+bk'_\nu
$$

> は、木レベルの不変振幅 $\mathcal M$ を変えない。
<!-- formal-statement-end -->

### 証明の見取り図

振幅を二つの偏極について双線形に展開すると、新しく出る三項には少なくとも一つの $k_\mu B^{\mu\nu}$ または $k'_\nu B^{\mu\nu}$ が含まれます。

<!-- proof-start -->
### 証明

[振幅の定義](#def-qft18-compton-tree)を用いてシフト後との差を計算すると

$$
\begin{aligned}
\Delta\mathcal M=-q^2\bigl[
&a k_\mu\epsilon_\nu^*B^{\mu\nu}
+b\epsilon_\mu k'_\nu B^{\mu\nu}\\
&+ab\,k_\mu k'_\nu B^{\mu\nu}\bigr].
\end{aligned}
$$

[横性定理](#thm-qft18-compton-ward)の第一式で第一項と第三項が、第二式で第二項が零になります。よって $\Delta\mathcal M=0$ です。これは偏極をずらしても振幅が変わらないという主張であり、各図のゲージ不変性を述べてはいません。
<!-- proof-end -->

## 5. 何が守られ、どこまでが木レベルか

ここまでの結果には三つの異なる主張があります。

1. **質量殻に制限しない三点核**：$k_\mu\mathscr G^\mu=R(p)-R(p')$ であり、接触項を含みます。
2. **質量殻上の一光子外線**：[質量殻外線のWard恒等式](#cor-qft18-on-shell-ward)により、同じ電子種の電流の縮約が零になります。
3. **二光子を持つCompton散乱**：[二図の和](#thm-qft18-compton-ward)で両光子脚への縮約が零になり、偏極のゲージシフトが消えます。

[QFT16の共変ゲージ固定](../QFT16/index.md#def-qft16-photon-propagator)で現れた内部光子の $\xi$ 依存性は、伝播関数中の $k_\mu k_\nu$ と保存電流を縮約して消す別の検査です。本章は**外部光子偏極の置換**を二つの電子交換図で検査しました。どちらもゲージ冗長性に関係しますが、同じ中間式を使うわけではありません。

ループが入ると自由逆核 $K$ ではなく、自己エネルギーを含む逆二点関数と頂点補正の関係を考える必要があります。木レベルの等式をそのまま量子補正全体の証明とみなすことはできません。正則化、反項、接触項、赤外条件を扱う準備として、次は有限次元Gaussian積分とGrassmann積分から生成汎関数を作る道具へ進みます。

## 6. 演習：接触項から二光子の横性まで

演習では「光子で縮約したから零」と早合点せず、どの位置に逆核が残るか、どの外線方程式を使うかを毎回確認します。全て自然単位系と上記の計量を使います。

### 演習 QFT18-A1：逆核の差を手で確かめる

- Level: A
- 問題：$\eta=\operatorname{diag}(1,-1,-1,-1)$、$\not p=\gamma^\mu p_\mu$、$K(p)=\not p-mI_4$ とする。$p=(E,0,0,0)$、$k=(\omega,\kappa,0,0)$ に対し、$K(p+k)-K(p)$ を求めて $k_\mu\gamma^\mu$ と一致することを示せ。$E=m$ や $p^2=m^2$ の仮定が必要か答えよ。

<!-- solution-start -->
**詳細解答**

共変成分は $k_0=\omega$、$k_1=-\kappa$ です。したがって

$$
\begin{aligned}
K(p+k)&=(E+\omega)\gamma^0-\kappa\gamma^1-mI_4,\\
K(p)&=E\gamma^0-mI_4,\\
K(p+k)-K(p)&=\omega\gamma^0-\kappa\gamma^1
=k_\mu\gamma^\mu.
\end{aligned}
$$

質量項と $E\gamma^0$ が消えることだけを使いました。質量殻条件は不要です。これは[逆核のWard恒等式](#thm-qft18-tree-ward)の成分による検算であり、運動量 $p$ が質量殻上でも成立します。
<!-- solution-end -->

### 演習 QFT18-A2：逆行列で挟んだ頂点

- Level: A
- 問題：$K(r)=\not r-mI_4$、$R(r)=K(r)^{-1}$ とする。$p^2\ne m^2$、$(p+k)^2\ne m^2$ を仮定し、$R(p+k)\not k R(p)$ を $R(p)$ と $R(p+k)$ の差で表せ。行列を交換してよいと仮定しないこと。

<!-- solution-start -->
**詳細解答**

[逆核の差](#thm-qft18-tree-ward)から $\not k=K(p+k)-K(p)$ です。左・右の積順序を保って

$$
\begin{aligned}
R(p+k)\not k R(p)
&=R(p+k)K(p+k)R(p)\\
&\quad-R(p+k)K(p)R(p)\\
&=I_4R(p)-R(p+k)I_4\\
&=\boxed{R(p)-R(p+k)}.
\end{aligned}
$$

二行目の二つの逆行列関係は異なる位置に働きます。$p$ または $p+k$ が質量殻上なら通常の逆行列計算ではなく分布的極限を扱う必要があります。
<!-- solution-end -->

### 演習 QFT18-A3：デルタ接触項を試験関数に作用させる

- Level: A
- 問題：$y\ne z$、滑らかなコンパクト台関数 $f(x)$、分布 $R(y-z)$ を用いる。$T(x)=i[\delta^{(4)}(x-y)-\delta^{(4)}(x-z)]R(y-z)$ を $f$ に作用させ、$f(y)=f(z)$ と $f(y)\ne f(z)$ の違いを述べよ。$y,z$ の変数についても必要なら試験関数と組み合わせてよい。

<!-- solution-start -->
**詳細解答**

デルタ分布を試験関数で評価する規則から

$$
\begin{aligned}
\langle T,f\rangle_x
&=i\int d^4x\,f(x)
[\delta^{(4)}(x-y)-\delta^{(4)}(x-z)]R(y-z)\\
&=i[f(y)-f(z)]R(y-z).
\end{aligned}
$$

$f(y)=f(z)$ ならこの試験関数に対して接触項は相殺します。一方、二つの値が異なれば一般に残ります。[接触項の定理](#thm-qft18-contact-identity)は「各デルタ項が零」と主張しません。$R(y-z)$ 自体は分布なので、$y,z$ まで積分するときにはそれらの試験関数との組合せで理解します。
<!-- solution-end -->

### 演習 QFT18-A4：質量殻外の電流は横向きでない

- Level: A
- 問題：$m>0$、$p=(m,0,0,0)$ とし、$u(p)$ は静止正エネルギースピノルとする。規格化は次で与える。

$$
\bar u(p)\gamma^0u(p)=2m.
$$

  $\Delta\ne0$、$k=(\Delta,0,0,0)$、$p'=p+k$ とする。出射側にも誤って $\bar u(p)$ を用いたときの縮約

$$
k_\mu\bar u(p)\gamma^\mu u(p)
$$

  を計算せよ。これが[質量殻外線のWard恒等式](#cor-qft18-on-shell-ward)への反例でない理由も述べよ。

<!-- solution-start -->
**詳細解答**

$k_\mu\gamma^\mu=\Delta\gamma^0$ なので

$$
k_\mu\bar u(p)\gamma^\mu u(p)
=\Delta\bar u(p)\gamma^0u(p)=2m\Delta\ne0.
$$

入射側は $K(p)u(p)=0$ ですが、出射側には $K(p')$ を適用すべきです。実際、

$$
\bar u(p)K(p')
=\bar u(p)[K(p)+\Delta\gamma^0]
=\Delta\bar u(p)\gamma^0
$$

となり一般に零ではありません。[質量殻Ward恒等式](#cor-qft18-on-shell-ward)は出射スピノルも運動量 $p'$ の質量殻解であることを要求するので、仮定を落とした例です。
<!-- solution-end -->

### 演習 QFT18-A5：Comptonの内部運動量

- Level: A
- 問題：$p^2=p'^2=m^2>0$、$k^2=k'^2=0$、$p+k=p'+k'$ を満たすCompton散乱を考える。二つの内部電子運動量を $r_s=p+k$、$r_u=p-k'$ とする。$r_s^2-m^2$、$r_u^2-m^2$ を外線の内積で表し、$r_s=p'+k'$ と $r_u=p'-k$ も確かめよ。

<!-- solution-start -->
**詳細解答**

質量殻の二乗を展開し、光子について $k^2=k'^2=0$ を使うと

$$
\begin{aligned}
r_s^2-m^2&=(p+k)^2-p^2=2p\cdot k,\\
r_u^2-m^2&=(p-k')^2-p^2=-2p\cdot k'.
\end{aligned}
$$

保存則 $p+k=p'+k'$ より第一の等式 $r_s=p'+k'$ がそのまま出ます。同じ保存則を $p-k'=p'-k$ と移項すれば第二の等式です。正エネルギーの質量 $m>0$ の電子と非零の実光子では $p\cdot k$、$p\cdot k'$ は正なので、両内部線は質量殻の極に一致しません。
<!-- solution-end -->

### 演習 QFT18-B1：入射光子のWard検査を再構成する

- Level: B
- 問題：$K(r)=\not r-mI_4$、$R(r)=K(r)^{-1}$、$K(p)u(p)=0$、$\bar u(p')K(p')=0$ とする。$p+k=p'+k'$ で定めた

$$
B^{\mu\nu}=\bar u(p')[
\gamma^\nu R(p+k)\gamma^\mu
+\gamma^\mu R(p-k')\gamma^\nu]u(p)
$$

について、入射光子運動量 $k_\mu$ との縮約を二項**別々**に求め、和が零であることを証明せよ。内部運動量が質量殻でないことを仮定する。

<!-- solution-start -->
**詳細解答**

第一項では $k=(p+k)-p$、第二項では $k=p'-(p-k')$ と書き分けるのが核心です。[逆核恒等式](#thm-qft18-tree-ward)をそれぞれの積の適切な位置へ置くと、

$$
\begin{aligned}
k_\mu\bar u(p')\gamma^\nu R(p+k)\gamma^\mu u(p)
&=\bar u(p')\gamma^\nu R(p+k)[K(p+k)-K(p)]u(p)\\
&=\bar u(p')\gamma^\nu u(p)
-\bar u(p')\gamma^\nu R(p+k)\underbrace{K(p)u(p)}_0\\
&=+\bar u(p')\gamma^\nu u(p).
\end{aligned}
$$

第二項については左端の随伴方程式を使い、

$$
\begin{aligned}
k_\mu\bar u(p')\gamma^\mu R(p-k')\gamma^\nu u(p)
&=\bar u(p')[K(p')-K(p-k')]R(p-k')\gamma^\nu u(p)\\
&=\underbrace{\bar u(p')K(p')}_0 R(p-k')\gamma^\nu u(p)
-\bar u(p')\gamma^\nu u(p)\\
&=-\bar u(p')\gamma^\nu u(p).
\end{aligned}
$$

二項を足すと $k_\mu B^{\mu\nu}=0$ です。第一項だけでは一般に零にならないので、二つの木図を落とさず含める必要があります。
<!-- solution-end -->

### 演習 QFT18-B2：出射光子のWard検査を再構成する

- Level: B
- 問題：前問と同じCompton過程、$B^{\mu\nu}$、質量殻条件・逆核条件を仮定する。今度は出射光子運動量 $k'_\nu$ で縮約し、第一項と第二項がそれぞれ $\pm\bar u(p')\gamma^\mu u(p)$ を与えることを示せ。

<!-- solution-start -->
**詳細解答**

保存則から $k'=(p+k)-p'$ と $k'=p-(p-k')$ の二通りが得られます。前者は第一項の左へ、後者は第二項の右へ入ります。

$$
\begin{aligned}
k'_\nu\bar u(p')\gamma^\nu R(p+k)\gamma^\mu u(p)
&=\bar u(p')[K(p+k)-K(p')]R(p+k)\gamma^\mu u(p)\\
&=\bar u(p')\gamma^\mu u(p)
-\underbrace{\bar u(p')K(p')}_0 R(p+k)\gamma^\mu u(p)\\
&=+\bar u(p')\gamma^\mu u(p).
\end{aligned}
$$

もう一つは

$$
\begin{aligned}
k'_\nu\bar u(p')\gamma^\mu R(p-k')\gamma^\nu u(p)
&=\bar u(p')\gamma^\mu R(p-k')[K(p)-K(p-k')]u(p)\\
&=\bar u(p')\gamma^\mu R(p-k')\underbrace{K(p)u(p)}_0
-\bar u(p')\gamma^\mu u(p)\\
&=-\bar u(p')\gamma^\mu u(p).
\end{aligned}
$$

したがって $k'_\nu B^{\mu\nu}=0$ です。この検査では入射光子の場合と逆に、最初に出射側のDirac方程式が使われます。
<!-- solution-end -->

### 演習 QFT18-B3：偏極ゲージシフトと一図だけの失敗

- Level: B
- 問題：Comptonの木レベル振幅を $\mathcal M=-q^2\epsilon_\mu\epsilon_\nu^*B^{\mu\nu}$ とする。両光子脚の横性を仮定し、$\epsilon_\mu\mapsto\epsilon_\mu+ak_\mu$、$\epsilon_\nu^*\mapsto\epsilon_\nu^*+bk'_\nu$ の任意の複素 $a,b$ に対し $\Delta\mathcal M=0$ を示せ。さらに $B_s^{\mu\nu}=\bar u(p')\gamma^\nu R(p+k)\gamma^\mu u(p)$ のみでは一般に不変でない理由を式で説明せよ。

<!-- solution-start -->
**詳細解答**

二つの括弧を掛けると元の項以外に

$$
\Delta\mathcal M=-q^2\bigl[
a k_\mu\epsilon_\nu^*B^{\mu\nu}
+b\epsilon_\mu k'_\nu B^{\mu\nu}
+ab k_\mu k'_\nu B^{\mu\nu}\bigr]
$$

が出ます。[二光子の横性](#thm-qft18-compton-ward)の第一式と第二式で、それぞれの項は零です。一方、[入射光子の計算](#thm-qft18-compton-ward)を第一図だけに適用すると

$$
k_\mu B_s^{\mu\nu}=\bar u(p')\gamma^\nu u(p)
$$

で、これは一般に零ではありません。例えば $k$ のシフトは第一図に $-q^2a\epsilon_\nu^*\bar u(p')\gamma^\nu u(p)$ を追加します。第二図の負の寄与を除外すると、その相殺が壊れます。
<!-- solution-end -->

### 演習 QFT18-B4：三点核のFourier変換を確認する

- Level: B
- 問題：$p'=p+k$、$R(r)=K(r)^{-1}$、$\mathscr G^\mu(p',p)=R(p')\gamma^\mu R(p)$ とし、

$$
\mathscr G^\mu(y,x,z)=
\int\frac{d^4p'\,d^4p}{(2\pi)^8}
e^{-ip'\cdot(y-x)}e^{-ip\cdot(x-z)}
\mathscr G^\mu(p',p)
$$

を定める。$k_\mu\mathscr G^\mu=R(p)-R(p')$ から、$\partial_{x^\mu}\mathscr G^\mu$ の二つのデルタ項とその符号を導け。なぜ挿入点 $x$ が二つの外部点から離れていれば発散が零なのかも説明せよ。

<!-- solution-start -->
**詳細解答**

指数を $x$ で微分したとき、最初の指数は $+ip'_\mu$、二番目は $-ip_\mu$ を出すため

$$
\partial_{x^\mu}(e^{-ip'(y-x)}e^{-ip(x-z)})
=i(p'_\mu-p_\mu)e^{-ip'(y-x)}e^{-ip(x-z)}.
$$

[逆核で挟んだWard恒等式](#thm-qft18-tree-ward)を代入すると

$$
\partial_{x^\mu}\mathscr G^\mu
=i\int\frac{d^4p'\,d^4p}{(2\pi)^8}
e^{-ip'(y-x)}e^{-ip(x-z)}[R(p)-R(p')].
$$

第一項では $p'$ 積分が $\delta^{(4)}(y-x)$ を与え、残る積分は $R(x-z)$。第二項では $p$ 積分が $\delta^{(4)}(x-z)$ を与え、残るのは $R(y-x)$ です。したがって

$$
\begin{aligned}
\partial_{x^\mu}\mathscr G^\mu
&=i\delta^{(4)}(x-y)R(x-z)
-i\delta^{(4)}(x-z)R(y-x)\\
&=\boxed{i[\delta^{(4)}(x-y)-\delta^{(4)}(x-z)]R(y-z)}.
\end{aligned}
$$

試験関数の支持が $x=y$ と $x=z$ のいずれにも触れなければ両デルタ分布は零です。これは[接触項恒等式](#thm-qft18-contact-identity)の位置空間での意味で、時間順序相関関数における端点の局所的寄与を表しています。
<!-- solution-end -->

### 演習 QFT18-C1：QED頂点から二光子のゲージ検査まで

- Level: C
- 問題：$m>0$ の一種類のDirac場と光子が $\mathcal L_{\rm int}=-q\bar\psi\gamma^\mu\psi A_\mu$ で結合する。Compton過程 $e^-(p)+\gamma(k)\to e^-(p')+\gamma(k')$ は $p+k=p'+k'$、$p^2=p'^2=m^2$、$k^2=k'^2=0$、全外線正エネルギー、非零光子エネルギーを満たすとする。以下を順に求めよ。

  1. 自由Dirac逆核 $K$ と $R=K^{-1}$ を定義し、$k_\mu\gamma^\mu=K(p+k)-K(p)$ を導け。
  2. 二つの電子内部線を持つ木図を組み、Feynman則の $i$ と $q$ の係数を含めて $\mathcal M$ を書け。
  3. 入射光子と出射光子のそれぞれについて、二つの図を個別に縮約して相殺を示せ。
  4. 二つの偏極を同時に縦方向へずらしても振幅が変化しないことを証明し、質量殻外の三点核では縮約が零でない理由を述べよ。

<!-- solution-start -->
**詳細解答**

**(1) 逆核と三点頂点。** [自由Dirac逆核](#def-qft18-inverse-kernel)は

$$
K(r)=\not r-mI_4,\qquad
R(r)=\frac{\not r+mI_4}{r^2-m^2+i0}.
$$

Clifford関係から $(\not r-m)(\not r+m)=(r^2-m^2)I_4$ なので $R$ は質量殻外で逆核です。$p+k$ と $p$ の差を取ると

$$
K(p+k)-K(p)
=\not p+\not k-mI_4-(\not p-mI_4)=\not k.
$$

**(2) 二図と振幅の係数。** [QFT17の頂点](../QFT17/index.md#def-qft17-vertex)は $-iq\gamma^\mu$、[QFT8のフェルミオン核](../QFT8/index.md#thm-qft8-propagator)は $iR$ です。二頂点の積は $(-iq)^2=-q^2$、内部線は $iR$ なので $i\mathcal M$ の係数は $-iq^2$ です。よって

$$
\begin{aligned}
i\mathcal M&=-iq^2\,\epsilon_\mu(k)\epsilon_\nu^*(k')\\
&\quad\times\bar u(p')[
\gamma^\nu R(p+k)\gamma^\mu
+\gamma^\mu R(p-k')\gamma^\nu]u(p),\\
\mathcal M&=-q^2\epsilon_\mu(k)\epsilon_\nu^*(k')B^{\mu\nu}.
\end{aligned}
$$

時間順序を交換する二頂点の寄与がDyson展開の $2!$ と相殺し、残る二つは電子線に沿った光子挿入順序です。[Comptonの運動学](#def-qft18-compton-tree)から内部分母はそれぞれ $2p\cdot k$ と $-2p\cdot k'$ で、正エネルギー・非零光子条件により零でありません。

**(3) 入射光子の縮約。** $K(p)u(p)=0$、$\bar u(p')K(p')=0$ を使うと、第一図は

$$
\begin{aligned}
\bar u\gamma^\nu R(p+k)\not k u
&=\bar u\gamma^\nu R(p+k)[K(p+k)-K(p)]u\\
&=+\bar u\gamma^\nu u.
\end{aligned}
$$

第二図では $k=p'-(p-k')$ を使って

$$
\begin{aligned}
\bar u\not k R(p-k')\gamma^\nu u
&=\bar u[K(p')-K(p-k')]R(p-k')\gamma^\nu u\\
&=-\bar u\gamma^\nu u.
\end{aligned}
$$

したがって $k_\mu B^{\mu\nu}=0$ です。

**出射光子の縮約。** 第一図で $k'=(p+k)-p'$、第二図で $k'=p-(p-k')$ を使うと

$$
\begin{aligned}
\bar u\not k'R(p+k)\gamma^\mu u
&=\bar u[K(p+k)-K(p')]R(p+k)\gamma^\mu u
=+\bar u\gamma^\mu u,\\
\bar u\gamma^\mu R(p-k')\not k'u
&=\bar u\gamma^\mu R(p-k')[K(p)-K(p-k')]u
=-\bar u\gamma^\mu u.
\end{aligned}
$$

第一式は左の $\bar uK(p')=0$、第二式は右の $K(p)u=0$ を使いました。よって $k'_\nu B^{\mu\nu}=0$ です。各図だけでは非零の中間電流が残ることも明示できました。

**(4) 偏極ゲージ不変性と接触項。** $\epsilon_\mu\mapsto\epsilon_\mu+ak_\mu$、$\epsilon_\nu^*\mapsto\epsilon_\nu^*+bk'_\nu$ を同時に行うと

$$
\begin{aligned}
\Delta\mathcal M=-q^2\bigl[
a k_\mu\epsilon_\nu^*B^{\mu\nu}
+b\epsilon_\mu k'_\nu B^{\mu\nu}
+ab k_\mu k'_\nu B^{\mu\nu}\bigr]=0.
\end{aligned}
$$

ただし両端を質量殻に置かない三点核では、[非切断核のWard恒等式](#thm-qft18-contact-identity)に従って

$$
k_\mu R(p')\gamma^\mu R(p)=R(p)-R(p')
$$

が一般に残ります。位置空間ではこれは二つのデルタ接触項です。**外線の質量殻条件と二図の和**が物理的な散乱振幅の横性を導くのであり、全てのGreen関数の縦縮約を無条件に零としたわけではありません。
<!-- solution-end -->

## 7. まとめと次の問い

自由Dirac逆核の差は三点頂点の縦縮約と一致し、非切断三点核の差は位置空間の接触項へ移ります。質量殻外線では両端のDirac方程式がその差を消します。Compton散乱では、光子を電子線へ挿入する順序が二通りあり、それぞれの縦縮約が正負で打ち消し合います。

次の生成汎関数・経路積分の講義では、自由場のこの計算を相関関数を生む操作として整理します。ループ補正においてもWard–Takahashi関係を保つには、**どの自由度を積分し、どの正則化を選び、どの接触項を残すか**を考えなければなりません。

