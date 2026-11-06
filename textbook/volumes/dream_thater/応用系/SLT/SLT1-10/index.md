# SLT1-10 Rademacher複雑度とsymmetrization

<!-- definition-example-audit: strict -->

## 1. 候補の数ではなく、標本上で雑音に合わせる能力を測る

[有限クラスの汎化界](../SLT1-03/index.md#thm-slt1-03-finite-uniform)は仮説の個数を、[関数クラスの被覆](../SLT1-09/index.md#def-slt1-09-covering)は関数値の近さを数えた。しかし、候補が多数あっても全てが訓練点でほぼ同じ値なら、標本平均の揺らぎは同じ方向に動く。候補数をそのまま数えるのは大き過ぎる場合がある。

例えば、二つの訓練点 $a,b$ 上に、値が $(0,0),(1,0),(0,1),(1,1)$ の四関数があるとする。各点に独立に「プラス」「マイナス」の符号を振り、プラスの点だけで1を返す関数を選べば、符号付き平均は平均的に正になる。**ランダムな符号へどれほど合わせられるか**を、標本上の関数クラスの大きさとして測ろう。

以下で $\mathcal Z$ は可測空間、$P$ はその確率分布、$n\ge1$、$S=(Z_1,\ldots,Z_n)\sim P^n$ は独立同分布標本とする。$\mathcal F$ は標本抽選前に固定した、空でない有限または可算な可測関数 $f:\mathcal Z\to[0,1]$ のクラスとする。$f$ を予測器 $h$ の損失 $f(z)=\ell(h,z)$ と考えると、[母集団・経験リスク](../SLT1-04/index.md#def-slt1-04-uniform-deviation)は

$$
Pf=\mathbb E_{Z\sim P}f(Z),\qquad
P_nf=\frac1n\sum_{i=1}^nf(Z_i)
$$

に当たる。有限・可算性を置くのは、関数ごとの可測性だけでなく上限の可測性も保証するためである。非可算クラスでは別途可測性条件が要る。

## 2. 独立な符号と二種類のRademacher複雑度

**Rademacher変数**とは、$+1$ と $-1$ をそれぞれ確率 $1/2$ で取る確率変数である。以下ではこれを公平符号として使う。符号列 $\sigma_1,\ldots,\sigma_n$ は互いに独立で、訓練標本 $S$ とも独立に用意する。$S$ を固定したあとで $\sigma$ だけを平均すると、関数が符号へ適合できる程度を調べられる。

<a id="def-slt1-10-rademacher-signs"></a>

<!-- formal-statement-start -->
> **定義（独立な公平符号と符号付き標本平均）**
> $n\ge1$、固定された標本 $S=(z_1,\ldots,z_n)\in\mathcal Z^n$ と、独立で $\Pr(\sigma_i=1)=\Pr(\sigma_i=-1)=1/2$ を満たす符号 $\sigma_i$ に対し、
>
$$
T_{S,\sigma}(f)=\frac1n\sum_{i=1}^n\sigma_i f(z_i)
$$
>
> を関数 $f:\mathcal Z\to\mathbb R$ の符号付き標本平均と呼ぶ。$\mathbb E_\sigma$ は $S$ を固定し、符号だけについて取る期待値を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-10-rademacher-signs -->
**定義の確認**。$n=2$、$S=(a,b)$、$f(a)=1,f(b)=0$ とすると

$$
T_{S,\sigma}(f)=\frac{\sigma_1\cdot1+\sigma_2\cdot0}{2}
=\frac{\sigma_1}{2}.
$$

四通りの独立符号 $(+,+),(+,-),(-,+),(-,-)$ は各確率 $1/4$ で、$T$ は前二通りで $1/2$、後二通りで $-1/2$ である。よって $\mathbb E_\sigma T=0$、$\mathbb E_\sigma|T|=1/2$。符号に依存しない一つの関数の平均は0でも、最大値や絶対値を取ってから平均すると0とは限らない。
<!-- definition-example-end -->

関数を符号を見た**後**に選んでよい場合、各符号列について $\sup_f T_{S,\sigma}(f)$ を作り、その値を符号について平均する。標本を固定する段階と標本自体も平均する段階を分離する。

<a id="def-slt1-10-rademacher-complexities"></a>

<!-- formal-statement-start -->
> **定義（経験・期待Rademacher複雑度）**
> $\mathcal F$ を標本抽選前に固定した非空の有限または可算な $[0,1]$ 値可測関数クラス、$S\in\mathcal Z^n$ とする。**経験Rademacher複雑度**と**期待Rademacher複雑度**をそれぞれ
>
$$
\widehat{\mathfrak R}_S(\mathcal F)
=\mathbb E_\sigma\left[\sup_{f\in\mathcal F}T_{S,\sigma}(f)\right],
\qquad
\mathfrak R_n(\mathcal F)
=\mathbb E_{S\sim P^n}\widehat{\mathfrak R}_S(\mathcal F)
$$
>
> と定める。絶対偏差を扱うための**絶対値版**は
>
$$
\widehat{\mathfrak R}^{\,\mathrm{abs}}_S(\mathcal F)
=\mathbb E_\sigma\left[\sup_{f\in\mathcal F}|T_{S,\sigma}(f)|\right],
\qquad
\mathfrak R^{\,\mathrm{abs}}_n(\mathcal F)
=\mathbb E_S\widehat{\mathfrak R}^{\,\mathrm{abs}}_S(\mathcal F)
$$
>
> とする。これらは別の量であり、$\mathfrak R_n$ は分布 $P$ にも依存する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-10-rademacher-complexities -->
**定義の確認**。$\mathcal Z=\{a,b\}$、$\mathcal F=\{f_0,f_1\}$、$f_0=0$、$f_1=\boldsymbol1_{\{a\}}$ とし、まず $n=1$、$S=(a)$ と固定する。$\sigma=+1$ のとき $\sup_f T=1$、$\sigma=-1$ のとき $\sup_f T=0$（$f_0$ を選ぶ）なので

$$
\widehat{\mathfrak R}_{(a)}(\mathcal F)
=\frac12(1+0)=\frac12.
$$

$S=(b)$ なら両関数の値が0なので複雑度は0。$P(a)=P(b)=1/2$ とすると、標本も平均した値は

$$
\mathfrak R_1(\mathcal F)
=\frac12\cdot\frac12+\frac12\cdot0=\frac14.
$$

一方、$S=(a)$ で絶対値版は $\mathbb E_\sigma\max(0,|\sigma|)=1$、$S=(b)$ では0だから $\mathfrak R_1^{\,\mathrm{abs}}=1/2$。二つの定義は確かに異なる。どちらも、標本を固定して符号を平均し、その後に標本を平均している。
<!-- definition-example-end -->

$\widehat{\mathfrak R}_S\ge0$ は、各 $f$ について $\mathbb E_\sigma T_{S,\sigma}(f)=0$ だから成立する。また $0\le\widehat{\mathfrak R}_S\le1$、$0\le\widehat{\mathfrak R}^{\,\mathrm{abs}}_S\le1$ である。単一関数からなるクラスの通常版は0だが、絶対値版は一般には0でない。「絶対値を外せば同じ定数の界が出る」とは考えない。

## 3. 有限クラスなら符号平均を直接評価できる

候補が $M$ 個なら、独立な符号の指数平均を足し合わせられる。ここでは損失の値域 $[0,1]$ によって係数の二乗和が $n$ 以下になる。

<a id="lem-slt1-10-finite-class"></a>

<!-- formal-statement-start -->
> **補題（有限関数クラスの符号複雑度）**
> $n\ge1$、任意の固定標本 $S=(z_i)_{i=1}^n$、空でない有限クラス $\mathcal F\subseteq[0,1]^{\mathcal Z}$、$M=|\mathcal F|$ とする。このとき
>
$$
0\le\widehat{\mathfrak R}_S(\mathcal F)
\le\sqrt{\frac{2\log M}{n}},\qquad
\widehat{\mathfrak R}^{\,\mathrm{abs}}_S(\mathcal F)
\le\sqrt{\frac{2\log(2M)}{n}}.
$$
>
> 後者の評価は通常版とは別に、正負二方向の符号付き和を最大化して得る。
<!-- formal-statement-end -->

### 証明の見取り図

各固定 $f$ の符号付き和の指数モーメントを評価し、最大値の指数を指数の和で抑える。$\lambda>0$ を最後に最適化する。

<!-- proof-start -->
### 証明

固定 $f$ と $\lambda>0$ について符号独立性と $\cosh u\le e^{u^2/2}$ により

$$
\begin{aligned}
\mathbb E_\sigma e^{\lambda T_{S,\sigma}(f)}
&=\prod_{i=1}^n\frac{e^{\lambda f(z_i)/n}+e^{-\lambda f(z_i)/n}}2\\
&=\prod_{i=1}^n\cosh\left(\frac{\lambda f(z_i)}n\right)\\
&\le\exp\left(\frac{\lambda^2}{2n^2}\sum_{i=1}^nf(z_i)^2\right)
\le e^{\lambda^2/(2n)}.
\end{aligned}
$$

指数関数の凸性によるJensen不等式と $\exp(\lambda\max_f T_f)\le\sum_f e^{\lambda T_f}$ から

$$
\begin{aligned}
\lambda\widehat{\mathfrak R}_S(\mathcal F)
&\le\log\mathbb E_\sigma e^{\lambda\max_f T_f}\\
&\le\log\sum_{f\in\mathcal F}\mathbb E_\sigma e^{\lambda T_f}
\le\log M+\frac{\lambda^2}{2n}.
\end{aligned}
$$

$M\ge2$ のとき、$\log M/\lambda+\lambda/(2n)$ を $\lambda=\sqrt{2n\log M}$ で最小化すると $\sqrt{2\log M/n}$ を得る。$M=1$ のときは $\widehat{\mathfrak R}_S=\mathbb E_\sigma T_f=0$ と直接計算する。

絶対値版では $\max_f|T_f|=\max_{f,\epsilon\in\{-1,1\}}\epsilon T_f$ と書ける。$-\sigma$ も $\sigma$ と同分布なので、上の指数モーメント評価を $2M$ 個の候補 $\epsilon T_f$ に適用し $\sqrt{2\log(2M)/n}$ を得る。下界0は期待値と上限の順序から従う。
<!-- proof-end -->

例えば全ての二値関数が $n$ 個の**相異なる**標本点上で自由に値を選べるなら、プラス符号の点で1、マイナス符号の点で0とする関数が存在する。そこで

$$
\widehat{\mathfrak R}_S=\mathbb E_\sigma\frac{\#\{i:\sigma_i=+1\}}n=\frac12.
$$

標本点が重複すると同じ入力の値を別々に選べず、一般にこの計算はできない。これは[経験距離の退化](../SLT1-09/index.md#def-slt1-09-function-distances)とも同じ現象である。

## 4. ghost sampleで母集団平均を二つの標本平均へ変える

[SLT1-07の二重標本](../SLT1-07/index.md#def-slt1-07-double-sample-trace)では、元の標本 $S$ と独立で同じ分布を持つ $S'=(Z'_1,\ldots,Z'_n)$ を用意した。$P_nf$ の反対側に $P'_nf=n^{-1}\sum_i f(Z'_i)$ を置くと、$\mathbb E_{S'}P'_nf=Pf$ である。

各対 $(Z_i,Z'_i)$ は交換しても同分布である。交換するかどうかを独立な符号 $\sigma_i$ で表せば、二標本の差を**符号付き和**に変えられる。この操作をsymmetrization（対称化）と呼ぶ。先ほどの符号は証明の途中から現れる補助乱数であり、実際の訓練ラベルとは関係ない。

<a id="thm-slt1-10-symmetrization"></a>

<!-- formal-statement-start -->
> **定理（Rademacher対称化）**
> $n\ge1$、$S,S'\sim P^n$ を互いに独立な標本とし、$\mathcal F$ を標本抽選前に固定した非空の有限または可算な $[0,1]$ 値可測関数クラスとする。このとき
>
$$
\begin{aligned}
\mathbb E_S\sup_{f\in\mathcal F}(Pf-P_nf)&\le2\mathfrak R_n(\mathcal F),\\
\mathbb E_S\sup_{f\in\mathcal F}(P_nf-Pf)&\le2\mathfrak R_n(\mathcal F),\\
\mathbb E_S\sup_{f\in\mathcal F}|Pf-P_nf|
&\le2\mathfrak R_n^{\,\mathrm{abs}}(\mathcal F).
\end{aligned}
$$
>
> 上限が有限・可算であるため、全ての確率変数と期待値は可測かつ有限である。
<!-- formal-statement-end -->

### 証明の見取り図

まずghost sampleによって $Pf$ を独立な経験平均の期待値に置き換え、上限と期待値の順序を不等式で入れ替える。次に、各標本対の交換不変性で独立符号を導入し、二つの符号和に分離する。

<!-- proof-start -->
### 証明

一方向の偏差を $U(S)=\sup_f(Pf-P_nf)$ とする。$\mathbb E_{S'}P'_nf=Pf$ は各固定 $f$ に成り立つので、各 $S$ について

$$
\begin{aligned}
U(S)
&=\sup_f\mathbb E_{S'}(P'_nf-P_nf)\\
&\le\mathbb E_{S'}\sup_f(P'_nf-P_nf).
\end{aligned}
$$

最後の不等式は、各 $f$ の値がその標本での上限以下だからである。ここで最初から $f$ を標本に依存して固定したり、$\sup$ と期待値を等号で交換したりしていない。

各 $i$ について $(Z_i,Z'_i)$ と $(Z'_i,Z_i)$ は同分布で、異なる $i$ の対は独立である。したがって、$S,S'$ と独立なRademacher変数を符号として用い、負符号の対だけ交換しても全体の分布は変わらない。このため

$$
\mathbb E_{S,S'}\sup_f\frac1n\sum_i(f(Z'_i)-f(Z_i))
=\mathbb E_{S,S',\sigma}\sup_f
\frac1n\sum_i\sigma_i(f(Z'_i)-f(Z_i)).
$$

各固定 $(S,S',\sigma)$ で $\sup_f(A_f+B_f)\le\sup_fA_f+\sup_fB_f$ を適用すると

$$
\begin{aligned}
&\mathbb E_{S,S',\sigma}\sup_f
\frac1n\sum_i\sigma_i(f(Z'_i)-f(Z_i))\\
&\quad\le
\mathbb E_{S',\sigma}\sup_f\frac1n\sum_i\sigma_i f(Z'_i)
+\mathbb E_{S,\sigma}\sup_f\frac1n\sum_i(-\sigma_i)f(Z_i)\\
&\quad=\mathfrak R_n(\mathcal F)+\mathfrak R_n(\mathcal F).
\end{aligned}
$$

最後の等号では $-\sigma$ と $\sigma$ が同分布であることを使った。これで第一式が得られる。第二式は $P_nf-Pf=\mathbb E_{S'}(P_nf-P'_nf)$ から同じ手順を適用する。

絶対偏差についても、最初の段階を

$$
\sup_f|Pf-P_nf|
\le\mathbb E_{S'}\sup_f|P'_nf-P_nf|
$$

に置き換える。対交換後は

$$
\sup_f\left|\frac1n\sum_i\sigma_i(f(Z'_i)-f(Z_i))\right|
\le\sup_f|T_{S',\sigma}(f)|+\sup_f|T_{S,-\sigma}(f)|.
$$

両項の期待値はいずれも $\mathfrak R_n^{\,\mathrm{abs}}$ なので第三式を得る。
<!-- proof-end -->

**何が得られたか**。[固定関数についての標本平均の確率界](../SLT1-03/index.md#thm-slt1-03-fixed-risk)だけでは標本後の選択へ使えないが、対称化なら全候補の最大偏差を条件付き符号平均の期待値で評価できる。右辺の期待Rademacher複雑度は汎化gapそのものではないが、それを上から抑える道具になる。

## 5. 期待値の制御を、高確率の汎化保証へ

標本の一つ $Z_i$ だけを別の値へ変更しても、$0\le f\le1$ だから各 $P_nf$ は $1/n$ しか変わらない。[McDiarmidの有界差分不等式](../../../解析系/HDP/HDP4/index.md#thm-hdp4-mcdiarmid)は、このような統計量を期待値のまわりに集中させる。

<a id="thm-slt1-10-generalization"></a>

<!-- formal-statement-start -->
> **定理（期待・経験Rademacher複雑度による汎化界）**
> $n\ge1$、$0<\delta<1$、$S\sim P^n$、$\mathcal F$ を標本抽選前に固定した非空の有限または可算な $[0,1]$ 値可測関数クラスとする。
>
> **（期待複雑度版）** 確率 $1-\delta$ 以上で、全ての $f\in\mathcal F$ に対し同時に
>
$$
|Pf-P_nf|
\le2\mathfrak R_n^{\,\mathrm{abs}}(\mathcal F)
+\sqrt{\frac{\log(1/\delta)}{2n}}.
$$
>
> **（経験複雑度版）** 確率 $1-\delta$ 以上で、全ての $f\in\mathcal F$ に対し同時に
>
$$
|Pf-P_nf|
\le2\widehat{\mathfrak R}^{\,\mathrm{abs}}_S(\mathcal F)
+3\sqrt{\frac{\log(2/\delta)}{2n}}.
$$
>
> それぞれの確率は元の標本 $S$ について取る。後者の複雑度は観測された $S$ から計算する量である。
<!-- formal-statement-end -->

### 証明の見取り図

一様偏差と経験複雑度の両方について、標本の一座標を交換したときの最大変化を計算する。対称化による期待値の上界と、二つの集中事象を合わせる。

<!-- proof-start -->
### 証明

$D(S)=\sup_f|Pf-P_nf|$ と置く。$S$ と、座標 $i$ だけを $z'_i$ に変更した標本 $S^{(i)}$ に対して、各 $f$ について

$$
|P_nf(S)-P_nf(S^{(i)})|
=\frac{|f(z_i)-f(z'_i)|}{n}\le\frac1n.
$$

任意の数列 $(a_f),(b_f)$ について $\bigl|\sup_f|a_f|-\sup_f|b_f|\bigr|\le\sup_f|a_f-b_f|$ だから、$|D(S)-D(S^{(i)})|\le1/n$。独立座標で幅 $c_i=1/n$、$\sum_i c_i^2=1/n$ となることを確認し、上記の[McDiarmid不等式](../../../解析系/HDP/HDP4/index.md#thm-hdp4-mcdiarmid)を $D$ に適用すると

$$
\Pr\{D(S)>\mathbb E D(S)+t\}\le e^{-2nt^2}.
$$

[対称化定理](#thm-slt1-10-symmetrization)で $\mathbb E D\le2\mathfrak R_n^{\,\mathrm{abs}}$ だから、$t=\sqrt{\log(1/\delta)/(2n)}$ を代入して第一式を得る。

次に $A(S)=\widehat{\mathfrak R}^{\,\mathrm{abs}}_S(\mathcal F)$ とする。同じ符号列を用いて二標本の $T$ を比較すると

$$
\left|T_{S,\sigma}(f)-T_{S^{(i)},\sigma}(f)\right|
=\frac{|\sigma_i|\,|f(z_i)-f(z'_i)|}{n}\le\frac1n.
$$

上限・絶対値を取っても変化は $1/n$ 以下で、符号について期待しても同じ幅が残る。よって $|A(S)-A(S^{(i)})|\le1/n$。McDiarmidの下側評価を使い

$$
\Pr\{\mathfrak R_n^{\,\mathrm{abs}}>A(S)+t\}
\le e^{-2nt^2}.
$$

最初の $D$ の上側評価とこの下側評価にそれぞれ失敗確率 $\delta/2$ を割り当てる。$t=\sqrt{\log(2/\delta)/(2n)}$ にすると、合併上界により確率 $1-\delta$ 以上で

$$
D(S)\le\mathbb E D(S)+t
\le2\mathfrak R_n^{\,\mathrm{abs}}+t
\le2A(S)+3t.
$$

これが第二式である。
<!-- proof-end -->

一方向の保証 $Pf\le P_nf+\cdots$ だけが必要なら、[対称化の第一式](#thm-slt1-10-symmetrization)を用い、絶対値なしの $\mathfrak R_n$・$\widehat{\mathfrak R}_S$ でも同じ係数 $2,3$ の上界を証明できる。逆方向も第二式から得られる。ただし、**二方向を同時に制御したいとき**に一方向だけの上界を流用してはいけない。

また、[近似ERMの決定論的過剰リスク界](../SLT1-04/index.md#thm-slt1-04-approximate-erm-oracle)を使えば、この同時事象上で $\eta$-近似ERMが返す $\widehat f\in\mathcal F$ について

$$
P\widehat f-\inf_{f\in\mathcal F}Pf
\le2D(S)+\eta
\le4\widehat{\mathfrak R}^{\,\mathrm{abs}}_S(\mathcal F)
+6\sqrt{\frac{\log(2/\delta)}{2n}}+\eta.
$$

これは「$\widehat f$ は標本依存だから固定関数のHoeffdingを直接使えない」という問題を、全候補同時の事象で解決した例である。

## 6. 前章の経験被覆が、今度は汎化界になる

[経験被覆の符号評価](../SLT1-09/index.md#thm-slt1-09-empirical-cover)は、固定標本 $S$ における経験 $L_1$ 半径 $\varepsilon$ のnetの中心数 $N$ が有限なら、$[0,1]$ 値関数に対し

$$
\widehat{\mathfrak R}^{\,\mathrm{abs}}_S(\mathcal F)
\le\varepsilon+\sqrt{\frac{2\log(2N)}n}
$$

と述べた。この $N=N(S,\varepsilon)$ は標本に依存してもよい。**標本を固定して符号のみを平均してから**評価するからである。

<a id="cor-slt1-10-covering-bound"></a>

<!-- formal-statement-start -->
> **系（経験被覆からの高確率一様偏差界）**
> $n\ge1$、$0<\delta<1$、$\varepsilon>0$、標本抽選前に固定した非空の有限または可算な $[0,1]$ 値可測関数クラス $\mathcal F$ と $S\sim P^n$ を考える。各標本 $S$ で経験 $L_1$ 距離の半径 $\varepsilon$ の $\mathcal F$ 内の有限netが存在し、その最小中心数を $N_S=N(\varepsilon,\mathcal F,d_{S,1})<\infty$ とする。このとき確率 $1-\delta$ 以上で
>
$$
\sup_{f\in\mathcal F}|Pf-P_nf|
\le2\varepsilon
+2\sqrt{\frac{2\log(2N_S)}n}
+3\sqrt{\frac{\log(2/\delta)}{2n}}.
$$
>
> $N_S$ は右辺に残る標本依存の値であり、決定論的な一個の数とは限らない。
<!-- formal-statement-end -->

### 証明の見取り図

被覆の評価は各標本について成り立つ決定論的な不等式なので、経験Rademacher汎化界の右辺へ標本ごとに代入できる。

<!-- proof-start -->
### 証明

各 $S$ で有限net $G_S$ を一つ選べる。任意の $f$ に対し $g\in G_S$ で $d_{S,1}(f,g)\le\varepsilon$ とできるから、各符号について

$$
|T_{S,\sigma}(f)-T_{S,\sigma}(g)|
\le\frac1n\sum_i|f(Z_i)-g(Z_i)|\le\varepsilon.
$$

したがって $\sup_f|T_f|\le\varepsilon+\max_{g\in G_S}|T_g|$。固定した $S$ における有限集合 $G_S$ の指数モーメントの上界は前章の[条件付き評価](../SLT1-09/index.md#thm-slt1-09-empirical-cover)により

$$
\mathbb E_\sigma\max_{g\in G_S}|T_g|
\le\sqrt{\frac{2\log(2|G_S|)}n}.
$$

$|G_S|=N_S$ として[経験複雑度版の汎化定理](#thm-slt1-10-generalization)へ代入し、係数2を分配すれば結論の三項を得る。$G_S$ を固定関数の独立Hoeffdingの合併上界に直接入れたわけではない。
<!-- proof-end -->

例えば次の線形関数族を考える。

$$
\mathcal F=\{f_t(x)=tx:t\in\mathbb Q\cap[0,1]\},
\qquad x\in[0,1].
$$

これは可算性の仮定を満たす。[前章の線形関数族の被覆](../SLT1-09/index.md#prop-slt1-09-linear-cover)を用い、$\varepsilon=1/m$（整数 $m\ge2$）の経験netを、格子点 $t=j/m$（$j=0,\ldots,m$）による $m+1$ 個で構成できる。従って上の右辺で $N_S$ を $m+1$ と置いた少し粗い決定論的な保証も得られる。

さらに $t\mapsto Pf_t-P_nf_t$ は各標本で連続なので、稠密な有理数上の一様偏差界は全ての実数 $t\in[0,1]$ に延長できる。母集団側の近さを別途証明せず、経験的な近さから汎化を保証できた点が前章との違いである。

## 7. 条件を外すと何が壊れるか

### 7.1 データ依存の関数クラス

$P$ を $[0,1]$ 上で密度が1の分布、$n=1$ とし、観測した $Z_1$ に応じて

$$
f_S(x)=\boldsymbol1_{\{x\ne Z_1\}}
$$

を後から作る。この場合、$P_nf_S=0$、$Pf_S=1$ なのに標本上の絶対値版Rademacher複雑度は0である。クラス $\{f_S\}$ は標本前に固定されていない。

ghost sampleの条件付き平均自体は計算できるが、**対交換のとき関数クラスも元の $S$ に結び付いて変わる**。固定クラスについて二標本の差が符号交換で同分布という対称化の核心が使えない。

### 7.2 独立性のない訓練列

全ての $Z_i$ を同じBernoulli$(1/2)$変数 $V$ とし、$f(z)=z$、$\mathcal F=\{0,f\}$ とする。各 $Z_i$ の周辺分布は同じでも、$P_nf=V$ なので

$$
|Pf-P_nf|=\left|\frac12-V\right|=\frac12
$$

が常に成立する。一方、標本固定後の通常版の符号和の最大は $V\max(0,\sum_i\sigma_i/n)$ であり、$n$ とともに0へ縮む。標本対の独立性もMcDiarmidの座標独立性も失われた。

### 7.3 有界でない損失

例えば実数上の $f(z)=z$ を制限なしに使うと、一標本交換の差 $|f(z)-f(z')|/n$ が $1/n$ 以下とは限らない。したがって本章の高確率定理の有界差分の証明は使えない。二乗損失や対数損失には別のtail条件・切断・集中評価が必要になる。

## 演習

**問題 SLT1-10-A01（符号平均と絶対値）**
- Level: A

$S=(a)$、$f(a)=1$、$\mathcal F=\{f\}$ とし、$\sigma=\pm1$ をそれぞれ確率 $1/2$ で取る。通常版と絶対値版の経験Rademacher複雑度を定義から求めよ。

<!-- solution-start -->
**詳細解答**。標本サイズは1なので $T_{S,\sigma}(f)=\sigma$。クラスが単一関数であるから $\sup_fT=\sigma$、従って通常版は $(1+(-1))/2=0$。絶対値版はどちらの符号でも $|\sigma|=1$ なので平均して1になる。最大化後の絶対値と、最大化だけでは異なる。
<!-- solution-end -->

**問題 SLT1-10-A02（二関数の二段階平均）**
- Level: A

$\mathcal Z=\{a,b\}$、$P(a)=P(b)=1/2$、$n=1$、$\mathcal F=\{0,\boldsymbol1_{\{a\}}\}$ とする。$S=(a)$ と $S=(b)$ それぞれの通常版の経験複雑度と、期待複雑度を計算せよ。

<!-- solution-start -->
**詳細解答**。$S=(a)$ では符号が正なら候補1が符号平均1を達成し、負ならゼロ関数を選べるため最大は0。ゆえに $\widehat{\mathfrak R}_{(a)}=(1+0)/2=1/2$。$S=(b)$ では両候補が0なので経験複雑度は0。標本抽選確率が各 $1/2$ だから $\mathfrak R_1=(1/2)(1/2)+(1/2)0=1/4$。
<!-- solution-end -->

**問題 SLT1-10-A03（重複しない点の全二値関数）**
- Level: A

相異なる二点 $a,b$ を固定し、$S=(a,b)$ とする。$\mathcal F$ は $\{a,b\}$ 上の全ての四つの $\{0,1\}$ 値関数からなる。$\widehat{\mathfrak R}_S(\mathcal F)$ を四つの符号列を数えて求めよ。

<!-- solution-start -->
**詳細解答**。任意の符号列で、正符号の点に1、負符号の点に0を置く関数がクラス内に存在する。従って $\sup_fT=(\boldsymbol1_{\{\sigma_1=+1\}}+\boldsymbol1_{\{\sigma_2=+1\}})/2$。$++,+-,-+,--$ でそれぞれ $1,1/2,1/2,0$ となり、平均は $(1+1/2+1/2+0)/4=1/2$。二つの点が同一なら両符号に独立して値を割り当てられない。
<!-- solution-end -->

**問題 SLT1-10-A04（有界差分の幅）**
- Level: A

$0\le f\le1$ の有限クラスで $D(S)=\sup_f|Pf-P_nf|$ とする。$n=100$ の標本の一座標だけを変更したときの $D$ の最大変化を示し、[McDiarmidの不等式](../../../解析系/HDP/HDP4/index.md#thm-hdp4-mcdiarmid)に使う $\sum_i c_i^2$ を求めよ。

<!-- solution-start -->
**詳細解答**。変更前後の $P_nf$ の差は $[f(z_i)-f(z'_i)]/100$ で絶対値は $1/100$ 以下。$Pf$ は変わらない。各 $f$ の絶対偏差の変化が $1/100$ 以下なら、その上限の変化も $1/100$ 以下である。従って $c_i=1/100$ を全100座標に取れ、$\sum_i c_i^2=100(1/100)^2=1/100$。ここで独立座標であることを集中不等式の仮定として確認する。
<!-- solution-end -->

**問題 SLT1-10-A05（有限クラスと指数モーメントの上界）**
- Level: A

$M=8$ 個の $[0,1]$ 値関数について、任意の固定標本 $S$（$n=200$）での通常版複雑度の上界を式で示せ。$M=1$ に同じ式を代入した場合の値と、その理由も述べよ。

<!-- solution-start -->
**詳細解答**。[有限クラスの補題](#lem-slt1-10-finite-class)の仮定（有限、非空、$[0,1]$ 値、標本固定）を満たすので $\widehat{\mathfrak R}_S\le\sqrt{2\log8/200}=\sqrt{\log8/100}$。$M=1$ では右辺が0。単一の $f$ の符号付き平均の期待値は各 $\mathbb E\sigma_i=0$ から0になり、左辺も0なので整合する。
<!-- solution-end -->

**問題 SLT1-10-B01（有限クラスの係数を再導出）**
- Level: B

$S=(z_i)_{i=1}^n$ を固定、$|\mathcal F|=M\ge2$、$0\le f(z_i)\le1$ とする。各 $f$ に $\mathbb E_\sigma e^{\lambda T_f}\le e^{\lambda^2/(2n)}$ を示し、$\lambda>0$ の最適化から $\widehat{\mathfrak R}_S\le\sqrt{2\log M/n}$ を導け。

<!-- solution-start -->
**詳細解答**。独立符号について $\mathbb E e^{\lambda\sigma_i f_i/n}=\cosh(\lambda f_i/n)\le e^{\lambda^2 f_i^2/(2n^2)}$。積を取ると指数の二乗和が $\sum f_i^2\le n$ なので要求されたモーメント評価を得る。凸性と有限和の上界により

$$
\lambda\mathbb E_\sigma\max_fT_f
\le\log\sum_f\mathbb E e^{\lambda T_f}
\le\log M+\frac{\lambda^2}{2n}.
$$

右辺を $\lambda$ で割って微分すると $-\log M/\lambda^2+1/(2n)$。零点 $\lambda=\sqrt{2n\log M}$ は正で、代入した二項はそれぞれ $\sqrt{\log M/(2n)}$ だから、和は $\sqrt{2\log M/n}$。標本の独立性はこの**条件付き符号評価**には不要だが、符号同士の独立性は指数の積で必要である。
<!-- solution-end -->

**問題 SLT1-10-B02（対交換の向き）**
- Level: B

独立な $S,S'\sim P^n$ と独立符号を使い、$\mathbb E_S\sup_f(P_nf-Pf)\le2\mathfrak R_n(\mathcal F)$ を示せ。$\mathcal F$ は固定の有限または可算な $[0,1]$ 値可測関数クラスとする。

<!-- solution-start -->
**詳細解答**。各 $S$ に対し $P_nf-Pf=\mathbb E_{S'}(P_nf-P'_nf)$ なので、上限の不等式から

$$
\mathbb E_S\sup_f(P_nf-Pf)
\le\mathbb E_{S,S'}\sup_f\frac1n\sum_i(f(Z_i)-f(Z'_i)).
$$

各対 $(Z_i,Z'_i)$ を独立に交換しても分布は不変である。符号を付けた差に同分布で置換し、$\sup_f(A_f+B_f)\le\sup_fA_f+\sup_fB_f$ によって

$$
\begin{aligned}
&\mathbb E_{S,S',\sigma}\sup_f\frac1n\sum_i\sigma_i(f(Z_i)-f(Z'_i))\\
&\le \mathbb E_{S,\sigma}\sup_fT_{S,\sigma}(f)
+\mathbb E_{S',\sigma}\sup_fT_{S',-\sigma}(f)
=2\mathfrak R_n(\mathcal F).
\end{aligned}
$$

$-\sigma$ も独立なRademacher変数の列であることが最後の等号を正当化する。
<!-- solution-end -->

**問題 SLT1-10-B03（経験被覆を汎化へ接続）**
- Level: B

固定クラス $\mathcal F\subseteq[0,1]^{\mathcal Z}$ で、各標本について経験 $L_1$ 半径 $1/10$ のnetが高々11個あるとする。$n=200$、$0<\delta<1$ のとき $\sup_f|Pf-P_nf|$ の高確率上界を導き、netが標本に依存してもよい理由を述べよ。

<!-- solution-start -->
**詳細解答**。半径 $\varepsilon=1/10$、中心数 $N_S\le11$ を[経験被覆系](#cor-slt1-10-covering-bound)へ適用する。$[0,1]$ 値、独立同分布、標本前固定のクラスという条件も満たすため、確率 $1-\delta$ 以上で

$$
\sup_f|Pf-P_nf|
\le\frac15+2\sqrt{\frac{2\log22}{200}}
+3\sqrt{\frac{\log(2/\delta)}{400}}.
$$

netは標本を固定したあとの符号だけについて用いるため標本依存でよい。netに含まれる関数を元の標本から独立な**固定候補**とみなしてHoeffdingの合併上界を直接取ったわけではない。
<!-- solution-end -->

**問題 SLT1-10-B04（標本依存クラスでの失敗）**
- Level: B

$P$ を $[0,1]$ 上で密度が1の分布、$S=(Z_1)$ とし、観測後に $\mathcal F_S=\{f_S\}$、$f_S(x)=\boldsymbol1_{\{x\ne Z_1\}}$ を作る。$Pf_S-P_1f_S$ と $\widehat{\mathfrak R}^{\,\mathrm{abs}}_S(\mathcal F_S)$ を求め、汎化定理を適用できない箇所を示せ。

<!-- solution-start -->
**詳細解答**。連続な密度1の分布では、固定された各点 $\{z\}$ の確率は0である。従って各標本実現 $Z_1=z$ について母集団平均を計算すると

$$
Pf_S=1,\qquad P_1f_S=f_S(Z_1)=0.
$$

よってgapは1である。一方、符号付き平均は常に $\sigma_1f_S(Z_1)=0$ なので、絶対値版複雑度も0になる。

しかし $\mathcal F_S$ は $S$ から選んでいる。[対称化定理](#thm-slt1-10-symmetrization)の「標本前に固定されたクラス」という仮定に反し、対交換後に元の $S$ に依存するクラスが同じ状態を保たない。従って符号平均との同分布置換は成立しない。
<!-- solution-end -->

**問題 SLT1-10-C01（二点模型で全ての期待値を照合）**
- Level: C

$P(a)=P(b)=1/2$、$\mathcal F=\{f_0,f_1\}$、$f_0=0$、$f_1=\boldsymbol1_{\{a\}}$、$n=2$ とする。$K=\#\{i:Z_i=a\}$ とおく。

1. $K=0,1,2$ の各場合に $D(S)=\sup_f|Pf-P_nf|$ を計算せよ。
2. 各場合に $\widehat{\mathfrak R}_S$ と $\widehat{\mathfrak R}^{\,\mathrm{abs}}_S$ を符号を列挙して求めよ。
3. 標本について平均し、[対称化定理](#thm-slt1-10-symmetrization)の絶対偏差の不等式と、一方向の不等式を具体的数値で検証せよ。
4. 標本 $S=(a,a)$ について、経験複雑度と $D(S)$ が同じ量ではないことを説明せよ。

<!-- solution-start -->
**詳細解答**。

1. $Pf_0=P_nf_0=0$、$Pf_1=1/2$、$P_nf_1=K/2$。したがって $D(S)=|1/2-K/2|$ は $K=0,1,2$ で順に $1/2,0,1/2$。
2. $K=0$ では両関数が標本上で0なので両複雑度とも0。$K=1$ では非零の符号が一つだけで、通常版の最大値は $\max(0,\sigma/2)$、絶対値版は $|\sigma|/2$。よって通常版 $1/4$、絶対値版 $1/2$。$K=2$ では通常版の最大値は $\max(0,(\sigma_1+\sigma_2)/2)$ で、四つの符号列 $++,+-,-+,--$ に対し $1,0,0,0$ なので平均は $1/4$。絶対値版の値は $1,0,0,1$ だから平均は $1/2$。
3. 二項分布から $\Pr(K=0)=1/4$、$\Pr(K=1)=1/2$、$\Pr(K=2)=1/4$。従って

   $$
   \begin{aligned}
   \mathbb ED(S)&=\tfrac14\cdot\tfrac12+\tfrac12\cdot0+\tfrac14\cdot\tfrac12=\tfrac14,\\
   \mathfrak R_2&=\tfrac14\cdot0+\tfrac12\cdot\tfrac14+\tfrac14\cdot\tfrac14=\tfrac3{16},\\
   \mathfrak R_2^{\,\mathrm{abs}}&=\tfrac14\cdot0+\tfrac12\cdot\tfrac12+\tfrac14\cdot\tfrac12=\tfrac38.
   \end{aligned}
   $$

   絶対値版の対称化は $\tfrac14\le2\cdot\tfrac38=\tfrac34$ となる。一方向 $U(S)=\sup_f(Pf-P_nf)$ は $K=0,1,2$ で $1/2,0,0$（零関数がある）なので、$\mathbb EU=\tfrac18\le2\cdot\tfrac3{16}=\tfrac38$。逆方向も対称性により同じ。
4. $S=(a,a)$ の $D(S)=1/2$ は母集団 $Pf_1=1/2$ と経験平均1のずれを測る。一方、経験通常版は $1/4$、経験絶対値版は $1/2$ であり、符号列による標本上の適合能力を測る。対称化定理は**標本を平均した**不等式であり、同じ標本ごとに $D(S)\le2\widehat{\mathfrak R}_S$ と結論するものではない。
<!-- solution-end -->

## まとめ

Rademacher複雑度は、固定された標本上で独立な符号に合わせて関数を選ぶ能力を測る。ghost sampleと対交換により、母集団平均と経験平均の偏差の期待値がこの複雑度で制御でき、独立入力の有界差分集中で高確率界になる。経験被覆は条件付きの符号平均へ代入できる一方、クラス自体の標本依存・独立性の喪失・非有界損失は別の問題を生む。次章では、損失関数の合成や線形クラスへこの評価を移す。
