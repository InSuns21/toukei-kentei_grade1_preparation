# PML1-10 不変分布と詳細釣合いは同じか

<!-- definition-example-audit: strict -->

[PML1-09の不変確率分布](../PML1-09/index.md#def-pml1-09-invariant)は、ある分布から出発したとき、その分布が時間発展の後も変わらないことを要求した。しかし「全体の分布が動かない」ことは「個々の状態間の移動が行きと帰りで釣り合う」こととは異なる。三つの状態を一方向へ巡る粒子を想像すると、各状態に入る粒子数と出る粒子数が同じでも、粒子は回り続ける。

この講義では、まず有限状態の移動で二つの条件を区別する。次に[Gibbs不変性を示した前講の確率流](../PML1-09/index.md#prop-pml1-09-fokker-planck)を使い、連続状態でも循環が生じることを計算する。最後に「分布の散逸」と「定常状態で続く散逸」を別々の量として判定する。

## 1. 分布を保つことと、向きを反転しても区別できないこと

[STO11の遷移確率核](../../../解析系/STO/STO11/index.md#def-sto11-transition-kernel) $P_t(x,B)$ は、時刻 $0$ に状態 $x$ から出発して、時刻 $t$ に集合 $B$ へ入る条件付き確率である。

確率分布 $\pi$ に従って初期状態を選ぶと、順序付きの二点 $(X_0,X_t)$ の同時確率は次の積測度で表される。

$
\pi(dx)P_t(x,dy).
$

**不変性**が指定するのは二点分布の後半、すなわち $X_t$ の周辺分布だけである。

そこで、二点の時間順序を入れ替えても同時分布が等しいという、より強い条件を考える。有限状態CTMCでは[CTMC の詳細釣合い](../../../解析系/SP/SP13/index.md#def-sp13-detailed-balance)を遷移率で定義し、[詳細釣合いと CTMC の可逆性](../../../解析系/SP/SP13/index.md#thm-sp13-reversibility)を証明した。ここでは任意の可測状態空間に広げ、遷移核の二時刻分布を使って述べる。

<a id="def-pml1-10-detailed-balance"></a>

<!-- formal-statement-start -->
> **定義（時間一様Markov過程の詳細釣合い）**  
> 可測状態空間 $E$ 上の保存的な時間一様Markov遷移核 $P_t(x,B)$ と確率測度 $\pi$ があるとする。すべての $t\ge0$ とすべての可測集合 $A,B\subset E$ について
>
$$
\int_A P_t(x,B)\,\pi(dx)
=\int_B P_t(y,A)\,\pi(dy)
$$
>
> が成り立つとき、$P_t$ は $\pi$ に関して**時間一様Markov過程の詳細釣合い**を満たし、過程は $\pi$ に関して**可逆**であるという。ここで「保存的」とは $P_t(x,E)=1$ をいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-10-detailed-balance -->
**定義の直接確認**：$E=\{0,1\}$、$0<r<1$ とし、独立な指数待ち時間の後に相手の状態へ移る率が両方向とも $r$ の連続時間Markov連鎖を考える。率行列は $Q=\left(\begin{smallmatrix}-r&r\\r&-r\end{smallmatrix}\right)$ であり、時間 $t$ の遷移行列は
$$
P_t=e^{tQ}
=\frac12
\begin{pmatrix}
1+e^{-2rt}&1-e^{-2rt}\\
1-e^{-2rt}&1+e^{-2rt}
\end{pmatrix}.
$$
初期分布 $\pi=(1/2,1/2)$ は確率分布である。$A=\{0\},B=\{1\}$ のとき両辺は $P_t(0,1)/2=P_t(1,0)/2$。$A=B=\{i\}$ なら同じ量、空集合なら両辺ゼロであり、全体集合の組合せでも行と列の和がともに $1$ だから一致する。有限集合上では集合が単点集合の和で書けるので、この確認から**すべての集合**について定義を満たす。
<!-- definition-example-end -->

この定義は「時刻 $t$ の前後の二点を交換しても統計的に同じ」という主張であり、「各標本路が逆向きに運動する」という意味ではない。

## 2. 詳細釣合いなら不変、逆はなぜ言えないか

<a id="prop-pml1-10-db-implies-invariant"></a>

<!-- formal-statement-start -->
> **命題（詳細釣合いから不変性）**  
> 可測空間 $E$ 上の保存的な時間一様Markov遷移核 $P_t$ と確率測度 $\pi$ が[時間一様Markov過程の詳細釣合い](#def-pml1-10-detailed-balance)を満たすなら、$\pi$ はすべての $t\ge0$ で不変である。さらに任意の有界可測関数 $\varphi,\psi$ について
>
$$
\int_E\varphi P_t\psi\,d\pi
=\int_E\psi P_t\varphi\,d\pi
$$
>
> が成り立つ。ここで $P_t\psi(x)=\int_E\psi(y)P_t(x,dy)$ とする。
<!-- formal-statement-end -->

### 証明の見取り図

詳細釣合いの式で $A=E$ とすると、時刻 $t$ の分布が元の $\pi$ と一致する。二つの観測量に対する式は、二点分布の対称性を掛け算して積分したものになる。

<!-- proof-start -->
### 証明

詳細釣合いの集合等式に $A=E$ を代入すると、任意の可測 $B$ について
$$
\begin{aligned}
\int_E P_t(x,B)\,\pi(dx)
&=\int_B P_t(y,E)\,\pi(dy)\\
&=\int_B1\,\pi(dy)=\pi(B).
\end{aligned}
$$
これは[不変分布の定義](../PML1-09/index.md#def-pml1-09-invariant)と同じである。次に二点分布の対称性について、まず単純関数 $\varphi=\sum_i a_i1_{A_i}$、$\psi=\sum_j b_j1_{B_j}$ で計算する。
$$
\begin{aligned}
\int\varphi(x)P_t\psi(x)\,\pi(dx)
&=\sum_{i,j}a_ib_j\int_{A_i}P_t(x,B_j)\,\pi(dx)\\
&=\sum_{i,j}a_ib_j\int_{B_j}P_t(y,A_i)\,\pi(dy)\\
&=\int\psi(y)P_t\varphi(y)\,\pi(dy).
\end{aligned}
$$
有界可測関数は一様に近似する単純関数列を持ち、両辺は高々 $\|\varphi\|_\infty\|\psi\|_\infty$ の定数倍で抑えられる。従って極限でも等式が成立する。
<!-- proof-end -->

逆向きの破綻を観察するには、少なくとも三つの状態があると分かりやすい。二点の間だけなら、定常時の総流入と総流出の一致がそのまま両方向の流れの一致になる。三点以上では、各点の流入と流出が釣り合いつつ、輪の中を流れ続けられる。

## 3. 有限状態では「各辺の流れ」で判定できる

[詳細釣合いと CTMC の可逆性](../../../解析系/SP/SP13/index.md#thm-sp13-reversibility)を再利用し、ここでは確率流という観点から両者を読み直す。状態空間は有限集合 $E=\{0,\ldots,n-1\}$ とする。

状態 $i$ から異なる状態 $j$ への**単位時間当たりの遷移率**を $q_{ij}\ge0$ とする。対角成分は各行の和がゼロになるよう
$
q_{ii}=-\sum_{j\ne i}q_{ij}
$
と定める。行を出発状態、列を到着状態とする率行列 $Q=(q_{ij})$ の遷移行列と、行分布 $\pi$ の時間発展は、それぞれ
$
P_t=e^{tQ},\qquad \pi P_t
$
である。確率核との関係は、異なる $i,j$ について次の右微分で与えられる。
$
q_{ij}=\lim_{h\downarrow0}\frac{P_h(i,j)}h.
$
これが、瞬間の移動量と遷移核を結び付ける。

状態 $i$ から $j$ へ単位時間に移る確率の量は $\pi_iq_{ij}$ である。逆向きの量を引いた差が、その辺に残る正味の流れになる。

<a id="def-pml1-10-edge-current"></a>

<!-- formal-statement-start -->
> **定義（有限状態の定常確率流）**  
> 有限状態の保存的な連続時間Markov連鎖の率行列 $Q$ と、各成分が正の確率ベクトル $\pi=(\pi_i)$ を与える。異なる二状態 $i,j$ の間の、$i$ から $j$ に向けた正味の**確率流**を
>
$$
J_{ij}=\pi_iq_{ij}-\pi_jq_{ji}
$$
>
> と定める。$J_{ji}=-J_{ij}$ であり、$J_{ij}>0$ は $i$ から $j$ へ正味に流れていることを意味する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-10-edge-current -->
**定義の直接確認**：三状態 $0,1,2$ を巡回順序 $0\to1\to2\to0$ として、順方向の率を $a=2$、逆方向の率を $c=1$ とする。各状態からの総脱出率は $3$ であり、率行列は
$$
Q=\begin{pmatrix}
-3&2&1\\
1&-3&2\\
2&1&-3
\end{pmatrix}.
$$
$\pi=(1/3,1/3,1/3)$ は全成分正、和は $1$。辺 $0\to1$ の正味流は $J_{01}=(2-1)/3=1/3$。同様に $J_{12}=J_{20}=1/3$、逆辺は $-1/3$。各状態では一方の辺から $1/3$ が入り、他方から $1/3$ が出る。**各点の蓄積はゼロでも、各辺の流れはゼロでない。**
<!-- definition-example-end -->

### 率行列の二つの判定を確率流で読み直す

有限状態での $\pi Q=0$ と詳細釣合いの同値判定、ならびに $DQ=Q^{\mathsf T}D$ から時間反転対称性を導く証明は、すでに[有限 CTMC の定常分布の判定](../../../解析系/SP/SP13/index.md#thm-sp13-stationarity-criterion)と[詳細釣合いと CTMC の可逆性](../../../解析系/SP/SP13/index.md#thm-sp13-reversibility)で完成している。本章ではその判定式を先ほどの $J_{ij}$ へ代入する。

各 $i$ について、行和ゼロ $q_{ii}=-\sum_{j\ne i}q_{ij}$ を使えば
$$
\begin{aligned}
(\pi Q)_i
&=\pi_iq_{ii}+\sum_{j\ne i}\pi_jq_{ji}\\
&=-\sum_{j\ne i}(\pi_iq_{ij}-\pi_jq_{ji})\\
&=-\sum_{j\ne i}J_{ij}.
\end{aligned}
$$
従って **不変性**の判定は「各状態での正味の流出の合計がゼロ」である。一方、[CTMC の詳細釣合い](../../../解析系/SP/SP13/index.md#def-sp13-detailed-balance)へ $J_{ij}$ を代入すると、その判定は**各辺ごとに** $J_{ij}=0$ である。

$$
\begin{aligned}
\text{不変性}&\quad\Longleftrightarrow\quad
\sum_{j\ne i}J_{ij}=0\quad(\forall i),\\
\text{詳細釣合い}&\quad\Longleftrightarrow\quad
J_{ij}=0\quad(\forall i\ne j).
\end{aligned}
$$

二番目の条件から一番目は従うが、逆は一般には従わない。正の確率ベクトル $\pi$ について $D=\operatorname{diag}(\pi_i)$ と置けば、二番目の条件は $DQ=Q^{\mathsf T}D$ と同値であり、[詳細釣合いと CTMC の可逆性](../../../解析系/SP/SP13/index.md#thm-sp13-reversibility)により遷移核についての詳細釣合いにも一致する。

### 三状態の反例を二つの判定に通す

先ほどの三状態の $Q$ では各列の和も $0$ なので、[有限 CTMC の定常分布の判定](../../../解析系/SP/SP13/index.md#thm-sp13-stationarity-criterion)から $\pi Q=0$ は不変性を示す。しかし $J_{01}=1/3\ne0$ だから[詳細釣合いと CTMC の可逆性](../../../解析系/SP/SP13/index.md#thm-sp13-reversibility)を満たさない。不変性の証明が足し合わせて消していた**別々の辺の流れ**を、詳細釣合いは消すよう要求している。これが逆向きの含意が壊れる場所である。

## 4. 循環している定常状態にはどの散逸が残るか

両方向の遷移率が正なら、定常時にある辺を順向きに横切る確率の量と逆向きに横切る量の比を取れる。偏りがないときは比が $1$、偏りがあるときは比が $1$ からずれる。対数比を流れで重み付けした量は、平衡から外れた定常循環を数値化する。

<a id="def-pml1-10-entropy-production"></a>

<!-- formal-statement-start -->
> **定義（有限状態の定常エントロピー生成率）**  
> 有限状態の保存的な連続時間Markov連鎖の率行列 $Q$、全成分正の不変確率ベクトル $\pi$ を仮定する。$i\ne j$ の各組では $q_{ij},q_{ji}>0$ とする。このとき（Boltzmann定数を $1$ とする単位で）定常エントロピー生成率を
>
$$
\sigma_{\mathrm{ss}}
=\frac12\sum_{i\ne j}
(\pi_iq_{ij}-\pi_jq_{ji})
\log\frac{\pi_iq_{ij}}{\pi_jq_{ji}}
$$
>
> とする。単位は時間の逆数であり、$i,j$ と $j,i$ の二重計数を避けるため係数 $1/2$ を付ける。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-10-entropy-production -->
**定義の直接確認**：巡回三状態で順方向 $a=2$、逆方向 $c=1$ とすると、$\pi_i=1/3$ が正かつ不変で、全ての異なる状態間に双方向の正の率がある。各順方向の辺について、正味流と対数比は
$$
J_{\rm forward}=\frac{a-c}{3}=\frac13,
\qquad
\log\frac{\pi_ia}{\pi_jc}=\log2.
$$
逆方向の辺では両方の符号が変わるため積は同じ。独立な無向辺が三本あり
$$
\sigma_{\mathrm{ss}}=3\cdot\frac13\log2=\log2>0
$$
となる。
<!-- definition-example-end -->

<a id="prop-pml1-10-entropy-nonnegative"></a>

<!-- formal-statement-start -->
> **命題（定常エントロピー生成率の非負性）**  
> [定常エントロピー生成率の定義](#def-pml1-10-entropy-production)のすべての仮定のもとで $\sigma_{\mathrm{ss}}\ge0$。等号が成り立つ必要十分条件は $Q$ が $\pi$ に関して詳細釣合いを満たすことである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x,y>0$ に対して対数関数の単調性から
$$
(x-y)(\log x-\log y)\ge0,
$$
また等号は $x=y$ のときに限る。各項に $x=\pi_iq_{ij}$、$y=\pi_jq_{ji}$ を代入すれば総和の各項は非負である。有限和がゼロであることと各 $x=y$ は同値で、[詳細釣合いと CTMC の可逆性](../../../解析系/SP/SP13/index.md#thm-sp13-reversibility)より結論が従う。
<!-- proof-end -->

巡回模型の一般の $a,c>0$ では、各辺の流れ $(a-c)/3$ を三本合計するため
$$
\sigma_{\mathrm{ss}}=(a-c)\log(a/c).
$$
$a=c$ のときだけゼロとなる。これは**定常状態でも回り続けることの散逸**を表す。一方、初期分布が定常分布へ近づく過程の情報量の減少は別の量であり、定常状態では後者はすでにゼロになり得る。

## 5. 連続状態でもGibbs分布を保ったまま循環できるか

[PML1-09の零確率流](../PML1-09/index.md#def-pml1-09-zero-flux)は、熱雑音と勾配ドリフトだけのとき成立した。今度は平面上で損失 $f(x)=\alpha|x|^2/2$（$\alpha>0$）に対応する勾配ドリフト $-\alpha x$ に、直交方向へ回転させるベクトル場 $\omega Rx$ を加える。ここで
$$
R=\begin{pmatrix}0&-1\\1&0\end{pmatrix},
\qquad
R^{\mathsf T}=-R,\qquad R^{\mathsf T}R=I_2.
$$
$Rx$ が $x$ に垂直なのは $x^{\mathsf T}Rx=0$ から分かる。移動度は $I_2$、熱雑音は $\sqrt{2\tau}I_2$ とするが、**全ドリフトはもはや $-I_2\nabla f$ ではない**。この違いを明示しないまま前講のGibbs不変性定理を適用することはできない。

<a id="thm-pml1-10-rotating-ou"></a>

<!-- formal-statement-start -->
> **定理（回転する二次拡散の不変性と非可逆性）**  
> $d=2$、$\alpha,\tau>0$、$\omega\in\mathbb R$ とし、標準二次元ブラウン運動 $W$ と独立な初期値 $X_0$ に対して
>
$$
dX_t=(-\alpha I_2+\omega R)X_t\,dt
+\sqrt{2\tau}\,dW_t
$$
>
> を考える。ここで $R=\left(\begin{smallmatrix}0&-1\\1&0\end{smallmatrix}\right)$ とする。
>
> **（1）** 次のGibbs密度はすべての $\omega$ について不変である。
$$
\rho(x)=\frac{\alpha}{2\pi\tau}
\exp\left(-\frac{\alpha|x|^2}{2\tau}\right).
$$
>
> **（2）** この密度での定常確率流は
$$
J_\rho(x)=\omega Rx\,\rho(x).
$$
>
> **（3）** 過程がこの不変分布に関して詳細釣合いを満たす必要十分条件は $\omega=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

（1）では密度を前進方程式に代入するだけで終えず、線形SDEの解から**初期分布が全時刻で保存される**ことを示す。（2）は流れの勾配部分が相殺され回転成分だけ残る。（3）は定常状態での二時刻相関を交換すると符号が反転することを使う。

<!-- proof-start -->
### 証明

$A=-\alpha I_2+\omega R$ と書く。$A$ は定数行列なのでドリフトが大域Lipschitz、[STO9の強解存在定理](../../../解析系/STO/STO9/index.md#thm-sto9-global-existence-uniqueness)の条件を満たし非爆発的である。線形SDEの積分因子により
$$
X_t=e^{At}X_0+\sqrt{2\tau}\int_0^t e^{A(t-s)}\,dW_s.
$$
$R^2=-I_2$ より指数の級数を偶数・奇数次数で分けると
$$
e^{At}=e^{-\alpha t}O_t,\qquad
O_t=\cos(\omega t)I_2+\sin(\omega t)R.
$$
$R^{\mathsf T}=-R$ と $R^{\mathsf T}R=I_2$ から $O_tO_t^{\mathsf T}=I_2$、従って $e^{At}e^{A^{\mathsf T}t}=e^{-2\alpha t}I_2$。

ここで $X_0\sim N(0,S)$、$S=(\tau/\alpha)I_2$ とし、$W$ から独立とする。二つの項は独立な中心Gaussianベクトルであり、平均はゼロである。[Itô積分の共分散計算](../../../解析系/STO/STO7/index.md#thm-sto7-multidimensional-ito)を成分ごとに適用すると
$$
\begin{aligned}
\operatorname{Cov}(X_t)
&=e^{At}S e^{A^{\mathsf T}t}
 +2\tau\int_0^t e^{Au}e^{A^{\mathsf T}u}\,du\\
&=\frac{\tau}{\alpha}e^{-2\alpha t}I_2
 +2\tau\int_0^t e^{-2\alpha u}\,du\,I_2\\
&=\frac{\tau}{\alpha}e^{-2\alpha t}I_2
 +\frac{\tau}{\alpha}(1-e^{-2\alpha t})I_2
=S.
\end{aligned}
$$
従って $X_t\sim N(0,S)$ が任意の $t$ で成り立つ。正規密度の公式に $\det S=(\tau/\alpha)^2$ と $S^{-1}=(\alpha/\tau)I_2$ を代入した密度が（1）の $\rho$ である。正規化と不変性の両方が示された。

次に[確率流の式](../PML1-09/index.md#prop-pml1-09-fokker-planck)の一般形 $J=b\rho-\tau\nabla\rho$ を用いる。ここで $b=Ax$、$\nabla\rho=-(\alpha/\tau)x\rho$ だから
$$
\begin{aligned}
J_\rho
&=(-\alpha x+\omega Rx)\rho-\tau\left(-\frac{\alpha}{\tau}x\rho\right)\\
&=\omega Rx\rho.
\end{aligned}
$$
また $\operatorname{tr}R=0$ かつ $Rx\cdot x=0$ より
$$
\nabla\cdot J_\rho
=\omega\operatorname{tr}R\,\rho+\omega Rx\cdot\nabla\rho
=0.
$$
発散ゼロは定常方程式との整合性であり、すでに確率過程の計算で不変性を別途保証した。

最後に詳細釣合いを調べる。$X_0$ を不変分布から取ると、$t>0$ に対し独立な積分雑音の平均が $0$ なので
$$
\mathbb E[X_tX_0^{\mathsf T}]
=e^{At}\mathbb E[X_0X_0^{\mathsf T}]
=\frac{\tau}{\alpha}e^{-\alpha t}O_t.
$$
この行列の $(2,1)$ 成分と $(1,2)$ 成分はそれぞれ
$$
\mathbb E[X_{t,2}X_{0,1}]
=\frac{\tau}{\alpha}e^{-\alpha t}\sin(\omega t),
\qquad
\mathbb E[X_{t,1}X_{0,2}]
=-\frac{\tau}{\alpha}e^{-\alpha t}\sin(\omega t).
$$
詳細釣合いなら $(X_0,X_t)$ と $(X_t,X_0)$ は同分布で、可積分な積の期待値も交換に対して等しい。$\omega\ne0$ なら $\sin(\omega t)\ne0$ となる $t>0$ を選べるため矛盾する。

$\omega=0$ なら $O_t=I_2$ であり、独立Gaussian項から作った $(X_0,X_t)$ は中心Gaussianベクトルである。その共分散の四つの $2\times2$ ブロックは対角がともに $S$、非対角がともに $e^{-\alpha t}S$。時刻の交換で共分散は変わらないため二点の同時分布は対称であり、[詳細釣合いの定義](#def-pml1-10-detailed-balance)を満たす。
<!-- proof-end -->

**何が壊れたか**：$\omega\ne0$ では[前講の整合Langevinドリフト](../PML1-08/index.md#def-pml1-08-overdamped)の「全ドリフトが勾配型」という仮定を落とした。定常方程式 $\nabla\cdot J_\rho=0$ は保たれるが、$J_\rho=0$ は壊れる。**Gibbs形・不変性・詳細釣合いは三つの別の判定項目**である。

## 6. 分布の収束と定常循環の散逸を混同しない

定常状態での循環を測る連続状態の量として、拡散共分散 $2\tau I_d$ の模型では、正の滑らかな不変密度 $\rho$ とその定常流 $J_\rho$ に対し
$$
\sigma_{\mathrm{ss}}
=\int_{\mathbb R^d}\frac{|J_\rho(x)|^2}{\tau\rho(x)}\,dx
$$
を考えられる（以下では積分有限を仮定する）。これは非負で、$\rho>0$ のもとでゼロなら $J_\rho=0$ がほとんど至る所で成立する。平面回転模型の場合は $|Rx|^2=|x|^2$ と $\mathbb E_\rho|X|^2=2\tau/\alpha$ を用いて
$$
\begin{aligned}
\sigma_{\mathrm{ss}}
&=\frac{\omega^2}{\tau}\int_{\mathbb R^2}|x|^2\rho(x)\,dx\\
&=\frac{\omega^2}{\tau}\frac{2\tau}{\alpha}
=\frac{2\omega^2}{\alpha}.
\end{aligned}
$$
これは $\omega\ne0$ なら正だが、**時間に沿った確率分布はすでに不変**である。次の命題は、なぜ分布の近づき方だけからこの定常散逸を判定できないかを示す。

<a id="prop-pml1-10-relative-entropy-decay"></a>

<!-- formal-statement-start -->
> **命題（定常循環があっても相対エントロピーは減少する）**  
> $\mathbb R^d$ 上の拡散 $dX_t=b(X_t)\,dt+\sqrt{2\tau}\,dW_t$（$\tau>0$）が、正の $C^2$ 不変密度 $\rho$ を持ち、$J_\rho=b\rho-\tau\nabla\rho$ が $\nabla\cdot J_\rho=0$ を満たすとする。正の滑らかな時刻密度 $p_t$ が $\partial_tp_t=-\nabla\cdot(bp_t-\tau\nabla p_t)$ を満たし、以下の微分・積分交換と部分積分で無限遠の境界項が消え、すべての積分が有限であるとする。このとき相対エントロピー
>
$$
D(p_t\|\rho)=\int_{\mathbb R^d}p_t\log\frac{p_t}{\rho}\,dx
$$
>
> について次が成立する。
$$
\frac d{dt}D(p_t\|\rho)
=-\tau\int_{\mathbb R^d}
p_t\left|\nabla\log\frac{p_t}{\rho}\right|^2dx
\le0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

密度比 $h=p_t/\rho$ を使い、時刻流を「定常循環 $hJ_\rho$」と「密度比を平らにする拡散 $-\tau\rho\nabla h$」へ分解する。定常循環の寄与は発散ゼロによって消え、負の二乗だけが残る。

<!-- proof-start -->
### 証明

$h=p_t/\rho>0$ と置く。$p_t=\rho h$ の積の微分から
$$
\begin{aligned}
J_{p_t}
&=bp_t-\tau\nabla p_t\\
&=b\rho h-\tau(h\nabla\rho+\rho\nabla h)\\
&=hJ_\rho-\tau\rho\nabla h.
\end{aligned}
$$
$\int p_tdx=1$ の時間微分はゼロなので、$p_t\log(p_t/\rho)$ の時間微分で出る $+1$ の項は消える。前進方程式と部分積分を使うと
$$
\begin{aligned}
\frac d{dt}D(p_t\|\rho)
&=\int\partial_tp_t\log h\,dx\\
&=-\int(\nabla\cdot J_{p_t})\log h\,dx\\
&=\int J_{p_t}\cdot\nabla\log h\,dx\\
&=\int J_\rho\cdot\nabla h\,dx
-\tau\int\rho\frac{|\nabla h|^2}{h}\,dx.
\end{aligned}
$$
第一項は部分積分と $\nabla\cdot J_\rho=0$ により $-\int h\nabla\cdot J_\rho dx=0$。また $\rho|\nabla h|^2/h=p_t|\nabla\log h|^2$。よって結論を得る。
<!-- proof-end -->

**具体例**：回転OU模型の不変共分散を $S=(\tau/\alpha)I_2$ とし、初期分布を $N(m_0,S)$ に変える。分散は前節と同じ計算で $S$ のまま、平均は $m_t=e^{-\alpha t}O_tm_0$ となる。二つの同共分散正規密度の比を平方完成すると
$$
D\bigl(N(m_t,S)\|N(0,S)\bigr)
=\frac12m_t^{\mathsf T}S^{-1}m_t
=\frac{\alpha|m_0|^2}{2\tau}e^{-2\alpha t}.
$$
したがって分布差は減少する一方、$\omega\ne0$ なら定常散逸 $2\omega^2/\alpha$ は正のままである。**緩和の速さと定常循環の散逸は同じ指標ではない。**

## 7. 演習 Level A

<a id="ex-pml1-10-a01"></a>
### PML1-10-A01 二状態の定常分布と辺の釣合い

- Level: A

二状態の率行列 $Q=\left(\begin{smallmatrix}-a&a\\b&-b\end{smallmatrix}\right)$（$a,b>0$）について、正の不変分布 $\pi$ を求め、詳細釣合いを確かめよ。

<!-- solution-start -->
#### 詳細解答

$\pi=(u,v)$ と置くと $\pi Q=(-au+bv,au-bv)$ である。$\pi Q=0$ と $u+v=1$ から $au=bv$、従って
$$
u=\frac b{a+b},\qquad v=\frac a{a+b}.
$$
両成分は正で和は $1$。辺の流れは
$$
J_{01}=ua-vb
=\frac{ab}{a+b}-\frac{ab}{a+b}=0.
$$
よって[詳細釣合いと CTMC の可逆性](../../../解析系/SP/SP13/index.md#thm-sp13-reversibility)により全時刻の詳細釣合いを満たす。二状態のこの設定では不変でも循環する余地はない。
<!-- solution-end -->

<a id="ex-pml1-10-a02"></a>
### PML1-10-A02 巡回する三状態の流入・流出

- Level: A

$0\to1\to2\to0$ の順向き率が $4$、逆向き率が $1$ とする。$\pi=(1/3,1/3,1/3)$ が不変かを確認し、$J_{01}$、$J_{12}$、$J_{20}$ と詳細釣合いの成否を求めよ。

<!-- solution-start -->
#### 詳細解答

率行列は $Q=\left(\begin{smallmatrix}-5&4&1\\1&-5&4\\4&1&-5\end{smallmatrix}\right)$。各列の和は $-5+4+1=0$ であるから、$(\pi Q)_i=(1/3)\sum_jq_{ji}=0$。$J_{01}=(4-1)/3=1$ であり、添字を一周させれば $J_{12}=J_{20}=1$。各状態に入る流れと出る流れが一致しても、辺ごとの流れは $0$ ではない。[有限 CTMC の定常分布の判定](../../../解析系/SP/SP13/index.md#thm-sp13-stationarity-criterion)から不変であり、[詳細釣合いと CTMC の可逆性](../../../解析系/SP/SP13/index.md#thm-sp13-reversibility)の率の条件を満たさないので非可逆である。
<!-- solution-end -->

<a id="ex-pml1-10-a03"></a>
### PML1-10-A03 二次Langevinの詳細釣合い

- Level: A

$dX_t=-\lambda X_t\,dt+\sqrt{2\tau}\,dW_t$（$\lambda,\tau>0$）で $X_0\sim N(0,\tau/\lambda)$、$W$ と独立とする。$\mathbb E[X_0X_t]$ を求め、二時刻の同時分布が交換対称な理由を述べよ。

<!-- solution-start -->
#### 詳細解答

[二次模型の解](../PML1-08/index.md#thm-pml1-08-quadratic)は
$$
X_t=e^{-\lambda t}X_0+\sqrt{2\tau}\int_0^t e^{-\lambda(t-s)}\,dW_s.
$$
積分項は初期値と独立で中心化されているので
$$
\mathbb E[X_0X_t]
=e^{-\lambda t}\mathbb E[X_0^2]
=\frac{\tau}{\lambda}e^{-\lambda t}.
$$
また $\operatorname{Var}(X_0)=\operatorname{Var}(X_t)=\tau/\lambda$。両者は線形Gaussian過程なので、二時刻の二変量正規分布の共分散行列
$$
\frac{\tau}{\lambda}
\begin{pmatrix}1&e^{-\lambda t}\\e^{-\lambda t}&1\end{pmatrix}
$$
は変数交換で不変である。平均もともにゼロであり、二点分布が対称、従って[時間一様Markov過程の詳細釣合い](#def-pml1-10-detailed-balance)が成立する。
<!-- solution-end -->

<a id="ex-pml1-10-a04"></a>
### PML1-10-A04 回転流の発散

- Level: A

$\rho(x,y)=C e^{-k(x^2+y^2)/2}$（$C,k>0$）、$J(x,y)=\omega(-y,x)\rho(x,y)$ とする。$\nabla\cdot J$ を直接求めよ。

<!-- solution-start -->
#### 詳細解答

$\partial_x\rho=-kx\rho$、$\partial_y\rho=-ky\rho$ を使うと
$$
\begin{aligned}
\nabla\cdot J
&=\partial_x(-\omega y\rho)+\partial_y(\omega x\rho)\\
&=-\omega y(-kx\rho)+\omega x(-ky\rho)\\
&=\omega kxy\rho-\omega kxy\rho=0.
\end{aligned}
$$
ただし $\omega\ne0$ なら原点以外で $J$ は非零。発散ゼロを流れゼロと読み替えることはできない。
<!-- solution-end -->

<a id="ex-pml1-10-a05"></a>
### PML1-10-A05 詳細釣合いの積分から不変性を導く

- Level: A

保存的なMarkov遷移核 $P_t$ と確率測度 $\pi$ が詳細釣合いを満たすとする。$B\subset E$ を任意の可測集合とし、$\int_E P_t(x,B)\pi(dx)$ を計算せよ。保存性を使った箇所も述べよ。

<!-- solution-start -->
#### 詳細解答

[詳細釣合いの定義](#def-pml1-10-detailed-balance)に $A=E$ を代入すると
$$
\int_EP_t(x,B)\pi(dx)
=\int_BP_t(y,E)\pi(dy).
$$
保存性 $P_t(y,E)=1$ を右辺へ代入して $\int_B1\,\pi(dy)=\pi(B)$。これが任意の $t,B$ で成り立つので[不変分布の定義](../PML1-09/index.md#def-pml1-09-invariant)を満たす。保存性がなければ右辺を $\pi(B)$ と簡約できない。
<!-- solution-end -->

## 8. 演習 Level B

<a id="ex-pml1-10-b01"></a>
### PML1-10-B01 巡回三状態の散逸と等号条件

- Level: B

順方向率 $a=3$、逆方向率 $c=1$ の巡回三状態について、正の定常分布、各順向き辺の流れ、定常エントロピー生成率を求めよ。もし $c=3$ に変えたらどうなるか。

<!-- solution-start -->
#### 詳細解答

各状態への入率と出率は同じ $a+c=4$ であるから $\pi=(1/3,1/3,1/3)$ は不変である。三本の順向き辺では
$$
J_{\rm forward}=\frac{a-c}{3}=\frac23,\qquad
\log\frac{\pi_i a}{\pi_j c}=\log3.
$$
逆向きの辺は両方の符号が反転するため同じ積を与える。[生成率の定義](#def-pml1-10-entropy-production)の $1/2$ は順逆を一組に数え直す係数であり
$$
\sigma_{\mathrm{ss}}
=3\cdot\frac23\log3=2\log3>0.
$$
$c=3$ に変えると $\pi$ は依然一様だが、$J_{\rm forward}=(3-3)/3=0$。従って生成率は $0$ になり、[非負性命題](#prop-pml1-10-entropy-nonnegative)の等号条件により詳細釣合いとなる。
<!-- solution-end -->

<a id="ex-pml1-10-b02"></a>
### PML1-10-B02 時刻を交換すると相関はどう変わるか

- Level: B

[回転OU模型](#thm-pml1-10-rotating-ou)で $\alpha=2$、$\tau=3$、$\omega=1$、$X_0\sim N(0,(3/2)I_2)$ とする。$\mathbb E[X_{t,2}X_{0,1}]$ と $\mathbb E[X_{t,1}X_{0,2}]$ を求め、$t=\pi/2$ で詳細釣合いを検査せよ。

<!-- solution-start -->
#### 詳細解答

$e^{At}=e^{-2t}\left(\begin{smallmatrix}\cos t&-\sin t\\\sin t&\cos t\end{smallmatrix}\right)$ であり、$\operatorname{Cov}(X_t,X_0)=e^{At}(3/2)I_2$。従って
$$
\mathbb E[X_{t,2}X_{0,1}]
=\frac32e^{-2t}\sin t,\qquad
\mathbb E[X_{t,1}X_{0,2}]
=-\frac32e^{-2t}\sin t.
$$
$t=\pi/2$ なら順に $3e^{-\pi}/2$ と $-3e^{-\pi}/2$。詳細釣合いなら二時刻分布は交換しても変わらず、二つの期待値は等しいはずなので、詳細釣合いは成立しない。分布が不変であることは[回転OU定理](#thm-pml1-10-rotating-ou)の（1）から別途成り立つ。
<!-- solution-end -->

<a id="ex-pml1-10-b03"></a>
### PML1-10-B03 回転しても相対エントロピーは減る

- Level: B

[回転OU模型](#thm-pml1-10-rotating-ou)で $\alpha,\tau>0$、$\omega\ne0$ とし、初期値を $X_0\sim N(m_0,(\tau/\alpha)I_2)$ に取る。時刻 $t$ の平均と分散、および不変密度 $\rho=N(0,(\tau/\alpha)I_2)$ に対する $D(p_t\|\rho)$ を求め、定常散逸と比較せよ。

<!-- solution-start -->
#### 詳細解答

線形SDEの解より、平均は $\mathbb E X_t=e^{At}m_0=e^{-\alpha t}O_tm_0$。初期値の共分散 $(\tau/\alpha)I_2$ に対する時間発展は[回転OU定理の証明](#thm-pml1-10-rotating-ou)の積分計算と同じで、すべての $t$ で $(\tau/\alpha)I_2$ となる。共分散行列を $S=(\tau/\alpha)I_2$ と書く。

二つの正規密度 $p=N(m_t,S)$、$\rho=N(0,S)$ に対し指数部分を引くと
$$
\log\frac{p(x)}{\rho(x)}
=-\frac12(x-m_t)^{\mathsf T}S^{-1}(x-m_t)
+\frac12x^{\mathsf T}S^{-1}x.
$$
右辺を展開し $p$ の下で期待値を取ると $\mathbb E_p X=m_t$ だから
$$
D(p\|\rho)=\frac12m_t^{\mathsf T}S^{-1}m_t
=\frac{\alpha}{2\tau}e^{-2\alpha t}|m_0|^2.
$$
$O_t$ は直交行列なので平均のノルムは回転によって変わらない。$D$ は $t\to\infty$ でゼロへ近づくが、定常循環の散逸は $\sigma_{\mathrm{ss}}=2\omega^2/\alpha>0$ のままである。この二つは異なる物理量である。
<!-- solution-end -->

<a id="ex-pml1-10-b04"></a>
### PML1-10-B04 行列指数から詳細釣合いを復元する

- Level: B

正の不変確率ベクトル $\pi$ を持つ有限状態Markov連鎖の率行列 $Q$ について $D=\operatorname{diag}(\pi_i)$ とする。$DQ=Q^{\mathsf T}D$ を仮定し、$DP_t=P_t^{\mathsf T}D$ を行列指数の定義から示せ。$\pi_i>0$ を使う別の判定も述べよ。

<!-- solution-start -->
#### 詳細解答

$k=0$ なら $DI=ID$。$DQ=Q^{\mathsf T}D$ を仮定し、$DQ^k=(Q^{\mathsf T})^kD$ が成り立つとすれば
$$
DQ^{k+1}
=(Q^{\mathsf T})^kDQ
=(Q^{\mathsf T})^{k+1}D.
$$
よって全自然数 $k$ について成り立つ。行列指数の絶対収束級数に代入すると
$$
De^{tQ}
=\sum_{k=0}^{\infty}\frac{t^k}{k!}DQ^k
=\sum_{k=0}^{\infty}\frac{t^k}{k!}(Q^{\mathsf T})^kD
=e^{tQ^{\mathsf T}}D.
$$
従って $DP_t=P_t^{\mathsf T}D$。$D$ の対角成分は正だから $D^{1/2}$ と $D^{-1/2}$ が存在し、$DQ=Q^{\mathsf T}D$ は $D^{1/2}QD^{-1/2}$ が対称行列であることと同値である。この別の行列表現も、どの重みで対称にするかを示す。
<!-- solution-end -->

## 9. 演習 Level C

<a id="ex-pml1-10-c01"></a>
### PML1-10-C01 定常・可逆・散逸の総合比較

- Level: C

次の二つの模型を比較する。

**模型F**：三状態の巡回連鎖で、順方向率 $a>0$、逆方向率 $c>0$。

**模型D**：$\mathbb R^2$ 上の拡散 $dX_t=(-\alpha I_2+\omega R)X_tdt+\sqrt{2\tau}\,dW_t$。ここで $\alpha,\tau>0$、$R=\left(\begin{smallmatrix}0&-1\\1&0\end{smallmatrix}\right)$、$\omega\in\mathbb R$。

1. 模型Fの不変分布、定常確率流、詳細釣合いの必要十分条件、定常エントロピー生成率を導出せよ。
2. 模型DのGibbs不変密度と確率流を求め、流れの発散を検算せよ。前進方程式への代入だけでは不変性の完全な証明でない理由を説明せよ。
3. 模型Dの二時刻相関の交換を使い、可逆性の必要十分条件を示せ。連続模型の定常散逸も求めよ。
4. 「定常なら散逸はゼロ」「Gibbs密度なら可逆」「不変なら初期値に依らず即座に定常分布になる」の三つについて、成立する条件または反例を挙げよ。

<!-- solution-start -->
#### 詳細解答

**1. 有限状態の計算。** どの状態でも順方向に率 $a$、逆方向に率 $c$ で出て行き、入る率の合計も $a+c$ である。従って $Q$ の列和がゼロとなり、$\pi=(1/3,1/3,1/3)$ は正の不変分布である。各順方向の辺について
$$
J_{\rm forward}=\frac a3-\frac c3=\frac{a-c}{3}.
$$
[詳細釣合いと CTMC の可逆性](../../../解析系/SP/SP13/index.md#thm-sp13-reversibility)の率による判定より詳細釣合いは $a=c$ の場合に限る。両方向率は正で、[定常生成率](#def-pml1-10-entropy-production)を定義できる。三本の辺の寄与を足すと
$$
\sigma_{\mathrm{ss}}
=3\frac{a-c}{3}\log\frac{a/3}{c/3}
=(a-c)\log(a/c)\ge0.
$$
$a\ne c$ なら対数の単調性により正である。

**2. 連続状態の計算。** 候補 $f(x)=\alpha|x|^2/2$ は二次下界を持ち、[Gibbs密度の正規化](../PML1-09/index.md#def-pml1-09-continuous-gibbs)に二次元Gaussian積分を使うと
$$
Z_\tau=\frac{2\pi\tau}{\alpha},\qquad
\rho(x)=\frac{\alpha}{2\pi\tau}e^{-\alpha|x|^2/(2\tau)}.
$$
微分は $\nabla\rho=-(\alpha/\tau)x\rho$。ドリフト $b=-\alpha x+\omega Rx$ と拡散 $2\tau I_2$ より
$$
J_\rho=b\rho-\tau\nabla\rho=\omega Rx\rho.
$$
$\operatorname{tr}R=0$ と $(Rx)\cdot x=0$ を代入すると
$$
\nabla\cdot J_\rho
=\omega(\operatorname{tr}R)\rho
-\frac{\omega\alpha}{\tau}(Rx\cdot x)\rho=0.
$$
ただし前進方程式への形式的な代入では、確率過程が非爆発であることや、候補密度を初期値とした実際の分布が全時刻に保たれることまで保証できない。この模型では[回転OU定理](#thm-pml1-10-rotating-ou)の線形SDEの共分散計算がその不足を埋める。

**3. 時間反転と散逸。** 定常初期値 $X_0\sim N(0,(\tau/\alpha)I_2)$ の下で
$$
\operatorname{Cov}(X_t,X_0)
=\frac{\tau}{\alpha}e^{-\alpha t}
\begin{pmatrix}\cos(\omega t)&-\sin(\omega t)\\
\sin(\omega t)&\cos(\omega t)\end{pmatrix}.
$$
詳細釣合いなら二点交換によってこの行列が対称になる必要がある。$\omega\ne0$ では $\sin(\omega t)\ne0$ の時刻を選べるので不成立である。$\omega=0$ なら同時Gaussian分布の時刻交換対称性が成立するので可逆である。また $|Rx|^2=|x|^2$ と $\int|x|^2\rho dx=2\tau/\alpha$ から
$$
\sigma_{\mathrm{ss}}
=\int\frac{|\omega Rx\rho|^2}{\tau\rho}dx
=\frac{2\omega^2}{\alpha}.
$$

**4. 三つの誤判断。** 「定常なら散逸ゼロ」は $a\ne c$ の模型F、または $\omega\ne0$ の模型Dで偽である。定常分布の質量収支だけでは辺ごとの流れが消えないからである。「Gibbs密度なら可逆」は模型Dの $\omega\ne0$ で偽である。損失に対応する勾配ドリフトへ非勾配の回転成分を加えたため、[零確率流](../PML1-09/index.md#def-pml1-09-zero-flux)の条件が壊れる。「不変なら任意の初期値から即座に定常」は、模型Dの $X_0=x_0$ を確定値とした場合に偽である。実際、有限 $t$ での共分散は
$$
2\tau\int_0^te^{-2\alpha u}du\,I_2
=\frac{\tau}{\alpha}(1-e^{-2\alpha t})I_2,
$$
であり、$\rho$ の共分散 $(\tau/\alpha)I_2$ より小さい。不変性は**初期分布を $\rho$ に選んだときの保存**だけを主張する。
<!-- solution-end -->

## 10. 次講への橋渡し

詳細釣合いは不変性の十分条件だが必要条件ではない。非可逆な拡散でも不変なGibbs密度を持ち、循環する確率流と正の定常散逸が残り得る。他方、連続時間の不変密度が正しくても、数値的に時間を刻んだMarkov連鎖の不変分布まで一致するとは限らない。次講 PML1-11 では、その**時間離散化による偏り**を調べる。
