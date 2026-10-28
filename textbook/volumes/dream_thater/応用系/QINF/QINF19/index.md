# QINF19 強劣加法性と条件付き相互情報量

## 1. 第三の系が分かると、情報の差はどう変わるか

[QINF18の量子相互情報量](../QINF18/index.md#def-qinf18-mutual)は、$A$ と $B$ が共有する情報を $I(A:B)$ で測りました。しかし、もう一つの系 $C$ も手元にある場合、$A$ と $BC$ の共有情報は $A$ と $B$ だけの場合より小さくなるでしょうか。$C$ を捨てる操作で情報が増えるなら、情報量の解釈は困難になります。

二部系の[部分加法性](../QINF18/index.md#thm-qinf18-subadditivity)だけでは、この「第三の系を捨てる向き」の不等式は証明できません。本章では三部系で差を測る量を作り、**非可換な任意の有限密度行列**についても成り立つ三部不等式を証明します。核心になる行列補題も途中を飛ばさずに導きます。

有限次元の複素Hilbert空間 $H_A,H_B,H_C$ と密度演算子 $\rho_{ABC}$ を用います。[部分トレース](../QINF3/index.md#def-qinf3-partial-trace)で得る縮約の添字を $\rho_{AB},\rho_B,\rho_{BC}$ などと書き、$S_X=S(\rho_X)$ と略記します。エントロピーの対数は常に底2、固有値0の寄与は $0\log_2 0=0$ です。

## 2. 条件付き相互情報量：二つの差を比べる

$B$ だけを保持する場合と、$BC$ を保持する場合に $A$ について得られる情報量を比較します。差の差を取ると、同じ項 $S_A$ が消え、三部系の四つのエントロピーで表されます。

<a id="def-qinf19-cmi"></a>

<!-- formal-statement-start -->
> **定義（量子条件付き相互情報量）**
> 有限次元の三部密度演算子 $\rho_{ABC}$ の各縮約に対し、$B$ を条件とする $A,C$ の**量子条件付き相互情報量**を

$$
I(A:C|B)_\rho
:=S_{AB}+S_{BC}-S_B-S_{ABC}
$$

> と定義する。$A,C$ の交換で値は変わらない。これは[条件付きエントロピー](../QINF18/index.md#def-qinf18-conditional)を使えば $S(A|B)-S(A|BC)$、[相互情報量](../QINF18/index.md#def-qinf18-mutual)を使えば $I(A:BC)-I(A:B)$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf19-cmi -->
### 定義の確認：第三の独立なqubit

**定義の確認**として、$\rho_{AB}$ を任意の二部密度演算子とし、$\tau_C=I_2/2$ を独立に付けて $\rho_{ABC}=\rho_{AB}\otimes\tau_C$ とします。テンソル積は正値、トレースは $1\cdot1=1$。[積状態のエントロピー加法性](../QINF17/index.md#prop-qinf17-tensor)と[積の部分トレース](../QINF3/index.md#def-qinf3-partial-trace)から

$$
S_{ABC}=S_{AB}+1,\qquad S_{BC}=S_B+1.
$$

よって $I(A:C|B)=S_{AB}+(S_B+1)-S_B-(S_{AB}+1)=0$。$AB$ に強い相関があっても、独立に足した $C$ は新しい相関を運びません。定義の四項と条件 $B$ の位置を、ここで直接確認できました。
<!-- definition-example-end -->

反対に、$|\mathrm{GHZ}\rangle=(|000\rangle+|111\rangle)/\sqrt2$ の純粋三qubit状態では、$AB,BC,B$ の縮約はいずれも二つの非零固有値 $1/2,1/2$ を持ち、全体はrank 1です。従って

$$
(S_{AB},S_{BC},S_B,S_{ABC})=(1,1,1,0),\qquad I(A:C|B)=1.
$$

ここで $B$ を計算基底で測れば $A,C$ は各結果の下で決まりますが、**$B$ の測定結果を持つこと**と**量子系 $B$ 自体を保持すること**は同じではありません。$I(A:C|B)$ を安易に古典条件付き分布の情報量と読み替えないでください。

## 3. 一般の不等式を支える有限行列の道具

欲しいのは $I(A:BC)\ge I(A:B)$ です。そのため、一般の正定値行列 $T,R$ を部分トレースした際、対数を含む量がどう変わるかを先に調べます。対数の行列式を成分ごとに比較することはできません。非可換な $T,R$ に対しては、**行列の空間そのものをHilbert空間として扱う**工夫が有効です。

### 3.1 逆行列は圧縮の下で不等式を満たす

有限次元Hilbert空間 $K,L$ と $L$ から $K$ への等長写像 $U$（$U^\dagger U=I_L$）を考えます。$K$ 上の正定値作用素 $M$ を $L$ へ圧縮した $U^\dagger M U$ も正定値です。

<a id="lem-qinf19-inverse-compression"></a>

<!-- formal-statement-start -->
> **補題（逆行列の圧縮不等式）**
> 有限次元Hilbert空間間の等長写像 $U:L\to K$ と、$K$ 上の正定値Hermitian行列 $M$ に対して、$L$ 上のHermitian行列の順序で

$$
(U^\dagger M U)^{-1}\ \le\ U^\dagger M^{-1}U
$$

> が成立する。特に $M=X+sI_K$（$X>0,\ s\ge0$）にも同じ不等式を適用できる。
<!-- formal-statement-end -->

### 証明の見取り図

左辺の逆行列は圧縮された小空間の中だけで最適化した値、右辺は大空間で最適化できる値です。正定値性を使って平方完成すると、この差がそのまま不等式になります。

<!-- proof-start -->
### 証明

任意の正定値 $M$ と $v\in K$ に対し、平方完成から

$$
2\operatorname{Re}\langle v,w\rangle-\langle w,Mw\rangle
=\langle v,M^{-1}v\rangle
-\|M^{1/2}w-M^{-1/2}v\|^2.
$$

従って $w=M^{-1}v$ で最大となり、

$$
\langle v,M^{-1}v\rangle
=\max_{w\in K}\{2\operatorname{Re}\langle v,w\rangle-\langle w,Mw\rangle\}.
$$

$x\in L$ として、この恒等式を $U^\dagger M U$ に適用すると

$$
\begin{aligned}
\langle x,(U^\dagger M U)^{-1}x\rangle
&=\max_{y\in L}\{2\operatorname{Re}\langle x,y\rangle-\langle Uy,MUy\rangle\}\\
&\le\max_{w\in K}\{2\operatorname{Re}\langle Ux,w\rangle-\langle w,Mw\rangle\}\\
&=\langle Ux,M^{-1}Ux\rangle\\
&=\langle x,U^\dagger M^{-1}Ux\rangle.
\end{aligned}
$$

不等式では $w=Uy$ だけの最大値を全 $K$ での最大値へ広げました。全ての $x$ で二次形式の大小が成立するため、作用素順序の主張を得ます。$\square$
<!-- proof-end -->

この補題を対数へつなぐため、正数 $x$ の積分恒等式

$$
-\ln x=\int_0^\infty
\left(\frac1{x+s}-\frac1{1+s}\right)\,ds
$$

を使います。実際、上限 $L$ まで積分した値は $\ln((x+L)/(1+L))-\ln x$ であり、$L\to\infty$ で $-\ln x$ です。正定値作用素にも固有値ごとにこの式を適用できます。[逆行列の圧縮不等式](#lem-qinf19-inverse-compression)を $M=X+sI$ に適用し、$U^\dagger U=I$ により定数項が相殺されるので

$$
-\ln(U^\dagger XU)\ \le\ U^\dagger(-\ln X)U
\qquad(X>0).
$$

ここで両辺はHermitian行列です。積分は有限個の正固有値に対する収束積分なので、成分ごとに取ることができます。

### 3.2 行列をベクトルと見て部分トレースを比較する

有限次元Hilbert空間 $H$ 上の全行列の集合 $\mathcal M(H)$ には、**Hilbert–Schmidt内積** $\langle X,Y\rangle_{\rm HS}=\operatorname{Tr}(X^\dagger Y)$ が入ります。これは行列成分の絶対値二乗の和をノルムとする内積です。正定値行列 $R,T$ に対し、行列 $X$ へ「左から $R$、右から $T^{-1}$」を掛ける線形作用素を

$$
\Delta_{R,T}(X):=RXT^{-1}
$$

と置きます。正定値性を確かめると

$$
\langle X,\Delta_{R,T}X\rangle_{\rm HS}
=\operatorname{Tr}\!\left((R^{1/2}XT^{-1/2})^\dagger
(R^{1/2}XT^{-1/2})\right)>0
\quad(X\ne0).
$$

従って $\Delta_{R,T}$ は行列の空間上の正定値Hermitian線形写像です（内積で左右を入れ替えた式も同じトレースになる）。この写像を介すると、非可換な $R,T$ でも対数比較が可能になります。

<a id="lem-qinf19-partial-trace-log"></a>

<!-- formal-statement-start -->
> **補題（正定値行列の部分トレース比較）**
> 有限次元二部系 $H_X\otimes H_Y$ 上の厳密に正定値な密度演算子 $T_{XY},R_{XY}$ を取る。$T_X=\operatorname{Tr}_Y T_{XY}$、$R_X=\operatorname{Tr}_Y R_{XY}$ も正定値である。このとき自然対数を用いて

$$
\operatorname{Tr}\bigl[T_X(\ln T_X-\ln R_X)\bigr]
\le
\operatorname{Tr}\bigl[T_{XY}(\ln T_{XY}-\ln R_{XY})\bigr].
$$

> ここで主張しているのは、厳密に正定値な行列と**部分トレース**に対する比較である。
<!-- formal-statement-end -->

### 証明の見取り図

$T_{XY}$ を使って、$X$ 側の行列空間を $XY$ の行列空間へ等長に埋め込みます。その圧縮が $\Delta_{R_X,T_X}$ になることを部分トレースで直接計算し、前節の $-\ln$ の不等式を適用します。最後に、作用素 $\Delta$ 上の対数を元の行列 $R,T$ の対数へ戻します。

<!-- proof-start -->
### 証明

厳密な正定値性から $T_X>0$ です。実際、任意の $0\ne u\in H_X$ と $H_Y$ の正規直交基底 $e_j$ に対し

$$
\langle u,T_Xu\rangle
=\sum_j\langle u\otimes e_j,T_{XY}(u\otimes e_j)\rangle>0.
$$

$R_X>0$ も同様です。$X$ 側の行列空間から全体系の行列空間への線形写像を

$$
\mathcal U(Z):=(ZT_X^{-1/2}\otimes I_Y)\,T_{XY}^{1/2}
$$

とします。任意の行列 $Z,W$ に対し、トレースの巡回性と部分トレースの性質から

$$
\begin{aligned}
\langle\mathcal U(Z),\mathcal U(W)\rangle_{\rm HS}
&=\operatorname{Tr}\!\left[T_{XY}
(T_X^{-1/2}Z^\dagger W T_X^{-1/2}\otimes I_Y)\right]\\
&=\operatorname{Tr}(T_X T_X^{-1/2}Z^\dagger W T_X^{-1/2})\\
&=\operatorname{Tr}(Z^\dagger W).
\end{aligned}
$$

従って $\mathcal U^\dagger\mathcal U=I$。さらに $\Delta_{R_{XY},T_{XY}}$ の定義を代入して

$$
\begin{aligned}
\langle\mathcal U(Z),\Delta_{R_{XY},T_{XY}}\mathcal U(W)\rangle_{\rm HS}
&=\operatorname{Tr}\!\left[(T_X^{-1/2}Z^\dagger\otimes I_Y)
R_{XY}(WT_X^{-1/2}\otimes I_Y)\right]\\
&=\operatorname{Tr}(T_X^{-1/2}Z^\dagger R_XWT_X^{-1/2})\\
&=\operatorname{Tr}(Z^\dagger R_XWT_X^{-1})\\
&=\langle Z,\Delta_{R_X,T_X}W\rangle_{\rm HS}.
\end{aligned}
$$

つまり $\mathcal U^\dagger\Delta_{R_{XY},T_{XY}}\mathcal U=\Delta_{R_X,T_X}$ です。前節で証明した $-\ln$ の圧縮不等式に代入し、$Z=T_X^{1/2}$ に関する二次形式を取ります。この $Z$ は

$$
\mathcal U(T_X^{1/2})
=(T_X^{1/2}T_X^{-1/2}\otimes I_Y)T_{XY}^{1/2}
=T_{XY}^{1/2}
$$

を満たすので

$$
\langle T_X^{1/2},-\ln\Delta_{R_X,T_X}\,T_X^{1/2}\rangle_{\rm HS}
\le
\langle T_{XY}^{1/2},-\ln\Delta_{R_{XY},T_{XY}}\,T_{XY}^{1/2}\rangle_{\rm HS}.
$$

残るのは、両辺が主張した対数のトレースであることの確認です。$R,T$ のそれぞれの固有基底を $u_i,v_j$、正固有値を $r_i,t_j$ とすると、行列 $|u_i\rangle\langle v_j|$ は $\Delta_{R,T}$ の固有行列で、固有値は $r_i/t_j>0$ です。従って

$$
\ln\Delta_{R,T}(Z)=(\ln R)Z-Z(\ln T).
$$

特に $Z=T^{1/2}$ に代入して左から $T^{1/2}$ と内積を取ると

$$
\begin{aligned}
\langle T^{1/2},-\ln\Delta_{R,T}\,T^{1/2}\rangle_{\rm HS}
&=-\operatorname{Tr}(T^{1/2}(\ln R)T^{1/2})
+\operatorname{Tr}(T\ln T)\\
&=\operatorname{Tr}[T(\ln T-\ln R)].
\end{aligned}
$$

この恒等式を $X$ と $XY$ にそれぞれ適用して証明が完了します。$\square$
<!-- proof-end -->

補題の比較量は、**二つの正定値行列を引数とする対数の差**です。ここで必要な部分トレースの場合の証明は終わりました。一般の零固有値に伴う台条件や、任意の量子チャネルでの単調性は後続で扱います。

## 4. 強劣加法性を証明する

ようやく三部系へ戻ります。比較補題で $XY=ABC$、$X=AB$、$Y=C$ と置きます。$T$ は実際の三部状態、$R$ は「$A$ と $BC$ の積」に選ぶと、その縮約が「$A$ と $B$ の積」になります。これによって二つの相互情報量を直接比較できます。

<a id="thm-qinf19-ssa"></a>

<!-- formal-statement-start -->
> **定理（強劣加法性）**
> 任意の有限次元三部系の密度演算子 $\rho_{ABC}\ge0$、$\operatorname{Tr}\rho_{ABC}=1$ に対し、各縮約のvon Neumannエントロピーは

$$
S_{AB}+S_{BC}\ \ge\ S_B+S_{ABC}
$$

> を満たす。固有値0があっても成立し、同値に $I(A:C|B)_\rho\ge0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

最初に状態へ小さな最大混合成分を足し、全行列を正定値にして[部分トレース比較](#lem-qinf19-partial-trace-log)を使います。比較する二つのトレースをエントロピーの加減算に直し、最後に混合成分を0へ戻します。有限次元で $-x\log_2 x$ が $x=0$ でも連続なことが、零固有値への橋です。

<!-- proof-start -->
### 証明

$d=\dim(H_A\otimes H_B\otimes H_C)$ とし、$0<\varepsilon<1$ について

$$
\rho^{(\varepsilon)}_{ABC}
=(1-\varepsilon)\rho_{ABC}+\varepsilon I_d/d
$$

と置きます。これは正定値でトレース1、各縮約 $\rho_A^{(\varepsilon)},\rho_B^{(\varepsilon)},\rho_{BC}^{(\varepsilon)}$ も正定値です。補題の引数を

$$
T_{ABC}=\rho^{(\varepsilon)}_{ABC},\qquad
R_{ABC}=\rho_A^{(\varepsilon)}\otimes\rho_{BC}^{(\varepsilon)}
$$

と選びます。$C$ の部分トレース後は $T_{AB}=\rho_{AB}^{(\varepsilon)}$ と $R_{AB}=\rho_A^{(\varepsilon)}\otimes\rho_B^{(\varepsilon)}$ です。全て正定値なので[部分トレース比較補題](#lem-qinf19-partial-trace-log)を適用でき、自然対数を底2に変える正の係数 $1/\ln2$ を両辺に掛ければ

$$
\begin{aligned}
&\operatorname{Tr}\rho_{AB}^{(\varepsilon)}
\bigl(\log_2\rho_{AB}^{(\varepsilon)}
-\log_2(\rho_A^{(\varepsilon)}\otimes\rho_B^{(\varepsilon)})\bigr)\\
&\quad\le
\operatorname{Tr}\rho_{ABC}^{(\varepsilon)}
\bigl(\log_2\rho_{ABC}^{(\varepsilon)}
-\log_2(\rho_A^{(\varepsilon)}\otimes\rho_{BC}^{(\varepsilon)})\bigr).
\end{aligned}
$$

正定値行列の積の対数は、積固有基底で局所対数の和になります。これを[部分トレースのトレース恒等式](../QINF3/index.md#def-qinf3-partial-trace)で評価すると、左辺は

$$
-S_{AB}^{(\varepsilon)}+S_A^{(\varepsilon)}+S_B^{(\varepsilon)}
=I(A:B)_{\rho^{(\varepsilon)}},
$$

右辺は

$$
-S_{ABC}^{(\varepsilon)}+S_A^{(\varepsilon)}+S_{BC}^{(\varepsilon)}
=I(A:BC)_{\rho^{(\varepsilon)}}.
$$

従って $I(A:B)_{\rho^{(\varepsilon)}}\le I(A:BC)_{\rho^{(\varepsilon)}}$。両辺から $S_A^{(\varepsilon)}$ を消すと

$$
S_{AB}^{(\varepsilon)}+S_{BC}^{(\varepsilon)}
-S_B^{(\varepsilon)}-S_{ABC}^{(\varepsilon)}\ge0.
$$

$\varepsilon\to0$ とすると各縮約行列は元の縮約へ収束します。有限行列の固有値は連続に変化し、$f(x)=-x\log_2x$ を $f(0)=0$ と延長した関数も $[0,1]$ 上で連続です。[von Neumannエントロピーの固有値表示](../QINF17/index.md#def-qinf17-entropy)から全ての $S_X^{(\varepsilon)}\to S_X$。上の不等式の極限を取って

$$
S_{AB}+S_{BC}-S_B-S_{ABC}=I(A:C|B)_\rho\ge0
$$

を得ます。ここでは特異行列の $\log0$ を直接評価していません。$\square$
<!-- proof-end -->

これは古典分布を対角行列に埋めた場合にも成立しますが、証明そのものは**$R$ と $T$ の可換性を仮定していません**。非可換な一般状態の主張を、古典対数和不等式だけから導いたことにはしていない点が重要です。

## 5. 条件付きエントロピーと相互情報量の「向き」

強劣加法性は、単に四つのエントロピーを足し引きする定理ではありません。$B$ しか持たない側に新たに $C$ を渡すと、$A$ についての条件付きエントロピーは増えず、$A$ との相互情報量は減りません。

<a id="cor-qinf19-monotonicity"></a>

<!-- formal-statement-start -->
> **系（条件付きエントロピーの単調性と連鎖律）**
> 任意の有限次元三部密度演算子 $\rho_{ABC}$ について

$$
S(A|BC)\le S(A|B),\qquad
I(A:B)\le I(A:BC),
$$

> また相互情報量の連鎖律

$$
I(A:BC)=I(A:B)+I(A:C|B)
$$

> が成り立つ。三つの表現の差はいずれも同じ非負の $I(A:C|B)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

各定義を展開し、同じ $S_A$ と $S_B$ を相殺するだけで三つの式はつながります。非負性そのものは[強劣加法性](#thm-qinf19-ssa)から来ます。

<!-- proof-start -->
### 証明

[条件付きエントロピーの定義](../QINF18/index.md#def-qinf18-conditional)を $A|B$ と $A|BC$ に適用すると

$$
\begin{aligned}
S(A|B)-S(A|BC)
&=(S_{AB}-S_B)-(S_{ABC}-S_{BC})\\
&=S_{AB}+S_{BC}-S_B-S_{ABC}\\
&=I(A:C|B)\ge0.
\end{aligned}
$$

同じく[相互情報量の定義](../QINF18/index.md#def-qinf18-mutual)では

$$
\begin{aligned}
I(A:BC)-I(A:B)
&=(S_A+S_{BC}-S_{ABC})-(S_A+S_B-S_{AB})\\
&=S_{AB}+S_{BC}-S_B-S_{ABC}\\
&=I(A:C|B)\ge0.
\end{aligned}
$$

第1式と第2式から二つの不等式を得て、第2式の項を移せば連鎖律です。$\square$
<!-- proof-end -->

ただし「より大きな条件を知れば古典的な不確かさが正から0へ下がる」という解釈は、量子では慎重に使います。$S(A|BC)$ 自体は負にもなります。保証されているのは**差の符号**であって、個々の条件付きエントロピーの非負性ではありません。

## 6. 等号は何を表すか：量子Markov条件への入口

[強劣加法性](#thm-qinf19-ssa)の等号 $I(A:C|B)=0$ は、$B$ を保持しているときに $C$ を追加しても $A$ についての相互情報量が増えないことを意味します。この情報量で等号になる状態を記述するための名前を導入します。

<a id="def-qinf19-markov"></a>

<!-- formal-statement-start -->
> **定義（量子Markov条件）**
> 有限次元三部密度演算子 $\rho_{ABC}$ が、順序 $A-B-C$ に関する**量子Markov条件**を満たすとは

$$
I(A:C|B)_\rho=0
$$

> が成立することをいう。この定義は $B$ を条件とする向きを固定しており、$A$ と $C$ は交換できるが、一般には $B$ と別の系を交換できない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf19-markov -->
### 定義の確認：Bell対に独立な系を付ける

**定義の確認**として、$A,B$ をqubit、$|\Phi^+\rangle_{AB}=(|00\rangle+|11\rangle)/\sqrt2$ とし、$C$ に純粋状態 $|0\rangle$ を付けます。$\rho_{ABC}=|\Phi^+\rangle\langle\Phi^+|_{AB}\otimes|0\rangle\langle0|_C$ はrank 1で正値、トレース1です。[Bell対の縮約](../QINF18/index.md#def-qinf18-mutual)から

$$
S_{AB}=0,\quad S_B=1,\quad S_{BC}=1+0=1,\quad S_{ABC}=0.
$$

従って $I(A:C|B)=0+1-1-0=0$ です。$A,B$ が強くエンタングルしていても、定義は「全体が古典状態」と要求していません。条件の実際の判定は四つの縮約エントロピーに戻って行います。
<!-- definition-example-end -->

### 古典旗を通じた条件付き独立

$B$ が直交状態 $|b\rangle$ に古典的なラベルを保持する場合を考えます。各 $b$ に対して $A,C$ の二部密度演算子 $\sigma_{AC}^{(b)}$、重み $p_b\ge0$（総和1）を取り、状態を

$$
\rho_{ABC}=\sum_b p_b\,\sigma_{AC}^{(b)}\otimes|b\rangle\langle b|_B
$$

と書きます。式のテンソル因子は物理的には $A,B,C$ の順へ並べ直すものとします。各項は正値で、直交する $B$ のブロックごとにトレース $p_b$ を持つので、全体のトレースは1です。$B$ が異なると別のブロックになるため、非零固有値は $p_b$ 倍された $\sigma_{AC}^{(b)}$ の固有値の合併です。

<a id="prop-qinf19-flag"></a>

<!-- formal-statement-start -->
> **命題（古典旗を条件とした等号判定）**
> 有限次元三部状態が、$B$ の正規直交基底 $|b\rangle$、確率 $p_b$、二部密度演算子 $\sigma_{AC}^{(b)}$ により

$$
\rho_{ABC}=\sum_b p_b\,\sigma_{AC}^{(b)}\otimes|b\rangle\langle b|_B
$$

> と表されるとする（因子の順は $ABC$ に揃える）。そのとき

$$
I(A:C|B)_\rho=\sum_{b:p_b>0}p_b I(A:C)_{\sigma^{(b)}}.
$$

> 特に $I(A:C|B)_\rho=0$ であるための必要十分条件は、全ての $p_b>0$ のブロックで $\sigma_{AC}^{(b)}=\sigma_A^{(b)}\otimes\sigma_C^{(b)}$ となることである。
<!-- formal-statement-end -->

### 証明の見取り図

直交するラベル $b$ ごとに固有値を並べると、各エントロピーはラベルのShannonエントロピーとブロック内の平均エントロピーの和です。四項のShannon部分が打ち消し合い、$b$ ごとの[二部相互情報量の非負性・積の等号条件](../QINF18/index.md#thm-qinf18-subadditivity)だけが残ります。

<!-- proof-start -->
### 証明

$\sigma_{AC}^{(b)}$ の固有値を $\lambda_{b,j}$ とすれば、$\rho_{ABC}$ の非零固有値は $p_b\lambda_{b,j}$ です。$p_b>0$ について

$$
\begin{aligned}
S_{ABC}
&=-\sum_{b,j}p_b\lambda_{b,j}\log_2(p_b\lambda_{b,j})\\
&=-\sum_b p_b\log_2p_b\underbrace{\sum_j\lambda_{b,j}}_{=1}
-\sum_b p_b\sum_j\lambda_{b,j}\log_2\lambda_{b,j}\\
&=H(p)+\sum_b p_b S(\sigma_{AC}^{(b)}).
\end{aligned}
$$

零の重み・固有値は $0\log_2 0=0$ とします。$AB$ を得るため $C$ を部分トレースすると、$B$ のラベルは変わらず各ブロックが $\sigma_A^{(b)}$ になります。従って同じ計算で

$$
\begin{aligned}
S_{AB}&=H(p)+\sum_b p_bS(\sigma_A^{(b)}),\\
S_{BC}&=H(p)+\sum_b p_bS(\sigma_C^{(b)}),\\
S_B&=H(p).
\end{aligned}
$$

四項を差し引くと $H(p)$ は $1+1-1-1=0$ 回分になり、

$$
I(A:C|B)=\sum_b p_b
\{S(\sigma_A^{(b)})+S(\sigma_C^{(b)})-S(\sigma_{AC}^{(b)})\}
=\sum_b p_b I(A:C)_{\sigma^{(b)}}.
$$

各相互情報量は[部分加法性](../QINF18/index.md#thm-qinf18-subadditivity)により非負で、0ならそのブロックが積状態です。正の重みを持つ非負項の和が0となるのは全項0の場合に限ります。$\square$
<!-- proof-end -->

例えば $\sigma_A^{(0)}=|0\rangle\langle0|$、$\sigma_C^{(0)}=I_2/2$、$\sigma_A^{(1)}=|+\rangle\langle+|$、$\sigma_C^{(1)}=|1\rangle\langle1|$ を選び、$p_0=p_1=1/2$ として各 $\sigma_{AC}^{(b)}=\sigma_A^{(b)}\otimes\sigma_C^{(b)}$ とします。$A$ 側の二つの純粋状態は直交していませんが、各ブロックが積なので命題から $I(A:C|B)=0$。条件付き独立を確かめるのに、$A$ の全ブロックを同時に対角化する必要はありません。

### 等号ではない例と、どこまで言えたか

GHZ純粋状態は§2で $I(A:C|B)=1$ と確認しました。一方、その交差項を除いた古典混合

$$
\omega_{ABC}=\tfrac12|000\rangle\langle000|
+\tfrac12|111\rangle\langle111|
$$

では $S_{AB}=S_{BC}=S_B=S_{ABC}=1$ なので、条件付き相互情報量は0です。二つの状態は全ての一部・二部縮約が一致するのに、**全体のエントロピーだけが0と1で異なります**。条件付き相互情報量は二部縮約だけから決められないのです。

また $A,C$ をBell対にし $B$ を独立な純粋状態とした場合は、$I(A:C|B)=I(A:C)=2$ です。$B$ を挟んでいれば何でも等号になるわけではありません。

ここでは「条件付き相互情報量0」を量子Markov条件と定義し、古典旗という広い族と量子エンタングルした等号例を確認しました。しかし、**全ての等号状態の構造や回復写像の一般的特徴付けまでは証明していません**。等号例を見つけたことを一般の構造定理の証明と取り違えないことが大切です。

## 7. 演習：第三の系を追加し、捨て、条件にする

全問で系の順序は $ABC$、エントロピーの単位はビットとします。問題に特記がなければ各系はqubitです。計算では四つの縮約エントロピーと条件付き相互情報量の差を対応付け、零固有値の対数を評価しないでください。

<a id="ex-qinf19-a01"></a>
### QINF19-A01 独立な第三の系

- Level: A

任意の有限次元二部密度演算子 $\eta_{AB}$ と、独立な密度演算子 $\tau_C$ に対し、$\rho_{ABC}=\eta_{AB}\otimes\tau_C$ とする。四つのエントロピーを $\eta,\tau$ の量で書き、$I(A:C|B)$ を求めよ。

<!-- solution-start -->
### 詳細解答

テンソル積は正値で、トレースは $1\cdot1=1$ です。[積の部分トレース](../QINF3/index.md#def-qinf3-partial-trace)より $\rho_{AB}=\eta_{AB}$、$\rho_{BC}=\eta_B\otimes\tau_C$、$\rho_B=\eta_B$ です。[エントロピー加法性](../QINF17/index.md#prop-qinf17-tensor)を後二者と全体に適用すると

$$
S_{AB}=S(\eta_{AB}),\quad S_{BC}=S(\eta_B)+S(\tau_C),\quad
S_B=S(\eta_B),\quad S_{ABC}=S(\eta_{AB})+S(\tau_C).
$$

従って四つの差は

$$
I(A:C|B)=S(\eta_{AB})+S(\eta_B)+S(\tau_C)
-S(\eta_B)-S(\eta_{AB})-S(\tau_C)=0.
$$

$\eta_{AB}$ の積性は仮定していません。$C$ だけが独立なら等号が成立します。
<!-- solution-end -->

<a id="ex-qinf19-a02"></a>
### QINF19-A02 古典的な排他的論理和

- Level: A

古典ビット $A,C$ を独立かつ一様に選び、$B=A\oplus C$（排他的論理和）とする。この確率分布を計算基底に対角に埋めた三qubit状態について、$I(A:C)$ と $I(A:C|B)$ を求めよ。

<!-- solution-start -->
### 詳細解答

確率 $1/4$ を持つ組は $(A,B,C)=(0,0,0),(0,1,1),(1,1,0),(1,0,1)$ の4通りです。全て非負で総和1なので、対応する対角密度演算子は正値・トレース1です。$A,C$ は独立一様で、$\rho_{AC}=I_4/4$。従って $S_A=S_C=1,S_{AC}=2$、[相互情報量の定義](../QINF18/index.md#def-qinf18-mutual)から $I(A:C)=1+1-2=0$ です。

一方、$(A,B)$ と $(B,C)$ の組はいずれも4通りが一様に現れるので $S_{AB}=S_{BC}=2$。$B$ は一様で $S_B=1$、全体は確率 $1/4$ が4個なので $S_{ABC}=2$。よって

$$
I(A:C|B)=2+2-1-2=1.
$$

条件を付ける前には独立でも、$B=A\oplus C$ を知ると $A,C$ に完全な条件付き相関が現れます。「条件を増やせば相互情報量が必ず減る」という主張ではないことを確認できました。
<!-- solution-end -->

<a id="ex-qinf19-a03"></a>
### QINF19-A03 GHZ純粋状態と古典混合

- Level: A

$P=|\mathrm{GHZ}\rangle\langle\mathrm{GHZ}|$、$|\mathrm{GHZ}\rangle=(|000\rangle+|111\rangle)/\sqrt2$ と、$\Omega=(|000\rangle\langle000|+|111\rangle\langle111|)/2$ について、$S_{AB},S_{BC},S_B,S_{ABC}$、$I(A:C|B)$ をそれぞれ求めよ。

<!-- solution-start -->
### 詳細解答

$P$ は正規化ベクトルのrank 1射影、$\Omega$ は直交rank 1射影の非負混合で、共に正値・トレース1です。$P$ の交差項 $|000\rangle\langle111|$ を $A,B,C$ のうち一つでも部分トレースすると、その系で $\langle0|1\rangle=0$ のため消えます。したがって両状態の全ての真部分系縮約は一致し、$AB,BC$ で非零固有値 $(1/2,1/2)$、$B$ でも $(1/2,1/2)$。ゆえに三つのエントロピーはそれぞれ1です。

$P$ の全体固有値は $(1,0,\ldots)$ なので $S_{ABC}=0$。$\Omega$ の全体非零固有値は $(1/2,1/2)$ なので $S_{ABC}=1$。したがって

$$
I(A:C|B)_P=1+1-1-0=1,\qquad
I(A:C|B)_\Omega=1+1-1-1=0.
$$

二部縮約まで同じでも、全体の量子コヒーレンスを除くと等号か否かが変わります。
<!-- solution-end -->

<a id="ex-qinf19-a04"></a>
### QINF19-A04 Bell対と最大混合の補助系

- Level: A

$|\Phi^+\rangle_{AB}=(|00\rangle+|11\rangle)/\sqrt2$、$\tau_C=I_2/2$ として $\rho_{ABC}=|\Phi^+\rangle\langle\Phi^+|_{AB}\otimes\tau_C$ とする。$I(A:B)$、$I(A:BC)$、$I(A:C|B)$ を求めよ。

<!-- solution-start -->
### 詳細解答

各因子は密度演算子なので積も正値・トレース1です。Bell対の縮約は $\rho_A=\rho_B=I_2/2$、全体 $AB$ は純粋です。[エントロピー加法性](../QINF17/index.md#prop-qinf17-tensor)から

$$
S_A=S_B=1,\quad S_{AB}=0,\quad S_{BC}=1+1=2,\quad
S_{ABC}=0+1=1.
$$

定義をそれぞれ用いると

$$
I(A:B)=1+1-0=2,\qquad
I(A:BC)=1+2-1=2,\qquad
I(A:C|B)=0+2-1-1=0.
$$

$C$ 自体は最大混合ですが、$AB$ と独立なので $A$ について新たな情報は与えません。
<!-- solution-end -->

<a id="ex-qinf19-a05"></a>
### QINF19-A05 重みの異なる古典旗

- Level: A

$B$ の旗 $b=0,1$ をそれぞれ確率 $1/3,2/3$ で選ぶ。$b=0$ では $AC$ を $|00\rangle\langle00|$、$b=1$ では $I_4/4$ とする三部密度演算子を作る。二値Shannonエントロピー $h=h_2(1/3)$ を使い、四つのエントロピーと $I(A:C|B)$ を求めよ。

<!-- solution-start -->
### 詳細解答

求める状態は（因子を $ABC$ に並べ直して）

$$
\rho_{ABC}=\tfrac13|00\rangle\langle00|_{AC}\otimes|0\rangle\langle0|_B
+\tfrac23(I_4/4)_{AC}\otimes|1\rangle\langle1|_B.
$$

二つの直交 $B$ ブロックは各々正値で、トレースは $1/3+2/3=1$ です。$b=0$ の $AC,A,C$ のエントロピーは全て0。$b=1$ の $AC$ は最大混合4次元で2、$A,C$ は最大混合2次元で各1です。

[古典旗のエントロピー計算](#prop-qinf19-flag)と同じ固有値分解を各縮約に用いれば

$$
S_B=h,\quad S_{AB}=h+\tfrac23,\quad
S_{BC}=h+\tfrac23,\quad S_{ABC}=h+\tfrac43.
$$

これらを代入すると

$$
I(A:C|B)=(h+\tfrac23)+(h+\tfrac23)-h-(h+\tfrac43)=0.
$$

実際、各旗の下で $AC$ は積状態であり、[命題](#prop-qinf19-flag)の等号判定と一致します。
<!-- solution-end -->

<a id="ex-qinf19-b01"></a>
### QINF19-B01 連鎖律から単調性を再構成する

- Level: B

任意の有限次元三部密度演算子 $\rho_{ABC}$ に対し、次を示せ。

1. $I(A:BC)-I(A:B)$ と $S(A|B)-S(A|BC)$ が等しいこと。
2. その共通値が非負である根拠。
3. $C$ を捨てる操作についての不等号の向き。

<!-- solution-start -->
### 詳細解答

[相互情報量の定義](../QINF18/index.md#def-qinf18-mutual)を $A:B$ と $A:BC$ に使うと

$$
\begin{aligned}
I(A:BC)-I(A:B)
&=(S_A+S_{BC}-S_{ABC})-(S_A+S_B-S_{AB})\\
&=S_{AB}+S_{BC}-S_B-S_{ABC}.
\end{aligned}
$$

また[条件付きエントロピーの定義](../QINF18/index.md#def-qinf18-conditional)から

$$
S(A|B)-S(A|BC)=(S_{AB}-S_B)-(S_{ABC}-S_{BC})
=S_{AB}+S_{BC}-S_B-S_{ABC}.
$$

二つの差は[条件付き相互情報量](#def-qinf19-cmi)と同じです。任意の有限次元三部密度演算子に対する[強劣加法性](#thm-qinf19-ssa)が $I(A:C|B)\ge0$ を保証します。ゆえに $C$ を捨てる向きでは $I(A:B)\le I(A:BC)$、条件付きエントロピーでは $S(A|B)\ge S(A|BC)$ です。後者の量自体が負になり得ることと、不等号の向きは別の話です。
<!-- solution-end -->

<a id="ex-qinf19-b02"></a>
### QINF19-B02 逆行列の圧縮の数値検算

- Level: B

$K=\mathbb C^2$、$L=\mathbb C$ とし、$U(z)=(z,z)/\sqrt2$、$M=\operatorname{diag}(1,4)$ とする。(1) $U$ が等長であることを示し、(2) $(U^\dagger M U)^{-1}$ と $U^\dagger M^{-1}U$ を計算し、(3) 等号が成立しない理由を、[補題](#lem-qinf19-inverse-compression)の最大化の位置から説明せよ。

<!-- solution-start -->
### 詳細解答

$\|U(z)\|^2=(|z|^2+|z|^2)/2=|z|^2$ なので $U^\dagger U=1$。$U$ の列ベクトルを $u=(1,1)^{\mathsf T}/\sqrt2$ とすれば

$$
U^\dagger M U=u^\dagger Mu=\tfrac12(1+4)=\tfrac52,\qquad
(U^\dagger M U)^{-1}=\tfrac25.
$$

逆行列 $M^{-1}=\operatorname{diag}(1,1/4)$ なので

$$
U^\dagger M^{-1}U=\tfrac12(1+\tfrac14)=\tfrac58,
\qquad \tfrac25<\tfrac58.
$$

補題の平方完成では、右側の最大値は $w=M^{-1}u=(1,1/4)^{\mathsf T}/\sqrt2$ で実現します。これは $u$ の張る直線（両成分が等しいベクトル）上にありません。一方、左辺の最大化では $w=Uy$ と制限されるので、厳密な不等号になります。
<!-- solution-end -->

<a id="ex-qinf19-b03"></a>
### QINF19-B03 古典旗の条件付き独立の必要十分性

- Level: B

$B$ の古典旗に関する状態

$$
\rho_{ABC}=\sum_{b=1}^m p_b\,\sigma_{AC}^{(b)}
\otimes|b\rangle\langle b|_B
$$

を考える（因子を $ABC$ 順へ置く）。$p_b\ge0$、$\sum_bp_b=1$、$\sigma_{AC}^{(b)}$ は密度演算子である。(1) $I(A:C|B)$ を二部相互情報量の平均で表せ。(2) $p_b>0$ の全てのブロックが積であることと $I(A:C|B)=0$ が同値であることを、等号条件を含めて証明せよ。

<!-- solution-start -->
### 詳細解答

$B$ の各ラベルは直交し、各ブロックの固有値は $p_b$ 倍されます。従って $AC$、$A$、$C$ のブロックそれぞれに[エントロピーの固有値表示](../QINF17/index.md#def-qinf17-entropy)を適用すると

$$
\begin{aligned}
S_{ABC}&=H(p)+\sum_bp_b S(\sigma_{AC}^{(b)}),&
S_{AB}&=H(p)+\sum_bp_b S(\sigma_A^{(b)}),\\
S_{BC}&=H(p)+\sum_bp_b S(\sigma_C^{(b)}),&
S_B&=H(p).
\end{aligned}
$$

ここで $\sigma_A^{(b)}=\operatorname{Tr}_C\sigma_{AC}^{(b)}$ などです。四項の $H(p)$ が消え、[相互情報量](../QINF18/index.md#def-qinf18-mutual)の定義から

$$
I(A:C|B)=\sum_b p_b
\bigl(S(\sigma_A^{(b)})+S(\sigma_C^{(b)})-S(\sigma_{AC}^{(b)})\bigr)
=\sum_b p_b I(A:C)_{\sigma^{(b)}}.
$$

各項は[部分加法性と等号条件](../QINF18/index.md#thm-qinf18-subadditivity)により非負です。$p_b>0$ で一つでも非積のブロックがあれば対応する $I(A:C)>0$ なので全体も正。逆に全て積なら各 $I(A:C)=0$ で和も0です。$p_b=0$ のブロックは実際の状態に寄与しないため、その積性を要求する必要はありません。
<!-- solution-end -->

<a id="ex-qinf19-b04"></a>
### QINF19-B04 両端がBell対のとき

- Level: B

$A,C$ はBell状態 $|\Phi^+\rangle_{AC}$、$B$ は $|0\rangle_B$ で独立である。$\rho_{ABC}=|\Phi^+\rangle\langle\Phi^+|_{AC}\otimes|0\rangle\langle0|_B$（$ABC$ 順へ置く）について、$I(A:B)$、$I(A:BC)$、$I(A:C|B)$ を計算し、[量子Markov条件](#def-qinf19-markov)を判定せよ。

<!-- solution-start -->
### 詳細解答

正規化純粋状態どうしの積なので全体はrank 1、正値・トレース1です。Bell対の $A,C$ の縮約はともに $I_2/2$、$B$ はrank 1です。[積のエントロピー加法性](../QINF17/index.md#prop-qinf17-tensor)から

$$
S_{AB}=S_A+S_B=1+0=1,\quad
S_{BC}=S_B+S_C=0+1=1,\quad S_B=S_{ABC}=0.
$$

従って

$$
I(A:B)=S_A+S_B-S_{AB}=1+0-1=0,
$$

$$
I(A:BC)=S_A+S_{BC}-S_{ABC}=1+1-0=2,\quad
I(A:C|B)=1+1-0-0=2.
$$

$B$ を持っているだけでは $A$ について増える情報はなく、$C$ を加えるとBell対の相互情報量2が加わります。条件付き相互情報量は0ではないため、この順序 $A-B-C$ の量子Markov条件を満たしません。
<!-- solution-end -->

<a id="ex-qinf19-c01"></a>
### QINF19-C01 全ての二部縮約を保ったままコヒーレンスを変える

- Level: C

$|\mathrm{GHZ}\rangle=(|000\rangle+|111\rangle)/\sqrt2$ とし、$0\le t\le1$ に対して

$$
\rho_t=t|\mathrm{GHZ}\rangle\langle\mathrm{GHZ}|
+\frac{1-t}{2}\bigl(|000\rangle\langle000|+|111\rangle\langle111|\bigr)
$$

を考える。次を示せ。

1. 全体の非零固有値を求め、正値性・トレース1を確認する。
2. $AB,BC,B$ の縮約と四つのエントロピーを求める。
3. $I(A:C|B)$、$S(A|B)$、$S(A|BC)$ を $t$ の関数として導き、強劣加法性の等号条件と $t=0,1$ の意味を述べる。

<!-- solution-start -->
### 詳細解答

$|000\rangle,|111\rangle$ の張る二次元部分空間上で、$\rho_t$ は

$$
\frac12\begin{pmatrix}1&t\\t&1\end{pmatrix}
$$

と表示され、それに直交する六次元部分空間上では0です。対称・反対称ベクトル $(1,1)^{\mathsf T}/\sqrt2,(1,-1)^{\mathsf T}/\sqrt2$ が固有ベクトルで、固有値は $(1+t)/2,(1-t)/2$。$0\le t\le1$ では両方非負、和は1なので正値・トレース1が確認できました。

$|000\rangle\langle111|$ とその随伴は、どの一部系を部分トレースしても $\langle0|1\rangle=0$ により消えます。従って全ての $t$ で二部縮約と一部縮約は $t=0$ の古典混合と同じです。$AB,BC$ の非零固有値は $(1/2,1/2)$、$B$ も $(1/2,1/2)$ なので

$$
S_{AB}=S_{BC}=S_B=1,\qquad
S_{ABC}=h_2\!\left(\frac{1+t}{2}\right),
$$

ただし $h_2(p)=-p\log_2p-(1-p)\log_2(1-p)$、端点の $0\log_20=0$ とします。これを三つの定義へ代入すると

$$
\begin{aligned}
I(A:C|B)_{\rho_t}
&=1+1-1-h_2\!\left(\frac{1+t}{2}\right)
=1-h_2\!\left(\frac{1+t}{2}\right),\\
S(A|B)_{\rho_t}&=S_{AB}-S_B=0,\\
S(A|BC)_{\rho_t}
&=S_{ABC}-S_{BC}
=h_2\!\left(\frac{1+t}{2}\right)-1.
\end{aligned}
$$

[二値エントロピーの最大値と等号条件](../QINF17/index.md#thm-qinf17-entropy-bounds)より、$h_2(p)\le1$ で、等号は $p=1/2$ のときだけです。今は $(1+t)/2\in[1/2,1]$ なので、$I(A:C|B)\ge0$、等号は $t=0$ だけです。

$t=0$ では全体は二つの計算基底射影の古典混合で、$B$ の各値の下で $AC$ は積純粋状態です。[古典旗の等号判定](#prop-qinf19-flag)に一致します。$t=1$ ではGHZ純粋状態になり $S_{ABC}=0$、$I(A:C|B)=1$、$S(A|BC)=-1$。同じ二部縮約からはどちらかを判定できません。また二つの条件付きエントロピーの差は

$$
S(A|B)-S(A|BC)=0-\bigl(h_2((1+t)/2)-1\bigr)
=I(A:C|B)\ge0
$$

となり、[条件付きエントロピーの単調性](#cor-qinf19-monotonicity)も全区間で照合できました。
<!-- solution-end -->

## 8. まとめと次の問い

- 条件付き相互情報量は $S_{AB}+S_{BC}-S_B-S_{ABC}$ で、第三の系を追加したときの相互情報量の増分です。
- 有限行列のHilbert–Schmidt空間上で、[逆行列の圧縮不等式](#lem-qinf19-inverse-compression)から対数の部分トレース比較を証明しました。正定値への近似とエントロピーの連続性により、**任意の有限次元三部状態**で強劣加法性が成立します。
- $I(A:C|B)\ge0$ と $S(A|BC)\le S(A|B)$ は同じ主張です。等号の量子Markov条件は古典旗の条件付き積状態や一部の量子状態でも起こりますが、GHZ純粋状態では厳密です。

次のQINF20では、ここで使った正定値行列の対数比較を、零固有値の台条件を含めて一般の量子相対エントロピーとして定義し、部分トレース以外の量子チャネルにも拡張します。本章で証明した部分トレースの場合が、その重要な出発点になります。
