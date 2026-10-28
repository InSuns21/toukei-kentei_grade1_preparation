# QINF24 量子通信容量とcoherent information

## 1. 古典メッセージが届くことと、量子状態が届くこと

[QINF23の古典通信符号](../QINF23/index.md#def-qinf23-cq-code)では、受信者がメッセージ番号を当てれば成功でした。しかし未知の重ね合わせを測定して番号に直すと、入力が別の系と持っていた量子相関は一般に失われます。量子通信では、計算基底の $|0\rangle,|1\rangle$ の区別だけでなく、$(|0\rangle+|1\rangle)/\sqrt2$ の相対位相と、**手元に残した参照系とのエンタングルメント**まで保持する必要があります。

例えば完全な測定・再準備チャネルは $|0\rangle,|1\rangle$ の古典ビットを無誤りで送れます。一方、Bell状態の片側を送ると、受信後は

$$
\frac12|00\rangle\langle00|+\frac12|11\rangle\langle11|
$$

となり、元の純粋なBell状態ではありません。通信路が古典情報を運べることだけでは十分でないのです。

本章では有限次元の複素Hilbert空間、記憶のない[量子チャネル（CPTP写像）](../QINF7/index.md#def-qinf7-channel) $\mathcal N:A\to B$ の独立使用 $\mathcal N^{\otimes n}$、事前共有エンタングルメント・補助の古典通信の**ない**状況を扱います。$\mathcal N^{\otimes n}$ は $n$ 個の入力系 $A_1,\ldots,A_n$ の各々に同じチャネルを作用させる記法で、添字は通信路の使用回を表します。対数は底2です。環境 $E$ は [Stinespring表現](../QINF8/index.md#thm-qinf8-stinespring)で導入し、[相補チャネル](../QINF8/index.md#def-qinf8-complement)を $\mathcal N^c:A\to E$ と書きます。

## 2. 参照系を使う伝送符号

$M$ 次元の論理入力 $L$ と同じ次元の参照系 $R$ を考えます。参照系は送らず、受信後に両者の相関が元の状態と一致するかを検査します。符号化には[等長写像の条件](../QINF4/index.md#thm-qinf4-isometric-freedom) $W^\dagger W=I_L$ を課し、論理系の内積を保存します。[QINF11の二乗忠実度](../QINF11/index.md#def-qinf11-fidelity)を使うと、一つの数でその検査ができます。

<a id="def-qinf24-entanglement-code"></a>

<!-- formal-statement-start -->
> **定義（量子通信符号とエンタングルメント伝送容量）**
> $M\ge1$、$n\ge1$ とし、$L\simeq R\simeq\mathbb C^M$ に

$$
|\Phi_M\rangle_{RL}=\frac1{\sqrt M}\sum_{j=1}^M|j\rangle_R|j\rangle_L
$$

> を固定する。長さ $n$ の量子符号は等長符号化 $W:L\to A^{\otimes n}$ とCPTP復号 $\mathcal D:B^{\otimes n}\to\widehat L$（$\widehat L\simeq L$）からなり、エンタングルメント忠実度を

$$
F_e=\langle\Phi_M|(\operatorname{id}_R\otimes
\mathcal D\circ\mathcal N^{\otimes n}\circ\operatorname{Ad}_W)
(\Phi_M)|\Phi_M\rangle
$$

> とする。ここで $\Phi_M=|\Phi_M\rangle\langle\Phi_M|$、$\operatorname{id}_R$ は参照系上の恒等チャネル、$\operatorname{Ad}_W(X)=WXW^\dagger$。符号列について

$$
F_e^{(n)}\longrightarrow1,\qquad
\liminf_{n\to\infty}\frac{\log_2M_n}{n}\ge R_0
$$

> を満たすとき $R_0$ は達成可能といい、その上限を $Q(\mathcal N)$ とする。単位は qubit/通信路使用である。
<!-- formal-statement-end -->

復号は補助系を用いてもよいですが、補助系を通じた別の通信は許しません。$M=2^k$ なら $k$ 論理qubitです。等長符号化により、入力の量子情報を捨てずに符号空間へ埋め込む模型を採用します。以下の達成可能性の構成も等長符号化を実際に与えます。以後、$I(R\rangle B)_\omega=-S(R|B)_\omega$ と略記します。

<!-- definition-example-start: def-qinf24-entanglement-code -->
**定義の確認**。 $\mathcal N=\operatorname{id}_2$、$n=1$、$M=2$、$W=\mathcal D=\operatorname{id}$ とすると、$W^\dagger W=I_2$、復号はCPTPで、出力は $\Phi_2$、$F_e=1$ です。さらに任意の $n$ で $L=(\mathbb C^2)^{\otimes n}$、$M_n=2^n$、$W_n=\mathcal D_n=\operatorname{id}$ とすれば $F_e^{(n)}=1$、$n^{-1}\log_2M_n=1$ なので率1を達成します。逆に計算基底で測り、測定結果に対応する $|0\rangle$ または $|1\rangle$ を再準備するチャネルでは、Bell入力の出力 $\sigma$ に対し

$$
\langle\Phi_2|\sigma|\Phi_2\rangle
=\frac12\left(\frac12+\frac12\right)=\frac12.
$$

符号の良し悪しは「$0,1$ が当たったか」ではなく「参照系との相関を保ったか」です。
<!-- definition-example-end -->

[エンタングルメント忠実度のKraus表示](../QINF22/index.md#lem-qinf22-fidelity-kraus)から、この定義は論理入力の最大混合状態に関する忠実度でもあります。後で使う[Fuchs–van de Graaf不等式](../QINF11/index.md#thm-qinf11-fvdg)は、$F_e\ge1-\epsilon$ なら理想状態とのトレース距離 $T\le\sqrt\epsilon$ を与えます。

## 3. coherent information：受信者と環境のエントロピー差

通信路の入力に純粋状態を一つ固定すると、環境が何を得たかを測るには情報が足りません。未知の状態の混合を精製した参照系を保ち、[量子条件付きエントロピー](../QINF18/index.md#def-qinf18-conditional) $S(R|B)=S(RB)-S(B)$ を見るのが適切です。

<a id="def-qinf24-coherent-information"></a>

<!-- formal-statement-start -->
> **定義（coherent information）**
> 有限次元チャネル $\mathcal N:A\to B$、入力状態 $\rho_A$ とその[精製](../QINF4/index.md#def-qinf4-purification) $|\varphi\rangle_{RA}$ をとる。$\omega_{RB}=(\operatorname{id}_R\otimes\mathcal N)(\varphi)$ に対し

$$
I_c(\rho,\mathcal N)=-S(R|B)_\omega
=S(B)_\omega-S(RB)_\omega
$$

> を coherent information（コヒーレント情報）と定める。また

$$
Q^{(1)}(\mathcal N)=\max_{\rho_A}I_c(\rho,\mathcal N)
$$

> と書く。
<!-- formal-statement-end -->

精製が違っても [精製の等長自由度](../QINF4/index.md#thm-qinf4-isometric-freedom)とエントロピーの等長不変性により値は同じです。Stinespring等長写像 $V:A\to BE$ を用いると $RBE$ は純粋であり、[純粋二部系のエントロピー一致](../QINF17/index.md#prop-qinf17-bipartite)から $S(RB)=S(E)$。したがって

$$
\boxed{I_c(\rho,\mathcal N)=S(\mathcal N(\rho))-S(\mathcal N^c(\rho)).}
$$

これは環境に情報が「何ビット漏れたか」を単純に引いた量と同一視すべきではありません。条件付きエントロピーが負になり得るため、$I_c$ 自体も負になり得ます。また、**一般には1回の最適化値 $Q^{(1)}$ は容量 $Q$ ではありません。**

<!-- definition-example-start: def-qinf24-coherent-information -->
**定義の確認**。 恒等チャネルでは環境が一定の純粋状態を持つので $I_c(\rho,\operatorname{id}_d)=S(\rho)$。最大混合入力 $I_d/d$ なら $\log_2d$。完全消去チャネル $\mathcal T(\rho)=|e\rangle\langle e|$ では環境が $\rho$ を受け取る等長表現を選べるので $I_c(\rho,\mathcal T)=-S(\rho)$。混合入力では負、純粋入力では0です。いずれも精製・出力・環境の状態から定義を直接計算しました。
<!-- definition-example-end -->

もう一つ、qubitの位相反転チャネルを考えます。$Z=\operatorname{diag}(1,-1)$ は計算基底の相対位相を反転するPauli行列、$q\in[0,1]$ はその適用確率として

$$
\mathcal Z_q(\rho)=(1-q)\rho+qZ\rho Z
$$

と置きます。$\rho=I_2/2$ を入力すると、$B$ は $I_2/2$、相補系は $\operatorname{diag}(1-q,q)$ です。後者はKraus演算子 $K_0=\sqrt{1-q}I,\ K_1=\sqrt q Z$ を[QINF8の相補行列公式](../QINF8/index.md#prop-qinf8-complement-matrix)へ代入し、環境基底で $\operatorname{Tr}(K_i\rho K_j^\dagger)$ を並べれば確かめられます。非対角成分は $\operatorname{Tr}(\rho Z)=0$ です。ゆえに

$$
I_c(I_2/2,\mathcal Z_q)=1-h_2(q),\qquad
h_2(q)=-q\log_2q-(1-q)\log_2(1-q).
$$

これはまず**達成可能率の候補**です。最大化・正則化の問題と区別します。

## 4. 環境から切り離せれば、受信者は復号できる

送信時には $R$ と論理入力が最大エンタングル状態です。通信路のあと $R$ が環境 $E$ と相関したままなら、受信者だけで元に戻すことは困難です。逆に $R$ と $E$ が直積なら、すべての精製を受信者側 $B$ に集め直せます。以下の $\|X\|_1=\operatorname{Tr}\sqrt{X^\dagger X}$ は[QINF10のノルムの定義](../QINF10/index.md#def-qinf10-trace-norm)に従い、状態間の[トレース距離](../QINF11/index.md#def-qinf11-trace-distance)はその差のノルムの半分です。

<a id="lem-qinf24-decoupling-recovery"></a>

<!-- formal-statement-start -->
> **補題（環境のデカップリングと復号）**
> 等長符号化のあとに通信路のStinespring等長写像を施した純粋状態を $|\psi\rangle_{RBE}$ とし、$\psi_R=\pi_R=I_R/M$ とする。もし

$$
\|\psi_{RE}-\pi_R\otimes\psi_E\|_1\le\varepsilon
$$

> なら、$B$ のみに作用するCPTP復号 $\mathcal D$ が存在し、理想的な $R\widehat L$ の最大エンタングル状態への忠実度は少なくとも $(1-\varepsilon/2)^2$（$0\le\varepsilon\le2$）となる。
<!-- formal-statement-end -->

### 証明の見取り図

直積 $\pi_R\otimes\psi_E$ を精製すると、$R$ と復号出力の最大エンタングル状態、および環境と補助系の純粋状態の積を選べます。[Uhlmann定理](../QINF11/index.md#thm-qinf11-uhlmann)で現実の精製をその理想的な精製に重ねる等長操作を受信側に選びます。ここが「環境の独立性」から「復号可能性」への橋です。

<!-- proof-start -->
### 証明

まず $\tau_{RE}=\pi_R\otimes\psi_E$ と置きます。環境状態 $\psi_E$ の精製 $|\xi\rangle_{B'E}$ をとれば、積状態の精製として

$$
|\Phi_M\rangle_{R\widehat L}\otimes|\xi\rangle_{B'E}
$$

を選べます。[Fuchs–van de Graaf不等式](../QINF11/index.md#thm-qinf11-fvdg)から、振幅としての忠実度は

$$
f(\psi_{RE},\tau_{RE})\ge1-\varepsilon/2
$$

です。一方、実際の $|\psi\rangle_{RBE}$ も $\psi_{RE}$ の精製です。[Uhlmann定理](../QINF11/index.md#thm-qinf11-uhlmann)により、必要なら補助系を足した受信系の等長写像 $U:B\to\widehat L B'$ を選べます。この写像の下で、実際の純粋状態と上の理想的な精製の重なりの絶対値を $f$ にできます。

そこで $\mathcal D(X)=\operatorname{Tr}_{B'}UXU^\dagger$ と置きます。[忠実度のチャネル単調性](../QINF11/index.md#thm-qinf11-fidelity-monotonicity)を $B'$ の部分トレースに適用すると、復号後と $\Phi_M$ の二乗忠実度は少なくとも $f^2\ge(1-\varepsilon/2)^2$ です。
<!-- proof-end -->

**完全な場合の確認。** $\psi_{RE}=\pi_R\otimes\psi_E$ なら上の構成は $F_e=1$ を与えます。反対に $F_e=1$ なら復号後の $R\widehat L$ は純粋で、環境はそこから独立です。環境への不可逆的な情報漏洩を調べる意味がここで見えます。

## 5. ランダム部分空間による一回の評価

環境と相関しないコードをどう見つけるのでしょうか。出発点は、候補となる大きな符号空間をランダムに回転し、そのうち $K$ 次元だけを使う方法です。平均評価が小さければ、少なくとも一つ良い回転が存在します。

ここで使う **Haar一様**とは、有限次元空間 $S$ 上のすべてのユニタリ作用素の集合 $\mathrm U(S)$ における、固定した任意のユニタリ $V$ を左・右から掛けても変わらない確率分布 $dU$ のことです。任意の連続関数 $g$ に対し

$$
\int g(VU)\,dU=\int g(UV)\,dU=\int g(U)\,dU
$$

を満たします。存在する不変確率測度をここでは使用し、その一般構成は扱いません。例えば一次元では複素位相 $e^{i\theta}$ の $\theta\in[0,2\pi)$ を一様に選ぶことに当たります。この不変性が、次の2次モーメントを少数の係数へ帰着させます。

<a id="lem-qinf24-random-decoupling"></a>

<!-- formal-statement-start -->
> **補題（ランダム部分空間の一回デカップリング評価）**
> $S$ の次元を $D$、$R\subset S$ の次元を $K$（$1\le K\le D$）とし、射影を $P$ とする。$\Psi_{SE}$ は $\Psi_S=I_S/D$ を満たす密度演算子とする。$S$ 上のHaar一様なユニタリ $U$ ごとに

$$
\omega_{RE}(U)=\frac DK(PU\otimes I_E)\Psi_{SE}
(U^\dagger P\otimes I_E)
$$

> と置く。ここで $P$ は $S$ から $R$ への直交射影を両側で作用させ、$\omega_E(U)=\operatorname{Tr}_R\omega_{RE}(U)$ とする。$\Psi_S=I_S/D$ なので射影後の確率は $K/D$ であり、上の $D/K$ によりトレース1となる。また $\omega_R(U)=\pi_R$ で、次の平均誤差評価が成り立つ。

$$
\mathbb E_U\|\omega_{RE}(U)-\pi_R\otimes\omega_E(U)\|_1
\le\sqrt{K\,\dim E\,\operatorname{Tr}(\Psi_{SE}^2)}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

右辺に現れる純度 $\operatorname{Tr}(\Psi_{SE}^2)$ は、純粋な $SBE$ を考えれば $\operatorname{Tr}(\Psi_B^2)$ と等しくなります。環境の有効次元を小さく、受信者の純度を小さくできれば、$K$ を大きくしても誤差が消えます。Haar平均に必要なのは**2次モーメントだけ**です。

<!-- proof-start -->
### 証明

まず $\omega_R=\pi_R$ より、Hilbert–Schmidtノルムの平方を展開して

$$
\|\omega_{RE}-\pi_R\otimes\omega_E\|_2^2
=\operatorname{Tr}(\omega_{RE}^2)-\frac1K\operatorname{Tr}(\omega_E^2).
$$

$S,E$ とそのコピー $\widetilde S,\widetilde E$ をとり、交換演算子 $F$ を積基底で $F|ij\rangle=|ji\rangle$ と定義します。$F_{S\widetilde S}$ は $S$ とコピー $\widetilde S$ を交換し、$F_{E\widetilde E}$ も同様です。任意の $X_{SE}$ について

$$
\begin{aligned}
\operatorname{Tr}(X_{SE}^2)
&=\operatorname{Tr}\bigl[(X_{SE}\otimes X_{\widetilde S\widetilde E})
(F_{S\widetilde S}\otimes F_{E\widetilde E})\bigr],\\
\operatorname{Tr}(X_E^2)
&=\operatorname{Tr}\bigl[(X_{SE}\otimes X_{\widetilde S\widetilde E})
(I_{S\widetilde S}\otimes F_{E\widetilde E})\bigr].
\end{aligned}
$$

これらは基底で交換作用を代入すると、左辺の成分和 $\sum_{ij}X_{ij}X_{ji}$ に戻る恒等式です。Haar不変性から、平均された

$$
\mathcal T_2(P\otimes P)
:=\int U^{\dagger\otimes2}(P\otimes P)U^{\otimes2}\,dU
$$

は任意の $V^{\otimes2}$ と可換です。ここでこの可換性から $I_{S\widetilde S}$ と $F_{S\widetilde S}$ の線形結合になる理由も確認します。積基底で対角位相ユニタリを動かすと、可換演算子の非零成分は $|ij\rangle$ と $|ji\rangle$ の間だけに限られます。基底の置換により対角成分・交換成分の係数は添字によらず共通となり、二基底を混合するユニタリを作用させると $|ii\rangle$ 上の係数が両者の和に等しくなります。従って可換演算子は $aI+bF$ の形だけです（$D>1$）。

係数を $a,b$ と置き、$\operatorname{Tr}I=D^2$、$\operatorname{Tr}F=D$ と、

$$
\operatorname{Tr}(P\otimes P)=K^2,\qquad
\operatorname{Tr}\bigl[(P\otimes P)F_{S\widetilde S}\bigr]=K
$$

の二つのトレースを利用すると、$aD^2+bD=K^2$、$aD+bD^2=K$ です。これを解いて

$$
a=\frac{K(KD-1)}{D(D^2-1)},\qquad
b=\frac{K(D-K)}{D(D^2-1)}
$$

を得ます。$F(P\otimes P)$ の平均は $aF+bI$ です。交換演算子のトレース公式をそれぞれに使うと、$A=\operatorname{Tr}(\Psi_{SE}^2)$、$B=\operatorname{Tr}(\Psi_E^2)$ に対し

$$
\begin{aligned}
\mathbb E_U\operatorname{Tr}(\omega_{RE}^2)&=(D/K)^2(aA+bB),\\
\mathbb E_U\operatorname{Tr}(\omega_E^2)&=(D/K)^2(aB+bA).
\end{aligned}
$$

先ほどのノルム展開で前者から後者の $1/K$ 倍を引くと、$D>1$ では正確に

$$
\mathbb E_U\|\omega_{RE}-\pi_R\otimes\omega_E\|_2^2
=\frac{1-K^{-2}}{1-D^{-2}}
\left[\operatorname{Tr}(\Psi_{SE}^2)
-\frac1D\operatorname{Tr}(\Psi_E^2)\right].
$$

括弧は非負であり、$K\le D$ より前の係数は高々1です。さらにランクが高々 $K\dim E$ の演算子 $X$ について、特異値へのCauchy–Schwarzから $\|X\|_1^2\le K\dim E\,\|X\|_2^2$。期待値にもCauchy–Schwarzを用いれば

$$
\mathbb E_U\|X_U\|_1
\le\sqrt{\mathbb E_U\|X_U\|_1^2}
\le\sqrt{K\dim E\,\operatorname{Tr}(\Psi_{SE}^2)}.
$$

$D=1$ では $K=1$ で差は0です。
<!-- proof-end -->

この補題は一回限りなので、右辺が小さいとは限りません。次は [QINF22の典型射影評価](../QINF22/index.md#lem-qinf22-typical-bounds)を使って、$n$ 回使用の有効環境次元と受信状態の純度をエントロピーで評価します。

## 6. 典型部分空間から coherent information を達成する

入力状態 $\rho_A$ の精製を通信路へ通して、純粋状態 $|\varphi\rangle_{TBE}$ を作ります。$T$ は参照系です。$n$ 回使用すると $|\varphi\rangle^{\otimes n}$ であり、$S(B)_\varphi-S(E)_\varphi=I_c(\rho,\mathcal N)$。目標は約 $2^{nR_0}$ 次元のランダム符号空間を用い、$R_0<I_c$ で[デカップリング補題](#lem-qinf24-decoupling-recovery)を発動することです。

<a id="lem-qinf24-typical-achievability"></a>

<!-- formal-statement-start -->
> **補題（典型平坦化と達成可能率）**
> 有限次元チャネル $\mathcal N:A\to B$ と入力 $\rho_A$ を固定する。coherent information が正で、通信率 $R_0$ が次を満たすとする。

$$
0<R_0<I_c(\rho,\mathcal N).
$$

> このとき、$\mathcal N^{\otimes n}$ の等長符号化とCPTP復号からなる、次元 $M_n=\lfloor2^{nR_0}\rfloor$ の符号が十分大きな $n$ で存在し、エンタングルメント忠実度 $F_e^{(n)}\to1$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

入力 $\rho_A$ の固有値列で一つの典型的な**型**を固定すると、型射影内の固有値はすべて等しいので参照系は最大混合になります。$B,E$ の典型射影によって

$$
\dim E_{\delta}\lesssim2^{n(S(E)+\delta)},\qquad
\operatorname{Tr}(\Psi_{B_\delta}^2)\lesssim2^{-n(S(B)-\delta)}
$$

と抑え、前節の右辺はおよそ $2^{-n(I_c-R_0-2\delta)/2}$。以下では型条件付け・平坦化・近似誤差が極限を壊さない理由まで確認します。

<!-- proof-start -->
### 証明

**(i) 入力を一つの型に制限する。** $\rho_A=\sum_{a=1}^r p_a|a\rangle\langle a|$ とし、$p_a>0$ の台だけを使います。精製を $|\varphi\rangle_{TA}=\sum_a\sqrt{p_a}|a\rangle_T|a\rangle_A$ と選びます。長さ $n$ の列 $a^n$ の型 $t=(N_1/n,\ldots,N_r/n)$ に属する列は

$$
D_t=\frac{n!}{N_1!\cdots N_r!},\qquad
\rho_A^{\otimes n}|a^n\rangle
=\prod_a p_a^{N_a}|a^n\rangle
$$

を満たします。型を固定すれば固有値は一定です。各 $N_a/n$ の平均は $p_a$、分散は $p_a(1-p_a)/n$ なので、[Chebyshevの不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-chebyshev)を $N_a/n$ に閾値 $\delta_n=n^{-1/4}$ で適用し、有限個の添字に和事象の上界を使うと

$$
\Pr\left\{\max_a|N_a/n-p_a|>\delta_n\right\}
\le\sum_{a=1}^r\frac{p_a(1-p_a)}{n\delta_n^2}
=O(n^{-1/2})
$$

です。型の種類数は高々 $(n+1)^r$ なので、その集合内のある型 $t_n$ の確率 $w_n$ は $(1-O(n^{-1/2}))(n+1)^{-r}$ 以上です。この選び方で $t_n\to p$ となります。型分布 $t=(t_1,\ldots,t_r)$ のShannonエントロピーを $H(t)=-\sum_at_a\log_2t_a$ と書くと、型の多項係数は

$$
\log_2D_{t_n}
=nH(t_n)+O(r\log_2(n+1)),\qquad
\frac1n\log_2D_{t_n}\to S(\rho_A).
$$

最初の式は階乗の積を対数に取って

$$
\log D_t=\log n!-\sum_a\log N_a!
=n\log n-\sum_aN_a\log N_a+O(r\log(n+1))
$$

と展開したものです。$\log m!=m\log m-m+O(\log(m+1))$ は $\log x$ の単調性から積分 $\int_1^m\log x\,dx$ と $\int_1^{m+1}\log x\,dx$ で和 $\sum_{j=1}^m\log j$ を挟めば得られます。この型へ参照系 $T^n$ を射影し正規化した純粋状態 $|\Omega\rangle_{T_tB^nE^n}$ は、$\Omega_{T_t}=I_{T_t}/D_{t_n}$ を**厳密に**満たします。これは同じ型の係数が等しいためです。

**(ii) 出力を典型化する。** 受信系と環境系を、それぞれ $\varphi_B^{\otimes n},\varphi_E^{\otimes n}$ の典型射影 $P_B,P_E$ で切ります。[QINF22の固有値・次元評価](../QINF22/index.md#lem-qinf22-typical-bounds)に加えて、有限分布の指数型集中評価を用います。

固有値分布 $r_i>0$ に従う確率添字 $I$（$\Pr(I=i)=r_i$）から、対数確率変数 $Z=-\log_2r_I$ を作ります。有限個の値しか取らないため、中心化した対数モーメント母関数

$$
m(s)=\log\mathbb E e^{s(Z-\mathbb EZ)},\qquad m(0)=m'(0)=0
$$

は原点近傍で滑らかで、$m'(0)=dm/ds|_{s=0}$ は変数 $s$ に関する通常の微分です。$m(s)=o(s)$ なので、固定した幅 $\delta>0$ に対し、十分小さい $s>0$ を選んで $m(s)<s\delta/2$ とできます。

[Markovの不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-markov)を非負変数 $Y=e^{s\sum_j(Z_j-\mathbb EZ)}$ と閾値 $e^{ns\delta}$ に適用します。$\mathbb E$ は確率的期待値で、環境系 $E$ とは別です。これにより

$$
\Pr\left\{\frac1n\sum_jZ_j-\mathbb EZ>\delta\right\}
\le e^{-ns\delta+nm(s)}\le e^{-ns\delta/2}.
$$

下側の逸脱も $-s$ で同様です。したがって任意の固定 $\delta>0$ で、ある $c_\delta>0$ と十分大きい $n$ について

$$
\begin{gathered}
\operatorname{rank}P_E\le2^{n(S(E)+\delta)},\\
P_B\varphi_B^{\otimes n}P_B
\le2^{-n(S(B)-\delta)}P_B,\\
\operatorname{Tr}[(I-P_B)\varphi_B^{\otimes n}]
+\operatorname{Tr}[(I-P_E)\varphi_E^{\otimes n}]
\le 2e^{-c_\delta n}.
\end{gathered}
$$

型条件付けは確率 $w_n$ による正規化ですから、型条件付け後の $B,E$ の各射影失敗確率は高々 $2e^{-c_\delta n}/w_n=o(1)$。非可換な $P_B,P_E$ も**異なる系**に作用して可換なので、両方を適用した後に正規化した純粋状態 $|\Omega'\rangle$ は $\Omega$ とトレース距離 $o(1)$ です（純粋状態の射影成功確率を $1-\eta$ とすると距離は $2\sqrt\eta$）。その $B$ 縮約について、正規化係数を $z_n\to1$ とすれば

$$
\Omega'_B\le\frac{1}{z_nw_n}P_B\varphi_B^{\otimes n}P_B,\qquad
\operatorname{Tr}[(\Omega'_B)^2]
\le\frac{2^{-n(S(B)-\delta)}}{z_nw_n}.
$$

最後の不等式は $X\le aI$、$\operatorname{Tr}X=1$ なら $\operatorname{Tr}X^2\le a$ によります。$w_n^{-1}$ は高々多項式です。

**(iii) 再び最大混合にする。** [Schmidt分解](../QINF6/index.md#thm-qinf6-existence)で $|\Omega'\rangle$ の $T_t$ 側のSchmidt係数を $s_i$ とします。零も補って **Schmidt重み** $\alpha_i=s_i^2$（$i=1,\ldots,D_t$）と置くと、これは $\Omega'_{T_t}$ の固有値で、$\sum_i\alpha_i=1$ です。従って[部分トレースの距離縮小性](../QINF11/index.md#thm-qinf11-trace-contractivity)から

$$
\sum_i|\alpha_i-D_t^{-1}|
=\|\Omega'_{T_t}-I_{T_t}/D_t\|_1=o(1).
$$

その右辺を $\eta_n$ とします。$\alpha_i<(1-\sqrt{\eta_n})/D_t$ の添字は高々 $D_t\sqrt{\eta_n}$ 個です（各添字が $\sqrt{\eta_n}/D_t$ 以上の偏差を作るため）。それらを捨て、残りの $S\subset T_t$ のSchmidtベクトルに等しい係数 $1/\sqrt{\dim S}$ を与えた純粋状態 $|\Psi\rangle_{SB_\delta E_\delta}$ を作ります。$\dim S\ge(1-\sqrt{\eta_n})D_t$ で、$\Psi_S=I_S/\dim S$ です。

捨てた係数の総重みは $o(1)$、残りの係数も均等な係数列と $o(1)$ だけ違うので、重なりと[純粋状態のトレース距離](../QINF11/index.md#prop-qinf11-pure-distance)から $\|\Psi-\Omega'\|_1=o(1)$。さらに各残存係数について

$$
\frac{1/\dim S}{\alpha_i}
\le\frac{D_t}{(\dim S)(1-\sqrt{\eta_n})}=1+o(1)
$$

だから、同じ $BE$ のSchmidtベクトルへの重みの比較から

$$
\operatorname{Tr}(\Psi_B^2)
\le(1+o(1))\operatorname{Tr}[(\Omega'_B)^2]
\le 2^{-n(S(B)-2\delta)}
$$

が十分大きな $n$ で成り立ちます。最後は多項式因子と $o(1)$ の係数を $2^{n\delta}$ に吸収しました。$E$ は依然として $P_E$ の像に入ります。

**(iv) 一回評価を $n$ 回へ適用する。** $K=M_n$ 次元の部分空間を $S$ に取り、[一回デカップリング評価](#lem-qinf24-random-decoupling)を $\Psi_{SE_\delta}$ に適用します。$\Psi_{SBE}$ が純粋なので

$$
\operatorname{Tr}(\Psi_{SE_\delta}^2)
=\operatorname{Tr}(\Psi_{B_\delta}^2)
$$

です。したがってランダム部分空間に対し

$$
\mathbb E_U\|\omega_{RE_\delta}(U)-\pi_R\otimes\omega_{E_\delta}(U)\|_1
\le2^{-\frac n2(I_c(\rho,\mathcal N)-R_0-3\delta)}.
$$

$R_0<I_c$ なので $3\delta<I_c-R_0$ を選べます。また、$I_c\le S(\rho)$（[条件付きエントロピーの上下界](../QINF18/index.md#cor-qinf18-bounds)）から、十分大きい $n$ で $K\le\dim S$ です。

最後に $\Psi$ から、元の型条件付き状態を $S$ に射影して正規化した $|\Omega_S\rangle$ に戻します。$\Omega_{T_t}=\pi_{T_t}$ だったので、$\Omega_S$ の参照系も厳密に $\pi_S$ です。また $\dim S/D_t\ge1-\sqrt{\eta_n}$ だから、純粋状態の射影による距離は

$$
\|\Omega-\Omega_S\|_1
=2\sqrt{1-\frac{\dim S}{D_t}}
\le2\eta_n^{1/4}.
$$

これと前段の近似誤差を結ぶと

$$
\|\Psi-\Omega_S\|_1
\le\|\Psi-\Omega'\|_1+\|\Omega'-\Omega\|_1
+\|\Omega-\Omega_S\|_1=o(1).
$$

Haarでランダムに回転して $K$ 次元へ射影する操作は、全結果の**平均**を取れば量子instrumentです。実際

$$
\int\frac{\dim S}{K}U^\dagger PU\,dU=I_S.
$$

よって結果 $U$ を古典フラグに記録したCPTP写像の[距離縮小性](../QINF11/index.md#thm-qinf11-trace-contractivity)から

$$
\int\|\omega_U(\Psi)-\omega_U(\Omega_S)\|_1\,dU
\le\|\Psi-\Omega_S\|_1=o(1).
$$

環境の縮約と三角不等式で、元のチャネルが作る $R E^n$ の平均デカップリング誤差も $o(1)$ です。したがって少なくとも一つの $U$ で誤差が $o(1)$ になります。この $U$ が物理的な等長符号を与えることも確認します。$|\Omega_S\rangle$ の送信前の最大エンタングル状態を、$S$ と対応する入力型空間 $A_S$ の同じ正規直交基底で $|\Phi_{\dim S}\rangle$ と書くと、基底展開から

$$
\sqrt{\frac{\dim S}{K}}(PU\otimes I)|\Phi_{\dim S}\rangle
=(I_R\otimes W_U)|\Phi_K\rangle,
\qquad W_U=(PU)^{\mathsf T}:R\to A_S.
$$

ここで転置はこれらの対応する基底について取り、$PUU^\dagger P=P$ なので $W_U^\dagger W_U=I_R$ です。従って参照系の射影という計算は、入力側での等長符号化に置き換わり、[復号補題](#lem-qinf24-decoupling-recovery)により $F_e^{(n)}\to1$ です。
<!-- proof-end -->

この証明の本質は $S(B)-S(E)$ の符号です。$R_0<S(B)-S(E)$ なら、環境の典型空間と符号次元の積より、受信者側に残る「平坦な自由度」の方が漸近的に大きくなります。単に「典型部分空間がある」と言うだけでなく、**純度と環境次元の積が0へ向かう**ことを確認するのがポイントです。

## 7. 逆向き評価：伝送できたなら coherent information が大きい

達成可能性だけでは容量を言えません。逆向きでは、忠実度が1へ近い出力の条件付きエントロピーが、理想的なBell状態の値 $-\log_2M$ から大きく変わらないことを使います。

<a id="lem-qinf24-conditional-continuity"></a>

<!-- formal-statement-start -->
> **補題（条件付きエントロピーの連続性）**
> 有限次元 $X,Y$ 上の状態 $\rho_{XY},\sigma_{XY}$ が $T(\rho,\sigma)=\tfrac12\|\rho-\sigma\|_1=\varepsilon\le1$ を満たすなら、$d_X=\dim X$ として

$$
|S(X|Y)_\rho-S(X|Y)_\sigma|
\le2\varepsilon\log_2d_X+
(1+\varepsilon)h_2\!\left(\frac{\varepsilon}{1+\varepsilon}\right).
$$
<!-- formal-statement-end -->

### 証明の見取り図

二状態の差を正負部分へ分け、両状態に適切な正の差を加えると**同じ混合状態**を作れます。条件付きエントロピーは混合に対する加重平均から高々二値エントロピーだけずれます。次元が出るのは $-\log d_X\le S(X|Y)\le\log d_X$ の範囲だけです。

<!-- proof-start -->
### 証明

Hermitian行列 $\rho-\sigma=\Delta_+-\Delta_-$ を正負スペクトル部分で分けると $\operatorname{Tr}\Delta_+=\operatorname{Tr}\Delta_-=\varepsilon$ です。$0<\varepsilon\le1$ として

$$
\tau=\frac{\rho+\Delta_-}{1+\varepsilon}
=\frac{\sigma+\Delta_+}{1+\varepsilon},\quad
\rho_+=\frac{\Delta_+}{\varepsilon},\quad
\sigma_-=\frac{\Delta_-}{\varepsilon}
$$

はいずれも状態です。$u=\varepsilon/(1+\varepsilon)$ とすれば

$$
\tau=(1-u)\rho+u\sigma_-
=(1-u)\sigma+u\rho_+
$$

という二通りの混合表示が得られます。ここでは $\rho+\Delta_-$ と $\sigma+\Delta_+$ は明らかに正であり、非可換な $\rho,\sigma$ に「共通の正部分」が存在すると仮定する必要はありません。

二状態混合 $\mu=(1-u)\alpha+u\beta$ に古典フラグ $J\in\{0,1\}$ を付けます。[SSAによる条件付きエントロピーの単調性](../QINF19/index.md#cor-qinf19-monotonicity)を $S(X|Y)\ge S(X|YJ)$ に使い、また $I(X:J|Y)\le H(J)=h_2(u)$ から

$$
0\le S(X|Y)_\mu-
[(1-u)S(X|Y)_\alpha+uS(X|Y)_\beta]
\le h_2(u).
$$

$I(X:J|Y)\le H(J)$ は $I(X:J|Y)=H(J|Y)-H(J|XY)$、古典フラグについて $0\le H(J|XY)\le H(J|Y)\le H(J)$ から分かります（後者の非負性は古典フラグの混合エントロピー境界）。この評価を $\tau$ の二通りの混合表示へ適用し、共通の $S(X|Y)_\tau$ を消します。

[Araki–Lieb不等式](../QINF18/index.md#thm-qinf18-araki-lieb)とエントロピー上界から $|S(X|Y)|\le\log_2d_X$ なので、二つの残りの状態の差は高々 $2u\log_2d_X$。二つの混合補正はともに $[0,h_2(u)]$ 内だから、その**差の絶対値**は高々 $h_2(u)$ です。両辺を $1-u=1/(1+\varepsilon)$ で割ると指定の上界です。$\varepsilon=0$ は連続性または同一状態から直接従います。
<!-- proof-end -->

<a id="thm-qinf24-lsd"></a>

<!-- formal-statement-start -->
> **定理（Lloyd–Shor–Devetak量子容量定理）**
> 任意の有限次元の記憶のない量子チャネル $\mathcal N:A\to B$ について、事前共有エンタングルメント・補助通信のない量子容量は

$$
\boxed{Q(\mathcal N)
=\lim_{k\to\infty}\frac1k
\max_{\rho_{A^k}}I_c(\rho_{A^k},\mathcal N^{\otimes k})
=\sup_{k\ge1}\frac1k Q^{(1)}(\mathcal N^{\otimes k}).}
$$

> 入力 $\rho_{A^k}$ は $k$ 回分にまたがるエンタングル状態でよい。一般チャネルで $Q=Q^{(1)}$ とは断言できない。
<!-- formal-statement-end -->

### 証明の見取り図

達成向きは前節のランダム符号を $\mathcal N^{\otimes k}$ という**一つの大きなチャネル**に適用します。逆向きは任意の良い符号の復号前 $I(R\rangle B^n)$ を、復号後の理想Bell状態と比較します。$\max I_c$ の上限は正則化によって初めて一般容量と一致します。

<!-- proof-start -->
### 証明

**逆向き。** 長さ $n$ の等長符号 $W_n$ に $\pi_L$ を入力し、参照系との精製 $\Phi_{M_n}$ をとります。復号前の状態 $\omega_{RB^n}$ は $W_n\pi_LW_n^\dagger$ の精製を通した出力なので

$$
I_c(W_n\pi_LW_n^\dagger,\mathcal N^{\otimes n})
=-S(R|B^n)_\omega.
$$

復号後を $\widehat\omega_{R\widehat L}$ とすると、[SSAに基づく条件付きエントロピーの単調性](../QINF19/index.md#cor-qinf19-monotonicity)を復号のStinespring等長写像と補助系の部分トレースに適用して

$$
-S(R|B^n)_\omega\ge -S(R|\widehat L)_{\widehat\omega}.
$$

$F_e^{(n)}\ge1-\epsilon_n$ として、[Fuchs–van de Graaf不等式](../QINF11/index.md#thm-qinf11-fvdg)から $T(\widehat\omega,\Phi_{M_n})\le\delta_n=\sqrt{\epsilon_n}$。理想状態では $S(R|\widehat L)_{\Phi_{M_n}}=-\log_2M_n$ です。[条件付きエントロピーの連続性](#lem-qinf24-conditional-continuity)を $X=R$、$Y=\widehat L$、$d_X=M_n$ で使うと

$$
(1-2\delta_n)\log_2M_n
-(1+\delta_n)h_2\!\left(\frac{\delta_n}{1+\delta_n}\right)
\le I_c(W_n\pi_LW_n^\dagger,\mathcal N^{\otimes n})
\le Q^{(1)}(\mathcal N^{\otimes n}).
$$

両辺を $n$ で割ります。等長符号化では $M_n\le(\dim A)^n$ なので $n^{-1}\log_2M_n\le\log_2\dim A$ は有界です。したがって $\delta_n\to0$ で $\delta_n\log_2M_n/n\to0$ となり、達成可能率の条件を使えば

$$
Q(\mathcal N)\le\sup_{k\ge1}\frac1kQ^{(1)}(\mathcal N^{\otimes k}).
$$

**達成向き。** 任意の $k$ と入力 $\rho_{A^k}$ を固定し、$\mathcal N^{\otimes k}$ を一回のチャネルと見ます。[典型平坦化と達成可能率](#lem-qinf24-typical-achievability)により、任意の正の $r<I_c(\rho_{A^k},\mathcal N^{\otimes k})$ は、このチャネルの多数回使用で達成できます。元の $\mathcal N$ の使用回数は $k$ 倍なので、率は $r/k$。最大化・上限をとり逆向きと合わせます。$I_c\le0$ の場合も $M_n=1$ による率0は常に達成可能です。

**極限の存在。** 正整数 $k$ について $a_k=Q^{(1)}(\mathcal N^{\otimes k})$ とし、剰余0を扱うため $a_0=0$ と定めます。$k,\ell$ 回の各最適入力をテンソル積にすると、[エントロピーのテンソル加法性](../QINF17/index.md#prop-qinf17-tensor)で

$$
a_{k+\ell}\ge a_k+a_\ell.
$$

また純粋入力では $I_c=0$、かつ $S(B^k)\le k\log_2\dim B$ なので $0\le a_k\le k\log_2\dim B$。任意の固定 $m$ について $n=qm+r$（$0\le r<m$）と分けると、超加法性から $a_n\ge qa_m+a_r$。$n\to\infty$ で $\liminf a_n/n\ge a_m/m$、一方 $\limsup a_n/n\le\sup_k a_k/k$。$m$ の上限をとれば $\lim a_n/n=\sup_m a_m/m$ です。
<!-- proof-end -->

この定理は**正則化された式**です。$k=1$ の式が一般に等しいと仮定してしまうと、異なる使用回の入力をエンタングルさせる符号化の自由を失います。

## 8. 消失チャネルなら容量を一回の計算で決められる

環境が受信出力からさらに雑音を加えて再現できるチャネルでは、coherent informationが加法的になります。これを利用すると、一般式の正則化が消えます。

<a id="def-qinf24-degradable"></a>

<!-- formal-statement-start -->
> **定義（劣化可能・反劣化可能チャネル）**
> $\mathcal N:A\to B$ の相補チャネルを $\mathcal N^c:A\to E$ とする。CPTP写像 $\mathcal T:B\to E$ が存在して $\mathcal N^c=\mathcal T\circ\mathcal N$ となるとき $\mathcal N$ は**劣化可能**（degradable）である。逆にCPTP写像 $\mathcal S:E\to B$ が存在して $\mathcal N=\mathcal S\circ\mathcal N^c$ となるとき**反劣化可能**（antidegradable）である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf24-degradable -->
**定義の確認**。 恒等チャネル $\mathcal N=\operatorname{id}_d$ では、環境を純粋状態 $|e\rangle$ に固定する等長表現を選べます。任意の入力状態 $\rho$ について $\mathcal N(\rho)=\rho$、$\mathcal N^c(\rho)=|e\rangle\langle e|$ です。$\mathcal T(X)=\operatorname{Tr}(X)|e\rangle\langle e|$ は、入力を捨てて状態を準備する[量子チャネル](../QINF7/index.md#def-qinf7-channel)なのでCPTPであり、全 $\rho$ で $\mathcal T(\mathcal N(\rho))=\mathcal N^c(\rho)$ を確認できます。

逆に完全消去チャネル $\mathcal N(\rho)=|e\rangle\langle e|$ の等長表現では $\mathcal N^c(\rho)=\rho$ です。$\mathcal S(X)=\operatorname{Tr}(X)|e\rangle\langle e|$ はCPTPで、全 $\rho$ について $\mathcal S(\mathcal N^c(\rho))=\mathcal N(\rho)$。従って反劣化可能です。どちらも「CPTPの存在」と「チャネルの等式」という定義の二条件を確かめました。後で消失確率に応じた非自明な劣化写像を構成します。
<!-- definition-example-end -->

<a id="thm-qinf24-degradable-capacity"></a>

<!-- formal-statement-start -->
> **定理（劣化可能チャネルの単一文字式）**
> 有限次元チャネル $\mathcal N$ が劣化可能なら

$$
Q(\mathcal N)=Q^{(1)}(\mathcal N)
=\max_{\rho_A}\{S(\mathcal N(\rho_A))-S(\mathcal N^c(\rho_A))\}.
$$

> 反劣化可能なら $Q(\mathcal N)=0$。
<!-- formal-statement-end -->

### 証明の見取り図

劣化可能では受信者 $B$ から環境 $E$ と補助 $F$ への等長写像を作ります。元の差 $S(B^n)-S(E^n)$ は条件付きエントロピー $S(F^n|E^n)$ となり、[SSA](../QINF19/index.md#thm-qinf19-ssa)で各回の和以下です。反劣化可能なら環境だけで受信者を模倣でき、相補系との純粋性と条件付きエントロピーの単調性が容量を0に抑えます。

<!-- proof-start -->
### 証明

劣化写像 $\mathcal T:B\to E$ を等長写像 $U:B\to EF$ で表します。任意の $n$ 回入力（使用回間のエンタングルを許す）に対し、各 $B_i$ に $U$ を施すと、$S(B^n)=S(E^nF^n)$ であり、$E_i$ の縮約は $\mathcal N^c(\rho_i)$ です。[条件付きエントロピーの連鎖律](../QINF18/index.md#def-qinf18-conditional)と[単調性](../QINF19/index.md#cor-qinf19-monotonicity)から

$$
\begin{aligned}
I_c(\rho_{A^n},\mathcal N^{\otimes n})
&=S(B^n)-S(E^n)=S(F^n|E^n)\\
&=\sum_{i=1}^n S(F_i|F_1\cdots F_{i-1}E^n)\\
&\le\sum_{i=1}^n S(F_i|E_i)
=\sum_{i=1}^n[S(B_i)-S(E_i)]\\
&\le nQ^{(1)}(\mathcal N).
\end{aligned}
$$

積入力で最後の上界を達成できるので、各 $n$ で $Q^{(1)}(\mathcal N^{\otimes n})=nQ^{(1)}(\mathcal N)$。[Lloyd–Shor–Devetak量子容量定理](#thm-qinf24-lsd)より前半が従います。

反劣化可能なら、任意の入力の精製から得られる純粋状態 $RBE$ に対し、$B=\mathcal S(E)$ と[条件付きエントロピーの単調性](../QINF19/index.md#cor-qinf19-monotonicity)を使い

$$
I(R\rangle B)\le I(R\rangle E).
$$

純粋状態の相補エントロピーより $I(R\rangle E)=-I(R\rangle B)$ なので、$I_c(\rho,\mathcal N)\le0$。$\mathcal N^{\otimes n}$ も $\mathcal S^{\otimes n}$ により反劣化可能であるから全 $n$ で $Q^{(1)}(\mathcal N^{\otimes n})\le0$。一方、純粋入力で0を得るので等号が成立し、[Lloyd–Shor–Devetak量子容量定理](#thm-qinf24-lsd)から $Q=0$ です。
<!-- proof-end -->

### フラグ付き量子消失チャネル

消失が起きたことを受信側が判別できるモデルです。入力空間 $A=\mathbb C^d$ と直交する消失フラグ $|e\rangle$ を受信・環境側に加えます。消失確率を $p\in[0,1]$ とし、$B\simeq E\simeq\mathbb C^d\oplus\mathbb C|e\rangle$ 上で

$$
V_p|\psi\rangle_A
=\sqrt{1-p}\,|\psi\rangle_B|e\rangle_E
+\sqrt p\,|e\rangle_B|\psi\rangle_E
$$

と置きます。二つの枝は直交するので $\langle V_p\phi|V_p\psi\rangle=\langle\phi|\psi\rangle$、よって $V_p$ は等長写像です。部分トレースすると、消失フラグ付きのブロック対角状態

$$
\mathcal E_p(\rho)=(1-p)\rho\oplus p|e\rangle\langle e|,
\quad
\mathcal E_p^c(\rho)=p\rho\oplus(1-p)|e\rangle\langle e|
$$

になります。ここで $\oplus$ は互いに直交する部分空間上のブロック和です。

<a id="thm-qinf24-erasure"></a>

<!-- formal-statement-start -->
> **定理（量子消失チャネルの容量）**
> $d\ge2$、$0\le p\le1$ とする。上記のフラグ付き量子消失チャネルについて

$$
\boxed{Q(\mathcal E_p)=\max\{0,1-2p\}\log_2d.}
$$

> ただし事前共有エンタングルメントおよび双方向古典通信はない。
<!-- formal-statement-end -->

### 証明の見取り図

消失と非消失のフラグは直交しているので、出力エントロピーは「枝の二値エントロピー＋枝内のエントロピー」となります。$p\le1/2$ では受信者から環境を追加の消失で作れるので一回の値が容量です。$p\ge1/2$ では環境が受信者を模倣でき、容量は0です。

<!-- proof-start -->
### 証明

直交ブロックの固有値は、$\rho$ の固有値を $\lambda_j$ として、$B$ 側で $(1-p)\lambda_1,\ldots,(1-p)\lambda_d,p$、$E$ 側で $p\lambda_1,\ldots,p\lambda_d,1-p$ です。したがって

$$
\begin{aligned}
S(\mathcal E_p(\rho))&=h_2(p)+(1-p)S(\rho),\\
S(\mathcal E_p^c(\rho))&=h_2(p)+pS(\rho),\\
I_c(\rho,\mathcal E_p)&=(1-2p)S(\rho).
\end{aligned}
$$

$p\le1/2$ のとき、受信した非消失枝をさらに確率

$$
q=\frac{1-2p}{1-p}\in[0,1]
$$

で消失させるCPTP写像を作ります。もとの非消失枝は確率 $1-p$、この操作後の非消失率は $(1-p)(1-q)=p$、消失率は $1-p$。元から消失していた枝はそのまま消失フラグへ写すので、出力は厳密に $\mathcal E_p^c(\rho)$ です。ゆえに劣化可能であり、[単一文字定理](#thm-qinf24-degradable-capacity)から

$$
Q(\mathcal E_p)=\max_\rho(1-2p)S(\rho)
=(1-2p)\log_2d.
$$

最大値は $\rho=I_d/d$ で達成されます。$p\ge1/2$ では受信・環境を入れ替え、環境の非消失枝を確率 $(2p-1)/p$ で追加消失させれば受信出力が再現できます（$p\ge1/2$ でこの値は $[0,1]$）。反劣化可能なので $Q=0$。$p=1/2$ は両方で0となります。
<!-- proof-end -->

**数値例。** qubit（$d=2$）で消失確率 $p=1/4$ なら、量子容量は $Q=1/2$ qubit/使用です。一方、[古典通信容量の定義](../QINF23/index.md#def-qinf23-capacity)で考えると、同じ通信路の古典容量は $C=(1-p)\log_2d$、すなわち $3/4$ bit/使用です。

古典容量の達成向きは、直交する $d$ 個の入力を使ったcq通信路に[HSW定理](../QINF23/index.md#thm-qinf23-hsw)を適用します。各条件付き出力のエントロピーと平均出力のエントロピーは、それぞれ

$$
S(B|X=x)=h_2(p),\qquad S(\overline\rho_B)=h_2(p)+(1-p)H(X)
$$

となります。したがってHolevo量は $(1-p)H(X)$ で、最大値は $(1-p)\log_2d$ です。

逆向きは、任意の $n$ 回入力（エンタングル入力も許す）について、出力で非消失だった位置の集合 $J$ に条件付けます。この集合はメッセージと独立で、条件付き受信系の次元は $d^{|J|}$ です。[Holevo界](../QINF21/index.md#thm-qinf21-holevo-bound)による情報量上界を平均すると

$$
I(M;\widehat M)\le I(M;B^nJ)
\le\mathbb E_J|J|\log_2d
=n(1-p)\log_2d.
$$

[QINF23のFano逆評価](../QINF23/index.md#lem-qinf23-fano)で誤りが消える符号率もこの値以下です。量子では参照系と環境の独立性まで必要なため、両容量の差が生じます。一般チャネルや双方向古典通信を追加する模型にこの数式をそのまま使うことはできません。

## 9. 演習

<a id="ex-qinf24-a01"></a>

### 演習 A1：参照系の忠実度

- Level: A
- 問題: $n=1$、$M=2$ のBell入力を (i) 恒等チャネル、(ii) 計算基底での測定・再準備チャネルへ送る。恒等復号をしたとき、それぞれの $R\widehat L$ 状態と $F_e$ を求めよ。古典基底入力を送る成功率とも比較せよ。

<!-- solution-start -->
**詳細解答。** (i) 恒等操作なら $\Phi_2$ が残り $F_e=\langle\Phi_2|\Phi_2|\Phi_2\rangle=1$。(ii) 計算基底での測定は $|00\rangle\langle00|$ と $|11\rangle\langle11|$ の交差項を消し、$\sigma=\tfrac12|00\rangle\langle00|+\tfrac12|11\rangle\langle11|$。$|\langle\Phi_2|00\rangle|^2=|\langle\Phi_2|11\rangle|^2=1/2$ より $F_e=\tfrac12\cdot\tfrac12+\tfrac12\cdot\tfrac12=1/2$。一方、送信者が $|0\rangle$ か $|1\rangle$ だけを送る古典課題なら、測定・再準備でも計算基底での受信成功率は1。エンタングルメント忠実度は別の制約です。
<!-- solution-end -->

<a id="ex-qinf24-a02"></a>

### 演習 A2：符号化をしない coherent information

- Level: A
- 問題: $d$ 次元恒等チャネルと完全消去チャネルについて、固有値 $\lambda_1,\ldots,\lambda_d$ の入力 $\rho$ に対する $I_c$ と $Q^{(1)}$ を求めよ。完全消去チャネルで $I_c<0$ となる入力があっても $Q^{(1)}\ge0$ となる理由を述べよ。

<!-- solution-start -->
**詳細解答。** 恒等チャネルでは $B$ の固有値が $\lambda_j$ で環境は純粋、ゆえに $I_c=S(\rho)=-\sum_j\lambda_j\log_2\lambda_j$、最大値は一様固有値 $\lambda_j=1/d$ で $\log_2d$。完全消去では $B$ が純粋、$E$ が $\rho$ と同じ固有値なので $I_c=-S(\rho)$。最大化では純粋入力 $\lambda=(1,0,\ldots,0)$ を選んで0となります。混合入力での負値は、最適化値まで負であることを意味しません。
<!-- solution-end -->

<a id="ex-qinf24-a03"></a>

### 演習 A3：消失フラグのエントロピー

- Level: A
- 問題: $d=2$、$\rho=\operatorname{diag}(3/4,1/4)$、$p=1/4$ で $\mathcal E_p(\rho)$ と $\mathcal E_p^c(\rho)$ の固有値を列挙し、coherent information を計算せよ。また同じ $p$ で最適入力の値を求めよ。

<!-- solution-start -->
**詳細解答。** 受信側の固有値は $((3/4)(3/4),(3/4)(1/4),1/4)=(9/16,3/16,1/4)$、環境側は $(3/16,1/16,3/4)$ です。直交ブロックのエントロピーを枝ごとに分けると $S(B)=h_2(1/4)+(3/4)h_2(1/4)$、$S(E)=h_2(1/4)+(1/4)h_2(1/4)$。差は $\tfrac12 h_2(1/4)$ bit。$S(\rho)\le1$ で最大混合 $\rho=I_2/2$ が等号を与えるため、最適値は $\tfrac12$ bitです。
<!-- solution-end -->

<a id="ex-qinf24-a04"></a>

### 演習 A4：位相反転チャネルの環境

- Level: A
- 問題: $\mathcal Z_q(\rho)=(1-q)\rho+qZ\rho Z$、$\rho=I_2/2$ とする。Kraus演算子 $K_0=\sqrt{1-q}I$、$K_1=\sqrt q Z$ から相補系の $2\times2$ 行列 $\sum_{i,j}\operatorname{Tr}(K_i\rho K_j^\dagger)|i\rangle\langle j|$ を計算し、$I_c$ を求めよ。

<!-- solution-start -->
**詳細解答。** 対角成分は $\operatorname{Tr}(K_0\rho K_0^\dagger)=1-q$ と $\operatorname{Tr}(K_1\rho K_1^\dagger)=q$。非対角成分は $\sqrt{q(1-q)}\operatorname{Tr}(\rho Z)=\sqrt{q(1-q)}(1/2-1/2)=0$。よって $\mathcal Z_q^c(\rho)=\operatorname{diag}(1-q,q)$。受信側は $(1-q)I/2+qZI Z/2=I/2$ なので $S(B)=1$、$S(E)=h_2(q)$、差は $1-h_2(q)$。例えば $q=1/2$ では0、$q=0$ では1です。
<!-- solution-end -->

<a id="ex-qinf24-b01"></a>

### 演習 B1：一回デカップリングの2次モーメント

- Level: B
- 問題: $\omega_R=I_R/K$ の状態 $\omega_{RE}$ に対して $\|\omega_{RE}-\pi_R\otimes\omega_E\|_2^2=\operatorname{Tr}\omega_{RE}^2-K^{-1}\operatorname{Tr}\omega_E^2$ を証明せよ。$K=1$ の場合を解釈し、$\|X\|_1\le\sqrt{K\dim E}\|X\|_2$ の根拠を説明せよ。

<!-- solution-start -->
**詳細解答。** $X=\omega_{RE}-I_R/K\otimes\omega_E$ はHermitianで、$\operatorname{Tr}X^2=\operatorname{Tr}\omega_{RE}^2-2\operatorname{Tr}[\omega_{RE}(I_R/K\otimes\omega_E)]+\operatorname{Tr}[(I_R/K)^2\otimes\omega_E^2]$。部分トレースの性質から交差項は $\operatorname{Tr}\omega_E^2/K$、最後の項も $\operatorname{Tr}\omega_E^2/K$ となり式が出ます。$K=1$ では $R$ は1次元で $\omega_{RE}=\pi_R\otimes\omega_E$、差は0。一般の $X$ の特異値を $s_1,\ldots,s_r$ とすると $r\le K\dim E$、Cauchy–Schwarzで $\|X\|_1^2=(\sum_i s_i)^2\le r\sum_i s_i^2=r\|X\|_2^2$ です。
<!-- solution-end -->

<a id="ex-qinf24-b02"></a>

### 演習 B2：連続性からの容量逆評価

- Level: B
- 問題: 長さ $n$ の等長符号で $M_n=2^{k_n}$、復号後の $F_e\ge1-\epsilon_n$ とする。$\delta_n=\sqrt{\epsilon_n}$ とおき、$Q^{(1)}(\mathcal N^{\otimes n})\ge(1-2\delta_n)k_n-(1+\delta_n)h_2(\delta_n/(1+\delta_n))$ を導け。特に $\epsilon_n\to0$ で $k_n/n\to R_0$ の場合の結論を述べよ。

<!-- solution-start -->
**詳細解答。** 理想Bell状態への忠実度 $F_e\ge1-\epsilon_n$ から、[Fuchs–van de Graaf不等式](../QINF11/index.md#thm-qinf11-fvdg)により

$$
T(\widehat\omega,\Phi_{M_n})\le\sqrt{\epsilon_n}=\delta_n
$$

です。理想状態では $S(R)=S(\widehat L)=k_n$、$S(R\widehat L)=0$ なので、条件付きエントロピーは $-k_n$ です。[連続性補題](#lem-qinf24-conditional-continuity)を $X=R$、$d_X=M_n$ で用いると

$$
-S(R|\widehat L)_{\widehat\omega}
\ge (1-2\delta_n)k_n-(1+\delta_n)h_2\!\left(\frac{\delta_n}{1+\delta_n}\right).
$$

復号は受信系への後処理です。[条件付きエントロピーの単調性](../QINF19/index.md#cor-qinf19-monotonicity)により、復号前の coherent information はこの下界以上です。符号入力の平均状態 $\rho_n=W_n(I/M_n)W_n^\dagger$ は参照系で精製されるため、

$$
I(R\rangle B^n)=I_c(\rho_n,\mathcal N^{\otimes n})
\le Q^{(1)}(\mathcal N^{\otimes n}).
$$

以上を結合すると指定の不等式を得ます。両辺を $n$ で割り、$\epsilon_n\to0$ と $k_n/n\to R_0$ を用いると、結論は $R_0\le\sup_n Q^{(1)}(\mathcal N^{\otimes n})/n$ です。
<!-- solution-end -->

<a id="ex-qinf24-b03"></a>

### 演習 B3：劣化可能性と消失写像

- Level: B
- 問題: $d$ 次元量子消失チャネル $\mathcal E_p$ について (i) $p=1/4$ の受信側から環境側への追加消失確率、(ii) $p=3/4$ の環境側から受信側への追加消失確率を求めよ。(iii) それぞれの容量を示せ。

<!-- solution-start -->
**詳細解答。** (i) $p=1/4$ では受信側の非消失率は $3/4$、環境の非消失率は $1/4$。受信の非消失枝を確率 $q=1-(1/4)/(3/4)=2/3$ で消すと残る確率は $(3/4)(1/3)=1/4$、よって劣化写像です。$Q=(1-2p)\log_2d=\tfrac12\log_2d$。(ii) $p=3/4$ では環境の非消失率 $3/4$ から受信の $1/4$ に合わせるので $q'=1-(1/4)/(3/4)=2/3$。環境から受信を再現する反劣化写像があり $Q=0$。(iii) で $d=2$ ならそれぞれ $1/2$、$0$ qubit/使用です。
<!-- solution-end -->

<a id="ex-qinf24-b04"></a>

### 演習 B4：超加法性と正則化

- Level: B
- 問題: 任意の二チャネル $\mathcal N,\mathcal M$ について $Q^{(1)}(\mathcal N\otimes\mathcal M)\ge Q^{(1)}(\mathcal N)+Q^{(1)}(\mathcal M)$ を証明し、これだけから一般の量子チャネルで等号は言えない理由を述べよ。さらに $a_n=Q^{(1)}(\mathcal N^{\otimes n})$ の極限式を導け。

<!-- solution-start -->
**詳細解答。** 各チャネルの最適入力をそれぞれ $\rho,\sigma$ とします。独立入力の出力と相補出力はともにテンソル積になり、[エントロピー加法性](../QINF17/index.md#prop-qinf17-tensor)から

$$
I_c(\rho\otimes\sigma,\mathcal N\otimes\mathcal M)
=I_c(\rho,\mathcal N)+I_c(\sigma,\mathcal M)
$$

です。左辺を全入力で最大化すれば積入力の値以上になり、指定の超加法性が得られます。ただし全入力にはエンタングル状態も含まれます。最大値が積入力で達成されるとは限らないため、この議論だけでは等号を主張できません。

続いて正整数 $n$ で $a_n=Q^{(1)}(\mathcal N^{\otimes n})$、剰余0の場合には $a_0=0$ と置きます。超加法性と出力次元から

$$
a_{m+n}\ge a_m+a_n,\qquad 0\le a_n\le n\log_2\dim B
$$

が成り立ちます。固定した $m$ について $n=qm+r$（$0\le r<m$）と分解すると、$a_n\ge qa_m+a_r$ です。$a_r\ge0$ を使えば

$$
\liminf_{n\to\infty}\frac{a_n}{n}\ge\frac{a_m}{m}
$$

となります。一方、定義から $\limsup a_n/n\le\sup_k a_k/k$ です。任意の $m$ に対して上の下界を得たので、上限を取れば $\lim_n a_n/n=\sup_m a_m/m$ と結論できます。
<!-- solution-end -->

<a id="ex-qinf24-c01"></a>

### 演習 C1：容量定理と消失チャネルを接続する

- Level: C
- 問題: $d=2$ の量子消失チャネル（$p\in[0,1]$）について、次を順に考えよ。
  - (i) 対角入力 $\rho=\operatorname{diag}(t,1-t)$ の coherent information を導出せよ。
  - (ii) $p<1/2$ のとき、任意の $0<R_0<1-2p$ で忠実度が1へ近づく符号列の存在を、典型部分空間・一回評価・復号から示せ。
  - (iii) $p\ge1/2$ で正の量子伝送率が不可能な理由を、環境側から受信出力を再現する写像と[量子容量定理](#thm-qinf24-lsd)で示せ。
  - (iv) $p=1/4$ で古典1ビットの通過と量子1qubitの伝送を同一視できない理由を説明せよ。

<!-- solution-start -->
**詳細解答。** (i) 入力のエントロピーは $h_2(t)$、受信側は消失フラグによる直交和なので $S(B)=h_2(p)+(1-p)h_2(t)$、環境側は $S(E)=h_2(p)+p h_2(t)$。差は $(1-2p)h_2(t)$。

(ii) $p<1/2$ では $t=1/2$ とすると $I_c=1-2p>0$ です。伝送率を $R_0<1-2p$ と固定し、$R_0+3\delta<1-2p$ を満たす $\delta>0$ を選びます。

[典型平坦化と達成可能率](#lem-qinf24-typical-achievability)の構成では、入力の型部分空間の次元は約 $2^{nS(A)}=2^n$ です。環境の典型次元と受信純度は、それぞれ

$$
\dim E_{\mathrm{typ}}\le 2^{n(S(E)+\delta)},\qquad
\operatorname{Tr}\omega_B^2\le 2^{-n(S(B)-2\delta)}
$$

と評価されます。[ランダム部分空間の一回デカップリング評価](#lem-qinf24-random-decoupling)に符号次元 $K\approx2^{nR_0}$ を代入すると、平均デカップリング誤差は

$$
2^{-n(1-2p-R_0-3\delta)/2}+o(1)\longrightarrow0
$$

以下になります。したがって平均以下の誤差を達成する等長符号が存在し、[環境のデカップリングと復号](#lem-qinf24-decoupling-recovery)から $F_e\to1$ が従います。

(iii) $p\ge1/2$ なら、環境出力の非消失枝を確率 $(2p-1)/p$ で追加消失させると受信出力と同じ状態を作れます。これが反劣化写像です。テンソル積の写像を使えば、各ブロック長でも反劣化可能性が保たれます。

[単一文字定理の証明](#thm-qinf24-degradable-capacity)で使った条件付きエントロピーの単調性を、参照系と環境・受信系に適用します。その結果、任意の $n$ 回入力に対して

$$
I_c(\rho_{A^n},\mathcal E_p^{\otimes n})\le0
$$

となります。純粋入力では値が0になるため、[LSD容量式](#thm-qinf24-lsd)から $Q=0$ です。よって正の率で $F_e\to1$ を満たす符号列は存在しません。

(iv) $p=1/4$ ではフラグが非消失を示す確率は $3/4$ で、直交二値入力ならその回の古典ラベルを完全に読めます。しかし消失した枝に持ち去られた参照系とのエンタングルメントは、受信側の単なる測定では復元できません。量子容量は $1/2$ qubit/使用であり、古典消失通信の $3/4$ bit/使用とは符号の誤り基準が違います。
<!-- solution-end -->

## 10. まとめと次への接続

- 量子通信では参照系とのエンタングルメントを保つことを符号の成功条件とします。古典メッセージの平均正答率とは違います。
- coherent information は $-S(R|B)=S(B)-S(E)$。環境からのデカップリング、ランダム部分空間の2次モーメント、典型射影によって正の達成可能率になります。
- 逆向きには条件付きエントロピーの連続性と復号後処理の単調性を使います。一般容量は $Q=\lim_k Q^{(1)}(\mathcal N^{\otimes k})/k$ であり、単一文字化には**劣化可能性などの仮定**が必要です。
- 劣化可能チャネルではSSAにより加法性が成り立ち、消失チャネルでは $Q=\max(0,1-2p)\log_2d$ と厳密に求まります。

次のQINF25以降では、ここで存在を示した符号・復号を、具体的な誤り訂正回路と符号空間の条件から作ります。

### 前提講座

- [QINF4 精製とアンサンブル](../QINF4/index.md)
- [QINF7 量子チャネルとKraus表示](../QINF7/index.md)
- [QINF8 Stinespring表現と相補チャネル](../QINF8/index.md)
- [QINF11 トレース距離・忠実度](../QINF11/index.md)
- [QINF12 複製・放送・削除の制約](../QINF12/index.md)
- [QINF17 von Neumannエントロピー](../QINF17/index.md)
- [QINF18 条件付きエントロピーと相互情報量](../QINF18/index.md)
- [QINF19 強劣加法性と条件付き相互情報量](../QINF19/index.md)
- [QINF22 量子典型部分空間とSchumacher圧縮](../QINF22/index.md)
- [QINF23 量子通信路での古典通信](../QINF23/index.md)
- [INFO3 漸近等分割性と典型集合](../../INFO/INFO3/index.md)

### 発展参考文献

- P. Hayden, M. Horodecki, A. Winter, J. Yard, [*A decoupling approach to the quantum capacity*](https://arxiv.org/abs/quant-ph/0702005) (2007)：ランダム部分空間によるデカップリングの原論文。
- I. Devetak, [*The private classical capacity and quantum capacity of a quantum channel*](https://arxiv.org/abs/quant-ph/0304127) (2005)：量子容量の一般符号化定理。
- C. H. Bennett, D. P. DiVincenzo, J. A. Smolin, [*Capacities of Quantum Erasure Channels*](https://doi.org/10.1103/PhysRevLett.78.3217) (1997)：消失チャネルの容量模型。
