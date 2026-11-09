# GMT1 Radon測度の球平均から局所密度を読む

<!-- definition-example-audit: strict -->

[MT8のHausdorff測度・次元](../../MT/MT8/index.md#def-mt8-hausdorff-measure)では、集合の「直径のべき」で大きさを測りました。しかし実際に集合上へ置いた質量は、ある点の周囲でどの程度集中するのでしょうか。線分上の長さの測度とCantor集合上の確率測度では、同じ小さな球でも質量の減り方が違います。

[HA1のLebesgue微分定理](../../HA/HA1/index.md#thm-ha1-differentiation)は、通常の体積で割った球平均から関数値を復元します。一方、曲線状の集合上の質量や原子を持つ測度では、球の体積が分母として適切ではありません。ここでは、**球の質量で割る微分**と、**半径のべきで割る幾何的密度**を分けて理解します。

本章では $d\ge1$ とし、中心 $x\in\mathbb R^d$、半径 $r>0$ の開球を

$$
B(x,r)=\{y\in\mathbb R^d:|y-x|<r\}
$$

と書きます。$\mu$ は $\mathbb R^d$ 上の正の [Radon測度](../../MT/MT5/index.md#def-mt5-radon)、すなわちコンパクト集合上で有限、開集合上で内正則、Borel集合上で外正則なBorel測度です。$\mathbb R^d$ は可算個のコンパクト球で覆えるため、$\mu$ は $\sigma$ 有限です。

点の近くに質量があるかを表す台 $\operatorname{supp}\mu$ は、すべての $r>0$ で $\mu(B(x,r))>0$ となる点 $x$ の集合です。台の外側は零質量の有理球の可算合併で覆えるので、$\mu(\mathbb R^d\setminus\operatorname{supp}\mu)=0$ です。

## 1. 球を拡大するだけでは測度を比較できない

HA1では有限個の球から互いに素な球を選び、元の球を3倍球で覆う [3倍被覆補題](../../HA/HA1/index.md#lem-ha1-finite-balls)を使いました。Lebesgue測度なら $|3B|=3^d|B|$ です。しかし任意のRadon測度に

$$
\mu(3B)\le C\mu(B)
$$

という共通の定数はありません。例えば $\mu=\delta_0$、$B=B(2,1)$ では $\mu(B)=0$ ですが $\mu(3B)=1$ です。よって「3倍球の測度を足す」というHA1の論法を、そのまま曲線や特異測度へ適用することはできません。

必要なのは、**元の球を拡大せずに**中心の集合を覆い、球の重なりだけを次元で抑える方法です。次の幾何学的選択法には、$\mu$ の倍加性を全く仮定しません。

球の重なりは指示関数 $\boldsymbol{1}_B(y)$（$y\in B$ なら1、それ以外は0）の和で数えます。従って $\sum_j\boldsymbol{1}_{B_j}(y)$ は点 $y$ を含む選択球の個数です。

<a id="lem-gmt1-besicovitch-balls"></a>

<!-- formal-statement-start -->
> **補題（Euclid球の有界重複被覆）**  
> $A\subset\mathbb R^d$ を有界集合、$R>0$ とし、各 $x\in A$ に一つずつ $0<r_x\le R$ を指定する。このとき、中心が $A$ にある指定球 $B(x_j,r_{x_j})$ を有限個または可算個選んで $A$ を覆い、任意の $y\in\mathbb R^d$ で

$$
\sum_j\boldsymbol{1}_{B(x_j,r_{x_j})}(y)\le N_d,\qquad
N_d=5^d(3^d+1)
$$

> とできる。定数は測度・半径・中心の配置には依存せず、次元 $d$ だけで決まる。
<!-- formal-statement-end -->

### 証明の見取り図

半径を2進区間ごとに分けます。同じ区間内では中心を一定間隔だけ離して取れば、各点を含む球の数は体積の詰め込みで抑えられます。異なる区間では、後から選ぶ中心が先の球の外にあるため、両方の球に入る点から見た中心方向が60度以上離れます。この二つの有限性を掛け合わせます。

<!-- proof-start -->
### 証明

$k=0,1,\ldots$ に対し、半径の区間

$$
I_k=(2^{-k-1}R,2^{-k}R],\qquad L_k=2^{-k-1}R
$$

を設けます。$k=0$ から順に、**まだ選んだ球に覆われていない** $x\in A$ で $r_x\in I_k$ となるものの集合を $A_k$ とします。$A_k$ から、相異なる中心同士の距離が $L_k$ 以上となる極大な有限集合 $S_k$ を取ります。

この集合は実際に有限個の貪欲操作で作れます。中心を一つ選ぶたび、既選択中心から距離 $L_k$ 未満の候補を除きます。選んだ中心の半径 $L_k/2$ の小球は互いに素で、有界な $A$ を含む固定大球を少し広げた球にすべて入ります。よって体積比較から選択回数は有限です。

候補が尽きると、残る全ての $x\in A_k$ は、どれかの $z\in S_k$ から距離 $<L_k$ です。選択球の半径は $r_z>L_k$ だから、$x\in B(z,r_z)$ となります。

したがって各区間を処理するたび $A_k$ 全体が覆われ、すべての $k$ を終えると $A$ が覆われます。

重複を数えます。一つの区間 $I_k$ に属し、固定点 $y$ を含む選択球の中心 $z$ は $|z-y|<2^{-k}R=2L_k$ を満たします。これらの中心の周りの半径 $L_k/2$ の小球は互いに素で、全て $B(y,(5/2)L_k)$ に入ります。Lebesgue体積の比から、その個数は高々

$$
\frac{((5/2)L_k)^d}{(L_k/2)^d}=5^d
$$

です。

次に $y$ を含む**異なる二つの区間**から選ばれた球を $B(a,r_a)$、$B(b,r_b)$ とし、$a$ の球が先に選ばれたとします。後の中心 $b$ は先の球に覆われていないので $|a-b|\ge r_a$。半径区間の順序から $r_a\ge r_b$ です。$u=|a-y|$、$v=|b-y|$ と置くと

$$
|a-b|\ge r_a\ge\max\{u,v\}.
$$

$u,v>0$ なら、余弦定理より中心方向の角 $\theta$ は

$$
2uv\cos\theta=u^2+v^2-|a-b|^2
\le\min\{u,v\}^2,
\qquad
\cos\theta\le\frac{\min\{u,v\}^2}{2uv}\le\frac12.
$$

よって、各区間から代表中心を一つずつ取ると、$y$ から見た単位方向ベクトル同士の距離は $1$ 以上です。単位方向ベクトルを中心とする半径 $1/2$ の小球は互いに素で、半径 $3/2$ の球に含まれるため、該当する区間は高々 $3^d$ 個です。$y$ と一致する中心は選択過程上高々一つで、これを別途1区間として数えます。

各区間の重複は高々 $5^d$、関係する区間は高々 $3^d+1$ なので、全重複は $5^d(3^d+1)$ 以下です。$\square$
<!-- proof-end -->

この定数は鋭くありませんが、後で必要なのは「**$r_x$ の分布にも $\mu$ にも依存しない**」ことだけです。

## 2. Radon測度に対する球平均の最大比

球の測度が正なら、$h$ の絶対値の平均は $\mu(B)$ で割って定義できます。これを中心と半径について最大化した量を考えます。$\mu(B)=0$ の球は平均から除外し、台の外の点は微分の結論に含めません。

<a id="def-gmt1-centered-maximal"></a>

<!-- formal-statement-start -->
> **定義（Radon測度の中心付き球最大平均）**  
> $\mu$ を $\mathbb R^d$ の正Radon測度、$h\in L^1_{\mathrm{loc}}(\mu)$、$R>0$ とする。$\mu(B(x,r))>0$ の球だけを使い

$$
M_{\mu,R}h(x)=
\sup_{\substack{0<r<R\\ \mu(B(x,r))>0}}
\frac{1}{\mu(B(x,r))}
\int_{B(x,r)}|h|\,d\mu
$$

> と定める。候補が空なら値を0とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt1-centered-maximal -->
**定義の確認**

点質量 $\mu=2\delta_0$、$h(0)=3$ を取ります。この $h$ は $L^1_{\mathrm{loc}}(\mu)$ に属し、原点を中心とするどの球でも

$$
\mu(B(0,r))=2,\qquad
\int_{B(0,r)}|h|\,d\mu=6,\qquad
M_{\mu,R}h(0)=3
$$

です。$x\ne0$ で $R\le|x|$ なら候補球はすべて質量0なので、空集合の場合の規約から最大平均は0です。一方 $R>|x|$ なら $|x|<r<R$ の球が原子0を含み、その平均は3です。すなわち

$$
M_{\mu,R}h(x)=
\begin{cases}
0&(x\ne0,\ R\le|x|),\\
3&(x\ne0,\ R>|x|).
\end{cases}
$$

台の外の値は、いずれにせよ微分の主張には使いません。
<!-- definition-example-end -->

有限球で重複が一様に抑えられることから、最大平均が大きい場所の $\mu$-測度が小さいと分かります。分母に通常の体積を使う [HA1の弱型評価](../../HA/HA1/index.md#thm-ha1-weak11)との違いは、被覆補題を使う位置です。

<a id="thm-gmt1-weak-maximal"></a>

<!-- formal-statement-start -->
> **定理（Radon測度に関する局所弱型評価）**  
> $\mu$ を正Radon測度、$h\in L^1(\mu)$、$K\subset\mathbb R^d$ をコンパクト集合、$R,t>0$ とする。このとき

$$
\mu(\{x\in K:M_{\mu,R}h(x)>t\})
\le\frac{N_d}{t}\int_{K_R}|h|\,d\mu,
\qquad
K_R=\{y:\operatorname{dist}(y,K)\le R\},
$$

> ここで $N_d=5^d(3^d+1)$ である。右辺を $\|h\|_{L^1(\mu)}$ で置き換えてもよい。
<!-- formal-statement-end -->

### 証明の見取り図

平均が $t$ を超える各中心で「良い球」を一つ選びます。[有界重複被覆補題](#lem-gmt1-besicovitch-balls)で中心集合を元の球のまま覆うと、分母の $\mu(B)$ を分子の $\int_B|h|$ で上から抑えられます。

<!-- proof-start -->
### 証明

$E=\{x\in K:M_{\mu,R}h(x)>t\}$ と置きます。固定した有理半径 $r$ に対し、$x\mapsto\mu(B(x,r))$ と $x\mapsto\int_{B(x,r)}|h|\,d\mu$ はBorel可測です。実際、$(x,y)\mapsto\boldsymbol{1}_{\{|x-y|<r\}}$ はBorel可測で、非負積分の可測性を使えます。

任意の実数 $0<r<R$ に対して有理数列 $r_n\uparrow r$ を取ると、$B(x,r_n)\uparrow B(x,r)$ です。単調収束によって分子・分母がそれぞれ収束し、$\mu(B(x,r))>0$ なら比も収束します。従って $M_{\mu,R}$ の上限は有理半径だけで計算でき、$E$ は可算個のBorel集合の和として可測です。

各 $x\in E$ で $0<r_x<R$ を選び、

$$
t\mu(B(x,r_x))<\int_{B(x,r_x)}|h|\,d\mu
$$

を満たさせます。$E$ は有界なので [有界重複被覆補題](#lem-gmt1-besicovitch-balls)を $A=E$ に適用し、$E\subset\bigcup_jB_j$、$\sum_j\boldsymbol{1}_{B_j}\le N_d$ を得ます。各球 $B_j$ は $K_R$ 内に含まれます。測度の可算劣加法性、各球の不等式、そして非負積分の単調収束の順に使うと

$$
\begin{aligned}
\mu(E)
&\le\sum_j\mu(B_j)
<\frac1t\sum_j\int_{B_j}|h|\,d\mu\\
&=\frac1t\int_{K_R}|h(y)|
\left(\sum_j\boldsymbol{1}_{B_j}(y)\right)d\mu(y)
\le\frac{N_d}{t}\int_{K_R}|h|\,d\mu.
\end{aligned}
$$

無限和のとき、各項の厳密不等号は全体について $\le$ と読めば十分です。$\square$
<!-- proof-end -->

## 3. 球平均で局所関数値を復元する

連続関数 $g$ なら $x$ を含む球が縮むと、球上の $|g(y)-g(x)|$ の最大値が0へ向かいます。$L^1$ 関数でも同じことを言いたい場合、$g$ へ近似した誤差の平均が問題です。そこで前節の最大比の評価を使います。[MT7の $C_c$ 稠密性](../../MT/MT7/index.md#thm-mt7-cc-dense)によって、その誤差の $L^1(\mu)$ ノルムは小さくできます。

以下、測度 $\mu$ に関して「ほとんど至る所」を $\mu$-a.e.（almost everywhere）と略記します。

<a id="thm-gmt1-function-differentiation"></a>

<!-- formal-statement-start -->
> **定理（Radon測度の球に関するLebesgue微分定理）**  
> $\mu$ を $\mathbb R^d$ 上の正Radon測度、$f\in L^1_{\mathrm{loc}}(\mu)$ とする。このとき $\mu$-ほとんど至る所の $x$ について

$$
\lim_{r\downarrow0}
\frac{1}{\mu(B(x,r))}
\int_{B(x,r)}|f(y)-f(x)|\,d\mu(y)=0.
$$

> 分母は十分小さい全ての半径で正であり、従って絶対値を積分の外へ移した通常の球平均も $f(x)$ へ収束する。ここでは $\mu$ の倍加性を仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

各大球内で $f$ をコンパクト台の関数へ切り出してから、連続コンパクト台の関数 $g$ へ $L^1$ 近似します。$g$ の平均誤差は連続性で消え、$f-g$ の平均誤差が大きい集合は弱型評価と直接の積分評価で消えます。

<!-- proof-start -->
### 証明

$K_n=\overline{B(0,n)}$ とし、連続な切断関数 $\eta_n$ を $0\le\eta_n\le1$、$\eta_n=1$ on $B(0,n+1)$、$\operatorname{supp}\eta_n\subset B(0,n+2)$ となるよう取ります。$F_n=\eta_n f$ は $L^1(\mu)$ に属します。実際、台はコンパクトで $f$ はその上で可積分だからです。

固定した $n$ と $\varepsilon>0$ について、[MT7の稠密性](../../MT/MT7/index.md#thm-mt7-cc-dense)により $g\in C_c(\mathbb R^d)$ を $\|F_n-g\|_{L^1(\mu)}<\varepsilon$ と選べます。$h=F_n-g$ と置きます。$x\in K_n$、$0<r<1$ なら $F_n=f$ が $B(x,r)$ で成立するので、三角不等式から

$$
\begin{aligned}
\frac1{\mu(B(x,r))}\int_{B(x,r)}|f(y)-f(x)|d\mu(y)
&\le\frac1{\mu(B(x,r))}\int_{B(x,r)}|h(y)|d\mu(y)\\
&\quad+|h(x)|+\sup_{y\in B(x,r)}|g(y)-g(x)|.
\end{aligned}
$$

$g$ の連続性から最後の項は $r\downarrow0$ で0になります。左辺の上極限を $D(x)$ と書けば

$$
D(x)\le M_{\mu,1}h(x)+|h(x)|
\qquad(\mu\text{-a.e. }x\in K_n).
$$

$t>0$ に対して [局所弱型評価](#thm-gmt1-weak-maximal)を使います。ここで $\|h\|_1:=\int_{\mathbb R^d}|h|\,d\mu$ と略記します。また $\{|h|>t\}$ 上では $|h|\ge t$ なので、積分から直接

$$
t\mu(\{|h|>t\}\cap K_n)\le\int_{\{|h|>t\}\cap K_n}|h|\,d\mu\le\|h\|_1
$$

を得ます。この二つを合わせると

$$
\begin{aligned}
\mu(\{x\in K_n:D(x)>2t\})
&\le\mu(\{M_{\mu,1}h>t\}\cap K_n)
+\mu(\{|h|>t\}\cap K_n)\\
&\le\frac{N_d+1}{t}\|h\|_1
<\frac{N_d+1}{t}\varepsilon.
\end{aligned}
$$

$\varepsilon$ は任意なので、この集合の測度は0です。$t=1/m$（$m\in\mathbb N$）を取れば $D=0$ が $K_n$ の $\mu$-a.e.で従います。さらに $n=1,2,\ldots$ で可算合併を取ると全空間の結論になります。$\square$
<!-- proof-end -->

注意：この定理が返すのは $\mu$ の質量を分母にした平均です。**局所的な長さ・面積の指数**を求めるには、別の正規化が必要です。

## 4. 二つの測度を比較する：特異な質量はどこへ行くか

たとえば $\mu$ は通常の長さ、$\nu$ は連続密度で重みを掛けた長さと点質量との和、と考えます。$\nu$ の球質量を $\mu$ の球質量で割ると、点質量のある場所で値が発散するかもしれません。しかしその点が $\mu$-零集合なら「$\mu$-ほとんど至る所の極限」は壊れません。

[MT3のLebesgue分解](../../MT/MT3/index.md#thm-mt3-lebesgue-decomposition-signed)による $\nu=f\mu+\nu_s$ を出発点とします。ここで $f\mu$ は $\mu$ に絶対連続な部分、$\nu_s$ は $\mu$ と互いに特異な部分です。$|\nu|$ は [全変動測度](../../MT/MT2/index.md#def-mt2-total-variation)であり、局所有限の場合には各コンパクト集合への制限で定義を整合的に適用します。点ごとに特異部分を先に消そうとせず、両測度を同時に支配する $\lambda=\mu+|\nu|$ に対して前節の定理を使います。

<a id="thm-gmt1-measure-differentiation"></a>

<!-- formal-statement-start -->
> **定理（Radon測度の微分・球比版）**  
> $\mu$ を $\mathbb R^d$ 上の正Radon測度、$\nu$ を局所有限な符号付きRadon測度とする。$\nu=f\mu+\nu_s$ を $\mu$ に関するLebesgue分解とすると、$\mu$-ほとんど至る所で

$$
\lim_{r\downarrow0}
\frac{\nu(B(x,r))}{\mu(B(x,r))}=f(x).
$$

> 特に $\nu\perp\mu$ ならこの比の極限は $\mu$-ほとんど至る所で0である。分母は $\mu$-ほとんど至る所の点で全ての半径について正である。
<!-- formal-statement-end -->

### 証明の見取り図

$\mu$ と $|\nu|$ を足した測度 $\lambda$ に関して、二つのRadon–Nikodym密度 $a=d\nu/d\lambda$、$b=d\mu/d\lambda$ を取ります。$\lambda$ に関する球平均をそれぞれ微分し、商を取ります。$\mu$-a.e.では $b>0$ なので極限の商は合法です。

<!-- proof-start -->
### 証明

$\lambda=\mu+|\nu|$ は正Radon測度であり $\sigma$ 有限です。[MT3の符号付きRadon–Nikodym定理](../../MT/MT3/index.md#thm-mt3-rn-signed)を局所化して適用すると、$a=d\nu/d\lambda$、$b=d\mu/d\lambda$ が局所可積分で、

$$
\nu(B)=\int_B a\,d\lambda,\qquad
\mu(B)=\int_B b\,d\lambda
$$

となります（$\lambda$ に関して局所有限なので、コンパクト球ごとに有限測度版を適用でき、密度は重なりで一意に一致します）。[球平均の微分定理](#thm-gmt1-function-differentiation)を $\lambda$ と関数 $a,b$ にそれぞれ適用すると、$\lambda$-a.e.、従って $\mu$-a.e. の $x$ で

$$
\frac{\nu(B(x,r))}{\lambda(B(x,r))}\longrightarrow a(x),
\qquad
\frac{\mu(B(x,r))}{\lambda(B(x,r))}\longrightarrow b(x).
$$

$\mu(\{b=0\})=\int_{\{b=0\}}b\,d\lambda=0$ なので、$\mu$-a.e.で $b(x)>0$。この点では $r$ が十分小さいとき分母 $\mu(B(x,r))>0$ であり、

$$
\frac{\nu(B(x,r))}{\mu(B(x,r))}
=\frac{\nu(B(x,r))/\lambda(B(x,r))}
{\mu(B(x,r))/\lambda(B(x,r))}
\longrightarrow\frac{a(x)}{b(x)}.
$$

最後に、$\nu_s$ の台となる $\mu$-零集合 $N$ を選びます。$\mathbb R^d\setminus N$ 上では $\nu=f\mu$ だから、測度の一意性から $a=fb$ が $\lambda$-a.e.に成立します。$\mu(N)=0$ かつ $b>0$ が $\mu$-a.e.であるため、$a/b=f$ が $\mu$-a.e.です。$\square$
<!-- proof-end -->

## 5. 半径のべきで割る：上密度・下密度

今度は比較相手を別の測度ではなく、半径 $r$ のべきにします。$s=1$ は曲線状の質量、$s=2$ は面状の質量の尺度です。MT8の [Hausdorff測度の定義](../../MT/MT8/index.md#def-mt8-hausdorff-measure)が直径を使うため、球の直径 $2r$ を正規化に採ります。$s$ は整数でなくてもよく、$s=0$ も許します。

<a id="def-gmt1-upper-lower-density"></a>

<!-- formal-statement-start -->
> **定義（上・下密度）**  
> $\mu$ を $\mathbb R^d$ 上の正Radon測度、$s\ge0$、$x\in\mathbb R^d$ とする。$x$ における下 $s$-密度と上 $s$-密度を

$$
\underline\Theta^s(\mu,x)=
\liminf_{r\downarrow0}\frac{\mu(B(x,r))}{(2r)^s},
\qquad
\overline\Theta^s(\mu,x)=
\limsup_{r\downarrow0}\frac{\mu(B(x,r))}{(2r)^s}
$$

> と定める。値は $[0,\infty]$ に属する。両者が一致するとき、その共通値を $\Theta^s(\mu,x)$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt1-upper-lower-density -->
**定義の確認**

点質量 $\mu=a\delta_0$（$a>0$）なら $\mu(B(0,r))=a$ が全 $r>0$ で成立します。従って $\underline\Theta^0=\overline\Theta^0=a$、$s>0$ では分母 $(2r)^s\to0$ なので両密度は $+\infty$ です。定義の「上・下」を両方とも計算しました。
<!-- definition-example-end -->

### 線分：密度1でも端点では半分

$\mu=\mathcal H^1\llcorner[0,L]$（$L>0$）を $\mathbb R$ 上に置きます。$\llcorner$ は測度を集合へ制限する記号です。[MT8の区間の測度計算](../../MT/MT8/index.md#thm-mt8-interval-dimension)から、開球と線分の交わりの長さがそのまま質量です。$0<x<L$、$0<r<\min(x,L-x)$ なら $\mu(B(x,r))=2r$、端点 $0$ なら $0<r<L$ で $\mu(B(0,r))=r$ です。よって

$$
\Theta^1(\mu,x)=
\begin{cases}
1&(0<x<L),\\
1/2&(x=0,L).
\end{cases}
$$

端点は $\mu$-零集合です。$\mu$ に関する関数の微分定理と、全点での幾何的密度の値は、量化の仕方が違います。

### 三進集合に質量を置く：指数は分数、上・下は一致しなくてもよい

中三分Cantor集合 $C\subset[0,1]$ の第 $n$ 段階は長さ $3^{-n}$ の閉区間 $2^n$ 個からなります。幾何的な長さは段階を重ねると0へ向かいますが、各区間へ均等に質量を配れば確率測度を残せます。[MT8のCantor次元の証明](../../MT/MT8/index.md#thm-mt8-cantor-dimension)で構成したこの測度を、ここでは球質量の計算対象にします。

<a id="def-gmt1-cantor-measure"></a>

<!-- formal-statement-start -->
> **定義（中三分Cantor測度）**  
> 中三分Cantor集合 $C$ を支えとし、各 $n\ge0$ の第 $n$ 段階区間 $I_{n,j}$（$j=1,\ldots,2^n$）に

$$
\kappa(I_{n,j})=2^{-n}
$$

> を与えるBorel確率測度 $\kappa$ を、中三分Cantor測度とする。この測度の存在はMT8の構成による。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt1-cantor-measure -->
**定義の確認**

第0段階は $[0,1]$ 一つなので $\kappa([0,1])=1$。第1段階の $[0,1/3]$ と $[2/3,1]$ は互いに素で質量は各 $1/2$、第2段階の4区間は各 $1/4$ です。第 $n$ 段階の総質量は $2^n\cdot2^{-n}=1$ で、除去された中間の開区間には質量がありません。この構成で $\kappa(C)=1$ も成立します。

台が正確に $C$ であることも球によって確認できます。$x\in C$ と $r>0$ に対し $3^{-n}<r$ となる $n$ を選べば、$x$ を含む第 $n$ 段階区間 $I_{n,j}$ は $B(x,r)$ に収まります。従って

$$
\kappa(B(x,r))\ge\kappa(I_{n,j})=2^{-n}>0.
$$

逆に $x\notin C$ なら $C$ は閉集合なので、十分小さい球 $B(x,r)$ は $C$ と交わらず、その質量は0です。両方向を合わせて $\operatorname{supp}\kappa=C$ です。
<!-- definition-example-end -->

$s=\log2/\log3$ と置くと $3^{-s}=1/2$ になります。以下ではこの測度の上下 $s$-密度を調べます。

<a id="prop-gmt1-cantor-density"></a>

<!-- formal-statement-start -->
> **命題（Cantor測度の二側密度評価と非収束例）**  
> $\kappa$ を上述のCantor確率測度、$s=\log2/\log3$ とする。任意の $x\in C$ について

$$
2^{-s-1}\le\underline\Theta^s(\kappa,x)
\le\overline\Theta^s(\kappa,x)\le6\cdot2^{-s}.
$$

> ただし $x=0$ では $\underline\Theta^s(\kappa,0)<\overline\Theta^s(\kappa,0)$ であり、$s$-密度の極限は存在しない。
<!-- formal-statement-end -->

### 証明の見取り図

$r$ を隣り合う二つの三進尺度で挟みます。球が含む小区間で下から、球が横切れる区間数で上から評価します。原点では同じ質量を捕まえる二つの半径列が異なる正規化値を生みます。

<!-- proof-start -->
### 証明

$3^{-(n+1)}\le r<3^{-n}$ となる $n\ge0$ を取ります。$x$ を含む第 $n+1$ 段階区間の長さは $3^{-(n+1)}\le r$ で、端点は $\kappa$-零なので、その区間の質量は球 $B(x,r)$ に含まれます。従って

$$
\kappa(B(x,r))\ge2^{-(n+1)}.
$$

一方、相異なる第 $n$ 段階区間の間隔は少なくとも $3^{-n}$ です。長さ $2r<2\cdot3^{-n}$ の球が内部を横切れる第 $n$ 段階区間は高々3個なので

$$
\kappa(B(x,r))\le3\cdot2^{-n}.
$$

$2^{-(n+1)}\le r^s<2^{-n}$ を両辺へ代入して

$$
\frac12r^s\le\kappa(B(x,r))\le6r^s
$$

を得ます。$(2r)^s$ で割り、$r\downarrow0$ の下極限・上極限を取れば所望の二側評価です。

原点では $r_n=3^{-n}$ と $r'_n=2\cdot3^{-n}$ のどちらの球も、最左の第 $n$ 段階区間の質量だけを拾います（次の区間の左端は $2\cdot3^{-n}$ で、端点は零質量）。従って

$$
\frac{\kappa(B(0,r_n))}{(2r_n)^s}=2^{-s},
\qquad
\frac{\kappa(B(0,r'_n))}{(2r'_n)^s}=4^{-s}.
$$

$s>0$ なので二つの値は異なり、全極限は存在しません。$\square$
<!-- proof-end -->

上・下密度が共に正かつ有限であることと、密度の**極限が存在すること**は別です。Cantor測度の例は前者を保証しても後者を保証しません。

### Hausdorff測度との接続

可測集合 $E$、$s>0$ に対して、球成長評価が一つの共通な $r_0>0$ と $C>0$ を用いて $\mu(B(x,r))\le C(2r)^s$（全ての $x\in E$、$0<r<r_0$）を満たす場合を考えます。

$E$ の直径 $r_0/2$ 未満の被覆 $E\subset\bigcup_i U_i$ に対して、$U_i\cap E\ne\varnothing$ なら $x_i\in U_i\cap E$ を選びます。$U_i$ 自身は可測とは限らないため、$\mu^*(U_i)$ を $\mu$ から作る外測度（$U_i$ を含むBorel集合の測度の下限）と書きます。

$U_i\subset B(x_i,\operatorname{diam}U_i+\varepsilon)$ で、右辺の球はBorel集合です。$\varepsilon\downarrow0$ として各 $i$ で球成長評価を使えば

$$
\mu(E)\le\sum_i\mu^*(U_i)
\le C\,2^s\sum_i(\operatorname{diam}U_i)^s.
$$

（直径0の集合は一点集合であり、$s>0$ で球成長評価から外測度0と分かります。）被覆の下限を取り $\delta\downarrow0$ とすれば、[MT8の質量分布原理](../../MT/MT8/index.md#thm-mt8-mass-principle)の結論 $\mu(E)\le C2^s\mathcal H^s(E)$ を回復します。ここでの一様な球成長評価と、個々の点での上密度が有限という条件を混同しないよう注意します。

## 6. 演習

### GMT1-A01 原子と指数
- Level: A
- 目安時間: 12分

$\mu=2\delta_0+3\delta_2$ を $\mathbb R$ 上に置く。$x=0,2,1$ のそれぞれについて $s=0$ と $s=1$ の上下密度を求めよ。

<!-- solution-start -->
#### 詳細解答

$0<r<1$ では $\mu(B(0,r))=2$、$\mu(B(2,r))=3$、$\mu(B(1,r))=0$ です。$s=0$ の分母は1なので、$x=0$ では上下密度が2、$x=2$ では3、$x=1$ では0です。$s=1$ では原子のある二点の比は $2/(2r)=1/r$、$3/(2r)$ でいずれも $+\infty$ へ発散し、$x=1$ の比は0です。台の外でも幾何的密度は定義できますが、球平均の微分定理が主張するのは $\mu$-a.e.の点だけです。
<!-- solution-end -->

### GMT1-A02 線分の端点と指数
- Level: A
- 目安時間: 12分

$\mu=\mathcal H^1\llcorner[0,4]$ とする。$x=2,0$ における $s=1$、$s=1/2$、$s=2$ の密度を計算せよ。

<!-- solution-start -->
#### 詳細解答

$x=2$ で $0<r<2$ なら球との交差は長さ $2r$、$x=0$ で $0<r<4$ なら長さ $r$ です。従って $c=2$（内点）または $c=1$（端点）として、どちらも

$$
\frac{\mu(B(x,r))}{(2r)^s}=\frac{cr}{(2r)^s}=c2^{-s}r^{1-s}
$$

と表せます。$s=1$ なら定数 $c/2$ なので密度は順に $1,1/2$、$s=1/2$ なら $c2^{-1/2}r^{1/2}\to0$、$s=2$ なら $c4^{-1}r^{-1}\to+\infty$ です。いずれも下極限と上極限は一致します。
<!-- solution-end -->

### GMT1-A03 Cantorの二つの尺度
- Level: A
- 目安時間: 15分

中三分Cantor測度 $\kappa$ と $s=\log2/\log3$ について、$r_n=3^{-n}$ と $r'_n=2\cdot3^{-n}$ で $\kappa(B(0,r_n))$、$\kappa(B(0,r'_n))$ を直接求め、$s$-密度の極限の存在を判定せよ。

<!-- solution-start -->
#### 詳細解答

第 $n$ 段階の最左区間は $[0,3^{-n}]$ で質量 $2^{-n}$。次の第 $n$ 段階区間の左端は $2\cdot3^{-n}$ なので、どちらの半径の開球にも最左区間以外の正の質量は入りません。従って両質量は $2^{-n}$ です。$3^{-ns}=2^{-n}$ により正規化値はそれぞれ $2^{-s}$ と $4^{-s}$。異なる正の値に沿う部分列が存在するので、全極限はありません。
<!-- solution-end -->

### GMT1-A04 測度の定数倍
- Level: A
- 目安時間: 10分

正Radon測度 $\mu$、$a>0$、$s\ge0$ について $\underline\Theta^s(a\mu,x)$、$\overline\Theta^s(a\mu,x)$ と $\mu$ の上下密度の関係を証明せよ。また $M_{a\mu,R}h=M_{\mu,R}h$ を証明せよ。

<!-- solution-start -->
#### 詳細解答

各球で $(a\mu)(B)=a\mu(B)$ なので、$(a\mu)(B)/(2r)^s=a\{\mu(B)/(2r)^s\}$ です。$a>0$ の定数倍は下極限・上極限と交換でき、両密度は $a$ 倍されます。最大平均では分子も $\int_B|h|d(a\mu)=a\int_B|h|d\mu$ と $a$ 倍され、分母の $a\mu(B)$ と相殺します。正の分母を持つ候補球の集合も変わらないので最大平均は一致します。
<!-- solution-end -->

### GMT1-B01 倍加性なしでの弱型評価
- Level: B
- 目安時間: 25分

$\mu$ を任意の正Radon測度、$h\in L^1(\mu)$、$K$ をコンパクト、$0<R<\infty$ とする。有界重複補題だけを前提に、集合 $\{x\in K:M_{\mu,R}h(x)>t\}$ の測度を $\int_{K_R}|h|d\mu$ で評価せよ。$\mu(3B)\le C\mu(B)$ を使ってはならない。

<!-- solution-start -->
#### 詳細解答

各中心 $x$ に平均が $t$ を超える球 $B_x$ を一つ選びます。半径は $R$ 未満であるため、中心集合 $E$ は有界、選んだ球は $K_R$ 内にあります。[被覆補題](#lem-gmt1-besicovitch-balls)から $E\subset\bigcup_j B_j$ かつ $\sum_j\boldsymbol{1}_{B_j}\le N_d$ となる部分族を得ます。各 $j$ で $\mu(B_j)<t^{-1}\int_{B_j}|h|d\mu$ ですから

$$
\mu(E)\le\sum_j\mu(B_j)
\le\frac1t\int_{K_R}|h|\sum_j\boldsymbol{1}_{B_j}\,d\mu
\le\frac{N_d}{t}\int_{K_R}|h|\,d\mu.
$$

第一段階は可算劣加法性、第二段階は選択球の不等式、第三段階はTonelliの非負積分です。球を拡大していないため倍加条件は不要です。
<!-- solution-end -->

### GMT1-B02 原子と連続部分の微分
- Level: B
- 目安時間: 25分

$\mu=\mathcal L^1\llcorner[0,1]+\delta_0$、$f=\boldsymbol{1}_{[0,1/2]}$ とする。$x=0$ と $x\in(0,1/2)$ と $x\in(1/2,1)$ で、$\mu$-球平均 $\mu(B(x,r))^{-1}\int_{B(x,r)} f\,d\mu$ の極限を計算せよ。$x=1/2$ では何が起きるか。

<!-- solution-start -->
#### 詳細解答

$0<r<1/2$ なら $B(0,r)$ は $[0,r)$ のLebesgue部分と原子 $\delta_0$ を含みます。$f=1$ がこの全体で成り立つため、平均は

$$
\frac{\int_{B(0,r)}f\,d\mu}{\mu(B(0,r))}
=\frac{r+1}{r+1}=1
$$

です。

$x\in(0,1/2)$ では十分小さい球が $(0,1/2)$ 内に入り、分母・分子は共に $2r$ なので極限は1です。$x\in(1/2,1)$ では十分小さい球で $f=0$ となり、極限は0です。

$x=1/2$ では $0<r<1/2$ の球に原子はなく、分母は $2r$、分子は左半分の長さ $r$ です。従って平均は

$$
\frac{\int_{B(1/2,r)}f\,d\mu}{\mu(B(1/2,r))}
=\frac{r}{2r}=\frac12.
$$

これは $f(1/2)=1$ に一致しませんが、$\mu(\{1/2\})=0$ なので [微分定理](#thm-gmt1-function-differentiation)と矛盾しません。
<!-- solution-end -->

### GMT1-B03 特異測度の比
- Level: B
- 目安時間: 25分

$\mu=\mathcal L^1\llcorner[-1,1]$、$\nu=\boldsymbol{1}_{[0,1]}\mu+\delta_0$ とする。$\mu$-a.e.での $\nu(B(x,r))/\mu(B(x,r))$ の極限を求め、$x=0$ での挙動も直接計算せよ。

<!-- solution-start -->
#### 詳細解答

$\delta_0$ は $\mu$ に特異で、$\boldsymbol{1}_{[0,1]}\mu$ は絶対連続部分です。[Radon測度の微分・球比版](#thm-gmt1-measure-differentiation)により極限は $\boldsymbol{1}_{[0,1]}(x)$ が $\mu$-a.e.で成り立ちます。直接にも $-1<x<0$ で十分小さい球は原子と $[0,1]$ を避けて比0、$0<x<1$ では球内で両者の連続部分が一致し比1です。$x=0$ では $0<r<1$ のとき分母 $2r$、分子は右側の長さ $r$ に原子1を足した $r+1$ なので

$$
\frac{\nu(B(0,r))}{\mu(B(0,r))}
=\frac{r+1}{2r}=\frac12+\frac1{2r}\longrightarrow+\infty.
$$

例外点0は $\mu$-零集合であることを明示しておく必要があります。
<!-- solution-end -->

### GMT1-B04 半径帯から有界重複を再構成する
- Level: B
- 目安時間: 35分

$A\subset\mathbb R^d$ を有界とし、各 $x\in A$ に $0<r_x\le R$ が指定されている。$I_k=(2^{-k-1}R,2^{-k}R]$、$L_k=2^{-k-1}R$ とし、半径の大きい帯から、未被覆の中心のうち距離が $L_k$ 以上離れるものを貪欲に選ぶ。

1. 各帯で選択が有限回で終わり、未被覆だった中心を覆える理由を示せ。
2. 一点 $y$ を含む同一帯の選択球が高々 $5^d$ 個であることを導け。
3. 異なる帯の選択球がともに $y$ を含む場合の中心方向の角度を評価し、全帯での重複数が $5^d(3^d+1)$ 以下となることを示せ。

<!-- solution-start -->
#### 詳細解答

1. $A$ は有界なので、選択中心の周りの半径 $L_k/2$ の小球は互いに素で、いずれも一つの有界な大球に入ります。小球の体積は共通の正数だから、体積比較により選択数は有限です。選択終了時に未被覆の $x$ が全選択中心から距離 $L_k$ 以上なら、なお追加選択できて矛盾します。従ってある選択中心 $z$ と $|x-z|<L_k<r_z$ を満たし、$x\in B(z,r_z)$ です。全帯の処理後、$A$ は選択球で覆われます。
2. $y\in B(z,r_z)$ なら $|z-y|<r_z\le2L_k$。中心 $z$ の周りの半径 $L_k/2$ の小球は、互いに素で $B(y,5L_k/2)$ に入ります。$d$ 次元の球体積は半径の $d$ 乗に比例するから

   $$
   \#\{z:\text{帯 }k\text{ で }y\in B(z,r_z)\}
   \le\frac{(5L_k/2)^d}{(L_k/2)^d}=5^d.
   $$

3. 先に選ばれた球を $B(a,r_a)$、後の球を $B(b,r_b)$ とすると、後の中心は先の球の外にあり、$|a-b|\ge r_a\ge r_b$ です。$u=|a-y|<r_a$、$v=|b-y|<r_b$ と置くと $|a-b|\ge\max(u,v)$。$u,v>0$ では余弦定理から

   $$
   \cos\theta
   =\frac{u^2+v^2-|a-b|^2}{2uv}
   \le\frac{\min(u,v)^2}{2uv}\le\frac12.
   $$

   各帯から一つずつ代表中心を取ると、$y$ からの単位方向は互いに60度以上離れ、単位ベクトル間の距離は1以上です。その周りの半径 $1/2$ の球を詰めると、方向数は $((3/2)/(1/2))^d=3^d$ 以下です。$y$ と一致する選択中心は一つ以下なので、それを含めて帯数は高々 $3^d+1$。第2問の帯内評価を掛け、重複数は $5^d(3^d+1)$ 以下です。
<!-- solution-end -->

### GMT1-B05 球成長評価とHausdorff測度
- Level: B
- 目安時間: 30分

$E\subset\mathbb R^d$ を有界なBorel集合、$\mu$ を正Radon測度、$s>0$ とする。ある $C,r_0>0$ について、全ての $x\in E$ と $0<r<r_0$ に対して $\mu(B(x,r))\le C(2r)^s$ が成り立つとする。被覆集合がBorel可測とは限らないことにも注意して

$$
\mu(E)\le 2^s C\mathcal H^s(E)
$$

を証明せよ。また、定数 $C,r_0$ を各点ごとに違うものへ置き換えるだけでは、同じ証明が直ちには成立しない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

$0<\delta<r_0/2$ とし、$E$ の直径 $\delta$ 未満の任意の可算被覆 $(U_i)$ を取ります。$U_i\cap E=\varnothing$ の項は捨て、他では $x_i\in U_i\cap E$ を選びます。$\operatorname{diam}U_i+\varepsilon<r_0$ となる $\varepsilon>0$ について

$$
U_i\subset B(x_i,\operatorname{diam}U_i+\varepsilon)
$$

なので、$\mu$ による外測度 $\mu^*$ と球成長評価から

$$
\mu^*(U_i)
\le C\{2(\operatorname{diam}U_i+\varepsilon)\}^s.
$$

$\varepsilon\downarrow0$ として $\mu^*(U_i)\le2^sC(\operatorname{diam}U_i)^s$ を得ます。直径0でも、この手順から一点集合の外測度が0と分かります。$E$ はBorel可測だから

$$
\mu(E)\le\sum_i\mu^*(U_i)
\le2^s C\sum_i(\operatorname{diam}U_i)^s.
$$

任意の被覆について下限を取り、次いで $\delta\downarrow0$ とすれば [Hausdorff測度の定義](../../MT/MT8/index.md#def-mt8-hausdorff-measure)より結論が従います。一様な $C,r_0$ を使ったから、全ての被覆要素へ同じ係数の評価を適用できました。点ごとに定数や半径が異なるだけでは、任意の被覆に一つの係数を掛けて和を評価する段階が正当化されません。
<!-- solution-end -->

### GMT1-C01 球比の微分を二つの関数へ還元する
- Level: C
- 目安時間: 45分

$\mu$ を $\mathbb R^d$ 上の正Radon測度、$\nu$ を局所有限符号付きRadon測度とする。$\lambda=\mu+|\nu|$ と置く。

1. $\lambda$ が局所有限・$\sigma$ 有限であることを示し、$a=d\nu/d\lambda$、$b=d\mu/d\lambda$ の局所可積分性を確かめよ。
2. $\lambda$ に関する球平均の微分定理だけを使って、$b(x)>0$ が $\mu$-a.e.であることと、球比の極限が $a(x)/b(x)$ であることを導け。
3. $\nu=f\mu+\nu_s$、$\nu_s\perp\mu$ なら、その極限が $f(x)$ と一致する理由を述べよ。特異部分の台では比が発散してもよい理由も説明せよ。

<!-- solution-start -->
#### 詳細解答

1. コンパクト集合 $K$ では $\lambda(K)=\mu(K)+|\nu|(K)<\infty$ です。さらに開集合上の内正則性とBorel集合上の外正則性は測度の和でも保たれます。$\mathbb R^d=\bigcup_n\overline{B(0,n)}$ なので $\sigma$ 有限です。$\mu\ll\lambda$、$\nu\ll\lambda$ だから、コンパクト球ごとに [MT3のRadon–Nikodym定理](../../MT/MT3/index.md#thm-mt3-rn-signed)を適用して $a,b$ を構成できます。重なりでは一意性から一致し、各コンパクト球で

   $$
   \int_K|a|\,d\lambda=|\nu|(K)<\infty,\qquad
   \int_K b\,d\lambda=\mu(K)<\infty
   $$

   なので局所可積分です。
2. [微分定理](#thm-gmt1-function-differentiation)を $a$ と $b$ に適用すると、$\lambda$-a.e.で

   $$
   \frac{\nu(B(x,r))}{\lambda(B(x,r))}\to a(x),\qquad
   \frac{\mu(B(x,r))}{\lambda(B(x,r))}\to b(x).
   $$

   また $\mu(\{b=0\})=\int_{\{b=0\}}b\,d\lambda=0$ なので、$\mu$-a.e.で $b(x)>0$ です。その点では後者の比が十分小さい球で正となり、商の極限から

   $$
   \frac{\nu(B(x,r))}{\mu(B(x,r))}\to\frac{a(x)}{b(x)}
   $$

   が得られます。
3. $\mu(N)=0$、$|\nu_s|(\mathbb R^d\setminus N)=0$ となる $N$ を取ります。$N^c$ 上では $\nu=f\mu$ なので、同じ支配測度 $\lambda$ に関する密度の一意性から $a=fb$ が $\lambda$-a.e.で成立します。$\mu(N)=0$ ゆえ $a/b=f$ が $\mu$-a.e.で従います。$N$ の点では $\mu$ の分母が速く0へ近づく可能性があり、特異測度の分子を同じ尺度で抑える保証はありません。したがって $N$ 上での発散は $\mu$-a.e.の結論と矛盾しません。
<!-- solution-end -->

## まとめ

- 一般のRadon測度では3倍球への拡大で測度を比較できないため、中心集合を**元の球のまま有界重複で覆う**。
- その選択法から最大平均の弱型評価を証明し、$C_c$ 稠密性と組み合わせて球平均の微分定理を得る。
- 測度の球比は絶対連続部分のRadon–Nikodym密度を $\mu$-a.e.で復元する。特異部分の例外点を無条件に消してはならない。
- 幾何的上下密度は $(2r)^s$ で正規化する。原子・線分・Cantor測度では指数と極限の挙動が異なり、上密度と下密度の一致は別途検証を要する。

次の GMT2 では、逆に「小球への質量が $r^s$ を超えない」測度を、集合のHausdorff次元からどう**構成**するかを考えます。
