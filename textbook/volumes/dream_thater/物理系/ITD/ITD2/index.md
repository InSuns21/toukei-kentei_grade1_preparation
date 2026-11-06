# ITD2 時間反転とゆらぎ関係：Jarzynski等式・Crooks関係

[ITD1の経路確率比](../ITD1/index.md#thm-itd1-path-ratio)により、一回の熱浴との接触では、系と浴を合わせたエントロピー生成が負になる軌道もあります。しかし[平均エントロピー生成の非負性](../ITD1/index.md#thm-itd1-mean-entropy)だけでは、負の揺らぎがどれほどの確率で起こるかを決められません。そこで経路確率比を指数に戻して**全軌道を足す**と、平均の不等式より強い等式が現れます。

さらに、実験の最初と逆実験の最初をそれぞれ熱平衡に用意すると、経路比を仕事 $W$ と平衡自由エネルギー差 $\Delta F_{\mathrm{eq}}$ だけで表せます。分布の形を測定しなくても平衡自由エネルギーを推定できるという、驚くべき関係です。本章では有限状態・有限段数だけを用い、どの等式にも**正逆実験の初期分布、操作順、経路の支持**を明記します。

共通して、有限な状態集合 $X\ne\varnothing$、有限のエネルギー $E(x,\lambda)$、単一の熱浴 $T>0$、$\beta=(k_{\mathrm B}T)^{-1}$ を考えます。対数は自然対数です。仕事 $W$ は外部が系にする仕事、熱 $Q$ は浴から系へ入る熱を正に取り、[ITD1の仕事と熱](../ITD1/index.md#def-itd1-path-work-heat)と[軌道第一法則](../ITD1/index.md#thm-itd1-first-law)

$$
\Delta E[\gamma]=W[\gamma]+Q[\gamma]
$$

を使います。取り出した仕事は $-W$ です。すべての式は有限和なので、積分交換や無限時間極限の仮定はありません。

## 1. 逆向きの実験を何から開始するか

前章では正方向に「状態を変えずに準位を切り替え、熱浴に接触させる」を繰り返しました。これを単に逆順に読むだけでは逆実験を指定したことになりません。逆方向では**接触を先に行い、その後で準位を戻す**必要があります。そして、逆実験を始める状態の確率は別途選べます。

例えば二状態系で正方向の終端が $(3/4,1/4)$ でも、逆実験を同じ分布から始める場合と $(1/2,1/2)$ から始める場合では、逆の経路確率が変わります。この違いを正確に記録するため、逆初期分布を $r$ と呼びます。

<a id="def-itd2-reverse-ratio"></a>

<!-- formal-statement-start -->
> **定義（対応する正逆実験と経路エントロピー生成）**  
> [ITD1の有限状態模型](../ITD1/index.md#def-itd1-controlled-model)で、初期分布 $p_0$、段階 $j=1,\ldots,n$ の遷移核 $K_j$ が[局所詳細釣合い](../ITD1/index.md#def-itd1-local-detailed-balance)を満たすとする。逆実験は初期分布 $r$ から始め、$K_n,\ldots,K_1$ による接触と逆向きの準位変更を行う。軌道 $\gamma=(x_0,\ldots,x_n)$ の反転を $\gamma^\dagger=(x_n,\ldots,x_0)$ として

$$
\begin{aligned}
P_{\mathrm F}(\gamma)&=p_0(x_0)\prod_{j=1}^nK_j(x_{j-1},x_j),\\
P_{\mathrm R}^{(r)}(\gamma^\dagger)&=r(x_n)\prod_{j=1}^nK_j(x_j,x_{j-1})
\end{aligned}
$$

> と定める。両者が正である軌道には、逆初期分布 $r$ に関する無次元の経路エントロピー生成を

$$
\Sigma_r[\gamma]=\log\frac{P_{\mathrm F}(\gamma)}
{P_{\mathrm R}^{(r)}(\gamma^\dagger)}
$$

> と定義する。$p_0(x)>0$ と $r(x)>0$ が全状態で成り立つ場合、正方向と逆方向を反転して比較した経路の支持は一致する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-itd2-reverse-ratio -->
### 例：正逆の規格化と逆初期分布の役割

**定義の確認**：$X=\{0,1\}$、$n=1$、エネルギーは両状態で0、$p_0=(1/2,1/2)$、$r=(3/4,1/4)$、核

$$
K=\begin{pmatrix}3/4&1/4\\1/4&3/4\end{pmatrix}
$$

を取ります。行和が1、全成分が正、$K(x,y)=K(y,x)$ なので[局所詳細釣合い](../ITD1/index.md#def-itd1-local-detailed-balance)も満たします。正方向の $(0,1)$ は $P_{\mathrm F}(0,1)=(1/2)(1/4)=1/8$、反転した逆軌道 $(1,0)$ は $P_{\mathrm R}^{(r)}(1,0)=(1/4)(1/4)=1/16$ です。したがって $\Sigma_r[0\to1]=\log2$ です。

逆方向の軌道を全て足すと

$$
\sum_{y,x}r(y)K(y,x)
=\sum_y r(y)\underbrace{\sum_xK(y,x)}_{=1}=1.
$$

**核の行和**を使ったのであり、行列の列和を仮定していません。$p_0$ と $r$ はともに全状態で正で、正逆の全4軌道が対応します。
<!-- definition-example-end -->

正逆比を[ITD1の局所詳細釣合い](../ITD1/index.md#def-itd1-local-detailed-balance)で各段階の熱へ直すと、

$$
\begin{aligned}
\Sigma_r[\gamma]
&=\log\frac{p_0(x_0)}{r(x_n)}
+\sum_{j=1}^n\log\frac{K_j(x_{j-1},x_j)}{K_j(x_j,x_{j-1})}\\
&=\log\frac{p_0(x_0)}{r(x_n)}
-\beta Q[\gamma].
\end{aligned}
$$

ここで $Q$ は系に入る熱です。特に $r=p_n$ を選ぶと[ITD1の全エントロピー生成](../ITD1/index.md#def-itd1-reverse-entropy)と一致します。それ以外の $r$ に対して、$\Sigma_r$ を無条件に「系と浴の物理的な全エントロピー生成」と呼んではいけません。境界の確率分布が違うためです。

## 2. 積分型ゆらぎ関係は規格化から生まれる

一つの経路では $\Sigma_r$ が負でもかまいません。負の軌道には指数因子 $e^{-\Sigma_r}>1$ が付きます。しかしそれらを正方向の確率で重み付けすると、逆実験の確率を**一回ずつ数え直す**ことになります。

<a id="thm-itd2-ift"></a>

<!-- formal-statement-start -->
> **定理（積分型ゆらぎ関係）**  
> 有限状態・有限段数の[対応する正逆実験](#def-itd2-reverse-ratio)で、各核が局所詳細釣合いを満たし、$p_0(x)>0$、$r(x)>0$ がすべての $x\in X$ について成り立つとする。このとき

$$
\left\langle e^{-\Sigma_r}\right\rangle_{\mathrm F}=1,
\qquad
\langle\Sigma_r\rangle_{\mathrm F}\ge0.
$$

> 第2式の等号成立は、対応する全軌道で $P_{\mathrm F}(\gamma)=P_{\mathrm R}^{(r)}(\gamma^\dagger)$ であることと同値である。
<!-- formal-statement-end -->

### 証明の見取り図

経路ごとの $e^{-\Sigma_r}$ は、同じ経路に対応する「逆の確率÷正の確率」です。指数平均で正の確率が消え、反転による一対一対応と逆実験の規格化だけが残ります。平均の不等式は $e^{-z}\ge1-z$ を有限和で平均すると得られます。

<!-- proof-start -->
### 証明

$S_{\mathrm F}=\{\gamma:P_{\mathrm F}(\gamma)>0\}$ と置きます。初期分布が全状態で正で、遷移核の正の成分が双方向で対応するため、

$$
P_{\mathrm F}(\gamma)>0
\quad\Longleftrightarrow\quad
P_{\mathrm R}^{(r)}(\gamma^\dagger)>0
$$

です。左から右へは $p_0(x_0)>0$、各正の遷移の逆遷移が正、$r(x_n)>0$ を使い、逆向きの含意も同じ条件を使います。したがって

$$
\begin{aligned}
\left\langle e^{-\Sigma_r}\right\rangle_{\mathrm F}
&=\sum_{\gamma\in S_{\mathrm F}}
P_{\mathrm F}(\gamma)
\frac{P_{\mathrm R}^{(r)}(\gamma^\dagger)}{P_{\mathrm F}(\gamma)}\\
&=\sum_{\gamma\in S_{\mathrm F}}P_{\mathrm R}^{(r)}(\gamma^\dagger)
=\sum_{\eta\in S_{\mathrm R}}P_{\mathrm R}^{(r)}(\eta)=1.
\end{aligned}
$$

最後の和は[軌道確率の規格化](../ITD1/index.md#prop-itd1-update)と同じく核の行和1から従います。$\eta=\gamma^\dagger$ は反転した軌道全体を一対一に走ります。

次に実数 $z$ に対する $e^{-z}\ge1-z$ を用います。この不等式は関数 $g(z)=e^{-z}-1+z$ が $g'(z)=1-e^{-z}$ を持ち、$z=0$ で唯一最小値0を取ることから分かります。有限和の各項へ適用すると

$$
1=\langle e^{-\Sigma_r}\rangle_{\mathrm F}
\ge\langle1-\Sigma_r\rangle_{\mathrm F}
=1-\langle\Sigma_r\rangle_{\mathrm F}.
$$

ゆえに平均は非負です。不等号が等号になるには、正の確率を持つすべての軌道で $\Sigma_r=0$ が必要十分です。共通支持だから、これは全軌道で正逆の経路分布が一致することと同値です。
<!-- proof-end -->

これは**指数平均の等式**であって、$\langle\Sigma_r\rangle=0$ を主張していません。また単一の軌道で $e^{-\Sigma_r}=1$ とする式でもありません。

### 支持が欠けると「逆の全確率」を回収できない

初期分布に0が含まれると、正方向には不可能だが逆方向には可能な経路が出ることがあります。その逆側だけの確率質量を「絶対不可逆性」による欠損として数えます。熱浴の遷移が**一方向だけ**許される場合は、そもそも局所詳細釣合いの仮定が破れているので、ここでは扱いません。

<a id="prop-itd2-support-correction"></a>

<!-- formal-statement-start -->
> **命題（支持欠損による指数平均の補正）**  
> 有限状態の[対応する正逆実験](#def-itd2-reverse-ratio)で、$p_0$ は零確率を許し、逆初期分布 $r$ は全状態で正とし、核は局所詳細釣合いを満たすとする。$S_{\mathrm F}=\{\gamma:P_{\mathrm F}(\gamma)>0\}$ の上だけで $\Sigma_r=\log(P_{\mathrm F}/P_{\mathrm R}^{(r)})$ を定義し、

$$
\lambda_{\mathrm{abs}}
=\sum_{\gamma\notin S_{\mathrm F}}
P_{\mathrm R}^{(r)}(\gamma^\dagger)
$$

> と置くと、

$$
\left\langle e^{-\Sigma_r}\right\rangle_{\mathrm F}
=1-\lambda_{\mathrm{abs}}
$$

> が成り立つ。$\lambda_{\mathrm{abs}}$ は、逆実験が正方向の支持外に割り当てた確率で、$0\le\lambda_{\mathrm{abs}}\le1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

指数平均で正方向の確率が消えること自体は変わりません。ただし足せるのは正方向に可能な経路だけです。逆実験の規格化1から、足せなかった質量を引きます。

<!-- proof-start -->
### 証明

局所詳細釣合いは正の遷移の逆が正であることを保証します。$r>0$ なので、$P_{\mathrm F}(\gamma)>0$ なら $P_{\mathrm R}^{(r)}(\gamma^\dagger)>0$ です。よって $S_{\mathrm F}$ 上の比は有限で、

$$
\begin{aligned}
\langle e^{-\Sigma_r}\rangle_{\mathrm F}
&=\sum_{\gamma\in S_{\mathrm F}}
P_{\mathrm R}^{(r)}(\gamma^\dagger)\\
&=\sum_{\gamma\in X^{n+1}}P_{\mathrm R}^{(r)}(\gamma^\dagger)
-\sum_{\gamma\notin S_{\mathrm F}}P_{\mathrm R}^{(r)}(\gamma^\dagger)\\
&=1-\lambda_{\mathrm{abs}}.
\end{aligned}
$$

各項が非負で逆実験の確率の部分和だから、$0\le\lambda_{\mathrm{abs}}\le1$ です。
<!-- proof-end -->

具体的に $p_0=(1,0)$、$K=\begin{pmatrix}3/4&1/4\\1/4&3/4\end{pmatrix}$、両状態のエネルギー0、$r=p_1=(3/4,1/4)$ とします。正方向の軌道は $0\to0$ と $0\to1$ のみで、逆側の対応確率は

$$
P_{\mathrm R}^{(r)}(0,0)=\frac34\frac34=\frac9{16},
\qquad
P_{\mathrm R}^{(r)}(1,0)=\frac14\frac14=\frac1{16}.
$$

したがって $\langle e^{-\Sigma_r}\rangle=10/16=5/8$、$\lambda_{\mathrm{abs}}=3/8$ です。これは[ITD1の支持欠損の演習](../ITD1/index.md#def-itd1-reverse-entropy)で現れる値を、逆実験の取りこぼした質量として説明したものです。正の支持条件を削ったまま「常に1」とはできません。

## 3. 両端平衡にすると仕事だけの式になる

次は「ある操作列を一回実行して観測した仕事の値」から、初期・最終の**平衡**自由エネルギー差を読みたいと考えます。[SM3の正準分布](../../SM/SM3/index.md#def-sm3-canonical)と[正準Helmholtz自由エネルギー](../../SM/SM3/index.md#def-sm3-free-energy)を用います。

エネルギー準位が $(0,0)$ から $(0,\varepsilon)$ へ変わる二状態系では、最初の平衡分布は $(1/2,1/2)$ ですが、最終制御値の平衡分布は $(1,e^{-\beta\varepsilon})/(1+e^{-\beta\varepsilon})$ です。quench直後の実際の分布が後者へ自動的に変わるわけではありません。**逆実験用には後者を新しく準備する**のが次の模型です。

<a id="def-itd2-equilibrium-protocol"></a>

<!-- formal-statement-start -->
> **定義（両端平衡の正逆プロトコル）**  
> 有限状態・有限エネルギー・$T>0$ の[ITD1の操作・接触模型](../ITD1/index.md#def-itd1-controlled-model)において、各核は局所詳細釣合いを満たすとする。$j=0,n$ の制御値で

$$
\begin{aligned}
Z_j&=\sum_{x\in X}e^{-\beta E(x,\lambda_j)},&
\pi_j(x)&=\frac{e^{-\beta E(x,\lambda_j)}}{Z_j},\\
F_j&=-\beta^{-1}\log Z_j,&
\Delta F_{\mathrm{eq}}&=F_n-F_0
\end{aligned}
$$

> と置く。正実験を $p_0=\pi_0$ から、逆実験を $r=\pi_n$ からそれぞれ**独立に**開始する。正実験は各段階で $\lambda_{j-1}\to\lambda_j$ のquenchの後に $K_j$ と接触し、逆実験は $K_n,\ldots,K_1$ の接触の**後に**対応するquenchを戻す。正仕事 $W_{\mathrm F}$ は系になされた仕事、逆仕事 $W_{\mathrm R}$ も逆操作で系になされた仕事とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-itd2-equilibrium-protocol -->
### 例：二状態の瞬間quench

**定義の確認**：$X=\{0,1\}$、$E(0,\lambda)=0$、$E(1,\lambda)=\lambda$、$\lambda_0=0$、$\lambda_1=\varepsilon>0$、接触核 $K_1=I$（状態が変わらない核）とします。対角の遷移確率は1、非対角は両向き0なので[局所詳細釣合い](../ITD1/index.md#def-itd1-local-detailed-balance)を満たします。両端の分配関数は

$$
Z_0=1+1=2,\qquad Z_1=1+e^{-\beta\varepsilon},
\qquad \Delta F_{\mathrm{eq}}=-\beta^{-1}\log\frac{Z_1}{Z_0}.
$$

正実験は状態1を確率 $1/2$ で引き、その場合の仕事は $W_{\mathrm F}=\varepsilon$ です。逆実験は $\pi_1=(1,e^{-\beta\varepsilon})/Z_1$ から始まり、状態1のまま準位を $\varepsilon\to0$ と戻した場合の仕事は $W_{\mathrm R}=-\varepsilon$ です。二つの初期分布は一致しませんが、各実験で正しく規格化されています。
<!-- definition-example-end -->

### なぜ逆仕事は負になるか

軌道 $\gamma=(x_0,\ldots,x_n)$ に対応する逆軌道は、まず $\lambda_n$ で $x_n\to x_{n-1}$ と接触し、**その時点の状態 $x_{n-1}$** で $\lambda_n\to\lambda_{n-1}$ を行います。[仕事の定義](../ITD1/index.md#def-itd1-path-work-heat)を両方向に代入すると、各段階の逆仕事は

$$
\begin{aligned}
W_{{\mathrm R},j}[\gamma^\dagger]
&=E(x_{j-1},\lambda_{j-1})-E(x_{j-1},\lambda_j)\\
&=-W_{{\mathrm F},j}[\gamma].
\end{aligned}
$$

逆側の段階を $j=n,\ldots,1$ で加えれば $W_{\mathrm R}[\gamma^\dagger]=-W_{\mathrm F}[\gamma]$ です。逆実験を「quenchしてから接触」の順番にしてしまうと、quench時の状態が違うので、この対応は一般に成立しません。

<a id="thm-itd2-work-ratio"></a>

<!-- formal-statement-start -->
> **定理（両端平衡での仕事の経路比）**  
> [両端平衡の正逆プロトコル](#def-itd2-equilibrium-protocol)の有限状態・有限段数・有限エネルギー・単一温度・局所詳細釣合いの仮定の下で、正の確率を持つ任意の正軌道 $\gamma$ について

$$
\log\frac{P_{\mathrm F}(\gamma)}
{P_{\mathrm R}^{(\pi_n)}(\gamma^\dagger)}
=\beta\{W_{\mathrm F}[\gamma]-\Delta F_{\mathrm{eq}}\}.
$$

> 両方向の対応する経路は共通の支持を持ち、指数を取っても等式が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

一般の[正逆の経路比](#def-itd2-reverse-ratio)の端点分布を正準分布へ置き換えます。分配関数比は自由エネルギー差へ、エネルギー端点の差から熱を引いたものは第一法則によって仕事へ変わります。

<!-- proof-start -->
### 証明

$X$ は有限、各エネルギーも有限なので $\pi_0(x),\pi_n(x)>0$ です。[局所詳細釣合い](../ITD1/index.md#def-itd1-local-detailed-balance)が遷移の双方向支持を保証し、経路比の対数は正の対応経路で定義されます。[正準分布](../../SM/SM3/index.md#def-sm3-canonical)を端点へ代入して

$$
\begin{aligned}
\log\frac{\pi_0(x_0)}{\pi_n(x_n)}
&=\log\frac{e^{-\beta E(x_0,\lambda_0)}/Z_0}
{e^{-\beta E(x_n,\lambda_n)}/Z_n}\\
&=\beta\{E(x_n,\lambda_n)-E(x_0,\lambda_0)\}
+\log\frac{Z_n}{Z_0}\\
&=\beta\Delta E[\gamma]-\beta\Delta F_{\mathrm{eq}}.
\end{aligned}
$$

ここで最後の行は $F_j=-\beta^{-1}\log Z_j$ を用いました。続いて[一般の経路比](#def-itd2-reverse-ratio)の対数を各核へ展開し、[局所詳細釣合い](../ITD1/index.md#def-itd1-local-detailed-balance)で熱へ変換します。

$$
\begin{aligned}
\log\frac{P_{\mathrm F}(\gamma)}
{P_{\mathrm R}^{(\pi_n)}(\gamma^\dagger)}
&=\log\frac{\pi_0(x_0)}{\pi_n(x_n)}
+\sum_{j=1}^n\log\frac{K_j(x_{j-1},x_j)}{K_j(x_j,x_{j-1})}\\
&=\beta\Delta E-\beta\Delta F_{\mathrm{eq}}-\beta Q\\
&=\beta(W_{\mathrm F}-\Delta F_{\mathrm{eq}}).
\end{aligned}
$$

最後の行で[軌道第一法則](../ITD1/index.md#thm-itd1-first-law)の $\Delta E=W+Q$ を使いました。$\pi_0,\pi_n>0$ なので、正方向に可能な軌道の反転は逆方向にも可能であり、その逆も同様です。
<!-- proof-end -->

この $\Sigma_{\pi_n}=\beta(W-\Delta F_{\mathrm{eq}})$ は、前章の $\Sigma_{p_n}$ と**逆初期分布が違う量**です。正方向の実際の終端分布 $p_n$ が $\pi_n$ と一致する特別な場合だけ両者は同じになります。

<a id="thm-itd2-jarzynski"></a>

<!-- formal-statement-start -->
> **定理（Jarzynski等式と平均仕事の下限）**  
> [両端平衡の正逆プロトコル](#def-itd2-equilibrium-protocol)の条件の下で、正実験の仕事について

$$
\boxed{\left\langle e^{-\beta W_{\mathrm F}}\right\rangle_{\mathrm F}
=e^{-\beta\Delta F_{\mathrm{eq}}}
=\frac{Z_n}{Z_0}}
$$

> が成り立つ。また

$$
\langle W_{\mathrm F}\rangle_{\mathrm F}\ge\Delta F_{\mathrm{eq}}.
$$

> 第2式の等号は有限模型では正の確率を持つすべての軌道で $W_{\mathrm F}=\Delta F_{\mathrm{eq}}$ のとき、かつそのときに限る。
<!-- formal-statement-end -->

### 証明の見取り図

[仕事の経路比](#thm-itd2-work-ratio)を指数に戻し、[積分型ゆらぎ関係](#thm-itd2-ift)を適用します。その後で指数関数の接線不等式を平均して仕事の下限を得ます。指数の平均と仕事そのものの平均は取り違えません。

<!-- proof-start -->
### 証明

[仕事の経路比](#thm-itd2-work-ratio)から $\Sigma_{\pi_n}=\beta(W_{\mathrm F}-\Delta F_{\mathrm{eq}})$ です。両端の正準分布は全状態で正なので、[積分型ゆらぎ関係](#thm-itd2-ift)の支持条件を満たします。したがって

$$
\begin{aligned}
1
&=\left\langle e^{-\Sigma_{\pi_n}}\right\rangle_{\mathrm F}\\
&=\left\langle e^{-\beta(W_{\mathrm F}-\Delta F_{\mathrm{eq}})}\right\rangle_{\mathrm F}\\
&=e^{\beta\Delta F_{\mathrm{eq}}}
\left\langle e^{-\beta W_{\mathrm F}}\right\rangle_{\mathrm F}.
\end{aligned}
$$

両辺を $e^{\beta\Delta F_{\mathrm{eq}}}$ で割り、分配関数の定義を入れれば第1式です。さらに、[積分型ゆらぎ関係](#thm-itd2-ift)の証明で使った $e^{-z}\ge1-z$ を $z=\beta(W_{\mathrm F}-\Delta F_{\mathrm{eq}})$ に適用すると

$$
1=\langle e^{-z}\rangle_{\mathrm F}
\ge1-\beta\{\langle W_{\mathrm F}\rangle_{\mathrm F}-\Delta F_{\mathrm{eq}}\}.
$$

$\beta>0$ なので第2式を得ます。接線不等式の等号は $z=0$ に限り、有限和の各項は非負ですから、平均で等号となるには正の確率の各軌道で $W_{\mathrm F}=\Delta F_{\mathrm{eq}}$ が必要十分です。
<!-- proof-end -->

### 例：quenchの指数平均を有限和で検算

[二状態の瞬間quench](#def-itd2-equilibrium-protocol)では初期に両状態が確率 $1/2$ です。状態0なら $W=0$、状態1なら $W=\varepsilon$ なので

$$
\langle e^{-\beta W}\rangle
=\frac12e^0+\frac12e^{-\beta\varepsilon}
=\frac{1+e^{-\beta\varepsilon}}2
=\frac{Z_1}{Z_0}.
$$

一方、$\langle W\rangle=\varepsilon/2$ です。$\varepsilon>0$ なら仕事が二値に揺らぐので、平均仕事は $\Delta F_{\mathrm{eq}}$ より**厳密に大きい**です。指数平均を $e^{-\beta\langle W\rangle}$ へ置き換えるのは誤りです。

## 4. Crooks関係は仕事の「分布」そのものを結ぶ

Jarzynski等式は正実験だけの指数平均の値を与えます。さらに逆実験も行えば、ある仕事量 $w$ が正方向で出た頻度と、逆方向で仕事 $-w$ が出た頻度を直接比較できます。同じ $w$ へ到達する軌道が複数あっても、それらを足した後で関係が残ります。

<a id="def-itd2-work-distributions"></a>

<!-- formal-statement-start -->
> **定義（正逆の仕事分布）**  
> [両端平衡の正逆プロトコル](#def-itd2-equilibrium-protocol)について、$w\in\mathbb R$ に対し、有限個の仕事値に対する確率質量関数を

$$
\begin{aligned}
\mathsf P_{\mathrm F}(w)
&=\sum_{\gamma:W_{\mathrm F}[\gamma]=w}P_{\mathrm F}(\gamma),\\
\mathsf P_{\mathrm R}(w)
&=\sum_{\eta:W_{\mathrm R}[\eta]=w}P_{\mathrm R}^{(\pi_n)}(\eta)
\end{aligned}
$$

> と定義する。空の和は0とする。これは離散的な仕事の**確率質量**であり、連続分布の確率密度ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-itd2-work-distributions -->
### 例：二状態quenchの正逆仕事分布

**定義の確認**：$\varepsilon>0$、$z=e^{-\beta\varepsilon}\in(0,1)$ として、前節のquenchを考えます。正方向は初期 $(1/2,1/2)$、逆方向は $(1,z)/(1+z)$ から開始します。$K_1=I$ なので状態は変わらず、

$$
\begin{array}{c|cc}
&\text{仕事値}&\text{確率}\\ \hline
\text{正}&0,\ \varepsilon&1/2,\ 1/2\\
\text{逆}&0,\ -\varepsilon&1/(1+z),\ z/(1+z)
\end{array}
$$

です。各分布の確率の和は1です。逆方向で $+\varepsilon$ を使わず、**$-\varepsilon$** と比較するのが大切です。
<!-- definition-example-end -->

<a id="thm-itd2-crooks"></a>

<!-- formal-statement-start -->
> **定理（Crooksの仕事分布関係）**  
> [両端平衡の正逆プロトコル](#def-itd2-equilibrium-protocol)の有限状態・有限段数・局所詳細釣合い・同一温度の条件の下で、任意の実数 $w$ について

$$
\boxed{\mathsf P_{\mathrm F}(w)
=e^{\beta(w-\Delta F_{\mathrm{eq}})}
\mathsf P_{\mathrm R}(-w)}
$$

> が成り立つ。両確率が正の仕事値では、これを

$$
\frac{\mathsf P_{\mathrm F}(w)}{\mathsf P_{\mathrm R}(-w)}
=e^{\beta(w-\Delta F_{\mathrm{eq}})}
$$

> と書ける。両確率が0の値では比は定義しない。
<!-- formal-statement-end -->

### 証明の見取り図

正軌道 $\gamma$ と逆軌道 $\gamma^\dagger$ は一対一で、対応する仕事は符号が反対です。[仕事の経路比](#thm-itd2-work-ratio)の指数因子は、$W_{\mathrm F}=w$ に制限した経路上では定数なので、和の外へ出せます。

<!-- proof-start -->
### 証明

まず[逆仕事の計算](#def-itd2-equilibrium-protocol)で確かめた
$W_{\mathrm R}[\gamma^\dagger]=-W_{\mathrm F}[\gamma]$ を使います。任意の $w$ について、[仕事の経路比](#thm-itd2-work-ratio)を指数にして

$$
P_{\mathrm F}(\gamma)
=e^{\beta(W_{\mathrm F}[\gamma]-\Delta F_{\mathrm{eq}})}
P_{\mathrm R}^{(\pi_n)}(\gamma^\dagger)
$$

と書きます。正逆で共通支持なので、確率0の軌道についても両辺を0とした等式が成立します。$W_{\mathrm F}[\gamma]=w$ を満たす軌道だけで和を取ると、

$$
\begin{aligned}
\mathsf P_{\mathrm F}(w)
&=\sum_{\gamma:W_{\mathrm F}[\gamma]=w}P_{\mathrm F}(\gamma)\\
&=e^{\beta(w-\Delta F_{\mathrm{eq}})}
\sum_{\gamma:W_{\mathrm F}[\gamma]=w}P_{\mathrm R}^{(\pi_n)}(\gamma^\dagger)\\
&=e^{\beta(w-\Delta F_{\mathrm{eq}})}
\sum_{\eta:W_{\mathrm R}[\eta]=-w}P_{\mathrm R}^{(\pi_n)}(\eta)\\
&=e^{\beta(w-\Delta F_{\mathrm{eq}})}\mathsf P_{\mathrm R}(-w).
\end{aligned}
$$

第3行では反転が一対一であり、対応する逆仕事が $-w$ になることを使いました。最後に両確率が正のときだけ割り算をすれば比の形が得られます。
<!-- proof-end -->

二状態quenchの例なら $Z_1/Z_0=(1+z)/2$ なので、

$$
\frac{\mathsf P_{\mathrm F}(0)}{\mathsf P_{\mathrm R}(0)}
=\frac{1/2}{1/(1+z)}
=\frac{1+z}{2}=e^{-\beta\Delta F_{\mathrm{eq}}},
$$

$$
\frac{\mathsf P_{\mathrm F}(\varepsilon)}{\mathsf P_{\mathrm R}(-\varepsilon)}
=\frac{1/2}{z/(1+z)}
=\frac{1+z}{2z}
=e^{\beta(\varepsilon-\Delta F_{\mathrm{eq}})}.
$$

**CrooksからJarzynskiへ**：上の等式に $e^{-\beta w}$ を掛け、すべての仕事値 $w$ で足すと

$$
\begin{aligned}
\sum_w\mathsf P_{\mathrm F}(w)e^{-\beta w}
&=e^{-\beta\Delta F_{\mathrm{eq}}}\sum_w\mathsf P_{\mathrm R}(-w)\\
&=e^{-\beta\Delta F_{\mathrm{eq}}},
\end{aligned}
$$

となります。最後に $w\mapsto-w$ の対応で逆分布の全確率を足して1にしました。この導出は、同じ両端平衡の初期分布と局所詳細釣合いを仮定した比較です。一般の非平衡初期分布や異なる逆動力学へ、どちらの式も無条件に広げられるという意味ではありません。

## 5. いつ式を使ってはいけないか

初期分布だけを変え、$E_0=(0,0)$、$E_1=(0,\varepsilon)$、$K_1=I$ を保つとします。初期を $p_0=(1,0)$ とすれば仕事は常に0なので

$$
\langle e^{-\beta W}\rangle=1.
$$

しかし両端の**平衡**分配関数比は $(1+e^{-\beta\varepsilon})/2<1$ です。この不一致は熱力学の破綻ではありません。初期が $\pi_0=(1/2,1/2)$ ではないため、[仕事の経路比の定理](#thm-itd2-work-ratio)の仮定を満たさないのです。さらにこの例では正方向に状態1から始まる軌道が存在しないので、平衡逆実験との共通支持も失われます。

同様に、逆実験を正方向の実際の終端分布 $p_n$ から始める選択は、[ITD1の全エントロピー生成](../ITD1/index.md#def-itd1-reverse-entropy)の議論には自然ですが、**Crooks関係の逆実験**とは通常異なります。局所詳細釣合い、詳細釣合いによる平衡分布の不変性、正逆経路比、ゆらぎ関係は、名前が似ていてもそれぞれ別の主張です。

## 6. 演習：指数平均・仕事分布・支持を確かめる

### Level A：有限和と符号を手で確かめる

#### A1. 逆初期分布を変えた経路比

$X=\{0,1\}$、$p_0=(1/2,1/2)$、$r=(3/4,1/4)$、$K=\begin{pmatrix}3/4&1/4\\1/4&3/4\end{pmatrix}$、両状態のエネルギー0とする。4軌道について $P_{\mathrm F}$、$P_{\mathrm R}^{(r)}(\gamma^\dagger)$ を表にし、$\langle e^{-\Sigma_r}\rangle$ を求めよ。

- Level: A
- ID: ITD2-A1

<!-- solution-start -->
**詳細解答**

[定義（対応する正逆実験と経路エントロピー生成）](#def-itd2-reverse-ratio)から、行は正方向の $(x_0,x_1)$、逆確率は $r(x_1)K(x_1,x_0)$ です。

$$
\begin{array}{c|cccc}
\gamma&(0,0)&(0,1)&(1,0)&(1,1)\\ \hline
P_{\mathrm F}&3/8&1/8&1/8&3/8\\
P_{\mathrm R}^{(r)}(\gamma^\dagger)&9/16&1/16&3/16&3/16
\end{array}
$$

各行の和は1です。すべての値が正なので指数平均の各項は逆確率に等しく、

$$
\langle e^{-\Sigma_r}\rangle
=\frac9{16}+\frac1{16}+\frac3{16}+\frac3{16}=1.
$$

例えば $\gamma=(0,1)$ では $\Sigma_r=\log[(1/8)/(1/16)]=\log2$、その指数因子は $1/2$ です。**逆確率を $P_{\mathrm R}^{(r)}(0,1)$ と誤って読まない**ことが要点です。
<!-- solution-end -->

#### A2. 分配関数比とJarzynski指数平均

$E_0=(0,0)$ を $E_1=(0,\varepsilon)$ に瞬間quenchし、状態は変えない。$\beta\varepsilon=\log3$ で初期分布は正準分布とする。$Z_0,Z_1$、仕事の確率、指数仕事平均、平均仕事を計算せよ。

- Level: A
- ID: ITD2-A2

<!-- solution-start -->
**詳細解答**　$\beta\varepsilon=\log3$ なので $e^{-\beta\varepsilon}=1/3$ です。[両端平衡の定義](#def-itd2-equilibrium-protocol)を使うと

$$
Z_0=2,\quad Z_1=1+\frac13=\frac43,\quad
e^{-\beta\Delta F_{\mathrm{eq}}}=\frac{Z_1}{Z_0}=\frac23.
$$

初期の二状態は各 $1/2$、状態を固定して準位を変えるので $W=0$ と $\varepsilon$ の確率はともに $1/2$ です。よって

$$
\langle e^{-\beta W}\rangle
=\frac12+\frac12\frac13=\frac23,\qquad
\langle W\rangle=\frac12(0)+\frac12\varepsilon=\frac\varepsilon2.
$$

前者が[Jarzynski等式](#thm-itd2-jarzynski)と一致しますが、後者は自由エネルギー差そのものではありません。
<!-- solution-end -->

#### A3. Crooks関係を二つの仕事値で検査

A2の逆実験を $\pi_1$ から始め、$\varepsilon\to0$ のquenchを行う。逆仕事分布を計算し、$w=0,\varepsilon$ についてCrooksの確率比を直接検算せよ。

- Level: A
- ID: ITD2-A3

<!-- solution-start -->
**詳細解答**　A2の $Z_1=4/3$ から $\pi_1=(3/4,1/4)$ です。逆操作の仕事は状態0で0、状態1で $-\varepsilon$ なので

$$
\mathsf P_{\mathrm R}(0)=\frac34,\qquad
\mathsf P_{\mathrm R}(-\varepsilon)=\frac14.
$$

正方向では双方 $1/2$ です。ゆえに

$$
\frac{\mathsf P_{\mathrm F}(0)}{\mathsf P_{\mathrm R}(0)}
=\frac{1/2}{3/4}=\frac23=e^{-\beta\Delta F_{\mathrm{eq}}},
$$

$$
\frac{\mathsf P_{\mathrm F}(\varepsilon)}{\mathsf P_{\mathrm R}(-\varepsilon)}
=\frac{1/2}{1/4}=2
=e^{\beta\varepsilon}\frac23=3\cdot\frac23.
$$

二つの仕事値それぞれで[Crooks関係](#thm-itd2-crooks)と一致します。
<!-- solution-end -->

#### A4. 指数平均から平均の不等式

共通支持の二軌道で、正方向の確率を $(3/4,1/4)$、反転して並べた逆方向の確率を $(1/2,1/2)$ とする。$\Sigma$ を求めて指数平均を検算し、平均エントロピー生成が正であることを示せ。

- Level: A
- ID: ITD2-A4

<!-- solution-start -->
**詳細解答**　各経路比に対数を取れば $\Sigma_1=\log(3/2)$、$\Sigma_2=\log(1/2)=-\log2$ です。従って

$$
\langle e^{-\Sigma}\rangle
=\frac34\frac23+\frac14\cdot2
=\frac12+\frac12=1.
$$

平均の値は

$$
\langle\Sigma\rangle
=\frac34\log\frac32-\frac14\log2
=\frac14\log\frac{27}{16}>0
$$

です。二番目の軌道の $\Sigma$ は負ですが、平均は正です。確率比だけに関する例であり、特定の熱浴模型の実現可能性を別途主張するものではありません。
<!-- solution-end -->

#### A5. 逆操作の仕事の符号

$E(0,\lambda)=0$、$E(1,\lambda)=\lambda$、$\lambda_0=0,\lambda_1=\varepsilon,\lambda_2=0$、正軌道 $(x_0,x_1,x_2)=(1,0,1)$ とする。正方向の各quenchの仕事と、逆方向で接触を先に行うときの各quenchの仕事を求めよ。

- Level: A
- ID: ITD2-A5

<!-- solution-start -->
**詳細解答**

[軌道の仕事・熱の定義](../ITD1/index.md#def-itd1-path-work-heat)より、正の第1quenchは状態1で $\lambda_0\to\lambda_1$ を行うので $W_{{\mathrm F},1}=\varepsilon$、第2quenchは状態0で $\lambda_1\to\lambda_2$ を行うので $W_{{\mathrm F},2}=0$ です。

逆方向はまず状態1から0へ第2核の逆順の接触を行い、状態0のまま $\lambda_2\to\lambda_1$ とするので逆仕事は0です。次に状態0から1へ第1核の接触を行い、状態1で $\lambda_1\to\lambda_0$ と戻すので逆仕事は $-\varepsilon$ です。総仕事は $W_{\mathrm F}=\varepsilon$、$W_{\mathrm R}=-\varepsilon$ となり、対応する仕事が打ち消し合います。核の確率を用いずに仕事の符号を検算できました。
<!-- solution-end -->

### Level B：仮定の効き方と反例を調べる

#### B1. 支持が欠けたときの欠損質量

$p_0=(1,0)$、$K=\begin{pmatrix}3/4&1/4\\1/4&3/4\end{pmatrix}$、$r=p_1$、両状態のエネルギー0とする。正方向に可能な経路だけを列挙し、$\lambda_{\mathrm{abs}}$ と $\langle e^{-\Sigma_r}\rangle$ を二通りで計算せよ。

- Level: B
- ID: ITD2-B1

<!-- solution-start -->
**詳細解答**　[分布更新](../ITD1/index.md#prop-itd1-update)から $p_1=(3/4,1/4)$ です。正方向の支持は $(0,0)$ と $(0,1)$ で、それぞれの確率は $3/4,1/4$ です。対応する逆確率は $(3/4)(3/4)=9/16$ と $(1/4)(1/4)=1/16$ なので

$$
\langle e^{-\Sigma_r}\rangle
=\frac34\frac{9/16}{3/4}
+\frac14\frac{1/16}{1/4}
=\frac9{16}+\frac1{16}=\frac58.
$$

一方、正方向に存在しない $(1,0)$ と $(1,1)$ の逆確率はそれぞれ $r(0)K(0,1)=(3/4)(1/4)=3/16$、$r(1)K(1,1)=(1/4)(3/4)=3/16$ です。ゆえに

$$
\lambda_{\mathrm{abs}}=\frac3{16}+\frac3{16}=\frac38,
\qquad 1-\lambda_{\mathrm{abs}}=\frac58.
$$

[支持欠損の命題](#prop-itd2-support-correction)を用いた計算と直接の指数平均が一致します。
<!-- solution-end -->

#### B2. 非平衡初期分布に通常のJarzynski等式を適用できるか

$E_0=(0,0)$、$E_1=(0,\varepsilon)$、$\beta\varepsilon=\log3$、$K_1=I$ とする。正方向だけ初期分布を $p_0=(1,0)$ と変えた場合、$\langle e^{-\beta W}\rangle$ と平衡分配関数比 $Z_1/Z_0$ を比較し、不一致の原因を説明せよ。

- Level: B
- ID: ITD2-B2

<!-- solution-start -->
**詳細解答**　初期状態0が確率1なので、準位変更中も $E_0(0)=E_1(0)=0$、ゆえに $W=0$ が確率1です。従って

$$
\langle e^{-\beta W}\rangle=e^0=1.
$$

平衡分配関数は状態1も含んで

$$
Z_0=2,\qquad Z_1=1+\frac13=\frac43,\qquad
\frac{Z_1}{Z_0}=\frac23.
$$

一致しません。[Jarzynski等式](#thm-itd2-jarzynski)は初期分布が $\pi_0=(1/2,1/2)$ であることを必要とする形で証明されました。この模型では $p_0(1)=0$ なので、平衡逆実験が割り当てる一部の逆経路を正方向で回収できないことも破綻の機構です。指数平均の不一致を第二法則違反と解釈してはいけません。
<!-- solution-end -->

#### B3. 仕事が同じでも経路は複数ある

$\beta\varepsilon=\log2$、$E_0=(0,0)$、$E_1=(0,\varepsilon)$、$K_1=\begin{pmatrix}3/4&1/4\\1/2&1/2\end{pmatrix}$ とする。正は $\pi_0$、逆は $\pi_1$ から始める。正仕事分布と逆仕事分布を、異なる経路を足して導出し、Crooks関係を確かめよ。

- Level: B
- ID: ITD2-B3

<!-- solution-start -->
**詳細解答**　まず核は行和1、全成分が正で、非対角比 $(1/4)/(1/2)=1/2=e^{-\beta\varepsilon}$ ですから[局所詳細釣合い](../ITD1/index.md#def-itd1-local-detailed-balance)を満たします。$Z_0=2$、$Z_1=1+1/2=3/2$ より $\pi_0=(1/2,1/2)$、$\pi_1=(2/3,1/3)$、$e^{-\beta\Delta F_{\mathrm{eq}}}=3/4$ です。

正方向はquench時の初期状態で仕事が決まります。$x_0=0$ からの二軌道を足すと

$$
\mathsf P_{\mathrm F}(0)
=\frac12\frac34+\frac12\frac14=\frac12.
$$

$x_0=1$ からの二軌道を足すと $\mathsf P_{\mathrm F}(\varepsilon)=(1/2)(1/2)+(1/2)(1/2)=1/2$ です。

逆方向では先に $K_1$ に接触するので、逆quench直前の状態が仕事を決めます。[正準分布の不変性](../ITD1/index.md#prop-itd1-canonical-balance)を使ってもよいですが、直接足すと

$$
\begin{aligned}
\mathsf P_{\mathrm R}(0)&=\pi_1(0)K_1(0,0)+\pi_1(1)K_1(1,0)
=\frac23\frac34+\frac13\frac12=\frac23,\\
\mathsf P_{\mathrm R}(-\varepsilon)&=\pi_1(0)K_1(0,1)+\pi_1(1)K_1(1,1)
=\frac23\frac14+\frac13\frac12=\frac13.
\end{aligned}
$$

よって比は $(1/2)/(2/3)=3/4=e^{-\beta\Delta F_{\mathrm{eq}}}$ と $(1/2)/(1/3)=3/2=e^{\beta\varepsilon}(3/4)$ で、[Crooks関係](#thm-itd2-crooks)と一致します。各仕事値に二軌道が寄与しており、一本の経路の確率を仕事分布と混同していません。
<!-- solution-end -->

#### B4. 平均仕事の下限で等号になる操作

有限状態系で、すべての $x$ に対し $E(x,\lambda_1)=E(x,\lambda_0)+c$（定数 $c\in\mathbb R$）とする。一回のquenchの後に局所詳細釣合いを満たす核で接触し、初期は $\pi_0$ とする。$W$、$Z_1/Z_0$、$\Delta F_{\mathrm{eq}}$ を求め、Jarzynski等式と平均仕事下限の等号を確認せよ。

- Level: B
- ID: ITD2-B4

<!-- solution-start -->
**詳細解答**　状態 $x_0$ を固定したquenchの仕事は $W=E(x_0,\lambda_1)-E(x_0,\lambda_0)=c$ で、全軌道で同じです。分配関数は

$$
\begin{aligned}
Z_1&=\sum_xe^{-\beta(E(x,\lambda_0)+c)}
=e^{-\beta c}\sum_xe^{-\beta E(x,\lambda_0)}
=e^{-\beta c}Z_0,\\
\Delta F_{\mathrm{eq}}
&=-\beta^{-1}\log(Z_1/Z_0)=c.
\end{aligned}
$$

ゆえに $\langle e^{-\beta W}\rangle=e^{-\beta c}=Z_1/Z_0$、$\langle W\rangle=c=\Delta F_{\mathrm{eq}}$ です。核の接触では仕事をしないため、どの核による状態遷移が実現してもこの結論は変わりません。[Jarzynski等式の等号条件](#thm-itd2-jarzynski)で必要な「全軌道で $W=\Delta F_{\mathrm{eq}}$」も直接確認できました。
<!-- solution-end -->

### Level C：二段階の仕事分布と二種類の逆実験

#### C1. quench・二回の接触・戻し操作を一つの経路和で検算

$X=\{0,1\}$、$E(0,\lambda)=0$、$E(1,\lambda)=\lambda$、$\beta\varepsilon=\log2$、$\lambda_0=0,\lambda_1=\varepsilon,\lambda_2=0$ とする。初期は $\pi_0=(1/2,1/2)$ で、正方向は各quenchの後に

$$
K_1=\begin{pmatrix}3/4&1/4\\1/2&1/2\end{pmatrix},
\qquad
K_2=\begin{pmatrix}3/4&1/4\\1/4&3/4\end{pmatrix}
$$

と接触する。逆実験は $\pi_2=(1/2,1/2)$ から、$K_2$、戻しquench、$K_1$、戻しquenchの順に行う。

1. 両核の局所詳細釣合いと $\Delta F_{\mathrm{eq}}$ を確認せよ。
2. 正仕事分布 $\mathsf P_{\mathrm F}(-\varepsilon),\mathsf P_{\mathrm F}(0),\mathsf P_{\mathrm F}(\varepsilon)$ と指数平均、平均仕事を求めよ。
3. 逆仕事分布を独立に求め、Crooks関係を各仕事値で検算せよ。
4. 軌道 $\gamma=(1,0,1)$ で正逆の経路確率と仕事の経路比を直接検算せよ。また、逆実験を実際の終端分布 $p_2$ から始めるITD1の経路比とは何が異なるか説明せよ。

- Level: C
- ID: ITD2-C1

<!-- solution-start -->
**詳細解答**　まず $K_1$ の行和は1、非対角比は $(1/4)/(1/2)=1/2=e^{-\beta\varepsilon}$ です。$K_2$ の行和も1、$\lambda_2=0$ でエネルギー差は0、非対角比は $(1/4)/(1/4)=1$ です。対角の比は双方1ですから、すべての遷移対で[局所詳細釣合い](../ITD1/index.md#def-itd1-local-detailed-balance)を満たします。初期と最終の準位はともに $(0,0)$ なので $Z_0=Z_2=2$、$\Delta F_{\mathrm{eq}}=0$ です。

各quenchは第1段階で $\varepsilon x_0$、第2段階で $-\varepsilon x_1$ の仕事を生みます。したがって全仕事は $W_{\mathrm F}=\varepsilon(x_0-x_1)$ で、$x_2$ には依存しません。$x_2$ について $K_2$ の行和1を使って足すと、仕事値ごとの確率は

$$
\begin{aligned}
\mathsf P_{\mathrm F}(-\varepsilon)
&=p_0(0)K_1(0,1)\sum_{x_2}K_2(1,x_2)
=\frac12\frac14=\frac18,\\
\mathsf P_{\mathrm F}(0)
&=p_0(0)K_1(0,0)+p_0(1)K_1(1,1)
=\frac12\frac34+\frac12\frac12=\frac58,\\
\mathsf P_{\mathrm F}(\varepsilon)
&=p_0(1)K_1(1,0)=\frac12\frac12=\frac14.
\end{aligned}
$$

和は $(1+5+2)/8=1$ です。$e^{\beta\varepsilon}=2$、$e^{-\beta\varepsilon}=1/2$ だから

$$
\begin{aligned}
\langle e^{-\beta W_{\mathrm F}}\rangle
&=\frac18\cdot2+\frac58\cdot1+\frac14\cdot\frac12
=\frac14+\frac58+\frac18=1
=e^{-\beta\Delta F_{\mathrm{eq}}},\\
\langle W_{\mathrm F}\rangle
&=-\frac{\varepsilon}{8}+\frac{\varepsilon}{4}
=\frac{\varepsilon}{8}>0.
\end{aligned}
$$

逆方向はまず $\pi_2$ から $K_2$ と接触します。$\pi_2=(1/2,1/2)$ と対称な $K_2$ により、その後の $x_1$ の分布も $(1/2,1/2)$ です。これを直接確かめると、例えば

$$
\Pr_{\mathrm R}(x_1=0)
=\frac12\frac34+\frac12\frac14=\frac12,
$$

で、$x_1=1$ も $1/2$ です。次に $K_1(x_1,x_0)$ と接触した後、$x_0$ で最後の戻しquenchをします。対応する逆仕事は $W_{\mathrm R}=\varepsilon(x_1-x_0)$ なので

$$
\begin{aligned}
\mathsf P_{\mathrm R}(-\varepsilon)
&=\frac12K_1(0,1)=\frac18,\\
\mathsf P_{\mathrm R}(0)
&=\frac12K_1(0,0)+\frac12K_1(1,1)=\frac58,\\
\mathsf P_{\mathrm R}(\varepsilon)
&=\frac12K_1(1,0)=\frac14.
\end{aligned}
$$

ここで正の仕事 $w=-\varepsilon,0,\varepsilon$ に対して、[Crooks関係](#thm-itd2-crooks)の左辺を計算すると

$$
\begin{aligned}
\frac{\mathsf P_{\mathrm F}(-\varepsilon)}{\mathsf P_{\mathrm R}(\varepsilon)}
&=\frac{1/8}{1/4}=\frac12=e^{-\beta\varepsilon},\\
\frac{\mathsf P_{\mathrm F}(0)}{\mathsf P_{\mathrm R}(0)}
&=\frac{5/8}{5/8}=1,\\
\frac{\mathsf P_{\mathrm F}(\varepsilon)}{\mathsf P_{\mathrm R}(-\varepsilon)}
&=\frac{1/4}{1/8}=2=e^{\beta\varepsilon}.
\end{aligned}
$$

$\Delta F_{\mathrm{eq}}=0$ と一致します。

最後に特定の軌道 $(1,0,1)$ では、正の確率は $p_0(1)K_1(1,0)K_2(0,1)=(1/2)(1/2)(1/4)=1/16$ です。逆の確率は $\pi_2(1)K_2(1,0)K_1(0,1)=(1/2)(1/4)(1/4)=1/32$ なので比は2です。この軌道の仕事は $W_{\mathrm F}=\varepsilon$ で、[仕事の経路比](#thm-itd2-work-ratio)の右辺は $e^{\beta(\varepsilon-0)}=2$ です。

一方、実際の正方向の終端分布を[分布更新](../ITD1/index.md#prop-itd1-update)で計算すると、まず $p_1=(5/8,3/8)$、次に

$$
p_2(0)=\frac58\frac34+\frac38\frac14=\frac9{16},
\qquad p_2(1)=\frac7{16}.
$$

ITD1型の逆実験はこの $p_2$ から始めるため、同じ逆軌道 $(1,0,1)$ の確率は $(7/16)(1/4)(1/4)=7/256$、経路比は $(1/16)/(7/256)=16/7$ です。この $\log(16/7)$ は**実際の終端分布を使った全エントロピー生成**であり、本章の平衡逆実験による $\log2=\beta(W-\Delta F_{\mathrm{eq}})$ とは違います。これで二種類の逆実験の境界条件まで検算できました。
<!-- solution-end -->

## 7. 次に問うこと

正逆の経路確率を比べることで、指数型のゆらぎ関係、平均の第二法則、仕事と平衡自由エネルギーの関係を一続きに導けました。しかし、平衡分布を**初期に準備する**という条件は不可欠です。非平衡な分布の偏りが利用可能な仕事にどう寄与するのでしょうか。次は[SM3の正準自由エネルギー](../../SM/SM3/index.md#def-sm3-free-energy)と[INFO2の相対エントロピー](../../../応用系/INFO/INFO2/index.md#def-info2-relative-entropy)を結び、非平衡自由エネルギーへ進みます。
