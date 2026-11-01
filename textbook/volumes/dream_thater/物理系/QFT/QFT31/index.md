# QFT31 散乱・ループ・ゲージ不変性・くりこみを結ぶ総合演習

[QFT17の電子–ミューオン散乱](../QFT17/index.md#prop-qft17-tree-amplitude)では光子の伝播関数が現れ、[QFT23の四点頂点](../QFT23/index.md#thm-qft23-counterterms-cutoff)ではループの発散を取り除き、[QFT30の純Yang–Mills β関数](../QFT30/index.md#thm-qft30-beta-function)では高い尺度へ向かう結合の減少を導きました。いずれにもゲージ・正則化・尺度の選択が入りますが、それらを同じ意味の「任意性」として扱うことはできません。

この総合演習では、**何が途中計算の規約に依存し、何が測定量または普遍的な一ループ係数として残るか**を、三つの計算経路で照合します。証明のある既習結果はその箇所へ戻り、ここでは実際に数値・係数・仮定を代入して、一つの計算の別の段階が矛盾しないか検査します。

1. 保存電流を光子伝播関数へ入れると、どの条件でゲージパラメータが消えるか。
2. 発散するbubbleから有限な運動量依存を取り出し、その係数とくりこみ群の符号をどう照合するか。
3. 非可換ゲージ場とghostの寄与を組み合わせると、なぜQEDとは逆に結合が減少するか。

Minkowski計量は $η=\operatorname{diag}(1,-1,-1,-1)$、$ℏ=c=1$ です。散乱部分の四運動量は実時間、ループ部分は明記した箇所で四次元Euclid運動量を用います。ループ積分は有限カットオフまたは次元正則化の**摂動係数**として扱い、未正則化の場の積や無限次元の振動積分が数学的に構成済みであるとは仮定しません。[QFT19の有限モード生成汎関数](../QFT19/index.md#def-qft19-lattice-functional)と[QFT20の反射陽性](../QFT20/index.md#def-qft20-reflection-positivity)の区別も必要です。

## 1. 光子の縦成分はなぜ散乱へ寄与しないか

質量 $m,M>0$ の電子・ミューオンの弾性散乱を考え、入射四運動量を $p_1,p_2$、出射を $p_3,p_4$ とします。すべて正エネルギー質量殻にあり、$p_1+p_2=p_3+p_4$、$s=(p_1+p_2)^2>(m+M)^2$ とします。運動量移行を $k=p_3-p_1=p_2-p_4$、$t=k^2<0$ と置きます。$t<0$ に限定するのは、質量零の光子の前方極 $t=0$ を避け、伝播関数を通常の関数として扱うためです。

二つのDirac電流を

$$
J_e^\mu=\bar u_e(p_3)\gamma^\mu u_e(p_1),\qquad
J_\mu^\nu=\bar u_\mu(p_4)\gamma^\nu u_\mu(p_2)
$$

とします。ここで後者の下付き $\mu$ は**ミューオンという粒子種**、上付き $\nu$ はLorentz添字で、同じ文字の役割を混同しないようにしています。

[QFT16の共変ゲージ伝播関数](../QFT16/index.md#def-qft16-photon-propagator)の運動量表示は、$t\ne0$ では符号を含め

$$
D_{\alpha\beta}^{(\xi)}(k)
=\frac{-i}{t+i0}\left(\eta_{\alpha\beta}
-(1-\xi)\frac{k_\alpha k_\beta}{t+i0}\right)
$$

となります。$\xi>0$ は共変ゲージのパラメータです。縦成分を消すには、[QFT17の質量殻Ward恒等式](../QFT17/index.md#thm-qft17-ward)を、**電子とミューオンのそれぞれに**適用しなければなりません。

<a id="prop-qft31-gauge-scattering-check"></a>

<!-- formal-statement-start -->
> **命題（質量殻電流・共変ゲージ・断面積の一致）**
> $3+1$ 次元QEDの木レベルで、異種の正質量Dirac粒子 $e^-\mu^-\to e^-\mu^-$ の外線が自由Dirac方程式を満たすとする。四運動量は保存され、$s>(m+M)^2$、$t=(p_3-p_1)^2<0$、入射スピンは非偏極とする。内部光子を共変ゲージ $\xi>0$ で扱うと、$q_e,q_\mu$ を二粒子の電荷とし、$S=m^2+M^2$、$u=2S-s-t$ と置いて

$$
\mathcal M_\xi
=\frac{q_eq_\mu}{t}J_e^\alpha J_{\mu,\alpha},
$$

$$
\frac{d\sigma}{d\Omega}
=\frac{(q_eq_\mu)^2}{32\pi^2s\,t^2}
\left[(s-S)^2+(u-S)^2+2St\right]
$$

> を得る。右辺は $\xi$ に依存しない。これは**指定した質量殻外線の木レベル**についての命題であり、任意のoff-shell Green関数がゲージ非依存という意味ではない。
<!-- formal-statement-end -->

### 証明の見取り図

二つの外線で $\not p u(p)=mu(p)$、$\bar u(p')\not p'=m\bar u(p')$ を使い、縦成分の分子が零となることを示します。残った振幅のスピン和は[QFT17のtrace計算](../QFT17/index.md#thm-qft17-spin-average)を適用し、異種終状態の[二体位相空間](../QFT17/index.md#prop-qft17-cross-section)で断面積にします。

<!-- proof-start -->
### 証明

電子側で $k=p_3-p_1$ を代入すると、電子の左右の質量が同じ $m$ なので

$$
\begin{aligned}
k_\alpha J_e^\alpha
&=\bar u_e(p_3)(\not p_3-\not p_1)u_e(p_1)\\
&=m\bar u_e(p_3)u_e(p_1)
-m\bar u_e(p_3)u_e(p_1)=0.
\end{aligned}
$$

ミューオン側は運動量の向きが逆、すなわち $k=p_2-p_4$ です。質量 $M$ に対して

$$
\begin{aligned}
k_\beta J_\mu^\beta
&=\bar u_\mu(p_4)(\not p_2-\not p_4)u_\mu(p_2)\\
&=M\bar u_\mu(p_4)u_\mu(p_2)
-M\bar u_\mu(p_4)u_\mu(p_2)=0.
\end{aligned}
$$

[QFT17の頂点則](../QFT17/index.md#def-qft17-vertex)より、$i\mathcal M_\xi=(-iq_e)J_e^\alpha D_{\alpha\beta}^{(\xi)}(-iq_\mu)J_\mu^\beta$ です。縦成分は $k_\alpha J_e^\alpha\,k_\beta J_\mu^\beta=0$ なので、$(-i)^3=i$ を確かめて

$$
i\mathcal M_\xi=\frac{i q_eq_\mu}{t}J_e\cdot J_\mu.
$$

[QFT17のスピン平均定理](../QFT17/index.md#thm-qft17-spin-average)を、$S=m^2+M^2$、$s+t+u=2S$ の本設定へ適用します。入射スピンの平均は $1/(2\cdot2)=1/4$ ですから

$$
\overline{|\mathcal M|^2}
=\frac{2(q_eq_\mu)^2}{t^2}
\left[(s-S)^2+(u-S)^2+2St\right].
$$

出射二粒子は種類が異なり $1/2!$ を掛けません。弾性散乱ゆえに重心系の $|\boldsymbol p_{\rm out}|/|\boldsymbol p_{\rm in}|=1$ です。[二体断面積の公式](../QFT12/index.md#prop-qft12-cm-cross-section)の $1/(64\pi^2s)$ を掛けると

$$
\frac{d\sigma}{d\Omega}
=\frac1{64\pi^2s}\frac{2(q_eq_\mu)^2}{t^2}
\left[(s-S)^2+(u-S)^2+2St\right],
$$

という結論です。
<!-- proof-end -->

### 具体値で横性と正値性を確認する

$m,M$ が散乱エネルギーに比べて十分小さい範囲の**質量零近似**では $S\approx0$、$u=-s-t$ となり、前方を除き角度 $\theta$ に対して $t=-s(1-\cos\theta)/2$ です。$\theta=\pi/2$ のとき $t=u=-s/2$ なので

$$
\overline{|\mathcal M|^2}
=2(q_eq_\mu)^2\frac{s^2+s^2/4}{s^2/4}
=10(q_eq_\mu)^2>0.
$$

この近似は $m,M>0$ の外線で定理を証明した**後**の極限です。真の質量零QEDの赤外・共線問題や前方 $t=0$ の全角度積分を、この一点の検算で解消したわけではありません。

## 2. 発散するbubbleと有限な予測を分離する

今度はゲージ理論から離れ、四次元Euclidの実 $\phi^4$ 模型を考えます。$m_R>0$、結合 $\lambda_R\ge0$、作用の相互作用項は $\lambda_R\phi^4/4!$ とします。[QFT22のカットオフ](../QFT22/index.md#def-qft22-sharp-cutoff)と[QFT23の零運動量減算](../QFT23/index.md#def-qft23-subtraction-conditions)を区別するため、外部Euclid運動量 $P$、内部運動量 $k$、紫外半径 $\Lambda$ を使って

$$
B_\Lambda(P;m_R)
=\int_{\substack{|k|\le\Lambda\\|k+P|\le\Lambda}}
\frac{d^4k}{(2\pi)^4}
\frac{1}{(k^2+m_R^2)((k+P)^2+m_R^2)},
\qquad I_2(\Lambda,m_R)=B_\Lambda(0;m_R)
$$

と置きます。各 $B_\Lambda$ は $\Lambda\to\infty$ で対数発散しますが、$P$ を固定した**差**の極限は存在します。発散する積分を個別に無限領域へ平行移動する操作と、収束する差での平行移動は同じではありません。

<a id="prop-qft31-subtracted-vertex-check"></a>

<!-- formal-statement-start -->
> **命題（減算四点頂点と二つの運動量での検算）**
> $m_R>0$、$\lambda_R\ge0$ の四次元Euclid実 $\phi^4$ 摂動論で、零外線運動量の四点1PI頂点を $\lambda_R$ にする条件を一ループで課し、三チャネルの外線和が零、$p_1+\cdots+p_4=0$ とする。$P_{ij}=p_i+p_j$、$x\in[0,1]$ と置くと、各 $P_{ij}$ を固定して $\Lambda\to\infty$ とした係数は

$$
\Gamma_R^{(4)}(p_i)
=\lambda_R+\frac{\lambda_R^2}{32\pi^2}
\sum_{(ij)=(12),(13),(14)}\int_0^1
\log\left(1+\frac{x(1-x)P_{ij}^2}{m_R^2}\right)dx
+O(\lambda_R^3).
$$

> 特に全外線運動量が零なら $\Gamma_R^{(4)}=\lambda_R$ である。また、実ベクトル $P\ne0$ に対し $p_1=p_2=P/2$、$p_3=p_4=-P/2$ と置く実現可能な外線配置では、$P_{12}^2=P^2>0$、他の二チャネルは零となるので、表示した一ループ補正は $\lambda_R>0$ なら正、$\lambda_R=0$ なら零となる。
<!-- formal-statement-end -->

### 証明の見取り図

三つのbubbleに各 $1/2$ が付く[QFT22の一ループ頂点](../QFT22/index.md#thm-qft22-one-loop-vertices)から始めます。反項 $\delta\lambda$ に零運動量での値を吸収したあと、収束するbubble差にFeynmanパラメータを適用します。

<!-- proof-start -->
### 証明

[QFT23の零運動量減算法の一ループ反項](../QFT23/index.md#thm-qft23-counterterms-cutoff)より、有限カットオフで

$$
\Gamma_R^{(4)}
=\lambda_R+\delta\lambda
-\frac{\lambda_R^2}{2}\sum_{(ij)}B_\Lambda(P_{ij};m_R)
+O(\lambda_R^3),
\qquad \delta\lambda=\frac{3\lambda_R^2}{2}I_2(\Lambda,m_R).
$$

三つの $I_2$ を和の中へ分配して

$$
\Gamma_R^{(4)}
=\lambda_R-\frac{\lambda_R^2}{2}
\sum_{(ij)}\bigl[B_\Lambda(P_{ij};m_R)-I_2(\Lambda,m_R)\bigr]
+O(\lambda_R^3).
$$

ここで[QFT23の収束差の命題](../QFT23/index.md#prop-qft23-subtracted-bubble)を各チャネルへ適用します。具体的には $A=k^2+m_R^2$、$B=(k+P_{ij})^2+m_R^2$ を $1/(AB)=\int_0^1[xA+(1-x)B]^{-2}dx$ に代入し、差全体で $k\mapsto k+(1-x)P_{ij}$ を行います。積分の分母は $k^2+m_R^2+x(1-x)P_{ij}^2$ になり、有限な差の極限は

$$
\lim_{\Lambda\to\infty}\bigl[B_\Lambda(P_{ij})-I_2\bigr]
=-\frac1{16\pi^2}\int_0^1
\log\left(1+\frac{x(1-x)P_{ij}^2}{m_R^2}\right)dx.
$$

したがって $-\lambda_R^2/2$ との積は $+\lambda_R^2/(32\pi^2)$ です。$P_{ij}=0$ では対数は $\log1=0$。$P_{ij}^2>0$ なら $0<x<1$ で対数の中身が1より大きく、$\lambda_R>0$ なら補正は正、$\lambda_R=0$ なら零です。
<!-- proof-end -->

**運動量配置に関する注意。** Euclidの四本の実運動量には保存則があるので、任意の三つの $P_{ij}^2$ を自由に指定できるとは限りません。定理に使った配置では $p_1+p_2=P$、$p_1+p_3=p_1+p_4=0$ を直接確認できます。この具体的な配置なら、三チャネルのうち一つだけ非零という検算が成立します。

### 小さい運動量から大きい運動量へ

$z=P^2/m_R^2\ge0$ が小さい場合、$\log(1+y)=y-y^2/2+O(y^3)$ を $y=x(1-x)z$ へ代入します。$0\le x(1-x)\le1/4$ なので $0\le z<1$ の範囲では一様に展開でき、

$$
\int_0^1x(1-x)dx=\frac16,\qquad
\int_0^1x^2(1-x)^2dx=\frac1{30}
$$

から

$$
\int_0^1\log(1+x(1-x)z)dx
=\frac z6-\frac{z^2}{60}+O(z^3).
$$

大きい $z$ に対しては $0<x<1$ の固定点で $\log(1+x(1-x)z)=\log z+\log[x(1-x)]+o(1)$ です。端点近くは直接一様収束しませんが、区間を $[\delta,1-\delta]$ と両端に分け、$\log x$ の可積分性で極限を制御すると

$$
\int_0^1\log(1+x(1-x)z)dx
=\log z-2+o(1),
$$

となります。$\int_0^1\log x\,dx=-1$ と、$x\mapsto1-x$ の対称性が定数 $-2$ の出所です。この対数の係数と[QFT25の $\phi^4$ β関数](../QFT25/index.md#thm-qft25-phi4-beta)の符号を後で突き合わせます。

## 3. 三種類の走る結合を混同しない

尺度 $\mu$ を変えるとき**何を固定するか**は、[QFT25のくりこみ群の定義](../QFT25/index.md#def-qft25-rg-functions)で指定しました。ここでは同じ $\log(\mu/\mu_0)$ という変数で、三種類の一ループ方程式を比較します。

- 四次元実 $\phi^4$ の $\overline{\mathrm{MS}}$ 結合 $\lambda>0$ は $d\lambda/d\log\mu=3\lambda^2/(16\pi^2)+O(\lambda^3)$。
- 一種類のDirac荷電場を持つQEDの $\overline{\mathrm{MS}}$ 電荷 $e>0$ は、完全な量子Ward恒等式と $Z_1=Z_2$ を保つ方式の下で $de/d\log\mu=e^3/(12\pi^2)+O(e^5)$。
- 物質場を持たない純 $SU(N)$ Yang–Millsの背景ゲージ不変な方式で、$g>0$ は $dg/d\log\mu=-11Ng^3/(3\cdot16\pi^2)+O(g^5)$。

この三式の出典はそれぞれ[スカラーのβ関数](../QFT25/index.md#thm-qft25-phi4-beta)、[QEDのβ関数](../QFT25/index.md#thm-qft25-qed-beta)、[純Yang–Millsのβ関数](../QFT30/index.md#thm-qft30-beta-function)です。四次元の先頭係数を比較していますが、**同じ物理系の同じ結合を三つの方式で計算したわけではありません**。

<a id="prop-qft31-three-flows"></a>

<!-- formal-statement-start -->
> **命題（三つの一ループ流の符号の対比）**
> 四次元の摂動的領域にある実 $\phi^4$ の結合 $\lambda_0>0$、一Dirac種QEDの電荷 $e_0>0$、純 $SU(N)$（$N\ge2$）の結合 $g_0>0$ を、共通の基準尺度 $\mu_0>0$ においてそれぞれ指定する。各模型の一ループβ関数のみを残し、$L=\log(\mu/\mu_0)$ と置くと

$$
\frac1{\lambda(\mu)}=\frac1{\lambda_0}-\frac{3L}{16\pi^2},
$$

$$
\frac1{e^2(\mu)}=\frac1{e_0^2}-\frac{L}{6\pi^2},
\qquad
\frac1{g^2(\mu)}=\frac1{g_0^2}+\frac{11N L}{24\pi^2}.
$$

> $L>0$ で、これらの一ループ解が摂動的な範囲にある限り、$\lambda,e$ は増加し $g$ は減少する。式の分母が零となる点や強結合領域において、摂動解そのものから物理的極または閉じ込めの存在は導けない。
<!-- formal-statement-end -->

### 証明の見取り図

$\lambda$ には逆数、$e,g$ には逆二乗を使うと、三つの非線形方程式が一定係数の微分方程式になります。積分定数は $\mu=\mu_0$ を代入して決めます。

<!-- proof-start -->
### 証明

一般に $dx/dL=ax^2$ なら $d(x^{-1})/dL=-a$ です。$a=3/(16\pi^2)$ を入れ、$0$ から $L$ まで積分すると $\lambda^{-1}(L)-\lambda_0^{-1}=-3L/(16\pi^2)$ となります。

$dy/dL=by^3$ なら連鎖律により $d(y^{-2})/dL=-2y^{-3}dy/dL=-2b$ です。QEDには $b=1/(12\pi^2)$ を入れ、$e^{-2}(L)=e_0^{-2}-L/(6\pi^2)$。Yang–Millsには $b=-11N/(48\pi^2)$ を入れて

$$
\frac{d}{dL}g^{-2}
=-2\left(-\frac{11N}{48\pi^2}\right)
=\frac{11N}{24\pi^2}
$$

です。いずれも微分方程式の解を一ループで切った**近似**なので、分母が零に近付いて結合が大きくなる所では、捨てた高次項の制御を失います。
<!-- proof-end -->

### ghostの符号は「存在する場の数」だけでは決まらない

[QFT29のGrassmann ghost積分](../QFT29/index.md#prop-qft29-ghost-determinant)と[QFT30の背景場二次作用](../QFT30/index.md#prop-qft30-quadratic-action)を用いると、一ループ有効作用は

$$
\Gamma^{(1)}[\mathcal B]
=\frac12\operatorname{Tr}\log\Delta_1
-\operatorname{Tr}\log\Delta_0
$$

です。実ボース揺らぎの平方根行列式が $1/2$ を、複素Grassmann対が逆符号と係数1を与えます。[QFT30の熱核係数](../QFT30/index.md#thm-qft30-one-loop-log)で背景Feynmanゲージの一定色磁場を選ぶと、ゲージ場寄与 $5/3$、ghost寄与 $1/6$ が規約どおりの組合せで $11/6$ となり、$\mathcal F^2=2h^2$ の変換とカットオフ対数の符号を追うと $b_0=11C_A/3$ になります。個別の寄与は物理的な「負確率」の数え上げではありません。

**二つの制限。** [QFT27の軟光子の包摂和](../QFT27/index.md#thm-qft27-inclusive-cancellation)が消すのは赤外下端 $\omega\downarrow0$ の先頭対数であり、ここまでのUVの結合の走りを代用しません。また[QFT26のWilson流](../QFT26/index.md#thm-qft26-tree-scaling)では、積分消去後の再スケーリングの向きと $\mu$ を高くする通常のβ関数の向きを混同しないようにします。

## 4. 総合演習：式の出所と適用条件を毎回確認する

Level Aでは一つの符号・係数・仮定を自力で判定し、Level Bでは二つ以上の既習結果をつなぎます。Level Cでは最初の設定から最後の観測量・尺度依存までを一続きに計算します。式だけを覚えず、各設問で指定した模型・摂動次数・正則化を確認してください。

### 演習 QFT31-A1：二種類の質量でWard縮約

- Level: A
- 問題: 質量 $m>0$ のDirac粒子の正エネルギー質量殻スピノル $u(p),u(p')$ は $(\not p-m)u(p)=0$、$\bar u(p')(\not p'-m)=0$ を満たす。$q=p'-p$、$J^\alpha=\bar u(p')\gamma^\alpha u(p)$ とする。$q_\alpha J^\alpha=0$ を示せ。もし出射スピノルの質量が $m'\ne m$ に変わり、それぞれ異なる自由Dirac方程式を満たすなら縮約は何になるか。

<!-- solution-start -->
**詳細解答。** 出発点は $q_\alpha\gamma^\alpha=\not p'-\not p$ です。左外線には $\bar u(p')\not p'=m\bar u(p')$、右外線には $\not p u(p)=mu(p)$ を作用させるので

$$
q_\alpha J^\alpha
=\bar u(p')\not p'u(p)-\bar u(p')\not p u(p)
=(m-m)\bar u(p')u(p)=0.
$$

異質量の仮定なら最初の項に $m'$、二番目に $m$ が入り、$(m'-m)\bar u(p')u(p)$ が残ります。質量が異なる外線へこの**対角電流**のWard横性を無条件に当てはめることはできません。問題文には自由スピノルの代数だけを指定しており、質量を変える相互作用のゲージ整合性は仮定していません。
<!-- solution-end -->

### 演習 QFT31-A2：直角散乱と終状態の計数

- Level: A
- 問題: $e^-\mu^-\to e^-\mu^-$ の木レベル散乱で $s>0$ とし、質量を無視できる極限を取る。$t=u=-s/2$ の直角散乱について $\overline{|\mathcal M|^2}=2e^4(s^2+u^2)/t^2$、$d\sigma/d\Omega=\overline{|\mathcal M|^2}/(64\pi^2s)$ を使い、微分断面積を求めよ。なぜ同種粒子の $1/2!$ を掛けないか。

<!-- solution-start -->
**詳細解答。** $u^2=t^2=s^2/4$ を分子へ代入して

$$
\overline{|\mathcal M|^2}
=2e^4\frac{s^2+s^2/4}{s^2/4}=10e^4.
$$

従って

$$
\boxed{\frac{d\sigma}{d\Omega}=\frac{5e^4}{32\pi^2s}}.
$$

二つの終状態は電子とミューオンで**区別可能**です。[QFT12の終状態の計数規則](../QFT12/index.md#thm-qft12-rate-formulas)の同種粒子補正は、同じ物理的配置をラベル交換で二重に数えた場合だけ必要です。直角散乱の一点の微分断面積が有限であることから、$t\to0$ を含む全断面積の有限性は従いません。
<!-- solution-end -->

### 演習 QFT31-A3：三つの反項の独立性

- Level: A
- 問題: 四次元Euclid型の実 $\phi^4$ で、$m_R>0$、$\lambda_R\ge0$、鋭いカットオフ $\Lambda$ を使う。一次の二点頂点 $p^2+m_R^2+\delta Zp^2+\delta m^2+(\lambda_R/2)I_1$ と、二次の零運動量四点頂点 $\lambda_R+\delta\lambda-(3\lambda_R^2/2)I_2$ を与える。$\Gamma^{(2)}(0)=m_R^2$、$\partial\Gamma^{(2)}/\partial p^2|_{p=0}=1$、$\Gamma^{(4)}(0)=\lambda_R$ から反項を求めよ。

<!-- solution-start -->
**詳細解答。** 最初の条件に $p=0$ を代入すると $\delta m^2+(\lambda_R/2)I_1=0$。二つ目の微分では $I_1$ は外部運動量に依存しないので $1+\delta Z=1$。最後の条件は $\delta\lambda-(3\lambda_R^2/2)I_2=0$ です。順番に解いて

$$
\boxed{\delta m^2=-\frac{\lambda_R}{2}I_1},\qquad
\boxed{\delta Z=0},\qquad
\boxed{\delta\lambda=\frac{3\lambda_R^2}{2}I_2}.
$$

これらは[QFT23の一ループ反項](../QFT23/index.md#thm-qft23-counterterms-cutoff)の指定次数に限ります。$\delta Z=0$ は全ループでの等式ではありません。
<!-- solution-end -->

### 演習 QFT31-A4：減算後の低運動量展開

- Level: A
- 問題: $z\ge0$ とし、$F(z)=\int_0^1\log[1+x(1-x)z]dx$ を定める。$F(0)$、$F'(0)$、$F''(0)$ を積分を微分して求め、$z$ が小さいときの二次までの式を作れ。

<!-- solution-start -->
**詳細解答。** $z$ が零近傍の非負範囲なら分母は $1+x(1-x)z\ge1$ です。被積分関数とその初めの二階微分は $x\in[0,1]$ で一様に有界なので、積分と微分を交換できます。

$$
F'(z)=\int_0^1\frac{x(1-x)}{1+x(1-x)z}dx,
\quad
F''(z)=-\int_0^1\frac{x^2(1-x)^2}{[1+x(1-x)z]^2}dx.
$$

$x(1-x)=x-x^2$、$x^2(1-x)^2=x^2-2x^3+x^4$ を積分すると

$$
F(0)=0,\qquad F'(0)=\frac12-\frac13=\frac16,
\qquad F''(0)=-\left(\frac13-\frac12+\frac15\right)=-\frac1{30}.
$$

従ってTaylorの二次項は $F''(0)z^2/2=-z^2/60$ で、

$$
\boxed{F(z)=\frac z6-\frac{z^2}{60}+O(z^3)}.
$$

ここではEuclidの $z=P^2/m_R^2$ を正としたので、対数の実数枝が連続に定まります。
<!-- solution-end -->

### 演習 QFT31-A5：逆数にするとβ関数の符号が見える

- Level: A
- 問題: $\mu>0$ に対して $\mu\,dg/d\mu=-bg^3$、$b>0$、$g(\mu_0)=g_0>0$ を与える。$1/g^2(\mu)$ を求め、$\mu>\mu_0$ で結合がどうなるかを導け。$g$ が大きくなる方向まで同じ一ループ式を信用してよいか。

<!-- solution-start -->
**詳細解答。** $L=\log(\mu/\mu_0)$ に変数を替えると $dg/dL=-bg^3$ です。$g>0$ なので連鎖律を適用でき、

$$
\frac{d}{dL}\left(\frac1{g^2}\right)
=-2g^{-3}\frac{dg}{dL}=2b.
$$

$L=0$ から積分して

$$
\frac1{g^2(\mu)}=\frac1{g_0^2}+2b\log\frac\mu{\mu_0},
\quad
g^2(\mu)=\frac{g_0^2}{1+2bg_0^2\log(\mu/\mu_0)}.
$$

$\mu>\mu_0$ では分母が1より大きく、$g$ が小さくなります。$\mu<\mu_0$ で分母が小さくなり強結合へ進むと、無視した高次のβ関数項が小さいという前提を失うため、摂動式だけで物理的発散の存在を主張できません。
<!-- solution-end -->

### 演習 QFT31-A6：ゲージ場とghostの係数

- Level: A
- 問題: 四次元Euclidの純 $SU(N)$ Yang–Millsで、一定Cartan背景の一色電荷 $q$ に対するスカラー熱核が $(4\pi t)^{-2}[1-(qt)^2/6+O(t^4)]$、ゲージ4成分のtraceが $2+2\cosh(2qt)$ とする。ここで $t>0$ は熱核の固有時間であり、第1節のMandelstam変数 $t=k^2$ とは別の変数である。ボース場の重み $1/2$、Grassmann ghost対の重み $-1$ を加え、曲率二次の $(qt)^2$ 係数を計算せよ。

<!-- solution-start -->
**詳細解答。** まず$\cosh(2qt)=1+2(qt)^2+O(t^4)$ です。したがって4成分の半分とghostの差は

$$
\frac12[2+2\cosh(2qt)]-1=\cosh(2qt).
$$

熱核との積の二次係数を展開すると

$$
\begin{aligned}
\left(1-\frac{(qt)^2}{6}\right)
\left(1+2(qt)^2\right)
&=1+\left(2-\frac16\right)(qt)^2+O(t^4)\\
&=1+\frac{11}{6}(qt)^2+O(t^4).
\end{aligned}
$$

ボース場だけなら $\frac12[2+2\cosh(2qt)]=2+2(qt)^2+\cdots$ なので、熱核との積の二次係数は $2-2/6=5/3$ です。ghostによる差は $11/6-5/3=1/6$ です。[QFT30の局所対数係数](../QFT30/index.md#thm-qft30-one-loop-log)を組み立てる前の色ごとの値と一致します。$q=0$ の色はこの曲率二次係数に寄与しません。
<!-- solution-end -->

### 演習 QFT31-B1：連結二点関数と1PI二点頂点

- Level: B
- 問題: 対称正定値行列 $K\in\mathbb R^{2\times2}$ を持つ有限次元Euclid Gaussian模型 $Z(J)=\int_{\mathbb R^2}\exp[-\tfrac12x^TKx+J^Tx]dx$ を考え、$W(J)=\log[Z(J)/Z(0)]$、$\varphi=\nabla_JW$、$\Gamma(\varphi)=J^T\varphi-W(J)$ とする。$K=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ の場合に $W,\varphi,\Gamma$ を求め、連結二点共分散と1PI二点Hessianが逆行列になることを具体的に示せ。

<!-- solution-start -->
**詳細解答。** [QFT19の正定値Gaussian重み](../QFT19/index.md#def-qft19-gaussian-weight)の条件は、任意の $x\ne0$ について $x^TKx>0$ となることです。$K$ は実対称なので、直交する単位固有ベクトル $v_-=(1,-1)^T/\sqrt2$、$v_+=(1,1)^T/\sqrt2$ を基底に取れます。固有値が順に $1,3$ であることを $Kv_-=v_-$、$Kv_+=3v_+$ から確かめ、$x=y_-v_-+y_+v_+$ と展開すると

$$
x^TKx=y_-^2+3y_+^2>0\qquad(x\ne0).
$$

これにより、**固有値の正性が元の正定値条件を判定できる理由**が分かります。直交座標変換のJacobianの絶対値は1で、$e^{-x^TKx/2}=e^{-y_-^2/2}e^{-3y_+^2/2}$ は可積分です。したがって[QFT19の有限次元Gaussian生成公式](../QFT19/index.md#thm-qft19-gaussian)も適用できます。平方完成を行うと

$$
-\frac12x^TKx+J^Tx
=-\frac12(x-K^{-1}J)^TK(x-K^{-1}J)
+\frac12J^TK^{-1}J.
$$

変数移動では積分領域 $\mathbb R^2$ とLebesgue測度は変わらず、

$$
K^{-1}=\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix},
\quad W(J)=\frac12J^TK^{-1}J,
\quad\varphi=K^{-1}J.
$$

$J=K\varphi$ をLegendre式へ戻すと

$$
\Gamma(\varphi)
=\varphi^TK\varphi-\frac12\varphi^TK\varphi
=\frac12\varphi^TK\varphi.
$$

よって $\nabla_J^2W=K^{-1}$、$\nabla_\varphi^2\Gamma=K$ であり

$$
\begin{pmatrix}2&1\\1&2\end{pmatrix}
\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}=I_2.
$$

これは[QFT21のLegendre Hessian関係](../QFT21/index.md#thm-qft21-legendre-hessian)の有限次元直接例です。正定値性がなくなるとGaussian積分またはLegendreの可逆性の条件を失う場合があります。
<!-- solution-end -->

### 演習 QFT31-B2：方式の有限差と同じ物理的頂点

- Level: B
- 問題: 質量 $m>0$ の四次元Euclid実 $\phi^4$ で、零運動量減算の四点頂点が $\Gamma_0^{(4)}(0)=\lambda_0$、$\overline{\mathrm{MS}}$ の一ループ表示が $\Gamma_{\overline{\mathrm{MS}}}^{(4)}(0)=\lambda_{\overline{\mathrm{MS}}}-(3\lambda_{\overline{\mathrm{MS}}}^2/32\pi^2)\log(\mu^2/m^2)+O(\lambda^3)$ とする。二つを同じ四点頂点に合わせるため $\lambda_0$ を $\lambda_{\overline{\mathrm{MS}}}$ で表し、$\mu=m$ の場合を確認せよ。質量の方式差は示した次数では無視できるものとする。

<!-- solution-start -->
**詳細解答。** 比較対象は**同じ外線運動量零の1PI四点頂点**です。したがって左辺を同一と置き、表示の次数まで

$$
\boxed{\lambda_0
=\lambda_{\overline{\mathrm{MS}}}
-\frac{3\lambda_{\overline{\mathrm{MS}}}^2}{32\pi^2}
\log\frac{\mu^2}{m^2}+O(\lambda_{\overline{\mathrm{MS}}}^3)}.
$$

$\mu=m$ なら対数は零なので、$\lambda_0=\lambda_{\overline{\mathrm{MS}}}+O(\lambda^3)$ です。異なる $\mu$ で数値を単純に同じと置くことはできません。[QFT23の方式比較](../QFT23/index.md#thm-qft23-msbar-counterterms)にあるように、有限反項を含む結合の再定義を行ってから同じ物理量を比較します。
<!-- solution-end -->

### 演習 QFT31-B3：量子Ward恒等式が必要な段階を特定する

- Level: B
- 問題: 一Dirac種のQEDを $d=4-2\varepsilon$ の $\overline{\mathrm{MS}}$ で考え、$Z_3=1-ae^2/\varepsilon+O(e^4)$、$a=1/(12\pi^2)$ とする。完全な量子Ward–Takahashi恒等式が成立して $Z_1=Z_2$ なら、裸電荷は $e_B=\mu^\varepsilon Z_3^{-1/2}e$ である。裸電荷を固定して $\beta_e=e^3/(12\pi^2)+O(e^5)$ を導け。光子二点関数の横性だけで $Z_1=Z_2$ は証明できるか。

<!-- solution-start -->
**詳細解答。** $\beta_e^{(d)}=\mu\,de/d\mu$ として、四次元極限の前は $\beta_e^{(d)}=-\varepsilon e+be^3+O(e^5)$ と置きます。裸電荷の対数を微分すると

$$
0=\varepsilon+\frac{\beta_e^{(d)}}e
-\frac12\beta_e^{(d)}\partial_e\log Z_3.
$$

$\log Z_3=-ae^2/\varepsilon+O(e^4)$ を代入して

$$
0=\varepsilon+(-\varepsilon+be^2)
+\frac{ae}{\varepsilon}(-\varepsilon e+be^3)
+O(e^4).
$$

最後の二因子の積にある $be^3\cdot ae/\varepsilon$ は結合の四次なので、この次数では落とせます。二次の係数は

$$
(b-a)e^2=0,\qquad b=a=\frac1{12\pi^2}
$$

となり、$\varepsilon\to0$ で結論を得ます。

[QFT24の二点横性](../QFT24/index.md#thm-qft24-loop-ward)は光子自己エネルギーについての恒等式ですが、電子の自己エネルギーと頂点反項の関係を単独では与えません。$Z_1=Z_2$ には[QFT25の量子Ward恒等式を仮定した電荷β関数](../QFT25/index.md#thm-qft25-qed-beta)の追加条件が必要です。
<!-- solution-end -->

### 演習 QFT31-B4：赤外分解能とUV尺度の役割

- Level: B
- 問題: 正質量の外線を持つ荷電散乱の独立軟光子模型で、硬い確率を $P_{\rm hard}>0$、先頭軟係数を $B>0$ とする。$0<\lambda_{\rm IR}<\Delta<E$ に対し、零放出確率は $P_0=P_{\rm hard}e^{-B\log(E/\lambda_{\rm IR})}$、分解能以下 $\lambda_{\rm IR}<\omega\le\Delta$ の個数はPoisson平均 $B\log(\Delta/\lambda_{\rm IR})$ とする。全個数を足した包摂確率を導け。$\Delta$ と、くりこみ尺度 $\mu$ の役割を説明せよ。

<!-- solution-start -->
**詳細解答。** 未分解帯域の平均を $N_<=B\log(\Delta/\lambda_{\rm IR})$ と置きます。零放出の規格化を保ったまま各未分解光子数 $n\ge0$ の確率を足すと

$$
\begin{aligned}
P_{\rm inc}
&=P_{\rm hard}e^{-B\log(E/\lambda_{\rm IR})}
\sum_{n=0}^\infty\frac{N_<^n}{n!}\\
&=P_{\rm hard}
\exp\left[-B\log\frac E{\lambda_{\rm IR}}
+B\log\frac\Delta{\lambda_{\rm IR}}\right]\\
&=P_{\rm hard}\exp\left[-B\log\frac E\Delta\right].
\end{aligned}
$$

下端 $\lambda_{\rm IR}$ は相殺され、検出の分解能 $\Delta$ は**残ります**。これは[QFT27の包摂的軟相殺](../QFT27/index.md#thm-qft27-inclusive-cancellation)の指定模型内での結果です。$\Delta$ は物理的測定関数の閾値、$\mu$ はUV反項に用いる方式上のくりこみ尺度であり、$\Delta=\mu$ と置く必要も一般的な意味もありません。完全QEDの有限部分はこのPoisson模型だけでは決まりません。
<!-- solution-end -->

### 演習 QFT31-B5：Wilsonの向きと重い場の消去

- Level: B
- 問題: 以下の二つの模型で計算せよ。

**(a)** 四次元Euclidで正準次元 $[\phi]=1$ のスカラー場を使い、局所演算子 $\phi^n$ の結合 $c_n$ の質量次元を求めよ。高運動量殻を消して元のカットオフへ戻す再スケーリングを $b>1$（長距離方向）とする。木レベルの変換

$$
c_n'=b^{4-n}c_n
$$

を導き、$n=2,4,6$ を分類せよ。

**(b)** 有限モード・周期境界のEuclid模型で、重いGaussian場 $H$ と軽い場 $\phi$ の作用を

$$
S[H,\phi]=S_{\rm light}[\phi]
+\int d^4x\left\{\frac12H(-\partial^2+M^2)H+g_HH\phi^2\right\}
$$

とする。$M>0$、軽い場の作用は積分を安定化し、$\phi^2$ のFourier支持は $|p|\ll M$ にあると仮定する。$H$ を消去して生じる四次の局所項の先頭係数を求めよ。

<!-- solution-start -->
**詳細解答。** 作用 $\int d^4x\,c_n\phi^n$ は無次元なので、$[d^4x]=-4$、$[\phi^n]=n$ より $[c_n]=4-n$。$x=bx'$ で $d^4x=b^4d^4x'$ とし、運動項 $\int(\partial\phi)^2/2$ の係数を保つには $\phi(x)=b^{-1}\phi'(x')$ が必要です。したがって

$$
\int d^4x\,c_n\phi^n
=\int d^4x'\,b^{4-n}c_n(\phi')^n.
$$

$n=2$ は $b^2$ で増え関連、$n=4$ は $b^0$ で周辺、$n=6$ は $b^{-2}$ で減り無関連です。これは[QFT26の木レベルスケーリング](../QFT26/index.md#thm-qft26-tree-scaling)です。

重い場の二次作用素を $K=-\partial^2+M^2$ とします。以下の $HKH$ や $H\phi^2$ は、有限モードの内積 $\langle f,g\rangle=\int f(x)g(x)d^4x$ による積分の略記です。周期境界のFourier基底 $e^{ip\cdot x}$ に作用させると $K e^{ip\cdot x}=(p^2+M^2)e^{ip\cdot x}$ なので、各固有値は $p^2+M^2>0$ です。この正定値性によって[QFT19のGaussian公式](../QFT19/index.md#thm-qft19-gaussian)を適用でき、平方完成すると

$$
\frac12HKH+g_HH\phi^2
=\frac12(H+g_HK^{-1}\phi^2)K(H+g_HK^{-1}\phi^2)
-\frac{g_H^2}{2}\phi^2K^{-1}\phi^2.
$$

低運動量 $|p|\ll M$ で $K^{-1}=(M^2+p^2)^{-1}=M^{-2}+O(p^2/M^4)$ なので、局所作用の先頭は $-g_H^2\phi^4/(2M^2)$。作用の $\phi^4/4!$ 規約で比較するなら $\delta\lambda=-12g_H^2/M^2$ です。この導出は有限カットオフと正の $K$ のGaussian消去に基づきます。[QFT26の重い場のmatching](../QFT26/index.md#prop-qft26-heavy-matching)と同じ低エネルギー近似です。
<!-- solution-end -->

### 演習 QFT31-C1：散乱振幅から分解能付き確率へ

- Level: C
- 問題: $3+1$ 次元QEDの $e^-\mu^-\to e^-\mu^-$ 木レベルを考える。電子とミューオンは質量 $m,M>0$、電荷は共に $-e$（$e>0$）とし、$s>(m+M)^2$、$0<\theta<\pi$ の重心系で外線は自由Dirac方程式を満たす。$k=p_3-p_1$、$t=k^2<0$、$S=m^2+M^2$、$u=2S-s-t$ とする。共変ゲージの光子核 $D_{\alpha\beta}^{(\xi)}=-i[\eta_{\alpha\beta}-(1-\xi)k_\alpha k_\beta/t]/t$（$t<0$ の境界値）を与える。次を示せ。

  1. 二つの電流縮約から振幅が $\xi$ に依存せず、$\mathcal M=e^2 J_e\cdot J_\mu/t$ になること。
  2. 非偏極のスピン平均 $\overline{|\mathcal M|^2}=2e^4[(s-S)^2+(u-S)^2+2St]/t^2$ を使い、異種終状態の $d\sigma/d\Omega$ を導くこと。
  3. 質量零近似の直角散乱値を出し、なぜこの値を全角度へ無条件に積分してはいけないか説明すること。
  4. 別途、正質量荷電外線について先頭軟因子が成り立つ独立モード模型を仮定し、赤外下限 $\lambda_{\rm IR}$、分解能 $\Delta$、上端 $E$（$0<\lambda_{\rm IR}<\Delta<E$）、角度係数 $B\ge0$ に対して、実・仮想の先頭対数を足した $P_{\rm inc}/P_{\rm hard}$ を求めること。木レベル断面積と包摂模型を結ぶ際に新たに必要な条件も述べよ。

<!-- solution-start -->
**詳細解答。**

**(1)** $k=p_3-p_1$ を電子電流に入れると

$$
k_\alpha J_e^\alpha
=\bar u_e(p_3)(\not p_3-\not p_1)u_e(p_1)
=(m-m)\bar u_e(p_3)u_e(p_1)=0.
$$

ミューオンでは $k=p_2-p_4$ として

$$
k_\beta J_\mu^\beta
=\bar u_\mu(p_4)(\not p_2-\not p_4)u_\mu(p_2)
=(M-M)\bar u_\mu(p_4)u_\mu(p_2)=0.
$$

縦核を挟んだ項は $(1-\xi)(k\cdot J_e)(k\cdot J_\mu)/t^2=0$。二頂点の $(-ie)^2$ と伝播関数の $-i$ から $i\mathcal M=ie^2J_e\cdot J_\mu/t$、従って結論です。この議論は[QFT18の質量殻Ward縮約](../QFT18/index.md#cor-qft18-on-shell-ward)を二つの異種電流へ適用しています。

**(2)** 問題に与えたスピン平均の式は、入射スピンを $1/4$ で平均した値です。[QFT12の二体断面積](../QFT12/index.md#prop-qft12-cm-cross-section)では重心系の運動量比は弾性過程ゆえ1で、終状態は異種粒子なので $1/2!$ を掛けません。よって

$$
\frac{d\sigma}{d\Omega}
=\frac1{64\pi^2s}\overline{|\mathcal M|^2}
=\frac{e^4}{32\pi^2s\,t^2}
[(s-S)^2+(u-S)^2+2St].
$$

**(3)** $m,M$ を外線の質量殻での導出後に無視できる近似とし、$S\to0$。直角 $\theta=\pi/2$ では $t=u=-s/2$ なので

$$
\frac{d\sigma}{d\Omega}
=\frac{10e^4}{64\pi^2s}
=\frac{5e^4}{32\pi^2s}.
$$

しかし $\theta\to0$ では $t=-2p_{\rm cm}^2(1-\cos\theta)\to0^-$ となり、一般に振幅二乗の $t^{-2}$ が大きくなります。質量零の媒介光子による前方特異性は、直角で有限な微分断面積を全角度積分可能にしません。

**(4)** [QFT27の軟因子と包摂和](../QFT27/index.md#thm-qft27-inclusive-cancellation)の仮定の下で、仮想部分は $-B\log(E/\lambda_{\rm IR})$、未分解実光子は $+B\log(\Delta/\lambda_{\rm IR})$ です。足して

$$
\delta_{\rm inc}^{\rm soft}
=-B\log\frac E\Delta,
\qquad
\boxed{\frac{P_{\rm inc}}{P_{\rm hard}}
=\exp\left(-B\log\frac E\Delta\right)}.
$$

指数形は独立軟モード模型内の全個数和です。木レベルの $e\mu$ 散乱へ数値を掛けるには、荷電外線の正質量、電荷保存、軟近似の因子化、硬い散乱の運動学と測定関数の固定、分解能に合う終状態の包摂という追加条件が要ります。前方特異性や非対数の一ループ有限部分は、この指数一つでは計算されません。特に赤外下限の相殺とUVくりこみは別の議論です。
<!-- solution-end -->

### 演習 QFT31-C2：φ⁴の反項と純Yang–Millsの符号を横断する

- Level: C
- 問題: 次の二つの摂動模型について、すべて四次元の一ループ精度とする。

  **(a)** Euclid実 $\phi^4$ は $m_R>0$、$\lambda_R>0$、鋭いカットオフ $\Lambda$ を持ち、四点頂点が $\Gamma^{(4)}(p_i)=\lambda_R+\delta\lambda-(\lambda_R^2/2)\sum_{(ij)}B_\Lambda(p_i+p_j;m_R)+O(\lambda_R^3)$、$B_\Lambda(0;m_R)=I_2$ である。$\Gamma^{(4)}(0)=\lambda_R$ の反項、$p_1=p_2=P/2$、$p_3=p_4=-P/2$（$P^2>0$）で $\Lambda\to\infty$ 後の四点頂点、および $P^2\ll m_R^2$ の最初の補正を求めよ。有限bubble差は $-F(P^2/m_R^2)/(16\pi^2)$、$F(z)=\int_0^1\log[1+x(1-x)z]dx$ としてよい。

  **(b)** 四次元Euclid純 $SU(2)$ Yang–Millsで、一定色磁場の背景場法による色電荷を $(h,-h,0)$、$h>0$ とする。各荷電色の熱核の曲率二次係数は、ゲージ場とghostを合わせて $11q^2/6$。曲率ノルムは色添字 $a$ とEuclid添字 $\mu,\nu$ について和を取り、以下 $\mathcal F^2\coloneqq\mathcal F_{\mu\nu}^a\mathcal F_{\mu\nu}^a$ と略記する。この背景では次のとおりとする。

$$
\mathcal F_{\mu\nu}^a\mathcal F_{\mu\nu}^a=2h^2.
$$

  局所対数項を

$$
\Gamma_{\rm UV}^{(1)}
=-\frac14\frac{b_0}{16\pi^2}
\log\frac{\Lambda^2}{\mu^2}\int\mathcal F^2
$$

  と書く。$b_0$、$\beta_g$、$g^{-2}(\mu)$ を導け。さらに(a)の[スカラー模型のβ関数](../QFT25/index.md#thm-qft25-phi4-beta)と比べてUVの向き、ghostを落とした場合の誤り、二模型の一ループ式で**証明できない**非摂動的主張を述べよ。

<!-- solution-start -->
**詳細解答。**

**(a) 零運動量の反項。** 三チャネルの外線和は零で $P_{ij}=0$ となるので

$$
\lambda_R=\lambda_R+\delta\lambda
-\frac{\lambda_R^2}{2}(I_2+I_2+I_2)
+O(\lambda_R^3).
$$

従って指定次数の反項は $\delta\lambda=3\lambda_R^2I_2/2$ です。運動量配置を代入すると

$$
p_1+p_2=P,\qquad p_1+p_3=0,
\qquad p_1+p_4=0.
$$

ゆえに反項を引いた式のカットオフ極限は

$$
\begin{aligned}
\Gamma_R^{(4)}(P/2,P/2,-P/2,-P/2)
&=\lambda_R-\frac{\lambda_R^2}{2}
\left[\lim_{\Lambda\to\infty}(B_\Lambda(P)-I_2)+0+0\right]
+O(\lambda_R^3)\\
&=\lambda_R+\frac{\lambda_R^2}{32\pi^2}
F(P^2/m_R^2)+O(\lambda_R^3).
\end{aligned}
$$

$z=P^2/m_R^2$ として $\log(1+x(1-x)z)=x(1-x)z+O(z^2)$ を積分します。$\int_0^1x(1-x)dx=1/6$ なので

$$
\boxed{\Gamma_R^{(4)}
=\lambda_R+\frac{\lambda_R^2 P^2}{192\pi^2m_R^2}
+O(\lambda_R^2P^4/m_R^4)+O(\lambda_R^3)}.
$$

この表示は[QFT23の有限bubble差](../QFT23/index.md#prop-qft23-subtracted-bubble)を使用しました。各発散積分を勝手に別々に移動したものではありません。

**(b) 色・ghost・β関数。** 二つの荷電色で $\sum_rq_r^2=h^2+h^2=2h^2=C_Ah^2$、$C_A=2$ です。[QFT30の熱核から対数項への変換](../QFT30/index.md#thm-qft30-one-loop-log)と同じく、曲率二次の色traceは

$$
\sum_r\frac{11}{6}q_r^2
=\frac{11}{3}h^2
=\frac{11}{6}\mathcal F^2.
$$

一方、指定された局所対数項の係数を、熱核の負のproper-time積分として

$$
-\frac1{16\pi^2}\log\frac{\Lambda^2}{\mu^2}
\int\frac{11}{6}\mathcal F^2
=-\frac14\frac{22/3}{16\pi^2}
\log\frac{\Lambda^2}{\mu^2}\int\mathcal F^2
$$

と比較すると $b_0=22/3$ です。裸結合 $g_B$ とUVカットオフを固定した $1/g_R^2=g_B^{-2}-[b_0/(16\pi^2)]\log(\Lambda^2/\mu^2)$ を微分すると

$$
\frac{d}{d\log\mu}g_R^{-2}
=\frac{2b_0}{16\pi^2},
\qquad
-2g_R^{-3}\beta_g=\frac{2b_0}{16\pi^2}.
$$

従って

$$
\boxed{\beta_g=-\frac{22}{3}\frac{g_R^3}{16\pi^2}
+O(g_R^5)},\qquad
\boxed{g_R^{-2}(\mu)=g_R^{-2}(\mu_0)
+\frac{44/3}{16\pi^2}\log\frac\mu{\mu_0}}.
$$

**比較。** $\phi^4$ の $\beta_\lambda>0$ はUV方向に結合が増加する一方、純Yang–Millsの $\beta_g<0$ は小結合に近付く漸近自由性を示します。ghostを落とすと色電荷ごとの係数が $11/6$ からゲージ場のみの $5/3$ に変わり、$b_0=22/3$ を再現できません。さらに、Yang–Millsの低エネルギー強結合・閉じ込め・質量ギャップも、$\phi^4$ の一ループLandau極を実在の厳密な特異点とすることも、制御を失った摂動式からは証明できません。ここで比較しているのは異なる模型の**先頭係数の符号**です。
<!-- solution-end -->

## 5. 学びの整理：判断すべき五つの境界

| 計算の場面 | 正しい判断 | 混同したときの誤り |
| --- | --- | --- |
| QEDの木レベル外線 | 質量殻Dirac方程式で $k\cdot J=0$ を両端で確認 | off-shell Green関数も常に $\xi$ 非依存とする |
| $\phi^4$ のbubble | 固定外線運動量で発散部分を減算し、**差**の極限を取る | 発散する積分を個別に平行移動する |
| QEDの電荷β関数 | 量子Ward恒等式・ゲージを保つ正則化を仮定 | 光子二点横性だけで $Z_1=Z_2$ が証明済みとする |
| Yang–Millsの一ループ | ボース場の $1/2$ とghostの負符号を両方含める | ghostを単なる「観測不能な粒子」として消す |
| 赤外・紫外・非摂動 | 分解能 $\Delta$、くりこみ尺度 $\mu$、結合の強さを別々に追う | UVの走りからIR相殺や閉じ込めを結論する |

ここでの計算は、有限自由度・有限カットオフの出発点と、指定した摂動極限の範囲を明記することで成り立っています。次に標準模型の場と対称性へ進む際も、電弱の質量行列や量子異常の議論を、すでに証明した定理として曖昧に先取りせず、一つずつ仮定と実計算を対応させていきます。
