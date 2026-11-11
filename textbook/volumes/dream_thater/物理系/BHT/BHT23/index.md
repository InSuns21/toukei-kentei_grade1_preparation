# BHT23 Bekenstein boundと限界

[BHT22の一般化第二法則](../BHT22/index.md#def-bht22-gsl-balance)では、物体を地平線へ落とすときの収支を調べました。箱のエネルギーは赤方偏移によって無限遠から安く見積もられます。それなら、エントロピーの大きな箱を極端にゆっくり下ろせば第二法則を破れるのでしょうか。

この問いから生まれたのが **Bekenstein bound** です。ただし「落下実験があるから、あらゆる量子系に普遍的な不等式が証明された」という推論には隙間があります。本講では (1) 理想的な降下模型から得る条件付きの境界、(2) 浮力と箱の境界条件、(3) 相対エントロピーによる別の精密な不等式を区別します。

以下、4次元・計量符号 $(-,+,+,+)$、自然単位 $G=c=\hbar=k_B=1$、エントロピーは自然対数の無次元量を基本とします。必要箇所で $G$ を表示し直します。**系のエネルギー** $E$ は局所静止系で測る全エネルギー、**無限遠のエネルギー** $E_\infty$ は時間並進Killing場に対応する保存量であり、両者を取り違えません。

## 1. どの系の、どのエントロピーを境界付けるか

半径 $R>0$ の球内に収まる孤立した、自己重力の弱い系を考えます。重心系の全エネルギー $E>0$ には容器・結合・閉じ込め機構が必要ならそれも含みます。弱重力の目安は $2GE/R\ll1$ で、系のSchwarzschild半径がサイズより十分小さいことです。箱の外側で既にブラックホールを形成している場合はこの設定に含めません。

この範囲でしばしば提案されるのは、エントロピー $S$ がエネルギーとサイズの積で抑えられるという関係です。$R$ は任意の座標半径ではなく、系を包含する球の物理的半径です。形の異なる領域や強い重力場への置換には追加の議論が必要です。

<a id="def-bht23-bekenstein-bound"></a>

<!-- formal-statement-start -->
> **定義（弱重力系に対するBekenstein型境界の主張）**
> $E>0$、$R>0$ を固定した孤立した弱自己重力系について、指定したエントロピー $S$ が次の不等式を満たす、という主張を **Bekenstein型境界** と呼ぶ。

$$
S\le 2\pi ER.
$$

> この記述自体は普遍的な数学的定理の宣言ではない。$S$ の定義、境界を含む全エネルギー、局在条件、状態の種類を明示して検証する必要がある。物理単位では $S_{\rm phys}\le2\pi k_B ER/(\hbar c)$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht23-bekenstein-bound -->
**定義の確認**：$E=1/10$、$R=200$、$G=1$ とする弱重力の模型では $2GE/R=1/1000$ です。右辺は $2\pi ER=40\pi$。したがって $S=100$ はこの**境界の数値条件を満たします**が、$S=200$ は満たしません。この例は不等式の判定であり、後者の値を持つ実在の孤立系が作れることやGSLに反することまでは示していません。
<!-- definition-example-end -->

### 1.1 係数と単位を先に確かめる

物理単位の $ER/(\hbar c)$ は、$[E]={\rm J}$、$[R]={\rm m}$、$[\hbar c]={\rm J\,m}$ なので無次元です。したがって $k_B$ を掛けると熱力学的エントロピーの単位 ${\rm J/K}$ を得ます。**重力定数 $G$ が右辺に直接現れない**のは、次節の地平線温度と赤方偏移で表面重力が相殺されるためです。弱重力という適用仮定から $G$ が消えたわけではありません。

## 2. 箱を下ろす理想実験の計算

質量 $M$ の大きなSchwarzschildブラックホールへ、$E\ll M$、$R\ll2M$、$2GE/R\ll1$ の箱を準静的に下ろします。ここだけ $G=1$ とし、背景の地平線は $r_H=2M$ です。静止観測者の時計の赤方偏移係数は

$$
\chi(r)=\sqrt{1-\frac{2M}{r}}.
$$

地平線からの外向き固有距離 $\ell$ は $r=2M+\delta r$、$0<\delta r\ll2M$ で

$$
\begin{aligned}
\ell&=\int_{2M}^{2M+\delta r}\frac{dr'}{\sqrt{1-2M/r'}}
\simeq\int_0^{\delta r}\sqrt{\frac{2M}{x}}\,dx
=2\sqrt{2M\delta r},\\
\chi&\simeq\sqrt{\frac{\delta r}{2M}}
=\frac{\ell}{4M}=\kappa\ell,
\qquad \kappa=\frac{1}{4M}.
\end{aligned}
$$

静的箱を保持する糸が無限遠へ仕事を取り出し、位置 $\ell$ で糸を切るとします。潮汐力・箱の内部エネルギー分布・保持装置の重力への寄与・量子浮力を無視した点粒子近似では、残るブラックホールへのエネルギーは $E_\infty\simeq\chi E$ です。[Hawking温度と表面重力の関係](../BHT8/index.md#prop-bht8-normalization) $T_H=\kappa/(2\pi)$ と、[第一法則の面積係数表示](../BHT8/index.md#prop-bht8-first-law-area)を仕事・電荷・回転が変化しない一次摂動へ適用すると

$$
\begin{aligned}
\Delta S_{\rm BH}&\simeq\frac{E_\infty}{T_H}
=\frac{\kappa\ell E}{\kappa/(2\pi)}
=2\pi\ell E,\\
\Delta S_{\rm out}&\simeq-S.
\end{aligned}
$$

半径 $R$ の箱の**底面**が地平線の外にあるためには、単純な球形箱の中心は $\ell\gtrsim R$ に位置します。その場合、模型で計算した面積増分の下限は $2\pi ER$ です。

ここに大切な論理の違いがあります。$\ell\ge R$ から得られるのは **$\Delta S_{\rm BH}\gtrsim 2\pi ER$** という下限だけです。GSLが要求する $S\le\Delta S_{\rm BH}$ と組み合わせても、**$S\le2\pi ER$ は論理的には従いません**。最小に近い $\ell=R$ で箱を実際に落とせて、ほかの収支を無視できることまで要ります。

<a id="prop-bht23-conditional-bound"></a>

<!-- formal-statement-start -->
> **命題（理想降下とGSLからの条件付き境界）**
> 固定された弱自己重力の箱 $(E,R,S)$ について、一連の準静的降下操作が存在し、各操作で同じ半古典的GSLが成立するとする。操作番号 $n$ に対し、投入後のエントロピー変化が

$$
\Delta S_{{\rm BH},n}=2\pi ER+\varepsilon_n,
\qquad
\Delta S_{{\rm out},n}=-S+\eta_n
$$

> と書け、$\varepsilon_n\to0$、$\eta_n\to0$ と仮定する。このとき $S\le2\pi ER$ が従う。
<!-- formal-statement-end -->

### 証明の見取り図

各操作のGSLへ両エントロピーを代入して $S$ の上限を得てから、**実行可能な操作の列があるという追加仮定**に沿って極限を取ります。

<!-- proof-start -->
### 証明

各 $n$ で [切断面間の一般化エントロピー収支](../BHT22/index.md#def-bht22-gsl-balance)を用いると

$$
0\le\Delta S_{{\rm gen},n}
=2\pi ER+\varepsilon_n-S+\eta_n.
$$

従って $S\le2\pi ER+\varepsilon_n+\eta_n$ がすべての $n$ で成り立ちます。左辺と $E,R$ は固定、右辺の誤差は0に収束するので $S\le2\pi ER$ です。$\square$
<!-- proof-end -->

**何を証明していないか**：$\varepsilon_n,\eta_n\to0$ を実際の量子場・容器で実現できるとは示していません。特に「中心は $R$ より下げられない」という幾何条件は、この命題の**操作列の存在**を保証しません。実在する過程で浮力や相関を入れると $\eta_n$ が0へ行かないこともあります。BHT22で用いたGSLの条件付き証明と、ここで新たに仮定した理想操作の実在性は別問題です。

## 3. 降下中の浮力、熱的雰囲気、箱の境界

静的地平線近傍に保持された観測者が測る局所温度は、[Tolman赤方偏移の関係](../BHT8/index.md#prop-bht8-tolman-bath)から

$$
T_{\rm loc}=\frac{T_H}{\chi}\simeq\frac{1}{2\pi\ell}.
$$

箱の下面は上面より地平線に近く、局所温度が高い側の熱的雰囲気からより大きな圧力を受けます。これは**外向きの量子浮力**の出発点です。例えば局所熱平衡にある質量のない場を流体近似し、正の定数 $a$ を用いて $p(\ell)=aT_{\rm loc}^4/3$ と書くと

$$
p(\ell)=\frac{a}{3(2\pi)^4\ell^4},
\qquad \frac{dp}{d\ell}=-\frac{4p}{\ell}<0.
$$

厚さが $\ell$ より**十分小さい**箱の体積を $V$ とすれば、上下の圧力差による局所的な力は $F_{\rm buoy}\simeq-V\,dp/d\ell>0$ です。浮力に抗して箱を下ろすときの仕事と、押しのけられた熱的雰囲気のエントロピーを含めなければなりません。この薄箱近似を $\ell\sim R$ の箱へそのまま外挿して浮遊位置を数値予言することはできません。実際の力の定量化には境界での場の状態・散乱・壁の反作用が必要です。

<a id="prop-bht23-buoyancy-caveat"></a>

<!-- formal-statement-start -->
> **命題（熱的雰囲気を省いた収支の限界）**
> 非極限静的地平線近傍で、局所熱平衡の圧力 $p(\ell)=C\ell^{-4}$（$C>0$）を持つ流体近似が成立し、高さ $h\ll\ell$ の箱に対して圧力を一次展開できるとする。箱が排除する体積 $V>0$ に働く圧力差の力は外向きであり、

$$
F_{\rm buoy}\simeq\frac{4Vp(\ell)}{\ell}>0
$$

> となる。したがって圧力差を無視して計算した投下エネルギーは、同じ近似内であっても一般に降下操作の全仕事を表さない。
<!-- formal-statement-end -->

### 証明の見取り図

圧力を箱の中心でTaylor展開すると、上下の差の先頭項は負の圧力勾配に比例します。ここでは圧力差の**符号と先頭次数**までを主張します。

<!-- proof-start -->
### 証明

箱の水平断面積を $A$、高さを $h$ とし $V=Ah$ です。下面 $\ell-h/2$ の上向きの圧力と上面 $\ell+h/2$ の下向きの圧力を引くと

$$
\begin{aligned}
F_{\rm buoy}
&=A\left[p(\ell-h/2)-p(\ell+h/2)\right]\\
&=-Ah\,p'(\ell)+O(Ah^3\sup|p'''|)\\
&=\frac{4Vp(\ell)}{\ell}+O(Vp(\ell)(h/\ell)^2/\ell)>0
\end{aligned}
$$

が $h/\ell$ を十分小さくした極限で従います。これは局所的な圧力の積分であって、無限遠で回収可能な全仕事は赤方偏移した力を経路積分しなければ得られません。$\square$
<!-- proof-end -->

Unruh–Waldの議論は、静止箱を取り巻く加速放射、浮力と**変位された雰囲気**を扱います。したがって単純な $\Delta S_{\rm out}=-S$ が破れたことはGSLの破れと同義ではありません。局所温度 $T_{\rm loc}$ での自由エネルギー差 $\Delta F_{\rm loc}=\Delta E_{\rm loc}-T_{\rm loc}\Delta S$ が過程を支配する場面もあり、箱のエントロピーだけを外部領域のエントロピー減少と同一視できません。

## 4. 境界を普遍的な定理と呼べない理由

### 4.1 多種粒子の思考例

同じエネルギー $E$ で同じサイズ $R$ の箱内に、互いに直交する $N$ 種類の一粒子状態 $|i\rangle$ があると仮定します。等確率混合 $\rho=N^{-1}\sum_{i=1}^N|i\rangle\langle i|$ の固有値は $1/N$ が $N$ 個なので、von Neumannエントロピーは

$$
S(\rho)=-\sum_{i=1}^N\frac1N\ln\frac1N=\ln N.
$$

$E,R$ を固定できると仮定したまま $N>e^{2\pi ER}$ を選べば、見かけ上Bekenstein型境界を越えます。しかしこれは**「任意に大きな $N$ の理論・容器・エネルギーを同一条件で実現できる」ことを仮定した反例候補**です。種数を変えると真空の自由度、閉じ込めの費用、重力への寄与も変わり得ます。単純な粒子数エントロピーを局所代数の真空差し引き量へ同一視することもできません。

### 4.2 Casimirエネルギーと強重力

境界条件を外から無償で固定した場では、負のCasimirエネルギーを通常の正の励起エネルギーから引けることがあります。$E$ を部分系の形式的な差だけで定義すれば、右辺を不当に小さくできます。壁や相互作用まで含めた**孤立系の全エネルギー**と、基準真空との差を区別する必要があります。

一方、Schwarzschildブラックホール自身の半径 $R_s=2GM$ とエントロピー $S_{\rm BH}=A/(4G)=\pi R_s^2/G$ は、$E=M$ と置けば $2\pi ER_s=\pi R_s^2/G=S_{\rm BH}$ を満たします（ここでは $c=\hbar=k_B=1$）。これは係数の印象的な整合ですが、$2GE/R_s=1$ なので**弱自己重力の仮定に反します**。この一致から強重力の任意の状態への定理を導いてはいけません。

## 5. 相対エントロピーから得られる、別の厳密な主張

普遍性を巡る混乱を避けるには、真空と励起状態を**同じ領域**へ制限して比較するのが有効です。[BHT22のモジュラーエネルギー差](../BHT22/index.md#def-bht22-modular-energy)を再利用します。有限次元の正則化で、忠実な参照状態 $\sigma$ と状態 $\rho$ に対し

$$
K=-\ln\sigma,
\quad\Delta K=\operatorname{Tr}[(\rho-\sigma)K],
\quad\Delta S=S(\rho)-S(\sigma)
$$

とおくと、自然対数の量子相対エントロピーは $D(\rho\Vert\sigma)=\Delta K-\Delta S$ です。連続量子場では、個々の局所エントロピーが発散しても、**状態差と相対エントロピーが適切に定義できる状態**に限定して同じ関係を使います。これは孤立箱の絶対エントロピー $S$ をそのまま $\Delta S$ と置く操作ではありません。

<a id="prop-bht23-relative-entropy-bound"></a>

<!-- formal-statement-start -->
> **命題（相対エントロピーからの真空差し引き境界）**
> 同一領域に制限した状態 $\rho$ と忠実な参照状態 $\sigma$ について、自然対数の有限な相対エントロピーが定義され、$K=-\ln\sigma$（連続場では対応するモジュラー生成子）および有限な差 $\Delta K,\Delta S$ に対して $D(\rho\Vert\sigma)=\Delta K-\Delta S$ が成立するとする。このとき

$$
\Delta S\le\Delta K.
$$

> さらに $\Delta K\le2\pi R\Delta E$ を**別途**示せる状態・領域なら $\Delta S\le2\pi R\Delta E$ が成立する。後段は前段だけからは従わない。
<!-- formal-statement-end -->

### 証明の見取り図

相対エントロピーの非負性が最初の不等式を与えます。距離 $R$ と物理エネルギー $\Delta E$ の関係は、参照状態の**モジュラーHamiltonianが何か**に依存します。

<!-- proof-start -->
### 証明

[QINF20の相対エントロピーの非負性](../../../応用系/QINF/QINF20/index.md#prop-qinf20-nonnegative)を自然対数へ換算すると、$D(\rho\Vert\sigma)\ge0$ です。定義式を移項して

$$
0\le\Delta K-\Delta S
\quad\Longrightarrow\quad\Delta S\le\Delta K.
$$

追加仮定 $\Delta K\le2\pi R\Delta E$ と推移律を使えば $\Delta S\le2\pi R\Delta E$ を得ます。$\square$
<!-- proof-end -->

**直接例**：$\sigma=I_2/2$、$\rho=|0\rangle\langle0|$ とすると、$K=(\ln2)I_2$ なので $\Delta K=(\ln2)(\operatorname{Tr}\rho-\operatorname{Tr}\sigma)=0$。また $S(\rho)=0$、$S(\sigma)=\ln2$ から $\Delta S=-\ln2$、従って $D=\ln2\ge0$ です。$\Delta S$ が負でも整合し、量子情報の不等式は「すべてのエントロピーは正のエネルギーで押さえられる」という意味ではありません。

### 5.1 Rindler半空間で係数 $2\pi$ が現れる仕組み

平坦時空の真空を $x>0$ の半空間へ制限したときの、適切な相対論的量子場のモジュラー生成子について、Rindlerの幾何から次の既知の**外部入力**を用います（ここで一般的な場の代数論の証明は行いません）。

$$
K_{x>0}=2\pi\int_{x>0}x\,T_{00}(x,\mathbf y)\,dx\,d^2\mathbf y
+\text{定数}.
$$

真空との差のエネルギー密度 $e(x,\mathbf y):=\Delta\langle T_{00}\rangle$ が**非負**で、$0<x\le R$ に支持を持ち、積分 $\Delta E=\int e\,dx\,d^2\mathbf y$ が有限なら、位置 $0<x\le R$ で $xe\le Re$ なので

$$
0\le\Delta K=2\pi\int xe\le2\pi R\int e=2\pi R\Delta E.
$$

よって[直前の相対エントロピー境界](#prop-bht23-relative-entropy-bound)は $\Delta S\le2\pi R\Delta E$ を与えます。この導出では $\Delta\langle T_{00}\rangle\ge0$ が**点ごとの追加仮定**です。量子場の任意の状態に成り立つわけではありません。また $R$ は半空間の境界から測る支持の最大距離で、孤立箱の最小包含球半径と常に同じではありません。ここから直ちに第1節の $S$ の普遍的上限を得たとは言えません。

### 5.2 三つの主張を混同しない

| 主張 | 主役のエントロピー | 必要な追加条件 | 結論の射程 |
| --- | --- | --- | --- |
| 理想降下によるBekenstein型境界 | 孤立箱の $S$ | 弱重力、準静的操作の実現、GSL、浮力等の誤差消失 | その操作群に対する条件付き帰結 |
| 相対エントロピーの不等式 | 真空等との状態差 $\Delta S$ | 同一領域、参照状態、有限相対エントロピー | $\Delta S\le\Delta K$ |
| 局在エネルギーを用いた $2\pi R$ 型評価 | 同じ $\Delta S$ | モジュラー生成子の幾何表示、正の局所エネルギー差と支持条件 | $\Delta S\le2\pi R\Delta E$ の特別な場合 |

量子場の種数、局所化の方法、壁、強重力、任意の曲がった時空、見かけの地平線まで一括して適用できるとする主張は、上表のいずれからも出ません。光シートの面積差を扱う**共変エントロピー境界**も、ここでの孤立箱の境界とは定義と仮定が違います。

## 6. 演習（全問に詳細解答）

### Level A：係数・符号・量の意味

<a id="ex-bht23-a01"></a>

#### BHT23-A01 物理単位を復元する

- Level: A

- 問題: 無次元エントロピー $s=S_{\rm phys}/k_B$ に対する $s\le2\pi ER/(\hbar c)$ で、$E$ がJ、$R$ がmなら右辺が無次元であることを確かめよ。また $E=\hbar c/R$ のときの上限を求めよ。

<!-- solution-start -->
**詳細解答**：$[\hbar]={\rm J\,s}$、$[c]={\rm m/s}$ だから $[\hbar c]={\rm J\,m}=[ER]$ です。$E=\hbar c/R$ を代入すると $ER/(\hbar c)=1$、従って $s\le2\pi$。物理エントロピーでは $S_{\rm phys}\le2\pi k_B$ です。$G$ が表示されなくても弱重力等の仮定は残ります。
<!-- solution-end -->

<a id="ex-bht23-a02"></a>

#### BHT23-A02 赤方偏移から係数を計算する

- Level: A

- 問題: 非極限静的地平線で $\chi\simeq\kappa\ell$、$T_H=\kappa/(2\pi)$、$E_\infty=\chi E$、$\Delta S_{\rm BH}\simeq E_\infty/T_H$ とする。$\kappa$ を消去して $\Delta S_{\rm BH}$ を求めよ。$\ell=R$ とすることの物理的意味を述べよ。

<!-- solution-start -->
**詳細解答**：代入の順は $E_\infty\simeq\kappa\ell E$、$1/T_H=2\pi/\kappa$ です。したがって

$$
\Delta S_{\rm BH}\simeq\frac{2\pi}{\kappa}(\kappa\ell E)=2\pi\ell E.
$$

$\ell=R$ は球形箱の底が地平線の直上に来る理想位置です。有限の壁厚・浮力・潮汐力を無視できるという条件は、位置の等式だけからは導けません。
<!-- solution-end -->

<a id="ex-bht23-a03"></a>

#### BHT23-A03 下限の取り違えを見破る

- Level: A

- 問題: $X\ge10$ と $S\le X$ が成立するとき、$S\le10$ は必ず従うか。数値反例を挙げ、Bekenstein boundの降下模型で $X$ と10に対応する量を説明せよ。

<!-- solution-start -->
**詳細解答**：従いません。$X=20$、$S=15$ なら $20\ge10$、$15\le20$ ですが $15\nleq10$ です。降下模型では $X=\Delta S_{\rm BH}$、10に対応するのは $2\pi ER$ です。$S\le2\pi ER$ を得るには $X$ の**上からの近似**または理想操作列が追加で必要です。
<!-- solution-end -->

<a id="ex-bht23-a04"></a>

#### BHT23-A04 局所温度と圧力勾配

- Level: A

- 問題: $T_{\rm loc}=1/(2\pi\ell)$、$p=aT_{\rm loc}^4/3$（$a>0$）のとき $p'(\ell)$ を求め、浮力の向きを示せ。

<!-- solution-start -->
**詳細解答**：$p(\ell)=a/[3(2\pi)^4]\,\ell^{-4}$ を微分して $p'(\ell)=-4a/[3(2\pi)^4]\,\ell^{-5}=-4p(\ell)/\ell<0$。箱の下面はより高圧なので、$-Vp'(\ell)>0$ に対応する圧力差は外向きです。これは高さが $\ell$ より十分小さい箱の一次近似です。
<!-- solution-end -->

<a id="ex-bht23-a05"></a>

#### BHT23-A05 ブラックホールでの形式的な飽和

- Level: A

- 問題: $c=\hbar=k_B=1$、$R_s=2GM$、$S_{\rm BH}=\pi R_s^2/G$ とする。$2\pi MR_s$ と $S_{\rm BH}$ を比較し、この結果が弱重力境界の一般的証明ではない理由を示せ。

<!-- solution-start -->
**詳細解答**：$2\pi MR_s=2\pi(R_s/(2G))R_s=\pi R_s^2/G=S_{\rm BH}$。ただし $2GM/R_s=1$ であり、要求した $2GE/R\ll1$ に反します。形式的に等号が出ることと、第2節の弱い自己重力の箱を実際に下ろせることは別です。
<!-- solution-end -->

### Level B：理想操作の仮定と量子情報

<a id="ex-bht23-b01"></a>

#### BHT23-B01 誤差を残したGSL

- Level: B

- 問題: 理想降下を模した過程で $\Delta S_{\rm BH}=2\pi ER+0.08$、$\Delta S_{\rm out}=-S+0.12$ とする。GSLから得る $S$ の上限を求めよ。誤差を0へ送れない場合、$2\pi ER$ だけの上限が導けるか説明せよ。

<!-- solution-start -->
**詳細解答**：$\Delta S_{\rm gen}=2\pi ER+0.08-S+0.12=2\pi ER+0.20-S$。GSLの $\Delta S_{\rm gen}\ge0$ から

$$
S\le2\pi ER+0.20.
$$

$+0.20$ が残る限り $S=2\pi ER+0.10$ も許され、強い方の $S\le2\pi ER$ は導けません。[条件付き境界の命題](#prop-bht23-conditional-bound)では両誤差が同一の箱について0へ行く操作列を仮定して初めて極限を取れました。
<!-- solution-end -->

<a id="ex-bht23-b02"></a>

#### BHT23-B02 種数を増やす模型の論理

- Level: B

- 問題: 一粒子の種類が $N=16$、等確率である箱を考える。$S$ を求め、$ER=1/4$ の形式的境界と比較せよ。なぜこれだけでは実際のGSLの反例にならないか、少なくとも二つの独立した理由を述べよ。

<!-- solution-start -->
**詳細解答**：$\rho=I_{16}/16$ だから $S=-16(1/16)\ln(1/16)=\ln16=4\ln2\simeq2.773$。形式的上限は $2\pi ER=\pi/2\simeq1.571$ なので数値上は越えます。しかし (1) $N=16$ の直交状態を$ER=1/4$の全エネルギー・サイズに閉じ込める相互作用や壁の費用を無視した、(2) 真空・箱の周囲の熱的雰囲気との相関と浮力を無視して $\Delta S_{\rm out}=-S$ と置いた、という二点は独立の仮定です。いずれもGSLを適用する現実の過程の成立を保証しません。
<!-- solution-end -->

<a id="ex-bht23-b03"></a>

#### BHT23-B03 二準位の相対エントロピー

- Level: B

- 問題: $\sigma=I_2/2$、$\rho=|0\rangle\langle0|$、$K=-\ln\sigma$ とする。$\Delta K,\Delta S,D(\rho\Vert\sigma)$ を計算し、$\Delta S\le\Delta K$ の向きを検算せよ。

<!-- solution-start -->
**詳細解答**：$\sigma$ の固有値はいずれも $1/2>0$ なので $K=(\ln2)I_2$ です。トレースの差は $\operatorname{Tr}(\rho-\sigma)=1-1=0$、従って $\Delta K=0$。$\rho$ の固有値は $(1,0)$、$\sigma$ は $(1/2,1/2)$ なので $S(\rho)=0$、$S(\sigma)=\ln2$、$\Delta S=-\ln2$。したがって

$$
D=\Delta K-\Delta S=0-(-\ln2)=\ln2>0,
\qquad -\ln2\le0.
$$

相対エントロピーは非負ですが、参照状態からのエントロピー差は負になれます。
<!-- solution-end -->

<a id="ex-bht23-b04"></a>

#### BHT23-B04 Rindlerのエネルギー重み

- Level: B

- 問題: 半空間 $x>0$ の励起の真空差エネルギー密度が横断方向を積分した後で $e(x)=2Ex/R^2$（$0<x<R$）、それ以外は0であり、$E,R>0$ とする。$\Delta E=\int_0^\infty e(x)dx$ と $\Delta K=2\pi\int_0^\infty xe(x)dx$ を計算し、$\Delta K\le2\pi R\Delta E$ を検証せよ。

<!-- solution-start -->
**詳細解答**：$e(x)\ge0$ かつ支持は $(0,R)$ にあります。$\Delta E=\int_0^R(2Ex/R^2)dx=(2E/R^2)[x^2/2]_0^R=E$ です。一方、

$$
\Delta K=\frac{4\pi E}{R^2}\int_0^R x^2dx
=\frac{4\pi E}{R^2}\frac{R^3}{3}
=\frac{4\pi ER}{3}.
$$

$4\pi ER/3\le2\pi ER$ は $4/3\le2$ から成立します。したがって有限な相対エントロピーを定義できるなら [相対エントロピー境界](#prop-bht23-relative-entropy-bound)で $\Delta S\le4\pi ER/3$ という、より強い状態依存の上限が得られます。
<!-- solution-end -->

### Level C：降下模型と情報論的な境界を横断する

<a id="ex-bht23-c01"></a>

#### BHT23-C01 最小投下の数字が意味すること

- Level: C

- 問題: 自然単位で $M=1000$ のほぼ定常なSchwarzschildブラックホールへ $E=1/100$、$R=10$ の球形箱を下ろす。$G=1$ とする。相対的に小さい箱と弱い自己重力という条件を確認したうえで、(1) 地平線から箱中心までの固有距離を $\ell=R$ と理想化したときの $\chi,E_\infty,\Delta S_{\rm BH}$ を一次近似で求めよ。(2) $S=3/10$ と $S=\ln4$ の箱をそれぞれ単純収支で比較せよ。(3) 後者の数値だけでGSLが反証されない理由と、相対エントロピー型の境界に必要なデータを説明せよ。

<!-- solution-start -->
**詳細解答**：

**前提の確認。** 背景の曲率半径に対して $R/(2M)=10/2000=1/200\ll1$、箱の自己重力は $2E/R=(2/100)/10=1/500\ll1$、質量比は $E/M=10^{-5}$ です。従って点粒子・背景固定近似の大きさは小さいものの、量子浮力を無視できるとはまだ言えません。

**(1) 一次の幾何とエネルギー。** $\kappa=1/(4M)=1/4000$、$T_H=1/(8000\pi)$ です。$\ell=10$ で $\chi\simeq\kappa\ell=10/4000=1/400$。よって

$$
E_\infty\simeq\chi E
=\frac{1}{400}\frac{1}{100}=\frac{1}{40000},
\qquad
\Delta S_{\rm BH}\simeq\frac{1/40000}{1/(8000\pi)}
=\frac{\pi}{5}=0.2\pi.
$$

直接式 $2\pi RE=2\pi\cdot10/100=\pi/5$ と一致します。$E_\infty/M=1/(4\times10^7)$ は小さく、Schwarzschildの $S(M)=4\pi M^2$ における二次補正 $4\pi E_\infty^2$ は正で非常に小さい値です。

**(2) 単純収支。** $S=3/10$ なら $\Delta S_{\rm gen}\simeq\pi/5-3/10>0$（$\pi/5\simeq0.628>0.3$）。$S=\ln4\simeq1.386$ なら $\Delta S_{\rm gen}\simeq\pi/5-\ln4<0$。いずれも**浮力・壁・相関を切り落とした同じ形式的模型**の数値です。

**(3) 射程。** $\ell=R$ での点粒子近似、準静的保持、温度の高い雰囲気の浮力と押しのけられた自由度、$S$ と外部のエントロピー損失の同一視を再検討する必要があります。$S=\ln4$ を持つ物理的な箱の実在も確認していません。相対エントロピー型へ移るには、同一領域上の状態 $\rho,\sigma$、有限な $D(\rho\Vert\sigma)$、モジュラー生成子 $K$、真空差 $\Delta S$ と $\Delta K$ が必要で、さらにサイズとエネルギーの積へ直すには $\Delta K\le2\pi R\Delta E$ を別途示します。ここで $S_{\rm box}$ を無条件に $\Delta S$ と同一視してはいけません。
<!-- solution-end -->

## 7. 結論と次講への接続

1. $2\pi ER$ は地平線温度と近傍赤方偏移の比から現れます。しかし幾何的な降下限界だけではBekenstein boundは証明されず、最小に近い降下操作の実在性とGSLの仮定が要ります。
2. 熱的雰囲気の浮力、仕事、境界の実装、外部の相関は、単純な $\Delta S_{\rm out}=-S$ を変えます。落下模型だけから任意の場の強い普遍性を主張しません。
3. 量子相対エントロピーの非負性は、正確に定義された状態差について $\Delta S\le\Delta K$ を与えます。$\Delta K\le2\pi R\Delta E$ の方は領域と正のエネルギー分布などの**追加の幾何的・物理的仮定**を使います。

次講 **BHT24「総合検算・微視状態と情報問題への橋」** では、ここまでの法則の適用条件を横断表へまとめ、$S_{\rm BH}$ の微視状態解釈と情報問題で未解決な範囲を明確にします。

### 一次資料

- J. D. Bekenstein, [*Universal upper bound on the entropy-to-energy ratio for bounded systems*](https://doi.org/10.1103/PhysRevD.23.287)（1981）：有限サイズ・弱重力系の境界の出発点。
- W. G. Unruh and R. M. Wald, [*Acceleration radiation and the generalized second law of thermodynamics*](https://doi.org/10.1103/PhysRevD.25.942)（1982）：加速放射と箱への浮力。
- W. G. Unruh and R. M. Wald, [*Entropy bounds, acceleration radiation, and the generalized second law*](https://doi.org/10.1103/PhysRevD.27.2271)（1983）：浮力を含む収支と境界の意味。
- H. Casini, [*Relative entropy and the Bekenstein bound*](https://arxiv.org/abs/0804.2182)（2008）：局所領域の真空との差・モジュラーエネルギーによる定式化。
- D. Marolf and R. Sorkin, [*Bound states and the Bekenstein bound*](https://arxiv.org/abs/hep-th/0310148)（2004）：場の種数、負の真空エネルギー、境界の費用を巡る検討。
