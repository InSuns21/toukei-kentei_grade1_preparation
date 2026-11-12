# HOLO6 大Nと半古典重力

[前講のD3-braneの分離極限](../HOLO5/index.md#prop-holo5-scaled-throat)では、$AdS_5\times S^5$の半径$L$と弦長$\ell_s$の比が$\lambda^{1/4}$になることを計算しました。しかし、双対性を仮定したとしても、そこから**なぜ量子重力の代わりに古典的な重力方程式を解いてよいのか**は分かりません。

本講では「色の数$N$が大きい」という話を、(i) 行列の添字の数え上げ、(ii) 重力ループの小ささ、(iii) 弦の高質量励起を取り除けるか、の三つに分解します。まず厳密に扱える有限次元行列の摂動模型で数え方を証明し、最後にIIB弦理論の規格化を**外部からの入力**として重力側と突き合わせます。大$N$の行列計算そのものは、AdS/CFT双対性の証明ではありません。

## 1. 何を固定して$N$を大きくするのか

[HOLO5の't Hooft結合](../HOLO5/index.md#def-holo5-t-hooft)は$\lambda=g_{\mathrm{YM}}^2N$でした。$g_{\mathrm{YM}}^2$を一定にして$N$を増やすと$\lambda$も大きくなるため、単に「$N\to\infty$」だけでは展開が定まりません。

本講では$N$は正整数、$\lambda>0$とし、行列の成分数が$N^2$に増えるのと同時に、結合を$g_{\mathrm{YM}}^2=\lambda/N$へ減らす道をまず考えます。

<a id="def-holo6-t-hooft-limit"></a>

<!-- formal-statement-start -->
> **定義（'t Hooftの大N極限）**
>
> 正整数$N$を無限大へ向かわせるとき、正の無次元数$\lambda$を固定し、結合定数を次のように選ぶ。

$$
\lambda=g_{\mathrm{YM}}^2N,\qquad
g_{\mathrm{YM}}^2=\frac{\lambda}{N}.
$$

> この操作を't Hooftの大$N$極限という。以下の行列模型では模型の係数$\lambda$も固定する。定義だけで$\lambda\gg1$は仮定しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo6-t-hooft-limit -->
**定義の確認**： 判定するのは各$N$で結合が正であることと、積$Ng_{\mathrm{YM}}^2$が同じ正の数に固定されていることです。以下の二組では両方を確かめます。

**直接例。** $\lambda=4$に固定すれば$N=10$では$g_{\mathrm{YM}}^2=4/10$、$N=100$では$4/100$です。どちらも積$Ng_{\mathrm{YM}}^2=4$です。反対に$g_{\mathrm{YM}}^2=4/10$を保ったまま$N=100$にすると積は$40$になり、定義した極限の列に乗りません。
<!-- definition-example-end -->

## 2. 行列の添字が描く面：$1/N$の出どころ

ゲージ理論の全ての技術をいきなり使う代わりに、$N\times N$のHermitian行列$M=(M_i{}^j)$を一つ扱います。添字$i,j$は$1,\ldots,N$を動き、$M_i{}^j$は第$i$行・第$j$列の成分です（上添字$j$は冪ではありません）。Hermitianとは$M_j{}^i=\overline{M_i{}^j}$という条件です。行列の積をたどると

$$
\operatorname{tr}M^4
=\sum_{i,j,k,l=1}^N
 M_i{}^jM_j{}^kM_k{}^lM_l{}^i
$$

となり、隣り合う二つの添字がつながります。行列の一成分は上側と下側に添字を一つずつ持つため、線を**二本**引いて添字のつながりを記録できます。閉じた添字の輪ごとに自由な和$\sum_{i=1}^N1=N$が一つ生まれます。

まず計算が完全に定義できるGauss行列模型を用います。自由な期待値は密度を

$$
\frac{1}{Z_0}\exp\left(-\frac{N}{2\lambda}\operatorname{tr}M^2\right)dM,\qquad
Z_0=\int\exp\left(-\frac{N}{2\lambda}\operatorname{tr}M^2\right)dM
$$

で与えます。$dM$は独立な実対角成分と複素非対角成分の実部・虚部に関するLebesgue測度です。$N\ge1,\lambda>0$なので有限次元のGauss積分$Z_0$は有限です。以後、$\langle X\rangle_0$はこの密度による量$X$の期待値を表します。対角成分は分散$\lambda/N$、非対角成分の実部・虚部はそれぞれ分散$\lambda/(2N)$です。

### 2.1 二点共分散とWickの公式を準備する

Gaussの二点期待値では、対角・非対角成分の上記分散を使うと

$$
\left\langle M_i{}^j M_k{}^l\right\rangle_0
=\frac{\lambda}{N}\delta_i{}^l\delta_k{}^j.
$$

例えば$i\ne j$なら$M_i{}^j=z$、$M_j{}^i=\bar z$で、$\langle z\bar z\rangle=\lambda/N$です。対角では$i=j=k=l$のとき同じ式が分散$\lambda/N$を返します。それ以外の添字配置では独立性と平均零により零です。特に同じ非対角成分を二度取る場合、$z=x+iy$と書くと、実部・虚部の分散がともに$\lambda/(2N)$なので$\langle z^2\rangle_0=\langle x^2-y^2+2ixy\rangle_0=0$です。

<a id="holo6-wick-pairings"></a>

**四点期待値を二点縮約へ直す根拠（Wickの公式）。** 上の密度の独立な実Gauss変数を$Y_\nu$（平均零、分散$\sigma_\nu^2$）とします。平方完成により

$$
\frac{\int_{\mathbb R}e^{s y-y^2/(2\sigma_\nu^2)}\,dy}
{\int_{\mathbb R}e^{-y^2/(2\sigma_\nu^2)}\,dy}
=\exp\left(\frac{\sigma_\nu^2s^2}{2}\right)
$$

が成り立ちます。各$M_i{}^j$はこのような実Gauss変数の複素線形結合です。そこから選んだ四つの成分を$X_1,\ldots,X_4$と書き、$C_{ab}=\langle X_aX_b\rangle_0$、$t_a$を補助変数とすると、独立な実変数について上式を掛けることから

$$
\left\langle e^{\sum_{a=1}^4t_aX_a}\right\rangle_0
=\exp\left(\frac12\sum_{a,b=1}^4t_at_bC_{ab}\right).
$$

右辺を展開し、$t_1t_2t_3t_4$の係数を取ります。指数の二次式を二つ選ぶ場合だけが寄与するため、

$$
\langle X_1X_2X_3X_4\rangle_0
=C_{12}C_{34}+C_{13}C_{24}+C_{14}C_{23}
$$

を得ます。これが本講で使う**Wickの四点公式**です。四つの行列成分を二個ずつ組にする三通りを列挙し、それぞれに直前のKronecker記号を代入して独立な添字を数えます。

摂動を組み込むには、実数の形式的な展開パラメータ$u$を導入し、自由なGauss期待値の中に$\exp[-Nu\operatorname{tr}M^4/(4\lambda)]$を形式的に展開します。$u$を固定したとき、各四価頂点から$N/\lambda$、各縮約から$\lambda/N$が生じます。$u$・数値係数・符号は$N$の冪を変えません。ここでは相互作用込みの積分の収束や、任意の実数$u$に対する確率密度の正規化を仮定しません。**以後は摂動級数の各固定次数のグラフについての主張**であり、発散し得る摂動級数全体が収束するとの主張ではありません。

この準備によって、跡の各成分を二点ずつ組にする操作の根拠と、組を選んだ後の添字の同一視が決まりました。以下では、その添字のつながりを幾何的に数える名前を導入します。

<a id="def-holo6-double-line"></a>

<!-- formal-statement-start -->
> **定義（二重線表示と添字面）**
>
> 上の行列模型の摂動展開で、各行列成分$M_i{}^j$の二つの添字を独立した線として追跡する表示を**二重線表示**という。積の添字を同一視した結果、値がまだ自由に動ける添字の閉路を**添字面**といい、その個数を$F$と書く。相互作用$\operatorname{tr}M^4$の挿入数を$V$、二点の縮約数を$E$と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo6-double-line -->
**定義の確認**： 二重線表示では、縮約が課す添字の等号をすべて適用し、独立に和を取れる添字の個数を$F$と数えます。頂点$V$は四次の跡を挿入した回数、辺$E$は二点縮約の組の数です。

**直接例。** $\operatorname{tr}M^4$の四つの因子を左から$1,2,3,4$と番号付けします。[Wickの四点公式](#holo6-wick-pairings)に沿って$(1,2)$と$(3,4)$を縮約すると、直前の二点の式により$k=i$が課され、$i,j,l$の三つが自由に残ります。従って添字面は$F=3$で、和は$N^3$です。交差する$(1,3)$と$(2,4)$の縮約では$i=j=k=l$となり$F=1$です。どちらも$V=1,E=2$であり、何を数えているかを実際に添字の等号で判定できます。
<!-- definition-example-end -->


二重線の帯をつなぎ、残った添字の輪に面を貼ると閉曲面ができます。曲面に付いた取っ手の本数を**種数**$h$といい、球面は$h=0$、ドーナツ状のトーラスは$h=1$です。以下は連結かつ向き付け可能な曲面について、この数が$N$の冪を決めることを証明します。

<a id="prop-holo6-ribbon-count"></a>

<!-- formal-statement-start -->
> **命題（連結真空リボングラフの大N次数）**
>
> 上のHermitian行列模型で、相互作用を$\frac{Nu}{4\lambda}\operatorname{tr}M^4$とし、$\lambda>0$と$u$を固定する。摂動展開の連結・向き付け可能な閉じたリボングラフで、頂点数$V$、縮約辺数$E$、添字面数$F$、対応する閉曲面の種数$h\ge0$とすると、その寄与は$N$について

$$
N^{V-E+F}=N^{2-2h}
$$

> に比例する。係数には$u^V\lambda^{E-V}$および組合せ因子が入る。平面図（$h=0$）は$N^2$、種数1は$N^0$である。ここでの等式はグラフごとの添字数え上げである。
<!-- formal-statement-end -->

### 証明の見取り図

辺の縮約のたびに$1/N$、頂点ごとに$N$、自由添字の輪ごとに$N$を得ます。二重線を少し太くして眺めると閉曲面ができ、そのEuler標数は$V-E+F$です。交差の有無で$N$の次数が違う理由がここにあります。

<!-- proof-start -->
### 証明

相互作用の$V$回の挿入は係数$(Nu/(4\lambda))^V$を、Gaussの$E$回の二点縮約は$(\lambda/N)^E$を与えます。各縮約のKronecker記号$\delta_i{}^l\delta_k{}^j$により添字の等式を課した後、$F$本の独立した閉路が残ります。それぞれ$1,\ldots,N$の$N$通りなので全体の和は$N^F$です。

したがって$N,\lambda,u$に関する部分は

$$
\left(\frac{Nu}{4\lambda}\right)^V
\left(\frac{\lambda}{N}\right)^E N^F
=4^{-V}u^V\lambda^{E-V}N^{V-E+F}.
$$

行列の積は頂点の周囲に添字の循環順序を与えるため、[二重線表示](#def-holo6-double-line)の各辺を帯とみなし、頂点を円板に置き換えると、向きのそろった連結な面付きグラフを得ます。残った閉路に円板を貼ると閉じた向き付け可能な曲面になります。このセル分割では0セルが$V$、1セルが$E$、2セルが$F$です。種数$h$とは、球面に$h$本の取っ手を付けて得られる曲面の取っ手の本数です。球面のEuler標数は$2$であり、取っ手を一つ付ける操作では二つの開円板を取り除いて境界円を円筒でつなぐため、Euler標数は$2$減ります（円筒とその境界円のEuler標数はともに$0$）。従って$h$本の取っ手を持つ閉じた向き付け可能曲面のEuler標数は$\chi=2-2h$です。この公式を先ほどのセル分割に適用すると

$$
V-E+F=\chi=2-2h
$$

を得ます。特に$h=0$なら$N^2$、$h=1$なら$N^0$です。$\square$
<!-- proof-end -->

**添字を直接検算。** 一つの四価頂点を自身の二本の辺で閉じた場合、$V=1,E=2$。非交差縮約は$F=3$なので$V-E+F=2$、交差縮約は$F=1$なので$V-E+F=0$。したがって後者は前者より$N^{-2}$だけ抑制されます。これは図を描いた印象ではなく、残る独立添字の数からの結果です。

なお、種数の公式は**真空グラフ**に対するものです。演算子挿入による境界があるグラフでは、境界の本数もEuler標数に入ります。

## 3. 単一トレースと大$N$因子化

境界理論でよく現れる量は、一つの行列積の跡$\operatorname{tr}(M^r)$（$r$は正整数）です。これは行列の成分を一つの閉じた添字の輪に沿って縮約したものです。二つの跡の積$\operatorname{tr}(M^r)\operatorname{tr}(M^s)$（$r,s$は正整数）とは、跡を取る輪の個数が違います。

まず有限行列のGauss模型で、平均の周りの揺らぎを正確に計算しましょう。$\mathfrak o=N^{-1}\operatorname{tr}M^2$とすると、二点縮約を使って

$$
\begin{aligned}
\langle\operatorname{tr}M^2\rangle_0
&=\sum_{i,j}\langle M_i{}^jM_j{}^i\rangle_0
=\sum_{i,j}\frac{\lambda}{N}
=N\lambda,\\
\langle\mathfrak o\rangle_0&=\lambda.
\end{aligned}
$$

ここで$\operatorname{Var}_0(X)=\langle X^2\rangle_0-\langle X\rangle_0^2$はこのGauss期待値に関する分散です。

二つの$\operatorname{tr}M^2$の積では、[Wickの四点公式](#holo6-wick-pairings)を適用すると、各跡の内部だけで縮約する項が$(N\lambda)^2$、跡をまたぐ二通りの縮約が各$\lambda^2$なので、

$$
\langle(\operatorname{tr}M^2)^2\rangle_0
=(N\lambda)^2+2\lambda^2,\qquad
\operatorname{Var}_0(\mathfrak o)=\frac{2\lambda^2}{N^2}.
$$

この模型では、各固定$\lambda$に対して$\mathfrak o$の平均は有限のまま、揺らぎが$1/N$の大きさになります。

<a id="prop-holo6-factorization"></a>

<!-- formal-statement-start -->
> **命題（形式的な大N因子化の数え上げ）**
>
> 上のHermitian一行列模型の't Hooft展開で、固定個数$k\ge2$の正規化単一トレース観測量を考える。各$P_a$は$N$に依存しない多項式とし、観測量を

$$
\mathfrak o_a=\frac{1}{N}\operatorname{tr}P_a(M)
\qquad(a=1,\ldots,k)
$$

> で定める。摂動の固定次数における連結グラフのうち種数$h$、跡の境界数$k$の寄与は次の冪に比例する。

$$
N^{2-2h-2k}.
$$

> 特に二つの観測量の連結部分は$O(N^{-2})$から始まり、非連結積との差が抑制される。この数え上げだけから、全摂動級数や任意の強結合場の理論の厳密な極限は結論しない。
<!-- formal-statement-end -->

### 証明の見取り図

跡の挿入を境界とする曲面では、$k$個の境界によってEuler標数が$2-2h-k$になります。さらに各観測量の前の$1/N$を$k$回掛けます。

<!-- proof-start -->
### 証明

連結な閉曲面から$k$個の開円板を取り去って跡の挿入を境界にすると、Euler標数は境界一つにつき$1$減ります。したがって種数$h$の曲面で、相互作用頂点$V$、縮約辺$E$、**閉じた内部**添字面$F$を数えると、関係式は

$$
V-E+F=2-2h-k.
$$

境界を、閉じた内部添字面としてもう一度数えることはしません。相互作用頂点、縮約辺、内部添字面の係数を[リボングラフの命題](#prop-holo6-ribbon-count)と同じ手順で掛けると$N^{V-E+F}$です。$k$個の正規化された跡の係数$N^{-k}$を追加するため

$$
N^{V-E+F}N^{-k}
=N^{2-2h-k}N^{-k}
=N^{2-2h-2k}.
$$

$k=2,h=0$なら$N^{-2}$、$h\ge1$ではさらに$N^{-2h}$が掛かります。二点の非連結項はそれぞれの一トレース平均の積で$O(1)$です。よって連結部分が相対的に抑制されます。$\square$
<!-- proof-end -->

**作用素の規格化に注意。** 粒子に対応する二点関数を$O(1)$にする場合は、平均を引いた$N(\mathfrak o-\langle\mathfrak o\rangle)$のような規格化を用います。そうすると連結三点は典型的に$O(1/N)$、四点は$O(1/N^2)$です。$1/N$の冪は**どの演算子をどう規格化したか**と切り離して比較できません。

以上は行列模型の摂動論における厳密な添字計算です。四次元$\mathcal N=4$ SYMへの応用は、ゲージ固定、フェルミオン、相互作用、演算子の繰り込みを含むため、同じ平面図構造を持つという物理的対応を使います。全相関関数がこの有限行列模型と一致するわけではありません。

## 4. $N$を重力の小さい量へ翻訳する

今度は[HOLO5のD3-brane半径の関係](../HOLO5/index.md#prop-holo5-scaled-throat)に戻ります。量子重力のループを抑える自然な目安は、五次元Newton定数$G_5$をAdS半径$L$で無次元化した$G_5/L^3$です。$G_5$は長さの三乗の次元を持ちます（$\hbar=c=1$）。

ここで新たな**弦理論の入力**が必要です。IIBの標準的なEinstein枠の規格化では

$$
16\pi G_{10}=2\kappa_{10}^2=(2\pi)^7g_s^2\alpha'^4,
\qquad
G_{10}=8\pi^6g_s^2\alpha'^4.
$$

これは前節の行列計算から導ける式ではありません。十次元重力作用の正規化を指定した公式です。半径$L$の丸い五次元球面の体積は$\pi^3 L^5$であり、積空間の五次元重力の係数を得るために十次元Einstein–Hilbert作用を球面上で積分すると

$$
\frac{1}{G_5}
=\frac{\pi^3L^5}{G_{10}}.
$$

この等式は一定半径の直積背景での重力項の規格化に関するもので、任意の変形背景の単純な体積公式ではありません。

<a id="prop-holo6-newton-scaling"></a>

<!-- formal-statement-start -->
> **命題（D3-brane模型での五次元重力結合）**
>
> $N\in\mathbb Z_{>0}$、$g_s,\alpha',L>0$とし、IIB・D3-braneの標準規格化

$$
L^4=4\pi g_sN\alpha'^2,\quad
G_{10}=8\pi^6g_s^2\alpha'^4,\quad
G_5=\frac{G_{10}}{\pi^3L^5}
$$

> を入力とする。すると五次元重力結合の無次元比は

$$
\frac{G_5}{L^3}=\frac{\pi}{2N^2}.
$$

> $N\to\infty$ならこの比は零へ向かう。ただし本命題は弦の高次微分補正が同時に小さいことまで保証しない。
<!-- formal-statement-end -->

### 証明の見取り図

$G_5/L^3$の分母を$L^8$にまとめ、$L^4$の関係を二乗して$g_s^2\alpha'^4$を消去します。$N^{-2}$だけでなく係数$\pi/2$も確認します。

<!-- proof-start -->
### 証明

仮定の三式から順に

$$
\begin{aligned}
\frac{G_5}{L^3}
&=\frac{G_{10}}{\pi^3L^5L^3}
=\frac{8\pi^6g_s^2\alpha'^4}{\pi^3L^8}\\
&=\frac{8\pi^3g_s^2\alpha'^4}{(L^4)^2}.
\end{aligned}
$$

半径の式を二乗すると

$$
L^8=(4\pi g_sN\alpha'^2)^2
=16\pi^2g_s^2N^2\alpha'^4.
$$

これを代入し、正の$g_s,\alpha'$の因子を約して

$$
\frac{G_5}{L^3}
=\frac{8\pi^3g_s^2\alpha'^4}
{16\pi^2g_s^2N^2\alpha'^4}
=\frac{\pi}{2N^2}.
$$

分母が$N^2$なので極限は零です。$\square$
<!-- proof-end -->

したがって、低エネルギー五次元重力の量子ループ展開の目安は$O(N^{-2})$です。ただし文字どおりのIIB弦のループ結合は[HOLO5の関係](../HOLO5/index.md#def-holo5-t-hooft)から

$$
g_s=\frac{\lambda}{4\pi N}
$$

です。固定$\lambda$では$g_s\to0$ですが、$\lambda$も$N$とともに増やす場合は**同時の極限の経路**が重要です。$G_5/L^3$と$g_s$は異なる物理量なので、同じ数と置いてはいけません。

## 5. 古典的「弦」から局所「重力」へ進むためのもう一条件

前節で$N$が大きければ重力ループは小さくなると分かりました。しかし曲率半径が弦長と同程度なら、ループを無視しても、古典的な**弦**の高次微分効果や高質量励起を無視できません。

[HOLO5の半径と結合の式](../HOLO5/index.md#prop-holo5-scaled-throat)を使うと

$$
\frac{L^4}{\alpha'^2}=\lambda,\qquad
\frac{L}{\ell_s}=\lambda^{1/4},\qquad
\frac{\alpha'}{L^2}=\lambda^{-1/2}.
$$

左の式はD3-brane背景に固有の対応です。右端が小さいためには$\lambda\gg1$が必要です。一般に高次微分項が$\alpha'/L^2$のどの冪から始まるかは作用と観測量に依存します。IIB超弦理論の代表的な$R^4$補正は相対的に$(\alpha'/L^2)^3\sim\lambda^{-3/2}$であり、**全ての物理量の最初の補正がこの次数**という主張ではありません。

境界側からは何を見ればよいでしょうか。[HOLO4の一次演算子とWard恒等式](../HOLO4/index.md#prop-holo4-primary-ward-operators)を思い出すと、演算子のスケーリング次元$\Delta$は既習です。単一トレース演算子は単一のバルク粒子を、複数トレースは複数粒子の状態を表すというAdS/CFT辞書を**仮定**して、特にスピンが2を超える単一トレース演算子に注目します。

<a id="def-holo6-higher-spin-gap"></a>

<!-- formal-statement-start -->
> **定義（高スピン単一トレースのスペクトルギャップ）**
>
> 単一トレース演算子を区別できる共形場理論を考える。スピン$s>2$を持つ単一トレース一次演算子のスケーリング次元の下限を$\Delta_{\mathrm{gap}}$と書く（該当演算子がなければ$+\infty$とする）。$\Delta_{\mathrm{gap}}\gg1$で、注目する低エネルギーの演算子から十分に離れていることを**大きな高スピンギャップ**という。ここでは量子数の異なる軽いスカラー場・ベクトル場まで存在しないことは要求しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo6-higher-spin-gap -->
**定義の確認**： まずスピンが2を超える単一トレース一次演算子だけを抽出して、そのスケーリング次元の下限を求めます。スカラーのような別スピンの演算子は下限の計算には含めません。

**直接例と非例。** 模型Aでは$s>2$の単一トレース一次演算子の次元が$20,25,\ldots$であれば下限は$\Delta_{\mathrm{gap}}=20$です。模型Bに$s=4,\Delta=5$の演算子が一つあれば、他の高スピン演算子がどれほど重くても$\Delta_{\mathrm{gap}}\le5$です。どちらも有限値で、$\gg1$が良い近似かは要求精度次第です。模型Aに$\Delta=3$の軽いスカラーが残っていても、そのことだけでは高スピンギャップの定義に反しません。
<!-- definition-example-end -->

弦の励起質量の目安$m_s\sim1/\ell_s$を弦理論から入力すると

$$
m_sL\sim\frac{L}{\ell_s}=\lambda^{1/4}.
$$

重いバルク励起の質量が境界の大きな$\Delta$に対応するという辞書を採用する場合、$AdS_5\times S^5$の強結合領域では弦的な高スピン状態のギャップがおよそ$\lambda^{1/4}$の規模へ移動する、と期待します。**この対応の詳細や係数は本章の行列計算では証明していません**。スカラーの質量と次元の正確な関係はHOLO8で導きます。

高スピンギャップは**必要な目安であって、あらゆるCFTの局所Einstein重力双対を保証する十分条件ではありません**。低い次元の単一トレース演算子が多数残れば、それらに対応する場を有効理論へ含めなければなりません。実際に$AdS_5\times S^5$では、$S^5$上の場を球面方向の波動関数で展開した際、非定数の成分が五次元からは追加の質量をもつ場に見えます。このような成分を**Kaluza–Kleinモード**といい、「五次元の純粋Einstein重力だけ」が全てを表すわけではありません。

## 6. 二つの小さい量を同時に作る

ここまでの式を一つの表へまとめます。

| 制御したいもの | D3-brane模型の無次元の量 | 小さくする条件 | 条件だけでは分からないこと |
| --- | --- | --- | --- |
| 弦長と曲率の比 | $\alpha'/L^2=\lambda^{-1/2}$ | $\lambda\gg1$ | 重力ループの大きさ |
| 五次元重力ループ | $G_5/L^3=\pi/(2N^2)$ | $N\gg1$ | 重い弦励起の分離 |
| 摂動的弦ループ | $g_s=\lambda/(4\pi N)$ | $\lambda/N\ll4\pi$ | 局所的な低エネルギー作用 |
| 高スピン励起 | $\Delta_{\mathrm{gap}}\sim\lambda^{1/4}$（原型での目安） | 大きいギャップ | 低スピンの軽い場の個数 |

例えば$N=10^8,\lambda=10^4$なら

$$
\frac{L}{\ell_s}=10,\qquad
g_s=\frac{10^{-4}}{4\pi},\qquad
\frac{G_5}{L^3}=\frac{\pi}{2\cdot10^{16}}.
$$

**この特定の値は制御された近似の例であり、数値だけで誤差が一律に何桁以下と保証するわけではありません。** $N=10^8,\lambda=1$ならループは小さくても$L/\ell_s=1$なので弦効果が残り、$N=10^2,\lambda=10^6$なら弦長は小さくても$g_s=10^4/(4\pi)$で摂動的弦ループは抑制されません。

<a id="def-holo6-controlled-window"></a>

<!-- formal-statement-start -->
> **定義（本講の制御された超重力近似領域）**
>
> [D3-braneの双対性の原型](../HOLO5/index.md#def-holo5-prototype-duality)を前提に、$N\in\mathbb Z_{>0}$と$\lambda>0$が$N\gg1$、$\lambda\gg1$、$\lambda/(4\pi N)\ll1$を同時に満たす領域を、本講では**摂動的な超重力近似を期待できる領域**と呼ぶ。観測するエネルギーは弦励起より十分低く、境界条件を固定する。この条件は双対性の証明でも、全観測量に対する一様誤差評価でもない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo6-controlled-window -->
**定義の確認**： $N$が大きいこと、$\lambda$が大きいこと、比$\lambda/(4\pi N)$が小さいことは別条件です。三つを個別に評価し、さらに対象がD3-brane模型で弦励起より低いエネルギーを扱うという前提を確認します。

**直接例と非例。** $N=10^8,\lambda=10^4$は三条件を満たす候補です。$N=10^8,\lambda=1$は$\lambda\gg1$を満たさず、$N=100,\lambda=10^6$は$\lambda/(4\pi N)\ll1$を満たしません。さらに境界で大きなスピンの低次元演算子が残る別のCFTをこの表へ無理に代入することはできません。$N$と$\lambda$が定義されるだけで、D3-brane模型と同じスペクトルとは限らないからです。
<!-- definition-example-end -->

### $N$と$\lambda$の二重極限の順番

$N\to\infty$に沿って$\lambda=N^p$（実数$0<p<1$）を選ぶと

$$
\lambda^{-1/2}=N^{-p/2}\to0,\qquad
\frac{G_5}{L^3}=\frac{\pi}{2N^2}\to0,\qquad
g_s=\frac{N^{p-1}}{4\pi}\to0.
$$

すなわち一つの列で三つの小さい量を同時に作れます。$p=0$にすると$\lambda=1$のままで弦長補正は消えません。$p=2$にすると$g_s=N/(4\pi)$が発散します。極限とは単なる「とても大きい数」ではなく、**何を何より速く大きくするか**の指定です。

この見取り図が次講HOLO7の入口です。古典的なバルクを扱う制御条件が見えたところで、今度はバルク作用へ境界条件を課したときの変分を調べます。古典作用を評価することと境界の相関関数へ結びつけることは、さらに別の段階です。

## 7. 演習と詳細解答

<a id="ex-holo6-a1"></a>
### A1. 固定量の違い

- Level: A
- 問題: $N=20,200$で$\lambda=5$を固定する場合の$g_{\mathrm{YM}}^2$を求めよ。反対に$g_{\mathrm{YM}}^2=1/4$を固定した場合の$\lambda$をそれぞれ求めよ。

<!-- solution-start -->
**詳細解答。** ['t Hooftの大N極限](#def-holo6-t-hooft-limit)から$g_{\mathrm{YM}}^2=5/N$。順に$1/4$と$1/40$です。結合を$1/4$に固定すると$\lambda=Ng_{\mathrm{YM}}^2=N/4$なので順に$5$と$50$です。前者の列は固定$\lambda=5$ですが、後者は$N$の増加とともに$\lambda$も10倍になる列です。
<!-- solution-end -->

<a id="ex-holo6-a2"></a>
### A2. 添字の閉路

- Level: A
- 問題: 二点の式$\langle M_i{}^jM_k{}^l\rangle_0=(\lambda/N)\delta_i{}^l\delta_k{}^j$で、$\langle M_1{}^2M_2{}^1\rangle_0$と$\langle M_1{}^2M_1{}^2\rangle_0$を$N\ge2$として求めよ。

<!-- solution-start -->
**詳細解答。** 最初は$(i,j,k,l)=(1,2,2,1)$なので$\delta_i{}^l=\delta_1{}^1=1$、$\delta_k{}^j=\delta_2{}^2=1$、よって$\lambda/N$です。次は$(1,2,1,2)$なので$\delta_1{}^2=0$で積が零です。非対角成分は共役な成分と縮約して初めて零でない二点の値になります。
<!-- solution-end -->

<a id="ex-holo6-a3"></a>
### A3. 平面図と交差図の次数

- Level: A
- 問題: 連結真空リボングラフで$(V,E,F)=(1,2,3)$と$(1,2,1)$の$N$次数と種数をそれぞれ求めよ。前者に対する後者の相対次数も答えよ。

<!-- solution-start -->
**詳細解答。** [リボングラフの命題](#prop-holo6-ribbon-count)に$V-E+F$を代入します。最初は$1-2+3=2$なので$2-2h=2$から$h=0$、寄与は$N^2$。次は$1-2+1=0$なので$h=1$、寄与は$N^0$。比は$N^0/N^2=N^{-2}$です。同じ頂点数と辺数を持っても添字の閉路数で差が生まれます。
<!-- solution-end -->

<a id="ex-holo6-a4"></a>
### A4. 曲率とループの目安

- Level: A
- 問題: $N=10^4,\lambda=10^4$のD3-brane模型について、$L/\ell_s$、$\alpha'/L^2$、$g_s$、$G_5/L^3$を求めよ。

<!-- solution-start -->
**詳細解答。** $L/\ell_s=\lambda^{1/4}=10$。$\alpha'/L^2=\lambda^{-1/2}=10^{-2}$。$g_s=\lambda/(4\pi N)=1/(4\pi)$。[D3-brane模型での五次元重力結合](#prop-holo6-newton-scaling)から$G_5/L^3=\pi/(2\cdot10^8)$です。$g_s$は約$0.080$で1より小さいものの、精度を指定せず一律に「十分小さい」と断定しないことが重要です。
<!-- solution-end -->

<a id="ex-holo6-a5"></a>
### A5. 正規化された跡の平均

- Level: A
- 問題: Gauss行列模型で$\mathfrak o=(1/N)\operatorname{tr}M^2$とする。与えられた二点縮約を使って$\langle\mathfrak o\rangle_0$を求め、$N$によらない理由を示せ。

<!-- solution-start -->
**詳細解答。** $\operatorname{tr}M^2=\sum_{i,j}M_i{}^jM_j{}^i$です。二点式へ$(k,l)=(j,i)$を代入すると$\langle M_i{}^jM_j{}^i\rangle_0=(\lambda/N)\delta_i{}^i\delta_j{}^j=\lambda/N$。各$i,j$には$N^2$通りあるので$\langle\operatorname{tr}M^2\rangle_0=N^2(\lambda/N)=N\lambda$。さらに$1/N$を掛けると$\langle\mathfrak o\rangle_0=\lambda$です。$N$の打消しは観測量の前の正規化によります。
<!-- solution-end -->

<a id="ex-holo6-b1"></a>
### B1. 四次のWick縮約を全て数える

- Level: B
- 問題: 上のGauss模型で$\langle\operatorname{tr}M^4\rangle_0$を三通りのWick縮約から求めよ。どの項が平面図でどの項が種数1かを、自由に残る添字の個数から判定せよ。

<!-- solution-start -->
**詳細解答。** $\operatorname{tr}M^4=\sum_{i,j,k,l}M_i{}^jM_j{}^kM_k{}^lM_l{}^i$です。[Wickの四点公式](#holo6-wick-pairings)から縮約は三通りで、各縮約は$\lambda/N$を出します。
$(1,2)(3,4)$では一組目により$i=k$で、$i,j,l$が自由なので$N^3$。
$(1,4)(2,3)$では一組目により$j=l$で、$i,j,k$が自由なので$N^3$。
$(1,3)(2,4)$では一組目が$i=l,\ j=k$、二組目が$j=i,\ k=l$を与え、結局$i=j=k=l$で自由添字は1個、$N$通りです。
各項に$(\lambda/N)^2$を掛けるから

$$
\langle\operatorname{tr}M^4\rangle_0
=\frac{\lambda^2}{N^2}(N^3+N^3+N)
=2\lambda^2N+\frac{\lambda^2}{N}.
$$

四価相互作用の係数$Nu/(4\lambda)$まで掛けると平面図の先頭は$O(N^2)$、交差図は$O(N^0)$です。$V=1,E=2$で$F=3$なら種数0、$F=1$なら種数1で、[命題](#prop-holo6-ribbon-count)とも一致します。
<!-- solution-end -->

<a id="ex-holo6-b2"></a>
### B2. 因子化をWickの式から再現する

- Level: B
- 問題: $\mathfrak o=(1/N)\operatorname{tr}M^2$について、$\langle\mathfrak o^2\rangle_0$と$\langle\mathfrak o\rangle_0^2$を計算し、差が$2\lambda^2/N^2$になることを示せ。

<!-- solution-start -->
**詳細解答。** [Wickの四点公式](#holo6-wick-pairings)で四成分を三通りに組みます。二つの跡の内部だけを縮約する寄与は$\langle\operatorname{tr}M^2\rangle_0^2=N^2\lambda^2$です。跡をまたぐ縮約は二通り。例えば

$$
\sum_{i,j,k,l}
\langle M_i{}^jM_k{}^l\rangle_0
\langle M_j{}^iM_l{}^k\rangle_0
=\frac{\lambda^2}{N^2}\sum_{i,j,k,l}
\delta_i{}^l\delta_k{}^j\delta_j{}^k\delta_l{}^i.
$$

Kronecker記号で$l=i,k=j$が課されて自由添字は$i,j$の$N^2$通りです。よってこの項は$\lambda^2$。もう一つの交差の仕方でも$\lambda^2$となります。したがって

$$
\langle\mathfrak o^2\rangle_0
=\frac{N^2\lambda^2+2\lambda^2}{N^2}
=\lambda^2+\frac{2\lambda^2}{N^2},\quad
\langle\mathfrak o\rangle_0^2=\lambda^2.
$$

引き算により連結部分は$2\lambda^2/N^2$です。平均が$O(1)$でも揺らぎは$O(N^{-2})$で抑制されます。
<!-- solution-end -->

<a id="ex-holo6-b3"></a>
### B3. 十次元から五次元へ

- Level: B
- 問題: $G_{10}=8\pi^6g_s^2\alpha'^4$、球面体積$V_5=\pi^3L^5$、$L^4=4\pi g_sN\alpha'^2$を前提に、$G_5/L^3$と$L^3/G_5$を導け。次元も確認せよ。

<!-- solution-start -->
**詳細解答。** 球面体積で割ると$G_5=G_{10}/(\pi^3L^5)=8\pi^3g_s^2\alpha'^4/L^5$。従って

$$
\frac{G_5}{L^3}
=\frac{8\pi^3g_s^2\alpha'^4}{L^8}
=\frac{8\pi^3g_s^2\alpha'^4}
{16\pi^2g_s^2N^2\alpha'^4}
=\frac{\pi}{2N^2}.
$$

逆数を取ると$L^3/G_5=2N^2/\pi$。$G_{10}$は長さの8乗、$V_5$は長さの5乗なので$G_5$は長さの3乗、両比は無次元です。正の$N$なので逆数を取る操作も正当です。
<!-- solution-end -->

<a id="ex-holo6-b4"></a>
### B4. 同時極限と近似条件

- Level: B
- 問題: $\lambda=N^p$（$N\to\infty$、$p$は固定した実数）で$\alpha'/L^2$、$G_5/L^3$、$g_s$の極限を求め、三つが零へ向かう$p$の範囲を判定せよ。

<!-- solution-start -->
**詳細解答。** [D3-braneの半径の関係](../HOLO5/index.md#prop-holo5-scaled-throat)と[D3-brane模型での五次元重力結合](#prop-holo6-newton-scaling)を使います。各式へ$\lambda=N^p$を代入すると

$$
\begin{aligned}
\frac{\alpha'}{L^2}&=\lambda^{-1/2}=N^{-p/2},\\
\frac{G_5}{L^3}&=\frac{\pi}{2N^2},\\
g_s&=\frac{\lambda}{4\pi N}=\frac{N^{p-1}}{4\pi}.
\end{aligned}
$$

まず第一式が零に収束するのは指数$-p/2<0$、すなわち$p>0$の場合です。第二式は$p$と無関係に零へ向かいます。第三式は$p-1<0$、すなわち$p<1$のときだけ零へ向かいます。よって三条件を同時に満たす範囲は

$$
0<p<1
$$

です。境界の$p=0$では$\alpha'/L^2=1$が残ります。$p=1$では$g_s=1/(4\pi)$が一定で零へ収束しません。$p>1$では$g_s$が発散します。端点を除く理由は、各冪が負となる条件を満たさないためです。
<!-- solution-end -->

<a id="ex-holo6-c1"></a>
### C1. 大$N$だけで重力になるか

- Level: C
- 問題: D3-brane模型で、$N\to\infty$に沿う三つの列 (I) $\lambda=1$、(II) $\lambda=N^{1/2}$、(III) $\lambda=N^2$を比較せよ。(a) 各列の$\alpha'/L^2$、$g_s$、$G_5/L^3$の極限、(b) どれが摂動的な超重力近似を同時に満たすか、(c) 一般の大$N$ CFTへこの判定をそのまま移せない理由を、低い次元の高スピン単一トレース演算子という観点から論ぜよ。

<!-- solution-start -->
**詳細解答。** 一般式は

$$
\frac{\alpha'}{L^2}=\lambda^{-1/2},\qquad
g_s=\frac{\lambda}{4\pi N},\qquad
\frac{G_5}{L^3}=\frac{\pi}{2N^2}.
$$

(I) $\lambda=1$なら順に$1$、$1/(4\pi N)\to0$、$\pi/(2N^2)\to0$。弦長が曲率半径と同程度なので、量子ループが小さくても弦の高次微分効果を無視する根拠がありません。

(II) $\lambda=N^{1/2}$なら$\alpha'/L^2=N^{-1/4}\to0$、$g_s=N^{-1/2}/(4\pi)\to0$、$G_5/L^3=\pi/(2N^2)\to0$です。十分大きい$N$で三条件を同時に満たす制御された列です。ただし近似対象のエネルギーを弦スケールより下に取る条件は別に指定します。

(III) $\lambda=N^2$なら$\alpha'/L^2=N^{-1}\to0$、$g_s=N/(4\pi)\to\infty$、$G_5/L^3=\pi/(2N^2)\to0$です。曲率は小さい一方、**摂動的な弦ループ**は制御されません。$G_5/L^3$が小さいことと$g_s$が小さいことは同値ではありません。

(c) この三式は特定の[HOLO5のD3-brane双対性原型](../HOLO5/index.md#def-holo5-prototype-duality)の規格化に依存します。一般のCFTに同じ$\alpha'$や$g_s$を与えることはできません。大$N$で相関関数が因子化しても、$s>2$の単一トレース一次演算子に低い$\Delta$が無数に残るなら、境界辞書上は多数の軽い高スピン場が必要となり、少数の場による局所Einstein作用だけへの打切りは正当化できません。したがって古典性を支える大$N$と、局所的な低エネルギー重力を支えるスペクトル上の条件は別々に検査しなければなりません。
<!-- solution-end -->

## 8. 結論と次への問い

この講義で**行列模型から計算したこと**は、二重線の閉路数から$N^{2-2h}$が生じ、正規化単一トレース量が大$N$で因子化することです。**弦理論の規格化を入力して導いたこと**は$G_5/L^3=\pi/(2N^2)$と$L/\ell_s=\lambda^{1/4}$の別々の制御条件です。**双対性を仮定して期待すること**は、単一トレース高スピンギャップが十分大きいとき低エネルギーの局所重力記述が有効になり得る、という対応です。

次のHOLO7では、古典作用に境界値を指定し、変分したときどの境界項が残るかを実際に計算します。大$N$の条件が整っていても、境界値問題を定めずに相関関数を読み取ることはできません。

**参考文献（導出の外部入力の所在）**：Aharonyほか「[Large N Field Theories, String Theory and Gravity](https://arxiv.org/abs/hep-th/9905111)」、Harlow「[TASI Lectures on the Emergence of the Bulk in AdS/CFT](https://arxiv.org/abs/1802.01040)」。本講では引用先の全弦理論を証明したとはせず、上の各式がどこから入力されたかを区別しました。
