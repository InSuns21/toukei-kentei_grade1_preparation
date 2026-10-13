# CELE7 共鳴・KAM・規則運動とカオスの共存

<!-- definition-example-audit: strict -->

> **使う結果**：[共鳴と小分母](../../../幾何系/INT/INT4/index.md#def-int4-resonance)、[CELE5の一次共鳴障害](../CELE5/index.md#prop-cele5-resonance-obstruction)、[CELE6のホモクリニック交差](../CELE6/index.md#def-cele6-homoclinic)、[INT7の面積保存帰還写像](../../../幾何系/INT/INT7/index.md#prop-int7-return-area)、[INT8の解析的KAM定理](../../../幾何系/INT/INT8/index.md#thm-int8-kam)です。KAM定理の収束証明はINT8にあり、本章では天体力学的な帰結と適用条件を具体的に検査します。

## 1. カオスが生じても、なぜすべての軌道が乱れないのか

前章は、分離曲線が横断的に交わるとhorseshoe型の複雑な不変集合が生じ得ることを見ました。しかし、横断交差が存在するという結論は、**同じエネルギー面のすべての軌道がカオス的になる**ことを意味しません。二体Kepler運動から少しずれた軌道が長く規則的である一方、近隣の共鳴帯に複雑な軌道がある、という両立を理解したいのです。

そのために、まず一つの共鳴だけを取り出すと振り子が現れ、楕円型の島と双曲型の分離曲線を**手計算**できます。次に、第二の角度依存を加えるとその簡単な積分可能性が壊れ得ることを確認します。それでも十分小さい摂動と十分良い非共鳴振動数を備えた領域には、[KAM定理](../../../幾何系/INT/INT8/index.md#thm-int8-kam)によって存続するトーラスがあります。

本章のキーワードは「島があるから安定」「点が散るからカオス」と早合点しないことです。写像の正しい次元、定理の仮定、数値計算で観測した時間を分けます。

## 2. 一対一共鳴を正準変数で切り出す

[作用角変数](../../../幾何系/INT/INT3/index.md#def-int3-action-angle)をもつ二振動子の非摂動Hamiltonianを

$$
K(I_1,I_2)=\frac12(I_1^2+I_2^2),\qquad
\theta_1,\theta_2\in\mathbb T=\mathbb R/2\pi\mathbb Z
$$

とします。角速度は $\omega_1=I_1,\ \omega_2=I_2$。$I_1=I_2$ では二つの角度が同じ速さで動きます。通常の平均化では角度差 $\theta_1-\theta_2$ の項を消そうとして分母 $\omega_1-\omega_2$ に出会いますが、共鳴面ではこれが零です。この**消せない遅い角度**を直接座標に採用します。

<a id="def-cele7-resonant-angle"></a>

<!-- formal-statement-start -->
> **定義（整数共鳴と共鳴角）**  
> 二自由度の作用角領域で、非摂動振動数 $\omega(I)=\nabla K(I)$ と零でない整数ベクトル $k\in\mathbb Z^2$ に対し
>
$$
k\cdot\omega(I_*)=0
$$
>
> が成り立つ点 $I_*$ は $k$ に関して共鳴しているという。対応する角度 $k\cdot\theta\pmod{2\pi}$ を共鳴角という。本章の一対一共鳴では $k=(1,-1)$、共鳴角は $\phi=\theta_1-\theta_2$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cele7-resonant-angle -->

**定義の確認**。$I_*=(2,2)$ なら $\omega(I_*)=(2,2)$ で $(1,-1)\cdot(2,2)=0$ です。したがって $\phi$ は非摂動運動では一定です。一方 $I=(2,3)$ では $\dot\phi=2-3=-1$ なので、共鳴角は一定ではありません。共鳴かどうかは、整数ベクトルと振動数の内積が零になるかで判定します。

<!-- definition-example-end -->

摂動後の最小模型を

$$
H_\varepsilon(I,\theta)
=\frac12(I_1^2+I_2^2)+\varepsilon\cos(\theta_1-\theta_2),
\qquad \varepsilon>0
$$

とします。まだ一つの角度差しか現れないため、この模型は完全に計算できます。

<a id="prop-cele7-resonant-reduction"></a>

<!-- formal-statement-start -->
> **命題（二振動子の一対一共鳴還元）**  
> 上の $H_\varepsilon$ に対して
>
$$
P=I_1+I_2,\quad J=\frac{I_1-I_2}{2},\quad
\psi=\frac{\theta_1+\theta_2}{2},\quad
\phi=\theta_1-\theta_2
$$
>
> を局所正準座標として用いると
>
$$
H_\varepsilon=\frac{P^2}{4}+J^2+\varepsilon\cos\phi,\qquad
\dot P=0,\quad \dot\psi=P/2,\quad
\dot\phi=2J,\quad\dot J=\varepsilon\sin\phi.
$$
>
> よって $P$ を固定した還元系は一自由度の振り子であり、$\phi=\pi,J=0$ は楕円型、$\phi=0,J=0$ は双曲型平衡点である。
<!-- formal-statement-end -->

### 証明の見取り図

角度の和差と作用の和差を同時に取る理由は、正準一形式が保存されるからです。$\psi$ は和角の半分なので、位相トーラス全体での周期は通常の単純な $2\pi$ 周期とは異なります。以下は局所座標、または適切な格子同一視を持つ被覆上の計算です。振り子断面の面積を読むときは $(\phi,J)$ を正準対として用います。

<!-- proof-start -->
### 証明

逆変換を先に計算します。

$$
I_1=\frac P2+J,\quad I_2=\frac P2-J,\quad
\theta_1=\psi+\frac\phi2,\quad\theta_2=\psi-\frac\phi2.
$$

このとき

$$
I_1\,d\theta_1+I_2\,d\theta_2
=\left(\frac P2+J\right)\left(d\psi+\frac12d\phi\right)
+\left(\frac P2-J\right)\left(d\psi-\frac12d\phi\right)
=P\,d\psi+J\,d\phi.
$$

したがって局所的に正準です。運動エネルギー型の項は

$$
\frac12\left[\left(\frac P2+J\right)^2+
\left(\frac P2-J\right)^2\right]
=\frac{P^2}{4}+J^2.
$$

[正準Hamilton方程式](../../../幾何系/SYM/SYM4/index.md#thm-sym4-existence-coordinate)を $(\psi,P),(\phi,J)$ に順に適用して、命題の四式を得ます。平衡点では $J=0,\sin\phi=0$。$\phi=\pi+u$ で $\sin(\pi+u)=-u+O(u^3)$ だから

$$
\ddot u=2\dot J=-2\varepsilon u+O(u^3),
$$

線形固有値は $\pm i\sqrt{2\varepsilon}$ です。一方、$\phi=u$ の近くでは $\ddot u=2\varepsilon u+O(u^3)$ となり、固有値は $\pm\sqrt{2\varepsilon}$。前者が楕円型、後者が双曲型です。
<!-- proof-end -->

**なぜ一共鳴だけではカオスの証拠にならないか。** $P$ と $H_\varepsilon$ が保存されるため、固定 $P$ 上では一次元のエネルギー曲線に沿って運動します。双曲点と分離曲線はありますが、それだけで[CELE6の横断ホモクリニック交差](../CELE6/index.md#def-cele6-homoclinic)があるわけではありません。

## 3. 共鳴島の幅・面積・分離曲線を計算する

還元エネルギーを $h=J^2+\varepsilon\cos\phi$ とします。楕円点のエネルギーは $-\varepsilon$、鞍点は $+\varepsilon$。鞍点のエネルギーより小さい $-\varepsilon<h<\varepsilon$ の閉曲線が $\phi=\pi$ の周囲に現れます。この「閉じ込められた角運動」と、分離曲線の外側を回転する角運動を区別しましょう。

<a id="def-cele7-island"></a>

<!-- formal-statement-start -->
> **定義（共鳴島と分離曲線）**  
> $\varepsilon>0$、固定 $P$ の還元Hamiltonian $h(J,\phi)=J^2+\varepsilon\cos\phi$ において、相平面の領域
>
$$
\mathcal I_\varepsilon=\{(\phi,J):-\varepsilon\le h(J,\phi)<\varepsilon\}
$$
>
> のうち $\phi=\pi$ の平衡点を含む成分を共鳴島という。境界エネルギー $h=\varepsilon$ の鞍点を通る軌道を分離曲線という。境界上の鞍点そのものは、島の内部には含めない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cele7-island -->

**定義の確認**。$\varepsilon=1/8$、$(\phi,J)=(\pi,0)$ では $h=-1/8$ で島の中心です。$(\pi,1/2)$ では $h=1/4-1/8=1/8$ なので分離曲線上です。$(0,0)$ も $h=1/8$ ですが、こちらは鞍点そのものです。等エネルギー上でも中心と鞍点は区別します。

<!-- definition-example-end -->

<a id="prop-cele7-island-area"></a>

<!-- formal-statement-start -->
> **命題（共鳴島の幅と面積）**  
> 上の一対一共鳴模型の分離曲線は $0\le\phi\le2\pi$ において
>
$$
J_\pm(\phi)=\pm\sqrt{2\varepsilon}\sin(\phi/2)
$$
>
> と書ける。従って $J$ の最大絶対値は $\sqrt{2\varepsilon}$、元の作用差 $I_1-I_2=2J$ の最大絶対値は $2\sqrt{2\varepsilon}$ である。共鳴島の正準面積は
>
$$
A_\varepsilon=\int_0^{2\pi}(J_+-J_-)\,d\phi
=8\sqrt{2\varepsilon}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

分離曲線は「最大振幅を推定する図」からではなく、鞍点のエネルギー保存から直接求められます。積分する面積は $d\phi\,dJ$ であって、元の $(I_1,I_2)$ 平面で測った面積ではありません。

<!-- proof-start -->
### 証明

鞍点のエネルギーが $h_s=\varepsilon$ なので、

$$
J^2+\varepsilon\cos\phi=\varepsilon
\quad\Longrightarrow\quad
J^2=\varepsilon(1-\cos\phi)
=2\varepsilon\sin^2(\phi/2).
$$

$0\le\phi\le2\pi$ では $\sin(\phi/2)\ge0$。よって上枝と下枝は命題の式となります。最大は $\phi=\pi$ で生じ、$|J|_{\max}=\sqrt{2\varepsilon}$ です。作用差は変換の定義から $I_1-I_2=2J$ です。最後に

$$
A_\varepsilon
=\int_0^{2\pi}2\sqrt{2\varepsilon}\sin(\phi/2)\,d\phi
=2\sqrt{2\varepsilon}\left[-2\cos(\phi/2)\right]_{0}^{2\pi}
=8\sqrt{2\varepsilon}.
$$
<!-- proof-end -->

$\varepsilon$ を四倍にすれば、作用幅・島面積は二倍になります。線形比例でなく $\sqrt{\varepsilon}$ が現れることは、後で共鳴帯の「重なり」を読む際の重要な尺度です。ただし一つの島の幅を知るだけでは、別の共鳴と重なるかは分かりません。

## 4. 第二の角度が入ると何が変わるか

天体問題には一つだけでなく複数の共鳴角があり得ます。前の振り子は $\psi$ に依存しないため $\dot P=0$ でした。そこで制御された追加項を入れます。

$$
\widetilde H_{\varepsilon,\delta}
=\frac{P^2}{4}+J^2+\varepsilon\cos\phi+
\delta\cos(2\phi-2\psi),\qquad \delta\in\mathbb R.
$$

ここでは $\varepsilon>0$ を固定し、$|\delta|$ を追加摂動の大きさとします。元の角度では $2\phi-2\psi=\theta_1-3\theta_2$ なので、追加項は元の $\mathbb T^2$ 上でも単価値です。局所正準変換の周期同一視とHamiltonianの定義域は区別します。

<a id="prop-cele7-two-angle"></a>

<!-- formal-statement-start -->
> **命題（第二角の摂動と保存作用の消失）**  
> 上の $\widetilde H_{\varepsilon,\delta}$ では
>
$$
\dot P=-2\delta\sin(2\phi-2\psi),\qquad
\dot J=\varepsilon\sin\phi+2\delta\sin(2\phi-2\psi),
$$
>
$$
\dot\psi=P/2,\qquad \dot\phi=2J.
$$
>
> 特に $\delta\ne0$ なら $P$ は全軌道に沿う第一積分ではない。一方、$\widetilde H_{\varepsilon,\delta}$ 自体は自律Hamilton系のエネルギーとして保存される。
<!-- formal-statement-end -->

### 証明の見取り図

「$P$ がもはや保存しない」と「この系が非可積分である」は異なります。前者は一つのPoisson括弧計算で分かりますが、未知の別の第一積分まで排除するには[CELE5の非可積分性定理](../CELE5/index.md#thm-cele5-poincare-nonintegrability)のような追加仮定と証明が必要です。

<!-- proof-start -->
### 証明

$\phi$ と $\psi$ を独立な角度として微分します。

$$
\partial_\psi\cos(2\phi-2\psi)=2\sin(2\phi-2\psi),\qquad
\partial_\phi\cos(2\phi-2\psi)=-2\sin(2\phi-2\psi).
$$

従って正準Hamilton方程式から

$$
\dot P=-\partial_\psi\widetilde H=-2\delta\sin(2\phi-2\psi),
\qquad
\dot J=-\partial_\phi\widetilde H
=\varepsilon\sin\phi+2\delta\sin(2\phi-2\psi).
$$

運動量微分は $\partial_P\widetilde H=P/2$ と $\partial_J\widetilde H=2J$ です。$\delta\ne0$ では例えば $2(\phi-\psi)=\pi/2$ の点で $\dot P=-2\delta\ne0$ なので、$P$ は全軌道に沿って一定の関数ではありません。エネルギーについては、四組の正準方程式を代入すると

$$
\frac{d\widetilde H}{dt}
=\partial_\phi\widetilde H\,\dot\phi
+\partial_J\widetilde H\,\dot J
+\partial_\psi\widetilde H\,\dot\psi
+\partial_P\widetilde H\,\dot P=0
$$

で、各正準対の二項が相殺されます。
<!-- proof-end -->

この模型の $\delta=0$ では分離曲線が一致しています。$\delta\ne0$ でその安定枝・不安定枝が**横断的に**分離するなら、[CELE6の横断性判定](../CELE6/index.md#prop-cele6-melnikov-transversality)と[外部入力として明示されたSmale–Birkhoff定理](../CELE6/index.md#ref-cele6-smale-birkhoff)によりカオス的な不変集合を論じられます。ただし「第二角を入れた」だけで横断性やカオスを断定してはいけません。分離量、パラメータ、対象周期軌道を実際に検証する仕事が残ります。

## 5. それでも残るKAMトーラス

元の $K(I)=\tfrac12(I_1^2+I_2^2)$ についてHessianは二次単位行列 $\mathrm{Id}_2$ です。従って[Kolmogorov非退化性](../../../幾何系/INT/INT8/index.md#def-int8-kolmogorov)は全作用領域で成立します。さらに $I_*=(1,\sqrt2)$ なら振動数は $\omega_*=(1,\sqrt2)$ です。この振動数が特定の共鳴を避けるだけでなく、**すべての整数ベクトルに対して十分な下界を持つ**ことを検査します。

零でない $k=(p,q)\in\mathbb Z^2$ に対し、$p^2-2q^2$ は零でない整数です。ゆえに

$$
|p+q\sqrt2|
=\frac{|p^2-2q^2|}{|p-q\sqrt2|}
\ge\frac1{|p|+\sqrt2|q|}
\ge\frac1{\sqrt2(|p|+|q|)}.
$$

分母の有理化は $p=q=0$ 以外で正当です。この評価は $\ell^1$ ノルムで指数 $\tau=1$ の下界を与えます。$|k|_1\ge1$ より任意の $\tau>1$ の[Diophantine条件](../../../幾何系/INT/INT4/index.md#def-int4-diophantine)も含意します。

たとえば $\tau=2$ を選べば、[INT8のKAM定理](../../../幾何系/INT/INT8/index.md#thm-int8-kam)が要求する $\tau>n-1=1$ を満たします。無理数比という定性的な事実だけでなく、整数ベクトルごとの定量的下界まで得たことが重要です。

[解析的Kolmogorov型KAM定理](../../../幾何系/INT/INT8/index.md#thm-int8-kam)を本模型に適用する入力は、次の順です。

1. $K$ は解析的で、$D^2K=\mathrm{Id}_2$ は可逆。作用領域を $I_*$ のまわりのコンパクトな小近傍に取る。
2. $\omega_*=(1,\sqrt2)$ は上で証明したDiophantine条件を満たす。
3. $\cos(\theta_1-\theta_2)$、さらに第二角の項を入れるなら $\cos(2\phi-2\psi)$ はそれぞれ指定領域の解析関数であり、解析ノルムを伴う摂動の小ささが必要となる。
4. これらに応じた**定理のしきい値以下**の摂動なら、振動数 $\omega_*$ で直線流に共役な不変トーラスが、近くの位置に存続する。

したがって十分小さい摂動で、選んだDiophantine振動数の規則運動は残ります。KAM定理は**すべての振動数・すべての初期条件・任意の摂動に対する安定性**を主張しません。共鳴面 $I_1=I_2$ 上では $\omega_1-\omega_2=0$ ですから、同じ固定振動数版KAM定理をそのまま代入することはできません。

さらに[CELE5の回転Kepler極限のHessian退化](../CELE5/index.md#prop-cele5-kepler-degeneracy)が示すとおり、実際のKepler型Hamiltonianへ $D^2K$ 可逆を無検査で移してはいけません。惑星問題に特化した非退化性の回復・正規形・非衝突領域の議論が必要です。

## 6. Poincaré断面をどう読むか

二自由度の自律Hamilton系では、正則エネルギー面は三次元です。その内部の二次元横断面に対する[第一帰還写像](../../../幾何系/INT/INT7/index.md#def-int7-return)は、定義できる範囲で面積を保存します（[面積保存の証明](../../../幾何系/INT/INT7/index.md#prop-int7-return-area)）。局所的に次の形を読みます。

- **閉じた滑らかな不変曲線**：帰還写像の下で保たれる規則運動の候補。条件が成立するとき、連続流では二次元不変トーラスに対応する。
- **楕円型周期点の周囲の島**：共鳴還元で求めた振り子島に似た幾何。島の内外は対象とする帰還写像・反復回数で解釈する。
- **双曲点の枝と入り組んだ点群**：分離曲線の分裂や横断ホモクリニック構造の候補。ただし有限個の散乱点だけで厳密な横断性は証明できない。

この区別は、点が「散って見える」かどうかより、どの不変集合をどの定理から確保したかを優先します。断面へ帰ってこない衝突軌道・脱出軌道は帰還写像の定義域から外れるので、図上で点が欠けることもあります。

## 7. 有限時間Lyapunov指数は何を測るのか

隣り合う初期値が有限時間で離れて見えることと、無限時間の指数的不安定性は同値ではありません。計算機では接ベクトルの伸長を有限回で測ります。

<a id="def-cele7-lyapunov"></a>

<!-- formal-statement-start -->
> **定義（有限時間Lyapunov指数）**  
> $P:U\to U$ を $C^1$ 級微分同相、$z$ を $n$ 回反復できる点、$v\ne0$ を接ベクトルとする。$n\ge1$ に対して
>
$$
\lambda_n(z,v)=\frac1n\log\frac{\|DP^n(z)v\|}{\|v\|}
$$
>
> を方向 $v$ の有限時間Lyapunov指数と呼ぶ。極限が存在すれば $\lim_{n\to\infty}\lambda_n(z,v)$ を対応する漸近指数とする。極限の存在は定義だけでは保証されない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cele7-lyapunov -->

**定義の確認**。$P(x,y)=(2x,y/2)$ の固定点原点で $v=(1,0)$ を取ると $DP^n v=(2^n,0)$ です。従って $\lambda_n(0,v)=\log2$。一方 $v=(0,1)$ なら $\lambda_n(0,v)=-\log2$。同じ点でも方向が違えば値は違います。これは[双曲線形模型](../../../解析系/DYN/DYN14/index.md#thm-dyn14-eigen-dichotomy)の二方向です。

<!-- definition-example-end -->

<a id="prop-cele7-shear"></a>

<!-- formal-statement-start -->
> **命題（せん断写像のLyapunov指数）**  
> 平面の面積保存写像 $S(x,y)=(x+y,y)$ では、任意の $v\ne0$ について
>
$$
\lim_{n\to\infty}\frac1n\log\frac{\|DS^n v\|}{\|v\|}=0.
$$
>
> しかし $v=(0,1)$ では有限時間に正の伸長値 $\lambda_n=\log\sqrt{n^2+1}/n>0$ が出る。
<!-- formal-statement-end -->

### 証明の見取り図

せん断は線形の速さで伸びますが、指数は伸長の対数を反復回数で割ります。**大きな有限時間伸長と正の漸近指数を取り違えない**ための基準例です。

<!-- proof-start -->
### 証明

反復を二回書くと $S^2(x,y)=(x+2y,y)$。帰納的に

$$
S^n(x,y)=(x+ny,y),\qquad
DS^n=\begin{pmatrix}1&n\\0&1\end{pmatrix}.
$$

$v=(a,b)\ne0$ について $DS^n v=(a+nb,b)$。逆行列も $\begin{pmatrix}1&-n\\0&1\end{pmatrix}$ なので、Euclidノルムで、$DS^n v=v+(nb,0)$ だから三角不等式と $|b|\le\|v\|$ より $\|DS^n v\|\le(n+1)\|v\|$ です。逆行列 $DS^{-n}$ も $w=(c,d)$ を $w+(-nd,0)$ に移すので、同じ評価を $w=DS^n v$ に適用すると $\|v\|\le(n+1)\|DS^n v\|$。従って

$
\frac1{n+1}\|v\|\le\|DS^n v\|\le(n+1)\|v\|,\qquad n\ge1.
$

両辺を $\|v\|>0$ で割って対数を取ると

$$
-\frac{\log(n+1)}n
\le\frac1n\log\frac{\|DS^n v\|}{\|v\|}
\le\frac{\log(n+1)}n\longrightarrow0.
$$

$v=(0,1)$ では比が $\sqrt{n^2+1}$ なので命題の有限時間式が従います。
<!-- proof-end -->

数値的な最大Lyapunov指数の推定では、接ベクトルを再正規化する手順、軌道上の微分写像、観測時間、丸め誤差、帰還時刻をそろえる必要があります。一般に小さい有限時間指数は「KAMトーラスの存在証明」ではなく、正の有限時間推定値も「厳密なhorseshoeの証明」ではありません。

## 8. 壊れた曲線・重なった共鳴・高次元輸送

面積保存のtwist写像では、不変円が破れたあと、回転数を保つ順序づけられた不変Cantor集合が現れる場合があります。このような構造を**カントーラス（cantorus）**と呼ぶ文脈があります。完全な不変円と違い、円の隙間を横切る輸送が許され得ますが、単に点が疎らに見えることからカントーラスの存在は認定できません。存在・ギャップ・輸送率の一般理論はここでは新規証明の対象とせず、twist写像の追加仮定を持つ後続学習課題とします。

共鳴が二つあるとき、それぞれの有効幅と中心の距離を比べる**共鳴重なりの経験則**は、カオス領域が増えそうな場所を選ぶには有益です。ただし幅の定義は正規形・摂動次数・断面に依存し、重なりそのものは横断交差の証明ではありません。たとえば同一直線上の二つの帯の中心を $c_1,c_2$、半幅を $w_1,w_2>0$ とすれば、帯の区間が交わる条件は

$$
|c_1-c_2|\le w_1+w_2
$$

ですが、これは一次元区間についての幾何的同値条件でしかなく、Hamilton系のカオス定理ではありません。

ここで自由度による違いが効きます。二自由度の正則エネルギー面は三次元で、そこに埋め込まれた二次元の不変トーラスが適切な大域配置で分離障壁となり得ます。三自由度以上では、正則エネルギー面の次元は $2n-1$、Lagrangeトーラスの次元は $n$ です。その余次元は

$$
(2n-1)-n=n-1.
$$

$n=2$ なら余次元 $1$ ですが $n\ge3$ では余次元が $2$ 以上となり、**一枚のトーラスだけでエネルギー面を分断するという議論は一般には使えません**。この幾何が、非常に遅い作用変化として知られるArnold拡散を考える入口です。しかし高自由度なら必ず拡散するわけではありません。非退化性、共鳴網、遷移鎖、摂動の滑らかさ・サイズ、時間尺度を別に証明する必要があります。

## 9. 演習と詳細解答

### Level A

<a id="ex-cele7-a01"></a>

**A1：共鳴の判定と角速度差**
- Level: A

$K=\tfrac12(I_1^2+I_2^2)$ と $k=(1,-1)$ に対し、$I=(3,3)$、$(3,5)$ の共鳴判定を行い、非摂動での共鳴角 $\phi$ の時間変化を求めよ。

<!-- solution-start -->
**詳細解答**。$\omega=(\partial_{I_1}K,\partial_{I_2}K)=(I_1,I_2)$ より $k\cdot\omega=I_1-I_2$。$(3,3)$ では零で共鳴し、$\dot\phi=0$ です。$(3,5)$ では $k\cdot\omega=-2$ なので非共鳴で、$\dot\phi=-2$、従って $\phi(t)=\phi(0)-2t\pmod{2\pi}$ となります。
<!-- solution-end -->

<a id="ex-cele7-a02"></a>

**A2：正準還元を直接確かめる**
- Level: A

$P=I_1+I_2$、$J=(I_1-I_2)/2$、$\psi=(\theta_1+\theta_2)/2$、$\phi=\theta_1-\theta_2$ と置く。逆変換を求め、正準一形式が一致することを示せ。

<!-- solution-start -->
**詳細解答**。二つの作用の和差から $I_1=P/2+J,I_2=P/2-J$、二つの角度の和差から $\theta_1=\psi+\phi/2,\theta_2=\psi-\phi/2$ です。従って

$$
I_1d\theta_1+I_2d\theta_2
=(P/2+J)(d\psi+d\phi/2)+(P/2-J)(d\psi-d\phi/2)
=P\,d\psi+J\,d\phi.
$$

局所的に正準変換と確認できました。角度の大域的周期同一視は別に扱います。
<!-- solution-end -->

<a id="ex-cele7-a03"></a>

**A3：共鳴島の最大幅**
- Level: A

$\varepsilon=1/8$ に対し $h=J^2+\varepsilon\cos\phi$ の鞍点エネルギー、分離曲線上の $|J|$ の最大値、および $|I_1-I_2|$ の最大値を求めよ。

<!-- solution-start -->
**詳細解答**。鞍点 $(\phi,J)=(0,0)$ のエネルギーは $h_s=\varepsilon=1/8$ です。エネルギー式から $J^2=\varepsilon(1-\cos\phi)$。最大は $\cos\phi=-1$ のときで $J^2=2\varepsilon=1/4$、従って $|J|_{\max}=1/2$。作用差は $I_1-I_2=2J$ ですから最大絶対値は $1$ です。
<!-- solution-end -->

<a id="ex-cele7-a04"></a>

**A4：共鳴島の正準面積**
- Level: A

$J_\pm(\phi)=\pm\sqrt{2\varepsilon}\sin(\phi/2)$（$0\le\phi\le2\pi$）を使い、島の面積を求めよ。$\varepsilon=1/8$ の値も示せ。

<!-- solution-start -->
**詳細解答**。上枝と下枝の差は $2\sqrt{2\varepsilon}\sin(\phi/2)$ です。従って

$$
A=\int_0^{2\pi}2\sqrt{2\varepsilon}\sin(\phi/2)\,d\phi
=2\sqrt{2\varepsilon}[-2\cos(\phi/2)]_0^{2\pi}
=8\sqrt{2\varepsilon}.
$$

$\varepsilon=1/8$ なら $\sqrt{2\varepsilon}=1/2$ なので $A=4$ です。
<!-- solution-end -->

<a id="ex-cele7-a05"></a>

**A5：有限時間と漸近指数**
- Level: A

$S(x,y)=(x+y,y)$ において $v=(0,1)$ とする。$DS^n v$、$\lambda_n$、その $n\to\infty$ 極限を計算せよ。

<!-- solution-start -->
**詳細解答**。$S^n(x,y)=(x+ny,y)$ から微分行列は $\begin{pmatrix}1&n\\0&1\end{pmatrix}$、従って $DS^n v=(n,1)$。Euclidノルム比は $\sqrt{n^2+1}$ なので

$$
\lambda_n=\frac{\log\sqrt{n^2+1}}n
=\frac{\log(n^2+1)}{2n}.
$$

$\log(n^2+1)=O(\log n)$ で $\log n/n\to0$ ですから極限は $0$。全ての有限 $n$ で正でも、漸近正とは限りません。
<!-- solution-end -->

### Level B

<a id="ex-cele7-b01"></a>

**B1：離調した振り子**
- Level: B

$\eta\in\mathbb R$ に対し $h_\eta(J,\phi)=J^2+2\eta J+\varepsilon\cos\phi$、$\varepsilon>0$ とする。正方完成で島の中心を求め、分離曲線の $J$ 区間を $\phi=\pi$ で計算せよ。

<!-- solution-start -->
**詳細解答**。$J^2+2\eta J=(J+\eta)^2-\eta^2$ より

$$
h_\eta=(J+\eta)^2+\varepsilon\cos\phi-\eta^2.
$$

正準変数 $J'=J+\eta$ とすれば振り子の形です。楕円点は $\phi=\pi,J'=0$、つまり $(\pi,-\eta)$。鞍点は $(0,-\eta)$ でエネルギー $\varepsilon-\eta^2$。分離曲線上で

$$
(J+\eta)^2+\varepsilon\cos\phi-\eta^2
=\varepsilon-\eta^2
\quad\Rightarrow\quad
(J+\eta)^2=\varepsilon(1-\cos\phi).
$$

$\phi=\pi$ では $(J+\eta)^2=2\varepsilon$ だから、断面の端点は $J=-\eta\pm\sqrt{2\varepsilon}$。島の幅は中心がずれるだけで $2\sqrt{2\varepsilon}$ のままです。
<!-- solution-end -->

<a id="ex-cele7-b02"></a>

**B2：共鳴重なりの計算と限界**
- Level: B

一つの作用方向に投影した二つの共鳴帯が $[c_1-w_1,c_1+w_1]$ と $[c_2-w_2,c_2+w_2]$ であるとする。重なり条件を示し、$(c_1,c_2,w_1,w_2)=(0,3,1,2)$ と $(0,4,1,2)$ を判定せよ。この条件だけでカオスが証明されたかも答えよ。

<!-- solution-start -->
**詳細解答**。共通部分が非空となる必要十分条件は左端の最大値が右端の最小値以下、すなわち

$$
c_1-w_1\le c_2+w_2,\qquad
c_2-w_2\le c_1+w_1.
$$

二式は $-(w_1+w_2)\le c_1-c_2\le w_1+w_2$ と同値なので $|c_1-c_2|\le w_1+w_2$。第一例は $3\le3$ で一点で接し、第二例は $4>3$ なので重なりません。これは区間の投影の幾何であり、横断ホモクリニック点も正の漸近Lyapunov指数も証明していません。
<!-- solution-end -->

<a id="ex-cele7-b03"></a>

**B3：保存作用はなぜ破れるか**
- Level: B

$\widetilde H=P^2/4+J^2+\varepsilon\cos\phi+\delta\cos(2\phi-2\psi)$ について $\dot P$ と $\dot J$ を導き、$\delta\ne0$ のとき $P$ が第一積分でない理由と、それだけでは非可積分性の証明にならない理由を述べよ。

<!-- solution-start -->
**詳細解答**。$\partial_\psi\cos(2\phi-2\psi)=2\sin(2\phi-2\psi)$、$\partial_\phi\cos(2\phi-2\psi)=-2\sin(2\phi-2\psi)$ だから

$$
\dot P=-\partial_\psi\widetilde H=-2\delta\sin(2\phi-2\psi),
\qquad
\dot J=-\partial_\phi\widetilde H=\varepsilon\sin\phi+2\delta\sin(2\phi-2\psi).
$$

$2(\phi-\psi)=\pi/2$ の初期点では $\dot P=-2\delta\ne0$ なので $P$ は全解に沿って保存される関数ではありません。しかし別の未知の第一積分 $F$ が存在する可能性はこの計算では排除しておらず、非可積分性の結論には別の仮定・論証が必要です。
<!-- solution-end -->

<a id="ex-cele7-b04"></a>

**B4：KAMの仮定を数値ではなく式で確認する**
- Level: B

$K(I)=\tfrac12(I_1^2+I_2^2)$、$I_*=(1,\sqrt2)$ を考える。Kolmogorov非退化性と、整数 $k=(p,q)\ne0$ に対する振動数の下界を示せ。また $I_*=(1,1)$ では何が失われるか述べよ。

<!-- solution-start -->
**詳細解答**。[Kolmogorov非退化性](../../../幾何系/INT/INT8/index.md#def-int8-kolmogorov)をHessianから確認します。$D^2K=\begin{pmatrix}1&0\\0&1\end{pmatrix}$ で行列式は $1$、非退化です。$\omega_*=(1,\sqrt2)$ とすると、整数 $p^2-2q^2$ は非零で絶対値は $1$ 以上だから

$$
|p+q\sqrt2|
=\frac{|p^2-2q^2|}{|p-q\sqrt2|}
\ge\frac1{|p|+\sqrt2|q|}
\ge\frac1{\sqrt2(|p|+|q|)}.
$$

$|k|_1\ge1$ なので $\gamma=1/\sqrt2,\ \tau=2>1$ と選べば[解析的KAM定理のDiophantine条件](../../../幾何系/INT/INT8/index.md#def-int8-diophantine)を満たします。$(1,1)$ では $k=(1,-1)$ に対して $k\cdot\omega_*=0$ なので同じ条件に失敗します。Hessianの非退化性は失われていません。二つの仮定を混同してはいけません。
<!-- solution-end -->

### Level C

<a id="ex-cele7-c01"></a>

**C1：一共鳴・第二摂動・KAM・輸送を統合する**
- Level: C

二自由度Hamilton系

$$
H_{\varepsilon,\delta}
=\frac12(I_1^2+I_2^2)
+\varepsilon\cos(\theta_1-\theta_2)
+\delta\cos(\theta_1-3\theta_2)
$$

を、$\varepsilon>0$ かつ小さい $|\delta|$ の下で考える。次の局所正準座標を用いよ。

$$
\psi=\frac{\theta_1+\theta_2}{2},\quad
\phi=\theta_1-\theta_2,\quad
P=I_1+I_2,\quad J=\frac{I_1-I_2}{2}.
$$

1. 第二角項を $\phi,\psi$ で書き直せ。
2. $\delta=0$ で島の半幅と面積を求めよ。
3. $\delta\ne0$ で $\dot P$ を計算せよ。
4. [INT8の解析的KAM定理](../../../幾何系/INT/INT8/index.md#thm-int8-kam)の仮定を点検し、共鳴帯で複雑な運動を結論するために不足する検証を述べよ。

<!-- solution-start -->
**詳細解答**。（i）逆変換 $\theta_1=\psi+\phi/2$、$\theta_2=\psi-\phi/2$ を代入すると

$$
\theta_1-3\theta_2
=\psi+\phi/2-3\psi+3\phi/2
=2\phi-2\psi.
$$

従って局所Hamiltonianは $P^2/4+J^2+\varepsilon\cos\phi+\delta\cos(2\phi-2\psi)$ です。元の角度に対し整数係数の $\cos(\theta_1-3\theta_2)$ を選んだので、この追加項は元の角度トーラス上でも $2\pi$ 周期で単価値です。正準変換の和角・差角表示は局所的ですが、Hamiltonianの元の定義には問題がありません。

（ii）$\delta=0$ では $P$ 保存なので、固定 $P$ 上の鞍点エネルギーは $\varepsilon$。$J^2+\varepsilon\cos\phi=\varepsilon$ より

$$
|J|\le\sqrt{2\varepsilon},\qquad
A=\int_0^{2\pi}2\sqrt{2\varepsilon}\sin(\phi/2)\,d\phi
=8\sqrt{2\varepsilon}.
$$

半幅は $J$ で $\sqrt{2\varepsilon}$、作用差 $I_1-I_2$ で $2\sqrt{2\varepsilon}$ です。

（iii）$\dot P=-\partial_\psi H=-2\delta\sin(2\phi-2\psi)$。$\delta\ne0$ なら $P$ は全軌道で保存されません。

（iv）非摂動部 $K=(I_1^2+I_2^2)/2$ は解析的で $D^2K=\mathrm{Id}_2$ は可逆です。$I_*=(1,\sqrt2)$ では $\omega_*=(1,\sqrt2)$。零でない整数対 $(p,q)$ について $p^2-2q^2$ は零でない整数だから

$
|p+q\sqrt2|=\frac{|p^2-2q^2|}{|p-q\sqrt2|}
\ge\frac1{|p|+\sqrt2|q|}
\ge\frac1{\sqrt2(|p|+|q|)}.
$

従って $\gamma=1/\sqrt2,\ \tau=2>1$ が使えます。二つの余弦項は元の角度トーラス上で解析的であり、指定した複素近傍での **両摂動の合計の解析ノルム** が[INT8の解析的KAM定理](../../../幾何系/INT/INT8/index.md#thm-int8-kam)の閾値以下なら、この振動数を持つ不変トーラスが元の $I_*$ の近くに存続します。単に $|\delta|$ だけが小さくても、$\varepsilon$ の小ささを確認しない限りKAMの結論は出ません。一方、$I_1=I_2$ の共鳴帯では固定振動数版KAMの算術仮定は使えず、$\delta=0$ でも振り子島と双曲鞍点が現れます。$\delta\ne0$ で横断ホモクリニック交差まで確認できた場合には、その付近でカオス的な不変集合を論じられますが、$\dot P\ne0$ の計算だけでは横断性も正の漸近Lyapunov指数も証明していません。さらにこの局所模型を実際の太陽系へ適用するには質量・非退化性・衝突回避・時間尺度の検証が別に必要です。
<!-- solution-end -->

## 10. 太陽系の長期力学へつなぐ

一つの共鳴を拡大すると、振り子島の中心、双曲点、分離曲線、そして $\sqrt{\varepsilon}$ に比例する幅を計算できました。第二角を加えても、カオスは自動発生しません。一方、共鳴から十分離れた選択振動数ではKAMトーラスが存続し得ます。したがって共鳴帯・規則運動・カオス的集合は、同じ近可積分系に**条件つきで共存し得る**のです。

次章では、実際の天体の平均運動共鳴・永年摂動・小惑星帯の構造を議論します。そのとき「KAMが太陽系全体の永遠の安定を証明した」「最大Lyapunov指数が正なら有限時間の位置予報が一切不可能」といった飛躍を避け、**厳密定理・正規形・数値実験・予測可能時間**の役割を分けて扱います。
