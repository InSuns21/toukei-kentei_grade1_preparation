# LREP18 電荷共役とMajorana条件

<!-- definition-example-audit: strict -->

前講ではスピノルから Lorentz 共変な量を作りました。今度はスピノル自身を複素共役したとき、元と同じ変換則を持つ列を作れるかを調べます。これができれば、電荷の位相を逆にする操作と、その操作で自分自身に戻る条件を定式化できます。

## 1. 複素共役を元の表現へ戻す

[Diracスピノル](../LREP16/index.md#def-lrep16-dirac)の Weyl 基底を使います。計量は $\eta=\operatorname{diag}(-1,1,1,1)$、星は成分ごとの複素共役、$\mathsf T$ は転置、$\dagger$ は共役転置です。$I=I_2$ とし、四次単位行列は $I_4$ と書きます。

$$
\psi=\binom{u}{r},\quad
S(A)=\begin{pmatrix}A&0\\0&Q\end{pmatrix},
\qquad Q=(A^\dagger)^{-1},
\quad A\in SL(2,\mathbb C).
$$

$u,r$ は二成分複素列です。単純な複素共役では $u$ は $A^*$ で変換され、一般に $A$ では変換されません。例えば $A=\operatorname{diag}(i,-i)$ なら $A^*=-A$ です。そこで [二次元交代形式と行列式](../LREP4/index.md#prop-lrep4-epsilon)に現れた実行列

$$
J=\begin{pmatrix}0&1\\-1&0\end{pmatrix},
\qquad J^{-1}=-J,\quad J^2=-I
$$

を利用します。左右の共役を交換すれば、もとの四成分変換則へ戻せます。

複素係数を共役してから作用する写像を反線形と呼びます。例えば $z\mapsto z^*$ は、和を保つ一方、定数 $i$ を掛けた入力には $-i$ を掛けた出力を返します。この性質を四成分へ拡張します。

<a id="def-lrep18-charge-conjugation"></a>

<!-- formal-statement-start -->
> **定義（電荷共役）**  
> 上記 Weyl 基底の Dirac 空間 $\mathbb C^4$ 上で、反線形写像 $\mathcal K$ を次で定める。

$$
B=\begin{pmatrix}0&J\\-J&0\end{pmatrix},
\qquad \mathcal K\psi=B\psi^*
=\binom{Jr^*}{-Ju^*}.
$$

> 電荷共役されたスピノルを $\psi^c=\mathcal K\psi$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep18-charge-conjugation -->
**定義の確認**。 $\psi=(1,i,2,0)^{\mathsf T}$ では $Jr^*=(0,-2)^{\mathsf T}$、$-Ju^*=(i,1)^{\mathsf T}$ なので

$$
\psi^c=(0,-2,i,1)^{\mathsf T}.
$$

任意の複素数 $\alpha,\beta$ と列 $\phi,\psi$ に対して

$$
B(\alpha\phi+\beta\psi)^*
=\alpha^*B\phi^*+\beta^*B\psi^*.
$$

従って反線形です。特に $(i\psi)^c=-i\psi^c$ であり、複素線形写像とは異なります。
<!-- definition-example-end -->

この操作が表現と両立するか、また二回作用させると何が起きるかを確認しましょう。

<a id="prop-lrep18-real-structure"></a>

<!-- formal-statement-start -->
> **命題（電荷共役の共変性と対合性）**  
> 上記 Dirac 空間で任意の $A\in SL(2,\mathbb C)$ に対して

$$
BS(A)^*=S(A)B,\qquad
\mathcal K^2=I_4.
$$

> 従って $\mathcal K(S(A)\psi)=S(A)\mathcal K\psi$ が成立する。
<!-- formal-statement-end -->

**証明の見取り図。** 行列式1の二次行列は $J$ を保存します。その式を複素共役にも適用し、左右それぞれのブロックを照合します。

<!-- proof-start -->
### 証明

[二次元交代形式と行列式](../LREP4/index.md#prop-lrep4-epsilon)を $A^{\mathsf T}$ に適用します。$\det A^{\mathsf T}=1$ なので $AJA^{\mathsf T}=J$ です。右から $(A^{\mathsf T})^{-1}$ を掛けると

$$
AJ=J(A^{\mathsf T})^{-1}=JQ^*.
$$

同じ恒等式を $A^*$ に適用すると、$(A^*)^{\mathsf T}JA^*=J$ です。左から $Q$ を掛けて $JA^*=QJ$ を得ます。よって

$$
BS^*=\begin{pmatrix}0&JQ^*\\-JA^*&0\end{pmatrix}
=\begin{pmatrix}0&AJ\\-QJ&0\end{pmatrix}=SB.
$$

$B$ は実行列であり、その二乗の対角ブロックは $-J^2=I$ です。従って

$$
\mathcal K^2\psi=B(B\psi^*)^*
=BB^*\psi=B^2\psi=\psi.
$$

反線形であっても二回作用させると元に戻ります。$\square$
<!-- proof-end -->

例えば $A=\operatorname{diag}(2,1/2)$ の boost で $e_1=(1,0,0,0)^{\mathsf T}$ は $2e_1$ になります。一方 $e_1^c=e_4$ で、右側の第二成分も同じ boost で2倍になります。この一致が共変性です。

## 2. 電荷共役行列とガンマ行列

[Dirac随伴](../LREP17/index.md#def-lrep17-dirac-adjoint)を使うと、列の共役を随伴行の転置から表せます。ここでは前講と同じ

$$
H=-i\gamma^0=\begin{pmatrix}0&-iI\\iI&0\end{pmatrix},
\qquad \bar\psi=\psi^\dagger H
$$

を用います。$\bar\psi^{\mathsf T}=H^{\mathsf T}\psi^*$ であり、$(H^{\mathsf T})^2=I_4$ です。この式を元の定義に代入して、随伴から共役列へ戻す行列を取り出します。

<a id="def-lrep18-charge-matrix"></a>

<!-- formal-statement-start -->
> **定義（電荷共役行列）**  
> 上記 $B,H$ に対して、四次行列 $C$ を

$$
C=B(H^{\mathsf T})^{-1}
=-i\begin{pmatrix}J&0\\0&J\end{pmatrix}
$$

> と定める。このとき $\psi^c=C\bar\psi^{\mathsf T}$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep18-charge-matrix -->
**定義の確認**。 $e_1$ の随伴は $(0,0,-i,0)$ です。右側の二成分 $( -i,0)^{\mathsf T}$ に $-iJ$ を掛けると $(0,1)^{\mathsf T}$ になります。従って $C\bar e_1^{\mathsf T}=e_4$ であり、第1節の計算と一致します。また $C^2=(-i)^2\operatorname{diag}(J^2,J^2)=I_4$ なので $C$ は可逆です。
<!-- definition-example-end -->

[ガンマ行列](../LREP15/index.md#def-lrep15-gamma)と前講の[ベクトル成分用行列](../LREP17/index.md#prop-lrep17-vector-matrices)は

$$
\gamma^0=\begin{pmatrix}0&I\\-I&0\end{pmatrix},
\quad \gamma^j=\begin{pmatrix}0&\sigma_j\\\sigma_j&0\end{pmatrix},
\qquad G^0=-i\gamma^0,\quad G^j=i\gamma^j.
$$

ここで $j=1,2,3$ であり、$\sigma_j$ は [Pauli行列](../LREP5/index.md#def-lrep5-pauli-model)です。電荷共役行列の転置に関する恒等式は、後でスピノルの方程式を変換するときに役立ちます。

<a id="prop-lrep18-gamma-transpose"></a>

<!-- formal-statement-start -->
> **命題（電荷共役行列の恒等式）**  
> 上記 Weyl 基底で $C$ は可逆かつ $C^{\mathsf T}=-C$ であり、$\mu=0,1,2,3$ に対して

$$
C(\gamma^\mu)^{\mathsf T}C^{-1}=-\gamma^\mu,\qquad
C(G^\mu)^{\mathsf T}C^{-1}=-G^\mu,
$$

$$
B(\gamma^\mu)^*B^{-1}=\gamma^\mu,\qquad
B(G^\mu)^*B^{-1}=-G^\mu.
$$
<!-- formal-statement-end -->

**証明の見取り図。** 転置は係数 $i$ を変えませんが、複素共役は $i$ の符号を変えます。ここを区別して各ブロックを掛けます。

<!-- proof-start -->
### 証明

$J^{\mathsf T}=-J$ と $C^2=I_4$ から $C^{\mathsf T}=-C$、$C^{-1}=C$ です。Pauli行列を実際に書くと

$$
\sigma_1=\begin{pmatrix}0&1\\1&0\end{pmatrix},
\quad \sigma_2=\begin{pmatrix}0&-i\\i&0\end{pmatrix}=-iJ,
\quad \sigma_3=\begin{pmatrix}1&0\\0&-1\end{pmatrix}.
$$

$J\sigma_1=\sigma_3=-\sigma_1 J$、$J\sigma_3=-\sigma_1=-\sigma_3 J$ です。$\sigma_2$ は $J$ と可換ですが $\sigma_2^{\mathsf T}=-\sigma_2$。従って全ての $j$ について

$$
J\sigma_j^{\mathsf T}J^{-1}=-\sigma_j.
$$

時間行列は転置で負になり、$C$ と可換です。空間行列では $C$ の二つの対角ブロックが同じなので

$$
C(\gamma^j)^{\mathsf T}C^{-1}
=\begin{pmatrix}0&J\sigma_j^{\mathsf T}J^{-1}\\
J\sigma_j^{\mathsf T}J^{-1}&0\end{pmatrix}
=-\gamma^j.
$$

$G^\mu$ は対応する $\gamma^\mu$ の定数倍で、転置は複素係数を変えないため二番目の式も従います。

一方、$\gamma^0$ は実行列で

$$
B\gamma^0=\gamma^0B
=\begin{pmatrix}-J&0\\0&-J\end{pmatrix}.
$$

$\sigma_j^\dagger=\sigma_j$ より $\sigma_j^*=\sigma_j^{\mathsf T}$ です。従って

$$
B(\gamma^j)^*
=\begin{pmatrix}J\sigma_j^*&0\\0&-J\sigma_j^*\end{pmatrix}
=\begin{pmatrix}-\sigma_jJ&0\\0&\sigma_jJ\end{pmatrix}
=\gamma^jB.
$$

右から $B^{-1}$ を掛ければ三番目の式です。$G^0=-i\gamma^0$、$G^j=i\gamma^j$ ではどちらの係数も複素共役で負になるため四番目の式を得ます。$\square$
<!-- proof-end -->

この規約では $\gamma^\mu$ に対する複素共役の恒等式と $G^\mu$ に対する恒等式の符号が逆です。計量やガンマ行列の定義が異なる文献と比較するときは、行列の具体形から照合する必要があります。

## 3. 基底と位相を変える

同じ写像でも、基底を変えれば成分行列は変わります。また共役操作全体に絶対値1の複素数を掛けても、二回の作用でその係数と共役が打ち消し合います。

<a id="prop-lrep18-basis-phase"></a>

<!-- formal-statement-start -->
> **命題（電荷共役の基底・位相変換）**  
> 任意の可逆な複素四次行列 $T$ で新しい成分を $\psi'=T\psi$ とする。同じ群作用・随伴形式・電荷共役を表す行列は

$$
S'=TST^{-1},\quad
H'=(T^{-1})^\dagger HT^{-1},\quad
B'=TB(T^*)^{-1},\quad C'=TCT^{\mathsf T}.
$$

> また実数 $\theta$ に対し $\mathcal K_\theta=e^{i\theta}\mathcal K$ は群作用と可換な反線形対合である。
<!-- formal-statement-end -->

**証明の見取り図。** 同じ列と行の収縮を異なる成分で書き、電荷共役の出力も新しい成分へ移します。

<!-- proof-start -->
### 証明

群作用は $T(S\psi)=TST^{-1}\psi'$ です。随伴形式は $\psi=T^{-1}\psi'$ を代入して

$$
\phi^\dagger H\psi=(\phi')^\dagger
(T^{-1})^\dagger HT^{-1}\psi'.
$$

従って $H'$ は命題の式です。電荷共役の新成分は

$$
T\mathcal K\psi=TB(T^{-1}\psi')^*
=TB(T^*)^{-1}(\psi')^*.
$$

また $\bar\psi'=(\psi')^\dagger H'=\bar\psi T^{-1}$ です。転置して $\bar\psi^{\mathsf T}=T^{\mathsf T}(\bar\psi')^{\mathsf T}$ を得ます。[電荷共役行列](#def-lrep18-charge-matrix)の式へ代入すると

$$
T\psi^c=TC\bar\psi^{\mathsf T}
=TCT^{\mathsf T}(\bar\psi')^{\mathsf T}.
$$

これで $C'$ の式が従います。位相を掛ける操作は複素線形な群作用と可換です。[電荷共役の共変性と対合性](#prop-lrep18-real-structure)と反線形性により

$$
\mathcal K_\theta^2\psi
=e^{i\theta}e^{-i\theta}\mathcal K^2\psi=\psi.
$$

よって反線形対合です。$\square$
<!-- proof-end -->

例えば $T=e^{i\alpha}I_4$ なら $S'=S$、$H'=H$ ですが $B'=e^{2i\alpha}B$、$C'=e^{2i\alpha}C$ です。通常の相似変換 $TBT^{-1}$ ではこの変化を取り逃します。

## 4. Majorana条件と左右の関係

[chirality演算子](../LREP16/index.md#def-lrep16-chirality)は $\gamma^5=\operatorname{diag}(-I,I)$ です。左成分だけの列は電荷共役で右成分だけの列に移ります。実際、

$$
\mathcal K\binom{u}{0}=\binom{0}{-Ju^*},
\qquad
\mathcal K\binom{0}{r}=\binom{Jr^*}{0}.
$$

一般の Dirac スピノルは左右を独立に選べます。一方、左右がこの操作で結び付いている列なら、電荷共役をしても自分自身に戻れます。この条件を Majorana 条件と呼びます。

<a id="def-lrep18-majorana"></a>

<!-- formal-statement-start -->
> **定義（Majorana条件）**  
> 上記 Dirac 空間の列 $\psi$ が $\mathcal K\psi=\psi$ を満たすとき、Majorana条件を満たすという。その固定点集合を

$$
M=\{\psi\in\mathbb C^4\mid \mathcal K\psi=\psi\}
$$

> と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep18-majorana -->
**定義の確認**。 $u=(1,i)^{\mathsf T}$、$r=(i,1)^{\mathsf T}$ とします。

$$
-Ju^*=(i,1)^{\mathsf T}=r,\qquad
Jr^*=(1,i)^{\mathsf T}=u.
$$

両方の成分条件が成り立つため $\psi=(1,i,i,1)^{\mathsf T}$ は $M$ に属します。これに $i$ を掛けると $\mathcal K(i\psi)=-i\psi$ になり、非零なので $i\psi$ は $M$ に属しません。
<!-- definition-example-end -->

<a id="prop-lrep18-majorana-structure"></a>

<!-- formal-statement-start -->
> **命題（Majorana条件の自由度とchirality）**  
> 上記 $M$ は群作用 $S(A)$ で不変な実線形部分空間であり、

$$
M=\left\{\binom{u}{-Ju^*}\mid u\in\mathbb C^2\right\},
\qquad \dim_{\mathbb R}M=4.
$$

> また $\mathbb C^4=M\oplus iM$ は実線形空間としての直和である。非零の $M$ の元は単一の chirality を持たない。
<!-- formal-statement-end -->

**証明の見取り図。** 左成分を自由に選んで右成分を決めます。任意の列について共役との和・差を取ると、固定点二つで表せます。

<!-- proof-start -->
### 証明

固定点条件は $u=Jr^*$ と $r=-Ju^*$ です。後者を前者へ代入すると

$$
Jr^*=J(-Ju^*)^*=-J^2u=u.
$$

従って後者だけで両条件を満たします。$u\mapsto (u,-Ju^*)^{\mathsf T}$ は実線形で、上側への射影が逆写像です。$\mathbb C^2$ は実次元4なので $M$ も実次元4です。実係数の和に対して閉じています。[電荷共役の共変性と対合性](#prop-lrep18-real-structure)より

$$
\mathcal K(S\psi)=S\mathcal K\psi=S\psi
\quad(\psi\in M)
$$

なので群作用でも閉じています。

任意の列 $\psi$ に対して

$$
x=\frac{\psi+\mathcal K\psi}{2},
\qquad y=\frac{\psi-\mathcal K\psi}{2i}
$$

と置きます。対合性と反線形性から

$$
\mathcal K x=\frac{\mathcal K\psi+\psi}{2}=x,
\qquad
\mathcal K y=\frac{\mathcal K\psi-\psi}{-2i}=y.
$$

よって $x,y\in M$ で $\psi=x+iy$。もし $x=iy$ が $M$ にも属するなら $x=\mathcal K x=-iy=-x$ なので $x=0$ です。従って直和になります。

[chirality射影子](../LREP16/index.md#def-lrep16-chiral-projectors)は左側・右側をそれぞれ取り出します。固定点で $r=0$ なら $-Ju^*=0$ より $u=0$。$u=0$ なら $r=0$ です。従って非零固定点は片側だけにはできません。$\square$
<!-- proof-end -->

つまり左 Weyl 列は複素2成分、Dirac 列は複素4成分、Majorana 条件付き Dirac 列は実4成分の自由度を持ちます。これらは成分の自由度であって、運動方程式を課した後の粒子状態数ではありません。

## 5. 電荷の位相と粒子の対称性

外部の $U(1)$ 対称性を、実数 $q$ と角度 $\alpha$ による位相作用 $\psi\mapsto e^{iq\alpha}\psi$ として考えます。$U(1)$ は絶対値1の複素数の群であり、角度を $2\pi$ 周期とする場合には $q$ は整数とします。ここでの電荷とは、この位相の重み $q$ のことです。Lorentz変換とは別の作用です。

<a id="prop-lrep18-charge-reversal"></a>

<!-- formal-statement-start -->
> **命題（電荷反転とMajorana条件の制約）**  
> 上記電荷共役 $\mathcal K$ と位相作用 $U_q(\alpha)=e^{iq\alpha}I_4$ に対し

$$
\mathcal K U_q(\alpha)=U_{-q}(\alpha)\mathcal K.
$$

> 非零の $\psi\in M$ の位相変換後の列が全ての実数 $\alpha$ について $M$ に属するなら $q=0$ である。
<!-- formal-statement-end -->

**証明の見取り図。** 電荷の反転は係数の複素共役から直接従います。固定点条件を変換後にも課し、二つの位相がいつ一致するかを調べます。

<!-- proof-start -->
### 証明

反線形性より

$$
\mathcal K(e^{iq\alpha}\psi)
=e^{-iq\alpha}\mathcal K\psi.
$$

$\psi\in M$ の場合、変換後にも条件が成り立つためには

$$
e^{-iq\alpha}\psi=e^{iq\alpha}\psi.
$$

非零成分を一つ選んで割ると $e^{2iq\alpha}=1$ が必要です。$q\ne0$ なら $\alpha=\pi/(2q)$ を選ぶと左辺は $-1$ となり矛盾します。従って $q=0$。逆に $q=0$ なら位相作用は恒等写像です。$\square$
<!-- proof-end -->

例えば $q=1$ でも $\alpha=\pi$ という一つの変換なら固定点条件を保ちます。矛盾するのは連続な位相作用の**全て**で条件を保つと要求した場合です。中性であることだけから Majorana 条件が従うわけでもありません。

ここまでの写像は可換な複素数成分を持つ有限次元スピノル上の反線形写像です。粒子状態の空間における電荷共役対称性とは区別します。例えば正負の電荷を表す独立な状態 $|+\rangle,|-\rangle$ を持つ複素二次元空間で、両者を交換する複素線形行列

$$
\widehat C=\begin{pmatrix}0&1\\1&0\end{pmatrix}
$$

を考えると、$\widehat C(i|+\rangle)=i|-\rangle$ です。これはスピノルの $\mathcal K$ の反線形性とは異なります。量子論での対称性の実現には状態空間と力学の指定が必要で、この成分計算だけからその存在は結論できません。

同じ理由で、古典的な可換成分の双線形量に量子化した反交換成分の符号をそのまま持ち込むことはできません。例えば前講の[Dirac双線形量の実数値性](../LREP17/index.md#prop-lrep17-real-bilinears)から $v^0=\psi^\dagger\psi$ です。$B^\dagger B=I_4$ なので $(\psi^c)^\dagger\psi^c=\psi^\dagger\psi$ となります。電荷位相の重みが反転することと、この非負の量の符号とは別問題です。

## 6. 演習

### Level A

<a id="ex-lrep18-a01"></a>

#### LREP18-A01 成分による電荷共役
- Level: A
- ID: LREP18-A01

$\psi=(2+i,1,0,3i)^{\mathsf T}$ の $\psi^c$ と $(\psi^c)^c$ を求めよ。

<!-- solution-start -->
**詳細解答。** [電荷共役](#def-lrep18-charge-conjugation)により

$$
Jr^*=(-3i,0)^{\mathsf T},\qquad
-Ju^*=(-1,2-i)^{\mathsf T}.
$$

従って $\psi^c=(-3i,0,-1,2-i)^{\mathsf T}$。さらにその右側の共役へ $J$ を作用させると $(2+i,1)^{\mathsf T}$、左側の共役へ $-J$ を作用させると $(0,3i)^{\mathsf T}$ です。元の列に戻り、対合性を確認できました。
<!-- solution-end -->

<a id="ex-lrep18-a02"></a>

#### LREP18-A02 随伴から共役列を作る
- Level: A
- ID: LREP18-A02

$\psi=e_2=(0,1,0,0)^{\mathsf T}$ に対し $\bar\psi$ と $C\bar\psi^{\mathsf T}$ を求め、$B\psi^*$ と比較せよ。

<!-- solution-start -->
**詳細解答。** [Dirac随伴](../LREP17/index.md#def-lrep17-dirac-adjoint)から $\bar\psi=(0,0,0,-i)$ です。[電荷共役行列](#def-lrep18-charge-matrix)の下側ブロックは $-iJ$ なので

$$
-iJ\binom{0}{-i}=\binom{-1}{0}.
$$

従って $C\bar\psi^{\mathsf T}=-e_3$。一方 $-J(0,1)^{\mathsf T}=(-1,0)^{\mathsf T}$ であり $B\psi^*=-e_3$ です。
<!-- solution-end -->

<a id="ex-lrep18-a03"></a>

#### LREP18-A03 Majorana条件から右成分を決める
- Level: A
- ID: LREP18-A03

左成分が $u=(2,1+i)^{\mathsf T}$ の Majorana 条件付き列を求め、その固定点条件を確認せよ。

<!-- solution-start -->
**詳細解答。** [Majorana条件の自由度とchirality](#prop-lrep18-majorana-structure)から

$$
r=-Ju^*=(-1+i,2)^{\mathsf T}.
$$

さらに $Jr^*=(2,1+i)^{\mathsf T}=u$ です。よって上側・下側とも固定点条件を満たし、求める列は $(2,1+i,-1+i,2)^{\mathsf T}$ です。
<!-- solution-end -->

<a id="ex-lrep18-a04"></a>

#### LREP18-A04 位相の反転
- Level: A
- ID: LREP18-A04

$\psi=(1,0,0,1)^{\mathsf T}$ は Majorana 条件を満たす。$q=2$ の位相作用において $\alpha=\pi/4,\pi/2$ の各変換後に条件を保つか判定せよ。

<!-- solution-start -->
**詳細解答。** $u=(1,0)^{\mathsf T}$ から $-Ju^*=(0,1)^{\mathsf T}=r$ です。[電荷反転とMajorana条件の制約](#prop-lrep18-charge-reversal)により変換後の共役は $e^{-2i\alpha}\psi$。$\alpha=\pi/4$ では変換後が $i\psi$、共役は $-i\psi$ で一致しません。$\alpha=\pi/2$ では両方が $-\psi$ で一致します。一部の角度での保存と全角度での保存は異なります。
<!-- solution-end -->

### Level B

<a id="ex-lrep18-b01"></a>

#### LREP18-B01 非対角な群作用との可換性
- Level: B
- ID: LREP18-B01

$A=\begin{pmatrix}1&i\\0&1\end{pmatrix}$、$\psi=e_2$ とする。$(S\psi)^c$ と $S\psi^c$ を別々に計算せよ。

<!-- solution-start -->
**詳細解答。** $\det A=1$ で

$$
A^\dagger=\begin{pmatrix}1&0\\-i&1\end{pmatrix},
\quad Q=\begin{pmatrix}1&0\\i&1\end{pmatrix}.
$$

[Diracスピノル](../LREP16/index.md#def-lrep16-dirac)の群作用より $S\psi=(i,1,0,0)^{\mathsf T}$ です。その共役の右側は $-J(-i,1)^{\mathsf T}=(-1,-i)^{\mathsf T}$ なので $(S\psi)^c=(0,0,-1,-i)^{\mathsf T}$。他方 $\psi^c=-e_3$ に $S$ を作用させると右側が $Q(-1,0)^{\mathsf T}=(-1,-i)^{\mathsf T}$ です。二つは一致します。
<!-- solution-end -->

<a id="ex-lrep18-b02"></a>

#### LREP18-B02 位相を含む基底変更
- Level: B
- ID: LREP18-B02

$T=\operatorname{diag}(iI,I)$ とする。新成分での $B',C'$ を求め、$B'(B')^*=I_4$ を検算せよ。

<!-- solution-start -->
**詳細解答。** [電荷共役の基底・位相変換](#prop-lrep18-basis-phase)より $(T^*)^{-1}=\operatorname{diag}(iI,I)$ なので

$$
B'=TB(T^*)^{-1}
=\begin{pmatrix}0&iJ\\-iJ&0\end{pmatrix}=iB.
$$

$T^{\mathsf T}=T$ なので

$$
C'=TCT^{\mathsf T}
=\begin{pmatrix}iJ&0\\0&-iJ\end{pmatrix}.
$$

従って $B'(B')^*=(iB)(-iB)=B^2=I_4$。通常の行列の二乗では $(B')^2=-I_4$ となりますが、これは反線形写像の二乗とは異なります。反線形写像の二乗には複素共役が必要です。
<!-- solution-end -->

<a id="ex-lrep18-b03"></a>

#### LREP18-B03 chiralityと複素共役
- Level: B
- ID: LREP18-B03

$\gamma^5=\operatorname{diag}(-I,I)$ とする。$\mathcal K\gamma^5=-\gamma^5\mathcal K$ を示し、左射影子 $P_L=(I_4-\gamma^5)/2$ に対し $\mathcal KP_L=P_R\mathcal K$ を導け。$P_R=(I_4+\gamma^5)/2$ とする。

<!-- solution-start -->
**詳細解答。** $\gamma^5$ は実行列であり、

$$
B\gamma^5=\begin{pmatrix}0&J\\J&0\end{pmatrix},
\qquad \gamma^5B=\begin{pmatrix}0&-J\\-J&0\end{pmatrix}.
$$

従って $\mathcal K(\gamma^5\psi)=B\gamma^5\psi^*=-\gamma^5B\psi^*$ です。係数 $1/2$ は実数なので

$$
\mathcal KP_L\psi
=\tfrac12(\mathcal K\psi+\gamma^5\mathcal K\psi)
=P_R\mathcal K\psi.
$$

[chirality射影子](../LREP16/index.md#def-lrep16-chiral-projectors)の左右が交換されます。
<!-- solution-end -->

<a id="ex-lrep18-b04"></a>

#### LREP18-B04 転置と複素共役の符号
- Level: B
- ID: LREP18-B04

$\gamma^2$ と $G^2=i\gamma^2$ について $C(G^2)^{\mathsf T}C^{-1}$ と $B(G^2)^*B^{-1}$ を直接計算せよ。

<!-- solution-start -->
**詳細解答。** $\sigma_2=-iJ$ なので

$$
G^2=\begin{pmatrix}0&J\\J&0\end{pmatrix}.
$$

これは実行列で転置は $-G^2$ です。$C$ の対角ブロックはともに $-iJ$ で、$J$ と可換なので $C(G^2)^{\mathsf T}C^{-1}=-G^2$ です。また

$$
BG^2=\operatorname{diag}(-I,I),\qquad
BG^2B=\begin{pmatrix}0&-J\\-J&0\end{pmatrix}.
$$

$B^{-1}=B$ なので後者も $-G^2$ となり、[電荷共役行列の恒等式](#prop-lrep18-gamma-transpose)と一致します。
<!-- solution-end -->

### Level C

<a id="ex-lrep18-c01"></a>

#### LREP18-C01 実構造を成分で再構成する
- Level: C
- ID: LREP18-C01

$\psi=(1,i,2,0)^{\mathsf T}$ を $x+iy$ と書き、$x,y$ を Majorana 条件付き列として求めよ。この分解の一意性を示し、任意の $S(A)$ で変換後にも同じ分解法が成立することを証明せよ。

<!-- solution-start -->
**詳細解答。** [電荷共役](#def-lrep18-charge-conjugation)から $\psi^c=(0,-2,i,1)^{\mathsf T}$ です。[Majorana条件の自由度とchirality](#prop-lrep18-majorana-structure)の分解式に代入すると

$$
x=\tfrac12(1,i-2,2+i,1)^{\mathsf T},
\quad
y=\tfrac12(-i,1-2i,-1-2i,i)^{\mathsf T}.
$$

$x$ の上側の共役へ $-J$ を掛けると $(2+i,1)^{\mathsf T}/2$、$y$ では $(-1-2i,i)^{\mathsf T}/2$ です。それぞれ下側と一致します。成分ごとに $x+iy$ を取ると

$$
x+iy=\tfrac12(2,2i,4,0)^{\mathsf T}=\psi.
$$

仮に $\psi=x'+iy'$ も固定点二つによる分解なら、共役を取ると $\psi^c=x'-iy'$ です。和から $2x'=\psi+\psi^c$、差から $2iy'=\psi-\psi^c$ が従い、$x'=x,y'=y$ です。

[電荷共役の共変性と対合性](#prop-lrep18-real-structure)により $(S\psi)^c=S\psi^c$。従って

$$
\frac{S\psi+(S\psi)^c}{2}=Sx,\qquad
\frac{S\psi-(S\psi)^c}{2i}=Sy.
$$

$S$ は複素線形であり固定点集合を保つため、これらは変換後の唯一の実分解です。
<!-- solution-end -->

## 7. まとめと次講

電荷共役は複素共役と左右交換を組み合わせた反線形対合です。Majorana条件はその固定点条件であり、左右の成分を独立に選ぶ自由度を半分にします。連続な非自明の電荷位相とは両立しません。次講ではガンマ行列の変換則から Dirac 方程式の共変性を導きます。
