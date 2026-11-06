# ITD1 有限状態の確率軌道・仕事・熱・エントロピー生成

[TH2の第一法則](../../TH/TH2/index.md#axiom-th2-first-law)は、巨視的な系のエネルギー収支を $\Delta U=W+Q$ と表しました。[SM3の正準分布](../../SM/SM3/index.md#def-sm3-canonical)は、温度を固定したときの各微視状態の確率を与えます。しかし、小さな系では一回ごとにジャンプの向きも回数も変わります。同じ操作をしても、ある回には熱が系に流入し、別の回には熱が浴へ流出します。

そこで「**一回の実験でどの状態を通り、どの瞬間に仕事・熱が移ったか**」を記録します。有限個の状態を使えば、確率もエネルギーも有限和だけで検算できます。そのうえで、軌道ごとの熱力学第一法則、熱浴との遷移に要求する条件、平均すると非負になるエントロピー生成へ進みます。

本章では一つの温度 $T>0$ の熱浴を考え、$\beta=1/(k_{\mathrm B}T)>0$ とします。対数は自然対数、情報量と無次元エントロピーは nat で記録します。熱力学的なエントロピーの単位へ直すときは $k_{\mathrm B}$ を掛けます。熱 $Q$ は**浴から系に入る**向きを正、仕事 $W$ は**外部が系にする**向きを正とし、[TH2の熱・仕事の符号](../../TH/TH2/index.md#def-th2-heat-work)とそろえます。

## 1. 操作と熱浴との接触を別々に記録する

最小の例は $X=\{0,1\}$ の二状態系です。状態1だけにエネルギー $\varepsilon>0$ を与えられる制御つまみを考えます。つまみを動かしても、系が瞬時に状態を変えるとは限りません。一方、つまみを固定したまま熱浴に接触させれば、状態が確率的に変わります。この二つを交互に行う模型を作ります。

[INFO2の有限確率通信路](../../../応用系/INFO/INFO2/index.md#def-info2-channel)は、入力 $x$ ごとに出力 $y$ への確率を与えました。ここではその入力を「接触直前の状態」、出力を「接触直後の状態」と読むことにします。これを遷移核と呼びます。

<a id="def-itd1-controlled-model"></a>

<!-- formal-statement-start -->
> **定義（有限状態の操作・接触模型）**  
> 空でない有限集合 $X$、制御値 $\lambda_0,\ldots,\lambda_n$、有限な実数のエネルギー $E(x,\lambda)$、整数 $n\ge1$ を取る。各段階 $j=1,\ldots,n$ で、状態 $x_{j-1}$ を保ったまま $\lambda_{j-1}$ を $\lambda_j$ へ変更する操作（quench）を行い、続いて $\lambda_j$ を固定して熱浴と接触させる。接触の遷移核 $K_j(x,y)\ge0$ は、すべての $x\in X$ について

$$
\sum_{y\in X}K_j(x,y)=1
$$

> を満たす。初期分布は $p_0(x)\ge0$、$\sum_xp_0(x)=1$ とする。接触後の状態を $x_j$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-itd1-controlled-model -->
### 例：二状態系と一回の接触

**定義の確認**：制御値を $\lambda_0=0,\lambda_1=\varepsilon$ とし、$E(0,\lambda)=0$、$E(1,\lambda)=\lambda$ とします。

[有限確率通信路の定義](../../../応用系/INFO/INFO2/index.md#def-info2-channel)と同様、$K_1(x,y)$ を「状態 $x$ で接触を始め、状態 $y$ で終える条件付き確率」として並べます。状態を $0,1$ の順に取ると、行が接触前の状態、列が接触後の状態である行列として、接触の核を

$$
K_1=\begin{pmatrix}3/4&1/4\\1/2&1/2\end{pmatrix}
$$

とします。各成分は非負、行和は $3/4+1/4=1$ と $1/2+1/2=1$ なので、これは定義の条件を満たします。例えば状態1から0へ移る確率は第2行・第1列の $K_1(1,0)=1/2$ です。最初の quench では状態は1のままでも、接触の結果は0になることがあります。
<!-- definition-example-end -->

離散時間の模型では、各接触区間にどんな変化が起きたかを一つの核で表します。「ジャンプが一回だけ起きる」ことを一般には意味しません。連続時間の遷移率や master 方程式を用いる模型では、短い時間間隔の極限が別途必要です。本章の証明では離散時間の核を固定して用います。

## 2. 軌道の確率を有限個の積で数える

初期状態と接触後の状態を順に並べた列 $\gamma=(x_0,x_1,\ldots,x_n)$ を記録します。[INFO2の有限Markov連鎖](../../../応用系/INFO/INFO2/index.md#def-info2-markov)と同じ条件付き独立性を各段階で仮定し、次の状態の確率が現在の状態とその段階の核だけで決まり、それより前の履歴には依存しないものとします。各段階で核が変わっても構いません。

<a id="def-itd1-path-probability"></a>

<!-- formal-statement-start -->
> **定義（軌道確率）**  
> [有限状態の操作・接触模型](#def-itd1-controlled-model)において、状態列 $\gamma=(x_0,\ldots,x_n)\in X^{n+1}$ を軌道とする。各段階の条件付き確率が $K_j(x_{j-1},x_j)$ であり、それ以前の履歴には追加で依存しないとき、軌道の正方向の確率を

$$
P_{\mathrm F}(\gamma)=p_0(x_0)\prod_{j=1}^{n}K_j(x_{j-1},x_j)
$$

> と定義する。段階 $j$ の接触後分布を $p_j$ と記す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-itd1-path-probability -->
### 例：二段階の軌道を数える

**定義の確認**：$p_0(0)=p_0(1)=1/2$、制御値は二回目に変えず $\lambda_2=\lambda_1=\varepsilon$ とし、二回とも例の核、すなわち $K_2=K_1$ を用いるとします。軌道 $(1,0,1)$ では、最初に状態1を引き、次に1から0、さらに0から1に移るので

$$
P_{\mathrm F}(1,0,1)
=\frac12\cdot\frac12\cdot\frac14
=\frac1{16}.
$$

最後の $1/4$ は $K_1(0,1)$ です。単に「1が二回出る確率」として独立な周辺確率を掛けるのではなく、条件付き遷移を順に掛けています。
<!-- definition-example-end -->

<a id="prop-itd1-update"></a>

<!-- formal-statement-start -->
> **命題（有限Markov模型の規格化と分布更新）**  
> 空でない有限集合 $X$、初期確率分布 $p_0$、行和1の遷移核 $K_1,\ldots,K_n$ について、[軌道確率](#def-itd1-path-probability)は確率分布であり、接触後の分布は

$$
p_j(y)=\sum_{x\in X}p_{j-1}(x)K_j(x,y)
\quad(j=1,\ldots,n)
$$

> となる。特に $\sum_{\gamma\in X^{n+1}}P_{\mathrm F}(\gamma)=1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

ある状態から次に行く確率の和は1です。軌道を最後の状態から順に足し上げ、同時に周辺分布を更新すればよいことが分かります。

<!-- proof-start -->
### 証明

第1段階について、互いに排反な事象「直前の状態が $x$、直後が $y$」を $x$ で足すと

$$
p_1(y)=\sum_xp_0(x)K_1(x,y).
$$

右辺は非負です。また有限和の順序を交換して

$$
\sum_y p_1(y)
=\sum_xp_0(x)\sum_yK_1(x,y)
=\sum_xp_0(x)=1.
$$

$p_{j-1}$ が確率分布なら同じ計算で $p_j$ も確率分布になり、帰納法で更新式が成立します。全軌道にわたる和は

$$
\sum_{x_0,\ldots,x_n}p_0(x_0)
K_1(x_0,x_1)\cdots K_n(x_{n-1},x_n).
$$

ここでまず $x_n$ だけに関する和を取ると $\sum_{x_n}K_n(x_{n-1},x_n)=1$ です。続いて $x_{n-1},\ldots,x_1$ に関する和を順に取り除くと $\sum_{x_0}p_0(x_0)=1$ が残ります。有限和なので交換に極限操作の仮定は要りません。
<!-- proof-end -->

初期分布が一様でも接触後分布は一般に一様ではありません。上の二状態核を一回使うと

$$
p_1(0)=\frac12\frac34+\frac12\frac12=\frac58,
\qquad
p_1(1)=\frac12\frac14+\frac12\frac12=\frac38.
$$

## 3. 各軌道の仕事と熱を分ける

制御つまみの変更では、状態が同じでもエネルギー準位が移動します。逆に制御値を固定した接触では、準位そのものは変わらず、状態の変化によってエネルギーを授受します。[TH2の熱・仕事の定義](../../TH/TH2/index.md#def-th2-heat-work)を有限状態の一段階ずつに移すため、前者を仕事、後者を熱と定めます。

<a id="def-itd1-path-work-heat"></a>

<!-- formal-statement-start -->
> **定義（軌道の仕事・熱）**  
> [有限状態の操作・接触模型](#def-itd1-controlled-model)と軌道 $\gamma=(x_0,\ldots,x_n)$ について、段階 $j$ の外部から系への仕事 $W_j$、浴から系への熱 $Q_j$ を

$$
\begin{aligned}
W_j&=E(x_{j-1},\lambda_j)-E(x_{j-1},\lambda_{j-1}),\\
Q_j&=E(x_j,\lambda_j)-E(x_{j-1},\lambda_j)
\end{aligned}
$$

> と定義する。全仕事 $W[\gamma]=\sum_jW_j$、全熱 $Q[\gamma]=\sum_jQ_j$、浴へ流出した熱 $Q_{\mathrm{bath}}[\gamma]=-Q[\gamma]$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-itd1-path-work-heat -->
### 例：励起状態のエネルギーを上げ、浴で落ちる

**定義の確認**：$E(0,\lambda)=0$、$E(1,\lambda)=\lambda$ とし、$\lambda_0=0$ から $\lambda_1=\varepsilon>0$ へ操作した後、軌道 $1\to0$ が実現したとします。制御時には状態1なので

$$
W_1=E(1,\varepsilon)-E(1,0)=\varepsilon.
$$

続く接触では制御値 $\varepsilon$ が固定され、

$$
Q_1=E(0,\varepsilon)-E(1,\varepsilon)=-\varepsilon.
$$

したがって系は仕事で $\varepsilon$ を受け取り、同じ量を浴へ放出します。始めと終わりのエネルギーはいずれも0です。もし軌道 $0\to1$ なら、同じ quench では $W_1=0$、接触では $Q_1=\varepsilon$ となります。
<!-- definition-example-end -->

<a id="thm-itd1-first-law"></a>

<!-- formal-statement-start -->
> **定理（軌道第一法則）**  
> 任意の有限状態の操作・接触模型、任意の長さ $n\ge1$ の軌道 $\gamma=(x_0,\ldots,x_n)$ について、[軌道の仕事・熱](#def-itd1-path-work-heat)を上記の符号で定義すると

$$
E(x_n,\lambda_n)-E(x_0,\lambda_0)
=W[\gamma]+Q[\gamma]
$$

> が**各軌道ごとに**成立する。軌道確率が正であることはこの代数的恒等式に不要である。
<!-- formal-statement-end -->

### 証明の見取り図

一段階のエネルギー差に、中間時点の「状態は古いままで制御値だけ新しい」エネルギーを足して引きます。段階をすべて足すと内部のエネルギーが消えます。

<!-- proof-start -->
### 証明

段階 $j$ の始点と終点のエネルギー差に $E(x_{j-1},\lambda_j)$ を足し引きすると

$$
\begin{aligned}
E(x_j,\lambda_j)-E(x_{j-1},\lambda_{j-1})
&=[E(x_j,\lambda_j)-E(x_{j-1},\lambda_j)]\\
&\quad+[E(x_{j-1},\lambda_j)-E(x_{j-1},\lambda_{j-1})]\\
&=Q_j+W_j.
\end{aligned}
$$

これを $j=1,\ldots,n$ で足すと左辺の $E(x_j,\lambda_j)$ は次の段階の負の項と打ち消し合い、始点と終点だけが残ります。右辺は定義から $Q[\gamma]+W[\gamma]$ です。確率についての仮定はどこにも使っていません。
<!-- proof-end -->

平均についても、有限和で両辺に $P_{\mathrm F}(\gamma)$ を掛けて足せば

$$
\mathbb E[E(x_n,\lambda_n)]-\mathbb E[E(x_0,\lambda_0)]
=\mathbb E[W]+\mathbb E[Q]
$$

となります。ただし**平均の等式だけ**を出発点にしても、実現した一つの軌道での収支までは分かりません。

## 4. 熱浴のモデルは何を仮定しているか

遷移核の行和が1であるだけでは、どちら向きのジャンプが熱的に起こりやすいかは決まりません。温度 $T$ の単一平衡熱浴に接した、外部駆動のない接触区間について、正逆の遷移確率の比に制約を課します。次の定義は、その制約を数式で固定するものです。

浴へ渡した熱が正なら、浴のエントロピー変化は $Q_{\mathrm{bath}}/T$ です。したがって無次元量 $\Delta s_{\mathrm{bath}}/k_{\mathrm B}=\beta Q_{\mathrm{bath}}$ が遷移の向きの非対称性を測る、という物理的仮定を置きます。

<a id="def-itd1-local-detailed-balance"></a>

<!-- formal-statement-start -->
> **定義（局所詳細釣合い）**  
> 有限状態の操作・接触模型で、各段階 $j$ の核について $K_j(x,y)>0$ と $K_j(y,x)>0$ が同値であり、正の遷移に対して

$$
\log\frac{K_j(x,y)}{K_j(y,x)}
=-\beta\{E(y,\lambda_j)-E(x,\lambda_j)\}
=\beta Q_{\mathrm{bath}}(x\to y;\lambda_j)
$$

> が成り立つとき、その核は温度 $T$ の単一熱浴に関して局所詳細釣合いを満たすという。右辺の浴への熱は $E(x,\lambda_j)-E(y,\lambda_j)$ と定義する。$K_j(x,y)=K_j(y,x)=0$ の組には対数比を割り当てない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-itd1-local-detailed-balance -->
### 例：逆向きの遷移が二倍起こりやすい

**定義の確認**：二状態のエネルギーを $0,\varepsilon$、$\beta\varepsilon=\log2$ とします。核を

$$
K=\begin{pmatrix}3/4&1/4\\1/2&1/2\end{pmatrix}
$$

とすると、非対角成分はともに正で、対角成分も正です。$0\to1$ では系が $\varepsilon$ の熱を受け取り、浴へ渡した熱は $-\varepsilon$ ですから

$$
\log\frac{K(0,1)}{K(1,0)}
=\log\frac{1/4}{1/2}
=-\log2=-\beta\varepsilon.
$$

逆向きは符号が反転し、$x=y$ では両辺とも0です。したがって**すべての遷移対**について条件を直接確認できました。
<!-- definition-example-end -->

<a id="prop-itd1-canonical-balance"></a>

<!-- formal-statement-start -->
> **命題（正準分布と局所詳細釣合い）**  
> $X$ が空でない有限集合、$E(x,\lambda)$ が有限、$T>0$ とする。行和1の核 $K(x,y)$ が制御値 $\lambda$ で[局所詳細釣合い](#def-itd1-local-detailed-balance)を満たすなら、[SM3の正準分布](../../SM/SM3/index.md#def-sm3-canonical)

$$
\pi_\lambda(x)=\frac{e^{-\beta E(x,\lambda)}}{\sum_z e^{-\beta E(z,\lambda)}}
$$

> は $\pi_\lambda(x)K(x,y)=\pi_\lambda(y)K(y,x)$ を満たし、$\sum_x\pi_\lambda(x)K(x,y)=\pi_\lambda(y)$ である。すなわち正準分布は接触によって変わらない。
<!-- formal-statement-end -->

### 証明の見取り図

正準確率の比が、局所詳細釣合いによる遷移確率の比を打ち消します。対応する二つの積が等しいことを示したら、片方の状態について和を取ります。

<!-- proof-start -->
### 証明

正の遷移対について[正準分布の定義](../../SM/SM3/index.md#def-sm3-canonical)から

$$
\frac{\pi_\lambda(y)}{\pi_\lambda(x)}
=e^{-\beta(E(y,\lambda)-E(x,\lambda))}
=\frac{K(x,y)}{K(y,x)}.
$$

両辺に正の $\pi_\lambda(x)K(y,x)$ を掛けると

$$
\pi_\lambda(x)K(x,y)=\pi_\lambda(y)K(y,x).
$$

両向きとも零なら両積も零なので、この等式はすべての $x,y$ に成立します。$x$ で和を取ると

$$
\sum_x\pi_\lambda(x)K(x,y)
=\pi_\lambda(y)\sum_xK(y,x)
=\pi_\lambda(y)
$$

です。最後は**行 $y$ の和**が1という核の条件を用いました。
<!-- proof-end -->

例の核では $\pi=(2/3,1/3)$ となり、遷移の流量は

$$
\pi(0)K(0,1)=\frac23\frac14=\frac16
=\frac13\frac12=\pi(1)K(1,0)
$$

です。局所詳細釣合いは**任意の核の自動的な性質ではありません**。また接触のあいだ正準分布が不変でも、quench で制御値を変更した直後の分布が新しい正準分布になるとは限りません。

## 5. なぜ一回ではエントロピー生成が負にもなるのか

分布 $p_j$ を知ったうえで状態 $x_j$ が実現したとき、[INFO1の自己情報量](../../../応用系/INFO/INFO1/index.md#def-info1-self-information)に対応する無次元の**確率的系エントロピー**を $s_{\mathrm{sys}}(x_j,j)=-\log p_j(x_j)$ と置きます。正の確率で実現した状態にだけこの値を割り当てます。平均には[INFO1のShannonエントロピー](../../../応用系/INFO/INFO1/index.md#def-info1-entropy)を自然対数で表した次の量を使います（零確率の項は和に含めません）。

$$
H_{\mathrm{nat}}(p):=-\sum_{x:p(x)>0}p(x)\log p(x)
=(\ln2)\left[-\sum_{x:p(x)>0}p(x)\log_2p(x)\right].
$$

軌道の始点と終点が正の確率を持てば、確率的系エントロピーの変化は

$$
\Delta s_{\mathrm{sys}}[\gamma]
=-\log p_n(x_n)+\log p_0(x_0)
=\log\frac{p_0(x_0)}{p_n(x_n)}
$$

です。ここで $\log$ の底は自然対数です。

系の確率分布は実験の初期・終期で違ってよいので、系のエントロピー変化は端点確率の比です。浴の変化は、すでに定義した各ジャンプの熱から得られます。ただし、この和がどんな軌道でも正であると期待してはいけません。

逆向きの実験も明示します。正方向が「quenchしてから接触」なら、逆方向は「最後の核による逆順の接触を行い、それからquenchを戻す」を繰り返します。時間順序を単に入れ替えるだけで、初期分布を省くことはできません。

<a id="def-itd1-reverse-entropy"></a>

<!-- formal-statement-start -->
> **定義（逆実験と全エントロピー生成）**  
> 有限状態の操作・接触模型で $p_0(x)>0$ が全 $x\in X$ について成り立ち、各核は局所詳細釣合いを満たすとする。正方向の終端分布を $p_n$ とし、逆方向の実験は $p_n$ から始め、$K_n,K_{n-1},\ldots,K_1$ による接触を逆順に行い、各接触の後に制御値を元へ戻す。逆軌道を $\gamma^\dagger=(x_n,\ldots,x_0)$ として

$$
P_{\mathrm R}(\gamma^\dagger)
=p_n(x_n)\prod_{j=1}^{n}K_j(x_j,x_{j-1})
$$

> と置く。正の経路確率を持つ軌道の無次元全エントロピー生成を

$$
\Sigma[\gamma]
=\log\frac{p_0(x_0)}{p_n(x_n)}
+\beta Q_{\mathrm{bath}}[\gamma]
$$

> と定義する。第1項は系、第2項は浴の寄与であり、熱力学的単位では $k_{\mathrm B}\Sigma$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-itd1-reverse-entropy -->
### 例：系へ熱が入る一回のジャンプ

**定義の確認**：二状態核 $K$、エネルギー $0,\varepsilon$、$\beta\varepsilon=\log2$、初期分布 $p_0=(1/2,1/2)$ を用い、制御値は変えないとします。[分布更新](#prop-itd1-update)により $p_1=(5/8,3/8)$ です。軌道 $0\to1$ は確率 $1/8$ で実現します。このとき $Q_{\mathrm{bath}}=-\varepsilon$ なので

$$
\Sigma[0\to1]
=\log\frac{1/2}{3/8}-\beta\varepsilon
=\log\frac43-\log2
=\log\frac23<0.
$$

定義の第1項は $\log(4/3)$、第2項は $-\log2$ です。系と浴の双方を数えても、**一回の軌道では負**になり得ます。
<!-- definition-example-end -->

<a id="thm-itd1-path-ratio"></a>

<!-- formal-statement-start -->
> **定理（経路確率比と全エントロピー生成）**  
> 空でない有限状態集合、有限エネルギー、$T>0$、全状態で正の初期分布 $p_0$、局所詳細釣合いを満たす各遷移核からなる上記模型において、正の確率を持つ任意の軌道 $\gamma$ について

$$
\Sigma[\gamma]
=\log\frac{P_{\mathrm F}(\gamma)}
{P_{\mathrm R}(\gamma^\dagger)}
$$

> が成り立つ。両辺は無次元である。
<!-- formal-statement-end -->

### 証明の見取り図

正方向と逆方向の経路確率をともに積で展開すると、初期・終端の分布比と各ジャンプの核の比が残ります。後者の対数を局所詳細釣合いで熱へ変換します。

<!-- proof-start -->
### 証明

正の確率を持つ軌道では、各段階の $K_j(x_{j-1},x_j)>0$ です。[局所詳細釣合い](#def-itd1-local-detailed-balance)により、対応する逆向きの核も正です。

また、$p_0$ の全成分が正で、各核は双方向に同じ支持を持つため、帰納法で $p_j$ の全成分も正と示せます。任意の状態 $y$ について、行 $y$ の和が1だから正の $K_j(y,z)$ が少なくとも一つあり、逆向きにも $K_j(z,y)>0$ です。$p_{j-1}$ の全成分が正であると仮定すれば、[分布更新](#prop-itd1-update)から

$$
p_j(y)=\sum_xp_{j-1}(x)K_j(x,y)
\ge p_{j-1}(z)K_j(z,y)>0
$$

です。初期分布から帰納できるため、逆実験の端点確率も正で、対数比は定義できます。

[軌道確率](#def-itd1-path-probability)と[逆実験](#def-itd1-reverse-entropy)の式を代入して対数を積から和へ直すと

$$
\begin{aligned}
\log\frac{P_{\mathrm F}(\gamma)}
{P_{\mathrm R}(\gamma^\dagger)}
&=\log\frac{p_0(x_0)}{p_n(x_n)}
+\sum_{j=1}^{n}
\log\frac{K_j(x_{j-1},x_j)}{K_j(x_j,x_{j-1})}\\
&=\log\frac{p_0(x_0)}{p_n(x_n)}
-\beta\sum_{j=1}^{n}
\{E(x_j,\lambda_j)-E(x_{j-1},\lambda_j)\}\\
&=\log\frac{p_0(x_0)}{p_n(x_n)}
+\beta Q_{\mathrm{bath}}[\gamma]
=\Sigma[\gamma].
\end{aligned}
$$

第2行では各 $j$ の制御値を $\lambda_j$ に固定して局所詳細釣合いを使い、第3行では[軌道の熱](#def-itd1-path-work-heat)の符号 $Q_{\mathrm{bath}}=-\sum_jQ_j$ を使いました。逆実験の初期分布を $p_0$ のままにすると、第1項は変わり、この式にはなりません。
<!-- proof-end -->

<a id="thm-itd1-mean-entropy"></a>

[INFO2の相対エントロピー](../../../応用系/INFO/INFO2/index.md#def-info2-relative-entropy)は底2の対数を使い、bit 単位で $D(P\Vert Q)$ と書きました。本章の $\Sigma$ は自然対数による nat 単位なので、次の換算係数が必要です。

$$
\log u=(\ln2)\log_2u\qquad(u>0).
$$

<!-- formal-statement-start -->
> **定理（平均全エントロピー生成の非負性）**  
> 空でない有限状態集合、有限エネルギー、温度 $T>0$、全状態で正の初期分布 $p_0$、各核の[局所詳細釣合い](#def-itd1-local-detailed-balance)を仮定する。
> [経路確率比の定理](#thm-itd1-path-ratio)で用いた逆軌道 $\gamma^\dagger$ について、$P_{\mathrm R}^{\dagger}(\gamma):=P_{\mathrm R}(\gamma^\dagger)$ を正方向の軌道上の逆実験の分布とする。
> $\langle\Sigma\rangle$ は $P_{\mathrm F}$ による $\Sigma[\gamma]$ の平均を表す。このとき

$$
\langle\Sigma\rangle
=(\ln2)D(P_{\mathrm F}\Vert P_{\mathrm R}^{\dagger})\ge0
$$

> が成り立つ。等号成立はすべての軌道で両経路分布が一致するとき、かつそのときに限る。さらに

$$
\langle\Sigma\rangle
=H_{\mathrm{nat}}(p_n)-H_{\mathrm{nat}}(p_0)
+\beta\langle Q_{\mathrm{bath}}\rangle
$$

> である。ここで $H_{\mathrm{nat}}$ は節5の自然対数による平均系エントロピーである。
<!-- formal-statement-end -->

### 証明の見取り図

軌道反転は $X^{n+1}$ 上の一対一対応です。その対応で逆実験を引き戻すと確率分布が一つでき、経路比の平均は[相対エントロピー](../../../応用系/INFO/INFO2/index.md#def-info2-relative-entropy)を nat へ換算した値になります。

<!-- proof-start -->
### 証明

逆実験の各核は行和1なので、[軌道確率の規格化](#prop-itd1-update)と同じ計算により $\sum_{\gamma^\dagger}P_{\mathrm R}(\gamma^\dagger)=1$ です。軌道反転は全軌道を置換するので $\sum_\gamma P_{\mathrm R}^{\dagger}(\gamma)=1$ です。局所詳細釣合いの双方向支持と $p_0,p_n>0$ により、二つの経路分布は同じ正の支持を持ちます。

[経路比の定理](#thm-itd1-path-ratio)を分布 $P_{\mathrm F}$ で平均すると

$$
\begin{aligned}
\langle\Sigma\rangle
&=\sum_\gamma P_{\mathrm F}(\gamma)
\log\frac{P_{\mathrm F}(\gamma)}{P_{\mathrm R}^{\dagger}(\gamma)}\\
&=(\ln2)\sum_\gamma P_{\mathrm F}(\gamma)
\log_2\frac{P_{\mathrm F}(\gamma)}{P_{\mathrm R}^{\dagger}(\gamma)}\\
&=(\ln2)D(P_{\mathrm F}\Vert P_{\mathrm R}^{\dagger})\ge0.
\end{aligned}
$$

非負性と等号条件は、有限分布と共通支持についての[INFO2のGibbs不等式](../../../応用系/INFO/INFO2/index.md#thm-info2-gibbs)から従います。別の表示を得るには、[定義（逆実験と全エントロピー生成）](#def-itd1-reverse-entropy)を平均します。端点の周辺分布は $p_0,p_n$ なので

$$
\begin{aligned}
\sum_\gamma P_{\mathrm F}(\gamma)\log p_0(x_0)
&=\sum_xp_0(x)\log p_0(x)=-H_{\mathrm{nat}}(p_0),\\
-\sum_\gamma P_{\mathrm F}(\gamma)\log p_n(x_n)
&=-\sum_yp_n(y)\log p_n(y)=H_{\mathrm{nat}}(p_n).
\end{aligned}
$$

熱の項は線形性から $\beta\langle Q_{\mathrm{bath}}\rangle$ となり、主張の式を得ます。
<!-- proof-end -->

これは「どの軌道でも $\Sigma\ge0$」ではありません。前節の $0\to1$ の軌道は負ですが、同じ模型にある別の軌道を確率で重み付けすると平均は正になります。

### 重要な条件：初期分布に零があるとき

もし $p_0$ が一部の状態で零なら、逆実験には可能だが正方向には不可能な軌道が生じ得ます。その場合は正方向の全軌道を足すだけでは逆実験の確率を1まで回収できません。[平均の非負性](#thm-itd1-mean-entropy)は拡張した相対エントロピーの枠組みで考えられますが、本章の「全軌道で共通の正の支持を持つ」という証明をそのまま流用してはいけません。次章で扱う指数平均等式では、こうした絶対不可逆性の扱いが特に重要になります。

## 6. 演習：軌道と分布を独立に検算する

### Level A：各定義を操作する

#### A1. 遷移核と分布更新

$X=\{0,1\}$、$K=\begin{pmatrix}4/5&1/5\\2/5&3/5\end{pmatrix}$、$p_0=(1/4,3/4)$ とする。これが遷移核であることを確かめ、$p_1$ と軌道 $1\to0$ の確率を求めよ。

- Level: A
- ID: ITD1-A1

<!-- solution-start -->
**詳細解答**　すべての成分が非負で、行和は $4/5+1/5=1$、$2/5+3/5=1$ ですから[遷移核の定義](#def-itd1-controlled-model)を満たします。[分布更新](#prop-itd1-update)を成分ごとに使うと

$$
\begin{aligned}
p_1(0)&=\frac14\frac45+\frac34\frac25=\frac15+\frac3{10}=\frac12,\\
p_1(1)&=\frac14\frac15+\frac34\frac35=\frac1{20}+\frac9{20}=\frac12.
\end{aligned}
$$

合計が1です。[軌道確率](#def-itd1-path-probability)は $P_{\mathrm F}(1,0)=p_0(1)K(1,0)=(3/4)(2/5)=3/10$ です。終端分布の $p_1(0)=1/2$ は $0\to0$ の軌道も含むため、$3/10$ とは異なります。
<!-- solution-end -->

#### A2. 状態を変えない操作の仕事

$E(0,\lambda)=0$、$E(1,\lambda)=\lambda$、$\lambda_0=0$、$\lambda_1=\varepsilon>0$ とする。quench 時の状態が0または1の場合の仕事を求め、$p_0(1)=1/4$ のとき平均仕事を計算せよ。接触中のジャンプはまだ考えない。

- Level: A
- ID: ITD1-A2

<!-- solution-start -->
**詳細解答**　[仕事の定義](#def-itd1-path-work-heat)では状態を固定します。状態0なら $W=E(0,\varepsilon)-E(0,0)=0$、状態1なら $W=E(1,\varepsilon)-E(1,0)=\varepsilon$ です。平均は

$$
\langle W\rangle
=p_0(0)\cdot0+p_0(1)\cdot\varepsilon
=\frac{\varepsilon}{4}.
$$

quench では熱浴からの遷移をまだ起こしていないので、この区間の熱は0です。
<!-- solution-end -->

#### A3. 一回のジャンプの熱と浴の符号

固定した $\lambda=\varepsilon>0$ でエネルギーが $(0,\varepsilon)$ の二状態系について、$0\to1$ と $1\to0$ の各ジャンプの系への熱 $Q$ と浴への熱 $Q_{\mathrm{bath}}$ を求めよ。

- Level: A
- ID: ITD1-A3

<!-- solution-start -->
**詳細解答**　制御値を変えないので仕事は0です。[熱の定義](#def-itd1-path-work-heat)から、$0\to1$ では

$$
Q=E(1,\varepsilon)-E(0,\varepsilon)=\varepsilon,
\qquad Q_{\mathrm{bath}}=-\varepsilon.
$$

逆の $1\to0$ では

$$
Q=E(0,\varepsilon)-E(1,\varepsilon)=-\varepsilon,
\qquad Q_{\mathrm{bath}}=\varepsilon.
$$

系と浴で熱の正負を逆にしており、両者の熱を同時に正と数えていません。
<!-- solution-end -->

#### A4. 局所詳細釣合いの検査

エネルギー $(0,\varepsilon)$、$\beta\varepsilon=\log3$ のもとで、$K=\begin{pmatrix}5/6&1/6\\1/2&1/2\end{pmatrix}$ が局所詳細釣合いを満たすことを、全種類の状態対について確認せよ。

- Level: A
- ID: ITD1-A4

<!-- solution-start -->
**詳細解答**　行和は $5/6+1/6=1$、$1/2+1/2=1$ で、成分はすべて正です。非対角の比は

$$
\frac{K(0,1)}{K(1,0)}=\frac{1/6}{1/2}=\frac13
=e^{-\beta\varepsilon}.
$$

したがって対数は $-\log3=-\beta\varepsilon$ で、[局所詳細釣合い](#def-itd1-local-detailed-balance)の $0\to1$ の右辺に等しいです。逆の $1\to0$ では比が3、対数が $\log3=\beta\varepsilon$ です。$0\to0$ と $1\to1$ では比が1、エネルギー差が0なので双方とも対数は0です。すべての組を確認しました。
<!-- solution-end -->

#### A5. 状態エントロピーの端点

$p_0=(1/2,1/2)$、$K=\begin{pmatrix}3/4&1/4\\1/2&1/2\end{pmatrix}$ のとき、軌道 $0\to1$ の系の無次元エントロピー変化を求めよ。平均エントロピーの差と混同しないこと。

- Level: A
- ID: ITD1-A5

<!-- solution-start -->
**詳細解答**　まず[分布更新](#prop-itd1-update)から $p_1(1)=(1/2)(1/4)+(1/2)(1/2)=3/8$ です。軌道の系エントロピー変化は、初期・終期の**実現した状態の確率**により

$$
\Delta s_{\mathrm{sys}}[0\to1]
=-\log p_1(1)+\log p_0(0)
=\log\frac{1/2}{3/8}
=\log\frac43.
$$

平均の $H_{\mathrm{nat}}(p_1)-H_{\mathrm{nat}}(p_0)$ は全軌道で重み付けした別の量であり、一軌道の $\log(4/3)$ と等しいとは限りません。
<!-- solution-end -->

### Level B：仮定と証明を自力でつなぐ

#### B1. 任意段数の第一法則

有限集合 $X$、任意の制御列 $\lambda_0,\ldots,\lambda_n$ と軌道 $x_0,\ldots,x_n$ について、quench の仕事と接触の熱を定義から書き、$n$ に依存しない軌道第一法則を証明せよ。遷移核が零確率を持つ場合も成り立つか答えよ。

- Level: B
- ID: ITD1-B1

<!-- solution-start -->
**詳細解答**　[仕事・熱の定義](#def-itd1-path-work-heat)を各段階で使い、

$$
W_j=E(x_{j-1},\lambda_j)-E(x_{j-1},\lambda_{j-1}),\qquad
Q_j=E(x_j,\lambda_j)-E(x_{j-1},\lambda_j)
$$

です。中間のエネルギー $E(x_{j-1},\lambda_j)$ を足して

$$
W_j+Q_j=E(x_j,\lambda_j)-E(x_{j-1},\lambda_{j-1}).
$$

これを $j=1,\ldots,n$ で足すと、内部の項は隣接段階で符号が反転して打ち消し合い、

$$
\sum_{j=1}^n(W_j+Q_j)
=E(x_n,\lambda_n)-E(x_0,\lambda_0)
$$

です。遷移確率を一切使っていないため、物理的には実現しない零確率の状態列を代数的に代入しても恒等式そのものは成立します。
<!-- solution-end -->

#### B2. 正逆の経路確率比

$p_0=(1/2,1/2)$、$K=\begin{pmatrix}3/4&1/4\\1/2&1/2\end{pmatrix}$、エネルギー $(0,\varepsilon)$、$\beta\varepsilon=\log2$、制御値は一定とする。軌道 $0\to1$ について $P_{\mathrm F}$、対応する $P_{\mathrm R}$ を個別に計算し、全エントロピー生成と対数比が一致することを示せ。

- Level: B
- ID: ITD1-B2

<!-- solution-start -->
**詳細解答**　初期分布と核から、[正方向の軌道確率](#def-itd1-path-probability)は

$$
P_{\mathrm F}(0,1)=\frac12\frac14=\frac18.
$$

[分布更新](#prop-itd1-update)で $p_1(1)=3/8$ です。[逆実験の定義](#def-itd1-reverse-entropy)は $p_1$ から始まるため、逆軌道 $1\to0$ の確率は

$$
P_{\mathrm R}(1,0)=p_1(1)K(1,0)
=\frac38\frac12=\frac3{16}.
$$

ゆえに対数比は $\log[(1/8)/(3/16)]=\log(2/3)$ です。一方、浴への熱は $-\varepsilon$ なので、系の寄与と足すと

$$
\log\frac{p_0(0)}{p_1(1)}+\beta Q_{\mathrm{bath}}
=\log\frac43-\log2
=\log\frac23.
$$

両方の計算が一致します。逆過程の初期分布を $p_0$ と誤って使うと、この比較が崩れます。
<!-- solution-end -->

#### B3. 支持が欠けると指数平均が1にならない例

エネルギーがともに0の二状態系で、$p_0=(1,0)$、$K=\begin{pmatrix}3/4&1/4\\1/4&3/4\end{pmatrix}$ とする。実現可能な正方向の軌道について $\Sigma=\log(P_{\mathrm F}/P_{\mathrm R}^\dagger)$ を定める。$\langle e^{-\Sigma}\rangle$ を求め、なぜ1でないかを説明せよ。

- Level: B
- ID: ITD1-B3

<!-- solution-start -->
**詳細解答**　正方向に可能なのは $0\to0$ と $0\to1$ の二軌道で、確率はそれぞれ $3/4,1/4$ です。[分布更新](#prop-itd1-update)で $p_1=(3/4,1/4)$。逆実験は $p_1$ から始まるので

$$
\begin{aligned}
P_{\mathrm R}^\dagger(0,0)&=p_1(0)K(0,0)=\frac34\frac34=\frac9{16},\\
P_{\mathrm R}^\dagger(0,1)&=p_1(1)K(1,0)=\frac14\frac14=\frac1{16}.
\end{aligned}
$$

したがって、実現可能な軌道で指数を取れば $P_{\mathrm F}e^{-\Sigma}=P_{\mathrm R}^\dagger$ となるので

$$
\langle e^{-\Sigma}\rangle
=\frac9{16}+\frac1{16}=\frac58<1.
$$

最初に状態1を取る正方向の軌道は $p_0(1)=0$ のため不可能ですが、逆実験ではそのような軌道の反転に正の確率があります。逆経路分布の全質量のうち $3/8$ は正方向で到達できない軌道にあります。ここでは[全支持の仮定](#def-itd1-reverse-entropy)が破れており、全軌道で共通の支持を用いた証明を適用できません。
<!-- solution-end -->

#### B4. 平均エントロピー生成の検算

$p_0=(1/2,1/2)$、$K=\begin{pmatrix}3/4&1/4\\1/2&1/2\end{pmatrix}$、$\beta\varepsilon=\log2$、エネルギー $(0,\varepsilon)$、制御値一定とする。四つの軌道の $\Sigma$ と確率を列挙し、平均が正であることを有限和で確かめよ。

- Level: B
- ID: ITD1-B4

<!-- solution-start -->
**詳細解答**　終端分布は $p_1=(5/8,3/8)$ です。各軌道の確率は順に

$$
P_{\mathrm F}(0,0)=\frac38,\quad
P_{\mathrm F}(0,1)=\frac18,\quad
P_{\mathrm F}(1,0)=\frac14,\quad
P_{\mathrm F}(1,1)=\frac14.
$$

浴への熱は $0,-\varepsilon,+\varepsilon,0$ です。[全エントロピー生成](#def-itd1-reverse-entropy)の端点比と $\beta Q_{\mathrm{bath}}$ を足すと、同じ順に

$$
\begin{aligned}
\Sigma(0,0)&=\log(4/5),\\
\Sigma(0,1)&=\log(4/3)-\log2=\log(2/3),\\
\Sigma(1,0)&=\log(4/5)+\log2=\log(8/5),\\
\Sigma(1,1)&=\log(4/3).
\end{aligned}
$$

よって

$$
\langle\Sigma\rangle
=\frac38\log\frac45
+\frac18\log\frac23
+\frac14\log\frac85
+\frac14\log\frac43
=\frac18\log\frac{2^{17}}{3^3 5^5}>0.
$$

最後の正負は $2^{17}=131072>3^3 5^5=84375$ から確認できます。個々の負の $\Sigma$ は、重み付き平均が負になることを意味しません。非負性の一般的な理由は[平均エントロピー生成の定理](#thm-itd1-mean-entropy)の相対エントロピー表示です。
<!-- solution-end -->

### Level C：制御と接触を往復して全収支を調べる

#### C1. 二段階の二状態系：第一法則と経路反転を二通りで確かめる

$X=\{0,1\}$、$E(0,\lambda)=0$、$E(1,\lambda)=\lambda$、$p_0=(1/2,1/2)$、$\beta\varepsilon=\log2$ とする。次の二段階を実行する。

1. $\lambda_0=0$ から $\lambda_1=\varepsilon$ に quench し、$K_1=\begin{pmatrix}3/4&1/4\\1/2&1/2\end{pmatrix}$ で接触する。
2. $\lambda_1=\varepsilon$ から $\lambda_2=0$ に quench し、$K_2=\begin{pmatrix}3/4&1/4\\1/4&3/4\end{pmatrix}$ で接触する。

各核が局所詳細釣合いを満たすことを確かめよ。軌道 $\gamma=(1,0,1)$ について各段階の $W_j,Q_j$ と第一法則、経路確率 $P_{\mathrm F}$ と $P_{\mathrm R}^\dagger$、全エントロピー生成を二つの方法（系と浴の和、経路確率比）で求めよ。さらに平均仕事と平均熱を求め、平均の第一法則を検算せよ。

- Level: C
- ID: ITD1-C1

<!-- solution-start -->
**詳細解答**　まず $K_1$ の非対角比は $(1/4)/(1/2)=1/2=e^{-\beta\varepsilon}$、対角では比が1です。$K_2$ は $\lambda_2=0$ で二状態のエネルギー差が0、非対角比も $(1/4)/(1/4)=1=e^0$、対角比も1です。行和は両核とも1で、成分は正ですから、[局所詳細釣合い](#def-itd1-local-detailed-balance)が二段階とも成立します。

軌道 $1\to0\to1$ の第1段階は、quenchでエネルギーが0から $\varepsilon$ へ上がり、接触で0へ戻るので

$$
W_1=\varepsilon,\qquad Q_1=-\varepsilon.
$$

第2段階は状態0のまま quench し、続いて両状態ともエネルギー0の系で接触するので

$$
W_2=0,\qquad Q_2=0.
$$

始点と終点のエネルギーはいずれも0で、$\Delta E=0=W_1+W_2+Q_1+Q_2$ と[軌道第一法則](#thm-itd1-first-law)を確認できます。

次に[分布更新](#prop-itd1-update)を行います。第1段階は $p_1=(5/8,3/8)$ です。第2段階では

$$
\begin{aligned}
p_2(0)&=\frac58\frac34+\frac38\frac14=\frac{18}{32}=\frac9{16},\\
p_2(1)&=\frac58\frac14+\frac38\frac34=\frac{14}{32}=\frac7{16}.
\end{aligned}
$$

よって正方向と逆方向の当該軌道確率は

$$
\begin{aligned}
P_{\mathrm F}(1,0,1)&=p_0(1)K_1(1,0)K_2(0,1)
=\frac12\frac12\frac14=\frac1{16},\\
P_{\mathrm R}(1,0,1)&=p_2(1)K_2(1,0)K_1(0,1)
=\frac7{16}\frac14\frac14=\frac7{256}.
\end{aligned}
$$

浴への全熱は $Q_{\mathrm{bath}}=\varepsilon$ です。[定義（逆実験と全エントロピー生成）](#def-itd1-reverse-entropy)からの第一の計算は

$$
\Sigma=\log\frac{p_0(1)}{p_2(1)}+\beta\varepsilon
=\log\frac87+\log2
=\log\frac{16}{7}.
$$

[経路比の定理](#thm-itd1-path-ratio)からの第二の計算は

$$
\Sigma=\log\frac{P_{\mathrm F}(1,0,1)}
{P_{\mathrm R}(1,0,1)}
=\log\frac{1/16}{7/256}
=\log\frac{16}{7}.
$$

両方が一致します。逆軌道は文字列としても $(1,0,1)$ ですが、**逆実験の核は逆順**であり、確率の各因子は正方向とは異なります。

最後に平均収支を別途確かめます。第1 quench の仕事は $\varepsilon x_0$、第2 quench の仕事は $-\varepsilon x_1$ です。接触第1段階の熱は $\varepsilon(x_1-x_0)$、第2段階の熱は0です。したがって

$$
\begin{aligned}
\langle W\rangle
&=\varepsilon\{\Pr(x_0=1)-\Pr(x_1=1)\}
=\varepsilon\left(\frac12-\frac38\right)=\frac{\varepsilon}{8},\\
\langle Q\rangle
&=\varepsilon\{\Pr(x_1=1)-\Pr(x_0=1)\}
=-\frac{\varepsilon}{8}.
\end{aligned}
$$

初期・最終のHamiltonianはいずれも全状態で0なので、平均エネルギー変化は0です。ゆえに

$$
\langle\Delta E\rangle=0
=\langle W\rangle+\langle Q\rangle
=\frac{\varepsilon}{8}-\frac{\varepsilon}{8}.
$$

これは単一軌道の検算と独立な、初期・終端の分布による平均収支の検算です。
<!-- solution-end -->

## 7. ここから先の問い

本章では「仕事は準位の変化、熱は固定準位での状態ジャンプ」という区別により、確率的な軌道で第一法則を成立させました。単一熱浴の局所詳細釣合いを仮定すれば、正逆の軌道確率比は系と浴のエントロピー生成に一致し、平均は相対エントロピーとして非負になります。

次に問うべきは、平均の非負性より強い制約です。経路比の指数を取って**全軌道で和を取る**と何が得られ、初期分布が平衡のとき仕事と自由エネルギーをどう結び付けられるのでしょうか。さらに、正逆の支持が一致しないときの補正をどう扱うのでしょうか。これが時間反転とゆらぎ関係を学ぶ次の入口になります。
