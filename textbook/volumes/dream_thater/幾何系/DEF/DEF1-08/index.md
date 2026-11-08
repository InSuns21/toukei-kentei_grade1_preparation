# DEF1-08 Kuranishi構成III――局所完全性と普遍性の限界

<!-- definition-example-audit: strict -->

## 1. 「小さい複素構造が並ぶ」と「すべての族が得られる」は違う

[DEF1-07の解析的Kuranishi基底](../DEF1-07/index.md#def-def1-07-kuranishi-germ)は、コンパクト複素多様体 $X$ の小さい可積分複素構造を、有限次元の正則方程式 $\kappa(t)=0$ の零点で作った。だが、これはまだ**候補を作った**という主張である。別の人が作った小さい正則変形族が、この候補のどこから来たかを決めるには、族全体を比較する必要がある。

三つの問いを順に分けよう。

1. **存在**：Kuranishiの各パラメータから、単なる複素構造の集合ではなく、正則な変形族ができるか。
2. **局所完全性**：別の任意の小変形族は、その族を基底変更して得られるか。
3. **一意性**：同じ族を与える基底変更は一つだけか。

第三の問いは第二の問いからは従わない。局所座標を取り替える自己同型が、異なるパラメータ表示を同じ複素多様体へ移してしまうことがある。

以下 $X$ は複素次元 $n\ge1$ のコンパクト・境界なし複素多様体とする。[接束値Hodge分解](../DEF1-06/index.md#thm-def1-06-tangent-hodge)の記号に従い、$d=\bar\partial_T$、$d^*$ をその随伴、$H_q$ を調和射影、$G_q$ をGreen作用素、$h_q=d^*G_q$ とする。$m=\dim H^1(X,T_X)$、$r=\dim H^2(X,T_X)$ である。DEF1-07で得た正則写像は

$$
\phi(t)=t-\frac12h_2[\phi(t),\phi(t)],
\qquad
\kappa(t)=\frac12H_2[\phi(t),\phi(t)]
$$

を満たす。ここで $t=\sum_{a=1}^m t_ae_a\in\mathcal H_T^1$ は調和基底で書いた一次パラメータであり、$K=(\kappa^{-1}(0),0)$ は**方程式のイデアルも保持する**複素解析空間の芽である。$m=0$ なら $K$ は一点の芽と解する。

## 2. 何を「族の引き戻し」と呼ぶのか

最初に比較対象を定める。複素解析空間の芽 $(S,s_0)$ には、例えば通常の小円板だけでなく、収束冪級数環 $\mathbb C\{u\}/(u^2)$ で定まる**非被約な一点**も含める。この環では $u\ne0$ だが $u^2=0$ である。台集合だけを見ると通常の一点と区別できないため、変形を比較するときは構造層を捨てない。

**標識**とは、中心ファイバーがどの $X$ であるかを指定する同型 $\iota:X\overset{\sim}\longrightarrow\mathcal X_{s_0}$ のことである。[固有正則沈め込みによる変形族](../DEF1-01/index.md#def-def1-01-family)は、滑らかな基底の場合のこの概念である。基底に特異点や冪零元を許す場合には、各点のファイバーが滑らかな複素多様体となる**相対的に滑らかな固有正則写像**（局所的に基底上の $n$ 個の正則座標を持つもの）を用いる。

<a id="def-def1-08-marked-family"></a>

<!-- formal-statement-start -->
> **定義（標識付き変形と基底変更）**
>
> コンパクト複素多様体 $X$ の標識付き変形とは、基点付き複素解析空間の芽 $(S,s_0)$ 上の固有で相対的に滑らかな正則写像 $\pi:\mathcal X\to S$ と、中心ファイバーの同型 $\iota:X\to\mathcal X_{s_0}$ の組である。基点を保つ正則写像 $f:(S',s'_0)\to(S,s_0)$ による**基底変更**は、ファイバー積

$$
f^*\mathcal X=\mathcal X\times_S S'\longrightarrow S'
$$

> と誘導された中心ファイバーの標識で定める。二つの標識付き変形が同型とは、基底上の正則同型で中心ファイバーでは指定された標識を保つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-def1-08-marked-family -->
**定義の確認**（双数で一次方向を読む）。円板 $B$ の座標を $t$、基底を $A=\mathbb C[\varepsilon]/(\varepsilon^2)$ とし、環準同型 $f^\sharp:\mathbb C\{t\}\to A$ を $f^\sharp(t)=a\varepsilon$ とする。$f^\sharp(t)^2=a^2\varepsilon^2=0$ だから正則関数の冪級数は $F(t)\mapsto F(0)+aF'(0)\varepsilon$ に写る。$f$ は基点を保ち、一次速度は $a$ である。中心ファイバーは $t=\varepsilon=0$ の同じ $X$ となるので、標識も引き戻せる。

局所的に元の族が $U\times B\to B$ なら、ファイバー積の座標環は $\mathcal O_U\widehat\otimes A$ となり、$A$ 上の相対座標は元の $U$ の座標のままである。これで基底変更の正則性・相対的滑らかさ・中心ファイバーという各条件を確認した。
<!-- definition-example-end -->

では、存在だけを要求するのか、パラメータの微分または写像自体の一意性まで要求するのか。ここで三種類の名前を固定する。

<a id="def-def1-08-versal"></a>

<!-- formal-statement-start -->
> **定義（局所完全・半普遍・普遍変形）**
>
> $X$ の標識付き変形 $\mathcal U\to(B,0)$ について、任意の標識付き小変形 $\mathcal X\to(S,s_0)$ が、必要なら基底を縮小した後、ある基点を保つ正則写像 $f:(S,s_0)\to(B,0)$ により $f^*\mathcal U$ と標識を保って同型になるとき、$\mathcal U$ は**局所完全（versal）**である。
>
> 局所完全であり、任意のそのような $f$ の接写像 $df_{s_0}:T_{s_0}S\to T_0B$ が一意に決まるとき、**半普遍（semiuniversal、miniversal）**と呼ぶ。
>
> 局所完全であり、基底変更の芽 $f$ 自身が常に一意に決まるとき、**普遍（universal）**と呼ぶ。従って普遍なら半普遍、半普遍なら局所完全である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-def1-08-versal -->
**定義の確認**（余計なパラメータ）。$X$ の変形を一つ $\mathcal U\to(B,0)$ とし、$B'=B\times(\mathbb C,0)$ に同じ族を射影で引き戻す。$\mathcal U'=\operatorname{pr}_B^*\mathcal U$ は、$\mathcal U$ が局所完全なら局所完全である。実際、任意の族が $f:S\to B$ から得られれば、$(f,0):S\to B'$ からも得られる。

しかし $(f,0)$ と $(f,g)$（$g(s_0)=0$）は同じ族を与え、$dg_{s_0}$ を自由に変えられる。$S$ が一次元円板で $g(s)=s$ と選べば接写像も異なる。従って余分な円板を足した族は半普遍ではない。基底の次元を大きくしただけでは「より良いパラメータ」にならない。
<!-- definition-example-end -->

## 3. Kuranishiの方程式から正則な族を作る

[収束障害と可積分性の同値](../DEF1-07/index.md#thm-def1-07-convergent-mc)は、$t\in|K|$ に対し

$$
d\phi(t)+\frac12[\phi(t),\phi(t)]=0
$$

を与え、さらに左辺が障害関数 $\kappa_1,\ldots,\kappa_r$ の生成するイデアルに属する。後者の**イデアルとしての消滅**が、非被約基底の上でも構成を進めるために必要になる。台集合での点ごとの等式だけでは、例えば $u^2=0$ の冪零方向を制御できない。

複素接束値形式 $\phi$ は、局所座標 $z^1,\ldots,z^n$ で

$$
\phi=\sum_{i,j}\phi^i_{\bar j}(z,\bar z,t)\,
d\bar z^j\otimes\partial_{z^i}
$$

と書ける。[Beltramiの積分可能性](../DEF1-03/index.md#thm-def1-03-maurer-cartan)を相対的に使うと、基底方向を動かさずにファイバー方向へ作用する演算子

$$
D_{\bar j,t}=\partial_{\bar z^j}
+\sum_i\phi^i_{\bar j}(t)\partial_{z^i}
$$

の交換子が、$\kappa$ のイデアルを法として零になる。従って局所的には $D_{\bar j,t}w^k=0$ を満たす $n$ 個の相対正則座標 $w^k$ を探せばよい。これらが $t=0$ で元の $z^k$ と一致し、$z$ に関するJacobianが可逆なら、新しい正則座標系が得られる。

**相対座標を得る解析的手順。** 座標小球を少し縮め、通常の $\bar\partial$ 方程式の局所解作用素 $Q$ を用いる。$w^k=z^k+v^k$ と置けば、未知の補正 $v^k$ は概略

$$
v^k=-Q\bigl(\phi\mathbin{\lrcorner}\partial(z^k+v^k)\bigr)
$$

という固定点方程式を満たす。局所解作用素は $\bar\partial$ で失う一階を回復し、小さい $\phi$ による積と合成は収縮になる。$\bar\partial$-ホモトピー式の余りは $[D_{\bar i,t},D_{\bar j,t}]$ に比例するため、Maurer–Cartan曲率が障害イデアルに入ると、その余りも同イデアルを法として零になる。反復は基底 $t$ に正則な係数を持ち、一様優級数で収束する。

これは相対版の[Newlander–Nirenberg定理](../../CM/CM1-07/index.md#thm-cm1-07-newlander-nirenberg)を局所の$\bar\partial$解作用素で実行する場面である。$t=0$ で $D_{\bar j,0}=\partial_{\bar z^j}$、$w^k=z^k$ だから、Jacobianは恒等行列であり、$t$ を縮小すれば可逆性が保たれる。座標の重なりでは二つの解が互いに相対正則な遷移写像で結ばれる。

こうして $X$ の滑らかな台の上に、基底 $K$ 方向にも正則な相対座標を貼り合わせた族

$$
\pi_K:\mathcal X_K\longrightarrow K
$$

が得られる。各局所座標環は $\mathcal O_K\{w^1,\ldots,w^n\}$ 型なので基底上で平坦である。中心ファイバーは $X$、台でのファイバーは[DEF1-07の小複素構造](../DEF1-07/index.md#thm-def1-07-integrable-family)である。基底を十分縮小すれば、固定したコンパクト台 $X$ による局所自明化から固有性が従う。

重要なのは、「各 $t$ にNewlander–Nirenberg定理を適用した」というだけでは足りない点である。**$t$ に正則に依存する相対座標**を作る手順と、非被約構造での曲率のイデアル消滅がそろって、はじめて正則な族になる。

## 4. 任意の変形を調和ゲージに置く

Kuranishi族がすべての小変形を捉えるには、任意の可積分Beltrami微分 $\beta$ を滑らかな座標変更で正規化して、DEF1-07の固定点解へ戻す必要がある。まず「正規化の線形部分」を計算しよう。

一次の[ゲージ変更公式](../DEF1-03/index.md#prop-def1-03-gauge-linear)では、接束切断 $v\in C^0=\mathcal A^{0,0}(X,T_X)$ に対して $\beta\mapsto\beta-dv$ である。正規化条件を $d^*\beta=0$ とすれば、変化量は $-d^*dv$ になる。

ところが $dv=0$ となる $v$ には、零でない[正則ベクトル場](../DEF1-04/index.md#thm-def1-04-infinitesimal-aut)がある。これらは一次で複素構造を変えない。正規化を一意に解くため、$C^0$ の調和部分 $\mathcal H_T^0=\ker d=H^0(X,T_X)$ と直交する空間を選ぶ。

<a id="lem-def1-08-gauge-slice"></a>

<!-- formal-statement-start -->
> **補題（調和ゲージの線形化と小解の正規化）**
>
> $X$ をコンパクトHermite複素多様体とし、$C^0=\mathcal H_T^0\oplus V$ を $L^2$ 直交分解、$V=(\mathcal H_T^0)^\perp$ とする。$L=d^*d:C^0\to C^0$ は $V$ 上で可逆であり、任意の $b\in C^1$ に対して

$$
Lv=d^*b,\qquad v\in V
$$

> はただ一つの解 $v=L_V^{-1}d^*b$ を持つ。従って正規化写像 $v\mapsto d^*(b-dv)$ の原点での $v$ 方向の微分は $-L_V$ という同型である。
>
> さらに十分小さい滑らかな可積分Beltrami微分 $b$ は、恒等写像に近い滑らかな座標変更で $d^*\beta=0$ の形へ移せる。座標変更を決める生成元の $V$ 成分は近傍で一意に選べる。一般には $\mathcal H_T^0$ に由来する座標自由度までは消えない。
<!-- formal-statement-end -->

### 証明の見取り図

前半はHodge分解と正定値性から直接示す。後半では正規化方程式を非線形化し、線形部分 $d^*d$ の逆によって誤差を反復修正する。非線形の変数変換には微分損失があるので、収束の議論は滑らかな座標の尺度を揃え、局所座標で微分を一回補う楕円型評価を使う。

<!-- proof-start -->
### 証明

まず $\langle Lv,v\rangle=\langle dv,dv\rangle\ge0$ なので、$\ker L=\ker d=\mathcal H_T^0$ である。$L$ はコンパクト多様体上の楕円型作用素であり、[Green作用素のスペクトル構成](../../GA/GA6/index.md#def-ga6-green-operator)を次数0の接束値Dolbeault複体へ適用すると、$V$ 上の正固有値は0から離れ、$L^{-1}_V$ は存在する。$d^*b$ は任意の $h\in\mathcal H_T^0$ に対し

$$
\langle d^*b,h\rangle=\langle b,dh\rangle=0
$$

を満たすため $V$ に属する。従って $v=L_V^{-1}d^*b$ が唯一の解である。具体的に $v$ が小さいときのゲージ作用を $b^v=b-dv+Q(b,v)$ と書けば、$Q(0,0)=0$、$D_vQ(0,0)=0$ なので

$$
d^*b^v=d^*b-Lv+d^*Q(b,v).
$$

よって $d^*b^v=0$ は

$$
v=L_V^{-1}d^*b+L_V^{-1}d^*Q(b,v)
$$

と同値になる。$b,v$ が小さい範囲では、右辺の第二項は $v$ について二次または $b$ との積である。ここで、微分の一階損失を $L_V^{-1}d^*$ の一階正則性回復で補う。

局所座標を少し縮めながら滑らかな変数変換を構成し、[DEF1-07で用いた二次評価と縮小反復](../DEF1-07/index.md#lem-def1-07-sobolev-estimate)と同じ形の小ノルム評価を各段に適用すれば、補正 $v$ が収束する。

各段階で $\mathcal H_T^0$ 成分を零に保つ。線形化が $-L_V$ という同型であるため、小さい $V$ 成分の解は一意となる。

最後に、$\mathcal H_T^0$ の元は $dv=0$ なので線形化には見えない。これは[無限小正則自己同型の完全列](../DEF1-04/index.md#prop-def1-04-gauge-exact)の核そのものである。$\square$
<!-- proof-end -->

**正則な基底を持つ族ではもう一段の注意が要る。** 滑らかなファイバーごとに座標変更ができるだけでは、基底変更 $f$ の**正則性**が従わない。任意の正則族は局所正則座標の遷移関数を基底の正則関数として持つ。その遷移関数へ上の正規化を施すときは、基底の係数を複素数として扱って$\bar\partial$ホモトピーを解き、すべての補正を**基底に正則な**級数として選ぶ。Artin局所環上では以下の有限次数計算になり、通常の小円板では楕円型逆の評価と優級数によって収束させる。実パラメータでの滑らかな陰関数定理だけで「正則」と言っているわけではない。

具体的に、$\mathfrak m^{N+1}=0$ の局所Artin環 $A$ 上で正規化を行うと、[接束値のゲージ作用](../DEF1-03/index.md#def-def1-03-gauge)の次数 $j$ の未修正部分を $b_j$ として

$$
d^*dv_j=d^*b_j,\qquad
v_j=L_V^{-1}d^*b_j\in V\otimes(\mathfrak m^j/\mathfrak m^{j+1})
$$

を解ける。次数 $j$ のゲージ変更は $-dv_j$、二次以上の変更は $\mathfrak m^{j+1}$ に移る。$j=1,\ldots,N$ と繰り返せば有限回で終わる。$\mathfrak m^j/\mathfrak m^{j+1}$ は複素ベクトル空間なのでこの手順は基底係数に複素線形で、冪零方向を取りこぼさない。円板上では次数ごとの右辺に現れる積・合成の係数を、前段の有界なGreen型逆と収束する優級数で支配し、正規化した係数の和が小さい円板で収束する。この解析的な収束部分がKuranishiの完全性証明に必要な入力である。

## 5. 正規化できたら、固定点解に一致する

前節の正規化は任意の候補 $\beta$ を取り扱うためのものだった。いったん $d^*\beta=0$ かつMaurer–Cartan方程式が成立すれば、残りは既習のHodge分解だけで計算できる。

<a id="lem-def1-08-normalized-unique"></a>

<!-- formal-statement-start -->
> **補題（正規化された可積分解の一意性）**
>
> $X$ をコンパクトHermite複素多様体とし、$\beta\in H^s(X,\Lambda^{0,1}T^*X\otimes T_X)$（整数 $s>n+2$）を十分小さい可積分Beltrami微分とする。$d^*\beta=0$ を仮定し、$t=H_1\beta$ と置く。このとき

$$
\beta=\phi(t),\qquad \kappa(t)=0
$$

> が成立する。ただし $\phi,\kappa$ はDEF1-07で構成した収束固定点解と障害写像であり、等式は非被約なArtin基底上でもその構造環を法として成立する。
<!-- formal-statement-end -->

### 証明の見取り図

$d^*\beta=0$ ならHodge分解の $d$-完全成分が消え、$d\beta=-[\beta,\beta]/2$ を代入すると固定点方程式になる。正規化した解の一意性は、[収束するKuranishi固定点解](../DEF1-07/index.md#thm-def1-07-convergent-fixed-point)から得られる。

<!-- proof-start -->
### 証明

[接束値Hodge分解](../DEF1-06/index.md#thm-def1-06-tangent-hodge)に $\beta$ を入れると

$$
\beta=H_1\beta+dd^*G_1\beta+d^*dG_1\beta.
$$

$d^*\beta=0$、$G_0d^*=d^*G_1$ という[Greenの連鎖関係](../DEF1-06/index.md#lem-def1-06-homotopy)を使えば $dd^*G_1\beta=dG_0d^*\beta=0$ である。他方 $d^*dG_1\beta=d^*G_2d\beta=h_2d\beta$ なので

$$
\beta=t+h_2d\beta
=t-\frac12h_2[\beta,\beta].
$$

最終等号は可積分性 $d\beta+\frac12[\beta,\beta]=0$ である。[収束するKuranishi固定点解](../DEF1-07/index.md#thm-def1-07-convergent-fixed-point)は原点近くの小さい解として一意だから $\beta=\phi(t)$。さらに $d\beta= -[\beta,\beta]/2$ を調和射影 $H_2$ に入れる。完全形式の調和射影は零なので

$$
0=H_2d\beta=-\frac12H_2[\beta,\beta]=-\kappa(t).
$$

Artin基底上では同じHodge恒等式を有限次元係数環へテンソルし、固定点方程式の係数を冪零次数で一意に定めれば、すべての等式は有限回の演算として成立する。$\square$
<!-- proof-end -->

## 6. Kuranishi族は局所完全で、一次方向は最小である

<a id="thm-def1-08-semiuniversal"></a>

<!-- formal-statement-start -->
> **定理（Kuranishi族の局所完全性と半普遍性）**
>
> $X$ をコンパクト複素多様体とし、$K$ を[解析的Kuranishi基底](../DEF1-07/index.md#def-def1-07-kuranishi-germ)とする。第3節で構成した標識付き正則族 $\pi_K:\mathcal X_K\to(K,0)$ は局所完全である。すなわち、任意の基点付き複素解析空間の芽 $(S,s_0)$ 上の十分小さい標識付き正則変形 $\mathcal X\to S$ に対して、基点を保つ正則写像の芽

$$
f:(S,s_0)\longrightarrow(K,0)
$$

> と、中心ファイバーの標識を保つ $\mathcal X\simeq f^*\mathcal X_K$ が存在する。さらにKodaira–Spencer写像

$$
\operatorname{KS}_K:T_0K\longrightarrow H^1(X,T_X)
$$

> は同型であり、$\pi_K$ は半普遍である。$f$ 自身の一意性は一般には主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

任意の族を（基底方向にも正則な）ゲージで正規化する。正規化した可積分解は前節の固定点解と一致し、その調和係数だけが有限次元の基底変更を与える。一次では $H^1$ が基底の接空間をちょうど埋め、ゲージの $\bar\partial$-完全な変化は消える。

<!-- proof-start -->
### 証明

まず任意の標識付き変形 $\mathcal X\to S$ を取る。中心がコンパクトであることから、必要なら $S$ を縮小し、有限個の相対正則座標近傍で族を表示できる。中心の標識で各遷移写像を $X$ の局所正則座標の付け替えに同定すると、変形は相対的なBeltrami係数 $\beta_S$ で表示される。基底の構造環を係数としてMaurer–Cartan曲率が零になるのは、相対正則座標の積分可能性の条件である。

第4節の[調和ゲージの正規化](#lem-def1-08-gauge-slice)をこの遷移写像へ基底に正則な形で施し、$\beta_S$ と同型な $\widehat\beta_S$ を得る。これについて $d^*\widehat\beta_S=0$ である。ここで正則パラメータを持つ正規化の存在は、第4節で区別した解析的収束を用いており、ファイバーごとに任意の滑らかな微分同相を選んだという主張ではない。

$e_1,\ldots,e_m$ を $\mathcal H_T^1$ の基底とし、調和係数を

$$
t_S=H_1\widehat\beta_S
=\sum_{a=1}^m f_a e_a
$$

と書く。$H_1$ は基底変数に依存しない有限階数の複素線形作用素であり、$\widehat\beta_S$ は基底に正則だから各 $f_a\in\mathcal O_S(S)$ は正則で $f_a(s_0)=0$。すなわち $f=(f_1,\ldots,f_m):S\to U\subset\mathbb C^m$ は基点を保つ正則写像である。

[$d^*$-ゲージの可積分解の一意性](#lem-def1-08-normalized-unique)を基底の局所環係数で適用すると

$$
\widehat\beta_S=\phi(f),\qquad
0=\kappa(f).
$$

ここで $\kappa(f)=0$ は単なる点集合上の等式ではなく、$\mathcal O_S$ における等式である。従って $\kappa$ のイデアルは $f^\sharp$ の核に入り、**環の商の普遍性**により $f$ は解析空間 $K$ を経由する。これで $f:S\to K$ を得る。相対Beltrami係数の等式と第3節の相対正則座標構成から、標識を保つ族同型 $\mathcal X\simeq f^*\mathcal X_K$ が得られ、局所完全性が示された。

次に $T_0K$ を計算する。[Kuranishi障害の微分は原点で零](../DEF1-07/index.md#thm-def1-07-analytic-base)なので $T_0K\simeq\mathcal H_T^1$ である。一次の $\phi(t)$ は $t$ 自身、つまり $\phi(te_a)=te_a+O(t^2)$ である。[Kodaira–SpencerのDolbeault表示](../DEF1-01/index.md#thm-def1-01-cech-dolbeault)により

$$
\operatorname{KS}_K\left(\frac{\partial}{\partial t_a}\right)
=[e_a]\in H^1(X,T_X).
$$

$[e_a]$ は[調和代表同型](../DEF1-06/index.md#thm-def1-06-tangent-hodge)による基底であるから、$\operatorname{KS}_K$ は同型。第7節で示すように、この同型と基底変更の自然性は接写像の一意性を与える。よって半普遍である。$\square$
<!-- proof-end -->

**何が成立しないか。** 任意の族を少なくとも一度は捉えたが、異なる $f$ が同型な引き戻しを与えないとは示していない。また $K$ が滑らかな複素多様体とも、大域の同型類空間とも述べていない。

## 7. 一次方向は一意でも、写像全体は一意とは限らない

<a id="prop-def1-08-tangent-unique"></a>

<!-- formal-statement-start -->
> **命題（基底変更の接写像の一意性）**
>
> 上記のKuranishi族 $\mathcal X_K\to K$ と任意の標識付き正則変形 $\mathcal X\to(S,s_0)$ について、二つの基点を保つ正則写像 $f,g:S\to K$ の引き戻し $f^*\mathcal X_K$、$g^*\mathcal X_K$ が標識を保って $\mathcal X$ と同型なら

$$
df_{s_0}=dg_{s_0}
=\operatorname{KS}_K^{-1}\circ\operatorname{KS}_{\mathcal X}.
$$

> 接空間はZariski接空間であり、この結論は $S$ や $K$ が非被約でも成立する。
<!-- formal-statement-end -->

### 証明の見取り図

中心の標識を保つ同型なら、一次変形類を送るKodaira–Spencer写像は等しい。[基底変更の連鎖則](../DEF1-01/index.md#prop-def1-01-base-change)にその関係を代入し、$\operatorname{KS}_K$ が同型であることを使う。

<!-- proof-start -->
### 証明

[Kodaira–Spencer写像の基底変更公式](../DEF1-01/index.md#prop-def1-01-base-change)を $f:S\to K$ に適用すると、任意の $v\in T_{s_0}S$ に対し

$$
\operatorname{KS}_{f^*\mathcal X_K}(v)
=\operatorname{KS}_K(df_{s_0}v).
$$

標識を保つ族同型は中心のČechコサイクルの類を保つため、左辺は $\operatorname{KS}_{\mathcal X}(v)$ と等しい。$g$ についても同じなので

$$
\operatorname{KS}_K(df_{s_0}v)
=\operatorname{KS}_{\mathcal X}(v)
=\operatorname{KS}_K(dg_{s_0}v).
$$

[$\operatorname{KS}_K$ の同型性](#thm-def1-08-semiuniversal)により両側へ逆写像を適用し、全ての $v$ について $df_{s_0}v=dg_{s_0}v$ を得る。非被約の場合の接空間は $\mathfrak m/\mathfrak m^2$ の双対であり、同じ一次の議論で成立する。$\square$
<!-- proof-end -->

具体例として、ある円板の族を $t=s^2$ で基底変更すると、$\frac{dt}{ds}|_{s=0}=0$ なので中心のKodaira–Spencer写像は零になる。しかし $s\ne0$ では $t\ne0$ であり得る。この「一次では見えない変化」は[DEF1-01の基底変更例](../DEF1-01/index.md#prop-def1-01-base-change)と同じ現象であり、接写像の一意性は正則写像そのものの一意性ではない。

## 8. 自己同型が普遍性をどのように妨げるか

もし $H^0(X,T_X)\ne0$ なら、[無限小自己同型](../DEF1-04/index.md#thm-def1-04-infinitesimal-aut)が存在し、調和ゲージを作る際にも $\ker(d^*d)$ が残る。ただし、これだけで必ず非普遍とは断言できない。重要なのは、自己同型が**変形のパラメータに作用して別の基底変更を同一視するか**である。

<a id="prop-def1-08-universality"></a>

<!-- formal-statement-start -->
> **命題（自己同型と普遍性の十分条件）**
>
> コンパクト複素多様体 $X$ の正則接束について

$$
H^0(X,T_X)=0
$$

> なら、上記の半普遍Kuranishi族は基点の近くで普遍である。逆に $H^0(X,T_X)\ne0$ という事実だけから、Kuranishi族が非普遍であるとは結論できない。標識を外した大域的な同型類の一意性は、$H^0=0$ でも自動的には従わない。
<!-- formal-statement-end -->

### 証明の見取り図

普遍性の十分条件は、二つの基底変更を比べて**最初に違う次数**へ戻る帰納法で理解できる。自己同型の無限小生成元が零なら、その違いを生む余分なゲージ自由度がない。逆向きは剛性の例で否定できる。

<!-- proof-start -->
### 証明

$H^0=0$ とすると $d:C^0\to C^1$ の核は零であり、[ゲージ線形化](#lem-def1-08-gauge-slice)の $V$ は $C^0$ 全体である。$f,g:S\to K$ による引き戻しが標識付き同型と仮定する。局所環の最大イデアル $\mathfrak m$ で次数を追い、$f$ と $g$ が $\mathfrak m^j$ を法として一致したと仮定する。両者の最初の差を $\mathfrak m^j/\mathfrak m^{j+1}$ に落とすと、固定点解の一次微分 $D\phi(0)=\operatorname{id}_{\mathcal H_T^1}$ によりBeltrami係数の差は

$$
\sum_a (f_a-g_a)e_a
\quad\bmod\mathfrak m^{j+1}
$$

という調和形式になる。標識を保つ同型の最初の非零ゲージ生成元を $v$ とすれば、その次数の差は同時に $dv$ という完全形式でなければならない。調和形式と完全形式の直交性から

$$
\sum_a (f_a-g_a)e_a=dv
\quad\Longrightarrow\quad
f_a-g_a=0\pmod{\mathfrak m^{j+1}}
$$

となる。低次のゲージ生成元が差に寄与する可能性は、最初の次数で $dv=0$ となるため、$H^0=0$ により消える。従って帰納的に全次数で $f_a=g_a$。解析的局所環はNoether環で $\bigcap_j\mathfrak m^j=0$ なので、正則写像の芽として $f=g$ となる。

この議論では中心の標識を保つことが重要である。標識を外すと、恒等写像に近い必要のない**離散的**な正則自己同型がパラメータを同一視し得る。さらに $H^0\ne0$ でも普遍になり得ることは、次の射影直線の例で確認する。$\square$
<!-- proof-end -->

**直接例1：剛性と自己同型の共存。** $X=\mathbb P^1$ の正則接束は $\mathcal O_{\mathbb P^1}(2)$ で、$H^1(\mathbb P^1,T_X)=0$、一方 $H^0(\mathbb P^1,T_X)$ は複素次元3である。前者からKuranishi基底は一点である。任意の小変形族は局所自明であり、一点への基底写像は唯一なので、この意味で普遍である。後者は $z$、$z^2$、定数に対応する三つの局所正則ベクトル場を貼り合わせて得られ、自己同型がないことは意味しない。**非零の$H^0$は非普遍性の十分条件ではない。**

**直接例2：楕円曲線。** [楕円曲線のKodaira–Spencer計算](../DEF1-01/index.md#thm-def1-01-cech-dolbeault)で得た $\tau$ の一次方向は非零であり、局所的に一つの複素パラメータを与える。一方、楕円曲線の接束は自明で、$H^0(E,T_E)\simeq\mathbb C$ という並進の無限小自己同型を持つ。並進は複素構造の周期 $\tau$ 自体を変えないため、「自己同型があるから必ずパラメータが重複する」とは言えない。

**非一意性の仕組みを見せる模型。** $B=(\mathbb C,0)$ に乗法群 $\mathbb C^*$ が $t\mapsto\lambda t$ で作用する状況を考える。基底 $S=(\mathbb C,0)$ に対し $f(s)=s$、$g(s)=(1+s)s$ は異なる正則写像であり、

$$
g(s)=\lambda(s)f(s),\qquad \lambda(s)=1+s,\quad\lambda(0)=1
$$

と変形の基点では恒等元によって結ばれる。もしその作用が実際の族同型に持ち上がるなら、二つの引き戻しは標識を保って同型になり、普遍性は失われる。この模型は自己同型の**作用の機構**を示すもので、任意の $X$ のKuranishi基底にそのままこの作用があると主張しない。

## 9. 非被約基底と大域モジュライを混同しない

[$K$ の定義](../DEF1-07/index.md#def-def1-07-kuranishi-germ)に冪零元を残す理由をもう一度確認しよう。例えば $K=\operatorname{Specan}\mathbb C\{w\}/(w^2)$ は台集合が一点だが接空間は一次元である。これに対して基底 $S=\operatorname{Specan}\mathbb C[\varepsilon]/(\varepsilon^3)$ から $K$ への写像で $w\mapsto a\varepsilon+b\varepsilon^2$ と置くと

$$
w^2\longmapsto a^2\varepsilon^2
\quad\bmod\varepsilon^3.
$$

従って $w^2=0$ を保つには $a=0$ が必要であり、$b$ は任意である。一次接写像は常に零でも、二次の写像 $w\mapsto b\varepsilon^2$ は複数ある。**一次データだけでは解析空間の芽全体を復元できない**ことが、手計算で分かる。

局所完全なKuranishi基底は、中心の複素構造の近くの変形を捕捉する局所的な**表示**である。異なる点が同型な複素多様体を表すか、離れた領域の表示をどう貼るか、商の分離性や大域的なモジュライ空間が存在するかは別問題になる。[無限小正則自己同型と一次変形の違い](../DEF1-04/index.md#prop-def1-04-gauge-exact)を忘れて点集合をそのまま「同型類の座標」と見なしてはいけない。

## 10. 演習――族、正規化、自己同型を切り分ける

<a id="ex-def1-08-a01"></a>
#### DEF1-08-A01 双数への基底変更
- Level: A

円板 $B$ の座標を $t$、双数環を $A=\mathbb C[\varepsilon]/(\varepsilon^2)$ とする。$f^\sharp(t)=3\varepsilon$ のとき、$F(t)=2+t+5t^2$ の像と、引き戻した族のKodaira–Spencer方向を求めよ。

<!-- solution-start -->
**詳細解答。** $f^\sharp(t)^2=(3\varepsilon)^2=9\varepsilon^2=0$ なので $f^\sharp(F)=2+3\varepsilon+5\cdot0=2+3\varepsilon$。接写像は $\partial_\varepsilon\mapsto3\partial_t$ である。[Kodaira–Spencer写像の基底変更](../DEF1-01/index.md#prop-def1-01-base-change)より、引き戻しの一次類は $3\operatorname{KS}_B(\partial_t)$ となる。三倍はファイバーの個数ではなく基底方向の速度を表す。
<!-- solution-end -->

<a id="ex-def1-08-a02"></a>
#### DEF1-08-A02 ゲージ線形化の核
- Level: A

$L=d^*d$ とする。$\ker L=\ker d$ を内積から証明し、$d^*b$ が $\ker d$ に直交することを示せ。

<!-- solution-start -->
**詳細解答。** $Lv=0$ なら $0=(Lv,v)=(dv,dv)=\|dv\|^2$ なので $dv=0$。逆に $dv=0$ なら $Lv=0$。従って二つの核は一致する。$h\in\ker d$ に対し $(d^*b,h)=(b,dh)=0$ だから、$d^*b$ は核に直交する。ゆえに方程式 $Lv=d^*b$ の右辺は $L$ の可逆な直交補空間に入り、そこで一意に解ける。
<!-- solution-end -->

<a id="ex-def1-08-a03"></a>
#### DEF1-08-A03 ゲージ条件から固定点方程式へ
- Level: A

$\beta$ が $d^*\beta=0$ および $d\beta+\frac12[\beta,\beta]=0$ を満たすとする。$t=H_1\beta$ と置き、Hodge分解から $\beta=t-\frac12h_2[\beta,\beta]$ を導け。

<!-- solution-start -->
**詳細解答。** [Hodge分解](../DEF1-06/index.md#thm-def1-06-tangent-hodge)は $\beta=H_1\beta+dd^*G_1\beta+d^*dG_1\beta$。$d^*G_1=G_0d^*$ かつ $d^*\beta=0$ なので第二項は零。$dG_1=G_2d$ なので第三項は $d^*G_2d\beta=h_2d\beta$。可積分性から $d\beta=-[\beta,\beta]/2$ を代入し、$\beta=t-\frac12h_2[\beta,\beta]$ を得る。
<!-- solution-end -->

<a id="ex-def1-08-a04"></a>
#### DEF1-08-A04 一次写像が零の非定数族
- Level: A

円板 $B$ の座標 $t$、円板 $S$ の座標 $s$ について $f(s)=s^2$ とする。$df_0$ を求め、基底変更した族の中心におけるKodaira–Spencer写像が零でも、族全体が定数とは限らない理由を述べよ。

<!-- solution-start -->
**詳細解答。** $df_0(\partial_s)=f'(0)\partial_t=0$。従って[基底変更公式](../DEF1-01/index.md#prop-def1-01-base-change)で $\operatorname{KS}_{f^*\mathcal X}(0)=\operatorname{KS}_{\mathcal X}(0)\circ df_0=0$。ただし $s\ne0$ なら $f(s)=s^2\ne0$。元の族が $t\ne0$ で中心と異なる複素構造を持つ場合は、引き戻しも非定数になる。一次微分が零という情報は二次以上を消さない。
<!-- solution-end -->

<a id="ex-def1-08-a05"></a>
#### DEF1-08-A05 Artin環の二次可積分性
- Level: A

$A=\mathbb C[\varepsilon]/(\varepsilon^3)$、$\beta=\varepsilon\alpha+\varepsilon^2\gamma$（$\alpha,\gamma\in C^1$）とする。Maurer–Cartan方程式の $\varepsilon$、$\varepsilon^2$ 係数を比較せよ。

<!-- solution-start -->
**詳細解答。** $d\beta=\varepsilon d\alpha+\varepsilon^2d\gamma$。括弧は双線形で、$\varepsilon^3=0$ なので $[\beta,\beta]=\varepsilon^2[\alpha,\alpha]$ となる。従って

$$
d\beta+\frac12[\beta,\beta]
=\varepsilon d\alpha+
\varepsilon^2\left(d\gamma+\frac12[\alpha,\alpha]\right).
$$

係数を独立に零と置き、$d\alpha=0$、$d\gamma=-[\alpha,\alpha]/2$ を得る。一次の閉性だけで二次の障害が消えるわけではない。
<!-- solution-end -->

<a id="ex-def1-08-b01"></a>
#### DEF1-08-B01 局所完全と半普遍の差
- Level: B

$\mathcal U\to B$ が半普遍だとする。$\mathcal U'=\operatorname{pr}_B^*\mathcal U\to B\times\mathbb C$ が局所完全で、半普遍ではないことを、具体的な二つの基底写像を作って説明せよ。

<!-- solution-start -->
**詳細解答。** 任意の小変形が $f:S\to B$ から引き戻せるなら、$(f,0):S\to B\times\mathbb C$ から $\mathcal U'$ を引き戻しても同じ族になるので局所完全。$S=(\mathbb C,0)$ を取り、$(f,0)$ と $(f,s)$ を考える。$\operatorname{pr}_B(f,0)=\operatorname{pr}_B(f,s)=f$ なので、両者による引き戻しは標識付き同型である。しかし接写像はそれぞれ $(df_0,0)$、$(df_0,1)$ で異なる。従って半普遍の「接写像が一意」という条件に反する。
<!-- solution-end -->

<a id="ex-def1-08-b02"></a>
#### DEF1-08-B02 剛性と自己同型
- Level: B

$X=\mathbb P^1$ に対し $H^1(X,T_X)=0$、$H^0(X,T_X)\simeq\mathbb C^3$ とする。Kuranishi基底の次元と、普遍性について何が言えるかを判定せよ。「$H^0\ne0$ なら非普遍」という推論を検査せよ。

<!-- solution-start -->
**詳細解答。** $m=\dim H^1=0$ なのでKuranishi基底は一点の芽である。局所完全性から任意の小さい標識付き変形はその一点の族の引き戻し、すなわち局所的に自明である。一点を終域とする基底写像の芽は常に唯一なので、この基底について普遍性が成立する。他方 $H^0$ は三次元で正則自己同型の無限小方向がある。従って $H^0=0$ は普遍性の十分条件だが必要条件ではない。
<!-- solution-end -->

<a id="ex-def1-08-b03"></a>
#### DEF1-08-B03 非被約基底への写像を全部求める
- Level: B

$K=\operatorname{Specan}\mathbb C\{w\}/(w^2)$、$S=\operatorname{Specan}\mathbb C[\varepsilon]/(\varepsilon^3)$ とする。基点を保つ環準同型は $w\mapsto a\varepsilon+b\varepsilon^2$ と書ける。$a,b$ に必要十分な条件を求め、すべての接写像を判定せよ。

<!-- solution-start -->
**詳細解答。** $w^2=0$ の像は

$$
(a\varepsilon+b\varepsilon^2)^2
=a^2\varepsilon^2+2ab\varepsilon^3+b^2\varepsilon^4
=a^2\varepsilon^2.
$$

$\varepsilon^2\ne0$ なので $a^2=0$、複素数体上では $a=0$ が必要。逆に $a=0$ なら $(b\varepsilon^2)^2=0$ だから任意の $b\in\mathbb C$ が許される。接空間は最大イデアルの一次商で判定するため $w\mapsto b\varepsilon^2$ は一次商で零、したがってどの写像も接写像は零である。接写像が同じでも写像自体は $b$ の値により異なる。
<!-- solution-end -->

<a id="ex-def1-08-b04"></a>
#### DEF1-08-B04 二つの基底写像と標識
- Level: B

$B=(\mathbb C,0)$ に $\mathbb C^*$ が $t\mapsto\lambda t$ で作用し、その作用がある変形族の標識を保つ族同型に持ち上がると仮定する。$f(s)=s$ と $g(s)=s+s^2$ が異なるのに引き戻し同型を与える機構を説明し、中心の標識に必要な条件を示せ。

<!-- solution-start -->
**詳細解答。** $\lambda(s)=1+s$ は原点近くで零にならず、$g(s)=\lambda(s)f(s)$ を満たす。族上の $\mathbb C^*$ 作用を基底の各 $s$ に $\lambda(s)$ として適用すれば、$f^*\mathcal X$ と $g^*\mathcal X$ の間の同型になる。中心の標識を保つには $\lambda(0)=1$ により中心ファイバー上の作用が恒等であることが必要であり、今回成立する。$f\ne g$ なのは $g-f=s^2\ne0$ のため。一方 $df_0=dg_0$ は双方1で、半普遍の接写像の一意性とは矛盾しない。
<!-- solution-end -->

<a id="ex-def1-08-c01"></a>
#### DEF1-08-C01 局所完全性を最初から組み立てる
- Level: C

コンパクト複素多様体 $X$ のKuranishi写像 $\kappa:U\subset\mathcal H_T^1\to\mathcal H_T^2$ と固定点解 $\phi$ がDEF1-07の結論を満たすとする。任意の小さい標識付き正則変形 $\mathcal X\to(S,s_0)$ を考え、以下を順に説明せよ。

1. 相対的な正則なゲージ正規化を行い、調和係数 $f_a$ から $f:S\to K$ を得る論理。
2. なぜ $\kappa(f)=0$ は台集合でなく構造層で確認しなければならないか。
3. $\operatorname{KS}_K$ が同型であることと、基底変更の接写像が一意であること。
4. さらに $H^0(X,T_X)=0$ なら、何を追加して普遍性を得るか。

<!-- solution-start -->
**詳細解答。** 第1段階。$S$ を縮小し有限個の相対正則座標で族を表す。第4節の[調和ゲージ補題](#lem-def1-08-gauge-slice)を基底に正則な形で適用し、$d^*\widehat\beta_S=0$ の可積分係数を作る。調和射影によって

$$
t_S=H_1\widehat\beta_S=\sum_a f_a e_a
$$

を得る。基底に正則な係数の有限次元射影なので各 $f_a$ も正則である。第5節の[正規化解の一意性](#lem-def1-08-normalized-unique)から $\widehat\beta_S=\phi(f)$、$\kappa(f)=0$。

第2段階。非被約基底では例えば $u^2=0$ のように台集合では零でも構造層では非零の元がある。$\kappa(f)=0$ が構造層で成立すると、$\kappa$ の成分が生成するイデアルは $\mathcal O_S$ へ零に写る。従って局所環の準同型は $\mathcal O_K=\mathcal O_U/(\kappa)$ を経由し、正則写像 $f:S\to K$ を与える。相対複素構造が一致するので引き戻し族も同型となる。

第3段階。$D\kappa(0)=0$ より $T_0K=\mathcal H_T^1$。$D\phi(0)=\operatorname{id}$ から $\operatorname{KS}_K(e_a)=[e_a]$ であり、[調和代表同型](../DEF1-06/index.md#thm-def1-06-tangent-hodge)によりこれは同型。二つの基底変更 $f,g$ の引き戻しが標識付き同型なら、Kodaira–Spencerの自然性により $\operatorname{KS}_K\circ df_0=\operatorname{KS}_K\circ dg_0$ なので $df_0=dg_0$。

第4段階。$H^0=0$ ならゲージ生成元の線形化 $d$ に核がなく、基底変更同士の最初に異なる高次係数は調和形式と完全形式の双方でなければならない。直交性によってその係数は零。次数帰納法をすべての冪零商へ適用し、解析的局所環の $\bigcap_j\mathfrak m^j=0$ から $f=g$ を導く。**接写像の一意性だけでは最後の結論にならず、高次のゲージ自由度も排除する必要がある。**
<!-- solution-end -->

## 11. どこから先が別問題になるか

本章で得たのは、$X$ の近くの任意の正則変形をKuranishi基底から再現でき、一次パラメータには余分な方向がない、という**局所的な変形の完全性**である。$K$ の特異性は障害の実体を表し、自己同型は同型類との対応を非単射にし得る。

次のDEF1-09以降では、コンパクトKähler多様体で正則体積形式を持つ場合に、障害写像そのものが消える条件を調べる。そのためのBogomolov–Tian–Todorovの核心恒等式は、今章の局所完全性とは独立の新しい入力になる。

**参考文献**：[Kodaira, *Complex Manifolds and Deformation of Complex Structures*](https://link.springer.com/book/10.1007/978-1-4613-8590-5) のCompleteness theorem、[Manetti, *Lectures on deformations of complex manifolds*](https://arxiv.org/abs/math/0507286) のKuranishi theoremと無限小変形論を参照。解析的な正規化には、滑らかなファイバー単体の議論を正則族へ引き上げる工程が必要である。
