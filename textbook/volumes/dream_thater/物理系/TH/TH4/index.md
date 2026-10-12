# TH4 エントロピーと基本関係式

[TH3の第二法則](../TH3/index.md#principle-th3-kelvin-planck)は、エネルギーが保存されても実現できない循環過程があることを示しました。[Carnotの定理](../TH3/index.md#thm-th3-carnot)は二熱浴間の効率上限を与えます。しかし、循環しない加熱・膨張・熱混合を一つの不等式で比較したいとき、効率だけでは足りません。そこで、熱の受け渡しを絶対温度で割って足し合わせる量から、平衡状態に付随する新しい状態量を作ります。

本章は温度が正で、各端点が平衡状態である系を扱います。最初は有限個の理想熱浴と接触する循環装置で第二法則を計算に変換し、次に可逆経路を通じてエントロピーを構成します。最後に、単純圧縮系の基本関係式から温度と圧力を読み取ります。途中で使う追加の仮定（可逆な接続経路の存在、滑らかな状態空間、物質量を変える場合の構成則）を区別します。

## 1. 一つの熱浴ではなく、複数の熱浴を数える

[TH3の熱浴の定義](../TH3/index.md#def-th3-heat-reservoir)では、環境側の温度は熱の授受中も一定です。装置が浴 $i$ から受け取る熱を $q_i$ とし、受熱を正、放熱を負とします。すべての熱浴の温度は[絶対温度](../TH3/index.md#def-th3-absolute-temperature) $T_i>0$ です。

熱量の和 $\sum_i q_i$ は[第一法則](../TH2/index.md#axiom-th2-first-law)によって仕事と結ばれます。しかし熱をどの温度で受け取ったかは、その和だけでは区別できません。温度で割って足すことが第二法則の制約を明らかにします。

<a id="def-th4-clausius-sum"></a>

<!-- formal-statement-start -->
> **定義（Clausiusの和・積分）**  
> 有限個の熱浴 $T_i>0$ と熱量 $q_i$ を交換する循環装置について、Clausiusの和を次で定義する。

$$
I_{\mathrm C}=\sum_{i=1}^{m}\frac{q_i}{T_i}.
$$

> 熱交換を細分化した極限が存在するときは、境界で接する熱浴の温度を $T_b>0$ としてClausiusの積分を表す。

$$
I_{\mathrm C}=\oint\frac{\delta Q}{T_b}.
$$

> $\delta Q$ は系へ入る微小熱量であり、状態関数の全微分を意味しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-th4-clausius-sum -->
### 例：同じ1 Jでも温度で重みが変わる

600 K の浴から 600 J を受け、300 K の浴へ 450 J を放出する一巡では、$q_h=600\,\mathrm J$、$q_c=-450\,\mathrm J$ です。定義に直接代入すると

$$
I_{\mathrm C}=\frac{600}{600}-\frac{450}{300}
=1-\frac32=-\frac12\,\mathrm{J/K}.
$$

この値はエネルギーの収支 $600-450=150\,\mathrm J$ とは別の情報を持ちます。
<!-- definition-example-end -->

<a id="thm-th4-clausius-inequality"></a>

<!-- formal-statement-start -->
> **定理（Clausiusの不等式）**  
> 第二法則のKelvin–Planckの表現が成り立つとする。仕事と有限個の温度 $T_i>0$ の理想熱浴との熱交換だけを行い、作動物質が元の状態へ戻る循環装置では、熱量 $q_i$ を装置への流入が正として、

$$
\sum_{i=1}^{m}\frac{q_i}{T_i}\leq0
$$

> が成り立つ。温度と熱交換を連続的に細分化でき、和が収束する極限では $\oint\delta Q/T_b\leq0$ が成り立つ。可逆循環では等号である。
<!-- formal-statement-end -->

### 証明の見取り図

各熱浴で元の装置が受け取った熱を、向きを選べる可逆Carnot装置で打ち消します。[可逆熱量比と絶対温度の関係](../TH3/index.md#thm-th3-thermodynamic-scale)によって、残りの熱を一つの基準浴へ集められます。その基準浴から正味の熱を受けて全量仕事にできるなら第二法則に違反します。

<!-- proof-start -->
### 証明

基準熱浴を一つ選び、温度を $T_0>0$ とします。元の循環装置が浴 $i$ から受ける熱は $q_i$ です。浴 $i$ と基準浴 $T_0$ の間に、向きを逆転可能で大きさを任意に調整できる可逆補助装置を接続し、補助装置が浴 $i$ から受け取る熱を $-q_i$ にします。$q_i$ が負なら補助装置を逆方向に運転します。$T_i=T_0$ なら同じ基準浴で熱交換を相殺したものとみなします。

[TH3で構成した温度比](../TH3/index.md#thm-th3-thermodynamic-scale)と、逆運転でも符号付きの比が保たれることから、補助装置が基準浴から受け取る熱 $q_{0i}$ は

$$
\frac{-q_i}{T_i}+\frac{q_{0i}}{T_0}=0,
\qquad
q_{0i}=\frac{T_0}{T_i}q_i
$$

です。すべての浴 $i$ では元の装置と補助装置の熱の和が $q_i-q_i=0$ になります。装置群は全て循環し、熱交換する相手は基準浴だけなので、その正味の受熱量は

$$
Q_0=\sum_{i=1}^{m}q_{0i}
=T_0\sum_{i=1}^{m}\frac{q_i}{T_i}.
$$

[一巡の収支](../TH2/index.md#prop-th2-cycle-balance)から、装置群が外界へする正味の仕事は $L=Q_0$ です。もし $\sum_iq_i/T_i>0$ なら、$T_0>0$ より $Q_0>0$ となり、単一熱浴の熱をすべて仕事に変える循環装置ができてしまいます。これは[Kelvin–Planckの原理](../TH3/index.md#principle-th3-kelvin-planck)に反します。したがって $\sum_iq_i/T_i\leq0$ です。

細分化された熱交換については、各区間を一定温度の小熱浴との交換で近似し、各近似循環が上の和の不等式を満たし、かつその和が定義中の積分に収束するという仮定の下で極限を取ります。各近似値が非正ならその極限も非正です。

さらに元の循環が熱力学的に可逆なら、[可逆過程の定義](../TH3/index.md#def-th3-reversible-process)により装置と環境を全て逆転でき、浴ごとの熱 $-q_i$ を交換する逆循環が存在します。その逆循環にも不等式を適用すると

$$
\sum_i\frac{q_i}{T_i}\leq0,
\qquad
-\sum_i\frac{q_i}{T_i}\leq0.
$$

両方を満たす実数は零しかないため、可逆循環では等号です。
<!-- proof-end -->

重要なのは「等号なら必ず可逆」とは一般には結論していないことです。証明で使ったのは「可逆なら等号」という方向です。以後の状態関数の構成では、この等号が経路差を消します。

## 2. 経路量から状態量を作る

[TH2の内部エネルギー](../TH2/index.md#def-th2-internal-energy)は状態で決まりますが、熱 $Q$ は経路で変わります。熱を単に積分しても新しい状態関数にはなりません。ところがClausiusの等号は「可逆な二つの経路の差」を消すので、温度で割った熱なら候補になります。

ここでは、一定の物質量 $N>0$ を持つ単相の単純圧縮閉鎖系に限定します。考える平衡状態の領域は連結で、任意の二状態を区間内にとどまる可逆準静的経路で結べると仮定します。各可逆経路では系の温度 $T>0$ が定まり、熱交換する浴との温度差を消した極限なので $T_b=T$ です。

<a id="def-th4-entropy"></a>

<!-- formal-statement-start -->
> **定義（エントロピーの候補）**  
> 上記の可逆接続可能な平衡状態領域で、参照状態 $A_0$ と定数 $S_0$ を固定する。状態 $B$ までの可逆経路 $\gamma$ を一つ選び、

$$
S_\gamma(B)=S_0+\int_{\gamma:A_0\to B}
\frac{\delta Q_{\mathrm{rev}}}{T}
$$

> と置く。次の定理で経路に依存しないことを示した後、その共通値をエントロピー $S(B)$ と呼ぶ。単位は $\mathrm{J/K}$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-th4-entropy -->
### 例：一定温度で可逆に熱を受ける

系が $T=400\,\mathrm K$ を保ち、可逆的に $Q_{\mathrm{rev}}=200\,\mathrm J$ の熱を受けたとします。この経路での候補の差は

$$
S_\gamma(B)-S_\gamma(A)=\int_A^B\frac{\delta Q_{\mathrm{rev}}}{400}
=\frac{200}{400}=0.5\,\mathrm{J/K}.
$$

一方、同じ熱量を別の温度で受けたときには一般に異なる数値になります。エントロピーが状態関数だという主張は、同じ端点へ向かう**すべての可逆経路**で積分値が等しい、という次の定理の内容です。
<!-- definition-example-end -->

<a id="thm-th4-entropy-state-function"></a>

<!-- formal-statement-start -->
> **定理（可逆熱積分の経路独立性）**  
> 温度が正で、任意の二平衡状態が可逆経路で結ばれる上記の領域では、Clausiusの不等式と可逆循環の等号が成立するなら、任意の可逆経路 $\gamma_1,\gamma_2$ に対し

$$
\int_{\gamma_1:A\to B}\frac{\delta Q_{\mathrm{rev}}}{T}
=
\int_{\gamma_2:A\to B}\frac{\delta Q_{\mathrm{rev}}}{T}
=S(B)-S(A)
$$

> が成り立つ。したがって定義した $S$ は加法定数を除いて一意な状態関数である。
<!-- formal-statement-end -->

### 証明の見取り図

可逆経路 $\gamma_1$ と、$\gamma_2$ を逆向きにたどる経路を連結します。これは可逆循環です。循環全体の積分が零になるので、二経路の積分が一致します。

<!-- proof-start -->
### 証明

$A$ から $B$ へ向かう可逆経路 $\gamma_1,\gamma_2$ を取ります。$\gamma_2$ は[可逆過程の定義](../TH3/index.md#def-th3-reversible-process)から逆向き $\gamma_2^{-1}$ にもたどれます。$\gamma_1$ に続けて $\gamma_2^{-1}$ を行うと、系と環境の操作を逆転できる循環ができます。[Clausiusの不等式の可逆等号](#thm-th4-clausius-inequality)を使って

$$
0=\oint_{\gamma_1+\gamma_2^{-1}}\frac{\delta Q_{\mathrm{rev}}}{T}
=\int_{\gamma_1}\frac{\delta Q_{\mathrm{rev}}}{T}
+\int_{\gamma_2^{-1}}\frac{\delta Q_{\mathrm{rev}}}{T}.
$$

逆向きの経路では熱量の符号も反転するので、最後の項は $-\int_{\gamma_2}\delta Q_{\mathrm{rev}}/T$ です。移項すると二つの経路積分が一致します。

参照点 $A_0$ から $A$ への可逆経路と $A$ から $B$ への可逆経路を連結しても可逆です。経路積分の加法性により

$$
S(B)-S_0
=\int_{A_0}^{A}\frac{\delta Q_{\mathrm{rev}}}{T}
+\int_A^B\frac{\delta Q_{\mathrm{rev}}}{T}
=(S(A)-S_0)+\int_A^B\frac{\delta Q_{\mathrm{rev}}}{T}.
$$

両辺から $S(A)-S_0$ を差し引くと主張を得ます。別の状態関数 $\widetilde S$ が同じ差の式を満たすなら、すべての $B$ について $\widetilde S(B)-S(B)=\widetilde S(A_0)-S(A_0)$ となり、その差は定数です。
<!-- proof-end -->

これはすべての不可逆経路について $\int\delta Q/T$ が経路独立だと言うものではありません。不可逆経路では系内部の温度が一様に定義できないこともあり、熱浴温度 $T_b$ を用いて**不等式**として評価します。

## 3. 変化の向きをエントロピーで判定する

始状態 $A$ から終状態 $B$ への実際の過程が不可逆でも、両端が同じ平衡状態なら $S(B)-S(A)$ は定まります。実際の過程を反転する必要はありません。代わりに、終状態 $B$ から始状態 $A$ へ戻る**別の可逆経路**を計算上つなぎます。

<a id="prop-th4-entropy-balance"></a>

<!-- formal-statement-start -->
> **命題（エントロピー収支と孤立系の増大則）**  
> 温度 $T_b>0$ の熱浴との熱交換で記述できる閉鎖系の過程 $A\to B$ を考え、端点は前節の可逆接続可能な平衡状態とする。必要なClausius積分が存在すれば、

$$
\Delta S=S(B)-S(A)\geq
\int_{A\to B}\frac{\delta Q}{T_b}.
$$

> 特に熱交換のない孤立系では $\Delta S\geq0$ である。左辺と右辺の差をエントロピー生成量 $S_{\mathrm{gen}}\geq0$ と呼ぶ。
<!-- formal-statement-end -->

### 証明の見取り図

実際の $A\to B$ と、仮想的な可逆経路 $B\to A$ を連結した閉路に[Clausiusの不等式](#thm-th4-clausius-inequality)を適用します。実際の経路にエントロピーを積分するのではなく、可逆な戻り経路だけを状態量の差で置き換えます。

<!-- proof-start -->
### 証明

実際の過程を $P$ と書き、可逆な戻り道 $R:B\to A$ を選びます。$P+R$ は循環なので、熱浴側の温度を使った[Clausiusの不等式](#thm-th4-clausius-inequality)から

$$
\int_P\frac{\delta Q}{T_b}
+\int_R\frac{\delta Q_{\mathrm{rev}}}{T}\leq0.
$$

戻り道 $R$ は可逆なので、[経路独立性の定理](#thm-th4-entropy-state-function)を端点 $B,A$ に適用でき、

$$
\int_R\frac{\delta Q_{\mathrm{rev}}}{T}
=S(A)-S(B)=-\Delta S.
$$

これを前式へ代入すると $\int_P\delta Q/T_b-\Delta S\leq0$、すなわち主張の収支式を得ます。孤立系なら境界を通る熱は常に零ですから、積分も零になり $\Delta S\geq0$ です。差

$$
S_{\mathrm{gen}}=\Delta S-\int_P\frac{\delta Q}{T_b}
$$

は定義と不等式により非負です。
<!-- proof-end -->

### 例：熱が高温から低温へ流れるとき

600 K と 300 K の二つの熱浴の間で、外へ仕事をしない熱伝導によって $Q=300\,\mathrm J$ が高温浴から低温浴へ移動したとします。各浴は温度一定なので、熱浴そのもののエントロピー差は可逆な別の熱交換経路を使って計算でき、

$$
\Delta S_h=-\frac{300}{600}=-0.5\,\mathrm{J/K},
\qquad
\Delta S_c=\frac{300}{300}=1\,\mathrm{J/K}.
$$

二浴全体は外部と熱を交換しないので

$$
\Delta S_{\mathrm{total}}
=-0.5+1=0.5\,\mathrm{J/K}>0
$$

です。熱の移動そのものは有限温度差をまたぐ不可逆過程であり、移動経路に $\delta Q_{\mathrm{rev}}/T$ を無理に当てはめてはいません。

[TH3の可逆性](../TH3/index.md#def-th3-reversible-process)は、系だけでなく環境まで元に戻せることを要求しました。系の $\Delta S=0$ だけで循環が可逆だったと判定してはいけません。熱を外へ渡せば系のエントロピーは減ることもあります。孤立系の増大則は、**系と環境を合わせた孤立全体**に適用する規則です。

## 4. 理想気体でエントロピーを手計算する

抽象的な経路積分が本当に使えるかを、[理想気体の状態方程式](../TH1/index.md#def-th1-equation-of-state)と[定積熱容量](../TH2/index.md#def-th2-heat-capacities)を用いて確かめます。物質量 $n>0$ は一定で、$U=n c_V T+\mathrm{const}$、$c_V>0$ はモル当たり一定、$R>0$ とします。

可逆な微小変化では[第一法則](../TH2/index.md#axiom-th2-first-law)と[準静的な体積仕事](../TH2/index.md#prop-th2-pv-work)から

$$
dU=\delta Q_{\mathrm{rev}}-p\,dV,
\qquad
\delta Q_{\mathrm{rev}}=dU+p\,dV.
$$

<a id="prop-th4-ideal-gas-entropy"></a>

<!-- formal-statement-start -->
> **命題（一定熱容量の理想気体のエントロピー差）**  
> 物質量 $n>0$ が一定で、$pV=nRT$、$U=n c_VT+\mathrm{const}$、$R,c_V>0$ を満たす理想気体の二平衡状態 $(T_1,V_1)$、$(T_2,V_2)$ を考える。$T_i,V_i>0$ とし、可逆経路で両状態を結べると仮定すると、

$$
S_2-S_1=n c_V\log\frac{T_2}{T_1}
+nR\log\frac{V_2}{V_1}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

可逆な微小熱に第一法則を用い、温度と体積を独立変数としてそれぞれ積分します。対数の引数が正であることも仮定から確認できます。

<!-- proof-start -->
### 証明

$U=n c_VT+\mathrm{const}$ より、$n$ を固定して微分すると $dU=n c_V\,dT$ です。[理想気体の状態方程式](../TH1/index.md#def-th1-equation-of-state)で $p=nRT/V$ なので

$$
\delta Q_{\mathrm{rev}}
=n c_V\,dT+\frac{nRT}{V}\,dV.
$$

すべての可逆途中状態で $T>0$ ですから両辺を $T$ で割れます。[エントロピーの経路独立性](#thm-th4-entropy-state-function)により

$$
dS=\frac{\delta Q_{\mathrm{rev}}}{T}
=n c_V\frac{dT}{T}+nR\frac{dV}{V}.
$$

例えば $(T_1,V_1)\to(T_2,V_1)\to(T_2,V_2)$ という可逆な等積・等温経路を選べば、第一の区間では $dV=0$、第二では $dT=0$ です。従って

$$
\Delta S
=n c_V\int_{T_1}^{T_2}\frac{dT}{T}
+nR\int_{V_1}^{V_2}\frac{dV}{V}.
$$

原始関数はそれぞれ $\log T$、$\log V$ なので、端点を代入すれば主張の式を得ます。異なる可逆経路でも[経路独立性](#thm-th4-entropy-state-function)によって同じ値です。
<!-- proof-end -->

### 例：自由膨張は断熱でも等エントロピーではない

断熱された剛体容器内で理想気体が真空側へ自由膨張し、$V_2=2V_1$ となるとします。[自由膨張と体積仕事の区別](../TH2/index.md#prop-th2-pv-work)により外圧が零なので仕事は零、断熱だから熱も零です。[第一法則](../TH2/index.md#axiom-th2-first-law)から $\Delta U=0$ となり、ここでの $U=n c_VT+\mathrm{const}$ によって $T_2=T_1$ です。

実際の自由膨張経路は準静的でも可逆でもありません。それでも始点・終点は平衡状態なので、命題を**仮想的な可逆等温経路**に適用すると

$$
\Delta S=n c_V\log1+nR\log2=nR\log2>0.
$$

一方、摩擦のない可逆断熱過程では $\delta Q_{\mathrm{rev}}=0$ なので $dS=0$ です。「断熱なら常に $\Delta S=0$」という結論が誤りなのは、自由膨張では可逆熱積分による表現を**実際の不可逆経路**へ適用できないためです。

## 5. 基本関係式をどう読むか

ここまでに得たのは状態関数 $S$ です。十分に滑らかな一成分・単相の単純圧縮系なら、平衡状態の内部エネルギーを $S,V$ と固定物質量 $N$ で表示したいと考えられます。温度と圧力をその偏微分から取り出せれば、熱の収支と平衡状態の物性が結び付きます。

まず**閉鎖系**の可逆変化に絞ります。内部エネルギーは $U(S,V;N)$ という連続微分可能な関数で、選んだ状態領域で $T>0$、系の圧力 $p$ と境界圧力が一致すると仮定します。

<a id="prop-th4-fundamental-fixed-n"></a>

<!-- formal-statement-start -->
> **命題（単純圧縮閉鎖系の基本関係式）**  
> 物質量 $N$ を固定した、可逆準静的な体積仕事以外の仕事をしない単相平衡系について、内部エネルギー $U(S,V;N)$ が連続微分可能であり、$S,V$ が局所独立変数であるとする。このとき

$$
dU=T\,dS-p\,dV,
\qquad
T=\left(\frac{\partial U}{\partial S}\right)_{V,N},
\qquad
p=-\left(\frac{\partial U}{\partial V}\right)_{S,N}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

第一法則の熱に $T\,dS$、仕事に $-p\,dV$ を代入します。得た全微分を $U(S,V;N)$ の全微分と係数比較するため、$S,V$ が独立な局所座標であるという仮定が必要です。

<!-- proof-start -->
### 証明

[エントロピーの経路独立性](#thm-th4-entropy-state-function)から可逆微小過程では $\delta Q_{\mathrm{rev}}=T\,dS$ です。[第一法則](../TH2/index.md#axiom-th2-first-law)と[準静的な体積仕事](../TH2/index.md#prop-th2-pv-work)を用いると

$$
dU=\delta Q_{\mathrm{rev}}+\delta W_{\mathrm{rev}}
=T\,dS-p\,dV.
$$

他方、$N$ を固定して $U(S,V;N)$ を全微分すると

$$
dU=\left(\frac{\partial U}{\partial S}\right)_{V,N}dS
+\left(\frac{\partial U}{\partial V}\right)_{S,N}dV.
$$

局所独立な $dS,dV$ の係数を一つずつ比較して、温度と圧力の偏微分表示が得られます。
<!-- proof-end -->

この式は、**任意の不可逆な変化中も $dU=\delta Q-p\,dV$ が成立する**という意味ではありません。状態空間に沿う微分恒等式であり、右辺の $T,p$ は平衡状態の物性値です。不可逆過程の熱と境界仕事の計算は、その過程の実際の境界条件で[第一法則](../TH2/index.md#axiom-th2-first-law)を使う必要があります。

### 物質量も変えるなら、追加の物理を宣言する

物質が境界を通る開放系では、閉鎖系の熱と仕事だけの収支から物質移動の項は導けません。そこで、同じ物質の平衡状態を連続的な量 $N$ まで拡張し、**追加の基本関係**として $U=U(S,V,N)$ が滑らかで、閉鎖系での係数が上の $T,p$ と整合すると仮定します。$N$ は物質量（mol）であり、以下は成分が一つの場合です。

<a id="def-th4-chemical-potential"></a>

<!-- formal-statement-start -->
> **定義（化学ポテンシャルと拡張基本関係式）**  
> 単一成分の平衡系について、$S,V,N$ が局所独立な変数で、$U(S,V,N)$ が連続微分可能とする。$S,V$ を固定して物質量を変えたときの内部エネルギーの偏微分を、化学ポテンシャル $\mu$ と定義する。

$$
\mu=\left(\frac{\partial U}{\partial N}\right)_{S,V}.
$$

> この平衡状態空間上では、前命題の $T,p$ と整合するなら

$$
dU=T\,dS-p\,dV+\mu\,dN
$$

> と表せる。物質の実際の流入・流出に伴うエネルギー収支を、閉鎖系の第一法則だけから示す主張ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-th4-chemical-potential -->
### 例：基本関係から三つの係数を読む

$A,B,C>0$ とし、$S,V,N>0$ の領域で数学的な模型

$$
U(S,V,N)=A\frac{S^2}{N}+B\frac{N^2}{V}+CN
$$

を考えます。$S,V,N$ をそれぞれ独立とみなして偏微分すると

$$
T=\frac{2AS}{N}>0,\qquad
p=\frac{BN^2}{V^2}>0,\qquad
\mu=-A\frac{S^2}{N^2}+\frac{2BN}{V}+C.
$$

三つの式を $dU=T\,dS-p\,dV+\mu\,dN$ に代入すると、$U$ の全微分と一致します。また $U(\lambda S,\lambda V,\lambda N)=\lambda U(S,V,N)$ で、示量量を同じ倍率に拡大するとエネルギーも同じ倍率になることを直接確かめられます。この例は状態関数から係数を読む**数学的な例**であり、任意の物質の実測状態方程式だと主張するものではありません。
<!-- definition-example-end -->

以上の式では、微分可能性・局所座標・成分数が重要です。相転移点などで滑らかさが失われる場合や、多成分で独立な $N_i$ が増える場合はそのまま適用しません。熱力学ポテンシャルへの変数変更はTH5、安定性はTH6、多成分と相平衡はTH7で扱います。

## 6. 演習：積分・不等式・状態関数をつなぐ

### Level A：記号と直接計算

#### A1. 二熱浴のClausiusの和

循環機関が温度 $500\,\mathrm K$ の熱浴から $500\,\mathrm J$ の熱を受け、温度 $300\,\mathrm K$ の浴へ $350\,\mathrm J$ を放出する。Clausiusの和、外へした正味仕事、可逆上限効率を求め、第二法則と照合せよ。

- Level: A
- ID: TH4-A1

<!-- solution-start -->
**詳細解答**　符号付き熱量は $q_h=+500\,\mathrm J$、$q_c=-350\,\mathrm J$ です。[Clausiusの不等式](#thm-th4-clausius-inequality)の左辺を計算すると

$$
I_{\mathrm C}=\frac{500}{500}-\frac{350}{300}
=1-\frac76=-\frac16\,\mathrm{J/K}\leq0.
$$

[一巡の収支](../TH2/index.md#prop-th2-cycle-balance)から $L=500-350=150\,\mathrm J$、効率は $150/500=0.30$ です。[Carnotの定理](../TH3/index.md#thm-th3-carnot)と[温度比の式](../TH3/index.md#thm-th3-thermodynamic-scale)から可逆上限は $1-300/500=0.40$。実機効率 $0.30$ は上限以下であり矛盾しません。
<!-- solution-end -->

#### A2. 熱浴との可逆熱交換

400 K の熱浴と同じ温度を保つ閉鎖系に、可逆的に $200\,\mathrm J$ の熱を入れる。系と熱浴それぞれのエントロピー差を求めよ。

- Level: A
- ID: TH4-A2

<!-- solution-start -->
**詳細解答**　温度差のない可逆交換なので、系について[エントロピーの定義](#def-th4-entropy)を使える。

$$
\Delta S_{\mathrm{sys}}=\int\frac{\delta Q_{\mathrm{rev}}}{400}
=\frac{200}{400}=0.5\,\mathrm{J/K}.
$$

熱浴から見れば受けた熱は $-200\,\mathrm J$ だから、同じ状態関数の差を別の可逆な交換で評価して $\Delta S_{\mathrm{bath}}=-200/400=-0.5\,\mathrm{J/K}$ です。合計は零です。
<!-- solution-end -->

#### A3. 可逆断熱のエントロピー

二平衡状態を結ぶ可逆断熱経路があり、全経路で $T>0$ とする。両端のエントロピー差を求めよ。また不可逆断熱でも同じだと言えるか。

- Level: A
- ID: TH4-A3

<!-- solution-start -->
**詳細解答**　[断熱過程の定義](../TH2/index.md#def-th2-adiabatic)から $\delta Q_{\mathrm{rev}}=0$ です。[経路独立性](#thm-th4-entropy-state-function)をこの可逆経路へ適用すると

$$
S(B)-S(A)=\int_A^B\frac{0}{T}=0.
$$

不可逆断熱では実際の経路に可逆熱積分を使えません。[エントロピー収支](#prop-th4-entropy-balance)が与えるのは $\Delta S\geq0$ であって、零とは限りません。
<!-- solution-end -->

#### A4. 等温での体積倍増

$T>0$、$n>0$ が一定の理想気体が、体積 $V$ から $2V$ へ可逆等温膨張する。エントロピー差を求めよ。

- Level: A
- ID: TH4-A4

<!-- solution-start -->
**詳細解答**　[理想気体のエントロピー差](#prop-th4-ideal-gas-entropy)で $T_2/T_1=1$、$V_2/V_1=2$ と置けば

$$
\Delta S=n c_V\log1+nR\log2=nR\log2.
$$

$R,n>0$ と $\log2>0$ より正です。この結果は等温可逆膨張中に浴から熱を受けることと整合します。
<!-- solution-end -->

#### A5. 基本関係の符号

物質量一定の単純圧縮平衡系で、ある可逆微小変化について $T=300\,\mathrm K$、$dS=2\,\mathrm{J/K}$、$p=10^5\,\mathrm{Pa}$、$dV=10^{-3}\,\mathrm{m^3}$ とする。$dU$ を求めよ。

- Level: A
- ID: TH4-A5

<!-- solution-start -->
**詳細解答**　[閉鎖系の基本関係式](#prop-th4-fundamental-fixed-n)では $dU=T\,dS-p\,dV$。それぞれの項は

$$
T\,dS=300\times2=600\,\mathrm J,
\qquad
p\,dV=10^5\times10^{-3}=100\,\mathrm J
$$

だから、$dU=600-100=500\,\mathrm J$ です。膨張では系が外へ仕事をするため、内部エネルギー式に入る体積項は負です。
<!-- solution-end -->

### Level B：仮定と導出を確かめる

#### B1. 三熱浴の循環の上限

600 K、400 K、300 K の三熱浴とだけ熱を交換する循環装置がある。装置への熱量は順に $q_1=600\,\mathrm J$、$q_2=-200\,\mathrm J$、$q_3$（未知）で、外界へ仕事 $L>0$ をする。第二法則が許す $q_3$ の範囲と $L$ の上限を求めよ。$q_3=-180\,\mathrm J$ の場合のエントロピー生成に対応する $-\sum_iq_i/T_i$ も求めよ。

- Level: B
- ID: TH4-B1

<!-- solution-start -->
**詳細解答**　[Clausiusの不等式](#thm-th4-clausius-inequality)より

$$
\frac{600}{600}-\frac{200}{400}+\frac{q_3}{300}
=\frac12+\frac{q_3}{300}\leq0.
$$

両辺から $1/2$ を引き、正の 300 K を掛けると $q_3\leq-150\,\mathrm J$ です。[一巡の収支](../TH2/index.md#prop-th2-cycle-balance)より

$$
L=q_1+q_2+q_3=400+q_3\quad(\mathrm J).
$$

$L>0$ は $q_3>-400\,\mathrm J$ と同値なので、許される区間は $-400<q_3\leq-150\,\mathrm J$、仕事の上限は $L=250\,\mathrm J$ です。なお第二法則の不等式は実現可能性の必要条件であり、この区間の全点に実在装置があることまでは保証しません。

$q_3=-180\,\mathrm J$ のとき、和は $1/2-180/300=0.5-0.6=-0.1\,\mathrm{J/K}$ です。よって指定された生成量は $0.1\,\mathrm{J/K}\geq0$ です。
<!-- solution-end -->

#### B2. 加熱してもエントロピーが減る例

物質量 $n=2\,\mathrm{mol}$、モル定積熱容量 $c_V=3R/2$ の理想気体を、始状態 $(T_1,V_1)$ から終状態 $(2T_1,V_1/4)$ に移す。$T_1,V_1,R>0$ とし、両端は平衡状態で可逆接続可能とする。$\Delta S$ を求め、温度が上がると必ずエントロピーも増えるという主張を検討せよ。

- Level: B
- ID: TH4-B2

<!-- solution-start -->
**詳細解答**　[理想気体のエントロピー差](#prop-th4-ideal-gas-entropy)へ温度比 2、体積比 $1/4$ を入れます。

$$
\begin{aligned}
\Delta S
&=2\cdot\frac{3R}{2}\log2+2R\log\frac14\\
&=3R\log2+2R(-2\log2)\\
&=-R\log2<0.
\end{aligned}
$$

圧縮の負の寄与が加熱の正の寄与を上回りました。これは系が孤立しているという仮定のない過程であり、[孤立系の増大則](#prop-th4-entropy-balance)とは矛盾しません。温度だけでなく体積も状態量として指定する必要があります。
<!-- solution-end -->

#### B3. 有限熱容量の二物体が接触する

同じ一定熱容量 $C>0$（単位 $\mathrm{J/K}$）を持つ二つの剛体が、初め 600 K と 300 K にある。二物体を合わせて外部と断熱し、仕事もせず、十分時間が経って同じ温度に至るとする。熱容量は温度によらず、相転移しない。最終温度と全エントロピー差を求め、符号を確認せよ。

- Level: B
- ID: TH4-B3

<!-- solution-start -->
**詳細解答**　外界からの熱・仕事がともに零なので、[第一法則](../TH2/index.md#axiom-th2-first-law)により二物体の内部エネルギー差の和は零です。熱容量一定より

$$
C(T_f-600)+C(T_f-300)=0.
$$

$C>0$ で割ると $2T_f-900=0$、よって $T_f=450\,\mathrm K$ です。各物体のエントロピー差は、実際の熱伝導でなく仮想的な可逆加熱・冷却で計算します。定積で $dU=C\,dT$、可逆で $\delta Q_{\mathrm{rev}}=C\,dT$ ですから

$$
\begin{aligned}
\Delta S_{\mathrm{total}}
&=C\int_{600}^{450}\frac{dT}{T}
+C\int_{300}^{450}\frac{dT}{T}\\
&=C\log\frac{450}{600}+C\log\frac{450}{300}\\
&=C\log\left(\frac34\cdot\frac32\right)
=C\log\frac98>0.
\end{aligned}
$$

$\frac98>1$ なので対数は正です。全体は孤立していても、有限温度差で熱が流れるためエントロピーが増えます。
<!-- solution-end -->

### Level C：不可逆過程と可逆補助経路を接続する

#### C1. 自由膨張から元の状態へ戻す

物質量 $n>0$ の理想気体が、$T_0,V_0>0$ の平衡状態 A にある。$pV=nRT$、$U=n c_VT+\mathrm{const}$、$R,c_V>0$ を仮定する。まず断熱・剛体の真空室へ自由膨張して体積 $2V_0$ の状態 B に至る。次に温度 $T_0$ の一つの熱浴と接触させ、摩擦なしに可逆等温圧縮して体積 $V_0$ の状態 A に戻す。自由膨張での外部仕事は零とする。(1) Bの温度とAからBへのエントロピー差、(2) BからAの系が受け取る熱と仕事、(3) 全操作終了後の気体・熱浴・その合計のエントロピー差を計算し、この循環が第二法則に反しない理由を説明せよ。

- Level: C
- ID: TH4-C1

<!-- solution-start -->
**詳細解答**

(1) 自由膨張は断熱なので $Q_{AB}=0$、真空への膨張では外圧が零なので $W_{AB}=0$ です。[第一法則](../TH2/index.md#axiom-th2-first-law)から $U_B-U_A=Q_{AB}+W_{AB}=0$。$U=n c_VT+\mathrm{const}$ と $n c_V>0$ から $T_B=T_0$ です。A、B の両端は平衡状態なので、[理想気体のエントロピー差](#prop-th4-ideal-gas-entropy)を可逆な別経路に適用でき、

$$
S_B-S_A=n c_V\log\frac{T_0}{T_0}
+nR\log\frac{2V_0}{V_0}=nR\log2.
$$

(2) 等温圧縮 B $\to$ A では内部エネルギー差は零です。[準静的な理想気体の等温仕事](../TH2/index.md#prop-th2-isothermal)の体積積分に $V_i=2V_0$、$V_f=V_0$ を代入して

$$
\begin{aligned}
W_{BA}
&=-\int_{2V_0}^{V_0}\frac{nRT_0}{V}\,dV\\
&=-nRT_0\left(\log V_0-\log(2V_0)\right)\\
&=nRT_0\log2>0.
\end{aligned}
$$

第一法則の $0=Q_{BA}+W_{BA}$ から、気体が受け取る熱は

$$
Q_{BA}=-nRT_0\log2<0
$$

です。これは気体が浴へ正の熱 $nRT_0\log2$ を放出することを意味します。

(3) Aに戻った気体は状態関数なので全体で $\Delta S_{\mathrm{gas}}=0$ です。熱浴は温度 $T_0$ を保って $nRT_0\log2$ を受けるので、[エントロピーの可逆積分](#def-th4-entropy)でその状態差を計算すると

$$
\Delta S_{\mathrm{bath}}
=\frac{nRT_0\log2}{T_0}=nR\log2.
$$

したがって、気体と熱浴を合わせたエントロピー差は $nR\log2>0$ です。第一段階の自由膨張で系に生じた正のエントロピーが、第二段階では熱の放出により浴へ移るだけです。全操作では外部から $nRT_0\log2$ の仕事を気体へ与え、同量の熱を浴へ捨てています。一つの浴から熱を吸い上げて正味の仕事を取り出す装置ではないため、[Kelvin–Planckの原理](../TH3/index.md#principle-th3-kelvin-planck)に反しません。
<!-- solution-end -->

## 7. この章で到達したこと

複数熱浴と交換する循環の熱を $1/T$ で重み付けすると、[第二法則](../TH3/index.md#principle-th3-kelvin-planck)からClausiusの不等式が従います。可逆循環の積分が零になることによって初めて、エントロピーという状態関数を定義できました。不可逆な過程は、実際の熱交換積分と端点のエントロピー差との不等式で判定します。

閉鎖系では $dU=T\,dS-p\,dV$ が平衡状態の微分恒等式となり、物質量の変化まで扱うには追加の平衡基本関係 $U(S,V,N)$ が必要です。次のTH5ではこの状態関数を出発点に、どの変数を固定するかに合わせてポテンシャルを変換します。
