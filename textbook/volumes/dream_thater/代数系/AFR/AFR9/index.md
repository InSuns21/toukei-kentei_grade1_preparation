# AFR9 アデール上のFourier解析

AFR8 では、実数と各素数での数を一つのアデールに集め、対角有理数で割った商の代表元を求めました。実数の Fourier 解析では振動する指数関数を積分すると周波数を抽出できました。今度は各素数でも振動を作り、すべての振動を掛け合わせます。目標は局所積分を計算するだけでなく、有理数に沿った和と変換後の和が一致する理由を理解することです。

## 1. p進数の振動を作る

[アデール環](../../ANF/ANF19/index.md#def-anf19-adele)を有理数体について

$$
\mathbb A=\mathbb R\times\mathbb A_f,\quad
\mathbb A_f=\prod_p'(\mathbb Q_p,\mathbb Z_p),\quad
\widehat{\mathbb Z}=\prod_p\mathbb Z_p
$$

と書きます。アデールの成分を $x=(x_\infty,x_f)$、$x_f=(x_p)_p$ と書きます。$\mathbb Q_p$ は $p$ 進数体、$\mathbb Z_p$ はその整数環であり、ほとんどすべての素数で $x_p\in\mathbb Z_p$ です。積 $xy$ は成分ごとの積です。

[p進付値](../../ANF/ANF9/index.md#def-anf9-p-adic-valuation)を $v_p$ とし、非零元の[p進絶対値](../../ANF/ANF9/index.md#def-anf9-p-adic-absolute)を次で表します（零では $0$）。

$$
|x|_p=p^{-v_p(x)}.
$$

[p進整数の桁展開](../../ANF/ANF9/index.md#thm-anf9-digit-expansion)を $p^{-v_p(x)}x\in\mathbb Z_p$ に適用し、再び $p^{v_p(x)}$ を掛けると、非零の $x\in\mathbb Q_p$ は

$$
x=\sum_{j=v_p(x)}^\infty a_jp^j,\qquad 0\le a_j<p
$$

と書けます。負の指数の項だけを残した有理数を $\{x\}_p$ と記し、負の指数がないときや $x=0$ のときは $0$ とします。これは $[0,1)$ 内にあり、$x-\{x\}_p\in\mathbb Z_p$ です。実数の小数部分とは異なり、$p$ によって値が変わります。

複素指数を作る際には、足し算を掛け算へ移すことが重要です。絶対値が $1$ の複素数全体を $\mathbb T$ とし、加法群から $\mathbb T$ への連続準同型を加法指標と呼びます。局所の振動を次のように選びます。

<a id="def-afr9-additive-character"></a>

<!-- formal-statement-start -->
> **定義（標準局所加法指標）**  
> 実数体および各素数 $p$ の局所体上の指標を次式で規格化する。

$$
\psi_\infty(t)=e^{-2\pi it},\qquad
\psi_p(x)=e^{2\pi i\{x\}_p}.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr9-additive-character -->
**定義の確認**

例えば $p=3$ では $\{2/3\}_3=2/3$、$\{1/3\}_3=1/3$、$\{1\}_3=0$ です。二つの値の積は $e^{2\pi i}=1=\psi_3(1)$ になります。一般に差 $D=\{x+y\}_p-\{x\}_p-\{y\}_p$ は分母が $p$ の冪の有理数です。一方、

$$
D=(x-\{x\}_p)+(y-\{y\}_p)-(x+y-\{x+y\}_p)
$$

は三項とも $p$ 進整数なので $D\in\mathbb Z_p$ です。既約分数の分母が $p$ の正の冪なら付値が負になるため、$D$ は整数です。従って指数関数は加法を積へ移します。

$\{x\}_p\in[0,1)$ なので $\psi_p(x)=1$ と $\{x\}_p=0$ は同値であり、これは $x\in\mathbb Z_p$ と同値です。指標が $1$ となる元の集合を核と呼びます。$z\in\mathbb Z_p$ なら $\psi_p(x+z)=\psi_p(x)\psi_p(z)=\psi_p(x)$ です。$x+\mathbb Z_p$ は開近傍なので指標は局所定数であり、連続です。実指標は指数関数の加法則と連続性から条件を満たします。
<!-- definition-example-end -->

実数と有限素点で符号が反対なのは、対角有理数上で振動を打ち消すためです。

<a id="prop-afr9-global-character"></a>

<!-- formal-statement-start -->
> **命題（大域加法指標の有理数上の自明性）**  
> $x\in\mathbb A$ に対して次の積は有限個を除いて因子が $1$ であり、連続加法指標を与える。

$$
\psi(x)=\psi_\infty(x_\infty)\prod_p\psi_p(x_p).
$$

> すべての対角有理数 $q\in\mathbb Q$ について $\psi(q)=1$ が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

有限素点で取り出した分数を足すと、有理数との差は全素点で整になります。分母が残らないため、その差は整数です。

<!-- proof-start -->
### 証明

[アデール環の有限性条件](../../ANF/ANF19/index.md#def-anf19-adele)と[標準局所加法指標](#def-afr9-additive-character)の核 $\mathbb Z_p$ により積は有限個の因子だけで決まります。二つのアデールについて例外素点の和集合を取れば有限個の複素数の積を計算すれば加法を積へ移せます。$0$ の近傍では有限成分をすべて $\mathbb Z_p$ に取ると有限指標の積は $1$ です。この近傍では $\psi(h)=\psi_\infty(h_\infty)$ となり、実指標の連続性から大域指標も零で連続です。また $\psi(x+h)=\psi(x)\psi(h)$ なので、零での連続性が全点での連続性を与えます。

$q\in\mathbb Q$ とし、$q-\sum_p\{q\}_p$ を考えます。素数 $\ell$ では $q-\{q\}_\ell\in\mathbb Z_\ell$ で、他の項の分母は $\ell$ で割れません。従って差は全 $\mathbb Z_\ell$ に属します。既約分数の分母が $1$ でなければその素因数で付値が負になるので、この差は整数です。

$$
\psi(q)=\exp\!\left(2\pi i
\left(-q+\sum_p\{q\}_p\right)\right)=1.
$$
<!-- proof-end -->

例えば $q=1/6$ では $1/6-1/2=-1/3\in\mathbb Z_2$、$1/6-2/3=-1/2\in\mathbb Z_3$ です。他の素数では整です。有限側の分数の和は $7/6$ で、実成分を引くと $1$ になります。符号を両方正にすると、この例では打ち消し合いません。

## 2. 局所積分の大きさを決める

実数では平行移動で長さが変わりません。p進数でも平行移動で変わらない測度を使います。ここでは [Borel 集合](../../../解析系/F0/F0-00D4/index.md#def-borel-sigma-algebra)（開集合が生成する σ 代数の元）上の平行移動不変な、コンパクト集合で有限な非零測度を加法 Haar 測度として扱います。p進数では整数環の体積を $1$ にするとすべての球の体積が決まります。

<a id="prop-afr9-local-measure"></a>

<!-- formal-statement-start -->
> **命題（p進加法Haar測度の規格化）**  
> 素数 $p$ に対し $\mathbb Q_p$ 上に、$\mu_p(\mathbb Z_p)=1$ を満たす加法 Haar 測度がただ一つ存在する。任意の $a\in\mathbb Q_p$ と整数 $k$ について

$$
\mu_p(a+p^k\mathbb Z_p)=p^{-k}.
$$

> 非零の $c\in\mathbb Q_p$ と Borel 集合 $E$ について $\mu_p(cE)=|c|_p\mu_p(E)$ が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$p$ 進整数の最初の $k$ 桁を固定することは、$p^k$ 個の同じ大きさの集合の一つを選ぶことです。これが体積の逆冪を決めます。

<!-- proof-start -->
### 証明

$p^k\mathbb Z_p$ の平行移動は $k\ge0$ なら $\mathbb Z_p$ を $p^k$ 個に分割するので、規格化と平行移動不変性から各体積は $p^{-k}$ です。$k<0$ なら $p^k\mathbb Z_p$ 自体が $p^{-k}$ 個の $\mathbb Z_p$ の剰余類に分割され、同じ式を得ます。

存在を構成します。[p進整数の桁展開](../../ANF/ANF9/index.md#thm-anf9-digit-expansion)で最初の $k$ 桁を固定する剰余類に質量 $p^{-k}$ を割り当てます。有限個の剰余類の和集合を取るときは共通の桁数まで細分し、質量を加えます。各桁を一つ延ばすと $p$ 個に分かれ、質量の和は元の値に一致するので、この割当ては表示に依存せず有限加法的です。

この集合族は集合代数（有限和・補集合で閉じる族）です。元はすべて開かつ閉で、整数環は [AFR8 のコンパクト性定理の証明](../AFR8/index.md#thm-afr8-additive-quotient-compact)で確認したようにコンパクトです。集合代数の元を互いに素な可算個の元が被覆する場合、開被覆から有限部分被覆が取れます。互いに素なので有限個以外は空集合となり、有限加法性が可算加法性を与えます。従って [Carathéodory拡張定理](../../../解析系/F0/F0-00D4/index.md#thm-caratheodory-extension)を適用でき、剰余類が生成する Borel 集合上に確率測度が一意に拡張されます。整数環の加法平行移動は各 $p^k$ を法とする剰余類を置換するため、これらの集合で測度を保ちます。剰余類は Borel 集合を生成するので、有限測度の一意性から全 Borel 集合でも保存します。

$\mathbb Q_p/\mathbb Z_p$ は $\bigcup_{n\ge0}p^{-n}\mathbb Z_p/\mathbb Z_p$ として可算です。各剰余類へ先ほどの確率測度を平行移動し、その可算和を取れば $\mathbb Q_p$ 上の測度が得られます。代表元の選択によらず、加法平行移動で剰余類が置換されるので不変です。コンパクト集合は開集合である剰余類の有限個で被覆され、測度は有限です。

球は Borel 集合を生成します。各 $p^{-n}\mathbb Z_p$（$n\ge0$）内では、球の有限和が集合代数をなし、その全質量は $p^n$ です。[Carathéodory拡張定理の一意性](../../../解析系/F0/F0-00D4/index.md#thm-caratheodory-extension)から、この集合上で球の体積が一致する二つの測度は全 Borel 集合で一致します。

$p^{-n}\mathbb Z_p$ は増大して $\mathbb Q_p$ を覆うので、測度の下からの連続性により全空間でも一致します。

次に非零の $c$ を単元部分と付値部分に分けます。

$$
c=p^m u,\qquad m=v_p(c),\quad u\in\mathbb Z_p^\times.
$$

ここで単元とは逆元も整数環にある元です。$u\mathbb Z_p=\mathbb Z_p$ なので

$$
c(a+p^k\mathbb Z_p)=ca+p^{k+m}\mathbb Z_p.
$$

球の体積の比は $p^{-m}=|c|_p$ です。再び球上の一致と測度の一意性から任意の Borel 集合でも尺度変換が成立します。
<!-- proof-end -->

例えば $p=2$ で $1/2+4\mathbb Z_2$ の体積は $1/4$ です。これを $2^{-3}$ 倍すると $1/16+2^{-1}\mathbb Z_2$ になり、体積は $2$、元の $8$ 倍です。

実素点の加法測度には通常の Lebesgue 測度 $dt$ を使います。有限アデールではまず $\widehat{\mathbb Z}$ 上に確率測度を作ります。有限個の素数でのみ剰余類を指定し、他の素数では整数環全体を取る集合に、指定した各素数での局所質量の積を割り当てます。これらの有限和集合は、指定する素数を増やし桁数をそろえると共通の細分を持ちます。各細分の質量の和は元の質量に一致するため有限加法的です。各集合は開かつ閉であり、$\widehat{\mathbb Z}$ はコンパクトなので、局所の構成と同じ有限部分被覆の議論で前測度となります。[Carathéodory拡張定理](../../../解析系/F0/F0-00D4/index.md#thm-caratheodory-extension)で Borel 集合上の確率測度へ一意に拡張できます。平行移動が各有限剰余類の分割を置換するため、この測度は不変です。次に $\mathbb A_f/\widehat{\mathbb Z}$ の各剰余類へ移して可算和を取ります。[AFR8 の標準代表元定理](../AFR8/index.md#thm-afr8-additive-normal-form)を実成分 $0$ のアデールへ適用すると、各有限剰余類は有理数を代表元に持つので、この商は可算です。平行移動は剰余類を置換し、各剰余類上の測度は代表元によらないため平行移動不変です。

有限個の例外を持つ整数列 $(k_p)_p$、すなわちほとんどすべての $k_p=0$ に対し、$d=\prod_p p^{k_p}>0$ とおきます。$d\mathbb Z_p=p^{k_p}\mathbb Z_p$ なので

$$
\mu_f(d\widehat{\mathbb Z})=\prod_p p^{-k_p}=d^{-1}.
$$

上の体積式は、有限個の素数での局所球の体積を掛けることから従います。負の指数があるときは整数環の有限剰余類へ分割し、各剰余類内では正の指数に対応する局所の質量の積を使います。実数と有限アデールはともに有限測度の集合で可算被覆されるので、[積測度の存在一意性](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-01)により大域の加法測度 $dx=dt\,d\mu_f$ を取ります。代表元領域 $[0,1)\times\widehat{\mathbb Z}$ の体積は $1$ です。

## 3. 積分する関数を選ぶ

実成分では微分しても遠方で急速に小さくなる関数を使います。$g^{(n)}(t)$ は実変数 $t$ に関する $n$ 階の通常の微分（$g^{(0)}=g$）です。滑らかとはすべての階数で連続微分可能という意味です。有限成分では微小な変化に対して値が完全に一定となる関数が扱いやすくなります。局所定数とは各点の近傍で一定という意味であり、コンパクト台とは非零点集合の閉包がコンパクトであることです。

<a id="def-afr9-schwartz-bruhat"></a>

<!-- formal-statement-start -->
> **定義（Schwartz–Bruhat関数）**  
> 実素点の試験関数は滑らかな複素数値関数 $g$ で、すべての非負整数 $m,n$ について次を満たすものとする。

$$
\sup_{t\in\mathbb R}(1+|t|)^m|g^{(n)}(t)|<\infty.
$$

> 有限素点および有限アデール上の試験関数は局所定数でコンパクト台を持つ複素数値関数とする。
>
> アデール上の Schwartz–Bruhat 関数全体 $\mathcal S(\mathbb A)$ は、実素点の試験関数と有限アデールの試験関数の積の有限線形結合からなる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr9-schwartz-bruhat -->
**定義の確認**

$g(t)=e^{-\pi t^2}$ は滑らかです。$P_0(t)=1$ と置き、積の微分則と連鎖律を使うと

$$
\frac{d}{dt}(P_n(t)e^{-\pi t^2})
=(P_n'(t)-2\pi tP_n(t))e^{-\pi t^2}.
$$

従って $P_{n+1}=P_n'-2\pi tP_n$ は多項式で、帰納的に $g^{(n)}=P_n g$ です。任意の非負整数 $m,n$ について、

$$
(1+|t|)^m|P_n(t)|e^{-\pi t^2}\longrightarrow0
\qquad (|t|\to\infty).
$$

この式の左辺は連続なので有界です。

$1_E$ は集合 $E$ 上で $1$、外で $0$ となる指示関数です。$1_{\mathbb Z_p}$ は $\mathbb Z_p$ とその補集合がともに開なので局所定数です。整数環のコンパクト性は [AFR8 のコンパクト性定理の証明](../AFR8/index.md#thm-afr8-additive-quotient-compact)で確認しました。従って

$$
f(x)=e^{-\pi x_\infty^2}\prod_p1_{\mathbb Z_p}(x_p)
$$

は Schwartz–Bruhat 関数です。有限側の積は $1_{\widehat{\mathbb Z}}$ です。$\widehat{\mathbb Z}$ は [制限付き直積の位相](../../ANF/ANF19/index.md#def-anf19-restricted-product)で開部分群であり、補集合も開剰余類の和です。そのコンパクト性は [AFR8 のコンパクト性定理の証明](../AFR8/index.md#thm-afr8-additive-quotient-compact)で確認しました。従って有限側も局所定数でコンパクト台を持ち、上の積は定義を満たします。
<!-- definition-example-end -->

実成分に単なる区間指示関数を使うと端点で不連続となり、微分を使った周波数側の減衰評価ができません。有限側では球が開かつ閉であるため、指示関数を選んでも局所定数性が失われません。

<a id="lem-afr9-finite-cosets"></a>

<!-- formal-statement-start -->
> **補題（有限アデール試験関数の剰余類分解）**  
> $\mathbb A_f$ 上の局所定数なコンパクト台関数 $h$ に対して、ある正の有理数 $d$ と有限個の有理数 $b_j$、複素数 $c_j$ が存在して

$$
h(x_f)=\sum_j c_j1_{b_j+d\widehat{\mathbb Z}}(x_f).
$$

> 剰余類は互いに素に選べる。
<!-- formal-statement-end -->

### 証明の見取り図

局所定数性が各点に小さい球を与え、コンパクト性が必要な球の個数を有限にします。共通の細かさに分割すればよいです。

<!-- proof-start -->
### 証明

制限付き直積の位相の基底から、任意の点で $a+\prod_p p^{k_p}\mathbb Z_p$（ほとんどすべての $k_p=0$）という近傍を選べます。局所定数性から $h$ がその上で一定となるよう小さくします。非零点集合はその補集合も開なので閉であり、台と一致してコンパクトです。これを有限個の近傍で被覆します。

各近傍の部分群の共通部分を取ると、指数は各 $p$ で有限個の指数の最大値となります。従って共通部分は $K=d\widehat{\mathbb Z}$ の形で、各元の近傍の部分群に有限指数で含まれます。指数は有限個の素数での $p$ の冪の積です。それぞれの近傍を $K$ の有限個の剰余類に分割すると、重なる剰余類は同一なので重複を除けます。

最後に任意の有限アデール $a$ に対して [AFR8 の標準代表元定理](../AFR8/index.md#thm-afr8-additive-normal-form)を $(0,a/d)$ に適用します。ある有理数 $q$ が存在して $a/d-q\in\widehat{\mathbb Z}$ なので、$a+d\widehat{\mathbb Z}=dq+d\widehat{\mathbb Z}$ です。従って各剰余類に有理数代表元を選べます。
<!-- proof-end -->

例えば $1_{1/2+2\widehat{\mathbb Z}}$ は $2$ 進成分が $1/2+2\mathbb Z_2$ にあり、他の有限成分が整であることを検査します。有限素点を個別に制約する条件を一つの剰余類として扱えます。

## 4. 球の Fourier 変換は双対の球になる

[実数上の Fourier 変換](../../../解析系/FOU/FOU3/index.md#def-fou3-fourier-transform)では $e^{-i\xi t}$ を積分核としました。ここでは実成分の周波数を $y\in\mathbb R$ として $\xi=2\pi y$ に取り替えます。混同を防ぐため、実試験関数 $g$ のこの規格化の変換を $G(y)=\int_{\mathbb R}g(t)e^{-2\pi ity}dt$ と書きます。有限素点には [標準局所加法指標](#def-afr9-additive-character)を使います。実数での尺度 $2\pi$ と有限素点での測度の規格化をそろえると、反転公式に余分な定数が現れません。

<a id="def-afr9-adelic-fourier"></a>

<!-- formal-statement-start -->
> **定義（アデールFourier変換）**  
> $f\in\mathcal S(\mathbb A)$、$y\in\mathbb A$ とし、$dx$ を第2節の加法測度、$\psi$ を標準の大域加法指標とする。$x$ を積分変数、$y$ を周波数として変換を

$$
\widehat f(y)=\int_{\mathbb A}f(x)\psi(xy)\,dx
$$

> とする。有限素点でも $\mu_p$ と $\psi_p$ を用いて同じ形の変換を定める。有限アデールについては $\mu_f$ と $\psi_f(x_f)=\prod_p\psi_p(x_p)$ を用いる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr9-adelic-fourier -->
**定義の確認**

まず $g(t)=e^{-\pi t^2}$、$h=1_{\widehat{\mathbb Z}}$ とする先ほどの例を周波数 $y=0$ で評価します。$\psi(0)=1$ なので

$$
\widehat f(0)=\int_{\mathbb R}e^{-\pi t^2}dt
\cdot\mu_f(\widehat{\mathbb Z})=1.
$$

実積分の値は [GaussianのFourier変換](../../../解析系/FOU/FOU3/index.md#lem-fou3-gaussian-transform)で $\varepsilon=\pi,\xi=0$ として確認できます。非零周波数に対しては以下の球の変換が計算の鍵になります。
<!-- definition-example-end -->

積分は絶対可積分です。実関数は例えば $m=2,n=0$ の減衰条件から可積分で、有限側は連続かつコンパクト台を持つので有界です。台は開剰余類の有限個で被覆でき、測度は有限です。積の関数 $f=g h$ では $|\psi(xy)|=1$ なので、積測度の下で $\int|f|=(\int|g|)(\int|h|)<\infty$ です。[Fubiniの定理](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-02)を実部と虚部に適用すれば

$$
\widehat f(y)=G(y_\infty)\widehat h(y_f)
$$

となります。有限線形結合にも線形性を適用できます。

<a id="thm-afr9-ball-transform"></a>

<!-- formal-statement-start -->
> **定理（p進球指示関数のFourier変換）**  
> 整数 $k$、$a\in\mathbb Q_p$ に対して、標準局所加法指標と $\mu_p(\mathbb Z_p)=1$ の測度で

$$
\widehat{1_{a+p^k\mathbb Z_p}}(y)
=p^{-k}\psi_p(ay)1_{p^{-k}\mathbb Z_p}(y).
$$
<!-- formal-statement-end -->

### 証明の見取り図

指標が球全体で $1$ なら積分は体積になります。そうでないなら、球を内部の元で平行移動すると積分に $1$ でない定数が掛かります。しかし積分値は変わらないので零です。

<!-- proof-start -->
### 証明

$H=p^k\mathbb Z_p$ とし、$x=a+t$ と置きます。測度は平行移動で変わらず、$\psi_p((a+t)y)=\psi_p(ay)\psi_p(ty)$ なので

$$
\widehat{1_{a+H}}(y)
=\psi_p(ay)I(y),\quad I(y)=\int_H\psi_p(ty)d\mu_p(t).
$$

$y\in p^{-k}\mathbb Z_p$ なら $ty\in\mathbb Z_p$ がすべての $t\in H$ で成立するので $I(y)=\mu_p(H)=p^{-k}$ です。

$y\notin p^{-k}\mathbb Z_p$ なら $t_0=p^k\in H$ に対して $t_0y\notin\mathbb Z_p$、従って $\psi_p(t_0y)\ne1$ です。$H+t_0=H$ なので変数を平行移動すると

$$
I(y)=\int_H\psi_p((t+t_0)y)d\mu_p(t)
=\psi_p(t_0y)I(y).
$$

よって $(1-\psi_p(t_0y))I(y)=0$ から $I(y)=0$ です。
<!-- proof-end -->

$p=2,\ k=1,\ a=1/2$ なら

$$
\widehat{1_{1/2+2\mathbb Z_2}}(y)
=\tfrac12\psi_2(y/2)1_{(1/2)\mathbb Z_2}(y).
$$

$y=1$ では $\psi_2(1/2)=-1$ なので値は $-1/2$、$y=1/4$ では台の外で $0$ です。位相因子と変換後の台を別々に計算する点が重要です。$k=0,a=0$ なら整数環の指示関数は自分自身へ移ります。

実成分の $g(t)=e^{-\pi t^2}$ も [GaussianのFourier変換](../../../解析系/FOU/FOU3/index.md#lem-fou3-gaussian-transform)へ $\varepsilon=\pi,\xi=2\pi y$ を代入すれば $G(y)=e^{-\pi y^2}$ です。

有理数 $b$ と正の有理数 $d$ に対し、局所の式を掛け合わせると有限アデール上では次を得ます。

$$
\widehat{1_{b+d\widehat{\mathbb Z}}}(y_f)
=d^{-1}\psi_f(by_f)1_{d^{-1}\widehat{\mathbb Z}}(y_f).
$$

実際、$b$ は有理数で $d=\prod_p p^{k_p}$、ほとんどすべての素数で $b$ は整かつ $k_p=0$ です。固定した $y_f$ の非整成分も有限個であり、それらをすべて例外集合へ入れると残りの局所積分は $1$ です。

例外集合を $S$ とすると、剰余類は $S$ の局所球の積と、外側の整数環の積からなります。第2節で構成した測度はこの分割上で局所測度の積と外側の確率測度の積に一致します（有限剰余類を指定する集合で一致し、有限測度の一意性で拡張できます）。

外側では $x_py_p$ が整なので指標は $1$ です。従って [Fubiniの定理](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-02)を実部と虚部に適用し、有限個の局所積分の積に [球指示関数の変換](#thm-afr9-ball-transform)を代入すると係数と台の条件は

$$
\prod_p p^{-k_p}=d^{-1},\qquad
y_p\in p^{-k_p}\mathbb Z_p\quad(\text{すべての }p)
$$

となります。特に $b=0,d=1$ なら有限側の指示関数は自分自身へ移ります。実側の Gaussian と積を取ると、先ほどの大域試験関数も自分自身へ移ります。

<a id="thm-afr9-inversion"></a>

<!-- formal-statement-start -->
> **定理（アデールFourier反転）**  
> 標準局所加法指標と前節の加法測度に関し、$f\in\mathcal S(\mathbb A)$ なら $\widehat f\in\mathcal S(\mathbb A)$ であり

$$
\widehat{\widehat f}(x)=f(-x).
$$

> 有限アデール上の試験関数についても同じ反転式が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

有限側では剰余類の幅が逆になり、二度目の係数で体積が打ち消されます。実側では既習の反転を周波数変数の変更によって使います。

<!-- proof-start -->
### 証明

有限側の指示関数 $h=1_{b+d\widehat{\mathbb Z}}$ から始めます。変換はコンパクトな開部分群 $d^{-1}\widehat{\mathbb Z}$ 上の指標の定数倍です。$b\ne0$ なら $z\in b^{-1}\widehat{\mathbb Z}$ に対して $bz\in\widehat{\mathbb Z}$ なので $\psi_f(b(y_f+z))=\psi_f(by_f)$ です。従って指標は局所定数です（$b=0$ なら恒等的に $1$）。台の外も開なので、変換は試験関数です。二度目の変換は

$$
\widehat{\widehat h}(x_f)
=d^{-1}\int_{d^{-1}\widehat{\mathbb Z}}
\psi_f((b+x_f)y_f)\,d\mu_f(y_f).
$$

球指示関数を素点ごとに掛け合わせた変換公式で $b=0$、幅 $d^{-1}$、周波数 $b+x_f$ を選ぶと

$$
\widehat{\widehat h}(x_f)
=d^{-1}d\,1_{d\widehat{\mathbb Z}}(b+x_f)
=h(-x_f).
$$

[剰余類分解](#lem-afr9-finite-cosets)と線形性により有限側の任意の試験関数へ拡張できます。

実側では第4節の $G(y)$ を使います。$G^{(n)}$ は周波数 $y$ に関する $n$ 階微分で、積分変数 $t$ に関する微分とは区別します。各 $n$ について $|t|^{n+1}|g(t)|$ が可積分です。増分 $h\in\mathbb R\setminus\{0\}$ に対し、$e^{-2\pi ity}$ を $y$ について微分する差商は

$$
e^{-2\pi ity}\frac{e^{-2\pi ith}-1}{h}\longrightarrow (-2\pi it)e^{-2\pi ity}.
$$

$|e^{-2\pi ith}-1|\le2\pi|th|$ を用いれば、$(-2\pi it)^n g(t)$ に対しても絶対値が $(2\pi|t|)^{n+1}|g(t)|$ に支配されます。[優収束定理](../../../解析系/F0/F0-00D2B/index.md#thm-f0-00d2b-01)を実部・虚部に適用して微分を積分の中に入れることを繰り返せるので

$$
G^{(n)}(y)=\int (-2\pi it)^n g(t)e^{-2\pi ity}dt.
$$

$u(t)=(-2\pi it)^n g(t)$ と置きます。以下の $u',u^{(j)}$ は積分変数 $t$ に関する微分で、周波数 $y$ は固定します。$\|u\|_1=\int_{\mathbb R}|u(t)|dt$ と書きます。積の微分則により $u^{(j)}$ は $g$ の微分と多項式の有限和で、可積分かつ無限遠で零になります。部分積分を一回行うと境界項は零で

$$
\int u'(t)e^{-2\pi ity}dt
=2\pi iy\int u(t)e^{-2\pi ity}dt.
$$

これを $u',u'',\ldots$ にも適用して $m$ 回繰り返すと

$$
(2\pi iy)^m G^{(n)}(y)
=\int u^{(m)}(t)e^{-2\pi ity}dt.
$$

右辺の絶対値は $\|u^{(m)}\|_1$ 以下です。$|y|\ge1$ ではこの評価を、$|y|<1$ では $|G^{(n)}(y)|\le\|u\|_1$ を用いて、すべての $m,n$ の減衰条件を得ます。

従って $g$ と $G$ はともに連続かつ可積分です。[実数のFourier反転定理](../../../解析系/FOU/FOU3/index.md#thm-fou3-inversion)における変換は $G(\xi/2\pi)$ です。反転積分で $\xi=2\pi y$、$d\xi=2\pi dy$ と置くと

$$
g(t)=\int_{\mathbb R}G(y)e^{2\pi ity}dy.
$$

$t=-x$ を代入すると二重変換は $g(-x)$ です。

大域では絶対可積分な積の関数について [Fubiniの定理](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-02)により実側・有限側の積分が分離します。それぞれが試験関数に移り、二重変換が符号反転になるので、有限線形結合でも結論が成立します。
<!-- proof-end -->

ここで反転の係数が $1$ となる測度の選択を自己双対規格化と呼びます。例えば $\mu_p$ を $c\mu_p$（$c>0$）に変えると、一回の変換に $c$、二回で $c^2$ が掛かります。指標を固定したまま測度を自由に変えることはできません。

## 5. 有限アデールの和と大域の Poisson 和

有限側だけでも、コンパクトな部分群をより小さい開部分群で割ると有限個の周波数を使う和公式が得られます。正整数 $N$ に対し、有限商

$$
N^{-1}\widehat{\mathbb Z}/N\widehat{\mathbb Z}
$$

を考えます。これは $j/N$（$0\le j<N^2$）で代表されます。

実際、$x_f\in N^{-1}\widehat{\mathbb Z}$ なら $Nx_f$ は整であり、各素数で $N^2$ を法とする剰余を同時に満たす整数 $j$ を選べます。互いに素な素数冪ごとの合同条件を合わせるため、

$$
M=N^2,\qquad m_p=p^{2v_p(N)},\qquad M_p=M/m_p
$$

と置きます。$p\mid N$ では $M_p$ と $m_p$ が互いに素なので、整数 $u_p$ を

$$
M_p u_p\equiv1\pmod{m_p}
$$

となるように選べます。剰余を $r_p$ とすれば、

$$
j\equiv\sum_{p\mid N}r_p M_p u_p\pmod M,\qquad
0\le j<M
$$

と選ぶことで全合同条件を満たします。$N=1$ では $j=0$ です。

二つの代表元の差が $N\widehat{\mathbb Z}$ に属することは、$(j-j')/N^2$ が全有限素点で整であること、すなわち整数であることと同値です。

$h$ が $N^{-1}\widehat{\mathbb Z}$ に台を持ち、$N\widehat{\mathbb Z}$ の各剰余類で一定であるとします。$h$ は中心 $b=j/N$、幅 $d=N$ の剰余類の指示関数の線形結合です。[球指示関数の変換](#thm-afr9-ball-transform)の有限素点での積から、変換は $N^{-1}\widehat{\mathbb Z}$ に台を持ちます。

周波数を $y_f$ から $y_f+Nz$（$z\in\widehat{\mathbb Z}$）に変えても、位相の追加因子は $\psi_f(jz)=1$ です。従って変換も同じ剰余類で一定になります。代表元 $k/N$ で変換を評価すると各剰余類の体積は $1/N$ であり、[大域加法指標の自明性](#prop-afr9-global-character)から

$$
\widehat h(k/N)=\frac1N\sum_{j=0}^{N^2-1}
h(j/N)e^{2\pi ijk/N^2}.
$$

これを $k=N\ell$（$0\le\ell<N$）で足します。有限幾何級数の和は

$$
\sum_{\ell=0}^{N-1}e^{2\pi ij\ell/N}
=\begin{cases}N&N\mid j,\\0&N\nmid j.\end{cases}
$$

従って和を交換し、残る添字を $j=N r$（$0\le r<N$）と書くと、

$$
\sum_{\ell=0}^{N-1}\widehat h(\ell)
=\frac1N\sum_{j=0}^{N^2-1}h(j/N)\sum_{\ell=0}^{N-1}e^{2\pi ij\ell/N}
=\sum_{r=0}^{N-1}h(r).
$$

これが有限商上の Poisson 型等式です。すなわち

$$
\sum_{\ell=0}^{N-1}\widehat h(\ell)
=\sum_{\ell=0}^{N-1}h(\ell)
$$

が得られます。例えば $N=2$ で $h=1_{2\widehat{\mathbb Z}}$ とすると、左辺は $\widehat h(0)+\widehat h(1)=1/2+1/2=1$、右辺は $h(0)+h(1)=1+0=1$ です。ここで足しているのは有限商の部分群の代表元であって、対角有理数全体ではありません。

### 実成分も合わせた公式

有限側の剰余類 $b+d\widehat{\mathbb Z}$ に属する対角有理数は何でしょうか。$q$ がその集合に属する条件は $(q-b)/d$ がすべての有限素点で整ということです。従って

$$
\mathbb Q\cap(b+d\widehat{\mathbb Z})=b+d\mathbb Z.
$$

有限側の制約が実側の等間隔の格子を選びます。実側の周期化を用いると、この格子上の和を周波数側の逆格子上の和へ移せます。

<a id="thm-afr9-poisson"></a>

<!-- formal-statement-start -->
> **定理（有理数体のアデールPoisson和公式）**  
> $f\in\mathcal S(\mathbb A)$ とし、標準大域加法指標と自己双対規格化の加法測度で変換を取る。両辺は絶対収束し、

$$
\sum_{q\in\mathbb Q}f(q)
=\sum_{q\in\mathbb Q}\widehat f(q).
$$

> ここで各 $q$ は対角埋め込みによって評価する。
<!-- formal-statement-end -->

### 証明の見取り図

有限アデールの剰余類分解により、有理数の和を $b+d\mathbb Z$ 上の和に帰着します。実関数を周期化して Fourier 係数を求めると、逆格子 $d^{-1}\mathbb Z$ 上の変換値になります。有限指標の符号が実側の平行移動の位相を正確に再現します。

<!-- proof-start -->
### 証明

[剰余類分解](#lem-afr9-finite-cosets)と線形性により $f(x)=g(x_\infty)1_{b+d\widehat{\mathbb Z}}(x_f)$ だけを考えれば十分です。$d>0,b\in\mathbb Q$ です。上の格子の同定から左辺は $\sum_{n\in\mathbb Z}g(b+dn)$ です。

実数 $t$ を固定して平行移動の添字 $n$ に関して和を取る、周期 $d$ の関数

$$
P(t)=\sum_{n\in\mathbb Z}g(t+dn)
$$

を作ります。$0\le t\le d$ で $|n|\ge2$ なら $|t+dn|\ge d(|n|-1)$ であり、任意の微分階数 $j$ について

$$
|g^{(j)}(t+dn)|\le C_j(1+d(|n|-1))^{-2}.
$$

ここで $C_j=\sup_u(1+|u|)^2|g^{(j)}(u)|<\infty$ です。右辺の和は有限なので、関数の級数とすべての微分級数が一周期上で一様絶対収束します。従って $P$ は滑らかで、添字を $n+1$ にずらせば周期性が分かります。

第 $k$ Fourier 係数を計算します。一様収束により和と積分を交換し、各項で $u=t+dn$ と置きます。

$$
\begin{aligned}
c_k
&=\frac1d\int_0^d P(t)e^{-2\pi ikt/d}dt\\
&=\frac1d\sum_n\int_{dn}^{d(n+1)}
g(u)e^{-2\pi ik(u-dn)/d}du\\
&=\frac1d\int_{\mathbb R}g(u)e^{-2\pi iku/d}du\\
&=\frac1d G(k/d).
\end{aligned}
$$

第3行では $e^{2\pi ikn}=1$ を使いました。

[アデールFourier反転の証明](#thm-afr9-inversion)で得た $G$ の急減少性から $\sum_k|c_k|<\infty$ です。したがって Fourier 級数は一様絶対収束します。その和は $P$ に等しいことを確認します。

[Fejér平均の一様近似定理](../../../解析系/FOU/FOU2/index.md#thm-fou2-fejer-uniform)を、$s=2\pi t/d$ と変数を変えた連続 $2\pi$ 周期関数の実部・虚部へ適用します。Fejér 平均は $P$ へ一様収束します。一方、一様収束する Fourier 部分和の平均は同じ Fourier 級数の和に収束します。よって

$$
P(b)=\frac1d\sum_{k\in\mathbb Z}
G(k/d)e^{2\pi ikb/d}.
$$

変換側の有限指示関数の式から

$$
\widehat f(q)=d^{-1}G(q)\psi_f(bq)
1_{d^{-1}\widehat{\mathbb Z}}(q).
$$

対角有理数のうち台に入るのは $q=k/d$ だけです。[大域加法指標の自明性](#prop-afr9-global-character)を有理数 $bq$ に適用すると

$$
\psi_f(bq)=e^{2\pi ibq}.
$$

従って変換側の和も上の $P(b)$ と一致します。両辺の絶対収束は $g,G$ の急減少性から従います。有限線形結合を取っても絶対収束と等式が保たれるので一般の $f$ について成立します。
<!-- proof-end -->

有限アデールだけで対角 $\mathbb Q$ 上の同じ和を取れるわけではありません。例えば $1_{\widehat{\mathbb Z}}$ を $\mathbb Q$ 上で足すと、すべての整数に対して $1$ なので発散します。有限側の Poisson 計算の役割は、剰余類の格子とその逆格子の対応を取り出すことです。実素点を合わせることで絶対収束する大域公式になります。

例えば $g(t)=e^{-\pi a t^2}$（$a>0$）、有限成分を $1_{\widehat{\mathbb Z}}$ と取ります。[GaussianのFourier変換](../../../解析系/FOU/FOU3/index.md#lem-fou3-gaussian-transform)で $\varepsilon=\pi a,\xi=2\pi y$ を代入すれば

$$
G(y)=a^{-1/2}e^{-\pi y^2/a}.
$$

[有理数体のアデールPoisson和公式](#thm-afr9-poisson)により

$$
\sum_{n\in\mathbb Z}e^{-\pi a n^2}
=a^{-1/2}\sum_{n\in\mathbb Z}e^{-\pi n^2/a}.
$$

$a$ と $1/a$ を入れ替える変換則です。次講ではこのような大域の変換則を絶対値の冪で重み付けして積分し、ゼータ積分の関数等式へつなげます。

## 6. 演習

### A1. p進小数部分

$\{5/12\}_2,\{5/12\}_3$ を求め、対角有理数 $5/12$ で大域指標が $1$ となることを確かめよ。

- Level: A
- ID: AFR9-A1

<!-- solution-start -->
**詳細解答。** [標準局所加法指標の定義](#def-afr9-additive-character)で用いた小数部分は、$[0,1)$ 内で分母が $p$ の冪かつ元との差が $p$ 進整数となる唯一の有理数です。$2$ 進では分母 $4$ の候補を探します。$5/12-3/4=-1/3$ は $2$ 進整数なので $\{5/12\}_2=3/4$ です。$3$ 進では $5/12-2/3=-1/4$ が $3$ 進整数なので $\{5/12\}_3=2/3$ です。他の素数では分母が単数なので小数部分は零です。

$$
-\frac5{12}+\frac34+\frac23
=\frac{-5+9+8}{12}=1.
$$

[大域加法指標](#prop-afr9-global-character)は $e^{2\pi i}=1$ です。
<!-- solution-end -->

### A2. 球の体積

$3$ 進球 $2+3^2\mathbb Z_3$ の体積と、それを $3^{-3}$ 倍した球の体積を求めよ。

- Level: A
- ID: AFR9-A2

<!-- solution-start -->
**詳細解答。** [局所測度の規格化](#prop-afr9-local-measure)から元の体積は $3^{-2}=1/9$ です。尺度変換後の球は $2/27+3^{-1}\mathbb Z_3$ で、体積は $3^{-(-1)}=3$ です。比は $27=|3^{-3}|_3$ となります。
<!-- solution-end -->

### A3. 移動した球の変換

$h=1_{1/3+3\mathbb Z_3}$ の変換を求め、$y=0,1,1/9$ で評価せよ。

- Level: A
- ID: AFR9-A3

<!-- solution-start -->
**詳細解答。** [球指示関数の変換](#thm-afr9-ball-transform)で $a=1/3,k=1$ と選ぶと

$$
\widehat h(y)=\frac13\psi_3(y/3)1_{3^{-1}\mathbb Z_3}(y).
$$

$0$ と $1$ は台に属し、$\psi_3(0)=1$、$\psi_3(1/3)=e^{2\pi i/3}$ です。$1/9$ は付値 $-2<-1$ なので台の外です。従って順に $1/3,e^{2\pi i/3}/3,0$ です。
<!-- solution-end -->

### A4. Schwartz–Bruhat 条件の確認

$g(t)=t e^{-\pi t^2}$、$h=1_{1/2+3\widehat{\mathbb Z}}$ とする。$f=g\,h$ がアデール上の Schwartz–Bruhat 関数であることを確認せよ。

- Level: A
- ID: AFR9-A4

<!-- solution-start -->
**詳細解答。** 多項式 $P(t)$ に対して

$$
(P(t)e^{-\pi t^2})'
=(P'(t)-2\pi tP(t))e^{-\pi t^2}.
$$

帰納的に $g^{(n)}$ は多項式と Gaussian の積であり、任意の $m$ について $(1+|t|)^m|g^{(n)}(t)|$ は無限遠で零に収束し、連続性から有界です。$3\widehat{\mathbb Z}$ は $\widehat{\mathbb Z}$ の開部分群で、[AFR8 で確認したコンパクトな $\widehat{\mathbb Z}$](../AFR8/index.md#thm-afr8-additive-quotient-compact) の $3$ 倍の連続像なのでコンパクトです。剰余類も開かつコンパクトで、補集合は他の剰余類の和なので開です。指示関数は局所定数でコンパクト台を持ちます。従って [Schwartz–Bruhat関数の条件](#def-afr9-schwartz-bruhat)を満たします。
<!-- solution-end -->

### B1. 消える振動を積分で確認する

$p=5$ とする。$\int_{\mathbb Z_5}\psi_5(yx)d\mu_5(x)$ を $y=2/5$ と $y=5$ について、剰余類への分割を使って求めよ。

- Level: B
- ID: AFR9-B1

<!-- solution-start -->
**詳細解答。** $y=2/5$ のとき $\mathbb Z_5=\bigcup_{j=0}^4(j+5\mathbb Z_5)$ と分割します。$x=j+5z$ とすれば $yx=2j/5+2z$ で後半は整です。[局所測度の規格化](#prop-afr9-local-measure)から各剰余類の体積は $1/5$ なので、$\omega=e^{2\pi i/5}$ とおくと

$$
I=\frac15\sum_{j=0}^4\omega^{2j}
=\frac15\frac{1-(\omega^2)^5}{1-\omega^2}=0.
$$

$\omega^2\ne1$ が分母の非零性を保証します。$y=5$ では $5x$ は全て整なので指標は恒等的に $1$、積分は $1$ です。[球指示関数の変換](#thm-afr9-ball-transform)の台と一致します。
<!-- solution-end -->

### B2. 有限アデールで幅を反転する

$h=1_{1/3+(2/3)\widehat{\mathbb Z}}$ の変換を求め、変換後の台に入る有理数全体を示せ。二重変換を直接確認せよ。

- Level: B
- ID: AFR9-B2

<!-- solution-start -->
**詳細解答。** $d=2/3$ の局所指数は $k_2=1,k_3=-1$、他は零です。[球指示関数の変換](#thm-afr9-ball-transform)を各素点へ適用すると体積係数は $(1/2)\cdot3=3/2$、台は $(3/2)\widehat{\mathbb Z}$ です。

$$
\widehat h(y_f)=\frac32\psi_f(y_f/3)
1_{(3/2)\widehat{\mathbb Z}}(y_f).
$$

$q$ が台に属するには $2q/3$ が全有限素点で整、すなわち整数であることが必要十分です。従って $q\in(3/2)\mathbb Z$ です。

二重変換では $\psi_f(y_f/3)\psi_f(x_fy_f)=\psi_f((x_f+1/3)y_f)$ です。従って第4節の有限アデールの球の変換式を幅 $3/2$、中心 $0$、周波数 $x_f+1/3$ に適用します。変換後の球の体積は $2/3$ です。

$$
\widehat{\widehat h}(x_f)
=\frac32\cdot\frac23
1_{(2/3)\widehat{\mathbb Z}}(x_f+1/3)
=h(-x_f).
$$
<!-- solution-end -->

### B3. 自己双対規格化を壊す

局所測度を $\nu_p=2\mu_p$ に変え、指標はそのままとする。$h=1_{\mathbb Z_p}$ の二重変換を計算し、反転式が成立しなくなる理由を説明せよ。

- Level: B
- ID: AFR9-B3

<!-- solution-start -->
**詳細解答。** [球指示関数の変換](#thm-afr9-ball-transform)で $a=k=0$ なら標準測度で $\widehat h=h$ です。新しい測度での変換を $T$ と書けば $Th=2h$ です。線形性により $T^2h=T(2h)=4h$ となります。$h(-x)=h(x)$ なので係数 $4$ の差が残ります。測度の規格化は一度ごとに積分へ掛かるため、標準測度の反転をそのまま使えません。
<!-- solution-end -->

### B4. 有理数の双対を検査する

$y\in\mathbb A$ が全 $q\in\mathbb Q$ に対して $\psi(qy)=1$ を満たすとする。$y$ が対角有理数であることを示せ。

- Level: B
- ID: AFR9-B4

<!-- solution-start -->
**詳細解答。** [AFR8 の標準代表元定理](../AFR8/index.md#thm-afr8-additive-normal-form)で $y-r=z\in[0,1)\times\widehat{\mathbb Z}$ となる有理数 $r$ を選びます。$qr$ は有理数なので [大域加法指標の自明性](#prop-afr9-global-character)から

$$
\psi(qz)=\psi(qy)\psi(-qr)=1.
$$

$q=1$ では全有限指標が $1$ であるため $e^{-2\pi iz_\infty}=1$ です。$0\le z_\infty<1$ から $z_\infty=0$ となります。

任意の素数 $p$ と正整数 $n$ を取り $q=p^{-n}$ とします。他の素点 $\ell\ne p$ では $p^{-n}$ が $\ell$ 進整数であるため指標は $1$、実成分も零です。よって

$$
1=\psi_p(p^{-n}z_p)
\quad\Longrightarrow\quad z_p\in p^n\mathbb Z_p.
$$

全 $n$ で成立し、非零の $p$ 進整数は有限の付値しか持たないため $z_p=0$ です。全成分が零となり $y=r$ です。逆に対角有理数は自明性により条件を満たすので、対角有理数の振動をすべて消す周波数は対角有理数ちょうど全体です。
<!-- solution-end -->

### C1. 移動した格子の Poisson 公式

$a>0$ とし、$f(x)=e^{-\pi a x_\infty^2}1_{1/2+2\widehat{\mathbb Z}}(x_f)$ とする。

1. 対角有理数のうち $f$ が非零になる集合を求めよ。
2. $\widehat f$ の式を求めよ。
3. Poisson 和公式を実数上の級数の等式として書け。周波数側の位相を明示せよ。
4. 有限側だけの指示関数を対角有理数上で足すとどうなるか説明せよ。

- Level: C
- ID: AFR9-C1

<!-- solution-start -->
**詳細解答。** 有限側の条件は $(q-1/2)/2$ が全有限素点で整であることです。既約分数の分母に素因数があるとその付値が負になるため、これは $(q-1/2)/2\in\mathbb Z$ と同値です。従って左辺の非零項は $q=1/2+2n$ です。

実変換は [GaussianのFourier変換](../../../解析系/FOU/FOU3/index.md#lem-fou3-gaussian-transform)に $\varepsilon=\pi a,\xi=2\pi y_\infty$ を代入して求めます。有限側は [球指示関数の変換](#thm-afr9-ball-transform)を $2$ 進で指数 $k=1$、他の素点では $k=0$ とし、すべて中心 $1/2$ として適用します。よって

$$
\widehat f(y)=\frac1{2\sqrt a}
e^{-\pi y_\infty^2/a}
\psi_f(y_f/2)1_{(1/2)\widehat{\mathbb Z}}(y_f).
$$

有限側の台に属する対角有理数は $q=k/2$ です。[大域加法指標の自明性](#prop-afr9-global-character)から

$$
\psi_f(q/2)=e^{2\pi i q/2}=e^{\pi ik/2}.
$$

従って [有理数体のアデールPoisson和公式](#thm-afr9-poisson)は

$$
\sum_{n\in\mathbb Z}e^{-\pi a(1/2+2n)^2}
=\frac1{2\sqrt a}\sum_{k\in\mathbb Z}
e^{-\pi k^2/(4a)}e^{\pi ik/2}.
$$

$k$ と $-k$ の項を合わせると位相の虚部は相殺され、実数の等式になります。両辺は Gaussian の減衰から絶対収束します。

最後に有限側のみでは $q=1/2+2n$ のすべてで指示関数が $1$ なので和は発散します。有限側の格子の選択と、実側の減衰の両方が大域公式に必要です。
<!-- solution-end -->
