# BHI13 デカップリングと回収閾値

<!-- definition-example-audit: strict -->

## 1. なぜ「少し余分に放出する」と日記を取り戻せるのか

[BHI12の投入模型](../BHI12/index.md#def-bhi12-old-input)では、日記 $A$ と参照系 $M$、古いブラックホール $B$ と早期放射 $E$ をそれぞれ最大エンタングル対にしました。内部ユニタリ $U:AB\to CD$ の後、外部の受信者が持つのは $DE$、手が届かない残存系は $C$ です。[BHI12の完全回収条件](../BHI12/index.md#thm-bhi12-recovery-condition)は、$MC$ が積状態なら日記を完全に復号できる、と述べます。

しかしBHI12のSWAP型配置と恒等配置は同じ入出力次元で正反対の結果を生みました。**次元だけ**では、内部発展が日記の情報をどこへ運ぶか分かりません。そこで本講では、固定した一つの内部発展ではなく、全ユニタリを等しい対称性で平均する**Haarランダム模型**を調べます。[QINF31で定義した正規化Haar分布](../../../応用系/QINF/QINF31/index.md#def-qinf31-haar)は、固定したユニタリを左または右から掛けても分布が変わらない分布です。

目標は「ランダムなら復号できる」という印象論を、**平均二次偏差 → 高確率の距離評価 → 回復誤差**という三つの計算で数式にすることです。以下の議論は有限次元量子系についての確率定理であり、物理的な時間発展がHaar分布になると仮定した結論ではありません。

## 2. 系の次元と測るべき漏洩

次元は $a=d_A=d_M$、$b=d_B=d_E$、$c=d_C$、$d=d_D$ と略記します。BHI12と同じ純粋状態を入力し、$U$ の分布だけを追加します。出力次元と入力次元は必ず一致させます。

<a id="def-bhi13-haar-experiment"></a>

<!-- formal-statement-start -->
> **定義（Haar投入・放出実験）**
>
> $a,b,c,d$ を正整数とし、$N=ab=cd$ とする。$M,A$ はそれぞれ $a$ 次元、$B,E$ はそれぞれ $b$ 次元、$C,D$ はそれぞれ $c,d$ 次元の複素Hilbert空間である。固定した正規直交基底に関して、初期状態と出力状態を

$$
|\Psi_0\rangle=|\Phi_a\rangle_{MA}\otimes|\Phi_b\rangle_{BE},
\qquad
|\Psi_U\rangle=(I_M\otimes U_{AB\to CD}\otimes I_E)|\Psi_0\rangle
$$

> とする。$U$ は $AB$ から $CD$ へのユニタリ写像全体の**正規化Haar分布**から一度選ぶ。$U$ が決まればその後の状態も決まる。期待値 $\mathbb E_U$ と確率 $\Pr_U$ はこの選択についてのみ取る。
<!-- formal-statement-end -->

Haar分布は、[QINF31の構成と一意性](../../../応用系/QINF/QINF31/index.md#thm-qinf31-gaussian-haar)で導入済みのものです。$AB$ と $CD$ は共に $N$ 次元なので、それぞれ基底を固定して $U(N)$ 上の分布を使えます。$U$ は一つの実験で**全入力について固定**し、入力ごとに引き直しません。

<!-- definition-example-start: def-bhi13-haar-experiment -->
**定義の確認。** $a=b=c=d=2$ とすると $N=4$ です。入力と出力の基底を $|a_0b_0\rangle$ と $|c_0d_0\rangle$ で番号付けすれば、$U$ は $4\times4$ ユニタリ行列となります。基底を固定してから $U(4)$ のHaar分布を取るので、左右の固定ユニタリ変換でも分布は変わりません。初期の二つのBell対は規格化され、出力もユニタリ性からノルム1です。$M$ と $E$ には $U$ を掛けないので、[BHI12の独立性](../BHI12/index.md#prop-bhi12-early-independence)も維持されます。
<!-- definition-example-end -->

受信者が復号できるかは、捨てられる系 $C$ と参照 $M$ の相関で測れます。[QINF29の完全デカップリング](../../../応用系/QINF/QINF29/index.md#def-qinf29-decoupling)は厳密な積状態ですが、ランダム模型では積からのずれを測る必要があります。[QINF11のトレース距離](../../../応用系/QINF/QINF11/index.md#def-qinf11-trace-distance)と、行列の特異値を平方して足すHilbert–Schmidtノルムを使います。

<a id="def-bhi13-decoupling-error"></a>

<!-- formal-statement-start -->
> **定義（残存系へのデカップリング誤差）**
>
> [Haar投入・放出実験](#def-bhi13-haar-experiment)の各出力に対し、

$$
\rho_{MC}(U)=\operatorname{Tr}_{DE}|\Psi_U\rangle\langle\Psi_U|,
\qquad
\rho_C(U)=\operatorname{Tr}_M\rho_{MC}(U),
\qquad
\pi_M=\frac{I_M}{a}
$$

> と置く。$MC$ 上のHermitian作用素とその非負の誤差を

$$
X(U)=\rho_{MC}(U)-\pi_M\otimes\rho_C(U),
\qquad
L(U)=\|X(U)\|_1,
\qquad
Q(U)=\|X(U)\|_2^2=\operatorname{Tr}X(U)^2
$$

> と定義する。$\|\cdot\|_1$ は特異値の和、$\|\cdot\|_2^2$ は特異値の二乗和である。$L=0$ と[BHI12の完全回収条件](../BHI12/index.md#thm-bhi12-recovery-condition)は同値である。
<!-- formal-statement-end -->

ここでは比較相手の $\rho_C(U)$ も $U$ に依存することが大切です。**平均状態を先に取ってから積を作る**計算ではありません。$M$ の縮約は常に $\pi_M$ ですが、$C$ の縮約は標本ごとに変動します。

<!-- definition-example-start: def-bhi13-decoupling-error -->
**定義の確認。** 前講のSWAP型配置 $U_{\rm good}|i,j\rangle=|j,i\rangle_{CD}$ なら $|\Psi_U\rangle=|\Phi_a\rangle_{MD}\otimes|\Phi_b\rangle_{CE}$（ここでは $a=b=c=d=2$）で、$\rho_{MC}=\pi_M\otimes\pi_C$、$X=0$、$L=Q=0$ です。

反対に $U_{\rm bad}|i,j\rangle=|i,j\rangle_{CD}$ として日記を $C$ に残せば、$\rho_{MC}=|\Phi_2\rangle\langle\Phi_2|$、$\rho_C=I_C/2$ です。$X=|\Phi_2\rangle\langle\Phi_2|-I_{MC}/4$ の固有値は $3/4$ が一つ、$-1/4$ が三つなので

$$
L=\frac34+3\frac14=\frac32,
\qquad
Q=\left(\frac34\right)^2+3\left(\frac14\right)^2=\frac34.
$$

どちらも同じ $d=a=2$ ですが誤差は異なります。
<!-- definition-example-end -->

## 3. 二コピーの交換作用素でHaar平均を計算する

[QINF31の交換作用素](../../../応用系/QINF/QINF31/index.md#def-qinf31-swap) $F_K$ は、二コピーの $K\otimes K$ 上で $|x\rangle|y\rangle$ を $|y\rangle|x\rangle$ に移します。[swap trick](../../../応用系/QINF/QINF31/index.md#lem-qinf31-swap-trick)により、縮約密度演算子のpurityを二コピーのトレースで表せます。

ただし今回は**一つの純粋状態をHaarで選ぶ**QINF31の設定とは違います。入力の二対のBell状態を固定し、$AB$ のユニタリだけをHaarで選びます。そこで次の二コピー平均を導きます。

<a id="lem-bhi13-two-copy-twirl"></a>

<!-- formal-statement-start -->
> **補題（投入系のHaar二コピー平均）**
>
> $N=ab=cd\ge2$ とし、$U:AB\to CD$ を[Haar投入・放出実験](#def-bhi13-haar-experiment)の分布から選ぶ。$CD$ の二コピー上の作用素を $Y=F_C\otimes I_{DD'}$（因子の並びは $CC'DD'$）とする。入力二コピー $AB,A'B'$ への引き戻し平均は

$$
\mathbb E_U\!\left[(U^\dagger\otimes U^\dagger)Y(U\otimes U)\right]
=\alpha I_{ABA'B'}+\beta F_{AB},
$$

$$
\alpha=\frac{c(d^2-1)}{N^2-1},
\qquad
\beta=\frac{d(c^2-1)}{N^2-1},
\qquad
F_{AB}=F_A\otimes F_B.
$$
<!-- formal-statement-end -->

### 証明の見取り図

左右のHaar不変性を使うと、平均後の作用素はすべての $V\otimes V$ と可換です。二コピー上でこの性質を満たす作用素は $I$ と交換作用素 $F$ の線形結合なので、係数はトレースを二種類計算して決まります。重要なのは $F_C$ だけを交換し、$D$ は交換しないことです。

<!-- proof-start -->
### 証明

平均を $T$ とします。[Haar分布の左右不変性](../../../応用系/QINF/QINF31/index.md#thm-qinf31-gaussian-haar)により、固定した $V\in U(N)$ に対し $UV$ と $U$ が同分布です。よって

$$
(V^\dagger\otimes V^\dagger)T(V\otimes V)=T.
$$

ここで $T=pI+qF_{AB}$ の形になることを有限次元で確認します。$AB\cong\mathbb C^N$ の基底を $|i\rangle$ とすると、独立な対角位相変換との可換性から $T|ii\rangle$ は $|ii\rangle$ の倍数で、$i\ne j$ の $T|ij\rangle$ は $|ij\rangle,|ji\rangle$ の線形結合です。基底の置換との可換性から、$T|ii\rangle=x|ii\rangle$、$T|ij\rangle=p|ij\rangle+q|ji\rangle$ と係数を共通にできます。$|i\rangle$ を $(|i\rangle+|j\rangle)/\sqrt2$ に写す二次元ユニタリを $|ii\rangle$ に作用させて両辺を比較すると、$|ij\rangle+|ji\rangle$ の係数から $x=p+q$ が必要です。したがって $T=pI+qF_{AB}$。$N=2$ でもこの議論が成立します。

ユニタリ共役はトレースを保つので、$\operatorname{Tr}T=\operatorname{Tr}Y$ です。また $F_{AB}$ は $U\otimes U$ の下で $F_{CD}$ へ写るため、$\operatorname{Tr}(TF_{AB})=\operatorname{Tr}(YF_{CD})$ です。$F_{CD}=F_C\otimes F_D$ を使うと

$$
\operatorname{Tr}Y=\operatorname{Tr}F_C\,\operatorname{Tr}I_{DD'}=cd^2,
$$

$$
\operatorname{Tr}(YF_{CD})
=\operatorname{Tr}I_{CC'}\,\operatorname{Tr}F_D=c^2d.
$$

さらに $\operatorname{Tr}I=N^2$、$\operatorname{Tr}F_{AB}=N$、$F_{AB}^2=I$ なので

$$
N^2p+Nq=cd^2,
\qquad
Np+N^2q=c^2d.
$$

第1式の $p=(cd^2-Nq)/N^2$ を第2式へ代入すると

$$
N\frac{cd^2-Nq}{N^2}+N^2q=c^2d,
\qquad
q=\frac{c^2d-cd^2/N}{N^2-1}
=\frac{d(c^2-1)}{N^2-1}.
$$

同様に $p=c(d^2-1)/(N^2-1)$。これが $\alpha,\beta$ です。
<!-- proof-end -->

退化した $N=1$ では四系の次元がすべて1で、状態は必ず積、$X=0$ です。補題の分母 $N^2-1$ にその場合を代入してはいけません。

## 4. 残存系への漏洩の平均を厳密に求める

二コピー平均を得れば、個々の成分の大きな行列を積分せずに平均purityを計算できます。$MC$ の次元は $ac$、その比較状態は $\pi_M\otimes\rho_C$ です。

<a id="thm-bhi13-mean-decoupling"></a>

<!-- formal-statement-start -->
> **定理（Haar投入模型の平均デカップリング二次偏差）**
>
> [Haar投入・放出実験](#def-bhi13-haar-experiment)で $N=ab=cd\ge2$ とする。[誤差](#def-bhi13-decoupling-error) $Q(U)$ の厳密なHaar平均は

$$
\mathbb E_U Q(U)
=\frac{(a^2-1)d(c^2-1)}{a^2b(N^2-1)}.
$$

> 特に、$MC$ の次元 $ac$ を掛けた量を $\Theta$ と置くと

$$
\Theta:=ac\,\mathbb E_U Q(U)
=\frac{(a^2-1)(N^2-d^2)}{d^2(N^2-1)}
\le\frac{a^2}{d^2}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

[swap trick](../../../応用系/QINF/QINF31/index.md#lem-qinf31-swap-trick)で $\operatorname{Tr}\rho_{MC}^2$ と $\operatorname{Tr}\rho_C^2$ を別々に計算し、差を取ります。$MA$ と $BE$ が**純粋な最大エンタングル対**であることは、二コピーの各交換作用素の期待値を $1,1/a,1/b$ に置く場所で使います。

<!-- proof-start -->
### 証明

$\rho_0=|\Psi_0\rangle\langle\Psi_0|$ とします。[swap trick](../../../応用系/QINF/QINF31/index.md#lem-qinf31-swap-trick)を $MC$ 側に適用すると、$M$ と $C$ の二コピーを交換し、$D,E$ はそのままにして

$$
\operatorname{Tr}\rho_{MC}^2
=\operatorname{Tr}\!\left[
(\rho_0\otimes\rho_0)
\bigl(F_M\otimes(U^\dagger\otimes U^\dagger)
(F_C\otimes I_{DD'})(U\otimes U)\otimes I_{EE'}\bigr)
\right].
$$

因子の順序は $MM'|AA'BB'|EE'$ に並べ替えています。補題の平均 $\alpha I+\beta F_A\otimes F_B$ を代入します。純粋Bell対の二コピーに対して、交換作用素の期待値は

$$
\operatorname{Tr}(\Phi_{MA}^{\otimes2}F_M)
=\operatorname{Tr}\pi_M^2=\frac1a,
\qquad
\operatorname{Tr}(\Phi_{MA}^{\otimes2}F_MF_A)
=\operatorname{Tr}\Phi_{MA}^2=1,
$$

$$
\operatorname{Tr}(\Phi_{BE}^{\otimes2}F_B)
=\operatorname{Tr}\pi_B^2=\frac1b.
$$

したがって $\alpha$ 項では $1/a$、$\beta$ 項では $1\cdot1/b$ が残り、

$$
\mathbb E_U\operatorname{Tr}\rho_{MC}^2
=\frac{\alpha}{a}+\frac{\beta}{b}.
$$

同じ方法で $C$ だけのpurityには $F_M$ を入れません。$\alpha$ 項は1、$\beta$ 項は $F_A,F_B$ の期待値 $1/a,1/b$ の積となるので

$$
\mathbb E_U\operatorname{Tr}\rho_C^2
=\alpha+\frac{\beta}{ab}.
$$

次に $X=\rho_{MC}-\pi_M\otimes\rho_C$ を二乗します。$\operatorname{Tr}_M\rho_{MC}=\rho_C$ と $\operatorname{Tr}\pi_M^2=1/a$ から、交差項は

$$
\operatorname{Tr}[\rho_{MC}(\pi_M\otimes\rho_C)]
=\frac1a\operatorname{Tr}\rho_C^2,
\qquad
\operatorname{Tr}(\pi_M\otimes\rho_C)^2
=\frac1a\operatorname{Tr}\rho_C^2.
$$

よって標本ごとに

$$
Q=\operatorname{Tr}\rho_{MC}^2-\frac1a\operatorname{Tr}\rho_C^2.
$$

先ほどの平均を代入すると $\alpha$ は相殺し、

$$
\begin{aligned}
\mathbb E_U Q
&=\left(\frac\alpha a+\frac\beta b\right)
-\frac1a\left(\alpha+\frac\beta{ab}\right)\\
&=\frac\beta b\left(1-\frac1{a^2}\right)
=\frac{(a^2-1)d(c^2-1)}{a^2b(N^2-1)}.
\end{aligned}
$$

最後に $c=N/d$ と $cd=N=ab$ を順に代入します。まず $cd=ab$ によって分母の $ab$ が消え、次に $c^2-1=(N^2-d^2)/d^2$ となるので

$
\begin{aligned}
ac\,\mathbb E_U Q
&=\frac{(a^2-1)cd(c^2-1)}{ab(N^2-1)}\\
&=\frac{(a^2-1)(c^2-1)}{N^2-1}\\
&=\frac{(a^2-1)(N^2-d^2)}{d^2(N^2-1)}
\end{aligned}
$

を得ます。最後の変形では $c/b=a/d$、$d(c^2-1)= (N^2-d^2)/d$ を順に使いました。$d\ge1$、$N\ge d$ なので $0\le(N^2-d^2)/(N^2-1)\le1$ であり、$a^2-1\le a^2$ と合わせて不等式が従います。
<!-- proof-end -->

**数値検算。** $a=b=c=d=2$ なら $N=4$、$\alpha=\beta=2/5$ です。式に入れると

$$
\mathbb E\operatorname{Tr}\rho_{MC}^2=\frac25,
\qquad
\mathbb E\operatorname{Tr}\rho_C^2=\frac12,
\qquad
\mathbb E Q=\frac25-\frac12\frac12=\frac3{20}.
$$

$ac=4$ を掛けると $\Theta=3/5$ です。$d=ab$（すべて放出、$c=1$）なら $\Theta=0$ になり、外部は当然すべての入力を持てます。

## 5. 平均から「ほとんどのユニタリ」を保証する

平均の小ささと、一度選んだ $U$ での誤差は違います。ここを橋渡しするには、行列の特異値に対するCauchy–Schwarzと、非負確率変数へのMarkov不等式を使います。前者は[QINF31の平均偏差の確率評価](../../../応用系/QINF/QINF31/index.md#prop-qinf31-typicality)でも使われた方法です。

<a id="prop-bhi13-tail"></a>

<!-- formal-statement-start -->
> **命題（Haar投入模型のデカップリング確率界）**
>
> 前定理の仮定の下で、任意の $\lambda>0$ に対し

$$
\mathbb E_U L(U)\le\sqrt{\Theta}\le\frac{a}{d},
$$

$$
\Pr_U\{L(U)\ge\lambda\}
\le\min\left\{1,\frac{\Theta}{\lambda^2}\right\}
\le\min\left\{1,\frac{a^2}{d^2\lambda^2}\right\}.
$$

> $N=1$ では $L=0$ であり同じ確率上界を自明に満たす。
<!-- formal-statement-end -->

### 証明の見取り図

$MC$ の次元は $ac$ なので、特異値の和の二乗は $ac$ 倍の二乗和以下です。これを標本ごとに使い、Haar平均を取り、平方根の凹性とMarkov不等式をそれぞれ適用します。

<!-- proof-start -->
### 証明

$X$ の非零特異値を $s_1,\ldots,s_r$ とすると $r\le ac$ です。[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)で

$$
L^2=\left(\sum_{j=1}^r s_j\right)^2
\le r\sum_{j=1}^r s_j^2
\le ac\,Q.
$$

平均を取って[平均二次偏差](#thm-bhi13-mean-decoupling)を使うと $\mathbb E L^2\le ac\,\mathbb E Q=\Theta$。確率変数に対するCauchy–Schwarzから $(\mathbb E L)^2\le\mathbb E L^2$ です。さらに非負の $L^2$ について[Markovの不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-markov)を適用すると

$$
\Pr(L\ge\lambda)
=\Pr(L^2\ge\lambda^2)
\le\frac{\mathbb E L^2}{\lambda^2}
\le\frac{\Theta}{\lambda^2}.
$$

確率は1以下で、$\Theta\le a^2/d^2$ なので結論です。
<!-- proof-end -->

この界が小さくなる条件は $d$ が $a$ より十分大きいことです。**追加放射の次元は $d$、日記の次元は $a$** であり、古い内部の次元 $b$ は $cd=ab$ という制約に現れます。$b$ を無限大にするだけで、固定の $d/a$ に対して保証誤差が必ず零になるわけではありません。

## 6. 回復可能性を受信者側の誤差に翻訳する

前節の $L$ は受信者が触れない $MC$ の状態から計算した量です。これを「実際に $DE$ に作用する復号器が存在する」へ移します。[QINF30の環境距離と回復誤差の評価](../../../応用系/QINF/QINF30/index.md#thm-qinf30-information-disturbance)は、受信者のチャネルに対し、最適な復号のエンタングルメント不忠実度が環境とのトレース距離の2倍以下と保証します。

<a id="thm-bhi13-recovery-threshold"></a>

<!-- formal-statement-start -->
> **定理（Haar投入模型の高確率回収閾値）**
>
> $a,b,c,d\ge1$、$ab=cd=N\ge2$ の[Haar投入・放出実験](#def-bhi13-haar-experiment)と、[BHI12の受信チャネル](../BHI12/index.md#def-bhi12-recovery-task) $\mathcal N_{A\to DE}$ を考える。各 $U$ について、$DE$ から日記 $A$ へのCPTP回復写像を最適化したエンタングルメント忠実度を $F_{\mathrm e,opt}(U)$ とする。任意の $\varepsilon>0$ について

$$
\Pr_U\{1-F_{\mathrm e,opt}(U)\ge\varepsilon\}
\le\min\left\{1,\frac{\Theta}{\varepsilon^2}\right\}
\le\min\left\{1,\frac{a^2}{d^2\varepsilon^2}\right\}.
$$

> 特に $0<\eta<1$、$0<\varepsilon<1$ を固定し、

$$
d\ge\frac{a}{\varepsilon\sqrt{\eta}}
$$

> が満たされれば、確率少なくとも $1-\eta$ で、**エンタングルメント不忠実度が $\varepsilon$ 以下のCPTP回復写像が存在する**。この保証は最適回復の存在についてであり、復号回路の計算時間を評価しない。
<!-- formal-statement-end -->

### 証明の見取り図

[BHI12の等長写像](../BHI12/index.md#thm-bhi12-recovery-condition)を、論理入力 $A$、受信側 $DE$、環境 $C$ に分けてQINF30へ渡します。環境の参照系との距離は $\Delta=L/2$ なので、最適回復誤差は $L$ 以下です。あとは確率界をそのまま適用します。

<!-- proof-start -->
### 証明

BHI12の構成で $|\Phi_b\rangle_{BE}$ を固定して付加し、$U$ を適用する等長写像を $W_U:A\to CDE$ とします。$W_U^\dagger W_U=I_A$ は[BHI12の完全回収条件の証明](../BHI12/index.md#thm-bhi12-recovery-condition)で、$U^\dagger U=I_{AB}$ とBell対の規格化から確認済みです。

従って $\mathcal N_{A\to DE}=\operatorname{Tr}_C(W_U\,\cdot\,W_U^\dagger)$ は有限次元CPTPチャネルで、環境は $C$、参照系は $M$ です。最大エンタングル入力で作る環境の状態は $\rho_{MC}(U)$、参照系の状態は $\pi_M$ です。[QINF30の情報・擾乱評価](../../../応用系/QINF/QINF30/index.md#thm-qinf30-information-disturbance)の記号に代入すると

$$
\Delta(U)=\frac12\|\rho_{MC}(U)-\pi_M\otimes\rho_C(U)\|_1
=\frac{L(U)}2.
$$

従って

$$
1-F_{\mathrm e,opt}(U)
\le2\Delta(U)-\Delta(U)^2
\le2\Delta(U)=L(U).
$$

もし $1-F_{\mathrm e,opt}\ge\varepsilon$ なら $L\ge\varepsilon$ です。この事象の包含関係と[デカップリング確率界](#prop-bhi13-tail)から

$$
\Pr_U(1-F_{\mathrm e,opt}\ge\varepsilon)
\le\Pr_U(L\ge\varepsilon)
\le\frac{\Theta}{\varepsilon^2}
\le\frac{a^2}{d^2\varepsilon^2}.
$$

最後の条件 $d\ge a/(\varepsilon\sqrt\eta)$ なら右端は $\eta$ 以下です。したがって確率少なくとも $1-\eta$ で最適不忠実度は $\varepsilon$ 以下となり、有限次元で最適化を達成するCPTP回復が存在します。これで結論です。
<!-- proof-end -->

[BHI12の次元下界](../BHI12/index.md#prop-bhi12-output-lower-bound) $d\ge a$ は**完全回収の必要条件**でした。今回の $d\ge a/(\varepsilon\sqrt\eta)$ は、Haar模型で**高い忠実度を保証する十分条件**です。両者は同じ主張ではありません。また[QINF30の一様回復評価](../../../応用系/QINF/QINF30/index.md#prop-qinf30-uniform-bound)を使えば、エンタングルメント忠実度から任意の入力状態と補助参照系についての距離上界へ換算できますが、そこには追加の $a$ の因子が現れます。

## 7. 何量子ビット余分に必要か

$k,m,s$ を非負整数、$0\le s\le m$ とし、日記を $k$ 量子ビット、古い内部を $m$ 量子ビット、追加放射を $k+s$ 量子ビットにします。$d_D=2^{k+s}$ と書くと、残存系は $d_C=2^{m-s}$ です。

<a id="cor-bhi13-extra-qubits"></a>

<!-- formal-statement-start -->
> **系（余分な放射量子ビットと回収誤差）**
>
> 前定理のHaar模型で $a=2^k$、$b=2^m$、$d=2^{k+s}$、$c=2^{m-s}$、$k,m\ge0$、$0\le s\le m$ とする。$N=ab\ge2$ のとき

$$
\Theta
=\frac{(2^{2k}-1)(2^{2(k+m)}-2^{2(k+s)})}
{2^{2(k+s)}(2^{2(k+m)}-1)}
\le2^{-2s}.
$$

> したがって任意の $\varepsilon>0$ について

$$
\Pr_U\{1-F_{\mathrm e,opt}\ge\varepsilon\}
\le\min\{1,2^{-2s}/\varepsilon^2\}.
$$
<!-- formal-statement-end -->

**導出。** [平均デカップリング二次偏差](#thm-bhi13-mean-decoupling)に四次元を代入し、分子の比 $(N^2-d^2)/(N^2-1)\le1$ と $(a^2-1)/a^2\le1$ を使うと、$\Theta\le a^2/d^2=2^{-2s}$ です。[回復閾値定理](#thm-bhi13-recovery-threshold)へ代入して確率界が得られます。

例えば日記1量子ビット、古い内部3量子ビット、追加放射3量子ビットなら $(k,m,s)=(1,3,2)$、$a=2,b=8,c=2,d=8,N=16$ です。厳密値は

$$
\Theta=\frac{(4-1)(256-64)}{64(256-1)}=\frac3{85}.
$$

不忠実度 $\varepsilon=1/2$ を超える確率は高々 $(3/85)/(1/4)=12/85$ と計算できます。簡略評価 $2^{-2s}/\varepsilon^2=1/4$ より厳密値の方が強いことも確かめられます。

ここで「余分」は**日記の $k$ 量子ビットと同数を放出した後の $s$ 量子ビット**という意味です。日記の大きさに関係なく、追加放射が数量子ビットだけで必ず回収できるという意味ではありません。ランダムな情報混合の成立時刻と、復号計算量は次のBHI14で扱います。

## 8. 演習：二コピー平均から回収保証まで

### Level A：記号・次元・小さな計算

<a id="ex-bhi13-a01"></a>

#### BHI13-A01 次元保存と余剰放射

- Level: A
- 問題: $a=2,b=8,d=8$ とする。$c,N$ を求め、日記・追加放射・余剰放射の量子ビット数を示せ。$U$ の入力・出力行列の大きさも求めよ。

<!-- solution-start -->
**詳細解答。** $N=ab=16$、$cd=16$ より $c=16/8=2$ です。日記は $\log_2a=1$ 量子ビット、放射は $\log_2d=3$ 量子ビットで、余剰は $s=3-1=2$ です。残存系は $\log_2c=1$ 量子ビット。$U$ は $AB$ の16次元から $CD$ の16次元へのユニタリなので、基底表示は $16\times16$ 行列です。$E$ は初期から存在して受信者が保管する8次元の早期放射で、追加放射 $D$ とは別です。
<!-- solution-end -->

<a id="ex-bhi13-a02"></a>

#### BHI13-A02 swapのトレース

- Level: A
- 問題: $c=2,d=3$ とする。二コピー作用素 $Y=F_C\otimes I_{DD'}$ と $F_{CD}=F_C\otimes F_D$ に対し $\operatorname{Tr}Y$、$\operatorname{Tr}(YF_{CD})$、$\operatorname{Tr}F_{CD}$ を求めよ。

<!-- solution-start -->
**詳細解答。** [交換作用素](../../../応用系/QINF/QINF31/index.md#def-qinf31-swap)のトレースは次元に等しいので、$\operatorname{Tr}F_C=2$、$\operatorname{Tr}F_D=3$。単位作用素の二コピーでのトレースは $\operatorname{Tr}I_{DD'}=3^2=9$ です。よって $\operatorname{Tr}Y=2\cdot9=18$。$YF_{CD}=F_C^2\otimes F_D=I_{CC'}\otimes F_D$ なので $\operatorname{Tr}(YF_{CD})=2^2\cdot3=12$。また $\operatorname{Tr}F_{CD}=cd=6$ です。$18$ と $12$ の取り違えは、放射 $D$ まで交換したことを意味します。
<!-- solution-end -->

<a id="ex-bhi13-a03"></a>

#### BHI13-A03 二コピー係数

- Level: A
- 問題: $a=b=c=d=2$ で、[Haar二コピー平均](#lem-bhi13-two-copy-twirl)の $\alpha,\beta$ を求めよ。トレースに関する二つの線形方程式も検算せよ。

<!-- solution-start -->
**詳細解答。** $N=4$ なので $\alpha=c(d^2-1)/(N^2-1)=2(4-1)/(16-1)=2/5$。同じく $\beta=d(c^2-1)/(N^2-1)=2/5$。したがって

$$
N^2\alpha+N\beta=16\frac25+4\frac25=8=cd^2,
$$

$$
N\alpha+N^2\beta=4\frac25+16\frac25=8=c^2d.
$$

二つの独立なトレース条件を同時に満たすことが確認できました。
<!-- solution-end -->

<a id="ex-bhi13-a04"></a>

#### BHI13-A04 同じ次元でも回復は違う

- Level: A
- 問題: $a=b=c=d=2$ とし、$U_{\rm good}|i,j\rangle=|j,i\rangle_{CD}$ と $U_{\rm bad}|i,j\rangle=|i,j\rangle_{CD}$ を比較する。両者の $\rho_{MC}$ と $L$ を求めよ。

<!-- solution-start -->
**詳細解答。** goodでは日記 $A$ が $D$ へ移り、古い内部 $B$ が $C$ へ移るため、全状態は $\Phi_{MD}\otimes\Phi_{CE}$ です。$DE$ を捨てると $\rho_{MC}=\pi_M\otimes\pi_C=I_4/4$、従って $L=0$。badでは日記 $A$ が $C$ に残り、$B$ が $D$ へ移るため全状態は $\Phi_{MC}\otimes\Phi_{DE}$。よって $\rho_{MC}=\Phi_{MC}$、$\rho_C=I_C/2$ です。差 $X=\Phi_{MC}-I_4/4$ はBellベクトル方向で固有値 $1-1/4=3/4$、直交補空間で $-1/4$（三重）です。特異値の和は $3/4+3/4=3/2$。従って次元 $d=a$ だけから回復の可否は決まりません。[完全回収条件](../BHI12/index.md#thm-bhi12-recovery-condition)によりgoodは完全回収可能、badは不可能です。
<!-- solution-end -->

<a id="ex-bhi13-a05"></a>

#### BHI13-A05 高確率保証の必要放射数

- Level: A
- 問題: 日記 $k=2$ 量子ビット、目標不忠実度 $\varepsilon=1/4$、失敗確率上限 $\eta=1/16$ とする。[回復閾値](#thm-bhi13-recovery-threshold)の簡略十分条件から必要な放射次元 $d$ と量子ビット数の下界を求めよ。古い内部に $m$ 量子ビットしかないときの制約も書け。

<!-- solution-start -->
**詳細解答。** $a=2^k=4$ です。十分条件は $d\ge a/(\varepsilon\sqrt\eta)$。$\sqrt\eta=1/4$ なので分母は $(1/4)(1/4)=1/16$、従って $d\ge4\cdot16=64=2^6$。追加放射は少なくとも6量子ビットで、日記2量子ビットを超える余剰は $s=4$ 量子ビットです。次元保存 $cd=ab=2^{2+m}$ と $c\ge1$ のため $d\le2^{2+m}$ であり、この十分条件を満たすには $m\ge4$ が必要です。満たせなくても復号不可能と結論できるわけではなく、**この上界による保証が出ない**だけです。
<!-- solution-end -->

### Level B：平均・確率・回復の橋渡し

<a id="ex-bhi13-b01"></a>

#### BHI13-B01 平均purityを二通りに検算する

- Level: B
- 問題: $a=2,b=8,c=2,d=8$ について、$\alpha,\beta$、$\mathbb E\operatorname{Tr}\rho_{MC}^2$、$\mathbb E\operatorname{Tr}\rho_C^2$、$\mathbb E Q$、$\Theta$ を順に求めよ。

<!-- solution-start -->
**詳細解答。** $N=16$ です。[二コピー補題](#lem-bhi13-two-copy-twirl)から

$$
\alpha=\frac{2(8^2-1)}{16^2-1}=\frac{126}{255}=\frac{42}{85},
\qquad
\beta=\frac{8(2^2-1)}{255}=\frac{24}{255}=\frac8{85}.
$$

[平均二次偏差の証明](#thm-bhi13-mean-decoupling)で得た二つの平均purityは

$$
\mathbb E\operatorname{Tr}\rho_{MC}^2
=\frac\alpha2+\frac\beta8
=\frac{21}{85}+\frac1{85}=\frac{22}{85},
$$

$$
\mathbb E\operatorname{Tr}\rho_C^2
=\alpha+\frac\beta{16}
=\frac{42}{85}+\frac1{170}=\frac12.
$$

よって

$$
\mathbb E Q=\frac{22}{85}-\frac12\frac12
=\frac{88-85}{340}=\frac3{340}.
$$

$MC$ の次元は $ac=4$ なので $\Theta=4\cdot3/340=3/85$。定理の直接式でも $(a^2-1)(N^2-d^2)/[d^2(N^2-1)]=3\cdot192/(64\cdot255)=3/85$ となります。
<!-- solution-end -->

<a id="ex-bhi13-b02"></a>

#### BHI13-B02 平均二乗から確率上限へ

- Level: B
- 問題: 前問の模型で、$L\ge1/2$ となる確率の上限を求め、その結果から不忠実度 $1-F_{\mathrm e,opt}\ge1/2$ の確率を評価せよ。

<!-- solution-start -->
**詳細解答。** 前問で $\Theta=3/85$ と確認しました。$L^2\le ac Q$ を平均して $\mathbb E L^2\le3/85$。[Markovの不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-markov)を $L^2$ と閾値 $1/4$ に適用すると

$$
\Pr(L\ge1/2)=\Pr(L^2\ge1/4)
\le\frac{3/85}{1/4}=\frac{12}{85}.
$$

[回復閾値定理](#thm-bhi13-recovery-threshold)の証明で $1-F_{\mathrm e,opt}\le L$ を得たので、不忠実度が $1/2$ 以上の事象は $L\ge1/2$ の事象に含まれます。従って求める確率も高々 $12/85$、よい回復が存在する確率は少なくとも $73/85$ です。
<!-- solution-end -->

<a id="ex-bhi13-b03"></a>

#### BHI13-B03 正しい必要条件と十分条件

- Level: B
- 問題: $a=d=2$、$b=c=2$ の模型で、「$d\ge a$ だからほぼ確実に復号できる」という主張を反例で退けよ。また、Haar平均の上界が個々の $U$ の決定的保証でない理由を説明せよ。

<!-- solution-start -->
**詳細解答。** $U_{\rm bad}|i,j\rangle=|i,j\rangle_{CD}$ とする恒等配置では、$MC$ がBell状態、$DE$ がBell状態となり、$X=\Phi_{MC}-I_4/4\ne0$。ゆえに[BHI12の完全回収条件](../BHI12/index.md#thm-bhi12-recovery-condition)による完全回収は不可能です。$d=a$ は必要条件を満たしますが十分ではありません。Haar平均の $\mathbb E Q=3/20$ は全ユニタリの重み付き平均であり、bad標本の $Q=3/4$ と一致する必要はありません。特定の恒等配置はHaar分布では確率零の一点であっても、「どの固定ユニタリでも回復可能」とは結論できません。高確率の主張は指定したHaar分布についてのみ成り立ちます。
<!-- solution-end -->

<a id="ex-bhi13-b04"></a>

#### BHI13-B04 平均的回復と任意入力の誤差

- Level: B
- 問題: $a=2$ の固定した $U$ に対し、最適復号のエンタングルメント不忠実度が $1/100$ 以下と分かったとする。[QINF30の一様回復評価](../../../応用系/QINF/QINF30/index.md#prop-qinf30-uniform-bound)から任意の入力と補助参照系について得られるトレース距離上界を求め、Haar確率と混同してはいけない点を述べよ。

<!-- solution-start -->
**詳細解答。** 回復後の論理チャネル $\Lambda=\mathcal D\circ\mathcal N$ は $a=2$ 次元で、$F_{\mathrm e}(\pi_A,\Lambda)\ge99/100$ です。QINF30の命題では $\varepsilon=1/100$ なので、任意の参照系 $S$ と状態 $\tau_{SA}$ に対し

$$
T((\mathrm{id}_S\otimes\Lambda)(\tau_{SA}),\tau_{SA})
\le\min\{1,a\sqrt\varepsilon\}
=\min\{1,2/10\}=\frac15.
$$

これは**すでに選ばれた固定 $U$ と固定復号器**についての条件付き保証です。Haarでそのような $U$ が選ばれる確率を述べるには、別に[回復閾値定理](#thm-bhi13-recovery-threshold)の確率評価が必要です。
<!-- solution-end -->

### Level C：全経路を再構成する

<a id="ex-bhi13-c01"></a>

#### BHI13-C01 日記・古い内部・追加放射の三つを同時に追う

- Level: C
- 問題: $k\ge1,m\ge1,0\le s\le m$ を整数とし、$a=2^k,b=2^m,d=2^{k+s},c=2^{m-s}$ とするHaar投入模型を考える。
  1. 次元保存を検算し、$\Theta$ の厳密式から $\Theta\le2^{-2s}$ を導け。
  2. 不忠実度が $\varepsilon$ 以上となる確率を $\eta$ 以下とする、$s$ に関する簡単な十分条件を求めよ。
  3. $(k,m,s)=(1,3,2)$、$\varepsilon=1/2$ とし、簡略界と厳密界を比較せよ。
  4. これらがscrambling時間・復号回路の時間複雑性を保証しないことを、仮定と結論を区別して説明せよ。

<!-- solution-start -->
**詳細解答。**

**1. 次元と平均誤差。** $ab=2^{k+m}$、$cd=2^{m-s}2^{k+s}=2^{k+m}$ なので入力と出力は同次元です。[平均二次偏差定理](#thm-bhi13-mean-decoupling)に代入して

$$
\Theta=
\frac{(2^{2k}-1)(2^{2(k+m)}-2^{2(k+s)})}
{2^{2(k+s)}(2^{2(k+m)}-1)}.
$$

$N=2^{k+m}\ge2$、$d=2^{k+s}\le N$ より

$$
0\le\frac{N^2-d^2}{N^2-1}\le1,
\qquad
0\le\frac{a^2-1}{a^2}\le1.
$$

したがって $\Theta=(a^2/d^2)\,[(a^2-1)/a^2]\,[(N^2-d^2)/(N^2-1)]\le a^2/d^2=2^{-2s}$ です。

**2. 確率目標。** [回復閾値定理](#thm-bhi13-recovery-threshold)から

$$
\Pr(1-F_{\mathrm e,opt}\ge\varepsilon)
\le\frac{\Theta}{\varepsilon^2}
\le\frac{2^{-2s}}{\varepsilon^2}.
$$

この右端を $\eta$ 以下にする十分条件は $2^{-2s}\le\varepsilon^2\eta$ です。$0<\varepsilon,\eta<1$ のとき二進対数を取ると

$$
s\ge\log_2\frac1{\varepsilon\sqrt\eta}.
$$

$s$ は整数なので右辺を切り上げ、さらに物理的次元制約 $s\le m$ を確認します。条件を満たさなくても情報回収が不可能とは言えません。

**3. 数値例。** $(k,m,s)=(1,3,2)$ なら $a=2,b=8,c=2,d=8,N=16$ です。厳密値

$$
\Theta=\frac{(4-1)(256-64)}{64(256-1)}=\frac3{85}
$$

を使った失敗確率上界は $(3/85)/(1/2)^2=12/85$。簡略界は $2^{-4}/(1/2)^2=1/4$ です。$12/85<1/4$ なので、厳密な有限次元の補正はこの例では保証を改善します。

**4. 結論の射程。** 入力に仮定したのは**全ユニタリ上のHaar分布**であり、実際のブラックホールのHamiltonianが有限時間でその分布を生成するとは仮定していません。得られた結論は各標本について**良いCPTP回復器が存在する確率**であり、効率的にその回復器を見つけられることやゲート数の上界は含みません。scrambling時間は実際の運動学・局所性に、復号計算量は回復アルゴリズムに依存します。これらはBHI14で別々に検討します。
<!-- solution-end -->

## 9. まとめと次講

[BHI12の完全回収条件](../BHI12/index.md#thm-bhi12-recovery-condition)は $MC$ の正確な積状態を要求しました。本講ではHaarユニタリを平均し、二コピー交換作用素から $\mathbb E Q$ を計算して、$d/a$ が大きければ多くの標本で積状態に近づくことを証明しました。そして[QINF30の回復定理](../../../応用系/QINF/QINF30/index.md#thm-qinf30-information-disturbance)から、**残存系への漏洩が小さいと受信者の良い復号が存在する**という定量的な結論を得ました。

ただし次元下界と高確率の十分条件、情報理論的な存在と復号回路の効率はそれぞれ異なります。次のBHI14「scrambling時間と情報放出時間」では、このHaar模型の回収閾値を実際の時間発展へ結び付けるための追加仮定を調べます。
