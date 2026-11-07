# SLT2-15 SGDの拡散近似とその限界

<!-- definition-example-audit: strict -->

[ML1-10の確率的勾配法](../../ML/ML1-10/index.md#def-ml1-10-sgd-update)では、少数の標本を選ぶことで一歩の計算量を下げた。その代わり、更新のたびに勾配が揺れる。[前章のmean-field流](../SLT2-14/index.md#thm-slt2-14-wellposed)は滑らかな決定論的輸送を扱ったが、SGDの乱数はそこに自動的には含まれない。

多数回のSGD更新を連続時間で眺めると、揺れをブラウン運動で置き換えた確率微分方程式が候補になる。しかし、**SGDの一歩は普通Gaussianではない**。どの量を一致させ、何を追加で証明しなければならないかを区別する。

この章で確認するのは次の五点である。

1. 勾配雑音の方向ごとの大きさを共分散行列で測る。
2. 学習率とミニバッチサイズから拡散係数を導く。
3. 一歩の弱いTaylor比較を、誤差の次数とともに証明する。
4. 二次模型で離散SGDと拡散模型の平均・分散を正確に比べる。
5. 非Gaussian、シャッフル抽出、時間尺度によって近似が壊れる理由を特定する。

## 1. 勾配雑音はスカラー分散だけでは分からない

固定した訓練集合の微分可能な損失 $f_i:\mathbb R^d\to\mathbb R$（$1\le i\le n$）に対し、

$$
F(w)=\frac1n\sum_{i=1}^nf_i(w),\quad
g_i(w)=\nabla f_i(w),\quad
g(w)=\nabla F(w)
$$

と置く。[ML1-10の分散定理](../../ML/ML1-10/index.md#thm-ml1-10-minibatch-variance)は勾配雑音の二乗ノルムの平均を求めた。だが二次元の雑音が横にだけ揺れるのか縦にも揺れるのかは、ノルムの平均だけでは分からない。そこで、列ベクトルとその転置の積から方向別の共分散行列を作る。ここで $u v^{\mathsf T}$ は $d\times d$ 行列であり、その $(r,s)$ 成分は $u_rv_s$ である。

抽出直前までの履歴（現在の点 $w_k$ を含む情報）を $\mathcal H_k$ とする。各時刻で **履歴と独立な一様復元抽出** により $b\ge1$ 個の番号 $I_{k,1},\ldots,I_{k,b}$ を互いに独立に選び、ミニバッチ勾配を

$$
G_k=\frac1b\sum_{j=1}^bg_{I_{k,j}}(w_k)
$$

と書く。条件付き期待値は、この抽出直前の情報を固定して新たな番号だけを平均する操作であり、訓練集合を再生成するものではない。

<a id="def-slt2-15-noise-covariance"></a>

<!-- formal-statement-start -->
> **定義（条件付き勾配雑音共分散行列）**
> $n,d\ge1$ とし、微分可能な $f_i:\mathbb R^d\to\mathbb R$ の勾配 $g_i=\nabla f_i$ と平均勾配 $g=n^{-1}\sum_i g_i$ に対し、$h_i(w)=g_i(w)-g(w)$ と置く。点 $w\in\mathbb R^d$ における一標本の共分散行列を

$$
\Gamma(w)=\frac1n\sum_{i=1}^nh_i(w)h_i(w)^{\mathsf T}
\in\mathbb R^{d\times d}
$$

> と定める。履歴 $\mathcal H_k$ に基づく $w_k$ で、独立な一様復元ミニバッチ勾配 $G_k=b^{-1}\sum_{j=1}^b g_{I_{k,j}}(w_k)$ を作るとき、$\xi_k=g(w_k)-G_k$ を勾配雑音と呼ぶ。条件付き平均 $E[\xi_k\mid\mathcal H_k]=0$ なので、条件付き共分散は $E[\xi_k\xi_k^{\mathsf T}\mid\mathcal H_k]$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt2-15-noise-covariance -->
**定義の確認**。$n=2,d=2$、勾配が $g_1(w)=g(w)+(1,0)^{\mathsf T}$、$g_2(w)=g(w)-(1,0)^{\mathsf T}$ となる点を考える。$h_1=(1,0)^{\mathsf T},h_2=(-1,0)^{\mathsf T}$ で、平均は零である。$h_ih_i^{\mathsf T}$ を各成分で計算すると

$$
\Gamma(w)=\frac12\left[
\begin{pmatrix}1&0\\0&0\end{pmatrix}
+\begin{pmatrix}1&0\\0&0\end{pmatrix}\right]
=\begin{pmatrix}1&0\\0&0\end{pmatrix}.
$$

任意の $u=(u_1,u_2)^{\mathsf T}$ に対して $u^{\mathsf T}\Gamma u=u_1^2\ge0$。行列は対称・正半定値で、第二方向の雑音は零と確かめられる。二乗ノルムの平均は $\operatorname{tr}\Gamma=1$ である。

さらに更新点 $w_k=w$ で $b=1$ としてこの二標本を一様復元抽出すると、$\xi_k=-h_{I_{k,1}}$ は履歴を固定しても $(1,0)^{\mathsf T}$ と $(-1,0)^{\mathsf T}$ を各確率 $1/2$ で取る。従って

$$
E[\xi_k\mid\mathcal H_k]=0,\qquad
E[\xi_k\xi_k^{\mathsf T}\mid\mathcal H_k]
=\frac12\sum_{i=1}^2h_ih_i^{\mathsf T}=\Gamma(w_k).
$$

これで、一標本の行列だけでなく、定義で述べた履歴条件付き共分散の意味も確認できた。
<!-- definition-example-end -->

<a id="prop-slt2-15-minibatch-covariance"></a>

<!-- formal-statement-start -->
> **命題（復元ミニバッチの条件付き共分散行列）**
> $n,d,b\ge1$、$f_i$ が微分可能で、各時刻の番号が履歴 $\mathcal H_k$ と独立な一様復元抽出であるとする。このとき

$$
E[\xi_k\mid\mathcal H_k]=0,\qquad
E[\xi_k\xi_k^{\mathsf T}\mid\mathcal H_k]
=\frac{\Gamma(w_k)}b.
$$

> $\Gamma(w)$ は対称正半定値であり、$\operatorname{tr}\Gamma(w)=n^{-1}\sum_i\|g_i(w)-g(w)\|_2^2$ である。
<!-- formal-statement-end -->

### 証明の見取り図

一標本の中心化勾配を $b$ 個平均し、$H_jH_l^{\mathsf T}$ の二重和を対角項と非対角項に分ける。後者が消える理由は、履歴を固定しても新しい番号が互いに独立なことにある。

<!-- proof-start -->
### 証明

$H_j=g_{I_{k,j}}(w_k)-g(w_k)$ と置く。履歴を固定したとき各 $H_j$ は平均零、$H_jH_j^{\mathsf T}$ の平均が $\Gamma(w_k)$ である。$j\ne l$ なら独立なので各成分で

$$
E[H_jH_l^{\mathsf T}\mid\mathcal H_k]
=E[H_j\mid\mathcal H_k]E[H_l^{\mathsf T}\mid\mathcal H_k]=0.
$$

$\xi_k=-b^{-1}\sum_j H_j$ より

$$
\begin{aligned}
E[\xi_k\xi_k^{\mathsf T}\mid\mathcal H_k]
&=\frac1{b^2}\sum_{j,l}
E[H_jH_l^{\mathsf T}\mid\mathcal H_k]\\
&=\frac1{b^2}\sum_{j=1}^b\Gamma(w_k)
=\frac1b\Gamma(w_k).
\end{aligned}
$$

また任意の $u\in\mathbb R^d$ について

$$
u^{\mathsf T}\Gamma(w)u
=\frac1n\sum_i(u^{\mathsf T}h_i(w))^2\ge0.
$$

$\operatorname{tr}(hh^{\mathsf T})=\sum_rh_r^2=\|h\|_2^2$ を有限和へ適用すれば最後の主張も従う。$\square$
<!-- proof-end -->

非復元の **単一バッチ** については、[ML1-10の有限母集団補正](../../ML/ML1-10/index.md#prop-ml1-10-without-replacement)の行列版により、$n\ge2$、$1\le b\le n$ で

$$
\operatorname{Cov}(\widetilde G_b(w))
=\frac{n-b}{b(n-1)}\Gamma(w).
$$

実際、異なる抽出位置の中心化勾配の転置積行列の平均は、$\sum_i h_i=0$ を用いて $-\Gamma/(n-1)$。ただし**一つのバッチの無条件分散**であり、シャッフルした残りを次の反復に使うときの履歴条件付き分散ではない。

## 2. 学習率から拡散係数を決める

定数歩幅を $\eta>0$ とし、SGD一歩を $w_{k+1}=w_k-\eta g(w_k)+\eta\xi_k$ と書く。前節から、履歴を固定した更新増分の平均は $-\eta g(w_k)$、共分散は $\eta^2\Gamma(w_k)/b$ である。

これをGaussian増分で再現したい。前節で示した $u^{\mathsf T}\Gamma(w)u\ge0$ と対称性から、固有値は非負であり、直交行列 $Q$ と非負固有値 $\lambda_1,\ldots,\lambda_d$ を用いて

$$
\Gamma(w)=Q\operatorname{diag}(\lambda_1,\ldots,\lambda_d)Q^{\mathsf T},
\qquad Q^{\mathsf T}Q=I_d
$$

と分解できる。$\operatorname{diag}$ は指定した数を対角成分に並べる行列を表す。そこで $\Sigma(w)=Q\operatorname{diag}(\sqrt{\lambda_1},\ldots,\sqrt{\lambda_d})$ と取れば

$$
\Sigma(w)\Sigma(w)^{\mathsf T}
=Q\operatorname{diag}(\lambda_1,\ldots,\lambda_d)Q^{\mathsf T}
=\Gamma(w).
$$

$\Sigma$ は $d\times d$ の行列であり、標準正規列ベクトル $Z_k$ を掛けると $E[(\Sigma Z_k)(\Sigma Z_k)^{\mathsf T}]=\Sigma I_d\Sigma^{\mathsf T}=\Gamma$ となる。これは**共分散の平方根による表現**であり、元の標本勾配がGaussianであるという主張ではない。

連続時間では、[多次元ブラウン運動](../../../解析系/STO/STO7/index.md#def-sto7-vector-brownian)を $B_t$ と書く。[STO9のブラウンSDE](../../../解析系/STO/STO9/index.md#def-sto9-sde)に従い、ドリフト $\mu:\mathbb R^d\to\mathbb R^d$ と拡散係数 $\sigma:\mathbb R^d\to\mathbb R^{d\times d}$ に対する

$$
dW_t=\mu(W_t)\,dt+\sigma(W_t)\,dB_t
$$

は、$s$ を積分変数とする

$$
W_t=W_0+\int_0^t\mu(W_s)\,ds
+\int_0^t\sigma(W_s)\,dB_s
$$

の略記である。$dW_t$ と $dB_t$ を通常の分数のように割るわけではない。$t$ は連続時間の変数、$k$ は離散更新の番号である。以下では $\eta$ を固定した近似パラメータとして扱う。

<a id="def-slt2-15-gaussian-proxy"></a>

<!-- formal-statement-start -->
> **定義（Gaussian一歩近似と拡散模型）**
> 上の有限標本目的、固定歩幅 $\eta>0$、復元バッチサイズ $b\ge1$ に対し、$\Sigma(w)\Sigma(w)^{\mathsf T}=\Gamma(w)$ とする。履歴と独立な $Z_k\sim N_d(0,I_d)$ を用いたGaussian一歩近似を

$$
\widetilde w_{k+1}
=w_k-\eta g(w_k)+\frac{\eta}{\sqrt b}\Sigma(w_k)Z_k
$$

> とする。対応する連続時間の候補を、$d$ 次元ブラウン運動 $B_t$ を用いて

$$
dW_t=-g(W_t)\,dt
+\sqrt{\frac{\eta}{b}}\,\Sigma(W_t)\,dB_t
$$

> と書き、これをここでの拡散模型とする。解の存在を主張するときは係数の正則性を別に確認する。$\eta$ は固定した近似パラメータであり、連続時間の刻み幅とは区別する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt2-15-gaussian-proxy -->
**定義の確認**。前節の $\Gamma=\operatorname{diag}(1,0)$ なら $\Sigma=\operatorname{diag}(1,0)$ と取れる。これは $\Sigma\Sigma^{\mathsf T}=\operatorname{diag}(1,0)^2=\Gamma$ を満たす。$Z=(Z_1,Z_2)^{\mathsf T}$ を標準正規とすれば

$$
\Sigma Z=(Z_1,0)^{\mathsf T},\qquad
E[\Sigma Z]=0,\qquad
E[(\Sigma Z)(\Sigma Z)^{\mathsf T}]=\Gamma.
$$

したがってGaussian一歩の平均と共分散は、それぞれ

$$
w-\eta g(w),\qquad \frac{\eta^2}{b}\operatorname{diag}(1,0)
$$

となり、元の復元ミニバッチ更新の**平均・共分散**に一致する。第二方向には雑音が加わらないが、雑音の分布まで同一とは限らない。
<!-- definition-example-end -->

この積分表示で、ブラウン運動の時刻幅 $\eta$ の増分 $\Delta B_k=B_{(k+1)\eta}-B_{k\eta}$ は平均零、共分散 $\eta I_d$ を持つ。拡散模型に刻み $\eta$ のEuler–Maruyama更新を適用して係数を左端で固定すると

$$
W_{(k+1)\eta}^{\mathrm{EM}}
=W_{k\eta}^{\mathrm{EM}}-\eta g(W_{k\eta}^{\mathrm{EM}})
+\sqrt{\frac{\eta}{b}}\Sigma(W_{k\eta}^{\mathrm{EM}})\Delta B_k.
$$

$\Delta B_k=\sqrt\eta Z_k$ と法則として書けば、雑音の係数は **$\eta/\sqrt b$** になる。$\sqrt{\eta/b}$ だけをSGD一歩に掛けるのは刻み幅を一度数え忘れた誤りである。また $\Sigma$ が単に連続なだけでは、拡散模型の強解の存在は自動ではない。例えば $g,\Sigma$ が大域Lipschitz・線形成長を満たすときは[STO9の存在一意性定理](../../../解析系/STO/STO9/index.md#thm-sto9-global-existence-uniqueness)が使える。本章の二次模型では係数が定数なのでこの問題は起きない。

## 3. 一歩で何が一致するか

平均と共分散が等しいだけで、二つの確率法則全体が同一とは限らない。まず確率変数の関数 $\varphi$ の期待値を比較する。これは各軌道を同じ乱数で近づける**経路ごとの比較**とは異なる。

三階まで連続微分可能な関数 $\varphi:\mathbb R^d\to\mathbb R$ の三階微分を三重線形形式 $D^3\varphi$ と書く。$M_3=\sup_x\|D^3\varphi(x)\|_{\mathrm{op}}<\infty$ は、全ての単位ベクトル三つを代入した絶対値を上から抑える定数である。

<a id="thm-slt2-15-weak-step"></a>

<!-- formal-statement-start -->
> **定理（Gaussian一歩近似の二次モーメント一致と弱誤差）**
> $f_i:\mathbb R^d\to\mathbb R$ が微分可能、復元抽出バッチが履歴と独立、$b\ge1,\eta>0$ とする。履歴を固定した点 $w=w_k$ で、SGD増分を $D=-\eta G_b(w)$、Gaussian増分を $\widetilde D=-\eta g(w)+(\eta/\sqrt b)\Sigma(w)Z$（$Z\sim N_d(0,I_d)$）とする。このとき

$$
E[D]=E[\widetilde D]=-\eta g(w),
\quad
\operatorname{Cov}(D)=\operatorname{Cov}(\widetilde D)
=\frac{\eta^2}{b}\Gamma(w),
$$

$$
E[DD^{\mathsf T}]
=E[\widetilde D\widetilde D^{\mathsf T}]
=\eta^2\left(g(w)g(w)^{\mathsf T}+\frac{\Gamma(w)}b\right).
$$

> さらに $\varphi\in C^3(\mathbb R^d)$ で $\sup_x\|D^3\varphi(x)\|_{\mathrm{op}}\le M_3$ とすると、

$$
\left|E[\varphi(w+D)]-E[\varphi(w+\widetilde D)]\right|
\le\frac{M_3\eta^3}{6}
\left(E\|G_b(w)\|_2^3+
E\left\|g(w)-\frac{\Sigma(w)Z}{\sqrt b}\right\|_2^3\right).
$$

> 右辺は固定した $w$ で有限である。これは**一歩の条件付き比較**であり、全時間区間での弱収束や経路一致を単独では主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

平均・二次モーメントは前節で分かった。二階Taylor多項式の期待値は二つの更新で一致するので、差はそれぞれの三階剰余だけになる。

<!-- proof-start -->
### 証明

[復元ミニバッチの条件付き共分散行列](#prop-slt2-15-minibatch-covariance)から $E G_b=g$、$\operatorname{Cov}(G_b)=\Gamma/b$。したがって $E D=-\eta g$ で、その中心化した転置積行列の期待値は $\eta^2\Gamma/b$。Gaussian側でも $EZ=0$、$EZZ^{\mathsf T}=I_d$ より同じ値である。任意のベクトル $U$ に

$$
E[UU^{\mathsf T}]
=\operatorname{Cov}(U)+(EU)(EU)^{\mathsf T}
$$

を適用すると、二次モーメントも一致する。

点 $w$ から方向 $u$ へ進む一変数関数 $q(t)=\varphi(w+tu)$（$0\le t\le1$）に、展開点0・評価点1・次数2のTaylor公式を適用する。連鎖律から $q'(0)=\nabla\varphi(w)^{\mathsf T}u$、$q''(0)=u^{\mathsf T}\nabla^2\varphi(w)u$、$|q'''(t)|\le M_3\|u\|^3$。よって

$$
\varphi(w+u)=\varphi(w)+\nabla\varphi(w)^{\mathsf T}u
+\frac12u^{\mathsf T}\nabla^2\varphi(w)u+R(u),
\quad |R(u)|\le\frac{M_3}{6}\|u\|^3.
$$

$u=D,\widetilde D$ を別々に代入し期待値を取ると、一次項は平均一致で、二次項は $E[u^{\mathsf T}Hu]=\operatorname{tr}(H E[uu^{\mathsf T}])$ の一致で消える。従って差の絶対値は $E|R(D)|+E|R(\widetilde D)|$ 以下。$\|D\|=\eta\|G_b\|$、$\|\widetilde D\|=\eta\|g-\Sigma Z/\sqrt b\|$ を代入して結論となる。固定点では有限個の勾配とGaussianの三次モーメントはいずれも有限である。$\square$
<!-- proof-end -->

この定理の右辺は点 $w$ に依存する。反復した $w_k$ 全域に共通の三次モーメント上界や正則性がないまま、「一歩 $O(\eta^3)$ だから $T/\eta$ 歩で $O(\eta^2)$」と足してはいけない。比較する二つの過程の**入力分布自体が途中から異なる**ため、そのずれを制御する安定性も必要である。

形式的な拡散模型の生成作用素を $L_\eta$ と記すなら、[多次元Itô公式](../../../解析系/STO/STO7/index.md#thm-sto7-multidimensional-ito)で、十分滑らかな $\varphi$ について

$$
L_\eta\varphi(w)
=-g(w)\cdot\nabla\varphi(w)
+\frac{\eta}{2b}\operatorname{tr}\!\left(\Gamma(w)\nabla^2\varphi(w)\right).
$$

**拡散項は $\eta/b$ に比例する。** $b$ を固定して $\eta\to0$ とすれば、少なくとも係数レベルでは決定論的な勾配流へ近づく。一方、有限歩幅での雑音は残る。

## 4. 二次模型で厳密に比べる

雑音が位置に依存しない模型なら、全時刻の分散を手計算できる。[ML1-10の二標本二次模型](../../ML/ML1-10/index.md#thm-ml1-10-exact-quadratic)を、標本中心 $a\in\mathbb R$、半幅 $c>0$ に平行移動・拡大する。損失を

$$
f_1(w)=\tfrac12(w-a-c)^2,\quad
f_2(w)=\tfrac12(w-a+c)^2
$$

とする。$g(w)=w-a$、中心化勾配は $-c,+c$、$\Gamma(w)=c^2$ で一定である。平均 $a$ は最適点であり、$0<\eta<2$ なら離散反復の係数 $1-\eta$ の絶対値は1未満になる。

<a id="thm-slt2-15-quadratic-diffusion"></a>

<!-- formal-statement-start -->
> **定理（二標本二次模型の離散分散と拡散分散）**
> 上の二標本模型で $w_0\in\mathbb R$ を決定的に固定し、復元バッチサイズ $b\ge1$、歩幅 $0<\eta<2$ とする。各反復の抽出は履歴と独立とする。SGDの平均と分散は

$$
E[w_k]=a+(1-\eta)^k(w_0-a),
$$

$$
\operatorname{Var}(w_k)
=\frac{\eta c^2}{b(2-\eta)}
\left(1-(1-\eta)^{2k}\right)
$$

> である。一方、拡散模型

$$
dW_t=-(W_t-a)\,dt
+\sqrt{\frac{\eta c^2}{b}}\,dB_t,\qquad W_0=w_0
$$

> の平均と分散は

$$
E[W_t]=a+e^{-t}(w_0-a),\quad
\operatorname{Var}(W_t)
=\frac{\eta c^2}{2b}(1-e^{-2t}).
$$

> よって離散・連続の定常分散はそれぞれ $\eta c^2/[b(2-\eta)]$、$\eta c^2/(2b)$ となる。固定 $\eta$ では一般に等しくない。
<!-- formal-statement-end -->

### 証明の見取り図

離散反復は平均零の独立雑音が加わる一次漸化式である。連続模型は指数関数を積分因子として解き、[Itô等長性の $L^2$ 拡張](../../../解析系/STO/STO6/index.md#thm-sto6-l2-construction)で分散を積分する。

<!-- proof-start -->
### 証明

ミニバッチで抽出した標本中心の平均を $\overline A_k$ と書くと $E[\overline A_k\mid\mathcal H_k]=a$、$\operatorname{Var}(\overline A_k\mid\mathcal H_k)=c^2/b$。更新は

$$
w_{k+1}-a=(1-\eta)(w_k-a)+\eta(\overline A_k-a).
$$

条件付き平均が零なので交差項が消え、$v_k=\operatorname{Var}(w_k)$ について

$$
v_{k+1}=(1-\eta)^2v_k+\frac{\eta^2c^2}{b},
\qquad v_0=0.
$$

$v_k=(\eta^2c^2/b)\sum_{j=0}^{k-1}(1-\eta)^{2j}$。等比和の分母は $1-(1-\eta)^2=\eta(2-\eta)>0$ だから離散分散の式を得る。平均も同じ漸化式から従う。

連続模型について積分因子 $e^t$ を用い、[時間依存Itô公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)を $e^t(W_t-a)$ に適用すると

$$
W_t-a=e^{-t}(w_0-a)
+\sqrt{\frac{\eta c^2}{b}}\int_0^t e^{-(t-s)}\,dB_s.
$$

確率積分の平均は零で、[Itô等長性の $L^2$ 拡張](../../../解析系/STO/STO6/index.md#thm-sto6-l2-construction)を被積分関数 $e^{-(t-s)}$ に適用すれば

$$
\begin{aligned}
\operatorname{Var}(W_t)
&=\frac{\eta c^2}{b}\int_0^t e^{-2(t-s)}\,ds\\
&=\frac{\eta c^2}{b}\left[\frac{1-e^{-2t}}2\right].
\end{aligned}
$$

$k\to\infty$ と $t\to\infty$ で指数項が消えるため、定常分散も求まる。$\square$
<!-- proof-end -->

**同じ時刻の比較**。$t=k\eta$ とすれば $(1-\eta)^k$ と $e^{-k\eta}$ は小さい $\eta$ で近いが一致しない。さらにGaussian一歩近似を**同じ刻み $\eta$ で反復したEuler–Maruyama模型**なら、二次模型では離散SGDと平均・分散が各 $k$ で正確に一致する。それでも更新雑音の分布は違い得る。**連続SDEの厳密解**と**そのEuler–Maruyama離散化**も混同しない。

## 5. 共分散が等しくても法則は等しくない

最小の反例を計算する。$a=0,c=1,b=1,w_0=0$ の二標本模型では、SGDの初回更新は確率 $1/2$ ずつ $+\eta$ と $-\eta$ である。Gaussian一歩近似なら $N(0,\eta^2)$。どちらも平均0・分散 $\eta^2$ だが、

$$
E[w_1^4]=\eta^4,\qquad
E[(\widetilde w_1)^4]=3\eta^4.
$$

四次モーメントが違うので分布は等しくない。さらに $0<\eta\le1$ なら、$|w_0|\le1$ かつ抽出中心が $\pm1$ のSGDは

$$
|w_{k+1}|\le(1-\eta)|w_k|+\eta\le1
$$

となり常に $[-1,1]$ に留まる。一方、$c>0$ の連続Gaussian拡散模型は任意の $t>0$ に非退化な正規分布を持ち、$[-1,1]$ の外にも正の確率を持つ。**全時間の分布を同一視できない**ことが、分散の近さより強い形で分かる。

また「非復元バッチを一度作る」と「全epochをシャッフルして一つずつ消費する」は異なる。前者の分散公式を後者の条件付き雑音へ流用できない。

<a id="prop-slt2-15-shuffle-bias"></a>

<!-- formal-statement-start -->
> **命題（二標本シャッフルの条件付き偏り）**
> $f_1(w)=(w-1)^2/2$、$f_2(w)=(w+1)^2/2$ とし、epochの先頭で $(1,2)$ と $(2,1)$ を各確率 $1/2$ で選び、その順に各標本を一度ずつ使用する。二回目の更新直前の履歴 $\mathcal H_1$ は初回の番号を含む。このとき

$$
E[G_1\mid\mathcal H_1]
=\begin{cases}
w_1+1&(I_0=1),\\
w_1-1&(I_0=2)
\end{cases}
\ne g(w_1)=w_1.
$$

> 従って復元抽出の条件付き不偏性・共分散公式を二回目の更新へ適用できない。
<!-- formal-statement-end -->

### 証明の見取り図

一度選ばれた番号は残りから消える。二回目の番号を履歴で条件付けると、もはや一様な二択ではなく確定値になる。

<!-- proof-start -->
### 証明

$g_1(w)=w-1$、$g_2(w)=w+1$、$g(w)=w$ である。初回に $I_0=1$ なら二回目の番号は必ず2、したがって $E[G_1\mid\mathcal H_1]=g_2(w_1)=w_1+1$。逆に $I_0=2$ なら二回目は1であり、条件付き平均は $w_1-1$。いずれも全勾配 $w_1$ と異なる。$\square$
<!-- proof-end -->

実際の学習器に拡散近似を使うときは、次の境界を確認する必要がある。

- **有限歩幅**：Taylor一歩比較は有限歩幅で法則が一致する主張ではない。特に大きい $\eta$ や長時間の定常分布は別検証が要る。
- **非Gaussian雑音**：ミニバッチの大きさを増やしたときの正規近似には、独立性・モーメント・高次元性に応じた定量的評価が別に要る。二次モーメント一致だけでは足りない。
- **履歴依存・時変バッチ**：シャッフル、優先サンプリング、適応的な $b_k$、標本重みの変更は条件付き分布を変える。新しいドリフトと共分散をまず計算する必要がある。
- **状態依存係数**：$\Sigma(w)=\Gamma(w)^{1/2}$ のLipschitz性は $\Gamma$ の滑らかさだけからは一般に従わない。SDEの存在・一意性、数値法の収束、全時間の確率法則は別々に証明する。
- **汎化との区別**：ここでの $F$ は固定訓練集合の目的関数である。小さい拡散分散を、未知のテスト分布での小さい超過リスクやflat minimaの保証と読んではならない。

## 演習

### SLT2-15-A01 共分散の方向
- Level: A
- 目安時間: 12分

固定点で $d=2,n=2$、中心化勾配が $h_1=(2,-1)^{\mathsf T},h_2=(-2,1)^{\mathsf T}$ である。$\Gamma$ を求め、任意の $u$ について正半定値性を確認せよ。

<!-- solution-start -->
#### 詳細解答

$h_ih_i^{\mathsf T}$ は両標本で等しく、

$$
h_1h_1^{\mathsf T}=h_2h_2^{\mathsf T}
=\begin{pmatrix}4&-2\\-2&1\end{pmatrix}.
$$

したがって $\Gamma$ はこの行列そのものである。$u=(u_1,u_2)^{\mathsf T}$ とすれば

$$
u^{\mathsf T}\Gamma u
=4u_1^2-4u_1u_2+u_2^2=(2u_1-u_2)^2\ge0.
$$

$\operatorname{tr}\Gamma=5$、方向 $(1,2)^{\mathsf T}$ の雑音は零である。
<!-- solution-end -->

### SLT2-15-A02 ミニバッチの共分散
- Level: A
- 目安時間: 12分

A01の勾配を $b=4$ の独立な復元抽出で平均する。勾配誤差の共分散行列と二乗ノルム期待値を求めよ。

<!-- solution-start -->
#### 詳細解答

[共分散命題](#prop-slt2-15-minibatch-covariance)の独立・一様復元抽出条件を満たすので

$$
\operatorname{Cov}(G_4-g)
=\frac14\begin{pmatrix}4&-2\\-2&1\end{pmatrix}
=\begin{pmatrix}1&-1/2\\-1/2&1/4\end{pmatrix}.
$$

条件付き平均は零だから、二乗ノルム期待値はこの行列の対角和で $1+1/4=5/4$ となる。
<!-- solution-end -->

### SLT2-15-A03 歩幅と雑音係数
- Level: A
- 目安時間: 10分

$d=1$、$\Gamma(w)=9$、$\eta=1/10$、$b=3$ とする。Gaussian一歩更新の雑音標準偏差と、対応SDEの拡散係数を求め、$\eta$ 時間で共分散が一致することを示せ。

<!-- solution-start -->
#### 詳細解答

[Gaussian一歩近似](#def-slt2-15-gaussian-proxy)で $\Sigma=3$ を取ると、雑音標準偏差と分散は

$$
\frac{\eta\Sigma}{\sqrt b}
=\frac3{10\sqrt3}=\frac{\sqrt3}{10},
\qquad
\frac{\eta^2\Gamma}{b}=\frac3{100}.
$$

一方、SDEの拡散係数は $\sqrt{\eta/b}\Sigma=3/\sqrt{30}$。ブラウン増分の分散は $\eta=1/10$ だから、Euler–Maruyama一歩の雑音分散は

$$
\left(\frac3{\sqrt{30}}\right)^2\frac1{10}
=\frac{9}{300}=\frac3{100}.
$$

一歩の係数とSDE係数を同じ数値にしない点が重要である。
<!-- solution-end -->

### SLT2-15-A04 二点分布と正規分布
- Level: A
- 目安時間: 10分

$X$ は等確率で $-\eta,+\eta$、$Y\sim N(0,\eta^2)$ とする。平均・分散・四次モーメントを比較し、同じ法則でないことを示せ。

<!-- solution-start -->
#### 詳細解答

二点分布の対称性から

$$
EX=0,\qquad EX^2=\eta^2,\qquad EX^4=\eta^4.
$$

$Y=\eta Z$（$Z\sim N(0,1)$）と書く。標準正規密度 $\phi(z)$ は $\phi'(z)=-z\phi(z)$ を満たすので、部分積分と境界項 $z^3\phi(z)\to0$ より

$$
E[Z^4]=\int_{\mathbb R}z^4\phi(z)\,dz
=3\int_{\mathbb R}z^2\phi(z)\,dz=3.
$$

したがって

$$
EY=0,\qquad EY^2=\eta^2,\qquad EY^4=3\eta^4.
$$

$\eta>0$ では四次モーメントが異なるため、分布は同じでない。二次モーメントの一致はGaussian性を意味しない。
<!-- solution-end -->

### SLT2-15-A05 OU模型の定常分散
- Level: A
- 目安時間: 12分

$dW_t=-2(W_t-a)\,dt+\sigma\,dB_t$、$W_0=a$ とする。積分因子で $W_t-a$ を表示し、分散とその極限を求めよ。

<!-- solution-start -->
#### 詳細解答

[時間依存Itô公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)を $e^{2t}(W_t-a)$ に適用すると、$dt$ 項の $2e^{2t}(W_t-a)$ と $-2e^{2t}(W_t-a)$ が相殺され、

$$
d[e^{2t}(W_t-a)]=\sigma e^{2t}\,dB_t.
$$

初期値は零だから

$$
W_t-a=\sigma\int_0^t e^{-2(t-s)}dB_s.
$$

[Itô等長性の $L^2$ 拡張](../../../解析系/STO/STO6/index.md#thm-sto6-l2-construction)で

$$
\operatorname{Var}(W_t)
=\sigma^2\int_0^t e^{-4(t-s)}ds
=\frac{\sigma^2}{4}(1-e^{-4t})
\longrightarrow\frac{\sigma^2}{4}.
$$
<!-- solution-end -->

### SLT2-15-B01 行列版の非復元補正
- Level: B
- 目安時間: 20分

$n\ge2$ の中心化勾配 $h_i$ が $\sum_i h_i=0$ を満たす。一回の非復元バッチで異なる抽出位置 $j\ne l$ の $H_jH_l^{\mathsf T}$ の期待値が $-\Gamma/(n-1)$ となることを示し、サイズ $b$ の平均の共分散を導け。

<!-- solution-start -->
#### 詳細解答

相異なる添字の順序対は $n(n-1)$ 個で等確率。有限和を展開すると

$$
\sum_{i\ne r}h_ih_r^{\mathsf T}
=\left(\sum_i h_i\right)\left(\sum_rh_r\right)^{\mathsf T}
-\sum_i h_ih_i^{\mathsf T}
=-n\Gamma.
$$

従って異なる位置の $H_jH_l^{\mathsf T}$ の期待値は $-n\Gamma/[n(n-1)]=-\Gamma/(n-1)$。平均の共分散の二重和には対角 $b$ 項と非対角 $b(b-1)$ 項があるので

$$
\operatorname{Cov}(\widetilde G_b)
=\frac1{b^2}\left(b\Gamma-\frac{b(b-1)}{n-1}\Gamma\right)
=\frac{n-b}{b(n-1)}\Gamma.
$$

$b=n$ では零となり、全標本の平均が確定することと一致する。
<!-- solution-end -->

### SLT2-15-B02 二次模型の時間スケール
- Level: B
- 目安時間: 20分

二標本二次模型で $a=0,c=1,b=1,w_0=1$ とする。$\eta=1/2$、$k=2$ のSGDの平均・分散を求め、時刻 $t=k\eta=1$ の連続拡散模型と比較せよ。

<!-- solution-start -->
#### 詳細解答

[二次比較定理](#thm-slt2-15-quadratic-diffusion)へ $\eta=1/2,k=2$ を代入する。平均は $(1-1/2)^2=1/4$、分散は

$$
\frac{1/2}{2-1/2}
\left(1-(1/2)^4\right)
=\frac13\cdot\frac{15}{16}=\frac5{16}.
$$

連続模型では平均 $e^{-1}$、分散 $\frac14(1-e^{-2})$。すなわち約 $0.3679,0.2162$ であり、離散の $0.25,0.3125$ とは違う。Euler–Maruyama離散化なら平均・分散はSGD側に一致するが、Gaussian一歩という分布差は残る。
<!-- solution-end -->

### SLT2-15-B03 三階剰余が消えない理由
- Level: B
- 目安時間: 22分

$\varphi(x)=\sin x$ とし、固定した $w$ のSGD増分 $D$ とGaussian増分 $\widetilde D$ が一次・二次モーメントを共有するとする。Taylorの次数2までの期待値が一致する理由と、三階剰余に必要なモーメントを説明せよ。

<!-- solution-start -->
#### 詳細解答

$\sin(w+u)$ の点 $w$ におけるTaylor多項式は

$$
\sin w+(\cos w)u-\frac12(\sin w)u^2.
$$

二つの増分で $ED=E\widetilde D$、$ED^2=E\widetilde D^2$ なので三項の期待値は一致する。三階導関数は $-\cos x$ で絶対値1以下だから剰余は $|R(u)|\le |u|^3/6$。従って

$$
|E\sin(w+D)-E\sin(w+\widetilde D)|
\le\frac16(E|D|^3+E|\widetilde D|^3).
$$

三次絶対モーメントが大きい場合、この上界だけから小誤差は結論できない。また各反復での全域一様上界を示していないため、そのまま長時間へ足し合わせられない。
<!-- solution-end -->

### SLT2-15-B04 シャッフル時の情報
- Level: B
- 目安時間: 18分

二標本の勾配 $g_1(w)=w-1,g_2(w)=w+1$ を順番を無作為にして一度ずつ使う。最初の番号が1だったとき、二回目の勾配雑音 $\xi_1=g(w_1)-G_1$ の条件付き平均・分散を計算し、復元抽出と比べよ。

<!-- solution-start -->
#### 詳細解答

最初の番号が1なら二回目は確定的に2で、$G_1=w_1+1$。$g(w_1)=w_1$ だから

$$
E[\xi_1\mid\mathcal H_1]=-1,\qquad
\operatorname{Var}(\xi_1\mid\mathcal H_1)=0.
$$

独立な復元抽出なら $\xi_1=\pm1$ はそれぞれ確率 $1/2$、平均0・分散1である。「一様に順序を選んだ」という無条件の性質は、残り番号を履歴で条件付けた後には成り立たない。
<!-- solution-end -->

### SLT2-15-C01 拡散近似の四つの意味を分離する
- Level: C
- 目安時間: 35分

$f_1(w)=(w-1)^2/2,f_2(w)=(w+1)^2/2$、$w_0=0$、$b=1$、$0<\eta<1$ とする。

1. 一回更新の平均と分散はGaussian一歩近似に一致することを示せ。
2. それでも四次モーメントと値域が一致しないことを示せ。
3. 連続拡散模型の定常分散と離散SGDの定常分散の比を求めよ。
4. 最初のepochで非復元シャッフルを使うと、第2回更新のどの仮定が壊れるかを式で示せ。

<!-- solution-start -->
#### 詳細解答

**1.** 標本勾配は $w-1,w+1$、全勾配は $w$、$\Gamma=1$。初回SGD更新は $w_1=\pm\eta$ 各確率 $1/2$。よって $Ew_1=0$、$\operatorname{Var}(w_1)=\eta^2$。Gaussian一歩近似は $\widetilde w_1=\eta Z$（$Z\sim N(0,1)$）なので同じ平均・分散である。

**2.** $Ew_1^4=\eta^4$、$E\widetilde w_1^4=3\eta^4$ で同一分布ではない。さらに $w_{k+1}=(1-\eta)w_k+\eta A_k$、$A_k\in\{-1,1\}$ から、$|w_0|\le1$ と $0<\eta<1$ により帰納的に全 $k$ で $|w_k|\le1$。連続模型の $t>0$ の正規分布は正の分散を持ち、$[-1,1]$ の外の確率が正である。

**3.** [二次模型の比較定理](#thm-slt2-15-quadratic-diffusion)に $a=0,c=b=1$ を代入すると、離散の定常分散は $\eta/(2-\eta)$、連続の定常分散は $\eta/2$。従って「離散÷連続」は

$$
\frac{\eta/(2-\eta)}{\eta/2}=\frac2{2-\eta}>1.
$$

$\eta\to0$ で比は1へ近づくが、固定歩幅では異なる。

**4.** 初回番号が1なら二回目は2と確定し、$E[G_1\mid\mathcal H_1]=w_1+1$。初回番号が2なら $w_1-1$。いずれも全勾配 $g(w_1)=w_1$ とは違う。よって[復元ミニバッチ共分散命題](#prop-slt2-15-minibatch-covariance)で必要な「履歴と独立な一様復元抽出」が破れ、同じGaussian代理を第2回へ適用する根拠がなくなる。$\square$
<!-- solution-end -->

以上の区別を使えば、SGDの「揺れ」を拡散として可視化できる場面と、近似をそのまま深層学習全般の汎化や最適化へ持ち込めない場面を、同じ数式から判定できる。
