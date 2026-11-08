# DEF1-06 Kuranishi構成I――調和ゲージと方程式

<!-- definition-example-audit: strict -->

## 1. 無限個の係数を、有限個の方向と障害に整理したい

[前章の高次障害判定](../DEF1-05/index.md#thm-def1-05-higher-criterion)は、形式的な係数 $\phi_1,\phi_2,\ldots$ を一つずつ探す方法だった。しかし $\bar\partial_T\phi_m=-q_m$ の解は、存在しても完全形式や閉形式を足せるため一意でない。**どの代表を選んで計算するか**を決めないと、無限次元空間の中で係数を探し続けることになる。

解決の順序は次の通りである。

1. 計量を選んで、コホモロジー類を一意な調和形式で表す。
2. Green作用素によって、$\bar\partial_T$ の「逆」の役割をする作用素を作る。
3. 一次の調和方向を固定し、残りの係数を一つの固定点方程式で決める。
4. 解けない成分だけを有限次元の調和空間へ押し出す。

ここで得る固定点解と障害写像は、まず**形式的べき級数**として構成する。無限級数が収束すること、局所解析空間になることは次章で別に証明する。

以下、$X$ は複素次元 $n\ge1$ の**コンパクト・境界なし**の複素多様体とし、滑らかなHermite計量 $g$ を一つ固定する。Kähler性はこの章の接束値Dolbeault分解には不要である。$E=T_X=T^{1,0}X$ には $g$ から誘導されたHermite計量を入れる。前章と同じく

$$
C^q=\mathcal A^{0,q}(X,E),\qquad
d=\bar\partial_E:C^q\longrightarrow C^{q+1}
$$

と書く。[正則ベクトル束値Dolbeault複体](../../CYG/CYG1-12/index.md#thm-cyg1-12-bundle-dolbeault)によって $d^2=0$ であり、$H^q(C^\bullet,d)\simeq H^q(X,T_X)$。次数を付けた括弧は[接束値形式の括弧恒等式](../DEF1-05/index.md#lem-def1-05-graded-identities)を満たす。

## 2. 接束値形式にもHodge分解がある

まず $g$ による点ごとのHermite内積を、$E$ の内積と $(0,q)$ 形式の内積のテンソル積として作り、体積形式で積分する。例えば局所的に $u=\sum_{I,a}u_I^a\,d\bar z^I\otimes e_a$ と表示すれば、二組の係数、形式基底、接束枠のGram行列を縮約して $\langle u,v\rangle$ を作る。この構成は正則座標・枠の変更に依らない。

[型別作用素の形式的随伴](../../HOD/HOD1-01/index.md#def-hod1-01-dolbeault-adjoints)と同様に、$d^*:C^{q+1}\to C^q$ を $(du,v)_{L^2}=(u,d^*v)_{L^2}$ で定める。コンパクトで境界がないので、部分積分に境界項は残らない。$\Delta_q=dd^*+d^*d$ は $C^q$ 上で次数を保つ。

調和形式とは $\Delta_q u=0$ を満たす形式である。随伴関係から

$$
(\Delta_qu,u)=\|du\|_{L^2}^2+\|d^*u\|_{L^2}^2
$$

なので、調和性は $du=d^*u=0$ と同値になる。$d^*$ は一般に正則座標で単に「係数を $\partial_z$ 微分する」演算ではない。計量の係数も随伴へ入ることに注意しよう。

<a id="def-def1-06-tangent-laplacian"></a>

<!-- formal-statement-start -->
> **定義（接束値Dolbeault Laplacianと調和射影）**
>
> 上記のコンパクトHermite多様体 $X$ とHermite正則ベクトル束 $E=T_X$ に対し、$d=\bar\partial_E$ の $L^2$ 随伴を $d^*$ とする。接束値Dolbeault Laplacian、次数 $q$ の調和空間を

$$
\Delta_q=dd^*+d^*d,\qquad
\mathcal H^q_T=\ker\Delta_q\subset C^q
$$

> と定める。$\mathcal H^q_T$ への $L^2$ 直交射影を $H_q$ と書き、次数が明らかなときは $H$ と略記する。$q<0$ または $q>n$ の空間・作用素は零とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-def1-06-tangent-laplacian -->
**定義の確認**（平坦複素トーラス）。$X=\mathbb C^2/(\mathbb Z+i\mathbb Z)^2$ とし、$z^j=x_j+iy_j$ と書く。標準平坦計量 $\sum_j(dx_j^2+dy_j^2)$ と大域正則枠 $\partial_{z^1},\partial_{z^2}$ を使う。

この枠では接束の計量も定数なので、$d$ と $d^*$ は各係数関数 $f$ に作用する。[平坦座標でのDolbeault随伴の計算](../../HOD/HOD1-01/index.md#prop-hod1-01-flat-torus-adjoints)を各座標・接束成分へ適用する。昇順の多重添字 $I$ に対して

$$
\begin{aligned}
d(f\,d\bar z^I\otimes\partial_{z^a})
 &=\sum_j(\partial_{\bar z^j}f)\,d\bar z^j\wedge d\bar z^I\otimes\partial_{z^a},\\
d^*(f\,d\bar z^I\otimes\partial_{z^a})
 &=-2\sum_j(\partial_{z^j}f)\,\iota_{\partial_{\bar z^j}}(d\bar z^I)\otimes\partial_{z^a}.
\end{aligned}
$$

ここで $\partial_{z^j}f,\partial_{\bar z^j}f$ は係数関数のWirtinger微分、$\iota$ は形式基底から $d\bar z^j$ を縮約する内部積である。定数係数なら両方の微分が零になる。実際、定数係数形式

$$
\alpha=d\bar z^1\otimes\partial_{z^1},
\qquad
\eta=d\bar z^1\wedge d\bar z^2\otimes\partial_{z^2}
$$

は、大域的に定義され、上の二式から $d\alpha=d\eta=d^*\alpha=d^*\eta=0$ である。定義の二条件をともに満たすので $\Delta_1\alpha=\Delta_2\eta=0$、$H_1\alpha=\alpha$、$H_2\eta=\eta$。一方、非零の完全形式 $dv$ は調和形式に直交し、$H_1(dv)=0$ となる。単に閉じているだけでは調和と判定しない。
<!-- definition-example-end -->

なぜ調和空間は有限次元なのだろうか。楕円型作用素であることが決め手となる。[GA6の主記号の計算](../../GA/GA6/index.md#lem-ga6-elliptic)と同様に、局所正則座標と接束の枠を一点で正規化する。実共変ベクトル $\xi=\sum_j(a_jdx_j+b_jdy_j)$ の $(0,1)$ 成分は

$$
\xi^{0,1}=\frac12\sum_j(a_j+ib_j)d\bar z^j
$$

であり、$\xi\ne0$ なら $\xi^{0,1}\ne0$ である。主記号は微分作用素の最高階部分で、$\sharp$ は計量による共変ベクトルからベクトルへの対応を表す。

$d$ の一階主記号は（共通の $i$ を除き）$\xi^{0,1}$ との外積 $\varepsilon(\xi^{0,1})$、$d^*$ の記号はその随伴の内部積 $\iota((\xi^{0,1})^\sharp)$ となる。外積・内部積の交代関係を一つの基底単項式で確認すると

$$
\varepsilon(\xi^{0,1})\iota((\xi^{0,1})^\sharp)
+\iota((\xi^{0,1})^\sharp)\varepsilon(\xi^{0,1})
=|\xi^{0,1}|_g^2 I.
$$

ここで $\sigma_2$ は二階主記号を表す。実 $\xi\ne0$ に対して $\xi^{0,1}\ne0$ だから、$\sigma_2(\Delta_q)(\xi)=|\xi^{0,1}|_g^2I$ は正定値であり、各次数の $\Delta_q$ は楕円型である。係数の微分・接束の接続による零階・一階の項は、この最高階の判定に影響しない。

<a id="thm-def1-06-tangent-hodge"></a>

<!-- formal-statement-start -->
> **定理（接束値Hodge分解とGreen作用素）**
>
> $X$ をコンパクト・境界なしの複素多様体、$E=T_X$ をHermite計量付き正則接束とする。各 $0\le q\le n$ に対し $\mathcal H^q_T$ は有限次元で、滑らかな $u\in C^q$ は直交する三成分へ

$$
u=H_qu+dd^*G_qu+d^*dG_qu
$$

> と分解される。ここで $G_q$ は $\mathcal H^q_T$ 上で零、直交補空間上で $\Delta_q$ の逆となるGreen作用素で、$\Delta_qG_q=G_q\Delta_q=I-H_q$ が滑らかな形式上で成り立つ。さらに自然な写像

$$
\mathcal H^q_T\longrightarrow H^q(X,T_X),\qquad h\longmapsto[h]
$$

> は複素線形同型である。分解の三成分は一意だが、完全形式の原始形式そのものは一意とは限らない。
<!-- formal-statement-end -->

### 証明の見取り図

先ほど計算した楕円型主記号に、[Hodge作用素のスペクトル構成](../../GA/GA6/index.md#thm-ga6-finite-harmonic)を接束の各成分へ拡張して適用する。零固有空間を取り除いた正固有空間で逆を取り、$dd^*+d^*d$ を展開する。コホモロジーについては、閉形式の余完全成分が零になることを内積から示す。

<!-- proof-start -->
### 証明

局所Hermite正規直交枠で $\Delta_q$ の主記号が正定値スカラー倍の恒等行列であることは上に計算した。したがって $E$ の階数を有限個の成分として扱う楕円型の事前評価・コンパクト埋め込みが成り立つ。具体的には[楕円型評価とコンパクト性](../../GA/GA6/index.md#lem-ga6-elliptic)の局所証明でスカラーのFourier係数を有限次元ベクトルへ替え、最高階部分に $|\xi^{0,1}|^2I$ を用いる。下位階項は低次Sobolevノルムへ吸収され、有限個の座標近傍で貼り合わせる。こうして非負自己共役な $\Delta_q$ の離散スペクトル、有限次元の零固有空間、零固有値以外の正のスペクトルギャップが得られる。これは[Kähler恒等式](../../HOD/HOD1-04/index.md#thm-hod1-04-kahler-identities)からの結論ではない。

正規直交固有形式 $e_j$ に対して、正固有値 $\lambda_j$ の成分を $1/\lambda_j$ 倍し、零固有成分を消す作用素を $G_q$ とする。[Green作用素の定義](../../GA/GA6/index.md#def-ga6-green-operator)と同じスペクトル計算で

$$
\Delta_qG_qu=G_q\Delta_qu=u-H_qu.
$$

右辺が滑らかなら楕円型正則性を繰り返して $G_qu$ も滑らかになる。$\Delta_q=dd^*+d^*d$ を代入して表示した分解を得る。三成分の相互直交性は $d^2=(d^*)^2=0$ と部分積分による。例えば

$$
(da,d^*b)=(d^2a,b)=0,\qquad
(h,da)=(d^*h,a)=0.
$$

最後に $du=0$ なら $d^*dG_qu$ は閉かつ余完全なので

$$
\|d^*dG_qu\|^2=(d(d^*dG_qu),dG_qu)=0
$$

となる（$d$ と $G$ の交換性は次節で別途示すが、ここでは $d u=0$ と三成分分解の $d$ を取っても同じ結論が得られる）。よって $u=H_qu+d(d^*G_qu)$。逆に調和形式 $h=da$ が完全なら

$$
\|h\|^2=(h,da)=(d^*h,a)=0
$$

なので $h=0$。すべての閉形式類には調和代表が存在し、その代表は一意である。$\square$
<!-- proof-end -->

**適用範囲の区別。** [Kähler上の通常のHodge分解](../../HOD/HOD1-06/index.md#thm-hod1-06-hodge-decomposition)はスカラー値形式の型分解を扱う。ここでは**接束値**のDolbeault複体を扱い、計量の選択により調和代表は変わるが $H^q(X,T_X)$ の同型類と次元は変わらない。また $E=T_X$ に一般のKähler恒等式のLaplacian一致を無条件に転用していない。

## 3. 微分の逆を「調和成分を除いて」作る

$d$ に大域的な真の逆は存在しない。例えば調和な $\eta\in\mathcal H^2_T$ が非零なら、$\eta=dv$ と書くことはできない。一方、$d$ で完全な成分だけに限れば、Green作用素を使って原始形式を選べる。

その選択に使う演算子を $h=d^*G$ とする。$h$ は次数を一つ下げ、微分を「戻す」方向の作用素である。$H$ と $h$ の役割を混同しないようにしよう。

<a id="def-def1-06-harmonic-gauge"></a>

<!-- formal-statement-start -->
> **定義（調和ゲージとホモトピー作用素）**
>
> 上のHodge分解の各次数に対して、$h_q=d^*G_q:C^q\to C^{q-1}$ をホモトピー作用素と呼ぶ。$t\in\mathcal H_T^1$ を固定したとき、$\phi\in C^1$ が

$$
d^*\phi=0,\qquad H_1\phi=t
$$

> を満たす条件を、ここでの**調和ゲージ条件**と呼ぶ。$t$ は一次変形類を表す調和パラメータであり、$h$ の定義は選んだHermite計量に依存する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-def1-06-harmonic-gauge -->
**定義の確認**。上の平坦トーラスで $t=a\,d\bar z^1\otimes\partial_{z^1}$ とすると、$H_1t=t$、$d^*t=0$ なのでゲージ条件を満たす。反対に $\phi=t+dv$ で $dv\ne0$ なら $H_1\phi=t$ だが

$$
(d^*\phi,v)=(d^*dv,v)=\|dv\|^2>0
$$

だから $d^*\phi\ne0$ となり、同じ調和成分を持つだけではゲージ条件を満たさない。$v$ は任意の滑らかな非正則接束切断でよい。
<!-- definition-example-end -->

<a id="lem-def1-06-homotopy"></a>

<!-- formal-statement-start -->
> **補題（Green作用素の連鎖ホモトピー恒等式）**
>
> 上のコンパクトHermite多様体の接束値Dolbeault複体について、次数を合わせた作用素として

$$
dG=Gd,\qquad d^*G=Gd^*,\qquad
dh+hd=I-H,\qquad h^2=0,\qquad Hh=hH=0
$$

> が滑らかな形式上で成り立つ。特に $du=0$ なら $u=Hu+dhu$、$u=dv$ なら $Hu=0$ かつ $dhu=u$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$d\Delta=\Delta d$ と $d^*\Delta=\Delta d^*$ は $d^2=(d^*)^2=0$ から直接確認する。調和空間とその直交補空間を保存するので、逆作用素 $G$ とも交換する。するとHodge分解を $dh+hd$ と書ける。

<!-- proof-start -->
### 証明

次数を省略し、例えば

$$
d\Delta=d(dd^*+d^*d)=dd^*d
           =(dd^*+d^*d)d=\Delta d
$$

となる。随伴を取れば $d^*\Delta=\Delta d^*$。$h_0\in\ker\Delta$ なら $\|dh_0\|^2+\|d^*h_0\|^2=0$ なので $dh_0=d^*h_0=0$。従って $d$ と $d^*$ は調和空間を零へ写し、その直交補空間を自身の次次数へ写す。実際、調和 $v$ に対し $(du,v)=(u,d^*v)=0$ である。

$u$ が調和空間に直交するとき $\Delta( dG u)=du=\Delta(Gdu)$ で、双方とも調和空間に直交する。一意な直交補空間上の逆から $dGu=Gdu$。調和成分については両辺零である。同じ議論を $d^*$ へ適用する。

よって各次数で

$$
dh+hd=dd^*G+d^*Gd
      =dd^*G+d^*dG
      =\Delta G=I-H.
$$

さらに $(d^*)^2=0$ と $Gd^*=d^*G$ より $h^2=d^*Gd^*G=(d^*)^2G^2=0$。$Hh=0$ は $h$ の像が $d^*$ の像に含まれ調和空間に直交することから従い、$hH=0$ は $GH=0$ から従う。$du=0$ なら $u=Hu+dhu$、$u=dv$ なら $Hu=0$ かつ $dhu=u$ を得る。$\square$
<!-- proof-end -->

**どこで使うか。** 閉形式 $q\in C^2$ について $H_2q=0$ なら、$q=dhq$ である。したがって $d\beta=-q$ の解を探すとき、$\beta=-hq$ と選べる。この「特定の原始形式を返す」性質が次の固定点方程式の核心である。

## 4. 調和ゲージから固定点方程式へ

有限次元の複素ベクトル空間 $\mathcal H_T^1$ の基底を $e_1,\ldots,e_m$ とする。ここで $m=\dim H^1(X,T_X)$ は有限である。形式変数 $s_1,\ldots,s_m$ を使い

$$
t(s)=\sum_{a=1}^m s_ae_a,\qquad
\phi(s)=t(s)+\text{全次数が2以上の項}
$$

と置く。全次数とは、例えば $s_1^2s_2$ を次数3と数える規約である。以降の作用素は係数形式ごとに作用する。

前章の[Maurer–Cartan方程式](../DEF1-03/index.md#thm-def1-03-maurer-cartan)を $d\phi+\tfrac12[\phi,\phi]=0$ と書く。調和ゲージの $d^*\phi=0$ は、先ほど示した [$Gd^*=d^*G$](#lem-def1-06-homotopy) により $h\phi=Gd^*\phi=0$ も意味する。さらに同じ補題の $dh+hd=I-H$ を $\phi$ へ使えば

$$
\phi-H\phi=dh\phi+hd\phi=hd\phi
              =-\frac12h[\phi,\phi].
$$

つまり

$$
\boxed{\ \phi=t-\frac12h[\phi,\phi]\ }.
$$

これは微分方程式の全成分をまだ解いた式ではない。$h$ が調和成分を消すため、右辺だけでは $H_2[\phi,\phi]$ の零性を保証しない。その残りを後で検査する。

<a id="thm-def1-06-fixed-point"></a>

<!-- formal-statement-start -->
> **定理（Kuranishi固定点方程式と一意な形式解）**
>
> 上記のコンパクトHermite多様体 $X$ と調和パラメータ $t(s)\in\mathcal H_T^1\otimes(s_1,\ldots,s_m)$ に対し、形式的べき級数環上で

$$
\phi=t-\frac12h[\phi,\phi],\qquad \phi(0)=0
$$

> を満たす $\phi\in C^1[[s_1,\ldots,s_m]]$ がただ一つ存在する。この解は $H_1\phi=t$ と $d^*\phi=0$ を満たす。また、調和ゲージ条件を満たす形式的Maurer–Cartan解は必ずこの固定点解である。ここで存在・一意性は各係数を代数的に決めるという意味であり、級数の解析的収束は主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

右辺の括弧は二次から始まる。従って次数 $r$ の係数は、それより低い次数の係数だけで計算できる。帰納法で全係数が一意に決まる。さらに $Hh=0$、$d^*h=0$ がゲージ条件を保証する。

<!-- proof-start -->
### 証明

一変数で書くと分かりやすい。$t=\varepsilon\alpha$、$\alpha\in\mathcal H^1_T$ とし、$\phi=\sum_{r\ge1}\varepsilon^r\phi_r$ とする。括弧の双線形性と次数1同士の対称性から、係数比較により

$$
\phi_1=\alpha,\qquad
\phi_r=-\frac12h\sum_{i=1}^{r-1}[\phi_i,\phi_{r-i}]
\quad(r\ge2).
$$

右辺の添字は常に $1\le i,r-i<r$。従って帰納的にただ一つの係数が定まる。多変数の場合も $s^\nu=s_1^{\nu_1}\cdots s_m^{\nu_m}$ の全次数 $|\nu|$ に関する同じ帰納法で、有限個の分割 $\mu+\lambda=\nu$ を足せばよい。各次数で有限和しかないため、収束の議論は使っていない。

$H\phi=Ht-\frac12Hh[\phi,\phi]=t$。また $d^*\phi=d^*t-\tfrac12(d^*)^2G[\phi,\phi]=0$。逆に形式的MC解で $H\phi=t$、$d^*\phi=0$ なら $h\phi=Gd^*\phi=0$。連鎖ホモトピー恒等式で $\phi=t+hd\phi$ と書き、MC方程式を代入すると固定点式に戻る。$\square$
<!-- proof-end -->

**二次・三次の計算を見ておこう。** 一方向 $\alpha$ なら

$$
\begin{aligned}
\phi_1&=\alpha,\\
\phi_2&=-\frac12h[\alpha,\alpha],\\
\phi_3&=-h[\alpha,\phi_2]
       =\frac12h[\alpha,h[\alpha,\alpha]].
\end{aligned}
$$

たとえ $\phi_2$ が形式として定義できても、$d\phi_2=-\tfrac12[\alpha,\alpha]$ が成立するとは限らない。必要なのは二次障害の調和射影が零となることである。固定点解は「全ての成分が既に解けた解」ではなく、**障害を測定できる正規化された候補**である。

## 5. 残った調和成分がKuranishi障害になる

固定点解 $\phi(s)$ が得られたら、次数2の曲率を調和射影する。調和射影は有限次元の $\mathcal H_T^2$ に値をとるから、無限次元に見えた可解性条件が有限個の形式的方程式に移る。

<a id="def-def1-06-kuranishi-map"></a>

<!-- formal-statement-start -->
> **定義（形式的Kuranishi障害写像）**
>
> 上の一意な固定点解 $\phi(s)$ に対し、調和次数2空間に値を持つ形式的写像を

$$
\kappa(s)=\frac12H_2[\phi(s),\phi(s)]
\in\mathcal H_T^2[[s_1,\ldots,s_m]]
$$

> と定める。定数項と一次項は零である。$\mathcal H_T^2\simeq H^2(X,T_X)$ の同定で、$\kappa$ はコホモロジー値の障害を表す。現段階で「解析的写像」や「解析空間の零点集合」とは呼ばない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-def1-06-kuranishi-map -->
**定義の確認**（楕円曲線）。平坦な楕円曲線 $X=\mathbb C/(\mathbb Z+i\mathbb Z)$ で $z=x+iy$ とする。接束の定数枠で、[平坦トーラスのDolbeault Laplacian固有値](../../HOD/HOD1-01/index.md#prop-hod1-01-flat-torus-adjoints)を周期1へ読み替えると、Fourierモード $f_{k,\ell}=e^{2\pi i(kx+\ell y)}$ に対し

$$
\Delta_1(f_{k,\ell}\,d\bar z\otimes\partial_z)
=-2(\partial_z\partial_{\bar z}f_{k,\ell})\,d\bar z\otimes\partial_z
=2\pi^2(k^2+\ell^2)f_{k,\ell}\,d\bar z\otimes\partial_z.
$$

非零周波数では固有値が正で、零周波数の定数形式だけが調和である。従って

$$
\mathcal H_T^1=\mathbb C\,d\bar z\otimes\partial_z
$$

である。複素次元1なので $C^2=0$。一次方向 $t=s\,d\bar z\otimes\partial_z$ について $[t,t]=0$ となる。固定点式は $\phi=t$、定義から $\kappa(s)=0$ であり、形式的MC方程式は成立する。

さらに定数Beltrami係数 $s$ が十分小さければグラフと共役は直和になる。[MC可積分性判定](../DEF1-03/index.md#thm-def1-03-maurer-cartan)から実際の複素構造にもなる。ただしこれは有限式の例だけの確認であり、一般の形式解の収束を意味しない。
<!-- definition-example-end -->

<a id="thm-def1-06-kuranishi-equivalence"></a>

<!-- formal-statement-start -->
> **定理（調和障害の消滅とMaurer–Cartan方程式）**
>
> $X$ を上記のコンパクトHermite多様体とし、$\phi(s)$ を[固定点方程式](#thm-def1-06-fixed-point)の一意な形式解、$\kappa(s)$ を[形式的障害写像](#def-def1-06-kuranishi-map)とする。このとき形式的べき級数として

$$
d\phi+\frac12[\phi,\phi]=0
\quad\Longleftrightarrow\quad
\kappa(s)=0
$$

> が成立する。したがって調和ゲージに正規化した形式的解の係数計算は、有限次元空間 $\mathcal H_T^1$ から $\mathcal H_T^2$ への形式的障害写像へ帰着する。ただし、一般の小変形族との対応や解析的収束をこの定理は主張しない。
> より一般に、形式的べき級数環 $R=\mathbb C[[s_1,\ldots,s_m]]$ の任意のイデアル $J$ について、$\kappa=0$ と $F=0$ の同値は係数を $R/J$ へ写しても成立する。
<!-- formal-statement-end -->

### 証明の見取り図

曲率 $F=d\phi+\tfrac12[\phi,\phi]$ を置く。固定点式から $F$ の非調和成分をホモトピー作用素で表示する。[Bianchi恒等式](../DEF1-05/index.md#lem-def1-05-bianchi)と[次数付き括弧の三項関係](../DEF1-05/index.md#lem-def1-05-graded-identities)を使うと $F=\kappa+h[F,\phi]$ となる。後者は普通の[Lie括弧の基本恒等式](../../GEO/GEO5/index.md#thm-geo5-bracket-identities)の次数付き版である。$\kappa=0$ なら、$F$ の最初の非零次数が右辺で一つ上がるという矛盾を利用する。

<!-- proof-start -->
### 証明

$q=\tfrac12[\phi,\phi]\in C^2[[s]]$ とする。固定点式 $\phi=t-hq$ と $dt=0$ から $d\phi=-dhq$。連鎖ホモトピー恒等式 $I-H=dh+hd$ を $q$ に適用すると

$$
F=d\phi+q=-dhq+q=Hq+hdq=\kappa+hdq.
$$

次に[次数付き微分則](../DEF1-05/index.md#lem-def1-05-graded-identities)を次数1の $\phi$ に適用すると

$$
\begin{aligned}
dq&=\frac12\{[d\phi,\phi]-[\phi,d\phi]\}\\
  &=[d\phi,\phi]=[F-q,\phi].
\end{aligned}
$$

最後の式で次数2と1の反対称性を使った。次数1の三つ組についての[次数付きJacobi恒等式](../DEF1-05/index.md#lem-def1-05-graded-identities)は $3[\phi,[\phi,\phi]]=0$ を与える。係数体は $\mathbb C$ なので $[q,\phi]=0$。よって

$$
dq=[F,\phi],\qquad F=\kappa+h[F,\phi].
$$

もし $F=0$ なら $H_2F=H_2d\phi+H_2q=\kappa$ であり、$H_2d\phi=0$ より $\kappa=0$。

逆に $\kappa=0$ とする。$F$ は全次数2以上から始まる。仮に非零なら最小次数 $r\ge2$ の成分 $F_r$ がある。一方、$\phi$ は次数1以上から始まり、$h$ は形式変数の次数を変えない。従って括弧の $r$ 次成分は零であり、固定点式の $r$ 次を比較すると

$$
F_r=h([F,\phi]_r)=h(0)=0
$$

となり矛盾する。ゆえに $F=0$。

イデアル $J$ で割った環でも、同じ恒等式が成立する。$\mathfrak m=(s_1,\ldots,s_m)$ と置く。

$M=C^2\widehat\otimes(R/J)$ は、$C^2$ 値の形式級数を $J$ で割り、$\mathfrak m$ の次数について完備化した加群を表す。$\phi$ は一次以上から始まるので、$M$ 上の線形作用素

$$
T(U)=h[U,\phi]
$$

は $T(\mathfrak m^rM)\subset\mathfrak m^{r+1}M$ を満たす。従って $\sum_{j\ge0}T^j$ は各形式次数では有限和であり、$(I-T)\sum_{j\ge0}T^j=I$ が係数ごとに成り立つ。

$F=\kappa+T(F)$ にこの形式的逆を作用させると

$$
F=\sum_{j\ge0}T^j(\kappa).
$$

よって $R/J$ 上でも $\kappa=0$ なら $F=0$ である。逆向きは先ほどと同じ $H_2F=\kappa$ による。ここで使ったのは次数ごとの有限計算だけで、解析的収束ではない。$\square$
<!-- proof-end -->

**形式的な零点集合の読み方。** $\mathcal H_T^2$ の基底を選び、$\kappa$ の成分 $\kappa_1(s),\ldots,\kappa_r(s)$ が生成するイデアルを考える。

$$
I=(\kappa_1,\ldots,\kappa_r)\subset R.
$$

$\kappa$ が $R$ 上で恒等的に零である必要はなく、商環 $R/I$ 上で零になることが重要である。定理を $J=I$ へ適用すると、$\phi$ はこの商環上で形式的Maurer–Cartan解となる。この意味で有限個の障害方程式が、**形式的な基底の方程式**を与える。$I$ が収束する正則関数によって定義されるかは次章の問題である。

**二次障害への接続。** 一変数 $t=\varepsilon\alpha$ では $\phi=\varepsilon\alpha+O(\varepsilon^2)$ なので

$$
\kappa(\varepsilon)
=\frac{\varepsilon^2}{2}H_2[\alpha,\alpha]+O(\varepsilon^3).
$$

調和代表同型を通せば二次係数は[前章の二次障害類](../DEF1-05/index.md#def-def1-05-primary-obstruction)そのものになる。高次の係数は $h$ により選ばれた低次補正に依存するため、任意の補正列で作った高次障害類と無条件で一字一句同じだとは主張しない。

**$H^2\ne0$ でも障害があるとは限らない。** 前述の平坦な二次元複素トーラスで定数係数の $\alpha$ は調和である。$t=\sum_{i,j}s_{ij}d\bar z^j\otimes\partial_{z^i}$ と置けば、全ての係数が正則方向で定数なので $[t,t]=0$、$\phi=t$、$\kappa=0$。一方 $\eta=d\bar z^1\wedge d\bar z^2\otimes\partial_{z^1}$ は非零の調和形式で、定理の同型により $H^2(X,T_X)\ne0$ である。障害の**行き先が非零**という情報だけでは、障害写像が非零とは言えない。

## 6. どこまででき、何が残ったか

この章で、$H^1(X,T_X)$ を調和パラメータ空間として取り、$\bar\partial_T^*$ によるゲージ条件の下で一意な形式的固定点解を構成できた。さらに $H^2(X,T_X)$ 値の形式的障害写像 $\kappa$ の零性と、正規化された形式的Maurer–Cartan解の存在が同値と分かった。

ただし、**形式的な係数の存在 ≠ 解析的な収束**である。$h$ のSobolev評価、括弧の微分損失を管理する適切な関数空間、固定点方程式を解析的に解く仕組みが必要となる。また、得られた解から実際の局所複素構造を作るにはグラフと複素共役の直和性を確認しなければならない。解析的収束と有限次元の局所基底は次章、任意の小変形を捕捉する局所完全性はその次の章で扱う。

## 7. 演習――調和成分と障害を取り違えない

<a id="ex-def1-06-a01"></a>
#### DEF1-06-A01 Laplacianの主記号
- Level: A

$a\in T_x^{0,1*}X$ とし、外積作用素 $\varepsilon(a)$ と内部積作用素 $\iota(a^\sharp)$ を考える。$\varepsilon(a)\iota(a^\sharp)+\iota(a^\sharp)\varepsilon(a)=|a|^2I$ を正規直交基底で確認し、$\Delta_q$ の楕円性との関係を述べよ。

<!-- solution-start -->
**詳細解答。** $a=0$ なら両辺は零である。$a\ne0$ なら $a=ce^1$ と取れるようユニタリ基底を選ぶ。任意の基底単項式は、$e^1$ を含むものと含まないものに分かれる。従って一般の形式を $u=e^1\wedge v+w$（$v,w$ は $e^1$ を含まない）と一意に書ける。

$\iota_{e_1}(e^1\wedge v)=v$、$\iota_{e_1}w=0$ だから、$\varepsilon(a)=c\,e^1\wedge$ と $\iota(a^\sharp)=\bar c\,\iota_{e_1}$ を順に作用させると

$$
\begin{aligned}
\varepsilon(a)\iota(a^\sharp)u&=|c|^2e^1\wedge v,\\
\iota(a^\sharp)\varepsilon(a)u&=|c|^2w.
\end{aligned}
$$

和は $|c|^2u=|a|^2u$ である。実共変ベクトル $\xi\ne0$ の $(0,1)$ 成分 $a=\xi^{0,1}\ne0$ に適用すると、二階主記号 $\sigma_2(\Delta_q)(\xi)=|a|^2I$ は可逆であり、楕円型となる。
<!-- solution-end -->

<a id="ex-def1-06-a02"></a>
#### DEF1-06-A02 調和形式と完全形式
- Level: A

コンパクト境界なしの $X$ で、$u\in C^q$ が $\Delta_qu=0$ なら $du=d^*u=0$ を示せ。さらに調和形式が $u=dv$ と書けるなら $u=0$ を示せ。

<!-- solution-start -->
**詳細解答。** 随伴の定義を二度使うと

$$
(\Delta_qu,u)=(dd^*u,u)+(d^*du,u)
=\|d^*u\|^2+\|du\|^2.
$$

$\Delta_qu=0$ なら左辺は零で、右辺の二項は非負だから $du=d^*u=0$。さらに $u=dv$ の場合は

$$
\|u\|^2=(u,dv)=(d^*u,v)=0.
$$

正定値な $L^2$ 内積のノルムが零だから $u=0$。コンパクト・境界なしの仮定が部分積分を支える。
<!-- solution-end -->

<a id="ex-def1-06-a03"></a>
#### DEF1-06-A03 閉形式をGreen作用素で戻す
- Level: A

$du=0$ のとき $u=Hu+dhu$ を証明し、さらに $u=dv$ なら $dhu=u$ となることを示せ。

<!-- solution-start -->
**詳細解答。** [連鎖ホモトピー恒等式](#lem-def1-06-homotopy)を $u$ に作用させると

$$
u-Hu=dhu+hdu.
$$

$du=0$ なら後項が零なので $u=Hu+dhu$。さらに $u=dv$ なら、任意の調和形式 $w$ に対して $(dv,w)=(v,d^*w)=0$ であるため $Hu=0$。よって $u=dhu$。閉形式一般には $Hu$ が残ることに注意する。
<!-- solution-end -->

<a id="ex-def1-06-a04"></a>
#### DEF1-06-A04 調和成分だけではゲージにならない
- Level: A

$t\in\mathcal H_T^1$、$v\in C^0$、$dv\ne0$ とし、$\psi=t+dv$ とする。$H_1\psi=t$ と $d^*\psi\ne0$ を示せ。

<!-- solution-start -->
**詳細解答。** $H_1t=t$ であり、任意の調和 $w$ について $(dv,w)=(v,d^*w)=0$ なので $H_1dv=0$。従って $H_1\psi=t$。

一方 $d^*\psi=d^*dv$ が零だと仮定すると

$$
0=(d^*dv,v)=\|dv\|^2>0
$$

となり矛盾する。ゆえに $\psi$ は同じ調和パラメータを持っても調和ゲージを満たさない。
<!-- solution-end -->

<a id="ex-def1-06-b01"></a>
#### DEF1-06-B01 四次までの固定点係数
- Level: B

$t=\varepsilon\alpha$、$\alpha\in\mathcal H_T^1$ とする。固定点方程式の $\phi_2,\phi_3,\phi_4$ を $h$ と括弧だけで表せ。$\phi_4$ に現れる組の係数2を確かめよ。

<!-- solution-start -->
**詳細解答。** [固定点係数の帰納式](#thm-def1-06-fixed-point)を $r=2,3,4$ へ順に適用する。次数1同士の括弧は対称なので

$$
\begin{aligned}
\phi_2&=-\frac12h[\alpha,\alpha],\\
\phi_3&=-\frac12h\bigl([\alpha,\phi_2]+[\phi_2,\alpha]\bigr)
=-h[\alpha,\phi_2]
=\frac12h[\alpha,h[\alpha,\alpha]],\\
\phi_4&=-\frac12h\bigl([\alpha,\phi_3]+[\phi_2,\phi_2]+[\phi_3,\alpha]\bigr)\\
&=-h[\alpha,\phi_3]-\frac12h[\phi_2,\phi_2].
\end{aligned}
$$

最終式に前二式を代入すると

$$
\phi_4=-\frac12h[\alpha,h[\alpha,h[\alpha,\alpha]]]
-\frac18h[h[\alpha,\alpha],h[\alpha,\alpha]].
$$

和で $(1,3),(3,1)$ が二組、$(2,2)$ は一組であることが係数の違いを生む。
<!-- solution-end -->

<a id="ex-def1-06-b02"></a>
#### DEF1-06-B02 正規化された二次障害
- Level: B

$\alpha\in\mathcal H_T^1$、$q_2=\tfrac12[\alpha,\alpha]$ とする。$dq_2=0$ を示し、$H_2q_2=0$ の場合に $\phi_2=-hq_2$ が $d\phi_2=-q_2$ と $d^*\phi_2=0$ を満たすことを証明せよ。

<!-- solution-start -->
**詳細解答。** $d\alpha=0$ なので[次数付き微分則](../DEF1-05/index.md#lem-def1-05-graded-identities)により $d[\alpha,\alpha]=[d\alpha,\alpha]-[\alpha,d\alpha]=0$。ゆえに $dq_2=0$。連鎖ホモトピー恒等式を $q_2$ へ使うと

$$
q_2-H_2q_2=dhq_2+hdq_2=dhq_2.
$$

$H_2q_2=0$ なら $dhq_2=q_2$ なので $d(-hq_2)=-q_2$。また $d^*\phi_2=-(d^*)^2Gq_2=0$。$H_2q_2\ne0$ の場合は同じ式の右辺に調和残差があり、二次補正は存在しない。
<!-- solution-end -->

<a id="ex-def1-06-b03"></a>
#### DEF1-06-B03 曲率を最小次数で消す
- Level: B

形式的固定点解について $F=\kappa+h[F,\phi]$ を出発点として、$\kappa=0$ なら $F=0$ を次数帰納法で示せ。$h$ が形式変数の次数を変えない点を明示せよ。

<!-- solution-start -->
**詳細解答。** $\phi$ は定数項零で次数1から始まる。$d\phi$ の一次項は $dt=0$ なので、$F$ は次数2以上から始まる。$\kappa=0$ なら $F=h[F,\phi]$。

$F$ の次数 $r$ 以下が零だと仮定する。このとき $[F,\phi]$ の次数 $r+1$ 以下も零である。$h=d^*G$ は係数形式へ作用するだけで形式変数の次数を変更しないから、右辺も次数 $r+1$ 以下が零になる。

最初の次数2からこの論法を繰り返すと全係数が零で $F=0$。別法として最小非零次数 $r$ を仮定し、$r$ 次係数の比較で矛盾を得てもよい。
<!-- solution-end -->

<a id="ex-def1-06-b04"></a>
#### DEF1-06-B04 二次元トーラスの非零障害空間と零障害写像
- Level: B

平坦 $X=\mathbb C^2/(\mathbb Z+i\mathbb Z)^2$ について、定数係数 $\mathcal H_T^1$ の基底を四つ挙げ、$\mathcal H_T^2$ の非零元を一つ示せ。任意の定数係数 $t\in\mathcal H_T^1$ に対し $\kappa(t)=0$ を直接確かめよ。

<!-- solution-start -->
**詳細解答。** 接束は $\partial_{z^1},\partial_{z^2}$ で大域自明化する。従って $d\bar z^j\otimes\partial_{z^i}$（$i,j=1,2$）の四つは定数係数で $d=d^*=0$ の調和形式となる。

[平坦トーラスのFourier固有値計算](../../HOD/HOD1-01/index.md#prop-hod1-01-flat-torus-adjoints)を2変数へ適用する。第2節の $d,d^*$ の局所式と外積・内部積の交代関係から、定数形式基底 $\omega$ に対して

$$
\Delta_q(f\omega)=-2\sum_{j=1}^2
(\partial_{z^j}\partial_{\bar z^j}f)\,\omega.
$$

周波数 $k=(k_1,\ell_1,k_2,\ell_2)\in\mathbb Z^4$ の係数

$$
f_k=e^{2\pi i(k_1x_1+\ell_1y_1+k_2x_2+\ell_2y_2)},\qquad
\Delta_q(f_k\omega)=2\pi^2|k|^2f_k\omega
$$

について、$k\ne0$ の成分は調和になれず、零モードは上の四つに尽くされるので基底となる。同じ理由で $\eta=d\bar z^1\wedge d\bar z^2\otimes\partial_{z^1}$ は非零の調和2形式である。[調和代表同型](#thm-def1-06-tangent-hodge)により $H^2(X,T_X)\ne0$。

$t=\sum_{i,j} s_{ij}d\bar z^j\otimes\partial_{z^i}$ の全係数は $z$ に関して定数だから、[括弧の成分式](../DEF1-03/index.md#def-def1-03-bracket)にある $\partial_{z^p}s_{ij}$ は全て零。従って $[t,t]=0$、固定点式の一意性より $\phi=t$、ゆえに $\kappa=\tfrac12H_2[t,t]=0$。非零の行き先空間から非零の写像は結論できない。
<!-- solution-end -->

<a id="ex-def1-06-c01"></a>
#### DEF1-06-C01 調和ゲージの構成を一巡する
- Level: C

コンパクトHermite複素多様体 $X$ の $E=T_X$ に対して次を証明せよ。

1. 調和代表 $t\in\mathcal H_T^1$ から一意の形式的固定点解 $\phi=t-\tfrac12h[\phi,\phi]$ を得る。
2. $F=d\phi+\tfrac12[\phi,\phi]$、$\kappa=\tfrac12H_2[\phi,\phi]$ に対し $F=\kappa+h[F,\phi]$ を導く。
3. $\kappa=0$ と $F=0$ が形式的に同値であることを証明し、これだけでは解析的な変形族の存在が従わない理由を述べよ。

<!-- solution-start -->
**詳細解答。** まず[Green作用素の連鎖ホモトピー](#lem-def1-06-homotopy)で $dh+hd=I-H$、$Hh=0$、$d^*h=0$ を得る。

$t=\sum s_ae_a$ を一次項に固定し $\phi=\sum_{|\nu|\ge1}s^\nu\phi_\nu$ とする。各 $\nu$ の右辺の括弧は $\mu+\lambda=\nu$、$|\mu|,|\lambda|\ge1$ の係数だけを使う。したがって全次数が小さい係数から帰納的に定まり、任意の次数で有限和なので一意の形式解を得る。$H\phi=t$、$d^*\phi=0$ は $Hh=d^*h=0$ から従う。

次に $q=\tfrac12[\phi,\phi]$ とすれば $d\phi=-dhq$、従って

$$
F=q-dhq=Hq+hdq=\kappa+hdq.
$$

[次数付き微分則](../DEF1-05/index.md#lem-def1-05-graded-identities)と次数1のJacobi恒等式を順に使って

$$
dq=[d\phi,\phi]=[F-q,\phi]=[F,\phi]
$$

と計算できる（$[q,\phi]=0$）。よって $F=\kappa+h[F,\phi]$。

$F=0$ なら $H_2F=\kappa$ だから $\kappa=0$。逆に $\kappa=0$ なら $F=h[F,\phi]$。$F$ の最小次数が $r\ge2$ なら右辺の最小次数は $r+1$ 以上なので矛盾し、$F=0$。

この推論は各次数についての**形式的恒等式**であり、$\sum s^\nu\phi_\nu$ の係数ノルムを評価していない。従って収束半径が正であること、Beltramiグラフとその共役の直和性、実際の変形族の局所完全性はこの結果だけでは従わない。
<!-- solution-end -->
