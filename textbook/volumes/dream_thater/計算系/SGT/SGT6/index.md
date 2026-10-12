# SGT6 ランダムウォークの混合とスペクトル

[SGT2の定常分布の定理](../SGT2/index.md#thm-sgt2-stationary)で、無向重み付きグラフの頂点を歩く粒子には、次数に比例した定常分布があると分かりました。しかし、**定常分布が存在すること**と、**一つの頂点から出発した分布がそこへ近づくこと**は別問題です。二頂点を往復する歩行を考えると、出発地点が毎回交替し、定常分布へ一度も近づきません。

何が収束を妨げ、何がその速度を決めるのでしょうか。SGT2で得た正規化Laplacianの固有値を使うと、頂点ごとの確率の時間変化を有限次元の直交展開で追えます。本章ではまず往復の振動を取り除く歩行規則を作り、分布の距離と十分に混ざるまでの歩数を定義してから、スペクトルギャップによる定量評価と、取り除かなかった場合の境界を証明します。

## 1. 往復振動を止めるlazy walk

以下では頂点集合 $V$ が有限で $|V|\geq2$、$W=(w_{ij})$ が対称、$w_{ij}\geq0$、$w_{ii}=0$ であり、正重みの辺でグラフ全体が**連結**とします。したがって全ての次数 $d_i=\sum_jw_{ij}$ は正で、$D=\operatorname{diag}(d_i)$ は可逆です。[SGT2の遷移行列](../SGT2/index.md#def-sgt2-transition)と[定常分布](../SGT2/index.md#thm-sgt2-stationary)を使い、

$$
P=D^{-1}W,\qquad M=\sum_i d_i,\qquad \pi_i=\frac{d_i}{M}
$$

と置きます。確率分布は行ベクトル $q$ とし、$t$ 歩後は $qP^t$ です。ここでは孤立頂点を黙って割り算に含めません。

二頂点の間を往復するだけなら

$$
P=\begin{pmatrix}0&1\\1&0\end{pmatrix},\qquad
(1,0)P^{2t}=(1,0),\quad
(1,0)P^{2t+1}=(0,1)
$$

です。定常分布は $\pi=(1/2,1/2)$ ですが、偶数時刻と奇数時刻の差は消えません。固有ベクトル $(1,-1)^{\mathsf T}$ の固有値が $-1$ であるため、符号が交互に入れ替わるのです。そこで各時刻に「半分の確率でその場に留まる」選択を加えます。

<a id="def-sgt6-lazy"></a>

<!-- formal-statement-start -->
> **定義（lazy walk）**  
> 上記の連結な有限無向非負重み付きグラフに対し、

$$
Q=\frac{I+P}{2}
$$

> をlazy walkの遷移行列とする。すなわち $Q_{ii}=1/2$、$i\ne j$ では $Q_{ij}=w_{ij}/(2d_i)$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sgt6-lazy -->
### 例：二頂点での停止確率

**定義の確認**：先ほどの二頂点グラフでは

$$
Q=\begin{pmatrix}1/2&1/2\\1/2&1/2\end{pmatrix}.
$$

各成分は非負で行和は1です。$q_0=(1,0)$ なら $q_1=q_0Q=(1/2,1/2)=\pi$。一度で定常分布に達し、その後も変わりません。元の $P$ で残っていた $-1$ の固有値は、$Q$ では0に移っています。
<!-- definition-example-end -->

<a id="prop-sgt6-lazy-spectrum"></a>

<!-- formal-statement-start -->
> **命題（lazy walkの可逆性と固有値）**  
> 上記の連結グラフで、対称正規化Laplacian $\mathcal L=I-D^{-1/2}WD^{-1/2}$ の固有値を重複度込みで

$$
0=\lambda_1<\lambda_2\leq\cdots\leq\lambda_n\leq2
$$

> と並べると、$Q$ は $\pi$ を定常分布とし、詳細釣合いを満たす。$Q$ の固有値は

$$
\mu_j=1-\frac{\lambda_j}{2},\qquad
1=\mu_1>\mu_2\geq\cdots\geq\mu_n\geq0
$$

> であり、$\mu_1=1$ の固有空間は定数ベクトルの張る一次元空間である。
<!-- formal-statement-end -->

### 証明の見取り図

停留と移動を混ぜても釣合いは保たれます。次に $Q=I-(I-P)/2$ を使い、正規化Laplacianの固有値を $1-\lambda/2$ に移します。上端の固有値2が0に変わることが振動を取り除く鍵です。

<!-- proof-start -->
### 証明

$Q$ の各行和は $(1+1)/2=1$、成分は非負です。[SGT2の詳細釣合いの式](../SGT2/index.md#thm-sgt2-stationary)により、$i\ne j$ では

$$
\pi_iQ_{ij}
=\frac12\pi_iP_{ij}
=\frac{w_{ij}}{2M}
=\frac12\pi_jP_{ji}
=\pi_jQ_{ji}.
$$

$i=j$ では両辺が同じなので自明に一致します。これを $i$ について足すと

$$
(\pi Q)_j=\sum_i\pi_iQ_{ij}
=\sum_i\pi_jQ_{ji}
=\pi_j\sum_iQ_{ji}
=\pi_j.
$$

また $Q=I-(I-P)/2$ です。[SGT2の正規化Laplacianの相似性](../SGT2/index.md#prop-sgt2-similarity)により $I-P$ と $\mathcal L$ は相似です。従って $\mathcal L$ の固有値 $\lambda_j$ に対応する $I-P$ の固有ベクトル $f_j$ について

$$
Qf_j=\left(I-\frac{I-P}{2}\right)f_j
=\left(1-\frac{\lambda_j}{2}\right)f_j.
$$

[SGT2の正規化スペクトルの範囲と核](../SGT2/index.md#thm-sgt2-spectrum-kernel)より全固有値は $[0,2]$ にあり、連結なので零固有値は単純です。ゆえに $0\leq\mu_j\leq1$ で、$\mu_2<1$。さらに $P\boldsymbol1=\boldsymbol1$ より $Q\boldsymbol1=\boldsymbol1$ であり、定数ベクトルが単純固有値1に対応します。
<!-- proof-end -->

「半分だけ留まる」という変更は小さく見えますが、辺の両端で交互に移動するようなグラフでも固有値の絶対値が1の振動成分を消します。混合の証明では、零固有値の重複度が1であることと、残りの固有値の絶対値が1未満であることを分けて使います。

## 2. 分布の距離と混合時間

各時刻に「見た目が近い」というだけでは収束速度を比較できません。頂点ごとの確率差を全部足した量と、定常分布を基準にした平方和を導入します。後者は固有ベクトルの直交展開と相性がよい距離です。

<a id="def-sgt6-tv"></a>

<!-- formal-statement-start -->
> **定義（全変動距離）**  
> 有限集合 $V$ 上の確率分布 $q,r$ に対し、

$$
\|q-r\|_{\mathrm{TV}}
=\frac12\sum_{i\in V}|q_i-r_i|
$$

> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sgt6-tv -->
### 例：一点集中と一様分布

**定義の確認**：二頂点上で $q=(1,0)$、$r=(1/2,1/2)$ とすると

$$
\|q-r\|_{\mathrm{TV}}
=\frac12\left(\left|1-\frac12\right|
+\left|0-\frac12\right|\right)
=\frac12.
$$

値は0以上1以下です。差が正の頂点と負の頂点で絶対値の合計を取るため、符号の打消しは起きません。
<!-- definition-example-end -->

<a id="def-sgt6-pi-norm"></a>

<!-- formal-statement-start -->
> **定義（定常分布で重み付けした内積と密度）**  
> 全ての $\pi_i>0$ として、頂点上の実関数 $f,g$ に対し

$$
\langle f,g\rangle_\pi=\sum_i\pi_if_ig_i,\qquad
\|f\|_{2,\pi}^2=\sum_i\pi_if_i^2
$$

> と定める。分布 $q$ の $\pi$ に対する密度差を

$$
h_q(i)=\frac{q_i}{\pi_i}-1
$$

> とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sgt6-pi-norm -->
### 例：二頂点からの出発を平方和で測る

**定義の確認**：$\pi=(1/2,1/2)$、$q=(1,0)$ なら $h_q=(1,-1)$ です。従って

$$
\langle h_q,\boldsymbol1\rangle_\pi
=\frac12-\frac12=0,\qquad
\|h_q\|_{2,\pi}^2
=\frac12\cdot1^2+\frac12\cdot(-1)^2=1.
$$

密度差が定数関数と直交することは、$\sum_iq_i=\sum_i\pi_i=1$ から一般にも成り立ちます。
<!-- definition-example-end -->

<a id="def-sgt6-mixing-time"></a>

<!-- formal-statement-start -->
> **定義（混合時間）**  
> 遷移行列 $K$、定常確率分布 $\pi$、$0<\varepsilon<1$ に対し、全ての開始頂点で距離が $\varepsilon$ 以下となる最初の非負整数時刻を

$$
t_{\mathrm{mix}}(\varepsilon)
=\min\left\{t\in\mathbb Z_{\geq0}:
\max_{x\in V}\|e_x^{\mathsf T}K^t-\pi\|_{\mathrm{TV}}\leq\varepsilon\right\}
$$

> と定める。条件を満たす時刻がなければ $+\infty$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sgt6-mixing-time -->
### 例：一歩で混ざる二頂点のlazy walk

**定義の確認**：先ほどの二頂点の $Q$ なら、どちらから開始しても $t=0$ の距離は $1/2$、$t\geq1$ では0です。従って $0<\varepsilon<1/2$ なら $t_{\mathrm{mix}}(\varepsilon)=1$、$1/2\leq\varepsilon<1$ なら0です。$\varepsilon$ と等しい距離は条件に含まれることに注意します。
<!-- definition-example-end -->

確率分布 $q$ と $\pi$ の差を $h_q$ に変えると、次の比較が成り立ちます。絶対値の和から二乗和への移行が、スペクトルを分布の距離へ戻す橋になります。

<a id="lem-sgt6-tv-l2"></a>

<!-- formal-statement-start -->
> **補題（全変動距離の平方平均評価）**  
> $\pi_i>0$ の確率分布 $\pi$ と任意の分布 $q$ に対して

$$
\|q-\pi\|_{\mathrm{TV}}
\leq\frac12\|h_q\|_{2,\pi}
$$

> が成り立つ。また一点分布 $q=e_x^{\mathsf T}$ について

$$
\|h_q\|_{2,\pi}^2=\frac1{\pi_x}-1
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

$q_i-\pi_i=\pi_ih_q(i)$ と書けば、$\pi_i$ を重みにしたCauchy–Schwarzの不等式が使えます。一点分布では密度差を展開し、確率の総和が1であることを使います。

<!-- proof-start -->
### 証明

まず $q_i-\pi_i=\pi_ih_q(i)$ だから

$$
\begin{aligned}
2\|q-\pi\|_{\mathrm{TV}}
&=\sum_i\pi_i|h_q(i)|\\
&\leq\left(\sum_i\pi_i\right)^{1/2}
\left(\sum_i\pi_i h_q(i)^2\right)^{1/2}\\
&=\|h_q\|_{2,\pi}.
\end{aligned}
$$

次に $q=e_x^{\mathsf T}$ なら $q_i=\boldsymbol1_{\{i=x\}}$ です。密度差の二乗を展開して

$$
\begin{aligned}
\|h_q\|_{2,\pi}^2
&=\sum_i\pi_i\left(\frac{q_i}{\pi_i}-1\right)^2\\
&=\sum_i\frac{q_i^2}{\pi_i}-2\sum_iq_i+\sum_i\pi_i\\
&=\frac1{\pi_x}-2+1
=\frac1{\pi_x}-1.
\end{aligned}
$$

これで双方が示されました。
<!-- proof-end -->

## 3. スペクトルギャップが混合速度を支配する

[SGT2の重み付き自己随伴性](../SGT2/index.md#prop-sgt2-weighted-adjoint)は、$\langle\cdot,\cdot\rangle_D$ で $P$ が自己随伴であることを保証しました。$\langle f,g\rangle_\pi=\langle f,g\rangle_D/M$ なので、同じ直交性が使えます。密度差の発展も $Q$ 自身で記述できることが次の計算の核心です。

<a id="lem-sgt6-density-evolution"></a>

<!-- formal-statement-start -->
> **補題（可逆歩行の密度差の発展）**  
> $Q$ を第1節のlazy walkとし、初期分布 $q_0$ から $q_t=q_0Q^t$ を定める。このとき $h_t(i)=q_t(i)/\pi_i-1$ について

$$
h_{t+1}=Qh_t,\qquad
\langle h_t,\boldsymbol1\rangle_\pi=0
$$

> が全ての整数 $t\geq0$ で成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

確率の時間発展では行ベクトル $q_t$ の右から $Q$ を掛けます。一方で関数としての密度差には左から $Q$ を作用させます。この左右の変換を許すのが詳細釣合いです。

<!-- proof-start -->
### 証明

第1節の[詳細釣合い](#prop-sgt6-lazy-spectrum) $\pi_iQ_{ij}=\pi_jQ_{ji}$ により、固定した $j$ で

$$
\begin{aligned}
\frac{q_{t+1}(j)}{\pi_j}
&=\frac1{\pi_j}\sum_iq_t(i)Q_{ij}\\
&=\sum_i\frac{q_t(i)}{\pi_i}
\frac{\pi_iQ_{ij}}{\pi_j}\\
&=\sum_iQ_{ji}\frac{q_t(i)}{\pi_i}.
\end{aligned}
$$

さらに $Q$ の $j$ 行の和は1なので

$$
h_{t+1}(j)
=\sum_iQ_{ji}\left(\frac{q_t(i)}{\pi_i}-1\right)
=(Qh_t)(j).
$$

分布は各時刻に総和1だから

$$
\langle h_t,\boldsymbol1\rangle_\pi
=\sum_i\pi_i\left(\frac{q_t(i)}{\pi_i}-1\right)
=\sum_iq_t(i)-\sum_i\pi_i=0.
$$

よって密度差は、定数固有ベクトルを含まない直交補空間で変化します。
<!-- proof-end -->

<a id="thm-sgt6-mixing-upper"></a>

<!-- formal-statement-start -->
> **定理（lazy walkのスペクトル混合上界）**  
> 第1節の連結な有限無向重み付きグラフについて、$\lambda_2>0$ を $\mathcal L$ の第二固有値、$\mu_2=1-\lambda_2/2\in[0,1)$、$\pi_{\min}=\min_i\pi_i>0$ とする。任意の初期分布 $q_0$ と整数 $t\geq0$ に対し

$$
\|q_0Q^t-\pi\|_{\mathrm{TV}}
\leq\frac12\mu_2^t\|h_{q_0}\|_{2,\pi}
$$

> が成り立つ。ここでは $t=0$ のとき $\mu_2^0=1$ とする。特にどの出発点 $x$ からも

$$
\|e_x^{\mathsf T}Q^t-\pi\|_{\mathrm{TV}}
\leq\frac12\mu_2^t\sqrt{\frac1{\pi_x}-1}
\leq\frac12e^{-t\lambda_2/2}
\sqrt{\frac1{\pi_{\min}}-1}.
$$

> 従って $0<\varepsilon<1$ に対し、$\log$ を自然対数とすれば

$$
t_{\mathrm{mix}}(\varepsilon)
\leq
\max\left\{0,\left\lceil
\frac2{\lambda_2}
\log\left(\frac{\sqrt{1/\pi_{\min}-1}}{2\varepsilon}\right)
\right\rceil\right\}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

密度差の平均は零なので、定数固有ベクトルは現れません。残った直交成分へ $Q$ を繰り返し掛けると、全係数が高々 $\mu_2^t$ 倍になります。平方平均を全変動距離へ戻し、$1-a\leq e^{-a}$ を使えば時間の評価まで得られます。

<!-- proof-start -->
### 証明

[密度差の発展](#lem-sgt6-density-evolution)から $h_t=Q^th_0$ かつ $h_0$ は $\boldsymbol1$ と $\pi$ 内積で直交します。[重み付き自己随伴性](../SGT2/index.md#prop-sgt2-weighted-adjoint)と[正規化スペクトル](#prop-sgt6-lazy-spectrum)から、$\pi$ 内積で正規直交な固有ベクトル $f_1,\ldots,f_n$ を選べます。$f_1=\boldsymbol1$（$\|\boldsymbol1\|_{2,\pi}=1$）とし、

$$
h_0=\sum_{j=2}^n a_jf_j,\qquad
a_j=\langle h_0,f_j\rangle_\pi
$$

と展開します。$j=1$ の係数は平均零なので消えています。$Qf_j=\mu_jf_j$ を $t$ 回適用すると

$$
h_t=Q^th_0=\sum_{j=2}^n a_j\mu_j^tf_j.
$$

固有ベクトルは直交し、$0\leq\mu_j\leq\mu_2<1$ なので

$$
\begin{aligned}
\|h_t\|_{2,\pi}^2
&=\sum_{j=2}^n a_j^2\mu_j^{2t}\\
&\leq\mu_2^{2t}\sum_{j=2}^n a_j^2
=\mu_2^{2t}\|h_0\|_{2,\pi}^2.
\end{aligned}
$$

平方根を取り、[全変動距離の平方平均評価](#lem-sgt6-tv-l2)へ代入すれば最初の不等式です。同じ補題を $q_0=e_x^{\mathsf T}$ へ適用すると $\|h_0\|_{2,\pi}^2=1/\pi_x-1$。また $\pi_x\geq\pi_{\min}$ だから平方根も最大で $\sqrt{1/\pi_{\min}-1}$ です。

$0<\lambda_2\leq2$ より $a=\lambda_2/2\in(0,1]$ です。$1-a\leq e^{-a}$ は、$g(a)=e^{-a}-(1-a)$ が $g(0)=0$ かつ $g'(a)=1-e^{-a}\geq0$ であることから従います。ゆえに

$$
\mu_2^t=(1-\lambda_2/2)^t
\leq e^{-t\lambda_2/2}.
$$

最後に $C=\sqrt{1/\pi_{\min}-1}/2>0$ と置くと、$Ce^{-t\lambda_2/2}\leq\varepsilon$ は

$$
-\frac{\lambda_2t}{2}\leq\log\frac{\varepsilon}{C},
\qquad
t\geq\frac2{\lambda_2}\log\frac{C}{\varepsilon}
$$

と同値です。右辺が負なら $t=0$ で十分で、非負ならその天井以上の整数時刻で十分です。この $t$ は全開始点について一様に条件を満たすため、混合時間は表示した上界以下です。
<!-- proof-end -->

**何が保証されたか**：グラフの連結は $\lambda_2>0$ を与え、lazy化は負の固有値を除いて $\mu_2$ を最大の非自明な減衰率にします。$\lambda_2$ が小さいほどこの上界は悪化します。ただしこれは**上界**であって、どのグラフでも実際の混合時間が $1/\lambda_2$ と等しいという主張ではありません。

例えば[SGT3のCheeger不等式](../SGT3/index.md#thm-sgt3-cheeger)で $\lambda_2$ の下界を得れば、上の式へ代入して混合時間の十分な上界を作れます。混合とcutの関係は、このように同じ固有値を介して現れます。

## 4. 混合の遅さは固有ベクトルからも検出できる

上界だけでは、その指数減衰が実際の遅さを反映しているか分かりません。$\mu_2$ に対応する固有ベクトルの確率で重み付けした平均を追えば、逆方向の評価も得られます。

<a id="thm-sgt6-mixing-lower"></a>

<!-- formal-statement-start -->
> **定理（第二固有値からの混合時間下界）**  
> 第1節の連結グラフのlazy walkについて $0<\mu_2<1$ とする。このとき全ての整数 $t\geq0$ について

$$
\max_x\|e_x^{\mathsf T}Q^t-\pi\|_{\mathrm{TV}}
\geq\frac12\mu_2^t.
$$

> 特に $0<\varepsilon<1/2$ なら

$$
t_{\mathrm{mix}}(\varepsilon)\geq
\frac{\log(1/(2\varepsilon))}{-\log\mu_2}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

定数成分を持たない第二固有ベクトルは、確率で重み付けした平均が各歩でちょうど $\mu_2$ 倍になります。確率で重み付けした平均の差が大きければ分布全体の全変動距離も小さくなれません。

<!-- proof-start -->
### 証明

$\mu_2$ に対応する実固有ベクトル $f\ne0$ を取ります。[固有値1の重複度が1であること](#prop-sgt6-lazy-spectrum)と[重み付き自己随伴性](../SGT2/index.md#prop-sgt2-weighted-adjoint)から $\langle f,\boldsymbol1\rangle_\pi=0$ です。有限個の座標の最大絶対値で割り直し、$\max_i|f_i|=1$ にします。ある頂点 $x$ で $|f_x|=1$ です。

$q_t=e_x^{\mathsf T}Q^t$ と置きます。$Qf=\mu_2f$ より

$$
\sum_iq_t(i)f_i=(Q^tf)(x)=\mu_2^tf_x,
\qquad
\sum_i\pi_if_i=0.
$$

従って $\mu_2^t=|\sum_i(q_t(i)-\pi_i)f_i|$ であり、$|f_i|\leq1$ を使えば

$$
\mu_2^t
\leq\sum_i|q_t(i)-\pi_i||f_i|
\leq\sum_i|q_t(i)-\pi_i|
=2\|q_t-\pi\|_{\mathrm{TV}}.
$$

開始点 $x$ は固定して選んだので、全点についての最大距離もこの値以上です。時刻 $t=t_{\mathrm{mix}}(\varepsilon)$ では $\mu_2^t\leq2\varepsilon$ が必要です。$0<\mu_2<1$ より $\log\mu_2<0$ であることに注意して両辺の対数を取ると

$$
t\log\mu_2\leq\log(2\varepsilon)
\quad\Longrightarrow\quad
t\geq\frac{\log(1/(2\varepsilon))}{-\log\mu_2}.
$$

混合上界と違い、この下界は任意の開始点についてではなく、**少なくとも一つの悪い開始点が存在する**ことを示します。
<!-- proof-end -->

$\mu_2=0$ の場合、正規化された二頂点の完全なlazy化のように一歩で消える成分があり、対数による下界は使いません。仮定が $0<\mu_2<1$ であることを忘れて $-\log0$ を書くのは誤りです。

## 5. lazy化しない場合：二部性と非周期性

もとの遷移行列 $P$ に戻ると、非自明な固有値は $\rho_j=1-\lambda_j\in[-1,1]$ です。$\lambda_2>0$ だけでは $\rho_n=-1$ が残る可能性があり、二頂点の往復がまさにその例でした。この例外はグラフの**二部性**と正確に対応します。

正重みの各辺の両端を、異なる側へ分ける頂点の二色分割を考えます。全ての辺が二集合 $V_0,V_1$ の間だけを結ぶという条件です。これは[二部グラフの定義](../../DOPT/DOPT3/index.md#def-dopt3-bipartite-graph)と同じで、ここでは重みが正の辺だけを対象とします。以降はこの条件を使います。

### 例：道と三角形

**条件の確認**：三頂点道 $1-2-3$ は $V_0=\{1,3\}$、$V_1=\{2\}$ と分ければ、二本の辺が必ず両集合の間を結ぶため二部グラフです。三角形では、頂点1と2を別の集合に置くと、頂点3は辺 $(2,3)$ のため1と同じ集合に置く必要がありますが、辺 $(1,3)$ に矛盾するため二部グラフではありません。

<a id="thm-sgt6-bipartite-spectrum"></a>

<!-- formal-statement-start -->
> **定理（二部性と固有値マイナス1の同値性）**  
> 第1節と同じ連結な有限無向非負重み付きグラフに対して、以下は同値である。
>
> (i) グラフは二部グラフである。
>
> (ii) $P$ は固有値 $-1$ を持つ。
>
> (iii) $\mathcal L$ は固有値 $2$ を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

$Pf=-f$ の条件に、元の辺の非負性を戻します。各辺の両端で $f$ の値が反対でなければならず、グラフの連結から絶対値が一定になります。逆に二部なら $+1$ と $-1$ の値を交互に置くだけで固有ベクトルを作れます。

<!-- proof-start -->
### 証明

[正規化Laplacianの相似性](../SGT2/index.md#prop-sgt2-similarity)より $I-P$ と $\mathcal L$ は相似です。$Pf=-f$ と $(I-P)f=2f$ は同値なので、(ii) と (iii) は同値です。

(ii) を仮定し、零でない実固有ベクトル $f$ が $Pf=-f$ を満たすとします。両辺に $D$ を掛けると $(D+W)f=0$ です。これを $f^{\mathsf T}$ で挟みます。非対角重みは対称で $w_{ii}=0$ だから

$$
\begin{aligned}
0=f^{\mathsf T}(D+W)f
&=\sum_i d_if_i^2+\sum_{i,j}w_{ij}f_if_j\\
&=\sum_{i<j}w_{ij}(f_i^2+2f_if_j+f_j^2)\\
&=\sum_{i<j}w_{ij}(f_i+f_j)^2.
\end{aligned}
$$

各項が非負なので、$w_{ij}>0$ の全ての辺で $f_i=-f_j$ です。連結なグラフ上で $f$ は非零であり、もしある頂点で $f_i=0$ なら正重みの道を順にたどって全頂点で零となって矛盾します。よって全ての $f_i\ne0$。正の値を持つ頂点の集合と負の値を持つ頂点の集合に分けると、全ての正重みの辺がその間を結ぶため (i) が従います。

逆に (i) とし、各頂点で $f_i=1$（$i\in V_0$）、$f_i=-1$（$i\in V_1$）と置きます。各正重みの隣接点 $j$ について $f_j=-f_i$ なので

$$
(Pf)_i=\sum_j\frac{w_{ij}}{d_i}f_j
=-f_i\frac{\sum_jw_{ij}}{d_i}
=-f_i.
$$

従って $Pf=-f$ で (ii) を得ます。これで三条件は同値です。
<!-- proof-end -->

二部グラフでは開始点が $V_0$ に属すれば、偶数歩後は必ず $V_0$、奇数歩後は必ず $V_1$ にいます。定常分布は両側へ正の質量を置くため、この分布列は定常分布へ収束できません。これはグラフの連結だけでは足りない**周期2の障害**です。

<a id="thm-sgt6-nonlazy-mixing"></a>

<!-- formal-statement-start -->
> **定理（通常歩行が混合する条件と速度）**  
> 第1節の連結な有限無向非負重み付きグラフに対して、$P^t$ の各行分布が $\pi$ に収束することと、グラフが非二部であることは同値である。非二部なら

$$
\beta=\max\{|1-\lambda_2|,\ |1-\lambda_n|\}<1
$$

> と置けて、任意の初期分布 $q_0$ と整数 $t\geq0$ に対し

$$
\|q_0P^t-\pi\|_{\mathrm{TV}}
\leq\frac12\beta^t\|h_{q_0}\|_{2,\pi}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

lazy歩行と同じ密度差の直交展開を、固有値が負でも成立するよう**絶対値**で評価します。非二部性は最小固有値が $-1$ でないことと同値です。

<!-- proof-start -->
### 証明

[SGT2の詳細釣合い](../SGT2/index.md#thm-sgt2-stationary)によって、[密度差の発展の補題](#lem-sgt6-density-evolution)と同じ成分計算を $Q$ の代わりに $P$ で行うと $h_t=P^th_0$ となります。[重み付き自己随伴性](../SGT2/index.md#prop-sgt2-weighted-adjoint)から $\pi$ 直交な固有ベクトル系があり、定数関数の成分は平均零により消えます。

$P$ の固有値は $1=\rho_1>\rho_2\geq\cdots\geq\rho_n\geq-1$、$\rho_j=1-\lambda_j$ です。グラフの連結は $\rho_2<1$ を保証します。非二部なら[二部性の定理](#thm-sgt6-bipartite-spectrum)から $\rho_n>-1$ です。全ての $j\geq2$ の固有値は区間 $[\rho_n,\rho_2]$ にあるので、その絶対値は両端の絶対値の最大 $\beta$ 以下で、$\beta<1$ です。

$h_0=\sum_{j=2}^na_jf_j$ と置くと

$$
\|P^th_0\|_{2,\pi}^2
=\sum_{j=2}^na_j^2\rho_j^{2t}
\leq\beta^{2t}\sum_{j=2}^na_j^2
=\beta^{2t}\|h_0\|_{2,\pi}^2.
$$

[全変動距離の平方平均評価](#lem-sgt6-tv-l2)と $\beta<1$ から、全ての初期分布について定常分布への収束が従います。特に各頂点の一点分布を初期分布にできます。

二部なら第1節と同様に歩行は毎回分割の反対側にしか移れません。定常分布の両側の質量は正ですから、各時刻の分布は片側に全質量を持ち続け、定常分布に収束できません。従って収束なら非二部です。
<!-- proof-end -->

## 6. 具体計算：三角形ではどのくらい混ざるか

三頂点完全グラフで辺重みを全て1とすると $d_i=2$、$\pi=(1/3,1/3,1/3)$ です。通常の歩行とlazy歩行は

$$
P=\begin{pmatrix}
0&1/2&1/2\\
1/2&0&1/2\\
1/2&1/2&0
\end{pmatrix},
\qquad
Q=\begin{pmatrix}
1/2&1/4&1/4\\
1/4&1/2&1/4\\
1/4&1/4&1/2
\end{pmatrix}.
$$

$J$ を全成分が1の $3\times3$ 行列とすると、$P=(J-I)/2$、$Q=(I+J)/4$ です。$J\boldsymbol1=3\boldsymbol1$、$\sum_i f_i=0$ の $f$ には $Jf=0$ なので、$P$ の固有値は $1,-1/2,-1/2$、$Q$ は $1,1/4,1/4$ です。非二部なので $P$ も混合します。

初期分布 $q_0=(1,0,0)$ を

$$
q_0=\pi+(q_0-\pi)
$$

と分解すると、差 $q_0-\pi$ は座標和0です。その部分へ $P$ または $Q$ を掛けるたび、固有値倍されます。ゆえに

$$
q_0P^t=\pi+(-1/2)^t(q_0-\pi),\qquad
q_0Q^t=\pi+(1/4)^t(q_0-\pi).
$$

$\|q_0-\pi\|_{\mathrm{TV}}=\frac12(2/3+1/3+1/3)=2/3$ なので

$$
\|q_0P^t-\pi\|_{\mathrm{TV}}=\frac23(1/2)^t,\qquad
\|q_0Q^t-\pi\|_{\mathrm{TV}}=\frac23(1/4)^t.
$$

両者とも収束しますが、この例ではlazy化した方が速い結果になっています。一般にlazy化すれば必ず通常歩行より速い、という意味ではありません。例えば固有値が全て非負の通常歩行では、$Q$ の非定数固有値 $1-\lambda_j/2$ の方が $P$ の $1-\lambda_j$ より1に近づく場合があります。lazy化の役割は**周期性による不収束を確実に除く**ことです。

## 7. 演習：距離、固有値、仮定を行き来する

### Level A：定義を具体的に計算する

#### A1. 往復歩行の混合時間

二頂点無重みグラフで $P,Q,\pi$ を書き、$P$ の分布列が収束しないことと、$0<\varepsilon<1/2$ に対する $Q$ の混合時間を求めよ。

- Level: A
- ID: SGT6-A1

<!-- solution-start -->
**詳細解答**　次数は両頂点とも1なので

$$
P=\begin{pmatrix}0&1\\1&0\end{pmatrix},
\quad Q=\begin{pmatrix}1/2&1/2\\1/2&1/2\end{pmatrix},
\quad\pi=(1/2,1/2).
$$

$e_1^{\mathsf T}P^t$ は偶数時刻に $(1,0)$、奇数時刻に $(0,1)$ です。どちらも定常分布からの全変動距離は $1/2$ なので距離は零へ近づきません。一方 $e_x^{\mathsf T}Q=\pi$ は $x=1,2$ の両方で成り立ちます。時刻0の最大距離が $1/2>\varepsilon$、時刻1では0なので、[混合時間の定義](#def-sgt6-mixing-time)から $t_{\mathrm{mix}}(\varepsilon)=1$ です。
<!-- solution-end -->

#### A2. 全変動距離を測る

$V=\{1,2,3\}$、$q=(1/2,1/3,1/6)$、$r=(1/3,1/3,1/3)$ の全変動距離を求めよ。

- Level: A
- ID: SGT6-A2

<!-- solution-start -->
**詳細解答**　成分差は $(1/6,0,-1/6)$ なので、[全変動距離の定義](#def-sgt6-tv)により

$$
\|q-r\|_{\mathrm{TV}}
=\frac12\left(\frac16+0+\frac16\right)=\frac16.
$$

差を符号付きで足せば零になりますが、それは両分布の総和が1であることだけを表し、距離ではありません。
<!-- solution-end -->

#### A3. 一点分布の密度差

$\pi=(1/4,1/2,1/4)$ と $q=(1,0,0)$ について $h_q$ と $\|h_q\|_{2,\pi}^2$ を求め、[平方平均評価](#lem-sgt6-tv-l2)の右辺も求めよ。

- Level: A
- ID: SGT6-A3

<!-- solution-start -->
**詳細解答**　各成分を $\pi_i$ で割って1を引くと

$$
h_q=(4-1,\ 0-1,\ 0-1)=(3,-1,-1).
$$

従って

$$
\|h_q\|_{2,\pi}^2
=\frac14\cdot9+\frac12\cdot1+\frac14\cdot1=3.
$$

一方 $1/\pi_1-1=4-1=3$ とも一致します。[補題](#lem-sgt6-tv-l2)による上界は $\sqrt3/2$ です。実際の距離は $1-\pi_1=3/4$ であり、上界は等号とは限りません。
<!-- solution-end -->

#### A4. 三角形のスペクトル

三頂点完全グラフの通常歩行 $P=(J-I)/2$ とlazy歩行 $Q=(I+J)/4$ の全固有値を求め、$\lambda_2$ と $\mu_2$ を明示せよ。

- Level: A
- ID: SGT6-A4

<!-- solution-start -->
**詳細解答**　$J$ の固有値は定数ベクトルに対して3、座標和0の二次元部分空間に対して0です。従って $P$ の固有値は $(3-1)/2=1$ と $(0-1)/2=-1/2$（重複度2）。$Q$ は $(1+3)/4=1$ と $(1+0)/4=1/4$（重複度2）です。[SGT2の正規化の相似性](../SGT2/index.md#prop-sgt2-similarity)から $\lambda_2=1-(-1/2)=3/2$。さらに[元の固有値の対応](#prop-sgt6-lazy-spectrum)より $\mu_2=1-\lambda_2/2=1/4$ です。
<!-- solution-end -->

### Level B：収束の証明と境界条件

#### B1. 密度差の発展を追う

三頂点道の通常歩行を $P$ とし、$\pi=(1/4,1/2,1/4)$ とする。初期分布 $q_0=(0,1,0)$ について $q_1=q_0P$、$h_0$、$Ph_0$ を求め、$Ph_0=h_{q_1}$ を確認せよ。

- Level: B
- ID: SGT6-B1

<!-- solution-start -->
**詳細解答**　三頂点道の中央からは両端へ確率 $1/2$ ずつ移るので

$$
P=\begin{pmatrix}0&1&0\\1/2&0&1/2\\0&1&0\end{pmatrix},
\qquad q_1=(1/2,0,1/2).
$$

定義から $h_0=(0/(1/4)-1,\ 1/(1/2)-1,\ 0/(1/4)-1)=(-1,1,-1)$。行列を掛けると

$$
Ph_0=\begin{pmatrix}
1\\
-\frac12-\frac12\\
1
\end{pmatrix}
=(1,-1,1).
$$

一方

$$
h_{q_1}=\left(\frac{1/2}{1/4}-1,\frac0{1/2}-1,\frac{1/2}{1/4}-1\right)
=(1,-1,1).
$$

両者が一致します。これは[密度差の発展](#lem-sgt6-density-evolution)がlazy walk以外の可逆歩行にも適用できることの具体的確認です。
<!-- solution-end -->

#### B2. 下界を固有ベクトルで作る

連結グラフのlazy歩行の固有ベクトル $f$ が $Qf=\mu f$、$0<\mu<1$、$\sum_i\pi_if_i=0$、$\max_i|f_i|=1$ を満たすとする。どのように開始点を選べば $t$ 歩後の全変動距離が $\mu^t/2$ 以上になるか、式で示せ。

- Level: B
- ID: SGT6-B2

<!-- solution-start -->
**詳細解答**　$|f_x|=1$ を満たす頂点 $x$ を選び、$q_t=e_x^{\mathsf T}Q^t$ と置きます。固有ベクトルの式を繰り返して

$$
\sum_iq_t(i)f_i
=(Q^tf)(x)=\mu^tf_x.
$$

定常平均が零なので、両辺の絶対値は

$$
\mu^t=\left|\sum_i(q_t(i)-\pi_i)f_i\right|
\leq\sum_i|q_t(i)-\pi_i||f_i|
\leq2\|q_t-\pi\|_{\mathrm{TV}}.
$$

従って $\|q_t-\pi\|_{\mathrm{TV}}\geq\mu^t/2$ です。この開始点は **$f$ の最大絶対値を達成する点**であり、全開始点についての下界を示したわけではありません。
<!-- solution-end -->

#### B3. 三頂点道の周期性とlazy化

三頂点道 $1-2-3$ の通常歩行の固有値を全て求め、なぜ収束しないかを述べよ。またlazy歩行の固有値と、中央頂点2から一歩後の分布を求めよ。

- Level: B
- ID: SGT6-B3

<!-- solution-start -->
**詳細解答**　通常歩行は

$$
P=\begin{pmatrix}0&1&0\\1/2&0&1/2\\0&1&0\end{pmatrix}.
$$

$f_1=(1,1,1)^{\mathsf T}$、$f_2=(1,0,-1)^{\mathsf T}$、$f_3=(1,-1,1)^{\mathsf T}$ に作用するとそれぞれ $Pf_1=f_1$、$Pf_2=0$、$Pf_3=-f_3$ です。よって固有値は $1,0,-1$。二部集合 $\{1,3\},\{2\}$ を毎歩交替するため、[二部性の定理](#thm-sgt6-bipartite-spectrum)に対応する $-1$ 成分が消えず、一般には収束しません。

[固有値の対応](#prop-sgt6-lazy-spectrum)から $Q=(I+P)/2$ の固有値は $1,1/2,0$。頂点2からの一歩は行2を取って

$$
e_2^{\mathsf T}Q=\left(\frac14,\frac12,\frac14\right)=\pi
$$

です。一点分布から一歩で混ざる開始点があっても、混合時間は**全開始点の最大**で定義されるので、全体が一歩で混ざるとは断定できません。
<!-- solution-end -->

#### B4. 上界の数値判定

連結グラフについて $\lambda_2=1/2$、$\pi_{\min}=1/8$ と分かっている。lazy walkで $\varepsilon=1/20$ を目標とするとき、[混合上界定理](#thm-sgt6-mixing-upper)の指数評価から、何歩あれば十分かを式で示せ。これは実際の混合時間の等号値といえるか。

- Level: B
- ID: SGT6-B4

<!-- solution-start -->
**詳細解答**　$\sqrt{1/\pi_{\min}-1}=\sqrt7$、$2\varepsilon=1/10$ です。指数上界を $\varepsilon$ 以下にする条件は

$$
\frac12e^{-t/4}\sqrt7\leq\frac1{20}
\quad\Longleftrightarrow\quad
e^{-t/4}\leq\frac1{10\sqrt7}.
$$

両辺の自然対数を取ると $-t/4\leq-\log(10\sqrt7)$、すなわち

$$
t\geq4\log(10\sqrt7)\approx13.11.
$$

よって整数時刻 **14歩** あれば十分です。この歩数なら目標達成が保証されますが、実際の混合時間が14であると結論することはできません。
<!-- solution-end -->

### Level C：グラフの構造、距離、速度を統合する

#### C1. 三角形の混合時間を正確に求める

三頂点完全グラフの各辺を重み1とし、初期分布を任意の一点分布とする。(i) $P$ と $Q$ の固有値と定常分布を求めよ。(ii) 両歩行の時刻 $t$ における最大全変動距離を厳密に求めよ。(iii) $0<\varepsilon<2/3$ のとき $P$ と $Q$ の混合時間をそれぞれ明示し、同じ $\lambda_2$ でも負の固有値とlazy化が与える役割の違いを説明せよ。

- Level: C
- ID: SGT6-C1

<!-- solution-start -->
**詳細解答**　全頂点の次数は2で $\pi=(1/3,1/3,1/3)$。$J$ を全成分1の行列として

$$
P=\frac{J-I}{2},\qquad Q=\frac{I+P}{2}=\frac{I+J}{4}.
$$

$J$ は定数ベクトルに固有値3、座標和0の二次元部分空間に固有値0を持ちます。従って $P$ の固有値は $1,-1/2,-1/2$、$Q$ は $1,1/4,1/4$。$\mathcal L$ の固有値は $1-\rho$ により $0,3/2,3/2$ だから $\lambda_2=3/2$ です。

一点分布 $q_0=e_x^{\mathsf T}$ は $q_0=\pi+(q_0-\pi)$ と分解でき、定数方向に対応する $\pi$ は保存され、残りの座標和0の部分は固有値で倍されます。よって任意の開始点 $x$ について

$$
e_x^{\mathsf T}P^t
=\pi+(-1/2)^t(e_x^{\mathsf T}-\pi),
$$

$$
e_x^{\mathsf T}Q^t
=\pi+(1/4)^t(e_x^{\mathsf T}-\pi).
$$

$e_x^{\mathsf T}-\pi$ の成分は並べ替えを除き $(2/3,-1/3,-1/3)$ です。絶対値の和の半分は $2/3$ なので

$$
\max_x\|e_x^{\mathsf T}P^t-\pi\|_{\mathrm{TV}}
=\frac23\left(\frac12\right)^t,\quad
\max_x\|e_x^{\mathsf T}Q^t-\pi\|_{\mathrm{TV}}
=\frac23\left(\frac14\right)^t.
$$

$0<\varepsilon<2/3$ なら対数を取って

$$
t_{\mathrm{mix}}^{P}(\varepsilon)
=\left\lceil\frac{\log(2/(3\varepsilon))}{\log2}\right\rceil,
\qquad
t_{\mathrm{mix}}^{Q}(\varepsilon)
=\left\lceil\frac{\log(2/(3\varepsilon))}{\log4}\right\rceil.
$$

三角形は非二部で $P$ の最小固有値は $-1/2>-1$、従って通常歩行も混合します。この例では負の固有値の絶対値が $1/2$ からlazy化で $1/4$ へ小さくなるため $Q$ が速く混ざります。二部グラフであれば $P$ に $-1$ が残って収束そのものが失われます。同じ正規化Laplacianの第二固有値 $\lambda_2$ だけを見て通常歩行の収束を断言してはいけません。
<!-- solution-end -->

## 8. 次に必要な道具

本章では、[次数に比例する定常分布](../SGT2/index.md#thm-sgt2-stationary)を出発点に、混合を全変動距離で定量化し、lazy walkの非自明な最大固有値が $1-\lambda_2/2$ になることを証明しました。混合が遅いことも第二固有ベクトルから検出でき、通常歩行には非二部性が必要であることも分かりました。

次のSGT7では視点を変え、辺を電気抵抗と見たときの有効抵抗をグラフLaplacianと結びます。有限グラフの同じ行列が、確率の時間発展だけでなくエネルギーを最も小さくする問題も記述することを調べます。
