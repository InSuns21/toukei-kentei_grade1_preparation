# HPDE22 exact sequenceの全射性と切断

[前講の核の定理](../HPDE21/index.md#thm-hpde21-kernel-exact)により、二つのコンパクト源が同じ斉次解を作る条件は分かりました。しかし核の計算からは、任意の空間コンパクトな斉次解を源から作れるとは限りません。**解を先に与え、その解を生むコンパクトな源を逆に構成する**のが本講の問いです。

解を時間方向で二つに切り分けると、カットオフの微分が現れる薄い時間帯にだけ新しい源が生じます。時間帯は空間方向には無限に広がりますが、**解の台がコンパクト集合の因果影に収まる条件**があれば実際の源はコンパクトになります。この支持の論証が全射性の核心です。

## 1. 解を切るための時間関数

$(M,g)$ を境界のない時間向き付き滑らかな[大域双曲Lorentz時空](../../../幾何系/LORG/LORG16/index.md#def-lorg16-global-hyperbolicity)、$E\to M$ を有限ランクの滑らかな実または複素ベクトル束とします。$P:\Gamma(M,E)\to\Gamma(M,E)$ は[normally hyperbolic作用素](../HPDE5/index.md#def-hpde5-normally-hyperbolic)とし、自己随伴性は仮定しません。

[滑らかなCauchy時間分割の定理](../../../幾何系/LORG/LORG20/index.md#thm-lorg20-orthogonal-splitting)で得られる滑らかなCauchy時間関数 $T:M\to\mathbb R$ を一つ固定し、$\Sigma_s=T^{-1}(s)$ と書きます。この関数は未来向き因果曲線に沿って増加し、すべてのレベルはCauchy面です。非連結時空の場合も各成分に対してこの設定を取ります。

今、$u\in\operatorname{Sol}_{\mathrm{sc}}(P)$、すなわち $Pu=0$ かつあるコンパクトな $K\subset M$ に対して

$$
\operatorname{supp}u\subseteq J(K)
$$

である滑らかな切断を任意に取ります。これは[空間コンパクトな斉次解](../HPDE21/index.md#def-hpde21-spatial-solution)の定義です。記号 $J^\pm$ は[因果的未来・過去](../../../幾何系/LORG/LORG6/index.md#def-lorg6-chronological-causal-future)を表します。

実数 $a<b$ を選び、滑らかな一変数関数 $\eta:\mathbb R\to[0,1]$ を $s\le a$ で $0$、$s\ge b$ で $1$ となるように取ります。例えば区間 $(a,b)$ 内に支持を持つ非負の滑らかな関数 $\rho$ を $\int_a^b\rho(r)\,dr=1$ と規格化し、

$$
\eta(s)=\int_{-\infty}^s\rho(r)\,dr
$$

とすれば作れます。これを時空上の関数へ引き戻して

$$
\chi(p)=\eta(T(p)),\qquad p\in M
$$

と置きます。$\chi$ は**過去で零、未来で一**となる滑らかなカットオフです。$\chi$ 自身は通常、時空コンパクト支持ではありません。また $1-\chi$ も通常はコンパクト支持ではありません。微分した部分が有限時間帯に収まることだけを、まず利用します。

## 2. 斉次解からコンパクト源を作る

$P$ の[接続と零次項への分解](../HPDE5/index.md#thm-hpde5-unique-connection)に現れる接続を $\nabla^P$ とします。幾何的な波動作用素 $\Box_g$ はスカラー関数に対する $g$ のLaplace–Beltrami作用素（符号 $(-,+,\ldots,+)$）です。[分割関数と作用素の交換子](../HPDE15/index.md#lem-hpde15-partition-commutator)によって、どの切断 $v$ に対しても

$$
P(\chi v)=\chi Pv+[P,\chi]v,
$$

$$
[P,\chi]v=-(\Box_g\chi)v
-2\nabla^P_{\operatorname{grad}_g\chi}v.
$$

$\operatorname{grad}_g\chi$ は $g(\operatorname{grad}_g\chi,X)=d\chi(X)$ により定まる勾配です。この式は**二階作用素と乗法の交換子が一階になる理由**も示しています。零次項は乗法と可換で、$\chi Pv$ を引くと二階の $v$ の微分が打ち消されます。

<a id="lem-hpde22-compact-source"></a>

<!-- formal-statement-start -->
> **補題（時間的カットオフによるコンパクト源）**
>
> $(M,g)$ を境界なしの時間向き付き滑らかな大域双曲時空、$E\to M$ を有限ランクの滑らかな束、$P$ をnormally hyperbolic作用素とする。$T$ を滑らかなCauchy時間関数、$u\in\operatorname{Sol}_{\mathrm{sc}}(P)$ とする。$a<b$、$\eta\in C^\infty(\mathbb R)$ が $(-\infty,a]$ で $0$、$[b,\infty)$ で $1$ であるとき、$\chi=\eta\circ T$ として

$$
f_\chi:=P(\chi u)=[P,\chi]u
$$

> と置けば $f_\chi\in\Gamma_c(M,E)$ であり、$\operatorname{supp}u\subseteq J(K)$ を満たすコンパクト $K$ に対して

$$
\operatorname{supp}f_\chi
\subseteq J(K)\cap T^{-1}([a,b])
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

時間カットオフを微分するときだけ源が生じます。$\eta',\eta''$ は $[a,b]$ の外で零です。源の台がコンパクトになるのは、**帯の外で零であること**と**帯の中の因果影がコンパクトであること**の二段階を合わせるからです。

<!-- proof-start -->
### 証明

$Pu=0$ より交換子恒等式を $v=u$ に適用すると

$$
P(\chi u)=\chi Pu+[P,\chi]u
=[P,\chi]u.
$$

連鎖律から

$$
d\chi=\eta'(T)dT,
\qquad
\operatorname{grad}_g\chi=\eta'(T)\operatorname{grad}_gT,
$$

$$
\Box_g\chi
=\eta''(T)g^{-1}(dT,dT)
+\eta'(T)\Box_gT.
$$

この二式を交換子へ代入すると

$$
f_\chi=-\bigl\{\eta''(T)g^{-1}(dT,dT)
+\eta'(T)\Box_gT\bigr\}u
-2\eta'(T)\nabla^P_{\operatorname{grad}_gT}u.
$$

$T<a$ と $T>b$ の領域では $\eta'(T)=\eta''(T)=0$ で、$f_\chi=0$ です。また $u$ が零である開集合ではその導関数も零です。よって台の定義から

$$
\operatorname{supp}f_\chi
\subseteq\operatorname{supp}u\cap T^{-1}([a,b])
\subseteq J(K)\cap T^{-1}([a,b]).
$$

[有限時間因果影のコンパクト性](../HPDE16/index.md#lem-hpde16-shadow-compact)をコンパクト集合 $K$ と実数 $a<b$ に適用すると

$$
J(K)\cap T^{-1}([a,b])
=\bigl(J^+(K)\cap T^{-1}([a,b])\bigr)
\cup\bigl(J^-(K)\cap T^{-1}([a,b])\bigr)
$$

は二つのコンパクト集合の和です。$\operatorname{supp}f_\chi$ は閉集合なので、このコンパクト集合の閉部分集合としてコンパクトです。滑らかさは $P,\chi,u$ の滑らかさから従い、$f_\chi\in\Gamma_c(M,E)$ です。$\square$
<!-- proof-end -->

### 直接例：右向きの波を切る

Minkowski平面で $P=\partial_t^2-\partial_x^2$、$T=t$、$u(t,x)=h(x-t)$、$h\in C_c^\infty(\mathbb R)$ とします。$z=x-t$ とおけば

$$
\partial_tu=-h'(z),\quad
\partial_t^2u=h''(z),\quad
\partial_x^2u=h''(z),\quad Pu=0.
$$

さらに $\chi=\eta(t)$ なら、$\partial_x\chi=0$ であり、積の微分から

$$
\begin{aligned}
P(\chi u)
&=\partial_t^2(\eta h(z))-\partial_x^2(\eta h(z))\\
&=\eta''h(z)-2\eta'h'(z)
+\eta h''(z)-\eta h''(z)\\
&=\eta''(t)h(x-t)-2\eta'(t)h'(x-t).
\end{aligned}
$$

$\operatorname{supp}h\subseteq[-R,R]$ とすれば、源が非零となり得るのは

$$
a\le t\le b,\qquad |x-t|\le R
$$

だけです。従って $a-R\le x\le b+R$ も満たし、源の台は有限な長方形の閉部分集合です。単に $\eta'$ の台だけを見て「源がコンパクト」と結論してはいけません。空間方向を制御しているのは $h$ の台です。

## 3. 二つの半解がGreen逆作用素の作用域に入る

源 $f_\chi$ がコンパクトになっただけでは、$G_{\mathrm{ret}}f_\chi=\chi u$ を即座に主張できません。[コンパクト切断についてのGreen両側恒等式](../HPDE19/index.md#prop-hpde19-two-sided-identity)の入力は $\Gamma_c$ ですが、$\chi u$ は未来へ、$(\chi-1)u$ は過去へ無限に伸び得るためです。

そこで半解を

$$
w_+:=\chi u,\qquad w_-:=(\chi-1)u
$$

と置きます。どちらも $P$ をかけた結果は $f_\chi$ ですが、$w_+$ は過去で零、$w_-$ は未来で零です。この違いを、[過去コンパクト（pc）・未来コンパクト（fc）の定義](../HPDE20/index.md#def-hpde20-support-classes)から検証します。

<a id="lem-hpde22-half-support"></a>

<!-- formal-statement-start -->
> **補題（半解のpc・fc支持）**
>
> $(M,g)$ を境界のない時間向き付き滑らかな大域双曲時空、$E\to M$ を有限ランクの滑らかな実または複素ベクトル束、$P$ をnormally hyperbolic作用素とする。$T$ を滑らかなCauchy時間関数、$u\in\operatorname{Sol}_{\mathrm{sc}}(P)$ とする。
>
> 実数 $a<b$ と、$(-\infty,a]$ で $0$、$[b,\infty)$ で $1$ となる滑らかな関数 $\eta:\mathbb R\to\mathbb R$ を選び、次の切断と源を定める。

$$
\chi=\eta\circ T,\qquad f_\chi=P(\chi u).
$$

> このとき

$$
w_+=\chi u\in\Gamma_{\mathrm{pc}}(M,E),\qquad
w_-=(\chi-1)u\in\Gamma_{\mathrm{fc}}(M,E),
$$

> かつ両方について

$$
Pw_+=Pw_-=f_\chi\in\Gamma_c(M,E)
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

pcは「任意のコンパクト観測集合 $L$ の因果的過去と台の交差がコンパクト」、fcはその時間反転でした。$L$ の時刻の上限または下限を使って、交差全体を**有限時間因果影**に閉じ込めます。

<!-- proof-start -->
### 証明

$\operatorname{supp}u\subseteq J(K)$ となるコンパクト $K$ を取ります。$\chi=0$ は $T\le a$ に成立するので

$$
\operatorname{supp}w_+\subseteq J(K)\cap\{T\ge a\}.
$$

任意のコンパクト $L\subset M$ を固定します。$L=\varnothing$ なら交差は空です。$L\ne\varnothing$ のとき $B=\max_{p\in L}T(p)$ が存在します。$q\in J^-(L)$ なら $q\le\ell$ となる $\ell\in L$ があるため、Cauchy時間関数の単調性から $T(q)\le T(\ell)\le B$。従って

$$
\operatorname{supp}w_+\cap J^-(L)
\subseteq J(K)\cap T^{-1}([a,B]).
$$

$B<a$ なら左辺は空、$B\ge a$ なら右辺は[有限時間因果影のコンパクト性](../HPDE16/index.md#lem-hpde16-shadow-compact)からコンパクトです（$B=a$ の場合は区間を $[a,a+1]$ に拡張してよい）。

ここで $J^-(L)$ が閉であることも確認します。$q_n\in J^-(L)$ が $q_n\to q$ を満たせば、$q_n\le\ell_n$ となる $\ell_n\in L$ を選べます。$L$ のコンパクト性により部分列で $\ell_n\to\ell\in L$ とでき、[因果到達関係の閉性](../../../幾何系/LORG/LORG16/index.md#lem-lorg16-closed-causal-relation)から $q\le\ell$ です。従って $q\in J^-(L)$ であり、$J^-(L)$ は閉です。

$\operatorname{supp}w_+$ も閉なので、左辺はコンパクト集合の閉部分集合としてコンパクトです。任意の $L$ について成立するため、$w_+$ は[pcの定義](../HPDE20/index.md#def-hpde20-support-classes)を満たします。

同じ手順で $\chi-1=0$ が $T\ge b$ に成立することから

$$
\operatorname{supp}w_-\subseteq J(K)\cap\{T\le b\}.
$$

非空のコンパクト $L$ に対して $A=\min_{p\in L}T(p)$ と置くと、$q\in J^+(L)$ なら $T(q)\ge A$ なので

$$
\operatorname{supp}w_-\cap J^+(L)
\subseteq J(K)\cap T^{-1}([A,b]).
$$

$A>b$ なら空、そうでなければ同じ有限時間因果影補題（$A=b$ なら区間を拡張）からコンパクトな集合に収まります。$J^+(L)$ も上と同じ閉因果関係の議論で閉なので、左辺はその閉部分集合としてコンパクトです。従って $w_-$ はfcです。

最後に $Pu=0$ と $[P,1]=0$ から

$$
Pw_+=P(\chi u)=f_\chi,
$$

$$
Pw_-=P\bigl((\chi-1)u\bigr)
=P(\chi u)-Pu=f_\chi.
$$

右辺がコンパクトであることは[前節の補題](#lem-hpde22-compact-source)で証明済みです。$\square$
<!-- proof-end -->

重要なのは、$w_+$ の台が**時空コンパクト**だとは言っていないことです。未来へ伸びても、pcならば[拡張された遅延Green逆作用素](../HPDE20/index.md#thm-hpde20-green-two-sided)を適用できます。$w_-$ についてはfcと先進側を組にします。

## 4. 全射性と短完全系列

[因果伝播子の定義](../HPDE21/index.md#def-hpde21-causal-propagator)では符号を $E_{\mathrm{cau}}=G_{\mathrm{ret}}-G_{\mathrm{adv}}$ に固定しました。いま構成した半解も、この順に引けば

$$
w_+-w_-=\chi u-(\chi-1)u=u
$$

となります。反対に引くと $-u$ となるため、カットオフの向きとGreen作用素の順序は組で確認します。

<a id="thm-hpde22-surjectivity-exact"></a>

<!-- formal-statement-start -->
> **定理（因果伝播子の全射性と短完全系列）**
>
> $(M,g)$ は境界なしの時間向き付き滑らかな大域双曲Lorentz時空、$E\to M$ は有限ランクの滑らかな実または複素ベクトル束、$P:\Gamma(M,E)\to\Gamma(M,E)$ はnormally hyperbolic作用素とする。遅延・先進Green作用素の差を $E_{\mathrm{cau}}=G_{\mathrm{ret}}-G_{\mathrm{adv}}$ と定める。このとき

$$
E_{\mathrm{cau}}:\Gamma_c(M,E)
\longrightarrow\operatorname{Sol}_{\mathrm{sc}}(P)
$$

> は全射であり、次の列は全ての項で完全である。

$$
0\longrightarrow\Gamma_c(M,E)
\xrightarrow{\ P\ }\Gamma_c(M,E)
\xrightarrow{\ E_{\mathrm{cau}}\ }
\operatorname{Sol}_{\mathrm{sc}}(P)
\longrightarrow0.
$$

> 特に、任意の $u\in\operatorname{Sol}_{\mathrm{sc}}(P)$ には $f\in\Gamma_c(M,E)$ が存在して $E_{\mathrm{cau}}f=u$ となる。$P$ の形式的自己随伴性は不要である。
<!-- formal-statement-end -->

### 証明の見取り図

任意の $u$ を固定し、カットオフ $\chi$ から $f_\chi=P(\chi u)$ を作ります。[時間的カットオフによるコンパクト源](#lem-hpde22-compact-source)で $f_\chi\in\Gamma_c$、[半解のpc・fc支持](#lem-hpde22-half-support)で二つの半解がpc/fcの作用域に属します。そこで対応するGreenの両側逆を使い、差を取れば $u$ が戻ります。列の前半は[因果伝播子の核と列の前半の完全性](../HPDE21/index.md#thm-hpde21-kernel-exact)と結合します。

<!-- proof-start -->
### 証明

まず $u\in\operatorname{Sol}_{\mathrm{sc}}(P)$ を**任意に**取ります。$u=0$ の場合も以下の構成で $f_\chi=0$ となります。滑らかなCauchy時間関数 $T$ と過去で $0$、未来で $1$ の $\chi=\eta\circ T$ を選びます。[コンパクト源補題](#lem-hpde22-compact-source)によって

$$
f_\chi=P(\chi u)\in\Gamma_c(M,E)
$$

です。また[半解のpc・fc支持](#lem-hpde22-half-support)より

$$
w_+=\chi u\in\Gamma_{\mathrm{pc}},\quad
w_-=(\chi-1)u\in\Gamma_{\mathrm{fc}},\quad
Pw_+=Pw_-=f_\chi.
$$

[pc・fc入力へのGreenの両側逆](../HPDE20/index.md#thm-hpde20-green-two-sided)を**それぞれの正しい作用域**で使うと、

$$
G_{\mathrm{ret}}(Pw_+)=w_+,
\qquad
G_{\mathrm{adv}}(Pw_-)=w_-.
$$

従って $f_\chi$ がコンパクトであることも合わせて

$$
\begin{aligned}
E_{\mathrm{cau}}f_\chi
&=G_{\mathrm{ret}}f_\chi-G_{\mathrm{adv}}f_\chi\\
&=G_{\mathrm{ret}}(Pw_+)-G_{\mathrm{adv}}(Pw_-)\\
&=w_+-w_-\\
&=\chi u-(\chi-1)u=u.
\end{aligned}
$$

任意のsc斉次解が像に属することを示したので $E_{\mathrm{cau}}$ は全射です。ここで使用した延長Green作用素はコンパクト源に対して元のGreen作用素と一致するため、定理の $E_{\mathrm{cau}}$ を別の演算子へ差し替えてはいません。

残りの項を確認します。[因果伝播子の核と列の前半の完全性](../HPDE21/index.md#thm-hpde21-kernel-exact)により

$$
\ker\bigl(P|_{\Gamma_c}\bigr)=\{0\},\qquad
\ker E_{\mathrm{cau}}=P\Gamma_c(M,E).
$$

列の各項で像と核を順に照合します。

1. 最初の零写像の像は $\{0\}$ であり、$P$ の核と一致します。
2. 中央の $\Gamma_c$ では $\operatorname{im}P=\ker E_{\mathrm{cau}}$ が第二式そのものです。
3. 最後の零写像の核は全解空間です。これは今回示した $E_{\mathrm{cau}}$ の像と一致します。

よって列は全ての項で完全です。$\square$
<!-- proof-end -->

### 具体例：空間が円周なら定数解も切れる

$M=\mathbb R\times S^1$ に平坦な積計量 $-dt^2+d\theta^2$ を入れ、実スカラー作用素 $P=\partial_t^2-\partial_\theta^2$ を考えます。定数切断 $u=1$ は $Pu=0$ を満たします。

$S^1$ はコンパクトなので、時刻零の断面 $K=\{0\}\times S^1$ もコンパクトです。任意の $(t,\theta)$ は $(0,\theta)\in K$ と時間的な直線で結ばれるため、$M=J(K)$ です。ゆえに $\operatorname{supp}u=M\subseteq J(K)$ となり、$u$ はscです。

$\chi=\eta(t)$ とすると

$$
f_\chi=P(\eta(t)u)=\eta''(t).
$$

$\eta''$ は $[a,b]$ に支持を持ち、$S^1$ はコンパクトなので $f_\chi$ は時空コンパクトです。[pc・fcのGreen両側逆](../HPDE20/index.md#thm-hpde20-green-two-sided)から

$$
G_{\mathrm{ret}}f_\chi=\eta(t),\qquad
G_{\mathrm{adv}}f_\chi=\eta(t)-1,
$$

よってその差は $1=u$ です。$\eta''$ は積分すると零ですが、だからといって源が零であったり、伝播子の像が零であったりするわけではありません。

反対に $M=\mathbb R^{1+1}$ で同じ $u=1$ を取るとscではありません。$\eta''(t)$ が非零なら源は空間方向の全直線にわたり非零となり、**コンパクト源を得る段階で失敗します**。定理の仮定からscを落とせない理由がこの違いにあります。

## 5. カットオフによる源の選び方は一意ではない

同じ解 $u$ に対して遷移時刻 $a,b$ や $\eta$ の形を変えれば、異なる源が得られます。それでも、因果伝播子で見た解は一致します。この自由度を[前講の核の定理](../HPDE21/index.md#thm-hpde21-kernel-exact)で記述します。

固定したCauchy時間関数 $T$ について、過去で零・未来で一のカットオフを $\chi_1,\chi_2$ とします。それぞれの遷移帯を $[a_i,b_i]$ とし、二つの時間帯を覆う区間の端点を

$$
A=\min(a_1,a_2),\qquad B=\max(b_1,b_2)
$$

と置きます。$T<A$ では両方零、$T>B$ では両方一なので、$\chi_1-\chi_2$ は帯の外で零です。$u$ はscなので、[有限時間因果影のコンパクト性](../HPDE16/index.md#lem-hpde16-shadow-compact)により

$$
v:=(\chi_1-\chi_2)u\in\Gamma_c(M,E).
$$

すると

$$
f_{\chi_1}-f_{\chi_2}
=P(\chi_1u)-P(\chi_2u)=Pv
\in P\Gamma_c(M,E).
$$

差を $E_{\mathrm{cau}}$ に入れれば[前講の零合成](../HPDE21/index.md#prop-hpde21-propagator-identities)から零となり、二つの源が同じ解を表すことが式で確認できます。

ここで、[線形空間の商空間](../../../基礎科目/LA/LA2/index.md#def-la2-quotient)の定義を使い、ベクトル空間 $\Gamma_c(M,E)$ の部分空間 $P\Gamma_c(M,E)$ を零と見なします。源そのものは変えても斉次解が変わらない、という現象を同値類として記録するためのものです。

<a id="def-hpde22-source-classes"></a>

<!-- formal-statement-start -->
> **定義（コンパクト源の同値類）**
>
> 上記の大域双曲時空 $M$、有限ランク束 $E$、normally hyperbolic作用素 $P$ について、$f,g\in\Gamma_c(M,E)$ が同値であるとは、ある $\varphi\in\Gamma_c(M,E)$ が存在して

$$
f-g=P\varphi
$$

> となることをいう。$f$ の同値類を $[f]$、同値類の線形空間を $\Gamma_c(M,E)/P\Gamma_c(M,E)$ と記す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde22-source-classes -->
**定義の確認**。Minkowski平面で $P=\partial_t^2-\partial_x^2$ とし、零ではないコンパクト支持関数 $h,q$ を選んで $\varphi(t,x)=h(t)q(x)$ と置きます。積の微分から

$$
f:=P\varphi=h''(t)q(x)-h(t)q''(x)
$$

はコンパクト支持です。零源 $g=0$ との差は

$$
f-g=P\varphi,\qquad \varphi\in\Gamma_c(M)
$$

となり、定義の存在条件を満たすので $[f]=[0]$ です。他方、[コンパクト切断上での $P$ の単射性](../HPDE21/index.md#thm-hpde21-kernel-exact)より $\varphi\ne0$ なら $P\varphi\ne0$ です。**零とは異なる源も零の同値類に属す**ことを直接確認できました。
<!-- definition-example-end -->

この同値関係は $f-g\in P\Gamma_c$ と書けるため、反射律・対称律・推移律を満たします。$P\Gamma_c$ が線形部分空間なので、$[f]+[g]=[f+g]$、$\lambda[f]=[\lambda f]$ は代表元の選択に依存しません。

<a id="cor-hpde22-quotient-isomorphism"></a>

<!-- formal-statement-start -->
> **系（コンパクト源の商と空間コンパクト斉次解）**
>
> 境界のない時間向き付き滑らかな大域双曲時空 $(M,g)$、有限ランク滑らかな束 $E\to M$、normally hyperbolic作用素 $P$ のもとで、$E_{\mathrm{cau}}=G_{\mathrm{ret}}-G_{\mathrm{adv}}$ は線形同型

$$
\overline E_{\mathrm{cau}}:
\Gamma_c(M,E)/P\Gamma_c(M,E)
\longrightarrow\operatorname{Sol}_{\mathrm{sc}}(P),
\qquad [f]\longmapsto E_{\mathrm{cau}}f
$$

> を誘導する。任意の $u\in\operatorname{Sol}_{\mathrm{sc}}(P)$ に対し、過去零・未来一の滑らかなCauchy時間カットオフ $\chi$ から作る $[P(\chi u)]$ は $\overline E_{\mathrm{cau}}^{-1}(u)$ であり、時間関数とカットオフの選び方に依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

商上で値が定義できることには「同値な二源の出力が等しい」が必要です。単射性は核の等式、全射性は本講の主定理から分かります。逆の具体式はカットオフ源に伝播子を適用して検証します。

<!-- proof-start -->
### 証明

まず $[f]=[g]$ なら $f-g=P\varphi$ となるコンパクトな $\varphi$ が存在します。[零合成](../HPDE21/index.md#prop-hpde21-propagator-identities)によって

$$
E_{\mathrm{cau}}f-E_{\mathrm{cau}}g
=E_{\mathrm{cau}}P\varphi=0
$$

です。従って $[f]\mapsto E_{\mathrm{cau}}f$ は同値類の代表元によらず定まり、Green作用素の線形性により線形です。

$\overline E_{\mathrm{cau}}[f]=0$ なら、[前講の核の定理](../HPDE21/index.md#thm-hpde21-kernel-exact)から $f\in P\Gamma_c$、従って $[f]=[0]$ です。ゆえに単射です。一方、任意の $u\in\operatorname{Sol}_{\mathrm{sc}}(P)$ に対して[本講の全射性定理](#thm-hpde22-surjectivity-exact)が $f_\chi=P(\chi u)\in\Gamma_c$ と $E_{\mathrm{cau}}f_\chi=u$ を与えるので、商上でも全射です。

最後に二つのカットオフについて上で構成したコンパクトな $v=(\chi_1-\chi_2)u$ を使えば

$$
[P(\chi_1u)]-[P(\chi_2u)]
=[Pv]=[0].
$$

また別のCauchy時間関数 $\widetilde T$ を選んでも、それぞれの時間関数について[全射性定理](#thm-hpde22-surjectivity-exact)を適用できるため、二つの構成源の像はともに $u$ です。差は[前講の核の定理](../HPDE21/index.md#thm-hpde21-kernel-exact)により $P\Gamma_c$ に属します。従って時間関数を含むカットオフの選択から独立に同じ同値類を得ます。$\square$
<!-- proof-end -->

注意：これは**線形空間の同型**です。連続性や位相空間としての同型を自動的に主張するものではありません。また固定した $\chi$ による $u\mapsto P(\chi u)$ は一つの線形な原像選択ですが、その原像選択が唯一であるという意味ではありません。

## 6. 演習：台、符号、商をそれぞれ検算する

### Level A

<a id="ex-hpde22-a01"></a>
#### HPDE22-A01 平坦な進行波を切ったときの源

$M=\mathbb R^{1+1}$、$P=\partial_t^2-\partial_x^2$、$u(t,x)=h(x-t)$、$h\in C_c^\infty(\mathbb R)$ とする。$\chi=\eta(t)$（$t\le a$ で零、$t\ge b$ で一）に対して $P(\chi u)$ を求め、$\operatorname{supp}h\subset[-R,R]$ なら源が収まる閉長方形を書け。
- Level: A

<!-- solution-start -->
**詳細解答**。$z=x-t$ と置くと $u_t=-h'(z)$、$u_{tt}=h''(z)$、$u_{xx}=h''(z)$ です。積の二階微分は

$$
\partial_t^2(\eta u)
=\eta''h(z)+2\eta'(-h'(z))+\eta h''(z),
$$

$$
\partial_x^2(\eta u)=\eta h''(z).
$$

差を取って

$$
P(\chi u)=\eta''(t)h(x-t)-2\eta'(t)h'(x-t).
$$

$\eta',\eta''$ は $[a,b]$ の外で零、$h,h'$ は $[-R,R]$ の外で零です。非零の可能性は $a\le t\le b$ かつ $-R\le x-t\le R$ に限られるので

$$
\operatorname{supp}P(\chi u)
\subseteq[a,b]\times[a-R,b+R].
$$

右辺はコンパクト、左辺は閉なので源はコンパクト支持です。
<!-- solution-end -->

<a id="ex-hpde22-a02"></a>
#### HPDE22-A02 遅延と先進の符号

$Pu=0$、$w_+=\chi u$、$w_-=(\chi-1)u$、$f=P(\chi u)$ とする。$Pw_+=Pw_-=f$ を示し、$E_{\mathrm{cau}}=G_{\mathrm{ret}}-G_{\mathrm{adv}}$ に対応する差を計算せよ。$w_-$ に $1-\chi$ を使った場合との違いも述べよ。
- Level: A

<!-- solution-start -->
**詳細解答**。線形性と $Pu=0$ から

$$
Pw_+=P(\chi u)=f,
\qquad
Pw_-=P(\chi u-u)=f-Pu=f.
$$

従って対応する差は

$$
w_+-w_-=\chi u-(\chi-1)u=u.
$$

$\widetilde w_-=(1-\chi)u$ とすると $P\widetilde w_-=-f$ です。同じ源に対する二つのGreen解ではなくなるため、$G_{\mathrm{adv}}f=\widetilde w_-$ と置けません。$w_-=-\widetilde w_-$ が正しい符号です。
<!-- solution-end -->

<a id="ex-hpde22-a03"></a>
#### HPDE22-A03 空間円周の定数解

$M=\mathbb R\times S^1$、$P=\partial_t^2-\partial_\theta^2$、$u=1$ とする。$u\in\operatorname{Sol}_{\mathrm{sc}}(P)$ を確かめ、$\chi=\eta(t)$ に対する源を計算せよ。
- Level: A

<!-- solution-start -->
**詳細解答**。$P1=0$ です。$K=\{0\}\times S^1$ はコンパクトで、任意の $(t,\theta)$ は同じ角度の点 $(0,\theta)$ と時間的に結ばれます。従って $J(K)=M$、つまり $u$ の全時空の台が $J(K)$ に収まり、scです。$\eta$ は $\theta$ に依存しないので

$$
f=P(\eta(t)u)=\partial_t^2\eta-\partial_\theta^2\eta=\eta''(t).
$$

$\operatorname{supp}f\subseteq[a,b]\times S^1$ で、両因子がコンパクトだから $f\in\Gamma_c(M)$ です。[pc・fcのGreen両側逆](../HPDE20/index.md#thm-hpde20-green-two-sided)を半解へ適用すると $G_{\mathrm{ret}}f=\eta$、$G_{\mathrm{adv}}f=\eta-1$、従って $E_{\mathrm{cau}}f=1$ です。
<!-- solution-end -->

<a id="ex-hpde22-a04"></a>
#### HPDE22-A04 時間帯と因果影の交差

$\operatorname{supp}u\subseteq J(K)$（$K$ はコンパクト）、$\eta$ は $[a,b]$ の外で定数とする。$P(\eta(T)u)-\eta(T)Pu$ の台がコンパクトであることを、時間帯の支持と大域双曲性から説明せよ。
- Level: A

<!-- solution-start -->
**詳細解答**。[交換子公式](../HPDE15/index.md#lem-hpde15-partition-commutator)から差は

$$
[P,\eta(T)]u
=-(\Box_g\eta(T))u
-2\nabla^P_{\operatorname{grad}_g\eta(T)}u.
$$

連鎖律で $d(\eta(T))=\eta'(T)dT$、$\Box_g\eta(T)=\eta''(T)g^{-1}(dT,dT)+\eta'(T)\Box_gT$。従って $T<a$、$T>b$ では零であり、$u$ が近傍で零でも交換子は零です。台は

$$
J(K)\cap T^{-1}([a,b])
$$

に含まれます。[有限時間因果影のコンパクト性](../HPDE16/index.md#lem-hpde16-shadow-compact)がこれをコンパクトにするので、交換子の台はその閉部分集合としてコンパクトです。時間の有界性だけからコンパクト性を結論したわけではありません。
<!-- solution-end -->

### Level B

<a id="ex-hpde22-b01"></a>
#### HPDE22-B01 半解の支持空間を定義から証明する

$u\in\operatorname{Sol}_{\mathrm{sc}}(P)$、$\chi=\eta(T)$ が過去で零・未来で一とする。$w_+=\chi u$ がpc、$w_-=(\chi-1)u$ がfcであることを、任意のコンパクト観測集合 $L$ を使い証明せよ。時刻下限だけでpcと断定してはならない。
- Level: B

<!-- solution-start -->
**詳細解答**。$\operatorname{supp}u\subseteq J(K)$ となるコンパクト $K$ を固定します。任意の非空コンパクト $L$ に対し $B=\max_LT$ と置きます。$\operatorname{supp}w_+\subseteq J(K)\cap\{T\ge a\}$ であり、$q\in J^-(L)$ なら $T(q)\le B$ なので

$$
\operatorname{supp}w_+\cap J^-(L)
\subseteq J(K)\cap T^{-1}([a,B]).
$$

$B<a$ なら空、そうでなければ[有限時間因果影のコンパクト性](../HPDE16/index.md#lem-hpde16-shadow-compact)で右辺はコンパクト（退化区間では拡張）です。$L$ のコンパクト性と[因果到達関係の閉性](../../../幾何系/LORG/LORG16/index.md#lem-lorg16-closed-causal-relation)から $J^-(L)$ は閉です。実際、$q_n\le\ell_n\in L$ で $q_n\to q$ なら、$\ell_n$ の収束部分列を取って極限へ移せます。従って左辺はコンパクトな右辺の閉部分集合としてコンパクトであり、[pcの定義](../HPDE20/index.md#def-hpde20-support-classes)を満たします。

$w_-$ では $\operatorname{supp}w_-\subseteq J(K)\cap\{T\le b\}$ です。$A=\min_LT$ とすれば

$$
\operatorname{supp}w_-\cap J^+(L)
\subseteq J(K)\cap T^{-1}([A,b]).
$$

$J^+(L)$ も同じ極限議論で閉です。従って有限時間因果影のコンパクト性と合わせ、[fcの定義](../HPDE20/index.md#def-hpde20-support-classes)を満たします。空の $L$ の場合は両交差とも空です。
<!-- solution-end -->

<a id="ex-hpde22-b02"></a>
#### HPDE22-B02 カットオフを変えても同じ解になる

固定したCauchy時間関数 $T$ に沿う二つのカットオフ $\chi_1,\chi_2$（ともに過去零・未来一）を取る。$u\in\operatorname{Sol}_{\mathrm{sc}}(P)$ について、二つの源 $f_i=P(\chi_i u)$ の差が $P\Gamma_c$ に入ることを証明せよ。
- Level: B

<!-- solution-start -->
**詳細解答**。$\chi_i$ が変化する時間区間を $[a_i,b_i]$ とし、$A=\min(a_1,a_2)$、$B=\max(b_1,b_2)$ とします。$T<A$ なら両方零、$T>B$ なら両方一なので、$v=(\chi_1-\chi_2)u$ の台は

$$
\operatorname{supp}v\subseteq
J(K)\cap T^{-1}([A,B])
$$

に入ります。$K$ はsc性のコンパクト集合で、[有限時間因果影のコンパクト性](../HPDE16/index.md#lem-hpde16-shadow-compact)により右辺はコンパクトです。従って $v\in\Gamma_c$。$P$ の線形性から

$$
f_1-f_2=P\bigl((\chi_1-\chi_2)u\bigr)=Pv\in P\Gamma_c.
$$

さらに[因果伝播子の零合成](../HPDE21/index.md#prop-hpde21-propagator-identities)から $E_{\mathrm{cau}}(f_1-f_2)=0$ であり、両源は同じ斉次解へ写ります。
<!-- solution-end -->

<a id="ex-hpde22-b03"></a>
#### HPDE22-B03 完全系列から商の同型を組み立てる

大域双曲時空上のnormally hyperbolic作用素について

$$
0\to\Gamma_c\xrightarrow{P}\Gamma_c
\xrightarrow{E_{\mathrm{cau}}}\operatorname{Sol}_{\mathrm{sc}}(P)\to0
$$

が完全であるとする。$[f]\mapsto E_{\mathrm{cau}}f$ が商 $\Gamma_c/P\Gamma_c$ 上で良定義、単射、全射であることを、順に証明せよ。
- Level: B

<!-- solution-start -->
**詳細解答**。商の同値関係 $[f]=[g]$ は $f-g=P\varphi$ となる $\varphi\in\Gamma_c$ が存在することを意味します。完全性から $\operatorname{im}P=\ker E_{\mathrm{cau}}$ なので

$$
E_{\mathrm{cau}}f-E_{\mathrm{cau}}g
=E_{\mathrm{cau}}(P\varphi)=0.
$$

よって代表元に依らず定義できます。次に像が零なら $E_{\mathrm{cau}}f=0$、従って $f=P\varphi$ となるコンパクトな $\varphi$ が存在し、$[f]=[0]$。これは単射性です。最後に任意の $u\in\operatorname{Sol}_{\mathrm{sc}}(P)$ は列の最後の全射性から $u=E_{\mathrm{cau}}f$ と書けるので、$[f]$ が原像です。線形性は $E_{\mathrm{cau}}$ の線形性から従います。
<!-- solution-end -->

<a id="ex-hpde22-b04"></a>
#### HPDE22-B04 scを外した定数解では何が壊れるか

$M=\mathbb R^{1+1}$、$P=\partial_t^2-\partial_x^2$、$u=1$ とする。$Pu=0$ を確認し、$u$ がscでない理由を示せ。非自明な時間カットオフ $\chi=\eta(t)$ に対し、$P(\chi u)$ の台を調べ、HPDE22の全射性の証明でどこが使えなくなるか特定せよ。
- Level: B

<!-- solution-start -->
**詳細解答**。$P1=0$ です。任意のコンパクト $K$ を矩形 $[-R,R]^2$ に入れます。$(0,x)\in J(K)$ なら、ある $(s,y)\in K$ と因果的に結ばれるので $|x-y|\le|s|\le R$。従って $|x|\le2R$ です。しかし $u=1$ の台は時刻零の全直線を含むため、どんな $K$ の $J(K)$ にも含まれず、scではありません。

$\chi=\eta(t)$ なら $P(\chi u)=\eta''(t)$ です。$\eta$ が過去零・未来一の滑らかなカットオフなら $\eta''\not\equiv0$ です。実際、$\eta''\equiv0$ なら $\eta$ は一次関数であり、両端で異なる定数にはなれません。よって $\eta''(t_0)\ne0$ となる $t_0$ があり、すべての $x$ で源は $(t_0,x)$ に非零です。台は空間方向に非コンパクトです。

従って[コンパクト源補題](#lem-hpde22-compact-source)で用いた $\operatorname{supp}u\subseteq J(K)$ が成り立たず、$f_\chi\in\Gamma_c$ を得られません。後のGreen逆の議論以前に、因果伝播子の**入力作用域**から外れます。
<!-- solution-end -->

### Level C

<a id="ex-hpde22-c01"></a>
#### HPDE22-C01 進行波から短完全系列まで再構成する

Minkowski平面上で $P=\partial_t^2-\partial_x^2$、$h,q\in C_c^\infty(\mathbb R)$、

$$
u(t,x)=h(x-t)+q(x+t)
$$

とする。$\eta$ は過去で零・未来で一の滑らかな時間カットオフで、その変化は $[a,b]$ に収まるとする。

1. $u$ がscの斉次解であることを示し、$f=P(\eta(t)u)$ を導出して台がコンパクトとなる範囲を求めよ。
2. $w_+=\eta u$、$w_-=(\eta-1)u$ のpc/fcを確認し、$G_{\mathrm{ret}}f$、$G_{\mathrm{adv}}f$ をそれぞれ確定せよ。
3. 別のカットオフ $\widetilde\eta$ から得られる $\widetilde f$ との差が $P\Gamma_c$ に属することを示し、前講の核の定理と合わせて商空間上の意味を説明せよ。
- Level: C

<!-- solution-start -->
**詳細解答**。

**1. 方程式と源。** $z=x-t$、$y=x+t$ とすると

$$
u_t=-h'(z)+q'(y),\qquad
u_{tt}=h''(z)+q''(y),
$$

$$
u_{xx}=h''(z)+q''(y),\qquad Pu=0.
$$

$\operatorname{supp}h\cup\operatorname{supp}q\subset[-R,R]$ を満たす $R$ を選びます。$u\ne0$ なら $x-t\in[-R,R]$ または $x+t\in[-R,R]$ であり、どちらも時刻零の線分 $K=\{(0,x):|x|\le R\}$ からの光線に沿う点です。従って $\operatorname{supp}u\subseteq J(K)$、$u$ はscです。

積の二階微分を展開すると

$$
\begin{aligned}
f&=\partial_t^2(\eta u)-\partial_x^2(\eta u)\\
&=\eta''u+2\eta'u_t+\eta(u_{tt}-u_{xx})\\
&=\eta''(t)\{h(x-t)+q(x+t)\}\\
&\quad+2\eta'(t)\{-h'(x-t)+q'(x+t)\}.
\end{aligned}
$$

ここで $a\le t\le b$ のとき $h,h',q,q'$ が非零になり得るのは $|x-t|\le R$ または $|x+t|\le R$ です。従って

$$
|x|\le R+\max(|a|,|b|),\qquad a\le t\le b.
$$

この閉長方形はコンパクトで、$f$ はその外で零なので $f\in\Gamma_c$ です。

**2. 二つのGreen解。** $w_+$ は $t\le a$ で零で、台は $J(K)$ に含まれます。任意のコンパクト観測集合 $L$ の因果的過去と交わる部分は

$$
J(K)\cap\{a\le t\le\max_Lt\}
$$

に収まり、[有限時間因果影のコンパクト性](../HPDE16/index.md#lem-hpde16-shadow-compact)でコンパクトです。よってpcです。$w_-$ は $t\ge b$ で零であり、同様に因果的未来との交差を有限時間帯に制限できるのでfcです。

$Pu=0$ と積の計算から $Pw_+=f$、$Pw_-=P(\eta u-u)=f$。この入力条件に[Greenのpc・fc両側逆](../HPDE20/index.md#thm-hpde20-green-two-sided)を適用して

$$
G_{\mathrm{ret}}f=w_+=\eta u,\qquad
G_{\mathrm{adv}}f=w_-=(\eta-1)u.
$$

従って $E_{\mathrm{cau}}f=w_+-w_-=u$ です。

**3. 源の違い。** $\widetilde\eta$ も有限の時間帯で変化するので、$v=(\eta-\widetilde\eta)u$ はある有限時間帯の $J(K)$ に台を持ちます。[有限時間因果影のコンパクト性](../HPDE16/index.md#lem-hpde16-shadow-compact)から $v\in\Gamma_c$ です。よって

$$
f-\widetilde f
=P\{(\eta-\widetilde\eta)u\}=Pv\in P\Gamma_c.
$$

[前講の核の定理](../HPDE21/index.md#thm-hpde21-kernel-exact)は $\ker E_{\mathrm{cau}}=P\Gamma_c$ を与えるため、二つの源の同値類は $[f]=[\widetilde f]$、像はいずれも $u$ です。今回の全射性と合わせると、任意のsc斉次解はただ一つの**源の同値類**に対応します。具体的な源そのものが一意になるわけではありません。
<!-- solution-end -->

## 7. 次へつながる問い

これで、コンパクト源を $P\Gamma_c$ だけ同一視した線形空間と空間コンパクトな斉次解空間が一致しました。次のHPDE23では実Klein–Gordon作用素に範囲を絞り、二つの斉次解からCauchy面上の保存量を作ります。そこで必要になる自己随伴性や保存電流の符号は、本講の**一般の**normally hyperbolic作用素について無条件には主張しません。
