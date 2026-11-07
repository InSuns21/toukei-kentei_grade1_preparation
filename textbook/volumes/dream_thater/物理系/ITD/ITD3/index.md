# ITD3 非平衡自由エネルギー・緩和・取り出せる仕事の上限

[ITD2のJarzynski等式](../ITD2/index.md#thm-itd2-jarzynski)では、最初に系を熱平衡へ用意しました。ところが、同じ温度・同じエネルギー準位でも、ある状態に確率が偏った系からは、制御の仕方によって余分な仕事を取り出せます。熱平衡の自由エネルギーだけでは、その違いを記録できません。

この章の問いは、**どんな確率の偏りが、いくらの仕事の可能性を持ち、その可能性は熱浴との接触でどう失われるか**です。[SM3の自由エネルギー変分原理](../../SM/SM3/index.md#thm-sm3-variational)と[INFO2の相対エントロピー](../../../応用系/INFO/INFO2/index.md#def-info2-relative-entropy)を実際の仕事・熱へつなぎます。相互情報量を使った測定・フィードバックは、この収支を理解した後で扱います。

空でない有限状態集合 $X$、有限なエネルギー $E(x,\lambda)\in\mathbb R$、一つの熱浴の温度 $T>0$、Boltzmann定数 $k_{\mathrm B}>0$ を考え、$\beta=1/(k_{\mathrm B}T)$ とします。対数 $\log$ は自然対数、確率分布は零を許し、$0\log0=0$ と約束します。[SM3の正準分布](../../SM/SM3/index.md#def-sm3-canonical)は

$$
Z_\lambda=\sum_{x\in X}e^{-\beta E(x,\lambda)}>0,\qquad
\pi_\lambda(x)=\frac{e^{-\beta E(x,\lambda)}}{Z_\lambda}>0,\qquad
F_{\mathrm{eq}}(\lambda)=-k_{\mathrm B}T\log Z_\lambda
$$

です。すべての状態で $\pi_\lambda(x)>0$ なので、任意の分布と比較しても相対エントロピーは有限になります。仕事 $W$ は外部が系にした量、熱 $Q$ は浴から系に入った量を正とし、取り出した仕事を $W_{\mathrm{ext}}=-W$ とします。

## 1. 同じエネルギーでも確率の偏りは違う

最初に $X=\{0,1\}$、両状態のエネルギーが0の系を考えます。温度 $T$ における平衡分布は $(1/2,1/2)$ ですが、状態0へ偏った $(3/4,1/4)$ も、状態0を確実に占有する $(1,0)$ も確率分布です。エネルギー平均はいずれも0です。しかし[SM3のGibbsエントロピー](../../SM/SM3/index.md#def-sm3-gibbs-entropy)は異なります。

分布 $p$ の平均エネルギーを $U[p,\lambda]$、その熱力学的エントロピーを $S[p]$ と書き、両者の差を調べます。これは[SM3の変分原理](../../SM/SM3/index.md#thm-sm3-variational)で分布ごとに値を定めた量を、**任意の時点の非平衡分布にも評価する**ものです。「非平衡」とは、この有限模型では $p$ が必ずしも正準分布でないという意味です。

<a id="def-itd3-noneq-free-energy"></a>

<!-- formal-statement-start -->
> **定義（有限分布の非平衡自由エネルギー）**  
> 空でない有限集合 $X$、有限な $E(x,\lambda)$、$k_{\mathrm B},T>0$、任意の確率分布 $p$ を取る。平均エネルギーとGibbsエントロピーを

$$
U[p,\lambda]=\sum_{x\in X}p(x)E(x,\lambda),\qquad
S[p]=-k_{\mathrm B}\sum_{x\in X}p(x)\log p(x)
$$

> として、非平衡自由エネルギーを

$$
\mathcal F[p,\lambda]=U[p,\lambda]-TS[p]
=\sum_xp(x)E(x,\lambda)+k_{\mathrm B}T\sum_xp(x)\log p(x)
$$

> と定義する。$0\log0=0$ とし、$p(x)=0$ を認める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-itd3-noneq-free-energy -->
### 例：同じ平均エネルギー、異なる自由エネルギー

**定義の確認**：$E(0,\lambda)=E(1,\lambda)=0$ の二状態で $p=(q,1-q)$、$0\le q\le1$ とします。両確率は非負で和が1、エネルギーは有限ですから定義の全条件を満たします。二値エントロピーを nat 単位で

$$
h(q)=-q\log q-(1-q)\log(1-q)
$$

と記すと、$U=0$、$S=k_{\mathrm B}h(q)$、$\mathcal F=-k_{\mathrm B}Th(q)$ です。特に

$$
\begin{array}{c|c|c}
p& S[p]&\mathcal F[p,\lambda]\\ \hline
(1/2,1/2)&k_{\mathrm B}\log2&-k_{\mathrm B}T\log2\\
(3/4,1/4)&k_{\mathrm B}h(3/4)&-k_{\mathrm B}Th(3/4)\\
(1,0)&0&0
\end{array}
$$

となります。最後の行では $0\log0=0$ を使いました。[正準自由エネルギー](../../SM/SM3/index.md#def-sm3-free-energy)は $-k_{\mathrm B}T\log2$ なので、偏りが強いほど非平衡自由エネルギーが大きくなります。この差は**ただちに仕事を取り出せた量**ではなく、操作で利用できる可能性の上限を表します。
<!-- definition-example-end -->

ここで「どのくらい平衡から離れているか」を数にします。自由エネルギーの差はエネルギーの次元を持つため、温度を固定した比較に適しています。

<a id="def-itd3-excess-free-energy"></a>

<!-- formal-statement-start -->
> **定義（自由エネルギーの超過量）**  
> 空でない有限集合 $X$、有限な $E(x,\lambda)$、$k_{\mathrm B},T>0$ と任意の確率分布 $p$ に対し、[非平衡自由エネルギー](#def-itd3-noneq-free-energy)と[正準自由エネルギー](../../SM/SM3/index.md#def-sm3-free-energy)の差を

$$
\mathcal A[p,\lambda]=\mathcal F[p,\lambda]-F_{\mathrm{eq}}(\lambda)
$$

> と定め、これを自由エネルギーの超過量と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-itd3-excess-free-energy -->
### 例：超過量の単位と符号

**定義の確認**：直前の等エネルギー二状態では $F_{\mathrm{eq}}=-k_{\mathrm B}T\log2$ なので

$$
\mathcal A[(q,1-q),\lambda]=k_{\mathrm B}T\{\log2-h(q)\}.
$$

$q=1/2$ なら0、$q=1$ なら $k_{\mathrm B}T\log2$、$q=3/4$ ならその中間です。$k_{\mathrm B}T$ の単位はエネルギー、括弧内は無次元で、単位が整合します。
<!-- definition-example-end -->

## 2. 自由エネルギーの差は相対エントロピー

[INFO2の相対エントロピー](../../../応用系/INFO/INFO2/index.md#def-info2-relative-entropy)は底2の対数を用いた **bit 単位**の量 $D_2(p\Vert q)$ です。一方、熱力学の式の $\log$ は自然対数を使います。ここでは

$$
D_{\mathrm{nat}}(p\Vert q)
=\sum_{x:p(x)>0}p(x)\log\frac{p(x)}{q(x)}
=(\ln2)D_2(p\Vert q)
$$

と記して区別します。$q(x)>0$ を全状態で仮定した有限分布の比較なので、右辺の分母は正です。

<a id="prop-itd3-kl-identity"></a>

<!-- formal-statement-start -->
> **命題（自由エネルギー差の相対エントロピー表示）**  
> 空でない有限集合 $X$、有限な $E(x,\lambda)$、$k_{\mathrm B},T>0$、任意の確率分布 $p$ を取る。[正準分布](../../SM/SM3/index.md#def-sm3-canonical) $\pi_\lambda(x)=e^{-\beta E(x,\lambda)}/Z_\lambda$、$\beta=(k_{\mathrm B}T)^{-1}$ に対して

$$
\mathcal A[p,\lambda]
=k_{\mathrm B}T D_{\mathrm{nat}}(p\Vert\pi_\lambda)
=k_{\mathrm B}T(\ln2)D_2(p\Vert\pi_\lambda)\ge0
$$

> が成り立つ。等号は $p=\pi_\lambda$ の場合、かつその場合に限る。
<!-- formal-statement-end -->

### 証明の見取り図

$\log\pi_\lambda$ を展開すると、$\log Z_\lambda$ とエネルギーが現れます。これを分布 $p$ で平均すると、非平衡自由エネルギーと平衡自由エネルギーの差になります。非負性は既習の[INFO2のGibbs不等式](../../../応用系/INFO/INFO2/index.md#thm-info2-gibbs)から得ます。

<!-- proof-start -->
### 証明

$\pi_\lambda(x)>0$ なので、$p(x)>0$ の項では $\log\pi_\lambda(x)=-\beta E(x,\lambda)-\log Z_\lambda$ を代入できます。

$$
\begin{aligned}
k_{\mathrm B}T D_{\mathrm{nat}}(p\Vert\pi_\lambda)
&=k_{\mathrm B}T\sum_{p(x)>0}p(x)\log p(x)
-k_{\mathrm B}T\sum_{p(x)>0}p(x)\log\pi_\lambda(x)\\
&=k_{\mathrm B}T\sum_xp(x)\log p(x)
+\sum_xp(x)E(x,\lambda)
+k_{\mathrm B}T\log Z_\lambda\sum_xp(x)\\
&=\mathcal F[p,\lambda]-F_{\mathrm{eq}}(\lambda).
\end{aligned}
$$

第2行では $k_{\mathrm B}T\beta=1$ と $\sum_xp(x)=1$ を用いました。これは[SM3の変分原理](../../SM/SM3/index.md#thm-sm3-variational)の等式を本章の記号へ移したものです。[INFO2のGibbs不等式](../../../応用系/INFO/INFO2/index.md#thm-info2-gibbs)により $D_2\ge0$、等号は $p=\pi_\lambda$ に限ります。底の変換 $\log u=(\ln2)\log_2u$ を各正の項へ適用すると残りの等式も得られます。
<!-- proof-end -->

### 例：エネルギーの違う二準位でも同じ式になる

$E(0,\lambda)=0$、$E(1,\lambda)=\varepsilon$、$\beta\varepsilon=\log3$ とします。$Z_\lambda=1+1/3=4/3$、$\pi_\lambda=(3/4,1/4)$ です。あえて $p=(1/2,1/2)$ を用いると

$$
\begin{aligned}
D_{\mathrm{nat}}(p\Vert\pi_\lambda)
&=\frac12\log\frac{1/2}{3/4}+\frac12\log\frac{1/2}{1/4}\\
&=\frac12\{\log(2/3)+\log2\}
=\frac12\log\frac43.
\end{aligned}
$$

他方 $U=\varepsilon/2$、$S=k_{\mathrm B}\log2$、$F_{\mathrm{eq}}=-k_{\mathrm B}T\log(4/3)$ より

$$
\frac{\mathcal F-F_{\mathrm{eq}}}{k_{\mathrm B}T}
=\frac12\log3-\log2+\log\frac43
=\frac12\log\frac43
$$

です。$p$ の方が一様でも、エネルギー準位が非対称なら平衡でないことが分かります。

## 3. 熱浴で緩和すると超過量は減る

「平衡と違う分布」が熱浴との接触でどのように変わるかを調べます。[ITD1の遷移核](../ITD1/index.md#def-itd1-controlled-model) $K(x,y)$ は、接触直前に $x$ だった系が直後に $y$ となる条件付き確率です。制御値 $\lambda$ を固定し、[局所詳細釣合い](../ITD1/index.md#def-itd1-local-detailed-balance)を満たすなら、[正準分布の不変性](../ITD1/index.md#prop-itd1-canonical-balance)から $\pi_\lambda K=\pi_\lambda$ が成立します。これは分布 $p$ が一回で平衡になるという意味ではありません。

以下では一回の接触後の分布を $p'$ と書き、$p'=pK$ と表します。プライムは時間微分ではありません。状態 $y$ の確率は、接触前の各状態 $x$ からの寄与を足した $p'(y)=\sum_xp(x)K(x,y)$ です。

<a id="thm-itd3-relaxation"></a>

<!-- formal-statement-start -->
> **定理（熱浴接触による非平衡自由エネルギーの単調性）**  
> 空でない有限集合 $X$、有限な $E(x,\lambda)$、$k_{\mathrm B},T>0$ を固定する。$p$ は任意の確率分布、$K(x,y)$ は非負・行和1の遷移核であり、固定した $\lambda$ の正準分布 $\pi_\lambda$ に対して $\pi_\lambda K=\pi_\lambda$ を満たすとする。$p'(y)=\sum_xp(x)K(x,y)$ なら

$$
D_{\mathrm{nat}}(p'\Vert\pi_\lambda)
\le D_{\mathrm{nat}}(p\Vert\pi_\lambda),\qquad
\mathcal F[p',\lambda]\le\mathcal F[p,\lambda].
$$

> 特に同一温度の熱浴との固定 $\lambda$ の接触が[局所詳細釣合い](../ITD1/index.md#def-itd1-local-detailed-balance)を満たすなら、この仮定を満たす。$K(x,y)>0$ が全組で成立する場合、等号は $p=\pi_\lambda$ に限る。
<!-- formal-statement-end -->

### 証明の見取り図

同じ遷移核で $p$ と $\pi_\lambda$ を運んだ二分布を比較します。[INFO2のデータ処理不等式](../../../応用系/INFO/INFO2/index.md#thm-info2-relative-dpi)で両者の差は増えません。平衡分布は変化せず、自由エネルギーの超過量が相対エントロピーに比例するため、求める単調性になります。

<!-- proof-start -->
### 証明

$p'=pK$、$\pi_\lambda K=\pi_\lambda$ と書きます。[INFO2のデータ処理不等式](../../../応用系/INFO/INFO2/index.md#thm-info2-relative-dpi)へ、入力分布 $P=p$、$Q=\pi_\lambda$、共通通信路 $W=K$ を代入します。$\pi_\lambda(x)>0$ なので相対エントロピーは有限で、通信路は行和1です。従って

$$
\begin{aligned}
D_{\mathrm{nat}}(p'\Vert\pi_\lambda)
&=D_{\mathrm{nat}}(pK\Vert\pi_\lambda K)\\
&\le D_{\mathrm{nat}}(p\Vert\pi_\lambda).
\end{aligned}
$$

この不等式の中身を確かめるには、出力 $y$ を固定して $a_x=p(x)K(x,y)$、$b_x=\pi_\lambda(x)K(x,y)$ と置き、[対数和不等式](../../../応用系/INFO/INFO2/index.md#lem-info2-log-sum)を適用します。各 $y$ で $\sum_xa_x=p'(y)$、$\sum_xb_x=\pi_\lambda(y)$ です。$y$ について足し、$\sum_yK(x,y)=1$ を使うと上式に戻ります。$a_x=0$ の項は0とし、分母 $b_x$ が0となる項は $a_x=0$ でもあるため、零で割っていません。

さらに[自由エネルギーの相対エントロピー表示](#prop-itd3-kl-identity)を両辺に用い、同じ $F_{\mathrm{eq}}(\lambda)$ を足せば単調性が従います。

等号条件も確認します。全成分正の $K$ の場合、対数和不等式の等号には、各出力 $y$ へ到達できるすべての入力 $x$ について $p(x)/\pi_\lambda(x)$ が同じであることが必要です。

全成分が正なので、その比は全状態で同じ定数 $c$ になります。両分布の規格化から $c=1$、すなわち $p=\pi_\lambda$ です。逆は代入すれば等号です。

[ITD1の正準分布と局所詳細釣合いの命題](../ITD1/index.md#prop-itd1-canonical-balance)により、後者の接触では $\pi_\lambda K=\pi_\lambda$ となります。
<!-- proof-end -->

### 例：同じ温度の接触だけでは仕事を取り出していない

等エネルギー二状態で $\pi=(1/2,1/2)$、$p=(1,0)$ とします。状態を $0,1$ の順に並べ、行を接触前の状態 $x$、列を接触後の状態 $y$ とすると、条件付き確率 $K(x,y)$ は次の行列になります。

$$
K=\begin{pmatrix}3/4&1/4\\1/4&3/4\end{pmatrix}
$$

各行の和は1で、成分の非負性と対称性も直接確認できます。エネルギー差が0なので[局所詳細釣合い](../ITD1/index.md#def-itd1-local-detailed-balance)を満たします。更新後は $p'=(3/4,1/4)$、$\pi K=\pi$ です。

$$
\begin{aligned}
D_{\mathrm{nat}}(p\Vert\pi)&=\log2,\\
D_{\mathrm{nat}}(p'\Vert\pi)
&=\frac34\log\frac32+\frac14\log\frac12
=\log2-h(3/4)<\log2.
\end{aligned}
$$

制御を変えていないので $W=0$、エネルギー差も0なので $Q=0$ です。それでも $\mathcal F$ は $k_{\mathrm B}Th(3/4)$ だけ減少します。これは取り出した仕事ではなく、**制御せずに緩和させたため失われた仕事の可能性**です。$K=I$ のように分布が変わらない核なら等号もあり、局所詳細釣合いだけでは一回の接触で厳密に減少するとは言えません。

## 4. 仕事を伴う操作では自由エネルギー差が下限になる

固定 $\lambda$ の緩和では $W=0$ でした。制御値を動かせば、準位の変更時に仕事が発生します。[ITD1の仕事・熱](../ITD1/index.md#def-itd1-path-work-heat)を使って、操作と熱浴接触を交互に行う有限段階の過程を考えます。

初期分布を $p_0$、最後の分布を $p_n$ とします。[ITD1の全エントロピー生成](../ITD1/index.md#def-itd1-reverse-entropy)は初期分布が全状態で正という条件の下で導入しました。ここでは確率0の初期状態も扱うため、**正確率の正方向経路で経路確率比を直接定義し、平均を評価する**ことにします。その平均は系のエントロピー変化と、浴へ出た熱に分かれます。

<a id="thm-itd3-work-bound"></a>

<!-- formal-statement-start -->
> **定理（非平衡自由エネルギーと平均仕事の下限）**  
> 空でない有限状態集合 $X$、有限な $E(x,\lambda_j)$、$k_{\mathrm B},T>0$ と整数 $n\ge1$ を取る。
> [ITD1の操作・接触模型](../ITD1/index.md#def-itd1-controlled-model)に従い、各段階でquenchの後に単一温度 $T$ の浴へ接触する。
> 各核 $K_j$ は行和1と[局所詳細釣合い](../ITD1/index.md#def-itd1-local-detailed-balance)を満たすとする。
> 初期分布 $p_0$ は零確率を許し、終端分布を $p_n$ とする。
> 外部から系へした軌道仕事 $W$、浴から系への軌道熱 $Q$ を用いると

$$
\begin{aligned}
\langle W\rangle_{\mathrm F}
&\ge\mathcal F[p_n,\lambda_n]-\mathcal F[p_0,\lambda_0],\\
\frac{\langle W\rangle_{\mathrm F}
-(\mathcal F[p_n,\lambda_n]-\mathcal F[p_0,\lambda_0])}{k_{\mathrm B}T}
&=\langle\Sigma\rangle_{\mathrm F}\ge0.
\end{aligned}
$$

> ここで正確率の正軌道 $\gamma=(x_0,\ldots,x_n)$ に対して

$$
\begin{aligned}
P_{\mathrm R}(\gamma^\dagger)&=p_n(x_n)\prod_{j=1}^nK_j(x_j,x_{j-1}),\\
\Sigma[\gamma]&=\log\frac{P_{\mathrm F}(\gamma)}{P_{\mathrm R}(\gamma^\dagger)}
\end{aligned}
$$

> とする。等号成立は全経路上の分布 $P_{\mathrm F}(\gamma)$ と $P_{\mathrm R}(\gamma^\dagger)$ が一致することと同値である。
<!-- formal-statement-end -->

### 証明の見取り図

まず正確率の経路上で局所詳細釣合いを用いて $\Sigma$ を系の分布比と浴の熱へ分けます。平均すれば分布比は系のエントロピー差に、熱は平均の熱に変わります。[軌道第一法則](../ITD1/index.md#thm-itd1-first-law)の平均を代入すると仕事と自由エネルギーの差が残ります。非負性は正逆の経路確率の相対エントロピーです。

<!-- proof-start -->
### 証明

正方向の経路確率は[ITD1の軌道確率](../ITD1/index.md#def-itd1-path-probability)より

$$
P_{\mathrm F}(\gamma)
=p_0(x_0)\prod_{j=1}^nK_j(x_{j-1},x_j).
$$

これが正なら $p_0(x_0)>0$、各正方向遷移は正です。局所詳細釣合いの双方向支持から逆遷移も正であり、正方向に到達できる終端 $x_n$ には $p_n(x_n)>0$ です。従って対応する $P_{\mathrm R}(\gamma^\dagger)>0$ で、対数比は有限です。逆実験は $p_n$ と行和1の核から作った規格化済みの経路分布です。正の初期分布を全状態に仮定しなくても、正の前向き経路が逆向きで欠けることはありません。

各段階に[局所詳細釣合い](../ITD1/index.md#def-itd1-local-detailed-balance)を用います。熱の符号は [ITD1の経路確率比](../ITD1/index.md#thm-itd1-path-ratio)と同じですが、ここではその定理の初期分布正値条件を使わず、上で確認した正確率の経路だけで直接導きます。

$$
\begin{aligned}
\Sigma[\gamma]
&=\log\frac{p_0(x_0)}{p_n(x_n)}
+\sum_{j=1}^n\log\frac{K_j(x_{j-1},x_j)}{K_j(x_j,x_{j-1})}\\
&=\log p_0(x_0)-\log p_n(x_n)-\beta Q[\gamma].
\end{aligned}
$$

平均では始点 $x_0$ の周辺分布が $p_0$、終点 $x_n$ の周辺分布が $p_n$ であることを使います。すなわち

$$
\begin{aligned}
\langle\Sigma\rangle_{\mathrm F}
&=\sum_xp_0(x)\log p_0(x)
-\sum_yp_n(y)\log p_n(y)-\beta\langle Q\rangle_{\mathrm F}\\
&=\frac{S[p_n]-S[p_0]}{k_{\mathrm B}}
-\frac{\langle Q\rangle_{\mathrm F}}{k_{\mathrm B}T}.
\end{aligned}
$$

零確率の項は平均に寄与しないため $0\log0=0$ で一貫します。次に[軌道第一法則](../ITD1/index.md#thm-itd1-first-law)を平均して

$$
U[p_n,\lambda_n]-U[p_0,\lambda_0]
=\langle W\rangle_{\mathrm F}+\langle Q\rangle_{\mathrm F}
$$

を得ます。この式から $\langle Q\rangle=\Delta U-\langle W\rangle$ を直前のエントロピー式へ代入すると

$$
\begin{aligned}
k_{\mathrm B}T\langle\Sigma\rangle_{\mathrm F}
&=T\{S[p_n]-S[p_0]\}-\{U[p_n,\lambda_n]-U[p_0,\lambda_0]\}
+\langle W\rangle_{\mathrm F}\\
&=\langle W\rangle_{\mathrm F}
 -\{\mathcal F[p_n,\lambda_n]-\mathcal F[p_0,\lambda_0]\}.
\end{aligned}
$$

最後に、逆実験を反転した $P_{\mathrm R}^{\dagger}(\gamma)=P_{\mathrm R}(\gamma^\dagger)$ は全軌道上の確率分布です。上記の支持確認により $P_{\mathrm F}\ll P_{\mathrm R}^{\dagger}$ なので、[INFO2のGibbs不等式](../../../応用系/INFO/INFO2/index.md#thm-info2-gibbs)を適用できます。

$$
\langle\Sigma\rangle_{\mathrm F}
=D_{\mathrm{nat}}(P_{\mathrm F}\Vert P_{\mathrm R}^{\dagger})\ge0.
$$

等号となるのは正方向と反転した逆実験の全軌道の分布が一致するときに限ります。$p_0$ に零があっても、もし逆実験だけに余分な支持があればその質量のために両分布は一致しません。
<!-- proof-end -->

この不等式は**任意の仕事抽出装置が実現できるという主張ではありません**。実際の操作に対して第二法則が許す上限です。固定した操作順・有限時間・利用可能な制御装置の制約によって、上限よりかなり少ない仕事しか得られないことがあります。また同じ $\lambda$ での熱浴緩和は $\langle W\rangle=0$ ですから、そこで失われた自由エネルギーは自動的には仕事になりません。

<a id="cor-itd3-extractable-work"></a>

<!-- formal-statement-start -->
> **系（平衡到達時の取り出せる仕事の上限）**  
> [非平衡自由エネルギーと平均仕事の定理](#thm-itd3-work-bound)の仮定の下、終端分布が最終制御値 $\lambda_n$ の正準分布 $p_n=\pi_{\lambda_n}$ であるとする。取り出した仕事 $W_{\mathrm{ext}}=-W$ について

$$
\langle W_{\mathrm{ext}}\rangle_{\mathrm F}
\le-\{F_{\mathrm{eq}}(\lambda_n)-F_{\mathrm{eq}}(\lambda_0)\}
+k_{\mathrm B}T D_{\mathrm{nat}}(p_0\Vert\pi_{\lambda_0}).
$$

> 特に始点と終点のエネルギー準位が同じなら、上限は
> $k_{\mathrm B}TD_{\mathrm{nat}}(p_0\Vert\pi_{\lambda_0})$ である。等号には元の仕事の下限で平均エントロピー生成が0となることが必要十分である。
<!-- formal-statement-end -->

### 証明の見取り図

終端で非平衡自由エネルギーは平衡自由エネルギーになります。始点の非平衡自由エネルギーを「平衡値＋超過量」に分解します。

<!-- proof-start -->
### 証明

[仕事の下限](#thm-itd3-work-bound)を符号反転し、終端が正準分布なので[超過量の相対エントロピー表示](#prop-itd3-kl-identity)から $\mathcal F[\pi_{\lambda_n},\lambda_n]=F_{\mathrm{eq}}(\lambda_n)$ となることを使います。

$$
\begin{aligned}
\langle W_{\mathrm{ext}}\rangle
&\le\mathcal F[p_0,\lambda_0]-F_{\mathrm{eq}}(\lambda_n)\\
&=F_{\mathrm{eq}}(\lambda_0)+k_{\mathrm B}T
D_{\mathrm{nat}}(p_0\Vert\pi_{\lambda_0})
-F_{\mathrm{eq}}(\lambda_n).
\end{aligned}
$$

同じ始終点の準位なら分配関数も等しく $F_{\mathrm{eq}}(\lambda_n)=F_{\mathrm{eq}}(\lambda_0)$ です。等号条件は仕事の下限での $\langle\Sigma\rangle=0$ と同じです。
<!-- proof-end -->

同じ準位で $(1,0)$ から平衡 $(1/2,1/2)$ に至る二状態系の上限は $k_{\mathrm B}T\log2$ です。ただし**測定装置も記憶の初期化も含めた装置全体の純利益**をこれだけで主張してはいけません。測定や記憶を仕事の帳簿へ入れるのは後続の課題です。

### 平衡初期条件を外すと何が変わるか

[ITD2のJarzynski等式](../ITD2/index.md#thm-itd2-jarzynski)は初期分布が $\pi_{\lambda_0}$ であることが必要です。一方、本章の仕事の不等式は非平衡な $p_0$ にも適用でき、

$$
\langle W\rangle
\ge F_{\mathrm{eq}}(\lambda_n)-F_{\mathrm{eq}}(\lambda_0)
+k_{\mathrm B}T\{D_{\mathrm{nat}}(p_n\Vert\pi_{\lambda_n})
-D_{\mathrm{nat}}(p_0\Vert\pi_{\lambda_0})\}
$$

となります。これは両端で[超過量の相対エントロピー表示](#prop-itd3-kl-identity)を代入しただけです。初期が平衡なら最後の負の項が消えますが、非平衡なら使える偏りを帳簿から落とせません。たとえば $p_0=(1,0)$ の二状態で状態1だけをquenchしても、状態1を占有しない限り仕事は0です。指数仕事平均を平衡初期のものと混同しないでください。

## 5. 演習：分布の偏りから仕事の帳簿へ

すべて有限状態、$k_{\mathrm B},T>0$、$\beta=(k_{\mathrm B}T)^{-1}$ とし、特に指定しない限り $\log$ は自然対数、$W$ は外部から系への仕事、$Q$ は浴から系への熱です。

### Level A：量と単位を手で確かめる

#### A1. 一様準位での自由エネルギー超過量

$X=\{0,1\}$、$E_0=E_1=0$ とする。$p=(1,0)$ と $p=(1/2,1/2)$ のそれぞれで $U,S,\mathcal F,\mathcal A$ を求めよ。零確率の項の扱いも説明せよ。

- Level: A
- ID: ITD3-A1

<!-- solution-start -->
**詳細解答**　まず $Z=e^0+e^0=2$ なので、平衡自由エネルギーは $F_{\mathrm{eq}}=-k_{\mathrm B}T\log2$ です。[非平衡自由エネルギー](#def-itd3-noneq-free-energy)の定義から、どちらの分布でも平均エネルギーは $U=0$ です。

$p=(1,0)$ では $1\log1=0$ であり、零確率の項には $0\log0=0$ の約束を使います。従って

$$
S=0,\qquad \mathcal F=0,\qquad
\mathcal A=\mathcal F-F_{\mathrm{eq}}=k_{\mathrm B}T\log2.
$$

他方、$p=(1/2,1/2)$ では

$$
S=-k_{\mathrm B}\left(\frac12\log\frac12+\frac12\log\frac12\right)
=k_{\mathrm B}\log2.
$$

よって $\mathcal F=-k_{\mathrm B}T\log2=F_{\mathrm{eq}}$、$\mathcal A=0$ です。零確率を対数へ直接代入して $\log0$ を評価してはいけません。
<!-- solution-end -->

#### A2. bit と nat を混ぜない

等エネルギー二状態で $p=(3/4,1/4)$、$\pi=(1/2,1/2)$ とする。$D_{\mathrm{nat}}(p\Vert\pi)$ と $D_2(p\Vert\pi)$ を計算し、$\mathcal A$ を二通りで書け。

- Level: A
- ID: ITD3-A2

<!-- solution-start -->
**詳細解答**　[相対エントロピー表示](#prop-itd3-kl-identity)の定義域は $\pi>0$ なので満たされています。正の二項を直接足すと

$$
\begin{aligned}
D_{\mathrm{nat}}(p\Vert\pi)
&=\frac34\log\frac{3/4}{1/2}
+\frac14\log\frac{1/4}{1/2}\\
&=\frac34\log\frac32-\frac14\log2.
\end{aligned}
$$

底2へ換算すると $D_2=\{\frac34\log(3/2)-\frac14\log2\}/\ln2=\frac34\log_2(3/2)-\frac14$ bit です。従って $\mathcal A=k_{\mathrm B}T\{\frac34\log(3/2)-\frac14\log2\}=k_{\mathrm B}T(\ln2)D_2$ です。bitの数値をそのまま $k_{\mathrm B}T$ に掛けると係数 $\ln2$ が抜けます。
<!-- solution-end -->

#### A3. 非対称な二準位

$E(0)=0$、$E(1)=\varepsilon>0$、$\beta\varepsilon=\log3$、$p=(1/2,1/2)$ とする。$\pi$、$D_{\mathrm{nat}}(p\Vert\pi)$、$\mathcal F-F_{\mathrm{eq}}$ を求め、両者が一致することを確かめよ。

- Level: A
- ID: ITD3-A3

<!-- solution-start -->
**詳細解答**　$Z=1+e^{-\beta\varepsilon}=1+1/3=4/3$ で、$\pi=(3/4,1/4)$ です。分母は全て正なので

$$
D_{\mathrm{nat}}(p\Vert\pi)
=\frac12\log\frac23+\frac12\log2
=\frac12\log\frac43.
$$

$U=\varepsilon/2$、$S=k_{\mathrm B}\log2$ だから $\mathcal F/k_{\mathrm B}T=(\log3)/2-\log2$、$F_{\mathrm{eq}}/k_{\mathrm B}T=-\log(4/3)$ です。差は $\frac12\log3-\log2+\log(4/3)=\frac12\log(4/3)$ であり、$k_{\mathrm B}TD_{\mathrm{nat}}$ と一致します。
<!-- solution-end -->

#### A4. 対称核で一回だけ緩和

等エネルギー二状態、$p=(1,0)$、$K=\begin{pmatrix}3/4&1/4\\1/4&3/4\end{pmatrix}$ とする。$pK$、$\pi K$、接触前後の $\mathcal A$ を求め、減少量を $h(3/4)$ で表せ。

- Level: A
- ID: ITD3-A4

<!-- solution-start -->
**詳細解答**　核の各成分は非負、各行和は1で、非対角の比は1、エネルギー差は0です。従って[局所詳細釣合い](../ITD1/index.md#def-itd1-local-detailed-balance)を満たします。$\pi=(1/2,1/2)$ として

$$
pK=(1,0)K=(3/4,1/4),\quad
\pi K=(\tfrac12\cdot\tfrac34+\tfrac12\cdot\tfrac14,\tfrac12\cdot\tfrac14+\tfrac12\cdot\tfrac34)=\pi.
$$

[超過量の定義](#def-itd3-excess-free-energy)から $\mathcal A_{\mathrm{before}}=k_{\mathrm B}T\log2$、$\mathcal A_{\mathrm{after}}=k_{\mathrm B}T\{\log2-h(3/4)\}$ です。差は $k_{\mathrm B}Th(3/4)>0$。対称性だけでなく核の行和と $\pi K=\pi$ まで確認しました。
<!-- solution-end -->

#### A5. 熱も仕事も零でもエントロピーは生まれる

A4の過程で制御値を一定に保つ。$\langle W\rangle$、$\langle Q\rangle$、$\Delta U$、$\Delta S$ と $\langle\Sigma\rangle$ を求め、仕事の下限の両辺を検算せよ。

- Level: A
- ID: ITD3-A5

<!-- solution-start -->
**詳細解答**　準位も制御値も変わらないので[軌道の仕事・熱](../ITD1/index.md#def-itd1-path-work-heat)から各経路で $W=Q=0$、従って平均も零、$\Delta U=0$ です。初期 $p=(1,0)$ では $S_0=0$、終端 $(3/4,1/4)$ では $S_1=k_{\mathrm B}h(3/4)$ なので $\Delta S=k_{\mathrm B}h(3/4)$ です。[仕事の下限定理](#thm-itd3-work-bound)の経路平均式に代入すると

$$
\langle\Sigma\rangle=\frac{\Delta S}{k_{\mathrm B}}-\beta\langle Q\rangle=h(3/4)>0.
$$

自由エネルギー差は $\Delta\mathcal F=-T\Delta S=-k_{\mathrm B}Th(3/4)$。下限は $0=\langle W\rangle\ge-k_{\mathrm B}Th(3/4)$ で確かに成立し、その差は $k_{\mathrm B}T\langle\Sigma\rangle$ です。熱も仕事も零であることと不可逆性が零であることは同義ではありません。
<!-- solution-end -->

### Level B：どの仮定で単調性と仕事の限界が成立するか

#### B1. 相対エントロピーの非負性を零確率まで確かめる

有限集合 $X$ 上の任意の分布 $p$ と、全成分が正の分布 $q$ について、$\log t\le t-1$ を使い $D_{\mathrm{nat}}(p\Vert q)\ge0$ を導け。等号成立条件と、$p$ が零確率を含む場合の注意を述べよ。

- Level: B
- ID: ITD3-B1

<!-- solution-start -->
**詳細解答**　$p(x)>0$ の項に対し $t=q(x)/p(x)>0$ なので、$\log t\le t-1$ より

$$
p(x)\log\frac{p(x)}{q(x)}
\ge p(x)-q(x)
$$

です。$A=\{x:p(x)>0\}$ とすると

$$
D_{\mathrm{nat}}(p\Vert q)
\ge\sum_{x\in A}\{p(x)-q(x)\}
=1-\sum_{x\in A}q(x)
=\sum_{x\notin A}q(x)\ge0.
$$

ここで $p(x)=0$ の項には $q(x)/p(x)$ を作っていません。零確率の状態があれば $q(x)>0$ により最後の式は正です。零がなければ $\log t\le t-1$ の等号は全状態で $q(x)/p(x)=1$ のときだけなので、結局等号は $p=q$ と同値です。これは[INFO2のGibbs不等式](../../../応用系/INFO/INFO2/index.md#thm-info2-gibbs)の自然対数版です。
<!-- solution-end -->

#### B2. 平衡を保存しない核で何が壊れるか

等エネルギー二状態、$\pi=(1/2,1/2)$、$p=\pi$ とする。$K=\begin{pmatrix}1&0\\1&0\end{pmatrix}$ に対し、$pK$、$\pi K$、前後の超過量を求めよ。なぜ本章の熱浴緩和定理へ適用できないのか。また、この同じ核へ二分布を入れるデータ処理不等式そのものに矛盾はあるか。

- Level: B
- ID: ITD3-B2

<!-- solution-start -->
**詳細解答**　核は非負・行和1なので確率通信路ではあります。しかし

$$
pK=(1,0),\qquad \pi K=(1,0)\ne\pi
$$

です。開始時は $\mathcal A[p]=0$、終了時は $\mathcal A[pK]=k_{\mathrm B}T\log2>0$ です。[緩和定理](#thm-itd3-relaxation)が仮定した $\pi K=\pi$ に反します。実際、等エネルギーの状態1から0への遷移は $K(1,0)=1$、逆は $K(0,1)=0$ であり、[局所詳細釣合い](../ITD1/index.md#def-itd1-local-detailed-balance)の双方向支持も破れます。

一方、[データ処理不等式](../../../応用系/INFO/INFO2/index.md#thm-info2-relative-dpi)は同じ核で運んだ $pK$ と $\pi K$ を比較するので、

$$
D_{\mathrm{nat}}(pK\Vert\pi K)=D_{\mathrm{nat}}((1,0)\Vert(1,0))=0
=D_{\mathrm{nat}}(p\Vert\pi)
$$

と成立します。比較対象を勝手に固定した元の $\pi$ へ置き換えたことが誤りです。この核を熱浴だけの無償操作と解釈することもできません。
<!-- solution-end -->

#### B3. 両端の偏りを含めて仕事の下限を書き直す

有限状態の局所詳細釣合い過程で、初期・終端分布が $p_0,p_n$、対応する正準分布が $\pi_0,\pi_n$ であるとする。[仕事の下限](#thm-itd3-work-bound)を $\Delta F_{\mathrm{eq}}$ と二つの相対エントロピーで表せ。始点だけ平衡、終点だけ平衡、両方平衡の場合を比較せよ。

- Level: B
- ID: ITD3-B3

<!-- solution-start -->
**詳細解答**　[相対エントロピー表示](#prop-itd3-kl-identity)を各端点へ適用します。$j=0,n$ に対して $D_j=D_{\mathrm{nat}}(p_j\Vert\pi_j)$ と置きます。

$$
\begin{aligned}
\mathcal F[p_n,\lambda_n]-\mathcal F[p_0,\lambda_0]
&=\{F_{\mathrm{eq}}(\lambda_n)+k_{\mathrm B}TD_{\mathrm{nat}}(p_n\Vert\pi_n)\}\\
&\quad-\{F_{\mathrm{eq}}(\lambda_0)+k_{\mathrm B}TD_{\mathrm{nat}}(p_0\Vert\pi_0)\}\\
&=\Delta F_{\mathrm{eq}}+k_{\mathrm B}T(D_n-D_0).
\end{aligned}
$$

従って $\langle W\rangle\ge\Delta F_{\mathrm{eq}}+k_{\mathrm B}T(D_n-D_0)$ です。

始点だけ平衡なら $D_0=0$ なので終端の偏り $D_n$ が下限を増やし、終点だけ平衡なら $D_n=0$ なので初期の偏り $D_0$ の分だけ抽出仕事の余地が増えます。両端が平衡なら $\langle W\rangle\ge\Delta F_{\mathrm{eq}}$ となり、[ITD2の平均仕事下限](../ITD2/index.md#thm-itd2-jarzynski)と一致します。どの式も不等式であり、任意の制御で等号達成を保証しません。
<!-- solution-end -->

#### B4. 非平衡初期分布でJarzynski等式を誤用しない

二状態で $E(x,\lambda_0)=0$、$E(0,\lambda_1)=0$、$E(1,\lambda_1)=\varepsilon>0$、$\beta\varepsilon=\log3$ とする。初期分布は $p_0=(1,0)$、一回のquenchの後で接触核 $K=I$ を適用する。$\langle e^{-\beta W}\rangle$、$Z_1/Z_0$、$\Delta\mathcal F$ を求め、二つの仕事関係のうち何が成立するか示せ。

- Level: B
- ID: ITD3-B4

<!-- solution-start -->
**詳細解答**　状態0しか占有しないのでquenchの軌道仕事は $W=E(0,\lambda_1)-E(0,\lambda_0)=0$ です。核 $I$ では状態が変わらず、熱も0です。従って

$$
\langle e^{-\beta W}\rangle=1,\qquad
Z_0=2,\qquad Z_1=1+\frac13=\frac43,\qquad
\frac{Z_1}{Z_0}=\frac23.
$$

[Jarzynski等式](../ITD2/index.md#thm-itd2-jarzynski)は初期が $\pi_0=(1/2,1/2)$ でなければ適用できないので、$1\ne2/3$ は矛盾ではありません。一方、始点も終点も実際の分布は $(1,0)$、その占有状態のエネルギーはどちらも0で、エントロピーも0ですから $\mathcal F[p_0,\lambda_0]=\mathcal F[p_1,\lambda_1]=0$。よって

$$
\langle W\rangle=0=\Delta\mathcal F
$$

で[本章の仕事下限](#thm-itd3-work-bound)は等号です。$K=I$ は正の逆向き対応を持つ遷移が対角にしかなく、その比は1なので局所詳細釣合いに反しません。
<!-- solution-end -->

### Level C：非平衡準備・二回の接触・仕事抽出を接続する

#### C1. 同じ準位へ戻す二段階の有限模型

$X=\{0,1\}$、$E(0,\lambda)=0$、$E(1,\lambda)=\lambda$、$\beta\varepsilon=\log3$、$\lambda_0=0$、$\lambda_1=\varepsilon$、$\lambda_2=0$ とする。初期分布 $p_0=(1,0)$ から始め、最初のquenchの後に

$$
K_1=\begin{pmatrix}3/4&1/4\\3/4&1/4\end{pmatrix}
$$

と接触し、二回目のquenchの後に

$$
K_2=\begin{pmatrix}1/2&1/2\\1/2&1/2\end{pmatrix}
$$

と接触する。どの行も「接触前の状態」を表す。

1. 各核の行和、局所詳細釣合い、平衡分布の不変性を検算せよ。$p_1,p_2$ を求めよ。
2. 各正確率の軌道について $W,Q,\Delta E$ を求め、第一法則を確認せよ。平均仕事と熱も求めよ。
3. $\mathcal F[p_0,\lambda_0]$、$\mathcal F[p_1,\lambda_1]$、$\mathcal F[p_2,\lambda_2]$ と $\langle\Sigma\rangle$ を求め、各段階と全段階の仕事下限を検算せよ。
4. 正確率の軌道で $\Sigma$ が負になる場合を挙げ、平衡初期のJarzynski等式をこの実験へ適用できない理由を説明せよ。

- Level: C
- ID: ITD3-C1

<!-- solution-start -->
**詳細解答**　まず全成分は非負で、$K_1$ の各行は $3/4+1/4=1$、$K_2$ の各行は $1/2+1/2=1$ です。最初の接触は $\lambda_1=\varepsilon$ に固定されるので、遷移比は

$$
\frac{K_1(0,1)}{K_1(1,0)}
=\frac{1/4}{3/4}=\frac13=e^{-\beta\varepsilon}.
$$

二回目は $\lambda_2=0$、遷移比は1で $e^{-\beta(E(1,0)-E(0,0))}=1$ と一致します。対角遷移では比1であり、すべての遷移が正ですから両核は[局所詳細釣合い](../ITD1/index.md#def-itd1-local-detailed-balance)を満たします。[正準分布](../../SM/SM3/index.md#def-sm3-canonical)は $\pi_1=(3/4,1/4)$、$\pi_2=(1/2,1/2)$ です。各核の行が同じなので

$$
\pi_1K_1=(3/4,1/4)=\pi_1,\quad
\pi_2K_2=(1/2,1/2)=\pi_2.
$$

[分布更新](../ITD1/index.md#prop-itd1-update)から $p_1=p_0K_1=(3/4,1/4)=\pi_1$、$p_2=p_1K_2=(1/2,1/2)=\pi_2$ です。

次に正確率の軌道は $(x_0,x_1,x_2)=(0,x_1,x_2)$ で、$x_1,x_2\in\{0,1\}$ の4本です。$x_0=0$ だから第1quenchの仕事は $W_1=0$、第1接触の熱は $Q_1=\varepsilon x_1$ です。第2quenchの仕事は $W_2=-\varepsilon x_1$、第2接触の熱は $Q_2=0$ です。従ってどの軌道でも

$$
W=-\varepsilon x_1,\qquad Q=\varepsilon x_1,\qquad
\Delta E=E(x_2,0)-E(0,0)=0=W+Q.
$$

各軌道の確率は $P_{\mathrm F}(0,x_1,x_2)=p_0(0)K_1(0,x_1)K_2(x_1,x_2)$ で、$(x_1,x_2)=(0,0),(0,1),(1,0),(1,1)$ の順に $3/8,3/8,1/8,1/8$ です。和は1です。$\Pr(x_1=1)=1/4$ だから

$$
\langle W\rangle=-\frac{\varepsilon}{4}
=-\frac{k_{\mathrm B}T\log3}{4},\quad
\langle Q\rangle=\frac{\varepsilon}{4},\quad
\langle\Delta E\rangle=0.
$$

自由エネルギーは初期の占有状態0で $U_0=S_0=0$、ゆえに $\mathcal F_0=0$。第1接触後は平衡なので $\mathcal F_1=F_{\mathrm{eq}}(\lambda_1)=-k_{\mathrm B}T\log(4/3)$。最後も平衡なので $\mathcal F_2=F_{\mathrm{eq}}(\lambda_2)=-k_{\mathrm B}T\log2$ です。

段階ごとの[仕事下限](#thm-itd3-work-bound)との差を計算すると

$$
\begin{aligned}
\langle W_1\rangle-(\mathcal F_1-\mathcal F_0)
&=k_{\mathrm B}T\log\frac43,\\
\langle W_2\rangle-(\mathcal F_2-\mathcal F_1)
&=k_{\mathrm B}T\left(\log\frac32-\frac14\log3\right),\\
\langle W\rangle-(\mathcal F_2-\mathcal F_0)
&=k_{\mathrm B}T\left(\log2-\frac14\log3\right).
\end{aligned}
$$

いずれも正です。第2行は $\log(3/2)-(\log3)/4>0$ で、例えば $(3/2)^4=81/16>3$ から確かめられます。初期と終端のエントロピー差は $k_{\mathrm B}\log2$、平均熱は $\varepsilon/4$ なので、独立に

$$
\langle\Sigma\rangle
=\frac{\Delta S}{k_{\mathrm B}}-\beta\langle Q\rangle
=\log2-\frac14\log3>0
$$

と求まり、全仕事差を $k_{\mathrm B}T$ で割った値と一致します。

最後に[経路比の式](#thm-itd3-work-bound)から、正確率の各軌道では $p_0(0)=1$、$p_2(x_2)=1/2$、$Q=\varepsilon x_1$ なので

$$
\Sigma(0,x_1,x_2)
=\log\frac{1}{1/2}-\beta\varepsilon x_1
=\log2-x_1\log3.
$$

$x_1=1$ の二経路の生成は $\log(2/3)<0$、$x_1=0$ の二経路は $\log2>0$ です。前者の確率合計は $1/4$、後者は $3/4$ なので平均は $(3/4)\log2+(1/4)\log(2/3)=\log2-\frac14\log3$ と再び一致します。

本実験の初期分布は $p_0=(1,0)\ne\pi_0=(1/2,1/2)$ です。[Jarzynski等式](../ITD2/index.md#thm-itd2-jarzynski)の初期平衡仮定を欠くため、$Z_2/Z_0=1$ をそのまま $\langle e^{-\beta W}\rangle$ と同一視できません。直接計算すると

$$
\langle e^{-\beta W}\rangle
=\frac34\cdot1+\frac14 e^{\beta\varepsilon}
=\frac34+\frac34=\frac32\ne1.
$$

この差も、非平衡初期の仕事を平衡初期の等式で評価してはいけないことを示しています。
<!-- solution-end -->

## 6. 次に問うこと

確率分布の偏りは、正準分布からの相対エントロピーを通じて自由エネルギーの超過量となりました。熱浴へ無制御で接触させるとそれを失い、制御して仕事を取り出しても平均エントロピー生成によって上限が決まります。

では、系の状態を**測定し、その結果に応じて操作を変える**場合はどうでしょうか。測定結果によって初めて分かる偏りと、もともと準備されていた偏りを区別しないと、情報を仕事へ変えた量を数え間違えます。次は測定チャネル・事後分布・相互情報量を導入し、情報付き第二法則を導きます。
