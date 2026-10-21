# HPDE19 Green作用素の恒等式と一意性

[HPDE18の遅延・先進Green作用素](../HPDE18/index.md#thm-hpde18-green-existence)は、コンパクト支持の源 $f$ に対して $PG_{\mathrm{ret}}f=PG_{\mathrm{adv}}f=f$ を満たすよう構成しました。しかし、これは作用素を左から $P$ で微分した式です。**先に $P$ を作用させてからGreen作用素で戻す**ことも可能でしょうか。また、因果的な支持だけで応答は一意に決まるのでしょうか。

さらに、束や係数が複素数値の場合、形式的双対の作用素に対するGreen解を積分で比較すると、なぜ未来と過去が入れ替わるのでしょうか。この三つの疑問を、作用域・支持・部分積分を明記して解きます。

## 1. まず作用域を確認する

$(M,g)$ を境界なし、時間向き付き、滑らかな[大域双曲Lorentz時空](../../../幾何系/LORG/LORG16/index.md#def-lorg16-global-hyperbolicity)とし、$E\to M$ は有限ランクの滑らかな実または複素ベクトル束とします。$P$ は[HPDE5のnormally hyperbolic作用素](../HPDE5/index.md#def-hpde5-normally-hyperbolic)で、形式的自己随伴性は仮定しません。滑らかな切断全体を $\Gamma(M,E)$、コンパクト支持のものを $\Gamma_c(M,E)$ と書きます。

二階微分作用素 $P$ は局所的なので、$\varphi=0$ である開集合では $P\varphi=0$ です。したがって

$$
P:\Gamma_c(M,E)\longrightarrow\Gamma_c(M,E)
$$

も定義できます。一方、[HPDE18のGreen作用素](../HPDE18/index.md#def-hpde18-green-operators)の作用域は

$$
G_{\mathrm{ret}},G_{\mathrm{adv}}:
\Gamma_c(M,E)\longrightarrow\Gamma(M,E)
$$

です。入力 $f$ はコンパクト支持ですが、出力 $G_{\mathrm{ret}}f$ は一般にはコンパクト支持ではありません。

従って、次の二つの合成は**どちらも入力を $\Gamma_c(M,E)$ に限定**すれば定義されます。

$$
PG_{\mathrm{ret}},\ PG_{\mathrm{adv}}:
\Gamma_c(M,E)\to\Gamma(M,E),
$$

$$
G_{\mathrm{ret}}P,\ G_{\mathrm{adv}}P:
\Gamma_c(M,E)\to\Gamma(M,E).
$$

最初の二つの値は常にコンパクト支持の $f$ に等しいですが、**$G_{\mathrm{ret}}$ を任意の滑らかな $Pu$ に適用できる**と早合点してはいけません。

## 2. コンパクト支持切断に対して両側が逆になる

$\varphi\in\Gamma_c(M,E)$ を任意に取り、$K=\operatorname{supp}\varphi$ とします。$K\ne\varnothing$ のとき、[滑らかなCauchy時間分割](../../../幾何系/LORG/LORG20/index.md#thm-lorg20-orthogonal-splitting)の時間関数 $t$ について、$a<\min t(K)$ を選べます。$\Sigma_a=t^{-1}(a)$ の近くでは $\varphi$ は恒等的に零です。なぜなら $t<a+\varepsilon<\min t(K)$ とできるからです。値だけでなく接続法線微分も零になります。

<a id="prop-hpde19-two-sided-identity"></a>

<!-- formal-statement-start -->
> **命題（Green作用素の両側恒等式）**  
> 上記の大域双曲時空、有限ランク束、normally hyperbolic作用素 $P$ と、[HPDE18のGreen作用素](../HPDE18/index.md#def-hpde18-green-operators)に対し、任意の $\varphi\in\Gamma_c(M,E)$ について

$$
PG_{\mathrm{ret}}\varphi=\varphi,\qquad
PG_{\mathrm{adv}}\varphi=\varphi,
$$

$$
G_{\mathrm{ret}}P\varphi=\varphi,\qquad
G_{\mathrm{adv}}P\varphi=\varphi
$$

> が $\Gamma(M,E)$ の等式として成り立つ。すべての合成の入力は $\Gamma_c(M,E)$ とする。
<!-- formal-statement-end -->

### 証明の見取り図

前半は[遅延・先進Green作用素の構成と因果的支持](../HPDE18/index.md#thm-hpde18-green-existence)の結論です。後半では $\varphi$ 自身が、源 $P\varphi$ に対する**過去の零データ解**であることを確認してから、[大域Cauchy一意性](../HPDE16/index.md#thm-hpde16-global-cauchy)を適用します。

<!-- proof-start -->
### 証明

任意の $\varphi\in\Gamma_c(M,E)$ に対し、$P\varphi$ はコンパクト支持であり、

$$
\operatorname{supp}(P\varphi)\subseteq\operatorname{supp}\varphi=K
$$

です。$K=\varnothing$ なら $\varphi=P\varphi=0$ で、Green作用素は線形なので四つの等式は成立します。以下 $K\ne\varnothing$ とします。

$a<\min t(K)$ を選び $u=G_{\mathrm{ret}}(P\varphi)$ と置きます。源 $P\varphi$ は $\Sigma_a$ より後にしか存在しません。[零Cauchyデータ応答の定義](../HPDE18/index.md#def-hpde18-zero-data-response)と初期面の独立性から、$u$ は

$$
Pu=P\varphi,\qquad
u|_{\Sigma_a}=0,\qquad
\nabla_N^Pu|_{\Sigma_a}=0
$$

を満たします。ここで $\nabla^P$ は[作用素から得る一意接続](../HPDE5/index.md#thm-hpde5-unique-connection)です。

他方、$\varphi$ は明らかに同じ方程式 $P\varphi=P\varphi$ を満たします。さらに $\Sigma_a$ の開いた近傍で $\varphi=0$ なので、$\varphi|_{\Sigma_a}=0$、$\nabla_N^P\varphi|_{\Sigma_a}=0$ です。従って差 $w=u-\varphi$ について

$$
Pw=0,\qquad w|_{\Sigma_a}=0,\qquad
\nabla_N^Pw|_{\Sigma_a}=0.
$$

[HPDE16の大域Cauchy一意性](../HPDE16/index.md#thm-hpde16-global-cauchy)により $w=0$、すなわち $G_{\mathrm{ret}}P\varphi=\varphi$ です。先進側は $b>\max t(K)$ にある未来の面 $\Sigma_b$ を使い、同じ零データ一意性で $G_{\mathrm{adv}}P\varphi=\varphi$ を得ます。

残る $PG_{\mathrm{ret}}\varphi=\varphi$ と $PG_{\mathrm{adv}}\varphi=\varphi$ は[HPDE18の定理](../HPDE18/index.md#thm-hpde18-green-existence)の第一の恒等式です。$\square$
<!-- proof-end -->

**平坦模型の確認**。$P=\partial_t^2-\partial_x^2$ とし $\varphi(t,x)=h(t)q(x)$ をコンパクト支持の滑らかな積とすれば

$$
P\varphi=h''(t)q(x)-h(t)q''(x).
$$

この源を[HPDE12の積分核](../HPDE12/index.md#def-hpde12-convolution-operators)に入れた遅延解は、源より前の零データを持つ $\varphi$ と同じCauchy問題を解くため $\varphi$ に一致します。**積分をすべて実行しなくても**一致を証明できるのは、一意性を既に確立したからです。

逆に $u(t,x)=1$ は $Pu=0$ で $P u$ はコンパクト支持ですが、$u$ 自身はコンパクト支持ではありません。$G_{\mathrm{ret}}(Pu)=G_{\mathrm{ret}}0=0\ne u$。したがって、命題の入力を $\Gamma(M,E)$ 全体に広げることはできません。

## 3. 因果的支持がGreen作用素を一意に選ぶ

先ほどの証明は、「方程式の解を一つ得ても、初期条件がなければ斉次解を加えられる」という問題を回避しました。今度は初期面を指定せずに、遅延・先進の**支持条件自体**が解を一意にすることを証明します。

[因果的未来と過去](../../../幾何系/LORG/LORG6/index.md#def-lorg6-chronological-causal-future)の $J^\pm(K)$ を使います。$K$ がコンパクトなら、[Cauchy時間分割](../../../幾何系/LORG/LORG20/index.md#thm-lorg20-orthogonal-splitting)によって $J^+(K)$ は $t<\min t(K)$ に点を持たず、$J^-(K)$ は $t>\max t(K)$ に点を持ちません。

Green作用素に似た写像の中から、方程式と因果的支持だけを持つものを考えます。予め両側逆を仮定する必要はありません。

<a id="def-hpde19-causal-green-candidate"></a>

<!-- formal-statement-start -->
> **定義（因果的Green候補）**  
> 第1節の $P$ に対し、線形写像 $H:\Gamma_c(M,E)\to\Gamma(M,E)$ が遅延Green候補であるとは、すべての $f\in\Gamma_c(M,E)$ について

$$
PHf=f,\qquad
\operatorname{supp}(Hf)\subseteq J^+(\operatorname{supp}f)
$$

> を満たすことをいう。先進Green候補は最後の包含で $J^-$ を用いるものとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde19-causal-green-candidate -->
**定義の確認**。Minkowski平面の $P=\partial_t^2-\partial_x^2$ と $f\in C_c^\infty(\mathbb R^{1+1})$ を取ります。[HPDE12の遅延積分核](../HPDE12/index.md#thm-hpde12-convolution-inverses)は $P(G_{\mathrm{ret}}f)=f$ を満たし、積分領域は $s\le t$ かつ $|x-y|\le t-s$ に限られます。従って値が非零になる点は $\operatorname{supp}f$ の因果的未来に入り、両条件が確認できます。[遅延・先進Green作用素の構成と因果的支持](../HPDE18/index.md#thm-hpde18-green-existence)により、曲がった時空・束値作用素でもこの候補は実在します。
<!-- definition-example-end -->

<a id="thm-hpde19-uniqueness"></a>

<!-- formal-statement-start -->
> **定理（因果的Green候補の一意性）**  
> 第1節の時空・束・作用素について、遅延Green候補はちょうど一つ存在し、[HPDE18で構成した $G_{\mathrm{ret}}$](../HPDE18/index.md#def-hpde18-green-operators) に等しい。先進Green候補もちょうど一つ存在し、$G_{\mathrm{adv}}$ に等しい。特に支持条件と $PH=\operatorname{id}$ だけで一意性が従い、$HP=\operatorname{id}$ を追加仮定する必要はない。
<!-- formal-statement-end -->

### 証明の見取り図

候補 $H$ と既存の $G$ の差は斉次解です。その差が源より前（または後）で零になることを支持条件から読み、零Cauchyデータ一意性を使います。

<!-- proof-start -->
### 証明

存在は[HPDE18の構成](../HPDE18/index.md#thm-hpde18-green-existence)から既知です。遅延Green候補 $H$ と $f\in\Gamma_c(M,E)$ を取り、$w=Hf-G_{\mathrm{ret}}f$ とします。二つの方程式を引くと

$$
Pw=PHf-PG_{\mathrm{ret}}f=f-f=0.
$$

$K=\operatorname{supp}f$ が非空なら、両者の支持は $J^+(K)$ に含まれるため

$$
\operatorname{supp}w\subseteq J^+(K)
\subseteq\{p:t(p)\ge\min t(K)\}.
$$

$a<\min t(K)$ を選べば $\Sigma_a$ の開いた近傍で $w=0$ となります。従って $w|_{\Sigma_a}=0$、$\nabla_N^Pw|_{\Sigma_a}=0$ です。[大域Cauchy一意性](../HPDE16/index.md#thm-hpde16-global-cauchy)を $Pw=0$ に適用して $w=0$ を得ます。

$f=0$ の場合、支持条件は $\operatorname{supp}(H0)\subseteq J^+(\varnothing)=\varnothing$ を意味し、$H0=0$ です。したがって全入力で $H=G_{\mathrm{ret}}$ です。先進候補については $\operatorname{supp}w\subseteq J^-(K)$ と $b>\max t(K)$ を使い、$\Sigma_b$ の零データから全時空で零と示せます。$\square$
<!-- proof-end -->

ここから、遅延作用素と先進作用素は単なる二つの都合のよい解法ではなく、**源からどちらの時間方向へ応答を認めるか**で数学的に確定する写像だと分かります。斉次解を任意に加えられない理由は、零データの一意性にあります。

## 4. 積分を交換する前に支持の重なりを調べる

形式的双対を使う準備として、支持の重なりがコンパクトであることを示します。コンパクト支持 $f$ の遅延解は未来へ無限に延びることがあり、別のコンパクト支持 $\psi$ の先進解は過去へ無限に延びることがあります。それでも**両方が同時に非零となり得る領域**は有界な時間帯に収まります。

<a id="lem-hpde19-causal-overlap"></a>

<!-- formal-statement-start -->
> **補題（因果的な未来と過去の重なり）**  
> 第1節の大域双曲時空で、コンパクト集合 $K,L\subset M$ に対して

$$
J^+(K)\cap J^-(L)
$$

> はコンパクトである。従って $\operatorname{supp}u\subseteq J^+(K)$、$\operatorname{supp}v\subseteq J^-(L)$ である滑らかな切断 $u,v$ の支持の交差もコンパクトである。
<!-- formal-statement-end -->

### 証明の見取り図

時間関数 $t$ は未来向き因果曲線上で増加します。交差点の時刻は $K$ の最小時刻と $L$ の最大時刻の間に限られます。その有限時刻帯にある因果影のコンパクト性は[HPDE16の補題](../HPDE16/index.md#lem-hpde16-shadow-compact)で既に証明しました。

<!-- proof-start -->
### 証明

$K$ または $L$ が空なら交差も空でコンパクトです。以下双方非空とします。$q\in J^+(K)\cap J^-(L)$ なら、ある $p\in K$ と $r\in L$ について $p\le q\le r$ です。時間関数の単調性より

$$
\min t(K)\le t(p)\le t(q)\le t(r)\le\max t(L).
$$

$a=\min t(K)$、$b=\max t(L)$ と置きます。$a>b$ なら交差は空です。$a\le b$ なら

$$
J^+(K)\cap J^-(L)\subseteq
J^+(K)\cap t^{-1}([a,b]).
$$

右辺は[有限時間因果影のコンパクト性](../HPDE16/index.md#lem-hpde16-shadow-compact)によりコンパクトです。大域双曲性の下でコンパクト集合の因果的未来・過去は閉集合であるので、左辺も閉です。従ってコンパクト集合の閉部分集合としてコンパクトです。

切断の支持は閉集合です。その交差は上で得たコンパクト集合に含まれる閉集合だからコンパクトです。$\square$
<!-- proof-end -->

この補題は、$J^+(K)$ 自体や $J^-(L)$ 自体がコンパクトだとは言っていません。有限時間帯で切ることと、互いに逆向きの支持を重ねることが鍵です。

## 5. 形式的双対のGreen作用素では時間方向が反転する

[HPDE4の形式的双対](../HPDE4/index.md#def-hpde4-formal-transpose)を使います。$d=\dim M$、密度束を $|\Lambda^dT^*M|$ とし、$F=E^*\otimes|\Lambda^dT^*M|$ と書きます。$P^t$ はこの束の切断に作用する微分作用素で、代数的双対を使うため**複素数の場合も係数を共役しません**。

二階の主シンボルだけを見ると、局所表示で $P$ の二階係数を $A^{ij}$ と書くと、、[HPDE4の部分積分公式](../HPDE4/index.md#thm-hpde4-transpose-formula)は $P^t$ の二階係数を $(A^{ij})^{\mathsf T}$ にします。二回の部分積分では符号が正に戻ります。$P$ がnormally hyperbolicなら $A^{ij}=-g^{ij}I$ なので

$$
\sigma_2(P^t)(x,\xi)=-g_x^{-1}(\xi,\xi)\operatorname{id}_{F_x}.
$$

従って $P^t$ もnormally hyperbolicです。これは随伴の存在に束計量を要求せず、[HPDE18の構成](../HPDE18/index.md#thm-hpde18-green-existence)を束 $F$ に適用できることを意味します。

<a id="prop-hpde19-transpose-hyperbolic"></a>

<!-- formal-statement-start -->
> **命題（形式的双対もnormally hyperbolic）**  
> 第1節の $P$ に対し、密度値双対束 $F=E^*\otimes|\Lambda^dT^*M|$ 上の形式的双対 $P^t$ はnormally hyperbolic作用素である。この作用素の遅延・先進Green作用素は次の写像として存在する。

$
G_{\mathrm{ret}}^{P^t},G_{\mathrm{adv}}^{P^t}:
\Gamma_c(M,F)\longrightarrow\Gamma(M,F).
$

> 両作用素は各々の因果的支持条件と両側恒等式を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

二階係数の転置だけを計算し、HPDE18の構成と本章第2節の両側恒等式を $P^t$ に再適用します。

<!-- proof-start -->
### 証明

座標と局所枠で $P=A^{ij}\partial_i\partial_j+B^i\partial_i+C$ と書き、$A^{ij}=-g^{ij}I$ の対称な二階係数を選びます。[形式的双対の存在・一意性と局所公式](../HPDE4/index.md#thm-hpde4-transpose-formula)より

$$
P^t\psi=\partial_i\partial_j\bigl((A^{ij})^{\mathsf T}\psi\bigr)
-\partial_i\bigl((B^i)^{\mathsf T}\psi\bigr)+C^{\mathsf T}\psi
$$

です。Leibniz則で最上階のみ取り出すと $(A^{ij})^{\mathsf T}\partial_i\partial_j\psi$、すなわち $-g^{ij}\partial_i\partial_j\psi$ になります。一次・零次項は主シンボルに寄与しません。密度束を含む別の枠での主シンボルも[HPDE5の座標不変性](../HPDE5/index.md#prop-hpde5-symbol-invariance)により同じ幾何学的式です。

大域双曲性と束 $F$ の有限ランク・滑らかさを確認すれば、[HPDE18のGreen作用素構成定理](../HPDE18/index.md#thm-hpde18-green-existence)を $(F,P^t)$ に適用できます。本章の[両側恒等式](#prop-hpde19-two-sided-identity)も同じ仮定なので $P^t$ に適用できます。$\square$
<!-- proof-end -->

次の式の積分は、密度値双対切断 $\psi$ を切断 $u$ に評価した密度 $\psi(u)$ の積分です。切断と密度の間に内積は置いていません。

<a id="thm-hpde19-green-transpose-pairing"></a>

<!-- formal-statement-start -->
> **定理（Green作用素の転置と時間方向の反転）**  
> 第1節の時空、束、normally hyperbolic作用素 $P$ に対し、$F=E^*\otimes|\Lambda^dT^*M|$ とする。任意の $f\in\Gamma_c(M,E)$、$\psi\in\Gamma_c(M,F)$ に対し

$$
\int_M\psi(G_{\mathrm{ret}}^Pf)
=\int_M(G_{\mathrm{adv}}^{P^t}\psi)(f),
$$

$$
\int_M\psi(G_{\mathrm{adv}}^Pf)
=\int_M(G_{\mathrm{ret}}^{P^t}\psi)(f)
$$

> が成り立つ。両辺はコンパクト支持の因子を持つため積分可能で、$P=P^t$ は仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

遅延解 $u$ と、双対作用素の先進解 $v$ を組にします。$Pu=f$、$P^t v=\psi$ なので部分積分したいのですが、$u,v$ はどちらも時空コンパクト支持とは限りません。[支持の交差がコンパクト](#lem-hpde19-causal-overlap)であることを利用して切断関数を差し込み、境界の項を消します。

<!-- proof-start -->
### 証明

$u=G_{\mathrm{ret}}^Pf$、$v=G_{\mathrm{adv}}^{P^t}\psi$ とします。[HPDE18の構成](../HPDE18/index.md#thm-hpde18-green-existence)から $Pu=f$、[前命題](#prop-hpde19-transpose-hyperbolic)から $P^tv=\psi$ です。さらに

$$
\operatorname{supp}u\subset J^+(\operatorname{supp}f),\qquad
\operatorname{supp}v\subset J^-(\operatorname{supp}\psi)
$$

です。[重なりの補題](#lem-hpde19-causal-overlap)により $S=\operatorname{supp}u\cap\operatorname{supp}v$ はコンパクトです。

$S$ の開近傍で $1$ となる滑らかなコンパクト台関数 $\chi$ を選びます。このとき $\chi u$ はコンパクト支持です。

[密度値の形式的双対](../HPDE4/index.md#def-hpde4-formal-transpose)の定義を適用するには、双対切断側にもコンパクト支持が必要です。$\operatorname{supp}(\chi u)$ の開近傍で $1$ になるコンパクト台関数 $\eta$ を選び、コンパクト支持の $\eta v$ を試験切断として用います。

$\eta=1$ が成り立つ開集合では $P^t(\eta v)=P^tv$ です。また、$P(\chi u)$ の支持は $\operatorname{supp}(\chi u)$ に含まれます。従ってこのコンパクト台の切断の組に対し、定義中の部分積分関係を用いると

$$
\int_M (P^t v)(\chi u)=\int_M v(P(\chi u))
$$

を得ます。左辺では $P^tv=\psi$、かつ $\operatorname{supp}\psi\subseteq\operatorname{supp}v$ なので、$u$ と $\psi$ が共に非零になり得る点は $S$ に含まれ、$\chi=1$ です。したがって左辺は $\int_M\psi(u)$ です。

右辺を展開すると

$$
P(\chi u)=\chi Pu+[P,\chi]u=\chi f+[P,\chi]u.
$$

交換子 $[P,\chi]u=P(\chi u)-\chi Pu$ は、$\chi$ が局所定数の領域で零になり、その台は $\operatorname{supp}d\chi\cap\operatorname{supp}u$ に含まれます。もし同時に $v$ が非零ならその点は $S$ に入り、$\chi$ は $S$ の近傍で定数 $1$ なので $d\chi=0$ となり矛盾します。従って $v([P,\chi]u)=0$ です。また $v(f)$ が非零なら $f$ の支持は $u$ の支持に必ず含まれるとは一般には言えません。しかし $f=Pu$ なので $\operatorname{supp}f\subseteq\operatorname{supp}u$ です。従って $v(f)$ の支持も $S$ に含まれ、$\chi v(f)=v(f)$ です。右辺は $\int_M v(f)$ に等しく、第一式が従います。

第二式では $u=G_{\mathrm{adv}}^Pf$、$v=G_{\mathrm{ret}}^{P^t}\psi$ と置きます。支持はそれぞれ $J^-(\operatorname{supp}f)$、$J^+(\operatorname{supp}\psi)$ になり、[重なりの補題](#lem-hpde19-causal-overlap)の時間向きを入れ替えれば、同じカットオフと交換子の論証が成立します。$\square$
<!-- proof-end -->

この式は形式的に「遅延Greenの転置は双対作用素の先進Green」と読めます。ただし、**全切断空間上での有界作用素の転置**を主張しているのではなく、二つのコンパクト支持試験切断の間の積分恒等式です。

## 6. Hermite随伴との違いと非自己随伴な例

複素束に正定値Hermite束計量 $h$ と正の滑らかな密度 $\mu$ を固定すると、[HPDE4の形式的随伴](../HPDE4/index.md#def-hpde4-formal-adjoint) $P^*$ が定義されます。これは第二引数を共役する内積での随伴です。一方、上の $P^t$ は複素線形な代数的双対でした。[両者の関係](../HPDE4/index.md#prop-hpde4-adjoint-from-transpose)によって、定理をHermite内積の言葉でも書けます。

<a id="cor-hpde19-hermitian-pairing"></a>

<!-- formal-statement-start -->
> **系（Hermite随伴とのGreen対）**  
> 第5節の設定で $E$ に正定値Hermite束計量 $h$ と正密度 $\mu$ を固定する。任意の $f,\psi\in\Gamma_c(M,E)$ に対し

$$
\int_M h(G_{\mathrm{ret}}^P f,\psi)\,\mu
=\int_M h(f,G_{\mathrm{adv}}^{P^*}\psi)\,\mu,
$$

$$
\int_M h(G_{\mathrm{adv}}^P f,\psi)\,\mu
=\int_M h(f,G_{\mathrm{ret}}^{P^*}\psi)\,\mu.
$$

> ここで $P^*$ は指定した $h,\mu$ に関する形式的随伴であり、一般には $P^*\ne P$ である。
<!-- formal-statement-end -->

### 証明の見取り図

Hermite計量による双対化 $j_h(\psi)(u)=h(u,\psi)$ は共役線形です。これに密度 $\mu$ を掛ければ第5節の密度値双対切断になり、[HPDE4の随伴との関係](../HPDE4/index.md#prop-hpde4-adjoint-from-transpose)を用いて $P^t$ 側を $P^*$ 側へ置き換えられます。

<!-- proof-start -->
### 証明

$\Psi=j_h(\psi)\otimes\mu$ とすると、[形式的双対と随伴の関係](../HPDE4/index.md#prop-hpde4-adjoint-from-transpose)により

$$
P^t(j_h(v)\otimes\mu)=j_h(P^*v)\otimes\mu.
$$

$P^*$ の主シンボルもnormally hyperbolicです。$v=G_{\mathrm{adv}}^{P^*}\psi$ と取れば $P^*v=\psi$ と先進支持を満たすため、上の式と $P^t$ の[Green候補一意性](#thm-hpde19-uniqueness)から

$$
G_{\mathrm{adv}}^{P^t}\Psi=j_h(v)\otimes\mu
$$

です。[転置の積分恒等式](#thm-hpde19-green-transpose-pairing)へ代入すると

$$
\begin{aligned}
\int_M\Psi(G_{\mathrm{ret}}^P f)
&=\int_M(G_{\mathrm{adv}}^{P^t}\Psi)(f)\\
\int_M h(G_{\mathrm{ret}}^P f,\psi)\,\mu
&=\int_M h(f,v)\,\mu
\end{aligned}
$$

となり、$v=G_{\mathrm{adv}}^{P^*}\psi$ で第一式を得ます。先進・遅延を交換すると第二式を得ます。$\square$
<!-- proof-end -->

**非自己随伴な直接計算**。$M=\mathbb R^{1+1}$、$\mu=dt\,dx$、標準内積、実数 $a\ne0$ を用い、

$$
P=\partial_t^2-\partial_x^2+2a\partial_t
$$

とします。二階主部が $-g^{ij}\partial_i\partial_j$ なのでnormally hyperbolicですが、コンパクト支持切断の部分積分では

$$
\int_{\mathbb R^{1+1}}(2a\,u_t)\,v\,dt\,dx
=-\int_{\mathbb R^{1+1}}u\,(2a\,v_t)\,dt\,dx
$$

です。よって実内積に関する形式的随伴は

$$
P^*=\partial_t^2-\partial_x^2-2a\partial_t\ne P.
$$

束が複素で $a$ が実数なら同じ式です。この例でもGreen作用素は両方向に存在し、対の恒等式では**$P$ の遅延Greenと $P^*$ の先進Green**を組にします。$P$ 自身の先進Greenと取り違えてはいけません。

## 7. 演習：作用域・一意性・双対を再導出する

### Level A

<a id="ex-hpde19-a01"></a>
#### HPDE19-A01 微分作用素が台を広げないこと

$\varphi\in C_c^\infty(\mathbb R^{1+1})$ とし $P=\partial_t^2-\partial_x^2+a(t,x)\partial_t+b(t,x)$（$a,b$ は滑らか）とする。$\operatorname{supp}(P\varphi)\subseteq\operatorname{supp}\varphi$ を示せ。
- Level: A

<!-- solution-start -->
**詳細解答**。点 $q\notin\operatorname{supp}\varphi$ には開近傍 $U$ が存在して $\varphi|_U=0$ です。そのため $\partial_t\varphi,\partial_t^2\varphi,\partial_x^2\varphi$ も $U$ 上で零になります。$P\varphi|_U=0$ なので $q\notin\operatorname{supp}(P\varphi)$。すべての $q$ で示したため包含が成立します。$\operatorname{supp}\varphi$ はコンパクトなので、閉部分集合である $\operatorname{supp}(P\varphi)$ もコンパクトです。
<!-- solution-end -->

<a id="ex-hpde19-a02"></a>
#### HPDE19-A02 源 $P\varphi$ の形を計算する

$P=\partial_t^2-\partial_x^2$、$\varphi(t,x)=h(t)q(x)$、$h,q\in C_c^\infty(\mathbb R)$ とする。$P\varphi$ を求め、$G_{\mathrm{ret}}(P\varphi)$ をCauchy一意性から確定せよ。
- Level: A

<!-- solution-start -->
**詳細解答**。積の微分から $\partial_t^2(hq)=h''q$、$\partial_x^2(hq)=hq''$ なので

$$
P\varphi(t,x)=h''(t)q(x)-h(t)q''(x).
$$

この源はコンパクト支持です。$a<\min\operatorname{supp}h$ を選ぶと $\varphi$ は $\Sigma_a$ 付近で零であり、二つのCauchyデータも零です。[HPDE18の遅延Green](../HPDE18/index.md#def-hpde18-green-operators)も、同じ源と零データから作られます。[大域一意性](../HPDE16/index.md#thm-hpde16-global-cauchy)より $G_{\mathrm{ret}}(P\varphi)=\varphi$ です。$h=0$ の場合も両辺は零です。
<!-- solution-end -->

<a id="ex-hpde19-a03"></a>
#### HPDE19-A03 一階微分の形式的双対を検算する

$\mathbb R^{1+1}$ で $P=\partial_t^2-\partial_x^2+2a\partial_t$（$a$ は実定数）とする。積分の部分積分を使い $P^t$ を求め、$a\ne0$ で $P^t\ne P$ を示せ。
- Level: A

<!-- solution-start -->
**詳細解答**。コンパクト支持の試験関数 $u,v$ に対し、一回の部分積分で $\int v\,u_t=-\int v_tu$、二回で $\int v\,u_{tt}=\int v_{tt}u$ です。$x$ 微分も二回なので符号は変わりません。従って

$$
\int v\,Pu
=\int(\partial_t^2v-\partial_x^2v-2a\partial_tv)\,u,
$$

となり、$P^t=\partial_t^2-\partial_x^2-2a\partial_t$ です。係数 $2a$ は共役でなく**微分の移動により符号が反転**しました。$a\ne0$ なら二つの一階項が異なります。
<!-- solution-end -->

<a id="ex-hpde19-a04"></a>
#### HPDE19-A04 作用域を広げると破綻する例

$P=\partial_t^2-\partial_x^2$、$u(t,x)=1$ とする。$Pu$ と $G_{\mathrm{ret}}(Pu)$ を求め、$G_{\mathrm{ret}}P=\operatorname{id}$ を全 $\Gamma$ に拡張できない理由を述べよ。
- Level: A

<!-- solution-start -->
**詳細解答**。$u_t=u_{tt}=u_{xx}=0$ から $Pu=0$ です。零源に対するGreen作用素は零を返すため $G_{\mathrm{ret}}(Pu)=G_{\mathrm{ret}}0=0$ です。しかし $u=1$ なので一致しません。ここでは偶然 $Pu=0$ がコンパクト支持であるため合成値を計算できました。一般の滑らかな $u$ は $Pu$ が非コンパクト支持となり、そもそも元のGreen作用素の入力域から外れます。$\Gamma_c$ 上の恒等式を $\Gamma$ に移してはいけません。
<!-- solution-end -->

### Level B

<a id="ex-hpde19-b01"></a>
#### HPDE19-B01 因果影の重なりを直接計算する

Minkowski平面で $K=\{(0,0)\}$、$L=\{(3,1)\}$ とする。$J^+(K)\cap J^-(L)$ を不等式で書き、コンパクトであることを示せ。
- Level: B

<!-- solution-start -->
**詳細解答**。点 $(t,x)$ が $J^+(K)$ に入るのは $t\ge0$ かつ $|x|\le t$ のときです。$J^-(L)$ に入るのは $t\le3$ かつ $|x-1|\le3-t$ のときです。従って交差は

$$
\{(t,x):0\le t\le3,\ |x|\le t,\ |x-1|\le3-t\}.
$$

この集合は連続関数の非厳密不等式で記述されるので閉集合です。また $0\le t\le3$、$|x|\le3$ から有界です。$\mathbb R^2$ のHeine–Borel性よりコンパクトです。[一般の重なり補題](#lem-hpde19-causal-overlap)では平坦空間の座標不等式に代わり、[有限時間因果影のコンパクト性](../HPDE16/index.md#lem-hpde16-shadow-compact)を使います。
<!-- solution-end -->

<a id="ex-hpde19-b02"></a>
#### HPDE19-B02 片側逆と支持だけで一意性を示す

$H_1,H_2:\Gamma_c(M,E)\to\Gamma(M,E)$ がともに $PH_if=f$、$\operatorname{supp}(H_if)\subset J^+(\operatorname{supp}f)$ を満たすとする。任意の $f$ に対して $H_1f=H_2f$ を示せ。$H_iP=\operatorname{id}$ は使わないこと。
- Level: B

<!-- solution-start -->
**詳細解答**。$w=H_1f-H_2f$ と置くと $Pw=f-f=0$ です。$K=\operatorname{supp}f\ne\varnothing$ の場合、両者の支持条件から $\operatorname{supp}w\subset J^+(K)$ です。$a<\min t(K)$ を選べば $\Sigma_a$ 付近では $w=0$ なので $w|_{\Sigma_a}=\nabla_N^Pw|_{\Sigma_a}=0$ です。[HPDE16のCauchy一意性](../HPDE16/index.md#thm-hpde16-global-cauchy)より $w=0$。$f=0$ なら支持は空で、両解は零です。従って全入力で一致します。最初から必要だったのは $PH_i=\operatorname{id}$ と支持だけです。
<!-- solution-end -->

<a id="ex-hpde19-b03"></a>
#### HPDE19-B03 非自己随伴作用素のGreen対

平坦時空で $P=\partial_t^2-\partial_x^2+2a\partial_t$、$a\in\mathbb R\setminus\{0\}$ とする。$f,\psi\in C_c^\infty$ に対し、遅延Greenを左辺に持つ正しい積分恒等式を書き、$P$ の先進Greenでなく $P^*$ の先進Greenが現れる理由を示せ。
- Level: B

<!-- solution-start -->
**詳細解答**。第6節の部分積分で $P^*=\partial_t^2-\partial_x^2-2a\partial_t$ と求めました。$u=G_{\mathrm{ret}}^Pf$、$v=G_{\mathrm{adv}}^{P^*}\psi$ とすれば $Pu=f$、$P^*v=\psi$、支持は未来と過去です。[重なり補題](#lem-hpde19-causal-overlap)で支持の交差はコンパクトなのでカットオフで部分積分でき、

$$
\int_{\mathbb R^{1+1}}(G_{\mathrm{ret}}^Pf)\overline\psi\,dt\,dx
=\int_{\mathbb R^{1+1}}f\,\overline{G_{\mathrm{adv}}^{P^*}\psi}\,dt\,dx.
$$

$P\ne P^*$ なので $G_{\mathrm{adv}}^P\psi$ を右辺へ無断で代入すると、形式的随伴の積分恒等式と一致しません。時間向きが反転するのは、両Green解の支持の交差をコンパクトにして境界項を消すためです。
<!-- solution-end -->

### Level C

<a id="ex-hpde19-c01"></a>
#### HPDE19-C01 逆作用素・一意性・双対をつなぐ

$(M,g)$ は境界なしの滑らかな大域双曲時空、$E\to M$ は有限ランク滑らかな複素束、$P$ はnormally hyperbolicとする。次を証明せよ。

(i) すべての $\varphi\in\Gamma_c(M,E)$ に対して $G_{\mathrm{ret}}P\varphi=\varphi$ が成立すること。

(ii) $P:\Gamma_c(M,E)\to\Gamma_c(M,E)$ が単射であること。

(iii) 形式的双対 $P^t$ の先進Green作用素を用い、任意の $f\in\Gamma_c(M,E)$、$\psi\in\Gamma_c(M,E^*\otimes|\Lambda^dT^*M|)$ に対する積分恒等式を導くこと。非コンパクトなGreen出力をそのまま部分積分しないこと。
- Level: C

<!-- solution-start -->
**詳細解答**。

(i) $\varphi$ の支持を $K$ とします。$K=\varnothing$ なら自明です。それ以外では $\Sigma_a$ を $a<\min t(K)$ と選びます。$P\varphi$ も $K$ に支持され、$u=G_{\mathrm{ret}}(P\varphi)$ と $\varphi$ はどちらも源 $P\varphi$ のCauchy解です。$\Sigma_a$ の近傍で $\varphi=0$ であり $u$ は零Cauchyデータから作られるため、二つの初期データは一致します。[大域Cauchy一意性](../HPDE16/index.md#thm-hpde16-global-cauchy)より $u=\varphi$ です。

(ii) $P\varphi=0$ かつ $\varphi\in\Gamma_c$ なら、(i)により $\varphi=G_{\mathrm{ret}}(P\varphi)=G_{\mathrm{ret}}0=0$ です。従って核は零で $P$ は単射です。この段階で、後続講義のexact sequence全体はまだ証明していません。

(iii) [形式的双対もnormally hyperbolic](#prop-hpde19-transpose-hyperbolic)であることは、第5節の二階主シンボルの計算

$
\sigma_2(P^t)(x,\xi)=-g_x^{-1}(\xi,\xi)I
$

で確認しました。従って $P^t$ の先進Green作用素が存在します。二つの解を次のように置きます。

$
u=G_{\mathrm{ret}}^Pf,\qquad v=G_{\mathrm{adv}}^{P^t}\psi.
$

すると $Pu=f$、$P^tv=\psi$ であり、

$$
\operatorname{supp}u\cap\operatorname{supp}v
\subset J^+(\operatorname{supp}f)\cap J^-(\operatorname{supp}\psi)
$$

です。[重なり補題](#lem-hpde19-causal-overlap)により右辺はコンパクト。重なりの近傍で $1$ となるコンパクト台の $\chi$ を取ります。$[P,\chi]u$ は $\operatorname{supp}v$ と交わらず、また $v(Pu)$ の支持は重なりの中です。双対の部分積分公式を $\chi u$ と、必要ならコンパクト化した $v$ に適用すると

$$
\begin{aligned}
\int_M\psi(u)
&=\int_M(P^tv)(\chi u)\\
&=\int_M v(P(\chi u))\\
&=\int_M v(\chi Pu)+\int_Mv([P,\chi]u)\\
&=\int_M v(f).
\end{aligned}
$$

従って

$$
\int_M\psi(G_{\mathrm{ret}}^Pf)
=\int_M(G_{\mathrm{adv}}^{P^t}\psi)(f)
$$

を得ます。二つのGreen解の全支持をコンパクトとみなさないこと、右辺の作用素が先進であること、複素代数的双対 $P^t$ は係数を共役しないことが重要です。
<!-- solution-end -->

## 8. 次の講義へ

今回の両側恒等式は、入力を $\Gamma_c(M,E)$ として確立しました。一方、$G_{\mathrm{ret}}f$ は未来方向に、$G_{\mathrm{adv}}f$ は過去方向に、時空非コンパクト支持を持つ場合があります。より広い作用域を設計するには「各Cauchy面でコンパクト」「過去方向でコンパクト」「未来方向でコンパクト」を厳密に区別する必要があります。次のHPDE20では、そうした支持空間とGreen作用素の延長を扱います。
