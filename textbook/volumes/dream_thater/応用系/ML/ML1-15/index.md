# ML1-15 Bagging・random forest・bootstrap

<!-- definition-example-audit: strict -->

## 1. 一つの木を安定させるには

[決定木](../ML1-14/index.md#def-ml1-14-tree-leaf)は分割条件を標本から選ぶ。前講の例では、ラベルを一つ変えるだけで最適な根の質問と予測が変わった。この**標本変動に敏感な予測器**を、別々の標本で何度も作り直して平均したらどうなるだろうか。複数の木の誤りが同じ方向へ動けば平均しても残り、異なる方向へ動けば打ち消し合う。これを計算するのが本講の中心問題である。

観測データを $D=((x_1,y_1),\ldots,(x_n,y_n))$（$n\ge2$）とし、$x_i\in\mathbb R^d$、$d\ge1$、分類では $y_i\in\{0,1\}$、回帰では $y_i\in\mathbb R$ とする。標本の重複を許して木を再学習する手順と、木同士の相関が平均化に及ぼす効果を分離して考える。データ自体を確率的に扱う場合は、明記する箇所以外では、$(X_i,Y_i)$ は同一分布から独立に得られたものとする。

## 2. 取り直す標本はどのように作るか

新しい独立な観測を集める代わりに、今ある $n$ 件の**添字**から、各回に一様に一つ選び、選んだ添字を戻す。これを $n$ 回行うと、同じ観測が何回も入り、選ばれない観測も出る。これがブートストラップ再標本化（bootstrap resampling）である。ここでは標本を固定した上で、添字を取り直す乱数だけを考える期待値・分散を $E_*,\operatorname{Var}_*$ と書く。

<a id="def-ml1-15-bootstrap"></a>

<!-- formal-statement-start -->
> **定義（経験分布からのブートストラップ標本）**  
> $n\ge2$ の固定データ $D=(z_1,\ldots,z_n)$ に対し、独立にそれぞれ次の確率で選ばれる

$$
P_*(I_r=i)=\frac1n\quad
(r=1,\ldots,n;\ i=1,\ldots,n)
$$

> に従う添字 $I_1,\ldots,I_n$ を生成する。再標本 $D^*=(z_{I_1},\ldots,z_{I_n})$ をブートストラップ標本と呼ぶ。元の添字 $i$ が選ばれた回数を

$$
W_i=\sum_{r=1}^n \boldsymbol{1}_{\{I_r=i\}}
$$

> と定める。$W_i=0$ となる観測は、その再標本に含まれない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-15-bootstrap -->
**定義の確認**。$n=4$、元の添字が $(1,2,3,4)$ で、抽出結果が $(1,1,3,4)$ なら、再標本は $(z_1,z_1,z_3,z_4)$、重複度は $(W_1,W_2,W_3,W_4)=(2,0,1,1)$ となる。各 $W_i$ は非負整数で、和は4。観測2は一度も選ばれていない。これは4件の異なる観測を並べ替えた標本ではない。
<!-- definition-example-end -->

**元の標本を固定する条件付きの話**であって、真の母集団から別の独立標本を取ったわけではない。特に、同じ観測の複製を独立した新規観測として扱わない。

<a id="prop-ml1-15-bootstrap-weights"></a>

<!-- formal-statement-start -->
> **命題（ブートストラップの重複度）**  
> [ブートストラップ標本](#def-ml1-15-bootstrap)の $W_i$ について、すべての $i$ と、異なる $i\ne j$ で

$$
E_*W_i=1,\qquad
\operatorname{Var}_*(W_i)=1-\frac1n,\qquad
\operatorname{Cov}_*(W_i,W_j)=-\frac1n.
$$

> また、ある観測 $i$ が一度も選ばれない確率は $(1-1/n)^n$ であり、再標本に現れる異なる観測の個数の期待値は $n\{1-(1-1/n)^n\}$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

抽出回 $r$ に添字 $i$ が出るかを示す指示変数を足す。異なる回は独立だが、同じ回で異なる添字 $i,j$ が同時に出ることはない。この排他性が負の共分散を生む。

<!-- proof-start -->
### 証明

$A_{ri}=\boldsymbol{1}_{\{I_r=i\}}$ と置くと $E_*A_{ri}=1/n$、$A_{ri}^2=A_{ri}$ より

$$
\operatorname{Var}_*(A_{ri})
=\frac1n-\frac1{n^2}.
$$

$r\ne s$ なら独立な抽出なので $\operatorname{Cov}_*(A_{ri},A_{sj})=0$。よって

$$
E_*W_i=\sum_{r=1}^n\frac1n=1,\quad
\operatorname{Var}_*(W_i)=n\left(\frac1n-\frac1{n^2}\right)=1-\frac1n.
$$

$i\ne j$ で同じ回の $A_{ri}A_{rj}=0$ だから

$$
\operatorname{Cov}_*(A_{ri},A_{rj})
=0-\frac1n\frac1n=-\frac1{n^2},
\quad
\operatorname{Cov}_*(W_i,W_j)=n\left(-\frac1{n^2}\right)=-\frac1n.
$$

一回の抽出で $i$ を避ける確率は $1-1/n$。抽出回は独立なので全 $n$ 回で避ける確率はその $n$ 乗。異なる観測の個数を $K=\sum_{i=1}^n\boldsymbol{1}_{\{W_i>0\}}$ と置けば、期待値の線形性から

$$
E_*K
=\sum_{i=1}^n\{1-P_*(W_i=0)\}
=n\left\{1-\left(1-\frac1n\right)^n\right\}.
$$

これらは有限和だけの計算である。$\square$
<!-- proof-end -->

$n=4$ なら各点が抜ける確率は $(3/4)^4=81/256$、異なる点の期待個数は $4(1-81/256)=175/64\simeq2.734$。$n$ が大きいと除外確率は約 $e^{-1}\simeq0.368$ へ近づくが、有限標本で必ず36.8%の件数が除外されるわけではない。

### 再標本化した平均の変動

抽出平均は重複度を使って $\bar z^*=n^{-1}\sum_iW_i z_i$ と書ける。ここで $z_1,\ldots,z_n\in\mathbb R$ は固定した数値データ、$\bar z=n^{-1}\sum_i z_i$ とする。

<a id="prop-ml1-15-bootstrap-mean"></a>

<!-- formal-statement-start -->
> **命題（ブートストラップ平均の条件付き分散）**  
> 固定された実数値標本 $z_1,\ldots,z_n$（$n\ge2$）から復元抽出した標本平均 $\bar z^*=n^{-1}\sum_{r=1}^n z_{I_r}$ について、$v_n=n^{-1}\sum_{i=1}^n(z_i-\bar z)^2$ と置く。このとき

$$
E_*\bar z^*=\bar z,\qquad
\operatorname{Var}_*(\bar z^*)=\frac{v_n}{n}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

一回の復元抽出で得た $z_{I_r}$ の平均は $\bar z$、分散は $v_n$。$n$ 回の復元抽出は条件付き独立なので、平均の分散は一回分の $n$ 分の1になる。

<!-- proof-start -->
### 証明

一回の抽出 $Z_r^*=z_{I_r}$ に対し

$$
E_*Z_r^*=\sum_{i=1}^n\frac1n z_i=\bar z,\qquad
E_*[(Z_r^*-\bar z)^2]=\sum_{i=1}^n\frac1n(z_i-\bar z)^2=v_n.
$$

$Z_r^*$ は $D$ を固定したもとで独立かつ同一分布である。したがって

$$
E_*\bar z^*=\frac1n\sum_r E_*Z_r^*=\bar z,
$$

$$
\operatorname{Var}_*(\bar z^*)
=\frac1{n^2}\sum_{r=1}^n\operatorname{Var}_*(Z_r^*)
+\frac2{n^2}\sum_{r<s}\operatorname{Cov}_*(Z_r^*,Z_s^*)
=\frac{nv_n}{n^2}.
$$

交差共分散は独立性によって0となる。$\square$
<!-- proof-end -->

例えば $z=(0,1,2,3)$ では $\bar z=3/2$、$v_4=(9/4+1/4+1/4+9/4)/4=5/4$。従って $\operatorname{Var}_*(\bar z^*)=5/16$。これは**固定データの再抽出**に関する式であり、母集団から取った元の平均の真の分散を自動的に正確に与える式ではない。

## 3. 別々の木を作って平均する

木を一つ作る学習算法を $T(D;x)$ と書く。$x$ は予測したい新規入力であり、同じ算法・同じ設定値であっても、訓練に渡す再標本が変われば値が変わり得る。[葉の予測](../ML1-14/index.md#def-ml1-14-tree-leaf)を使う場合、分類木は0または1を返す。数値予測をする回帰木は実数を返す。

<a id="def-ml1-15-bagging"></a>

<!-- formal-statement-start -->
> **定義（Bagging予測器）**  
> 固定データ $D$ から互いに独立なブートストラップ標本 $D_1^*,\ldots,D_B^*$（$B\ge1$）を作り、同一の確定的な学習算法 $T$ で $T_b(x)=T(D_b^*;x)$ を得る。実数出力のBagging（bootstrap aggregating）予測器を

$$
\widehat f_B(x)=\frac1B\sum_{b=1}^BT_b(x)
$$

> と定める。二値分類で $T_b(x)\in\{0,1\}$ なら、この平均を1票の割合とし、$1/2$ を超えたときラベル1、それ以外では0と予測する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-15-bagging -->
**定義の確認**。$B=5$ 本の二値分類木が同じ入力へ $(1,0,1,1,0)$ を返したら、平均は $(1+0+1+1+0)/5=3/5$、多数決の予測は1。$B=4$ 本で $(1,0,1,0)$ なら平均 $1/2$、本講の同点規則では0となる。回帰木の値が $(2,4,5)$ なら、平均は $11/3$ である。票の割合 $3/5$ はそれだけでは**校正された真の予測確率**ではない。
<!-- definition-example-end -->

### 何を平均すると減るのか

平均化の効用は、無条件の「木の数を増やせば分散が $1/B$ 倍」という主張ではない。木同士が共通の訓練データを使うため、異なる木の予測には相関が残り得る。予測点 $x$ を一つ固定して、標本と算法乱数の両方で変動する実数値の木予測を $U_1,\ldots,U_B$ とし、各予測が有限二次モーメントを持つとする。

<a id="thm-ml1-15-covariance-variance"></a>

<!-- formal-statement-start -->
> **定理（予測平均の分散と共分散）**  
> $B\ge1$、$E U_b=\mu$、$\operatorname{Var}(U_b)=\sigma^2<\infty$ が全ての $b$ で共通であり、異なる $b\ne c$ について $\operatorname{Cov}(U_b,U_c)=\gamma$ が共通であるとする。$\overline U_B=B^{-1}\sum_bU_b$ と置くと

$$
E\overline U_B=\mu,\qquad
\operatorname{Var}(\overline U_B)
=\frac{\sigma^2}{B}+\frac{B-1}{B}\gamma.
$$

> 特に $\sigma^2>0$ で $\rho=\gamma/\sigma^2$ と置けば、分散は $\sigma^2\{\rho+(1-\rho)/B\}$ である。$\rho$ はこの $B$ 個で実現可能な相関係数とする。
<!-- formal-statement-end -->

### 証明の見取り図

分散は対角の $B$ 項だけでなく、異なる木の $B(B-1)$ 個の共分散項を含む。$B$ で割った平均を二乗するため全体に $B^{-2}$ が付く。

<!-- proof-start -->
### 証明

期待値の線形性から $E\overline U_B=B^{-1}\sum_b\mu=\mu$。分散は中心化して

$$
\begin{aligned}
\operatorname{Var}(\overline U_B)
&=E\left[\left\{\frac1B\sum_b(U_b-\mu)\right\}^2\right]\\
&=\frac1{B^2}\left\{\sum_b E(U_b-\mu)^2
+\sum_{b\ne c}E[(U_b-\mu)(U_c-\mu)]\right\}\\
&=\frac1{B^2}\{B\sigma^2+B(B-1)\gamma\}\\
&=\frac{\sigma^2}{B}+\frac{B-1}{B}\gamma.
\end{aligned}
$$

$\sigma^2>0$ なら $\gamma=\rho\sigma^2$ を代入する。$\square$
<!-- proof-end -->

例えば各木の分散が4、二木間の相関が $1/4$ で $B=8$ なら $\gamma=1$、平均の分散は $4/8+(7/8)\cdot1=11/8$。独立の場合の $1/2$ より大きい。$B\to\infty$ で相関 $\rho$ を固定できる非負相関模型では限界は $\rho\sigma^2$ で、全ての木が同じなら $\rho=1$ で減少はない。有限 $B$ では相関は $\rho\ge-1/(B-1)$ という制約を持ち、任意の負の数を固定して $B\to\infty$ とすることはできない。

**二つの乱数を混同しない。** 固定した $D$ のもとで独立に木を作るなら木の条件付き共分散は0である。しかし、訓練標本 $D$ 自体を取り直すと、木は同じ $D$ に由来する成分を共有する。次の命題は両者の違いを式にする。

<a id="prop-ml1-15-total-variance"></a>

<!-- formal-statement-start -->
> **命題（再標本化による変動と元データによる変動）**  
> 訓練標本 $D$ は確率的で、条件付きで $U_1,\ldots,U_B$ が独立同分布、$E_*(U_b\mid D)=m(D)$、$\operatorname{Var}_*(U_b\mid D)=v(D)$ とする。$E[m(D)^2]<\infty$、$E[v(D)]<\infty$ と仮定する。このとき

$$
\operatorname{Var}(\overline U_B)
=\operatorname{Var}_D\{m(D)\}+\frac1B E_D\{v(D)\}.
$$

> 異なる二木 $U_b,U_c$（$b\ne c$）の無条件の共分散は $\operatorname{Var}_D\{m(D)\}$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

まず $D$ を固定して条件付き平均・分散を計算し、次に予測の揺れを条件付き平均の揺れとその周りの揺れへ分ける。元標本による揺れは木を無限に増やしても残る。

<!-- proof-start -->
### 証明

条件付き独立と分散の加法性から

$$
E_*(\overline U_B\mid D)=\frac1B\sum_bm(D)=m(D),
$$

$$
\operatorname{Var}_*(\overline U_B\mid D)
=\frac1{B^2}\sum_bv(D)=\frac{v(D)}B.
$$

$a(D)=m(D)-E_Dm(D)$、$R=\overline U_B-m(D)$ と置く。$E_*(R\mid D)=0$ なので $E[R a(D)]=E_D[a(D)E_*(R\mid D)]=0$ である。さらに $\overline U_B-E\overline U_B=R+a(D)$ だから、二乗を展開して交差項を消すと

$$
\operatorname{Var}(\overline U_B)
=\operatorname{Var}_D(E_*[\overline U_B\mid D])
+E_D(\operatorname{Var}_*[\overline U_B\mid D])
=\operatorname{Var}_D(m(D))+\frac{E_Dv(D)}B.
$$

さらに二木の積について、条件付き独立から $E_*(U_bU_c\mid D)=m(D)^2$。したがって

$$
\begin{aligned}
\operatorname{Cov}(U_b,U_c)
&=E_D[m(D)^2]-E_D[m(D)]E_D[m(D)]\\
&=\operatorname{Var}_D(m(D)).
\end{aligned}
$$

有限二次モーメントにより各期待値は存在する。$\square$
<!-- proof-end -->

全体として平均予測の**期待値**が元の各木と共通でも、推定対象となる真値に対する偏りが消えるとは限らない。平均化が主に変えるのは乱数由来の変動である。回帰の二乗損失で $E[(U-\theta)^2]=\operatorname{Var}(U)+(EU-\theta)^2$ と分けた場合も、$\theta$ を固定して初めて偏りと分散を比較できる。

## 4. random forestは木のどこを変えるか

ブートストラップ標本を取り直しても、強く予測力を持つ一つの特徴量が全ての木の根に選ばれると、似た木が並びやすい。そこで、各節点で見ることのできる特徴量の候補を乱数で減らし、木の違いを増やす。これがrandom forest（ランダムフォレスト）の基本的な構成である。

<a id="def-ml1-15-random-forest"></a>

<!-- formal-statement-start -->
> **定義（特徴量部分集合を用いるrandom forest）**  
> $d\ge1$ 個の数値特徴を持つ訓練標本に対し、木の数 $B\ge1$ と $m\in\{1,\ldots,d\}$ を固定する。各木には独立なブートストラップ標本を渡す。各内部節点では $d$ 個の特徴から重複なしで一様に $m$ 個を選び、選んだ特徴だけを候補として[分割不純度の利得](../ML1-14/index.md#def-ml1-14-split-gain)を比較し、許容分割の中の最大利得を用いる。葉では所定の多数決または回帰平均を用い、木の予測をBaggingと同様に集約する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-15-random-forest -->
**定義の確認**。特徴が「身長・年齢・体重」の3個で $m=2$ なら、節点ごとに $\{\text{身長},\text{年齢}\}$、$\{\text{身長},\text{体重}\}$、$\{\text{年齢},\text{体重}\}$ のいずれかをそれぞれ確率 $1/3$ で候補にする。選ばれていない特徴は利得が大きくてもその節点では試さない。$m=d=3$ なら毎回全特徴を候補にするので、この節点での追加乱数は消え、同じ木構築規則のBaggingに帰着する。
<!-- definition-example-end -->

$m$ を小さくすれば木同士が必ず独立になるわけではない。相関を下げられる場合がある一方、よい分割特徴を見落とすことで各木の予測力も変わる。したがって**平均後の誤差が必ず減るという定理ではない**。[独立した検証データ](../ML1-12/index.md#def-ml1-12-three-way-split)で $m$・木の深さ・本数を選ぶ必要がある。回帰では平均を、分類では多数決または票の比率を取り、票の比率は確率校正の保証ではない。

## 5. 木を作るのに使われなかった観測

一つの木のブートストラップ再標本に含まれない元の観測を**袋の外（out-of-bag、OOB）**の観測という。訓練の際にその観測を使わなかった木だけで、その観測に対する予測を作れる。これは特別な保留評価の手段になる。

<a id="def-ml1-15-oob"></a>

<!-- formal-statement-start -->
> **定義（袋の外予測と誤分類率）**  
> $n$ 件の二値ラベル訓練データ $D$ から $B$ 本の木を作るとする。木 $b$ の抽出重複度を $W_i^{(b)}$、観測 $i$ を使わなかった木の集合を $\mathcal O_i=\{b:W_i^{(b)}=0\}$ とする。$\mathcal O_i\ne\varnothing$ の観測だけについて、その木の0–1予測を平均し、平均が $1/2$ を超えたら1、それ以外は0とする予測を $\widehat y_i^{\mathrm{OOB}}$ と定める。予測可能な観測の集合を $C=\{i:\mathcal O_i\ne\varnothing\}$ とし、$C\ne\varnothing$ のとき

$$
\widehat R_{\mathrm{OOB}}
=\frac1{|C|}\sum_{i\in C}
\boldsymbol{1}_{\{\widehat y_i^{\mathrm{OOB}}\ne y_i\}}
$$

> を袋の外誤分類率と定める。$C=\varnothing$ のときこの値は未定義とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-15-oob -->
**定義の確認**。$n=4,B=3$ 本の抽出添字が順に $(1,1,3,4)$、$(1,2,2,3)$、$(2,3,4,4)$ なら、観測1のOOB木は3番のみ、観測2のOOB木は1番のみ、観測3は一度もOOBにならず、観測4のOOB木は2番のみ。従って $C=\{1,2,4\}$。仮にこれらのOOB木による対応する予測が $(0,1,1)$、真のラベルが $(0,0,1)$ なら、誤りは観測2の1件、$\widehat R_{\mathrm{OOB}}=1/3$。観測3を誤分類なしとして分母4に入れてはならない。
<!-- definition-example-end -->

<a id="prop-ml1-15-oob-coverage"></a>

<!-- formal-statement-start -->
> **命題（袋の外予測が得られる本数）**  
> 固定した元の観測 $i$ について、各木のブートストラップ抽出を相互に独立に行うとする。$q_n=(1-1/n)^n$ と置くと、$i$ を使わない木の本数 $N_i^{\mathrm{OOB}}=|\mathcal O_i|$ は二項分布 $\operatorname{Bin}(B,q_n)$ に従い、

$$
E_*N_i^{\mathrm{OOB}}=Bq_n,\qquad
P_*(N_i^{\mathrm{OOB}}=0)=(1-q_n)^B.
$$
<!-- formal-statement-end -->

### 証明の見取り図

一本の木が特定の観測を除く確率は既に求めた $q_n$。木を作る際の再標本化が独立なので、その本数は独立なBernoulli試行の和になる。

<!-- proof-start -->
### 証明

観測 $i$ が木 $b$ に一度も現れない指示変数を $J_b=\boldsymbol{1}_{\{W_i^{(b)}=0\}}$ と置く。[重複度の命題](#prop-ml1-15-bootstrap-weights)から $P_*(J_b=1)=q_n$。木間の抽出は独立なので $J_1,\ldots,J_B$ は独立同分布の二値変数であり、$N_i^{\mathrm{OOB}}=\sum_bJ_b$。よって二項分布となり、その期待値は $\sum_bq_n=Bq_n$、0となる確率は全ての $J_b=0$ の確率 $(1-q_n)^B$ である。$\square$
<!-- proof-end -->

袋の外予測は各 $i$ のラベルをその木の学習へ使わないが、**袋の外誤りで設定値を何度も選んだ後の袋の外誤りは独立な最終テストではない**。また、各観測で利用できる木の本数が異なり、$B$ が小さいと予測不能な観測もある。最終的な性能を報告するときは、[検証と独立テストの区別](../ML1-12/index.md#thm-ml1-12-independent-holdout)を保つ。

## 6. 実際に再標本化して木を学習する

次の計算では一変量ではなく二つの特徴量を使い、ブートストラップで決定株（深さ1の木）を本当に学習する。分割候補の探索は[決定木のGini利得](../ML1-14/index.md#thm-ml1-14-gini-gain)に従い、空の子を禁止する。単なる保存済み予測のアニメーションではない。再標本化の乱数種、本数 $B$、節点で試す特徴数 $m$ を変えられる。

~~~python-lab
# lab-id: ml1-15-bagging-forest
# lab-title: 復元抽出から決定株を学習して多数決する
# lab-mode: demo
# timeout-ms: 10000
import random
seed, B, mtry = 20261020, 101, 1  # mtry=2 は全特徴を調べるBagging
rng = random.Random(seed)
xs = [(i/11, ((5*i+3) % 13)/12) for i in range(12)]
ys = [int(i >= 6) for i in range(12)]
n = len(ys)
def gini(labels):
    if not labels: raise ValueError("empty child")
    p = sum(labels)/len(labels)
    return 2*p*(1-p)
def majority(labels):
    return int(2*sum(labels) > len(labels))
def train_stump(indices, mtry, rng):
    dimensions = rng.sample(range(2), mtry)
    subset_y = [ys[i] for i in indices]
    best = None
    for j in sorted(dimensions):
        values = sorted(set(xs[i][j] for i in indices))
        for a,b in zip(values, values[1:]):
            threshold = (a+b)/2
            left = [ys[i] for i in indices if xs[i][j] <= threshold]
            right = [ys[i] for i in indices if xs[i][j] > threshold]
            gain = gini(subset_y)-(len(left)*gini(left)+len(right)*gini(right))/len(indices)
            candidate = (gain, -j, -threshold, j, threshold, majority(left), majority(right))
            if best is None or candidate[:3] > best[:3]: best = candidate
    return None if best is None else best[3:]
def predict(tree, x):
    if tree is None: return 0
    j,t,left,right = tree
    return left if x[j] <= t else right
trees, oob = [], [[] for _ in range(n)]
for b in range(B):
    indices = [rng.randrange(n) for _ in range(n)]
    tree = train_stump(indices, mtry, rng)
    trees.append(tree)
    selected = set(indices)
    for i in range(n):
        if i not in selected: oob[i].append(predict(tree,xs[i]))
probe = (0.60, 0.20)
votes = [predict(tree,probe) for tree in trees]
covered = [i for i in range(n) if oob[i]]
oob_errors = [int(2*sum(oob[i]) > len(oob[i])) != ys[i] for i in covered]
print("settings:",seed,B,mtry)
print("first 10 trees at probe:",votes[:10])
print("probe positive-vote fraction:",sum(votes)/B)
print("OOB coverage:",len(covered),"/",n)
print("OOB misclassification:",sum(oob_errors)/len(covered) if covered else "undefined")
~~~

~~~python-test
assert len(trees)==B and len(votes)==B
assert all(0<=v<=1 for v in votes)
assert all(len(oob[i])<=B for i in range(n))
assert 0<=sum(votes)/B<=1
assert len(covered)>0
~~~

この一回の訓練だけから母集団の予測分散は分からない。元データを固定してseedを変えた変動、元データそのものを新たに生成して変えた変動、未知の独立検証点での誤りは異なる。次に、理論上の相関項だけを切り出して再現する。

~~~python-lab
# lab-id: ml1-15-correlation-lab
# lab-title: 木間相関と平均予測の分散床
# lab-mode: demo
# timeout-ms: 10000
import random, math
rho, B2, repeats, seed2 = 0.25, 20, 4000, 41
# 0 <= rho <= 1; 予測値 Z_b = sqrt(rho) U + sqrt(1-rho) eps_b
assert 0 <= rho <= 1 and B2 >= 1
rng2 = random.Random(seed2)
means = []
for _ in range(repeats):
    common = rng2.gauss(0,1)
    total = 0.0
    for b in range(B2):
        total += math.sqrt(rho)*common + math.sqrt(1-rho)*rng2.gauss(0,1)
    means.append(total/B2)
emp_mean = sum(means)/repeats
emp_var = sum((z-emp_mean)**2 for z in means)/repeats
theory = rho + (1-rho)/B2
print("B, rho:", B2, rho)
print("empirical ensemble variance:",round(emp_var,4))
print("theoretical ensemble variance:",round(theory,4))
~~~

~~~python-test
assert abs(emp_var-theory)<0.06
assert theory>=rho
~~~

この実験の正規乱数模型は木の誤差構造を模したもので、前の決定株の標本を再利用した推定値ではない。相関 $\rho$ を0・0.25・1に変えると、$B$ を増やしても残る分散が異なる理由を観測できる。実際のrandom forestの性能比較には、元の訓練標本を再生成する反復実験と独立テストが必要である。

## 演習

### ML1-15-A01 抽出と袋の外
- Level: A

$n=4$、元の観測を $z_1,z_2,z_3,z_4$ とする。ブートストラップ添字が $(2,2,2,4)$ のとき、重複度、再標本の相異なる観測の個数、袋の外の添字を求めよ。

<!-- solution-start -->
#### 詳細解答

添字2は3回、4は1回、1と3は0回なので $(W_1,W_2,W_3,W_4)=(0,3,0,1)$。和は $0+3+0+1=4=n$。再標本は $(z_2,z_2,z_2,z_4)$ なので相異なる元の添字は2と4の2個、袋の外の元の添字は1と3である。[重複度の定義](#def-ml1-15-bootstrap)では、同じ値を持つ別観測も添字で区別する。
<!-- solution-end -->

### ML1-15-A02 再標本化した平均
- Level: A

固定標本 $z=(0,1,2,3)$ を一様復元抽出して4件の再標本を作る。その平均の条件付き期待値と分散を求めよ。

<!-- solution-start -->
#### 詳細解答

元の平均は $\bar z=(0+1+2+3)/4=3/2$。偏差平方は $9/4,1/4,1/4,9/4$ で、合計5。よって $v_4=5/4$。[再標本化平均の命題](#prop-ml1-15-bootstrap-mean)の $n=4$ に代入して $E_*\bar z^*=3/2$、$\operatorname{Var}_*(\bar z^*)=(5/4)/4=5/16$ である。
<!-- solution-end -->

### ML1-15-A03 多数決と回帰平均
- Level: A

同じ入力に4本の分類木が $(1,1,0,0)$、3本の回帰木が $(1,3,8)$ を返した。Baggingによる分類予測と回帰予測を求めよ。分類の同点は0とする。

<!-- solution-start -->
#### 詳細解答

分類の票の割合は $(1+1+0+0)/4=1/2$。$1/2$ を**超えない**ので[Baggingの定義](#def-ml1-15-bagging)から分類ラベル0となる。回帰では平均 $(1+3+8)/3=12/3=4$ が予測値である。分類の票の割合を無条件に真のクラス確率と同一視してはならない。
<!-- solution-end -->

### ML1-15-A04 特徴量候補を選ぶ
- Level: A

特徴量が4個のrandom forestで各節点 $m=2$ 個を重複なしで一様選択する。候補の組は何通りか。特定の特徴量1が候補に入る確率を求めよ。

<!-- solution-start -->
#### 詳細解答

候補は $\binom42=4\cdot3/(2\cdot1)=6$ 通り。特徴量1を含む組は、残り3個から1個選ぶ $\binom31=3$ 通りだから確率は $3/6=1/2$。$m=d=4$ なら全特徴が必ず入り確率1、$m=1$ なら1/4となる。[部分集合の定義](#def-ml1-15-random-forest)では、一つの節点内で同じ特徴を二重に選ばない。
<!-- solution-end -->

### ML1-15-B01 重複度の負の共分散
- Level: B

$n=3$ の一様復元抽出を3回行う。異なる添字1、2の重複度 $W_1,W_2$ に対し、$E W_1$、$\operatorname{Var}(W_1)$、$\operatorname{Cov}(W_1,W_2)$ を各回の指示変数から導け。

<!-- solution-start -->
#### 詳細解答

$r=1,2,3$ に対し $A_r=\boldsymbol{1}_{\{I_r=1\}}$、$C_r=\boldsymbol{1}_{\{I_r=2\}}$ と置く。各回 $EA_r=EC_r=1/3$、二値なので $\operatorname{Var}(A_r)=1/3-1/9=2/9$。異なる回の抽出は独立。従って $EW_1=3(1/3)=1$、$\operatorname{Var}(W_1)=3(2/9)=2/3$。同じ回には添字1と2が同時に現れないので $A_rC_r=0$、$\operatorname{Cov}(A_r,C_r)=0-(1/3)(1/3)=-1/9$。異なる回の共分散は0だから $\operatorname{Cov}(W_1,W_2)=3(-1/9)=-1/3$。重複度が独立ではないことも分かる。
<!-- solution-end -->

### ML1-15-B02 予測の相関を無視すると
- Level: B

8本の木の予測 $U_1,\ldots,U_8$ の分散がいずれも4、異なる二木間の共分散が1であるとする。平均の分散を求め、独立であると誤認した場合の答えと比較せよ。

<!-- solution-start -->
#### 詳細解答

$B=8,\sigma^2=4,\gamma=1$ を[分散公式](#thm-ml1-15-covariance-variance)に入れる。対角項は $8\cdot4=32$、非対角項は $8\cdot7\cdot1=56$。分散は $(32+56)/8^2=88/64=11/8$。独立と仮定して共分散項を勝手に0にすると $32/64=1/2$ となり、$11/8-1/2=7/8$ だけ過小評価する。相関係数は $1/4$ であり、共分散1は分散4と同じではない。
<!-- solution-end -->

### ML1-15-B03 条件付きの独立と無条件の相関
- Level: B

元標本 $D$ が確率的で、条件付きで独立な木予測 $U_b$ の平均が $m(D)$、分散が $v(D)$ とする。$\operatorname{Var}_D(m(D))=2$、$E_Dv(D)=6$ のとき、$B=3$ および $B=12$ の平均の無条件分散と、別の二木間の無条件共分散を求めよ。有限二次モーメントを仮定する。

<!-- solution-start -->
#### 詳細解答

[全分散の命題](#prop-ml1-15-total-variance)より、平均の分散は $2+6/B$。$B=3$ なら $2+6/3=4$、$B=12$ なら $2+6/12=5/2$。別の二木の共分散は $\operatorname{Var}_D(m(D))=2$。$B$ を増やすと条件付きの変動 $6/B$ は減るが、元標本の変動2は残る。木同士は $D$ 固定では独立でも、無条件では独立ではない。
<!-- solution-end -->

### ML1-15-B04 袋の外予測が存在しない確率
- Level: B

$n=2$ の固定元標本から、互いに独立なブートストラップ標本を $B=3$ 回作る。特定の元観測が袋の外になる一木当たりの確率、OOB木の期待本数、OOB木が全くない確率を求めよ。

<!-- solution-start -->
#### 詳細解答

一回の復元抽出で特定の添字を避ける確率は $1/2$。一木で2回とも避ける確率は $q_2=(1/2)^2=1/4$。[OOB本数の命題](#prop-ml1-15-oob-coverage)に $B=3$ を代入すると、期待本数は $3(1/4)=3/4$、一本もない確率は $(1-1/4)^3=(3/4)^3=27/64$。期待本数が正でも、各元観測に必ずOOB予測が存在するわけではない。
<!-- solution-end -->

### ML1-15-C01 再標本化・OOB・分散床を統合する
- Level: C

固定した4件の二値ラベル観測の添字を $1,2,3,4$、ラベルを $(0,0,1,1)$ とする。3本の分類木を作るための復元抽出の添字列が、順に

$$
(1,1,3,4),\qquad(1,2,2,3),\qquad(2,3,4,4)
$$

であった。各観測が袋の外となる木をすべて挙げよ。観測1,2,4に対し、それぞれのOOB木による予測が0,1,1であるとき、OOB誤分類率を計算せよ（観測3にはOOB木がない）。また、ある別の回帰予測点で全木の分散が9、異なる木同士の共分散が3であると仮定する。$B$ 本の回帰予測の平均について分散を式で求め、$B=3$ と $B\to\infty$ の値を答えよ。最後に、OOB評価だけで木数・特徴量候補数を最適化した後に必要な評価を述べよ。

<!-- solution-start -->
#### 詳細解答

**袋の外の一覧**。1本目は添字2を含まない。2本目は添字4を含まない。3本目は添字1を含まない。3本とも添字3を含む。従って $\mathcal O_1=\{3\}$、$\mathcal O_2=\{1\}$、$\mathcal O_3=\varnothing$、$\mathcal O_4=\{2\}$。評価可能集合は $C=\{1,2,4\}$ である。

**OOB誤分類率**。与えられた予測 $(0,1,1)$ に対応する真のラベルは $(y_1,y_2,y_4)=(0,0,1)$ だから、誤り指示変数は $(0,1,0)$。従って [袋の外予測と誤分類率の定義](#def-ml1-15-oob)から $\widehat R_{\mathrm{OOB}}=(0+1+0)/3=1/3$。観測3は分母・分子のどちらにも入れない。

**平均予測の分散**。[共分散公式](#thm-ml1-15-covariance-variance)で $\sigma^2=9,\gamma=3$ とすると

$$
\operatorname{Var}(\overline U_B)=\frac9B+\frac{B-1}{B}3
=3+\frac6B.
$$

$B=3$ なら $3+6/3=5$、$B\to\infty$ なら3であり、0にならない。相関係数は $3/9=1/3$ なので、残る分散は $9(1/3)=3$ とも確認できる。

**最後のテスト**。OOB誤りを繰り返し比較して木数や特徴候補数を選んだなら、そのOOB値自体は選択を経た値である。[独立な最終テスト](../ML1-12/index.md#thm-ml1-12-independent-holdout)用の標本をあらかじめ残し、設定値を固定した後一度だけ評価する。元データ全体からのブートストラップには最終テストを混ぜない。
<!-- solution-end -->

## まとめ

ブートストラップは元観測の復元抽出であり、重複と袋の外が必ず区別される。Baggingは木の予測を平均するが、分散低減には共分散が効く。random forestは節点ごとの特徴量候補を乱数で絞り、木同士の類似性を変えようとする方法である。ただし改善は無条件の保証ではなく、袋の外評価・独立検証・最終テストを目的別に使う。次講では複数の木を**順に重み付けして学習する**Boostingを考える。
