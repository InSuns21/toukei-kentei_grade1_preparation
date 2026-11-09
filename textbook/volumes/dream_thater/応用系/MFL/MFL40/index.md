# MFL40 Gauge変換・moving frameと辺の輸送

<!-- definition-example-audit: strict -->

## 1. 各点の座標軸を別々に回したら何が残るか

[MFL39の正規直交フレーム変更則](../MFL39/index.md#prop-mfl39-frame-change)によれば、同じ接ベクトルでも二本の局所軸を回転すると成分は逆に回転する。例えば曲面上の二点 $p_i,p_j$ で測った風向きの成分を単純に引き算すると、軸をそれぞれ別の角度だけ回しただけで差が変わる。物理的な風を変えていないのに測定値の比較が変わってしまう。

この章では、二次元Riemann曲面の各点で選んだ正規直交フレームを **moving frame** として用い、点ごとに独立な軸の取り替えを追跡する。異なる接空間の量を比較するときには、[GEO13の平行移動](../../../幾何系/GEO/GEO13/index.md#def-geo13-parallel-transport)を使って一方の矢印を他方へ移す。その行列表現を追うと、必要な変換は片端だけでなく**辺の両端**に現れる。

学ぶ順序は次の通りである。

1. 一点の成分と、各頂点で独立に選ぶ局所軸の変換を区別する。
2. 曲線に沿って軸が変わる速さを接続行列に記録する。
3. 平行移動を辺に沿う比較のための行列で表し、両端の軸変更を検算する。
4. 往復・閉路と、誤った片側変換の診断まで計算する。

## 2. 頂点ごとに異なるゲージ

滑らかな二次元Riemann曲面 $(M,g)$ 上の有限個の点 $p_i$ を考える。それぞれの接平面 $T_{p_i}M$ に、長さ1で直交する二本の軸 $e_{i1},e_{i2}$ を選び、列を並べた $E_i=(e_{i1},e_{i2})$ と書く。$E_ic$ は実二成分列 $c$ から接ベクトルを作る写像である。[MFL39の局所正規直交フレーム](../MFL39/index.md#def-mfl39-orthonormal-frame)により、$E_i^{*}E_i=I_2$ である。ここで $E_i^{*}v$ は $v$ と二本の軸との内積を並べた列であり、$T_{p_i}M$ 上では $E_iE_i^{*}=I$ が成り立つ。

軸だけを変えるなら、各点で独立な直交行列 $R_i\in O(2)$ を選んで $\widetilde E_i=E_iR_i$ とすればよい。$O(2)$ は転置が逆行列となる実 $2\times2$ 行列の集合で、回転だけでなく鏡映も含む。これは曲面や物理的な接ベクトルを動かす操作ではない。

<a id="def-mfl40-discrete-gauge"></a>
<!-- formal-statement-start -->
> **定義（有限頂点上の局所ゲージ変更）**
> 二次元Riemann曲面 $(M,g)$ の有限点集合 $\{p_i:i\in I\}$ で、各 $T_{p_i}M$ に正規直交フレーム $E_i$ を選ぶ。任意の $R_i\in O(2)$ による $\widetilde E_i=E_iR_i$ を局所ゲージ変更とする。同じ $v_i\in T_{p_i}M$ の旧成分 $c_i=E_i^{*}v_i$ と新成分 $\widetilde c_i=\widetilde E_i^{*}v_i$ は

$$
\widetilde c_i=R_i^{\mathsf T}c_i,\qquad v_i=E_ic_i=\widetilde E_i\widetilde c_i.
$$

> $R_i$ は頂点間で同じである必要はない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl40-discrete-gauge -->
**定義の確認**：二点で逆向きの90度回転。** $R(\alpha)=\begin{pmatrix}\cos\alpha&-\sin\alpha\\\sin\alpha&\cos\alpha\end{pmatrix}$ とし、$R_i=R(\pi/2)$、$R_j=R(-\pi/2)$ を選ぶ。$R_i^{\mathsf T}R_i=R_j^{\mathsf T}R_j=I_2$ だから、$\widetilde E_i,\widetilde E_j$ はそれぞれ直交性と長さ1を保つ。例えば両点の旧成分が $c_i=c_j=(1,0)^{\mathsf T}$ でも、新成分は $\widetilde c_i=(0,-1)^{\mathsf T}$、$\widetilde c_j=(0,1)^{\mathsf T}$。実際に $E_iR_i\widetilde c_i=E_ic_i$、$E_jR_j\widetilde c_j=E_jc_j$ で各矢印は不変である。二点の旧成分が同じだからといって、二点の矢印が同じ接空間にあるわけではない。
<!-- definition-example-end -->

任意の $i$ で新フレームの直交性は $(E_iR_i)^*(E_iR_i)=R_i^{\mathsf T}R_i=I_2$ と検算できる。逆に $E_i c_i=E_iR_i\widetilde c_i$ に $E_i^*$ を作用させれば $c_i=R_i\widetilde c_i$、したがって定義の成分変換則になる。これが以降の行列の左右を決める基準である。

## 3. moving frameの回転率を接続行列に記録する

二点を比べる前に、一つの滑らかな曲線 $\gamma:[a,b]\to M$ に沿って軸を連続的に動かす。曲線上の正規直交フレーム $E(t)=(e_1(t),e_2(t))$ と、滑らかな接ベクトル場 $V(t)=E(t)c(t)$ を選ぶ。[GEO13の曲線に沿う共変微分](../../../幾何系/GEO/GEO13/index.md#def-geo13-curve-covariant-derivative)をそれぞれの軸に作用させると、軸自身の接平面内の回転率が二行二列の数表になる。

<a id="def-mfl40-connection-matrix"></a>
<!-- formal-statement-start -->
> **定義（moving frameの接続行列）**
> $(M,g)$ を二次元Riemann多様体とし、$\nabla$ をそのLevi-Civita接続、$\gamma:[a,b]\to M$ を滑らかな曲線、$E(t)=(e_1(t),e_2(t))$ を曲線に沿う滑らかな正規直交フレームとする。行列 $A(t)$ の第 $b$ 列を $\nabla_{\dot\gamma}e_b$ の $E$ 成分として

$$
A_{ab}(t)=g_{\gamma(t)}(e_a(t),\nabla_{\dot\gamma}e_b(t))
$$

> で定める。$A$ をこの moving frame の接続行列とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl40-connection-matrix -->
**定義の確認**：球面の緯線。** [MFL39の球面緯線の計算](../MFL39/index.md#prop-mfl39-sphere-connection)では、余緯度 $\theta_0\in(0,\pi)$ を固定して経度 $t$ を動かすと $\nabla_{\dot\gamma}e_\theta=k e_\varphi$、$\nabla_{\dot\gamma}e_\varphi=-k e_\theta$、$k=\cos\theta_0$ である。したがって列ごとに内積を取れば

$$
A=\begin{pmatrix}0&-k\\k&0\end{pmatrix}=kJ,\qquad
J=\begin{pmatrix}0&-1\\1&0\end{pmatrix}.
$$

対角は $g(e_a,\nabla e_a)=0$、非対角は反対符号なので、この行列は正規直交軸が回る速さを表し、長さを変える行列ではない。$\theta_0=\pi/2$ では $k=0$ となる。
<!-- definition-example-end -->

<a id="thm-mfl40-connection-gauge"></a>
<!-- formal-statement-start -->
> **定理（接続と共変微分のゲージ変換則）**
> 二次元Riemann多様体の滑らかな曲線 $\gamma:[a,b]\to M$ に沿う正規直交フレーム $E$ の接続行列を $A$ とする。滑らかな $R:[a,b]\to O(2)$ に対して $\widetilde E=ER$、$V=Ec=\widetilde E\widetilde c$ とする。$t$ 微分を上点で表すと

$$
A^{\mathsf T}=-A,\qquad
\widetilde A=R^{\mathsf T}AR+R^{\mathsf T}\dot R,
$$

$$
\widetilde c=R^{\mathsf T}c,\qquad
\dot{\widetilde c}+\widetilde A\widetilde c
=R^{\mathsf T}(\dot c+Ac).
$$

> 特に $\nabla_{\dot\gamma}V=0$ の条件はフレーム変更で不変である。
<!-- formal-statement-end -->

### 証明の見取り図

フレームの各列を共変微分して積の微分を行う。二つの軸の内積が一定だから $A$ は歪対称となり、新フレームの微分には旧接続の回転と $R$ 自身の回転が足される。成分側を逆回転すると、余計な $\dot R$ の項が相殺される。

<!-- proof-start -->
### 証明

$g(e_a,e_b)=\delta_{ab}$ を曲線に沿って微分する。Levi-Civita接続の[計量両立性](../../../幾何系/GEO/GEO13/index.md#def-geo13-metric-compatibility)より

$$
0=\frac{d}{dt}g(e_a,e_b)
=g(\nabla_{\dot\gamma}e_a,e_b)+g(e_a,\nabla_{\dot\gamma}e_b)
=A_{ba}+A_{ab}.
$$

接平面の二本が基底だから $\nabla_{\dot\gamma}E=EA$。同様に $\nabla_{\dot\gamma}(Ec)=E(\dot c+Ac)$ である。$\widetilde E=ER$ の第 $b$ 列へ積の微分を使うと

$$
\nabla_{\dot\gamma}(ER)=E(AR+\dot R)
=ER\bigl(R^{\mathsf T}AR+R^{\mathsf T}\dot R\bigr).
$$

したがって括弧内が新しい接続行列となる。$R^{\mathsf T}R=I$ を微分すると $\dot R^{\mathsf T}R=-R^{\mathsf T}\dot R$。これと $\widetilde c=R^{\mathsf T}c$ を使い

$$
\begin{aligned}
\dot{\widetilde c}+\widetilde A\widetilde c
&=\dot R^{\mathsf T}c+R^{\mathsf T}\dot c
 +R^{\mathsf T}AR R^{\mathsf T}c+R^{\mathsf T}\dot R R^{\mathsf T}c\\
&=R^{\mathsf T}(\dot c+Ac)
 +(\dot R^{\mathsf T}+R^{\mathsf T}\dot R R^{\mathsf T})c\\
&=R^{\mathsf T}(\dot c+Ac).
\end{aligned}
$$

$\nabla_{\dot\gamma}V=E(\dot c+Ac)$ であり、$E$ は各時刻で一次独立だから、このベクトルが零であることは $\dot c+Ac=0$ と同値。$R^{\mathsf T}$ は可逆なので新成分でも同値である。$\square$
<!-- proof-end -->

**回転する軸の具体例。** 平面上で $A=0$ となる固定フレームを使い、$R(t)=R(\omega t)$ に替えると $\dot R=\omega R J$、$\widetilde A=\omega J$。幾何学的には一定の $V=E(1,0)^{\mathsf T}$ でも新成分は $\widetilde c=R(-\omega t)(1,0)^{\mathsf T}$ だから $\dot{\widetilde c}=-\omega J\widetilde c$。普通の成分微分だけでは非零となるが、$\dot{\widetilde c}+\widetilde A\widetilde c=0$。これは曲面の幾何が変化したという意味ではなく、座標軸の回転による項である。

## 4. 辺に沿う平行移動には二つの端点がある

曲線 $\gamma_{ij}$ の始点を $p_j$、終点を $p_i$ とする。[GEO13の平行移動の存在一意性](../../../幾何系/GEO/GEO13/index.md#thm-geo13-parallel-existence)により、始点の接ベクトルを終点まで平行に動かす線形写像 $P_{i\leftarrow j}:T_{p_j}M\to T_{p_i}M$ が得られる。Levi-Civita接続による平行移動は内積を保つので、両端の正規直交フレームで行列表現できる。ただし、どの曲線をたどるかは指定しなければならない。同じ二点でも異なる経路なら結果が異なりうる。

<a id="def-mfl40-edge-transport"></a>
<!-- formal-statement-start -->
> **定義（辺の輸送行列）**
> $(M,g)$ を二次元Riemann多様体、$p_j,p_i\in M$、$\gamma_{ij}$ を $p_j$ から $p_i$ への滑らかな区分的曲線とする。$P_{i\leftarrow j}$ をLevi-Civita平行移動とし、端点の正規直交フレームを $E_j,E_i$ とする。輸送行列を

$$
T_{ij}=E_i^{*}P_{i\leftarrow j}E_j\in\mathbb R^{2\times2}
$$

> で定める。$T_{ij}$ の第 $b$ 列は、出発点の第 $b$ 軸を平行移動したベクトルの、到着点での二成分である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl40-edge-transport -->
**定義の確認**：球面緯線の一辺。** $\theta_0=\pi/3$ とし、[MFL39の球面フレーム](../MFL39/index.md#prop-mfl39-sphere-frame)を $p_j=p(\theta_0,0)$ から $p_i=p(\theta_0,\pi/2)$ まで緯線に沿って使う。接続行列は $A=\tfrac12J$。平行条件 $\dot c=-Ac$ を初期値 $c(0)=u$ で解けば

$$
c(t)=R(-t/2)u,\qquad
T_{ij}=R(-\pi/4)=\frac1{\sqrt2}\begin{pmatrix}1&1\\-1&1\end{pmatrix}.
$$

実際に二つの基底ベクトルを運んだ到着成分はこの行列の第1列と第2列である。各列の長さは1、内積は0なので $T_{ij}^{\mathsf T}T_{ij}=I_2$。これは**緯線に沿う**輸送であって、同じ端点間の測地線に沿う輸送と無条件に同じとは言えない。
<!-- definition-example-end -->

<a id="thm-mfl40-transport-gauge"></a>
<!-- formal-statement-start -->
> **定理（辺輸送の両端ゲージ変換則）**
> 二次元Riemann多様体の指定された曲線 $\gamma_{ij}:p_j\to p_i$ に沿うLevi-Civita平行移動 $P_{i\leftarrow j}$ と両端の正規直交フレーム $E_j,E_i$ から作った $T_{ij}$ について、$T_{ij}\in O(2)$ である。フレームを独立に $\widetilde E_i=E_iR_i$、$\widetilde E_j=E_jR_j$ ($R_i,R_j\in O(2)$) と取り替えると

$$
\widetilde T_{ij}=R_i^{\mathsf T}T_{ij}R_j.
$$

> 任意の $c_j\in\mathbb R^2$ に対して、輸送後の成分は

$$
\widetilde T_{ij}\widetilde c_j=R_i^{\mathsf T}(T_{ij}c_j),
\qquad \widetilde c_j=R_j^{\mathsf T}c_j.
$$

> なお $P$ と $T$ は、経路・接続を変えずにフレーム表示のみを替えている。
<!-- formal-statement-end -->

### 証明の見取り図

まず輸送が二本の内積を保存するので列が直交単位となる。新しい行列の第 $b$ 列は「新しい出発軸を運び、新しい到着軸で測る」から、出発側に $R_j$、到着側に $R_i^{\mathsf T}$ が掛かる。

<!-- proof-start -->
### 証明

任意の $u,v\in\mathbb R^2$ について $E_ju,E_jv$ は出発点の接ベクトルである。[GEO13の計量両立平行移動の内積保存](../../../幾何系/GEO/GEO13/index.md#prop-geo13-parallel-isometry)を適用すると

$$
\begin{aligned}
\langle T_{ij}u,T_{ij}v\rangle_{\mathbb R^2}
&=g_{p_i}(P_{i\leftarrow j}E_ju,P_{i\leftarrow j}E_jv)\\
&=g_{p_j}(E_ju,E_jv)=u^{\mathsf T}v.
\end{aligned}
$$

最初の等号には $E_i$ が正規直交基底であることを使う。すべての $u,v$ で成り立つので $T_{ij}^{\mathsf T}T_{ij}=I_2$。新しい端点フレームで定義式をそのまま展開すると

$$
\begin{aligned}
\widetilde T_{ij}
&=(E_iR_i)^{*}P_{i\leftarrow j}(E_jR_j)\\
&=R_i^{\mathsf T}(E_i^{*}P_{i\leftarrow j}E_j)R_j
=R_i^{\mathsf T}T_{ij}R_j.
\end{aligned}
$$

そして $\widetilde c_j=R_j^{\mathsf T}c_j$ を代入すれば

$$
\widetilde T_{ij}\widetilde c_j
=R_i^{\mathsf T}T_{ij}R_jR_j^{\mathsf T}c_j
=R_i^{\mathsf T}T_{ij}c_j.
$$

到着点の新成分への変換と一致する。$\square$
<!-- proof-end -->

**両端を90度ずつ逆に回す数値例。** 上の緯線の $T_{ij}=R(-\pi/4)$、$R_i=R(\pi/2)$、$R_j=R(-\pi/2)$、$c_j=(1,0)^{\mathsf T}$ とする。旧到着成分は $T_{ij}c_j=(1,-1)^{\mathsf T}/\sqrt2$。新出発成分は $\widetilde c_j=(0,1)^{\mathsf T}$、新しい行列は

$$
\widetilde T_{ij}=R(-\pi/2)R(-\pi/4)R(-\pi/2)=R(-5\pi/4).
$$

したがって $\widetilde T_{ij}(0,1)^{\mathsf T}=(-1,-1)^{\mathsf T}/\sqrt2$ であり、$R_i^{\mathsf T}(1,-1)^{\mathsf T}/\sqrt2$ と一致する。一方、出発側 $R_j$ を忘れて $T_{ij}^{\mathrm{bad}}=R_i^{\mathsf T}T_{ij}$ とすると、新成分を掛けた結果は $(1,-1)^{\mathsf T}/\sqrt2$ で、正しい結果との差のEuclid長は $\sqrt2$ となる。**両端変換は表記の整合条件**であり、実験での小さな誤差の問題ではない。

## 5. 逆向きの辺・複数辺・閉路

一辺を戻るときは、その辺を逆向きにたどる曲線を使う。$j\to i$ の次に $i\to k$ を進むときは、中間点 $i$ の成分を揃えて行列を左から掛ける。これによって経路をたどる順番を添字から読める。

<a id="prop-mfl40-path-composition"></a>
<!-- formal-statement-start -->
> **命題（輸送の逆・合成・閉路の共役変換）**
> 二次元Riemann多様体の有限個の点と、指定された向き付き区分的曲線について、Levi-Civita平行移動の行列表現を $T_{ij}$（$j$ から $i$）とする。逆向きは同じ曲線の逆走とし、連続する辺 $k\to j\to i$ は曲線の連結とする。このとき

$$
T_{ji}=T_{ij}^{\mathsf T},\qquad T_{i\leftarrow k}^{(k\to j\to i)}=T_{ij}T_{jk}.
$$

> 閉路 $i\to k\to j\to i$ の輸送を $H_i=T_{ij}T_{jk}T_{ki}$ と置く。各頂点で独立に $R_\ell\in O(2)$ のゲージ変更を行えば

$$
\widetilde H_i=R_i^{\mathsf T}H_iR_i,
\qquad \operatorname{tr}(\widetilde H_i)=\operatorname{tr}(H_i),
\quad \det\widetilde H_i=\det H_i.
$$

> $H_i$ の個々の行列成分は一般に不変とは限らない。
<!-- formal-statement-end -->

### 証明の見取り図

逆の曲線の平行移動は元の逆写像であり、長さ保存から逆行列は転置になる。合成は途中の正規直交基底の復元 $E_jE_j^*=I$ を挟む。閉路では中間の $R_jR_j^{\mathsf T}$ が順に消え、出発点の軸変更だけが共役として残る。

<!-- proof-start -->
### 証明

[GEO13の平行移動の存在一意性](../../../幾何系/GEO/GEO13/index.md#thm-geo13-parallel-existence)から曲線を戻る平行移動は $P_{j\leftarrow i}=P_{i\leftarrow j}^{-1}$。一方、前定理より $T_{ij}\in O(2)$ だから $T_{ij}^{-1}=T_{ij}^{\mathsf T}$。出発と到着を入れ替えて行列表現したものが $T_{ji}$ である。

二辺の連結に沿う写像は $P_{i\leftarrow j}P_{j\leftarrow k}$ であり、その行列は

$$
\begin{aligned}
E_i^*P_{i\leftarrow j}P_{j\leftarrow k}E_k
&=E_i^*P_{i\leftarrow j}(E_jE_j^*)P_{j\leftarrow k}E_k\\
&=(E_i^*P_{i\leftarrow j}E_j)(E_j^*P_{j\leftarrow k}E_k)
=T_{ij}T_{jk}.
\end{aligned}
$$

閉路の各因子に[辺輸送の変換則](#thm-mfl40-transport-gauge)を使えば

$$
\begin{aligned}
\widetilde H_i
&=(R_i^{\mathsf T}T_{ij}R_j)(R_j^{\mathsf T}T_{jk}R_k)
  (R_k^{\mathsf T}T_{ki}R_i)\\
&=R_i^{\mathsf T}(T_{ij}T_{jk}T_{ki})R_i.
\end{aligned}
$$

行列の跡は $\operatorname{tr}(AB)=\operatorname{tr}(BA)$ を使うと $\operatorname{tr}(R_i^{\mathsf T}H_iR_i)=\operatorname{tr}(H_iR_iR_i^{\mathsf T})=\operatorname{tr}(H_i)$。行列式も $\det R_i^{\mathsf T}\det R_i=1$ より不変となる。$\square$
<!-- proof-end -->

**有限模型。** 三つの辺輸送を $T_{ij}=R(\pi/6)$、$T_{jk}=R(\pi/6)$、$T_{ki}=R(\pi/6)$ と指定した直交行列の模型なら $H_i=R(\pi/2)$、$\operatorname{tr}H_i=0$ となる。これは代数的な閉路検算用の模型であり、任意に指定した輸送行列がある滑らかな曲面のLevi-Civita輸送を実現するとは限らない。実際の曲面では曲線と接続を指定して初めて輸送が確定する。また閉路の値だけから、辺の離散化誤差と幾何学的な曲率を区別したことにもならない。

## 6. 決定論的な計算ラボ

単位球面の緯線（余緯度 $\theta$、経度差 $\delta$）を固定する。各端点の回転角 $\alpha_i,\alpha_j$ と、必要なら軸反射を変え、$T_{ij}=R(-\delta\cos\theta)$ の両端変換を検算する。到着成分の正しい変換と片側だけの誤実装の差を別々に報告する。閉路は別の有限直交行列模型で検算する。乱数は使わず、回転角はラジアンで与える。

~~~python
# lab-file: textbook/volumes/dream_thater/応用系/MFL/MFL40/gauge_transport_lab.py
# timeout-ms: 60000
# lab-preset: 球面緯線・独立90度変更 | --theta 1.0471975511965976 --delta 1.5707963267948966 --alpha-i 1.5707963267948966 --alpha-j -1.5707963267948966
# lab-preset: 反射を含む二端点変更 | --theta 0.8 --delta 1.1 --alpha-i 0.7 --alpha-j -0.4 --reflect-i --reflect-j
# lab-preset: 赤道では恒等輸送 | --theta 1.5707963267948966 --delta 1.2 --alpha-i 0.2 --alpha-j 1.0
~~~

`--self-test` では余緯度・経度差・独立な軸回転・鏡映の組合せを全列挙する。恒等式の誤差は浮動小数点の丸めに由来する。経度差を小さくしたときの輸送の変化は別の幾何学的量であり、ゲージ等変残差と混同しない。

## 7. 演習

### Level A：両端の意味を固定する

<a id="ex-mfl40-a01"></a>
### MFL40-A01 独立なフレーム回転
- Level: A
- 問題: 二点の正規直交フレーム $E_i,E_j$ を、それぞれ $R_i=R(\pi/2)$、$R_j=R(-\pi/2)$ で変更する。旧成分を $c_i=(2,1)^{\mathsf T}$、$c_j=(1,-1)^{\mathsf T}$ とするとき、新成分を求め、旧・新のベクトル表示が各点で一致することを示せ。

<a id="ex-mfl40-a02"></a>
### MFL40-A02 接続行列の歪対称性
- Level: A
- 問題: Riemann曲面上の曲線に沿う正規直交フレーム $e_1,e_2$ に対し $A_{ab}=g(e_a,\nabla_{\dot\gamma}e_b)$ とする。Levi-Civita接続が計量と両立するとき $A_{11}=A_{22}=0$、$A_{12}=-A_{21}$ を定義から導け。

<a id="ex-mfl40-a03"></a>
### MFL40-A03 平らな面で回る軸
- Level: A
- 問題: Euclid平面の固定直交フレームで $A=0$ とする。新フレーム $ER(t)$、$R(t)=R(2t)$ の接続行列を求め、旧成分 $c=(1,0)^{\mathsf T}$ の平行場が新フレームでも平行であることを確認せよ。

<a id="ex-mfl40-a04"></a>
### MFL40-A04 辺の二列
- Level: A
- 問題: $T=R(-\pi/2)$ を、曲面上の指定した辺輸送の両端正規直交フレーム表示とする。出発点の二本の基底を運んだ到着成分を列ごとに答え、$T^{\mathsf T}T=I_2$ と逆辺の行列を求めよ。

### Level B：局所回転・辺の接続・失敗例を検算する

<a id="ex-mfl40-b01"></a>
### MFL40-B01 両端変換と片側欠落
- Level: B
- 問題: 一辺の旧輸送を $T=I_2$、端点の変更を $R_i=R(\pi/2)$、$R_j=I_2$、出発成分を $c_j=(1,0)^{\mathsf T}$ とする。(1) 正しい新輸送と到着成分、(2) 出発側だけ変換した $T^{\mathrm{bad}}=TR_j$ の出力と正しい出力との差の長さを求めよ。

<a id="ex-mfl40-b02"></a>
### MFL40-B02 接続の変換則を回転角で示す
- Level: B
- 問題: 曲線に沿う旧接続が $A=k(t)J$、新フレームが $ER(\alpha(t))$ であるとする。$\widetilde A$ を導き、$c$ が $\dot c+kJc=0$ を満たすなら $\widetilde c=R(-\alpha)c$ が新しい平行条件を満たすことを計算で確認せよ。

<a id="ex-mfl40-b03"></a>
### MFL40-B03 球面緯線と二端点の反転
- Level: B
- 問題: 単位球面の余緯度 $\theta_0=\pi/3$、経度 $0$ から $\pi/2$ への緯線に沿い、$T=R(-\pi/4)$ とする。$R_i=R(\pi/2)$、$R_j=R(-\pi/2)$、$c_j=(1,0)^{\mathsf T}$ を用いて $\widetilde T\widetilde c_j$ と $R_i^{\mathsf T}Tc_j$ を別々に計算し、一致を示せ。$R_j$ を欠いた輸送の出力との差も求めよ。

<a id="ex-mfl40-b04"></a>
### MFL40-B04 閉路の行列はどこまで不変か
- Level: B
- 問題: 三角閉路の離散直交輸送を $T_{ij}=R(\pi/6)$、$T_{jk}=R(\pi/6)$、$T_{ki}=R(\pi/6)$ とする。$H_i$ とその跡・行列式を求める。さらに $R_i=\operatorname{diag}(1,-1)$ で始点フレームを鏡映したとき $\widetilde H_i$ を計算し、行列自体の変化と二つの不変量を比べよ。

### Level C：点・曲線・フレームを同時に追う

<a id="ex-mfl40-c01"></a>
### MFL40-C01 moving frameから閉路まで
- Level: C
- 問題: 単位球面の余緯度 $\theta_0=\pi/3$ の緯線で、経度 $0$ の点を $p_j$、経度 $\pi/2$ の点を $p_i$ とする。基準フレームは $(e_\theta,e_\varphi)$、始点旧成分は $c_j=(1,0)^{\mathsf T}$ である。
  1. 接続行列と、平行方程式を初期値から解いた $T_{ij}$ を求めよ。
  2. $R_i=R(\pi/2),R_j=R(-\pi/2)$ の下で新輸送行列と新出発・到着成分を求め、矢印の一致を確認せよ。
  3. 同じ緯線を逆にたどる行列 $T_{ji}$ と往復の輸送を求め、両端の変更後にも往復が恒等となることを示せ。
  4. この往復の結論を、別の道を通る閉路一般に拡張できない理由を、経路という仮定に着目して説明せよ。

## 8. 詳細解答

### Level A

<!-- solution-start -->
**MFL40-A01。** $R(\pi/2)=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$、$R(-\pi/2)=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ なので

$$
\widetilde c_i=R(-\pi/2)(2,1)^{\mathsf T}=(1,-2)^{\mathsf T},\qquad
\widetilde c_j=R(\pi/2)(1,-1)^{\mathsf T}=(1,1)^{\mathsf T}.
$$

$R_i\widetilde c_i=(2,1)^{\mathsf T}$、$R_j\widetilde c_j=(1,-1)^{\mathsf T}$ だから $E_iR_i\widetilde c_i=E_ic_i$、$E_jR_j\widetilde c_j=E_jc_j$。両方で長さはそれぞれ $\sqrt5,\sqrt2$ と保存される。

**MFL40-A02。** $g(e_a,e_b)=\delta_{ab}$ を曲線方向に微分し、[計量両立性](../../../幾何系/GEO/GEO13/index.md#def-geo13-metric-compatibility)を使うと $0=g(\nabla e_a,e_b)+g(e_a,\nabla e_b)=A_{ba}+A_{ab}$。$a=b=1,2$ なら $2A_{aa}=0$、$a=1,b=2$ なら $A_{12}=-A_{21}$。よって $A$ は歪対称である。

**MFL40-A03。** $\dot R(t)=2R(t)J$、$A=0$ を[変換則](#thm-mfl40-connection-gauge)に入れると $\widetilde A=R^{\mathsf T}\dot R=2J$。旧成分 $c$ は一定、新成分は $\widetilde c=R(-2t)(1,0)^{\mathsf T}=(\cos2t,-\sin2t)^{\mathsf T}$。微分は $\dot{\widetilde c}=(-2\sin2t,-2\cos2t)^{\mathsf T}=-2J\widetilde c$ だから $\dot{\widetilde c}+\widetilde A\widetilde c=0$。

**MFL40-A04。** $R(-\pi/2)=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ の第1列 $(0,-1)^{\mathsf T}$ が旧第1軸の輸送先、第2列 $(1,0)^{\mathsf T}$ が旧第2軸の輸送先の成分である。二列は単位・直交なので $T^{\mathsf T}T=\begin{pmatrix}1&0\\0&1\end{pmatrix}$。同じ曲線を逆走すると[逆輸送](#prop-mfl40-path-composition)は $T_{ji}=T^{\mathsf T}=R(\pi/2)$。
<!-- solution-end -->

### Level B

<!-- solution-start -->
**MFL40-B01。** [両端変換則](#thm-mfl40-transport-gauge)より $\widetilde T=R_i^{\mathsf T}IR_j=R(-\pi/2)$。$\widetilde c_j=R_j^{\mathsf T}c_j=(1,0)^{\mathsf T}$。よって新到着成分は $(0,-1)^{\mathsf T}$、これは $R_i^{\mathsf T}Tc_j$ と一致する。誤った $T^{\mathrm{bad}}=TR_j=I_2$ は $(1,0)^{\mathsf T}$ を返し、差 $(1,1)^{\mathsf T}$ の長さは $\sqrt2$。この問題では欠けたのは到着側の逆回転である。

**MFL40-B02。** 二次元回転は $J$ と可換で $\dot R(\alpha)=\dot\alpha R(\alpha)J$。したがって

$$
\widetilde A=R(-\alpha)kJR(\alpha)+R(-\alpha)\dot R(\alpha)
=kJ+\dot\alpha J=(k+\dot\alpha)J.
$$

$\widetilde c=R(-\alpha)c$ の微分を連鎖律で求めると $\dot{\widetilde c}=-\dot\alpha J R(-\alpha)c+R(-\alpha)\dot c$。$\dot c=-kJc$ を代入し $J$ の可換性を使えば $\dot{\widetilde c}=-(\dot\alpha+k)J\widetilde c$。よって新しい平行方程式を満たす。

**MFL40-B03。** $R_i^{\mathsf T}=R(-\pi/2)$、$R_j=R(-\pi/2)$ なので

$$
\widetilde T=R(-\pi/2)R(-\pi/4)R(-\pi/2)=R(-5\pi/4),
\quad \widetilde c_j=R(\pi/2)(1,0)^{\mathsf T}=(0,1)^{\mathsf T}.
$$

したがって $\widetilde T\widetilde c_j=(-1,-1)^{\mathsf T}/\sqrt2$。旧到着成分は $Tc_j=(1,-1)^{\mathsf T}/\sqrt2$、これへ $R(-\pi/2)$ を掛けても $(-1,-1)^{\mathsf T}/\sqrt2$。出発側 $R_j$ を欠くと $R(-3\pi/4)(0,1)^{\mathsf T}=(1,-1)^{\mathsf T}/\sqrt2$ となり、差は $(\sqrt2,0)^{\mathsf T}$、長さ $\sqrt2$。

**MFL40-B04。** 同一方向の回転の積は角度を足すので $H_i=R(\pi/2)=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$。$\operatorname{tr}H_i=0$、$\det H_i=1$。$S=\operatorname{diag}(1,-1)$ は $S^{\mathsf T}=S=S^{-1}$ だから

$$
\widetilde H_i=S^{\mathsf T}H_iS
=\begin{pmatrix}0&1\\-1&0\end{pmatrix}=R(-\pi/2).
$$

行列の非対角成分は符号が変わるが、跡は0、行列式は1のままである。二つの不変量を使う場合も経路を固定する必要がある。
<!-- solution-end -->

### Level C

<!-- solution-start -->
**MFL40-C01。** (1) [緯線の接続項](../MFL39/index.md#prop-mfl39-sphere-connection)で $k=\cos(\pi/3)=1/2$、$A=\tfrac12J$。平行方程式は $\dot c=-\tfrac12Jc$。初期値 $(1,0)$ に対し $c(t)=(\cos(t/2),-\sin(t/2))^{\mathsf T}$ を微分すると $\dot c=(-\tfrac12\sin(t/2),-\tfrac12\cos(t/2))^{\mathsf T}=-\tfrac12Jc$。二つの基底の初期値を列に並べれば $T_{ij}=R(-\pi/4)$。

(2) $\widetilde T_{ij}=R_i^{\mathsf T}T_{ij}R_j=R(-5\pi/4)$、$\widetilde c_j=R_j^{\mathsf T}c_j=(0,1)^{\mathsf T}$。したがって $\widetilde T_{ij}\widetilde c_j=(-1,-1)^{\mathsf T}/\sqrt2$。旧到着成分は $(1,-1)^{\mathsf T}/\sqrt2$ であり、$R_i^{\mathsf T}$ を掛けて同じ新到着成分を得る。両端で $\widetilde E_\ell\widetilde c_\ell=E_\ell R_\ell R_\ell^{\mathsf T}c_\ell=E_\ell c_\ell$ だから、同じ接ベクトルを表示している。

(3) 逆走による $T_{ji}=T_{ij}^{\mathsf T}=R(\pi/4)$。往復の行列は $T_{ji}T_{ij}=R(\pi/4)R(-\pi/4)=I_2$。変更後も $\widetilde T_{ji}\widetilde T_{ij}=(R_j^{\mathsf T}T_{ji}R_i)(R_i^{\mathsf T}T_{ij}R_j)=R_j^{\mathsf T}IR_j=I_2$。

(4) (3) は**同じ曲線を逆にたどる**ことを使って、二つの平行移動が逆写像となることを証明した。別経路を選んだ閉路なら後半の写像は前半の逆とは限らない。その閉路輸送 $H$ が恒等であると、この計算だけからは言えない。経路と曲面の幾何を指定して別途計算する必要がある。
<!-- solution-end -->

## 9. まとめと次への問い

- 一点でのフレーム変更 $\widetilde E_i=E_iR_i$ に対し、同じ矢印の成分は $\widetilde c_i=R_i^{\mathsf T}c_i$ となる。
- moving frame の接続行列は $\widetilde A=R^{\mathsf T}AR+R^{\mathsf T}\dot R$。通常微分に接続項を加えると、共変微分は正しく成分変換する。
- 固定経路に沿う辺輸送の行列は $\widetilde T_{ij}=R_i^{\mathsf T}T_{ij}R_j$。両端のどちらかを忘れると同じ幾何ベクトルを比較できなくなる。
- 逆走・経路合成・閉路共役は輸送行列の整合検査になる。ただし有限行列のゲージ整合性だけでは、連続曲面への近似精度や学習性能は保証されない。

次のMFL41では、この辺輸送を複数近傍の特徴集約に組み込み、ゲージ変更の下でも出力型を保つ層を構成する。
