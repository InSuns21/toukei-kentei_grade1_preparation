# SLT2-03 ridgeのスペクトルと偏り・分散

前章では、平方損失を零から最小化する勾配流が、十分な時間の後に[最小ノルム最小二乗解](../SLT2-02/index.md#thm-slt2-02-minimum-norm)を選ぶと分かった。しかし小さな特異値を逆数にする操作は、観測応答に含まれる小さな雑音まで大きな係数へ変換し得る。訓練データに正確に合わせることと、真の平均応答を正確に予測することは別である。

そこで、係数を零へ引き寄せるridge正則化を、**各特異値方向に対するフィルタ**として読み直す。Ridgeの基本的な定義・一意性・係数の偏りと分散は[ML1-05](../../ML/ML1-05/index.md#def-ml1-05-ridge)で既に扱った。ここではそれらを再定義せず、次の問いを一つにつなぐ。

1. どの特異方向の雑音が抑えられるのか。
2. 雑音を抑える代わりに、どの信号を失うのか。
3. 訓練誤差を小さくしたことから、真の予測リスクをどこまで判断できるのか。

最初は行列と応答を固定し、後半で応答を確率変数へ切り替える。未知の入力における汎化リスクやdouble descentの一般論は、固定設計だけからは結論しない。

## 1. 正則化を特異方向ごとのフィルタとして見る

[設計行列](../../ML/ML1-04/index.md#def-ml1-04-design-matrix)を $X\in\mathbb R^{n\times p}$、応答を $y\in\mathbb R^n$ とする。$n,p$ は正整数であり、切片を含む全ての係数を罰する設定を採用する。[ML1-05のridgeの定義](../../ML/ML1-05/index.md#def-ml1-05-ridge)では損失が $1/(2n)$ で正規化され、罰則が $\lambda\|\beta\|_2^2/2$ だった。一方、[前章の勾配流](../SLT2-02/index.md#def-slt2-02-gradient-flow)の平方損失は $1/2$ 倍の残差二乗和だった。この章では後者と比較しやすいよう、正の数 $\mu=n\lambda$ を使い、同じ最小化を

$$
\widehat\beta_\mu
=\underset{\beta\in\mathbb R^p}{\operatorname{argmin}}
\left\{\frac12\|X\beta-y\|_2^2+\frac\mu2\|\beta\|_2^2\right\},
\qquad \mu>0
$$

と書く。**$\mu$ とML1-05の $\lambda$ は同じ数ではない**。比較時には必ず $\mu=n\lambda$ と換算する。[ridge一意解の定理](../../ML/ML1-05/index.md#thm-ml1-05-unique)にこの換算を代入すると

$$
\widehat\beta_\mu=(X^{\mathsf T}X+\mu I_p)^{-1}X^{\mathsf T}y
$$

である。

例えば一方向だけの設計 $X=(s)$（$s>0$）で応答 $y$ を近似すると、正則化なしの係数は $y/s$ となり、小さい $s$ では非常に大きくなる。ridgeでは係数が $sy/(s^2+\mu)$ となり、$s$ が零へ近づいても発散しない。この **$1/s$ の代わりに何を掛けるか** がフィルタの問いである。

[特異値分解](../../../基礎科目/F0/F0-00F2/index.md#thm-f0-00f2-svd)で $r=\operatorname{rank}X$、正の特異値を $s_1,\ldots,s_r$、対応する左右の単位特異ベクトルを $u_j\in\mathbb R^n$、$v_j\in\mathbb R^p$ とする。これらは各側で正規直交し、$Xv_j=s_ju_j$、$X^{\mathsf T}u_j=s_jv_j$ を満たす。$r=0$ の場合、以下の和は空和とする。

係数への写像と訓練点における予測への写像を区別したい。前者は $n$ 次元の観測を $p$ 次元の係数に、後者は同じ $n$ 次元の予測に移す。この二つの作用を、特異値ごとの重みで表す。

その重みは[既習のridgeの特異値縮小公式](../../ML/ML1-05/index.md#thm-ml1-05-svd-shrink)から導ける。実際、$X^{\mathsf T}y$ は右特異ベクトルの正特異値方向だけにあり、各方向では

$$
X^{\mathsf T}y=\sum_{j=1}^r s_j(u_j^{\mathsf T}y)v_j,
\qquad
(X^{\mathsf T}X+\mu I_p)v_j=(s_j^2+\mu)v_j.
$$

従って逆行列を掛けた係数の第 $j$ 成分には $s_j/(s_j^2+\mu)$ が掛かる。さらに $Xv_j=s_ju_j$ なので、訓練点予測ではもう一度 $s_j$ が掛かり、重みは $s_j^2/(s_j^2+\mu)$ になる。

[行空間と核の直交性](../SLT2-01/index.md#thm-slt2-01-row-null-prediction)により $X^{\mathsf T}y$ は $\ker X$ と直交する。従って係数 $G_\mu y$ に核方向の成分はなく、予測 $H_\mu y$ にも核方向からの寄与はない。

<a id="def-slt2-03-spectral-filter"></a>

<!-- formal-statement-start -->
> **定義（ridgeのスペクトルフィルタと平滑化行列）**  
> $n,p\ge1$、$X\in\mathbb R^{n\times p}$、$\mu>0$ とする。係数用のスペクトルフィルタを $f_\mu(s)=s/(s^2+\mu)$、訓練点予測用のフィルタを $h_\mu(s)=s^2/(s^2+\mu)$（$s\ge0$）とする。係数への線形写像 $G_\mu$ と平滑化行列 $H_\mu$ を次で定める。

$$
\begin{aligned}
G_\mu&=(X^{\mathsf T}X+\mu I_p)^{-1}X^{\mathsf T}
=\sum_{j=1}^{r}f_\mu(s_j)v_ju_j^{\mathsf T}
\quad\in\mathbb R^{p\times n},\\
H_\mu&=XG_\mu
=\sum_{j=1}^{r}h_\mu(s_j)u_ju_j^{\mathsf T}
\quad\in\mathbb R^{n\times n}.
\end{aligned}
$$

> 観測応答 $y$ に対し、ridge係数は $G_\mu y$、訓練点の適合値は $H_\mu y$ である。零特異値方向では両フィルタを0とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt2-03-spectral-filter -->
### 例：2件・3特徴で二種類の縮小を確認する

**定義の確認**。次の二件三特徴の設計で、係数用フィルタと予測用フィルタの作用を直接計算する。

$$
X=\begin{pmatrix}2&0&0\\0&1/2&0\end{pmatrix},
\qquad y=\begin{pmatrix}2\\1\end{pmatrix},
\qquad \mu=\frac14.
$$

この $X$ は、第一の係数を2倍、第二の係数を $1/2$ 倍して二つの観測へ写し、第三の係数は観測に全く出さない。$e_j^{(d)}$ を $\mathbb R^d$ の第 $j$ 標準基底ベクトルとすると、

$$
\begin{aligned}
Xe_1^{(3)}&=2e_1^{(2)},&X^{\mathsf T}e_1^{(2)}&=2e_1^{(3)},\\
Xe_2^{(3)}&=\tfrac12e_2^{(2)},&X^{\mathsf T}e_2^{(2)}&=\tfrac12e_2^{(3)},\\
Xe_3^{(3)}&=0.
\end{aligned}
$$

従って階数は2であり、$u_j=e_j^{(2)}$、$v_j=e_j^{(3)}$（$j=1,2$）、$s_1=2,s_2=1/2$ が特異値分解の関係を満たす。これを上の二つのフィルタに代入すると、

$$
\begin{aligned}
f_{1/4}(2)&=\frac{2}{4+1/4}=\frac8{17},
&f_{1/4}(1/2)&=\frac{1/2}{1/4+1/4}=1,\\
h_{1/4}(2)&=\frac4{4+1/4}=\frac{16}{17},
&h_{1/4}(1/2)&=\frac{1/4}{1/4+1/4}=\frac12.
\end{aligned}
$$

各 $v_ju_j^{\mathsf T}$ と $u_ju_j^{\mathsf T}$ を重み付きで足すと、定義にある二つの行列そのものが

$$
G_{1/4}=\begin{pmatrix}8/17&0\\0&1\\0&0\end{pmatrix},
\qquad H_{1/4}=\begin{pmatrix}16/17&0\\0&1/2\end{pmatrix}=XG_{1/4}
$$

となる。従って $G_{1/4}y=(16/17,1,0)^{\mathsf T}$、$H_{1/4}y=(32/17,1/2)^{\mathsf T}$。後者は $XG_{1/4}y$ とも一致する。第一モードは訓練応答の $16/17$ を保つが、弱い第二モードは半分しか保たない。第三の核方向は常に係数0である。この代入で、係数側と予測側のフィルタを混同せず定義の両方を検証できた。
<!-- definition-example-end -->

## 2. フィルタが測る有効次元と雑音増幅

通常の階数 $r$ は特異値が正か零かだけで決まり、正の特異値の大小は見ない。しかしridgeが信号をどれだけ通すかは、$\mu$ と各 $s_j^2$ の比較で変わる。平滑化行列の固有方向ごとの通過率を足すと、予測に何方向分の自由度を使っているかを連続的に測れる。

<a id="def-slt2-03-effective-dimension"></a>

<!-- formal-statement-start -->
> **定義（ridgeの有効次元）**  
> $n,p\ge1$、$X\in\mathbb R^{n\times p}$、$\mu>0$ に対する[平滑化行列](#def-slt2-03-spectral-filter)を $H_\mu$ とする。その対角成分の和（行列の跡）を有効次元 $d_{\mathrm{eff}}(\mu)$ と定める。

$$
d_{\mathrm{eff}}(\mu)=\operatorname{tr}(H_\mu)
=\sum_{j=1}^{r}\frac{s_j^2}{s_j^2+\mu}.
$$

> ここで $r=\operatorname{rank}X$ であり、$r=0$ の場合は0である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt2-03-effective-dimension -->
**定義の確認**。直前の対角設計で $H_{1/4}=\operatorname{diag}(16/17,1/2)$ なので、対角を足して

$$
d_{\mathrm{eff}}(1/4)
=\frac{16}{17}+\frac12=\frac{49}{34}.
$$

階数は2でも有効次元は $49/34$（1と2の間）である。この値は観測件数でも、非零特異値の個数でもない。上の二つの通過率を足した実数だと直接確認できる。
<!-- definition-example-end -->

フィルタのもう一つの用途は、応答の変化が係数をどのくらい動かし得るかを比較することである。[線形写像の2-作用素ノルム](../../../基礎科目/F0/F0-00F2/index.md#def-f0-00f2-operator-norm)は、入力の単位長当たりの出力の最大長を表す。

<a id="thm-slt2-03-filter-stability"></a>

<!-- formal-statement-start -->
> **定理（ridgeフィルタの安定性と有効次元）**  
> $n,p\ge1$、$X\in\mathbb R^{n\times p}$、$\mu>0$ とし、$G_\mu,H_\mu,d_{\mathrm{eff}}(\mu)$ を上の定義で定める。このとき任意の $y,y'\in\mathbb R^n$ について

$$
\|G_\mu y-G_\mu y'\|_2
\le\frac{1}{2\sqrt{\mu}}\|y-y'\|_2.
$$

> $r>0$ なら $0<d_{\mathrm{eff}}(\mu)<r$ であり、有効次元は $\mu$ に関して厳密に減少する。その導関数と極限は

$$
\frac{d}{d\mu}d_{\mathrm{eff}}(\mu)
=-\sum_{j=1}^{r}\frac{s_j^2}{(s_j^2+\mu)^2}<0,
\qquad
\lim_{\mu\downarrow0}d_{\mathrm{eff}}(\mu)=r,\quad
\lim_{\mu\to\infty}d_{\mathrm{eff}}(\mu)=0.
$$

> $r=0$ の場合は $G_\mu=H_\mu=0$、$d_{\mathrm{eff}}(\mu)=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

[特異値分解](../../../基礎科目/F0/F0-00F2/index.md#thm-f0-00f2-svd)の正規直交座標で入力の差を展開する。係数の最大増幅率は $s/(s^2+\mu)$ であり、平方の非負性から一様上界を出す。有効次元については有限和を項別に微分して極限を取る。

<!-- proof-start -->
### 証明

$\delta=y-y'$ とし、$c_j=u_j^{\mathsf T}\delta$ と置く。[フィルタの定義](#def-slt2-03-spectral-filter)から

$$
G_\mu\delta=\sum_{j=1}^r\frac{s_j}{s_j^2+\mu}c_jv_j.
$$

$v_j$ が正規直交し、$\sum_{j=1}^r c_j^2\le\|\delta\|_2^2$ であることから

$$
\|G_\mu\delta\|_2^2
=\sum_{j=1}^{r}\frac{s_j^2}{(s_j^2+\mu)^2}c_j^2.
$$

$s\ge0$ について $(s-\sqrt\mu)^2\ge0$ を展開すると $s^2+\mu\ge2s\sqrt\mu$ である。したがって $s/(s^2+\mu)\le1/(2\sqrt\mu)$。これを各項に適用すれば

$$
\|G_\mu\delta\|_2^2
\le\frac1{4\mu}\sum_{j=1}^{r}c_j^2
\le\frac{\|\delta\|_2^2}{4\mu},
$$

となり第一の主張を得る。

次に正の $s_j$ と $\mu>0$ について $0<h_\mu(s_j)<1$ である。従って $r>0$ のとき $0<\sum_j h_\mu(s_j)<r$。各項の微分は

$$
\frac{d}{d\mu}\frac{s_j^2}{s_j^2+\mu}
=-\frac{s_j^2}{(s_j^2+\mu)^2}<0
$$

なので、有限和の微分も負である。$\mu\downarrow0$ では各項が1へ、$\mu\to\infty$ では0へ収束する。有限個の和だから極限と和を交換してよい。$r=0$ なら全て空和である。$\square$
<!-- proof-end -->

この上界は**係数が観測雑音に極端に敏感になるのを防ぐ**保証であって、真の係数に近いという保証ではない。例えば正の特異値が $s=\sqrt\mu$ の方向では係数の増幅率が最大 $1/(2\sqrt\mu)$ となり、定理の定数は一般に改善できない。逆に特異値が0ならその方向の係数は全く回復しない。

## 3. 固定設計での偏りと分散をモードに割り当てる

ここから確率模型へ切り替える。$X$ と真の係数 $\beta_\star\in\mathbb R^p$ は固定し、繰り返し観測する応答ベクトルを

$$
Y=m+\varepsilon,\qquad m=X\beta_\star,
\qquad
\mathbb E[\varepsilon]=0,\quad
\operatorname{Cov}(\varepsilon)=\tau^2 I_n,\quad \tau^2\ge0
$$

とする。全成分の二次モーメントは有限とする。[固定デザインでの偏り・分散](../../ML/ML1-05/index.md#def-ml1-05-fixed-design)と同じ模型で、雑音分散をここでは $\tau^2$ と書く。雑音成分が互いに独立であることや正規分布は仮定しない。平均0かつ共分散が $\tau^2 I_n$ で十分である。

観測 $Y$ で作った予測 $H_\mu Y$ を、観測値 $Y$ 自身ではなく雑音のない真の平均応答 $m$ と比較する。ここで評価点は訓練時と同じ $X$ の行であり、[ML1-05の訓練設計上の予測リスク](../../ML/ML1-05/index.md#thm-ml1-05-bias-variance)を詳しく分解する。

$$
R_X(\mu)=\frac1n\mathbb E\|H_\mu Y-m\|_2^2.
$$

左特異ベクトル方向の真の信号 $a_j=u_j^{\mathsf T}m=s_jv_j^{\mathsf T}\beta_\star$ と、通過率 $h_j=h_\mu(s_j)$ を置く。$X$ の像が $u_1,\ldots,u_r$ に張られるため、$m$ にその直交補空間成分はない。各モードの予測誤差は、信号を削ることによる確定したずれと、雑音を通すことによる揺れに分かれる。

<a id="thm-slt2-03-modewise-risk"></a>

<!-- formal-statement-start -->
> **定理（固定設計のモード別予測リスク）**  
> $n,p\ge1$、固定された $X\in\mathbb R^{n\times p}$、$\beta_\star\in\mathbb R^p$ と、平均0・共分散 $\tau^2I_n$（$\tau^2\ge0$）の雑音 $\varepsilon$ を仮定する。$Y=X\beta_\star+\varepsilon$、$\mu>0$ とし、$r$ 個の正の特異値を $s_j$、$a_j=u_j^{\mathsf T}X\beta_\star$ とする。固定設計上の予測リスクは

$$
R_X(\mu)=\frac1n\sum_{j=1}^r
\left\{\frac{\mu^2a_j^2}{(s_j^2+\mu)^2}
+\frac{\tau^2s_j^4}{(s_j^2+\mu)^2}\right\}.
$$

> 第一項は予測偏りの二乗、第二項は予測分散である。$\mu>0$ での導関数は

$$
R_X'(\mu)=\frac2n\sum_{j=1}^{r}
\frac{s_j^2(\mu a_j^2-\tau^2s_j^2)}
{(s_j^2+\mu)^3}.
$$

> 特に第一項の各モードは $\mu$ とともに非減少、第二項は非増加であり、

$$
\lim_{\mu\downarrow0}R_X(\mu)=\frac{\tau^2r}{n},
\qquad
\lim_{\mu\to\infty}R_X(\mu)=\frac{\|X\beta_\star\|_2^2}{n}.
$$

> 零特異値方向の係数は訓練点予測リスクへ寄与しない。
<!-- formal-statement-end -->

### 証明の見取り図

観測を信号と雑音に分け、[平滑化行列](#def-slt2-03-spectral-filter)を掛ける。$u_j$ での雑音成分は平均0・分散 $\tau^2$ なので、偏りと雑音の交差項が消える。$\mu$ で微分すると、抑えた雑音と失った信号の交換がどこで起こるかが見える。

<!-- proof-start -->
### 証明

$\xi_j=u_j^{\mathsf T}\varepsilon$ と置く。$\mathbb E[\varepsilon]=0$ より $\mathbb E[\xi_j]=0$。また共分散の仮定を成分表示すると

$$
\mathbb E[\xi_j^2]
=u_j^{\mathsf T}\mathbb E[\varepsilon\varepsilon^{\mathsf T}]u_j
=u_j^{\mathsf T}(\tau^2I_n)u_j=\tau^2,
$$

である。正規直交基底の直交補空間では $H_\mu$ が零で、$m$ にその成分がないため、

$$
\begin{aligned}
H_\mu Y-m
&=H_\mu(m+\varepsilon)-m\\
&=\sum_{j=1}^r\{(h_j-1)a_j+h_j\xi_j\}u_j.
\end{aligned}
$$

$u_j$ の正規直交性で二乗長を成分ごとの和に分け、期待値を取ると

$$
\begin{aligned}
\mathbb E\|H_\mu Y-m\|_2^2
&=\sum_{j=1}^r
\mathbb E\left[((h_j-1)a_j+h_j\xi_j)^2\right]\\
&=\sum_{j=1}^r\{(1-h_j)^2a_j^2+h_j^2\tau^2\}.
\end{aligned}
$$

二行目では交差項の期待値 $2(h_j-1)a_jh_j\mathbb E[\xi_j]=0$ を使った。$1-h_j=\mu/(s_j^2+\mu)$、$h_j=s_j^2/(s_j^2+\mu)$ を代入し、$n$ で割れば主公式を得る。

各分数を $\mu$ で微分すると

$$
\begin{aligned}
\frac{d}{d\mu}\frac{\mu^2a_j^2}{(s_j^2+\mu)^2}
&=\frac{2\mu s_j^2a_j^2}{(s_j^2+\mu)^3}\ge0,\\
\frac{d}{d\mu}\frac{\tau^2s_j^4}{(s_j^2+\mu)^2}
&=-\frac{2\tau^2s_j^4}{(s_j^2+\mu)^3}\le0.
\end{aligned}
$$

これらを足して $n$ で割れば導関数の式となる。$\mu\downarrow0$ では各正特異値の第一項が0、第二項が $\tau^2$ になる。$\mu\to\infty$ では第一項が $a_j^2$、第二項が0になる。$m=\sum_j a_ju_j$ より $\sum_j a_j^2=\|m\|_2^2$。$r=0$ なら $X=0$、$m=0$ で式と極限は全て0である。$\square$
<!-- proof-end -->

この式は[係数の偏り・分散分解](../../ML/ML1-05/index.md#thm-ml1-05-bias-variance)とは目的が違う。係数誤差には $\ker X$ にある真の係数 $\beta_\star$ の長さが残り、弱い特異値方向では分散が $\tau^2s_j^2/(s_j^2+\mu)^2$ になる。しかし訓練点の**予測**ではさらに $X$ を掛けるため、分散は $\tau^2s_j^4/(s_j^2+\mu)^2$、核方向は消える。係数の大きな揺れが、同じ割合で訓練点の予測を揺らすわけではない。

### 3.1 正則化係数を一方向ごとに選べるとしたら

$a_j\ne0$、$\tau^2>0$ の一つのモードだけのリスクは、上の導関数の符号から

$$
\mu_j^\star=\frac{\tau^2s_j^2}{a_j^2}
=\frac{\tau^2}{(v_j^{\mathsf T}\beta_\star)^2}
$$

で最小になる。$0<\mu<\mu_j^\star$ では減少し、$\mu>\mu_j^\star$ では増加する。$a_j=0$ のモードは信号がないので、$\tau^2>0$ なら大きい $\mu$ ほど有利である。$\tau^2=0$ で $a_j\ne0$ なら、逆に $\mu\downarrow0$ が最良である。

実際のridgeは**全モードに共通の $\mu$ を一つだけ使う**。異なる $v_j^{\mathsf T}\beta_\star$ をもつモードは最良の正則化強度も一般に異なり、全体の最適値は各 $\mu_j^\star$ の単純な平均にはならない。しかも真の係数と雑音分散は通常は未知である。したがってこの導出はリスクの構造を示すものであり、実測値から最適値がただちに分かるという意味ではない。

### 3.2 数値例：弱い方向に信号がない

第1節の $X$ に対し、真の係数を $\beta_\star=(1,0,5)^{\mathsf T}$、雑音分散を $\tau^2=1/4$ とする。真の平均応答は $m=(2,0)^{\mathsf T}$。第三成分5は核方向なので、どんな訓練応答にも現れない。$\mu=1/4$ の通過率は $h_1=16/17$、$h_2=1/2$ であり、[固定設計のモード別予測リスク](#thm-slt2-03-modewise-risk)から

$$
\begin{aligned}
R_X(1/4)
&=\frac12\left[
4\left(\frac1{17}\right)^2
+\frac14\left\{\left(\frac{16}{17}\right)^2
+\left(\frac12\right)^2\right\}\right]\\
&=\frac{34}{289}+\frac1{32}.
\end{aligned}
$$

正則化なしの極限は $\tau^2r/n=1/4$、強い正則化の極限は $\|m\|^2/n=2$。この設定では $\mu=1/4$ は正則化なしより良いが、$\mu$ を大きくし続けると真の第一モードも失う。第二モードには真の信号がないので、そこで雑音を半分に抑える利点がある。

## 4. 訓練残差と真の予測リスクはなぜ違うか

学習者が実際に手元で測れるのは、通常 $m=X\beta_\star$ からの誤差ではなく、観測した応答 $Y$ からの残差である。この観測値には学習時と同じ雑音が入っているので、モデルが雑音まで追いかけると訓練残差は小さくなる。訓練残差の期待値を $T_X(\mu)$ と置き、前節の $R_X(\mu)$ と比べる。

$$
T_X(\mu)
=\frac1n\mathbb E\|Y-H_\mu Y\|_2^2.
$$

ここでは訓練残差に偏り補正を加えると、固定した $\mu$ の信号予測リスクを期待値の意味で推定できる。その補正に、先ほどの有効次元が現れる。

<a id="prop-slt2-03-training-optimism"></a>

<!-- formal-statement-start -->
> **命題（訓練残差と予測リスクの期待差）**  
> $n,p\ge1$、$X,\beta_\star$ を固定し、$Y=X\beta_\star+\varepsilon$、$\mathbb E[\varepsilon]=0$、$\operatorname{Cov}(\varepsilon)=\tau^2I_n$（$\tau^2\ge0$）とする。$\mu>0$ も観測 $Y$ を見る前に固定し、$H_\mu$ と $d_{\mathrm{eff}}(\mu)$ を前節の定義で作る。このとき

$$
T_X(\mu)-R_X(\mu)
=\tau^2\left(1-\frac{2d_{\mathrm{eff}}(\mu)}{n}\right).
$$

> したがって $\tau^2$ が既知の場合、観測応答から計算できる

$$
\widehat R_X(\mu)
=\frac1n\|Y-H_\mu Y\|_2^2
-\tau^2+\frac{2\tau^2}{n}d_{\mathrm{eff}}(\mu)
$$

> は各固定 $\mu>0$ に対して $\mathbb E[\widehat R_X(\mu)]=R_X(\mu)$ を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

訓練残差では $(I_n-H_\mu)$ が信号と雑音の両方に掛かるが、真の予測誤差では信号側は同じで雑音側に $H_\mu$ が掛かる。共通の偏り二乗を消し、二つの雑音の二乗期待値だけを比べる。

<!-- proof-start -->
### 証明

$m=X\beta_\star$ と書く。$Y=m+\varepsilon$ だから

$$
\begin{aligned}
Y-H_\mu Y
&=(I_n-H_\mu)m+(I_n-H_\mu)\varepsilon,\\
H_\mu Y-m
&=-(I_n-H_\mu)m+H_\mu\varepsilon.
\end{aligned}
$$

雑音の平均は0なので、どちらの二乗長でも信号と雑音の交差項の期待値は0である。また任意の固定行列 $A\in\mathbb R^{n\times n}$ について、成分を展開すると

$$
\mathbb E\|A\varepsilon\|_2^2
=\sum_{i=1}^n\sum_{j,k=1}^n
A_{ij}A_{ik}\mathbb E[\varepsilon_j\varepsilon_k]
=\tau^2\sum_{i,j}A_{ij}^2
=\tau^2\operatorname{tr}(AA^{\mathsf T}).
$$

したがって $H_\mu^{\mathsf T}=H_\mu$ を使うと

$$
\begin{aligned}
nT_X(\mu)
&=\|(I_n-H_\mu)m\|_2^2
+\tau^2\operatorname{tr}\bigl((I_n-H_\mu)^2\bigr),\\
nR_X(\mu)
&=\|(I_n-H_\mu)m\|_2^2
+\tau^2\operatorname{tr}(H_\mu^2).
\end{aligned}
$$

差を取ると信号の項は消え、

$$
\begin{aligned}
n\{T_X(\mu)-R_X(\mu)\}
&=\tau^2\operatorname{tr}
\bigl(I_n-2H_\mu+H_\mu^2-H_\mu^2\bigr)\\
&=\tau^2\{n-2\operatorname{tr}(H_\mu)\}.
\end{aligned}
$$

[有効次元の定義](#def-slt2-03-effective-dimension)を代入して $n$ で割れば最初の等式を得る。$\widehat R_X(\mu)$ の期待値を取れば、訓練残差の期待値 $T_X(\mu)$ から差の項を引くことになり、二番目の主張も従う。$\square$
<!-- proof-end -->

### 例：補間の訓練残差が零でも、予測リスクは零ではない

行フルランクの $X$ を考える。[ridgeの特異値方向の縮小と零正則化極限](../../ML/ML1-05/index.md#thm-ml1-05-svd-shrink)では、$\mu\downarrow0$ で各正特異方向の通過率が1になる。左特異ベクトルは $\mathbb R^n$ の基底なので、$H_\mu\to I_n$ である。

この極限ではどんな観測 $Y$ にも訓練残差が0となり、$T_X(0+)=0$。一方、真の信号との差は $Y-m=\varepsilon$ だから、$R_X(0+)=\tau^2$ である。

また有効次元は $d_{\mathrm{eff}}(0+)=n$ になる。これを[期待差の命題](#prop-slt2-03-training-optimism)へ代入すると右辺は $-\tau^2$ であり、実際の差と一致する。

逆に $X=0$ なら $H_\mu=0$、$m=0$、$d_{\mathrm{eff}}=0$ である。このとき予測リスクは0、訓練残差の二乗期待値は $\tau^2$ である。補正の符号が一定でないのは、訓練残差と信号予測リスクが**異なる対象**だからである。

補正式は、正規雑音なしでも二次モーメントだけで成立する。ただし、観測した $Y$ を見て $\mu$ を選ぶと、選択後の $\mu$ は確率変数となる。命題は固定した各 $\mu$ への不偏性を述べるだけであり、同じデータで $\widehat R_X(\mu)$ を最小化した後の推定値が自動的に不偏とは主張しない。また $\tau^2$ が未知なら、この式をそのまま数値計算できない。

## 5. この分解で分かること・分からないこと

1. **観測しにくい係数方向**：$s_j$ が小さいと正則化なしの係数の雑音分散 $\tau^2/s_j^2$ は大きい。一方、ridgeは[フィルタの一様上界](#thm-slt2-03-filter-stability)で係数の増幅を抑える。ただし真の係数の縮小による偏りは避けられない。
2. **零特異値方向**：[係数リスクの式](../../ML/ML1-05/index.md#thm-ml1-05-bias-variance)には真の核成分の二乗が残るが、[訓練点予測リスクの式](#thm-slt2-03-modewise-risk)には現れない。例えば上の $\beta_\star$ の第三成分5は訓練点で識別不能である。未知の入力が第三係数を参照するなら、その入力の予測誤差は別に評価する必要がある。
3. **予測保証の範囲**：ここでの期待値は固定した $X$ における雑音の繰り返しだけで取った。新しい特徴量ベクトルの分布、設計行列のランダム性、正則化係数をデータから選ぶ方法は仮定していない。従って、[SLT1の汎化保証](../SLT1-17/index.md#thm-slt1-17-ridge-stability)へ直接読み替えることもできない。

まとめると、ridgeは正則化係数によって特異方向ごとの信号と雑音を同時に縮める。予測リスクの偏り・分散分解は、**どの方向を通すか**を考えるための計算道具である。次章では、特異値が入力次元と標本数に応じて変わるとき、補間の前後でリスクがどのような形を取り得るかを検討する。

## 演習

### SLT2-03-A01 正則化係数の正規化
- Level: A
- 目安時間: 10分

$n=4$、ML1-05の正則化係数を $\lambda=1/8$ とする。本章の $\mu$ を求め、正の特異値が $s_1=1,s_2=2$ のとき各係数用フィルタ $f_\mu(s_j)$ と予測用フィルタ $h_\mu(s_j)$ を計算せよ。

<!-- solution-start -->
#### 詳細解答

[ML1-05のridgeの定義](../../ML/ML1-05/index.md#def-ml1-05-ridge)の目的関数全体へ $n$ を掛けても最小点は変わらない。残差の係数を $1/2$ に揃えると罰則係数が $n\lambda$ になるため、$\mu=4/8=1/2$。

$$
\begin{aligned}
f_{1/2}(1)&=\frac1{1+1/2}=\frac23,
&h_{1/2}(1)&=\frac1{1+1/2}=\frac23,\\
f_{1/2}(2)&=\frac2{4+1/2}=\frac49,
&h_{1/2}(2)&=\frac4{4+1/2}=\frac89.
\end{aligned}
$$

係数側の $f$ と予測側の $h=sf$ は異なる。特に第二モードでは $f=4/9$ でも予測信号の $8/9$ が残る。
<!-- solution-end -->

### SLT2-03-A02 二件三特徴の手計算
- Level: A
- 目安時間: 12分

$$
X=\begin{pmatrix}2&0&0\\0&1/2&0\end{pmatrix},
\quad y=(2,1)^{\mathsf T},\quad \mu=\frac14.
$$

$G_\mu$、$H_\mu$、ridge係数、訓練点の適合値を求め、$X\widehat\beta_\mu=H_\mu y$ を検算せよ。

<!-- solution-start -->
#### 詳細解答

$X^{\mathsf T}X=\operatorname{diag}(4,1/4,0)$ なので、[ridge一意解の公式](../../ML/ML1-05/index.md#thm-ml1-05-unique)を本章の $\mu=1/4$ で使うと

$$
\begin{aligned}
G_{1/4}
&=\operatorname{diag}(17/4,1/2,1/4)^{-1}X^{\mathsf T}
=\begin{pmatrix}8/17&0\\0&1\\0&0\end{pmatrix},\\
H_{1/4}&=XG_{1/4}
=\begin{pmatrix}16/17&0\\0&1/2\end{pmatrix}.
\end{aligned}
$$

従って $\widehat\beta_{1/4}=(16/17,1,0)^{\mathsf T}$、

$$
X\widehat\beta_{1/4}
=\begin{pmatrix}2(16/17)\\(1/2)1\end{pmatrix}
=\begin{pmatrix}32/17\\1/2\end{pmatrix}
=H_{1/4}y.
$$

零特異値の第三係数は $1/\mu$ を掛けるのではなく0になる点に注意する。
<!-- solution-end -->

### SLT2-03-A03 有効次元と増幅上界
- Level: A
- 目安時間: 10分

A02の設計で $d_{\mathrm{eff}}(1/4)$ と $G_{1/4}$ の作用素ノルムを求め、[フィルタ安定性](#thm-slt2-03-filter-stability)の上界が等号になるか確かめよ。

<!-- solution-start -->
#### 詳細解答

$H_{1/4}$ の対角成分は $16/17,1/2$ であるから

$$
d_{\mathrm{eff}}(1/4)=\frac{16}{17}+\frac12=\frac{49}{34}.
$$

$G_{1/4}$ は二つの直交方向をそれぞれ $8/17,1$ 倍し、残る方向へ出力を持たない。よって最大特異値は $\max(8/17,1)=1$。一方 $1/(2\sqrt{1/4})=1$ なので等号となる。第二特異値 $s_2=1/2=\sqrt\mu$ が上界の等号条件である。
<!-- solution-end -->

### SLT2-03-A04 雑音の射影分散
- Level: A
- 目安時間: 10分

$\mathbb E[\varepsilon]=0$、$\operatorname{Cov}(\varepsilon)=\tau^2I_n$ とし、任意の単位ベクトル $u\in\mathbb R^n$ について $\mathbb E[(u^{\mathsf T}\varepsilon)^2]=\tau^2$ を示せ。雑音成分の独立性は必要か。

<!-- solution-start -->
#### 詳細解答

平均0なので $\mathbb E[\varepsilon\varepsilon^{\mathsf T}]=\tau^2I_n$ である。有限和の期待値の線形性で

$$
\mathbb E[(u^{\mathsf T}\varepsilon)^2]
=\mathbb E[u^{\mathsf T}\varepsilon\varepsilon^{\mathsf T}u]
=u^{\mathsf T}(\tau^2I_n)u
=\tau^2\|u\|_2^2=\tau^2.
$$

必要なのは共分散行列の条件だけであり、独立性や正規分布性は不要である。
<!-- solution-end -->

### SLT2-03-A05 全零設計の二種類の誤差
- Level: A
- 目安時間: 10分

$n=2,p=3$、$X=0$、$\beta_\star\in\mathbb R^3$、$Y=X\beta_\star+\varepsilon$、$\mathbb E\varepsilon=0$、$\operatorname{Cov}(\varepsilon)=\tau^2I_2$ とする。任意の $\mu>0$ で $\widehat\beta_\mu,H_\mu,d_{\mathrm{eff}}(\mu),R_X(\mu),T_X(\mu)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$X^{\mathsf T}X=0$、$X^{\mathsf T}Y=0$ だから

$$
\widehat\beta_\mu=(\mu I_3)^{-1}0=0,\quad H_\mu=0,\quad
d_{\mathrm{eff}}(\mu)=0.
$$

真の平均応答も $m=X\beta_\star=0$。したがって $R_X(\mu)=\mathbb E\|0-0\|^2/2=0$。一方 $Y=\varepsilon$ なので

$$
T_X(\mu)=\frac12\mathbb E(\varepsilon_1^2+\varepsilon_2^2)
=\frac12(2\tau^2)=\tau^2.
$$

係数の真値が非零であっても、訓練点での真の予測は零である。
<!-- solution-end -->

### SLT2-03-B01 一モードの最適正則化
- Level: B
- 目安時間: 20分

$n=p=1$、$X=(s)$（$s>0$）、$\beta_\star=b\ne0$、平均0・分散 $\tau^2>0$ の雑音とする。$R_X(\mu)$ とその導関数を求め、$\mu>0$ での唯一の最小点を示せ。$s$ の値が最適点に現れるかも答えよ。

<!-- solution-start -->
#### 詳細解答

真の信号は $m=sb$、唯一の特異値は $s$ である。[固定設計のモード別予測リスク](#thm-slt2-03-modewise-risk)で $a=sb,n=1$ とすると

$$
R_X(\mu)=\frac{s^2b^2\mu^2+\tau^2s^4}{(s^2+\mu)^2}.
$$

商の微分を分子・分母へ適用すると

$$
\begin{aligned}
R_X'(\mu)
&=\frac{2s^2b^2\mu(s^2+\mu)^2
-2(s^2b^2\mu^2+\tau^2s^4)(s^2+\mu)}
{(s^2+\mu)^4}\\
&=\frac{2s^4(b^2\mu-\tau^2)}{(s^2+\mu)^3}.
\end{aligned}
$$

分母は正なので、$\mu<\tau^2/b^2$ では負、$\mu>\tau^2/b^2$ では正。唯一の最小点は $\mu^\star=\tau^2/b^2$ で、$s$ には依存しない。これは**一モードのみ**の結果であり、多モードの共通最適値を意味しない。
<!-- solution-end -->

### SLT2-03-B02 一つの観測方向と残差の補正
- Level: B
- 目安時間: 20分

$n=2,p=1$、$X=(1,0)^{\mathsf T}$、$\beta_\star=a$、$\tau^2>0$ とする。$h=1/(1+\mu)$ と書いて、$R_X(\mu)$、$T_X(\mu)$、$d_{\mathrm{eff}}(\mu)$ を求め、[期待差の命題](#prop-slt2-03-training-optimism)を直接確かめよ。

<!-- solution-start -->
#### 詳細解答

$m=(a,0)^{\mathsf T}$、$H_\mu=\operatorname{diag}(h,0)$、$d_{\mathrm{eff}}=h$。雑音 $\varepsilon=(\varepsilon_1,\varepsilon_2)^{\mathsf T}$ とすると

$$
\begin{aligned}
H_\mu Y-m&=((h-1)a+h\varepsilon_1,0)^{\mathsf T},\\
Y-H_\mu Y&=((1-h)(a+\varepsilon_1),\varepsilon_2)^{\mathsf T}.
\end{aligned}
$$

交差項の期待値が0で $\mathbb E\varepsilon_i^2=\tau^2$ だから

$$
\begin{aligned}
R_X(\mu)&=\frac12\{(1-h)^2a^2+h^2\tau^2\},\\
T_X(\mu)&=\frac12\{(1-h)^2(a^2+\tau^2)+\tau^2\}.
\end{aligned}
$$

差を取ると $T_X-R_X=\tau^2\{(1-h)^2+1-h^2\}/2=\tau^2(1-h)$。命題の式 $\tau^2(1-2d_{\mathrm{eff}}/n)=\tau^2(1-h)$ と一致する。
<!-- solution-end -->

### SLT2-03-B03 等方的でない雑音
- Level: B
- 目安時間: 20分

固定設計の模型で、雑音の平均は0だが共分散が $\Omega\in\mathbb R^{n\times n}$（対称半正定値）であるとする。$H_\mu$ は確率変数でない対称行列とし、予測リスクの偏り・分散分解と、特異モードごとの分散項を導け。$\tau^2I_n$ の公式をそのまま使えるか。

<!-- solution-start -->
#### 詳細解答

$m=X\beta_\star$、$Y=m+\varepsilon$ とすると

$$
H_\mu Y-m=-(I_n-H_\mu)m+H_\mu\varepsilon.
$$

交差項は平均0により消える。$H_\mu=(H_{ij})$ と成分表示し、$\mathbb E[\varepsilon_j\varepsilon_k]=\Omega_{jk}$ を使うと

$$
\begin{aligned}
\mathbb E\|H_\mu\varepsilon\|_2^2
&=\sum_i\sum_{j,k}H_{ij}H_{ik}\mathbb E[\varepsilon_j\varepsilon_k]\\
&=\sum_i\sum_{j,k}H_{ij}\Omega_{jk}H_{ki}
=\operatorname{tr}(H_\mu\Omega H_\mu),
\end{aligned}
$$

である。二行目には $H_{ik}=H_{ki}$ という対称性を使った。よって

$$
R_X(\mu)=\frac1n\|(I_n-H_\mu)m\|_2^2
+\frac1n\operatorname{tr}(H_\mu\Omega H_\mu).
$$

$H_\mu=\sum_{j=1}^rh_ju_ju_j^{\mathsf T}$ を代入する。$u_j$ が正規直交するので、$\operatorname{tr}(u_ju_k^{\mathsf T})=u_k^{\mathsf T}u_j$ は $j=k$ のときだけ1になる。従って

$$
\begin{aligned}
\operatorname{tr}(H_\mu\Omega H_\mu)
&=\sum_{j,k=1}^rh_jh_k(u_j^{\mathsf T}\Omega u_k)
\operatorname{tr}(u_ju_k^{\mathsf T})\\
&=\sum_{j=1}^rh_j^2u_j^{\mathsf T}\Omega u_j.
\end{aligned}
$$

従って偏りの項は従来どおりだが、分散は $\tau^2\sum_jh_j^2$ ではなく各方向の $u_j^{\mathsf T}\Omega u_j$ で重み付けされる。$\Omega=\tau^2I_n$ の場合だけ前節の公式へ戻る。
<!-- solution-end -->

### SLT2-03-B04 核方向と新しい入力
- Level: B
- 目安時間: 18分

$n=1,p=2$、$X=(1\ \ 0)$、雑音なし、真の係数 $\beta_\star=(1,10)^{\mathsf T}$ と $\beta'_\star=(1,-10)^{\mathsf T}$ を考える。観測応答、任意の $\mu>0$ のridge係数、訓練点の予測を比べよ。新しい特徴量 $x_{\rm new}=(0,1)^{\mathsf T}$ での真の予測は一致するか。

<!-- solution-start -->
#### 詳細解答

両方の真の係数に対して観測応答は $Y=X\beta_\star=X\beta'_\star=1$。$X^{\mathsf T}X=\operatorname{diag}(1,0)$、$X^{\mathsf T}Y=(1,0)^{\mathsf T}$ だから

$$
\widehat\beta_\mu
=\operatorname{diag}(1+\mu,\mu)^{-1}
\begin{pmatrix}1\\0\end{pmatrix}
=\begin{pmatrix}1/(1+\mu)\\0\end{pmatrix}.
$$

訓練点の予測はいずれも $1/(1+\mu)$ で一致する。一方新しい入力の真の予測は $x_{\rm new}^{\mathsf T}\beta_\star=10$ と $x_{\rm new}^{\mathsf T}\beta'_\star=-10$ で異なる。新しい入力方向は $\ker X$ に含まれ、訓練点のリスクが同じでも未知点の予測誤差は同じと限らない。
<!-- solution-end -->

### SLT2-03-C01 弱い方向・有効次元・二種類のリスクの総合検算
- Level: C
- 目安時間: 40分

次の固定設計を考える。$Y=X\beta_\star+\varepsilon$、$\mathbb E\varepsilon=0$、$\operatorname{Cov}(\varepsilon)=\frac14I_2$ とし、

$$
X=\begin{pmatrix}2&0&0\\0&1/2&0\end{pmatrix},
\quad \beta_\star=(1,0,5)^{\mathsf T},
\quad \mu=\frac14.
$$

1. $\widehat\beta_\mu$ の期待値、$H_\mu$、$d_{\mathrm{eff}}(\mu)$ を求めよ。
2. 真の信号 $m=X\beta_\star$ への予測リスク $R_X(\mu)$ を偏り二乗と分散へ分けて計算し、$\mu\downarrow0$ と $\mu\to\infty$ の極限と比べよ。
3. 係数平均二乗誤差 $\mathbb E\|\widehat\beta_\mu-\beta_\star\|_2^2$ を計算し、核方向の寄与を明示せよ。
4. 訓練残差の期待値 $T_X(\mu)$ を直接計算し、命題の補正項で (2) のリスクへ戻ることを確かめよ。

<!-- solution-start -->
#### 詳細解答

**(1)** $m=(2,0)^{\mathsf T}$、$G_\mu=\begin{pmatrix}8/17&0\\0&1\\0&0\end{pmatrix}$ である。従って $\widehat\beta_\mu=G_\mu Y$、平均を取ると

$$
\mathbb E\widehat\beta_\mu
=G_\mu m=(16/17,0,0)^{\mathsf T}.
$$

また

$$
H_\mu=XG_\mu
=\operatorname{diag}(16/17,1/2),
\qquad
d_{\mathrm{eff}}=\frac{16}{17}+\frac12=\frac{49}{34}.
$$

**(2)** 左特異方向の信号は $a_1=2,a_2=0$、通過率は $h_1=16/17,h_2=1/2$。従って

$$
\begin{aligned}
\frac1n\|(I_n-H_\mu)m\|_2^2
&=\frac12\left(\frac2{17}\right)^2=\frac2{289},\\
\frac{\tau^2}{n}\operatorname{tr}(H_\mu^2)
&=\frac18\left(\frac{256}{289}+\frac14\right)
=\frac{32}{289}+\frac1{32},\\
R_X(1/4)&=\frac{34}{289}+\frac1{32}.
\end{aligned}
$$

[固定設計のモード別予測リスク](#thm-slt2-03-modewise-risk)で $r=2,n=2$ なので $R_X(0+)=\tau^2r/n=1/4$。強い正則化では予測が0へ近づき $R_X(\infty)=\|m\|^2/2=2$。$\mu=1/4$ はこの二つの極限より小さい。

**(3)** 係数の偏りは

$$
\mathbb E\widehat\beta_\mu-\beta_\star
=(-1/17,0,-5)^{\mathsf T},
$$

よって偏り二乗は $1/289+25$。[係数の偏り・分散分解](../../ML/ML1-05/index.md#thm-ml1-05-bias-variance)を本章の $G_\mu$ で表すと、雑音に由来する係数分散の総和は

$$
\tau^2\operatorname{tr}(G_\mu G_\mu^{\mathsf T})
=\frac14\left\{\left(\frac8{17}\right)^2+1^2\right\}
=\frac{16}{289}+\frac14.
$$

したがって

$$
\mathbb E\|\widehat\beta_\mu-\beta_\star\|_2^2
=25+\frac{17}{289}+\frac14.
$$

真の第三成分5は $X$ の核にあるため、予測リスクには出なくても係数リスクへ $5^2=25$ が残る。

**(4)** $I_n-H_\mu=\operatorname{diag}(1/17,1/2)$。$Y_1=2+\varepsilon_1$、$Y_2=\varepsilon_2$ であり、各雑音の平均は0、分散は $1/4$ だから

$$
\begin{aligned}
T_X(1/4)
&=\frac12\left\{
\frac{\mathbb E(2+\varepsilon_1)^2}{17^2}
+\frac{\mathbb E\varepsilon_2^2}{4}\right\}\\
&=\frac12\left\{\frac{4+1/4}{289}+\frac1{16}\right\}
=\frac{17}{2312}+\frac1{32}.
\end{aligned}
$$

[訓練残差と予測リスクの期待差](#prop-slt2-03-training-optimism)から

$$
\begin{aligned}
R_X-T_X
&=-\frac14+\frac{2(1/4)}2\cdot\frac{49}{34}\\
&=\frac14\left(\frac{49}{34}-1\right)
=\frac{15}{136}
=\frac{255}{2312}.
\end{aligned}
$$

従って $T_X+15/136=17/2312+255/2312+1/32=34/289+1/32$ と (2) に一致する。訓練残差の小ささだけから予測リスクを判定できないことも、数値で確認できた。
<!-- solution-end -->

