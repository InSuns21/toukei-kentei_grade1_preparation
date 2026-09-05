# F0-00SDE1 Encore V：Euler--Maruyama・strong/weak convergence

SDE

$$
dX_t=b(X_t)dt+\sigma(X_t)dB_t
$$

をMonte Carloで使うには、連続時間pathを計算機上で離散化する必要があります。

この章では、Euler--Maruyama法を「公式」として置くだけでなく、global Lipschitz条件の下で

$$
\left(E\sup_{0\le t\le T}|X_t-\bar Y_t|^2\right)^{1/2}
\le C h^{1/2}
$$

まで証明します。weak order 1 は追加の滑らかさを要するため、この章では定義と位置づけまでに留めます。

前提として、[Itô積分の $L^2$ 拡張](../F0_00SP4_Ito積分_Ito公式_SDE/index.md#thm-f0-00sp4-ito-extension)、[Doobの $L^2$ maximal inequality](../F0_00SP4_Ito積分_Ito公式_SDE/index.md#lem-f0-00sp4-doob-l2)、[global Lipschitz SDEの存在一意性](../F0_00SP4_Ito積分_Ito公式_SDE/index.md#thm-f0-00sp4-sde-existence-uniqueness) を使います。

---

## 1. Brown increment

一様時間格子

$$
0=t_0<t_1<\cdots<t_N=T,
\qquad
h=\frac{T}{N},
\qquad t_n=nh
$$

を取ります。Brown増分を

$$
\Delta B_n:=B_{t_{n+1}}-B_{t_n}
$$

と書くと、独立増分性から

$$
\boxed{\Delta B_n\sim N(0,h)}
$$

で、互いに独立です。したがって標準正規乱数 $Z_n$ を用いて

$$
\Delta B_n=\sqrt h\,Z_n
$$

と生成できます。

ODEのEuler法では時間増分が $O(h)$ ですが、Brown増分の標準偏差は $O(\sqrt h)$ です。このスケール差がSDE数値解析の出発点です。

---

## 2. Euler--Maruyama法と連続時間補間

<a id="def-f0-00sde1-euler-maruyama"></a>

<!-- formal-statement-start -->
> **定義（Euler--Maruyama法）**  
> $Y_0=X_0$ とし、各 $n=0,\ldots,N-1$ で

$$
\boxed{
Y_{n+1}
=Y_n+b(Y_n)h+\sigma(Y_n)\Delta B_n
}
$$

> と定める離散過程をEuler--Maruyama法と呼びます。さらに

$$
\eta(t):=t_n
\qquad (t_n\le t<t_{n+1})
$$

> と置き、連続時間補間

$$
\boxed{
\bar Y_t
=X_0
+\int_0^t b(Y_{\eta(s)})\,ds
+\int_0^t \sigma(Y_{\eta(s)})\,dB_s
}
$$

> を考えます。このとき $\bar Y_{t_n}=Y_n$ です。
<!-- formal-statement-end -->

### 2.1 例：Ornstein--Uhlenbeck過程

$$
dX_t=-\theta X_tdt+\sigma_0dB_t
$$

を考えます。

<!-- definition-example-start: def-f0-00sde1-euler-maruyama -->
**定義の確認**  
$b(x)=-\theta x$, $\sigma(x)=\sigma_0$ を定義式へ代入すると

$$
Y_{n+1}
=(1-\theta h)Y_n+\sigma_0\Delta B_n
=(1-\theta h)Y_n+\sigma_0\sqrt h\,Z_n.
$$

また $t_n\le t<t_{n+1}$ では

$$
\bar Y_t
=Y_n-\theta Y_n(t-t_n)+\sigma_0(B_t-B_{t_n}).
$$

したがって格子点では確かに $\bar Y_{t_n}=Y_n$ です。
<!-- definition-example-end -->

OU過程の格子点更新はAR(1)と同型の形を持ちますが、係数 $1-\theta h$ は連続時間モデルを数値離散化した結果です。

---

## 3. strong convergence と weak convergence

<a id="def-f0-00sde1-strong-order"></a>

<!-- formal-statement-start -->
> **定義（$L^2$-sup strong order）**  
> 真の解 $X$ と、**同じBrown運動・同じ初期値**から構成した近似 $\bar Y^h$ に対し、ある $C_T>0$ が $h$ に依存せず存在して

$$
\left(
E\sup_{0\le t\le T}|X_t-\bar Y_t^h|^2
\right)^{1/2}
\le C_T h^p
$$

> が十分小さい $h$ で成り立つとき、$\bar Y^h$ は区間 $[0,T]$ 上で strong order $p$ を持つと呼びます。
<!-- formal-statement-end -->

### 3.1 例：定数係数SDEではEuler--Maruyamaが厳密

$$
dX_t=\beta\,dt+\gamma\,dB_t
$$

とします。

<!-- definition-example-start: def-f0-00sde1-strong-order -->
**定義の確認**  
真の解は

$$
X_t=X_0+\beta t+\gamma B_t.
$$

Euler--Maruyamaの連続補間も

$$
\bar Y_t=X_0+\beta t+\gamma B_t
$$

なので

$$
E\sup_{t\le T}|X_t-\bar Y_t|^2=0.
$$

従って任意の $p>0$ に対して strong order $p$ の不等式を満たします。これは「一般に高次」という意味ではなく、この特殊なSDEでは離散化誤差が消えるという確認例です。
<!-- definition-example-end -->

<a id="def-f0-00sde1-weak-order"></a>

<!-- formal-statement-start -->
> **定義（weak order）**  
> 終点 $T$ とテスト関数のクラス $\mathcal G$ を固定します。各 $g\in\mathcal G$ に対し $h$ に依存しない定数 $C_{g,T}$ が存在して

$$
\left|
E[g(X_T)]-E[g(Y_N^h)]
\right|
\le C_{g,T}h^p
$$

> が十分小さい $h$ で成り立つとき、$Y^h$ は $\mathcal G$ に対して weak order $p$ を持つと呼びます。
<!-- formal-statement-end -->

### 3.2 例：定数係数SDEではweak errorも0

<!-- definition-example-start: def-f0-00sde1-weak-order -->
**定義の確認**  
上の定数係数SDEでは $Y_N=X_T$ a.s. なので、期待値が存在する任意の $g$ に対して

$$
E[g(X_T)]-E[g(Y_N)]=0.
$$

従ってweak errorも0です。一般の非線形SDEでweak order 1を示すには、係数や $g$ の追加の滑らかさが必要です。
<!-- definition-example-end -->

strong errorは同じnoiseを共有したpath同士を比較します。weak errorは分布をテスト関数を通して比較します。この違いはMLMCのcouplingを理解するときに重要です。

---

## 4. strong order $1/2$ の成立条件

この節から次を仮定します。

- $X_0\in L^2$ で $\mathcal F_0$-可測。
- $b,\sigma:\mathbb R\to\mathbb R$ はglobal Lipschitz。すなわち、ある $L>0$ が存在して

$$
|b(x)-b(y)|+|\sigma(x)-\sigma(y)|
\le L|x-y|
$$

が全ての $x,y$ で成り立つ。

この仮定の下では

$$
|b(x)|^2+|\sigma(x)|^2
\le K(1+|x|^2)
$$

を満たす $K>0$ が存在します。実際

$$
|b(x)|\le |b(0)|+L|x|,
\qquad
|\sigma(x)|\le |\sigma(0)|+L|x|
$$

に $(u+v)^2\le2u^2+2v^2$ を使えば十分です。

また [global Lipschitz SDEの存在一意性定理](../F0_00SP4_Ito積分_Ito公式_SDE/index.md#thm-f0-00sp4-sde-existence-uniqueness) により、真の解 $X$ は一意に存在し、有限区間上で必要な二次モーメントを持ちます。

---

## 5. Euler--Maruyamaの二次モーメント評価

<a id="lem-f0-00sde1-grid-moment"></a>

<!-- formal-statement-start -->
> **補題（格子点の二次モーメント一様評価）**  
> 上のglobal Lipschitz条件の下で、Euler--Maruyama近似は

$$
\boxed{
\max_{0\le n\le N}E|Y_n|^2
\le C_T(1+E|X_0|^2)
}
$$

> を満たします。ここで $C_T$ は $N$ や $h=T/N$ に依存しません。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：条件付き二乗平均と離散Grönwall

$b_n=b(Y_n)$, $\sigma_n=\sigma(Y_n)$ と書きます。$\Delta B_n$ は $\mathcal F_{t_n}$ と独立で

$$
E[\Delta B_n\mid\mathcal F_{t_n}]=0,
\qquad
E[(\Delta B_n)^2\mid\mathcal F_{t_n}]=h
$$

なので

$$
E[|Y_{n+1}|^2\mid\mathcal F_{t_n}]
=|Y_n+b_nh|^2+|\sigma_n|^2h.
$$

従って

$$
\begin{aligned}
E|Y_{n+1}|^2
&=E|Y_n|^2+2hE[Y_nb_n]+h^2E|b_n|^2+hE|\sigma_n|^2\\
&\le E|Y_n|^2+hE|Y_n|^2+hE|b_n|^2+h^2E|b_n|^2+hE|\sigma_n|^2.
\end{aligned}
$$

線形成長評価と $h\le T$ を使うと、$T$ と係数だけに依存する $C$ により

$$
E|Y_{n+1}|^2
\le (1+Ch)E|Y_n|^2+Ch.
$$

$a_n:=1+E|Y_n|^2$ と置けば

$$
a_{n+1}\le(1+Ch)a_n.
$$

よって

$$
a_n\le(1+Ch)^na_0
\le e^{Cnh}a_0
\le e^{CT}a_0.
$$

これが主張です。
<!-- proof-end -->

---

## 6. 1 step内の揺れは $L^2$ で $O(h)$

<a id="lem-f0-00sde1-local-increment"></a>

<!-- formal-statement-start -->
> **補題（連続補間の局所増分評価）**  
> $t_n\le t<t_{n+1}$ とすると

$$
\boxed{
E|\bar Y_t-Y_n|^2\le C_T h
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：driftは $O(h^2)$、Itô積分は $O(h)$

定義から

$$
\bar Y_t-Y_n
=b(Y_n)(t-t_n)
+\sigma(Y_n)(B_t-B_{t_n}).
$$

したがって $(u+v)^2\le2u^2+2v^2$ とBrown増分の二次モーメントから

$$
\begin{aligned}
E|\bar Y_t-Y_n|^2
&\le2(t-t_n)^2E|b(Y_n)|^2
+2(t-t_n)E|\sigma(Y_n)|^2.
\end{aligned}
$$

[格子点の二次モーメント一様評価](#lem-f0-00sde1-grid-moment) と線形成長から、右辺は

$$
C_T(h^2+h)\le C_T' h
$$

で抑えられます。ここで $T$ は固定なので $h\le T$ を定数へ吸収しました。
<!-- proof-end -->

この $O(h)$ は**二乗平均誤差**です。平方根を取れば1 step内の典型的な大きさは $O(h^{1/2})$ であり、Brown増分のスケールと一致します。

---

## 7. 主定理：Euler--Maruyamaはstrong order $1/2$

<a id="thm-f0-00sde1-strong-half"></a>

<!-- formal-statement-start -->
> **定理（Euler--Maruyamaのstrong order $1/2$）**  
> $X_0\in L^2$ とし、$b,\sigma$ がglobal Lipschitzであるとします。$X$ をSDEの真の解、$\bar Y$ を同じ $X_0$ と同じBrown運動から作ったEuler--Maruyama連続補間とします。このとき、$h=T/N$ に依存しない定数 $C_T>0$ が存在して

$$
\boxed{
E\sup_{0\le t\le T}|X_t-\bar Y_t|^2
\le C_T h
}
$$

> が成り立ちます。従って

$$
\boxed{
\left(E\sup_{0\le t\le T}|X_t-\bar Y_t|^2\right)^{1/2}
\le C_T^{1/2}h^{1/2}
}
$$

> であり、Euler--Maruyama法は $L^2$-sup の意味でstrong order $1/2$ を持ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：誤差方程式 → Doob → 局所増分 → Grönwall

誤差を

$$
e_t:=X_t-\bar Y_t
$$

と置きます。真の解と連続補間の積分方程式を引くと

$$
\begin{aligned}
e_t
={}&\int_0^t\{b(X_s)-b(Y_{\eta(s)})\}\,ds\\
&+\int_0^t\{\sigma(X_s)-\sigma(Y_{\eta(s)})\}\,dB_s.
\end{aligned}
$$

$t\le T$ に対し

$$
\Phi(t):=E\sup_{0\le r\le t}|e_r|^2
$$

と置きます。

まずdrift項にはCauchy--Schwarzを使い

$$
\sup_{r\le t}
\left|
\int_0^r\{b(X_s)-b(Y_{\eta(s)})\}\,ds
\right|^2
\le t\int_0^t|b(X_s)-b(Y_{\eta(s)})|^2ds.
$$

確率積分項は [Itô積分の連続martingale版](../F0_00SP4_Ito積分_Ito公式_SDE/index.md#thm-f0-00sp4-continuous-ito-process) を取り、[Doobの $L^2$ maximal inequality](../F0_00SP4_Ito積分_Ito公式_SDE/index.md#lem-f0-00sp4-doob-l2) を稠密な有限分割へ適用して極限を取ります。[Itô isometry](../F0_00SP4_Ito積分_Ito公式_SDE/index.md#thm-f0-00sp4-ito-extension) と合わせると

$$
E\sup_{r\le t}
\left|
\int_0^r\{\sigma(X_s)-\sigma(Y_{\eta(s)})\}\,dB_s
\right|^2
\le
4E\int_0^t|\sigma(X_s)-\sigma(Y_{\eta(s)})|^2ds.
$$

$(u+v)^2\le2u^2+2v^2$ とglobal Lipschitz性より

$$
\Phi(t)
\le C_T\int_0^tE|X_s-Y_{\eta(s)}|^2ds.
$$

ここで

$$
X_s-Y_{\eta(s)}
=(X_s-\bar Y_s)+(\bar Y_s-Y_{\eta(s)})
=e_s+(\bar Y_s-Y_{\eta(s)}).
$$

従って

$$
E|X_s-Y_{\eta(s)}|^2
\le2\Phi(s)+2E|\bar Y_s-Y_{\eta(s)}|^2.
$$

[局所増分評価](#lem-f0-00sde1-local-increment) を代入すると

$$
\Phi(t)
\le C_T\int_0^t\Phi(s)ds+C_T h.
$$

最後にGrönwall不等式を使えば

$$
\Phi(T)\le C_T h.
$$

よって

$$
E\sup_{0\le t\le T}|X_t-\bar Y_t|^2
\le C_T h
$$

が得られました。平方根を取ればstrong order $1/2$ です。
<!-- proof-end -->

### 7.1 何が $1/2$ を生んだのか

証明の決定的な箇所は

$$
E|\bar Y_t-Y_{\eta(t)}|^2=O(h)
$$

です。Brown増分の分散が $h$ なので、pathの1 step内の揺れはRMSで $O(h^{1/2})$ です。Euler--Maruyamaは係数を左端で固定するため、この揺れがglobal errorへ残り、strong order $1/2$ が現れます。

---

## 8. weak order 1 はなぜ同じ証明では出ないか

strong convergenceからLipschitzな $g$ に対して

$$
|E[g(X_T)]-E[g(Y_N)]|
\le \operatorname{Lip}(g)E|X_T-Y_N|
=O(h^{1/2})
$$

までは直ちに従います。しかしEuler--Maruyamaの典型的なweak order 1は、これより良い評価です。

この改善には「正負のpath errorを絶対値で潰さず、期待値の中で打ち消しを利用する」必要があります。そのため、係数・テスト関数の追加の滑らかさと、Kolmogorov backward equationまたはItô--Taylor展開を使います。

したがって本章では

> **weak order 1 は結果だけを先取りし、証明は P2 の後続補完へ回す。**

とします。strong order $1/2$ のようにglobal Lipschitzだけで同じ証明を流用できるわけではありません。

---

## 9. geometric Brownian motion と構造保存

$$
dX_t=\mu X_tdt+\sigma X_tdB_t
$$

へEuler--Maruyamaを適用すると

$$
Y_{n+1}
=Y_n(1+\mu h+\sigma\sqrt h Z_n).
$$

真の解

$$
X_t=X_0\exp\left\{\left(\mu-\frac12\sigma^2\right)t+\sigma B_t\right\}
$$

は $X_0>0$ なら常に正ですが、Euler--Maruyamaは

$$
1+\mu h+\sigma\sqrt h Z_n<0
$$

となるstepで負値を出します。

**収束することと、有限stepでモデル固有の構造を保存することは別問題**です。

---

## 10. Milstein法への入口

一次元でさらに滑らかさを仮定し、Itô--Taylor展開の次の項まで残すと

$$
Y_{n+1}
=Y_n+b_nh+\sigma_n\Delta B_n
+\frac12\sigma_n\sigma_n'
\{(\Delta B_n)^2-h\}
$$

というMilstein法が現れます。

補正項の

$$
(\Delta B_n)^2-h
$$

はBrown運動の二次変分を反映しています。適切な追加条件の下ではstrong order 1まで改善しますが、その完全証明は本章の範囲外です。

---

## 11. Monte Carlo estimatorとの誤差分解

離散SDEを $M$ 本simulationして

$$
\widehat Q_{M,h}
=\frac1M\sum_{i=1}^M g(Y_N^{h,(i)})
$$

とします。すると

$$
\begin{aligned}
\widehat Q_{M,h}-E[g(X_T)]
={}&\underbrace{\widehat Q_{M,h}-E[g(Y_N^h)]}_{\text{sampling error}}\\
&+\underbrace{E[g(Y_N^h)]-E[g(X_T)]}_{\text{time discretization bias}}.
\end{aligned}
$$

標本数 $M$ だけ増やしてもtime discretization biasは消えません。

weak biasが $O(h)$、sampling RMSEが $O(M^{-1/2})$ である状況なら、両方を精度 $\varepsilon$ 程度にする基本設計は

$$
h=O(\varepsilon),
\qquad
M=O(\varepsilon^{-2})
$$

です。さらに1 pathあたり $O(h^{-1})$ step必要です。この計算量をlevel couplingで改善するのがMLMCです。

---

## 12. 演習

### A1：OU過程の二次モーメント更新

OUのEuler--Maruyama

$$
Y_{n+1}=(1-\theta h)Y_n+\sigma_0\sqrt h Z_n
$$

について、$Z_n$ が $Y_n$ と独立であることを使い

$$
E[Y_{n+1}^2]
=(1-\theta h)^2E[Y_n^2]+\sigma_0^2h
$$

を示してください。

### A2：定数係数SDEが厳密になること

$$
dX_t=\beta dt+\gamma dB_t
$$

について、Euler--Maruyamaの格子点値 $Y_n$ が全ての $n$ で $X_{t_n}$ と一致することを帰納法で示してください。

### B1：局所増分評価の再構成

global Lipschitz条件から線形成長を導き、[格子点モーメント評価](#lem-f0-00sde1-grid-moment) を使って

$$
\sup_{0\le t\le T}E|\bar Y_t-Y_{\eta(t)}|^2\le Ch
$$

を自力で証明してください。

### B2：strong order $1/2$ の証明を閉じる

誤差

$$
e_t=X_t-\bar Y_t
$$

から出発し、drift項にCauchy--Schwarz、martingale項にDoob $L^2$、係数差にglobal Lipschitz、最後にGrönwallを使って

$$
E\sup_{t\le T}|e_t|^2\le Ch
$$

を導いてください。各不等式で定数が $h$ に依存しないことも確認してください。

---

## 章末チェック

- Brown増分を $\sqrt h Z_n$ と生成できる。
- Euler--Maruyamaの格子点更新と連続時間補間を定義できる。
- strong convergenceとweak convergenceの違いを「同じpath」対「期待値」で説明できる。
- global Lipschitzから線形成長を導ける。
- Euler--Maruyama格子点の二次モーメントを一様に評価できる。
- 1 step内の連続補間誤差が二乗平均で $O(h)$ になることを証明できる。
- Doob $L^2$ とItô isometryを使い、Euler--Maruyamaのstrong order $1/2$ を証明できる。
- weak order 1に追加の滑らかさが必要な理由を説明できる。
- sampling errorとtime discretization biasを分離できる。
- MLMCでstrong couplingが重要になる理由を説明できる。
