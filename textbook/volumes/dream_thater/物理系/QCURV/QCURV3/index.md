# QCURV3 Bogoliubov変換と粒子数・表現の同値性

<!-- definition-example-audit: strict -->

[QCURV2の正振動数射影](../QCURV2/index.md#prop-qcurv2-projection)は、一つの古典場に対して正の一粒子内積とFock真空を作りました。しかし別の時刻・別の観測者が選んだ正振動数が、初めの正振動数と一致する保証はありません。二つの真空の違いを「粒子が何個あるか」という計算へ変換するのが、本章の主題です。

道筋は **二つのモード系の比較 → 保存内積と交換関係が課す制約 → 粒子数 → 時間依存模型での検算 → 無限自由度での限界** です。粒子数は選択した正振動数分解に依存します。一方で、同じ自由場の方程式と交換子を保存する必要があります。

背景は[QCURV1の曲率結合Klein–Gordon方程式](../QCURV1/index.md#def-qcurv1-kg-operator)を満たす実自由スカラー場とし、滑らかな時間向き付き4次元大域双曲時空、符号 $(-,+,+,+)$、実ポテンシャル $V=m^2+\xi R$ を仮定します。[QCURV2の保存KG内積](../QCURV2/index.md#def-qcurv2-kg-pairing)を使用します。モードの正規化や積分が正当化できるよう、最初は有限個の独立なモードに制限して導出し、無限個の場合に必要となる収束条件を最後に明示します。

## 1. 二つの正振動数はどのように混ざるか

一つ目の完全な正振動数モード系を $u_j$、二つ目を $v_a$ とします。以下では前者にin、後者にoutというラベルを付け、単なる二つの選択を比較するときにも使用します。物理的に過去・未来の粒子と解釈するには、各時期に時間並進対称性などの追加の選択基準が必要です。

両系をそれぞれ複素共役と合わせれば、同じ実解空間の複素化を張ると仮定します。モードの「完全」とはこの意味です。それぞれの正負規格化は

$$
\begin{aligned}
(u_i,u_j)_{\mathrm{KG}}&=\delta_{ij},&
(\bar u_i,\bar u_j)_{\mathrm{KG}}&=-\delta_{ij},&
(u_i,\bar u_j)_{\mathrm{KG}}&=0,\\
(v_a,v_b)_{\mathrm{KG}}&=\delta_{ab},&
(\bar v_a,\bar v_b)_{\mathrm{KG}}&=-\delta_{ab},&
(v_a,\bar v_b)_{\mathrm{KG}}&=0
\end{aligned}
$$

です。ここで $i,j$ はinモードの、$a,b$ はoutモードのラベルです。有限モードの場合には両者の個数は同じ $n$ です。KG内積は**第一引数に共役線形**なので、係数の複素共役を落とすと後の行列式の向きが変わってしまいます。

各outモードをinの正・負モードへ展開し、正負の混ざり方を数で測ることにします。これがBogoliubov係数を導入する理由です。次節で保存内積の条件を行列にまとめる際の符号と添字を一意にするため、まず次の展開規約を固定します。

<a id="def-qcurv3-bogoliubov"></a>

<!-- formal-statement-start -->
> **定義（Bogoliubov係数とin/outモード変換）**
> 上記の完全な二組の規格化モード $u_j,v_a$ に対し、複素係数 $\alpha_{aj},\beta_{aj}$ を

$$
v_a=\sum_j\left(\overline{\alpha_{aj}}\,u_j
-\overline{\beta_{aj}}\,\bar u_j\right),
\qquad
\alpha_{aj}=(v_a,u_j)_{\mathrm{KG}},
\quad
\beta_{aj}=(v_a,\bar u_j)_{\mathrm{KG}}
$$

> で定める。$\alpha$ は正振動数同士の成分、$\beta$ は正負振動数間の混合を記述する。和が無限のときは、選んだ解空間と位相においてモード展開が意味を持つことを別途仮定する。
<!-- formal-statement-end -->

定義式の係数を、第1節で仮定した正負規格化と[KG内積の共役線形性](../QCURV2/index.md#def-qcurv2-kg-pairing)から取り出して確かめます。$v_a$ が第一引数なので展開係数は共役され、任意のinラベル $k$ について

$$
\begin{aligned}
(v_a,u_k)_{\mathrm{KG}}
&=\sum_j\bigl(\alpha_{aj}(u_j,u_k)_{\mathrm{KG}}-\beta_{aj}(\bar u_j,u_k)_{\mathrm{KG}}\bigr)
=\alpha_{ak},\\
(v_a,\bar u_k)_{\mathrm{KG}}
&=\sum_j\bigl(\alpha_{aj}(u_j,\bar u_k)_{\mathrm{KG}}-\beta_{aj}(\bar u_j,\bar u_k)_{\mathrm{KG}}\bigr)
=\beta_{ak}.
\end{aligned}
$$

後者では負ノルムと展開の負符号が打ち消し合います。これは係数を**規格化から取り出す**仕組みで、超静的背景に限ったモード公式を一般の場合へ仮定なしに適用しているわけではありません。

<!-- definition-example-start: def-qcurv3-bogoliubov -->
### 直接例：一つの振動子の二つの正振動数

一つの正規化モード $u$ に対し、実数 $r$ を用いて

$$
v=\cosh r\,u-\sinh r\,\bar u
$$

と置きます。[$(u,u)=1$、$(\bar u,\bar u)=-1$](../QCURV2/index.md#def-qcurv2-kg-pairing)と交差項の零により

$$
\begin{aligned}
(v,v)&=\cosh^2r-\sinh^2r=1,\\
(v,\bar v)&=-\cosh r\sinh r+\sinh r\cosh r=0,\\
(\bar v,\bar v)&=\sinh^2r-\cosh^2r=-1.
\end{aligned}
$$

**定義の確認**：従って、正負に対する全規格化を満たします。定義に直接代入すると $\alpha=\cosh r$、$\beta=\sinh r$ です。

$r=0$ なら同じ正振動数を選び、$r\ne0$ なら $v$ に初めの負振動数が混ざります。この例では $\cosh^2r-\sinh^2r=1$ が保存内積の条件を満たす鍵です。
<!-- definition-example-end -->

## 2. 保存内積は係数を自由にはしない

任意の二つの係数配列を選ぶと、outモードは正規化を失ってしまいます。さらに場の量子化後には消滅・生成演算子の交換関係も失いかねません。保存内積が課す二組の条件を、ここで全成分から導きます。

有限モードでは $\alpha=(\alpha_{aj})$、$\beta=(\beta_{aj})$ を、outラベル $a$ を行、inラベル $j$ を列とする $n\times n$ 行列とします。記号 $\dagger$ は共役転置、$T$ は転置、$I$ はこの $n$ 次の単位行列です。これで行列積の添字の縮約方向も固定されます。

<a id="thm-qcurv3-canonical"></a>

<!-- formal-statement-start -->
> **定理（Bogoliubov係数の正準条件）**
> 同じ有限次元複素化解空間の完全な正負基底 $\{u_j,\bar u_j\}_{j=1}^n$ と $\{v_a,\bar v_a\}_{a=1}^n$ が第1節のKG規格化を満たし、[Bogoliubov展開](#def-qcurv3-bogoliubov)を持つとする。このとき $n\times n$ 行列 $\alpha,\beta$ は

$$
\boxed{\alpha\alpha^\dagger-\beta\beta^\dagger=I},
\qquad
\boxed{\alpha\beta^T-\beta\alpha^T=0}
$$

> を満たす。逆変換が存在し、

$$
\alpha^\dagger\alpha-\beta^T\bar\beta=I,
\qquad
\alpha^\dagger\beta-\beta^T\bar\alpha=0
$$

> も成り立つ。無限次元ではこれらの式を、定義域・有界性・和の収束が確保された場合の作用素恒等式として読む。
<!-- formal-statement-end -->

### 証明の見取り図

まず二つのoutモードの[KG内積](../QCURV2/index.md#def-qcurv2-kg-pairing)をin基底で四項展開します。正正の寄与は正、負負の寄与は負、交差項は零です。正モードと共役モードの内積を零にすると第二条件が得られます。完全性は変換を逆向きにも実行できることを保証します。

<!-- proof-start -->
### 証明

定義の展開と、第一引数に対する共役線形性を使って

$$
\begin{aligned}
(v_a,v_b)_{\mathrm{KG}}
&=\sum_{j,k}(\bar\alpha_{aj}u_j-\bar\beta_{aj}\bar u_j,
                 \bar\alpha_{bk}u_k-\bar\beta_{bk}\bar u_k)_{\mathrm{KG}}\\
&=\sum_j\left(\alpha_{aj}\bar\alpha_{bj}
                 -\beta_{aj}\bar\beta_{bj}\right)
 =(\alpha\alpha^\dagger-\beta\beta^\dagger)_{ab}.
\end{aligned}
$$

これが $\delta_{ab}$ に等しいことから第一条件が得られます。また $\bar v_b=\sum_j(\alpha_{bj}\bar u_j-\beta_{bj}u_j)$ なので

$$
\begin{aligned}
(v_a,\bar v_b)_{\mathrm{KG}}
&=\sum_j\left[-\alpha_{aj}\beta_{bj}
                 +\beta_{aj}\alpha_{bj}\right]\\
&=-(\alpha\beta^T-\beta\alpha^T)_{ab}=0.
\end{aligned}
$$

第二条件も得られました。ここでは $\beta^\dagger$ でなく $\beta^T$ が現れます。両係数が**共役された別の行**から現れる先ほどの内積とは異なるためです。

逆向きの条件を得るため、展開を

$$
\begin{pmatrix}v\\\bar v\end{pmatrix}
=\underbrace{\begin{pmatrix}\bar\alpha&-\bar\beta\\-\beta&\alpha\end{pmatrix}}_{C}
\begin{pmatrix}u\\\bar u\end{pmatrix}
$$

と書きます。ここで $u,v$ はそれぞれ正モードを列に並べたもの、$\bar u,\bar v$ はその成分ごとの共役です。

ここで $\operatorname{diag}(I,-I)$ は対角ブロックに $I,-I$ を置き、他を零とする行列です。符号付きKGのGram行列を $\eta=\operatorname{diag}(I,-I)$ とします。第一引数の共役線形性により変換後のGram行列は $\bar C\eta C^T$ です。これは実行列 $\eta$ に等しく、複素共役を取れば $C\eta C^\dagger=\eta$ となります。実際、左上・右上ブロックは先ほどの二条件の複素共役で

$$
\bar\alpha\alpha^T-\bar\beta\beta^T=I,
\qquad -\bar\alpha\beta^\dagger+\bar\beta\alpha^\dagger=0
$$

です。

有限次元では $\eta$ が可逆であり、$C\eta C^\dagger=\eta$ から $C$ は全射、したがって正方行列として可逆です。よって

$$
C^{-1}=\eta C^\dagger\eta
=\begin{pmatrix}\alpha^T&\beta^\dagger\\\beta^T&\alpha^\dagger\end{pmatrix}.
$$

この式を $C^{-1}C=I$ に代入し、左上・右上のブロックを取ると

$$
\alpha^T\bar\alpha-\beta^\dagger\beta=I,
\qquad -\alpha^T\bar\beta+\beta^\dagger\alpha=0
$$

です。両式の複素共役を取って

$$
\alpha^\dagger\alpha-\beta^T\bar\beta=I,\qquad
\alpha^\dagger\beta-\beta^T\bar\alpha=0
$$

を得ます。あるいはinモードのKG規格化をout基底で展開しても同じ結果になります。
<!-- proof-end -->

この二条件には異なる役割があります。第一条件は各outモードの**正しい符号付きノルム**を、第二条件はoutの正モードと負モードの**直交性**を保ちます。第一条件だけでは第二条件は一般に従いません。

### 例：混合のない基底回転

同じ正振動数空間の中で、ユニタリ行列 $U$（$UU^\dagger=I$）を使い

$$
v_a=\sum_j\bar U_{aj}u_j
$$

と置きます。この場合 $\alpha=U$、$\beta=0$ であり、二条件は $UU^\dagger=I$ と $0=0$ になります。モードの名札や基底を替えても、負振動数が混ざらなければ粒子は生成されません。

## 3. in真空からout粒子が見える仕組み

[$u_j$ によるFock量子化](../QCURV2/index.md#def-qcurv2-wightman)では $a_j|0_{\mathrm{in}}\rangle=0$ とし、同じ場を二組のモードで次のように展開します。

$$
\widehat\phi=\sum_j(a_ju_j+a_j^\dagger\bar u_j)
=\sum_a(b_av_a+b_a^\dagger\bar v_a).
$$

$b_a$ は**outモードを正振動数として測る粒子の消滅演算子**です。

[QFT4のFock交換関係](../../QFT/QFT4/index.md#thm-qft4-fock-ccr)を使い、有限粒子領域で $[a_i,a_j^\dagger]=\delta_{ij}$、$[a_i,a_j]=0$ とします。Bogoliubov変換はこの交換子を保たなければなりません。

<a id="prop-qcurv3-number"></a>

<!-- formal-statement-start -->
> **命題（消滅演算子の変換とin真空のout粒子数）**
> 第2節の有限完全モード系と[正準条件](#thm-qcurv3-canonical)を仮定する。in演算子 $a_j$ とout演算子 $b_a$ の関係および逆関係は

$$
b_a=\sum_j(\alpha_{aj}a_j+\beta_{aj}a_j^\dagger),
\qquad
a_j=\sum_a(\bar\alpha_{aj}b_a-\beta_{aj}b_a^\dagger).
$$

> in真空 $a_j|0_{\mathrm{in}}\rangle=0$ に対し、out粒子数作用素 $N_a^{\mathrm{out}}=b_a^\dagger b_a$ の期待値は

$$
\boxed{\langle0_{\mathrm{in}}|N_a^{\mathrm{out}}|0_{\mathrm{in}}\rangle
=\sum_j|\beta_{aj}|^2}.
$$

> 無限モードの場合には各和の存在を別途確認し、総和の有限性をこの式だけから仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

場を同じ古典解基底で比較すると演算子の変換が得られます。真空期待値では $\langle aa^\dagger\rangle$ だけが残り、正準交換子がデルタを与えます。粒子数が $\beta$ の二乗になるのは偶然の公式ではありません。

<!-- proof-start -->
### 証明

第1節の[モード展開](#def-qcurv3-bogoliubov)をout表示の場へ代入すると、$u_j$ に掛かる演算子係数は

$$
\sum_a\left(\bar\alpha_{aj}b_a-\beta_{aj}b_a^\dagger\right).
$$

これをin表示の $a_j$ と比較して逆関係を得ます。その随伴は

$$
a_j^\dagger=\sum_c(\alpha_{cj}b_c^\dagger-\bar\beta_{cj}b_c)
$$

です。両式を $\sum_j(\alpha_{aj}a_j+\beta_{aj}a_j^\dagger)$ に代入すると、$b_c$ の係数と $b_c^\dagger$ の係数はそれぞれ

$$
(\alpha\alpha^\dagger-\beta\beta^\dagger)_{ac}=\delta_{ac},
\qquad -(\alpha\beta^T-\beta\alpha^T)_{ac}=0
$$

となり、求める $b_a$ を再現します。[正準条件](#thm-qcurv3-canonical)による逆変換の検算です。さらに交換関係を直接検算すると

$$
\begin{aligned}
[b_a,b_b^\dagger]
&=\sum_j(\alpha_{aj}\bar\alpha_{bj}-\beta_{aj}\bar\beta_{bj})
=\delta_{ab},\\
[b_a,b_b]
&=\sum_j(\alpha_{aj}\beta_{bj}-\beta_{aj}\alpha_{bj})=0.
\end{aligned}
$$

[$N=b^\dagger b$ の定義](../../QFT/QFT4/index.md#def-qft4-number-hamiltonian)と $a_j|0_{\mathrm{in}}\rangle=0$ により

$$
\begin{aligned}
\langle N_a^{\mathrm{out}}\rangle_{\mathrm{in}}
&=\sum_{j,k}\langle
(\bar\alpha_{aj}a_j^\dagger+\bar\beta_{aj}a_j)
(\alpha_{ak}a_k+\beta_{ak}a_k^\dagger)\rangle_{\mathrm{in}}\\
&=\sum_{j,k}\bar\beta_{aj}\beta_{ak}
  \langle a_ja_k^\dagger\rangle_{\mathrm{in}}\\
&=\sum_{j,k}\bar\beta_{aj}\beta_{ak}\delta_{jk}
=\sum_j|\beta_{aj}|^2.
\end{aligned}
$$

第二行では $\langle a_j^\dagger a_k\rangle$、$\langle a_j a_k\rangle$、$\langle a_j^\dagger a_k^\dagger\rangle$ が零です。第三行は $a_ja_k^\dagger=\delta_{jk}+a_k^\dagger a_j$ を使っています。
<!-- proof-end -->

同じ場のin真空でも、$\beta\ne0$ ならout粒子数は一般に正になります。これは時空の一点で絶対的な「粒子」が生まれたという主張ではなく、**どのモード・どの真空で数えるか**を指定した期待値です。$\beta=0$ なら二つのFock真空は有限モードでは同じベクトル（位相を除く）を選びます。

## 4. 周波数急変振動子で符号と係数を検算する

場の各モードが時間依存を受けると、初期に正振動数だった解が後期には正・負の混合になります。その最小模型として、時刻 $t=0$ に振動数が急に切り替わる一つの振動子を考えます。これは背景曲率についての一般定理ではなく、モード接続の**計算模型**です。

ここで $q=q(t)$ は一変数の複素値解で、時間微分記法は

$$
q'=\frac{dq}{dt},\qquad q''=\frac{d^2q}{dt^2}
$$

とします。空間座標を固定する偏微分 $\partial_t$ とは異なり、独立変数は $t$ だけです。区分的に一定で有限な $\omega(t)^2$ を用い、切替点でデルタ型の外力を加えないことを仮定します。

<a id="prop-qcurv3-quench"></a>

<!-- formal-statement-start -->
> **命題（周波数急変振動子の粒子生成）**
> 正の定数 $\omega_{\mathrm{in}},\omega_{\mathrm{out}}$ に対し、実関数 $\omega(t)^2$ が $t<0$ で $\omega_{\mathrm{in}}^2$、$t>0$ で $\omega_{\mathrm{out}}^2$ を取り、次の方程式を満たすとする。

$$
q''+\omega(t)^2q=0
$$

> $q,q'$ を $t=0$ で連続に接続し、各領域の正振動数解をそれぞれ

$$
\frac{e^{-i\omega_{\mathrm{in}}t}}{\sqrt{2\omega_{\mathrm{in}}}},
\qquad \frac{e^{-i\omega_{\mathrm{out}}t}}{\sqrt{2\omega_{\mathrm{out}}}}
$$

> と規格化する。両者を同じ全時刻の解として接続したin/outモードのBogoliubov係数は

$$
\alpha=\frac12\left(\sqrt{\frac{\omega_{\mathrm{out}}}{\omega_{\mathrm{in}}}}
+\sqrt{\frac{\omega_{\mathrm{in}}}{\omega_{\mathrm{out}}}}\right),
\qquad
\beta=\frac12\left(\sqrt{\frac{\omega_{\mathrm{out}}}{\omega_{\mathrm{in}}}}
-\sqrt{\frac{\omega_{\mathrm{in}}}{\omega_{\mathrm{out}}}}\right).
$$

> 従ってin真空のout粒子数は

$$
\langle N^{\mathrm{out}}\rangle_{\mathrm{in}}
=|\beta|^2
=\frac{(\omega_{\mathrm{out}}-\omega_{\mathrm{in}})^2}
{4\omega_{\mathrm{in}}\omega_{\mathrm{out}}}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

急変点で場とその時間微分を保ちます。区分的に滑らかな解をデルタ型の外力なしに接続するには、$q,q'$ の片側極限が一致する必要があります。両者が局所有界であれば、微分方程式を切替点の両側にわたって積分して

$$
\begin{aligned}
q'(\varepsilon)-q'(-\varepsilon)
&=-\int_{-\varepsilon}^{\varepsilon}\omega(t)^2q(t)\,dt\longrightarrow0,\\
q(\varepsilon)-q(-\varepsilon)
&=\int_{-\varepsilon}^{\varepsilon}q'(t)\,dt\longrightarrow0
\end{aligned}
$$

となります。out正振動数解をin側へ延長して正・負の線形結合にし、接続条件を二本の一次方程式にします。係数の差には時間微分の符号が効きます。

<!-- proof-start -->
### 証明

$t<0$ のinモードを $u=e^{-i\omega_{\mathrm{in}}t}/\sqrt{2\omega_{\mathrm{in}}}$ とします。outモード $v$ を過去側へ延長すると、係数が実であることを利用して $v=\alpha u-\beta\bar u$ と書けます。$t=0$ で

$$
v(0)=\frac1{\sqrt{2\omega_{\mathrm{out}}}},\qquad
v'(0)=-i\sqrt{\frac{\omega_{\mathrm{out}}}{2}}.
$$

一方、in側では

$$
v(0)=\frac{\alpha-\beta}{\sqrt{2\omega_{\mathrm{in}}}},
\qquad
v'(0)=\frac{-i\omega_{\mathrm{in}}(\alpha+\beta)}
{\sqrt{2\omega_{\mathrm{in}}}}.
$$

それぞれを等置すると

$$
\alpha-\beta=\sqrt{\frac{\omega_{\mathrm{in}}}{\omega_{\mathrm{out}}}},
\qquad
\alpha+\beta=\sqrt{\frac{\omega_{\mathrm{out}}}{\omega_{\mathrm{in}}}}.
$$

二式を加減して上記の $\alpha,\beta$ を得ます。$x=\sqrt{\omega_{\mathrm{out}}/\omega_{\mathrm{in}}}>0$ とすれば

$$
\alpha^2-\beta^2
=\frac{(x+x^{-1})^2-(x-x^{-1})^2}{4}=1.
$$

よって[正準条件](#thm-qcurv3-canonical)も満たされ、[粒子数命題](#prop-qcurv3-number)から

$$
|\beta|^2=\frac14\left(
\frac{\omega_{\mathrm{out}}}{\omega_{\mathrm{in}}}
+\frac{\omega_{\mathrm{in}}}{\omega_{\mathrm{out}}}-2\right)
=\frac{(\omega_{\mathrm{out}}-\omega_{\mathrm{in}})^2}
{4\omega_{\mathrm{in}}\omega_{\mathrm{out}}}
$$

を得ます。
<!-- proof-end -->

例えば $\omega_{\mathrm{out}}=4\omega_{\mathrm{in}}$ なら $\alpha=5/4$、$\beta=3/4$、生成粒子数は $9/16$ です。等しい周波数では $\beta=0$。逆に急変点で $q$ だけ接続して $q'$ を接続しなければ、二つ目の方程式が失われ、係数も正準規格化も確定しません。

## 5. 無限個のモード、波束、表現の同値性

連続スペクトルでは正規化が $\delta(\omega-\omega')$ になります。このとき一つの厳密な周波数 $\omega$ の演算子 $b_\omega$ は演算子値分布であり、$b_\omega^\dagger b_\omega$ をそのまま一個の粒子数と呼ぶと $\delta(0)$ のような無意味な記号を生みます。測定する周波数帯を**波束**としてまとめます。

連続ラベルを $\omega$、in側のラベルを $\lambda$ とします。$f\in L^2(d\omega)$ は次を満たす複素関数とします。

$$
\int|f(\omega)|^2d\omega=1
$$

$\beta(\omega,\lambda)$ は連続ラベル版の第1節の係数です。ここでの波束規約は $b_f=\int f(\omega)b_\omega\,d\omega$（$f$ に関して線形）で、その随伴には $\overline{f(\omega)}$ が付きます。

分布としての交換関係 $[b_\omega,b_{\omega'}^\dagger]=\delta(\omega-\omega')$ を正規化された試験波束に作用させると

$$
[b_f,b_f^\dagger]
=\iint f(\omega)\overline{f(\omega')}\delta(\omega-\omega')\,d\omega\,d\omega'
=\int|f(\omega)|^2d\omega=1.
$$

係数 $\beta$ を重ねる際にも $f$（共役ではない）を掛けるため、複素位相が残ります。以下の積分はsmearingが定義できる条件の下で読みます。

また無限個のモードでは、各出射モードの粒子数が有限でも、全出射モードを足すと発散することがあります。二重和の二乗可和性を測る **Hilbert–Schmidt（HS）条件** が、Fock表現の同値性と関係します。

<a id="def-qcurv3-wavepacket-hs"></a>

<!-- formal-statement-start -->
> **定義（波束粒子数とHilbert–Schmidt条件）**
> Bogoliubov変換 $b_a=\sum_j(\alpha_{aj}a_j+\beta_{aj}a_j^\dagger)$ があり、関係する和・積分が存在するとする。正規化された離散波束 $b_f=\sum_a f_a b_a$（$\sum_a|f_a|^2=1$）の混合係数とin真空中の平均粒子数を

$$
\beta_{fj}=\sum_a f_a\beta_{aj},
\qquad
\langle N_f\rangle_{\mathrm{in}}=\sum_j|\beta_{fj}|^2
$$

> とする。連続ラベルでは $\beta_{f\lambda}=\int f(\omega)\beta(\omega,\lambda)d\omega$ とし、右辺の和を $\lambda$ についての積分に置き換える。$\beta$ が二乗可和、すなわち

$$
\|\beta\|_{\mathrm{HS}}^2=\sum_{a,j}|\beta_{aj}|^2<\infty
$$

> （連続ラベルなら対応する二重積分が有限）であるとき、$\beta$ はHilbert–Schmidtと呼ぶ。任意の正規直交基底に関して同じ条件となる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv3-wavepacket-hs -->
### 直接例：二つの独立モードの波束

二つの独立した同じ強さのsqueeze、すなわち $\alpha=\cosh r\,I_2$、$\beta=\sinh r\,I_2$ を取ります。第2節の[正準条件](#thm-qcurv3-canonical)は

$$
\alpha\alpha^\dagger-\beta\beta^\dagger
=(\cosh^2r-\sinh^2r)I_2=I_2,
\qquad \alpha\beta^T-\beta\alpha^T=0
$$

と確かめられます。$f=(1,i)/\sqrt2$ とすれば

$$
b_f=\frac{b_1+i b_2}{\sqrt2},
\quad
(\beta_{f1},\beta_{f2})=
\frac{\sinh r}{\sqrt2}(1,i),
\quad
\langle N_f\rangle=\frac{\sinh^2r}{2}+\frac{\sinh^2r}{2}=\sinh^2r.
$$

**定義の確認**：正規化は $|1/\sqrt2|^2+|i/\sqrt2|^2=1$ で、波束の交換子も1です。全モードでは $\|\beta\|_{\mathrm{HS}}^2=2\sinh^2r$。**一つの波束の粒子数**と**全モードの粒子数**は、ここでも別の量です。
<!-- definition-example-end -->

無限次元の一般論では、同じ実シンプレクティック解空間の適切なHilbert完成上で、正負モードを比較する写像が**有界で保存形式を保つ**と仮定します。このときボース場の **Shale–Stinespring判定** は、変換がin Fock空間上のユニタリ演算子で実装できることと $\beta$ のHS性が同値だと述べます。これは無限次元作用素論の定理であり、ここでは一般の非対角変換に対する完全証明を黒箱とします。次の対角模型では、真空ベクトルの収束を直接調べて判定の意味を確認できます。

<a id="prop-qcurv3-diagonal-squeeze"></a>

<!-- formal-statement-start -->
> **命題（対角squeeze列のFock真空と総粒子数）**
> 可算個の独立したボースモード $a_j$ のin Fock空間を考え、実数 $r_j\ge0$ に対し $b_j=\cosh r_j\,a_j+\sinh r_j\,a_j^\dagger$ とする。有限個のモードについてのout真空は

$$
|0_{\mathrm{out}}^{(n)}\rangle=
\bigotimes_{j=1}^{n}
\left[(\cosh r_j)^{-1/2}
\exp\left(-\frac{\tanh r_j}{2}(a_j^\dagger)^2\right)|0_j\rangle\right]
\ \otimes\!\!\bigotimes_{j>n}|0_j\rangle.
$$

> これらがin Fock空間で規格化された真空ベクトルへ収束する必要十分条件は

$$
\sum_{j=1}^{\infty}\sinh^2r_j<\infty.
$$

> 同じ和はin真空で測ったoutの全平均粒子数 $\sum_j\langle b_j^\dagger b_j\rangle_{\mathrm{in}}$ であり、$\beta=\operatorname{diag}(\sinh r_j)$ のHSノルムの二乗である。
<!-- formal-statement-end -->

### 証明の見取り図

一モードで $b|0_b\rangle=0$ を満たす偶数粒子の重ね合わせを作ります。有限積の真空同士の内積を計算すると、追加したモードの規格化因子だけが残ります。積の収束を対数の和へ直せば、HS条件と直接つながります。

<!-- proof-start -->
### 証明

一モードで $r\ge0$ とし、以下の略記を使います。

$$
c=\cosh r,\qquad s=\sinh r,\qquad t=s/c=\tanh r\in[0,1)
$$

真空候補を $|\psi\rangle=C\exp[-t(a^\dagger)^2/2]|0\rangle$ とします。まず指数をFock基底の級数として展開します。係数のノルム二乗は

$$
\sum_{k\ge0}\binom{2k}{k}(t^2/4)^k
$$

となり、$t<1$ で収束します。その各項に $a$ を作用させても、粒子数に由来する多項式因子が掛かるだけなので収束します。$[a,(a^\dagger)^2]=2a^\dagger$ を有限部分和に適用し、ノルム極限を取ると

$$
a\exp[-t(a^\dagger)^2/2]|0\rangle
=-t a^\dagger\exp[-t(a^\dagger)^2/2]|0\rangle
$$

を得ます。従って $(ca+sa^\dagger)|\psi\rangle=(-ct+s)a^\dagger|\psi\rangle=0$ です。展開のノルムは

$$
\begin{aligned}
\|e^{-t(a^\dagger)^2/2}|0\rangle\|^2
&=\sum_{k=0}^\infty\frac{(2k)!}{(k!)^2\,4^k}t^{2k}\\
&=(1-t^2)^{-1/2}=\cosh r,
\end{aligned}
$$

最後の等号は $1-\tanh^2r=1/\cosh^2r$ によります。ゆえに $C=(\cosh r)^{-1/2}$ で規格化されます。

$n<m$ の二つの有限積真空の内積は、$n+1,\ldots,m$ 番目だけが真空との重なりを持つため

$$
\langle0_{\mathrm{out}}^{(n)}|0_{\mathrm{out}}^{(m)}\rangle
=\prod_{j=n+1}^{m}(\cosh r_j)^{-1/2}
=\exp\left(-\frac12\sum_{j=n+1}^{m}\log\cosh r_j\right).
$$

両ベクトルのノルムは1なので、差のノルム二乗は $2-2\langle0_{\mathrm{out}}^{(n)}|0_{\mathrm{out}}^{(m)}\rangle$ です。従ってCauchy列になることと $\sum_j\log\cosh r_j<\infty$ は同値です。$\log\cosh r_j=\tfrac12\log(1+\sinh^2r_j)$ と置き、$x\ge0$ について $0\le x\le1$ なら $x/2\le\log(1+x)\le x$、$x\ge1$ なら $\log(1+x)\ge\log2$ を使うと、対数級数と $\sum_j\sinh^2r_j$ の収束は同値です。

最後に[粒子数の公式](#prop-qcurv3-number)を各モードへ適用し、$\langle b_j^\dagger b_j\rangle_{\mathrm{in}}=\sinh^2r_j$ を足せば主張の総粒子数とHSノルムを得ます。
<!-- proof-end -->

この命題は「無限個のモードがあるから二つの真空は必ず異なる表現」という誤解を退けます。必要なのはモードの個数ではなく、**正負の混合の二乗和**です。一方、非対角の一般変換では対角模型だけでShale–Stinespring判定全体を証明したことにはなりません。

連続スペクトルで長時間の定常生成を扱う際は、単一周波数に現れるデルタ関数を自乗したり $\delta(0)$ を「無限個の一粒子」と解釈したりせず、正規化波束・有限観測時間・粒子数密度または流束を区別します。将来扱う宇宙膨張とブラックホール放射では、この区別が不可欠です。

## 6. 何が不変で、何が選択依存か

| 同じ実自由場で保存するもの | モード・状態の選択によって変わるもの |
| --- | --- |
| 場の方程式と古典解の空間 | 正振動数と負振動数の分け方 |
| [保存KG形式](../QCURV2/index.md#thm-qcurv2-conservation)・CCR | in/outの真空と二点関数の対称部分 |
| Bogoliubov係数の正準条件 | out粒子数のin真空期待値 |

非零の $\beta$ は二つの正振動数選択が一致しないことを示します。しかし「$\beta\ne0$」だけで「Fock表現がユニタリに同値でない」とは言えません。有限自由度ではBogoliubov変換をユニタリに実装でき、無限自由度ではHS条件を調べる必要があります。次に時間依存する宇宙背景を扱うときには、**どの時期の真空か、どのモードで測るか、どの極限で粒子数を定めるか**が計算の一部になります。

## 演習

### Level A：規約と基本操作

<a id="ex-qcurv3-a01"></a>
#### QCURV3-A01 係数をKG内積から読み取る
- Level: A

$(u,u)=1$、$(\bar u,\bar u)=-1$、$(u,\bar u)=0$ とする。実数 $r$ に対し $v=\cosh r\,u-\sinh r\,\bar u$ が与えられた。定義の内積から $\alpha=(v,u)$、$\beta=(v,\bar u)$ を求め、$(v,v)$ を確かめよ。

<!-- solution-start -->
**詳細解答。** 第一引数の共役線形性と[KG内積の符号](../QCURV2/index.md#def-qcurv2-kg-pairing)から

$$
\alpha=\cosh r\,(u,u)-\sinh r\,(\bar u,u)=\cosh r,
$$

$$
\beta=\cosh r\,(u,\bar u)-\sinh r\,(\bar u,\bar u)=\sinh r.
$$

交差項が消えるため $(v,v)=\cosh^2r-\sinh^2r=1$。$\beta$ の前の負符号を落とすと誤って $-\sinh r$ になります。
<!-- solution-end -->

<a id="ex-qcurv3-a02"></a>
#### QCURV3-A02 正準条件は二つある
- Level: A

二モードの係数を $\alpha=cI_2$、$\beta=sI_2$ とする。$c=\cosh r$、$s=\sinh r$、$r\in\mathbb R$ としたとき、二組の[正準条件](#thm-qcurv3-canonical)を行列積で直接確認せよ。

<!-- solution-start -->
**詳細解答。** 実行列なので $\alpha^\dagger=cI_2$、$\beta^\dagger=sI_2$。従って

$$
\alpha\alpha^\dagger-\beta\beta^\dagger
=(c^2-s^2)I_2=I_2.
$$

第二条件は $\alpha\beta^T-\beta\alpha^T=csI_2-scI_2=0$。一つ目がノルム、二つ目が正負直交に対応し、両方を確認して初めてCCRを保つBogoliubov変換と判定できます。
<!-- solution-end -->

<a id="ex-qcurv3-a03"></a>
#### QCURV3-A03 正振動数内の回転では粒子は生まれない
- Level: A

$\theta\in\mathbb R$ とし、二モードで次の係数を与える。正準条件と二つのoutモードのin真空中の平均粒子数を求めよ。

$$
\alpha=\begin{pmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{pmatrix},
\qquad \beta=0
$$

<!-- solution-start -->
**詳細解答。** $\alpha\alpha^\dagger$ の対角成分と非対角成分はそれぞれ

$$
\cos^2\theta+\sin^2\theta=1,
\qquad \cos\theta\sin\theta-\sin\theta\cos\theta=0
$$

です。従って第一条件は成立し、第二条件は $\beta=0$ から零です。[粒子数命題](#prop-qcurv3-number)では各行の $\sum_j|\beta_{aj}|^2=0$ なので、両outモードの平均粒子数は零です。
<!-- solution-end -->

<a id="ex-qcurv3-a04"></a>
#### QCURV3-A04 消滅演算子を展開して粒子数を出す
- Level: A

一モードで $[a,a^\dagger]=1$、$a|0_a\rangle=0$、$b=c a+s a^\dagger$、$c=\cosh r,s=\sinh r$ とする。$\langle0_a|b^\dagger b|0_a\rangle$ を公式の引用なしに求めよ。

<!-- solution-start -->
**詳細解答。** $b^\dagger=c a^\dagger+s a$ だから

$$
b^\dagger b=c^2a^\dagger a+cs(a^\dagger)^2
+cs a^2+s^2aa^\dagger.
$$

最初の三項の真空期待値は零です。$aa^\dagger=1+a^\dagger a$ から $\langle aa^\dagger\rangle=1$ なので、答えは $s^2=\sinh^2r$。この一項だけが残る理由は正準交換子です。
<!-- solution-end -->

<a id="ex-qcurv3-a05"></a>
#### QCURV3-A05 正規化波束と全粒子数を区別する
- Level: A

二つの独立モードに $\alpha=cI_2$、$\beta=sI_2$（$c^2-s^2=1$、$c,s\in\mathbb R$）を与える。$b_f=(b_1+i b_2)/\sqrt2$ について $[b_f,b_f^\dagger]$、in真空の $\langle b_f^\dagger b_f\rangle$、二モード全体の平均粒子数を求めよ。

<!-- solution-start -->
**詳細解答。** $[b_a,b_b^\dagger]=\delta_{ab}$ だから

$$
[b_f,b_f^\dagger]
=\frac12([b_1,b_1^\dagger]+[b_2,b_2^\dagger])=1.
$$

波束の混合係数は $(s,is)/\sqrt2$。従って[波束の定義](#def-qcurv3-wavepacket-hs)から

$$
\langle b_f^\dagger b_f\rangle
=|s/\sqrt2|^2+|is/\sqrt2|^2=s^2.
$$

全体では各行が $s^2$ なので $2s^2$。一つの規格化波束と全体の和を混同しません。
<!-- solution-end -->

### Level B：導出と条件の使い分け

<a id="ex-qcurv3-b01"></a>
#### QCURV3-B01 正準条件から逆変換を作る
- Level: B

有限個のボース演算子を列にまとめ、$b=\alpha a+\beta a^\dagger$、$b^\dagger=\bar\beta a+\bar\alpha a^\dagger$ とする。$\alpha\alpha^\dagger-\beta\beta^\dagger=I$ と $\alpha\beta^T-\beta\alpha^T=0$ を仮定し、逆変換 $a=\alpha^\dagger b-\beta^T b^\dagger$ を行列で導け。ここで $a^\dagger,b^\dagger$ の列は各成分の随伴を並べたものとする。

<!-- solution-start -->
**詳細解答。** まず

$$
\mathcal M=\begin{pmatrix}\alpha&\beta\\\bar\beta&\bar\alpha\end{pmatrix},
\qquad
\eta=\begin{pmatrix}I&0\\0&-I\end{pmatrix}
$$

を置くと、与えられた二条件とその複素共役は $\mathcal M\eta\mathcal M^\dagger=\eta$ です。有限次元で $\mathcal M$ は可逆なので

$$
\mathcal M^{-1}=\eta\mathcal M^\dagger\eta
=\begin{pmatrix}\alpha^\dagger&-\beta^T\\-\beta^\dagger&\alpha^T\end{pmatrix}.
$$

これを $(b,b^\dagger)^T=\mathcal M(a,a^\dagger)^T$ の左から作用させ、上段を読むと $a=\alpha^\dagger b-\beta^T b^\dagger$ です。成分では $a_j=\sum_a(\bar\alpha_{aj}b_a-\beta_{aj}b_a^\dagger)$。負符号は$\eta$の負ノルム成分に由来します。
<!-- solution-end -->

<a id="ex-qcurv3-b02"></a>
#### QCURV3-B02 周波数急変の接続条件から再導出する
- Level: B

$q''+\omega(t)^2q=0$ の正の振動数を $t<0$ で $\omega$、$t>0$ で $9\omega$（$\omega>0$）とする。$q,q'$ を $t=0$ で連続にし、両領域の正モードを $e^{-i\omega t}/\sqrt{2\omega}$ 型に規格化する。$\alpha,\beta$、正準条件、in真空のout粒子数を求めよ。

<!-- solution-start -->
**詳細解答。** outモードをin基底で $v=\alpha u-\beta\bar u$ と展開します。接続点の値と微分から

$$
\alpha-\beta=\sqrt{\frac{\omega}{9\omega}}=\frac13,
\qquad
\alpha+\beta=\sqrt{\frac{9\omega}{\omega}}=3.
$$

二式の和・差により $\alpha=(3+1/3)/2=5/3$、$\beta=(3-1/3)/2=4/3$。符号付き規格化は

$$
\alpha^2-\beta^2=\frac{25}{9}-\frac{16}{9}=1.
$$

[粒子数公式](#prop-qcurv3-number)から $\langle N^{\mathrm{out}}\rangle=|\beta|^2=16/9$。平均粒子数は確率ではなく期待値なので1を超えても矛盾しません。
<!-- solution-end -->

<a id="ex-qcurv3-b03"></a>
#### QCURV3-B03 無限個の一モード真空の積を検査する
- Level: B

独立な可算モードで $b_j=\cosh r_j\,a_j+\sinh r_j\,a_j^\dagger$、$r_j\ge0$ とする。有限モードout真空を $|\psi_n\rangle$ とし、$|\psi_n\rangle$ は $j>n$ ではin真空とする。$\langle\psi_n|\psi_m\rangle$（$m>n$）を求め、$\sinh r_j=1/\sqrt j$ と $\sinh r_j=1/j$ の場合にin Fock空間で収束するか判定せよ。

<!-- solution-start -->
**詳細解答。** [対角squeeze命題の一モード真空](#prop-qcurv3-diagonal-squeeze)は $j$ モードでin真空との重なりが $(\cosh r_j)^{-1/2}$ です。テンソル積の内積を取ると

$$
\langle\psi_n|\psi_m\rangle
=\prod_{j=n+1}^{m}(\cosh r_j)^{-1/2}
=\exp\left[-\frac14\sum_{j=n+1}^{m}
\log(1+\sinh^2r_j)\right].
$$

最初の列では $\sum_j\sinh^2r_j=\sum_j1/j$ が発散します。尾部の対数和もCauchy条件を満たさず、ベクトル列は収束しません。二つ目では $\sum_j1/j^2<\infty$ なので尾部の対数和は0へ行き、$\|\psi_m-\psi_n\|^2=2-2\langle\psi_n|\psi_m\rangle\to0$ です。Fock空間の完備性により規格化真空ベクトルへ収束します。
<!-- solution-end -->

<a id="ex-qcurv3-b04"></a>
#### QCURV3-B04 二つのモードをまたぐsqueeze
- Level: B

二モードで $b_1=c a_1+s a_2^\dagger$、$b_2=c a_2+s a_1^\dagger$、$c=\cosh r$、$s=\sinh r$（実 $r$）とする。Bogoliubov行列を作り、二組の正準条件を検証し、in真空の各outモードの粒子数と総粒子数を求めよ。

<!-- solution-start -->
**詳細解答。** 係数は

$$
\alpha=c\begin{pmatrix}1&0\\0&1\end{pmatrix},
\qquad
\beta=s\begin{pmatrix}0&1\\1&0\end{pmatrix}.
$$

$\beta\beta^\dagger=s^2 I_2$ なので $\alpha\alpha^\dagger-\beta\beta^\dagger=(c^2-s^2)I_2=I_2$。$\beta$ が対称で $\alpha=cI_2$ だから $\alpha\beta^T-\beta\alpha^T=c\beta-\beta c=0$。各行には大きさ $s$ の混合係数が一つあり、[粒子数公式](#prop-qcurv3-number)から

$$
\langle N_1\rangle=s^2,\qquad
\langle N_2\rangle=s^2,\qquad
\langle N_1+N_2\rangle=2s^2.
$$

ここでは混合先が自分と異なるモードでも正準条件を保てます。二つ目の条件を無視すると、任意の交差混合が許されるという誤りになります。
<!-- solution-end -->

### Level C：無限モードへの統合

<a id="ex-qcurv3-c01"></a>
#### QCURV3-C01 一モードずつ有限でも表現が同値とは限らない
- Level: C

可算個の独立なボースモードを取り、$c>0$、$p>0$ に対し

$$
\beta_{jk}=\frac{c}{j^p}\delta_{jk},\qquad
\alpha_{jk}=\sqrt{1+\frac{c^2}{j^{2p}}}\,\delta_{jk}.
$$

1. 正準条件を両方確かめよ。
2. in真空における第$j$ outモードの平均粒子数と、最初の $n$ モードの総和を求めよ。
3. $p>1/2$ と $0<p\le1/2$ で総粒子数・HS条件・対角out真空のin Fock空間内での収束を判定し、各モードが有限であることだけでは不十分な理由を説明せよ。

<!-- solution-start -->
**詳細解答。** $\alpha,\beta$ は実対角行列です。第$j$ 対角成分で

$$
\alpha_j^2-\beta_j^2
=1+\frac{c^2}{j^{2p}}-\frac{c^2}{j^{2p}}=1
$$

だから $\alpha\alpha^\dagger-\beta\beta^\dagger=I$。また対角行列は交換するので $\alpha\beta^T-\beta\alpha^T=0$ です。$|\beta_j|\le c$、$|\alpha_j|\le\sqrt{1+c^2}$ から、両対角作用素は二乗和有限の複素数列空間 $\ell^2$ 上有界です。有限台列で確認した恒等式は全 $\ell^2$ に延長でき、この意味で各モードの変換は正準です。

[粒子数命題](#prop-qcurv3-number)では第$j$ 行の非零の $\beta$ 成分は $c/j^p$ ただ一つなので

$$
\langle N_j^{\mathrm{out}}\rangle_{\mathrm{in}}
=\frac{c^2}{j^{2p}},\qquad
\sum_{j=1}^{n}\langle N_j^{\mathrm{out}}\rangle_{\mathrm{in}}
=c^2\sum_{j=1}^{n}\frac1{j^{2p}}.
$$

$2p>1$、すなわち $p>1/2$ でこの級数は収束します。そのとき

$$
\|\beta\|_{\mathrm{HS}}^2=c^2\sum_jj^{-2p}<\infty
$$

です。$\sinh$ が非負実数上で狭義単調に増加するので、$\sinh r_j=c/j^p$ を満たす $r_j\ge0$ が一意に定まり、$\cosh r_j=\sqrt{1+c^2/j^{2p}}$ です。[対角squeeze列のFock真空と総粒子数](#prop-qcurv3-diagonal-squeeze)により有限モードout真空はin Fock空間内で収束します。

一方、$0<p\le1/2$ なら $2p\le1$ で $p$ 級数は発散し、HS条件は破れます。[対角squeeze列のFock真空と総粒子数](#prop-qcurv3-diagonal-squeeze)により有限モードout真空はin Fock空間内の真空ベクトルに収束しません。

すべての固定した $j$ に対して $c^2/j^{2p}<\infty$ でも、その値を**全モードで足す**操作は別の収束問題だからです。これはモードごとの正準性と、無限自由度のFock表現の実装可能性を区別する具体例です。
<!-- solution-end -->
