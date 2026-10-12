# INT2 Liouville–Arnoldの定理

[正則共通レベルの不変性とLagrange性](../INT1/index.md#thm-int1-regular-fiber)によって、$n$ 自由度Hamilton系の独立なPoisson可換第一積分を $n$ 個固定すると、共通レベルは $n$ 次元の不変なLagrange部分多様体になります。しかし「$n$ 次元で不変」という情報だけから、その上を動く軌道が閉じるか、どのような座標で記述できるかは分かりません。平面上の自由粒子でも不変な直線は作れるからです。

この章では、共通レベルが**コンパクトかつ連結**である場合を考えます。可換なHamilton流を $n$ 個重ねると $\mathbb R^n$ の作用が生じます。その「元の位置へ戻る時間の組」を調べると、周期を束ねた格子が現れ、空間そのものがトーラスであると分かります。続いてHamilton運動がトーラス上の直線運動となることを導きます。**角度の座標を作る段階まで**が今回の目標であり、その角度と共役な作用変数を選んでシンプレクティック形式を標準化するのは次章INT3で扱います。

## 1. なぜ可換な保存量から「同時に動かせる流れ」ができるか

$(M^{2n},\omega)$ を滑らかなシンプレクティック多様体、$F=(F_1,\ldots,F_n):M\to\mathbb R^n$ を滑らかな写像とします。$F_1=H$ とし、全ての $i,j$ で $\{F_i,F_j\}=0$ とします。符号は[Hamiltonベクトル場とPoisson括弧](../../SYM/SYM4/index.md#def-sym4-poisson-bracket)に合わせ、

$$
\iota_{X_F}\omega=dF,\qquad
X_G(F)=\{F,G\}
$$

です。$F$ の各成分を固定した正則共通レベル $N=F^{-1}(c)$ については、[INT1で示した接空間の表示](../INT1/index.md#thm-int1-regular-fiber)から

$$
T_xN=\operatorname{span}\{X_{F_1}(x),\ldots,X_{F_n}(x)\},
\quad \dim N=n
\qquad(x\in N)
$$

が分かります。ここで重要なのは「接ベクトルが $n$ 個ある」だけでなく、各ベクトル場に沿って動かしても、他の保存量の値が変わらないことです。

例えば二つの非結合振動子の保存量 $F_1=(p_1^2+q_1^2)/2$、$F_2=(p_2^2+4q_2^2)/2$ では、$X_{F_1}$ は第1座標対だけ、$X_{F_2}$ は第2座標対だけを変化させます。先に第1振動子を時間 $s$ 動かしても、先に第2振動子を時間 $t$ 動かしても同じ点です。一般の場合もこれがPoisson可換性から従うことを、計算で確かめます。

<a id="lem-int2-commuting-complete"></a>

<!-- formal-statement-start -->
> **補題（可換Hamilton流とコンパクトレベル上の完備性）**  
> $(M^{2n},\omega)$ 上の滑らかな関数 $F_1,\ldots,F_n$ が $\{F_i,F_j\}=0$ を満たすとする。空でない正則共通レベル $N=F^{-1}(c)$ がコンパクトなら、各 $X_{F_i}$ は $N$ に接し、$N$ 上で全時間にわたり定義される流れ $\varphi_i^t:N\to N$ を持つ。また全ての $i,j,s,t$ について

$$
\varphi_i^s\circ\varphi_j^t
=\varphi_j^t\circ\varphi_i^s
$$

> が成立する。連結性はこの補題には不要である。
<!-- formal-statement-end -->

### 証明の見取り図

接していることは、保存量の微分 $dF_j(X_{F_i})$ が零になるためです。流れの可換性には「ベクトル場のLie括弧が零」を使います。コンパクト性は別の役割を持ち、解が有限時刻で逃げてしまわないことを保証します。

<!-- proof-start -->
### 証明

任意の $x\in N$ で

$$
dF_j(X_{F_i})=\{F_j,F_i\}=0
$$

なので、[正則共通レベルの接空間表示](../INT1/index.md#thm-int1-regular-fiber)により $X_{F_i}(x)\in T_xN$ です。よって各局所流は $N$ を保ちます。

任意の滑らかな関数 $g$ に作用させ、$X_{F_i}g=\{g,F_i\}$ を使うと、ベクトル場のLie括弧は

$$
\begin{aligned}
[X_{F_i},X_{F_j}]g
&=X_{F_i}(\{g,F_j\})-X_{F_j}(\{g,F_i\})\\
&=\{\{g,F_j\},F_i\}-\{\{g,F_i\},F_j\}\\
&=-\{g,\{F_i,F_j\}\}=0.
\end{aligned}
$$

最後の等式の前には[Poisson括弧のJacobi恒等式](../../../物理系/AMECH/AMECH6/index.md#thm-amech6-poisson-identities)を使いました。$g$ は任意なのでLie括弧は零です。Lie括弧が零なら、一方の局所流で他方のベクトル場を押し出しても変化しません。実際 $\frac{d}{ds}(\varphi_i^{-s})_*X_{F_j}$ はLie括弧の押し出しで零であり、$s=0$ では $X_{F_j}$ です。このため $\varphi_i^s$ は $X_{F_j}$ の積分曲線を再び同じベクトル場の積分曲線に移し、初期値問題の一意性から、両方の合成流は定義される範囲で一致します。

最後に全時間存在を示します。$N$ はコンパクトで、滑らかなベクトル場 $X_{F_i}|_N$ は有限個の局所座標で有界な微分方程式として記述できます。仮に最大解が有限の右端 $b$ で終了すると、$t_k\uparrow b$ に対しコンパクト性から $x(t_k)$ の収束部分列があり、極限点の局所ODE解を一意性でつなぐと $b$ より先まで延長できて矛盾します。左端についても同じです。したがって各流れは $t\in\mathbb R$ で定義され、可換性も全時間で成立します。
<!-- proof-end -->

コンパクトなのは位相空間 $M$ 全体ではなく、**固定したレベル集合 $N$** で十分です。次は可換な流れを一組の時間ベクトルで表します。

## 2. 時間の組と「戻ってくる時間」の群

$n$ 個の可換な流れに対して、時間 $t=(t_1,\ldots,t_n)\in\mathbb R^n$ を入力する写像を

$$
\Phi(t,x)=\varphi_1^{t_1}\circ\cdots\circ
\varphi_n^{t_n}(x)
$$

とします。流れの順序を変えてもよいため、

$$
\Phi(t,\Phi(s,x))=\Phi(t+s,x)
$$

が成立します。例えば一自由度の周期 $T$ の振動子では、時刻 $0$ と $T$ は同じ点を作り、$2T,-T$ なども同じ点を作ります。二自由度では「一つの周期」より、時間を二成分で束ねる方が自然です。

<a id="def-int2-period-group"></a>

<!-- formal-statement-start -->
> **定義（流れの周期群）**  
> 可換な完備流れ $\varphi_1^t,\ldots,\varphi_n^t$ が多様体 $N$ 上にあり、$\Phi:\mathbb R^n\times N\to N$ をその合成作用とする。点 $x\in N$ の周期群（安定化部分群）を

$$
\Gamma_x=\{t\in\mathbb R^n:\Phi(t,x)=x\}
$$

> と定める。$\Gamma_x$ は加法群 $(\mathbb R^n,+)$ の部分群である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-int2-period-group -->
### 直接例：二振動子の戻り時間

**定義の確認**：各流れで位置・運動量が元へ戻る条件を時間の組で表します。

$F_i=(p_i^2+\omega_i^2q_i^2)/2$（$\omega_i>0$）を、$M=\mathbb R^4$ の別々の座標対に置きます。両エネルギーを正の値 $c_i$ に固定すると、$X_{F_i}$ の流れは第 $i$ 振動子の位相だけを $\omega_it_i$ 進めます。したがって

$$
\Phi((t_1,t_2),x)=x
\quad\Longleftrightarrow\quad
\omega_it_i\in2\pi\mathbb Z\quad(i=1,2).
$$

このため全点に共通して

$$
\Gamma_x=
\frac{2\pi}{\omega_1}\mathbb Z
\times\frac{2\pi}{\omega_2}\mathbb Z.
$$

零ベクトル、加法、符号反転で閉じており、定義どおり加法部分群です。
<!-- definition-example-end -->

$N$ が正則であれば、$\Phi(t,x)$ を $t$ で微分したとき、$t=0$ の $n$ 方向の像が $X_{F_i}(x)$ です。前節で見たとおりこれは接空間の基底なので、逆関数定理によって $t$ の近傍と $x$ の近傍は滑らかに対応します。ゆえに $\Gamma_x$ は零の近くに零以外の元を持てません。加法部分群なので、任意の $a\in\Gamma_x$ の近くでも $a$ 以外の元は存在しません。これが**離散性**です。

離散だけでは $\mathbb Z$ のような一次元の周期群もあります。トーラスを得るためには、$n$ 個の独立な周期方向が要ります。そのための補題を用意します。

<a id="lem-int2-lattice"></a>

<!-- formal-statement-start -->
> **補題（周期群の格子構造）**  
> $\Gamma\subset\mathbb R^n$ を閉じた離散加法部分群とする。商空間 $\mathbb R^n/\Gamma$ がコンパクトなら、一次独立な $b_1,\ldots,b_n\in\mathbb R^n$ が存在して

$$
\Gamma=\mathbb Zb_1+\cdots+\mathbb Zb_n
$$

> と表せる。従って $\Gamma$ は階数 $n$ の格子であり、$\mathbb R^n/\Gamma$ は $n$ 次元トーラスと微分同相である。
<!-- formal-statement-end -->

### 証明の見取り図

格子の本数が足りなければ、ある方向へ無限に進んでも周期で同一視されず、商空間はコンパクトになれません。まず実線形包が $\mathbb R^n$ 全体だと示し、$n$ 本の独立な周期ベクトルを取ります。その後、それらで作る基本平行領域内に入り得る周期群の元が有限個であることを利用します。

<!-- proof-start -->
### 証明

$V=\operatorname{span}_{\mathbb R}\Gamma$ が $\mathbb R^n$ の真部分空間だと仮定します。$V$ を零に写す非零線形汎関数 $\ell:\mathbb R^n\to\mathbb R$ を選ぶと、$\ell(t+\gamma)=\ell(t)$（$\gamma\in\Gamma$）なので $\ell$ は商上の連続な実数値関数を定めます。その値域は $\ell(\mathbb R^n)=\mathbb R$ ですが、コンパクト空間の連続像はコンパクトでなければならず矛盾します。従って $V=\mathbb R^n$ です。

そこで $\Gamma$ から実一次独立な $\gamma_1,\ldots,\gamma_n$ を選び、$L=\sum_j\mathbb Z\gamma_j\subset\Gamma$ とします。各 $x\in\mathbb R^n$ は $x=\sum_j a_j\gamma_j$ と書けるので、各 $a_j$ の整数部分を引けば

$$
x-\sum_j\lfloor a_j\rfloor\gamma_j
=\sum_j r_j\gamma_j,\qquad0\le r_j<1
$$

となります。右辺は有界な閉基本平行領域 $P=\{\sum_jr_j\gamma_j:0\le r_j\le1\}$ に入ります。$\Gamma$ は閉じた離散部分群だからコンパクト集合 $P$ と交わる元は有限個です（無限個なら集積点を持ち、離散性に反します）。任意の $\gamma\in\Gamma$ をこのように整数移動すれば $\gamma=\lambda+r$（$\lambda\in L,\ r\in\Gamma\cap P$）となるので、$\Gamma/L$ は有限群です。

この有限群の位数を $d$ とすると、任意の $\gamma\in\Gamma$ に対し $d\gamma\in L$ です。したがって線形同型 $B:\mathbb R^n\to\mathbb R^n$、$B(e_j)=\gamma_j$ を使えば

$$
\mathbb Z^n\subset B^{-1}\Gamma
\subset\frac1d\mathbb Z^n.
$$

$dB^{-1}\Gamma$ は $\mathbb Z^n$ の部分群です。任意の整数格子の部分群が自由アーベル群となることを、座標の個数についての帰納法で示します。

第一座標への射影の像は $a\mathbb Z$（$a\ge0$）です。$a>0$ なら第一座標が $a$ の元を一つ選び、その整数倍を引くことで、任意の元を第一座標が零の核へ移せます。

この核は $\mathbb Z^{n-1}$ の部分群なので帰納法が使えます。$a=0$ の場合はもともと全体が核です。したがって $\Gamma$ は高々 $n$ 本の整数基底で生成されます。

一方、$\Gamma$ の実線形包は $\mathbb R^n$ です。生成元は実線形に全空間を張らねばならないため、整数基底はちょうど $n$ 本あります。それらを $b_1,\ldots,b_n$ とします。

$C(e_j)=b_j$ とすれば、$C$ は可逆線形写像で、$\Gamma=C(\mathbb Z^n)$ です。従って

$$
\mathbb R^n/\Gamma
\cong\mathbb R^n/\mathbb Z^n
\cong(\mathbb R/2\pi\mathbb Z)^n
$$

です。最後の同型は各実座標に $2\pi$ を掛ける写像で与えられ、商上でも滑らかな逆を持ちます。
<!-- proof-end -->

## 3. Liouville–Arnoldの定理：トーラスが現れるまで

既知の条件を揃えます。Poisson可換な $n$ 個の関数が一般点で独立であるだけでは、今回の結論はまだ得られません。**選んだ共通レベルの全点で**独立であること、またそのレベルが空でなくコンパクトかつ連結であることを定理に含めます。

<a id="thm-int2-liouville-arnold"></a>

<!-- formal-statement-start -->
> **定理（Liouville–Arnoldの定理：トーラスと直線運動）**  
> $(M^{2n},\omega)$ を滑らかなシンプレクティック多様体とし、滑らかな実数値関数 $F_1,\ldots,F_n$ は $F_1=H$、$\{F_i,F_j\}=0$（全 $i,j$）を満たすとする。$c\in\mathbb R^n$ について空でない共通レベル集合 $N=F^{-1}(c)$ が **コンパクトかつ連結**であり、全ての $x\in N$ で $\operatorname{rank}dF_x=n$ と仮定する。このとき：
>
> 1. $N$ は $n$ 次元トーラス $(\mathbb R/2\pi\mathbb Z)^n$ と微分同相である。
> 2. このトーラス上の滑らかな角度座標 $\theta=(\theta_1,\ldots,\theta_n)$ を適切に選ぶと、各 $X_{F_i}$ は定数係数の直線流となる。特にHamilton流 $X_H=X_{F_1}$ は、ある定数ベクトル $\Omega\in\mathbb R^n$ に対して

$$
\theta(t)=\theta(0)+t\Omega
\pmod{2\pi\mathbb Z^n}
$$

> と表される。
>
> ここで主張する角度座標は固定したレベル $N$ 上の座標であり、近傍での正準作用角座標の構成は含めない。
<!-- formal-statement-end -->

### 証明の見取り図

まず $N$ の接空間は $X_{F_i}$ の基底で張られ、コンパクト性から各流れが完備です。可換な流れの合成 $\Phi$ は $\mathbb R^n$ の作用を与え、その各軌道は $N$ の開集合になります。連結性によって作用は推移的となり、$N$ は $\mathbb R^n$ を周期群で割った商です。局所座標とコンパクト性で周期群が最大階数の格子だと判定し、最後に格子の基底から角度を作ります。

<!-- proof-start -->
### 証明

**第1段階：完備で可換な作用。** [可換Hamilton流の補題](#lem-int2-commuting-complete)を $F_1,\ldots,F_n$ とコンパクトな正則レベル $N$ に適用します。各 $X_{F_i}$ は $N$ に接し、全時間流れを持ち、互いに可換です。よって

$$
\Phi(t,x)=\varphi_1^{t_1}\cdots\varphi_n^{t_n}(x)
$$

は $\mathbb R^n$ の滑らかな作用です。

**第2段階：任意の軌道が開。** $x\in N$ に対し、軌道写像 $\Psi_x:\mathbb R^n\to N$ を $\Psi_x(t)=\Phi(t,x)$ とします。その原点での微分は

$$
d(\Psi_x)_0(e_i)=X_{F_i}(x).
$$

[正則共通レベルの接空間表示](../INT1/index.md#thm-int1-regular-fiber)より右辺は $T_xN$ の基底です。$n$ 次元同士の可逆な微分なので、[逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)を $\Psi_x$ の原点へ適用すると、像には $x$ の近傍が含まれます。同じ議論を軌道上の各点へ施せば、軌道全体が $N$ の開集合です。異なる軌道は交わらず、全軌道が $N$ を開集合に分割します。もし軌道が複数なら、一つの軌道と残りの軌道の合併が互いに交わらない非空の開集合となり連結性に反します。従って軌道は一つで、$\Psi_x$ は全射です。

**第3段階：周期群で割る。** 点 $x_0\in N$ を固定し、[周期群](#def-int2-period-group) $\Gamma=\Gamma_{x_0}$ を取ります。$\Gamma=\Psi_{x_0}^{-1}(\{x_0\})$ なので、$N$ がHausdorffであることから閉集合です。$d(\Psi_{x_0})_0$ が可逆なので、ある零近傍 $U$ では $\Psi_{x_0}(t)=x_0$ を満たす $t$ は零だけです。従って $\Gamma\cap U=\{0\}$、加法性から $\Gamma$ は離散部分群です。

また、作用の法則と推移性を使うと

$$
\Psi_{x_0}(t)=\Psi_{x_0}(s)
\quad\Longleftrightarrow\quad
\Phi(t-s,x_0)=x_0
\quad\Longleftrightarrow\quad t-s\in\Gamma.
$$

そこで $\Psi_{x_0}$ は商写像

$$
\overline\Psi:\mathbb R^n/\Gamma\longrightarrow N,
\qquad[t]\longmapsto\Phi(t,x_0)
$$

を誘導し、これは全単射です。局所的には $\Psi_{x_0}$ は可逆微分を持ち、任意の $t$ でも $d(\Psi_{x_0})_t(e_i)=X_{F_i}(\Phi(t,x_0))$ が基底になります。離散群による並進の商射影も局所微分同相です。従って $\overline\Psi$ は局所微分同相であり、全単射なので微分同相です。

**第4段階：コンパクト性から格子。** $N$ はコンパクトなので、$\mathbb R^n/\Gamma$ も $\overline\Psi$ の逆像としてコンパクトです。[格子構造の補題](#lem-int2-lattice)から、$\Gamma$ には実一次独立な整数基底 $b_1,\ldots,b_n$ が存在します。基底を列に並べた可逆行列

$$
B=(b_1\ \cdots\ b_n)
$$

を作ると、$\Gamma=B\mathbb Z^n$ です。この時点で $\mathbb R^n/\Gamma$ は $n$ 次元トーラスと分かります。

**第5段階：直線運動。** $y=\Phi(t,x_0)$ となる $t$ を選び、

$$
\theta(y)=2\pi B^{-1}t\pmod{2\pi\mathbb Z^n}
$$

と置きます。別の代表 $t+B m$（$m\in\mathbb Z^n$）を選んでも、右辺が $2\pi m$ だけ変わるので、角度はwell-definedです。$\overline\Psi$ が微分同相であるため、これはトーラス値の滑らかな座標です。

$\Phi(se_i,\Phi(t,x_0))=\Phi(t+se_i,x_0)$ を上式へ代入すると

$$
\theta(\varphi_i^s(y))
=\theta(y)+2\pi s B^{-1}e_i
\pmod{2\pi\mathbb Z^n}.
$$

従って各 $X_{F_i}$ は角度座標で定数ベクトル $2\pi B^{-1}e_i$ に対応し、特に $H=F_1$ に対して

$$
\Omega=2\pi B^{-1}e_1,\qquad
\theta(t)=\theta(0)+t\Omega
$$

が成り立ちます。これで二つの結論を得ました。
<!-- proof-end -->

証明を閉じても核心は次の三点です。**正則性**が接空間を張る独立な流れを与え、**連結性**が一つの軌道にまとめ、**コンパクト性**が周期群の格子を最大階数にします。この三つを欠く場合を第6節で比較します。

## 4. トーラス上の振動数はどう決まるか

定理で得たトーラスの角度座標は一意ではありません。選ぶ周期格子の基底が変われば角度も変わります。そのため流れの速度を数値化するときは、何を固定した数値か明確にする必要があります。

<a id="def-int2-frequency"></a>

<!-- formal-statement-start -->
> **定義（振動数ベクトル）**  
> [Liouville–Arnoldの定理](#thm-int2-liouville-arnold)の仮定の下、固定した正則レベル $N$ の周期群 $\Gamma$ に整数基底 $b_1,\ldots,b_n$ を選び、$B=(b_1\ \cdots\ b_n)$ とする。$F_1=H$ に対する角度 $\theta=2\pi B^{-1}t$ で

$$
\Omega=2\pi B^{-1}e_1
$$

> を $N$ 上のHamilton流の振動数ベクトルという。ここで $e_1=(1,0,\ldots,0)^{\mathsf T}$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-int2-frequency -->
### 直接例：振動子の周期行列

**定義の確認**：周期格子の基底を行列にして逆行列を掛けます。

二つの振動子 $F_1=(p_1^2+\omega_1^2q_1^2)/2$、$F_2=(p_2^2+\omega_2^2q_2^2)/2$ の固定した正エネルギーレベルでは、

$$
B=\begin{pmatrix}2\pi/\omega_1&0\\0&2\pi/\omega_2\end{pmatrix},
\quad
2\pi B^{-1}=\begin{pmatrix}\omega_1&0\\0&\omega_2\end{pmatrix}.
$$

ここでHamiltonianを $H=F_1+F_2$ とするなら、定理の関数族を $G_1=H,\ G_2=F_2$ と選び直します。時間 $(s,t)$ の作用は $F_1$ を時間 $s$、$F_2$ を時間 $s+t$ 動かすので、周期条件は

$$
\omega_1s\in2\pi\mathbb Z,\qquad
\omega_2(s+t)\in2\pi\mathbb Z.
$$

その基底行列は

$$
B_G=
\begin{pmatrix}
2\pi/\omega_1&0\\
-2\pi/\omega_1&2\pi/\omega_2
\end{pmatrix}.
$$

実際 $B_G(s_1,s_2)^{\mathsf T}$ の第一成分が第1流の時間、二成分の和が第2流の時間です。逆行列の第一列を計算すると

$$
B_G^{-1}e_1=
\begin{pmatrix}\omega_1/(2\pi)\\\omega_2/(2\pi)\end{pmatrix},
\qquad
\Omega=(\omega_1,\omega_2)^{\mathsf T}.
$$

従って物理的なHamilton流は二つの振動子の位相をそれぞれ角速度 $\omega_1,\omega_2$ で進めます。このように**$H$ を先頭とした可換族で周期行列を作る**と、定義と具体計算が一致します。
<!-- definition-example-end -->

もし周期格子の別の整数基底を選べば、ある $A\in GL(n,\mathbb Z)$ により $B'=BA$ と書けます。従って

$$
\theta'=A^{-1}\theta,\qquad
\Omega'=A^{-1}\Omega
$$

です。個々の成分の値はこの整数座標変換で変わりますが、軌道が周期的かどうかは変わりません。振動数の比を語る際にも、どのトーラス座標を選んだかを意識します。

## 5. 周期運動と準周期運動

角度の各成分が一定速度で動いていても、全成分が同時に元へ戻るとは限りません。例えば角速度が $1$ と $\sqrt2$ なら、第1位相が $2\pi$ 進んだとき第2位相は $2\pi\sqrt2$ 進み、整数周回ではありません。そこでトーラス上の直線流の言葉を定めます。

<a id="def-int2-quasiperiodic"></a>

<!-- formal-statement-start -->
> **定義（トーラス上の準周期運動）**  
> $n$ 次元トーラス $\mathbb T^n=(\mathbb R/2\pi\mathbb Z)^n$ 上で、一定の $\Omega\in\mathbb R^n$ により

$$
\theta(t)=\theta(0)+t\Omega\pmod{2\pi\mathbb Z^n}
$$

> と表される運動を、振動数 $\Omega$ の準周期運動という。$n=1$ や振動数間に整数関係がある場合には周期運動も含む。$\Omega$ に非自明な整数関係 $k\cdot\Omega=0$（$0\ne k\in\mathbb Z^n$）が一つもないときは、有理独立な振動数という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-int2-quasiperiodic -->
### 直接例：閉じる軌道と閉じない軌道

**定義の確認**：$n=2$ で両成分を時間 $t$ に比例させます。

$\Omega=(1,2)$ なら $\theta(t)=\theta(0)+t(1,2)$ であり、$t=2\pi$ では両角度が整数周回して元の点へ戻ります。一方 $\Omega=(1,\sqrt2)$ なら同じ直線流の形ですが、整数関係 $k_1+k_2\sqrt2=0$ を満たす非零整数対はありません。どちらも定義の準周期運動です。
<!-- definition-example-end -->

<a id="prop-int2-periodicity"></a>

<!-- formal-statement-start -->
> **命題（直線運動の周期判定）**  
> $\Omega\in\mathbb R^n$、$\theta(t)=\theta_0+t\Omega$（$\bmod\ 2\pi\mathbb Z^n$）とする。この軌道が正の周期 $T$ を持つための必要十分条件は

$$
T\Omega\in2\pi\mathbb Z^n
\quad\text{となる }T>0\text{ が存在すること}
$$

> である。特に $n=2$ で $\Omega_1\Omega_2\ne0$ なら、周期を持つことと $\Omega_1/\Omega_2\in\mathbb Q$ は同値である。
<!-- formal-statement-end -->

### 証明の見取り図

トーラスの同一点とは各角度成分の差が $2\pi$ の整数倍であることです。二次元ではその二つの整数の比が振動数比になります。逆向きでは有理数の分母を使って同時周回時間を作ります。

<!-- proof-start -->
### 証明

$\theta(T)=\theta(0)$ は、トーラスの同値関係の定義から $T\Omega=2\pi m$ を満たす $m\in\mathbb Z^n$ が存在することと同値です。これで一般の場合を得ます。

$n=2$ で両振動数が非零とします。周期があれば $T\Omega_i=2\pi m_i$ で $m_i\ne0$ だから

$$
\frac{\Omega_1}{\Omega_2}
=\frac{T\Omega_1}{T\Omega_2}
=\frac{m_1}{m_2}\in\mathbb Q.
$$

逆に $\Omega_1/\Omega_2=a/b$（$a\in\mathbb Z$、$b\in\mathbb Z\setminus\{0\}$）なら $\Omega_1/\Omega_2=a/b$ なので、$T=2\pi|b/\Omega_2|>0$ を選びます。このとき $T\Omega_2=2\pi\,\operatorname{sgn}(\Omega_2)b$ と書く式は符号の選び方に注意が必要ですが、いずれも整数倍です。より直接には $T=2\pi |b/\Omega_2|$ から

$$
\frac{T\Omega_2}{2\pi}=b\,\operatorname{sgn}(b/\Omega_2),
\qquad
\frac{T\Omega_1}{2\pi}=a\,\operatorname{sgn}(b/\Omega_2)
$$

となり、両方とも整数です。従って周期があります。
<!-- proof-end -->

振動数が有理独立なら軌道はトーラス全体に稠密になります。なぜなら、任意の $0\ne k\in\mathbb Z^n$ に対して $k\cdot\Omega\ne0$ なので、軌道に沿うFourierモードの時間平均が

$$
\frac1T\int_0^T e^{ik\cdot(\theta_0+t\Omega)}\,dt
=e^{ik\cdot\theta_0}
\frac{e^{iT(k\cdot\Omega)}-1}{iT(k\cdot\Omega)}
\longrightarrow0
$$

となるからです。定数モードは平均1です。トーラスの連続関数は有限三角多項式で一様近似できるというFourier近似を用いると、各連続関数の時間平均が空間平均へ収束します。もし軌道の閉包がトーラスの真部分なら、その閉包で零・閉包外のある開集合で正となる連続関数を選べ、その時間平均は零なのに空間平均は正という矛盾になります。したがって閉包はトーラス全体です。

ただし、**非周期的であることとトーラス全体に稠密であることは同義ではありません**。例えば $\Omega=(1,\sqrt2,2)$ ではどの $T>0$ も全成分を整数周回させられませんが、常に $\theta_3-2\theta_1=\text{定数}$（$\bmod\ 2\pi$）となり、軌道は三次元トーラス全体には稠密でありません。

## 6. 三つの仮定はどこで使われるか

**コンパクト性がない場合。** $\mathbb R^2$ に $\omega=dq\wedge dp$、$H=p$ を置きます。$dH=dp$ は全点で非零なので、$N=\{p=c\}$ は正則かつ連結です。しかし $N\cong\mathbb R$ は非コンパクトで、$X_H=\partial_q$ の流れは $q(t)=q(0)+t$ です。周期群は $\{0\}$ であり、$\mathbb R/\{0\}$ は円ではありません。失われる機構は**周期群の最大階数性**です。コンパクト性がなくても流れが完備な例ですが、トーラス構造は出ません。

**正則性がない場合。** $H=(q^2+p^2)/2$ のエネルギー $0$ のレベルは原点一つで、$dH=0$、$X_H=0$ です。これはコンパクトで連結ですが一次元円ではありません。逆関数定理で軌道を開集合にするための基底 $X_H$ を持てず、周期群も $\mathbb R$ 全体になって離散ではありません。

**連結性がない場合。** 一自由度で

$$
H(q,p)=\frac{p^2}{2}+(q^2-1)^2
$$

とし、$0<E<1$ を固定します。$H=E$ では $|q^2-1|\le\sqrt E<1$ だから $q$ は零になれず、$q>0$ 側と $q<0$ 側に分離します。両側で $(q^2-1)^2\le E$ の区間の上下の $p=\pm\sqrt{2(E-(q^2-1)^2)}$ が端点でつながり、互いに別の閉曲線を作ります。$dH=4q(q^2-1)\,dq+p\,dp$ が零となるのは $p=0$ かつ $q=0,\pm1$ の点で、そのエネルギーは $1$ または $0$ です。従って $E\in(0,1)$ のレベルは**コンパクトで正則だが二つの円の非連結和**です。各連結成分には定理を適用できても、全体を一つの円にはできません。

以上の例は、仮定を単に暗記するのではなく「どの証明段階が壊れるか」を示しています。

## 7. 演習：周期格子から運動までを再構成する

### Level A

<a id="ex-int2-a01"></a>
**A1. 二つのHamiltonベクトル場の可換性。** 滑らかなシンプレクティック多様体上で $\{F,G\}=0$ とする。$X_Fh=\{h,F\}$ とJacobi恒等式を用いて $[X_F,X_G]=0$ を示せ。

- Level: A

<!-- solution-start -->
**詳細解答。** 任意の滑らかな $h$ に対して、ベクトル場を微分作用素とみなした括弧演算の定義から

$$
[X_F,X_G]h=X_F(X_Gh)-X_G(X_Fh)
=\{\{h,G\},F\}-\{\{h,F\},G\}.
$$

[Jacobi恒等式](../../../物理系/AMECH/AMECH6/index.md#thm-amech6-poisson-identities)を $(h,G,F)$ の順に適用し、反対称性も使うと

$$
\{\{h,G\},F\}-\{\{h,F\},G\}
=-\{h,\{F,G\}\}=0.
$$

任意の $h$ への作用が零なのでLie括弧ベクトル場は零です。[可換流の補題](#lem-int2-commuting-complete)の前半を再導出しました。
<!-- solution-end -->

<a id="ex-int2-a02"></a>
**A2. 接空間と流れ。** $M=\mathbb R^4$、$F_1=(p_1^2+q_1^2)/2$、$F_2=(p_2^2+4q_2^2)/2$、$c_1,c_2>0$ とする。$dF_j(X_{F_i})=0$ を全 $i,j$ について確認し、共通レベルの次元を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $X_{F_1}=p_1\partial_{q_1}-q_1\partial_{p_1}$、$X_{F_2}=p_2\partial_{q_2}-4q_2\partial_{p_2}$ です。一方

$$
dF_1=q_1dq_1+p_1dp_1,\qquad
dF_2=4q_2dq_2+p_2dp_2.
$$

従って $dF_1(X_{F_1})=q_1p_1-p_1q_1=0$、$dF_2(X_{F_2})=4q_2p_2-4p_2q_2=0$、交差項は座標対が異なるので零です。正のエネルギーでは各座標対が非零なので $dF_1,dF_2$ は独立であり、[正則共通レベルの不変性とLagrange性](../INT1/index.md#thm-int1-regular-fiber)から次元は $4-2=2$ です。
<!-- solution-end -->

<a id="ex-int2-a03"></a>
**A3. 一自由度の周期群。** $\omega>0$ とし、$H=(p^2+\omega^2q^2)/2$ の正エネルギー円上で $X_H$ の周期群を求め、$\mathbb R/\Gamma$ が円になることを具体的に説明せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** Hamilton方程式は $\dot q=p,\ \dot p=-\omega^2q$ です。初期値 $(q_0,p_0)\ne(0,0)$ に対して

$$
q(t)=q_0\cos\omega t+\frac{p_0}{\omega}\sin\omega t,
\qquad
p(t)=-\omega q_0\sin\omega t+p_0\cos\omega t.
$$

変換は非零ベクトル $(\omega q_0,p_0)$ の平面回転であり、元の点へ戻るのは $\omega t\in2\pi\mathbb Z$ のときだけです。従って $\Gamma=(2\pi/\omega)\mathbb Z$ です。角度 $\theta=\omega t$ は $\Gamma$ の違いでは $2\pi$ の整数倍だけ変わるので、$\mathbb R/\Gamma\to\mathbb R/(2\pi\mathbb Z)$ を与えます。
<!-- solution-end -->

<a id="ex-int2-a04"></a>
**A4. 振動数の周期判定。** $\mathbb T^2$ の直線流について、(i) $\Omega=(2,3)$、(ii) $\Omega=(2,\sqrt2)$ が周期を持つか判定し、(i) の正の最小周期を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** [周期判定命題](#prop-int2-periodicity)より必要十分条件は $T\Omega/(2\pi)\in\mathbb Z^2$ です。(i) では $2T=2\pi m$、$3T=2\pi k$ だから $3m=2k$ です。最小の正整数解は $(m,k)=(2,3)$ であり、$T=2\pi$ です。(ii) は比 $2/\sqrt2=\sqrt2$ が無理数で、両成分とも非零です。したがって正の周期は存在しません。
<!-- solution-end -->

### Level B

<a id="ex-int2-b01"></a>
**B1. 商の離散性と推移性。** $N$ を連結な $n$ 次元多様体とし、可換で完備なベクトル場 $Y_1,\ldots,Y_n$ が各点で接空間の基底を成すとする。合成流の $\mathbb R^n$ 作用が推移的で、各点の周期群が閉じた離散部分群になることを示せ。コンパクト性を仮定する必要があるかも述べよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $\Psi_x(t)$ を合成流による軌道写像とします。原点の微分は $d(\Psi_x)_0e_i=Y_i(x)$ なので同型です。[逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)から各軌道は $N$ の開集合です。軌道の集合は互いに交わらない分割をなし、連結性から軌道は一つで推移的です。$\Gamma_x=\Psi_x^{-1}(\{x\})$ はHausdorff性と連続性により閉集合です。原点近くで $\Psi_x$ は単射なので $\Gamma_x$ は原点の近くに非零元を持ちません。加法部分群だから全ての元が孤立し、離散です。ここまでにコンパクト性は不要です。完備性は問題文で既に仮定してあり、コンパクト性は後で $\mathbb R^n/\Gamma$ のコンパクト性を導くために必要です。
<!-- solution-end -->

<a id="ex-int2-b02"></a>
**B2. 格子と商トーラス。** $\Gamma\subset\mathbb R^2$ が $b_1=(2,0)^{\mathsf T}$、$b_2=(1,3)^{\mathsf T}$ の整数線形結合全体であるとする。(i) $\Gamma$ が離散であること、(ii) $\theta=2\pi B^{-1}t$ が $\mathbb R^2/\Gamma$ の角度座標になること、(iii) $t(s)=t_0+se_1$ の振動数を示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** $B=\begin{pmatrix}2&1\\0&3\end{pmatrix}$ は $\det B=6\ne0$ なので可逆です。(i) $\gamma_k=Bm_k$（$m_k\in\mathbb Z^2$）が零へ収束すれば $m_k=B^{-1}\gamma_k\to0$ です。整数点列は十分後に零だけなので $\Gamma$ は離散です。(ii) 逆行列を求めると

$$
B^{-1}=\begin{pmatrix}1/2&-1/6\\0&1/3\end{pmatrix}.
$$

$t'=t+Bm$ なら $2\pi B^{-1}t'=2\pi B^{-1}t+2\pi m$ ですから角度はwell-definedです。逆に角度が一致すれば $B^{-1}(t'-t)\in\mathbb Z^2$ なので同じ商の点です。(iii) $\dot t=e_1$ より

$$
\dot\theta=2\pi B^{-1}e_1
=\begin{pmatrix}\pi\\0\end{pmatrix}.
$$

従って第一角だけ速度 $\pi$ で動き、第二角は一定です。
<!-- solution-end -->

<a id="ex-int2-b03"></a>
**B3. 反例の仮定を特定する。** (i) $H=p$（$\mathbb R^2$）、(ii) $H=(p^2+q^2)/2$ の零レベル、(iii) $H=p^2/2+(q^2-1)^2$ の $0<E<1$ のレベルについて、それぞれ正則性・コンパクト性・連結性を判定し、トーラス定理の証明のどの段階を失うか述べよ。

- Level: B

<!-- solution-start -->
**詳細解答。**

(i) $dH=dp\ne0$ で正則です。$H=c$ は位置 $q$ が任意に動ける一本の直線だから、連結ですが非コンパクトです。$X_H=\partial_q$ は完備でも周期群は $\{0\}$ であり、商 $\mathbb R$ が非コンパクトになります。

(ii) 零レベルは原点だけでコンパクト・連結ですが、$dH=0$ なので非正則です。流れの微分は零で局所微分同相になりません。周期群は $\mathbb R$ 全体となり、離散性を失います。

(iii) $dH=p\,dp+4q(q^2-1)\,dq$ が零となる点のエネルギーは $0$ または $1$ のみです。よって $E\in(0,1)$ は正則レベルです。

さらに $p^2/2\le E$ と $(q^2-1)^2\le E$ からレベルは有界であり、閉集合でもあるのでコンパクトです。

しかし $|q^2-1|\le\sqrt E<1$ から $q\ne0$ です。正負二つの連結成分に分かれ、各成分では定理が適用できますが、全体での推移性はありません。
<!-- solution-end -->

<a id="ex-int2-b04"></a>
**B4. 整数基底変換で振動数が変わる。** $\mathbb T^2$ の直線流が振動数 $\Omega=(1,\sqrt2)^{\mathsf T}$ を持つとする。$A=\begin{pmatrix}1&1\\0&1\end{pmatrix}\in GL(2,\mathbb Z)$ を使い、$\theta'=A^{-1}\theta$ の振動数を求めよ。また新しい振動数が有理独立であることを示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** 行列式は1なので $A^{-1}=\begin{pmatrix}1&-1\\0&1\end{pmatrix}$ も整数行列です。$2\pi\mathbb Z^2$ はこの変換で自分自身へ写るので、$\theta'$ はトーラスの適切な座標です。時間微分して

$$
\Omega'=A^{-1}\Omega=
\begin{pmatrix}1-\sqrt2\\\sqrt2\end{pmatrix}.
$$

もし $k_1(1-\sqrt2)+k_2\sqrt2=0$（$k_1,k_2\in\mathbb Z$）なら

$$
k_1+(k_2-k_1)\sqrt2=0.
$$

$\sqrt2$ の無理性から $k_1=0,\ k_2-k_1=0$ となり、非零整数関係はありません。従って有理独立性は保存されます。
<!-- solution-end -->

### Level C

<a id="ex-int2-c01"></a>
**C1. 二自由度振動子からトーラス定理の全機構を再構成。** $\omega_1,\omega_2>0$ とし、$\mathbb R^4$ に

$$
H=\frac12(p_1^2+\omega_1^2q_1^2)
+\frac12(p_2^2+\omega_2^2q_2^2),
\qquad F_2=\frac12(p_2^2+\omega_2^2q_2^2)
$$

を置く。$F_1=H$ とする。(i) $(F_1,F_2)$ のPoisson可換性と正則性を $F_1=E_1+E_2,\ F_2=E_2$（$E_i>0$）で確認せよ。(ii) $X_{F_1},X_{F_2}$ の合成流から周期群の整数基底を求めよ。(iii) その基底による角度と物理Hamilton流の振動数を求めよ。(iv) $\omega_1/\omega_2\in\mathbb Q$ と無理数の場合の運動を比較し、$E_2=0$ で同じ議論を適用できない理由を述べよ。

- Level: C

<!-- solution-start -->
**詳細解答。** (i) 各座標対のエネルギーを $h_i=(p_i^2+\omega_i^2q_i^2)/2$ とすると、$H=h_1+h_2$、$F_2=h_2$ です。異なる座標対のPoisson括弧は零、自己括弧も零だから

$$
\{F_1,F_2\}=\{h_1+h_2,h_2\}
=\{h_1,h_2\}+\{h_2,h_2\}=0.
$$

また $dF_1=dh_1+dh_2$、$dF_2=dh_2$ です。レベル上で $E_i>0$ だから $(q_i,p_i)\ne(0,0)$ であり、$dh_i=\omega_i^2q_i\,dq_i+p_i\,dp_i$ はそれぞれ異なる座標対上で非零です。もし $a\,dF_1+b\,dF_2=0$ なら

$$
a\,dh_1+(a+b)\,dh_2=0.
$$

第一座標対の成分から $a=0$、第二座標対から $a+b=0$、従って $b=0$ です。レベルは二つの閉楕円の直積なのでコンパクト・連結です。ここで[Liouville–Arnoldの定理](#thm-int2-liouville-arnold)を適用できます。

(ii) $X_H=X_{h_1}+X_{h_2}$ は両方を同時に進め、$X_{F_2}=X_{h_2}$ は第二だけを進めます。時間組 $(s,t)$ の流れは第1振動子の位相を $\omega_1s$、第2を $\omega_2(s+t)$ 進めます。両方が元に戻る必要十分条件は

$$
\omega_1s=2\pi m_1,\qquad
\omega_2(s+t)=2\pi m_2,\qquad m_i\in\mathbb Z.
$$

まず $s=2\pi m_1/\omega_1$、これを第二式へ代入して $t=2\pi m_2/\omega_2-2\pi m_1/\omega_1$ です。従って周期群の整数基底と行列は

$$
b_1=\begin{pmatrix}2\pi/\omega_1\\-2\pi/\omega_1\end{pmatrix},
\quad
b_2=\begin{pmatrix}0\\2\pi/\omega_2\end{pmatrix},
\quad
B=\begin{pmatrix}2\pi/\omega_1&0\\-2\pi/\omega_1&2\pi/\omega_2\end{pmatrix}.
$$

列が独立であり、全ての $(m_1,m_2)$ に対応することから $\Gamma=B\mathbb Z^2$ を確認できます。

(iii) $B^{-1}=\begin{pmatrix}\omega_1/(2\pi)&0\\\omega_2/(2\pi)&\omega_2/(2\pi)\end{pmatrix}$ です。したがって $\theta=2\pi B^{-1}(s,t)^{\mathsf T}$ から

$$
\theta_1=\omega_1s,\qquad
\theta_2=\omega_2(s+t)\pmod{2\pi},
\qquad
\Omega=2\pi B^{-1}e_1=
\begin{pmatrix}\omega_1\\\omega_2\end{pmatrix}.
$$

これは直接解 $q_i=\sqrt{2E_i}\sin(\theta_i)/\omega_i$、$p_i=\sqrt{2E_i}\cos(\theta_i)$ の位相進行とも一致します。

(iv) [周期判定命題](#prop-int2-periodicity)により $\omega_1/\omega_2$ が有理数なら同時周回時間 $T>0$ があり全軌道は周期的です。無理数なら共通の正の周期はなく、両振動数は有理独立なので直線流は二次元トーラスに稠密です。一方 $E_2=0$ では $(q_2,p_2)=(0,0)$ に固定され $dh_2=0$ です。よって $dF_1,dF_2$ は独立ではなく、共通レベルは楕円一個に退化します。二次元トーラスを結論するための正則性を失っているので、定理をそのまま適用してはいけません。
<!-- solution-end -->

## 8. 次章への橋：角度だけではまだ正準座標ではない

この章で得た角度 $\theta$ は、固定した正則なコンパクト連結レベルの上でHamilton流を直線化します。しかし $\theta$ は $N$ の外側へどのように延長するかを指定しておらず、それだけでは $\omega$ を

$$
\omega=\sum_{i=1}^n d\theta_i\wedge dI_i
$$

の形へ直したことにはなりません。次章INT3では、共通レベルが動く方向も含め、閉曲線に沿う作用積分から $I_i$ を作り、$\theta_i$ と組にした**作用角変数**を構成します。今回はまず「なぜトーラスか」「なぜ一定速度か」を、正則性・連結性・コンパクト性の使いどころまで含めて証明しました。
