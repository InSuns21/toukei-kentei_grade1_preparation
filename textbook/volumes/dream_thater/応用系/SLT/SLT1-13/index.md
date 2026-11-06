# SLT1-13 正則化ERMとoracle不等式

<!-- definition-example-audit: strict -->

## 1. 訓練誤差の最小値だけを選んでよいか

[有限クラスの一様汎化界](../SLT1-03/index.md#thm-slt1-03-finite-uniform)では、候補が増えると同時偏差の上界も大きくなる。[一様偏差からのERM評価](../SLT1-04/index.md#thm-slt1-04-approximate-erm-oracle)は、その偏差を最適化後のリスクへ移す。[速い収束率の章](../SLT1-12/index.md#thm-slt1-12-finite-fast-rate)では、追加の分散条件があれば改善することも見た。

しかし、単純なモデルと複雑なモデルを同じ候補集合へ入れて一律の複雑度で評価すると、単純な候補の有利さが見えなくなる。例えば二値分類で、すべての入力に0を返す候補と、観測した点だけに0を返す候補の訓練誤差がともに0でも、後者が未観測点で1を返すなら母集団では不利になり得る。

そこで経験リスクに**罰則**を足す。罰則は、複雑な候補に大きな値を付ける非負の数である。ただし「正則化したから汎化する」は定理ではない。どの罰則なら母集団リスクを保証するかを、まず不等式として分解し、その後に確率的な根拠を与える。

以下で $S=(Z_1,\ldots,Z_n)\sim P^n$、$n\ge1$ とし、$R(h)=P\ell_h$、$\widehat R(h)=P_n\ell_h$ と略記する。[母集団・経験リスク](../../ML/ML1-01/index.md#def-ml1-01-risks)の定義に従い、$\ell_h(z)=\ell(h,z)$ は可測とする。まずは各リスクが有限である場合を考え、確率的な結果では $0\le\ell_h\le1$ を追加する。

## 2. 罰則付きERMと「基本不等式」

通常の経験リスク最小化は $\widehat R(h)$ だけを比べる。今度は、候補 $h$ を選ぶ際の複雑さの代価を表す $\operatorname{pen}(h)\ge0$ を加えた目的関数

$$
Q_S(h)=\widehat R(h)+\operatorname{pen}(h)
$$

を比べる。計算機が正確な最小値を求められるとは限らないので、許容する最適化誤差も同時に定める。ここでは罰則関数を標本抽選前に固定することを基本とするが、次の決定論的な定義と補題そのものには固定性は要らない。

<a id="def-slt1-13-penalized-erm"></a>

<!-- formal-statement-start -->
> **定義（罰則付き経験リスク最小化と最適化誤差）**
> 非空な仮説集合 $\mathcal H$、各 $h\in\mathcal H$ の有限な経験リスク $\widehat R(h)$、非負で有限な罰則 $\operatorname{pen}(h)$、$\varepsilon_{\mathrm{opt}}\ge0$ を与える。標本 $S$ から選ぶ $\widetilde h\in\mathcal H$ が
>
$$
\widehat R(\widetilde h)+\operatorname{pen}(\widetilde h)
\le \inf_{h\in\mathcal H}
\{\widehat R(h)+\operatorname{pen}(h)\}
+\varepsilon_{\mathrm{opt}}
$$
>
> を満たすとき、$\widetilde h$ を誤差 $\varepsilon_{\mathrm{opt}}$ の**近似罰則付きERM**と呼ぶ。$\varepsilon_{\mathrm{opt}}=0$ で最小値を達成する場合が厳密な罰則付きERMである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-13-penalized-erm -->
**定義の確認**。二つの候補 $h_0,h_1$ に対して経験リスクが $0.20,0.10$、罰則が $0.02,0.15$ とする。比較すべき値はそれぞれ $0.22,0.25$ なので、厳密な罰則付きERMは $h_0$ を選ぶ。$h_1$ は目的値が最小値より $0.03$ 大きいので、$\varepsilon_{\mathrm{opt}}\ge0.03$ のときだけ近似最小化子として許される。訓練誤差の大小だけでは選択が決まらない。
<!-- definition-example-end -->

比較対象の候補を $h$ とすると、近似最小化子の目的値はその候補の目的値以下（最適化誤差を除く）である。この「比較する相手は未知の最良候補でもよい」という性質を、次の補題として式にする。

<a id="lem-slt1-13-basic-inequality"></a>

<!-- formal-statement-start -->
> **補題（罰則付きERMの基本不等式）**
> 非空集合 $\mathcal H$ 上で $R(h),\widehat R(h),\operatorname{pen}(h)$ がいずれも有限であるとする。$\widetilde h$ が[近似罰則付きERM](#def-slt1-13-penalized-erm)なら、任意の $h\in\mathcal H$ に対して
>
$$
R(\widetilde h)-R(h)
\le [R(\widetilde h)-\widehat R(\widetilde h)]
+[\widehat R(h)-R(h)]
+\operatorname{pen}(h)-\operatorname{pen}(\widetilde h)
+\varepsilon_{\mathrm{opt}}
$$
>
> が成立する。確率論的な仮定は要らない。
<!-- formal-statement-end -->

### 証明の見取り図

経験目的関数同士の大小に、両者の「真のリスクと経験リスクの差」を足し引きするだけである。選択された $\widetilde h$ は標本に依存するため、この段階では差を0と置けない。

<!-- proof-start -->
### 証明

[罰則付き経験リスク最小化と最適化誤差](#def-slt1-13-penalized-erm)の条件から、任意の $h$ について

$$
\widehat R(\widetilde h)+\operatorname{pen}(\widetilde h)
\le\widehat R(h)+\operatorname{pen}(h)
+\varepsilon_{\mathrm{opt}}.
$$

左右に $R(\widetilde h)-\widehat R(\widetilde h)$ を加え、右辺の $\widehat R(h)$ を $R(h)+[\widehat R(h)-R(h)]$ と書くと

$$
R(\widetilde h)+\operatorname{pen}(\widetilde h)
\le R(h)+[R(\widetilde h)-\widehat R(\widetilde h)]
+[\widehat R(h)-R(h)]
+\operatorname{pen}(h)+\varepsilon_{\mathrm{opt}}.
$$

両辺から $R(h)+\operatorname{pen}(\widetilde h)$ を引けば主張を得る。いずれも有限な量の代数操作である。
<!-- proof-end -->

## 3. 偏差を罰則で支払うと何が残るか

基本不等式には二つの偏差が残っている。各候補の母集団と経験リスクの差を非負数 $d(h)$ で同時に抑えられれば、選んだ候補にも同じ評価を使える。$d(h)$ を候補ごとに変えてよい点が重要である。

<a id="thm-slt1-13-deterministic-oracle"></a>

<!-- formal-statement-start -->
> **定理（二側偏差からの決定論的oracle不等式）**
> 非空集合 $\mathcal H$ 上でリスクと罰則は有限とし、ある標本 $S$ について、固定された非負関数 $d:\mathcal H\to[0,\infty)$ が
>
$$
|R(h)-\widehat R(h)|\le d(h)
\quad(\forall h\in\mathcal H)
$$
>
> を満たすとする。[近似罰則付きERM](#def-slt1-13-penalized-erm) $\widetilde h$ の罰則が全候補で $\operatorname{pen}(h)\ge d(h)$ なら
>
$$
R(\widetilde h)
\le\inf_{h\in\mathcal H}\{R(h)+2\operatorname{pen}(h)\}
+\varepsilon_{\mathrm{opt}}.
$$
>
> 特に全候補のリスクを同一の $\Delta$ で評価し $\operatorname{pen}=0$ とした場合は、別途 $R(\widetilde h)\le\inf_hR(h)+2\Delta+\varepsilon_{\mathrm{opt}}$ が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

選択された候補の上向き偏差 $R-\widehat R$ と、比較相手の下向き偏差 $\widehat R-R$ を別々に抑える。選択された候補の偏差は、その候補自身の罰則と相殺できる。

<!-- proof-start -->
### 証明

任意の $h$ を固定する。[基本不等式](#lem-slt1-13-basic-inequality)の二つの偏差へ仮定を適用すると

$$
R(\widetilde h)-R(h)
\le d(\widetilde h)+d(h)
+\operatorname{pen}(h)-\operatorname{pen}(\widetilde h)
+\varepsilon_{\mathrm{opt}}.
$$

$d(\widetilde h)-\operatorname{pen}(\widetilde h)\le0$ と $d(h)\le\operatorname{pen}(h)$ より

$$
R(\widetilde h)\le R(h)+2\operatorname{pen}(h)+\varepsilon_{\mathrm{opt}}.
$$

これは全ての比較相手 $h$ について成り立つので、右辺の下限を取れる。最良候補が存在することは必要ない。

最後の無罰則の場合は同じ基本不等式に直接 $d(\widetilde h)=d(h)=\Delta$、$\operatorname{pen}=0$ を代入する。$\operatorname{pen}\ge d$ はこの場合不要である。
<!-- proof-end -->

ここでいう **oracle（神託）** とは、訓練データを見ずに $R(h)+2\operatorname{pen}(h)$ が小さい候補を知っている仮想的な選択者である。学習器がその候補を知るわけではない。上界がその最小値にほぼ追い付く、という比較をoracle不等式と呼ぶ。

[Bayes超過リスク](../SLT1-01/index.md#def-slt1-01-bayes-excess)の基準値を $R^\star$ とすると、同じ不等式は

$$
R(\widetilde h)-R^\star
\le\inf_{h\in\mathcal H}
\underbrace{\left\{[R(h)-R^\star]+2\operatorname{pen}(h)\right\}}_
{\text{近似誤差と統計的代価の折合い}}
+\underbrace{\varepsilon_{\mathrm{opt}}}_{\text{最適化誤差}}
$$

となる。$R(h)-R^\star$ は候補 $h$ の近似側の不足、$2\operatorname{pen}(h)$ は偏差を覆うための統計的代価である。選択側の差 $R(\widetilde h)-R(h)$ と、[クラス内近似誤差の分解](../SLT1-01/index.md#thm-slt1-01-decomposition)を混同しない。この式の「罰則」は、まだ確率的に正当化されたものではない。

## 4. Hoeffding不等式から候補別の罰則を作る

前章までと同じ $[0,1]$ 損失と独立同分布標本に戻る。[固定候補のHoeffding型偏差](../SLT1-03/index.md#thm-slt1-03-fixed-risk)は、固定した $h$ について

$$
\Pr_S\{|R(h)-\widehat R(h)|>t\}\le2e^{-2nt^2}
$$

を保証する。しかし最適化後の $\widetilde h$ は固定候補ではないので、全候補で同時に成立する事象を作る必要がある。

有限・可算の候補を $h_1,h_2,\ldots$ と並べ、標本を取る**前**に各候補へ正の重み $\pi(h)$ を割り当て、その和を1以下にする。重みが小さい候補には大きめの許容偏差を与える。

<a id="def-slt1-13-weighted-radius"></a>

<!-- formal-statement-start -->
> **定義（候補別信頼半径と統計的罰則）**
> 非空で有限または可算な $\mathcal H$、$n\ge1$、$0<\delta<1$、標本抽選と独立に固定した重み $\pi(h)>0$（$\sum_{h\in\mathcal H}\pi(h)\le1$）を与える。各候補の信頼半径を
>
$$
b_{n,\delta}(h)=
\sqrt{\frac{\log[2/(\delta\pi(h))]}{2n}}
$$
>
> と定める。$b_{n,\delta}(h)$ 以上の非負罰則を、この評価に対する**統計的罰則**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-13-weighted-radius -->
**定義の確認**。二候補 $h_0,h_1$ に重み $\pi(h_0)=3/4$、$\pi(h_1)=1/4$ を割り当てると、どちらも正で合計は1である。$n=100,\delta=0.1$ では

$$
b(h_0)=\sqrt{\frac{\log(80/3)}{200}}\approx0.1281,\qquad
b(h_1)=\sqrt{\frac{\log80}{200}}\approx0.1480.
$$

重みを小さくした候補は、大きい偏差まで許す代わりに、選択の目的関数でもより強く罰せられる。信頼半径は1より大きくなっても式として有効だが、その場合のリスク上界は緩い。
<!-- definition-example-end -->

<a id="thm-slt1-13-weighted-oracle"></a>

<!-- formal-statement-start -->
> **定理（重み付き可算クラスの高確率oracle不等式）**
> $S\sim P^n$ は独立同分布、$\mathcal H$ は標本抽選前に固定した非空・有限または可算の可測予測器クラスとする。全 $h,z$ で $0\le\ell(h,z)\le1$、$\pi$ は[候補別信頼半径の定義](#def-slt1-13-weighted-radius)の条件を満たすとする。標本に依存しない有限な罰則 $\operatorname{pen}(h)\ge b_{n,\delta}(h)$ を用い、標本上の可測な近似最小化子 $\widetilde h$ が決定論的な $\varepsilon_{\mathrm{opt}}\ge0$ を満たすなら、少なくとも確率 $1-\delta$ で
>
$$
R(\widetilde h)
\le\inf_{h\in\mathcal H}
\{R(h)+2\operatorname{pen}(h)\}
+\varepsilon_{\mathrm{opt}}
$$
>
> が成立する。確率は訓練標本 $S$ の抽選に関するものであり、無条件の期待値保証ではない。
<!-- formal-statement-end -->

### 証明の見取り図

各候補の失敗確率を $\delta\pi(h)$ に振り分ける。全候補の失敗確率の総和が $\delta$ 以下になるため、標本から選んだ候補へも偏差界を適用できる。

<!-- proof-start -->
### 証明

任意の固定 $h$ に[固定候補の偏差界](../SLT1-03/index.md#thm-slt1-03-fixed-risk)を $t=b_{n,\delta}(h)$ で適用する。$n$ と $\pi(h)$ を代入して

$$
\begin{aligned}
\Pr_S\{|R(h)-\widehat R(h)|>b_{n,\delta}(h)\}
&\le2\exp[-2n\,b_{n,\delta}(h)^2]\\
&=2\exp[-\log(2/(\delta\pi(h)))]\\
&=\delta\pi(h).
\end{aligned}
$$

候補数が有限でも可算でも合併評価を使えるので、いずれかの候補が偏差界を破る確率は

$$
\Pr_S\{\exists h\in\mathcal H:
|R(h)-\widehat R(h)|>b_{n,\delta}(h)\}
\le\sum_{h\in\mathcal H}\delta\pi(h)\le\delta.
$$

したがって補事象上では全 $h$ に同時の二側偏差評価が成立する。これは標本に依存して選ばれた $\widetilde h$ を含む。[決定論的oracle不等式](#thm-slt1-13-deterministic-oracle)に $d(h)=b_{n,\delta}(h)$ を入れれば結論を得る。可測な選択子の仮定は、この結論を確率事象として扱うために置いた。
<!-- proof-end -->

この定理は $\operatorname{pen}=\lambda\Omega$ の任意の正則化が自動的に正しいことを意味しない。$\lambda\Omega(h)$ が $b_{n,\delta}(h)$ を下回る候補があるなら、上の相殺が使えない。逆に罰則を極端に大きくすると誤差を抑えるつもりが良い候補まで選ばなくなる。

## 5. モデルごとに複雑度を変える構造的リスク最小化

モデルを $j=1,\ldots,J$ と番号付けし、モデル $j$ の有限な候補集合 $\mathcal H_j$ の大きさを $M_j\ge1$ とする。例えば定数予測器の集合、少数の区切りで分類する集合、より細かい分類器の集合を別のモデルにできる。モデル同士が重なってもよい。比較する対象は関数単独ではなく、**モデル番号とその中の候補の組** $(j,h)$ である。

<a id="def-slt1-13-srm"></a>

<!-- formal-statement-start -->
> **定義（有限モデル族の構造的リスク最小化）**
> 標本抽選前に固定した非空有限クラス $\mathcal H_1,\ldots,\mathcal H_J$ と重み $w_j>0$（$\sum_{j=1}^Jw_j\le1$）を与える。$M_j=|\mathcal H_j|$ として
>
$$
c_j=\sqrt{\frac{\log[2M_j/(\delta w_j)]}{2n}}
$$
>
> を定め、$\widehat R(h)+c_j$ を全組 $(j,h)$、$h\in\mathcal H_j$ について比較する方法を**構造的リスク最小化**と呼ぶ。近似最小化子は組 $(\widetilde j,\widetilde h)$ とその最適化誤差 $\varepsilon_{\mathrm{opt}}$ で表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-13-srm -->
**定義の確認**。$\mathcal H_1=\{h_0\}$ と $\mathcal H_2=\{h_0,h_b\}$ を考える。$X\in\{a,b\}$、$Y=\boldsymbol1_{\{X=b\}}$、$P(X=b)=1/4$ とし、$h_0\equiv0$、$h_b(x)=\boldsymbol1_{\{x=b\}}$ とする。0–1損失なら $R(h_0)=1/4$、$R(h_b)=0$。$n=100,\delta=0.1,w_1=3/4,w_2=1/4$ で

$$
c_1=\sqrt{\frac{\log(80/3)}{200}}\approx0.1281,\qquad
c_2=\sqrt{\frac{\log160}{200}}\approx0.1593.
$$

標本中に $b$ が20回現れたなら、モデル1の最良目的値は $20/100+c_1\approx0.3281$、モデル2は $0+c_2\approx0.1593$ なので $(2,h_b)$ を選ぶ。どの候補についても損失は0または1、モデルサイズは1と2、重みは正で合計1と、定義の全条件を確認できる。モデル2に $h_0$ が重複していても、組 $(2,h_0)$ として数えれば合併評価は有効である。
<!-- definition-example-end -->

<a id="thm-slt1-13-srm-oracle"></a>

<!-- formal-statement-start -->
> **定理（有限モデル族の構造的リスク最小化oracle不等式）**
> $\mathcal H_1,\ldots,\mathcal H_J$ は標本抽選前に固定した有限で非空な可測予測器クラスとし、$S\sim P^n$ は独立同分布、$0\le\ell(h,z)\le1$ とする。$0<\delta<1$、$w_j>0$、$\sum_jw_j\le1$ とし、[構造的リスク最小化](#def-slt1-13-srm)の誤差 $\varepsilon_{\mathrm{opt}}\ge0$ の可測な出力 $(\widetilde j,\widetilde h)$ を用いる。このとき確率 $1-\delta$ 以上で
>
$$
R(\widetilde h)
\le\inf_{1\le j\le J}
\left\{\inf_{h\in\mathcal H_j}R(h)+2c_j\right\}
+\varepsilon_{\mathrm{opt}}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

モデル $j$ の全候補へ一人当たり $\delta w_j/M_j$ の失敗確率を割り当てる。モデル内とモデル間の二重の合併評価で同時事象を作り、組を候補と見なして[罰則付きERMの基本不等式](#lem-slt1-13-basic-inequality)を適用する。

<!-- proof-start -->
### 証明

固定した組 $(j,h)$ について[Hoeffding型偏差界](../SLT1-03/index.md#thm-slt1-03-fixed-risk)に $t=c_j$ を代入する。

$$
\Pr_S\{|R(h)-\widehat R(h)|>c_j\}
\le2e^{-2nc_j^2}
=2e^{-\log[2M_j/(\delta w_j)]}
=\frac{\delta w_j}{M_j}.
$$

モデル $j$ 内には $M_j$ 個の組があるので、その失敗確率の和は $\delta w_j$ 以下。さらに全モデルで合併すると

$$
\Pr_S\{\exists j,\exists h\in\mathcal H_j:
|R(h)-\widehat R(h)|>c_j\}
\le\sum_{j=1}^JM_j\frac{\delta w_j}{M_j}
=\delta\sum_{j=1}^Jw_j\le\delta.
$$

この同時事象上で組 $(j,h)$ を仮説と見なし、経験リスクを $\widehat R(h)$、母集団リスクを $R(h)$、罰則を $c_j$ と定める。組が重複する場合も有限集合として扱える。[二側偏差からの決定論的oracle不等式](#thm-slt1-13-deterministic-oracle)から

$$
R(\widetilde h)
\le\inf_{j,h\in\mathcal H_j}\{R(h)+2c_j\}
+\varepsilon_{\mathrm{opt}}
$$

を得る。$c_j$ は同じモデル内で定数だから、$j$ ごとの下限を先に取っても等しい。
<!-- proof-end -->

同じ例でoracleの右辺は $\min\{1/4+2c_1,\,0+2c_2\}=2c_2\approx0.3186$ となる。実際の選択リスクは0なので上界は満たされるが、定理が実際のリスクを正確に予言するわけではない。$\mathcal H_2$ の候補数が増えても同じ保証を維持したいなら、その分 $c_2$ が大きくなる。

## 6. 正則化が助ける場合・助けない場合

### 普通の $\lambda\Omega$ には別の検討が要る

よく使う形は $\operatorname{pen}(h)=\lambda\Omega(h)$（$\lambda\ge0,\Omega(h)\ge0$）である。$\Omega$ は係数ノルムなどの複雑さを測り、$\lambda$ がその重さを決める。例えば二乗損失と係数の二乗ノルムを組み合わせる方法がある。しかし二乗損失は一般に $[0,1]$ に収まらず、本章のHoeffding型の罰則をそのまま適用できない。

仮に全候補で $|R-\widehat R|\le\Delta$ が成立しているだけなら、[基本不等式](#lem-slt1-13-basic-inequality)から

$$
R(\widetilde h)
\le\inf_{h\in\mathcal H}\{R(h)+\lambda\Omega(h)\}
+2\Delta+\varepsilon_{\mathrm{opt}}
$$

とは言える。$\lambda\Omega(\widetilde h)\ge0$ を捨てた評価である。しかしこれだけでは $\lambda\Omega$ によって $\Delta$ が縮むとは示していない。「数値最適化で便利な罰則」と「偏差を統計的に覆う罰則」は役割が異なる。

### 罰則が大き過ぎる反例

入力が一点でラベル $Y=1$ が確実な二値分類を考える。$h_0\equiv0$、$h_1\equiv1$ とし、$\Omega(h_0)=0,\Omega(h_1)=1$ とする。どんな非空標本でも $R(h_0)=\widehat R(h_0)=1$、$R(h_1)=\widehat R(h_1)=0$ である。$\lambda>1$ なら

$$
Q_S(h_0)=1,\qquad Q_S(h_1)=\lambda>1
$$

なので正則化ERMは $h_0$ を選び、リスク1を負う。偏差は0なのに、過大な罰則だけで予測を悪化させる。失われたのは汎化の仮定ではなく、罰則による近似側の選択の良さである。

### 罰則を付けないと記憶する反例

$X$ は $\{1,\ldots,2n\}$ の各点を確率 $1/(2n)$ で取り、$Y=0$ とする。$h_0\equiv0$ に加えて、各部分集合 $A$ について「$x\in A$ なら0、それ以外は1」を返す $h_A$ を候補に入れる。訓練標本に出現した点の集合を $A_S$ と置くと $|A_S|\le n$ であり

$$
\widehat R(h_{A_S})=0=\widehat R(h_0),
\qquad R(h_{A_S})=1-\frac{|A_S|}{2n}\ge\frac12.
$$

無罰則ERMは同点のとき $h_{A_S}$ を選べてしまう。固定した各候補についての偏差評価は成立しても、$2^{2n}$ 個の候補から標本を見て選ぶ際には「全候補同時」の評価が必要である。罰則なしで固定候補の集中をそのまま出力へ使ったことが誤りである。

### 保証の適用範囲

- **モデル・重み・罰則を訓練標本で選ぶ場合**：前節の合併評価は、標本抽選前に固定された候補と重みに対するものである。標本を使ってモデルを作るなら、その構成自体を含めた一様評価、独立な検証標本、または別の算法依存理論が要る。
- **非有界の損失**：二乗損失などは、上限 $[0,1]$ を満たさなければ別の集中仮定が必要となる。
- **独立性がない標本**：同一データの反復コピーを独立標本 $n$ 個と扱えない。
- **罰則の小ささ**：罰則を増やすほど右辺の比較候補にも代価が加算される。統計的保証が成立することと、保証が鋭いことは別問題である。

次章では候補集合全体の一様偏差を測る代わりに、学習算法が訓練点一つの置換でどれほど変わるかを調べる。

## 演習

**問題 SLT1-13-A01（罰則付きの選択と最適化誤差）**
- Level: A

三候補 $h_1,h_2,h_3$ の経験リスクは $(0.12,0.08,0.04)$、罰則は $(0.01,0.06,0.14)$ とする。厳密な罰則付きERMを選び、各候補を近似最小化子とするのに必要な最小 $\varepsilon_{\mathrm{opt}}$ を求めよ。

<!-- solution-start -->
**詳細解答**。[近似罰則付きERMの定義](#def-slt1-13-penalized-erm)に従って目的値を足すと

$$
Q(h_1)=0.12+0.01=0.13,\quad
Q(h_2)=0.08+0.06=0.14,\quad
Q(h_3)=0.04+0.14=0.18.
$$

最小値は $0.13$ で、厳密な出力は $h_1$。各候補の目的値から $0.13$ を引くと、必要な誤差は順に $0,0.01,0.05$ である。最小化誤差は真のリスク差ではなく**経験目的値の差**で定義される。
<!-- solution-end -->

**問題 SLT1-13-A02（基本不等式の数値検査）**
- Level: A

比較候補 $h$ と出力 $\widetilde h$ について $R(h)=0.18,\widehat R(h)=0.20,\operatorname{pen}(h)=0.08$、$R(\widetilde h)=0.21,\widehat R(\widetilde h)=0.17,\operatorname{pen}(\widetilde h)=0.10$、$\varepsilon_{\mathrm{opt}}=0$ とする。経験目的値の比較を確かめ、基本不等式の右辺を算出せよ。

<!-- solution-start -->
**詳細解答**。出力の目的値は $0.17+0.10=0.27$、比較候補は $0.20+0.08=0.28$ なので近似ERM条件を満たす。リスク差は $0.21-0.18=0.03$。[基本不等式](#lem-slt1-13-basic-inequality)の右辺は

$$
(0.21-0.17)+(0.20-0.18)+0.08-0.10
=0.04+0.02-0.02=0.04.
$$

$0.03\le0.04$ であり、大小の向きが一致する。正の $R(\widetilde h)-\widehat R(\widetilde h)$ を逆符号にしない。
<!-- solution-end -->

**問題 SLT1-13-A03（候補別信頼半径）**
- Level: A

$n=100,\delta=0.1$、二候補の重みが $(3/4,1/4)$ のとき、信頼半径をそれぞれ求め、罰則に $0.12$ を両候補へ等しく使う案が定理の条件を満たすか判定せよ。

<!-- solution-start -->
**詳細解答**。[候補別信頼半径](#def-slt1-13-weighted-radius)に代入すると

$$
b_0=\sqrt{\frac{\log(2/(0.1\cdot0.75))}{200}}
=\sqrt{\frac{\log(80/3)}{200}}\approx0.1281,
$$

$$
b_1=\sqrt{\frac{\log(2/(0.1\cdot0.25))}{200}}
=\sqrt{\frac{\log80}{200}}\approx0.1480.
$$

$0.12<0.1281$ かつ $0.12<0.1480$ なので両方で罰則が半径を下回り、[高確率oracle定理](#thm-slt1-13-weighted-oracle)の罰則条件を満たさない。ただし「定理を適用できない」は「その出力のリスクが必ず悪い」という意味ではない。
<!-- solution-end -->

**問題 SLT1-13-A04（モデル族の目的値）**
- Level: A

モデルの大きさ $M_1=1,M_2=2$、重み $w_1=3/4,w_2=1/4$、$n=100,\delta=0.1$ とする。各モデルの最良経験リスクが $0.20,0$ なら構造的リスク最小化はどちらを選ぶか。罰則と目的値を全て示せ。

<!-- solution-start -->
**詳細解答**。[構造的リスク最小化](#def-slt1-13-srm)により

$$
c_1=\sqrt{\frac{\log(2/(0.1\cdot0.75))}{200}}\approx0.1281,
\qquad
c_2=\sqrt{\frac{\log(4/(0.1\cdot0.25))}{200}}\approx0.1593.
$$

各モデル内で最良の目的値は $0.20+0.1281=0.3281$、$0+0.1593=0.1593$。小さい方のモデル2を選ぶ。モデルの**番号**ではなく、罰則を含む目的値が小さい組を選んでいる。
<!-- solution-end -->

**問題 SLT1-13-A05（過大罰則）**
- Level: A

入力もラベルも確定的で $Y=1$、$h_0\equiv0,h_1\equiv1$、$\Omega(h_0)=0,\Omega(h_1)=1$ とする。0–1損失に $\lambda\Omega$ を加えた出力を $\lambda<1,\lambda=1,\lambda>1$ で分類し、リスクを求めよ。

<!-- solution-start -->
**詳細解答**。$\widehat R(h_0)=R(h_0)=1$、$\widehat R(h_1)=R(h_1)=0$ なので $Q(h_0)=1,Q(h_1)=\lambda$。$\lambda<1$ なら $h_1$ を選びリスク0、$\lambda>1$ なら $h_0$ を選びリスク1。$\lambda=1$ では目的値が等しいため、どちらも厳密最小化子となり、そのリスクは0または1である。母集団と経験の偏差は両候補とも0であり、問題は罰則そのものが大き過ぎることにある。
<!-- solution-end -->

**問題 SLT1-13-B01（任意の正則化係数で言えること）**
- Level: B

非空有限クラス $\mathcal H$ の大きさを $M$ とし、$0\le\ell_h\le1$、独立同分布標本、標本抽選前に固定した $\Omega(h)\ge0$、$\lambda\ge0$ を仮定する。誤差 $\varepsilon_{\mathrm{opt}}$ の $\lambda\Omega$ 付きERMについて、確率 $1-\delta$ 以上で

$$
R(\widetilde h)
\le\inf_h\{R(h)+\lambda\Omega(h)\}
+2\sqrt{\frac{\log(2M/\delta)}{2n}}
+\varepsilon_{\mathrm{opt}}
$$

を導け。この式だけから「正則化で汎化項が改善した」と言えない理由も述べよ。

<!-- solution-start -->
**詳細解答**。[有限クラスの同時偏差界](../SLT1-03/index.md#thm-slt1-03-finite-uniform)を $t=\sqrt{\log(2M/\delta)/(2n)}$ へ適用すると、確率 $1-\delta$ 以上で全候補の絶対偏差が $t$ 以下になる。[基本不等式](#lem-slt1-13-basic-inequality)を任意の比較候補 $h$ へ使い

$$
\begin{aligned}
R(\widetilde h)
&\le R(h)+t+t+\lambda\Omega(h)-\lambda\Omega(\widetilde h)
+\varepsilon_{\mathrm{opt}}\\
&\le R(h)+\lambda\Omega(h)+2t+\varepsilon_{\mathrm{opt}},
\end{aligned}
$$

とする。最後の不等号は $\lambda\Omega(\widetilde h)\ge0$ から従う。全 $h$ について下限を取れば目的の式を得る。右辺の $2t$ は無罰則の有限クラス界と同じ大きさであり、$\lambda$ が $t$ を小さくした証明はない。罰則が偏差を候補別に覆うという追加の構造が必要である。
<!-- solution-end -->

**問題 SLT1-13-B02（可算クラスの合併評価）**
- Level: B

$\mathcal H=\{h_1,h_2,\ldots\}$ に $\pi(h_k)=2^{-k}$ を割り当てる。重み条件を確認し、$b_{n,\delta}(h_k)$ を $k,n,\delta$ で表し、$k$ が大きいほど罰則がどうなるか示せ。各候補の失敗確率の合計も求めよ。

<!-- solution-start -->
**詳細解答**。幾何級数から $\sum_{k=1}^{\infty}2^{-k}=1$、各重みは正で、標本と独立に定まる。信頼半径は

$$
b_{n,\delta}(h_k)
=\sqrt{\frac{\log(2^{k+1}/\delta)}{2n}}
=\sqrt{\frac{(k+1)\log2+\log(1/\delta)}{2n}}.
$$

$k$ に対して単調増加であり、$\sqrt{k/n}$ の規模になる。[固定候補のHoeffding界](../SLT1-03/index.md#thm-slt1-03-fixed-risk)での失敗確率は候補 $k$ について高々 $\delta2^{-k}$、合併して $\sum_k\delta2^{-k}=\delta$。可算個の候補から訓練後に選んでも、この同時事象の上なら保証が成立する。
<!-- solution-end -->

**問題 SLT1-13-B03（達成されない最小値と近似誤差）**
- Level: B

可算クラスで $\inf_h\{R(h)+2\operatorname{pen}(h)\}$ が達成されないとする。決定論的oracle不等式がなお成立することを、任意の $\eta>0$ の近似候補を使って導け。また最適化誤差 $\varepsilon_{\mathrm{opt}}$ と $\eta$ を混同してはいけない理由を述べよ。

<!-- solution-start -->
**詳細解答**。$I=\inf_h\{R(h)+2\operatorname{pen}(h)\}$ は有限であるとする。下限の定義より任意の $\eta>0$ に対し候補 $h_\eta$ が存在し $R(h_\eta)+2\operatorname{pen}(h_\eta)<I+\eta$ となる。[決定論的oracle定理](#thm-slt1-13-deterministic-oracle)の証明で得た比較候補ごとの式に代入すると

$$
R(\widetilde h)
\le R(h_\eta)+2\operatorname{pen}(h_\eta)+\varepsilon_{\mathrm{opt}}
<I+\eta+\varepsilon_{\mathrm{opt}}.
$$

左辺は $\eta$ と無関係で、任意の $\eta>0$ に成立するから $\eta\downarrow0$ として $R(\widetilde h)\le I+\varepsilon_{\mathrm{opt}}$。$\eta$ は証明中で選ぶ比較候補の近似精度、$\varepsilon_{\mathrm{opt}}$ は算法が標本上で目的関数を最小化する精度であり、別の量である。
<!-- solution-end -->

**問題 SLT1-13-B04（記憶学習器と合併評価）**
- Level: B

$X$ が $\{1,\ldots,2n\}$ の各点を確率 $1/(2n)$ で取り、$Y=0$ であり、$\mathcal H=\{h_0\}\cup\{h_A:A\subseteq\{1,\ldots,2n\}\}$、$h_0\equiv0$、$h_A(x)=\boldsymbol1_{\{x\notin A\}}$ とする。観測した点の集合 $A_S$ を使い $\widehat R(h_{A_S})$ と $R(h_{A_S})$ を求めよ。固定クラスの大きさに基づく一様半径が $n\to\infty$ でも0にならないことを計算し、どの仮定が使えないわけではないか説明せよ。

<!-- solution-start -->
**詳細解答**。全ての観測点 $X_i$ は $A_S$ に含まれるため $h_{A_S}(X_i)=0=Y_i$、従って $\widehat R(h_{A_S})=0$。一方、母集団では $A_S$ 外の入力を誤分類するので

$$
R(h_{A_S})=P(X\notin A_S)
=\frac{2n-|A_S|}{2n}\ge\frac12,
$$

である。$h_0$ も経験リスク0で、無罰則の同点選択が危険となる。相異なる $h_A$ は $2^{2n}$ 個あり、$h_0=h_{\{1,\ldots,2n\}}$ だから $\mathcal H$ の大きさは $M=2^{2n}$。有限クラスの一様偏差半径は

$$
\sqrt{\frac{\log(2M/\delta)}{2n}}
=\sqrt{\log2+\frac{\log(2/\delta)}{2n}}
\longrightarrow\sqrt{\log2}>0.
$$

損失有界性・標本の独立同分布性・候補集合の標本前固定性は失われていない。候補数が標本数とともに指数的に増えているので、保証の半径が収縮しない。候補を出力後に「固定候補」とみなしてHoeffdingを適用することは許されない。
<!-- solution-end -->

**問題 SLT1-13-C01（三モデルでのoracle選択）**
- Level: C

$S\sim P^n$ は独立同分布、全候補の損失は $[0,1]$ に収まるとし、モデルと重みは標本抽選前に固定する。$n=200,\delta=0.05$、有限モデル $\mathcal H_1,\mathcal H_2,\mathcal H_3$ の大きさは $(1,4,16)$、事前重みは $(1/2,1/4,1/4)$ とする。各モデル内の最良経験リスクが $(0.22,0.14,0.12)$ で、厳密な構造的リスク最小化を行う。

1. 各罰則 $c_j$ を4桁程度で求め、選ばれるモデルを決定せよ。
2. $\mathcal H_2$ 内に真のリスク $0.16$ の候補があるなら、確率 $0.95$ 以上で成立する選択リスクの上界を求めよ。
3. Bayesリスクが $R^\star=0.10$ なら、その上界を近似側・統計側・最適化側に分解せよ。さらに、同じデータでモデル・重みを選び直したとき元の証明を使えない理由を示せ。

<!-- solution-start -->
**詳細解答**。まず $w_1+w_2+w_3=1$、全モデルは有限、$n\ge1$、$0<\delta<1$ である。$S\sim P^n$、$0\le\ell_h\le1$、モデルと重みの標本前固定性を仮定することで[構造的リスク最小化の定理](#thm-slt1-13-srm-oracle)を適用できる。

1. 各モデルに[罰則の式](#def-slt1-13-srm)を代入すると

$$
\begin{aligned}
c_1&=\sqrt{\frac{\log[2/(0.05\cdot0.5)]}{400}}
=\sqrt{\frac{\log80}{400}}\approx0.1047,\\
c_2&=\sqrt{\frac{\log[8/(0.05\cdot0.25)]}{400}}
=\sqrt{\frac{\log640}{400}}\approx0.1271,\\
c_3&=\sqrt{\frac{\log[32/(0.05\cdot0.25)]}{400}}
=\sqrt{\frac{\log2560}{400}}\approx0.1401.
\end{aligned}
$$

したがって各モデルの最良の罰則付き目的値は $0.22+0.1047\approx0.3247$、$0.14+0.1271\approx0.2671$、$0.12+0.1401\approx0.2601$。最小はモデル3である。経験リスクの最小値だけでなく、罰則を含む値を比較した。

2. 同じ定理は選択されたモデルだけでなく任意の比較モデルに対し同時に成立する。モデル2のリスク $0.16$ の候補を比較相手に取れば、確率 $0.95$ 以上で

$$
R(\widetilde h)\le0.16+2c_2+0
\approx0.16+0.2542=0.4142.
$$

ここで $2c_2$ を使うのは、選択モデル3の罰則ではなく比較相手の罰則が右辺に残るからである。

3. 上の式から $R^\star=0.10$ を引くと

$$
R(\widetilde h)-R^\star
\le\underbrace{(0.16-0.10)}_{\text{近似側 }0.06}
+\underbrace{2c_2}_{\text{統計側 約 }0.2542}
+\underbrace{0}_{\text{最適化側}}
\approx0.3142.
$$

モデル2・その候補の真のリスクを知る神託との比較であって、学習器が真のリスクを観測したという意味ではない。もし同じ標本からモデルや重みを新たに決めたなら、$2e^{-2nc_j^2}=\delta w_j/M_j$ を**固定した**組に適用して足す証明が成立しない。新たな探索候補も含む固定クラスの同時評価、あるいは独立検証標本などが必要となる。
<!-- solution-end -->
