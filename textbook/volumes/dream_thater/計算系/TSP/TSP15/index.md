# TSP15 多partyテンソル・partyの併合とpush-forward：標準制限との比較

前講まではテンソルの因子ごとに独立した線形写像を許し、計算資源を比較してきました。例えば四つの因子を四人が保持しているとき、二人が協力して一つの空間に対する線形写像を使えるようになると、何が変わるでしょうか。係数を捨てずに並べ替えるだけでも、許される変換の種類が増えることがあります。今回はこの区別を数式で捉えます。

## 1. 因子をまとめる

体 $K$ と整数 $d\ge2$ を固定し、有限次元の $K$ ベクトル空間 $V_i$ を用います。ここで party は局所線形写像を一つ選べる因子位置のことです。例えば $t\in V_1\otimes V_2\otimes V_3$ の第1・第2因子をまとめると、二つの因子を別々に操作する代わりに $V_1\otimes V_2$ 全体を一つの因子として操作できます。

添字集合を空でない組に分けるため、全射 $p:\{1,\ldots,d\}\to\{1,\ldots,m\}$（$2\le m\le d$）を使います。全射とは各出力番号に少なくとも一つの入力番号が対応する写像です。

<a id="def-tsp15-grouping"></a>

<!-- formal-statement-start -->
> **定義（partyの併合）**
>
> 体 $K$ 上の有限次元空間 $V_1,\ldots,V_d$ と上記の全射 $p$ に対して、各 $j=1,\ldots,m$ の空間を
>
$$
U_j=\bigotimes_{i\in p^{-1}(j)}V_i
$$
>
> とする。各積の内部では添字を昇順に並べる。partyの併合（push-forward）$G_p$ は次の作用を持つ線形写像である。
>
$$
G_p:\bigotimes_{i=1}^d V_i\longrightarrow\bigotimes_{j=1}^m U_j,
$$

$$
G_p(\bigotimes_i v_i)
=\bigotimes_j\left(\bigotimes_{i\in p^{-1}(j)}v_i\right).
$$
<!-- formal-statement-end -->

[多因子テンソル積の存在・基底・一意性](../TSP1/index.md#thm-tsp1-multifactor-basis) によって、各因子から基底を選んだとき、入力側の基底は全添字の組で番号付けされます。出力側の基底は同じ添字を組ごとに並べたものです。組が互いに素で全添字を覆うため、元の添字の組と併合後の添字の組は一対一に対応します。その対応を基底上で定めて線形に延長すれば写像が存在し、一意です。逆順に並べ直す基底の対応も線形に延長できるので可逆です。任意の $v_i$ を基底展開して両辺に代入すると係数の積は同一であり、上の作用式は選んだ基底に依存しません。

<!-- definition-example-start: def-tsp15-grouping -->
**定義の確認**。$d=3,m=2$、$p(1)=p(3)=1,p(2)=2$ とし、各 $V_i=K^2$ の基底を $e_1,e_2$ とします。両出力番号に入力があるため全射です。入力
$$
t=e_1\otimes e_2\otimes e_1+e_2\otimes e_1\otimes e_2
$$
は
$$
G_p(t)=(e_1\otimes e_1)\otimes e_2
+(e_2\otimes e_2)\otimes e_1
$$
となります。第1出力の次元は4、第2出力の次元は2です。8個の係数を4行2列に並べ直し、消去も加算もしていません。第1出力の基底を $(11,12,21,22)$ の順にすると行列は
$$
\begin{pmatrix}0&1\\0&0\\0&0\\1&0\end{pmatrix}
$$
です。第1行第2列の係数1は元の添字 $(1,2,1)$ に対応します。逆に各行・列の組から元の三添字が復元できます。
<!-- definition-example-end -->

さらに全射 $q:\{1,\ldots,m\}\to\{1,\ldots,l\}$ で組をまとめる場合、各単純テンソルの因子は最終的に $(q\circ p)^{-1}(k)$ ごとに並びます。組の内部の順序を揃える基底の対応を施せば、二段階の併合は一段階の併合 $G_{q\circ p}$ と一致します。併合は係数の情報を消しませんが、局所性の区別は変えます。

## 2. 許される変換が増える

[テンソルの制限](../TSP4/index.md#def-tsp4-restriction) $s\preceq t$ は、入力の各因子から出力の各因子への線形写像のテンソル積で $s$ を得られることでした。併合後もそのような変換は実行できるのでしょうか。

<a id="thm-tsp15-grouping-monotone"></a>

<!-- formal-statement-start -->
> **定理（併合による制限の保存）**
>
> 同じ体 $K$ 上の有限次元 $d$ 因子テンソル $t,s$ と全射 $p:\{1,\ldots,d\}\to\{1,\ldots,m\}$（$2\le m\le d$）について
>
$$
s\preceq t\ \Longrightarrow\ G_p(s)\preceq G_p(t).
$$
<!-- formal-statement-end -->

元の各位置で行う変換を、まとめた組の中で一括して行えばよいことが核心です。

<!-- proof-start -->
### 証明

$t\in\bigotimes_i V_i$、$s\in\bigotimes_i W_i$ とし、制限を実現する $A_i:V_i\to W_i$ を取ります。出力の組の空間を $U'_j=\bigotimes_{i\in p^{-1}(j)}W_i$ とします。[局所線形写像のテンソル積](../TSP4/index.md#def-tsp4-local-map) を各組に適用し
$$
B_j=\bigotimes_{i\in p^{-1}(j)}A_i:U_j\to U'_j
$$
と置きます。任意の単純テンソル $v=\bigotimes_i v_i$ について、
$$
G_p((\bigotimes_i A_i)v)
=\bigotimes_j\left(\bigotimes_{i\in p^{-1}(j)} A_iv_i\right)
$$
であり、
$$
(\bigotimes_j B_j)G_p(v)
=\bigotimes_j B_j\left(\bigotimes_{i\in p^{-1}(j)}v_i\right)
=\bigotimes_j\left(\bigotimes_{i\in p^{-1}(j)}A_iv_i\right)
$$
です。単純テンソルが全体を張るので線形写像として一致します。$v$ の代わりに $t$ を代入すれば $G_p(s)=(\bigotimes_j B_j)G_p(t)$ となり、併合後の制限を実現します。
<!-- proof-end -->

逆は一般には成立しません。三因子を考え、$p(1)=p(2)=1,p(3)=2$ とします。
$$
t=e_1\otimes e_1\otimes e_1,\qquad
s=(e_1\otimes e_1+e_2\otimes e_2)\otimes e_1.
$$
両者は $(K^2)^{\otimes3}$ の元です。併合後に第1組の基底 $e_i\otimes e_j$ のうち $e_1\otimes e_1$ を $e_1\otimes e_1+e_2\otimes e_2$ に写し、残りを零にする線形写像を取り、第2組は恒等写像とします。これにより $G_p(s)\preceq G_p(t)$ です。

一方で元の各因子に別々の線形写像を施しても、単純テンソルは単純テンソルまたは零にしかなりません。$s$ の第1因子を行にした [テンソルの平坦化](../TSP3/index.md#def-tsp3-flattening) は、列 $(1,1)$ と $(2,1)$ に独立な二つの標準基底列を持ちます。階数2なので [平坦化による階数下界](../TSP3/index.md#thm-tsp3-flattening-bound) から $s$ は単純テンソルではありません。従って $s\not\preceq t$ です。

失われた仮定は、組の中の写像が個々の因子の写像のテンソル積であるという制約です。可逆な係数の並べ替えであっても、制限の逆向きまで保存するとは限りません。

## 3. 和と積をどう扱うか

[テンソルの半環構成](../TSP10/index.md#thm-tsp10-tensor-semiring) で、固定した体と因子数の制限同値類から半環 $S_{K,d}$ を作りました。併合後の比較も制限で行うとき、同値類の和と積を保つことを確認します。

<a id="thm-tsp15-grouping-semiring"></a>

<!-- formal-statement-start -->
> **定理（併合と半環演算の両立性）**
>
> 体 $K$ と全射 $p:\{1,\ldots,d\}\to\{1,\ldots,m\}$（$2\le m\le d$）を固定する。写像
>
$$
g_p:S_{K,d}\to S_{K,m},\qquad [t]\mapsto[G_p(t)]
$$
>
> は代表元によらず定まり、制限の順序、零、一、和および積を保つ。
<!-- formal-statement-end -->

直和では組の内部に混合座標が増えますが、そこにテンソルの係数はありません。積では基底の組の順序を替えるだけです。前者は可逆な線形写像ではなく包含と射影による制限同値で扱う必要があります。

<!-- proof-start -->
### 証明

[併合による制限の保存](#thm-tsp15-grouping-monotone) を相互に制限できる代表元に両方向から適用すれば、併合後も制限同値です。また同じ結果から単調性が成立します。零テンソルは零テンソルへ、全因子が1次元で係数1の単位テンソルは同じ形の単位テンソルへ写ります。

和を考え、$t,s$ の因子空間を $V_i,W_i$ とします。[テンソルの直和](../TSP5/index.md#def-tsp5-direct-sum) の併合後の第 $j$ 因子は
$$
X_j=\bigotimes_{i\in p^{-1}(j)}(V_i\oplus W_i).
$$
各 $V_i,W_i$ の基底を使うと、$X_j$ の基底は各位置で $V_i$ 側か $W_i$ 側かを選んで作られます。すべて $V_i$ 側の基底は $U_j$ の基底に、すべて $W_i$ 側の基底は $Z_j=\bigotimes_{i\in p^{-1}(j)}W_i$ の基底に対応します。

この二群は組が非空なので重なりません。$U_j\oplus Z_j$ を $X_j$ の対応する二群に入れる写像を $I_j$ とし、二群を元に戻し混合基底を零にする写像を $P_j$ とします。基底上で $P_jI_j$ は恒等写像です。元の直和の非零係数は全位置が $V_i$ 側の項と全位置が $W_i$ 側の項だけです。従って
$$
G_p(t\oplus s)=(\bigotimes_j I_j)(G_p(t)\oplus G_p(s)),
$$

$$
G_p(t)\oplus G_p(s)=(\bigotimes_j P_j)G_p(t\oplus s).
$$
双方の制限が成立し、同値類で和を保ちます。

積について [テンソルのKronecker積](../TSP5/index.md#def-tsp5-kronecker) を用いると、併合後の第 $j$ 因子は $\bigotimes_{i\in p^{-1}(j)}(V_i\otimes W_i)$ です。これを $U_j\otimes Z_j$ に送る線形写像 $L_j$ を基底上で
$$
\bigotimes_{i\in p^{-1}(j)}(v_i\otimes w_i)
\mapsto
(\bigotimes_{i\in p^{-1}(j)}v_i)\otimes
(\bigotimes_{i\in p^{-1}(j)}w_i)
$$
と定めます。添字の組の対応は全単射なので $L_j$ は可逆です。入力の係数を $t_{\boldsymbol a},s_{\boldsymbol b}$ とすると、両辺で同じ積 $t_{\boldsymbol a}s_{\boldsymbol b}$ が対応する位置に現れます。よって
$$
(\bigotimes_j L_j)G_p(t\boxtimes s)
=G_p(t)\boxtimes G_p(s).
$$
逆写像も各組で使えるため制限同値です。以上から半環演算を保ちます。
<!-- proof-end -->

例えば二つの三因子テンソルがいずれも各因子1次元の場合、最初の二因子をまとめると、直和してから併合した第1因子は4次元ですが、併合してから直和した第1因子は2次元です。前者の混合した二座標を射影で落とせば後者になり、包含で元に戻せます。空間の次元が異なるため同じテンソルというのではなく、相互に制限できるという結論になります。

## 4. 階数と劣階数はどちらへ動くか

$d$ 因子の [対角テンソル](../TSP4/index.md#def-tsp4-diagonal) を $D_{d,r}$ と書きます。$r$ 個の対角項を併合すると、第 $j$ 組には $e_a^{\otimes |p^{-1}(j)|}$ という $r$ 個の異なる基底が現れます。これらを $e_a$ に写し、残りの基底を零にする写像と、逆に $e_a$ を対応する基底へ入れる写像を各組で取れます。従って $G_p(D_{d,r})\sim D_{m,r}$ です。$r=0$ の場合も両者は零です。

この事実により、対角テンソルを単位資源とする階数や劣階数を比較できます。

<a id="thm-tsp15-grouping-ranks"></a>

<!-- formal-statement-start -->
> **定理（併合による階数と劣階数の比較）**
>
> 体 $K$ 上の有限次元 $d$ 因子テンソル $t$ と全射 $p:\{1,\ldots,d\}\to\{1,\ldots,m\}$（$2\le m\le d$）について、階数 $R_K$、劣階数 $Q_K$ およびそれらの漸近版は次を満たす。
>
$$
R_K(G_p(t))\le R_K(t),\qquad Q_K(t)\le Q_K(G_p(t)),
$$

$$
\widetilde R_K(G_p(t))\le\widetilde R_K(t),\qquad
\widetilde Q_K(t)\le\widetilde Q_K(G_p(t)).
$$
<!-- formal-statement-end -->

作るための費用は減る方向、取り出せる資源量は増える方向です。

<!-- proof-start -->
### 証明

$r=R_K(t)$ と $q=Q_K(t)$ を取ります。[対角テンソルによる階数の特徴付け](../TSP4/index.md#thm-tsp4-rank-restriction) と [テンソル劣階数](../TSP4/index.md#def-tsp4-subrank) の定義から
$$
D_{d,q}\preceq t\preceq D_{d,r}.
$$
[併合による制限の保存](#thm-tsp15-grouping-monotone) と直前の対角テンソルの制限同値を適用すると
$$
D_{m,q}\preceq G_p(t)\preceq D_{m,r}.
$$
再び階数と劣階数の定義を使えば主張の最初の二式を得ます。

[併合と半環演算の両立性](#thm-tsp15-grouping-semiring) を繰り返すと任意の正整数 $n$ について $G_p(t^{\boxtimes n})\sim G_p(t)^{\boxtimes n}$ です。制限同値なら階数と劣階数は一致するため、最初の二式を $t^{\boxtimes n}$ に適用して
$$
R_K(G_p(t)^{\boxtimes n})\le R_K(t^{\boxtimes n}),
$$

$$
Q_K(t^{\boxtimes n})\le Q_K(G_p(t)^{\boxtimes n})
$$
を得ます。値は非負なので $n$ 乗根を取っても不等号の向きは保たれます。[テンソル冪の階数と劣階数の増大率](../TSP9/index.md#thm-tsp9-limit-existence) により両辺の極限が存在し、[漸近階数と漸近劣階数](../TSP9/index.md#def-tsp9-asymptotic-rank) の定義で残りの二式を得ます。零テンソルについてもすべての冪の値は0です。
<!-- proof-end -->

第2節の $s$ は二つの単純テンソルの和であり、第1因子の平坦化階数は2です。従って元の階数は2ですが、併合後は非零の単純テンソルなので階数1です。階数の不等号は厳密になり得ます。

逆方向の厳密な例は $u=e_1\otimes(e_1\otimes e_1+e_2\otimes e_2)$ です。元の第1因子の平坦化の階数は1であり、[劣階数の基本評価](../TSP4/index.md#thm-tsp4-subrank-bounds) と非零性から劣階数は1です。最初の二因子を併合すると、行 $e_1\otimes e_1,e_1\otimes e_2$ と列 $e_1,e_2$ に単位行列が現れます。[二因子の階数と劣階数の一致](../TSP4/index.md#thm-tsp4-two-factor-subrank) から劣階数は2です。

## 5. スペクトル点を元の因子数へ戻す

併合後のテンソルを測る関数があれば、まず併合し、それから測る関数を元のテンソル上に作れます。この関数の合成を、併合に対するスペクトル点の引き戻しとして扱います。

<a id="thm-tsp15-pullback"></a>

<!-- formal-statement-start -->
> **定理（併合によるスペクトル点の引き戻し）**
>
> 体 $K$ と全射 $p:\{1,\ldots,d\}\to\{1,\ldots,m\}$（$2\le m\le d$）を固定する。$S_{K,m}$ の任意の [スペクトル点](../TSP11/index.md#def-tsp11-spectral-point) $\phi$ に対して
>
$$
g_p^*(\phi)=\phi\circ g_p:S_{K,d}\to\mathbb R_{\ge0}
$$
>
> は $S_{K,d}$ のスペクトル点である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\psi=\phi\circ g_p$ とします。[併合と半環演算の両立性](#thm-tsp15-grouping-semiring) から $g_p(0)=0,g_p(1)=1$ なので $\psi(0)=0,\psi(1)=1$ です。任意の $a,b\in S_{K,d}$ に対して
$$
\psi(a+b)=\phi(g_p(a)+g_p(b))=\psi(a)+\psi(b),
$$

$$
\psi(ab)=\phi(g_p(a)g_p(b))=\psi(a)\psi(b).
$$
$a\preceq b$ なら $g_p(a)\preceq g_p(b)$ であり、$\phi$ の単調性により $\psi(a)\le\psi(b)$ です。値域も非負実数なのでスペクトル点の全条件が成立します。
<!-- proof-end -->

例えば三因子から二因子への併合で第1・第2因子をまとめると、併合後の行列階数は元の $\{1,2\}|\{3\}$ 平坦化の階数です。[平坦化階数によるスペクトル点](../TSP11/index.md#thm-tsp11-flattening-spectral-point) を引き戻した具体例になっています。

しかし第2節の $s,t$ の併合後はどちらも非零の単純テンソルなので、相互に制限できます。引き戻しで得られる任意の点は両者で等しい値を取ります。一方、第1因子と残りを分けた平坦化階数は $s$ で2、$t$ で1です。これは元の半環のスペクトル点ですが、今回の併合から引き戻すことはできません。従って引き戻しで得た点だけを元のスペクトル全体として扱うことはできません。

## 6. 演習

### Level A

<a id="ex-tsp15-a01"></a>

#### TSP15-A01 非連続な因子の併合
- Level: A
- ID: TSP15-A01

$d=4$、各因子を $K^2$ とする。$p(1)=p(4)=1,p(2)=p(3)=2$ とし、$e_2\otimes e_1\otimes e_2\otimes e_1$ の併合後の係数位置と因子次元を求めよ。

<!-- solution-start -->
##### 詳細解答

[partyの併合](#def-tsp15-grouping) に従い組内を昇順にする。
$$
G_p(e_2\otimes e_1\otimes e_2\otimes e_1)
=(e_2\otimes e_1)\otimes(e_1\otimes e_2).
$$
各組は二因子なので次元は $2\cdot2=4$。基底順を $11,12,21,22$ とすれば行3、列2に1が立ち、残り15成分は0である。
<!-- solution-end -->

<a id="ex-tsp15-a02"></a>

#### TSP15-A02 局所写像を組にまとめる
- Level: A
- ID: TSP15-A02

三因子を $K^2$ とし、$A_1e_1=e_2,A_2e_1=e_1,A_3e_2=e_1$、その他の基底像を零とする。$t=e_1\otimes e_1\otimes e_2$ に対し最初の二因子を併合する前後で結果を求めよ。

<!-- solution-start -->
##### 詳細解答

元の作用では
$$
(A_1\otimes A_2\otimes A_3)t=e_2\otimes e_1\otimes e_1.
$$
併合後の入力は $(e_1\otimes e_1)\otimes e_2$。第1組の写像 $B_1=A_1\otimes A_2$ は $e_1\otimes e_1$ を $e_2\otimes e_1$ に送り、第2組の $B_2=A_3$ は $e_2$ を $e_1$ に送る。よって出力は $(e_2\otimes e_1)\otimes e_1$ であり、元の出力を併合した結果と一致する。
<!-- solution-end -->

<a id="ex-tsp15-a03"></a>

#### TSP15-A03 対角資源の変換
- Level: A
- ID: TSP15-A03

$D_{3,3}=\sum_{a=1}^3 e_a^{\otimes3}$ の最初の二因子をまとめ、$D_{2,3}$ との相互制限を具体的に作れ。

<!-- solution-start -->
##### 詳細解答

併合後は $\sum_{a=1}^3(e_a\otimes e_a)\otimes e_a$ である。第1組の写像 $P:K^3\otimes K^3\to K^3$ を $P(e_a\otimes e_b)=0$（$a\ne b$）、$P(e_a\otimes e_a)=e_a$ とする。第2組を恒等写像にすれば出力は $\sum_a e_a\otimes e_a$。逆には $I(e_a)=e_a\otimes e_a$ と第2組の恒等写像を使う。両方とも基底上で定めた線形写像であり、制限が両方向に成立する。
<!-- solution-end -->

<a id="ex-tsp15-a04"></a>

#### TSP15-A04 二因子への併合の値
- Level: A
- ID: TSP15-A04

$v=e_1^{\otimes3}+e_2^{\otimes3}$ を最初の二因子で併合したテンソルの階数と劣階数を求めよ。

<!-- solution-start -->
##### 詳細解答

併合後は $(e_1\otimes e_1)\otimes e_1+(e_2\otimes e_2)\otimes e_2$ である。行順を $11,12,21,22$、列順を $1,2$ とすると
$$
\begin{pmatrix}1&0\\0&0\\0&0\\0&1\end{pmatrix}
$$
である。独立な二列を持つので行列階数は2。[二因子テンソル階数と行列階数の一致](../TSP2/index.md#thm-tsp2-matrix-rank) および [二因子の階数と劣階数の一致](../TSP4/index.md#thm-tsp4-two-factor-subrank) から両方2である。
<!-- solution-end -->

### Level B

<a id="ex-tsp15-b01"></a>

#### TSP15-B01 直和の混合座標
- Level: B
- ID: TSP15-B01

三因子テンソル $t,s$ の各因子がそれぞれ2次元、3次元であるとする。最初の二因子を併合したとき、直和の順序による第1組の次元の違いと制限同値を説明せよ。

<!-- solution-start -->
##### 詳細解答

直和を先にすると第1組は $(2+3)^2=25$ 次元である。併合を先にすると $2^2+3^2=13$ 次元である。混合した座標の数は $2\cdot3+3\cdot2=12$ であり、$25=13+12$ となる。[テンソルの直和](../TSP5/index.md#def-tsp5-direct-sum) では全因子が $t$ 側または全因子が $s$ 側の場合だけ係数が現れるため、混合座標の係数は零。25次元側から13次元側へ二群を保つ射影、逆に対応する座標への包含を使い、第2組は恒等写像とすれば相互制限が成立する。
<!-- solution-end -->

<a id="ex-tsp15-b02"></a>

#### TSP15-B02 漸近階数の厳密な低下
- Level: B
- ID: TSP15-B02

$v=(e_1\otimes e_1+e_2\otimes e_2)\otimes e_1$ を最初の二因子で併合する。任意の正整数 $n$ に対して併合前後の $n$ 回のKronecker冪の階数を求め、漸近階数を比較せよ。

<!-- solution-start -->
##### 詳細解答

[テンソルのKronecker積](../TSP5/index.md#def-tsp5-kronecker) の係数公式から、長さ $n$ の添字列 $\alpha\in\{1,2\}^n$ を用いると
$$
v^{\boxtimes n}=\sum_\alpha e_\alpha\otimes e_\alpha\otimes e_{(1,\ldots,1)}.
$$
ここで $e_\alpha=e_{\alpha_1}\otimes\cdots\otimes e_{\alpha_n}$ である。$2^n$ 個の単純項が上界を与える。第1因子の平坦化で列 $(\alpha,(1,\ldots,1))$ は行 $\alpha$ に1を持ち他の行が零なので独立な $2^n$ 列がある。[平坦化による階数下界](../TSP3/index.md#thm-tsp3-flattening-bound) から階数は $2^n$。併合後は非零単純テンソルで、どの冪も非零単純テンソルだから階数1。[漸近階数](../TSP9/index.md#def-tsp9-asymptotic-rank) はそれぞれ $(2^n)^{1/n}=2$ と $1^{1/n}=1$ の極限、すなわち2と1である。
<!-- solution-end -->

<a id="ex-tsp15-b03"></a>

#### TSP15-B03 引き戻しでは得られない点
- Level: B
- ID: TSP15-B03

$s=(e_1\otimes e_1+e_2\otimes e_2)\otimes e_1$ と $t=e_1^{\otimes3}$ を考える。最初の二因子を併合する場合、第2因子と残りを分ける平坦化階数を引き戻しで得られるか。

<!-- solution-start -->
##### 詳細解答

併合後は双方とも非零単純テンソルである。各組の非零ベクトルを相手の非零ベクトルに写す線形写像を基底延長で作れるので相互制限が成立する。従って任意の引き戻しは両者に同じ値を与える。一方 $s$ の第2因子を行とすると、列 $(1,1),(2,1)$ にそれぞれ $(1,0)^{\mathsf T},(0,1)^{\mathsf T}$ が現れ階数2。$t$ では唯一の非零列が $(1,0)^{\mathsf T}$ なので階数1。[平坦化階数によるスペクトル点](../TSP11/index.md#thm-tsp11-flattening-spectral-point) は元の半環で成立するが、両者の値が異なるので引き戻しでは得られない。
<!-- solution-end -->

### Level C

<a id="ex-tsp15-c01"></a>

#### TSP15-C01 異なる組分けと比較の方向
- Level: C
- ID: TSP15-C01

四因子が $K^2$ のとき
$$
w=\sum_{a,b=1}^2 e_a\otimes e_a\otimes e_b\otimes e_b
$$
を考える。組分け $12|34$ と $13|24$ でそれぞれ二因子へ併合した階数・劣階数を求めよ。元の階数と劣階数も確定せよ。さらに二つの組分けで得られた値が違うことと併合の可逆性が矛盾しない理由を述べよ。

<!-- solution-start -->
##### 詳細解答

$12|34$ では
$$
G_p(w)=(e_1\otimes e_1+e_2\otimes e_2)
\otimes(e_1\otimes e_1+e_2\otimes e_2)
$$
であり、非零単純テンソルなので階数1。[二因子の階数と劣階数の一致](../TSP4/index.md#thm-tsp4-two-factor-subrank) から劣階数も1。
$13|24$ では
$$
G_q(w)=\sum_{a,b=1}^2(e_a\otimes e_b)\otimes(e_a\otimes e_b).
$$
基底順を両組とも $11,12,21,22$ とすれば係数行列は4次単位行列である。階数と劣階数はともに4。
元のテンソルは4個の単純項で書かれているので階数は4以下。[併合による階数と劣階数の比較](#thm-tsp15-grouping-ranks) を $q$ に適用して $4\le R_K(w)$ を得るため、階数4である。同じ定理を $p$ に適用すると $Q_K(w)\le1$。各因子で $e_1\mapsto1,e_2\mapsto0$ とすれば係数1の対角テンソルを取り出せるので $Q_K(w)\ge1$。従って劣階数1である。
併合はベクトル空間として可逆だが、許される局所線形写像の範囲が組分けによって異なる。したがって同じ係数から異なる階数が出ても矛盾しない。
<!-- solution-end -->

## 7. 次講への接続

併合は比較を保存する半環の写像でした。次講では資源を覆うための費用と、その積に対する増大率を考えます。劣乗法的な評価関数が得られても、スペクトル点の乗法性や双対性が自動的に成立するわけではありません。
