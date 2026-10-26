# QINF8 Stinespring表現と相補チャネル

[QINF7のKraus表示](../QINF7/index.md#def-qinf7-kraus)では、雑音を受けた系の状態を、複数の行列作用の和として記述しました。振幅減衰で $|1\rangle$ が $|0\rangle$ へ移ると、出力側だけを見れば「どの過程でそうなったのか」は区別できません。では、消えた励起や位相の情報はどこへ行ったのでしょうか。

系だけの操作が不可逆に見えても、環境系を合わせた大きな系では内積を保存するように記述できます。環境を捨てれば通常のチャネル、逆に出力を捨てれば**環境が受け取る情報**を表すチャネルになります。この二つの見方を同じ等長写像から構成するのが本章の目標です。

以下、入力を $A$、出力を $B$、環境を $E$ と呼び、$H_A,H_B,H_E$ はいずれも正の有限次元を持つ複素Hilbert空間とします。$L(H)$ は $H$ 上の線形作用素、$\dagger$ は随伴、$I_H$ は単位作用素です。テンソル積の順序は常に $B\otimes E$ とし、[QINF3の部分トレース](../QINF3/index.md#def-qinf3-partial-trace)で捨てる系を添字に書きます。

## 1. 一つの入力から出力と環境を作る

まず、[QINF7第4.3節の振幅減衰](../QINF7/index.md)を手がかりにします。緩和率を $0\le\gamma\le1$ とし、$H_A=H_B=H_E=\mathbb C^2$ で

$$
\begin{aligned}
|0\rangle_A&\longmapsto|0\rangle_B|0\rangle_E,\\
|1\rangle_A&\longmapsto
\sqrt{1-\gamma}|1\rangle_B|0\rangle_E
+\sqrt\gamma|0\rangle_B|1\rangle_E
\end{aligned}
$$

と対応させます。右辺の第一式のノルムは1、第二式のノルムの二乗は $(1-\gamma)+\gamma=1$ です。また二つの像は直交します。従って、二つの基底ベクトルの内積がそのまま保存され、線形に延長した写像 $V:H_A\to H_B\otimes H_E$ もすべてのベクトルの内積を保存します。

このような写像を使えば、環境の状態を明示しながら雑音を記述できます。[QINF4で使った等長写像](../QINF4/index.md#thm-qinf4-isometric-freedom)と同じ条件 $V^\dagger V=I$ が働きますが、今回は写像の行き先を出力系と環境系に分けます。

<a id="def-qinf8-isometry"></a>

<!-- formal-statement-start -->
> **定義（Stinespring等長写像と環境系）**
> 有限次元複素Hilbert空間 $H_A,H_B,H_E$ に対し、線形写像 $V:H_A\to H_B\otimes H_E$ が

$$
V^\dagger V=I_{H_A}
$$

> を満たすとき、$V$ を**Stinespring等長写像**、$E$ をその**環境系**と呼ぶ。写像 $V$ によって作る出力側の写像は

$$
\Phi_V(X)=\operatorname{Tr}_E(VXV^\dagger)
\qquad (X\in L(H_A))
$$

> である。この等長写像と部分トレースによる表示を **Stinespring表現** と呼ぶ。
<!-- formal-statement-end -->

定義の第一条件は「ユニタリ作用素」と同じではありません。$\dim H_A\le\dim H_B\dim H_E$ が必要で、特に出力側の次元が大きければ $VV^\dagger$ は像への射影であり、$I_{H_B\otimes H_E}$ に等しいとは限りません。任意の $x,y\in H_A$ について

$$
\langle Vx,Vy\rangle
=\langle x,V^\dagger Vy\rangle
=\langle x,y\rangle
$$

だから、入力ベクトルの正規化と重ね合わせの内積の両方が保存されます。

<!-- definition-example-start: def-qinf8-isometry -->
### 定義の確認：振幅減衰の二つの基底

**定義の確認**として、上の対応を線形に延長した $V$ を調べます。出力と環境の計算基底を $|b\rangle_B|e\rangle_E$ と書き、二つの像を $v_0,v_1$ とすると、

$$
\langle v_0,v_0\rangle=1,\qquad
\langle v_1,v_1\rangle=1,\qquad
\langle v_0,v_1\rangle=0.
$$

従って $\langle i|V^\dagger V|j\rangle=\delta_{ij}$（$i,j\in\{0,1\}$）であり $V^\dagger V=I_A$ です。さらに $\rho=|1\rangle\langle1|$ に対する $V\rho V^\dagger=|v_1\rangle\langle v_1|$ では、交差項は環境基底の内積 $\langle0|1\rangle=0$ により $\operatorname{Tr}_E$ で消え、

$$
\operatorname{Tr}_E(V\rho V^\dagger)
=(1-\gamma)|1\rangle\langle1|
+\gamma|0\rangle\langle0|.
$$

これはQINF7第4.3節の振幅減衰の出力で直接計算したものと一致します。二つの枝の確率は、環境を捨てる操作によって一つの混合状態に合流しました。
<!-- definition-example-end -->

## 2. すべての量子チャネルに環境表示がある

直前の例では $V$ を先に作りました。一般の量子チャネルに対しては、[有限次元完全正写像のKraus表示](../QINF7/index.md#thm-qinf7-kraus-existence)から逆向きに $V$ を作れます。Kraus作用素の添字を、環境の正規直交基底の添字として使うのが要点です。

<a id="thm-qinf8-stinespring"></a>

<!-- formal-statement-start -->
> **定理（有限次元Stinespring表現）**
> 有限次元複素Hilbert空間 $H_A,H_B$ 間の複素線形写像 $\Phi:L(H_A)\to L(H_B)$ について、次は同値である。
>
> 1. $\Phi$ は完全正でトレース保存、すなわち量子チャネルである。
> 2. ある有限次元環境 $H_E$ と等長写像 $V:H_A\to H_B\otimes H_E$ が存在し、すべての $X\in L(H_A)$ について

$$
\Phi(X)=\operatorname{Tr}_E(VXV^\dagger)
$$

> が成り立つ。
>
> 特に $\Phi(X)=\sum_{\alpha=1}^rK_\alpha XK_\alpha^\dagger$ かつ $\sum_\alpha K_\alpha^\dagger K_\alpha=I_A$ なら、$H_E=\mathbb C^r$ として

$$
V|\psi\rangle
=\sum_{\alpha=1}^r K_\alpha|\psi\rangle\otimes|\alpha\rangle_E
$$

> と構成できる。$r\le(\dim H_A)(\dim H_B)$ に取れる。
<!-- formal-statement-end -->

### 証明の見取り図

Kraus作用素の完全性関係を $V^\dagger V$ に代入して内積保存を確認します。環境基底で部分トレースを取れば添字が $\alpha=\beta$ の項だけ残ってKraus和になります。逆向きには、環境基底で $V$ の成分を取り出すとKraus作用素が得られます。

<!-- proof-start -->
### 証明

**1から2へ。** $\Phi$ がチャネルなら、[有限次元完全正写像のKraus表示](../QINF7/index.md#thm-qinf7-kraus-existence)により、$K_\alpha:H_A\to H_B$（$1\le\alpha\le r$）を上のように取れます。$|\alpha\rangle_E$ を $\mathbb C^r$ の正規直交基底とすると、任意の $x,y\in H_A$ に対して

$$
\begin{aligned}
\langle Vx,Vy\rangle
&=\sum_{\alpha,\beta}
\langle K_\alpha x,K_\beta y\rangle
\langle\alpha|\beta\rangle\\
&=\sum_\alpha\langle x,K_\alpha^\dagger K_\alpha y\rangle\\
&=\langle x,I_Ay\rangle=\langle x,y\rangle.
\end{aligned}
$$

ゆえに $V^\dagger V=I_A$ です。入力行列 $X$ に対して、線形性から

$$
VXV^\dagger
=\sum_{\alpha,\beta}
K_\alpha X K_\beta^\dagger\otimes
|\alpha\rangle\langle\beta|_E.
$$

ここで [部分トレースの定義](../QINF3/index.md#def-qinf3-partial-trace)を環境基底に適用すると、

$$
\begin{aligned}
\operatorname{Tr}_E(VXV^\dagger)
&=\sum_{\alpha,\beta}K_\alpha XK_\beta^\dagger
\operatorname{Tr}(|\alpha\rangle\langle\beta|)\\
&=\sum_{\alpha,\beta}K_\alpha XK_\beta^\dagger\delta_{\alpha\beta}\\
&=\sum_\alpha K_\alpha XK_\alpha^\dagger=\Phi(X).
\end{aligned}
$$

**2から1へ。** $V$ と環境正規直交基底 $|\alpha\rangle_E$ が与えられたとします。環境の係数を取り出す線形作用素

$$
K_\alpha=(I_B\otimes\langle\alpha|_E)V:H_A\to H_B
$$

を作ると、$V=\sum_\alpha K_\alpha\otimes|\alpha\rangle_E$ です。上と同じ展開から $\Phi(X)=\sum_\alpha K_\alpha XK_\alpha^\dagger$ を得ます。また

$$
\sum_\alpha K_\alpha^\dagger K_\alpha
=V^\dagger\bigl(I_B\otimes\sum_\alpha|\alpha\rangle\langle\alpha|\bigr)V
=V^\dagger V=I_A.
$$

[Kraus表示の完全正値性とトレース保存条件](../QINF7/index.md#thm-qinf7-kraus-cptp)によって $\Phi$ はチャネルです。$r$ の上界は引用した存在定理の上界です。$\square$
<!-- proof-end -->

この定理は「環境が物理的にどの粒子であるか」を一意に定めるものではありません。しかし**任意の有限次元CPTP写像を、環境を含めた内積保存操作と、環境を捨てる操作とに分解できる**ことを保証します。環境基底のラベル $\alpha$ は、ここでは数学的な直交方向であり、必ずしも実験装置で読み出した測定結果ではありません。

<a id="ex-qinf8-reset-isometry"></a>
### 出力が一定でも環境は情報を持てる

$H_A=H_B=H_E=\mathbb C^2$ として

$$
V|0\rangle=|0\rangle_B|0\rangle_E,\qquad
V|1\rangle=|0\rangle_B|1\rangle_E
$$

を取ると、両像は直交して $V^\dagger V=I_A$ です。一般の $X=\sum_{i,j}x_{ij}|i\rangle\langle j|$ では

$$
VXV^\dagger
=|0\rangle\langle0|_B\otimes
\sum_{i,j}x_{ij}|i\rangle\langle j|_E,
$$

よって出力側は $\Phi(X)=(\operatorname{Tr}X)|0\rangle\langle0|$ となる一方、環境側にはそのまま $X$ が残ります。入力に関係なく出力が同じなのは、全系から入力情報が消滅したという意味ではありません。

### ユニタリ時間発展との関係

等長写像は、同次元の入出力系なら環境を初め $|0\rangle_E$ に準備するユニタリ操作としても実現できます。これは単に「任意の等長写像はユニタリ」と言い換えるものではなく、部分空間上の等長写像を**全空間上で拡張する**操作です。

<a id="prop-qinf8-unitary-extension"></a>

<!-- formal-statement-start -->
> **命題（同次元入出力におけるユニタリ拡張）**
> 有限次元 $H_A,H_B,H_E$ が $\dim H_A=\dim H_B$ を満たし、$V:H_A\to H_B\otimes H_E$ が等長写像であるとする。任意の単位ベクトル $|0\rangle_E$ に対し、ユニタリ写像 $U:H_A\otimes H_E\to H_B\otimes H_E$ が存在して、すべての $|\psi\rangle\in H_A$ に対して

$$
U(|\psi\rangle\otimes|0\rangle_E)=V|\psi\rangle
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

入力側の $H_A\otimes|0\rangle_E$ の正規直交基底を、$V$ によって出力側の正規直交系へ送ります。全体の次元が等しいため、双方で残りのベクトルを補って基底間のユニタリ写像を作れます。

<!-- proof-start -->
### 証明

$H_A$ の正規直交基底を $|a_i\rangle$（$1\le i\le d_A$）とします。$|a_i\rangle\otimes|0\rangle_E$ は $H_A\otimes H_E$ 内の正規直交系です。$V^\dagger V=I_A$ から $\langle Va_i,Va_j\rangle=\delta_{ij}$ なので、像 $Va_i$ も $H_B\otimes H_E$ 内の正規直交系です。

双方の全次元は $d_A d_E=d_Bd_E$ で等しいため、それぞれの正規直交系を同数のベクトルで正規直交基底に拡張できます。第 $i$ 基底を第 $i$ 基底へ送る線形写像 $U$ は全基底の内積を保ち、逆写像も持つのでユニタリです。$H_A\otimes|0\rangle_E$ の上で $U$ は $V$ と一致し、線形性から任意の $|\psi\rangle$ について結論を得ます。$\square$
<!-- proof-end -->

入出力の次元が異なれば、$H_A\otimes H_E$ と $H_B\otimes H_E$ の全次元が異なるため、この命題の形のユニタリ写像は作れません。補助系を増やした別のユニタリ模型を考える余地はありますが、上の式の次元条件を黙って削ることはできません。

## 3. 出力ではなく環境を残す

[部分トレース](../QINF3/index.md#def-qinf3-partial-trace)では、どちらの部分系を捨てるかを選べました。Stinespring等長写像の後で環境 $E$ を捨てる代わりに出力 $B$ を捨てれば、環境に残る状態が得られます。これによって、雑音を受けた受信者が「何を失うか」と、環境が「何を得るか」を同じ式から調べられます。

<a id="def-qinf8-complement"></a>

<!-- formal-statement-start -->
> **定義（相補チャネル）**
> 有限次元複素Hilbert空間 $H_A,H_B,H_E$ と等長写像 $V:H_A\to H_B\otimes H_E$ により量子チャネル $\Phi(X)=\operatorname{Tr}_E(VXV^\dagger)$ が表されているとする。写像

$$
\widetilde\Phi_V(X)
=\operatorname{Tr}_B(VXV^\dagger)
\quad(X\in L(H_A))
$$

> を、表現 $V$ に対応する **相補チャネル**（complementary channel）と呼ぶ。出力空間は $H_E$ である。
<!-- formal-statement-end -->

ここでの「相補」は $I-\Phi$ のような差ではありません。同じ $B\otimes E$ の状態の、もう一方の縮約という意味です。相補チャネルは環境の選び方に依存しうるため、記号に $V$ を添えています。

<!-- definition-example-start: def-qinf8-complement -->
### 定義の確認：リセットの環境は入力を保持する

**定義の確認**として、[前節のリセット等長写像](#ex-qinf8-reset-isometry)を使います。任意の密度演算子 $\rho$ について、前節で導いた積の形から

$$
\operatorname{Tr}_B(V\rho V^\dagger)
=\operatorname{Tr}(|0\rangle\langle0|_B)\,\rho_E
=\rho_E
$$

です。環境を入力の計算基底と同一視すれば $\widetilde\Phi_V(\rho)=\rho$、一方で $\Phi(\rho)=|0\rangle\langle0|$ です。相補側も正値・トレース1を保ちますが、保持している情報は受信者と正反対です。
<!-- definition-example-end -->

### Kraus作用素から環境の行列を求める

環境の $\alpha$ 行 $\beta$ 列は、$VXV^\dagger$ の環境成分を出力空間 $B$ でトレースしたものです。Kraus作用素 $K_\alpha:H_A\to H_B$ の積を使えば、その成分を手で計算できます。

<a id="prop-qinf8-complement-matrix"></a>

<!-- formal-statement-start -->
> **命題（相補チャネルの行列成分とチャネル性）**
> 有限次元複素Hilbert空間で $\sum_{\alpha=1}^rK_\alpha^\dagger K_\alpha=I_A$ を満たす $K_\alpha:H_A\to H_B$ を取り、$V=\sum_\alpha K_\alpha\otimes|\alpha\rangle_E$ とする。環境の正規直交基底 $|\alpha\rangle_E$ について、相補写像の行列成分は

$$
\langle\alpha|\widetilde\Phi_V(X)|\beta\rangle
=\operatorname{Tr}_B(K_\alpha X K_\beta^\dagger)
=\operatorname{Tr}_A(XK_\beta^\dagger K_\alpha)
$$

> である。$\widetilde\Phi_V:L(H_A)\to L(H_E)$ は完全正でトレース保存である。
<!-- formal-statement-end -->

### 証明の見取り図

$VXV^\dagger$ の二重和の環境 $(\alpha,\beta)$ 成分を取り、$B$ のトレースを取ります。また出力の基底を一つ固定すると、その基底方向へ射影した係数が相補写像のKraus作用素になります。

<!-- proof-start -->
### 証明

[Stinespring構成](#thm-qinf8-stinespring)で既に確かめた展開

$$
VXV^\dagger
=\sum_{\mu,\nu} K_\mu X K_\nu^\dagger\otimes|\mu\rangle\langle\nu|_E
$$

を使います。$\langle\alpha|\cdot|\beta\rangle$ を環境側へ作用させると、$\mu=\alpha,\nu=\beta$ だけ残ります。続いて $B$ をトレースすれば第一の等式を得ます。第二の等式は矩形行列にも使えるトレースの循環性によります。入出力の空間の違いは基底成分で確かめます。入力基底 $|i\rangle_A$ と出力基底 $|b\rangle_B$ に対し、$X_{ij}=\langle i|X|j\rangle$ とおけば

$$
\begin{aligned}
\operatorname{Tr}_B(K_\alpha X K_\beta^\dagger)
&=\sum_{b,i,j}\langle b|K_\alpha|i\rangle X_{ij}
  \langle j|K_\beta^\dagger|b\rangle\\
&=\sum_{i,j}X_{ij}\langle j|K_\beta^\dagger K_\alpha|i\rangle
=\operatorname{Tr}_A(XK_\beta^\dagger K_\alpha).
\end{aligned}
$$

完全正値性のため、$H_B$ の正規直交基底 $|b\rangle$（$1\le b\le d_B$）を選び、

$$
L_b=(\langle b|_B\otimes I_E)V:H_A\to H_E
$$

と定めます。$V=\sum_b|b\rangle_B\otimes L_b$ という表示から

$$
\widetilde\Phi_V(X)=\sum_b L_b X L_b^\dagger
$$

が従います。さらに

$$
\sum_b L_b^\dagger L_b
=V^\dagger\bigl(\sum_b|b\rangle\langle b|_B\otimes I_E\bigr)V
=V^\dagger V=I_A.
$$

従って [Krausの完全正値性・トレース保存条件](../QINF7/index.md#thm-qinf7-kraus-cptp)から $\widetilde\Phi_V$ はチャネルです。$\square$
<!-- proof-end -->

この証明では「環境が持つ情報」を計算するために、まず $K_\beta^\dagger K_\alpha$ という入力空間上の作用素に戻しています。例えば環境の非対角成分は、異なるKraus枝の干渉項に対応します。枝番号を古典的な確率変数と同一視すると、この非対角成分を不当に消してしまいます。

## 4. 振幅減衰では何が環境へ移るか

振幅減衰のKraus作用素を、[QINF7第4.3節の具体例](../QINF7/index.md)と同じ規約で

$$
K_0=\begin{pmatrix}1&0\\0&\sqrt{1-\gamma}\end{pmatrix},
\qquad
K_1=\begin{pmatrix}0&\sqrt\gamma\\0&0\end{pmatrix},
\qquad 0\le\gamma\le1
$$

とします。入力の密度演算子は

$$
\rho=\begin{pmatrix}a&b\\\overline b&d\end{pmatrix},
\quad a,d\ge0,\quad a+d=1,\quad |b|^2\le ad
$$

です。これは入力の計算基底 $|0\rangle,|1\rangle$ による表示です。[密度演算子の定義](../QINF2/index.md#def-qinf2-ensemble-density)の自己共役性は非対角成分 $b,\overline b$ に、トレース1は $a+d=1$ に対応します。

正半定値性については、基底ベクトルで二次形式を評価すると $a,d\ge0$ が必要です。また、自己共役行列は正規行列なので[LA5の複素正規作用素のスペクトル定理](../../../基礎科目/LA/LA5/index.md#thm-la5-normal-spectral)を適用できます。固有値は実数で、その和と積は

$$
\lambda_1+\lambda_2=a+d=1>0,\qquad
\lambda_1\lambda_2=ad-|b|^2
$$

です。従って $ad-|b|^2\ge0$ は非負固有値の必要十分条件となり、表示に課した条件と元の密度演算子の条件が対応します。

[相補チャネルの行列成分](#prop-qinf8-complement-matrix)に代入すると、対角成分は

$$
\begin{aligned}
\operatorname{Tr}(K_0\rho K_0^\dagger)&=a+(1-\gamma)d,\\
\operatorname{Tr}(K_1\rho K_1^\dagger)&=\gamma d,
\end{aligned}
$$

非対角成分は $K_1^\dagger=\sqrt\gamma|1\rangle\langle0|$ を用いて

$$
\begin{aligned}
\operatorname{Tr}(K_0\rho K_1^\dagger)
&=\sqrt\gamma\operatorname{Tr}
\bigl((K_0\rho|1\rangle)\langle0|\bigr)\\
&=\sqrt\gamma\langle0|K_0\rho|1\rangle
=\sqrt\gamma\,b
\end{aligned}
$$

です。これをまとめると

$$
\widetilde{\mathcal A}_{\gamma}(\rho)
=\begin{pmatrix}
a+(1-\gamma)d&\sqrt\gamma\,b\\
\sqrt\gamma\,\overline b&\gamma d
\end{pmatrix}.
$$

この式は元の振幅減衰出力

$$
\mathcal A_\gamma(\rho)
=\begin{pmatrix}
a+\gamma d&\sqrt{1-\gamma}\,b\\
\sqrt{1-\gamma}\,\overline b&(1-\gamma)d
\end{pmatrix}
$$

で $\gamma$ を $1-\gamma$ に置き換えた形です。

<a id="prop-qinf8-amplitude-complement"></a>

<!-- formal-statement-start -->
> **命題（振幅減衰の相補チャネル）**
> $0\le\gamma\le1$ とし、$H_A=H_B=H_E=\mathbb C^2$ に上記 $K_0,K_1$ から作ったStinespring表現を取る。環境の基底を $|0\rangle_E,|1\rangle_E$ とすると、任意の $X\in L(\mathbb C^2)$ について

$$
\widetilde{\mathcal A}_\gamma(X)=\mathcal A_{1-\gamma}(X)
$$

> が成り立つ。特に $\gamma=0$ では環境出力は入力に依存せず、$\gamma=1$ では系の出力が一定で環境側が入力をそのまま受け取る。
<!-- formal-statement-end -->

### 証明の見取り図

入力行列の四つの行列単位を基底として、直前の一般行列の計算を照合します。端点では緩和が起きない場合と、必ず起きる場合を区別します。

<!-- proof-start -->
### 証明

一般の複素行列 $X=\begin{pmatrix}x_{00}&x_{01}\\x_{10}&x_{11}\end{pmatrix}$ に対しても、上の積とトレースの計算は線形に成立します。従って

$$
\widetilde{\mathcal A}_\gamma(X)
=\begin{pmatrix}
x_{00}+(1-\gamma)x_{11}&\sqrt\gamma\,x_{01}\\
\sqrt\gamma\,x_{10}&\gamma x_{11}
\end{pmatrix}.
$$

一方、緩和率を $\eta=1-\gamma$ とし、振幅減衰の二つのKraus作用素を用いて積を取ると

$$
\begin{aligned}
K_0(\eta)XK_0(\eta)^\dagger
&=\begin{pmatrix}x_{00}&\sqrt{1-\eta}\,x_{01}\\
\sqrt{1-\eta}\,x_{10}&(1-\eta)x_{11}\end{pmatrix},\\
K_1(\eta)XK_1(\eta)^\dagger
&=\begin{pmatrix}\eta x_{11}&0\\0&0\end{pmatrix}.
\end{aligned}
$$

従って、その和は

$$
\mathcal A_{\eta}(X)
=\begin{pmatrix}
x_{00}+\eta x_{11}&\sqrt{1-\eta}\,x_{01}\\
\sqrt{1-\eta}\,x_{10}&(1-\eta)x_{11}
\end{pmatrix}.
$$

$\eta=1-\gamma$ を各成分に代入すれば一致します。端点は $\mathcal A_0(X)=X$ と $\mathcal A_1(X)=(\operatorname{Tr}X)|0\rangle\langle0|$ を代入して得ます。$\square$
<!-- proof-end -->

例えば入力が $|1\rangle\langle1|$ のとき、受信者が励起を持つ確率は $1-\gamma$、環境が励起を持つ確率は $\gamma$ です。これは古典的な確率の分割に見えますが、一般の重ね合わせでは環境側にも $\sqrt\gamma\,b$ という**位相を含む非対角成分**があるため、単なる確率記録ではありません。$\gamma=1/2$ の場合は出力側と環境側が同じチャネルになりますが、それぞれが独立した完全な入力の複製を受け取るという主張ではありません。

### 位相緩和の環境は何を区別できるか

位相緩和の別の例として $0\le p\le1$、$Z=\operatorname{diag}(1,-1)$ に対して $K_0=\sqrt{1-p}I$、$K_1=\sqrt p Z$ とします。$K_0^\dagger K_0+K_1^\dagger K_1=I$ なのでチャネルです。入力密度演算子 $\rho$ の $Z$ 期待値を $z=\operatorname{Tr}(\rho Z)=a-d\in[-1,1]$ とすると、[環境行列成分の公式](#prop-qinf8-complement-matrix)は

$$
\widetilde{\mathcal D}_p(\rho)
=\begin{pmatrix}
1-p&\sqrt{p(1-p)}\,z\\
\sqrt{p(1-p)}\,z&p
\end{pmatrix}
$$

を与えます。対角成分は $1-p,p$、非対角成分は入力の $Z$ 期待値だけに依存し、入力の位相成分 $b$ に依存しません。例えば $|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$ と $|-\rangle=(|0\rangle-|1\rangle)/\sqrt2$ はどちらも $z=0$ で、環境の縮約は同じ $\operatorname{diag}(1-p,p)$ です。$|0\rangle$ では $z=1$ となり、別の環境状態が得られます。

これは「どの枝で $Z$ を掛けたか」を測定済みの古典記録として読み出した結果ではありません。環境基底間の干渉を保持したまま、系を部分トレースした結果です。

## 5. 環境はどこまで一意なのか

同じチャネルを記述するKraus作用素は一意ではありません。しかし環境を変えると、相補チャネルがまったく無関係なものになってしまうのでしょうか。答えは「環境の未使用方向を除けば、等長写像で結ばれる」です。

ここでは、入力と同じ次元の参照系 $R$ を用意し、その正規直交基底 $|i\rangle_R,|i\rangle_A$ を対応させます。次の規格化したエンタングル状態を使います。

$$
|\Omega\rangle_{RA}
=\frac1{\sqrt{d_A}}\sum_{i=1}^{d_A}|i\rangle_R|i\rangle_A,
\qquad d_A=\dim H_A.
$$

等長写像 $V:A\to B\otimes E$ を施して得る $|\Psi_V\rangle=(I_R\otimes V)|\Omega\rangle$ は、$V$ が内積を保存するので単位ベクトルです。環境を捨てた状態は

$$
\rho_{RB}
=\operatorname{Tr}_E(|\Psi_V\rangle\langle\Psi_V|)
=(\mathrm{id}_R\otimes\Phi)(|\Omega\rangle\langle\Omega|)
$$

であり、**チャネル $\Phi$ だけから決まる**状態です。つまり、異なる環境表示は同じ $\rho_{RB}$ の異なる精製だと分かりました。[QINF4の精製の最小次元](../QINF4/index.md#prop-qinf4-minimal-rank)と[精製の等長写像による関係](../QINF4/index.md#thm-qinf4-isometric-freedom)を使えます。

<a id="thm-qinf8-environment-freedom"></a>

<!-- formal-statement-start -->
> **定理（最小環境次元と環境表現の非一意性）**
> 有限次元量子チャネル $\Phi:L(H_A)\to L(H_B)$ に対し、$R\cong A$ と上で定めた $|\Omega\rangle_{RA}$ を用い、$\rho_{RB}=(\mathrm{id}_R\otimes\Phi)(|\Omega\rangle\langle\Omega|)$ とする。$r=\operatorname{rank}\rho_{RB}$ とおくと、以下が成立する。
>
> 1. $\Phi$ のStinespring表現の環境次元は $r$ 以上であり、次元 $r$ の環境を持つ表現が存在する。
> 2. 最小環境 $E_0$（$\dim E_0=r$）による表現 $V_0$ と、任意の環境 $F$ による同じ $\Phi$ の表現 $W$ に対して、等長写像 $J:H_{E_0}\to H_F$ が存在して

$$
W=(I_B\otimes J)V_0,
\qquad
\widetilde\Phi_W(X)=J\widetilde\Phi_{V_0}(X)J^\dagger
$$

> がすべての $X\in L(H_A)$ について成り立つ。特に両環境が最小なら $J$ はユニタリである。
<!-- formal-statement-end -->

### 証明の見取り図

同じチャネルから作った参照系と出力系の縮約 $\rho_{RB}$ を共通に固定します。環境の次元の下界は精製のrank条件です。最小環境が存在することは、[QINF7のKraus存在証明](../QINF7/index.md#thm-qinf7-kraus-existence)に現れる正値行列のrank個のスペクトル成分から従います。二つの環境表示は同じ状態の精製なので、[QINF4の等長写像定理](../QINF4/index.md#thm-qinf4-isometric-freedom)を直接使えます。

<!-- proof-start -->
### 証明

$V:A\to B\otimes E$ の任意のStinespring表現を取ります。$|\Psi_V\rangle=(I_R\otimes V)|\Omega\rangle$ は、上で確認したように $\rho_{RB}$ の精製です。[精製補助系の最小次元](../QINF4/index.md#prop-qinf4-minimal-rank)を部分系 $RB$ と補助系 $E$ に適用すると、$\dim E\ge\operatorname{rank}\rho_{RB}=r$ です。

次に $d_A=\dim H_A$ として、規格化していない $|\Omega_{\mathrm{raw}}\rangle=\sum_i|i\rangle_R|i\rangle_A$ を考えます。[QINF7のKraus表示存在証明](../QINF7/index.md#thm-qinf7-kraus-existence)で用いた正半定値行列は

$$
C=(\mathrm{id}_R\otimes\Phi)(|\Omega_{\mathrm{raw}}\rangle\langle\Omega_{\mathrm{raw}}|)
=d_A\rho_{RB}.
$$

$d_A>0$ なので $\operatorname{rank}C=\operatorname{rank}\rho_{RB}=r$ です。引用した存在証明では、$C$ の正の固有値の本数だけKraus作用素を構成しており、その数は $r$ です。これを[Stinespringの構成](#thm-qinf8-stinespring)へ入れると、次元 $r$ の環境 $E_0$ と等長写像 $V_0$ を得ます。

任意の別表示 $W:A\to B\otimes F$ についても、$|\Psi_W\rangle=(I_R\otimes W)|\Omega\rangle$ は同じ $\rho_{RB}$ の精製です。$\dim E_0=r\le\dim F$ だから、[同じ縮約を持つ精製の等長写像定理](../QINF4/index.md#thm-qinf4-isometric-freedom)を $RB$ 側を固定して適用でき、ある $J:E_0\to F$ が $J^\dagger J=I_{E_0}$ を満たし、

$$
|\Psi_W\rangle=(I_{RB}\otimes J)|\Psi_{V_0}\rangle
$$

となります。両辺の参照系の $\langle i|_R$ 成分を取ると、

$$
\frac1{\sqrt{d_A}}W|i\rangle_A
=\frac1{\sqrt{d_A}}(I_B\otimes J)V_0|i\rangle_A
$$

です。$d_A>0$ であり、基底 $|i\rangle$ の線形結合が $H_A$ 全体を張るので、$W=(I_B\otimes J)V_0$ が作用素として成立します。従って任意の $X$ について

$$
\begin{aligned}
\widetilde\Phi_W(X)
&=\operatorname{Tr}_B\bigl[(I_B\otimes J)V_0XV_0^\dagger(I_B\otimes J^\dagger)\bigr]\\
&=J\operatorname{Tr}_B(V_0XV_0^\dagger)J^\dagger
=J\widetilde\Phi_{V_0}(X)J^\dagger.
\end{aligned}
$$

等長写像の両空間が同次元 $r$ なら、$J^\dagger J=I$ に加えて $JJ^\dagger=I$ であり、$J$ はユニタリです。$\square$
<!-- proof-end -->

**「最小」の意味**は、ある実験装置で本当に環境に存在する自由度を全部数えたということではありません。同じ入力出力の作用を再現する数理模型として、これ以上環境Hilbert空間を小さくできない、という意味です。$r$ はこの章で定義した $\rho_{RB}$ のrankで決まり、後続のQINF9では対応する正値行列をチャネルの判定にも使います。

### 環境基底を回しても出力のチャネルは同じ

二つのKraus作用素 $K_0,K_1$ を使う等長写像 $V|\psi\rangle=K_0|\psi\rangle|0\rangle_E+K_1|\psi\rangle|1\rangle_E$ を考えます。環境に作用するHadamard行列

$$
H=\frac1{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix},
\qquad H^\dagger H=I_E
$$

を取ると、$W=(I_B\otimes H)V$ も同じチャネルを表します。新しい環境基底で読んだKraus作用素は

$$
L_0=\frac{K_0+K_1}{\sqrt2},\qquad
L_1=\frac{K_0-K_1}{\sqrt2}
$$

です。二つのKraus和を展開すると、$K_0XK_1^\dagger$ と $K_1XK_0^\dagger$ の交差項は符号が逆になって相殺し、

$$
L_0XL_0^\dagger+L_1XL_1^\dagger
=K_0XK_0^\dagger+K_1XK_1^\dagger
$$

となります。一方、相補チャネルの行列は $\widetilde\Phi_W(X)=H\widetilde\Phi_V(X)H^\dagger$ へ変わります。$0,1$ という枝のラベルだけから、環境に固有の古典的事象を割り当てることができない理由がここにあります。

## 6. 演習：系の情報と環境の情報を両方計算する

以下の演習では、$\operatorname{Tr}_B$ は出力系を、$\operatorname{Tr}_E$ は環境系を捨てる操作です。すべて有限次元複素Hilbert空間で計算します。

<a id="ex-qinf8-a01"></a>
### QINF8-A01 リセット操作の内積と部分トレース

- Level: A

$H_A=H_B=H_E=\mathbb C^2$ とし、$V|i\rangle_A=|0\rangle_B|i\rangle_E$（$i=0,1$）を線形に延長する。$V^\dagger V=I_A$ を示し、任意の密度演算子 $\rho$ について $\operatorname{Tr}_E(V\rho V^\dagger)$ と $\operatorname{Tr}_B(V\rho V^\dagger)$ を求めよ。

<!-- solution-start -->
### 詳細解答

$\langle Vi,Vj\rangle=\langle0|0\rangle_B\langle i|j\rangle_E=\delta_{ij}$ だから、入力基底での $V^\dagger V$ の行列は $I_2$ です。$\rho=\sum_{i,j}\rho_{ij}|i\rangle\langle j|$ と展開すると

$$
V\rho V^\dagger
=\sum_{i,j}\rho_{ij}|0\rangle\langle0|_B\otimes|i\rangle\langle j|_E
=|0\rangle\langle0|_B\otimes\rho_E.
$$

[部分トレースの定義](../QINF3/index.md#def-qinf3-partial-trace)から、$\operatorname{Tr}_E|i\rangle\langle j|=\delta_{ij}$ と $\operatorname{Tr}_B|0\rangle\langle0|=1$ を使い、

$$
\operatorname{Tr}_E(V\rho V^\dagger)
=\bigl(\sum_i\rho_{ii}\bigr)|0\rangle\langle0|_B
=|0\rangle\langle0|_B,
$$

$$
\operatorname{Tr}_B(V\rho V^\dagger)=\rho_E
$$

と得ます。最初の結果には $\operatorname{Tr}\rho=1$ を使いました。リセット後の系が一定であることは、環境も一定になることを意味しません。
<!-- solution-end -->

<a id="ex-qinf8-a02"></a>
### QINF8-A02 ユニタリチャネルの相補チャネル

- Level: A

$H_A=H_B=\mathbb C^2$ とし、ユニタリ行列 $U$ と一次元環境 $H_E=\mathbb C|0\rangle$ を使い、$V|\psi\rangle=U|\psi\rangle\otimes|0\rangle_E$ とする。等長条件を確かめ、$\Phi$ と $\widetilde\Phi_V$ を任意の $X\in L(H_A)$ に対して求めよ。

<!-- solution-start -->
### 詳細解答

任意の $x,y\in H_A$ について $\langle Vx,Vy\rangle=\langle Ux,Uy\rangle\langle0|0\rangle=\langle x,U^\dagger Uy\rangle=\langle x,y\rangle$ なので等長です。さらに

$$
VXV^\dagger=UXU^\dagger\otimes|0\rangle\langle0|_E.
$$

部分トレースを取ると

$$
\Phi(X)=UXU^\dagger,
\qquad
\widetilde\Phi_V(X)=(\operatorname{Tr}X)|0\rangle\langle0|_E.
$$

環境出力が入力に依存しないのは密度演算子の場合です。一般の作用素 $X$ に対する式には $\operatorname{Tr}X$ が必要です。
<!-- solution-end -->

<a id="ex-qinf8-a03"></a>
### QINF8-A03 励起入力の二つの出力

- Level: A

$0\le\gamma\le1$ の振幅減衰等長写像 $V|1\rangle=\sqrt{1-\gamma}|1\rangle_B|0\rangle_E+\sqrt\gamma|0\rangle_B|1\rangle_E$ を考える。入力 $|1\rangle\langle1|$ に対する $B$ と $E$ の縮約状態をそれぞれ計算し、各トレースが1になることを確認せよ。

<!-- solution-start -->
### 詳細解答

$v=V|1\rangle$ として $|v\rangle\langle v|$ を展開すると対角項は $(1-\gamma)|1,0\rangle\langle1,0|$ と $\gamma|0,1\rangle\langle0,1|$ です。交差項は $\sqrt{\gamma(1-\gamma)}|1,0\rangle\langle0,1|$ とその随伴です。$\operatorname{Tr}_E$ では $\langle1|0\rangle_E=0$、$\operatorname{Tr}_B$ では $\langle0|1\rangle_B=0$ のため交差項が消えます。従って

$$
\rho_B=(1-\gamma)|1\rangle\langle1|+\gamma|0\rangle\langle0|,
$$

$$
\rho_E=(1-\gamma)|0\rangle\langle0|+\gamma|1\rangle\langle1|.
$$

両方とも係数は非負で、トレースは $(1-\gamma)+\gamma=1$ です。環境が励起を得る確率と、系が励起を失う確率が一致します。
<!-- solution-end -->

<a id="ex-qinf8-a04"></a>
### QINF8-A04 位相緩和で環境が見る量

- Level: A

$0<p<1$、$K_0=\sqrt{1-p}I$、$K_1=\sqrt p Z$（$Z=\operatorname{diag}(1,-1)$）とする。$\rho=|0\rangle\langle0|$ と $\sigma=|+\rangle\langle+|$（$|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$）の相補チャネル出力を求め、二つを区別する成分を特定せよ。

<!-- solution-start -->
### 詳細解答

[相補チャネルの行列成分](#prop-qinf8-complement-matrix)において、$\operatorname{Tr}\rho=\operatorname{Tr}\sigma=1$、$\operatorname{Tr}(\rho Z)=1$、$\operatorname{Tr}(\sigma Z)=\langle+|Z|+\rangle=0$ を使います。後者は $Z|+\rangle=|-\rangle$ と $\langle+|-\rangle=0$ から確かめられます。従って

$$
\widetilde\Phi(\rho)
=\begin{pmatrix}1-p&\sqrt{p(1-p)}\\\sqrt{p(1-p)}&p\end{pmatrix},
$$

$$
\widetilde\Phi(\sigma)
=\begin{pmatrix}1-p&0\\0&p\end{pmatrix}.
$$

どちらも自己共役でトレース1です。固有値は実数で和が1なので、その積である行列式が非負なら固有値はともに非負です。前者の行列式は0、後者は $p(1-p)>0$ なので、両者は正半定値です。二つの状態を区別するのは環境の非対角成分です。入力の位相 $b$ ではなく、$Z$ 期待値がそこへ入る点に注意します。
<!-- solution-end -->

<a id="ex-qinf8-b01"></a>
### QINF8-B01 振幅減衰の相補行列と正値性

- Level: B

$0\le\gamma\le1$ とし、振幅減衰のKraus作用素を $K_0=\operatorname{diag}(1,\sqrt{1-\gamma})$、$K_1=\sqrt\gamma|0\rangle\langle1|$ とする。密度演算子 $\rho=\begin{pmatrix}a&b\\\overline b&d\end{pmatrix}$（$a,d\ge0$、$a+d=1$、$|b|^2\le ad$）について、相補チャネルの全成分をKraus積から計算し、トレース保存と正半定値性を確認せよ。

<!-- solution-start -->
### 詳細解答

[相補チャネルの行列成分](#prop-qinf8-complement-matrix)で対角成分は $\operatorname{Tr}(K_0\rho K_0^\dagger)=a+(1-\gamma)d$ と $\operatorname{Tr}(K_1\rho K_1^\dagger)=\gamma d$ です。非対角成分は

$$
K_0\rho K_1^\dagger
=\sqrt\gamma
\begin{pmatrix}b&0\\\sqrt{1-\gamma}\,d&0\end{pmatrix}
$$

なので、トレースは $\sqrt\gamma b$ です。随伴側のトレースはその複素共役になります。従って

$$
\widetilde\Phi(\rho)
=\begin{pmatrix}
a+(1-\gamma)d&\sqrt\gamma b\\
\sqrt\gamma\overline b&\gamma d
\end{pmatrix}.
$$

トレースは $a+(1-\gamma)d+\gamma d=a+d=1$ です。正半定値性を判定するため、対角成分がともに非負であることに加え、行列式を計算します。

$$
\begin{aligned}
\det\widetilde\Phi(\rho)
&=\gamma d\bigl(a+(1-\gamma)d\bigr)-\gamma|b|^2\\
&=\gamma\bigl[(ad-|b|^2)+(1-\gamma)d^2\bigr]\ge0.
\end{aligned}
$$

最後は入力の $|b|^2\le ad$ と $0\le\gamma\le1$ を使いました。出力行列は自己共役です。二次元自己共役行列の固有値は実数で、和がトレース1、積がこの非負な行列式なので、両固有値とも非負です。従って正半定値であり、任意の入力密度演算子に対して密度演算子です。
<!-- solution-end -->

<a id="ex-qinf8-b02"></a>
### QINF8-B02 Kraus基底の回転を式で確かめる

- Level: B

$H_A,H_B$ 上のチャネルが二つのKraus作用素 $K_0,K_1$ を持ち、$K_0^\dagger K_0+K_1^\dagger K_1=I_A$ とする。$L_0=(K_0+K_1)/\sqrt2$、$L_1=(K_0-K_1)/\sqrt2$ を定める。$L$ の完全性関係を検算し、任意の $X\in L(H_A)$ に対するKraus和が不変であることを示せ。両表示の相補チャネルがどのように関係するかを求めよ。

<!-- solution-start -->
### 詳細解答

まず随伴積をそれぞれ展開します。

$$
\begin{aligned}
L_0^\dagger L_0
&=\tfrac12(K_0^\dagger K_0+K_0^\dagger K_1+K_1^\dagger K_0+K_1^\dagger K_1),\\
L_1^\dagger L_1
&=\tfrac12(K_0^\dagger K_0-K_0^\dagger K_1-K_1^\dagger K_0+K_1^\dagger K_1).
\end{aligned}
$$

和の交差項は相殺し、$L_0^\dagger L_0+L_1^\dagger L_1=K_0^\dagger K_0+K_1^\dagger K_1=I_A$ です。同じ展開で各中間項の右辺に $X$ を挿入すると

$$
\begin{aligned}
L_0XL_0^\dagger&=\tfrac12(K_0XK_0^\dagger+K_0XK_1^\dagger+K_1XK_0^\dagger+K_1XK_1^\dagger),\\
L_1XL_1^\dagger&=\tfrac12(K_0XK_0^\dagger-K_0XK_1^\dagger-K_1XK_0^\dagger+K_1XK_1^\dagger).
\end{aligned}
$$

これらを加えると元のKraus和になります。環境基底 $|0\rangle,|1\rangle$ による等長写像 $V_K$ と $V_L$ には

$$
V_L=(I_B\otimes H)V_K,
\quad H=\tfrac1{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}
$$

の関係があります。$H^\dagger H=I$ なので [相補チャネルの定義](#def-qinf8-complement)と部分トレースの線形性から

$$
\widetilde\Phi_L(X)
=H\widetilde\Phi_K(X)H^\dagger
$$

です。環境の表示行列は変わっても、受信者のチャネルは変わりません。
<!-- solution-end -->

<a id="ex-qinf8-b03"></a>
### QINF8-B03 ユニタリとリセットの最小環境次元

- Level: B

$H_A=H_B=\mathbb C^2$、$R\cong A$ とし、$|\Omega\rangle=(|00\rangle+|11\rangle)/\sqrt2$ を用いる。$\Phi_U(X)=UXU^\dagger$（$U$ はユニタリ）と $\Phi_R(X)=(\operatorname{Tr}X)|0\rangle\langle0|$ のそれぞれについて、$\rho_{RB}=(\mathrm{id}_R\otimes\Phi)(|\Omega\rangle\langle\Omega|)$ を求め、そのrankから最小環境次元を決めよ。

<!-- solution-start -->
### 詳細解答

ユニタリの場合は $|\Omega_U\rangle=(I_R\otimes U)|\Omega\rangle$ と置くと $\rho_{RB}=|\Omega_U\rangle\langle\Omega_U|$ です。$\langle\Omega_U|\Omega_U\rangle=1$ より、$\rho_{RB}$ の固有値は $1$ と残りの零固有値でrankは1です。[最小環境次元と環境表現の非一意性](#thm-qinf8-environment-freedom)から一次元環境で足り、実際 $V|\psi\rangle=U|\psi\rangle|0\rangle_E$ で実現できます。

リセットの場合、$|\Omega\rangle\langle\Omega|=\tfrac12\sum_{i,j=0}^1|i\rangle\langle j|_R\otimes|i\rangle\langle j|_A$ を使い、$\operatorname{Tr}|i\rangle\langle j|=\delta_{ij}$ なので

$$
\begin{aligned}
\rho_{RB}
&=\tfrac12\sum_{i,j}|i\rangle\langle j|_R\otimes
\delta_{ij}|0\rangle\langle0|_B\\
&=\tfrac12I_R\otimes|0\rangle\langle0|_B.
\end{aligned}
$$

これは二つの互いに直交するベクトル $|0\rangle_R|0\rangle_B$ と $|1\rangle_R|0\rangle_B$ に固有値 $1/2$ を持つためrankは2です。従って最小環境次元は2で、[第2節のリセット等長写像](#ex-qinf8-reset-isometry)の例が下界を達成します。リセットは受信者側で情報が失われても、環境には二次元の入力を保持する余地が必要です。
<!-- solution-end -->

<a id="ex-qinf8-b04"></a>
### QINF8-B04 どの緩和率で環境は入力を忘れるか

- Level: B

振幅減衰チャネル $\mathcal A_\gamma$（$0\le\gamma\le1$）について、入力 $|0\rangle\langle0|$ と $|1\rangle\langle1|$ の系出力・相補出力を計算せよ。相補チャネルがすべての密度演算子に対して一定になるのは $\gamma=0$ に限り、系出力がすべての密度演算子に対して一定になるのは $\gamma=1$ に限ることを示せ。環境表現を最小環境から等長に埋め込んでも、この二状態の区別が消えない理由を述べよ。

<!-- solution-start -->
### 詳細解答

[振幅減衰の相補チャネル](#prop-qinf8-amplitude-complement)から、$\mathcal A_\gamma(|0\rangle\langle0|)=|0\rangle\langle0|$、$\widetilde{\mathcal A}_\gamma(|0\rangle\langle0|)=|0\rangle\langle0|$ です。また

$$
\mathcal A_\gamma(|1\rangle\langle1|)
=\gamma|0\rangle\langle0|+(1-\gamma)|1\rangle\langle1|,
$$

$$
\widetilde{\mathcal A}_\gamma(|1\rangle\langle1|)
=(1-\gamma)|0\rangle\langle0|+\gamma|1\rangle\langle1|.
$$

環境側の二状態が等しいなら $|1\rangle\langle1|$ の係数 $\gamma$ は0なので $\gamma=0$ が必要です。逆に $\gamma=0$ なら [振幅減衰の相補チャネル](#prop-qinf8-amplitude-complement)からすべての密度演算子が $|0\rangle\langle0|_E$ へ写ります。同様に系側の二状態が等しいなら $1-\gamma=0$、すなわち $\gamma=1$ が必要で、$\mathcal A_1(\rho)=|0\rangle\langle0|_B$ なので十分です。

最後に [最小環境からの等長埋め込み](#thm-qinf8-environment-freedom)が与える $J^\dagger J=I$ を使います。$J\sigma J^\dagger=J\tau J^\dagger$ が成り立つなら、左から $J^\dagger$、右から $J$ を掛けて $\sigma=\tau$ を得ます。従ってもとの二状態が異なれば、等長埋め込み後も異なります。環境の基底を変えただけでは情報漏洩の有無は変わりません。
<!-- solution-end -->

<a id="ex-qinf8-c01"></a>
### QINF8-C01 二段の雑音と冗長な環境

- Level: C

$H_A=H_B=\mathbb C^2$ に振幅減衰 $\mathcal A_\gamma$ を施し、その後さらに $\mathcal A_\delta$ を施す。ただし $0<\gamma,\delta<1$ とする。各段のKraus作用素は

$$
K_0(t)=\operatorname{diag}(1,\sqrt{1-t}),\qquad
K_1(t)=\sqrt t\,|0\rangle\langle1|
\quad(t=\gamma,\delta)
$$

とする。次を示せ。

1. 合成チャネル $\mathcal A_\delta\circ\mathcal A_\gamma$ の有効緩和率 $\Gamma$ を求め、合成Kraus作用素四つのうち非零のものを求める。
2. 二段の環境 $E_\gamma,E_\delta\cong\mathbb C^2$ を残す等長写像を作り、$E_\delta\otimes E_\gamma$ の次元を求める。
3. 一つの二次元環境だけでも合成チャネルを表せることをKraus作用素から示す。また、参照系 $R\cong A$ の状態 $\rho_{RB}$ のrankを計算して、この二次元が最小であることを確認する。
4. 二段環境と最小環境の相補チャネルがどう結ばれるかを述べる。

<!-- solution-start -->
### 詳細解答

**1. 合成の計算。** 第一段の結果は

$$
\mathcal A_\gamma\begin{pmatrix}a&b\\c&d\end{pmatrix}
=\begin{pmatrix}a+\gamma d&\sqrt{1-\gamma}\,b\\\sqrt{1-\gamma}\,c&(1-\gamma)d\end{pmatrix}.
$$

第二段では、その出力の右下成分 $(1-\gamma)d$ から割合 $\delta$ が上へ移ります。従って

$$
\begin{aligned}
(\mathcal A_\delta\circ\mathcal A_\gamma)(X)
&=\begin{pmatrix}
a+[\gamma+\delta(1-\gamma)]d
&\sqrt{(1-\delta)(1-\gamma)}\,b\\
\sqrt{(1-\delta)(1-\gamma)}\,c
&(1-\delta)(1-\gamma)d
\end{pmatrix}.
\end{aligned}
$$

$\Gamma=\gamma+\delta(1-\gamma)=1-(1-\gamma)(1-\delta)$ と置くと、$1-\Gamma=(1-\gamma)(1-\delta)$ なので合成は $\mathcal A_\Gamma$ です。

各段のKrausラベルを $i,j\in\{0,1\}$ とすると、合成のKraus作用素は $K_j(\delta)K_i(\gamma)$ です。行列積を順に計算すると

$$
\begin{aligned}
K_0(\delta)K_0(\gamma)&=\operatorname{diag}(1,\sqrt{(1-\delta)(1-\gamma)}),\\
K_0(\delta)K_1(\gamma)&=\sqrt\gamma\,|0\rangle\langle1|,\\
K_1(\delta)K_0(\gamma)&=\sqrt{\delta(1-\gamma)}\,|0\rangle\langle1|,\\
K_1(\delta)K_1(\gamma)&=0.
\end{aligned}
$$

**2. 二つの環境を持つ表現。** 第一段の $V_\gamma:A\to B\otimes E_\gamma$ の出力 $B$ に、第二段の $V_\delta:B\to C\otimes E_\delta$ を施します。合成等長写像を

$$
W=(V_\delta\otimes I_{E_\gamma})V_\gamma
:H_A\to H_C\otimes H_{E_\delta}\otimes H_{E_\gamma}
$$

と定めると、$W^\dagger W=V_\gamma^\dagger(V_\delta^\dagger V_\delta\otimes I)V_\gamma=V_\gamma^\dagger V_\gamma=I_A$ です。環境の基底 $|j\rangle_{E_\delta}|i\rangle_{E_\gamma}$ における $W$ の係数は上の $K_j(\delta)K_i(\gamma)$ になります。環境全体の次元は $2\times2=4$ です。

**3. 最小環境。** 非零の二つのジャンプ作用素はどちらも $|0\rangle\langle1|$ に比例するため、これらを合算した一つの作用素

$$
M_1=\sqrt{\gamma+\delta(1-\gamma)}\,|0\rangle\langle1|
=\sqrt\Gamma\,|0\rangle\langle1|
$$

へまとめられます。ここで「まとめる」とは作用素を単純に加算することではなく、二つのKraus項の和を保つことです。$P=|0\rangle\langle1|$ と置けば、元の二項は

$$
\gamma PXP^\dagger+\delta(1-\gamma)PXP^\dagger
=\Gamma PXP^\dagger=M_1XM_1^\dagger
$$

と一致します。残る $M_0=\operatorname{diag}(1,\sqrt{1-\Gamma})$ と合わせれば

$$
M_0XM_0^\dagger+M_1XM_1^\dagger
=(\mathcal A_\delta\circ\mathcal A_\gamma)(X),
$$

かつ $M_0^\dagger M_0+M_1^\dagger M_1=I$ です。[Stinespringの構成](#thm-qinf8-stinespring)から二次元環境が得られます。

この次元が最小であることも確かめます。$|\Omega\rangle=(|00\rangle+|11\rangle)/\sqrt2$ を用いると、Kraus作用素の作用から

$$
\rho_{RB}
=|w_0\rangle\langle w_0|+|w_1\rangle\langle w_1|,
$$

$$
|w_0\rangle=\frac{|00\rangle+\sqrt{1-\Gamma}|11\rangle}{\sqrt2},
\qquad
|w_1\rangle=\sqrt{\frac\Gamma2}|10\rangle.
$$

二つのベクトルは直交します。また $0<\Gamma<1$ だからどちらも零ベクトルではありません。従って $\rho_{RB}$ のrankは2で、[最小環境次元と環境表現の非一意性](#thm-qinf8-environment-freedom)から二次元が下界でもあります。

**4. 相補チャネルの関係。** 二次元の最小環境 $E_0$ から四次元の $E_\delta\otimes E_\gamma$ へ、[最小環境次元と環境表現の非一意性](#thm-qinf8-environment-freedom)による等長写像 $J$ が存在します。よって二つの相補チャネルは

$$
\widetilde\Phi_W(X)=J\widetilde\Phi_{V_0}(X)J^\dagger
$$

で結ばれます。環境のHilbert空間が四次元だからといって、最小模型より多くの独立した入力情報が復元できるわけではありません。二つのKrausジャンプ方向は同じ入力作用素に比例しており、相補出力が使う環境部分空間は二次元へ圧縮できます。
<!-- solution-end -->

## 7. 受信者と環境を同時に考える

有限次元の量子チャネルは、等長写像を通して「受信者 $B$ の縮約」と「環境 $E$ の縮約」を同時に持ちます。相補チャネルは、密度行列の出力からは見えない環境側の情報を直接計算する方法です。振幅減衰では $\widetilde{\mathcal A}_\gamma=\mathcal A_{1-\gamma}$ となり、位相緩和では環境が入力の $Z$ 期待値を受け取ることが分かりました。

環境系の個別の基底や冗長な次元は一意ではありませんが、最小表現は環境上のユニタリ変換までで同じものを表します。次章では、参照系を使って作った正半定値行列に着目し、完全正値性やトレース保存を一枚の行列で判定する方法を学びます。
