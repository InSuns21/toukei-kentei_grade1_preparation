# AQFT20 Hilbert–Schmidt標準表現の全計算

[AQFT18で作ったTomita作用素](../AQFT18/index.md#def-aqft18-tomita-initial)と[AQFT19で示した $S=J\Delta^{1/2}$ の分解](../AQFT19/index.md#thm-aqft19-polar)から、標準対に $S=J\Delta^{1/2}$ が付随することを学びました。しかし抽象的な式だけでは、$J$ は何を交換し、$\Delta$ は何をどれほど拡大するのかが分かりにくいままです。

本講では有限次元の行列全体を一つのHilbert空間にして、**忠実な密度行列 $\rho$ を平方根ベクトル $\Omega=\rho^{1/2}$ で表す**方法を構成します。その上で次の式を、行列単位から直接導きます。

$$
S(X)=\rho^{-1/2}X^*\rho^{1/2},\qquad
J(X)=X^*,\qquad
\Delta(X)=\rho X\rho^{-1}.
$$

左乗算と右乗算の交換関係、および $\Delta^{it}$ による時間発展まで計算します。すべて**有限次元の結果**であり、一般のTomita可換子定理とモジュラー不変性はAQFT22・23で別途証明する必要があります。内積は一貫して第2変数線形です。

## 1. 行列をベクトルとする理由

$M_n(\mathbb C)$ の通常の $\mathbb C^n$ への作用 $A:v\mapsto Av$ では、$n\ge2$ の非零ベクトル $v$ を固定しても、$Av=0$ を満たす非零行列があります。[標準対](../AQFT18/index.md#def-aqft18-standard-pair)には分離性が必要ですから、この表現では標準対を得られません。そこで、行列そのものをベクトルとする大きな空間を使います。

$n\ge1$ を固定し、$E_{ij}$ を第 $(i,j)$ 成分のみ1である行列単位とします。$E_{ij}^*=E_{ji}$ かつ $E_{ij}E_{kl}=\delta_{jk}E_{il}$ です。$X=\sum_{i,j}x_{ij}E_{ij}$ と $Y=\sum_{i,j}y_{ij}E_{ij}$ に対して

$$
\operatorname{Tr}(X^*Y)
=\sum_{i,j}\overline{x_{ij}}y_{ij}
$$

となり、これは $\mathbb C^{n^2}$ の内積です。

<a id="def-aqft20-hilbert-schmidt"></a>

<!-- formal-statement-start -->
> **定義（有限次元Hilbert–Schmidt空間と左右乗算）**  
> $H_n=M_n(\mathbb C)$ に内積とノルム
$$
\langle X,Y\rangle_2=\operatorname{Tr}(X^*Y),\qquad
\|X\|_2^2=\operatorname{Tr}(X^*X)
$$
> を入れたものを有限次元 **Hilbert–Schmidt空間** とする。$A,B\in M_n(\mathbb C)$ に対し $H_n$ 上の作用素を
$$
L_A(X)=AX,\qquad R_B(X)=XB
$$
> で定義し、それぞれ左乗算・右乗算と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft20-hilbert-schmidt -->
### 直接例：行列単位で内積の条件を調べる

$$
\langle E_{ij},E_{kl}\rangle_2
=\operatorname{Tr}(E_{ji}E_{kl})
=\delta_{ik}\delta_{jl}.
$$

よって $E_{ij}$ は正規直交基底で、$\|X\|_2^2=\sum_{i,j}|x_{ij}|^2$。$X\ne0$ ならこの値は正であり、共役対称性と第2変数線形性も成分ごとに確かめられます。有限個の複素係数の空間と同じノルムなので完備です。左右乗算は $\alpha,\beta\in\mathbb C$ に対し

$$
L_A(\alpha X+\beta Y)=\alpha AX+\beta AY,\qquad
R_B(\alpha X+\beta Y)=\alpha XB+\beta YB
$$

で線形です。例えば $L_{E_{12}}(E_{22})=E_{12}$、$R_{E_{21}}(E_{22})=E_{21}$ で、両者は異なります。

**定義の確認**：内積の正値性・線形性・完備性と、左右乗算の線形性をそれぞれ確認しました。行列単位を突然判定道具として使うのではなく、それが上の内積の正規直交基底になる理由を示しています。
<!-- definition-example-end -->

行列積の結合則と成分のトレース計算から

$$
\begin{aligned}
L_A L_C&=L_{AC},\\
R_B R_D&=R_{DB},\\
L_A R_B&=R_B L_A,\\
\operatorname{Tr}(XY)&=\sum_{i,j}X_{ij}Y_{ji}
=\operatorname{Tr}(YX).
\end{aligned}
$$

**右乗算の合成順序が逆**になる点が重要です。特に $\langle L_AX,Y\rangle_2=\langle X,L_{A^*}Y\rangle_2$ より $L_A^*=L_{A^*}$ です。右乗算も同様です。$L_I=I_{H_n}$ が単位元であり、$A\mapsto L_A$ は線形で $L_A(I)=A$ より単射です。したがって $L(M_n(\mathbb C))$ は $B(H_n)$ の有限次元単位的 $*$-部分代数です。有限次元空間 $B(H_n)$ では弱作用素位相が行列成分の通常の位相と一致し、その線形部分空間は閉じています。よって $L(M_n(\mathbb C))$ は単位的von Neumann環です。

## 2. 密度行列で標準対を作る

標準表現では、ある行列の正の平方根をベクトルにします。しかし固有値が零だと逆平方根が使えません。どの仮定がこの問題を防ぐのか、先に定義します。

<a id="def-aqft20-faithful-density"></a>

<!-- formal-statement-start -->
> **定義（有限次元密度行列と忠実性）**  
> $n\ge1$ とする。行列 $\rho\in M_n(\mathbb C)$ が **密度行列** であるとは、$\rho=\rho^*$、全ての $v\in\mathbb C^n$ に対して $\langle v,\rho v\rangle\ge0$、かつ $\operatorname{Tr}\rho=1$ が成り立つことをいう。さらに
$$
\langle v,\rho v\rangle>0\qquad(v\ne0)
$$
> が成り立つとき、$\rho$ を **忠実な密度行列** と呼ぶ。有限次元では忠実性は全固有値が正であることと同値である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft20-faithful-density -->
### 直接例：零固有値を持つ場合と持たない場合

$0<p<1$ として $\rho_p=\operatorname{diag}(p,1-p)$ を考えます。$\rho_p=\rho_p^*$、$\operatorname{Tr}\rho_p=p+(1-p)=1$ です。また $v=(v_1,v_2)$ なら

$$
\langle v,\rho_pv\rangle=p|v_1|^2+(1-p)|v_2|^2>0
\qquad(v\ne0).
$$

よって正半定値性だけでなく正定値性も満たし、忠実です。これに対して $p=1$ なら $\operatorname{diag}(1,0)$ は正半定値かつトレース1でも、$v=(0,1)\ne0$ について $\langle v,\rho_1v\rangle=0$ で忠実ではありません。この場合、逆行列と逆平方根は存在しません。

**定義の確認**：自己共役性、正半定値性、トレース1、厳密正値性を順に検査し、零固有値のある場合に最後の条件だけが失敗する理由も示しました。
<!-- definition-example-end -->

忠実性を仮定すると有限次元のスペクトル分解で全固有値が正になり、$\rho^{-1}$ と $\rho^{-1/2}$ が存在します。適切な正規直交基底を選べば

$$
\rho=\sum_{i=1}^n\lambda_iE_{ii},\qquad
\lambda_i>0,\qquad \sum_{i=1}^n\lambda_i=1
$$

と書き、以降の $E_{ij}$ は**この固有基底での行列単位**とします。$\rho^{1/2}=\sum_i\sqrt{\lambda_i}E_{ii}$ です。

<a id="def-aqft20-standard-representation"></a>

<!-- formal-statement-start -->
> **定義（忠実密度行列のHilbert–Schmidt標準表現）**  
> $\rho\in M_n(\mathbb C)$ を正定値で $\operatorname{Tr}\rho=1$ とする。$H_n$ 上の環とベクトルを
$$
\mathcal M=\{L_A:A\in M_n(\mathbb C)\},\qquad
\Omega=\rho^{1/2}\in H_n
$$
> とする。この組 $(\mathcal M,\Omega)$ を本講の **Hilbert–Schmidt標準表現** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft20-standard-representation -->
### 直接例：固有値が異なる二準位

$$
\rho=
\begin{pmatrix}3/4&0\\0&1/4\end{pmatrix},
\qquad
\Omega=
\begin{pmatrix}\sqrt3/2&0\\0&1/2\end{pmatrix}.
$$

固有値は正で合計は1だから忠実な密度行列です。$\|\Omega\|_2^2=\operatorname{Tr}\rho=1$。任意の $X\in H_2$ に対して

$$
A=X\rho^{-1/2}
=X\begin{pmatrix}2/\sqrt3&0\\0&2\end{pmatrix}
$$

と取れば $A\Omega=X$ であり巡回的です。また $A\Omega=0$ なら右から $\rho^{-1/2}$ を掛けて $A=0$、すなわち分離的です。

**定義の確認**：密度行列の正規化と忠実性、[標準対の定義](../AQFT18/index.md#def-aqft18-standard-pair)の巡回性・分離性の双方を具体的に確かめました。
<!-- definition-example-end -->

<a id="prop-aqft20-standard-state"></a>

<!-- formal-statement-start -->
> **命題（標準性と状態の実現）**  
> 正定値でトレース1の $\rho\in M_n(\mathbb C)$ に対し、上の $(\mathcal M,\Omega)$ は標準対であり、全ての $A\in M_n(\mathbb C)$ について
$$
\langle\Omega,L_A\Omega\rangle_2
=\operatorname{Tr}(\rho A)
$$
> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

逆平方根により任意の行列を $A\Omega$ と書くのが巡回性、逆平方根で $A\Omega=0$ から $A=0$ を得るのが分離性です。最後にトレースの巡回性を使います。

<!-- proof-start -->
### 証明

第1節で確かめた積・随伴に関する閉性と有限次元の弱閉性より、$\mathcal M=L(M_n(\mathbb C))$ は単位的von Neumann環です。$\|\Omega\|_2^2=\operatorname{Tr}\rho=1$。任意の $X\in H_n$ は $A=X\rho^{-1/2}$ によって $A\Omega=X$ と表せるので $\mathcal M\Omega=H_n$。逆に $A\Omega=0$ なら $A\rho^{1/2}=0$ であり、$\rho^{1/2}$ が可逆だから $A=0$。$L_A=0$ なら $L_A(I)=A=0$ でもあり、これは [標準対の分離性](../AQFT18/index.md#def-aqft18-standard-pair)を証明します。

$\Omega^*=\Omega$ に注意して

$$
\begin{aligned}
\langle\Omega,L_A\Omega\rangle_2
&=\operatorname{Tr}(\rho^{1/2}A\rho^{1/2})\\
&=\operatorname{Tr}(\rho A).
\end{aligned}
$$

これですべて示しました。$\square$
<!-- proof-end -->

**通常の表現とどう違うか**：$\mathbb C^n$ のベクトル状態 $\langle v,Av\rangle$ の密度行列は $vv^*$（ランク1）ですが、忠実な混合密度 $\rho$ は $n\ge2$ でランク $n$ です。したがって $\mathbb C^n$ 上の単独のベクトルでは表せません。本講では $n^2$ 次元の $H_n$ 上で $\rho^{1/2}$ をベクトルとみなして状態を実現しました。$\rho^{1/2}$ を誤って $\mathbb C^n$ のベクトルに読み替えないでください。

## 3. $S,S^\sharp,J,\Delta$ を全て計算する

[Tomita初期作用素](../AQFT18/index.md#def-aqft18-tomita-initial)は $S_0(A\Omega)=A^*\Omega$ で定義されます。本例では $A=X\rho^{-1/2}$ が全ての $X\in H_n$ で一意に決まるので

$$
\begin{aligned}
S(X)&=(X\rho^{-1/2})^*\rho^{1/2}\\
&=\rho^{-1/2}X^*\rho^{1/2}.
\end{aligned}
$$

有限次元・全域定義なので $S_0$ は閉じており、その閉包と一致します。正規直交基底上で

$$
\rho^{1/2}E_{ij}=\sqrt{\lambda_i}E_{ij},\qquad
E_{ij}\rho^{-1/2}=\frac1{\sqrt{\lambda_j}}E_{ij}
$$

を使うと、$E_{ij}^*=E_{ji}$ であることから

$$
S(E_{ij})=\sqrt{\frac{\lambda_i}{\lambda_j}}E_{ji}.
$$

添字を逆にしないよう、**転置された行列の行 $j$ と列 $i$ に作用する左右の係数**を順に見てください。

<a id="thm-aqft20-modular-formulas"></a>

<!-- formal-statement-start -->
> **定理（Hilbert–Schmidt模型のモジュラー作用素の全計算）**  
> $\rho=\sum_i\lambda_iE_{ii}$ を正定値・トレース1の密度行列とする。$H_n$ 上の標準対 $(L(M_n(\mathbb C)),\rho^{1/2})$ のTomita作用素 $S$、反線形随伴 $S^\sharp$、[モジュラー作用素](../AQFT19/index.md#def-aqft19-modular-operator) $\Delta$、[モジュラー共役](../AQFT19/index.md#def-aqft19-modular-conjugation) $J$ は全域定義で
$$
\begin{aligned}
S(X)&=\rho^{-1/2}X^*\rho^{1/2},\\
S^\sharp(X)&=\rho^{1/2}X^*\rho^{-1/2},\\
\Delta^{1/2}(X)&=\rho^{1/2}X\rho^{-1/2},\\
\Delta(X)&=\rho X\rho^{-1}=L_\rho R_{\rho^{-1}}(X),\\
J(X)&=X^*.
\end{aligned}
$$
> 具体的に $S(E_{ij})=\sqrt{\lambda_i/\lambda_j}E_{ji}$、$\Delta(E_{ij})=(\lambda_i/\lambda_j)E_{ij}$、$J(E_{ij})=E_{ji}$ である。さらに
$$
S^2=J^2=I,\qquad J\Delta J=\Delta^{-1},
\qquad J\Omega=\Delta\Omega=\Omega
$$
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$E_{ij}$ が正規直交基底だから、[反線形随伴の定義](../AQFT18/index.md#def-aqft18-antilinear-adjoint)を基底で直接検査できます。$S^\sharp S$ の固有値を出してから正平方根を取り、$X\mapsto X^*$ が反ユニタリかどうかを調べます。これと[AQFT19の極分解の一意性](../AQFT19/index.md#thm-aqft19-polar)を合わせることで $J$ を同定します。

<!-- proof-start -->
### 証明

内積の規約は第2変数線形で、反線形随伴の定義は

$$
\langle Sx,y\rangle_2=\langle S^\sharp y,x\rangle_2.
$$

$x=E_{ij}$、$y=E_{kl}$ を代入すると

$$
\langle S(E_{ij}),E_{kl}\rangle_2
=\sqrt{\frac{\lambda_i}{\lambda_j}}
\delta_{jk}\delta_{il}.
$$

よって $S^\sharp(E_{kl})=\sqrt{\lambda_l/\lambda_k}E_{lk}$。一般の行列に戻せば $S^\sharp(X)=\rho^{1/2}X^*\rho^{-1/2}$ です。ここで反線形作用素 $S^\sharp$ の係数は共役されるものの、固有値比の平方根は正の実数ですから

$$
\begin{aligned}
\Delta(E_{ij})
&=S^\sharp S(E_{ij})\\
&=\sqrt{\frac{\lambda_i}{\lambda_j}}\,
S^\sharp(E_{ji})\\
&=\frac{\lambda_i}{\lambda_j}E_{ij}.
\end{aligned}
$$

正規直交基底に関するこの対角形により $\Delta$ は正定値・自己共役です。正平方根は各 $E_{ij}$ を $\sqrt{\lambda_i/\lambda_j}$ 倍するので $\Delta^{1/2}(X)=\rho^{1/2}X\rho^{-1/2}$ です。

$J_0(X)=X^*$ とおきます。$(\alpha X+\beta Y)^*=\overline\alpha X^*+\overline\beta Y^*$ により反線形、$J_0^2=I$ により全射です。さらにトレースの巡回性から

$$
\begin{aligned}
\langle J_0X,J_0Y\rangle_2
&=\operatorname{Tr}(XY^*)\\
&=\overline{\operatorname{Tr}(X^*Y)}
=\overline{\langle X,Y\rangle_2}.
\end{aligned}
$$

従って [反ユニタリの定義](../AQFT19/index.md#def-aqft19-antiunitary)の全条件が成り立ちます。そして

$$
J_0\Delta^{1/2}(X)
=(\rho^{1/2}X\rho^{-1/2})^*
=\rho^{-1/2}X^*\rho^{1/2}=S(X).
$$

$S^2=I$ は

$$
\begin{aligned}
S^2(X)
&=\rho^{-1/2}(\rho^{-1/2}X^*\rho^{1/2})^*\rho^{1/2}\\
&=\rho^{-1/2}\rho^{1/2}X\rho^{-1/2}\rho^{1/2}=X
\end{aligned}
$$

から従います。従って $S$ は単射かつ全射であり、[極分解の一意性](../AQFT19/index.md#thm-aqft19-polar)から $J=J_0$ です。さらに

$$
\begin{aligned}
J\Delta J(X)&=(\rho X^*\rho^{-1})^*
=\rho^{-1}X\rho=\Delta^{-1}(X),\\
J\Omega&=\Omega^*=\Omega,\\
\Delta\Omega&=\rho\rho^{1/2}\rho^{-1}=\Omega.
\end{aligned}
$$

これで全て証明しました。$\square$
<!-- proof-end -->

### 非可換な二準位の直接検算

$\rho=\operatorname{diag}(3/4,1/4)$、$X=E_{12}+2iE_{21}$ を取ります。上の基底式を代入し、$S$ が**反線形**であることに注意すると

$$
\begin{aligned}
S(X)&=\sqrt3 E_{21}-\frac{2i}{\sqrt3}E_{12},\\
J(X)&=E_{21}-2iE_{12},\\
\Delta(X)&=3E_{12}+\frac{2i}{3}E_{21}.
\end{aligned}
$$

$J\Delta^{1/2}(X)$ でも同じ係数が出ます。また $S^2(E_{12})=S(\sqrt3E_{21})=E_{12}$。この例は $\Delta$ が恒等作用素ではないことを示します。

## 4. 左乗算の可換子を特定する

[可換子の定義](../../VN/VN2/index.md#def-vn2-commutant)では、$\mathcal M'$ は全ての $L_A$ と交換する $H_n$ 上の線形作用素全体です。右乗算が交換することは第1節で示しましたが、**それで全部かどうか**は別の問題です。

<a id="thm-aqft20-commutant"></a>

<!-- formal-statement-start -->
> **定理（左右乗算の可換子）**  
> $H_n=M_n(\mathbb C)$ 上の $\mathcal M=\{L_A:A\in M_n(\mathbb C)\}$ に対し
$$
\mathcal M'=\{R_B:B\in M_n(\mathbb C)\},\qquad
JL_AJ=R_{A^*},\qquad J\mathcal MJ=\mathcal M'
$$
> が成り立つ。ただし $J(X)=X^*$ であり、全ての等式は $H_n$ 上の全域作用素の等式である。
<!-- formal-statement-end -->

### 証明の見取り図

右乗算から可換子への包含は結合則で示します。逆向きには、左乗算と可換な $T$ を $I$ に適用した値 $B=T(I)$ を使い、任意の $X=L_X(I)$ への作用を決定します。

<!-- proof-start -->
### 証明

任意の $A,B,X$ について $L_AR_B(X)=A(XB)=(AX)B=R_BL_A(X)$。従って $\{R_B\}\subset\mathcal M'$ です。

逆に $T\in\mathcal M'$ とし $B=T(I)$ とおけば、任意の $X\in H_n$ に対して

$$
T(X)=T(L_XI)=L_XT(I)=XB=R_B(X).
$$

よって $T=R_B$ で逆の包含が従います。最後に

$$
JL_AJ(X)=J(AX^*)=(AX^*)^*=XA^*=R_{A^*}(X).
$$

$A\mapsto A^*$ は全行列の上への写像なので $J\mathcal MJ=\{R_B\}=\mathcal M'$ です。$\square$
<!-- proof-end -->

これは有限次元だから直接証明できた等式です。一般の標準対での $J\mathcal MJ=\mathcal M'$ はAQFT22で証明する結果であり、ここから根拠なく一般化しません。

## 5. 有限次元モジュラー時間発展

正定値作用素 $\Delta$ の固有値 $\lambda_i/\lambda_j$ は正なので、実数 $t$ に対し $(\lambda_i/\lambda_j)^{it}=\exp(it\log(\lambda_i/\lambda_j))$ と定めます。$\Delta^{it}$ は各基底を絶対値1の係数で掛けるユニタリ作用素です。

<a id="def-aqft20-finite-flow"></a>

<!-- formal-statement-start -->
> **定義（有限次元のモジュラー時間発展）**  
> 上の忠実な密度行列 $\rho$ の標準対について、実数 $t$ ごとに $\mathcal M$ 上の写像を
$$
\sigma_t(L_A)=\Delta^{it}L_A\Delta^{-it}
$$
> で定める。この模型での $\sigma_t$ をモジュラー時間発展と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft20-finite-flow -->
### 直接例：非対角行列の位相

$\rho=\operatorname{diag}(3/4,1/4)$ に対して $\Delta(E_{12})=3E_{12}$ と $\Delta(E_{21})=\frac13E_{21}$ を使うと

$$
\Delta^{it}(E_{12})=e^{it\log3}E_{12},\qquad
\Delta^{it}(E_{21})=e^{-it\log3}E_{21}.
$$

したがって $\Delta^{it}$ は各基底に絶対値1の数を掛け、全空間のユニタリです。続く定理の具体式を $A=E_{12}$ に代入すると

$$
\sigma_t(L_{E_{12}})=e^{it\log3}L_{E_{12}}.
$$

これは $\mathcal M$ に属し、$t=0$ で恒等、$t+s$ で係数が積になることも分かります。

**定義の確認**：$\Delta^{it}$ の存在とユニタリ性、共役作用の定義域、左乗算環への戻り方、時間パラメータの加法性を具体的に確認しました。
<!-- definition-example-end -->

<a id="thm-aqft20-finite-flow"></a>

<!-- formal-statement-start -->
> **定理（有限次元モジュラー流の具体式）**  
> 正定値・トレース1の $\rho$ に対し、任意の $X,A\in M_n(\mathbb C)$ と $t\in\mathbb R$ について
$$
\Delta^{it}(X)=\rho^{it}X\rho^{-it},\qquad
\sigma_t(L_A)=L_{\rho^{it}A\rho^{-it}}
$$
> が成り立つ。各 $\sigma_t$ は $\mathcal M$ の $*$-自己同型で、$\sigma_t\sigma_s=\sigma_{t+s}$ を満たし、各ベクトル上で $t$ に連続である。また、
$$
\langle\Omega,\sigma_t(L_A)\Omega\rangle_2
=\operatorname{Tr}(\rho A)
$$
> とベクトル状態を保存する。
<!-- formal-statement-end -->

### 証明の見取り図

[モジュラー作用素の固有値計算](#thm-aqft20-modular-formulas)を虚数冪に入れれば、右辺の左右の係数が現れます。共役作用に代入して中央の $\rho^{-it}\rho^{it}$ を消すと左乗算だけが残ります。

<!-- proof-start -->
### 証明

$\Delta(E_{ij})=(\lambda_i/\lambda_j)E_{ij}$ に [QM6のBorel関数計算](../../QM/QM6/index.md#def-qm6-borel-functional-calculus)を適用すると

$$
\begin{aligned}
\Delta^{it}(E_{ij})
&=\exp\!\left(it\log\frac{\lambda_i}{\lambda_j}\right)E_{ij}\\
&=\lambda_i^{it}\lambda_j^{-it}E_{ij}
=\rho^{it}E_{ij}\rho^{-it}.
\end{aligned}
$$

基底全体で等しいので全 $X$ に拡張できます。$\rho^{it}$ はユニタリなので $\Delta^{it}$ もHilbert–Schmidt内積を保ち、逆は $\Delta^{-it}$ です。作用する順番を明記すると

$$
\begin{aligned}
(\Delta^{it}L_A\Delta^{-it})(X)
&=\rho^{it}A(\rho^{-it}X\rho^{it})\rho^{-it}\\
&=(\rho^{it}A\rho^{-it})X.
\end{aligned}
$$

従って $\sigma_t$ は左乗算環へ戻ります。$\alpha_t(A)=\rho^{it}A\rho^{-it}$ と置けば

$$
\alpha_t(AB)=\alpha_t(A)\alpha_t(B),\quad
\alpha_t(A^*)=\alpha_t(A)^*,\quad
\alpha_t\alpha_s=\alpha_{t+s}.
$$

逆写像は $\alpha_{-t}$ です。$\rho^{it}=\sum_i e^{it\log\lambda_i}E_{ii}$ の成分は $t$ に連続で、有限次元なので各ベクトル上の作用も連続です。

最後にトレースの巡回性を使い

$$
\begin{aligned}
\operatorname{Tr}(\rho\alpha_t(A))
&=\operatorname{Tr}(\rho^{1+it}A\rho^{-it})\\
&=\operatorname{Tr}(\rho^{-it}\rho^{1+it}A)
=\operatorname{Tr}(\rho A).
\end{aligned}
$$

[状態の実現](#prop-aqft20-standard-state)と合わせれば結論が従います。$\square$
<!-- proof-end -->

**どの行列が動かないか**。固有基底では $\alpha_t(A)_{ij}=(\lambda_i/\lambda_j)^{it}A_{ij}$ です。全 $t$ で不変であるための必要十分条件は、$A_{ij}\ne0$ なら $\lambda_i=\lambda_j$ となることです。これは $[\rho,A]=0$ と同値です。固有値が異なる準位間の成分だけが回転します。

## 6. 忠実性を失うとどこが壊れるか

$\rho_0=\operatorname{diag}(1,0)$ と $\Omega_0=\rho_0^{1/2}=\rho_0$ を考えます。$A\Omega_0$ は第2列が零なので、その張る空間は $\operatorname{span}\{E_{11},E_{21}\}$ であり、4次元の $H_2$ に稠密ではありません。さらに $E_{12}\ne0$ ですが

$$
E_{12}\Omega_0=0,\qquad
E_{12}^*\Omega_0=E_{21}\ne0.
$$

したがって分離性も壊れ、$S_0(A\Omega_0)=A^*\Omega_0$ は零入力への出力を一意に決められません。この失敗は[AQFT18のTomita初期作用素の成立](../AQFT18/index.md#prop-aqft18-initial-properties)の証明で分離性を使う箇所に対応します。単に $\rho_0^{-1/2}$ が存在しないだけでなく、**定義そのもののwell-defined性が壊れる**のです。

逆に $\rho=I/n$ なら $\Delta=I$ ですが、$n\ge2$ の左乗算環は非可換です。例えば

$$
L_{E_{12}}L_{E_{21}}=L_{E_{11}}\ne L_{E_{22}}
=L_{E_{21}}L_{E_{12}}.
$$

**モジュラー作用素が恒等であることと、環が可換であることは違います。**

## 7. 演習と詳細解答

### Level A：基底と操作

<a id="ex-aqft20-a01"></a>
#### AQFT20-A01 Hilbert–Schmidt内積

- Level: A

$X=E_{11}+iE_{12}-2E_{22}$ と $\rho=\operatorname{diag}(3/4,1/4)$ を考える。$\|X\|_2^2$、$\|\rho^{1/2}\|_2^2$ を求め、用いた基底の直交性を説明せよ。

<!-- solution-start -->
**詳細解答。** [有限次元Hilbert–Schmidt空間と左右乗算](#def-aqft20-hilbert-schmidt)より

$$
\langle E_{ij},E_{kl}\rangle_2
=\operatorname{Tr}(E_{ji}E_{kl})
=\delta_{ik}\delta_{jl}.
$$

よって異なる行列単位どうしの交差項は消え、各係数の絶対値二乗を加えて

$$
\|X\|_2^2=1+|i|^2+|-2|^2=6.
$$

$\rho^{1/2}=\operatorname{diag}(\sqrt3/2,1/2)$ なので

$$
\|\rho^{1/2}\|_2^2=\frac34+\frac14=1.
$$

密度行列の $\operatorname{Tr}\rho=1$ と一致する。
<!-- solution-end -->

<a id="ex-aqft20-a02"></a>
#### AQFT20-A02 右乗算の積の順序

- Level: A

$A=E_{12}$、$B=E_{21}$ とする。$R_A R_B$、$R_B R_A$ を求め、任意の $X$ に対して $L_AR_B=R_BL_A$ を確認せよ。

<!-- solution-start -->
**詳細解答。** [左右乗算の定義](#def-aqft20-hilbert-schmidt)を順番に使い、

$$
R_A R_B(X)=R_A(XB)=(XB)A=X(BA).
$$

$BA=E_{21}E_{12}=E_{22}$ なので $R_A R_B=R_{E_{22}}$。逆順は $AB=E_{11}$ なので $R_B R_A=R_{E_{11}}$ である。最後に

$$
L_AR_B(X)=A(XB)=(AX)B=R_BL_A(X)
$$

が任意の $X$ に対して成り立つ。右乗算の合成では行列積の順序が逆になる。
<!-- solution-end -->

<a id="ex-aqft20-a03"></a>
#### AQFT20-A03 反線形作用素の二回適用

- Level: A

$\rho=\operatorname{diag}(3/4,1/4)$ に対し $S(E_{12})$、$S(E_{21})$、$S^2(E_{12})$ を求めよ。

<!-- solution-start -->
**詳細解答。** [Tomita作用素の公式](#thm-aqft20-modular-formulas)で $\lambda_1/\lambda_2=3$ を代入すると

$$
S(E_{12})=\sqrt3 E_{21},\qquad
S(E_{21})=\frac1{\sqrt3}E_{12}.
$$

$S$ は反線形だが $\sqrt3$ は実数なので

$$
S^2(E_{12})=S(\sqrt3 E_{21})
=\sqrt3\,S(E_{21})=E_{12}.
$$

複素係数一般でも二度の反線形性で共役が二回掛かり、元に戻る。
<!-- solution-end -->

<a id="ex-aqft20-a04"></a>
#### AQFT20-A04 モジュラー作用素の正値性

- Level: A

$\rho=\operatorname{diag}(p,1-p)$、$0<p<1$ とする。$\Delta(E_{11})$、$\Delta(E_{12})$ を求め、$\Delta\Omega=\Omega$ および $\langle X,\Delta X\rangle_2>0$（$X\ne0$）を示せ。

<!-- solution-start -->
**詳細解答。** $\Omega=\sqrt p E_{11}+\sqrt{1-p}E_{22}$ である。[モジュラー作用素の固有値表示](#thm-aqft20-modular-formulas)より

$$
\Delta(E_{11})=E_{11},\quad
\Delta(E_{12})=\frac p{1-p}E_{12},\quad
\Delta(E_{22})=E_{22}.
$$

ゆえに線形性から $\Delta\Omega=\Omega$。$X=\sum_{i,j}x_{ij}E_{ij}$ と書くと、正規直交性から

$$
\langle X,\Delta X\rangle_2
=\sum_{i,j}\frac{\lambda_i}{\lambda_j}|x_{ij}|^2.
$$

忠実性で $\lambda_i/\lambda_j>0$ なので、$X\ne0$ なら少なくとも一項が正で全体が正である。
<!-- solution-end -->

### Level B：導出と仮定を検査する

<a id="ex-aqft20-b01"></a>
#### AQFT20-B01 反線形随伴の向き

- Level: B

$S(E_{ij})=\sqrt{\lambda_i/\lambda_j}E_{ji}$ から、反線形随伴の内積条件を使い $S^\sharp(E_{ij})$ と $\Delta(E_{ij})$ を導け。一般に $S^\sharp\ne S$ となる例を挙げよ。

<!-- solution-start -->
**詳細解答。** [反線形随伴の定義](../AQFT18/index.md#def-aqft18-antilinear-adjoint)は

$$
\langle Sx,y\rangle_2=\langle S^\sharp y,x\rangle_2.
$$

$x=E_{ij}$、$y=E_{kl}$ に代入して

$$
\langle S(E_{ij}),E_{kl}\rangle_2
=\sqrt{\frac{\lambda_i}{\lambda_j}}\delta_{jk}\delta_{il}.
$$

これを満たす反線形作用素は

$$
S^\sharp(E_{kl})=\sqrt{\frac{\lambda_l}{\lambda_k}}E_{lk}.
$$

続いて両方を作用させれば

$$
\begin{aligned}
\Delta(E_{ij})
&=S^\sharp(\sqrt{\lambda_i/\lambda_j}\,E_{ji})\\
&=\sqrt{\lambda_i/\lambda_j}
\sqrt{\lambda_i/\lambda_j}\,E_{ij}
=\frac{\lambda_i}{\lambda_j}E_{ij}.
\end{aligned}
$$

$\lambda_1=3/4,\lambda_2=1/4$ なら $S(E_{12})=\sqrt3E_{21}$ だが $S^\sharp(E_{12})=E_{21}/\sqrt3$ なので一致しない。係数の逆転を無視して $S^\sharp=S$ と置くのは誤りである。
<!-- solution-end -->

<a id="ex-aqft20-b02"></a>
#### AQFT20-B02 可換子が右乗算に尽きる理由

- Level: B

$T\in B(H_n)$ がすべての $L_A$ と可換するとする。$T(I)$ を使って $T=R_B$ を証明し、さらに $JL_AJ$ を求めよ。

<!-- solution-start -->
**詳細解答。** $B=T(I)$ と置く。$X=L_X(I)$ なので可換性を使えば

$$
T(X)=T(L_XI)=L_XT(I)=XB=R_B(X).
$$

従って $T$ は右乗算である。逆に $L_AR_B(X)=A(XB)=(AX)B=R_BL_A(X)$ なので右乗算は全て可換子に属する。よって [可換子](../../VN/VN2/index.md#def-vn2-commutant)を尽くす。さらに $J(X)=X^*$ より

$$
JL_AJ(X)=J(AX^*)=(AX^*)^*=XA^*=R_{A^*}(X).
$$

従って $J\mathcal MJ=\mathcal M'$。これは [有限模型の定理](#thm-aqft20-commutant)の逆包含と $J$ の作用を再現したものである。
<!-- solution-end -->

<a id="ex-aqft20-b03"></a>
#### AQFT20-B03 非対角成分の時間発展

- Level: B

$\rho=\operatorname{diag}(3/4,1/4)$ と $A=E_{12}+E_{21}$ に対し、$\sigma_t(L_A)$ を計算せよ。またこの $A$ について $\operatorname{Tr}(\rho\,\alpha_t(A))=\operatorname{Tr}(\rho A)$ を直接確かめよ。ただし $\sigma_t(L_A)=L_{\alpha_t(A)}$。

<!-- solution-start -->
**詳細解答。** [有限次元モジュラー流の具体式](#thm-aqft20-finite-flow)から $\alpha_t(A)=\rho^{it}A\rho^{-it}$。固有基底で左右の重みを掛けると

$$
\alpha_t(A)
=3^{it}E_{12}+3^{-it}E_{21}
=e^{it\log3}E_{12}+e^{-it\log3}E_{21}.
$$

従って $\sigma_t(L_A)=L_{\alpha_t(A)}$。$A$ と $\alpha_t(A)$ はいずれも対角成分が零であるため

$$
\operatorname{Tr}(\rho A)=0,\qquad
\operatorname{Tr}(\rho\alpha_t(A))=0.
$$

状態保存をこの例で検算した。ただしこの零トレース計算だけで一般の $A$ の保存則を証明したとは言えず、一般にはトレースの巡回性が必要である。
<!-- solution-end -->

<a id="ex-aqft20-b04"></a>
#### AQFT20-B04 非忠実密度による定義の破綻

- Level: B

$\rho_0=\operatorname{diag}(1,0)$、$\Omega_0=\rho_0^{1/2}$ とする。$L(M_2)\Omega_0$ を求め、巡回性・分離性がないことを別々に示せ。さらに $S_0(A\Omega_0)=A^*\Omega_0$ がwell-definedでないことを証明せよ。

<!-- solution-start -->
**詳細解答。** $A\Omega_0$ は $A$ の第1列だけを保持し、第2列は零にする。よって

$$
L(M_2)\Omega_0=\operatorname{span}\{E_{11},E_{21}\},
$$

これは4次元 $H_2$ の真部分空間なので巡回性がない。一方 $E_{12}\ne0$ でも

$$
E_{12}\Omega_0=E_{12}E_{11}=0
$$

だから分離性がない。しかし $E_{12}^*=E_{21}$ なので

$$
E_{12}^*\Omega_0=E_{21}E_{11}=E_{21}\ne0.
$$

同じ入力 $0=0\Omega_0=E_{12}\Omega_0$ に対し出力が $0$ と $E_{21}$ に分かれ、作用素の規則は一価ではない。[Tomita初期作用素の成立](../AQFT18/index.md#prop-aqft18-initial-properties)に必要な分離性を失ったことが原因である。
<!-- solution-end -->

### Level C：全体の構成を組み合わせる

<a id="ex-aqft20-c01"></a>
#### AQFT20-C01 位相反転と固定点

- Level: C

$\rho=\operatorname{diag}(3/4,1/4)$、$t_0=\pi/\log3$、$A=E_{12}+E_{21}$ とする。

1. $\sigma_{t_0}(L_A)=-L_A$ を示せ。
2. $\sigma_t(L_B)=L_B$ が全ての $t\in\mathbb R$ で成り立つ行列 $B$ をすべて求めよ。
3. $\rho=I/2$ の場合に $\Delta=I$ となる一方、左乗算環は非可換であることを示せ。

<!-- solution-start -->
**詳細解答。** 第1問は [モジュラー流の公式](#thm-aqft20-finite-flow)で

$$
3^{it_0}=\exp(i\pi)=-1,\qquad
3^{-it_0}=\exp(-i\pi)=-1
$$

を用いる。よって $\alpha_{t_0}(A)=-E_{12}-E_{21}=-A$、従って $\sigma_{t_0}(L_A)=-L_A$ である。

第2問では $B=(b_{ij})$ と書く。第 $(i,j)$ 成分の変化は $(\lambda_i/\lambda_j)^{it}b_{ij}$。対角成分は常に不変だが、比が3または $1/3$ である非対角成分は全 $t$ にわたって不変なら零でなければならない。逆に任意の対角 $B$ は $\rho$ と可換なので不変。従って答えは全対角行列である。

第3問は [モジュラー作用素の式](#thm-aqft20-modular-formulas)から $\Delta(X)=(I/2)X(2I)=X$。一方、

$$
L_{E_{12}}L_{E_{21}}=L_{E_{11}},\qquad
L_{E_{21}}L_{E_{12}}=L_{E_{22}}
$$

であり、これらは単位行列 $I$ に作用させると $E_{11},E_{22}$ と異なる。従って $\Delta=I$ は非可換性を排除しない。
<!-- solution-end -->

<a id="ex-aqft20-c02"></a>
#### AQFT20-C02 固有値比から密度と可換子を復元する

- Level: C

$\rho=\operatorname{diag}(p,1-p)$、$0<p<1$ で $\Delta(E_{12})=4E_{12}$ だとする。

1. $\rho$ を求めよ。
2. $S(E_{12})$、$S^\sharp(E_{12})$、$J\Delta J(E_{12})$ を計算せよ。
3. $L(M_2)'$ を求め、$J L_AJ$ が可換子を尽くすことを示せ。

<!-- solution-start -->
**詳細解答。** [固有値比の公式](#thm-aqft20-modular-formulas)から

$$
\frac p{1-p}=4
\quad\Longrightarrow\quad
p=4(1-p)
\quad\Longrightarrow\quad
5p=4,\qquad p=\frac45.
$$

従って $\rho=\operatorname{diag}(4/5,1/5)$。比が4だから

$$
S(E_{12})=2E_{21},\qquad
S^\sharp(E_{12})=\frac12E_{21}.
$$

さらに $J(E_{12})=E_{21}$、$\Delta(E_{21})=\frac14E_{21}$、$J(E_{21})=E_{12}$ より

$$
J\Delta J(E_{12})
=J\Delta(E_{21})
=J\left(\frac14E_{21}\right)
=\frac14E_{12}
=\Delta^{-1}(E_{12}).
$$

最後に任意の $T\in L(M_2)'$ に対して $B=T(I)$ とおけば

$$
T(X)=T(L_X I)=L_XT(I)=XB.
$$

よって $L(M_2)'$ は右乗算全体。逆向きの包含は $A(XB)=(AX)B$ による。$J(X)=X^*$ を順に代入すると

$$
JL_AJ(X)=J(AX^*)=(AX^*)^*=XA^*=R_{A^*}(X).
$$

$A^*$ は全行列を走るので $JL(M_2)J=L(M_2)'$ が示された。この計算は一般の無限次元環へそのまま移せるとは限らない。
<!-- solution-end -->

## 8. 有限次元から先へ

本講の $\rho^{-1}$ は忠実性によって全域定義で、すべての作用素は有界でした。[AQFT19の閉反線形作用素の極分解](../AQFT19/index.md#thm-aqft19-polar)は非有界な場合にも成り立ちますが、そのときは作用素積・逆作用素の定義域を個別に調べる必要があります。

次のAQFT21では、有限次元では気軽に使った左右乗算・可換子・作用素の閉包の計算を、一般のモジュラーHilbert環に移すための解析的coreと補題として組み立てます。AQFT22の一般可換子定理、AQFT23のモジュラー不変性を有限次元の例だけで証明したとはみなしません。
