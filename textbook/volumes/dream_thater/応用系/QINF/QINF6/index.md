# QINF6 Schmidt分解

[QINF3の部分トレース](../QINF3/index.md#def-qinf3-partial-trace)を使うと、二部純粋状態の一方だけを観測したときの密度演算子が得られます。[QINF4の精製](../QINF4/index.md#thm-qinf4-existence)は逆に、混合状態をより大きな純粋状態から作りました。しかし、一般の純粋状態を見たとき、**どの局所基底を選べば両側の相関を最も単純に表せるか**はまだ答えていません。

例えば、二qubit状態

$$
|\psi_p\rangle=\sqrt p\,|00\rangle+\sqrt{1-p}\,|11\rangle,
\qquad 0<p<1
$$

は二つの積ベクトルの和ですが、両側に現れる $|0\rangle,|1\rangle$ はそれぞれ正規直交しています。両側をこの $|0\rangle,|1\rangle$ 基底で測ると、それぞれ0と1を得る確率は $p,1-p$ になります。どんな二部純粋状態でもこのような形へ変換できることが **Schmidt分解** の内容です。

以下、$H_A,H_B$ は次元 $d_A,d_B\ge1$ の有限次元複素Hilbert空間です。$\psi\in H_A\otimes H_B$ は単位ベクトル、$\rho_{AB}=|\psi\rangle\langle\psi|$ は全系の純粋状態、$\rho_A=\operatorname{Tr}_B\rho_{AB}$、$\rho_B=\operatorname{Tr}_A\rho_{AB}$ は縮約状態とします。内積は第二変数に線形で、$\dagger$ は共役転置、$\operatorname{Tr}$ はトレースです。

## 1. 相関のある方向を対で並べる

二部の状態を任意の積基底で展開すると一般には $d_Ad_B$ 個の係数が必要です。一方、上の $|\psi_p\rangle$ には「$A$ の0と $B$ の0」「$A$ の1と $B$ の1」という対応する組だけが現れます。両側それぞれで長さ1かつ互いに直交するベクトルを選び、**対応する組だけを足す表示**を考えます。

<a id="def-qinf6-schmidt"></a>

<!-- formal-statement-start -->
> **定義（Schmidt表示とSchmidt係数）**  
> 有限次元複素Hilbert空間 $H_A,H_B$ の単位ベクトル $\psi\in H_A\otimes H_B$ に対し、正整数 $r\le\min(d_A,d_B)$、正の実数 $s_1,\ldots,s_r$、それぞれの空間で正規直交するベクトル族 $\{u_i\}_{i=1}^r\subset H_A$、$\{v_i\}_{i=1}^r\subset H_B$ を用いて

$$
|\psi\rangle=\sum_{i=1}^r s_i\,|u_i\rangle\otimes|v_i\rangle,
\qquad s_i>0,\qquad
\sum_{i=1}^r s_i^2=1
$$

> と書けるとき、この表示を**Schmidt表示**、正の数 $s_i$ を**Schmidt係数**と呼ぶ。必要なら $s_1\ge\cdots\ge s_r>0$ の順に並べる。両側の族は、空間全体の基底ではなく正規直交系でよい。
<!-- formal-statement-end -->

この定義は「表示が得られたなら何を検査するか」を指定しています。どんな $\psi$ にも表示が存在することは次節で証明します。零係数を無制限に付け足すと項数が恣意的になるため、係数は正のものだけを数えます。

<!-- definition-example-start: def-qinf6-schmidt -->
### 定義の確認：二qubitの二つの対

**定義の確認**：両側の正規直交性、係数の正値性、二乗和による正規化を順に確かめます。

$|\psi_p\rangle$ に $u_1=v_1=|0\rangle$、$u_2=v_2=|1\rangle$、$s_1=\sqrt p$、$s_2=\sqrt{1-p}$ を選びます。両側とも

$$
\langle0|0\rangle=\langle1|1\rangle=1,
\qquad\langle0|1\rangle=0
$$

なので正規直交条件を満たし、$0<p<1$ により二係数は正、さらに $s_1^2+s_2^2=p+(1-p)=1$ です。これが定義の全条件の確認です。$p=1$ では第二係数が0になるため、正の係数だけを残した一項表示へ変わります。
<!-- definition-example-end -->

係数が何個必要かは、純粋状態が積状態かどうかを判定する重要な量になります。任意の展開の非零項数ではなく、両側が正規直交するSchmidt表示の正の項数に注目します。

<a id="def-qinf6-rank"></a>

<!-- formal-statement-start -->
> **定義（Schmidt階数）**  
> 有限次元複素Hilbert空間 $H_A,H_B$ の単位ベクトル $\psi$ にSchmidt表示が与えられたとき、その正のSchmidt係数の個数 $r$ を**Schmidt階数**と呼ぶ。表示によらず定まることは後の定理で証明する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf6-rank -->
### 定義の確認：一項と二項

**定義の確認**：各表示で正係数がいくつあるかを数える前に、直前の正規直交性と正規化が保たれることを確かめます。

正規化された $|0\rangle\otimes|1\rangle$ は一項Schmidt表示で、正係数が1個なので階数1です。一方、先ほど $0<p<1$ で確認した $|\psi_p\rangle$ は正の係数が2個なので階数2です。この例だけでは異なる基底で項数を減らせない理由が未確定です。その点を、縮約状態のrankとの一致から証明します。
<!-- definition-example-end -->

## 2. 係数行列を特異値分解する

任意の正規直交基底 $(e_a)_{a=1}^{d_A}$、$(f_j)_{j=1}^{d_B}$ による展開を考えます。

$$
|\psi\rangle=\sum_{a=1}^{d_A}\sum_{j=1}^{d_B}
c_{aj}|e_a\rangle\otimes|f_j\rangle,
\qquad
C=(c_{aj})\in\mathbb C^{d_A\times d_B}.
$$

この $C$ は $A$ の基底添字を行、$B$ の添字を列に置いた**係数行列**で、密度演算子ではありません。[QINF3の係数行列による縮約公式](../QINF3/index.md#eq-qinf3-coefficient-reduction)では $\rho_A=CC^\dagger$、$\rho_B=C^{\mathsf T}\overline C$ でした。

ここで利用する[LA6の複素特異値分解](../../../基礎科目/LA/LA6/index.md#thm-la6-complex-svd)は、長方形の複素行列を、二組の正規直交方向と正の伸縮率へ分解します。$C$ の行・列はすでに両側の基底を表しているため、その伸縮率と方向を量子状態のテンソル積へ読み替えられます。ただし**右側のSchmidtベクトルには複素共役が必要**です。

<a id="thm-qinf6-existence"></a>

<!-- formal-statement-start -->
> **定理（有限次元Schmidt分解）**  
> 次元 $d_A,d_B\ge1$ の有限次元複素Hilbert空間 $H_A,H_B$ と単位ベクトル $\psi\in H_A\otimes H_B$ に対しSchmidt表示が存在する。Schmidt表示の正の係数の個数は任意の積基底で作った係数行列 $C$ のrankに等しい。係数の多重集合が表示によらず一意に決まることは、縮約状態の固有値から後で示す。
<!-- formal-statement-end -->

### 証明の見取り図

係数行列 $C$ に[複素特異値分解](../../../基礎科目/LA/LA6/index.md#thm-la6-complex-svd)を適用します。左特異ベクトルを $A$ 側、**右特異ベクトルの成分ごとの共役**を $B$ 側のベクトルにします。テンソル積の成分を比較すればSchmidt表示となり、正の項数も行列のrankに一致します。

<!-- proof-start -->
### 証明

指定した積基底に関する係数行列を $C$ とします。$|\psi\rangle$ の正規化から

$$
\sum_{a,j}|c_{aj}|^2=\|\psi\|^2=1
$$

なので $C\ne0$ です。[LA6の複素特異値分解](../../../基礎科目/LA/LA6/index.md#thm-la6-complex-svd)を $m=d_A,n=d_B,A=C$ として適用します。$U\in\mathbb C^{d_A\times d_A}$、$V\in\mathbb C^{d_B\times d_B}$ はユニタリ行列で、

$$
C=U\Sigma V^\dagger,\qquad
\Sigma_{ii}=s_i>0\quad(1\le i\le r),
$$

$$
\Sigma_{ij}=0\quad\text{(それ以外)},\qquad
r=\operatorname{rank}C\le\min(d_A,d_B).
$$

列成分を $U_{ai},V_{ji}$ として、各 $1\le i\le r$ で

$$
|u_i\rangle=\sum_{a=1}^{d_A}U_{ai}|e_a\rangle,\qquad
|v_i\rangle=\sum_{j=1}^{d_B}\overline{V_{ji}}|f_j\rangle
$$

と定めます。$U^\dagger U=I$ から

$$
\langle u_i|u_k\rangle
=\sum_a\overline{U_{ai}}U_{ak}
=\delta_{ik}.
$$

$B$ 側も $V^\dagger V=I$ の複素共役を取れば

$$
\langle v_i|v_k\rangle
=\sum_jV_{ji}\overline{V_{jk}}
=\overline{\sum_j\overline{V_{ji}}V_{jk}}
=\delta_{ik}
$$

で、両側の正規直交性が従います。さらに、SVDの積の $(a,j)$ 成分は

$$
c_{aj}=(U\Sigma V^\dagger)_{aj}
=\sum_{i=1}^r s_iU_{ai}\overline{V_{ji}}.
$$

右辺は $\sum_i s_i|u_i\rangle\otimes|v_i\rangle$ の $|e_a\rangle\otimes|f_j\rangle$ 係数そのものです。[積基底の一意な展開](../QINF1/index.md#thm-qinf1-product-basis)から

$$
|\psi\rangle=\sum_{i=1}^r s_i|u_i\rangle\otimes|v_i\rangle.
$$

これを用いて、正規直交する積ベクトルどうしの交差項は0なので

$$
1=\|\psi\|^2
=\sum_{i,k}s_is_k
\langle u_i|u_k\rangle\langle v_i|v_k\rangle
=\sum_{i=1}^rs_i^2.
$$

したがってSchmidt表示の全条件が成立しました。SVDで正の特異値の個数は $r=\operatorname{rank}C$ です。$\square$
<!-- proof-end -->

### 複素共役を落とすと何が壊れるか

例えば積状態

$$
|\chi\rangle=|0\rangle\otimes
\frac{|0\rangle+i|1\rangle}{\sqrt2}
$$

の係数行列は $C=\begin{pmatrix}1&i\\0&0\end{pmatrix}/\sqrt2$ です。SVDの右特異ベクトルとして $V$ の第一列に $(1,-i)^{\mathsf T}/\sqrt2$ を選べます（これは $C^\dagger C$ の固有値1の固有ベクトルです）。そのまま $B$ の状態に写すと $|0\rangle-i|1\rangle$ が現れ、元の状態と違います。成分ごとの共役を取ると

$$
|v_1\rangle=\frac{|0\rangle+i|1\rangle}{\sqrt2},
\qquad
|\chi\rangle=1\cdot|0\rangle\otimes|v_1\rangle
$$

となり、正しい係数を再現します。複素数では行列の随伴とテンソル積の係数を区別することが必要です。

## 3. 両側で同じ非零スペクトルを見る

Schmidt表示があると、[QINF3の部分トレース](../QINF3/index.md#def-qinf3-partial-trace)を逐一全成分に適用せずに局所状態を求められます。$B$ 側を消すときは $\langle v_k|v_i\rangle$ が係数になり、直交性によって $i=k$ の項だけが残ります。

<a id="thm-qinf6-reduced-spectrum"></a>

<!-- formal-statement-start -->
> **定理（両側縮約の非零固有値の一致）**  
> 有限次元複素Hilbert空間 $H_A,H_B$ の単位ベクトルがSchmidt表示

$$
|\psi\rangle=\sum_{i=1}^rs_i|u_i\rangle\otimes|v_i\rangle
$$

> を持つとする。ただし $s_i>0$、$\sum_i s_i^2=1$ で、両側のベクトル族は正規直交する。この純粋状態の縮約 $\rho_A=\operatorname{Tr}_B|\psi\rangle\langle\psi|$ と $\rho_B=\operatorname{Tr}_A|\psi\rangle\langle\psi|$ は

$$
\rho_A=\sum_{i=1}^r s_i^2|u_i\rangle\langle u_i|,
\qquad
\rho_B=\sum_{i=1}^r s_i^2|v_i\rangle\langle v_i|
$$

> と表される。両者の正の固有値は**重複度を含めて** $\{s_i^2\}_{i=1}^r$ に一致し、両者のrankは $r$ である。零固有値の重複度はそれぞれ $d_A-r$、$d_B-r$ と異なり得る。任意の正整数 $k$ について

$$
\operatorname{Tr}(\rho_A^k)
=\operatorname{Tr}(\rho_B^k)
=\sum_{i=1}^rs_i^{2k}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

部分トレースの計算では、片方の内積が $\delta_{ik}$ になるため交差項が消えます。残る演算子はSchmidtベクトルを固有ベクトルに持ち、直交補空間では0になります。正の固有値と零の個数を分けて数えます。

<!-- proof-start -->
### 証明

まず全系の射影を展開すると

$$
|\psi\rangle\langle\psi|=
\sum_{i,k=1}^rs_is_k
\bigl(|u_i\rangle\langle u_k|\bigr)
\otimes\bigl(|v_i\rangle\langle v_k|\bigr).
$$

[QINF3の部分トレースの積への作用](../QINF3/index.md#prop-qinf3-state-product)を各項に適用します。$|v_i\rangle\langle v_k|$ のトレースは $\langle v_k|v_i\rangle=\delta_{ki}$ なので

$$
\begin{aligned}
\rho_A
&=\sum_{i,k}s_is_k|u_i\rangle\langle u_k|
\operatorname{Tr}(|v_i\rangle\langle v_k|)\\
&=\sum_{i,k}s_is_k\delta_{ki}|u_i\rangle\langle u_k|\\
&=\sum_i s_i^2|u_i\rangle\langle u_i|.
\end{aligned}
$$

$A$ 側を消すときも $\langle u_k|u_i\rangle=\delta_{ki}$ によって同じ計算が成立し、$\rho_B=\sum_i s_i^2|v_i\rangle\langle v_i|$ です。

$1\le j\le r$ について正規直交性から

$$
\rho_Au_j
=\sum_i s_i^2u_i\langle u_i|u_j\rangle
=s_j^2u_j.
$$

また $\operatorname{span}\{u_i\}$ に直交する $w$ なら $\rho_Aw=0$ です。従って $H_A$ をこの直交和で分解すると、正の固有値は $s_i^2$、残り $d_A-r$ 個の固有値は0です。同じ議論を $v_i$ に適用すると $B$ 側も正の固有値は一致し、零は $d_B-r$ 個です。最後に各固有値を $k$ 乗して足すと

$$
\operatorname{Tr}(\rho_A^k)=\sum_i(s_i^2)^k
=\operatorname{Tr}(\rho_B^k)
$$

を得ます。$\square$
<!-- proof-end -->

特に $k=2$ は[QINF2の純粋性](../QINF2/index.md#def-qinf2-purity)と接続し、

$$
\operatorname{Tr}(\rho_A^2)
=\operatorname{Tr}(\rho_B^2)
=\sum_i s_i^4
$$

を与えます。rank $r$ が同じでも係数の大小が異なれば、この値は変わります。一方で二部純粋状態の左右で異なる純粋性を持つことはありません。

この定理はSchmidt係数の一意性も証明します。任意のSchmidt表示の各 $s_i^2$ は、同じ作用素 $\rho_A$ の**正の**固有値の多重集合に一致します。従ってそれらの正の平方根を取ったSchmidt係数の多重集合とSchmidt階数 $r=\operatorname{rank}\rho_A$ は表示によらず一意です。ベクトルの組まで一意という意味ではありません。

### 長方形の二部系では零を付け足す

$H_A=\mathbb C^2$、$H_B=\mathbb C^3$ で

$$
|\zeta\rangle=\sqrt{\frac23}|0\rangle_A|0\rangle_B
+\sqrt{\frac13}|1\rangle_A|2\rangle_B
$$

とします。両側の組は正規直交で、係数の二乗和は1です。Schmidt階数は2で、

$$
\rho_A=\begin{pmatrix}2/3&0\\0&1/3\end{pmatrix},
\qquad
\rho_B=\begin{pmatrix}2/3&0&0\\0&0&0\\0&0&1/3\end{pmatrix}.
$$

$A$ は固有値 $2/3,1/3$、$B$ は $2/3,1/3,0$ です。「全固有値が同じ」ではなく「**非零**固有値が同じ」という限定が、異なる局所次元では不可欠です。

## 4. 積状態判定と局所基底の自由度

[QINF3の積状態判定](../QINF3/index.md#thm-qinf3-product-pure)は縮約状態のrankが1かを用いました。Schmidt階数がそのrankに一致したので、係数行列をどの基底で書いた場合も積性を一目で判定できるようになります。

<a id="prop-qinf6-product"></a>

<!-- formal-statement-start -->
> **命題（Schmidt階数と積状態）**  
> 有限次元複素Hilbert空間 $H_A,H_B$ の単位ベクトル $\psi$ について、次の三条件は同値である。
>
> 1. $\psi$ は単位ベクトル二つのテンソル積 $u\otimes v$ である。
> 2. $\psi$ のSchmidt階数は1である。
> 3. 縮約状態 $\rho_A=\operatorname{Tr}_B|\psi\rangle\langle\psi|$ のrankは1である。
>
> 階数が2以上なら $\psi$ はエンタングル純粋状態である。
<!-- formal-statement-end -->

### 証明の見取り図

Schmidt表示が一項なら正規化により係数は1で、積状態です。逆向きは[QINF3の積性と縮約rankの同値](../QINF3/index.md#thm-qinf3-product-pure)、rankとSchmidt階数の同値は[両側縮約の非零固有値の一致](#thm-qinf6-reduced-spectrum)から得ます。

<!-- proof-start -->
### 証明

Schmidt階数1なら $\psi=s_1u_1\otimes v_1$ で、$s_1>0$ かつ $s_1^2=1$ なので $s_1=1$、従って積状態です。逆に積状態なら[QINF3の純粋状態の積性と縮約の純粋性](../QINF3/index.md#thm-qinf3-product-pure)により $\operatorname{rank}\rho_A=1$ です。[本章の両側縮約の非零固有値の一致](#thm-qinf6-reduced-spectrum)から $\operatorname{rank}\rho_A$ はSchmidt階数そのものなので1です。階数2以上は積状態でないことを意味し、[QINF1の積状態とエンタングル純粋状態](../QINF1/index.md#def-qinf1-product-entangled)に照らして結論します。$\square$
<!-- proof-end -->

Schmidt係数は局所的な基底の取り方を変えても不変ですが、個々のSchmidtベクトルは必ずしも一意ではありません。局所系の内部で行うユニタリ操作を比較しましょう。

<a id="prop-qinf6-local-unitary"></a>

<!-- formal-statement-start -->
> **命題（局所ユニタリとSchmidt係数の不変性）**  
> 有限次元複素Hilbert空間 $H_A,H_B$ の単位ベクトル $\psi$ とユニタリ作用素 $W_A:H_A\to H_A$、$W_B:H_B\to H_B$ に対し、$(W_A\otimes W_B)\psi$ のSchmidt係数の多重集合は $\psi$ のものと一致する。逆に同じ $H_A\otimes H_B$ 上の二つの単位ベクトルが同じSchmidt係数の多重集合を持てば、一方を他方へ写す局所ユニタリ $W_A\otimes W_B$ が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

ユニタリは内積を保存するため、Schmidt表示の各正規直交系を別の正規直交系に写し、係数を変えません。逆向きは同じ係数順に並べた二組のSchmidtベクトルを対応づけ、それぞれを空間全体の正規直交基底に延長してユニタリを作ります。

<!-- proof-start -->
### 証明

$\psi=\sum_i s_iu_i\otimes v_i$ に作用させると

$$
(W_A\otimes W_B)\psi
=\sum_i s_i(W_Au_i)\otimes(W_Bv_i).
$$

各 $i,k$ について

$$
\langle W_Au_i|W_Au_k\rangle
=\langle u_i|W_A^\dagger W_Au_k\rangle
=\delta_{ik}
$$

であり、$B$ 側も同じです。従って右辺はSchmidt表示で、[縮約状態の固有値から得た係数多重集合の一意性](#thm-qinf6-reduced-spectrum)により係数は変わりません。

逆向きに、$\psi=\sum_{i=1}^rs_iu_i\otimes v_i$、$\phi=\sum_{i=1}^rs_i\widetilde u_i\otimes\widetilde v_i$ と、係数を同じ順に並べます。有限次元の[正規直交系の延長](../../../基礎科目/LA/LA5/index.md#thm-la5-orthonormal-extension)により $\{u_i\}$ と $\{\widetilde u_i\}$ を各々 $H_A$ の正規直交基底まで延長します。一方の基底の各ベクトルを他方へ写す線形写像 $W_A$ を定めると、任意の $x=\sum_a x_au_a$、$y=\sum_a y_au_a$ に対し

$$
\langle W_Ax|W_Ay\rangle
=\sum_a\overline{x_a}y_a=\langle x|y\rangle
$$

で、全単射でもあるからユニタリです。同じ構成で $W_Bv_i=\widetilde v_i$ となるユニタリ $W_B$ を作ります。すると

$$
(W_A\otimes W_B)\psi
=\sum_i s_i\widetilde u_i\otimes\widetilde v_i=\phi.
$$

重複する係数があっても、対応順を一つ選べば構成できます。$\square$
<!-- proof-end -->

### 同じ係数でも基底は一意ではない

Bell状態 $|\Phi^+\rangle=(|00\rangle+|11\rangle)/\sqrt2$ は二係数がともに $1/\sqrt2$ です。$|\pm\rangle=(|0\rangle\pm|1\rangle)/\sqrt2$ を使うと

$$
\begin{aligned}
|++\rangle+|--\rangle
&=\frac12\{(|00\rangle+|01\rangle+|10\rangle+|11\rangle)\\
&\qquad+(|00\rangle-|01\rangle-|10\rangle+|11\rangle)\}\\
&=|00\rangle+|11\rangle.
\end{aligned}
$$

従って計算基底の組でも $|\pm\rangle$ の組でも同じSchmidt表示を与えます。固有値の重複があると固有空間内の正規直交基底は一意ではありません。重複がなくても各組の位相を逆向きに変える自由はあります。一意なのは正係数の多重集合であって、Schmidtベクトルそのものではありません。

Schmidt階数 $r$ について、$\sum_i s_i^2=1$ と[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
1=\left(\sum_i s_i^2\right)^2
\le r\sum_i s_i^4,
\qquad
\frac1r\le\operatorname{Tr}(\rho_A^2)\le1.
$$

上界は、各 $s_i^2>0$ に注意して

$$
1=\left(\sum_i s_i^2\right)^2
=\sum_i s_i^4+2\sum_{i<j}s_i^2s_j^2
\ge\sum_i s_i^4
$$

から従います。下界 $1/r$ の等号はすべての $s_i^2=1/r$ のとき、上界 $1$ の等号は階数1のときです。正係数だけを数える $r>1$ の場合、上界 $1$ の等号は達成されず、1へ近づけることはできます。Schmidt階数は「積か否か」を区別し、係数の分布は同じ階数内での局所的な混合の度合いも区別します。エントロピーによる定量化は後のQINF17で行います。

## 5. 演習：係数から相関を復元する

<a id="ex-qinf6-a01"></a>
### QINF6-A01 二係数の正規化と純粋性

- Level: A

二qubitの単位ベクトル $|\psi\rangle=(\sqrt3\,|00\rangle+|11\rangle)/2$ について、Schmidt表示の各条件、Schmidt階数、両側縮約の固有値と純粋性 $\operatorname{Tr}(\rho_A^2)$ を求めよ。

<!-- solution-start -->
### 詳細解答

$|0\rangle,|1\rangle$ は両側で正規直交しているので、$u_1=v_1=|0\rangle$、$u_2=v_2=|1\rangle$ と選べます。二係数は正で

$$
s_1=\frac{\sqrt3}{2},\quad s_2=\frac12,\quad
s_1^2+s_2^2=\frac34+\frac14=1.
$$

よって[Schmidt表示の定義](#def-qinf6-schmidt)の直交性・正値性・正規化をすべて満たし、階数は2です。[両側縮約の非零固有値の一致](#thm-qinf6-reduced-spectrum)から

$$
\rho_A=\rho_B=
\begin{pmatrix}3/4&0\\0&1/4\end{pmatrix}.
$$

固有値は $3/4,1/4$、純粋性は

$$
\operatorname{Tr}(\rho_A^2)
=\left(\frac34\right)^2+\left(\frac14\right)^2
=\frac{9+1}{16}=\frac58.
$$

1未満なので局所状態は混合です。
<!-- solution-end -->

<a id="ex-qinf6-a02"></a>
### QINF6-A02 反対称Bell状態

- Level: A

二qubit状態 $|\psi\rangle=(|01\rangle-|10\rangle)/\sqrt2$ のSchmidt表示を一つ与え、Schmidt階数と両側縮約を求めよ。負号がSchmidt係数に残るか説明せよ。

<!-- solution-start -->
### 詳細解答

係数は正でなければならないので、負号を片側のベクトルに移し

$$
|\psi\rangle
=\frac1{\sqrt2}|0\rangle\otimes|1\rangle
+\frac1{\sqrt2}|1\rangle\otimes(-|0\rangle)
$$

と書きます。$A$ 側の $|0\rangle,|1\rangle$ は正規直交で、$B$ 側の $|1\rangle,-|0\rangle$ も長さ1かつ内積0です。二係数は正で二乗和1なので、Schmidt階数は2です。[両側縮約の非零固有値の一致](#thm-qinf6-reduced-spectrum)により

$$
\rho_A=\frac12(|0\rangle\langle0|+|1\rangle\langle1|)
=\frac{I_2}{2},
$$

$$
\rho_B=\frac12(|1\rangle\langle1|+(-|0\rangle)(-\langle0|))
=\frac{I_2}{2}.
$$

負号は状態ベクトルの位相へ吸収され、外積では二つの負号が打ち消されます。Schmidt係数はともに $1/\sqrt2$ のままです。
<!-- solution-end -->

<a id="ex-qinf6-a03"></a>
### QINF6-A03 三準位状態の固有値と純粋性

- Level: A

$H_A=H_B=\mathbb C^3$ の単位ベクトル

$$
|\psi\rangle
=\frac1{\sqrt2}|00\rangle
+\frac1{\sqrt3}|11\rangle
+\frac1{\sqrt6}|22\rangle
$$

についてSchmidt階数と $\operatorname{Tr}(\rho_A^2)$ を求め、$\rho_B$ の固有値も示せ。

<!-- solution-start -->
### 詳細解答

計算基底の三方向は各側で正規直交しています。正係数の二乗和は

$$
\frac12+\frac13+\frac16=1
$$

なので表示は正規化され、Schmidt階数3です。[両側縮約の非零固有値の一致](#thm-qinf6-reduced-spectrum)を用いれば、両側の固有値は $1/2,1/3,1/6$ です。純粋性は

$$
\begin{aligned}
\operatorname{Tr}(\rho_A^2)
&=\left(\frac12\right)^2+
\left(\frac13\right)^2+
\left(\frac16\right)^2\\
&=\frac9{36}+\frac4{36}+\frac1{36}
=\frac7{18}.
\end{aligned}
$$

両側とも三つの正固有値を持つため零固有値はありません。
<!-- solution-end -->

<a id="ex-qinf6-a04"></a>
### QINF6-A04 位相を持つ積状態の係数行列

- Level: A

二qubitの単位ベクトル

$$
|\psi\rangle
=\frac{|0\rangle+i|1\rangle}{\sqrt2}
\otimes\frac{|0\rangle-|1\rangle}{\sqrt2}
$$

を計算基底で展開して係数行列 $C$ を書け。Schmidt階数と縮約状態の行列も求めよ。

<!-- solution-start -->
### 詳細解答

テンソル積を展開すると

$$
|\psi\rangle
=\frac12\bigl(|00\rangle-|01\rangle+i|10\rangle-i|11\rangle\bigr)
$$

なので、行を $A$、列を $B$ の添字として

$$
C=\frac12\begin{pmatrix}1&-1\\i&-i\end{pmatrix}
=\frac1{\sqrt2}\begin{pmatrix}1\\i\end{pmatrix}
\frac1{\sqrt2}\begin{pmatrix}1&-1\end{pmatrix}.
$$

最後は列ベクトルと行ベクトルの積です。二列は互いに $-1$ 倍なのでrankは1、[有限次元Schmidt分解](#thm-qinf6-existence)によりSchmidt階数も1です。[QINF3で導いた係数行列の縮約表示](../QINF3/index.md#eq-qinf3-coefficient-reduction)を使い、二つの行列積を取ると

$$
\rho_A=CC^\dagger
=\frac12\begin{pmatrix}1&-i\\i&1\end{pmatrix},
$$

$$
\rho_B=C^{\mathsf T}\overline C
=\frac12\begin{pmatrix}1&-1\\-1&1\end{pmatrix}.
$$

両方ともrank 1で、積状態と整合します。
<!-- solution-end -->

<a id="ex-qinf6-b01"></a>
### QINF6-B01 複素共役が現れる右側の方向

- Level: B

二qubitの単位ベクトル $|\chi\rangle=(|00\rangle+i|01\rangle)/\sqrt2$ の係数行列 $C$ を作れ。$C^\dagger C$ の正固有値1に対応する単位固有ベクトル $w$ を一つ求め、$B$ 側のSchmidtベクトルが $w$ の成分をそのまま使うのではなく共役する必要があることを確かめよ。さらに $\rho_B$ を直接求めよ。

<!-- solution-start -->
### 詳細解答

定義に従って係数を行列に並べると

$$
C=\frac1{\sqrt2}\begin{pmatrix}1&i\\0&0\end{pmatrix},
\quad
C^\dagger C=\frac12\begin{pmatrix}1&i\\-i&1\end{pmatrix}.
$$

これは階数1、トレース1のHermitian行列なので固有値は1と0です。実際、

$$
w=\frac1{\sqrt2}\begin{pmatrix}1\\-i\end{pmatrix},
\qquad
(C^\dagger C)w
=\frac1{2\sqrt2}
\begin{pmatrix}1+i(-i)\\-i+(-i)\end{pmatrix}
=w.
$$

[Schmidt分解の構成](#thm-qinf6-existence)では $B$ 側の物理的なベクトルに $\overline w$ を用いるので

$$
|v\rangle=\frac{|0\rangle+i|1\rangle}{\sqrt2},
\quad |\chi\rangle=|0\rangle\otimes|v\rangle.
$$

もし共役を外せば $i$ の符号が反転し、元の $|01\rangle$ の係数を再現できません。[QINF3の係数行列公式](../QINF3/index.md#eq-qinf3-coefficient-reduction)で直接計算すると

$$
\rho_B=C^{\mathsf T}\overline C
=\frac12\begin{pmatrix}1&-i\\i&1\end{pmatrix}
=|v\rangle\langle v|.
$$

$C^\dagger C$ の非対角成分は逆符号です。複素共役の位置を区別できたことがポイントです。
<!-- solution-end -->

<a id="ex-qinf6-b02"></a>
### QINF6-B02 二対三系の縮約と零固有値

- Level: B

$H_A=\mathbb C^2$、$H_B=\mathbb C^3$ について単位ベクトル

$$
|\psi\rangle=\frac{|00\rangle+|01\rangle+\sqrt2|12\rangle}{2}
$$

を考える。正規直交するSchmidtベクトルを具体的に構成し、$\rho_A,\rho_B$ を計算して、非零固有値と零固有値の個数を確認せよ。

<!-- solution-start -->
### 詳細解答

$A$ 側で $|0\rangle$ に対応する $B$ のベクトルは $(|0\rangle+|1\rangle)/2$ で長さ $1/\sqrt2$ です。$|1\rangle$ に対応するのは $|2\rangle/\sqrt2$ で、前者と直交しています。したがって

$$
u_1=|0\rangle,\quad u_2=|1\rangle,\quad
v_1=\frac{|0\rangle+|1\rangle}{\sqrt2},\quad v_2=|2\rangle,
$$

$$
|\psi\rangle=\frac1{\sqrt2}u_1\otimes v_1
+\frac1{\sqrt2}u_2\otimes v_2.
$$

両側で直交・単位長、係数二乗和も1なので正しいSchmidt表示です。[両側縮約の非零固有値の一致](#thm-qinf6-reduced-spectrum)から

$$
\rho_A=\frac12 I_2
$$

および

$$
\begin{aligned}
\rho_B
&=\frac12|v_1\rangle\langle v_1|+\frac12|2\rangle\langle2|\\
&=\begin{pmatrix}
1/4&1/4&0\\
1/4&1/4&0\\
0&0&1/2
\end{pmatrix}.
\end{aligned}
$$

$v_1$ と $|2\rangle$ の固有値は各 $1/2$、直交する $(|0\rangle-|1\rangle)/\sqrt2$ の固有値は0です。従って $\rho_A$ は固有値 $1/2,1/2$、$\rho_B$ は $1/2,1/2,0$ となり、非零固有値が一致し、零の個数はそれぞれ0と1です。
<!-- solution-end -->

<a id="ex-qinf6-b03"></a>
### QINF6-B03 局所ユニタリで状態を対応づける

- Level: B

$|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$、$|-\rangle=(|0\rangle-|1\rangle)/\sqrt2$ とし、

$$
|\psi\rangle=\frac{\sqrt3}{2}|00\rangle+\frac i2|11\rangle,
\qquad
|\phi\rangle=\frac{\sqrt3}{2}|++\rangle+\frac12|--\rangle
$$

を考える。両者のSchmidt係数を確かめ、$W_A\otimes W_B$ によって $\psi$ を $\phi$ へ写す局所ユニタリを具体的に求めよ。また $|\eta\rangle=|00\rangle/\sqrt2+|11\rangle/\sqrt2$ を $\psi$ へ局所ユニタリで写せるか判定せよ。

<!-- solution-start -->
### 詳細解答

$\psi$ の第二の $A$ 側ベクトルを $i|1\rangle$ と取れば、両側の正規直交性が保たれ係数は $\sqrt3/2,1/2$ です。$\phi$ は $|+\rangle,|-\rangle$ を両側の正規直交系に持つので、同じ二係数です。

Hadamard作用素 $H$ を $H|0\rangle=|+\rangle$、$H|1\rangle=|-\rangle$ と定め、$D=\operatorname{diag}(1,-i)$ とします。$H^\dagger H=I$、$D^\dagger D=I$ なので $W_A=H$、$W_B=HD$ はユニタリです。各積ベクトルで作用させると

$$
(H\otimes HD)|00\rangle=|++\rangle,
$$

$$
(H\otimes HD)|11\rangle
=|-\rangle\otimes(-i|-\rangle)
=-i|--\rangle.
$$

したがって

$$
(H\otimes HD)|\psi\rangle
=\frac{\sqrt3}{2}|++\rangle+\frac i2(-i)|--\rangle
=|\phi\rangle.
$$

一方、$\eta$ のSchmidt係数は $1/\sqrt2,1/\sqrt2$ で、$\psi$ の $\sqrt3/2,1/2$ と一致しません。[局所ユニタリ不変性](#prop-qinf6-local-unitary)から $\eta$ を $\psi$ へ局所ユニタリで写すことはできません。
<!-- solution-end -->

<a id="ex-qinf6-b04"></a>
### QINF6-B04 重複する係数のSchmidt基底

- Level: B

$|\Phi^+\rangle=(|00\rangle+|11\rangle)/\sqrt2$ について、次の二組を確認せよ。

1. 計算基底 $\{|0\rangle,|1\rangle\}$ と、$|\pm\rangle=(|0\rangle\pm|1\rangle)/\sqrt2$ を使う基底の両方がSchmidt表示を与えること。
2. $|u_\pm\rangle=(|0\rangle\pm i|1\rangle)/\sqrt2$ を $A$ 側に選ぶとき、$B$ 側にどの組を選べば同じSchmidt表示になるか。

<!-- solution-start -->
### 詳細解答

計算基底のSchmidt表示は問題の式そのものです。$|\pm\rangle$ は互いに直交して長さ1であり、

$$
|++\rangle+|--\rangle
=\frac12\bigl(2|00\rangle+2|11\rangle\bigr)
=|00\rangle+|11\rangle
$$

です。従って二係数 $1/\sqrt2,1/\sqrt2$ を持つ第二のSchmidt表示です。

複素基底では $B$ 側の各ベクトルを成分ごとに共役した

$$
|v_\pm\rangle=\frac{|0\rangle\mp i|1\rangle}{\sqrt2}
$$

と取ります。$u_+,u_-$ および $v_+,v_-$ はそれぞれ正規直交です。実際に二つの積を展開すると

$$
\begin{aligned}
u_+\otimes v_+
&=\tfrac12(|00\rangle-i|01\rangle+i|10\rangle+|11\rangle),\\
u_-\otimes v_-
&=\tfrac12(|00\rangle+i|01\rangle-i|10\rangle+|11\rangle).
\end{aligned}
$$

交差項が相殺され、和は $|00\rangle+|11\rangle$ です。両方の係数が等しいとき、基底の選択は無数にあっても正の係数の多重集合だけは変わりません。
<!-- solution-end -->

<a id="ex-qinf6-c01"></a>
### QINF6-C01 非対角係数行列から二つの局所状態へ

- Level: C

二qubitの単位ベクトル

$$
|\psi\rangle=\frac1{\sqrt2}|00\rangle+\frac12|01\rangle+\frac12|11\rangle
$$

について、次を示せ。

1. 係数行列 $C$ と縮約状態 $\rho_A,\rho_B$ を計算する。
2. 両縮約の固有値 $\lambda_\pm$ を求め、$\rho_B$ の正規直交固有ベクトル $v_\pm$ を構成する。
3. $u_\pm=C\,\overline{v_\pm}/\sqrt{\lambda_\pm}$ を成分で計算し、両側の正規直交性とSchmidt表示を検証する。
4. Schmidt階数、両側の純粋性、計算基底測定で $A=0$ と $B=0$ を得る確率を求める。さらに局所ユニタリでBell状態へ変換できるか判定する。

<!-- solution-start -->
### 詳細解答

**1. 係数行列と縮約。** $A$ 添字を行、$B$ 添字を列として

$$
C=\begin{pmatrix}
1/\sqrt2&1/2\\
0&1/2
\end{pmatrix}.
$$

$C$ は実行列です。[QINF3の係数行列公式](../QINF3/index.md#eq-qinf3-coefficient-reduction)でそれぞれ掛けると

$$
\begin{aligned}
\rho_A=CC^\dagger
&=\begin{pmatrix}
1/2+1/4&1/4\\
1/4&1/4
\end{pmatrix}
=\begin{pmatrix}3/4&1/4\\1/4&1/4\end{pmatrix},\\
\rho_B=C^{\mathsf T}\overline C
&=\begin{pmatrix}
1/2&1/(2\sqrt2)\\
1/(2\sqrt2)&1/4+1/4
\end{pmatrix}
=\begin{pmatrix}1/2&1/(2\sqrt2)\\1/(2\sqrt2)&1/2\end{pmatrix}.
\end{aligned}
$$

両行列はHermitianです。成分からトレースと行列式を計算すると

$$
\operatorname{Tr}\rho_A=\operatorname{Tr}\rho_B=1,\qquad
\det\rho_A=\frac3{16}-\frac1{16}=\frac18,\qquad
\det\rho_B=\frac14-\frac18=\frac18.
$$

正定値性は、このあと求める二つの固有値がともに正になることから確認します。

**2. 固有値と $B$ 側の基底。** $\rho_B$ の特性方程式を直接展開します。

$$
\begin{aligned}
0&=\det(\rho_B-\lambda I_2)\\
&=(1/2-\lambda)^2-\frac18\\
&=\lambda^2-\lambda+\frac18.
\end{aligned}
$$

従って二固有値は

$$
\lambda_\pm=\frac{1\pm1/\sqrt2}{2}>0.
$$

$\rho_B$ の対角成分が等しく非対角成分が正なので、

$$
v_+=\frac1{\sqrt2}\begin{pmatrix}1\\1\end{pmatrix},
\qquad
v_-=\frac1{\sqrt2}\begin{pmatrix}1\\-1\end{pmatrix}
$$

について直接

$$
\rho_Bv_\pm
=\left(\frac12\pm\frac1{2\sqrt2}\right)v_\pm
=\lambda_\pm v_\pm
$$

となります。両者の内積は0、長さは1です。

**3. Schmidtベクトルの構成。** この問題では $v_\pm$ が実なので $\overline{v_\pm}=v_\pm$ です。係数行列を掛けると

$$
\begin{aligned}
Cv_+
&=\begin{pmatrix}
1/2+1/(2\sqrt2)\\
1/(2\sqrt2)
\end{pmatrix}
=:a_+,\\
Cv_-
&=\begin{pmatrix}
1/2-1/(2\sqrt2)\\
-1/(2\sqrt2)
\end{pmatrix}
=:a_-.
\end{aligned}
$$

内積を成分から計算して

$$
\begin{aligned}
\|a_\pm\|^2
&=\left(\frac12\pm\frac1{2\sqrt2}\right)^2+\frac18\\
&=\frac14\pm\frac1{2\sqrt2}+\frac18+\frac18
=\lambda_\pm,\\
\langle a_+|a_-\rangle
&=\left(\frac12+\frac1{2\sqrt2}\right)
\left(\frac12-\frac1{2\sqrt2}\right)-\frac18\\
&=\frac14-\frac18-\frac18=0.
\end{aligned}
$$

従って $u_\pm=a_\pm/\sqrt{\lambda_\pm}$ は正規直交します。各 $v_\pm$ は実の正規直交基底なので、行列表現で

$$
C=\sum_{\epsilon\in\{+,-\}}Cv_\epsilon v_\epsilon^{\mathsf T}
=\sum_{\epsilon\in\{+,-\}}\sqrt{\lambda_\epsilon}
\,u_\epsilon v_\epsilon^{\mathsf T}.
$$

係数比較により

$$
|\psi\rangle
=\sqrt{\lambda_+}\,|u_+\rangle\otimes|v_+\rangle
+\sqrt{\lambda_-}\,|u_-\rangle\otimes|v_-\rangle
$$

が成立します。係数は正で $\lambda_++\lambda_-=1$ ですからSchmidt表示の全条件を満たします。

**4. 階数・純粋性・測定・局所操作。** $\lambda_->0$ なのでSchmidt階数2、[積状態判定](#prop-qinf6-product)からエンタングル純粋状態です。純粋性は

$$
\begin{aligned}
\operatorname{Tr}(\rho_A^2)
&=\lambda_+^2+\lambda_-^2\\
&=(\lambda_++\lambda_-)^2-2\lambda_+\lambda_-\\
&=1-2\cdot\frac18=\frac34,
\end{aligned}
$$

で、同じ値が $\rho_B$ にも成立します。[QINF3の局所測定の周辺確率](../QINF3/index.md#prop-qinf3-local-born)により計算基底で0を測る確率は、それぞれ密度行列の $(0,0)$ 成分です。

$$
P(A=0)=\langle0|\rho_A|0\rangle=\frac34,
\qquad
P(B=0)=\langle0|\rho_B|0\rangle=\frac12.
$$

Bell状態のSchmidt係数はともに $1/\sqrt2$ ですが、ここでは $\lambda_+\ne\lambda_-$ です。[局所ユニタリの不変性](#prop-qinf6-local-unitary)から局所ユニタリだけではBell状態へ変換できません。
<!-- solution-end -->

## 6. 次へつながる見取り図

二部純粋状態は、両側で正規直交する同数の方向と、合計1に正規化された正の係数で記述できました。係数を一つだけ持てば積状態、複数持てばエンタングル純粋状態です。二つの縮約状態の非零固有値は必ず一致する一方、零固有値の個数は局所次元で変わります。

同じSchmidt係数を持つ純粋状態どうしは局所ユニタリで対応づけられます。しかし一般の量子操作には、状態を環境と相互作用させたり、測定結果を記録したりするものもあります。次のQINF7では、そのような操作を量子チャネルとして扱います。

