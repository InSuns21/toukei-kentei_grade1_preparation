# BHI12 Hayden–Preskillの情報投入模型

<!-- definition-example-audit: strict -->

## 1. 古いブラックホールに入れた新しい量子情報は、どこへ行くか

[BHI11の内外比較プロトコル](../BHI11/index.md#def-bhi11-comparison-protocol)では、外部で情報を回収できるかと、落下者との比較ができるかを区別しました。しかし「回収する」という動詞だけでは、**何を投入し、誰が何を集め、どの量子操作で元の状態を戻すか**は決まりません。

Hayden–Preskillの思考実験では、すでに早期放射と強くもつれた「古い」ブラックホールに、新たな量子状態（日記、diary）を投入します。内部の時間発展後に一部を追加放出させ、初期の早期放射と新しい放射を合わせて持つ受信者が日記を回収できるか問います。本講は有限次元量子系の**投入・発展・受信の設計図**を構成します。ランダムな混合化が速いか、何量子ビット放出すれば高確率で復号できるかはBHI13とBHI14の問題です。

既習の[QINF29の完全復号とデカップリングの同値](../../../応用系/QINF/QINF29/index.md#thm-qinf29-recovery)を使う準備として、まず入力と出力の各因子を固定します。以下、量子系は有限次元複素Hilbert空間、エントロピーは自然対数を用います。

## 2. 日記・参照系・古いブラックホール・早期放射

日記そのものを読み出せたかを検査するため、日記 $A$ と同じ次元の**参照系** $M$ を外部に用意します。参照系は受信者に渡さず、日記と最大エンタングル状態を作っておく試験器です。これは[QINF29の参照系付きチャネル状態](../../../応用系/QINF/QINF29/index.md#def-qinf29-reference)のブラックホール版です。

ブラックホールの投入前の自由度を $B$、すでに外へ出た早期放射を $E$ とします。「古い」を表す有限模型の強い仮定として、$B$ と $E$ も最大エンタングル状態とします。各対の基底は対応付けて固定します。

<a id="def-bhi12-old-input"></a>

<!-- formal-statement-start -->
> **定義（古いブラックホールへの日記投入状態）**
>
> $d_A,d_B$ を正整数、$H_A,H_M$ を次元 $d_A$、$H_B,H_E$ を次元 $d_B$ の複素Hilbert空間とする。それぞれ対応する正規直交基底を $|i\rangle$、$|j\rangle$ で表す。参照系 $M$、日記 $A$、投入前ブラックホール $B$、早期放射 $E$ の純粋初期状態を

$$
|\Psi_0\rangle_{MABE}
=|\Phi_{d_A}\rangle_{MA}\otimes|\Phi_{d_B}\rangle_{BE},
$$

$$
|\Phi_{d_A}\rangle_{MA}
=\frac{1}{\sqrt{d_A}}\sum_{i=0}^{d_A-1}|i\rangle_M|i\rangle_A,
\qquad
|\Phi_{d_B}\rangle_{BE}
=\frac{1}{\sqrt{d_B}}\sum_{j=0}^{d_B-1}|j\rangle_B|j\rangle_E
$$

> と定める。$M$ は受信者が利用しない比較用の系、$E$ は受信者が保管している量子放射レジスタとする。
<!-- formal-statement-end -->

二つの対の基底ベクトルは直交するので、それぞれのノルム平方は $d_A/d_A=1$、$d_B/d_B=1$ です。したがって全状態も規格化されています。早期放射を集めた受信者は $E$ を**量子的なまま**保管するのであって、各ビットを先に測定するわけではありません。

<!-- definition-example-start: def-bhi12-old-input -->
**定義の確認**：日記も投入前ブラックホールも1量子ビット（$d_A=d_B=2$）なら、

$$
|\Psi_0\rangle
=\frac12(|00\rangle+|11\rangle)_{MA}
\otimes(|00\rangle+|11\rangle)_{BE}.
$$

各Bell対の二成分は直交し、全四項の振幅は $1/2$ なので、ノルム平方は $4(1/2)^2=1$ です。

[部分トレース](../../../応用系/QINF/QINF3/index.md#def-qinf3-partial-trace)で日記 $A$ を捨てると、参照系の交差項には $\langle k|i\rangle_A=\delta_{ik}$ が掛かります。したがって

$$
\rho_M=\frac12\sum_{i,k=0}^1|i\rangle\langle k|_M\,\delta_{ik}
=\frac{I_M}{2}.
$$

同じ計算で $\rho_E=I_E/2$ です。初期状態の $MA$ 対と $BE$ 対は積なので、その部分トレースも積です。

$$
\rho_{ME}=\frac{I_M}{2}\otimes\frac{I_E}{2}=\frac{I_{ME}}4.
$$

つまり、**投入前の早期放射 $E$ は新しい日記の参照系 $M$ と無相関**です。
<!-- definition-example-end -->

物理的な蒸発ブラックホールで $BE$ が厳密に一つの最大エンタングル対になることまでは仮定できません。ここでは新たな日記を入れる直前に、利用可能な早期放射が内部を精製している理想化として用います。[BHI7のPage型期待曲線](../BHI7/index.md)と同じく、有限次元の典型性や初期純粋性を物理時間発展の証明と同一視しません。

## 3. 投入後のユニタリ発展と放出

日記 $A$ と古い内部 $B$ を一つの入力 $AB$ とみなし、内部でユニタリ発展させます。出力を、残存ブラックホール $C$ と新しい放射 $D$ に分割します。ここで「混合化（scrambling）」とは、日記の情報が内部の多数の自由度に広がるような**特別な**発展の性質を指す言葉です。ユニタリであること自体は混合化を意味しません。

<a id="def-bhi12-evaporation-map"></a>

<!-- formal-statement-start -->
> **定義（投入・発展・放出の写像）**
>
> 前節の $M,A,B,E$ に加え、正整数 $d_C,d_D$ を次元とする出力系 $C,D$ を取り、次元保存条件 $d_A d_B=d_C d_D$ を課す。任意のユニタリ写像

$$
U:H_A\otimes H_B\longrightarrow H_C\otimes H_D
$$

> による出力を次の純粋状態と定める。

$$
|\Psi_U\rangle_{MCDE}
=(I_M\otimes U_{AB\to CD}\otimes I_E)|\Psi_0\rangle_{MABE}.
$$

> $C$ は残存ブラックホール、$D$ は追加放射とする。$M,E$ には $U$ を作用させず、受信者が操作できるのは $D E$ のみとする。$U$ は本講では任意のユニタリであり、Haarランダム性・局所性・進化時間をまだ仮定しない。
<!-- formal-statement-end -->

次元条件は行列の大きさの確認でもあります。$U$ は $d_Cd_D$ 行 $d_Ad_B$ 列であり、両者が等しいからユニタリとなれます。$d_A=2,d_B=8,d_D=4$ と選ぶなら、残存系は $d_C=2\cdot8/4=4$ 次元です。$D$ の次元が大きいほど常に回収できる、という結論はこの等式**だけ**からは出ません。

<!-- definition-example-start: def-bhi12-evaporation-map -->
**定義の確認**：$d_A=d_B=d_C=d_D=2$ とし、基底について

$$
U_{\rm good}|a\rangle_A|b\rangle_B
=|b\rangle_C|a\rangle_D,\qquad a,b\in\{0,1\}
$$

というSWAP型の出力配置を選びます。

入力の四つの正規直交基底が出力の四つの正規直交基底へ一対一に写るため、$U_{\rm good}^\dagger U_{\rm good}=I_{AB}$ かつ $U_{\rm good}U_{\rm good}^\dagger=I_{CD}$。従ってユニタリです。初期状態の $A$ は $D$ へ、$B$ は $C$ へ写り、

$$
|\Psi_{\rm good}\rangle
=|\Phi_2\rangle_{MD}\otimes|\Phi_2\rangle_{CE}
$$

となります。受信者は $D$ だけで日記を持てます。これは情報の直送であり、複雑なscramblingを示す例ではありません。
<!-- definition-example-end -->

全状態が純粋であることは、外から見た放射 $DE$ や残存系 $C$ も純粋だという意味ではありません。例えば直前の出力では $D$ 単独は $I_D/2$ ですが、$MD$ の全状態は純粋なBell対です。これが[BHI5の精細エントロピーと局所的熱性の区別](../BHI5/index.md)とつながります。

## 4. 受信者の回収課題と正しい採点法

受信者Bobは以前から保管していた $E$ と、今受け取った $D$ だけを操作します。$C$ は外部からアクセスできず、$M$ は参照系なので、どちらも復号器の入力に入れてはいけません。日記の未知状態について、一つの固定した量子チャネルで回収できることを要求します。

<a id="def-bhi12-recovery-task"></a>

<!-- formal-statement-start -->
> **定義（Hayden–Preskill回収課題）**
>
> [古いブラックホールへの日記投入状態](#def-bhi12-old-input)と[放出写像](#def-bhi12-evaporation-map)を固定する。日記の任意の入力密度演算子 $\tau_A$ に対して、早期放射 $E$ を保持した受信者へ届くチャネルを

$$
\mathcal N_{A\to DE}(\tau_A)
=\operatorname{Tr}_{C}
\left[
(U_{AB\to CD}\otimes I_E)
(\tau_A\otimes|\Phi_{d_B}\rangle\langle\Phi_{d_B}|_{BE})
(U^\dagger_{CD\to AB}\otimes I_E)
\right]
$$

> と定める。受信者の回復写像は入力に依存しない完全正値・トレース保存（CPTP）写像 $\mathcal D:\mathcal L(DE)\to\mathcal L(\widehat A)$ とし、$H_{\widehat A}\cong H_A$ と固定する。
>
> **完全回収**とは、任意の $\tau_A$ について

$$
\mathcal D\circ\mathcal N_{A\to DE}(\tau_A)=\tau_{\widehat A}
$$

> が成立することをいう。**参照系試験**では、$\rho_{MDE}=\operatorname{Tr}_C|\Psi_U\rangle\langle\Psi_U|$ へ $\mathcal D$ を作用させ、回復後の $M\widehat A$ が $|\Phi_{d_A}\rangle\langle\Phi_{d_A}|$ と一致するかを調べる。
<!-- formal-statement-end -->

式の $\tau_A$ と $\tau_{\widehat A}$ は固定した同型写像で対応させた同じ行列を意味します。参照系試験は「0と1を識別できた」より強く、未知の重ね合わせの**位相**まで保つ検査です。[QINF30のエンタングルメント忠実度](../../../応用系/QINF/QINF30/index.md#def-qinf30-entanglement-fidelity)を使えば、近似回収の得点を

$$
F_{\rm e}
=\langle\Phi_{d_A}|
(\mathrm{id}_M\otimes\mathcal D)(\rho_{MDE})
|\Phi_{d_A}\rangle
$$

と置けます（式内では復号後に $DE$ を $\widehat A$ と読み替えます）。$F_{\rm e}=1$ は完全回収に一致しますが、一般に $F_{\rm e}$ が高いというだけで復号計算が高速とは限りません。

<!-- definition-example-start: def-bhi12-recovery-task -->
**定義の確認**：前節のSWAP型 $U_{\rm good}$ を使い、$\mathcal D(\sigma_{DE})=\operatorname{Tr}_E\sigma_{DE}$ とします。入力が任意の $\tau_A$ でも、$U_{\rm good}$ はそのまま $A$ を $D$ に移し、$B$ を $C$ に移すので

$$
\mathcal N_{A\to DE}(\tau_A)=\tau_D\otimes I_E/2,
\qquad
\mathcal D\mathcal N(\tau_A)
=\operatorname{Tr}_E(\tau_D\otimes I_E/2)=\tau_{\widehat A}.
$$

部分トレースはCPTPで、$\operatorname{Tr}(I_E/2)=1$。参照系付きでも $\rho_{MDE}=|\Phi_2\rangle\langle\Phi_2|_{MD}\otimes I_E/2$ なので、復号後は元のBell状態となり $F_{\rm e}=1$ です。全入力での完全回収と参照系試験をともに確認しました。
<!-- definition-example-end -->

## 5. 初期の早期放射は新しい日記と独立

日記を後から投入したことには、重要な因果的意味があります。受信者は古い放射を保持していますが、投入前の $E$ が新しい日記の内容を知っているわけではありません。$U$ が $A B$ のみに作用するので、$M E$ の縮約は投入後も変わりません。

<a id="prop-bhi12-early-independence"></a>

<!-- formal-statement-start -->
> **命題（参照系と早期放射の独立性）**
>
> [投入・発展・放出の写像](#def-bhi12-evaporation-map)において、任意のユニタリ $U:H_A\otimes H_B\to H_C\otimes H_D$ に対し、出力純粋状態の縮約は

$$
\rho_{ME}=\frac{I_M}{d_A}\otimes\frac{I_E}{d_B},
\qquad
\rho_M=\frac{I_M}{d_A},
\qquad
\rho_E=\frac{I_E}{d_B}.
$$

> 特に、[量子相互情報量](../../../応用系/QINF/QINF18/index.md#def-qinf18-mutual)は $I(M:E)=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$AB$ 上だけのユニタリは、それをまるごと部分トレースした $ME$ の状態を変えません。初期状態は独立な二つのBell対なので、縮約の非対角項は消え、積状態になります。

<!-- proof-start -->
### 証明

初期状態の密度演算子を $\rho_0$ とします。[部分トレース](../../../応用系/QINF/QINF3/index.md#def-qinf3-partial-trace)の定義から、任意の $ME$ 上の作用素 $X$ について

$$
\operatorname{Tr}\!\left[X\operatorname{Tr}_{CD}|\Psi_U\rangle\langle\Psi_U|\right]
=\operatorname{Tr}\!\left[(X\otimes I_{CD})
(I_{ME}\otimes U)\rho_0(I_{ME}\otimes U^\dagger)\right].
$$

ここではテンソル因子を $ME|AB$ と並び替えて表しました。トレースの巡回性と $U^\dagger U=I_{AB}$ を使えば右辺は $\operatorname{Tr}[(X\otimes I_{AB})\rho_0]$ です。任意の $X$ で期待値が一致するため、$\rho_{ME}=\operatorname{Tr}_{AB}\rho_0$。

各Bell対について

$$
\operatorname{Tr}_A|\Phi_{d_A}\rangle\langle\Phi_{d_A}|
=\frac1{d_A}\sum_{i,k}|i\rangle\langle k|_M
\langle k|i\rangle_A
=\frac1{d_A}\sum_i|i\rangle\langle i|_M=\frac{I_M}{d_A}.
$$

$BE$ 対も同じく $\operatorname{Tr}_B|\Phi_{d_B}\rangle\langle\Phi_{d_B}|=I_E/d_B$ です。初期の二対は積なので、二つの縮約のテンソル積が $\rho_{ME}$ です。従って $S(ME)=\ln d_A+\ln d_B$、$S(M)=\ln d_A$、$S(E)=\ln d_B$。定義 $I(M:E)=S(M)+S(E)-S(ME)$ へ代入して0を得ます。
<!-- proof-end -->

## 6. 残存ブラックホールから参照系が切り離されれば回収できる

日記の量子情報が $DE$ で復号できるかを調べる際、受信者のあらゆる復号器を探索しなくてもよい方法があります。**受信者が持てない残存系 $C$ に、参照系 $M$ との相関が残っているか**を調べるのです。ここで[QINF29のデカップリング定理](../../../応用系/QINF/QINF29/index.md#thm-qinf29-recovery)を、ブラックホールの記号へ具体的に適用します。

<a id="thm-bhi12-recovery-condition"></a>

<!-- formal-statement-start -->
> **定理（投入模型の完全回収条件）**
>
> $d_A,d_B,d_C,d_D$ が正整数で $d_A d_B=d_C d_D$、$U:H_A\otimes H_B\to H_C\otimes H_D$ がユニタリ、初期状態が[古いブラックホールへの日記投入状態](#def-bhi12-old-input)であるとする。受信者が $DE$ のみに作用するCPTP写像で日記を**全入力について完全回収できること**と、出力の $MC$ 縮約が

$$
\rho_{MC}=\frac{I_M}{d_A}\otimes\rho_C
$$

> を満たすことは同値である。$M$ は参照系、$C$ は残存ブラックホールである。
<!-- formal-statement-end -->

### 証明の見取り図

日記入力 $A$ から受信側 $DE$ への写像をチャネルとみなすと、捨てる環境は $C$ です。古いブラックホールと早期放射のBell対を固定して付加する操作は等長写像です。従って、既習定理の論理入力・受信出力・環境・参照系を順に $A,DE,C,M$ と対応させれば、必要十分条件が得られます。

<!-- proof-start -->
### 証明

$A$ 上の任意の $|\psi\rangle_A$ に対し

$$
W|\psi\rangle_A
=(U_{AB\to CD}\otimes I_E)
\bigl(|\psi\rangle_A\otimes|\Phi_{d_B}\rangle_{BE}\bigr)
$$

と置きます。$W:H_A\to H_C\otimes H_D\otimes H_E$ です。任意の $|\psi\rangle,|\phi\rangle$ について、ユニタリ性とBell対の規格化から

$$
\langle W\psi|W\phi\rangle
=\langle\psi|\phi\rangle_A
\langle\Phi_{d_B}|\Phi_{d_B}\rangle_{BE}
=\langle\psi|\phi\rangle_A.
$$

従って $W^\dagger W=I_A$、すなわち $W$ は等長写像です。出力の順序を $DE|C$ へ並べ替えると、

$$
\mathcal N_{A\to DE}(\tau)
=\operatorname{Tr}_C(W\tau W^\dagger),\qquad
\mathcal N^c_{A\to C}(\tau)
=\operatorname{Tr}_{DE}(W\tau W^\dagger)
$$

は互いに相補チャネルになります。$M A$ に $|\Phi_{d_A}\rangle$ を入れた参照系付きの状態は、定義からまさしく $|\Psi_U\rangle_{MCDE}$ です。

[完全復号と環境デカップリングの同値](../../../応用系/QINF/QINF29/index.md#thm-qinf29-recovery)の仮定を照合すると、論理入力は有限次元 $A$、等長符号化は恒等写像、Stinespring等長写像は $W$、受信出力は $DE$、環境は $C$、参照系は $M$。よって同定したチャネルに完全復号が存在することと $\rho_{MC}=\rho_M\otimes\rho_C$ が同値です。[参照系と早期放射の独立性](#prop-bhi12-early-independence)から $\rho_M=I_M/d_A$ を代入すれば結論です。
<!-- proof-end -->

**成功例**：前節のSWAP型配置では $\rho_{MC}=(I_M/2)\otimes(I_C/2)$ です。定理の右辺と一致し、実際に $D$ から完全回収できました。

**失敗例**：同じ四つの二準位系で $U_{\rm bad}|a\rangle_A|b\rangle_B=|a\rangle_C|b\rangle_D$ とします。これは基底を保つ恒等配置なのでユニタリですが、出力は

$$
|\Psi_{\rm bad}\rangle
=|\Phi_2\rangle_{MC}\otimes|\Phi_2\rangle_{DE}.
$$

したがって $\rho_{MC}=|\Phi_2\rangle\langle\Phi_2|$ は純粋なBell状態で、$\rho_M\otimes\rho_C=I_{MC}/4$ と異なります。受信者側は $\rho_{MDE}=(I_M/2)\otimes|\Phi_2\rangle\langle\Phi_2|_{DE}$ で、$M$ と全く相関していません。同じ次元・同じユニタリ性でも回収成否が逆転する理由は、$A$ が $C$ に残るか $D$ へ運ばれるかです。

**中間例（古典情報だけ読める）**：$U$ を $A$ 制御・$B$ 標的のCNOTとし、出力を $C=A,D=B$ と名付けます。Bell対を $|\Phi_\pm\rangle=(|00\rangle\pm|11\rangle)/\sqrt2$、$|\Psi_+\rangle=(|01\rangle+|10\rangle)/\sqrt2$ と置くと

$$
|\Psi_{\rm CNOT}\rangle
=\frac{|0\rangle_M|0\rangle_C|\Phi_+\rangle_{DE}
+|1\rangle_M|1\rangle_C|\Psi_+\rangle_{DE}}{\sqrt2}.
$$

$DE$ 側の二つのBell状態は直交するので、$C$ を捨てた $\rho_{MDE}$ から受信者は $M$ の計算基底ラベルと相関するBell測定結果を得られます。しかし $\rho_{MC}=\tfrac12(|00\rangle\langle00|+|11\rangle\langle11|)$ であり、$\rho_M\otimes\rho_C=I_{MC}/4$ と異なります。$C$ に計算基底のラベルが残り、$DE$ のみから重ね合わせの位相を復元できないため、未知の量子状態の完全回収はできません。この違いは[QINF29の参照環境の成分条件](../../../応用系/QINF/QINF29/index.md#lem-qinf29-blocks)に対応します。

## 7. 少なくとも日記と同じ次元の追加放射が必要

完全回収を可能にするにはどのくらいの $D$ が最低限必要でしょうか。ランダム行列の評価に入る前に、[参照系と早期放射の独立性](#prop-bhi12-early-independence)だけで、回収の**ために必要な次元下界**を一つ導けます。既知の早期放射 $E$ は、投入前から新しい日記と相関していたわけではない点が効きます。

<a id="prop-bhi12-output-lower-bound"></a>

<!-- formal-statement-start -->
> **命題（完全回収に必要な追加放射の次元）**
>
> [投入・発展・放出模型](#def-bhi12-evaporation-map)と、$E$ にだけは投入前からアクセスできる受信者を考える。$DE$ から日記 $A$ の全量子状態を完全回収できるなら

$$
d_D\ge d_A
$$

> が必要である。ただしこの次元不等式だけでは完全回収は保証されない。
<!-- formal-statement-end -->

### 証明の見取り図

完全回収なら前節の条件から、参照系 $M$ と受信系 $DE$ は最大の量子相互情報量 $2\ln d_A$ を持ちます。一方、最初は $M$ と $E$ が独立なので、後から加えた $D$ が作れる相互情報量は高々 $2\ln d_D$ です。両者を比べます。

<!-- proof-start -->
### 証明

出力 $MCDE$ は純粋です。[完全回収条件](#thm-bhi12-recovery-condition)を満たすと $\rho_{MC}=\rho_M\otimes\rho_C$ ですから、$S(MC)=S(M)+S(C)$。純粋状態の相補系は等しいエントロピーを持つため、$S(DE)=S(MC)$、$S(MDE)=S(C)$ です。従って

$$
I(M:DE)=S(M)+S(DE)-S(MDE)
=2S(M)=2\ln d_A.
$$

[早期放射の独立性](#prop-bhi12-early-independence)で $I(M:E)=0$ なので、相互情報量の定義を展開すると

$$
I(M:DE)-I(M:E)
=[S(DE)-S(E)]-[S(MDE)-S(ME)]
=S(D|E)-S(D|ME).
$$

ここで $S(D|X):=S(DX)-S(X)$ です。[部分加法性](../../../応用系/QINF/QINF18/index.md#thm-qinf18-subadditivity)と[Araki–Lieb不等式](../../../応用系/QINF/QINF18/index.md#thm-qinf18-araki-lieb)から、任意の有限次元状態について

$$
S(D|E)\le S(D)\le\ln d_D,
\qquad
S(D|ME)\ge-S(D)\ge-\ln d_D.
$$

第一の不等式は $S(DE)\le S(D)+S(E)$、第二の不等式は $S(DME)\ge S(ME)-S(D)$ を各々移項したものです。よって

$$
2\ln d_A=I(M:DE)\le2\ln d_D.
$$

自然対数は単調増加なので、$d_D\ge d_A$ が必要です。逆向きは、$d_D=d_A$ でも前節の恒等配置 $U_{\rm bad}$ が回収不能となる反例で否定されます。
<!-- proof-end -->

この下界は**正確な完全回収**の必要条件です。「$d_D$ が $d_A$ を何倍超えれば、典型的な混合化ユニタリで高い忠実度が得られるか」は、次講の二次モーメント・デカップリング評価で扱います。また $d_A,d_D$ はHilbert空間の**次元**であり、量子ビット数は $\log_2 d_A,\log_2 d_D$ です。

## 8. 有限模型と実際のブラックホールを結ぶ仮定

| 段階 | 本講で固定した条件 | 実際に検討すべき追加問題 |
| --- | --- | --- |
| 投入前 | $B$ と利用可能な $E$ は最大エンタングル対 | 蒸発過程でどの早期放射へアクセスできるか |
| 日記 | 参照系 $M$ と未知の量子入力 $A$ | 入力エネルギー・バックリアクション・ブラックホールの成長 |
| 内部発展 | 任意の次元保存ユニタリ $U$ | 物理的相互作用、速いscrambling、局所性、時間尺度 |
| 追加放射 | 出力を $C$（内部）と $D$（新放射）に分ける | 放射速度・モードの灰色体因子・因数分解の適用範囲 |
| 回収 | 受信者は $DE$ を量子的に保管してCPTP復号 | 実装可能な復号回路、所要時間と誤差 |

[BHI11の回収・復号・入射時間](../BHI11/index.md#thm-bhi11-causal-waiting)と比べると、本講で示したのは受信系の**情報理論的な配置と判定**です。短い物理時間で混合することや、計算資源の少ない受信者が実際に復号できることは別に調べる必要があります。

## 9. 演習

全問で有限次元複素Hilbert空間を使い、エントロピーの対数は自然対数とします。$M$ は受信者が触れられない参照系、$C$ は捨てる残存系、$D,E$ は受信系です。

### Level A：状態と系を正しく数える

<a id="ex-bhi12-a01"></a>
#### BHI12-A01 入出力の次元帳簿

- Level: A

$d_A=2,d_B=8,d_D=4$ とする。[投入・発展・放出の写像](#def-bhi12-evaporation-map)がユニタリであるための $d_C$ を求め、$U$ の行列の行数・列数と、$M C D E$ の全次元を計算せよ。

<!-- solution-start -->
**詳細解答**：ユニタリの入出力次元は等しいから $d_C=d_A d_B/d_D=(2\cdot8)/4=4$。入力 $AB$ は16次元、出力 $CD$ も $4\cdot4=16$ 次元なので、$U$ は16行16列です。$M$ は $d_M=d_A=2$、$E$ は $d_E=d_B=8$。全出力は $d_Md_Cd_Dd_E=2\cdot4\cdot4\cdot8=256$ 次元で、入力 $MABE$ も $2\cdot2\cdot8\cdot8=256$ 次元です。$U$ のみが16次元空間を動かし、$M,E$ はそのままです。
<!-- solution-end -->

<a id="ex-bhi12-a02"></a>
#### BHI12-A02 二対の初期状態と無相関

- Level: A

$d_A=d_B=2$ の初期状態について $\rho_M,\rho_E,\rho_{ME}$ を求め、$\operatorname{Tr}\rho_{ME}$ と $I(M:E)$ を検算せよ。

<!-- solution-start -->
**詳細解答**：$|\Phi_2\rangle\langle\Phi_2|=\frac12\sum_{i,k=0}^1|i\rangle\langle k|\otimes|i\rangle\langle k|$ です。片側をトレースすると $\operatorname{Tr}|i\rangle\langle k|=\delta_{ik}$ により $I_2/2$。独立な二対から $\rho_M=I_2/2,\rho_E=I_2/2,\rho_{ME}=(I_2/2)\otimes(I_2/2)=I_4/4$ です。$\operatorname{Tr}\rho_{ME}=4(1/4)=1$。各スペクトルは $M,E$ が $(1/2,1/2)$、$ME$ が $(1/4,1/4,1/4,1/4)$ なので $S(M)=S(E)=\ln2$、$S(ME)=2\ln2$。従って $I(M:E)=\ln2+\ln2-2\ln2=0$。
<!-- solution-end -->

<a id="ex-bhi12-a03"></a>
#### BHI12-A03 SWAP型の回収写像

- Level: A

$d_A=d_B=2$ とし $U|a,b\rangle=|b\rangle_C|a\rangle_D$ を選ぶ。全状態をBell対の積に書き、$\rho_{MDE}$ と完全回収写像を示せ。

<!-- solution-start -->
**詳細解答**：初期状態を $MA$ と $BE$ のBell対の積に分けておくと、$U$ が $A$ のラベルを $D$、$B$ のラベルを $C$ へ写すので $|\Psi_U\rangle=|\Phi_2\rangle_{MD}\otimes|\Phi_2\rangle_{CE}$ です。$C$ をトレースすると $\rho_{MDE}=|\Phi_2\rangle\langle\Phi_2|_{MD}\otimes I_E/2$。$DE$ 上の任意の密度演算子を $\operatorname{Tr}_E$ する写像 $\mathcal D$ はCPTPです。参照系付き入力に適用すれば $(\mathrm{id}_M\otimes\mathcal D)(\rho_{MDE})=|\Phi_2\rangle\langle\Phi_2|_{M\widehat A}$、また任意の $\tau_A$ に対し $\mathcal N(\tau_A)=\tau_D\otimes I_E/2$ なので $\mathcal D\mathcal N(\tau_A)=\tau_{\widehat A}$ です。
<!-- solution-end -->

<a id="ex-bhi12-a04"></a>
#### BHI12-A04 恒等配置の反例

- Level: A

$d_A=d_B=2$、$U|a,b\rangle=|a\rangle_C|b\rangle_D$ とする。$\rho_{MC}$ と $\rho_M\otimes\rho_C$ を計算し、完全回収が可能か答えよ。

<!-- solution-start -->
**詳細解答**：出力は $|\Phi_2\rangle_{MC}\otimes|\Phi_2\rangle_{DE}$ です。$DE$ を捨てると $\rho_{MC}=|\Phi_2\rangle\langle\Phi_2|$、その周辺は $\rho_M=I_2/2,\rho_C=I_2/2$。従って $\rho_M\otimes\rho_C=I_4/4$。前者は階数1、後者は階数4で一致しません。[完全回収条件](#thm-bhi12-recovery-condition)が破れるため、$DE$ にどんなCPTP復号を施しても全量子入力の完全回収はできません。失われた仮定は「残存系が日記参照系からデカップリングしていること」です。
<!-- solution-end -->

<a id="ex-bhi12-a05"></a>
#### BHI12-A05 放射量の下界と量子ビット数

- Level: A

日記が3量子ビット、新放射が2量子ビットのとき、$d_A,d_D$ と[追加放射の次元下界](#prop-bhi12-output-lower-bound)の成否を答えよ。新放射が3量子ビットなら回収が必ず成立するか。

<!-- solution-start -->
**詳細解答**：3量子ビットのHilbert次元は $d_A=2^3=8$、2量子ビットでは $d_D=2^2=4$ です。$4<8$ なので完全回収の必要条件を満たさず、不可能です。新放射が3量子ビットなら $d_D=8=d_A$ で必要条件は満たしますが、十分条件ではありません。例えば日記を内部 $C$ に残すような配置では、$\rho_{MC}$ に相関が残り復号不能です。次元の条件とユニタリ内部発展の情報の行先は別に確認します。
<!-- solution-end -->

### Level B：回収条件を再構成する

<a id="ex-bhi12-b01"></a>
#### BHI12-B01 固定Bell対を付けた写像は等長か

- Level: B

任意の有限次元 $A,B,C,D,E$ と規格化された $|\Phi_{d_B}\rangle_{BE}$ に対し、$W:A\to CDE$ を $W|\psi\rangle=(U\otimes I_E)(|\psi\rangle_A|\Phi_{d_B}\rangle_{BE})$ とする。$W^\dagger W=I_A$ を示し、どの部分トレースが回収チャネルと相補チャネルになるか答えよ。

<!-- solution-start -->
**詳細解答**：$U$ は $AB\to CD$ のユニタリです。$A$ の任意の $|\psi\rangle,|\phi\rangle$ に対し内積を保存することを順に示します。

$$
\langle W\psi|W\phi\rangle
=(\langle\psi|\otimes\langle\Phi|)(U^\dagger U\otimes I_E)(|\phi\rangle\otimes|\Phi\rangle)
=\langle\psi|\phi\rangle\langle\Phi|\Phi\rangle=\langle\psi|\phi\rangle.
$$

最後はBell対の規格化です。全入力の内積が保存されるので $W^\dagger W=I_A$。$\operatorname{Tr}_C(W\tau W^\dagger)$ は受信出力 $DE$ のチャネル、$\operatorname{Tr}_{DE}(W\tau W^\dagger)$ はアクセスできない出力 $C$ の相補チャネルです。順序を入れ替えた $DE\otimes C$ の表現を使えば、[QINF29のStinespring形](../../../応用系/QINF/QINF29/index.md#thm-qinf29-recovery)と一致します。
<!-- solution-end -->

<a id="ex-bhi12-b02"></a>
#### BHI12-B02 CNOTは古典的な日記を読めても量子日記を戻せない

- Level: B

$d_A=d_B=2$、$U=\operatorname{CNOT}_{A\to B}$、出力名を $C=A,D=B$ とする。$\rho_{MC}$ を計算し、$DE$ に対するBell測定で計算基底ラベルを判定できることと、未知の量子日記を完全に回収できることが別である理由を示せ。

<!-- solution-start -->
**詳細解答**：$A=0$ なら $BE$ のBell対は $|\Phi_+\rangle_{DE}$ のまま、$A=1$ なら $X_D$ が作用して $|\Psi_+\rangle_{DE}$ になります。ゆえに

$$
|\Psi_U\rangle
=\frac{|00\rangle_{MC}|\Phi_+\rangle_{DE}
+|11\rangle_{MC}|\Psi_+\rangle_{DE}}{\sqrt2}.
$$

$DE$ の二つのBellベクトルは内積0なので、部分トレースで $MC$ の交差項は消え、

$$
\rho_{MC}=\frac12|00\rangle\langle00|+\frac12|11\rangle\langle11|.
$$

これは $\rho_M\otimes\rho_C=I_{MC}/4$ ではありません。一方、日記を $|0\rangle,|1\rangle$ に制限すれば、$DE$ の直交したBell測定結果がそれぞれ異なりますから、ラベルは読み取れます。重ね合わせの位相が $C$ に残り、[完全回収条件](#thm-bhi12-recovery-condition)が破れるため、量子入力の完全復号にはなりません。
<!-- solution-end -->

<a id="ex-bhi12-b03"></a>
#### BHI12-B03 完全回収条件を既習定理から導く

- Level: B

回収チャネルを $\mathcal N_{A\to DE}$ としたとき、[QINF29の完全復号定理](../../../応用系/QINF/QINF29/index.md#thm-qinf29-recovery)の「論理入力、符号化、Stinespring等長写像、受信出力、環境、参照系」に相当する本講の対象を全て書き、$\rho_{MC}=\rho_M\otimes\rho_C$ が必要十分であることを導け。

<!-- solution-start -->
**詳細解答**： [QINF29の完全復号定理](../../../応用系/QINF/QINF29/index.md#thm-qinf29-recovery)の論理入力を $A$、等長符号化を恒等写像 $I_A$、受信出力を $DE$、環境を $C$、参照系を $M\cong A$ と対応させます。

このときStinespring等長写像は、初期Bell対を付加してから発展させる写像

$$
W|\psi\rangle=(U\otimes I_E)(|\psi\rangle_A|\Phi_{d_B}\rangle_{BE})
$$

です。$U^\dagger U=I_{AB}$ と $\langle\Phi_{d_B}|\Phi_{d_B}\rangle=1$ を用いて内積を計算すると、$W^\dagger W=I_A$ となり、定理の等長性の仮定を満たします。

初期Bell対 $MA$ に $I_M\otimes W$ を作用させた出力が $|\Psi_U\rangle$ なので、QINF29定理でいう参照環境縮約は $\rho_{MC}$ です。ゆえに完全回収と、次の積状態条件が同値です。

$$
\rho_{MC}=\rho_M\otimes\rho_C.
$$

さらに[参照系と早期放射の独立性](#prop-bhi12-early-independence)から $\rho_M=I_M/d_A$。これを代入すれば[本講の完全回収条件](#thm-bhi12-recovery-condition)が得られます。
<!-- solution-end -->

<a id="ex-bhi12-b04"></a>
#### BHI12-B04 なぜ追加放射は少なくとも日記の大きさが必要か

- Level: B

[初期独立性](#prop-bhi12-early-independence) $I(M:E)=0$ と完全回収条件を仮定し、$I(M:DE)\le2\ln d_D$ を条件付きエントロピーを用いて示せ。そこから必要な $d_D$ の不等式を求めよ。

<!-- solution-start -->
**詳細解答**：完全回収では $\rho_{MC}=\rho_M\otimes\rho_C$ で、$MCDE$ は純粋だから $S(DE)=S(MC)=S(M)+S(C)$、$S(MDE)=S(C)$。従って $I(M:DE)=2S(M)=2\ln d_A$。$I(M:E)=0$ を引き、定義を展開して

$$
2\ln d_A
=I(M:DE)-I(M:E)
=S(DE)-S(E)-S(MDE)+S(ME)
=S(D|E)-S(D|ME).
$$

部分加法性から $S(D|E)\le S(D)$、Araki–Lieb不等式から $S(D|ME)\ge-S(D)$ です。$S(D)\le\ln d_D$ を合わせ、$2\ln d_A\le2S(D)\le2\ln d_D$。指数関数は単調なので $d_A\le d_D$ を得ます。$d_D=d_A$ でも[BHI12-A04](#ex-bhi12-a04)の恒等配置が失敗するため、下界は十分条件ではありません。
<!-- solution-end -->

### Level C：同じ次元の二つの発展を対照する

<a id="ex-bhi12-c01"></a>
#### BHI12-C01 古いブラックホールを2量子ビットにした回収の成否

- Level: C

$d_A=d_M=d_D=2$、$d_B=d_E=d_C=4$ とする。$B=B_1B_2$ と $E=E_1E_2$ を各2量子ビットに分け、初期状態を $|\Phi_2\rangle_{MA}|\Phi_2\rangle_{B_1E_1}|\Phi_2\rangle_{B_2E_2}$ とする。次の二つの写像を比較せよ。

1. $U_1$ は入力の $B_1B_2$ を $C$ に、$A$ を $D$ に並べ替える。
2. $U_2$ は入力の $AB_1$ を $C$ に、$B_2$ を $D$ に並べ替える。

それぞれがユニタリであることを確認し、$|\Psi_{U_i}\rangle$、$\rho_{MC}$、$\rho_M\otimes\rho_C$ を求めよ。$DE$ からの完全回収可否を結論し、「$d_D=d_A$ なら必ず回収可能」という推論の誤りを指摘せよ。

<!-- solution-start -->
**詳細解答**

**次元とユニタリ性**：両配置の入力は $d_A d_B=2\cdot4=8$、出力は $d_Cd_D=4\cdot2=8$ 次元です。それぞれ基底の三ビットを異なる出力位置へ入れ替えるだけなので、八つの正規直交基底を八つの正規直交基底へ一対一に写します。従ってどちらもユニタリです。

**$U_1$**：$A$ が $D$ へ写り、$B_1B_2$ が $C$ へ写るので、出力のBell対は

$$
|\Psi_{U_1}\rangle
=|\Phi_2\rangle_{MD}
|\Phi_2\rangle_{C_1E_1}
|\Phi_2\rangle_{C_2E_2}.
$$

$DE$ を捨てると $\rho_{MC}=(I_M/2)\otimes(I_{C_1}/2)\otimes(I_{C_2}/2)=I_M/2\otimes I_C/4$。$\rho_M=I_M/2$、$\rho_C=I_C/4$ なので積状態条件が成立します。実際に $E$ を捨て $D$ を $\widehat A$ とみなす回復が全入力を戻します。

**$U_2$**：出力の $C=C_1C_2$ に $A,B_1$ を配置し、$D$ に $B_2$ を置くと

$$
|\Psi_{U_2}\rangle
=|\Phi_2\rangle_{MC_1}
|\Phi_2\rangle_{C_2E_1}
|\Phi_2\rangle_{DE_2}.
$$

$DE$ を捨てると $\rho_{MC}=|\Phi_2\rangle\langle\Phi_2|_{MC_1}\otimes I_{C_2}/2$。周辺は $\rho_M=I_M/2$、$\rho_C=(I_{C_1}/2)\otimes(I_{C_2}/2)=I_C/4$ です。$MC_1$ のBell相関が残るため $\rho_{MC}\ne I_M/2\otimes I_C/4$。完全回収条件が破れ、$DE$ だけの復号では未知の日記を戻せません。

**比較**：両者は $d_D=d_A=2$ で、[次元下界](#prop-bhi12-output-lower-bound)は満たします。異なるのは投入情報の行先です。$U_1$ は日記を新放射へ直送し、$U_2$ は内部へ閉じ込めます。従って次元条件は必要条件でしかなく、scramblingについての統計的仮定と追加放射のデカップリング評価が次講で必要です。
<!-- solution-end -->

## 10. まとめと次講

Hayden–Preskillの投入模型は、**新しい日記 $A$ と参照系 $M$、古いブラックホール $B$ と早期放射 $E$、発展後の残存系 $C$ と追加放射 $D$** を独立に定義することで、量子情報回収を検証可能な問いにします。

日記を投入する前、$M$ と $E$ は独立です。投入後に $C$ が $M$ からデカップリングすれば、受信者の $DE$ から全量子状態を完全回収でき、逆も成立します。完全回収なら追加放射には少なくとも $d_D\ge d_A$ が必要ですが、同じ出力次元でも発展のしかたによって成否は変わります。

**次講 BHI13「デカップリングと回収閾値」** では、有限次元ランダムユニタリに対する二次モーメント評価を使い、どの次元比なら残存系 $C$ と日記参照系 $M$ の相関が小さくなるかを定量化します。
