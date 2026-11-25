# VNP2 A：多party tensor・wire・restriction・cover・push-forward

前講では回路のゲート数の下界が何を意味するかを確かめました。原論文 Appendix A では、回路を直接数える代わりに、複数の位置に分散したテンソルをどのような材料から作れるかを調べます。本講では材料を合成する操作と、材料の位置を移す操作を具体的に計算します。

原論文の記法は [TSP4の制限](../../TSP/TSP4/index.md#def-tsp4-restriction)、[TSP5のKronecker積](../../TSP/TSP5/index.md#def-tsp5-kronecker)、[TSP15のpartyの併合](../../TSP/TSP15/index.md#def-tsp15-grouping) を基礎とします。ただし、既習の制限・積・直和は二因子以上、既習の併合は二位置以上への全射を扱いました。本講では一partyの場合も座標式で定め直し、併合先に添字が一つも来ない場合も許します。複数の材料から同じ出力空間に写して和を取ることも重要です。

## 1. 位置を名前で指定する

体を $K$、有限非空集合 $I$ を party（局所操作を行う位置）の集合とします。各位置 $p\in I$ に有限添字集合 $X_p$ を置きます。添字集合が空でも構いません。このとき係数配列の定義域は空となります。

[多因子テンソル積の存在・基底・一意性](../../TSP/TSP1/index.md#thm-tsp1-multifactor-basis) によって、各位置で $X_p$ を標準基底の名前とする空間 $K^{X_p}$ を取れば、係数配列とテンソルは一対一に対応します。$X_p=\varnothing$ ならその空間は零空間です。

順序を指定する必要のない座標表示を使い、$t(x)$ は添字組 $x=(x_p)_{p\in I}$ における係数を表します。$e_{x_p}$ は位置 $p$ の標準基底ベクトルであり、対応するテンソルは

$$
\sum_{x\in\prod_{p\in I}X_p}t(x)\bigotimes_{p\in I}e_{x_p}
$$

です。一partyなら通常の基底展開になります。同じ添字集合を持つ配列の和は係数ごとの和です。非零配列は少なくとも一つの非零係数を持つもの、単位テンソルは各位置に基底を一つだけ持たせ、唯一の係数を体の乗法単位元 $1_K$ にしたものです。

<a id="def-vnp2-party-array"></a>

<!-- formal-statement-start -->
> **定義（party添字付き係数配列）**
>
> 体 $K$ と有限非空集合 $I$ に対し、各 $p\in I$ の有限集合 $X_p$ と写像
>
$$
t:\prod_{p\in I}X_p\longrightarrow K
$$
>
> の組を $I$ 上のparty添字付き係数配列とする。零配列は全係数が零の配列である。単位テンソル $1$ は各 $X_p$ が一元集合で唯一の係数が $1_K$ の配列とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vnp2-party-array -->
**定義の確認**：$I=\{a,b,c\}$、$X_a=X_b=\{0,1\}$、$X_c=\{*\}$ とします。$t(0,0,*)=t(1,1,*)=1$、残り二係数を零にすれば、全四添字組に値が指定されています。$c$ の添字は常に $*$ なので、行を $x_a=0,1$、列を $x_b=0,1$ の順に並べると、係数表は

$$
\begin{pmatrix}t(0,0,*)&t(0,1,*)\\t(1,0,*)&t(1,1,*)\end{pmatrix}
=\begin{pmatrix}1&0\\0&1\end{pmatrix}.
$$

これは基底展開の四係数をそのまま並べた表です。空の添字集合を持つ場合とは異なり、$c$ の一元集合は添字組を消しません。
<!-- definition-example-end -->

以後、数の空積を1、空和を0とします。集合の直積に因子が一つもない場合は、空の組だけからなる一元集合とします。

$s,t$ の同じpartyでそれぞれ $Y_p,X_p$ を用いる場合、[Kronecker積](../../TSP/TSP5/index.md#def-tsp5-kronecker) を $st$ と略します。位置 $p$ の新しい添字集合は $Y_p\times X_p$ で、係数は $s(y)t(x)$ です。

因子順の交換、括弧の付け替え、一元集合との積の除去は各位置で基底の全単射を与えます。従って [制限同値](../../TSP/TSP5/index.md#def-tsp5-restriction-equivalence) （互いに局所線形写像で得られること、記号 $\sim$）のもとで積は可換・結合的で、単位元は $1$ です。一partyでも積の添字と係数は同じ式で定め、制限は次節の一つの局所行列による操作とします。

## 2. 一つの材料から作る

[テンソルの制限](../../TSP/TSP4/index.md#def-tsp4-restriction) を座標で読み直します。入力 $t$ の添字集合を $X_p$、出力 $s$ の添字集合を $Y_p$ とし、各partyで行列 $L_p$ を選びます。行は $Y_p$、列は $X_p$ で番号付けされます。

基底ベクトル $e_{x_p}$ の像は $\sum_{y_p} L_p(y_p,x_p)e_{y_p}$ です。

<a id="vnp2-local-coordinate"></a>

基底積の像を [局所線形写像のテンソル積](../../TSP/TSP4/index.md#def-tsp4-local-map) と同じ方法で展開すると、

$$
\bigotimes_{p\in I}L_pe_{x_p}
=\sum_{y\in\prod_{p\in I}Y_p}
\left(\prod_{p\in I}L_p(y_p,x_p)\right)
\bigotimes_{p\in I}e_{y_p}.
$$

一partyでもこれは一つの線形写像の基底展開です。この操作で $t$ から $s$ が得られることを $s\preceq t$ と書きます。従って必要十分条件は、次の等式を全ての出力添字 $y$ について満たす行列族が存在することです。

$$
s(y)=\sum_{x\in\prod_p X_p}
       t(x)\prod_{p\in I}L_p(y_p,x_p).
$$

入力の基底積に各写像を作用させ、それを展開したときの $y$ の係数を取り出した式です。$\preceq$ の左側が得られる側です。原論文の Lean ではこの関係を $\operatorname{Restr}(s,t)$ と記しています。

例えば第1節の配列に $L_a=(1,0)$、$L_b=(1,0)$、$L_c=(1)$ を適用すると、唯一の出力係数は $1\cdot1\cdot1\cdot t(0,0,*)=1$ です。従って $1\preceq t$ です。

<a id="prop-vnp2-one-restriction"></a>

<!-- formal-statement-start -->
> **命題（非零配列から単位テンソルを得る）**
>
> 体 $K$ 上の有限非空party集合 $I$ 上で、非零配列 $t$ について $1\preceq t$ が成立する。
<!-- formal-statement-end -->

非零係数を一つ選び、全位置でその添字を指定します。係数を1にするための逆数は一つの位置だけに掛ければ足ります。

<!-- proof-start -->
### 証明

$t(x^0)=c\ne0$ となる添字組 $x^0$ を選びます。$I$ は非空なので $p_0\in I$ を選べます。各出力添字集合を $\{*\}$ とします。

$p\ne p_0$ の行列を $L_p(*,x)=1$（$x=x_p^0$ のとき）、それ以外を0とします。$p_0$ の行列は同じ選択行列に $c^{-1}$ を掛けます。体の非零元なので逆数が存在します。

[制限の係数式](#vnp2-local-coordinate) では $x=x^0$ 以外の項が少なくとも一つの零因子を持ちます。残る項は

$$
t(x^0)c^{-1}=cc^{-1}=1.
$$

全位置が一元集合であり、得た配列は $1$ です。
<!-- proof-end -->

零配列からはどの局所行列を用いても零しか得られません。非零性は必要です。また一つのpartyもない場合は、係数式に逆数を掛ける位置がありません。本講では非空集合を扱う理由の一つです。

## 3. 複数の材料から作る

一つの材料に局所操作を施すだけでなく、材料ごとに異なる操作を選び、出力空間を同じに揃えて足すことを許します。これが原論文の cover（被覆）です。[有限被覆と被覆gauge](../../TSP/TSP16/index.md#def-tsp16-cover) の一般的な費用の議論へ進む前に、テンソルにおける被覆を確定します。

<a id="def-vnp2-sum-restrictions"></a>

<!-- formal-statement-start -->
> **定義（局所制限の和による被覆）**
>
> 体 $K$ 上、有限非空party集合 $I$ 上の配列 $s,t_1,\ldots,t_r$ を取る。$r$ は非負整数とする。各 $t_j$ から $s$ と同じ添字集合を持つ配列 $u_j$ への制限が存在し、
>
$$
s=\sum_{j=1}^{r}u_j,\qquad u_j\preceq t_j
$$
>
> が成立するとき、$s$ は $(t_1,\ldots,t_r)$ によって覆われるとする。空列による被覆は $s=0$ の場合である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vnp2-sum-restrictions -->
**定義の確認**：二party、各出力添字集合 $\{1,2\}$ の場合を取ります。

二つの材料をどちらも $1$ として、第1材料は両位置で列ベクトル $e_1$、第2材料は両位置で $e_2$ を局所行列として選びます。

各入力の添字は一元集合なので、局所行列のサイズは $2\times1$ です。それぞれの出力は $e_1\otimes e_1$ と $e_2\otimes e_2$ です。和は二行二列の単位行列になります。出力添字集合は一致し、各材料を一度ずつ使用しているので被覆です。

一材料だけの場合、局所列を $a=(a_1,a_2)^{\mathsf T}$、$b=(b_1,b_2)^{\mathsf T}$ とすると、[制限の係数式](#vnp2-local-coordinate) は唯一の入力係数1から

$$
u(i,j)=1\cdot a_i b_j=a_i b_j
$$

を与えます。ここで $\mathsf T$ は転置です。係数表 $ab^{\mathsf T}$ の第 $j$ 列は $b_j a$ なので、全列は高々一次元の空間に属します。行列階数は列空間の次元であり、高々1です。一方、単位行列の二列は一次独立なので階数2です。従って二つの材料は必要です。
<!-- definition-example-end -->

被覆と [テンソルの直和](../../TSP/TSP5/index.md#def-tsp5-direct-sum) の関係を確認します。直和は異なる材料の座標を分けて格納しますが、被覆はそこから共通の出力座標へ送って足す操作です。有限個の直和では各位置で材料番号付き添字を使い、全位置の番号が一致する組だけにその材料の係数を置き、それ以外を零とします。一partyでは通常のベクトルの直和です。

<a id="thm-vnp2-cover-direct-sum"></a>

<!-- formal-statement-start -->
> **定理（被覆と直和からの制限の同値）**
>
> 体 $K$ 上の有限非空party集合における配列 $s,t_1,\ldots,t_r$ について、$r\ge1$ とする。$s$ が $(t_j)_{j=1}^r$ によって覆われることと
>
$$
s\preceq \bigoplus_{j=1}^{r}t_j
$$
>
> は同値である。
<!-- formal-statement-end -->

直和の添字には材料番号を付けます。全partyで材料番号が一致する箇所だけに元の係数が入っているので、制限の式で混合項が消えます。

<!-- proof-start -->
### 証明

$t_j$ の位置 $p$ の添字集合を $X_{jp}$、$s$ の添字集合を $Y_p$ とします。直和の位置 $p$ の添字集合は互いに素な和 $\coprod_j X_{jp}$ です。元の添字 $x$ に材料番号 $j$ を付けた $(j,x)$ で表します。

被覆を実現する局所行列 $L_{jp}(y,x)$ が与えられたとします。直和からの局所行列を $M_p(y,(j,x))=L_{jp}(y,x)$ と指定します。[制限の係数式](#vnp2-local-coordinate) を直和に適用します。材料番号が全位置で同じ $j$ である項以外は直和の係数が零なので、

$$
\sum_{j=1}^r
\sum_{x\in\prod_p X_{jp}}
 t_j(x)\prod_{p\in I} M_p(y_p,(j,x_p))
$$

だけが残ります。$M_p$ の定義を代入すると各内側の和は $u_j(y)$ です。被覆条件により全体は $s(y)$ です。

逆に直和から $s$ を得る行列 $M_p$ が与えられたなら、$L_{jp}(y,x)=M_p(y,(j,x))$ と材料ごとに列を抜き出します。各 $L_{jp}$ は $t_j$ から $s$ の添字集合への局所行列です。上の係数計算を逆向きに読めば $s=\sum_j u_j$ となります。
<!-- proof-end -->

次に任意の配列が有限個の単位テンソルで覆えることを示します。第2節は非零配列から単位を得る方向、今度は単位を材料とする逆方向です。

<a id="prop-vnp2-finite-cover"></a>

<!-- formal-statement-start -->
> **命題（単位テンソルによる有限被覆）**
>
> 体 $K$ 上の有限非空party集合 $I$ 上の任意の配列 $t$ は、高々その非零係数の個数の単位テンソルで覆われる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明
非零係数を持つ添字組 $x$ ごとに材料 $1$ を一個用意します。$I$ は非空なので位置 $p_0$ を一つ固定できます。

[制限の係数式](#vnp2-local-coordinate) により、位置 $p_0\in I$ の局所列を $t(x)e_{x_{p_0}}$、他の位置 $p$ の局所列を $e_{x_p}$ とします。材料 $1$ は一係数だけなので、得られる配列は

$$
t(x)\bigotimes_{p\in I}e_{x_p}.
$$

その係数は添字組 $x$ で $t(x)$、他では0です。全ての非零係数について足すと任意の添字組で元の値と一致します。非零係数がない場合は空の被覆を使います。有限個の添字組しかないので材料数も有限です。
<!-- proof-end -->

## 4. partyの移動と併合

[TSP15のpartyの併合](../../TSP/TSP15/index.md#def-tsp15-grouping) では全射によって位置をまとめました。原論文では元のparty集合 $J$ から行き先 $I$ への任意の写像 $\pi:J\to I$ を許します。行き先に一つも添字が来ない位置は、一元集合を添字として持ちます。添字が空なのではなく、選択肢が一つだけの空の組です。

この係数の再配置を $\pi_*t$ と書きます。行き先 $p$ の組は、逆像

$$
\pi^{-1}(p)=\{j\in J:\pi(j)=p\}
$$

に属する成分で作ります。逆に各 $j$ の成分は行き先 $\pi(j)$ の組から取り出せるため、係数の足し合わせは不要です。

<a id="def-vnp2-push-forward"></a>

<!-- formal-statement-start -->
> **定義（任意のparty写像によるpush-forward）**
>
> 体 $K$ と有限非空集合 $J,I$、写像 $\pi:J\to I$ を取る。$J$ 上の配列 $t$ の添字集合を $X_j$ とする。配列 $\pi_*t$ の位置 $p\in I$ の添字集合を
>
$$
U_p=\prod_{j:\pi(j)=p}X_j
$$
>
> とし、全ての $x=(x_j)_{j\in J}$ について
>
$$
(\pi_*t)((x_j)_{\pi(j)=p}:p\in I)=t(x)
$$
>
> と定める。添字集合の空積は一元集合とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vnp2-push-forward -->
**定義の確認**：有理数体上で $J=\{a,b,c\}$、$I=\{u,v,w\}$、$\pi(a)=\pi(c)=u,\ \pi(b)=v$ とし、$X_j=\{0,1\}$ とします。$\pi$ は $w$ に値を取りません。入力 $t(0,1,1)=2$、他の係数を0とした配列は、$u$ の添字 $(0,1)$、$v$ の添字 $1$、$w$ の添字 $*$ の位置に2を持ちます。出力の添字集合の大きさはそれぞれ4,2,1です。入力の8個の係数と出力の8個の係数が一対一に対応し、和や縮約はしていません。
<!-- definition-example-end -->

元の添字組から行き先ごとの添字組を作り、逆に各成分を元の位置へ戻せます。この全単射は $\pi$ が単射・全射であることを要求しません。したがって非零性は保存されます。

<a id="thm-vnp2-push-laws"></a>

<!-- formal-statement-start -->
> **定理（push-forwardの演算と合成）**
>
> 体 $K$ と有限非空party集合 $H,J,I$、写像 $\rho:H\to J$、$\pi:J\to I$ を取る。$s,t$ を $J$ 上、$v$ を $H$ 上の配列とする。$\sim$ は相互制限を表す。このとき
>
$$
\pi_*(st)\sim(\pi_*s)(\pi_*t),
$$
>
$$
\pi_*(\rho_*v)\sim(\pi\circ\rho)_*v,
$$
>
$$
(\operatorname{id}_J)_*t\sim t,\qquad \pi_*1\sim1.
$$
<!-- formal-statement-end -->

いずれも係数を保存する各party内の添字の並べ替えです。空の組は選択肢が一つなのでこの対応を壊しません。

<!-- proof-start -->
### 証明

$s,t$ の添字集合を $Y_j,X_j$ とします。積を作ってから移す場合、位置 $p$ の添字集合は $\prod_{\pi(j)=p}(Y_j\times X_j)$ です。移してから積を作る場合は $(\prod_{\pi(j)=p}Y_j)\times(\prod_{\pi(j)=p}X_j)$ です。

前者の組 $((y_j,x_j))_{\pi(j)=p}$ を後者の組 $((y_j)_{\pi(j)=p},(x_j)_{\pi(j)=p})$ に対応させます。逆対応は各位置で二つの成分を組に戻すことです。全ての位置でこの対応を使うと係数は双方で $s(y)t(x)$ です。基底の全単射と逆を局所行列にすれば双方の制限を得ます。

次に $v$ の添字集合を $Z_h$ とします。二回移す場合の位置 $p$ の添字は

$$
\prod_{j:\pi(j)=p}\prod_{h:\rho(h)=j}Z_h.
$$

これを一回移す場合の $\prod_{h:\pi(\rho(h))=p}Z_h$ に対応させます。各 $h$ はただ一つの $j=\rho(h)$ に属するので、この対応は一対一で逆もあります。両方で係数は $v(z)$ です。

恒等写像の場合には各組が一位置だけを含むため、組を外す全単射を取ります。単位テンソルの場合は各添字集合が一元集合であり、空積を含む全ての組も一元集合です。唯一の係数は1なので単位テンソルと同値です。
<!-- proof-end -->

<a id="thm-vnp2-push-covers"></a>

<!-- formal-statement-start -->
> **定理（push-forwardによる被覆の保存）**
>
> 体 $K$ と有限非空party集合 $J,I$、写像 $\pi:J\to I$ を取る。
>
> $J$ 上で $s$ が $(t_j)_{j=1}^r$ により覆われるとする。
> このとき $I$ 上で $\pi_*s$ は $(\pi_*t_j)_{j=1}^r$ により覆われる。
> 特に制限も保存される。
<!-- formal-statement-end -->

各位置で独立に選んだ局所行列を、行き先の位置ごとにまとめます。新しく空になった組の行列は一行一列の $1$ です。

<!-- proof-start -->
### 証明

まず一材料 $t$ に対し $s\preceq t$ とします。元のpartyを $a\in J$ とし、局所行列を $L_a(y_a,x_a)$ とします。移した後の位置 $p$ の局所行列を

$$
M_p((y_a)_{\pi(a)=p},(x_a)_{\pi(a)=p})
=\prod_{a:\pi(a)=p}L_a(y_a,x_a)
$$

で定めます。各行と列の添字はちょうど移した後の出力と入力の添字です。空の組では空積1となります。

移した材料に対する[制限の係数式](#vnp2-local-coordinate) で、入力の組を元の添字 $x$ に戻すと

$$
\sum_x t(x)\prod_{p\in I}
       \prod_{a:\pi(a)=p}L_a(y_a,x_a)
$$

を得ます。各 $a$ は一つの組だけに現れるので積は $\prod_{a\in J} L_a(y_a,x_a)$ と等しく、元の制限の式により $s(y)$ です。これは移した出力の係数です。

一般の被覆では $s=\sum_{j=1}^r u_j$、$u_j\preceq t_j$ と取ります。上の構成を各 $j$ に適用すると $\pi_*u_j\preceq\pi_*t_j$ です。元の $u_j$ は全て同じ出力添字集合を持ち、移した後も共通です。係数を並べ替えるだけなので

$$
\pi_*s=\sum_{j=1}^r\pi_*u_j.
$$

空の被覆でも零配列が零配列へ写るため成立します。
<!-- proof-end -->

逆向きは成り立ちません。[被覆の定義例](#def-vnp2-sum-restrictions) で示したように、二partyの単位テンソルから二次単位行列は得られません。ところが二位置を一つにまとめると、単位行列の係数は $(1,0,0,1)^{\mathsf T}$ になります。単位テンソルの唯一の係数1をこの列ベクトルへ写す行列で制限が成立し、逆には行 $(1,0,0,0)$ で1が得られます。併合によって局所写像の制約が緩むためです。

## 5. wireは二つの位置を結ぶ資源

[TSP6の恒等wire](../../TSP/TSP6/index.md#def-tsp6-wire) は二端子の添字が等しい場合に1を返しました。原論文では、この配列を指定されたpartyに配置することで、位置間の資源を表します。二端子の元の配列を $D_q$ と書き、$q$ は各端子の添字の個数です。

両端の添字 $i,j$ が等しいとき1、異なるとき0を返す記号を $\delta_{ij}$（Kroneckerのデルタ）とします。従って $D_q(i,j)=\delta_{ij}$ です。[push-forward](#def-vnp2-push-forward) で端子を指定のpartyへ送れば、両端が異なるpartyにある場合も同じpartyにある場合も表せます。

<a id="def-vnp2-wire"></a>

<!-- formal-statement-start -->
> **定義（party間のwire資源）**
>
> 体 $K$、有限非空集合 $I$、$u,v\in I$ と整数 $q\ge1$ を取る。二つの異なる添字位置を持つ配列 $D_q$ を、各添字が $\{1,\ldots,q\}$ を走り、等しいとき係数1、それ以外で0と定める。
> 写像 $\pi:\{1,2\}\to I$ を $\pi(1)=u,\pi(2)=v$ とするとき、wire資源を
>
$$
W_q(u,v)=\pi_*D_q
$$
>
> とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vnp2-wire -->
**定義の確認**：$I=\{a,b,c\}$、$q=2$、$u=a,v=b$ なら、$a,b$ の添字は各2種類、$c$ は一元集合です。係数は $(1,1,*)$ と $(2,2,*)$ に1、他は0です。$u=v=a$ とすれば、$a$ の四つの添字 $(1,1),(1,2),(2,1),(2,2)$ に順に $1,0,0,1$ を持ち、$b,c$ の添字は一元集合になります。両端が同じpartyなら一つの局所行列で二添字を同時に扱えます。
<!-- definition-example-end -->

<a id="prop-vnp2-wire-laws"></a>

<!-- formal-statement-start -->
> **命題（wire資源の基本比較）**
>
> 体 $K$ 上の有限非空party集合 $I$、$u,v\in I$、正整数 $q,m,n$ に対し、
>
$$
W_q(u,u)\sim1,\qquad W_q(u,v)\sim W_q(v,u),
$$
>
$$
W_m(u,v)W_n(u,v)\sim W_{mn}(u,v).
$$
>
> また $m\le n$ なら $W_m(u,v)\preceq W_n(u,v)$ であり、$W_q(u,v)$ は $q$ 個の単位テンソルで覆われる。
<!-- formal-statement-end -->

最後の被覆は、wireの値が非零になる対角添字の数が $q$ であることから従います。

<!-- proof-start -->
### 証明

自己wireは位置 $u$ のみで非自明な添字を持ちます。その位置にあるベクトル $\sum_{i=1}^q e_{(i,i)}$ は非零です。[非零配列から単位テンソルを得る命題](#prop-vnp2-one-restriction) により $1$ が得られます。逆に $1$ の位置 $u$ の唯一の基底をこのベクトルへ、他の位置は唯一の基底へ写せば自己wireを得ます。

向きの交換は二つの添字位置を入れ替え、等号条件 $i=j$ を $j=i$ に変えるだけです。異なるpartyでは両端に同じ番号を付け直し、同じpartyでは組を交換する基底の全単射を使います。

二party上で $D_m D_n$ を作ると、各位置の添字は $(i,j)$（$1\le i\le m,\ 1\le j\le n$）です。二位置の組が一致するときだけ係数1となります。番号 $(i-1)n+j$ は $1,\ldots,mn$ との全単射であり、両位置でこれを使うと $D_{mn}$ と相互制限できます。[push-forwardの演算と合成](#thm-vnp2-push-laws) および [push-forwardによる被覆の保存](#thm-vnp2-push-covers) を $\pi(1)=u,\pi(2)=v$ に適用すると積の結論を得ます。

$m\le n$ の場合、二partyの両位置で $1,\ldots,m$ の基底を同じ番号へ写し、残りを零にする局所行列を取ります。$D_n$ の対角項のうち最初の $m$ 項だけが残り $D_m$ です。これを同じ $\pi$ で移すと [push-forwardによる被覆の保存](#thm-vnp2-push-covers) により制限が保存されます。

最後に、移す前の $D_q$ に非零係数がちょうど $q$ 個あります。移した後も係数の数は変わらないので [単位テンソルによる有限被覆](#prop-vnp2-finite-cover) を適用できます。
<!-- proof-end -->

次講ではこの積と被覆の不等式を実数値の評価へ移し、wireの評価から距離を作ります。

## 6. 演習

### A1. 一元集合と空集合
- Level: A
- ID: VNP2-A1

$I=\{a,b,c\}$ で添字集合の大きさが順に $2,3,1$ のとき、係数の個数を求めよ。最後が0の場合も答えよ。

<!-- solution-start -->
**詳細解答**：[party添字付き係数配列の定義](#def-vnp2-party-array) により、定義域は三集合の直積です。$a$ の選択ごとに $b$ が3通り、各組ごとに $c$ が1通りなので $2\cdot3\cdot1=6$ 個です。最後が空集合なら $c$ を選べず、直積は空で係数の個数は0です。一元集合は余分な自由度を追加しませんが、空集合は全添字組をなくします。
<!-- solution-end -->

### A2. 係数の正規化
- Level: A
- ID: VNP2-A2

有理数体上の二party配列 $t=\begin{pmatrix}0&3\\2&0\end{pmatrix}$ から単位テンソルを制限で得よ。行列を具体的に示せ。

<!-- solution-start -->
**詳細解答**：第1行第2列の係数3を選びます。[非零配列から単位テンソルを得る命題](#prop-vnp2-one-restriction) の構成で $L_a=(1/3,0)$、$L_b=(0,1)$ とします。両方とも一行二列であり、出力添字は一元集合です。[制限の係数式](#vnp2-local-coordinate) を二partyの場合に書くと、

$$
\sum_{i,j=1}^{2}L_a(*,i)t(i,j)L_b(*,j)
=L_a t L_b^{\mathsf T}
$$

となります。ここで $t$ は行が第1位置、列が第2位置の係数表であり、$t L_b^{\mathsf T}=(3,0)^{\mathsf T}$ なので値は $(1/3)\cdot3+0\cdot0=1$ です。
<!-- solution-end -->

### A3. 一材料の被覆
- Level: A
- ID: VNP2-A3

有理数体上の二party配列 $\begin{pmatrix}1&2\\3&6\end{pmatrix}$ を単位テンソル一個で覆え。

<!-- solution-start -->
**詳細解答**：[制限の係数式](#vnp2-local-coordinate) では入力添字が各一元集合、出力添字が各二元集合なので、各partyの局所行列は二行一列です。第1位置に $(1,3)^{\mathsf T}$、第2位置に $(1,2)^{\mathsf T}$ を選ぶと、唯一の入力係数は1なので出力の四係数は $1\cdot1,1\cdot2,3\cdot1,3\cdot2$ です。元の行列と一致します。[局所制限の和による被覆](#def-vnp2-sum-restrictions) で材料数を1にした場合に当たります。
<!-- solution-end -->

### A4. 添字の移動
- Level: A
- ID: VNP2-A4

$J=\{a,b\}$、$I=\{u,v,w\}$ とし、$\pi(a)=\pi(b)=v$ とする。入力の添字集合をそれぞれ $\{1,2\},\{1,2,3\}$ とする。出力の各添字集合の大きさと、入力係数 $t(2,3)$ の移動先を答えよ。

<!-- solution-start -->
**詳細解答**：[任意のparty写像によるpush-forward](#def-vnp2-push-forward) では $u,w$ の逆像は空なので各一元集合です。$v$ の逆像は $\{a,b\}$ なので大きさは $2\cdot3=6$ です。係数 $t(2,3)$ は出力の $(*,(2,3),*)$ の位置へ移り、値は変わりません。
<!-- solution-end -->

### B1. 被覆の合成
- Level: B
- ID: VNP2-B1

同じ有限非空party集合上で $s$ が $(t_1,t_2)$ に覆われ、$t_1$ が $(b_1,b_2)$ に覆われるとする。$s$ が $(b_1,b_2,t_2)$ に覆われることを示せ。

<!-- solution-start -->
**詳細解答**：[被覆の定義](#def-vnp2-sum-restrictions) により $s=L(t_1)+M(t_2)$、$t_1=P(b_1)+Q(b_2)$ と書きます。$L,M,P,Q$ はそれぞれ局所行列のテンソル積で、出力添字は各被覆で共通です。$L$ は線形なので

$$
s=L(P(b_1))+L(Q(b_2))+M(t_2).
$$

各位置 $p$ で合成行列は $L_pP_p,L_pQ_p$ です。例えば $(L_pP_p)(y,x)=\sum_z L_p(y,z)P_p(z,x)$ で、中間添字集合は $t_1$ のものです。[制限の係数式](#vnp2-local-coordinate) を二度適用すると、例えば $L(P(b_1))$ の出力係数は

$$
\sum_z\sum_x b_1(x)\prod_p L_p(y_p,z_p)P_p(z_p,x_p)
$$

です。$z$ は $t_1$、$x$ は $b_1$ の添字組を動きます。有限和の順序を交換し、位置ごとに分配すると

$$
\sum_x b_1(x)\prod_p\left(\sum_{z_p}L_p(y_p,z_p)P_p(z_p,x_p)\right)
$$

となります。各括弧が合成行列の成分なので、$Q$ についても同じ計算が成立します。従って各項は指定の三材料からの制限であり、全出力添字集合が $s$ のものに一致します。被覆条件を満たします。
<!-- solution-end -->

### B2. push-forward後の局所行列
- Level: B
- ID: VNP2-B2

有理数体上、二partyで $D_2=e_1\otimes e_1+e_2\otimes e_2$ を取る。局所行列 $A=(1,2)$、$B=(3,4)$ で制限し、二partyを一つのpartyに移す。先に移す場合の局所行列も求め、結果を比較せよ。

<!-- solution-start -->
**詳細解答**：$A_i,B_j$ はそれぞれ一行の第 $i,j$ 列の成分です。先に制限すると [制限の係数式](#vnp2-local-coordinate) より、$D_2$ は二次単位行列の係数表なので

$$
A D_2 B^{\mathsf T}=\sum_{i,j=1}^2 A_i\delta_{ij}B_j=1\cdot3+2\cdot4=11.
$$

先に移す場合、入力の基底を $(1,1),(1,2),(2,1),(2,2)$ の順に並べると配列は $(1,0,0,1)^{\mathsf T}$ です。[push-forwardによる被覆の保存](#thm-vnp2-push-covers) の局所行列の構成に従い $A_iB_j$ を各列に置くと $(3,4,6,8)$ になります。積は $3+8=11$ です。出力の一元集合二つの組も一元集合なので、双方の出力は同じ一係数の配列です。
<!-- solution-end -->

### B3. wireの積と自己wire
- Level: B
- ID: VNP2-B3

$u,v$ は異なるpartyとする。$W_2(u,v)W_3(u,v)$ の各端の添字を $1,\ldots,6$ へ対応させ、両端を一つのpartyへ移した後に単位テンソルを作る局所行列を与えよ。

<!-- solution-start -->
**詳細解答**：[wire資源の基本比較](#prop-vnp2-wire-laws) の番号付けを用います。$(1,1),(1,2),(1,3),(2,1),(2,2),(2,3)$ を順に1から6へ対応させます。係数は両端の番号が等しいとき1なので $W_6(u,v)$ です。両端を同じ位置に移すと添字集合の大きさは36、非零係数は $(i,i)$ の6個です。局所行列を一行36列とし、列 $(1,1)$ の値を1、残りを0とします。出力は $1\cdot1=1$ です。逆に唯一の基底を六つの対角基底の和へ写せば、併合後の自己wireに戻せます。これは併合前の異なる二partyへ戻す操作ではありません。他のpartyがあればその一元集合の基底には恒等写像を用います。
<!-- solution-end -->

### C1. 二つのwireから端点間のwireを作る
- Level: C
- ID: VNP2-C1

異なる三party $a,b,c$ と正整数 $q$ を取る。$W_q(a,b)W_q(b,c)$ から $W_q(a,c)$ を得る局所行列を具体的に構成せよ。単なる係数の並べ替えだけではない理由も述べよ。

<!-- solution-start -->
**詳細解答**：材料の位置 $a,b,c$ の添字はそれぞれ $i,(j,k),l$（全ての番号は $1,\ldots,q$）です。係数は

$$
\delta_{ij}\delta_{kl}
$$

です。ここで $\delta_{ij}$ は [wire資源の定義](#def-vnp2-wire) で導入した等しい添字を選ぶ記号です。出力では $a,c$ の添字を保ち、$b$ を一元集合にします。$a,c$ は恒等行列、$b$ は一行 $q^2$ 列の局所行列 $L_b(*,(j,k))=\delta_{jk}$ を選びます。[制限の係数式](#vnp2-local-coordinate) で $a,c$ の恒等行列が添字を固定するため、出力は

$$
\sum_{j,k=1}^q\delta_{ij}\delta_{jk}\delta_{kl}
=\sum_{k=1}^q\delta_{ik}\delta_{kl}
=\delta_{il}.
$$

これは $W_q(a,c)$ の係数です。$q>1$ では $b$ の添字集合を $q^2$ 個から1個へ減らし、係数の和を取っているので可逆な並べ替えではありません。$q=1$ の場合は全て一元集合であり、唯一の係数1を保つので基底の付け替えだけでも実現できます。[添字の縮約](../../TSP/TSP6/index.md#def-tsp6-contraction) の操作が中央のpartyだけで実現されたことが次講の距離の三角不等式につながります。
<!-- solution-end -->

## 7. 原論文との対応

[VP ≠ VNP over every field, v1](https://hexagonmath.org/2611.00954v1) Appendix A のテンソルの準備に対応します。[Ov/Core/Tensor.lean](https://github.com/anthropics/formal-math/blob/main/vp-vnp/Ov/Core/Tensor.lean) では配列、局所行列、制限、被覆、積、push-forward、wireをそれぞれ Ten、Loc、Restr、SumRestr、mul、push、wire と記述しています。[Paper/Tensors.lean](https://github.com/anthropics/formal-math/blob/main/vp-vnp/Paper/Tensors.lean) の tensor_one_restr、tensor_covered_by_ones、tensor_push_mul、tensor_push_comp、tensor_push_id、tensor_push_one、tensor_push_cover が本講の対応結果です。演習C1は次講で使う lem_exponents_contract の三位置が異なる場合を先に練習したものです。

本講では正の次元のwireと非空party集合を扱いました。ここで証明したのは有限配列の代数的な操作であり、回路下界そのものではありません。
