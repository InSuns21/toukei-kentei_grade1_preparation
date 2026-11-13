# HOLO28 JLMSと相対エントロピー

<!-- definition-example-audit: strict -->

[HOLO27の部分領域再構成](../HOLO27/index.md#def-holo27-subregion-reconstruction)では、幾何学的にくさびの中にあることと、境界領域だけに作用する演算子が存在することを区別しました。では、そのような復号を裏付ける**状態を比較する情報**は何でしょうか。

[HOLO24の一般化エントロピー](../HOLO24/index.md#def-holo24-generalized-entropy)は「面積とバルク量子エントロピーの和」を与えます。一方、[QINF20の量子相対エントロピー](../../../応用系/QINF/QINF20/index.md#def-qinf20-relative-entropy)は二状態をどの程度区別できるかを測ります。本講では、これらを**モジュラーHamiltonian**を経由して接続し、JLMS（Jafferis–Lewkowycz–Maldacena–Suh）の意味と限界を考えます。一般の無限次元QFT・量子重力のJLMSを有限行列の計算だけで証明したとは主張しません。

## 0. 模型、対数、領域と次数

最初の計算では有限次元Hilbert空間を使い、$\hbar=1$、$\log$ は**自然対数**、エントロピーは nat とします。QINF20は底2の対数を使うので、そこで得られる量は本講では $\ln 2$ を掛けて変換します。[相対エントロピーの定義と台の条件](../../../応用系/QINF/QINF20/index.md#def-qinf20-relative-entropy)と[部分トレース](../../../応用系/QINF/QINF3/index.md#def-qinf3-partial-trace)は、有限次元の行列にそのまま適用できます。

重力への読み替えでは、境界の正則化領域 $A$ と補領域 $\bar A$ を先に選びます。さらに、選んだ状態族で共通に扱える量子極値面 $\gamma_A$ と、その $A$ 側のエンタングルメントくさび $a$ を固定します。

重力結合 $G_N$ は小さい正数とします。古典面積は $O(G_N^{-1})$、バルク場のエントロピーとループ・反作用由来の項は $O(G_N^0)$ です。

両状態では境界cutoff、重力反項、コード部分空間を共通にします。**状態変化で面が大きく移り、くさび自体が変わる場合に、単一コードの式をそのまま適用しません。**

| 対象 | 有限次元の証明で扱うもの | 重力側で追加して仮定するもの |
| --- | --- | --- |
| 境界領域 $A$ | Hilbert空間の因子と縮約密度行列 | UV正則化した境界局所代数 |
| バルク領域 $a$ | 符号化前の局所因子または直和代数 | 共通のくさびと重力拘束に適合する観測量 |
| 面積項 | 符号セクターの $\log d_\alpha$ | 繰り込み済み面積演算子と局所面項 |
| 誤差 | 有限行列模型では等号 | 固定した半古典展開の制御された高次項 |

## 1. エントロピーの差に現れるモジュラーHamiltonian

通常のエネルギーHamiltonianを持ち込む必要はありません。参照状態 $\sigma$ を決め、その固有値の負の対数を取ると、二状態の相対エントロピーを「期待値の差」と「エントロピーの差」に分解できます。

<a id="def-holo28-modular-hamiltonian"></a>

<!-- formal-statement-start -->
> **定義（有限次元のモジュラーHamiltonian）**  
> 有限次元Hilbert空間 $H$ の密度行列 $\sigma$ が正定値（$\sigma>0$）であるとする。$\sigma=\sum_j s_j|j\rangle\langle j|$（$s_j>0$）の固有分解で

$$
K_\sigma:=-\log\sigma=\sum_j(-\log s_j)|j\rangle\langle j|
$$

> を参照状態 $\sigma$ のモジュラーHamiltonianと呼ぶ。これは一般に物理的な時間発展のHamiltonianではない。零固有値がある場合には $\operatorname{supp}\sigma$ 上だけで定義し、比較する $\rho$ に $\operatorname{supp}\rho\subseteq\operatorname{supp}\sigma$ を課す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo28-modular-hamiltonian -->
**定義の確認**。 $\sigma=\operatorname{diag}(3/4,1/4)$ とすると、固有値は正、トレースは1なので密度行列であり、

$$
K_\sigma=\operatorname{diag}\bigl(\log(4/3),\log4\bigr),\qquad
e^{-K_\sigma}=\sigma.
$$

対数を取るために対角化したのであって、任意の $\rho$ と $\sigma$ が可換であることを仮定したわけではありません。例えば $\rho=|+\rangle\langle+|$ も $\sigma$ の全台に含まれるため、この $K_\sigma$ で比較できます。
<!-- definition-example-end -->

<a id="prop-holo28-relative-modular"></a>

<!-- formal-statement-start -->
> **命題（相対エントロピーのモジュラー表示）**  
> 同じ有限次元 $H$ の密度行列 $\rho,\sigma$ について $\sigma>0$ とする。自然対数の von Neumannエントロピーを $S(\rho)=-\operatorname{Tr}\rho\log\rho$ とおくと

$$
D(\rho\Vert\sigma)=
\operatorname{Tr}(\rho K_\sigma)-S(\rho)
$$

> が成立する。また $\Delta X:=X(\rho)-X(\sigma)$ と書けば

$$
D(\rho\Vert\sigma)=
\Delta\langle K_\sigma\rangle-\Delta S.
$$

> $\sigma$ が非可逆の場合も、$\operatorname{supp}\rho\subseteq\operatorname{supp}\sigma$ の下で同じ式を台へ制限して解釈する。
<!-- formal-statement-end -->

**証明の見取り図。** 定義に含まれる二つのトレースへ $K_\sigma=-\log\sigma$ と $S(\rho)=-\operatorname{Tr}\rho\log\rho$ を代入します。参照状態自身について $D(\sigma\Vert\sigma)=0$ を引くことが第二式の要点です。

<!-- proof-start -->
### 証明

[QINF20の相対エントロピー](../../../応用系/QINF/QINF20/index.md#def-qinf20-relative-entropy)を自然対数へ換算すると

$$
D(\rho\Vert\sigma)
=\operatorname{Tr}(\rho\log\rho)-\operatorname{Tr}(\rho\log\sigma).
$$

第一項は $-S(\rho)$、第二項は $\operatorname{Tr}(\rho K_\sigma)$ です。一方

$$
0=D(\sigma\Vert\sigma)
=\operatorname{Tr}(\sigma K_\sigma)-S(\sigma).
$$

これを第一式から引くと

$$
D(\rho\Vert\sigma)
=\{\operatorname{Tr}(\rho K_\sigma)-\operatorname{Tr}(\sigma K_\sigma)\}
-\{S(\rho)-S(\sigma)\}.
$$

零固有値の場合、$\rho$ が $\sigma$ の核に重みを置かないという台の条件により、全式を $\operatorname{supp}\sigma$ 上で評価できます。台が含まれなければ $D=+\infty$ であり、有限な等式と混同しません。
<!-- proof-end -->

この式を使うと、単に二つのエントロピーが近いというだけでは相対エントロピーが一致しないことが分かります。**参照状態 $\sigma$ による $K_\sigma$ の期待値**も比較する必要があります。

## 2. 小摂動の第一法則：どこまでが微分の等式か

$\sigma>0$ を固定し、$\rho(t)=\sigma+tX$ とします。$X=X^\dagger$、$\operatorname{Tr}X=0$ とし、$|t|$ を十分小さくして $\rho(t)>0$ を保証します。対数の微分を行列の可換性に依存させないため、最初は $\sigma$ の固有基底で考えます。

<a id="prop-holo28-first-law"></a>

<!-- formal-statement-start -->
> **命題（有限次元のエンタングルメント第一法則）**  
> 上記の正定値 $\sigma$ と摂動 $\rho(t)=\sigma+tX$ に対して

$$
\left.\frac{d}{dt}S(\rho(t))\right|_{t=0}
=\operatorname{Tr}(XK_\sigma)
=\left.\frac{d}{dt}\operatorname{Tr}(\rho(t)K_\sigma)\right|_{t=0},
$$

> 従って $D(\rho(t)\Vert\sigma)=O(t^2)$ であり、その第一微分は零である。
<!-- formal-statement-end -->

**証明の見取り図。** 関数 $f(x)=-x\log x$ の行列トレースの微分には $f'(x)=-\log x-1$ の固有値ごとの寄与だけが残ります。非対角の摂動も一次のトレースには寄与しません。

<!-- proof-start -->
### 証明

$\sigma$ を正規直交基底で対角化し、固有値を $s_i>0$ とします。任意の滑らかな実関数 $f$ について、重複固有値があってもスペクトル射影または多項式近似を使うことで

$$
\left.\frac{d}{dt}\operatorname{Tr}f(\sigma+tX)\right|_0
=\sum_i f'(s_i)X_{ii}
=\operatorname{Tr}[f'(\sigma)X]
$$

です。具体的には多項式 $f(x)=x^n$ で積の微分を展開すると

$$
\left.\frac{d}{dt}\operatorname{Tr}(\sigma+tX)^n\right|_0
=\sum_{j=0}^{n-1}\operatorname{Tr}(\sigma^jX\sigma^{n-1-j})
=n\operatorname{Tr}(\sigma^{n-1}X).
$$

正固有値を囲む区間上で $f$ と導関数を多項式で近似すれば、有限次元では同じ公式が $f(x)=-x\log x$ へ延長できます。よって

$$
S'(0)=-\operatorname{Tr}[X(\log\sigma+I)]
=\operatorname{Tr}(XK_\sigma)
$$

となります。最後は $\operatorname{Tr}X=0$ を使いました。$K_\sigma$ は参照状態固定なので $\langle K_\sigma\rangle'= \operatorname{Tr}(XK_\sigma)$ です。[モジュラー表示](#prop-holo28-relative-modular)で差し引くと $D'(0)=0$。正定値の近傍で $D$ は二階微分可能なので $D=O(t^2)$ が得られます。
<!-- proof-end -->

**直接計算例。** $\sigma=\operatorname{diag}(1/4,3/4)$、$X=\operatorname{diag}(1,-1)$ なら $|t|<1/4$ で正定値です。導関数は

$$
S'(0)=-\log(1/4)+\log(3/4)=\log3,
\qquad
\frac{d}{dt}\langle K_\sigma\rangle=\log4-\log(4/3)=\log3.
$$

一方、対角二値分布として相対エントロピーを展開すれば

$$
D(\rho(t)\Vert\sigma)
=(1/4+t)\log(1+4t)+(3/4-t)\log(1-4t/3)
=\frac83t^2+O(t^3).
$$

一次の等式から有限 $t$ で $S(\rho(t))=\langle K_\sigma\rangle$ と結論してはいけません。

## 3. 面積項が現れる有限コード：まず固定セクター

相対エントロピーとバルクの情報を比較する前に、面積の役をする量を**計算で構成**します。$\mathcal H_a,\mathcal H_b$ を有限次元とし、付随する $d\ge1$ 次元の二つの空間 $\mathcal H_{e_A},\mathcal H_{e_B}$ に

$$
|\Phi_d\rangle=\frac1{\sqrt d}\sum_{j=1}^d|j\rangle_{e_A}|j\rangle_{e_B}
$$

を用意します。$\langle\Phi_d|\Phi_d\rangle=d/d=1$、また一方を部分トレースすると $I_d/d$ です。境界領域は $A=a\otimes e_A$、補領域は $\bar A=b\otimes e_B$ に対応させます。

<a id="def-holo28-edge-code"></a>

<!-- formal-statement-start -->
> **定義（固定面積型の有限次元符号化）**  
> 上の有限次元空間と $d\ge1$ に対し、コード空間 $\mathcal H_{\rm code}=\mathcal H_a\otimes\mathcal H_b$ から物理空間 $\mathcal H_A\otimes\mathcal H_{\bar A}$ への写像を

$$
V|\psi\rangle_{ab}=|\psi\rangle_{ab}\otimes|\Phi_d\rangle_{e_Ae_B}
$$

> と定める（テンソル因子の順序は $A=(a,e_A)$、$\bar A=(b,e_B)$ に並べ替える）。定数 $\mathcal L=(\log d)I_{\rm code}$ を模型の**面積型項**とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo28-edge-code -->
**定義の確認**。 $d=2$、$a,b$ ともqubit、$\psi=|0\rangle_a|1\rangle_b$ を選びます。像は $|0\rangle_a|1\rangle_b(|00\rangle+|11\rangle)_{e_Ae_B}/\sqrt2$ でノルム1、別の $\psi$ との内積も元の内積のままなので $V^\dagger V=I_{\rm code}$。$\bar A$ をトレースすれば

$$
\rho_A=|0\rangle\langle0|_a\otimes I_2/2.
$$

固有値は $1/2,1/2$（それ以外の $a$ 方向に零）で、$S(\rho_A)=\log2$。一方 $a$ 自体のエントロピーは0です。差を生んだのは分割をまたぐBell対です。
<!-- definition-example-end -->

<a id="thm-holo28-fixed-sector-jlms"></a>

<!-- formal-statement-start -->
> **定理（固定セクターのモジュラー等式と相対エントロピー）**  
> 前記 $V$ と $d$ を固定し、コード上の二状態 $\rho_{ab},\sigma_{ab}$ の $a$ 縮約を $\rho_a,\sigma_a$ とする。$\sigma_a>0$ なら物理領域 $A$ の縮約とモジュラーHamiltonianについて

$$
\rho_A=\rho_a\otimes I_d/d,\qquad
K_A^\sigma=K_a^\sigma\otimes I_d+(\log d)I_A,
$$

> が成立する。従って、コード上に圧縮した作用素の等式と相対エントロピーの等式は

$$
V^\dagger(K_A^\sigma\otimes I_{\bar A})V
=K_a^\sigma\otimes I_b+\mathcal L,
$$

$$
S(\rho_A)=S(\rho_a)+\log d,\qquad
D(\rho_A\Vert\sigma_A)=D(\rho_a\Vert\sigma_a).
$$

> 最後の相対エントロピー等式は、台包含が成立する場合には $\sigma_a$ が非可逆でも成り立ち、成立しなければ両辺 $+\infty$ と解釈する。
<!-- formal-statement-end -->

**証明の見取り図。** 片側のBell対をトレースすると最大混合状態になり、その対数が単位作用素の $\log d$ を生みます。相対エントロピーでは同じ状態の最大混合因子が両側へ入るため消えます。これは一般のAdS/CFTの証明ではなく、有限コードの**完全な行列等式**です。

<!-- proof-start -->
### 証明

符号化状態は $\rho_{ab}\otimes|\Phi_d\rangle\langle\Phi_d|$ です。$b,e_B$ をトレースするので、[部分トレースの性質](../../../応用系/QINF/QINF3/index.md#def-qinf3-partial-trace)から

$$
\rho_A=(\operatorname{Tr}_b\rho_{ab})\otimes
(\operatorname{Tr}_{e_B}|\Phi_d\rangle\langle\Phi_d|)
=\rho_a\otimes I_d/d
$$

となり、$\sigma$ も同様です。$\sigma_a$ が正定値なら、積の固有値 $s_i/d$ を使って

$$
-\log(\sigma_a\otimes I_d/d)
=(-\log\sigma_a)\otimes I_d+(\log d)I_A.
$$

これが $K_A^\sigma$ であり、$V$ の等長性と $K_a^\sigma$ が $a$ だけに作用することからコードへの圧縮等式が成り立ちます。積状態のエントロピーは

$$
S(\rho_A)=-\sum_i\sum_{j=1}^d\frac{r_i}{d}\log\frac{r_i}{d}
=-\sum_i r_i\log r_i+\log d
$$

です。ここで $r_i=0$ の項は $0\log0=0$ とします。相対エントロピーの定義に両方の縮約を代入すると

$$
D(\rho_A\Vert\sigma_A)
=\sum_i r_i\log r_i-\operatorname{Tr}(\rho_a\log\sigma_a)
+\underbrace{(-\log d+\log d)}_{0}
=D(\rho_a\Vert\sigma_a).
$$

非可換な $\rho_a,\sigma_a$ でも、最後の第二項は行列トレースのままで成り立ちます。$\sigma_a$ の核に $\rho_a$ の重みがあることと、$\sigma_A$ の核に $\rho_A$ の重みがあることは同値なので、台が含まれない場合にも $+\infty$ が一致します。
<!-- proof-end -->

この模型では $K_A^\sigma$ に **$\log d$ が残る**一方、相対エントロピーでは **$\log d$ が相殺する**。固定した面積に似た性質を、状態の具体的な行列演算だけで見ました。

## 4. 面積が状態で変わるとき：直和と中心

実際の半古典重力では、面積を常に同じ数とみなすより、幾何に対応する異なるセクター間で変わり得ると考える必要があります。そこで添字 $\alpha$ でラベル付けされた互いに直交するコード空間を直和にし、各セクターに異なる $d_\alpha$ を割り当てます。

ここで**直和代数の中心**という語を先に説明します。セクターごとに作用する観測量の集合

$$
\mathcal M=\bigoplus_\alpha
\bigl(\mathcal B(\mathcal H_{a_\alpha})\otimes I_{b_\alpha}\bigr)
$$

では、セクターラベルを識別する射影 $P_\alpha$ がすべての $\mathcal M$ の元と可換です。そのような可換な作用素全体が中心です。以下では量子誤り訂正一般の代数定理を仮定せず、このブロック行列だけを計算します。

<a id="def-holo28-sector-area"></a>

<!-- formal-statement-start -->
> **定義（直和コードの面積型中心作用素）**  
> 有限個の $\alpha$ に対して $d_\alpha\ge1$ を整数とし、

$$
\mathcal H_{\rm code}=\bigoplus_\alpha
(\mathcal H_{a_\alpha}\otimes\mathcal H_{b_\alpha})
$$

> から、互いに直交する物理領域 $A$、$\bar A$ の $\alpha$ ブロックへ、各 $|\Phi_{d_\alpha}\rangle$ を付けて等長に符号化する。中心の射影 $P_\alpha$ に対し

$$
\mathcal L=\sum_\alpha(\log d_\alpha)P_\alpha
$$

> を面積型中心作用素とする。$\mathcal L$ は各セクター内では定数だが、異なるセクター間では異なる固有値を取り得る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo28-sector-area -->
**定義の確認**。 二つのセクターで $d_0=1,d_1=2$ とし、$a_\alpha,b_\alpha$ をともに一次元とします。コード基底 $|0\rangle,|1\rangle$ は直交し、各像も物理空間で異なるセクターにあるため直交します。従って $V^\dagger V=I_2$ です。$\mathcal M$ は対角行列全体で、その射影 $P_0,P_1$ はすべての対角行列と可換し、

$$
\mathcal L=\operatorname{diag}(0,\log2).
$$

$|1\rangle$ セクターだけが切断Bell対を一つ持ちます。
<!-- definition-example-end -->

以下でセクターの古典確率を $p_\alpha=\operatorname{Tr}(P_\alpha\rho)$ とし、$p_\alpha>0$ なら規格化した $a_\alpha$ の状態を $\rho_{a_\alpha}$ と書きます。セクター間の非対角成分は $\bar A$ をトレースすると消え、物理 $A$ の縮約はブロック対角になります。$A$ に対応するバルク代数の状態も、行列として $\rho_{\mathcal M}=\bigoplus_\alpha p_\alpha\rho_{a_\alpha}$ で表します。これが一般の「バルクHilbert空間の単一因子」ではなく、直和代数の制限状態である点が重要です。

<a id="thm-holo28-sector-jlms"></a>

<!-- formal-statement-start -->
> **定理（直和コードのJLMS型恒等式）**  
> 前記の直和コードを取り、参照状態 $\sigma$ の各セクター確率 $q_\alpha$ が正で、各 $\sigma_{a_\alpha}$ が正定値とする。符号化状態 $\rho,\sigma$ に対し、$\rho_{\mathcal M}=\bigoplus_\alpha p_\alpha\rho_{a_\alpha}$、$\sigma_{\mathcal M}=\bigoplus_\alpha q_\alpha\sigma_{a_\alpha}$ を定める。このとき

$$
S(\rho_A)=S(\rho_{\mathcal M})
+\operatorname{Tr}(\rho\mathcal L),
$$

$$
V^\dagger(K_A^\sigma\otimes I_{\bar A})V
=K_{\mathcal M}^\sigma+\mathcal L,\qquad
K_{\mathcal M}^\sigma=\bigoplus_\alpha
[-\log(q_\alpha\sigma_{a_\alpha})]\otimes I_{b_\alpha},
$$

$$
D(\rho_A\Vert\sigma_A)
=D(\rho_{\mathcal M}\Vert\sigma_{\mathcal M}).
$$

> 最後の等式の相対エントロピーは直和ブロック状態の有限行列の量として解釈する。$\rho,\sigma$ にセクター間のコヒーレンスがあっても、縮約後のブロック状態について成立する。
<!-- formal-statement-end -->

**証明の見取り図。** $A$ の $\alpha$ ブロックは $p_\alpha\rho_{a_\alpha}\otimes I_{d_\alpha}/d_\alpha$。対数を取ると三つの項（$-\log p_\alpha$、$-\log\rho_{a_\alpha}$、$\log d_\alpha$）へ分解されます。後ろの項が面積型中心作用素で、相対エントロピーの差では消えます。

<!-- proof-start -->
### 証明

異なる $\alpha$ の物理 $\bar A$ 因子は直交するので、交差ブロック $\alpha\ne\beta$ は部分トレースで零となります。従って

$$
\rho_A=\bigoplus_\alpha
\left(p_\alpha\rho_{a_\alpha}\otimes\frac{I_{d_\alpha}}{d_\alpha}\right).
$$

同様に $\sigma_A$ は $p_\alpha$ を $q_\alpha$、$\rho_{a_\alpha}$ を $\sigma_{a_\alpha}$ に替えたものです。$H(p)=-\sum_\alpha p_\alpha\log p_\alpha$ と書くと、その固有値 $p_\alpha r_{\alpha i}/d_\alpha$ から

$$
\begin{aligned}
S(\rho_A)
&=H(p)+\sum_\alpha p_\alpha S(\rho_{a_\alpha})
+\sum_\alpha p_\alpha\log d_\alpha,\\
S(\rho_{\mathcal M})
&=H(p)+\sum_\alpha p_\alpha S(\rho_{a_\alpha}).
\end{aligned}
$$

従って第一式を得ます。参照状態の $A$ ブロックの対数は

$$
K_{A,\alpha}^\sigma=
[-\log(q_\alpha\sigma_{a_\alpha})]\otimes I_{d_\alpha}
+(\log d_\alpha)I_{a_\alpha e_A}.
$$

これは符号化像を保つ作用素なので、$V^\dagger(\cdot\otimes I)V$ により $b_\alpha$ 上に恒等作用素を付けた $K_{\mathcal M}^\sigma$ と $\mathcal L$ が残ります。最後に[相対エントロピーのモジュラー表示](#prop-holo28-relative-modular)へ第一・第二式を代入すると

$$
\begin{aligned}
D(\rho_A\Vert\sigma_A)
&=\Delta\langle K_A^\sigma\rangle-\Delta S_A\\
&=\Delta\langle K_{\mathcal M}^\sigma\rangle
+\Delta\langle\mathcal L\rangle
-\Delta S_{\mathcal M}-\Delta\langle\mathcal L\rangle\\
&=D(\rho_{\mathcal M}\Vert\sigma_{\mathcal M}).
\end{aligned}
$$

$\sigma$ を固定した差では、中心作用素そのものは状態ごとに変えません。$\rho$ にセクター間の位相が存在しても、上記は両縮約に実際に現れるブロックに対する等式です。
<!-- proof-end -->

**二セクターの数値例。** 先ほどの $d_0=1,d_1=2$ で、$\rho$ のセクター確率を $p=(1/2,1/2)$、$\sigma$ を $q=(1/4,3/4)$ とします。$\sigma_A$ の正固有値は $1/4,3/8,3/8$、$\rho_A$ の正固有値は $1/2,1/4,1/4$。従って

$$
D(\rho_A\Vert\sigma_A)
=\frac12\log2+2\cdot\frac14\log(2/3)
=\frac12\log(4/3).
$$

バルク代数では $\rho_{\mathcal M}=\operatorname{diag}(1/2,1/2)$、$\sigma_{\mathcal M}=\operatorname{diag}(1/4,3/4)$ なので

$$
D(\rho_{\mathcal M}\Vert\sigma_{\mathcal M})
=\frac12\log2+\frac12\log(2/3)
=\frac12\log(4/3).
$$

なお $S(\rho_A)=\log2+\frac12\log2=\frac32\log2$、$S(\rho_{\mathcal M})=\log2$、$\langle\mathcal L\rangle_\rho=\frac12\log2$ です。「面積」が状態とともに変わる例でも、エントロピーとモジュラー期待値の両方に同じ変化が入り、相対エントロピーでは消えます。

## 5. 重力側のJLMS：等号の意味と証明の射程

ここから先は有限コードで証明した恒等式を、半古典AdS/CFTの量へ対応させる**条件付きの物理的辞書**です。[HOLO6の半古典の制御条件](../HOLO6/index.md#def-holo6-controlled-window)を満たす状態の近傍で、[HOLO24の量子極値面](../HOLO24/index.md#def-holo24-qes)を選び、境界領域 $A$ とそのバルク側 $a$ を対応させます。ここではその構成が共通コード部分空間で意味を持つ場合に限定します。

<a id="def-holo28-jlms-dictionary"></a>

<!-- formal-statement-start -->
> **定義（JLMS関係の条件付き使用規約）**  
> 半古典的なホログラフィックコード部分空間 $\mathcal H_{\rm code}$ とその等長な境界埋め込み $V$、境界領域 $A$、対応するバルクくさび $a$、参照状態 $\sigma$ を固定する。UV正則化と同じ繰り込み規約の下で、適用する摂動次数まで

$$
V^\dagger K_{{\rm CFT},A}^{\sigma} V
=\frac{\widehat{\operatorname{Area}}(\gamma_A)}{4G_N}
+K_{{\rm bulk},a}^{\sigma}
+\text{局所面項・制御された高次補正}
$$

> と扱い、整合する二状態について、同じ精度で

$$
D(\rho_{{\rm CFT},A}\Vert\sigma_{{\rm CFT},A})
=D(\rho_{{\rm bulk},a}\Vert\sigma_{{\rm bulk},a})
+\text{制御された高次補正}
$$

> と比較することを本講の **JLMS関係** と呼ぶ。重力側の各演算子はゲージ拘束とコードへの制限を含んで解釈し、面積項には必要な反項・エッジ寄与を組み込む。無条件の全Hilbert空間上の演算子等号や、任意の異なるQESを持つ二状態への厳密等号は主張しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo28-jlms-dictionary -->
**対応の直接確認（物理理論の証明ではない）。** 第3節の固定セクター模型で $\widehat{\operatorname{Area}}/(4G_N)$ の形式上の役に $\log d$、バルクモジュラーHamiltonianに $K_a^\sigma$ を対応させると、[固定セクター定理](#thm-holo28-fixed-sector-jlms)の演算子等式がちょうど上記の構造になります。第4節で $d_\alpha$ を変えれば面積型項が状態依存の期待値を持ちます。この対応は構造の検査であって、$d_\alpha$ から実際のAdS曲面の幾何面積を導出したものではありません。
<!-- definition-example-end -->

ここで見落としやすいのは三点です。第一に **$K^\sigma$ は参照状態依存**であり、$\rho$ を変えても比較の途中で $\sigma$ を変えてはいけません。第二に、[FLMの次数整理](../HOLO23/index.md#def-holo23-flm)では $O(G_N^0)$ のバルク量子項・計量反作用・局所面項を揃える必要があります。第三に、境界局所QFTの作用素は一般に有限行列の対数ではありません。本講の有限cutoffでの対数は定義域問題を回避する模型であり、連続体の厳密なモジュラー作用素やType III局所代数についての一般定理の代用ではありません。

### 相対エントロピーが一致する理由

参照状態 $\sigma$ との差について、[モジュラー表示](#prop-holo28-relative-modular)を境界とバルクそれぞれへ適用します。仮定した領域と次数でエントロピー辞書を

$$
\Delta S_{{\rm CFT},A}
=\Delta\left\langle\frac{\widehat{\operatorname{Area}}}{4G_N}\right\rangle
+\Delta S_{{\rm bulk},a}+\cdots
$$

とし、上のモジュラー辞書から

$$
\Delta\langle K_{{\rm CFT},A}^\sigma\rangle
=\Delta\left\langle\frac{\widehat{\operatorname{Area}}}{4G_N}\right\rangle
+\Delta\langle K_{{\rm bulk},a}^\sigma\rangle+\cdots
$$

を得ます。両式を引くと

$$
\begin{aligned}
D_{{\rm CFT},A}(\rho\Vert\sigma)
&=\Delta\langle K_{{\rm CFT},A}^\sigma\rangle-\Delta S_{{\rm CFT},A}\\
&=\Delta\langle K_{{\rm bulk},a}^\sigma\rangle-\Delta S_{{\rm bulk},a}+\cdots\\
&=D_{{\rm bulk},a}(\rho\Vert\sigma)+\cdots.
\end{aligned}
$$

**「面積項が小さいので捨てた」のではありません。** 同一の面積演算子が両方に現れ、差で消えています。有限コードでは第4節がこの計算の完全証明です。重力側では、QES・エッジ項・UV反項・作用素の定義域を整合させる導出そのものが非自明であり、ここでは既に検証された有限模型の外挿を**仮定付きのJLMS関係**として扱います。

### いつ復号の議論に使えるか

[量子相対エントロピーのデータ処理不等式](../../../応用系/QINF/QINF20/index.md#thm-qinf20-dpi)によれば、二状態を捨てるチャネルで相対エントロピーは増えません。もし同じ二状態集合で境界 $A$ とバルク代数 $a$ の相対エントロピーがすべて一致し、適切な代数的仮定・十分な状態集合・忠実な符号化が揃えば、情報が失われていないことは復号可能性を支持します。ただし**一組の状態に対する数値の一致だけでは、全論理演算子の再構成を証明できません**。この違いは、[HOLO27の識別不能性の障害](../HOLO27/index.md#thm-holo27-indistinguishability)とも整合します。

次の HOLO29 では、どの部分を消去しても論理情報を復元できるかという、チャネルと誤り訂正条件を独立に検算します。さらに作用素代数コードを扱うHOLO30では、ここで現れた中心の役割を体系化します。

## 6. 演習と詳細解答

各問は有限次元です。特記しない限り自然対数を用い、$\operatorname{supp}\rho\subseteq\operatorname{supp}\sigma$ を確認します。

### Level A：対数・台・面積型項を自分で計算する

<a id="ex-holo28-a01"></a>
### 演習 HOLO28-A01：モジュラーHamiltonianと相対エントロピー
- Level: A

$\sigma=\operatorname{diag}(1/4,3/4)$、$\rho=\operatorname{diag}(1/2,1/2)$ とする。$K_\sigma$、$D(\rho\Vert\sigma)$、$\Delta\langle K_\sigma\rangle$、$\Delta S$ を計算して[モジュラー表示](#prop-holo28-relative-modular)を検証せよ。

<!-- solution-start -->
**詳細解答。** 両状態は正定値、トレース1なので台は全空間です。[定義](#def-holo28-modular-hamiltonian)より $K_\sigma=\operatorname{diag}(\log4,\log(4/3))$。相対エントロピーは

$$
D=\tfrac12\log\frac{1/2}{1/4}+
\tfrac12\log\frac{1/2}{3/4}
=\tfrac12\log\frac43.
$$

$\langle K_\sigma\rangle_\rho=\tfrac12\log4+\tfrac12\log(4/3)$、$\langle K_\sigma\rangle_\sigma=\tfrac14\log4+\tfrac34\log(4/3)$ なので $\Delta\langle K_\sigma\rangle=\tfrac14\log3$。また $S(\rho)=\log2$、$S(\sigma)=\tfrac14\log4+\tfrac34\log(4/3)$、従って

$$
\Delta S=\log2-\tfrac14\log4-\tfrac34\log(4/3).
$$

これを差し引けば $\tfrac12\log(4/3)$ となり、直接計算と一致します。
<!-- solution-end -->

<a id="ex-holo28-a02"></a>
### 演習 HOLO28-A02：台の不一致
- Level: A

$\sigma=|0\rangle\langle0|$、$\rho=|1\rangle\langle1|$ の $D(\rho\Vert\sigma)$ を求めよ。$\sigma_\epsilon=(1-\epsilon)\sigma+\epsilon I_2/2$（$0<\epsilon<1$）との比較で発散を確かめよ。

<!-- solution-start -->
**詳細解答。** 両者は射影なので密度行列ですが、台は互いに直交します。[QINF20の台条件](../../../応用系/QINF/QINF20/index.md#def-qinf20-relative-entropy)より $D(\rho\Vert\sigma)=+\infty$。正則化すると $\sigma_\epsilon=\operatorname{diag}(1-\epsilon/2,\epsilon/2)$ は正定値であり、$\rho$ は第2成分だけを占めるので

$$
D(\rho\Vert\sigma_\epsilon)
=1\cdot\log\frac1{\epsilon/2}=\log(2/\epsilon)\longrightarrow+\infty.
$$

$\log0$ を有限な固有値として代入するのではなく、台の非包含と正則化の極限で扱います。
<!-- solution-end -->

<a id="ex-holo28-a03"></a>
### 演習 HOLO28-A03：Bell対の片側
- Level: A

$|\Phi_3\rangle=3^{-1/2}\sum_{j=1}^3|jj\rangle$ とする。規格化、片側縮約、エントロピーを求め、$a$ が純粋な固定セクター模型の面積型項を答えよ。

<!-- solution-start -->
**詳細解答。** 直交性から $\langle\Phi_3|\Phi_3\rangle=\tfrac13\sum_{i,j}\delta_{ij}\delta_{ij}=1$。密度行列を展開して第2因子をトレースすると

$$
\operatorname{Tr}_{e_B}|\Phi_3\rangle\langle\Phi_3|
=\frac13\sum_{i,j}|i\rangle\langle j|\langle j|i\rangle
=I_3/3.
$$

正固有値は $1/3$ が三つなので $S=-3(1/3)\log(1/3)=\log3$。純粋な $a$ のエントロピーは0だから、[固定セクターの定義](#def-holo28-edge-code)では $\mathcal L=(\log3)I$ です。
<!-- solution-end -->

<a id="ex-holo28-a04"></a>
### 演習 HOLO28-A04：二値の第一法則
- Level: A

$\sigma=\operatorname{diag}(1/3,2/3)$、$\rho(t)=\operatorname{diag}(1/3+t,2/3-t)$ とする。$S'(0)$ と $\langle K_\sigma\rangle'(0)$ を別々に求めよ。

<!-- solution-start -->
**詳細解答。** $|t|<1/3$ では両固有値が正であり、トレースは1です。$S(t)=-(1/3+t)\log(1/3+t)-(2/3-t)\log(2/3-t)$ を微分すると

$$
S'(t)=-\log(1/3+t)-1+\log(2/3-t)+1,
\quad S'(0)=\log2.
$$

一方 $K_\sigma=\operatorname{diag}(\log3,\log(3/2))$ なので

$$
\langle K_\sigma\rangle'(0)=\log3-\log(3/2)=\log2.
$$

よって[第一法則](#prop-holo28-first-law)の二つの導関数が一致します。有限 $t$ で両量が一致するという意味ではありません。
<!-- solution-end -->

<a id="ex-holo28-a05"></a>
### 演習 HOLO28-A05：モジュラーHamiltonianは何の対数か
- Level: A

$\sigma=I_2/2$ で $K_\sigma$ を求め、$\rho=|0\rangle\langle0|$ に対して $\Delta\langle K_\sigma\rangle$ と $\Delta S$ を計算せよ。

<!-- solution-start -->
**詳細解答。** $\sigma$ は正定値で $K_\sigma=(\log2)I_2$。どの密度行列 $\tau$ にも $\operatorname{Tr}(\tau K_\sigma)=\log2$ だから $\Delta\langle K_\sigma\rangle=0$。$\rho$ は純粋で $S(\rho)=0$、$S(\sigma)=\log2$ なので $\Delta S=-\log2$。従って[モジュラー表示](#prop-holo28-relative-modular)から $D(\rho\Vert\sigma)=\log2$。一定のモジュラー演算子でも状態差の情報はエントロピー差に残ります。
<!-- solution-end -->

### Level B：有限コードの等式を組み立てる

<a id="ex-holo28-b01"></a>
### 演習 HOLO28-B01：固定面積型コードの非自明な二状態
- Level: B

$d=2$、$\rho_a=\operatorname{diag}(3/4,1/4)$、$\sigma_a=I_2/2$ とし、$b$ は一次元とする。境界 $A$ の状態の固有値、二つのエントロピー差、モジュラーHamiltonian、相対エントロピーの両側を求めよ。

<!-- solution-start -->
**詳細解答。** [固定セクターの符号化](#def-holo28-edge-code)では $\rho_A=\rho_a\otimes I_2/2$ なので固有値は $3/8,3/8,1/8,1/8$、$\sigma_A=I_4/4$。よって

$$
S(\rho_A)=S(\rho_a)+\log2,\qquad
S(\sigma_A)=\log2+\log2=2\log2.
$$

$\Delta S_A=S(\rho_a)-\log2=\Delta S_a$ です。参照モジュラーHamiltonianは $K_A^\sigma=(\log4)I_4$、$K_a^\sigma=(\log2)I_2$ だから $K_A^\sigma=K_a^\sigma\otimes I_2+(\log2)I_4$。両側の相対エントロピーは

$$
D_A=D_a=\frac34\log(3/2)+\frac14\log(1/2).
$$

ここで $\sigma_a$ は正定値です。相対エントロピーでの面積項の消去と、モジュラーHamiltonianでの面積項の残留を両方確かめました。
<!-- solution-end -->

<a id="ex-holo28-b02"></a>
### 演習 HOLO28-B02：直和の面積期待値とモジュラー作用素
- Level: B

第4節の二セクター $d_0=1,d_1=2$、$p=(1/2,1/2)$、$q=(1/4,3/4)$ に対して、$\mathcal L$、$\rho_A,\sigma_A$ の固有値、各セクターの $K_A^\sigma$ と $K_{\mathcal M}^\sigma$ を計算し、両者の差を求めよ。

<!-- solution-start -->
**詳細解答。** $\mathcal L=\operatorname{diag}(0,\log2)$ です。$A$ 側の固有値は $\rho_A:(1/2,1/4,1/4)$、$\sigma_A:(1/4,3/8,3/8)$。よって各セクター上の物理モジュラー値は

$$
K_A^\sigma:\quad
\alpha=0:\log4,\qquad \alpha=1:\log(8/3).
$$

バルク代数では $\sigma_{\mathcal M}=\operatorname{diag}(1/4,3/4)$ なので

$$
K_{\mathcal M}^\sigma:\quad
\alpha=0:\log4,\qquad\alpha=1:\log(4/3).
$$

各セクターで差は $0,\log2$ となり $\mathcal L$ と一致します。さらに $\langle\mathcal L\rangle_\rho=\tfrac12\log2$、$\langle\mathcal L\rangle_\sigma=\tfrac34\log2$、従って $\Delta\langle\mathcal L\rangle=-\tfrac14\log2$ で、状態差を取っても面積項はそれぞれの量に残ります。
<!-- solution-end -->

<a id="ex-holo28-b03"></a>
### 演習 HOLO28-B03：第一法則と相対エントロピーの二次項
- Level: B

$0<s<1$、$|t|<\min(s,1-s)$、$\sigma=\operatorname{diag}(s,1-s)$、$\rho(t)=\operatorname{diag}(s+t,1-s-t)$ とする。$S'(0)$、$\langle K_\sigma\rangle'(0)$、$D'(0)$、$D''(0)$ を求めよ。

<!-- solution-start -->
**詳細解答。** すべて正定値でトレース1です。直接微分により

$$
S'(0)=-\log s+\log(1-s)
=\log\frac{1-s}{s}.
$$

$K_\sigma=\operatorname{diag}(-\log s,-\log(1-s))$ なので、その期待値の導関数も $\log((1-s)/s)$。従って[第一法則](#prop-holo28-first-law)で $D'(0)=0$。相対エントロピーを

$$
D(t)=(s+t)\log\frac{s+t}{s}
+(1-s-t)\log\frac{1-s-t}{1-s}
$$

と書き、微分すると

$$
D'(t)=\log\frac{s+t}{s}-\log\frac{1-s-t}{1-s},
\qquad
D''(t)=\frac1{s+t}+\frac1{1-s-t}.
$$

従って $D''(0)=1/s+1/(1-s)>0$、Taylor展開の二次項は $\tfrac{t^2}2[1/s+1/(1-s)]$ です。一次の一致と有限変化での正の相対エントロピーを区別しました。
<!-- solution-end -->

<a id="ex-holo28-b04"></a>
### 演習 HOLO28-B04：不整合な面積項が作る偽のJLMS
- Level: B

有限コードで、真の関係が $S_A=S_a+\langle\mathcal L\rangle$ および $K_A^\sigma=K_a^\sigma+\mathcal L$ だとする。計算者がエントロピー辞書だけから $\mathcal L$ を落としたとき、求めた相対エントロピーの差にどの誤差が出るか。第4節の $p,q,d_\alpha$ を代入して符号も答えよ。

<!-- solution-start -->
**詳細解答。** 誤った式は $\Delta S_A^{\rm wrong}=\Delta S_a$ です。モジュラー差は正しく $\Delta\langle K_A^\sigma\rangle=\Delta\langle K_a^\sigma\rangle+\Delta\langle\mathcal L\rangle$ とするので

$$
D_A^{\rm wrong}
=\Delta\langle K_a^\sigma\rangle+\Delta\langle\mathcal L\rangle-\Delta S_a
=D_a+\Delta\langle\mathcal L\rangle.
$$

第4節の二セクターでは $\Delta\langle\mathcal L\rangle=(p_1-q_1)\log2=(1/2-3/4)\log2=-\tfrac14\log2$。従って偽の差は $-\tfrac14\log2$ です。本来の等式は[直和コード定理](#thm-holo28-sector-jlms)により $D_A-D_a=0$。片方の辞書だけ反項・面積寄与を落とすと相殺機構が壊れます。
<!-- solution-end -->

### Level C：参照状態・中心・誤差次数を統合する

<a id="ex-holo28-c01"></a>
### 演習 HOLO28-C01：二セクターJLMSの全計算と適用範囲
- Level: C

二セクター直和コードで $d_0=1,d_1=2$、$p_0=2/3,p_1=1/3$、$q_0=1/3,q_1=2/3$、各 $a_\alpha,b_\alpha$ は一次元とする。

1. コード、物理 $A$ の二状態が密度行列となることを確認し、$\rho_A,\sigma_A$ の非零固有値を列挙せよ。
2. $S_A(\rho),S_A(\sigma)$、$S_{\mathcal M}(\rho),S_{\mathcal M}(\sigma)$ と面積型期待値の差を求めよ。
3. $K_A^\sigma,K_{\mathcal M}^\sigma$ の各セクター固有値を求め、モジュラー関係を検証せよ。
4. $D_A(\rho\Vert\sigma)$ と $D_{\mathcal M}(\rho\Vert\sigma)$ を直接計算し、等号を確かめよ。
5. これだけから、一般の連続体重力のJLMSが誤差ゼロで成立し、任意の領域の全演算子が復号できる、と言えるか。欠けた仮定を述べよ。

<!-- solution-start -->
**詳細解答。**

(1) 異なるセクターは直交し、$V$ は各セクターに規格化されたBell対を付けるので等長です。各 $p,q$ は正で和1だから物理縮約も密度行列です。セクター0は一次元、セクター1では最大混合二次元を付けるため

$$
\rho_A=\operatorname{diag}(2/3,1/6,1/6),\qquad
\sigma_A=\operatorname{diag}(1/3,1/3,1/3).
$$

両状態はこの三次元の物理 $A$ 空間で正定値です。

(2) $H(p)=-\tfrac23\log(2/3)-\tfrac13\log(1/3)$ と書くと、[直和コードのJLMS型恒等式](#thm-holo28-sector-jlms)より

$$
S_{\mathcal M}(\rho)=H(p),\quad
S_A(\rho)=H(p)+\tfrac13\log2.
$$

$q$ は $p$ を入れ替えただけなので $H(q)=H(p)$、従って $S_{\mathcal M}(\sigma)=H(p)$、$S_A(\sigma)=H(p)+\tfrac23\log2$。よって $\Delta S_{\mathcal M}=0$、$\Delta S_A=-\tfrac13\log2$、$\Delta\langle\mathcal L\rangle=(1/3-2/3)\log2=-\tfrac13\log2$ です。

(3) 参照状態 $\sigma_A=I_3/3$ なので $K_A^\sigma=(\log3)I_3$。一方 $\sigma_{\mathcal M}=\operatorname{diag}(1/3,2/3)$ なので、セクター0と1の $K_{\mathcal M}^\sigma$ はそれぞれ $\log3,\log(3/2)$。差は $0,\log2$ であり $\mathcal L$ に等しいです。

(4) 定義から

$$
\begin{aligned}
D_A&=\tfrac23\log\frac{2/3}{1/3}
+2\cdot\tfrac16\log\frac{1/6}{1/3}
=\tfrac23\log2-\tfrac13\log2=\tfrac13\log2,\\
D_{\mathcal M}&=\tfrac23\log\frac{2/3}{1/3}
+\tfrac13\log\frac{1/3}{2/3}
=\tfrac13\log2.
\end{aligned}
$$

モジュラー表示からも $\Delta\langle K_A^\sigma\rangle=0$ なので $D_A=-\Delta S_A=\tfrac13\log2$。バルク側では $\Delta\langle K_{\mathcal M}^\sigma\rangle=\tfrac13\log2$、$\Delta S_{\mathcal M}=0$、一致します。

(5) **言えません。** ここで証明したのは有限次元直和コードの式だけです。重力側では、(i) 適切な半古典コード部分空間と共通QES・くさび、(ii) 正則化・反項を含む一般化エントロピー辞書、(iii) ゲージ拘束と重力エッジ寄与、(iv) 参照状態の台・モジュラー作用素の定義域、(v) 制御された $G_N$ 展開と誤差次数が追加で必要です。さらに二状態の等号だけでは全演算子の復号条件を示せず、[HOLO27の演算子再構成の定義](../HOLO27/index.md#def-holo27-subregion-reconstruction)を別に確かめる必要があります。
<!-- solution-end -->

## 7. まとめと次講

有限次元では、モジュラーHamiltonianが参照状態の負の対数であることを出発点に、相対エントロピーの差の公式、第一法則、固定セクターと直和セクターでのJLMS型の恒等式を計算しました。面積型項は消えるほど小さいのではなく、**エントロピーとモジュラー期待値の双方に現れるため相殺**されます。

半古典重力に移すには、共通のコード・くさび・QES、繰り込みと次数の管理、モジュラー演算子の適切な意味が追加で要ります。この限定された情報的辞書を使う次の講義は **HOLO29「消失訂正としてのバルク」** です。

**参考文献**：Jafferis–Lewkowycz–Maldacena–Suh, [*Relative entropy equals bulk relative entropy*](https://arxiv.org/abs/1512.06431)；Harlow, [*The Ryu–Takayanagi Formula from Quantum Error Correction*](https://arxiv.org/abs/1607.03901)；Harlow, [*TASI Lectures on the Emergence of the Bulk in AdS/CFT*](https://arxiv.org/abs/1802.01040)。本章の有限行列・直和コードの証明と、重力側に用いる条件付きの主張は区別しています。
