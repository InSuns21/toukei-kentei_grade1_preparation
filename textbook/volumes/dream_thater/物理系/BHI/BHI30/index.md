# BHI30 $n\to1$ とisland公式の導出範囲

<!-- definition-example-audit: strict -->

## 1. なぜレプリカ鞍点から、すぐに放射エントロピーを読めないのか

[BHI28の巡回貼合せと正規化モーメント](../BHI28/index.md#prop-bhi28-sewing-trace)は、整数 $n\ge2$ に対して浴の放射領域 $R$ の $\operatorname{Tr}\rho_R^n$ を幾何の境界値問題に翻訳します。[BHI29のレプリカ・ワームホール候補](../BHI29/index.md#def-bhi29-replica-saddles)は、浴の貼合せを変えずに重力内部を複製間でつなげることを示しました。

しかし知りたい量は整数 $n$ の分配関数そのものではありません。放射の **von Neumannエントロピー** です。レプリカによる計算には、次の三つの操作が必要です。

1. 同一の状態とcutoffを固定した規格化 $Z_n/Z_1^n$ を作る。
2. 整数から実数の $n$ へ適切に延長し、$n=1$ の微分を求める。
3. 重力積分で許容される鞍点を調べ、極値化した枝を適切な近似精度で比較する。

本講では、非重力浴に接合した二次元JT重力のEuclid状態準備を対象にします。浴の領域 $R$、物質場の状態・透過条件、重力の境界データ、紫外cutoffと積分輪郭は、[BHI28のJT・浴の境界値問題](../BHI28/index.md#def-bhi28-jt-replica-boundary)と同じものを保持します。放射領域の境界を動かす変分と、island候補の端点を動かす変分も区別します。自然対数を使い、空のisland候補 $I=\varnothing$ も含めます。

ここから導くのは「**明記した正則性・対称性・鞍点選択の下で** island 公式が現れる」という条件付きの結論です。模型固有の場の方程式や全鞍点の存在を、単なる数式の書換えだけで保証するものではありません。

## 2. 密度演算子の微分と重力分配関数の微分を接続する

まず、重力がなくても成立する恒等式を自分の手で確かめます。有限次元の密度演算子 $\rho_R$ の固有値を $p_i\ge0$、$\sum_i p_i=1$ とします。$p_i=0$ の項は $p_i\log p_i=0$ と約束します。

[正規化モーメントの構成](../BHI28/index.md#prop-bhi28-sewing-trace)を、実数 $n$ の微分へ運ぶとき、確率の規格化と状態の固定が欠かせません。

<a id="prop-bhi30-spectral-derivative"></a>

<!-- formal-statement-start -->
> **命題（密度演算子のレプリカ微分）**  
> 有限次元Hilbert空間上の正規化された正半定値密度演算子 $\rho$ を固定する。実数 $n>0$ に対して $M(n)=\operatorname{Tr}\rho^n$ とおくと、$M(1)=1$ であり、
>
$$
S(\rho)=-\left.\frac{d}{dn}\log M(n)\right|_{n=1}
=-\operatorname{Tr}(\rho\log\rho).
$$
>
> 固有値零の寄与には連続延長 $0\log0=0$ を用いる。
<!-- formal-statement-end -->

### 証明の見取り図

固有値を固定してから微分します。$M(1)=1$ なので対数の微分の分母は1となり、エントロピーが出てきます。

<!-- proof-start -->
### 証明

有限個の固有値について、$p_i>0$ なら $p_i^n=e^{n\log p_i}$ より
$$
\frac{d}{dn}p_i^n=p_i^n\log p_i.
$$
$p_i=0$ なら $n>0$ で $p_i^n=0$ は恒等的に零で、その導関数も零です。よって有限和で微分と総和を交換でき、
$$
M'(n)=\sum_{p_i>0}p_i^n\log p_i.
$$
$M(1)=\sum_i p_i=1$ なので
$$
-\left.\frac{d}{dn}\log M(n)\right|_{n=1}
=-\frac{M'(1)}{M(1)}
=-\sum_{p_i>0}p_i\log p_i.
$$
スペクトル分解で $\operatorname{Tr}(\rho\log\rho)$ は右辺の和と一致します。$\square$
<!-- proof-end -->

**直接例（確率の規格化まで確認）**：$\rho=\operatorname{diag}(1/4,3/4)$ は両固有値が非負で和が1です。
$$
M(n)=4^{-n}+(3/4)^n,\qquad M(1)=1.
$$
したがって
$$
-M'(1)=-\frac14\log\frac14-\frac34\log\frac34.
$$
$n=2$ では $M(2)=1/16+9/16=5/8$ です。二次モーメント $5/8$ 一個を微分値の代わりにできないことにも注意します。

重力付き模型で $Z_n$ を状態準備を含めた **規格化前** のレプリカ経路積分とし、$Z_1>0$ を一枚の経路積分とします。物理状態のモーメントに対応すると主張するためには、$Z_n/Z_1^n$ が同じ状態 $\rho_R$ のモーメントを実現する必要があります。以下で使う対数は、正の実寄与が支配する領域、または一貫した対数枝が指定された領域で取ります。

<a id="def-bhi30-normalized-log-replica"></a>

<!-- formal-statement-start -->
> **定義（正規化された対数レプリカ量）**  
> 同一の浴領域・状態準備・境界条件とcutoffに対する $Z_1>0$ および $Z_n$ が与えられ、実数 $n$ を含む $1$ 近傍で $Z_n/Z_1^n>0$ が微分可能であるとする。このとき
>
$$
\mathcal L(n)=\log Z_n-n\log Z_1
=\log\left(\frac{Z_n}{Z_1^n}\right)
$$
>
> を正規化された対数レプリカ量とする。正規化された密度演算子のモーメントを実現する場合、$\mathcal L(1)=0$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi30-normalized-log-replica -->
**定義の確認**：$Z_1=c>0$、$Z_n=c^n[4^{-n}+(3/4)^n]$ と置きます。$Z_n>0$ で $n=1$ 近傍に微分可能、$Z_1=c$ の指定とも整合します。従って
$$
\mathcal L(n)=\log[4^{-n}+(3/4)^n],
\qquad \mathcal L(1)=0.
$$
$c$ の選び方には依らず、先ほどの有限密度演算子のエントロピーが $-\mathcal L'(1)$ として再現されます。
<!-- definition-example-end -->

<a id="prop-bhi30-normalization-derivative"></a>

<!-- formal-statement-start -->
> **命題（重力レプリカの正規化微分）**  
> 上の正規化された対数レプリカ量 $\mathcal L$ が $n=1$ で微分可能で、その近傍で $Z_n/Z_1^n=\operatorname{Tr}\rho_R^n$ を満たすとする。このとき放射のエントロピーは
>
$$
S(R)=-\left.\partial_n[\log Z_n-n\log Z_1]\right|_{n=1}
=-\left.\partial_n\log Z_n\right|_{n=1}+\log Z_1.
$$
>
> 右辺の $\log Z_1$ は $n$ に依らない一枚の規格化因子である。
<!-- formal-statement-end -->

### 証明の見取り図

分母 $Z_1^n$ の対数は $n\log Z_1$。$n$ を微分すると残る $\log Z_1$ は規格化されていない分配関数の余分な寄与を相殺します。

<!-- proof-start -->
### 証明

[密度演算子のレプリカ微分](#prop-bhi30-spectral-derivative)を、仮定したモーメントの同一性 $M(n)=Z_n/Z_1^n$ に適用すると
$$
S(R)=-\partial_n\log M(n)|_{n=1}
=-\partial_n[\log Z_n-n\log Z_1]|_{n=1}.
$$
$Z_1$ は固定した一枚の境界値問題の値で、微分変数 $n$ に依存しません。従って $\partial_n(n\log Z_1)=\log Z_1$ です。$\square$
<!-- proof-end -->

**誤りの検算**：$Z_n=c^n M(n)$ なら $-\partial_n\log Z_n|_1=-\log c+S(\rho)$。正しい式はさらに $+\log Z_1=+\log c$ を加え、$c$ を消します。これが[BHI29の二枝を単純加算した際の規格化違反](../BHI29/index.md#prop-bhi29-dominance)にも関係します。

## 3. 整数レプリカのどの情報が、$n=1$ を決めるのか

整数 $n=2,3,\ldots$ で分配関数を求めても、直ちに実数 $1<n<2$ 上の微分値は与えられません。どの幾何を同じ枝として追跡するか、どの正則性が成り立つかが追加の内容です。

ここでは **解析接続** を、整数で得られた関数値と整合し、$n=1$ の近傍に実解析的（収束するべき級数で表せる）に拡張する操作として扱います。物理計算にはさらに密度演算子の正値性・成長条件・重力の境界値問題との一致が必要です。解析関数という語だけでは枝は一意に定まりません。

<a id="def-bhi30-admissible-continuation"></a>

<!-- formal-statement-start -->
> **定義（本講の許容レプリカ延長の条件）**  
> JT重力・非重力浴の固定した状態準備と放射領域 $R$ に対し、正規化されたレプリカ量を $n=1$ まで延長する際、本講では次の条件を明示的に課す。
>
> 1. 対象の整数モーメントを再現し、$M(1)=1$ を満たすこと。
> 2. $n=1$ の右近傍で $\log M(n)$ が連続微分可能であること。
> 3. 重力鞍点を使う場合、同じ境界データ・cutoff・積分輪郭と指定したレプリカ対称な場の解の族に沿って微分し、誤差項の微分が制御されること。
> 4. 複数の鞍点候補の加算・支配性と $n\to1$ の極限の順序を、別途正当化すること。
>
> これは一般の重力経路積分に自動的に成立する定理ではなく、本講の結論を適用するための検査項目である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi30-admissible-continuation -->
**定義の確認（非重力の直接例）**：先ほどの $M(n)=4^{-n}+(3/4)^n$ は全実数 $n>0$ で正、実解析的で $M(1)=1$ です。固定した密度行列に由来するため整数モーメントに一致し、微分も有限和で制御できます。重力鞍点がないので条件3・4の「使う場合」に該当せず、四条件を満たします。
<!-- definition-example-end -->

整数値だけに頼る危険は次の式で分かります。例えば解析関数 $f(n)$ に対し
$$
\widetilde f(n)=f(n)+c\sin[\pi(n-1)]e^{-(n-1)^2}
$$
とすると、すべての正整数 $n$ では値が一致します。一方、$n=1$ における導関数は $\widetilde f'(1)=f'(1)+\pi c$ です。この補正は**任意の密度演算子から生じるモーメントであるとは限りません**。したがって「物理的な全整数モーメントが任意の条件下で非一意」という主張ではなく、整数の鞍点計算値を任意の解析関数で補間してよいわけではないという警告です。

## 4. レプリカ固定点から一般化エントロピーの一次係数へ

[BHI29の二分岐点被覆](../BHI29/index.md#def-bhi29-branched-cover)は、重力側の巡回対称商に固定点を作ります。$n>1$ の商で固定点周辺の開き角は $2\pi/n$、角度不足は $2\pi(1-1/n)$ です。$n\downarrow1$ では不足角が零に近づき、固定点の位置がisland端点の候補となります。

ここで **一般化エントロピー** は、JTのdilatonによる端点寄与と、同一状態・cutoffで計算した物質場のエントロピーの和です。[BHI24の一般化エントロピー台帳](../BHI24/index.md#def-bhi24-jt-island-ledger)を使い、端点の座標をまとめて $x$ と書くと
$$
F_I(x)=S_{\rm gen}(R\cup I_x)
=\sum_{p\in\partial I_x}\frac{\Phi_0+\Phi(p)}{4G_2}
+S_{\rm matter}(R\cup I_x).
$$
$R$ は固定し、$I_x$ の端点のみを変分します。面積の代わりにdilatonを使う規約は[BHI20のJTエントロピー](../BHI20/index.md#prop-bhi20-entropy)に由来します。

重力固定点の近傍に現れる円錐欠損が、正規化された被覆作用の $n-1$ に比例する項へ寄与します。重力側の端点項と物質場のレプリカ微分を同じcutoffで合わせたとき、その係数が $F_I$ になる、というのがこの推論の非自明な入力です。単にEuler標数の値を微分するだけでは、dilatonの位置依存と物質の相関を求められません。

<a id="def-bhi30-replica-first-order-ledger"></a>

<!-- formal-statement-start -->
> **定義（端点付き鞍点族の一次係数台帳）**  
> $\varepsilon=n-1>0$ とし、JT・浴の固定境界条件に対するレプリカ対称な鞍点族の正規化Euclid有効作用差を $\mathcal J(n,x)$ と書く。端点座標 $x$ の開集合 $U$ 上で、ある $C^1$ 関数 $F:U\to\mathbb R$ と誤差 $E$ が
>
$$
\mathcal J(1+\varepsilon,x)=\varepsilon F(x)+E(\varepsilon,x)
$$
>
> を満たし、$E(0,x)=0$、$\partial_\varepsilon E(0,x)=0$、$E(\varepsilon,x)=o(\varepsilon)$ と $\nabla_xE(\varepsilon,x)=O(\varepsilon^2)$ が端点の近傍で一様に成立する場合、$F$ をその鞍点族の **一次係数** とする。$F$ が上記 $S_{\rm gen}$ に等しいかどうかはJT・物質の実計算によって判定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi30-replica-first-order-ledger -->
**定義の確認**：$x>0$、$\alpha,\gamma>0$、$F(x)=2S_0+\alpha x^2-\gamma\log x+C$ とし、$\mathcal J(1+\varepsilon,x)=\varepsilon F(x)+\varepsilon^2x$ とします。$E=\varepsilon^2x$ は $E(0,x)=\partial_\varepsilon E(0,x)=0$、$\partial_xE=\varepsilon^2$ なので、任意の有界区間で条件を満たします。これは[BHI29の端点変分模型](../BHI29/index.md#prop-bhi29-fixed-point)と同じ機構を確認する有限次元例であり、$F=S_{\rm gen}$ という物理的等式まで例から証明したわけではありません。
<!-- definition-example-end -->

<a id="prop-bhi30-on-shell-derivative"></a>

<!-- formal-statement-start -->
> **命題（停留端点を持つ鞍点の一次微分）**  
> 上の一次係数台帳を満たし、$\varepsilon>0$ の各十分小さい値で $\nabla_x\mathcal J(1+\varepsilon,x_\varepsilon)=0$ とする。$x_\varepsilon\to x_*\in U$ とし、$F$ の導関数が $x_*$ で連続、$E$ の微分評価が同じ近傍で一様なら
>
$$
\nabla_xF(x_*)=0,\qquad
\lim_{\varepsilon\downarrow0}
\frac{\mathcal J(1+\varepsilon,x_\varepsilon)}{\varepsilon}=F(x_*).
$$
>
> さらにオンシェルの $\mathcal J(1+\varepsilon,x_\varepsilon)$ が右微分可能で、微分値が上記極限と一致するなら、その負符号付き対数レプリカ量の微分からのエントロピー候補は $F(x_*)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

端点を動かした一階条件を $\varepsilon$ で割ると $F$ の停留条件が残ります。次に作用差自身を割ると一次係数が残るため、端点の $\varepsilon$ 依存を直接微分する必要はありません。

<!-- proof-start -->
### 証明

停留条件と展開から
$$
0=\nabla_x\mathcal J(1+\varepsilon,x_\varepsilon)
=\varepsilon\nabla_xF(x_\varepsilon)+\nabla_xE(\varepsilon,x_\varepsilon).
$$
$\varepsilon>0$ で割り、誤差が一様に $O(\varepsilon^2)$ なので
$$
\nabla_xF(x_\varepsilon)
=-\frac{\nabla_xE(\varepsilon,x_\varepsilon)}{\varepsilon}
=O(\varepsilon).
$$
$x_\varepsilon\to x_*$ と連続性から $\nabla_xF(x_*)=0$。これは[BHI29の固定点変分命題](../BHI29/index.md#prop-bhi29-fixed-point)をここで使う際の変数と条件の照合にもなっています。

一方、作用差を直接割ると
$$
\frac{\mathcal J(1+\varepsilon,x_\varepsilon)}{\varepsilon}
=F(x_\varepsilon)+\frac{E(\varepsilon,x_\varepsilon)}{\varepsilon}.
$$
一次係数台帳で仮定した $E(\varepsilon,x)=o(\varepsilon)$ の一様評価により最後の項は零へ収束し、第一項は $F(x_*)$ へ収束します。右微分の追加仮定の下では $\mathcal J(1,x_*)=0$ なのでこの極限が $\mathcal J$ の右微分です。鞍点の対数寄与が $-\mathcal J$ なら、[重力レプリカの正規化微分](#prop-bhi30-normalization-derivative)によりエントロピーの寄与は $F(x_*)$ です。$\square$
<!-- proof-end -->

**物理的な適用の橋**：ここで $F=S_{\rm gen}$ を置くためには、レプリカ商の円錐欠損・JT境界条件から重力の一次変分項を計算し、物質場の正規化レプリカ微分が同じ $R\cup I$ の $S_{\rm matter}$ を与えると確認しなければなりません。これを満たすJT＋浴の半古典模型で、[BHI24の一般化エントロピー](../BHI24/index.md#prop-bhi24-assembled-ledger)と一致します。上の数学的命題そのものは、**任意の重力理論でこの等式が成立することの証明ではありません**。

### 端点が動いても一次係数が変わらない具体例

先の $F(x)=2S_0+\alpha x^2-\gamma\log x+C$、$\mathcal J=\varepsilon F+\varepsilon^2x$ では
$$
F'(x)=2\alpha x-\frac{\gamma}{x},\qquad
x_*=\sqrt{\frac{\gamma}{2\alpha}}.
$$
停留点 $x_\varepsilon$ の式は $2\alpha x_\varepsilon^2+\varepsilon x_\varepsilon-\gamma=0$ で、その正根は
$$
x_\varepsilon=
\frac{-\varepsilon+\sqrt{\varepsilon^2+8\alpha\gamma}}{4\alpha}
\longrightarrow x_*.
$$
従って
$$
\frac{\mathcal J(1+\varepsilon,x_\varepsilon)}{\varepsilon}
=F(x_\varepsilon)+\varepsilon x_\varepsilon
\longrightarrow F(x_*).
$$
端点が毎回少し動いていても、一次係数にはその位置の極限だけが残ります。

## 5. 極値化、枝の比較、最小値は別々の操作である

[空枝とisland枝の比較](../BHI26/index.md#def-bhi26-extremized-branches)で、最初に各枝の端点を極値化し、次に候補値を比較しました。この順序はレプリカから考えても重要です。

- **空枝**：$I=\varnothing$ とし、一次係数は $F_{\varnothing}=S_{\rm matter}(R)$。
- **island枝**：許容された $I$ の端点を停留させ、一次係数は $F_I(x_*)=S_{\rm gen}(R\cup I_{x_*})$。
- **枝の選択**：その模型の鞍点積分、近似の精度と規格化に基づき、どの枝がエントロピーの主項を与えるかを判定する。

<a id="prop-bhi30-conditional-island"></a>

<!-- formal-statement-start -->
> **命題（JT・浴模型における条件付きisland則）**  
> 固定したJT・非重力浴の状態準備と領域 $R$ について、次のすべてを仮定する。
>
> 1. 正規化された重力レプリカ量が物理的な $R$ のモーメントを再現し、$n\downarrow1$ の微分を取れる。
> 2. 考慮すべき鞍点族には $n=1$ 近傍への適切なレプリカ対称延長があり、その一次係数が空枝では $S_{\rm matter}(R)$、island候補では $S_{\rm gen}(R\cup I)$ になる。
> 3. island端点の停留点は許容領域内に存在し、作用の一様な誤差評価と端点変分が交換できる。
> 4. 全鞍点・積分輪郭を考慮した半古典近似において、許容された極値枝のうち最小の実エントロピー候補が、非縮退の領域で先頭次数を与えることが確認されている。
>
> このとき、その半古典近似の主項は
>
$$
S(R)=\min_{I\in\mathcal A}\left\{
\operatorname*{ext}_{\partial I}
\left[
\sum_{p\in\partial I}\frac{\Phi_0+\Phi(p)}{4G_2}
+S_{\rm matter}(R\cup I)
\right]\right\}
+\text{制御された劣次補正}.
$$
>
> ここで $\mathcal A$ は空集合を含む許容island候補の集合であり、$\operatorname*{ext}$ は各候補内の実際に存在する停留値の列挙を意味する。複数の停留点があればそれぞれを候補として比較し、最小化の前に端点を任意に固定しない。
<!-- formal-statement-end -->

### 証明の見取り図

規格化微分がエントロピーを取り出します。各枝では一次係数の命題が一般化エントロピーの停留値を与えます。最後に、独立の**支配枝仮定**によってそれらの停留値から最小のものを選びます。

<!-- proof-start -->
### 証明

仮定1を使い、[重力レプリカの正規化微分](#prop-bhi30-normalization-derivative)により $S(R)=-\mathcal L'(1)$。各許容鞍点族 $j$ の正規化対数寄与を $\mathcal L_j(1+\varepsilon)=-\mathcal J_j(1+\varepsilon,x_{j,\varepsilon})$ と書きます。仮定2・3を確認し、[停留端点を持つ鞍点の一次微分](#prop-bhi30-on-shell-derivative)から
$$
-\mathcal L_j'(1)=F_j(x_{j,*}),\qquad
\nabla_xF_j(x_{j,*})=0.
$$
空枝には端点がなく $F_{\varnothing}=S_{\rm matter}(R)$。非空枝では仮定2により $F_j=S_{\rm gen}(R\cup I_j)$ です。従って候補値の集合は、空枝の物質エントロピーと各許容island端点での一般化エントロピーの停留値です。

ここまでの微分操作だけでは最小値の選択は**自動的に**得られません。仮定4が、定めた半古典展開と積分輪郭の下で物理的な正規化レプリカ量の先頭の微分を最小の候補へ対応させるため、表示した式を得ます。劣次項の評価は同じ仮定で制御される精度に限られます。$\square$
<!-- proof-end -->

**実計算との接続**：[BHI25の端点極値方程式](../BHI25/index.md#prop-bhi25-two-endpoint-equations)は各island枝の停留点を探す操作です。[BHI26のPage転移の交差条件](../BHI26/index.md#prop-bhi26-page-crossing)は、求めた停留値を空枝と比較する操作です。本講は、この二つをレプリカ微分のどの段階に置くかを明確にしました。交差点では枝の差が零になるので、一般に一つの枝だけで劣次補正を一様に無視できるとは限りません。

## 6. 反例：二つの指数を足すだけでは最小値にならない

「二つの鞍点の値が $\exp[-(n-1)F_j]$ なのだから、和を微分すれば最小の $F_j$ が出る」という考えは誤りです。正規化した有限混合模型で検査できます。

<a id="prop-bhi30-mixture-limits"></a>

<!-- formal-statement-start -->
> **命題（二枝混合での微分と半古典極限の非可換性）**  
> $0<p<1$、$a<b$、$N>0$ とし、$\varepsilon=n-1\ge0$ に対して
>
$$
M_N(1+\varepsilon)
=p e^{-N\varepsilon a}+(1-p)e^{-N\varepsilon b}.
$$
>
> このとき $M_N(1)=1$ であり、
>
$$
-\frac1N\left.\partial_n\log M_N(n)\right|_{n=1}
=pa+(1-p)b,
$$
>
> しかし、各固定 $\varepsilon>0$ では
>
$$
\lim_{N\to\infty}-\frac{\log M_N(1+\varepsilon)}{N\varepsilon}=a.
$$
>
> 従って $n\to1$ の微分と、大きな $N$ で一枝だけを残す操作は一般に交換できない。
<!-- formal-statement-end -->

### 証明の見取り図

$n=1$ では両指数が1なので双方の重みが残ります。一方、$n>1$ を固定して $N$ を大きくすると $a<b$ の指数が支配します。近づける順序の違いが答えを変えます。

<!-- proof-start -->
### 証明

微分すると
$$
M_N'(1+\varepsilon)
=-Npa\,e^{-N\varepsilon a}
-N(1-p)b\,e^{-N\varepsilon b}.
$$
$\varepsilon=0$ で $M_N(1)=p+(1-p)=1$ なので、微分式は $pa+(1-p)b$ になります。

固定 $\varepsilon>0$ について $a$ の指数を括ると
$$
M_N(1+\varepsilon)
=e^{-N\varepsilon a}
\left[p+(1-p)e^{-N\varepsilon(b-a)}\right].
$$
従って
$$
-\frac{\log M_N(1+\varepsilon)}{N\varepsilon}
=a-\frac{\log[p+(1-p)e^{-N\varepsilon(b-a)}]}{N\varepsilon}.
$$
角括弧内は $p>0$ へ収束し、対数は有限の $\log p$ に収束するため、第二項は零になります。二つの値は差 $(1-p)(b-a)>0$ を持ちます。$\square$
<!-- proof-end -->

**直接例**：$p=1/3$、$a=1$、$b=4$ なら微分の値は $1/3+8/3=3$、固定した $n>1$ での大 $N$ 極限は1です。これは任意の $a,b$ を与えた代数模型で、重力分配関数そのものではありません。

[BHI29の二枝規格化の検査](../BHI29/index.md#prop-bhi29-dominance)と合わせると、なぜ $n=1$ に同じ一枚幾何へ縮退する二つの寄与を「1+1」として数え続けてはいけないかも見えます。物理的な鞍点積分では各枝の測度・重複除去・積分輪郭と非一様な半古典極限を処理する必要があります。**最小値則は、二項指数の和を微分するだけの一般恒等式ではありません。**

## 7. BHI30で確定した導出と、残る適用条件

| 段階 | この講義で確定すること | 重力模型でなお確認すべきこと |
| --- | --- | --- |
| 正規化 | $S(R)=-\partial_n(\log Z_n-n\log Z_1)|_1$ の恒等式 | $Z_n/Z_1^n$ が固定した放射状態のモーメントか |
| $n\to1$ | 正則な延長なら一次係数を微分で抽出 | 整数からの延長の選択、鞍点の正則性・対称性 |
| 端点 | $O(n-1)$ の係数の停留条件 | 円錐寄与と物質レプリカから $F=S_{\rm gen}$ を実際に導くこと |
| 枝比較 | 極値化した各候補の値を比較 | 積分輪郭、支配枝、他の位相、揺らぎ、Page交差近傍 |
| 解釈 | 指定したJT＋浴の半古典放射エントロピーを計算 | 単一微視的理論への解釈、演算子復号、四次元への外挿 |

今回の条件付き導出は、研究で使われるisland則の計算手順を明確にします。**どの微視的理論を重力の経路積分が平均しているか**という問いは、BHI31のensemble平均とfactorizationで検討します。**放射から内部演算子へ操作的にアクセスできるか**は後続の復号講義で扱います。数学的に言えば、エントロピーの値と復号手続は別のデータです。

## 8. 演習：レプリカ微分を自力で組み立てる

### Level A：正規化と一次係数

<a id="ex-bhi30-a01"></a>

#### BHI30-A01 三準位状態のレプリカ微分

- Level: A
- 問題: $\rho=\operatorname{diag}(1/2,1/3,1/6)$ の正値性と規格化を確認し、$M(2)$ と $-\partial_n\log M(n)|_1$ を求めよ。

<!-- solution-start -->
**詳細解答**：固有値はすべて正で、$1/2+1/3+1/6=1$。従って密度演算子です。
$$
M(n)=2^{-n}+3^{-n}+6^{-n}.
$$
二次モーメントは
$$
M(2)=\frac14+\frac19+\frac1{36}=\frac{9+4+1}{36}=\frac7{18}.
$$
[レプリカ微分命題](#prop-bhi30-spectral-derivative)の仮定を満たすので、
$$
-\partial_n\log M(n)|_1
=-\frac12\log\frac12-\frac13\log\frac13-\frac16\log\frac16.
$$
ここでは $M(1)=1$ を使って対数微分の分母を消しました。
<!-- solution-end -->

<a id="ex-bhi30-a02"></a>

#### BHI30-A02 規格化因子はどこへ消えるか

- Level: A
- 問題: $c>0$、$0<p<1$ とし、$Z_1=c$、$Z_n=c^n[p^n+(1-p)^n]$ とする。$-\partial_n\log Z_n|_1$ と、正規化したエントロピーを比較せよ。

<!-- solution-start -->
**詳細解答**：
$$
\log Z_n=n\log c+\log[p^n+(1-p)^n].
$$
微分して
$$
-\partial_n\log Z_n|_1
=-\log c-p\log p-(1-p)\log(1-p).
$$
[正規化微分命題](#prop-bhi30-normalization-derivative)ではさらに $+\log Z_1=+\log c$ を加えるので
$$
S(R)=-p\log p-(1-p)\log(1-p).
$$
$c$ を変えても規格化された物理状態のエントロピーは変わりません。
<!-- solution-end -->

<a id="ex-bhi30-a03"></a>

#### BHI30-A03 一次展開から微分を読む

- Level: A
- 問題: $\mathcal L(1+\varepsilon)=-A\varepsilon+B\varepsilon^2+O(\varepsilon^3)$ とし、$\mathcal L(1)=0$、微分が存在するとする。$-\mathcal L'(1)$ と $\varepsilon>0$ の有限値 $-\mathcal L(1+\varepsilon)/\varepsilon$ の差を求めよ。

<!-- solution-start -->
**詳細解答**：まず差商の極限を計算すると
$$
-\mathcal L'(1)
=-\lim_{\varepsilon\downarrow0}\frac{\mathcal L(1+\varepsilon)-0}{\varepsilon}
=A.
$$
有限 $\varepsilon$ での割算は
$$
-\frac{\mathcal L(1+\varepsilon)}{\varepsilon}
=A-B\varepsilon+O(\varepsilon^2).
$$
差は $-B\varepsilon+O(\varepsilon^2)$ です。$n=2$ のような有限距離の点で一次係数 $A$ を厳密に読めるわけではありません。
<!-- solution-end -->

<a id="ex-bhi30-a04"></a>

#### BHI30-A04 整数値を保つ補正

- Level: A
- 問題: $h(n)=c\sin[\pi(n-1)]e^{-(n-1)^2}$（$c\ne0$）について、すべての正整数で $h(n)=0$、しかし $h'(1)\ne0$ を示せ。また、この例の物理的な限界を述べよ。

<!-- solution-start -->
**詳細解答**：正整数 $n=k$ では $k-1$ が整数だから $\sin[\pi(k-1)]=0$。積の微分から
$$
h'(n)=c\pi\cos[\pi(n-1)]e^{-(n-1)^2}
-2c(n-1)\sin[\pi(n-1)]e^{-(n-1)^2}.
$$
$n=1$ に代入すると $h'(1)=c\pi\ne0$。したがって整数値だけでは無制限な解析補間の微分値は固定されません。ただし $h$ を加えた関数が正の密度演算子のモーメントや、正しい重力積分の延長である保証はありません。ここでは物理的に許される延長の一意性を否定したのではなく、制約なしの補間を否定しました。
<!-- solution-end -->

<a id="ex-bhi30-a05"></a>

#### BHI30-A05 端点が二つあるislandの面積項

- Level: A
- 問題: 二端点 $p,q$ のislandについて $\Phi_0,G_2>0$ および実数 $\Phi(p),\Phi(q)$ を与え、重力エントロピー項を記せ。$S_{\rm matter}$ は固定し、$p$ だけを変分するときの停留条件を求めよ。

<!-- solution-start -->
**詳細解答**：[BHI24の一般化エントロピー台帳](../BHI24/index.md#def-bhi24-jt-island-ledger)から
$$
F(p,q)=\frac{2\Phi_0+\Phi(p)+\Phi(q)}{4G_2}
+S_{\rm matter}(R\cup I_{p,q}).
$$
$\Phi_0,G_2$ は固定定数で、$q$ と放射領域 $R$ も固定します。$p$ の局所座標 $x_p$ を使い、
$$
0=\partial_{x_p}F
=\frac{\partial_{x_p}\Phi(p)}{4G_2}
+\partial_{x_p}S_{\rm matter}(R\cup I_{p,q}).
$$
$\Phi_0$ の寄与は端点数が固定された変分では定数なので消えます。$q$ も動かすなら別の停留方程式が必要です。
<!-- solution-end -->

### Level B：端点変分と極限の順序

<a id="ex-bhi30-b01"></a>

#### BHI30-B01 端点模型を最初から解く

- Level: B
- 問題: $x>0$、$F(x)=2S_0+2x^2-8\log x$、$\mathcal J(1+\varepsilon,x)=\varepsilon F(x)+\varepsilon^2x$ とする。$\varepsilon>0$ の停留点 $x_\varepsilon$、極限 $x_*$、$F''(x_*)$ と $\lim_{\varepsilon\downarrow0}\mathcal J(1+\varepsilon,x_\varepsilon)/\varepsilon$ を求めよ。

<!-- solution-start -->
**詳細解答**：出発点は端点微分です。
$$
\partial_x\mathcal J
=\varepsilon(4x-8/x)+\varepsilon^2.
$$
$\varepsilon>0$ で割り $x>0$ を掛けると
$$
4x^2+\varepsilon x-8=0.
$$
正の解だけを採るので
$$
x_\varepsilon=\frac{-\varepsilon+\sqrt{\varepsilon^2+128}}8
\longrightarrow \frac{\sqrt{128}}8=\sqrt2.
$$
次に $F'(x)=4x-8/x$ は $x_*=\sqrt2$ で零で、
$$
F''(x_*)=4+\frac8{(\sqrt2)^2}=8>0.
$$
[オンシェル一次微分命題](#prop-bhi30-on-shell-derivative)の誤差 $E=\varepsilon^2x$ は必要な一様性を満たすので
$$
\frac{\mathcal J(1+\varepsilon,x_\varepsilon)}{\varepsilon}
=F(x_\varepsilon)+\varepsilon x_\varepsilon
\longrightarrow F(\sqrt2)
=2S_0+4-4\log2.
$$
$\log(\sqrt2)=\frac12\log2$ を使いました。
<!-- solution-end -->

<a id="ex-bhi30-b02"></a>

#### BHI30-B02 二つの極値枝とPage交差

- Level: B
- 問題: $t\ge0$ で $F_\varnothing(t)=3t$、$F_I(t)=12-t$ とする。両者はすでに端点極値化された二枝の候補値であり、[条件付きisland則](#prop-bhi30-conditional-island)の支配枝仮定が成り立つものとする。交差時刻と主項の関数を求め、左右の傾きを示せ。

<!-- solution-start -->
**詳細解答**：交差条件は $3t=12-t$ なので $4t=12$、従って $t_*=3$ です。$t<3$ では $3t<12-t$、$t>3$ では不等号が逆になるため
$$
S_{\rm leading}(t)=
\begin{cases}
3t,&0\le t\le3,\\
12-t,&t\ge3.
\end{cases}
$$
交差点で両枝は9、左傾きは3、右傾きは $-1$ です。これは指定した線形候補の半古典主項であり、実際のJT蒸発模型の係数や、交差点の有限補正を求めたものではありません。
<!-- solution-end -->

<a id="ex-bhi30-b03"></a>

#### BHI30-B03 混合とminの食い違いを数値で見る

- Level: B
- 問題: $p=1/4$、$a=2$、$b=6$、$N>0$ として[二枝混合](#prop-bhi30-mixture-limits)を考える。$-\partial_n\log M_N(n)|_1/N$ と、固定 $n>1$ の $N\to\infty$ 極限を求め、その差を計算せよ。

<!-- solution-start -->
**詳細解答**：$M_N(1)=1/4+3/4=1$ です。微分から
$$
-\frac1N\partial_n\log M_N(n)|_1
=\frac14\cdot2+\frac34\cdot6
=\frac12+\frac{18}4=5.
$$
一方、$\varepsilon>0$ 固定なら
$$
M_N(1+\varepsilon)=e^{-2N\varepsilon}
\left(\frac14+\frac34e^{-4N\varepsilon}\right).
$$
従って $\lim_{N\to\infty}-\log M_N/(N\varepsilon)=2$。二つの順序による差は $5-2=3$ です。$n=1$ 近傍の重みを無視して先に一枝を捨てたことが違いの原因です。
<!-- solution-end -->

<a id="ex-bhi30-b04"></a>

#### BHI30-B04 悪い誤差評価を反証する

- Level: B
- 問題: $\varepsilon>0$ で $\mathcal J(1+\varepsilon,x)=\varepsilon x^2+\varepsilon^2\sin(x/\varepsilon^2)$、$x\in[-1,1]$ とする。$E=O(\varepsilon^2)$ は一様に成り立つが、$\partial_xE=O(\varepsilon^2)$ は成り立たないことを確かめ、[端点微分命題](#prop-bhi30-on-shell-derivative)のどの仮定が破れるか説明せよ。

<!-- solution-start -->
**詳細解答**：$|\sin y|\le1$ より $|E|\le\varepsilon^2$ で、値の評価は一様に成立します。しかし
$$
\partial_xE
=\varepsilon^2\cos(x/\varepsilon^2)\frac1{\varepsilon^2}
=\cos(x/\varepsilon^2).
$$
例えば $x=0$ なら $\partial_xE=1$ であり、$\varepsilon\downarrow0$ でも零に近づきません。停留方程式は
$$
0=2\varepsilon x+\cos(x/\varepsilon^2)
$$
です。$\varepsilon$ で割った誤差の微分が小さくなるとは言えないため、本文の証明で使った $\nabla F(x_\varepsilon)=O(\varepsilon)$ が出ません。値の $O(\varepsilon^2)$ 制御と導関数の制御は別の条件です。
<!-- solution-end -->

### Level C：一つのレプリカ計算の適用範囲を監査する

<a id="ex-bhi30-c01"></a>

#### BHI30-C01 規格化・極値化・枝選択を一続きで行う

- Level: C
- 問題: JT・非重力浴のレプリカを模した半古典台帳を考える。$\varepsilon=n-1>0$、$Z_1=c>0$、空枝の正規化作用差を $\mathcal J_\varnothing=\varepsilon(5+t)$ とする。island枝は $x>0$ で
$$
\mathcal J_I(1+\varepsilon,x;t)
=\varepsilon[2S_0+x^2-4\log x+8-t]+\varepsilon^2x
$$
とし、$S_0>0$、$t\ge0$、$c$ は $t$ に依らない。両枝が物理的に許容され、各枝の一次係数が一般化エントロピーに等しく、支配枝の選択が正当化されると**仮定**する。
  1. $Z_n^{(j)}=c^n e^{-\mathcal J_j}$ とした各枝の正規化対数を求めよ。
  2. island端点の停留方程式を解き、$n\downarrow1$ の極限と二階微分を求めよ。
  3. 空枝とisland枝の先頭エントロピー値、交差時刻、選択枝を求めよ。
  4. これだけで証明していない物理的条件を三つ挙げ、なぜ必要か説明せよ。

<!-- solution-start -->
**詳細解答**：

**1. 正規化**：各枝では $Z_n^{(j)}/c^n=e^{-\mathcal J_j}$ なので
$$
\mathcal L_j(n)=\log Z_n^{(j)}-n\log c=-\mathcal J_j(n).
$$
$+\log c$ の補正を落とさなければ、両枝とも $n=1$ の正規化対数は零です。これは枝の個別計算であり、二枝を同時に足して物理的な $Z_1$ とする規格化ではありません。

**2. 端点の停留**：$F_I(x;t)=2S_0+x^2-4\log x+8-t$ を $x$ で微分します。
$$
\partial_x\mathcal J_I
=\varepsilon(2x-4/x)+\varepsilon^2=0.
$$
$\varepsilon>0,x>0$ で割って掛け直すと $2x^2+\varepsilon x-4=0$。正根は
$$
x_\varepsilon
=\frac{-\varepsilon+\sqrt{\varepsilon^2+32}}4
\longrightarrow\sqrt2.
$$
$F_I''(x)=2+4/x^2$ なので $F_I''(\sqrt2)=4>0$。$\partial_xE=\varepsilon^2$ は一様に制御されています。

**3. 各枝の一次係数と交差**：[オンシェルの導関数](#prop-bhi30-on-shell-derivative)により、空枝は $F_\varnothing=5+t$、island枝は
$$
F_I(\sqrt2;t)=2S_0+2-4\log\sqrt2+8-t
=2S_0+10-2\log2-t.
$$
交差は
$$
5+t=2S_0+10-2\log2-t
$$
なので
$$
t_*=\frac{2S_0+5-2\log2}{2}>0.
$$
$t<t_*$ では空枝が小さく、$t>t_*$ ではisland枝が小さい。与えた支配枝仮定の下で
$$
S_{\rm leading}(t)=
\begin{cases}
5+t,&0\le t\le t_*,\\
2S_0+10-2\log2-t,&t\ge t_*.
\end{cases}
$$
ここで実際の時間依存JT解やcutoff依存を代入したわけではありません。

**4. 物理への適用範囲**：第一に、表示した作用差が固定したJT・浴の場の方程式・境界条件に従う実鞍点から得られるかを調べる必要があります。任意の代数関数を重力解の作用と同一視できません。第二に、実数 $n$ への延長と $n=1$ 微分の正則性が必要です。整数値だけでは微分を決められません。第三に、他の位相・レプリカ対称性の破れ・積分輪郭と劣次項を検査して初めて最小候補が物理的な主項を与えます。さらに、$\rho_R$ の正規化モーメントとしての同一性も要ります。$n=1$ に二枝を無条件に加えると $Z_1$ の重複計上が生じ得ます。
<!-- solution-end -->

## 9. まとめと次講

- 規格化されたレプリカ微分は、$\log Z_n-n\log Z_1$ を微分して初めてエントロピーに一致します。
- レプリカ対称な端点族の作用差が $(n-1)S_{\rm gen}+O((n-1)^2)$ と微分可能に展開できれば、その停留点は一般化エントロピーの極値条件を満たします。
- 最小値則には、各枝の極値化に加えて、物理的な積分で支配枝が選択されるという別の入力が必要です。極限の交換や二枝の単純加算は自動的ではありません。
- 本章はJT＋非重力浴の指定した半古典計算の論理を確定します。四次元一般ブラックホールの完全復号をここから断言しません。

次のBHI31では、JTで複数境界を結ぶ鞍点の結果が**一つの固定量子理論**の分配関数を表しているのか、あるいはensemble平均に関わるのかを、factorizationの等式から検証します。

**参考文献**：Almheiri, Hartman, Maldacena, Shaghoulian & Tajdini, [*Replica Wormholes and the Entropy of Hawking Radiation*](https://arxiv.org/abs/1911.12333) (2020)；同著者 [*The Entropy of Hawking Radiation*](https://doi.org/10.1103/RevModPhys.93.035002) (2021)；Lewkowycz & Maldacena, [*Generalized Gravitational Entropy*](https://arxiv.org/abs/1304.4926) (2013)。
