# BHI33 回復写像と情報への操作的アクセス

## 1. islandに情報があることと、実際に読み出すこと

[BHI32の放射island wedge](../BHI32/index.md#def-bhi32-radiation-wedge)では、選択済みのQESから放射に対応する有効領域を作り、幾何学的な包含と演算子再構成を区別しました。後者には[HOLO29の消失回復](../../HOLO/HOLO29/index.md#def-holo29-region-recovery)や[HOLO30の論理代数再構成](../../HOLO/HOLO30/index.md#def-holo30-algebra-reconstruction)の条件が必要です。

次に知りたいのは、**放射を実際に手元へ集めた観測者が、未知の量子状態を取り戻す操作を指定できるか**です。[BHI13のHayden–Preskill回収閾値](../BHI13/index.md#thm-bhi13-recovery-threshold)はデカップリングから回復器の存在を評価しますが、それだけでは個別の復号回路を指定しません。[QINF30のPetz型回復](../../../応用系/QINF/QINF30/index.md#def-qinf30-petz)は、指定したチャネルと基準状態から候補の回復写像を組み立てます。

本講では重力の一般公式を新しく証明するのでなく、**古い放射が復号の鍵を担い、新たな放射が暗号化された日記を担う模型**を作ります。どちらを観測者が利用できるかによって、同じ量子状態の回復可能性が変わることを全計算で示します。

計算は有限次元で、論理日記 $L$ は1量子ビット、自然対数の情報量を使います。物理系を独立したテンソル因子とするのは玩具模型の仮定です。実際の重力でこの因数分解が成立するという主張ではなく、[BHI15の制約](../BHI15/index.md#prop-bhi15-factorization-obstruction)と区別します。

## 2. 何を回収したと言えるか

観測者が利用できる放射部分系を $R_{\rm acc}$、触れられない残存自由度を $E$、論理状態を $\rho_L$ とします。この三つのHilbert空間は有限次元とします。

入力を符号化する写像 $V:L\to R_{\rm acc}\otimes E$ は等長、すなわち $V^\dagger V=I_L$ を満たします。これはすべての入力ベクトルの内積を保つ条件です。

$\mathcal B(H)$ はHilbert空間 $H$ 上の線形作用素全体を表します。$\operatorname{Tr}_E$ は残存系 $E$ の部分トレースで、放射側に残る状態を取り出します。これらは[HOLO29の消失回復](../../HOLO/HOLO29/index.md#def-holo29-region-recovery)と同じ設定です。

量子チャネルは、密度行列を密度行列へ写し、参照系を付けても正性を保つ完全正値・トレース保存（CPTP）写像です。

<a id="def-bhi33-operational-access"></a>

<!-- formal-statement-start -->
> **定義（放射への操作的アクセス）**  
> 有限次元Hilbert空間 $L,R_{\rm acc},E$ と等長写像 $V:L\to R_{\rm acc}\otimes E$ を固定する。観測者の保持チャネルを
>
$$
\mathcal N_{\rm acc}(\rho)
=\operatorname{Tr}_E(V\rho V^\dagger)
$$
>
> と定める。放射のみへ作用する、一つのCPTP写像 $\mathcal D:\mathcal B(R_{\rm acc})\to\mathcal B(L)$ が存在し、すべての論理密度行列 $\rho$ について
>
$$
(\mathcal D\circ\mathcal N_{\rm acc})(\rho)=\rho
$$
>
> が成立するとき、観測者は $L$ に**完全な操作的アクセス**を持つという。$\mathcal D$ は未知の入力 $\rho$ に依存させない。近似回復を論じるときは参照系とのもつれを含む忠実度と、写像の実装費用を別に指定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi33-operational-access -->
**定義の確認**（最小例）：$L=R_{\rm acc}=E=\mathbb C^2$ とし、$V|j\rangle=|j\rangle_R|0\rangle_E$（$j=0,1$）と置きます。像の内積は $\langle Vj|Vk\rangle=\langle j|k\rangle$ なので $V^\dagger V=I_L$ です。定義中の保持チャネルを確認するには、論理行列単位 $|j\rangle\langle k|$ の像を展開します。

$$
V|j\rangle\langle k|V^\dagger
=|j\rangle\langle k|_R\otimes|0\rangle\langle0|_E
$$

この積状態の $E$ 側はトレースが1なので、

$$
\operatorname{Tr}_E(V|j\rangle\langle k|V^\dagger)
=|j\rangle\langle k|_R
$$

従って $\rho=\sum_{j,k}\rho_{jk}|j\rangle\langle k|$ の任意の係数について同じ式を線形に適用でき、$\mathcal N_{\rm acc}(\rho)=\rho_R$ です。基底を同一視した恒等チャネルはCPTPで、入力を知らずに全状態を復号するので、定義の各条件を満たします。

対して $V|j\rangle=|0\rangle_R|j\rangle_E$ なら保持状態は常に $|0\rangle\langle0|_R$ です。$|0\rangle_L$ と $|1\rangle_L$ の二つを同じ出力から一つの復号写像で区別できず、完全な操作的アクセスはありません。これは[BHI32の情報移送符号](../BHI32/index.md#def-bhi32-transfer-code)の早期・後期を復号チャネルとして読んだ例です。
<!-- definition-example-end -->

参照系 $Q\simeq L$ を用意し、$|\Phi_2\rangle_{LQ}=(|00\rangle+|11\rangle)/\sqrt2$ とします。[QINF30のエンタングルメント忠実度](../../../応用系/QINF/QINF30/index.md#def-qinf30-entanglement-fidelity)に従い、ある復号器の回復忠実度を

$$
F_{\rm e}(\mathcal D)
=\langle\Phi_2|
\bigl((\mathcal D\circ\mathcal N_{\rm acc})\otimes\operatorname{id}_Q\bigr)
(|\Phi_2\rangle\langle\Phi_2|)
|\Phi_2\rangle
$$

で測ります。$F_{\rm e}=1$ はこの最大エンタングル入力を完全に戻すことです。単一の基底状態を当てた精度とは区別します。

## 3. 早期放射の鍵と後期放射の日記：有限符号を作る

[BHI12の投入・放出模型](../BHI12/index.md#def-bhi12-evaporation-map)では、すでに外へ出た放射と新しく放出された放射を区別しました。ここでは早期放射の二つの量子ビット $A,C$ を「鍵の記録」、新たな放射の量子ビット $D$ を「日記の入った箱」、触れられない残存系 $B$ を4準位系とします。名前は物理的な所在の目印であり、JT時空の具体的なハミルトニアンを指定するものではありません。

論理基底 $|0\rangle,|1\rangle$ 上でPauli作用素を

$$
X|0\rangle=|1\rangle,\quad X|1\rangle=|0\rangle,\qquad
Z|0\rangle=|0\rangle,\quad Z|1\rangle=-|1\rangle
$$

とし、$U_{ab}=X^aZ^b$（$a,b\in\{0,1\}$）を定めます。$X^2=Z^2=I$、$U_{ab}^\dagger=Z^bX^a$ です。$\mathcal H_A=\mathcal H_C=\mathcal H_D=\mathbb C^2$、$\mathcal H_B=\mathbb C^4$ とし、$B$ の正規直交基底を $|ab\rangle_B$ と書きます。

<a id="def-bhi33-keyed-radiation-code"></a>

<!-- formal-statement-start -->
> **定義（鍵付き放射情報移送符号）**  
> $L=\mathbb C^2$ から $A\otimes C\otimes D\otimes B$ への線形写像 $V$ を、任意の $|\psi\rangle\in L$ について
>
$$
V|\psi\rangle
=\frac12\sum_{a,b=0}^1
|a\rangle_A|b\rangle_C
\bigl(U_{ab}|\psi\rangle\bigr)_D
|ab\rangle_B
$$
>
> で定める。この写像を**鍵付き放射情報移送符号**と呼ぶ。$A,C,D$ の全体を観測可能な放射の候補とし、$B$ は残存系とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi33-keyed-radiation-code -->
**定義の確認**（基底と次元）：入力は2次元、出力の $A,C,D,B$ はそれぞれ2,2,2,4次元です。例えば $|0\rangle$ の像は

$$
V|0\rangle=\tfrac12\bigl(
|00\rangle_{AC}|0\rangle_D|00\rangle_B+
|01\rangle_{AC}|0\rangle_D|01\rangle_B+
|10\rangle_{AC}|1\rangle_D|10\rangle_B+
|11\rangle_{AC}|1\rangle_D|11\rangle_B
\bigr).
$$

四項は $ACB$ の基底ラベルが違うため直交し、ノルムの二乗は $4/4=1$。一般の $|\phi\rangle,|\psi\rangle$ についても

$$
\langle V\phi|V\psi\rangle
=\tfrac14\sum_{a,b}\langle\phi|U_{ab}^\dagger U_{ab}|\psi\rangle
=\langle\phi|\psi\rangle.
$$

したがって $V^\dagger V=I_L$ で、定義中の「等長符号」が成立します。
<!-- definition-example-end -->

この符号は、量子状態を単に複製したものではありません。$D$ 上には4種類のPauli操作が混ざり、$A,C$ を持つ観測者だけがその操作を取り消せます。残存系 $B$ にも鍵ラベルの記録はありますが、**放射だけを利用する観測者は $A,C$ で鍵を読み取れ、論理入力を回収するために $B$ へ触れる必要はありません**。

### 3.1 どの部分系に入力の情報が残るか

<a id="prop-bhi33-output-channels"></a>

<!-- formal-statement-start -->
> **命題（鍵付き符号の保持チャネルと残存系）**  
> 上の等長符号 $V$ について、$ACD$ 全体を保持するときのチャネルと、$A,D$ のみを保持するときのチャネルは、それぞれ
>
$$
\begin{aligned}
\mathcal N_{ACD}(\rho)
&=\frac14\sum_{a,b}|ab\rangle\langle ab|_{AC}
\otimes U_{ab}\rho U_{ab}^\dagger,\\
\mathcal N_{AD}(\rho)
&=\frac12\sum_a|a\rangle\langle a|_A
\otimes X^a\Delta_Z(\rho)X^a,\\
\Delta_Z(\rho)&:=\frac12(\rho+Z\rho Z).
\end{aligned}
$$
>
> また $D$ のみの縮約は $\mathcal N_D(\rho)=I_D/2$、残存系の縮約は $\mathcal N_B(\rho)=I_B/4$ で、いずれも全論理状態 $\rho$ に依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

$V\rho V^\dagger$ を $(a,b)$ と $(a',b')$ の二重和に展開し、$B$ の直交性で非対角の鍵ブロックを消します。$C$ を失うと $Z^b$ の平均が残り、密度行列の非対角成分だけが消えます。

<!-- proof-start -->
### 証明

$\rho=\sum_{j,k}\rho_{jk}|j\rangle\langle k|$ とします。$B$ で部分トレースすると

$$
\operatorname{Tr}_B|ab\rangle\langle a'b'|_B
=\delta_{aa'}\delta_{bb'}
$$

なので、二重和のうち $(a,b)=(a',b')$ だけが残り、$\mathcal N_{ACD}$ の式を得ます。さらに $C$ をトレースすると

$$
\begin{aligned}
\mathcal N_{AD}(\rho)
&=\tfrac14\sum_a|a\rangle\langle a|
\otimes X^a(\rho+Z\rho Z)X^a\\
&=\tfrac12\sum_a|a\rangle\langle a|
\otimes X^a\Delta_Z(\rho)X^a.
\end{aligned}
$$

$\rho=\begin{pmatrix}r&s\\s^*&1-r\end{pmatrix}$ とすれば

$$
Z\rho Z=\begin{pmatrix}r&-s\\-s^*&1-r\end{pmatrix},
\qquad
\Delta_Z(\rho)=\begin{pmatrix}r&0\\0&1-r\end{pmatrix}.
$$

$D$ だけを残せば、まず $b$ の和で非対角項が消え、次に $a=0,1$ の和で対角項も平均されます。すなわち

$$
\tfrac12\bigl(\Delta_Z(\rho)+X\Delta_Z(\rho)X\bigr)
=\tfrac12\begin{pmatrix}1&0\\0&1\end{pmatrix}.
$$

最後に $A,C,D$ をトレースします。鍵の異なる項は $AC$ の直交性で消え、対角項の $D$ のトレースは $\operatorname{Tr}\rho=1$ です。ゆえに

$$
\mathcal N_B(\rho)
=\tfrac14\sum_{a,b}|ab\rangle\langle ab|_B=I_B/4.
$$

すべての計算は任意の $\rho$ で成立します。$\square$
<!-- proof-end -->

残存系 $B$ が入力と独立であることは、[QINF29の完全デカップリング](../../../応用系/QINF/QINF29/index.md#def-qinf29-decoupling)と整合します。ただし、上の式の $B$ の周辺状態だけを示して「参照系 $Q$ と $B$ が無相関」と結論するのは一般には不十分です。この模型では上式を入力の行列単位 $|j\rangle\langle k|$ にまで線形拡張すると

$$
\operatorname{Tr}_{ACD}\bigl(V|j\rangle\langle k|V^\dagger\bigr)
=\delta_{jk}I_B/4
$$

となるため、参照系を付けたときにも $\rho_{QB}=\rho_Q\otimes I_B/4$ です。

## 4. 鍵を集めれば、回復写像を実際に実行できる

全放射 $ACD$ を集めた観測者は $A,C$ を測定して $(a,b)$ を読み、$D$ へ $U_{ab}^\dagger=Z^bX^a$ を作用させます。「最初に $X^a$、次に $Z^b$」という操作順序です。これは[BHI13の回復器の存在条件](../BHI13/index.md#thm-bhi13-recovery-threshold)をこの模型で具体的な回路に変えたものです。

<a id="thm-bhi33-keyed-petz"></a>

<!-- formal-statement-start -->
> **定理（鍵付き放射の完全復号とPetz回復）**  
> 第3節の有限等長符号と $\mathcal N_{ACD}$ を固定する。$T$ を $ACD$ 上の作用素とし、$T_{ab}=\langle ab|_{AC}T|ab\rangle_{AC}$ を $D$ 上のブロックとする。このとき
>
$$
\mathcal D_{ACD}(T)
=\sum_{a,b}U_{ab}^\dagger T_{ab}U_{ab}
$$
>
> はCPTPであり、$\mathcal D_{ACD}\circ\mathcal N_{ACD}=\operatorname{id}_L$ を満たす。さらに基準状態 $\sigma=I_L/2$ に関する[QINF30のPetz写像](../../../応用系/QINF/QINF30/index.md#def-qinf30-petz)は、この $\mathcal D_{ACD}$ と全入力作用素上で一致する。
<!-- formal-statement-end -->

### 証明の見取り図

まず各鍵ブロックに逆Pauliを作用させて4個の $\rho/4$ を足します。Petz写像については、基準状態の出力が $I_{ACD}/8$ という正則な行列なので逆平方根を具体的に計算でき、チャネルの随伴を使う式へそのまま代入します。

<!-- proof-start -->
### 証明

$K_{ab}=U_{ab}^\dagger\langle ab|_{AC}$ を $ACD\to L$ の作用素とすると、$\mathcal D_{ACD}(T)=\sum_{ab}K_{ab}TK_{ab}^\dagger$ です。また

$$
\sum_{a,b}K_{ab}^\dagger K_{ab}
=\sum_{a,b}|ab\rangle\langle ab|_{AC}\otimes I_D
=I_{ACD}.
$$

よってKraus表示から完全正値・トレース保存です。[保持チャネルの式](#prop-bhi33-output-channels)を代入すれば

$$
\begin{aligned}
\mathcal D_{ACD}(\mathcal N_{ACD}(\rho))
&=\tfrac14\sum_{ab}U_{ab}^\dagger
(U_{ab}\rho U_{ab}^\dagger)U_{ab}\\
&=\tfrac14\sum_{ab}\rho=\rho.
\end{aligned}
$$

次に、$\sigma=I_L/2$ はどの $U_{ab}$ でも変わらないため、[保持チャネルの式](#prop-bhi33-output-channels)から

$$
\mathcal N_{ACD}(\sigma)
=\frac14\sum_{a,b}|ab\rangle\langle ab|_{AC}\otimes\frac{I_D}{2}
=\frac{I_{ACD}}8
$$

です。Hilbert–Schmidt内積 $\operatorname{Tr}(T^\dagger S)$ に関する随伴 $\mathcal N_{ACD}^\dagger$ は、任意の $T$ について

$$
\mathcal N_{ACD}^\dagger(T)
=\tfrac14\sum_{ab}U_{ab}^\dagger T_{ab}U_{ab}
$$

です。実際にこの右辺を $\rho$ とトレース対に入れると、$\operatorname{Tr}[\mathcal N_{ACD}(\rho)T]$ と一致します。

基準状態が全階数なので、Petz写像の定義式に

$$
\sigma^{1/2}=I_L/\sqrt2,\qquad
\mathcal N_{ACD}(\sigma)^{-1/2}=\sqrt8 I_{ACD}
$$

を代入できます。従って

$$
\begin{aligned}
\mathcal R_{\sigma,\mathcal N_{ACD}}(T)
&=\sigma^{1/2}\mathcal N_{ACD}^\dagger
\left(\mathcal N_{ACD}(\sigma)^{-1/2}
T\mathcal N_{ACD}(\sigma)^{-1/2}\right)\sigma^{1/2}\\
&=\tfrac12\,\mathcal N_{ACD}^\dagger(8T)
=4\,\mathcal N_{ACD}^\dagger(T)
=\mathcal D_{ACD}(T).
\end{aligned}
$$

従ってPetz回復も全論理状態を完全復号します。$\square$
<!-- proof-end -->

**参照系も回復することの直接確認**：復号を測定せず、$AC$ の二量子ビットを制御系として逆Pauliを $D$ に作用させるユニタリ $W$ を使います。すると

$$
(W\otimes I_B)V|\psi\rangle
=|\psi\rangle_D\otimes
\frac12\sum_{ab}|ab\rangle_{AC}|ab\rangle_B.
$$

右辺で $D$ と残りの系は積状態です。この式は $|\psi\rangle$ に線形なので、任意の参照系 $Q$ ともつれた $\sum_j|j\rangle_L|q_j\rangle_Q$ にも同じ $W$ を作用させると、日記と参照系のもつれをそのまま $DQ$ に取り出せます。観測者が入力を事前に知る必要はありません。

この模型なら、$AC$ を二量子ビットとして測定し、$D$ に条件付きで最大二つのPauli補正を施すだけです。**写像の存在に加え、ここでは実装も容易**です。後述する一般のブラックホールへこの低コストを外挿はしません。

## 5. 鍵の半分を失うと、古典情報は読めても位相は戻らない

早期放射のうち $A$ は集められたが $C$ は利用できず、後期放射 $D$ は集められたとします。このときの保持チャネルは、第3節で導いた $\mathcal N_{AD}$ です。$C$ の未知の値 $b$ に対応する $Z^b$ が、論理状態の相対位相を無作為化します。

<a id="prop-bhi33-partial-key"></a>

<!-- formal-statement-start -->
> **命題（片方の鍵だけで起きる位相消失）**  
> 第3節の符号で観測者が $A,D$ のみを持つとする。$A$ を測定して得た $a$ に応じ、$D$ に $X^a$ を作用させて $A$ を捨てるCPTP写像 $\mathcal D_{AD}$ を用いると
>
$$
(\mathcal D_{AD}\circ\mathcal N_{AD})(\rho)
=\Delta_Z(\rho)
$$
>
> が成立する。この $\mathcal D_{AD}$ と $\sigma=I_L/2$ に関するPetz回復は、保持チャネル $\mathcal N_{AD}$ の出力上で同じ回復状態を与える。しかし $L$ の未知の量子状態を完全回復するCPTP写像は存在しない。最大エンタングル入力に対する達成可能な最大回復忠実度は $1/2$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$A$ を読めば $X^a$ は取り消せますが、失われた $b$ の平均による $\Delta_Z$ は残ります。$|0\rangle,|1\rangle$ の確率は保持される一方、$|+\rangle,|-\rangle$ が同じ出力になるので未知の位相を戻せません。最良忠実度は、参照系との量子相関が完全に古典相関へ変わることから上限を求めます。

<!-- proof-start -->
### 証明

任意の $T$ について $T_a=\langle a|_AT|a\rangle_A$ と書けば、鍵を一つだけ読んで補正する写像は

$$
\mathcal D_{AD}(T)=\sum_a X^a T_a X^a
$$

です。Kraus演算子は $X^a\langle a|_A$ で、その随伴積の和は $I_{AD}$。よってCPTPです。保持チャネルを代入すると

$$
\mathcal D_{AD}(\mathcal N_{AD}(\rho))
=\tfrac12\sum_aX^aX^a\Delta_Z(\rho)X^aX^a
=\Delta_Z(\rho).
$$

ここで $\mathcal N_{AD}(\sigma)=I_{AD}/4$ であり、

$$
\mathcal N_{AD}^\dagger(T)
=\tfrac12\sum_a\Delta_Z(X^aT_aX^a).
$$

Petz写像は基準状態の平方根を代入して

$$
\mathcal R_{\sigma,\mathcal N_{AD}}(T)
=2\mathcal N_{AD}^\dagger(T)
=\sum_a\Delta_Z(X^aT_aX^a).
$$

この写像は $\mathcal D_{AD}$ の後に $\Delta_Z$ を施したものです。**全入力作用素上で両者が一致するという主張は成り立ちません**が、チャネルの像上では同じ回復状態 $\Delta_Z(\rho)$ を与えます。従って命題中の「一致」は、$\mathcal N_{AD}$ の出力を入力した場合の一致として読む必要があります。

完全回復の不可能性は、$|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$、$|-\rangle=(|0\rangle-|1\rangle)/\sqrt2$ に対して

$$
\Delta_Z(|+\rangle\langle+|)
=\Delta_Z(|-\rangle\langle-|)
=I/2
$$

が成立することから分かります。$\mathcal N_{AD}$ の出力も両者で同じなので、どの一つのCPTP復号も両方を区別して戻すことはできません。

最大エンタングル状態の $L$ 側を $\Delta_Z$ に通すと

$$
(\Delta_Z\otimes\operatorname{id}_Q)(|\Phi_2\rangle\langle\Phi_2|)
=\tfrac12(|00\rangle\langle00|+|11\rangle\langle11|)
$$

です。最適性を示すには、**復号前**の $AD$ と参照系 $Q$ の状態を確かめる必要があります。[保持チャネルの式](#prop-bhi33-output-channels)は行列単位に対しても線形に適用でき、$\Delta_Z(|j\rangle\langle k|)=\delta_{jk}|j\rangle\langle j|$ より

$$
\mathcal N_{AD}(|j\rangle\langle k|)
=\frac{\delta_{jk}}2\sum_{a=0}^1
|a\rangle\langle a|_A\otimes
(X^a|j\rangle\langle j|X^a)_D.
$$

最大エンタングル入力を
$|\Phi_2\rangle\langle\Phi_2|
=\frac12\sum_{j,k}|j\rangle\langle k|_L\otimes|j\rangle\langle k|_Q$
と展開して代入すると

$$
\omega_{ADQ}
=\frac14\sum_{a,j=0}^1
|a\rangle\langle a|_A\otimes
(X^a|j\rangle\langle j|X^a)_D
\otimes|j\rangle\langle j|_Q.
$$

各項は $AD$ と $Q$ の純積状態の正の重み付き和なので、復号前から $Q:AD$ は分離可能です。局所的な復号CPTPを施しても分離可能性は保たれます。任意の純積状態 $|u\rangle_L|v\rangle_Q$ について[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)により

$$
|\langle\Phi_2|u\otimes v\rangle|^2
=\tfrac12|u_0v_0+u_1v_1|^2\le\tfrac12.
$$

分離可能状態を純積状態の確率重み付きの和で表せば、各項での上界を足しても $1/2$ を超えません。一方、上で構成した $\mathcal D_{AD}$ の回復状態の重なりは

$$
F_{\rm e}=\tfrac12(\langle\Phi_2|00\rangle\langle00|\Phi_2\rangle+
\langle\Phi_2|11\rangle\langle11|\Phi_2\rangle)=\tfrac12
$$

です。従って $1/2$ は達成可能な最適値です。$\square$
<!-- proof-end -->

ここでPetzと単純な補正器は、一般の $AD$ 入力上では**同じ写像ではありません**。Petzは復号後の非対角成分を消しますが、出力チャネル $\mathcal N_{AD}$ の像はすでにその成分を失っています。この違いは「ある状態族について同じ仕事をする」と「全作用素上の式が同じ」を混同しないための注意点です。

### 5.1 相対エントロピーでも情報の欠落を測る

[QINF20の量子相対エントロピー](../../../応用系/QINF/QINF20/index.md#def-qinf20-relative-entropy)を $D(\rho\Vert\sigma)$ と書き、$\sigma=I_L/2$ を基準にします。ブロックごとの固有値と対数を計算すると、全放射を保持する場合は

$$
D(\mathcal N_{ACD}(\rho)\Vert\mathcal N_{ACD}(\sigma))
=\tfrac14\sum_{ab}D(U_{ab}\rho U_{ab}^\dagger\Vert I/2)
=D(\rho\Vert I/2).
$$

$AD$ のみなら

$$
D(\mathcal N_{AD}(\rho)\Vert\mathcal N_{AD}(\sigma))
=D(\Delta_Z(\rho)\Vert I/2).
$$

例えば $\rho=|+\rangle\langle+|$ では、入力は純粋状態なので $D(\rho\Vert I/2)=\log2$ ですが、$\Delta_Z(\rho)=I/2$ より後者は零です。$\rho=|0\rangle\langle0|$ なら $\Delta_Z(\rho)=\rho$ なので両方 $\log2$ です。[相対エントロピーのデータ処理不等式](../../../応用系/QINF/QINF20/index.md#thm-qinf20-dpi)に反することはなく、**保存されるのが論理情報全体か、選んだ古典的な区別だけか**を示しています。

## 6. 観測できる放射の範囲を確率的に制限する

鍵の収集が試行によって成功・失敗する状況を考えます。これはisland面積の量子ゆらぎではなく、**観測装置が $C$ にアクセスできたか**という外部の標識が明示された通信模型です。確率 $1-p$ では $ACD$、確率 $p$ では $AD$ だけを受け取り、どちらの事象かも受信者へ通知されるとします。

<a id="prop-bhi33-flagged-access"></a>

<!-- formal-statement-start -->
> **命題（鍵アクセス失敗率と回復忠実度）**  
> 第3節の符号に対し $0\le p\le1$ とする。受信者が確率 $1-p$ で $ACD$ を、確率 $p$ で $AD$ を受け取り、成功・失敗の古典フラグを知っている直和チャネルを考える。全鍵枝で第4節の回復、部分鍵枝で第5節の補正を使うと、論理チャネルは
>
$$
\mathcal T_p(\rho)=(1-p)\rho+p\Delta_Z(\rho)
$$
>
> となる。最大エンタングル入力に対するこの復号の忠実度は $1-p/2$ であり、フラグを知る任意のCPTP回復でもこれを上回れない。
<!-- formal-statement-end -->

### 証明の見取り図

フラグに応じた二つの既知のチャネルを重み付きで足します。忠実度はその混合に線形であり、完全枝の上限1と部分鍵枝の上限 $1/2$ を使います。

<!-- proof-start -->
### 証明

成功枝は[鍵付き放射の完全復号とPetz回復](#thm-bhi33-keyed-petz)で恒等チャネル、失敗枝は[片方の鍵だけで起きる位相消失](#prop-bhi33-partial-key)で $\Delta_Z$ です。フラグが直交するため、条件付き復号後にフラグを捨てると

$$
\mathcal T_p(\rho)
=(1-p)\operatorname{id}(\rho)+p\Delta_Z(\rho).
$$

参照系付き出力は $(1-p)|\Phi_2\rangle\langle\Phi_2|+p(\Delta_Z\otimes\operatorname{id})(|\Phi_2\rangle\langle\Phi_2|)$。$|\Phi_2\rangle$ との重なりを取って

$$
F_{\rm e}=(1-p)\cdot1+p\cdot\tfrac12=1-\tfrac p2.
$$

任意の復号は、成功枝で高々1、失敗枝で第5節の分離可能性の上界により高々 $1/2$ です。復号器がフラグを条件に使えても、重み付き和の上界は $1-p/2$ のままです。従ってこの値は最適です。$\square$
<!-- proof-end -->

例えば $p=1/5$ なら $F_{\rm e}=9/10$ です。これは単一の未知入力について90%の確率で「完全な量子状態を識別した」という意味ではなく、**参照系付き入力への重なり**の数値です。

## 7. 情報理論上の回復と、計算としての復号

この符号では必要な操作が明示されています。全放射 $ACD$ なら、鍵二ビットを読んで $X^a$、$Z^b$ を作用させるだけです。位相ゲートとビット反転の条件付き実行は定数個の基本操作で済みます。一方、**存在だけを知る回復写像を手元の装置で効率よく実行できるか**は別の問いです。

例えば可視放射全体に既知の大きなユニタリ $W_{\rm out}$ が作用してから測定装置へ届くなら、チャネルは次のようになります。ここで $W_{\rm out}$ は受信前の放射に作用し、第4節の鍵補正ユニタリ $W$ とは別の作用素です。

$$
\mathcal N'(\rho)=W_{\rm out}\mathcal N_{ACD}(\rho)W_{\rm out}^\dagger
$$

となります。$W_{\rm out}$ が受信領域内のユニタリである限り、エントロピーと相対エントロピーの値は変わりません。回復器 $\mathcal D'(T)=\mathcal D_{ACD}(W_{\rm out}^\dagger TW_{\rm out})$ は存在しますが、その回路費用を抑えるには $W_{\rm out}^\dagger$ などを効率的に実行する具体的なアルゴリズムが必要です。**エントロピーの数値だけはゲート数の上界を与えません。**

| 論点 | 指定した入力・追加条件 | 言えること |
| --- | --- | --- |
| Page曲線・island | 同じ放射領域 $R$ の一般化エントロピー、QES、鞍点の比較 | その模型での $S(R)$ の支配枝 |
| 放射ウェッジ | 選択済みQES、有効幾何 | 放射に対応する有効バルク領域 |
| 回復の存在 | コード部分空間、保持チャネル、参照系を含む誤差評価 | 状態独立な量子回復器の存在、または誤差上界 |
| Petz型の候補 | 完全に指定したチャネルと基準状態 | 計算可能な回復写像の式とその適用範囲 |
| 操作的な復号 | 放射への実アクセス、回路、時間、誤り耐性 | 観測者が実行できる具体的な手順と資源量 |

[BHI31のensemble平均と固定理論の差](../BHI31/index.md#def-bhi31-ensemble-connected)も残ります。重力レプリカ計算から得たエントロピーが、特定の単一理論における既知の有限チャネルとその回路を自動的に与えるわけではありません。実際の重力での内部作用素再構成には[HOLO28のJLMS使用規約](../../HOLO/HOLO28/index.md#def-holo28-jlms-dictionary)などの条件が必要です。この講の鍵付き符号は、これらの**追加条件がなぜ必要か**を有限次元で検査する装置です。

本講の結論は「鍵を集めて量子チャネルを指定すれば復号を組み立てられる」「鍵の一部が失われると情報の種類によって回復限界が変わる」「Page曲線・復号器の存在・実行可能性は別の水準の主張である」という三点です。

---

## 8. 演習と詳細解答

各問で特記しない限り、第3節の $L,A,C,D,B,V,U_{ab}$、第4節の回復器と第5節の $\Delta_Z$ を使用します。量子ビットの基底は $|0\rangle,|1\rangle$、情報量の対数は自然対数です。

### Level A：全入力で成立する式を手で確かめる

<a id="ex-bhi33-a01"></a>

#### BHI33-A01 符号の二つの基底像

- Level: A
- 問題: $V|1\rangle$ を4項で展開し、$V|0\rangle$ と $V|1\rangle$ の内積が零であることから等長性を確認せよ。

<!-- solution-start -->
**詳細解答**：$Z|1\rangle=-|1\rangle$、$X|1\rangle=|0\rangle$、$XZ|1\rangle=-|0\rangle$ より

$$
V|1\rangle=\tfrac12(
|00\rangle_{AC}|1\rangle_D|00\rangle_B-
|01\rangle_{AC}|1\rangle_D|01\rangle_B+
|10\rangle_{AC}|0\rangle_D|10\rangle_B-
|11\rangle_{AC}|0\rangle_D|11\rangle_B).
$$

各項の $ACB$ 基底が異なるので $\|V|1\rangle\|^2=4(1/2)^2=1$ です。また $V|0\rangle$ と同じ $ACB$ ラベルをもつ項同士でも $D$ の $|0\rangle,|1\rangle$ が直交します。異なるラベルの組は $ACB$ で直交します。従って $\langle V0|V1\rangle=0$。二つの基底像が正規直交するので $V^\dagger V=I_L$ です。
<!-- solution-end -->

<a id="ex-bhi33-a02"></a>

#### BHI33-A02 残存系の情報漏洩を行列単位で調べる

- Level: A
- 問題: $\operatorname{Tr}_{ACD}(V|0\rangle\langle1|V^\dagger)$ を計算し、対角行列単位の場合と合わせて参照系 $Q$ への漏洩がないことを説明せよ。

<!-- solution-start -->
**詳細解答**：$AC$ の同じ鍵 $(a,b)$ の項だけが部分トレースで残るので、非対角入力では

$$
\operatorname{Tr}_{ACD}(V|0\rangle\langle1|V^\dagger)
=\tfrac14\sum_{ab}\langle1|U_{ab}^\dagger U_{ab}|0\rangle
|ab\rangle\langle ab|_B=0.
$$

対角入力 $|j\rangle\langle j|$ なら各内積は1で $I_B/4$ を得ます。したがって任意の $j,k$ について結果は $\delta_{jk}I_B/4$。参照系付き状態 $\rho_{LQ}=\sum_{jk}|j\rangle\langle k|\otimes M_{jk}$ へ線形に作用させると $\sum_j M_{jj}\otimes I_B/4=\rho_Q\otimes I_B/4$ になり、参照との相関も消えます。
<!-- solution-end -->

<a id="ex-bhi33-a03"></a>

#### BHI33-A03 鍵を読む復号回路

- Level: A
- 問題: 鍵が $(a,b)=(1,1)$ だったとき、$D$ へ施す補正の順序を示し、任意の $|\psi\rangle$ を復元する式を書け。

<!-- solution-start -->
**詳細解答**：暗号化は $U_{11}=XZ$ です。$X^\dagger=X$、$Z^\dagger=Z$ かつ逆積の順序を反転するので $U_{11}^\dagger=ZX$。実行では先に $X$、次に $Z$ を施します。

$$
(ZX)(XZ)|\psi\rangle
=Z(XX)Z|\psi\rangle
=Z^2|\psi\rangle=|\psi\rangle.
$$

$XZ$ と $ZX$ の順序を同じと誤認すると、状態によって全体位相の見かけが変わります。物理状態として全体位相は無関係ですが、回復写像の等式は上の順序で正確に成立します。
<!-- solution-end -->

<a id="ex-bhi33-a04"></a>

#### BHI33-A04 Petz写像の定数因子

- Level: A
- 問題: $\sigma=I_L/2$ に対し $\mathcal N_{ACD}(\sigma)$、その逆平方根、Petz写像の係数を求めよ。

<!-- solution-start -->
**詳細解答**：各鍵ブロックは $(1/4)U_{ab}(I/2)U_{ab}^\dagger=I_D/8$ です。4ブロックを並べた出力は $I_{ACD}/8$（8次元）で、逆平方根は $\sqrt8 I_{ACD}$。入力の $\sigma^{1/2}=I_L/\sqrt2$ を両側に置くため、

$$
\mathcal R_{\sigma,\mathcal N}(T)
=\tfrac12\mathcal N^\dagger(8T)=4\mathcal N^\dagger(T)
=\sum_{ab}U_{ab}^\dagger T_{ab}U_{ab}.
$$

$\mathcal N^\dagger$ 自体の係数 $1/4$ とPetzの係数4が相殺することに注意します。
<!-- solution-end -->

<a id="ex-bhi33-a05"></a>

#### BHI33-A05 古典ビットと相対位相

- Level: A
- 問題: $\rho_0=|0\rangle\langle0|$、$\rho_+=|+\rangle\langle+|$ に $\Delta_Z$ を作用させ、それぞれの純度 $\operatorname{Tr}(\Delta_Z(\rho)^2)$ を求めよ。

<!-- solution-start -->
**詳細解答**：$\rho_0=\begin{pmatrix}1&0\\0&0\end{pmatrix}$ は $Z\rho_0Z=\rho_0$ なので $\Delta_Z(\rho_0)=\rho_0$、純度は1。$\rho_+=\tfrac12\begin{pmatrix}1&1\\1&1\end{pmatrix}$ に対して $Z\rho_+Z=\tfrac12\begin{pmatrix}1&-1\\-1&1\end{pmatrix}$ なので $\Delta_Z(\rho_+)=I/2$、純度は $\operatorname{Tr}(I/4)=1/2$。鍵の半分を失うと、計算基底の情報は残っても重ね合わせの位相が消えます。
<!-- solution-end -->

### Level B：Petz、参照系、収集範囲を接続する

<a id="ex-bhi33-b01"></a>

#### BHI33-B01 二つの保持領域の相対エントロピー

- Level: B
- 問題: $\sigma=I_L/2$ とし、$\rho=|0\rangle\langle0|$ と $\rho=|+\rangle\langle+|$ について、$D(\mathcal N_{ACD}(\rho)\Vert\mathcal N_{ACD}(\sigma))$ と $D(\mathcal N_{AD}(\rho)\Vert\mathcal N_{AD}(\sigma))$ を計算せよ。

<!-- solution-start -->
**詳細解答**：両入力は純粋で、$D(\rho\Vert I/2)=\operatorname{Tr}[\rho(\log\rho-\log(I/2))]=\log2$（$\rho$ の台上の固有値1を使う）。全鍵を残せば各鍵ブロックは重み $1/4$ でユニタリ共役なので、相対エントロピーは4項の平均

$$
\tfrac14\sum_{ab}D(U_{ab}\rho U_{ab}^\dagger\Vert I/2)=\log2.
$$

部分鍵 $AD$ では、$a$ を読んだ後の情報量は $\Delta_Z(\rho)$ と同じです。$|0\rangle$ なら $\Delta_Z(\rho)=\rho$ で $\log2$。$|+\rangle$ なら $\Delta_Z(\rho)=I/2$ で $D(I/2\Vert I/2)=0$。したがって $(ACD,AD)$ の値は順に $|0\rangle$ で $(\log2,\log2)$、$|+\rangle$ で $(\log2,0)$ です。
<!-- solution-end -->

<a id="ex-bhi33-b02"></a>

#### BHI33-B02 部分鍵から量子もつれを復元できない理由

- Level: B
- 問題: 参照系 $Q$ と最大エンタングル状態 $|\Phi_2\rangle$ を作り、$AD$ だけを保持した後、回復器 $\mathcal D_{AD}$ の出力と $F_{\rm e}$ を計算せよ。別の復号器で $F_{\rm e}>1/2$ とできない理由を示せ。

<!-- solution-start -->
**詳細解答**：$A$ の値に従って $X^a$ を戻しても、$C$ を捨てた平均が $\Delta_Z$ を残します。最大エンタングル密度行列の非対角部分 $|00\rangle\langle11|$ と $|11\rangle\langle00|$ が消え、出力は

$$
\omega_{LQ}=\tfrac12|00\rangle\langle00|+\tfrac12|11\rangle\langle11|.
$$

$|\langle\Phi_2|00\rangle|^2=|\langle\Phi_2|11\rangle|^2=1/2$ なので $F_{\rm e}=\langle\Phi_2|\omega|\Phi_2\rangle=1/2$。復号前の $Q:AD$ 状態は分離可能であり、$AD$ の局所CPTPではもつれを作れません。任意の純積状態と $|\Phi_2\rangle$ との重なりの二乗は[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)により高々1/2、凸混合でも同じです。従って上界1/2を超えられません。
<!-- solution-end -->

<a id="ex-bhi33-b03"></a>

#### BHI33-B03 一部の試行で鍵が欠ける場合

- Level: B
- 問題: 第6節のフラグ付きアクセスで $p=1/5$ とする。$\mathcal T_p(|+\rangle\langle+|)$ を行列で求め、$F_{\rm e}$ と純度を計算せよ。二つの値が異なる性質を測ることを説明せよ。

<!-- solution-start -->
**詳細解答**：$\Delta_Z(|+\rangle\langle+|)=I/2$ なので

$$
\mathcal T_{1/5}(|+\rangle\langle+|)
=\tfrac45\cdot\tfrac12\begin{pmatrix}1&1\\1&1\end{pmatrix}
+\tfrac15\cdot\tfrac12 I
=\begin{pmatrix}1/2&2/5\\2/5&1/2\end{pmatrix}.
$$

固有値は $1/2\pm2/5=9/10,1/10$ で、純度は $(9/10)^2+(1/10)^2=41/50$ です。一方、参照系付き最大エンタングル入力では $F_{\rm e}=1-p/2=9/10$。純度は**この一つの入力の出力状態の混合度**、$F_{\rm e}$ は**参照系に対する量子チャネルの回復性能**で、値も定義も異なります。
<!-- solution-end -->

<a id="ex-bhi33-b04"></a>

#### BHI33-B04 限定された古典約束と全量子回復

- Level: B
- 問題: 入力が $|0\rangle$ または $|1\rangle$ のいずれかであると約束されている場合、$AD$ だけからそのラベルを確実に読む手順を与えよ。その手順が未知の $|+\rangle$ を回復できないことも示せ。

<!-- solution-start -->
**詳細解答**：$A$ を計算基底で測定して $a$ を得ると、$D$ は $X^a|j\rangle\langle j|X^a$ の状態です。$D$ に $X^a$ を作用させて計算基底測定をすれば $j\in\{0,1\}$ を確率1で読み取れます。ただしこの手順は量子入力を測定しているため、量子回復器の代用ではありません。

実際、$\rho_+=|+\rangle\langle+|$ なら $C$ の未観測の $b$ によって $\Delta_Z(\rho_+)=I/2$ です。$A$ に応じた補正と計算基底測定の結果は0と1が各1/2で、元の相対位相を復元できません。$|-\rangle$ でも同じ分布です。したがって古典的な二択識別が完全でも、全量子状態の復号条件は満たしません。
<!-- solution-end -->

### Level C：結果を操作的な結論まで組み立てる

<a id="ex-bhi33-c01"></a>

#### BHI33-C01 Page曲線から日記の復号を主張するための監査

- Level: C
- 問題: 第3節の鍵付き放射符号に基づいて、次をすべて示せ。

  1. 全鍵アクセス $ACD$ で残存系 $B$ と参照系 $Q$ がデカップルすること。
  2. 同じ設定で、Petz回復がすべての論理入力と参照系とのもつれを回復すること。
  3. 鍵 $C$ を失うと、どの量子情報が回復不能となり、最適 $F_{\rm e}$ はいくつになるか。
  4. 鍵収集成功率 $1-p$ を持つ観測者の最適忠実度。
  5. islandを含む放射のPage曲線を別途得たとしても、以上の復号の存在・計算費用が自動的に結論されない理由を、仮定の対応表に沿って説明すること。

<!-- solution-start -->
**詳細解答**：

**(1)** $V|j\rangle\langle k|V^\dagger$ を $ACD$ でトレースすると、鍵ラベル $(a,b)$ が一致する項だけが残り、$D$ のトレースは $\langle k|U_{ab}^\dagger U_{ab}|j\rangle=\delta_{jk}$。従って

$$
\operatorname{Tr}_{ACD}(V|j\rangle\langle k|V^\dagger)
=\delta_{jk}I_B/4.
$$

任意の参照系付き入力 $\rho_{LQ}=\sum_{jk}|j\rangle\langle k|\otimes M_{jk}$ に線形に適用すると $\rho_{BQ}=I_B/4\otimes\sum_jM_{jj}=I_B/4\otimes\rho_Q$ で、完全デカップリングです。

**(2)** [鍵付き放射の完全復号とPetz回復](#thm-bhi33-keyed-petz)で $\mathcal N_{ACD}(I/2)=I_8/8$ と求めたので、[Petz写像](../../../応用系/QINF/QINF30/index.md#def-qinf30-petz)に代入すると

$$
\mathcal R(T)=4\mathcal N_{ACD}^\dagger(T)
=\sum_{ab}U_{ab}^\dagger\langle ab|T|ab\rangle U_{ab}.
$$

四つのKraus演算子 $K_{ab}=U_{ab}^\dagger\langle ab|$ が $\sum K_{ab}^\dagger K_{ab}=I_8$ を満たし、$\mathcal R\mathcal N_{ACD}(\rho)=\tfrac14\sum_{ab}\rho=\rho$ です。$AC$ 制御付きの逆Pauliを施せば、符号化後の任意の $|\psi\rangle$ は $|\psi\rangle_D\otimes\frac12\sum_{ab}|ab\rangle_{AC}|ab\rangle_B$ に戻るため、参照系とのもつれも保存されます。

**(3)** $C$ を失うと、観測者の保持チャネルは

$$
\mathcal N_{AD}(\rho)
=\frac12\sum_a|a\rangle\langle a|_A
\otimes X^a\Delta_Z(\rho)X^a
$$

です。$\Delta_Z$ は計算基底での対角成分を保ち、非対角成分 $|0\rangle\langle1|$ を零へ写します。したがって $|+\rangle$ と $|-\rangle$ は同じ出力になり、未知状態の完全回復は不可能です。

[片方の鍵だけで起きる位相消失](#prop-bhi33-partial-key)で示したように、最大エンタングル入力も復号前に分離可能となります。そのため局所復号の忠実度の上界は $F_{\rm e}\le1/2$ です。$A$ に応じて $X^a$ を戻す回復器がその値を達成します。

**(4)** [鍵アクセス失敗率と回復忠実度](#prop-bhi33-flagged-access)の条件で、試行の成功・失敗を通知する直交フラグがあるので、成功枝の最適値1と失敗枝の最適値1/2を重み付けします。

$$
F_{\rm e}^{\rm opt}=(1-p)\cdot1+p\cdot\tfrac12=1-\tfrac p2.
$$

両枝それぞれで上界を達成する回復器があるため、これは単なる上界ではなく最適値です。

**(5)** [BHI30の条件付きisland則](../BHI30/index.md#prop-bhi30-conditional-island)は指定した模型と鞍点近似での $S(R)$ を、[BHI32のウェッジ](../BHI32/index.md#def-bhi32-radiation-wedge)は対応する幾何学的領域を与えます。本問(1)〜(4)は、それに加えて**論理コード空間、可視放射のテンソル因子、保持チャネル $\mathcal N$、基準状態、実行する回路、参照系付き誤差**を指定して初めて導けた結論です。重力レプリカのエントロピー数値だけでは、これらの入力データや回路の計算量は与えられません。従って有限符号の回復可能性をJT重力・四次元ブラックホールの無条件の復号主張へ移してはいけません。
<!-- solution-end -->

---

## 次講への接続

BHI34ではJT以外の二次元蒸発模型を比較します。BHI33で区別した「放射エントロピー」「符号としての再構成」「操作的な回復」を、異なる幾何や境界条件でも混同せず評価する準備ができました。
