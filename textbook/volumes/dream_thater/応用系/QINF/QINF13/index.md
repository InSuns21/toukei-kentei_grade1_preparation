# QINF13 テレポーテーションと超密符号化

## 1. エンタングルメントを「通信資源」として使う

[量子状態の複製不能](../QINF12/index.md#thm-qinf12-pure-no-cloning)を学びました。それでも、未知のqubitの状態を遠隔地のqubitへ**移す**ことはできます。また、あらかじめエンタングルメントを共有していれば、一個のqubitを送って二つの古典ビットを確実に伝えられます。ここでの違いは、入力を二つに増やすことと、事前に共有した相関を通信に使うことです。

本章で扱う系はすべて有限次元複素Hilbert空間です。$H_S,H_A,H_B\cong\mathbb C^2$ とし、$S$ はAliceが持つ未知の入力、$A$ はAliceの共有qubit、$B$ はBobの共有qubitとします。基底 $|0\rangle,|1\rangle$ は[qubitの計算基底](../QINF1/index.md#def-qinf1-qubit)です。$|\psi\rangle=\alpha|0\rangle+\beta|1\rangle$（$|\alpha|^2+|\beta|^2=1$）を未知の入力とします。「未知」は操作を $\alpha,\beta$ に応じて選べないという意味です。

二つの局所操作を基底上で定めます。

$$
X|0\rangle=|1\rangle,\quad X|1\rangle=|0\rangle,\qquad
Z|0\rangle=|0\rangle,\quad Z|1\rangle=-|1\rangle.
$$

$X^2=Z^2=I$、$ZX=-XZ$ です。また $H|0\rangle=(|0\rangle+|1\rangle)/\sqrt2$、$H|1\rangle=(|0\rangle-|1\rangle)/\sqrt2$ で定めるHadamard作用素は $H^\dagger H=I$ を満たします。例えば $H$ の列ベクトルは直交し、どちらも長さ1です。$X,Z,H$ は計算基底に関して具体的に定められたユニタリであり、以後テンソル積の左右に作用する場合は添字で区別します。

最初にAliceとBobが持つ資源を一つずつ数えましょう。[Schmidt分解](../QINF6/index.md#def-qinf6-schmidt)では、二qubitの純粋状態のエンタングルメントを二つの係数で確かめました。通信で使うBell対は、この係数が等しい特別な状態です。

<a id="def-qinf13-ebit"></a>

<!-- formal-statement-start -->
> **定義（Bell対と1 ebit）**  
> AliceとBobがそれぞれ一つのqubitを保有し、共有純粋状態のSchmidt係数が両方 $1/\sqrt2$ であるとき、その共有資源一組を **1 ebit** と数える。これは両者の局所ユニタリ変換で

$$
|\Phi^+\rangle_{AB}=\frac{|00\rangle+|11\rangle}{\sqrt2}
$$

> に移せることと同値である。この状態を本章の標準Bell対として使う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf13-ebit -->
### 定義の確認：共有対と積状態

**定義の確認**として、Schmidt係数と両側の縮約状態を計算します。

$|\Phi^+\rangle$ は計算基底で既にSchmidt表示になり、係数の二乗和は $1/2+1/2=1$。また[部分トレース](../QINF3/index.md#def-qinf3-partial-trace)でAliceかBobを無視すると $I_2/2$ になり、各側が混合状態です。これに対し $|00\rangle$ のSchmidt係数は $1,0$ で、一方の縮約は $|0\rangle\langle0|$ ですから1 ebitではありません。係数が等しい任意の二qubit純粋状態は、[Schmidt分解](../QINF6/index.md#thm-qinf6-existence)の二組の正規直交ベクトルを局所ユニタリで計算基底へ移せば、$|\Phi^+\rangle$ に変わります。
<!-- definition-example-end -->

AliceとBobが後でやり取りする古典ビット（cbit）と、送信するqubitとは別にebitを数えます。エンタングルメント単独では相手へ選んだメッセージを送れません。

## 2. Bell基底：二つのqubitをまとめて測る

テレポーテーションでは、Aliceは入力 $S$ と共有系 $A$ を別々に測るのでなく、二つを合わせた直交基底で測ります。これがBell測定です。後に超密符号化では、Bobが受け取った二qubitに同じ測定を行います。

<a id="def-qinf13-bell-basis"></a>

<!-- formal-statement-start -->
> **定義（Bell基底とBell測定）**  
> 二qubit系 $H\otimes H$ において、$a,b\in\{0,1\}$ に対し次の四ベクトルを **Bell基底** と呼ぶ。$W_{ab}=X^bZ^a$ と置き、右側のqubitに作用させる。

$$
|B_{ab}\rangle=(I\otimes W_{ab})|\Phi^+\rangle,
\qquad |\Phi^+\rangle=\frac{|00\rangle+|11\rangle}{\sqrt2}.
$$

> 各 $P_{ab}=|B_{ab}\rangle\langle B_{ab}|$ による四結果の射影測定を **Bell測定** と呼ぶ。結果は順序付きの二古典ビット $(a,b)$ で記録する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf13-bell-basis -->
### 定義の確認：四ベクトルと四つの効果

**定義の確認**として、四状態の規格化・直交性・測定の完全性を一つずつ調べます。

$Z$ が $|1\rangle$ の符号を反転し、$X$ が $0$ と $1$ を交換することから、基底の順序 $00,01,10,11$ を固定すると

$$
\begin{aligned}
|B_{00}\rangle&=(|00\rangle+|11\rangle)/\sqrt2,\\
|B_{01}\rangle&=(|01\rangle+|10\rangle)/\sqrt2,\\
|B_{10}\rangle&=(|00\rangle-|11\rangle)/\sqrt2,\\
|B_{11}\rangle&=(|01\rangle-|10\rangle)/\sqrt2.
\end{aligned}
$$

各ベクトルのノルム二乗は $(1+1)/2=1$ です。偶数パリティ（$00,11$）と奇数パリティ（$01,10$）は互いに直交し、同じパリティの $+$ と $-$ の内積は $(1-1)/2=0$。したがって四つは4次元空間の正規直交基底です。各 $P_{ab}$ は非負な射影で $\sum P_{ab}=I_4$、従って[POVMの条件](../QINF5/index.md#def-qinf5-povm)を満たします。これが定義の「測定」を本当に実現していることの確認です。
<!-- definition-example-end -->

<a id="prop-qinf13-bell-circuit"></a>

<!-- formal-statement-start -->
> **命題（Bell基底の準備と測定回路）**  
> 第一qubitを制御、第二qubitを標的とする制御NOTを $C$ とする。$E=C(H\otimes I)$、$D=(H\otimes I)C=E^\dagger$ と置けば、任意の $a,b\in\{0,1\}$ について

$$
E|ab\rangle=|B_{ab}\rangle,\qquad
D|B_{ab}\rangle=|ab\rangle.
$$

> よって、二qubitに $C$、第一qubitに $H$ を順に施し、計算基底で測ればBell測定ができる。
<!-- formal-statement-end -->

### 証明の見取り図

$H|a\rangle=(|0\rangle+(-1)^a|1\rangle)/\sqrt2$ から始め、$C|x,b\rangle=|x,b\oplus x\rangle$ を代入します。

<!-- proof-start -->
### 証明

$\oplus$ を2を法とする和とします。まず

$$
E|ab\rangle=\frac{|0,b\rangle+(-1)^a|1,b\oplus1\rangle}{\sqrt2}.
$$

$b=0$ なら $B_{a0}$、$b=1$ なら $B_{a1}$ の上記展開と一致します。$H$、$C$ はユニタリ、かつ $H^\dagger=H$、$C^\dagger=C$ なので $E^\dagger=(H\otimes I)C=D$。従って $D E|ab\rangle=|ab\rangle$ です。特にBell測定の確率は、$D$ 後の[計算基底射影測定](../QINF1/index.md#def-qinf1-local-projective)の確率に等しいことも従います。$\square$
<!-- proof-end -->

## 3. テレポーテーション：未知のqubitを移す

Aliceは $S$ と $A$ を保有し、Bobは $B$ を保有します。あらかじめ $AB$ にBell対が一つあります。Aliceが $SA$ のBell測定で得た **二古典ビット**をBobへ送り、Bobが結果に応じたユニタリ補正を行います。$S$ そのものは送らず、測定後のAlice側には元の未知の純粋状態のコピーも残しません。

<a id="def-qinf13-teleportation"></a>

<!-- formal-statement-start -->
> **定義（標準qubitテレポーテーション）**  
> 未知の入力qubit $S$ と共有Bell対 $AB$ を考える。Aliceは $SA$ にBell測定を行い、結果 $(a,b)$ を2 cbitでBobへ送る。Bobが系 $B$ に施す補正を

$$
U_{ab}=Z^aX^b
$$

> とする。この操作を標準qubitテレポーテーションという。成功とは、任意の入力密度演算子 $\rho_S$ に対し、各結果ごとの補正後のBobの状態が $\rho_S$ に一致することである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf13-teleportation -->
### 定義の確認：入力 $|0\rangle$ を一分岐ずつ追う

**定義の確認**として、各測定分岐の確率と補正が要求どおりか調べます。

$|0\rangle_S|\Phi^+\rangle_{AB}=(|000\rangle+|011\rangle)/\sqrt2$ です。$SA$ をBell基底に展開すると $B_{00},B_{10}$ の枝に $|0\rangle_B/2$、$B_{01},B_{11}$ の枝に $|1\rangle_B/2$ が出ます。各枝の確率は $1/4$、補正 $I,X,Z,ZX$ はそれぞれ $|0\rangle,|1\rangle,|0\rangle,|1\rangle$ を $|0\rangle$ へ戻します（$ZX|1\rangle=|0\rangle$）。計算基底の入力ではこれで四分岐を直接確かめました。一般入力を扱う恒等式を次に証明します。
<!-- definition-example-end -->

<a id="thm-qinf13-teleportation"></a>

<!-- formal-statement-start -->
> **定理（テレポーテーション恒等式と決定論的補正）**  
> 任意の単位ベクトル $|\psi\rangle_S=\alpha|0\rangle+\beta|1\rangle$ とBell対 $|\Phi^+\rangle_{AB}$ に対し、$W_{ab}=X^bZ^a$ と置くと、$SA|B$ という順序で

$$
|\psi\rangle_S|\Phi^+\rangle_{AB}
=\frac12\sum_{a,b=0}^1|B_{ab}\rangle_{SA}\otimes W_{ab}|\psi\rangle_B.
$$

> AliceのBell測定の各結果は確率 $1/4$ で、その結果に応じてBobが $U_{ab}=Z^aX^b=W_{ab}^{-1}$ を施すと、各結果で $B$ の出力は入力 $|\psi\rangle$ と一致する。同じ操作は任意のqubit密度演算子 $\rho_S$ にも成立する。
<!-- formal-statement-end -->

### 証明の見取り図

$SA$ の計算基底をBell基底に変え、四枝のBobの振幅を表にします。補正では $W_{ab}$ の積の順番を反転させることが重要です。

<!-- proof-start -->
### 証明

テンソル積の順序を $S,A,B$ と固定して、左辺を展開すると

$$
\frac1{\sqrt2}\bigl(\alpha|000\rangle+\alpha|011\rangle
+\beta|100\rangle+\beta|111\rangle\bigr).
$$

Bellベクトルとの $SA$ の内積を取り、まだ正規化していないBobの状態を計算します。

| 結果 $(a,b)$ | $\langle B_{ab}|_{SA}$ を作用させたBobのベクトル | $W_{ab}|\psi\rangle$ |
| --- | --- | --- |
| $00$ | $(\alpha|0\rangle+\beta|1\rangle)/2$ | $\alpha|0\rangle+\beta|1\rangle$ |
| $01$ | $(\beta|0\rangle+\alpha|1\rangle)/2$ | $\beta|0\rangle+\alpha|1\rangle$ |
| $10$ | $(\alpha|0\rangle-\beta|1\rangle)/2$ | $\alpha|0\rangle-\beta|1\rangle$ |
| $11$ | $(-\beta|0\rangle+\alpha|1\rangle)/2$ | $-\beta|0\rangle+\alpha|1\rangle$ |

四Bellベクトルは正規直交基底なので、この四つの射影成分の和が元の三系状態を与え、恒等式が成立します。$X,Z$ はユニタリで $\|\psi\|=1$ だから、枝のノルム二乗はどれも $1/4$ です。測定後のBobの正規化状態は $W_{ab}|\psi\rangle$ になります。

$$
U_{ab}W_{ab}=Z^aX^bX^bZ^a=I,
$$

ゆえに補正後は $|\psi\rangle$ です。密度演算子は[アンサンブル表示](../QINF2/index.md#def-qinf2-ensemble-density)により $\rho=\sum_jp_j|\psi_j\rangle\langle\psi_j|$ と書けます。各枝の非正規化出力写像は線形で、純粋射影上で $\rho\mapsto\frac14W_{ab}\rho W_{ab}^\dagger$ なので、混合状態にも同じ写像が成立します。補正後に $\frac14\rho$、四枝を足して $\rho$ となります。$\square$
<!-- proof-end -->

補正表を分けて読むと、Bell測定結果は秘密の振幅ではなく、**どのPauli補正を施すか**を指定する二ビットです。

| Aliceの結果 $(a,b)$ | 補正前のBob | Bobの補正 $U_{ab}$ |
| --- | --- | --- |
| $00$ | $|\psi\rangle$ | $I$ |
| $01$ | $X|\psi\rangle$ | $X$ |
| $10$ | $Z|\psi\rangle$ | $Z$ |
| $11$ | $XZ|\psi\rangle$ | $ZX$ |

### 古典通信より先にBobが状態を読めない理由

Bobが結果 $(a,b)$ を知らないなら四分岐を平均しなければなりません。これは[部分トレース](../QINF3/index.md#def-qinf3-partial-trace)でAliceの測定記録を無視することと対応します。

<a id="prop-qinf13-no-signalling"></a>

<!-- formal-statement-start -->
> **命題（テレポーテーションにおける通信前の縮約状態）**  
> 標準テレポーテーションでAliceのBell測定結果がBobへ届かない場合、任意の入力qubit密度演算子 $\rho$ に対して、Bobの無条件状態は

$$
\frac14\sum_{a,b=0}^1W_{ab}\rho W_{ab}^\dagger=\frac12I_2
$$

> であり、入力 $\rho$ に依存しない。従って共有Bell対とAliceの局所測定だけでは、Bobに古典メッセージも量子情報も送れない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\rho$ は自己共役でトレース1だから計算基底で $\rho=\begin{pmatrix}r&c\\\overline c&1-r\end{pmatrix}$ と表せます（正値性は状態として仮定）。$Z\rho Z$ は非対角成分だけを負にし、$X$ は対角成分を交換します。四つの項を二組に分ければ

$$
\begin{aligned}
\rho+Z\rho Z&=\operatorname{diag}(2r,2(1-r)),\\
X\rho X+XZ\rho ZX&=\operatorname{diag}(2(1-r),2r).
\end{aligned}
$$

両辺を足すと $2I_2$、$1/4$ を掛けて $I_2/2$ となります。Aliceの局所測定後に結果を無視する操作は[局所操作の無条件非シグナリング性](../QINF3/index.md#prop-qinf3-no-signalling)とも一致します。$\square$
<!-- proof-end -->

この仕組みは「未知の状態を瞬間的に送る」操作ではありません。Bobが補正を決められるのは古典メッセージを受け取った後です。Aliceの入力 $S$ はBell測定で不可逆に処理され、$S$ と $B$ の両方に未知の状態を残すことはありません。これは[複製不能定理](../QINF12/index.md#thm-qinf12-pure-no-cloning)と矛盾しません。

## 4. 超密符号化：共有Bell対と一つの送信qubit

今度は向きを変えます。Aliceは古典メッセージ $(a,b)$ をBobへ確実に伝えたいとします。事前にBell対 $AB$ を共有しているとき、Aliceが自分のqubit $A$ だけに四種類の局所ユニタリを施し、その **一個のqubit自体をBobへ送る** ことで、Bobは二ビットを復元できます。テレポーテーションと違い、この段階では古典通信を別途送りません。

<a id="def-qinf13-superdense"></a>

<!-- formal-statement-start -->
> **定義（標準超密符号化）**  
> AliceとBobがBell対を共有し、Aliceが二ビット $(a,b)$ を送りたいとする。Aliceは自分のqubitに次のユニタリを施す。

$$
U_{ab}=Z^aX^b,\qquad (a,b)\in\{0,1\}^2.
$$

> そのqubitを雑音のない量子通信路でBobへ送り、Bobは受け取ったqubitと手元のqubitにBell測定を行って二ビットを復元する。このプロトコルを標準超密符号化という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf13-superdense -->
### 定義の確認：メッセージ $11$ を符号化する

**定義の確認**として、局所符号化、Bell測定による復号、必要な通信資源を調べます。

$U_{11}=ZX$ だから $ZX|0\rangle=-|1\rangle$、$ZX|1\rangle=|0\rangle$。従って

$$
(ZX\otimes I)|\Phi^+\rangle
=\frac{-|10\rangle+|01\rangle}{\sqrt2}
=|B_{11}\rangle.
$$

前の[測定回路](#prop-qinf13-bell-circuit)で $D|B_{11}\rangle=|11\rangle$ なので、両qubitの計算基底測定は確率1で $11$ を返します。$U_{11}$ はユニタリ、Bell測定は射影の完全族、送信qubitは1個であることも直接確認できます。
<!-- definition-example-end -->

<a id="thm-qinf13-superdense"></a>

<!-- formal-statement-start -->
> **定理（標準超密符号化の完全復号）**  
> 理想的なBell対と、一個のqubitを雑音なく届ける量子通信路があるとする。Aliceがメッセージ $(a,b)$ を $U_{ab}=Z^aX^b$ で符号化した状態は

$$
(U_{ab}\otimes I)|\Phi^+\rangle=|B_{ab}\rangle
$$

> である。四状態が互いに直交するため、BobのBell測定で二古典ビットが誤りなく復元される。
<!-- formal-statement-end -->

### 証明の見取り図

Bell対の左右で作用する演算子の転置が対応することを二基底の和から示します。$ZX$ と $XZ$ の順序差もここで確かめます。

<!-- proof-start -->
### 証明

任意の $2\times2$ 行列 $M$ の成分を $M_{ij}=\langle i|M|j\rangle$ とすれば

$$
\begin{aligned}
(M\otimes I)|\Phi^+\rangle
&=\frac1{\sqrt2}\sum_{i,j=0}^1M_{ij}|i,j\rangle,\\
(I\otimes M^{\mathsf T})|\Phi^+\rangle
&=\frac1{\sqrt2}\sum_{j,i=0}^1(M^{\mathsf T})_{ji}|i,j\rangle
=\frac1{\sqrt2}\sum_{i,j=0}^1M_{ij}|i,j\rangle.
\end{aligned}
$$

従って両者は等しい。$X^{\mathsf T}=X$、$Z^{\mathsf T}=Z$ から $(Z^aX^b)^{\mathsf T}=X^bZ^a=W_{ab}$。したがって

$$
(U_{ab}\otimes I)|\Phi^+\rangle
=(I\otimes W_{ab})|\Phi^+\rangle
=|B_{ab}\rangle.
$$

[Bell基底の正規直交性](#def-qinf13-bell-basis)で $\langle B_{cd}|B_{ab}\rangle=\delta_{ac}\delta_{bd}$ ですから、BobのBell測定では正しい $(a,b)$ に確率1、他の結果に確率0です。$\square$
<!-- proof-end -->

誤りなく区別できる四状態を、送信qubit単体に詰めたわけではありません。送信時にはBobが既にもう一つのqubitを持っており、二つを合わせた空間の次元は $2\cdot2=4$ です。この空間で四状態を直交させています。$AB$ のBell対は通信後、二つともBobの手元に集まり、もはや遠隔共有のebitではありません。

<a id="prop-qinf13-unassisted-bound"></a>

<!-- formal-statement-start -->
> **命題（事前共有資源なしで一qubitを送る零誤り符号数）**  
> 事前共有の量子系がなく、Aliceがメッセージごとに一つのqubit密度演算子 $\rho_m$ をBobへ送り、Bobが一回のPOVMで有限個のメッセージを確率1で正しく識別するとする。このとき送れる異なるメッセージは高々2個である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

BobのPOVM効果を $E_m$ とし、$\sum_mE_m=I_2$、$E_m\ge0$ とします。成功率1とは $\operatorname{Tr}(E_m\rho_m)=1$、他メッセージ $n\ne m$ には $\operatorname{Tr}(E_m\rho_n)=0$ ということです。$0\le E_m\le I$ なので、$I-E_m\ge0$。密度演算子の正固有値に対応する正規直交固有ベクトル $v_i$ を使うと

$$
0=\operatorname{Tr}((I-E_m)\rho_m)
=\sum_i\lambda_i\langle v_i|(I-E_m)|v_i\rangle.
$$

各項は非負なので、$\lambda_i>0$ の全ての $v_i$ で期待値が0です。非負作用素の平方根を使えば $(I-E_m)v_i=0$、すなわち $E_mv_i=v_i$。同じく $\operatorname{Tr}(E_m\rho_n)=0$ から $E_mw=0$ が $\rho_n$ の台上で成立します。従って $v\in\operatorname{supp}\rho_m$、$w\in\operatorname{supp}\rho_n$ なら

$$
\langle v|w\rangle=\langle E_mv|w\rangle=\langle v|E_mw\rangle=0.
$$

互いに異なるメッセージの台は非零の直交部分空間です。二次元空間には二つより多くの非零直交部分空間は置けません。$\square$
<!-- proof-end -->

この命題は **零誤り・一回使用・事前共有なし** の条件付きの主張です。漸近的な通信容量や雑音路の最適符号化をここから一般化せず、後の量子Shannon理論で改めて扱います。

## 5. 二つのプロトコルの資源台帳

| 操作 | 最初の共有資源 | AliceからBobへ今回送るもの | 何が復元されるか |
| --- | --- | --- | --- |
| テレポーテーション | 1 ebit | 2 cbit | Bobに未知の1 qubit状態 |
| 超密符号化 | 1 ebit | 1 qubit | Bobに2 cbitのメッセージ |

テレポーテーションでは補正が終わると遠隔共有Bell対は消費されます。超密符号化でも片方のqubitを物理的に送り、遠隔共有の状態を使い切ります。いずれも初期ebitの**配布コストをただちに無料とは数えません**。上の台帳は「配布済みのBell対を出発点とした後の追加通信量」です。

これで第I部で学んだ[複合系](../QINF1/index.md#def-qinf1-composite)、[部分トレース](../QINF3/index.md#def-qinf3-partial-trace)、[測定](../QINF5/index.md#def-qinf5-povm)、[量子チャネル](../QINF7/index.md#def-qinf7-channel)が、一つの通信操作へつながりました。次のQINF14からは「どの局所操作と古典通信が許され、共有エンタングルメントをどこまで変換できるか」を体系的に調べます。

## 6. 演習：Bell測定と通信資源を手で数える

特記しなければ上記のBell基底の添字規約、$U_{ab}=Z^aX^b$、$W_{ab}=X^bZ^a$ を用い、通信と局所操作は理想的とします。

<a id="ex-qinf13-a01"></a>
### QINF13-A01 Bell基底の正規直交性

- Level: A

四つのBell状態を計算基底で展開し、$\langle B_{00}|B_{10}\rangle$、$\langle B_{01}|B_{11}\rangle$、$\langle B_{00}|B_{01}\rangle$ を求めよ。$\sum_{a,b}P_{ab}=I_4$ を説明せよ。

<!-- solution-start -->
### 詳細解答

[Bell基底とBell測定](#def-qinf13-bell-basis)の展開を使います。

$$
\begin{aligned}
B_{00}&=(|00\rangle+|11\rangle)/\sqrt2,\\
B_{10}&=(|00\rangle-|11\rangle)/\sqrt2,\\
B_{01}&=(|01\rangle+|10\rangle)/\sqrt2,\\
B_{11}&=(|01\rangle-|10\rangle)/\sqrt2.
\end{aligned}
$$

最初の二内積はそれぞれ $(1-1)/2=0$。三番目は $00,11$ と $01,10$ の計算基底が全て異なるので0。ノルムは四つとも1で、残る交差内積も同じパリティ分離で0です。4次元空間の四正規直交ベクトルは基底だから、任意の $v=\sum c_{ab}B_{ab}$ について $\sum P_{ab}v=\sum c_{ab}B_{ab}=v$。従って和は $I_4$ です。
<!-- solution-end -->

<a id="ex-qinf13-a02"></a>
### QINF13-A02 Bell測定の逆回路

- Level: A

入力 $|B_{11}\rangle$ に制御NOT $C$、続いて第一qubitに $H$ を作用させ、測定結果が $11$ になることを中間状態から示せ。

<!-- solution-start -->
### 詳細解答

$|B_{11}\rangle=(|01\rangle-|10\rangle)/\sqrt2$。[Bell測定回路](#prop-qinf13-bell-circuit)の $C$ は $|01\rangle\mapsto|01\rangle$、$|10\rangle\mapsto|11\rangle$ とするため、中間状態は $(|01\rangle-|11\rangle)/\sqrt2=| -\rangle\otimes|1\rangle$。$H|-\rangle=|1\rangle$ は $H^2=I$ と $|-\rangle=H|1\rangle$ から従い、最終状態は $|11\rangle$。計算基底測定の確率は $|\langle11|11\rangle|^2=1$ です。
<!-- solution-end -->

<a id="ex-qinf13-a03"></a>
### QINF13-A03 入力 $|1\rangle$ の四分岐

- Level: A

テレポーテーションの入力を $|1\rangle$ として、Bell測定の四結果それぞれについて、確率、補正前と補正後のBobの状態を求めよ。

<!-- solution-start -->
### 詳細解答

[テレポーテーション恒等式](#thm-qinf13-teleportation)で $\alpha=0,\beta=1$ とすると、Bobの規格化された枝は順に $|1\rangle,X|1\rangle=|0\rangle,Z|1\rangle=-|1\rangle,XZ|1\rangle=-|0\rangle$ です。各非規格化振幅には $1/2$ が付き、各確率は $1/4$ です。補正 $I,X,Z,ZX$ をかけると順に $|1\rangle,|1\rangle,|1\rangle,|1\rangle$ です。例えば最後は $ZX(-|0\rangle)=-ZX|0\rangle=|1\rangle$。中間の負号は全体位相としても観測されず、補正後の密度演算子は四枝全て $|1\rangle\langle1|$ です。
<!-- solution-end -->

<a id="ex-qinf13-a04"></a>
### QINF13-A04 超密符号化の四語表

- Level: A

入力メッセージ $00,01,10,11$ に対するAliceの局所ユニタリ、送信後のBell状態、BobのBell測定結果を表にせよ。

<!-- solution-start -->
### 詳細解答

[超密符号化定理](#thm-qinf13-superdense)の $U_{ab}=Z^aX^b$ を逐一代入します。

| メッセージ | Aliceの $U_{ab}$ | 送信後の状態 | Bobの結果 |
| --- | --- | --- | --- |
| $00$ | $I$ | $(|00\rangle+|11\rangle)/\sqrt2=B_{00}$ | $00$ |
| $01$ | $X$ | $(|10\rangle+|01\rangle)/\sqrt2=B_{01}$ | $01$ |
| $10$ | $Z$ | $(|00\rangle-|11\rangle)/\sqrt2=B_{10}$ | $10$ |
| $11$ | $ZX$ | $(|01\rangle-|10\rangle)/\sqrt2=B_{11}$ | $11$ |

四状態は互いに直交するため、他の結果の確率は0、正しい結果の確率は1です。$11$ で $XZ$ を使うと全体符号が変わるだけですが、一般の積順を固定して $ZX$ と書くことが補正表との整合に重要です。
<!-- solution-end -->

<a id="ex-qinf13-b01"></a>
### QINF13-B01 複素振幅を持つ入力のテレポーテーション

- Level: B

$|\psi\rangle=(|0\rangle+i|1\rangle)/\sqrt2$ のテレポーテーションで、結果 $10$ と $11$ について、非正規化枝、測定確率、Bobの補正後の状態を計算せよ。

<!-- solution-start -->
### 詳細解答

$\alpha=1/\sqrt2,\beta=i/\sqrt2$ を[恒等式](#thm-qinf13-teleportation)に入れます。結果 $10$ の枝は $Z|\psi\rangle/2=(|0\rangle-i|1\rangle)/(2\sqrt2)$。ノルム二乗は $(1+1)/8=1/4$。正規化して $Z$ を補正として作用させると $Z(|0\rangle-i|1\rangle)/\sqrt2=(|0\rangle+i|1\rangle)/\sqrt2$ です。

結果 $11$ の枝は $XZ|\psi\rangle/2=(-i|0\rangle+|1\rangle)/(2\sqrt2)$。これも確率1/4。$ZX$ を作用させると、まず $X(-i|0\rangle+|1\rangle)=|0\rangle-i|1\rangle$、次に $Z$ を施して $(|0\rangle+i|1\rangle)/\sqrt2$。単に $XZ$ をもう一度掛ければ $(XZ)^2=-I$ となり、同じ密度演算子でもベクトルに全体位相 $-$ が付くため、逆作用素が $ZX$ であることを区別します。
<!-- solution-end -->

<a id="ex-qinf13-b02"></a>
### QINF13-B02 なぜ結果を送る必要があるか

- Level: B

$\rho=\begin{pmatrix}3/4&1/4\\1/4&1/4\end{pmatrix}$ を入力として、通信前のBobの四分岐を平均した密度演算子を求めよ。Aliceが入力を $|0\rangle\langle0|$ に変更しても通信前のBobが区別できない理由を説明せよ。

<!-- solution-start -->
### 詳細解答

与えられた行列は自己共役でトレース1、行列式は $3/16-1/16=1/8>0$ だから正値です。$Z\rho Z$ は非対角成分の符号を反転するので

$$
\rho+Z\rho Z=\operatorname{diag}(3/2,1/2).
$$

残りの $X\rho X+XZ\rho ZX$ は、上の和を $X$ で挟んだ $\operatorname{diag}(1/2,3/2)$ です。全四枝を $1/4$ で平均すれば $(2I_2)/4=I_2/2$。$|0\rangle\langle0|$ についても [テレポーテーションにおける通信前の縮約状態](#prop-qinf13-no-signalling) により同じ $I_2/2$ です。Bobの任意のPOVMで結果分布は $\operatorname{Tr}(E_m I_2/2)$ と等しく、入力依存性がありません。二古典ビット到着前に復号することはできません。
<!-- solution-end -->

<a id="ex-qinf13-b03"></a>
### QINF13-B03 一qubitだけで四語を送れない理由

- Level: B

事前共有がないとする。Aliceが $|0\rangle,|1\rangle,|+\rangle,|-\rangle$ の四つの純粋状態から一つ選んで送る方法で、Bobがそれを零誤りで識別できるか。一般の二次元零誤り符号数界とも比較せよ。

<!-- solution-start -->
### 詳細解答

$\langle0|+\rangle=1/\sqrt2\ne0$ なので、二つの候補 $|0\rangle,|+\rangle$ だけでも直交しません。零誤り識別を仮定すると、対応するPOVM効果 $E_0$ は $|0\rangle$ には恒等的に、$|+\rangle$ には零として作用するはずです。しかし自己共役性から

$$
\langle0|+\rangle
=\langle E_0 0|+\rangle
=\langle0|E_0+\rangle=0
$$

となって矛盾します。[一qubit零誤り符号数界](#prop-qinf13-unassisted-bound)は混合入力や一般POVMでも高々2語と述べています。Bell対を共有する超密符号化ではBobの受信後のHilbert空間が4次元となり、事前共有なしという仮定が変わるため四語を識別できます。
<!-- solution-end -->

<a id="ex-qinf13-b04"></a>
### QINF13-B04 Bell資源の位相誤りが伝送へ及ぼす影響

- Level: B

AliceとBobの資源が $|\Phi^+\rangle$ の代わりに、確率 $p$ で $|\Phi^+\rangle$、確率 $1-p$ で $|\Phi^-\rangle=|B_{10}\rangle$ という混合状態（$0\le p\le1$）だったとする。標準テレポーテーションの操作と補正をそのまま使うと、任意の入力密度演算子 $\rho$ はどの状態へ写るか。

<!-- solution-start -->
### 詳細解答

$|\Phi^-\rangle_{AB}=(I_A\otimes Z_B)|\Phi^+\rangle_{AB}$ です。Aliceの $SA$ 測定は $B$ 上の $Z$ と交換します。従って結果 $(a,b)$ では、Bob側に標準の場合の $W_{ab}|\psi\rangle$ の代わりに $ZW_{ab}|\psi\rangle$ が現れます。Bobが通常の逆補正をかけると

$$
U_{ab}ZW_{ab}|\psi\rangle
=W_{ab}^{-1}ZW_{ab}|\psi\rangle
=(-1)^bZ|\psi\rangle.
$$

最後の等号は $Z$ が $X$ と反交換し、$Z$ と可換であることから従います。結果に依存するのは全体位相だけで、密度演算子は $Z\rho Z$ になります。$|\Phi^+\rangle$ の枝では [テレポーテーション恒等式と決定論的補正](#thm-qinf13-teleportation) より $\rho$ です。入力状態と資源状態についてのチャネルの線形性により、無条件の出力は

$$
\mathcal N_p(\rho)=p\rho+(1-p)Z\rho Z.
$$

$\rho=\begin{pmatrix}r&c\\\overline c&1-r\end{pmatrix}$ なら対角成分は変わらず、非対角成分は $(2p-1)c$ になります。$p=1$ で恒等チャネル、$p=1/2$ で完全な位相消失、$p=0$ で決定論的 $Z$ 誤りです。成功率1の標準定理には**理想的な資源Bell対**が必要であることが分かります。
<!-- solution-end -->

<a id="ex-qinf13-c01"></a>
### QINF13-C01 双方向通信を設計して資源を数える

- Level: C

Aliceが二古典ビット $m=(a,b)$ をBobへ送り、その後Bobが未知のqubit $|\varphi\rangle$ をAliceへ移したい。共有Bell対は二組 $A_1B_1,A_2B_2$ とし、他の遠隔共有資源はない。超密符号化とテレポーテーションを順に利用する具体的操作を示せ。古典通信・量子通信・消費ebitを方向別に数え、第二段階でAliceが古典メッセージを受け取る前にはBobの未知入力について情報を得られないこと、および複製不能との関係を説明せよ。

<!-- solution-start -->
### 詳細解答

第一段階では $A_1B_1$ を標準Bell対とし、Aliceが $A_1$ に局所ユニタリ $U_{ab}=Z^aX^b$ をかけます。[標準超密符号化の完全復号](#thm-qinf13-superdense) により全系は $|B_{ab}\rangle_{A_1B_1}$ です。Aliceは $A_1$ を一個Bobへ量子送信します。Bobが手元に集まった二qubitにBell測定を行うと、確率1で $m=(a,b)$ を得ます。この段階では **1 qubit** と最初の共有 **1 ebit** を使い、古典通信は不要です。

第二段階では残る $A_2B_2$ のBell対を使います。Bobが未知入力 $S$ と $B_2$ にBell測定を行い、結果 $(c,d)$ をAliceへ **2 cbit** 送ります。送受信者の役割を入れ替えて [テレポーテーション恒等式と決定論的補正](#thm-qinf13-teleportation) を使うと、Alice側の条件付き状態は

$$
X^dZ^c|\varphi\rangle_{A_2}.
$$

Aliceが $Z^cX^d$ を施すと $|\varphi\rangle$ が復元されます。この段階で第二の **1 ebit** を消費します。

総計は事前共有 **2 ebit**、Alice $\to$ Bob **1 qubit**、Bob $\to$ Alice **2 cbit**、それ以外の送信なしです。二段階目にBobが結果を送る前のAliceの状態は、[無条件縮約の命題](#prop-qinf13-no-signalling)で $I_2/2$。従って未知入力の振幅はまだ読めません。Bobの入力系はBell測定によって元の状態のコピーとして残らず、Aliceに移すのは一つの量子状態だけです。[複製不能定理](../QINF12/index.md#thm-qinf12-pure-no-cloning)と矛盾しません。第一段階の古典ビットは量子通信で運び、第二段階の未知qubitは古典通信と事前エンタングルメントで移した、という方向別の交換関係を区別することが要点です。
<!-- solution-end -->

