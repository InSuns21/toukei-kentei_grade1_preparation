# QINF30 近似訂正・回復写像

## 1. 完全には戻らない雑音で、何を保証できるか

[QINF29の完全復号と環境デカップリングの同値](../QINF29/index.md#thm-qinf29-recovery)によれば、参照系 $R$ と環境 $E$ が積状態なら未知の論理入力を完全に戻せます。しかし現実の雑音では、環境への漏洩が小さくても零でないことがあります。完全復号の可否だけでは、**よい近似復号**と**何もできない復号**を区別できません。

そこで二つの問いを分けます。

1. 受信者が行う回復の後、参照系と論理入力のもつれはどれほど残るか。
2. 回復をまだ選ばない段階で、環境と参照系の相関だけからどれほど回復できるか保証できるか。

本講では有限次元の複素Hilbert空間のみを扱います。論理入力を $L$（次元は $d\ge1$）、符号化後の物理系を $A$、受信出力を $B$、環境を $E$、参照系を $R\cong L$ とします。

[QINF29の参照系付きチャネル状態](../QINF29/index.md#def-qinf29-reference)と同じく、等長符号化 $V:L\to A$ とCPTP雑音 $\mathcal N:L(A)\to L(B)$ を用います。合成チャネルとそのStinespring等長写像を

$$
\mathcal M(\rho)=\mathcal N(V\rho V^\dagger),
\qquad W:L\to B\otimes E
$$

と書き、$W$ の環境を捨てると $\mathcal M$ が得られるように取ります。最大混合入力と最大エンタングル入力は

$$
\pi_L=I_L/d,\qquad\pi_R=I_R/d,
\qquad|\Phi_d\rangle_{RL}=\frac1{\sqrt d}\sum_{j=0}^{d-1}|j\rangle_R|j\rangle_L
$$

と固定します。ここで参照系と論理系には添字の対応する正規直交基底を選びました。

## 2. 回復の点数を、参照系を残して採点する

一つの入力状態 $|0\rangle$ だけが正しく戻っても、任意の重ね合わせや参照系とのもつれが戻ったとは限りません。回復写像 $\mathcal D:L(B)\to L(L)$ を、**入力を知らない受信者が一度だけ選ぶCPTP写像**とします。まず $|\Phi_d\rangle$ を送っておき、回復後の状態が元の純粋状態にどれほど重なるかを採点します。[QINF11の二乗忠実度](../QINF11/index.md#def-qinf11-fidelity)では純粋状態に対する値は期待値そのものです。

<a id="def-qinf30-entanglement-fidelity"></a>

<!-- formal-statement-start -->
> **定義（エンタングルメント忠実度と回復誤差）**
> 有限次元 $L,B,R$、$d=\dim L=\dim R\ge1$、CPTPチャネル $\mathcal M:L(L)\to L(B)$、CPTP回復 $\mathcal D:L(B)\to L(L)$ に対し、$\Lambda=\mathcal D\circ\mathcal M$ とする。最大エンタングル入力に対する**エンタングルメント忠実度**を

$$
F_{\mathrm e}(\pi_L,\Lambda)
=\langle\Phi_d|(\mathrm{id}_R\otimes\Lambda)
(|\Phi_d\rangle\langle\Phi_d|)|\Phi_d\rangle
$$

> と定める。回復の**エンタングルメント不忠実度**を $1-F_{\mathrm e}$、**最適回復誤差**を

$$
\varepsilon_{\mathrm{opt}}
=1-\max_{\mathcal D\ \mathrm{CPTP}}
F_{\mathrm e}(\pi_L,\mathcal D\circ\mathcal M)
$$

> と定める。いずれも $0\le F_{\mathrm e},\varepsilon_{\mathrm{opt}}\le1$ である。
<!-- formal-statement-end -->

これは単なる各基底状態の平均正解率ではありません。参照側の交差項 $|j\rangle\langle k|_R$ も残して比較するため、位相の破損が忠実度を下げます。最大値は有限次元で実現されます。実際、回復CPTP写像のChoi行列は[完全正値性判定](../QINF9/index.md#thm-qinf9-cp)と[トレース保存判定](../QINF9/index.md#thm-qinf9-tp)により正値かつ部分トレースが単位行列という閉有界集合を動き、上式はその行列の連続線形関数です。

<!-- definition-example-start: def-qinf30-entanglement-fidelity -->
**定義の確認**（確率的位相反転）。$L=B=\mathbb C^2$、$\mathcal M=\mathcal N_p$ を[QINF29の位相反転チャネル](../QINF29/index.md#prop-qinf29-phase-flip)とし、回復を恒等写像にします。$|\Phi_-\rangle=(|00\rangle-|11\rangle)/\sqrt2$ とすれば

$$
(\mathrm{id}\otimes\mathcal N_p)(\Phi_+)
=(1-p)\Phi_++p\Phi_-,
$$

ここで $\Phi_\pm=|\Phi_\pm\rangle\langle\Phi_\pm|$ です。両Bellベクトルの内積は零なので $F_{\mathrm e}=1-p$。$|0\rangle$ は毎回不変でも、$p>0$ ならもつれ忠実度は1ではありません。$\mathcal D(\rho)=Z\rho Z$ を選ぶと逆に $F_{\mathrm e}=p$ です。
<!-- definition-example-end -->

## 3. 環境との距離を、回復が選べる範囲へ変換する

前章では積状態からの[トレース距離](../QINF29/index.md#def-qinf29-leakage)を $\Delta$ と記しました。近似回復の存在を示すには、環境の状態が $\Omega_E$ **ちょうど**である必要はありません。回復後に受信側の補助系へ残る純粋状態を自由に選べるので、環境側の比較対象も任意の密度演算子 $\sigma_E$ に動かすのが自然です。

<a id="def-qinf30-environment-fidelity"></a>

<!-- formal-statement-start -->
> **定義（最適環境積状態忠実度）**
> 有限次元 $R,E$ と、[参照系付きチャネル状態](../QINF29/index.md#def-qinf29-reference) $\Omega_{RE}$、$\pi_R=I_R/d$ に対して、環境が参照系からどれほど独立に見えるかを

$$
f_{\mathrm{prod}}
=\max_{\sigma_E\ge0,\ \operatorname{Tr}\sigma_E=1}
f(\Omega_{RE},\pi_R\otimes\sigma_E)
$$

> と定める。$f$ は[平方根忠実度](../QINF11/index.md#def-qinf11-fidelity)であり、$f_{\mathrm{prod}}\in[0,1]$ である。
<!-- formal-statement-end -->

最大化の対象は $E$ 上の密度演算子というコンパクト集合で、忠実度は連続なので最大が存在します。$\Omega_{RE}$ の縮約は必ず $\pi_R$ です。$\sigma_E=\Omega_E$ を候補に選べるため、積状態が最適でなくても $\Omega_E$ との近さを下から利用できます。

<!-- definition-example-start: def-qinf30-environment-fidelity -->
**定義の確認**（漏洩がない通信）。$W|j\rangle=|j\rangle_B|0\rangle_E$ なら[参照環境の成分条件](../QINF29/index.md#lem-qinf29-blocks)により $\Omega_{RE}=\pi_R\otimes|0\rangle\langle0|$ です。候補 $\sigma_E=|0\rangle\langle0|$ は正値・トレース1で、二状態が等しいから $f=1$。平方根忠実度は1以下なので $f_{\mathrm{prod}}=1$ と確認できます。
<!-- definition-example-end -->

回復を最大化する問題と、環境側の積状態を最大化する問題は、実は同じ最適値を持ちます。ここで使うのは[Uhlmannの精製忠実度定理](../QINF11/index.md#thm-qinf11-uhlmann)です。

<a id="thm-qinf30-duality"></a>

<!-- formal-statement-start -->
> **定理（近似デカップリングと最適回復の双対性）**
> 有限次元の等長写像 $W:L\to B\otimes E$（$d=\dim L\ge1$）が定めるCPTPチャネル $\mathcal M=\operatorname{Tr}_E\circ(W\,\cdot\,W^\dagger)$ と、最大エンタングル入力から作った $\Omega_{RE}$ に対し、

$$
\max_{\mathcal D:L(B)\to L(L)\ \mathrm{CPTP}}
F_{\mathrm e}(\pi_L,\mathcal D\circ\mathcal M)
=f_{\mathrm{prod}}^2.
$$

> 従って $\varepsilon_{\mathrm{opt}}=1-f_{\mathrm{prod}}^2$ である。特に $\varepsilon_{\mathrm{opt}}=0$ と完全デカップリングは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

純粋状態 $|\Omega\rangle_{RBE}=(I_R\otimes W)|\Phi_d\rangle$ を固定します。$\pi_R\otimes\sigma_E$ の精製は $|\Phi_d\rangle_{RL}\otimes|\eta\rangle_{EF}$ と取れます。Uhlmannの定理が許す「精製系での等長写像」は、まさに受信者の復号のStinespring等長写像です。逆向きには、任意の復号で元のBell状態へ射影したときに残る $EF$ ベクトルを使います。

<!-- proof-start -->
### 証明

**環境の積状態から復号へ。** $E$ 上の任意の密度演算子 $\sigma_E$ を取ります。十分大きい補助系 $F$ を選び、$\sigma_E$ の精製 $|\eta\rangle_{EF}$ を作ります。$\pi_R\otimes\sigma_E$ の精製は

$$
|\Xi\rangle_{RLEF}=|\Phi_d\rangle_{RL}\otimes|\eta\rangle_{EF}
$$

です。一方 $|\Omega\rangle_{RBE}$ は $\Omega_{RE}$ の精製です。純粋系の順序を $RE\,|\,B$ と $RE\,|\,LF$ に組み替えてUhlmannの定理を適用します。$F$ を必要なだけ大きく取り、$\dim(L\otimes F)\ge\dim B$ とすれば、受信側の等長写像 $T:B\to L\otimes F$ を選んで

$$
|\langle\Xi|(I_{RE}\otimes T)|\Omega\rangle|
=f(\Omega_{RE},\pi_R\otimes\sigma_E)
$$

とできます（精製先の余剰次元は使わない）。$T$ からCPTP回復 $\mathcal D_T(X)=\operatorname{Tr}_F(TXT^\dagger)$ を定めます。$\Omega'=(I_{RE}\otimes T)|\Omega\rangle$ とすると、$\Phi_d$ に射影した成分のノルム平方がエンタングルメント忠実度です。特定の $EF$ ベクトル $\eta$ との内積の絶対値平方はそれ以下ですから、

$$
F_{\mathrm e}(\pi_L,\mathcal D_T\mathcal M)
=\|(\langle\Phi_d|_{RL}\otimes I_{EF})|\Omega'\rangle\|^2
\ge f(\Omega_{RE},\pi_R\otimes\sigma_E)^2.
$$

$\sigma_E$ を最大化し、左辺を全回復で最大化すれば「$\ge$」を得ます。

**任意の復号から環境の積状態へ。** 逆にCPTP回復 $\mathcal D$ の[Stinespring表示](../QINF8/index.md#thm-qinf8-stinespring)を $T:B\to L\otimes F$ とします。上と同じ $|\Omega'\rangle$ に対して

$$
|v\rangle_{EF}
=(\langle\Phi_d|_{RL}\otimes I_{EF})|\Omega'\rangle,
\qquad \|v\|^2=F_{\mathrm e}(\pi_L,\mathcal D\mathcal M).
$$

$v\ne0$ なら $|\eta\rangle=v/\|v\|$、$\sigma_E=\operatorname{Tr}_F|\eta\rangle\langle\eta|$ と置きます。これは正値・トレース1であり、

$$
|\langle\Phi_d|_{RL}\langle\eta|_{EF}|\Omega'\rangle|
=\|v\|=\sqrt{F_{\mathrm e}}.
$$

二つの純粋状態はそれぞれ $\pi_R\otimes\sigma_E$ と $\Omega_{RE}$ の精製なので、[Uhlmannの精製忠実度定理](../QINF11/index.md#thm-qinf11-uhlmann)から $\sqrt{F_{\mathrm e}}\le f(\Omega_{RE},\pi_R\otimes\sigma_E)\le f_{\mathrm{prod}}$。$v=0$ の場合も $0\le f_{\mathrm{prod}}$ で同じです。従って「$\le$」も成り立ちます。有限次元なので両最大値は達成されます。

最後に $f_{\mathrm{prod}}=1$ なら、忠実度1の二状態は等しいので $\Omega_{RE}=\pi_R\otimes\sigma_E$。縮約を取れば $\sigma_E=\Omega_E$ です。逆に完全デカップリングなら積状態候補が忠実度1を達成します。[QINF29の完全復号定理](../QINF29/index.md#thm-qinf29-recovery)とも整合します。
<!-- proof-end -->

この定理は「よい回復が**存在する**」という保証です。Uhlmannの最適な等長写像を見つけるには、環境状態の精製と受信側の最適化が必要であり、ここからただちに効率的な回復回路や特定の公式が得られるわけではありません。

## 4. 情報と擾乱：小さい漏洩ならどれほど戻るか

環境相関の量は前章の $\Delta=T(\Omega_{RE},\pi_R\otimes\Omega_E)$ をそのまま用います。ここで $T(\rho,\sigma)=\tfrac12\|\rho-\sigma\|_1$ です。[Fuchs–van de Graaf不等式](../QINF11/index.md#thm-qinf11-fvdg)を平方根忠実度で使うと、任意の二状態について $1-f\le T\le\sqrt{1-f^2}$ でした。

<a id="thm-qinf30-information-disturbance"></a>

<!-- formal-statement-start -->
> **定理（環境の距離と回復誤差の双方向評価）**
> 前定理の有限次元CPTPチャネルと最大エンタングル入力について、$\Delta=\tfrac12\|\Omega_{RE}-\pi_R\otimes\Omega_E\|_1$ とし、最適回復誤差を $\varepsilon_{\mathrm{opt}}$ とする。このとき

$$
\varepsilon_{\mathrm{opt}}\le2\Delta-\Delta^2\le2\Delta,
\qquad \Delta\le2\sqrt{\varepsilon_{\mathrm{opt}}}.
$$

> 第一の不等式は回復の存在を保証し、第二は小さい回復誤差が環境の相関を制限することを述べる。定数はこの議論での一般上界であり、等号を常に主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

往路では最適化の候補を $\sigma_E=\Omega_E$ に固定し、$f_{\mathrm{prod}}\ge1-\Delta$ を得ます。復路では、最適な積状態 $\pi_R\otimes\sigma_E$ と真の積状態 $\pi_R\otimes\Omega_E$ が違う可能性があるため、**環境への部分トレースと三角不等式**を一段挟みます。

<!-- proof-start -->
### 証明

まず[忠実度と距離の下界](../QINF11/index.md#thm-qinf11-fvdg)を $\rho=\Omega_{RE}$、$\sigma=\pi_R\otimes\Omega_E$ に適用します。両者は同じ $R\otimes E$ 上の密度演算子ですから、

$$
f(\Omega_{RE},\pi_R\otimes\Omega_E)\ge1-\Delta.
$$

[最適環境積状態忠実度](#def-qinf30-environment-fidelity)の候補に $\Omega_E$ を入れ、[双対定理](#thm-qinf30-duality)を用いると

$$
1-\varepsilon_{\mathrm{opt}}
=f_{\mathrm{prod}}^2\ge(1-\Delta)^2.
$$

$0\le\Delta\le1$ なので右辺は非負です。移項すると $\varepsilon_{\mathrm{opt}}\le2\Delta-\Delta^2$、さらに $-\Delta^2\le0$ から $2\Delta$ の上界です。

逆向きには $f_{\mathrm{prod}}$ を実現する $\sigma_E$ を選びます。[距離の上界](../QINF11/index.md#thm-qinf11-fvdg)と双対定理を代入すると

$$
T(\Omega_{RE},\pi_R\otimes\sigma_E)
\le\sqrt{1-f_{\mathrm{prod}}^2}
=\sqrt{\varepsilon_{\mathrm{opt}}}.
$$

部分トレースは[トレース距離を増加させない](../QINF11/index.md#thm-qinf11-trace-contractivity)ので、この二状態を $R$ でトレースして

$$
T(\Omega_E,\sigma_E)
\le T(\Omega_{RE},\pi_R\otimes\sigma_E)
\le\sqrt{\varepsilon_{\mathrm{opt}}}
$$

です。最後に[有限次元の特異値和としての距離](../QINF10/index.md#def-qinf10-trace-norm)に対する三角不等式と、密度演算子 $\pi_R$ の $\|\pi_R\|_1=1$ から

$$
\begin{aligned}
\Delta
&\le T(\Omega_{RE},\pi_R\otimes\sigma_E)
+T(\pi_R\otimes\sigma_E,\pi_R\otimes\Omega_E)\\
&=T(\Omega_{RE},\pi_R\otimes\sigma_E)+T(\sigma_E,\Omega_E)\\
&\le2\sqrt{\varepsilon_{\mathrm{opt}}}.
\end{aligned}
$$

これで両向きが示されました。
<!-- proof-end -->

**読み方。** $\Delta\le10^{-2}$ なら、最適復号のエンタングルメント不忠実度は $2\cdot10^{-2}$ 以下です。逆に $\varepsilon_{\mathrm{opt}}\le10^{-4}$ なら $\Delta\le2\cdot10^{-2}$。この二つを「漏洩量と誤り率が等しい」と読んではいけません。

### 一様な入力誤差と区別する

エンタングルメント忠実度は最大混合入力の精製一つで採点した量です。しかし、$\dim L=d$ を固定すれば、任意の参照系と任意の入力に対する一様な誤差へ換算できます。ただし一般に次元の代価を払います。

<a id="prop-qinf30-uniform-bound"></a>

<!-- formal-statement-start -->
> **命題（参照系付き一様回復誤差の次元評価）**
> 有限次元 $L$（$\dim L=d\ge1$）上のCPTP写像 $\Lambda:L(L)\to L(L)$ が $F_{\mathrm e}(\pi_L,\Lambda)\ge1-\varepsilon$（$0\le\varepsilon\le1$）を満たすとする。任意の有限次元参照系 $S$ と任意の密度演算子 $\tau_{SL}$ に対して

$$
T\bigl((\mathrm{id}_S\otimes\Lambda)(\tau_{SL}),\tau_{SL}\bigr)
\le\min\{1,d\sqrt{\varepsilon}\}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

最大エンタングル入力から作ったChoi状態と理想状態との距離を、純粋状態に対する忠実度の上界で抑えます。一般の純粋入力はBell状態の参照側へ一つの行列を作用させて作れ、その行列の作用素ノルム二乗は高々 $d$ です。混合入力は密度演算子のスペクトル分解によって、純粋状態の確率的混合へ戻します。

<!-- proof-start -->
### 証明

$J=(\mathrm{id}_R\otimes\Lambda)(\Phi_d)$ とします。$\Phi_d$ は純粋なので[純粋状態の忠実度](../QINF11/index.md#def-qinf11-fidelity)より $F(J,\Phi_d)=F_{\mathrm e}(\pi_L,\Lambda)\ge1-\varepsilon$ です。[Fuchs–van de Graaf不等式](../QINF11/index.md#thm-qinf11-fvdg)から

$$
\tfrac12\|J-\Phi_d\|_1=T(J,\Phi_d)\le\sqrt{\varepsilon}.
$$

任意の単位純粋ベクトル $|\psi\rangle_{SL}$ を $L$ の固定基底で $|\psi\rangle=\sum_{j=0}^{d-1}|u_j\rangle_S|j\rangle_L$ と書きます。線形写像 $A:R\to S$ を $A|j\rangle=\sqrt d\,|u_j\rangle$ で定めると $|\psi\rangle=(A\otimes I_L)|\Phi_d\rangle$。正規化から $\operatorname{Tr}A^\dagger A=d$、従って $\|A\|_\infty^2\le d$ です。$\Lambda$ は $L$ 側のみに作用するので差作用素は

$$
(\mathrm{id}_S\otimes\Lambda)(|\psi\rangle\langle\psi|)
-|\psi\rangle\langle\psi|
=(A\otimes I_L)(J-\Phi_d)(A^\dagger\otimes I_L).
$$

ここで必要な行列評価を確かめます。[有限次元での特異値の和](../QINF10/index.md#def-qinf10-trace-norm)について、任意の行列 $X$ の特異値分解を $X=\sum_j s_j|u_j\rangle\langle v_j|$ とすると、階数1作用素の特異値和は両ベクトルのノルムの積です。三角不等式を適用して

$$
\begin{aligned}
\|AXB\|_1
&\le\sum_j s_j\|A u_j\|\|B^\dagger v_j\|\\
&\le\|A\|_\infty\|B\|_\infty\sum_j s_j
=\|A\|_\infty\|B\|_\infty\|X\|_1.
\end{aligned}
$$

従って先ほどの差作用素の距離は $d\sqrt\varepsilon$ 以下です。混合状態は $\tau=\sum_i t_i|\psi_i\rangle\langle\psi_i|$（$t_i\ge0$、$\sum_i t_i=1$）とスペクトル分解できます。各純粋成分の回復前後の差を $D_i$ とすれば、$\|\sum_i t_iD_i\|_1\le\sum_i t_i\|D_i\|_1$ なので、

$$
T((\mathrm{id}\otimes\Lambda)(\tau),\tau)
\le\sum_i t_i\,d\sqrt\varepsilon=d\sqrt\varepsilon.
$$

密度演算子間の距離は1以下なので $\min$ が付きます。
<!-- proof-end -->

$d$ が大きい場合、この上界は弱くなります。**参照系一つの忠実度が高いこと**と**任意入力で同じ数値の誤り率が保証されること**は別の主張です。

## 5. 具体的に書ける回復：Petz型写像

[双対定理](#thm-qinf30-duality)は最適回復の存在を示しました。次は、行列の積と随伴チャネルだけで**候補となる回復を実際に書く**方法です。基準状態を $\pi_L$ に固定し、その出力 $\tau_B=\mathcal M(\pi_L)$ と比較します。出力 $\tau_B$ に零固有値がある場合、全空間で逆平方根を取れないので、正の固有値を持つ部分空間だけで逆数を取ります。この操作を「台上の逆平方根」といいます。

<a id="def-qinf30-petz"></a>

<!-- formal-statement-start -->
> **定義（Petz型回復写像）**
> 有限次元CPTPチャネル $\mathcal M:L(L)\to L(B)$（$d=\dim L\ge1$）、$\pi_L=I_L/d$、$\tau_B=\mathcal M(\pi_L)$ を固定する。$P$ を $\tau_B$ の正固有値部分への射影、$\tau_B^{-1/2}$ を $P B$ 上の逆平方根で $P^\perp B$ 上零とした作用素とする。$\mathcal M^\dagger:L(B)\to L(L)$ はトレース内積で定まる随伴写像とする。このとき

$$
\begin{aligned}
\mathcal R_{\mathrm P}(X)
&=\pi_L^{1/2}\mathcal M^\dagger
(\tau_B^{-1/2}PXP\tau_B^{-1/2})\pi_L^{1/2}\\
&\quad+\operatorname{Tr}[(I_B-P)X]\,\pi_L
\qquad (X\in L(B))
\end{aligned}
$$

> を**Petz型回復写像**と呼ぶ。最後の項は $\tau_B$ が到達しない出力部分空間でのCPTP拡張である。
<!-- formal-statement-end -->

ここでは基準入力を**全ランクの** $\pi_L$ に選びました。一般の $\sigma_L$ を用いる回復も考えられますが、その場合は $\sigma_L$ の台と論理入力全体を区別する必要があります。本講の公式を、任意の基準状態について無条件に可逆な操作と解釈しないでください。

<!-- definition-example-start: def-qinf30-petz -->
**定義の確認**（恒等チャネル）。$\mathcal M=\mathrm{id}_{L}$ なら $\tau_B=\pi_L$ は全ランク、$P=I_L$、$\mathcal M^\dagger=\mathrm{id}$ です。$\pi_L^{1/2}=I/\sqrt d$、$\tau_B^{-1/2}=\sqrt d I$ を代入すると

$$
\mathcal R_{\mathrm P}(X)
=\tfrac1{\sqrt d}(\sqrt d X\sqrt d)\tfrac1{\sqrt d}=X.
$$

$P^\perp=0$ なので補完項は消えます。出力はCPTPで、全ての密度演算子を戻します。
<!-- definition-example-end -->

<a id="prop-qinf30-petz-cptp"></a>

<!-- formal-statement-start -->
> **命題（Petz型回復のチャネル性と固定状態）**
> 前定義の有限次元CPTPチャネル $\mathcal M$ と全ランク状態 $\pi_L$ に対し、$\mathcal R_{\mathrm P}:L(B)\to L(L)$ は全 $B$ 上のCPTP写像であり、

$$
\mathcal R_{\mathrm P}(\mathcal M(\pi_L))=\pi_L
$$

> を満たす。ただし一般の $\rho\ne\pi_L$ に対する $\mathcal R_{\mathrm P}\mathcal M(\rho)=\rho$ や、エンタングルメント忠実度の最適性は、この命題からは従わない。
<!-- formal-statement-end -->

### 証明の見取り図

正の作用素による前後からの挟み込み、CPTP写像の随伴、固定状態への「捨てて準備する」写像は完全正です。トレースを計算すると、第一項が $P$ の重みを、第二項が $I-P$ の重みを保ちます。$\mathcal M^\dagger(P)=I_L$ を示すには $\pi_L$ の全ランク性を使います。

<!-- proof-start -->
### 証明

[Kraus表示](../QINF7/index.md#thm-qinf7-kraus-cptp)を $\mathcal M(X)=\sum_aK_aXK_a^\dagger$ と書くと、$\mathcal M^\dagger(Y)=\sum_aK_a^\dagger YK_a$ です。第一項は $X\mapsto C_aXC_a^\dagger$（$C_a=\pi_L^{1/2}K_a^\dagger\tau_B^{-1/2}P$）の和なので完全正です。第二項も $I-P$ の正規直交基底 $|q_t\rangle$ と $\pi_L=\sum_j\lambda_j|j\rangle\langle j|$ を用い、Kraus作用素 $\sqrt{\lambda_j}|j\rangle\langle q_t|$ の和として書けるため完全正です。

第一項のトレースは、随伴の定義 $\operatorname{Tr}[\mathcal M^\dagger(Y)\pi_L]=\operatorname{Tr}[Y\mathcal M(\pi_L)]$ と $\tau_B=\mathcal M(\pi_L)$ によって

$$
\begin{aligned}
\operatorname{Tr}\bigl[\pi_L^{1/2}\mathcal M^\dagger
(\tau_B^{-1/2}PXP\tau_B^{-1/2})\pi_L^{1/2}\bigr]
&=\operatorname{Tr}[\tau_B^{-1/2}PXP\tau_B^{-1/2}\tau_B]\\
&=\operatorname{Tr}(PX).
\end{aligned}
$$

二項のトレースを足せば $\operatorname{Tr}(PX)+\operatorname{Tr}[(I-P)X]=\operatorname{Tr}X$ であり、トレース保存です。

さらに $Y=\mathcal M^\dagger(I-P)\ge0$ と置くと、$\operatorname{Tr}(\pi_LY)=\operatorname{Tr}[\tau_B(I-P)]=0$ です。$\pi_L=I/d$ は正定値であるため $\operatorname{Tr}Y=0$、正値な $Y$ の全固有値は零で $Y=0$。従って $\mathcal M^\dagger(P)=\mathcal M^\dagger(I)=I$ です。この事実と $\tau_B^{-1/2}\tau_B\tau_B^{-1/2}=P$ を定義に代入すると

$$
\mathcal R_{\mathrm P}(\tau_B)
=\pi_L^{1/2}\mathcal M^\dagger(P)\pi_L^{1/2}
+\operatorname{Tr}[(I-P)\tau_B]\pi_L
=\pi_L.
$$

これで主張が示されました。
<!-- proof-end -->

## 6. 位相反転：Petz型回復は常に最適とは限らない

前章と同じ[確率的位相反転](../QINF29/index.md#prop-qinf29-phase-flip) $\mathcal N_p(\rho)=(1-p)\rho+pZ\rho Z$ を使います。ここでは $p$ は送信者も受信者も知っているチャネルのパラメータですが、**どちらの誤り枝が今回起きたかを示すフラグは受信者へ渡りません**。候補回復として恒等、$Z$ 共役、Petz型を比較します。

<a id="prop-qinf30-phase"></a>

<!-- formal-statement-start -->
> **命題（位相反転チャネルの最適回復）**
> $L=B=\mathbb C^2$、$p\in[0,1]$、$Z=|0\rangle\langle0|-|1\rangle\langle1|$ に対する $\mathcal N_p(\rho)=(1-p)\rho+pZ\rho Z$ では、

$$
\max_{\mathcal D\ \mathrm{CPTP}}
F_{\mathrm e}(\pi_2,\mathcal D\mathcal N_p)
=\max\{1-p,p\},
\qquad
\varepsilon_{\mathrm{opt}}=\min\{p,1-p\}.
$$

> 恒等回復は $p\le1/2$、$Z$ 共役回復は $p\ge1/2$ で最適である。一方、$\pi_2$ に基づくPetz型回復は $\mathcal R_{\mathrm P}=\mathcal N_p$ であり、そのエンタングルメント忠実度は

$$
F_{\mathrm e}(\pi_2,\mathcal R_{\mathrm P}\mathcal N_p)
=(1-p)^2+p^2.
$$
<!-- formal-statement-end -->

### 証明の見取り図

一般のCPTP復号をKraus作用素 $D_a$ で表します。最大エンタングル入力に作用するKraus枝の重なりが $\operatorname{Tr}D_a$ と $\operatorname{Tr}(D_aZ)$ になるので、この二つの量の二乗和をPauli行列の直交性で抑えれば最適値まで示せます。Petz型は $\mathcal N_p(\pi_2)=\pi_2$ が全ランクなので随伴チャネルそのものになります。

<!-- proof-start -->
### 証明

任意の2次元CPTP写像 $\Lambda(X)=\sum_jA_jXA_j^\dagger$ について、$|\Phi_2\rangle=(|00\rangle+|11\rangle)/\sqrt2$ を展開すると

$$
\langle\Phi_2|(I\otimes A_j)|\Phi_2\rangle
=\tfrac12\operatorname{Tr}A_j.
$$

Kraus枝の寄与を足し、

$$
F_{\mathrm e}(\pi_2,\Lambda)=\frac14\sum_j|\operatorname{Tr}A_j|^2
$$

を得ます。復号 $\mathcal D(X)=\sum_aD_aXD_a^\dagger$ を $\mathcal N_p$ に合成したKraus作用素は $\sqrt{1-p}D_a,\sqrt p D_aZ$ ですから

$$
F_{\mathrm e}(\pi_2,\mathcal D\mathcal N_p)
=(1-p)\alpha+p\beta,
\quad
\alpha=\frac14\sum_a|\operatorname{Tr}D_a|^2,
\quad
\beta=\frac14\sum_a|\operatorname{Tr}(D_aZ)|^2.
$$

$I,Z,X,Y$ は $2\times2$ 行列空間のHilbert–Schmidt直交基底で、各二乗ノルムは2です。この基底へのParseval等式を $D_a$ に適用すると

$$
|\operatorname{Tr}D_a|^2+|\operatorname{Tr}(D_aZ)|^2
\le2\operatorname{Tr}(D_a^\dagger D_a).
$$

Kraus完全性 $\sum_aD_a^\dagger D_a=I_2$ により $\alpha+\beta\le(2\operatorname{Tr}I_2)/4=1$。また $\alpha,\beta\ge0$ なので

$$
(1-p)\alpha+p\beta
\le\max\{1-p,p\}(\alpha+\beta)
\le\max\{1-p,p\}.
$$

恒等回復では $(\alpha,\beta)=(1,0)$、$Z$ 共役回復では $(0,1)$ だから上界は達成されます。

Petz型について $\tau=\mathcal N_p(I_2/2)=I_2/2$、$P=I_2$ です。[Petz回復の定義](#def-qinf30-petz)で平方根因子を相殺すると $\mathcal R_{\mathrm P}=\mathcal N_p^\dagger=\mathcal N_p$（$Z^\dagger=Z$）です。二度作用させたKraus枝は $I$ が確率 $(1-p)^2+p^2$、$Z$ が確率 $2p(1-p)$ で現れます。恒等回復の忠実度計算を再利用し $F_{\mathrm e}=(1-p)^2+p^2$ を得ます。
<!-- proof-end -->

例えば $p=1/4$ では、最適回復は恒等で $F_{\mathrm e}=3/4$、Petz型は $5/8$ です。Petz型は基準状態 $\pi_2$ を正しく戻しますが、失われた位相を**もう一度ランダムに反転させる**ため、この場合は悪化します。この具体例は「Petz型が常に最適回復である」という誤った一般化への反例です。

## 7. 消失フラグがあると、回復はどう変わるか

次は受信者が「消失した」というフラグを見られる通信路です。受信出力 $B$ は元の2次元量子ビット空間 $Q$ と、直交する消失旗 $|e\rangle$ の直和 $Q\oplus\mathbb C|e\rangle$ とします。$q$ を消失確率として

$$
\mathcal E_q(\rho)=(1-q)\rho_Q+q\operatorname{Tr}(\rho)|e\rangle\langle e|,
\qquad 0\le q\le1
$$

と定めます。これは $Q$ 成分と消失成分を互いに直交するブロックとして足した密度演算子です。成功枝のKraus作用素は $\sqrt{1-q}J$（$J:L\to Q$ は基底を対応させる等長写像）、消失枝は $\sqrt q|e\rangle\langle0|$ と $\sqrt q|e\rangle\langle1|$ で、随伴積の和は $(1-q)I+qI=I$ です。[Kraus条件](../QINF7/index.md#thm-qinf7-kraus-cptp)からCPTPと確認できます。

<a id="prop-qinf30-erasure"></a>

<!-- formal-statement-start -->
> **命題（フラグ付き消失チャネルの最適回復）**
> $L=\mathbb C^2$、$B=Q\oplus\mathbb C|e\rangle$、$Q\cong L$ に対する上記CPTPチャネル $\mathcal E_q$（$0\le q\le1$）では、消失旗を測定し、成功時は $Q$ をそのまま戻し、消失時は $\pi_2=I_2/2$ を準備する回復 $\mathcal D_{\mathrm{flag}}$ が最適である。このとき

$$
F_{\mathrm e}(\pi_2,\mathcal D_{\mathrm{flag}}\mathcal E_q)
=1-\frac{3q}{4},
\qquad\varepsilon_{\mathrm{opt}}=\frac{3q}{4}.
$$

> また環境の積状態からのトレース距離は $\Delta=3q/4$ である。$0<q<1$ なら $\mathcal D_{\mathrm{flag}}$ は $\pi_2$ を基準にしたPetz型回復に一致する。
<!-- formal-statement-end -->

### 証明の見取り図

フラグは受信側の直交部分空間を区別します。成功枝で元の状態を保つのが最善であり、消失枝では参照系 $R$ が受信出力と完全に独立になるため、どの状態を準備しても元のBell状態との重なりは $1/4$ です。環境は消失枝で入力を受け取り、そこにだけ参照系との相関が残ります。

<!-- proof-start -->
### 証明

回復 $\mathcal D_{\mathrm{flag}}$ は $Q$ の射影 $P_Q$、消失射影 $P_e=|e\rangle\langle e|$ を用いて

$$
\mathcal D_{\mathrm{flag}}(X)
=J^\dagger P_QXP_QJ+\langle e|X|e\rangle\,\pi_2
$$

と書けます。第1項はKraus作用素 $J^\dagger P_Q$、第2項は $|0\rangle\langle e|/\sqrt2,|1\rangle\langle e|/\sqrt2$ の和です。随伴積の総和は $P_Q+P_e=I_B$ なのでCPTPです。[参照系付き入力](../QINF29/index.md#def-qinf29-reference)に作用させると、成功枝は $\Phi_2$ を確率 $1-q$ で保ち、消失枝は $\pi_R\otimes\pi_L$ になります。後者のBell状態との重なりは

$$
\langle\Phi_2|(\pi_R\otimes\pi_L)|\Phi_2\rangle=\frac14
$$

なので $F_{\mathrm e}=1-q+q/4=1-3q/4$ です。

任意のCPTP回復 $\mathcal D$ でも、成功枝のBell状態への重なりは高々1です。一方、消失枝の入力は $\pi_R\otimes|e\rangle\langle e|$ なので、回復後は $\pi_R\otimes\mathcal D(|e\rangle\langle e|)$ です。後者のBell状態への重なりは、出力状態のトレースが1であるため必ず $1/4$。従って全回復に対し $F_{\mathrm e}\le(1-q)+q/4$ で、上で構成した回復が最適です。

環境を $E=\mathbb C|f\rangle\oplus E_2$（$E_2\cong L$）とし、次の等長写像を取ります。

$$
W|\psi\rangle
=\sqrt{1-q}\,J|\psi\rangle_B|f\rangle_E
+\sqrt q\,|e\rangle_B|\psi\rangle_{E_2}.
$$

二つの出力枝は $B,E$ の直交部分空間にあり $W^\dagger W=I_L$ です。$B$ を部分トレースすると

$$
\Omega_{RE}
=(1-q)\pi_R\otimes|f\rangle\langle f|
+q\Phi_{R E_2},
\quad
\Omega_E=(1-q)|f\rangle\langle f|+q\pi_{E_2}.
$$

差作用素は $f$ ブロックで零、$E_2$ ブロックで $q(\Phi_{RE_2}-I_4/4)$ です。$\Phi_{RE_2}$ は階数1の射影なので差の固有値は $3q/4$ が一個、$-q/4$ が三個。よって

$$
\Delta=\frac12\left(\frac{3q}{4}+3\frac q4\right)=\frac{3q}{4}.
$$

最後に $0<q<1$ では $\tau_B=\mathcal E_q(\pi_2)=(1-q)\pi_Q+q|e\rangle\langle e|$ は $B$ 上で全ランクです。[Petz型回復](#def-qinf30-petz)へ $\tau_B^{-1/2}=\sqrt{2/(1-q)}P_Q+q^{-1/2}P_e$ と、随伴写像

$$
\mathcal E_q^\dagger(Y)
=(1-q)J^\dagger YJ+q\langle e|Y|e\rangle I_L
$$

を代入します。$\pi_2^{1/2}=I/\sqrt2$ との積で係数が相殺され、

$$
\mathcal R_{\mathrm P}(X)=J^\dagger P_QXP_QJ+\langle e|X|e\rangle\pi_2
$$

となり、構成した最適回復と一致します。
<!-- proof-end -->

同じPetz型の式でも、位相反転のように誤り枝が区別できない場合と、消失フラグで分岐を識別できる場合とでは最適性が異なります。何が受信者に渡っているかを先に確定することが重要です。

## 8. 演習：近似回復を実際に設計・検算する

<a id="ex-qinf30-a01"></a>

### 演習 A1：Bell状態を用いた忠実度の計算

- Level: A
- 問題: 論理量子ビット上の位相反転チャネル $\mathcal N_{1/4}(\rho)=\tfrac34\rho+\tfrac14Z\rho Z$ に対し、回復を恒等写像とした場合と $Z$ 共役とした場合の $F_{\mathrm e}$ と不忠実度を、Bell状態の直交性から直接計算せよ。

<!-- solution-start -->
**詳細解答。** [エンタングルメント忠実度の定義](#def-qinf30-entanglement-fidelity)を用います。$|\Phi_+\rangle=(|00\rangle+|11\rangle)/\sqrt2$、$|\Phi_-\rangle=(|00\rangle-|11\rangle)/\sqrt2$ とおくと $\langle\Phi_+|\Phi_-\rangle=(1-1)/2=0$ です。恒等回復の後は

$$
\rho_{RL}=\frac34\Phi_++\frac14\Phi_-.
$$

よって $F_{\mathrm e}=\langle\Phi_+|\rho_{RL}|\Phi_+\rangle=3/4$、不忠実度は $1/4$ です。$Z$ 共役回復では $\Phi_+$ と $\Phi_-$ が入れ替わり、$\rho'_{RL}=\tfrac34\Phi_-+\tfrac14\Phi_+$ なので $F_{\mathrm e}=1/4$、不忠実度は $3/4$。エラー枝を観測していないため、誤りが少ない方を基準にするのが有利です。
<!-- solution-end -->

<a id="ex-qinf30-a02"></a>

### 演習 A2：漏洩距離から回復保証を読む

- Level: A
- 問題: 有限次元チャネルの参照環境状態で $\Delta=T(\Omega_{RE},\pi_R\otimes\Omega_E)=1/10$ と分かった。一般の[情報と擾乱の評価](#thm-qinf30-information-disturbance)を使い、最適回復の $F_{\mathrm e}$ に数値下界を与えよ。また $\varepsilon_{\mathrm{opt}}\le1/100$ なら $\Delta$ が満たす上界を求めよ。

<!-- solution-start -->
**詳細解答。** $\Delta=1/10$ を[定理](#thm-qinf30-information-disturbance)の第一式に代入すると

$$
\varepsilon_{\mathrm{opt}}
\le2\cdot\frac1{10}-\left(\frac1{10}\right)^2
=\frac{19}{100}.
$$

従って最大化されたエンタングルメント忠実度は $1-\varepsilon_{\mathrm{opt}}\ge81/100$ です。逆向きでは

$$
\Delta\le2\sqrt{\varepsilon_{\mathrm{opt}}}
\le2\sqrt{1/100}=\frac15.
$$

二つは異なる条件付き評価です。前半で $\varepsilon_{\mathrm{opt}}=19/100$ と等号を断定したり、後半を任意の復号のエラー率へ無条件に置き換えたりしません。
<!-- solution-end -->

<a id="ex-qinf30-a03"></a>

### 演習 A3：消失時に準備する状態

- Level: A
- 問題: $\pi_R=I_2/2$ と任意の量子ビット状態 $\omega_L$ に対し、$\langle\Phi_2|(\pi_R\otimes\omega_L)|\Phi_2\rangle$ を求めよ。この値が $\omega_L$ の選び方によらない理由を示し、フラグ付き消失チャネルの消失枝の採点へ適用せよ。

<!-- solution-start -->
**詳細解答。** $|\Phi_2\rangle=(|00\rangle+|11\rangle)/\sqrt2$ を展開します。$\pi_R$ の行列成分は $\langle i|\pi_R|j\rangle=\delta_{ij}/2$ なので

$$
\begin{aligned}
\langle\Phi_2|(\pi_R\otimes\omega_L)|\Phi_2\rangle
&=\frac12\sum_{i,j=0}^1
\langle i|\pi_R|j\rangle\langle i|\omega_L|j\rangle\\
&=\frac14\sum_{i=0}^1\langle i|\omega_L|i\rangle
=\frac14\operatorname{Tr}\omega_L=\frac14.
\end{aligned}
$$

$\omega_L$ は正値・トレース1の密度演算子なので最後の式は常に $1/4$ です。消失枝は参照系と独立な固定状態を返すため、状態をどのように準備してもエンタングルメント忠実度への寄与は消失確率 $q$ の $q/4$ になります。
<!-- solution-end -->

<a id="ex-qinf30-a04"></a>

### 演習 A4：台上の逆平方根が必要な例

- Level: A
- 問題: $L=B=\mathbb C^2$ のリセットチャネル $\mathcal M(X)=\operatorname{Tr}(X)|0\rangle\langle0|$ と $\pi_L=I_2/2$ を考える。$\tau_B$ とその台射影 $P$ を求め、[Petz型回復写像](#def-qinf30-petz)が全 $B$ 上で $\mathcal R_{\mathrm P}(X)=\operatorname{Tr}(X)\pi_L$ になることを示せ。

<!-- solution-start -->
**詳細解答。** $\operatorname{Tr}\pi_L=1$ だから $\tau_B=|0\rangle\langle0|$、正の固有値は $|0\rangle$ 上の1のみなので $P=|0\rangle\langle0|$ です。従って $\tau_B^{-1/2}=P$ であり、$|1\rangle$ 成分へ逆数を拡張しません。随伴は

$$
\operatorname{Tr}[\mathcal M(X)Y]
=\operatorname{Tr}(X)\langle0|Y|0\rangle
=\operatorname{Tr}[X\,\langle0|Y|0\rangle I_2]
$$

から $\mathcal M^\dagger(Y)=\langle0|Y|0\rangle I_2$ です。第一項は $\pi_L^{1/2}\mathcal M^\dagger(PXP)\pi_L^{1/2}=\langle0|X|0\rangle\pi_L$。補完項は $\langle1|X|1\rangle\pi_L$。足して

$$
\mathcal R_{\mathrm P}(X)
=(\langle0|X|0\rangle+\langle1|X|1\rangle)\pi_L
=\operatorname{Tr}(X)\pi_L.
$$

任意の出力 $X$ で定義されるCPTP写像ですが、入力の未知の位相や振幅を復元することはできません。
<!-- solution-end -->

<a id="ex-qinf30-b01"></a>

### 演習 B1：二次元での一様誤差の評価

- Level: B
- 問題: 論理入力が $L=\mathbb C^2$ のCPTP合成写像 $\Lambda$ について $F_{\mathrm e}(\pi_2,\Lambda)\ge0.99$ と分かった。任意の参照系 $S$ と任意の純粋・混合状態 $\tau_{SL}$ に対し、回復後とのトレース距離を[一様評価](#prop-qinf30-uniform-bound)から抑えよ。$0.01$ と断定できない理由も説明せよ。

<!-- solution-start -->
**詳細解答。** [一様評価の命題](#prop-qinf30-uniform-bound)で $d=2$、$\varepsilon=1-0.99=0.01$ と置くと

$$
T((\mathrm{id}_S\otimes\Lambda)(\tau),\tau)
\le\min\{1,2\sqrt{0.01}\}=\frac15.
$$

証明では任意の純粋入力を $(A\otimes I)|\Phi_2\rangle$ と表し、$\|A\|_\infty^2\le2$ を挟み込んだため、参照Bell状態での距離上界 $\sqrt{0.01}=0.1$ よりさらに大きい一様上界になります。混合入力も凸性で同じです。$1-F_{\mathrm e}=0.01$ は純粋なBell状態との**二乗忠実度の損失**であり、任意入力のトレース距離そのものではありません。
<!-- solution-end -->

<a id="ex-qinf30-b02"></a>

### 演習 B2：Petz型と最適回復の数値比較

- Level: B
- 問題: $p=1/4$ の位相反転チャネル $\mathcal N_p$ について、基準入力 $\pi_2$ のPetz型回復を導出し、恒等回復、$Z$ 共役回復とともにエンタングルメント忠実度を比較せよ。Petz型が基準状態を回復するのに最適でない理由を説明せよ。

<!-- solution-start -->
**詳細解答。** $\mathcal N_p(\pi_2)=(1-p)\pi_2+pZ\pi_2Z=\pi_2$ なので、出力は全ランクで台射影は $I_2$。[Petz型回復](#def-qinf30-petz)は $\mathcal R_{\mathrm P}=\mathcal N_p^\dagger$ です。$\mathcal N_p$ のKraus作用素 $\sqrt{1-p}I,\sqrt p Z$ は自己随伴なので随伴チャネルも $\mathcal N_p$ になります。[位相反転の最適回復命題](#prop-qinf30-phase)で $p=1/4$ と置くと

$$
F_{\mathrm e}(\mathrm{id}\circ\mathcal N_{1/4})=\frac34,
\qquad
F_{\mathrm e}((Z\,\cdot\, Z)\circ\mathcal N_{1/4})=\frac14.
$$

Petz型の合成では誤りが偶数回の確率が $(3/4)^2+(1/4)^2=9/16+1/16=5/8$、奇数回は $2(3/4)(1/4)=3/8$ です。従って $F_{\mathrm e}(\mathcal R_{\mathrm P}\mathcal N_{1/4})=5/8$。$\pi_2$ は $Z$ 共役で不変なので、三つの回復はいずれも $\pi_2$ を返します。しかし未知の重ね合わせの位相を保つ点では違います。最適は $3/4$ の恒等回復であり、Petz型に最適性の一般保証はありません。
<!-- solution-end -->

<a id="ex-qinf30-b03"></a>

### 演習 B3：消失チャネルの環境距離

- Level: B
- 問題: $q\in[0,1]$ の量子ビット消失チャネルで、環境を成功旗 $|f\rangle$ と消失先の量子ビット $E_2$ の直和とする。$\Omega_{RE}-(\pi_R\otimes\Omega_E)$ の全固有値を求め、$\Delta=3q/4$ と最適回復誤差を比較せよ。

<!-- solution-start -->
**詳細解答。** [消失の命題](#prop-qinf30-erasure)の等長写像を使い、受信系を部分トレースすると

$$
\Omega_{RE}=(1-q)\pi_R\otimes|f\rangle\langle f|+q\Phi_{RE_2},
$$

$$
\pi_R\otimes\Omega_E=(1-q)\pi_R\otimes|f\rangle\langle f|
+q(I_2/2)_R\otimes(I_2/2)_{E_2}.
$$

成功旗の2次元ブロックでは差が零なので固有値0が2個あります。消失先の4次元ブロックでは $q(\Phi-I_4/4)$。$\Phi$ は $|\Phi\rangle$ 上で固有値1、その直交補空間で0なので、差の固有値は $3q/4$ が一個、$-q/4$ が三個です。トレースは $3q/4-3q/4=0$ とも検算できます。ゆえに

$$
\Delta=\frac12\left(\frac{3q}{4}+3\frac{q}{4}\right)=\frac{3q}{4}.
$$

最適回復誤差は同命題より $\varepsilon_{\mathrm{opt}}=3q/4$ で、この模型では偶然 $\Delta=\varepsilon_{\mathrm{opt}}$ です。これは一般の[双方向評価](#thm-qinf30-information-disturbance)における等号を主張するものではありません。
<!-- solution-end -->

<a id="ex-qinf30-b04"></a>

### 演習 B4：計算基底だけを守ってもよい回復ではない

- Level: B
- 問題: 量子ビットの完全位相緩和チャネル $\mathcal Z(\rho)=\tfrac12\rho+\tfrac12Z\rho Z$ を考える。$|0\rangle,|1\rangle$ の入力がそれぞれそのまま出力されることを確認し、任意のCPTP回復を選んでも $F_{\mathrm e}(\pi_2,\mathcal D\mathcal Z)\le1/2$ となることを示せ。失われるものは何か。

<!-- solution-start -->
**詳細解答。** $Z|0\rangle=|0\rangle$、$Z|1\rangle=-|1\rangle$ ですが、密度演算子では符号が左右から掛かるので $Z|j\rangle\langle j|Z=|j\rangle\langle j|$。従って $\mathcal Z(|j\rangle\langle j|)=|j\rangle\langle j|$ です。

一方、$|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$ の密度演算子の非対角成分は $Z$ 共役で符号が反転します。そのため

$$
\mathcal Z(|+\rangle\langle+|)
=\frac14\begin{pmatrix}1&1\\1&1\end{pmatrix}
+\frac14\begin{pmatrix}1&-1\\-1&1\end{pmatrix}
=\frac12 I_2.
$$

また[位相反転の最適回復命題](#prop-qinf30-phase)に $p=1/2$ を代入すると

$$
F_{\mathrm e}(\pi_2,\mathcal D\mathcal Z)
\le\max\{1/2,1/2\}=\frac12.
$$

上の行列表示の各 $1/4$ は分岐確率 $1/2$ と純粋入力の各成分 $1/2$ の積です。基底ラベルは保存されますが、重ね合わせの非対角成分が消え、参照系とのエンタングルメントが失われます。
<!-- solution-end -->

<a id="ex-qinf30-c01"></a>

### 演習 C1：位相反転と消失が同時にある通信路

- Level: C
- 問題: $L=\mathbb C^2$、$B=Q\oplus\mathbb C|e\rangle$（$Q\cong L$）、$0\le p,q\le1$ とする。送信時に確率 $q$ で消失し、残りの確率 $1-q$ ではフラグなし位相反転 $\mathcal N_p$ が作用する通信路を

$$
\mathcal C_{p,q}(\rho)=(1-q)\mathcal N_p(\rho)_Q
+q\operatorname{Tr}(\rho)|e\rangle\langle e|
$$

  とする。

  1. この写像がCPTPであることを示せ。
  2. 最大エンタングル入力に対する最適回復の $F_{\mathrm e}$ と不忠実度を求めよ。
  3. $\pi_2$ を基準とするPetz型回復の $F_{\mathrm e}$ を求め、$p=q=1/4$ で数値比較せよ。
  4. 環境が消失枝を区別できる等長表示を選び、$\Delta$ を求め、[双方向評価](#thm-qinf30-information-disturbance)と矛盾しないことを確かめよ。

<!-- solution-start -->
**詳細解答。** **（1）チャネル性。** $Q$ への等長埋め込みを $J$ とするとKraus作用素は

$$
\sqrt{(1-q)(1-p)}J,\quad
\sqrt{(1-q)p}JZ,\quad
\sqrt q|e\rangle\langle0|,\quad
\sqrt q|e\rangle\langle1|.
$$

随伴積は順に $(1-q)(1-p)I,(1-q)pI,q|0\rangle\langle0|,q|1\rangle\langle1|$ で、その和は $I$。従って[Kraus条件](../QINF7/index.md#thm-qinf7-kraus-cptp)からCPTPです。

**（2）最適回復。** 入力 $|\Phi_2\rangle$ の受信出力を、成功ブロックと消失ブロックへ分けます。成功ブロックの規格化状態は $(\mathrm{id}\otimes\mathcal N_p)(\Phi_2)$ で、確率が $1-q$。消失ブロックは $\pi_R\otimes|e\rangle\langle e|$ で確率 $q$ です。

任意の復号について、成功ブロックに作用する部分は、受信者がフラグを確認してから回復するCPTP写像に拡張できます。従って成功ブロックの最大忠実度は[位相反転の命題](#prop-qinf30-phase)の $\max\{1-p,p\}$ を超えません。消失ブロックの復号は参照系と積なので[演習A3](#ex-qinf30-a03)の計算により常に $1/4$ です。各ブロックを最適に処理すればこの二つの上界は同時に達成され、

$$
F_{\mathrm e}^{\mathrm{opt}}
=(1-q)\max\{1-p,p\}+\frac q4,
$$

$$
\varepsilon_{\mathrm{opt}}
=1-(1-q)\max\{1-p,p\}-\frac q4.
$$

**（3）Petz型との比較。** $\mathcal C_{p,q}(\pi_2)=(1-q)\pi_Q+q|e\rangle\langle e|$ です。$0<q<1$ では全ランクなので、[Petz型回復の公式](#def-qinf30-petz)に代入すると、成功枝には $\mathcal N_p^\dagger=\mathcal N_p$ を作用させ、消失時には $\pi_2$ を準備します。成功枝の合成は $\mathcal N_p^2$ で[命題](#prop-qinf30-phase)から忠実度は $(1-p)^2+p^2$。ゆえに

$$
F_{\mathrm e}^{\mathrm P}
=(1-q)((1-p)^2+p^2)+\frac q4.
$$

$p=q=1/4$ のとき

$$
F_{\mathrm e}^{\mathrm{opt}}
=\frac34\cdot\frac34+\frac1{16}=\frac58,
\qquad
F_{\mathrm e}^{\mathrm P}
=\frac34\cdot\frac58+\frac1{16}=\frac{17}{32}.
$$

従って不忠実度は最適で $3/8$、Petz型で $15/32$ です。消失フラグの処理は最適でも、成功枝でPetz型が不要な位相反転を再適用する分だけ差が出ます。

**（4）環境距離。** 成功枝の位相反転用環境を $E_s=\mathbb C^2$、消失枝で入力を保持する環境を $E_e\cong L$ とし、環境全体を $E=E_s\oplus E_e$ とします。環境の直交基底を $|s0\rangle,|s1\rangle\in E_s$、$\{|e0\rangle,|e1\rangle\}\subset E_e$ とし、

$$
\begin{aligned}
W|\psi\rangle
&=\sqrt{(1-q)(1-p)}J|\psi\rangle_B|s0\rangle_E\\
&\quad+\sqrt{(1-q)p}JZ|\psi\rangle_B|s1\rangle_E\\
&\quad+\sqrt q|e\rangle_B|\psi\rangle_{E_e}.
\end{aligned}
$$

異なる環境枝の直交性とCPTP条件から $W^\dagger W=I_L$ です。$B$ をトレースすると成功環境 $E_s$ と消失環境 $E_e$ の交差ブロックは零で、

$$
\Omega_{RE}
=(1-q)\Omega_{RE}^{\mathrm{phase}}
\oplus q\Phi_{R E_e},
$$

$$
\Omega_E=(1-q)\Omega_E^{\mathrm{phase}}\oplus q\pi_{E_e}.
$$

従って差作用素も直交ブロックの和で、その特異値の総和は各ブロックの特異値の総和を足したものです。[位相反転の漏洩距離](../QINF29/index.md#prop-qinf29-phase-flip)が $\sqrt{p(1-p)}$、[消失の命題](#prop-qinf30-erasure)の規格化された消失ブロックの距離が $3/4$ なので

$$
\Delta=(1-q)\sqrt{p(1-p)}+\frac{3q}{4}.
$$

$p=q=1/4$ では $\Delta=3\sqrt3/16+3/16=(3\sqrt3+3)/16$、$\varepsilon_{\mathrm{opt}}=3/8$ です。[一般評価](#thm-qinf30-information-disturbance)では

$$
\varepsilon_{\mathrm{opt}}\le2\Delta-\Delta^2,
\qquad \Delta\le2\sqrt{\varepsilon_{\mathrm{opt}}}
$$

であり、例えば $\Delta\approx0.5123$ に対し $2\Delta-\Delta^2\approx0.7621>0.375$、$2\sqrt{0.375}\approx1.2247>0.5123$ と成立します。計算で得た等式をすべてのチャネルへの等式と取り違えないことが重要です。
<!-- solution-end -->

## 9. 何を保証でき、何を保証していないか

本講の[双対定理](#thm-qinf30-duality)は、参照環境が積状態に近いなら、受信側だけのCPTP回復が高いエンタングルメント忠実度を達成することを**有限次元で証明**しました。[双方向評価](#thm-qinf30-information-disturbance)はその近さをトレース距離から数値化し、逆に高忠実度回復が環境の漏洩を抑えることも示しました。

ただし、存在証明は効率的な回路を自動生成せず、[Petz型回復](#def-qinf30-petz)は常に最適というわけでもありません。さらに最大混合入力のエンタングルメント忠実度と、任意入力に対する一様な誤差の保証には[次元因子](#prop-qinf30-uniform-bound)があります。この三つの区別を保って近似量子誤り訂正を読むことが大切です。

次のQINF31では、雑音や符号を固定するのではなく、ユニタリ不変なランダム純粋状態を作る方法を導入します。そこで得る典型的な部分系の情報収支を、回復可能性の議論と結び付けます。
