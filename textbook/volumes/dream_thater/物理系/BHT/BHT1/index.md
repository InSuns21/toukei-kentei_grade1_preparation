# BHT1 ブラックホールを状態量で記述する

<!-- definition-example-audit: strict -->

[TH1で学んだ状態量](../../TH/TH1/index.md#def-th1-state-variables)は、平衡状態を少数の数値で表す道具でした。[TH5の熱力学ポテンシャル](../../TH/TH5/index.md#def-th5-potentials)や[SM3の正準アンサンブル](../../SM/SM3/index.md#def-sm3-canonical)は、さらに熱的な条件を必要とします。一方、一般相対論では、物質を取り除いた球対称の外部時空がたった一つの質量パラメータで定まりました。

そこで最初に確かめたいのは、**一つのSchwarzschildブラックホールについて、何を幾何学的な状態量として測定・計算できるか**です。質量 $M$、地平線の面積 $A$、表面重力 $\kappa$ を同じ解から出し、相互に矛盾しないかを検算します。しかし、この三つを計算できても、温度 $T$ やエントロピー $S$ が定まったことにはなりません。この区別が後のブラックホール力学と熱力学を読む出発点です。

以下では滑らかな4次元の漸近平坦Schwarzschild時空、宇宙定数 $\Lambda=0$、質量 $M>0$、計量符号 $(-,+,+,+)$ を考えます。まず自然単位 $G=c=\hbar=k_B=1$ を使い、$M$ は長さの次元を持つ幾何単位の質量です。時間 $t$ は無限遠で $g(\partial_t,\partial_t)\to-1$ となるように規格化します。量子論的な議論は本章では仮定しません。

## 1. 平衡の状態量と、幾何学的な解族は同じか

通常の熱力学では、容器・外部拘束を指定して平衡を考えます。[TH1の平衡の定義](../../TH/TH1/index.md#def-th1-equilibrium-state)では巨視的な持続流がないことまで含め、[TH5のポテンシャル](../../TH/TH5/index.md#def-th5-potentials)は温度・エントロピーなどの基本関係を入力にして構成しました。古典重力の**定常解**という条件だけでは、その熱的入力はまだありません。

他方、[GR16のSchwarzschild解](../../GR/GR16/index.md#thm-gr16-schwarzschild)は、静的外部 $r>2M$ で面積半径 $r$ と無限遠の時計 $t$ を用いて

$$
ds^2=-f_M(r)\,dt^2+\frac{dr^2}{f_M(r)}
+r^2(d\theta^2+\sin^2\theta\,d\phi^2),
\qquad f_M(r):=1-\frac{2M}{r}
$$

と書けます。ここで添字 $M$ は、各質量で異なる関数であることを示します。$r=2M$ ではこの静的座標表示が使えませんが、[GR25の正則な地平線横断表示](../../GR/GR25/index.md#prop-gr25-regular-horizon-chart)で時空がそこまで延長されます。[GR29の「Schwarzschildの三種類の地平線の一致」](../../GR/GR29/index.md#prop-gr29-schwarzschild-coincidence)により、標準的な最大延長の未来地平線とKilling地平線の位置は一致します。

ここでは質量が異なる解を比較するため、同じ漸近平坦・真空・球対称・時計の規格化という条件を保ったまま、$M>0$ だけを動かします。比較するのはこのような古典解の幾何データであり、統計力学で必要な微視状態の確率分布まで与えたわけではありません。次に対象を正確に定めます。

<a id="def-bht1-geometric-family"></a>

<!-- formal-statement-start -->
> **定義（Schwarzschildの幾何学的状態族）**
> $G=c=1$、4次元、$\Lambda=0$、漸近平坦な真空Schwarzschild時空において、無限遠で単位規格化された未来向き時間並進Killing場 $\chi=\partial_t$ を固定する。正の質量パラメータ $M\in(0,\infty)$ で得られる解の一パラメータ族をSchwarzschildの幾何学的状態族という。この各解に
>
> - 質量パラメータ $M$、
> - 未来地平線の丸い空間的断面の面積 $A(M)$、
> - 上の $\chi$ に対応する表面重力 $\kappa(M)$
>
> を割り当て、組 $(M,A(M),\kappa(M))$ を本章の幾何学的状態データと呼ぶ。この定義は温度・エントロピーや熱平衡を含意しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht1-geometric-family -->
### 例：$M=L$ の解を指定する

**定義の確認**：$L>0$ を長さの単位とし、$M=L$ と置けば $f_L(r)=1-2L/r$ です。真空・球対称・無限遠規格化は上で選んだSchwarzschild解の条件を満たし、$r>2L$ で $f_L>0$ です。正則延長した地平線断面は $r=2L$ の二球面なので、後で計算する面積と表面重力は

$$
A(L)=4\pi(2L)^2=16\pi L^2,\qquad
\kappa(L)=\frac12 f_L'(2L)=\frac1{4L}
$$

です。$M=L$ の**一つの解**について三つの値を一緒に示したのであって、温度を測ったわけではありません。$M=0$ は平坦時空への極限として使えても、この定義の正質量ブラックホール族には含めません。
<!-- definition-example-end -->

## 2. 同じ解から面積と表面重力を計算する

まず地平線の位置を決めます。$f_M(r_h)=0$ を満たす正の半径は

$$
1-\frac{2M}{r_h}=0
\quad\Longleftrightarrow\quad
r_h=2M>0
$$

です。$r_h$ は面積半径だから、断面 $t$ 一定をそのまま地平線座標に延長するのではなく、正則な地平線上の丸い断面の誘導計量 $r_h^2d\Omega^2$ を使います。角度範囲は $0\le\theta\le\pi$、$0\le\phi<2\pi$ です。面積要素は $r_h^2\sin\theta\,d\theta\,d\phi$ となるので、

$$
\begin{aligned}
A(M)&=\int_0^{2\pi}\int_0^\pi
r_h^2\sin\theta\,d\theta\,d\phi\\
&=r_h^2(2\pi)[-\cos\theta]_0^\pi\\
&=4\pi r_h^2=16\pi M^2.
\end{aligned}
$$

次は表面重力です。これは単なる $M/r_h^2$ というNewton的な力ではなく、[GR45の表面重力の定義](../../GR/GR45/index.md#def-gr45-surface-gravity)でKilling場の非アフィン性を測る量です。[GR45の静的球対称地平線の定理](../../GR/GR45/index.md#thm-gr45-static)を、入射Eddington–Finkelstein座標へ正則に延長した同じ $f_M$ に適用します。適用条件は $M>0$、$r_h=2M>0$、$f_M\in C^1$、$f_M(r_h)=0$、正則な地平線表示です。

$$
f_M'(r)=\frac{2M}{r^2},\qquad
f_M'(r_h)=\frac{2M}{(2M)^2}=\frac1{2M},
\qquad \kappa=\frac12 f_M'(r_h).
$$

<a id="prop-bht1-schwarzschild-data"></a>

<!-- formal-statement-start -->
> **命題（Schwarzschildの幾何学的状態データ）**
> [本章の幾何学的状態族](#def-bht1-geometric-family)で $M>0$ とし、未来地平線の面積断面と無限遠で規格化された未来向きKilling場 $\chi=\partial_t$ を選ぶ。このとき

$$
\boxed{r_h=2M,\qquad A(M)=16\pi M^2,\qquad
\kappa(M)=\frac1{4M}>0}
$$

> が成立する。$[r_h]=[M]=L$、$[A]=L^2$、$[\kappa]=L^{-1}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

地平線の正則な断面で面積を積分し、同じ計量関数を半径で微分して表面重力を得ます。時間の規格化を外すと面積は変わらなくても $\kappa$ の値が変わる点が重要です。

<!-- proof-start -->
### 証明

[Schwarzschild解](../../GR/GR16/index.md#thm-gr16-schwarzschild)の $f_M(r)$ は $r>0$ で滑らかで、$r_h=2M$ で単純零点を持ちます。[GR29の地平線の同定](../../GR/GR29/index.md#prop-gr29-schwarzschild-coincidence)によって、この断面は未来地平線の丸い二球面として取れます。誘導計量の行列式は $r_h^4\sin^2\theta$ だから

$$
\sqrt{\det h}\,d\theta d\phi
=r_h^2\sin\theta\,d\theta d\phi,
\qquad A=4\pi r_h^2=16\pi M^2.
$$

一方、[GR45の静的球対称公式](../../GR/GR45/index.md#thm-gr45-static)で $f_M'(2M)=1/(2M)$ を代入すると $\kappa=1/(4M)$ です。$M>0$ より正です。$f_M$ は無次元、$r$ は長さなので $f_M'$ と $\kappa$ は長さの逆数、面積は長さの二乗です。$\square$
<!-- proof-end -->

たとえば $M=2L$ とすれば $r_h=4L$、$A=64\pi L^2$、$\kappa=1/(8L)$ です。一つのパラメータを変えると面積は増え、表面重力は減ります。この逆向きの変化は次の微分でも確認できます。

## 3. 変分の恒等式は、熱力学第一法則そのものではない

同じSchwarzschild解族の中で微小量 $\delta M$ だけ質量を動かし、他の条件（真空・非回転・無電荷・遠方時計の規格化）を保ちます。このとき $A$ は $M$ の関数なので、連鎖律により

$$
\delta A=A'(M)\,\delta M
=32\pi M\,\delta M.
$$

上の $\kappa(M)$ を右辺へ代入すると

$$
\frac{\kappa(M)}{8\pi}\,\delta A
=\frac{1}{8\pi}\frac1{4M}(32\pi M\,\delta M)
=\delta M.
$$

<a id="prop-bht1-variation-identity"></a>

<!-- formal-statement-start -->
> **命題（Schwarzschild一パラメータ族の幾何学的変分恒等式）**
> $M>0$ の4次元漸近平坦Schwarzschild真空解族で、無限遠でのKilling時間規格化を一定に保ち、質量パラメータのみを変える。この族の接方向の任意の微小変化 $\delta M$ について

$$
\boxed{\delta M=\frac{\kappa(M)}{8\pi}\,\delta A}
$$

> が成り立つ。ただし $G=c=1$、$A=16\pi M^2$、$\kappa=(4M)^{-1}$ であり、回転・電荷・物質流入を含む一般的な第一法則を主張するものではない。
<!-- formal-statement-end -->

### 証明の見取り図

$A(M)$ の全微分を取る操作だけで閉じる関係です。ここでの $\delta$ は異なる定常解どうしの接方向を表し、時間発展で物質を地平線へ落とす操作とは区別します。

<!-- proof-start -->
### 証明

[Schwarzschildの幾何学的状態データ](#prop-bht1-schwarzschild-data)より $A'(M)=32\pi M$ です。$M>0$ なので $\kappa(M)=1/(4M)$ は有限で、接ベクトル $\delta M$ に沿って

$$
\frac{\kappa}{8\pi}\delta A
=\frac{1}{8\pi}\frac{1}{4M}
\frac{dA}{dM}\delta M
=\frac{32\pi M}{32\pi M}\delta M
=\delta M.
$$

これが求める恒等式です。$\square$
<!-- proof-end -->

ここで **$\delta M$ は二つの解の有限差ではありません**。有限な $M_2-M_1$ に係数 $\kappa(M_1)$ を掛けた $\{A(M_2)-A(M_1)\}/(8\pi)$ が一般に一致するわけではありません。たとえば $M_2=2M_1$ なら、左辺の質量差は $M_1$、右辺は $3M_1/2$ になります。

さらに、[TH2の熱力学第一法則](../../TH/TH2/index.md#axiom-th2-first-law)では熱と仕事の定義があり、[TH5の熱力学ポテンシャル](../../TH/TH5/index.md#def-th5-potentials)では $T,S$ の関係が必要でした。上の幾何学的恒等式だけから

$$
T=\frac{\kappa}{2\pi}
\quad\text{または}\quad S=\frac A4
$$

を物理的に導いたとは言えません。これらは後にHawking放射と熱力学を接続する際の結果です。回転や電荷を動かせば追加の共役項が必要になり、一般的な第一法則の検証はBHT4–BHT6で行います。

## 4. 質量の倍率とKilling時間の倍率を混同しない

解の質量を $M$ から $\lambda M$（$\lambda>0$）へ変えると、別のSchwarzschild解になります。一方、同じ解のKilling場を定数倍するだけなら面積も質量パラメータも変わりません。

<a id="prop-bht1-mass-scaling"></a>

<!-- formal-statement-start -->
> **命題（状態族の質量スケーリング）**
> [Schwarzschild幾何学的状態族](#def-bht1-geometric-family)で、各解のKilling場を無限遠で単位規格化し、$\lambda>0$ によって $M\mapsto\lambda M$ と変えると

$$
\boxed{r_h(\lambda M)=\lambda r_h(M),\quad
A(\lambda M)=\lambda^2 A(M),\quad
\kappa(\lambda M)=\lambda^{-1}\kappa(M)}.
$$

<!-- formal-statement-end -->

### 証明の見取り図

各式は同じ一パラメータ族の関数を $\lambda M$ で評価する操作であり、物体を単純に二個並べる操作ではありません。

<!-- proof-start -->
### 証明

[状態データの公式](#prop-bht1-schwarzschild-data)の引数 $M$ を $\lambda M$ に置き換えると

$$
\begin{aligned}
r_h(\lambda M)&=2\lambda M=\lambda(2M),\\
A(\lambda M)&=16\pi(\lambda M)^2
=\lambda^2(16\pi M^2),\\
\kappa(\lambda M)&=\frac{1}{4\lambda M}
=\lambda^{-1}\frac1{4M}.
\end{aligned}
$$

$\lambda>0$ だから変換後も状態族の定義域に属します。$\square$
<!-- proof-end -->

この $A\propto M^2$ は、[TH1の示量量の複製則](../../TH/TH1/index.md#def-th1-extensive-intensive)と同じ主張ではありません。二つのブラックホールを離して置いた系は、初めから「質量 $M_1+M_2$ の**一つの**Schwarzschild時空」ではないためです。したがって質量スケーリングから面積の加法性を結論できません。

別の操作として、固定した幾何 $g$ の生成場を $\widehat\chi=a\chi$（$a>0$ は一定）と選ぶと、[GR45の「Killing場の規格化と表面重力」](../../GR/GR45/index.md#prop-gr45-scaling)により

$$
\kappa_{\widehat\chi}=a\kappa_\chi,\qquad
A_{\widehat\chi}=A_\chi.
$$

ただし $a\ne1$ では $\widehat\chi$ の無限遠でのノルムは $-a^2$ となり、定義で固定した時計の規格化を満たしません。$\kappa$ を単独で比較して「重力が変わった」と結論する前に、どの時間を単位としているかを必ず確かめます。

## 5. 物理単位に戻す

ここまでは質量を長さとして扱いました。SIの質量を $M_{\mathrm{SI}}>0$ kg と書くと、幾何単位の長さは $M_{\mathrm{geo}}=GM_{\mathrm{SI}}/c^2$ です。この対応を $r_h=2M_{\mathrm{geo}}$ と $A=16\pi M_{\mathrm{geo}}^2$ に代入します。

$$
\boxed{r_h=\frac{2GM_{\mathrm{SI}}}{c^2}},\qquad
\boxed{A=\frac{16\pi G^2 M_{\mathrm{SI}}^2}{c^4}}.
$$

幾何単位の $\kappa$ は長さの逆数なので、

$$
\boxed{\kappa_{\mathrm{geo}}=\frac{c^2}{4GM_{\mathrm{SI}}}},\qquad
\boxed{g_H=c^2\kappa_{\mathrm{geo}}=\frac{c^4}{4GM_{\mathrm{SI}}}}.
$$

$g_H$ はSIの加速度次元を持つ表面重力です。[GR45の赤方偏移加速度の命題](../../GR/GR45/index.md#prop-gr45-redshift)に従い、地平線に静止する観測者の有限な局所固有加速度ではありません。$G$ の次元は $L^3M^{-1}T^{-2}$、$c$ は $LT^{-1}$ ですから、$r_h$ は長さ、$A$ は面積、$g_H$ は $LT^{-2}$ になります。

## 6. 何を既に知り、何がまだ足りないか

| 対象 | この章で確かめたこと | さらに必要な物理 |
| --- | --- | --- |
| $M$ | 漸近平坦なSchwarzschild解の質量パラメータ | 物理過程でのエネルギー授受 |
| $A$ | 正則な地平線断面の幾何学的面積 | 面積をエントロピーと同定する根拠 |
| $\kappa$ | 規格化されたKilling場の表面重力 | 周波数分布から温度を同定する根拠 |
| $\delta M=\kappa\delta A/(8\pi)$ | 同じ一パラメータ族の微分恒等式 | 一般の摂動・物質流入で成立する条件 |

古典的ブラックホールの「力学の法則」は地平線・表面重力・面積の幾何学を述べます。温度やエントロピーとの対応は別の物理的事実を必要とし、[SM3の分配関数](../../SM/SM3/index.md#def-sm3-canonical)を幾何学データだけから作ることもできません。BHT2ではKilling地平線の零法則、BHT3では面積定理の仮定、BHT4以降では一般の第一法則を調べます。

## 7. 演習

<a id="ex-bht1-a01"></a>

#### BHT1-A01 一つの状態データ

- Level: A

$G=c=1$、$M=3L$（$L>0$ は長さ）のSchwarzschild解で $r_h,A,\kappa$ を計算し、それぞれの長さ次元を答えよ。遠方時計は単位規格化されているとする。

<!-- solution-start -->
**詳細解答。** [状態データの命題](#prop-bht1-schwarzschild-data)へ $M=3L$ を代入します。地平線半径は $r_h=2(3L)=6L$。よって

$$
A=4\pi(6L)^2=144\pi L^2,\qquad
\kappa=\frac1{4(3L)}=\frac1{12L}.
$$

順に次元は $L,L^2,L^{-1}$ です。単位規格化という仮定は $\kappa$ の値を一意に比較するために必要です。
<!-- solution-end -->

<a id="ex-bht1-a02"></a>

#### BHT1-A02 面積要素から確認する

- Level: A

$r_h=R>0$ の地平線断面の誘導計量が $h=R^2(d\theta^2+\sin^2\theta\,d\phi^2)$ のとき、計量行列の行列式と面積積分から $A=4\pi R^2$ を求めよ。

<!-- solution-start -->
**詳細解答。** 座標基底 $(\partial_\theta,\partial_\phi)$ の行列は

$$
(h_{ij})=\begin{pmatrix}R^2&0\\0&R^2\sin^2\theta\end{pmatrix},
\qquad \det h=R^4\sin^2\theta.
$$

$0\le\theta\le\pi$ では $\sin\theta\ge0$ なので、面積要素は $\sqrt{\det h}\,d\theta d\phi=R^2\sin\theta\,d\theta d\phi$。したがって

$$
A=R^2\int_0^{2\pi}d\phi\int_0^\pi\sin\theta\,d\theta
=R^2(2\pi)(2)=4\pi R^2.
$$

座標の端点で $\det h=0$ となるのは球面角度座標の退化であり、面積積分の結果を無効にしません。
<!-- solution-end -->

<a id="ex-bht1-a03"></a>

#### BHT1-A03 零点と導関数を別々に評価する

- Level: A

$f(r)=1-2M/r$、$M>0$ に対し、正の零点 $r_h$ と $f'(r_h)$ を求め、[静的球対称地平線の表面重力](../../GR/GR45/index.md#thm-gr45-static)から $\kappa$ を計算せよ。

<!-- solution-start -->
**詳細解答。** $f(r_h)=0$ を正の $r_h$ に対して解くと $r_h=2M$ です。微分は $M$ を固定して $r$ について行い、

$$
f'(r)=2Mr^{-2},\qquad f'(r_h)=\frac{2M}{4M^2}=\frac1{2M}.
$$

この $f$ は $r_h>0$ の近傍で滑らかで単純零点を持つため、[GR45の公式](../../GR/GR45/index.md#thm-gr45-static)を正則な入射EF表示で適用できます。

$$
\kappa=\frac12f'(r_h)=\frac1{4M}>0.
$$
<!-- solution-end -->

<a id="ex-bht1-a04"></a>

#### BHT1-A04 古典解から導けること

- Level: A

無限遠で規格化された4次元Schwarzschild真空解と、その $M,A,\kappa$ が与えられた。次の主張を「幾何学から言える」「追加の熱・量子論が必要」に分け、理由を述べよ。

1. 地平線断面積は $16\pi M^2$ である。
2. 時空だけから絶対温度は $\kappa/(2\pi)$ と測定される。
3. $\kappa$ は時間の規格化に依存する。
4. $S=A/4$ が熱力学的エントロピーである。

<!-- solution-start -->
**詳細解答。** （1）は[地平線面積の計算](#prop-bht1-schwarzschild-data)から幾何学的に結論できます。（3）は[GR45の生成場の規格化の命題](../../GR/GR45/index.md#prop-gr45-scaling)から分かります。$\chi\mapsto a\chi$ なら同じ地平線で $\kappa\mapsto a\kappa$ です。

（2）は量子場の状態、粒子検出・熱的スペクトルなどの温度同定が必要です。（4）は温度と第一法則の熱力学的解釈などを追加して初めて意味を持ちます。数値として $A/4$ と書けることと、それを測定可能なエントロピーと示すことは別です。
<!-- solution-end -->

<a id="ex-bht1-a05"></a>

#### BHT1-A05 SI単位での面積

- Level: A

SI質量 $M_{\rm SI}>0$、$r_h=2GM_{\rm SI}/c^2$ から、地平線面積を求めよ。また $G,c$ の次元から答えが $L^2$ であることを示せ。

<!-- solution-start -->
**詳細解答。** 球面積は $4\pi r_h^2$ なので

$$
A=4\pi\left(\frac{2GM_{\rm SI}}{c^2}\right)^2
=\frac{16\pi G^2M_{\rm SI}^2}{c^4}.
$$

$[G]=L^3M^{-1}T^{-2}$、$[M_{\rm SI}]=M$、$[c]=LT^{-1}$ より

$$
[A]=\frac{(L^3M^{-1}T^{-2})^2M^2}{(LT^{-1})^4}
=\frac{L^6T^{-4}}{L^4T^{-4}}=L^2.
$$

自然単位の $M$ とSIの $M_{\rm SI}$ は数値だけを機械的に交換してはいけません。
<!-- solution-end -->

<a id="ex-bht1-b01"></a>

#### BHT1-B01 接方向の等式と有限差

- Level: B

$M>0$ のSchwarzschild状態族で、$A(M)=16\pi M^2$、$\kappa(M)=1/(4M)$ とする。

1. $dM=\kappa\,dA/(8\pi)$ を導け。
2. $M_1=M$, $M_2=2M$ に対し、$\Delta M$ と $\kappa(M_1)\Delta A/(8\pi)$ を比較せよ。
3. （1）と（2）が矛盾しない理由を述べよ。

<!-- solution-start -->
**詳細解答。** $A'(M)=32\pi M$ なので

$$
\frac{\kappa}{8\pi}\,dA
=\frac{1}{32\pi M}(32\pi M\,dM)=dM.
$$

有限な差では $\Delta M=2M-M=M$、$\Delta A=16\pi(4M^2-M^2)=48\pi M^2$ だから

$$
\frac{\kappa(M)}{8\pi}\Delta A
=\frac{1}{4M}\frac{48\pi M^2}{8\pi}
=\frac32M\ne M.
$$

微分恒等式は各点で係数 $\kappa(M)$ を評価する接方向の関係です。有限差に対しては係数が経路上で変わるため、正しい積分は

$$
\int_{A(M)}^{A(2M)}\frac{\kappa(A)}{8\pi}\,dA
=\int_M^{2M}dM'=M
$$

です。最後の変数変換は最初に示した微分恒等式が成立する同じ解族上で行っています。
<!-- solution-end -->

<a id="ex-bht1-b02"></a>

#### BHT1-B02 質量倍率と時計倍率

- Level: B

自然単位、正質量 $M$ のSchwarzschild解を考える。

1. 別の解として質量を $3M$ にした場合、$A,\kappa$ は何倍になるか。
2. 元の解は固定し、生成Killing場を $\widehat\chi=3\chi$ とした場合、$A,\kappa_{\widehat\chi}$ はどうなるか。
3. この二操作が違う理由を無限遠のノルムで説明せよ。

<!-- solution-start -->
**詳細解答。** [質量スケーリングの命題](#prop-bht1-mass-scaling)を $\lambda=3$ へ適用すると

$$
A(3M)=9A(M),\qquad \kappa(3M)=\frac13\kappa(M).
$$

固定した幾何では面積は不変で、[GR45の規格化命題](../../GR/GR45/index.md#prop-gr45-scaling)によって $\kappa_{\widehat\chi}=3\kappa_\chi$ です。元の $\chi$ は $g(\chi,\chi)\to-1$ ですが、$3\chi$ は $g(3\chi,3\chi)\to-9$。したがって後者は同じ無限遠規格化の状態族を比較する操作ではありません。
<!-- solution-end -->

<a id="ex-bht1-b03"></a>

#### BHT1-B03 静止観測者の加速度と表面重力

- Level: B

$r>2M$、$f=1-2M/r$ の静的外部で、静止観測者の固有加速度の大きさが $|a_{\rm stat}|=|f'|/(2\sqrt f)$ であることは[GR45の結果](../../GR/GR45/index.md#prop-gr45-redshift)としてよい。

1. $|a_{\rm stat}|$ を $M,r$ で表せ。
2. $r\downarrow2M$ の極限と $\sqrt f\,|a_{\rm stat}|$ の極限を求めよ。
3. 「地平線での固有加速度は $1/(4M)$」という記述の誤りを述べよ。

<!-- solution-start -->
**詳細解答。** $f'=2M/r^2>0$ を[GR45の赤方偏移公式](../../GR/GR45/index.md#prop-gr45-redshift)に代入すると

$$
|a_{\rm stat}|=\frac{2M/r^2}{2\sqrt{1-2M/r}}
=\frac{M}{r^2\sqrt{1-2M/r}}.
$$

$r\downarrow2M$ では分子が正の有限値 $M/(4M^2)=1/(4M)$ に近づき、分母の $\sqrt f$ が零へ近づくため $|a_{\rm stat}|\to+\infty$ です。他方、

$$
\sqrt f\,|a_{\rm stat}|=\frac{M}{r^2}
\longrightarrow\frac{M}{(2M)^2}=\frac1{4M}=\kappa.
$$

従って $1/(4M)$ は遠方時計に対する**赤方偏移済み**の極限であり、地平線上に静止できる観測者の固有加速度ではありません。
<!-- solution-end -->

<a id="ex-bht1-b04"></a>

#### BHT1-B04 第一法則に見える式の落とし穴

- Level: B

$M>0$ のSchwarzschild幾何学的状態族は $dM=\kappa_\chi dA/(8\pi)$ を満たす。ある人が同じ計量を固定したまま $\chi$ を $\widetilde\chi=2\chi$ としても、同じ式が成立すると主張した。$M,A$ を元のまま据え置く場合に、その主張のどこが破綻するかを数式で示し、修正すべき前提を述べよ。

<!-- solution-start -->
**詳細解答。** [規格化変更](../../GR/GR45/index.md#prop-gr45-scaling)により $\kappa_{\widetilde\chi}=2\kappa_\chi$ ですが、$M$ と $A$ は固定した幾何のデータなので変わりません。元の族の微分をそのまま用いると

$$
\frac{\kappa_{\widetilde\chi}}{8\pi}\,dA
=2\frac{\kappa_\chi}{8\pi}\,dA=2\,dM,
$$

一般の非零 $dM$ では $dM$ と一致しません。もとの[幾何学的変分恒等式](#prop-bht1-variation-identity)は **無限遠で $\chi$ を単位規格化した**解族の質量 $M$ を使う関係です。$\widetilde\chi$ は無限遠でノルムが $-4$ となるので、係数だけを置き換える操作はその前提外です。正しい比較には規格化を戻すか、新しい時間生成量に対応するエネルギー規格化も整合的に変更する必要があります。
<!-- solution-end -->

<a id="ex-bht1-c01"></a>

#### BHT1-C01 Schwarzschild状態族の横断検算

- Level: C

$M>0$、$G=c=\hbar=k_B=1$ の漸近平坦・真空・非回転Schwarzschild解を、無限遠で単位規格化した $\chi$ とともに考える。計量の $f_M(r)=1-2M/r$ が与えられたとする。

1. 地平線半径、面積、表面重力を式の出発点から求めよ。表面重力には[GR45の「静的球対称地平線の表面重力」](../../GR/GR45/index.md#thm-gr45-static)を用いてよい。
2. この解族で $M\mapsto\lambda M$（$\lambda>0$）としたときの三量の変化を導出せよ。
3. $dM=\kappa\,dA/(8\pi)$ を示し、$M$ から $3M$ まで積分した結果を検算せよ。
4. $\chi\mapsto2\chi$ とした場合、（3）の式をそのまま使えるか説明せよ。
5. この計算だけから「Hawking温度 $T=\kappa/(2\pi)$ とエントロピー $S=A/4$ は実際の熱力学量である」と結論できるか、必要な物理を述べよ。

<!-- solution-start -->
**詳細解答。**

（1）$f_M(r_h)=0$ は $r_h=2M$ を与えます。球面断面の面積要素は $r_h^2\sin\theta\,d\theta d\phi$ なので、

$$
A=\int_0^{2\pi}\int_0^\pi r_h^2\sin\theta\,d\theta d\phi
=4\pi r_h^2=16\pi M^2.
$$

$f_M'(r)=2M/r^2$ です。$M>0$ なので $r_h$ は正、$f_M$ は $r_h$ 近くで滑らか、入射EF座標で正則な地平線が存在します。[GR45の公式](../../GR/GR45/index.md#thm-gr45-static)へ代入すれば

$$
\kappa=\frac12f_M'(2M)
=\frac12\frac{2M}{4M^2}=\frac1{4M}.
$$

（2）質量を $\lambda M$ に置けば

$$
r_h(\lambda M)=2\lambda M,\quad
A(\lambda M)=16\pi\lambda^2M^2,\quad
\kappa(\lambda M)=\frac1{4\lambda M}.
$$

したがって倍率は順に $\lambda,\lambda^2,\lambda^{-1}$ です。

（3）$dA/dM=32\pi M$ より

$$
\frac{\kappa}{8\pi}dA
=\frac{1}{32\pi M}(32\pi M\,dM)=dM.
$$

$M'=M$ から $M'=3M$ まで同じ定常解族をたどれば

$$
\int_{A(M)}^{A(3M)}\frac{\kappa(A)}{8\pi}\,dA
=\int_M^{3M}dM'=2M
$$

で、質量の有限差 $3M-M=2M$ に一致します。左辺で $\kappa$ は経路上の $M'$ に依存するため定数として積分の外に出してはいけません。

（4）$\chi\mapsto2\chi$ なら[規格化の命題](../../GR/GR45/index.md#prop-gr45-scaling)で $\kappa\mapsto2\kappa$ です。同じ $A,M$ のままでは右辺が $2dM$ となり（3）の式に等しくありません。無限遠の時計規格化が壊れるためです。

（5）以上は古典的幾何と定常解族の微分です。量子場の状態とHawking放射により遠方の温度を同定し、さらに熱力学第一法則との整合、エントロピーの状態関数としての意味を確かめる必要があります。[SM3の正準分布](../../SM/SM3/index.md#def-sm3-canonical)の確率や分配関数は、幾何の三量を知っただけでは指定されません。
<!-- solution-end -->
