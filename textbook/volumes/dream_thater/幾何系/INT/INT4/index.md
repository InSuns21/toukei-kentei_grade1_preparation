# INT4 近可積分Hamilton系と小分母

[作用角変数](../INT3/index.md#def-int3-action-angle)があれば、可積分Hamilton系の解は作用が一定、角度が一定速度という形に直せます。ところが現実の二振動子には弱い結合があり、角度によってエネルギーの分配が少しずつ変わります。結合の係数が小さいのだから、角度に依存する項を座標変換で取り除けばよいように思えます。

実際には、その変換をFourierモードごとに作る際、整数ベクトル $k$ と振動数 $\Omega$ の内積 $k\cdot\Omega$ で割る必要があります。これが零なら**共鳴**、零でなくとも任意に小さくなるなら**小分母問題**です。小さい摂動が常に小さい座標変換で消せるとは限りません。この章では、最初に有限個のモードを厳密に解き、次に無限級数で何が壊れるかを示し、Diophantine条件の役割を評価式まで確かめます。

## 1. 摂動後は何が保存されなくなるか

$n\ge2$、$D\subset\mathbb R^n$ を開集合、$\mathbb T^n=(\mathbb R/2\pi\mathbb Z)^n$ とします。[局所作用角座標定理](../INT3/index.md#thm-int3-local-action-angle)により正準形式を $\omega=\sum_jd\theta_j\wedge dI_j$ と書ける領域で、滑らかな実数値関数 $K:D\to\mathbb R$、$f:D\times\mathbb T^n\to\mathbb R$ と実数 $\varepsilon$ を考えます。

<a id="def-int4-near-integrable"></a>

<!-- formal-statement-start -->
> **定義（近可積分Hamilton系）**  
> 上記の正準座標領域において
>
$$
H_\varepsilon(I,\theta)=K(I)+\varepsilon f(I,\theta),\qquad
\Omega(I)=\nabla_I K(I)
$$
>
> と表されるHamilton系を、$K$ を非摂動系とする近可積分Hamilton系という。$\varepsilon$ は摂動の大きさを表すパラメータである。小さいという判断は、指定した作用領域と関数のノルムに相対的である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-int4-near-integrable -->
### 直接例：弱く結合した二振動子

**定義の確認**：非摂動項が作用だけに依存し、摂動項が角度に周期的に依存する条件を調べます。

$K(I)=I_1+\sqrt2I_2$、$f(I,\theta)=\cos(\theta_1-\theta_2)$ とします。$K$ は作用だけの関数であり、$f$ は $2\pi$ 周期で、$H_\varepsilon=K+\varepsilon f$ は定義の形です。$\Omega=(1,\sqrt2)$ を持つ非摂動系では $\dot I=0$ です。摂動後は角度差に依存して作用が動きます。
<!-- definition-example-end -->

[正準Hamilton方程式](../../SYM/SYM4/index.md#thm-sym4-existence-coordinate)を $(q,p)=(\theta,I)$ に適用すると、
$$
\dot\theta_j=\partial_{I_j}K+\varepsilon\partial_{I_j}f,\qquad
\dot I_j=-\varepsilon\partial_{\theta_j}f .
$$
たとえば上の $f$ なら $\partial_{\theta_1}f=-\sin(\theta_1-\theta_2)$、$\partial_{\theta_2}f=\sin(\theta_1-\theta_2)$ なので
$$
\dot I_1=\varepsilon\sin(\theta_1-\theta_2),\qquad
\dot I_2=-\varepsilon\sin(\theta_1-\theta_2).
$$
したがって $I_1+I_2$ はこの例では保存されますが、各作用は一般には保存されません。$|\varepsilon|$ が小さくても、長い時間の積分で変化が蓄積する可能性が残ります。なお、以下の一次摂動計算では無限時間にわたる近似の正当性を**仮定しません**。

## 2. Fourier係数と、消したい平均以外の部分

まず作用 $I$ を固定し、角度関数だけを調べます。多変数の複素Fourier係数は、[Fourier係数の積分による抽出](../../../解析系/FOU/FOU1/index.md#def-fou1-complex-exponential-coefficient)を各角度に繰り返すことで得られます。

<a id="def-int4-angle-average"></a>

<!-- formal-statement-start -->
> **定義（角度平均とFourierモード）**  
> $f(I,\cdot)$ が $\mathbb T^n$ 上で積分可能なとき、そのFourier係数と角度平均を
>
$$
f_k(I)=\frac1{(2\pi)^n}\int_{[0,2\pi]^n}
f(I,\theta)e^{-ik\cdot\theta}\,d\theta,\qquad
\langle f\rangle(I)=f_0(I)
$$
>
> とする。ここで $k\in\mathbb Z^n$。十分な収束条件の下で $f=\sum_{k\in\mathbb Z^n}f_k e^{ik\cdot\theta}$ と表せる。実数値 $f$ なら $f_{-k}=\overline{f_k}$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-int4-angle-average -->
### 直接例：平均は零モードだけ

**定義の確認**：平均積分と各Fourier係数を実際に計算します。

$f(\theta)=3+2\cos\theta_1-\sin(\theta_1+\theta_2)$ とすると、各非定数項の角度積分は零です。ゆえに $\langle f\rangle=3$、$f-\langle f\rangle=2\cos\theta_1-\sin(\theta_1+\theta_2)$ です。具体的には $f_{(1,0)}=f_{(-1,0)}=1$、$f_{(1,1)}=i/2$、$f_{(-1,-1)}=-i/2$ となり、定義した積分と一致します。
<!-- definition-example-end -->

目指すのは、角度依存成分を一次の正準変換で消すことです。未知関数 $\chi(I,\theta)$ のHamilton流を短い時間 $\varepsilon$ だけ動かす写像を $\Phi_\chi^\varepsilon$ と書きます。$I$ を固定して考える線形方程式の段階では、$\chi$ を生成関数の候補と見るだけで十分です。

<a id="def-int4-homological"></a>

<!-- formal-statement-start -->
> **定義（一次ホモロジー方程式）**  
> 上の $K,f$ と、固定した作用 $I\in D$ における $\Omega(I)=\nabla K(I)$ に対し、未知の $2\pi$ 周期関数 $\chi(I,\theta)$ が
>
$$
\Omega(I)\cdot\partial_\theta\chi(I,\theta)
=f(I,\theta)-\langle f\rangle(I),\qquad
\langle\chi\rangle(I)=0
$$
>
> を満たす方程式を、一次ホモロジー方程式という。後者は解の角度平均を固定する規格化である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-int4-homological -->
### 直接例：二つの波を一つずつ積分する

**定義の確認**：方向微分の等式と零平均の規格化を代入で検査します。

$\Omega=(1,2)$、$f=3+2\cos\theta_1-\sin(\theta_1+\theta_2)$ とします。
$$
\chi=2\sin\theta_1+\frac13\cos(\theta_1+\theta_2)
$$
と選ぶと、$\partial_{\theta_1}\chi+2\partial_{\theta_2}\chi=2\cos\theta_1-\sin(\theta_1+\theta_2)$ です。双方の正弦・余弦の角度平均が零なので $\langle\chi\rangle=0$ も満たします。分母の $3$ は第二の波の振動数 $1+2$ から来ています。
<!-- definition-example-end -->

なぜこの方程式で正準変換ができるのでしょうか。[Hamiltonベクトル場とPoisson括弧](../../SYM/SYM4/index.md#def-sym4-poisson-bracket)の符号規約では、$X_\chi(K)=\{K,\chi\}=-\Omega\cdot\partial_\theta\chi$ です。$f,\chi$ が十分滑らかで、流れが定義されるコンパクト領域と短い時間を固定すると、時間に関する微分積分から
$$
\begin{aligned}
H_\varepsilon\circ\Phi_\chi^\varepsilon
&=H_\varepsilon+\varepsilon X_\chi(H_\varepsilon)+O(\varepsilon^2)\\
&=K+\varepsilon\bigl(f-\Omega\cdot\partial_\theta\chi\bigr)
+O(\varepsilon^2)\\
&=K+\varepsilon\langle f\rangle+O(\varepsilon^2).
\end{aligned}
$$
最初の余剰項は $X_\chi(f)$ に係数 $\varepsilon^2$ が掛かること、および流れに沿った二階の積分余剰から生じます。ただしこれは **$\chi$ とその必要な導関数が制御される場合の局所的な有限時間展開** であり、Fourier形式解にその制御があるとはまだ言っていません。

## 3. 共鳴では割り算そのものができない

角度関数 $e^{ik\cdot\theta}$ を角度方向に微分すると、
$$
\Omega\cdot\partial_\theta e^{ik\cdot\theta}
=i(k\cdot\Omega)e^{ik\cdot\theta}.
$$
したがって $k$ 番目の係数を比較すると、$k\ne0$ に対して
$$
i(k\cdot\Omega)\chi_k=f_k
$$
です。分母は $|k|$ ではなく、整数周波数の**符号付きの組合せ** $k\cdot\Omega$ です。

<a id="def-int4-resonance"></a>

<!-- formal-statement-start -->
> **定義（整数共鳴と非共鳴振動数）**  
> $\Omega\in\mathbb R^n$ と $k\in\mathbb Z^n\setminus\{0\}$ に対して
>
$$
k\cdot\Omega=0
$$
>
> なら $k$ を $\Omega$ の共鳴ベクトル、対応するFourierモードを共鳴モードという。そのような非零整数ベクトルが一つもなければ $\Omega$ を非共鳴振動数という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-int4-resonance -->
### 直接例：振動数が $2:3$ の二つの角度

**定義の確認**：整数波数と振動数の内積が零になることを確かめます。

$\Omega=(2,3)$、$k=(3,-2)$ とすれば $k\cdot\Omega=6-6=0$ です。実際、非摂動の解 $\theta(t)=\theta(0)+(2,3)t$ に沿って $3\theta_1(t)-2\theta_2(t)$ は一定です。$\cos(3\theta_1-2\theta_2)$ は時間平均でも消えず、角度全体の平均が零であることと異なります。
<!-- definition-example-end -->

<a id="prop-int4-finite-modes"></a>

<!-- formal-statement-start -->
> **命題（有限Fourier和のホモロジー方程式）**  
> $\Omega\in\mathbb R^n$ を固定し、零平均の三角多項式 $g(\theta)=\sum_{k\in S}g_k e^{ik\cdot\theta}$ を考える。$S\subset\mathbb Z^n\setminus\{0\}$ は有限で、$g_{-k}=\overline{g_k}$ とする。$g_k\ne0$ の全ての $k$ で $k\cdot\Omega\ne0$ なら、$\Omega\cdot\partial_\theta\chi=g$ は零平均の実三角多項式解
>
$$
\chi(\theta)=
\sum_{\substack{k\in S\\g_k\ne0}}\frac{g_k}{i\,k\cdot\Omega}\,e^{ik\cdot\theta}
$$
>
> を持つ。逆に $g_k\ne0$ かつ $k\cdot\Omega=0$ であるモードがあれば周期的な $C^1$ 解は存在しない。なお非共鳴でも、有限和を超えた無限級数の収束はこの命題から従わない。
<!-- formal-statement-end -->

### 証明の見取り図

有限和なら微分と和の交換に問題はありません。共鳴モードを微分で作ることはできず、係数比較だけで解の不存在も分かります。

<!-- proof-start -->
### 証明

非共鳴の各 $k$ に対し $\chi_k=g_k/(ik\cdot\Omega)$ と置きます。すると
$$
\Omega\cdot\partial_\theta(\chi_k e^{ik\cdot\theta})
=i(k\cdot\Omega)\chi_k e^{ik\cdot\theta}
=g_ke^{ik\cdot\theta}.
$$
有限個を加えれば右辺は $g$ です。$k\ne0$ の項しかないので $\langle\chi\rangle=0$ です。また
$$
\chi_{-k}=\frac{\overline{g_k}}{-i(k\cdot\Omega)}
=\overline{\frac{g_k}{i(k\cdot\Omega)}}
=\overline{\chi_k},
$$
従って $\chi$ は実数値です。逆に $C^1$ の周期解があれば、$\Omega\cdot\partial_\theta\chi$ の $k$ 番目のFourier係数は部分積分により $i(k\cdot\Omega)\chi_k$ です。$k\cdot\Omega=0$ ならその係数は零であり、$g_k\ne0$ と矛盾します。
<!-- proof-end -->

共鳴があると変換が失敗することは、座標の技術的な問題だけではありません。実際の運動に時間に比例する変化が現れます。これは第6節で厳密解により確認します。

## 4. 非共鳴でも小分母は避けられない

$\Omega=(1,\sqrt2)$ では、$a+b\sqrt2=0$ となる非零整数対 $(a,b)$ は存在しません。一方、整数 $a,b$ の選び方によって $|a+b\sqrt2|$ を極めて小さくできます。「分母が零ではない」と「分母が一様に零から離れている」は別です。

<a id="thm-int4-irrational-small-divisors"></a>

<!-- formal-statement-start -->
> **定理（無理数振動数には任意に小さい分母がある）**  
> $\alpha\in\mathbb R\setminus\mathbb Q$ とする。任意の正整数 $N$ に対し、$1\le q\le N$ と $p\in\mathbb Z$ が存在し、
>
$$
0<|q\alpha-p|<\frac1N
$$
>
> が成り立つ。従って $\Omega=(1,\alpha)$ は非共鳴だが、非零整数ベクトル $k=(-p,q)$ に沿って $|k\cdot\Omega|$ の下限は零である。
<!-- formal-statement-end -->

### 証明の見取り図

円周上の $N+1$ 個の小数部分を $N$ 個の区間に入れ、同じ区間に入る二つの差を取ります。これは高級な近似定理を使わずに小分母の存在を示す方法です。

<!-- proof-start -->
### 証明

$0,\alpha,2\alpha,\ldots,N\alpha$ の小数部分を $x_j=\{j\alpha\}\in[0,1)$ とします。区間 $[0,1)$ を
$$
[0,1/N),[1/N,2/N),\ldots,[(N-1)/N,1)
$$
の $N$ 個に分けます。$N+1$ 個の点のうち二つ $x_r,x_s$（$0\le r<s\le N$）は同じ区間にあります。よって $|x_s-x_r|<1/N$ です。整数部分を $m_j=\lfloor j\alpha\rfloor$ と書くと
$$
x_s-x_r=(s-r)\alpha-(m_s-m_r).
$$
$q=s-r$、$p=m_s-m_r$ と選べば $1\le q\le N$ かつ $|q\alpha-p|<1/N$ です。$\alpha$ は無理数、$q\ge1$ なので等号零は不可能です。$k=(-p,q)$ に対し $k\cdot(1,\alpha)=q\alpha-p$ です。$N$ は任意なので下限は零です。
<!-- proof-end -->

ここで重要なのは、各 $k$ の分母が零でないのに、全ての $k$ を通じて一つの正の下界を与えられない点です。たとえば $g_k$ が小さくても、$\chi_k=g_k/(ik\cdot\Omega)$ が小さいとは限りません。有限個のモードでは最小分母を取れますが、無限個ではその操作ができません。

## 5. Diophantine条件はどの損失まで許すか

小分母の消失速度を多項式で抑えられれば、Fourier係数の減衰で補える可能性があります。分母そのものを一定以上にするのでなく、「高周波ほど小さくなってよいが、速すぎてはいけない」とします。

<a id="def-int4-diophantine"></a>

<!-- formal-statement-start -->
> **定義（Diophantine振動数）**  
> $\gamma>0$、$\tau\ge0$ とし、$|k|_1=\sum_{j=1}^n|k_j|$ とする。$\Omega\in\mathbb R^n$ が
>
$$
|k\cdot\Omega|\ge\gamma |k|_1^{-\tau}
\quad\text{for every }k\in\mathbb Z^n\setminus\{0\}
$$
>
> を満たすとき、$\Omega$ は定数 $(\gamma,\tau)$ に対するDiophantine条件を満たすという。これは非共鳴を含意するが、非共鳴だけでは逆に含意されない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-int4-diophantine -->
### 直接例：$(1,\sqrt2)$ は具体的に評価できる

**定義の確認**：任意の非零整数波数に共通するDiophantine下界を示します。

$k=(a,b)\ne(0,0)$ なら $a^2-2b^2$ は零でない整数なので、その絶対値は少なくとも $1$ です。したがって
$$
|a+b\sqrt2|\,|a-b\sqrt2|
=|a^2-2b^2|\ge1,
$$
$$
|a+b\sqrt2|\ge\frac1{|a-b\sqrt2|}
\ge\frac1{\sqrt2(|a|+|b|)}.
$$
最後の評価は $|a-b\sqrt2|\le|a|+\sqrt2|b|\le\sqrt2|k|_1$ によります。よって $\Omega=(1,\sqrt2)$ は $(\gamma,\tau)=(1/\sqrt2,1)$ に対する条件を満たします。分母は任意に零へ近づいても、$|k|_1^{-1}$ より速くは減少しません。
<!-- definition-example-end -->

<a id="prop-int4-fourier-regularity"></a>

<!-- formal-statement-start -->
> **命題（小分母による微分階数の損失）**  
> $n\ge2$、$r$ を正整数、$s$ を非負整数とする。$\Omega\in\mathbb R^n$ は $(\gamma,\tau)$ のDiophantine条件を満たし、実数値 $g\in C^r(\mathbb T^n)$ は $\langle g\rangle=0$ とする。
>
> $r>s+\tau+n$ なら、Fourier係数で指定される零平均解
>
$$
\chi(\theta)=
\sum_{k\in\mathbb Z^n\setminus\{0\}}
\frac{g_k}{i\,k\cdot\Omega}e^{ik\cdot\theta}
$$
>
> は $C^s$ 関数として絶対かつ一様に収束する。その $s$ 階までの形式的な角度微分級数も同様に収束し、$\Omega\cdot\partial_\theta\chi=g$ が成り立つ（$s\ge1$ では通常の微分の意味、$s=0$ では分布の意味）。この結果は固定振動数での線形方程式に限る。
<!-- formal-statement-end -->

### 証明の見取り図

$g$ を $r$ 回部分積分して係数を $|k|^{-r}$ で評価します。除算すると $|k|^\tau$ が掛かり、$s$ 階微分でさらに $|k|^s$ が掛かります。各半径の格子点が約 $m^{n-1}$ 個であることまで数える必要があります。

<!-- proof-start -->
### 証明

$k\ne0$ を取り、$|k_j|\ge|k|_1/n$ となる成分 $j$ を選びます。トーラスの周期境界で部分積分の境界項は相殺され、$j$ 成分について $r$ 回積分すると
$$
g_k=\frac{1}{(ik_j)^r(2\pi)^n}
\int_{[0,2\pi]^n}(\partial_{\theta_j}^r g)(\theta)
e^{-ik\cdot\theta}\,d\theta.
$$
従って $\|\partial_{\theta_j}^r g\|_\infty\le M_r$ とおけば
$$
|g_k|\le M_r|k_j|^{-r}
\le n^rM_r|k|_1^{-r}.
$$
Diophantine条件によって
$$
|\chi_k|=\frac{|g_k|}{|k\cdot\Omega|}
\le\frac{n^rM_r}{\gamma}|k|_1^{\tau-r}.
$$
次数 $|\beta|\le s$ の角度微分では乗数 $\prod_j|k_j|^{\beta_j}\le|k|_1^{|\beta|}$ が現れるため
$$
|\partial_\theta^\beta(\chi_ke^{ik\cdot\theta})|
\le\frac{n^rM_r}{\gamma}|k|_1^{s+\tau-r}.
$$
$|k|_1=m$ の整数点では、非負整数の組 $(|k_1|,\ldots,|k_n|)$ の和が $m$ です。そのような組は $\binom{m+n-1}{n-1}$ 個で、符号の選び方は高々 $2^n$ 通りです。従って
$$
\#\{k\in\mathbb Z^n:|k|_1=m\}
\le2^n\binom{m+n-1}{n-1}
\le C_nm^{n-1}
$$
と評価できます。よって全項の大きさの和は定数倍の
$$
\sum_{m=1}^\infty m^{n-1+s+\tau-r}
$$
以下です。条件 $r>s+\tau+n$ の下では、和の指数が $-1$ より小さくなり、級数は収束します。この総和の尾部は、$m>M$ の上記の収束級数の尾部で一様に抑えられ、$M\to\infty$ で零へ収束します。従って $\chi$ と次数 $s$ 以下の項別微分級数は絶対一様収束します。$s\ge1$ では、有限部分和 $S_M=\sum_{0<|k|_1\le M}\chi_ke^{ik\cdot\theta}$ の $j$ 方向の微分が連続関数 $T_j$ に一様収束するので、
$$
S_M(\theta+he_j)-S_M(\theta)
=\int_0^h\partial_{\theta_j}S_M(\theta+ue_j)\,du
$$
で $M\to\infty$ として $\partial_{\theta_j}\chi=T_j$ を得ます。同じ議論を高階微分に繰り返せば、次数 $s$ 以下で項別に作った微分級数が、実際の導関数を表します。

係数ごとには $i(k\cdot\Omega)\chi_k=g_k$ が成り立ちます。さらに $s,\tau\ge0$ と $r>s+\tau+n$ から $r>n$ であり、$|g_k|\le n^rM_r|k|_1^{-r}$ より、$g$ のFourier級数
$$
G(\theta)=\sum_{k\in\mathbb Z^n\setminus\{0\}}g_ke^{ik\cdot\theta}
$$
も絶対一様収束し、連続関数 $G$ を定めます。

一様収束による項別積分で、$G$ のFourier係数は $g_k$ となります。また、$g_0=0$ です。このため $h=G-g$ は連続で、すべてのFourier係数が零です。

[Fejér平均の一様収束](../../../解析系/FOU/FOU2/index.md#thm-fou2-fejer-uniform)を各角度に順に適用すると、$h$ の矩形Fejér平均は $h$ へ一様収束します。一方、各平均は零係数から作られる有限和なので恒等的に零です。従って $G=g$ と分かります。

$s\ge1$ なら項別微分から $\Omega\cdot\partial_\theta\chi=G=g$ です。$s=0$ でも分布として同じ等式が成立します。実際、有限部分和 $S_M$ と滑らかな周期試験関数 $\varphi$ に対し、周期境界の部分積分により
$$
\int_{\mathbb T^n}S_M\,\Omega\cdot\partial_\theta\varphi\,d\theta
=-\int_{\mathbb T^n}(\Omega\cdot\partial_\theta S_M)\varphi\,d\theta.
$$
左辺は $S_M\to\chi$ の一様収束、右辺は $\Omega\cdot\partial_\theta S_M\to G=g$ の一様収束から極限を取れます。従って $\Omega\cdot\partial_\theta\chi=g$ は分布の意味でも成立します。

実数値性と零平均性は $g_{-k}=\overline{g_k}$ と零モードを除いたことから従います。
<!-- proof-end -->

この命題で $C^r$ の正則性を $C^s$ まで失うのは、あくまで一回の線形な除算の評価です。$K$ に依存する $\Omega(I)$ を作用全域で扱うとき、作用微分や共鳴集合の位置も考える必要があります。まして無限回の正準変換の収束を証明したわけではありません。KAM定理では非退化性、作用領域の除外、反復余剰の制御を別に組み立てます。

## 6. 永年項：時間に比例する変化は本当に起こる

最も単純なモデルを**近似でなく厳密に**解きます。$K(I)=\Omega\cdot I$、$f(\theta)=a\cos(k\cdot\theta)$、$k\in\mathbb Z^n\setminus\{0\}$、$a\in\mathbb R$ とします。この $K$ では $\Omega$ は作用に依存せず、摂動も作用に依存しないため、角度方程式は摂動下でも $\dot\theta=\Omega$ です。

<a id="prop-int4-secular"></a>

<!-- formal-statement-start -->
> **命題（単一Fourierモードの永年項）**  
> $H_\varepsilon(I,\theta)=\Omega\cdot I+\varepsilon a\cos(k\cdot\theta)$ の初期値 $(I^0,\theta^0)$ に対する解は $\theta(t)=\theta^0+\Omega t$ であり、$\lambda=k\cdot\Omega\ne0$ なら
>
$$
I(t)=I^0+\frac{\varepsilon a k}{\lambda}
\bigl[\cos(k\cdot\theta^0)-\cos(k\cdot\theta^0+\lambda t)\bigr].
$$
>
> $\lambda=0$ なら
>
$$
I(t)=I^0+\varepsilon a k\,t\sin(k\cdot\theta^0).
$$
>
> 後者の時間に比例する項を永年項という。非共鳴なら $|I(t)-I^0|$ は全時刻で $2|\varepsilon a||k|_1/|\lambda|$ 以下に抑えられる（$1$-ノルムによる）。
<!-- formal-statement-end -->

### 証明の見取り図

角度は一定速度で動くため、作用方程式は正弦関数の時間積分だけになります。$\lambda\ne0$ では原始関数に $1/\lambda$ が現れ、$\lambda=0$ では被積分関数が定数になって積分結果が $t$ に比例します。

<!-- proof-start -->
### 証明

[正準Hamilton方程式](../../SYM/SYM4/index.md#thm-sym4-existence-coordinate)より
$$
\dot\theta=\partial_IH_\varepsilon=\Omega,\qquad
\dot I=-\partial_\theta H_\varepsilon
=\varepsilon a k\sin(k\cdot\theta).
$$
最初の式を積分し $\theta(t)=\theta^0+\Omega t$ を得て、二番目へ代入すると
$$
I(t)-I^0=\varepsilon a k\int_0^t
\sin(k\cdot\theta^0+\lambda u)\,du.
$$
$\lambda\ne0$ なら $\int_0^t\sin(c+\lambda u)\,du=[-\cos(c+\lambda u)/\lambda]_0^t$ なので所望の式です。$\lambda=0$ では積分値が $t\sin c$ です。前者の角括弧内の絶対値は $2$ 以下だから
$$
\|I(t)-I^0\|_1\le
\frac{2|\varepsilon a||k|_1}{|\lambda|}.
$$
これは近似でなく、モデルが定義される全時刻での厳密な評価です。
<!-- proof-end -->

共鳴では角度全体の平均 $\langle f\rangle=0$ でも時間平均は零でない場合があります。非共鳴でも、上界の係数が $1/|\lambda|$ に比例するため、全モードを一度に処理するには先の[Diophantine条件](#def-int4-diophantine)のような情報が必要です。ただし非共鳴の有限一モードに対し永年項が生じると述べているのではありません。

## 7. 演習：分母・共鳴・正則性を手で追う

### Level A

<a id="ex-int4-a01"></a>
**A1. 作用の変化と残る保存量。** $H=I_1+\sqrt2I_2+\varepsilon\cos(\theta_1-\theta_2)$ のHamilton方程式を求め、$I_1+I_2$ が保存されることを示せ。

- Level: A

<!-- solution-start -->
**詳細解答。** $\partial_{I_1}H=1$、$\partial_{I_2}H=\sqrt2$、$\partial_{\theta_1}H=-\varepsilon\sin(\theta_1-\theta_2)$、$\partial_{\theta_2}H=\varepsilon\sin(\theta_1-\theta_2)$ です。[正準Hamilton方程式](../../SYM/SYM4/index.md#thm-sym4-existence-coordinate)へ代入すると
$$
\dot\theta=(1,\sqrt2),\qquad
\dot I=(\varepsilon\sin(\theta_1-\theta_2),-\varepsilon\sin(\theta_1-\theta_2)).
$$
従って $d(I_1+I_2)/dt=\dot I_1+\dot I_2=0$ です。各 $I_j$ は一般には一定でありません。
<!-- solution-end -->

<a id="ex-int4-a02"></a>
**A2. 平均と生成関数の検算。** $\Omega=(1,2)$ と $f=3+2\cos\theta_1-\sin(\theta_1+\theta_2)$ について、$\langle f\rangle$ と零平均のホモロジー方程式の解 $\chi$ を求め、代入して確認せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** 非定数項の周期積分は零で $\langle f\rangle=3$ です。$\Omega\cdot\partial_\theta\sin\theta_1=\cos\theta_1$、$\Omega\cdot\partial_\theta\cos(\theta_1+\theta_2)=-3\sin(\theta_1+\theta_2)$ なので
$$
\chi=2\sin\theta_1+\frac13\cos(\theta_1+\theta_2).
$$
実際 $(\partial_{\theta_1}+2\partial_{\theta_2})\chi=2\cos\theta_1-\sin(\theta_1+\theta_2)=f-\langle f\rangle$ です。各項の平均は零なので規格化も成立します。
<!-- solution-end -->

<a id="ex-int4-a03"></a>
**A3. 厳密な共鳴。** $\Omega=(2,3)$、$f(\theta)=\cos(3\theta_1-2\theta_2)$ とする。共鳴ベクトルを特定し、$\Omega\cdot\partial_\theta\chi=f$ に周期解がないことを示せ。

- Level: A

<!-- solution-start -->
**詳細解答。** $k=(3,-2)$ とすると $k\cdot\Omega=3\cdot2-2\cdot3=0$ です。$\cos(k\cdot\theta)$ の係数は $f_k=f_{-k}=1/2$ です。一方、周期関数 $\chi$ の $\Omega\cdot\partial_\theta\chi$ の $k$ 係数は $i(k\cdot\Omega)\chi_k=0$ です。$1/2$ と等しくできないため、[有限Fourier和に関する命題](#prop-int4-finite-modes)の逆方向により周期的な $C^1$ 解はありません。
<!-- solution-end -->

<a id="ex-int4-a04"></a>
**A4. 二次無理数の分母評価。** $k=(-7,5)$ と $\Omega=(1,\sqrt2)$ に対し $k\cdot\Omega$ を求め、第5節の下界と数値的に矛盾しないことを確かめよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $k\cdot\Omega=5\sqrt2-7$、$|k|_1=12$ です。$5\sqrt2-7>0$ で、およそ $0.0710678$ です。[二次無理数の評価](#def-int4-diophantine)による下界は $1/(12\sqrt2)\approx0.0589256$ なので
$$
|5\sqrt2-7|\approx0.0710678
>0.0589256\approx\frac1{12\sqrt2}.
$$
分母が小さいことと下界の破綻は異なります。
<!-- solution-end -->

### Level B

<a id="ex-int4-b01"></a>
**B1. 有限モードの解の構成。** $\Omega=(2,1)$、$g(\theta)=4\cos(\theta_1+\theta_2)+3\sin(\theta_1-\theta_2)$ とする。零平均の実三角多項式解を作り、各モードで分母を確認せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $k_1=(1,1)$ なら $k_1\cdot\Omega=3$、$k_2=(1,-1)$ なら $k_2\cdot\Omega=1$ です。共鳴しないので
$$
\chi(\theta)=\frac43\sin(\theta_1+\theta_2)-3\cos(\theta_1-\theta_2)
$$
と置けます。実際、第一項の方向微分は $(4/3)\cdot3\cos(\theta_1+\theta_2)=4\cos(\theta_1+\theta_2)$、第二項は $-3\cdot(-1)\sin(\theta_1-\theta_2)=3\sin(\theta_1-\theta_2)$ です。平均は零です。これは[有限モードの公式](#prop-int4-finite-modes)の実三角関数版です。
<!-- solution-end -->

<a id="ex-int4-b02"></a>
**B2. 小数部分の区間分割から小分母を作る。** $\alpha$ を無理数、$N\ge2$ を整数として $0,\alpha,\ldots,N\alpha$ の小数部分を $N$ 区間へ配置し、$0<|q\alpha-p|<1/N$ を満たす整数 $1\le q\le N,p$ を構成せよ。なぜこの $q$ を無限回同じ値に固定できないかも示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** $x_j=\{j\alpha\}$ を $[m/N,(m+1)/N)$（$m=0,\ldots,N-1$）のいずれかへ入れます。$N+1$ 点と $N$ 区間だから、$x_r,x_s$（$r<s$）が同じ区間に入ります。$q=s-r$、$p=\lfloor s\alpha\rfloor-\lfloor r\alpha\rfloor$ とすれば
$$
|q\alpha-p|=|x_s-x_r|<1/N,\qquad1\le q\le N.
$$
無理数性より $q\alpha-p\ne0$ です。固定した $q$ に対する $\delta_q=\operatorname{dist}(q\alpha,\mathbb Z)$ は正で、上の不等式が成り立つのは $1/N>\delta_q$ の場合だけです。従って一つの $q$ が任意に大きい $N$ に繰り返し使われることはありません。もし有限個の $q$ しか出現しなければ、それらの $\delta_q$ の最小値は正となります。しかし $1/N\to0$ に矛盾します。従って $q$ は無限に大きくなる部分列を持ちます。
<!-- solution-end -->

<a id="ex-int4-b03"></a>
**B3. 正則性損失を再導出する。** $\Omega$ が $(\gamma,\tau)$ のDiophantine条件を満たし、$g\in C^r(\mathbb T^n)$ が零平均であるとする。$r$ 回の部分積分、Fourier係数の除算、格子点の個数を順に用い、$r>s+\tau+n$ なら $\chi$ の $s$ 階までのFourier微分級数が一様絶対収束することを示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** 各 $k\ne0$ に対して $|k_j|\ge|k|_1/n$ となる $j$ を選びます。周期境界の部分積分を $r$ 回行うと、$M_r=\max_j\|\partial_{\theta_j}^rg\|_\infty$ により
$$
|g_k|\le M_r|k_j|^{-r}\le n^rM_r|k|_1^{-r}.
$$
一方 $|k\cdot\Omega|\ge\gamma|k|_1^{-\tau}$ なので
$$
|\chi_k|\le\frac{n^rM_r}{\gamma}|k|_1^{\tau-r}.
$$
次数 $|\beta|\le s$ の微分はさらに $|k|_1^{|\beta|}$ 以下を掛けます。$|k|_1=m$ の格子点は、非負整数への分配が $\binom{m+n-1}{n-1}$ 通り、各成分の符号が高々 $2^n$ 通りなので、個数は $O(m^{n-1})$ です。従って合計は定数倍の $\sum_{m\ge1}m^{n-1+s+\tau-r}$ 以下です。$r>s+\tau+n$ なら指数が $-1$ 未満で収束するため、各微分級数は一様絶対収束します。無限級数の結論には、単に各 $k\cdot\Omega\ne0$ だけでは足りません。
<!-- solution-end -->

<a id="ex-int4-b04"></a>
**B4. 共鳴項と非共鳴項を分ける。** $\Omega=(1,1)$、$g=\cos(\theta_1-\theta_2)+\cos(2\theta_1+\theta_2)$ とする。ホモロジー方程式で除去できる部分と残る部分を特定し、除去できる部分に対する $\chi$ を求めよ。

- Level: B

<!-- solution-start -->
**詳細解答。** 第一波の $k_1=(1,-1)$ は $k_1\cdot\Omega=0$ なので共鳴し、そのFourier係数は $1/2\ne0$ です。第二波の $k_2=(2,1)$ は $k_2\cdot\Omega=3$ です。従って
$$
\chi=\frac13\sin(2\theta_1+\theta_2)
$$
を取れば $(\partial_{\theta_1}+\partial_{\theta_2})\chi=\cos(2\theta_1+\theta_2)$ となります。第一波はこの変換後も一次項として残り、全ての角度依存を消す周期的な解は存在しません。これは平均零の $g$ でも[整数共鳴の定義](#def-int4-resonance)が障害になる例です。
<!-- solution-end -->

### Level C

<a id="ex-int4-c01"></a>
**C1. 有理比と無理比の近可積分系。** $k=(3,-2)$、$a\ne0$、$H_\varepsilon=\omega_1 I_1+\omega_2 I_2+\varepsilon a\cos(3\theta_1-2\theta_2)$ とする。(i) $\Omega_A=(1,3/2)$ で作用の厳密解と周期的ホモロジー方程式の可解性を調べよ。(ii) $\Omega_B=(1,\sqrt2)$ で同じ問いを解き、振幅上界を求めよ。(iii) $\Omega_B$ の全整数モードに対してDiophantine評価があることを示し、一モードと一般Fourier級数の差を説明せよ。

- Level: C

<!-- solution-start -->
**詳細解答。** (i) $\lambda_A=k\cdot\Omega_A=3-2(3/2)=0$ です。Hamilton方程式で $\dot\theta=\Omega_A$、$\dot I=\varepsilon ak\sin(k\cdot\theta)$ となり、$k\cdot\theta(t)=k\cdot\theta^0$ は一定です。よって
$$
I(t)=I^0+\varepsilon ak\,t\sin(3\theta_1^0-2\theta_2^0).
$$
$\varepsilon\ne0$ かつ初期位相の正弦が非零なら作用は時間に比例して変化します（$\varepsilon=0$ なら作用は一定です）。一方、摂動関数 $f=a\cos(k\cdot\theta)$ の $k$ モードの係数 $a/2$ は $a\ne0$ により非零なので、[有限Fourier和のホモロジー方程式の命題](#prop-int4-finite-modes)により、一次ホモロジー方程式の周期解は存在しません。

(ii) $\lambda_B=3-2\sqrt2>0$ です。角度は $\theta^0+\Omega_Bt$、作用は[単一モードの厳密解](#prop-int4-secular)により
$$
I(t)=I^0+\frac{\varepsilon ak}{3-2\sqrt2}
\bigl[\cos(3\theta_1^0-2\theta_2^0)
-\cos(3\theta_1^0-2\theta_2^0+(3-2\sqrt2)t)\bigr].
$$
従って $\|I(t)-I^0\|_1\le 10|\varepsilon a|/(3-2\sqrt2)$ です。また
$$
\chi(\theta)=\frac{a}{3-2\sqrt2}\sin(3\theta_1-2\theta_2)
$$
は $\Omega_B\cdot\partial_\theta\chi=a\cos(3\theta_1-2\theta_2)$ を満たし、平均零です。

(iii) 非零整数 $(u,v)$ について $u^2-2v^2$ は零でない整数です。[Diophantine振動数の直接例](#def-int4-diophantine)の計算をそのまま行うと
$$
|u+v\sqrt2|\ge\frac1{\sqrt2(|u|+|v|)}.
$$
この多項式下界があるので、十分滑らかな角度依存関数の全モードの除算を[Fourier正則性の命題](#prop-int4-fourier-regularity)によって制御できます。ただしここで証明したのは固定振動数での一次方程式であり、任意の近可積分系の大域安定性やKAMトーラスの存続ではありません。
<!-- solution-end -->

## 8. 次章へ：小分母を避けずに共鳴を残す

第3節の[有限モードの解法](#prop-int4-finite-modes)では非共鳴モードを消せましたが、共鳴モードは残りました。そこで次章では、残る波を「失敗した項」として捨てるのではなく、遅い角度に依存する有効Hamiltonianとして保持します。非共鳴成分の平均化と、共鳴帯での振り子型運動を結び付けるのが正準摂動論の次の課題です。
