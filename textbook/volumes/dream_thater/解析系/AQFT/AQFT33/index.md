# AQFT33 部分環制限と相対エントロピーの単調性

[AQFT32の正値性定理](../AQFT32/index.md#thm-aqft32-positivity-rigidity)は、同じ環の二状態を区別する量が非負であると教えます。ところが、実験者が観測できる代数を小さくしたら、二状態の区別はどう変わるのでしょう。密度行列の部分トレースはType IIIの局所von Neumann環には一般に存在しません。必要なのは「行列を消去する」操作ではなく、**状態を部分環に制限する**操作です。

本講では、相対モジュラー作用素の逆作用素の変分表示を、一般の正規状態について最初から証明します。この方法なら、状態が非忠実である場合も、相対エントロピーが無限大である場合も、有限次元への還元なしに扱えます。内積は先行講と同じく第2変数線形、対数は自然対数です。

## 1. 情報を捨てるとは何か

$\mathcal N\subset\mathcal M$ を**単位元を共有する**von Neumann環の包含とします。$\rho,\sigma$ は $\mathcal M$ の正規状態です。$\rho|_{\mathcal N}$ は $A\in\mathcal N$ に $\rho(A)$ を対応させる状態であり、正規性は制限後も保たれます。$\mathcal N$ の観測量しか使わない者には、$\mathcal M$ で異なる状態さえ同一に見えることがあります。

たとえば $\mathcal M=M_2(\mathbb C)$、$\mathcal N$ を対角行列の環とし、

$$
\rho=\begin{pmatrix}1/2&1/4\\1/4&1/2\end{pmatrix},
\qquad
\sigma=\begin{pmatrix}1/2&-1/4\\-1/4&1/2\end{pmatrix}
$$

とします。両者の固有値は $3/4,1/4$ で、正定値・トレース1です。非対角成分は違いますが、対角観測量 $A=\operatorname{diag}(a,b)$ については

$$
\operatorname{Tr}(\rho A)
=(a+b)/2=\operatorname{Tr}(\sigma A)
$$

です。[AQFT32の零条件](../AQFT32/index.md#thm-aqft32-positivity-rigidity)から、制限後の相対エントロピーは0です。一般には、どの二状態についても、情報を捨てた後の値が増えないことを証明したいのです。

<a id="def-aqft33-restriction"></a>

<!-- formal-statement-start -->
> **定義（正規状態の部分環への制限）**  
> $\mathcal N\subset\mathcal M$ を単位元を共有するvon Neumann環の包含とし、$\rho$ を $\mathcal M$ 上の正規状態とする。$\mathcal N$ 上の正規状態 $\rho|_{\mathcal N}$ を

$$
\rho|_{\mathcal N}(A)=\rho(A)
\qquad (A\in\mathcal N)
$$

> と定める。二状態 $\rho,\sigma$ の制限もそれぞれ同様に定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft33-restriction -->
### 直接例：二準位の対角観測量

上の $\rho,\sigma$ に対し、$A=\operatorname{diag}(a,b)$ のみを評価すると二状態とも $(a+b)/2$ です。$A=I$ で値は1、$A\ge0$ なら $a,b\ge0$ なので値は非負です。$\mathcal N$ は有限次元ゆえ制限は正規です。他方、$B=\begin{pmatrix}0&1\\1&0\end{pmatrix}\in\mathcal M$ では $\rho(B)=1/2$、$\sigma(B)=-1/2$ となり、制限前の状態は異なります。**定義の確認**：対象、正値性、規格化、制限による識別差の消失を直接確認しました。
<!-- definition-example-end -->

ここで注意すべきは、$\mathcal N$ の支持射影 $s_{\mathcal N}(\rho|_{\mathcal N})$ と $\mathcal M$ の支持射影 $s_{\mathcal M}(\rho)$ を無条件に同一視できないことです。たとえば $\rho=|+\rangle\langle+|$、$|+\rangle=(e_1+e_2)/\sqrt2$ なら、$\mathcal M$ での支持は階数1ですが、対角環へ制限した状態は $(1/2,1/2)$ で忠実、支持は単位元です。[AQFT31の支持射影](../AQFT31/index.md#def-aqft31-support)を、必ずその状態が作用する環ごとに使います。

## 2. 逆作用素の変分表示を作る

[AQFT31の支持付き相対Tomita作用素](../AQFT31/index.md#def-aqft31-relative-tomita-supported)を $S_{\sigma\mid\rho}$ とし、$\Delta_{\sigma\mid\rho}=S_{\sigma\mid\rho}^{\sharp}S_{\sigma\mid\rho}$ とします。一般には $\Delta$ は非有界かつ核を持ちますが、$s>0$ とすれば $\Delta+sI$ には有界な逆作用素があります。

まず非負自己共役作用素 $T$ の二次形式を考えます。$\operatorname{Dom}T^{1/2}$ 上で、正の定数 $s$ を加えた二次形式はノルムを定めます。そのノルムで平方完成すると、有界作用素の逆行列公式を非有界作用素にも使える形へ直せます。

<a id="lem-aqft33-resolvent-variational"></a>

<!-- formal-statement-start -->
> **補題（非負自己共役作用素の逆作用素の変分表示）**  
> $T\ge0$ をHilbert空間 $\mathcal H$ 上の非負自己共役作用素、$s>0$、$v\in\mathcal H$ とする。このとき

$$
\begin{aligned}
\langle v,(T+sI)^{-1}v\rangle
=\sup_{x\in\operatorname{Dom}T^{1/2}}
\bigl(&2\operatorname{Re}\langle v,x\rangle\\
&-\|T^{1/2}x\|^2-s\|x\|^2\bigr).
\end{aligned}
$$

> また $\operatorname{Dom}T^{1/2}$ に対する二次形式の芯（その形式ノルムで稠密な部分空間）に、上限を制限しても値は変わらない。
<!-- formal-statement-end -->

### 証明の見取り図

$s>0$ によって $(T+sI)^{-1/2}$ は有界になります。平方完成の残差の二乗ノルムは常に非負で、等号を与えるベクトルは $(T+sI)^{-1}v$ です。

<!-- proof-start -->
### 証明

$B=(T+sI)^{1/2}$ と置くと $B$ は定義域 $\operatorname{Dom}T^{1/2}$ 上で定義され、$B^{-1}$ は有界な全域作用素です。スペクトル関数計算と内積の自己共役性から

$$
\begin{aligned}
\|Bx-B^{-1}v\|^2
&=\|Bx\|^2-2\operatorname{Re}\langle Bx,B^{-1}v\rangle+\|B^{-1}v\|^2\\
&=\|T^{1/2}x\|^2+s\|x\|^2
-2\operatorname{Re}\langle v,x\rangle\\
&\quad+\langle v,(T+sI)^{-1}v\rangle.
\end{aligned}
$$

第2行では $\|Bx\|^2=\|T^{1/2}x\|^2+s\|x\|^2$、$\langle Bx,B^{-1}v\rangle=\langle x,v\rangle$ を使いました。残差が0となる $x=B^{-2}v=(T+sI)^{-1}v$ は $\operatorname{Dom}T$ に入るので上限を達成します。

さらに括弧内の式は形式ノルム $\|Bx\|$ に関して連続です。実際 $|\langle v,x-y\rangle|\le\|v\|\|x-y\|\le\|v\|\|B^{-1}\|\|B(x-y)\|$ です。形式の芯から $x$ を近似すれば上限は変わりません。
<!-- proof-end -->

この補題を相対モジュラー作用素へ代入します。$s(\rho)$ を $p$ と書くと、[支持付き相対Tomita作用素の定義](../AQFT31/index.md#def-aqft31-relative-tomita-supported)により初期定義域上で

$$
S(A\xi_\rho+\zeta)=pA^*\xi_\sigma,
\qquad
\zeta\in(1-q)\mathcal H,
\quad
q=s_{\mathcal M'}(\xi_\rho).
$$

$\mathcal M\xi_\rho$ と $(1-q)\mathcal H$ は直交し、$\xi_\rho\in q\mathcal H$ です。従って $\zeta$ には線形項がなく、$s\|\zeta\|^2$ だけが減点されるので、上限を求める際は $\zeta=0$ としてよいのです。

<a id="lem-aqft33-algebra-variational"></a>

<!-- formal-statement-start -->
> **補題（相対逆作用素の代数上の変分表示）**  
> 単位的von Neumann環 $\mathcal M$ 上の任意の正規状態 $\rho,\sigma$ の[AQFT31の支持付き相対モジュラー作用素](../AQFT31/index.md#def-aqft31-relative-tomita-supported)を $\Delta_{\sigma\mid\rho}$ とする。$s>0$ に対し

$$
\begin{aligned}
R_{\mathcal M}(s)
&:=\langle\xi_\rho,(\Delta_{\sigma\mid\rho}+sI)^{-1}\xi_\rho\rangle\\
&=\sup_{A\in\mathcal M}
\left\{2\operatorname{Re}\rho(A)
-\sigma(AA^*)-s\rho(A^*A)\right\}.
\end{aligned}
$$

> この等式は $\rho,\sigma$ の忠実性、有限次元性、相対エントロピーの有限性を仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

一見すると $S(A\xi_\rho)=pA^*\xi_\sigma$ に支持射影 $p$ が残り、比較相手の二次形式は $\sigma(ApA^*)$ になります。しかし、最適化する $A$ を $Ap$ に置き換えると、入力側は変わらず比較相手の負の項だけが小さくなります。この一手により二状態の評価を**同じ代数の元で比較できる**式が得られます。

<!-- proof-start -->
### 証明

[非負自己共役作用素の変分表示](#lem-aqft33-resolvent-variational)を $T=\Delta_{\sigma\mid\rho}=S^\sharp S$ と $v=\xi_\rho$ に適用します。$\operatorname{Dom}\Delta^{1/2}=\operatorname{Dom}S$ であり、$S$ の初期定義域は閉包のグラフの芯です。$q\mathcal H=\overline{\mathcal M\xi_\rho}$ と $S\zeta=0$ を使うと

$$
\begin{aligned}
R_{\mathcal M}(s)
=\sup_{A\in\mathcal M}\bigl\{
2\operatorname{Re}\rho(A)
-\|pA^*\xi_\sigma\|^2
-s\rho(A^*A)\bigr\}.
\end{aligned}
$$

ここで $p\in\mathcal M$ は $\rho$ の支持射影で、$p\xi_\rho=\xi_\rho$ です。直交射影だから

$$
\|pA^*\xi_\sigma\|^2
=\langle\xi_\sigma,ApA^*\xi_\sigma\rangle
=\sigma(ApA^*).
$$

$\sigma(AA^*)\ge\sigma(ApA^*)$ なので、補題の右辺の上限は上式以下です。逆向きには、任意の $A\in\mathcal M$ に対し $B=Ap\in\mathcal M$ と取ります。$p\xi_\rho=\xi_\rho$ より

$$
\rho(B)=\rho(A),\qquad
\rho(B^*B)=\rho(A^*A),\qquad
BB^*=ApA^*.
$$

したがって

$$
\begin{aligned}
&2\operatorname{Re}\rho(B)-\sigma(BB^*)-s\rho(B^*B)\\
&=2\operatorname{Re}\rho(A)-\sigma(ApA^*)-s\rho(A^*A).
\end{aligned}
$$

$B$ は元の環に属するので、補題の右辺の上限は最初の上限以上でもあります。両方向から等号です。$\rho$ の支持を明示して作業したため、非忠実な $\rho$ についても成立します。
<!-- proof-end -->

### 直接計算：純粋状態の場合も支持を落とさない

$\rho=E_{11}$、$\sigma=I_2/2$、$p=E_{11}$ とします。$A$ の第1列を $(a,c)^\mathsf T$ とすると、$Ap=\begin{pmatrix}a&0\\c&0\end{pmatrix}$ で、

$$
\begin{aligned}
&2\operatorname{Re}\rho(Ap)-\sigma(ApA^*)-s\rho(pA^*Ap)\\
&=2\operatorname{Re}a-(s+1/2)(|a|^2+|c|^2).
\end{aligned}
$$

$a=(s+1/2)^{-1}$、$c=0$ で上限 $(s+1/2)^{-1}$ を得ます。[AQFT31の有限行列相対作用素](../AQFT31/index.md#thm-aqft31-finite-modular)でも $\xi_\rho=E_{11}$ は固有値 $1/2$ の単位固有ベクトルですから、左辺の逆作用素期待値と一致します。この例では $p\ne1$ であり、射影を単純に消去することはできません。

## 3. 包含に伴う収縮と逆作用素の比較

$\mathcal N$ と $\mathcal M$ で使う標準形Hilbert空間は、同じである必要はありません。$\rho$ のそれぞれの標準形代表を $\xi_{\rho,\mathcal N}$、$\xi_{\rho,\mathcal M}$ とすると、$\overline{\mathcal N\xi_{\rho,\mathcal N}}$ から $\overline{\mathcal N\xi_{\rho,\mathcal M}}$ への写像

$$
V(A\xi_{\rho,\mathcal N})=A\xi_{\rho,\mathcal M}
\quad(A\in\mathcal N)
$$

は等長です。実際、両辺のノルム平方は $\rho(A^*A)$ なので、零ベクトルの表示にも依存せず閉包まで等長に延長できます。特に $V\xi_{\rho,\mathcal N}=\xi_{\rho,\mathcal M}$ です。

**この等長写像だけから**、非忠実な状態について相対モジュラー作用素の全空間上の作用素不等式を主張してはいけません。支持射影は環によって変わるからです。必要なのは、入力ベクトルにおける**逆作用素の期待値の比較**だけです。

<a id="prop-aqft33-resolvent-order"></a>

<!-- formal-statement-start -->
> **命題（部分環包含による相対逆作用素期待値の順序）**  
> $\mathcal N\subset\mathcal M$ を同じ単位元を持つvon Neumann環とし、$\rho,\sigma$ を $\mathcal M$ 上の任意の正規状態とする。$\mathcal N$ 上の制限状態と $\mathcal M$ 上の元の状態でそれぞれ相対モジュラー作用素を構成する。すべての $s>0$ で

$$
R_{\mathcal N}(s)\le R_{\mathcal M}(s)
$$

> が成立する。$R$ は[相対逆作用素の代数上の変分表示](#lem-aqft33-algebra-variational)で定義した期待値であり、両辺は $0\le R(s)\le1/s$ の有限値である。
<!-- formal-statement-end -->

### 証明の見取り図

$\mathcal N$ では $\mathcal M$ よりも選べる試験作用素 $A$ が少ないだけです。二つの状態を同じ $A$ で評価する変分表示が、この比較を正当化します。

<!-- proof-start -->
### 証明

[代数上の変分表示](#lem-aqft33-algebra-variational)の右辺の汎関数を

$$
F_s(A)=2\operatorname{Re}\rho(A)
-\sigma(AA^*)-s\rho(A^*A)
$$

とします。$\rho|_{\mathcal N},\sigma|_{\mathcal N}$ を用いて $A\in\mathcal N$ を評価した値は、もとの $\rho,\sigma$ で評価した値と等しいです。従って

$$
R_{\mathcal N}(s)=\sup_{A\in\mathcal N}F_s(A)
\le\sup_{A\in\mathcal M}F_s(A)
=R_{\mathcal M}(s).
$$

また $\Delta\ge0$ なので $\|(\Delta+sI)^{-1}\|\le1/s$、$\|\xi_\rho\|=1$ から $0\le R_{\mathcal N}(s),R_{\mathcal M}(s)\le1/s$ です。
<!-- proof-end -->

## 4. 逆作用素から対数へ：非忠実・無限値にも耐える積分

次に逆作用素の順序を対数の順序へ運びます。[AQFT32の負の対数の積分表示](../AQFT32/index.md#lem-aqft32-operator-log-convex)は、正の下限がある有界作用素で説明されました。ここでは $\Delta$ に核や非有界部分があってもよいので、ベクトルのスペクトル測度で直接積分を正当化します。

$a\ge0$ に対して、$a=0$ の場合は右辺を $+\infty$ と解釈して

$$
-\log a=\int_0^\infty
\left(\frac1{a+s}-\frac1{1+s}\right)\,ds
$$

となります。$a>0$ では上限 $L$ まで積分した値は

$$
\log\frac{a+L}{1+L}-\log a
$$

であり $L\to\infty$ により $-\log a$ になります。$a=0$ では $s\downarrow0$ における $1/s$ の積分が発散します。

<a id="lem-aqft33-log-resolvent"></a>

<!-- formal-statement-start -->
> **補題（相対エントロピーの逆作用素積分表示）**  
> $\mathcal M$ を単位的von Neumann環、$\rho,\sigma$ をその任意の正規状態とし、$R_{\mathcal M}(s)$ を[相対逆作用素期待値](#lem-aqft33-algebra-variational)とする。[AQFT31の非忠実状態を含む定義](../AQFT31/index.md#def-aqft31-relative-entropy-extended)による相対エントロピーは

$$
S_{\mathrm A}^{\mathcal M}(\rho\Vert\sigma)
=\int_0^\infty
\left(R_{\mathcal M}(s)-\frac1{1+s}\right)\,ds
$$

> と等しい。右辺は $s\downarrow0$ と $s\to\infty$ の両端での広義積分であり、$+\infty$ は許すが $-\infty$ にはならない。
<!-- formal-statement-end -->

### 証明の見取り図

入力 $\xi_\rho$ に関するスペクトル測度 $\mu_\rho$ は確率測度で、[AQFT32の一次モーメント](../AQFT32/index.md#lem-aqft32-first-moment)は1以下です。$a\le1$ の部分は積分核が非負、$a>1$ の部分は非正であるため、正負を分けて積分順序を入れ替えます。負部分の総量が有限であることが、無限値を含む等式を支えます。

<!-- proof-start -->
### 証明

スペクトル定理を $f_s(a)=(a+s)^{-1}$ に適用すると、$s>0$ に対して

$$
R_{\mathcal M}(s)=\int_{[0,\infty)}
\frac1{a+s}\,d\mu_\rho(a),\qquad
\mu_\rho([0,\infty))=1.
$$

そこで積分核の差を

$$
h_s(a)=\frac1{a+s}-\frac1{1+s}
=\frac{1-a}{(a+s)(1+s)}
$$

と置きます。$0\le a\le1$ では $h_s(a)\ge0$、$a>1$ では $h_s(a)<0$ です。前者はTonelliの定理で $s$ と $a$ の積分を交換でき、$a=0$ に質量がある場合には $+\infty$ を与えます。

後者については、固定した $a>1$ で

$$
\int_0^\infty |h_s(a)|\,ds=\log a\le a
$$

であり、[相対スペクトル測度の一次モーメント](../AQFT32/index.md#lem-aqft32-first-moment)から

$$
\int_{(1,\infty)}a\,d\mu_\rho(a)
\le\sigma(s(\rho))\le1.
$$

従って負部分は絶対可積分で、Fubiniの定理を適用できます。両部分を合わせると

$$
\begin{aligned}
\int_0^\infty\left(R_{\mathcal M}(s)-\frac1{1+s}\right)\,ds
&=\int_{[0,\infty)}
\left(\int_0^\infty h_s(a)\,ds\right)d\mu_\rho(a)\\
&=-\int_{[0,\infty)}\log a\,d\mu_\rho(a).
\end{aligned}
$$

ここで $-\log0:=+\infty$ です。入力スペクトルの零重みは、[AQFT31の支持を含む拡張定義](../AQFT31/index.md#def-aqft31-relative-entropy-extended)により、支持包含が破れたときの $+\infty$ と一致します。支持包含があるときは零重みがなく正スペクトル上の積分と一致します。よって全ての場合に拡張相対エントロピーが得られます。負部分が有限なので $+\infty-\infty$ の不定形は生じません。
<!-- proof-end -->

**極限の読み方。** 各 $s>0$ の $R(s)$ は有限です。しかし $s\downarrow0$ で積分が発散することはあります。零固有値の重みがある場合の $1/s$ 型発散と、正固有値が0へ集積する場合の非可積分性を混同しません。**忠実化した状態列の相対エントロピーの収束**を仮定する必要はありません。

## 5. Araki相対エントロピーの単調性

<a id="thm-aqft33-monotonicity"></a>

<!-- formal-statement-start -->
> **定理（部分環への制限に関するAraki相対エントロピーの単調性）**  
> $\mathcal N\subset\mathcal M$ を単位元を共有するvon Neumann環とし、$\rho,\sigma$ を $\mathcal M$ 上の任意の正規状態とする。このとき[AQFT31で定義した拡張Araki相対エントロピー](../AQFT31/index.md#def-aqft31-relative-entropy-extended)について

$$
S_{\mathrm A}^{\mathcal N}
(\rho|_{\mathcal N}\Vert\sigma|_{\mathcal N})
\le S_{\mathrm A}^{\mathcal M}(\rho\Vert\sigma)
$$

> が $[0,+\infty]$ の順序で成立する。両状態の忠実性、両環の型、有限次元性、大きい環から小さい環への、単位元を保つ正の射影写像の存在は仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

各 $s>0$ で $\mathcal N$ の変分問題は $\mathcal M$ の変分問題より選択肢が少なく、逆作用素の期待値が小さくなります。両辺から同じ $1/(1+s)$ を引いた不等式を積分します。対数積分の負部分が有限であることは前節で確認済みです。

<!-- proof-start -->
### 証明

[相対逆作用素期待値の順序](#prop-aqft33-resolvent-order)から、すべての $s>0$ で

$$
R_{\mathcal N}(s)-\frac1{1+s}
\le R_{\mathcal M}(s)-\frac1{1+s}.
$$

[逆作用素積分表示](#lem-aqft33-log-resolvent)の証明で、両環それぞれの積分核の負部分は絶対可積分と確かめました。従って正部分については単調収束、負部分については絶対収束を使って広義積分の順序を保てます。具体的には $0<\varepsilon<L$ で両辺を積分し、まず $L\to\infty$、次に $\varepsilon\downarrow0$ とすれば

$$
\begin{aligned}
S_{\mathrm A}^{\mathcal N}
(\rho|_{\mathcal N}\Vert\sigma|_{\mathcal N})
&=\int_0^\infty
\left(R_{\mathcal N}(s)-\frac1{1+s}\right)\,ds\\
&\le\int_0^\infty
\left(R_{\mathcal M}(s)-\frac1{1+s}\right)\,ds\\
&=S_{\mathrm A}^{\mathcal M}(\rho\Vert\sigma).
\end{aligned}
$$

両辺の定義と極限の正当化には有限次元性も忠実性も使いませんでした。特に右辺が $+\infty$ の場合も不等式は成立します。
<!-- proof-end -->

この結果は、任意の単位元を保つ包含で成立します。大きい環から小さい環への正の射影写像や部分トレースがなくても、状態の制限だけで情報の単調性を表現できます。一方、等号の特徴付けには追加構造が必要で、本講の不等式だけから回復写像が存在すると結論してはいけません。

### 非可換な二準位で不等式を手計算する

$\mathcal N$ を $\mathcal M=M_2(\mathbb C)$ の対角環とし、$\rho=\operatorname{diag}(3/4,1/4)$、$\sigma=\begin{pmatrix}1/2&1/4\\1/4&1/2\end{pmatrix}$ とします。両者は正定値・トレース1ですが、交換子は

$$
[\rho,\sigma]
=\begin{pmatrix}0&1/8\\-1/8&0\end{pmatrix}\ne0.
$$

$\sigma$ の固有値は $3/4,1/4$ で、$\log\sigma$ の対角成分はどちらも $\tfrac12(\log(3/4)+\log(1/4))$ です。[AQFT30の有限次元還元](../AQFT30/index.md#thm-aqft30-finite-reduction)から

$$
\begin{aligned}
S_{\mathrm A}^{\mathcal M}(\rho\Vert\sigma)
&=\frac34\log\frac34+\frac14\log\frac14
-\frac12\log\frac34-\frac12\log\frac14\\
&=\frac14\log3,\\
S_{\mathrm A}^{\mathcal N}(\rho|_{\mathcal N}\Vert\sigma|_{\mathcal N})
&=\frac34\log\frac{3/4}{1/2}
+\frac14\log\frac{1/4}{1/2}\\
&=\frac34\log3-\log2.
\end{aligned}
$$

差は $\log2-\tfrac12\log3=\log(2/\sqrt3)>0$ です。**非可換な入力でも**制限後の値が小さくなります。

### 無限値が有限値になる例

$\rho=|e_1\rangle\langle e_1|$、$\sigma=|+\rangle\langle+|$、$|+\rangle=(e_1+e_2)/\sqrt2$ とします。$\mathcal M=M_2(\mathbb C)$ では $\rho$ の支持は $\sigma$ の支持に含まれないため、[非忠実正規状態へのAraki相対エントロピーの拡張](../AQFT31/index.md#def-aqft31-relative-entropy-extended)による値は $+\infty$ です。しかし対角環 $\mathcal N$ への制限は $(1,0)$ と $(1/2,1/2)$ なので

$$
S_{\mathrm A}^{\mathcal N}=\log2
\le+\infty=S_{\mathrm A}^{\mathcal M}.
$$

失われたのは、二つの純粋状態の支持方向を非対角観測量で識別する能力です。比較相手の支持射影が制限後に変わることを、元の環と分けて確認する必要があります。

## 6. 局所netへ戻す

[AQFT2の包含単調性（isotony）](../AQFT2/index.md#def-aqft2-isotony)により、$O_1\subset O_2$ である領域の局所von Neumann環は、[AQFT9の局所von Neumann netの包含定理](../AQFT9/index.md#thm-aqft9-isotony-locality)を同じ表現で適用すれば

$$
\mathcal M(O_1)\subset\mathcal M(O_2)
$$

となります。大きい領域の環の正規状態 $\rho,\sigma$ を小さい領域へ制限すると、[単調性定理](#thm-aqft33-monotonicity)は

$$
S_{\mathrm A}^{\mathcal M(O_1)}
(\rho|_{\mathcal M(O_1)}\Vert\sigma|_{\mathcal M(O_1)})
\le S_{\mathrm A}^{\mathcal M(O_2)}(\rho\Vert\sigma)
$$

を与えます。局所von Neumann環がType IIIであっても構いません。ただし**異なる表現に属する二状態を無条件に同じ環の正規状態と扱うこと**はできません。ここでは共通の環とその正規状態を最初から指定しています。

## 7. 演習と詳細解答

### Level A：観測量・支持・変分表示の最小計算

<a id="ex-aqft33-a01"></a>
#### AQFT33-A01 二点確率とスカラーへの制限
- Level: A

$\mathcal M=\mathbb C^2$ の状態を $p=(3/4,1/4)$、$q=(1/2,1/2)$ とする。$s=1$ に対する変分表示の上限を計算せよ。定数だけからなる部分環 $\mathcal N=\mathbb C(1,1)$ ではどうなるか。

<!-- solution-start -->
**詳細解答。** $A=(a_1,a_2)$ を代入すると、[代数上の変分表示](#lem-aqft33-algebra-variational)の目的関数は各 $j$ の

$$
2p_j\operatorname{Re}a_j-(q_j+sp_j)|a_j|^2
$$

の和です。$q_j+sp_j>0$ なので、平方完成により最大値は $p_j^2/(q_j+sp_j)$ です。$s=1$ では

$$
R_{\mathcal M}(1)
=\frac{(3/4)^2}{1/2+3/4}
+\frac{(1/4)^2}{1/2+1/4}
=\frac9{20}+\frac1{12}=\frac8{15}.
$$

$\mathcal N$ では両状態とも唯一の規格化状態です。$A=(a,a)$ に対し $2\operatorname{Re}a-(1+s)|a|^2$ を最大化すると、$a=1/(1+s)$ で $R_{\mathcal N}(1)=1/2$。よって $1/2<8/15$ です。
<!-- solution-end -->

<a id="ex-aqft33-a02"></a>
#### AQFT33-A02 非忠実状態での $A\mapsto Ap$
- Level: A

$\mathcal M=M_2(\mathbb C)$、$\rho=E_{11}$、$\sigma=I_2/2$ とする。$A=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ を $Ap$（$p=s(\rho)$）に替えたとき、$2\operatorname{Re}\rho(A)-\sigma(AA^*)-s\rho(A^*A)$ が減らないことを確かめよ。

<!-- solution-start -->
**詳細解答。** $p=E_{11}$ なので $Ap=\begin{pmatrix}a&0\\c&0\end{pmatrix}$ です。$\rho(A)=a$、$\rho(A^*A)=|a|^2+|c|^2$ は置換前後で同じです。一方

$$
\begin{aligned}
\sigma(AA^*)&=\tfrac12(|a|^2+|b|^2+|c|^2+|d|^2),\\
\sigma(ApA^*)&=\tfrac12(|a|^2+|c|^2).
\end{aligned}
$$

差は $\tfrac12(|b|^2+|d|^2)\ge0$。これは目的関数で減算される項なので、置換後の値は下がりません。[支持付き作用素](../AQFT31/index.md#def-aqft31-relative-tomita-supported)の射影を勝手に1へ置き換えたわけではありません。
<!-- solution-end -->

<a id="ex-aqft33-a03"></a>
#### AQFT33-A03 非可換二準位の制限
- Level: A

$\rho=\operatorname{diag}(3/4,1/4)$、$\sigma=\begin{pmatrix}1/2&1/4\\1/4&1/2\end{pmatrix}$ を $M_2(\mathbb C)$ 上で考える。対角部分環への制限の相対エントロピーを求め、元の二状態が非可換であることを確認せよ。

<!-- solution-start -->
**詳細解答。** どちらも正定値・トレース1で、$\sigma$ の固有値は $3/4,1/4$ です。対角環では $p=(3/4,1/4)$、$q=(1/2,1/2)$ なので、[AQFT30の可換スペクトル表示](../AQFT30/index.md#def-aqft30-araki-relative-entropy)から

$$
S_{\mathcal N}
=\tfrac34\log(3/2)+\tfrac14\log(1/2)
=\tfrac34\log3-\log2.
$$

$[\rho,\sigma]$ の $(1,2)$ 成分は $(3/4-1/4)(1/4)=1/8$、$(2,1)$ 成分は $-1/8$ で、交換子は零ではありません。制限は同時対角化の仮定を要求しません。
<!-- solution-end -->

<a id="ex-aqft33-a04"></a>
#### AQFT33-A04 純粋状態の支持と無限値
- Level: A

$\rho=E_{11}$、$\sigma=|+\rangle\langle+|$ を $M_2(\mathbb C)$ 上に取る。$|+\rangle=(e_1+e_2)/\sqrt2$。全環と対角環での相対エントロピーがそれぞれ $+\infty$ と $\log2$ になることを確認せよ。

<!-- solution-start -->
**詳細解答。** $s_{\mathcal M}(\rho)=E_{11}$、$s_{\mathcal M}(\sigma)=|+\rangle\langle+|$ であり、$e_1$ は $\operatorname{span}\{|+\rangle\}$ に入らないので支持包含が破れます。[非忠実正規状態へのAraki相対エントロピーの拡張](../AQFT31/index.md#def-aqft31-relative-entropy-extended)から全環の値は無限です。対角環では $\rho|_{\mathcal N}=(1,0)$、$\sigma|_{\mathcal N}=(1/2,1/2)$。支持包含が成立し、唯一の正入力成分の比は $(1/2)/1=1/2$ なので $S_{\mathcal N}=-\log(1/2)=\log2$ です。
<!-- solution-end -->

### Level B：核心補題の再導出

<a id="ex-aqft33-b01"></a>
#### AQFT33-B01 非有界作用素の平方完成
- Level: B

非負自己共役作用素 $T$ と $s>0$、$v\in\mathcal H$ に対し、$B=(T+sI)^{1/2}$ を使って、$2\operatorname{Re}\langle v,x\rangle-\|T^{1/2}x\|^2-s\|x\|^2$ の上限が $\langle v,(T+sI)^{-1}v\rangle$ となることを証明せよ。

<!-- solution-start -->
**詳細解答。** $B^{-1}$ は $s>0$ から有界です。$x\in\operatorname{Dom}T^{1/2}$ に対して

$$
\begin{aligned}
\|Bx-B^{-1}v\|^2
&=\|Bx\|^2-2\operatorname{Re}\langle Bx,B^{-1}v\rangle+\|B^{-1}v\|^2\\
&=\|T^{1/2}x\|^2+s\|x\|^2
-2\operatorname{Re}\langle v,x\rangle
+\langle v,(T+sI)^{-1}v\rangle.
\end{aligned}
$$

左辺は非負なので変分式の上限は最後の項以下です。$x=(T+sI)^{-1}v$ は $\operatorname{Dom}T$ に属し、$Bx=B^{-1}v$ により左辺が0になります。従って上限は達成されます。
<!-- solution-end -->

<a id="ex-aqft33-b02"></a>
#### AQFT33-B02 直交支持と $s\downarrow0$
- Level: B

$\rho=E_{11}$、$\sigma=E_{22}$ を $M_2(\mathbb C)$ 上に取る。$R_{\mathcal M}(s)$ と、$\mathcal N=\mathbb CI_2$ 上の $R_{\mathcal N}(s)$ を求め、$R_{\mathcal N}(s)\le R_{\mathcal M}(s)$ と対数積分の無限値を検算せよ。

<!-- solution-start -->
**詳細解答。** [AQFT31の有限相対作用素](../AQFT31/index.md#thm-aqft31-finite-modular)では、入力 $\xi_\rho=E_{11}$ の相対固有値は0なので

$$
R_{\mathcal M}(s)=\frac1s.
$$

スカラー環では両状態の制限が一致し、相対固有値は1です。よって $R_{\mathcal N}(s)=1/(1+s)$、差は $1/[s(1+s)]>0$。全環の対数積分は

$$
\int_0^\infty\left(\frac1s-\frac1{1+s}\right)ds
=\lim_{\varepsilon\downarrow0}
\left[-\log\varepsilon+\log(1+\varepsilon)\right]=+\infty.
$$

$\mathcal N$ の被積分関数は0なのでその値は0です。支持が交わらない情報を観測できなくすると無限値も消えます。
<!-- solution-end -->

<a id="ex-aqft33-b03"></a>
#### AQFT33-B03 対数積分の負部分を制御する
- Level: B

確率測度 $\mu$ が $[0,\infty)$ 上にあり、$\int a\,d\mu(a)\le1$ とする。$h_s(a)=1/(a+s)-1/(1+s)$ と置く。$\int_{a>1}\int_0^\infty|h_s(a)|\,ds\,d\mu(a)$ が有限であることを示し、$a=0$ に質量がある場合を論ぜよ。

<!-- solution-start -->
**詳細解答。** $a>1$ では $h_s(a)<0$ であり、原始関数を用いると

$$
\begin{aligned}
\int_0^L|h_s(a)|\,ds
&=\log(1+L)-\log(a+L)+\log a,\\
\int_0^\infty|h_s(a)|\,ds&=\log a\le a.
\end{aligned}
$$

従ってTonelliの定理から二重積分は $\int_{a>1}\log a\,d\mu\le\int a\,d\mu\le1$ です。$a=0$ なら $h_s(0)=1/s-1/(1+s)$ で正、原点側の積分が発散します。負部分は有限なので、正の発散と打ち消し合う不定形にはなりません。
<!-- solution-end -->

<a id="ex-aqft33-b04"></a>
#### AQFT33-B04 三段階で包含の不等式を再証明する
- Level: B

$\mathcal N\subset\mathcal M$ を単位的von Neumann環の包含とし、$\rho,\sigma$ を $\mathcal M$ 上の正規状態とする。代数上の変分式から $R_{\mathcal N}(s)\le R_{\mathcal M}(s)$ を証明し、さらに対数積分の符号の注意点を説明せよ。

<!-- solution-start -->
**詳細解答。** [代数上の変分表示](#lem-aqft33-algebra-variational)で

$$
F_s(A)=2\operatorname{Re}\rho(A)
-\sigma(AA^*)-s\rho(A^*A)
$$

を定義します。$A\in\mathcal N$ について $\rho|_{\mathcal N}(A)=\rho(A)$、$\sigma|_{\mathcal N}(AA^*)=\sigma(AA^*)$、$\rho|_{\mathcal N}(A^*A)=\rho(A^*A)$ が成立します。従って

$$
R_{\mathcal N}(s)=\sup_{A\in\mathcal N}F_s(A)
\le\sup_{A\in\mathcal M}F_s(A)=R_{\mathcal M}(s).
$$

ただし $R(s)-1/(1+s)$ は各 $s$ で常に非負とは限りません。符号が変わり得るため、[対数積分補題](#lem-aqft33-log-resolvent)に従いスペクトル変数 $a\le1$ と $a>1$ を分け、後者の絶対積分を一次モーメントで抑えてから積分の順序を保つ必要があります。
<!-- solution-end -->

### Level C：一般性と局所情報の統合

<a id="ex-aqft33-c01"></a>
#### AQFT33-C01 非忠実な一般状態の単調性を組み立てる
- Level: C

単位元を共有するvon Neumann環 $\mathcal N\subset\mathcal M$ 上に、$\mathcal M$ の任意の正規状態 $\rho,\sigma$ を取る。$\rho$ が非忠実でも成立することを明確にしながら、(i) 支持への射影 $A\mapsto Ap$、(ii) 非負自己共役作用素の逆作用素変分表示、(iii) 対数積分、を組み合わせて単調性を導け。$+\infty$ の場合も扱うこと。

<!-- solution-start -->
**詳細解答。** $p=s_{\mathcal M}(\rho)$ とします。[AQFT31の支持付き相対Tomita作用素](../AQFT31/index.md#def-aqft31-relative-tomita-supported)に対し $S(A\xi_\rho)=pA^*\xi_\sigma$、$\Delta=S^\sharp S$ です。[逆作用素変分表示](#lem-aqft33-resolvent-variational)をグラフの芯へ制限すると、まず

$$
R_{\mathcal M}(s)=\sup_{A\in\mathcal M}
\{2\operatorname{Re}\rho(A)-\sigma(ApA^*)-s\rho(A^*A)\}.
$$

$B=Ap$ は $\rho(B)=\rho(A)$、$\rho(B^*B)=\rho(A^*A)$、$\sigma(BB^*)=\sigma(ApA^*)$ を満たすため、上限は $\sigma(AA^*)$ を用いる同じ式へ変えられます。この操作は $\rho$ が非忠実な場合こそ必要です。

$\mathcal N$ でも、その環自身の支持を使って同じ議論を繰り返します。両環の上限は共通の試験関数 $F_s(A)$ を、それぞれ $\mathcal N$ と $\mathcal M$ で最大化したものなので、

$$
R_{\mathcal N}(s)\le R_{\mathcal M}(s).
$$

各環の入力スペクトル測度 $\mu$ の一次モーメントは[相対スペクトル測度の一次モーメント補題](../AQFT32/index.md#lem-aqft32-first-moment)により1以下です。従って、対数積分の負部分は

$$
\int_{(1,\infty)}\log a\,d\mu(a)
\le\int_{(1,\infty)}a\,d\mu(a)\le1
$$

で有限になります。正部分は無限でもよく、非負関数のTonelliの定理を用いて扱います。[逆作用素積分表示](#lem-aqft33-log-resolvent)で両辺から共通の $1/(1+s)$ を引き、上の可積分性を確認して積分すれば

$$
S_{\mathrm A}^{\mathcal N}(\rho|_{\mathcal N}\Vert\sigma|_{\mathcal N})
\le S_{\mathrm A}^{\mathcal M}(\rho\Vert\sigma).
$$

零スペクトルに正の入力重みがあれば右辺は無限、正のスペクトルの0への集積によっても無限になり得ます。いずれも積分の正部分の発散として含まれ、有限次元や忠実化の極限を仮定していません。
<!-- solution-end -->

<a id="ex-aqft33-c02"></a>
#### AQFT33-C02 局所Type III環・同一の制限・情報の不可逆消失
- Level: C

共通の表現にある局所netの領域 $O_1\subset O_2$ について、局所von Neumann環 $\mathcal M(O_1)\subset\mathcal M(O_2)$ を仮定する。大きい環の正規状態 $\rho,\sigma$ が小さい環では一致するが、大きい環では異なるとする。相対エントロピーの二つの値を比較せよ。局所von Neumann環がType IIIであることと、等号の回復写像の主張について注意点を述べよ。

<!-- solution-start -->
**詳細解答。** 小さい環では $\rho|_{\mathcal M(O_1)}=\sigma|_{\mathcal M(O_1)}$ なので、[AQFT32の零条件](../AQFT32/index.md#thm-aqft32-positivity-rigidity)から相対エントロピーは0です。大きい環では $\rho\ne\sigma$ なので同じ零条件から値は厳密に正、または $+\infty$ です。[本講の単調性](#thm-aqft33-monotonicity)により

$$
0=S_{\mathrm A}^{\mathcal M(O_1)}
\le S_{\mathrm A}^{\mathcal M(O_2)}\in(0,+\infty]
$$

となります。Type III環で密度行列の部分トレースを書く必要はありません。両状態は**同一の大きい環上の正規状態**と仮定されているので、制限が定義されます。単調性は値の大小のみを保証し、等号時の回復写像の存在や構成を証明していません。
<!-- solution-end -->

## 8. 到達点と次講

- 支持付き相対Tomita作用素から、非忠実な場合も使える逆作用素の変分表示を導いた。
- 部分環の試験作用素が大きい環の部分集合であることから、相対逆作用素期待値の順序を示した。
- 対数の積分を正負に分解し、$+\infty$ を含む任意の正規状態についてAraki単調性を証明した。
- 局所Type III環でも、共通の環の正規状態の制限として定理を使えることを確認した。

次講AQFT34では、自由場net・真空・モジュラー流・相対情報を同一模型の中で結び、どの結論がどの仮定で成り立つかを総合的に点検します。

### 参考文献

- Huzihiro Araki, [Relative Entropy of States of von Neumann Algebras](https://doi.org/10.2977/prims/1195191148), *Publ. RIMS* **11** (1975/76), 809–833.
- Huzihiro Araki, [Relative Entropy of States of von Neumann Algebras II](https://ems.press/journals/prims/articles/2844), *Publ. RIMS* **13** (1977), 173–192.
- Hideki Kosaki, [Relative entropy of states: a variational expression](https://jot.theta.ro/jot/archive/1986-016-002/index_1986-016-002.html), *J. Operator Theory* **16** (1986), 335–348.
