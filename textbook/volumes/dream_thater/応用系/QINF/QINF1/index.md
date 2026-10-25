# QINF1 複合系とテンソル積

[QM2の純粋状態](../../../解析系/QM/QM2/index.md#def-qm2-normalized-pure-state)と[Born則](../../../解析系/QM/QM2/index.md#axiom-qm2-born-rule)では、一つの量子系の状態を単位ベクトルで表し、測定結果の確率を計算しました。そこでまず、量子情報で繰り返し使う最小の系に名前を付けます。

QM1で扱った二準位の模型を、量子情報でも繰り返し使います。ここで呼び方と基底を固定しましょう。

<a id="def-qinf1-qubit"></a>

<!-- formal-statement-start -->
> **定義（量子ビットと計算基底）**  
> 状態空間が二次元複素Hilbert空間 $H=\mathbb C^2$ である量子系を**量子ビット（qubit）**という。その正規直交基底を
>
> $|0\rangle=(1,0)^{\mathsf T}$、$|1\rangle=(0,1)^{\mathsf T}$
>
> と選んだとき、この基底を**計算基底**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf1-qubit -->
### 定義の確認：計算基底と重ね合わせ

実際に定義中の二本を $\mathbb C^2$ の通常の内積で調べると、$\langle0|0\rangle=\langle1|1\rangle=1$、$\langle0|1\rangle=0$ なので正規直交基底です。この基底で純粋状態の単位ベクトル代表を展開すると

$$
|\psi\rangle=\alpha|0\rangle+\beta|1\rangle,
\qquad \alpha,\beta\in\mathbb C,\qquad
|\alpha|^2+|\beta|^2=1
$$

と書けます。基底の直交性から交差項が消え、ノルムの二乗が $|\alpha|^2+|\beta|^2$ になるからです。例えば $(|0\rangle+|1\rangle)/\sqrt2$ は $1/2+1/2=1$ を満たす純粋状態です。古典ビットの0・1に対応する基底ベクトルだけでなく、その重ね合わせまで表せることがqubitの要点です。
<!-- definition-example-end -->

二つのqubitを一緒に記述するなら、各系の計算基底のラベルには $(0,0),(0,1),(1,0),(1,1)$ の四通りの組があります。直和 $H_A\oplus H_B$ も二つのベクトルの組 $(u,v)$ を表せますが、単に並べるだけでは、独立に準備した状態の積や各系だけへの操作をどう表すかは決まりません。さらに、複合系の全ての純粋状態が単一の状態ベクトルの積に分かれるとも限りません。

そこで本章では、既習の[テンソル積](../../../基礎科目/LA/LA3E/index.md#def-la3e-tensor-product)を量子状態空間へ適用します。どの順序で基底を並べるか、長さと確率がどう保存されるか、片方だけの操作がもう片方の操作と交換するのはなぜかを、二qubitで検算できる形まで進めます。混合状態・部分トレース・Schmidt分解は後の章で扱います。ここでは**有限次元の純粋状態と射影測定**に限ります。

## 1. 二つの量子系を一緒に記述する

一つ目の系を $A$、二つ目を $B$ と呼び、その[複素Hilbert空間](../../../解析系/QM/QM1/index.md#def-qm1-complex-hilbert-space)を有限次元に限って $H_A,H_B$ とします。$A$ の基底が $e_0,e_1$、$B$ の基底が $f_0,f_1$ なら、同時に識別できる基底候補は四通りです。

$$
e_0\otimes f_0,\quad e_0\otimes f_1,\quad
e_1\otimes f_0,\quad e_1\otimes f_1.
$$

[LA3Eの有限次元テンソル積の存在と基底](../../../基礎科目/LA/LA3E/index.md#thm-la3e-tensor-product-existence-basis)によれば、これらを独立な基底として収める空間が存在します。量子系ではその空間へ自然な内積も入れる必要があります。

<a id="def-qinf1-composite"></a>

<!-- formal-statement-start -->
> **定義（有限次元複合量子系）**  
> 有限次元複素Hilbert空間 $H_A,H_B$ を持つ二部量子系の合成状態空間を

$$
H_{AB}:=H_A\otimes_{\mathbb C}H_B
$$

> とする。単純テンソル上の内積を

$$
\langle u\otimes v,u'\otimes v'\rangle_{AB}
:=\langle u,u'\rangle_A\,\langle v,v'\rangle_B
$$

> と定め、第一変数について共役線形、第二変数について線形に拡張する。純粋状態は $H_{AB}$ の単位ベクトルで表し、全体位相だけ異なる代表は同じ物理状態とみなす。テンソル積の順序は $A$、次に $B$ と固定する。
<!-- formal-statement-end -->

ここで記号 $u\otimes v$ は、[LA3Eで定義した単純テンソル](../../../基礎科目/LA/LA3E/index.md#def-la3e-simple-tensor)です。「個別の列ベクトルを縦に連結したもの」ではありません。内積が本当に正定値になることを積基底で証明します。内積の共役をどちらへ置くかは[LA5の複素内積](../../../基礎科目/LA/LA5/index.md#def-la5-complex-inner-product)に従います。

<a id="thm-qinf1-product-basis"></a>

<!-- formal-statement-start -->
> **定理（積基底と複合系の内積）**  
> $H_A,H_B$ の正規直交基底をそれぞれ $(e_i)_{i=0}^{d_A-1}$、$(f_j)_{j=0}^{d_B-1}$ とする。複合系では $(e_i\otimes f_j)_{i,j}$ が正規直交基底をなし、各 $i$ について $j$ を先に走らせる順序で

$$
\dim H_{AB}=d_A d_B,\qquad
\left\|\sum_{i,j}c_{ij}e_i\otimes f_j\right\|^2
=\sum_{i,j}|c_{ij}|^2.
$$

> またすべての $u\in H_A,v\in H_B$ について $\|u\otimes v\|=\|u\|\,\|v\|$ が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

最初に積基底の内積を計算するとKroneckerのデルタが二つ現れます。一般のベクトルをその基底で展開すると、異なる添字の交差項が消え、係数の絶対値二乗和だけが残ります。基底が空間全体を張る部分は[テンソル積の基底定理](../../../基礎科目/LA/LA3E/index.md#thm-la3e-tensor-product-existence-basis)を使います。

<!-- proof-start -->
### 証明

まず基底ベクトルに[有限次元複合量子系の定義](#def-qinf1-composite)で与えた内積を適用すると

$$
\begin{aligned}
\langle e_i\otimes f_j,e_k\otimes f_\ell\rangle
&=\langle e_i,e_k\rangle_A\langle f_j,f_\ell\rangle_B\\
&=\delta_{ik}\delta_{j\ell}
\end{aligned}
$$

です。従って積ベクトルは互いに直交し、長さ1です。[LA3Eの基底定理](../../../基礎科目/LA/LA3E/index.md#thm-la3e-tensor-product-existence-basis)に $V=H_A,W=H_B$ と各基底を代入すると、これら $d_A d_B$ 個が全空間を張ります。

$x=\sum_{i,j}c_{ij}e_i\otimes f_j$ と置き、内積の線形性・共役線形性を展開すると

$$
\begin{aligned}
\langle x,x\rangle
&=\sum_{i,j,k,\ell}\overline{c_{ij}}c_{k\ell}
 \langle e_i\otimes f_j,e_k\otimes f_\ell\rangle\\
&=\sum_{i,j,k,\ell}\overline{c_{ij}}c_{k\ell}\delta_{ik}\delta_{j\ell}\\
&=\sum_{i,j}|c_{ij}|^2.
\end{aligned}
$$

非零ベクトルならいずれかの係数が非零であり、右辺は正です。よって定義したものは確かに正定値内積です。最後に単純テンソルについて

$$
\|u\otimes v\|^2
=\langle u,u\rangle_A\langle v,v\rangle_B
=\|u\|^2\|v\|^2
$$

となります。両辺の非負平方根を取ればノルムの積の式が従います。
<!-- proof-end -->

<!-- definition-example-start: def-qinf1-composite -->
### 定義の確認：二qubitで四次元になる

**定義の確認**：積基底の順序と内積から四つの直交する単位ベクトルを列挙し、一般状態の係数二乗和が1になる条件まで確認します。

二つとも $H=\mathbb C^2$ とし、基底を $|0\rangle=(1,0)^{\mathsf T}$、$|1\rangle=(0,1)^{\mathsf T}$ と書きます。記号 $|ij\rangle$ は $|i\rangle\otimes|j\rangle$ の略記です。$A$ を先に並べる積基底では

$$
|00\rangle=\begin{pmatrix}1\\0\\0\\0\end{pmatrix},\quad
|01\rangle=\begin{pmatrix}0\\1\\0\\0\end{pmatrix},\quad
|10\rangle=\begin{pmatrix}0\\0\\1\\0\end{pmatrix},\quad
|11\rangle=\begin{pmatrix}0\\0\\0\\1\end{pmatrix}.
$$

四本は正規直交し、[積基底定理](#thm-qinf1-product-basis)による次元は $2\cdot2=4$ です。例えば $\psi=(|00\rangle+i|11\rangle)/\sqrt2$ は、係数二つの絶対値二乗の和 $1/2+1/2=1$ により単位ベクトルです。また $e^{i\theta}\psi$ は任意の実数 $\theta$ について同じ長さを持ち、[純粋状態のrayによる同一視](../../../解析系/QM/QM2/index.md#def-qm2-normalized-pure-state)により同一の物理状態を表します。
<!-- definition-example-end -->

一般の状態は $\sum_{ij}c_{ij}|ij\rangle$ と書けますが、全てが一つの $u\otimes v$ に分かれるわけではありません。この違いが量子情報の出発点です。

## 2. 積状態とBell状態の決定的な違い

二つの系それぞれに状態が指定されているだけなら、合成系はその二つのベクトルの積で書けます。しかし量子系全体の単位ベクトルには、そう書けないものがあります。後者を先に具体式で見ると、その判定条件が必要な理由が分かります。

<a id="def-qinf1-product-entangled"></a>

<!-- formal-statement-start -->
> **定義（積状態とエンタングル純粋状態）**  
> $H_A\otimes H_B$ の単位ベクトル $\psi$ が、各因子の単位ベクトル $a\in H_A,b\in H_B$ により

$$
\psi=a\otimes b
$$

> と書けるとき**積状態**という。全体位相の違いは同一視する。どのような単位ベクトル $a,b$ を選んでも積状態に書けない純粋状態を**エンタングル純粋状態**という。
<!-- formal-statement-end -->

積基底 $|ij\rangle$ で $\psi=\sum_{i,j=0}^1c_{ij}|ij\rangle$ と展開したとき、四つの振幅を係数行列 $C=(c_{ij})$ に整理します。行を $A$ 側の添字 $i$、列を $B$ 側の添字 $j$ に対応させるので、これは作用素の行列表示とは異なります。もし $a=\sum_i a_i|i\rangle$、$b=\sum_j b_j|j\rangle$ の積状態なら、[テンソル積の双線形性](../../../基礎科目/LA/LA3E/index.md#def-la3e-tensor-product)から

$$
a\otimes b=\sum_{i,j=0}^1 a_i b_j|ij\rangle,\qquad
C=\begin{pmatrix}a_0\\a_1\end{pmatrix}
  \begin{pmatrix}b_0&b_1\end{pmatrix}.
$$

従って積状態なら $c_{00}c_{11}=c_{01}c_{10}$ で、$\det C=0$ が**必要**です。逆向きも成立することを次の命題で証明します。この順に見ると、行列式は定義に付け加えた別条件ではなく、積への因数分解可能性を調べる座標上の道具だと分かります。

<!-- definition-example-start: def-qinf1-product-entangled -->
### 定義の確認：一つの積と二つの積の和

**定義の確認**：まず単位ベクトル二つの積を実際に構成し、次にその形で書けない単位ベクトルを係数行列で判定します。

まず $|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$ と置きます。$|0\rangle,|1\rangle$ の正規直交性から

$$
\lVert |+\rangle\rVert^2=\frac12+\frac12=1,\qquad
\lVert |0\rangle\rVert=1
$$

です。従って[積ノルム公式](#thm-qinf1-product-basis)により、

$$
|+\rangle\otimes|0\rangle
=\frac{|00\rangle+|10\rangle}{\sqrt2}
$$

は、表示そのものが単位ベクトル二つのテンソル積なので積状態です。一方、次の正規化状態を考えます。

$$
|\Phi^+\rangle:=\frac{|00\rangle+|11\rangle}{\sqrt2}.
$$

これはBell状態の一つです。積基底での係数行列は

$$
C_{\Phi^+}=
\begin{pmatrix}
1/\sqrt2&0\\
0&1/\sqrt2
\end{pmatrix}
$$

で、行列式は $1/2\ne0$ です。先ほど積状態なら $\det C=0$ と確かめたので、これは積状態ではありません。さらに次の[係数判定](#prop-qinf1-product-criterion)で、この必要条件が十分でもあることを示します。単に「二項の和だから」ではなく、**一個の積へ因数分解できない**ことが理由です。
<!-- definition-example-end -->

<a id="prop-qinf1-product-criterion"></a>

<!-- formal-statement-start -->
> **命題（二qubit積状態の係数判定）**  
> $\psi=\sum_{i,j=0}^1c_{ij}|ij\rangle$ を $\mathbb C^2\otimes\mathbb C^2$ の単位ベクトルとし、$C=(c_{ij})_{i,j=0}^1$ と置く。$\psi$ が積状態であるための必要十分条件は

$$
\det C=c_{00}c_{11}-c_{01}c_{10}=0
$$

> である。すなわち非零の $C$ の階数が1であることと同値である。
<!-- formal-statement-end -->

### 証明の見取り図

積なら各係数が「$A$ 側の係数×$B$ 側の係数」になります。逆に行列式が0の非零二行二列行列は列が一次元に並ぶため、係数を二つのベクトルに分けられます。最後に単位ベクトルへ正規化します。

<!-- proof-start -->
### 証明

積状態 $\psi=a\otimes b$ の場合、$a=a_0|0\rangle+a_1|1\rangle$、$b=b_0|0\rangle+b_1|1\rangle$ と展開すると、双線形性から

$$
\psi=\sum_{i,j=0}^1a_i b_j|ij\rangle,\qquad
C=\begin{pmatrix}a_0\\a_1\end{pmatrix}
  \begin{pmatrix}b_0&b_1\end{pmatrix}.
$$

従って $\det C=a_0b_0a_1b_1-a_0b_1a_1b_0=0$ です。

逆に $\det C=0$ とします。$\psi$ は単位ベクトルなので $C\ne0$ です。非零の列を選び、第0列が非零なら次のベクトルを置きます。

$$
u=\begin{pmatrix}c_{00}\\c_{10}\end{pmatrix}\ne0.
$$

行列式0のため第1列は第0列のスカラー倍 $\lambda u$ です。例えば $c_{00}\ne0$ なら $\lambda=c_{01}/c_{00}$ として $c_{11}=\lambda c_{10}$ です。$c_{00}=0$ なら $c_{10}\ne0$ で、$\lambda=c_{11}/c_{10}$ と置きます。この場合も行列式0から $c_{01}=0$ が従います。よって

$$
C=u\begin{pmatrix}1&\lambda\end{pmatrix},\qquad
\psi=u\otimes (|0\rangle+\lambda|1\rangle).
$$

ここでは列座標 $u$ を $H_A$ のベクトルと同一視しました。第0列が零なら、第1列を $u$ と取り、$b=|1\rangle$ とするだけです。いずれの場合も $\psi=u\otimes b$ と分解できます。

[積基底と複合系の内積](#thm-qinf1-product-basis)で証明したノルムの積の式から $\|u\|\|b\|=\|\psi\|=1$ です。そこで $a=u/\|u\|$、$b'=b/\|b\|$ とすれば

$$
a\otimes b'=\frac{u\otimes b}{\|u\|\|b\|}=\psi
$$

となり、両因子は単位ベクトルです。
<!-- proof-end -->

行列式は「どんな局所基底でも不変な数値」ではありません。基底を変えると値に位相因子が掛かることがありますが、**零かどうか**は積状態か否かという基底によらない性質を表します。ここでは二qubitに限った直接計算法を使いました。一般次元での構造的な分解はQINF6で学びます。

## 3. 片方だけを操作するとき

二つの系が離れていても、$A$ にだけ行列 $S$、$B$ にだけ行列 $T$ を作用させることはできます。列ベクトルの順序を固定しておけば、テンソル積による行列作用は単純テンソルでまず定められ、一般状態には線形に拡張されます。

<a id="def-qinf1-local-operator"></a>

<!-- formal-statement-start -->
> **定義（局所作用素）**  
> $S:H_A\to H_A$、$T:H_B\to H_B$ を線形作用素とする。$A$ 側の局所作用素を $S\otimes I_B$、$B$ 側を $I_A\otimes T$ と定め、その作用を

$$
(S\otimes I_B)(u\otimes v)=Su\otimes v,\qquad
(I_A\otimes T)(u\otimes v)=u\otimes Tv
$$

> として線形に延長する。両方を操作する作用素 $S\otimes T$ は

$$
(S\otimes T)(u\otimes v):=Su\otimes Tv
$$

> を線形に延長して定める。
<!-- formal-statement-end -->

右辺の $(u,v)\mapsto Su\otimes Tv$ はそれぞれの変数について線形です。[テンソル積の普遍性](../../../基礎科目/LA/LA3E/index.md#def-la3e-tensor-product)によって、それに対応する線形写像 $H_A\otimes H_B\to H_A\otimes H_B$ が存在し、一意に定まります。片側だけの作用も同じ理由で定義できます。

<!-- definition-example-start: def-qinf1-local-operator -->
### 定義の確認：左のqubitだけを反転する

**定義の確認**：左・右の局所作用素が、それぞれ他方の因子を変えずに線形作用することを積基底に代入して調べます。

$X|0\rangle=|1\rangle$、$X|1\rangle=|0\rangle$ とする行列 $X=\begin{pmatrix}0&1\\1&0\end{pmatrix}$ を考えます。積基底で

$$
(X\otimes I)|01\rangle=|11\rangle,\qquad
(I\otimes X)|01\rangle=|00\rangle.
$$

前者は左のビットだけ、後者は右のビットだけが変わりました。また $(X\otimes I)|\Phi^+\rangle=(|10\rangle+|01\rangle)/\sqrt2$ です。最後の式はBell状態がそもそも単純テンソルでなくても、各項へ線形に作用できることを確認しています。
<!-- definition-example-end -->

<a id="prop-qinf1-local-algebra"></a>

<!-- formal-statement-start -->
> **命題（局所作用素の交換・随伴・ユニタリ性）**  
> 有限次元複素Hilbert空間 $H_A,H_B$ 上の線形作用素 $S,S'$ と $T,T'$ に対して

$$
(S\otimes T)(S'\otimes T')=SS'\otimes TT',\qquad
(S\otimes T)^*=S^*\otimes T^*.
$$

> 特に $(S\otimes I)(I\otimes T)=(I\otimes T)(S\otimes I)$ である。$U,V$ が各空間のユニタリ作用素なら $U\otimes V$ もユニタリである。
<!-- formal-statement-end -->

### 証明の見取り図

両辺を同じ積ベクトルに作用させます。これらが基底を張るため、その上での一致は全空間での一致になります。随伴では[積内積の定義](#def-qinf1-composite)を使って内積の左右へ作用素を移します。

<!-- proof-start -->
### 証明

任意の $u\otimes v$ に対して

$$
\begin{aligned}
(S\otimes T)(S'\otimes T')(u\otimes v)
&=(S\otimes T)(S'u\otimes T'v)\\
&=SS'u\otimes TT'v\\
&=(SS'\otimes TT')(u\otimes v).
\end{aligned}
$$

[積基底定理](#thm-qinf1-product-basis)で単純テンソルが全空間を張るので、作用素として等しいです。次に任意の $u,u',v,v'$ について

$$
\begin{aligned}
\langle (S\otimes T)(u\otimes v),u'\otimes v'\rangle
&=\langle Su,u'\rangle_A\langle Tv,v'\rangle_B\\
&=\langle u,S^*u'\rangle_A\langle v,T^*v'\rangle_B\\
&=\langle u\otimes v,(S^*\otimes T^*)(u'\otimes v')\rangle.
\end{aligned}
$$

この等式では[有限次元随伴の定義](../../../基礎科目/LA/LA5/index.md#def-la5-adjoint)を各因子に適用しました。積基底上の一致を、内積の第一変数の共役線形性と第二変数の線形性によって一般ベクトルへ拡張すれば随伴の式が従います。積の公式に $S'=I,T=I$ をそれぞれ代入すると、どちらの作用順でも $S\otimes T$ です。最後に[ユニタリ作用素の定義](../../../基礎科目/LA/LA5/index.md#def-la5-unitary)である $U^*U=UU^*=I_A$、$V^*V=VV^*=I_B$ を代入し、

$$
(U\otimes V)^*(U\otimes V)
=U^*U\otimes V^*V=I_A\otimes I_B
$$

を得ます。逆順も $UU^*\otimes VV^*=I_A\otimes I_B$ なので、ユニタリです。
<!-- proof-end -->

**注意**：異なる系への局所作用素は交換しますが、同じ系に作用する $S\otimes I$ と $S'\otimes I$ は一般に交換しません。また、Bell状態に $X\otimes I$ を作用させることができても、その操作だけでBell状態を最初から作れたことにはなりません。

## 4. 二つの系を測ると、確率はどうなるか

[QM2の有限次元Born則](../../../解析系/QM/QM2/index.md#axiom-qm2-born-rule)では直交射影 $P$ の結果が得られる確率を $\|P\psi\|^2$ としました。[QM2の射影測定](../../../解析系/QM/QM2/index.md#def-qm2-projective-measurement)で扱った、互いに直交し総和が恒等作用素となる射影族を各系に用います。二つのqubitを別々の測定器で測るときも、全系への一つの射影として扱えばよいはずです。ただし「両方を測った確率」と「片方だけの確率」を混同しないことが重要です。

<a id="def-qinf1-local-projective"></a>

<!-- formal-statement-start -->
> **定義（二部系の局所射影測定）**  
> $H_A,H_B$ は有限次元複素Hilbert空間とする。$A$ 上の有限個の互いに直交する直交射影 $(P_i)_i$ と、$B$ 上の同様の $(Q_j)_j$ が

$$
\sum_iP_i=I_A,\qquad \sum_jQ_j=I_B
$$

> を満たすとする。二部系の局所射影測定の同時結果 $(i,j)$ に対応する射影を $R_{ij}:=P_i\otimes Q_j$ とする。単位状態 $\psi\in H_A\otimes H_B$ での同時確率を

$$
p(i,j):=\|(P_i\otimes Q_j)\psi\|^2
$$

> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf1-local-projective -->
### 定義の確認：計算基底でのBell対

**定義の確認**：射影の自己共役性・冪等性・直交性・完全性を各行列で確かめた上で、Bell対に作用させます。

$P_0=|0\rangle\langle0|=\operatorname{diag}(1,0)$、$P_1=|1\rangle\langle1|=\operatorname{diag}(0,1)$ とし、$B$ でも $Q_0=P_0,Q_1=P_1$ とします。各射影は自己共役・冪等で、$P_0P_1=0$、$P_0+P_1=I$ なので定義の全条件を満たします。

Bell状態 $\Phi^+=(|00\rangle+|11\rangle)/\sqrt2$ に作用させると

$$
\begin{aligned}
R_{00}\Phi^+&=|00\rangle/\sqrt2,&
R_{11}\Phi^+&=|11\rangle/\sqrt2,\\
R_{01}\Phi^+&=0,&
R_{10}\Phi^+&=0.
\end{aligned}
$$

よって $p(0,0)=p(1,1)=1/2$、$p(0,1)=p(1,0)=0$ です。左右各々は0も1も半々ですが、組で測ると必ず一致します。
<!-- definition-example-end -->

<a id="prop-qinf1-joint-born"></a>

<!-- formal-statement-start -->
> **命題（局所射影測定の確率と正規化）**  
> [局所射影測定](#def-qinf1-local-projective)の条件の下で、$(R_{ij})_{i,j}$ は全空間の直交射影分解である。従って $p(i,j)\ge0$、$\sum_{i,j}p(i,j)=1$ であり、$A$ の結果 $i$ だけを見る周辺確率は

$$
\sum_jp(i,j)=\|(P_i\otimes I_B)\psi\|^2.
$$

> 特に $\psi=a\otimes b$ が積状態なら

$$
p(i,j)=\|P_i a\|^2\,\|Q_j b\|^2.
$$
<!-- formal-statement-end -->

### 証明の見取り図

先ほどの[局所作用素の積の公式](#prop-qinf1-local-algebra)を射影に適用すると、異なる結果の積は零になり、全部足すと恒等作用素になります。周辺確率の式では、$P_i\otimes I$ に射影されたベクトルを、右系の互いに直交する部分に分解します。

<!-- proof-start -->
### 証明

射影は自己共役かつ冪等なので、[局所作用素の交換・随伴・ユニタリ性](#prop-qinf1-local-algebra)で証明した積と随伴の式を使うと

$$
R_{ij}^*=P_i^*\otimes Q_j^*=R_{ij},\qquad
R_{ij}^2=P_i^2\otimes Q_j^2=R_{ij}
$$

です。$(i,j)\ne(k,\ell)$ なら $P_iP_k=0$ または $Q_jQ_\ell=0$ ですから

$$
R_{ij}R_{k\ell}=(P_iP_k)\otimes(Q_jQ_\ell)=0.
$$

さらに双線形性から

$$
\sum_{i,j}R_{ij}
=\left(\sum_iP_i\right)\otimes\left(\sum_jQ_j\right)
=I_A\otimes I_B.
$$

この直交分解に[QM2のBorn則](../../../解析系/QM/QM2/index.md#axiom-qm2-born-rule)を適用すれば、各確率はノルム二乗で非負です。$\psi=\sum_{ij}R_{ij}\psi$ の各項が直交するので

$$
\begin{aligned}
1=\|\psi\|^2
&=\left\langle\sum_{i,j}R_{ij}\psi,\sum_{k,\ell}R_{k\ell}\psi\right\rangle\\
&=\sum_{i,j}\|R_{ij}\psi\|^2
=\sum_{i,j}p(i,j).
\end{aligned}
$$

固定した $i$ では $\sum_jR_{ij}=P_i\otimes I_B$ です。$R_{ij}\psi$ は $j$ ごとに直交するため、

$$
\sum_jp(i,j)
=\left\|\sum_jR_{ij}\psi\right\|^2
=\|(P_i\otimes I_B)\psi\|^2.
$$

最後に積状態の場合は $(P_i\otimes Q_j)(a\otimes b)=P_i a\otimes Q_jb$ となるので、[積基底と複合系の内積](#thm-qinf1-product-basis)で証明したノルムの積の式から確率の積表示が従います。
<!-- proof-end -->

積状態では同時確率が積に分かれます。しかし一般の状態では分かれないことが、Bell対の直接計算で明らかになりました。ここで測定結果が相関していても、一方の測定操作だけから他方へ自由に信号を送れると結論してはいけません。どの局所測定の周辺確率を比較するかまで揃える必要があります。

## 5. Bell対を作るには何を追加するか

局所作用素で二つのqubitへ別々に回転を掛けることはできます。しかし積状態をエンタングル状態へ変えるには、それだけでは足りません。

<a id="prop-qinf1-local-product-preservation"></a>

<!-- formal-statement-start -->
> **命題（局所ユニタリの積状態保存）**  
> $H_A,H_B$ が有限次元複素Hilbert空間で、$U:H_A\to H_A$ と $V:H_B\to H_B$ がユニタリなら、任意の単位ベクトル $a,b$ に対し $(U\otimes V)(a\otimes b)$ は積状態である。特に局所ユニタリの作用だけでは積状態からエンタングル純粋状態は作れない。
<!-- formal-statement-end -->

### 証明の見取り図

作用後も $Ua\otimes Vb$ という一個の積として残り、しかも各因子はユニタリ性で単位ノルムのままです。ここでは局所ユニタリだけを主張しており、測定・結果選別や系間相互作用の一般的な効果はまだ扱いません。

<!-- proof-start -->
### 証明

[局所作用素の定義](#def-qinf1-local-operator)から

$$
(U\otimes V)(a\otimes b)=(Ua)\otimes(Vb).
$$

またユニタリ性 $U^*U=I_A$ により

$$
\|Ua\|^2=\langle a,U^*Ua\rangle
=\langle a,a\rangle=1.
$$

同様に $\|Vb\|=1$ です。[積状態の定義](#def-qinf1-product-entangled)の両因子が単位である条件まで確認できたので、結論が従います。
<!-- proof-end -->

局所ではない二qubitゲートなら状況が変わります。例えば制御NOT（CNOT）とは、計算基底に対し

$$
\operatorname{CNOT}|i,j\rangle=|i,j\oplus i\rangle
\quad(i,j\in\{0,1\})
$$

と作用する線形写像です。$\oplus$ は2を法とする加算です。四つの基底 $|00\rangle,|01\rangle,|10\rangle,|11\rangle$ を順に $|00\rangle,|01\rangle,|11\rangle,|10\rangle$ へ置換するので、正規直交基底を正規直交基底へ写し、ユニタリです。

一つ目のqubitにHadamardゲート

$$
H=\frac1{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}
$$

を適用すると $H|0\rangle=|+\rangle$ となります。$H^*H=I$ は列の内積から直接確認できます。そこで

$$
\begin{aligned}
|00\rangle
&\xrightarrow{H\otimes I}
\frac{|00\rangle+|10\rangle}{\sqrt2}\\
&\xrightarrow{\operatorname{CNOT}}
\frac{|00\rangle+|11\rangle}{\sqrt2}
=|\Phi^+\rangle.
\end{aligned}
$$

初めは積状態、最終状態は[係数判定](#prop-qinf1-product-criterion)で積状態ではありません。CNOTが $U\otimes V$ 型の局所ユニタリでないことも[積状態保存の命題](#prop-qinf1-local-product-preservation)の対偶から分かります。これが二qubit間の相互作用によってエンタングルメントを作る最小例です。

## 6. 演習：状態・作用素・確率を一つの記法で確かめる

以下の演習では $|0\rangle,|1\rangle$ を $\mathbb C^2$ の標準正規直交基底、$|ij\rangle=|i\rangle\otimes|j\rangle$ とします。$\langle\cdot,\cdot\rangle$ の第二変数を線形とし、測定はすべて指定した射影による理想測定です。

<a id="ex-qinf1-a01"></a>
### QINF1-A01 三次元との積基底

- Level: A
- 問題: $H_A=\mathbb C^2,H_B=\mathbb C^3$ の標準正規直交基底を $(e_0,e_1)$、$(f_0,f_1,f_2)$ とする。積基底を順に列挙し、$x=e_0\otimes f_0+2i\,e_1\otimes f_2$ のノルムと正規化状態を求めよ。

<!-- solution-start -->
**詳細解答**。[積基底定理](#thm-qinf1-product-basis)では $i$ を先に固定して $j$ を動かすので、基底は

$$
e_0\otimes f_0,\ e_0\otimes f_1,\ e_0\otimes f_2,\
e_1\otimes f_0,\ e_1\otimes f_1,\ e_1\otimes f_2
$$

の6本です。係数 $(1,0,0,0,0,2i)$ の絶対値二乗和は $1+|2i|^2=5$ です。従って

$$
\|x\|=\sqrt5,\qquad
\frac{x}{\|x\|}
=\frac1{\sqrt5}e_0\otimes f_0+\frac{2i}{\sqrt5}e_1\otimes f_2.
$$

正規化後の二つの非零係数の絶対値二乗は $1/5$ と $4/5$ で、和は1です。
<!-- solution-end -->

<a id="ex-qinf1-a02"></a>
### QINF1-A02 積状態の正規化

- Level: A
- 問題: $a=(|0\rangle+i|1\rangle)/\sqrt2$、$b=(\sqrt3|0\rangle+|1\rangle)/2$ とする。両方が単位ベクトルであることを示し、$a\otimes b$ を $|00\rangle,|01\rangle,|10\rangle,|11\rangle$ の順に展開せよ。

<!-- solution-start -->
**詳細解答**。各基底が正規直交しているので

$$
\|a\|^2=\frac{|1|^2+|i|^2}{2}=1,\qquad
\|b\|^2=\frac{|\sqrt3|^2+|1|^2}{4}=1.
$$

テンソル積の双線形性からそれぞれの項を掛け合わせて

$$
a\otimes b
=\frac{\sqrt3}{2\sqrt2}|00\rangle
+\frac1{2\sqrt2}|01\rangle
+\frac{i\sqrt3}{2\sqrt2}|10\rangle
+\frac{i}{2\sqrt2}|11\rangle.
$$

係数の絶対値二乗和は $(3+1+3+1)/8=1$ です。これは[積ノルム公式](#thm-qinf1-product-basis)からも $1\cdot1=1$ と検算できます。
<!-- solution-end -->

<a id="ex-qinf1-a03"></a>
### QINF1-A03 局所反転の順序

- Level: A
- 問題: $X|0\rangle=|1\rangle,X|1\rangle=|0\rangle$ とする。$(X\otimes I)(I\otimes X)|01\rangle$ と $(I\otimes X)(X\otimes I)|01\rangle$ を途中の状態も含めて求めよ。

<!-- solution-start -->
**詳細解答**。[局所作用素の定義](#def-qinf1-local-operator)で右から順に作用すると

$$
|01\rangle\xrightarrow{I\otimes X}|00\rangle
\xrightarrow{X\otimes I}|10\rangle.
$$

反対の順では

$$
|01\rangle\xrightarrow{X\otimes I}|11\rangle
\xrightarrow{I\otimes X}|10\rangle.
$$

どちらも $|10\rangle$ です。これは[局所作用素の交換則](#prop-qinf1-local-algebra)が具体的な基底に対して成立する確認です。
<!-- solution-end -->

<a id="ex-qinf1-a04"></a>
### QINF1-A04 積状態を局所測定する

- Level: A
- 問題: $\psi=|+\rangle\otimes|0\rangle$、$|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$ とする。両qubitを計算基底で測るときの $p(0,0),p(0,1),p(1,0),p(1,1)$ と、左側の周辺確率を求めよ。

<!-- solution-start -->
**詳細解答**。$\psi=(|00\rangle+|10\rangle)/\sqrt2$ なので、対応する積基底射影で残る成分は $00,10$ のみです。[局所測定の確率](#prop-qinf1-joint-born)により

$$
p(0,0)=\frac12,\quad p(0,1)=0,\quad
p(1,0)=\frac12,\quad p(1,1)=0.
$$

左側だけを見れば、$p_A(0)=p(0,0)+p(0,1)=1/2$、$p_A(1)=p(1,0)+p(1,1)=1/2$ です。右側は必ず0です。積確率を使っても $\|P_i|+\rangle\|^2=1/2$、$\|Q_j|0\rangle\|^2=\delta_{j0}$ から同じ結果を得ます。
<!-- solution-end -->

<a id="ex-qinf1-b01"></a>
### QINF1-B01 係数行列から積状態を判定する

- Level: B
- 問題: 実数 $t$ に対し、$\psi_t=(|00\rangle+t|01\rangle+|10\rangle+t|11\rangle)/\sqrt{2(1+t^2)}$ と $\phi=(|00\rangle+|11\rangle)/\sqrt2$ を考える。どちらが積状態かを係数判定で示し、積状態は二つの単位ベクトルに分解せよ。

<!-- solution-start -->
**詳細解答**。$\psi_t$ の係数二乗和の分子は $1+t^2+1+t^2=2(1+t^2)$ です。係数行列は

$$
C_t=\frac1{\sqrt{2(1+t^2)}}
\begin{pmatrix}1&t\\1&t\end{pmatrix}.
$$

行列式は $(t-t)/(2(1+t^2))=0$ なので[係数判定](#prop-qinf1-product-criterion)から積状態です。第一列が $(1,1)^{\mathsf T}$、第二列が $t$ 倍なので、直接

$$
\psi_t=\frac{|0\rangle+|1\rangle}{\sqrt2}
\otimes\frac{|0\rangle+t|1\rangle}{\sqrt{1+t^2}}
$$

と分解できます。両因子はそれぞれ係数二乗和が1です。一方

$$
C_\phi=\frac1{\sqrt2}
\begin{pmatrix}1&0\\0&1\end{pmatrix},\qquad
\det C_\phi=\frac12
$$

なので $\phi$ はエンタングル純粋状態です。単なる項数ではなく、行列の階数が判定を決めます。
<!-- solution-end -->

<a id="ex-qinf1-b02"></a>
### QINF1-B02 任意次元での局所交換と正規化

- Level: B
- 問題: $H_A=\mathbb C^2,H_B=\mathbb C^3$ とし、$S$ は $H_A$ の任意の線形作用素、$T$ は $H_B$ の任意の線形作用素とする。$(S\otimes I_3)(I_2\otimes T)=(I_2\otimes T)(S\otimes I_3)$ を証明せよ。さらに $S,T$ がユニタリなら、任意の単位 $\psi\in H_A\otimes H_B$ のノルムが保存されることを示せ。

<!-- solution-start -->
**詳細解答**。積基底 $e_i\otimes f_j$ は2×3=6個で全空間を張ります。[局所作用素の定義](#def-qinf1-local-operator)から

$$
\begin{aligned}
(S\otimes I_3)(I_2\otimes T)(e_i\otimes f_j)
&=(S\otimes I_3)(e_i\otimes Tf_j)=Se_i\otimes Tf_j,\\
(I_2\otimes T)(S\otimes I_3)(e_i\otimes f_j)
&=(I_2\otimes T)(Se_i\otimes f_j)=Se_i\otimes Tf_j.
\end{aligned}
$$

従って基底上で作用が一致し、線形性から全空間で一致します。さらに $S,T$ がユニタリなら、[局所作用素の交換・随伴・ユニタリ性](#prop-qinf1-local-algebra)より

$$
(S\otimes T)^*(S\otimes T)=S^*S\otimes T^*T=I_2\otimes I_3.
$$

よって

$$
\|(S\otimes T)\psi\|^2
=\langle\psi,(S\otimes T)^*(S\otimes T)\psi\rangle
=\langle\psi,\psi\rangle=1.
$$

ここでは $S,T$ の行列成分を指定しなくても、積基底とユニタリ性だけで結論が得られます。
<!-- solution-end -->

<a id="ex-qinf1-b03"></a>
### QINF1-B03 Bell対生成と局所操作の限界

- Level: B
- 問題: $H=(1/\sqrt2)\begin{pmatrix}1&1\\1&-1\end{pmatrix}$ とし、CNOTの制御を左、標的を右とする。$|00\rangle$ に $H\otimes I$、次にCNOTを適用して得られる状態の係数行列と行列式を求め、なぜ $U\otimes V$ 型のユニタリ一つでは同じ変換を実現できないか説明せよ。

<!-- solution-start -->
**詳細解答**。$H|0\rangle=(|0\rangle+|1\rangle)/\sqrt2$ より

$$
(H\otimes I)|00\rangle
=\frac{|00\rangle+|10\rangle}{\sqrt2}.
$$

CNOTは $|00\rangle$ を固定し、$|10\rangle$ を $|11\rangle$ へ写すので

$$
\operatorname{CNOT}(H\otimes I)|00\rangle
=\frac{|00\rangle+|11\rangle}{\sqrt2}.
$$

係数行列 $C=\operatorname{diag}(1/\sqrt2,1/\sqrt2)$ は $\det C=1/2$ であり、[係数判定](#prop-qinf1-product-criterion)により積状態ではありません。ところが $|00\rangle=|0\rangle\otimes|0\rangle$ は積状態です。[局所ユニタリの積状態保存](#prop-qinf1-local-product-preservation)を $a=b=|0\rangle$ に適用すると、任意の $U\otimes V$ の出力は $(U|0\rangle)\otimes(V|0\rangle)$ という積状態のままです。従ってこの出力をBell状態に等しくする局所ユニタリは存在しません。
<!-- solution-end -->

<a id="ex-qinf1-c01"></a>
### QINF1-C01 二つの基底での相関を比較する

- Level: C
- 問題: Bell状態 $\Phi^+=(|00\rangle+|11\rangle)/\sqrt2$ と積状態 $\eta=|+\rangle\otimes|+\rangle$ を比較する。二つの系をともに同じ基底で射影測定した四つの同時確率をそれぞれ求め、各基底で「必ず同じ結果になる」かも判定せよ。基底は次の二通りとする。

  1. 計算基底 $|0\rangle,|1\rangle$。
  2. $|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$、$|-\rangle=(|0\rangle-|1\rangle)/\sqrt2$ からなる基底。

<!-- solution-start -->
**詳細解答**。計算基底では $\Phi^+$ の係数は $00$ と $11$ に各 $1/\sqrt2$ なので、[局所Born確率](#prop-qinf1-joint-born)より

$$
(p_{00},p_{01},p_{10},p_{11})_{\Phi^+}
=\left(\frac12,0,0,\frac12\right).
$$

一方 $\eta= (|00\rangle+|01\rangle+|10\rangle+|11\rangle)/2$ ですから

$$
(p_{00},p_{01},p_{10},p_{11})_{\eta}
=\left(\frac14,\frac14,\frac14,\frac14\right).
$$

従って計算基底ではBell状態の測定結果は必ず一致し、積状態では一致確率は $1/4+1/4=1/2$ です。

次に $|0\rangle=(|+\rangle+|-\rangle)/\sqrt2$、$|1\rangle=(|+\rangle-|-\rangle)/\sqrt2$ を直接代入します。二つの展開は

$$
\begin{aligned}
|00\rangle
&=\tfrac12(|++\rangle+|+-\rangle+|-+\rangle+|--\rangle),\\
|11\rangle
&=\tfrac12(|++\rangle-|+-\rangle-|-+\rangle+|--\rangle).
\end{aligned}
$$

加えると交差項 $|+-\rangle,|-+\rangle$ が相殺され、

$$
\Phi^+=\frac{|++\rangle+|--\rangle}{\sqrt2}
$$

となります。よって順序 $(++,+-,-+,--)$ の確率は $(1/2,0,0,1/2)$ です。他方 $\eta=|++\rangle$ なので確率は $(1,0,0,0)$ です。

この基底では両状態とも結果は必ず一致しますが、Bell状態では二つの一致結果が半々、積状態では常に $++$ です。**一致するという事実一つだけで、エンタングルメントを判定できるわけではありません**。各測定基底と確率分布、さらに[積状態の係数判定](#prop-qinf1-product-criterion)を合わせて検討する必要があります。
<!-- solution-end -->

## 7. 本章で獲得した道具

二つのqubitの状態空間は四次元で、一般の状態には積状態だけでなくBell状態のようなエンタングル純粋状態も含まれます。局所ユニタリは積状態を積状態へ写し、離れた系への局所作用は交換します。局所射影測定では同時確率と周辺確率を一つの積基底から求められます。

ただし今は**全系の純粋状態**だけを扱いました。一方の測定結果を捨てたとき、その系だけの状態をベクトル一本で表すことは一般にできません。次章QINF2では、この問題を密度演算子で定式化し、単に「測定結果が半々」という統計と、全系の重ね合わせがどのように異なるかを考えます。
