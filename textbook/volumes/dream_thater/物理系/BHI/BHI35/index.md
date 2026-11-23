# BHI35 四次元・実在ブラックホールへの外挿

<!-- definition-example-audit: strict -->

## 1. 二次元のPage曲線から、どの四次元計算へ進むか

[BHI34のJTとRSTの比較](../BHI34/index.md#def-bhi34-rst-setting)では、作用・境界条件・終期が違っても放射領域と一般化エントロピーの候補を明示すれば、同じ手順でPage曲線を調べられることを学びました。ここで次の問いが生じます。宇宙に存在する四次元ブラックホールでも、同じ計算の各段階を実行できるでしょうか。

本講では四次元・漸近平坦・非荷電・非回転のSchwarzschildブラックホールを基本例とします。**四次元で実際に計算できる放射のスペクトルとエネルギー収支**を最初に作り、**その計算からはまだ決まらない精細エントロピーとislandの条件**を続けて調べます。回転・荷電・外部環境・蒸発終期は条件を変える例として最後に扱います。

計量符号を $(-,+,+,+)$、自然単位を $G=\hbar=c=k_B=1$ とし、長さと質量はPlanck単位、時間は遠方で規格化した時計の時間 $u$ とします。$M(u)\gg1$ の、曲率が小さく変化の遅い有限区間を扱います。放射領域 $R(u)$ は、時刻 $u$ までに遠方の収集器に届いた出射場のうち**どのモードを採取したか**まで指定したものです。対数は自然対数、エントロピーの単位は nat です。

本講の到達点は次の四つです。

1. 角運動量ごとの障壁から灰色体因子が生まれる式を再構成する。
2. エネルギー光度とモードごとの粗視化エントロピーを区別し、Page交点の入力を吟味する。
3. 四次元の面積項と量子物質項から、island端点に必要な停留条件を計算する。
4. 定常模型のisland、蒸発時空の精細エントロピー、操作的復号と観測を混同せずに判定する。

## 2. 角運動量障壁と四次元の放出モード

Schwarzschild計量を、地平線の外側 $r>r_h=2M$ で

$$
ds^2=-f(r)\,dt^2+\frac{dr^2}{f(r)}+r^2d\Omega_2^2,
\qquad f(r)=1-\frac{2M}{r}
$$

と書きます。$d\Omega_2^2=d\theta^2+\sin^2\theta\,d\varphi^2$ は単位二球面の計量です。地平線の表面積は $A_h=4\pi(2M)^2=16\pi M^2$、[Schwarzschild面積エントロピー](../../BHT/BHT9/index.md#prop-bht9-schwarzschild-entropy)は $S_{\rm BH}=A_h/4=4\pi M^2$ です。[Hawking温度と遠方光度の既習結果](../../QCURV/QCURV21/index.md#thm-qcurv21-flux-chain)から $T_H=(8\pi M)^{-1}$ を使います。

四次元の場は、時間と半径だけでなく球面上にも振動します。球面調和関数 $Y_{\ell m}$ は

$$
\Delta_{S^2}Y_{\ell m}=-\ell(\ell+1)Y_{\ell m},
\quad \ell=0,1,2,\ldots,\quad m=-\ell,\ldots,\ell
$$

を満たし、同じ $\ell$ には $2\ell+1$ 個の $m$ が存在します。以下は**質量零・最小結合の実スカラー場**に限定した直接計算です。光子や重力子では許容される $\ell$ と摂動ポテンシャルが変わります。

<a id="def-bhi35-scalar-channel"></a>

<!-- formal-statement-start -->
> **定義（Schwarzschildスカラー放射チャネル）**
>
> $M>0$ を固定し、$r>2M$ の外部で $\Box_g\phi=0$ を満たす質量零スカラー場を考える。周波数 $\omega>0$、整数 $\ell\ge0$、$-\ell\le m\le\ell$ に対して、分離形と亀座標 $r_*$ を

$$
\phi_{\omega\ell m}(t,r,\theta,\varphi)
=e^{-i\omega t}Y_{\ell m}(\theta,\varphi)\frac{\psi_{\omega\ell}(r)}{r},
\qquad \frac{dr_*}{dr}=\frac1{f(r)}
$$

> と定める。遠方から入射した単位流束の波について、地平線へ透過した流束の比を $\Gamma_\ell(\omega;M)$ と呼ぶ。外部ポテンシャルが実数で、吸収・増幅源を外部に置かない散乱問題では $0\le\Gamma_\ell\le1$ である。
<!-- formal-statement-end -->

$\Gamma_\ell$ は「地平線の熱因子そのもの」ではありません。外部で散乱された波の**透過確率**を、同じ遠方時計で測った流束から定めます。実係数の一次元散乱方程式へ落とせることを次に示します。

<!-- definition-example-start: def-bhi35-scalar-channel -->
**定義の確認**：$\ell=0$ なら $m=0$ は一通り、$\ell=1$ なら $m=-1,0,1$ の三通りで、縮退度はそれぞれ $1,3$ です。単位入射流束が反射 $0.7$、透過 $0.3$ に分かれる損失のない外部散乱の例では、流束保存から $\Gamma_\ell=0.3$ となり $0\le\Gamma_\ell\le1$ を直接満たします。これは説明用の散乱値であり、特定のSchwarzschildモードを解いた数値ではありません。
<!-- definition-example-end -->

<a id="prop-bhi35-scalar-potential"></a>

<!-- formal-statement-start -->
> **命題（質量零スカラー場の角運動量散乱ポテンシャル）**
>
> $M>0$、$r>2M$、$\omega>0$ とし、上の分離形のスカラー場が $\Box_g\phi=0$ を満たすとする。半径関数 $\psi=\psi_{\omega\ell}$ は

$$
\frac{d^2\psi}{dr_*^2}
+\bigl(\omega^2-V_\ell(r)\bigr)\psi=0,\qquad
V_\ell(r)=\left(1-\frac{2M}{r}\right)
\left(\frac{\ell(\ell+1)}{r^2}+\frac{2M}{r^3}\right)
$$

> を満たす。各 $\ell\ge0$ で $V_\ell(r)>0$ は $r>2M$、$V_\ell\to0$ は $r\to2M+$ および $r\to\infty$ で成立する。
<!-- formal-statement-end -->

**証明の見取り図**：波動演算子を時間・半径・球面に分け、球面固有値を代入し、最後に $r_*$ へ座標変換して一階微分を消します。

<!-- proof-start -->
### 証明

$\sqrt{-g}=r^2\sin\theta$ なので、$\Box_g\phi=0$ は

$$
-\frac1f\partial_t^2\phi
+\frac1{r^2}\partial_r(r^2f\partial_r\phi)
+\frac1{r^2}\Delta_{S^2}\phi=0
$$

です。$\phi=e^{-i\omega t}Y_{\ell m}\psi(r)/r$ を代入し、球面固有値を使います。半径微分の中身は

$$
r^2f\partial_r(\psi/r)=f(r\psi'-\psi),
\quad
\partial_r[f(r\psi'-\psi)]
=f'(r\psi'-\psi)+fr\psi''
$$

です。共通因子 $e^{-i\omega t}Y_{\ell m}/r$ を除くと

$$
\frac{\omega^2}{f}\psi
+f\psi''+f'\psi'-\frac{f'}r\psi
-\frac{\ell(\ell+1)}{r^2}\psi=0.
$$

両辺に $f$ を掛け、$dr/dr_*=f$ と連鎖律から

$$
\frac{d^2\psi}{dr_*^2}
=f^2\psi''+ff'\psi'
$$

を代入します。よってポテンシャルは $f(f'/r+\ell(\ell+1)/r^2)$ で、$f'=2M/r^2$ が表示式を与えます。$r>2M$ では $f>0$、第二因子は $2M/r^3>0$ を含むため正です。両端での極限も各項から従います。$\square$
<!-- proof-end -->

$\ell=0$ でも $2M/r^3$ が残る点が重要です。「$s$ 波だから散乱がない」と結論してはいけません。各チャネルの正確な透過率は、この微分方程式へ地平線では純粋な入射波、遠方では入射波と反射波という境界条件を課して求めます。

実ポテンシャルについて保存されるWronskian流束は

$$
J=\frac1{2i}\left(\psi^*\frac{d\psi}{dr_*}
-\psi\frac{d\psi^*}{dr_*}\right).
$$

遠方の単位振幅入射波と反射波、地平線側の透過波を同じ周波数で比較すると $1=|\mathcal R_\ell|^2+|\mathcal T_\ell|^2$ であり、$\Gamma_\ell=|\mathcal T_\ell|^2$ です。これは正周波数のSchwarzschild**非回転**散乱での関係です。回転系の超放射にはそのまま使いません。

## 3. 灰色体因子を通した光度と放射の粗視化

[BHI4のエネルギー収支模型](../BHI4/index.md#def-bhi4-energy-ledger)では光度から質量軌道を求めました。ここでは、透過率が変わると放射の熱的占有数がどう変わるかまで計算します。

<a id="def-bhi35-outgoing-entropy"></a>

<!-- formal-statement-start -->
> **定義（独立スカラー出射モードの粗視化エントロピー）**
>
> $M>0$ を固定する瞬間静的Schwarzschild近似を考える。各 $(\omega,\ell,m)$ について外部へ入射する独立モードを真空とし、地平線由来の正規化された熱的なボソンモードと、透過確率 $\Gamma_\ell\in[0,1]$ をもつ線形散乱を仮定する。遠方へ届くモードの平均粒子数を

$$
n_H(\omega;M)=\frac1{e^{\omega/T_H}-1},\qquad
n_{\omega\ell}=\Gamma_\ell(\omega;M)n_H(\omega;M)
$$

> とする。平均占有数 $n\ge0$ の幾何分布型熱的モードのvon Neumannエントロピーを、$0\log0=0$ として

$$
g(n)=(1+n)\log(1+n)-n\log n,\qquad g(0)=0
$$

> と定める。相互相関を捨てた独立モードの和を、この節の出射放射の粗視化エントロピーと呼ぶ。
<!-- formal-statement-end -->

ここでエントロピー公式を確かめておきます。平均占有数 $n>0$ に対して $q=n/(1+n)\in(0,1)$ と置くと、熱的モードの粒子数分布は $p_k=(1-q)q^k$ ($k=0,1,\ldots$) です。幾何級数から $\sum_{k\ge0}p_k=1$、$\sum_{k\ge0}kp_k=q/(1-q)=n$ です。従って

$$
\begin{aligned}
-\sum_{k=0}^\infty p_k\log p_k
&=-\log(1-q)\sum_{k\ge0}p_k
-\log q\sum_{k\ge0}kp_k\\
&=-\log(1-q)-n\log q\\
&=(n+1)\log(n+1)-n\log n=g(n).
\end{aligned}
$$

$q\to0$ では真空分布 $p_0=1$ へ近づき、$g(0)=0$ と連続につながります。この導出に使ったのは熱的な**一モードの粒子数分布**であり、放射全体の相関が消えるという仮定ではありません。

この定義の「熱的」は**各出射モードの縮約状態**についての仮定です。全時刻・全モードをまとめた放射の密度行列 $\rho_R$ が積状態だとは主張していません。[粗視化と精細エントロピーの区別](../BHI5/index.md#prop-bhi5-entropy-hierarchy)が、ここで決定的になります。

<!-- definition-example-start: def-bhi35-outgoing-entropy -->
**定義の確認**：地平線のある一モードで $n_H=1$、透過率 $\Gamma=1/2$ とします。$n_{\rm out}=1/2\ge0$、$g(n_{\rm out})=\frac32\log(3/2)-\frac12\log(1/2)>0$ です。一方、同じ粒子数がすべて通る場合は $g(1)=2\log2$、$\Gamma=0$ なら $g(0)=0$。粒子数に $\Gamma$ を掛けてから $g$ を評価するのであり、エントロピーを単純に $\Gamma g(n_H)$ とする規則ではありません。
<!-- definition-example-end -->

<a id="prop-bhi35-boson-entropy"></a>

<!-- formal-statement-start -->
> **命題（熱的モードエントロピーの単調性と凹性）**
>
> $g(0)=0$、$g(n)=(1+n)\log(1+n)-n\log n$ ($n>0$) とする。このとき $n>0$ で $g'(n)>0$、$g''(n)<0$ であり、任意の $n\ge0$、$0\le\Gamma\le1$ に対し

$$
\Gamma g(n)\le g(\Gamma n)\le g(n)
$$

> が成立する。
<!-- formal-statement-end -->

**証明の見取り図**：導関数で増加と凹性を確かめ、$(\Gamma n)=(\Gamma n+(1-\Gamma)0)$ に凹性を使います。

<!-- proof-start -->
### 証明

$n>0$ では積の微分により

$$
g'(n)=\log(1+n)+1-\log n-1
=\log\left(1+\frac1n\right)>0.
$$

さらに

$$
g''(n)=\frac1{n+1}-\frac1n=-\frac1{n(n+1)}<0.
$$

また $\lim_{n\downarrow0}n\log n=0$ から $g$ は $n=0$ へ連続に拡張できます。凹性より

$$
g(\Gamma n+(1-\Gamma)0)
\ge\Gamma g(n)+(1-\Gamma)g(0)=\Gamma g(n).
$$

単調性と $0\le\Gamma n\le n$ から上界も従います。端点 $n=0$、$\Gamma=0,1$ は直接等式を確かめられます。$\square$
<!-- proof-end -->

各モードを区間の波束へ離散化し、独立性と和・積分の収束を仮定して連続極限をとると、出射スカラー一種類について**エネルギー光度** $P$ と**粗視化エントロピー流** $\dot S_{\rm out}^{\rm coarse}$ の形式が得られます。

<a id="prop-bhi35-greybody-flux"></a>

<!-- formal-statement-start -->
> **命題（四次元スカラーの光度と粗視化エントロピー流）**
>
> 質量零・最小結合スカラー場一種類、瞬間静的Schwarzschild背景、無入射真空、モード独立な線形散乱、遠方での波束の状態の熱性を仮定する。モード和と積分が絶対収束するなら、遠方時計の単位時間あたり

$$
P(M)=\frac1{2\pi}\sum_{\ell=0}^\infty(2\ell+1)
\int_0^\infty\omega\,\Gamma_\ell(\omega;M)n_H(\omega;M)\,d\omega,
$$

$$
\dot S_{\rm out}^{\rm coarse}(M)
=\frac1{2\pi}\sum_{\ell=0}^\infty(2\ell+1)
\int_0^\infty g\!\left(\Gamma_\ell(\omega;M)n_H(\omega;M)\right)d\omega
$$

> と表される。各モードで $g(\Gamma_\ell n_H)\ge\Gamma_\ell g(n_H)$ だが、これらだけから $\dot S_{\rm out}^{\rm coarse}/(-\dot S_{\rm BH})$ が一定値になるとはいえない。
<!-- formal-statement-end -->

**証明の見取り図**：一モードの平均エネルギー $\omega n$ とエントロピー $g(n)$ を、角運動量の縮退度と遠方時計による状態密度 $d\omega/(2\pi)$ で足します。最後の非普遍性は $\omega$ と $\Gamma_\ell$ への依存を見ることで判定します。

<!-- proof-start -->
### 証明

幅 $du$ の時間波束と幅 $d\omega$ の周波数帯に含まれる独立振動子数は、各 $m$ について $du\,d\omega/(2\pi)$ です。各振動子は平均占有数 $\Gamma_\ell n_H$、平均エネルギー $\omega\Gamma_\ell n_H$、エントロピー $g(\Gamma_\ell n_H)$ を持ちます。$m=-\ell,\ldots,\ell$ を数えると縮退度 $2\ell+1$ を掛けることになり、$du$ で割った後に周波数を積分して二式を得ます。

[前命題の凹性](#prop-bhi35-boson-entropy)を $n=n_H$ に適用すると、各周波数・角運動量で $g(\Gamma_\ell n_H)\ge\Gamma_\ell g(n_H)$ です。ところが分母となる面積エントロピー減少率は、[エネルギー収支と面積エントロピー](../BHI4/index.md#prop-bhi4-horizon-entropy-rate)の仮定下で $P/T_H$ であり、分子には $g(\Gamma_\ell n_H)$、分母には $\omega\Gamma_\ell n_H/T_H$ が現れます。二つの被積分関数は一般に定数倍ではありません。$\square$
<!-- proof-end -->

$\Gamma_\ell=0$ のモードはエネルギーもエントロピーも運びません。$\Gamma_\ell=1$ のモードは熱的占有数を保ちます。しかし $\Gamma_\ell$ をどの $\ell$ にも一律1とすると、高角運動量の遠方散乱を無視するため、実際の四次元Schwarzschild放射の精度を得たことにはなりません。

フェルミオンについては、平均占有数 $0\le p\le1$ の一モードのエントロピー $h(p)=-p\log p-(1-p)\log(1-p)$ とFermi–Dirac占有数を使います。光子と重力子では許容されるスピン・角運動量モードも異なります。したがって粒子種ごとの正しい透過係数を求め、**同じ集合の出射自由度**について和を取り直す必要があります。

## 4. 質量の三乗則とPage交点を四次元で読む

$P(M)>0$ を正味の遠方光度とし、外部からの降着を無視します。[BHI4の質量三乗則](../BHI4/index.md#thm-bhi4-fraction-time)は、質量零の放出種が変わらず $P(M)=C/M^2$ （定数 $C>0$）となるとき、

$$
\dot M=-\frac C{M^2},
\qquad
M(u)^3=M_0^3-3C(u-u_0)
$$

となると示しました。ここでは $M(u)\ge M_{\rm cut}\gg1$ の間だけ使用します。$M$ が小さくなって重い粒子種の放出が開くと、$C$ は一定とは限りません。

放射の粗視化エントロピーを積分した量を $S_{\rm rad}^{\rm coarse}$ とし、正値のエントロピー比を

$$
\beta(M):=
\frac{\dot S_{\rm rad}^{\rm coarse}}
{-\dot S_{\rm BH}}
=\frac{T_H(M)\dot S_{\rm rad}^{\rm coarse}(M)}{P(M)}
$$

とします。この $\beta$ は、指定した散乱・放射モードの集合・状態で変わります。**理想黒体の $4/3$ と二次元一方向放射の $2$ は同じ係数ではありません**。四次元の粒子種・灰色体散乱を解かないまま、二次元の二倍則を流用できません。

[BHI8の放射エントロピー収支とPage交点](../BHI8/index.md#thm-bhi8-constant-page-time)を使い、$\beta$ が一定のときは

$$
S_{\rm rad}^{\rm coarse}(M)
=\beta\bigl(S_0-S_{\rm BH}(M)\bigr),\qquad S_0=4\pi M_0^2
$$

です。収支**予想**として精細エントロピーを

$$
S_{\rm Page}^{\rm proxy}(M)=
\min\left\{\beta(S_0-4\pi M^2),\,4\pi M^2\right\}
$$

と置けば、交点は

$$
\frac{M_{\rm Page}^2}{M_0^2}
=\frac{\beta}{1+\beta},\qquad
\frac{u_{\rm Page}-u_0}{u_{\rm formal}-u_0}
=1-\left(\frac{\beta}{1+\beta}\right)^{3/2}.
$$

ただし $u_{\rm formal}=u_0+M_0^3/(3C)$ は三乗則を $M=0$ まで**形式的に**伸ばした基準時間で、半古典的な終期の計算結果ではありません。交点が近似の適用区間 $[M_{\rm cut},M_0]$ 内にあるかも必ず確認します。

**検算例**：Page（2013）が取り上げた、四次元の大きなSchwarzschildブラックホールから空の空間へ**光子と重力子**を放出する数値評価では、粗視化エントロピー生成率の比として約 $\beta=1.4847$ が得られています。これはスピンごとの灰色体散乱を含む**限定された粒子内容**の値であり、標準模型のすべての粒子を含む普遍定数ではありません。この数値を上の収支予想へ入力すると

$$
\frac{S_{\rm BH}(M_{\rm Page})}{S_0}
=\frac{1.4847}{2.4847}\simeq0.5975,\qquad
\frac{u_{\rm Page}-u_0}{u_{\rm formal}-u_0}
\simeq0.538.
$$

つまり光子・重力子という設定では、収支予想上のPage時刻は形式寿命の「半分強」に相当します。これは**精細エントロピーの四次元レプリカ経路積分を完遂して得た数字ではありません**。また[BHI34の二次元一定流束で得た三分の一](../BHI34/index.md#prop-bhi34-page-crossing)との差は、空間次元だけでなく放出種・エントロピー生成率・温度の時間変化から生じます。

## 5. 四次元island候補に必要な停留条件

二次元ではdilatonの値が重力のエントロピー項でした。四次元では二次元の点に対応する境界は、通常**面積を持つ二次元の曲面**です。まず[BHI30の条件付きisland則](../BHI30/index.md#prop-bhi30-conditional-island)を、四次元で検討すべき候補の形に書き直します。

<a id="def-bhi35-four-d-qes-ledger"></a>

<!-- formal-statement-start -->
> **定義（四次元island候補の一般化エントロピー台帳）**
>
> 遠方の採取領域 $R$、候補island $I$、その滑らかな境界曲面 $\partial I$、同一の量子状態と紫外正則化を固定する。曲面の面積を $A(\partial I)$ とし、同一規約で繰り込まれた物質エントロピー $S_{\rm bulk}^{\rm ren}(R\cup I)$ と重力結合 $G_{\rm ren}$ を用いて

$$
S_{\rm gen}[I;R]
=\frac{A(\partial I)}{4G_{\rm ren}}
+S_{\rm bulk}^{\rm ren}(R\cup I)+S_{\rm higher}[I]
$$

> と記す。$S_{\rm higher}$ は高次曲率作用等から生じる追加の重力エントロピー項を表し、Einstein作用の先頭近似では零とする。候補の量子極値曲面（QES）とは、許された**全独立な変形方向**について $\delta S_{\rm gen}=0$ を満たす曲面とする。
<!-- formal-statement-end -->

$S_{\rm bulk}^{\rm ren}$ と面積項は**同じcutoffの変更に対して整合する組**として扱います。個別の裸の発散を、そのまま別々の物理量として比較することはできません。$R$ が遠方の放射を指すことも、二次元の非重力浴を設置したことと同義ではありません。

<!-- definition-example-start: def-bhi35-four-d-qes-ledger -->
**定義の確認**：球対称な試験曲面 $r=a>0$ では、角座標 $(\theta,\varphi)$ に誘導される計量は $a^2(d\theta^2+\sin^2\theta\,d\varphi^2)$ です。面積要素は $a^2\sin\theta\,d\theta\,d\varphi$ なので、$\int_0^{2\pi}d\varphi\int_0^\pi a^2\sin\theta d\theta=4\pi a^2$ です。$G_{\rm ren}=1$、高次項零の先頭近似なら、一般化エントロピーの第一項は $\pi a^2$ と確認できます。**球面形を選んだだけでは時間方向や非球対称の変形は検査していません。**
<!-- definition-example-end -->

<a id="prop-bhi35-spherical-extremality"></a>

<!-- formal-statement-start -->
> **命題（球対称制限におけるQES停留方程式）**
>
> $G_{\rm ren}>0$ が固定で、高次項を零とする。候補曲面を球面 $r=a$（$a$ は開区間 $J\subset(0,\infty)$ の座標）に制限し、$S_{\rm bulk}^{\rm ren}(a,t)$ が $a,t$ の連続微分可能な関数であるとする。球面半径と端点時刻を独立に変形した停留点 $(a_*,t_*)$ は

$$
\frac{2\pi a_*}{G_{\rm ren}}
+\partial_a S_{\rm bulk}^{\rm ren}(a_*,t_*)=0,
\qquad
\partial_t S_{\rm bulk}^{\rm ren}(a_*,t_*)=0
$$

> を満たす。ただしこの二式は**球対称に制限した必要条件**であって、非球対称変形・Lorentzian鞍点の妥当性やレプリカ鞍点の存在を保証しない。
<!-- formal-statement-end -->

**証明の見取り図**：面積 $A(a)=4\pi a^2$ を半径で微分し、時刻微分には面積の陽な $t$ 依存がないことを使います。

<!-- proof-start -->
### 証明

一般化エントロピーは、固定した採取領域 $R$ のもとで

$$
S_{\rm gen}(a,t)=\frac{4\pi a^2}{4G_{\rm ren}}
+S_{\rm bulk}^{\rm ren}(a,t)
=\frac{\pi a^2}{G_{\rm ren}}+S_{\rm bulk}^{\rm ren}(a,t)
$$

です。したがって

$$
\partial_a S_{\rm gen}
=\frac{2\pi a}{G_{\rm ren}}+\partial_a S_{\rm bulk}^{\rm ren},
\quad
\partial_t S_{\rm gen}=\partial_t S_{\rm bulk}^{\rm ren}.
$$

各偏微分を同時に零と置いて式が得られます。球面形に制限していない角依存の変形は、これらの偏微分からは検出されません。$\square$
<!-- proof-end -->

**手で解ける補助模型**：$G_{\rm ren}=1$、$a>r_h>0$、$k,L>0$、$S_{\rm bulk}^{\rm toy}(a)=S_{\rm ref}-k\log((a-r_h)/L)$ と置くと、放射との相関を仮に対数で模した半径方向の停留条件は

$$
2\pi a-\frac{k}{a-r_h}=0
\quad\Longleftrightarrow\quad
a^2-r_ha-\frac{k}{2\pi}=0
$$

となります。正の根は

$$
a_*=\frac{r_h+\sqrt{r_h^2+2k/\pi}}2>r_h,
\qquad
a_*-r_h=\frac{k}{\pi\bigl(r_h+\sqrt{r_h^2+2k/\pi}\bigr)}
$$

です。さらに $\partial_a^2S_{\rm gen}^{\rm toy}=2\pi+k/(a-r_h)^2>0$ で、**この補助関数内**では半径方向の一意な極小を構成します。実際の四次元量子場のエントロピーから対数形を導いていないので、これを四次元islandの存在証明とは呼びません。時間方向の停留と量子状態の条件も別途必要です。

### 四次元に固有の検算項目

| 計算対象 | 四次元で調べる量 | 二次元計算から直接は引き継げないもの |
|---|---|---|
| 幾何学 | $A(\partial I)$、量子補正・高次曲率項 | dilatonだけで置いた面積項 |
| 放射 | スピン・$\ell,m$ 別の透過率、遠方での採取 | 片方向CFTの一定流束 |
| 状態 | 崩壊時空の初期状態、入射場、環境と相関 | 熱平衡浴や永遠ブラックホールの境界条件 |
| QES | 半径・時間・角度方向の変分と端点の許容域 | 二変数の局所補助式だけによる停留 |
| レプリカ | 境界条件を固定した重力経路積分の鞍点と解析接続 | JTにおける既知の可解なレプリカ構成 |
| 物理的結論 | $\rho_R$ の精細エントロピー、状態依存性・操作可能性 | 熱スペクトルの形や一つのエントロピー値だけ |

四次元の永遠Schwarzschild背景にislandを用いた解析研究は存在します。しかし永遠ブラックホールの放射領域・境界条件で得た曲線を、**一個の天体が誕生し、外界と作用し、最後まで蒸発する過程**の完全な量子状態の解と同一視できません。

## 6. 重力揺らぎ、非摂動補正、復号と終期

### 6.1 どこまで準静的近似を使えるか

質量三乗則の $P=C/M^2$ を使うと、$T_H=1/(8\pi M)$ から

$$
\frac{|\dot T_H|}{T_H^2}
=8\pi|\dot M|=\frac{8\pi C}{M^2}
$$

です。$M\gg1$ なら各典型放射周期に対して温度変化が小さく、瞬間静的近似を使う理由になります。一方 $M$ がPlanck質量に近づけば、この小ささは失われます。さらに放射の反作用で計量・QES位置・相関自体が変わるため、$C$ と$\beta$ を固定した終期への延長には追加の理論が要ります。

非摂動補正とは、例えば半古典的な展開の各次数では見えない指数的に小さな寄与を指します。これを「小さいから無視できる」と扱うことも、「小さい寄与だけで復号が証明された」と扱うこともできません。[BHI30のレプリカ極限の条件](../BHI30/index.md#def-bhi30-admissible-continuation)と[BHI31のensembleと因数分解の問題](../BHI31/index.md#def-bhi31-fixed-factorization)を、具体的な重力積分に応じて再検査します。

### 6.2 精細エントロピーから操作へは別の一段がある

islandが放射のentanglement wedgeに入る条件付きの意味は、[BHI32の放射ウェッジ定義](../BHI32/index.md#def-bhi32-radiation-wedge)で説明しました。しかし、幾何から得た精細エントロピーは**どの実験装置が、どの放射自由度へ、どの誤差でアクセスできるか**を直接指定しません。[BHI33の操作的アクセス](../BHI33/index.md#def-bhi33-operational-access)には保持チャネル・参照系付きの忠実度・復号器・計算資源が必要です。

実在天体では、放射の検出効率、宇宙背景放射からの入射、降着、回転、荷電、他の量子場との相互作用、寿命と観測時間を別々に検査します。例えば入射光度が $P_{\rm in}>P_{\rm out}$ なら $\dot M=P_{\rm in}-P_{\rm out}>0$ であり、孤立蒸発の三乗則はその時間帯に適用できません。**熱的なHawkingスペクトルの理論的存在**と**実際にHawking放射を検出して情報を復号できること**は異なる主張です。

### 6.3 計算されたこと・仮定したこと

| 主張 | 直接の根拠 | 追加で必要な条件 |
|---|---|---|
| 半古典的な四次元Schwarzschild放射の光度 | 波動方程式とスピン別灰色体散乱 | 場・状態・入射条件と準静的近似 |
| 粗視化エントロピーの生成率 | モードごとの占有数とエントロピー | 独立性、採取自由度、場の全種 |
| 収支予想としてのPage交点 | $S_{\rm rad}^{\rm coarse}$ と $S_{\rm BH}$ の交点 | 精細エントロピーが適切な枝を選ぶ根拠 |
| 四次元QESの候補 | 面積＋繰り込んだ物質エントロピーの停留 | 時間・角度を含む全変形、鞍点比較 |
| 放射からの情報回復 | 符号空間と回復写像 | 実際の放射チャネル、誤差、実装資源 |
| 完全蒸発でのユニタリ性 | 全入出力を含む量子理論が必要 | 非摂動効果・因数分解・終期の記述 |

この対照表は「四次元では何もできない」という意味ではありません。**半古典的な放射の光度とスペクトルは具体的に計算でき、四次元のQESとislandも限定された幾何・状態について研究が進んでいます。** ただし計算の論理的対象が一つずつ異なることを区別します。

## 7. 演習と詳細解答

特記しない限り $G=\hbar=c=k_B=1$、$M>0$、$0\le\Gamma\le1$、対数は自然対数とします。計算式の適用範囲は各問題に指定します。

### Level A：基礎幾何・散乱・熱モード

<a id="ex-bhi35-a01"></a>

#### BHI35-A01 Schwarzschildの面積と温度

- Level: A
- 問題: $r_h=2M$、$A_h=4\pi r_h^2$、$S_{\rm BH}=A_h/4$ とする。$S_{\rm BH}(M)$、$dS_{\rm BH}/dM$ と $T_H=(dS_{\rm BH}/dM)^{-1}$ を求めよ。

<!-- solution-start -->
**詳細解答**：$A_h=4\pi(2M)^2=16\pi M^2$ なので $S_{\rm BH}=4\pi M^2$。$M>0$ で微分すると $dS_{\rm BH}/dM=8\pi M>0$ です。逆数をとれば $T_H=1/(8\pi M)$。質量を減らすと温度が上がることもこの式から分かります。
<!-- solution-end -->

<a id="ex-bhi35-a02"></a>

#### BHI35-A02 二つの角運動量モード

- Level: A
- 問題: 質量零スカラーの $\ell=0$ と $\ell=1$ に対して、$(2\ell+1)$ と $V_\ell(r)$ を求めよ。$r=4M$ で $V_\ell$ を計算せよ。

<!-- solution-start -->
**詳細解答**：$\ell=0$ の縮退度は1、$\ell=1$ は3です。$V_0=f\,2M/r^3$、$V_1=f(2/r^2+2M/r^3)$。$r=4M$ では $f=1/2$ なので

$$
V_0(4M)=\frac12\frac{2M}{64M^3}=\frac1{64M^2},\qquad
V_1(4M)=\frac12\left(\frac2{16M^2}+\frac1{32M^2}\right)=\frac5{64M^2}.
$$

$s$ 波であっても $V_0>0$ であり、角運動量だけが散乱障壁の原因ではありません。
<!-- solution-end -->

<a id="ex-bhi35-a03"></a>

#### BHI35-A03 透過と反射の流束

- Level: A
- 問題: 正規化した単位入射波の反射振幅が $\mathcal R=3/5$（実数）で、外部ポテンシャルに吸収がないとする。透過確率 $\Gamma$ と透過振幅の絶対値を求めよ。

<!-- solution-start -->
**詳細解答**：Wronskianの流束保存 $1=|\mathcal R|^2+|\mathcal T|^2$ から $|\mathcal T|^2=1-9/25=16/25$。従って $\Gamma=16/25$、$|\mathcal T|=4/5$ です。確率 $16/25$ と振幅 $4/5$ を混同しないことが重要です。
<!-- solution-end -->

<a id="ex-bhi35-a04"></a>

#### BHI35-A04 透過後の一モードエントロピー

- Level: A
- 問題: ボソンの地平線熱占有数が $n_H=1$ のモードで、$\Gamma=1/2$ のときの遠方占有数、$g(n_{\rm out})$、$\Gamma g(n_H)$ を求め、不等号の向きを確かめよ。

<!-- solution-start -->
**詳細解答**：$n_{\rm out}=\Gamma n_H=1/2$ です。

$$
g(1/2)=\frac32\log(3/2)-\frac12\log(1/2)
=\frac32\log3-\log2,\qquad
\Gamma g(1)=\frac12(2\log2)=\log2.
$$

差は $g(1/2)-\Gamma g(1)=\frac32\log3-2\log2=\log(3^{3/2}/4)>0$ です。最後は $3^{3/2}>4$（両辺を平方して27>16）で確認できます。エントロピーを透過確率で線形に減らしてはいけません。
<!-- solution-end -->

<a id="ex-bhi35-a05"></a>

#### BHI35-A05 三乗則の停止時刻

- Level: A
- 問題: $\dot M=-C/M^2$、$C>0$、$M(0)=100$ とする。$M=50$ となる時刻 $u_{\rm cut}$ と、$u_{\rm cut}$ 時の面積エントロピーを計算せよ。

<!-- solution-start -->
**詳細解答**：微分方程式に $M^2$ を掛けると $M^2\dot M=-C$、すなわち $d(M^3)/du=-3C$。積分して $M^3=100^3-3Cu$ です。$50^3=125000$ なので $u_{\rm cut}=(1000000-125000)/(3C)=875000/(3C)$。$S_{\rm BH}(u_{\rm cut})=4\pi50^2=10000\pi$。$M=0$ までの外挿を使わず、正の停止質量で評価しました。
<!-- solution-end -->

### Level B：条件・時間変化・四次元QES

<a id="ex-bhi35-b01"></a>

#### BHI35-B01 光度とエントロピーは異なる重み

- Level: B
- 問題: 二つの周波数波束の出射占有数を $(n_1,n_2)=(1/2,1/2)$、周波数を $(\omega_1,\omega_2)=(1,3)$ とする。波束の状態数を同一としたとき、エネルギー和とエントロピー和を求め、$\omega_2=5$ に変更した場合の変化を説明せよ。

<!-- solution-start -->
**詳細解答**：エネルギー和は $E=1\cdot(1/2)+3\cdot(1/2)=2$。エントロピー和は $2g(1/2)=3\log3-2\log2$ です。$\omega_2=5$ に変更すると $E=1/2+5/2=3$ ですが、占有数を固定したのでエントロピー和は不変です。したがってエネルギー流束と粗視化エントロピー流束の比は周波数分布も知らなければ定まりません。占有数の変化を無視した仮想比較であることも条件です。
<!-- solution-end -->

<a id="ex-bhi35-b02"></a>

#### BHI35-B02 Page交点の近似区間

- Level: B
- 問題: $\beta=4/3$ 一定の収支予想、$M_0=100$、停止質量 $M_{\rm cut}=80$ とする。予想上の $M_{\rm Page}$ は停止質量に達する前に現れるか。$S_{\rm BH}(M_{\rm Page})/S_0$ も求めよ。

<!-- solution-start -->
**詳細解答**：交点条件は $M_{\rm Page}^2/M_0^2=\beta/(1+\beta)=(4/3)/(7/3)=4/7$。よって $M_{\rm Page}=100\sqrt{4/7}=200/\sqrt7\simeq75.59$ です。質量は100から80までしか追跡しないため、75.59への到達は指定した区間**外**です。従ってこの収支計算だけでは近似区間内のPage交点は確認できません。面積エントロピー比は $4/7$ です。
<!-- solution-end -->

<a id="ex-bhi35-b03"></a>

#### BHI35-B03 四次元球面の停留方程式

- Level: B
- 問題: $G_{\rm ren}=1$、$S_{\rm bulk}^{\rm toy}(a)=S_{\rm ref}-k\log((a-r_h)/L)$、$a>r_h>0$、$k,L>0$ とする。停留半径を求め、半径方向の二階微分が正であることを示せ。$r_h\gg\sqrt{k}$ の近似も求めよ。

<!-- solution-start -->
**詳細解答**：半径方向の導関数は $2\pi a-k/(a-r_h)$ です。零と置き、$a-r_h>0$ を掛けると $2\pi a(a-r_h)=k$、すなわち $a^2-r_ha-k/(2\pi)=0$。解は

$$
a=\frac{r_h\pm\sqrt{r_h^2+2k/\pi}}2.
$$

負号の根は負なので許容域 $a>r_h$ に入らず、正号の根だけが許されます。二階微分は $2\pi+k/(a-r_h)^2>0$。また $\varepsilon:=2k/(\pi r_h^2)\ll1$ として平方根を展開すると $\sqrt{1+\varepsilon}=1+\varepsilon/2+O(\varepsilon^2)$ で、

$$
a_*-r_h=\frac{r_h}2\left(\sqrt{1+\varepsilon}-1\right)
=\frac{k}{2\pi r_h}+O(k^2/r_h^3).
$$

これは補助模型の半径方向の局所極小だけを示し、実際のQESを証明しません。
<!-- solution-end -->

<a id="ex-bhi35-b04"></a>

#### BHI35-B04 温度変化と近似の適用

- Level: B
- 問題: $T_H=1/(8\pi M)$、$\dot M=-C/M^2$ とする。$|\dot T_H|/T_H^2$ を導出し、$M=100$ と $M=2$ の場合の比を求めよ。

<!-- solution-start -->
**詳細解答**：連鎖律から

$$
\dot T_H=-\frac1{8\pi M^2}\dot M
=\frac{C}{8\pi M^4}.
$$

$T_H^2=1/(64\pi^2M^2)$ なので割り算すると $|\dot T_H|/T_H^2=8\pi C/M^2$。$M=100$ では $8\pi C/10000$、$M=2$ では $8\pi C/4=2\pi C$。後者は前者の2500倍です。$M=2$ で一定 $C$ が物理的に正しいと主張するのではなく、近似が質量減少に敏感になることを示しています。
<!-- solution-end -->

<a id="ex-bhi35-b05"></a>

#### BHI35-B05 QESと復号を区別する

- Level: B
- 問題: ある定常四次元の外部領域についてQES候補を見つけたとする。次の結論へ進むために欠けている条件を、(i) 支配するisland枝の決定、(ii) 蒸発終期までの精細Page曲線、(iii) 実験的な量子情報の復号、の三つに分けて答えよ。

<!-- solution-start -->
**詳細解答**：

1. **枝の決定**：球面半径だけでなく時間・角度方向の停留、端点の許容領域、非連結枝との一般化エントロピーの比較、重力鞍点の採用条件が必要です。
2. **終期までの精細曲線**：崩壊・放射の時間依存する量子状態、灰色体因子と反作用、正則化とレプリカ解析接続、さらに小質量の非摂動的な記述が必要です。定常時空でのQESは終期の状態を指定しません。
3. **実験的復号**：放射のどの自由度に到達できるか、損失を含む量子チャネル、符号空間、回復誤差、復号器の計算資源、検出時間などが必要です。[BHI33の回復写像](../BHI33/index.md#thm-bhi33-keyed-petz)はアクセスの違いが回復を左右する具体例です。
<!-- solution-end -->

### Level C：四次元蒸発の条件を一枚で監査する

<a id="ex-bhi35-c01"></a>

#### BHI35-C01 灰色体収支からPage交点まで

- Level: C
- 問題: 四次元の準静的Schwarzschild模型について $M(0)=M_0>0$、$M_{\rm cut}\gg1$、$P(M)=C/M^2$ ($C>0$)、$\beta=3/2$ 一定の粗視化収支を仮定する。(i) $M(u)$、$S_{\rm BH}(M)$、$S_{\rm rad}^{\rm coarse}(M)$、(ii) 収支予想上のPage質量と基準時間比、(iii) $M_{\rm cut}=0.7M_0$ の場合の近似区間内での交点の有無、(iv) ここから四次元の完全なユニタリ蒸発と操作的復号を結論できない理由を、それぞれ示せ。

<!-- solution-start -->
**詳細解答**：

**(i)** 質量収支は $M^2\dot M=-C$ なので

$$
\frac{d}{du}M^3=3M^2\dot M=-3C,
\qquad
M(u)=\bigl(M_0^3-3Cu\bigr)^{1/3}
$$

です。$u$ は $M(u)\ge M_{\rm cut}>0$ の範囲に制限します。Schwarzschild面積から $S_{\rm BH}(M)=4\pi M^2$ で、初期値 $S_0=4\pi M_0^2$ です。$\beta=\dot S_{\rm rad}^{\rm coarse}/(-\dot S_{\rm BH})=3/2$ を積分すると

$$
S_{\rm rad}^{\rm coarse}(M)
=\frac32\bigl(S_0-S_{\rm BH}(M)\bigr)
=6\pi(M_0^2-M^2).
$$

**(ii)** 収支予想上の交点では $6\pi(M_0^2-M^2)=4\pi M^2$。両辺を $2\pi$ で割り、$3M_0^2-3M^2=2M^2$ から $M_{\rm Page}^2=3M_0^2/5$、

$$
M_{\rm Page}=\sqrt{3/5}M_0,\qquad
u_{\rm Page}=\frac{M_0^3}{3C}\left[1-(3/5)^{3/2}\right].
$$

形式寿命 $u_{\rm formal}=M_0^3/(3C)$ に対して

$$
\frac{u_{\rm Page}}{u_{\rm formal}}=1-(3/5)^{3/2}\simeq0.535.
$$

**(iii)** $\sqrt{3/5}\simeq0.7746>0.7$ なので、質量が $M_0$ から $0.7M_0$ へ減少する途中に交点が入ります。時間単調性は $\dot M=-C/M^2<0$ で確認できます。従って**仮定した収支模型の範囲内**では交点を計算できています。

**(iv)** ここで直接入力したのは光度と**粗視化エントロピーの生成率**であり、放射全体の密度行列 $\rho_R$ でも四次元の重力レプリカ鞍点でもありません。精細エントロピーを二枝の小さい方へ置くには[BHI30の条件付きisland則](../BHI30/index.md#prop-bhi30-conditional-island)に相当する状態・鞍点・解析接続の検証が要ります。終期は $M_{\rm cut}>0$ より先にあり、近似で記述していません。復号にはさらに[BHI33の操作的アクセス](../BHI33/index.md#def-bhi33-operational-access)の条件が必要です。従って数値上の交点の存在だけからユニタリ性も復号回路も証明できません。
<!-- solution-end -->

## 8. 文献と次講

- D. N. Page, [*Particle Emission Rates from a Black Hole: Massless Particles from an Uncharged, Nonrotating Hole*](https://doi.org/10.1103/PhysRevD.13.198) (1976)：スピン別の四次元放射と灰色体透過。
- D. N. Page, [*Time Dependence of Hawking Radiation Entropy*](https://doi.org/10.1088/1475-7516/2013/09/028) (2013)：光子・重力子の粗視化エントロピー生成とPage交点の収支推定。
- A. Almheiri, T. Hartman, J. Maldacena, E. Shaghoulian, A. Tajdini, [*The Entropy of Hawking Radiation*](https://doi.org/10.1103/RevModPhys.93.035002) (2021)：重力レプリカとislandの枠組み・成立範囲。
- K. Hashimoto, N. Iizuka, Y. Matsuo, [*Islands in Schwarzschild Black Holes*](https://doi.org/10.1007/JHEP06(2020)085) (2020)：四次元以上の定常Schwarzschild模型の放射領域とisland。
- R. Bousso, A. Shahbazi-Moghaddam, A. Tomašević, [*Island Finder and Entropy Bound*](https://doi.org/10.1103/PhysRevD.103.106005) (2021)：蒸発ブラックホールのisland存在についての十分条件とエントロピー上界。

四次元では、角運動量散乱による放射の物理量を具体的に計算できます。一方、**その放射の精細エントロピーを決める重力の鞍点、蒸発終期、実験可能な復号**は別々の問いです。次のBHI36では、放射の熱的な計算、Page曲線の仮定、islandの鞍点、回復写像を同一の放射領域 $R$ に揃え、全系列の結論と未解決問題を整理します。
