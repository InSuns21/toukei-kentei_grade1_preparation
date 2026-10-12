# NDA8 計量的Diophantine近似

[無理性指数](../NDA5/index.md#def-nda5-irrationality-exponent)は一つの無理数がどれほど良く有理近似されるかを表します。[Rothの定理](../NDA7/index.md#thm-nda7-roth)は代数的無理数の指数が2だと教えます。しかし、超越数を含む実数全体ではどうでしょうか。個々の数の式を見つけられなくても、実数の「大部分」について一度に結論を出せるでしょうか。

ここでは長さを確率として扱い、分母ごとの「良すぎる近似」の区間を足し合わせます。有限の総和から零測度を導くBorel–Cantelliの議論がまず働きます。一方、総和の発散だけで近似が無限回起こるとは限りません。後半で扱う主定理の発散方向では、既約分数の間隔、二つの近似集合の交わり、Cauchy–Schwarzの不等式を組み合わせて、実際に全測度を示します。

## 1. 有理数のまわりに短い区間を置く

単位区間 $[0,1]$ に長さを正規化したLebesgue測度 $\lambda$ を用います。長さ0の集合を零測度集合、補集合が零測度の集合を全測度集合と呼びます。これは「すべての点」と「ほとんどすべての点」を区別する方法です。[測度零集合とa.e.の用語](../../../解析系/MT/MT1/index.md#def-mt1-ae)を思い出してください。

分母 $q$ を固定して有理数 $p/q$ の周囲に半径 $\psi(q)/q$ の区間を置きます。$\psi(q)$ が小さくなるほど、近似に求める精度は厳しくなります。

<a id="def-nda8-psi-approximable"></a>

<!-- formal-statement-start -->
> **定義（近似関数と無限回近似集合）**  
> $\psi:\mathbb Z_{>0}\to(0,\infty)$ を関数とする。各正整数 $q$ に対し、$[0,1]$ の部分集合 $E_q(\psi)$ および無限回近似集合 $W(\psi)$ を次で定める。

$$
E_q(\psi)=\bigcup_{p=0}^{q}
\left(\frac pq-\frac{\psi(q)}q,\,
\frac pq+\frac{\psi(q)}q\right)\cap[0,1],
$$

$$
W(\psi)=\bigcap_{N=1}^{\infty}\bigcup_{q=N}^{\infty}E_q(\psi).
$$

> つまり $x\in W(\psi)$ であるとは、正整数 $q$ が無限個存在し、ある整数 $p$ について $|x-p/q|<\psi(q)/q$ となることをいう。$\psi$ が非増加とは $\psi(q+1)\le\psi(q)$ がすべての $q$ で成立することである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nda8-psi-approximable -->
### 直接例：分母3と無限回近似

**定義の確認**：分母を固定したときの近似区間、近似関数の非増加性、無限回集合の三点を次に確認します。

$\psi(q)=1/q$ なら、$q=3$ では半径は $1/9$ であり、

$$
E_3(\psi)=\bigcup_{p=0}^{3}
\left(\frac p3-\frac19,\,\frac p3+\frac19\right)\cap[0,1].
$$

これは定義の「分母を固定し、$p=0,\ldots,q$ を動かす」手順そのものです。さらに無理数 $x\in[0,1]$ に対しては、[Dirichletの近似下界](../NDA5/index.md#thm-nda5-dirichlet-lower-bound)から $|x-p/q|<1/q^2$ となる相異なる既約分数が無限にあります。したがって $\psi(q)=1/q$ の場合、すべての無理数 $x$ が $W(\psi)$ に入ります。「一つの分母で近似できた」と「無限に多くの分母で近似できる」は別条件です。
<!-- definition-example-end -->

各 $E_q(\psi)$ は開区間と $[0,1]$ の共通部分の有限和なのでLebesgue可測です。$W(\psi)$ も可算回の和と共通部分で作られるため可測です。重なりを無視して長さを足すと

$$
\lambda(E_q(\psi))
\le (q+1)\frac{2\psi(q)}q
\le4\psi(q)\qquad(q\ge1).
$$

この上界は、区間が互いに重なる場合にも成立します。

## 2. 総和が有限なら無限回は起こらない

<a id="lem-nda8-borel-cantelli"></a>

<!-- formal-statement-start -->
> **補題（Borel–Cantelliの第一補題）**  
> 測度空間 $(X,\mathcal A,\nu)$ の可測集合列 $(A_n)_{n\ge1}$ について、$\sum_{n=1}^{\infty}\nu(A_n)<\infty$ ならば、

$$
\nu\left(\bigcap_{N=1}^{\infty}\bigcup_{n=N}^{\infty}A_n\right)=0.
$$

> 集合列の独立性は仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

無限に多くの $A_n$ に入る点は、どの $N$ より先にも必ず一度入ります。したがって無限回集合は各尾部の合併に含まれ、その測度は尾部級数以下です。

<!-- proof-start -->
### 証明

$B=\bigcap_{N\ge1}\bigcup_{n\ge N}A_n$ と置きます。任意の $N\ge1$ に対して $B\subseteq\bigcup_{n\ge N}A_n$ であるから、測度の単調性と劣加法性によって

$$
0\le\nu(B)\le\nu\left(\bigcup_{n=N}^{\infty}A_n\right)
\le\sum_{n=N}^{\infty}\nu(A_n).
$$

右端は非負項の収束級数の尾部ですから $N\to\infty$ とすると0になります。$\nu(B)$ は $N$ に依存しないため $\nu(B)=0$ です。
<!-- proof-end -->

<a id="prop-nda8-khintchine-convergence"></a>

<!-- formal-statement-start -->
> **命題（Khintchineの収束方向）**  
> 任意の関数 $\psi:\mathbb Z_{>0}\to(0,\infty)$ に対し、$\sum_{q=1}^{\infty}\psi(q)<\infty$ ならば $\lambda(W(\psi))=0$ である。単調性は不要である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

第1節で計算した $\lambda(E_q(\psi))\le4\psi(q)$ から

$$
\sum_{q=1}^{\infty}\lambda(E_q(\psi))
\le4\sum_{q=1}^{\infty}\psi(q)<\infty.
$$

[第一補題](#lem-nda8-borel-cantelli)へ $X=[0,1]$、$\nu=\lambda$、$A_q=E_q(\psi)$ を代入します。左辺の無限回集合は[定義](#def-nda8-psi-approximable)そのものの $W(\psi)$ なので結論を得ます。
<!-- proof-end -->

たとえば $\psi(q)=q^{-1-\varepsilon}$ では、収束する級数 $\sum_q q^{-1-\varepsilon}$ を使えます。長さを足すだけで「指数 $2+\varepsilon$ の近似を無限回受ける数」は零測度と分かります。

## 3. ほとんどすべての無理性指数は2

<a id="thm-nda8-ae-exponent"></a>

<!-- formal-statement-start -->
> **定理（ほとんどすべての実数の無理性指数）**  
> Lebesgue測度に関して、ほとんどすべての $x\in[0,1]$ は無理数であり、その[無理性指数](../NDA5/index.md#def-nda5-irrationality-exponent)は

$$
\mu(x)=2
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

下界 $\mu(x)\ge2$ は各無理数に対するDirichlet近似です。上界は整数 $m\ge1$ ごとに指数 $2+1/m$ の近似が無限回起きる例外集合を零測度とし、それらの可算和を除きます。

<!-- proof-start -->
### 証明

整数 $m\ge1$ を固定して、$\psi_m(q)=q^{-1-1/m}$ と置きます。この関数について

$$
\frac{\psi_m(q)}q=q^{-2-1/m},\qquad
\sum_{q=1}^{\infty}\psi_m(q)
=\sum_{q=1}^{\infty}q^{-1-1/m}<\infty.
$$

[収束方向](#prop-nda8-khintchine-convergence)から $\lambda(W(\psi_m))=0$ です。そこで

$$
N=\mathbb Q\cap[0,1]\ \cup\ \bigcup_{m=1}^{\infty}W(\psi_m)
$$

と置きます。有理数集合は可算であり各一点集合は零測度なので $\lambda(\mathbb Q\cap[0,1])=0$、可算劣加法性から $\lambda(N)=0$ です。

$x\in[0,1]\setminus N$ は無理数です。[Dirichletの普遍下界](../NDA5/index.md#thm-nda5-dirichlet-lower-bound)により $\mu(x)\ge2$ です。逆に $\mu(x)>2$ と仮定します。ある整数 $m$ で $2+1/m<\mu(x)$ を選べます。上限としての[無理性指数の定義](../NDA5/index.md#def-nda5-irrationality-exponent)から、ある $\nu>2+1/m$ に対して

$$
\left|x-\frac pq\right|<q^{-\nu}
$$

となる相異なる既約分数が無限にあります。$q=1$ の有理数は $[0,1]$ では有限個であり、したがって $q\ge2$ のものが無限にあります。それらは $q^{-\nu}<q^{-2-1/m}$ も満たすため $x\in W(\psi_m)$ となり、$x\notin N$ に矛盾します。よって $\mu(x)\le2$ です。
<!-- proof-end -->

例外集合は空ではありません。[Liouville数](../NDA6/index.md#def-nda6-liouville-number)は無理性指数が無限大だからです。この違いは「ほとんどすべて」と「すべて」の差であり、例外が多くても測度が0ということは起こり得ます。

## 4. なぜ発散方向には新しい議論が要るのか

$\sum_q\lambda(E_q)=\infty$ というだけでは $\lambda(\limsup E_q)>0$ すら言えません。たとえば $A_n=(0,1/n)$ なら $\sum_n\lambda(A_n)=\infty$ ですが、どの $x>0$ も有限回しか入りません。ここで足りないのは、集合どうしの**重なりの制御**です。

発散方向の証明には、分母が大きい有理数の周りの区間が単位区間内に広く分布することを使います。具体的には、同じ大きさの分母をまとめた「1ブロック」で十分な長さを確保し、異なるブロックの重なりを二乗平均で抑えます。

<a id="lem-nda8-reduced-rational-count"></a>

<!-- formal-statement-start -->
> **補題（分母を倍幅に制限した既約分数の個数）**  
> $J\subset(0,1)$ を長さ $|J|>0$ の開区間とする。十分大きい整数 $Q$ に対し、$Q/2<q\le Q$、$0<p<q$、$\gcd(p,q)=1$、$p/q\in J$ を満たす組 $(p,q)$ の個数 $t_Q(J)$ は、$J$ に依存しない絶対定数 $c_0,C_0>0$ を使い、

$$
c_0|J|Q^2\le t_Q(J)\le C_0|J|Q^2
$$

> と評価できる。ただし「十分大きい」の下限は $J$ に依存してよい。また、これらの相異なる既約分数の距離は $Q^{-2}$ 以上である。
<!-- formal-statement-end -->

### 証明の見取り図

最初に互いに素という条件を忘れて整数格子点を数えます。共通因子 $d\ge2$ を持つ組の数を、すべての $d$ について上から引きます。級数 $\sum_{d=2}^{\infty}d^{-2}$ が1未満であることが、正の割合が残る理由です。

<!-- proof-start -->
### 証明

$J=(a,b)$、$|J|=b-a$ とします。整数 $q$ に対して $aq<p<bq$ の整数 $p$ の個数は $|J|q+O(1)$ です。ここで $O(1)$ の絶対値は2以下に取れます。したがって互いに素条件を外した組の個数 $T_Q$ は

$$
T_Q=|J|\sum_{Q/2<q\le Q}q+O(Q)
=\frac{3}{8}|J|Q^2+O(Q).
$$

共通因子 $d\ge2$ を持つ組 $(p,q)$ は $p=du,q=dv$ と書けます。そのような組の個数は、分母 $v$ が $Q/(2d)<v\le Q/d$ にある格子点数以下です。各 $v$ について候補 $u$ は $|J|v+O(1)$ 個なので

$$
T_{Q,d}\le\frac{3}{8}|J|\frac{Q^2}{d^2}
+O\left(\frac Qd+1\right).
$$

$d\le Q$ だけが可能です。$\sum_{d=2}^{\infty}d^{-2}\le1/4+\int_2^\infty t^{-2}\,dt=3/4$、また $\sum_{d=2}^Qd^{-1}\le1+\log Q$ を用いると、非既約な組の総数は重複を許して

$$
\sum_{d=2}^{Q}T_{Q,d}
\le\frac{9}{32}|J|Q^2+O(Q\log Q).
$$

従って

$$
t_Q(J)\ge T_Q-\sum_{d=2}^{Q}T_{Q,d}
\ge\frac{3}{32}|J|Q^2-O(Q\log Q).
$$

$J$ を固定して $Q$ を十分大きくすれば $c_0=3/64$ と取れます。上界は $t_Q(J)\le T_Q$ から $C_0=1$ などと取れます。

最後に異なる既約分数 $p/q$ と $p'/q'$ について、整数 $pq'-p'q$ は0でないから

$$
\left|\frac pq-\frac{p'}{q'}\right|
=\frac{|pq'-p'q|}{qq'}
\ge\frac1{Q^2}.
$$

この分離は個数の評価と独立に成立します。
<!-- proof-end -->

上記の $O$ は、絶対値がある普遍定数倍以下であることを表す記法です。証明の要点は、単なる「稠密」ではなく、**個数が $Q^2$ に比例し、かつ間隔が $Q^{-2}$ 以上**という二つの定量評価を同時に得たことです。

## 5. 発散する集合列を測度へ戻す

<a id="lem-nda8-second-moment"></a>

<!-- formal-statement-start -->
> **補題（二乗平均による無限回集合の下界）**  
> 有限測度空間 $(X,\mathcal A,\nu)$ における可測集合列 $(F_k)_{k\ge1}$ を取る。各整数 $m\le n$ に対して

$$
S_{m,n}=\sum_{k=m}^n\nu(F_k),\qquad
T_{m,n}=\sum_{k=m}^n\sum_{\ell=m}^n\nu(F_k\cap F_\ell)
$$

> と置く。$\sum_k\nu(F_k)=\infty$ であり、ある $C>0$ に対しすべての十分大きい $n\ge m$ で $T_{m,n}\le C(S_{m,n}+S_{m,n}^2)$ が成り立つなら、

$$
\nu\left(\limsup_{k\to\infty}F_k\right)\ge C^{-1}.
$$

> ただし $C$ は必要なら増やしてよく、結論の下界は $\nu(X)$ を超えない範囲で解釈する。
<!-- formal-statement-end -->

### 証明の見取り図

被覆される回数 $Z=\sum_k1_{F_k}$ の積分を一乗と二乗で計算します。Cauchy–Schwarzの不等式に $Z$ と $1_{\{Z>0\}}$ を代入すると、重複を抑えられるほど和集合が大きいと分かります。

<!-- proof-start -->
### 証明

固定した $m\le n$ に対し $Z=\sum_{k=m}^n1_{F_k}$ と置くと

$$
\int_X Z\,d\nu=S_{m,n},\qquad
\int_X Z^2\,d\nu=T_{m,n}.
$$

$Z=Z1_{\{Z>0\}}$ にCauchy–Schwarzを適用すると

$$
S_{m,n}^2
=\left(\int_X Z1_{\{Z>0\}}\,d\nu\right)^2
\le T_{m,n}\,\nu\left(\bigcup_{k=m}^nF_k\right).
$$

従って、$S_{m,n}>0$ であるとき

$$
\nu\left(\bigcup_{k=m}^nF_k\right)
\ge\frac{S_{m,n}^2}{T_{m,n}}
\ge\frac1C\,\frac{S_{m,n}}{1+S_{m,n}}.
$$

$m$ を固定して $n\to\infty$ とすれば $S_{m,n}\to\infty$ なので、尾部の合併の測度は $C^{-1}$ 以上です。有限測度の下での上からの連続性により

$$
\nu\left(\bigcap_{m=1}^{\infty}\bigcup_{k=m}^{\infty}F_k\right)
=\lim_{m\to\infty}\nu\left(\bigcup_{k=m}^{\infty}F_k\right)
\ge C^{-1}.
$$

これで下界を得ました。
<!-- proof-end -->

ここでは一般の集合列に対して「独立」を要求せず、実際に必要な交わりの上界を明示しました。次節では、既約分数の間隔だけからこの上界を確かめます。

<a id="lem-nda8-dyadic-overlap"></a>

<!-- formal-statement-start -->
> **補題（分母の二進ブロックの交わり評価）**  
> $\psi:\mathbb Z_{>0}\to(0,\infty)$ を非増加関数とする。任意の開区間 $I\subset(0,1)$ に対し、十分大きい $k$ について可測集合 $F_k\subset I$ と数 $a_k>0$ を構成でき、絶対定数 $c,C>0$ を用いて次を満たす。

$$
c|I|a_k\le\lambda(F_k)\le C|I|a_k,
$$

$$
\lambda(F_k\cap F_\ell)
\le C|I|\left(a_ka_\ell+4^{k}\rho_\ell\right)
\qquad(k<\ell),
$$

> ここで $Q_k=2^k$、$\rho_k=\min\{\psi(Q_k)/Q_k,\ 1/(8Q_k^2)\}$、$a_k=Q_k^2\rho_k$ とする。また $F_k$ に無限回入る点は $W(\psi)$ に入る。
<!-- formal-statement-end -->

### 証明の見取り図

区間 $I$ の中央半分を $J$ とします。$Q_k/2<q\le Q_k$ の既約分数を中心とし、共通半径 $\rho_k$ を与えます。同一ブロックの区間は離れ、別ブロックでは中心間隔によって交差する区間の個数を数えられます。

<!-- proof-start -->
### 証明

$I=(u,v)$ として $J=(u+(v-u)/4,\,v-(v-u)/4)$ と置きます。$|J|=|I|/2$ です。$k$ を大きく取れば $\rho_k\le1/(8Q_k^2)$ は $J$ と $I$ の境界間隔より小さくなります。

[既約分数の個数補題](#lem-nda8-reduced-rational-count)を $J$、$Q=Q_k$ に適用し、条件を満たす中心 $p/q$ について半径 $\rho_k$ の開区間を全部集めて $F_k$ とします。中心の個数を $t_k$ とすると、ある絶対定数 $c_1,C_1>0$ で

$$
c_1|I|Q_k^2\le t_k\le C_1|I|Q_k^2.
$$

中心間距離は $Q_k^{-2}$ 以上であり、$2\rho_k\le(4Q_k^2)^{-1}$ なので同一ブロックの区間は互いに素です。従って

$$
\lambda(F_k)=2t_k\rho_k,\qquad
2c_1|I|a_k\le\lambda(F_k)\le2C_1|I|a_k.
$$

$k<\ell$ とします。$\ell$ 番目の異なる中心は $Q_\ell^{-2}$ 以上離れています。一つの $k$ 番目の区間と交差し得る $\ell$ 番目の中心は、長さ $2(\rho_k+\rho_\ell)$ の区間内にあります。間隔の下界と $\rho_\ell Q_\ell^2\le1/8$ から、その個数は

$$
1+2(\rho_k+\rho_\ell)Q_\ell^2
\le2+2\rho_kQ_\ell^2
$$

以下です。交わりの長さは各々 $2\rho_\ell$ 以下なので、$k$ 番目の区間 $t_k$ 個を足し、

$$
\begin{aligned}
\lambda(F_k\cap F_\ell)
&\le t_k(2+2\rho_kQ_\ell^2)\,2\rho_\ell\\
&\le 4C_1|I|\left(Q_k^2\rho_\ell+
  Q_k^2\rho_kQ_\ell^2\rho_\ell\right)\\
&=4C_1|I|(Q_k^2\rho_\ell+a_ka_\ell).
\end{aligned}
$$

最後に、$F_k$ 内の点には $Q_k/2<q\le Q_k$ のある既約分数 $p/q$ があり、

$$
\left|x-\frac pq\right|
<\rho_k\le\frac{\psi(Q_k)}{Q_k}
\le\frac{\psi(q)}q
$$

です。最後の不等号で $\psi$ の非増加性と $q\le Q_k$ を使いました。異なる $k$ の分母帯は互いに重ならないので、無限個の $F_k$ に入れば異なる分母の近似が無限個あります。したがって $\limsup F_k\subset W(\psi)$ です。
<!-- proof-end -->

## 6. Khintchineの定理の収束・発散両方向

<a id="lem-nda8-local-to-full"></a>

<!-- formal-statement-start -->
> **補題（全区間で正の割合なら全測度）**  
> 可測集合 $A\subset[0,1]$ と定数 $c>0$ があり、任意の開区間 $I\subset(0,1)$ に対して $\lambda(A\cap I)\ge c|I|$ が成り立つなら $\lambda(A)=1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

補集合が正の長さを持てば、ほとんど補集合で埋まった小区間が存在します。後半はLebesgue測度の外正則性を使ってその存在を直接示し、密度定理を暗黙に使わないようにします。

<!-- proof-start -->
### 証明

$B=[0,1]\setminus A$ とします。仮に $\lambda(B)>0$ とします。任意の $0<\eta<c$ に対し、ある二進区間 $D\subset(0,1)$ で

$$
\lambda(B\cap D)>(1-\eta)|D|
$$

となることを示します。もしすべての二進区間 $D$ で逆向きの不等式 $\lambda(B\cap D)\le(1-\eta)|D|$ が成り立つなら、Lebesgue測度の外正則性により、任意の $\delta>0$ に対して開集合 $U\supset B$ を $\lambda(U)<\lambda(B)+\delta$ となるよう選べます。$U\cap(0,1)$ は互いに素な二進区間の可算合併で端点を除いて覆えます。各区間に仮定を適用し、可算加法性から

$$
\lambda(B)\le(1-\eta)\lambda(U)
<(1-\eta)(\lambda(B)+\delta).
$$

$\delta\downarrow0$ で $\lambda(B)\le(1-\eta)\lambda(B)$ となり、$\lambda(B)>0$ に矛盾します。二進区間の端点は可算なので測度に影響しません。

そこで上の $D$ を取ると、$\lambda(A\cap D)=|D|-\lambda(B\cap D)<\eta|D|<c|D|$ です。一方、仮定を $I=D$ の内部へ適用すると、端点は零測度なので $\lambda(A\cap D)\ge c|D|$ となり矛盾します。よって $\lambda(B)=0$ です。
<!-- proof-end -->

<a id="thm-nda8-khintchine"></a>

<!-- formal-statement-start -->
> **定理（Khintchineの定理：一次元・斉次近似）**  
> $\psi:\mathbb Z_{>0}\to(0,\infty)$ を非増加関数とし、[無限回近似集合](#def-nda8-psi-approximable)を $W(\psi)$ とする。このときLebesgue測度について

$$
\lambda(W(\psi))=
\begin{cases}
0,&\displaystyle\sum_{q=1}^{\infty}\psi(q)<\infty,\\[3pt]
1,&\displaystyle\sum_{q=1}^{\infty}\psi(q)=\infty.
\end{cases}
$$
<!-- formal-statement-end -->

### 証明の見取り図

収束方向は[第一補題](#lem-nda8-borel-cantelli)によって既に終わりました。発散方向は二進ブロックの集合 $F_k$ の長さの和が発散することを示し、交差総和を二乗和で評価して各区間の中に一定割合の無限回近似点を確保します。その割合が区間に依存しないことから全測度となります。

<!-- proof-start -->
### 証明

収束の場合は[収束命題](#prop-nda8-khintchine-convergence)を使います。以下では $\sum_q\psi(q)=\infty$ と仮定します。

任意の開区間 $I\subset(0,1)$ を固定し、[二進ブロック補題](#lem-nda8-dyadic-overlap)の集合 $F_k$ を十分大きな $k\ge K(I)$ について取ります。補題での記号を使って

$$
a_k=\min\left\{2^k\psi(2^k),\,\frac18\right\}.
$$

非増加関数 $\psi$ に対する級数の二進ブロック比較を確認します。$2^{k-1}<q\le2^k$ では $\psi(2^k)\le\psi(q)\le\psi(2^{k-1})$ ですから

$$
2^{k-1}\psi(2^k)
\le\sum_{q=2^{k-1}+1}^{2^k}\psi(q)
\le2^{k-1}\psi(2^{k-1}).
$$

これを足し合わせると $\sum_q\psi(q)$ と $\sum_k2^k\psi(2^k)$ は同時に発散します。非負数列の発散は定数 $1/8$ で各項を切り詰めても保たれるので $\sum_ka_k=\infty$ です。実際、$2^k\psi(2^k)\ge1/8$ の項が無限個あれば明らかであり、有限個しかなければ末尾で切り詰めが起きません。

$m\ge K(I)$ を固定し、$S=\sum_{k=m}^na_k$ と置きます。[交差の評価](#lem-nda8-dyadic-overlap)と対角項の長さから、絶対定数 $C_2$ について

$$
\begin{aligned}
\sum_{k,\ell=m}^n\lambda(F_k\cap F_\ell)
&\le C_2|I|\left(S+S^2+
\sum_{\ell=m}^n\rho_\ell\sum_{k=m}^{\ell-1}4^k\right).
\end{aligned}
$$

内側は等比級数です。$4^k$ の和は $4^\ell/3$ 以下なので

$$
\sum_{\ell=m}^n\rho_\ell\sum_{k=m}^{\ell-1}4^k
\le\frac13\sum_{\ell=m}^n4^\ell\rho_\ell
=\frac13 S.
$$

よって $T_{m,n}\le C_3|I|(S+S^2)$ です。一方 $\sum_{k=m}^n\lambda(F_k)\ge c_2|I|S$ ですから、Cauchy–Schwarzの計算（[二乗平均の補題](#lem-nda8-second-moment)の証明）を直接適用して

$$
\begin{aligned}
\lambda\left(\bigcup_{k=m}^nF_k\right)
&\ge\frac{\left(\sum_{k=m}^n\lambda(F_k)\right)^2}{T_{m,n}}\\
&\ge \frac{c_2^2}{C_3}|I|\frac{S^2}{S+S^2}.
\end{aligned}
$$

$n\to\infty$ では $S\to\infty$ なので、$c=c_2^2/C_3>0$ と置けば、尾部の合併の測度は $c|I|$ 以上です。さらに $m\to\infty$ として上からの連続性を用いると

$$
\lambda\left(I\cap\limsup_{k\to\infty}F_k\right)\ge c|I|.
$$

[二進ブロック補題](#lem-nda8-dyadic-overlap)の最後で $\limsup F_k\subset W(\psi)$ を示したので、任意の開区間 $I$ で $\lambda(W(\psi)\cap I)\ge c|I|$ です。定数 $c$ は $I$ に依存しません。[全区間から全測度への補題](#lem-nda8-local-to-full)によって $\lambda(W(\psi))=1$ を得ます。
<!-- proof-end -->

この証明では $\psi$ の単調性を、ブロック比較と $\psi(Q_k)/Q_k\le\psi(q)/q$ の**二か所**で使いました。収束方向には不要でした。したがって「和が発散するから第二Borel–Cantelliで全測度」とだけ書くのは正当な証明ではありません。

### 対数が一つ違うだけで結論が変わる

$q\ge3$ に対して $\psi_1(q)=1/(q\log q)$、$\psi_2(q)=1/(q(\log q)^2)$ とし、$q=1,2$ の値を単調性を保つよう補います。両者は正かつ非増加であり、

$$
\sum_{q=3}^\infty\frac1{q\log q}=\infty,\qquad
\sum_{q=3}^\infty\frac1{q(\log q)^2}<\infty.
$$

従ってほとんどすべての $x$ について

$$
\left|x-\frac pq\right|<\frac1{q^2\log q}
$$

を満たす近似は無限回存在しますが、

$$
\left|x-\frac pq\right|<\frac1{q^2(\log q)^2}
$$

を満たす近似は有限回しかありません。二つの近似はともに指数の意味では2の境界近くにあり、[無理性指数](../NDA5/index.md#def-nda5-irrationality-exponent)だけではこの対数の差を区別できません。

## 7. 例外集合は零測度でも次元を持ち得る

[Hausdorff次元の定義](../../../解析系/MT/MT8/index.md#def-mt8-hausdorff-dimension)を使うと、零測度集合にも「何次元の大きさが残るか」という問いを立てられます。ここでは短い区間被覆から直接得られる上界を証明します。

<a id="thm-nda8-hausdorff-upper"></a>

<!-- formal-statement-start -->
> **定理（よい有理近似を受ける集合のHausdorff次元の上界）**  
> $\tau>2$ とし、$[0,1]$ 内の無限回近似集合 $V_\tau$ を

$$
V_\tau=\left\{x\in[0,1]:
\left|x-\frac pq\right|<q^{-\tau}
\text{ となる }q\ge1,\ 0\le p\le q
\text{ が無限に存在する}\right\}
$$

> とする。このとき $\dim_{\mathrm H}V_\tau\le 2/\tau$ である。従って $\tau>2$ に対し、無理数で $\mu(x)\ge\tau$ となる集合のHausdorff次元も $2/\tau$ 以下であり、Liouville数全体のHausdorff次元は0である。
<!-- formal-statement-end -->

### 証明の見取り図

分母 $q$ ごとに $q+1$ 個以下、直径 $2q^{-\tau}$ の区間で覆います。$s$ 乗の直径の総和が収束する条件を解くと $s>2/\tau$ です。

<!-- proof-start -->
### 証明

任意の $s>2/\tau$ を固定します。$V_\tau$ の各点は任意の $N\ge1$ に対し、分母 $q\ge N$ の近似区間のいずれかに属するため、

$$
V_\tau\subset
\bigcup_{q=N}^{\infty}\bigcup_{p=0}^q
\left(\frac pq-q^{-\tau},\frac pq+q^{-\tau}\right)\cap[0,1].
$$

各区間の直径は $2q^{-\tau}\le2N^{-\tau}$ です。[Hausdorff外測度の定義](../../../解析系/MT/MT8/index.md#def-mt8-hausdorff-measure)で $s$ 乗の直径を足すと

$$
\mathcal H^s_{2N^{-\tau}}(V_\tau)
\le\sum_{q=N}^{\infty}(q+1)(2q^{-\tau})^s
\le2^{s+1}\sum_{q=N}^{\infty}q^{1-\tau s}.
$$

$\tau s>2$ なので最後は収束級数の尾部であり $N\to\infty$ で0になります。従って $\mathcal H^s(V_\tau)=0$、ゆえに $\dim_{\mathrm H}V_\tau\le s$。任意の $s>2/\tau$ に対し成立するので $\dim_{\mathrm H}V_\tau\le2/\tau$ です。

次に集合 $A_\tau=\{x\in[0,1]\setminus\mathbb Q:\mu(x)\ge\tau\}$ を取ります。$2<t<\tau$ を固定すれば、任意の $x\in A_\tau$ で $\mu(x)>t$ だから、[指数の定義](../NDA5/index.md#def-nda5-irrationality-exponent)により $t$ を超える指数の近似が無限回あります。従って $A_\tau\subset V_t$、よって $\dim_{\mathrm H}A_\tau\le2/t$ です。$t\uparrow\tau$ として $\dim_{\mathrm H}A_\tau\le2/\tau$ を得ます。

最後にLiouville数の集合 $L$ は[指数とLiouville数の同値](../NDA6/index.md#prop-nda6-liouville-exponent)により、すべての整数 $n\ge3$ で $L\subset A_n$ です。そのため $\dim_{\mathrm H}L\le2/n$ が全 $n$ について成立し、$\dim_{\mathrm H}L=0$ となります。
<!-- proof-end -->

この次元評価は**上界**です。たとえば $V_\tau$ に対する等号 $\dim_{\mathrm H}V_\tau=2/\tau$ を主張するには、近似区間の中に十分大きいCantor型集合を構成して下界を示す別の議論が必要です。零測度という事実から次元0は導けません。

## 8. 演習：長さの和、交差評価、例外集合

### Level A：定義と基本的な評価

**NDA8-A1　分母を固定した区間**

- Level: A
- 問題：$\psi(q)=1/(2q)$ とする。$q=2$ で $E_q(\psi)$ を構成し、各区間の半径と合計長さを求めよ。

<!-- solution-start -->
**詳細解答**

$\psi(2)=1/4$ なので半径は $\psi(2)/2=1/8$ です。中心は $0,1/2,1$ なので

$$
E_2(\psi)=[0,1/8)\cup(3/8,5/8)\cup(7/8,1].
$$

三つの成分は互いに素で長さは $1/8,1/4,1/8$ です。従って $\lambda(E_2(\psi))=1/8+1/4+1/8=1/2$ となります。端点の開閉は測度へ影響しません。
<!-- solution-end -->

**NDA8-A2　第一Borel–Cantelliの適用**

- Level: A
- 問題：$\lambda(A_n)\le3/n^2$ を満たす可測集合列 $(A_n)$ について、無限回集合の測度を計算せよ。独立性を仮定してよいかも述べよ。

<!-- solution-start -->
**詳細解答**

$\sum_{n=1}^\infty\lambda(A_n)\le3\sum_{n=1}^\infty n^{-2}<\infty$ です。[第一Borel–Cantelli](#lem-nda8-borel-cantelli)へ代入すれば $\lambda(\limsup A_n)=0$ です。仮定には独立性がないため、独立性を仮定していませんし、必要もありません。
<!-- solution-end -->

**NDA8-A3　二つの指数の級数**

- Level: A
- 問題：$\psi(q)=q^{-4/3}$ のとき、$\sum_q\psi(q)$ の収束と、$|x-p/q|$ の閾値を述べよ。

<!-- solution-start -->
**詳細解答**

指数 $4/3>1$ の $p$ 級数なので $\sum_q q^{-4/3}<\infty$ です。$E_q$ の半径は $\psi(q)/q=q^{-7/3}$ であり、[収束方向](#prop-nda8-khintchine-convergence)から $|x-p/q|<q^{-7/3}$ が無限回成立する $x\in[0,1]$ は零測度集合をなします。
<!-- solution-end -->

**NDA8-A4　既約分数の間隔**

- Level: A
- 問題：異なる既約分数 $p/q$ と $p'/q'$ の分母がいずれも12以下であるとき、距離の一様な下界を示せ。

<!-- solution-start -->
**詳細解答**

$pq'-p'q$ は0でない整数なので $|pq'-p'q|\ge1$ です。従って

$$
\left|\frac pq-\frac{p'}{q'}\right|
=\frac{|pq'-p'q|}{qq'}
\ge\frac1{qq'}\ge\frac1{12^2}=\frac1{144}.
$$

互いに素条件は同じ有理数の重複を除くために必要です。
<!-- solution-end -->

**NDA8-A5　二乗平均の分子と分母**

- Level: A
- 問題：測度1の有限測度空間で $F_1,F_2$ が可測で、$\nu(F_1)=1/4$、$\nu(F_2)=1/3$、$\nu(F_1\cap F_2)=1/12$ とする。$Z=1_{F_1}+1_{F_2}$ の $\int Z$ と $\int Z^2$ を求めよ。

<!-- solution-start -->
**詳細解答**

線形性から $\int Z\,d\nu=1/4+1/3=7/12$ です。$Z^2=1_{F_1}+1_{F_2}+2\,1_{F_1\cap F_2}$ なので

$$
\int Z^2\,d\nu
=\frac14+\frac13+2\cdot\frac1{12}
=\frac9{12}=\frac34.
$$

従って二乗平均の下界は $\nu(F_1\cup F_2)\ge(7/12)^2/(3/4)=49/108$ です。実際の和集合の長さは $1/4+1/3-1/12=1/2$ で、この下界と整合します。
<!-- solution-end -->

### Level B：発散と測度の違いを証明する

**NDA8-B1　発散だけでは不十分**

- Level: B
- 問題：$A_n=(0,1/n)$ とし、$\sum_n\lambda(A_n)=\infty$ と $\lambda(\limsup A_n)=0$ をそれぞれ直接証明せよ。

<!-- solution-start -->
**詳細解答**

$\lambda(A_n)=1/n$ だから調和級数によって $\sum_n\lambda(A_n)=\infty$ です。一方、任意の $x>0$ に対して $n>1/x$ なら $1/n<x$ であり、$x\notin A_n$ です。$x\le0$ もどの $A_n$ にも含まれません。従って無限に多くの $A_n$ に属する点はなく、$\limsup A_n=\varnothing$ です。独立性なしの「発散なら全測度」という推論が誤りだと分かります。
<!-- solution-end -->

**NDA8-B2　対数級数の収束境界**

- Level: B
- 問題：$\psi_a(q)=1/\{q(\log q)^a\}$（$q\ge3$、$a>0$）とする。級数の収束条件を積分で証明し、[Khintchineの定理](#thm-nda8-khintchine)からほとんどすべての $x$ に対する近似回数を分類せよ。

<!-- solution-start -->
**詳細解答**

$f(t)=1/\{t(\log t)^a\}$ は $t\ge3$ で正かつ減少します。$u=\log t$ と置けば $du=dt/t$ なので

$$
\int_3^\infty\frac{dt}{t(\log t)^a}
=\int_{\log3}^\infty u^{-a}\,du.
$$

$a>1$ なら原始関数 $u^{1-a}/(1-a)$ の無限遠での極限が有限、$a=1$ なら $\log u\to\infty$、$0<a<1$ なら $u^{1-a}/(1-a)\to\infty$ です。従って $a>1$ で収束し $0<a\le1$ で発散します。有限個の初項は非増加を保つよう定めれば、[Khintchineの定理](#thm-nda8-khintchine)から $|x-p/q|<1/\{q^2(\log q)^a\}$ は、ほとんどすべての $x$ について $a>1$ なら有限回、$0<a\le1$ なら無限回です。
<!-- solution-end -->

**NDA8-B3　二進ブロックの打切り**

- Level: B
- 問題：正数列 $(b_k)$ が $\sum_kb_k=\infty$ を満たすとき、任意の $c>0$ で $\sum_k\min\{b_k,c\}=\infty$ を示せ。この命題を二進ブロック補題に適用せよ。

<!-- solution-start -->
**詳細解答**

$b_k\ge c$ の項が無限個あれば、各項の打切りは $c$ なのでその総和は発散します。そのような項が有限個なら、ある $K$ 以降で $b_k<c$ となり、打切りは $b_k$ に等しいです。もとの尾部の級数が発散するため打切り後も発散します。

[Khintchineの証明](#thm-nda8-khintchine)では $b_k=2^k\psi(2^k)$、$c=1/8$ と取ります。これによって近似半径を $Q_k^{-2}/8$ に制限しても必要な長さの総和を失いません。
<!-- solution-end -->

**NDA8-B4　交差回数の数え上げ**

- Level: B
- 問題：異なる点の間隔が少なくとも $h>0$ の点集合について、長さ $L$ の区間に含まれる点が $1+L/h$ 個以下であることを示せ。これを、半径 $r$ と $s$ の二組の区間が交わる場合へ適用せよ。

<!-- solution-start -->
**詳細解答**

区間内の点を昇順に $x_1<\cdots<x_n$ と並べると $x_n-x_1\ge(n-1)h$ です。一方 $x_n-x_1\le L$ なので $n\le1+L/h$ です。

中心 $a$、半径 $r$ の区間と、中心 $b$、半径 $s$ の区間が交わるためには $|b-a|<r+s$ が必要です。従って候補 $b$ は長さ $2(r+s)$ の区間に入るため、候補数は $1+2(r+s)/h$ 以下です。$h=Q_\ell^{-2}$、$r=\rho_k$、$s=\rho_\ell$ を代入すると[交差補題](#lem-nda8-dyadic-overlap)で用いた計算になります。
<!-- solution-end -->

**NDA8-B5　例外集合とHausdorff次元**

- Level: B
- 問題：$\tau=3$ のとき $\dim_{\mathrm H}V_3\le2/3$ を、直径の $s$ 乗和から計算せよ。またこの結果だけで等号が証明されたか述べよ。

<!-- solution-start -->
**詳細解答**

分母 $q$ の中心は $q+1$ 個以下で、各近似区間の直径は $2q^{-3}$ です。$s>2/3$ とすると

$$
\sum_{q=N}^{\infty}(q+1)(2q^{-3})^s
\le2^{s+1}\sum_{q=N}^{\infty}q^{1-3s}.
$$

$1-3s<-1$ なので級数は収束し、その尾部は0へ向かいます。[Hausdorff次元の定義](../../../解析系/MT/MT8/index.md#def-mt8-hausdorff-dimension)から $\dim_{\mathrm H}V_3\le2/3$ です。下界 $\ge2/3$ は求めていないため、等号はまだ証明されていません。
<!-- solution-end -->

### Level C：主要証明を自分で組み立てる

**NDA8-C1　Khintchineの定理の発散方向を再構成**

- Level: C
- 問題：$\psi:\mathbb Z_{>0}\to(0,\infty)$ が非増加で $\sum_q\psi(q)=\infty$ とする。$Q_k=2^k$、$\rho_k=\min\{\psi(Q_k)/Q_k,1/(8Q_k^2)\}$、$a_k=Q_k^2\rho_k$ を用い、(i) $\sum_ka_k=\infty$、(ii) 各開区間 $I$ に構成した近似区間の交差総和の上界、(iii) 全測度の結論、を順に示せ。

<!-- solution-start -->
**詳細解答**

(i) $\psi$ が非増加なので $2^{k-1}\psi(2^k)\le\sum_{2^{k-1}<q\le2^k}\psi(q)\le2^{k-1}\psi(2^{k-1})$ です。二進比較から $\sum_k2^k\psi(2^k)=\infty$、[打切り補題の計算](#thm-nda8-khintchine)によって

$$
\sum_ka_k=\sum_k\min\{2^k\psi(2^k),1/8\}=\infty.
$$

(ii) $I$ の中央半分 $J$ で $Q_k/2<q\le Q_k$ の既約分数を取り、半径 $\rho_k$ の区間の和を $F_k$ とします。[既約分数の個数補題](#lem-nda8-reduced-rational-count)と間隔評価により $\lambda(F_k)\asymp|I|a_k$ です。また $k<\ell$ では[交差補題](#lem-nda8-dyadic-overlap)から

$$
\lambda(F_k\cap F_\ell)
\le C|I|\{a_ka_\ell+4^k\rho_\ell\}.
$$

$S=\sum_{k=m}^na_k$ と置き、対角項・交差項を足すと $\sum_{k,\ell=m}^n\lambda(F_k\cap F_\ell)\le C'|I|(S+S^2)$ です。ここでは $\sum_{k<\ell}4^k\le4^\ell/3$ と $\sum_\ell4^\ell\rho_\ell=S$ を使います。

(iii) $\int\sum_k1_{F_k}\,d\lambda=\sum_k\lambda(F_k)$ にCauchy–Schwarzを使うと

$$
\lambda\left(\bigcup_{k=m}^nF_k\right)\ge
\frac{\left(\sum_{k=m}^n\lambda(F_k)\right)^2}
{\sum_{k,\ell=m}^n\lambda(F_k\cap F_\ell)}
\ge c|I|\frac{S}{1+S}.
$$

$n\to\infty$、続いて $m\to\infty$ とすると $\lambda(I\cap\limsup F_k)\ge c|I|$ です。$F_k$ の中心の分母は互いに異なる倍幅帯にあり、$\rho_k\le\psi(q)/q$ なので $\limsup F_k\subset W(\psi)$ です。最後に[全区間から全測度への補題](#lem-nda8-local-to-full)を適用すれば $\lambda(W(\psi))=1$ となります。
<!-- solution-end -->

**NDA8-C2　無理性指数の例外と次元**

- Level: C
- 問題：$\tau>2$ とする。ほとんどすべての実数で $\mu(x)=2$ を示し、さらに $A_\tau=\{x\in[0,1]\setminus\mathbb Q:\mu(x)\ge\tau\}$ が零測度で $\dim_{\mathrm H}A_\tau\le2/\tau$ を満たすことを示せ。どこで可算性が必要かを明記せよ。

<!-- solution-start -->
**詳細解答**

整数 $m\ge1$ ごとに、次の近似関数を取ります。

$$
\psi_m(q)=q^{-1-1/m},\qquad
\sum_{q\ge1}\psi_m(q)<\infty.
$$

[第一Borel–Cantelli](#lem-nda8-borel-cantelli)から、各 $m$ で $\lambda(W(\psi_m))=0$ です。例外集合は、有理数集合とこれらの $W(\psi_m)$ の可算和に取ります。有理数も添字集合も可算なので、例外の測度は0です。

例外の外では[Dirichletの下界](../NDA5/index.md#thm-nda5-dirichlet-lower-bound)によって無理性指数は2以上です。仮に2より大きければ、ある整数 $m$ を選んで指数 $2+1/m$ を超える近似が無限回成立します。その点は $W(\psi_m)$ に入り、例外の外という仮定に矛盾します。

$\tau>2$ を固定すると $A_\tau$ は $\mu>2$ の例外集合に含まれるため零測度です。さらに $2<t<\tau$ に対して $A_\tau\subset V_t$ であり、$s>2/t$ を取れば

$$
\sum_{q=N}^{\infty}(q+1)(2q^{-t})^s
\le2^{s+1}\sum_{q=N}^{\infty}q^{1-ts}\longrightarrow0
\qquad(N\to\infty).
$$

従って[Hausdorff次元](../../../解析系/MT/MT8/index.md#def-mt8-hausdorff-dimension)は $\dim_{\mathrm H}A_\tau\le2/t$ です。$t$ を $\tau$ へ近付けると $\dim_{\mathrm H}A_\tau\le2/\tau$ です。
<!-- solution-end -->

## 9. 何が分かったか

Rothの定理は**特定の代数的無理数**について指数2を示しました。一方、計量的議論は**ほとんどすべての実数**について指数2を示し、Khintchineの定理によって指数2の内側にある対数精度まで区別します。前者に代数性が必要であるのに対し、後者の例外を除く議論に代数性は必要ありません。

Hausdorff次元の上界は、零測度の例外集合にも細かな幾何学的情報を与えます。より精密な次元の等号には、近似区間の重なりを使った下界構成が新たに必要です。
