# SLT2-10 無限幅NTKの条件

[前章の固定接線勾配流](../SLT2-09/index.md#thm-slt2-09-continuous-spectrum)では、Gram行列が変わらないなら残差が行列指数で減衰することを証明した。しかし実際のニューラルネットでは、[接線Gram行列](../SLT2-08/index.md#def-slt2-08-ntk)はパラメータに依存する。幅を増やすと、この「動く核」を固定した核で置き換えられるのだろうか。

答えは条件付きで「はい」である。本章では、**固定した有限個の訓練入力・二層網・独立初期化・全パラメータの勾配流・固定した有限時間**という範囲で、初期核の集中と学習中の核変動を別々に証明する。極限が正定値であること、訓練誤差が無限時間で零になること、標本外の汎化が良いことは、それぞれ別問題である。

到達目標は次の五つである。

1. 幅のスケーリング、初期化、入力、時間、学習則の仮定を区別できる。
2. 初期NTKの極限と有限幅での確率的な誤差を導ける。
3. 学習中の各ニューロンの移動量から、有限時間の核変動界を証明できる。
4. 動く網の予測を同じ初期出力の固定核予測と比較できる。
5. 特異な核、誤ったスケーリング、増大する時間・入力数で何が未保証か説明できる。

## 1. どの幅極限を考えるか

入力 $x_1,\ldots,x_n\in\mathbb R^d$、教師 $y\in\mathbb R^n$ を**幅 $m$ に依存させず**固定する。バイアスを重みとまとめて

$$
\xi_i=\begin{pmatrix}x_i\\1\end{pmatrix}\in\mathbb R^{d+1},
\quad q_r=\begin{pmatrix}w_r\\b_r\end{pmatrix}\in\mathbb R^{d+1},
\quad R=\max_{1\le i\le n}\|\xi_i\|_2
$$

と書く。この表示により、内積 $\xi_i^{\mathsf T}\xi_j=x_i^{\mathsf T}x_j+1$ が自然に現れる。[前々章の二層網のJacobian](../SLT2-08/index.md#thm-slt2-08-parameter-jacobian)と同じく、出力係数 $a_r$ と隠れ重み・バイアス $q_r$ の**両方を学習**する。ここでの幅依存の係数は $1/\sqrt m$ であり、$1/m$ とは別の模型になる。

$$
f_m(x;\theta)=\frac1{\sqrt m}\sum_{r=1}^m
a_r\sigma(q_r^{\mathsf T}\xi(x)),
\qquad \xi(x)=\begin{pmatrix}x\\1\end{pmatrix}.
$$

以下では、$\sigma\in C^2(\mathbb R)$ とし、幅に依存しない有限定数 $M_0,M_1,M_2\ge0$ が存在して、すべての $z\in\mathbb R$ で

$$
|\sigma(z)|\le M_0,\qquad
|\sigma'(z)|\le M_1,\qquad
|\sigma''(z)|\le M_2
$$

を満たすものとする。例えば $\sigma(z)=\tanh z$ はこの条件を満たす。一方、ReLUは零で二回微分可能でないため、この証明をそのまま適用できない（ReLUについて何も成立しないという意味ではない）。

初期化は、ニューロンごとの組 $(a_r(0),q_r(0))$ が $r$ に関して独立同分布で、$a_r(0)$ は $q_r(0)$ と独立、$\mathbb E a_r(0)=0$、$|a_r(0)|\le A$（ある有限定数 $A$）とする。$q_r(0)$ の分布そのものを有界にする必要はない。期待値は**この初期化乱数**に関するもので、訓練入力と教師は固定値である。

全パラメータ $\theta=((a_r,q_r))_{r=1}^m$ に対して損失 $L_m(\theta)=\|F_m(\theta)-y\|_2^2/2$ を最小化する連続時間のEuclid勾配流を使う。ここでも $1/n$ は付けない。$F_m=(f_m(x_i))_{i=1}^n$、$e_m=F_m-y$、$J_m=D_\theta F_m$ とすると、[ニューラルネットの予測方程式](../SLT2-08/index.md#thm-slt2-08-drift-update)と同じ連鎖律から

$$
\dot\theta=-J_m^{\mathsf T}e_m,\qquad
\dot e_m=-K_m(t)e_m,\qquad
K_m(t)=J_m(\theta(t))J_m(\theta(t))^{\mathsf T}.
$$

核の具体式も[二層網のNTK公式](../SLT2-08/index.md#thm-slt2-08-ntk-formula)へ $\xi_i$ を代入して得られる。

$$
\begin{aligned}
(K_m(t))_{ij}
&=\frac1m\sum_{r=1}^m h_{ij}(a_r(t),q_r(t)),\\
h_{ij}(a,q)
&=\sigma(q^{\mathsf T}\xi_i)\sigma(q^{\mathsf T}\xi_j)\\
&\quad+a^2\sigma'(q^{\mathsf T}\xi_i)
\sigma'(q^{\mathsf T}\xi_j)\xi_i^{\mathsf T}\xi_j.
\end{aligned}
$$

初期核はニューロンごとの**独立な行列の標本平均**である。この性質は訓練が始まると失われるので、初期集中と時間変動を区別する。

<a id="def-slt2-10-infinite-width-ntk"></a>

<!-- formal-statement-start -->
> **定義（有限入力の無限幅NTK極限）**  
> 固定整数 $d,n\ge1$、固定した入力 $x_1,\ldots,x_n\in\mathbb R^d$、上記の二層網の $1/\sqrt m$ パラメータ化、共通の初期化分布を考える。$h_{ij}$ は直前の具体式とし、初期化分布に従う一組 $(a,q)$ に関する期待値から、**有限入力の無限幅NTK**を

$$
(K_\infty)_{ij}=\mathbb E[h_{ij}(a,q)]
$$

> と定める。$K_\infty\in\mathbb R^{n\times n}$ は入力集合と初期化分布を固定すると決まる行列であり、幅 $m$、訓練時刻 $t$、初期化の実現値に依存しない。これは初期核の極限候補を定めるもので、学習中の核の収束を定義だけから主張しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt2-10-infinite-width-ntk -->
**定義の確認**。$d=1$、入力 $x_1=0,x_2=1$、$\sigma=\tanh$、すべての $q_r(0)=0$、各 $a_r(0)$ は独立に $1,-1$ を確率 $1/2$ で取るものとする。$\tanh0=0$、$\tanh'(0)=1$、$a_r(0)^2=1$ なので、各ニューロンの項は $h_{ij}=\xi_i^{\mathsf T}\xi_j$ となる。$\xi_1=(0,1)^{\mathsf T}$、$\xi_2=(1,1)^{\mathsf T}$ から

$$
K_\infty=
\begin{pmatrix}1&1\\1&2\end{pmatrix},\qquad
K_m(0)=K_\infty\quad(m\ge1).
$$

任意の $c=(c_1,c_2)^{\mathsf T}$ について $c^{\mathsf T}K_\infty c=(c_1+c_2)^2+c_2^2$ だから正半定値であり、$c\ne0$ では正である。定義の期待値・Gram行列・正定値性まで検算できた。ただし初期値で一致しても、学習中の $q_r,a_r$ は動くので $K_m(t)=K_\infty$ がすべての $t$ で成立するわけではない。
<!-- definition-example-end -->

## 2. 初期NTKはどの意味で収束するか

一つの入力対 $(i,j)$ では標本平均の分散が幅の逆数になる。これを $n^2$ 個の成分に足し、行列の作用素ノルムへ移す。行列の大きさについて、$\|B\|_{\mathrm{op}}\le\|B\|_{\mathrm F}$（Frobeniusノルム）を用いるが、これは任意の単位ベクトル $v$ で Cauchy–Schwarz により $\|Bv\|_2^2\le\sum_{i,j}B_{ij}^2$ と分かる。

<a id="thm-slt2-10-initial-concentration"></a>

<!-- formal-statement-start -->
> **定理（二層網の初期NTKの有限入力集中）**  
> 第1節のすべての仮定を満たし、$H=M_0^2+A^2M_1^2R^2$ と置く。$K_m(0)$ と $K_\infty$ に対し

$$
\mathbb E\|K_m(0)-K_\infty\|_{\mathrm F}^2
\le\frac{n^2H^2}{m}.
$$

> 従って任意の $\delta>0$ に対し、初期化乱数について

$$
\mathbb P\bigl(\|K_m(0)-K_\infty\|_{\mathrm{op}}>\delta\bigr)
\le\frac{n^2H^2}{m\delta^2}.
$$

> 特に **固定した $n$ と入力集合**について $K_m(0)\to K_\infty$ が作用素ノルムで確率収束する。$K_\infty$ は対称正半定値だが、一般に正定値とは限らない。
<!-- formal-statement-end -->

### 証明の見取り図

各 $h_{ij}$ の絶対値を $H$ で抑え、独立平均の分散を計算する。全成分の二乗和を取れば、各成分の収束から行列の収束へ進める。正半定値性は期待値を取った後にも保たれる。

<!-- proof-start -->
### 証明

$|\xi_i^{\mathsf T}\xi_j|\le R^2$ と初期 $|a|\le A$ により、

$$
|h_{ij}(a,q)|\le M_0^2+A^2M_1^2R^2=H.
$$

$Z_{r,ij}=h_{ij}(a_r(0),q_r(0))$ と書く。$r$ が異なれば独立かつ同分布で、平均は $(K_\infty)_{ij}$ である。平均からの差の二乗を展開すると、異なる $r,s$ の交差項は独立性と平均零から消え、

$$
\begin{aligned}
\mathbb E\left|(K_m(0))_{ij}-(K_\infty)_{ij}\right|^2
&=\frac1{m^2}\sum_{r=1}^m\operatorname{Var}(Z_{r,ij})\\
&=\frac{\operatorname{Var}(Z_{1,ij})}{m}
\le\frac{\mathbb EZ_{1,ij}^2}{m}
\le\frac{H^2}{m}.
\end{aligned}
$$

$i,j=1,\ldots,n$ の和を取ると

$$
\mathbb E\|K_m(0)-K_\infty\|_{\mathrm F}^2
=\sum_{i,j}\mathbb E|(K_m(0)-K_\infty)_{ij}|^2
\le\frac{n^2H^2}{m}.
$$

非負変数 $Z=\|K_m(0)-K_\infty\|_{\mathrm F}^2$ に対し $\mathbf1_{\{Z>\delta^2\}}\le Z/\delta^2$ だから、期待値を取れば確率界を得る。作用素ノルムの事象はFrobeniusノルムの事象に含まれるので同じ上界が成立する。

各初期 $K_m(0)=J_mJ_m^{\mathsf T}$ が対称正半定値だから、任意の $c$ について $c^{\mathsf T}K_\infty c=\mathbb E[c^{\mathsf T}K_m(0)c]\ge0$。従って $K_\infty$ も対称正半定値である。$\square$
<!-- proof-end -->

### 初期出力は定数へ収束するとは限らない

固定核の比較で使う初期残差は、幅に伴って有界な確率的規模を保つ必要がある。初期化で $a_r$ と $q_r$ が独立かつ $\mathbb E a_r=0$ なので、各訓練点で交差項が消え、

$$
\mathbb E f_m(x_i;\theta(0))=0,\qquad
\mathbb E f_m(x_i;\theta(0))^2
=\mathbb E\bigl[a^2\sigma(q^{\mathsf T}\xi_i)^2\bigr]
\le A^2M_0^2.
$$

従って $Q=nA^2M_0^2+\|y\|_2^2$ とすると

$$
\mathbb E\|e_m(0)\|_2^2\le Q,\qquad
\mathbb P(\|e_m(0)\|_2>B)\le Q/B^2\quad(B>0).
$$

これは幅に一様な初期残差の確率界である。**初期出力が零へ確率収束するという主張ではない。** 固定核比較は、毎回の幅 $m$ で得られたランダムな $e_m(0)$ をそのまま使う。

## 3. 学習中の核がほとんど動かない理由

初期核が収束しても、訓練後の核はニューロン同士が残差を介して依存するため、第2節の独立平均の議論は再利用できない。代わりに、残差の大きさが増えないことを使って**各ニューロンの移動量**を抑える。

勾配流の $r$ 番目の成分を実際に微分すると

$$
\begin{aligned}
\dot a_r(t)&=-\frac1{\sqrt m}\sum_{i=1}^n
e_{m,i}(t)\sigma(q_r(t)^{\mathsf T}\xi_i),\\
\dot q_r(t)&=-\frac{a_r(t)}{\sqrt m}\sum_{i=1}^n
e_{m,i}(t)\sigma'(q_r(t)^{\mathsf T}\xi_i)\xi_i.
\end{aligned}
$$

ここで出力全体の移動量と、個々のニューロンの移動量を混同しない。一つのニューロンは $m^{-1/2}$ の速さで動くが、$m$ 個の和で表す出力は有限の速度で変わり得る。

<a id="thm-slt2-10-finite-time-drift"></a>

<!-- formal-statement-start -->
> **定理（二層網の有限時間核固定界）**  
> 第1節の滑らかさ・有界性と $|a_r(0)|\le A$ を仮定し、初期化の一つの実現値を固定する。$T>0$、$\|e_m(0)\|_2\le B$（$B\ge0$）とする。勾配流は区間 $[0,T]$ に存在し、次の幅に依存しない定数を置けば、すべての $r$、$0\le t\le T$ で移動量が抑えられる。

$$
\begin{aligned}
V_a&=T\sqrt n\,M_0B,\qquad A_T=A+V_a,\\
V_q&=T\sqrt n\,A_TM_1RB,\\
|a_r(t)-a_r(0)|&\le V_a/\sqrt m,\qquad
\|q_r(t)-q_r(0)\|_2\le V_q/\sqrt m.
\end{aligned}
$$

> さらに

$$
C_{K,T}
=n\left[
\left(2M_0M_1R+2A_T^2M_1M_2R^3\right)V_q
+2A_TM_1^2R^2V_a
\right]
$$

> と置くと、次の**有限時間で一様な**核変動界が成り立つ。

$$
\sup_{0\le t\le T}\|K_m(t)-K_m(0)\|_{\mathrm{op}}
\le\frac{C_{K,T}}{\sqrt m}.
$$

> 定数は $T,B,n,R,A,M_0,M_1,M_2$ に依存するが、幅 $m$ に依存しない。$T$ を幅とともに無制限に増やす主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

$K_m(t)$ の正半定値性から残差のノルムが減少する。これを各ニューロンの勾配に代入し、積分して移動量を得る。次に核の各成分の二つの積を差分展開し、$\sigma'$ の変化を $M_2$ で評価する。

<!-- proof-start -->
### 証明

[接線Gram行列の正半定値性](../SLT2-08/index.md#thm-slt2-08-ntk-formula)と連鎖律による残差方程式から

$$
\frac{d}{dt}\frac12\|e_m(t)\|_2^2
=-e_m(t)^{\mathsf T}K_m(t)e_m(t)\le0.
$$

従って解の存在区間では $\|e_m(t)\|_2\le B$。Cauchy–Schwarz を $n$ 項の和へ使うと

$$
\begin{aligned}
|\dot a_r(t)|
&\le\frac{\|e_m(t)\|_2}{\sqrt m}
\left(\sum_i|\sigma(q_r^{\mathsf T}\xi_i)|^2\right)^{1/2}
\le\frac{\sqrt n M_0B}{\sqrt m},\\
\|\dot q_r(t)\|_2
&\le\frac{|a_r(t)|}{\sqrt m}\sum_i|e_{m,i}(t)|M_1R
\le\frac{\sqrt n\,|a_r(t)|M_1RB}{\sqrt m}.
\end{aligned}
$$

初めの式を $0$ から $t\le T$ まで積分して $|a_r(t)-a_r(0)|\le V_a/\sqrt m$、従って $m\ge1$ で $|a_r(t)|\le A_T$ を得る。これを第二式へ代入して積分すると $\|q_r(t)-q_r(0)\|_2\le V_q/\sqrt m$。

右辺は局所Lipschitzなベクトル場であり、上の評価は任意の有限 $T$ まで全パラメータの有限性を保証する。従って有限時間での発散はなく、局所解は $[0,T]$ まで延長できる。

核の変化を成分ごとに調べる。$z_i=q^{\mathsf T}\xi_i$、$\widetilde z_i=\widetilde q^{\mathsf T}\xi_i$ と置けば、平均値の定理から

$$
|\sigma(z_i)-\sigma(\widetilde z_i)|
\le M_1R\|q-\widetilde q\|_2,\qquad
|\sigma'(z_i)-\sigma'(\widetilde z_i)|
\le M_2R\|q-\widetilde q\|_2.
$$

二つの積の差を次のように分解し、それぞれに適用すると

$$
uv-\widetilde u\widetilde v
=(u-\widetilde u)v+\widetilde u(v-\widetilde v)
$$

$$
\begin{aligned}
|\sigma(z_i)\sigma(z_j)-\sigma(\widetilde z_i)\sigma(\widetilde z_j)|
&\le2M_0M_1R\|q-\widetilde q\|_2,\\
|\sigma'(z_i)\sigma'(z_j)-\sigma'(\widetilde z_i)\sigma'(\widetilde z_j)|
&\le2M_1M_2R\|q-\widetilde q\|_2.
\end{aligned}
$$

$|a|,|\widetilde a|\le A_T$ の場合は

$$
|a^2-\widetilde a^2|\le2A_T|a-\widetilde a|
$$

なので、核の一ニューロン項に対し

$$
\begin{aligned}
|h_{ij}(a,q)-h_{ij}(\widetilde a,\widetilde q)|
&\le\left(2M_0M_1R+2A_T^2M_1M_2R^3\right)
\|q-\widetilde q\|_2\\
&\quad+2A_TM_1^2R^2|a-\widetilde a|.
\end{aligned}
$$

$(a,q)=(a_r(t),q_r(t))$、$(\widetilde a,\widetilde q)=(a_r(0),q_r(0))$ として先ほどの移動界を代入し、$r$ の平均を取れば各 $|(K_m(t)-K_m(0))_{ij}|$ は $C_{K,T}/(n\sqrt m)$ 以下。$n\times n$ 行列のFrobeniusノルムは成分最大値の $n$ 倍以下、作用素ノルムはFrobeniusノルム以下なので主張が従う。すべての評価は $0\le t\le T$ に共通である。$\square$
<!-- proof-end -->

**重要な読み方**。これは、有限幅の核が厳密に一定になる定理ではない。$T$ と初期残差上界 $B$ を先に固定したときの $m^{-1/2}$ 界である。全パラメータを学習していても個々の移動を抑えられることが核心で、出力が小さいと仮定したわけでもない。

## 4. 「固定核で学べる」を予測の式にする

初期核の収束と時間中の移動界を合わせれば、三角不等式から学習中の $K_m(t)$ と決定論的な $K_\infty$ を比較できる。ただし初期出力は一般にランダムのままである。この点を[固定核と動く核の誤差評価](../SLT2-09/index.md#thm-slt2-09-kernel-drift-bound)に代入する。

<a id="thm-slt2-10-finite-time-flow"></a>

<!-- formal-statement-start -->
> **定理（無限幅NTKと有限時間の予測近似）**  
> 第1節の初期化・滑らかさ・有限入力・全パラメータ勾配流の仮定を満たす。$T>0$、$B>0$、$\delta>0$ を固定し、$Q=nA^2M_0^2+\|y\|_2^2$、$H=M_0^2+A^2M_1^2R^2$ とする。$C_{K,T}(B)$ は[二層網の有限時間核固定界](#thm-slt2-10-finite-time-drift)の定数とする。同じランダム初期残差を使った固定核曲線を

$$
e_{\infty,m}(t)=\exp(-tK_\infty)e_m(0)
$$

> と置く。このとき初期化に関して確率が少なくとも

$$
1-\frac{Q}{B^2}-\frac{n^2H^2}{m\delta^2}
$$

> の事象上で

$$
\sup_{0\le t\le T}
\|e_m(t)-e_{\infty,m}(t)\|_2
\le BT\left(\delta+\frac{C_{K,T}(B)}{\sqrt m}\right).
$$

> 従って固定 $n,T$ で差の上限は $m\to\infty$ において確率収束で零へ向かう。$K_\infty$ の正定値性や $t\to\infty$ との極限交換は仮定・結論に含まない。
<!-- formal-statement-end -->

### 証明の見取り図

まず良い初期化の事象を二つ選ぶ。初期残差が $B$ 以下、初期核の誤差が $\delta$ 以下である。その事象では前の二つの定理を合わせて核変動を抑え、前章の積分による比較界を使う。

<!-- proof-start -->
### 証明

第2節の二乗モーメント評価と[初期NTK集中](#thm-slt2-10-initial-concentration)から、

$$
\begin{aligned}
\mathbb P(\|e_m(0)\|_2>B)&\le Q/B^2,\\
\mathbb P(\|K_m(0)-K_\infty\|_{\mathrm{op}}>\delta)
&\le n^2H^2/(m\delta^2).
\end{aligned}
$$

いずれも起こらない事象で、まず[二層網の有限時間核固定界](#thm-slt2-10-finite-time-drift)を適用する。これと初期核の誤差に三角不等式を使えば、全 $t\in[0,T]$ で

$$
\begin{aligned}
\|K_m(t)-K_\infty\|_{\mathrm{op}}
&\le\|K_m(t)-K_m(0)\|_{\mathrm{op}}
+\|K_m(0)-K_\infty\|_{\mathrm{op}}\\
&\le C_{K,T}(B)/\sqrt m+\delta.
\end{aligned}
$$

$K_m(t)$ と $K_\infty$ は連続（前者は時刻に関して）な対称正半定値核である。[前章の動く核と固定核の比較定理](../SLT2-09/index.md#thm-slt2-09-kernel-drift-bound)で、初期残差を両方とも $e_m(0)$ とし、比較の固定核を $K_\infty$ に選ぶ。得られる積分上界は

$$
\begin{aligned}
\|e_m(t)-e_{\infty,m}(t)\|_2
&\le\|e_m(0)\|_2\int_0^t
\|K_m(s)-K_\infty\|_{\mathrm{op}}\,ds\\
&\le Bt\left(\delta+C_{K,T}(B)/\sqrt m\right).
\end{aligned}
$$

二つの悪い事象の確率の和を引けば所定の事象確率を得る。最後に任意の目標誤差 $\varepsilon>0$ と失敗確率 $\eta>0$ を固定し、まず $Q/B^2<\eta/2$ となる $B$ を選ぶ。次に $BT\delta<\varepsilon/2$ となる $\delta$ を選び、最後に $m$ を十分大きくして $BT C_{K,T}(B)/\sqrt m<\varepsilon/2$ かつ $n^2H^2/(m\delta^2)<\eta/2$ とする。これで確率収束の定義を確認できる。$\square$
<!-- proof-end -->

### 最小例：極限核が対角になる

$d=1$、$x_1=-1,x_2=1$、$\sigma=\tanh$、$q_r(0)=0$、$a_r(0)=\pm1$ が独立等確率とする。$\xi_1=(-1,1)^{\mathsf T}$、$\xi_2=(1,1)^{\mathsf T}$ は直交するので、どの幅でも

$$
K_m(0)=K_\infty=2I_2,\qquad F_m(0)=0.
$$

$y=(1,-1)^{\mathsf T}$ なら初期残差は $(-1,1)^{\mathsf T}$。固定極限核では[スペクトル解](../SLT2-09/index.md#thm-slt2-09-continuous-spectrum)から

$$
e_{\infty,m}(t)=e^{-2t}
\begin{pmatrix}-1\\1\end{pmatrix},
\qquad
F_{\infty,m}(t)=
\begin{pmatrix}1-e^{-2t}\\-1+e^{-2t}\end{pmatrix}.
$$

学習する実網の $K_m(t)$ は一般に $2I_2$ と厳密一致しない。それでも $B=\sqrt2$ を決定論的に選べるため、有限時間の予測誤差が $O_T(m^{-1/2})$ に抑えられる。この例には初期核の標本誤差がなく、**学習中の核変動だけ**が残る。

## 5. どの仮定を外すと論理が切れるか

1. **正半定値は正定値と違う。** $\sigma\equiv1$ なら $\sigma'=0$ で、すべての入力対に対し $K_\infty$ の成分は1。異なる二入力でも $K_\infty=\begin{pmatrix}1&1\\1&1\end{pmatrix}$ は特異である。教師が異なる二点では、その差の方向の残差は消えない。[前章の零固有方向](../SLT2-09/index.md#thm-slt2-09-continuous-spectrum)を参照。
2. **$1/\sqrt m$ と $1/m$ は同じ核を与えない。** 出力を $m^{-1}\sum_ra_r\sigma(q_r^{\mathsf T}\xi)$ とし、パラメータに対するEuclid計量をそのままにすると、各勾配の大きさは $1/m$ で、接線核は $m^{-2}\sum_rh_{ij}=O(m^{-1})$。時刻も学習則も変えないまま、上記の非自明な $K_\infty$ を使えない。
3. **ニューロン間の独立性は初期集中で使った。** 例えば $\sigma\equiv1$、全ニューロンの出力係数を一つの共通符号 $a=\pm1$ にすると、$f_m(x;0)=\sqrt m\,a$ となり、初期残差は有界な確率的規模を保たない。独立な符号なら同じ式の分散は1である。
4. **固定個数の入力は行列ノルム評価に使った。** 各成分が小さくても、行列の次元 $n=n(m)$ が増えると作用素ノルムが小さいとは限らない。定理の $n^2/m$ と定数 $C_{K,T}$ をそのまま無視できない。
5. **有限時間でしか抑えていない。** $V_a,V_q,C_{K,T}$ は時間 $T$ に依存する。$T$ を幅とともに増やす場合や $t\to\infty$ を先に取る場合、今回の評価だけでは核が固定と言えない。次章以降で、幅極限と時間極限の順序をさらに吟味する。
6. **学習則と活性化の正則性も条件である。** 有限ステップのSGD、正規化された別のパラメータ更新、ReLUの折点を含む模型、学習しない層を持つ模型には、その学習則・微分条件に合わせた別の証明が要る。

これらは本章の定理の適用範囲の境界であり、現実のあらゆる深層網でNTK近似が失敗するという断定でも、必ず成功するという宣言でもない。

## 演習

### SLT2-10-A01 極限Gram行列を直接作る
- Level: A
- 目安時間: 12分

$d=1$、$x_1=0,x_2=2$、$\sigma=\tanh$、$q_r(0)=0$、$a_r(0)=\pm1$ を独立等確率とする。$K_m(0)$ と $K_\infty$ を求め、正定値性を二次形式で確認せよ。

<!-- solution-start -->
#### 詳細解答

$\xi_1=(0,1)^{\mathsf T}$、$\xi_2=(2,1)^{\mathsf T}$。$\sigma(0)=0$、$\sigma'(0)=1$、$a_r^2=1$ なので、[NTKの具体式](../SLT2-08/index.md#thm-slt2-08-ntk-formula)の各加数は $\xi_i^{\mathsf T}\xi_j$。従って

$$
K_m(0)=K_\infty=
\begin{pmatrix}1&1\\1&5\end{pmatrix}.
$$

$c^{\mathsf T}K_\infty c=(c_1+c_2)^2+4c_2^2$ は $c\ne0$ なら正となる。初期化の実現に依存しないため、今回は有限幅でも初期核が極限と一致する。
<!-- solution-end -->

### SLT2-10-A02 幅スケーリングと接線核
- Level: A
- 目安時間: 10分

$\sigma\equiv1$ とし、$a_1,\ldots,a_m$ を学習する一入力の模型を考える。$f=m^{-1/2}\sum_ra_r$ と $\widetilde f=m^{-1}\sum_ra_r$ の接線核を、それぞれパラメータ $a_r$ に関する微分から求めよ。

<!-- solution-start -->
#### 詳細解答

各 $r$ で $\partial f/\partial a_r=1/\sqrt m$ だから、微分ベクトルの二乗ノルムは

$$
K=\sum_{r=1}^m\left(\frac1{\sqrt m}\right)^2=1.
$$

他方、$\partial\widetilde f/\partial a_r=1/m$ なので

$$
\widetilde K=\sum_{r=1}^m\left(\frac1m\right)^2=\frac1m.
$$

同じ活性化・同じ学習パラメータでも、規格化を変えると同じ学習時刻の接線核の極限は違う。
<!-- solution-end -->

### SLT2-10-A03 正半定値核と残差のエネルギー
- Level: A
- 目安時間: 10分

連続な $n\times n$ 対称正半定値行列 $K(t)$ と $\dot e=-K(t)e$ を考える。$\|e(t)\|_2$ が非増加であることを証明せよ。$K(t)$ が零行列でも主張は成立するか。

<!-- solution-start -->
#### 詳細解答

積の微分則から

$$
\frac{d}{dt}\frac12\|e(t)\|_2^2
=e(t)^{\mathsf T}\dot e(t)
=-e(t)^{\mathsf T}K(t)e(t)\le0.
$$

積分すれば $\|e(t)\|_2^2\le\|e(0)\|_2^2$。非負平方根を取ってノルムの非増加を得る。$K(t)=0$ の場合は $\dot e=0$ で、ノルムは一定である。「非増加」は必ず減ることを意味しない。
<!-- solution-end -->

### SLT2-10-A04 初期核の二乗平均から確率界へ
- Level: A
- 目安時間: 12分

$n=2,H=3$ の初期化模型を考える。[初期集中定理](#thm-slt2-10-initial-concentration)から、$\|K_m(0)-K_\infty\|_{\mathrm{op}}>1/2$ の確率の上界を求めよ。得た式が1を超えた場合の読み方も述べよ。

<!-- solution-start -->
#### 詳細解答

定理へ $n^2=4$、$H^2=9$、$\delta^2=1/4$ を代入すると

$$
\mathbb P(\|K_m(0)-K_\infty\|_{\mathrm{op}}>1/2)
\le\frac{4\cdot9}{m(1/4)}=\frac{144}{m}.
$$

確率は常に1以下なので $\min(1,144/m)$ と読める。$m\le144$ ではこの粗い不等式は実質的な制約を与えないが、幅を増やしたとき上界が消えることは証明している。
<!-- solution-end -->

### SLT2-10-A05 特異核では教師差を学べない
- Level: A
- 目安時間: 12分

二入力で $\sigma\equiv1$ とし、教師 $y=(1,-1)^{\mathsf T}$、初期予測 $F_m(0)=(c,c)^{\mathsf T}$ とする。固定核 $K_\infty$ の固有値と、固定核勾配流の極限予測を求めよ。

<!-- solution-start -->
#### 詳細解答

各接線特徴は入力によらず同じなので、$K_\infty=\begin{pmatrix}1&1\\1&1\end{pmatrix}$。$(1,1)^{\mathsf T}$ の固有値が2、$(1,-1)^{\mathsf T}$ の固有値が0である。初期残差は $(c-1,c+1)^{\mathsf T}=c(1,1)^{\mathsf T}-(1,-1)^{\mathsf T}$。よって[固定接線勾配流のスペクトル解と到達点](../SLT2-09/index.md#thm-slt2-09-continuous-spectrum)から、共通成分だけが減衰し

$$
e(t)=ce^{-2t}\begin{pmatrix}1\\1\end{pmatrix}
-\begin{pmatrix}1\\-1\end{pmatrix},\qquad
F_m(\infty)=\begin{pmatrix}0\\0\end{pmatrix}.
$$

二つの予測は常に同じ値なので、教師の差2は再現できない。残差の極限は $(-1,1)^{\mathsf T}$、損失は1である。
<!-- solution-end -->

### SLT2-10-B01 各ニューロンの移動を積分する
- Level: B
- 目安時間: 18分

第1節の模型で $n=2$、$R=1$、$M_0=M_1=1$、$A=2$、$T=1$、$\|e_m(0)\|_2\le B=3$ とする。$V_a,A_T,V_q$ を求め、初期化の一つの実現値で全ニューロンに共通の移動上界を書け。

<!-- solution-start -->
#### 詳細解答

[二層網の有限時間核固定界](#thm-slt2-10-finite-time-drift)の証明で、残差のノルムが3以下のままである。$\dot a_r$ の $n$ 項をCauchy–Schwarzで抑えると $|\dot a_r|\le3\sqrt2/\sqrt m$。時間区間の長さは1なので、

$$
V_a=3\sqrt2,\qquad A_T=2+3\sqrt2.
$$

これを $|\dot q_r|\le |a_r|\sqrt2\cdot3/\sqrt m$ へ代入し積分すると

$$
V_q=3\sqrt2(2+3\sqrt2)=6\sqrt2+18.
$$

よって $0\le t\le1$ の各 $r$ で

$$
|a_r(t)-a_r(0)|\le\frac{3\sqrt2}{\sqrt m},
\quad
\|q_r(t)-q_r(0)\|_2\le\frac{6\sqrt2+18}{\sqrt m}.
$$

これは一つのニューロンの移動界であり、全 $m$ 個のパラメータを連結したノルムの界ではない。
<!-- solution-end -->

### SLT2-10-B02 二つの積の核変動を検算する
- Level: B
- 目安時間: 22分

$|\sigma|\le M_0$、$|\sigma'|\le M_1$、$|\sigma''|\le M_2$、$\|\xi_i\|,\|\xi_j\|\le R$、$|a|,|\widetilde a|\le A_T$ とする。$h_{ij}$ の変動界を、出力係数の差と隠れ重みの差に分けて出発点から導け。

<!-- solution-start -->
#### 詳細解答

$z_i=q^{\mathsf T}\xi_i$、$\widetilde z_i=\widetilde q^{\mathsf T}\xi_i$ なら $|z_i-\widetilde z_i|\le R\|q-\widetilde q\|_2$。平均値の定理を $\sigma,\sigma'$ に使って差を $M_1R\|q-\widetilde q\|_2$、$M_2R\|q-\widetilde q\|_2$ で抑える。二積の差を一つずつ分解すると

$$
|\sigma(z_i)\sigma(z_j)-\sigma(\widetilde z_i)\sigma(\widetilde z_j)|
\le2M_0M_1R\|q-\widetilde q\|_2
$$

となる。同様に $\sigma'$ の二積の差は $2M_1M_2R\|q-\widetilde q\|_2$ 以下。また

$$
|a^2-\widetilde a^2|
=|a-\widetilde a||a+\widetilde a|
\le2A_T|a-\widetilde a|.
$$

積の差を

$$
a^2uv-\widetilde a^2\widetilde u\widetilde v
=(a^2-\widetilde a^2)uv+
\widetilde a^2(uv-\widetilde u\widetilde v)
$$

と分解する。さらに $|uv|\le M_1^2$、$|\xi_i^{\mathsf T}\xi_j|\le R^2$ を使えば

$$
\begin{aligned}
|h_{ij}(a,q)-h_{ij}(\widetilde a,\widetilde q)|
&\le(2M_0M_1R+2A_T^2M_1M_2R^3)\|q-\widetilde q\|_2\\
&\quad+2A_TM_1^2R^2|a-\widetilde a|.
\end{aligned}
$$

これは[二層網の有限時間核固定界](#thm-slt2-10-finite-time-drift)の係数と一致する。
<!-- solution-end -->

### SLT2-10-B03 初期出力は零へ集中しない場合がある
- Level: B
- 目安時間: 22分

$\sigma\equiv1$、独立等確率の符号 $a_r\in\{-1,1\}$ を使い、$X_m=m^{-1/2}\sum_{r=1}^ma_r$ とする。$\mathbb EX_m^2$、$\mathbb EX_m^4$ を直接計算し、任意の $m$ で $\mathbb P(|X_m|\ge1/2)\ge3/16$ を示せ。従って $X_m\to0$ は確率収束でない。

<!-- solution-start -->
#### 詳細解答

各符号の平均は零、二乗は1なので、二乗和の展開で交差項が消えて $\mathbb EX_m^2=1$。四乗では期待値が非零になる添字の組は、同じ添字が4回出る $m$ 通りと、異なる2添字が2回ずつ出る $6\binom m2$ 通りだけ。従って

$$
\mathbb EX_m^4
=\frac{m+6\binom m2}{m^2}
=3-\frac2m\le3.
$$

$E=\{|X_m|\ge1/2\}$ とすると $E^c$ では $X_m^2<1/4$、一方 Cauchy–Schwarz で $\mathbb E[X_m^2\mathbf1_E]\le(\mathbb EX_m^4)^{1/2}\mathbb P(E)^{1/2}$。ゆえに

$$
1=\mathbb EX_m^2
\le\frac14+\sqrt{3\mathbb P(E)},
\qquad
\mathbb P(E)\ge\frac{(3/4)^2}{3}=\frac3{16}.
$$

零への確率収束なら左辺の事象確率は零へ向かうはずなので矛盾する。核が固定の極限へ収束しても、初期出力は同じ極限挙動を持つとは限らない。
<!-- solution-end -->

### SLT2-10-B04 入力点数を増やす落とし穴
- Level: B
- 目安時間: 15分

$n=m$ として、$n\times n$ 行列 $D_m$ の全成分を $1/m$ とする。各成分が零へ収束することを示しながら、$\|D_m\|_{\mathrm{op}}=1$ を証明せよ。なぜ固定入力数の初期核収束から可変入力数の結果を直ちに出せないか。

<!-- solution-start -->
#### 詳細解答

各成分は $1/m\to0$。単位ベクトル $u=(1,\ldots,1)^{\mathsf T}/\sqrt m$ に対して $D_mu=u$ なので、作用素ノルムは少なくとも1。$u$ に直交する $v$ は $\sum_jv_j=0$ だから $D_mv=0$。従って固有値は1と0だけで、作用素ノルムはちょうど1となる。

成分ごとの誤差が小さくても、成分数が $m^2$ に増えれば行列全体の誤差が小さいとは限らない。[初期集中定理](#thm-slt2-10-initial-concentration)の $n^2H^2/m$ も $n$ の増加に自動では耐えない。$D_m$ はこの論理上の落とし穴を示す行列例であり、特定のNTKの分布を主張するものではない。
<!-- solution-end -->

### SLT2-10-C01 有限時間の無限幅近似を一続きで示す
- Level: C
- 目安時間: 35分

$d=1$、訓練入力 $x_1=-1,x_2=1$、教師 $y=(1,-1)^{\mathsf T}$、$\sigma=\tanh$ とする。各初期 $q_r(0)=0$、$a_r(0)$ は独立等確率の $\pm1$ とし、両方のパラメータを $1/\sqrt m$ 規格化で勾配流学習する。

1. 幅に依存しない $K_\infty$、$K_m(0)$、$e_m(0)$ を計算し、核の正定値性を確認せよ。
2. 極限固定核の残差と予測を $t\ge0$ について求め、残差方程式と初期条件を代入確認せよ。
3. $0\le t\le1$ で各ニューロンの移動界を計算せよ。$|\tanh|\le1$、$|\tanh'|\le1$、$|\tanh''|\le2$ を使用してよい。
4. [二層網の有限時間核固定界](#thm-slt2-10-finite-time-drift)から、幅 $m$ の実網と固定核予測の一様誤差を具体的な $C/\sqrt m$ で評価せよ。この評価から無限時間の学習を結論してよいか。

<!-- solution-start -->
#### 詳細解答

**1.** $\xi_1=(-1,1)^{\mathsf T}$、$\xi_2=(1,1)^{\mathsf T}$。$q_r(0)=0$ で $\tanh0=0$、$\tanh'0=1$、$a_r(0)^2=1$ なので

$$
K_m(0)=K_\infty
=\begin{pmatrix}2&0\\0&2\end{pmatrix}=2I_2.
$$

任意の $c\ne0$ で $c^{\mathsf T}K_\infty c=2\|c\|_2^2>0$ だから正定値。初期出力は零なので $e_m(0)=-y=(-1,1)^{\mathsf T}$、$B=\sqrt2$ を確定的に取れる。

**2.** [固定核の勾配流](../SLT2-09/index.md#thm-slt2-09-continuous-spectrum)では $\dot e=-2e$。初期値を代入すれば

$$
e_{\infty,m}(t)=
\begin{pmatrix}-e^{-2t}\\e^{-2t}\end{pmatrix},\qquad
F_{\infty,m}(t)=
\begin{pmatrix}1-e^{-2t}\\-1+e^{-2t}\end{pmatrix}.
$$

$e'_{\infty,m}(t)=(-2)(-e^{-2t},e^{-2t})^{\mathsf T}=-K_\infty e_{\infty,m}(t)$、$t=0$ で $e_{\infty,m}(0)=(-1,1)^{\mathsf T}$ と確かめられる。

**3.** $n=2$、$R=\sqrt2$、$A=M_0=M_1=1$、$M_2=2$、$T=1$、$B=\sqrt2$ とする。[移動量の定理](#thm-slt2-10-finite-time-drift)の係数は

$$
\begin{aligned}
V_a&=1\cdot\sqrt2\cdot1\cdot\sqrt2=2,\\
A_T&=1+2=3,\\
V_q&=1\cdot\sqrt2\cdot3\cdot1\cdot\sqrt2\cdot\sqrt2
=6\sqrt2.
\end{aligned}
$$

よって全ニューロンで $|a_r(t)-a_r(0)|\le2/\sqrt m$、$\|q_r(t)-q_r(0)\|_2\le6\sqrt2/\sqrt m$ である。

**4.** 核変動の式に代入する。$R^2=2$、$R^3=2\sqrt2$ だから

$$
\begin{aligned}
2M_0M_1R+2A_T^2M_1M_2R^3
&=2\sqrt2+2\cdot9\cdot2\cdot2\sqrt2
=74\sqrt2,\\
2A_TM_1^2R^2V_a&=2\cdot3\cdot2\cdot2=24,\\
C_{K,1}&=2\left(74\sqrt2\cdot6\sqrt2+24\right)=1824.
\end{aligned}
$$

初期核は $K_\infty$ と厳密一致するので、$\sup_{t\le1}\|K_m(t)-K_\infty\|_{\mathrm{op}}\le1824/\sqrt m$。残差のノルムは $\sqrt2$ 以下で、[時間変化する正半定値核と固定核の誤差](../SLT2-09/index.md#thm-slt2-09-kernel-drift-bound)により

$$
\sup_{0\le t\le1}\|F_m(t)-F_{\infty,m}(t)\|_2
=\sup_{0\le t\le1}\|e_m(t)-e_{\infty,m}(t)\|_2
\le\frac{1824\sqrt2}{\sqrt m}.
$$

この定数は粗いが、有限幅の全学習曲線と固定核曲線の差を有限区間で保証する。$T=1$ の導出から $t\to\infty$ の極限を交換することはできず、$T$ を延ばすなら移動界を新たに検討する必要がある。
<!-- solution-end -->

## 章末チェック

- 固定した入力点数と、幅とともに増える入力点数の差はどの式に現れるか。
- 初期核の独立平均の収束と、学習中の核変動を抑える論法を区別できるか。
- $e_{\infty,m}(0)=e_m(0)$ を保たなければ予測比較のどの一歩が壊れるか。
- 無限幅・有限時間の近似から、無限時間の補間や標本外汎化を推論できない理由を説明できるか。
