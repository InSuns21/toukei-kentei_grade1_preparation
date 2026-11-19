# BHI3 逐次対生成と放射の混合化

## 1. 一度の「熱的な放出」を繰り返すと、何が言えるか

[BHI2の有限次元内外対模型](../BHI2/index.md#def-bhi2-pair)では、外部モード $O$ と内部モード $I$ の全体を純粋な二量子ビット対にしても、外部の縮約は混合状態になりました。しかし、**一個の外部モードが混合していること**は、**蒸発後の放射全体が混合していること**と同じではありません。複数時刻の放出を一つの状態として記述しなければ、情報損失の論理には進めません。

今回は二準位対を各ステップで一組ずつ加えます。いくつもの対を互いに独立に作るという強い仮定をまず固定し、放射エントロピーの増加を計算します。次にその仮定を外した例を実際に作り、どこまでが模型内の定理かを区別します。半古典的なHawking波束の温度・流束の場の理論的導出は[QCURV21の後期波束の計算](../../QCURV/QCURV21/index.md#prop-qcurv21-hawking-chain)にあり、本講の二量子ビット列はそれを導き直す模型ではありません。

必要な量子情報の道具は、[QINF3の部分トレース](../../../応用系/QINF/QINF3/index.md#def-qinf3-partial-trace)、[QINF17のvon Neumannエントロピー](../../../応用系/QINF/QINF17/index.md#def-qinf17-entropy)、[QINF17のテンソル積加法性](../../../応用系/QINF/QINF17/index.md#prop-qinf17-tensor)です。QINF17の定義は底2の対数（単位 bit）ですが、本講は自然対数（単位 nat）を用います。同じ密度演算子の固有値に対し $S_{\mathrm{nat}}(\rho)=(\ln2)S_{\mathrm{bit}}(\rho)$ で換算でき、テンソル積加法性もこの定数倍の下で成立します。零固有値については $0\ln0=0$ とします。

## 2. 放出ステップごとの系を曖昧にしない

まず一度に作る純粋対は[BHI2の対](../BHI2/index.md#def-bhi2-pair)と同じ形です。ステップ $j$ の外部を $O_j$、内部を $I_j$ とし、番号は物理的な位置でなく**作成順序**を表します。$k$ 回までに外へ出たモードの全体を $R_k$、残存側を $B_k$ と書きます。この節の $B_k$ は内部モードをすべて集めた人工的な系であり、質量が減少する実在ブラックホールの状態空間を同定したものではありません。

<a id="def-bhi3-independent-pairs"></a>

<!-- formal-statement-start -->
> **定義（独立な逐次内外対生成模型）**
>
> 整数 $N\ge1$、各 $j=1,\ldots,N$ に $0\le p_j\le1$、$\phi_j\in\mathbb R$ を固定する。各 $O_j,I_j$ は $\mathbb C^2$ とし、有限次元の初期記憶系 $B_0$ は固定された純粋状態 $|\chi\rangle$ にあるとする。各ステップで新しい二量子ビット対
>
$$
|\psi_j\rangle=\sqrt{1-p_j}|0\rangle_{O_j}|0\rangle_{I_j}
+e^{i\phi_j}\sqrt{p_j}|1\rangle_{O_j}|1\rangle_{I_j}
$$

> を**以前のすべての系と直積で**作り、$k$ 回後の全状態を

$$
|\Omega_k\rangle
=|\chi\rangle_{B_0}\otimes\bigotimes_{j=1}^{k}|\psi_j\rangle_{O_jI_j}
$$

> とする。これを独立な逐次内外対生成模型という。系の分割を

$$
R_k=O_1\cdots O_k,\qquad
B_k=B_0I_1\cdots I_k
$$

> とする。$R_0$ は自明な一次元系とする。全状態は規格化された純粋状態で、初期の記憶系と放射には初期相関がない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi3-independent-pairs -->
**定義の確認**：二ステップで直接確認します。 $B_0$ を一次元、$N=2$、$p_1=p_2=1/2$、$\phi_1=\phi_2=0$ とすると、各対は $(|00\rangle+|11\rangle)/\sqrt2$ です。従って

$$
|\Omega_2\rangle
=\frac12\bigl(
|00\rangle_{O_1I_1}|00\rangle_{O_2I_2}
+|00\rangle_{O_1I_1}|11\rangle_{O_2I_2}
+|11\rangle_{O_1I_1}|00\rangle_{O_2I_2}
+|11\rangle_{O_1I_1}|11\rangle_{O_2I_2}
\bigr).
$$

四つの直交項の振幅の二乗和は $4(1/2)^2=1$。二つの対には**振幅の積**として係数 $1/2$ が現れ、同じ $j$ の $O_j,I_j$ だけが対応する。$\dim\mathcal H_{R_2}=4$、$\dim\mathcal H_{B_2}=4$ で、全状態はこの $4\times4$ の分割について純粋です。時間ラベルを付けても、内部の自由度は捨てていません。
<!-- definition-example-end -->

この定義で $\bigotimes$ は異なる対の**相関がない**ことを追加で課します。各外部モードの密度行列を個別に指定するだけでは、対間の直積性は従いません。実際の時空では重力・再散乱・新旧モードの相関・放射への再符号化などを無視しています。

また「二準位の外部縮約が混合状態」と「正温度のGibbs状態」を区別します。[BHI2の二準位Gibbs表示](../BHI2/index.md#prop-bhi2-gibbs)と同様に、$\omega_j>0$ のハミルトニアン $H_{O_j}=\omega_j|1\rangle\langle1|$ を用いると、$0<p_j<1/2$ のときだけ正の逆温度 $\beta_j$ を選んで

$$
\beta_j\omega_j=\ln\frac{1-p_j}{p_j}>0
$$

と表せます。$p_j=1/2$ は $\beta_j=0$ の極限であり、$p_j>1/2$ はこのハミルトニアンに対する正温度Gibbs状態ではありません。本講のエントロピー定理は熱的な解釈を仮定せず、すべての $0\le p_j\le1$ について成り立ちます。

放出ごとに何を観測するかも固定します。各時刻の放射はそこまでの**全**外部モードであり、「最新の一モード」だけではありません。

<a id="def-bhi3-radiation-history"></a>

<!-- formal-statement-start -->
> **定義（逐次模型の放射履歴）**
>
> [独立な逐次内外対生成模型](#def-bhi3-independent-pairs)の第 $k$ ステップで、放射縮約とその精細エントロピーを

$$
\rho_{R_k}=\operatorname{Tr}_{B_k}
|\Omega_k\rangle\langle\Omega_k|,
\qquad
S(R_k)=-\operatorname{Tr}(\rho_{R_k}\ln\rho_{R_k})
$$

> と定める。初期値は $S(R_0)=0$ とし、履歴は $(S(R_0),\ldots,S(R_N))$ である。これは各時刻の放射**全体**の状態に対する量であり、各モードの熱的エントロピーを足すという定義ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi3-radiation-history -->
**定義の確認**：二対の最大エンタングル状態を用います。各対の射影 $|\psi_j\rangle\langle\psi_j|$ の交差項 $|00\rangle\langle11|$ と $|11\rangle\langle00|$ は、内部基底の直交性 $\langle0|1\rangle=0$ により部分トレースで消えます。したがって各 $O_j$ の縮約は

$$
\sigma_j=\operatorname{Tr}_{I_j}|\psi_j\rangle\langle\psi_j|
=\frac12|0\rangle\langle0|+\frac12|1\rangle\langle1|
=\frac{I_2}{2}.
$$

第1ステップの放射は $R_1=O_1$、第2ステップの放射は $R_2=O_1O_2$ です。二つの対が直積なので、[部分トレースの積への作用](../../../応用系/QINF/QINF3/index.md#prop-qinf3-state-product)から

$$
\rho_{R_0}=(1),\qquad
\rho_{R_1}=\sigma_1=\frac{I_2}{2},\qquad
\rho_{R_2}=\sigma_1\otimes\sigma_2=\frac{I_4}{4}
$$

となります。いずれも正半定値・跡1で、固有値は順に $(1)$、$(1/2,1/2)$、$(1/4,1/4,1/4,1/4)$ です。各固有値を放射履歴の定義に代入すると $(S(R_0),S(R_1),S(R_2))=(0,\ln2,2\ln2)$ を得ます。ここで行列は $R_k$ の占有基底で表示しており、最終行列 $I_4/4$ は内部を含む全状態の密度行列ではありません。
<!-- definition-example-end -->

## 3. 独立対から放射の全密度行列を計算する

ステップ $j$ の二準位縮約を $\sigma_j$ と書きます。[BHI2の縮約命題](../BHI2/index.md#prop-bhi2-reduction)が扱うのは $0<p_j<1$ の場合です。本講では端点 $p_j=0,1$ も使うため、[QINF3の部分トレースの定義](../../../応用系/QINF/QINF3/index.md#def-qinf3-partial-trace)に戻って全範囲を確認します。$|ab\rangle=|a\rangle_{O_j}|b\rangle_{I_j}$ と表すと、内部の占有基底で

$$
\operatorname{Tr}_{I_j}(|ab\rangle\langle cd|)
=\langle d|b\rangle\,|a\rangle\langle c|
=\delta_{bd}|a\rangle\langle c|
$$

です。対の射影を展開すると

$$
\begin{aligned}
|\psi_j\rangle\langle\psi_j|
={}&(1-p_j)|00\rangle\langle00|+p_j|11\rangle\langle11|\\
&+\sqrt{p_j(1-p_j)}
\bigl(e^{-i\phi_j}|00\rangle\langle11|
+e^{i\phi_j}|11\rangle\langle00|\bigr).
\end{aligned}
$$

交差項では内部添字が異なるため消え、従って

$$
\sigma_j
=\operatorname{Tr}_{I_j}|\psi_j\rangle\langle\psi_j|
=(1-p_j)|0\rangle\langle0|+p_j|1\rangle\langle1|
$$

となります。係数の平方根は端点でも定義され、$p_j=0,1$ なら片方の基底射影だけが残ります。この計算によって全 $0\le p_j\le1$ で縮約が正半定値・跡1であり、位相 $\phi_j$ が消えることを直接確かめました。複数対では、さらに[QINF3の積に対する部分トレース](../../../応用系/QINF/QINF3/index.md#prop-qinf3-state-product)を用います。

<a id="prop-bhi3-radiation-spectrum"></a>

<!-- formal-statement-start -->
> **命題（独立逐次対の放射縮約と固有値）**
>
> $N\ge1$ の[独立な逐次内外対生成模型](#def-bhi3-independent-pairs)について、任意の $1\le k\le N$ で

$$
\rho_{R_k}
=\bigotimes_{j=1}^{k}
\begin{pmatrix}
1-p_j&0\\0&p_j
\end{pmatrix}
$$

> が成立する。$R_k$ の占有基底 $|x_1\cdots x_k\rangle$（各 $x_j\in\{0,1\}$）に対応する固有値は

$$
\lambda_{x_1\cdots x_k}
=\prod_{j=1}^{k}(1-p_j)^{1-x_j}p_j^{x_j}
$$

> である。ただし $0^0$ の形式は生じさせず、各因子を $x_j=0$ なら $1-p_j$、$x_j=1$ なら $p_j$ と読む。固有値は非負で全 $2^k$ 個の和は1であり、位相に依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

全状態の密度演算子を対ごとの射影のテンソル積にし、まず固定記憶系 $B_0$、次に各 $I_j$ の跡を取ります。残った対角行列のテンソル積を、占有文字列ごとに評価します。

<!-- proof-start -->
### 証明

全状態が直積なので密度演算子は

$$
|\Omega_k\rangle\langle\Omega_k|
=|\chi\rangle\langle\chi|_{B_0}
\otimes\bigotimes_{j=1}^{k}|\psi_j\rangle\langle\psi_j|.
$$

まず $R_k=O_1\cdots O_k$、$B_k=B_0I_1\cdots I_k$ の順にテンソル因子を並べ替えます。これは有限次元の積基底を並べ替えるユニタリな同一視であり、状態や跡の値を変えません。$\operatorname{Tr}_{B_0}|\chi\rangle\langle\chi|=1$ と、[QINF3の三部系の逐次部分トレース](../../../応用系/QINF/QINF3/index.md#prop-qinf3-iterated)および[積に対する部分トレース](../../../応用系/QINF/QINF3/index.md#prop-qinf3-state-product)を各対に適用すると

$$
\begin{aligned}
\rho_{R_k}
&=\operatorname{Tr}_{I_1\cdots I_k}
\bigotimes_{j=1}^{k}|\psi_j\rangle\langle\psi_j|\\
&=\bigotimes_{j=1}^{k}
\operatorname{Tr}_{I_j}|\psi_j\rangle\langle\psi_j|
=\bigotimes_{j=1}^{k}\sigma_j.
\end{aligned}
$$

$\sigma_j$ の占有基底での固有値は $1-p_j,p_j$ です。テンソル積行列が $|x_1\cdots x_k\rangle$ に作用すると各因子が固有値を掛けるので、提示した積を得ます。非負性は $0\le p_j\le1$ から従い、全固有値の和は

$$
\sum_{x_1,\ldots,x_k\in\{0,1\}}\lambda_{x_1\cdots x_k}
=\prod_{j=1}^{k}\big((1-p_j)+p_j\big)=1.
$$

$\phi_j$ は $\sigma_j$ に現れないため、全固有値にも現れません。
<!-- proof-end -->

**異なる重みの例。** $p_1=1/2,p_2=1/4$ とすれば、占有順 $00,01,10,11$ について

$$
\rho_{R_2}
=\operatorname{diag}(3/8,1/8,3/8,1/8).
$$

四成分はすべて非負で和1です。これは二つのモードの重みが一致しなくても直積性があれば全縮約を求められることを示しています。

## 4. 増加を計算し、「線形」の条件を言い分ける

一対の二値エントロピー関数を

$$
h(p)=-(1-p)\ln(1-p)-p\ln p,\qquad 0\le p\le1
$$

と書きます。$0<p<1$ では[BHI2の一対のエントロピー](../BHI2/index.md#prop-bhi2-reduction)と一致し、端点は $0\ln0=0$ の規約で定めます。従って $h(0)=h(1)=0$、$h(1/2)=\ln2$ です。全系にとって放射の「増分」は新しい一モードのエントロピーと同じとは限りませんが、直積対模型では一致します。

<a id="thm-bhi3-entropy-growth"></a>

<!-- formal-statement-start -->
> **定理（独立対生成のエントロピー増加式と線形増大条件）**
>
> $N\ge1$、$0\le p_j\le1$ の[独立な逐次内外対生成模型](#def-bhi3-independent-pairs)で、$k=0,\ldots,N$ について

$$
S(R_k)=\sum_{j=1}^{k}h(p_j),\qquad
S(R_k)-S(R_{k-1})=h(p_k)\ge0
$$

> が成り立つ（$k=0$ の和は0、第2式は $k\ge1$）。特に $p_j=p$ がすべてのステップで一定なら $S(R_k)=kh(p)$ と**厳密に線形**である。一般の重みでは非減少だが線形とは限らない。さらに

$$
0\le S(R_k)\le k\ln2
$$

> であり、上側の等号は $p_1=\cdots=p_k=1/2$ のときかつそのときに限り、下側の等号は各 $p_j\in\{0,1\}$ のときかつそのときに限る。
<!-- formal-statement-end -->

### 証明の見取り図

先の[放射縮約の積表示](#prop-bhi3-radiation-spectrum)と既習のエントロピー加法性が核心です。二値関数が $0$ から $\ln2$ の間にあることは導関数と端点で直接確認します。

<!-- proof-start -->
### 証明

[放射縮約の積表示](#prop-bhi3-radiation-spectrum)で $\rho_{R_k}=\sigma_1\otimes\cdots\otimes\sigma_k$ です。[QINF17のテンソル積加法性](../../../応用系/QINF/QINF17/index.md#prop-qinf17-tensor)を、各 $\sigma_j$ が有限次元の密度演算子であることを確認して適用すると

$$
S(R_k)=\sum_{j=1}^{k}S(\sigma_j).
$$

$\sigma_j$ の固有値は $(1-p_j,p_j)$ なので[QINF17のエントロピーの定義](../../../応用系/QINF/QINF17/index.md#def-qinf17-entropy)から $S(\sigma_j)=h(p_j)$ です。$k$ と $k-1$ の和を差し引けば $S(R_k)-S(R_{k-1})=h(p_k)$。

$0<p<1$ では

$$
h'(p)=\ln(1-p)-\ln p,\qquad
h''(p)=-\frac{1}{1-p}-\frac{1}{p}<0.
$$

従って唯一の内部極大は $p=1/2$ で、その値は $\ln2$。端点では $h(0)=h(1)=0$、内部では二項とも正なので $h(p)>0$ です。この上下限を $k$ 個足せば不等式を得ます。各項が非負なので上側等号には各項が $\ln2$、下側等号には各項が0であることが必要十分です。

$p_j=p$ なら和は $kh(p)$ です。対照的に $p_1=0,p_2=1/2$ なら履歴は $0,0,\ln2$ であり、一定の傾きの直線ではありません。
<!-- proof-end -->

この定理で保証されるのは「新しい対が**前の放射も内部も含めた全系から独立**」という有限次元模型の結論です。$0<p<1$ の新規放出が続く限り、放射の精細エントロピーは増加します。しかし「一モードのスペクトルが熱的」と観測するだけでは、放出が独立であることは言えません。

時間 $t$ に対する直線性も主張していません。$k$ は放出の**個数**であり、$k(t)$ が一定速度で増えることも、各 $p_k$ が一定であることも、重力・エネルギー保存に関する仮定なしには従いません。

## 5. 新しい対が純粋だという仮定はどれほど強いか

「新しい外部と内部は純粋な二部対である。ただし前の放射とも相関を持つかもしれない」と考えたくなります。ところが新しい対 $O_kI_k$ の**縮約そのものが厳密に純粋**なら、その対が他の系と相関を持つことはできません。[QINF3の純粋縮約と積性の定理](../../../応用系/QINF/QINF3/index.md#thm-qinf3-product-pure)は**全系も純粋**な場合の結果です。以下では全系 $\rho_{EOI}$ が混合でもよい、より一般の主張を正値性から直接証明します。

<a id="prop-bhi3-pure-pair-rigidity"></a>

<!-- formal-statement-start -->
> **命題（純粋な新規対の厳密な因数分解）**
>
> 有限次元の $E\otimes O\otimes I$ 上の任意の密度演算子 $\rho_{EOI}$ で、$\rho_{OI}=\operatorname{Tr}_E\rho_{EOI}$ が階数1の純粋状態 $|\psi\rangle\langle\psi|_{OI}$ なら、ある密度演算子 $\tau_E$ が存在し、

$$
\rho_{EOI}=\tau_E\otimes|\psi\rangle\langle\psi|_{OI}
$$

> が成り立つ。したがって各ステップの新規対の全縮約を厳密な純粋対とし、以前の系を保持するなら、その新規対と以前の系の間には相関を置けない。
<!-- formal-statement-end -->

### 証明の見取り図

$OI$ で $|\psi\rangle$ と直交するベクトルへの確率が0なら、正の密度演算子はその直交方向に支持を持てません。残るのは $E\otimes\operatorname{span}\{|\psi\rangle\}$ だけです。これが以前の系からの因数分解を強制します。

<!-- proof-start -->
### 証明

$P=|\psi\rangle\langle\psi|$、$Q=I_{OI}-P$ と置きます。$\rho_{OI}=P$ より

$$
\operatorname{Tr}\bigl[\rho_{EOI}(I_E\otimes Q)\bigr]
=\operatorname{Tr}(\rho_{OI}Q)=\operatorname{Tr}(PQ)=0.
$$

$\rho_{EOI}\ge0$ と $I_E\otimes Q\ge0$ なので、$\rho_{EOI}$ の平方根を用いると

$$
\operatorname{Tr}\bigl[\rho_{EOI}^{1/2}(I_E\otimes Q)\rho_{EOI}^{1/2}\bigr]=0.
$$

$Q$ は直交射影で $Q^2=Q=Q^\dagger$ だから、被トレース作用素は

$$
\rho_{EOI}^{1/2}(I_E\otimes Q)\rho_{EOI}^{1/2}
=\bigl((I_E\otimes Q)\rho_{EOI}^{1/2}\bigr)^\dagger
\bigl((I_E\otimes Q)\rho_{EOI}^{1/2}\bigr)
$$

と表せます。その跡が0なので各列のノルムの二乗和が0、従って $(I_E\otimes Q)\rho_{EOI}^{1/2}=0$ です。よって $\rho_{EOI}$ の支持は $E\otimes\operatorname{span}\{|\psi\rangle\}$ に含まれます。

$E$ の正規直交基底を $|a\rangle$ として、支持上の行列要素を $t_{ab}$ と書けば

$$
\rho_{EOI}
=\sum_{a,b}t_{ab}|a\rangle\langle b|_E\otimes|\psi\rangle\langle\psi|_{OI}
=\tau_E\otimes P.
$$

正値性・跡1は $\rho_{EOI}$ から $\tau_E$ に引き継がれます。$E$ を第 $k$ ステップ前の全系とすれば、今回の純粋対はそれと因数分解します。
<!-- proof-end -->

**仮定を変えたとき。** 新規対 $OI$ の縮約が混合ならこの証明の $Q$ の期待値が0とは限らず、直交方向の支持を除外できません。また、**外側 $O$ だけ**が混合という情報から $OI$ が純粋であるとは推論できません。この違いが、放射の長期相関を考える際の入口です。

## 6. 局所的には同じ混合状態でも、全放射は純粋になれる

次に放射の各一モードがどちらも $I_2/2$ でも、全放射が混合とは限らない例を作ります。この反例は[QINF33の段階的SWAP放出模型](../../../応用系/QINF/QINF33/index.md#def-qinf33-swap-emission)と同じ種類の情報移送です。ここでは演算の前後を二量子ビットで具体的に追います。

<a id="prop-bhi3-local-global-nonmonotone"></a>

<!-- formal-statement-start -->
> **命題（局所混合と放射全体の非単調性）**
>
> $O_1,M,O_2$ をそれぞれ二量子ビット系とし、第1ステップ後に

$$
|\Phi_1\rangle
=\frac{|0\rangle_{O_1}|0\rangle_M+|1\rangle_{O_1}|1\rangle_M}{\sqrt2}
\otimes|0\rangle_{O_2}
$$

> が成り立つとする。第2ステップで記憶系 $M$ と空の $O_2$ の状態を交換するユニタリ SWAP を作用させれば、

$$
|\Phi_2\rangle
=\frac{|00\rangle_{O_1O_2}+|11\rangle_{O_1O_2}}{\sqrt2}
\otimes|0\rangle_M.
$$

> この過程では $S(R_0)=0$、$S(R_1)=\ln2$、$S(R_2)=0$（$R_1=O_1,R_2=O_1O_2$）である一方、最終的な各単一モード $O_1,O_2$ の縮約はともに $I_2/2$ である。
<!-- formal-statement-end -->

### 証明の見取り図

交換は $|m\rangle_M|0\rangle_{O_2}$ を $|0\rangle_M|m\rangle_{O_2}$ へ移すだけです。第1時刻には $O_1$ の純化相手が記憶系、第2時刻には $O_2$ へ変わるため、放射全体の純粋性が回復します。

<!-- proof-start -->
### 証明

$|0\rangle_M|0\rangle_{O_2}$ と $|1\rangle_M|0\rangle_{O_2}$ に SWAP を作用させると、順に $|0\rangle_M|0\rangle_{O_2}$、$|0\rangle_M|1\rangle_{O_2}$ です。従って提示された $|\Phi_2\rangle$ になることが分かります。

第1時刻の $O_1$ の縮約は、$M$ の $|0\rangle,|1\rangle$ の直交性により

$$
\rho_{R_1}=\frac12|0\rangle\langle0|+\frac12|1\rangle\langle1|
=\frac{I_2}{2}.
$$

固有値 $(1/2,1/2)$ から $S(R_1)=\ln2$ です。第2時刻は $R_2=O_1O_2$ の状態が規格化ベクトルへの射影なので、固有値は $(1,0,0,0)$、従って $S(R_2)=0$。一方 $R_2$ のどちらか一方を跡で消すと交差項が消え、両方の一モード縮約は $I_2/2$ です。初期に放射はないので $S(R_0)=0$ です。
<!-- proof-end -->

この二つの履歴を比べてください。

| 模型 | $S(R_0)$ | $S(R_1)$ | $S(R_2)$ | 第2ステップの決定的違い |
| --- | ---: | ---: | ---: | --- |
| 独立な二つの最大対 | $0$ | $\ln2$ | $2\ln2$ | $O_2I_2$ が以前の系と直積 |
| 記憶から放射へのSWAP | $0$ | $\ln2$ | $0$ | $O_2$ は既存の $O_1$ と相関 |

どちらの模型でも一個ずつの外部縮約は最大混合です。差は各時刻の**全**放射の相関にあります。後者では新しい $O_2$ と内部の新規純粋対を作るという前提を満たさないため、[増加定理](#thm-bhi3-entropy-growth)の反例にはなりません。これは**増加定理を適用できない条件の反例**です。

## 7. 増え続けるエントロピーは、いつ情報問題になるか

独立対生成を $N$ 回続け、ある $0<p_j<1$ があれば、[増加定理](#thm-bhi3-entropy-growth)から $S(R_N)>0$ です。しかし全状態 $R_NB_N$ は純粋で、内部 $I_1,\ldots,I_N$ は依然として残っています。この段階で「全体のユニタリ性が破れた」と結論するのは誤りです。

[BHI1の蒸発終期の純粋性制約](../BHI1/index.md#thm-bhi1-endpoint-purity)を適用するには、**最終的な物理出力が放射だけであり、閉じた系が純粋入力から等長的に発展し、観測不能な残存系・環境がない**という追加仮定が必要です。その場合 $S(R_{\rm final})=0$ でなければなりません。独立対生成の $S(R_N)>0$ と合わせると、これらの仮定を**同時には維持できない**ことが分かります。

どの仮定を変更すべきかは本講だけでは決められません。逐次対が厳密に独立であるという仮定、新規対の純粋性、時空の分割、蒸発終期に残存系がないという仮定、近似の適用範囲がそれぞれ別の論点です。特に、熱的な局所スペクトルだけから放射全体の精細エントロピーの単調性は証明できません。

## 8. 演習と詳細解答

### Level A：状態と縮約を自分で計算する

<a id="ex-bhi3-a01"></a>
#### BHI3-A01 二つの最大対を追う
- Level: A

$B_0$ は一次元、$p_1=p_2=1/2$、$\phi_1=\phi_2=0$ の[独立な逐次対生成模型](#def-bhi3-independent-pairs)で、$\rho_{R_1},\rho_{R_2}$ の行列と $S(R_0),S(R_1),S(R_2)$ を求めよ。

<!-- solution-start -->
**詳細解答**

各対の内部をトレースすると $\sigma_1=\sigma_2=\operatorname{diag}(1/2,1/2)$ です。[QINF3の積への部分トレース](../../../応用系/QINF/QINF3/index.md#prop-qinf3-state-product)を適用すると

$$
\rho_{R_1}=\begin{pmatrix}1/2&0\\0&1/2\end{pmatrix},
\qquad
\rho_{R_2}=\sigma_1\otimes\sigma_2
=\frac14\begin{pmatrix}1&0&0&0\\0&1&0&0\\0&0&1&0\\0&0&0&1\end{pmatrix}.
$$

固有値から $S(R_1)=-2(1/2)\ln(1/2)=\ln2$、$S(R_2)=-4(1/4)\ln(1/4)=2\ln2$。初期放射は一次元純粋なので $S(R_0)=0$ です。内部は二対とも残っています。
<!-- solution-end -->

<a id="ex-bhi3-a02"></a>
#### BHI3-A02 重みの異なる二対
- Level: A

$N=2,p_1=1/2,p_2=1/4$ とする。順序 $00,01,10,11$ で $\rho_{R_2}$ の固有値を挙げ、$S(R_2)$ を自然対数で表せ。$\phi_1,\phi_2$ の値は任意でよい。

<!-- solution-start -->
**詳細解答**

第1対の縮約は $\sigma_1=\operatorname{diag}(1/2,1/2)$、第2対は $\sigma_2=\operatorname{diag}(3/4,1/4)$。積の四成分は順に

$$
\frac12\frac34=\frac38,\quad
\frac12\frac14=\frac18,\quad
\frac12\frac34=\frac38,\quad
\frac12\frac14=\frac18.
$$

和は $2(3/8)+2(1/8)=1$。エントロピーは

$$
\begin{aligned}
S(R_2)
&=-2\left(\frac38\ln\frac38+\frac18\ln\frac18\right)\\
&=\ln2-\frac34\ln\frac34-\frac14\ln\frac14\\
&=\ln2+h(1/4)=3\ln2-\frac34\ln3.
\end{aligned}
$$

位相は一対をトレースしたときの交差項とともに消えるため、固有値には影響しません。
<!-- solution-end -->

<a id="ex-bhi3-a03"></a>
#### BHI3-A03 対の端点と階数
- Level: A

$N=3$ とし、$(p_1,p_2,p_3)=(0,1/2,1)$ とする。$S(R_k)$ の全履歴、$\rho_{R_3}$ の非零固有値の数、および第1・第3対の性質を答えよ。

<!-- solution-start -->
**詳細解答**

$h(0)=h(1)=0$、$h(1/2)=\ln2$ だから、[増加定理](#thm-bhi3-entropy-growth)の和を $k=0,1,2,3$ に適用すると

$$
(S(R_0),S(R_1),S(R_2),S(R_3))=(0,0,\ln2,\ln2).
$$

各対の外部縮約固有値は順に $(1,0)$、$(1/2,1/2)$、$(0,1)$ です。テンソル積の固有値は各成分の積であり、非零なのは第1対の0、第2対の0または1、第3対の1を選ぶ二通りだけで、ともに $1/2$。従って階数は2です。第1・第3対はそれぞれ $|00\rangle$、位相因子を除いた $|11\rangle$ の積状態で、もつれを作りません。
<!-- solution-end -->

<a id="ex-bhi3-a04"></a>
#### BHI3-A04 位相の消失と共同観測
- Level: A

一対の $p=1/2,\phi=\pi/2$ を用いる独立模型で、外部縮約 $\rho_O$ と $\langle X_O\otimes X_I\rangle$ を求めよ。同じ対の $\phi=0$ の場合と比較せよ。

<!-- solution-start -->
**詳細解答**

[内外対の縮約・位相相関](../BHI2/index.md#prop-bhi2-reduction)に $p=1/2$ を代入すると、どちらの位相でも $\rho_O=I_2/2$。共同相関は

$$
\langle X_O\otimes X_I\rangle
=2\sqrt{(1/2)(1/2)}\cos\phi=\cos\phi.
$$

$\phi=\pi/2$ では0、$\phi=0$ では1です。外部だけのエントロピーは両方 $\ln2$ ですが、内外を同時に測ると位相の違いを検出できます。
<!-- solution-end -->

### Level B：仮定と非自明な結論を切り分ける

<a id="ex-bhi3-b01"></a>
#### BHI3-B01 一般のステップ数で帰納計算
- Level: B

全 $j$ で $0<p_j<1$ の独立対模型を考える。$k$ ステップの $\rho_{R_k}$ の固有値積表示と、$\operatorname{rank}(\rho_{R_k})=2^k$ を数学的帰納法で確かめ、$S(R_k)=\sum_{j=1}^k h(p_j)$ を示せ。

<!-- solution-start -->
**詳細解答**

$k=1$ では内部をトレースした $\rho_{R_1}=\operatorname{diag}(1-p_1,p_1)$ から積表示が成り立ち、両固有値は正なので階数は2です。

$k-1$ で全 $2^{k-1}$ 個の固有値 $\lambda_{x_1\cdots x_{k-1}}>0$ を得ていると仮定します。新対は既存系と直積なので

$$
\rho_{R_k}=\rho_{R_{k-1}}\otimes\operatorname{diag}(1-p_k,p_k).
$$

従って各既存固有値から $\lambda_{x_1\cdots x_{k-1}}(1-p_k)$ と $\lambda_{x_1\cdots x_{k-1}}p_k$ の二個が生じ、いずれも正です。階数は $2\cdot2^{k-1}=2^k$、固有値積表示が帰納的に成立します。

[QINF17のエントロピー加法性](../../../応用系/QINF/QINF17/index.md#prop-qinf17-tensor)を一段ずつ用いると

$$
S(R_k)=S(R_{k-1})+h(p_k).
$$

初期 $S(R_0)=0$ から和を反復して結論を得ます。$p_j=0,1$ を許すと正の固有値が二個とは限らないので、階数の等式には内部点仮定が必要です。
<!-- solution-end -->

<a id="ex-bhi3-b02"></a>
#### BHI3-B02 同一の一モード縮約から異なる全放射
- Level: B

二放射モード $O_1,O_2$ の全状態として、$\rho^{(a)}=I_4/4$ と $\rho^{(b)}=|\Phi^+\rangle\langle\Phi^+|$、$|\Phi^+\rangle=(|00\rangle+|11\rangle)/\sqrt2$ を比較する。各一モード縮約と $S(O_1O_2)$ を両者について求め、一モードの縮約が混合状態であることだけから、全放射について何が言えないか述べよ。

<!-- solution-start -->
**詳細解答**

(a) は $\rho^{(a)}=(I_2/2)\otimes(I_2/2)$ なので、$O_2$ の跡を取ると $(I_2/2)\operatorname{Tr}(I_2/2)=I_2/2$、$O_1$ でも同じです。四固有値が $1/4$ なので $S^{(a)}(O_1O_2)=\ln4=2\ln2$。

(b) は

$$
\rho^{(b)}
=\frac12\bigl(|00\rangle\langle00|+|00\rangle\langle11|
+|11\rangle\langle00|+|11\rangle\langle11|\bigr).
$$

例えば $\operatorname{Tr}_{O_2}(|00\rangle\langle11|)=|0\rangle\langle1|\langle1|0\rangle=0$ なので、一モードの縮約はいずれも $I_2/2$。一方 (b) の全固有値は $(1,0,0,0)$ なので $S^{(b)}(O_1O_2)=0$ です。各一モードの縮約が熱的な混合状態でも、全放射が混合状態であるかどうかは決まりません。(a) と違って (b) は放射モード間に量子相関があります。
<!-- solution-end -->

<a id="ex-bhi3-b03"></a>
#### BHI3-B03 記憶系からのSWAP情報移送
- Level: B

$O_1M$ が $(|00\rangle+|11\rangle)/\sqrt2$ で、出力モード $O_2$ は $|0\rangle$ であるとする。$M$ と $O_2$ を SWAP した前後の状態を示し、$S(O_1)$、$S(O_1O_2)$、$S(M)$ をそれぞれ計算せよ（エントロピーは対応する時刻の全状態から縮約して求める）。この操作は独立な新規内外純粋対生成か。

<!-- solution-start -->
**詳細解答**

初期の三系状態は

$$
|\Phi_1\rangle
=\frac{|0\rangle_{O_1}|0\rangle_M|0\rangle_{O_2}
+|1\rangle_{O_1}|1\rangle_M|0\rangle_{O_2}}{\sqrt2}.
$$

SWAP は $M$ の0成分を $O_2$ に移しても変化せず、1成分は $|1\rangle_M|0\rangle_{O_2}\mapsto|0\rangle_M|1\rangle_{O_2}$ とするので、最終状態は

$$
|\Phi_2\rangle
=\frac{|0\rangle_{O_1}|0\rangle_M|0\rangle_{O_2}
+|1\rangle_{O_1}|0\rangle_M|1\rangle_{O_2}}{\sqrt2}.
$$

前は $O_1,M$ の一モード縮約がともに $I_2/2$、$O_2$ は純粋です。従って $S(O_1)=\ln2$、$S(M)=\ln2$、$S(O_1O_2)=\ln2$。後は $O_1O_2$ がBell純粋状態なので $S(O_1O_2)=0$、$M$ は $|0\rangle$ なので $S(M)=0$、$O_1$ はなお $I_2/2$ なので $S(O_1)=\ln2$。

第2ステップは**記憶から既存の相関を外へ移す**ユニタリであり、以前の系と独立な純粋対 $O_2I_2$ を作る操作ではありません。
<!-- solution-end -->

<a id="ex-bhi3-b04"></a>
#### BHI3-B04 新規対の純粋性と相関の両立
- Level: B

有限次元の状態 $\rho_{EOI}$ について $\rho_{OI}=|\psi\rangle\langle\psi|$ が純粋であるとする。(1) $\rho_{EOI}$ が $E$ と $OI$ の直積であることを示せ。(2) $O$ の縮約だけが $I_2/2$ の場合にも同じ結論が出るか、三量子ビットの具体例で否定せよ。

<!-- solution-start -->
**詳細解答**

(1) [純粋な新規対の因数分解命題](#prop-bhi3-pure-pair-rigidity)の証明を適用する。$Q=I_{OI}-|\psi\rangle\langle\psi|$ について $\operatorname{Tr}[\rho_{EOI}(I_E\otimes Q)]=0$。正値性より $\rho_{EOI}$ の支持は $E\otimes|\psi\rangle$ に含まれ、$\rho_{EOI}=\rho_E\otimes|\psi\rangle\langle\psi|$ です。

(2) $E,I,O$ をそれぞれ二準位系とし、

$$
|\Gamma\rangle_{EOI}
=\frac{|0\rangle_E|0\rangle_O+|1\rangle_E|1\rangle_O}{\sqrt2}
\otimes|0\rangle_I
$$

を取ります。$\rho_O=I_2/2$ ですが、$\rho_{EO}$ はBell純粋状態で積ではありません。$E$ が $O$ と相関しているので $\rho_{EOI}=\rho_E\otimes\rho_{OI}$ ではありません。$\rho_{OI}=(I_2/2)\otimes|0\rangle\langle0|_I$ は混合で、(1) の仮定を満たさない点が決定的です。
<!-- solution-end -->

### Level C：逐次模型と蒸発終期の論理を統合する

<a id="ex-bhi3-c01"></a>
#### BHI3-C01 三回の放出と最終純粋性制約
- Level: C

独立な逐次対模型で $B_0$ は一次元、$N=3$、$(p_1,p_2,p_3)=(1/2,1/4,1/2)$ とする。

1. $S(R_k)$ の履歴と $\rho_{R_3}$ の正の固有値を求めよ。
2. $S(R_3)$ と全体 $R_3B_3$ のエントロピーを比較せよ。
3. このまま「蒸発終期に残存系なし・入力純粋・全発展等長・最終物理出力は $R_3$ だけ」を追加すると何が矛盾するか述べよ。
4. 各 $O_j$ の縮約が混合という条件を保ったまま最終放射を純粋にすることは論理的に可能か、具体的な二ステップの構成を根拠に述べよ。

<!-- solution-start -->
**詳細解答**

(1) $h(1/2)=\ln2$ と $h(1/4)=2\ln2-\tfrac34\ln3$ なので、[増加定理](#thm-bhi3-entropy-growth)に順に代入すると

$$
\begin{aligned}
S(R_0)&=0,\\
S(R_1)&=\ln2,\\
S(R_2)&=\ln2+h(1/4),\\
S(R_3)&=2\ln2+h(1/4)=4\ln2-\frac34\ln3.
\end{aligned}
$$

[固有値の積表示](#prop-bhi3-radiation-spectrum)で第2モードが0の場合は $(1/2)(3/4)(1/2)=3/16$、1の場合は $(1/2)(1/4)(1/2)=1/16$ です。第1・第3モードの各二通りの選択でこれがそれぞれ4回ずつ現れ、八つの固有値の和は $4(3/16)+4(1/16)=1$ です。

(2) $S(R_3)=4\ln2-\tfrac34\ln3>0$。一方 $R_3B_3$ は三つの規格化純粋対のテンソル積なので純粋、従って $S(R_3B_3)=0$。$B_3=I_1I_2I_3$ が放射を純化していることに注意します。

(3) [BHI1の放射だけで完結する等長発展の純粋性制約](../BHI1/index.md#thm-bhi1-endpoint-purity)を、仮定された純粋入力と放射のみの終状態に適用すると $S(R_3)=0$ が必要です。しかし (1) は正の値を与えます。従って**独立対模型を終期までそのまま維持し、内部を単に除去したうえで放射のみの等長発展とする**全仮定は両立しません。内部が残る中間時刻の状態自体は矛盾していません。

(4) 可能です。[SWAPを用いる命題](#prop-bhi3-local-global-nonmonotone)では $O_1$ の放出後に $O_1M$ がBell純粋対となり、$M$ の情報を $O_2$ へ移すと、各 $\rho_{O_1}=\rho_{O_2}=I_2/2$ を保ちながら $\rho_{O_1O_2}$ は純粋になります。ただし、これは(1)の**以前の系と独立な新規内外対**という仮定を放棄した例です。各一モードの混合状態から、最終放射全体が混合状態であるとは結論できません。
<!-- solution-end -->

## 9. 次に考えること

ここでは対の数を数えただけで、実際の放出速度、ブラックホールの質量減少、温度の時間依存はまだ扱いません。$k$ を物理時刻へ対応させるにはエネルギー収支が必要です。

**次講 BHI4：放射のエネルギー収支と準静的蒸発。** その後のBHI5では、ここで見た「一モードの局所熱性」と「放射全体の精細エントロピー」の差を、粗視化との対比で掘り下げます。
