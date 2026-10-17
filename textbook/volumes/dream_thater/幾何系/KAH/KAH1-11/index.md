# KAH1-11 Ricci形式の局所導出

<!-- definition-example-audit: strict -->

## 1. 四階曲率から一つの実2形式へ

[前章のRicci縮約の定義](../KAH1-10/index.md#def-kah1-10-ricci-contraction)では、四階曲率を逆計量で縮約して二階の成分を作った。[Fubini–Study曲率の計算](../KAH1-10/index.md#thm-kah1-10-fs-curvature)では実際にその縮約を実行し、$\operatorname{Ric}_{i\bar j}=(n+1)g_{i\bar j}$ を得た。ただし、この方法は四つの添字を持つ全曲率を計算してから足すので、複素次元が大きくなるほど煩雑になる。

計量の行列式は、各座標方向の長さを合わせて測る量である。曲率の縮約が、この行列式の**対数の二階微分だけ**で求められるなら、四階成分を全部書かずに済む。一方、行列式は座標基底を取り換えると値が変わる。この見かけ上の座標依存性をどう消すかが、もう一つの中心問題になる。

以下、$X$ は複素次元 $n\ge1$ の滑らかなKähler多様体、$z=(z^1,\ldots,z^n)$ は正則座標、$G=(g_{i\bar j})$ はその正値Hermite計量行列とする。$g^{k\bar\ell}$ は $g^{k\bar\ell}g_{m\bar\ell}=\delta^k_m$ を満たす逆計量成分とし、添字は $1,\ldots,n$ を総和する。基本形式とRicci形式の規約は

$$
\omega=i\,g_{i\bar j}\,dz^i\wedge d\bar z^j,
\qquad
\rho=i\,\operatorname{Ric}_{i\bar j}\,dz^i\wedge d\bar z^j
$$

である。[曲率の符号規約](../KAH1-09/index.md#def-kah1-09-curvature-components)は $R(U,V)W=\nabla_U\nabla_VW-\nabla_V\nabla_UW-\nabla_{[U,V]}W$ を採用する。結論に出るマイナス記号はこの規約から決まる。

## 2. 行列式の微分はなぜ跡になるか

$G$ が正値Hermiteであるため、各点で $\det G>0$ であり、実数値の滑らかな関数 $\log\det G$ をその座標領域に定められる。ここで「正値」とは、非零の列ベクトル $v$ に対して $v^*Gv>0$ となることである。固有値は全て正だから、積である行列式も正になる。

まず $G$ を滑らかな可逆行列値関数と考え、成分を一つの変数 $t$ で微分する。行列式は各列に関して線形なので、微分すると、各列を一列ずつ微分した行列式の和になる。それを余因子展開で書くと、$\operatorname{adj}(G)$ を余因子行列の転置として

$$
\frac{d}{dt}\det G
=\sum_{a,b}\operatorname{adj}(G)_{ba}\frac{dG_{ab}}{dt}
=\operatorname{tr}\!\left(\operatorname{adj}(G)\frac{dG}{dt}\right).
$$

$\operatorname{adj}(G)G=(\det G)I$ なので、$G$ が可逆なら $\operatorname{adj}(G)=(\det G)G^{-1}$ である。従って

$$
\frac{d}{dt}\log\det G
=\frac{(\det G)'}{\det G}
=\operatorname{tr}\!\left(G^{-1}G'\right).
$$

<a id="lem-kah1-11-jacobi"></a>

<!-- formal-statement-start -->
> **補題（Jacobiの行列式微分公式）**  
> $U\subset\mathbb R^m$ を開集合、$G:U\to GL_n(\mathbb C)$ を $C^1$ 級行列値写像とする。各 $C^1$ 級曲線 $x(t)\in U$ に沿って

$$
\frac{d}{dt}\det G(x(t))
=\det G(x(t))\operatorname{tr}
\left(G(x(t))^{-1}\frac{dG(x(t))}{dt}\right).
$$

> さらに $\det G>0$ が成り立つ場合、実対数に対して $(\log\det G)'=\operatorname{tr}(G^{-1}G')$ が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

行列式の各列を一つずつ微分すると余因子が現れる。余因子行列を可逆性により逆行列へ置き換えると跡になる。実対数を取るには正の行列式という仮定を別に使う。

<!-- proof-start -->
### 証明

$G=(G_{ab})$ の行列式を置換の和で展開すれば

$$
\det G=\sum_{\sigma\in S_n}\operatorname{sgn}(\sigma)
\prod_{a=1}^n G_{a,\sigma(a)}.
$$

積の微分則によって

$$
\frac{d}{dt}\det G
=\sum_{a=1}^n\sum_{\sigma\in S_n}
\operatorname{sgn}(\sigma)G'_{a,\sigma(a)}
\prod_{b\ne a}G_{b,\sigma(b)}
=\sum_{a,c}C_{ac}G'_{ac},
$$

ここで $C_{ac}$ は $(a,c)$ 余因子である。$\operatorname{adj}(G)_{ca}=C_{ac}$ だから和は $\operatorname{tr}(\operatorname{adj}(G)G')$ に一致する。可逆性から $\operatorname{adj}(G)=(\det G)G^{-1}$ を代入すると最初の公式を得る。正の行列式のときは通常の一変数連鎖律 $(\log h)'=h'/h$ を $h=\det G$ に適用して残る式を得る。$\square$
<!-- proof-end -->

**二次元で直接確かめる。** $G=\operatorname{diag}(e^{u},e^{v})$ ($u,v$ は実関数) なら $\det G=e^{u+v}$ なので $\partial_i\log\det G=\partial_i u+\partial_i v$。他方

$$
G^{-1}\partial_iG
=\begin{pmatrix}\partial_i u&0\\0&\partial_i v\end{pmatrix},
\qquad
\operatorname{tr}(G^{-1}\partial_iG)=\partial_i u+\partial_i v.
$$

両辺を成分で一致させられる。複素座標の $\partial_i$ も実座標の二つの微分の複素線形結合なので、この公式をそのまま適用できる。

## 3. Ricci縮約と対数行列式の一致

前章では $R_{i\bar j k\bar\ell}$ を一度計算してから縮約した。ここでは縮約を**接続係数の跡**へ移す。Kähler条件の下では[既習のKähler曲率の局所導出](../KAH1-09/index.md#prop-kah1-09-local-curvature)から

$$
\Gamma^k_{i m}=g^{k\bar\ell}\partial_i g_{m\bar\ell},
\qquad
R_{i\bar j m\bar\ell}
=-g_{k\bar\ell}\partial_{\bar j}\Gamma^k_{i m}
$$

となる。二番目の等式は[曲率局所成分公式](../KAH1-09/index.md#prop-kah1-09-local-curvature)の接続係数表示であり、正則・反正則座標ベクトルの交換子が零になることと、反正則方向の接続係数が零であることを使う。

<a id="thm-kah1-11-local-ricci"></a>

<!-- formal-statement-start -->
> **定理（Ricci形式の局所行列式公式）**  
> $(X,g)$ を複素次元 $n\ge1$ の滑らかなKähler多様体とし、任意の正則座標領域で $G=(g_{i\bar j})$ とする。[Ricci縮約](../KAH1-10/index.md#def-kah1-10-ricci-contraction)を前章と同じ符号で定めると、

$$
\boxed{\operatorname{Ric}_{i\bar j}
=-\partial_i\partial_{\bar j}\log\det G,\qquad
\rho=-i\,\partial\bar\partial\log\det G.}
$$

> この等式は座標領域ごとに成立する。$\log\det G$ が大域的なスカラー関数であるとは主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

$g^{m\bar\ell}g_{k\bar\ell}=\delta^m_k$ を四階曲率に掛けると接続の上添字と入力添字が縮約される。そこで現れる $\Gamma^k_{ik}$ の和をJacobi公式で $\partial_i\log\det G$ に変換する。最後の $\partial_{\bar j}$ 微分でRicciの負符号を得る。

<!-- proof-start -->
### 証明

逆計量による縮約を、曲率の接続表示に適用する。添字が混線しないよう、曲率の後半の組を $m,\ell$ と書く。

$$
\begin{aligned}
\operatorname{Ric}_{i\bar j}
&=g^{m\bar\ell}R_{i\bar j m\bar\ell}\\
&=-g^{m\bar\ell}g_{k\bar\ell}\,
   \partial_{\bar j}\Gamma^k_{i m}\\
&=-\delta^m_k\partial_{\bar j}\Gamma^k_{i m}\\
&=-\partial_{\bar j}\sum_{k=1}^n\Gamma^k_{i k}.
\end{aligned}
$$

ここで $g^{m\bar\ell}$ は縮約のために値を掛けているだけであり、微分の外側にある。$\partial_{\bar j}(g^{m\bar\ell}\cdots)$ という別の式に変形してはいけない。

続いて接続係数を代入する。行列 $G$ の $m$ 行 $\ell$ 列の成分は $g_{m\bar\ell}$ である。逆計量の定義 $\sum_\ell g_{m\bar\ell}g^{k\bar\ell}=\delta_m^k$ は、通常の行列積 $GG^{-1}=I$ と比較すると

$$
(G^{-1})_{\ell k}=g^{k\bar\ell}
$$

を意味する。したがって接続係数の添字を行列の行・列に移し替えると、

$$
\begin{aligned}
\sum_k\Gamma^k_{ik}
&=\sum_{k,\ell}g^{k\bar\ell}\partial_i g_{k\bar\ell}\\
&=\sum_{k,\ell}(G^{-1})_{\ell k}(\partial_iG)_{k\ell}\\
&=\operatorname{tr}(G^{-1}\partial_i G)\\
&=\partial_i\log\det G.
\end{aligned}
$$

最後の等号は $G$ が正値で可逆なことを確認して[Jacobiの行列式微分公式](#lem-kah1-11-jacobi)を用いた。従って

$$
\operatorname{Ric}_{i\bar j}
=-\partial_{\bar j}\partial_i\log\det G
=-\partial_i\partial_{\bar j}\log\det G.
$$

滑らかな実関数の混合偏微分は交換できる。$(1,1)$ 形式の局所表示を使って両辺に $i\,dz^i\wedge d\bar z^j$ を掛け、和を取れば

$$
\rho
=-i\sum_{i,j}(\partial_i\partial_{\bar j}\log\det G)
\,dz^i\wedge d\bar z^j
=-i\partial\bar\partial\log\det G.
$$

以上で結論を得る。$\square$
<!-- proof-end -->

**曲率を一度も全成分計算していない。** これは特に複素次元が高いときに有効である。ただし、公式の入力は正値Hermite計量を持つKähler多様体であり、一般の非Kähler Hermite計量でLevi–Civita曲率を同じ式へ置き換える主張ではない。

## 4. 一次元の具体計算で符号を確かめる

$U\subset\mathbb C$、$f\in C^\infty(U;\mathbb R)$ に対して $g_{z\bar z}=e^f$ とする。$\det G=e^f$ だから $\log\det G=f$。この場合、行列式公式は

$$
\rho=-i f_{z\bar z}\,dz\wedge d\bar z,
\qquad
\operatorname{Ric}_{z\bar z}=-f_{z\bar z}
$$

を与える。これは[複素一次元の共形曲率公式](../KAH1-10/index.md#prop-kah1-10-conformal-curvature)を四階曲率から縮約した結果と一致する。

例えば $f(z,\bar z)=\alpha z\bar z$ ($\alpha\in\mathbb R$) なら $\partial_z f=\alpha\bar z$、$\partial_{\bar z}\partial_z f=\alpha$ なので

$$
\rho=-i\alpha\,dz\wedge d\bar z,\qquad
R_{z\bar z z\bar z}=-\alpha e^{\alpha|z|^2}.
$$

$R$ の係数には $e^f$ が残るが、逆計量 $e^{-f}$ による縮約では相殺される。$\alpha>0$ のときRicci形式は負、$\alpha<0$ では正、$\alpha=0$ では零になる。$i\,dz\wedge d\bar z=2\,dx\wedge dy$ は実2形式だから $\rho$ の実性も具体的に確かめられる。

## 5. 座標を変えると行列式だけが変わる

$\rho$ は曲率から作った幾何学的な2形式なのに、右辺には座標に依存する $\det G$ が現れた。ここで「座標ごとの公式が等しい」のか「スカラー関数が座標不変」なのかを分離する。

重なる二つの正則座標 $z=(z^i)$ と $w=(w^a)$ を考える。正則な座標変換 $z=z(w)$ のJacobi行列を $B=(\partial z^i/\partial w^a)$ とする。正則座標は局所双正則なので $\det B\ne0$ である。接ベクトルの変換は

$$
\frac{\partial}{\partial w^a}
=\sum_i B^i{}_a\frac{\partial}{\partial z^i}
$$

である。従って計量を二つの基底に作用させた成分には、左から $B^T$、右から共役行列 $\overline B$ が掛かる。

<a id="prop-kah1-11-transition"></a>

<!-- formal-statement-start -->
> **命題（Ricci形式の座標不変性）**  
> 滑らかなKähler多様体 $(X,g)$ の二つの正則座標系 $z,w$ が重なる領域で、$B=(\partial z^i/\partial w^a)$ と置く。このとき

$$
G_w=B^T G_z\overline B,\qquad
\log\det G_w=\log\det G_z+\log|\det B|^2.
$$

> ここで $G_z$ と右辺の $\log\det G_z$ は $z=z(w)$ を代入して $w$ 座標の関数とみなす。従って

$$
-i\,\partial\bar\partial\log\det G_w
=-i\,\partial\bar\partial\log\det G_z.
$$

> よって[Ricci形式の局所行列式公式](#thm-kah1-11-local-ricci)から得られる $\rho$ は重なりで一致し、大域的な実 $(1,1)$ 形式になる。
<!-- formal-statement-end -->

### 証明の見取り図

行列式は正則Jacobi行列式の絶対値二乗だけ変わる。しかし零でない正則関数 $h$ について $\partial\bar\partial\log|h|^2=0$ である。[局所Kählerポテンシャルの差](../KAH1-04/index.md#thm-kah1-04-gauge)で使ったのと同じ機構によって、行列式の変化分は二階の混合微分で消える。

<!-- proof-start -->
### 証明

計量の成分を定義から計算すると

$$
\begin{aligned}
(G_w)_{a\bar b}
&=g\left(\frac{\partial}{\partial w^a},
          \frac{\partial}{\partial\bar w^b}\right)\\
&=\sum_{i,j} B^i{}_a\,\overline{B^j{}_b}\,g_{i\bar j}\\
&=(B^T G_z\overline B)_{a\bar b}.
\end{aligned}
$$

$G_w=B^TG_z\overline B$ の3行列について順に行列式を取る。$\det(B^T)=\det B$、$\det(\overline B)=\overline{\det B}$ なので

$$
\det G_w=(\det B)(\det G_z)\overline{\det B}
=|\det B|^2\det G_z.
$$

両方の計量行列式は正なので実対数を取れ、命題の第二式を得る。$h=\det B$ は重なり上で零を持たない正則関数である。正則対数を局所的に選べる理由も確かめよう。任意の点 $p$ の近傍を十分小さく取れば $h(w)=h(p)(1+u(w))$、$|u(w)|<1$ と書ける。$e^{L_p}=h(p)$ となる定数 $L_p$ を選び、

$$
L(w)=L_p+\sum_{r=1}^{\infty}\frac{(-1)^{r+1}}r u(w)^r
$$

と置く。級数は小さい近傍で局所一様収束して正則関数を定め、$e^L=h$ を満たす。こうして得た $L$ に対して

$$
\log|h|^2=L+\overline L,\qquad
\partial\bar\partial L=0,\quad
\partial\bar\partial\overline L=0.
$$

第一項は $\bar\partial L=0$ により、第二項は $\partial\overline L=0$ および $\partial\bar\partial=-\bar\partial\partial$ により消える。この等式は各点の近傍で成立するから重なり全体で成立する。従って $\partial\bar\partial\log\det G_w=\partial\bar\partial\log\det G_z$ であり、形式としての局所表示が貼り合う。

最後に、$\log\det G_z$ は実数値なので、$\overline{\partial\bar\partial f}=\bar\partial\partial f=-\partial\bar\partial f$ と $\overline{-i}=i$ から $\overline{-i\partial\bar\partial f}=-i\partial\bar\partial f$。$\rho$ は実形式である。$\square$
<!-- proof-end -->

**数値の変化を見よう。** $\mathbb C$ 上の一定計量 $g_{z\bar z}=1$ を取り、$w=2z$ とする。このとき $B=\partial z/\partial w=1/2$ で、$g_{w\bar w}=1/4$、$\log\det G_z=0$、$\log\det G_w=-\log4$ である。対数行列式は一致しないが、双方の $\partial\bar\partial$ は零なので $\rho=0$ になる。

座標によって変わるのは $\log\det G$ の**値**であり、そこから作った $\rho$ ではない。「大域的な関数 $-\log\det G$ の二階微分」と言い換えるのは一般には誤りである。

## 6. Ricci形式が閉じる理由

曲率成分の微分関係から $\rho$ の閉性を調べることも考えられる。しかし[Ricci形式の局所行列式公式](#thm-kah1-11-local-ricci)まで導けば、複素微分の基本法則だけで閉性が得られる。

<a id="thm-kah1-11-closed"></a>

<!-- formal-statement-start -->
> **定理（Ricci形式の閉性）**  
> 複素次元 $n\ge1$ の滑らかなKähler多様体 $(X,g)$ のRicci形式 $\rho$ は、大域的に定義された滑らかな実 $(1,1)$ 形式であり、

$$
\boxed{d\rho=0.}
$$

> 従って任意の局所座標表示で、閉形式としての微分関係を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

前節で大域性と実性を示した。閉性は局所的に検査すれば十分で、$d=\partial+\bar\partial$ と $\partial^2=\bar\partial^2=0$、$\partial\bar\partial=-\bar\partial\partial$ を使う。

<!-- proof-start -->
### 証明

任意の正則座標領域で $f=\log\det G$ と置く。$f$ は滑らかな実関数なので $\rho=-i\partial\bar\partial f$ が成り立つ。そこで

$$
\begin{aligned}
d\rho
&=(\partial+\bar\partial)(-i\partial\bar\partial f)\\
&=-i\,\partial^2\bar\partial f
  -i\,\bar\partial\partial\bar\partial f\\
&=0+i\,\partial\bar\partial^2 f\\
&=0.
\end{aligned}
$$

第三行では $\bar\partial\partial=-\partial\bar\partial$、第四行では $\bar\partial^2=0$ を用いた。これは全ての座標領域で成立し、前節により $\rho$ 自体は大域形式なので $d\rho=0$ が $X$ 全体で成り立つ。$\square$
<!-- proof-end -->

閉性により $\rho$ はde Rhamコホモロジー類を定める。しかしその類を第一Chern類へ同定し、なぜ係数 $2\pi$ が付くかを理解するには、正則接束の行列式束とChern接続を結び付ける必要がある。これは次章の課題である。ここでは **$d\rho=0$ だけから $[\rho/(2\pi)]$ が整数係数類に由来するとは推論しない**。

## 7. Fubini–Study計量で再検算する

$\mathbb{CP}^n$ の標準チャートで $A=1+\sum_{i=1}^n|z^i|^2$ と置く。[Fubini–Study局所計量](../KAH1-06/index.md#def-kah1-06-local-fs)は

$$
G=A^{-1}I-A^{-2}\bar z z^T
=A^{-1}\left(I-\frac{\bar z z^T}{A}\right)
$$

である。ここで $\bar z$ は成分 $\bar z^i$ の列ベクトル、$z^T$ は成分 $z^i$ の行ベクトルである。この式を丸暗記して行列式を宣言するのではなく、何が固有方向かを確認する。

$z^Tv=0$ を満たす複素ベクトル $v$ には $(\bar z z^T)v=0$ なので $Gv=A^{-1}v$。一方 $v=\bar z$ なら $z^T\bar z=\sum|z^i|^2=A-1$ だから

$$
G\bar z
=A^{-1}\left(1-\frac{A-1}{A}\right)\bar z
=A^{-2}\bar z.
$$

$z\ne0$ では、$\{v:z^Tv=0\}$ が複素次元 $n-1$、$\bar z$ が残りの一次元を張る。$z=0$ では $A=1,G=I$ で同じ結論になる。よって

$$
\det G=(A^{-1})^{n-1}A^{-2}
=A^{-(n+1)},\qquad
\log\det G=-(n+1)\log A.
$$

この計算に[局所行列式公式](#thm-kah1-11-local-ricci)を代入すると

$$
\begin{aligned}
\rho
&=-i\partial\bar\partial\bigl(-(n+1)\log A\bigr)\\
&=(n+1)i\partial\bar\partial\log A\\
&=(n+1)\omega_{\mathrm{FS}}.
\end{aligned}
$$

[前章の縮約による公式](../KAH1-10/index.md#thm-kah1-10-fs-curvature)と完全に一致する。例えば $n=1$ なら $\det G=(1+|z|^2)^{-2}$ なので $\rho=2\omega_{\mathrm{FS}}$。同じ値を、四階曲率の縮約と行列式の微分という異なる経路から求められた。

## 8. 演習：縮約・座標変換・閉性を自力で結ぶ

### Level A

<a id="ex-kah1-11-a01"></a>
#### KAH1-11-A01 対角行列のJacobi公式
- Level: A

$G(t)=\operatorname{diag}(e^{2t},e^{-t},3)$ ($t\in\mathbb R$) について、$(\log\det G)'$ と $\operatorname{tr}(G^{-1}G')$ を別々に求めよ。

<!-- solution-start -->
**詳細解答。** 行列式は $3e^{2t}e^{-t}=3e^t>0$ だから $\log\det G=\log3+t$、微分は $1$。逆行列は $\operatorname{diag}(e^{-2t},e^t,1/3)$ であり、$G'=\operatorname{diag}(2e^{2t},-e^{-t},0)$。従って

$$
G^{-1}G'=\operatorname{diag}(2,-1,0),
\quad \operatorname{tr}(G^{-1}G')=2-1+0=1.
$$

両辺は一致する。ここで行列式が正なので実対数を使える。
<!-- solution-end -->

<a id="ex-kah1-11-a02"></a>
#### KAH1-11-A02 一次元のRicci形式
- Level: A

$g_{z\bar z}=\exp(2|z|^2-3|z|^4)$ とする。$\rho$ の係数と原点での $\operatorname{Ric}_{z\bar z}$ を求めよ。

<!-- solution-start -->
**詳細解答。** $r=z\bar z$ と置く。$\partial_zr=\bar z$、$\partial_{\bar z}\partial_zr=1$、$\partial_zr^2=2r\bar z$、さらに $\partial_{\bar z}(2r\bar z)=2z\bar z+2r=4r$ となる。$f=\log g=2r-3r^2$ なので $f_{z\bar z}=2-12r$。[局所行列式公式](#thm-kah1-11-local-ricci)へ $n=1$ を代入して

$$
\rho=-i(2-12|z|^2)\,dz\wedge d\bar z,
\qquad
\operatorname{Ric}_{z\bar z}(0)=-2.
$$

指数の正値性により計量は正値であり、複素次元1では基本2形式は自動的に閉じる。
<!-- solution-end -->

<a id="ex-kah1-11-a03"></a>
#### KAH1-11-A03 一定の座標倍率
- Level: A

$\mathbb C$ の計量 $g_{z\bar z}=e^{|z|^2}$ を座標 $w=3z$ で表示せよ。$\log g_{w\bar w}$ と $\rho$ を $w$ で求め、$z$ 表示からの変換結果と比べよ。

<!-- solution-start -->
**詳細解答。** $z=w/3$、$dz/dw=1/3$ なので計量係数の変換から

$$
g_{w\bar w}
=\left|\frac{dz}{dw}\right|^2e^{|w|^2/9}
=\frac19e^{|w|^2/9},
\qquad
\log g_{w\bar w}=\frac{|w|^2}{9}-\log9.
$$

よって $\partial_w\partial_{\bar w}\log g_{w\bar w}=1/9$ から $\rho=-(i/9)\,dw\wedge d\bar w$。元の座標では $\rho=-i\,dz\wedge d\bar z$、$dz=dw/3$ なので $dz\wedge d\bar z=(1/9)dw\wedge d\bar w$。一致し、対数関数に加わる定数は微分で消える。
<!-- solution-end -->

<a id="ex-kah1-11-a04"></a>
#### KAH1-11-A04 閉性の符号
- Level: A

任意の滑らかな実関数 $f$ について $\eta=-i\partial\bar\partial f$ と定める。$\partial\eta$ と $\bar\partial\eta$ をそれぞれ求め、$d\eta=0$ を示せ。

<!-- solution-start -->
**詳細解答。** $\partial^2=0$ より $\partial\eta=-i\partial^2\bar\partial f=0$。また $\bar\partial\partial=-\partial\bar\partial$ を用い

$$
\bar\partial\eta
=-i\bar\partial\partial\bar\partial f
=i\partial\bar\partial^2 f=0.
$$

$d=\partial+\bar\partial$ なので $d\eta=0$。$f$ の実性は $\eta$ が実形式となるために使い、閉性だけには必要ない。
<!-- solution-end -->

### Level B

<a id="ex-kah1-11-b01"></a>
#### KAH1-11-B01 二変数の非定数計量
- Level: B

$\mathbb C^2$ に $\varphi=|z^1|^2+|z^2|^2+\lambda|z^1|^2|z^2|^2$ ($\lambda>0$) を与える。$g_{i\bar j}=\partial_i\partial_{\bar j}\varphi$ の行列と行列式を求め、Kähler正値性を確かめたうえで原点のRicci行列を求めよ。

<!-- solution-start -->
**詳細解答。** $r_a=|z^a|^2$ と置く。$g_{1\bar1}=1+\lambda r_2$、$g_{2\bar2}=1+\lambda r_1$、$g_{1\bar2}=\lambda\bar z^1z^2$、$g_{2\bar1}=\lambda\bar z^2z^1$ であり、

$$
G=\begin{pmatrix}
1+\lambda r_2&\lambda\bar z^1z^2\\
\lambda\bar z^2z^1&1+\lambda r_1
\end{pmatrix},
$$

$$
\begin{aligned}
\det G
&=(1+\lambda r_2)(1+\lambda r_1)-\lambda^2r_1r_2\\
&=1+\lambda(r_1+r_2)>0.
\end{aligned}
$$

$G$ は非対角成分が互いに共役だからHermite行列である。行列式だけでなく、なぜ正値と判定できるかを[2次Hermite行列の平方完成](../KAH1-02/index.md#calc-kah1-02-two-by-two)に沿って直接確認する。$a=1+\lambda r_2>0$、$b=1+\lambda r_1$、$c=\lambda\bar z^1z^2$ とすると $\det G=ab-|c|^2>0$ で、任意の $v=(v_1,v_2)^{\mathsf T}\ne0$ に対し

$$
\begin{aligned}
v^*Gv
&=a|v_1|^2+\overline{v_1}cv_2+\overline{v_2}\overline c v_1+b|v_2|^2\\
&=a\left|v_1+\frac ca v_2\right|^2
  +\frac{\det G}{a}|v_2|^2>0.
\end{aligned}
$$

最後の不等号は、$v_2\ne0$ なら第二項が正、$v_2=0$ なら第一項が正となるためである。さらに $\varphi$ は滑らかな実関数で、$\omega=i\partial\bar\partial\varphi$ だから $d\omega=0$（[ポテンシャルからKähler形式を得る命題](../KAH1-02/index.md#prop-kah1-02-potential-suffices)）。従って正値性と閉性の両方を満たす。$A=1+\lambda(r_1+r_2)$ と置けば

$$
\partial_i\partial_{\bar j}\log A
=\frac{\lambda\delta_{ij}}A-
\frac{\lambda^2\bar z^i z^j}{A^2}.
$$

原点で $A=1,z=0$ なので $\operatorname{Ric}_{i\bar j}(0)=-\lambda\delta_{ij}$。[Ricci形式の局所行列式公式](#thm-kah1-11-local-ricci)を使い、四階曲率の全成分を計算せず結論を得た。
<!-- solution-end -->

<a id="ex-kah1-11-b02"></a>
#### KAH1-11-B02 非定数の正則座標変換
- Level: B

$U=\{z\in\mathbb C:|z|<1/4\}$ で $w=z+z^2$ と置く。$z$ で $g_{z\bar z}=1$ とする。$w$ 表示の $\log g_{w\bar w}$ が一般に定数でないこと、および $\rho=0$ であることを示せ。

<!-- solution-start -->
**詳細解答。** $dw/dz=1+2z$ は $U$ で零にならない。また $|z_1+z_2|<1/2$ だから $w(z_1)=w(z_2)$ なら $(z_1-z_2)(1+z_1+z_2)=0$ となり $z_1=z_2$、従ってこの領域では正則座標である。連鎖律より

$$
\frac{dz}{dw}=\frac1{1+2z},
\quad
g_{w\bar w}=\frac1{|1+2z(w)|^2},
\quad
\log g_{w\bar w}=-\log|1+2z(w)|^2.
$$

この関数は $z$ により変化するが、$1+2z(w)$ は零を持たない正則関数なので局所正則対数を持つ。従って $\partial_w\partial_{\bar w}\log|1+2z(w)|^2=0$ であり $\rho=0$。局所密度の非定数性と曲率の非零性は別問題である。
<!-- solution-end -->

<a id="ex-kah1-11-b03"></a>
#### KAH1-11-B03 積計量のRicci形式
- Level: B

$X=X_1\times X_2$ を二つのKähler多様体の積とし、積計量 $G=\operatorname{diag}(G_1,G_2)$ を入れる。各 $\rho_a$ を因子のRicci形式、$\pi_a$ を射影とする。$\rho=\pi_1^*\rho_1+\pi_2^*\rho_2$ を局所行列式から示せ。

<!-- solution-start -->
**詳細解答。** 積の正則座標では二つの因子の座標は独立で、混合計量成分は零。したがってブロック対角行列の行列式は $\det G=(\det G_1)(\det G_2)$。各行列式は正なので

$$
\log\det G
=\pi_1^*(\log\det G_1)+\pi_2^*(\log\det G_2).
$$

外微分と型別微分は滑らかな正則写像による引き戻しと可換だから

$$
\begin{aligned}
\rho&=-i\partial\bar\partial\log\det G\\
&=\pi_1^*(-i\partial_1\bar\partial_1\log\det G_1)
+\pi_2^*(-i\partial_2\bar\partial_2\log\det G_2)\\
&=\pi_1^*\rho_1+\pi_2^*\rho_2.
\end{aligned}
$$

両辺は座標ごとに等しい大域形式であり、混合Ricci成分は零になる。
<!-- solution-end -->

### Level C

<a id="ex-kah1-11-c01"></a>
#### KAH1-11-C01 行列式から射影空間とトーラスを比較する
- Level: C

$\mathbb{CP}^n$ ($n\ge1$) の $\omega_{\mathrm{FS}}=i\partial\bar\partial\log(1+\sum|z^i|^2)$ と、一定係数計量を降ろした複素トーラス $T$ を考える。

1. $G_{\mathrm{FS}}=A^{-1}I-A^{-2}\bar z z^T$ から $\det G_{\mathrm{FS}}$ を導き、Ricci形式を求めよ。
2. 平坦トーラスのRicci形式を行列式から求めよ。
3. $X=T\times\mathbb{CP}^n$ の積計量と、$c>0$ を用いた $g'=g_T\oplus c\,g_{\mathrm{FS}}$ でRicci形式がどう変わるか示せ。
4. $\rho$ が閉じることと、局所対数行列式が大域関数として貼り合うことは同値か。理由を述べよ。

<!-- solution-start -->
**詳細解答。** 第1問では $z\ne0$ として $z^Tv=0$ の $n-1$ 次元部分空間で固有値 $A^{-1}$、$\bar z$ 方向で固有値 $A^{-2}$ となることを $Gv$ の計算で確認する。$z=0$ では $G=I$。従って全点で

$$
\det G_{\mathrm{FS}}=A^{-(n-1)}A^{-2}=A^{-(n+1)}.
$$

[局所行列式公式](#thm-kah1-11-local-ricci)へ $\log\det G_{\mathrm{FS}}=-(n+1)\log A$ を代入すると

$$
\rho_{\mathrm{FS}}=(n+1)i\partial\bar\partial\log A
=(n+1)\omega_{\mathrm{FS}}.
$$

第2問ではトーラスの商局所座標における係数行列は一定の正値Hermite行列 $G_T$。$\partial_i\partial_{\bar j}\log\det G_T=0$ なので $\rho_T=0$ である。

第3問では積計量の係数行列がブロック対角になるので、各ブロックの行列式を掛け合わせる。複素次元 $m$ の $T$ について、$\mathbb{CP}^n$ 側の $n$ 行列を定数倍すれば $\det(cG_{\mathrm{FS}})=c^n\det G_{\mathrm{FS}}$。従って

$$
\log\det(g_T\oplus cG_{\mathrm{FS}})
=\log\det G_T+n\log c+\log\det G_{\mathrm{FS}}.
$$

$\partial\bar\partial(n\log c)=0$ なので、いずれの積計量についても

$$
\rho=\pi_{\mathrm{FS}}^*((n+1)\omega_{\mathrm{FS}}).
$$

特に定数倍でRicci形式が変わらないことは[前章の倍率の命題](../KAH1-10/index.md#prop-kah1-10-scaling)とも一致する。

第4問は同値でない。$\rho$ は各チャートの $\log\det G$ の混合二階微分が貼り合った大域形式で、[閉性定理](#thm-kah1-11-closed)から閉じる。しかし $w=2z$ とした平坦な $\mathbb C$ の二座標表示ですら $\log G_w=\log G_z-\log4$ であり、同じスカラー関数にはならない。零を持たない正則Jacobi行列式の対数絶対値二乗というずれが $\partial\bar\partial$ で消えることこそ、形式が大域化する理由である。$\square$
<!-- solution-end -->
