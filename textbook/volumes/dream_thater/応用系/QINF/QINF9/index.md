# QINF9 Choi表現とチャネル判定

## 1. 写像のすべての入力を一つの行列へ収める

[QINF7のKraus表示](../QINF7/index.md#thm-qinf7-kraus-existence)は、完全正写像を作用素の和として扱えることを教えてくれました。[QINF8のStinespring表現](../QINF8/index.md#thm-qinf8-stinespring)では環境を用いた実現まで進みました。しかし、線形写像が最初から $\Phi(E_{ij})$ という行列単位上の値で与えられたとき、Kraus作用素を推測するのは遠回りです。

目標は、**一つの有限行列の正半定値性と部分トレースだけで、物理的なチャネルかどうかを判定する**ことです。その行列を入力基底から構成していきます。有限次元複素Hilbert空間 $H_A,H_B$ を取り、$d_A=\dim H_A\ge1$、$d_B=\dim H_B\ge1$ とします。入力 $A$ の正規直交基底 $|i\rangle_A$（$1\le i\le d_A$）と、同じ次元の参照系 $R$ の基底 $|i\rangle_R$ を対応させます。出力には $B$ を使い、**テンソル因子の順序は $R\otimes B$** と固定します。

規格化しないベクトル

$$
|\Omega_{\mathrm{raw}}\rangle_{RA}
=\sum_{i=1}^{d_A}|i\rangle_R|i\rangle_A,
\qquad
\langle\Omega_{\mathrm{raw}}|\Omega_{\mathrm{raw}}\rangle=d_A
$$

を考えます。行列単位 $E_{ij}=|i\rangle_A\langle j|$ の展開により

$$
|\Omega_{\mathrm{raw}}\rangle\langle\Omega_{\mathrm{raw}}|
=\sum_{i,j}|i\rangle\langle j|_R\otimes E_{ij}
$$

です。これは、$R$ の $(i,j)$ ブロックに入力行列単位を一つずつ並べたものです。$A$ 側に未知の線形写像 $\Phi$ を作用させれば、$\Phi(E_{ij})$ がすべて記録されます。

<a id="def-qinf9-choi"></a>

<!-- formal-statement-start -->
> **定義（非規格化Choi行列）**
> 有限次元複素Hilbert空間 $H_A,H_B$、上で固定した $A,R$ の正規直交基底、複素線形写像 $\Phi:L(H_A)\to L(H_B)$ に対し、$R\otimes B$ 上の作用素

$$
C_\Phi
=(\mathrm{id}_R\otimes\Phi)(|\Omega_{\mathrm{raw}}\rangle\langle\Omega_{\mathrm{raw}}|)
=\sum_{i,j=1}^{d_A}|i\rangle\langle j|_R\otimes\Phi(E_{ij})
$$

> を、この基底に関する **非規格化Choi行列** と呼ぶ。$C_\Phi$ は $d_A d_B$ 次正方行列である。
<!-- formal-statement-end -->

ここで $\mathrm{id}_R$ は参照系の行列を変えない写像です。$C_\Phi$ は一般の複素線形写像について定義でき、**定義の時点では正値性もトレース保存も仮定しません**。基底を変えると成分表示は変わりますが、固定した基底に対する判定をしている限り曖昧さはありません。

<!-- definition-example-start: def-qinf9-choi -->
### 定義の確認：恒等チャネルで全ブロックを照合する

**定義の確認**として、写像の全行列単位でブロックを作り、正規化を要求していないことも確かめます。

$H_A=H_B=\mathbb C^2$ とし、$\Phi(X)=X$ を取ります。計算基底では $\Phi(E_{ij})=E_{ij}$ なので、$R\otimes B$ の順に $|00\rangle,|01\rangle,|10\rangle,|11\rangle$ と並べると

$$
C_{\mathrm{id}}
=|00\rangle\langle00|+|00\rangle\langle11|
 +|11\rangle\langle00|+|11\rangle\langle11|
=\begin{pmatrix}
1&0&0&1\\
0&0&0&0\\
0&0&0&0\\
1&0&0&1
\end{pmatrix}.
$$

これは $|00\rangle+|11\rangle$ の射影であり、固有値は $2,0,0,0$ です。すべて非負ですが、$\operatorname{Tr}C_{\mathrm{id}}=2$ なので**密度演算子ではありません**。そもそも定義は密度演算子であることを要求していません。後でトレース保存の条件を調べると $\operatorname{Tr}_B C_{\mathrm{id}}=I_R$ も分かります。
<!-- definition-example-end -->

### 規格化した最大エンタングル状態との係数

[QINF8の最小環境の議論](../QINF8/index.md#thm-qinf8-environment-freedom)で用いた単位ベクトルは $|\Omega\rangle=|\Omega_{\mathrm{raw}}\rangle/\sqrt{d_A}$ でした。同じ写像をその射影へ作用させて得る作用素を $J_\Phi$ と書くなら

$$
J_\Phi=(\mathrm{id}_R\otimes\Phi)(|\Omega\rangle\langle\Omega|)
=\frac{C_\Phi}{d_A}.
$$

$\Phi$ が量子チャネルなら、$J_\Phi$ は正値かつトレース1で、参照系と出力系の密度演算子です。文献によっては $J_\Phi$ 自体を「Choi行列」と呼びます。この章では **常に非規格化した $C_\Phi$** を判定に用いるため、後のトレース保存条件に係数 $d_A$ が現れません。

## 2. Choi行列から写像を復元する

$C_\Phi$ が作用をすべて収めたと言うには、任意の入力 $X$ から $\Phi(X)$ を取り出せなければなりません。入力を $X=\sum_{i,j}x_{ij}E_{ij}$ と展開したとき、係数 $x_{ij}$ をChoi行列の $(i,j)$ ブロックに掛ければよいはずです。

その操作は部分トレースで表せます。ただし **$X$ の転置 $X^{\mathsf T}$ が参照系側へ掛かる**ことが重要です。転置は固定した入力基底に関する通常の転置であり、複素共役転置 $X^\dagger$ ではありません。

<a id="thm-qinf9-reconstruction"></a>

<!-- formal-statement-start -->
> **定理（Choi行列による写像の再構成）**
> 有限次元複素Hilbert空間 $H_A,H_B$ と固定した $A\cong R$ の正規直交基底について、任意の複素線形写像 $\Phi:L(H_A)\to L(H_B)$ とすべての $X\in L(H_A)$ に対し

$$
\boxed{\displaystyle
\Phi(X)=\operatorname{Tr}_R\bigl[(X^{\mathsf T}\otimes I_B)C_\Phi\bigr]}
$$

> が成立する。特に $C_\Phi=C_\Psi$ なら $\Phi=\Psi$ であり、逆に任意の $C\in L(H_R\otimes H_B)$ は右辺によって唯一の複素線形写像を定め、そのChoi行列は $C$ である。
<!-- formal-statement-end -->

### 証明の見取り図

[部分トレースの基底公式](../QINF3/index.md#def-qinf3-partial-trace)を $R$ に適用します。$X^{\mathsf T}$ を $|i\rangle\langle j|$ に掛けてトレースすると $x_{ij}$ が現れます。その後、各 $E_{ij}$ の値を線形結合します。逆向きは $C$ の $(i,j)$ ブロックを取り出して確かめます。

<!-- proof-start -->
### 証明

$X=\sum_{k,l}x_{kl}|k\rangle\langle l|$ と置きます。固定基底で $X^{\mathsf T}=\sum_{k,l}x_{kl}|l\rangle\langle k|$ です。行列単位の積は

$$
|l\rangle\langle k|i\rangle\langle j|
=\delta_{ki}|l\rangle\langle j|,
\qquad
\operatorname{Tr}(|l\rangle\langle j|)=\delta_{lj}
$$

なので、$\operatorname{Tr}(X^{\mathsf T}E_{ij})=x_{ij}$ です。従って

$$
\begin{aligned}
\operatorname{Tr}_R[(X^{\mathsf T}\otimes I_B)C_\Phi]
&=\sum_{i,j}\operatorname{Tr}(X^{\mathsf T}|i\rangle\langle j|)\,\Phi(E_{ij})\\
&=\sum_{i,j}x_{ij}\Phi(E_{ij})
=\Phi\Bigl(\sum_{i,j}x_{ij}E_{ij}\Bigr)
=\Phi(X).
\end{aligned}
$$

一方、任意の $C$ は参照系のブロック $C_{ij}=(\langle i|\otimes I_B)C(|j\rangle\otimes I_B)$ を使って $C=\sum_{i,j}|i\rangle\langle j|\otimes C_{ij}$ と一意に展開できます。右辺の公式で定まる $\Phi_C$ に $X=E_{ij}$ を代入すると

$$
\Phi_C(E_{ij})
=\sum_{k,l}\operatorname{Tr}(E_{ji}E_{kl})C_{kl}
=\sum_{k,l}\delta_{ik}\delta_{jl}C_{kl}=C_{ij}.
$$

従って $C_{\Phi_C}=\sum_{i,j}|i\rangle\langle j|\otimes C_{ij}=C$ です。$\square$
<!-- proof-end -->

### 転置を落とすと何が壊れるか

例えば $X=E_{01}$ と恒等チャネルに対し、$\operatorname{Tr}_R[(E_{10}\otimes I)C_{\mathrm{id}}]=E_{01}$ ですが、誤って $E_{01}$ を掛けると $E_{10}$ を取り出します。行列単位の添字が反転してしまうため、一般の $X$ を正しく再構成できません。後の演習では転置の位置を別の写像でも検算します。

## 3. 完全正値性は正半定値性と同値になる

[完全正写像の定義](../QINF7/index.md#def-qinf7-positive-cp)では、入力に任意の補助系を付けても正の作用素を正の作用素へ送ることを要求しました。補助系の次元をいくつでも検査する代わりに、たった一つの $d_A d_B$ 次行列を調べれば十分というのがChoiの判定です。

ここで $K:H_A\to H_B$ に対し、入力列を $R\otimes B$ 上に並べる操作

$$
|K\rangle\!\rangle
=\sum_i|i\rangle_R\otimes K|i\rangle_A
$$

を用います。これは固定基底に関する **列のベクトル化** で、$|K\rangle\!\rangle=(I_R\otimes K)|\Omega_{\mathrm{raw}}\rangle$ です。たとえば $K=I_2$ なら $|K\rangle\!\rangle=|00\rangle+|11\rangle$ になります。

<a id="thm-qinf9-cp"></a>

<!-- formal-statement-start -->
> **定理（Choi行列の正半定値性と完全正値性）**
> 有限次元複素Hilbert空間 $H_A,H_B$ と任意の複素線形写像 $\Phi:L(H_A)\to L(H_B)$ について、次は同値である。
>
> 1. $\Phi$ は完全正である。
> 2. 非規格化Choi行列 $C_\Phi$ は正半定値、すなわち $C_\Phi=C_\Phi^\dagger$ かつ $\langle v,C_\Phi v\rangle\ge0$（任意の $v\in H_R\otimes H_B$）である。
> 3. $\Phi(X)=\sum_{\alpha=1}^rK_\alpha X K_\alpha^\dagger$ と書ける有限個の作用素 $K_\alpha:H_A\to H_B$ が存在する。
>
> さらに、3が成立するとき

$$
C_\Phi=\sum_{\alpha=1}^r|K_\alpha\rangle\!\rangle
\langle\!\langle K_\alpha|
$$

> となり、2のスペクトル分解から3の作用素を構成できる。
<!-- formal-statement-end -->

### 証明の見取り図

完全正なら、正半定値の $|\Omega_{\mathrm{raw}}\rangle\langle\Omega_{\mathrm{raw}}|$ に $\mathrm{id}_R\otimes\Phi$ を作用させたものも正半定値です。逆にChoi行列を固有ベクトルの射影へ分け、各ベクトルを「Kraus作用素の列」へ戻します。これは[QINF7で示したKraus存在定理](../QINF7/index.md#thm-qinf7-kraus-existence)の構成を、判定手順として再利用するものです。

<!-- proof-start -->
### 証明

1が成立するなら、[完全正値性の定義](../QINF7/index.md#def-qinf7-positive-cp)を補助系 $R\cong\mathbb C^{d_A}$ と正値作用素 $|\Omega_{\mathrm{raw}}\rangle\langle\Omega_{\mathrm{raw}}|$ に適用して、$C_\Phi\ge0$ です。

3が成立する場合は $\Phi(E_{ij})=\sum_\alpha K_\alpha|i\rangle\langle j|K_\alpha^\dagger$ を定義式へ代入します。和の順序を入れ替えると

$$
\begin{aligned}
C_\Phi
&=\sum_{\alpha,i,j}|i\rangle\langle j|\otimes
K_\alpha|i\rangle\langle j|K_\alpha^\dagger\\
&=\sum_\alpha
\Bigl(\sum_i|i\rangle\otimes K_\alpha|i\rangle\Bigr)
\Bigl(\sum_j\langle j|\otimes\langle j|K_\alpha^\dagger\Bigr)\\
&=\sum_\alpha|K_\alpha\rangle\!\rangle
\langle\!\langle K_\alpha|.
\end{aligned}
$$

各項は正半定値なので2が従います。逆に2を仮定します。[LA5の有限次元スペクトル定理](../../../基礎科目/LA/LA5/index.md#thm-la5-normal-spectral)を自己共役な $C_\Phi$ に適用し、正の固有値 $\lambda_\alpha>0$ と単位固有ベクトル $u_\alpha$ について

$$
C_\Phi=\sum_{\alpha=1}^r\lambda_\alpha|u_\alpha\rangle\langle u_\alpha|
=\sum_{\alpha=1}^r|w_\alpha\rangle\langle w_\alpha|,
\quad w_\alpha=\sqrt{\lambda_\alpha}\,u_\alpha
$$

と分解します。$C_\Phi=0$ なら $r=0$ として零写像の表示（または零作用素一つ）を取ればよいので、以下は $r\ge1$ とします。$R\otimes B$ のベクトル $w_\alpha$ を $w_\alpha=\sum_i|i\rangle_R\otimes|k_{\alpha i}\rangle_B$ と展開し、$K_\alpha|i\rangle=|k_{\alpha i}\rangle$ で作用素を定義します。このとき $|K_\alpha\rangle\!\rangle=w_\alpha$ です。

$\Psi(X)=\sum_\alpha K_\alpha X K_\alpha^\dagger$ とすると、すでに示した等式により $C_\Psi=\sum_\alpha|w_\alpha\rangle\langle w_\alpha|=C_\Phi$ です。[再構成定理](#thm-qinf9-reconstruction)で $\Psi=\Phi$ と分かり、3が成立します。最後に[Kraus表示の完全正値性](../QINF7/index.md#thm-qinf7-kraus-cptp)から3は1を含意します。$\square$
<!-- proof-end -->

この定理で検査するのは、Choi行列の「成分が非負」という条件ではありません。**固有値がすべて非負である**という正半定値性です。エルミート性がなければ、固有値の符号を調べるだけで済ませることもできません。

### 正値なのに完全正ではない：転置写像

転置 $T(X)=X^{\mathsf T}$ は正の行列を正に写します。実際 $X\ge0$ なら、任意の $v$ について $v^\dagger X^{\mathsf T}v=\overline v^{\dagger}X\overline v\ge0$ です。しかし[QINF7の転置の反例](../QINF7/index.md#prop-qinf7-transpose)で見たとおり完全正ではありません。

qubitの計算基底で $T(E_{ij})=E_{ji}$ を定義式へ入れると

$$
C_T=\sum_{i,j}|i\rangle\langle j|\otimes|j\rangle\langle i|
=\begin{pmatrix}
1&0&0&0\\
0&0&1&0\\
0&1&0&0\\
0&0&0&1
\end{pmatrix}.
$$

この作用素は二つのテンソル因子を交換するswap作用素です。反対称ベクトル $|\psi_-\rangle=(|01\rangle-|10\rangle)/\sqrt2$ に作用させると $C_T|\psi_-\rangle=-|\psi_-\rangle$ であり、期待値は $-1$ です。従って $C_T\not\ge0$。**正値性だけでは補助系と組にした状態を守れない**という失敗の機構が、負固有値として露出します。

## 4. トレース保存は入力側の部分トレースで判定する

完全正値性だけではチャネルとは限りません。さらにすべての入力 $X$ のトレースを保存する必要があります。この条件は $R$ 側、つまり**入力に対応する側**の恒等行列を生む部分トレースに翻訳できます。

<a id="thm-qinf9-tp"></a>

<!-- formal-statement-start -->
> **定理（Choi行列によるトレース保存条件）**
> 有限次元複素Hilbert空間 $H_A,H_B$ と複素線形写像 $\Phi:L(H_A)\to L(H_B)$ について、$\operatorname{Tr}\Phi(X)=\operatorname{Tr}X$ がすべての $X\in L(H_A)$ に成り立つことと

$$
\boxed{\operatorname{Tr}_B C_\Phi=I_R}
$$

> は同値である。従って $\Phi$ が量子チャネル（CPTP）であるための必要十分条件は、$C_\Phi\ge0$ かつ $\operatorname{Tr}_B C_\Phi=I_R$ である。
<!-- formal-statement-end -->

### 証明の見取り図

部分トレースで $B$ の各ブロックを一個の数 $\operatorname{Tr}\Phi(E_{ij})$ にします。トレース保存の要求は、入力基底の行列単位でその数が $\delta_{ij}$ になることと同値です。最後に[完全正値性判定](#thm-qinf9-cp)と組み合わせます。

<!-- proof-start -->
### 証明

[部分トレースの定義](../QINF3/index.md#def-qinf3-partial-trace)とChoi行列の展開より

$$
\operatorname{Tr}_B C_\Phi
=\sum_{i,j}|i\rangle\langle j|_R\,\operatorname{Tr}\Phi(E_{ij}).
$$

トレース保存なら、$\operatorname{Tr}\Phi(E_{ij})=\operatorname{Tr}E_{ij}=\delta_{ij}$ ですから、この和は $\sum_i|i\rangle\langle i|=I_R$ になります。

逆に $\operatorname{Tr}_B C_\Phi=I_R$ とすると、行列の $(i,j)$ 成分を比較して $\operatorname{Tr}\Phi(E_{ij})=\delta_{ij}$ です。任意の $X=\sum_{i,j}x_{ij}E_{ij}$ に対して

$$
\operatorname{Tr}\Phi(X)
=\sum_{i,j}x_{ij}\operatorname{Tr}\Phi(E_{ij})
=\sum_i x_{ii}=\operatorname{Tr}X
$$

となります。CPTPの同値は[量子チャネルの定義](../QINF7/index.md#def-qinf7-channel)と[Choiの完全正値性判定](#thm-qinf9-cp)によります。$\square$
<!-- proof-end -->

同じ計算で、**単位的**（unital）、すなわち $\Phi(I_A)=I_B$ という別の条件は

$$
\operatorname{Tr}_R C_\Phi
=\sum_i\Phi(E_{ii})=\Phi(I_A)=I_B
$$

と同値です。入力側の $\operatorname{Tr}_B$ と出力側の $\operatorname{Tr}_R$ を混同しないでください。$d_A\ne d_B$ の場合、同時にトレース保存かつ単位的な写像が存在すれば、両側のトレースを取って $d_A=d_B$ が必要になることも分かります。

### Choi行列からKrausの完全性関係へ

[Choiのスペクトル構成](#thm-qinf9-cp)で得た $K_\alpha$ に対しては

$$
\operatorname{Tr}_B C_\Phi
=\sum_{\alpha,i,j}|i\rangle\langle j|\,
\langle j|K_\alpha^\dagger K_\alpha|i\rangle
=\left(\sum_\alpha K_\alpha^\dagger K_\alpha\right)^{\mathsf T}.
$$

ここで右辺の転置は $R$ の基底を入力基底と同定しているためです。$\operatorname{Tr}_B C_\Phi=I_R$ は $\sum_\alpha K_\alpha^\dagger K_\alpha=I_A$ に一致し、[QINF7のKraus完全性関係](../QINF7/index.md#thm-qinf7-kraus-cptp)と矛盾しません。

## 5. 行列のrankは何を数えているか

同じチャネルにKraus表示はいくつもあります。それでも、**何個より少なくできないか**はChoi行列のrankで確定します。これは[QINF8の最小環境次元](../QINF8/index.md#thm-qinf8-environment-freedom)と同じ量です。

<a id="prop-qinf9-choi-rank"></a>

<!-- formal-statement-start -->
> **命題（Choi rankと最小Kraus数）**
> 有限次元完全正写像 $\Phi:L(H_A)\to L(H_B)$ のChoi行列を $C_\Phi$ とする。零写像を除き、$r=\operatorname{rank}C_\Phi$ は $\Phi$ のすべてのKraus表示に必要な作用素個数の最小値である。$\Phi$ が量子チャネルなら、この数 $r$ は最小Stinespring環境の次元にも等しい。
<!-- formal-statement-end -->

### 証明の見取り図

Kraus作用素が $m$ 個あれば、Choi行列は $m$ 個の階数1以下の行列の和です。逆に正のChoi行列の正固有値 $r$ 本から、ちょうど $r$ 個を作れます。環境との対応には[Stinespringの構成](../QINF8/index.md#thm-qinf8-stinespring)を使います。

<!-- proof-start -->
### 証明

任意のKraus表示 $\Phi(X)=\sum_{\alpha=1}^{m}K_\alpha X K_\alpha^\dagger$ に対し、[ChoiのKrausベクトル表示](#thm-qinf9-cp)から

$$
\operatorname{Ran}C_\Phi
\subseteq\operatorname{span}\{|K_1\rangle\!\rangle,\ldots,|K_m\rangle\!\rangle\}
$$

です。従って $r=\operatorname{rank}C_\Phi\le m$ です。他方、$C_\Phi$ の正の固有値はrankと同数の $r$ 本であり、[スペクトルからの構成](#thm-qinf9-cp)は作用素をちょうど $r$ 個与えます。これで最小性が確定します。

チャネルのとき、この最小Kraus表示から[Stinespring等長写像](../QINF8/index.md#thm-qinf8-stinespring) $V=\sum_{\alpha=1}^{r}K_\alpha\otimes|\alpha\rangle_E$ を作れば、環境次元は $r$ です。逆に次元 $m$ の環境を持つ任意のStinespring表現を環境基底で展開すると $m$ 個以下のKraus作用素が得られるため、$m\ge r$ です。$\square$
<!-- proof-end -->

零写像ではChoi行列のrankは0です。零個の和を許せば最小Kraus数も0ですが、零作用素一個を便宜的に書く慣習もあります。量子チャネルはトレース保存なので零写像にはなりません。

### 二つのqubit雑音をChoi行列で検査する

まず $Z=\operatorname{diag}(1,-1)$、$0\le p\le1$ とし、位相反転の確率的混合 $\mathcal D_p(X)=(1-p)X+pZXZ$ を取ります。[QINF7のKraus判定](../QINF7/index.md#thm-qinf7-kraus-cptp)によりチャネルで、非対角成分に掛かる係数は $t=1-2p$ です。行列単位を順に送ると

$$
C_{\mathcal D_p}
=\begin{pmatrix}
1&0&0&t\\
0&0&0&0\\
0&0&0&0\\
t&0&0&1
\end{pmatrix},\qquad
\operatorname{spec}(C_{\mathcal D_p})=\{2(1-p),2p,0,0\}.
$$

$\operatorname{Tr}_B C=I_R$ で、固有値は $0\le p\le1$ なら非負です。$0<p<1$ ではChoi rank 2、$p=0,1$ ではrank 1となり、両端点はそれぞれ $I$ または $Z$ によるユニタリ共役です。「位相反転が確率1」であってもランダム雑音の枝が二つ必要なわけではありません。

続いて $0\le\gamma\le1$ の振幅減衰チャネル $\mathcal A_\gamma$ を扱います。[QINF7の振幅減衰](../QINF7/index.md#thm-qinf7-kraus-cptp)のKraus作用素

$$
K_0=\begin{pmatrix}1&0\\0&\sqrt{1-\gamma}\end{pmatrix},
\qquad K_1=\sqrt\gamma|0\rangle\langle1|
$$

から、$|K_0\rangle\!\rangle=|00\rangle+\sqrt{1-\gamma}|11\rangle$、$|K_1\rangle\!\rangle=\sqrt\gamma|10\rangle$ です。よって

$$
C_{\mathcal A_\gamma}
=\begin{pmatrix}
1&0&0&\sqrt{1-\gamma}\\
0&0&0&0\\
0&0&\gamma&0\\
\sqrt{1-\gamma}&0&0&1-\gamma
\end{pmatrix}.
$$

これは二つの正値階数1項の和です。$\operatorname{Tr}_B C=\operatorname{diag}(1,\gamma+1-\gamma)=I_R$ なのでCPTPです。$\gamma=0$ のrankは1、$0<\gamma\le1$ のrankは2です。$\operatorname{Tr}_R C=\operatorname{diag}(1+\gamma,1-\gamma)$ だから、$\gamma>0$ では単位的ではありません。この例は、トレース保存と単位的が別条件であることも示します。

## 6. 判定の順序と使える範囲

未知の複素線形写像 $\Phi$ が入力基底の行列単位上で与えられたとき、次の順序で調べられます。

1. $R\otimes B$ の順序を固定して $C_\Phi=\sum_{i,j}|i\rangle\langle j|\otimes\Phi(E_{ij})$ を作る。
2. $C_\Phi=C_\Phi^\dagger$ を確かめ、固有値または二次形式で $C_\Phi\ge0$ を判定する。失敗すれば完全正ではない。
3. $\operatorname{Tr}_B C_\Phi=I_R$ を検査する。完全正と併せて成立すれば量子チャネルである。
4. 必要なら正固有値と固有ベクトルからKraus作用素を構成する。最小個数は $\operatorname{rank}C_\Phi$ である。
5. 実際の入力への作用は $\operatorname{Tr}_R[(X^{\mathsf T}\otimes I_B)C_\Phi]$ で再構成できる。

たとえば転置は手順3を満たしても手順2で失敗します。逆に $\Phi(X)=2X$ は $C_\Phi=2C_{\mathrm{id}}\ge0$ で手順2を満たしても、$\operatorname{Tr}_B C_\Phi=2I_R$ なので手順3で失敗します。**二つの条件の片方だけでチャネルとは言えません。**

最後に適用範囲を確認します。ここでの完全正値性の有限行列判定、スペクトル分解、最小Kraus数の議論はすべて**有限次元**で証明しました。無限次元の正規性・収束の問題を無条件に持ち込むものではありません。また $C_\Phi$ の成分や $X^{\mathsf T}$ は基底に依存しますが、固定基底で得た「正半定値か」「トレース保存か」という物理的判定は基底の取り方に左右されません。

## 7. 演習：Choi行列を作る・判定する・戻す

以下はすべて $H_A=H_B=\mathbb C^2$、計算基底 $|0\rangle,|1\rangle$ とし、Choi行列の基底順序を $|00\rangle,|01\rangle,|10\rangle,|11\rangle$（参照・出力の順）とします。$E_{ij}=|i\rangle\langle j|$ と置きます。問題ごとの写像はすべて複素線形に延長してください。

<a id="ex-qinf9-a01"></a>
### QINF9-A01 規格化はどこに現れるか

- Level: A

恒等写像 $\mathcal I(X)=X$ の非規格化Choi行列 $C_{\mathcal I}$ を求め、そのトレースとrankを計算せよ。さらに規格化最大エンタングル状態から作る $J_{\mathcal I}$ のトレースを求めよ。

<!-- solution-start -->
### 詳細解答

定義から $C_{\mathcal I}=\sum_{i,j}|i\rangle\langle j|\otimes E_{ij}=|\Omega_{\mathrm{raw}}\rangle\langle\Omega_{\mathrm{raw}}|$ です。$|\Omega_{\mathrm{raw}}\rangle=|00\rangle+|11\rangle$ のノルム二乗は2なので

$$
C_{\mathcal I}=\begin{pmatrix}1&0&0&1\\0&0&0&0\\0&0&0&0\\1&0&0&1\end{pmatrix},
\quad \operatorname{Tr}C_{\mathcal I}=1+1=2,
\quad \operatorname{rank}C_{\mathcal I}=1.
$$

$|\Omega\rangle=(|00\rangle+|11\rangle)/\sqrt2$ から作るものは $J_{\mathcal I}=|\Omega\rangle\langle\Omega|=C_{\mathcal I}/2$ です。よって $\operatorname{Tr}J_{\mathcal I}=2/2=1$ です。rankは係数を正数倍しても変わらず1です。
<!-- solution-end -->

<a id="ex-qinf9-a02"></a>
### QINF9-A02 転置の添字を追う

- Level: A

$\Phi(E_{00})=E_{00}$、$\Phi(E_{11})=E_{11}$、$\Phi(E_{01})=2E_{01}$、$\Phi(E_{10})=2E_{10}$ とする。$C_\Phi$ を求め、$X=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ を[Choi再構成公式](#thm-qinf9-reconstruction)へ代入して $\Phi(X)$ を計算せよ。

<!-- solution-start -->
### 詳細解答

Choi行列の参照系 $(i,j)$ ブロックに $\Phi(E_{ij})$ を置くので

$$
C_\Phi=\begin{pmatrix}1&0&0&2\\0&0&0&0\\0&0&0&0\\2&0&0&1\end{pmatrix}.
$$

$X^{\mathsf T}=aE_{00}+cE_{01}+bE_{10}+dE_{11}$ で、$\operatorname{Tr}(X^{\mathsf T}E_{ij})=x_{ij}$ です。従って

$$
\begin{aligned}
\operatorname{Tr}_R[(X^{\mathsf T}\otimes I)C_\Phi]
&=a\Phi(E_{00})+b\Phi(E_{01})+c\Phi(E_{10})+d\Phi(E_{11})\\
&=\begin{pmatrix}a&2b\\2c&d\end{pmatrix}.
\end{aligned}
$$

特に $b,c$ が交換されていないのは、掛けるのが $X$ ではなく $X^{\mathsf T}$ だからです。この写像は $C_\Phi$ の $|00\rangle\pm|11\rangle$ 方向の固有値が $3,-1$ となるため、完全正ではありません。
<!-- solution-end -->

<a id="ex-qinf9-a03"></a>
### QINF9-A03 対角成分だけを残す写像

- Level: A

$\Delta(X)=E_{00}XE_{00}+E_{11}XE_{11}$ についてChoi行列、固有値、$\operatorname{Tr}_B C_\Delta$ を求めよ。さらに最小Kraus数を答えよ。

<!-- solution-start -->
### 詳細解答

$\Delta(E_{00})=E_{00}$、$\Delta(E_{11})=E_{11}$、$\Delta(E_{01})=\Delta(E_{10})=0$ です。従って

$$
C_\Delta=|00\rangle\langle00|+|11\rangle\langle11|
=\operatorname{diag}(1,0,0,1).
$$

固有値は $1,1,0,0$ ですから $C_\Delta\ge0$ です。[Choiの部分トレース判定](#thm-qinf9-tp)では、$\operatorname{Tr}_B|00\rangle\langle00|=|0\rangle\langle0|$、$\operatorname{Tr}_B|11\rangle\langle11|=|1\rangle\langle1|$ より $\operatorname{Tr}_B C_\Delta=I_R$。従ってCPTPです。rankが2なので[最小Kraus数の命題](#prop-qinf9-choi-rank)により2個必要で、問題中の $E_{00},E_{11}$ はその最小表示です。
<!-- solution-end -->

<a id="ex-qinf9-a04"></a>
### QINF9-A04 入力を忘れるチャネル

- Level: A

$\mathcal R(X)=(\operatorname{Tr}X)E_{00}$ のChoi行列を計算し、CP・TP・単位的の各条件を判定せよ。

<!-- solution-start -->
### 詳細解答

$\operatorname{Tr}E_{ij}=\delta_{ij}$ なので $\mathcal R(E_{00})=\mathcal R(E_{11})=E_{00}$、$\mathcal R(E_{01})=\mathcal R(E_{10})=0$ です。Choi行列は

$$
C_{\mathcal R}=(|0\rangle\langle0|+|1\rangle\langle1|)_R\otimes E_{00}
=\operatorname{diag}(1,0,1,0).
$$

固有値は $1,1,0,0$ で正半定値です。また $\operatorname{Tr}_B C_{\mathcal R}=I_R\operatorname{Tr}E_{00}=I_R$ なのでTP、合わせてCPTPです。一方 $\operatorname{Tr}_R C_{\mathcal R}=2E_{00}\ne I_B$ なので単位的ではありません。直接にも $\mathcal R(I_A)=2E_{00}$ です。$\operatorname{Tr}_B$ と $\operatorname{Tr}_R$ の違いが決定的です。
<!-- solution-end -->

<a id="ex-qinf9-b01"></a>
### QINF9-B01 位相反転混合の物理的な範囲

- Level: B

実数 $p$ に対し $\mathcal D_p(X)=(1-p)X+pZXZ$、$Z=\operatorname{diag}(1,-1)$ と定義する。$p$ を最初から確率とは仮定せず、Choi行列からCPTPとなる必要十分条件と最小Kraus数を求めよ。$p=1$ の場合も説明せよ。

<!-- solution-start -->
### 詳細解答

$ZE_{00}Z=E_{00}$、$ZE_{11}Z=E_{11}$、$ZE_{01}Z=-E_{01}$、$ZE_{10}Z=-E_{10}$ です。従って $t=(1-p)-p=1-2p$ とおくと

$$
C_{\mathcal D_p}=\begin{pmatrix}1&0&0&t\\0&0&0&0\\0&0&0&0\\t&0&0&1\end{pmatrix}.
$$

$|00\rangle\pm|11\rangle$ は固有ベクトルで、その固有値は $1\pm t=2(1-p),2p$ です。残りの $|01\rangle,|10\rangle$ の固有値は0です。よってCPの必要十分条件は $p\ge0$ かつ $1-p\ge0$、すなわち $0\le p\le1$ です。$\operatorname{Tr}_B C=I_R$ は $t$ の値によらず成立しますから、同じ範囲がCPTPの条件です。

$p=0,1$ のとき非零固有値は一つでChoi rank 1、$0<p<1$ では二つでrank 2です。[rankと最小Kraus数](#prop-qinf9-choi-rank)より、それぞれ1個、2個必要です。$p=1$ は $\mathcal D_1(X)=ZXZ$ であり、一つのユニタリKraus作用素 $Z$ だけで実現されます。
<!-- solution-end -->

<a id="ex-qinf9-b02"></a>
### QINF9-B02 正値・トレース保存でもチャネルでない例

- Level: B

転置 $T(X)=X^{\mathsf T}$ について、密度演算子を密度演算子に写すことを示せ。それでも量子チャネルではないことをChoi行列の具体的な負の期待値で証明し、トレース保存条件は満たしていることも調べよ。

<!-- solution-start -->
### 詳細解答

密度演算子 $\rho$ は $\rho=\rho^\dagger\ge0$ かつ $\operatorname{Tr}\rho=1$ です。転置は $\operatorname{Tr}\rho^{\mathsf T}=1$ を保ち、$\rho^{\mathsf T}$ のHermite性も保ちます。正値性は任意の $v$ について

$$
v^\dagger\rho^{\mathsf T}v
=\overline v^{\dagger}\rho\overline v\ge0
$$

から従います。従って密度演算子は密度演算子へ送られます。しかしChoi行列は

$$
C_T=\begin{pmatrix}1&0&0&0\\0&0&1&0\\0&1&0&0\\0&0&0&1\end{pmatrix}
$$

であり、$|\psi_-\rangle=(|01\rangle-|10\rangle)/\sqrt2$ について

$$
\langle\psi_-|C_T|\psi_-\rangle=-1<0.
$$

よって[ChoiのCP判定](#thm-qinf9-cp)に失敗します。一方 $C_T$ の $B$ 側部分トレースは、$|00\rangle\langle00|+|11\rangle\langle11|$ だけが寄与して $I_R$ です。従ってTPです。失われた条件は、**補助系との相関を保った状態での正値性**、すなわち完全正値性です。
<!-- solution-end -->

<a id="ex-qinf9-b03"></a>
### QINF9-B03 振幅減衰のChoi rankと出力

- Level: B

$0\le\gamma\le1$ とし、$K_0=\operatorname{diag}(1,\sqrt{1-\gamma})$、$K_1=\sqrt\gamma E_{01}$ から作る $\mathcal A_\gamma(X)=K_0XK_0^\dagger+K_1XK_1^\dagger$ を考える。$C_{\mathcal A_\gamma}$ をベクトル化から構成し、CPTP、Choi rankを判定せよ。さらに[再構成公式](#thm-qinf9-reconstruction)を用いて $\mathcal A_\gamma(E_{01})$ を求めよ。

<!-- solution-start -->
### 詳細解答

列のベクトル化から $|K_0\rangle\!\rangle=|00\rangle+\sqrt{1-\gamma}|11\rangle$、$|K_1\rangle\!\rangle=\sqrt\gamma|10\rangle$ です。[ChoiのKrausベクトル表示](#thm-qinf9-cp)に代入すると

$$
C=\begin{pmatrix}1&0&0&\sqrt{1-\gamma}\\0&0&0&0\\0&0&\gamma&0\\\sqrt{1-\gamma}&0&0&1-\gamma\end{pmatrix}.
$$

二つの正値階数1行列の和なので $C\ge0$ です。$B$ 側のトレースは参照系の $0$ 対角成分が1、$1$ 対角成分が $\gamma+(1-\gamma)=1$、非対角成分が0なので $\operatorname{Tr}_B C=I_R$ です。従ってCPTP。$\gamma=0$ では $|K_1\rangle\!\rangle=0$ なのでrank 1、$0<\gamma\le1$ では $|K_0\rangle\!\rangle$ と $|K_1\rangle\!\rangle$ が非零で直交するためrank 2です。

再構成では $X=E_{01}$、$X^{\mathsf T}=E_{10}$ とするので

$$
\begin{aligned}
\mathcal A_\gamma(E_{01})
&=\operatorname{Tr}_R[(E_{10}\otimes I)C]\\
&=(\langle0|\otimes I)C(|1\rangle\otimes I)
=\sqrt{1-\gamma}\,E_{01}.
\end{aligned}
$$

$\gamma=1$ ではこの非対角成分は0です。一方、$K_0E_{01}K_0^\dagger=\sqrt{1-\gamma}E_{01}$、$K_1E_{01}K_1^\dagger=0$ と直接掛けても一致します。
<!-- solution-end -->

<a id="ex-qinf9-b04"></a>
### QINF9-B04 合成するとChoi行列はどう変わるか

- Level: B

$\Psi:L(H_A)\to L(H_B)$、$\Phi:L(H_B)\to L(H_C)$ を有限次元複素線形写像とする。$C_{\Phi\circ\Psi}=(\mathrm{id}_R\otimes\Phi)(C_\Psi)$ を証明せよ。さらに $\Phi(X)=(\operatorname{Tr}X)|0\rangle\langle0|$（$H_B=H_C=\mathbb C^2$）、$\Psi(X)=ZXZ$（$H_A=H_B=\mathbb C^2$）について、合成チャネルのChoi行列と最小Kraus数を求めよ。

<!-- solution-start -->
### 詳細解答

$C_\Psi=\sum_{i,j}|i\rangle\langle j|_R\otimes\Psi(E_{ij})$ に出力因子の写像 $\Phi$ を作用させます。線形性から

$$
\begin{aligned}
(\mathrm{id}_R\otimes\Phi)(C_\Psi)
&=\sum_{i,j}|i\rangle\langle j|\otimes\Phi(\Psi(E_{ij}))\\
&=\sum_{i,j}|i\rangle\langle j|\otimes(\Phi\circ\Psi)(E_{ij})
=C_{\Phi\circ\Psi}.
\end{aligned}
$$

具体例では、$Z$ はユニタリなので $\operatorname{Tr}(ZXZ)=\operatorname{Tr}X$ です。従って $(\Phi\circ\Psi)(X)=(\operatorname{Tr}X)E_{00}$ と一旦作用を確定できます。入力の行列単位を送れば

$$
C_{\Phi\circ\Psi}=|0\rangle\langle0|_R\otimes E_{00}
+|1\rangle\langle1|_R\otimes E_{00}
=\operatorname{diag}(1,0,1,0).
$$

固有値は $1,1,0,0$ でrank 2ですから[最小Kraus数の命題](#prop-qinf9-choi-rank)により2個です。ユニタリ前処理を加えても、入力を完全に忘れる合成操作の最小環境次元は2のままです。
<!-- solution-end -->

<a id="ex-qinf9-c01"></a>
### QINF9-C01 二つの遷移確率とコヒーレンスの許容範囲

- Level: C

実数 $a,b$ と複素数 $c$ を取り、qubitの複素線形写像 $\Lambda$ を

$$
\begin{aligned}
\Lambda(E_{00})&=\begin{pmatrix}a&0\\0&1-a\end{pmatrix},
&\Lambda(E_{11})&=\begin{pmatrix}1-b&0\\0&b\end{pmatrix},\\
\Lambda(E_{01})&=cE_{01},
&\Lambda(E_{10})&=\overline c E_{10}
\end{aligned}
$$

で定める。

1. $C_\Lambda$ と $\operatorname{Tr}_B C_\Lambda$ を計算する。
2. $\Lambda$ がCPTPとなるための $a,b,c$ の必要十分条件を求める。
3. $a=b=1$ の場合の最小Kraus数を $c$ に応じて求め、$|c|=1$ のとき実際にKraus作用素一個で表せることを示す。
4. $a=b=1/2$、$c=3/4$ としたとき、どの条件が壊れているかを負の固有値で示す。

<!-- solution-start -->
### 詳細解答

**1. Choi行列とトレース。** $(0,0)$ 参照ブロックへ $\Lambda(E_{00})$、$(1,1)$ ブロックへ $\Lambda(E_{11})$ を置き、非対角ブロックには $cE_{01}$ と $\overline c E_{10}$ を置きます。基底順序を保って

$$
C_\Lambda=
\begin{pmatrix}
a&0&0&c\\
0&1-a&0&0\\
0&0&1-b&0\\
\overline c&0&0&b
\end{pmatrix}.
$$

$B$ 側部分トレースは、$R$ の $0$ 対角が $a+(1-a)=1$、$1$ 対角が $(1-b)+b=1$ です。非対角ブロック $cE_{01}$ と $\overline c E_{10}$ はいずれもトレース0なので

$$
\operatorname{Tr}_B C_\Lambda=\begin{pmatrix}1&0\\0&1\end{pmatrix}=I_R
$$

です。**トレース保存は $a,b,c$ の値によらず成立**します。

**2. 完全正の条件。** $C_\Lambda$ はHermite行列です。$|01\rangle$ と $|10\rangle$ の固有値はそれぞれ $1-a,1-b$。残る $|00\rangle,|11\rangle$ 部分では

$$
M=\begin{pmatrix}a&c\\\overline c&b\end{pmatrix},
\quad \lambda_\pm=
\frac{a+b\pm\sqrt{(a-b)^2+4|c|^2}}2
$$

です。$M\ge0$ は $a\ge0$、$b\ge0$、$\det M=ab-|c|^2\ge0$ と同値です。必要性は対角成分の二次形式と行列式から、十分性は $a+b\ge0$ かつ $\lambda_+\lambda_-=\det M\ge0$（または平方完成）から従います。従ってCPTPの必要十分条件は

$$
\boxed{0\le a\le1,\quad0\le b\le1,\quad|c|^2\le ab.}
$$

**3. 特殊な場合の最小表示。** $a=b=1$ では $1-a=1-b=0$ で、非零固有値は $1+|c|,1-|c|$ です。CPTP条件は $|c|\le1$。$|c|<1$ ならrank 2、$|c|=1$ ならrank 1です。後者で $c=e^{i\theta}$ と書けば

$$
K=\operatorname{diag}(1,e^{-i\theta}),
\quad K^\dagger K=I,
\quad KE_{01}K^\dagger=e^{i\theta}E_{01}=cE_{01}
$$

です。対角行列単位は不変で、$E_{10}$ には共役係数が掛かるため、$\Lambda(X)=KXK^\dagger$ という一個のKraus作用素で表せます。

**4. 非物理的なコヒーレンス。** $a=b=1/2,c=3/4$ では $M$ の固有値は $1/2\pm3/4$、すなわち $5/4,-1/4$ です。残りの二固有値はともに $1/2$。よってChoi行列は正半定値ではありません。トレース保存は1の計算で成立していますが、$|c|^2=9/16>ab=1/4$ となり、入力のコヒーレンスを許された範囲より増幅したため完全正値性が壊れます。
<!-- solution-end -->

## 8. 次へ

一つの行列でチャネルかどうかを検査できるようになりました。次のQINF10では、チャネルの出力として現れる二つの量子状態を、どんな測定で最もよく区別できるかを考えます。その際には、演算子の正負スペクトル部分が実際の最適な意思決定へつながります。
