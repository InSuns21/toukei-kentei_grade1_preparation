# QINF31 Haar測度とランダム純粋状態

## 1. 全系は純粋なのに、なぜ小さな部分系は混ざって見えるか

[部分トレース](../QINF3/index.md#def-qinf3-partial-trace)を取ると、純粋な二部状態から混合した縮約状態が生じます。例えば二qubitのBell状態では $\rho_A=I_A/2$、積状態 $|00\rangle$ では $\rho_A=|0\rangle\langle0|$ です。どちらも全系の状態は純粋です。それでは二部系から「特定の純粋状態を選ばず、無作為に」一つ選んだとき、典型的にはどちらに近くなるでしょうか。

固定した基底の係数をそれぞれ一様な乱数にする方法では、基底を変えると状態の分布も変わってしまいます。量子状態に特別な基底を持ち込まずに無作為に選ぶため、**すべてのユニタリ変換で分布が変わらない**ことを求めます。この条件を満たす分布が本講の主役です。

以下は有限次元複素Hilbert空間のみで、$d_A=\dim H_A\ge1$、$d_B=\dim H_B\ge1$、$D=d_Ad_B$ とします。全系は $H=H_A\otimes H_B$ です。$|\psi\rangle$ の長さは1、$\rho_{AB}=|\psi\rangle\langle\psi|$、$\rho_A=\operatorname{Tr}_B\rho_{AB}$ とします。密度演算子の[純粋性](../QINF2/index.md#def-qinf2-purity)は $\operatorname{Tr}\rho_A^2$ です。$d_A\le d_B$ の場合を主に解釈しますが、計算式自体にはこの大小条件は不要です。

## 2. ランダム純粋状態をどう作るか

まず複素標準Gaussian変数 $z=(x+iy)/\sqrt2$ を考えます。$x,y$ は独立な実標準正規変数です。このため $\mathbb E z=0$、$\mathbb E|z|^2=1$。$U(D)$ は $D\times D$ 複素ユニタリ行列全体の群とします。$D$ 個を独立に並べた列ベクトル $g=(z_1,\ldots,z_D)^{\mathsf T}$ を取ります。ここで $^{\mathsf T}$ は転置、$^\dagger$ は[随伴の行列表現](../../../基礎科目/LA/LA5/index.md#def-la5-adjoint)としての共役転置を表し、$g^\dagger g=\sum_{r=1}^D|z_r|^2=\|g\|^2$ です。$g$ の密度は

$$
p(g)=\pi^{-D}\exp(-g^\dagger g)
$$

です。任意のユニタリ $V\in U(D)$ は $\|Vg\|=\|g\|$ を満たします。さらに複素ユニタリ変換を実 $2D$ 次元の線形変換とみなしたとき、実Jacobianの絶対値は $|\det_{\mathbb C}V|^2=1$ です。よって密度の値だけでなく体積要素も保存され、$Vg$ と $g$ は同じ分布になります。連続密度を持つので $\Pr(g=0)=0$ であり、$g/\|g\|$ はほとんど確実に定義できます。

正規化したベクトルの位相を変えても同じ純粋状態を表します。この点は[純粋密度演算子の定義](../QINF2/index.md#def-qinf2-pure-mixed)とも整合しています。

<a id="def-qinf31-haar"></a>

<!-- formal-statement-start -->
> **定義（Haar分布とHaarランダム純粋状態）**
>
> $D\ge1$ とする。ユニタリ行列全体の集合 $U(D)$ 上の確率分布 $\mu$ がすべての固定 $V\in U(D)$ に対して $U\sim\mu$ と $VU\sim\mu$ を同分布にするとき、$\mu$ を**正規化Haar分布**と呼ぶ。$U\sim\mu$、固定単位ベクトル $e\in\mathbb C^D$ に対して $|\psi\rangle=Ue$ としたものを**Haarランダム単位ベクトル**と呼ぶ。対応する $|\psi\rangle\langle\psi|$ を**Haarランダム純粋状態**と呼ぶ。
<!-- formal-statement-end -->

一つのユニタリ $V$ を作用させると状態は $V|\psi\rangle$ に変わりますが、**分布**は変わりません。「各状態がすべて同じ確率」という有限集合の言い方ではなく、分布の不変性が正確な条件です。

<!-- definition-example-start: def-qinf31-haar -->
**定義の確認**（一qubit）。独立な複素Gaussian $z_0,z_1$ を取って $|\psi\rangle=(z_0|0\rangle+z_1|1\rangle)/\sqrt{|z_0|^2+|z_1|^2}$ とします。分母は正で、ノルムは1です。また $Vg$ と $g$ が同分布で $\|Vg\|=\|g\|$ なので、任意の $V\in U(2)$ について $V|\psi\rangle$ の分布は同じです。位相を変えても $|\psi\rangle\langle\psi|$ は変化しません。この球面上の不変分布が、定義中のHaarユニタリ $U$ から得る $Ue$ と実際に同分布であることは、直後の構成定理で確認します。
<!-- definition-example-end -->

定義が空虚でないこと、分布が一意に定まることを証明します。そのために、正方複素Gaussian行列の列へ[複素Gram–Schmidt直交化](../../../基礎科目/LA/LA5/index.md#thm-la5-complex-gram-schmidt)を順番に施す**QR分解**を使います。列が一次独立なら $G=QR$ と一意に分解でき、$Q$ はユニタリ、$R$ は上三角で対角成分が正の実数です。直交化の各段階でベクトルのノルムを正数に取ることで、この位相規約が成り立ちます。

<a id="thm-qinf31-gaussian-haar"></a>

<!-- formal-statement-start -->
> **定理（複素GaussianによるHaar分布の構成と一意性）**
>
> $D\ge1$ とする。独立な複素標準Gaussian成分を持つ $D\times D$ 行列 $G$ のQR分解 $G=QR$（$R$ の対角成分は正）で得られる $Q$ は $U(D)$ の正規化Haar分布に従う。この左不変確率分布は一意であり、右からの固定ユニタリ乗算でも不変である。また、独立な複素標準Gaussianベクトル $g\in\mathbb C^D$ から作る $g/\|g\|$ は $Qe_1$ と同分布で、固定単位ベクトル $e$ の取り方にも依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

複素Gaussian密度は左ユニタリ乗算で変わらず、QRの直交化も左ユニタリ変換と可換です。一意性は、左から掛けても法則が変わらない二つの確率分布から独立に採った行列の積を、どちらから平均しても同じことを使います。列ベクトルの分布はQRの最初の列で判定します。

<!-- proof-start -->
### 証明

**存在。** $G$ の列は確率1で一次独立です。実際、先行列が張る真部分空間は、次のGaussian列の連続密度に対して測度零です。任意の固定ユニタリ $V$ に対し、列の[Gram–Schmidt直交化](../../../基礎科目/LA/LA5/index.md#thm-la5-complex-gram-schmidt)では

$$
\langle Vx,Vy\rangle=\langle x,y\rangle,\qquad
\|Vx\|=\|x\|
$$

が成り立つので、$G=QR$ なら $VG=(VQ)R$ が同じ正対角規約のQR分解です。すなわち $Q(VG)=VQ(G)$。一方Gaussian密度は

$$
p(VG)=\pi^{-D^2}\exp[-\operatorname{Tr}(G^\dagger V^\dagger VG)]
=p(G)
$$

です。$G\mapsto VG$ は各列に同じユニタリを作用させる変換で、実 $2D^2$ 次元でのJacobianの絶対値は $|\det_{\mathbb C}V|^{2D}=1$ です。従って $VG\overset{\mathrm d}=G$、ひいては $VQ\overset{\mathrm d}=Q$ となり、左不変確率分布が構成できました。

**一意性と右不変性。** $\mu,\nu$ を左不変な任意の確率分布とし、$U\sim\mu$、$V\sim\nu$ を独立に選びます。$V^{-1}$ の分布を $\nu^{-1}$ と書きます。固定ユニタリ $W$ に対して

$$
V^{-1}W=(W^{-1}V)^{-1},
$$

かつ $W^{-1}V$ と $V$ は左不変性で同分布です。したがって $\nu^{-1}$ は**右不変**です。任意の有界連続関数 $f$ に対して独立性から二通りに積分すると、

$$
\begin{aligned}
\mathbb E[f(V^{-1}U)]
&=\mathbb E_V\!\left[\mathbb E_U[f(V^{-1}U)\mid V]\right]
 =\int f\,d\mu,\\
\mathbb E[f(V^{-1}U)]
&=\mathbb E_U\!\left[\mathbb E_V[f(V^{-1}U)\mid U]\right]
 =\int f\,d\nu^{-1}.
\end{aligned}
$$

最初の等式は $\mu$ の左不変性、次の等式は $\nu^{-1}$ の右不変性によります。よって $\mu=\nu^{-1}$。特に $\mu=\nu$ と置けば $\nu=\nu^{-1}$。これを任意の二つの左不変分布へ戻すと $\mu=\nu$ で一意性が従い、しかも左不変分布 $\mu$ は逆行列で押し出しても変わらないため右不変でもあります。

**ベクトル。** QRの最初の列は、最初のGaussian列 $g$ を $\|g\|$ で割ったものです。さらに任意の固定単位ベクトル $e$ は $e=We_1$ と表せるので、右不変性より $Qe=QWe_1$ と $Qe_1$ は同分布です。これで主張がすべて従います。
<!-- proof-end -->

したがって、群全体のQR分解を行わず、**複素Gaussianベクトルを1本正規化するだけ**でランダム純粋状態を生成できます。ここで証明したのは全ユニタリに関する不変性です。特定の量子回路をランダムに選んだ場合、それがHaar分布と一致するとは限りません。

## 3. 平均状態は最大混合だが、それだけでは「典型性」は分からない

まず $\rho=|\psi\rangle\langle\psi|$ の平均を考えます。$\mathbb C^D$ の固定した正規直交基底 $|i\rangle$ で $|\psi\rangle=\sum_{i=1}^D\psi_i|i\rangle$ と展開し、$\psi_i=\langle i|\psi\rangle$ をその座標と呼びます。行列 $M=\mathbb E\rho$ はすべてのユニタリ $V$ に対し $VMV^\dagger=M$ を満たします。対角位相行列で非対角成分が零、基底の番号を入れ替えるユニタリで対角成分が等しいことが分かります。

<a id="prop-qinf31-first-moment"></a>

<!-- formal-statement-start -->
> **命題（Haar純粋状態の一次モーメント）**
>
> $|\psi\rangle$ が $\mathbb C^D$ のHaarランダム単位ベクトルなら、

$$
\mathbb E[|\psi\rangle\langle\psi|]=\frac{I_D}{D}.
$$

> 特に $H_A\otimes H_B$ 上で $D=d_Ad_B$ とすると、

$$
\mathbb E[\rho_A]=\frac{I_A}{d_A}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

不変性が平均行列を単位行列の定数倍に限定します。部分トレースは線形なので、期待値と順序を交換できます。

<!-- proof-start -->
### 証明

$M_{ij}=\mathbb E(\psi_i\overline{\psi_j})$ と置きます。$i\ne j$ のとき第 $i$ 座標だけを $e^{i\theta}$ 倍しても分布が同じなので、$M_{ij}=e^{i\theta}M_{ij}$ が任意の $\theta$ で成り立ち、$M_{ij}=0$。座標置換により $M_{11}=\cdots=M_{DD}=c$。さらに $\operatorname{Tr}M=\mathbb E\|\psi\|^2=1$ から $Dc=1$ です。最後に、有限次元での期待値の線形性と[部分トレースの定義](../QINF3/index.md#def-qinf3-partial-trace)を使うと

$$
\mathbb E\rho_A
=\operatorname{Tr}_B\mathbb E\rho_{AB}
=\operatorname{Tr}_B\frac{I_A\otimes I_B}{d_Ad_B}
=\frac{d_B I_A}{d_Ad_B}
=\frac{I_A}{d_A}.
$$
<!-- proof-end -->

注意しましょう。全系の各サンプルは $\operatorname{Tr}\rho_{AB}^2=1$ の純粋状態ですが、その平均 $I_D/D$ のpurityは $1/D$ です。**平均を取った後のpurity** と **purityを取った後の平均** は異なります。部分系でも $\mathbb E\rho_A=I_A/d_A$ だけでは $\mathbb E\operatorname{Tr}\rho_A^2$ は求まりません。ここから二コピーの計算が必要になります。

## 4. purityを二コピーの式に変える

一つの行列 $X$ のトレース $\operatorname{Tr}X^2$ は固有値の二乗和ですが、積 $X^2$ を「2つのコピーを交換する作用」として表すと、ランダム状態の平均を計算しやすくなります。

<a id="def-qinf31-swap"></a>

<!-- formal-statement-start -->
> **定義（交換作用素）**
>
> 有限次元Hilbert空間 $K$ に対し、$K\otimes K$ 上の線形作用素 $F_K$ を単純テンソルに対して

$$
F_K(|u\rangle\otimes|v\rangle)
=|v\rangle\otimes|u\rangle
$$

> と定め、線形に拡張する。これを**交換作用素（swap）**という。$F_K^\dagger=F_K$、$F_K^2=I_{K\otimes K}$ が成り立つ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf31-swap -->
**定義の確認**。$K=\mathbb C^2$ なら $F_K|01\rangle=|10\rangle$、$F_K|00\rangle=|00\rangle$ です。[積基底の定理](../QINF1/index.md#thm-qinf1-product-basis)により $|00\rangle,|01\rangle,|10\rangle,|11\rangle$ は $K\otimes K$ の基底です。定義の $F_K|ij\rangle=|ji\rangle$ に従い、各列 $|ij\rangle$ の像が対応する行 $|ji\rangle$ に係数1を持ち、残りの成分は0です。よってこの基底での行列は

$$
F_K=\begin{pmatrix}1&0&0&0\\0&0&1&0\\0&1&0&0\\0&0&0&1\end{pmatrix}.
$$

この行列は転置共役で不変であり、二回作用させると $|ij\rangle\mapsto|ji\rangle\mapsto|ij\rangle$ となるので二乗は単位行列です。対角成分1は $|00\rangle,|11\rangle$ の2本に対応するので $\operatorname{Tr}F_K=2=\dim K$。一般の正規直交基底 $|i\rangle$ でも $F_K=\sum_{ij}|ij\rangle\langle ji|$、従って $\operatorname{Tr}F_K=\dim K$ です。
<!-- definition-example-end -->

<a id="lem-qinf31-swap-trick"></a>

<!-- formal-statement-start -->
> **補題（swap trick）**
>
> $K$ 上の任意の線形作用素 $X,Y$ と交換作用素 $F_K$ に対して

$$
\operatorname{Tr}[(X\otimes Y)F_K]
=\operatorname{Tr}(XY).
$$

> 特に二部系 $AB$ の任意の密度演算子 $\rho_{AB}$、$\rho_A=\operatorname{Tr}_B\rho_{AB}$ に対し、コピーを $A'B'$ とすると

$$
\operatorname{Tr}\rho_A^2
=\operatorname{Tr}[(\rho_{AB}\otimes\rho_{A'B'})
(F_A\otimes I_{BB'})].
$$

> 後式ではテンソル因子を $AA'BB'$ の順に並べ替えている。
<!-- formal-statement-end -->

### 証明の見取り図

交換作用素は第1コピーの添字と第2コピーの添字を入れ替え、トレースが $X$ と $Y$ の行列積の添字和になります。部分トレースの定義を適用すると、$B,B'$ 側は単位作用素のまま残ります。

<!-- proof-start -->
### 証明

$K$ の正規直交基底を $|i\rangle$ とすると

$$
\operatorname{Tr}[(X\otimes Y)F_K]
=\sum_{i,j}\langle ij|(X\otimes Y)|ji\rangle
=\sum_{i,j}X_{ij}Y_{ji}
=\operatorname{Tr}(XY).
$$

後式では、部分トレースの[成分表示](../QINF3/index.md#def-qinf3-partial-trace)により、$A$ の基底 $|i\rangle$、$B$ の基底 $|\alpha\rangle$ に対して

$$
(\rho_A)_{ij}=\sum_\alpha(\rho_{AB})_{i\alpha,j\alpha}.
$$

従って

$$
\begin{aligned}
\operatorname{Tr}\rho_A^2
&=\sum_{ij}(\rho_A)_{ij}(\rho_A)_{ji}\\
&=\sum_{ij\alpha\beta}
(\rho_{AB})_{i\alpha,j\alpha}
(\rho_{AB})_{j\beta,i\beta}.
\end{aligned}
$$

右辺は二コピーの $A,A'$ を交換し、$B,B'$ の添字をそれぞれ同じにしてトレースを取った成分式に一致します。これは同時に $\operatorname{Tr}[(\rho_A\otimes\rho_A)F_A]$ を意味します。
<!-- proof-end -->

## 5. Haar状態の二次モーメントを自力で導く

二コピーの平均を $M_2=\mathbb E[\rho_{AB}^{\otimes2}]$ とします。ここでは $H=\mathbb C^D$ とみなし、$F=F_H$ を使います。記号 $\delta_{ij}$ は $i=j$ なら1、異なれば0のKronecker記号です。$M_2$ は各サンプルの純粋性を二次まで保存するので、先ほどの一次モーメントより多くの情報を持ちます。

<a id="thm-qinf31-second-moment"></a>

<!-- formal-statement-start -->
> **定理（Haar純粋状態の二次モーメント）**
>
> $D\ge1$ とし、$\rho=|\psi\rangle\langle\psi|$ が $\mathbb C^D$ 上のHaarランダム純粋状態なら、

$$
\mathbb E[\rho\otimes\rho]
=\frac{I_{D^2}+F}{D(D+1)}.
$$

> 基底成分で同値に、

$$
\mathbb E[
\psi_i\overline{\psi_j}\psi_k\overline{\psi_l}]
=\frac{\delta_{ij}\delta_{kl}+\delta_{il}\delta_{kj}}
{D(D+1)}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

位相変換で四次の期待値の非零パターンを絞り、座標の置換で未知の値を2つに減らします。二座標を45度回転して二値の比を決め、最後に $\|\psi\|^4=1$ で正規化します。この証明では表現論の一般定理を使いません。

<!-- proof-start -->
### 証明

$D=1$ では $\rho=1$、$F=I=1$ なので右辺は $(1+1)/2=1$ で成立します。以下 $D\ge2$ とします。$z_i=\psi_i$、$a=\mathbb E|z_1|^4$、$b=\mathbb E(|z_1|^2|z_2|^2)$ とおきます。

各座標の位相を独立に変えても分布は不変なので、積 $z_i\overline z_j z_k\overline z_l$ の期待値は、正符号で出る添字の多重集合 $\{i,k\}$ と負符号で出る添字の多重集合 $\{j,l\}$ が一致しない限り零です。座標の置換対称性を加えると、非零値は「4添字がすべて同じ」場合の $a$ と「2つの異なる添字がそれぞれ1回ずつ出る」場合の $b$ だけです。

次に最初の2座標をユニタリ変換し、$w=(z_1+z_2)/\sqrt2$ とします。不変性により $\mathbb E|w|^4=a$。一方、$\mathbb E(z_1\overline z_2)=0$ となる位相対称性を四次の交差項にも適用すれば、

$$
\begin{aligned}
\mathbb E|w|^4
&=\frac14\mathbb E
[(z_1+z_2)^2(\overline z_1+\overline z_2)^2]\\
&=\frac14(2a+4b)
=\frac a2+b.
\end{aligned}
$$

よって $a=2b$。さらに各サンプルで $\sum_i|z_i|^2=1$ だから、

$$
1=\mathbb E\left(\sum_i|z_i|^2\right)^2
=Da+D(D-1)b
=D(D+1)b.
$$

従って $b=1/[D(D+1)]$、$a=2/[D(D+1)]$。これらの値と消える成分の位置をKronecker記号でまとめれば

$$
\mathbb E[z_i\overline z_jz_k\overline z_l]
=b(\delta_{ij}\delta_{kl}+\delta_{il}\delta_{kj})
$$

です。$I\otimes I$ と $F$ の行列成分がそれぞれこの二つのKronecker積になるので、作用素としての等式が得られます。
<!-- proof-end -->

**直接検算**：$D=2$ では $\mathbb E|z_1|^4=1/3$、$\mathbb E|z_1|^2|z_2|^2=1/6$。$\operatorname{Tr}M_2=[D^2+\operatorname{Tr}F]/[D(D+1)]=(D^2+D)/[D(D+1)]=1$ で、平均した二コピー状態がトレース1のままであることとも整合します。

## 6. 部分系の平均purityは一つの有理式になる

二部系全体の交換作用素は、因子順序 $AA'BB'$ で $F_{AB}=F_A\otimes F_B$ です。この点を曖昧にすると、$d_A$ と $d_B$ の係数が入れ替わるので注意が必要です。

<a id="thm-qinf31-average-purity"></a>

<!-- formal-statement-start -->
> **定理（二部系の平均purity）**
>
> $H_A,H_B$ を有限次元複素Hilbert空間、$d_A,d_B\ge1$ とし、$H_A\otimes H_B$ からHaarランダム純粋状態 $\rho_{AB}$ を選ぶ。$\rho_A=\operatorname{Tr}_B\rho_{AB}$ とすると、

$$
\boxed{\mathbb E\operatorname{Tr}\rho_A^2
=\frac{d_A+d_B}{d_Ad_B+1}.}
$$

> $A$ と $B$ を交換した $\rho_B$ も同じ平均purityを持つ。
<!-- formal-statement-end -->

### 証明の見取り図

[swap trick](#lem-qinf31-swap-trick)でpurityを二コピーのトレースに変え、[Haarの二次モーメント](#thm-qinf31-second-moment)を代入します。単位作用素の項と全系交換作用素の項を、それぞれ別のトレースとして計算します。

<!-- proof-start -->
### 証明

$D=d_Ad_B$ とします。線形性と有限次元の期待値・トレースの交換により

$$
\begin{aligned}
\mathbb E\operatorname{Tr}\rho_A^2
&=\operatorname{Tr}\left[
\mathbb E(\rho_{AB}\otimes\rho_{A'B'})
(F_A\otimes I_{BB'})\right]\\
&=\frac1{D(D+1)}
\operatorname{Tr}\left[
(I_{AA'BB'}+F_A\otimes F_B)
(F_A\otimes I_{BB'})\right].
\end{aligned}
$$

第1項は $\operatorname{Tr}F_A\,\operatorname{Tr}I_{BB'}=d_A d_B^2$ です。第2項では $F_A^2=I_{AA'}$ なので

$$
\operatorname{Tr}\big[(F_A\otimes F_B)
(F_A\otimes I_{BB'})\big]
=\operatorname{Tr}I_{AA'}\,\operatorname{Tr}F_B
=d_A^2d_B.
$$

したがって

$$
\begin{aligned}
\mathbb E\operatorname{Tr}\rho_A^2
&=\frac{d_Ad_B^2+d_A^2d_B}
{d_Ad_B(d_Ad_B+1)}\\
&=\frac{d_A+d_B}{d_Ad_B+1}.
\end{aligned}
$$

$A$ と $B$ を交換しても式は変わりません。これは[Schmidt分解で縮約状態の非零固有値が一致する定理](../QINF6/index.md#thm-qinf6-reduced-spectrum)とも整合します。
<!-- proof-end -->

**具体例と境界値。**

- $d_A=d_B=2$ では平均purityは $(2+2)/(4+1)=4/5$。Bell状態の $1/2$ や積状態の $1$ と異なり、**平均値**はその中間です。
- $d_A=2,d_B=3$ では $(2+3)/(6+1)=5/7$。
- $d_A=1$ または $d_B=1$ なら平均purityは1。片側が1次元なら全系純粋状態に非自明なもつれはありません。
- $d_A$ を固定して $d_B\to\infty$ とすると平均purityは $1/d_A$ へ近づきます。これは最大混合状態のpurityです。

## 7. 「平均」と「ほとんどの状態」を区別する

一つのランダム状態について $\rho_A\approx I_A/d_A$ と言うには、平均との差だけでなく、**確率**を評価する必要があります。行列のHilbert–Schmidtノルムは $\|X\|_2^2=\operatorname{Tr}(X^\dagger X)$。また[トレース距離](../QINF11/index.md#def-qinf11-trace-distance)で使う $\|X\|_1=\operatorname{Tr}\sqrt{X^\dagger X}$ を用い、$T(\rho,\sigma)=\tfrac12\|\rho-\sigma\|_1$ とします。

<a id="prop-qinf31-typicality"></a>

<!-- formal-statement-start -->
> **命題（最大混合からの平均偏差と確率評価）**
>
> 上の二部Haar模型で $\pi_A=I_A/d_A$ とすると、

$$
\mathbb E\|\rho_A-\pi_A\|_2^2
=\frac{d_A^2-1}{d_A(d_Ad_B+1)}.
$$

> さらに任意の $\delta>0$ に対して

$$
\Pr\{T(\rho_A,\pi_A)\ge\delta\}
\le\min\left\{1,\frac{d_A^2-1}
{4(d_Ad_B+1)\delta^2}\right\}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

平方ノルムをpurityとトレースが1であることへ展開し、[二部系の平均purity](#thm-qinf31-average-purity)を使います。確率評価は、非負確率変数 $\|\rho_A-\pi_A\|_2^2$ に[Markovの不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-markov)を適用します。

<!-- proof-start -->
### 証明

$\rho_A$ はHermitianでトレース1なので

$$
\begin{aligned}
\|\rho_A-\pi_A\|_2^2
&=\operatorname{Tr}(\rho_A-\pi_A)^2\\
&=\operatorname{Tr}\rho_A^2
-\frac2{d_A}\operatorname{Tr}\rho_A
+\frac1{d_A^2}\operatorname{Tr}I_A\\
&=\operatorname{Tr}\rho_A^2-\frac1{d_A}.
\end{aligned}
$$

[平均purity公式](#thm-qinf31-average-purity)を代入して通分すると

$$
\mathbb E\|\rho_A-\pi_A\|_2^2
=\frac{d_A+d_B}{d_Ad_B+1}-\frac1{d_A}
=\frac{d_A^2-1}{d_A(d_Ad_B+1)}.
$$

行列の特異値 $s_1,\ldots,s_{d_A}$ に[Cauchy–Schwarzの不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)を使うと

$$
\|X\|_1^2=\left(\sum_i s_i\right)^2
\le d_A\sum_i s_i^2=d_A\|X\|_2^2.
$$

よって $T(\rho_A,\pi_A)^2\le(d_A/4)\|\rho_A-\pi_A\|_2^2$。事象 $T\ge\delta$ では $\|\rho_A-\pi_A\|_2^2\ge4\delta^2/d_A$ です。[Markovの不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-markov)から

$$
\Pr(T\ge\delta)
\le\frac{d_A}{4\delta^2}
\mathbb E\|\rho_A-\pi_A\|_2^2
=\frac{d_A^2-1}{4(d_Ad_B+1)\delta^2}.
$$

確率の上界1も加えれば結論が得られます。
<!-- proof-end -->

たとえば $d_A=2$ を固定し、$d_B$ を十分増やすと任意の固定 $\delta>0$ に対してこの上界は0へ向かいます。これが本講で証明した有限次元の「典型性」の意味です。$d_A$ と $d_B$ を同時に増やすときは右辺の比を評価し直す必要があります。ここで得たのはMarkov不等式による多項式的な上界であり、強い測度集中定理の指数的な評価を証明したわけではありません。

最後に、[von Neumannエントロピー](../QINF17/index.md#def-qinf17-entropy)は $S(\rho_A)=-\operatorname{Tr}\rho_A\log_2\rho_A$ です。$\operatorname{Tr}\rho_A^2$ が分かっただけで $\mathbb E S(\rho_A)$ をその式の単純な対数に置き換えることはできません。純粋状態ごとに成り立つ不等式を平均してよい場合と、非線形関数と期待値を交換できない場合を区別しましょう。厳密なPage型エントロピー評価は次のQINF32で学びます。

## 8. 数値実験：乱数からpurityを再計算する

実装では $d_A\times d_B$ の複素Gaussian行列 $C=(c_{i\alpha})$ を作り、全成分のノルム平方和で規格化します。

$$
\sum_{i,\alpha}|c_{i\alpha}|^2=1,\qquad
|\psi\rangle=\sum_{i,\alpha}c_{i\alpha}|i\rangle_A|\alpha\rangle_B.
$$

固定した $A,B$ の正規直交基底 $|i\rangle_A,|\alpha\rangle_B$ について、[部分トレースの定義](../QINF3/index.md#def-qinf3-partial-trace)から

$$
\begin{aligned}
(\rho_A)_{ij}
&=\sum_{\alpha=1}^{d_B}\langle i\alpha|\psi\rangle\langle\psi|j\alpha\rangle\\
&=\sum_{\alpha=1}^{d_B}c_{i\alpha}\overline{c_{j\alpha}}
=(CC^\dagger)_{ij},\\
\operatorname{Tr}\rho_A^2
&=\sum_{i,j=1}^{d_A}(\rho_A)_{ij}(\rho_A)_{ji}
=\sum_{i,j=1}^{d_A}|(\rho_A)_{ij}|^2.
\end{aligned}
$$

ここで $C$ は $d_A\times d_B$ 行列で、$C^\dagger$ はその共役転置です。特に後式は $\rho_A$ がHermitianであることから導いたもので、固有値分解をしなくても評価できます。実行できる[サンプル実装](assets/haar-sampling.mjs)では乱数種、二部系の次元、標本数を引数に指定します。

実験では各標本のpurity $P_s$ を記録し、標本平均 $\overline P$ と標本標準偏差 $s_P$ から、独立標本を仮定した平均の標準誤差 $s_P/\sqrt N$ を算出します。解析値

$$
P_{\mathrm{theory}}=\frac{d_A+d_B}{d_Ad_B+1}
$$

とのずれを報告します。標準誤差は乱数試行による不確かさであり、理論式の証明でも誤差の確定上界でもありません。特定の乱数種で偶然大きくずれることもあります。

## 9. 演習と詳細解答

<a id="ex-qinf31-a01"></a>

### 演習 A1：Haar生成と不変性

- Level: A
- 問題: $g\in\mathbb C^3$ の成分を独立な複素標準Gaussianとする。$|\psi\rangle=g/\|g\|$ がほとんど確実に定義できる理由、ノルムが1になる理由、任意の固定 $V\in U(3)$ で $V|\psi\rangle$ が同分布となる理由を順に説明せよ。

<!-- solution-start -->
**詳細解答。** $g$ は $\mathbb R^6$ 上の連続密度を持つため、単一点 $g=0$ の確率は零です。従って $\|g\|>0$ が確率1で成り立ち、$\langle g/\|g\|,g/\|g\|\rangle=\|g\|^2/\|g\|^2=1$ です。複素Gaussian密度は $\pi^{-3}e^{-g^\dagger g}$ で、$V^\dagger V=I$ から $(Vg)^\dagger Vg=g^\dagger g$。実6次元での体積もユニタリ変換により保存されるので $Vg\overset{\mathrm d}=g$ です。さらに $\|Vg\|=\|g\|$ なので $V(g/\|g\|)=(Vg)/\|Vg\|$ は元と同分布です。これは[Haar分布の構成](#thm-qinf31-gaussian-haar)のベクトル版です。
<!-- solution-end -->

<a id="ex-qinf31-a02"></a>

### 演習 A2：交換作用素を使う

- Level: A
- 問題: $K=\mathbb C^2$、$X=\operatorname{diag}(2,3)$、$Y=\begin{pmatrix}1&1\\1&4\end{pmatrix}$ とする。[交換作用素](#def-qinf31-swap)の基底表示を使って $\operatorname{Tr}[(X\otimes Y)F_K]$ と $\operatorname{Tr}(XY)$ をそれぞれ求めよ。

<!-- solution-start -->
**詳細解答。** [swap trick](#lem-qinf31-swap-trick)の左辺は $\sum_{ij}X_{ij}Y_{ji}$ です。$X_{01}=X_{10}=0$ だから非対角の2項は消え、残りは $X_{00}Y_{00}+X_{11}Y_{11}=2\cdot1+3\cdot4=14$。右辺は

$$
XY=\begin{pmatrix}2&2\\3&12\end{pmatrix},
\qquad\operatorname{Tr}(XY)=2+12=14.
$$

両者は一致します。$X,Y$ が可換である必要はありません。
<!-- solution-end -->

<a id="ex-qinf31-a03"></a>

### 演習 A3：二次モーメントの数値

- Level: A
- 問題: $D=2$ のHaarランダム単位ベクトル $\psi=(z_1,z_2)^T$ で、$\mathbb E|z_1|^4$、$\mathbb E(|z_1|^2|z_2|^2)$、$\mathbb E|z_1|^2$ を求め、$1=\mathbb E(|z_1|^2+|z_2|^2)^2$ と整合することを示せ。

<!-- solution-start -->
**詳細解答。** [二次モーメント](#thm-qinf31-second-moment)の $D=2$ によって $a=2/[2(3)]=1/3$、$b=1/[2(3)]=1/6$ です。また[一次モーメント](#prop-qinf31-first-moment)から $\mathbb E|z_1|^2=1/2$。直接展開すると

$$
\mathbb E(|z_1|^2+|z_2|^2)^2
=\frac13+2\cdot\frac16+\frac13=1.
$$

同じ式を各サンプルで見れば、正規化条件の二乗そのものです。
<!-- solution-end -->

<a id="ex-qinf31-a04"></a>

### 演習 A4：退化した部分系と極限

- Level: A
- 問題: $(d_A,d_B)=(1,7)$、$(2,2)$、$(2,8)$ で平均purityを計算せよ。また $d_A=2$ 固定で $d_B\to\infty$ とした極限を求めよ。

<!-- solution-start -->
**詳細解答。** [二部系の平均purity](#thm-qinf31-average-purity)へ代入します。

$$
\begin{aligned}
(1,7):&\quad (1+7)/(7+1)=1,\\
(2,2):&\quad (2+2)/(4+1)=4/5,\\
(2,8):&\quad (2+8)/(16+1)=10/17.
\end{aligned}
$$

$d_A=2$ を固定すると $(2+d_B)/(2d_B+1)=(1+2/d_B)/(2+1/d_B)\to1/2$ です。$1/2$ は二次元の最大混合状態 $I_2/2$ のpurityであり、有限 $d_B$ の値をこの極限値と等しいとは言えません。
<!-- solution-end -->

<a id="ex-qinf31-b01"></a>

### 演習 B1：縮約状態の直接計算

- Level: B
- 問題: $H_A=H_B=\mathbb C^2$、$|\psi\rangle=\sqrt{3/4}|00\rangle+\sqrt{1/4}|11\rangle$ とする。部分トレースから $\rho_A$ を求め、purityと最大混合状態からの平方ノルム偏差を求めよ。$|\psi\rangle$ はHaar分布から生成されたと仮定してよいかも説明せよ。

<!-- solution-start -->
**詳細解答。** $|\psi\rangle\langle\psi|$ の対角項は $(3/4)|00\rangle\langle00|$ と $(1/4)|11\rangle\langle11|$ です。非対角項 $|00\rangle\langle11|$ はB側の内積 $\langle1|0\rangle=0$ のため部分トレースで消えます。従って

$$
\rho_A=\begin{pmatrix}3/4&0\\0&1/4\end{pmatrix},
\quad\operatorname{Tr}\rho_A^2=\frac9{16}+\frac1{16}=\frac58.
$$

$\pi_A=I_2/2$ を引くと対角成分は $1/4,-1/4$ なので

$$
\|\rho_A-\pi_A\|_2^2
=\frac1{16}+\frac1{16}=\frac18
=\frac58-\frac12.
$$

これは[平均偏差命題](#prop-qinf31-typicality)の各標本版の展開と一致します。ただしここで指定されたのは特定の1状態であり、ランダム変数の分布を定めたわけではありません。「Haarから生成された」と断言する根拠はありません。
<!-- solution-end -->

<a id="ex-qinf31-b02"></a>

### 演習 B2：Haar四次モーメントを回転から復元

- Level: B
- 問題: $D\ge2$ のHaarランダム単位ベクトルについて $a=\mathbb E|z_1|^4$、$b=\mathbb E|z_1|^2|z_2|^2$ とする。ユニタリ回転 $(z_1,z_2)\mapsto((z_1+z_2)/\sqrt2,(z_1-z_2)/\sqrt2)$ と正規化条件から $a,b$ を導け。位相対称性でどの交差項が消えるか明示せよ。

<!-- solution-start -->
**詳細解答。** 回転後の第1成分も元の $z_1$ と同じ分布なので

$$
a=\frac14\mathbb E[(z_1+z_2)^2
(\overline z_1+\overline z_2)^2].
$$

積を展開すると、$|z_1|^4$ と $|z_2|^4$ が各1個、$|z_1|^2|z_2|^2$ が係数4で現れます。その他の項は例えば $z_1^2\overline z_2^2$、$z_1^2\overline z_1\overline z_2$ などで、ある座標の正負の出現回数が一致しません。その座標だけに位相 $e^{i\theta}$ を掛けて期待値が不変であるため、これらはすべて零です。従って $a=(2a+4b)/4$、すなわち $a=2b$。

$$
1=\mathbb E\left(\sum_{i=1}^D|z_i|^2\right)^2
=Da+D(D-1)b=D(D+1)b
$$

だから $b=1/[D(D+1)]$、$a=2/[D(D+1)]$ です。この議論では独立性を仮定していません。正規化後の成分は一般に独立ではありません。
<!-- solution-end -->

<a id="ex-qinf31-b03"></a>

### 演習 B3：平均混合と高確率を区別する

- Level: B
- 問題: $d_A=2,d_B=8$ とする。$\mathbb E\|\rho_A-I_2/2\|_2^2$ を求め、$T(\rho_A,I_2/2)\ge1/2$ の確率の[一般上界](#prop-qinf31-typicality)を計算せよ。その数値から「すべての状態が最大混合に近い」と結論してよいか。

<!-- solution-start -->
**詳細解答。** $d_Ad_B+1=17$ だから

$$
\mathbb E\|\rho_A-I_2/2\|_2^2
=\frac{2^2-1}{2(17)}
=\frac3{34}.
$$

$\delta=1/2$ とすると上界は

$$
\Pr(T\ge1/2)\le\frac{2^2-1}{4(17)(1/2)^2}
=\frac3{17}.
$$

これは確率が $3/17$ **以下**という粗い保証です。確率零とは言っていませんし、個々の純粋全系状態について必ず部分系が最大混合に近いとも言えません。例えば積状態では $\rho_A$ は純粋になり得ます。Haar分布での確率評価と、全状態に対する一様主張を区別します。
<!-- solution-end -->

<a id="ex-qinf31-b04"></a>

### 演習 B4：Gaussian係数からswap計算へ

- Level: B
- 問題: $d_A=2,d_B=3$ の複素Gaussian行列を正規化して $C=(c_{i\alpha})$ とする。(i) $\rho_A=CC^\dagger$ を導け。(ii) $\operatorname{Tr}\rho_A=1$ を示せ。(iii) $F_A\otimes I_{BB'}$ と $F_A\otimes F_B$ のトレースをそれぞれ求め、平均purityを二次モーメントから出せ。

<!-- solution-start -->
**詳細解答。** [部分トレース](../QINF3/index.md#def-qinf3-partial-trace)より

$$
(\rho_A)_{ij}
=\sum_{\alpha=1}^{3}c_{i\alpha}\overline{c_{j\alpha}}
=(CC^\dagger)_{ij}.
$$

従って $\operatorname{Tr}\rho_A=\sum_{i=1}^2\sum_{\alpha=1}^3|c_{i\alpha}|^2=1$。$\operatorname{Tr}F_A=2$、$\operatorname{Tr}F_B=3$ なので

$$
\operatorname{Tr}(F_A\otimes I_{BB'})
=2\cdot3^2=18,
\quad
\operatorname{Tr}[(F_A\otimes F_B)(F_A\otimes I_{BB'})]
=2^2\cdot3=12.
$$

全次元 $D=6$ を[二次モーメント](#thm-qinf31-second-moment)の分母へ代入すれば、[swap trick](#lem-qinf31-swap-trick)によって

$$
\mathbb E\operatorname{Tr}\rho_A^2
=\frac{18+12}{6\cdot7}
=\frac57.
$$

これは $d_A+d_B=5$、$d_Ad_B+1=7$ の公式と一致します。
<!-- solution-end -->

<a id="ex-qinf31-c01"></a>

### 演習 C1：平均purityから何が言えて、何が言えないか

- Level: C
- 問題: $d_A=m\ge2$、$d_B=n\ge m$ の二部系でHaarランダム純粋状態を取る。(i) $\mathbb E\operatorname{Tr}\rho_A^2-1/m$ を求め、正であることを示せ。(ii) 目標 $\Pr\{T(\rho_A,I_m/m)\ge\delta\}\le\eta$ を $0<\delta,\eta<1$ について本講のMarkov界から保証する、整数 $n$ の十分条件を求めよ。(iii) $\mathbb E S(\rho_A)=\log_2m$ がこれらの式から従うか判断し、理由を述べよ。

<!-- solution-start -->
**詳細解答。** (i) [二部系の平均purity](#thm-qinf31-average-purity)から

$$
\frac{m+n}{mn+1}-\frac1m
=\frac{m(m+n)-(mn+1)}{m(mn+1)}
=\frac{m^2-1}{m(mn+1)}.
$$

$m\ge2$ なので分子 $m^2-1>0$、分母も正です。各標本でpurity $\ge1/m$ ですが、その平均は有限次元で厳密に大きくなります。

(ii) [確率評価](#prop-qinf31-typicality)から、上限を $\eta$ 以下にするには

$$
\frac{m^2-1}{4(mn+1)\delta^2}\le\eta
$$

が十分です。すべて正なので分母を払って $mn+1\ge(m^2-1)/(4\eta\delta^2)$。従って

$$
n\ge\max\left\{m,\
\left\lceil\frac{1}{m}
\left(\frac{m^2-1}{4\eta\delta^2}-1\right)\right\rceil\right\}
$$

を満たす整数なら保証されます。これは確率の上界を満たすための保守的な選び方であり、最小必要次元を求めたわけではありません。

(iii) 従いません。[エントロピー上界の等号条件](../QINF17/index.md#thm-qinf17-entropy-bounds)によれば、各 $\rho_A$ の $S(\rho_A)\le\log_2m$ は $\rho_A=I_m/m$ のときに限り等号です。$n\ge m$ では部分系が最大混合でない純粋全系状態の近傍が存在し、Haar分布はその開集合に正の確率を与えます。従って平均エントロピーは実際には $\log_2m$ より**厳密に小さい**のです。より直接には (i) の平均平方偏差が正なので、少なくとも正の確率で $\rho_A\ne I_m/m$ です。各標本で上界を超えない以上、平均でも厳密な不等号になります。purityの平均値からエントロピーの厳密な平均値までは計算できません。
<!-- solution-end -->

## 10. 次講への橋

本講で得た結果は「ランダムな全系純粋状態の部分系purityの**平均**は正確に計算でき、環境が大きい場合は最大混合に近い状態が高確率になる」というものでした。次のQINF32では固有値に依存するRényi-2エントロピーとvon Neumannエントロピーを区別し、平均をどこまで評価できるかを調べます。Haar分布を仮定する有限次元模型と、具体的な相互作用の時間発展がHaarに近づくかどうかは、引き続き別の問いです。
