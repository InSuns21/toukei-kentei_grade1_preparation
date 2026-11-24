# LREP17 Dirac双線形量

<!-- definition-example-audit: strict -->

前講の四成分スピノルは、回転では長さを保ちますが、boostでは成分が伸縮します。それでも観測量を作るには、どの慣性系でも同じ値を持つ量や、四元ベクトルと同じ規則で変わる量が必要です。今回はスピノルを二つ組み合わせ、Lorentz変換の規則を持つ五種類の量を作ります。

## 1. 普通の内積が保存されない理由

[Diracスピノル](../LREP16/index.md#def-lrep16-dirac)の Weyl 基底を用います。$I=I_2$、$I_4$ は単位行列、$\dagger$ は複素共役転置です。$A\in SL(2,\mathbb C)$ に対し

$$
\psi=\binom{u}{r},\qquad Q=(A^\dagger)^{-1},
\qquad S=\begin{pmatrix}A&0\\0&Q\end{pmatrix},
\qquad \psi'=S\psi.
$$

$u,r\in\mathbb C^2$ です。例えば $A=\operatorname{diag}(2,1/2)$、$\psi=e_1=(1,0,0,0)^{\mathsf T}$ なら $S\psi=2e_1$ です。普通の内積で測った長さの二乗は1から4へ変わります。

一般に行列 $H$ を挟んだ $\phi^\dagger H\psi$ を考えます。第一引数では複素共役を伴う線形性、第二引数では通常の線形性を持つので、これは半双線形形式です。$H^\dagger=H$ なら引数を交換した値が複素共役になる Hermitian 形式です。全ての $S$ に対して値が保存される条件は

$$
(S\phi)^\dagger H(S\psi)=\phi^\dagger S^\dagger HS\psi
=\phi^\dagger H\psi.
$$

$\phi,\psi$ を全ての標準基底の組に取れば行列の各成分が等しくなるので、この条件は $S^\dagger HS=H$ と同値です。上のboostで $e_1$ を使うと $4e_1^\dagger He_1=e_1^\dagger He_1$、つまり $e_1^\dagger He_1=0$ です。従って非零の列全てに正の値を与える保存形式は存在しません。左右の成分を交差させると、一方の伸縮が他方で打ち消されます。

計量は $\eta=\operatorname{diag}(-1,1,1,1)$ とし、[ガンマ行列](../LREP15/index.md#def-lrep15-gamma)をそのまま使います。

$$
\gamma^0=\begin{pmatrix}0&I\\-I&0\end{pmatrix},
\qquad
\gamma^j=\begin{pmatrix}0&\sigma_j\\\sigma_j&0\end{pmatrix}
\quad(j=1,2,3).
$$

$\sigma_j$ は[Pauli行列](../LREP5/index.md#def-lrep5-pauli-model)です。時間行列は反 Hermitian なので $-i$ を掛けると Hermitian になります。

<a id="def-lrep17-dirac-adjoint"></a>

<!-- formal-statement-start -->
> **定義（Dirac随伴）**  
> 上記計量と Weyl 基底の Dirac 空間で、行列 $H$ と列 $\psi\in\mathbb C^4$ の Dirac随伴を

$$
H=-i\gamma^0=\begin{pmatrix}0&-iI\\iI&0\end{pmatrix},
\qquad \bar\psi=\psi^\dagger H
$$

> と定める。随伴は複素成分を持つ行である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep17-dirac-adjoint -->
**定義の確認**。 $\psi=(1,0,i,0)^{\mathsf T}$ なら $\psi^\dagger=(1,0,-i,0)$ です。行列積を行うと

$$
\bar\psi=(1,0,-i,0)
\begin{pmatrix}0&-iI\\iI&0\end{pmatrix}
=(1,0,-i,0).
$$

従って $\bar\psi\psi=2$。一方 $\chi=(1,0,-i,0)^{\mathsf T}$ なら $\bar\chi=(-1,0,-i,0)$ で $\bar\chi\chi=-2$ です。また $e_1$ では $\bar e_1=(0,0,-i,0)$、$\bar e_1 e_1=0$ です。これは正負両方の値を取る不定な形式です。複素共役だけでは列のままであり、普通の共役転置だけでは $H$ が欠けます。
<!-- definition-example-end -->

<a id="prop-lrep17-adjoint-covariance"></a>

<!-- formal-statement-start -->
> **命題（Dirac随伴の変換則）**  
> Dirac 空間の上記 $H$ と任意の $A\in SL(2,\mathbb C)$ の群作用 $S$ に対し

$$
H^\dagger=H,\quad H^2=I_4,\quad S^\dagger HS=H.
$$

> 従って $\psi'=S\psi$ なら

$$
\bar\psi'=\bar\psi S^{-1}.
$$
<!-- formal-statement-end -->

**証明の見取り図。** 左成分への作用と右成分への作用が共役転置を通じて互いの逆行列になることを利用します。

<!-- proof-start -->
### 証明

[Dirac随伴](#def-lrep17-dirac-adjoint)の二つの非対角ブロックは互いの共役転置なので $H^\dagger=H$ です。また $(-i)(i)=1$ なので $H^2=I_4$ です。[Diracスピノルの群作用](../LREP16/index.md#def-lrep16-dirac)を代入すると

$$
HS=\begin{pmatrix}0&-iQ\\iA&0\end{pmatrix},
\quad
S^\dagger HS=
\begin{pmatrix}0&-iA^\dagger Q\\iQ^\dagger A&0\end{pmatrix}.
$$

$A^\dagger Q=I$、$Q^\dagger=A^{-1}$ より $Q^\dagger A=I$ です。従って結果は $H$ になります。右から $S^{-1}$ を掛けて $S^\dagger H=HS^{-1}$ を得ます。よって

$$
\bar\psi'=(S\psi)^\dagger H
=\psi^\dagger S^\dagger H
=\psi^\dagger HS^{-1}=\bar\psi S^{-1}.
$$

$\square$
<!-- proof-end -->

$H^2=I_4$ なので $H$ は可逆です。非零の列自身に対して形式が零になることはあっても、全ての相手との値が零になる非零の列はありません。保存性と正定値性は別の条件です。

## 2. ベクトルを作るときの添字

[ガンマ行列の共変変換則](../LREP15/index.md#prop-lrep15-gamma-covariance)では $\gamma^\mu$ の上付き添字は基底の番号でした。能動変換 $\Lambda$ に対して

$$
S\gamma^\mu S^{-1}=\sum_\nu\Lambda^\nu{}_\mu\gamma^\nu.
$$

この式の右辺は $\Lambda$ の第 $\mu$ 列を使っています。今欲しいのは四元ベクトルの成分と同じ変換、すなわち第 $\mu$ 行を使う式です。そのため計量を使って次の行列を用意します。$G^\mu$ はこの章の計算用記号であり、元の Clifford 関係を変更するものではありません。

$$
G^\mu=i\sum_\nu\eta^{\mu\nu}\gamma^\nu,
\quad G^0=-i\gamma^0=H,\quad G^j=i\gamma^j.
$$

$\eta^{\mu\nu}$ は逆計量の成分で、ここでは $\eta^{-1}=\eta$ です。$G$ の反交換関係は $\{G^\mu,G^\nu\}=-2\eta^{\mu\nu}I_4$ になります。元のガンマ行列の符号を保ったまま、添字と実数値の規格化に必要な因子を明示したものです。

<a id="prop-lrep17-vector-matrices"></a>

<!-- formal-statement-start -->
> **命題（ベクトル成分用行列の変換則）**  
> 上記 $G^\mu$ と適正・時間向き保存Lorentz変換 $\Lambda$ の Spin 持ち上げ $S$ について

$$
S^{-1}G^\mu S=\sum_\nu\Lambda^\mu{}_\nu G^\nu.
$$
<!-- formal-statement-end -->

**証明の見取り図。** 逆の共役で現れる逆行列の転置を計量によって元の行列へ戻します。

<!-- proof-start -->
### 証明

[ガンマ行列の共変変換則](../LREP15/index.md#prop-lrep15-gamma-covariance)の逆共役により

$$
S^{-1}G^\mu S
=i\sum_{\nu,\rho}\eta^{\mu\nu}(\Lambda^{-1})^\rho{}_\nu\gamma^\rho.
$$

Lorentz条件 $\Lambda^{\mathsf T}\eta\Lambda=\eta$ の両辺を変形すると $(\Lambda^{-1})^{\mathsf T}=\eta\Lambda\eta^{-1}$ です。従って $\eta^{-1}(\Lambda^{-1})^{\mathsf T}=\Lambda\eta^{-1}$ です。成分で書けば

$$
\sum_\nu\eta^{\mu\nu}(\Lambda^{-1})^\rho{}_\nu
=\sum_\nu\Lambda^\mu{}_\nu\eta^{\nu\rho}.
$$

最初の式へ代入して $i\sum_\rho\eta^{\nu\rho}\gamma^\rho=G^\nu$ を用いれば結論を得ます。$\square$
<!-- proof-end -->

例えば $A=\operatorname{diag}(2,1/2)$ なら $S=\operatorname{diag}(2,1/2,1/2,2)$ です。$\Lambda$ は $z$ 方向のboostで、[回転とboostのSpin持ち上げ](../LREP15/index.md#prop-lrep15-rotation-boost)より $\cosh\chi=17/8$、$\sinh\chi=15/8$（$e^\chi=4$）。$e_1$ から作る時間・第三空間成分は次節でこの変換を直接確かめます。

## 3. 五種類の量を作る

行と列の間に行列を挟むと、行列の共役変換がそのまま量の変換に反映されます。スカラーは変換で値を保つ量、ベクトルは四成分が $\Lambda$ で混ざる量です。二階反対称テンソルは二つの添字がそれぞれ $\Lambda$ で変わり、添字を交換すると符号が逆になる量です。

空間反転では時間を保ち、空間三方向を反転します。[空間反転](../LREP13/index.md#def-lrep13-parity)を $P=\operatorname{diag}(1,-1,-1,-1)$ と書きます。擬スカラーは適正Lorentz変換ではスカラーと同じですが空間反転で符号が変わる量、軸性ベクトルは適正Lorentz変換ではベクトルと同じですが空間反転で通常のベクトルと逆の符号規則を持つ量です。

[chirality演算子](../LREP16/index.md#def-lrep16-chirality)は $\gamma^5=\operatorname{diag}(-I,I)$ です。左右の違いを測るためにこれを挟みます。また行列の交換子 $[X,Y]=XY-YX$ で二つの添字を反対称化します。

<a id="def-lrep17-bilinears"></a>

<!-- formal-statement-start -->
> **定義（Dirac双線形量）**  
> 複素四成分列 $\psi$、その Dirac随伴 $\bar\psi$、上記 $G^\mu,\gamma^5$ に対して、スカラー $s$、擬スカラー $p$、ベクトル $v$、軸性ベクトル $a$、二階反対称テンソル $t$ の候補を次で定める。

$$
s=\bar\psi\psi,\qquad p=i\bar\psi\gamma^5\psi,
$$

$$
v^\mu=\bar\psi G^\mu\psi,\qquad
a^\mu=\bar\psi G^\mu\gamma^5\psi,
$$

$$
t^{\mu\nu}=\bar\psi\,\frac{i}{2}[G^\mu,G^\nu]\psi,
\qquad 0\le\mu,\nu\le3.
$$

> 以下ではこの五種類を Dirac双線形量と呼ぶ。二つの列を別々に取る場合は第一引数に関して共役線形、第二引数に関して線形である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep17-bilinears -->
**定義の確認**。 $\psi=e_1$ を使います。[Dirac随伴](#def-lrep17-dirac-adjoint)は $\bar\psi=(0,0,-i,0)$ です。$\gamma^5e_1=-e_1$ なので $s=p=0$。時間行列は $G^0e_1=ie_3$ で $v^0=(-i)i=1$ です。空間行列は

$$
G^1 e_1=ie_4,\qquad G^2e_1=-e_4,\qquad G^3e_1=ie_3.
$$

従って $v=(1,0,0,1)^{\mathsf T}$、$a=-v$ です。$G^\mu$ は上下を交換するので二つの積は上の成分を上の成分へ移し、下側だけを読む $\bar e_1$ との積は零です。従って全ての $t^{\mu\nu}=0$ です。一般にも $G^\nu G^\mu-G^\mu G^\nu=-(G^\mu G^\nu-G^\nu G^\mu)$ なので $t^{\nu\mu}=-t^{\mu\nu}$ となります。

前節のboostでは $\psi'=2e_1$、随伴も2倍なので $v'=4v$ です。他方、$z$ 方向のboostは時間・第三成分 $(1,1)$ を $(17/8+15/8,15/8+17/8)=(4,4)$ に移します。実際にベクトルの変換と一致します。
<!-- definition-example-end -->

一つの列についてこれらは二次式です。「双線形」という名称にかかわらず、複素数上で二引数とも線形なのではありません。ここでは普通の可換な複素成分を扱い、量子化した場の積の順序問題は扱いません。

## 4. Lorentz変換と空間反転

<a id="prop-lrep17-bilinear-covariance"></a>

<!-- formal-statement-start -->
> **命題（Dirac双線形量の共変性）**  
> 上記 Dirac 空間で $\psi'=S\psi$ とし、$\Lambda$ を $S$ の適正・時間向き保存Lorentz変換とする。五種類の量は

$$
s'=s,\qquad p'=p,
$$

$$
v'^\mu=\sum_\nu\Lambda^\mu{}_\nu v^\nu,\qquad
a'^\mu=\sum_\nu\Lambda^\mu{}_\nu a^\nu,
$$

$$
t'^{\mu\nu}=\sum_{\rho,\sigma}\Lambda^\mu{}_\rho
\Lambda^\nu{}_\sigma t^{\rho\sigma}
$$

> を満たす。
<!-- formal-statement-end -->

**証明の見取り図。** [Dirac随伴の変換則](#prop-lrep17-adjoint-covariance)によって外側の作用が逆行列になるため、間に挟む行列の共役だけを調べれば十分です。

<!-- proof-start -->
### 証明

任意の四次行列 $M$ に対して $\bar\psi'M\psi'=\bar\psi S^{-1}MS\psi$ です。$M=I_4$ では共役は変化しません。[chirality演算子の恒等式](../LREP16/index.md#prop-lrep16-chirality-algebra)より $S^{-1}\gamma^5 S=\gamma^5$ なので $M=i\gamma^5$ も変わりません。これで $s,p$ の保存が従います。

[ベクトル成分用行列の変換則](#prop-lrep17-vector-matrices)を代入すると

$$
v'^\mu=\bar\psi S^{-1}G^\mu S\psi
=\sum_\nu\Lambda^\mu{}_\nu\bar\psi G^\nu\psi.
$$

軸性ベクトルについては中央に $SS^{-1}$ を挿入し、

$$
S^{-1}G^\mu\gamma^5 S
=(S^{-1}G^\mu S)(S^{-1}\gamma^5 S)
=\sum_\nu\Lambda^\mu{}_\nu G^\nu\gamma^5.
$$

従って $a$ にも同じ成分変換が成立します。交換子については

$$
S^{-1}[G^\mu,G^\nu]S
=[S^{-1}G^\mu S,S^{-1}G^\nu S].
$$

右辺を展開すると $\sum_{\rho,\sigma}\Lambda^\mu{}_\rho\Lambda^\nu{}_\sigma[G^\rho,G^\sigma]$ です。両側から随伴と列を掛け、$i/2$ を掛ければ最後の式になります。$\square$
<!-- proof-end -->

適正変換だけでは $s,p$ の区別も $v,a$ の区別も見えません。ここで空間反転のスピノルへの作用を $B=H$ と選びます。これは上下を位相付きで交換する作用です。[空間反転による左右交換](../LREP13/index.md#prop-lrep13-parity-exchange)で用いた単純交換行列は群作用の交換を実現しましたが、そのままでは本講のガンマ行列の時間成分を反転してしまいます。ここではガンマ行列の時間成分を保つ持ち上げを選びます。

<a id="prop-lrep17-parity"></a>

<!-- formal-statement-start -->
> **命題（Dirac双線形量の空間反転）**  
> $B=H=-i\gamma^0$ とし、$\psi'=B\psi$、$P=\operatorname{diag}(1,-1,-1,-1)$ とする。上記五種類の量は

$$
s'=s,\qquad p'=-p,\qquad
v'^\mu=\sum_\nu P^\mu{}_\nu v^\nu,
$$

$$
a'^\mu=-\sum_\nu P^\mu{}_\nu a^\nu,
\qquad
t'^{\mu\nu}=\sum_{\rho,\sigma}P^\mu{}_\rho P^\nu{}_\sigma t^{\rho\sigma}
$$

> と変換される。
<!-- formal-statement-end -->

**証明の見取り図。** $B$ は時間行列と可換、空間行列および chirality演算子と反交換します。

<!-- proof-start -->
### 証明

[Dirac随伴の変換則](#prop-lrep17-adjoint-covariance)で確認した $H^\dagger=H$、$H^2=I_4$ より $B^\dagger HB=H^3=H$ です。従って $\bar\psi'=\bar\psi B^{-1}$ となります。

[ガンマ行列の反交換関係](../LREP15/index.md#def-lrep15-gamma)から $BG^j=-G^jB$、$G^0=B$ です。[chirality演算子の恒等式](../LREP16/index.md#prop-lrep16-chirality-algebra)から $B\gamma^5=-\gamma^5 B$ です。$B^{-1}=B$ なので

$$
B^{-1}G^0B=G^0,\quad
B^{-1}G^jB=-G^j,\quad
B^{-1}\gamma^5B=-\gamma^5.
$$

これは $B^{-1}G^\mu B=\sum_\nu P^\mu{}_\nu G^\nu$ と書けます。$I_4$ は共役で不変、$i\gamma^5$ は負になります。積の共役を二因子へ分けると

$$
B^{-1}G^\mu\gamma^5 B
=-\sum_\nu P^\mu{}_\nu G^\nu\gamma^5.
$$

交換子の二因子にはそれぞれ $P$ が掛かり、$i/2$ は変わりません。両側に $\bar\psi,\psi$ を掛けて五つの式を得ます。$\square$
<!-- proof-end -->

空間反転で $a^0$ は負に、空間成分はそのままになります。例えば角運動量のように、通常の空間ベクトル二本の外積は両方の符号が反転しても同じ向きを保ちます。軸性という名称はこの変換規則を表します。

## 5. 実数値と時間成分

複素成分から作る量が実数であることも確認しましょう。任意の四次行列 $M$ について

$$
(\bar\psi M\psi)^*=\psi^\dagger M^\dagger H\psi
=\bar\psi(HM^\dagger H)\psi.
$$

ここで星は複素数の複素共役です。$M^\sharp=HM^\dagger H$ と略記すると、$M^\sharp=M$ なら全ての $\psi$ に対して値は実数になります。積では $(MN)^\sharp=N^\sharp M^\sharp$、複素数 $c$ について $(cM)^\sharp=c^*M^\sharp$ です。前者は $H^2=I_4$ を中央に挿入すると分かります。

<a id="prop-lrep17-real-bilinears"></a>

<!-- formal-statement-start -->
> **命題（Dirac双線形量の実数値性）**  
> 上記 Weyl 基底の任意の複素四成分列 $\psi$ に対し、五種類の Dirac双線形量の全成分は実数であり、

$$
v^0=\psi^\dagger\psi\ge0
$$

> である。等号は $\psi=0$ のときに限る。
<!-- formal-statement-end -->

**証明の見取り図。** 挟む行列が普通の共役転置ではなく、$H$ を通した共役転置で不変かどうかを確認します。

<!-- proof-start -->
### 証明

$G^0=H$ は Hermitian で $H^2=I_4$ なので $(G^0)^\sharp=H^3=G^0$ です。$G^j=i\gamma^j$ は反 Hermitian で $HG^j=-G^jH$ なので

$$
(G^j)^\sharp=-HG^jH=G^j.
$$

$\gamma^5$ は Hermitian で $H$ と反交換するため $(\gamma^5)^\sharp=-\gamma^5$。よって $(i\gamma^5)^\sharp=(-i)(-\gamma^5)=i\gamma^5$ です。$I_4$ も不変です。[chirality演算子の恒等式](../LREP16/index.md#prop-lrep16-chirality-algebra)による反交換から

$$
(G^\mu\gamma^5)^\sharp
=-\gamma^5G^\mu=G^\mu\gamma^5.
$$

交換子の共役は積の順序を逆にするので

$$
[G^\mu,G^\nu]^\sharp=G^\nu G^\mu-G^\mu G^\nu
=-[G^\mu,G^\nu].
$$

従って $i/2$ を共役した負号がこれを打ち消します。五種類の挟む行列全てが不変なので実数値です。最後に $v^0=\psi^\dagger HH\psi=\psi^\dagger\psi=\sum_{k=1}^4|\psi_k|^2$。非負であり、零なら全成分が零です。$\square$
<!-- proof-end -->

時間成分は正ですが、その値はLorentz変換で保存されるスカラーではありません。第3節では実際に1から4へ変化しました。保存電流の微分方程式は後の講義で導きます。

## 6. 演習

### Level A

<a id="ex-lrep17-a01"></a>

#### LREP17-A01 随伴の計算
- Level: A
- ID: LREP17-A01

$\psi=(1,i,2,0)^{\mathsf T}$ のDirac随伴と $s$ を求めよ。

<!-- solution-start -->
**詳細解答。** [Dirac随伴](#def-lrep17-dirac-adjoint)より $\bar\psi=(ir^\dagger,-iu^\dagger)$ です。$r^\dagger=(2,0)$、$u^\dagger=(1,-i)$ なので $\bar\psi=(2i,0,-i,-1)$。従って $s=2i-2i=0$ です。非零の列でも不定形式の自己収縮は零になります。
<!-- solution-end -->

<a id="ex-lrep17-a02"></a>

#### LREP17-A02 スカラーと擬スカラー
- Level: A
- ID: LREP17-A02

$\psi=(1,0,1+i,0)^{\mathsf T}$ について $s,p$ を求めよ。

<!-- solution-start -->
**詳細解答。** [Dirac随伴](#def-lrep17-dirac-adjoint)は $\bar\psi=(1+i,0,-i,0)$ です。[chirality演算子](../LREP16/index.md#def-lrep16-chirality)で $\gamma^5\psi=(-1,0,1+i,0)^{\mathsf T}$。従って

$$
s=1+i-i(1+i)=2,
\quad p=i[-(1+i)-i(1+i)]=2.
$$

両方とも実数です。
<!-- solution-end -->

<a id="ex-lrep17-a03"></a>

#### LREP17-A03 純粋な右成分
- Level: A
- ID: LREP17-A03

$\psi=e_3=(0,0,1,0)^{\mathsf T}$ の $v,a$ を求めよ。

<!-- solution-start -->
**詳細解答。** [Dirac随伴](#def-lrep17-dirac-adjoint)は $(i,0,0,0)$ です。$G^0e_3=-ie_1$、$G^1e_3=ie_2$、$G^2e_3=-e_2$、$G^3e_3=ie_1$ なので

$$
v^0=i(-i)=1,\quad v^1=v^2=0,\quad v^3=i^2=-1.
$$

[chirality演算子](../LREP16/index.md#def-lrep16-chirality)より $\gamma^5e_3=e_3$ なので $a=v=(1,0,0,-1)^{\mathsf T}$ です。
<!-- solution-end -->

<a id="ex-lrep17-a04"></a>

#### LREP17-A04 反対称な成分の数
- Level: A
- ID: LREP17-A04

$t^{\mu\nu}$ の対角成分と独立成分の個数を求めよ。

<!-- solution-start -->
**詳細解答。** [Dirac双線形量](#def-lrep17-bilinears)の交換子で $[G^\mu,G^\mu]=0$、$[G^\nu,G^\mu]=-[G^\mu,G^\nu]$ です。従って対角は零、上三角の添字 $(0,1),(0,2),(0,3),(1,2),(1,3),(2,3)$ の6成分で全てが決まります。これは反対称テンソルとしての成分数であり、同じ一つのスピノルから作る6個が任意に選べるという意味ではありません。
<!-- solution-end -->

### Level B

<a id="ex-lrep17-b01"></a>

#### LREP17-B01 boostと不定形式
- Level: B
- ID: LREP17-B01

$A=\operatorname{diag}(3,1/3)$、$\psi=(1,0,i,0)^{\mathsf T}$ について $\psi'$、$\bar\psi'\psi'$、普通の長さの二乗を計算せよ。

<!-- solution-start -->
**詳細解答。** [Diracスピノルの群作用](../LREP16/index.md#def-lrep16-dirac)より $Q=\operatorname{diag}(1/3,3)$ なので $\psi'=(3,0,i/3,0)^{\mathsf T}$ です。[Dirac随伴](#def-lrep17-dirac-adjoint)は $\bar\psi'=(1/3,0,-3i,0)$。従って

$$
\bar\psi'\psi'=(1/3)3+(-3i)(i/3)=2.
$$

元の自己収縮も2です。一方普通の長さの二乗は $9+1/9=82/9$ で、元の2から変わります。
<!-- solution-end -->

<a id="ex-lrep17-b02"></a>

#### LREP17-B02 テンソルの時間・空間成分
- Level: B
- ID: LREP17-B02

$\psi=(1,0,1,0)^{\mathsf T}$ に対し $t^{03},t^{12}$ を求めよ。

<!-- solution-start -->
**詳細解答。** [Dirac随伴](#def-lrep17-dirac-adjoint)は $(i,0,-i,0)$。異なる添字では $G^\mu G^\nu=-G^\nu G^\mu$ なので $i[G^\mu,G^\nu]/2=iG^\mu G^\nu$ です。まず

$$
G^3\psi=(i,0,i,0)^{\mathsf T},
\quad G^0 G^3\psi=(1,0,-1,0)^{\mathsf T}.
$$

よって $t^{03}=i(i+i)=-2$ です。次に $G^2\psi=(0,-1,0,-1)^{\mathsf T}$、$G^1G^2\psi=(-i,0,-i,0)^{\mathsf T}$。従って $t^{12}=i[i(-i)+(-i)(-i)]=0$。非零の時間・空間成分は空間反転で符号が変わることを[Dirac双線形量の空間反転](#prop-lrep17-parity)から確認できます。
<!-- solution-end -->

<a id="ex-lrep17-b03"></a>

#### LREP17-B03 空間反転を直接計算する
- Level: B
- ID: LREP17-B03

$\psi=(1,0,1+i,0)^{\mathsf T}$ に $B=H$ を作用させ、$s,p,v^3,a^0$ の変化を直接求めよ。

<!-- solution-start -->
**詳細解答。** [Dirac双線形量](#def-lrep17-bilinears)で $s=2,p=2$（A02）。$HG^3=\gamma^0\gamma^3=\operatorname{diag}(\sigma_3,-\sigma_3)$ なので $v^3=1-|1+i|^2=-1$。$HG^0=I_4$ なので $a^0=-1+|1+i|^2=1$ です。

変換後は $\psi'=(1-i,0,i,0)^{\mathsf T}$、$\bar\psi'=(1,0,1-i,0)$ です。直接掛けると

$$
s'=(1-i)+(1-i)i=2,
$$

$$
p'=i[-(1-i)+(1-i)i]=-2.
$$

$v'^3=|1-i|^2-|i|^2=1$、$a'^0=-|1-i|^2+|i|^2=-1$。よって四つとも[Dirac双線形量の空間反転](#prop-lrep17-parity)と一致します。
<!-- solution-end -->

<a id="ex-lrep17-b04"></a>

#### LREP17-B04 左右の混合が必要な量
- Level: B
- ID: LREP17-B04

$\psi=P_L\psi$ の場合に $s,p,t^{\mu\nu}$ が零、$a=-v$ となることを一般に示せ。$P_L=(I_4-\gamma^5)/2$ とする。

<!-- solution-start -->
**詳細解答。** [chirality射影子](../LREP16/index.md#def-lrep16-chiral-projectors)により $\psi=(u,0)^{\mathsf T}$。$H$ は上下を交換するので $\bar\psi=(0,-iu^\dagger)$ です。$I_4,\gamma^5$ は上側を保ち、$G^\mu G^\nu$ は上下を二回交換するので上側を保ちます。よって随伴との積は全て零です。これで $s=p=t^{\mu\nu}=0$ が従います。さらに $\gamma^5\psi=-\psi$ だから

$$
a^\mu=\bar\psi G^\mu(-\psi)=-v^\mu.
$$

右成分だけの場合は同じブロック計算で $s,p,t$ が零、$\gamma^5\psi=\psi$ より $a=v$ になります。
<!-- solution-end -->

### Level C

<a id="ex-lrep17-c01"></a>

#### LREP17-C01 ベクトルの時間成分とLorentz不変量
- Level: C
- ID: LREP17-C01

任意の $\psi=(u,r)^{\mathsf T}$ に対し、$v^0$ と空間ベクトル $\boldsymbol v=(v^1,v^2,v^3)$ を Weyl 成分で表し、$|\boldsymbol v|\le v^0$ を示せ。さらに $\psi=(1,0,i,0)^{\mathsf T}$ に $A=\operatorname{diag}(2,1/2)$ を作用させ、$v$ のLorentz二次形式が保存されることを直接計算せよ。

<!-- solution-start -->
**詳細解答。** [Dirac双線形量の実数値性](#prop-lrep17-real-bilinears)より $v^0=u^\dagger u+r^\dagger r$ です。$HG^j=\operatorname{diag}(\sigma_j,-\sigma_j)$ なので

$$
v^j=u^\dagger\sigma_j u-r^\dagger\sigma_j r.
$$

二成分列 $w=(a,b)^{\mathsf T}$ に対して三つの実成分をまとめると、[Pauli行列](../LREP5/index.md#def-lrep5-pauli-model)から

$$
\boldsymbol n(w)=(2\operatorname{Re}(a^*b),2\operatorname{Im}(a^*b),|a|^2-|b|^2).
$$

その長さの二乗は

$$
|\boldsymbol n(w)|^2=4|a|^2|b|^2+(|a|^2-|b|^2)^2
=(|a|^2+|b|^2)^2.
$$

平方根の両辺は非負なので $|\boldsymbol n(w)|=w^\dagger w$ です。従って三角不等式により

$$
|\boldsymbol v|=|\boldsymbol n(u)-\boldsymbol n(r)|
\le u^\dagger u+r^\dagger r=v^0.
$$

非零の列なら $v^0>0$ です。つまり $v$ は未来向きの時間的または光的ベクトルであり、$\eta(v,v)=-(v^0)^2+|\boldsymbol v|^2\le0$ です。

指定された列では $u=(1,0)^{\mathsf T}$、$r=(i,0)^{\mathsf T}$ なので $\boldsymbol n(u)=\boldsymbol n(r)=(0,0,1)$、$v=(2,0,0,0)^{\mathsf T}$。二次形式は $-4$ です。

[Diracスピノルの群作用](../LREP16/index.md#def-lrep16-dirac)により $\psi'=(2,0,i/2,0)^{\mathsf T}$。従って

$$
v'^0=4+1/4=17/4,\qquad v'^3=4-1/4=15/4,
\qquad v'^1=v'^2=0.
$$

二次形式は $-(17/4)^2+(15/4)^2=(-289+225)/16=-4$ です。[Dirac双線形量の共変性](#prop-lrep17-bilinear-covariance)では $v'=\Lambda v$ であり、$\Lambda^{\mathsf T}\eta\Lambda=\eta$ から一般にも $(v')^{\mathsf T}\eta v'=v^{\mathsf T}\eta v$ になります。時間成分の値は変わっても計量による収縮は保存されます。
<!-- solution-end -->

## 7. まとめと次講

Dirac随伴は左右の伸縮を打ち消す不定な Hermitian 形式から作ります。随伴と列の間に行列を挟むことで、スカラー、擬スカラー、ベクトル、軸性ベクトル、反対称テンソルを構成できました。空間反転まで調べることで、適正Lorentz変換だけでは区別できない量も区別できます。次講では複素共役を組み合わせたスピノルの変換と、その変換で自分自身に戻る条件を考えます。
