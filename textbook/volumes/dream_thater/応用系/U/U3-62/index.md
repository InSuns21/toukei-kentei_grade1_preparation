# U3-62 Almgren–Chriss 最適清算の導出

<!-- definition-example-audit: strict -->

## この講義で問うこと

[前講の線形市場インパクト](../U3-61/index.md#def-u3-61-linear-impact)では、早く売ると平均約定単価が悪化し、ゆっくり売ると、残株が外生的な価格変動にさらされます。どういう売却予定なら、費用と価格変動リスクを両方考慮できるでしょうか。

本講では、**未来価格を見ない固定予定**について、現金収支から目的関数を導き、離散の三重対角系、双曲線関数の解析解、連続時間の境界値問題、コスト–リスク比較まで、一つの模型として導出します。売買予測や実市場での最適執行の保証を目的としません。

数量は株、価格は円／株、現金・期待費用は円、分散は円²、時間は時間（hour）です。単一銘柄、売り、期限内の全量約定、手数料・スプレッドは0とします。無影響価格と市場インパクトを区別できる合成模型を考え、実市場の価格が常に正となるほどの範囲でだけ用います。

## 1. 売却量を残在庫の差分で記帳する

全量 $Q>0$ 株を $N\ge1$ 個の等間隔に分け、総時間 $T>0$、一区間の長さを $\Delta=T/N$ 時間とします。区間末の残株を $x_i$ と書くと、区間 $i$ の売却量は $x_{i-1}-x_i$ です。時点をこう分けると、約定前に何株がリスクにさらされていたかを数えられます。

[前講の線形市場インパクト模型](../U3-61/index.md#def-u3-61-linear-impact)の記号を引き継ぎ、$M_i$ は売買の影響を受けない区間 $i$ の仮想価格、$S_0=M_0$ は取引開始時の到着価格、$p_i$ は売却が実際にある区間の平均約定価格です。$M_i$ と注文後の中値 $S_i$ は異なり、売却量が0なら $p_i$ 自体を定めません。

<a id="def-u3-62-cash"></a>

<!-- formal-statement-start -->
> **定義（清算在庫と自己金融的な受取額）**  
> $Q>0$、整数 $N\ge1$、$\Delta=T/N>0$ とする。各 $x_i$ は時点0で確定した売却予定在庫で、以下を満たす。

$$
x_0=Q,\qquad x_N=0,\qquad x_{i-1}\ge x_i\ge0
\quad(1\le i\le N).
$$

> 区間 $i$ の売却量は次式で事前に固定する。$q_i>0$ の区間でのみ[前講の数量加重平均約定価格](../U3-61/index.md#def-u3-61-linear-impact)を $p_i$ として定め、$q_i=0$ では約定単価を定義しない。

$$
q_i=x_{i-1}-x_i.
$$

> 売却以外の現金移動がない累積受取額と、到着価格 $S_0$ に対する費用を次式で定める。

$$
R_0=0,\qquad R_i-R_{i-1}=
\begin{cases}
q_ip_i,&q_i>0,\\
0,&q_i=0.
\end{cases}
$$

$$
C=QS_0-R_N.
$$

> すべての $q_i$ は時点0で全区間の価格増分を観測する前に固定し、途中で過去の価格増分を観測しても変更しない。売却予定数量は必ず約定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-62-cash -->
**定義の確認**（直接例）：$Q=100$ 株、$N=2$、$T=2$ 時間とし、在庫を $x=(100,60,0)$ 株とします。端点と単調性、各区間の売却量を確認すると、

$$
x_0=100\ge x_1=60\ge x_2=0,\qquad
(q_1,q_2)=(40,60),\qquad \Delta=1
$$

です。外生価格変動がなく $M_0=M_1=M_2=S_0=100$ 円／株、$\gamma=0.002$ 円／株²、$\eta=0.01$ 円・時間／株²とします。[前講の中値・約定価格模型](../U3-61/index.md#def-u3-61-linear-impact)では、区間直前の中値は「無影響価格－過去の売却が残した恒久的下落」です。そこで

$$
\begin{aligned}
B_1&=M_1=100,\\
p_1&=B_1-\frac{\gamma q_1}{2}-\eta\frac{q_1}{\Delta}
=100-0.04-0.40=99.56,\\
B_2&=M_2-\gamma q_1=100-0.08=99.92,\\
p_2&=B_2-\frac{\gamma q_2}{2}-\eta\frac{q_2}{\Delta}
=99.92-0.06-0.60=99.26
\end{aligned}
$$

（中値・約定単価はいずれも円／株）です。第2区間では第1区間の一時的価格差 $0.40$ 円／株を持ち越さず、恒久的な $0.08$ 円／株だけを持ち越します。売却による現金受取と到着価格基準コストは

$$
R_1=40(99.56)=3,982.4\ \text{円},
$$

$$
R_2=3,982.4+60(99.26)=9,938\ \text{円},\qquad
C=10,000-9,938=62\ \text{円}
$$

です。まだ売っていない株の時価は $R_i$ に加えません。

売却量が0の区間も区別できます。たとえば $x=(100,100,0)$ 株では $q_1=0$ なので第1区間の平均約定価格 $p_1$ は定義されません。しかし取引代金は0円で、収支の定義から $R_1=R_0=0$ 円です。
<!-- definition-example-end -->

### 1.1 外生価格の動きにさらされたのは何株か

[前講の外生価格増分模型](../U3-61/index.md#def-u3-61-price-noise)を等間隔に適用し、無影響価格の増分を $\varepsilon_i=M_i-M_{i-1}$（円／株）とします。各 $\varepsilon_i$ は独立で平均0、分散 $\sigma^2\Delta$ と仮定し、$\sigma\ge0$ の単位は円／株／$\sqrt{\text{時間}}$ です。恒久係数は $\gamma\ge0$ 円／株²、一時係数は $\eta>0$ 円・時間／株²とし、区間・数量によらず一定とします。$\eta>0$ は後で厳密凸性を保証する重要な仮定です。

<a id="prop-u3-62-cost-risk"></a>

<!-- formal-statement-start -->
> **命題（在庫表示による期待清算費用と分散）**  
> $Q>0$、整数 $N\ge1$、$T>0$、$\Delta=T/N$、$\gamma\ge0$、$\eta>0$、$\sigma\ge0$ とする。[清算在庫と受取額](#def-u3-62-cash)の条件を満たす確定在庫列 $x$ を選び、[前講の線形インパクト模型](../U3-61/index.md#def-u3-61-linear-impact)と、互いに独立で $E[\varepsilon_i]=0$、$\operatorname{Var}(\varepsilon_i)=\sigma^2\Delta$ を満たす[外生価格増分](../U3-61/index.md#def-u3-61-price-noise)を用いる。このとき、

$$
C=\frac{\gamma Q^2}{2}
+\frac{\eta}{\Delta}\sum_{i=1}^{N}(x_{i-1}-x_i)^2
-\sum_{i=1}^{N}x_{i-1}\varepsilon_i,
$$

$$
E[C]=\frac{\gamma Q^2}{2}
+\frac{\eta}{\Delta}\sum_{i=1}^{N}(x_{i-1}-x_i)^2,\qquad
\operatorname{Var}(C)=\sigma^2\Delta\sum_{i=1}^{N}x_{i-1}^2.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[線形インパクトの執行コスト恒等式](../U3-61/index.md#prop-u3-61-cost-identity)から $\Delta t_i=\Delta$ と $q_i=x_{i-1}-x_i$ を代入します。外生項は有限和の順序交換により

$$
\begin{aligned}
\sum_{i=1}^{N}q_i(M_i-M_0)
&=\sum_{i=1}^Nq_i\sum_{k=1}^i\varepsilon_k
=\sum_{k=1}^N\varepsilon_k\sum_{i=k}^Nq_i\\
&=\sum_{k=1}^N\varepsilon_k(x_{k-1}-x_N)
=\sum_{k=1}^Nx_{k-1}\varepsilon_k.
\end{aligned}
$$

最後に $x_N=0$ を使いました。これが最初の式です。$x_i$ は確定値、$E[\varepsilon_i]=0$ なので $E[\sum x_{i-1}\varepsilon_i]=0$。分散は独立性により異なる区間の共分散が0となるので、

$$
\begin{aligned}
\operatorname{Var}(C)
&=\sum_{i=1}^Nx_{i-1}^2\operatorname{Var}(\varepsilon_i)
+2\sum_{k<i}x_{k-1}x_{i-1}\operatorname{Cov}(\varepsilon_k,\varepsilon_i)\\
&=\sigma^2\Delta\sum_{i=1}^Nx_{i-1}^2.
\end{aligned}
$$

在庫を過去の価格によって変更する場合、$x_i$ を確定値として外に出したこの計算はそのまま適用できません。
<!-- proof-end -->

**数値確認**：前の $x=(100,60,0)$ に $\sigma=0.1$ を指定すると $E[C]=10+0.01(40^2+60^2)=62$ 円、$\operatorname{Var}(C)=0.01(100^2+60^2)=136$ 円²、標準偏差は $\sqrt{136}\simeq11.66$ 円です。

## 2. 異なる単位の費用とリスクを比較する

リスクを嫌う度合いを表す係数 $\lambda\ge0$（単位1／円）を指定して、分散を円に換算して平均費用に加えます。単に「分散と費用を足す」のではなく、ここで初めて足せる単位になります。

<a id="def-u3-62-objective"></a>

<!-- formal-statement-start -->
> **定義（平均費用と費用分散のリスク回避目的）**  
> $\lambda\ge0$（単位1／円）を固定する。[上の費用・分散模型](#prop-u3-62-cost-risk)の下、$x_0=Q,x_N=0,x_{i-1}\ge x_i\ge0$ を満たす確定在庫列 $x$ について、

$$
J_\lambda(x)=E[C]+\lambda\operatorname{Var}(C)
=\frac{\gamma Q^2}{2}
+\frac{\eta}{\Delta}\sum_{i=1}^N(x_{i-1}-x_i)^2
+\lambda\sigma^2\Delta\sum_{i=1}^Nx_{i-1}^2
$$

> を定め、その値を最小化する。この目的は特定の効用関数や相場収益を仮定したものではなく、**平均–分散を評価するという選択**である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-62-objective -->
**定義の確認**（直接例）：$N=2,\Delta=1,Q=100,\gamma=0.002,\eta=0.01,\sigma=0.1,\lambda=1$（単位は上記）で、$x=(100,50,0)$ は売却量 $(50,50)$ が非負で期末残株0の実行可能解です。期待費用は $10+50=60$ 円、分散は $0.01(10,000+2,500)=125$ 円²、$\lambda V=125$ 円なので $J_1=185$ 円。これはあくまで**候補**の評価です。
<!-- definition-example-end -->

恒久費用 $\gamma Q^2/2$ と、リスク項の最初の $\lambda\sigma^2\Delta x_0^2$ はどの予定にも共通です。前者は最適在庫に影響しませんが、費用報告には残します。

## 3. 離散最適性方程式の導出

自由な未知数は $x_1,\ldots,x_{N-1}$ の $N-1$ 個です。いったん売却量非負の制約を外して、二次式の停留条件を計算します。各未知数 $x_i$ が関わる売却差分は $x_{i-1}-x_i$ と $x_i-x_{i+1}$ の二つだけです。そのため各停留条件には隣接する三つの在庫しか現れず、係数を並べると **$(N-1)\times(N-1)$ 三重対角行列 $A$**になります。ここで行列 $A$ が正定値とは、零でない内部方向 $h$ に対して二次形式 $h^{\mathsf T}Ah>0$ が成り立つことです。最後に停留解が**実際に非負の売却量を持つ**と証明します。

<a id="thm-u3-62-tridiagonal"></a>

<!-- formal-statement-start -->
> **定理（離散最適清算の一意解と三重対角系）**  
> $N\ge2,Q>0,\Delta>0,\gamma\ge0,\eta>0,\sigma\ge0,\lambda\ge0$ とし、$r=\lambda\sigma^2\Delta^2/\eta\ge0$ とする。[リスク回避目的](#def-u3-62-objective)の唯一の最適解は、$x_0=Q,x_N=0$ と

$$
-x_{i-1}+(2+r)x_i-x_{i+1}=0,\qquad i=1,\ldots,N-1
$$

> を満たす。この内部未知数に対する係数行列は、主対角が $2+r$、上下対角が $-1$ の正定値な三重対角行列である。解は $Q=x_0>x_1>\cdots>x_N=0$ であり、すべての $q_i>0$ となる。$N=1$ の場合の唯一の許容在庫は $(Q,0)$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

内部在庫 $x_i$ 以外を固定して偏微分する記号を $\partial/\partial x_i$ とします。一時費用で $x_i$ を含むのは二区間の差分 $(x_{i-1}-x_i)^2$、$(x_i-x_{i+1})^2$ であり、リスク和には次区間の売却前在庫の項 $x_i^2$ が一つ現れます。よって

$$
\begin{aligned}
\frac{\partial J_\lambda}{\partial x_i}
&=\frac{2\eta}{\Delta}\bigl[(x_i-x_{i-1})+(x_i-x_{i+1})\bigr]
 +2\lambda\sigma^2\Delta x_i\\
&=\frac{2\eta}{\Delta}\bigl[-x_{i-1}+(2+r)x_i-x_{i+1}\bigr]
\end{aligned}
$$

です。$\eta,\Delta>0$ より、これを0と置くことは定理の三重対角方程式と同値です。内部方向 $h=(h_1,\ldots,h_{N-1})\ne0$ について $h_0=h_N=0$ と置きます。$h$ は内部在庫を動かす方向であり、$s\mapsto J_\lambda(x+sh)$ を $s$ について二回微分すると

$$
\left.\frac{d^2}{ds^2}J_\lambda(x+sh)\right|_{s=0}
=\frac{2\eta}{\Delta}\sum_{i=1}^N(h_{i-1}-h_i)^2
+2\lambda\sigma^2\Delta\sum_{i=1}^{N-1}h_i^2.
$$

停留方程式の左辺を並べた係数行列を $A$ とします。第 $i$ 行は $-x_{i-1}+(2+r)x_i-x_{i+1}$（端点は右辺へ移す）なので、実際に掛け算を展開して

$$
\begin{aligned}
h^{\mathsf T}Ah
&=\sum_{i=1}^{N-1}\bigl[(2+r)h_i^2-h_ih_{i-1}-h_ih_{i+1}\bigr]\\
&=\sum_{i=1}^{N}(h_{i-1}-h_i)^2
+r\sum_{i=1}^{N-1}h_i^2
=\frac{\Delta}{2\eta}\left.\frac{d^2}{ds^2}J_\lambda(x+sh)\right|_{s=0}.
\end{aligned}
$$

もし最初の和が0なら全隣接差が0、$h_0=0$ からすべての $h_i=0$ となり矛盾します。したがって $h\ne0$ では $h^{\mathsf T}Ah>0$ です。これが三重対角行列を正定値と判定できる根拠であり、二次目的は厳密凸、停留解は唯一の大域最小となります。その停留解が売却制約を満たすことは次の[解析解定理](#thm-u3-62-exact)で示します。
<!-- proof-end -->

## 4. 双曲線関数で解く

上の漸化式に $x_i=z^i$ を代入すると $z^2-(2+r)z+1=0$ です。二根の積は1です。$r>0$ なら正の数 $\theta$ を $2(\cosh\theta-1)=r$ で定め、二根を $e^\theta,e^{-\theta}$ と表せます。ここで $\sinh u=(e^u-e^{-u})/2$、$\cosh u=(e^u+e^{-u})/2$ とします。

<a id="thm-u3-62-exact"></a>

<!-- formal-statement-start -->
> **定理（定数係数の離散最適在庫の解析解）**  
> [離散最適清算の仮定](#thm-u3-62-tridiagonal)で $r>0$ なら $\theta>0$ を $2(\cosh\theta-1)=r$ として

$$
x_i^*=Q\frac{\sinh((N-i)\theta)}{\sinh(N\theta)}
\qquad(i=0,\ldots,N).
$$

> $r=0$ なら $x_i^*=Q(1-i/N)$ である。いずれも $q_i^*=x_{i-1}^*-x_i^*>0$ で、最適在庫は恒久インパクト係数 $\gamma$ に依存しない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$r>0$ では $\cosh\theta=1+r/2>1$ により $\theta>0$ が存在して一意です。指数定義から

$$
\sinh((k+1)\theta)+\sinh((k-1)\theta)
=2\cosh\theta\sinh(k\theta)
$$

が成り立つので、指定した $x_i^*$ は $x_{i-1}^*+x_{i+1}^*=(2+r)x_i^*$ を満たします。端点も $x_0^*=Q$、$x_N^*=0$ です。$\sinh$ は非負領域で厳密増加だから $Q=x_0^*>x_1^*>\cdots>x_N^*=0$ となり、すべての $q_i^*>0$ です。従って前節の無制約最小解は元の制約を満たしており、唯一の制約付き最適解でもあります。

$r=0$ では $x_{i+1}-x_i=x_i-x_{i-1}$ で差分が一定、両端点から差分 $-Q/N$、よって直線です。$\gamma Q^2/2$ は $x$ に依存する定数ではなく、**在庫に関して一定**なので、最適性方程式には現れません。
<!-- proof-end -->

**二期間の手計算**：$N=2$ なら $(2+r)x_1=Q$。$Q=100$、$T=2$、$\Delta=1$、$\eta=0.01$、$\sigma=0.1$、$\lambda=1$／円では $r=1$ なので $x_1=100/3$、$(q_1,q_2)=(200/3,100/3)$ 株。$\gamma=0.002$ を含めると

$$
E[C]=10+0.01\left[\left(\frac{200}{3}\right)^2+\left(\frac{100}{3}\right)^2\right]=\frac{590}{9}\simeq65.56\ \text{円},
$$

$$
\operatorname{Var}(C)=0.01\left[100^2+\left(\frac{100}{3}\right)^2\right]=\frac{1000}{9}\simeq111.11\ \text{円}^2,\qquad
J_1=\frac{1590}{9}\simeq176.67\ \text{円}.
$$

均等配分の $J_1=185$ 円より小さい一方、平均費用だけなら均等配分の60円の方が小さい点が重要です。

## 5. 連続時間の極限

時刻 $t\in[0,T]$ の残在庫を $x(t)$ と書き、離散在庫 $x_i$ は $t_i=i\Delta$ での値 $x(t_i)$ に対応させます。$x'(t)=dx(t)/dt$ は**時間 $t$ に関する導関数**で、$-x'(t)$ が売却速度（株／時間）です。区間で差分を取れば $q_i/\Delta=-(x_i-x_{i-1})/\Delta$ なので、滑らかな経路では $-x'(t)$ の近似となります。$\sum_iq_i^2/\Delta$ は $\int_0^T(x')^2dt$ に、確定在庫のリスク和は $\sigma^2\int_0^Tx(t)^2dt$ に近づくと期待できます。

連続問題の許容経路は、$x(t)=Q+\int_0^t x'(s)\,ds$ と復元できる**絶対連続関数**に限定します。$x'\in L^2[0,T]$ は $\int_0^T|x'(t)|^2dt<\infty$ を意味し、導関数と不等式 $x'(t)\le0$ は**ほとんど至る所**（長さ0の例外集合を除いて）で理解します。ここで使う $\kappa$ は売却経路の減衰率（単位1／時間）で、[前講のべき乗型一時インパクト](../U3-61/index.md#def-u3-61-nonlinear-temp)の係数 $\kappa$ とは別の量です。解を予想するだけでなく、離散解そのものが収束することを確認します。

<a id="prop-u3-62-continuous"></a>

<!-- formal-statement-start -->
> **命題（連続時間極限と境界値問題の解）**  
> $Q,T,\eta>0,\gamma,\lambda,\sigma\ge0$ を固定し、$\Delta=T/N\to0$ とする。[離散最適解](#thm-u3-62-exact)の折れ線補間は、$\kappa=\sqrt{\lambda\sigma^2/\eta}$ として

$$
x^*(t)=
\begin{cases}
Q\,\dfrac{\sinh(\kappa(T-t))}{\sinh(\kappa T)}, & \kappa>0,\\
Q(1-t/T), & \kappa=0
\end{cases}
$$

> に収束する。この経路は、絶対連続、$x'\in L^2[0,T]$、$x(0)=Q,x(T)=0$、$x'(t)\le0$（ほとんど至る所）という許容条件の下で、

$$
\frac{\gamma Q^2}{2}
+\eta\int_0^T(x'(t))^2dt
+\lambda\sigma^2\int_0^T(x(t))^2dt
$$

> を唯一最小にし、$x''=\kappa^2x$ を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[離散方程式](#thm-u3-62-tridiagonal)を $\Delta^2$ で割ると

$$
\frac{x_{i+1}-2x_i+x_{i-1}}{\Delta^2}
=\frac{r}{\Delta^2}x_i=\kappa^2x_i
$$

です。ただし差分方程式だけでは収束の保証になりません。$\kappa>0$ のとき[解析解](#thm-u3-62-exact)の係数は

$$
2(\cosh\theta_N-1)=4\sinh^2(\theta_N/2)=\kappa^2\Delta^2,
\qquad \sinh(\theta_N/2)=\frac{\kappa\Delta}{2}.
$$

$\theta_N>0$ かつ右辺が0へ近づくので $\theta_N\to0$ です。$\sinh z/z\to1$（$z\to0$）を適用して

$$
\frac{\theta_N}{\Delta}
=\kappa\frac{\theta_N/2}{\sinh(\theta_N/2)}
\longrightarrow\kappa
$$

を得ます。$a_N=\theta_N/\Delta$ と置き、区間全体の関数

$$
f_N(t)=Q\frac{\sinh(a_N(T-t))}{\sinh(a_NT)}
$$

を考えると、節点では $f_N(i\Delta)=x_i^*$ です。$a_N\to\kappa>0$ だから、分母は正の値に離れており $f_N\to x^*$ は $[0,T]$ 上一様です。さらに $|f_N'(t)|=Qa_N\cosh(a_N(T-t))/\sinh(a_NT)$ は $N$ によらず有界です。よって隣接する節点の線形補間と $f_N$ の差は最大でもその上界と $\Delta$ の積であり、折れ線補間も $x^*$ に一様収束します。$\kappa=0$ なら各 $N$ の解もその折れ線補間も $Q(1-t/T)$ に一致します。

一方、まず端点を固定した滑らかな経路 $x$ に対して $x+sh$（滑らかな $h$、$h(0)=h(T)=0$）を考えます。係数 $s$ は時間 $t$ とは独立の変分パラメータで、価格ショック $\varepsilon_i$ とも無関係です。目的関数を $s$ で微分した一次項は

$$
2\eta\int_0^Tx'h'\,dt+2\lambda\sigma^2\int_0^Txh\,dt
=2\int_0^T(-\eta x''+\lambda\sigma^2x)h\,dt
$$

です。部分積分の境界項 $[x'h]_0^T$ は0。したがって $x''=\kappa^2x$ です。$\kappa>0$ では一般解 $Ae^{\kappa t}+Be^{-\kappa t}$ に二つの端点を代入すると表示した $\sinh$ 形になります。$\kappa=0$ では $x''=0$ より直線です。

候補 $x^*$ と別の許容 $y=x^*+h$ の目的の差は二乗展開により

$$
\begin{aligned}
J(y)-J(x^*)
&=2\eta\int_0^T(x^*)'h'\,dt+2\lambda\sigma^2\int_0^Tx^*h\,dt\\
&\quad+\eta\int_0^T(h')^2dt+\lambda\sigma^2\int_0^Th^2dt\\
&=\eta\int_0^T(h')^2dt+\lambda\sigma^2\int_0^Th^2dt\ge0.
\end{aligned}
$$

交差項は $x^*$ が滑らかで境界値方程式を満たすため、絶対連続な $h$ に対しても部分積分と端点条件で0です。等号なら $h'=0$ ほとんど至る所、絶対連続性から $h(t)=h(0)+\int_0^t h'(s)\,ds=0$ となり一意です。候補の時間導関数は $\kappa>0$ では $-Q\kappa\cosh(\kappa(T-t))/\sinh(\kappa T)<0$、$\kappa=0$ では $-Q/T<0$ なので売り制約も満たします。
<!-- proof-end -->

**連続式の直接検算**：双曲線恒等式から $\kappa>0$ のとき

$$
\int_0^T(x^*)^2dt
=\frac{Q^2}{2\sinh^2(\kappa T)}
\left(\frac{\sinh(2\kappa T)}{2\kappa}-T\right),
$$

$$
\int_0^T((x^*)')^2dt
=\frac{Q^2\kappa^2}{2\sinh^2(\kappa T)}
\left(\frac{\sinh(2\kappa T)}{2\kappa}+T\right).
$$

$\kappa=0$ では $\int x^2dt=Q^2T/3$、$\int(x')^2dt=Q^2/T$ です。**有限分割**では最初の区間の分散 $\sigma^2\Delta Q^2$ が不可避ですが、連続極限ではその一項が0に近づくため、有限 $N$ と連続極限の分散を取り違えません。

## 6. コスト–リスク frontier

$\lambda$ を増やすと分散の比重が高まります。最適化の比較だけで、リスクが減る方向へ動き、平均費用を余計に払うことを示せます。

<a id="prop-u3-62-frontier"></a>

<!-- formal-statement-start -->
> **命題（最適清算の費用とリスクの単調性）**  
> 同じ $Q,N,T,\gamma,\eta,\sigma$ で $0\le\lambda_1<\lambda_2$ とし、それぞれの[最適解](#thm-u3-62-tridiagonal)の期待費用・分散を $(E_1,V_1)$、$(E_2,V_2)$ とする。このとき $V_2\le V_1$、$E_2\ge E_1$ である。$\sigma=0$ または $N=1$ なら両者は等しい。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\lambda_1$ での最適性から $E_1+\lambda_1V_1\le E_2+\lambda_1V_2$、$\lambda_2$ での最適性から $E_2+\lambda_2V_2\le E_1+\lambda_2V_1$。足して共通項を消すと $(\lambda_2-\lambda_1)(V_2-V_1)\le0$。係数は正なので $V_2\le V_1$。最初の不等式より $E_2-E_1\ge\lambda_1(V_1-V_2)\ge0$ です。$\sigma=0$ ならリスクが消え、$N=1$ なら選択する内部在庫がなく、どちらも予定は不変です。
<!-- proof-end -->

$\lambda=0$ または $\sigma=0$ の一定速度は、[前講の一定速度命題](../U3-61/index.md#prop-u3-61-uniform-speed)とも一致します。$\lambda$ を極端に大きくすると初期区間への集中が増えますが、板の有限流動性や速度上限はここでは仮定していません。制約を加えるのは次講です。

## 7. Python実験：解析解と三重対角系の数値比較

二つの独立した求解法を使います。（1）主対角 $2+r$・上下対角 $-1$ の三重対角方程式を前進消去・後退代入で解く。（2）[解析解](#thm-u3-62-exact)の $\sinh$ 比を数値評価する。残在庫・売却量、$E[C]$、$\operatorname{Var}(C)$、目的値、連立方程式の最大残差、解析解との最大差を表示します。

~~~python-file-lab
# lab-id: u3-62-almgren-chriss
# lab-title: Almgren–Chriss 在庫・リスク・三重対角検算
# lab-file: textbook/volumes/dream_thater/応用系/U/U3-62/assets/almgren_chriss.py
# lab-preset: リスク中立の一定速度 | --risk-aversion 0
# lab-preset: 分散重視係数1 | --risk-aversion 1
# lab-preset: 分散重視係数4 | --risk-aversion 4
# lab-preset: 2区間の手計算 | --periods 2 --risk-aversion 1
# lab-timeout-ms: 30000
~~~

数値は単一銘柄100株・2時間・4等間隔、$\eta=0.01,\gamma=0.002,\sigma=0.1,\lambda=1$（単位は本講の通り）を既定値とします。表形式で在庫の大小と差分を直接確認できるため、装飾的な図は置きません。Python標準ライブラリだけで動作します。

~~~text
python assets/almgren_chriss.py --quantity 100 --periods 4 --hours 2 --risk-aversion 1
python -m unittest discover -s assets/tests -v
~~~

## 8. 演習と詳細解答

### Level A：定義・数量・単位

<a id="ex-u3-62-a1"></a>
### U3-62-A1：現金と在庫の照合
- Level: A

$Q=100$ 株、$N=2$、$T=2$ 時間、$x=(100,60,0)$ 株、$p=(99.56,99.26)$ 円／株、到着価格100円／株とする。非負制約・各区間の売却量・累積受取額・執行費用を求めよ。

<!-- solution-start -->
**詳細解答**：[在庫定義](#def-u3-62-cash)で $100\ge60\ge0$、$x_0=100,x_2=0$ です。$q_1=100-60=40$、$q_2=60-0=60$ 株で総量100株。$R_1=40(99.56)=3,982.4$ 円、$R_2=3,982.4+60(99.26)=9,938$ 円。$C=100(100)-9,938=62$ 円です。
<!-- solution-end -->

<a id="ex-u3-62-a2"></a>
### U3-62-A2：平均と分散を別々に評価
- Level: A

$Q=100,N=2,\Delta=1,x=(100,50,0),\gamma=0.002,\eta=0.01,\sigma=0.1$（本講の単位）として、平均費用・分散・標準偏差を求めよ。

<!-- solution-start -->
**詳細解答**：[費用・分散命題](#prop-u3-62-cost-risk)で恒久項 $0.002(100^2)/2=10$ 円、一時項 $0.01(50^2+50^2)=50$ 円なので $E[C]=60$ 円。$\operatorname{Var}(C)=0.1^2(100^2+50^2)=125$ 円²、標準偏差 $\sqrt{125}=5\sqrt5\simeq11.18$ 円です。標準偏差と分散の単位は異なります。
<!-- solution-end -->

<a id="ex-u3-62-a3"></a>
### U3-62-A3：リスク係数の次元
- Level: A

$\gamma,\eta,\sigma,\lambda$ の単位を記し、$r=\lambda\sigma^2\Delta^2/\eta$ が無次元であることを示せ。

<!-- solution-start -->
**詳細解答**：$\gamma$ は円／株²、$\eta$ は円・時間／株²、$\sigma$ は円／株／$\sqrt{\text{時間}}$、$\lambda$ は1／円。分子の次元は $(1/\text{円})[\text{円}^2/(\text{株}^2\text{時間})]\text{時間}^2=\text{円}\cdot\text{時間}/\text{株}^2$ で $\eta$ と同じなので $r$ は無次元です。$\lambda\operatorname{Var}(C)$ も円となり $E[C]$ に足せます。
<!-- solution-end -->

<a id="ex-u3-62-a4"></a>
### U3-62-A4：分散重視係数ゼロ
- Level: A

$N=2,Q>0,\lambda=0,\eta>0$ なら最適 $x_1$ と $q_1,q_2$ を[三重対角系](#thm-u3-62-tridiagonal)から求めよ。

<!-- solution-start -->
**詳細解答**：$\lambda=0$ なので $r=0$。内部方程式は $-Q+2x_1-0=0$ で $x_1=Q/2$。$q_1=Q-x_1=Q/2$、$q_2=x_1=Q/2$ と正で、一定速度です。[解析解](#thm-u3-62-exact)の $r=0$ の場合と一致します。
<!-- solution-end -->

<a id="ex-u3-62-a5"></a>
### U3-62-A5：分散重視の二期間解
- Level: A

$N=2,Q=100,\Delta=1,\eta=0.01,\sigma=0.1,\lambda=1$／円の最適在庫と二つの売却量を求め、非負性を検査せよ。

<!-- solution-start -->
**詳細解答**：$r=(1)(0.1^2)(1^2)/0.01=1$。$-100+(2+1)x_1-0=0$ から $x_1=100/3$ 株。$q_1=100-100/3=200/3$ 株、$q_2=100/3$ 株はいずれも正で、端点は $(100,0)$、総売却量は100株です。
<!-- solution-end -->

### Level B：根拠・適用条件・収束

<a id="ex-u3-62-b1"></a>
### U3-62-B1：3区間の三重対角系
- Level: B

$N=3,r=1,Q>0$ のとき $x_1,x_2$ と全売却量を連立方程式から求め、売り制約を検証せよ。

<!-- solution-start -->
**詳細解答**：[最適性方程式](#thm-u3-62-tridiagonal)から $3x_1-x_2=Q$、$-x_1+3x_2=0$。後者から $x_1=3x_2$、前者より $9x_2-x_2=Q$、従って $x_2=Q/8,x_1=3Q/8$。売却量は $q_1=5Q/8,q_2=Q/4,q_3=Q/8$ で全て正、和は $(5+2+1)Q/8=Q$。端点 $x_0=Q,x_3=0$ も満たします。
<!-- solution-end -->

<a id="ex-u3-62-b2"></a>
### U3-62-B2：frontierを証明する
- Level: B

$0\le\lambda_a<\lambda_b$ の二つの最適解の期待費用・分散を $(E_a,V_a),(E_b,V_b)$ として、二つの最適性不等式から $V_b\le V_a,E_b\ge E_a$ を示せ。

<!-- solution-start -->
**詳細解答**：[目的の定義](#def-u3-62-objective)より $E_a+\lambda_aV_a\le E_b+\lambda_aV_b$、$E_b+\lambda_bV_b\le E_a+\lambda_bV_a$ です。足し合わせると $(\lambda_b-\lambda_a)(V_b-V_a)\le0$ で、$\lambda_b-\lambda_a>0$ だから $V_b\le V_a$。第一式を変形すると $E_b-E_a\ge\lambda_a(V_a-V_b)\ge0$ なので $E_b\ge E_a$ です。正規分布は使っていません。
<!-- solution-end -->

<a id="ex-u3-62-b3"></a>
### U3-62-B3：連続問題の停留方程式
- Level: B

$F(x)=\eta\int_0^T(x')^2dt+\lambda\sigma^2\int_0^Tx^2dt$、$x(0)=Q,x(T)=0$ を変分し、$\lambda=0$ の最適経路を導け。

<!-- solution-start -->
**詳細解答**：[連続問題](#prop-u3-62-continuous)で端点0の変分 $h$ を加えると一次係数は $2\eta\int x'h'+2\lambda\sigma^2\int xh$。部分積分 $\int x'h'=[x'h]_0^T-\int x''h=-\int x''h$ により $-\eta x''+\lambda\sigma^2x=0$。$\lambda=0$ なら $x''=0$ で $x=a+bt$。$x(0)=Q$ より $a=Q$、$x(T)=0$ より $b=-Q/T$、従って $x(t)=Q(1-t/T)$ です。
<!-- solution-end -->

<a id="ex-u3-62-b4"></a>
### U3-62-B4：先読みが破る仮定
- Level: B

二期間で、最初の価格ショックを見てから最初の期間の売却量を決める案と、最初の売却後に二回目の数量を変更する案が、どの仮定に抵触するか説明せよ。

<!-- solution-start -->
**詳細解答**：第1案は既に起きた第1期間の価格変化を見てその期間の売却量を決めるため時間順序に反します。第2案では全量売却 $q_1+q_2=Q$ と第1期間の確定約定 $q_1$ を両立する限り、$q_2=Q-q_1$ は確定していて自由に変えられません。未約定を許せば期末 $x_2=0$ や確実な全量約定が破れます。さらに多数期間で価格に応じた将来在庫を選ぶ場合、在庫は確率変数となり[確定在庫を用いた分散証明](#prop-u3-62-cost-risk)の単純な和を流用できません。
<!-- solution-end -->

### Level C：最適性と実現値を区別する

<a id="ex-u3-62-c1"></a>
### U3-62-C1：平均–分散最適でも実現コスト最小とは限らない
- Level: C

$Q=100$ 株、$N=2,T=2$ 時間、$S_0=100$ 円／株、$\gamma=0.002,\eta=0.01,\sigma=0.1,\lambda=1$（本講の単位）とする。独立、平均0、分散 $\sigma^2\Delta$ の外生増分について、実現値が $(\varepsilon_1,\varepsilon_2)=(+0.10,-0.05)$ 円／株だった。

1. 最適方程式から二期間の売却予定を求め、非負制約を検証せよ。
2. 最適予定と均等予定それぞれの期待費用、分散、目的値を求めよ。
3. 両方の実現コストを計算し、事前の最適予定がその実現値で最安でなくても矛盾しない理由を説明せよ。

<!-- solution-start -->
**詳細解答**：

**1. 最適予定**。$\Delta=T/N=1$、$r=\lambda\sigma^2\Delta^2/\eta=1$ なので [最適性方程式](#thm-u3-62-tridiagonal)は $-100+3x_1=0$。$x=(100,100/3,0)$、$q=(200/3,100/3)$ 株で、両方正、合計100株です。

**2. 事前評価**。[費用と分散](#prop-u3-62-cost-risk)により恒久費用は両予定で $0.002(100)^2/2=10$ 円。最適予定の一時費用は $0.01[(200/3)^2+(100/3)^2]=500/9$ 円だから

$$
E[C_*]=\frac{590}{9}\simeq65.56\ \text{円},\quad
V_* =0.01\left[100^2+\left(\frac{100}{3}\right)^2\right]=\frac{1000}{9}\simeq111.11\ \text{円}^2.
$$

従って $J_1(x_*)=1590/9\simeq176.67$ 円。均等予定 $(50,50)$ の場合は $E[C_{\mathrm{eq}}]=10+0.01(50^2+50^2)=60$ 円、$V_{\mathrm{eq}}=0.01(100^2+50^2)=125$ 円²、$J_1(x_{\mathrm{eq}})=185$ 円。差 $185-1590/9=25/3$ 円だけ最適予定の目的値が小さいです。

**3. 実現値**。[在庫和](#prop-u3-62-cost-risk)の外生項は、最適予定で $-100(0.10)-(100/3)(-0.05)=-10+5/3=-25/3$ 円。従って $C_*=590/9-25/3=515/9\simeq57.22$ 円です。均等予定では外生項 $-100(0.10)-50(-0.05)=-7.5$ 円なので $C_{\mathrm{eq}}=60-7.5=52.5$ 円。この特定の実現値では均等予定が安くなりましたが、$\lambda$ 付き目的は事前の期待費用と分散を比べるため、毎回の実現コストの最小性を保証しません。未来のショックを見てから過去の売却量を選び直すこともできません。
<!-- solution-end -->

## まとめと次講

- 自己金融的な売却代金から、価格ショックに掛かる**売却前在庫**が自然に現れます。
- 期待費用と分散の二次式から正定値三重対角系を導き、双曲線関数の解が非負売却の制約を満たします。
- 離散解析解は連続時間の境界値問題へ収束しますが、有限分割の最初の区間のリスクは連続積分と同一視できません。
- 分散への重みを大きくすれば最適分散は増えず、期待費用は下がりません。実現コストの経路ごとの最安性とは異なります。

次講 **U3-63「最適執行の数値最適化と感度」** では、流動性の変動、速度上限、参加率、端末在庫制約を加えて解析解から数値最適化へ進みます。
