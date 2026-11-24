# LREP12 左右Weylスピノル

<!-- definition-example-audit: strict -->

[前講の被覆群の分類](../LREP11/index.md#thm-lrep11-group)では、二つの二次元複素表現がありました。回転だけを見ると同じ二成分の変換則ですが、boostでは逆の伸縮が起こります。今回はその違いを明示し、二成分を組み合わせて四元ベクトルを作ります。場の方程式を仮定せず、有限次元の表現だけで議論します。

計量は $\eta=\operatorname{diag}(-1,1,1,1)$、変換は能動的、$G=SL(2,\mathbb C)$ は実Lie群とします。$S^\dagger=\overline S^{\mathsf T}$、$S^{-\mathsf T}=(S^{-1})^{\mathsf T}$ と書きます。

## 1. 二つの二成分表現

[LREP11の左右の分類](../LREP11/index.md#thm-lrep11-group)に $(m,n)=(1,0),(0,1)$ を代入します。一次多項式の係数列に作用する行列はそれぞれ $S$ と $Q(S)=(S^\dagger)^{-1}$ です。回転では両者が一致しますが、一般のLorentz変換では一致しません。この二種類の表現空間の元をWeylスピノルとして扱います。

<a id="def-lrep12-weyl"></a>

<!-- formal-statement-start -->
> **定義（左右Weylスピノル）**  
> $G=SL(2,\mathbb C)$ の表現空間 $L=\mathbb C^2$ と $R=\mathbb C^2$ を別々に用意する。左Weylスピノル $u\in L$ と右Weylスピノル $r\in R$ の作用を

$$
u'=Su,\qquad r'=Q(S)r,\qquad Q(S)=(S^\dagger)^{-1}
$$

> と定める。左右の分類番号はそれぞれ $(1/2,0)$ と $(0,1/2)$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep12-weyl -->
**定義の確認。** $Q(ST)=((ST)^\dagger)^{-1}=(T^\dagger S^\dagger)^{-1}=Q(S)Q(T)$、$Q(I)=I$ です。左作用も行列積を保ちます。両行列は行列式1で可逆です。

例えば実数 $t=\log 4$ を用いた $z$ 方向のboostの持ち上げは

$$
S_t=\begin{pmatrix}2&0\\0&1/2\end{pmatrix},
\qquad Q(S_t)=\begin{pmatrix}1/2&0\\0&2\end{pmatrix}.
$$

入力を両方とも成分列 $(1,1)^{\mathsf T}$ とすると、左の出力は $(2,1/2)^{\mathsf T}$、右の出力は $(1/2,2)^{\mathsf T}$ です。定義の作用則を具体的に確認できました。分類番号については前講の定理で次数を一方だけ1にしたものです。
<!-- definition-example-end -->

$U\in SU(2)$ なら $U^\dagger=U^{-1}$ なので $Q(U)=U$ です。一方、上のboostでは同じ基底の作用が異なります。さらに [被覆の核](../LREP10/index.md#prop-lrep10-kernel) の $-I$ は左右とも $-I$ として作用します。[降下条件](../LREP11/index.md#thm-lrep11-descent)に $m+n=1$ を代入すると、これらは $SO^+(1,3)$ そのものの線形表現ではなく、その被覆群の表現です。

<a id="prop-lrep12-inequivalent"></a>

<!-- formal-statement-start -->
> **命題（左右Weyl表現の非同値性）**  
> $SL(2,\mathbb C)$ 上の標準作用 $S$ と逆共役転置作用 $Q(S)$ は複素線形表現として同値でない。ただし $SU(2)$ への制限は同じ作用になる。
<!-- formal-statement-end -->

**証明の見取り図。** 回転をすべて保つ絡作用素はスカラー倍に限られます。その候補がboostを保つかを調べます。

<!-- proof-start -->
### 証明

複素線形同型 $T:L\to R$ があるなら、[絡作用素の定義](../LREP1/index.md#def-lrep1-intertwiner)より $TS=Q(S)T$ が全 $S\in G$ で成立します。

$U_3=\operatorname{diag}(i,-i)$ は $SU(2)$ に属し $Q(U_3)=U_3$ です。$T=(t_{ab})$ とすると $TU_3=U_3T$ の非対角成分は $-it_{12}=it_{12}$ と $it_{21}=-it_{21}$ であり、$T$ は対角になります。さらに

$$
U_2=\begin{pmatrix}0&1\\-1&0\end{pmatrix}\in SU(2)
$$

と可換であるため、$T=\operatorname{diag}(p,q)$ に対し $p=q$ が必要です。従って $T=pI$ です。先ほどの $S_t=\operatorname{diag}(2,1/2)$ を代入すると

$$
p\begin{pmatrix}2&0\\0&1/2\end{pmatrix}
=p\begin{pmatrix}1/2&0\\0&2\end{pmatrix}.
$$

第一成分より $p=0$。可逆な $T$ は存在しません。回転への制限の一致は $Q(U)=U$ から従います。$\square$
<!-- proof-end -->

## 2. 共役・双対・ドット付き添字

[LREP4の複素共役表現](../LREP4/index.md#def-lrep4-conjugate)の空間 $\overline L$ では、$u$ の共役成分列 $z=\overline u$ に $\overline S$ が作用します。複素共役は元の空間から共役空間への反線形な対応です。一方 [双対表現](../LREP4/index.md#def-lrep4-dual) は複素線形汎関数の空間に作用します。汎関数の係数列を $r$ として評価を $r^{\mathsf T}z$ と書けば、

$$
(r')^{\mathsf T}z'=r^{\mathsf T}z
$$

を任意の $z$ に対して要求することから

$$
(r')^{\mathsf T}\overline S=r^{\mathsf T},
\qquad r'=\overline S^{-\mathsf T}r=Q(S)r
$$

を得ます。従って前節の右空間は $\overline L^*$ と同定できます。

ここで添字の点は共役空間の種類を、上下はベクトルと双対の違いを表すことにします。$a,b=1,2$、$\dot a,\dot b=\dot1,\dot2$ とし、左列を $u^a$、共役列を $z^{\dot a}$、右列を $r_{\dot a}$ と書きます。点の有無は複素共役をとる操作と関係し、上下は線形双対をとる操作と関係します。添字が上下に一度ずつ現れる積はその添字について和を取ります。

例えば

$$
S=\begin{pmatrix}1&i\\0&1\end{pmatrix},
\quad \overline S=\begin{pmatrix}1&-i\\0&1\end{pmatrix},
\quad Q(S)=\begin{pmatrix}1&0\\i&1\end{pmatrix}.
$$

同じ入力列 $(1,0)^{\mathsf T}$ でも共役作用の出力は $(1,0)^{\mathsf T}$、右作用の出力は $(1,i)^{\mathsf T}$ です。共役と双対を無条件に同じ行列にしてはいけません。

## 3. 交代形式で添字を上げ下げする

[LREP4の二次元交代形式と行列式](../LREP4/index.md#prop-lrep4-epsilon)に現れた行列を

$$
J=\begin{pmatrix}0&1\\-1&0\end{pmatrix},
\qquad J^{-1}=-J
$$

とします。$S^{\mathsf T}JS=J$ が成立するので、$Ju$ に作用する行列は $S^{-\mathsf T}$ になります。実際 $JS=S^{-\mathsf T}J$ です。この同じ構成を共役空間にも適用します。ここでは添字を下げる行列を $J$ と固定し、上げる行列は逆行列にします。

<a id="def-lrep12-index-convention"></a>

<!-- formal-statement-start -->
> **定義（Weyl添字の上げ下げ）**  
> 左空間 $L$ と共役空間 $\overline L$ の標準基底で、下添字を二つ持つ配列 $\epsilon_{ab}$ と $\epsilon_{\dot a\dot b}$ をともに $J$、上添字を二つ持つ配列をともに $J^{-1}$ とする。添字を下げる操作と上げる操作を

$$
u_a=\epsilon_{ab}u^b,\qquad
u^a=\epsilon^{ab}u_b
$$

$$
z_{\dot a}=\epsilon_{\dot a\dot b}z^{\dot b},
\qquad z^{\dot a}=\epsilon^{\dot a\dot b}z_{\dot b}
$$

> と定める。上下の配列は行列として互いに逆である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep12-index-convention -->
**定義の確認。** $u=(2,3i)^{\mathsf T}$ なら $Ju=(3i,-2)^{\mathsf T}$、$-J(Ju)=(2,3i)^{\mathsf T}$ です。共役列 $z=(2,-3i)^{\mathsf T}$ なら $Jz=(-3i,-2)^{\mathsf T}$、$-J(Jz)=(2,-3i)^{\mathsf T}$ です。どちらも元へ戻りました。行列の成分は $\epsilon_{12}=1$、$\epsilon^{12}=-1$ であり、同じ符号ではありません。

さらに前節の三角行列 $S$ について $Ju' = J S u$ を計算すると、$Su=(-1,3i)^{\mathsf T}$ なので $Ju'=(3i,1)^{\mathsf T}$ です。$S^{-\mathsf T}Ju=(3i,-i(3i)-2)^{\mathsf T}=(3i,1)^{\mathsf T}$ と一致し、下添字が双対の作用を受けることも確認できます。
<!-- definition-example-end -->

<a id="prop-lrep12-conjugate-right"></a>

<!-- formal-statement-start -->
> **命題（共役空間と右Weyl空間の同型）**  
> $G=SL(2,\mathbb C)$ の共役作用 $\overline S$ と右Weyl作用 $Q(S)=(S^\dagger)^{-1}$ の間で、$z\mapsto Jz$ は複素線形な絡同型である。左空間から右空間への対応 $u\mapsto J\overline u$ は反線形な同型である。
<!-- formal-statement-end -->

**証明の見取り図。** 共役行列も行列式1なので、交代形式の恒等式に代入します。複素共役を含むかどうかで線形性が変わります。

<!-- proof-start -->
### 証明

$\det\overline S=\overline{\det S}=1$ です。[交代形式の行列式公式](../LREP4/index.md#prop-lrep4-epsilon)に $A=\overline S$ を代入すると

$$
\overline S^{\mathsf T}J\overline S=J,
\qquad J\overline S=\overline S^{-\mathsf T}J=Q(S)J.
$$

従って $J(\overline S z)=Q(S)(Jz)$ です。$J$ は可逆で複素行列による線形写像なので、共役空間から右空間への絡同型になります。元の左空間のスカラー $\lambda\in\mathbb C$ に対しては

$$
J\overline{\lambda u}=\overline\lambda J\overline u
$$

だから反線形です。逆対応は $r\mapsto\overline{J^{-1}r}$ です。さらに $J\overline{Su}=Q(S)J\overline u$ となるので群作用を保ちます。$\square$
<!-- proof-end -->

左右表現が複素線形には非同値であることと、反線形な対応があることは矛盾しません。

## 4. 二つの添字から四元ベクトルへ

左列 $u$ と共役空間の列 $z$ を独立に取ると、成分の積 $u^az^{\dot b}$ が四つできます。四元ベクトルの実成分を表すためには、さらにエルミート条件が必要です。

[LREP10のエルミート行列模型](../LREP10/index.md#def-lrep10-hermitian-model)では $I,\sigma_1,\sigma_2,\sigma_3$ を基底として使いました。本講でも

$$
\sigma_0=I,\quad
\sigma_1=\begin{pmatrix}0&1\\1&0\end{pmatrix},
\quad
\sigma_2=\begin{pmatrix}0&-i\\i&0\end{pmatrix},
\quad
\sigma_3=\begin{pmatrix}1&0\\0&-1\end{pmatrix}
$$

とします。行・列を $a,\dot b$ で識別する成分表記では

$$
X^{a\dot b}=x^\mu(\sigma_\mu)^{a\dot b}.
$$

ここでスピノル添字を両方下げるなら行列は $JXJ^{\mathsf T}$ となります。時空添字を上げる操作は別であり、$\sigma^\mu=\eta^{\mu\nu}\sigma_\nu$、従って $\sigma^0=-I,\sigma^i=\sigma_i$ です。両スピノル添字を下げた $\sigma^\mu_{a\dot b}$ は $J\sigma^\mu J^{\mathsf T}$ の成分です。

<a id="prop-lrep12-bispinor-vector"></a>

<!-- formal-statement-start -->
> **命題（二添字Weyl表示と四元ベクトル）**  
> $G=SL(2,\mathbb C)$ の左Weyl空間 $L$ と共役空間 $\overline L$ に対し、写像

$$
F:L\otimes\overline L\longrightarrow M_2(\mathbb C),
\qquad F(u\otimes z)=uz^{\mathsf T}
$$

> は複素線形同型であり、テンソル積作用を行列作用 $X\mapsto SXS^\dagger$ へ移す。実四元ベクトルはこの行列空間のエルミート部分空間に対応し、その作用はLorentz変換である。
<!-- formal-statement-end -->

**証明の見取り図。** 基底テンソル四つを行列単位四つへ移し、作用の積を計算します。その後、[四元ベクトル作用](../LREP10/index.md#def-lrep10-sl2c-action)と比較します。

<!-- proof-start -->
### 証明

写像 $(u,z)\mapsto uz^{\mathsf T}$ は二つの引数で複素線形なので、[テンソル積表現](../LREP4/index.md#def-lrep4-tensor-product)の空間上の線形写像を定めます。標準基底 $e_1,e_2$ と共役空間の基底 $\bar e_1,\bar e_2$ を用いると $F(e_a\otimes\bar e_b)=E_{ab}$ です。$E_{ab}$ は $(a,b)$ 成分だけ1の行列で、四つは全行列空間の基底です。従って $F$ は同型です。

$$
\begin{aligned}
F(Su\otimes\overline S z)
&=(Su)(\overline S z)^{\mathsf T}\\
&=Su z^{\mathsf T}\overline S^{\mathsf T}\\
&=S F(u\otimes z)S^\dagger .
\end{aligned}
$$

純テンソルがテンソル積を張るため、全体でこの関係が成立します。[共役空間と右空間の同型](#prop-lrep12-conjugate-right)から $L\otimes\overline L$ は $L\otimes R$ と同値で、[前講の四元ベクトルの複素化](../LREP11/index.md#prop-lrep11-vector)の $(1/2,1/2)$ に対応します。

エルミート条件 $X^\dagger=X$ のもとで

$$
X=\begin{pmatrix}
x^0+x^3&x^1-ix^2\\
x^1+ix^2&x^0-x^3
\end{pmatrix}
$$

の四つの係数は実数として一意に決まります。逆に任意の実四元ベクトルはこの行列を作ります。合同作用で $(SXS^\dagger)^\dagger=S X^\dagger S^\dagger=SXS^\dagger$ となるため、この実部分空間は不変です。[Lorentz群への二重被覆](../LREP10/index.md#thm-lrep10-double-cover)をこの実空間に適用すると結論が得られます。$\square$
<!-- proof-end -->

例えば $u=(1,i)^{\mathsf T}$ と $z=\overline u$ なら

$$
X=u u^\dagger=\begin{pmatrix}1&-i\\i&1\end{pmatrix}
=I+\sigma_2
$$

です。これは $x=(1,0,1,0)$、$\eta(x,x)=-1+1=0$ の未来向き光的ベクトルです。[未来光的ベクトルの階数1分解](../LREP10/index.md#prop-lrep10-null-factorization)によれば、非零の未来光的ベクトルは逆にこの形へ分解できます。一般の四元ベクトルは一つの $uu^\dagger$ だけでは表せません。例えば $I$ の階数は2ですが、$uu^\dagger$ の階数は高々1だからです。

## 5. 演習

### Level A

<a id="ex-lrep12-a01"></a>

#### LREP12-A01 三角行列の左右作用
- Level: A
- ID: LREP12-A01

$S=\begin{pmatrix}1&2i\\0&1\end{pmatrix}$ とし、左列と右列の入力をともに $(1,1)^{\mathsf T}$ とする。変換後の列を求めよ。

<!-- solution-start -->
**詳細解答。** [左右Weylスピノルの定義](#def-lrep12-weyl)を使います。

$$
S^\dagger=\begin{pmatrix}1&0\\-2i&1\end{pmatrix},
\quad Q(S)=\begin{pmatrix}1&0\\2i&1\end{pmatrix}.
$$

対角が1の三角行列なので両行列式は1です。$S^\dagger Q(S)=I$ は左下が $-2i+2i=0$ となることから確認できます。よって左列は $(1+2i,1)^{\mathsf T}$、右列は $(1,1+2i)^{\mathsf T}$ になります。
<!-- solution-end -->

<a id="ex-lrep12-a02"></a>

#### LREP12-A02 添字の符号
- Level: A
- ID: LREP12-A02

$u^1=1+i,u^2=2$ の添字を下げ、再び上げよ。$\epsilon^{12}=\epsilon_{12}$ と誤った場合の結果も求めよ。

<!-- solution-start -->
**詳細解答。** [添字の上げ下げ](#def-lrep12-index-convention)で

$$
Ju=(2,-1-i)^{\mathsf T},\qquad
-J(Ju)=(1+i,2)^{\mathsf T}.
$$

誤って上げる際も $J$ を使うと $J(Ju)=J^2u=-u$ なので $(-1-i,-2)^{\mathsf T}$ になります。逆行列を使う必要がある理由です。
<!-- solution-end -->

<a id="ex-lrep12-a03"></a>

#### LREP12-A03 共役と双対
- Level: A
- ID: LREP12-A03

$S=\operatorname{diag}(3,1/3)$ とする。左列、共役列、左双対列、共役双対列の作用行列を求めよ。

<!-- solution-start -->
**詳細解答。** [共役表現](../LREP4/index.md#def-lrep4-conjugate)は成分の共役、[双対表現](../LREP4/index.md#def-lrep4-dual)は逆元の転置です。$S$ が実対角なので

$$
\overline S=S=\operatorname{diag}(3,1/3),
$$

$$
S^{-\mathsf T}=\overline S^{-\mathsf T}
=\operatorname{diag}(1/3,3).
$$

最後が $Q(S)$ です。この例で双対と共役双対が一致するのは実行列だからであり、複素行列一般の等式ではありません。
<!-- solution-end -->

<a id="ex-lrep12-a04"></a>

#### LREP12-A04 四元成分を読む
- Level: A
- ID: LREP12-A04

$X=\begin{pmatrix}5&2+i\\2-i&1\end{pmatrix}$ の四元ベクトルとMinkowski二乗を求めよ。

<!-- solution-start -->
**詳細解答。** [二添字Weyl表示](#prop-lrep12-bispinor-vector)の成分を比較します。対角の和と差から $x^0=(5+1)/2=3$、$x^3=(5-1)/2=2$。非対角の実部と虚部から $x^1=2$、$x^2=-1$ です。

$$
\eta(x,x)=-9+4+1+4=0.
$$

行列式も $5-(2+i)(2-i)=5-5=0$ で一致します。$x^0=3>0$ なので未来光的です。
<!-- solution-end -->

### Level B

<a id="ex-lrep12-b01"></a>

#### LREP12-B01 添字を下げる操作の共変性
- Level: B
- ID: LREP12-B01

$S=\begin{pmatrix}1&1+i\\0&1\end{pmatrix}$、$z=(1,2)^{\mathsf T}$ に対し、$J\overline S z$ と $Q(S)Jz$ を別々に計算せよ。評価 $r^{\mathsf T}z$ が保存されることを $r=(2,1)^{\mathsf T}$ で確認せよ。

<!-- solution-start -->
**詳細解答。** $\overline S z=(3-2i,2)^{\mathsf T}$ なので $J\overline S z=(2,-3+2i)^{\mathsf T}$ です。一方

$$
Q(S)=\begin{pmatrix}1&0\\-1+i&1\end{pmatrix},
\quad Jz=(2,-1)^{\mathsf T}.
$$

積は $(2,2(-1+i)-1)^{\mathsf T}=(2,-3+2i)^{\mathsf T}$ となり、[共役空間と右空間の同型](#prop-lrep12-conjugate-right)と一致します。評価の入力は $r^{\mathsf T}z=2+2=4$ です。$Q(S)r=(2,-1+2i)^{\mathsf T}$ なので変換後は

$$
2(3-2i)+2(-1+2i)=4.
$$

共役転置ではなく転置による評価である点に注意します。
<!-- solution-end -->

<a id="ex-lrep12-b02"></a>

#### LREP12-B02 実条件とテンソルの成分
- Level: B
- ID: LREP12-B02

$u=(1,i)^{\mathsf T}$、$z=(2,1)^{\mathsf T}$ とする。$X=uz^{\mathsf T}$ の複素四元成分を求め、実四元ベクトルに対応するか判定せよ。

<!-- solution-start -->
**詳細解答。** [二添字Weyl表示](#prop-lrep12-bispinor-vector)より

$$
X=\begin{pmatrix}2&1\\2i&i\end{pmatrix}.
$$

対角の和と差から $x^0=(2+i)/2,x^3=(2-i)/2$。非対角について $x^1-ix^2=1,x^1+ix^2=2i$ なので

$$
x^1=(1+2i)/2,\qquad x^2=(2i-1)/(2i)=1+i/2.
$$

係数はすべて実とは限りません。特に $X_{22}=i$ が実数でないのでエルミート条件を満たさず、実四元ベクトルには対応しません。行列式が零でも実性は保証されません。
<!-- solution-end -->

<a id="ex-lrep12-b03"></a>

#### LREP12-B03 両添字を下げた表示
- Level: B
- ID: LREP12-B03

$X=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ に対し $Y=JXJ^{\mathsf T}$ を求めよ。また $X'=SXS^\dagger$ のとき $Y'=S^{-\mathsf T}Y\overline S^{-1}$ となることを示せ。

<!-- solution-start -->
**詳細解答。** [添字の上げ下げ](#def-lrep12-index-convention)に従って行列積を行うと

$$
JX=\begin{pmatrix}c&d\\-a&-b\end{pmatrix},
\qquad Y=\begin{pmatrix}d&-c\\-b&a\end{pmatrix}.
$$

[交代形式の行列式公式](../LREP4/index.md#prop-lrep4-epsilon)から $JS=S^{-\mathsf T}J$、共役側では $J\overline S=\overline S^{-\mathsf T}J$ です。後者を転置すると $\overline S^{\mathsf T}J^{\mathsf T}=J^{\mathsf T}\overline S^{-1}$。従って

$$
\begin{aligned}
Y'&=JSXS^\dagger J^{\mathsf T}\\
&=S^{-\mathsf T}JXJ^{\mathsf T}\overline S^{-1}\\
&=S^{-\mathsf T}Y\overline S^{-1}.
\end{aligned}
$$

両添字を下げると両方の因子が双対の作用になります。
<!-- solution-end -->

### Level C

<a id="ex-lrep12-c01"></a>

#### LREP12-C01 光的ベクトルのboostと右Weyl表示
- Level: C
- ID: LREP12-C01

$u=(1,1)^{\mathsf T}$、$r=J\overline u$、$S=\operatorname{diag}(2,1/2)$ とする。左右の変換後の列、$u u^\dagger$ と変換後の行列の四元成分を求めよ。さらに $r$ から復元した共役列で変換後の行列を再構成し、Minkowski二乗を検算せよ。

<!-- solution-start -->
**詳細解答。** [共役空間と右空間の同型](#prop-lrep12-conjugate-right)により $r=(1,-1)^{\mathsf T}$ です。右作用は $Q(S)=\operatorname{diag}(1/2,2)$ だから

$$
u'=(2,1/2)^{\mathsf T},\qquad
r'=(1/2,-2)^{\mathsf T}.
$$

左列から直接作ると

$$
X=uu^\dagger=\begin{pmatrix}1&1\\1&1\end{pmatrix},
\qquad
X'=u'(u')^\dagger=\begin{pmatrix}4&1\\1&1/4\end{pmatrix}.
$$

[二添字Weyl表示](#prop-lrep12-bispinor-vector)から $x=(1,1,0,0)$、変換後は $x'^0=(4+1/4)/2=17/8$、$x'^3=(4-1/4)/2=15/8$、$x'^1=1,x'^2=0$ です。

右列から共役列を復元するには $z'=J^{-1}r'=(2,1/2)^{\mathsf T}$ とします。その転置を $u'$ の右から掛ければ $u'(z')^{\mathsf T}=X'$ で一致します。最後に

$$
\eta(x',x')=-289/64+1+225/64=0
$$

となり元の $-1+1=0$ と一致します。$x'^0>0$ なので未来向きのままです。行列式も $4/4-1=0$ で検算できます。
<!-- solution-end -->

## 6. まとめと次講

左右のWeyl表現は回転では一致し、boostを含めると複素線形には非同値です。共役空間と右空間は交代形式で結ばれます。添字の上下と点の有無を区別すると、二つのスピノル添字を持つ行列から四元ベクトルを再構成できます。

次のLREP13「Lorentz不変収縮」では、添字の組合せからどの量がスカラー・ベクトルとして変換するのか、空間反転が左右表現をどう交換するかを考えます。
