# AQFT30 Araki相対エントロピーの有限次元還元

[AQFT29の相対Tomita作用素](../AQFT29/index.md#def-aqft29-relative-tomita)では、入力側の状態を $\rho$、出力側を $\sigma$ と固定しました。二つの忠実な密度行列について、[相対モジュラー作用素の全計算](../AQFT29/index.md#thm-aqft29-matrix-formulas)は

$$
\Delta_{\sigma\mid\rho}(X)=\sigma X\rho^{-1}
$$

でした。しかし、この作用素は密度行列が作用する $\mathbb C^n$ 上ではなく、**行列をベクトルとみるHilbert–Schmidt空間**上で作用します。では、どこから二状態の「情報的な隔たり」という一つの数が出るのでしょうか。

[QINF20の量子相対エントロピー](../../../応用系/QINF/QINF20/index.md#def-qinf20-relative-entropy)は、有限次元で二つの行列対数のトレース差として定義されています。本講の中心問いは、その式が**相対モジュラー作用素の対数の期待値**と、可換性を仮定せず一致する理由です。一般のvon Neumann環へ持ち上げられる定義と、有限次元に特有の計算道具を区別します。

ここでの $\log$ は自然対数です。既習のQINF20は底2なので、数値の比較には $\ln 2$ 倍が必要です。

## 1. 対数を取る対象と、その期待値を取る状態

有限次元の情報量なら、正定値密度行列の固有値を対数に入れます。一般の局所von Neumann環では、[Type III環のトレース障害](../AQFT15/index.md#thm-aqft15-typeiii-no-nsf-trace)により、その環に属する密度行列から同じ式を直接作れるとは限りません。そこで、行列の代わりに、既習の[相対モジュラー作用素](../AQFT29/index.md#def-aqft29-relative-modular)の対数を考えます。

$\mathcal M$ の二つの忠実正規状態を、同じ標準表現の自然正錐に属する単位ベクトル $\xi_\rho,\xi_\sigma$ で表し、$\Delta_{\sigma\mid\rho}$ を相対モジュラー作用素とします。「自然正錐」は状態の代表ベクトルを選ぶための標準形の構造です。一般の標準形の存在自体はここで有限行列から証明しません。有限次元では $\xi_\rho=\rho^{1/2}$、$\xi_\sigma=\sigma^{1/2}$ です。

非負自己共役作用素 $\Delta_{\sigma\mid\rho}$ の対数はスペクトル定理で定めます。無限次元では対数が非有界になりうるので、単純にすべてのベクトルへ $\log\Delta$ を適用できるわけではありません。以下の内積は、適切な対数の**スペクトル積分**として読むことにします。

具体的には、相対作用素のスペクトル射影を $E_\Delta(B)$（$B$ は正の実数のBorel集合）と書き、入力ベクトル $\xi_\rho$ がその射影に持つ重みを

$$
\mu_\rho(B):=\langle\xi_\rho,E_\Delta(B)\xi_\rho\rangle
=\|E_\Delta(B)\xi_\rho\|^2
$$

と置きます。忠実な状態について相対作用素に核はなく、$\|\xi_\rho\|=1$ なので $\mu_\rho((0,\infty))=1$ です。有限次元ではこれは、各固有方向に射影したベクトルの係数の絶対値二乗を足したものです。**定義の積分が固有値と重みの和になる根拠**を、次の二点例で確認します。

<a id="def-aqft30-araki-relative-entropy"></a>

<!-- formal-statement-start -->
> **定義（忠実正規状態のAraki相対エントロピー）**  
> 単位的von Neumann環 $\mathcal M$ の二つの忠実正規状態 $\rho,\sigma$ を考える。
> それらを同じ標準表現の自然正錐にある単位ベクトル $\xi_\rho,\xi_\sigma$ で表す。
> 入力を $\xi_\rho$、出力を $\xi_\sigma$ とする[相対モジュラー作用素](../AQFT29/index.md#def-aqft29-relative-modular)を $\Delta_{\sigma\mid\rho}$ とする。
> $\xi_\rho$ に関するこの正作用素のスペクトル測度を $\mu_\rho$ とするとき、**Araki相対エントロピー**を
>
$$
S_{\mathrm A}(\rho\Vert\sigma)
:=-\int_{(0,\infty)}\log\lambda\,d\mu_\rho(\lambda)
$$
>
> で定める。対数の正の部分の積分は有限で、負の部分が発散する場合は値を $+\infty$ とする。有限次元の忠実な状態なら
>
$$
S_{\mathrm A}(\rho\Vert\sigma)
=-\langle\rho^{1/2},
(\log\Delta_{\sigma\mid\rho})\rho^{1/2}\rangle_2
$$
>
> と通常の内積で書ける。$\log$ は自然対数である。
<!-- formal-statement-end -->

この定義が発散の符号を取り違えないことも確認します。[相対Tomita初期作用素の定義](../AQFT29/index.md#def-aqft29-relative-tomita)では $S_{\sigma\mid\rho}\xi_\rho=\xi_\sigma$ です。また[相対モジュラー作用素の定義](../AQFT29/index.md#def-aqft29-relative-modular)の $\Delta=S^\sharp S$ から

$$
\int_{(0,\infty)}\lambda\,d\mu_\rho(\lambda)
=\|\Delta_{\sigma\mid\rho}^{1/2}\xi_\rho\|^2
=\|\xi_\sigma\|^2=1.
$$

従って $\log_+\lambda\leq\lambda$ で対数の正の部分は積分可能です。忠実性から相対作用素の核がない標準表現を用いているので、積分の領域は $(0,\infty)$ です。無限次元で残りうる発散や、非忠実状態で支持が欠ける場合はAQFT31で区別します。

<!-- definition-example-start: def-aqft30-araki-relative-entropy -->
### 直接例：可換な二点環で定義を確かめる

$\mathcal M=\{\operatorname{diag}(a,b):a,b\in\mathbb C\}$ を $\mathbb C^2$ 上に作用させ、$0<p,q<1$ とします。状態を

$$
\rho(\operatorname{diag}(a,b))=pa+(1-p)b,\qquad
\sigma(\operatorname{diag}(a,b))=qa+(1-q)b
$$

と定めます。$\rho(A^*A)=p|a|^2+(1-p)|b|^2$ は $A\ne0$ なら正なので忠実であり、$\rho(I)=1$ です。$\sigma$ 側も同様で、有限次元ではこれらの状態は正規です。代表ベクトル $\xi_\rho=(\sqrt p,\sqrt{1-p})$、$\xi_\sigma=(\sqrt q,\sqrt{1-q})$ は

$$
\|\xi_\rho\|^2=p+(1-p)=1,\qquad
\langle\xi_\rho,A\xi_\rho\rangle=\rho(A)
$$

を満たし、$\sigma$ 側も同様です。さらに $A=\operatorname{diag}(a,b)$ に対し

$$
A\xi_\rho=(a\sqrt p,b\sqrt{1-p})
$$

です。任意の $x=(x_1,x_2)\in\mathbb C^2$ は $a=x_1/\sqrt p$, $b=x_2/\sqrt{1-p}$ と選べば $A\xi_\rho=x$ と表せるため**巡回的**です。$A\xi_\rho=0$ なら $a=b=0$ なので**分離的**でもあります。$q$ 側も同じ理由で二条件を満たします。

では、なぜ相対作用素を対角行列で判定できるのでしょうか。[相対Tomita作用素の定義](../AQFT29/index.md#def-aqft29-relative-tomita)に $x=A\xi_\rho$ を代入すると

$$
\begin{aligned}
S_{\sigma\mid\rho}(x_1,x_2)
&=A^*\xi_\sigma\\
&=\left(\sqrt{\frac qp}\,\overline{x_1},
\sqrt{\frac{1-q}{1-p}}\,\overline{x_2}\right).
\end{aligned}
$$

この反線形写像の係数は実数かつ正なので、反線形随伴 $S^\sharp$ も同じ形です。[相対モジュラー作用素 $\Delta=S^\sharp S$](../AQFT29/index.md#def-aqft29-relative-modular) を合成すれば

$$
\Delta_{\sigma\mid\rho}
=\operatorname{diag}\left(\frac qp,\frac{1-q}{1-p}\right).
$$

標準基底 $e_1,e_2$ がこの対角作用素の固有方向であり、$\xi_\rho=\sqrt p\,e_1+\sqrt{1-p}\,e_2$ です。したがって射影のノルム二乗から重みは $p,1-p$ となります。固有値が一致する場合は同じ固有値への重みを合算します。

両固有値が正なので対数を取れます。$\xi_\rho$ の固有方向への重みは $p,1-p$ ですから、定義のスペクトル積分を実際に計算すると

$$
\begin{aligned}
S_{\mathrm A}(\rho\Vert\sigma)
&=-p\log\frac qp-(1-p)\log\frac{1-q}{1-p}\\
&=p\log\frac pq+(1-p)\log\frac{1-p}{1-q}.
\end{aligned}
$$

これは古典的二点分布の相対エントロピー（自然対数）です。**定義の確認**：状態の忠実性、ベクトルの規格化、相対作用素の正固有値、スペクトル重みの和1、積分の有限性を確かめました。$p=q$ なら両対数が零で、定義から値0です。
<!-- definition-example-end -->

## 2. 非可換なときも対数を計算できる理由

$\rho$ と $\sigma$ が非可換なら、$\log(\sigma\rho^{-1})$ を密度行列の対数として扱うのは誤りです。そもそも比較する作用素は $X\mapsto\sigma X\rho^{-1}$ であって、$\sigma\rho^{-1}$ を左から掛ける作用素ではありません。

[Hilbert–Schmidt空間と左右乗算](../AQFT20/index.md#def-aqft20-hilbert-schmidt)では、$M_n(\mathbb C)$ の行列 $X$ をベクトルとみなし、内積を $\langle X,Y\rangle_2=\operatorname{Tr}(X^*Y)$、左右乗算を $L_A(X)=AX$、$R_B(X)=XB$（$A,B\in M_n(\mathbb C)$）と定めます。$\rho,\sigma\in M_n(\mathbb C)$ を正定値・トレース1とし、それぞれの正規直交固有基底を別々に選びます。

$$
\rho v_j=r_jv_j,\qquad
\sigma u_i=s_iu_i,\qquad r_j,s_i>0.
$$

左の $u_i$ と右の $v_j$ の組から、$F_{ij}=|u_i\rangle\langle v_j|$ を作ります。これが必要なのは、左乗算は行側、右乗算は列側の固有値を読むからです。

<a id="lem-aqft30-mixed-spectrum"></a>

<!-- formal-statement-start -->
> **補題（相対作用素の混合固有基底とスペクトル重み）**  
> $n\ge1$、$\rho,\sigma\in M_n(\mathbb C)$ を正定値、$\operatorname{Tr}\rho=\operatorname{Tr}\sigma=1$ とする。上記の $r_j,v_j,s_i,u_i$ と $F_{ij}=|u_i\rangle\langle v_j|$ に対して、$F_{ij}$ はHilbert–Schmidt空間の正規直交基底であり、
>
$$
\Delta_{\sigma\mid\rho}F_{ij}
=\frac{s_i}{r_j}F_{ij},\qquad
(\log\Delta_{\sigma\mid\rho})F_{ij}
=(\log s_i-\log r_j)F_{ij}.
$$
>
> $\xi_\rho=\rho^{1/2}$ のこの基底における重みは
>
$$
w_{ij}
=\left|\langle F_{ij},\xi_\rho\rangle_2\right|^2
=r_j|\langle u_i,v_j\rangle|^2,\qquad
\sum_{i,j}w_{ij}=1.
$$
<!-- formal-statement-end -->

### 証明の見取り図

異なる固有基底を使っても、外積は行列空間の正規直交基底になります。[AQFT29の左右乗算公式](../AQFT29/index.md#thm-aqft29-matrix-formulas)へ代入して固有値を出し、正の固有値の対数を取ります。最後に入力ベクトルを $F_{ij}$ 方向へ展開して、期待値で使う重みを求めます。

<!-- proof-start -->
### 証明

行列積をまず計算します。

$$
F_{ij}^*F_{k\ell}
=|v_j\rangle\langle u_i,u_k\rangle\langle v_\ell|
=\delta_{ik}|v_j\rangle\langle v_\ell|.
$$

この式のトレースを取ると

$$
\langle F_{ij},F_{k\ell}\rangle_2
=\operatorname{Tr}(F_{ij}^*F_{k\ell})
=\delta_{ik}\delta_{j\ell}.
$$

$n^2$ 個あり、行列空間の複素次元も $n^2$ なので基底です。$\sigma F_{ij}=s_iF_{ij}$ と $F_{ij}\rho^{-1}=r_j^{-1}F_{ij}$ を別々に確かめ、[相対モジュラー作用素の式](../AQFT29/index.md#thm-aqft29-matrix-formulas)に代入して

$$
\Delta_{\sigma\mid\rho}F_{ij}
=\sigma F_{ij}\rho^{-1}
=\frac{s_i}{r_j}F_{ij}
$$

を得ます。全固有値が正なので対数の関数計算は、それぞれの固有ベクトルを $\log(s_i/r_j)=\log s_i-\log r_j$ 倍します。

次に

$$
\begin{aligned}
\langle F_{ij},\rho^{1/2}\rangle_2
&=\operatorname{Tr}(|v_j\rangle\langle u_i|\rho^{1/2})\\
&=\langle u_i,\rho^{1/2}v_j\rangle\\
&=\sqrt{r_j}\langle u_i,v_j\rangle.
\end{aligned}
$$

ここで $\rho^{1/2}v_j=\sqrt{r_j}v_j$ を用いました。絶対値二乗が主張の $w_{ij}$ です。各 $j$ ごとに $\{u_i\}_i$ が正規直交基底なので $\sum_i|\langle u_i,v_j\rangle|^2=1$、従って

$$
\sum_{i,j}w_{ij}
=\sum_jr_j\sum_i|\langle u_i,v_j\rangle|^2
=\sum_jr_j=\operatorname{Tr}\rho=1.
$$
<!-- proof-end -->

重み $w_{ij}$ は二つの基底の**重なりの絶対値二乗**を含みます。可換な場合だけ共通固有基底を選んで $w_{ij}=r_j\delta_{ij}$ とでき、古典的な固有値比の和になります。

## 3. Arakiの式が二つの行列対数の差になる

直前の補題が得たのはHilbert–Schmidt空間上の $\log\Delta$ です。この作用素を、左・右乗算に分解してから $\rho^{1/2}$ で挟みます。

<a id="thm-aqft30-finite-reduction"></a>

<!-- formal-statement-start -->
> **定理（Araki相対エントロピーの忠実有限次元還元）**  
> $n\ge1$、$\rho,\sigma\in M_n(\mathbb C)$ は正定値かつトレース1とする。Hilbert–Schmidt標準表現で $\xi_\rho=\rho^{1/2}$、$\Delta_{\sigma\mid\rho}=L_\sigma R_{\rho^{-1}}$ としたとき、
>
$$
\log\Delta_{\sigma\mid\rho}
=L_{\log\sigma}-R_{\log\rho}
$$
>
> がHilbert–Schmidt空間上の作用素として成立し、
>
$$
\begin{aligned}
S_{\mathrm A}(\rho\Vert\sigma)
&=-\langle\rho^{1/2},
(\log\Delta_{\sigma\mid\rho})\rho^{1/2}\rangle_2\\
&=\operatorname{Tr}\rho(\log\rho-\log\sigma).
\end{aligned}
$$
>
> $\rho\sigma=\sigma\rho$ は仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

「作用素の積の対数」を密度行列同士に使うのではありません。補題の混合固有基底では、左対数作用素は $\log s_i$、右対数作用素は $\log r_j$ 倍です。これらの差が $\log(s_i/r_j)$ に一致することを使います。その後は、Hilbert–Schmidt内積をトレースへ書き戻します。

<!-- proof-start -->
### 証明

[相対作用素の混合固有基底とスペクトル重み](#lem-aqft30-mixed-spectrum)より、各 $F_{ij}$ で $\log\Delta$ は $(\log s_i-\log r_j)$ 倍です。他方、

$$
\begin{aligned}
L_{\log\sigma}(F_{ij})
&=(\log\sigma)F_{ij}=(\log s_i)F_{ij},\\
R_{\log\rho}(F_{ij})
&=F_{ij}(\log\rho)=(\log r_j)F_{ij}.
\end{aligned}
$$

全基底上で作用が一致するため、有限次元の作用素として $\log\Delta=L_{\log\sigma}-R_{\log\rho}$ です。左・右乗算は可換ですが、これを $\log(\sigma\rho^{-1})=\log\sigma-\log\rho$ という密度行列の等式と混同してはいけません。

今度は入力ベクトル $\rho^{1/2}$ に作用させます。

$$
\begin{aligned}
(\log\Delta_{\sigma\mid\rho})\rho^{1/2}
&=(\log\sigma)\rho^{1/2}
-\rho^{1/2}(\log\rho),\\
\langle\rho^{1/2},L_{\log\sigma}\rho^{1/2}\rangle_2
&=\operatorname{Tr}(\rho^{1/2}(\log\sigma)\rho^{1/2})\\
&=\operatorname{Tr}(\rho\log\sigma),\\
\langle\rho^{1/2},R_{\log\rho}\rho^{1/2}\rangle_2
&=\operatorname{Tr}(\rho^{1/2}\rho^{1/2}\log\rho)\\
&=\operatorname{Tr}(\rho\log\rho).
\end{aligned}
$$

第2式では有限行列のトレースの巡回性を用い、第3式では $\rho^{1/2}\rho^{1/2}=\rho$ と、同じ $\rho$ の関数同士が可換であることを用いました。$\rho$ と $\sigma$ の交換は行っていません。従って

$$
-\langle\rho^{1/2},\log\Delta_{\sigma\mid\rho}\rho^{1/2}\rangle_2
=\operatorname{Tr}(\rho\log\rho)
-\operatorname{Tr}(\rho\log\sigma).
$$
<!-- proof-end -->

別の計算経路として、補題の重みを用いると

$$
\begin{aligned}
S_{\mathrm A}(\rho\Vert\sigma)
&=-\sum_{i,j}r_j|\langle u_i,v_j\rangle|^2
(\log s_i-\log r_j)\\
&=\sum_jr_j\log r_j
-\sum_{i,j}r_j|\langle u_i,v_j\rangle|^2\log s_i.
\end{aligned}
$$

第1項で $\sum_i|\langle u_i,v_j\rangle|^2=1$ を使いました。第2項では $\langle v_j,(\log\sigma)v_j\rangle=\sum_i|\langle u_i,v_j\rangle|^2\log s_i$ なので、まさに $\operatorname{Tr}(\rho\log\sigma)$ を再現します。これが、二つの異なる固有基底を使っても同じトレース式になる理由です。

## 4. 非可換な二準位系を最後まで計算する

次の例は[AQFT29で相対作用素を対角化した二状態](../AQFT29/index.md#thm-aqft29-matrix-formulas)と同じものです。

$$
\rho=\begin{pmatrix}3/4&0\\0&1/4\end{pmatrix},
\qquad
\sigma=\begin{pmatrix}1/2&-1/6\\-1/6&1/2\end{pmatrix}.
$$

$\rho$ は固有値 $3/4,1/4$、$\sigma$ は $u_1=(1,-1)^{\mathsf T}/\sqrt2$、$u_2=(1,1)^{\mathsf T}/\sqrt2$ を固有ベクトルとして固有値 $2/3,1/3$ を持ちます。どちらも自己共役、正定値、トレース1です。しかし

$$
[\rho,\sigma]
=\begin{pmatrix}0&-1/12\\1/12&0\end{pmatrix}\ne0.
$$

**第一の経路：相対作用素の対数を直接平均する。** $\rho$ の固有ベクトルを $v_1=e_1,v_2=e_2$ とすると、すべての $|\langle u_i,v_j\rangle|^2=1/2$ です。混合基底の固有値と、入力 $\rho^{1/2}$ の重みは

| 基底 | $F_{11}$ | $F_{12}$ | $F_{21}$ | $F_{22}$ |
|---|---:|---:|---:|---:|
| $\Delta$ の固有値 $s_i/r_j$ | $8/9$ | $8/3$ | $4/9$ | $4/3$ |
| 重み $w_{ij}$ | $3/8$ | $1/8$ | $3/8$ | $1/8$ |

です。重みは合計1です。従って対数の期待値に代入すると

$$
\begin{aligned}
S_{\mathrm A}(\rho\Vert\sigma)
=-\bigg\{&
\frac38\log\frac89+\frac18\log\frac83\\
&+\frac38\log\frac49+\frac18\log\frac43
\bigg\}
=\frac74\log3-\frac52\log2.
\end{aligned}
$$

**第二の経路：密度行列の対数を用いる。** $\rho$ はすでに対角なので

$$
\operatorname{Tr}(\rho\log\rho)
=\frac34\log\frac34+\frac14\log\frac14
=\frac34\log3-2\log2.
$$

$\sigma$ の固有射影を $P_i=|u_i\rangle\langle u_i|$ とすると

$$
\log\sigma
=(\log(2/3))P_1+(\log(1/3))P_2.
$$

各 $P_i$ の対角成分は $1/2$ なので、$\log\sigma$ の両対角成分は

$$
(\log\sigma)_{11}=(\log\sigma)_{22}
=\frac12\left(\log\frac23+\log\frac13\right)
=\frac12\log\frac29.
$$

ここで $\rho$ が対角なのでトレースに必要なのはこの二成分だけです。

$$
\operatorname{Tr}(\rho\log\sigma)
=\left(\frac34+\frac14\right)\frac12\log\frac29
=\frac12\log\frac29
=\frac12\log2-\log3.
$$

差を取ると再び

$$
\boxed{
S_{\mathrm A}(\rho\Vert\sigma)
=\frac74\log3-\frac52\log2
\approx0.189704
}
$$

です。**可換でない二状態に、固有値を勝手に同じ順に並べた古典的な比の和を適用してはいけません。** 重みの行列が二つの固有基底の相対位置を保持します。

## 5. 比較の向きと、有限次元の不変性

相対エントロピーの入力順序は反対にできません。[相対作用素の向きと規格化](../AQFT29/index.md#prop-aqft29-orientation)によれば、相対作用素の添字を交換すると左右乗算が入れ替わります。エントロピーの期待値を取るベクトルも同時に $\sigma^{1/2}$ へ変わります。両方の変更を忘れないでください。

また、系の基底を同時にユニタリで変更しても区別の強さは変わりません。独立な二系の積状態では二つの寄与が足し合わされます。この二つは有限次元還元の式から直接証明できます。

<a id="prop-aqft30-unitary-product"></a>

<!-- formal-statement-start -->
> **命題（有限次元での同時ユニタリ不変性と積状態の加法性）**  
> $\rho,\sigma$ を同じ有限次元Hilbert空間上の忠実な密度行列、$U$ をユニタリ作用素とする。また $\rho_A,\sigma_A$ と $\rho_B,\sigma_B$ をそれぞれ有限次元系 $A,B$ 上の忠実な密度行列とする。このとき自然対数で定義したAraki相対エントロピーについて
>
$$
\begin{aligned}
S_{\mathrm A}(U\rho U^*\Vert U\sigma U^*)
&=S_{\mathrm A}(\rho\Vert\sigma),\\
S_{\mathrm A}(\rho_A\otimes\rho_B\Vert\sigma_A\otimes\sigma_B)
&=S_{\mathrm A}(\rho_A\Vert\sigma_A)
+S_{\mathrm A}(\rho_B\Vert\sigma_B)
\end{aligned}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

同時ユニタリ変換は行列対数の固有値とトレースを保ちます。積状態は、二つの行列の固有値の積を取ってから対数に入れるため、対数が和へ分かれます。積状態の条件は重要で、任意の相関状態を積状態に置き換える主張ではありません。

<!-- proof-start -->
### 証明

正定値行列 $\tau=\sum_k t_kP_k$ に対し、$U\tau U^*=\sum_k t_kUP_kU^*$ なので関数計算から

$$
\log(U\tau U^*)=U(\log\tau)U^*.
$$

[有限次元還元](#thm-aqft30-finite-reduction)の式へ $\tau=\rho,\sigma$ の両方を代入すれば

$$
\begin{aligned}
&S_{\mathrm A}(U\rho U^*\Vert U\sigma U^*)\\
&=\operatorname{Tr}\{U\rho U^*[U(\log\rho)U^*-U(\log\sigma)U^*]\}\\
&=\operatorname{Tr}\{U\rho(\log\rho-\log\sigma)U^*\}\\
&=\operatorname{Tr}\rho(\log\rho-\log\sigma).
\end{aligned}
$$

積については、$\rho_A=\sum_i a_iP_i$、$\rho_B=\sum_j b_jQ_j$ と固有分解すると、$\rho_A\otimes\rho_B$ の正固有値が $a_ib_j$、固有射影が $P_i\otimes Q_j$ です。従って

$$
\begin{aligned}
\log(\rho_A\otimes\rho_B)
&=\sum_{i,j}\log(a_ib_j)P_i\otimes Q_j\\
&=(\log\rho_A)\otimes I_B+I_A\otimes(\log\rho_B).
\end{aligned}
$$

同じ議論が $\sigma_A\otimes\sigma_B$ にも成立します。差を取り、$\operatorname{Tr}(X\otimes Y)=\operatorname{Tr}X\,\operatorname{Tr}Y$ を用いると

$$
\begin{aligned}
&S_{\mathrm A}(\rho_A\otimes\rho_B\Vert\sigma_A\otimes\sigma_B)\\
&=\operatorname{Tr}[(\rho_A\otimes\rho_B)
((\log\rho_A-\log\sigma_A)\otimes I_B)]\\
&\quad+\operatorname{Tr}[(\rho_A\otimes\rho_B)
(I_A\otimes(\log\rho_B-\log\sigma_B))]\\
&=S_{\mathrm A}(\rho_A\Vert\sigma_A)\operatorname{Tr}\rho_B
+\operatorname{Tr}\rho_A\,S_{\mathrm A}(\rho_B\Vert\sigma_B)\\
&=S_{\mathrm A}(\rho_A\Vert\sigma_A)+S_{\mathrm A}(\rho_B\Vert\sigma_B).
\end{aligned}
$$
<!-- proof-end -->

QINF20の[量子相対エントロピーの定義](../../../応用系/QINF/QINF20/index.md#def-qinf20-relative-entropy)は底2です。その数値を $D_2(\rho\Vert\sigma)$ と明記すれば、忠実な有限次元状態では

$$
S_{\mathrm A}(\rho\Vert\sigma)=(\ln2)\,D_2(\rho\Vert\sigma)
$$

です。これは**底の単位換算**であって、作用素の向きが変わるわけではありません。

## 6. 有限次元の証明から言えないこと

[AQFT15のType III環](../AQFT15/index.md#thm-aqft15-typeiii-no-nsf-trace)には、この節までの $\operatorname{Tr}\rho(\log\rho-\log\sigma)$ を**領域に付随する環の密度行列の公式**としてそのまま置くことはできません。それでも忠実正規状態の標準表現では、[AQFT29の相対作用素](../AQFT29/index.md#def-aqft29-relative-modular)と第1節のスペクトル積分による定義は意味を持ちます。有限次元還元が示したのは両者の整合であり、すべての領域代数が有限次元行列へ還元できるという主張ではありません。

また、$\rho$ または $\sigma$ が零固有値を持つと $\rho^{-1}$ や $\log\sigma$ の書き方に注意が必要です。[AQFT29の非忠実入力の反例](../AQFT29/index.md#prop-aqft29-orientation)は、単に逆行列の式が壊れる前に、初期作用素が一価でなくなる場合があることを示します。**支持射影と $+\infty$ の正しい扱いはAQFT31**で学びます。一般の正値性・零となる条件、部分環への制限による単調性の厳密な一般論も、後続講義で証明します。

## 7. 演習と詳細解答

### Level A：定義と符号を手で確かめる

<a id="ex-aqft30-a01"></a>
#### AQFT30-A01 二点の対数平均
- Level: A

$\rho=\operatorname{diag}(3/4,1/4)$、$\sigma=I_2/2$ とする。Hilbert–Schmidt空間 $H_2=M_2(\mathbb C)$ 上の相対作用素の**全固有値（重複度を含む）**と、入力ベクトル $\rho^{1/2}$ に関する各固有方向の重みを求め、自然対数の $S_{\mathrm A}(\rho\Vert\sigma)$ を計算せよ。

**詳細解答。** [混合固有基底の補題](#lem-aqft30-mixed-spectrum)を用います。$\rho$ の固有基底を $e_1,e_2$ とすると、$\sigma=I_2/2$ は同じ基底で対角化できます。行列単位 $E_{ij}=|e_i\rangle\langle e_j|$ に対し

$$
\Delta_{\sigma\mid\rho}(E_{ij})
=\frac{1/2}{r_j}E_{ij},\qquad
r_1=\frac34,\quad r_2=\frac14.
$$

したがって $E_{11},E_{21},E_{12},E_{22}$ の順に固有値は $2/3,2/3,2,2$ です。一方、入力ベクトルは

$$
\rho^{1/2}=\frac{\sqrt3}{2}E_{11}+\frac12E_{22}
$$

なので、同じ順の重みは $3/4,0,0,1/4$ です。**固有値は4方向に存在しますが、対数の期待値に寄与するのは2方向だけ**です。従って

$$
\begin{aligned}
S_{\mathrm A}(\rho\Vert\sigma)
&=-\frac34\log\frac23-\frac14\log2\\
&=\frac34\log\frac32-\frac14\log2
=\frac34\log3-\log2.
\end{aligned}
$$

二つの重みの和は1、相対作用素の固有値はどちらも正です。

<a id="ex-aqft30-a02"></a>
#### AQFT30-A02 同じ状態でも相対作用素は恒等とは限らない
- Level: A

$\rho=\sigma=\operatorname{diag}(3/4,1/4)$ とする。Hilbert–Schmidt空間上の $\Delta_{\rho\mid\rho}$ の固有値をすべて求め、$S_{\mathrm A}(\rho\Vert\rho)=0$ をスペクトル重みから確かめよ。

**詳細解答。** [忠実な有限次元二状態の相対Tomita全計算](../AQFT29/index.md#thm-aqft29-matrix-formulas)より $\Delta E_{ij}=(r_i/r_j)E_{ij}$ です。$E_{11},E_{12},E_{21},E_{22}$ の順の固有値は $1,3,1/3,1$ となり、確かに作用素自体は恒等ではありません。一方

$$
\rho^{1/2}=\frac{\sqrt3}{2}E_{11}+\frac12E_{22}
$$

なので、このベクトルに関する重みは対角方向で $3/4,1/4$、他は0です。双方の固有値は1だから

$$
S_{\mathrm A}(\rho\Vert\rho)
=-\frac34\log1-\frac14\log1=0.
$$

期待値に寄与する成分と、作用素全体のスペクトルを区別しました。

<a id="ex-aqft30-a03"></a>
#### AQFT30-A03 底2から自然対数へ
- Level: A

[QINF20の定義](../../../応用系/QINF/QINF20/index.md#def-qinf20-relative-entropy)で $D_2(\rho\Vert\sigma)=1/2$ bitと得られた忠実な二状態に対し、自然対数を用いるAraki相対エントロピーを表せ。また $D_2$ の値をそのまま自然対数の値と呼べない理由を述べよ。

**詳細解答。** $\log_2x=(\ln x)/(\ln2)$ より、二つのトレース差を計算すると $D_2=S_{\mathrm A}/\ln2$。従って

$$
S_{\mathrm A}(\rho\Vert\sigma)=\frac12\ln2\approx0.346574.
$$

$\log_2$ と $\ln$ は底が異なるため、同じ状態でも数値が $\ln2$ 倍だけ違います。添字 $\sigma\mid\rho$ の向きは変わりません。

<a id="ex-aqft30-a04"></a>
#### AQFT30-A04 左右乗算の対数を判定する
- Level: A

忠実な $\rho,\sigma$ に対し、$\log\Delta_{\sigma\mid\rho}=L_{\log\sigma}-R_{\log\rho}$ の両辺を $F_{ij}=|u_i\rangle\langle v_j|$ に作用させて検算せよ。また一般に $\log(\sigma\rho^{-1})=\log\sigma-\log\rho$ としてはいけない理由を述べよ。

**詳細解答。** $\sigma u_i=s_iu_i$、$\rho v_j=r_jv_j$ より、左辺は

$$
(\log\Delta)F_{ij}
=\log(s_i/r_j)F_{ij}.
$$

右辺は

$$
(L_{\log\sigma}-R_{\log\rho})F_{ij}
=(\log s_i-\log r_j)F_{ij}
$$

で一致します。この対数分解は**行列空間上で互いに可換な左右乗算**を使っています。一般の $\sigma$ と $\rho^{-1}$ は密度行列として非可換で、積 $\sigma\rho^{-1}$ も自己共役とは限らず、同じ対数則を無条件に適用できません。

### Level B：一般導出と非可換模型

<a id="ex-aqft30-b01"></a>
#### AQFT30-B01 スペクトル重みからトレース式を再構成する
- Level: B

忠実な $\rho,\sigma$ の固有基底 $v_j,u_i$ と固有値 $r_j,s_i$ を用い、スペクトル表示の和から $\operatorname{Tr}\rho(\log\rho-\log\sigma)$ を導け。基底が異なってよい理由を含めよ。

**詳細解答。** [補題](#lem-aqft30-mixed-spectrum)により、$F_{ij}$ 方向の重みは $w_{ij}=r_j|\langle u_i,v_j\rangle|^2$ で、$\log\Delta$ の固有値は $\log s_i-\log r_j$ です。従って

$$
\begin{aligned}
-\langle\rho^{1/2},\log\Delta\rho^{1/2}\rangle_2
&=-\sum_{i,j}r_j|\langle u_i,v_j\rangle|^2\log s_i\\
&\quad+\sum_{i,j}r_j|\langle u_i,v_j\rangle|^2\log r_j.
\end{aligned}
$$

第2項は $\sum_i|\langle u_i,v_j\rangle|^2=1$ により $\sum_jr_j\log r_j=\operatorname{Tr}\rho\log\rho$ です。第1項は $\log\sigma=\sum_i(\log s_i)|u_i\rangle\langle u_i|$ を代入すると

$$
\sum_{i,j}r_j|\langle u_i,v_j\rangle|^2\log s_i
=\sum_jr_j\langle v_j,\log\sigma\,v_j\rangle
=\operatorname{Tr}\rho\log\sigma.
$$

直交基底の完全性だけを用い、共通固有基底は仮定しません。

<a id="ex-aqft30-b02"></a>
#### AQFT30-B02 別の非可換二状態の厳密値
- Level: B

$\rho=\operatorname{diag}(2/3,1/3)$、$\sigma=\begin{pmatrix}1/2&1/4\\1/4&1/2\end{pmatrix}$ とする。二状態の忠実性と非可換性を判定し、$S_{\mathrm A}(\rho\Vert\sigma)$ を自然対数で求めよ。

**詳細解答。** $\sigma$ の固有ベクトルは $(1,1)^{\mathsf T}/\sqrt2$ と $(1,-1)^{\mathsf T}/\sqrt2$、固有値は $3/4,1/4$ です。$\rho$ の固有値は $2/3,1/3$。すべて正、両行列のトレースは1です。交換子は

$$
[\rho,\sigma]=
\begin{pmatrix}0&1/12\\-1/12&0\end{pmatrix}\ne0.
$$

$\rho$ が対角で、$\sigma$ の両固有射影の対角成分は $1/2$ ですから

$$
\operatorname{Tr}(\rho\log\sigma)
=\frac12\left(\log\frac34+\log\frac14\right)
=\frac12\log\frac3{16}.
$$

他方、

$$
\operatorname{Tr}(\rho\log\rho)
=\frac23\log\frac23+\frac13\log\frac13
=\frac23\log2-\log3.
$$

[有限次元還元](#thm-aqft30-finite-reduction)で差を取り、

$$
S_{\mathrm A}(\rho\Vert\sigma)
=\frac83\log2-\frac32\log3
\approx0.200474.
$$

$\rho$ と $\sigma$ が可換でないにもかかわらず、固有射影の重なりを通じて正しい値が得られました。

<a id="ex-aqft30-b03"></a>
#### AQFT30-B03 同時ユニタリ変換
- Level: B

忠実な二状態 $\rho,\sigma$ とユニタリ $U$ に対し、$S_{\mathrm A}(U\rho U^*\Vert U\sigma U^*)=S_{\mathrm A}(\rho\Vert\sigma)$ を、対数の固有射影表示から導け。片方の状態だけを変換してよいか判定せよ。

**詳細解答。** $\tau=\sum_k t_kP_k$（$t_k>0$）なら $U\tau U^*=\sum_k t_kUP_kU^*$ です。従って

$$
\log(U\tau U^*)=\sum_k(\log t_k)UP_kU^*=U(\log\tau)U^*.
$$

これを $\tau=\rho$ と $\tau=\sigma$ にそれぞれ適用し、[還元定理](#thm-aqft30-finite-reduction)で

$$
\begin{aligned}
S_{\mathrm A}(U\rho U^*\Vert U\sigma U^*)
&=\operatorname{Tr}(U\rho(\log\rho-\log\sigma)U^*)\\
&=\operatorname{Tr}\rho(\log\rho-\log\sigma).
\end{aligned}
$$

片方だけ変えれば一般には不変ではありません。例えば $\rho=\sigma=\operatorname{diag}(3/4,1/4)$ なら元の値は0ですが、$\rho$ のみを交換行列で共役すると、$\rho'=\operatorname{diag}(1/4,3/4)$ です。直接

$$
S_{\mathrm A}(\rho'\Vert\sigma)
=\frac14\log\frac{1/4}{3/4}
+\frac34\log\frac{3/4}{1/4}
=\frac12\log3>0.
$$

<a id="ex-aqft30-b04"></a>
#### AQFT30-B04 積状態の対数
- Level: B

有限次元の忠実状態 $\rho_A,\sigma_A,\rho_B,\sigma_B$ に対し、$\log(\rho_A\otimes\rho_B)=(\log\rho_A)\otimes I_B+I_A\otimes(\log\rho_B)$ を固有分解から導き、相対エントロピーの加法性を示せ。

**詳細解答。** $\rho_A=\sum_i a_iP_i$、$\rho_B=\sum_j b_jQ_j$ とすると、$P_i\otimes Q_j$ は積状態の固有射影で固有値は $a_ib_j>0$。そのため

$$
\begin{aligned}
\log(\rho_A\otimes\rho_B)
&=\sum_{i,j}\log(a_ib_j)P_i\otimes Q_j\\
&=\sum_i(\log a_i)P_i\otimes\sum_jQ_j
+\sum_iP_i\otimes\sum_j(\log b_j)Q_j\\
&=(\log\rho_A)\otimes I_B+I_A\otimes(\log\rho_B).
\end{aligned}
$$

$\sigma_A\otimes\sigma_B$ でも同様に固有分解を行い、二つの対数の差を作ります。[還元定理](#thm-aqft30-finite-reduction)へ代入すると

$$
\begin{aligned}
S_{\mathrm A}(\rho_A\otimes\rho_B\Vert\sigma_A\otimes\sigma_B)
&=\operatorname{Tr}[\rho_A(\log\rho_A-\log\sigma_A)]\operatorname{Tr}\rho_B\\
&\quad+\operatorname{Tr}\rho_A\operatorname{Tr}[\rho_B(\log\rho_B-\log\sigma_B)].
\end{aligned}
$$

両トレースが1だから二つの相対エントロピーの和です。これは積状態に限定した結果です。

### Level C：複数の計算経路を照合する

<a id="ex-aqft30-c01"></a>
#### AQFT30-C01 同じ非可換二状態の双方向比較
- Level: C

第4節の次の二状態について問いに答えよ。

$$
\rho=\operatorname{diag}(3/4,1/4),
\qquad \sigma=\begin{pmatrix}1/2&-1/6\\-1/6&1/2\end{pmatrix}.
$$

1. 相対作用素 $\Delta_{\sigma\mid\rho}$ の全固有値と $\rho^{1/2}$ に関する重みを求めよ。
2. そこから $S_{\mathrm A}(\rho\Vert\sigma)$ を求めよ。
3. 添字と入力ベクトルの両方を交換した $S_{\mathrm A}(\sigma\Vert\rho)$ を求め、二値が等しいか判定せよ。

**詳細解答。** (1) $\rho$ の固有値 $r_1=3/4,r_2=1/4$ と $\sigma$ の固有値 $s_1=2/3,s_2=1/3$ を別々の基底に対応させると、[相対作用素の混合固有基底とスペクトル重み](#lem-aqft30-mixed-spectrum)から固有値は $8/9,8/3,4/9,4/3$。重みは $\rho^{1/2}$ の展開係数の二乗なので $3/8,1/8,3/8,1/8$ です。

(2) 固有値の対数を各重みで平均すると

$$
\begin{aligned}
S_{\mathrm A}(\rho\Vert\sigma)
&=-\frac38\log\frac89-\frac18\log\frac83
-\frac38\log\frac49-\frac18\log\frac43\\
&=\frac74\log3-\frac52\log2
\approx0.189704.
\end{aligned}
$$

(3) 交換後は $\sigma$ が入力側です。[還元定理](#thm-aqft30-finite-reduction)から

$$
S_{\mathrm A}(\sigma\Vert\rho)
=\operatorname{Tr}\sigma\log\sigma-\operatorname{Tr}\sigma\log\rho.
$$

前者は $\sigma$ の固有値から

$$
\operatorname{Tr}\sigma\log\sigma
=\frac23\log\frac23+\frac13\log\frac13
=\frac23\log2-\log3.
$$

後者では $\sigma$ の対角成分がどちらも $1/2$ だから

$$
\operatorname{Tr}\sigma\log\rho
=\frac12\log\frac34+\frac12\log\frac14
=\frac12\log3-2\log2.
$$

従って

$$
S_{\mathrm A}(\sigma\Vert\rho)
=\frac83\log2-\frac32\log3
\approx0.200474.
$$

両者は異なります。単に $\Delta_{\sigma\mid\rho}^{-1}$ を元の入力ベクトルで平均する計算は、定義上の逆順相対エントロピーではありません。

<a id="ex-aqft30-c02"></a>
#### AQFT30-C02 積状態と一方の系を忘れる操作
- Level: C

二つの二準位系 $A,B$ に対し

$$
\begin{aligned}
\rho_A&=\operatorname{diag}(3/4,1/4),&
\sigma_A&=I_2/2,\\
\rho_B&=\operatorname{diag}(2/3,1/3),&
\sigma_B&=\operatorname{diag}(1/3,2/3)
\end{aligned}
$$

とし、$\rho_{AB}=\rho_A\otimes\rho_B$、$\sigma_{AB}=\sigma_A\otimes\sigma_B$ とする。

1. 両積状態の忠実性を確認せよ。
2. $S_{\mathrm A}(\rho_{AB}\Vert\sigma_{AB})$ を求めよ。
3. $B$ を部分トレースした後の相対エントロピーと差を計算し、この例で失われる情報量を示せ。

**詳細解答。** (1) 各密度行列の固有値は問題文に書いた二つの正数で合計1です。積状態の固有値はそれらの積なので、4個とも正、トレースも $1\cdot1=1$ で、両積状態は忠実です。

(2) $A$ 系は[A01](#ex-aqft30-a01)の計算により

$$
S_{\mathrm A}(\rho_A\Vert\sigma_A)=\frac34\log3-\log2.
$$

$B$ 系では

$$
\begin{aligned}
S_{\mathrm A}(\rho_B\Vert\sigma_B)
&=\frac23\log\frac{2/3}{1/3}
+\frac13\log\frac{1/3}{2/3}\\
&=\frac23\log2-\frac13\log2
=\frac13\log2.
\end{aligned}
$$

[積状態の加法性](#prop-aqft30-unitary-product)を、二つの忠実な二準位系に適用し、

$$
S_{\mathrm A}(\rho_{AB}\Vert\sigma_{AB})
=\frac34\log3-\frac23\log2.
$$

(3) [部分トレースの定義](../../../応用系/QINF/QINF3/index.md#def-qinf3-partial-trace)を $B$ の正規直交基底 $(f_j)$ で用いると、任意の積行列に対して

$$
\begin{aligned}
\operatorname{Tr}_B(X\otimes Y)
&=\sum_j(I_A\otimes\langle f_j|)(X\otimes Y)
(I_A\otimes|f_j\rangle)\\
&=X\sum_j\langle f_j,Yf_j\rangle
=X\operatorname{Tr}Y.
\end{aligned}
$$

両方の $B$ 側の密度行列のトレースは1なので、$\operatorname{Tr}_B\rho_{AB}=\rho_A$、$\operatorname{Tr}_B\sigma_{AB}=\sigma_A$ です。従って残る値は $\frac34\log3-\log2$、差は

$$
S_{\mathrm A}(\rho_{AB}\Vert\sigma_{AB})
-S_{\mathrm A}(\rho_A\Vert\sigma_A)
=\frac13\log2>0.
$$

この具体的な積状態では $B$ の寄与が消えます。ただし**任意のType III部分環に対する単調性の証明ではありません**。その一般定理はAQFT33の課題です。

## 8. この講義で得た橋

有限次元では、混合固有基底の重み $r_j|\langle u_i,v_j\rangle|^2$ が、相対モジュラー作用素の対数の期待値を二つの密度行列対数のトレース差に変えます。この式が非可換状態でも成立することを確認しました。一般環で残すのは**相対作用素とそのスペクトル積分による定義**であり、有限次元固有値表や部分トレースを局所Type III環へ持ち込むことではありません。

次のAQFT31では、忠実性を失ったときの支持射影・零固有値・無限大を整理します。
