# QINF28 消失訂正と量子秘密分散

## 1. 誤りの位置が分かっていると、何が変わるか

[QINF26のKnill–Laflamme条件](../QINF26/index.md#thm-qinf26-kl)は未知の雑音を訂正できるか判定し、[QINF27のスタビライザー符号](../QINF27/index.md#def-qinf27-stabilizer)は誤りの検査方法を与えました。しかし通信路が「3番目の量子ビットを失った」と知らせる場合には、**どこが壊れたか**をsyndromeから推定する必要がありません。位置が分かる消失は、位置まで未知な誤りより扱いやすいのです。

一方、残った側から完全に復元できるなら、失われた側は元の論理状態を知っていてよいでしょうか。もしそこにも秘密が残るなら、復元後と失われた部分を使って量子状態を二つ得られるかもしれません。この問いは、消失訂正から**量子秘密分散**へつながります。

本講では有限次元の複素Hilbert空間だけを扱います。論理系を $L$、物理系を $A\otimes E$ と書き、$A$ は受信側が保持する部分、$E$ は消失した部分です。符号化は等長写像

$$
V:L\longrightarrow A\otimes E,\qquad V^\dagger V=I_L
$$

です。$|j\rangle$ は $L$ の正規直交基底、$|j_L\rangle=V|j\rangle$ は符号語とし、$P=VV^\dagger$ は符号空間への射影です。密度演算子、[部分トレース](../QINF3/index.md#def-qinf3-partial-trace)および[完全訂正](../QINF26/index.md#def-qinf26-exact-correction)は既習です。

## 2. 消失の位置は知らされるが、値は戻らない

位置 $E$ が既知の消失を、そこを固定状態 $|e\rangle$ に置き換えるチャネルで表します。$|e\rangle$ は元の内容ではなく、**ここが消失した**という受信者既知の記号です。出力空間は簡単のため同じ $A\otimes E$ に置きます。

<a id="def-qinf28-erasure"></a>

<!-- formal-statement-start -->
> **定義（消失チャネル）**
> 有限次元Hilbert空間 $A,E$、$E$ の単位ベクトル $|e\rangle$ に対し、部分系 $E$ の消失チャネルを

$$
\mathcal N_E(\sigma)=\operatorname{Tr}_E(\sigma)\otimes|e\rangle\langle e|
$$

> と定める。$E$ の正規直交基底 $\{|\mu\rangle\}$ を固定すれば、Kraus作用素は

$$
K_\mu=I_A\otimes|e\rangle\langle\mu|,\qquad
\sum_\mu K_\mu^\dagger K_\mu=I_{A\otimes E}
$$

> である。消失位置は入力と無関係に既知であり、入力状態に依存する測定結果としては扱わない。
<!-- formal-statement-end -->

最後の完全性は $K_\mu^\dagger K_\mu=I_A\otimes|\mu\rangle\langle\mu|$ を足したものです。従って[トレース保存Kraus条件](../QINF7/index.md#thm-qinf7-kraus-cptp)を満たすCPTPチャネルです。$E$ が消えた後に受信者が復元するとき、$|e\rangle$ は自分で用意できる既知の補助状態なので、実質的に $A$ だけからの復元を意味します。

<!-- definition-example-start: def-qinf28-erasure -->
**定義の確認**。$A,E$ がそれぞれ量子ビットで、$|\Phi\rangle=(|00\rangle+|11\rangle)/\sqrt2$ とします。[部分トレースの定義](../QINF3/index.md#def-qinf3-partial-trace)から

$$
\operatorname{Tr}_E|\Phi\rangle\langle\Phi|
=\tfrac12(|0\rangle\langle0|+|1\rangle\langle1|)
=I_A/2.
$$

よって $\mathcal N_E(|\Phi\rangle\langle\Phi|)=I_A/2\otimes|e\rangle\langle e|$。残る $A$ だけから「もともとBell状態だった」という外部の入力情報を推定することはできません。基底の二つのKraus作用素の積も $K_\mu^\dagger K_\nu=I_A\otimes|\mu\rangle\langle\nu|$ と直接検算できます。
<!-- definition-example-end -->

未知の一箇所誤りでは位置の異なる $X_1,X_2,\ldots$ の間の積も検査します。既知の $E$ の消失では、検査対象の積は **$E$ の上だけの全行列単位** $|\mu\rangle\langle\nu|$ です。この違いを次節で正確に表します。

## 3. 消失を訂正できることと、消えた側が何も知らないこと

[Knill–Laflamme条件](../QINF26/index.md#thm-qinf26-kl)に上のKraus作用素を代入すると、消失側 $E$ に局在する行列が符号上で恒等作用素の倍数にならなければなりません。これは単なる計算上の条件ではなく、**消失側の局所測定では論理入力を区別できない**ことを意味します。

<a id="thm-qinf28-erasure-privacy"></a>

<!-- formal-statement-start -->
> **定理（消失訂正と消失系の状態独立性）**
> 有限次元Hilbert空間 $L,A,E$、等長符号化 $V:L\to A\otimes E$ と、[消失チャネル](#def-qinf28-erasure) $\mathcal N_E$ を考える。次の三条件は同値である。
>
> **条件1（完全回復）**：あるCPTP回復が存在し、すべての論理密度演算子 $\rho$ に対して $\mathcal N_E(V\rho V^\dagger)$ から $V\rho V^\dagger$ を完全に復元できる。
>
> **条件2（符号語の縮約）**：ある $E$ 上の密度演算子 $\sigma_E$ が存在し、$L$ の任意の正規直交基底で定めた符号語について次が成り立つ。

$$
\operatorname{Tr}_A(|j_L\rangle\langle k_L|)
=\delta_{jk}\sigma_E\qquad\text{for all }j,k
$$

> **条件3（状態独立性）**：ある $E$ 上の密度演算子 $\sigma_E$ が存在し、すべての論理密度演算子 $\rho$ について次が成り立つ。

$$
\operatorname{Tr}_A(V\rho V^\dagger)=\sigma_E
$$

> ここで「完全復元」は論理重ね合わせと参照系とのもつれを含め、一つの入力非依存の回復写像による。
<!-- formal-statement-end -->

### 証明の見取り図

消失側の行列単位 $|\mu\rangle\langle\nu|$ に対する[Knill–Laflamme条件](../QINF26/index.md#def-qinf26-kl-matrix)の各成分を取ると、条件2がそのまま現れます。条件3は、入力の対角成分だけでなく非対角成分も消えることを要求する式です。逆に密度演算子から非対角成分を回収するには $|j\rangle\pm|k\rangle$ と $|j\rangle\pm i|k\rangle$ の重ね合わせを使います。

<!-- proof-start -->
### 証明

まず条件1と2を比較します。$E$ の基底を $\{|\mu\rangle\}$ とし、[消失チャネルのKraus作用素](#def-qinf28-erasure)を用いると

$$
K_\mu^\dagger K_\nu=I_A\otimes|\mu\rangle\langle\nu|.
$$

従って[Knill–Laflammeの必要十分条件](../QINF26/index.md#thm-qinf26-kl)は、各 $\mu,\nu$ について数 $c_{\mu\nu}$ が存在して

$$
P(I_A\otimes|\mu\rangle\langle\nu|)P=c_{\mu\nu}P
$$

となることです。左右を $|j_L\rangle,|k_L\rangle$ で挟むと

$$
\langle j_L|I_A\otimes|\mu\rangle\langle\nu|k_L\rangle
=c_{\mu\nu}\delta_{jk}.
$$

左辺は、$T_{kj}:=\operatorname{Tr}_A(|k_L\rangle\langle j_L|)$ と置くと

$$
\operatorname{Tr}\bigl(T_{kj}|\mu\rangle\langle\nu|\bigr)
=\langle\nu|T_{kj}|\mu\rangle
$$

です。すべての $\mu,\nu$ で成り立つので $T_{kj}=\delta_{jk}\sigma_E$ と表せます。対角 $j=k$ に対して $\sigma_E=\operatorname{Tr}_A|j_L\rangle\langle j_L|$ は正値・トレース1です。従って1と2は同値です。逆向きには $c_{\mu\nu}=\langle\nu|\sigma_E|\mu\rangle$ を採ればよく、回復の存在は同じKnill–Laflamme定理から従います。

次に2なら3を示します。任意の論理密度演算子 $\rho=\sum_{j,k}\rho_{jk}|j\rangle\langle k|$ に対し、線形性から

$$
\operatorname{Tr}_A(V\rho V^\dagger)
=\sum_{j,k}\rho_{jk}\delta_{jk}\sigma_E
=(\operatorname{Tr}\rho)\sigma_E=\sigma_E.
$$

逆に3を仮定します。$\rho=|j\rangle\langle j|$ を代入すればすべての対角縮約は $\sigma_E$。$j\ne k$ に対して $T=\operatorname{Tr}_A|j_L\rangle\langle k_L|$ と置き、正規化された二つの重ね合わせ

$$
|+\rangle=(|j\rangle+|k\rangle)/\sqrt2,\qquad
|+i\rangle=(|j\rangle+i|k\rangle)/\sqrt2
$$

を条件3へ代入します。両者の対角寄与は $\sigma_E$ なので、非対角寄与はそれぞれ

$$
T+T^\dagger=0,\qquad -iT+iT^\dagger=0
$$

でなければなりません。二式から $T=0$。従って2が成り立ちます。
<!-- proof-end -->

**注意。** $j=k$ の縮約がどれも同じ、という条件だけでは不十分です。非対角項 $\operatorname{Tr}_A|j_L\rangle\langle k_L|$ が残れば、$|j\rangle+|k\rangle$ の位相を消失側の測定で読み取れる場合があります。この定理は量子情報の「秘密」を古典的な基底ラベルの秘密より強く要求します。

**失敗例。** [3量子ビット反復符号](../QINF25/index.md#def-qinf25-bit-code)の $|0_L\rangle=|000\rangle$ と $|1_L\rangle=|111\rangle$ を考えます。第1量子ビットを $E$ とすると、$A$ は残り2量子ビットです。

$$
\operatorname{Tr}_A|0_L\rangle\langle0_L|
=|0\rangle\langle0|,\qquad
\operatorname{Tr}_A|1_L\rangle\langle1_L|
=|1\rangle\langle1|.
$$

消失側が論理基底を完全に識別できるため、消失は訂正できません。ビット反転を訂正する符号であることと、量子ビット丸ごとの消失を訂正することは別です。

## 4. 残した集合が復元でき、失った集合が秘密を守る

複数の物理部分系 $H_1,\ldots,H_n$ を「share（分配片）」と呼びます。集合 $S\subseteq\{1,\ldots,n\}$ に対応する物理空間を $H_S=\bigotimes_{i\in S}H_i$ とし、補集合を $S^c$ と書きます。誰がどのshareを持つかを集合で表します。

<a id="def-qinf28-access"></a>

<!-- formal-statement-start -->
> **定義（量子秘密分散の認可集合と非認可集合）**
> 有限次元論理系 $L$ を物理share $H_1\otimes\cdots\otimes H_n$ に等長符号化する写像 $V$ を固定する。
>
> - 集合 $S$ が**認可集合**であるとは、$H_S$ のみを入力とするCPTP復号写像 $\mathcal D_S$ があり、任意の論理密度演算子 $\rho$ に対し次が成立することをいう。

$$
\mathcal D_S(\operatorname{Tr}_{S^c}V\rho V^\dagger)=\rho.
$$

> - 集合 $T$ が**非認可集合（完全秘匿集合）**であるとは、ある固定密度演算子 $\sigma_T$ があり、任意の論理密度演算子 $\rho$ に対し次が成立することをいう。

$$
\operatorname{Tr}_{T^c}V\rho V^\dagger=\sigma_T.
$$
<!-- formal-statement-end -->

この定義は、shareが物理的に離れていても、認可集合の保持者は集まって一つの共同操作を実行できる、というモデルです。論理入力を測定して古典的な答えだけを当てることではなく、未知の重ね合わせそのものを戻します。

<!-- definition-example-start: def-qinf28-access -->
**定義の確認**。二つのshareへ $V|j\rangle=|j\rangle_A|0\rangle_E$ と符号化すると、$A$ は $\mathcal D_A(\tau)=\tau$ で認可、$E$ はどの入力でも $|0\rangle\langle0|$ なので非認可です。[部分トレースの積への作用](../QINF3/index.md#prop-qinf3-state-product)により両主張を直接確認できます。一方、逆のshare配置では役割も逆転します。
<!-- definition-example-end -->

ここで[消失訂正と秘密保持の定理](#thm-qinf28-erasure-privacy)を $A=H_S,E=H_{S^c}$ に適用すると、等長符号化に対して次が得られます。

$$
S\text{ は認可集合}\quad\Longleftrightarrow\quad
S^c\text{ は非認可集合}.
$$

回復が物理符号語を返す形と論理状態を返す形は等価です。前者の出力に $V^\dagger$ を作用させれば後者になり、後者の出力を再符号化すれば前者になります。符号空間外への動作は固定状態を返すように拡張すればCPTPにできます。

<a id="def-qinf28-threshold"></a>

<!-- formal-statement-start -->
> **定義（完全しきい値量子秘密分散とramp分散）**
> $n$ 個のshareへの等長符号化において、整数 $1\le k\le n$ に対し、$|S|\ge k$ のすべての集合が認可集合、$|T|<k$ のすべての集合が非認可集合なら、**完全な $(k,n)$ しきい値量子秘密分散**という。
>
> 一方、整数 $0\le t<r\le n$ に対し、$|T|\le t$ の全集合が非認可、$|S|\ge r$ の全集合が認可だが、その間の集合に情報が一部残ってもよい方式を **$(t,r;n)$ ramp分散**という。
<!-- formal-statement-end -->

しきい値方式では「$k$ 個あれば復元」「$k-1$ 個以下は完全に無情報」の**両方**が必要です。ramp分散の中間サイズは、認可とも非認可とも限りません。等長符号化での完全な秘密分散では、補集合の対応により認可数と非認可数が連動します。

<!-- definition-example-start: def-qinf28-threshold -->
**定義の確認**。3 shareの場合、「任意の2 shareで復号し、任意の1 shareが入力から独立」なら $(2,3)$ です。これに対して「4 shareの任意の3つから復号し、どの1つも無情報」だけなら $(1,3;4)$ のramp条件です。2 shareの秘密保持を確認せず $(3,4)$ しきい値とはいえません。次節で後者の具体例を構成します。
<!-- definition-example-end -->

また二つの認可集合が互いに素であることは、非自明な未知量子状態の[複製不能定理](../QINF12/index.md#thm-qinf12-pure-no-cloning)に反します。それぞれの保持者が局所復号すれば、同じ入力から二つの完全な状態を得るからです。従って $(k,n)$ 方式が論理次元2以上を符号化するなら

$$
2k>n
$$

が必要です。これはあくまで必要条件であり、存在を保証しません。

## 5. 4量子ビットなら一つを失っても直せるが、しきい値とは限らない

次の符号は2次元の論理系を4量子ビットへ写します。QINF27で扱った検査の言葉では $XXXX,Z_1Z_2,Z_3Z_4$ をスタビライザー生成元とする符号です。

$$
|0_L\rangle=\frac{|0000\rangle+|1111\rangle}{\sqrt2},
\qquad
|1_L\rangle=\frac{|0011\rangle+|1100\rangle}{\sqrt2}.
$$

二つは正規直交します。任意の論理状態 $\alpha|0\rangle+\beta|1\rangle$ を同じ線形写像で符号化します。

<a id="prop-qinf28-four-qubit"></a>

<!-- formal-statement-start -->
> **命題（4量子ビットの単一消失訂正符号）**
> 上の二符号語が張る符号は、4箇所のどれを指定して消失させても完全訂正可能である。さらに1 shareはすべての論理入力に対し $I_2/2$ に縮約する。一方、2 shareのうち集合 $\{1,3\}$ は論理基底を区別できるため、この符号は完全な $(3,4)$ しきい値秘密分散ではない。
<!-- formal-statement-end -->

### 証明の見取り図

ある一箇所を取り出すと、各符号語のその箇所は0と1を等確率で取り、残る三箇所のベクトルは互いに直交します。さらに二つの符号語の間でも、残る三箇所が一致しないので交差項は消えます。逆に2箇所では、その直交性が必ずしも保たれません。

<!-- proof-start -->
### 証明

符号語の各2項は、**任意の一箇所**で0と1を一度ずつ取ります。残る3桁はそれぞれ異なるので

$$
\operatorname{Tr}_{\text{残り3箇所}}|j_L\rangle\langle j_L|
=I_2/2\qquad(j=0,1).
$$

交差項では $|0_L\rangle$ に現れる4ビット列 $0000,1111$ と、$|1_L\rangle$ に現れる $0011,1100$ を比べます。どの組も4桁のうちちょうど2桁が異なるので、1箇所だけを消して残る3桁が完全一致することはありません。よって

$$
\operatorname{Tr}_{\text{残り3箇所}}|0_L\rangle\langle1_L|=0.
$$

各一箇所を $E$ とすれば[消失訂正と状態独立性](#thm-qinf28-erasure-privacy)を満たすため、残り3箇所から完全回復できます。スタビライザー表示でも[符号射影の次元式](../QINF27/index.md#thm-qinf27-dimension)により、独立な3生成元が2次元の符号を定めると分かります。

一方、share 1と3だけを保持し、他の二つをトレースすると

$$
\begin{aligned}
\rho_{13}^{(0)}&=\tfrac12(|00\rangle\langle00|+|11\rangle\langle11|),\\
\rho_{13}^{(1)}&=\tfrac12(|01\rangle\langle01|+|10\rangle\langle10|).
\end{aligned}
$$

例えば $Z_1Z_3$ を測ると前者は固有値 $+1$、後者は $-1$ になり、論理基底情報が漏れています。従って2 shareはすべて非認可という $(3,4)$ の条件を満たしません。
<!-- proof-end -->

この符号は、1 share以下を秘密にして3 share以上で復元できる $(1,3;4)$ ramp分散として使えます。2 shareを持つ者が元の未知状態を完全復元できるとは限りませんが、論理状態について**部分的な情報**を得る場合があります。

## 6. 3つのqutritから、どの2つでも完全に復元する

今度は各shareを2次元の量子ビットではなく、3次元の **qutrit** とします。各基底は $|0\rangle,|1\rangle,|2\rangle$、添字演算は断りがなければ $\mathbb Z_3$（3で割った余り）です。$2$ には逆元 $2$ があり、$2\cdot2=1\pmod3$ です。この単純な事実が復号写像を可逆にします。

論理系も3次元とし、次の線形写像で符号化します。

$$
V|j\rangle=\frac1{\sqrt3}\sum_{i=0}^2
|i\rangle_A\,|i+j\rangle_B\,|i+2j\rangle_C,
\qquad j=0,1,2.
$$

例えば、3本の列を具体的に展開すると

$$
\begin{aligned}
|0_L\rangle&=(|000\rangle+|111\rangle+|222\rangle)/\sqrt3,\\
|1_L\rangle&=(|012\rangle+|120\rangle+|201\rangle)/\sqrt3,\\
|2_L\rangle&=(|021\rangle+|102\rangle+|210\rangle)/\sqrt3.
\end{aligned}
$$

9個の3桁列はすべて異なるため、これらは互いに直交し、各ノルムは1です。

<a id="thm-qinf28-qutrit"></a>

<!-- formal-statement-start -->
> **定理（3-qutritによる(2,3)完全しきい値秘密分散）**
> 上の等長符号化 $V:\mathbb C^3\to(\mathbb C^3)^{\otimes3}$ は、任意の一shareの縮約がすべての論理密度演算子に対して $I_3/3$ となり、任意の二shareから一つの固定ユニタリ復号と不要な補助系の廃棄により元の論理状態を完全復元できる。従って完全な $(2,3)$ しきい値量子秘密分散である。
<!-- formal-statement-end -->

### 証明の見取り図

1 shareの行列要素を調べるには、残る2 shareの基底ラベルが一致する項だけが部分トレース後に残ることを使います。2 shareの復号では、持っている二つのラベルから論理添字 $j$ と消えた側のラベル $t$ を**一意に**計算し、可逆な基底置換を作ります。

<!-- proof-start -->
### 証明

**(i) 一shareの完全秘匿。** Aを残してBCをトレースします。二つの項のBCラベルが等しい条件は

$$
i+j=i'+k,\qquad i+2j=i'+2k\pmod3.
$$

二式を引くと $j=k$、その後 $i=i'$ です。従って

$$
\operatorname{Tr}_{BC}|j_L\rangle\langle k_L|
=\delta_{jk}\frac13\sum_{i=0}^2|i\rangle\langle i|
=\delta_{jk}I_3/3.
$$

Bを残す場合、ACラベルが一致するのは $i=i'$ かつ $i+2j=i'+2k$ のときです。$2$ が可逆なので $j=k$。Cを残す場合、ABラベルの一致から $i=i'$、$i+j=i'+k$、従って $j=k$。対角の場合の残ったラベル $i+j$ または $i+2j$ はそれぞれ $\mathbb Z_3$ を一周するため、どちらも $I_3/3$ です。以上が三箇所すべての完全秘匿です。

**(ii) 二shareの復号。** ABを保持しCを失った場合、保持基底 $|a,b\rangle_{AB}$ から

$$
j=b-a,\qquad t=2b-a\pmod3
$$

を計算できます。逆変換は $a=t-2j,\ b=t-j$ です。従って

$$
U_{AB}|a,b\rangle=|b-a\rangle_L|2b-a\rangle_G
$$

は9個の正規直交基底を互いに異なる9個へ写すためユニタリです。元の符号語へ作用させると

$$
(U_{AB}\otimes I_C)|j_L\rangle
=|j\rangle_L\otimes\frac1{\sqrt3}\sum_{t=0}^2|t\rangle_G|t\rangle_C.
$$

右辺の補助系 $GC$ は $j$ と無関係です。任意の重ね合わせ $\sum_j\alpha_j|j\rangle$ にも同じ式が線形に成り立ち、Cを失った後でも、ABで $U_{AB}$ を行いGを捨てれば論理状態 $\rho$ が戻ります。

ACを保持する場合、$|a,c\rangle$ から $j=2(c-a)$、失ったBのラベル $t=2c-a$ を求めるので

$$
U_{AC}|a,c\rangle=|2(c-a)\rangle_L|2c-a\rangle_G.
$$

BCを保持する場合は $|b,c\rangle$ から $j=c-b$、失ったAのラベル $t=2b-c$ を求め、

$$
U_{BC}|b,c\rangle=|c-b\rangle_L|2b-c\rangle_G.
$$

いずれもラベルの逆変換が存在する基底置換で、同じく「論理状態 $\otimes$ 固定補助状態」となるので、任意の二shareで復元できます。これで[しきい値の定義](#def-qinf28-threshold)の両側を満たします。
<!-- proof-end -->

この例では**1 shareは単に論理基底ラベルを隠すのではなく、重ね合わせの位相も隠します**。一方、二shareを合わせると位相ごと復元できます。2と3という人数の条件だけを見ると古典秘密分散に似ていますが、要求しているのは密度行列全体と未知の量子重ね合わせの保存です。

## 7. 何個まで失えるか：消失版量子Singleton界

消失訂正が完全なら、失われた部分には秘密がありません。これと[von Neumannエントロピー](../QINF17/index.md#def-qinf17-entropy)を組み合わせると、符号化効率に上限が生まれます。

以下では全物理shareが同じ次元 $q\ge2$ のqudit（$q$ 次元の量子系）で、$q^k$ 次元の論理系を $n$ shareへ等長符号化するとします。任意の $t$ share消失が訂正可能であるという主張は、**どの $t$ 箇所を選んでも**その箇所が非認可である、という意味です。

<a id="thm-qinf28-singleton"></a>

<!-- formal-statement-start -->
> **定理（消失訂正の量子Singleton界）**
> $q\ge2$、整数 $n\ge1,k\ge1,t\ge0$ とする。$q^k$ 次元の論理系から $n$ 個の $q$ 次元物理系への等長符号化が、位置の分かる任意の $t$ shareの消失を完全訂正できるなら

$$
k+2t\le n
$$

> が必要である。
<!-- formal-statement-end -->

### 証明の見取り図

論理系 $L$ と同じ次元の参照系 $R$ を最大限にもつれさせて符号化します。二つの互いに素な消失集合 $E_1,E_2$ は、どちらも $R$ と無相関です。全体の純粋性と[エントロピーの劣加法性](../QINF18/index.md#thm-qinf18-subadditivity)を使い、残り $M$ が少なくとも $k$ 個のqudit分の情報容量を持たなければならないと示します。

<!-- proof-start -->
### 証明

まず $2t>n$ なら、サイズ $n-t$ の認可集合を互いに素な二つとして選べます（$n-t\le n/2$ のため）。論理次元が $q^k\ge2$ なので、これは[複製不能定理](../QINF12/index.md#thm-qinf12-pure-no-cloning)に反します。従って訂正可能な場合は $2t\le n$ です。

互いに素なサイズ $t$ の集合 $E_1,E_2$ を選び、残る $n-2t$ 個のshareを $M$ と書きます。$R\cong L$ とし、$R L$ 上の最大もつれ状態

$$
|\Phi\rangle_{RL}=q^{-k/2}\sum_{j=1}^{q^k}|j\rangle_R|j\rangle_L
$$

の $L$ に符号化 $V$ を施した純粋状態を $|\Psi\rangle_{R E_1 E_2 M}$ とします。$S(R)=\log_2(q^k)=k\log_2q$ です。

[消失訂正と状態独立性](#thm-qinf28-erasure-privacy)は各 $E_i$ に対して符号化された任意の行列成分の縮約を与えるので、参照系との縮約は

$$
\rho_{RE_1}=\rho_R\otimes\rho_{E_1},
\qquad
\rho_{RE_2}=\rho_R\otimes\rho_{E_2}
$$

です。これを[テンソル積のエントロピー加法性](../QINF17/index.md#prop-qinf17-tensor)へ代入すると

$$
S(RE_1)=S(R)+S(E_1),\qquad
S(RE_2)=S(R)+S(E_2).
$$

全体 $RE_1E_2M$ が純粋なので[相補系のエントロピーの一致](../QINF17/index.md#prop-qinf17-bipartite)を二つの分割へ適用して

$$
S(RE_1)=S(E_2M),\qquad
S(RE_2)=S(E_1M)
$$

となります。一方、[劣加法性](../QINF18/index.md#thm-qinf18-subadditivity)を右辺にそれぞれ適用すると

$$
\begin{aligned}
S(R)+S(E_1)&\le S(E_2)+S(M),\\
S(R)+S(E_2)&\le S(E_1)+S(M).
\end{aligned}
$$

二式を足し、$S(E_1)+S(E_2)$ を相殺すると $S(R)\le S(M)$。ここで[エントロピーの次元上界](../QINF17/index.md#thm-qinf17-entropy-bounds)より

$$
k\log_2q=S(R)\le S(M)
\le\log_2\dim H_M=(n-2t)\log_2q.
$$

$\log_2q>0$ で割れば $k+2t\le n$ です。
<!-- proof-end -->

3-qutrit符号は $(n,k,t)=(3,1,1)$ なので $1+2=3$ と等号を達成します。4量子ビット符号は $(4,1,1)$ なので $1+2<4$ です。Singleton界は必要条件にすぎず、等号を満たすパラメータで符号が常に存在するとは主張しません。

## 8. 演習：消えた側の行列から秘密を判定する

<a id="ex-qinf28-a01"></a>

### 演習 A1：消失Kraus作用素を直接計算する

- Level: A
- 問題: $A,E$ を量子ビットとし、消失後の状態を $|0\rangle_E$ に固定する。$K_0,K_1$ を書いて $\sum_\mu K_\mu^\dagger K_\mu=I$ を確認せよ。入力 $\rho=|1\rangle\langle1|_A\otimes|+\rangle\langle+|_E$（$|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$）に対する出力を求めよ。

<!-- solution-start -->
**詳細解答。** [消失チャネル](#def-qinf28-erasure)により

$$
K_0=I_A\otimes|0\rangle\langle0|,\qquad
K_1=I_A\otimes|0\rangle\langle1|.
$$

積は $K_0^\dagger K_0=I_A\otimes|0\rangle\langle0|$ と $K_1^\dagger K_1=I_A\otimes|1\rangle\langle1|$ で、和は $I_A\otimes I_E$。入力は積状態なので[部分トレースの状態保存性と積への作用](../QINF3/index.md#prop-qinf3-state-product)により $\operatorname{Tr}_E\rho=|1\rangle\langle1|$。従って

$$
\mathcal N_E(\rho)
=|1\rangle\langle1|_A\otimes|0\rangle\langle0|_E.
$$

元の $|+\rangle$ の位相を保持しているわけではありません。トレース保存はKraus完全性から分かります。
<!-- solution-end -->

<a id="ex-qinf28-a02"></a>

### 演習 A2：反復符号は消失を訂正できるか

- Level: A
- 問題: $|0_L\rangle=|000\rangle,|1_L\rangle=|111\rangle$ の第2量子ビットを失う。消失側の二つの対角縮約と交差縮約を求め、完全消失訂正の可否を判定せよ。

<!-- solution-start -->
**詳細解答。** Aを第1・第3量子ビット、Eを第2量子ビットとすると

$$
\begin{aligned}
\operatorname{Tr}_A|0_L\rangle\langle0_L|&=|0\rangle\langle0|,\\
\operatorname{Tr}_A|1_L\rangle\langle1_L|&=|1\rangle\langle1|,\\
\operatorname{Tr}_A|0_L\rangle\langle1_L|&=0.
\end{aligned}
$$

交差項が0なのは、A側の $|00\rangle$ と $|11\rangle$ が直交するためです。しかし対角縮約二つが異なり、同一の $\sigma_E$ にできません。[消失訂正判定](#thm-qinf28-erasure-privacy)より訂正不能です。実際、消失側の $Z$ 測定は論理基底0,1を完全識別します。
<!-- solution-end -->

<a id="ex-qinf28-a03"></a>

### 演習 A3：4量子ビット符号で第1箇所を失う

- Level: A
- 問題: [4量子ビット符号](#prop-qinf28-four-qubit)について、Eを第1量子ビットとして $\operatorname{Tr}_{234}|0_L\rangle\langle0_L|$、$\operatorname{Tr}_{234}|1_L\rangle\langle1_L|$、$\operatorname{Tr}_{234}|0_L\rangle\langle1_L|$ を直接計算せよ。

<!-- solution-start -->
**詳細解答。** 第1量子ビットと残りを分けると

$$
\begin{aligned}
|0_L\rangle&=(|0\rangle|000\rangle+|1\rangle|111\rangle)/\sqrt2,\\
|1_L\rangle&=(|0\rangle|011\rangle+|1\rangle|100\rangle)/\sqrt2.
\end{aligned}
$$

各符号語の残り3桁はそれぞれ直交し、対角縮約は両方とも $I_2/2$。異なる符号語の残り3桁の四組 $(000,011),(000,100),(111,011),(111,100)$ はすべて異なるため交差縮約は0です。[必要十分条件](#thm-qinf28-erasure-privacy)の $j,k=0,1$ の四組を満たし、第1箇所の消失は完全訂正できます。
<!-- solution-end -->

<a id="ex-qinf28-a04"></a>

### 演習 A4：3-qutrit符号の正規直交性

- Level: A
- 問題: $|j_L\rangle=3^{-1/2}\sum_i|i,i+j,i+2j\rangle$（添字はmod 3）について、$\langle k_L|j_L\rangle=\delta_{jk}$ を添字の合同式から示し、$j=2$ の三つの項を列挙せよ。

<!-- solution-start -->
**詳細解答。** 二つの3桁基底が一致するには第1桁から $i=i'$、第2桁から $i+j=i'+k$、よって $j=k$ が必要です。逆に $j=k$ なら同じ $i$ の三項だけが内積に寄与します。従って

$$
\langle k_L|j_L\rangle
=\frac13\sum_{i,i'=0}^2
\delta_{ii'}\delta_{i+j,i'+k}\delta_{i+2j,i'+2k}
=\delta_{jk}.
$$

$j=2$ のとき $i=0,1,2$ から順に $|021\rangle,|102\rangle,|210\rangle$ が得られ、すべて異なる基底なのでノルムは $3\cdot(1/3)=1$ です。
<!-- solution-end -->

<a id="ex-qinf28-b01"></a>

### 演習 B1：対角縮約だけでは位相が漏れる

- Level: B
- 問題: 二量子ビットの符号 $|0_L\rangle=(|00\rangle+|11\rangle)/\sqrt2$、$|1_L\rangle=(|00\rangle-|11\rangle)/\sqrt2$ を考える。第2量子ビットをEとする。(a) 両符号語の対角縮約が等しいこと、(b) 交差縮約が0ではないことを示し、(c) 論理 $|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$ と $|-\rangle=(|0\rangle-|1\rangle)/\sqrt2$ の消失側が何を区別するか求めよ。

<!-- solution-start -->
**詳細解答。** (a) いずれも第1量子ビットAの $|0\rangle,|1\rangle$ が直交するため、Eの縮約は

$$
\operatorname{Tr}_A|0_L\rangle\langle0_L|
=\operatorname{Tr}_A|1_L\rangle\langle1_L|=I_2/2.
$$

(b) 交差縮約を四項で展開し、Aの内積が0となる異なる基底の項を消すと

$$
\operatorname{Tr}_A|0_L\rangle\langle1_L|
=\tfrac12(|0\rangle\langle0|-|1\rangle\langle1|)=Z_E/2\ne0.
$$

(c) 論理 $|+\rangle$ の符号化は

$$
\frac{|0_L\rangle+|1_L\rangle}{\sqrt2}=|00\rangle,
$$

論理 $|-\rangle$ は同様に $|11\rangle$ です。従ってEはそれぞれ $|0\rangle\langle0|$ と $|1\rangle\langle1|$ になり、両者を完全に区別します。**基底情報が隠れていても位相情報が漏れる**ので、[判定条件](#thm-qinf28-erasure-privacy)の非対角項が必須です。
<!-- solution-end -->

<a id="ex-qinf28-b02"></a>

### 演習 B2：4量子ビットの二shareへの漏洩

- Level: B
- 問題: [4量子ビット符号](#prop-qinf28-four-qubit)について、share 1と3を持つ者が $|0_L\rangle,|1_L\rangle$ を完全に見分ける測定を作れ。なぜこの符号を $(3,4)$ 完全しきい値と呼べないか説明せよ。また任意の3 shareは認可されることを示せ。

<!-- solution-start -->
**詳細解答。** $|0_L\rangle$ の1,3箇所は $00,11$、$|1_L\rangle$ の1,3箇所は $01,10$ のみです。残る2,4箇所の基底項は互いに直交するため、縮約は

$$
\rho_{13}^{(0)}=\tfrac12(|00\rangle\langle00|+|11\rangle\langle11|),\quad
\rho_{13}^{(1)}=\tfrac12(|01\rangle\langle01|+|10\rangle\langle10|).
$$

二値測定 $\{(I+Z_1Z_3)/2,(I-Z_1Z_3)/2\}$ はそれぞれの状態を確率1で別の結果へ送ります。$(3,4)$ 完全しきい値なら全ての2 shareが**入力から独立**でなければならないため、これは反例です。一方、どの1 shareも固定状態 $I_2/2$ であることが[4量子ビット命題](#prop-qinf28-four-qubit)から分かり、その補集合である任意の3 shareは[認可・非認可の双対性](#thm-qinf28-erasure-privacy)によって完全復号可能です。
<!-- solution-end -->

<a id="ex-qinf28-b03"></a>

### 演習 B3：二share復号を基底の逆変換で確認する

- Level: B
- 問題: [3-qutrit符号](#thm-qinf28-qutrit)で、(a) ACから論理添字 $j$ と消えたBの添字 $t$ を回復する写像が全単射であること、(b) BCの場合も同様であることを、逆変換まで書いて確かめよ。

<!-- solution-start -->
**詳細解答。** (a) 元のラベルは $(a,c)=(i,i+2j)$ です。$2$ の逆元も2なので、$j=2(c-a)$、Bのラベル $t=i+j=2c-a$。復号で得た $(j,t)$ からは

$$
a=t-j,\qquad c=t+j\pmod3
$$

となります。確かに $2(c-a)=2(2j)=j$、$2c-a=2(t+j)-(t-j)=t+3j=t$ です。従って $U_{AC}|a,c\rangle=|j,t\rangle$ は基底の全単射です。

(b) $(b,c)=(i+j,i+2j)$ なら $j=c-b$、失ったAは $t=i=2b-c$。逆に

$$
b=t+j,\qquad c=t+2j\pmod3.
$$

これで二つの入力基底と二つの出力基底の対応は一対一です。いずれも[復号定理の証明](#thm-qinf28-qutrit)と同じく、符号語を $|j\rangle_L\otimes3^{-1/2}\sum_t|t\rangle_G|t\rangle_{\text{消失系}}$ に写すので、消失後の論理状態を復元できます。
<!-- solution-end -->

<a id="ex-qinf28-b04"></a>

### 演習 B4：純粋な完全しきい値の人数は奇数になる

- Level: B
- 問題: 論理次元が2以上で、$n$ shareへの**等長**符号化が完全な $(k,n)$ しきい値秘密分散を実現すると仮定する。[認可集合と補集合の対応](#thm-qinf28-erasure-privacy)から $2k=n+1$ を証明せよ。混合補助情報を外へ捨てる一般の符号化まで、この結論を無条件に広げてよいか。

<!-- solution-start -->
**詳細解答。** $k$ shareの集合 $S$ は認可であるため、その補集合 $S^c$（$n-k$ share）は非認可です。完全しきい値の定義では $k$ 個以上の集合は必ず認可で、両者に属することは論理次元2以上ではできません。従って $n-k<k$、すなわち $2k>n$ です。

一方、$k-1$ shareの集合 $T$ は非認可なので、その補集合 $T^c$（$n-k+1$ share）は認可です。$k$ 個未満は非認可という定義から $n-k+1\ge k$、すなわち $2k\le n+1$ です。整数 $2k$ は $n<2k\le n+1$ を満たすので

$$
2k=n+1.
$$

従って $n$ は奇数で $k=(n+1)/2$。ここでは**全物理shareだけを純粋に等長符号化する**ことが本質的です。外部へ環境を捨てる混合符号化では「認可と補集合の非認可」の逆方向をそのまま使えず、同じ導出を無条件に適用できません。
<!-- solution-end -->

<a id="ex-qinf28-c01"></a>

### 演習 C1：Singleton界に等号を達成する4量子ビット符号

- Level: C
- 問題: $n=4$ の量子ビットで、可換な生成元 $g_X=X_1X_2X_3X_4$、$g_Z=Z_1Z_2Z_3Z_4$ の共通 $+1$ 固有空間を考える。$P$ をこの空間への直交射影として、次を示せ。
  - (a) 符号次元を求め、論理2量子ビットの正規直交符号基底を4つ作れ。
  - (b) 任意の1量子ビット上のPauli作用素 $E\in\{X_j,Y_j,Z_j\}$ に対し $PEP=0$ を示し、1 share消失を完全訂正できると証明せよ。
  - (c) $(n,k,t)=(4,2,1)$ が[量子Singleton界](#thm-qinf28-singleton)に等号を達成することを確かめ、完全な $(3,4)$ しきい値方式でない理由を2 shareの縮約状態で示せ。

<!-- solution-start -->
**詳細解答。** (a) 各生成元はHermitianで二乗が $I$、$X_jZ_j=-Z_jX_j$ の反可換が4箇所で起きるので $g_Xg_Z=(-1)^4g_Zg_X=g_Zg_X$。独立で $-I$ を生成しないため[スタビライザー次元定理](../QINF27/index.md#thm-qinf27-dimension)から

$$
\dim\mathcal C=2^{4-2}=4.
$$

$g_Z=+1$ となる偶数個の1を持つ4ビット列から、互いの全ビット反転で対応する組を選び、

$$
\begin{aligned}
|00_L\rangle&=(|0000\rangle+|1111\rangle)/\sqrt2,\\
|01_L\rangle&=(|0011\rangle+|1100\rangle)/\sqrt2,\\
|10_L\rangle&=(|0101\rangle+|1010\rangle)/\sqrt2,\\
|11_L\rangle&=(|0110\rangle+|1001\rangle)/\sqrt2
\end{aligned}
$$

とします。各組で $g_X$ は二つの項を交換するので固有値+1、$g_Z$ は偶数パリティなので固有値+1です。8個の計算基底列が互いに異なるため、4符号語は正規直交します。

(b) $X_j$ は $g_Z$ と反可換、$Z_j$ は $g_X$ と反可換、$Y_j=iX_jZ_j$ は両方と反可換です。いずれも少なくとも一つの生成元 $g$ と反可換です。[共通固有空間への射影](../QINF27/index.md#thm-qinf27-dimension)では $gP=Pg=P$ なので

$$
PEP=PgEP=-PEgP=-PEP.
$$

よって $PEP=0$。任意の一量子ビット作用素は $\{I,X,Y,Z\}$ の複素線形結合なので、一箇所 $j$ に局在する任意の作用素 $O_j$ に対して $PO_jP=c(O_j)P$ となります。特に[消失Kraus積](#def-qinf28-erasure)の行列単位はこの形です。[Knill–Laflamme必要十分条件](../QINF26/index.md#thm-qinf26-kl)より、任意の1 share消失は完全訂正可能です。

(c) 2論理量子ビットを4物理量子ビットへ符号化し1箇所を訂正するので $k+2t=2+2=4=n$。一方、share 1,2だけを保持すると、論理基底 $|00_L\rangle$ と $|10_L\rangle$ の縮約は

$$
\begin{aligned}
\rho_{12}^{(00)}&=\tfrac12(|00\rangle\langle00|+|11\rangle\langle11|),\\
\rho_{12}^{(10)}&=\tfrac12(|01\rangle\langle01|+|10\rangle\langle10|).
\end{aligned}
$$

前者の $Z_1Z_2$ 測定値は+1、後者は-1なので2 shareは完全秘匿ではありません。従って単一消失訂正が可能でも $(3,4)$ 完全しきい値にはなりません。これは「消失訂正」「符号効率」「秘密分散のしきい値」を混同しない例です。
<!-- solution-end -->

## 9. 次へ：環境と参照系を同時に見たら

消失場所が既知の場合は、そこへ局在するすべての作用素を[Knill–Laflamme条件](../QINF26/index.md#thm-qinf26-kl)に代入でき、消失系の状態独立性と完全訂正が同値になりました。3-qutritの例では「秘密が漏れていないこと」と「残りから復元できること」を実際の基底置換で確認しました。

次講QINF29では、消失位置だけに限らず、一般の雑音で環境と**入力に付けた参照系**がどう相関するかを考えます。完全回復の条件を環境側から見直すための道具が、デカップリングです。
