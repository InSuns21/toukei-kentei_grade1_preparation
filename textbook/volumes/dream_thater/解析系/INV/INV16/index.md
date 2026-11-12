# INV16 逆問題の不確実性をどう読むか

[INV15 の線形 Gaussian 逆問題](../INV15/index.md#thm-inv15-gaussian-posterior)では、観測値 $y$ から事後平均 $\mu_y$ と事後分散共分散行列 $\Gamma_y$ を求めました。しかし「平均が $1$」だけでは、真の値がどの範囲にありそうかは分かりません。また、事後分布の下で確率 $95\%$ という主張と、実験を繰り返したときに真値を含む割合が $95\%$ という主張は、確率を掛ける対象が違います。

本講では最初に有限次元の事後分布から不確実性を計算し、次に**事前分布の選択**と**観測モデルのずれ**でその数値が変わることを調べます。最後に、未知量が関数や無限列である場合には、有限次元の Lebesgue 密度をそのまま書けない理由を確認し、事前確率測度を基準にした Bayes 更新を導きます。

## 1. 事後の「95%」が意味すること

有限次元 Gaussian 事後分布 $X\mid Y=y\sim N(\mu_y,\Gamma_y)$ を仮定しましょう。$\mu_y$ と $\Gamma_y$ は、[INV15 の事後分布公式](../INV15/index.md#thm-inv15-gaussian-posterior)の仮定が成立する場合に計算できます。事後分布から「ありそうな値の集合」を作りたいときには、まずその集合に関する事後確率を指定します。ここで**可測集合**とは、確率測度によって確率を割り当てられる集合のことです。可測空間 $(\mathcal X,\mathcal B)$ の $\mathcal B$ は補集合と可算和に閉じた集合族（$\sigma$-代数）で、$\mathbb R^n$ では開集合から生成される Borel 集合族を使います。

<a id="def-inv16-credible-region"></a>

<!-- formal-statement-start -->
> **定義（信用領域）**  
> 可測空間 $(\mathcal X,\mathcal B)$ 上の事後確率測度 $\mu^y$ と $0<\alpha<1$ を固定する。$C(y)\in\mathcal B$ が

$$
\mu^y(C(y))\ge 1-\alpha
$$

> を満たすとき、$C(y)$ を水準 $1-\alpha$ の**信用領域**と呼ぶ。$\mathcal X=\mathbb R$ で区間となるものを信用区間と呼ぶ。指定された確率を満たす集合は一般に一意でない。
<!-- formal-statement-end -->

「信用領域」の定義自体は分布が Gaussian でなくても使えます。

<!-- definition-example-start: def-inv16-credible-region -->

**定義の確認**：$X\mid y\sim N(1,1/2)$ とすると、標準正規分布の累積分布関数 $\Phi(t)=P(Z\le t)$（$Z\sim N(0,1)$）に対し

$$
C(y)=\left[1-\frac{z_{0.975}}{\sqrt2},\,
1+\frac{z_{0.975}}{\sqrt2}\right],
\qquad \Phi(z_{0.975})=0.975
$$

と置けます。$z_{0.975}\simeq1.960$ なので、区間は約 $[-0.386,2.386]$ です。$W=\sqrt2(X-1)\sim N(0,1)$ と変換すると

$$
P(X\in C(y)\mid Y=y)
=P(-z_{0.975}\le W\le z_{0.975})
=0.975-0.025=0.95.
$$

区間の端点を計算するだけでなく、定義の確率条件を確かめました。
<!-- definition-example-end -->

単一の線形観測量だけに関心がある場合は、多変量の領域全体を計算する必要はありません。例えば $a\in\mathbb R^n$ を固定し、$a^TX$ という量について区間を作れます。

<a id="prop-inv16-linear-functional"></a>

<!-- formal-statement-start -->
> **命題（線形観測量の Gaussian 信用区間）**  
> $n\ge1$、$X\mid Y=y\sim N(\mu_y,\Gamma_y)$、$\Gamma_y$ は対称正定値、$a\in\mathbb R^n\setminus\{0\}$ とする。このとき $a^TX$ の事後分布の平均と分散は

$$
m_a=a^T\mu_y,\qquad s_a^2=a^T\Gamma_y a>0
$$

> であり、$z_{1-\alpha/2}$ を標準正規分布の $1-\alpha/2$ 分位点とすると

$$
\left[m_a-z_{1-\alpha/2}s_a,\;
m_a+z_{1-\alpha/2}s_a\right]
$$

> は事後確率 $1-\alpha$ の信用区間である。
<!-- formal-statement-end -->

### 証明の見取り図

多変量 Gaussian を線形写像で一次元へ送ると、正規分布になります。その平均・分散を計算し、標準化した確率を確認します。ここでの確率は**観測値 $y$ を固定した事後分布の確率**です。

<!-- proof-start -->
### 証明

[INV15 で定めた Gaussian 密度](../INV15/index.md#def-inv15-gaussian-density)の直交対角化により、$X=\mu_y+UZ$ と分布表示でき、$U\operatorname{diag}(\lambda_1,\dots,\lambda_n)U^T=\Gamma_y$、$Z$ の各座標は独立な $N(0,\lambda_j)$ です。したがって

$$
a^TX=a^T\mu_y+\sum_{j=1}^n(U^Ta)_jZ_j.
$$

独立正規変数の線形結合は正規分布で、その分散は独立性から

$$
\sum_{j=1}^n(U^Ta)_j^2\lambda_j
=a^TU\operatorname{diag}(\lambda_j)U^Ta
=a^T\Gamma_y a.
$$

正定値性と $a\ne0$ から $s_a>0$ です。$V=(a^TX-m_a)/s_a$ は標準正規分布に従い、

$$
\begin{aligned}
P(m_a-z_{1-\alpha/2}s_a\le a^TX\le m_a+z_{1-\alpha/2}s_a\mid y)
&=P(-z_{1-\alpha/2}\le V\le z_{1-\alpha/2})\\
&=(1-\alpha/2)-\alpha/2\\
&=1-\alpha.
\end{aligned}
$$

最後の等式では標準正規分布の対称性を使いました。
<!-- proof-end -->

**具体例**：事後平均 $(1,2)^T$、事後共分散行列

$$
\Gamma_y=\begin{pmatrix}2&1\\1&3\end{pmatrix}
$$

について差 $X_1-X_2$ を考えます。この行列は二つの座標の共分散を表し、対称です。[INV15 で導入した正定値性の定義](../INV15/index.md#def-inv15-gaussian-density)に従い、非零の $v=(s,t)^T$ に対し $v^T\Gamma_yv>0$ を直接確認します。実際、基底 $(1,0)^T,(0,1)^T$ で展開すれば

$$
v^T\Gamma_yv=2s^2+2st+3t^2
=2\left(s+\frac t2\right)^2+\frac52t^2>0
\qquad(v\ne0).
$$

したがって対称正定値です。行列式 $2\cdot3-1^2=5>0$ という計算とも整合しますが、ここでは元の定義の二次形式を使って判定しました。差 $X_1-X_2$ は $a=(1,-1)^T$ を用いると $a^TX$ と表せます。これを[線形観測量の命題](#prop-inv16-linear-functional)へ代入すると

$$
m_a=1-2=-1,\quad
\Gamma_ya=(1,-2)^T,\quad
s_a^2=a^T\Gamma_ya=1+2=3.
$$

よって $95\%$ 信用区間は $[-1-1.960\sqrt3,\,-1+1.960\sqrt3]$ です。共分散の非対角成分を落とすと $s_a^2=5$ と誤計算します。

## 2. 信用区間と頻度論的な被覆率は同じか

今度は真の未知量 $\theta$ を確率変数ではなく**固定された未知定数**と考え、装置で新しい観測 $Y$ を何度も取り直します。区間 $C(Y)$ は観測のたびに動きます。「その動く区間が固定した真値を含む割合」を別に定義する必要があります。

<a id="def-inv16-coverage"></a>

<!-- formal-statement-start -->
> **定義（頻度論的被覆率）**  
> パラメータ集合 $\Theta$ と、各 $\theta\in\Theta$ に対するデータ分布 $P_\theta$ を考える。$Y$ の可測な関数として定めた区間 $C(Y)$ に対し、固定された真値 $\theta$ における**被覆率**を

$$
\operatorname{Cov}_\theta(C)=P_\theta\{\theta\in C(Y)\}
$$

> と定義する。全ての $\theta\in\Theta$ でこの確率が少なくとも $1-\alpha$ のとき、$C(Y)$ は水準 $1-\alpha$ の（保守的なものも含む）信頼区間である。
<!-- formal-statement-end -->

確率を付けた対象に注目してください。信用区間は観測 $y$ を固定し、[事後分布](../INV15/index.md#def-inv15-posterior)によって未知量の取り得る値に確率を付けます。一方、被覆率は $\theta$ を固定し、**繰り返すデータ $Y$** に確率を付けます。両者はあるモデルでは一致しても、定義上は同じではありません。

<!-- definition-example-start: def-inv16-coverage -->

**定義の確認**：$Y=\theta+E$、$E\sim N(0,1)$ とし、区間 $C(Y)=[Y-1.960,Y+1.960]$ を作ります。固定した任意の $\theta\in\mathbb R$ について

$$
P_\theta\{\theta\in C(Y)\}
=P_\theta(|Y-\theta|\le1.960)
=P(|E|\le1.960)\simeq0.95.
$$

真値 $\theta$ の確率分布を考えなくても、被覆率を確認できます。
<!-- definition-example-end -->

次に、Bayes の $95\%$ 信用区間が自動的に $95\%$ 信頼区間になるわけではないことを、数値で確かめます。

<a id="prop-inv16-coverage-mismatch"></a>

<!-- formal-statement-start -->
> **命題（Gaussian 縮小事後の信用区間と被覆率）**  
> 解析者は $X\sim N(0,1)$ と独立誤差 $E\sim N(0,1)$ のモデル $Y=X+E$ を使い、事後分布から

$$
C(Y)=\left[\frac Y2-\frac{z_{0.975}}{\sqrt2},\;
\frac Y2+\frac{z_{0.975}}{\sqrt2}\right]
$$

> を作る。一方、頻度論的評価では真値 $\theta\in\mathbb R$ を固定し、$Y=\theta+E$ とする。このとき $C(Y)$ は全ての $y$ について事後確率 $0.95$ の信用区間だが、被覆率は

$$
\operatorname{Cov}_\theta(C)
=\Phi(\theta+\sqrt2\,z_{0.975})
-\Phi(\theta-\sqrt2\,z_{0.975})
$$

> であり、$\theta$ に依存する。
<!-- formal-statement-end -->

### 証明の見取り図

事後分布は前講の平方完成で $N(Y/2,1/2)$ です。被覆率を計算するときだけ真値を固定し、区間条件を誤差 $E$ の範囲に書き換えます。

<!-- proof-start -->
### 証明

[INV15 の事後平均・分散公式](../INV15/index.md#thm-inv15-gaussian-posterior)へ $A=1$、$\Gamma_0=\Gamma_\varepsilon=1$、$\mu_0=0$ を代入すると、事後精度は $H=1+1=2$、右辺は $b_Y=Y$ です。よって事後平均 $Y/2$、分散 $1/2$ となり、[線形観測量の信用区間](#prop-inv16-linear-functional)によって事後確率 $0.95$ を得ます。

被覆率では $\theta$ を固定します。区間に真値が入るための条件は

$$
\begin{aligned}
\theta\in C(Y)
&\iff\left|\theta-\frac Y2\right|\le\frac{z_{0.975}}{\sqrt2}\\
&\iff |2\theta-Y|\le\sqrt2\,z_{0.975}.
\end{aligned}
$$

$Y=\theta+E$ を代入すると $2\theta-Y=\theta-E$ です。よって

$$
\theta-\sqrt2\,z_{0.975}
\le E\le
\theta+\sqrt2\,z_{0.975}.
$$

$E$ は標準正規分布だから、その確率は主張の二つの $\Phi$ の差に等しくなります。
<!-- proof-end -->

例えば $z_{0.975}\simeq1.960$ なので $\sqrt2\,z_{0.975}\simeq2.772$ です。$\theta=0$ なら被覆率は $2\Phi(2.772)-1\simeq0.9944$、$\theta=4$ なら $\Phi(6.772)-\Phi(1.228)\simeq0.1097$ です。同じ区間規則なのに、真値が事前平均から遠いと、中心を $Y/2$ へ縮めることが被覆率を下げます。

これは Bayes の信用区間が「間違い」という意味ではありません。**事後確率は採用した事前分布と観測モデルの下での条件付き確率**です。別の頻度論的保証を求めるなら、その保証を別途証明する必要があります。

## 3. 事前情報と観測モデルを疑う

信用領域の幅が狭くても、前提とした事前分布が極端に強かったり、観測装置に見落とした偏りがあったりすれば、解釈は変わります。まず、前講の事後公式に入れる数値を一つずつ動かしてみます。

<a id="prop-inv16-prior-sensitivity"></a>

<!-- formal-statement-start -->
> **命題（一次元 Gaussian 更新の事前感度）**  
> $\tau^2>0$、$\sigma^2>0$、$m_0\in\mathbb R$ とする。独立な $X\sim N(m_0,\tau^2)$ と $E\sim N(0,\sigma^2)$ の下で $Y=X+E$ とすると、固定観測 $Y=y$ での事後分布は

$$
X\mid Y=y\sim N(m_y,v_y),
$$

> ただし

$$
m_y=\frac{\sigma^2m_0+\tau^2y}{\tau^2+\sigma^2},
\qquad
v_y=\frac{\tau^2\sigma^2}{\tau^2+\sigma^2}.
$$

> $\sigma^2$ を固定すると、$\tau^2\downarrow0$ で $m_y\to m_0$、$v_y\to0$、$\tau^2\uparrow\infty$ で $m_y\to y$、$v_y\to\sigma^2$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

事前精度と観測精度を加え、その逆数を事後分散とします。平均は二つの精度の加重平均です。極限は分子分母の最高次項で判定します。

<!-- proof-start -->
### 証明

[INV15 の Gaussian 事後公式](../INV15/index.md#thm-inv15-gaussian-posterior)で $n=m=A=1$、$\Gamma_0=\tau^2$、$\Gamma_\varepsilon=\sigma^2$ とすると

$$
H=\frac1{\tau^2}+\frac1{\sigma^2}
=\frac{\tau^2+\sigma^2}{\tau^2\sigma^2},
\qquad
b_y=\frac{m_0}{\tau^2}+\frac y{\sigma^2}.
$$

したがって

$$
\begin{aligned}
v_y&=H^{-1}=\frac{\tau^2\sigma^2}{\tau^2+\sigma^2},\\
m_y&=v_yb_y
=\frac{\tau^2\sigma^2}{\tau^2+\sigma^2}
\left(\frac{m_0}{\tau^2}+\frac y{\sigma^2}\right)
=\frac{\sigma^2m_0+\tau^2y}{\tau^2+\sigma^2}.
\end{aligned}
$$

$\tau^2\downarrow0$ では分母 $\tau^2+\sigma^2\to\sigma^2>0$、平均の分子は $\sigma^2m_0$、分散の分子は0へ向かいます。$\tau^2\uparrow\infty$ では分子分母を $\tau^2$ で割れば

$$
m_y=\frac{(\sigma^2/\tau^2)m_0+y}{1+\sigma^2/\tau^2}\to y,
\qquad
v_y=\frac{\sigma^2}{1+\sigma^2/\tau^2}\to\sigma^2.
$$
<!-- proof-end -->

**数値比較**：$m_0=0$、$\sigma^2=1$、$y=2$ を固定すると、事前分散 $\tau^2=1/4,1,4$ に対する $(m_y,v_y)$ は、それぞれ $(0.4,0.2)$、$(1,0.5)$、$(1.6,0.8)$ となります。同じ観測でも、事前分散を変えると中心も幅も変化します。「事後分散が小さい」ことと「事前仮定に頑健である」ことは同義ではありません。

さらに測定器の誤差 $E$ が零平均でも、採用した forward model の $F(x)$ 自体に系統的なずれがあれば、通常の観測ノイズとは異なる問題が起こります。この差を明示してから議論します。

<a id="def-inv16-model-discrepancy"></a>

<!-- formal-statement-start -->
> **定義（モデル不一致）**  
> パラメータ $\theta\in\Theta$、採用した forward map $F:\Theta\to\mathbb R^m$ に対し、実際の観測が

$$
Y=F(\theta)+b(\theta)+E
$$

> と表されるとき、$b:\Theta\to\mathbb R^m$ を採用モデルからの**モデル不一致（モデル誤差）**と呼ぶ。$E$ は別に定める測定誤差である。ここでは $b$ を決定論的関数として定義した。確率的なモデル不一致を扱う場合は別に確率変数 $B$ を導入し、その分布と測定誤差 $E$ との依存関係を指定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv16-model-discrepancy -->

**定義の確認**：真の観測器が $Y=\theta+2+E$、$E\sim N(0,1)$ なのに $F(\theta)=\theta$ を採用すれば、$b(\theta)=2$ が確定的なモデル不一致です。$E$ の期待値は0でも、$Y-F(\theta)$ の期待値は2です。これを「測定ノイズの分散が1だから問題なし」とは言えません。
<!-- definition-example-end -->

真値 $\theta=0$ のとき上のモデルで得た $Y$ に、誤って[前節の事後信用区間](#prop-inv16-coverage-mismatch)を当てはめると、

$$
\begin{aligned}
P_{\theta=0,b=2}\{0\in C(Y)\}
&=P(|Y|\le\sqrt2\,z_{0.975})\\
&=\Phi(\sqrt2\,z_{0.975}-2)
-\Phi(-\sqrt2\,z_{0.975}-2)\\
&\simeq0.780.
\end{aligned}
$$

事前分布の下の $95\%$ と、ずれた観測機構の下の被覆率が違うことを、具体式で確認できます。

一方、$B\sim N(0,\omega^2)$ が $X,E$ と独立な**確率的**モデル不一致であれば、$E+B\sim N(0,\sigma^2+\omega^2)$ と扱えます。これは零平均・独立性を仮定した場合に限る処理です。未知の一定値 $b$ を無条件で Gaussian ノイズに置き換えることはできません。また $Y=\theta+b+E$ で $\theta,b$ がともに未知の定数なら、$(\theta,b)$ と $(\theta+t,b-t)$ は任意の $t\in\mathbb R$ で同じ観測分布を作ります。**パラメータを別々に識別するには追加情報が必要**です。

## 4. 関数を未知量とするとき、密度を何に対して書くか

画像・初期値・係数関数を復元する場合、未知量は有限個の数ではなく関数空間の元になります。前講の密度 $p_0(x)\,dx$ の $dx$ は $\mathbb R^n$ の Lebesgue 測度に基づいていました。Lebesgue 測度は平行移動しても値が変わらず、各点には測度が有限な近傍があります。ところが無限次元 Hilbert 空間では、この二つの性質を備えた、恒等的に0ではない Borel 測度を作れません。したがって「無限次元の $dx$ で正規化する」とは書けません。

ここで用いる**可分**とは、可算個の点からなる稠密部分集合が存在することです。例えば $\ell^2$ には、有限個の非零な有理数成分しか持たない列全体という可算稠密集合があります。

代わりに、関数空間 $H$ の Borel 集合族 $\mathcal B(H)$ 上に確率測度 $\mu_0$ を与えます。Borel 集合族とはノルム位相の開集合を含む最小の $\sigma$-代数です。

$\mu_0(H)=1$ であり、特定の Lebesgue 密度を持つ必要はありません。前節までの $\mu_0$ は有限次元 Gaussian 分布の**事前平均ベクトル**でした。ここからは $H$ 上の事前分布そのものを表す**確率測度**として同じ記号 $\mu_0$ を使います。

観測は有限次元 $\mathbb R^m$ にあるので、そこでの条件付き密度を使い、未知量側だけ $\mu_0$ に関する密度を定義します。

先行する[Radon–Nikodym 微分の定義](../../MT/MT3/index.md#def-mt3-rn-density)によれば、$\nu(B)=\int_B f\,d\mu$ を満たす非負可測関数 $f$ を $d\nu/d\mu$ と書きます。また、$\mu(B)=0$ となるすべての可測集合 $B$ で $\nu(B)=0$ となる場合に、$\nu$ は $\mu$ に関して**絶対連続**であるといいます。ここでは $\nu=\mu^y$、$\mu=\mu_0$ として用います。

以下では $\Phi(u;y)$ という記号を新たに使います。これは前節までの標準正規分布の累積分布関数 $\Phi(t)$ と**同じ文字ですが、意味が異なります**。

$u\in H$ は未知量の候補、$y\in\mathbb R^m$ は固定した観測値です。両者のずれを観測誤差の共分散行列 $\Sigma$ によって測る非負の量を $\Phi(u;y)$ と書きます。$\Sigma^{-1}$ が使えるのは $\Sigma$ を正定値と仮定するからです。

<a id="def-inv16-reference-posterior"></a>

<!-- formal-statement-start -->
> **定義（事前測度を基準とする事後分布）**  
> 実可分 Hilbert 空間 $H$ の Borel 集合族上に事前確率測度 $\mu_0$ を置く。$m\ge1$、可測な forward map $F:H\to\mathbb R^m$、対称正定値 $\Sigma\in\mathbb R^{m\times m}$ を固定する。未知量 $U\sim\mu_0$ と独立な $E\sim N(0,\Sigma)$ に対して $Y=F(U)+E$ とする。固定した $y\in\mathbb R^m$ について

$$
\Phi(u;y)=\tfrac12(y-F(u))^T\Sigma^{-1}(y-F(u)),
\qquad
Z(y)=\int_H e^{-\Phi(u;y)}\,\mu_0(du)
$$

> と置く。集合 $B\in\mathcal B(H)$ の事後確率を

$$
\mu^y(B)=\frac1{Z(y)}\int_B e^{-\Phi(u;y)}\,\mu_0(du)
$$

> で与える。ここで $Z(y)$ は正規化定数である。$\mu^y$ は $\mu_0$ に関して絶対連続であり、事前測度を基準とする密度は $d\mu^y/d\mu_0=Z(y)^{-1}e^{-\Phi(\,\cdot\,;y)}$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv16-reference-posterior -->

**定義の確認**：$H=\ell^2$ とし、$\delta_0$ を零列 $0\in H$ に確率1を置く測度として $\mu_0=\delta_0$ とします。$\ell^2$ は有限個の非零な有理数成分を持つ列が可算稠密集合になるので可分です。$m=1$、$F(u)=u_1$ は連続ゆえ可測、$\Sigma=(1)$ は対称正定値です。$U=0$ を確率1で満たす確率変数と、独立な $E\sim N(0,1)$ を取れば、全ての定義の仮定を満たします。

任意の $y\in\mathbb R$ について $\Phi(0;y)=y^2/2$ なので、

$$
Z(y)=\int_H e^{-\Phi(u;y)}\,\delta_0(du)=e^{-y^2/2}>0.
$$

任意の Borel 集合 $B\subset H$ に対し、

$$
\mu^y(B)=\frac{e^{-y^2/2}\delta_0(B)}{e^{-y^2/2}}
=\delta_0(B).
$$

従って $\mu^y(H)=1$、$\mu^y(\{0\})=1$ です。観測にかかわらず未知量が0で確定している例ですが、無限次元 Lebesgue 密度なしで定義の正規化と事後確率を直接確認できます。

<!-- definition-example-end -->

事後測度の密度 $d\mu^y/d\mu_0$ は、最初に与えた $\mu_0$ を基準にしています。無限次元 Lebesgue 測度を使う式ではありません。指数の $\Phi(u;y)$ は $u$ を動かしたときのずれを表し、$y$ は観測後に固定する変数です。

定義式が本当に有限かつ正で、条件付き確率として機能することを検証しましょう。Gaussian 観測ノイズの正定値性のおかげで、この設定では $F$ の有界性すら必要ありません。ただし $F(u)$ は各 $u\in H$ で有限ベクトルとします。

<a id="thm-inv16-function-space-bayes"></a>

<!-- formal-statement-start -->
> **定理（関数空間での Bayes 更新の正当化）**  
> [事前測度を基準とする事後分布](#def-inv16-reference-posterior)の全仮定の下で、全ての $y\in\mathbb R^m$ について $0<Z(y)\le1$ であり、$\mu^y$ は確率測度である。さらに $y\mapsto\mu^y(B)$ は各 Borel 集合 $B$ について可測であり、$\mu^y$ は $Y=y$ の下での $U$ の条件付き分布の一つの版を与える。
<!-- formal-statement-end -->

### 証明の見取り図

Gaussian 密度の指数は0以下なので、その指数関数は0と1の間にあります。これで正規化できます。次に $U$ と $Y$ の同時分布を「事前測度 × 観測の条件付き密度」で表し、$u$ と $y$ の積分順を入れ替えて条件付き分布の恒等式を得ます。

<!-- proof-start -->
### 証明

$\Sigma$ の正定値性から $\Sigma^{-1}$ は正定値であり、任意の $u,y$ について $\Phi(u;y)\ge0$ です。$F(u)\in\mathbb R^m$ なので $\Phi(u;y)$ は有限であり、

$$
0<e^{-\Phi(u;y)}\le1.
$$

$\mu_0$ は全質量1の確率測度ですから、上界を積分して $Z(y)\le1$ を得ます。また正の可測関数の積分は、確率1の集合上で全点正なら正です。実際、$H=\bigcup_{k\ge1}\{u:e^{-\Phi(u;y)}\ge1/k\}$ なので、ある $k$ でこの集合の $\mu_0$-測度は正となり、$Z(y)>0$ です。

$\mu^y$ は非負で、可算加法性は積分の可算加法性に従い、

$$
\mu^y(H)=\frac1{Z(y)}\int_H e^{-\Phi(u;y)}\,\mu_0(du)=1
$$

です。$F$ の可測性と $(z,y)\mapsto\tfrac12(y-z)^T\Sigma^{-1}(y-z)$ の連続性から、$(u,y)\mapsto\Phi(u;y)$ は積空間で可測です。[Tonelli の定理](../../F0/F0-00D2C/index.md#thm-tonelli)を非負関数 $1_B(u)e^{-\Phi(u;y)}$ に適用すると、$y\mapsto\int_Be^{-\Phi(u;y)}\,\mu_0(du)$ が可測になります。ここで $\mu_0$ は確率測度ゆえ $\sigma$-有限で、$\mathbb R^m$ の Lebesgue 測度も $\sigma$-有限です。分母 $Z(y)$ は常に正なので比も可測です。

観測条件付き密度を

$$
q(y\mid u)
=\frac{\exp[-\Phi(u;y)]}{(2\pi)^{m/2}\sqrt{\det\Sigma}},
\qquad
p_Y(y)=\int_Hq(y\mid u)\,\mu_0(du)
$$

と置きます。[Gaussian 密度の正規化](../INV15/index.md#def-inv15-gaussian-density)から、各 $u$ に対し $\int_{\mathbb R^m}q(y\mid u)\,dy=1$ です。$\Sigma$ は定数行列なので $p_Y(y)=(2\pi)^{-m/2}(\det\Sigma)^{-1/2}Z(y)>0$ です。

任意の Borel 集合 $B\subset H$、$D\subset\mathbb R^m$ を取ります。被積分関数 $1_B(u)1_D(y)q(y\mid u)$ は非負かつ可測で、上で確認した二つの測度の $\sigma$-有限性も満たすため、[Tonelli の定理](../../F0/F0-00D2C/index.md#thm-tonelli)で積分順を交換できます。独立な $E$ の条件付き密度を最初に代入すると

$$
\begin{aligned}
P(U\in B,Y\in D)
&=\int_B\left[\int_Dq(y\mid u)\,dy\right]\mu_0(du)\\
&=\int_D\left[\int_Bq(y\mid u)\,\mu_0(du)\right]dy\\
&=\int_D\mu^y(B)p_Y(y)\,dy.
\end{aligned}
$$

この恒等式と $y\mapsto\mu^y(B)$ の可測性が、条件付き分布を与えることを意味します。条件付き分布の版は通常 $p_Y$ に関してほとんど至る所でのみ一意ですが、表示した式は全 $y$ で定義できます。
<!-- proof-end -->

### 例：無限次元でも離散事前分布なら更新できる

$H=\ell^2$ を二乗和が有限な実数列の空間とし、$e_j$ を第 $j$ 成分だけ1の単位列とします。事前分布を

$$
\mu_0=\frac12\delta_0+\sum_{j=1}^{\infty}2^{-(j+1)}\delta_{e_j}
$$

とします。$\delta_v$ は点 $v$ に確率1を置く確率測度です。重みは正で、$\sum_{j\ge1}2^{-(j+1)}=1/2$ なので全質量は1です。支持点は全て $\ell^2$ に属します。$F(u)=u_1$、$E\sim N(0,1)$ を独立とすると、$F(e_1)=1$、$F(0)=F(e_j)=0$（$j\ge2$）です。よって定義の $Z(y)$ は

$$
\begin{aligned}
Z(y)&=\frac14e^{-(y-1)^2/2}
+\left(\frac12+\sum_{j=2}^{\infty}2^{-(j+1)}\right)e^{-y^2/2}\\
&=\frac14e^{-(y-1)^2/2}+\frac34e^{-y^2/2}.
\end{aligned}
$$

従って

$$
\mu^y(\{e_1\})
=\frac{e^{y-1/2}}{3+e^{y-1/2}}.
$$

例えば $y=1/2$ なら事後確率は $1/4$ です。これは**無限次元空間上の確率測度**の更新であり、有限次元の Lebesgue 密度を形式的に無限個の変数へ拡張したものではありません。

### 例：真に無限個の Gaussian 座標をもつ事前分布

独立な $\xi_j\sim N(0,1)$ を用い、列

$$
U=(\xi_1,\xi_2/2,\xi_3/3,\ldots)
$$

を考えます。以下、期待値は $\mathbb E[\cdot]$ と表し、観測誤差の確率変数 $E$ と区別します。

部分和を $S_N=\sum_{j=1}^N\xi_j^2/j^2$ とすると、各項は非負なので $S_N$ は単調増加します。独立な標準正規変数について $\mathbb E[\xi_j^2]=1$ ですから、

$$
\mathbb E[S_N]=\sum_{j=1}^N\frac1{j^2}
\le\sum_{j=1}^{\infty}\frac1{j^2}<\infty.
$$

[単調収束定理](../../F0/F0-00D2B/index.md#ref-limit-integral-exchange)の仮定（非負性と単調増加）を確かめたので、

$$
\mathbb E\left[\lim_{N\to\infty}S_N\right]
=\lim_{N\to\infty}\mathbb E[S_N]
=\sum_{j=1}^{\infty}\frac1{j^2}<\infty
$$

となります。非負確率変数が正の確率で無限大なら期待値も無限大なので、$\sum_{j\ge1}\xi_j^2/j^2<\infty$ が確率1で成立し、$U\in\ell^2$ です。

各有限切断 $(\xi_1,\ldots,\xi_N/N,0,\ldots)$ は $\ell^2$ 値可測写像で、確率1の集合上で $U$ にノルム収束します。零測度の例外集合では $U=0$ と定義すれば、$U$ は $\ell^2$ 値可測確率変数になります。この $U$ の法則を $\mu_0$ とすれば、有限次元の Lebesgue 密度なしに関数空間上の事前分布を得られます。

$F(u)=u_1$、独立な $E\sim N(0,1)$ とすると、観測 $Y=\xi_1+E$ は第1座標だけに依存します。[INV15 の Gaussian 更新](../INV15/index.md#thm-inv15-gaussian-posterior)により、$U_1\mid Y=y\sim N(y/2,1/2)$ です。一方、$j\ge2$ の各座標は $(\xi_1,E)$ と独立なので、観測後も $U_j\sim N(0,1/j^2)$ のままです。さらに後方座標の同時分布も変わりません。これは前講の[独立な未観測成分の命題](../INV15/index.md#prop-inv15-kernel-independent)と同じ仕組みですが、無限次元では確率測度として述べます。

**注意**：ここでは与えた事前測度と有限次元 Gaussian 尤度から事後分布を定義しました。一般 Gaussian 測度の構成理論、Hellinger 距離による観測安定性、無限次元での MAP の一般論、事後集中率は、この講の定理から自動的には出ません。

## 5. 実務的に「不確実性」を読む順序

結果を一つの数字に潰さないため、少なくとも「何の量の事後確率か」「どの prior と likelihood に依存するか」「繰り返し観測の保証が必要か」「観測モデルにずれはないか」を分けて考えます。とくにデータと事前情報が競合しているとき、狭い信用区間だけを見て高精度だと結論しないことが重要です。

## 演習

各題では、確率を計算する**対象**と、モデルの**仮定**を明示してください。詳細解答は定義式への代入を省略せず追います。

### Level A：定義と直接計算

<a id="ex-inv16-a01"></a>

### INV16-A01 一次元の95%信用区間

- Level: A

$X\sim N(0,1)$、$E\sim N(0,1)$ が独立、$Y=X+E$、観測 $y=2$ とする。事後分布と $z_{0.975}=1.960$ を用いた $95\%$ 信用区間を求め、区間の事後確率を確認せよ。

<!-- solution-start -->
#### 詳細解答

[INV15 の事後公式](../INV15/index.md#thm-inv15-gaussian-posterior)に $A=1$、$\mu_0=0$、$\Gamma_0=\Gamma_\varepsilon=1$ を代入すると $H=2$、$b_2=2$ です。従って平均 $H^{-1}b_2=1$、分散 $H^{-1}=1/2$ です。

$$
C(2)=[1-1.960/\sqrt2,\;1+1.960/\sqrt2]
\simeq[-0.386,\;2.386].
$$

$W=\sqrt2(X-1)\mid Y=2\sim N(0,1)$ だから

$$
P(X\in C(2)\mid Y=2)
=P(-1.960\le W\le1.960)
\simeq0.975-0.025=0.95.
$$
<!-- solution-end -->

<a id="ex-inv16-a02"></a>

### INV16-A02 相関する差の不確実性

- Level: A

$X\mid y\sim N((1,2)^T,\Gamma)$、$\Gamma=\begin{pmatrix}2&1\\1&3\end{pmatrix}$ とする。$\Gamma$ が正定値であることを確認し、$X_1-X_2$ の平均、分散、$95\%$ 信用区間を求めよ。

<!-- solution-start -->
#### 詳細解答

$\Gamma$ は対称です。非零の $v=(s,t)^T$ に対し、共分散行列の二次形式を基底成分で展開すると

$$
v^T\Gamma v=2s^2+2st+3t^2
=2\left(s+\frac t2\right)^2+\frac52t^2>0.
$$

これで[正定値性の定義](../INV15/index.md#def-inv15-gaussian-density)を直接満たすと確認できました。行列式も $\det\Gamma=2\cdot3-1^2=5>0$ です。$a=(1,-1)^T\ne0$ に対し、[線形観測量の命題](#prop-inv16-linear-functional)の条件が成立します。

$$
a^T(1,2)^T=-1,\quad
\Gamma a=(1,-2)^T,\quad
a^T\Gamma a=1+2=3.
$$

したがって $X_1-X_2\mid y\sim N(-1,3)$、信用区間は

$$
[-1-1.960\sqrt3,\;-1+1.960\sqrt3]
\simeq[-4.395,\;2.395].
$$
<!-- solution-end -->

<a id="ex-inv16-a03"></a>

### INV16-A03 被覆率と事後確率

- Level: A

$Y=\theta+E$、$E\sim N(0,1)$、$C(Y)=[Y-1.960,Y+1.960]$ とする。固定した $\theta$ における被覆率を計算せよ。また「$\theta$ が $95\%$ の確率でこの区間に入る」という言い方の問題点を説明せよ。

<!-- solution-start -->
#### 詳細解答

[被覆率の定義](#def-inv16-coverage)で $\theta$ を固定すると、$\theta\in C(Y)$ は $|Y-\theta|\le1.960$ と同値です。$Y-\theta=E$ により

$$
P_\theta(\theta\in C(Y))
=P(-1.960\le E\le1.960)
=\Phi(1.960)-\Phi(-1.960)\simeq0.95.
$$

頻度論的定式化では $\theta$ は定数なので、確率が掛かっているのは再標本化される $Y$ に関する事象です。特定の観測値を得た後の $\theta$ 自体へ $95\%$ の確率を割り当てる主張ではありません。
<!-- solution-end -->

<a id="ex-inv16-a04"></a>

### INV16-A04 事前分散による感度

- Level: A

独立な $X\sim N(0,\tau^2)$、$E\sim N(0,1)$、$Y=X+E$、観測 $y=2$ とする。$\tau^2=1/4$ と $\tau^2=4$ について事後平均と分散を求め、どちらがデータ $y$ に近いか判定せよ。

<!-- solution-start -->
#### 詳細解答

[事前感度の命題](#prop-inv16-prior-sensitivity)で $\sigma^2=1$、$m_0=0$ なので

$$
m_2=\frac{2\tau^2}{1+\tau^2},\qquad
v_2=\frac{\tau^2}{1+\tau^2}.
$$

$\tau^2=1/4$ では $m_2=(1/2)/(5/4)=2/5$、$v_2=(1/4)/(5/4)=1/5$ です。$\tau^2=4$ では $m_2=8/5$、$v_2=4/5$ です。後者は事前分布が広く、平均が $2$ により近い一方で、事後分散も大きくなります。
<!-- solution-end -->

<a id="ex-inv16-a05"></a>

### INV16-A05 原子を持つ事前分布の更新

- Level: A

$H=\ell^2$ 上の $u=0,e_1$ に各確率 $1/2$ の事前分布を置く。$F(u)=u_1$、独立な測定誤差 $E\sim N(0,1)$、観測 $y=0$ とする。$\mu^0(\{e_1\})$ と $\mu^0(\{0\})$ を求め、和が1になることを確かめよ。

<!-- solution-start -->
#### 詳細解答

[関数空間の事後測度の定義](#def-inv16-reference-posterior)に従うと、$F(e_1)=1$、$F(0)=0$ なので

$$
Z(0)=\tfrac12e^{-1/2}+\tfrac12e^0
=\tfrac12(1+e^{-1/2}).
$$

各点での事後確率は

$$
\mu^0(\{e_1\})=\frac{e^{-1/2}}{1+e^{-1/2}},\quad
\mu^0(\{0\})=\frac1{1+e^{-1/2}}.
$$

分子を足すと分母に等しいので和は1です。事前分布は点に質量を持つため、Lebesgue 密度でなく原子の重みを更新しています。
<!-- solution-end -->

### Level B：導出と仮定の境界

<a id="ex-inv16-b01"></a>

### INV16-B01 一般の縮小区間の被覆率

- Level: B

$X\sim N(0,\tau^2)$、$E\sim N(0,1)$ が独立な解析モデル $Y=X+E$ から、$1-\alpha$ 信用区間を作る。$k=\tau^2/(1+\tau^2)$、$v=\tau^2/(1+\tau^2)$ として、真値 $\theta$ を固定したモデル $Y=\theta+E$ の下で被覆率を $\Phi$ を使って表せ。$\tau^2=4$、$\theta=0$ の場合の式も書け。

<!-- solution-start -->
#### 詳細解答

[事前感度公式](#prop-inv16-prior-sensitivity)の $\sigma^2=1$、$m_0=0$ を用いれば事後平均は $kY$、分散は $v$ なので、信用区間は $[kY-z_{1-\alpha/2}\sqrt v,\;kY+z_{1-\alpha/2}\sqrt v]$ です。$k>0$ だから固定した $\theta$ の包含条件を変形できます。

$$
\begin{aligned}
\theta\in C(Y)
&\iff |\,\theta-kY\,|\le z_{1-\alpha/2}\sqrt v\\
&\iff |(1-k)\theta-kE|\le z_{1-\alpha/2}\sqrt v\\
&\iff \frac{(1-k)\theta-z_{1-\alpha/2}\sqrt v}{k}
\le E\le
\frac{(1-k)\theta+z_{1-\alpha/2}\sqrt v}{k}.
\end{aligned}
$$

$E\sim N(0,1)$ より被覆率は

$$
\Phi\left(\frac{(1-k)\theta+z_{1-\alpha/2}\sqrt v}{k}\right)
-\Phi\left(\frac{(1-k)\theta-z_{1-\alpha/2}\sqrt v}{k}\right).
$$

$\tau^2=4$ では $k=v=4/5$、$\theta=0$ では左右の端点が $\pm z_{1-\alpha/2}\sqrt{4/5}/(4/5)=\pm z_{1-\alpha/2}\sqrt{5/4}$ なので、被覆率は $2\Phi(z_{1-\alpha/2}\sqrt{5/4})-1$ です。これは一般に $1-\alpha$ と一致しません。
<!-- solution-end -->

<a id="ex-inv16-b02"></a>

### INV16-B02 モデル不一致と識別不能性

- Level: B

実際のモデルが $Y=\theta+b+E$、$E\sim N(0,\sigma^2)$、$\sigma^2>0$ で、$\theta,b$ がともに未知定数であるとする。

1. 一観測の分布から二つを別々に識別できないことを示せ。
2. $b$ を確率変数 $B\sim N(0,\omega^2)$（$\omega^2>0$）として再モデル化し、$X\sim N(0,\tau^2)$（$\tau^2>0$）と $B,E$ が互いに独立なとき、$Y=X+B+E$、$Y=y$ の事後平均・分散を導け。

<!-- solution-start -->
#### 詳細解答

(1) 任意の $t\in\mathbb R$ で $(\theta',b')=(\theta+t,b-t)$ と置くと $\theta'+b'=\theta+b$ です。$Y$ の分布はどちらのパラメータでも $N(\theta+b,\sigma^2)$ であり、異なる二組が同じ観測分布を生みます。従って二つを別々には識別できません。

(2) 新しいモデルでは $B\sim N(0,\omega^2)$ と $E\sim N(0,\sigma^2)$ が独立なので、和 $B+E\sim N(0,\omega^2+\sigma^2)$ です。また $B,E$ は事前確率変数 $X$ とも独立です。[一次元の事後公式](#prop-inv16-prior-sensitivity)で観測分散を $\omega^2+\sigma^2$ と置き換えれば

$$
m_y=\frac{\tau^2y}{\tau^2+\omega^2+\sigma^2},
\qquad
v_y=\frac{\tau^2(\omega^2+\sigma^2)}{\tau^2+\omega^2+\sigma^2}.
$$

この結論は $b$ を未知の**定数**と置いた(1)には適用できません。独立な零平均確率変数という追加仮定によって分布を積分消去できたからです。
<!-- solution-end -->

<a id="ex-inv16-b03"></a>

### INV16-B03 三原子事前分布の関数空間 Bayes

- Level: B

$H=\ell^2$ で $\mu_0=\tfrac12\delta_0+\tfrac14\delta_{e_1}+\tfrac14\delta_{e_2}$、$F(u)=u_1$、独立な $E\sim N(0,1)$、観測 $Y=y$ とする。$Z(y)$、$\mu^y(\{e_1\})$、$\mu^y(\{e_2\})$ を求めよ。$y=1/2$ で三つの原子の事後確率の総和を確認せよ。

<!-- solution-start -->
#### 詳細解答

$F(e_1)=1$、$F(e_2)=F(0)=0$ です。[事後測度の定義](#def-inv16-reference-posterior)において $e^{-\Phi(u;y)}=e^{-(y-F(u))^2/2}$ を各点で評価すると

$$
\begin{aligned}
Z(y)
&=\tfrac12e^{-y^2/2}
+\tfrac14e^{-(y-1)^2/2}
+\tfrac14e^{-y^2/2}\\
&=\tfrac14 e^{-y^2/2}(3+e^{y-1/2}),
\end{aligned}
$$

ここで $-(y-1)^2/2+y^2/2=y-1/2$ を使いました。よって

$$
\mu^y(\{e_1\})=\frac{e^{y-1/2}}{3+e^{y-1/2}},
\qquad
\mu^y(\{e_2\})=\frac1{3+e^{y-1/2}},
\qquad
\mu^y(\{0\})=\frac2{3+e^{y-1/2}}.
$$

$y=1/2$ なら指数因子は1で、$e_1,e_2,0$ の確率は順に $1/4,1/4,1/2$、和は1です。$e_2$ は直接観測されませんが、$e_1$ との離散的な事前選択の競合でその確率が変化する点に注意します。
<!-- solution-end -->

<a id="ex-inv16-b04"></a>

### INV16-B04 無限個の Gaussian 座標は存在するか

- Level: B

独立な $\xi_j\sim N(0,1)$ によって $U_j=\xi_j/j$ を定める。(1) $U\in\ell^2$ が確率1で成立する理由を、部分和の期待値から示せ。(2) $Y=U_1+E$、$E\sim N(0,1)$ が全 $\xi_j$ と独立なら、観測 $Y=y$ の下で $U_1$ と $U_2$ の周辺事後分布を求めよ。

<!-- solution-start -->
#### 詳細解答

(1) $S_N=\sum_{j=1}^NU_j^2$ は非負で単調増加します。$\mathbb E[\xi_j^2]=1$ を用いると

$$
\mathbb E[S_N]=\sum_{j=1}^N\frac{\mathbb E[\xi_j^2]}{j^2}
=\sum_{j=1}^N\frac1{j^2}
\le\sum_{j=1}^\infty\frac1{j^2}<\infty.
$$

[単調収束定理](../../F0/F0-00D2B/index.md#ref-limit-integral-exchange)により $\mathbb E[\sum_{j\ge1}U_j^2]=\sum_{j\ge1}1/j^2<\infty$ です。もし和が無限大になる事象の確率が正なら、その期待値も無限大になるため矛盾です。従って $U\in\ell^2$ が確率1で成立します。

(2) $U_1=\xi_1\sim N(0,1)$、$E\sim N(0,1)$ は独立なので、[線形 Gaussian 逆問題の事後平均と事後共分散](../INV15/index.md#thm-inv15-gaussian-posterior)により $U_1\mid Y=y\sim N(y/2,1/2)$ です。一方 $U_2=\xi_2/2\sim N(0,1/4)$ で、$\xi_2$ は $(\xi_1,E)$ と独立です。$Y$ は $(\xi_1,E)$ だけの関数なので $U_2$ は $Y$ と独立です。従って $U_2\mid Y=y\sim N(0,1/4)$ のままです。
<!-- solution-end -->

### Level C：統合問題

<a id="ex-inv16-c01"></a>

### INV16-C01 不確実性の三つの読み方を分離する

- Level: C

解析者は独立な $X\sim N(0,1)$、$E\sim N(0,1)$ とする $Y=X+E$ を採用している。以下をそれぞれ求めよ。

1. 観測 $y=2$ に対する事後平均、分散、$95\%$ 信用区間。
2. 真値 $\theta=0$ を固定し、実際には $Y=\theta+2+E$ で観測が繰り返される場合の、(1)と同じ規則 $C(Y)$ の頻度論的被覆率。$\Phi$ で表せ。
3. モデル不一致を独立な確率変数 $B\sim N(0,3)$ に変更したときの、$Y=X+B+E$ の事後平均・分散。
4. 未知量を可分 Hilbert 空間 $H$ の元 $U$ とし、$F:H\to\mathbb R^m$ が可測、測定誤差が独立な正定値共分散を持つ Gaussian である場合、事後確率を定める際の基準測度と、正規化が成立する理由。

<!-- solution-start -->
#### 詳細解答

(1) [INV15 の更新公式](../INV15/index.md#thm-inv15-gaussian-posterior)で事後精度 $H=1+1=2$、$b_2=2$ です。平均は1、分散は $1/2$ で、

$$
C(2)=[1-z_{0.975}/\sqrt2,\;1+z_{0.975}/\sqrt2]
\simeq[-0.386,2.386].
$$

この区間の事後確率は $\Phi(z_{0.975})-\Phi(-z_{0.975})=0.95$ です。

(2) 頻度論では真値 $\theta=0$ が固定され、真のデータ分布が $Y\sim N(2,1)$ となります。同じ規則 $C(Y)=[Y/2-z_{0.975}/\sqrt2,\;Y/2+z_{0.975}/\sqrt2]$ に $0$ が含まれる条件は $|Y|\le\sqrt2z_{0.975}$ です。$Y=2+E$ を代入して

$$
\begin{aligned}
P_{\theta=0,b=2}\{0\in C(Y)\}
&=P(-\sqrt2z_{0.975}-2\le E\le\sqrt2z_{0.975}-2)\\
&=\Phi(\sqrt2z_{0.975}-2)
-\Phi(-\sqrt2z_{0.975}-2)\\
&\simeq0.780.
\end{aligned}
$$

信用区間の事後確率 $0.95$ はこの別の観測モデルに対する被覆率の保証ではありません。

(3) $B,E$ は独立な零平均 Gaussian なので $B+E\sim N(0,4)$ です。また $X$ と独立です。[一次元の事前感度公式](#prop-inv16-prior-sensitivity)で $\tau^2=1$、$\sigma^2=4$、$m_0=0$ を代入すると、事後平均は $m_y=y/5$、分散は $v_y=4/5$ です。誤差の分散を増やしたモデルでは観測への重みが小さく、事後不確実性は $1/2$ から $4/5$ に増えます。

(4) $\mathcal B(H)$ 上に事前確率測度 $\mu_0$ を置き、それを基準にします。観測共分散 $\Sigma\succ0$、固定した $y$ に対して

$$
\Phi(u;y)=\tfrac12(y-F(u))^T\Sigma^{-1}(y-F(u)),
\quad
Z(y)=\int_H e^{-\Phi(u;y)}\mu_0(du)
$$

と定め、

$$
\mu^y(B)=Z(y)^{-1}\int_Be^{-\Phi(u;y)}\,\mu_0(du)
$$

とします。正定値性と $F(u)\in\mathbb R^m$ から $0<e^{-\Phi(u;y)}\le1$ が全ての $u$ で成り立ち、$\mu_0(H)=1$ なので $0<Z(y)\le1$ です。したがって $\mu^y(H)=1$ となり、[関数空間の Bayes 定理](#thm-inv16-function-space-bayes)が条件付き分布としての正当性も保証します。無限次元の Lebesgue 測度を前提とする必要はありません。
<!-- solution-end -->

## まとめ

- **信用領域**は固定した観測 $y$ の下で、採用モデルの事後確率を割り当てた集合です。**被覆率**は固定した真値の下で、動く観測から作った集合が真値を含む確率です。
- Gaussian の平均・分散は事前分布と尤度の両方に依存します。**モデル不一致**と測定誤差の区別、未知パラメータの識別可能性は別途検証します。
- 関数空間では事前確率測度 $\mu_0$ を基準に $d\mu^y/d\mu_0$ を定義します。有限次元 Gaussian 尤度が正で有界なら正規化定数は確実に正かつ有限で、条件付き分布を構成できます。

次の [INV17「PDEの係数から観測までをどう微分するか」](../INV17/index.md)では、観測を作る forward map 自体が PDE の解を経由する場合に、係数の変化が観測へどう伝わるかを扱います。
