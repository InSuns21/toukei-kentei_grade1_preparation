# PML2-18 DeepONetは観測点からどう作用素を近似するか

## 1. 関数全体を渡さずに、出力の各点を計算したい

[PML2-14の解作用素](../PML2-14/index.md#def-pml2-14-operator)は、入力関数 $f$ を受け取り、出力関数 $\mathcal Gf$ を返す。[前講のFNOの解像度比較](../PML2-17/index.md#def-pml2-17-grid-error)では、Fourier係数を求める格子の変更と出力精度の変更を区別した。ここでは別の作り方を考える。

入力関数を丸ごとネットワークへ渡す代わりに、**固定した入力側の観測点（センサ）**で値を読み、その有限個の値から出力関数を作りたい。一方、出力を知りたい位置 $y$ は問い合わせのたびに指定できるようにする。この二つを分けるのが Deep Operator Network（DeepONet）の **branch** と **trunk** である。

本講の中心となる問いは、どのセンサ配置と入力関数族なら正確に表せるのか、またセンサの外側に残る情報が誤差へどう現れるのか、である。原論文は [Lu ほか (2021)](https://doi.org/10.1038/s42256-021-00302-5)。ここでは一般の普遍近似定理を先取りせず、有限次元の厳密な構成と評価から理解する。

## 2. branch と trunk を組み合わせる

既習の[有限センサ観測](../PML2-14/index.md#def-pml2-14-sensors)では、区間 $D=[0,1]$ 上の相異なる点 $s_1,\ldots,s_m$ を固定して

$$
S_mf=(f(s_1),\ldots,f(s_m))\in\mathbb R^m
$$

と書いた。**branch** はこの $m$ 個の入力値を $p$ 個の係数へ変換する写像、**trunk** は問い合わせ位置 $y$ を $p$ 個の基底値へ変換する写像である。ここで「基底値」は線形代数の基底であることを要求せず、出力を組み立てるための $p$ 成分の関数値を意味する。二つの $p$ 成分を内積で合わせれば一つの実数が返る。

<a id="def-pml2-18-deeponet"></a>

<!-- formal-statement-start -->
> **定義（固定センサ型 DeepONet）**  
> $m,p\ge1$、相異なるセンサ $s_1,\ldots,s_m\in[0,1]$、入力族 $\mathcal F\subset C([0,1])$、連続な branch 写像 $B_\theta:\mathbb R^m\to\mathbb R^p$、連続な trunk 写像 $T_\theta:[0,1]\to\mathbb R^p$、定数 $c_\theta\in\mathbb R$ を取る。成分を $B_{\theta,k},T_{\theta,k}$ と書き、

$$
(\mathcal D_\theta f)(y)
=\sum_{k=1}^{p}B_{\theta,k}(S_mf)T_{\theta,k}(y)+c_\theta
\quad(f\in\mathcal F,\ y\in[0,1])
$$

> によって定める $\mathcal D_\theta:\mathcal F\to C([0,1])$ を**固定センサ型 DeepONet**と呼ぶ。パラメータ $\theta$、センサ位置、$m,p$ は入力 $f$ と問い合わせ点 $y$ によらず共通とする。
<!-- formal-statement-end -->

**何が関数になるのか。** $f$ を固定すると $B_\theta(S_mf)$ は一定の $p$ 次元ベクトルであり、$y\mapsto T_{\theta,k}(y)$ は連続である。したがって有限和は $y$ の連続関数で、定義の値域条件も満たす。通常 branch/trunk をニューラルネットで実装するが、下の直接例ではネットワークが表すべき**関数そのもの**を明示し、勾配学習の成功を仮定しない。

<!-- definition-example-start: def-pml2-18-deeponet -->
**定義の確認**（零Dirichlet Poisson問題）。 [Poisson解作用素](../PML2-14/index.md#thm-pml2-14-green)を $\mathcal G$ とし、入力を一次関数 $f(t)=a+bt$（$a,b\in\mathbb R$）に制限する。$s_1=0,s_2=1$ とすると $S_2f=(a,a+b)$。$m=p=2$、$c_\theta=0$、branch を恒等写像

$$
B_\theta(v_1,v_2)=(v_1,v_2)
$$

とし、trunk を

$$
T_\theta(y)=\left(
\frac{2y-3y^2+y^3}{6},
\frac{y-y^3}{6}
\right)
$$

とする。どちらの写像も各成分は多項式で連続であり、入出力は $\mathbb R^2$ で一致する。定義式に代入して

$$
\begin{aligned}
(\mathcal D_\theta f)(y)
&=a\frac{2y-3y^2+y^3}{6}
 +(a+b)\frac{y-y^3}{6}\\
&=a\frac{y-y^2}{2}+b\frac{y-y^3}{6}.
\end{aligned}
$$

この関数を $u(y)$ と置けば $u(0)=u(1)=0$ であり、

$$
u'(y)=a\frac{1-2y}{2}+b\frac{1-3y^2}{6},
\qquad
-u''(y)=a+by=f(y).
$$

従って $u=\mathcal Gf$。有限センサ、branch、trunk、境界条件、微分方程式を実際に確認した。この**一次入力族上の厳密一致**は、任意の連続入力での厳密一致を意味しない。
<!-- definition-example-end -->

例えば $f(t)=1+2t$、$y=1/2$ ならセンサ値は $(1,3)$、trunk は $(1/16,1/16)$ となり、出力は $1/16+3/16=1/4$。入力関数を変えると branch の値が変わり、同じ $f$ に対して $y$ を変えると trunk が変わる。

## 3. センサ行列は、どの入力を区別できるかを表す

入力が $d$ 個の既知の関数 $\phi_1,\ldots,\phi_d$ の線形結合に制限されるとする。これは係数ベクトル $a=(a_1,\ldots,a_d)$ によって $f=\sum_j a_j\phi_j$ と書ける**有限次元入力族**である。センサ $s_i$ で評価すれば

$$
f(s_i)=\sum_{j=1}^{d}\phi_j(s_i)a_j.
$$

そこで $m$ 行 $d$ 列の**センサ行列** $A=(\phi_j(s_i))_{i,j}$ を作る。これは係数 $a$ を観測値 $S_mf=Aa$ に移す行列である。「$A$ の列が一次独立」とは $Aa=0$ を満たす係数が $a=0$ だけであることを意味する。これを列階数 $d$ ともいう。

<a id="thm-pml2-18-sensor-rank"></a>

<!-- formal-statement-start -->
> **定理（有限次元入力族でのセンサ再構成と厳密DeepONet表現）**  
> $D=[0,1]$ とし、$\phi_1,\ldots,\phi_d\in C(D)$ が一次独立、$V=\operatorname{span}\{\phi_1,\ldots,\phi_d\}$ とする。相異なるセンサ $s_1,\ldots,s_m\in D$ に対する行列 $A_{ij}=\phi_j(s_i)$ の列が一次独立（$m\ge d$、階数 $d$）であり、$\mathcal G:V\to C(D)$ が線形なら、$p=d,c_\theta=0$ の固定センサ型 DeepONet で

$$
\mathcal D_\theta f=\mathcal Gf\qquad(f\in V)
$$

> を厳密に実現できる。具体的には

$$
B_\theta(v)=(A^{\mathsf T}A)^{-1}A^{\mathsf T}v,
\qquad
T_{\theta,j}(y)=(\mathcal G\phi_j)(y)
$$

> と取ればよい。反対に $A$ の列が一次従属なら $S_m$ は $V$ 上で単射でない。さらに $\mathcal G$ が $V$ 上で単射なら、どのセンサ依存モデルも $V$ 上で $\mathcal G$ と完全一致できない。
<!-- formal-statement-end -->

**証明の見取り図。** まず観測から係数を一意に戻し、次に $\mathcal G$ の線形性で出力関数を足し合わせる。列が従属なら非零の入力が零関数と同じセンサ値を持つ。

<!-- proof-start -->
### 証明

$A$ の列が一次独立なので、任意の $a\ne0$ について $Aa\ne0$ である。従って

$$
a^{\mathsf T}(A^{\mathsf T}A)a
=(Aa)^{\mathsf T}(Aa)=\sum_{i=1}^{m}(Aa)_i^2>0.
$$

ゆえに $A^{\mathsf T}A$ は可逆で、$L=(A^{\mathsf T}A)^{-1}A^{\mathsf T}$ は $LA=I_d$ を満たす。$f=\sum_j a_j\phi_j$ なら $S_mf=Aa$ だから

$$
B_\theta(S_mf)=LS_mf=LAa=a.
$$

$\mathcal G$ の線形性により、任意の $y\in D$ で

$$
\begin{aligned}
(\mathcal D_\theta f)(y)
&=\sum_{j=1}^d a_j(\mathcal G\phi_j)(y)\\
&=\left(\mathcal G\left(\sum_{j=1}^d a_j\phi_j\right)\right)(y)
=(\mathcal Gf)(y).
\end{aligned}
$$

$B_\theta$ は行列による線形写像、$T_{\theta,j}$ は仮定から連続なので、[DeepONetの定義](#def-pml2-18-deeponet)の条件をすべて満たす。

逆に列が一次従属なら非零 $a$ で $Aa=0$ がある。$\phi_j$ が一次独立なので $h=\sum_j a_j\phi_j$ は非零であるが $S_mh=0=S_m0$。任意のセンサ依存モデルは $h$ と $0$ に同じ関数を返す。$\mathcal G$ が単射かつ線形なら $\mathcal Gh\ne\mathcal G0=0$ なので、両方に完全一致はできない。
<!-- proof-end -->

**直接適用。** $V=\operatorname{span}\{1,t\}$、センサ $(0,1)$ なら

$$
A=\begin{pmatrix}1&0\\1&1\end{pmatrix},
\qquad
A^{-1}=\begin{pmatrix}1&0\\-1&1\end{pmatrix}.
$$

したがって係数は $a=v_1,b=v_2-v_1$ と復元され、[Poisson解作用素の線形性](../PML2-14/index.md#thm-pml2-14-green)により第2節のtrunkが得られる。反対に $V=\operatorname{span}\{1,t(1-t)\}$ と端点センサ $(0,1)$ を選ぶと

$$
A=\begin{pmatrix}1&0\\1&0\end{pmatrix}
$$

で列は従属であり、非零関数 $t(1-t)$ は両端で零となる。観測点が二つあっても、**入力族に対して情報が独立とは限らない**。

## 4. センサが近すぎると観測誤差を増幅する

階数が足りていても、センサ位置は数値的に重要である。一次入力 $f(t)=a+bt$ のセンサを $s_1=0,s_2=\delta$（$0<\delta\le1$）とすると、観測値は $(a,a+b\delta)$。傾きを求めるときは二つの値を引いて $\delta$ で割る。

<a id="prop-pml2-18-noise"></a>

<!-- formal-statement-start -->
> **命題（近接した二センサの傾き誤差）**  
> $0<\delta\le1$、$f(t)=a+bt$ とし、センサ $0,\delta$ における観測値が $v_1=a+e_1$、$v_2=a+b\delta+e_2$、$|e_1|,|e_2|\le\varepsilon$ であるとする。係数を $\widehat a=v_1$、$\widehat b=(v_2-v_1)/\delta$ で復元すると、

$$
|\widehat a-a|\le\varepsilon,
\qquad
|\widehat b-b|\le\frac{2\varepsilon}{\delta}.
$$

> 第2節のPoisson出力をこの係数で構成した場合、出力の一様誤差は

$$
\|\widehat u-\mathcal Gf\|_\infty
\le\frac{\varepsilon}{8}+\frac{2\varepsilon}{9\sqrt3\,\delta}.
$$
<!-- formal-statement-end -->

**証明の見取り図。** 傾きの誤差は観測誤差の差を $\delta$ で割ったもの。Poisson出力は定数右辺と一次右辺の二つの既習解の線形結合である。

<!-- proof-start -->
### 証明

観測値を代入すると

$$
\begin{aligned}
\widehat a-a&=e_1,\\
\widehat b-b
&=\frac{(a+b\delta+e_2)-(a+e_1)}{\delta}-b\\
&=\frac{e_2-e_1}{\delta}.
\end{aligned}
$$

三角不等式により $|e_2-e_1|\le2\varepsilon$。Poisson方程式 $-u''=a+bt$ の解を第2節の計算から使うと

$$
\widehat u(y)-(\mathcal Gf)(y)
=(\widehat a-a)\frac{y(1-y)}2+
(\widehat b-b)\frac{y-y^3}{6}.
$$

$0\le y\le1$ 上で $\max y(1-y)/2=1/8$。また $(y-y^3)/6$ の導関数 $(1-3y^2)/6$ は $y=1/\sqrt3$ で符号が正から負に変わるので最大は $1/(9\sqrt3)$ である。従って各項の上界を足し、すべての $y$ で上限を取れば結論となる。
<!-- proof-end -->

例えば $e_1=-\varepsilon,e_2=\varepsilon$ と取れば $|\widehat b-b|=2\varepsilon/\delta$ で、係数の上界は達成される。$\delta$ を小さくするほど傾きの復元は悪条件になる。**階数が十分**という代数的条件と、**ノイズに強い**という数値的条件は別である。

## 5. 無限次元の入力では何を追加で仮定するか

前講の[有限センサでの区別不能性定理](../PML2-14/index.md#thm-pml2-14-sensor-limit)は、入力族が十分に広ければ、全センサ値が同じで出力が異なる入力を作れると示した。DeepONetも[センサ依存の作用素近似](../PML2-14/index.md#def-pml2-14-sensors)の一種なので、この障害を避けられない。

しかし、入力関数の変化が急すぎないと仮定すれば、センサ数に応じて復元誤差を評価できる。$m\ge2$、等間隔センサ $s_i=(i-1)/(m-1)$ を置き、間隔を $h=1/(m-1)$ とする。隣り合う観測値を線分で結ぶ操作を**区分線形補間**という。

<a id="def-pml2-18-interpolant"></a>

<!-- formal-statement-start -->
> **定義（センサによる区分線形補間）**  
> $m\ge2$、$s_i=(i-1)h$、$h=1/(m-1)$ とする。$f\in C([0,1])$ に対し、各 $y\in[s_i,s_{i+1}]$ において $\lambda=(y-s_i)/h\in[0,1]$ と置き、

$$
(I_mf)(y)=(1-\lambda)f(s_i)+\lambda f(s_{i+1})
$$

> と定める。$I_mf$ は節点で元の観測値と一致する連続な区分一次関数であり、センサ値 $S_mf$ だけで決まる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml2-18-interpolant -->
**定義の確認**。 $m=3$、センサ $(0,1/2,1)$、$f(t)=t^2$ とすると観測値は $(0,1/4,1)$。$0\le y\le1/2$ で $\lambda=2y$ なので $(I_3f)(y)=y/2$。$1/2\le y\le1$ では $\lambda=2y-1$ なので

$$
(I_3f)(y)=(2-2y)\frac14+(2y-1)\cdot1
=\frac32y-\frac12.
$$

両式は $y=1/2$ で $1/4$ に一致し、端点でも $0,1$ を再現する。従って連続性、補間条件、センサ値だけへの依存をすべて確かめた。$y=1/4$ では補間値 $1/8$、元の値 $1/16$ なので誤差は $1/16$。
<!-- definition-example-end -->

前講の[入力被覆による誤差評価](../PML2-14/index.md#thm-pml2-14-cover)でも用いたLipschitz条件を、今回は入力関数へ課す。定数 $L\ge0$ を固定し、任意の $x,z\in[0,1]$ に対し $|f(x)-f(z)|\le L|x-z|$ を仮定する。これは観測点だけに課す制限ではなく、全区間の入力関数の変化を抑える条件である。

<a id="thm-pml2-18-interpolation-bound"></a>

<!-- formal-statement-start -->
> **定理（センサ間隔から得るPoisson解作用素の誤差評価）**  
> $m\ge2$、$h=1/(m-1)$、$L\ge0$ とし、$f\in C([0,1])$ が任意の $x,z\in[0,1]$ で $|f(x)-f(z)|\le L|x-z|$ を満たすとする。[零Dirichlet Poisson解作用素](../PML2-14/index.md#thm-pml2-14-green)を $\mathcal G$ とし、$I_m$ を上の区分線形補間とする。このとき

$$
\|f-I_mf\|_\infty\le\frac{Lh}{2},
\qquad
\|\mathcal Gf-\mathcal G(I_mf)\|_\infty
\le\frac{Lh}{16}.
$$

> 同じ等間隔センサ $s_1,\ldots,s_m$ を使う任意の固定センサ型 DeepONet $\mathcal D_\theta$ に対しても

$$
\|\mathcal D_\theta f-\mathcal Gf\|_\infty
\le\|\mathcal D_\theta f-\mathcal G(I_mf)\|_\infty
+\frac{Lh}{16}
$$

> が成り立つ。
<!-- formal-statement-end -->

**証明の見取り図。** 二つの端点へのLipschitz評価を線形補間の重みで足し合わせ、隙間の最大値を求める。[既習のPoisson作用素の $1/8$ 安定性](../PML2-14/index.md#thm-pml2-14-green)で解へ誤差を移す。

<!-- proof-start -->
### 証明

$y\in[s_i,s_{i+1}]$、$\lambda=(y-s_i)/h$ を取る。定義式から

$$
f(y)-(I_mf)(y)
=(1-\lambda)(f(y)-f(s_i))
+\lambda(f(y)-f(s_{i+1})).
$$

Lipschitz条件および $y-s_i=\lambda h$、$s_{i+1}-y=(1-\lambda)h$ から

$$
\begin{aligned}
|f(y)-(I_mf)(y)|
&\le(1-\lambda)L\lambda h
+\lambda L(1-\lambda)h\\
&=2Lh\lambda(1-\lambda)\\
&=Lh\left(\frac12-2(\lambda-\tfrac12)^2\right)
\le\frac{Lh}{2}.
\end{aligned}
$$

全区間で最大を取って第1の式を得る。$I_mf$ も連続であるから、[Poisson作用素の安定性](../PML2-14/index.md#thm-pml2-14-green)を入力 $f$ と $I_mf$ に適用できる。

$$
\|\mathcal Gf-\mathcal G(I_mf)\|_\infty
\le\frac18\|f-I_mf\|_\infty
\le\frac{Lh}{16}.
$$

最後に、同じ $y$ における二つの出力の差を次のように分解する。

$$
\mathcal D_\theta f-\mathcal Gf
=(\mathcal D_\theta f-\mathcal G(I_mf))
+(\mathcal G(I_mf)-\mathcal Gf).
$$

各 $y$ で $|a+b|\le|a|+|b|$ を適用し、$y\in[0,1]$ の上限を取ると定理の最後の不等式を得る。
<!-- proof-end -->

**二種類の誤差。** 第1項は「観測値から得られる補間入力を、モデルがどれだけ正確にPoisson解へ移すか」という**近似・学習側の誤差**である。第2項は観測点の間に取り逃した情報の上界である。センサ数を増やしても第1項が自動的に減るとは言えない。またこの評価は **Lipschitz定数 $L$ が共通に抑えられた入力族**に対するもので、任意の連続関数全体に同じ収束速度を主張しない。

## 6. 具体的な見逃しと、三点センサによる修正

一次関数では厳密だった第2節のDeepONetに、$f(t)=t(1-t)$ を渡す。端点観測は $S_2f=(0,0)$ であり、零入力と区別できない。branch が零ベクトルを返すため出力は零関数となる。

一方、[Poisson方程式](../PML2-14/index.md#def-pml2-14-operator)の真の解は、二回積分して境界値を入れると

$$
\begin{aligned}
-u''(y)&=y-y^2,\\
u'(y)&=-\frac{y^2}{2}+\frac{y^3}{3}+C,\\
u(y)&=-\frac{y^3}{6}+\frac{y^4}{12}+Cy+D.
\end{aligned}
$$

$u(0)=0$ で $D=0$、$u(1)=0$ で $C=1/12$ だから

$$
(\mathcal Gf)(y)=\frac{y-2y^3+y^4}{12},
\qquad
(\mathcal Gf)(1/2)=\frac5{192}.
$$

したがってこの入力の $y=1/2$ における誤差は $5/192$。零入力と本入力を同時に含む族では、前講の[区別不能性による下界](../PML2-14/index.md#thm-pml2-14-sensor-limit)と同じ三角不等式の機構により、どの二端点センサ依存モデルも少なくとも片方で $5/384$ 以上の誤差を持つ。

そこでセンサを $(0,1/2,1)$ に増やし、入力族を $V_3=\operatorname{span}\{1,t,t(1-t)\}$ とする。センサ行列は

$$
A_3=\begin{pmatrix}
1&0&0\\
1&1/2&1/4\\
1&1&0
\end{pmatrix},
\qquad \det A_3=-\frac14\ne0.
$$

従って[センサ階数定理](#thm-pml2-18-sensor-rank)の仮定が成立する。観測ベクトル $(v_0,v_{1/2},v_1)$ から

$$
a=v_0,\quad b=v_1-v_0,\quad
c=4\left(v_{1/2}-\frac{v_0+v_1}{2}\right)
$$

を復元し、branch を $(a,b,c)$、trunk を

$$
\left(
\frac{y(1-y)}2,\ 
\frac{y-y^3}{6},\
\frac{y-2y^3+y^4}{12}
\right)
$$

とすれば、任意の $f(t)=a+bt+ct(1-t)$ に対し $\mathcal D_\theta f=\mathcal Gf$ が成り立つ。ここでも出力を知りたい $y$ はセンサ位置でなくてよい。

## 7. 学習するなら入力関数と評価点を別々に管理する

実際のDeepONetでは branch と trunk の係数をニューラルネットで学習する。訓練用入力 $f_n$（$1\le n\le N$）と、その出力を比較する位置 $y_j$（$1\le j\le Q$）、教師値 $z_{nj}=(\mathcal Gf_n)(y_j)$ を準備する。観測値の配列は $v_n=S_mf_n\in\mathbb R^m$ である。例えば平均二乗誤差による目的関数は

$$
\mathcal L(\theta)=\frac1{NQ}
\sum_{n=1}^N\sum_{j=1}^Q
\left(\sum_{k=1}^pB_{\theta,k}(v_n)T_{\theta,k}(y_j)
+c_\theta-z_{nj}\right)^2.
$$

$n$ は**入力の種類を表す添字**、$j$ は**同じ出力関数への問い合わせ位置の添字**を表す。$Q$ を増やすことは $N$ を増やすことではない。未知入力関数での精度を見るには、訓練で使わない $f$ を用意し、その上でさらに未使用の $y$ を評価する。二段階の切り分けが必要である。

第2節で式として明示した branch/trunk は、訓練アルゴリズムが収束するという主張ではなく**表現できること**の構成例である。センサ数・配置・入力族・出力位置・ネットワーク幅 $p$・教師値の数値誤差・最適化を記録して初めて数値比較ができる。[PML2-17の重み共有と離散化誤差の区別](../PML2-17/index.md#prop-pml2-17-error-split)も同じく重要だが、DeepONetでは **入力センサが固定されていても、trunkには異なる出力位置を問い合わせられる**という構造を採用する。

## 8. 標準Pythonで有限センサを検算する

[計算例のPythonソース](deeponet_demo.py)は標準ライブラリの `fractions.Fraction` を使い、丸め誤差なしで二点センサと三点センサを比較する。

~~~bash
python deeponet_demo.py
~~~

| 入力 $f(t)$ | 真値 $\mathcal Gf(1/2)$ | 二点モデル | 三点モデル |
|---|---:|---:|---:|
| $1+2t$ | $1/4$ | $1/4$ | $1/4$ |
| $t(1-t)$ | $5/192$ | $0$ | $5/192$ |

二点モデルは入力 $t(1-t)$ について真値を外し、三点モデルは拡張した三次元入力族を正確に表す。これはセンサと係数を解析的に設定した再現計算であり、学習済みネットワークの統計的性能を測っているわけではない。

## 9. 演習と詳細解答

### Level A：入力と出力の区別

<a id="ex-pml2-18-a01"></a>

### PML2-18-A01：branch/trunk の実数計算
- Level: A

第2節の $m=p=2$ のDeepONetに $f(t)=2-t$ を入力し、$S_2f$、$B_\theta(S_2f)$、$T_\theta(1/2)$、$(\mathcal D_\theta f)(1/2)$ を順に求めよ。

<!-- solution-start -->
**詳細解答。** $f(0)=2,f(1)=1$ なので $S_2f=(2,1)$。branch は恒等写像ゆえ $B_\theta(S_2f)=(2,1)$。trunk は多項式へ $y=1/2$ を入れると

$$
T_{\theta,1}(1/2)=\frac{1-3/4+1/8}{6}=\frac1{16},
\quad
T_{\theta,2}(1/2)=\frac{1/2-1/8}{6}=\frac1{16}.
$$

[DeepONetの定義](#def-pml2-18-deeponet)で内積を取り、$(\mathcal D_\theta f)(1/2)=2/16+1/16=3/16$。Poisson解の式でも $a=2,b=-1$ として $2/8-1/16=3/16$ で一致する。
<!-- solution-end -->

<a id="ex-pml2-18-a02"></a>

### PML2-18-A02：ネットワークの次元
- Level: A

$m=4,p=3$、入力族 $\mathcal F\subset C([0,1])$ のDeepONetについて、センサ、branch、trunk、出力の次元を書け。$B_\theta(v)=(v_1+v_2,v_3,v_4)$、$T_\theta(y)=(1,y,y^2)$、$c_\theta=0$ の式も示せ。

<!-- solution-start -->
**詳細解答。** $S_4f\in\mathbb R^4$、branch は $\mathbb R^4\to\mathbb R^3$、trunk は $[0,1]\to\mathbb R^3$。同じ長さ3の成分の積の和だから各 $y$ に一つの実数が返る。具体的には

$$
(\mathcal D_\theta f)(y)
=f(s_1)+f(s_2)+f(s_3)y+f(s_4)y^2.
$$

各項は $y$ について連続なので、出力は $C([0,1])$ に属する。
<!-- solution-end -->

<a id="ex-pml2-18-a03"></a>

### PML2-18-A03：非線形な作用素を表せるか
- Level: A

$Hf(y)=(f(0)+f(1))^2y(1-y)$ とする。これは固定センサ型DeepONetで表せるか。$m,p,B,T,c$ を示し、$H(2f)$ と $2Hf$ を比較せよ。

<!-- solution-start -->
**詳細解答。** $m=2$、センサ $(0,1)$、$p=1$、$B(v_1,v_2)=(v_1+v_2)^2$、$T(y)=y(1-y)$、$c=0$ とすれば、[定義](#def-pml2-18-deeponet)の式は $H$ に一致する。branch は多項式で連続、trunk も連続である。一方

$$
H(2f)(y)=4(f(0)+f(1))^2y(1-y)=4Hf(y).
$$

例えば $f=1$ では $Hf(1/2)=1$ なので $H(2f)\ne2Hf$。この作用素は一般に線形ではなく、非線形性はbranchに入っている。
<!-- solution-end -->

<a id="ex-pml2-18-a04"></a>

### PML2-18-A04：端点センサで見逃す関数
- Level: A

$s_1=0,s_2=1$、$f_0(t)=0$、$f_1(t)=t(1-t)$ とする。両入力のセンサ値と第2節のDeepONet出力を求め、真のPoisson出力が $y=1/2$ で異なることを確かめよ。

<!-- solution-start -->
**詳細解答。** $f_0(0)=f_0(1)=0$、$f_1(0)=0$、$f_1(1)=0$ なので両方 $S_2f=(0,0)$。第2節のbranchは恒等写像で定数項も0だから $\mathcal D_\theta f_0=\mathcal D_\theta f_1=0$。真値は $\mathcal Gf_0=0$、一方第6節で境界条件を確認した解より

$$
(\mathcal Gf_1)(1/2)=\frac{1/2-2(1/8)+1/16}{12}=\frac5{192}.
$$

したがって少なくとも $f_1$ には $5/192$ の点誤差がある。
<!-- solution-end -->

<a id="ex-pml2-18-a05"></a>

### PML2-18-A05：区分線形補間の計算
- Level: A

$f(t)=t^2$、$m=3$ とし、$(I_3f)(1/4)$、$(I_3f)(3/4)$ および各点での補間誤差を計算せよ。

<!-- solution-start -->
**詳細解答。** センサは $0,1/2,1$、観測値は $0,1/4,1$。$y=1/4$ では左の区間の $\lambda=1/2$ だから $(I_3f)(1/4)=(1/2)0+(1/2)(1/4)=1/8$。$y=3/4$ では右の区間の $\lambda=1/2$ だから $(I_3f)(3/4)=(1/2)(1/4)+(1/2)1=5/8$。真値はそれぞれ $1/16,9/16$ なので、差はどちらも $1/16$。[補間の定義](#def-pml2-18-interpolant)と一致する。
<!-- solution-end -->

### Level B：階数・ノイズ・誤差

<a id="ex-pml2-18-b01"></a>

### PML2-18-B01：任意の二点センサで一次入力を復元する
- Level: B

$V=\operatorname{span}\{1,t\}$、センサ $(0,\delta)$、$0<\delta\le1$ とし、観測値を $(v_1,v_2)$ とする。Poisson解作用素の厳密DeepONetのbranchとtrunkを構成し、$\delta=1/2$、$y=1/2$ の出力を簡単にせよ。

<!-- solution-start -->
**詳細解答。** $f(t)=a+bt$ とすると $v_1=a$、$v_2=a+b\delta$。従って

$$
a=v_1,\qquad b=\frac{v_2-v_1}{\delta}.
$$

第2節の境界値問題を二回積分した解を使い、$q_0(y)=y(1-y)/2$、$q_1(y)=(y-y^3)/6$ と置くと

$$
(\mathcal Gf)(y)=a q_0(y)+b q_1(y)
=v_1\left(q_0(y)-\frac{q_1(y)}{\delta}\right)
+v_2\frac{q_1(y)}{\delta}.
$$

よって branch を $(v_1,v_2)$、trunk を $(q_0-q_1/\delta,q_1/\delta)$、バイアス0とすればよい。$\delta>0$ なのでtrunkは連続で、[階数定理](#thm-pml2-18-sensor-rank)とも整合する。$y=1/2$ では $q_0=1/8,q_1=1/16$、$\delta=1/2$ を代入すると trunk は $(0,1/8)$ となり、出力は $v_2/8$。
<!-- solution-end -->

<a id="ex-pml2-18-b02"></a>

### PML2-18-B02：二点あるのに階数不足
- Level: B

入力族 $V=\operatorname{span}\{1,t(1-t)\}$、センサ $(0,1)$ のセンサ行列を作り、非零の核ベクトルを挙げよ。Poisson解作用素を $V$ 上で厳密再現できない理由を述べよ。

<!-- solution-start -->
**詳細解答。** $\phi_1(t)=1$、$\phi_2(t)=t(1-t)$ とすれば

$$
A=\begin{pmatrix}\phi_1(0)&\phi_2(0)\\
\phi_1(1)&\phi_2(1)\end{pmatrix}
=\begin{pmatrix}1&0\\1&0\end{pmatrix}.
$$

$A(0,1)^{\mathsf T}=0$ なので列は一次従属。係数 $(0,1)$ は零でないが入力関数 $h(t)=t(1-t)$ は両センサで零となる。[階数定理](#thm-pml2-18-sensor-rank)の後半と第6節の計算より $\mathcal Gh(1/2)=5/192\ne0=\mathcal G0(1/2)$。同じセンサ値からは同じ出力しか返せず、両入力への完全一致は不可能である。
<!-- solution-end -->

<a id="ex-pml2-18-b03"></a>

### PML2-18-B03：ノイズとセンサ間隔
- Level: B

$f(t)=a+bt$ をセンサ $0,\delta$ で観測し、$e_1=-\varepsilon,e_2=\varepsilon$ の誤差が加わった。$\widehat b-b$ を求め、$\delta=1,1/4$ の大きさを比較し、$\delta\to0$ で何が起きるか述べよ。

<!-- solution-start -->
**詳細解答。** 定義に従って

$$
\widehat b=\frac{a+b\delta+\varepsilon-(a-\varepsilon)}{\delta}
=b+\frac{2\varepsilon}{\delta}.
$$

したがって誤差は $\widehat b-b=2\varepsilon/\delta$。$\delta=1$ なら $2\varepsilon$、$\delta=1/4$ なら $8\varepsilon$ で4倍に増える。$\delta\to0$ では固定の $\varepsilon>0$ に対して上界もこの例の誤差も発散する。[ノイズ命題](#prop-pml2-18-noise)は階数が維持されても数値的不安定性が残ることを示す。
<!-- solution-end -->

<a id="ex-pml2-18-b04"></a>

### PML2-18-B04：入力の滑らかさから誤差を評価する
- Level: B

$|f(x)-f(z)|\le2|x-z|$ を満たす入力族と、等間隔 $m=5$ センサを考える。$\|f-I_5f\|_\infty$ と $\|\mathcal Gf-\mathcal G(I_5f)\|_\infty$ の上界を求め、$\mathcal D_\theta$ が $\mathcal G(I_5f)$ を一様誤差 $0.01$ 以下で再現するときの合計上界を述べよ。

<!-- solution-start -->
**詳細解答。** $L=2$、$h=1/(5-1)=1/4$ である。[補間誤差定理](#thm-pml2-18-interpolation-bound)に代入すると

$$
\|f-I_5f\|_\infty\le \frac{2(1/4)}2=\frac14,
\qquad
\|\mathcal Gf-\mathcal G(I_5f)\|_\infty
\le\frac{2(1/4)}{16}=\frac1{32}.
$$

仮定したモデル側の誤差を三角不等式で足し、$\|\mathcal D_\theta f-\mathcal Gf\|_\infty\le0.01+1/32=0.04125$。この結論はモデル側 $0.01$ が入力族全体で成り立つ場合の上界であり、訓練点での誤差だけからは言えない。
<!-- solution-end -->

### Level C：入力族を増やして限界を取り除く

<a id="ex-pml2-18-c01"></a>

### PML2-18-C01：二点から三点へ拡張する
- Level: C

$V_3=\operatorname{span}\{1,t,t(1-t)\}$、$\mathcal Gf=u$ は $-u''=f,\ u(0)=u(1)=0$ の解とする。

1. 端点センサ $(0,1)$ では $0$ と $t(1-t)$ が区別不能であることを示し、両方に対する点 $y=1/2$ の最大誤差の下界を求めよ。
2. センサ $(0,1/2,1)$ の行列式を計算し、観測値から $a,b,c$ を復元せよ。
3. すべての $f(t)=a+bt+ct(1-t)$ について厳密となる $p=3$ のDeepONetを構成し、$f=t(1-t)$、$y=1/2$ で検算せよ。
4. 三点化だけで、任意の $C([0,1])$ 入力の厳密一致を証明できない理由を述べよ。

<!-- solution-start -->
**詳細解答。**

**(1) 二点の限界。** $h(t)=t(1-t)$ は連続で $h(0)=h(1)=0$。零関数も同じ観測 $(0,0)$ を返す。二回積分で得た第6節の解は

$$
(\mathcal Gh)(y)=\frac{y-2y^3+y^4}{12}.
$$

$y=1/2$ なら $5/192$。両入力に対する共通の予測値を $q$ と置く。二つの誤差の和で出力差の絶対値を上から評価すると

$$
\frac5{192}=|(\mathcal Gh)(1/2)-(\mathcal G0)(1/2)|
\le|(\mathcal Gh)(1/2)-q|+|q-(\mathcal G0)(1/2)|.
$$

従って少なくとも一方の点誤差は $5/384$ 以上である。

**(2) 三点の復元。** 基底を $(1,t,t(1-t))$ とすると

$$
A_3=\begin{pmatrix}1&0&0\\1&1/2&1/4\\1&1&0\end{pmatrix},
\qquad
\det A_3=\frac12\cdot0-\frac14\cdot1=-\frac14.
$$

非零なので可逆。$v_0=a$、$v_1=a+b$、$v_{1/2}=a+b/2+c/4$ を順に解くと

$$
a=v_0,\quad b=v_1-v_0,\quad
c=4\left(v_{1/2}-\frac{v_0+v_1}{2}\right).
$$

**(3) 厳密なbranchとtrunk。** branchは上の $(a,b,c)$ への線形写像、trunkは

$$
T(y)=\left(\frac{y(1-y)}2,\frac{y-y^3}6,
\frac{y-2y^3+y^4}{12}\right).
$$

各基底の出力を確かめる。最初は $-d^2[y(1-y)/2]/dy^2=1$、次は $-d^2[(y-y^3)/6]/dy^2=y$、最後は $-d^2[(y-2y^3+y^4)/12]/dy^2=y-y^2$。いずれも両端で0なので、線形結合は $-u''=a+by+cy(1-y)$ を満たす。[階数定理](#thm-pml2-18-sensor-rank)に従い全 $V_3$ 上で一致する。$f=t(1-t)$ では観測 $(0,1/4,0)$、復元 $(a,b,c)=(0,0,1)$。$y=1/2$ で内積を取ると $5/192$ となる。

**(4) 拡張の限界。** 三点センサをすべて零にする非零多項式 $h(t)=t(t-1/2)(t-1)$ は $C([0,1])$ に属する。その観測は零関数と同じだが、Poisson解作用素は $-u''=h$ を満たす解を零関数へ写せない（零解なら $-u''=0$ となり $h\ne0$ に矛盾）。入力族を $V_3$ から連続関数全体へ広げれば区別不能性が再発する。
<!-- solution-end -->

## 10. 何ができるようになったか

DeepONetは、入力側で **どの関数値を読むか** を固定し、出力側では **どこで値を求めるか** をtrunkへ渡す構成である。[有限次元の階数条件](#thm-pml2-18-sensor-rank)があれば正確なモデルを構成できるが、広い入力族ではセンサ情報の欠落が残る。その欠落は[補間誤差の評価](#thm-pml2-18-interpolation-bound)のように、入力族の正則性を指定したときに定量化できる。次講 PML2-19 では、こうした有限構成と、一般の作用素近似の存在定理が保証する範囲を切り分ける。
