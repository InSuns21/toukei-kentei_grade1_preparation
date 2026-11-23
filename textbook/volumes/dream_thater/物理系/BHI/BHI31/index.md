# BHI31 ensemble平均とfactorization問題

## 1. 一つの理論の積と、理論を平均した後の積は違う

[BHI29の二境界JTの連結積分](../BHI29/index.md#prop-bhi29-double-trumpet)では、二つの熱的境界を結ぶ幾何が零でない振幅を与えました。[BHI30の正規化レプリカ微分](../BHI30/index.md#prop-bhi30-normalization-derivative)を放射エントロピーへ使う際にも、どの理論・どの状態の分配関数を計算しているかが必要です。

ここでは一つの量子系に固定したHamiltonian $H$ と、その分配関数 $Z_H(\beta)=\operatorname{Tr}_{\mathcal H}e^{-\beta H}$ を出発点にします。$\beta>0$ は逆温度で、トレースが有限であるとします。二つの境界に同じ固定理論の**相互作用しない別コピー**を置くなら、それぞれの逆温度が $\beta_1,\beta_2$ でも全分配関数は積になります。一方、$H$ 自体を確率的に選び、両方の境界が**同じ抽選結果**を共有すると、平均した積と平均の積は異なり得ます。これがensemble（理論の集合上の確率平均）を導入する理由です。

最小例として、Hamiltonianが数 $0$ の一次元理論と、数 $\log 2$ の一次元理論を、それぞれ確率 $1/2$ で選ぶことを考えます。逆温度 $\beta=1$ の分配関数は $1$ または $1/2$ です。同じ理論を二境界に使う場合の積の平均は $5/8$、別々に平均した積は $9/16$ になります。差の $1/16$ は、境界間の直接相互作用ではなく、**共有された理論の選択**から生まれます。

## 2. 固定理論で因数分解が成り立つ条件

「因数分解」は二つの異なる問いに現れます。[BHI15のゲージ制約とHilbert空間の非自明な分割](../BHI15/index.md#prop-bhi15-factorization-obstruction)は、*一つの系を内部と外部へ分割する*問題でした。今回は、**二つの相互作用しない境界系の分配関数**に注目します。両者は同じ定理ではありません。

<a id="def-bhi31-fixed-factorization"></a>

<!-- formal-statement-start -->
> **定義（固定理論の二境界因数分解）**  
> 固定した自己共役Hamiltonian $H$ がHilbert空間 $\mathcal H$ に作用し、$\beta_1,\beta_2>0$ で $Z_H(\beta_i)<\infty$ とする。同じ理論の相互作用しない二コピーのHilbert空間を $\mathcal H\otimes\mathcal H$、全Hamiltonianを $H_{12}=H\otimes I+I\otimes H$ と定める。この二境界分配関数が
>
$$
Z_{H,12}(\beta_1,\beta_2)=Z_H(\beta_1)Z_H(\beta_2)
$$
>
> を満たす性質を、この設定での**固定理論の二境界因数分解**と呼ぶ。二コピー間の結合や、共有変数への平均はこの定義に含めない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi31-fixed-factorization -->
**定義の確認**：$\mathcal H=\mathbb C^2$、$H=\operatorname{diag}(0,\Delta)$、$\Delta>0$ とします。$Z_H(\beta)=1+e^{-\beta\Delta}$ は有限です。二コピーのエネルギーは $0,\Delta,\Delta,2\Delta$ なので
$$
Z_{H,12}=1+e^{-\beta_1\Delta}+e^{-\beta_2\Delta}
+e^{-(\beta_1+\beta_2)\Delta}
=(1+e^{-\beta_1\Delta})(1+e^{-\beta_2\Delta}).
$$
同じ固定 $\Delta$ を用いても、二コピーが相互作用しない限り因数分解します。
<!-- definition-example-end -->

<a id="prop-bhi31-tensor-trace"></a>

<!-- formal-statement-start -->
> **命題（独立二コピーのトレースの積）**  
> 定義で指定した固定 $H$ に対し、二コピーの異なる逆温度を持つ熱演算子
>
$$
e^{-\beta_1H}\otimes e^{-\beta_2H}
$$
>
> のトレースは $Z_H(\beta_1)Z_H(\beta_2)$ に等しい。従って、相互作用しない固定理論の二境界分配関数の連結差 $Z_{H,12}-Z_H(\beta_1)Z_H(\beta_2)$ は零である。
<!-- formal-statement-end -->

### 証明の見取り図

二つのコピーの基底を独立に選び、二重和を二つの和の積へ分けます。固定された $H$ を平均する操作は一切ありません。

<!-- proof-start -->
### 証明

有限次元では $H$ の固有値を $E_a$、固有ベクトルを $|a\rangle$ とします。$H\otimes I$ と $I\otimes H$ は交換するので、$|a\rangle\otimes|b\rangle$ 上で異なる逆温度のBoltzmann因子は $e^{-\beta_1E_a-\beta_2E_b}$ です。従って
$$
\operatorname{Tr}_{\mathcal H\otimes\mathcal H}
(e^{-\beta_1H}\otimes e^{-\beta_2H})
=\sum_{a,b}e^{-\beta_1E_a}e^{-\beta_2E_b}
=\left(\sum_a e^{-\beta_1E_a}\right)
 \left(\sum_b e^{-\beta_2E_b}\right).
$$
無限次元でも、仮定した正のトレース級演算子について非負項の二重和を交換でき、同じ結果になります。$\square$
<!-- proof-end -->

この恒等式の結論は「任意の重力経路積分は必ず非連結」という意味ではありません。固定理論のどの量と重力側の経路積分を同一視するか、境界同士が真に独立かを先に指定する必要があります。

## 3. ensemble平均と連結相関を、有限模型で定義する

ensembleでは、理論のラベル $a$ が有限集合 $\mathcal A$ を動き、選択確率は $p_a>0$、$\sum_a p_a=1$ とします。各理論で分配関数 $Z_a(\beta)>0$ が有限であると仮定します。同じ $a$ を二つの境界で共有する平均と、各境界で独立に $a,b$ を選ぶ平均を区別します。

<a id="def-bhi31-ensemble-connected"></a>

<!-- formal-statement-start -->
> **定義（ensembleの二境界連結相関）**  
> 上の有限ensembleにおいて、同じ理論ラベルを共有する二境界平均を $\langle Z_1Z_2\rangle_{\mathcal E}=\sum_a p_aZ_a(\beta_1)Z_a(\beta_2)$、一境界平均を $\langle Z_i\rangle_{\mathcal E}=\sum_a p_aZ_a(\beta_i)$ とする。これらの差
>
$$
C_{\mathcal E}(\beta_1,\beta_2)
=\langle Z_1Z_2\rangle_{\mathcal E}
-\langle Z_1\rangle_{\mathcal E}\langle Z_2\rangle_{\mathcal E}
$$
>
> を二境界の**連結相関**（共分散）と定義する。$\mathcal E$ は理論ラベル上の確率平均を表し、放射状態の量子期待値とは区別する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi31-ensemble-connected -->
**定義の確認**：$\mathcal A=\{0,1\}$、$p_0=p_1=1/2$、$Z_0(1)=1$、$Z_1(1)=1/2$ とします。両方正で、確率は $1/2+1/2=1$ です。同じラベルの平均は $\langle Z_1Z_2\rangle=(1+1/4)/2=5/8$、各平均は $3/4$ なので
$$
C_{\mathcal E}(1,1)=\frac58-\frac{9}{16}=\frac1{16}>0.
$$
個々の $a$ では $Z_a(1)^2$ へ因数分解するのに、ensemble平均では連結相関が残ります。
<!-- definition-example-end -->

<a id="prop-bhi31-shared-vs-independent"></a>

<!-- formal-statement-start -->
> **命題（同じ理論の共有と独立抽選の差）**  
> $X_a=Z_a(\beta_1)$、$Y_a=Z_a(\beta_2)$ とする。両境界が同じラベル $a$ を確率 $p_a$ で共有する場合と、互いに独立なラベル $a,b$ を確率 $p_ap_b$ で選ぶ場合の二境界平均の差は、ちょうど $C_{\mathcal E}(\beta_1,\beta_2)$ である。とくに $\beta_1=\beta_2=\beta$ なら
>
$$
C_{\mathcal E}(\beta,\beta)
=\sum_a p_a\bigl(Z_a(\beta)-\langle Z(\beta)\rangle_{\mathcal E}\bigr)^2\ge0,
$$
>
> 等号成立は、すべての正確率ラベルで $Z_a(\beta)$ が同一のとき、かつそのときに限る。
<!-- formal-statement-end -->

### 証明の見取り図

共有抽選は一重和、独立抽選は二重和です。後者だけが独立性によって積に分かれ、同温度での差は平方和になります。

<!-- proof-start -->
### 証明

共有抽選では期待積は $\sum_a p_aX_aY_a$。独立抽選では
$$
\sum_{a,b}p_ap_bX_aY_b
=\left(\sum_a p_aX_a\right)\left(\sum_b p_bY_b\right).
$$
差を取れば定義した $C_{\mathcal E}$ です。$\beta_1=\beta_2$ とし、$\mu=\sum_a p_aZ_a(\beta)$ とおくと
$$
\sum_a p_a(Z_a-\mu)^2
=\sum_a p_aZ_a^2-2\mu\sum_a p_aZ_a+\mu^2\sum_a p_a
=\sum_a p_aZ_a^2-\mu^2.
$$
右辺は $C_{\mathcal E}(\beta,\beta)$ です。各 $p_a>0$ なので平方和が零なら各 $Z_a=\mu$ です。$\square$
<!-- proof-end -->

**異温度では符号に注意**：$C_{\mathcal E}(\beta_1,\beta_2)$ は一般の二つの確率変数の共分散です。異なる逆温度での値がいつも非負だという一般定理ではありません。例えば二つのラベルに対し $(X_a,Y_a)=(2,1),(1,2)$、等確率なら共分散は $-1/4$ です。この組が特定の熱分配関数に対応するかは、別途スペクトル条件を確かめる必要があります。

### 一次元Hamiltonianの一般式

二つの理論がそれぞれ $H_0=(0)$、$H_1=(\Delta)$（$\Delta>0$）で、後者を選ぶ確率を $p\in(0,1)$ とします。$Z_0(\beta)=1$、$Z_1(\beta)=e^{-\beta\Delta}$ です。$q_i=e^{-\beta_i\Delta}$ と置くと
$$
\langle Z_i\rangle=(1-p)+pq_i,\qquad
\langle Z_1Z_2\rangle=(1-p)+pq_1q_2.
$$
差を計算すると
$$
C_{\mathcal E}
=(1-p)+pq_1q_2-[(1-p)+pq_1][(1-p)+pq_2]
=p(1-p)(1-q_1)(1-q_2).
$$
この特定の模型では $\beta_i,\Delta>0$ から $0<q_i<1$ となり、異温度でも正です。一般の共分散の符号についての主張と混同しないでください。

## 4. 重力の連結幾何が計算するもの

二つの境界の逆温度を固定した重力の全振幅を $G_2(\beta_1,\beta_2)$、一境界の全振幅を $G_1(\beta)$ と書きます。同じ正則化と境界条件を使い、二境界の非連結成分が $G_1(\beta_1)G_1(\beta_2)$ を再現する場合に、差
$$
G_2(\beta_1,\beta_2)-G_1(\beta_1)G_1(\beta_2)
$$
が連結幾何の寄与を集めます。これは**重力経路積分の計算量**の定義であり、この段階で固定境界Hamiltonianの積でもensembleの共分散でもありません。

純粋・向き付きEuclid JT重力の標準的な正規化を選ぶと、種数0・二境界のdouble-trumpet（円筒）の寄与を手で積分できます。[BHI29のdouble-trumpet命題](../BHI29/index.md#prop-bhi29-double-trumpet)のトランペット核を用い、測地線の長さ $b>0$ を接着するときの測度は $b\,db$ です。

<a id="def-bhi31-jt-connected-kernel"></a>

<!-- formal-statement-start -->
> **定義（純粋JTの先頭二境界連結核）**  
> $\beta_1,\beta_2>0$、$b\ge0$ とする。トランペット核と、その二つを貼った種数0連結核を次で指定する。
>
$$
T(\beta,b)=\frac{1}{\sqrt{2\pi\beta}}\exp\left(-\frac{b^2}{2\beta}\right),
\qquad
K(\beta_1,\beta_2)=\int_0^\infty b\,db\,T(\beta_1,b)T(\beta_2,b).
$$
>
> この $K$ は当該規約の純粋JT二境界振幅の種数0連結項であり、放射浴のレプリカ分配関数そのものではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi31-jt-connected-kernel -->
**定義の確認**：$\beta_1=\beta_2=1$ なら核の積は $(2\pi)^{-1}e^{-b^2}$ です。$b\,db$ の積分は $u=b^2$ と置けば
$$
K(1,1)=\frac1{2\pi}\int_0^\infty b e^{-b^2}\,db
=\frac1{4\pi}\int_0^\infty e^{-u}\,du=\frac1{4\pi}>0.
$$
積分は原点・無限遠ともに収束します。
<!-- definition-example-end -->

<a id="prop-bhi31-trumpet-gram"></a>

<!-- formal-statement-start -->
> **命題（JT連結核の計算とGram性）**  
> 上の $K$ について、すべての $\beta_1,\beta_2>0$ で
>
$$
K(\beta_1,\beta_2)
=\frac{\sqrt{\beta_1\beta_2}}{2\pi(\beta_1+\beta_2)}>0
$$
>
> が成立する。さらに任意の正の逆温度 $\beta_1,\ldots,\beta_m$ と実係数 $c_1,\ldots,c_m$ に対し
>
$$
\sum_{i,j=1}^m c_ic_jK(\beta_i,\beta_j)\ge0.
$$
>
> したがってこの核は、実確率変数の共分散核に必要な半正定値性を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

二つのGaussian因子を掛けて $b$ で積分します。二次形式は積分記号の中で一つの平方になります。

<!-- proof-start -->
### 証明

核を代入すると
$$
K=\frac1{2\pi\sqrt{\beta_1\beta_2}}
\int_0^\infty b\exp\left[-\frac{\beta_1+\beta_2}{2\beta_1\beta_2}b^2\right]db.
$$
$A=(\beta_1+\beta_2)/(2\beta_1\beta_2)>0$ と置き、$u=Ab^2$ なら $b\,db=du/(2A)$ なので
$$
\int_0^\infty b e^{-Ab^2}\,db
=\frac1{2A}\int_0^\infty e^{-u}\,du
=\frac{\beta_1\beta_2}{\beta_1+\beta_2}.
$$
これを前因子へ戻して第一式を得ます。二次形式については、有限和と収束する積分を交換して
$$
\sum_{i,j}c_ic_jK(\beta_i,\beta_j)
=\int_0^\infty b\,db\,
\left(\sum_i c_iT(\beta_i,b)\right)^2\ge0.
$$
$b\ge0$ かつ括弧内が実数なので成立します。$\square$
<!-- proof-end -->

この半正定値性は、ensemble共分散という**解釈と整合する必要条件**です。しかし $K$ だけからensembleの確率測度が一意に決まるわけでも、固定した任意の境界理論の微視的同一性が証明されるわけでもありません。純粋JT重力の位相展開が特定の二重スケーリング行列積分の展開と対応することは、Saad–Shenker–Stanfordの具体的な構成によって支えられています。単なる核の正値性だけがその対応の証明ではありません。

## 5. factorization問題はどの等式の衝突か

相互作用しない**固定境界理論** $H$ があると仮定すれば、[独立二コピーのトレース](#prop-bhi31-tensor-trace)から
$$
Z_{H,12}(\beta_1,\beta_2)-Z_H(\beta_1)Z_H(\beta_2)=0.
$$
ところが、その同じ量を重力経路積分 $G_2$ と同一視し、非連結成分が $G_1G_1$ で、[二境界連結核](#prop-bhi31-trumpet-gram)などの非零項もそのまま残ると解釈すると、零ではない差を予言します。**この両立しない同一視こそfactorization問題**です。

一方、重力の多境界振幅をあるensembleの平均へ対応させるなら、比較すべき等式は
$$
G_1(\beta)\ \longleftrightarrow\ \langle Z_H(\beta)\rangle_{\mathcal E},
\qquad
G_2(\beta_1,\beta_2)\ \longleftrightarrow\
\langle Z_H(\beta_1)Z_H(\beta_2)\rangle_{\mathcal E}.
$$
ここで連結差は[ensembleの共分散](#def-bhi31-ensemble-connected)であり、各**固定** $H$ の積の恒等式とは矛盾しません。同じ $H$ を両方に入れてから平均することと、別々に平均してから掛けることが異なるからです。

Harlow–Jafferisは、二境界系のHilbert空間因数分解と重力側の制約の緊張をJT模型で分析しました。Saad–Shenker–Stanfordは、純粋JTの多境界・位相展開と行列積分の対応を具体的に示しました。両論点を合わせても「すべての重力理論の境界理論はランダムに選ばれる」という結論にはなりません。固定した理論を得るための追加データ、非摂動的な寄与、状態・超選択セクターの指定などは、考えている構成ごとに検証する必要があります。

| 比較する対象 | 一境界 | 二境界 | 連結差 |
| --- | --- | --- | --- |
| 固定 $H$ の独立二コピー | $Z_H(\beta)$ | $Z_H(\beta_1)Z_H(\beta_2)$ | $0$ |
| 同じ $H$ を共有するensemble | $\langle Z_H(\beta)\rangle$ | $\langle Z_H(\beta_1)Z_H(\beta_2)\rangle$ | 共分散 |
| 純粋JTの経路積分 | $G_1(\beta)$ | $G_2(\beta_1,\beta_2)$ | double-trumpet等の連結項 |

## 6. 平均した分配関数から「一つの放射状態」へ飛ばない

放射のレプリカでは、[BHI28の規格化されたモーメント](../BHI28/index.md#prop-bhi28-sewing-trace)が出発点です。ここで分配関数の平均を入れると、**平均する前に正規化するか、平均した後に正規化するか**の違いが生じます。二つの量は同じではありません。

<a id="def-bhi31-normalization-orders"></a>

<!-- formal-statement-start -->
> **定義（ensembleにおけるレプリカ規格化の順序）**  
> 有限ensembleの各ラベル $a$ で未規格化の正値演算子 $A_a$ があり、$z_a=\operatorname{Tr}A_a>0$、$z_{n,a}=\operatorname{Tr}A_a^n$ とする。各理論内で先に正規化した平均モーメントと、分配関数を先に平均してから規格化した比を、それぞれ
>
$$
M_n^{\rm fixed\text{-}first}
=\sum_a p_a\frac{z_{n,a}}{z_a^n},
\qquad
M_n^{\rm average\text{-}first}
=\frac{\sum_a p_a z_{n,a}}{(\sum_a p_a z_a)^n}
$$
>
> と定義する。前者は $\rho_a=A_a/z_a$ に対する $\sum_a p_a\operatorname{Tr}\rho_a^n$ だが、後者は一般には個々の正規化状態のモーメントの平均ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi31-normalization-orders -->
**定義の確認**：それぞれ一次元の正値演算子 $A_0=(1)$、$A_1=(2)$ を等確率で選びます。$z_0=1,z_1=2$、$z_{2,0}=1,z_{2,1}=4$ なので、両方の定義で $n=1$ の値は1です。一方
$$
M_2^{\rm fixed\text{-}first}=\frac12(1+4/4)=1,\quad
M_2^{\rm average\text{-}first}=\frac{(1+4)/2}{[(1+2)/2]^2}
=\frac{10}{9}>1.
$$
$\rho_0=\rho_1=(1)$ は純粋状態で、正規化した密度演算子の二次モーメントは1を超えません。第二の比はそのような物理的モーメントと無条件に同一視できません。
<!-- definition-example-end -->

<a id="prop-bhi31-normalization-counterexample"></a>

<!-- formal-statement-start -->
> **命題（ensemble平均とレプリカ規格化の非可換性）**  
> 有限ensembleで正値の $z_a,z_{n,a}$ を与えても、$M_n^{\rm fixed\text{-}first}=M_n^{\rm average\text{-}first}$ は一般には成り立たない。両者が $n=1$ で1に等しいという条件だけでは、$n>1$ における一致も、密度演算子のモーメントとしての許容性も保証されない。
<!-- formal-statement-end -->

### 証明の見取り図

一次元の二つの正値演算子を使えば、個々の状態を正規化した後の二次モーメントは常に1です。一方、平均の分母は二乗前に平均され、分子の平均二乗と食い違います。

<!-- proof-start -->
### 証明

前の直接例は仮定をすべて満たします。$n=1$ ではどちらも $\sum_a p_az_a/\sum_a p_az_a=1$ です。$n=2$ で前者は1、後者は $10/9$ で異なります。一般に任意の密度演算子 $\rho$ の固有値 $\lambda_j$ は非負で $\sum_j\lambda_j=1$ だから $0\le\lambda_j\le1$ であり、$\operatorname{Tr}\rho^2=\sum_j\lambda_j^2\le\sum_j\lambda_j=1$ です。よって後者をそのような状態の二次モーメントとみなすこともできません。$\square$
<!-- proof-end -->

この違いは、[BHI30の極限と正規化](../BHI30/index.md#prop-bhi30-mixture-limits)をensemble付きの重力計算へ応用する際に効きます。特に、$\log\langle Z\rangle$ と $\langle\log Z\rangle$ も異なる量です。正の $Z_a$ に対して、$\mu=\sum_ap_aZ_a$ とおき、実数 $x>0$ に成り立つ $\log x\le x-1$ を $x=Z_a/\mu$ へ適用すると
$$
\sum_a p_a\log\frac{Z_a}{\mu}
\le \sum_a p_a\left(\frac{Z_a}{\mu}-1\right)=0.
$$
したがって $\langle\log Z\rangle\le\log\langle Z\rangle$ で、全 $Z_a$ が同じときだけ等号となります。例えば $Z=1,1/2$ を等確率で選ぶと、左辺は $-\frac12\log2$、右辺は $\log(3/4)$ です。

## 7. 何を計算したかを固定する

| 論点 | 確定できること | 追加で必要な入力 |
| --- | --- | --- |
| 固定理論の因数分解 | 独立二コピーの熱トレースは積 | 実際の境界理論が固定か、二境界が非結合か |
| ensemble共分散 | 同一ラベルを共有すると連結相関が生じ得る | 重力側と対応するensembleの定義と測度 |
| double-trumpet | 純粋JTの先頭連結核を積分できる | 全位相和・非摂動完備化・境界辞書 |
| レプリカ規格化 | 平均と規格化の順序は一般に交換しない | 固定した放射状態の正規化モーメントとの同一性 |
| 情報問題 | ensemble平均した量は個々の理論の答えと異なり得る | 個々の理論の状態・演算子、精度、復号手続 |

この章の二境界 $Z$ は、放射領域 $R$ のRényiモーメントとは別の観測量です。放射の[条件付きisland則](../BHI30/index.md#prop-bhi30-conditional-island)が成立する模型でも、「ensemble平均の放射エントロピー」と「特定の一理論における放射状態のエントロピー」を同一にするには別の根拠が必要です。

## 8. 演習：境界を共有するとはどういう操作か

### Level A：それぞれの積と平均を確かめる

<a id="ex-bhi31-a01"></a>

#### BHI31-A01 固定二準位理論の積

- Level: A
- 問題: $H=\operatorname{diag}(0,\log2)$ を持つ二準位系の相互作用しない二コピーを考える。$\beta_1=1,\beta_2=2$ で、各 $Z_H(\beta_i)$ と全分配関数を固有値の和から求め、因数分解を検査せよ。

<!-- solution-start -->
**詳細解答**：$\beta_1=1$ では $Z_H(1)=1+2^{-1}=3/2$、$\beta_2=2$ では $Z_H(2)=1+2^{-2}=5/4$。二コピーの状態 $|0,0\rangle,|0,1\rangle,|1,0\rangle,|1,1\rangle$ の重みは順に $1,1/4,1/2,1/8$ なので
$$
Z_{H,12}=1+\frac14+\frac12+\frac18=\frac{15}{8}.
$$
積も $(3/2)(5/4)=15/8$ で一致します。これは[独立二コピーのトレース](#prop-bhi31-tensor-trace)の具体例です。
<!-- solution-end -->

<a id="ex-bhi31-a02"></a>

#### BHI31-A02 同じ理論を共有する平均

- Level: A
- 問題: 理論ラベル $a=0,1$ を等確率で選び、逆温度1での分配関数がそれぞれ $Z_0=1,Z_1=1/2$ とする。同じラベルを使う二境界の平均、各境界を平均した積、連結差を求めよ。

<!-- solution-start -->
**詳細解答**：共有平均は $(1^2+(1/2)^2)/2=(1+1/4)/2=5/8$。一境界平均は $(1+1/2)/2=3/4$ なので、平均の積は $(3/4)^2=9/16$。共通分母16に直すと連結差は $10/16-9/16=1/16$。共有ラベルの揺らぎが原因です。
<!-- solution-end -->

<a id="ex-bhi31-a03"></a>

#### BHI31-A03 別々の理論抽選ではどうなるか

- Level: A
- 問題: A02と同じ2理論を、二境界で独立に等確率で抽選する。4つの結果 $(a,b)$ を列挙し、分配関数積の平均と連結差を求めよ。

<!-- solution-start -->
**詳細解答**：$(0,0),(0,1),(1,0),(1,1)$ は確率 $1/4$ で、積は $1,1/2,1/2,1/4$ です。従って
$$
\mathbb E_{a,b}[Z_aZ_b]=\frac14\left(1+\frac12+\frac12+\frac14\right)=\frac9{16}.
$$
一境界平均の積は $9/16$ なので差は零。[共有抽選と独立抽選の命題](#prop-bhi31-shared-vs-independent)で共有の場合だけ生じた $1/16$ が消えます。
<!-- solution-end -->

<a id="ex-bhi31-a04"></a>

#### BHI31-A04 トランペットの等温積分

- Level: A
- 問題: $\beta>0$ とし、$T(\beta,b)=(2\pi\beta)^{-1/2}e^{-b^2/(2\beta)}$ とする。$K(\beta,\beta)=\int_0^\infty b\,db\,T(\beta,b)^2$ を置換積分で求めよ。

<!-- solution-start -->
**詳細解答**：$T(\beta,b)^2=(2\pi\beta)^{-1}e^{-b^2/\beta}$。$u=b^2/\beta$ なら $b\,db=(\beta/2)du$ なので
$$
K(\beta,\beta)=\frac1{2\pi\beta}\frac{\beta}{2}\int_0^\infty e^{-u}\,du
=\frac1{4\pi}.
$$
$\beta$ に依存しないのは、この正規化での種数0連結積分の性質です。
<!-- solution-end -->

<a id="ex-bhi31-a05"></a>

#### BHI31-A05 対数と平均を入れ替える

- Level: A
- 問題: 正の確率変数 $Z$ が等確率で $1$ または $1/2$ を取る。$\langle\log Z\rangle$ と $\log\langle Z\rangle$ を正確に求め、大小を比較せよ。

<!-- solution-start -->
**詳細解答**：$\langle\log Z\rangle=\frac12(\log1+\log(1/2))=-\frac12\log2$。また $\langle Z\rangle=(1+1/2)/2=3/4$ だから $\log\langle Z\rangle=\log(3/4)$。差は
$$
\log(3/4)+\frac12\log2
=\log\left(\frac{3\sqrt2}{4}\right)>0,
$$
最後は $(3\sqrt2)^2=18>16=4^2$ により正と分かります。平均の順序による差を数量化しました。
<!-- solution-end -->

### Level B：対応を疑いながら計算する

<a id="ex-bhi31-b01"></a>

#### BHI31-B01 異温度の二理論ensemble

- Level: B
- 問題: $H_0=(0),H_1=(\Delta)$ の一次元理論を考え、$H_1$ の選択確率を $p\in(0,1)$、$\Delta>0$ とする。$\beta_1,\beta_2>0$ で $C_{\mathcal E}$ を展開で導出し、$\Delta\downarrow0$ および $p\downarrow0$ でどうなるか説明せよ。

<!-- solution-start -->
**詳細解答**：$q_i=e^{-\beta_i\Delta}$ とすると $\langle Z_i\rangle=1-p+pq_i$、$\langle Z_1Z_2\rangle=1-p+pq_1q_2$ です。積を展開して
$$
\begin{aligned}
C_{\mathcal E}
&=1-p+pq_1q_2-(1-p)^2-p(1-p)(q_1+q_2)-p^2q_1q_2\\
&=p(1-p)[1-q_1-q_2+q_1q_2]\\
&=p(1-p)(1-e^{-\beta_1\Delta})(1-e^{-\beta_2\Delta}).
\end{aligned}
$$
$\Delta\downarrow0$ では各指数が1へ、$p\downarrow0$ では前因子が0へ近づきます。どちらも理論間の揺らぎが消えるため連結差が0になる、という同じ機構です。
<!-- solution-end -->

<a id="ex-bhi31-b02"></a>

#### BHI31-B02 正規化の順序を反証する

- Level: B
- 問題: 等確率の二理論で、未規格化一次元正値演算子が $A_0=(1),A_1=(3)$ である。$n=1,2,3$ について、各理論で先に正規化したモーメントの平均と、$\langle z_n\rangle/\langle z_1\rangle^n$ を比較せよ。後者が密度演算子のモーメントと一致しない理由を述べよ。

<!-- solution-start -->
**詳細解答**：各 $\rho_a=A_a/\operatorname{Tr}A_a=(1)$ なので、すべての $n$ で先に正規化した値は1です。$z_{n,0}=1,z_{n,1}=3^n$、$\langle z_1\rangle=(1+3)/2=2$ なので後から規格化した値は
$$
\frac{1+3^n}{2^{n+1}}.
$$
$n=1$ で $4/4=1$、$n=2$ で $10/8=5/4$、$n=3$ で $28/16=7/4$。正規化密度演算子では $\sum_j\lambda_j^n\le\sum_j\lambda_j=1$（$n\ge1$）なので $5/4,7/4$ は許されません。[規格化の非可換性](#prop-bhi31-normalization-counterexample)を、前例と異なる数値で再現しました。
<!-- solution-end -->

<a id="ex-bhi31-b03"></a>

#### BHI31-B03 JT連結核の二温度行列

- Level: B
- 問題: 上の $K(\beta_i,\beta_j)$ について $\beta_1=1,\beta_2=3$ とする。行列の4成分、行列式、任意の実数 $u,v$ に対する二次形式の非負性を計算せよ。

<!-- solution-start -->
**詳細解答**：[JT核の計算](#prop-bhi31-trumpet-gram)へ入れると対角成分は $K(1,1)=K(3,3)=1/(4\pi)$、非対角成分は
$$
K(1,3)=K(3,1)=\frac{\sqrt3}{2\pi(1+3)}=\frac{\sqrt3}{8\pi}.
$$
行列式は
$$
\det K=\frac1{16\pi^2}-\frac3{64\pi^2}
=\frac1{64\pi^2}>0.
$$
一つの平方完成で
$$
(u,v)K(u,v)^{\mathsf T}
=\frac1{4\pi}\left[\left(u+\frac{\sqrt3}{2}v\right)^2+\frac14v^2\right]\ge0.
$$
有限二点での正定値性を計算で確認しました。
<!-- solution-end -->

<a id="ex-bhi31-b04"></a>

#### BHI31-B04 二点相関だけではensembleを一意に定めない

- Level: B
- 問題: $0<c<1/\sqrt2$ とする。確率変数 $X$ が (I) $1-c,1+c$ をそれぞれ確率 $1/2$ で取る場合と、(II) $1-\sqrt2c,1,1+\sqrt2c$ をそれぞれ確率 $1/4,1/2,1/4$ で取る場合を比べる。両者の平均・分散と中心四次モーメントを求め、連結二点関数だけからensembleが決まるか判定せよ。

<!-- solution-start -->
**詳細解答**：仮定 $c<1/\sqrt2$ からすべての値が正です。いずれも対称性より $\mathbb E X=1$。(I) の偏差は $\pm c$ で、$\operatorname{Var}X=c^2$、$\mathbb E(X-1)^4=c^4$。(II) の偏差は $-\sqrt2c,0,\sqrt2c$ なので
$$
\operatorname{Var}X=\frac14(2c^2)+\frac12(0)+\frac14(2c^2)=c^2,
$$
$$
\mathbb E(X-1)^4=\frac14(4c^4)+\frac14(4c^4)=2c^4.
$$
平均と連結二点値である分散が一致しても四次モーメントが異なるため、二点相関だけでは分布を特定できません。
<!-- solution-end -->

### Level C：独立境界・重力連結項・レプリカを分ける

<a id="ex-bhi31-c01"></a>

#### BHI31-C01 factorizationとensemble解釈の統合検証

- Level: C
- 問題: $\beta_1=1,\beta_2=3$ の二境界を考える。固定理論では有限トレースHamiltonian $H$ の相互作用しない二コピーを採用する。一方、純粋JTのトランペット核を $T(\beta,b)=(2\pi\beta)^{-1/2}\exp[-b^2/(2\beta)]$ とし、連結寄与を $K=\int_0^\infty b\,db\,T(1,b)T(3,b)$ とする。さらに別の有限ensembleとして、一次元理論 $H_0=(0),H_1=(\log2)$ を等確率で共有するものを考える。
  1. 固定理論の二境界分配関数と連結差を示せ。
  2. 純粋JTの $K(1,3)$ を積分の置換から求めよ。
  3. 有限ensembleの共有抽選の連結相関を求め、独立抽選なら何が変わるか計算せよ。
  4. (2) と (3) の数値が異なっても理論的な矛盾ではない理由と、二境界連結値だけで境界理論を特定できない理由を説明せよ。
  5. 同じ有限ensembleの各理論に $A_0=(1),A_1=(2)$ を対応させ、$n=2$ の規格化順序の差を求めよ。放射エントロピーへ移るために必要な追加条件を述べよ。

<!-- solution-start -->
**詳細解答**：

**1. 固定理論**：定義した二コピーの分配関数は[独立二コピーのトレース](#prop-bhi31-tensor-trace)によって
$$
Z_{H,12}(1,3)=\operatorname{Tr}e^{-H}\,\operatorname{Tr}e^{-3H}=Z_H(1)Z_H(3).
$$
従って同じ二つの積を差し引いた連結差は0です。これは $H$ の値を固定した計算です。

**2. JTの連結積分**：核の積の前因子は $1/(2\pi\sqrt3)$、指数は $-b^2(1/2+1/6)=-2b^2/3$ です。$u=2b^2/3$ と置くと $b\,db=3du/4$ なので
$$
K(1,3)=\frac1{2\pi\sqrt3}\frac34\int_0^\infty e^{-u}\,du
=\frac{3}{8\pi\sqrt3}=\frac{\sqrt3}{8\pi}>0.
$$
これは純粋JTの**種数0連結寄与**であり、全位相和を評価した値ではありません。

**3. 有限ensemble**：$Z_0(1)=Z_0(3)=1$、$Z_1(1)=1/2$、$Z_1(3)=1/8$ です。共有したときは
$$
\langle Z_1Z_2\rangle=\frac12\left(1+\frac1{16}\right)=\frac{17}{32}.
$$
一境界平均は $\langle Z(1)\rangle=3/4$、$\langle Z(3)\rangle=(1+1/8)/2=9/16$ なので
$$
C_{\mathcal E}(1,3)
=\frac{17}{32}-\frac34\frac9{16}
=\frac{34-27}{64}=\frac7{64}.
$$
独立抽選での期待積は $(3/4)(9/16)=27/64$ となり、連結差は0です。

**4. 解釈**：$K(1,3)=\sqrt3/(8\pi)$ と $C_{\mathcal E}(1,3)=7/64$ は異なる模型・規格化の値です。任意の二理論ensembleが純粋JTの行列積分双対と同じ相関を持つ必要はありません。[二点相関だけでの非一意性](#prop-bhi31-shared-vs-independent)とB04の反例から、連結二点値だけでは全高次モーメント・確率測度・非摂動完備化が分かりません。重力計算を固定した $H$ の積へそのまま同一視するなら因数分解の問題が残り、ensemble平均へ対応させるなら計算する対象が変わります。

**5. レプリカ規格化**：$z_0=1,z_1=2$、$z_{2,0}=1,z_{2,1}=4$ なので
$$
M_2^{\rm fixed\text{-}first}=\frac12\left(1+\frac4{2^2}\right)=1,\quad
M_2^{\rm average\text{-}first}=\frac{(1+4)/2}{[(1+2)/2]^2}=\frac{10}{9}.
$$
後者は密度演算子の二次モーメントではありません。[BHI30の条件付きisland則](../BHI30/index.md#prop-bhi30-conditional-island)を特定の放射状態に適用するためには、どの状態・どの理論の $\operatorname{Tr}\rho_R^n$ を重力レプリカが再現するか、正規化とensemble平均の順序、$n\to1$ の正則性と鞍点支配性を固定しなければなりません。
<!-- solution-end -->

## 9. まとめと次講

- 相互作用しない固定理論の二境界分配関数は積になります。これは同じ理論を両方に置いたとしても成り立ちます。
- 同じ理論の選択を共有するensemble平均では、平均した積と平均の積が共分散だけ異なります。
- 純粋JTのdouble-trumpetは非零の連結寄与を与え、行列積分のensemble相関との対応を考える重要な手掛かりです。
- 連結項を見つけたことと、特定の一理論での因数分解の問題を解決したことは別です。またレプリカの規格化とensemble平均は一般に交換しません。

次のBHI32では、放射領域のentanglement wedgeとislandの対応を考え、エントロピーの計算を「どの領域の演算子を放射から表現できるか」という問いへ進めます。

**参考文献**：Saad, Shenker & Stanford, [*JT gravity as a matrix integral*](https://arxiv.org/abs/1903.11115) (2019)；Harlow & Jafferis, [*The Factorization Problem in Jackiw-Teitelboim Gravity*](https://arxiv.org/abs/1804.01081) (2018/2019)；Almheiri et al., [*The Entropy of Hawking Radiation*](https://doi.org/10.1103/RevModPhys.93.035002) (2021)。
