# CAG1-03 代数的連接層と解析的連接層

[前章で構成した解析化](../CAG1-02/index.md#thm-cag1-02-analytification-functor)は、複素点と正則関数の層を備えた空間だった。だが幾何学では、関数だけでなく、方程式の商、局所的なベクトルの族、線束も同時に比較したい。たとえば $\mathbb C[t]/(t^2)$ は、原点に二重の厚みを持つ加群である。これを解析側で扱うには、層に施す操作が必要になる。

代数側では[連接層](../../AG/AG3-06/index.md#def-ag3-06-coherent)を有限個の生成元と関係式で扱えた。解析側でも「局所的に有限個の関係式で記述でき、核を取っても有限性が残る」層を使う。しかし**有限表示の式を書けること**と、**解析側で核まで連接になること**は同じ主張ではない。本章ではこの区別を押さえ、解析化が短完全列を保存する根拠を確認する。

以下、$X$ は有限型の $\mathbb C$-スキーム、$h:X^{\mathrm{an}}\to X$ は解析化の自然な局所環付き空間の射とする。$X$ は射影的・滑らか・被約である必要はない。代数側の開集合にはZariski位相、解析側には解析位相を用いる。$h^{-1}$ は層の逆像、$\otimes$ は指定した構造層上のテンソル積を表す。

## 1. 有限表示と解析的連接性はどこが違うか

[有限表示の定義](../../AG/AG3-06/index.md#def-ag3-06-finite-type-presentation)によれば、代数的な連接層は局所的に有限個の自由加群からの射の余核として書ける。たとえば $A=\mathbb C[x,y]$ 上の $M=A/(x,y)$ は

$$
A^2\xrightarrow{\ (x\ \ y)\ }A\longrightarrow M\longrightarrow0
$$

という表示を持つ。行列の意味は $(a,b)\mapsto xa+yb$ であり、余核では $x$ と $y$ がともに零になる。このため、対応する層の支持は原点だけである。

一方、複素解析空間上の正則関数は局所収束冪級数であり、単なる多項式加群の議論だけでは「正則行列の射の核がまた有限個の正則関数で局所生成できるか」を決められない。これを明示的に要求するのが解析的連接性である。

<a id="def-cag1-03-analytic-coherent"></a>

<!-- formal-statement-start -->
> **定義（解析的連接層）**
> 複素解析空間 $Y$ の構造層を $\mathcal O_Y$ とする。$\mathcal O_Y$-加群の層 $\mathcal E$ が**解析的連接層**であるとは、次の二条件を満たすことをいう。
>
> 1. $Y$ の各点は、ある有限整数 $r$ と全射 $\mathcal O_U^r\to\mathcal E|_U$ を持つ開近傍 $U$ を備える（局所有限型）。
> 2. 任意の開集合 $U\subseteq Y$、任意の有限整数 $r$、任意の $\mathcal O_U$-線形写像 $\varphi:\mathcal O_U^r\to\mathcal E|_U$ に対し、$\ker\varphi$ は局所有限型である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cag1-03-analytic-coherent -->
**定義の確認**：$Y=\mathbb C$、$\mathcal E=\mathcal O_{\mathbb C}/(z^2)$ とする。$\mathcal O_{\mathbb C}\to\mathcal E$ は全射で、その核は $z^2\mathcal O_{\mathbb C}$ である。原点の近くでは、乗法 $z^2$ が正則関数の零因子でないため、核は $z^2$ 一つで生成される。原点を含まない十分小さい開円板では $z$ は単元で、$\mathcal E=0$ となる。この例は「一つの表示で有限個の関係がある」ことを直接示す。

さらに**任意の**有限自由加群から $\mathcal E$ への射について核が局所有限型となることには、正則関数の層自体の連接性が必要である。これは直後の解析的定理から従い、上の一つの核の計算だけで定義の全量化を証明したことにはならない。
<!-- definition-example-end -->

[代数側の局所Noether定理](../../AG/AG3-06/index.md#thm-ag3-06-noether-coherence)は、有限型準連接層の連接性を保証する。一方、解析側で使う正則関数の層の連接性は、Weierstrassの準備・除法などに支えられた解析的定理である。「各点の芽の環がNoether」という事実だけを述べても、近傍ごとに**層の核を生成する断面**があることの説明にはならない。

<a id="thm-cag1-03-oka-coherence"></a>

<!-- formal-statement-start -->
> **定理（Okaの連接性定理）**
> 複素解析空間 $Y$ の構造層 $\mathcal O_Y$ は解析的連接である。また、$\mathcal O_Y$ の有限階数自由層の間の正則行列で与えられる射について、その核・像・余核は解析的連接層である。
<!-- formal-statement-end -->

これは**解析的な外部定理**として用いる。根本には複素空間の正則関数に対するWeierstrassの除法などがあり、本章ではその証明を与えない。方程式で定まる空間 $Y$ では、まず正則関数の層と方程式が生成するイデアル層の連接性を使い、その商である $\mathcal O_Y$ に降ろす。さらに連接層の核・余核の閉性から有限行列の余核が連接になる。**層の連接性と局所環の平坦性は、別々に根拠を要する。**

## 2. 層を解析化する操作

空間の解析化で正則関数の層が増えたのと同じように、代数的な層の係数も正則関数へ拡張したい。加群 $M$ の生成元と関係式を、係数環だけ $\mathbb C[x]$ から正則関数へ取り替える操作を一般化する。

<a id="def-cag1-03-sheaf-analytification"></a>

<!-- formal-statement-start -->
> **定義（連接層の解析化）**
> 有限型 $\mathbb C$-スキーム $X$、その解析化 $h:X^{\mathrm{an}}\to X$、代数的連接 $\mathcal O_X$-加群の層 $\mathcal F$ に対し、$\mathcal F$ の**解析化**を

$$
\mathcal F^{\mathrm{an}}
=\mathcal O_{X^{\mathrm{an}}}
\otimes_{h^{-1}\mathcal O_X}h^{-1}\mathcal F
$$

> と定義する。テンソル積は解析空間上の層として行う。点 $p\in X(\mathbb C)$ における茎は

$$
\mathcal F^{\mathrm{an}}_p
\simeq\mathcal O_{X^{\mathrm{an}},p}
\otimes_{\mathcal O_{X,p}}\mathcal F_p.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-cag1-03-sheaf-analytification -->
**定義の確認**：$X=\operatorname{Spec}\mathbb C[t]$、$M=\mathbb C[t]/(t^2)$、$\mathcal F=\widetilde M$ とする。原点では[代数的局所環から解析的局所環への写像](../CAG1-02/index.md#prop-cag1-02-stalk-comparison)があるので

$$
\mathcal F^{\mathrm{an}}_0
\simeq\mathbb C\{t\}\otimes_{\mathbb C[t]}(\mathbb C[t]/(t^2))
\simeq\mathbb C\{t\}/(t^2).
$$

最初の同型は茎を取ったテンソル積で、最後は $1\otimes\bar f\mapsto[f]$ による商の普遍性から得る。$1,[t]$ が基底で $[t]^2=0$、$[t]\ne0$。$a\ne0$ では $t^2$ が単元なので $\mathcal F^{\mathrm{an}}_a=0$。したがって解析的支持は原点一点だが、局所環上の長さは2である。
<!-- definition-example-end -->

この定義は解析側の任意の正則関数を代数側の関数へ戻す操作ではない。テンソル積は**代数的な関係を保ったまま係数を拡張する**のであり、大域切断の比較とは異なる。

<a id="prop-cag1-03-local-presentation"></a>

<!-- formal-statement-start -->
> **命題（有限表示の解析化と余核の計算）**
> $X$ を有限型 $\mathbb C$-スキーム、$\mathcal F$ を代数的連接層とする。アフィン開集合 $U=\operatorname{Spec}A$ で $\mathcal F|_U=\widetilde M$、有限表示

$$
A^s\xrightarrow{P}A^r\longrightarrow M\longrightarrow0
$$

> を選ぶ。$U^{\mathrm{an}}$ 上の解析化は、行列 $P$ の成分を正則関数として読んだ写像の余核である。

$$
\mathcal O_{U^{\mathrm{an}}}^s
\xrightarrow{P^{\mathrm{an}}}
\mathcal O_{U^{\mathrm{an}}}^r
\longrightarrow\mathcal F^{\mathrm{an}}|_{U^{\mathrm{an}}}
\longrightarrow0.
$$

> この結論に局所平坦性は不要であり、テンソル積の右完全性だけを使う。
<!-- formal-statement-end -->

### 証明の見取り図

余核は自由加群の像で割った加群である。正則関数へ係数を拡張しても、テンソル積が余核を保つため、**行列の同じ列関係**を商に課せばよい。ここでは先頭の $0\to$ を勝手に付けないことが重要である。

<!-- proof-start -->
### 証明

[アフィンスキーム上の準連接層と加群の対応](../../AG/AG3-06/index.md#thm-ag3-06-affine-equivalence)で $\widetilde M$ を表示する。任意の $p\in U(\mathbb C)$ における自由表示の茎は

$$
\mathcal O_{U,p}^s\xrightarrow{P_p}
\mathcal O_{U,p}^r\longrightarrow\mathcal F_p\longrightarrow0.
$$

環準同型 $\mathcal O_{U,p}\to\mathcal O_{U^{\mathrm{an}},p}$ に沿ってテンソルを取る。テンソル積の右完全性から

$$
\mathcal O_{U^{\mathrm{an}},p}^s
\xrightarrow{P_p^{\mathrm{an}}}
\mathcal O_{U^{\mathrm{an}},p}^r
\longrightarrow
\mathcal O_{U^{\mathrm{an}},p}\otimes_{\mathcal O_{U,p}}\mathcal F_p
\longrightarrow0
$$

が完全である。最後の項は定義によって $\mathcal F_p^{\mathrm{an}}$。右辺の余核と主張する層は全点の茎が一致するので層として同型になる。前二項は自由層なので、表示行列の成分を局所的に正則関数と解釈できる。
<!-- proof-end -->

例として $A=\mathbb C[x,y]$、$M=A/(x,y)$ に適用すれば、解析化は正則行列 $(x\ \ y)$ の余核である。原点では $\mathbb C\{x,y\}/(x,y)\simeq\mathbb C$、他の点では $x$ または $y$ が局所単元となり余核は零になる。有限表示が具体計算の入口になる。

## 3. 平坦性が保証するのは「左端も残る」こと

テンソル積の右完全性だけでは、単射が単射のままであるとは限らない。実際、$\mathbb C[t]$ 上の単射「$t$ を掛ける写像」に、点評価 $\mathbb C[t]\to\mathbb C[t]/(t)$ でテンソルを取ると、$\mathbb C\to\mathbb C$ の零写像になってしまう。これは単射でない。**剰余体が同じであることと、平坦性とは別**である。

解析化の場合には、点評価とは違う深い事実が働く。

<a id="thm-cag1-03-analytic-faithful-flatness"></a>

<!-- formal-statement-start -->
> **定理（解析化における局所環の忠実平坦性）**
> $X$ を有限型の $\mathbb C$-スキーム、$p\in X(\mathbb C)$ とする。[解析化の局所環準同型](../CAG1-02/index.md#prop-cag1-02-stalk-comparison)

$$
\mathcal O_{X,p}\longrightarrow\mathcal O_{X^{\mathrm{an}},p}
$$

> は**忠実平坦**である。すなわち右辺へのテンソル積は加群の完全列を保存し、テンソル積後の加群が零なら元の加群も零である。$X$ の滑らかさ・被約性・射影性は仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図と解析的入力

これは「正則関数が多項式より多い」ことからは出ない。局所の多項式環と収束冪級数環を比較し、その**完備化が同じ形式冪級数環**であることを使う。そのためには収束冪級数環のNoether性（Weierstrassの準備・除法定理による）と、Noether局所環の極大イデアル進完備化の忠実平坦性が必要である。本章ではこれらの高度な定理を外部入力として使用し、方程式による商への帰着を詳しく示す。

<!-- proof-start -->
### 証明（既知の解析的定理への帰着）

点 $p$ の近傍で $X=\operatorname{Spec}A$、$A=\mathbb C[z_1,\ldots,z_n]/I$ と表示し、$p$ の座標を $a=(a_1,\ldots,a_n)$ とする。

$$
R_0=\mathbb C[z_1,\ldots,z_n]_{(z_1-a_1,\ldots,z_n-a_n)},
\qquad
S_0=\mathbb C\{z_1-a_1,\ldots,z_n-a_n\}.
$$

多項式側の $R_0$ は[Hilbertの基底定理](../../AG/AG1-05/index.md#thm-ag1-05-hilbert-basis)からNoetherである。解析側の $S_0$ もNoetherであるが、**ここだけはWeierstrassの準備・除法定理による解析的入力**を使う。

両者の極大イデアル進完備化は自然に

$$
\widehat R_0\simeq
\mathbb C[[z_1-a_1,\ldots,z_n-a_n]]
\simeq\widehat S_0
$$

となる。Noether局所環の完備化は忠実平坦であるという代数的定理を適用すると、$S_0\to\widehat S_0$ および $R_0\to\widehat R_0$ は忠実平坦である。$R_0\to S_0\to\widehat S_0$ の合成が平坦で、最後の射が忠実平坦なので、テンソル積の完全性を後者で検出でき、$R_0\to S_0$ は平坦となる。さらにこれは局所準同型で、剰余体の写像は $\mathbb C\to\mathbb C$ だから、平坦な局所準同型は忠実平坦である。

方程式を戻すと[前章の局所環表示](../CAG1-02/index.md#prop-cag1-02-stalk-comparison)により

$$
\mathcal O_{X,p}=R_0/IR_0,
\qquad
\mathcal O_{X^{\mathrm{an}},p}=S_0/IS_0
\simeq S_0\otimes_{R_0}(R_0/IR_0).
$$

平坦性はこの商への基底変換で保たれ、剰余体が同じ非零の $\mathbb C$ であるため忠実平坦性も保たれる。これで任意の有限型 $X$ の点 $p$ へ帰着できた。なお、完備化の忠実平坦性と $S_0$ のNoether性そのものの証明はここには含めていない。
<!-- proof-end -->

この局所結果の用途は、層の短完全列を各点の茎に直し、右辺へテンソルを取れるようにすることにある。解析側での連接性には、さらに別の解析的入力が必要となる。

<a id="thm-cag1-03-coherent-exact"></a>

<!-- formal-statement-start -->
> **定理（連接層の解析化と完全列の保存）**
> $X$ を有限型 $\mathbb C$-スキームとする。代数的連接層 $\mathcal F$ の解析化 $\mathcal F^{\mathrm{an}}$ は $X^{\mathrm{an}}$ 上の解析的連接層である。また、代数的連接層の任意の短完全列

$$
0\longrightarrow\mathcal F'
\longrightarrow\mathcal F
\longrightarrow\mathcal F''\longrightarrow0
$$

> を解析化した列も短完全である。この主張には $X$ の射影性は不要であり、**大域切断を取った列まで短完全**とは述べていない。
<!-- formal-statement-end -->

### 証明の見取り図

二つの結論の理由を分ける。連接性には **Oka の連接性定理**（複素解析空間の構造層が連接で、連接層の有限表示の余核も連接となる）を使う。完全性には上の**局所環の平坦性**を使う。前者を単なる代数環のNoether性から、後者を単なるテンソル積の右完全性から導かない。

<!-- proof-start -->
### 証明（解析的入力を明示した相対的証明）

$X$ は有限型なので各点の近傍で代数的連接 $\mathcal F$ は有限表示を持つ。[有限表示の解析化](#prop-cag1-03-local-presentation)より、$\mathcal F^{\mathrm{an}}$ は局所的に正則関数の有限行列による余核である。

ここで[Oka の連接性定理](#thm-cag1-03-oka-coherence)を用いる。複素解析空間の $\mathcal O_{X^{\mathrm{an}}}$ は連接な環の層であり、有限自由層の間の正則行列の核・像・余核も連接となる。この解析的定理にはWeierstrassの除法などが関わり、ここでは証明を引用する。その適用によって、上の有限表示の余核 $\mathcal F^{\mathrm{an}}$ は[解析的連接層の定義](#def-cag1-03-analytic-coherent)を満たす。

次に短完全列を点 $p\in X(\mathbb C)$ で茎に取ると

$$
0\to\mathcal F'_p\to\mathcal F_p\to\mathcal F''_p\to0
$$

が完全である。[局所環の忠実平坦性](#thm-cag1-03-analytic-faithful-flatness)によって $\mathcal O_{X^{\mathrm{an}},p}$ をテンソルしても完全で、[解析化の茎の式](#def-cag1-03-sheaf-analytification)を代入すると

$$
0\to(\mathcal F')^{\mathrm{an}}_p
\to\mathcal F^{\mathrm{an}}_p
\to(\mathcal F'')^{\mathrm{an}}_p\to0
$$

となる。これが解析空間のすべての点 $p$ で成立するので、層の列は短完全である。
<!-- proof-end -->

たとえば $X=\mathbb A^1_{\mathbb C}$ の $t$ による乗法で

$$
0\to\mathcal O_X\xrightarrow{\ t\ }\mathcal O_X
\to\widetilde{\mathbb C[t]/(t)}\to0
$$

は短完全である。解析化後も $0\to\mathcal O_{\mathbb C}\xrightarrow{z}\mathcal O_{\mathbb C}\to\mathcal O_{\mathbb C}/(z)\to0$ が完全である。任意の点の正則関数の芽に $z$ を掛けて零になれば、[恒等定理](../../../解析系/CA/CA3/index.md#thm-ca3-isolated-zeros-identity)からその芽は零である。余核は原点のみに残る。これが抽象定理を具体的な乗法写像として見た姿である。

## 4. $\mathcal O(d)$ の遷移関数はどうなるか

[射影空間のねじり層](../../AG/AG2-06/index.md#def-ag2-06-twisting-sheaf)は、各標準チャートで自由階数1、重なりで単元倍により基底を貼り合わせる層である。解析化したときには、代数側で使った単元 $x^d$ を解析側でも使う。ここでは $\mathbb P^1$ の二つのチャートで遷移関数の向きを確認しよう。

$[S:T]\in\mathbb P^1$ とし、$U_S=\{S\ne0\}$ では $x=T/S$、$U_T=\{T\ne0\}$ では $y=S/T$ を用いる。重なりでは $xy=1$ である。$d\in\mathbb Z$ に対し、局所基底を $e_S^{(d)}$、$e_T^{(d)}$ と書く。

<a id="prop-cag1-03-analytic-twisting"></a>

<!-- formal-statement-start -->
> **命題（ねじり層の解析化と遷移関数）**
> $X=\mathbb P^1_{\mathbb C}$、$d\in\mathbb Z$ とする。代数的ねじり層 $\mathcal O_X(d)$ の解析化は、解析的な二チャート上で階数1の自由層を次の基底変換で貼り合わせた正則線束に同型である。

$$
e_T^{(d)}=x^d e_S^{(d)},\qquad
e_S^{(d)}=y^d e_T^{(d)}
\quad (x=y^{-1}\ne0).
$$

> 同じ切断の係数 $f_S,f_T$ は $f_T=y^d f_S$ を満たす。負の $d$ でも、単元の負冪は重なり上で正則である。
<!-- formal-statement-end -->

### 証明の見取り図

代数側の基底変換式を正則関数の環へ送るだけで、局所自由層の接着データが同じまま残る。係数の変換方向は基底と逆になる点を、切断 $f_Se_S^{(d)}=f_Te_T^{(d)}$ から確かめる。

<!-- proof-start -->
### 証明

[代数的 $\mathcal O(d)$ の遷移](../../AG/AG2-06/index.md#prop-ag2-06-od-cocycle)より $e_T^{(d)}=(T/S)^de_S^{(d)}=x^de_S^{(d)}$ である。両チャートでは代数的な $\mathcal O(d)$ は自由階数1なので、[有限表示の解析化](#prop-cag1-03-local-presentation)を階数1・関係式なしの場合に適用すると、解析化後もそれぞれ $\mathcal O_{U_S^{\mathrm{an}}}e_S^{(d)}$、$\mathcal O_{U_T^{\mathrm{an}}}e_T^{(d)}$ となる。

重なりでは $x,y$ が正則な単元で、$xy=1$ だから、$x^dy^d=1$。従って基底変換は逆写像と整合する。切断の等式に基底変換を代入すれば

$$
f_Se_S^{(d)}
=f_Tx^de_S^{(d)}
\quad\Longleftrightarrow\quad
f_S=x^df_T
\quad\Longleftrightarrow\quad
f_T=y^df_S.
$$

これが解析的正則線束の貼り合わせ規則である。
<!-- proof-end -->

たとえば $d=1$、斉次一次式 $F=aS+bT$ を取ると、両チャートでの係数は

$$
f_S=F/S=a+bx,\qquad
f_T=F/T=ay+b,
\qquad
yf_S=ay+b=f_T.
$$

これは単なる公式の一致ではなく、**同じ切断が異なる基底でどう見えるか**の確認である。解析側には各チャート上に代数的でない局所正則関数もあるが、それを理由に解析化した線束の遷移関数を変えるわけではない。

さらに、**層の完全列**と**大域切断の完全列**は別である。$\mathbb P^1$ には代数側と解析側で

$$
0\to\mathcal O(-2)
\xrightarrow{\ (-T,S)\ }\mathcal O(-1)^{\oplus2}
\xrightarrow{\ (S,T)\ }\mathcal O\to0
$$

という局所的に短完全な列がある。$U_S$ 上では最後の射は $(a,b)\mapsto a+xb$、核は $(-x,1)$ の倍であり、$U_T$ 上では $(a,b)\mapsto ya+b$、核は $(-1,y)$ の倍となる。だが[射影直線の大域切断の計算](../../AG/AG2-06/index.md#thm-ag2-06-p1-sections)から $H^0(\mathcal O(-1))=0$、$H^0(\mathcal O)=\mathbb C$ なので、大域切断にした $0\to\mathbb C$ の最後の写像は全射でない。この差は、次章以降にコホモロジーが必要となる理由でもある。

## 5. 演習

### Level A

<a id="ex-cag1-03-a01"></a>
#### CAG1-03-A01 二重の点を支える層
- Level: A

$A=\mathbb C[t]$、$M=A/(t^2)$ とする。$\widetilde M^{\mathrm{an}}$ の支持、原点と $a\ne0$ における茎を求め、原点の長さを計算せよ。

<!-- solution-start -->
**詳細解答**。有限表示 $A\xrightarrow{t^2}A\to M\to0$ を解析化すると[有限表示の解析化](#prop-cag1-03-local-presentation)より $\mathcal O_{\mathbb C}\xrightarrow{z^2}\mathcal O_{\mathbb C}\to\widetilde M^{\mathrm{an}}\to0$ となる。$a\ne0$ では $z^2$ が局所単元なので余核は0。原点では余核は $\mathbb C\{z\}/(z^2)$ であり、各類は唯一に $a_0+a_1[z]$ と書ける。鎖 $(0)\subset([z])\subset\mathbb C\{z\}/(z^2)$ の二つの商はともに $\mathbb C$ で、長さは2。支持は $\{0\}$ である。
<!-- solution-end -->

<a id="ex-cag1-03-a02"></a>
#### CAG1-03-A02 行列から解析的余核へ
- Level: A

$A=\mathbb C[x,y]$、$M=A/(x,y)$ とする。有限表示行列を一つ書き、解析化した層の原点での茎と、$(1,0)$ での茎を計算せよ。

<!-- solution-start -->
**詳細解答**。$P:A^2\to A$、$P(a,b)=xa+yb$ と取ると $\operatorname{im}P=(x,y)$、従って $\operatorname{coker}P=M$。原点では正則行列 $(x\ \ y)$ の余核は $\mathbb C\{x,y\}/(x,y)\simeq\mathbb C$ となる。$(1,0)$ の近傍では $x$ は単元なので、$1=x\cdot x^{-1}+y\cdot0$ が像に入り、余核は0である。
<!-- solution-end -->

<a id="ex-cag1-03-a03"></a>
#### CAG1-03-A03 茎と点上のファイバー
- Level: A

$X=\mathbb A^1_{\mathbb C}$、$\mathcal F=\widetilde{\mathbb C[t]/(t^2)}$ とする。原点の解析的茎 $\mathcal F^{\mathrm{an}}_0$ と、その極大イデアル $(t)$ で割ったファイバー $\mathcal F^{\mathrm{an}}_0/(t)\mathcal F^{\mathrm{an}}_0$ を比較せよ。

<!-- solution-start -->
**詳細解答**。[解析化の定義](#def-cag1-03-sheaf-analytification)と商とのテンソル積から茎は $R=\mathbb C\{t\}/(t^2)$。$R$ では $1,[t]$ が独立で、$\dim_{\mathbb C}R=2$。極大イデアルによる商は $R/(t)\simeq\mathbb C\{t\}/(t)\simeq\mathbb C$、その次元は1である。ファイバーだけを見れば冪零元 $[t]$ は消えるので、層の局所的な厚みは茎で検査する必要がある。
<!-- solution-end -->

<a id="ex-cag1-03-a04"></a>
#### CAG1-03-A04 二次ねじり層の係数変換
- Level: A

$\mathbb P^1$ の標準座標 $x=T/S$、$y=S/T$ で $\mathcal O(2)^{\mathrm{an}}$ の基底変換を書け。斉次式 $F=S^2+ST$ の局所係数 $f_S,f_T$ が貼り合うことを確かめよ。

<!-- solution-start -->
**詳細解答**。[ねじり層の解析化](#prop-cag1-03-analytic-twisting)より $e_T^{(2)}=x^2e_S^{(2)}$、係数は $f_T=y^2f_S$ を満たす。$U_S$ では $F/S^2=1+x$、$U_T$ では $F/T^2=y^2+y$。重なりで $y=1/x$ を用いると $y^2(1+x)=y^2+y$ であるから、一つの切断として貼り合う。
<!-- solution-end -->

<a id="ex-cag1-03-a05"></a>
#### CAG1-03-A05 点評価は平坦でない
- Level: A

$A=\mathbb C[t]$、$B=A/(t)$ とする。$A\xrightarrow{t}A$ が単射であること、$B\otimes_A-$ を作用させると単射でなくなることを示せ。これが $\mathcal O_{X,0}\to\mathcal O_{X^{\mathrm{an}},0}$ と異なる理由を述べよ。

<!-- solution-start -->
**詳細解答**。$A$ は整域だから $ta=0$ なら $a=0$ であり、乗法 $t$ は単射。一方 $B=A/(t)$ であるから、テンソル後には

$$
B\otimes_AA\simeq B,\qquad
B\xrightarrow{\ 0\ }B
$$

が現れる。$B\ne0$ なので零写像は単射でなく、点評価 $A\to B$ は平坦でない。

解析化の局所写像は $A_{(t)}\to\mathbb C\{t\}$ であり、$t$ は右辺でも非零の正則関数の芽だからこの失敗は起きない。一般の単射についても保存できる根拠は[忠実平坦性の定理](#thm-cag1-03-analytic-faithful-flatness)であり、この一例だけから全一般性が出るわけではない。
<!-- solution-end -->

### Level B

<a id="ex-cag1-03-b01"></a>
#### CAG1-03-B01 二重零点の完全列
- Level: B

$X=\operatorname{Spec}\mathbb C[t]$ における短完全列

$$
0\to\mathcal O_X\xrightarrow{t^2}\mathcal O_X
\to\widetilde{\mathbb C[t]/(t^2)}\to0
$$

を解析化し、原点と $a\ne0$ の茎で左端の単射と右端の余核を別々に確かめよ。

<!-- solution-start -->
**詳細解答**。解析化後の候補は $0\to\mathcal O_{\mathbb C}\xrightarrow{z^2}\mathcal O_{\mathbb C}\to\mathcal O_{\mathbb C}/(z^2)\to0$。[局所環の平坦性](#thm-cag1-03-analytic-faithful-flatness)から完全性は保証されるが、直接にも確認する。原点で $z^2f(z)=0$ なら、収束冪級数の最初の非零係数の次数を2増やしても零にはならないので $f=0$。像は $(z^2)$ で、余核は $\mathbb C\{z\}/(z^2)$。$a\ne0$ では $z^2$ の芽に逆数があるため乗法は同型で、余核は0。すべての点の茎が完全なので層の列も短完全となる。
<!-- solution-end -->

<a id="ex-cag1-03-b02"></a>
#### CAG1-03-B02 関係式を冗長にしても変わらない
- Level: B

$A=\mathbb C[x,y]$、$M=A/(x,y)$ とする。二つの表示 $A^2\xrightarrow{(x\ \ y)}A\to M\to0$ と $A^3\xrightarrow{(x\ \ y\ \ x+y)}A\to M\to0$ を考える。解析化した余核が同型であることを、関係イデアルを比較して示せ。

<!-- solution-start -->
**詳細解答**。第一の行列の像は $I=(x,y)$、第二の像は $J=(x,y,x+y)$。$x+y=1\cdot x+1\cdot y$ は $I$ に属するので $J\subseteq I$、逆に $x,y$ は $J$ の生成元だから $I\subseteq J$。従って $I=J$ であり、両表示の余核は同じ $M$。

解析化後も、任意の解析的開集合 $V\subseteq\mathbb C^2$ 上で正則関数 $f,g,h$ に対して

$$
xf+yg+(x+y)h=x(f+h)+y(g+h)
$$

が成立する。したがって正則イデアル層でも $(x,y,x+y)=(x,y)$ であり、両方の余核は $\mathcal O_{\mathbb C^2}/(x,y)$ に同型である。これは右完全性の直接計算であり、平坦性を仮定していない。
<!-- solution-end -->

<a id="ex-cag1-03-b03"></a>
#### CAG1-03-B03 負のねじり層と双対
- Level: B

$\mathbb P^1$ 上で $\mathcal O(1)^{\mathrm{an}}$ の局所基底の双対を取り、双対線束の基底変換が $\mathcal O(-1)^{\mathrm{an}}$ に一致することを証明せよ。

<!-- solution-start -->
**詳細解答**。$e_T^{(1)}=xe_S^{(1)}$ と置く。[双対の遷移規則](../../AG/AG2-06/index.md#prop-ag2-06-tensor-dual)を直接確かめるため、双対基底を $\lambda_S(e_S^{(1)})=1$、$\lambda_T(e_T^{(1)})=1$ で定める。

$\lambda_T=c\lambda_S$ と置いて第二の基底に評価すると、

$$
1=\lambda_T(e_T^{(1)})
=c\lambda_S(xe_S^{(1)})=cx,
\qquad c=x^{-1}=y.
$$

したがって $\lambda_T=x^{-1}\lambda_S$。これは[ねじり層の解析化](#prop-cag1-03-analytic-twisting)を $d=-1$ に適用した基底変換 $e_T^{(-1)}=x^{-1}e_S^{(-1)}$ と一致する。$x^{-1}$ は重なり $x\ne0$ 上で正則な単元なので、双対の貼り合わせは有効である。
<!-- solution-end -->

<a id="ex-cag1-03-b04"></a>
#### CAG1-03-B04 層では完全、大域切断では非完全
- Level: B

$\mathbb P^1$ の列

$$
0\to\mathcal O(-2)\xrightarrow{(-T,S)}
\mathcal O(-1)^{\oplus2}\xrightarrow{(S,T)}
\mathcal O\to0
$$

が層として短完全であることを両チャートで示し、大域切断を取った列のどこで全射性が失われるかを計算せよ。

<!-- solution-start -->
**詳細解答**。$U_S$ 上で最後の射は $(a,b)\mapsto a+xb$ なので、$(c,0)$ を送れば任意の $c$ を得て全射。核は $a=-xb$ で、$(-x,1)b$ が生成する。第一の射は $(-T,S)$ の局所表示が $(-x,1)$ となるから核全体を与え、かつ単射である。$U_T$ では最後の射が $(a,b)\mapsto ya+b$、核は $(1,-y)a$、第一の射の局所表示 $(-1,y)$ が同じ核を符号を除いて生成する。従って各点の近傍で短完全である。

[射影直線の $\mathcal O(d)$ の切断](../../AG/AG2-06/index.md#thm-ag2-06-p1-sections)から、代数側では

$$
H^0(\mathcal O(-2))=H^0(\mathcal O(-1))=0,
\qquad H^0(\mathcal O)=\mathbb C.
$$

解析側も直接確かめよう。$d=-1,-2$ の大域切断の $U_S$ 上の係数を整関数 $f_S(x)$ とすると、遷移条件は

$$
f_T(y)=y^df_S(1/y).
$$

右辺が $y=0$ で正則であるため $f_S(x)=O(|x|^d)$（$|x|\to\infty$）となる。$d<0$ なので $f_S$ は無限遠で零に近づき、[Liouvilleの定理](../../../解析系/CA/CA3/index.md#thm-ca3-liouville)から恒等的に零である。$d=0$ の大域正則関数も射影直線上で定数である。

従って解析側でも大域切断の列は $0\to0\to0\to\mathbb C$ となり、最後の $0\to\mathbb C$ は全射でない。層の射が各点の近傍で全射でも、局所的な持ち上げが大域的に貼り合うとは限らない。
<!-- solution-end -->

### Level C

<a id="ex-cag1-03-c01"></a>
#### CAG1-03-C01 非被約曲線上の層と解析化
- Level: C

$A=\mathbb C[x,y]/(xy,y^2)$、$X=\operatorname{Spec}A$、$M=A/(x)$、$\mathcal F=\widetilde M$ とする。

1. $A$ における $x$ の零化イデアルが $(y)$ であることを示し、$0\to A/(y)\xrightarrow{\ x\ }A\to M\to0$ が短完全であることを証明せよ。
2. 解析化した原点の局所環 $R$ と $\mathcal F^{\mathrm{an}}_0$ を求め、$\mathcal F^{\mathrm{an}}_0$ の $\mathbb C$-ベクトル空間としての長さを求めよ。
3. $a\ne0$ の点 $(a,0)$ で $\mathcal F^{\mathrm{an}}_{(a,0)}=0$ を示せ。さらに(1)の列を解析化した列の原点での完全性を、環の元を使って確認せよ。
4. この計算だけで非固有な $X$ の代数的・解析的大域切断がすべて一致すると結論できない理由を述べよ。

<!-- solution-start -->
**詳細解答**。

(1) 関係式 $xy=y^2=0$ により、$A$ の元は唯一に

$$
f(x)+cy,\qquad f\in\mathbb C[x],\quad c\in\mathbb C
$$

と書ける。実際、$x$ と $y$ の混合項、$y$ の二次以上の項は消え、残った $1,x,x^2,\ldots,y$ はこの二つの関係式だけでは線形従属にならない。

この表示で $x(f(x)+cy)=xf(x)$ が零となるのは、$\mathbb C[x]$ が整域なので $f=0$ のときだけ。よって $\operatorname{ann}_A(x)=(y)$。乗法 $x:A/(y)\to A$ は核が零で像が $(x)$、商 $A/(x)$ は $M$ だから、主張の列は短完全である。

(2) [解析化の局所環の式](../CAG1-02/index.md#prop-cag1-02-stalk-comparison)から

$$
R=\mathcal O_{X^{\mathrm{an}},0}
=\mathbb C\{x,y\}/(xy,y^2).
$$

$\mathcal F^{\mathrm{an}}_0=R/(x)$ は

$$
R/(x)\simeq\mathbb C\{y\}/(y^2)
=\mathbb C\cdot1\oplus\mathbb C\cdot[y]
$$

で、$[y]\ne0$ かつ $[y]^2=0$。したがって長さは2である。ここで「長さ」は局所環上の組成列の長さで、$(0)\subset([y])\subset R/(x)$ の二つの商がともに剰余体 $\mathbb C$ であることから従う。

(3) $(a,0)$（$a\ne0$）の近傍では $x$ が単元なので $M$ の関係 $x=0$ から $\mathcal F^{\mathrm{an}}=0$。原点では $R$ の任意の元を唯一に $f(x)+cy$（$f\in\mathbb C\{x\}$）と書ける。$x(f(x)+cy)=xf(x)$ で、収束冪級数環 $\mathbb C\{x\}$ は整域だから零化イデアルは $(y)$。従って

$$
0\to R/(y)\xrightarrow{\ x\ }R\longrightarrow R/(x)\to0
$$

で左の射は単射、像は $(x)$、右の余核は $R/(x)$ と直接確かめられる。これは[連接層の解析化が完全列を保つ定理](#thm-cag1-03-coherent-exact)の具体的検算である。

(4) (1)〜(3)は茎と局所的な完全列の比較である。一方、$X^{\mathrm{an}}$ 上で $e^x$ は周囲の $\mathbb C^2$ 上の正則関数を制限した大域切断を与える。

もしこれが代数的大域関数 $f(x)+cy\in A$ の解析化なら、被約な $x$ 軸（$y=0$）へ制限して、複素平面全体で

$$
e^x=f(x)
$$

が成立してしまう。しかし指数関数は多項式でない（[アフィン直線上の関数比較](../CAG1-01/index.md#prop-cag1-01-affine-mismatch)）。従って、この $X$ 自身でも構造層の大域切断は一致しない。GAGAによる大域的比較には射影性などの仮定と別の証明が必要である。
<!-- solution-end -->

## 6. 比較の次の問い

本章で得たのは、**局所的**な連接性と完全性である。解析化した有限表示は正則関数の行列で計算でき、局所環の忠実平坦性は核の情報を失わせない。解析的連接性にはOkaの定理という独立の解析的根拠がある。非被約な例でもこれらは成り立ち、射影性を要しない。

一方、$\mathcal O(d)$ の遷移関数が同じでも、任意の代数的層と解析的層の大域切断やコホモロジーが直ちに一致するわけではない。次章では射影空間上の $\mathcal O(d)$ を基底例として、**局所データがどの条件で大域的な比較につながるか**を調べる。

**解析的入力の参照先**：[Serre, *Géométrie algébrique et géométrie analytique* (1956)](https://aif.centre-mersenne.org/item/AIF_1956__6__1_0/) および [Kedlaya, MIT 18.726 *GAGA*, §§1–2](https://kskedlaya.org/18.726/gaga.pdf)。本章は解析的局所環のNoether性・Okaの連接性・完備化の忠実平坦性を引用し、それらを含めた自己完結証明を主張しない。コホモロジー比較や代数化のGAGA本体はまだ用いていない。
