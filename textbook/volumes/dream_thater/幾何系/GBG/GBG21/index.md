# GBG21 Chern–Weil形式はなぜ閉じるか

[GBG20の大域への降下定理](../GBG20/index.md#thm-gbg20-basic-descent)によって、Lie環値曲率から基底多様体上の数値（複素数）値形式を作れた。しかし、局所的な形式が貼り合わさることと、**外微分が零になること**は別の性質である。後者が分かって初めて、[GEO9のde Rhamコホモロジー](../../GEO/GEO9/index.md#def-geo9-de-rham-cohomology)へ形式を送れる。

難所は、非可換群では一般に $dF\ne0$ となる点にある。[GBG11のBianchi恒等式](../GBG11/index.md#thm-gbg11-bianchi-local)は $dF=-[A\wedge F]$ と述べる。この残った Lie 括弧を、[GBG20のAd不変性の無限小条件](../GBG20/index.md#prop-gbg20-infinitesimal-condition)がちょうど消す。以下ではこの二つの相殺を次数符号込みで計算する。

**全節の設定**：$M$ は Hausdorff・第二可算で境界のない滑らかな有限次元多様体とする。$G$ は有限次元 Lie 群、$\mathfrak g$ はその実 Lie 環である。群の連結性・行列群性は仮定しない。

$\pi:P\to M$ は滑らかな右主 $G$ 束である。$\omega$ はその接続1形式、$\Omega$ は曲率2形式とする。局所 section $s_i:U_i\to P$ に対する接続と曲率の表示は、順に次の二つである。

$$
A_i=s_i^*\omega,\qquad F_i=s_i^*\Omega.
$$

整数 $k\ge1$ を固定し、$p:\mathfrak g^k\to\mathbb C$ は各引数で実線形な対称Ad不変形式とする。複素値形式には外微分と外積を複素線形に拡張する。計量・向き・コンパクト性は閉性の証明に不要である。

<!-- definition-example-audit: strict -->

## 1. 大域形式を閉形式として読めるか

[GBG20の曲率多項式形式の定義](../GBG20/index.md#def-gbg20-curvature-polynomial-form)では、Lie 環の実基底 $e_a$ に関して $F=\sum_a F^ae_a$ と書き、

$$
p(F^k)=\sum_{a_1,\ldots,a_k}
p(e_{a_1},\ldots,e_{a_k})
F^{a_1}\wedge\cdots\wedge F^{a_k}
$$

と定めた。基底の取り替えに依存しない $2k$ 形式である。曲率のゲージ変換 $F_j=\operatorname{Ad}_{g_{ij}^{-1}}F_i$ に $p$ のAd不変性を適用すると、重なりで $p(F_j^k)=p(F_i^k)$ となる。

この大域形式を、その役割が分かる名前で呼ぶ。新しい計算規則を導入するのではなく、前講で構成した形式に名前を付ける。

<a id="def-gbg21-chern-weil-form"></a>

<!-- formal-statement-start -->
> **定義（Chern–Weil形式）**  
> 滑らかな右主 $G$ 束 $\pi:P\to M$ の接続 $\omega$、曲率 $\Omega$、整数 $k\ge1$、対称Ad不変実 $k$ 重線形形式 $p:\mathfrak g^k\to\mathbb C$ に対し、[大域への降下で定まる形式](../GBG20/index.md#thm-gbg20-basic-descent) $\beta_p(\omega)\in\Omega^{2k}(M;\mathbb C)$ を **Chern–Weil形式** と呼ぶ。すなわち
>
$$
\pi^*\beta_p(\omega)=p(\Omega^k),
\qquad
\beta_p(\omega)|_{U_i}=p(F_i^k).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg21-chern-weil-form -->
**定義の確認**。積主 $U(1)$ 束を $M=\mathbb R^4$ 上で取り、標準 section における接続を

$$
A=i(x^1dx^2+x^3dx^4)
$

とする。$\mathfrak u(1)=i\mathbb R$ は可換だから、[局所曲率の構造方程式](../GBG10/index.md#thm-gbg10-local-formula)の括弧項は零になる。座標関数を外微分し、$d^2x^j=0$ を使うと

$
\begin{aligned}
F=dA
&=i\bigl(d(x^1dx^2)+d(x^3dx^4)\bigr)\\
&=i(dx^1\wedge dx^2+dx^3\wedge dx^4)
=i(\eta+\zeta),\\
\eta&=dx^1\wedge dx^2,\qquad
\zeta=dx^3\wedge dx^4.
\end{aligned}
$

実基底 $e=i$ によって $F=e(\eta+\zeta)$ と表せる。$p(it_1,it_2)=t_1t_2$（$t_1,t_2\in\mathbb R$）は実双線形、対称であり、随伴作用が自明だからAd不変である。さらに $p(e,e)=1$ なので、[係数形式へ外積を施す規則](../GBG20/index.md#def-gbg20-curvature-polynomial-form)は $p(F,F)=(\eta+\zeta)\wedge(\eta+\zeta)$ となる。この各条件を確認した上で計算すると

$$
\beta_p(\omega)=p(F,F)
=(\eta+\zeta)\wedge(\eta+\zeta)
=2\eta\wedge\zeta.
$$

$\eta\wedge\eta=\zeta\wedge\zeta=0$、かつ $(-1)^{2\cdot2}=+1$ なので交差項は二倍になる。積主束で大域 section があるため、表示した $p(F,F)$ がそのまま基底上の形式である。$d\beta_p=0$ はここでは定数係数の直接微分で確認できるが、任意の主束での閉性はまだ証明していない。
<!-- definition-example-end -->

[閉形式の定義](../../GEO/GEO9/index.md#def-geo9-closed-exact)は $d\beta=0$ である。この条件を示すには、上の積主束のような定数係数計算だけでは足りない。

## 2. 外微分を曲率の一つずつに作用させる

形式の次数を先に確かめる。[GEO7の次数付きLeibniz則](../../GEO/GEO7/index.md#thm-geo7-graded-leibniz)は

$$
d(\alpha\wedge\gamma)=d\alpha\wedge\gamma+
(-1)^{\deg\alpha}\alpha\wedge d\gamma
$$

である。曲率の各係数形式は次数2なので、前の因子を越える符号は常に $(-1)^2=+1$。多重線形形式 $p$ の係数は定数で、微分するのは $F^a$ のみである。

<a id="lem-gbg21-curvature-product-derivative"></a>

<!-- formal-statement-start -->
> **補題（曲率多項式の外微分）**  
> $U$ を滑らかな多様体の開集合、$F\in\Omega^2(U;\mathfrak g)$、$p:\mathfrak g^k\to\mathbb C$ を対称実 $k$ 重線形形式とする。このとき、係数に外積を施す規則によって
>
$$
d\,p(F^k)
=\sum_{j=1}^k p(F,\ldots,dF,\ldots,F)
=k\,p(dF,F^{k-1}).
$$
>
> 第 $j$ 項には $j$ 番目の位置に $dF$ を入れる。最後の式の $dF$ は次数3の Lie環値形式である。
<!-- formal-statement-end -->

**証明の見取り図**。一つの項を微分するごとに次数2の因子を通過する。したがって符号は正であり、対称性と偶数次数の交換則により $k$ 項が一致する。

<!-- proof-start -->
### 証明

$\mathfrak g$ の実基底 $(e_a)$ に $F=\sum_a e_aF^a$ を展開すると、係数 $p(e_{a_1},\ldots,e_{a_k})$ は複素定数である。よって

$$
\begin{aligned}
d\,p(F^k)
&=\sum_{a_1,\ldots,a_k}p(e_{a_1},\ldots,e_{a_k})
\,d(F^{a_1}\wedge\cdots\wedge F^{a_k})\\
&=\sum_{a_1,\ldots,a_k}p(e_{a_1},\ldots,e_{a_k})
\sum_{j=1}^k
(-1)^{2(j-1)}
F^{a_1}\wedge\cdots\wedge dF^{a_j}
\wedge\cdots\wedge F^{a_k}.
\end{aligned}
$$

各符号は $(-1)^{2(j-1)}=1$。$dF^{a_j}$ は次数3だが、それをほかの次数2の因子と交換する符号も $(-1)^{3\cdot2}=+1$ である。基底添字の置換と $p$ の対称性で $j$ 番目の項を第1項へ移せる。したがって $k$ 個の項はすべて $p(dF,F^{k-1})$ に等しい。
<!-- proof-end -->

これは任意の Lie 環値2形式 $F$ に成り立つ。一方、右辺を零にするには $F$ が**接続から得られる曲率**であるという追加情報が必要となる。

## 3. Lie括弧を消すのはAd不変性

[GBG11の局所Bianchi恒等式](../GBG11/index.md#thm-gbg11-bianchi-local)を任意の局所接続 $A$ に適用すると

$$
dF=-[A\wedge F]
$$

となる。括弧付き外積 $[A\wedge F]$ は次数3であり、行列群なら $A\wedge F-F\wedge A$ と書く。**行列積の順序を交換した式ではない**。

[GBG20の無限小不変条件](../GBG20/index.md#prop-gbg20-infinitesimal-condition)は、任意の $Y,X_1,\ldots,X_k\in\mathfrak g$ に対し

$$
\sum_{j=1}^k p(X_1,\ldots,[Y,X_j],\ldots,X_k)=0
$$

と述べる。ここへ $Y$ に接続1形式の係数を、$X_j$ に曲率2形式の係数を代入する。次数が偶数であることのおかげで、形式の順序を移動しても補正符号は出ない。

<a id="lem-gbg21-invariance-cancellation"></a>

<!-- formal-statement-start -->
> **補題（Ad不変性による括弧項の相殺）**  
> $U$ 上の $\mathfrak g$ 値1形式 $A$ と $\mathfrak g$ 値2形式 $F$ を取り、$p:\mathfrak g^k\to\mathbb C$ は対称Ad不変実 $k$ 重線形形式とする。このとき次の $(2k+1)$ 形式は零である。
>
$$
\sum_{j=1}^k
p(F,\ldots,[A\wedge F],\ldots,F)=0.
$$
>
> 特に
>
$$
p([A\wedge F],F^{k-1})=0
$$
>
> が成り立つ。
<!-- formal-statement-end -->

**証明の見取り図**。接続の係数 $A^b$ を最も左に出す。曲率の係数 $F^a$ をすべて右に残すと、各係数に付く Lie環値の和はちょうど無限小Ad不変条件になる。

<!-- proof-start -->
### 証明

$\mathfrak g$ の実基底 $(e_a)$ について、$A=\sum_b e_b A^b$、$F=\sum_a e_a F^a$ と展開する。ここで $A^b$ は実1形式、$F^a$ は実2形式である。括弧付き外積の係数表示は

$$
[A\wedge F]=\sum_{b,a}[e_b,e_a]\,A^b\wedge F^a
$$

となる。和の第 $j$ 項を計算すると

$$
\begin{aligned}
&p(F,\ldots,[A\wedge F],\ldots,F)\\
&=\sum_{b,a_1,\ldots,a_k}
p(e_{a_1},\ldots,[e_b,e_{a_j}],\ldots,e_{a_k})\\
&\hspace{1.5em}\cdot F^{a_1}\wedge\cdots\wedge
F^{a_{j-1}}\wedge A^b\wedge F^{a_j}\wedge\cdots\wedge F^{a_k}.
\end{aligned}
$$

$A^b$ を左端へ移すと $j-1$ 個の2形式を通るので、符号は $(-1)^{1\cdot2(j-1)}=+1$。したがって $j$ に関する和は

$$
\begin{aligned}
&\sum_{b,a_1,\ldots,a_k}A^b\wedge
F^{a_1}\wedge\cdots\wedge F^{a_k}\\
&\quad\cdot\left(
\sum_{j=1}^k
p(e_{a_1},\ldots,[e_b,e_{a_j}],\ldots,e_{a_k})
\right)=0.
\end{aligned}
$$

括弧内は $Y=e_b$、$X_j=e_{a_j}$ に適用した[無限小Ad不変条件](../GBG20/index.md#prop-gbg20-infinitesimal-condition)そのものである。さらに、対称性と次数 $3\cdot2$ が偶数であることから左辺の $k$ 項はすべて等しい。従って $k\,p([A\wedge F],F^{k-1})=0$。係数体は $\mathbb C$、$k\ge1$ なので $k$ で割れば結論を得る。
<!-- proof-end -->

**仮定を外すと**、例えば行列の $(1,2)$ 成分を取る線形写像はAd不変ではない。上の和の括弧内を零とできず、たとえ曲率がBianchi恒等式を満たしても外微分は残り得る。具体計算は第5節で行う。

## 4. Chern–Weil形式の閉性

局所的には $dF$ が零でなくても、前節の相殺を使えば $d\,p(F^k)$ は零となる。これが本講の中心定理である。

<a id="thm-gbg21-chern-weil-closed"></a>

<!-- formal-statement-start -->
> **定理（Chern–Weil形式の閉性）**  
> $M$ を境界のない滑らかな有限次元多様体、$G$ を有限次元 Lie 群、$P\to M$ を滑らかな右主 $G$ 束、$\omega$ を任意の接続、$\Omega$ をその曲率とする。$k\ge1$ と対称Ad不変実 $k$ 重線形形式 $p:\mathfrak g^k\to\mathbb C$ に対し、[Chern–Weil形式](#def-gbg21-chern-weil-form)は
>
$$
\boxed{d\beta_p(\omega)=0}
$$
>
> を満たす。$G$ の連結性、計量、向き、$\omega$ の平坦性を必要としない。$2k>\dim M$ では形式自体が零である。
<!-- formal-statement-end -->

**証明の見取り図**。前講の降下定理で $p(F_i^k)$ は重なりで一致する。各局所表示で、曲率積の微分補題を適用し、Bianchi恒等式で $dF_i$ を括弧に置き換え、不変性の補題で打ち消す。大域形式の外微分は局所計算で決まる。

<!-- proof-start -->
### 証明

まず[不変曲率多項式の大域への降下](../GBG20/index.md#thm-gbg20-basic-descent)から、大域形式 $\beta_p(\omega)$ が存在し、任意の局所 section $s_i$ による表示は $p(F_i^k)$ である。重なりでの一致は曲率変換 $F_j=\operatorname{Ad}_{g_{ij}^{-1}}F_i$ とAd不変性から

$$
p(F_j^k)=p((\operatorname{Ad}_{g_{ij}^{-1}}F_i)^k)=p(F_i^k)
$$

と確認できる。したがって形式を各局所で微分してよい。

[曲率積の微分補題](#lem-gbg21-curvature-product-derivative)を $F=F_i$ に適用し、[局所Bianchi恒等式](../GBG11/index.md#thm-gbg11-bianchi-local)を代入する。

$$
\begin{aligned}
d(\beta_p(\omega)|_{U_i})
&=d\,p(F_i^k)\\
&=k\,p(dF_i,F_i^{k-1})\\
&=-k\,p([A_i\wedge F_i],F_i^{k-1})\\
&=0.
\end{aligned}
$$

最後の等号は[Ad不変性による相殺補題](#lem-gbg21-invariance-cancellation)である。任意の点 $x\in M$ はある $U_i$ に属し、そこで外微分が零だから $d\beta_p(\omega)=0$ が $M$ 全体で成立する。$2k>\dim M$ の場合も $p(F_i^k)=0$ であり結論は同じである。
<!-- proof-end -->

### 主束上の大域式からも確認する

局所 section を選ばずに、$P$ 上で前節と同じ計算を行うこともできる。[GBG11の大域Bianchi恒等式](../GBG11/index.md#thm-gbg11-bianchi-global)は

$$
d\Omega=-[\omega\wedge\Omega].
$$

したがって

$$
d\,p(\Omega^k)
=k\,p(d\Omega,\Omega^{k-1})
=-k\,p([\omega\wedge\Omega],\Omega^{k-1})=0.
$$

この計算は $P$ 上の形式についての式である。[降下定理](../GBG20/index.md#thm-gbg20-basic-descent)で $\pi^*\beta_p=p(\Omega^k)$、さらに $d$ は引き戻しと交換するので

$$
\pi^*(d\beta_p)=d(\pi^*\beta_p)=0.
$$

局所 section で引き戻すと $s_i^*\pi^*(d\beta_p)=d\beta_p|_{U_i}=0$。よって局所証明と同じ結論になる。単に $\pi^*\gamma=0$ から無条件に結論するのではなく、**局所 section が存在するため引き戻しが単射**であることを使っている。

### 得られたのはどの種類の不変量か

[de Rhamコホモロジーの定義](../../GEO/GEO9/index.md#def-geo9-de-rham-cohomology)によれば、閉じた $2k$ 形式は商空間に類を定める。複素係数では実係数の構成を成分ごとに複素線形に拡張して

$$
[\beta_p(\omega)]\in H_{\mathrm{dR}}^{2k}(M;\mathbb C)
$$

を得る。これが接続の選択に依らないかどうかは、**異なる二つの接続の形式の差が完全形式になること**を別に証明する必要がある。そこは次の GBG22 で扱う。また任意の $p$ から得られる積分が整数になるわけでもない。整数性は適切な正規化と位相的な追加論証を要する。

## 5. 何が閉性を生み、何が失敗させるか

### 非可換な曲率でもtraceは閉じる

$U=\mathbb R^3$ 上の積主 $GL(2,\mathbb R)$ 束を取り、$H=E_{11}$、$X=E_{12}$（行列単位）とする。$HX=X$、$XH=0$ だから $[H,X]=X$。局所接続

$$
A=zH\,dx+X\,dy
$$

に対して[局所曲率の構造方程式](../GBG10/index.md#thm-gbg10-local-formula)を計算すると

$$
\begin{aligned}
F&=dA+A\wedge A
=H\,dz\wedge dx+zX\,dx\wedge dy,\\
dF&=X\,dz\wedge dx\wedge dy\ne0.
\end{aligned}
$$

それでも $p(Y)=\operatorname{tr}Y$ は[対称化traceのAd不変性](../GBG20/index.md#thm-gbg20-trace-invariant)を標準表現の $k=1$ に適用したもので、随伴不変である。$\operatorname{tr}H=1$、$\operatorname{tr}X=0$ より

$$
p(F)=dz\wedge dx,\qquad d\,p(F)=0.
$$

これは曲率自身の外微分が非零でも、不変な線形形式を通せば閉形式になる**非可換な実例**である。

一方、$\ell(Y)=Y_{12}$ と置くと $\ell(F)=z\,dx\wedge dy$ であり、

$$
d\,\ell(F)=dz\wedge dx\wedge dy\ne0.
$$

$\ell$ は例えば $\operatorname{diag}(2,1)$ による共役で $E_{12}$ の値が変わるのでAd不変ではない。破れた仮定は正確には**不変多項式であること**であり、Bianchi恒等式の失敗ではない。

### 行列二次形式で次数符号を検算する

行列群の標準表現では $p(X,Y)=\operatorname{tr}(XY)$ は対称Ad不変であり、

$$
p(F,F)=\operatorname{tr}(F\wedge F).
$$

$F$ は次数2だから [Leibniz則](../../GEO/GEO7/index.md#thm-geo7-graded-leibniz)より

$$
d\,\operatorname{tr}(F\wedge F)
=\operatorname{tr}(dF\wedge F+F\wedge dF)
=2\operatorname{tr}(dF\wedge F).
$$

第二の等号は次数 $2\cdot3=6$ による符号 $+1$ とtraceの巡回性である。さらに $dF=-A\wedge F+F\wedge A$ を代入すると

$$
\begin{aligned}
d\,\operatorname{tr}(F\wedge F)
&=-2\operatorname{tr}(A\wedge F\wedge F)
+2\operatorname{tr}(F\wedge A\wedge F)\\
&=0.
\end{aligned}
$$

ここでも次の等式は**次数付き巡回性**に基づく。

$$
\operatorname{tr}(F\wedge A\wedge F)
=\operatorname{tr}(A\wedge F\wedge F).
$$

行列の可換性は一切使っていない。

### 任意の2形式にはBianchi恒等式を適用できない

$U=\mathbb R^3$、$G=U(1)$ とし、Lie環値2形式 $K=ix\,dy\wedge dz$ を任意に与える。$p(it)=t$ はAd不変だが

$$
d\,p(K)=dx\wedge dy\wedge dz\ne0.
$$

$U(1)$ の曲率なら $F=dA$ で $dF=d^2A=0$ になるため、この $K$ は**接続の曲率にはなれない**。不変性は括弧項を消すが、Bianchi恒等式が無ければ $dK$ は消えない。二つの仮定がそれぞれ別の役割を担うことが分かる。

## 6. 演習と詳細解答

### Level A：微分・符号・仮定を確かめる

<a id="ex-gbg21-a01"></a>
#### GBG21-A01 traceで一回の相殺
- Level: A

行列群の局所曲率 $F=dA+A\wedge A$ に対し、$d\,\operatorname{tr}F=0$ を、$dF=-[A\wedge F]$ という曲率の恒等式から導け。$dF=0$ と仮定してはならない。

<!-- solution-start -->
**詳細解答**。[主束曲率の Bianchi 恒等式・局所形式](../GBG11/index.md#thm-gbg11-bianchi-local)から

$$
dF=-[A\wedge F]=-A\wedge F+F\wedge A.
$$

traceを取ると

$$
d\,\operatorname{tr}F
=-\operatorname{tr}(A\wedge F)+\operatorname{tr}(F\wedge A).
$$

次数はそれぞれ1と2なので、次数付き巡回性により $\operatorname{tr}(F\wedge A)=(-1)^{2\cdot1}\operatorname{tr}(A\wedge F)=\operatorname{tr}(A\wedge F)$。二項は相殺し零になる。曲率の行列各成分の外微分が零だとは主張していない。
<!-- solution-end -->

<a id="ex-gbg21-a02"></a>
#### GBG21-A02 偶数次数の外微分
- Level: A

$\alpha,\gamma\in\Omega^2(U)$ に対し $d(\alpha\wedge\gamma)$ を展開せよ。$\alpha=\gamma$ のとき $d(\alpha\wedge\alpha)$ を求め、なぜ係数2が現れるか説明せよ。

<!-- solution-start -->
**詳細解答**。[次数付きLeibniz則](../../GEO/GEO7/index.md#thm-geo7-graded-leibniz)を最初の因子 $\alpha$（次数2）へ適用すると

$$
d(\alpha\wedge\gamma)
=d\alpha\wedge\gamma+(-1)^2\alpha\wedge d\gamma
=d\alpha\wedge\gamma+\alpha\wedge d\gamma.
$$

$\gamma=\alpha$ なら $d\alpha$ は次数3で、$\alpha\wedge d\alpha=(-1)^{2\cdot3}d\alpha\wedge\alpha=d\alpha\wedge\alpha$。従って

$$
d(\alpha\wedge\alpha)=2\,d\alpha\wedge\alpha.
$$

1形式同士の交換に現れる負号をここへ流用してはならない。
<!-- solution-end -->

<a id="ex-gbg21-a03"></a>
#### GBG21-A03 可換な4形式
- Level: A

$U=\mathbb R^5$ の $U(1)$ 積主束で $A=i(x^1dx^2+x^3dx^4)$ とし、$p(it_1,it_2)=t_1t_2$ とする。$F$、$p(F,F)$、$d\,p(F,F)$ を計算せよ。なぜ5次元を選ぶと検算になるか述べよ。

<!-- solution-start -->
**詳細解答**。可換群のため $F=dA$。$\eta=dx^1\wedge dx^2$、$\zeta=dx^3\wedge dx^4$ とおくと

$$
F=i(\eta+\zeta),\qquad
p(F,F)=(\eta+\zeta)^2=2\eta\wedge\zeta.
$$

すべての係数が定数なので

$$
d\,p(F,F)=2\,d(dx^1\wedge dx^2\wedge dx^3\wedge dx^4)=0.
$$

4次元上の4形式なら外微分は次数5となって自動的に零だが、5次元ではその理由は使えない。今回は実際の係数の微分で零と確かめた。
<!-- solution-end -->

<a id="ex-gbg21-a04"></a>
#### GBG21-A04 不変性を失った曲率成分
- Level: A

$H=E_{11},X=E_{12}\in\mathfrak{gl}(2,\mathbb R)$、$A=zH\,dx+X\,dy$、$\ell(Y)=Y_{12}$ とする。$\ell(F)$ が閉じないことと、$\ell$ がAd不変でないことを確かめよ。

<!-- solution-start -->
**詳細解答**。$[H,X]=X$ により

$$
F=H\,dz\wedge dx+zX\,dx\wedge dy,\qquad
\ell(F)=z\,dx\wedge dy.
$$

したがって $d\,\ell(F)=dz\wedge dx\wedge dy\ne0$。また $g=\operatorname{diag}(2,1)$ とすると $gXg^{-1}=2X$ であるから $\ell(\operatorname{Ad}_gX)=2\ne1=\ell(X)$。外微分の非零はBianchi恒等式と矛盾せず、閉性定理のAd不変性という仮定を満たしていないために起こる。
<!-- solution-end -->

### Level B：不変条件を実際に使う

<a id="ex-gbg21-b01"></a>
#### GBG21-B01 二次形式の括弧項
- Level: B

$p:\mathfrak g^2\to\mathbb C$ を対称Ad不変実双線形形式とする。$\mathfrak g$ 値1形式 $A$ と2形式 $F$ について、$p([A\wedge F],F)=0$ を成分から導け。

<!-- solution-start -->
**詳細解答**。基底 $e_a$ に $A=\sum_b A^be_b$、$F=\sum_a F^ae_a$ を展開し、

$$
p([A\wedge F],F)
=\sum_{b,a,c}p([e_b,e_a],e_c)\,
A^b\wedge F^a\wedge F^c.
$$

[無限小Ad不変条件](../GBG20/index.md#prop-gbg20-infinitesimal-condition)を $Y=e_b,X_1=e_a,X_2=e_c$ に適用すると

$$
p([e_b,e_a],e_c)+p(e_a,[e_b,e_c])=0.
$$

和で $(a,c)$ を交換すると、$p(e_a,[e_b,e_c])$ の寄与は、$p$ の対称性と $F^c\wedge F^a=F^a\wedge F^c$ により最初の寄与に一致する。従って上の二項の和を全添字で取ると $2p([A\wedge F],F)=0$。複素数上なので2で割って結論を得る。
<!-- solution-end -->

<a id="ex-gbg21-b02"></a>
#### GBG21-B02 traceの4形式と次数付き巡回性
- Level: B

行列群の曲率 $F$ について、$d\,\operatorname{tr}(F\wedge F)=0$ を $dF=-A\wedge F+F\wedge A$ から示せ。必要な交換符号を明記せよ。

<!-- solution-start -->
**詳細解答**。次数2の $F$ へ[Leibniz則](../../GEO/GEO7/index.md#thm-geo7-graded-leibniz)を適用して

$$
d\,\operatorname{tr}(F\wedge F)
=\operatorname{tr}(dF\wedge F)+\operatorname{tr}(F\wedge dF).
$$

後者は次数 $2\cdot3=6$ により前者と同じtraceを持つ。従って $2\operatorname{tr}(dF\wedge F)$。Bianchiを代入すれば

$$
\begin{aligned}
2\operatorname{tr}(dF\wedge F)
&=-2\operatorname{tr}(A\wedge F\wedge F)
+2\operatorname{tr}(F\wedge A\wedge F)\\
&=0.
\end{aligned}
$$

最後は $F$ を残りの $A\wedge F$（次数3）の右へ巡回させる符号 $(-1)^{2\cdot3}=+1$ による。$AF=FA$ という行列の可換性を仮定したわけではない。
<!-- solution-end -->

<a id="ex-gbg21-b03"></a>
#### GBG21-B03 貼り合わせと閉性は別の論証
- Level: B

局所sectionの重なりで $F_j=\operatorname{Ad}_{g_{ij}^{-1}}F_i$ が成立する右主 $G$ 束を取る。$p$ は対称Ad不変 $k$ 重線形形式であるとする。局所形式 $p(F_i^k)$ が大域形式を定めること、さらに閉じることを**異なる根拠**で説明せよ。

<!-- solution-start -->
**詳細解答**。第一段階では [局所曲率変換則](../GBG10/index.md#thm-gbg10-gauge-transform)にAd不変性を適用し、

$$
p(F_j^k)=p((\operatorname{Ad}_{g_{ij}^{-1}}F_i)^k)=p(F_i^k)
$$

を得る。これで重なりにおける値が一致し、滑らかな大域形式 $\beta$ が一意に定まる。

第二段階では各パッチで $d\,p(F_i^k)=k p(dF_i,F_i^{k-1})$ と微分し、[主束曲率の Bianchi 恒等式・局所形式](../GBG11/index.md#thm-gbg11-bianchi-local)から $dF_i=-[A_i\wedge F_i]$ を代入する。[括弧項の相殺](#lem-gbg21-invariance-cancellation)によって零となるので、大域に $d\beta=0$。最初の貼り合わせ計算だけから閉性を結論したわけではない。
<!-- solution-end -->

<a id="ex-gbg21-b04"></a>
#### GBG21-B04 任意の2形式は曲率とは限らない
- Level: B

$\mathbb R^3$ の $U(1)$ 積主束上で、$K=ix\,dy\wedge dz$ を考える。$p(it)=t$ はAd不変なのに $p(K)$ は閉じない。どの仮定が足りないか示し、もし $K=dA$ なら矛盾する理由を述べよ。

<!-- solution-start -->
**詳細解答**。$p(K)=x\,dy\wedge dz$ なので

$$
d\,p(K)=dx\wedge dy\wedge dz\ne0.
$$

$G=U(1)$ は可換であるから、不変性の無限小条件は自動的に真である。しかし $K$ が接続の曲率だとは仮定していない。もし $K=dA$ を満たす $U(1)$ 接続の局所表示 $A$ があれば、[外微分の二乗は零](../../GEO/GEO7/index.md#thm-geo7-d-square-zero)により $dK=d^2A=0$ となる。実際は $dK=i\,dx\wedge dy\wedge dz\ne0$ なので矛盾する。閉性定理の曲率という仮定を失ったため、Bianchi恒等式が利用できない。
<!-- solution-end -->

### Level C：monopoleと閉形式を組み合わせる

<a id="ex-gbg21-c01"></a>
#### GBG21-C01 $S^2\times S^2$ 上のChern–Weil形式
- Level: C

外向きに向きを付けた二つの球面の積 $M=S^2\times S^2$ を積の向きで考える。$\sigma_1,\sigma_2$ を各球面の面積形式（$\int_{S^2}\sigma_j=4\pi$）の引き戻しとする。[GBG19のmonopole接続](../GBG19/index.md#thm-gbg19-curvature-flux)を各因子に取り、整数 $m,n$ に対して、二つの主束を $M$ へ引き戻す。さらに**局所遷移関数の積**で貼り合わせた主 $U(1)$ 束を考え、二つの引き戻し接続1形式の和を局所接続とする。単純な主束の直積（構造群 $U(1)\times U(1)$）とは区別する。この接続の曲率は

$
F=-\frac{i}{2}(m\sigma_1+n\sigma_2)
$

である。$p_1(X)=iX/(2\pi)$、$p_2(X,Y)=p_1(X)p_1(Y)$ とする。

1. $p_1,p_2$ の不変性と次数を確認し、$\beta_{p_1},\beta_{p_2}$ を求めよ。
2. 本講の閉性定理を適用する仮定を列挙し、$\beta_{p_2}$ が閉じる理由を述べよ。
3. $\int_M\beta_{p_2}$ を求めよ。一般の不変多項式から整数性が従うか、区別せよ。
4. $mn\ne0$ のとき $\beta_{p_2}$ が完全形式でない理由を示せ。

<!-- solution-start -->
**詳細解答**。

**1.** まず「曲率の和」を持つ主束の作り方を確認する。$\operatorname{pr}_j:M\to S^2$ を第 $j$ 因子への射影とする。各球面上のmonopole主束を引き戻した積パッチ $U_\alpha\times U_\beta$（$\alpha,\beta\in\{N,S\}$）で、遷移関数を

$
h_{(\alpha,\beta),(\alpha',\beta')}
=\bigl(g^{(m)}_{\alpha\alpha'}\circ\operatorname{pr}_1\bigr)
\bigl(g^{(n)}_{\beta\beta'}\circ\operatorname{pr}_2\bigr)
$

とする。各 $g^{(m)},g^{(n)}$ は[GBG19の接続に使ったmonopole主束](../GBG19/index.md#def-gbg19-monopole-potentials)の遷移関数である。それぞれのcocycle条件と $U(1)$ の可換性から、$h$ もcocycle条件を満たす。局所接続1形式を

$
A_{\alpha\beta}
=\operatorname{pr}_1^*A^{(m)}_\alpha
+\operatorname{pr}_2^*A^{(n)}_\beta
$

と置けば、重なりで

$
A_{\alpha'\beta'}-A_{\alpha\beta}
=(g^{(m)}_{\alpha\alpha'})^{-1}d g^{(m)}_{\alpha\alpha'}
+(g^{(n)}_{\beta\beta'})^{-1}d g^{(n)}_{\beta\beta'}
=h^{-1}dh
$

となる。ここでは各 $g$ とその微分を対応する射影で引き戻した記号で略記した。積の微分則と $U(1)$ の可換性を使ったので、これは主 $U(1)$ 接続の貼り合わせ条件である。従って $F=dA_{\alpha\beta}=\operatorname{pr}_1^*F_m+\operatorname{pr}_2^*F_n=-i(m\sigma_1+n\sigma_2)/2$ が確かめられる。

$U(1)$ は可換でAd作用が自明であり、$p_1$ は実線形、$p_2$ は実双線形かつ対称である。どちらもAd不変である。$i(-i)=1$ を用いると

$$
\beta_{p_1}=\frac{iF}{2\pi}
=\frac{m\sigma_1+n\sigma_2}{4\pi}.
$$

曲率の2形式を二つ掛けると $\sigma_j\wedge\sigma_j=0$（各因子は2次元）、$\sigma_1\wedge\sigma_2=\sigma_2\wedge\sigma_1$ だから

$$
\begin{aligned}
\beta_{p_2}
&=\beta_{p_1}\wedge\beta_{p_1}\\
&=\frac{m^2\sigma_1^2+mn\,\sigma_1\wedge\sigma_2
+mn\,\sigma_2\wedge\sigma_1+n^2\sigma_2^2}{16\pi^2}\\
&=\frac{mn}{8\pi^2}\,\sigma_1\wedge\sigma_2.
\end{aligned}
$$

**2.** 基底 $S^2\times S^2$ は滑らかな有限次元多様体、構造群は有限次元Lie群、$F$ は上記の滑らかな主束接続の曲率であり、$p_2$ は対称Ad不変である。従って[閉性定理](#thm-gbg21-chern-weil-closed)を $k=2$ で適用して $d\beta_{p_2}=0$。これは貼り合わせとBianchi恒等式を使った一般の結論である。

**3.** 積の向きと積分の積公式により

$$
\begin{aligned}
\int_M\beta_{p_2}
&=\frac{mn}{8\pi^2}
\left(\int_{S^2}\sigma_1\right)
\left(\int_{S^2}\sigma_2\right)\\
&=\frac{mn}{8\pi^2}(4\pi)(4\pi)
=2mn.
\end{aligned}
$$

この整数は、各因子の[巻き数で正規化されたmonopole曲率](../GBG19/index.md#thm-gbg19-curvature-flux)を採用した具体例から得られた。任意の複素定数 $c$ を掛けた $cp_2$ もAd不変だが、積分は $2cmn$ となり一般には整数でない。従ってAd不変性と閉性だけでは整数性を保証しない。

**4.** もし $\beta_{p_2}=d\gamma$ なら、境界のないコンパクトで向き付けられた $M$ に[一般Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)を適用して

$$
\int_M\beta_{p_2}=\int_M d\gamma=\int_{\partial M}\gamma=0.
$$

しかし $mn\ne0$ なら第3問の値は $2mn\ne0$ で矛盾する。したがって閉形式であっても完全とは限らず、de Rham類は非零である。
<!-- solution-end -->

---

局所曲率の貼り合わせに加え、**Bianchi恒等式とAd不変性を合わせると、大域形式の外微分は零になる**。次の **GBG22** では二つの接続を補間し、その形式の差が完全形式であることを導く。