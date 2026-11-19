# PML1-06 無秩序・相転移を学習へ持ち込める条件は何か

学習データを固定した後で候補モデルを確率的に選ぶことと、データそのものを取り直すことは、別の操作である。[PML1-05 の容量比の境界](../PML1-05/index.md#cor-pml1-05-asymptotic)は、一般位置の入力と独立で公平なラベルを仮定したときの「線形分離できる確率」の極限だった。これは、何らかの自由エネルギーが非解析的になると証明したわけではない。

ここでは、標本の取り直しを物理学の「試料ごとの無秩序」に対応させる。まず有限の学習模型で平均の順序を比較し、次に**差が正でも相転移は起きない**反例を計算する。その上で、[SG1で証明されたREMの凍結転移](../../../物理系/SG/SG1/index.md#cor-sg1-freezing)を学習に持ち込んでよい条件を限定する。

本章の対数は自然対数、指数重みの尺度は $\beta\ge0$ とする。$\beta$ は逆温度になぞらえた設計パラメータであり、学習のエポック数・標本数・汎化性能と同じ量ではない。

## 1. 何を固定し、何について平均するのか

[PML1-02の有限損失Gibbs模型](../PML1-02/index.md#def-pml1-02-finite-loss-gibbs)では、候補の損失が既知なら重みを規格化できた。しかしデータを取り直せば損失表そのものが変わる。そこで、固定する側をデータ $D$、そのデータの下で重みを付ける候補を $\theta$ と区別する。

$N$ は規模を示す正整数で、必ずしも観測数そのものとは限らない。$\mathcal D_N$ は有限のデータ集合、$P_N(D)$ はその上の確率分布、$\Theta_N$ は有限で空でない候補集合とする。損失 $L_N(\theta;D)$ は有限の実数値とする。普通の経験損失なら非負に取るが、ここではエネルギーとの比較を可能にするため負値も許す。

<a id="def-pml1-06-random-loss"></a>

<!-- formal-statement-start -->
> **定義（固定標本のランダム損失Gibbs模型）**  
> $N\ge1$、有限集合 $\mathcal D_N,\Theta_N$（$\Theta_N\ne\varnothing$）、確率分布 $P_N$、実数値の $L_N:\Theta_N\times\mathcal D_N\to\mathbb R$、$\beta\ge0$ を与える。$P_N(D)>0$ の各 $D$ に対し、分配関数と条件付きGibbs重みを

$$
Z_N(D,\beta)=\sum_{\theta\in\Theta_N}e^{-\beta L_N(\theta;D)},
\qquad
\pi_{N,\beta}(\theta\mid D)
=\frac{e^{-\beta L_N(\theta;D)}}{Z_N(D,\beta)}
$$

> と定める。また標本規模で割った二種類の圧力を

$$
p_N^{\mathrm q}(\beta)=\frac1N\sum_D P_N(D)\log Z_N(D,\beta),
\qquad
p_N^{\mathrm a}(\beta)=\frac1N\log\sum_D P_N(D)Z_N(D,\beta)
$$

> とする。$D$ の和は $P_N(D)>0$ の台に限る。前者をquenched（標本を固定して対数を取る）、後者をannealed（標本について平均してから対数を取る）と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-06-random-loss -->
**定義の確認**： $N=1$、$\mathcal D_1=\{0,1\}$、$P_1(0)=P_1(1)=1/2$、$\Theta_1=\{a,b\}$ とし、$L_1(a;D)=0$、$L_1(b;D)=2D$ とする。候補・データ集合は有限、損失は非負で、$\beta=\log2>0$ のとき

$$
Z_1(0,\beta)=1+1=2,\qquad
Z_1(1,\beta)=1+e^{-2\log2}=\frac54.
$$

各 $Z_1$ は正で、$\pi(a\mid0)=\pi(b\mid0)=1/2$、$\pi(a\mid1)=4/5$、$\pi(b\mid1)=1/5$。したがって条件付き重みは確率分布となり、二種類の圧力も有限である。

$$
p_1^{\mathrm q}=\frac12\log2+\frac12\log\frac54
=\frac12\log\frac52,\qquad
p_1^{\mathrm a}=\log\frac{2+5/4}{2}=\log\frac{13}{8}.
$$

数値はそれぞれ約 $0.45815$、$0.48551$。一つのデータ集合の中で候補を平均することと、データ集合を取り直すことの違いが、既にこの二候補で現れる。
<!-- definition-example-end -->

上の二重の平均は、[SG1のquenched/annealed圧力の定義](../../../物理系/SG/SG1/index.md#def-sg1-quenched)へ、試料 $J\mapsto D$、配置 $\sigma\mapsto\theta$、エネルギー $H_N\mapsto L_N$ を代入したものである。ただし、標本の確率分布 $P_N$ と、候補上の条件付きGibbs重み $\pi_{N,\beta}(\cdot\mid D)$ を交換してはならない。

## 2. 平均の差はどの確率分布の距離になるか

[SG1のJensen比較](../../../物理系/SG/SG1/index.md#prop-sg1-jensen)から $p_N^{\mathrm q}\le p_N^{\mathrm a}$ が従う。しかし、学習データに対してこの差が何を測るかは、その不等式だけでは分からない。

データの発生確率 $P_N(D)$ に「そのデータでの分配関数」を掛けて規格化した確率分布を考える。この確率は**実際の学習データの発生法則を変更した仮想的な分布**であって、学習済みモデルが未知入力に出す予測結果の分布ではない。

<a id="def-pml1-06-tilted-data"></a>

<!-- formal-statement-start -->
> **定義（分配関数で傾けたデータ分布）**  
> [固定標本のランダム損失Gibbs模型](#def-pml1-06-random-loss)について、$m_N(\beta)=\sum_D P_N(D)Z_N(D,\beta)>0$ と置き、データ集合上の分布 $Q_{N,\beta}$ を

$$
Q_{N,\beta}(D)=\frac{P_N(D)Z_N(D,\beta)}{m_N(\beta)}
$$

> と定める。$P_N(D)=0$ の項は $Q_{N,\beta}(D)=0$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-06-tilted-data -->
**定義の確認**： 第1節の例では $m_1=13/8$ なので

$$
Q_{1,\beta}(0)=\frac{(1/2)2}{13/8}=\frac8{13},
\qquad
Q_{1,\beta}(1)=\frac{(1/2)(5/4)}{13/8}=\frac5{13}.
$$

両成分は非負で、和は $8/13+5/13=1$。さらに元の $P_1$ と $Q_1$ の台は同じ $\{0,1\}$ である。したがって $P_1(D)>0$ の各データで $Q_1(D)>0$ となり、これから使う対数比 $\log(P_1(D)/Q_1(D))$ は有限である。
<!-- definition-example-end -->

[INFO2の相対エントロピー](../../INFO/INFO2/index.md#def-info2-relative-entropy)は底2の対数を使う。以下ではそれに $\log2$ を掛けた自然対数版を

$$
D_{\mathrm{KL}}^{(e)}(P\Vert Q)
=\sum_{D:P(D)>0}P(D)\log\frac{P(D)}{Q(D)}
=(\log2)D(P\Vert Q)
$$

と書く。$P\Vert Q$ の順序は重要である。

<a id="prop-pml1-06-kl-gap"></a>

<!-- formal-statement-start -->
> **命題（quenched・annealed差のKL恒等式）**  
> [固定標本のランダム損失Gibbs模型](#def-pml1-06-random-loss)と[傾けたデータ分布](#def-pml1-06-tilted-data)について、任意の $N\ge1$、$\beta\ge0$ で

$$
p_N^{\mathrm a}(\beta)-p_N^{\mathrm q}(\beta)
=\frac1N D_{\mathrm{KL}}^{(e)}(P_N\Vert Q_{N,\beta})\ge0.
$$

> 等号成立は、$P_N$ の台上で $Z_N(D,\beta)$ が同じ定数であることと同値である。
<!-- formal-statement-end -->

### 証明の見取り図

$Q(D)/P(D)=Z(D)/m$ とおき、対数比を取れば $\log m-\log Z(D)$ になる。それを $P$ で平均すると圧力の差が出る。[INFO2のGibbs不等式](../../INFO/INFO2/index.md#thm-info2-gibbs)が符号と等号条件を決める。

<!-- proof-start -->
### 証明

$P_N(D)>0$ の各 $D$ について、$Z_N(D,\beta)>0$、$m_N>0$ より $Q_{N,\beta}(D)>0$。したがって二分布の台が一致して、相対エントロピーの各項は有限である。[分配関数で傾けたデータ分布](#def-pml1-06-tilted-data)から

$$
\frac{P_N(D)}{Q_{N,\beta}(D)}
=\frac{m_N(\beta)}{Z_N(D,\beta)},
\qquad
\log\frac{P_N(D)}{Q_{N,\beta}(D)}
=\log m_N(\beta)-\log Z_N(D,\beta).
$$

$P_N$ で平均し、$\sum_D P_N(D)=1$ を使えば

$$
\begin{aligned}
D_{\mathrm{KL}}^{(e)}(P_N\Vert Q_{N,\beta})
&=\sum_D P_N(D)\bigl(\log m_N-\log Z_N(D,\beta)\bigr)\\
&=\log m_N-\sum_D P_N(D)\log Z_N(D,\beta)\\
&=N\bigl(p_N^{\mathrm a}(\beta)-p_N^{\mathrm q}(\beta)\bigr).
\end{aligned}
$$

[INFO2のGibbs不等式と等号条件](../../INFO/INFO2/index.md#thm-info2-gibbs)は自然対数へ正数 $\log2$ を掛けても維持されるから、差は非負で、等号は $P_N=Q_{N,\beta}$ の場合に限る。$P_N(D)>0$ のすべての $D$ で $P_N(D)=P_N(D)Z_N(D,\beta)/m_N$ を整理すると $Z_N(D,\beta)=m_N$。逆に $Z_N$ が台上で定数なら $Q=P$ なので等号が成立する。
<!-- proof-end -->

**数値例で照合する。** 第1節の例では

$$
D_{\mathrm{KL}}^{(e)}(P_1\Vert Q_1)
=\frac12\log\frac{13}{16}+\frac12\log\frac{13}{10}
=\log\frac{13}{8}-\frac12\log\frac52
\approx0.02736.
$$

正の値は、$Q_1(0)=8/13\ne1/2$ からも予想できる。ただし、これは**未知データでの誤差を測る量ではない**。同一の学習アルゴリズムでも損失の標本依存性や基準の置き方が変われば、このKLは変わり得る。

## 3. 差が残っても「相転移」がない模型

有限の $\mathcal D_N,\Theta_N$ と有限損失では、各 $Z_N(D,\beta)$ は指数関数の有限和で正だから、$p_N^{\mathrm q}$ と $p_N^{\mathrm a}$ は有限の実数 $\beta$ に対して実解析的である。有限規模で曲線が急に見えても、それだけで非解析性を持つ相転移とは呼べない。

規模 $N$ を変えたときの**圧力の極限**がどう変わるかを調べる必要がある。ただし極限の存在も、極限と微分の交換も自動ではない。

<a id="def-pml1-06-transition-test"></a>

<!-- formal-statement-start -->
> **定義（極限圧力に基づく相転移判定）**  
> 各 $N$ について[固定標本のランダム損失Gibbs模型](#def-pml1-06-random-loss)が与えられ、開区間 $I\subset(0,\infty)$ 上の各 $\beta$ で有限な極限

$$
p(\beta)=\lim_{N\to\infty}p_N^{\mathrm q}(\beta)
$$

> が存在すると仮定する。$p$ が $I$ 内のある点 $\beta_{\mathrm c}$ で実解析的でないとき、本章では極限圧力に相転移の非解析性があるという。特に、点の左右で二階微分可能で、二階導関数の左右極限が異なるとき、その点で二階微分可能ではないため実解析的でもない。有限 $N$ の $p_N^{\mathrm q}$ が滑らかなことと混同しない。
<!-- formal-statement-end -->

ここでは「相転移」を非解析性で判定する。ある汎化誤差が突然悪くなることや、[PML1-05の分離確率の閾値](../PML1-05/index.md#cor-pml1-05-asymptotic)は、それ自体ではこの定義の前提・結論を満たさない。

次に、各データが一つの二値パラメータに局所的な損失を与えるだけの模型を構成する。複数の場所を独立に並べると、標本を固定した分配関数は積になる。

<a id="prop-pml1-06-product"></a>

<!-- formal-statement-start -->
> **命題（独立な局所損失模型には凍結転移がない）**  
> $N\ge1$、$\Theta_N=\{0,1\}^N$、$D=(J_1,\dots,J_N)\in\{0,1\}^N$ とし、$J_i$ は互いに独立で $P(J_i=0)=P(J_i=1)=1/2$ とする。損失を

$$
L_N(\theta;D)=2\sum_{i=1}^N J_i\theta_i
$$

> と定める。このとき任意の $\beta\ge0$ で

$$
p_N^{\mathrm q}(\beta)=\frac12\log2+\frac12\log(1+e^{-2\beta}),
\qquad
p_N^{\mathrm a}(\beta)=\log\frac{3+e^{-2\beta}}2.
$$

> 両者は $N$ に依存せず、$\beta>0$ では $p_N^{\mathrm a}>p_N^{\mathrm q}$ だが、極限圧力 $p=p_N^{\mathrm q}$ は $(0,\infty)$ 全域で実解析的である。
<!-- formal-statement-end -->

### 証明の見取り図

和の指数が座標ごとの積へ分かれることを利用する。quenched平均では積の対数を先に取り、annealed平均では独立な $J_i$ の平均を座標ごとに取る。$N$ がいくら大きくても一座標の式が残るため、真の非解析性は現れない。

<!-- proof-start -->
### 証明

固定した $D$ について $L_N$ は各座標の和なので、$e^{-\beta L_N(\theta;D)}=\prod_i e^{-2\beta J_i\theta_i}$。有限和を分配すると

$$
\begin{aligned}
Z_N(D,\beta)
&=\sum_{\theta_1=0}^1\cdots\sum_{\theta_N=0}^1
 \prod_{i=1}^N e^{-2\beta J_i\theta_i}\\
&=\prod_{i=1}^N\sum_{\theta_i=0}^1 e^{-2\beta J_i\theta_i}
=\prod_{i=1}^N(1+e^{-2\beta J_i}).
\end{aligned}
$$

対数を取れば $\log Z_N=\sum_i\log(1+e^{-2\beta J_i})$。$J_i=0$ なら一項は $\log2$、$J_i=1$ なら $\log(1+e^{-2\beta})$ だから

$$
\frac1N\mathbb E_D\log Z_N
=\frac1N\sum_{i=1}^N
\left[\frac12\log2+\frac12\log(1+e^{-2\beta})\right]
=\frac12\log2+\frac12\log(1+e^{-2\beta}).
$$

一方 $J_i$ の独立性によって

$$
\begin{aligned}
\mathbb E_D Z_N
&=\prod_{i=1}^N\mathbb E_{J_i}(1+e^{-2\beta J_i})\\
&=\prod_{i=1}^N
\left[\frac12(1+1)+\frac12(1+e^{-2\beta})\right]\\
&=\left(\frac{3+e^{-2\beta}}2\right)^N.
\end{aligned}
$$

これの対数を $N$ で割ってannealedの式を得る。$\beta>0$ では $1+e^{-2\beta}<2$ なので、$D$ により $Z_N(D,\beta)$ は異なる。従って[KL恒等式の等号条件](#prop-pml1-06-kl-gap)から差は厳密に正である。

各式の対数の中身は $\beta\in\mathbb R$ でも正の実解析関数であり、$\log$ との合成も実解析的。極限は全 $N$ で同じ $p_N^{\mathrm q}$ であるから、$(0,\infty)$ に非解析点はない。
<!-- proof-end -->

<!-- definition-example-start: def-pml1-06-transition-test -->
**定義の確認**： $N=2$、$J=(0,1)$、$\beta=\log2$ なら四候補 $\theta=(0,0),(0,1),(1,0),(1,1)$ の損失は $0,2,0,2$。よって

$$
Z_2=1+\frac14+1+\frac14=\frac52
=2\left(1+e^{-2\log2}\right).
$$

一方、[命題の極限式](#prop-pml1-06-product)は全 $N$ に共通で、$\beta>0$ のどの点でも滑らかである。これは「quenchedとannealedの間に正の差がある」という条件を満たしながら、[極限圧力の判定](#def-pml1-06-transition-test)では相転移を持たない、直接的な反例である。
<!-- definition-example-end -->

## 4. REMの凍結転移を学習模型として読める条件

[SG1のRandom Energy Modelの定義](../../../物理系/SG/SG1/index.md#def-sg1-rem)では、$\Theta_N=\{-1,+1\}^N$ の $2^N$ 個の配置に、**互いに独立で平均0・分散 $N$ の正規エネルギー** $H_N(\theta)$ を置く。通常の訓練データから求めた経験損失にこの独立性や正規分布が自動で備わることはない。

以下ではデータ $D$ を $2^N$ 個の正規エネルギーの全配列と解釈する。この場合 $\mathcal D_N$ は連続値なので、第1節の有限データ集合の定義の形式からは外れる。期待値の存在を確かめるため、$M_N(D)=\max_{\theta\in\Theta_N}|L_N(\theta;D)|$ と置く。$\beta\ge0$ では各指数重みが $e^{-\beta M_N}\le e^{-\beta L_N(\theta;D)}\le e^{\beta M_N}$ を満たすので、候補数 $2^N$ を掛けて対数を取ると

$$
N\log2-\beta M_N\le \log Z_N(D,\beta)
\le N\log2+\beta M_N.
$$

各 $N$ で損失は有限個の正規確率変数なので、$\mathbb E M_N\le\sum_{\theta\in\Theta_N}\mathbb E|L_N(\theta;D)|<\infty$ となり、上の評価から $\mathbb E|\log Z_N|<\infty$ が従う。また[SG1のREMの正規指数モーメントの計算](../../../物理系/SG/SG1/index.md#prop-sg1-annealed-rem)より $\mathbb EZ_N=2^Ne^{N\beta^2/2}<\infty$。従って SG1 の確率空間と期待値の定式化をそのまま適用できる。ここでは新しい一般定理を主張せず、既証明のREMについてだけ結論を引用する。

<a id="prop-pml1-06-rem-application"></a>

<!-- formal-statement-start -->
> **命題（独立Gaussian損失模型での凍結判定）**  
> 各 $N\ge1$ に対して $2^N$ 個の損失 $L_N(\theta;D)$（$\theta\in\{-1,+1\}^N$）が独立で、すべて平均0、分散 $N$ の正規分布に従うとする。$\beta\ge0$ を固定し、分配関数 $Z_N=\sum_\theta e^{-\beta L_N(\theta;D)}$ に対するquenched圧力を $N^{-1}\mathbb E_D\log Z_N$、annealed圧力を $N^{-1}\log\mathbb E_D Z_N$ とする。このとき $a=\sqrt{2\log2}$ に対して

$$
\lim_{N\to\infty}p_N^{\mathrm q}(\beta)
=\begin{cases}
\log2+\beta^2/2,&0\le\beta\le a,\\
a\beta,&\beta\ge a,
\end{cases}
\qquad
p_N^{\mathrm a}(\beta)=\log2+\beta^2/2.
$$

> 極限quenched圧力は $\beta=a$ で一階微分可能だが二階微分可能ではなく、二階導関数の左右極限はそれぞれ $1$ と $0$ である。二圧力の極限差は $\beta\le a$ で0、$\beta>a$ で $(\beta-a)^2/2$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

仮定を配列の添字・分散の規模まで照合すると、この模型は[SG1のREM](../../../物理系/SG/SG1/index.md#def-sg1-rem)と同じ確率法則を持つ。したがって[SG1の圧力極限定理](../../../物理系/SG/SG1/index.md#thm-sg1-pressure)と[凍結転移の系](../../../物理系/SG/SG1/index.md#cor-sg1-freezing)を適用できる。学習データがこの法則に従わない場合、結論を転用してはならない。

<!-- proof-start -->
### 証明

$D=(L_N(\theta;D))_{\theta\in\Theta_N}$ と読み替える。候補数 $|\Theta_N|=2^N$、各損失の分布が $N(0,N)$、候補間の独立性という三条件は、[SG1のREMの定義](../../../物理系/SG/SG1/index.md#def-sg1-rem)と一致する。

ここで、各試料のランダム圧力を

$$
R_N(\beta,D)=\frac1N\log Z_N(D,\beta)
$$

と書く。これは[SG1のランダム圧力](../../../物理系/SG/SG1/index.md#def-sg1-quenched)に対応するが、本章のデータ分布 $P_N(D)$ と区別する。

上で確認した三条件のもとで、[REMのquenched圧力極限](../../../物理系/SG/SG1/index.md#thm-sg1-pressure)を適用できる。各 $\beta$ を固定すると $R_N$ は確率収束し、その期待値 $p_N^{\mathrm q}=\mathbb E_D R_N$ も同じ極限を持つ。また、[REMのannealed圧力](../../../物理系/SG/SG1/index.md#prop-sg1-annealed-rem)から $p_N^{\mathrm a}=\log2+\beta^2/2$ となる。

極限関数 $p(\beta)$ 自体を $\beta$ で微分する。有限 $N$ での微分と極限を交換する操作は用いない。凍結の臨界逆温度 $a$ を除いて微分すると

$$
p'(\beta)=
\begin{cases}
\beta,&0<\beta<a,\\
a,&\beta>a,
\end{cases}
\qquad
p''(\beta)=
\begin{cases}
1,&0<\beta<a,\\
0,&\beta>a.
\end{cases}
$$

$p(a)=\log2+a^2/2=a^2$ は左右の式と一致する。一階導関数の左右極限はともに $a$ なので $p'(a)=a$ が存在する。一方、二階導関数の左右極限はそれぞれ $1$ と $0$ で一致せず、$p''(a)$ は存在しない。差の式も

$$
\left(\log2+\frac{\beta^2}{2}\right)-a\beta
=\frac{a^2}{2}+\frac{\beta^2}{2}-a\beta
=\frac{(\beta-a)^2}{2}
$$

となり、$\beta>a$ のみで正になる。これらの領域分けは[SG1の凍結転移の系](../../../物理系/SG/SG1/index.md#cor-sg1-freezing)と一致する。
<!-- proof-end -->

**どこまで学習の主張か。** REMで証明したのは、指定したランダムエネルギー配列と指数重みの圧力の極限である。データから得られる損失は候補間で同じ標本を共有するため、独立性が壊れやすい。候補数が指数的でない、分散が $N$ に比例しない、損失の共通移動がデータによって変わる場合も、計算は変わり得る。また、$p$ の非解析性だけで**推定器の汎化誤差、予測精度、最適化時間**を特定することはできない。

## 5. 損失の共通移動で見かけの「圧力差」が変わる

[PML1-04の状態に依存しないエネルギー移動](../PML1-04/index.md#prop-pml1-04-gauge)は、同じデータの下で全候補の損失に定数を足しても条件付きGibbs確率が不変であると教えた。しかし、その「定数」がデータ $D$ に依存すると、**データ間の分配関数の大小**が変わる。したがってannealed・quenchedの差は不変とは限らない。

<a id="prop-pml1-06-sample-shift"></a>

<!-- formal-statement-start -->
> **命題（標本依存の共通損失移動）**  
> 第1節の有限模型で任意の実数値 $C_N(D)$ を定め、すべての候補について $L_N'(\theta;D)=L_N(\theta;D)+C_N(D)$ とする。すると各データ $D$ における条件付きGibbs分布は不変だが、

$$
Z'_N(D,\beta)=e^{-\beta C_N(D)}Z_N(D,\beta),
\qquad
p_N^{\mathrm q\,\prime}
=p_N^{\mathrm q}-\frac{\beta}{N}\mathbb E_D C_N(D),
$$

> であり、annealed圧力は

$$
p_N^{\mathrm a\,\prime}
=\frac1N\log\mathbb E_D\!\left[e^{-\beta C_N(D)}Z_N(D,\beta)\right]
$$

> となる。特にデータ依存の移動では、二圧力の差が保存されるとは限らない。
<!-- formal-statement-end -->

### 証明の見取り図

標本ごとに共通因子 $e^{-\beta C_N(D)}$ をくくり、候補間の規格化では打ち消されることを確かめる。その後、標本全体の平均ではこの因子を外へ出せないことに注意する。

<!-- proof-start -->
### 証明

損失の定義を代入すると

$$
\begin{aligned}
Z'_N(D,\beta)
&=\sum_{\theta}e^{-\beta(L_N(\theta;D)+C_N(D))}\\
&=e^{-\beta C_N(D)}
\sum_\theta e^{-\beta L_N(\theta;D)}
=e^{-\beta C_N(D)}Z_N(D,\beta).
\end{aligned}
$$

候補 $\theta$ の条件付き確率の分子・分母をそれぞれこの式に置き換えると、同じ因子が約分され $\pi'_{N,\beta}(\theta\mid D)=\pi_{N,\beta}(\theta\mid D)$。quenched圧力については

$$
\begin{aligned}
\frac1N\mathbb E_D\log Z'_N
&=\frac1N\mathbb E_D
 \bigl[-\beta C_N(D)+\log Z_N(D,\beta)\bigr]\\
&=p_N^{\mathrm q}-\frac{\beta}{N}\mathbb E_D C_N(D).
\end{aligned}
$$

annealed圧力については $\log\mathbb E_D Z'_N$ を直接代入するほかなく、$C_N(D)$ が標本に依存する場合に一般に $\mathbb E_D[e^{-\beta C_N}Z_N]=e^{-\beta\mathbb E_D C_N}\mathbb E_D Z_N$ とすることはできない。
<!-- proof-end -->

**極端だが重要な反例。** 候補が一つだけの $\Theta_N=\{\theta_0\}$ とし、$\mathcal D_N=\{-1,+1\}$、二つのデータは各確率 $1/2$、$L_N(\theta_0;J)=NJ$ とする。条件付きGibbs分布は全試料・全 $\beta$ で $\pi(\theta_0\mid J)=1$ なので、学習上の候補選択は全く変わらない。しかし

$$
Z_N(J,\beta)=e^{-\beta NJ},\quad
p_N^{\mathrm q}=0,\quad
p_N^{\mathrm a}=\frac1N\log\cosh(\beta N).
$$

$\beta>0$ なら

$$
\frac1N\log\cosh(\beta N)
=\beta+\frac1N\log\left(\frac{1+e^{-2\beta N}}2\right)
\longrightarrow\beta.
$$

したがって圧力差は極限でも $\beta$ と正だが、quenched極限 $p(\beta)=0$ は滑らかで、候補選択は初めから唯一である。**標本依存の共通基準を固定しない圧力差を、学習の難しさの指標と見なすのは危険**である。

## 6. 転用する前の検査表

無秩序・相転移という言葉を学習に持ち込むには、少なくとも次の問いに答える必要がある。

1. **二つの確率法則を分けたか。** データの法則 $P_N$ と、固定データの下の候補のGibbs確率 $\pi_{N,\beta}$ は別物か。
2. **系の規模を指定したか。** $N$、候補数 $|\Theta_N|$、損失の典型的な大きさ、揺らぎの分散を同時にどう変えるか。
3. **極限と成立条件を示したか。** $p_N^{\mathrm q}$ の収束の意味は何か。極限が非解析的であることを実際に確かめたか。
4. **模型の依存構造を確認したか。** REMの「配置ごとの独立Gaussian損失」を通常の共有データによる相関損失へ無条件に移していないか。
5. **評価対象を区別したか。** 自由エネルギー、候補の選択、学習計算量、訓練誤差、未知データでの汎化誤差は同じ指標ではない。

以上を踏まえると、[PML1-05の容量境界](../PML1-05/index.md#cor-pml1-05-asymptotic)の「2」と、[SG1のREM凍結点](../../../物理系/SG/SG1/index.md#def-sg1-freezing)の $\sqrt{2\log2}$ は、別の確率実験・別の制御パラメータ・別の極限で生まれた数値であり、相互に代入することはできない。

## 演習

### PML1-06-A01 二つの標本で対数平均を比べる
- Level: A

$\mathcal D=\{0,1\}$ を公平に抽出し、$\Theta=\{a,b\}$、$L(a;D)=0$、$L(b;D)=2D$、$N=1$、$\beta=\log2$ とする。二つの $Z(D)$、$p^{\mathrm q}$、$p^{\mathrm a}$ と差を求めよ。

<!-- solution-start -->
#### 詳細解答

固定データ $D=0$ では二候補とも損失0なので $Z(0)=1+1=2$。$D=1$ では損失0と2なので

$$
Z(1)=1+e^{-2\log2}=1+\frac14=\frac54.
$$

標本は各確率 $1/2$ だから

$$
p^{\mathrm q}=\frac12\log2+\frac12\log\frac54=\frac12\log\frac52,
\qquad
p^{\mathrm a}=\log\left(\frac12\cdot2+\frac12\cdot\frac54\right)
=\log\frac{13}{8}.
$$

差は $\log(13/8)-\tfrac12\log(5/2)\approx0.02736>0$。$Z$ が二標本で異なるため、[KL恒等式の等号条件](#prop-pml1-06-kl-gap)により不等号は厳密である。
<!-- solution-end -->

### PML1-06-A02 傾けたデータ分布の台と規格化
- Level: A

A01と同じ模型で $Q(D)=P(D)Z(D)/\mathbb EZ$ を求め、和が1、台が元の $P$ と一致することを確認せよ。

<!-- solution-start -->
#### 詳細解答

$\mathbb EZ=(2+5/4)/2=13/8$。定義から

$$
Q(0)=\frac{(1/2)\cdot2}{13/8}=\frac8{13},
\quad
Q(1)=\frac{(1/2)\cdot(5/4)}{13/8}=\frac5{13}.
$$

両方とも正、和は $(8+5)/13=1$。$P(0)=P(1)=1/2>0$ であり、$Q(0),Q(1)>0$ だから双方の台は $\{0,1\}$。従って[INFO2の相対エントロピーの定義](../../INFO/INFO2/index.md#def-info2-relative-entropy)の台の包含条件も成立する。
<!-- solution-end -->

### PML1-06-A03 二座標の局所損失を列挙する
- Level: A

$N=2$、$\Theta_2=\{0,1\}^2$、$D=(J_1,J_2)=(0,1)$、$L_2(\theta;D)=2(J_1\theta_1+J_2\theta_2)$、$\beta=\log2$ のとき四候補の損失を列挙し、$Z_2$ を直接求めよ。

<!-- solution-start -->
#### 詳細解答

$\theta=(0,0),(0,1),(1,0),(1,1)$ に対する損失は順に $0,2,0,2$。各指数重みは $1,1/4,1,1/4$ だから

$$
Z_2=1+\frac14+1+\frac14=\frac52.
$$

座標ごとに和を分配しても

$$
(1+e^{-2\beta J_1})(1+e^{-2\beta J_2})
=(1+1)\left(1+\frac14\right)=\frac52
$$

で一致する。ここで分配関数は固定した $D$ の下の候補の和であり、まだ $D$ に関する平均は取っていない。
<!-- solution-end -->

### PML1-06-A04 等号が成立する場合
- Level: A

$\mathcal D=\{u,v\}$、$P(u)=1/3$、$P(v)=2/3$、$\Theta=\{a,b\}$、$L(a;u)=L(a;v)=0$、$L(b;u)=L(b;v)=c\in\mathbb R$ とする。任意の $\beta\ge0$ で $p^{\mathrm q}=p^{\mathrm a}$ を示せ。$N=1$ とする。

<!-- solution-start -->
#### 詳細解答

各データの分配関数は共通に $Z(u)=Z(v)=1+e^{-\beta c}=:z>0$。従って

$$
p^{\mathrm q}=\frac13\log z+\frac23\log z=\log z,
\quad
p^{\mathrm a}=\log\left(\frac13 z+\frac23 z\right)=\log z.
$$

[傾けたデータ分布の定義](#def-pml1-06-tilted-data)では $Q(u)=P(u)z/z=P(u)$、$Q(v)=P(v)$。従って[KL恒等式](#prop-pml1-06-kl-gap)の右辺も0。候補が二つあること自体は差の正値性を保証しない。
<!-- solution-end -->

### PML1-06-A05 極限圧力を微分する
- Level: A

[局所損失模型の極限圧力](#prop-pml1-06-product)について $p'(0)$ を右微分で求めよ。さらに $\beta\to\infty$ における $p(\beta)$ の極限を求めよ。

<!-- solution-start -->
#### 詳細解答

$$
p(\beta)=\frac12\log2+\frac12\log(1+e^{-2\beta}).
$$

$\log(1+e^{-2\beta})$ を連鎖律で微分し、外側の導関数を $1/(1+e^{-2\beta})$、内側を $-2e^{-2\beta}$ とすると

$$
p'(\beta)=\frac12\frac{-2e^{-2\beta}}{1+e^{-2\beta}}
=-\frac{1}{1+e^{2\beta}},
\quad p'(0+)=-\frac12.
$$

$\beta\to\infty$ では $e^{-2\beta}\to0$、$\log(1+e^{-2\beta})\to0$ なので $p(\beta)\to(\log2)/2$。どちらの極限操作も明示された一変数関数に対して行っており、未証明の「極限と微分の交換」を使っていない。
<!-- solution-end -->

### PML1-06-B01 KL恒等式を別の記号で証明する
- Level: B

有限データ $D\in\{d_1,\dots,d_k\}$ が正の確率 $r_i$ で発生し、各分配関数が $z_i>0$ とする。$q_i=r_i z_i/\sum_j r_j z_j$ が確率分布であることを示し、自然対数の $D_{\mathrm{KL}}^{(e)}(r\Vert q)=\log(\sum_i r_i z_i)-\sum_i r_i\log z_i$ を導け。等号条件も示せ。

<!-- solution-start -->
#### 詳細解答

$m=\sum_j r_j z_j$ は正で、$q_i=r_i z_i/m>0$。また $\sum_i q_i=(\sum_i r_i z_i)/m=1$ だから確率分布である。$\sum_i r_i=1$ を使って

$$
\begin{aligned}
D_{\mathrm{KL}}^{(e)}(r\Vert q)
&=\sum_i r_i\log\frac{r_i}{r_i z_i/m}\\
&=\sum_i r_i(\log m-\log z_i)
=\log m-\sum_i r_i\log z_i.
\end{aligned}
$$

[INFO2のGibbs不等式](../../INFO/INFO2/index.md#thm-info2-gibbs)の底を自然対数へ換えるとこの値は非負。等号なら $q_i=r_i$ が全 $i$ に成り立つ。$r_i>0$ だから $z_i/m=1$、つまりすべての $z_i$ が同じ値となる。逆に $z_i$ が一定なら $q=r$ となり等号である。
<!-- solution-end -->

### PML1-06-B02 典型標本への集中と平均順序の差
- Level: B

[局所損失模型](#prop-pml1-06-product)で $R_N(D)=N^{-1}\log Z_N(D,\beta)$ とし、$\beta\ge0$ は固定する。$\operatorname{Var}(R_N)$ を求め、任意の $\varepsilon>0$ で $\mathbb P(|R_N-p_N^{\mathrm q}|\ge\varepsilon)\to0$ を証明せよ。この収束から $p_N^{\mathrm a}-p_N^{\mathrm q}\to0$ と結論できるか。

<!-- solution-start -->
#### 詳細解答

$X_i=\log(1+e^{-2\beta J_i})$ とおけば $R_N=N^{-1}\sum_i X_i$。各 $X_i$ は互いに独立で、確率 $1/2$ ずつ $a_0=\log2$ と $a_1=\log(1+e^{-2\beta})$ を取る。平均は $\mu=(a_0+a_1)/2$、分散は

$$
\operatorname{Var}(X_i)
=\frac12(a_0-\mu)^2+\frac12(a_1-\mu)^2
=\frac{(a_0-a_1)^2}{4}.
$$

独立性により共分散項は0となり、

$$
\operatorname{Var}(R_N)
=\frac1{N^2}\sum_{i=1}^N\operatorname{Var}(X_i)
=\frac{(a_0-a_1)^2}{4N}.
$$

平方偏差の非負性から得られる[Chebyshev不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-chebyshev)を $R_N$ に適用すると

$$
\mathbb P(|R_N-\mu|\ge\varepsilon)
\le\frac{(a_0-a_1)^2}{4N\varepsilon^2}\to0.
$$

$\mu=p_N^{\mathrm q}$ だから確率収束する。一方[局所損失模型の命題](#prop-pml1-06-product)では $\beta>0$ で $p_N^{\mathrm a}-p_N^{\mathrm q}$ は $N$ に依存しない正数である。**典型標本における $N^{-1}\log Z_N$ の集中**と、分配関数を先に平均したときの値は別なので、差が0へ向かうとは結論できない。
<!-- solution-end -->

### PML1-06-B03 共通損失移動の影響を調べる
- Level: B

候補が一つ $\Theta_N=\{\theta_0\}$、$J\in\{-1,+1\}$ が公平、$L_N(\theta_0;J)=NJ$ とする。$p_N^{\mathrm q}$ と $p_N^{\mathrm a}$ を求め、$\beta>0$ 固定で極限を計算せよ。条件付きGibbs分布が変わらない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

候補は一つだから $Z_N(J)=e^{-\beta NJ}$、$\pi(\theta_0\mid J)=Z_N(J)/Z_N(J)=1$。一方 $\mathbb EJ=0$ より

$$
p_N^{\mathrm q}=\frac1N\mathbb E(-\beta NJ)=-\beta\mathbb EJ=0.
$$

$J=\pm1$ の両値を平均して

$$
\mathbb EZ_N=\frac{e^{-\beta N}+e^{\beta N}}2=\cosh(\beta N),
\quad
p_N^{\mathrm a}=\frac1N\log\cosh(\beta N).
$$

$\beta>0$ なら $\cosh(\beta N)=\tfrac12e^{\beta N}(1+e^{-2\beta N})$ なので

$$
p_N^{\mathrm a}
=\beta+\frac{\log(1+e^{-2\beta N})-\log2}{N}\to\beta.
$$

従って極限の差は $\beta>0$。条件付きGibbs分布は全標本でただ一点に質量1を置いており、差の存在は候補選択の難しさを表さない。
<!-- solution-end -->

### PML1-06-B04 REMの境界を導出する
- Level: B

[SG1のREM圧力極限定理](../../../物理系/SG/SG1/index.md#thm-sg1-pressure)で $a=\sqrt{2\log2}$ とする。極限の二階導関数の左右極限と、$\beta>a$ でのannealedとの差を計算せよ。何を仮定しているからREMへ適用できるかも答えよ。

<!-- solution-start -->
#### 詳細解答

[SG1の定理](../../../物理系/SG/SG1/index.md#thm-sg1-pressure)の仮定は、$2^N$ 個のエネルギーが候補間で独立かつ同じ $N(0,N)$ に従うことである。そのとき極限quenched圧力は

$$
p(\beta)=\begin{cases}\log2+\beta^2/2,&\beta\le a,\\a\beta,&\beta\ge a.\end{cases}
$$

$\beta<a$ では $p'(\beta)=\beta$、$p''(\beta)=1$。$\beta>a$ では $p'(\beta)=a$、$p''(\beta)=0$。従って $\beta=a$ で一階微分は左右一致するが、二階微分の左右極限はそれぞれ $1$ と $0$ で一致せず、[相転移判定の定義](#def-pml1-06-transition-test)を満たす。

[SG1のannealed圧力](../../../物理系/SG/SG1/index.md#prop-sg1-annealed-rem)は $\log2+\beta^2/2$ なので、$\beta>a$ では

$$
p^{\mathrm a}-p
=\log2+\frac{\beta^2}{2}-a\beta
=\frac{\beta^2-2a\beta+a^2}{2}
=\frac{(\beta-a)^2}{2}>0.
$$

一般の学習データでは候補間の損失が同じデータを共有して相関するため、この独立Gaussian仮定を確かめずに結論だけを移すことはできない。
<!-- solution-end -->

### PML1-06-C01 三模型の「転移らしさ」を切り分ける
- Level: C

次の三模型を比較する。

(i) $\Theta_N=\{0,1\}^N$、$J_i$ は独立で公平な $\{0,1\}$ 値、$L_N=2\sum_iJ_i\theta_i$。

(ii) $\Theta_N$ は一候補のみ、$J=\pm1$ は公平、$L_N=NJ$。

(iii) $\Theta_N=\{-1,+1\}^N$、$2^N$ 個の $L_N(\theta)$ は互いに独立な $N(0,N)$。

各模型について、(a) $p_N^{\mathrm q}$ と $p_N^{\mathrm a}$ またはその極限を明示し、(b) 正の $\beta$ における極限quenched圧力の非解析性を判定し、(c) その結果から未知データへの汎化性能を断言できない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

**(i) 独立な局所損失。** [積模型の命題](#prop-pml1-06-product)によって

$$
p_N^{\mathrm q}=\frac12\log2+\frac12\log(1+e^{-2\beta}),
\quad
p_N^{\mathrm a}=\log\frac{3+e^{-2\beta}}2.
$$

$\beta>0$ で差は正だが、前者は $N$ に依存せず実解析的である。従って極限の非解析性はない。

**(ii) 一候補の共通移動。** $\mathbb EJ=0$ なので $p_N^{\mathrm q}=0$。また $\mathbb Ee^{-\beta NJ}=\cosh(\beta N)$ なので

$$
p_N^{\mathrm a}=\frac1N\log\cosh(\beta N)\to\beta\quad(\beta>0).
$$

極限quenched圧力は定数0で実解析的。差が残っても候補が唯一であり、候補間の最適化現象自体がない。

**(iii) REM。** [SG1のREM圧力極限定理](../../../物理系/SG/SG1/index.md#thm-sg1-pressure)を、$2^N$ 個が独立で $N(0,N)$ という一致する仮定の下で適用すると、$a=\sqrt{2\log2}$ に対し

$$
\lim p_N^{\mathrm q}=
\begin{cases}\log2+\beta^2/2,&\beta\le a,\\
a\beta,&\beta\ge a,\end{cases}
\qquad
p_N^{\mathrm a}=\log2+\beta^2/2.
$$

$\beta=a$ に近付けた二階導関数の左右極限は左1・右0で一致せず、この点で二階微分可能でないため非解析的である。$\beta>a$ の極限差は $(\beta-a)^2/2$。

**(c) 結論の射程。** (i) は座標ごとに分離した損失、(ii) は標本依存の共通損失、(iii) は候補間独立Gaussianという相異なる確率法則である。いずれも未知データに対する予測規則とそのリスクを定義していない。従って、圧力差やその非解析性を計算できても汎化リスクの大小は導けない。[PML1-05の容量比の定理](../PML1-05/index.md#cor-pml1-05-asymptotic)も、ラベルの独立性と一般位置を別途要求するためここへ無条件に代入できない。
<!-- solution-end -->

## まとめと次講への橋

同じ「エネルギー」でも、**標本を固定した候補のGibbs重み**、**標本 $D$ の生成確率**、**規模 $N\to\infty$ の圧力の非解析性**は三層の異なる対象である。KL恒等式は平均の順序の差を正確に測るが、その正値性だけでは相転移が起きない。REMを援用するには候補数・正規損失の分散・候補間独立性を逐一照合する必要がある。

次の **PML1-07** では静的なGibbs重みから離れ、損失を小さくする連続時間の運動がどのような散逸則を満たすかを考える。
