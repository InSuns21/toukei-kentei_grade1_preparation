# HOLO13 バルク重力場と応力テンソル

[HOLO12のMaxwell場と保存電流](../HOLO12/index.md#def-holo12-current)では、境界の1形式を源として変分すると電流の応答が得られました。重力の場合、境界理論の何を変えれば応答を測れるでしょうか。距離や角度、ひいてはエネルギーの測定を決めるのは**境界計量**です。その変分に応答する量が応力テンソルです。しかし[GR10のEinstein–Hilbert作用](../../GR/GR10/index.md#def-gr10-eh-action)をただ変分するだけでは、境界計量を固定しても法線微分の変分が残ります。

本講はこの障害をGibbons–Hawking–York（GHY）境界項で取り除き、有限cutoff上のBrown–York型テンソルを作ります。純AdSでも裸のテンソルは発散するので、最初の局所反項を使ってその意味を分けます。最後に**三次元の純Einstein重力**のFefferman–Graham展開を実際に計算し、二次元CFTのWeyl異常と照合してBrown–Henneauxの中央電荷へ到達します。一般次元の反項をすべて構成するのは次講HOLO14の課題です。

## 0. 対象・計量・符号・近似

整数$d\ge2$、AdS半径$L>0$、Newton定数$G_{d+1}>0$を固定し、$\hbar=1$とします。主な変分は**Euclid符号**の$(d+1)$次元Einstein重力を、半径方向のcutoff $\epsilon>0$ と赤外側の境界で区切った滑らかな領域$M_{\epsilon}$で行います。境界方向は閉多様体または変分がコンパクト台を持つ領域とし、角・端点からの寄与はありません。赤外側の変分を零に固定します。正規化は

$$
R_{ab}-\frac12 Rg_{ab}+\Lambda g_{ab}=0,
\qquad
\Lambda=-\frac{d(d-1)}{2L^2}
$$

です。従ってEinstein方程式を縮約すると $R=-d(d+1)/L^2$ です。添字$a,b$はバルク、$i,j$は境界方向です。$\gamma_{ij}$はcutoff面の誘導計量、$n^a$は**バルク領域から外へ向く**単位法線、$K_{ij}=\frac12\mathcal L_n\gamma_{ij}$は第二基本形式、$K=\gamma^{ij}K_{ij}$はそのトレースです。$R[\gamma]$は誘導計量のスカラー曲率です。

[HOLO3で使ったEuclid AdSの座標](../HOLO3/index.md#def-holo3-euclidean-ads)を参照し、純AdSの局所模型を

$$
ds_E^2=\frac{L^2}{z^2}(dz^2+\delta_{ij}dx^i dx^j),
\qquad z\ge\epsilon
$$

とします。紫外面$z=\epsilon$では外向き法線が $n^z=-\epsilon/L$ です。**$z$の増加方向は外向きではありません。** 以下の応力テンソルの符号は、この法線とEuclid生成汎関数$W=\log Z_{\mathrm{CFT}}=-I_{E,\mathrm{ren}}$の規約に対応します。Lorentz時空の時間順序相関へそのまま移すことはしません。

境界CFTとの一致は、適切な重力双対を持ち、大$N$などの制御された極限で指定したEuclid鞍点が支配する、という[HOLO9のGKPWの仮定](../HOLO9/index.md#def-holo9-gkpw)の**重力版**です。作用の計算自体は双対性を証明しません。

## 1. なぜ重力にはGHY項が必要か

スカラーやMaxwell場の作用では、場を部分積分すると境界には場の変分だけが現れました。重力のスカラー曲率$R$は計量の**二階微分**を含み、境界計量を固定する条件$\delta\gamma_{ij}=0$だけでは一般に法線微分$\partial_n\delta\gamma_{ij}$は固定されません。この差を補う境界項が必要です。

<a id="def-holo13-dirichlet-action"></a>

<!-- formal-statement-start -->
> **定義（重力のDirichlet作用とGHY項）**  
> 上記のEuclid重力領域$M_\epsilon$で、境界が滑らかで非退化な誘導計量を持つとする。$\Lambda=-d(d-1)/(2L^2)$として、境界計量を固定するための作用を

$$
I_{E,\mathrm{D}}[g]
=-\frac{1}{16\pi G_{d+1}}\int_{M_\epsilon}\sqrt g\,(R-2\Lambda)\,d^{d+1}X
-\frac{1}{8\pi G_{d+1}}\int_{\partial M_\epsilon}\sqrt\gamma\,K\,d^dx
$$

> と定義する。第2項をGibbons–Hawking–York境界項と呼ぶ。ここでは角・端点項を要しない領域とし、赤外面の変分は零に固定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo13-dirichlet-action -->
**定義の確認**：純Euclid AdSの$z=\epsilon$面では $\gamma_{ij}=L^2\epsilon^{-2}\delta_{ij}$、$\sqrt\gamma=(L/\epsilon)^d$ です。外向き法線によって

$$
K_{ij}=\frac12 n^z\partial_z\gamma_{ij}
=\frac12\left(-\frac{\epsilon}{L}\right)
\left(-\frac{2L^2}{\epsilon^3}\delta_{ij}\right)
=\frac1L\gamma_{ij},\qquad K=\frac dL.
$$

従ってその面のGHY被積分密度は$-d\sqrt\gamma/(8\pi G_{d+1}L)$です。法線の符号を逆にすると$K$もGHY項も逆転します。赤外面にも外向き法線に従った項があり、紫外面の符号を流用しません。
<!-- definition-example-end -->

<a id="prop-holo13-dirichlet-variation"></a>

<!-- formal-statement-start -->
> **命題（GHYを含む重力作用のon-shell第一変分）**  
> 第0節の滑らかなEuclid計量に対して、境界の位置を固定して計量を変分し、Einstein方程式が成立し赤外面の寄与が零とする。するとGHY項を加えた作用の紫外面での第一変分は

$$
\delta I_{E,\mathrm D}\big|_{\mathrm{os}}
=-\frac{1}{16\pi G_{d+1}}
\int_{z=\epsilon}\sqrt\gamma\,
(K_{ij}-K\gamma_{ij})\,\delta\gamma^{ij}\,d^dx.
$$

> 特に$\delta\gamma^{ij}=0$なら変分は零であり、境界に$\partial_n\delta\gamma$を別途固定する必要はない。
<!-- formal-statement-end -->

### 証明の見取り図

曲率の二階微分から出る$\partial_n\delta\gamma$が、GHYの変分と相殺します。残るのは法線方向の正準運動量と境界計量の変分の積です。なぜこの形になるかを、法線方向にガウス座標を取って確認します。

<!-- proof-start -->
### 証明

局所的なガウス座標を$ds_E^2=ds^2+\gamma_{ij}(s,x)dx^i dx^j$と置き、$n=\partial_s$が考えている境界の外向きとなるように取ります。$\Gamma^s_{ij}=-K_{ij}$、$\Gamma^i_{sj}=K^i{}_j$なので、曲率の成分を縮約すると

$$
R[g]=R[\gamma]-K_{ij}K^{ij}-K^2-2\partial_s K,
\qquad
\partial_s\sqrt\gamma=\sqrt\gamma K.
$$

この式の最終項を重力作用へ代入すると、法線方向の部分積分により

$$
\int ds\,\sqrt\gamma\,\partial_s K
=[\sqrt\gamma K]_{\mathrm{ends}}
-\int ds\,\sqrt\gamma\,K^2
$$

となります。境界での$[\sqrt\gamma K]$の項は**GHY作用と正確に相殺**されます。従って法線微分を含む実効的なバルク被積分関数は

$$
\mathcal L_{\mathrm{D}}
=-\frac{\sqrt\gamma}{16\pi G_{d+1}}
\left(R[\gamma]+K^2-K_{ij}K^{ij}-2\Lambda\right).
$$

ここで$K_{ij}=\frac12\partial_s\gamma_{ij}$なので、$\partial_s\gamma_{ij}$について微分した正準運動量は

$$
\frac{\partial\mathcal L_{\mathrm D}}
{\partial(\partial_s\gamma_{ij})}
=-\frac{\sqrt\gamma}{16\pi G_{d+1}}
\left(K\gamma^{ij}-K^{ij}\right)
=\frac{\sqrt\gamma}{16\pi G_{d+1}}
\left(K^{ij}-K\gamma^{ij}\right).
$$

この運動量が掛かるのは$\delta\gamma_{ij}$です。逆計量についての変分へ直すには、$\gamma^{ik}\gamma_{kj}=\delta^i_j$を微分して得る

$$
\delta\gamma_{ij}
=-\gamma_{ik}\gamma_{j\ell}\delta\gamma^{k\ell}
$$

を代入します。すると外向き端点での境界変分は命題の右辺です。複数境界の各面でも局所的に外向き$s$を使えば同じ式となります。内部のEuler–Lagrange項はEinstein方程式で零となり、赤外面の変分も仮定で消えます。$\square$
<!-- proof-end -->

この結果は**境界位置を固定したDirichlet問題**についてのものです。null境界、角を持つ領域、境界条件を変える場合に同じ二項だけで十分とは主張しません。

## 2. 計量を源とする応力テンソル

次は源への応答の辞書です。スカラー場の源微分と同じ考えでも、計量を変えると体積要素$\sqrt\gamma$も変わるので、二つの添字と係数$2$を管理する必要があります。境界で定義する応力テンソルは**計量変分に掛かる対称な係数**であって、座標成分の単なる行列ではありません。

<a id="def-holo13-brown-york"></a>

<!-- formal-statement-start -->
> **定義（有限cutoffのBrown–York型テンソル）**  
> 第1節のEuclid重力のon-shell作用を境界逆計量$\gamma^{ij}$で変分できるとする。次の第一変分の係数で定める対称テンソルを、有限cutoffの裸のBrown–York型テンソルと呼ぶ。

$$
\delta I_{E,\mathrm D}|_{\mathrm{os}}
=\frac12\int\sqrt\gamma\,\tau^{\mathrm{bare}}_{ij}\delta\gamma^{ij}.
$$

> この規約では

$$
\tau^{\mathrm{bare}}_{ij}
=-\frac{1}{8\pi G_{d+1}}(K_{ij}-K\gamma_{ij}).
$$

> また重力版GKPW辞書$W[g_{(0)}]=-I_{E,\mathrm{ren}}[g_{(0)}]$を仮定する場合、境界CFTの応力テンソルを

$$
\delta W
=-\frac12\int\sqrt{g_{(0)}}\,
\langle T_{ij}\rangle\,\delta g_{(0)}^{ij}\,d^dx
$$

> で定義する。$g_{(0)}$はcutoff計量の適切な共形再尺度極限であり、$\tau^{\mathrm{bare}}$を無条件に$\langle T\rangle$と同一視しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo13-brown-york -->
**定義の確認**：純AdSの[第1節の直接計算](#def-holo13-dirichlet-action)から

$$
\tau^{\mathrm{bare}}_{ij}
=-\frac{1}{8\pi G_{d+1}}
\left(\frac{1-d}{L}\gamma_{ij}\right)
=\frac{d-1}{8\pi G_{d+1}L}\gamma_{ij}.
$$

$\gamma_{ij}=L^2\epsilon^{-2}\delta_{ij}$なので、その共変成分は$\epsilon^{-2}$で発散します。これは純AdSの双対真空に無限の応力があることを意味せず、**反項を入れる前の裸の値**です。$\tau_{ij}$が対称であることも、$K_{ij}=K_{ji}$と$\gamma_{ij}=\gamma_{ji}$から確認できます。
<!-- definition-example-end -->

最も単純な局所反項は境界の体積です。$d\ge2$の平坦な境界源について

$$
I_{\mathrm{ct},0}
=\frac{d-1}{8\pi G_{d+1}L}
\int_{z=\epsilon}\sqrt\gamma\,d^dx,
\qquad
\delta\sqrt\gamma
=-\frac12\sqrt\gamma\,\gamma_{ij}\delta\gamma^{ij}.
$$

このため$\tau^{\mathrm{ct},0}_{ij}=-(d-1)\gamma_{ij}/(8\pi G_{d+1}L)$であり、裸のテンソルと足すと純AdSでは零となります。有限cutoffでの合計は

$$
\tau^{(0)}_{ij}
=-\frac1{8\pi G_{d+1}}
\left(K_{ij}-K\gamma_{ij}+\frac{d-1}{L}\gamma_{ij}\right).
$$

**重要**：一般の曲がった$d>2$の境界源には、$R[\gamma]$などの反項および偶数次元で対数項が必要になることがあります。この式を全次元・全境界条件で繰り込み済みの最終答えとしません。一般次元で反項とWard恒等式を系統的に作るのはHOLO14です。

有限cutoffで$\gamma_{ij}=(L^2/\epsilon^2)g_{(0)ij}+\cdots$とすると、逆計量の変分は$\delta\gamma^{ij}=(\epsilon^2/L^2)\delta g_{(0)}^{ij}+\cdots$です。これを上の定義の積へ代入すれば、局所反項をすべて足した場合の境界応答は形式的に

$$
\langle T_{ij}\rangle
=\lim_{\epsilon\to0}\left(\frac L\epsilon\right)^{d-2}
\tau^{\mathrm{ren}}_{\epsilon,ij},
$$

となります。極限の存在、対数項、有限反項のscheme依存は**仮定ではなく確認事項**です。以下の純三次元Einstein重力ではこの極限を直接計算します。

## 3. $AdS_3$で境界応答を有限に求める

$d=2$では半径方向の変形を含む解を明示的に追えるため、反項の動作と応力テンソルの意味を一つの計算で結べます。ここでは**三次元純Einstein重力、負の宇宙項、滑らかな漸近AdS境界**に限定します。局所的にFefferman–Graham（FG）形を取り、境界源$g_{(0)ij}(x)$を非退化とします。

$$
ds_E^2=\frac{L^2}{z^2}
\left\{dz^2+
[g_{(0)ij}(x)+z^2g_{(2)ij}(x)+O(z^4)]dx^i dx^j\right\}.
$$

ここで$g_{(2)ij}$は$g_{(0)}$と同じ二つの境界添字を持つ対称テンソルです。近傍展開が許され、純三次元Einstein方程式を満たす状態を扱います。トレースは$\operatorname{tr}_0g_{(2)}=g_{(0)}^{ij}g_{(2)ij}$です。

<a id="prop-holo13-fg-stress"></a>

<!-- formal-statement-start -->
> **命題（三次元純Einstein重力の有限応力テンソル）**  
> 上のFG形の滑らかな漸近Euclid $AdS_3$ Einstein解で、$\Lambda=-1/L^2$、外向き法線$n^z=-z/L$とする。$d=2$における体積反項のみを加えた第2節の$\tau^{(0)}$は有限極限を持ち、境界の応力テンソルは

$$
\langle T_{ij}\rangle
=\frac{L}{8\pi G_3}
\left(g_{(2)ij}-g_{(0)ij}\operatorname{tr}_0g_{(2)}\right).
$$

> ここでは$\hbar=1$、局所有限反項を追加しないschemeを採用し、状態依存の$g_{(2)}$と源の$g_{(0)}$を混同しない。
<!-- formal-statement-end -->

### 証明の見取り図

誘導計量を先に展開し、$K_{ij}$では$z^0$の項が消えることを確認します。ただし$K=\gamma^{ij}K_{ij}$には$z^2$の補正が残ります。そこまで掛け合わせないと境界応力のトレース項は出ません。

<!-- proof-start -->
### 証明

FGの誘導計量および逆計量は

$$
\gamma_{ij}=\frac{L^2}{z^2}g_{(0)ij}+L^2g_{(2)ij}+O(z^2),
$$

$$
\gamma^{ij}=\frac{z^2}{L^2}
\left(g_{(0)}^{ij}-z^2g_{(2)}^{ij}+O(z^4)\right).
$$

逆行列の二次項は$(g_{(0)}+z^2g_{(2)})(g_{(0)}^{-1}-z^2g_{(0)}^{-1}g_{(2)}g_{(0)}^{-1})=1+O(z^4)$を掛けて確認できます。ここで$g_{(2)}^{ij}=g_{(0)}^{ik}g_{(0)}^{j\ell}g_{(2)k\ell}$です。

法線微分を実行すると

$$
K_{ij}=-\frac{z}{2L}\partial_z\gamma_{ij}
=\frac{L}{z^2}g_{(0)ij}+O(z^2).
$$

従って行列の積に注意して

$$
K^i{}_j=\frac1L\left(\delta^i{}_j-z^2g_{(2)}^i{}_j+O(z^4)\right),
\qquad
K=\frac2L-\frac{z^2}{L}\operatorname{tr}_0g_{(2)}+O(z^4).
$$

$d=2$の反項を含む括弧は$B_{ij}=K_{ij}-(K-1/L)\gamma_{ij}$です。二つの級数を掛けると

$$
(K-1/L)\gamma_{ij}
=\frac{L}{z^2}g_{(0)ij}
+L g_{(2)ij}
-L g_{(0)ij}\operatorname{tr}_0g_{(2)}
+O(z^2).
$$

よって$z^{-2}$項が相殺し、

$$
B_{ij}=-L\left(g_{(2)ij}-g_{(0)ij}\operatorname{tr}_0g_{(2)}\right)+O(z^2).
$$

[有限cutoffの応力テンソル](#def-holo13-brown-york)の負号と$1/(8\pi G_3)$を掛けます。$d=2$では$(L/\epsilon)^{d-2}=1$なので、これが命題の境界極限です。$\square$
<!-- proof-end -->

**直接例（同じ境界源でも状態は違う）**：平坦な$g_{(0)ij}=\delta_{ij}$で$g_{(2)}=\begin{pmatrix}a&0\\0&-a\end{pmatrix}$（$a$は定数）とすると、トレースは零で、$\langle T_{ij}\rangle=L\,g_{(2)ij}/(8\pi G_3)$です。$a=0$なら真空の平坦な応力は零ですが、$a\ne0$なら源計量は同じでも応答は異なります。この局所データを持つFG解の許容性はEinstein制約と境界条件により判定します。単なる任意の行列が完全な大域解を保証するわけではありません。

## 4. Einstein制約とBrown–Henneaux中央電荷

第3節で残った$g_{(2)}$の全成分は自由ではありません。半径方向のEinstein方程式がそのトレースと発散を拘束します。ここで新たに用いる二次元CFT側の入力は、**同じ計量・曲率の規約で正規化されたWeyl異常**

$$
\langle T^i{}_i\rangle=\frac{c}{24\pi}R[g_{(0)}]
$$

です。$c$は左右対称で$c_L=c_R=c$の二次元CFTの中央電荷です。この異常係数のCFT側の一般導出は本章の重力計算の外からの入力であり、境界の局所的な異常が存在することを仮定して比較します。

<a id="prop-holo13-ads3-constraints"></a>

<!-- formal-statement-start -->
> **命題（AdS3のFG制約と応力保存）**  
> 第3節の漸近Euclid $AdS_3$の純Einstein解で境界計量$g_{(0)}$が滑らかかつ非退化であるとする。$\nabla_{(0)}$を$g_{(0)}$のLevi–Civita接続、$R[g_{(0)}]$をそのスカラー曲率とすると、FG係数は

$$
\operatorname{tr}_0 g_{(2)}=-\frac12 R[g_{(0)}],
\qquad
\nabla_{(0)}^i g_{(2)ij}
=\nabla_{(0)j}\operatorname{tr}_0g_{(2)}
$$

> を満たす。従って[第3節の応力テンソル](#prop-holo13-fg-stress)は$\nabla_{(0)}^i\langle T_{ij}\rangle=0$である。
<!-- formal-statement-end -->

### 証明の見取り図

第1式は法線・法線成分のEinstein拘束へ$z^2$までのFG級数を代入して得ます。第2式は法線・接線成分の運動量拘束から出ます。応力の発散は両者ではなく、第2式だけで消えます。

<!-- proof-start -->
### 証明

純Einstein方程式に対する、外向き単位法線によるガウス分解の二つの拘束は

$$
R[\gamma]-K^2+K_{ij}K^{ij}=-\frac2{L^2},
\qquad
\nabla_{\gamma}^i(K_{ij}-K\gamma_{ij})=0
$$

です。第1式は法線・法線方向、第2式は法線・接線方向の成分です。FG級数と[第3節の$K$の展開](#prop-holo13-fg-stress)から

$$
R[\gamma]=\frac{z^2}{L^2}R[g_{(0)}]+O(z^4),\quad
K^2=\frac4{L^2}-\frac{4z^2}{L^2}\operatorname{tr}_0g_{(2)}+O(z^4),
$$

$$
K_{ij}K^{ij}
=\frac2{L^2}-\frac{2z^2}{L^2}\operatorname{tr}_0g_{(2)}+O(z^4).
$$

したがって拘束の左辺は

$$
-\frac2{L^2}
+\frac{z^2}{L^2}\left(R[g_{(0)}]+2\operatorname{tr}_0g_{(2)}\right)+O(z^4).
$$

右辺は厳密に$-2/L^2$なので$z^2$の係数が零となり、最初の等式が得られます。運動量拘束は、第3節で求めた$B_{ij}=-L(g_{(2)ij}-g_{(0)ij}\operatorname{tr}_0g_{(2)})+O(z^2)$を使うと、定数倍の計量は接続を変えないことから

$$
0=\nabla_{(0)}^i
\left(g_{(2)ij}-g_{(0)ij}\operatorname{tr}_0g_{(2)}\right)
$$

を与えます。$\nabla_{(0)}g_{(0)}=0$を使って展開すれば命題の第2式です。[境界応力の表示](#prop-holo13-fg-stress)に同じ括弧があるので保存則も従います。$\square$
<!-- proof-end -->

<a id="prop-holo13-brown-henneaux"></a>

<!-- formal-statement-start -->
> **命題（異常係数から得るBrown–Henneaux関係）**  
> 第3・4節の純三次元Einstein重力、標準的な漸近$AdS_3$のBrown–Henneaux型境界条件、$G_3>0$、$\hbar=1$、左右同じ中央電荷を持つ二次元境界CFTとのGKPW辞書を仮定する。さらに二次元CFTのWeyl異常を$\langle T^i{}_i\rangle=cR[g_{(0)}]/(24\pi)$と正規化すると、比較から

$$
c=\frac{3L}{2G_3}
$$

> を得る。この比較は漸近対称性のVirasoro代数を一から構成した証明ではない。
<!-- formal-statement-end -->

### 証明の見取り図

重力側の応力のトレースを取り、[FG制約](#prop-holo13-ads3-constraints)の曲率との関係を代入します。CFT側の異常係数との一致が$G_3$と$c$を結びます。

<!-- proof-start -->
### 証明

[FG応力の表示](#prop-holo13-fg-stress)を$g_{(0)}^{ij}$で縮約します。境界次元が$2$なので

$$
\langle T^i{}_i\rangle
=\frac{L}{8\pi G_3}
\left(\operatorname{tr}_0g_{(2)}-2\operatorname{tr}_0g_{(2)}\right)
=-\frac{L}{8\pi G_3}\operatorname{tr}_0g_{(2)}.
$$

[Einstein制約の第1式](#prop-holo13-ads3-constraints)より$\operatorname{tr}_0g_{(2)}=-R[g_{(0)}]/2$なので、

$$
\langle T^i{}_i\rangle=\frac{L}{16\pi G_3}R[g_{(0)}].
$$

曲率が非零の境界源でも成立する局所係数として、CFT側$c/(24\pi)$と比較すれば$L/(16\pi G_3)=c/(24\pi)$、したがって$c=3L/(2G_3)$です。平坦境界だけでは両辺の曲率が零なので、この係数を決定できません。$\square$
<!-- proof-end -->

**適用範囲**：中央電荷の関係は純Einstein重力の標準的な漸近境界条件と異常の正規化に依存します。高次曲率項・追加自由度・異なる境界条件では修正され得ます。特に「すべての二次元CFTが古典$AdS_3$ Einstein重力に双対である」とは言えません。なお、保存則とトレース異常を一般の物質源を含むWard恒等式へ拡張するには、次講の反項と追加変分を検査する必要があります。

## 5. 演習

### Level A：法線・変分・係数を単独で確かめる

<a id="ex-holo13-a1"></a>

**HOLO13-A1（紫外面の法線と第二基本形式）**  
$d=2$のEuclid $AdS_3$を$ds_E^2=L^2z^{-2}(dz^2+dx^2+dy^2)$、領域$z\ge\epsilon$とする。$\gamma_{ij}$、外向き$n^z$、$K_{xx}$、$K$を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答**：誘導計量は$\gamma_{xx}=\gamma_{yy}=L^2/\epsilon^2$、交差成分は零です。$g_{zz}=L^2/\epsilon^2$なので単位条件から$|n^z|=\epsilon/L$。外向きは$z$が小さくなる方向だから$n^z=-\epsilon/L$です。よって

$$
K_{xx}=\frac12n^z\partial_z(L^2/z^2)|_\epsilon
=\frac12(-\epsilon/L)(-2L^2/\epsilon^3)=L/\epsilon^2.
$$

$K_{yy}$も同じなので$K=\gamma^{xx}K_{xx}+\gamma^{yy}K_{yy}=1/L+1/L=2/L$です。
<!-- solution-end -->

<a id="ex-holo13-a2"></a>

**HOLO13-A2（逆計量の変分と反項）**  
$d\ge2$の誘導計量$\gamma_{ij}$で、$I_{\mathrm{ct},0}=A\int\sqrt\gamma$、$A=(d-1)/(8\pi G_{d+1}L)$とする。$\delta I_{\mathrm{ct},0}=\frac12\int\sqrt\gamma\,\tau^{\mathrm{ct}}_{ij}\delta\gamma^{ij}$から$\tau^{\mathrm{ct}}_{ij}$を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答**：$\gamma_{ik}\gamma^{kj}=\delta_i^j$の変分は$\delta\gamma_{ij}=-\gamma_{ik}\gamma_{j\ell}\delta\gamma^{k\ell}$です。行列式の変分は$\delta\sqrt\gamma=\frac12\sqrt\gamma\,\gamma^{ij}\delta\gamma_{ij}=-\frac12\sqrt\gamma\,\gamma_{ij}\delta\gamma^{ij}$です。したがって

$$
\delta I_{\mathrm{ct},0}
=-\frac A2\int\sqrt\gamma\,\gamma_{ij}\delta\gamma^{ij},
\qquad
\tau^{\mathrm{ct}}_{ij}=-A\gamma_{ij}.
$$

純AdSの裸応力は$+A\gamma_{ij}$なので、和が零になります。
<!-- solution-end -->

<a id="ex-holo13-a3"></a>

**HOLO13-A3（FGの外部曲率）**  
$d=2$で$\gamma_{ij}=L^2z^{-2}g_{(0)ij}+L^2g_{(2)ij}+O(z^2)$、$n^z=-z/L$とする。$K_{ij}$の$z^{-2}$項と$z^0$項を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答**：$g_{(0)}$と$g_{(2)}$は$z$に依存しません。よって

$$
\partial_z\gamma_{ij}=-2L^2z^{-3}g_{(0)ij}+O(z),
\qquad
K_{ij}=-\frac z{2L}\partial_z\gamma_{ij}
=Lz^{-2}g_{(0)ij}+O(z^2).
$$

$L^2g_{(2)}$を微分すると零であるため、$z^0$項は存在しません。ただし$K$には逆計量の展開を掛けるので$g_{(2)}$が残ります。
<!-- solution-end -->

<a id="ex-holo13-a4"></a>

**HOLO13-A4（応力のトレース）**  
境界次元$2$で$\langle T_{ij}\rangle=L(g_{(2)ij}-g_{(0)ij}t)/(8\pi G_3)$、$t=g_{(0)}^{ij}g_{(2)ij}$とする。トレースを計算せよ。

- Level: A

<!-- solution-start -->
**詳細解答**：$g_{(0)}^{ij}g_{(0)ij}=\delta^i_i=2$です。よって

$$
g_{(0)}^{ij}\langle T_{ij}\rangle
=\frac{L}{8\pi G_3}(t-2t)
=-\frac{L}{8\pi G_3}t.
$$

源の曲率が零なら[FG制約](#prop-holo13-ads3-constraints)から$t=0$です。
<!-- solution-end -->

<a id="ex-holo13-a5"></a>

**HOLO13-A5（平坦源に対する状態の変化）**  
$g_{(0)}=\mathrm{diag}(1,1)$、$g_{(2)}=\mathrm{diag}(b,-b)$で$b$は実定数とする。FG応力の二つの対角成分、トレース、発散を求め、$b=0$の場合と比較せよ。

- Level: A

<!-- solution-start -->
**詳細解答**：$\operatorname{tr}_0g_{(2)}=b-b=0$なので、

$$
\langle T_{11}\rangle=\frac{Lb}{8\pi G_3},
\qquad
\langle T_{22}\rangle=-\frac{Lb}{8\pi G_3}.
$$

トレースは零です。$g_{(0)}$は平坦、$b$は定数なので$\nabla_{(0)}^i\langle T_{ij}\rangle=\partial_i\langle T_{ij}\rangle=0$です。$b=0$の時は全成分が零で、境界計量が同じでも状態を表す$g_{(2)}$によって応答が変わります。大域的な状態の存在は別条件です。
<!-- solution-end -->

### Level B：式をつないで再構成する

<a id="ex-holo13-b1"></a>

**HOLO13-B1（制約の$z^2$係数）**  
三次元純Einstein重力のFG展開で$K=2/L-z^2t/L+O(z^4)$、$K_{ij}K^{ij}=2/L^2-2z^2t/L^2+O(z^4)$、$R[\gamma]=z^2R_0/L^2+O(z^4)$とする。$R[\gamma]-K^2+K_{ij}K^{ij}=-2/L^2$から$t$を求めよ。

- Level: B

<!-- solution-start -->
**詳細解答**：まず

$$
K^2=\left(\frac2L-\frac{z^2t}L\right)^2+O(z^4)
=\frac4{L^2}-\frac{4z^2t}{L^2}+O(z^4).
$$

よって左辺は

$$
\frac{z^2R_0}{L^2}-\frac4{L^2}
+\frac{4z^2t}{L^2}+\frac2{L^2}
-\frac{2z^2t}{L^2}+O(z^4)
=-\frac2{L^2}+\frac{z^2}{L^2}(R_0+2t)+O(z^4).
$$

右辺の$z^2$係数は零です。従って$R_0+2t=0$、すなわち$t=-R_0/2$です。
<!-- solution-end -->

<a id="ex-holo13-b2"></a>

**HOLO13-B2（応力保存を制約から導く）**  
二次元境界で$g_{(2)ij}$が$\nabla_{(0)}^ig_{(2)ij}=\partial_jt$、$t=\operatorname{tr}_0g_{(2)}$を満たすとする。[境界応力](#prop-holo13-fg-stress)の発散が零となることを示せ。さらに$t=t(x)$が定数でなくても保存が成立する理由を述べよ。

- Level: B

<!-- solution-start -->
**詳細解答**：Levi–Civita接続は$\nabla_{(0)}^ig_{(0)ij}=0$を満たすので、積の微分から

$$
\nabla_{(0)}^i(g_{(0)ij}t)
=(\nabla_{(0)}^ig_{(0)ij})t+g_{(0)ij}\nabla_{(0)}^it
=\partial_jt.
$$

従って

$$
\nabla_{(0)}^i\langle T_{ij}\rangle
=\frac L{8\pi G_3}
\left(\nabla_{(0)}^ig_{(2)ij}-\partial_jt\right)=0.
$$

$t$の微分が零だからではなく、$g_{(2)}$の発散と**打ち消し合う**ことが理由です。
<!-- solution-end -->

<a id="ex-holo13-b3"></a>

**HOLO13-B3（中央電荷の係数と平坦境界の限界）**  
第3節のFG応力と[第4節の制約](#prop-holo13-ads3-constraints)から重力側のトレース異常を求め、二次元CFTの式$\langle T^i{}_i\rangle=cR_0/(24\pi)$と比較せよ。なぜ$R_0=0$の一つの背景だけでは$c$を定められないか。

- Level: B

<!-- solution-start -->
**詳細解答**：[FG応力](#prop-holo13-fg-stress)を縮約すると$-Lt/(8\pi G_3)$です。$t=-R_0/2$を代入して

$$
\langle T^i{}_i\rangle
=-\frac L{8\pi G_3}\left(-\frac{R_0}2\right)
=\frac L{16\pi G_3}R_0.
$$

異常係数を比較して$L/(16\pi G_3)=c/(24\pi)$、したがって$c=3L/(2G_3)$です。$R_0=0$だけでは両式が$0=0$となり、係数について情報がありません。曲率を持つ源への応答を比較する必要があります。
<!-- solution-end -->

<a id="ex-holo13-b4"></a>

**HOLO13-B4（断面の符号を取り違えた場合）**  
純Euclid $AdS_{d+1}$で外向き法線を誤って$n^z=+z/L$としたと仮定し、第2節の**正しい反項**を変更しないまま$K_{ij}$と$\tau^{(0)}_{ij}$を計算せよ。何が破綻するか。

- Level: B

<!-- solution-start -->
**詳細解答**：誤った法線では$K_{ij}=-\gamma_{ij}/L$、$K=-d/L$です。このため

$$
K_{ij}-K\gamma_{ij}
=\frac{d-1}{L}\gamma_{ij}.
$$

定義の同じ符号で裸応力を作ると$\tau^{\mathrm{bare}}=-(d-1)\gamma/(8\pi G_{d+1}L)$です。正しい体積反項はさらに$-(d-1)\gamma/(8\pi G_{d+1}L)$を加えるので、

$$
\tau^{(0)}_{ij}
=-\frac{2(d-1)}{8\pi G_{d+1}L}\gamma_{ij}
$$

と発散が倍残ります。UV面での「外向き」の定義を失い、GHYの変分と反項の符号の整合も壊れています。反項の符号まで恣意的に反転して見掛け上の相殺を作るのは、同じDirichlet作用の検算ではありません。
<!-- solution-end -->

### Level C：境界の曲率、制約、応答、中央電荷を統合する

<a id="ex-holo13-c1"></a>

**HOLO13-C1（一定曲率の境界源）**  
三次元純Einstein重力の滑らかな局所FG解を考え、二次元境界計量$g_{(0)}$が一定のスカラー曲率$R_0\ne0$を持つとする。局所FG係数として$g_{(2)ij}=qg_{(0)ij}$（$q$は定数）を取る。次を順に示せ。

1. [FG制約](#prop-holo13-ads3-constraints)のトレース条件から$q$を求め、運動量制約も満たすことを確かめよ。
2. [FG応力](#prop-holo13-fg-stress)の具体式と保存則、トレースを求めよ。
3. 二次元CFTのWeyl異常$\langle T^i{}_i\rangle=cR_0/(24\pi)$と比較して$c$を求めよ。$q$を自由に指定できない理由も述べよ。

- Level: C

<!-- solution-start -->
**詳細解答**：トレースは$g_{(0)}^{ij}g_{(2)ij}=qg_{(0)}^{ij}g_{(0)ij}=2q$です。従って[FG制約](#prop-holo13-ads3-constraints)は$2q=-R_0/2$、すなわち

$$
q=-\frac{R_0}{4}
$$

を要求します。$q$は定数で、$\nabla_{(0)}g_{(0)}=0$なので$\nabla_{(0)}^ig_{(2)ij}=q\nabla_{(0)}^ig_{(0)ij}=0$です。右辺の$\partial_j(2q)$も零となり、運動量制約が成立します。

次に応力の括弧を先に計算すると

$$
g_{(2)ij}-g_{(0)ij}\operatorname{tr}_0g_{(2)}
=qg_{(0)ij}-2qg_{(0)ij}
=-qg_{(0)ij}.
$$

従って

$$
\langle T_{ij}\rangle
=\frac{L R_0}{32\pi G_3}g_{(0)ij},
\qquad
\nabla_{(0)}^i\langle T_{ij}\rangle=0,
$$

$$
\langle T^i{}_i\rangle
=\frac{L R_0}{32\pi G_3}\,g_{(0)}^{ij}g_{(0)ij}
=\frac{L R_0}{16\pi G_3}.
$$

最後に$R_0\ne0$なので共通因子$R_0/\pi$を消去でき、

$$
\frac{L}{16G_3}=\frac c{24},
\qquad c=\frac{3L}{2G_3}.
$$

$q$を任意に選ぶと$2q=-R_0/2$を破り、半径方向のEinstein拘束を満たさなくなります。この演習は**局所的なFG制約**の検査であり、与えた境界多様体上での大域的な平滑充填解・鞍点の存在や一意性を主張していません。
<!-- solution-end -->

## 6. 何を得て、どこから次講に渡すか

境界計量の固定にはGHY項が必要であり、応力テンソルは境界逆計量での作用の第一変分に現れます。裸のBrown–York型テンソルは純AdSでも発散する一方、局所体積反項でこの発散を相殺できました。特に$AdS_3$ではFG級数とEinstein拘束を組み合わせて応力の有限極限・保存・曲率トレース異常を計算し、**純Einstein重力と二次元CFTの対応を仮定した上で**中央電荷$c=3L/(2G_3)$を得ました。

$d>2$の曲がった境界源、対数発散、有限scheme、さらに物質源を含むWard恒等式は、同じ体積反項だけでは処理できません。これが次講HOLO14のホログラフィック繰り込みへ進む理由です。
