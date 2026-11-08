# DEF1-03 Maurer–Cartan方程式

<!-- definition-example-audit: strict -->

## 1. 一次の閉条件だけでは、複素構造を作れない

前章では[Beltrami微分のグラフ](../DEF1-02/index.md#def-def1-02-beltrami-graph)を、固定した複素多様体 $X$ の反正則方向を傾ける候補として作った。グラフが共役と直和をなすことは「ほとんど複素構造」があるという条件であり、反正則ベクトル場同士のLie括弧が閉じることは別の条件だった。

また、[実際の変形族の一次閉条件](../DEF1-02/index.md#prop-def1-02-linear-integrability)では、$t$ の一次項しか調べていない。一次係数が閉じていても、二次のLie括弧が残るかもしれない。今回は**どの二次項が残るか**を数式にし、それを消す条件を導こう。

$X$ を複素次元 $n$ の滑らかな複素多様体とし、前章の[接束値（0,1）形式](../DEF1-02/index.md#def-def1-02-tangent-valued-form)を二つ取る。

$$
\phi=\sum_{i,j}\phi^i_{\bar j}\,d\bar z^j\otimes\partial_{z^i},
\qquad
\psi=\sum_{i,j}\psi^i_{\bar j}\,d\bar z^j\otimes\partial_{z^i}.
$$

各添字 $j$ に対して $\phi_{\bar j}=\sum_i\phi^i_{\bar j}\partial_{z^i}$ と略記する。$\phi_{\bar j}$ は一般に**滑らかな**$(1,0)$ ベクトル場で、正則ベクトル場とは限らない。従ってその係数は $z$ と $\bar z$ の両方に依存してよい。

括弧 $[\phi,\psi]$ は、同じ種類の接束値形式を二つ入力して接束値 $(0,2)$ 形式を出力する演算である。普通のベクトル場のLie括弧を二方向へ交代化したものだが、次数がともに1なので、**$\phi,\psi$ の交換については対称**になる。

<a id="def-def1-03-bracket"></a>

<!-- formal-statement-start -->
> **定義（接束値（0,1）形式の次数1の括弧）**
>
> 複素多様体 $X$ 上の滑らかな $\phi,\psi\in\mathcal A^{0,1}(X,T^{1,0}X)$ に対し、正則局所座標で接束値 $(0,2)$ 形式 $[\phi,\psi]$ の $d\bar z^j\wedge d\bar z^k$ 成分（$j<k$）を次で定める。

$$
\begin{aligned}
[\phi,\psi]^i_{\bar j\bar k}
=\sum_p\bigl(&\phi^p_{\bar j}\partial_{z^p}\psi^i_{\bar k}
-\phi^p_{\bar k}\partial_{z^p}\psi^i_{\bar j}\\
&+\psi^p_{\bar j}\partial_{z^p}\phi^i_{\bar k}
-\psi^p_{\bar k}\partial_{z^p}\phi^i_{\bar j}\bigr),\\
[\phi,\psi]
&=\sum_{i,\ j<k}[\phi,\psi]^i_{\bar j\bar k}
\,d\bar z^j\wedge d\bar z^k\otimes\partial_{z^i}.
\end{aligned}
$$

> この成分式は正則座標の取り方に依らず、$[\phi,\psi]=[\psi,\phi]$ である。特に

$$
\frac12[\phi,\phi]^i_{\bar j\bar k}
=\sum_p\left(
\phi^p_{\bar j}\partial_{z^p}\phi^i_{\bar k}
-\phi^p_{\bar k}\partial_{z^p}\phi^i_{\bar j}
\right).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-def1-03-bracket -->
**定義の確認**。$X=\mathbb C^2$ の標準座標で

$$
\alpha=z^2\,d\bar z^1\otimes\partial_{z^1}
+z^1\,d\bar z^2\otimes\partial_{z^2}
$$

と置く。係数は滑らかで、反正則入力を正則出力へ複素線形に送るので接束値形式である。$\alpha_{\bar1}=z^2\partial_{z^1}$、$\alpha_{\bar2}=z^1\partial_{z^2}$ を定義に代入すると

$$
\begin{aligned}
\frac12[\alpha,\alpha]^1_{\bar1\bar2}
&=z^2\partial_{z^1}(0)-z^1\partial_{z^2}(z^2)=-z^1,\\
\frac12[\alpha,\alpha]^2_{\bar1\bar2}
&=z^2\partial_{z^1}(z^1)-z^1\partial_{z^2}(0)=z^2.
\end{aligned}
$$

従って $[\alpha,\alpha]=2(-z^1\partial_{z^1}+z^2\partial_{z^2})\,d\bar z^1\wedge d\bar z^2$ である。係数の因子2は、定義で $\phi$ と $\psi$ から来る二組の項が、$\phi=\psi$ のとき等しくなるために生じる。
<!-- definition-example-end -->

**座標独立性の理由。** まず[接束値Dolbeault微分](../../CYG/CYG1-12/index.md#thm-cyg1-12-bundle-dolbeault)を $\bar\partial_T$ と書く。正則座標で

$$
(\bar\partial_T\phi)^i_{\bar j\bar k}
=\partial_{\bar z^j}\phi^i_{\bar k}
-\partial_{\bar z^k}\phi^i_{\bar j}.
$$

次節で直接示すように、グラフのLie括弧をそのグラフに沿って $(1,0)$ 方向へ射影したテンソルは

$$
\mathcal N(\phi)=\bar\partial_T\phi+\frac12[\phi,\phi]
$$

となる。左辺は分布とLie括弧だけから定義され、右辺第一項はDolbeault微分として座標独立だから、二次式も座標独立である。$\mathcal N(\phi)$ の二次部分を $\phi+\psi$、$\phi$、$\psi$ に適用して差を取れば

$$
[\phi,\psi]
=\mathcal N(\phi+\psi)-\mathcal N(\phi)-\mathcal N(\psi)
$$

となるので、混合した括弧も大域的に定まる（$\mathcal N$ の線形項が相殺する）。この議論は、成分式を座標間で盲目的に比較する代わりに、何が幾何学的に不変かを明確にしている。

## 2. Lie括弧の閉性からMaurer–Cartan方程式を導く

前章の[グラフの定義](../DEF1-02/index.md#def-def1-02-beltrami-graph)で、局所的な反正則枠は

$$
D_{\bar j}=\partial_{\bar z^j}
+\sum_i\phi^i_{\bar j}\partial_{z^i}
$$

だった。二つの枠のLie括弧は、座標ベクトル場が可換であることから、純粋に $(1,0)$ 方向だけを持つ。以下の方程式は、この括弧がすべて零になる条件をまとめたものである。

<a id="thm-def1-03-maurer-cartan"></a>

<!-- formal-statement-start -->
> **定理（Maurer–Cartan方程式と可積分性）**
>
> $X$ を複素次元 $n$ の滑らかな複素多様体とする。$\phi\in\mathcal A^{0,1}(X,T^{1,0}X)$ は、グラフ $T^{0,1}_\phi$ とその複素共役が各点で直和になるような滑らかな形式とする。
>
> 例えば前章の作用素ノルム条件 $\|\phi\|<1$ を満たせばよい。このグラフが定める概複素構造が積分可能であるための必要十分条件は

$$
\boxed{\ \bar\partial_T\phi+\frac12[\phi,\phi]=0\ }
$$

> である。ここで $[\phi,\phi]$ は[上記定義](#def-def1-03-bracket)の接束値 $(0,2)$ 形式である。
<!-- formal-statement-end -->

### 証明の見取り図

各 $[D_{\bar j},D_{\bar k}]$ の正則成分が、$\bar\partial_T\phi+\tfrac12[\phi,\phi]$ の $(j,k)$ 成分に一致する。括弧は反正則成分を持たないが、グラフの元で反正則成分が零なら元そのものが零である。従って括弧閉性は方程式と同値になり、最後に[Newlander–Nirenberg定理](../../CM/CM1-07/index.md#thm-cm1-07-newlander-nirenberg)を適用する。

<!-- proof-start -->
### 証明

各座標場は互いに可換である。$[fV,gW]=fg[V,W]+fV(g)W-gW(f)V$ を、$V,W$ が座標ベクトル場の場合へ適用する。二本の $D$ を四項へ展開すると

$$
\begin{aligned}
[D_{\bar j},D_{\bar k}]
={}&[\partial_{\bar z^j},\phi^i_{\bar k}\partial_{z^i}]
+[\phi^p_{\bar j}\partial_{z^p},\partial_{\bar z^k}]\\
&+[\phi^p_{\bar j}\partial_{z^p},
\phi^i_{\bar k}\partial_{z^i}],
\end{aligned}
$$

ただし繰り返された正則添字は和を取る。一項目は
$\partial_{\bar z^j}\phi^i_{\bar k}\partial_{z^i}$、
二項目は
$-\partial_{\bar z^k}\phi^i_{\bar j}\partial_{z^i}$。
三項目は積の微分により

$$
\sum_{i,p}\left(
\phi^p_{\bar j}\partial_{z^p}\phi^i_{\bar k}
-\phi^p_{\bar k}\partial_{z^p}\phi^i_{\bar j}
\right)\partial_{z^i}.
$$

従って

$$
[D_{\bar j},D_{\bar k}]
=\sum_i\left(
(\bar\partial_T\phi)^i_{\bar j\bar k}
+\frac12[\phi,\phi]^i_{\bar j\bar k}
\right)\partial_{z^i}.
$$

この括弧には反正則座標ベクトル場の成分がない。一方グラフの元は $u=\bar v+\phi(\bar v)$ と一意に書け、反正則成分は $\bar v$ なので、純正則なグラフの元は零だけである。

従って $[D_{\bar j},D_{\bar k}]$ がグラフへ属することと、上式の全係数が零であることは同値である。

一般の局所切断は $a^jD_{\bar j}$ の和であり、Leibniz則から、その括弧には $[D_{\bar j},D_{\bar k}]$ と $D_{\bar j}$ の倍数以外は現れない。よって全局所切断に関する閉性と、枠同士の閉性も同値になる。

直和仮定の下ではグラフが滑らかな概複素構造の反正則分布を定める。[Newlander–Nirenberg定理](../../CM/CM1-07/index.md#thm-cm1-07-newlander-nirenberg)は、この分布のLie括弧閉性と局所正則座標の存在が同値であると述べる。以上を結合して結論を得る。$\square$
<!-- proof-end -->

式の左辺を $\mathcal N(\phi)$ と書くことがある。これは新しい複素構造を構成する際の「積分可能性のずれ」である。小ささ・直和性だけから $\mathcal N(\phi)=0$ は出てこない。

**複素次元1の確認。** $n=1$ なら $\mathcal A^{0,2}=0$ であり、微分項と括弧項はどちらも零になる。直和性を満たす滑らかな $\phi$ はこの定理により積分可能である。これは[次元1の可積分性](../../CM/CM1-07/index.md#cor-cm1-07-dimension-one)と整合する。

ただし $|\phi|=1$ のように直和性を失う場合に定理を適用してはいけない。

## 3. 一次の閉性と、二次で初めて現れる条件

まず、さきほどの定義例 $\alpha$ を、原点近傍の有界な小領域で $t\alpha$ に縮小する。$\alpha$ の係数は正則関数なので、$\bar\partial_T\alpha=0$ である。しかし

$$
\mathcal N(t\alpha)
=t\bar\partial_T\alpha+\frac{t^2}{2}[\alpha,\alpha]
=t^2(-z^1\partial_{z^1}+z^2\partial_{z^2})
\,d\bar z^1\wedge d\bar z^2.
$$

$t\ne0$ で $z^1,z^2$ のいずれかが零でなければ右辺は非零である。$t$ を小さくしてグラフの直和性を確保しても、積分可能にならない。つまり**一次の閉条件を満たすことと、非線形方程式を満たすことは違う**。

二次の補正は、一次係数と同じ $t$ 倍ではなく、$t^2$ 倍の別の形式で考える必要がある。例えば

$$
\beta=\bar z^1z^1\,d\bar z^2\otimes\partial_{z^1}
+\bar z^2z^2\,d\bar z^1\otimes\partial_{z^2}
$$

なら、$d\bar z^1\wedge d\bar z^2$ の順序で

$$
\bar\partial_T\beta
=(z^1\partial_{z^1}-z^2\partial_{z^2})
\,d\bar z^1\wedge d\bar z^2
=-\frac12[\alpha,\alpha].
$$

従って $\phi=t\alpha+t^2\beta$ は $t^2$ の係数までMaurer–Cartan方程式を満たす。ただしその式を打ち切ったものが**すべての次数で**厳密に解になるとは言えない。三次以上の係数を調べる必要がある。

## 4. 形式的べき級数は何を解いているか

前節のように次数を一つずつ合わせるとき、無限級数の収束をまだ仮定しない操作が役立つ。これは形式的べき級数の計算であり、$t$ は「十分小さい数」として代入する前の不定元である。

<a id="def-def1-03-formal-solution"></a>

<!-- formal-statement-start -->
> **定義（形式的Maurer–Cartan解）**
>
> 複素多様体 $X$ の滑らかな接束値 $(0,1)$ 形式を係数に持つ形式的級数

$$
\widehat\phi(t)=\sum_{m=1}^{\infty}t^m\phi_m,
\qquad
\phi_m\in\mathcal A^{0,1}(X,T^{1,0}X)
$$

> が、$t$ の各次数の係数において

$$
\bar\partial_T\widehat\phi
+\frac12[\widehat\phi,\widehat\phi]=0
$$

> を満たすとき、形式的Maurer–Cartan解という。形式的であることは、$t\ne0$ で級数が収束するという主張を含まない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-def1-03-formal-solution -->
**定義の確認**。$X=\mathbb C^2$ で $\eta=d\bar z^1\otimes\partial_{z^1}$ とし、次の形式的級数を考える。

$$
\widehat\phi(t)=\sum_{m\ge1}m!t^m\eta.
$$

$\eta$ の係数は定数なので $\bar\partial_T\eta=0$ であり、第二の反正則方向の成分が零だから $[\eta,\eta]=0$ である。各次数で微分項・括弧項がともに零となるため、これは形式的解である。

しかし非零の $t$ に対する級数の隣接項の絶対値比は $(m+1)|t|\to\infty$ なので、数値としては収束しない。定義の「形式的」はこの相違を正確に切り分ける。
<!-- definition-example-end -->

<a id="prop-def1-03-order-equations"></a>

<!-- formal-statement-start -->
> **命題（形式的解の次数別方程式）**
>
> 複素多様体 $X$ 上の接束値 $(0,1)$ 形式 $\phi_m$ に対し、
> $\widehat\phi(t)=\sum_{m\ge1}t^m\phi_m$ が形式的Maurer–Cartan解であるための必要十分条件は、すべての $m\ge1$ について

$$
\bar\partial_T\phi_m
+\frac12\sum_{\substack{a+b=m\\a,b\ge1}}[\phi_a,\phi_b]=0
$$

> が成立することである。特に $m=1,2,3$ では

$$
\begin{aligned}
\bar\partial_T\phi_1&=0,\\
\bar\partial_T\phi_2&=-\tfrac12[\phi_1,\phi_1],\\
\bar\partial_T\phi_3&=-[\phi_1,\phi_2].
\end{aligned}
$$
<!-- formal-statement-end -->

### 証明の見取り図

括弧は二つの入力について双線形なので、$t^a\phi_a$ と $t^b\phi_b$ の組は次数 $a+b$ に寄与する。三次では $(a,b)=(1,2),(2,1)$ の二項が括弧の対称性によって一致する。

<!-- proof-start -->
### 証明

Dolbeault微分は係数ごとの線形演算だから

$$
\bar\partial_T\widehat\phi
=\sum_{m\ge1}t^m\bar\partial_T\phi_m.
$$

括弧の双線形性から、形式的べき級数環のCauchy積として

$$
[\widehat\phi,\widehat\phi]
=\sum_{a,b\ge1}t^{a+b}[\phi_a,\phi_b]
=\sum_{m\ge2}t^m
\sum_{\substack{a+b=m\\a,b\ge1}}[\phi_a,\phi_b].
$$

各 $m$ について内側の和は有限個の項からなるので、収束の議論なしに係数を定義できる。形式的級数が零であることは全係数が零であることと同値だから、一般式が従う。

$m=1$ では組 $(a,b)$ が存在しない。$m=2$ では $(1,1)$ だけである。$m=3$ では二組であり、[次数1の括弧の対称性](#def-def1-03-bracket)から

$$
\frac12\bigl([\phi_1,\phi_2]+[\phi_2,\phi_1]\bigr)
=[\phi_1,\phi_2].
$$

これらを一般式へ代入して、表示した三つの式を得る。$\square$
<!-- proof-end -->

二次方程式の右辺が $\bar\partial_T$-完全である必要がある。これは次章でコホモロジーの障害として調べる重要な点だが、ここでは**次数を揃えた時点で何が必要になるか**までを確定した。

## 5. 座標変更とゲージ同値

同じ複素構造を、固定した滑らかな多様体上の異なる座標対応で表すとBeltrami係数は変化する。従って「係数が違う」だけでは本質的に異なる変形とは言えない。ここでいう座標変更は、固定した中心の複素構造に関して正則とは限らない**滑らかな微分同相写像**である。

<a id="def-def1-03-gauge"></a>

<!-- formal-statement-start -->
> **定義（Beltrami微分のゲージ同値）**
>
> $X$ を滑らかな複素多様体、$t$ を $0$ の近くの実パラメータとする。$T^{0,1}_{\phi_t}$ と $T^{0,1}_{\psi_t}$ がそれぞれ複素構造の反正則分布を与え、$\phi_0=\psi_0=0$ とする。$F_t:X\to X$ が滑らかな微分同相写像族で $F_0=\mathrm{id}_X$ を満たし、

$$
T^{0,1}_{\psi_t}=F_t^*T^{0,1}_{\phi_t}
$$

> となるとき、$\phi_t,\psi_t$ は（$F_t$ によって）ゲージ同値であるという。局所問題では $X$ の代わりに十分小さい共通の座標開集合でこの条件を課す。形式的な族では同じ等式を $t$ の各次数で解釈する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-def1-03-gauge -->
**定義の確認**。$X=\mathbb C$ の原点近傍で $F_t(z)=z+t\bar z$（$t\in\mathbb R$, $|t|<1$）とする。実Jacobianは $1-t^2>0$ なので $F_t$ は局所微分同相で $F_0=\mathrm{id}$。標準複素構造を引き戻すには、$w=F_t(z)$ が新しい正則座標となるよう $D_tw=0$ を課す。

$$
\partial_{\bar z}w=t,\qquad
\partial_z w=1,\qquad
D_t=\partial_{\bar z}-t\partial_z.
$$

従って $\psi_t=-t\,d\bar z\otimes\partial_z$ のグラフは標準分布の引き戻しであり、零のBeltrami係数とゲージ同値である。符号は $D_t=\partial_{\bar z}+\psi^z_{\bar z}\partial_z$ の**プラスのグラフ規約**に対し負になる。
<!-- definition-example-end -->

<a id="prop-def1-03-gauge-linear"></a>

<!-- formal-statement-start -->
> **命題（ゲージ変更の一次係数）**
>
> $X$ を複素多様体とし、実パラメータ $t$ の滑らかな積分可能なBeltrami族 $\phi_t=t\alpha+O(t^2)$ を考える。
>
> $F_t$ を $F_0=\mathrm{id}$ である滑らかな微分同相写像族とし、中心での速度の $(1,0)$ 成分を $v=\sum_i v^i\partial_{z^i}$ とする。
>
> $F_t^*T^{0,1}_{\phi_t}=T^{0,1}_{\psi_t}$ により $\psi_t$ を定め、$\psi_t=t\alpha'+O(t^2)$ と書くと

$$
\boxed{\ \alpha'=\alpha-\bar\partial_Tv\ }
$$

> が成り立つ。従って両一次係数は同じ接束値Dolbeaultコホモロジー類を表す。
<!-- formal-statement-end -->

### 証明の見取り図

写像を局所的に $F_t(z)=z+t v(z,\bar z)+O(t^2)$ と書き、グラフのベクトル場が写像後の正則座標をどう微分するか比べる。一次係数には、元の $\alpha$ と座標対応の変化 $-\bar\partial_Tv$ の二つが現れる。

<!-- proof-start -->
### 証明

局所正則座標 $z$ で $F_t$ の正則座標成分を $w^i=F_t^i(z,\bar z)$ と書く。実パラメータに沿う滑らかな微分同相の速度は実ベクトル場だが、その正則成分を $v^i$ とするので

$$
\partial_{\bar z^j}w^i
=t\,\partial_{\bar z^j}v^i+O(t^2),
\qquad
\partial_{z^k}w^i
=\delta^i_k+t\,\partial_{z^k}v^i+O(t^2).
$$

引き戻し側の枠を $D'_{\bar j}=\partial_{\bar z^j}+\psi^k_{\bar j}\partial_{z^k}$ とする。$dF_t(D'_{\bar j})$ は移動先のグラフに入る。写像後の $(0,1)$ 成分は $\delta^k_j+O(t)$ で、移動先のグラフの正則成分は $t\alpha^i_{\bar j}+O(t^2)$ である。一方、写像後の正則成分を関数 $w^i$ への作用で計算すると

$$
\begin{aligned}
D'_{\bar j}w^i
&=\partial_{\bar z^j}w^i
+\sum_k\psi^k_{\bar j}\partial_{z^k}w^i\\
&=t\,\partial_{\bar z^j}v^i
+t\,\alpha'{}^i_{\bar j}+O(t^2).
\end{aligned}
$$

二つの正則成分を比較して

$$
\alpha'{}^i_{\bar j}
=\alpha^i_{\bar j}-\partial_{\bar z^j}v^i.
$$

正則枠での最後の項は[接束値Dolbeault微分](../../CYG/CYG1-12/index.md#thm-cyg1-12-bundle-dolbeault)の $\bar\partial_Tv$ である。$\alpha,\alpha'$ は実際の可積分な族の一次係数なので、[一次閉条件](../DEF1-02/index.md#prop-def1-02-linear-integrability)を満たす。完全形式だけの差はコホモロジー類を変えない。$\square$
<!-- proof-end -->

この命題は**一次**での式である。有限の $t$ で「$\phi$ からただ $\bar\partial_Tv$ を引く」ことをゲージ作用とするのは誤りで、一般には行列の逆や高次の積が必要になる。

**具体的な二次補正。** $X=\mathbb C^2$ の原点近傍で

$$
F_t(z)^1=z^1+t\bar z^1z^2,\qquad
F_t(z)^2=z^2+t\bar z^2z^1
$$

と置く。各 $F_t$ は $t=0$ で恒等写像なので、十分小さい $t$ と有界な座標開集合では実Jacobianが非零であり局所微分同相になる。$w=F_t(z)$ を新しい正則座標とするには $D_{\bar j}w^a=0$ が必要で、行列表現では

$$
W_z=\begin{pmatrix}1&t\bar z^1\\t\bar z^2&1\end{pmatrix},
\qquad
W_{\bar z}
=\begin{pmatrix}tz^2&0\\0&tz^1\end{pmatrix},
\qquad
\Phi=-W_z^{-1}W_{\bar z}.
$$

行列 $W_z$ の行・列は順に $w^a$、$z^i$、$W_{\bar z}$ の列は $\bar z^j$ に対応する。$D_{\bar j}w^a=0$ を全 $a,j$ に並べると $W_{\bar z}+W_z\Phi=0$ になるので、この逆行列が必要になる。$t$ の十分小さい範囲で $\Delta=1-t^2\bar z^1\bar z^2\ne0$ として

$$
\Phi=-\frac1\Delta
\begin{pmatrix}
tz^2&-t^2\bar z^1z^1\\
-t^2\bar z^2z^2&tz^1
\end{pmatrix}.
$$

よって $\Phi=tA+t^2B+O(t^3)$ の各係数は

$$
\begin{aligned}
\alpha&=-z^2\,d\bar z^1\otimes\partial_{z^1}
-z^1\,d\bar z^2\otimes\partial_{z^2},\\
\beta&=\bar z^1z^1\,d\bar z^2\otimes\partial_{z^1}
+\bar z^2z^2\,d\bar z^1\otimes\partial_{z^2}.
\end{aligned}
$$

ここで $\bar\partial_T\alpha=0$、$\tfrac12[\alpha,\alpha]=(-z^1\partial_{z^1}+z^2\partial_{z^2})\,d\bar z^1\wedge d\bar z^2$、$\bar\partial_T\beta=-\tfrac12[\alpha,\alpha]$ と直接検算できる。二次の補正は飾りではなく、非線形条件に必要な項である。この族はすべて標準複素構造の引き戻しなので、ゲージ同値では自明な族でもある。

## 6. 演習――括弧、次数、ゲージを自分で扱う

<a id="ex-def1-03-a01"></a>
#### DEF1-03-A01 次数1の括弧の対称性
- Level: A

$X=\mathbb C^2$ で $\phi=z^1d\bar z^1\otimes\partial_{z^2}$、$\psi=z^2d\bar z^2\otimes\partial_{z^1}$ とする。$[\phi,\psi]$ と $[\psi,\phi]$ をそれぞれ定義から計算せよ。

<!-- solution-start -->
**詳細解答。** $\phi_{\bar1}=z^1\partial_{z^2}$、$\psi_{\bar2}=z^2\partial_{z^1}$ で、それ以外は零である。[括弧の定義](#def-def1-03-bracket)の $(1,2)$ 成分では

$$
\begin{aligned}
[\phi,\psi]^1_{\bar1\bar2}
&=\phi^2_{\bar1}\partial_{z^2}\psi^1_{\bar2}
=z^1\partial_{z^2}(z^2)=z^1,\\
[\phi,\psi]^2_{\bar1\bar2}
&=-\psi^1_{\bar2}\partial_{z^1}\phi^2_{\bar1}
=-z^2\partial_{z^1}(z^1)=-z^2.
\end{aligned}
$$

他の成分は零なので $[\phi,\psi]=(z^1\partial_{z^1}-z^2\partial_{z^2})\,d\bar z^1\wedge d\bar z^2$。$\phi$ と $\psi$ を入れ替えると、定義の一・二組が交換されるだけで同じ式が得られる。次数1の括弧は通常のLie括弧と異なり対称である。
<!-- solution-end -->

<a id="ex-def1-03-a02"></a>
#### DEF1-03-A02 一次閉条件の判定
- Level: A

$\mathbb C^2$ で $\alpha=\bar z^1\,d\bar z^2\otimes\partial_{z^1}$ と置く。$\bar\partial_T\alpha$ を求め、$\phi_t=t\alpha+O(t^2)$ が可積分族の一次係数として許されるか判定せよ。

<!-- solution-start -->
**詳細解答。** $\alpha^1_{\bar2}=\bar z^1$ だけが非零なので

$$
(\bar\partial_T\alpha)^1_{\bar1\bar2}
=\partial_{\bar z^1}(\bar z^1)
-\partial_{\bar z^2}(0)=1.
$$

従って $\bar\partial_T\alpha=d\bar z^1\wedge d\bar z^2\otimes\partial_{z^1}\ne0$。[一次閉条件](../DEF1-02/index.md#prop-def1-02-linear-integrability)が必要なので、この $\alpha$ を一次係数とする可積分族は存在しない。$O(t^2)$ にどの補正を入れても一次の不一致は消せない。
<!-- solution-end -->

<a id="ex-def1-03-a03"></a>
#### DEF1-03-A03 複素次元1での方程式
- Level: A

$X=\mathbb C$ の円板で $\phi=c(z,\bar z)d\bar z\otimes\partial_z$ とする。$c$ は滑らかで $|c|<1$ と仮定する。Maurer–Cartan方程式と積分可能性を調べよ。

<!-- solution-start -->
**詳細解答。** 複素次元1には $d\bar z\wedge d\bar z$ 以外の $(0,2)$ 基底がなく、これは交代性から零である。従って微分項も括弧項も零である。

一方 $|c|<1$ から[グラフの直和性](../DEF1-02/index.md#prop-def1-02-small-graph)がある。[Maurer–Cartan定理](#thm-def1-03-maurer-cartan)を適用して、新しい概複素構造は積分可能である。

ノルム条件を外した $c=1$ ではグラフと共役が一致するため、形式上の方程式が零でも複素構造は得られない。
<!-- solution-end -->

<a id="ex-def1-03-a04"></a>
#### DEF1-03-A04 定数係数の積分可能性
- Level: A

$\mathbb C^2$ で $\phi=\sum_{i,j}c^i_{\bar j}d\bar z^j\otimes\partial_{z^i}$ とし、すべての $c^i_{\bar j}$ を定数とする。$\|\Phi\|<1$ なら積分可能であることを示せ。

<!-- solution-start -->
**詳細解答。** 係数が定数なので、反正則方向の偏微分も、[括弧の定義](#def-def1-03-bracket)に現れる正則方向の偏微分も全て零である。従って

$$
\bar\partial_T\phi=0,\qquad [\phi,\phi]=0.
$$

ノルム条件から[グラフの直和性](../DEF1-02/index.md#prop-def1-02-small-graph)があり、[Maurer–Cartan定理](#thm-def1-03-maurer-cartan)より積分可能と結論できる。
<!-- solution-end -->

<a id="ex-def1-03-b01"></a>
#### DEF1-03-B01 一次閉だが非積分可能
- Level: B

$\mathbb C^2$ の原点近くで $\alpha=z^2d\bar z^1\otimes\partial_{z^1}+z^1d\bar z^2\otimes\partial_{z^2}$ と置き、$\phi_t=t\alpha$ とする。

1. $\bar\partial_T\alpha$ を求めよ。
2. $\tfrac12[\alpha,\alpha]$ を求めよ。
3. 充分小さい非零 $t$ に対し、$\phi_t$ がグラフの直和性を満たしても積分可能ではないことを示せ。

<!-- solution-start -->
**詳細解答。** 係数 $z^1,z^2$ は正則だから、それぞれの反正則偏微分は零であり、$\bar\partial_T\alpha=0$。

$(1,2)$ 成分について $\alpha_{\bar1}=z^2\partial_{z^1}$、$\alpha_{\bar2}=z^1\partial_{z^2}$ を[括弧の定義](#def-def1-03-bracket)に代入すると

$$
\frac12[\alpha,\alpha]
=(-z^1\partial_{z^1}+z^2\partial_{z^2})
\,d\bar z^1\wedge d\bar z^2.
$$

有界な小球 $|z^1|,|z^2|<r$ では $|t|r$ を十分小さくすれば $\|\Phi_t\|<1$ となる。他方

$$
\mathcal N(\phi_t)
=t^2(-z^1\partial_{z^1}+z^2\partial_{z^2})
\,d\bar z^1\wedge d\bar z^2
$$

は任意の非零 $t$ に対して一般の点で非零である。したがって[可積分性の定理](#thm-def1-03-maurer-cartan)の方程式を満たさず、一次閉条件だけでは不十分である。
<!-- solution-end -->

<a id="ex-def1-03-b02"></a>
#### DEF1-03-B02 二次の補正を構成する
- Level: B

前問の $\alpha$ に対して $\beta=\bar z^1z^1d\bar z^2\otimes\partial_{z^1}+\bar z^2z^2d\bar z^1\otimes\partial_{z^2}$ とする。$\phi_t=t\alpha+t^2\beta$ について、Maurer–Cartan方程式の $t^1,t^2,t^3$ の係数を求め、どこまで零になるか判定せよ。

<!-- solution-start -->
**詳細解答。** [次数別方程式](#prop-def1-03-order-equations)から、係数は順に

$$
\bar\partial_T\alpha,\qquad
\bar\partial_T\beta+\tfrac12[\alpha,\alpha],\qquad
[\alpha,\beta]
$$

である。第一項は零、第二項は

$$
\begin{aligned}
\bar\partial_T\beta
&=(z^1\partial_{z^1}-z^2\partial_{z^2})
\,d\bar z^1\wedge d\bar z^2,\\
\tfrac12[\alpha,\alpha]
&=(-z^1\partial_{z^1}+z^2\partial_{z^2})
\,d\bar z^1\wedge d\bar z^2
\end{aligned}
$$

なので相殺する。三次を調べるため、$\alpha^1_{\bar1}=z^2$、$\alpha^2_{\bar2}=z^1$、$\beta^1_{\bar2}=\bar z^1z^1$、$\beta^2_{\bar1}=\bar z^2z^2$ を混合括弧へ入れる。

$$
\begin{aligned}
[\alpha,\beta]^1_{\bar1\bar2}
&=z^2\partial_{z^1}(\bar z^1z^1)
=z^2\bar z^1,\\
[\alpha,\beta]^2_{\bar1\bar2}
&=-z^1\partial_{z^2}(\bar z^2z^2)
=-z^1\bar z^2.
\end{aligned}
$$

これは一般に非零である。したがって二次までは零になるが、三次にはさらに $t^3\phi_3$ を加えて $\bar\partial_T\phi_3=-[\alpha,\beta]$ を解く必要がある。有限次の打切りは一般に厳密解ではない。
<!-- solution-end -->

<a id="ex-def1-03-b03"></a>
#### DEF1-03-B03 三次までの形式方程式
- Level: B

$\widehat\phi=t\phi_1+t^2\phi_2+t^3\phi_3+\cdots$ とし、次数1の括弧が対称であることを使って、$t^1,t^2,t^3,t^4$ の係数方程式を列挙せよ。

<!-- solution-start -->
**詳細解答。** [形式的解の命題](#prop-def1-03-order-equations)を次数 $m$ ごとに展開する。$m=1$ には組がない。$m=2$ の組は $(1,1)$。$m=3$ は $(1,2),(2,1)$。$m=4$ は $(1,3),(2,2),(3,1)$ だから

$$
\begin{aligned}
\bar\partial_T\phi_1&=0,\\
\bar\partial_T\phi_2&=-\tfrac12[\phi_1,\phi_1],\\
\bar\partial_T\phi_3&=-[\phi_1,\phi_2],\\
\bar\partial_T\phi_4&=-[\phi_1,\phi_3]
-\tfrac12[\phi_2,\phi_2].
\end{aligned}
$$

最後の式では $[\phi_1,\phi_3]=[\phi_3,\phi_1]$ なので二項が係数 $1/2$ を相殺し、中央の $[\phi_2,\phi_2]$ は一つの組だけなので $1/2$ が残る。
<!-- solution-end -->

<a id="ex-def1-03-b04"></a>
#### DEF1-03-B04 形式的解と解析的族の区別
- Level: B

$\eta=d\bar z^1\otimes\partial_{z^1}$ を $\mathbb C^2$ 上の定数係数形式とし、$\widehat\phi(t)=\sum_{m\ge1}m!t^m\eta$ とする。形式的Maurer–Cartan解であることを示し、$t=0$ の周りの複素解析的な実際の族のTaylor展開にはならないことを説明せよ。

<!-- solution-start -->
**詳細解答。** $\eta$ の係数は定数なので $\bar\partial_T\eta=0$、$[\eta,\eta]=0$。双線形性により、任意の $a,b$ で $[a!\eta,b!\eta]=a!b![\eta,\eta]=0$。従って[形式的解の定義](#def-def1-03-formal-solution)の全次数で左辺は零である。

一方、固定した非零 $t$ で $m$ 番目の係数の大きさは $m!|t|^m$、次項との比は

$$
\frac{(m+1)!|t|^{m+1}}{m!|t|^m}
=(m+1)|t|\longrightarrow\infty.
$$

項そのものが零へ行かないので、収束半径は0。解析的関数のTaylor級数は原点近くに正の収束半径を持つため、この指定された級数は複素解析的な族のTaylor展開にはならない。有限次数ごとに形式的方程式が成り立つ事実とは矛盾しない。
<!-- solution-end -->

<a id="ex-def1-03-c01"></a>
#### DEF1-03-C01 座標変更が作る二次補正とゲージ同値
- Level: C

$U\subset\mathbb C^2$ を原点の十分小さい有界な開集合、$t\in\mathbb R$ を十分小さく取る。$F_t:U\to\mathbb C^2$ を

$$
w^1=z^1+t\bar z^1z^2,\qquad
w^2=z^2+t\bar z^2z^1
$$

で定め、標準複素構造を $F_t$ によって引き戻す。

1. $W_z=(\partial_{z^i}w^a)$、$W_{\bar z}=(\partial_{\bar z^j}w^a)$ を求め、$\Delta=1-t^2\bar z^1\bar z^2$ を使って $\Phi=-W_z^{-1}W_{\bar z}$ を計算せよ。
2. $\Phi=t\alpha+t^2\beta+O(t^3)$ を求め、$\bar\partial_T\alpha=0$ と $\bar\partial_T\beta+\tfrac12[\alpha,\alpha]=0$ を成分で検算せよ。
3. 得られた $\Phi$ が実際に積分可能であり、標準複素構造とゲージ同値であることを説明せよ。
4. 一次係数が $\bar\partial_T$-完全であることを具体的なベクトル場で示せ。

<!-- solution-start -->
**詳細解答。**

**(1)** 偏微分の変数を固定して成分を読む。$w^1$ の $z^1$ 微分は1、$z^2$ 微分は $t\bar z^1$ であり、$w^2$ では順に $t\bar z^2,1$。反正則微分は対角成分だけが非零なので

$$
W_z=\begin{pmatrix}1&t\bar z^1\\t\bar z^2&1\end{pmatrix},
\qquad
W_{\bar z}=\begin{pmatrix}tz^2&0\\0&tz^1\end{pmatrix}.
$$

$t=0$ で $\det W_z=1$ であり、$U$ を有界にして $|t|$ を小さくすれば $\Delta\ne0$。実際に

$$
W_z\begin{pmatrix}1&-t\bar z^1\\-t\bar z^2&1\end{pmatrix}
=\begin{pmatrix}\Delta&0\\0&\Delta\end{pmatrix}
$$

と掛け算で確かめられるから、逆行列とBeltrami係数は

$$
\begin{aligned}
W_z^{-1}&=\frac1\Delta
\begin{pmatrix}1&-t\bar z^1\\-t\bar z^2&1\end{pmatrix},\\
\Phi&=-\frac1\Delta
\begin{pmatrix}
tz^2&-t^2\bar z^1z^1\\
-t^2\bar z^2z^2&tz^1
\end{pmatrix}.
\end{aligned}
$$

**(2)** $\Delta^{-1}=1+O(t^2)$ だから、一次には対角項だけ、二次には非対角項だけが寄与する。

$$
\begin{aligned}
\alpha&=-z^2d\bar z^1\otimes\partial_{z^1}
-z^1d\bar z^2\otimes\partial_{z^2},\\
\beta&=\bar z^1z^1d\bar z^2\otimes\partial_{z^1}
+\bar z^2z^2d\bar z^1\otimes\partial_{z^2}.
\end{aligned}
$$

$\alpha$ の係数は $z$ のみの関数なので $\bar\partial_T\alpha=0$。[括弧の定義](#def-def1-03-bracket)で $\alpha_{\bar1}=-z^2\partial_{z^1}$、$\alpha_{\bar2}=-z^1\partial_{z^2}$ を使うと

$$
\frac12[\alpha,\alpha]^1_{\bar1\bar2}
=-(-z^1)\partial_{z^2}(-z^2)=-z^1,\qquad
\frac12[\alpha,\alpha]^2_{\bar1\bar2}
=(-z^2)\partial_{z^1}(-z^1)=z^2.
$$

他方 $\bar\partial_T\beta$ は

$$
(\bar\partial_T\beta)^1_{\bar1\bar2}
=\partial_{\bar z^1}(\bar z^1z^1)=z^1,\qquad
(\bar\partial_T\beta)^2_{\bar1\bar2}
=-\partial_{\bar z^2}(\bar z^2z^2)=-z^2.
$$

成分ごとに相殺して二次方程式が成立する。

**(3)** $F_0$ は恒等写像なので実Jacobianは単位行列である。実微分はパラメータと点に連続に依存し、有界な小領域上で $t$ が十分小さければ実Jacobianも可逆なままである。

[局所逆写像による座標判定](../DEF1-02/index.md#prop-def1-02-beltrami-equation)により $w^1,w^2$ は新しい局所正則座標を与える。その正則性を判定する方程式は行列表示で

$$
W_{\bar z}+W_z\Phi=0
\quad\Longleftrightarrow\quad D_{\bar j}w^a=0
\quad (a,j=1,2)
$$

であり、前問の $\Phi$ はこの方程式を満たす。従って実際に積分可能である。[ゲージ同値の定義](#def-def1-03-gauge)において、$F_t$ が標準複素構造からこのグラフへの引き戻しを与えるので、両者はゲージ同値である。

**(4)** $v=\bar z^1z^2\partial_{z^1}+\bar z^2z^1\partial_{z^2}$ とすると

$$
\bar\partial_Tv
=z^2d\bar z^1\otimes\partial_{z^1}
+z^1d\bar z^2\otimes\partial_{z^2}
=-\alpha.
$$

よって $\alpha=-\bar\partial_Tv$ は完全形式であり、[ゲージの一次係数の命題](#prop-def1-03-gauge-linear)と一致する。非零の局所係数があることと、変形がゲージ同値で非自明であることを混同しない。
<!-- solution-end -->

## 7. 次に何を調べるか

Maurer–Cartan方程式は、複素構造の可積分性を**一次の線形条件と二次の非線形条件**に分けて書く。形式的には各次数の右辺を $\bar\partial_T$ で解く必要がある。さらに、滑らかな座標変更は一次係数を $\bar\partial_T$-完全形式だけ動かす。次章ではこの同値を整理し、閉形式の商から一次変形空間と無限小自己同型を取り出す。
