# OTR11 一次元なら輸送を陽に解けるか

[Wasserstein距離](../OTR8/index.md#def-otr8-wasserstein)は、二つの分布の間のすべての結合から最小費用を探して定義しました。[Kantorovich–Rubinstein双対](../OTR10/index.md#thm-otr10-kr)は $W_1$ を観測関数で測る方法ですが、一般の $p$ に対して最適な結合自体を直接書けるでしょうか。

実数直線上では、左側にある質量から順に左側の行き先へ割り当てることができます。例えば出発地 $0,2$ に質量が $1/2$ ずつあり、到着地 $1,3$ にも質量が $1/2$ ずつあるなら、$0\to1$、$2\to3$ が自然です。反対に $0\to3$、$2\to1$ と交差させる必要はありません。この「順序をそろえる」原理は、確率測度に原子があっても成り立ちます。

本章では、累積確率 $u\in(0,1)$ を共通のものさしにして二分布を結び、$p\ge1$ の費用を一つの積分へ帰着させます。ただし、**最適結合**が常に存在することと、**一つの出発点に一つの到着点を割り当てる最適写像**が存在することは別です。

## 1. 確率の順序で点を取り出す

実数上の確率測度 $\mu$ の累積分布関数を $F_\mu(x)=\mu(( -\infty,x])$ と書きます。通常の逆関数ではジャンプのある累積分布関数を扱えません。そこで [MC2の一般化逆関数](../../../計算系/MC/MC2/index.md#def-mc2-generalized-inverse)を、輸送の記号 $Q_\mu$ で再掲します。

<a id="def-otr11-quantile"></a>

<!-- formal-statement-start -->
> **定義（分位点関数の輸送用記法）**
> $\mu$ を $\mathbb R$ 上のBorel確率測度とし、累積確率を $F_\mu(x)=\mu(( -\infty,x])$ で表す。$0<u<1$ に対して

$$
Q_\mu(u)=F_\mu^{-1}(u):=\inf\{x\in\mathbb R:F_\mu(x)\ge u\}
$$

> と書き、$\mu$ の分位点関数と呼ぶ。この値は有限で、$u\mapsto Q_\mu(u)$ は非減少かつBorel可測である。
<!-- formal-statement-end -->

任意の $u\in(0,1)$ について $F_\mu(x)\to0$（$x\to-\infty$）、$F_\mu(x)\to1$（$x\to\infty$）なので、定義の集合は非空で下に有界です。単調性も、$u$ を大きくすると条件 $F_\mu(x)\ge u$ が厳しくなることから分かります。

非減少な実数値関数の逆像 $\{u:Q_\mu(u)>t\}$ は区間なのでBorel集合であり、$Q_\mu$ はBorel可測です。

<!-- definition-example-start: def-otr11-quantile -->
**定義の確認**。$\mu=\tfrac14\delta_0+\tfrac34\delta_2$ なら

$$
F_\mu(x)=\begin{cases}0&x<0,\\1/4&0\le x<2,\\1&x\ge2,\end{cases}
\qquad
Q_\mu(u)=\begin{cases}0&0<u\le1/4,\\2&1/4<u<1.\end{cases}
$$

実際、$u\le1/4$ なら $F_\mu(x)\ge u$ を初めて満たすのは $x=0$、$u>1/4$ なら $x=2$ です。分位点の横幅 $1/4,3/4$ がそれぞれの質量になっています。境界 $u=1/4$ の値は積分には影響しません。
<!-- definition-example-end -->

順序付きのものさしが本当に元の分布を再現するのかを確認しましょう。

<a id="lem-otr11-quantile-law"></a>

<!-- formal-statement-start -->
> **補題（分位点と一様変数）**
> $\mu$ を $\mathbb R$ 上のBorel確率測度、$Q_\mu$ を上で定めた分位点関数とする。$U\sim\operatorname{Unif}(0,1)$ とすると $Q_\mu(U)$ の分布は $\mu$ である。特に任意の $x\in\mathbb R$ について

$$
\{u\in(0,1):Q_\mu(u)\le x\}=\{u\in(0,1):u\le F_\mu(x)\}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

累積確率 $F_\mu$ の右連続性により、$Q_\mu(u)\le x$ と $u\le F_\mu(x)$ は同値です。一様変数を代入すると確率が $F_\mu(x)$ になります。これは [MC2の逆関数法](../../../計算系/MC/MC2/index.md#thm-mc2-inverse-transform)と同じ構成です。

<!-- proof-start -->
### 証明

$u\le F_\mu(x)$ なら $x$ 自身が定義の集合に属するので $Q_\mu(u)\le x$ です。逆に $Q_\mu(u)\le x$ とします。$F_\mu$ の単調性と右連続性から、集合 $\{z:F_\mu(z)\ge u\}$ は右半直線 $[Q_\mu(u),\infty)$ です。したがって $F_\mu(x)\ge u$ です。よって

$$
\mathbb P(Q_\mu(U)\le x)
=\mathbb P(U\le F_\mu(x))=F_\mu(x).
$$

すべての $x$ で $\mathbb P(Q_\mu(U)\le x)=F_\mu(x)$ なので $Q_\mu(U)\sim\mu$ です。$\square$
<!-- proof-end -->

この等式は、任意の分布を同じ一様変数 $U$ から作れることを意味します。異なる分布に**同じ $U$**を使うと、低い順位どうし、高い順位どうしが対応します。

## 2. 共通の順位が作る単調結合

以前の[結合の定義](../OTR2/index.md#def-otr2-coupling)では、二つの周辺分布が正しければ点の対応は自由でした。ここでは対応先まで具体的に固定します。

<a id="def-otr11-monotone-coupling"></a>

<!-- formal-statement-start -->
> **定義（分位点による単調結合）**
> $\mu,\nu$ を $\mathbb R$ 上のBorel確率測度とし、$\lambda$ を $(0,1)$ 上の一様確率測度とする。

$$
\pi^\uparrow=(Q_\mu,Q_\nu)_{\#}\lambda
$$

> を単調結合と呼ぶ。すなわち $U\sim\operatorname{Unif}(0,1)$ に対する $(X,Y)=(Q_\mu(U),Q_\nu(U))$ の同時分布である。
<!-- formal-statement-end -->

これは[押し出し測度](../OTR1/index.md#def-otr1-transport-map)の二変数版です。[分位点の分布補題](#lem-otr11-quantile-law)を第一・第二成分にそれぞれ使えば、周辺分布は $\mu,\nu$ です。したがって $\pi^\uparrow\in\Pi(\mu,\nu)$ が確認できました。また $u<v$ なら両分位点が非減少なので、順位が逆転する二組の輸送先は生じません。

<!-- definition-example-start: def-otr11-monotone-coupling -->
**定義の確認**。$\mu=\tfrac14\delta_0+\tfrac34\delta_2$、$\nu=\tfrac12\delta_1+\tfrac12\delta_3$ とすると

$$
\begin{array}{c|c|c|c}
u\text{ の区間}&Q_\mu(u)&Q_\nu(u)&\text{区間の長さ}\\\hline
(0,1/4]&0&1&1/4\\
(1/4,1/2]&2&1&1/4\\
(1/2,1)&2&3&1/2
\end{array}
$$

です。したがって

$$
\pi^\uparrow=\tfrac14\delta_{(0,1)}+\tfrac14\delta_{(2,1)}+\tfrac12\delta_{(2,3)}.
$$

第一周辺は $0$ に $1/4$、$2$ に $3/4$、第二周辺は $1$ と $3$ にそれぞれ $1/2$ を置きます。特に出発点 $2$ の質量は二つの行き先へ分割されています。
<!-- definition-example-end -->

## 3. なぜ交差させると得をしないのか

単調結合は自然ですが、自然であるだけでは最小費用だとは言えません。最初に、二本の経路を付け替えたときの差を調べます。これは [OTR7の一次元二次費用の単調性判定](../OTR7/index.md#prop-otr7-one-dimensional)を、$|x-y|^p$ という一般の凸費用へ広げる鍵です。

<a id="lem-otr11-uncrossing"></a>

<!-- formal-statement-start -->
> **補題（凸な距離費用の交差解消）**
> $p\ge1$、$a\le b$、$v\le w$ を実数とする。このとき

$$
|a-v|^p+|b-w|^p\le|a-w|^p+|b-v|^p.
$$

> $p>1$ かつ $a<b$、$v<w$ なら不等号は厳密である。
<!-- formal-statement-end -->

### 証明の見取り図

$h(t)=|t|^p$ は凸関数です。二つの到着点 $v\le w$ を固定して $g(t)=h(t-v)-h(t-w)$ を考えると、$g$ は非減少です。したがって $g(a)\le g(b)$ と比較できます。

<!-- proof-start -->
### 証明

$p>1$ のとき、変数 $t$ に関する導関数は

$$
h'(t)=p\operatorname{sgn}(t)|t|^{p-1}
$$

です。ここで符号関数は

$$
\operatorname{sgn}(t)=\begin{cases}-1&t<0,\\0&t=0,\\1&t>0\end{cases}
$$

と定めます。$h'$ は狭義単調増加であり、$v<w$ なら任意の $t$ について $t-v>t-w$ であるため

$$
g'(t)=h'(t-v)-h'(t-w)>0.
$$

したがって $a<b$ なら $g(a)<g(b)$ です。$p=1$ のとき $h(t)=|t|$ は微分できない点がありますが、$g$ は次のように書けます。

$$
g(t)=\begin{cases}v-w&t\le v,\\2t-v-w&v<t<w,\\w-v&t\ge w.\end{cases}
$$

よってやはり非減少です。$v=w$ または $a=b$ なら等号になります。いずれの場合も

$$
g(a)\le g(b)
\iff h(a-v)+h(b-w)\le h(a-w)+h(b-v)
$$

で、求める不等式です。$\square$
<!-- proof-end -->

ここで $p=1$ には等号となる交差があり、$p>1$ では異なる二点同士の交差が必ず高くなる点に注目してください。これが最適結合の一意性の違いにつながります。

有限個の出発点・到着点では、行列の行和・列和を保ったまま「交差した二セルの質量」を付け替えられます。

<a id="lem-otr11-finite-monotone"></a>

<!-- formal-statement-start -->
> **補題（有限原子分布の単調結合は最適）**
> $p\ge1$ とし、相異なる点 $x_1<\cdots<x_m$、$y_1<\cdots<y_n$ に正の重みを持つ確率測度を考える。

$$
\mu=\sum_{i=1}^{m}a_i\delta_{x_i},\qquad
\nu=\sum_{j=1}^{n}b_j\delta_{y_j},\qquad
\sum_i a_i=\sum_j b_j=1.
$$

> このとき費用 $|x-y|^p$ の最適結合の一つは $\pi^\uparrow$ である。$p>1$ なら最適結合は $\pi^\uparrow$ に限る。
<!-- formal-statement-end -->

### 証明の見取り図

有限の輸送行列には最適解が存在します。交差する二セルに正の質量があれば、同量を交差しない二セルへ移して費用を増やさずに済みます。最適行列のうち順位の整合性を最大化するものを選べば、交差は残りません。交差のない結合は、累積質量だけで一意に決まります。

<!-- proof-start -->
### 証明

[有限輸送多面体](../OTR4/index.md#def-otr4-transport-polytope)は非空・コンパクトで、費用は線形なので最適行列 $\gamma=(\gamma_{ij})$ が存在します。最適解の中で $S(\gamma)=\sum_{i,j}x_i y_j\gamma_{ij}$ を最大にするものを一つ取ります。もし $i<k$、$j<\ell$ なのに $\gamma_{i\ell}>0$、$\gamma_{kj}>0$ なら、$\varepsilon=\min(\gamma_{i\ell},\gamma_{kj})>0$ を取り

$$
\gamma_{i\ell},\gamma_{kj}\mapsto\gamma_{i\ell}-\varepsilon,\gamma_{kj}-\varepsilon,
\qquad
\gamma_{ij},\gamma_{k\ell}\mapsto\gamma_{ij}+\varepsilon,\gamma_{k\ell}+\varepsilon
$$

とします。行和・列和は不変で、[交差解消補題](#lem-otr11-uncrossing)から費用は増えません。費用が減れば最適性に反し、同額なら

$$
S(\gamma_{\mathrm{new}})-S(\gamma)
=\varepsilon(x_k-x_i)(y_\ell-y_j)>0
$$

となって $S$ の最大性に反します。よって交差はありません。$p>1$ では費用が必ず下がるため、どの最適行列も交差を持ちません。

交差がない結合を確定させます。ここで $(X,Y)$ は結合行列 $\gamma$ に従う確率変数の組とします。

$A_i=\sum_{r\le i}a_r$、$B_j=\sum_{s\le j}b_s$ とし、$C_{ij}=\sum_{r\le i,s\le j}\gamma_{rs}$ と置きます。$X\le x_i,Y>y_j$ と $X>x_i,Y\le y_j$ の双方に正の質量があれば交差する二セルが存在します。したがって少なくとも片方が0であり、

$$
A_i=C_{ij}+\mathbb P(X\le x_i,Y>y_j),\quad
B_j=C_{ij}+\mathbb P(X>x_i,Y\le y_j)
$$

より $C_{ij}=\min(A_i,B_j)$ です。一方、共通 $U$ で構成した $\pi^\uparrow$ は $X\le x_i\iff U\le A_i$、$Y\le y_j\iff U\le B_j$ だから、同じ $C_{ij}$ を持ちます。各セルの質量は

$$
\gamma_{ij}=C_{ij}-C_{i-1,j}-C_{i,j-1}+C_{i-1,j-1}
$$

（$C_{0j}=C_{i0}=0$）で一意に復元されます。したがって交差のない結合は $\pi^\uparrow$ だけです。$\square$
<!-- proof-end -->

## 4. すべての実数上の確率測度へ

連続分布では、有限個のセルをそのまま動かせません。そこで、実数を細かい格子へ丸めてから、格子幅を0へ送ります。有限 $p$ 次モーメントの条件は、この極限で遠方の費用を失わないために使います。

<a id="thm-otr11-quantile-formula"></a>

<!-- formal-statement-start -->
> **定理（一次元Wasserstein距離の分位点公式）**
> $p\ge1$、$\mu,\nu\in\mathcal P_p(\mathbb R)$ とし、実数の通常距離 $d(x,y)=|x-y|$ を用いる。このとき単調結合 $\pi^\uparrow=(Q_\mu,Q_\nu)_{\#}\lambda$ は $|x-y|^p$ 費用の最適結合であり、

$$
\boxed{W_p(\mu,\nu)^p=\int_0^1|Q_\mu(u)-Q_\nu(u)|^p\,du.}
$$

> $p>1$ なら最適結合は一意である。$p=1$ では一意とは限らない。
<!-- formal-statement-end -->

### 証明の見取り図

各点を単調な有限値写像 $q_n$ で丸めると、どの結合も有限原子分布の結合になります。[有限原子の最適性](#lem-otr11-finite-monotone)による不等式を得て、両辺を $L^p$ の極限へ移します。一意性は $p>1$ の場合に、交差のある支持を排除する議論を一般の結合へ戻して示します。

<!-- proof-start -->
### 証明

まず $\mu,\nu\in\mathcal P_p(\mathbb R)$ なので、[分位点と一様変数の補題](#lem-otr11-quantile-law)から

$$
\int_0^1|Q_\mu(u)|^pdu=\int_{\mathbb R}|x|^p\mu(dx)<\infty
$$

であり、$Q_\nu$ も同様です。$|a-b|^p\le2^{p-1}(|a|^p+|b|^p)$ より、表示した費用は有限です。

$n\ge1$ に対し $r_n(x)=\max(-n,\min(n,x))$ とし、$\lfloor t\rfloor$ は実数 $t$ 以下の最大の整数を表すとします。さらに

$$
q_n(x)=2^{-n}\lfloor2^n r_n(x)\rfloor
$$

とします。$q_n$ は単調な有限値Borel写像で、

$$
|q_n(x)-x|\le(|x|-n)_++2^{-n},\qquad (t)_+=\max(t,0).
$$

任意の $\mathbb R$ 値で $p$ 次モーメントが有限な確率変数 $Z$ について、

$$
\mathbb E|q_n(Z)-Z|^p
\le2^{p-1}\left(\mathbb E[|Z|^p\mathbf1_{\{|Z|>n\}}]+2^{-np}\right)\longrightarrow0.
$$

最後は可積分関数 $|Z|^p$ の尾部積分が0へ行くことによります。

ここで任意の $\gamma\in\Pi(\mu,\nu)$ に従う $(X,Y)$ を取り、$X_n=q_n(X)$、$Y_n=q_n(Y)$ とします。これらの分布 $\mu_n=(q_n)_\#\mu$、$\nu_n=(q_n)_\#\nu$ は有限原子です。単調な $q_n$ と $Q_\mu,Q_\nu$ の合成も非減少で、それぞれ $\mu_n,\nu_n$ を生みます。

共通の $u$ に対する二つの合成値には逆転がなく、[有限原子の補題](#lem-otr11-finite-monotone)の証明で示した「逆転のない結合は一意」により、それらの同時分布は $\mu_n,\nu_n$ の単調結合です。したがって同補題の最適性から

$$
\mathbb E|X_n-Y_n|^p
\ge\int_0^1|q_n(Q_\mu(u))-q_n(Q_\nu(u))|^pdu.
$$

左辺では $X_n-Y_n\to X-Y$ が $L^p$ で成立します。実際、三角不等式で

$$
\|(X_n-Y_n)-(X-Y)\|_{L^p}
\le\|X_n-X\|_{L^p}+\|Y_n-Y\|_{L^p}\to0.
$$

右辺でも、$Z=Q_\mu(U),Q_\nu(U)$ について上の尾部評価を使えば同じ $L^p$ 収束が成立します。したがって $L^p$ ノルムの連続性から

$$
\int_{\mathbb R^2}|x-y|^p\gamma(dx,dy)
\ge\int_0^1|Q_\mu(u)-Q_\nu(u)|^pdu.
$$

この不等式は任意の結合 $\gamma$ について成り立ちます。他方、[単調結合の定義](#def-otr11-monotone-coupling)により $\pi^\uparrow$ の費用は右辺そのものです。ゆえに等号が達成され、$W_p$ の公式が得られました。

最後に $p>1$ の一意性を示します。[Polish空間での最適結合の存在](../OTR3/index.md#thm-otr3-polish)を使えるのは、費用が連続・非負であり、有限モーメントから有限費用の結合があるからです。

任意の最適結合 $\gamma$ の支持に、次のように逆転する二点があると仮定します。

$$
(x_1,y_1),\ (x_2,y_2),\qquad x_1<x_2,\quad y_1>y_2.
$$

両点の小さな長方形近傍 $R_1,R_2$ は正の質量を持ちます。[厳密な交差解消不等式](#lem-otr11-uncrossing)と連続性から、二つの近傍から一組ずつ選んだときの費用減少が一様に正となるよう近傍を取れます。各近傍の結合の制限から、同量 $\varepsilon>0$ の部分測度 $\eta_1,\eta_2$ を取ります。各部分測度の第一・第二周辺を $\alpha_i,\beta_i$ とすれば、$\eta_1+\eta_2$ を

$$
\frac1\varepsilon\alpha_1\otimes\beta_2+\frac1\varepsilon\alpha_2\otimes\beta_1
$$

へ置き換える操作で、第一・第二周辺をそれぞれ $\alpha_1+\alpha_2$、$\beta_1+\beta_2$ に保てます。交差した元の二組と交換後の二組を積測度 $\eta_1\otimes\eta_2/\varepsilon$ で平均すると、費用は厳密に減ります。これは最適性に反します。したがって最適結合の支持は交差しません。

交差のない結合では、任意の $s,t\in\mathbb R$ に対して $\{X\le s,Y>t\}$ と $\{X>s,Y\le t\}$ の両方が正確率になることはありません（それぞれから支持点を取れば交差します）。ゆえに先ほどの有限の場合と同じ周辺の計算により

$$
\gamma(( -\infty,s]\times( -\infty,t])=\min(F_\mu(s),F_\nu(t)).
$$

単調結合でも[分位点と一様変数の補題](#lem-otr11-quantile-law)から同じ値を持つので、半無限長方形上の測度の一致により $\gamma=\pi^\uparrow$ です。$\square$
<!-- proof-end -->

この公式は、最適化問題を「分位点の差を積分する問題」へ変えます。$p=1$ の一意性が失われる例は後で確認します。

### 直接計算：二つの連続分布

$\mu$ を区間 $[0,1]$ に密度1を持つ分布、$\nu$ を同区間に密度 $2y$ を持つ分布とします。$F_\mu(x)=x$、$F_\nu(x)=x^2$（$0\le x\le1$）なので、区間外でも累積確率を0または1と置けば、$0<u<1$ では

$$
Q_\mu(u)=u,\qquad Q_\nu(u)=\sqrt u
$$

を得ます。[分位点公式](#thm-otr11-quantile-formula)から

$$
W_1(\mu,\nu)=\int_0^1(\sqrt u-u)du=\frac23-\frac12=\frac16,
$$

$$
W_2(\mu,\nu)^2=\int_0^1(u-2u^{3/2}+u^2)du
=\frac12-\frac45+\frac13=\frac1{30}.
$$

積分関数を取り違えて $W_2$ 自体を $1/30$ としないよう注意しましょう。$W_2=1/\sqrt{30}$ です。

## 5. $W_1$ は累積分布関数の差の面積にもなる

分位点を実際に逆算しなくても、$p=1$ に限れば二つの累積分布関数の間の面積が答えになります。

<a id="cor-otr11-cdf-w1"></a>

<!-- formal-statement-start -->
> **系（一次元の分布関数によるW1公式）**
> $\mu,\nu\in\mathcal P_1(\mathbb R)$ の累積分布関数を $F_\mu,F_\nu$ とすると

$$
\boxed{W_1(\mu,\nu)=\int_{\mathbb R}|F_\mu(t)-F_\nu(t)|dt.}
$$
<!-- formal-statement-end -->

### 証明の見取り図

二点間の距離は、その間にある境界 $t$ の長さです。どの結合でも、境界の左右に分かれた確率は二つの累積分布関数の差以上です。単調結合なら、その差と境界をまたぐ確率が一致します。

<!-- proof-start -->
### 証明

任意の $a,b\in\mathbb R$ について

$$
|a-b|=\int_{\mathbb R}|\mathbf1_{\{a\le t\}}-\mathbf1_{\{b\le t\}}|dt
$$

です。任意の結合 $(X,Y)\sim\gamma$ に代入し、[非負関数に対するTonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)で積分順序を交換すると

$$
\mathbb E|X-Y|
=\int_{\mathbb R}\mathbb E|\mathbf1_{\{X\le t\}}-\mathbf1_{\{Y\le t\}}|dt
\ge\int_{\mathbb R}|F_\mu(t)-F_\nu(t)|dt.
$$

不等号は $|\mathbb EZ|\le\mathbb E|Z|$ に $Z=\mathbf1_{\{X\le t\}}-\mathbf1_{\{Y\le t\}}$ を適用したものです。単調結合では[分位点の分布補題](#lem-otr11-quantile-law)より

$$
\{Q_\mu(U)\le t\}=\{U\le F_\mu(t)\},\quad
\{Q_\nu(U)\le t\}=\{U\le F_\nu(t)\}.
$$

二つの事象は包含関係にあるので、指示関数の差の絶対値の期待値はちょうど $|F_\mu(t)-F_\nu(t)|$ です。[分位点公式](#thm-otr11-quantile-formula)による最適性と合わせて等式を得ます。$\square$
<!-- proof-end -->

例えば $\mu=\delta_0$、$\nu=\delta_2$ では二つの累積分布関数の差は $[0,2)$ で1、その他で0なので $W_1=2$ です。

## 6. 最適結合はいつ最適写像になるか

[Mongeの輸送写像](../OTR1/index.md#def-otr1-transport-map)は、一つの出発点の質量を複数の到着点に分割できません。単調結合は常に最適ですが、写像による表現には追加条件が必要です。

<a id="prop-otr11-monotone-map"></a>

<!-- formal-statement-start -->
> **命題（非原子的な出発分布からの単調最適写像）**
> $p\ge1$、$\mu,\nu\in\mathcal P_p(\mathbb R)$ とし、$\mu$ が原子を持たない、すなわち $\mu(\{x\})=0$ がすべての $x\in\mathbb R$ で成立するとする。このとき $F_\mu$ は連続で、$0<F_\mu(x)<1$ の集合上で

$$
T(x)=Q_\nu(F_\mu(x))
$$

> と定め、$\mu$-零集合の残りでは任意の値を与えれば、Borel可測な輸送写像 $T$ が得られる。すなわち $T_{\#}\mu=\nu$、$(\mathrm{id},T)_{\#}\mu=\pi^\uparrow$ であり、$T$ は $|x-y|^p$ に対して最適である。
<!-- formal-statement-end -->

### 証明の見取り図

連続な累積分布関数では、分位点に戻してから累積確率を取ると元の順位を回復できます。そのため $F_\mu(X)$ が一様変数となり、その順位を $Q_\nu$ へ入力できます。

<!-- proof-start -->
### 証明

$\mu$ が原子を持たないことと $F_\mu$ の連続性は、$F_\mu$ のジャンプ幅が $\mu(\{x\})$ であることから同値です。連続性と $\lim_{x\to\pm\infty}F_\mu(x)=0,1$ により、任意の $u\in(0,1)$ について

$$
F_\mu(Q_\mu(u))=u.
$$

実際、[一般化逆関数の定義](#def-otr11-quantile)から左辺は $u$ 以上です。もし $u$ より大きければ連続性により $Q_\mu(u)$ より小さい点でも累積確率が $u$ 以上になり、下限性に反します。

$U\sim\operatorname{Unif}(0,1)$、$X=Q_\mu(U)$ とすれば[分位点と一様変数の補題](#lem-otr11-quantile-law)から $X\sim\mu$、かつ $F_\mu(X)=U$ です。すると

$$
(X,T(X))=(Q_\mu(U),Q_\nu(F_\mu(Q_\mu(U))))
=(Q_\mu(U),Q_\nu(U))
$$

がほとんど確実に成立します。$Q_\nu$ はBorel可測で、$\{0<F_\mu<1\}$ もBorel集合なので、残りで例えば $T=0$ と定めれば可測です。$X=Q_\mu(U)$ は常に $0<F_\mu(X)<1$ であることも上式から従います。したがって[単調結合](#def-otr11-monotone-coupling)と同じ同時分布を持ち、最適性は[一次元Wasserstein距離の分位点公式](#thm-otr11-quantile-formula)から従います。$\square$
<!-- proof-end -->

先の連続分布の例では $T(x)=\sqrt x$（$0<x<1$）です。$x\mapsto\sqrt x$ は単調で、$X\sim\operatorname{Unif}(0,1)$ なら $T(X)$ の累積分布関数は $\mathbb P(\sqrt X\le y)=y^2$（$0\le y\le1$）と直接検算できます。

### 原子があると何が壊れるか

第2節の $\mu=\tfrac14\delta_0+\tfrac34\delta_2$、$\nu=\tfrac12\delta_1+\tfrac12\delta_3$ では、$\pi^\uparrow$ が $x=2$ から $1$ と $3$ へ質量を分割します。実は、この二分布の間には**輸送写像そのものが存在しません**。写像の押し出しでは行き先の各原子質量は $1/4$ と $3/4$ の和からしか作れず、$1/2$ を作れないからです。[原子質量の保存命題](../OTR1/index.md#prop-otr1-atomic-mass-balance)が破綻箇所を正確に表しています。

ただし「出発分布に原子があるなら写像は存在しない」は誤りです。例えば $\delta_0\to\delta_2$ では $T(0)=2$ が最適写像です。原子がある場合の条件は、個々の質量がどのように割り当てられるかに依存します。

原子 $x$ の質量は累積分布関数の跳び $F_\mu(x)-F_\mu(x-)$ です。ここで $F_\mu(x-)=\lim_{z\uparrow x}F_\mu(z)$ は左極限で、$z$ は $x$ に下から近づきます。この質量に対応する順位の区間を調べます。

<a id="prop-otr11-atomic-fibers"></a>

<!-- formal-statement-start -->
> **命題（単調結合が写像で表せるための原子条件）**
> $\mu,\nu$ を $\mathbb R$ 上の確率測度とする。$x$ が $\mu$ の原子であるとき、左極限 $F_\mu(x-)$ を用いて次の区間を置く。

$$
I_x=(F_\mu(x-),F_\mu(x)].
$$

> 単調結合 $\pi^\uparrow$ がBorel写像 $T$ のグラフ結合 $(\mathrm{id},T)_{\#}\mu$ と一致する必要十分条件は、各原子 $x$ に対応する $I_x$ で $Q_\nu$ がLebesgueほとんど至る所一定となることである。
<!-- formal-statement-end -->

### 証明の見取り図

同じ出発点 $x$ に対応する順位の集合が $I_x$ です。この中で到着分位点が動けば一つの $T(x)$ にはまとめられません。原子以外の出発点では、分位点の同じ値を取る順位の幅が0なので、ほとんど確実に一つの行き先が決まります。

<!-- proof-start -->
### 証明

[分位点の事象等式](#lem-otr11-quantile-law)から $Q_\mu(U)=x$ の確率は $F_\mu(x)-F_\mu(x-)=\mu(\{x\})$ です。単調性と右連続性から、原子 $x$ の順位の逆像は端点を除いて $I_x$ に一致します。グラフ結合なら $Q_\mu(U)=x$ のとき $Q_\nu(U)=T(x)$ がほとんど確実なので、$Q_\nu$ は $I_x$ 上でほとんど至る所一定です。

逆に全原子区間でこの条件が成立するとします。原子集合 $A=\{x:\mu(\{x\})>0\}$ は可算で、各 $x\in A$ の区間 $I_x$ は互いに重なりません。各区間での $Q_\nu$ のほとんど至る所の一定値を $c_x$ とします。$x\notin A$ で $0<F_\mu(x)<1$ のときは

$$
T(x)=Q_\nu(F_\mu(x))
$$

とし、$x\in A$ では $T(x)=c_x$、それ以外は例えば $T(x)=0$ と定めます。

この定義が同じ順位からの結合を再現する理由を確かめます。$u\in(0,1)$ と $z=Q_\mu(u)$ に対して、[一般化逆関数の定義](#def-otr11-quantile)と $F_\mu$ の右連続性から

$$
F_\mu(z-)\le u\le F_\mu(z)
$$

です。もし $F_\mu(z)>u$ なら、$z$ は原子であり、$u$ は $I_z$ に属するかその左端点です。原子は可算なので左端点全体はLebesgue零集合です。従って、原子区間の合併の外では、ほとんどすべての $u$ について $F_\mu(Q_\mu(u))=u$ です。原子区間内では $Q_\mu(u)=x$、$Q_\nu(u)=c_x$ がほとんど至る所成り立ち、区間外では

$$
T(Q_\mu(u))=Q_\nu(F_\mu(Q_\mu(u)))=Q_\nu(u)
$$

となります。$F_\mu,Q_\nu$ はBorel可測で、可算集合 $A$ 上の値を差し替えてもBorel可測性は保たれます。したがって $T$ はBorel写像で、$Q_\nu(U)=T(Q_\mu(U))$ がほとんど確実に成立します。よって $\pi^\uparrow=(\mathrm{id},T)_\#\mu$ です。$\square$
<!-- proof-end -->

最後に、$p=1$ で最適結合が一意ではない例を見ます。$\mu=\tfrac12(\delta_0+\delta_1)$、$\nu=\tfrac12(\delta_2+\delta_3)$ ではどの結合も $X\le1<2\le Y$ を満たすので

$$
\mathbb E|X-Y|=\mathbb E(Y-X)=\left(\frac{2+3}{2}\right)-\left(\frac{0+1}{2}\right)=2.
$$

単調結合だけでなく交差する結合も最適です。$p>1$ の場合に交差解消が厳密になることと比べてください。

## 7. 演習

### OTR11-A01 分位点のジャンプを読む
- Level: A

$\mu=\tfrac13\delta_{-1}+\tfrac23\delta_2$ とする。累積分布関数 $F_\mu$ と分位点関数 $Q_\mu$ を全範囲で書き、$Q_\mu(U)$ が $\mu$ に従うことを直接示せ。$U\sim\operatorname{Unif}(0,1)$ とする。

<!-- solution-start -->
**詳細解答**

質量は $-1$ で $1/3$、$2$ で $2/3$ 増えるから

$$
F_\mu(x)=\begin{cases}0&x<-1,\\1/3&-1\le x<2,\\1&x\ge2.\end{cases}
$$

$F_\mu(x)\ge u$ を初めて満たす点を探すと

$$
Q_\mu(u)=\begin{cases}-1&0<u\le1/3,\\2&1/3<u<1.\end{cases}
$$

です。したがって $\mathbb P(Q_\mu(U)=-1)=\mathbb P(U\le1/3)=1/3$、$\mathbb P(Q_\mu(U)=2)=2/3$ となり、必要な二つの原子質量が一致します。
<!-- solution-end -->

### OTR11-A02 原子のない場合の逆関数法
- Level: A

$\mu$ は $[0,1]$ 上に密度1を持つ分布、$\nu$ は $[0,1]$ 上の密度 $f_\nu(y)=3y^2$ を持つ分布とする。分位点 $Q_\nu$ を求め、単調な輸送写像 $T$ を構成し、$T_{\#}\mu=\nu$ を直接検算せよ。

<!-- solution-start -->
**詳細解答**

$0\le y\le1$ で $F_\nu(y)=\int_0^y3t^2dt=y^3$ なので、$Q_\nu(u)=u^{1/3}$ です。また $F_\mu(x)=x$（$0\le x\le1$）であるため [非原子の単調写像命題](#prop-otr11-monotone-map)の条件が成立し、$T(x)=x^{1/3}$ とできます。$X\sim\mu$、$0\le y\le1$ に対して

$$
\mathbb P(T(X)\le y)=\mathbb P(X^{1/3}\le y)
=\mathbb P(X\le y^3)=y^3=F_\nu(y).
$$

$y<0$ では0、$y>1$ では1なので全範囲で累積分布関数が一致します。
<!-- solution-end -->

### OTR11-A03 二点測度のWasserstein距離
- Level: A

$\mu=\tfrac12\delta_0+\tfrac12\delta_4$、$\nu=\tfrac12\delta_1+\tfrac12\delta_2$ とし、$p\ge1$ とする。単調結合を求め、$W_p^p$ の式を出せ。

<!-- solution-start -->
**詳細解答**

$0<u\le1/2$ では $(Q_\mu,Q_\nu)=(0,1)$、$1/2<u<1$ では $(4,2)$ なので、結合は $\tfrac12\delta_{(0,1)}+\tfrac12\delta_{(4,2)}$ です。[分位点公式](#thm-otr11-quantile-formula)の仮定である有限 $p$ 次モーメントは有限原子ゆえ満たされ、

$$
W_p(\mu,\nu)^p=\frac12|0-1|^p+\frac12|4-2|^p
=\frac{1+2^p}{2}.
$$

従って $W_1=3/2$、$W_2=\sqrt{5/2}$ です。
<!-- solution-end -->

### OTR11-A04 累積分布関数の面積
- Level: A

$\mu=\delta_0$、$\nu=\tfrac12\delta_{-2}+\tfrac12\delta_3$ とする。$F_\mu-F_\nu$ を区間ごとに求め、$W_1$ を累積分布関数の面積で計算せよ。

<!-- solution-start -->
**詳細解答**

$t<-2$ では両累積分布関数は0、$-2\le t<0$ では $F_\mu=0,F_\nu=1/2$、$0\le t<3$ では $F_\mu=1,F_\nu=1/2$、$t\ge3$ では両方1です。ゆえに

$$
\int_{\mathbb R}|F_\mu-F_\nu|dt
=\int_{-2}^0\frac12dt+\int_0^3\frac12dt
=1+\frac32=\frac52.
$$

[累積分布関数による公式](#cor-otr11-cdf-w1)が適用でき、$W_1=5/2$ です。唯一の結合が $0$ から $-2,3$ へ半分ずつ運ぶ費用でも $\tfrac12(2+3)=5/2$ となります。
<!-- solution-end -->

### OTR11-A05 原子があっても写像はあるか
- Level: A

$\mu=\tfrac12\delta_0+\tfrac12\delta_1$、$\nu=\delta_3$ とする。単調結合を求め、それが写像で表せることを示せ。さらに $\mu=\delta_0$、$\nu=\tfrac12\delta_1+\tfrac12\delta_3$ ではなぜ写像が存在しないか述べよ。

<!-- solution-start -->
**詳細解答**

最初の組では $Q_\mu$ が $u\le1/2$ で0、それ以外で1、$Q_\nu(u)=3$ は全区間で一定です。従って $\pi^\uparrow=\tfrac12\delta_{(0,3)}+\tfrac12\delta_{(1,3)}$ であり、$T(0)=T(1)=3$ とする写像で表せます。$T_{\#}\mu=\delta_3$ で、[分位点公式](#thm-otr11-quantile-formula)から最適です。

後者では写像による $\delta_0$ の押し出しは必ず $\delta_{T(0)}$ という一つの原子です。しかし目標は二つの原子に質量 $1/2$ を要求します。原子からの質量分割ができず、写像は存在しません。
<!-- solution-end -->

### OTR11-B01 交差解消の費用を再導出する
- Level: B

$a=0,b=2,v=1,w=4$ とし、$p=1$ と $p=2$ について、単調な割当てと交差する割当ての費用をそれぞれ比較せよ。さらに一般の $a\le b,v\le w$ について、二次費用の差を因数分解せよ。

<!-- solution-start -->
**詳細解答**

単調割当ては $(0,1),(2,4)$、交差割当ては $(0,4),(2,1)$ です。$p=1$ では単調費用 $1+2=3$、交差費用 $4+1=5$。$p=2$ ではそれぞれ $1^2+2^2=5$、$4^2+1^2=17$ です。一般の二次費用では

$$
\begin{aligned}
&(a-w)^2+(b-v)^2-(a-v)^2-(b-w)^2\\
&=(-2aw-2bv)-(-2av-2bw)\\
&=2(b-a)(w-v)\ge0.
\end{aligned}
$$

$p=2$ で両方の順序差が正なら厳密に費用が増えることを式でも確認できます。
<!-- solution-end -->

### OTR11-B02 連続分布のW2とW1
- Level: B

$\mu$ は $[0,1]$ に密度1を持つ分布、$\nu$ は同区間上の密度 $f_\nu(y)=2y$ を持つ分布とする。分位点を求め、$W_1$ と $W_2^2$ を積分から独立に計算せよ。$T(x)$ も答えよ。

<!-- solution-start -->
**詳細解答**

$F_\mu(x)=x,F_\nu(y)=y^2$（$0\le x,y\le1$）から、$Q_\mu(u)=u,Q_\nu(u)=\sqrt u$ です。$\sqrt u\ge u$ なので

$$
W_1=\int_0^1(\sqrt u-u)du
=\left[\frac23u^{3/2}-\frac12u^2\right]_0^1=\frac16.
$$

また

$$
W_2^2=\int_0^1(\sqrt u-u)^2du
=\int_0^1(u-2u^{3/2}+u^2)du
=\frac12-\frac45+\frac13=\frac1{30}.
$$

出発分布が原子を持たないので $T(x)=Q_\nu(F_\mu(x))=\sqrt x$（$\mu$-ほとんど至る所）です。
<!-- solution-end -->

### OTR11-B03 なぜW1の最適結合は一意でないか
- Level: B

$\mu=\tfrac12\delta_0+\tfrac12\delta_1$、$\nu=\tfrac12\delta_2+\tfrac12\delta_3$ とし、単調結合と交差結合を明記して、それぞれの $W_1$ 費用と二乗費用を求めよ。同じ $W_1$ 最適値が得られる理由を説明せよ。

<!-- solution-start -->
**詳細解答**

単調結合は $\gamma_\uparrow=\tfrac12\delta_{(0,2)}+\tfrac12\delta_{(1,3)}$、交差結合は $\gamma_\times=\tfrac12\delta_{(0,3)}+\tfrac12\delta_{(1,2)}$ です。どちらも $X<Y$ なので

$$
\int|x-y|d\gamma_\uparrow=\frac{2+2}{2}=2,\quad
\int|x-y|d\gamma_\times=\frac{3+1}{2}=2.
$$

しかし二乗費用はそれぞれ $(4+4)/2=4$、$(9+1)/2=5$ です。一般に $X\le1<2\le Y$ がどの結合でも成り立ち、$|X-Y|=Y-X$ の期待値は周辺分布だけで決まります。従って $p=1$ では両方最適で、$p=2$ では[厳密な交差解消](#lem-otr11-uncrossing)により単調結合だけが最適です。
<!-- solution-end -->

### OTR11-B04 分位点の差から距離収束を証明する
- Level: B

$p\ge1$ とし、$\mu_n,\mu\in\mathcal P_p(\mathbb R)$ とする。$Q_{\mu_n}\to Q_\mu$ が $L^p(0,1)$ で成立するとき、$W_p(\mu_n,\mu)\to0$ を示せ。また $\mu_n=(1-1/n)\delta_0+(1/n)\delta_n$（$n\ge2$）と $\mu=\delta_0$ では $p=1$ の結論がなぜ使えないか説明せよ。

<!-- solution-start -->
**詳細解答**

[分位点公式](#thm-otr11-quantile-formula)の対象は $\mathcal P_p(\mathbb R)$ なので、仮定の分布には適用できます。公式を $\mu_n,\mu$ に代入すると

$$
W_p(\mu_n,\mu)^p=\int_0^1|Q_{\mu_n}(u)-Q_\mu(u)|^pdu
=\|Q_{\mu_n}-Q_\mu\|_{L^p}^p\to0.
$$

したがって $W_p\to0$ です。反例の分位点は $Q_\mu=0$、$Q_{\mu_n}(u)=0$（$u\le1-1/n$）、$n$（$u>1-1/n$）です。各固定 $u<1$ では $n$ が大きいと $Q_{\mu_n}(u)=0$ となり点ごとには収束しますが

$$
\|Q_{\mu_n}-Q_\mu\|_{L^1}
=\int_{1-1/n}^1n\,du=1
$$

で $L^1$ 収束しません。遠方の小質量が費用を保つためです。これは[Wasserstein収束の特徴付け](../OTR9/index.md#thm-otr9-convergence)とも整合します。
<!-- solution-end -->

### OTR11-C01 原子分布の最適結合・写像・距離をまとめて判定する
- Level: C

$\mu=\tfrac14\delta_0+\tfrac34\delta_2$、$\nu=\tfrac12\delta_1+\tfrac12\delta_3$ とする。

1. 二つの分位点関数と単調結合 $\pi^\uparrow$ を求め、周辺分布が正しいことを確認せよ。
2. $W_1$ と $W_2^2$ を分位点から計算し、$W_1$ は $\int|F_\mu-F_\nu|$ でも再計算せよ。
3. どの輸送写像 $T:\mathbb R\to\mathbb R$ も $T_{\#}\mu=\nu$ とできないことを示せ。さらに $p=2$ の最適結合が一意である理由を述べよ。

<!-- solution-start -->
**詳細解答**

**1.** 分位点は

$$
Q_\mu(u)=\begin{cases}0&0<u\le1/4,\\2&1/4<u<1,\end{cases}
\quad
Q_\nu(u)=\begin{cases}1&0<u\le1/2,\\3&1/2<u<1.\end{cases}
$$

です。区間を $1/4,1/2$ で区切ると、$(0,1)$ に質量 $1/4$、$(2,1)$ に $1/4$、$(2,3)$ に $1/2$ を置きます。第一周辺は $0$ に $1/4$、$2$ に $1/4+1/2=3/4$、第二周辺は $1$ に $1/4+1/4=1/2$、$3$ に $1/2$ で一致します。

**2.** 三つの区間すべてで $|Q_\mu-Q_\nu|=1$ なので、[分位点公式](#thm-otr11-quantile-formula)により

$$
W_1=\frac14+\frac14+\frac12=1,\qquad
W_2^2=\frac14+\frac14+\frac12=1.
$$

累積分布関数は $F_\mu=0,1/4,1$ が順に $(-\infty,0),[0,2),[2,\infty)$ で、$F_\nu=0,1/2,1$ が $(-\infty,1),[1,3),[3,\infty)$ での値です。従って差の絶対値を区間ごとに積分すると

$$
\int|F_\mu-F_\nu|dt
=\int_0^1\frac14dt+\int_1^2\frac14dt+\int_2^3\frac12dt
=\frac14+\frac14+\frac12=1.
$$

**3.** 写像の押し出しで作れる各原子の質量は、出発点 $0,2$ の重み $1/4,3/4$ のいずれか、または両方の和 $1$ です。行き先に必要な質量 $1/2$ は作れません。よって写像は存在しません。ただし結合は第1問のように存在します。

ここでは $p=2>1$ で、二つの分布は有限二次モーメントを持ちます。したがって [分位点公式の一意性主張](#thm-otr11-quantile-formula)が適用され、$\pi^\uparrow$ だけが最適です。質量分割と最適性を混同しないことがこの問題の要点です。
<!-- solution-end -->

## 8. まとめと次への接続

- 実数直線では、分位点を共通の順位 $u$ で対応させる結合が $|x-y|^p$（$p\ge1$）に対して最適です。$W_p^p$ は分位点差の $p$ 乗の積分で計算できます。
- $p=1$ では累積分布関数の差の面積も同じ値です。$p>1$ の最適結合は一意ですが、$p=1$ では交差を含む別の最適結合もありえます。
- 出発分布に原子がなければ $Q_\nu\circ F_\mu$ が最適写像になります。原子がある場合も最適**結合**はありますが、質量分割が必要なら**写像**は存在しません。

次の OTR12 では、実数直線の「順序をそろえる」を多次元へ移す際に何が失われるかを考えます。二次費用の最適性条件から凸関数とその劣微分が登場します。
