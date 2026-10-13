# HA7 RieszポテンシャルとHardy–Littlewood–Sobolev不等式

[HA5のRiesz変換](../HA5/index.md#def-ha5-riesz)は、核に消去があるため特異積分として取り扱いました。今度は、消去を使わずに**離れた点の値を重み付きで足し合わせる**作用素を考えます。核は原点付近で大きくなりますが、次数が適切なら局所積分可能です。他方、無限遠まで核を積分すると一般に発散します。「近くでの特異性」と「遠くまでの広がり」を別々の道具で制御する必要があります。

ここでの主役は、関数を滑らかにするポテンシャル作用素と、その入出力の積分指数を結ぶ Hardy–Littlewood–Sobolev（HLS）不等式です。強型の指数範囲だけでなく、$p=1$ で何が残り、何が壊れるかも具体的に証明します。最後に一階微分から関数の可積分性を回復する評価へ接続します。

以下、$d\ge1$ は整数、$0<\alpha<d$、積分は $\mathbb R^d$ のLebesgue積分です。$|S^{d-1}|$ を単位球面の面積とし、$M$ は[中心付きHardy–Littlewood最大作用素](../HA1/index.md#def-ha1-centered-maximal)とします。

## 1. 積分核が作るポテンシャル

核 $|z|^{\alpha-d}$ は $z=0$ に特異性をもちます。しかし半径 $\varepsilon$ の球上で積分すると、極座標の体積要素の $r^{d-1}$ と打ち消し合い、$r^{\alpha-1}$ が現れます。$\alpha>0$ が局所積分可能性を保証する理由です。

以下の正規化定数に現れる $\Gamma$ はGamma関数で、$s>0$ に対し

$$
\Gamma(s)=\int_0^\infty t^{s-1}e^{-t}\,dt
$$

と定義します。原点では $s>0$ により、無限遠では指数減衰により積分は収束します。部分積分から $\Gamma(s+1)=s\Gamma(s)$ が従います。また、球面積の公式 $|S^{d-1}|=2\pi^{d/2}/\Gamma(d/2)$ を後で使います。

<a id="def-ha7-riesz-potential"></a>
<!-- formal-statement-start -->
> **定義（Rieszポテンシャル）**  
> $d\ge1$、$0<\alpha<d$ とし、正規化定数を
>
$$
c_{d,\alpha}=
\frac{\Gamma((d-\alpha)/2)}
{2^\alpha\pi^{d/2}\Gamma(\alpha/2)}>0
$$
>
> とする。可測関数 $f$ について積分が絶対収束する点 $x$ では、次数 $\alpha$ の Rieszポテンシャルを
>
$$
I_\alpha f(x)
=c_{d,\alpha}\int_{\mathbb R^d}
\frac{f(y)}{|x-y|^{d-\alpha}}\,dy
$$
>
> とする。非負関数の場合は積分値 $+\infty$ も許し、一般の複素数値関数については絶対収束する点で解釈する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ha7-riesz-potential -->
**定義の確認**　$R>0$、$f=\boldsymbol1_{B(0,R)}$ とすると、極座標から

$$
\begin{aligned}
I_\alpha f(0)
&=c_{d,\alpha}|S^{d-1}|
\int_0^R r^{\alpha-d}r^{d-1}\,dr\\
&=\frac{c_{d,\alpha}|S^{d-1}|}{\alpha}R^\alpha<\infty.
\end{aligned}
$$

一方、$f\equiv1$ なら無限遠側で $\int_R^\infty r^{\alpha-1}\,dr=\infty$ となるため、$I_\alpha1(x)$ は有限ではありません。**核が局所可積分であることは、任意の入力に対する積分全体の収束を意味しません。**
<!-- definition-example-end -->

積分の特異性が扱えるとしても、$I_\alpha:L^p\to L^q$ の指数は自由には選べません。次に尺度の変化だけで必要条件を決めます。

<a id="prop-ha7-scaling"></a>
<!-- formal-statement-start -->
> **命題（尺度変換と指数の必要条件）**  
> $0<\alpha<d$、$1\le p,q<\infty$ とする。$\lambda>0$ に対し
>
$$
f_\lambda(x)=\lambda^{d/p}f(\lambda x)
$$
>
> とおく。積分の定義できる点では
>
$$
I_\alpha f_\lambda(x)
=\lambda^{d/p-\alpha}I_\alpha f(\lambda x)
$$
>
> が成り立つ。$I_\alpha$ が零でない作用素として $L^p(\mathbb R^d)$ から $L^q(\mathbb R^d)$ へ一様有界なら、必ず
>
$$
\frac1q=\frac1p-\frac{\alpha}{d}
$$
>
> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

入力の $L^p$ ノルムを変えない伸縮を選びます。核 $|x-y|^{\alpha-d}$ の伸縮で現れる $\lambda^{-\alpha}$ が、出力側の指数を固定します。

<!-- proof-start -->
### 証明

まず $u=\lambda x$、$z=\lambda y$ に置き換えます。$dy=\lambda^{-d}dz$ と $|x-y|=\lambda^{-1}|u-z|$ に注意すると、

$$
\begin{aligned}
I_\alpha f_\lambda(x)
&=c_{d,\alpha}\int |x-y|^{\alpha-d}
\lambda^{d/p}f(\lambda y)\,dy\\
&=c_{d,\alpha}\lambda^{d/p}
\lambda^{d-\alpha}\lambda^{-d}
\int |u-z|^{\alpha-d}f(z)\,dz\\
&=\lambda^{d/p-\alpha}I_\alpha f(\lambda x).
\end{aligned}
$$

同じ変数変換から $\|f_\lambda\|_p=\|f\|_p$、さらに

$$
\|I_\alpha f_\lambda\|_q
=\lambda^{d/p-\alpha-d/q}\|I_\alpha f\|_q.
$$

もし有界性 $\|I_\alpha f_\lambda\|_q\le C\|f_\lambda\|_p$ が全 $\lambda>0$ に成り立てば、非零で両ノルム有限の $f$ を一つ固定して $\lambda\to0$ と $\lambda\to\infty$ の両方を考えられます。指数 $d/p-\alpha-d/q$ が正なら $\lambda\to\infty$、負なら $\lambda\to0$ で左辺が発散します。したがって指数は零です。
<!-- proof-end -->

特に有限の $q$ で改善が起きるなら $1/p>\alpha/d$、すなわち $p<d/\alpha$ が必要です。しかし尺度だけでは**この指数で実際に不等式が成立すること**は分かりません。そのための評価を組み立てます。

## 2. 近い点は最大関数、遠い点は全体のノルム

固定した $x$ を中心に、積分を半径 $r>0$ の球の内外へ分けます。近方では $f$ を各球で平均した大きさが使えます。遠方では核が減衰するため、Hölderの不等式で全体の $L^p$ ノルムを使えます。

<a id="lem-ha7-hedberg"></a>
<!-- formal-statement-start -->
> **補題（Hedberg型の点ごと評価）**  
> $0<\alpha<d$、$f\in L^p(\mathbb R^d)$ とする。$1<p<d/\alpha$ の場合、ほとんどすべての $x$ とすべての $r>0$ について
>
$$
|I_\alpha f(x)|
\le C_{d,\alpha}\,r^\alpha Mf(x)
+C_{d,\alpha,p}\,r^{\alpha-d/p}\|f\|_p.
$$
>
> が成り立つ。$p=1$ の場合は遠方項を
>
$$
C_{d,\alpha}\,r^{\alpha-d}\|f\|_1
$$
>
> に置き換えた評価が成り立つ。とくに $1\le p<d/\alpha$ なら
>
$$
|I_\alpha f(x)|
\le C_{d,\alpha,p}
\bigl(Mf(x)\bigr)^{1-\alpha p/d}
\|f\|_p^{\alpha p/d}
$$
>
> がほとんどすべての点で成立する。
<!-- formal-statement-end -->

### 証明の見取り図

近方を二進環帯に切り、各環帯の質量を[最大作用素の定義](../HA1/index.md#def-ha1-centered-maximal)で抑えます。遠方は $p>1$ なら核の $L^{p'}$ 可積分性を使います。近方項は半径を大きくすると増え、遠方項は減るので、二つが同程度になる半径を選びます。

<!-- proof-start -->
### 証明

すべての積分をまず絶対値を取って評価します。$p\ge1$ で $f$ は局所可積分です。また $p=1$ の場合は[最大作用素の弱型評価](../HA1/index.md#thm-ha1-weak11)、$p>1$ の場合は[強型評価](../HA2/index.md#cor-ha2-maximal-strong)により、$Mf(x)<\infty$ となる点をほとんど至る所で選べます。

**近方。** $A_k=\{y:2^{-k-1}r\le|x-y|<2^{-k}r\}$ とおく。$\alpha-d<0$ なので $A_k$ 上では

$$
|x-y|^{\alpha-d}
\le(2^{-k-1}r)^{\alpha-d}.
$$

他方、球の平均の定義から

$$
\int_{A_k}|f(y)|\,dy
\le\int_{B(x,2^{-k}r)}|f(y)|\,dy
\le v_d(2^{-k}r)^d Mf(x).
$$

両式を掛けて $k\ge0$ にわたって足すと、

$$
\begin{aligned}
c_{d,\alpha}\int_{|x-y|<r}
|x-y|^{\alpha-d}|f(y)|\,dy
&\le c_{d,\alpha}2^{d-\alpha}v_d
r^\alpha Mf(x)\sum_{k=0}^\infty2^{-k\alpha}\\
&=\frac{c_{d,\alpha}2^{d-\alpha}v_d}
{1-2^{-\alpha}}r^\alpha Mf(x).
\end{aligned}
$$

ここで $\alpha>0$ だから等比級数が収束します。

**遠方（$p>1$）。** $p'=p/(p-1)$ とし、[Hölderの不等式](../../F0/F0-00D2D/index.md#thm-f0-00d2d-01)を核と $f$ に適用します。核の $p'$ 乗積分は

$$
\begin{aligned}
\int_{|z|\ge r}|z|^{(\alpha-d)p'}\,dz
&=|S^{d-1}|\int_r^\infty
t^{(\alpha-d)p'+d-1}\,dt\\
&=\frac{|S^{d-1}|}{(d-\alpha)p'-d}
r^{(\alpha-d)p'+d}.
\end{aligned}
$$

分母が正なのは $(d-\alpha)p'>d$、つまり $p<d/\alpha$ のときに限ります。$p'$ 乗根を取れば

$$
c_{d,\alpha}\int_{|x-y|\ge r}
|x-y|^{\alpha-d}|f(y)|\,dy
\le C_{d,\alpha,p}\|f\|_p r^{\alpha-d/p}.
$$

**遠方（$p=1$）。** $|x-y|\ge r$ 上では核が $r^{\alpha-d}$ 以下です。したがって

$$
c_{d,\alpha}\int_{|x-y|\ge r}
|x-y|^{\alpha-d}|f(y)|\,dy
\le c_{d,\alpha}r^{\alpha-d}\|f\|_1.
$$

いずれの場合も近方と遠方が有限であり、ポテンシャルはほとんど至る所で絶対収束します。

**半径の選択。** $f$ が零関数なら結論は自明です。そうでなければ $\|f\|_p>0$ で、$Mf(x)$ が有限かつ正の点で

$$
r=\left(\frac{\|f\|_p}{Mf(x)}\right)^{p/d}>0
$$

を選びます。$p=1$ の式にも同じ選択を使えます。近方項には

$$
r^\alpha Mf(x)
=\|f\|_p^{\alpha p/d}
(Mf(x))^{1-\alpha p/d}
$$

が現れ、遠方項にも

$$
r^{\alpha-d/p}\|f\|_p
=\|f\|_p^{\alpha p/d}
(Mf(x))^{1-\alpha p/d}
$$

が現れます。両項を足して結論を得ます。なお $Mf(x)=0$ ならその点中心のすべての球で $|f|$ の積分が零であり、$f=0$ がほとんど至る所で成り立つので、非零の $f$ ではこの場合は起こりません。
<!-- proof-end -->

この点ごとの不等式こそ指数改善の仕組みです。小さい尺度では平均が支配し、大きい尺度では積分可能性が支配します。両方が必要であり、片方の推定だけではHLSは得られません。

## 3. 強型HLSと指数改善

<a id="thm-ha7-hls"></a>
<!-- formal-statement-start -->
> **定理（Hardy–Littlewood–Sobolev不等式）**  
> $d\ge1$、$0<\alpha<d$、$1<p<d/\alpha$ とし、$q$ を
>
$$
\frac1q=\frac1p-\frac{\alpha}{d}
\qquad\left(q=\frac{dp}{d-\alpha p}\right)
$$
>
> で定める。このとき $I_\alpha$ は $L^p(\mathbb R^d)$ から $L^q(\mathbb R^d)$ への有界線形作用素で、$f\in L^p$ に対して
>
$$
\|I_\alpha f\|_q\le C_{d,\alpha,p}\|f\|_p
$$
>
> が成立する。定数は $f$ に依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

[Hedberg型評価](#lem-ha7-hedberg)を $q$ 乗すると、最大関数の指数がちょうど $p$ になります。そのため、[最大作用素の強型 $(p,p)$ 評価](../HA2/index.md#cor-ha2-maximal-strong)を一回だけ適用すれば足ります。

<!-- proof-start -->
### 証明

$p<d/\alpha$ なので $1-\alpha p/d>0$、$q>p$ は有限です。[Hedberg型評価](#lem-ha7-hedberg)で $\theta=\alpha p/d$ と置けば

$$
|I_\alpha f(x)|^q
\le C_{d,\alpha,p}^{\,q}
(Mf(x))^{(1-\theta)q}\|f\|_p^{\theta q}.
$$

指数は定理の $q=dp/(d-\alpha p)$ を代入して

$$
(1-\theta)q
=\left(1-\frac{\alpha p}{d}\right)
\frac{dp}{d-\alpha p}=p
$$

です。両辺を積分すると

$$
\|I_\alpha f\|_q^q
\le C_{d,\alpha,p}^{\,q}
\|f\|_p^{\theta q}\|Mf\|_p^p.
$$

ここで[最大作用素の強型評価](../HA2/index.md#cor-ha2-maximal-strong)は $p>1$ のとき $\|Mf\|_p\le A_{d,p}\|f\|_p$ を保証します。したがって

$$
\|I_\alpha f\|_q^q
\le C_{d,\alpha,p}^{\,q}A_{d,p}^{\,p}
\|f\|_p^{\theta q+p}.
$$

最後の指数は $\theta q+p=q$ です。実際 $p=(1-\theta)q$ であるためです。$q$ 乗根を取れば目標の不等式を得ます。絶対収束は[補題](#lem-ha7-hedberg)ですでに確認しており、積分の線形性から $I_\alpha$ も線形です。
<!-- proof-end -->

**具体的な指数。** $d=3$、$\alpha=1$、$p=2$ とすると $1/q=1/2-1/3=1/6$、したがって $I_1:L^2(\mathbb R^3)\to L^6(\mathbb R^3)$ です。$d=3$、$\alpha=2$、$p=6/5$ なら $1/q=5/6-2/3=1/6$、したがって $I_2:L^{6/5}\to L^6$ です。この計算は「次数 $\alpha$ を増すと積分指数がどう変わるか」を定量化しています。

双線形積分の形は、エネルギー型の積分評価にも便利です。

<a id="cor-ha7-bilinear"></a>
<!-- formal-statement-start -->
> **系（双線形形のHLS）**  
> $0<\alpha<d$、$1<p<d/\alpha$、$1/q=1/p-\alpha/d$ とする。$r=q'$（すなわち $1/p+1/r=1+\alpha/d$）に対し、$f\in L^p$、$g\in L^r$ なら
>
$$
\left|\iint_{\mathbb R^d\times\mathbb R^d}
\frac{f(y)g(x)}{|x-y|^{d-\alpha}}\,dy\,dx\right|
\le C_{d,\alpha,p}\|f\|_p\|g\|_r.
$$
>
> 左辺の二重積分は絶対収束する。
<!-- formal-statement-end -->

### 証明の見取り図

絶対値を核の内部に入れて $|f|$ のポテンシャルと $|g|$ の積として評価し、出力の指数 $q$ と共役な指数 $q'$ でHölderを適用します。

<!-- proof-start -->
### 証明

非負核に対して[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)を使い、

$$
\iint |x-y|^{\alpha-d}|f(y)||g(x)|\,dy\,dx
=c_{d,\alpha}^{-1}\int (I_\alpha|f|)(x)|g(x)|\,dx.
$$

[Hölderの不等式](../../F0/F0-00D2D/index.md#thm-f0-00d2d-01)の指数 $(q,r)$ は $1/q+1/r=1$ を満たします。[HLS定理](#thm-ha7-hls)と合わせて

$$
\begin{aligned}
\int (I_\alpha|f|)|g|
&\le\|I_\alpha|f|\|_q\|g\|_r\\
&\le C_{d,\alpha,p}\|f\|_p\|g\|_r.
\end{aligned}
$$

右辺が有限なので二重積分も絶対収束します。複素数値の $f,g$ に対しては三角不等式で元の積分を評価します。
<!-- proof-end -->

## 4. $p=1$ では弱型だけが残る

先ほどの証明で $p=1$ を代入しようとしても、[最大作用素は強型 $(1,1)$ ではありません](../HA1/index.md#prop-ha1-no-strong11)。しかし[弱型 $(1,1)$ 評価](../HA1/index.md#thm-ha1-weak11)なら使えます。[HA2の弱型 $(p,q)$ の定義](../HA2/index.md#def-ha2-type)では、出力の超水準集合の測度を閾値の $-q$ 乗で抑えます。ここではその指数を導きます。

<a id="thm-ha7-hls-weak"></a>
<!-- formal-statement-start -->
> **定理（弱型端点のHLS）**  
> $d\ge1$、$0<\alpha<d$、$q_0=d/(d-\alpha)$ とする。任意の $f\in L^1(\mathbb R^d)$ と $t>0$ に対し
>
$$
\bigl|\{x:|I_\alpha f(x)|>t\}\bigr|
\le\left(\frac{C_{d,\alpha}\|f\|_1}{t}\right)^{q_0}.
$$
>
> したがって $I_\alpha$ は弱型 $(1,q_0)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

[補題](#lem-ha7-hedberg)の $p=1$ の場合を用いて $I_\alpha f$ の超水準集合を $Mf$ の超水準集合へ押し込みます。あとは[最大作用素の弱型定理](../HA1/index.md#thm-ha1-weak11)を用いるだけですが、$\|f\|_1$ の指数を最後まで追うことが重要です。

<!-- proof-start -->
### 証明

$f=0$ なら自明なので $\|f\|_1>0$ とします。[Hedberg型評価](#lem-ha7-hedberg)に $p=1$ を入れると

$$
|I_\alpha f(x)|
\le C_{d,\alpha}(Mf(x))^{1-\alpha/d}
\|f\|_1^{\alpha/d}.
$$

この右辺が $t$ を超えるには

$$
Mf(x)>
\left(\frac{t}{C_{d,\alpha}\|f\|_1^{\alpha/d}}\right)^{q_0}
=:s
$$

が必要です。ここで $q_0=d/(d-\alpha)$ なので $(1-\alpha/d)q_0=1$ です。[最大作用素の弱型 $(1,1)$ 評価](../HA1/index.md#thm-ha1-weak11)より

$$
\begin{aligned}
|\{|I_\alpha f|>t\}|
&\le|\{Mf>s\}|\\
&\le\frac{3^d\|f\|_1}{s}\\
&=3^d C_{d,\alpha}^{q_0}
t^{-q_0}\|f\|_1^{1+\alpha q_0/d}\\
&=3^d C_{d,\alpha}^{q_0}
t^{-q_0}\|f\|_1^{q_0}.
\end{aligned}
$$

最後に $1+\alpha q_0/d=1+\alpha/(d-\alpha)=q_0$ を使いました。定数 $3^d$ は定理の $C_{d,\alpha}$ に吸収できます。
<!-- proof-end -->

なぜ弱型で止める必要があるのでしょうか。次の具体例は、強型端点への無条件な置き換えができないことを示します。

<a id="prop-ha7-endpoint-failure"></a>
<!-- formal-statement-start -->
> **命題（端点で成立しない強型評価）**  
> $d\ge1$、$0<\alpha<d$、$q_0=d/(d-\alpha)$ とする。
>
> **（a）** $I_\alpha:L^1\to L^{q_0}$ は有界ではない。
>
> **（b）** $p_c=d/\alpha>1$ に対し、$I_\alpha:L^{p_c}\to L^\infty$ も有界ではない。
<!-- formal-statement-end -->

### 証明の見取り図

（a）では質量1の球指示関数を原点へ集中させます。核の遠方の裾が臨界指数でちょうど対数発散します。（b）では原点の近くでわずかに対数だけ減衰する特異関数を使い、入力の $L^{p_c}$ 積分は収束するが出力は原点近傍でいくらでも大きくなるようにします。

<!-- proof-start -->
### 証明

**（a）** $v_d=|B(0,1)|$ とし、$0<\varepsilon<1/4$ について

$$
f_\varepsilon(y)=\frac{\boldsymbol1_{B(0,\varepsilon)}(y)}
{v_d\varepsilon^d},\qquad \|f_\varepsilon\|_1=1
$$

とおきます。$2\varepsilon<|x|<1$、$|y|<\varepsilon$ なら $|x-y|\le|x|+\varepsilon<3|x|/2$ です。$\alpha-d<0$ に注意すると

$$
I_\alpha f_\varepsilon(x)
\ge c_{d,\alpha}\left(\frac32\right)^{\alpha-d}|x|^{\alpha-d}
=:C_{d,\alpha}|x|^{\alpha-d}.
$$

これを $q_0$ 乗して環帯上で積分します。$(\alpha-d)q_0=-d$ なので

$$
\begin{aligned}
\|I_\alpha f_\varepsilon\|_{q_0}^{q_0}
&\ge C_{d,\alpha}^{q_0}|S^{d-1}|
\int_{2\varepsilon}^1
r^{(\alpha-d)q_0+d-1}\,dr\\
&=C_{d,\alpha}^{q_0}|S^{d-1}|
\log\frac1{2\varepsilon}\longrightarrow\infty.
\end{aligned}
$$

入力ノルムは常に1ですから、一様な強型評価は不可能です。

**（b）** $p_c=d/\alpha>1$ とし、$1/p_c<\beta<1$ を選びます。$0<|y|<1/2$ で

$$
f(y)=|y|^{-\alpha}
\bigl(\log(e/|y|)\bigr)^{-\beta},
$$

それ以外では $f(y)=0$ とします。極座標より

$$
\begin{aligned}
\|f\|_{p_c}^{p_c}
&=|S^{d-1}|\int_0^{1/2}
r^{d-1-\alpha p_c}
\bigl(\log(e/r)\bigr)^{-\beta p_c}\,dr\\
&=|S^{d-1}|\int_0^{1/2}
\frac{dr}{r(\log(e/r))^{\beta p_c}}<\infty,
\end{aligned}
$$

なぜなら $\beta p_c>1$ だからです。一方、$0<|x|<1/8$ とし $2|x|<|y|<1/2$ に制限すると、$|x-y|\le|x|+|y|<3|y|/2$ であるため

$$
\begin{aligned}
I_\alpha f(x)
&\ge C_{d,\alpha}\int_{2|x|<|y|<1/2}
|y|^{\alpha-d}|y|^{-\alpha}
(\log(e/|y|))^{-\beta}\,dy\\
&=C'_{d,\alpha}\int_{2|x|}^{1/2}
\frac{dr}{r(\log(e/r))^\beta}.
\end{aligned}
$$

$u=\log(e/r)$ と置くと最後の積分は

$$
\int_{\log(2e)}^{\log(e/(2|x|))}u^{-\beta}\,du
=\frac{(\log(e/(2|x|)))^{1-\beta}
-(\log(2e))^{1-\beta}}{1-\beta}.
$$

$\beta<1$ より $|x|\to0$ で発散します。したがって出力は原点近くの正測度の集合上で任意に大きく、$L^\infty$ に入りません。
<!-- proof-end -->

これらの例は、単に証明技法が弱いのではなく、**端点では定理そのものが強型として偽になる**ことを示しています。

## 5. Sobolev不等式とNewtonポテンシャル

ポテンシャル推定を方程式に使うには、関数そのものを一階微分から表す公式が役立ちます。まずコンパクト台の滑らかな関数に限定し、境界項が明示的に消える状況で証明します。

<a id="cor-ha7-sobolev"></a>
<!-- formal-statement-start -->
> **系（コンパクト台滑らかな関数のSobolev不等式）**  
> $d\ge2$、$1<p<d$、$p^*=dp/(d-p)$ とする。すべての $u\in C_c^1(\mathbb R^d)$ に対し
>
$$
\|u\|_{p^*}\le C_{d,p}\|\nabla u\|_p
$$
>
> が成り立つ。$p=1$ の場合はここから同じ指数の強型評価を主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

$x$ を固定し、核 $(x-y)/|x-y|^d$ に原点近傍だけ零となる切断関数を掛けます。各座標で部分積分すると、切断が変化する幅 $\varepsilon$ の環帯に $u(x)$ が集中して残ります。得られた表現式を $I_1|\nabla u|$ で抑え、[強型HLS](#thm-ha7-hls)を $\alpha=1$ に適用します。

<!-- proof-start -->
### 証明

固定した $x\in\mathbb R^d$ に対し、$y\ne x$ で

$$
F_x(y)=\frac{x-y}{|x-y|^d}
$$

と置きます。$r=|x-y|$、$z=x-y$ とすると $\partial_{y_j}=-\partial_{z_j}$ なので

$$
\begin{aligned}
\operatorname{div}_yF_x(y)
&=-\sum_{j=1}^d\left(r^{-d}-dz_j^2r^{-d-2}\right)\\
&=-dr^{-d}+d\left(\sum_jz_j^2\right)r^{-d-2}=0
\quad(y\ne x).
\end{aligned}
$$

この等式を特異点 $x$ で直接使わないため、半径 $\varepsilon$ の球を切り除きます。$C^1$ 関数 $\chi:[0,\infty)\to[0,1]$ を

$$
\chi(t)=
\begin{cases}
0,&0\le t\le1,\\
3(t-1)^2-2(t-1)^3,&1<t<2,\\
1,&t\ge2
\end{cases}
$$

と定めます。$\chi'(t)\ge0$、$\int_1^2\chi'(t)\,dt=\chi(2)-\chi(1)=1$ です。$\chi_\varepsilon(y)=\chi(|x-y|/\varepsilon)$ と置けば、$\chi_\varepsilon F_x$ は $x$ の近くで零であり、$u\in C_c^1$ と掛けた各座標成分は無限遠でも零です。

ここでは $u$ がコンパクト台をもち、切断で特異点も避けているため、各座標の被積分関数は絶対可積分です。従って一変数の積分の部分積分を行い、[Fubiniの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)で積分順序を交換して足し合わせると

$$
\begin{aligned}
\int_{\mathbb R^d}\chi_\varepsilon(y)F_x(y)\cdot\nabla u(y)\,dy
&=-\int_{\mathbb R^d}u(y)
\operatorname{div}_y(\chi_\varepsilon F_x)(y)\,dy\\
&=-\int_{\mathbb R^d}u(y)
\nabla_y\chi_\varepsilon(y)\cdot F_x(y)\,dy.
\end{aligned}
$$

二行目では $y\ne x$ における $\operatorname{div}F_x=0$ を使い、$x$ の近くでは切断関数が零なので特異点に問題はありません。$r=|x-y|$ に対し

$$
\nabla_y\chi_\varepsilon(y)
=\frac{\chi'(r/\varepsilon)}{\varepsilon}\frac{y-x}{r},
\qquad
-\nabla_y\chi_\varepsilon(y)\cdot F_x(y)
=\frac{\chi'(r/\varepsilon)}{\varepsilon}r^{1-d}.
$$

したがって右辺は極座標 $y=x+r\omega$ によって

$$
\begin{aligned}
&\int_\varepsilon^{2\varepsilon}
\frac{\chi'(r/\varepsilon)}{\varepsilon}
\left(\int_{S^{d-1}}u(x+r\omega)\,d\omega\right)\,dr\\
&\qquad=\int_1^2\chi'(s)
\left(\int_{S^{d-1}}u(x+\varepsilon s\omega)\,d\omega\right)\,ds.
\end{aligned}
$$

$u$ の連続性と球面上の一様な近づき方から、$\varepsilon\downarrow0$ でこれは

$$
|S^{d-1}|u(x)\int_1^2\chi'(s)\,ds
=|S^{d-1}|u(x)
$$

へ収束します。一方、左辺の切断を外す誤差は、$|\nabla u|\le\|\nabla u\|_\infty$ と $|F_x(y)|=|x-y|^{1-d}$ から

$$
\begin{aligned}
\left|\int (1-\chi_\varepsilon)F_x\cdot\nabla u\,dy\right|
&\le\|\nabla u\|_\infty\int_{|x-y|<2\varepsilon}|x-y|^{1-d}\,dy\\
&=2\varepsilon|S^{d-1}|\|\nabla u\|_\infty\longrightarrow0.
\end{aligned}
$$

以上から、どの整数 $d\ge2$ でも

$$
u(x)=\frac1{|S^{d-1}|}
\int_{\mathbb R^d}
\frac{(x-y)\cdot\nabla u(y)}{|x-y|^d}\,dy
$$

が得られました。この導出は任意の $d\ge2$ で同じ手順です。有限次元ベクトルの内積の基本評価 $|a\cdot b|\le|a||b|$ を積分内で使うと

$$
|u(x)|\le\frac1{|S^{d-1}|}
\int |x-y|^{1-d}|\nabla u(y)|\,dy
=\frac{I_1|\nabla u|(x)}{|S^{d-1}|c_{d,1}}.
$$

$d\ge2$ により $0<1<d$、$1<p<d$ により[HLS定理](#thm-ha7-hls)の指数条件が成立します。$q=p^*=dp/(d-p)$ として

$$
\|u\|_{p^*}
\le\frac{1}{|S^{d-1}|c_{d,1}}
\|I_1|\nabla u|\|_{p^*}
\le C_{d,p}\|\nabla u\|_p
$$

を得ます。$p=1$ では上の議論は[弱型端点](#thm-ha7-hls-weak)までしか与えません。
<!-- proof-end -->

**Newtonポテンシャルとの対応。** $d\ge3$ なら $\alpha=2<d$ です。上で確認した $\Gamma(s+1)=s\Gamma(s)$ と $|S^{d-1}|=2\pi^{d/2}/\Gamma(d/2)$ を順に代入すると

$$
\begin{aligned}
c_{d,2}
&=\frac{\Gamma((d-2)/2)}{4\pi^{d/2}}
=\frac{\Gamma(d/2)}{2(d-2)\pi^{d/2}}\\
&=\frac1{(d-2)|S^{d-1}|}
\end{aligned}
$$

となり、

$$
I_2f(x)=\frac1{(d-2)|S^{d-1}|}
\int_{\mathbb R^d}|x-y|^{2-d}f(y)\,dy
$$

です。$-\Delta$ の点源に対応する理由も核から確認します。$r=|z|>0$ として

$$
G_d(z)=\frac{r^{2-d}}{(d-2)|S^{d-1}|},
\qquad
G_d'(r)=-\frac{r^{1-d}}{|S^{d-1}|}
$$

と置きます。$r=(z_1^2+\cdots+z_d^2)^{1/2}$ なので $\partial_{z_j}r=z_j/r$ です。連鎖律を二度使って

$$
\begin{aligned}
\partial_{z_j}G_d&=G_d'(r)\frac{z_j}{r},\\
\partial_{z_j}^2G_d
&=G_d''(r)\frac{z_j^2}{r^2}
 +G_d'(r)\left(\frac1r-\frac{z_j^2}{r^3}\right).
\end{aligned}
$$

$\sum_jz_j^2=r^2$ を代入して全座標で足すと

$$
\begin{aligned}
\Delta G_d&=G_d''(r)+\frac{d-1}{r}G_d'(r)\\
&=\frac{(d-1)r^{-d}}{|S^{d-1}|}
-\frac{(d-1)r^{-d}}{|S^{d-1}|}=0
\qquad (r>0).
\end{aligned}
$$

となり、原点以外では調和的です。他方、半径 $\varepsilon$ の球面で、中心から外向きに半径 $r$ を増す方向の微分 $\partial_rG_d$ は

$$
-\int_{\partial B(0,\varepsilon)}
\partial_rG_d\,dS
=\frac{\varepsilon^{1-d}}{|S^{d-1}|}
|S^{d-1}|\varepsilon^{d-1}=1
$$

を満たします。すなわち原点を囲む球面を通る $-\nabla G_d$ の流束が1であり、単位点源を表します。

$d=2$ では $\alpha=2=d$ となり本章の $I_\alpha$ の定義域を外れます。形式的な核 $r^{2-d}$ は定数となるため、その法線微分と流束は零です。一方、二次元の対数核

$$
G_2(r)=\frac1{2\pi}\log(1/r)
$$

なら $G_2'(r)=-1/(2\pi r)$ なので、

$$
-\int_{\partial B(0,\varepsilon)}
\partial_rG_2\,dS
=\frac1{2\pi\varepsilon}(2\pi\varepsilon)=1
$$

です。二次元の点源には対数核が必要であり、次元を無視してべき核を代入してはなりません。

## 6. 演習と詳細解答

最初は核と尺度を手で計算し、次に近方・遠方の評価を再構成します。最後は端点の反例と微分からの積分指数改善を組み合わせます。

<a id="ex-ha7-a01"></a>
**演習 HA7-A01（球の指示関数）**  
- Level: A

$d=3$、$\alpha=1$、$f=\boldsymbol1_{B(0,R)}$ とする。$I_1f(0)$ を $R$ と $c_{3,1}$ で表せ。

<!-- solution-start -->
**詳細解答**　[定義](#def-ha7-riesz-potential)に $d=3,\alpha=1$ を代入し、球面積 $|S^2|=4\pi$ を使います。

$$
I_1f(0)
=c_{3,1}4\pi\int_0^R r^{1-3}r^2\,dr
=4\pi c_{3,1}R.
$$

原点近傍の被積分関数は極座標で定数となるため、この値は有限です。
<!-- solution-end -->

<a id="ex-ha7-a02"></a>
**演習 HA7-A02（尺度から指数を出す）**  
- Level: A

$d=5$、$\alpha=2$、$p=2$ に対して、$I_\alpha:L^p\to L^q$ が有界になり得る $q$ を計算し、$p<d/\alpha$ を確認せよ。

<!-- solution-start -->
**詳細解答**　[尺度命題](#prop-ha7-scaling)に従い

$$
\frac1q=\frac12-\frac25=\frac1{10},
\qquad q=10.
$$

また $d/\alpha=5/2$ であり、$p=2<5/2$ です。従って[強型HLS](#thm-ha7-hls)が実際に適用でき、$\|I_2f\|_{10}\le C\|f\|_2$ が成立します。
<!-- solution-end -->

<a id="ex-ha7-a03"></a>
**演習 HA7-A03（近方環帯の和）**  
- Level: A

$\alpha=1$ とし、[Hedberg型補題](#lem-ha7-hedberg)の近方推定で $\sum_{k\ge0}2^{-k\alpha}$ を計算せよ。また $\alpha\downarrow0$ で定数が悪化する理由を答えよ。

<!-- solution-start -->
**詳細解答**　$\alpha=1$ なら等比級数で

$$
\sum_{k=0}^\infty2^{-k}=\frac1{1-1/2}=2.
$$

一般の $\alpha>0$ では $1/(1-2^{-\alpha})$ です。$\alpha\downarrow0$ で $2^{-\alpha}\to1$ となるため分母が零へ近づきます。原点近くの核が $|z|^{-d}$ に近づき、環帯ごとの寄与が幾何級数として減衰しなくなることに対応しています。
<!-- solution-end -->

<a id="ex-ha7-a04"></a>
**演習 HA7-A04（最大関数の指数）**  
- Level: A

$d=4$、$\alpha=1$、$p=2$ とする。[Hedberg型評価](#lem-ha7-hedberg)の最大関数の指数とHLSの出力指数 $q$ を求め、$(1-\alpha p/d)q=p$ を確かめよ。

<!-- solution-start -->
**詳細解答**　$\alpha p/d=1/2$ なので点ごとの評価は

$$
|I_1f|\le C(Mf)^{1/2}\|f\|_2^{1/2}.
$$

また $1/q=1/2-1/4=1/4$ より $q=4$。従って $(1-1/2)\cdot4=2=p$ で、$q$ 乗して積分した最大関数の項がちょうど $\|Mf\|_2^2$ になります。
<!-- solution-end -->

<a id="ex-ha7-a05"></a>
**演習 HA7-A05（二次元Newton核の注意）**  
- Level: A

$d=2$ で $|x|^{2-d}$ を形式的に代入するとどうなるか。$I_2$ を本章の定義に含めてよいか判定せよ。

<!-- solution-start -->
**詳細解答**　$d=2$ なら $|x|^{2-d}=|x|^0=1$ で、$x\ne0$ では定数です。定数関数のLaplace作用は零であり、点源の基本解にはなりません。[Rieszポテンシャルの定義](#def-ha7-riesz-potential)は $0<\alpha<d$ を要求するため $\alpha=2=d$ は除外されます。二次元では対数型基本解が必要です。
<!-- solution-end -->

<a id="ex-ha7-b01"></a>
**演習 HA7-B01（遠方積分の収束境界）**  
- Level: B

$1<p<\infty$ とする。$|z|^{\alpha-d}$ が $\{|z|\ge r\}$ 上で $L^{p'}$ に属する必要十分条件を求めよ。$p=d/\alpha$ では積分がどのように発散するか。

<!-- solution-start -->
**詳細解答**　極座標で

$$
\int_{|z|\ge r}|z|^{(\alpha-d)p'}\,dz
=|S^{d-1}|\int_r^\infty t^{(\alpha-d)p'+d-1}\,dt.
$$

無限遠で $t^s$ が可積分なのは $s<-1$ のときです。したがって

$$
(\alpha-d)p'+d-1<-1
\iff(d-\alpha)p'>d
\iff p<\frac d\alpha.
$$

臨界 $p=d/\alpha$ では $(\alpha-d)p'+d=0$ なので被積分関数は $t^{-1}$ となり、$\int_r^\infty dt/t$ として対数発散します。よって[Hedberg型補題](#lem-ha7-hedberg)の遠方評価は臨界指数でそのまま使えません。
<!-- solution-end -->

<a id="ex-ha7-b02"></a>
**演習 HA7-B02（弱端点の指数を再導出）**  
- Level: B

$|I_\alpha f|\le A(Mf)^{1-\alpha/d}\|f\|_1^{\alpha/d}$ と $|\{Mf>s\}|\le B\|f\|_1/s$ を仮定する。$I_\alpha$ の超水準集合の評価を $t$ と $\|f\|_1$ の指数まで導け。

<!-- solution-start -->
**詳細解答**　$f=0$ は自明なので非零の場合を考えます。$|I_\alpha f|>t$ なら

$$
Mf>\left(\frac t{A\|f\|_1^{\alpha/d}}\right)^{d/(d-\alpha)}=:s.
$$

$q_0=d/(d-\alpha)$ と書けば

$$
\begin{aligned}
|\{|I_\alpha f|>t\}|
&\le|\{Mf>s\}|
\le\frac{B\|f\|_1}{s}\\
&=BA^{q_0}t^{-q_0}\|f\|_1^{1+\alpha q_0/d}\\
&=BA^{q_0}\left(\frac{\|f\|_1}{t}\right)^{q_0}.
\end{aligned}
$$

最後は $1+\alpha q_0/d=q_0$ を計算しました。この手順が[弱型端点定理](#thm-ha7-hls-weak)の核心です。
<!-- solution-end -->

<a id="ex-ha7-b03"></a>
**演習 HA7-B03（双線形指数の確認）**  
- Level: B

$d=3$、$\alpha=1$、$p=3/2$ とし、[双線形HLS](#cor-ha7-bilinear)における $q,r$ を求めよ。また $1/p+1/r=1+\alpha/d$ を直接確認せよ。

<!-- solution-start -->
**詳細解答**　まず

$$
\frac1q=\frac{2}{3}-\frac13=\frac13,
\qquad q=3.
$$

従って $r=q'=3/2$、$1/r=2/3$ です。そのため

$$
\frac1p+\frac1r=\frac23+\frac23=\frac43
=1+\frac13=1+\frac{\alpha}{d}.
$$

入力 $f,g\in L^{3/2}$ について $\iint |x-y|^{-2}|f(y)g(x)|\,dy\,dx\le C\|f\|_{3/2}\|g\|_{3/2}$ が得られます。
<!-- solution-end -->

<a id="ex-ha7-b04"></a>
**演習 HA7-B04（$p=1$ のSobolev評価は何型か）**  
- Level: B

$d\ge2$、$u\in C_c^1(\mathbb R^d)$ とする。[Sobolev表示](#cor-ha7-sobolev)と[弱型端点HLS](#thm-ha7-hls-weak)だけを用いて、$\{|u|>t\}$ の測度を $\|\nabla u\|_1$ で評価せよ。強型結論を追加してはいけない。

<!-- solution-start -->
**詳細解答**　まず本章で導いた積分表示を使います。そこから

$$
|u(x)|\le\frac1{|S^{d-1}|c_{d,1}}I_1|\nabla u|(x)=A_d I_1|\nabla u|(x).
$$

$d\ge2$ なので $0<1<d$ です。[弱型HLS](#thm-ha7-hls-weak)に入力 $f=|\nabla u|\in L^1$ と閾値 $t/A_d$ を入れます。$q_0=d/(d-1)$ として

$$
|\{|u|>t\}|
\le|\{I_1|\nabla u|>t/A_d\}|
\le\left(\frac{C_dA_d\|\nabla u\|_1}{t}\right)^{d/(d-1)}.
$$

これは弱 $L^{d/(d-1)}$ 評価です。強型の $W^{1,1}$ Sobolev不等式は別の議論から証明できますが、このHLS端点の証明だけからは導かれません。
<!-- solution-end -->

<a id="ex-ha7-c01"></a>
**演習 HA7-C01（指数・端点・Newton核の統合）**  
- Level: C

$d=3$ とする。次の問いに順に答えよ。

1. $\alpha=2$、$p=6/5$ に対するHLSの出力指数を求めよ。
2. $f_\varepsilon=\boldsymbol1_{B(0,\varepsilon)}/|B(0,\varepsilon)|$ を入力にして、$I_2:L^1\to L^3$ の一様強型評価が不可能な理由を積分で示せ。
3. $\alpha=1$、$p=2$ のHLSと一階微分の積分表示を合わせ、$u\in C_c^1(\mathbb R^3)$ の $\|u\|_6$ を評価せよ。
4. 二次元で $\alpha=2$ を選べない数学的理由を述べよ。

<!-- solution-start -->
**詳細解答**

**1.** [尺度条件](#prop-ha7-scaling)より

$$
\frac1q=\frac56-\frac23=\frac16,\qquad q=6.
$$

$p=6/5<3/2=d/\alpha$ であり、[強型HLS](#thm-ha7-hls)が適用できます。

**2.** $q_0=d/(d-\alpha)=3$ です。$\varepsilon<1/4$ とし、$2\varepsilon<|x|<1$ では $|x-y|\le3|x|/2$（$|y|<\varepsilon$）なので、負のべき $\alpha-d=-1$ を使って

$$
I_2f_\varepsilon(x)\ge C|x|^{-1}.
$$

したがって

$$
\|I_2f_\varepsilon\|_3^3
\ge C^3 4\pi\int_{2\varepsilon}^1
r^{-3}r^2\,dr
=4\pi C^3\log\frac1{2\varepsilon}\to\infty.
$$

一方 $\|f_\varepsilon\|_1=1$ ですから、入力に依存しない $L^1\to L^3$ 強型定数は存在しません。[弱型端点](#thm-ha7-hls-weak)と矛盾しません。

**3.** $d=3$、$\alpha=1$、$p=2$ なら $q=6$ です。[一階微分の積分表示](#cor-ha7-sobolev)と[強型HLS](#thm-ha7-hls)を順に用いて

$$
|u(x)|\le C I_1|\nabla u|(x),\qquad
\|u\|_6\le C\|I_1|\nabla u|\|_6
\le C'\|\nabla u\|_2.
$$

ここでは $1<p=2<3=d/\alpha$ を確認しており、強型定理を正しく適用できています。

**4.** 二次元では $d=\alpha=2$ は[定義条件](#def-ha7-riesz-potential) $0<\alpha<d$ に反します。形式的な核 $|x|^{2-d}$ は定数になるため点源の基本解を与えず、対数型核が必要です。
<!-- solution-end -->

## 7. 次の周波数局在へ

Rieszポテンシャルの指数改善は、核の次数と空間の次元だけでもかなりの範囲を説明できることを示しました。一方、関数の**どの周波数帯にどれだけの量があるか**を測るには、空間側の近方・遠方分割だけでは足りません。次章HA8では、周波数帯を二進尺度で分け、ほぼ直交性と平方関数を用いて同じ問題を別の角度から調べます。
