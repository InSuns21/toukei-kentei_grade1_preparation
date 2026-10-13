# CELEV3 特異ポテンシャル・衝突・局所変形

<!-- definition-example-audit: strict -->

[CELEV2の存在定理](../CELEV2/index.md#thm-celev2-minimizer)により、重心零で半周期反転する平面Newton $n$ 体ループには、作用を最小にする曲線が存在します。しかし、[CELEV1の有限作用衝突例](../CELEV1/index.md#prop-celev1-finite-collision)が示すように、作用が有限でも粒子の衝突は起こり得ます。極小点の存在から運動方程式の解まで、まだ論理的な隙間が残っています。

この隙間を埋める方法は「衝突したらポテンシャルが無限大だから排除できる」と言うことではありません。**衝突を通る候補と、同じ端点を結び衝突を避ける候補の作用を比較する**ことです。まず二体の衝突軌道で比較を最後まで計算します。次に研究論文で確立されたMarchalの定理を、適用条件を限定して使用します。最後に半周期反転を利用して、前章の極小点が実際に衝突を持たないことを示します。

## 1. 衝突の種類と有限作用

時刻 $t_0$ に少なくとも二粒子の位置が等しければ衝突です。二粒子だけが一致する衝突と、全粒子が同一点に集まる全衝突は違います。三粒子以上の部分集団が一致する多重衝突もあります。これは後で、どの粒子を局所的に動かす必要があるかを見分けるための分類です。

<a id="def-celev3-collision-types"></a>
<!-- formal-statement-start -->
> **定義（二体衝突・全衝突）**  
> $n\ge2$ とし、連続配置曲線 $q:[a,b]\to(\mathbb R^2)^n$ と時刻 $t_0\in[a,b]$ を取る。$i\ne j$ で $q_i(t_0)=q_j(t_0)$ なら、その二粒子は時刻 $t_0$ に衝突する。特に $n\ge3$ で、ちょうど一組の二粒子だけが一致して他粒子とは異なるとき単純二体衝突、$q_1(t_0)=\cdots=q_n(t_0)$ のとき全衝突と呼ぶ。全衝突も衝突の一種である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-celev3-collision-types -->
### 例：二体衝突と全衝突を区別する

$-1\le t\le1$ で $s(t)=|t|^{2/3}$ とします。$q_1=(s,0)$、$q_2=(-s,0)$、$q_3=(2,0)$ なら、$t=0$ で粒子1と2が原点で一致しますが粒子3は $(2,0)$ にいるので単純二体衝突です。代わりに $q_3=(0,0)$ とすると、$t=0$ に三粒子すべてが一致する全衝突です。いずれも質量重心を引く操作で相互距離は不変なので、重心零の座標へ移しても分類は同じです。
<!-- definition-example-end -->

[CELEV1の拡張作用](../CELEV1/index.md#def-celev1-extended-action)では、衝突した瞬間のポテンシャルを $+\infty$ と定義しても、**時刻一点は積分値を無限大にしません**。これを具体的に測るため、まず相互距離 $r(t)>0$ に対する冪型ポテンシャル $\kappa r(t)^{-\alpha}$（$\kappa,\alpha>0$）を考えます。平面Newton重力は $\alpha=1$ です。衝突時刻の近くで $r(t)=a|t|^\beta$（$a>0$）と置くと、
$$
|r'(t)|^2=a^2\beta^2|t|^{2\beta-2},
\qquad
r(t)^{-\alpha}=a^{-\alpha}|t|^{-\alpha\beta}
$$
です。$\int_0^\varepsilon t^p\,dt$ は $p>-1$ のときだけ有限ですから、運動項とポテンシャル項がともに有限となる条件は
$$
2\beta-2>-1,\qquad -\alpha\beta>-1,
\quad\Longleftrightarrow\quad
\frac12<\beta<\frac1\alpha
$$
となります。特にNewtonの $\alpha=1$ なら $\beta=2/3$ を選べます。この意味でNewton重力は有限作用の衝突を許す「弱い」特異性です。

対照的に、相互距離が零になるすべての $H^1$ 曲線について、ポテンシャル積分が必ず発散する冪指数もあります。この違いは計算で確かめられます。

<a id="prop-celev3-power-threshold"></a>
<!-- formal-statement-start -->
> **命題（冪型ポテンシャルの有限作用衝突閾値）**  
> 区間 $[-L,L]$（$L>0$）上の二粒子の相対曲線 $r\in H^1([-L,L];\mathbb R^d)$ が $r(0)=0$ を満たすとする。$\alpha\ge2$、$\kappa>0$ なら
$$
\int_{-L}^{L}\frac{\kappa}{|r(t)|^\alpha}\,dt=+\infty
$$
> である。ただし分母が零の値は $+\infty$ とする。一方 $0<\alpha<2$ なら、衝突する $H^1$ 相対曲線で
$$
\int_{-L}^{L}\left\{\frac{\mu}{2}|r'(t)|^2+
\frac{\kappa}{|r(t)|^\alpha}\right\}dt<\infty
$$
> となる例が任意の $\mu,\kappa>0$ に対して存在する。
<!-- formal-statement-end -->

### 証明の見取り図

前半は $H^1$ の曲線が衝突点から高々 $|t|^{1/2}$ の速度で離れられるというCauchy–Schwarz評価です。後半は上で得た冪指数の範囲から一つ選んで直接積分します。これは冪型模型についての閾値で、任意の特異ポテンシャルへの一般化ではありません。

<!-- proof-start -->
### 証明

$H^1$ 関数の絶対連続代表について $r(0)=0$ より
$$
|r(t)|=\left|\int_0^t r'(s)\,ds\right|
\le |t|^{1/2}\left(\int_{-L}^{L}|r'(s)|^2ds\right)^{1/2}
=C|t|^{1/2}.
$$
$C=0$ なら $r$ は零曲線でポテンシャル積分は無限大です。$C>0$ なら $r(t)=0$ の時刻を含めて拡張実数の大小関係で
$$
\frac{\kappa}{|r(t)|^\alpha}
\ge\frac{\kappa}{C^\alpha |t|^{\alpha/2}}
\quad(t\ne0).
$$
$\alpha/2\ge1$ では $\int_0^L t^{-\alpha/2}dt=+\infty$ なので前半が従います。

$0<\alpha<2$ のとき $1/2<1/\alpha$ です。この間から $\beta$ を選び、固定単位ベクトル $e$ に対して $r(t)=a|t|^\beta e$ と置きます。$r$ は連続で $r(0)=0$、かつ
$$
\begin{aligned}
\int_{-L}^L|r'|^2dt
&=2a^2\beta^2\frac{L^{2\beta-1}}{2\beta-1}<\infty,\\
\int_{-L}^L|r|^{-\alpha}dt
&=2a^{-\alpha}\frac{L^{1-\alpha\beta}}{1-\alpha\beta}<\infty.
\end{aligned}
$$
両積分が有限なので $r\in H^1$ であり、正の係数 $\mu/2,\kappa$ を掛けても作用は有限です。$\square$
<!-- proof-end -->

この閾値は、**衝突を含む曲線が有限作用を持てるか**を判定しています。$\alpha=1$ の有限作用衝突曲線が「作用の最小点である」と主張しているわけではありません。最小性の判定には、以下の別の変形が必要です。

## 2. 二体衝突を横方向へずらす

質量 $m_1,m_2>0$ の二体問題を重心零座標で考えます。相対位置を $r=q_1-q_2$、$M=m_1+m_2$、換算質量を $\mu=m_1m_2/M$、$\kappa=Gm_1m_2$ と置くと、
$$
q_1=\frac{m_2}{M}r,\quad q_2=-\frac{m_1}{M}r,
\quad
\frac12(m_1|\dot q_1|^2+m_2|\dot q_2|^2)
=\frac\mu2|\dot r|^2.
$$
従って相対曲線の作用は
$$
\mathcal B_L[r]=\int_{-L}^{L}
\left(\frac\mu2|\dot r|^2+\frac{\kappa}{|r|}\right)dt.
$$

単純な衝突・再放出の曲線 $r_0(t)=a|t|^{2/3}e_1$（$a>0$、$e_1=(1,0)$）を考えます。$t\ne0$ では
$$
\ddot r_0(t)=-\frac{2a}{9}|t|^{-4/3}e_1,\qquad
-\frac{GM r_0(t)}{|r_0(t)|^3}
=-\frac{GM}{a^2}|t|^{-4/3}e_1.
$$
特に $a^3=9GM/2$ と選べば、衝突時刻の両側では二体Newton方程式を満たします。それでも衝突を通す区間全体では通常の $C^2$ 解ではありません。

横方向の単位ベクトル $e_2=(0,1)$ を使って、端点だけ固定する変形を考えます。$0<\delta<a(L/2)^{2/3}$ として
$$
\phi(t)=
\begin{cases}
1&(|t|\le L/2),\\
2-2|t|/L&(L/2<|t|\le L),
\end{cases}
\qquad
r_\delta(t)=r_0(t)+\delta\phi(t)e_2.
$$
$\phi(\pm L)=0$ なので $r_\delta(\pm L)=r_0(\pm L)$ です。$r_\delta(0)=\delta e_2\ne0$ で、他の時刻は $e_1$ 成分が非零ですから、変形後は区間全体で非衝突です。

<a id="prop-celev3-transverse-surgery"></a>
<!-- formal-statement-start -->
> **命題（二体衝突・再放出路の横方向局所変形）**  
> 平面二体の換算質量 $\mu>0$、係数 $\kappa>0$、$a,L>0$ を固定する。$r_0(t)=a|t|^{2/3}e_1$ と上の $r_\delta$ はともに $H^1([-L,L];\mathbb R^2)$ で端点が等しく、十分小さな $\delta>0$ について
$$
\mathcal B_L[r_\delta]<\mathcal B_L[r_0]<\infty
$$
> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

元の速度は $e_1$、付加速度は $e_2$ 方向なので、運動エネルギーの増分は $\delta^2$ の次数です。一方、衝突の近くでは横ずれによる $1/|r|$ の減少が $\delta^{1/2}$ の次数になります。小さい $\delta$ では $\delta^{1/2}$ の利得が $\delta^2$ の負担を上回ります。

<!-- proof-start -->
### 証明

$|r_0'|^2=(4a^2/9)|t|^{-2/3}$ および $|r_0|^{-1}=a^{-1}|t|^{-2/3}$ は両方とも可積分です。$\phi$ は区分的に線形なLipschitz関数なので $r_\delta\in H^1$ です。$e_1\cdot e_2=0$ から交差項は各時刻で零になり、
$$
\begin{aligned}
\frac{\mu}{2}\int_{-L}^L
\bigl(|r_\delta'|^2-|r_0'|^2\bigr)dt
&=\frac{\mu\delta^2}{2}\int_{-L}^L|\phi'|^2dt\\
&=\frac{\mu\delta^2}{2}\left(2\frac L2\frac4{L^2}\right)
=\frac{2\mu}{L}\delta^2.
\end{aligned}
$$
$\tau_\delta=(\delta/a)^{3/2}<L/2$ とおきます。$|t|\le\tau_\delta$ では $\phi=1$、$a|t|^{2/3}\le\delta$ です。従って $t\ne0$ で
$$
\begin{aligned}
|r_\delta(t)|^2&=a^2|t|^{4/3}+\delta^2
\ge2a^2|t|^{4/3},\\
\frac1{|r_0(t)|}-\frac1{|r_\delta(t)|}
&\ge\left(1-\frac1{\sqrt2}\right)\frac1{a|t|^{2/3}}.
\end{aligned}
$$
それ以外でも $|r_\delta|\ge|r_0|$ なので、ポテンシャルは増えません。そこで
$$
\begin{aligned}
\int_{-L}^{L}
\left(\frac{\kappa}{|r_\delta|}-\frac{\kappa}{|r_0|}\right)dt
&\le-2\kappa\left(1-\frac1{\sqrt2}\right)
\int_0^{\tau_\delta}\frac{dt}{at^{2/3}}\\
&=-\frac{6\kappa}{a^{3/2}}
\left(1-\frac1{\sqrt2}\right)\delta^{1/2}.
\end{aligned}
$$
両方の差を足すと
$$
\mathcal B_L[r_\delta]-\mathcal B_L[r_0]
\le\frac{2\mu}{L}\delta^2
-\frac{6\kappa}{a^{3/2}}
\left(1-\frac1{\sqrt2}\right)\delta^{1/2}.
$$
右辺を $\delta^{1/2}>0$ で割った極限は負の定数なので、十分小さな $\delta$ で作用差は負です。$\square$
<!-- proof-end -->

この計算は、衝突路を避けて**同じ端点を結ぶ**という局所変形の核心を可視化しました。ただし、証明した対象は特定の二体衝突・再放出路です。一般の $n$ 体極小点には複数集団の同時衝突や複雑な衝突漸近があるため、この計算をそのまま一般定理の証明と呼ぶことはできません。

## 3. 固定端点最小点に対するMarchalの定理

$[a,b]$ 上の $H^1$ 曲線のうち、始点 $x$ と終点 $y$ が与えられた曲線全体で作用を最小化する問題を考えます。**区間内の全時刻で対称性を課す問題とは異なり、途中の変形方向は自由**です。ここで必要な一般結果は次の定理です。

<a id="thm-celev3-marchal"></a>
<!-- formal-statement-start -->
> **定理（Marchalの固定端点衝突排除定理：外部定理）**  
> $d\ge2$、$n\ge2$、$m_i>0$、$G>0$、$a<b$ とする。$q\in H^1([a,b];(\mathbb R^d)^n)$ が、同じ端点配置 $q(a),q(b)$ を持つ**すべての** $H^1$ 曲線の中で
$$
\int_a^b\left\{
\frac12\sum_{i=1}^n m_i|\dot q_i|^2
+G\sum_{i<j}\frac{m_im_j}{|q_i-q_j|}
\right\}dt
$$
> を最小化し、その最小値が有限なら、すべての $t\in(a,b)$ と $i\ne j$ に対し $q_i(t)\ne q_j(t)$ である。端点 $a,b$ の衝突排除はこの主張に含まない。
<!-- formal-statement-end -->

これは本章で完全証明を行わない**外部定理**です。根拠は Marchal (2002) の衝突回避論証、および Chenciner, *Action Minimizing Solutions of the Newtonian N-body Problem* (ICM 2002) の固定端点定理と証明です。参照先： [Chencinerの定理と証明（PDF）](https://perso.imcce.fr/alain-chenciner/ICM2002.pdf)、[Marchalの原論文（書誌・抄録）](https://doi.org/10.1023/A:1020128408706)。主な一般化の難所は、単純な二体衝突だけでなく多重衝突を扱うための拡大極限と局所変形です。これは前節の計算だけで済む操作ではありません。

二つの落とし穴があります。第一に、空間次元 $d=1$ では端点の順序を入れ替えるために衝突が強制され得ます。第二に、対称性や組み紐型を保持する曲線だけに制限された極小点は、**固定端点の全変分について最小**とは限りません。必要なのはMarchalの結論を唱えることでなく、この強い最小性を示すことです。

## 4. 半周期反転から自由な局所最小性へ

[CELEV2の半周期反転クラス](../CELEV2/index.md#def-celev2-halfturn)では
$$
q_i(t+T/2)=-q_i(t),\qquad
\sum_i m_iq_i(t)=0
$$
が成立します。短い区間 $I$ 上の曲線を変更するとき、$I+T/2$ 上も符号反転したコピーに変更すれば、半周期反転の制約を守れます。肝心なのは、その二つの区間が重ならない長さを選ぶことです。

まず重心を固定する変形と、固定しない変形の差を確認します。配置曲線 $p$ の質量重心
$$
c(t)=\frac1M\sum_i m_ip_i(t),\qquad M=\sum_i m_i
$$
を引き、$v_i=p_i-c$ とすると、$U(p)=U(v)$ です。また $\sum_i m_iv_i'=0$ なので
$$
\begin{aligned}
\sum_i m_i|p_i'|^2
&=\sum_i m_i|v_i'+c'|^2\\
&=\sum_i m_i|v_i'|^2
+2c'\cdot\sum_i m_iv_i'+M|c'|^2\\
&=\sum_i m_i|v_i'|^2+M|c'|^2.
\end{aligned}
$$
従って**重心を引く操作は作用を増やしません**。端点が重心零なら $c$ の端点値も零なので、端点を変えずにこの操作ができます。

<a id="prop-celev3-local-free-minimality"></a>
<!-- formal-statement-start -->
> **命題（半周期反転極小点の自由な局所最小性）**  
> $n\ge2$、$m_i,G,T>0$ とする。$q\in\mathcal X_T$ が[CELEV2のNewton拡張作用](../CELEV1/index.md#def-celev1-extended-action)の $\mathcal X_T$ 上の有限な大域最小点なら、周期延長した $q$ の任意の長さが $T/2$ 未満の閉区間 $I=[a,b]$ への制限 $q|_I$ は、同じ端点を持つ**全** $H^1(I;(\mathbb R^2)^n)$ 曲線に対するNewton作用の最小点である。
<!-- formal-statement-end -->

### 証明の見取り図

任意の端点固定競争曲線を重心零へ射影し、正規の許容曲線を作ります。それを $I$ と半周期ずれた区間 $J$ に対に貼り込みます。両区間の作用変化は等しいので、元のループの大域最小性が $I$ 上の自由な比較を制限します。

<!-- proof-start -->
### 証明

$q$ を $T$ 周期・半周期反転で実数全体へ延長しておきます。$I$ の長さ $b-a<T/2$ だから、$J=I+T/2$ は周期 $T$ の円周上で $I$ と交わりません（端点は周期同一視して解釈します）。

$q(a),q(b)$ と同じ端点を持つ任意の $p\in H^1(I;(\mathbb R^2)^n)$ を取ります。$c=M^{-1}\sum_i m_ip_i$ とし $v_i=p_i-c$ と置けば、$\sum_i m_iv_i=0$ です。端点で $q$ の重心は零だから $c(a)=c(b)=0$、従って $v(a)=q(a)$、$v(b)=q(b)$ です。上で計算した恒等式から
$$
\mathcal A_I[p]
=\mathcal A_I[v]+\frac M2\int_I|c'|^2dt
\ge \mathcal A_I[v]
$$
が成り立ちます。作用が無限の場合も、$p$ が有限ならこの等式は有限量について成立し、$p$ が無限なら必要な比較は自明です。

次に新たな周期曲線 $\widetilde q$ を、$I$ 上では $v$、$J$ 上では $\widetilde q(t)=-v(t-T/2)$ とし、他では元の $q$ のままとします。$I,J$ の端点で $v=q$、$q(t+T/2)=-q(t)$ なので、貼り合わせは連続し、各区間が $H^1$ だから全体も $H^1$ です。重心零と半周期反転も成り立ち、$\widetilde q\in\mathcal X_T$ です。

Newton作用の運動項は一斉符号反転と時間移動で不変であり、ポテンシャルも $U(-x)=U(x)$ です。従って、区間 $I$ と $J$ の変更による作用差はそれぞれ $\mathcal A_I[v]-\mathcal A_I[q]$ で、
$$
\mathcal A_T[\widetilde q]-\mathcal A_T[q]
=2\{\mathcal A_I[v]-\mathcal A_I[q]\}.
$$
$q$ は $\mathcal X_T$ 上の大域最小点なので左辺は非負です。よって
$$
\mathcal A_I[q]\le\mathcal A_I[v]\le\mathcal A_I[p].
$$
$p$ は端点以外に条件を課していない任意の競争曲線でした。これで自由な固定端点最小性が示されました。$\square$
<!-- proof-end -->

この証明の中心は、単に「対称な変分がある」という観察ではありません。**あらゆる局所競争曲線を**重心射影と対の貼り込みで許容集合へ持ち上げられることです。別の対称群では、この貼り込みが端点・他の区間・粒子置換条件と衝突する可能性があります。その場合に同じ証明を流用してはいけません。

## 5. 前章の極小点は衝突のない周期解である

<a id="thm-celev3-halfturn-collisionless"></a>
<!-- formal-statement-start -->
> **定理（半周期反転作用最小点の衝突排除とNewton周期解）**  
> $n\ge2$、平面内の質量 $m_i>0$、$G,T>0$ に対して、[半周期反転クラス](../CELEV2/index.md#def-celev2-halfturn) $\mathcal X_T$ 上のNewton拡張作用の最小点 $q_*$ を取る。このときすべての時刻 $t$ と相異なる粒子 $i,j$ について
$$
q_{*,i}(t)\ne q_{*,j}(t)
$$
> が成立する。さらに $q_*$ は $C^2$ 級で、Newtonの $n$ 体方程式を満たし、位置・速度とも $T$ 周期、重心は常に零であり、非定数である。
<!-- formal-statement-end -->

### 証明の見取り図

[CELEV2の存在定理](../CELEV2/index.md#thm-celev2-minimizer)が有限作用の最小点と非定数性を与えます。本章の局所最小性で、どの時刻も内部に含む小区間上では自由固定端点最小点です。そこでMarchalの定理を適用し、最後にCELEV2の非衝突極小点の正則性と速度接合定理へ戻ります。

<!-- proof-start -->
### 証明

[CELEV2の最小点存在定理](../CELEV2/index.md#thm-celev2-minimizer)から、$\mathcal X_T$ の作用の大域最小点 $q_*$ が存在し、有限作用かつ非定数です。任意の時刻 $t_0\in\mathbb R$ を固定し、$0<\varepsilon<T/4$ を選び $I=[t_0-\varepsilon,t_0+\varepsilon]$ とします。区間長は $2\varepsilon<T/2$ です。

[半周期反転極小点の局所最小性](#prop-celev3-local-free-minimality)により、$q_*|_I$ は端点固定の全 $H^1$ 曲線でNewton作用を最小化します。区間作用は非負で $\mathcal A_T[q_*]<\infty$ なので $\mathcal A_I[q_*]<\infty$ です。従って [Marchalの固定端点衝突排除定理](#thm-celev3-marchal)の条件は、空間次元 $d=2$、質量正、Newton指数 $\alpha=1$、$t_0\in\operatorname{int}I$ についてすべて満たされます。よって
$$
q_{*,i}(t_0)\ne q_{*,j}(t_0)
\qquad(i\ne j).
$$
$t_0$ は任意なので、全時刻で非衝突です。特に周期区間 $[0,T]$ でも非衝突です。ここでは定理が端点衝突を除外しない点を、毎回 $t_0$ を**区間の内部**に置くことで回避しました。

この非衝突性と $\mathcal X_T$ 上の最小性を [CELEV2のNewton周期解への昇格定理](../CELEV2/index.md#thm-celev2-conditional-newton)へ代入すると、$q_*\in C^2$、各粒子のNewton方程式、速度の周期接合が従います。位置の周期性と重心零は $\mathcal X_T$ の定義に含まれ、非定数性は存在定理から従います。$\square$
<!-- proof-end -->

こうして、前章で分離していた「最小点の存在」「非衝突」「Newton方程式」「周期端点での速度の接合」が接続されました。なお、得られた周期解の**最小周期がちょうど $T$ である**とは主張していません。対称性を満たす特定のクラスの存在であり、任意の対称群や任意の組み紐型の存在定理でもありません。

## 6. 変形が許されないと何が壊れるか

一次元で相対位置の端点を $r(-1)=-1$、$r(1)=1$ と固定すると、どの連続曲線も中間値の定理により途中で $r=0$ を通ります。しかも $r(t)=\operatorname{sgn}(t)|t|^{2/3}$ は有限Newton作用なので、端点条件と有限性を同時に満たす衝突曲線が作れます。平面では前節のような横方向の逃げ道がある一方、一次元ではそれを作れません。

対称拘束にも同じ問題が起こります。例えば鏡映軸上に位置を固定する条件を課しておきながら、軸外への変形をそのまま許してしまえば、比較対象が許容集合から外れます。したがって今後、半周期反転を超える対称作用原理へ拡張するときには、対称クラスの極小点が自由な固定端点最小性を持つか、代わりに衝突排除を保証する個別の仮定があるかを検査します。

## 7. 演習と詳細解答

### Level A

<a id="ex-celev3-a01"></a>
**A1. 衝突型の識別。** $q_1(t)=|t|^{2/3}e_1$、$q_2(t)=-|t|^{2/3}e_1$、$q_3(t)=2e_1$（$-1\le t\le1$）について $t=0$ の衝突型を判定せよ。$q_3(t)=0$ に変えた場合も判定せよ。

- Level: A

<!-- solution-start -->
### 詳細解答

元の配置では $q_1(0)=q_2(0)=0$、$q_3(0)=2e_1\ne0$ です。よって[本章の衝突型定義](#def-celev3-collision-types)に従い単純二体衝突です。変更後は $q_1(0)=q_2(0)=q_3(0)=0$ なので全衝突です。$n=3$ ではこの二つを区別でき、いずれも粒子間距離に関する判定です。
<!-- solution-end -->

<a id="ex-celev3-a02"></a>
**A2. 冪指数の選択。** $\alpha=1,3/2,2$ の各冪型ポテンシャルについて $r(t)=|t|^\beta e_1$ の運動項・ポテンシャル項が共に有限となる $\beta$ の範囲を求めよ。

- Level: A

<!-- solution-start -->
### 詳細解答

$\int_0^1|r'|^2dt=\beta^2\int_0^1t^{2\beta-2}dt$ は $\beta>1/2$ で有限、$\int_0^1|r|^{-\alpha}dt=\int_0^1t^{-\alpha\beta}dt$ は $\beta<1/\alpha$ で有限です。$\alpha=1$ は $1/2<\beta<1$、$\alpha=3/2$ は $1/2<\beta<2/3$、$\alpha=2$ は $1/2<\beta<1/2$ となり空集合です。最後は端点の等号でも対数発散するため解はありません。
<!-- solution-end -->

<a id="ex-celev3-a03"></a>
**A3. $2/3$ 冪の実積分。** $r(t)=a|t|^{2/3}e_1$（$a>0$、$-1\le t\le1$）について $\int_{-1}^1|r'|^2dt$ と $\int_{-1}^1|r|^{-1}dt$ を求めよ。

- Level: A

<!-- solution-start -->
### 詳細解答

$t\ne0$ で $|r'|^2=(4a^2/9)|t|^{-2/3}$ です。偶関数なので
$$
\int_{-1}^1|r'|^2dt
=\frac{8a^2}{9}\left[3t^{1/3}\right]_0^1
=\frac{8a^2}{3}.
$$
同様に
$$
\int_{-1}^1\frac{dt}{|r|}
=\frac2a\int_0^1t^{-2/3}dt
=\frac2a[3t^{1/3}]_0^1
=\frac6a.
$$
よって衝突時刻 $0$ があっても両方有限です。
<!-- solution-end -->

<a id="ex-celev3-a04"></a>
**A4. 重心射影の運動項。** $m_1=2,m_2=1$、$0\le t\le1$、$f(t)=t(1-t)$ とする。$p_1=(1+f)e_1$、$p_2=-2e_1$ の重心 $c$ と射影 $v_i=p_i-c$ を求め、運動項の減少量を計算せよ。

- Level: A

<!-- solution-start -->
### 詳細解答

$M=3$、$2p_1+p_2=2fe_1$ なので $c=(2/3)fe_1$ です。従って $v_1=(1+f/3)e_1$、$v_2=(-2-2f/3)e_1$ で重心は零です。$f(0)=f(1)=0$ だから端点は変わりません。運動項の差は
$$
\frac M2\int_0^1|c'|^2dt
=\frac32\frac49\int_0^1(1-2t)^2dt
=\frac23\left[1-2+\frac43\right]
=\frac29.
$$
ポテンシャルは相互距離 $|p_1-p_2|=|v_1-v_2|=3+f$ が同じなので不変です。
<!-- solution-end -->

<a id="ex-celev3-a05"></a>
**A5. 局所変形の上界。** $\mu=\kappa=a=1$、$L=2$、$\delta=1/4$ とし、本章の $r_\delta$ の作用差上界が負になることを確認せよ。

- Level: A

<!-- solution-start -->
### 詳細解答

$\tau_\delta=(\delta/a)^{3/2}=(1/4)^{3/2}=1/8<L/2=1$ です。[局所変形の命題](#prop-celev3-transverse-surgery)の証明中の上界へ代入すると
$$
\mathcal B_2[r_\delta]-\mathcal B_2[r_0]
\le\frac{2}{2}\left(\frac14\right)^2
-6\left(1-\frac1{\sqrt2}\right)\left(\frac14\right)^{1/2}
=\frac1{16}-3\left(1-\frac1{\sqrt2}\right).
$$
$1-1/\sqrt2>1/4$（$1/\sqrt2<3/4$）なので右辺は $1/16-3/4<0$ です。これは元の曲線がNewton方程式を満たすための $a$ の選択とは独立に成立する作用比較です。
<!-- solution-end -->

### Level B

<a id="ex-celev3-b01"></a>
**B1. 強い冪特異性の一般評価。** $r\in H^1([-1,1];\mathbb R^2)$、$r(0)=0$ とする。$\alpha=2$ のポテンシャルの積分が発散することを、$r'$ の $L^2$ ノルムとCauchy–Schwarz不等式だけから示せ。

- Level: B

<!-- solution-start -->
### 詳細解答

$C=\|r'\|_{L^2(-1,1)}$ と置きます。絶対連続性から $r(t)=\int_0^t r'(s)ds$ なので
$$
|r(t)|\le\int_{\min(0,t)}^{\max(0,t)}|r'(s)|ds
\le C|t|^{1/2}.
$$
$C=0$ なら $r\equiv0$ で積分は無限大です。$C>0$ なら $t\ne0$ で $|r(t)|^{-2}\ge C^{-2}|t|^{-1}$ となり、
$$
\int_{-1}^1|r(t)|^{-2}dt
\ge2C^{-2}\int_0^1t^{-1}dt=+\infty.
$$
ここでは曲線の具体的な形を仮定せず、すべての $H^1$ 衝突曲線を対象にしました。
<!-- solution-end -->

<a id="ex-celev3-b02"></a>
**B2. 対称な二重貼り込み。** $q\in\mathcal X_T$ と $I=[-T/8,T/8]$、$J=I+T/2$ を考える。$I$ 上で重心零、端点が $q$ と一致する試験曲線 $v$ を取る。$I$ では $v$、$J$ では $-v(t-T/2)$ に置換した $\widetilde q$ が $\mathcal X_T$ に入り、作用差が二区間分になる理由を示せ。

- Level: B

<!-- solution-start -->
### 詳細解答

$I$ の長さは $T/4<T/2$ なので、周期円周上で $I$ と $J$ は互いに重なりません。各区間の端点で $v=q$、対応する $J$ の端点では $-v=-q$ が元の $q(t+T/2)$ と一致するため、貼り合わせは連続です。有限個の $H^1$ 曲線を端点一致で貼れば全体も $H^1$ で、重心零も保ちます。置換区間は半周期ずれた点で互いに負となり、他の区間では元の反転条件が成立するので $\widetilde q\in\mathcal X_T$ です。時間移動と全粒子の符号反転で速度二乗、相互距離が不変ですから
$$
\mathcal A_T[\widetilde q]-\mathcal A_T[q]
=(\mathcal A_I[v]-\mathcal A_I[q])
+(\mathcal A_J[\widetilde q]-\mathcal A_J[q])
=2(\mathcal A_I[v]-\mathcal A_I[q]).
$$
ここで必要なのは「$v$ が元のループの対称性を単独で満たす」ことではなく、もう一方の区間へ反転コピーを貼ることです。
<!-- solution-end -->

<a id="ex-celev3-b03"></a>
**B3. 重心拘束を外す。** 端点の重心が零である区間上で、任意の競争曲線 $p$ からその重心 $c$ を引いた $v=p-c$ が同じ端点を持ち、Newton作用を増やさないことを全質量 $M$ で証明せよ。

- Level: B

<!-- solution-start -->
### 詳細解答

$c=M^{-1}\sum_i m_ip_i$ です。端点で $p=q$ かつ $q$ の重心が零なので $c(a)=c(b)=0$、従って $v(a)=p(a)$、$v(b)=p(b)$ です。$\sum_i m_iv_i=0$ を微分して $\sum_i m_iv_i'=0$、また $p_i'=v_i'+c'$ だから
$$
\sum_i m_i|p_i'|^2
=\sum_i m_i|v_i'|^2+2c'\cdot\sum_i m_iv_i'+\sum_i m_i|c'|^2
=\sum_i m_i|v_i'|^2+M|c'|^2.
$$
一斉平行移動では $p_i-p_j=v_i-v_j$ なので $U(p)=U(v)$ です。積分して
$$
\mathcal A_I[p]-\mathcal A_I[v]
=\frac M2\int_I|c'(t)|^2dt\ge0.
$$
有限作用の場合の恒等式であり、$p$ の作用が無限なら $\mathcal A_I[v]\le\mathcal A_I[p]$ は非負性から成立します。
<!-- solution-end -->

<a id="ex-celev3-b04"></a>
**B4. 一次元での反例。** 一次元相対位置 $r(-1)=-1$、$r(1)=1$ のすべての連続路が衝突する理由を述べ、$r(t)=\operatorname{sgn}(t)|t|^{2/3}$ が有限Newton作用を持つことを示せ。Marchalの定理を一次元に適用できない理由も説明せよ。

- Level: B

<!-- solution-start -->
### 詳細解答

連続関数の端点値は異符号なので、中間値の定理よりある $t_0\in(-1,1)$ で $r(t_0)=0$ です。提示された具体例は $r(0)=0$、$r(\pm1)=\pm1$ を満たします。$t\ne0$ で $|r'|=(2/3)|t|^{-1/3}$、$|r|=|t|^{2/3}$ なので
$$
\int_{-1}^1|r'|^2dt=\frac49\cdot2\cdot3=\frac83,\qquad
\int_{-1}^1|r|^{-1}dt=2\cdot3=6.
$$
両方有限です。しかし固定端点のどの競争曲線にも衝突があるので、二次元の横方向局所変形のような回避候補は一次元では作れません。[Marchalの定理](#thm-celev3-marchal)が $d\ge2$ を要求するのは本質的です。
<!-- solution-end -->

### Level C

<a id="ex-celev3-c01"></a>
**C1. 衝突排除から周期解への統合。** $n\ge2$、$m_i,G,T>0$ とし、$q_*\in\mathcal X_T$ はNewton拡張作用の最小点である。(i) $q_*$ の有限作用・非定数性を確保する既出結果を述べよ。(ii) 任意の時刻 $t_0$ を内点とする短区間で固定端点の自由最小性を示す際、重心補正と対称貼り込みが必要な理由を説明せよ。(iii) Marchalの定理の仮定を列挙して衝突排除を導け。(iv) Newton方程式と速度周期性を導き、この証明だけでは最小周期 $T$ を示せない理由を述べよ。

- Level: C

<!-- solution-start -->
### 詳細解答

(i) [CELEV2の最小点存在定理](../CELEV2/index.md#thm-celev2-minimizer)は半周期反転クラスで有限の非定数最小点を与えます。作用が有限なのは、非衝突の比較ループが存在して最小値がその有限値以下だからです。非定数性は反転する定数ループが全粒子零の衝突配置しかなく、その作用が無限大であることから従います。

(ii) $0<\varepsilon<T/4$、$I=[t_0-\varepsilon,t_0+\varepsilon]$ とします。$I$ 上で元の端点を保つ任意の競争曲線 $p$ は一般には重心零ではありません。重心 $c=M^{-1}\sum m_ip_i$ を引いた $v=p-c$ は端点不変・重心零で、[重心射影の作用恒等式](#prop-celev3-local-free-minimality)により $\mathcal A_I[v]\le\mathcal A_I[p]$ です。$v$ を $I$、その負の時間平行移動を $I+T/2$ に貼ると $\mathcal X_T$ の曲線になり、
$$
0\le\mathcal A_T[\widetilde q]-\mathcal A_T[q_*]
=2\{\mathcal A_I[v]-\mathcal A_I[q_*]\}.
$$
従って $\mathcal A_I[q_*]\le\mathcal A_I[v]\le\mathcal A_I[p]$ です。

(iii) [Marchalの固定端点定理](#thm-celev3-marchal)へは、次元 $d=2$、粒子数 $n\ge2$、正の質量・重力係数、Newtonの $1/r$ 相互作用、有限時間区間 $I$、有限作用の全 $H^1$ 端点固定最小性を代入します。$t_0$ は $I$ の内点なので衝突しません。$t_0$ を任意に動かすと $[0,T]$ の全時刻で全粒子対が非衝突です。

(iv) 非衝突を得たので、[CELEV2の非衝突最小点のNewton昇格定理](../CELEV2/index.md#thm-celev2-conditional-newton)が適用でき、$q_*\in C^2$、Newton方程式、位置・速度の周期境界条件を得ます。ただし「$T$ を周期に持つ」ことから「$T$ が最小の正周期である」ことは出ません。例えば $T$ の真の約数が周期なら、依然として $T$ 周期という条件を満たします。
<!-- solution-end -->

## 8. 次の章へ

固定端点の自由最小性は、衝突排除の強力な十分条件でした。[半周期反転クラス](../CELEV2/index.md#def-celev2-halfturn)では局所変形を反転コピーで貼れたため、この条件を満たせました。次は時間反転・回転・鏡映・粒子置換を組み合わせた、もっと一般の対称制約を扱います。その際は「対称な極小点」と「自由に変分できる極小点」を混同せず、どの方向の局所変形が実際に許されるかを一つずつ検査します。
