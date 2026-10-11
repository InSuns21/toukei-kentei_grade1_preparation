# CDYN12 有限Kuramoto系の秩序変数とLyapunov構造

[CDYN11の位相同期の判定](../CDYN11/index.md#thm-cdyn11-capture-basin)では、二振動子の位相差を一つの実数に減らしました。三個以上では位相差が何本もあり、二振動子の符号表をそのまま繰り返すだけでは全体を見渡せません。そこで、位相がどれほどまとまっているかを一つの数に圧縮する方法と、多数の位相の動きを同時に制約する減少量を作ります。

ただし「秩序が増す」ことは「どの初期値からも完全同期する」ことと同じではありません。この二つの主張を区別できるところまで、有限個の方程式から直接証明します。

## 1. 位相を有限個に増やす

振動子の個数を整数 $N\ge2$、共通の固有角速度を $\omega\in\mathbb R$、結合強度を $K>0$ とします。各位相は円周 $\mathbb R/(2\pi\mathbb Z)$ の元です。同じ強度で互いに正弦結合する **有限Kuramoto模型** を

$$
\frac{d\theta_i}{dt}
=\omega+\frac K N\sum_{j=1}^{N}\sin(\theta_j-\theta_i),
\qquad i=1,\ldots,N
$$

と定めます。$j=i$ の項は $\sin0=0$ なので、自己結合は実質ありません。$1/N$ は振動子数が変わっても結合項の大きさを揃える規格化です。

全位相から同じ $\omega t$ を差し引けば、共通回転が消えます。実数へ連続的に持ち上げた位相について

$$
\phi_i(t)=\theta_i(t)-\omega t
$$

と置くと、角度差と微分はそれぞれ

$$
\theta_j-\theta_i=\phi_j-\phi_i,\qquad
\phi_i'=\theta_i'-\omega
$$

です。したがって、もとの方程式へ代入して

$$
\begin{aligned}
\phi_i'
&=\omega+\frac K N\sum_{j=1}^{N}\sin(\theta_j-\theta_i)-\omega\\
&=\frac K N\sum_{j=1}^{N}\sin(\phi_j-\phi_i).
\end{aligned}
$$

を得ます。別の持ち上げを選んでも各位相の差は $2\pi$ の整数倍しか変わらず、正弦は同じ値を取ります。

以後、証明ではこの **回転座標の系** を用い、プライムは元の時間 $t$ による微分を表します。正弦は滑らかで、右辺の絶対値は $K$ 以下です。したがって実数への持ち上げで局所解は一意に存在し、有限時間で無限遠へ逃げられません。[ODE8の最大解の延長判定](../ODE8/index.md#thm-ode8-continuation)より、任意の初期位相から全時刻 $t\ge0$ で解が存在します。

まず $N=2$ なら $D=\phi_2-\phi_1$ と置いて

$$
\begin{aligned}
D'&=\frac K2\sin(\phi_1-\phi_2)
-\frac K2\sin(\phi_2-\phi_1)\\
&=-K\sin D.
\end{aligned}
$$

これは[CDYN11の平均位相差方程式](../CDYN11/index.md#prop-cdyn11-locking-threshold)で $\Delta=0$、$\kappa=K$ としたものです。$N\ge3$ では各位相をまとめて扱う道具が必要です。

## 2. 秩序変数は複素平面上の平均

位相ごとの単位ベクトル $(\cos\phi_j,\sin\phi_j)$ を加えると、近い方向のベクトル同士は強め合い、散らばると相殺します。そこで複素数の平均を取り、その長さをまとまり具合の指標とします。

<a id="def-cdyn12-order-parameter"></a>

<!-- formal-statement-start -->
### 定義（有限系の複素秩序変数）

整数 $N\ge2$ と円周位相 $\phi_1,\ldots,\phi_N$ に対し、

$$
Z=\frac1N\sum_{j=1}^{N}e^{\mathrm i\phi_j},
\qquad r=|Z|
$$

をそれぞれ **複素秩序変数**、**秩序度** と呼ぶ。$r>0$ のときに限り $Z=re^{\mathrm i\psi}$ と表し、$\psi$ を平均位相方向と呼ぶ。$r=0$ では $\psi$ を定義しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cdyn12-order-parameter -->
**定義の確認**　$N=3$ で $\phi_1=\phi_2=\phi_3=0$ なら $Z=1,r=1,\psi=0$ です。$\phi=(0,2\pi/3,4\pi/3)$ なら

$$
Z=\frac13\left(1+e^{2\pi\mathrm i/3}+e^{4\pi\mathrm i/3}\right)=0
$$

となり、$r=0$ ですが平均位相方向はありません。後者も各位相は定義されています。「平均方向が定まらない」と「位相が存在しない」は別です。
<!-- definition-example-end -->

<a id="prop-cdyn12-order-identities"></a>

<!-- formal-statement-start -->
### 命題（秩序度の範囲と結合項の表示）

任意の円周位相の組に対して $0\le r\le1$ であり、$r=1$ と全位相が $2\pi$ を法として等しいことは同値である。また、$r>0$ では回転座標の方程式は

$$
\phi_i'=Kr\sin(\psi-\phi_i)
$$

と書ける。$r=0$ ではすべての $\phi_i'=0$ である。
<!-- formal-statement-end -->

**証明の見取り図**　平均ベクトルの三角不等式で上界を出し、上界の等号条件は差の二乗和で判定します。運動方程式は複素秩序変数の虚部を取って再構成します。

<!-- proof-start -->
### 証明

三角不等式と $|e^{\mathrm i\phi_j}|=1$ から

$$
0\le r=\left|\frac1N\sum_je^{\mathrm i\phi_j}\right|
\le\frac1N\sum_j|e^{\mathrm i\phi_j}|=1.
$$

上界の等号条件を確認するため、$Z$ とその複素共役の積を計算します。

$$
\begin{aligned}
r^2=Z\overline Z
&=\frac1{N^2}\sum_{i,j}
e^{\mathrm i(\phi_i-\phi_j)}\\
&=\frac1{N^2}\sum_{i,j}
\bigl(\cos(\phi_i-\phi_j)
+\mathrm i\sin(\phi_i-\phi_j)\bigr).
\end{aligned}
$$

ここで添字 $i,j$ を交換すると正弦項は符号が反転するので、

$$
\sum_{i,j}\sin(\phi_i-\phi_j)
=\frac12\sum_{i,j}
\bigl(\sin(\phi_i-\phi_j)+\sin(\phi_j-\phi_i)\bigr)
=0.
$$

従って

$$
r^2=\frac1{N^2}\sum_{i,j}\cos(\phi_i-\phi_j).
$$

さらに単位複素数の差を二乗すると

$$
\begin{aligned}
|e^{\mathrm i\phi_i}-e^{\mathrm i\phi_j}|^2
&=(e^{\mathrm i\phi_i}-e^{\mathrm i\phi_j})
(e^{-\mathrm i\phi_i}-e^{-\mathrm i\phi_j})\\
&=2-2\cos(\phi_i-\phi_j).
\end{aligned}
$$

この恒等式を二重和で足すと

$$
\begin{aligned}
\frac1{2N^2}\sum_{i,j}
|e^{\mathrm i\phi_i}-e^{\mathrm i\phi_j}|^2
&=\frac1{N^2}\sum_{i,j}(1-\cos(\phi_i-\phi_j))\\
&=1-r^2.
\end{aligned}
$$

各項は非負です。$r=1$ なら全ての差の絶対値が0で、全位相の単位ベクトルが一致します。逆に全位相が一致すれば $Z$ は絶対値1の単位複素数なので $r=1$ です。

運動方程式の和を一つ取り出すと、

$$
\begin{aligned}
\frac1N\sum_j\sin(\phi_j-\phi_i)
&=\operatorname{Im}\left(
e^{-\mathrm i\phi_i}\frac1N\sum_je^{\mathrm i\phi_j}
\right)\\
&=\operatorname{Im}\left(re^{\mathrm i(\psi-\phi_i)}\right)\\
&=r\sin(\psi-\phi_i).
\end{aligned}
$$

この表示は $r>0$ の場合です。$r=0$ なら最初の虚部は0となるので、$\psi$ を使わず直接 $\phi_i'=0$ が従います。$\square$
<!-- proof-end -->

例えば $N=2$ で位相差 $D$ が $|D|\le\pi$ の範囲なら、

$$
r=\left|\frac{1+e^{\mathrm iD}}2\right|
=\left|\cos(D/2)\right|.
$$

二つの位相が反対向きなら $r=0$ ですが、[CDYN11の不安定な反位相平衡](../CDYN11/index.md#thm-cdyn11-capture-basin)は確かに平衡であり、そこで完全同期が起きるわけではありません。

## 3. 対称結合が作る勾配構造

平均方向を追うだけでは、多数の位相差が互いにどう変わるかをまだ判定できません。ここで、対称な結合が各位相を一つの関数の下り坂へ動かすことを示します。

[ODE9のLyapunov関数の考え方](../ODE9/index.md#def-ode9-lyapunov)は、軌道に沿って減る量を探すことでした。ここでは既知の関数を当てはめるのではなく、方程式の正弦項から余弦のポテンシャルを組み立てます。

<a id="def-cdyn12-potential"></a>

<!-- formal-statement-start -->
### 定義（有限対称Kuramotoポテンシャル）

整数 $N\ge2$、$K>0$ に対し、円周位相の組 $\phi=(\phi_1,\ldots,\phi_N)$ 上に

$$
V(\phi)=\frac K{2N}\sum_{i,j=1}^{N}
\bigl(1-\cos(\phi_j-\phi_i)\bigr)
$$

を定める。各位相差にしか依存しないため、すべての位相へ同じ角度を足しても $V$ は不変である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cdyn12-potential -->
**定義の確認**　$N=2$、$\phi_1=0,\phi_2=D$ なら対角の二項は0、非対角の二項はどちらも $1-\cos D$ なので、

$$
V(0,D)=\frac K4\,2(1-\cos D)
=\frac K2(1-\cos D).
$$

$D=0$ で最小値0、$D=\pi$ では $K$ になります。位相を同じ定数だけずらしても差が変わらないので、この値も変化しません。
<!-- definition-example-end -->

<a id="thm-cdyn12-gradient-dissipation"></a>

<!-- formal-statement-start -->
### 定理（勾配系表示と散逸恒等式）

共通周波数 $\omega\in\mathbb R$、整数 $N\ge2$、一様な対称結合 $K>0$ の有限Kuramoto系を回転座標 $\phi_i=\theta_i-\omega t$ で表す。上の $V$ は非負で、

$$
V(\phi)=\frac{KN}{2}(1-r^2)
$$

を満たす。回転座標の運動は標準Euclid内積に関する負の勾配流

$$
\phi_i'=-\frac{\partial V}{\partial\phi_i}
$$

であり、任意の解について

$$
\frac{dV}{dt}
=-\sum_{i=1}^{N}(\phi_i')^2\le0,
\qquad
\frac{d}{dt}r^2
=\frac2{KN}\sum_{i=1}^{N}(\phi_i')^2\ge0
$$

が成り立つ。等号が成立する時刻と、その時刻の位相配置が平衡点であることは同値である。
<!-- formal-statement-end -->

**証明の見取り図**　非負性は $1-\cos x\ge0$、秩序度との関係は二重和の展開で確認します。偏微分では $i$ が第1添字の場合と第2添字の場合の寄与を両方数えます。

<!-- proof-start -->
### 証明

$1-\cos(\phi_j-\phi_i)\ge0$ なので $V\ge0$ です。[秩序度の範囲と結合項の表示](#prop-cdyn12-order-identities)から

$$
\begin{aligned}
V
&=\frac K{2N}
\left(N^2-\sum_{i,j}\cos(\phi_i-\phi_j)\right)\\
&=\frac K{2N}\left(N^2-N^2r^2\right)
=\frac{KN}2(1-r^2).
\end{aligned}
$$

$\phi_i$ による偏微分では、まず和の第1添字が $i$ の項を考えると

$$
\frac{\partial}{\partial\phi_i}
\bigl(1-\cos(\phi_j-\phi_i)\bigr)
=-\sin(\phi_j-\phi_i)
=\sin(\phi_i-\phi_j).
$$

第2添字が $i$ の項を微分しても

$$
\frac{\partial}{\partial\phi_i}
\bigl(1-\cos(\phi_i-\phi_j)\bigr)
=\sin(\phi_i-\phi_j)
$$

です。対角項はもともと恒等的に0で、二度数えても微分は0のままです。したがって両側から同じ和が現れ、

$$
\begin{aligned}
\frac{\partial V}{\partial\phi_i}
&=\frac K{2N}
\left(\sum_j\sin(\phi_i-\phi_j)
+\sum_j\sin(\phi_i-\phi_j)\right)\\
&=\frac K N\sum_j\sin(\phi_i-\phi_j)
=-\phi_i'.
\end{aligned}
$$

この等式を $t$ に沿って連鎖律で微分します。

$$
\begin{aligned}
\frac{dV}{dt}
&=\sum_i\frac{\partial V}{\partial\phi_i}\phi_i'\\
&=-\sum_i(\phi_i')^2.
\end{aligned}
$$

一方、$V=KN(1-r^2)/2$ の両辺を微分すると

$$
\frac{dV}{dt}
=-\frac{KN}2\frac d{dt}r^2.
$$

二つの表示を等置すると

$$
-\frac{KN}{2}\frac d{dt}r^2
=-\sum_i(\phi_i')^2.
$$

$KN>0$ で割れば定理の秩序度の式です。$r^2$ が非減少し、平方根は $[0,\infty)$ 上で単調増加するので、$r$ 自身も非減少です。

等号が成立するのは平方和が0、つまり全成分で $\phi_i'=0$ のときだけです。その配置で自律方程式の右辺が0になり、一意性からその配置を初期値とする解は一定、すなわち平衡解です。$\square$
<!-- proof-end -->

**何を意味するか**　同じ周波数と対称結合の条件のもとで、秩序度 $r$ は減りません。ただし $r^2$ の増加が止まる配置でも、全位相が等しいとは限りません。次節では散逸が止まる配置を分類します。固有周波数が異なる一般系に、この勾配表示を無条件には使用できません。

## 4. 平衡点は完全同期以外にも存在する

<a id="prop-cdyn12-stationary-sets"></a>

<!-- formal-statement-start -->
### 命題（平衡配置の分類と完全同期の反例）

前節の有限Kuramoto系について、回転座標での平衡配置は以下のいずれかである。

1. $r=0$ の配置。
2. $r>0$ で、ある平均位相方向 $\psi$ に対し、各位相が $\psi$ または $\psi+\pi$ にある配置。

特に $N=3$ の配置 $(0,2\pi/3,4\pi/3)$ は $r=0$ の平衡点で、完全同期していない。$N=3$ の配置 $(0,0,\pi)$ も $r=1/3>0$ の平衡点で、完全同期していない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[秩序変数による結合項表示](#prop-cdyn12-order-identities)を使います。$r=0$ では右辺は各成分で0です。$r>0$ なら

$$
\phi_i'=Kr\sin(\psi-\phi_i)=0
\quad\Longleftrightarrow\quad
\sin(\psi-\phi_i)=0
$$

となります。$Kr>0$ なので割ることができ、後者の解は $\phi_i=\psi$ または $\psi+\pi$（$2\pi$ を法とする）に限られます。逆に各位相がこの二方向のみを取れば全ての正弦差は0で、元の方程式から平衡であると確認できます。

第一の例では三個の単位根の和が0です。第二の例では

$$
Z=\frac13(1+1-1)=\frac13,\qquad
r=\frac13,\qquad \psi=0.
$$

各位相差は0または $\pi$ なので全結合項が消えます。しかし三位相は一致しません。どちらも一定の平衡解ですから、**全初期位相が完全同期する**という主張には反例となります。$\square$
<!-- proof-end -->

ここでは「平衡である」と「安定に引き込まれる」を区別します。例えば $(0,0,\pi)$ を $(0,0,\pi-\delta)$、$0<\delta<\pi$ にずらすと、最初の二位相は対称性と一意性により常に一致します。その共通位相と第三位相の差を $D$ とすると

$$
\begin{aligned}
\phi_1'=\phi_2'&=\frac K3\sin D,\\
\phi_3'&=-\frac{2K}3\sin D,\\
D'&=-K\sin D.
\end{aligned}
$$

$D(0)=\pi-\delta\in(0,\pi)$ です。この区間では $\sin D>0$ なので $D'=-K\sin D<0$ となり、位相差は反位相側から小さくなります。

[CDYN11の引込み域の定理](../CDYN11/index.md#thm-cdyn11-capture-basin)へ $\Delta=0,\kappa=K$ を代入します。$-\pi<D(0)<\pi$ を満たすため、

$$
D(t)\longrightarrow0
\qquad(t\to\infty)
$$

です。$\delta>0$ は任意に小さく選べるので、初期値を元の反位相配置へいくらでも近づけられます。しかし十分時間が経つと位相差は0に近づき、反位相から有限の距離だけ離れます。従って反位相の二群平衡は安定ではありません。

## 5. エネルギーの減少だけでどこまで分かるか

$V(t)$ は非増加で下界0を持つので、ある極限値へ収束します。さらに、位相がずっと動き続けることを防ぐには、散逸の積分が有限であることと、速度が急激な尖った振動を作れないことを組み合わせます。一般の収束定理を黒箱にせず、この有限次元の模型について直接示します。

<a id="thm-cdyn12-limit-stationary"></a>

<!-- formal-statement-start -->
### 定理（速度の消失と平衡集合への接近）

同一周波数・対称結合の有限Kuramoto系の任意の初期配置について、回転座標の全時刻解は

$$
\lim_{t\to\infty}\sum_{i=1}^{N}|\phi_i'(t)|^2=0
$$

を満たす。円周の積空間 $\mathbb T^N=(\mathbb R/(2\pi\mathbb Z))^N$ において平衡集合を

$$
E=\{\xi\in\mathbb T^N:F(\xi)=0\}
$$

（$F$ は回転座標の方程式の右辺）とすると、任意の集積点は $E$ に属し、さらに

$$
\lim_{t\to\infty}\operatorname{dist}(\phi(t),E)=0
$$

となる。ここで距離は $\mathbb T^N$ の通常の積距離とする。この定理は、解が一つの平衡配置へ収束すること、まして完全同期へ収束することまでは主張しない。
<!-- formal-statement-end -->

**証明の見取り図**　散逸を時間積分して速度の二乗の積分可能性を示します。速度の時間変化も一様に抑え、もし無限回大きい速度が現れるなら一定幅の区間で散逸が積み重なる矛盾を作ります。

<!-- proof-start -->
### 証明

[散逸恒等式](#thm-cdyn12-gradient-dissipation)を0から $T$ まで積分します。

$$
\int_0^T\sum_i|\phi_i'(t)|^2\,dt
=V(\phi(0))-V(\phi(T))
\le V(\phi(0)).
$$

$T\to\infty$ とすれば非負関数の積分の単調性により

$$
\int_0^\infty\sum_i|\phi_i'(t)|^2\,dt<\infty.
$$

ここで速度 $g_i(t)=\phi_i'(t)$ を微分します。正弦の引数とその時間微分は

$$
\frac d{dt}(\phi_j-\phi_i)=g_j-g_i
$$

なので、各結合項に連鎖律を適用すると

$$
\begin{aligned}
g_i'
&=\frac K N\sum_j\frac d{dt}\sin(\phi_j-\phi_i)\\
&=\frac K N\sum_j\cos(\phi_j-\phi_i)(g_j-g_i).
\end{aligned}
$$

$|g_i|\le K$ なので $|g_j-g_i|\le2K$ です。よって

$$
|g_i'(t)|
\le\frac K N\sum_j2K=2K^2.
$$

$h(t)=\sum_i|g_i(t)|^2$ と置くと、

$$
|h'(t)|=\left|2\sum_i g_i g_i'\right|
\le2\sum_i K(2K^2)=4NK^3=:M.
$$

従って $h$ は時間に関して一様に Lipschitz です。もし $h(t)\to0$ でなければ、ある $\eta>0$ と $t_n\to\infty$ があって $h(t_n)\ge\eta$ です。$\delta=\eta/(2M)$ と取れば

$$
|t-t_n|\le\delta
\quad\Longrightarrow\quad
h(t)\ge h(t_n)-M\delta\ge\eta/2.
$$

$t_n\to\infty$ なので、必要なら部分列を取り直し、$t_1>\delta$ かつ

$$
t_{n+1}-t_n>2\delta
$$

となるようにできます。すると $I_n=[t_n-\delta,t_n+\delta]$ は $[0,\infty)$ 内で互いに交わらず、各区間で

$$
\int_{I_n}h(t)\,dt
\ge\frac{\eta}{2}|I_n|
=\eta\delta.
$$

従って任意の整数 $m\ge1$ について

$$
\int_0^\infty h(t)\,dt
\ge\sum_{n=1}^{m}\int_{I_n}h(t)\,dt
\ge m\eta\delta.
$$

$m\to\infty$ は積分有限性に矛盾します。従って $h(t)\to0$ です。

円周位相の $N$ 個の積空間はコンパクトです。軌道の部分列が $\phi(t_n)\to\phi_*$（各成分を $2\pi$ を法として）となれば、右辺の連続性と $g_i(t_n)\to0$ から

$$
\frac K N\sum_j\sin(\phi_{*,j}-\phi_{*,i})=0
\quad(i=1,\ldots,N)
$$

です。よって $\phi_*$ は平衡配置です。

さらに「平衡集合へ接近する」という結論も確かめます。右辺を $F(\phi)$ と書き、

$$
E=\{\xi\in\mathbb T^N:F(\xi)=0\}
$$

を平衡集合とします。$F$ は連続なので $E$ は閉集合です。また、全位相が等しい配置は平衡なので $E$ は空ではありません。$\mathbb T^N$ はコンパクトですから $E$ もコンパクトです。

仮に平衡集合までの距離が0へ近づかないなら、ある $\rho>0$ と $s_n\to\infty$ が存在して

$$
\operatorname{dist}(\phi(s_n),E)\ge\rho
$$

となります。コンパクト性から部分列を選べば $\phi(s_{n_k})\to\xi_*$ です。すでに示した集積点の議論で $\xi_*\in E$ だから、

$$
0\le\operatorname{dist}(\phi(s_{n_k}),E)
\le d(\phi(s_{n_k}),\xi_*)\longrightarrow0
$$

です。ここで $d$ は円周の積空間の通常の距離です。これは $\rho$ の下界に矛盾し、

$$
\operatorname{dist}(\phi(t),E)\longrightarrow0
\qquad(t\to\infty)
$$

が従います。この結論は単一の平衡点への収束より弱い主張です。$\square$
<!-- proof-end -->

この結論は[ODE9のLaSalleの原理](../ODE9/index.md#thm-ode9-lasalle)とも整合しますが、本章では速度の一様連続性を具体的に評価して証明しました。平衡集合には前節の非完全同期配置も入るため、この定理だけでは完全同期へ届きません。

## 6. 半円より狭い初期配置なら完全同期する

一方、位相が初めから長さ $\pi$ 未満の弧に収まっていれば、全ての位相差について正弦結合が端の位相を内側へ押すことを、より強い不等式として示せます。この仮定を満たせば完全同期しますが、満たさない場合にも同期することはあります。

<a id="thm-cdyn12-semicircle-sync"></a>

<!-- formal-statement-start -->
### 定理（開いた半円内からの完全同期）

整数 $N\ge2$、$K>0$、共通周波数 $\omega\in\mathbb R$ の有限Kuramoto系を考える。初期位相を実数に持ち上げた代表 $\phi_i(0)$ があり、

$$
W_0:=\max_i\phi_i(0)-\min_i\phi_i(0)<\pi
$$

を満たすとする。このとき、持ち上げを連続的に選んだ回転座標の解について、幅

$$
W(t)=\max_i\phi_i(t)-\min_i\phi_i(t)
$$

は増加せず、

$$
\tan\frac{W(t)}2
\le e^{-Kt}\tan\frac{W_0}2
$$

が全時刻で成り立つ。初期位相の算術平均を

$$
\bar\phi_0=\frac1N\sum_i\phi_i(0)
$$

とすれば、すべての $i$ について $\phi_i(t)\to\bar\phi_0$、すなわち元の座標で $\theta_i(t)-(\omega t+\bar\phi_0)\to0$ となり完全同期する。
<!-- formal-statement-end -->

**証明の見取り図**　最大位相と最小位相の導関数を引き、三角関数の差を積に分解します。初期幅が $\pi$ 未満なら全ての余弦因子が正で、幅が狭まります。次に幅の微分不等式を積分し、最後に保存される平均位相を使います。

<!-- proof-start -->
### 証明

まず $\phi_i'=F_i(\phi)$ と置きます。$W(0)=0$ の場合は全位相が等しく、各正弦項が0です。解の一意性から全時刻で一致し、定理は直ちに成立します。以下は $0<W_0<\pi$ とします。

各 $\phi_i$ は微分可能なので、有限個の最大値

$$
M(t)=\max_i\phi_i(t),\qquad
m(t)=\min_i\phi_i(t)
$$

は局所 Lipschitz です。最大値を取る添字 $a$ に対して $\phi_j-M\in[-W,0]$ であり、$W<\pi$ の間は

$$
F_a(\phi)=\frac K N\sum_j\sin(\phi_j-M)\le0
$$

です。複数の位相が同じ最大値なら、その添字の右辺は全て同じ値です。従って最大値が微分可能なほとんど全ての時刻で $M'=F_a(\phi)\le0$ です。最小値を取る添字について同様に $m'\ge0$ なので、

$$
W'=M'-m'\le0
$$

がほとんど至る所で成立します。

この不等式の適用範囲も確認します。連続関数 $W$ は初期に $\pi$ 未満です。仮に初めて $W(t_*)=\pi$ となる有限時刻 $t_*>0$ があれば、$0\le t<t_*$ で $W(t)<\pi$ なので上の微分不等式を積分でき、

$$
W(t)\le W(0)=W_0<\pi.
$$

$t\uparrow t_*$ とすると連続性により $W(t_*)\le W_0<\pi$ となり矛盾します。従って全時刻で $W(t)\le W_0<\pi$ が維持されます。

最大位相を $M$、最小位相を $m$ とする添字をその時刻で選び、幅 $W=M-m$ とします。両者の方程式を引くと、

$$
\begin{aligned}
W'&=\frac K N\sum_j
\{\sin(\phi_j-M)-\sin(\phi_j-m)\}\\
&=\frac{2K}{N}\sum_j
\cos\left(\frac{(\phi_j-M)+(\phi_j-m)}2\right)
\sin\left(\frac{(\phi_j-M)-(\phi_j-m)}2\right)\\
&=-\frac{2K}{N}\sin(W/2)
\sum_j\cos\left(\phi_j-\frac{M+m}{2}\right).
\end{aligned}
$$

ここで $m\le\phi_j\le M$ より

$$
\left|\phi_j-\frac{M+m}{2}\right|\le W/2<\pi/2.
$$

この範囲で余弦は非負で、各項について

$$
\cos\left(\phi_j-\frac{M+m}{2}\right)
\ge\cos(W/2)>0
$$

なので、

$$
W'\le-2K\sin(W/2)\cos(W/2)
=-K\sin W.
$$

$W_0>0$ の場合を扱っているので、$0<W(t)<\pi$ が成り立つ区間では $y=\tan(W/2)>0$ と置けます。連鎖律で

$$
\begin{aligned}
\frac{y'}y
&=\frac{\frac12\sec^2(W/2)\,W'}{\tan(W/2)}\\
&=\frac{W'}{2\sin(W/2)\cos(W/2)}
=\frac{W'}{\sin W}
\le-K.
\end{aligned}
$$

$y$ は局所 Lipschitz で、$W>0$ の区間ではほとんど至る所で上式が成立します。$0$ からその区間内の時刻 $t$ まで積分すると

$$
\log y(t)-\log y(0)\le-Kt.
$$

両辺を指数関数へ移し、

$$
\tan\frac{W(t)}2=y(t)
\le e^{-Kt}y(0)
=e^{-Kt}\tan\frac{W_0}2.
$$

有限時刻で $W=0$ となる場合は、全位相が一致し解の一意性から以後も $W=0$ です。連続性により到達時刻にも評価が保たれます。$W_0=0$ の場合は最初に確認した通りです。

最後に位相の算術平均を微分します。添字を入れ替えた正弦項が打ち消し合うため、

$$
\begin{aligned}
\frac d{dt}\left(\frac1N\sum_i\phi_i\right)
&=\frac K{N^2}\sum_{i,j}\sin(\phi_j-\phi_i)\\
&=\frac K{2N^2}\sum_{i,j}
\{\sin(\phi_j-\phi_i)+\sin(\phi_i-\phi_j)\}=0.
\end{aligned}
$$

従って $\bar\phi(t)=\bar\phi_0$ です。平均は常に $[m(t),M(t)]$ に含まれるので

$$
|\phi_i(t)-\bar\phi_0|\le W(t).
$$

右辺は指数的に0へ向かい、各位相も $\bar\phi_0$ へ収束します。元の座標へ $\omega t$ を戻せば主張の同期運動です。$\square$
<!-- proof-end -->

**仮定が効く箇所**　幅が $\pi$ 以上なら、最大位相について $\phi_j-M$ が $-\pi$ 以下になり得ます。その場合、全ての正弦項が最大位相を内側へ押すという符号判定は使えません。

また $W<\pi$ だからこそ、三角関数の差を変形した余弦の和に正の下界を与えられました。例えば完全な反位相配置は幅 $\pi$ を必要とし、実際に平衡となります。従って収縮不等式を境界へ無条件に拡張することはできません。

## 7. 演習と詳細解答

### A1. 三個の秩序変数

$N=3$ で $\phi=(0,0,\pi)$ と $\phi=(0,2\pi/3,4\pi/3)$ について、複素秩序変数と秩序度をそれぞれ計算せよ。

- Level: A
- ID: CDYN12-A1

<!-- solution-start -->
**詳細解答**　[複素秩序変数の定義](#def-cdyn12-order-parameter)へ直接代入します。第一の配置では

$$
Z=\frac13(1+1-1)=\frac13,\qquad r=\frac13.
$$

第二の配置では $e^{2\pi\mathrm i/3}=-1/2+\mathrm i\sqrt3/2$、$e^{4\pi\mathrm i/3}=-1/2-\mathrm i\sqrt3/2$ なので、

$$
Z=\frac13\left(1-\frac12-\frac12
+\mathrm i\frac{\sqrt3}2-\mathrm i\frac{\sqrt3}2\right)=0,
\qquad r=0.
$$

後者では $\psi$ を定義しません。
<!-- solution-end -->

### A2. 二振動子の方程式

$N=2$、$K>0$ の同一周波数模型について、$D=\phi_2-\phi_1$ の方程式を求め、$D=0,\pi$ が平衡点となることを確かめよ。

- Level: A
- ID: CDYN12-A2

<!-- solution-start -->
**詳細解答**　元の回転座標式で自分自身の項は0です。よって

$$
\phi_1'=\frac K2\sin D,\qquad
\phi_2'=\frac K2\sin(-D)=-\frac K2\sin D.
$$

二つを引くと

$$
D'=\phi_2'-\phi_1'=-K\sin D.
$$

$\sin0=\sin\pi=0$ なので両者は平衡位相差です。[CDYN11の閾値命題](../CDYN11/index.md#prop-cdyn11-locking-threshold)では前者が安定側、後者が不安定側に対応します。
<!-- solution-end -->

### A3. ポテンシャルを直接数える

$N=2$、$\phi=(0,\pi/2)$ とする。二重和の四項を列挙して $V$ を求め、秩序度による表示と照合せよ。

- Level: A
- ID: CDYN12-A3

<!-- solution-start -->
**詳細解答**　対角項は $(i,j)=(1,1),(2,2)$ で $1-\cos0=0$ です。残る二項は差が $\pi/2,-\pi/2$ なので、どちらも1です。したがって

$$
V=\frac K4(0+1+1+0)=\frac K2.
$$

一方、

$$
Z=\frac{1+\mathrm i}{2},\qquad
r^2=\frac{|1+\mathrm i|^2}{4}=\frac12
$$

なので、[散逸定理の恒等式](#thm-cdyn12-gradient-dissipation)から

$$
V=\frac{KN}2(1-r^2)=K(1-1/2)=K/2.
$$

両計算が一致します。
<!-- solution-end -->

### A4. 共通回転の消去

$N=3$、$\omega\in\mathbb R$、$K>0$ で、初期位相がすべて $\alpha$ に等しいとする。元の座標の解を求め、回転座標では平衡であることを確かめよ。

- Level: A
- ID: CDYN12-A4

<!-- solution-start -->
**詳細解答**　全ての角度差が0なら $\sin(\theta_j-\theta_i)=0$ であり、

$$
\theta_i'=\omega,\qquad
\theta_i(t)=\alpha+\omega t\quad(i=1,2,3).
$$

したがって $\phi_i=\theta_i-\omega t=\alpha$ で全成分一定です。円周上では $\omega t$ の回転があっても、位相差は変化しません。
<!-- solution-end -->

### A5. 位相の算術平均

$N=3$ で実数への持ち上げを $\phi(0)=(0,\pi/6,\pi/3)$ とし、$K>0$ とする。算術平均の時間微分を直接計算し、初期値を求めよ。

- Level: A
- ID: CDYN12-A5

<!-- solution-start -->
**詳細解答**　対称な正弦結合は添字を交換すると符号が反転するので、

$$
\bar\phi'=\frac K9\sum_{i,j}\sin(\phi_j-\phi_i)
=\frac K9\sum_{i<j}
\{\sin(\phi_j-\phi_i)+\sin(\phi_i-\phi_j)\}=0.
$$

初期平均は

$$
\bar\phi_0=\frac{0+\pi/6+\pi/3}{3}
=\frac{\pi/2}{3}=\frac\pi6.
$$

従って全時刻で $\bar\phi(t)=\pi/6$ です。
<!-- solution-end -->

### B1. 正弦結合と勾配を三体で照合する

$N=3$、$K>0$、$\phi=(0,\pi/2,\pi)$ で各成分の速度と $\partial_iV$ を計算せよ。

- Level: B
- ID: CDYN12-B1

<!-- solution-start -->
**詳細解答**　運動方程式から、

$$
\begin{aligned}
\phi_1'&=\frac K3(\sin0+\sin(\pi/2)+\sin\pi)=K/3,\\
\phi_2'&=\frac K3(\sin(-\pi/2)+\sin0+\sin(\pi/2))=0,\\
\phi_3'&=\frac K3(\sin(-\pi)+\sin(-\pi/2)+\sin0)=-K/3.
\end{aligned}
$$

一方、二重和を偏微分した[勾配の式](#thm-cdyn12-gradient-dissipation)は

$$
\partial_iV=\frac K3\sum_j\sin(\phi_i-\phi_j).
$$

各成分で和を明示すると、

$$
\begin{aligned}
\partial_1V
&=\frac K3(\sin0+\sin(-\pi/2)+\sin(-\pi))
=-\frac K3,\\
\partial_2V
&=\frac K3(\sin(\pi/2)+\sin0+\sin(-\pi/2))=0,\\
\partial_3V
&=\frac K3(\sin\pi+\sin(\pi/2)+\sin0)=\frac K3.
\end{aligned}
$$

従って $(\partial_1V,\partial_2V,\partial_3V)=(-K/3,0,K/3)$ です。上で独立に求めた位相速度と各成分で $\phi_i'=-\partial_iV$ が一致します。したがって

$$
\frac{dV}{dt}
=-\left((K/3)^2+0+(-K/3)^2\right)
=-\frac{2K^2}{9}.
$$
<!-- solution-end -->

### B2. 散逸から秩序度の増加率を求める

$N=3$、$K>0$、$\phi=(0,\pi/2,\pi)$ の時刻における $(r^2)'$ と $V'$ を求め、符号を照合せよ。

- Level: B
- ID: CDYN12-B2

<!-- solution-start -->
**詳細解答**　前問の結論を前提にせず、元の結合式から各速度を計算します。

$$
\begin{aligned}
\phi_1'&=\frac K3\{\sin(\pi/2)+\sin\pi\}=\frac K3,\\
\phi_2'&=\frac K3\{\sin(-\pi/2)+\sin(\pi/2)\}=0,\\
\phi_3'&=\frac K3\{\sin(-\pi)+\sin(-\pi/2)\}=-\frac K3.
\end{aligned}
$$

従って平方和は

$$
\sum_{i=1}^3(\phi_i')^2
=\frac{K^2}{9}+0+\frac{K^2}{9}
=\frac{2K^2}{9}.
$$

[散逸恒等式](#thm-cdyn12-gradient-dissipation)を $N=3$ に適用して

$$
V'=-\frac{2K^2}{9},\qquad
(r^2)'=\frac2{3K}\frac{2K^2}{9}=\frac{4K}{27}.
$$

したがって秩序度の二乗は増え、ポテンシャルは減ります。両辺から $V'=-(3K/2)(r^2)'$ と検算しても

$$
-\frac{3K}2\,\frac{4K}{27}=-\frac{2K^2}{9}
$$

となります。
<!-- solution-end -->

### B3. 半円内の初期配置

$N=3$、$K>0$、$\phi(0)=(-\pi/6,0,\pi/6)$ とする。同期先と幅の時間評価を求め、時刻 $t$ の各位相と同期先との距離を評価せよ。

- Level: B
- ID: CDYN12-B3

<!-- solution-start -->
**詳細解答**　持ち上げた初期幅は

$$
W_0=\pi/6-(-\pi/6)=\pi/3<\pi
$$

で、平均位相は $\bar\phi_0=0$ です。[半円内同期の定理](#thm-cdyn12-semicircle-sync)の仮定を満たすので、

$$
\tan\frac{W(t)}2
\le e^{-Kt}\tan\frac\pi6
=\frac{e^{-Kt}}{\sqrt3}.
$$

両辺は非負で $\arctan$ は単調増加だから

$$
0\le W(t)\le2\arctan\left(\frac{e^{-Kt}}{\sqrt3}\right).
$$

平均0は最小・最大位相の間にあるので、各 $i$ に対して

$$
|\phi_i(t)|\le W(t)
\le2\arctan\left(\frac{e^{-Kt}}{\sqrt3}\right)\longrightarrow0.
$$
<!-- solution-end -->

### B4. 平衡であっても完全同期でない配置

$N=3$、$K>0$ で $\phi=(0,0,\pi)$ の秩序度、ポテンシャル、各速度を求めよ。さらに $(0,0,\pi-\delta)$ へずらした場合の位相差 $D$ の初期速度を求めよ（$0<\delta<\pi$）。

- Level: B
- ID: CDYN12-B4

<!-- solution-start -->
**詳細解答**　平均単位ベクトルは $Z=(1+1-1)/3=1/3$ なので $r=1/3$ です。[勾配系表示と散逸恒等式](#thm-cdyn12-gradient-dissipation)により

$$
V=\frac{3K}{2}\left(1-\frac19\right)
=\frac{3K}{2}\,\frac89=\frac{4K}3.
$$

角度差は0または $\pm\pi$ なので各速度は0です。摂動後は第一、第二位相が等しく、右辺も同一なので、解の一意性から $\phi_1(t)=\phi_2(t)$ が続きます。第三位相との差を $D=\phi_3-\phi_1$ とおくと、

$$
\begin{aligned}
\phi_1'=\phi_2'&=\frac K3\sin D,\\
\phi_3'&=\frac K3\{\sin(-D)+\sin(-D)\}
=-\frac{2K}{3}\sin D,\\
D'&=\phi_3'-\phi_1'
=-\frac{2K}{3}\sin D-\frac K3\sin D\\
&=-K\sin D.
\end{aligned}
$$

時刻0では $D(0)=\pi-\delta$ なので

$$
D'(0)=-K\sin(\pi-\delta)=-K\sin\delta<0.
$$

元の配置は平衡ですが、この摂動は反位相から遠ざかる方向に動きます。
<!-- solution-end -->

### B5. 散逸積分から位相差速度の消失を再構成する

$N=2$、$K>0$、$\omega\in\mathbb R$ の同一周波数Kuramoto系を考え、回転座標の位相差を $D=\phi_2-\phi_1$ とする。初期値は $0<D(0)<\pi$ とする。

1. $D'=-K\sin D$ を導き、$V=K(1-\cos D)/2$ の時間微分を求めよ。
2. $\int_0^\infty\sin^2D(t)\,dt$ が有限であることを示せ。
3. $h(t)=\sin^2 D(t)$ の導関数を計算し、2. の積分有限性から $h(t)\to0$ を直接証明せよ。
4. $D(t)\to0$ を示せ。初期値が $D(0)=\pi$ だった場合との違いも述べよ。

- Level: B
- ID: CDYN12-B5

<!-- solution-start -->
**詳細解答**

**(1)**　自己結合の正弦は0なので、

$$
\phi_1'=\frac K2\sin D,\qquad
\phi_2'=-\frac K2\sin D.
$$

差を取って

$$
D'=\phi_2'-\phi_1'=-K\sin D
$$

となります。$V=K(1-\cos D)/2$ を連鎖律で微分すれば、

$$
\begin{aligned}
V'&=\frac K2\sin D\,D'\\
&=\frac K2\sin D(-K\sin D)\\
&=-\frac{K^2}{2}\sin^2D.
\end{aligned}
$$

他方、二つの速度の二乗和は

$$
(\phi_1')^2+(\phi_2')^2
=2\frac{K^2}{4}\sin^2D
=\frac{K^2}{2}\sin^2D
$$

なので、[勾配散逸恒等式](#thm-cdyn12-gradient-dissipation)とも一致します。

**(2)**　(1) の式を $0$ から $T$ まで積分すると、

$$
\frac{K^2}{2}\int_0^T\sin^2D(t)\,dt
=V(0)-V(T)\le V(0).
$$

ここで $V(T)\ge0$ であり、$V(0)=K(1-\cos D(0))/2$ を代入して、

$$
0\le\int_0^T\sin^2D(t)\,dt
\le\frac{1-\cos D(0)}{K}.
$$

左辺は $T$ の非減少関数です。従って $T\to\infty$ の極限が存在し、積分は有限です。

**(3)**　$h(t)=\sin^2D(t)$ を微分すると、

$$
\begin{aligned}
h'(t)&=2\sin D\cos D\,D'\\
&=-2K\sin^2D\cos D.
\end{aligned}
$$

$|\sin D|,|\cos D|\le1$ より $|h'|\le2K$ であり、$h$ は一様に Lipschitz です。もし $h(t)\to0$ でなければ、ある $\eta>0$ と $t_n\to\infty$ が存在して $h(t_n)\ge\eta$ となります。

$\delta=\eta/(4K)>0$ を選ぶと、$|t-t_n|\le\delta$ で

$$
h(t)\ge h(t_n)-2K\delta\ge\frac\eta2.
$$

部分列を取って $t_{n+1}-t_n>2\delta$ とすれば、十分大きい $n$ の区間 $[t_n-\delta,t_n+\delta]$ は互いに重ならず、各区間の積分は少なくとも $\eta\delta$ です。その区間が無限個あることは、(2) で示した積分有限性に反します。よって $h(t)\to0$ です。

**(4)**　$0<D(0)<\pi$ では $D'=-K\sin D<0$ です。$D=0$ と $D=\pi$ は平衡点なので、解の一意性から初期値がその間にある解は境界を有限時間で越えられません。従って $D(t)\in(0,\pi)$ を保ちながら単調減少し、下界0を持ちます。

その極限を $L\in[0,D(0)]$ とすると、(3) の $h(t)\to0$ と正弦の連続性から

$$
\sin^2L=\lim_{t\to\infty}\sin^2D(t)=0
$$

です。

$$
0\le L\le D(0)<\pi
\quad\Longrightarrow\quad L=0
$$

となります。一方 $D(0)=\pi$ なら $\sin\pi=0$ で最初から $D'=0$ です。従って反位相に留まり、完全同期しません。これは[CDYN11の引込み域の定理](../CDYN11/index.md#thm-cdyn11-capture-basin)とも一致します。散逸率が0になることと完全同期を混同してはいけない具体例です。
<!-- solution-end -->

### C1. 秩序、散逸、非同期平衡、同期十分条件

同一周波数 $\omega\in\mathbb R$、正の結合強度 $K$、$N=3$ の有限Kuramoto系を考える。

1. 回転座標 $\phi_i=\theta_i-\omega t$ の方程式と秩序変数を定義し、$r\le1$ を証明せよ。
2. $\phi(0)=(0,\pi/3,2\pi/3)$ の秩序度、ポテンシャル、初期の散逸率を計算せよ。
3. $\phi(0)=(0,2\pi/3,4\pi/3)$ では散逸が止まっても完全同期しないことを示せ。
4. $\phi(0)=(-\pi/4,0,\pi/4)$ なら同期先と幅の評価を求めよ。
5. (3) と (4) から「$V$ が非増加」という情報だけでは完全同期の結論に不足する理由を述べよ。

- Level: C
- ID: CDYN12-C1

<!-- solution-start -->
**詳細解答**

**(1)**　同じ $\omega t$ を各位相から差し引けば、

$$
\phi_i'=\frac K3\sum_{j=1}^3\sin(\phi_j-\phi_i),\qquad
Z=\frac13\sum_{j=1}^3e^{\mathrm i\phi_j},\qquad r=|Z|.
$$

各複素数の絶対値は1です。和の絶対値を各項の絶対値の和で上から評価すると

$$
r\le\frac13\sum_{j=1}^3|e^{\mathrm i\phi_j}|=1.
$$

**(2)**　$Z$ を計算すると

$$
\begin{aligned}
Z&=\frac13\left(1+\frac12+\frac{\mathrm i\sqrt3}2
-\frac12+\frac{\mathrm i\sqrt3}2\right)\\
&=\frac{1+\mathrm i\sqrt3}{3},\qquad
r^2=\frac{1+3}{9}=\frac49.
\end{aligned}
$$

したがって[勾配散逸定理](#thm-cdyn12-gradient-dissipation)から

$$
V(0)=\frac{3K}2\left(1-\frac49\right)=\frac{5K}6.
$$

初期速度は

$$
\begin{aligned}
\phi_1'(0)&=\frac K3(\sin(\pi/3)+\sin(2\pi/3))
=\frac{K\sqrt3}{3},\\
\phi_2'(0)&=\frac K3(\sin(-\pi/3)+\sin(\pi/3))=0,\\
\phi_3'(0)&=\frac K3(\sin(-2\pi/3)+\sin(-\pi/3))
=-\frac{K\sqrt3}{3}.
\end{aligned}
$$

よって

$$
V'(0)=-\sum_i(\phi_i'(0))^2
=-2\frac{3K^2}{9}=-\frac{2K^2}3.
$$

**(3)**　$e^{2\pi\mathrm i/3}+e^{4\pi\mathrm i/3}=-1$ なので $Z=0$ です。各結合項は[秩序変数の結合項表示](#prop-cdyn12-order-identities)により0となり、全位相は回転座標で止まります。しかし位相は三方向に異なるため、$r=1$ の完全同期にはなりません。

**(4)**　幅と平均は

$$
W_0=\frac\pi4-(-\pi/4)=\frac\pi2<\pi,\qquad
\bar\phi_0=\frac{-\pi/4+0+\pi/4}{3}=0.
$$

[半円内同期の定理](#thm-cdyn12-semicircle-sync)を適用でき、

$$
\tan\frac{W(t)}2\le e^{-Kt}\tan\frac\pi4=e^{-Kt}.
$$

$0\le W(t)<\pi$ で $\arctan$ は単調増加するため、

$$
0\le W(t)\le2\arctan(e^{-Kt})\longrightarrow0.
$$

[半円内同期の定理](#thm-cdyn12-semicircle-sync)にある平均保存より $\bar\phi(t)=\bar\phi_0=0$ です。平均は最小位相と最大位相の間にあるので

$$
|\phi_i(t)-0|\le W(t)\longrightarrow0
$$

です。元の座標では各位相が $\omega t$ と同じ速度で回ります。

**(5)**　(3) の初期値では散逸率が恒等的に0ですが、完全同期ではありません。従って $V'\le0$ だけでは平衡配置を一つに限定できません。

一方 (4) の初期位相幅は $\pi$ 未満です。[半円内同期の定理](#thm-cdyn12-semicircle-sync)では、この追加条件から

$$
W'\le-K\sin W
$$

を導き、幅の収縮と保存平均を併用して完全同期を結論しました。二つのケースで使用できる仮定が異なることが重要です。
<!-- solution-end -->

本章では、有限個の位相を秩序変数 $Z$ に圧縮し、対称結合のポテンシャル $V$ から散逸恒等式を導きました。完全同期以外の平衡配置がある一方で、位相が半円より狭い弧に入る初期値では明示的な収縮評価が得られます。次のCDYN13では、相互作用ではなく**速い変数と遅い変数の時間尺度の差**が運動をどう変えるかを調べます。
