# QFT52 放射量子化・状態–演算子対応とVirasoro最高ウェイト表現

<!-- definition-example-audit: strict -->

[QFT51のVirasoro交換子](../QFT51/index.md#thm-qft51-virasoro)は、二つの輪郭電荷を交換したときの中心項まで与えました。しかし交換関係だけでは、**その演算子が何に作用し、どの状態が物理的に残るか**は決まりません。平面の局所場を原点に挿入して円の内側から状態を作り、Virasoro生成子をその状態に作用させます。子孫状態の内積を計算すると、中心電荷と共形ウェイトが状態の存在可能性を拘束することが分かります。

舞台は向きを固定した二次元Euclid平面 $z=x+iy$ です。実時間計量を用いる場合の規約は $(-,+,+,+)$ ですが、ここでは $ds^2=dz\,d\bar z$ を使います。まず $g>0$、定数零モードを除いた実自由bosonの平面真空で

$$
S_E=\frac{g}{4\pi}\int |\nabla\phi|^2d^2x,
\qquad J=\partial\phi,
\qquad t=-g:J^2:
$$

とします。[QFT51の二点収縮](../QFT51/index.md#prop-qft51-current-two-point)は $\langle J(z)J(w)\rangle=-1/[2g(z-w)^2]$、[中心電荷](../QFT51/index.md#thm-qft51-boson-central-charge)は $c=1$ です。まずこの自由場の正則側を明示的に構成します。その後、一般の二次元CFTについて述べる箇所では、**局所Ward恒等式・真空・正値内積が存在する**ことを別途仮定します。OPEという形式式だけから、一般の相互作用CFTのHilbert空間が無条件に構成されたとみなしません。

## 1. 円を時間の切片にする：放射量子化

通常の時間一定面の代わりに、原点を中心とする半径 $r$ の円 $|z|=r$ で平面を切ります。$z=e^{\tau+i\theta}$ と置けば、$r$ が増えることは $\tau=\log r$ が進むことです。原点の近くに入れた局所演算子の情報は、その外側の円では境界ベクトルとして伝わります。以下では円内部の経路積分が作る境界データと、自由場の振動子Fockベクトルを対応付けます。

<a id="def-qft52-radial-state"></a>

<!-- formal-statement-start -->
> **定義（放射量子化と局所演算子が作る状態）**  
> 原点を除いた二次元Euclid平面で、同心円の内側の挿入と境界条件が状態を定め、外側に向けた相関関数の貼り合わせが内積を定める量子化を放射量子化という。平面真空 $|0\rangle$ が存在し、原点への極限が状態の意味で存在する局所場 $\mathcal O$ に対し

$$
|\mathcal O\rangle
=\lim_{z,\bar z\to0}\mathcal O(z,\bar z)|0\rangle
$$

> をその局所演算子が作る状態とする。極限・内積の存在は理論ごとに確認する必要があり、特異な任意の局所分布へ自動的に適用する定義ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft52-radial-state -->
**定義の確認** 恒等演算子 $\mathbf1$ の挿入は任意の相関関数を変えないので $|\mathbf1\rangle=|0\rangle$。自由場の正則側の微分場 $J$ は、後で示す展開の負モード $a_{-1}$ に比例し、$\lim_{z\to0}J(z)|0\rangle$ は有限です。一方、対数型の $\phi$ 自体は零モード・赤外条件が必要であり、同じ方法で無条件に真空Fock空間の状態にすることはできません。したがって「任意の場」とはせず、存在条件を定義に含めています。
<!-- definition-example-end -->

正則側の拡大縮小生成子は $L_0$、反正則側は $\bar L_0$ です。回転と拡大縮小を合わせた作用は、[QFT50の一次場の変換則](../QFT50/index.md#thm-qft50-primary-ward)から局所的に読み取れます。原点を固定した $z\mapsto e^s z$ の無限小変換が $L_0+\bar L_0$ に対応することと、円筒のエネルギーに現れる真空シフトとは別の問いです。この章の内積・子孫計算には平面モードを用い、円筒の真空シフトは仮定しません。

## 2. 自由bosonでは状態–演算子対応を振動子で作れる

ここでも $\partial=\partial_z$ は $\bar z$ を固定する[Wirtinger微分](../QFT50/index.md#def-qft50-wirtinger)です。二点収縮の負号をそのまま扱うより、正規化した正則電流

$$
a(z)=i\sqrt{2g}\,J(z)
$$

を用いると $a(z)a(w)\sim(z-w)^{-2}$ です。複素係数の $i$ は、実場の正則成分をEuclidの反射で内積へ移す際の規約であり、場の実時間での反Hermitian性を意味しません。$t=\tfrac12:a^2:$ となります。

<a id="def-qft52-current-modes"></a>

<!-- formal-statement-start -->
> **定義（電流モードと自由bosonの真空Fock空間）**  
> $g>0$ の上の自由Gaussian平面模型で、他の挿入点を含まない円上の正則電流 $a=i\sqrt{2g}\,\partial\phi$ のLaurentモードを

$$
a_n=\frac1{2\pi i}\oint_0z^n a(z)\,dz,
\qquad a(z)=\sum_{n\in\mathbb Z}a_nz^{-n-1}
$$

> と定める。零電荷真空部門では $a_n|0\rangle=0$（$n\ge0$）とし、$a_{-n}$（$n\ge1$）を生成演算子として作る状態の有限線形結合を考える。内積は $\langle0|0\rangle=1$、$a_n^\dagger=a_{-n}$ の規約で定める。
<!-- formal-statement-end -->

この「負の添字が生成」という規約は単なる名前ではありません。次の交換子が正のノルムを与えます。

<a id="prop-qft52-heisenberg"></a>

<!-- formal-statement-start -->
> **命題（電流OPEからHeisenberg交換子）**  
> 上の正則自由電流の相関関数で $a(z)a(w)\sim1/(z-w)^2$ が成り立ち、二つの同心輪郭が挿入点を横切らずに変形できるとする。このとき

$$
[a_m,a_n]=m\delta_{m+n,0}\mathbf1.
$$

> 特に $n\ge1$ に対し $\|a_{-n}|0\rangle\|^2=n$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

二つの動径順序の差を $z=w$ の小円の留数にし、二次極に $z^m$ を掛けた微分 $mw^{m-1}$ を外側で積分します。

<!-- proof-start -->
### 証明

[QFT51の入れ子輪郭法](../QFT51/index.md#thm-qft51-virasoro)と同じく、円の順序を交換した差を衝突点へ縮めます。[Cauchy高階導関数公式](../../../解析系/CA/CA3/index.md#thm-ca3-cauchy-derivatives)により、$w\ne0$ で

$$
\operatorname{Res}_{z=w}\frac{z^m}{(z-w)^2}
=\frac{d}{dw}w^m=mw^{m-1}.
$$

残る $w$ の積分に $w^n$ を掛けると

$$
[a_m,a_n]
=\frac1{2\pi i}\oint_0m w^{m+n-1}dw
=m\delta_{m+n,0}\mathbf1.
$$

$a_n|0\rangle=0$（$n>0$）と $a_n^\dagger=a_{-n}$ を用いれば

$$
\langle0|a_na_{-n}|0\rangle
=\langle0|[a_n,a_{-n}]|0\rangle=n.
$$

よって真空から生成した一粒子振動子状態は正ノルムです。
<!-- proof-end -->

<!-- definition-example-start: def-qft52-current-modes -->
**定義の確認** モード $a_{-2}|0\rangle$ を随伴な $a_2$ で戻すと $[a_2,a_{-2}]|0\rangle=2|0\rangle$ です。したがってノルム二乗は $2$、規格化状態は $a_{-2}|0\rangle/\sqrt2$ です。

別の例 $a_{-1}^2|0\rangle$ では $a_1a_{-1}^2|0\rangle=2a_{-1}|0\rangle$、さらに $a_1$ を掛けて $2|0\rangle$ なので、ノルム二乗はやはり $2$。異なる粒子数・モードの内積は交換子を移動して零になります。
<!-- definition-example-end -->

<a id="thm-qft52-free-state-operator"></a>

<!-- formal-statement-start -->
> **定理（零電荷自由bosonの状態–演算子対応）**  
> 上の零電荷正則自由boson Fock空間を、有限個の $a_{-n}$（$n\ge1$）で生成する有限励起状態に制限する。正規順序合成場の原点挿入は、任意の整数 $n_1,\ldots,n_k\ge1$ に対し

$$
\left|:\prod_{j=1}^k
\frac{\partial^{n_j-1}a}{(n_j-1)!}:\right\rangle
=a_{-n_1}\cdots a_{-n_k}|0\rangle.
$$

> よって有限励起状態の各ベクトルは局所的な微分電流の正規順序積で作られる。これは自由場の零電荷部門についての主張であり、一般CFTの全状態の存在・一意対応を仮定なしで証明するものではない。
<!-- formal-statement-end -->

### 証明の見取り図

原点の近くで $a(z)|0\rangle$ は負モードの正べき級数になります。微分すると必要な係数を取り出せます。正規順序を使えば原点での相互収縮が取り除かれます。

<!-- proof-start -->
### 証明

真空を消す $a_n$（$n\ge0$）を、[CA4のLaurent展開と係数公式](../../../解析系/CA/CA4/index.md#thm-ca4-laurent)に対応するモード級数から除くと、$z$ が原点近くの正則化領域にあるとき

$$
a(z)|0\rangle
=\sum_{n\le-1}a_nz^{-n-1}|0\rangle
=\sum_{k\ge1}z^{k-1}a_{-k}|0\rangle.
$$

両辺を $n-1$ 回微分して $z=0$ に置くと、$z^{k-1}$ の導関数は $k=n$ でのみ $(n-1)!$ を残します。したがって

$$
\frac{1}{(n-1)!}\partial^{n-1}a(0)|0\rangle
=a_{-n}|0\rangle.
$$

複数の場については、[QFT51の点分離正規順序](../QFT51/index.md#def-qft51-wick-stress)に従い、同じ挿入点へ近づける前に場どうしの二点収縮を引きます。全正規順序積を真空へ作用させる際は、残った非負モードが真空を消し、負モードの積だけが残ります。各因子に上の導関数係数を適用すると表示の積を得ます。逆にFock空間の有限励起状態は定義上これらの生成子の有限積の線形結合なので、全てがこの形で得られます。
<!-- proof-end -->

具体的には $|a\rangle=a_{-1}|0\rangle$、$|\partial a\rangle=a_{-2}|0\rangle$、$|:a^2:\rangle=a_{-1}^2|0\rangle$。場の積で発散する項を先に引くことが、振動子の正規順序とちょうど対応します。反正則側も $\bar a(\bar z)$ の独立なモードで同形ですが、ここからは正則側だけに集中します。

## 3. 一次場から最高ウェイト状態へ

[QFT50の一次場Ward核](../QFT50/index.md#thm-qft50-primary-ward)の二次極はウェイト、一次極は移動を表しました。以下、$\partial\mathcal O(w)=\partial_w\mathcal O(w)$ は $\bar w$ を固定した正則方向の微分です。原点の挿入状態に輪郭モードを作用させると、その二つの項がそのまま「最高ウェイト」の条件になります。

<a id="def-qft52-primary-descendant"></a>

<!-- formal-statement-start -->
> **定義（正則一次場・最高ウェイト状態・子孫）**  
> 平面真空を持ち、応力テンソル $t$ の局所Ward OPEが成り立つ二次元理論で、正則局所場 $\mathcal O(w)$ が、他の挿入点を固定した相関関数の中で

$$
t(z)\mathcal O(w)\sim
\frac{h\mathcal O(w)}{(z-w)^2}
+\frac{\partial\mathcal O(w)}{z-w}
$$

> を満たすとき、正則ウェイト $h$ の一次場という。$|h\rangle=\mathcal O(0)|0\rangle$ が存在し、$L_n|0\rangle=0$（$n\ge-1$）なら、この状態は $L_n|h\rangle=0$（$n>0$）かつ $L_0|h\rangle=h|h\rangle$ を満たす最高ウェイト状態である。$L_{-n_1}\cdots L_{-n_k}|h\rangle$（$n_j\ge1$）をVirasoro子孫といい、$N=\sum_jn_j$ をレベルという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft52-primary-descendant -->
**定義の確認** [QFT51の $tJ$ OPE](../QFT51/index.md#prop-qft51-stress-current-ope)は二次極の係数が $J$、一次極の係数が $\partial_wJ$ であることを示すので、$a=i\sqrt{2g}J$ もウェイト $h=1$ の一次場です。対応する原点状態は $|a\rangle=a_{-1}|0\rangle$ です。

[QFT50の輪郭電荷](../QFT50/index.md#def-qft50-contour-charge)で $\epsilon(z)=z^{n+1}$ とすると、挿入点 $w$ の二次極・一次極の留数は

$$
[L_n,a(w)]=w^{n+1}\partial_wa(w)+(n+1)w^na(w).
$$

先に得た $a(w)|0\rangle=\sum_{k\ge1}w^{k-1}a_{-k}|0\rangle$ は原点で正則なので、右辺の微分も項別に評価できます。$L_n|0\rangle=0$（$n\ge-1$）を用いて原点極限を取ると

$$
L_0|a\rangle=|a\rangle,\qquad
L_n|a\rangle=0\quad(n\ge1).
$$

さらに[Virasoro交換子](../QFT51/index.md#thm-qft51-virasoro)の $[L_0,L_{-k}]=kL_{-k}$ により、$L_{-1}|a\rangle$ はレベル1でウェイト2、$L_{-2}|a\rangle$ はレベル2でウェイト3です。定義したOPEの二つの極から、正モードの消滅条件とウェイトを直接確認できました。
<!-- definition-example-end -->

<a id="thm-qft52-primary-modes"></a>

<!-- formal-statement-start -->
> **定理（一次場の輪郭モード作用）**  
> 上の一次場 $\mathcal O$ の近傍で $t(z)\mathcal O(w)$ の特異部分が定義どおりで、輪郭変形が可能とする。$L_n=(2\pi i)^{-1}\oint z^{n+1}t(z)dz$ とすれば

$$
[L_n,\mathcal O(w)]
=\left(w^{n+1}\partial_w+(n+1)h w^n\right)\mathcal O(w).
$$

> 原点挿入状態が存在し、真空が $L_n|0\rangle=0$（$n\ge-1$）を満たすなら $L_n|h\rangle=0$（$n>0$）、$L_0|h\rangle=h|h\rangle$、$L_{-1}|h\rangle=|\partial\mathcal O\rangle$ である。
<!-- formal-statement-end -->

### 証明の見取り図

二次極は $w^{n+1}$ の一階導関数を、単純極はその値を残します。$n\ge1$ では原点に $w^n$ が残るため消滅します。

<!-- proof-start -->
### 証明

[QFT51の輪郭モード定義](../QFT51/index.md#def-qft51-virasoro-modes)に従い $z=w$ の小円へ輪郭を縮めると

$$
\begin{aligned}
[L_n,\mathcal O(w)]
&=\operatorname{Res}_{z=w}
z^{n+1}\left[\frac{h\mathcal O(w)}{(z-w)^2}
+\frac{\partial\mathcal O(w)}{z-w}\right]\\
&=(n+1)w^nh\mathcal O(w)
+w^{n+1}\partial\mathcal O(w).
\end{aligned}
$$

$n\ge1$ では両方の $w$ の冪が正なので、原点挿入状態の正則な極限で零です。$n=0$ では $w\partial\mathcal O\to0$、もう一項が $h\mathcal O(0)$。$n=-1$ では $(n+1)=0$ で微分だけが残ります。真空へ作用する交換子の右辺に $\mathcal O(w)L_n|0\rangle=0$ を足して極限を取れば三つの結論を得ます。
<!-- proof-end -->

ここで注意すべきことがあります。**最高ウェイト状態は一次場の像ですが、子孫場は一般には一次場ではありません。** 例えば $t$ 自身は[QFT51の四次極](../QFT51/index.md#def-qft51-stress-ope)を持つため、単純なウェイト2の一次場ではありません。$L_{-2}|0\rangle$ は真空の子孫であり、$L_2$ を作用させると中心電荷に比例する項が残ります。

## 4. Virasoroの表現をレベルごとに組み立てる

自由bosonだけでなく、任意の中心電荷 $c$ とウェイト $h$ に対して代数的な「あり得る子孫」を先に全て用意し、実際の理論で不要なベクトルを除くと見通しが立ちます。

<a id="def-qft52-verma"></a>

<!-- formal-statement-start -->
> **定義（Virasoro Verma加群）**  
> [Virasoro交換関係](../QFT51/index.md#thm-qft51-virasoro)で中心元を数 $c$ として作用させ、$L_n|h\rangle=0$（$n>0$）、$L_0|h\rangle=h|h\rangle$ を満たす非零の形式的生成ベクトルを置く。負モードの順序付き積

$$
L_{-n_1}\cdots L_{-n_k}|h\rangle,
\qquad n_1\ge\cdots\ge n_k\ge1
$$

> が張る普遍最高ウェイト表現をVerma加群 $M(c,h)$ とする。$\sum n_j=N$ の部分空間をレベル $N$ と呼ぶ。具体的な理論の表現は $M(c,h)$ の商になり得るので、これらの形式的子孫が全て独立な物理状態とは限らない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft52-verma -->
**定義の確認** レベル0には $|h\rangle$、レベル1には $L_{-1}|h\rangle$。レベル2には $L_{-2}|h\rangle$ と $L_{-1}^2|h\rangle$ があり、正整数2を正の整数の和として表す方法が $2$ と $1+1$ の二通りであることに対応します。

交換子 $[L_0,L_{-n}]=nL_{-n}$ を反復すれば、レベル $N$ の状態の固有値は $h+N$。例えば $[L_0,L_{-2}]|h\rangle=2L_{-2}|h\rangle$ で、レベルと固有値の増分が一致します。
<!-- definition-example-end -->

自由電流での表現も導きます。[QFT51の $tJ$ OPE](../QFT51/index.md#prop-qft51-stress-current-ope)を正規化電流 $a$ に読み替えると

$$
t(z)a(w)\sim\frac{a(w)}{(z-w)^2}
+\frac{\partial a(w)}{z-w}.
$$

このとき[一次場の輪郭公式](#thm-qft52-primary-modes)に $h=1$ を代入し、$a_n=\oint w^na(w)dw/(2\pi i)$ へ積分すると

$$
\begin{aligned}
[L_m,a_n]
&=\oint\frac{dw}{2\pi i}
w^n\left(w^{m+1}\partial a+(m+1)w^m a\right)\\
&=-(m+n+1)a_{m+n}+(m+1)a_{m+n}\\
&=-n a_{m+n}.
\end{aligned}
$$

ここで第1項は円周上の全微分を積分して零とした結果です。これにより $[L_m,a_n]$ は独立に記憶する公式ではなく、Ward核の積分だと分かります。

<a id="prop-qft52-sugawara-levels"></a>

<!-- formal-statement-start -->
> **命題（自由bosonの低レベルVirasoro子孫）**  
> 零電荷自由bosonの正規順序応力テンソル $t=\tfrac12:a^2:$、$L_n=\oint z^{n+1}t(z)dz/(2\pi i)$ を用いると

$$
L_{-1}|0\rangle=0,
\qquad L_{-2}|0\rangle=\frac12a_{-1}^2|0\rangle,
\qquad L_{-1}a_{-1}|0\rangle=a_{-2}|0\rangle.
$$

> 特に真空のレベル1子孫は零だが、レベル2子孫はノルム二乗 $1/2$ の非零状態である。
<!-- formal-statement-end -->

### 証明の見取り図

$t$ の二次モード和を真空に作用させると、両方の添字が負である項だけが残ります。最後の式は $[L_{-1},a_{-1}]=a_{-2}$ から出ます。

<!-- proof-start -->
### 証明

電流の[Laurent展開の係数公式](../../../解析系/CA/CA4/index.md#thm-ca4-laurent)に対応するモード級数を $t(z)=\tfrac12:a(z)^2:$ に代入して $z^{-n-2}$ の係数を取れば

$$
L_n=\frac12\sum_{k\in\mathbb Z}:a_{n-k}a_k:.
$$

正規順序は生成モードを左に置く規則です。$a_k|0\rangle=0$（$k\ge0$）なので、$L_n|0\rangle$ で残るのは $k<0$ かつ $n-k<0$ の項だけ。$n=-1$ では二つの負整数の和が $-1$ になることはなく、$L_{-1}|0\rangle=0$。$n=-2$ では $k=-1$ のみで

$$
L_{-2}|0\rangle=\frac12a_{-1}a_{-1}|0\rangle.
$$

先に導いた $[L_m,a_n]=-n a_{m+n}$ に $m=n=-1$ を入れると $[L_{-1},a_{-1}]=a_{-2}$。従って $L_{-1}a_{-1}|0\rangle=a_{-2}|0\rangle+a_{-1}L_{-1}|0\rangle=a_{-2}|0\rangle$。最後に[Heisenberg交換子](#prop-qft52-heisenberg)で $\|a_{-1}^2|0\rangle\|^2=2$ だから、$\|L_{-2}|0\rangle\|^2=2/4=1/2$ です。
<!-- proof-end -->

## 5. 内積で零状態を見つける

一般のCFTで正値内積を要求すると、形式的に書ける子孫のうち幾つかは物理Hilbert空間では零になります。その確認には大きな表現論の定理を使う前に、低レベルの内積行列を実計算できます。

ここでの反射は、$z=e^{\tau+i\theta}$ で円を時間切片にしたときの $\tau\mapsto-\tau$、すなわち単位円についての $z\mapsto1/\bar z$ です。[QFT20の反射陽性](../QFT20/index.md#def-qft20-reflection-positivity)で学んだ「反射後の相関関数から非負の二次形式を作る」という考え方を使いますが、直交座標の時間反射についての検算だけから動径反射での正値性が自動的に従うわけではありません。以下では動径反射に基づく正半定値な内積と $L_n^\dagger=L_{-n}$ を**追加の仮定**として扱います。まず零ノルム状態を含む空間を考え、零空間で割って正定値な内積を得た後に完備化してHilbert空間を作ります。

<a id="def-qft52-null-state"></a>

<!-- formal-statement-start -->
> **定義（特異ベクトル・零ノルム子孫）**  
> Verma加群 $M(c,h)$ の正のレベルにある非零ベクトル $v$ が、全ての正整数 $n$ について

$$
L_nv=0\qquad(n>0)
$$

> を満たすとき特異ベクトルという。上で述べた動径反射に関する正半定値内積と $L_n^\dagger=L_{-n}$ の随伴性を持つ表現で、

$$
\langle v,v\rangle=0
$$

> となる子孫を零ノルム子孫という。正半定値内積の零ノルムベクトルは全状態と直交するため、その零空間で商を取った物理Hilbert空間では零ベクトルと同一視される。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft52-null-state -->
**定義の確認** 真空の $L_{-1}|0\rangle$ は形式的Verma加群 $M(c,0)$ では非零です。しかし[Virasoro交換関係](../QFT51/index.md#thm-qft51-virasoro)を使うと $L_1L_{-1}|0\rangle=[L_1,L_{-1}]|0\rangle=2L_0|0\rangle=0$。

$n\ge2$ でも $[L_n,L_{-1}]=(n+1)L_{n-1}$ は真空を消すので、全ての正モードで消える特異ベクトルです。自由bosonの具体表現では[上の命題](#prop-qft52-sugawara-levels)により実際に $L_{-1}|0\rangle=0$。形式的ベクトルと具体的な零状態の違いが見えます。
<!-- definition-example-end -->

<a id="thm-qft52-level-gram"></a>

<!-- formal-statement-start -->
> **定理（レベル1・2のGram行列）**  
> 中心電荷 $c\in\mathbb R$、実ウェイト $h$ の最高ウェイト状態 $|h\rangle$ を $\langle h|h\rangle=1$ とし、$L_n^\dagger=L_{-n}$ およびVirasoro交換関係を仮定する。レベル1のノルム二乗は $2h$。レベル2の順序付き子孫 $L_{-2}|h\rangle,L_{-1}^2|h\rangle$ のGram行列は

$$
G_2(c,h)=
\begin{pmatrix}
4h+c/2&6h\\
6h&4h(2h+1)
\end{pmatrix},
\qquad
\det G_2=2h\{16h^2+2(c-5)h+c\}.
$$

> 普遍Verma加群ではこの二つは基底だが、具体的な表現では零や従属になり得るので、Gram行列を作る段階で一次独立性は要求しない。特に正値性には $h\ge0$ と $G_2$ の正半定値性が必要である。これらは低レベルの必要条件であり、全レベルでのユニタリ性の十分条件ではない。
<!-- formal-statement-end -->

### 証明の見取り図

左の正モードを右へ交換し、最高ウェイト状態を消すまで移動します。非対角項と二つの対角項を別々に計算します。

<!-- proof-start -->
### 証明

まず $L_1|h\rangle=L_2|h\rangle=0$、$L_0|h\rangle=h|h\rangle$ です。[Virasoro交換関係](../QFT51/index.md#thm-qft51-virasoro)を適用すると

$$
\|L_{-1}|h\rangle\|^2
=\langle h|[L_1,L_{-1}]|h\rangle=2h.
$$

レベル2の左上成分は、中心項を含む $[L_2,L_{-2}]=4L_0+c/2$ から

$$
\langle h|L_2L_{-2}|h\rangle=4h+c/2.
$$

非対角成分では $[L_2,L_{-1}]=3L_1$ を二回分使い、右端の $L_2$ は消えるので

$$
\begin{aligned}
L_2L_{-1}^2|h\rangle
&=3(L_1L_{-1}+L_{-1}L_1)|h\rangle\\
&=3[L_1,L_{-1}]|h\rangle=6h|h\rangle.
\end{aligned}
$$

右下は $[L_1,L_{-1}]=2L_0$ を使い、$L_0L_{-1}|h\rangle=(h+1)L_{-1}|h\rangle$ から

$$
\begin{aligned}
L_1L_{-1}^2|h\rangle
&=2(L_0L_{-1}+L_{-1}L_0)|h\rangle\\
&=(4h+2)L_{-1}|h\rangle,\\
L_1^2L_{-1}^2|h\rangle
&=(4h+2)2h|h\rangle=4h(2h+1)|h\rangle.
\end{aligned}
$$

以上の行列式を積で展開すると

$$
\begin{aligned}
\det G_2
&=(4h+c/2)4h(2h+1)-36h^2\\
&=4h\bigl[8h^2+(c-5)h+c/2\bigr],
\end{aligned}
$$

で、表示の式となります。正半定値なら全てのベクトルのノルム二乗が非負なので、$2h\ge0$ と全ての主小行列式の非負性が必要です。
<!-- proof-end -->

<a id="cor-qft52-c1-null"></a>

<!-- formal-statement-start -->
> **系（自由bosonのレベル2特異ベクトル）**  
> $c=1,h=1/4$ のVirasoro Verma加群では

$$
v=(L_{-2}-L_{-1}^2)|h\rangle
$$

> は非零の形式的な特異ベクトルで、Gram内積に関して零ノルムである。正値内積を持つ具体的なユニタリ表現への商写像では $v$ は零となる。$c=1$ の自由boson電流Fock表現にある電荷 $q=1/\sqrt2$ の最高ウェイト状態では、この消滅を振動子で直接確認できる。
<!-- formal-statement-end -->

### 証明の見取り図

$G_2(1,1/4)$ の二列が等しくなります。さらに $L_1,L_2$ が $v$ を消すことを交換子で確かめ、残りの正モードはレベルのため自動的に消えます。自由場では振動子二種類の係数が一致します。

<!-- proof-start -->
### 証明

[レベル2のGram行列](#thm-qft52-level-gram)に $c=1,h=1/4$ を代入すると、$4h+c/2=3/2$、$6h=3/2$、$4h(2h+1)=3/2$ なので

$$
G_2(1,1/4)=\frac32
\begin{pmatrix}1&1\\1&1\end{pmatrix}.
$$

従って $(1,-1)$ 方向のノルムは零です。交換子で正モードを作用させると

$$
\begin{aligned}
L_1v&=\{3-(4h+2)\}L_{-1}|h\rangle=0,\\
L_2v&=\{4h+c/2-6h\}|h\rangle=0.
\end{aligned}
$$

$n\ge3$ では $[L_n,L_{-2}]=(n+2)L_{n-2}$、$[L_n,L_{-1}]=(n+1)L_{n-1}$ です。二つの交換子を順に使えば、$L_n v$ の各項は最高ウェイト状態に作用する正モードへ帰着して消えます。普遍Verma加群ではPBW型の順序付き二状態を独立に用意しているので $v$ は形式的に非零です。

自由bosonの電荷部門を $a_0|q\rangle=q|q\rangle$、$a_n|q\rangle=0$（$n>0$）と定めます。[正規順序モード和](#prop-qft52-sugawara-levels) $L_n=\tfrac12\sum_k:a_{n-k}a_k:$ で、$L_0$ に残るのは零モード二個、$L_{-1}$ に残るのは添字 $(-1,0)$ と $(0,-1)$ の二組なので

$$
L_0|q\rangle=\frac{q^2}{2}|q\rangle,\qquad
L_{-1}|q\rangle=\frac12(a_{-1}a_0+a_0a_{-1})|q\rangle=q a_{-1}|q\rangle.
$$

$L_{-2}$ にはさらに $(-1,-1)$ の組が加わるため、

$$
\begin{aligned}
L_{-2}|q\rangle
&=\left(q a_{-2}+\frac12a_{-1}^2\right)|q\rangle,\\
L_{-1}^2|q\rangle
&=L_{-1}(q a_{-1}|q\rangle)\\
&=\left(q a_{-2}+q^2a_{-1}^2\right)|q\rangle.
\end{aligned}
$$

二行目では $[L_{-1},a_{-1}]=a_{-2}$ を使いました。$q=1/\sqrt2$ なら $q^2=1/2$ だから差は零です。なおこの電荷部門は先に構成した零電荷の真空部門とは別の最高ウェイト部門であり、非コンパクト自由場の指数演算子を用いるには赤外・零モードの規格化を追加で指定する必要があります。
<!-- proof-end -->

**失敗例と停止線。** $h<0$ ならレベル1のノルム $2h$ が負なので正値Hilbert空間とは両立しません。しかし $h\ge0$ と $\det G_2\ge0$ だけで全レベルが正値と結論するのも誤りです。レベル3以上のGram行列を調べずに全表現のユニタリ性を証明したことにはなりません。また $G_2$ の行列式が零でも、普遍Verma加群の形式的ベクトルが初めから存在しなかったことにはなりません。零ノルムを商で除く順序が必要です。

## 演習：円のモードから零状態まで

### 演習 QFT52-A1：二つの輪郭の順序

- Level: A
- 問題: $a(z)a(w)\sim(z-w)^{-2}$ と $a_n=\oint z^na(z)dz/(2\pi i)$ から $[a_2,a_{-2}]$ と $[a_1,a_{-2}]$ を求めよ。どの指数のとき外側の輪郭が留数を持つか示せ。

**詳細解答**：内側で $z^m$ を掛けた二次極の留数は $mw^{m-1}$、外側で $w^n$ を掛けた指数は $m+n-1$ です。指数が $-1$ の場合、すなわち $m+n=0$ のときだけ留数があります。従って

$$
[a_2,a_{-2}]=2,\qquad [a_1,a_{-2}]=0.
$$

後者では指数が $-2$ なので外側の留数は零です。

### 演習 QFT52-A2：導関数と生成モード

- Level: A
- 問題: $a(z)|0\rangle=\sum_{k\ge1}z^{k-1}a_{-k}|0\rangle$ を使い、$\partial^2a(0)|0\rangle$ と $:\!a\partial a\!:(0)|0\rangle$ を振動子で表せ。

**詳細解答**：[モードから導関数への対応](#thm-qft52-free-state-operator)で用いた級数を $z$ で二回微分すると

$$
\partial_z^2a(z)|0\rangle=\sum_{k\ge3}(k-1)(k-2)z^{k-3}a_{-k}|0\rangle.
$$

$z=0$ では $k=3$ だけが残り、$\partial_z^2a(0)|0\rangle=2a_{-3}|0\rangle$。もう一方は[点分離正規順序](../QFT51/index.md#def-qft51-wick-stress)で自己収縮を除き、それぞれの生成モードだけを残すので

$$
:\!a\partial_za\!:(0)|0\rangle=a_{-1}a_{-2}|0\rangle.
$$

### 演習 QFT52-A3：一次場のモード作用

- Level: A
- 問題: 正則ウェイト $h$ の一次場 $\mathcal O$ と $[L_n,\mathcal O(w)]=(w^{n+1}\partial+(n+1)hw^n)\mathcal O(w)$ に対し、$n=-1,0,1$ を具体的に書き、原点状態への作用を求めよ。

**詳細解答**：与えられた式へ $n=-1,0,1$ を順に代入すると

$$
\begin{aligned}
[L_{-1},\mathcal O]&=\partial\mathcal O,\\
[L_0,\mathcal O]&=w\partial\mathcal O+h\mathcal O,\\
[L_1,\mathcal O]&=w^2\partial\mathcal O+2hw\mathcal O.
\end{aligned}
$$

真空消滅条件 $L_n|0\rangle=0$ と原点極限の正則性を適用すれば、順に $L_{-1}|\mathcal O\rangle=|\partial\mathcal O\rangle$、$L_0|\mathcal O\rangle=h|\mathcal O\rangle$、$L_1|\mathcal O\rangle=0$ です。

### 演習 QFT52-A4：レベル2の二つの分割

- Level: A
- 問題: $[L_0,L_{-n}]=nL_{-n}$ と最高ウェイト条件から、$L_{-2}|h\rangle$ と $L_{-1}^2|h\rangle$ の $L_0$ 固有値を求めよ。レベル2に二つの候補がある理由も述べよ。

**詳細解答**：[Virasoro交換関係](../QFT51/index.md#thm-qft51-virasoro)を一因子ずつ作用させると

$$
\begin{aligned}
L_0L_{-2}|h\rangle&=L_{-2}L_0|h\rangle+[L_0,L_{-2}]|h\rangle=(h+2)L_{-2}|h\rangle,\\
[L_0,L_{-1}^2]&=[L_0,L_{-1}]L_{-1}+L_{-1}[L_0,L_{-1}]=2L_{-1}^2,\\
L_0L_{-1}^2|h\rangle&=(h+2)L_{-1}^2|h\rangle.
\end{aligned}
$$

整数2の分割が $2$ と $1+1$ の二通りなので、普遍Verma加群では両方を候補として含めます。

### 演習 QFT52-A5：負ウェイトの障害

- Level: A
- 問題: $L_1^\dagger=L_{-1}$、$[L_1,L_{-1}]=2L_0$、$L_1|h\rangle=0$、$\langle h|h\rangle=1$ を仮定する。$h=-1/8$ のレベル1子孫のノルム二乗を求め、正値内積と両立するか判定せよ。

**詳細解答**：随伴性と $L_1|h\rangle=0$ から

$$
\begin{aligned}
\langle h|L_1L_{-1}|h\rangle
&=\langle h|[L_1,L_{-1}]|h\rangle\\
&=\langle h|2L_0|h\rangle=2h=-\frac14.
\end{aligned}
$$

負ノルム状態は正値Hilbert空間に存在できないので、この仮定のままユニタリな表現とは両立しません。非ユニタリな代数的表現まで否定する結果ではありません。

### 演習 QFT52-B1：レベル2の非対角成分

- Level: B
- 問題: $L_2|h\rangle=L_1|h\rangle=0$ とVirasoro交換関係から $\langle h|L_2L_{-1}^2|h\rangle$ を、途中の交換子を省略せずに求めよ。

**詳細解答**：交換子を二つの $L_{-1}$ にそれぞれ作用させ、右端の $L_2$ は最高ウェイト状態を消します。従って

$$
\begin{aligned}
L_2L_{-1}^2|h\rangle
&=([L_2,L_{-1}]L_{-1}+L_{-1}[L_2,L_{-1}])|h\rangle\\
&=3(L_1L_{-1}+L_{-1}L_1)|h\rangle\\
&=3[L_1,L_{-1}]|h\rangle\\
&=6L_0|h\rangle=6h|h\rangle.
\end{aligned}
$$

$\langle h|h\rangle=1$ を用いて左から内積を取ると、求める非対角成分は $6h$ です。

### 演習 QFT52-B2：真空の子孫と電流の子孫

- Level: B
- 問題: 零電荷自由bosonで $L_n=\frac12\sum_k:a_{n-k}a_k:$、$a_n|0\rangle=0$（$n\ge0$）と $[L_m,a_n]=-na_{m+n}$ を仮定する。$L_{-1}|0\rangle$、$L_{-2}|0\rangle$、$L_{-1}a_{-1}|0\rangle$ を求め、非零の二つの状態のノルム二乗を比較せよ。

**詳細解答**：$n=-1$ では負の整数二個の和が $-1$ になることはなく、$n=-2$ では $k=-1$ のみが残ります。さらに $[L_{-1},a_{-1}]=a_{-2}$ より

$$
L_{-1}|0\rangle=0,\quad
L_{-2}|0\rangle=\frac12a_{-1}^2|0\rangle,\quad
L_{-1}a_{-1}|0\rangle=a_{-2}|0\rangle.
$$

Heisenberg交換子から $\langle0|a_1^2a_{-1}^2|0\rangle=2$、$\langle0|a_2a_{-2}|0\rangle=2$。従って非零の二状態のノルム二乗はそれぞれ $1/2$ と $2$ です。両方のウェイトは2でも異なる状態です。

### 演習 QFT52-B3：Gram行列の正半定値条件

- Level: B
- 問題: $G_2(c,h)$ を用い、$c=1$ で $\det G_2$ を因数分解せよ。$h=1/4$ の核ベクトルを求め、$h=0$ の場合とどこが異なるか説明せよ。

**詳細解答**：[レベル2のGram行列](#thm-qft52-level-gram)の行列式へ $c=1$ を代入し、二次式を平方にします。

$$
\det G_2=2h[16h^2-8h+1]=2h(4h-1)^2.
$$

$h=1/4$ と $h=0$ の二つの場合では、行列とその核はそれぞれ

$$
\begin{aligned}
G_2(1,1/4)&=\frac32\begin{pmatrix}1&1\\1&1\end{pmatrix},
&\ker G_2(1,1/4)&=\operatorname{span}\{(1,-1)^\mathsf T\},\\
G_2(1,0)&=\begin{pmatrix}1/2&0\\0&0\end{pmatrix},
&\ker G_2(1,0)&=\operatorname{span}\{(0,1)^\mathsf T\}.
\end{aligned}
$$

後者はレベル1で $L_{-1}|0\rangle$ を商で消したことに由来する $L_{-1}^2|0\rangle$ です。前者では二つのレベル2候補の**差**が消えます。行列式の非負性だけで全レベルの正値性は保証できません。

### 演習 QFT52-B4：荷電Fock状態のnull条件

- Level: B
- 問題: $a_0|q\rangle=q|q\rangle$、$a_n|q\rangle=0$（$n>0$）、$L_n=\frac12\sum_k:a_{n-k}a_k:$ とする。$L_{-2}|q\rangle$ と $L_{-1}^2|q\rangle$ を求め、$(L_{-2}-L_{-1}^2)|q\rangle=0$ となる実 $q$ を全て求めよ。

**詳細解答**：[正規順序モード和からの計算](#cor-qft52-c1-null)と $[L_{-1},a_{-1}]=a_{-2}$ を使うと

$$
\begin{aligned}
L_{-1}|q\rangle&=q a_{-1}|q\rangle,\\
L_{-2}|q\rangle&=\left(q a_{-2}+\frac12a_{-1}^2\right)|q\rangle,\\
L_{-1}^2|q\rangle&=q\bigl([L_{-1},a_{-1}]+a_{-1}L_{-1}\bigr)|q\rangle\\
&=\left(q a_{-2}+q^2a_{-1}^2\right)|q\rangle.
\end{aligned}
$$

従って差は $(1/2-q^2)a_{-1}^2|q\rangle$ です。$[a_1,a_{-1}]=1$ と $a_1|q\rangle=0$ により $\|a_{-1}^2|q\rangle\|^2=2$ なので、この差が零となる実電荷は $q=\pm1/\sqrt2$ に限ります。いずれも $h=q^2/2=1/4$ で、[Gram行列の退化条件](#thm-qft52-level-gram)と一致します。

### 演習 QFT52-C1：局所場からレベル2零状態まで

- Level: C
- 問題: $g>0$ の二次元自由boson、$a=i\sqrt{2g}\partial\phi$、$t=\frac12:a^2:$、零電荷真空を考え、必要な部分だけから次の一連の結論を導け。第4問では別に電荷 $q$ のFock部門を導入する。

1. $a(z)a(w)$ の特異項とモード交換子、$\|a_{-1}|0\rangle\|^2$ を求める。
2. $t(z)a(w)$ のOPEから $[L_m,a_n]$ を求め、$a(0)|0\rangle$ がウェイト1の最高ウェイト状態であると示す。
3. 中心電荷 $c=1$ のレベル2Gram行列を $h$ の式で求め、$h=1/4$ に特異な方向があることを示す。
4. その方向の正モード消滅条件を検査し、自由bosonの荷電Fock部門 $q=1/\sqrt2$ で同じ状態が消える理由を振動子式から説明する。

**詳細解答**：

**（1）電流の交換子。** [前章の収縮](../QFT51/index.md#prop-qft51-current-two-point)に $a=i\sqrt{2g}J$ を代入すると

$$
\langle a(z)a(w)\rangle
=i^2(2g)\left[-\frac1{2g(z-w)^2}\right]
=\frac1{(z-w)^2}.
$$

内側輪郭で $z^m$ を掛けた二次極の留数は $mw^{m-1}$。外側で $w^n$ を掛けると $m+n=0$ の場合だけ残り、$[a_m,a_n]=m\delta_{m+n,0}$。規格化真空から $\|a_{-1}|0\rangle\|^2=\langle0|a_1a_{-1}|0\rangle=1$ です。

**（2）一次場と最高ウェイト。** $t(z)a(w)$ の二次極・一次極をそれぞれ留数で積分すると

$$
\begin{aligned}
t(z)a(w)&\sim\frac{a(w)}{(z-w)^2}+\frac{\partial a(w)}{z-w},\\
[L_m,a(w)]&=w^{m+1}\partial a(w)+(m+1)w^ma(w).
\end{aligned}
$$

さらに $w^n$ で積分して第1項を部分積分すると係数は $-(m+n+1)+(m+1)=-n$、つまり $[L_m,a_n]=-na_{m+n}$。従って $|a\rangle=a_{-1}|0\rangle$ に対して

$$
L_0|a\rangle=|a\rangle,
\qquad L_m|a\rangle=a_{m-1}|0\rangle=0\quad(m\ge1).
$$

**（3）レベル2内積。** $[L_2,L_{-2}]=4L_0+1/2$ から左上 $4h+1/2$、$[L_2,L_{-1}]=3L_1$ から非対角 $6h$ を得ます。$L_1L_{-1}^2|h\rangle=(4h+2)L_{-1}|h\rangle$ から右下は $4h(2h+1)$。よって

$$
G_2(1,h)=\begin{pmatrix}4h+1/2&6h\\6h&4h(2h+1)\end{pmatrix},
\qquad\det G_2=2h(4h-1)^2.
$$

$h=1/4$ では $G_2=(3/2)\begin{pmatrix}1&1\\1&1\end{pmatrix}$ となり、核方向は $v=(L_{-2}-L_{-1}^2)|h\rangle$ です。

**（4）特異性と自由場での消滅。** 正モードを $v$ へ作用させると

$$
\begin{aligned}
L_1v&=[3-(4h+2)]L_{-1}|h\rangle=0,\\
L_2v&=(4h+1/2-6h)|h\rangle=0.
\end{aligned}
$$

$L_{n\ge3}$ も交換子の正モードが最高ウェイト状態を消します。電荷 $q=1/\sqrt2$ の部門では $h=q^2/2=1/4$、さらに

$$
\begin{aligned}
L_{-2}|q\rangle&=(q a_{-2}+a_{-1}^2/2)|q\rangle,\\
L_{-1}^2|q\rangle&=(q a_{-2}+q^2a_{-1}^2)|q\rangle
\end{aligned}
$$

で、$q^2=1/2$ により二状態は一致します。普遍Verma加群では差が形式的特異ベクトルですが、自由bosonの正値表現ではその零ノルム方向を商で除いた状態空間になっています。

## この章で確認したこと

放射量子化では局所挿入から状態が作られ、自由bosonの零電荷部門では微分電流の正規順序積と負モードの積を一対一に照合できます。一次場は最高ウェイト状態を作り、Virasoro負モードがその子孫を作ります。レベル1・2のGram行列を交換関係から直接求めると、$c=1,h=1/4$ の特異ベクトルが現れ、自由場の電荷部門では実際に零になることまで分かりました。次は自由bosonと自由Majorana場の相関関数・中心電荷を比較し、模型ごとに一次場と子孫の作り方を検証します。
