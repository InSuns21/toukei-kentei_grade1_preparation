# QFT46 非摂動ゲージ場の格子・インスタントン・トポロジカル電荷とθ項

[QFT41の走る強結合](../QFT41/index.md#def-qft41-running-alpha)を低いエネルギーへ外挿すると摂動展開は制御を失います。[QFT42の有限格子Wilsonループ](../QFT42/index.md#def-qft42-wilson-loop)は展開を別の方向から始める道具でした。しかし、有限格子の級数や一つの滑らかな古典解から、連続四次元QCDの閉じ込めを証明できるのでしょうか。

本章では、**厳密に手計算できる有限格子**と、**滑らかな四次元Euclidゲージ場**を分けます。前者では二次元 $U(1)$ の整数電荷を構成し、後者では $SU(2)$ のインスタントンの作用を計算します。その後、整数セクターに与える $\theta$ の位相を調べます。二つの模型を同一視することも、非摂動的な連続極限の存在を既知とすることもしません。

実時間での計量は $\eta=(-,+,+,+)$ とし、[QFT28のYang–Mills曲率](../QFT28/index.md#def-qft28-curvature)をEuclid場へ移した後は正定値の $\delta_{\mu\nu}$ を用います。Euclidの添字は $\mu,\nu=1,2,3,4$、向きは $\varepsilon_{1234}=+1$ です。生成子はHermitianで $\operatorname{tr}(T^aT^b)=\delta^{ab}/2$ とし、結合を吸収したポテンシャル $B_\mu=gA_\mu$ を使います。したがって

$$
\mathcal F_{\mu\nu}=\partial_\mu B_\nu-\partial_\nu B_\mu-i[B_\mu,B_\nu],
\qquad S_E=\frac1{4g^2}\int d^4x\,\mathcal F_{\mu\nu}^a\mathcal F_{\mu\nu}^a .
$$

これは[実時間の作用](../QFT28/index.md#def-qft28-yang-mills-action)を単に同じ符号で使ったものではありません。Euclid作用は正符号で、$B_\mu=gA_\mu$ により結合は作用の前へ出ました。

## 1. 格子のリンクから連続曲率は見えるか

滑らかな連続場の微分は、格子では隣接点を結ぶ並行移動の積へ置き換わります。リンクの向きとゲージ変換は[QFT42のWilsonループ](../QFT42/index.md#def-qft42-wilson-loop)で導入済みです。ここでは $SU(3)$ を一般の $SU(N)$ に広げ、plaquette一枚の小さい格子間隔 $a$ での展開を調べます。

正方向リンク $U_\mu(x)$ は $x+a\hat\mu$ の色ベクトルを $x$ へ運ぶ行列です。反方向には逆行列を用い、正方向へ右、上、左、下の順に回ると

$$
U_{\mu\nu}(x)=U_\mu(x)U_\nu(x+a\hat\mu)
U_\mu(x+a\hat\nu)^{-1}U_\nu(x)^{-1}
$$

を得ます。これは閉路であるため、[Wilsonループのゲージ不変性](../QFT42/index.md#prop-qft42-wilson-invariant)をそのまま適用できます。

<a id="def-qft46-lattice-continuum"></a>

<!-- formal-statement-start -->
> **定義（格子plaquetteとWilson作用の連続接続）**
> 四次元の有限正方格子、$N\ge2$、$g>0$、$a>0$ を固定し、各独立リンクに $U_\mu(x)\in SU(N)$ を割り当てる。plaquetteを上の順序積で定め、独立な各向き $\mu<\nu$ に一枚ずつ数える。正規化されたWilson作用は

$$
S_W=\frac{2N}{g^2}\sum_{x,\mu<\nu}
\left(1-\frac1N\operatorname{Re}\operatorname{tr}U_{\mu\nu}(x)\right).
$$

> 滑らかな $B_\mu(x)=B_\mu^a(x)T^a$ からの接続には、リンク中点で $U_\mu(x)=\exp[-iaB_\mu(x+a\hat\mu/2)]$ を用いる。$B$ とその必要な導関数が有界な領域で $a\to0$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft46-lattice-continuum -->
### 例：一枚の $SU(2)$ plaquette

**定義の確認**：四辺の三本を単位行列にし、残る一本を $U=\exp(-ia^2fT^3)$、$T^3=\operatorname{diag}(1,-1)/2$ とします。$U$ はユニタリで行列式1、反方向は $U^{-1}$ です。閉路の積は $U$、したがって

$$
\operatorname{tr}U=2\cos\frac{a^2f}{2},\qquad
1-\frac12\operatorname{Re}\operatorname{tr}U
=1-\cos\frac{a^2f}{2}
=\frac{a^4f^2}{8}+O(a^8).
$$

$SU(2)$ の係数 $2N/g^2=4/g^2$ を掛けると一枚の作用は $a^4f^2/(2g^2)+O(a^8)$。$F_{12}^3=f$ だけを持つ連続場の一セル分と一致します。この例で $U$ の面積指数を選んだのは局所の係数確認のためであり、四辺を独立に動かして連続場を厳密に再構成したという意味ではありません。
<!-- definition-example-end -->

<a id="prop-qft46-continuum-expansion"></a>

<!-- formal-statement-start -->
> **命題（Wilson作用の滑らかな連続場展開）**
> 四次元Euclidの有界領域で滑らかな $SU(N)$ ポテンシャル $B_\mu$ と有界な必要階の導関数を取り、境界で周期条件または局所セル内部の比較を用いる。上の中点リンクを採用すると、各plaquetteについて

$$
U_{\mu\nu}(x)=\exp[-ia^2\mathcal F_{\mu\nu}(x)+O(a^3)],
$$

> よって各セルのWilson作用は次の連続Euclid作用密度に一致する先頭項を持つ。

$$
S_W=\sum_x a^4\frac1{4g^2}
\sum_{\mu,\nu,a}(\mathcal F_{\mu\nu}^a(x))^2+O(a)
$$

> ただし固定物理体積で $a\to0$ としたときの形式的な滑らかな古典場の評価であり、量子経路積分や格子ゲージ理論の連続極限の存在を主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

四辺の指数を $a$ の二次まで展開すると、一次項が打ち消し合い、微分の差と非可換な交換子が残ります。生成子の跡を取れば作用の係数が決まります。

<!-- proof-start -->
### 証明

リンクの中点の違いは二次までの計算では端点値のTaylor展開で扱えます。例えば $B_\nu(x+a\hat\mu)=B_\nu(x)+a\partial_\mu B_\nu(x)+O(a^2)$ です。四つの指数を掛けると、$O(a)$ は $-iaB_\mu-iaB_\nu+iaB_\mu+iaB_\nu=0$。$O(a^2)$ では移動した二辺から微分差が、行列積の交換不能性から交換子が現れ、

$$
U_{\mu\nu}=I-ia^2
\{\partial_\mu B_\nu-\partial_\nu B_\mu-i[B_\mu,B_\nu]\}
+O(a^3)=I-ia^2\mathcal F_{\mu\nu}+O(a^3).
$$

主対数を原点近くで取れるので指数形も従います。$\mathcal F$ はHermitianで $\operatorname{tr}\mathcal F=0$ です。実部の跡では反Hermitianの奇数次の先頭項が消え、

$$
1-\frac1N\operatorname{Re}\operatorname{tr}U_{\mu\nu}
=\frac{a^4}{2N}\operatorname{tr}(\mathcal F_{\mu\nu}^2)+O(a^5)
=\frac{a^4}{4N}\sum_a(\mathcal F_{\mu\nu}^a)^2+O(a^5).
$$

定義の $2N/g^2$ を掛け、$\mu<\nu$ で和を取ります。$\mathcal F_{\nu\mu}=-\mathcal F_{\mu\nu}$ なので $\sum_{\mu<\nu}F_{\mu\nu}^2=\sum_{\mu,\nu}F_{\mu\nu}^2/2$。従ってセル当たり $a^4\sum_{\mu,\nu,a}F_{\mu\nu}^{a\,2}/(4g^2)$ です。固定物理体積内のセル数は $O(a^{-4})$ で、局所 $O(a^5)$ の和は $O(a)$ になります。これは各滑らかな入力場に対するRiemann和の議論であり、全ての格子配置が滑らかな場の近くにあるという仮定ではありません。
<!-- proof-end -->

## 2. 整数が有限格子でも現れる最小模型

四次元のインスタントンへ飛ぶ前に、二次元の周期格子（トーラス）で位相の巻き付きの離散版を作ります。群は $U(1)$、格子は $L_1\times L_2$（$L_1,L_2\ge2$）で、リンクを複素数 $|U_\mu(x)|=1$ とします。$U(1)$ は $SU(N)$ と異なりますが、位相の主値・境界条件・整数性の機構を小さく検査できます。

plaquetteは先ほどと同じ向きの四辺積で複素数の位相です。複素数が $-1$ でない場合、偏角を $(-\pi,\pi)$ の一意な値に選べます。この主値を取る操作には**枝切り**があり、連続な配置変形の途中で $U_p=-1$ へ到達すると主値は飛びます。

<a id="def-qft46-u1-charge"></a>

<!-- formal-statement-start -->
> **定義（二次元U(1)格子の主値トポロジカル電荷）**
> 二次元周期 $L_1\times L_2$ 格子の全リンク $U_\mu(x)\in U(1)$ について、各plaquetteが $U_{12}(x)\ne-1$ を満たすとする。主値角 $\alpha(x)=\operatorname{Arg}U_{12}(x)\in(-\pi,\pi)$ を選び、

$$
Q_L=\frac1{2\pi}\sum_x\alpha(x)
$$

> と定める。和はトーラス上の全 $L_1L_2$ plaquetteを一度ずつ数える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft46-u1-charge -->
### 例：$2\times2$ トーラスで $Q_L=1$

格子点を $m,n\in\{0,1\}$ とし、添字は2を法として読む。正方向リンクを

$$
U_1(m,n)=e^{-i\pi n/2},\qquad
U_2(m,0)=1,\qquad U_2(m,1)=(-1)^m
$$

と取ります。**定義の確認**：全リンクの絶対値は1です。$n=0$ の各plaquetteでは $U_1(m,0)/U_1(m,1)=i$、$U_2$ の比は1です。$n=1$ では $U_1(m,1)/U_1(m,0)=-i$、$U_2(m+1,1)/U_2(m,1)=-1$ なので積はやはり $i$。四枚の $U_p=i$ は $-1$ でなく、各主値角は $\pi/2$ です。従って $Q_L=4(\pi/2)/(2\pi)=1$。全てのリンクを1と置く別例では $Q_L=0$ です。
<!-- definition-example-end -->

<a id="thm-qft46-u1-integer"></a>

<!-- formal-statement-start -->
> **定理（周期U(1)格子の整数電荷と局所安定性）**
> 上の二次元周期 $U(1)$ 格子で全plaquetteが $-1$ を避けるとき、$Q_L$ は整数で、各頂点での $U(1)$ ゲージ変換に不変である。また、全plaquetteが枝切りを避ける連続なリンク変形に沿って $Q_L$ は一定である。枝切りを許す全配置空間で一定とは主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

周期格子で全plaquetteを掛けると各リンクが正向きと逆向きに一度ずつ現れて相殺します。その積が1であるため偏角の和は $2\pi$ の整数倍です。

<!-- proof-start -->
### 証明

各plaquetteを $P(m,n)=U_1(m,n)U_2(m+1,n)U_1(m,n+1)^{-1}U_2(m,n)^{-1}$ と書きます。$U(1)$ は可換なので積の順序を並べ替えられ、周期添字の置換 $(m,n)\mapsto(m+1,n)$、$(m,n+1)$ によって

$$
\prod_{m,n}P(m,n)
=\frac{\prod_{m,n}U_1(m,n)}{\prod_{m,n}U_1(m,n+1)}
\frac{\prod_{m,n}U_2(m+1,n)}{\prod_{m,n}U_2(m,n)}=1.
$$

$P(m,n)=e^{i\alpha(m,n)}$ だから $e^{i\sum\alpha}=1$、すなわち $\sum\alpha=2\pi k$、$k\in\mathbb Z$ です。$Q_L=k$ が従います。頂点変換 $U_{xy}\mapsto V_xU_{xy}V_y^{-1}$ は[Wilsonループのゲージ変換計算](../QFT42/index.md#prop-qft42-wilson-invariant)と同じ相殺で各plaquetteを変えず、主値角も変えません。

さらに $P(m,n)\ne-1$ を保てば各 $\alpha(m,n)$ はリンクの連続変形に沿って連続です。有限和 $Q_L$ は整数値かつ連続なので、その連結した変形区間で一定です。これは値域の整数性と連続性からの結論であり、枝切りに達する経路へは拡張できません。
<!-- proof-end -->

### 枝切りが必要な理由

全リンクの集合 $U(1)^{2L_1L_2}$ 自体は連結です。単位磁束の例の全リンク位相を $t$ 倍して $t=1$ から $0$ まで動かせば全リンク1へ至りますが、途中で少なくとも一つのplaquetteが $-1$ を通ります。したがって「任意の有限格子で、連続変形の下で整数電荷が絶対に保存する」は偽です。上の定理が使った「枝切りを避ける」仮定が失われ、主値角の連続性が壊れます。

## 3. 四次元では自己双対な場が作用を最小にする

二次元の主値角の整数と四次元のゲージ場の位相分類は別物です。四次元の滑らかな曲率には、添字二組を向き付きで交換する**Hodge双対**を作用させられます。ここではEuclid空間の標準的な体積形式を用い、作用に現れる曲率の二乗を二つの平方の差として読み直します。

<a id="def-qft46-dual-charge"></a>

<!-- formal-statement-start -->
> **定義（四次元の双対曲率とトポロジカル電荷）**
> $\mathbb R^4$ 上の滑らかな $SU(N)$ ポテンシャル $B_\mu$ と、$\int\sum_{\mu,\nu,a}|\mathcal F_{\mu\nu}^a|^2d^4x<\infty$ を満たす曲率を取る。Euclidの向き $\varepsilon_{1234}=+1$ で双対を

$$
\widetilde{\mathcal F}_{\mu\nu}^a
=\frac12\varepsilon_{\mu\nu\rho\sigma}\mathcal F_{\rho\sigma}^a
$$

> とし、規格化した電荷を

$$
Q=\frac1{32\pi^2}\int_{\mathbb R^4}d^4x\,
\sum_{\mu,\nu,a}\mathcal F_{\mu\nu}^a\widetilde{\mathcal F}_{\mu\nu}^a
$$

> と定める。$\mathcal F=+\widetilde{\mathcal F}$ を自己双対、$\mathcal F=-\widetilde{\mathcal F}$ を反自己双対と呼ぶ。**有限作用だけを仮定して $Q\in\mathbb Z$ と宣言しない**。滑らかな接続の境界挙動と束の位相条件が必要である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft46-dual-charge -->
### 例：二成分だけなら自己双対ではない

$\mathcal F_{12}^3=f(x)$、$\mathcal F_{21}^3=-f(x)$、他成分は零という反対称テンソルを考えます。**定義の確認**：$\widetilde{\mathcal F}_{34}^3=f$ で $\widetilde{\mathcal F}_{12}^3=0$。したがって $f\ne0$ の点では $\mathcal F\ne\pm\widetilde{\mathcal F}$ です。縮約 $\mathcal F_{\mu\nu}^a\widetilde{\mathcal F}_{\mu\nu}^a$ は零なので $Q=0$ です。これは双対の添字代数を検査する例であり、任意の局所テンソルが大域的な有限作用接続から生じるとの主張ではありません。
<!-- definition-example-end -->

<a id="thm-qft46-self-dual-bound"></a>

<!-- formal-statement-start -->
> **定理（四次元Euclid Yang–Mills作用の自己双対下界）**
> 上記の有限作用な滑らかなEuclid $SU(N)$ 曲率と正の結合 $g>0$ について、

$$
S_E=\frac1{4g^2}\int d^4x\,
\sum_{\mu,\nu,a}(\mathcal F_{\mu\nu}^a)^2
\ge\frac{8\pi^2}{g^2}|Q|.
$$

> $Q>0$ なら等号条件は自己双対、$Q<0$ なら反自己双対である。$Q=0$ の等号は $\mathcal F=0$ に限る。$Q$ の整数性はこの不等式の仮定ではない。
<!-- formal-statement-end -->

### 証明の見取り図

双対を二度取ると元に戻り、双対の二乗ノルムは元の曲率のものと一致します。$\mathcal F\mp\widetilde{\mathcal F}$ の二乗が非負であることだけで係数を確定できます。

<!-- proof-start -->
### 証明

Euclidの $\varepsilon$ の縮約

$$
\frac14\varepsilon_{\mu\nu\rho\sigma}
\varepsilon_{\rho\sigma\alpha\beta}\mathcal F_{\alpha\beta}
=\mathcal F_{\mu\nu}
$$

から $\widetilde{\widetilde{\mathcal F}}=\mathcal F$。従って $\widetilde{\mathcal F}^2=\mathcal F^2$（全添字と色の和を略記）です。点ごとに

$$
0\le(\mathcal F\mp\widetilde{\mathcal F})^2
=2\mathcal F^2\mp2\mathcal F\widetilde{\mathcal F}.
$$

積分し、$Q$ の定義 $\int\mathcal F\widetilde{\mathcal F}=32\pi^2Q$ を代入すると

$$
S_E\ge\pm\frac1{4g^2}\int\mathcal F\widetilde{\mathcal F}
=\pm\frac{8\pi^2}{g^2}Q.
$$

符号を $Q$ に合わせて選び下界を得ます。等号の場合、非負で連続な平方ノルムの積分が0なので各点で $\mathcal F=\pm\widetilde{\mathcal F}$。逆に自己双対または反自己双対なら対応する平方が零です。$Q=0$ で $S_E=0$ なら曲率二乗の積分が0、滑らかさにより曲率は恒等的に零です。
<!-- proof-end -->

## 4. $SU(2)$ インスタントンを直接積分する

前節の下界を達成する非零曲率が存在することを、**BPSTインスタントン**という具体解で確かめます。この場の有限作用と自己双対性は計算できます。ただし、全ての有限作用接続の電荷が整数であるという一般定理を、この一例の計算だけから導くことはできません。

$SU(2)$ の生成子 $T^a=\sigma^a/2$（Pauli行列）を用いると $[T^a,T^b]=i\varepsilon_{abc}T^c$ です。まず定数の反対称記号 $\eta^a_{\mu\nu}$ を $i,j=1,2,3$ について

$$
\eta^a_{ij}=\varepsilon_{aij},\qquad
\eta^a_{i4}=\delta_{ai},\qquad
\eta^a_{4i}=-\delta_{ai}
$$

と置きます。直接添字を並べると $\widetilde\eta^a=\eta^a$、また各 $a$ で非零成分は絶対値1のものが四つなので $\sum_{\mu,\nu,a}\eta^a_{\mu\nu}\eta^a_{\mu\nu}=12$ です。

<a id="prop-qft46-bpst"></a>

<!-- formal-statement-start -->
> **命題（BPST解の電荷と作用）**
> $\rho>0$ とし、$\mathbb R^4$ の $r^2=\sum_\mu x_\mu^2$ について結合を吸収した $SU(2)$ ポテンシャルを

$$
B_\mu^a(x)=\frac{2\eta^a_{\mu\nu}x_\nu}{r^2+\rho^2},
\qquad
\mathcal F_{\mu\nu}^a
=\partial_\mu B_\nu^a-\partial_\nu B_\mu^a
+\varepsilon_{abc}B_\mu^bB_\nu^c
$$

> で定める。このとき曲率は滑らかで自己双対であり、

$$
\mathcal F_{\mu\nu}^a
=-\frac{4\rho^2\eta^a_{\mu\nu}}{(r^2+\rho^2)^2},
\qquad Q=1,\qquad S_E=\frac{8\pi^2}{g^2}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

微分の差と非可換な二次項を同じ分母へ置き、$\eta$ の添字恒等式で $x_\mu x_\nu$ を打ち消します。自己双対なら電荷は曲率の二乗積分だけで求まり、四次元の極座標積分が残ります。

<!-- proof-start -->
### 証明

$D=r^2+\rho^2$ と置くと $\partial_\mu D=2x_\mu$ です。従って

$$
\partial_\mu B_\nu^a-\partial_\nu B_\mu^a
=-\frac{4\eta^a_{\mu\nu}}D
+\frac{4}{D^2}
\left(\eta^a_{\mu\lambda}x_\lambda x_\nu
-\eta^a_{\nu\lambda}x_\lambda x_\mu\right).
$$

この記号については、$\eta^a_{ij}=\varepsilon_{aij}$、$\eta^a_{i4}=\delta_{ai}$ を代入して添字を $ij$ と $i4$ に分けます。空間添字 $i,j,k\in\{1,2,3\}$ について $\varepsilon_{abc}\varepsilon_{bik}=\delta_{ak}\delta_{ci}-\delta_{ai}\delta_{ck}$ を使うと、左辺の非可換積は

$$
\begin{aligned}
(\mu,\nu)=(i,4):\quad&
\delta_{ai}\sum_{k=1}^3x_k^2-x_ax_i
-\varepsilon_{aik}x_kx_4,\\
(\mu,\nu)=(i,j):\quad&
r^2\varepsilon_{aij}
+\varepsilon_{ajk}x_kx_i-\varepsilon_{aik}x_kx_j
+x_4(\delta_{aj}x_i-\delta_{ai}x_j)
\end{aligned}
$$

となります。各式は以下の右辺へ $\eta$ の成分を代入した結果と一致するため、

$$
\varepsilon_{abc}\eta^b_{\mu\lambda}\eta^c_{\nu\sigma}x_\lambda x_\sigma
=r^2\eta^a_{\mu\nu}
+\eta^a_{\nu\lambda}x_\lambda x_\mu
-\eta^a_{\mu\lambda}x_\lambda x_\nu
$$

を得ます。例えば $x=(0,0,0,r)$、$\mu=i,\nu=j$ では左辺は $r^2\varepsilon_{aij}$、右辺も $r^2\eta^a_{ij}$ となり、$\mu=i,\nu=4$ では両辺0です。非可換項は上式を $4/D^2$ 倍したものなので、$x_\mu x_\nu$ の二項が相殺し、

$$
\mathcal F_{\mu\nu}^a
=-\frac4D\eta^a_{\mu\nu}
+\frac{4r^2}{D^2}\eta^a_{\mu\nu}
=-\frac{4\rho^2}{D^2}\eta^a_{\mu\nu}.
$$

$D\ge\rho^2>0$ なので滑らかで、$\widetilde\eta=\eta$ より自己双対です。曲率の二乗は

$$
\sum_{\mu,\nu,a}(\mathcal F_{\mu\nu}^a)^2
=\frac{16\rho^4}{D^4}\cdot12
=\frac{192\rho^4}{(r^2+\rho^2)^4}.
$$

四次元の単位三球面積 $2\pi^2$ を使い、$u=r^2$ と置けば

$$
\begin{aligned}
\int_{\mathbb R^4}d^4x\,\mathcal F^2
&=384\pi^2\rho^4\int_0^\infty\frac{r^3\,dr}{(r^2+\rho^2)^4}\\
&=192\pi^2\rho^4\int_0^\infty\frac{u\,du}{(u+\rho^2)^4}\\
&=192\pi^2\rho^4\left(\frac1{6\rho^4}\right)=32\pi^2 .
\end{aligned}
$$

最後の積分は $v=u+\rho^2$ とすると $u=v-\rho^2$ なので $\int_{\rho^2}^\infty(v^{-3}-\rho^2v^{-4})dv=1/(2\rho^4)-1/(3\rho^4)=1/(6\rho^4)$ です。自己双対性から $Q=(32\pi^2)^{-1}\int\mathcal F^2=1$、作用の係数 $1/(4g^2)$ から $S_E=8\pi^2/g^2$。$\rho$ が消えるのは四次元の古典的尺度不変性に対応します。
<!-- proof-end -->

### どこから一般の整数性が来るのか

上の $Q=1$ は具体解の積分による結果です。一般の整数性は、無限遠で有限作用な場を適切な境界条件の下に純ゲージへ近付け、無限遠の三球面から $SU(2)$ への写像の巻き付き数へ還元する議論を必要とします。非自明な束・特性類の一般論は別途幾何学的な前提を要し、ここで無条件の定理として使用しません。インスタントンが存在することと、量子Yang–Mills理論の連続極限・質量ギャップ・閉じ込めの証明とは、依然として異なる問題です。

## 5. θ項は確率をどう変えるか

整数セクター $Q\in\mathbb Z$ が定義できる有限体積の模型を想定します。例えば第2節の主値電荷なら、plaquetteが枝切りを避ける配置だけを積分範囲にし、重みを適切に規格化できます。$\theta$ は実パラメータで、各セクターへ位相 $e^{i\theta Q}$ を掛けます。これは単に正のBoltzmann重みを変えることと違い、一般に複素符号問題を生みます。

<a id="def-qft46-theta"></a>

<!-- formal-statement-start -->
> **定義（θ分配関数とトポロジカル感受率）**
> 有限体積 $V>0$ で整数電荷 $Q$ ごとの非負な重み $Z_Q\ge0$ があり、$0<\sum_QZ_Q<\infty$ とする。微分を行う場合は $\sum_Q Q^2Z_Q<\infty$ とする。実 $\theta$ に対して

$$
Z(\theta)=\sum_{Q\in\mathbb Z}Z_Qe^{i\theta Q},
\qquad
\chi_t=\frac1V\left(\langle Q^2\rangle_0-\langle Q\rangle_0^2\right)
$$

> と定義する。添字0は $\theta=0$ の正の確率重み $Z_Q/Z(0)$ による平均を意味する。$\chi_t$ は非負であり、四次元理論と二次元格子で物理次元は同じとは限らない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft46-theta -->
### 例：$Q=-1,0,+1$ だけの有限模型

**定義の確認**：$Z_{\pm1}=z>0$、$Z_0=z_0>0$、他は零と置くと、$Z(\theta)=z_0+2z\cos\theta$、$Z(0)=z_0+2z>0$ です。$\langle Q\rangle_0=(-z+z)/(z_0+2z)=0$、$\langle Q^2\rangle_0=2z/(z_0+2z)$ なので

$$
\chi_t=\frac{2z}{V(z_0+2z)}\ge0.
$$

$\theta=\pi$ では $Z(\pi)=z_0-2z$ となり、正である保証はありません。$\theta=0$ の測度の正値性を $\theta\ne0$ の確率解釈へ持ち込めないことも確認できます。
<!-- definition-example-end -->

<a id="prop-qft46-theta-derivatives"></a>

<!-- formal-statement-start -->
> **命題（θ微分と電荷の揺らぎ）**
> 上の有限体積の整数セクター模型で、$Z(0)>0$ かつ二次モーメントが有限であるとする。$\theta=0$ の近傍の対数の枝を $Z(0)>0$ に連続に取れば、

$$
\left.\frac{d\log Z}{d\theta}\right|_0=i\langle Q\rangle_0,
\qquad
\left.\frac{d^2\log Z}{d\theta^2}\right|_0=-V\chi_t .
$$

> さらに整数電荷を保つセクター和では $Z(\theta+2\pi)=Z(\theta)$ である。この周期性を、整数性が未確認の任意の格子離散化へ無条件に移してはならない。
<!-- formal-statement-end -->

### 証明の見取り図

位相の一階微分は $iQ$、二階微分は $-Q^2$ を引き出します。$\log$ の二階微分では平均の二乗が差し引かれます。

<!-- proof-start -->
### 証明

二次モーメントの有限性と $\sum Z_Q<\infty$ により、$|Q|\le(1+Q^2)/2$ なので一階・二階の項別微分が $\theta=0$ で正当化できます。従って

$$
Z'(0)=i\sum_QQZ_Q=iZ(0)\langle Q\rangle_0,\qquad
Z''(0)=-\sum_QQ^2Z_Q=-Z(0)\langle Q^2\rangle_0 .
$$

$Z(0)>0$ なので近傍で $Z\ne0$ とでき、$\log Z$ の導関数は $Z'/Z$、二階は $Z''/Z-(Z'/Z)^2$ です。これに代入すれば

$$
\left.(\log Z)''\right|_0
=-\langle Q^2\rangle_0-(i\langle Q\rangle_0)^2
=-\left(\langle Q^2\rangle_0-\langle Q\rangle_0^2\right).
$$

最後に $Q\in\mathbb Z$ だから $e^{i(\theta+2\pi)Q}=e^{i\theta Q}$ が各項ごとに成り立ち、絶対収束する和にも周期性が従います。
<!-- proof-end -->

[QFT39の軸性異常](../QFT39/index.md#thm-qft39-axial-ward-anomaly)にも $F\widetilde F$ 型の密度が現れますが、そこでの局所Ward恒等式・FujikawaのJacobianと、ここでの整数セクターに対する位相は区別します。量子異常が一般に消えるという主張ではありません。

**非摂動論の境界**：有限格子ではリンク積分そのものは定義できます（[QFT42のHaar重み](../QFT42/index.md#def-qft42-wilson-action)）。しかし格子間隔を零にする際、裸結合をどう選び、相関関数の極限や反射陽性・質量ギャップがどうなるかは別途調べなければなりません。四次元QCDの閉じ込めもインスタントン一つの存在から従いません。$\theta$ が非零なら複素位相によって数値積分が難しくなる場合があります。

## 6. 演習：格子の整数性から四次元の作用まで

### 演習 QFT46-A1：$SU(2)$ の一枚の作用

- Level: A
- 目安時間: 8分

$T^3=\operatorname{diag}(1,-1)/2$、$U_p=e^{-itT^3}$、$g>0$ とする。一枚のWilson作用 $(4/g^2)(1-\operatorname{Re}\operatorname{tr}U_p/2)$ を $t=0$ の四次まで展開せよ。

<!-- solution-start -->
### 詳細解答

$U_p=\operatorname{diag}(e^{-it/2},e^{it/2})$ なので $\operatorname{tr}U_p=2\cos(t/2)$ です。$\cos z=1-z^2/2+z^4/24+O(z^6)$ を $z=t/2$ に適用し、

$$
\frac4{g^2}(1-\cos(t/2))
=\frac4{g^2}\left(\frac{t^2}8-\frac{t^4}{384}+O(t^6)\right)
=\frac{t^2}{2g^2}-\frac{t^4}{96g^2}+O(t^6).
$$

$t=a^2f$ なら先頭は $a^4f^2/(2g^2)$ で、$t^4$ は $a^8$ 次です。
<!-- solution-end -->

### 演習 QFT46-A2：自明配置の電荷

- Level: A
- 目安時間: 7分

二次元周期 $L_1\times L_2$ の全 $U(1)$ リンクを1とする。各plaquette、主値角、電荷 $Q_L$ を求め、ゲージ変換しても変わらない理由を述べよ。

<!-- solution-start -->
### 詳細解答

四辺積は $1\cdot1\cdot1^{-1}\cdot1^{-1}=1$。主値角は $\operatorname{Arg}1=0\in(-\pi,\pi)$ で枝切り条件を満たします。従って $Q_L=(2\pi)^{-1}\sum_x0=0$。頂点の位相 $V_x$ で変換すると一周積は $V_x1V_x^{-1}=1$ なので、各角と電荷は変わりません。
<!-- solution-end -->

### 演習 QFT46-A3：$2\times2$ の単位電荷

- Level: A
- 目安時間: 10分

$m,n\in\{0,1\}$ を周期添字とする。$U_1(m,n)=e^{-i\pi n/2}$、$U_2(m,0)=1$、$U_2(m,1)=(-1)^m$ に対し、四枚のplaquetteをすべて計算して $Q_L$ を求めよ。

<!-- solution-start -->
### 詳細解答

$P(m,n)=U_1(m,n)U_2(m+1,n)U_1(m,n+1)^{-1}U_2(m,n)^{-1}$ です。$n=0$ では二本の $U_2$ は1、$U_1(m,0)=1$ と $U_1(m,1)^{-1}=i$ より $P(0,0)=P(1,0)=i$。$n=1$ では $U_1(m,1)=-i$、$U_1(m,0)^{-1}=1$、$U_2(m+1,1)/U_2(m,1)=-1$（添字は周期）なので $P(0,1)=P(1,1)=(-i)(-1)=i$。四つとも $\operatorname{Arg}i=\pi/2$、$Q_L=4(\pi/2)/(2\pi)=1$ です。
<!-- solution-end -->

### 演習 QFT46-A4：双対の成分と符号

- Level: A
- 目安時間: 9分

Euclidの $\varepsilon_{1234}=+1$、反対称テンソル $F$ について、独立成分が $F_{12}=p$、$F_{34}=q$ だけの場合の $\widetilde F_{12}$、$\widetilde F_{34}$、$F_{\mu\nu}\widetilde F_{\mu\nu}$ を求めよ。自己双対の条件も述べよ。

<!-- solution-start -->
### 詳細解答

$\widetilde F_{12}=(\varepsilon_{1234}F_{34}+\varepsilon_{1243}F_{43})/2=(q+q)/2=q$。同じく $\widetilde F_{34}=p$。負順序成分も含む全和では

$$
F_{\mu\nu}\widetilde F_{\mu\nu}
=2(F_{12}\widetilde F_{12}+F_{34}\widetilde F_{34})=4pq.
$$

$F=\widetilde F$ は $p=q$、反自己双対は $p=-q$ です。$F^2=2(p^2+q^2)$ なので $F^2\ge|4pq|$ も $(|p|-|q|)^2\ge0$ から確認できます。
<!-- solution-end -->

### 演習 QFT46-A5：自己双対作用の係数

- Level: A
- 目安時間: 8分

$g>0$、$Q=2$ の有限作用自己双対曲率があると仮定する。$S_E$ を求めよ。また $Q=-2$ の反自己双対曲率ではどうなるか。存在そのものを証明する必要はない。

<!-- solution-start -->
### 詳細解答

自己双対なら $F\widetilde F=F^2$ なので $\int F^2=32\pi^2Q=64\pi^2$。作用は $\int F^2/(4g^2)=16\pi^2/g^2$。反自己双対なら $F\widetilde F=-F^2$ で、$Q=-2$ は $\int F^2=64\pi^2$ を与え、作用は同じ $16\pi^2/g^2$ です。符号が変わるのは電荷であって正のEuclid作用ではありません。
<!-- solution-end -->

### 演習 QFT46-B1：主値の枝切りと整数の跳躍

- Level: B
- 目安時間: 15分

第2節の $2\times2$ 配置の各リンクを、位相の指数の中で係数 $t\in[0,1]$ を掛けて連続変形する（$(-1)^m=e^{i\pi m}$ と表示してから $t$ を掛ける）。$P(m,n;t)$ を求め、$t$ のどこで枝切りが現れるか、$t=0,1$ の電荷が矛盾しない理由を説明せよ。

<!-- solution-start -->
### 詳細解答

$U_1=e^{-i\pi tn/2}$、$U_2(m,0)=1$、$U_2(m,1)=e^{i\pi tm}$ です。$n=0$ の二枚は $P(m,0;t)=e^{i\pi t/2}$。$n=1$ で $m=0$ は $U_1(0,1)=e^{-i\pi t/2}$ と $U_2(1,1)=e^{i\pi t}$ を使って

$$
P(0,1;t)=e^{-i\pi t/2}e^{i\pi t}
=e^{i\pi t/2}.
$$

$n=1,m=1$ では周期添字 $m+1=0$ だから

$$
P(1,1;t)=e^{-i\pi t/2}e^{-i\pi t}
=e^{-3i\pi t/2}.
$$

$t<2/3$ なら四枚とも主値を連続に選べ、三枚が $\pi t/2$、最後が $-3\pi t/2$ なので角の和は0、$Q_L=0$。$t=2/3$ で最後のplaquetteが $-1$ となり主値は定義されません。$2/3<t\le1$ では最後の主値が $2\pi-3\pi t/2$ へ跳び、四枚の和は $2\pi$ で $Q_L=1$。全リンクは連続でも、枝切りを除いた配置領域から途中で出たため、[局所安定性の定理](#thm-qft46-u1-integer)と矛盾しません。
<!-- solution-end -->

### 演習 QFT46-B2：BPSTの半径依存と電荷

- Level: B
- 目安時間: 16分

四次元の自己双対曲率が $\sum_{\mu,\nu,a}F_{\mu\nu}^{a\,2}=192\rho^4/(r^2+\rho^2)^4$、$\rho>0$ を満たすとする。四次元極座標の球面積 $2\pi^2$ を用い、$\int F^2$、$Q$、$S_E$ を $\rho$ を残さず求めよ。

<!-- solution-start -->
### 詳細解答

極座標と $u=r^2$ から

$$
\begin{aligned}
\int F^2d^4x
&=2\pi^2\cdot192\rho^4\int_0^\infty\frac{r^3}{(r^2+\rho^2)^4}dr\\
&=192\pi^2\rho^4\int_0^\infty\frac{u}{(u+\rho^2)^4}du.
\end{aligned}
$$

$v=u+\rho^2$ とすると $\int_{\rho^2}^\infty(v^{-3}-\rho^2v^{-4})dv=1/(2\rho^4)-1/(3\rho^4)=1/(6\rho^4)$。よって $\int F^2=32\pi^2$。自己双対なので $F\widetilde F=F^2$、$Q=1$。$S_E=\int F^2/(4g^2)=8\pi^2/g^2$。$\rho$ は積分のスケール変換 $r=\rho s$ で分子の $\rho^4$ と打ち消し合います。
<!-- solution-end -->

### 演習 QFT46-B3：θの二次微分

- Level: B
- 目安時間: 14分

$Q=-1,0,1$ に正の重み $Z_{\pm1}=z$、$Z_0=z_0$（$z,z_0>0$）を与える。$Z(\theta)$ を作り、$\left.(\log Z)''\right|_0$ と $\chi_t$ を求めよ。$z_0=2z$ のとき $\theta=\pi$ で何が起きるか。

<!-- solution-start -->
### 詳細解答

$$
Z(\theta)=ze^{-i\theta}+z_0+ze^{i\theta}=z_0+2z\cos\theta.
$$

$Z(0)=z_0+2z>0$、$Z'(0)=-2z\sin0=0$、$Z''(0)=-2z$ だから

$$
\left.(\log Z)''\right|_0
=\frac{-2z}{z_0+2z}-\left(\frac0{z_0+2z}\right)^2
=-\frac{2z}{z_0+2z},\qquad
\chi_t=\frac{2z}{V(z_0+2z)}.
$$

$z_0=2z$ なら $Z(\pi)=2z-2z=0$ で、そこで $\log Z$ は定義できません。$\theta=0$ の近傍での微分命題と、任意の $\theta$ での非零性は別の条件です。
<!-- solution-end -->

### 演習 QFT46-C1：何を証明したか、どこへ外挿できないか

- Level: C
- 目安時間: 25分

次の三つの主張を考える。（i）二次元周期 $U(1)$ 格子の枝切りを避けた配置の主値電荷は整数。（ii）四次元Euclid $SU(2)$ のBPST場は自己双対で $Q=1$。（iii）したがって四次元連続QCDの質量ギャップと閉じ込めは厳密に成立する。前二者を定義と計算から短く再導出し、（iii）の推論で新たに必要になる前提を少なくとも三つ挙げよ。なお三つの主張は相互に同じ模型でないことを明示せよ。

<!-- solution-start -->
### 詳細解答

（i）二次元 $U(1)$ のplaquette積 $P(x)$ は周期添字で全て掛けると各リンクと逆リンクが相殺して $\prod_xP(x)=1$。全て $P(x)\ne-1$ なら $\alpha(x)=\operatorname{Arg}P(x)\in(-\pi,\pi)$ を選べるので $e^{i\sum_x\alpha(x)}=1$、$Q_L=\sum_x\alpha(x)/(2\pi)\in\mathbb Z$。枝切りを横断すれば角の連続性が失われ、整数の局所的保存と矛盾せず跳躍できます。これが（i）の成立範囲です。

（ii）四次元 $SU(2)$ では $\widetilde\eta=\eta$ と $F_{\mu\nu}^a=-4\rho^2\eta_{\mu\nu}^a/(r^2+\rho^2)^2$ より自己双対です。$\sum\eta^2=12$ で $\int F^2=2\pi^2\cdot192\rho^4\int_0^\infty r^3dr/(r^2+\rho^2)^4=32\pi^2$。従って $Q=(32\pi^2)^{-1}\int F\widetilde F=1$、$S_E=8\pi^2/g^2$。一つの滑らかな古典場を計算した結論です。

（iii）は導けません。第一に（i）は**二次元可換群**の有限格子であり、（ii）は**四次元非可換群**の一つの古典配置なので、そこから全量子配置の確率測度・経路積分の極限を構成する必要があります。第二に、格子間隔 $a\to0$、物理体積の無限大化、裸結合の流れを同時に制御して相関関数が意味のある極限を持つかを別途示す必要があります。第三に、その極限で[QFT20の自由場の反射陽性](../QFT20/index.md#thm-qft20-free-reflection)とは別にゲージ模型の時間発展を正値な作用素として構成し、ゲージ不変状態のスペクトルに正のギャップがあることを証明する必要があります。第四に、静的源のWilsonループの面積則を必要な大ループ極限まで示す必要があり、[QFT42の固定矩形の強結合級数](../QFT42/index.md#prop-qft42-strong-leading)だけでは足りません。さらに動的クォークを含む理論では弦の切断も考慮します。したがって（i）、（ii）は非摂動現象を研究する入口ですが、（iii）の証明ではありません。
<!-- solution-end -->

ここまでの計算は、**有限格子の整数性**と**滑らかな連続場の作用下界**をそれぞれ独立に再構成するものでした。次の科目では散乱・標準模型・非摂動近似の仮定を一緒に検査し、科目III全体の計算を統合します。
