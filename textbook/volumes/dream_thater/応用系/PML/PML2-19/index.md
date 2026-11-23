# PML2-19 Neural Operatorの近似定理は何を保証しないか

## 1. 表現できることと、学習して当てられることは別である

[PML2-14の解作用素](../PML2-14/index.md#def-pml2-14-operator)は関数を受け取って関数を返す。[PML2-18のDeepONet](../PML2-18/index.md#def-pml2-18-deeponet)は有限個の入力センサ値と出力位置を組み合わせた。前講の有限次元入力族では、センサ行列の階数が十分なら作用素を厳密に表せた。

しかし入力が無限次元の関数族になると、「有限センサで十分か」「表現する係数は存在するか」「有限訓練データでその係数が得られるか」は別の問いになる。本講では、**入力族のコンパクト性と作用素の連続性があれば、有限センサ型の連続branch/trunk表現で任意精度に近づけられる**ことを構成的に証明する。その後、同じ仮定からは出てこない学習・離散化・外挿の保証を反例で調べる。

一般のNeural Operator近似の研究文献として [Kovachkiほか (2023)](https://www.jmlr.org/papers/v24/21-1524.html)、DeepONetの設計として [Luほか (2021)](https://doi.org/10.1038/s42256-021-00302-5) がある。以下の証明は、これらの研究級定理を丸ごと引用するのではなく、区間の連続関数と有限センサに対象を絞った自前の構成である。

## 2. 何に関して一様に近似するか

区間を $D=[0,1]$ とし、$X=C(D)$ に一様ノルム $\|f\|_\infty=\max_{x\in D}|f(x)|$ を入れる。入力族は空でない集合 $K\subset X$、目標は写像 $\mathcal G:K\to X$ とする。

有限個の入力だけの誤差と、入力族全体の誤差を混同しないために、既習の[個別・訓練・一様誤差](../PML2-14/index.md#def-pml2-14-errors)を使う。ここでの「任意精度」は、**任意の $\varepsilon>0$ に対して一つのモデルを選び、その同じモデルが $K$ のすべての入力で誤差 $\varepsilon$ 未満になる**という量化である。

<a id="def-pml2-19-uniform-density"></a>

<!-- formal-statement-start -->
> **定義（入力族上の一様近似可能性）**  
> 空でない $K\subset C([0,1])$、写像 $\mathcal G:K\to C([0,1])$、モデル族 $\mathscr D$ を取る。各 $\mathcal D\in\mathscr D$ は $K$ から $C([0,1])$ への写像とする。任意の $\varepsilon>0$ に対し、ある $\mathcal D_\varepsilon\in\mathscr D$ が存在し、

$$
\sup_{f\in K}\|\mathcal D_\varepsilon f-\mathcal Gf\|_\infty<\varepsilon
$$

> を満たすとき、$\mathscr D$ は $\mathcal G$ を $K$ 上で**一様に任意精度で近似できる**という。センサ数・出力成分数・パラメータは $\varepsilon$ によって変更してよいが、選んだ後は $f\in K$ に依存させない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml2-19-uniform-density -->
**定義の確認（定数入力とPoisson解）**。$K=\{f_a(t)=a:0\le a\le1\}$、$\mathcal G$ を[零Dirichlet Poisson解作用素](../PML2-14/index.md#thm-pml2-14-green)とする。$-u''=a$ と $u(0)=u(1)=0$ を積分すれば

$$
(\mathcal Gf_a)(y)=\frac{a}{2}y(1-y).
$$

一つのセンサ $s_1=0$、branch $B(v)=v$、trunk $T(y)=y(1-y)/2$ を取ると、$p=1$ の[固定センサ型DeepONet](../PML2-18/index.md#def-pml2-18-deeponet)で全 $a$ に対し厳密一致する。連続性、入力・出力次元、共通センサを満たし、一様誤差は $0$。したがって任意の正の $\varepsilon$ に対して**同じモデル**が使える。
<!-- definition-example-end -->

この例の入力族は一次元である。一般の連続入力には、センサ間の変化を制御する追加条件が必要になる。

## 3. コンパクトな関数族は有限センサから一様に復元できる

距離空間の集合 $K$ が**コンパクト**とは、$K$ の任意の開被覆から有限個で全体を覆うものを選べることをいう。今回の一様ノルム距離では、その結果として任意の $\rho>0$ に対し、有限個の $f_1,\ldots,f_N\in K$ が存在し、すべての $f\in K$ に対して少なくとも一つの $i$ で $\|f-f_i\|_\infty<\rho$ を満たす。これを**有限 $\rho$-網**という。なぜなら各 $f\in K$ を中心とする半径 $\rho$ の開球が $K$ を覆い、コンパクト性で有限部分被覆を取れるからである。

コンパクトな入力族なら、その全関数が小さな区間で**共通に**小さく変化する。これを**一様同程度連続**という。関数ごとに別の刻み幅を選ぶのではなく、全入力に共通の刻み幅を選べる点が重要である。

<a id="def-pml2-19-equicontinuity"></a>

<!-- formal-statement-start -->
> **定義（入力族の一様同程度連続性）**  
> $K\subset C([0,1])$ が一様同程度連続であるとは、任意の $\eta>0$ に対し $h>0$ が存在し、すべての $f\in K$ と $x,z\in[0,1]$ について

$$
|x-z|<h\quad\Longrightarrow\quad |f(x)-f(z)|<\eta
$$

> が成り立つことをいう。$h$ は $\eta$ と $K$ に依存してよいが、$f,x,z$ には依存しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml2-19-equicontinuity -->
**定義の確認**。$K=\{f_a(t)=at:0\le a\le1\}$ なら、$|f_a(x)-f_a(z)|=a|x-z|\le|x-z|$。任意の $\eta>0$ に $h=\eta$ とすれば、条件 $|x-z|<h$ から所望の厳密不等式が成り立つ。一方、$f_n(t)=t^n$（$n\ge1$）全体では $x=1,z=1-1/n$ とすると $|x-z|\to0$ だが $|f_n(x)-f_n(z)|=1-(1-1/n)^n\ge1-e^{-1}$ である。後者には共通の $h$ がない。
<!-- definition-example-end -->

<a id="lem-pml2-19-compact-sensors"></a>

<!-- formal-statement-start -->
> **補題（コンパクト入力族の共通補間誤差）**  
> 空でないコンパクト集合 $K\subset C([0,1])$ を一様ノルムで考える。このとき $K$ は一様同程度連続である。さらに任意の $\eta>0$ に対し、ある整数 $m\ge2$ があり、等間隔センサ $s_j=(j-1)/(m-1)$ から作る[区分線形補間](../PML2-18/index.md#def-pml2-18-interpolant) $I_m$ が

$$
\sup_{f\in K}\|I_mf-f\|_\infty<\eta
$$

> を満たす。
<!-- formal-statement-end -->

**証明の見取り図。** コンパクト性で有限個の代表関数へ近づける。有限個の連続関数には共通の刻み幅を取れる。その刻み幅で補間すれば、各小区間内の端点との差を凸結合で抑えられる。

<!-- proof-start -->
### 証明

まず $\eta>0$ を固定し、半径 $\eta/8$ の有限網 $g_1,\ldots,g_N\in K$ を取る。各 $g_i$ は閉区間上で一様連続である。従って $h_i>0$ が存在し、$|x-z|<h_i$ なら $|g_i(x)-g_i(z)|<\eta/2$。有限個の最小値 $h=\min_i h_i>0$ を取れる。

任意の $f\in K$ に対し $\|f-g_i\|_\infty<\eta/8$ となる $i$ を選ぶ。$|x-z|<h$ なら

$$
\begin{aligned}
|f(x)-f(z)|
&\le |f(x)-g_i(x)|+|g_i(x)-g_i(z)|+|g_i(z)-f(z)|\\
&<\frac{\eta}{8}+\frac{\eta}{2}+\frac{\eta}{8}
=\frac{3\eta}{4}<\eta.
\end{aligned}
$$

これで共通の $h$ が得られた。$m$ を $1/(m-1)<h$ となるように選び、$x\in[s_j,s_{j+1}]$ で $\lambda=(x-s_j)/(s_{j+1}-s_j)$ とする。補間式を引くと

$$
f(x)-(I_mf)(x)
=(1-\lambda)(f(x)-f(s_j))
+\lambda(f(x)-f(s_{j+1})).
$$

$0\le\lambda\le1$、両端との距離は $h$ 未満なので、

$$
|f(x)-(I_mf)(x)|
<(1-\lambda)\eta+\lambda\eta=\eta.
$$

実際には一つ前の三角不等式で $|f(x)-f(s_j)|<3\eta/4$ が一様に成り立つため、補間誤差の上限も $3\eta/4<\eta$ である。すべての $f$ と $x$ に同じ刻み幅と上界が使え、主張が成り立つ。
<!-- proof-end -->

**具体例。** $K=\{at:0\le a\le1\}$ は二つの端点センサで一次補間が厳密なので、$I_2f=f$。これに対し $t^n$ の族では同じ刻み幅で端点近傍の変化を一律に捉えられない。$K$ の仮定の意味がこの差に現れる。

## 4. 連続作用素を有限センサと有限個の出力関数で近似する

[DeepONetの定義](../PML2-18/index.md#def-pml2-18-deeponet)では branch と trunk は連続写像である。ここではその形式の**連続写像を構成**する。有限幅のニューラルネットが学習によってその係数へ到達する、という命題はまだ含めない。

$a_1,\ldots,a_N$ を代表入力とするとき、センサで得た情報に近い代表入力ほど大きい重みを付けて、$\mathcal Ga_i$ を混ぜる。これは入力族の有限網と補間誤差を、出力の一様誤差へつなぐ作り方である。

<a id="thm-pml2-19-compact-approx"></a>

<!-- formal-statement-start -->
> **定理（コンパクト入力族上の連続branch/trunk一様近似）**  
> $K$ を空でない $C([0,1])$ のコンパクト部分集合（一様ノルム）、$\mathcal G:K\to C([0,1])$ を一様ノルムについて連続な写像とする。任意の $\varepsilon>0$ に対し、有限個の等間隔入力センサと、連続な $B:\mathbb R^m\to\mathbb R^p$、$T:[0,1]\to\mathbb R^p$ が存在し、$c=0$ の固定センサ型DeepONet

$$
(\mathcal Df)(y)=\sum_{i=1}^{p}B_i(S_mf)T_i(y)
$$

> が

$$
\sup_{f\in K}\|\mathcal Df-\mathcal Gf\|_\infty<\varepsilon
$$

> を満たす。$m,p$ は $\varepsilon,K,\mathcal G$ に依存してよい。この結論は連続branch/trunkの**存在**であり、有限標本からの推定誤差、勾配法の収束、格子幅に関する速度を含まない。
<!-- formal-statement-end -->

**証明の見取り図。** コンパクト集合上の連続写像は一様連続である。そこで近い二つの入力を $\mathcal G$ に入れれば出力も近いという距離 $\delta$ を先に選ぶ。センサ補間と有限 $\delta/8$-網を併用し、センサ値から計算できる連続な重みを作る。各重みが正の代表入力は必ず元の入力から $\delta$ 未満に収まる。

<!-- proof-start -->
### 証明

**(1) 共通の出力変動幅と入力代表を取る。** $\mathcal G$ はコンパクト集合 $K$ 上で連続なので一様連続である。したがって $\varepsilon>0$ に対し $\delta>0$ が存在し、任意の $f,g\in K$ について

$$
\|f-g\|_\infty<\delta
\quad\Longrightarrow\quad
\|\mathcal Gf-\mathcal Gg\|_\infty<\varepsilon/2.
$$

一様連続性は例えば、これを否定した二列 $f_n,g_n\in K$ で $\|f_n-g_n\|_\infty\to0$ とし、$K$ のコンパクト性で $f_{n_k}\to f\in K$ を選べば、$g_{n_k}\to f$ となり $\mathcal G$ の連続性に矛盾することからも分かる。

有限 $\delta/8$-網 $a_1,\ldots,a_p\in K$ を選ぶ。前補題を $\eta=\delta/8$ に適用し、ある $m$ について

$$
\|I_m f-f\|_\infty<\delta/8\quad(f\in K)
$$

とする。任意のセンサベクトル $v\in\mathbb R^m$ に対し、センサ位置で $v_j$ を取る連続区分線形関数 $L_m(v)$ を定める。$L_m(S_mf)=I_mf$ である。

**(2) branchを全センサ空間で定義する。** $v\in\mathbb R^m$ に対し

$$
d_i(v)=\|L_m(v)-a_i\|_\infty,\quad
q_i(v)=\max\{0,\delta/2-d_i(v)\},\quad
Q(v)=\sum_{j=1}^{p}q_j(v)
$$

と置き、

$$
B_i(v)=\frac{q_i(v)}{\max\{Q(v),\,\delta/8\}},
\qquad T_i(y)=(\mathcal Ga_i)(y)
$$

と定める。分母は常に正である。$L_m$ はセンサベクトルについて連続であり、ノルム、正部分、和、最大値も連続なので $B$ は $\mathbb R^m$ 全体で連続である。$T_i$ は $\mathcal Ga_i\in C([0,1])$ だから連続で、[固定センサ型DeepONet](../PML2-18/index.md#def-pml2-18-deeponet)の条件を満たす。

**(3) $K$ 上では重みの和が1となる。** $f\in K$ を固定し、$\|f-a_i\|_\infty<\delta/8$ となる代表 $a_i$ を選ぶ。この代表について

$$
d_i(S_mf)
\le\|I_mf-f\|_\infty+\|f-a_i\|_\infty
<\frac{\delta}{4}.
$$

ゆえに $q_i(S_mf)>\delta/4$ なので $Q(S_mf)>\delta/4>\delta/8$。従って

$$
B_i(S_mf)\ge0,\qquad \sum_{i=1}^{p}B_i(S_mf)=1.
$$

**(4) 正の重みを持つ出力を評価する。** $B_i(S_mf)>0$ なら $q_i(S_mf)>0$、すなわち $d_i(S_mf)<\delta/2$。これと補間誤差から

$$
\|f-a_i\|_\infty
\le\|f-I_mf\|_\infty+d_i(S_mf)
<\frac{\delta}{8}+\frac{\delta}{2}<\delta.
$$

したがって (1) の一様連続性を適用でき、$\|\mathcal Ga_i-\mathcal Gf\|_\infty<\varepsilon/2$。各 $y\in[0,1]$ で

$$
\begin{aligned}
|(\mathcal Df)(y)-(\mathcal Gf)(y)|
&=\left|\sum_i B_i(S_mf)\big((\mathcal Ga_i)(y)-(\mathcal Gf)(y)\big)\right|\\
&\le\sum_i B_i(S_mf)\|\mathcal Ga_i-\mathcal Gf\|_\infty
<\frac{\varepsilon}{2}\sum_iB_i(S_mf)=\frac{\varepsilon}{2}.
\end{aligned}
$$

実際、$\mathcal Df-\mathcal Gf$ の一様ノルムは $\varepsilon/2$ 以下である。$\delta,m,p$ はすべて $f$ に依存せず選んだので、$K$ 上で上限を取っても $\varepsilon/2<\varepsilon$ が保たれ、結論を得る。
<!-- proof-end -->

**得られた保証。** コンパクトな入力族と連続作用素を**指定して初めて**、必要に応じてセンサ数とbranch/trunkの複雑さを増やす存在主張が成り立つ。一つの固定センサ数や固定幅で全精度を保証するわけではない。上の $B_i$ は明示的な連続関数であって、有限層ニューラルネットの具体的な重み列ではない。有限次元のニューラルネットへ置き換えるには、branchの関連するコンパクトなセンサ値集合とtrunkの区間上での**別途の近似定理**およびその近似誤差の積の評価が必要である。さらにそれらを学習する最適化の成功は別問題である。

## 5. 入力族を無制限に広げると同じ定理は使えない

一様ノルムが $1$ 以下のすべての連続入力からなる単位球を考える。この族には、任意の有限センサが見逃す細い山型関数が入る。[センサで区別できない入力](../PML2-14/index.md#thm-pml2-14-sensor-limit)を今度は恒等作用素に適用すると、近似が一様に改善しないことが数値で分かる。

<a id="prop-pml2-19-sensor-lower-bound"></a>

<!-- formal-statement-start -->
> **命題（連続関数の単位球での有限センサ下界）**  
> $K_1=\{f\in C([0,1]):\|f\|_\infty\le1\}$ とし、$\mathcal Gf=f$（恒等作用素）とする。任意の有限個の入力センサ $s_1,\ldots,s_m\in[0,1]$ およびそのセンサ値にだけ依存する任意のモデル $\mathcal D:K_1\to C([0,1])$ について

$$
\sup_{f\in K_1}\|\mathcal Df-f\|_\infty\ge1
$$

> が成り立つ。センサ数を任意の有限値に増やしても、$K_1$ 上の一様誤差の下界は変わらない。
<!-- formal-statement-end -->

**証明の見取り図。** センサのない開区間に高さ1の山型関数を置く。正負二つの山はすべて同じセンサ値を持つが、出力としての距離は2である。

<!-- proof-start -->
### 証明

有限集合 $\{s_1,\ldots,s_m\}$ に属さない点 $c\in(0,1)$ を取り、センサを含まない閉区間 $[c-r,c+r]\subset(0,1)$ を選ぶ。例えば

$$
h(t)=\max\left\{0,1-\frac{|t-c|}{r}\right\}
$$

と置けば $h$ は連続で $\|h\|_\infty=1$、すべてのセンサで $h(s_i)=0$ である。$h,-h\in K_1$ で観測ベクトルはどちらも零なので、センサ依存モデルの出力は同じ $v=\mathcal Dh=\mathcal D(-h)$ となる。一方、

$$
2=\|h-(-h)\|_\infty
\le\|h-v\|_\infty+\|v-(-h)\|_\infty.
$$

二つの誤差の少なくとも片方は $1$ 以上である。これはセンサ数 $m$ に依存しない。従って主張が成り立つ。
<!-- proof-end -->

**失われた仮定。** 単位球 $K_1$ は上の山をどんどん細くできるため共通の変動幅を持たず、コンパクトでない。目標の恒等作用素自体は連続である。失敗は作用素の不連続性ではなく、入力族を有限センサで一様に制御できないところにある。

## 6. 訓練入力で誤差ゼロでも、未見入力の誤差は大きくできる

次は入力族が**コンパクトでも**起こる。定数入力 $f_a(t)=a$、$0\le a\le1$ の集合で、目標を恒等作用素 $\mathcal Gf_a=f_a$ とする。訓練入力が $f_0,f_1$ だけなら、次の連続branch/trunk模型は両方に厳密一致する。

<a id="prop-pml2-19-training-gap"></a>

<!-- formal-statement-start -->
> **命題（二つの訓練入力は一様誤差を制御しない）**  
> $K=\{f_a(t)=a:0\le a\le1\}$、$\mathcal Gf_a=f_a$ とし、センサ $s_1=0$ を使う。任意の $M>0$ に対し $p=1$ の連続branch/trunk模型

$$
(\mathcal D_Mf_a)(y)=a+Ma(1-a)
$$

> が存在する。この模型は訓練入力 $f_0,f_1$ で誤差が零であるが、$f_{1/2}$ では一様誤差が $M/4$ となる。
<!-- formal-statement-end -->

**証明の見取り図。** 一次元センサ値 $a$ に、端点で零かつ内部で正となる項を付け足すだけでよい。

<!-- proof-start -->
### 証明

branch を $B(v)=v+Mv(1-v)$、trunk を $T(y)=1$、定数項 $c=0$ と取る。どちらも連続で、センサ入力は $S_1f_a=a$ だから定義式は表示したものになる。$a=0,1$ では $a(1-a)=0$ なので、$\mathcal D_Mf_a=\mathcal Gf_a$。一方 $a=1/2$ では

$$
(\mathcal D_Mf_{1/2})(y)-(\mathcal Gf_{1/2})(y)
=M\cdot\frac12\left(1-\frac12\right)=\frac{M}{4}
$$

がすべての $y$ で成り立つ。よって一様誤差は $M/4$。
<!-- proof-end -->

このモデルには出力位置による複雑ささえない。有限サンプルでの学習損失が零という事実は、未見の入力族上の一様誤差を直接は押さえない。[入力被覆とモデルのLipschitz性による既習の評価](../PML2-14/index.md#thm-pml2-14-cover)では、逆に**入力被覆半径とモデルの変動の上界**を補うと未見入力を評価できる。上の $M$ を大きくするとモデルの入力依存性も急になるため、二点からの外挿誤差が増える。

## 7. 出力格子の一致も関数全体の一致ではない

訓練で測る出力点を $y_1,\ldots,y_Q$ に固定すると、それ以外の点を学習器が外すこともある。例えば目標 $\mathcal Gf=0$、入力族 $K=\{0\}$ とし、センサへの依存を持たない模型

$$
(\mathcal Df)(y)=A\prod_{j=1}^{Q}(y-y_j)
$$

を考える。trunkを右辺の多項式、branchを定数 $1$ とすれば連続branch/trunk型である。すべての観測点 $y_j$ で出力は零だが、多項式は恒等的な零関数ではない。$A$ の絶対値を増やせば観測点以外の誤差はいくらでも大きくなる。**出力側に未観測領域がある**という失敗機構は、前節の未見入力の問題と別である。

一方、連続な出力関数の族に共通のLipschitz定数 $L_{\rm out}$ があるなら、任意の出力点 $y$ を最近傍の観測点 $y_j$（距離 $\le h_y$）へ結んで

$$
|(\mathcal Df)(y)-(\mathcal Gf)(y)|
\le |(\mathcal Df)(y)-(\mathcal Df)(y_j)|
+|(\mathcal Df)(y_j)-(\mathcal Gf)(y_j)|
+|(\mathcal Gf)(y_j)-(\mathcal Gf)(y)|
\le E_{\rm grid}+2L_{\rm out}h_y
$$

と抑えられる。ここで両方の出力が**同じ** $L_{\rm out}$-Lipschitz条件を満たすことが必要で、モデルの出力側の正則性を仮定せずに $Q$ だけ増やしてもこの評価は出ない。

[FNOの格子変更とモデル誤差の分解](../PML2-17/index.md#prop-pml2-17-error-split)では、同じ重みを別の格子へ移す設計と精度を分離した。Neural Operator全般でも入力のセンサ間誤差、出力の問い合わせ点間誤差、演算子近似誤差、学習・統計誤差を別々に評価する。

## 8. 定理を数値解析・実学習へ持ち込む際の境界

コンパクト入力族上の近似定理の結論は **「任意の $\varepsilon$ に対する適切な有限表現が存在する」** という存在命題である。次はそれぞれ追加の条件と証明・実験を必要とする。

- **固定した予算での誤差速度**：定理の $m,p$ は選び直せる。$\varepsilon$ に対する具体的なサイズや計算量は出ない。
- **有限層NNによる実現**：今回構成したbranch/trunkは連続関数である。指定活性化関数・ネットワーク構造での近似能力を追加で確認する必要がある。
- **有限訓練データでの汎化**：目標作用素の連続性だけでは、入力分布、学習器の変動の上界、標本数、最適化結果について何も保証しない。
- **解像度変更や領域外への外挿**：訓練とは異なるセンサ配置や入力族を選ぶと、同じモデルを適用しても本定理の条件外になることがある。
- **PDEの正しさ**：作用素近似誤差が小さいことと、PDE残差・境界条件・保存量が要求値を満たすことは同じではない。必要なら[Poisson解作用素の安定性](../PML2-14/index.md#thm-pml2-14-green)などを仮定とともに適用する。

例えば $K$ が一様に $L$-Lipschitzで、目標がPoisson解作用素なら[センサ補間誤差の定理](../PML2-18/index.md#thm-pml2-18-interpolation-bound)から、等間隔幅 $h$ で

$$
\|\mathcal Gf-\mathcal G(I_mf)\|_\infty\le\frac{Lh}{16}
$$

が具体的に得られる。ここへモデルが補間入力を解くときの誤差を加えて初めて総合誤差になる。**存在定理の仮定を検算する作業と、実モデルの性能評価を混ぜない**ことがこの講義の結論である。

## 9. 演習と詳細解答

### Level A：量化・センサ・反例を読む

<a id="ex-pml2-19-a01"></a>

**問題 PML2-19-A01**
- Level: A
- $K=\{f_a(t)=a:0\le a\le1\}$、$\mathcal Gf_a(y)=a\,y(1-y)$ とする。一点センサ $s_1=0$、$B(v)=v$、$T(y)=y(1-y)$ の一成分モデルについて、$\sup_{f\in K}\|\mathcal Df-\mathcal Gf\|_\infty$ を求め、一様近似可能性の定義と照合せよ。

<!-- solution-start -->
**詳細解答。** $S_1f_a=f_a(0)=a$。モデルの定義から $(\mathcal Df_a)(y)=B(a)T(y)=a\,y(1-y)=(\mathcal Gf_a)(y)$ であり、各 $a,y$ の差は零。従って一様ノルムを取っても $0$、$a\in[0,1]$ について上限を取っても $0$ である。任意の $\varepsilon>0$ に同一モデルを選べば $0<\varepsilon$ が成立し、定義を満たす。
<!-- solution-end -->

<a id="ex-pml2-19-a02"></a>

**問題 PML2-19-A02**
- Level: A
- $K=\{f_a(t)=at^2:0\le a\le2\}$ が一様同程度連続であることを、明示的な $h(\eta)>0$ を使って示せ。また端点センサ $0,1$ の区分線形補間 $I_2$ について、$\|f_a-I_2f_a\|_\infty$ を求めよ。

<!-- solution-start -->
**詳細解答。** $x,z\in[0,1]$ について $|x^2-z^2|=|x-z||x+z|\le2|x-z|$ だから、$|f_a(x)-f_a(z)|\le4|x-z|$。任意の $\eta>0$ に $h=\eta/4$ を取れば $|x-z|<h$ のとき差は $\eta$ 未満であり、$a$ に依存しない。端点値は $f_a(0)=0,f_a(1)=a$ なので $(I_2f_a)(t)=at$。差は $a(t^2-t)$ で、$0\le t\le1$ では $|t^2-t|=t(1-t)=1/4-(t-1/2)^2$ の最大は $1/4$。よって $\|f_a-I_2f_a\|_\infty=a/4$、入力族全体では最大 $1/2$。
<!-- solution-end -->

<a id="ex-pml2-19-a03"></a>

**問題 PML2-19-A03**
- Level: A
- 入力センサを $0,1/2,1$ とする。区間 $(0,1/2)$ に台を持ち、高さ1の連続山型関数 $h$ を具体式で作り、$h,-h$ と恒等作用素を用いて最悪誤差の下界を示せ。

<!-- solution-start -->
**詳細解答。** $c=1/4,r=1/8$ とし $h(t)=\max\{0,1-8|t-1/4|\}$ と置く。$h$ は連続、$h(1/4)=1$、台は $[1/8,3/8]$、指定した全センサで $h=0$ だから $\|h\|_\infty=1$。$h,-h$ はともに単位球内で観測が等しい。任意のセンサ依存モデルの共通出力を $v$ とすると、三角不等式から $2=\|h-(-h)\|_\infty\le\|h-v\|_\infty+\|v+h\|_\infty$。少なくとも片方が $1$ 以上となる。山を具体化しても第5節の下界と一致する。
<!-- solution-end -->

<a id="ex-pml2-19-a04"></a>

**問題 PML2-19-A04**
- Level: A
- 定数入力族 $f_a=a$ で $M=8$ の第6節の模型を使う。訓練点 $a=0,1$ と未見点 $a=1/4,1/2$ における出力一様誤差を求め、訓練誤差が零という情報から言える範囲を述べよ。

<!-- solution-start -->
**詳細解答。** 真値は $a$、モデルは $a+8a(1-a)$ だから差の一様ノルムは $8a(1-a)$。$a=0,1$ では零、$a=1/4$ では $8\cdot(1/4)\cdot(3/4)=3/2$、$a=1/2$ では $8\cdot(1/2)^2=2$。従って訓練誤差が零でも未見入力では正の誤差が生じる。訓練データが保証するのは、評価した二つの入力についてのみである。
<!-- solution-end -->

### Level B：一様性の証明と失敗の条件

<a id="ex-pml2-19-b01"></a>

**問題 PML2-19-B01**
- Level: B
- $K=\{f_{a,b}(t)=a+bt:|a|\le1,\ |b|\le2\}$ とする。$K$ がコンパクトかつ一様同程度連続である理由を示し、二端点の補間が厳密になることを確かめよ。さらに $\mathcal Gf$ を零Dirichlet Poisson解としたとき、出力を厳密に作る一成分または二成分のbranch/trunk式を与えよ。

<!-- solution-start -->
**詳細解答。** パラメータ集合 $[-1,1]\times[-2,2]$ はコンパクトで、写像 $(a,b)\mapsto(t\mapsto a+bt)$ は $\|f_{a,b}-f_{a',b'}\|_\infty\le|a-a'|+|b-b'|$ により連続である。その像 $K$ もコンパクトである。また $|f_{a,b}(x)-f_{a,b}(z)|=|b||x-z|\le2|x-z|$ だから $h=\eta/2$ が共通の変動幅を与える。端点値は $(a,a+b)$ で区分線形補間は $(1-t)a+t(a+b)=a+bt$ と元に一致する。

[既習のPoisson解の構成](../PML2-18/index.md#thm-pml2-18-sensor-rank)で、$-u''=a+bt$ の解は $a\,y(1-y)/2+b(y-y^3)/6$。センサ値 $v_1=a,v_2=a+b$ を使えば $B(v_1,v_2)=(v_1,v_2-v_1)$、$T(y)=(y(1-y)/2,(y-y^3)/6)$ とすればよい。両写像は連続で全 $f\in K$ に厳密一致する。
<!-- solution-end -->

<a id="ex-pml2-19-b02"></a>

**問題 PML2-19-B02**
- Level: B
- 第4節の定理の証明で、$\delta>0$、$\delta/8$-網、補間誤差 $\delta/8$、$q_i(v)=\max\{0,\delta/2-d_i(v)\}$ を用いる。$f\in K$ について (i) $Q(S_mf)>\delta/4$、(ii) $B_i(S_mf)>0$ のとき $\|f-a_i\|_\infty<5\delta/8$ を、必要な中間式を記して導け。

<!-- solution-start -->
**詳細解答。** 有限網の定義から $\|f-a_j\|_\infty<\delta/8$ となる $j$ が存在する。$L_m(S_mf)=I_mf$ より

$$
d_j(S_mf)=\|I_mf-a_j\|_\infty
\le\|I_mf-f\|_\infty+\|f-a_j\|_\infty
<\delta/4.
$$

ゆえに $q_j(S_mf)=\delta/2-d_j(S_mf)>\delta/4$、非負の和は $Q(S_mf)\ge q_j(S_mf)>\delta/4$。次に $B_i(S_mf)>0$ なら分母が正だから $q_i(S_mf)>0$。従って $d_i(S_mf)<\delta/2$ であり、

$$
\|f-a_i\|_\infty
\le\|f-I_mf\|_\infty+\|I_mf-a_i\|_\infty
<\delta/8+\delta/2=5\delta/8.
$$

この最後の上界が $\delta$ 未満なので、出力の一様連続性を適用する条件が満たされる。
<!-- solution-end -->

<a id="ex-pml2-19-b03"></a>

**問題 PML2-19-B03**
- Level: B
- 出力の教師点を $y_1=0,y_2=1$ とする。真の作用素は任意の入力に対して零関数を返すとし、$p=1$、branch $B(v)=1$、trunk $T(y)=A\,y(1-y)$ を使う。教師点誤差と全区間の最大誤差を計算し、追加でどのような出力側条件を置けば格子点誤差を拡張できるか説明せよ。

<!-- solution-start -->
**詳細解答。** $T(0)=T(1)=0$ だから両教師点でモデルも零で、教師点誤差は零である。一方 $y(1-y)=1/4-(y-1/2)^2$ なので、全区間の一様誤差は $|A|/4$。$A$ は任意だから教師点上での零誤差から一様誤差の上界は出ない。例えば真値と予測値がともに共通の $L_{\rm out}$-Lipschitz条件を満たし、任意の出力点と最近傍教師点の距離が $h_y$ 以下なら、三角不等式で一様誤差 $\le E_{\rm grid}+2L_{\rm out}h_y$ が導ける。本例は $|T'(y)|=|A(1-2y)|\le|A|$ であり、$A$ と無関係な共通の $L_{\rm out}$ は存在しない。
<!-- solution-end -->

<a id="ex-pml2-19-b04"></a>

**問題 PML2-19-B04**
- Level: B
- $K$ が一様に $L$-Lipschitzな連続入力関数族であり、$\mathcal G$ を零Dirichlet Poisson解作用素とする。等間隔センサ幅 $h$ に対し、モデルがすべての $f\in K$ で $\|\mathcal Df-\mathcal G(I_mf)\|_\infty\le\alpha$ を満たすと仮定する。総合誤差の上界を導き、$\alpha$ が $h$ と独立に正の定数の場合にセンサを増やすだけでは何が保証されないか述べよ。

<!-- solution-start -->
**詳細解答。** $f-I_mf$ の一様ノルムは[区分線形補間の評価](../PML2-18/index.md#thm-pml2-18-interpolation-bound)より $Lh/2$ 以下で、[Poisson解作用素の安定性](../PML2-14/index.md#thm-pml2-14-green)の定数は $1/8$。よって

$$
\|\mathcal Gf-\mathcal G(I_mf)\|_\infty
\le\frac18\|f-I_mf\|_\infty\le\frac{Lh}{16}.
$$

モデルと真値の差を $\mathcal Df-\mathcal G(I_mf)$ と $\mathcal G(I_mf)-\mathcal Gf$ に分け、三角不等式により

$$
\|\mathcal Df-\mathcal Gf\|_\infty
\le\alpha+\frac{Lh}{16}.
$$

$h\to0$ で第二項は零に向かうが、第一項の上界 $\alpha$ は残る。したがってこの仮定だけから総合誤差が零へ収束すると結論できない。
<!-- solution-end -->

### Level C：仮定を突き合わせる統合問題

<a id="ex-pml2-19-c01"></a>

**問題 PML2-19-C01**
- Level: C
- 入力族 $K=\{f_a(t)=a:0\le a\le1\}$ と恒等作用素 $\mathcal Gf=f$ を考える。(1) この入力族がコンパクトであることを証明し、一様近似定理を適用できる条件を確かめよ。(2) 有限訓練入力 $f_0,f_1$ で厳密一致し、$f_{1/2}$ で誤差が $2$ となる連続branch/trunkモデルを作れ。(3) $K$ の中で真値とモデルがともに入力について $L$-Lipschitzであり、訓練入力集合が被覆半径 $\rho$ を持ち、訓練最大誤差が $e_{\rm train}$ であるなら、未見入力の一様誤差を $e_{\rm train}+2L\rho$ 以下に抑えられることを導き、(2) の例では $L$ がどこで大きくなるかを示せ。

<!-- solution-start -->
**詳細解答。**

(1) $a\mapsto f_a$ は $\|f_a-f_b\|_\infty=|a-b|$ を満たす連続写像であり、コンパクト集合 $[0,1]$ の像 $K$ はコンパクト。$\mathcal Gf_a=f_a$ は $K$ 上で $\|\mathcal Gf_a-\mathcal Gf_b\|_\infty=|a-b|$ なので連続。従って[コンパクト入力族上の近似定理](#thm-pml2-19-compact-approx)の仮定が成り立つ。さらにセンサ $s_1=0$、$B(v)=v$、$T(y)=1$ で厳密表現さえできる。

(2) 第6節の $M=8$ を使い、$B(v)=v+8v(1-v)$、$T(y)=1$ とする。$a=0,1$ で誤差零、$a=1/2$ では $8\cdot(1/2)(1-1/2)=2$ となる。これは(1)の存在定理と矛盾しない。(1)は**良い係数が存在する**こと、(2)は**悪い係数でも訓練点には一致できる**ことを述べている。

(3) 任意の $f\in K$ を固定し、訓練入力 $g$ で $\|f-g\|_\infty\le\rho$ を満たすものを取る。差を三項に分ければ

$$
\begin{aligned}
\|\mathcal Df-\mathcal Gf\|_\infty
&\le\|\mathcal Df-\mathcal Dg\|_\infty
+\|\mathcal Dg-\mathcal Gg\|_\infty
+\|\mathcal Gg-\mathcal Gf\|_\infty\\
&\le L\rho+e_{\rm train}+L\rho.
\end{aligned}
$$

訓練集合 $\{f_0,f_1\}$ の被覆半径は $\rho=1/2$。真値のLipschitz定数は $1$、(2)の模型の差は

$$
B(a)-B(b)=(a-b)\{1+8[1-(a+b)]\}
$$

なので、$a,b\in[0,1]$ に対し $|B(a)-B(b)|\le9|a-b|$。両方を押さえる共通定数には $L=9$ を取れる。従って評価は $0+2\cdot9\cdot(1/2)=9$ で、実際の誤差 $2$ を排除しない。モデルの急な変動を制限し、被覆半径を縮める仮定が汎化評価には必要である。
<!-- solution-end -->

## 10. 学習のまとめ

コンパクト入力族と連続作用素からは、必要なセンサ数と表現の複雑さを**選べるなら**一様近似可能であることが証明できた。一方、無制限の連続入力、有限訓練入力だけ、有限出力格子だけ、固定計算予算、未見の分布・格子については、それぞれ独立に仮定を補う必要がある。

次講は、[PINNの残差](../PML2-06/index.md#def-pml2-06-strong-residual)とNeural Operatorの入力出力学習を組み合わせるとき、どちらの誤差をどの情報から評価するかを扱う。
