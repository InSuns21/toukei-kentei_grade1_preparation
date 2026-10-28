# QINF24 量子通信容量とcoherent information

## 1. 古典メッセージが届くことと、量子状態が届くこと

[QINF23の古典通信符号](../QINF23/index.md#def-qinf23-cq-code)では、受信者がメッセージ番号を当てれば成功でした。しかし未知の重ね合わせを測定して番号に直すと、入力が別の系と持っていた量子相関は一般に失われます。量子通信では、計算基底の $|0\rangle,|1\rangle$ の区別だけでなく、$(|0\rangle+|1\rangle)/\sqrt2$ の相対位相と、**手元に残した参照系とのエンタングルメント**まで保持する必要があります。

例えば完全な測定・再準備チャネルは $|0\rangle,|1\rangle$ の古典ビットを無誤りで送れます。一方、Bell状態の片側を送ると、受信後は

$$
\frac12|00\rangle\langle00|+\frac12|11\rangle\langle11|
$$

となり、元の純粋なBell状態ではありません。通信路が古典情報を運べることだけでは十分でないのです。

本章では有限次元の複素Hilbert空間、記憶のない量子チャネル $\mathcal N:A\to B$ の独立使用 $\mathcal N^{\otimes n}$、事前共有エンタングルメント・補助の古典通信の**ない**状況を扱います。対数は底2です。環境 $E$ は [Stinespring表現](../QINF8/index.md#thm-qinf8-stinespring)で導入し、[相補チャネル](../QINF8/index.md#def-qinf8-complement)を $\mathcal N^c:A\to E$ と書きます。

## 2. 参照系を使う伝送符号

$M$ 次元の論理入力 $L$ と同じ次元の参照系 $R$ を考えます。参照系は送らず、受信後に両者の相関が元の状態と一致するかを検査します。[QINF11の忠実度](../QINF11/index.md#def-qinf11-fidelity)を使うと、一つの数でその検査ができます。

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

> とする。ここで $\Phi_M=|\Phi_M\rangle\langle\Phi_M|$、$\operatorname{Ad}_W(X)=WXW^\dagger$。$F_e^{(n)}\to1$ かつ $\liminf_{n\to\infty}n^{-1}\log_2 M_n\ge R_0$ となる符号列があるとき $R_0$ は達成可能、上限を $Q(\mathcal N)$ とする。単位は qubit/通信路使用である。
<!-- formal-statement-end -->

復号は補助系を用いてもよいですが、補助系を通じた別の通信は許しません。$M=2^k$ なら $k$ 論理qubitです。等長符号化により、入力の量子情報を捨てずに符号空間へ埋め込む模型を採用します。以下の達成可能性の構成も等長符号化を実際に与えます。以後、$I(R\rangle B)_\omega=-S(R|B)_\omega$ と略記します。

<!-- definition-example-start: def-qinf24-entanglement-code -->
**定義の確認**。 $\mathcal N=\operatorname{id}_2$、$n=1$、$M=2$、$W=\mathcal D=\operatorname{id}$ とすると出力は $\Phi_2$、$F_e=1$ です。逆に計算基底で測り、測定結果に対応する $|0\rangle$ または $|1\rangle$ を再準備するチャネルでは、Bell入力の出力 $\sigma$ に対し

$$
\langle\Phi_2|\sigma|\Phi_2\rangle
=\frac12\left(\frac12+\frac12\right)=\frac12.
$$

符号の良し悪しは「$0,1$ が当たったか」ではなく「参照系との相関を保ったか」です。
<!-- definition-example-end -->

[エンタングルメント忠実度のKraus表示](../QINF22/index.md#lem-qinf22-fidelity-kraus)から、この定義は論理入力の最大混合状態に関する忠実度でもあります。後で使う[Fuchs–van de Graaf不等式](../QINF11/index.md#thm-qinf11-fvdg)は、$F_e\ge1-\epsilon$ なら理想状態とのトレース距離 $T\le\sqrt\epsilon$ を与えます。

## 3. coherent information：受信者と環境のエントロピー差

通信路の入力に純粋状態を一つ固定すると、環境が何を得たかを測るには情報が足りません。未知の状態の混合を精製した参照系を保ち、出力との条件付きエントロピーを見るのが適切です。

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

もう一つ、qubitの位相反転チャネル $\mathcal Z_q(\rho)=(1-q)\rho+qZ\rho Z$ に $\rho=I_2/2$ を入力すると、$B$ は $I_2/2$、相補系の状態は $\operatorname{diag}(1-q,q)$ となります。後者はKraus演算子 $\sqrt{1-q}I,\sqrt q Z$ の環境基底で $\operatorname{Tr}(K_i\rho K_j^\dagger)$ を並べれば確かめられ、非対角成分は $\operatorname{Tr}(\rho Z)=0$ です。ゆえに

$$
I_c(I_2/2,\mathcal Z_q)=1-h_2(q),\qquad
h_2(q)=-q\log_2q-(1-q)\log_2(1-q).
$$

これはまず**達成可能率の候補**です。最大化・正則化の問題と区別します。

## 4. 環境から切り離せれば、受信者は復号できる

送信時には $R$ と論理入力が最大エンタングル状態です。通信路のあと $R$ が環境 $E$ と相関したままなら、受信者だけで元に戻すことは困難です。逆に $R$ と $E$ が直積なら、すべての精製を受信者側 $B$ に集め直せます。

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

$\tau_{RE}=\pi_R\otimes\psi_E$ と置き、$\psi_E$ の精製 $|\xi\rangle_{B'E}$ をとります。$\tau_{RE}$ の精製は $|\Phi_M\rangle_{R\widehat L}\otimes|\xi\rangle_{B'E}$ です。[Fuchs–van de Graaf不等式](../QINF11/index.md#thm-qinf11-fvdg)から、振幅としての忠実度 $f(\psi_{RE},\tau_{RE})\ge1-\varepsilon/2$。$|\psi\rangle_{RBE}$ も $\psi_{RE}$ の精製ですから、[Uhlmann定理](../QINF11/index.md#thm-qinf11-uhlmann)により、必要なら補助系を足した $B$ 上の等長写像 $U:B\to\widehat L B'$ を選んで、二つの純粋状態の重なりの絶対値を $f$ にできます。

そこで $\mathcal D(X)=\operatorname{Tr}_{B'}UXU^\dagger$ と置きます。[忠実度のチャネル単調性](../QINF11/index.md#thm-qinf11-fidelity-monotonicity)を $B'$ の部分トレースに適用すると、復号後と $\Phi_M$ の二乗忠実度は少なくとも $f^2\ge(1-\varepsilon/2)^2$ です。
<!-- proof-end -->

**完全な場合の確認。** $\psi_{RE}=\pi_R\otimes\psi_E$ なら上の構成は $F_e=1$ を与えます。反対に $F_e=1$ なら復号後の $R\widehat L$ は純粋で、環境はそこから独立です。環境への不可逆的な情報漏洩を調べる意味がここで見えます。

## 5. ランダム部分空間による一回の評価

環境と相関しないコードをどう見つけるのでしょうか。出発点は、候補となる大きな符号空間をランダムに回転し、そのうち $K$ 次元だけを使う方法です。平均評価が小さければ、少なくとも一つ良い回転が存在します。

<a id="lem-qinf24-random-decoupling"></a>

<!-- formal-statement-start -->
> **補題（ランダム部分空間の一回デカップリング評価）**
> $S$ の次元を $D$、$R\subset S$ の次元を $K$（$1\le K\le D$）とし、射影を $P$ とする。$\Psi_{SE}$ は $\Psi_S=I_S/D$ を満たす密度演算子とする。$S$ 上のHaar一様なユニタリ $U$ ごとに

$$
\omega_{RE}(U)=\frac DK(PU\otimes I_E)\Psi_{SE}
(U^\dagger P\otimes I_E)
$$

> と置く。これはトレース1で $\omega_R(U)=\pi_R$ を満たし、次の平均誤差評価が成り立つ。

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

$S,E$ とそのコピー $\widetilde S,\widetilde E$ をとり、交換演算子を $F$ と書きます。任意の $X_{SE}$ について

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

これは基底で $F|ij\rangle=|ji\rangle$ を代入すると、左辺の成分和 $\sum_{ij}X_{ij}X_{ji}$ に戻る恒等式です。Haar平均された $U^{\dagger\otimes2}(P\otimes P)U^{\otimes2}$ と、$R$ の交換を含む同様の演算子は $U^{\otimes2}$ と可換になるため、対称・反対称部分空間それぞれでスカラーです。したがって $I_{S\widetilde S}$ と $F_{S\widetilde S}$ の線形結合になります。

係数は両部分空間の次元 $D(D+1)/2,D(D-1)/2$ と、

$$
\operatorname{Tr}(P\otimes P)=K^2,\qquad
\operatorname{Tr}\bigl[(P\otimes P)F_{S\widetilde S}\bigr]=K
$$

の二つのトレースから決まります。先ほどのノルム展開へ代入して整理すると、$D>1$ では正確に

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

を満たします。型を固定すれば固有値は一定です。各 $N_a/n$ の平均は $p_a$、分散は $p_a(1-p_a)/n$ なので、Chebyshevの不等式と有限和評価から、$\delta_n=n^{-1/4}$ に対して

$$
\Pr\left\{\max_a|N_a/n-p_a|>\delta_n\right\}
\le\sum_{a=1}^r\frac{p_a(1-p_a)}{n\delta_n^2}
=O(n^{-1/2})
$$

です。型の種類数は高々 $(n+1)^r$ なので、その集合内のある型 $t_n$ の確率 $w_n$ は $(1-O(n^{-1/2}))(n+1)^{-r}$ 以上です。この選び方で $t_n\to p$ となり、型の多項係数は

$$
\log_2D_{t_n}
=nH(t_n)+O(r\log_2(n+1)),\qquad
\frac1n\log_2D_{t_n}\to S(\rho_A).
$$

ここで $H(t)=-\sum_at_a\log_2t_a$ です。最初の式は階乗の積を対数に取って

$$
\log D_t=\log n!-\sum_a\log N_a!
=n\log n-\sum_aN_a\log N_a+O(r\log(n+1))
$$

と展開したものです。$\log m!=m\log m-m+O(\log(m+1))$ は $\log x$ の単調性から積分 $\int_1^m\log x\,dx$ と $\int_1^{m+1}\log x\,dx$ で和 $\sum_{j=1}^m\log j$ を挟めば得られます。この型へ参照系 $T^n$ を射影し正規化した純粋状態 $|\Omega\rangle_{T_tB^nE^n}$ は、$\Omega_{T_t}=I_{T_t}/D_{t_n}$ を**厳密に**満たします。これは同じ型の係数が等しいためです。

**(ii) 出力を典型化する。** $B^n,E^n$ をそれぞれ $\varphi_B^{\otimes n},\varphi_E^{\otimes n}$ の典型射影 $P_B,P_E$ で切ります。[QINF22の固有値・次元評価](../QINF22/index.md#lem-qinf22-typical-bounds)に加え、以下の有限分布での指数型集中評価を使います。固有値分布 $r_i>0$ の対数確率を $Z=-\log_2r_I$ とすると有限個の値しか取らず、$m(s)=\log\mathbb E e^{s(Z-\mathbb EZ)}$ は $m(0)=m'(0)=0$ を満たします。ゆえに十分小さい $s>0$ で $m(s)<s\delta/2$ と選べます。非負変数 $Y$ の $\Pr(Y\ge a)\le\mathbb EY/a$ を $Y=e^{s\sum_j(Z_j-\mathbb EZ)}$ に適用すれば

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

**(iii) 再び最大混合にする。** $|\Omega'\rangle$ の $T_t$ についてのSchmidt係数を $\alpha_1,\ldots,\alpha_{D_t}$ とすると、[部分トレースの距離縮小性](../QINF11/index.md#thm-qinf11-trace-contractivity)により

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

最後に $\Psi$ から、元の型条件付き状態を $S$ に射影して正規化した $|\Omega_S\rangle$ に戻します。$\Omega_{T_t}=\pi_{T_t}$ だったので、$\Omega_S$ の参照系も厳密に $\pi_S$ であり、$\|\Psi-\Omega_S\|_1=o(1)$ です。Haarでランダムに回転して $K$ 次元へ射影する操作は、全結果の**平均**を取れば量子instrumentです。実際

$$
\int\frac{\dim S}{K}U^\dagger PU\,dU=I_S.
$$

よってその全結果を含めたCPTP写像の下ではトレース距離は増えず、$\int\|\omega_U(\Psi)-\omega_U(\Omega_S)\|_1dU=o(1)$。環境の縮約と三角不等式で、元のチャネルが作る $R E^n$ の平均デカップリング誤差も $o(1)$ です。したがって少なくとも一つの $U$ で誤差が $o(1)$、その $U$ に転置対応する $A^{\otimes n}$ 内の符号空間が等長符号化を与えます。[復号補題](#lem-qinf24-decoupling-recovery)により $F_e^{(n)}\to1$ です。
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

**極限の存在。** $a_k=Q^{(1)}(\mathcal N^{\otimes k})$ とする。$k,\ell$ 回の各最適入力をテンソル積にすると、[エントロピーのテンソル加法性](../QINF17/index.md#prop-qinf17-tensor)で

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
**定義の確認**。 恒等チャネルでは環境出力は固定状態です。受信出力を捨てて固定状態を作る $\mathcal T$ はCPTPなので劣化可能です。完全消去チャネルでは環境側が入力状態を持つので、環境を捨て固定の受信出力を作る $\mathcal S$ はCPTP、反劣化可能です。後で消失確率に応じた非自明な劣化写像を構成します。
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

**数値例。** qubit（$d=2$）で消失確率 $p=1/4$ なら $Q=1/2$ qubit/使用です。[古典通信容量の定義](../QINF23/index.md#def-qinf23-capacity)で考えると、同じ通信路の古典容量は $C=(1-p)\log_2d$、すなわち $3/4$ bit/使用です。達成向きは直交する $d$ 個の入力を使ったcq通信路に[HSW定理](../QINF23/index.md#thm-qinf23-hsw)を適用します。実際、各出力のエントロピーは $h_2(p)$、平均出力のエントロピーは $h_2(p)+(1-p)H(X)$ なので、Holevo量の最大値は $(1-p)\log_2d$ です。逆向きは任意の $n$ 回入力（エンタングル入力も許す）について、出力で非消失だった位置の集合 $J$ に条件付けます。$J$ はメッセージと独立で、各 $J$ で受信者の量子系の次元は $d^{|J|}$ です。[Holevo界](../QINF21/index.md#thm-qinf21-holevo-bound)による情報量上界を平均すると

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
**詳細解答。** 理想Bell状態への忠実度 $F_e\ge1-\epsilon_n$ から [Fuchs–van de Graaf不等式](../QINF11/index.md#thm-qinf11-fvdg)で $T(\widehat\omega,\Phi_{M_n})\le\sqrt{\epsilon_n}=\delta_n$。理想状態は $S(R)=S(\widehat L)=k_n$、$S(R\widehat L)=0$ だから $S(R|\widehat L)=-k_n$。[連続性補題](#lem-qinf24-conditional-continuity)に $X=R$、$d_X=M_n$ を代入して $-S(R|\widehat L)_{\widehat\omega}\ge k_n-2\delta_n k_n-(1+\delta_n)h_2(\delta_n/(1+\delta_n))$。復号は $B^n$ への後処理なので [条件付きエントロピーの単調性](../QINF19/index.md#cor-qinf19-monotonicity)により復号前の $I(R\rangle B^n)$ はこれ以上です。符号入力の平均状態 $\rho_n=W_n(I/M_n)W_n^\dagger$ は $R$ で精製されるので $I(R\rangle B^n)=I_c(\rho_n,\mathcal N^{\otimes n})\le Q^{(1)}(\mathcal N^{\otimes n})$。結合して指定式、$n$ で割って極限を取ると $R_0\le\sup_n Q^{(1)}(\mathcal N^{\otimes n})/n$ です。
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
**詳細解答。** それぞれの最適入力 $\rho,\sigma$ を独立に用いると出力と相補出力は各々テンソル積になり、[エントロピー加法性](../QINF17/index.md#prop-qinf17-tensor)により $I_c(\rho\otimes\sigma,\mathcal N\otimes\mathcal M)=I_c(\rho,\mathcal N)+I_c(\sigma,\mathcal M)$。左辺を**全入力**で最大化するので積入力の値以上、指定の不等式になります。しかし全入力にはエンタングル状態も含まれ、最大化を積入力へ制限できるという根拠はありません。$a_{m+n}\ge a_m+a_n$、$0\le a_n\le n\log_2\dim B$ です。固定 $m$ に対し $n=qm+r$ と書き、$a_n\ge qa_m+a_r$、したがって $\liminf_{n\to\infty}a_n/n\ge a_m/m$。一方 $\limsup a_n/n\le\sup_k a_k/k$ です。$m$ の上限を取れば両者は一致し $\lim_n a_n/n=\sup_m a_m/m$ となります。
<!-- solution-end -->

<a id="ex-qinf24-c01"></a>

### 演習 C1：容量定理と消失チャネルを接続する

- Level: C
- 問題: $d=2$ の消失チャネルで $p\in[0,1]$ とする。(i) $\rho=\operatorname{diag}(t,1-t)$ の $I_c$ を導出せよ。(ii) $p<1/2$ なら任意の $0<R_0<1-2p$ に対してエンタングルメント忠実度が1へ向かう量子符号列が存在する理由を、典型部分空間・一回評価・復号の三段階に分けて示せ。(iii) $p\ge1/2$ で正の量子伝送率が不可能な理由を、環境側の出力から受信出力を再現する写像と[量子容量定理](#thm-qinf24-lsd)を使って示せ。(iv) 同じ $p=1/4$ で古典1ビットの通過成功と量子1qubitの伝送成功を同一視できない理由を説明せよ。

<!-- solution-start -->
**詳細解答。** (i) 入力のエントロピーは $h_2(t)$、受信側は消失フラグによる直交和なので $S(B)=h_2(p)+(1-p)h_2(t)$、環境側は $S(E)=h_2(p)+p h_2(t)$。差は $(1-2p)h_2(t)$。

(ii) $p<1/2$ では $t=1/2$ とすると $I_c=1-2p>0$。$\delta>0$ を $R_0+3\delta<1-2p$ と選びます。[典型平坦化と達成可能率](#lem-qinf24-typical-achievability)の構成で、入力の型部分空間の次元は約 $2^{nS(A)}=2^n$、環境の典型次元は高々 $2^{n(S(E)+\delta)}$、受信純度は高々 $2^{-n(S(B)-2\delta)}$ です。[ランダム部分空間の一回デカップリング評価](#lem-qinf24-random-decoupling)へ符号次元 $K\approx2^{nR_0}$ を代入すると、平均デカップリング誤差は高々 $2^{-n(1-2p-R_0-3\delta)/2}+o(1)\to0$。ある等長符号がその評価を満たし、[環境のデカップリングと復号](#lem-qinf24-decoupling-recovery)により $F_e\to1$ です。

(iii) $p\ge1/2$ のとき環境出力の非消失枝を確率 $(2p-1)/p$ で追加消失させると受信側と同じ状態になります。したがって $\mathcal E_p$ は反劣化可能で、各 $n$ 回使用も反劣化可能です。[単一文字定理の証明](#thm-qinf24-degradable-capacity)の条件付きエントロピー単調性で任意の $\rho_{A^n}$ に対し $I_c(\rho,\mathcal E_p^{\otimes n})\le0$、純粋入力で0となります。[LSD容量式](#thm-qinf24-lsd)は $Q=0$ を与え、正の率で $F_e\to1$ は不可能です。

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
