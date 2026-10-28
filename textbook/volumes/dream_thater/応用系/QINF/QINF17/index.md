# QINF17 von Neumannエントロピー

## 1. 局所状態の混合を一つの数で表す

[QINF2の密度演算子](../QINF2/index.md#def-qinf2-ensemble-density)は、純粋な状態ベクトルと統計的に混合した状態を同じ枠組みで扱えます。[QINF3の部分トレース](../QINF3/index.md#def-qinf3-partial-trace)によって、全体が純粋なBell対でも、片側だけを見ると混合状態になることも分かりました。しかし、密度行列を二つ渡されたとき、**どちらの混合が大きいか**を一つの量で比較する方法はまだありません。

古典確率分布には[INFO1のShannonエントロピー](../../INFO/INFO1/index.md#def-info1-entropy)があります。量子状態では任意の基底での対角成分を確率と見なすと、基底の選び方で値が変わってしまいます。そこで、基底によらず定まる密度演算子の**固有値**を確率分布として読み取り、Shannonエントロピーを適用します。この方法なら純粋性・最大混合・部分系の混合を統一して計算できます。

本章では有限次元複素Hilbert空間 $H$（次元 $d\ge1$）を用い、状態 $\rho$ は $\rho\ge0$、$\operatorname{Tr}\rho=1$ を満たすものとします。対数は特に断らない限り底2で、値の単位はビットです。零固有値を含む場合も常に扱います。

## 2. 固有値から定義する

有限次元のHermitian行列は正規直交固有基底を持つので、密度演算子は

$$
\rho=\sum_{i=1}^d\lambda_i|i\rangle\langle i|,
\qquad \lambda_i\ge0,\qquad\sum_{i=1}^d\lambda_i=1
$$

と書けます。これは[密度演算子のスペクトル分解とアンサンブルの同値](../QINF2/index.md#thm-qinf2-density-ensemble)にも現れた確率ベクトルです。$\lambda_i=0$ なら対数自体は定義されませんが、情報量の式で現れるのは積 $\lambda_i\log_2\lambda_i$ です。

零の寄与を極限で決めます。$0<x\le1$ に対して $t=1/x\ge1$ とおくと、$\ln t=\int_1^t ds/s\le 2(\sqrt t-1)$ です。したがって

$$
0\le -x\log_2x=\frac{\ln t}{t\ln2}
\le\frac{2}{\sqrt t\ln2}\longrightarrow0
\qquad(x\downarrow0).
$$

この極限を使えば、正の固有値だけを和に入れることと、零固有値を0として足すことが一致します。

<a id="def-qinf17-entropy"></a>

<!-- formal-statement-start -->
> **定義（von Neumannエントロピー）**
> 有限次元複素Hilbert空間上の密度演算子 $\rho$ の固有値を、重複度を込めて $\lambda_1,\ldots,\lambda_d$ とする。$0\log_2 0:=0$ と約束し、**von Neumannエントロピー**を

$$
S(\rho):=-\sum_{i=1}^d\lambda_i\log_2\lambda_i
=-\operatorname{Tr}(\rho\log_2\rho)
$$

> と定める。右端の行列式は、固有値 $x$ に対して $x\log_2x$（$x=0$ では0）を作用させた行列のトレースを意味し、零固有空間上で $\log_2\rho$ 単独を定義するという意味ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf17-entropy -->
### 定義の確認：零固有値のある三準位状態

**定義の確認**として、$\rho=\operatorname{diag}(1/2,1/2,0)$ を考えます。各対角成分は非負、和は1で、対角行列はHermitianなので密度演算子の条件を満たします。固有値もその三成分であり、最後の零の寄与は定義によって0です。

$$
S(\rho)=-\frac12\log_2\frac12
-\frac12\log_2\frac12-0=1.
$$

三準位だから必ず $\log_2 3$ になるわけではありません。実際に非零な固有値が二つしかないことを値が反映しています。
<!-- definition-example-end -->

同じ密度演算子を別の正規直交基底で表すと一般に非対角行列になりますが、固有値の**重複度込みの集合**は変わりません。したがってエントロピーは表示基底に依存しません。対角成分だけを使って $-\sum_i\rho_{ii}\log_2\rho_{ii}$ と計算するのは、固有基底以外では別の量です。

## 3. どこまで小さく、大きくなれるか

固有値は非負で和1なので、エントロピーは確率分布のエントロピーと同様の上下限を持つはずです。ただし「最大混合」という言葉だけでは等号条件は分かりません。純粋状態との違いをrankと固有値から証明します。

<a id="thm-qinf17-entropy-bounds"></a>

<!-- formal-statement-start -->
> **定理（von Neumannエントロピーの上下限と等号条件）**
> 次元 $d\ge1$ の有限次元複素Hilbert空間上の密度演算子 $\rho$ について

$$
0\le S(\rho)\le\log_2 d.
$$

> 左の等号は $\rho$ がrank 1の純粋状態のとき、かつそのときに限る。右の等号は $\rho=I_d/d$ のとき、かつそのときに限る。さらに $r=\operatorname{rank}\rho$ とすると

$$
S(\rho)\le\log_2 r,
$$

> その等号は $r$ 個の正の固有値がすべて $1/r$ のとき、かつそのときに限る。
<!-- formal-statement-end -->

### 証明の見取り図

固有値は確率分布です。各項 $-x\log_2 x$ は非負で、$0<x<1$ なら正です。上限では関数の**厳密な凹性**により、同じ合計を配分するなら全成分が等しいときが最大になります。この理由を零固有値まで含めて確認します。

<!-- proof-start -->
### 証明

$f(0)=0$、$f(x)=-x\log_2x$（$0<x\le1$）と置きます。区間 $[0,1]$ 上で $f(x)\ge0$ であり、零点は $x=0,1$ だけです。$S(\rho)=\sum_i f(\lambda_i)=0$ なら各項が0、従って各固有値は0か1です。和が1なので1が一個、他は0であり、rank 1です。逆も直ちに成り立ちます。これは[純粋性とrankの同値](../QINF2/index.md#thm-qinf2-purity-rank)とも一致します。

次に $0<x<1$ に対して

$$
f''(x)=-\frac{1}{x\ln2}<0
$$

なので $f$ は正の区間で厳密に凹です。零を含む線分でも、$0<t<1$、$y>0$ に対し

$$
f(ty+(1-t)0)=t f(y)-ty\log_2t>tf(y)+(1-t)f(0)
$$

となるため、$[0,1]$ 全体で厳密な凹性が保たれます。有限個の値への凹性不等式を、各成分の重み $1/d$ に適用して

$$
\frac1d\sum_{i=1}^d f(\lambda_i)
\le f\!\left(\frac1d\sum_{i=1}^d\lambda_i\right)
=f(1/d)=\frac{\log_2d}{d}.
$$

よって $S(\rho)\le\log_2d$。$d\ge2$ では厳密凹性の等号条件から $\lambda_i=1/d$ がすべての $i$ で成立します。スペクトル分解に戻すと $\rho=\sum_i(1/d)|i\rangle\langle i|=I_d/d$ です。$d=1$ は唯一の密度演算子 $I_1$ で両等号が成立します。

最後に正の固有値だけを $r$ 個取り、上の議論で $d$ を $r$ に置き換えれば $S(\rho)\le\log_2r$ となります。等号条件も同様に、正の固有値がすべて $1/r$ であることです。$\square$
<!-- proof-end -->

例えば $\operatorname{diag}(1/2,1/2,0)$ はrank 2で $S=\log_2 2=1$ を達成しますが、三次元全体の上限 $\log_2 3$ には届きません。逆に $I_3/3$ なら三つの固有値が同じで $S=\log_2 3$ です。

## 4. 状態を回しても、独立な系を合わせても

基底の変更や時間発展で状態をユニタリ共役しても、混合の度合いそのものは変わってほしくありません。一方、相互作用のない独立な二つの系を合わせた場合、古典情報量と同じく足し算になることが期待されます。この二つは、いずれも固有値を実際に追えば確かめられます。

<a id="prop-qinf17-unitary"></a>

<!-- formal-statement-start -->
> **命題（ユニタリ共役に対するエントロピー不変性）**
> 有限次元の密度演算子 $\rho$ と同じ空間上のユニタリ作用素 $U$ に対し、$U\rho U^\dagger$ も密度演算子であり、

$$
S(U\rho U^\dagger)=S(\rho)
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

固有ベクトルを $U$ で送れば、固有値とその重複度は保存されます。したがって同じ関数 $f$ を同じ固有値へ足します。

<!-- proof-start -->
### 証明

$\rho|i\rangle=\lambda_i|i\rangle$ とすると、$U^\dagger U=I$ より

$$
(U\rho U^\dagger)(U|i\rangle)
=U\rho|i\rangle=\lambda_i(U|i\rangle).
$$

$U$ は正規直交基底を正規直交基底へ写すので、これで $U\rho U^\dagger$ の全固有値を重複度込みで列挙しました。固有値は非負、和は1で、Hermitian性も保存されるから密度演算子です。定義へ代入すると同じ和 $-\sum_i\lambda_i\log_2\lambda_i$ が得られます。$\square$
<!-- proof-end -->

<a id="prop-qinf17-tensor"></a>

<!-- formal-statement-start -->
> **命題（テンソル積状態のエントロピー加法性）**
> 有限次元の密度演算子 $\rho_A$ と $\sigma_B$ に対して、その積状態 $\rho_A\otimes\sigma_B$ は密度演算子であり、

$$
S(\rho_A\otimes\sigma_B)=S(\rho_A)+S(\sigma_B)
$$

> が成り立つ。零固有値を持つ場合も同じである。
<!-- formal-statement-end -->

### 証明の見取り図

積基底での固有値は各系の固有値の積です。正の項では積の対数を和に分解し、零の項は定義により0として分けます。

<!-- proof-start -->
### 証明

$\rho_A=\sum_i p_i|i\rangle\langle i|$、$\sigma_B=\sum_jq_j|j\rangle\langle j|$ と書けば、$|i\rangle\otimes|j\rangle$ は直積の正規直交基底で、

$$
(\rho_A\otimes\sigma_B)(|i\rangle\otimes|j\rangle)
=p_iq_j(|i\rangle\otimes|j\rangle).
$$

従って積の固有値は $p_iq_j\ge0$ で、総和は $(\sum_i p_i)(\sum_jq_j)=1$。正の $p_i,q_j$ に限って対数を展開すると

$$
\begin{aligned}
S(\rho_A\otimes\sigma_B)
&=-\sum_{i:p_i>0}\sum_{j:q_j>0}p_iq_j\log_2(p_iq_j)\\
&=-\sum_{i:p_i>0}p_i\log_2p_i\sum_{j:q_j>0}q_j
-\sum_{j:q_j>0}q_j\log_2q_j\sum_{i:p_i>0}p_i\\
&=S(\rho_A)+S(\sigma_B).
\end{aligned}
$$

省いた項はすべて $p_iq_j=0$ で、その寄与は規約により0です。各正成分の和は1なので最後の等号が成立します。$\square$
<!-- proof-end -->

この加法性は**積状態という仮定があるときの命題**です。相関を持つ一般の $\rho_{AB}$ について $S(\rho_{AB})=S(\rho_A)+S(\rho_B)$ と置いてはいけません。実際、後のBell対が反例になります。

## 5. 古典確率との接続：対角状態と二値エントロピー

古典的な確率 $p_i$ を正規直交基底のベクトル $|i\rangle$ の統計的混合として準備したとき、密度行列は $\rho=\sum_i p_i|i\rangle\langle i|$ です。対角成分がそのまま固有値ですから、古典の式へ正確に戻ります。

<a id="prop-qinf17-classical"></a>

<!-- formal-statement-start -->
> **命題（古典対角状態とShannonエントロピー）**
> 有限確率ベクトル $p=(p_1,\ldots,p_d)$ と正規直交基底 $|i\rangle$ に対し、$\rho_p=\sum_i p_i|i\rangle\langle i|$ とすると

$$
S(\rho_p)=H(p):=-\sum_i p_i\log_2p_i
$$

> である。右端は[Shannonエントロピー](../../INFO/INFO1/index.md#def-info1-entropy)で、双方とも零項の寄与を0とする。
<!-- formal-statement-end -->

### 対角qubitを使った計算

$\rho_p=\operatorname{diag}(p,1-p)$（$0\le p\le1$）は正値・トレース1であり、固有値は $p,1-p$ です。よって

$$
S(\rho_p)=h_2(p):=-p\log_2p-(1-p)\log_2(1-p).
$$

$p=0,1$ のとき $h_2(p)=0$、$p=1/2$ では $h_2(p)=1$。中間では例えば $p=1/4$ のとき

$$
h_2(1/4)=2-\frac34\log_2 3.
$$

二つの状態 $|0\rangle,|1\rangle$ に偏りなく準備する場合ほど混合が大きいことが分かります。

ただし、**任意の基底で測定した結果のShannonエントロピー**が常に $S(\rho)$ に等しいわけではありません。例えば純粋状態 $|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$ は固有値 $(1,0)$ で $S=0$ ですが、計算基底での測定結果は $(1/2,1/2)$ でShannonエントロピー1です。測定結果のランダムさと密度演算子自体の混合は別です。

## 6. Bell対の全体と片側：エントロピーはどこにあるか

純粋な二部状態は全体ではrank 1です。しかし[Schmidt分解](../QINF6/index.md#thm-qinf6-existence)によると、片側を縮約すると一般には複数の正の固有値が現れます。これが「純粋な全体の一部にエントロピーがある」ことを数値で理解する最短の道です。

<a id="prop-qinf17-bipartite"></a>

<!-- formal-statement-start -->
> **命題（純粋二部状態の縮約エントロピーの一致）**
> 有限次元 $H_A\otimes H_B$ の単位ベクトル $|\psi\rangle$ に対し、$\rho_{AB}=|\psi\rangle\langle\psi|$、$\rho_A=\operatorname{Tr}_B\rho_{AB}$、$\rho_B=\operatorname{Tr}_A\rho_{AB}$ とする。このとき

$$
S(\rho_{AB})=0,\qquad S(\rho_A)=S(\rho_B).
$$

> Schmidt係数を $s_1,\ldots,s_r>0$ とすれば、両側の値は $-\sum_{i=1}^r s_i^2\log_2s_i^2$ である。
<!-- formal-statement-end -->

### 証明の見取り図

全体系はrank 1です。片側の二つの縮約は、次元が違ってもSchmidt係数の二乗という**共通の正の固有値**を持ちます。異なる数だけ付け足される零固有値はエントロピーを変えません。

<!-- proof-start -->
### 証明

$\rho_{AB}$ は正規化ベクトルへの射影なので固有値は1が一個、残りが0です。[エントロピー上下限定理](#thm-qinf17-entropy-bounds)の下側等号条件から $S(\rho_{AB})=0$。

[両側縮約の非零固有値の一致](../QINF6/index.md#thm-qinf6-reduced-spectrum)を適用すると、正規直交するSchmidtベクトル $|u_i\rangle,|v_i\rangle$ について

$$
\rho_A=\sum_{i=1}^r s_i^2|u_i\rangle\langle u_i|,
\qquad\rho_B=\sum_{i=1}^r s_i^2|v_i\rangle\langle v_i|,
\quad\sum_i s_i^2=1.
$$

各縮約は正の固有値 $s_i^2$ を全て同じ重複度で持ち、その他は零です。定義に代入すれば、両側とも同じ和 $-\sum_i s_i^2\log_2s_i^2$ が得られます。$\square$
<!-- proof-end -->

### Bell対と古典相関を並べる

正規化Bell状態 $|\Phi^+\rangle=(|00\rangle+|11\rangle)/\sqrt2$ では、[部分トレースの計算](../QINF3/index.md#def-qinf3-partial-trace)より両側の縮約は $I_2/2$ です。従って

$$
S(|\Phi^+\rangle\langle\Phi^+|)=0,
\qquad S(\rho_A)=S(\rho_B)=1.
$$

これに対し、古典的に完全相関した混合状態

$$
\omega_{AB}=\frac12|00\rangle\langle00|
+\frac12|11\rangle\langle11|
$$

の固有値は $(1/2,1/2,0,0)$ です。縮約は同じく双方 $I_2/2$ でも、$S(\omega_{AB})=1$ です。片側の数値だけで全体が純粋か混合かは決まりません。

また $|00\rangle$ のような積純粋状態では全体・両側の三つのエントロピーはいずれも0です。Bell対の $0\ne1+1$ は、前節の加法性を相関状態へ拡張できない明白な反例です。

## 7. ばらつきを比べるmajorizationとの関係

二つの固有値列の「偏り」を比較したいとき、[QINF14のmajorization](../QINF14/index.md#def-qinf14-majorization)を利用できます。$x\prec y$ は、$x$ が $y$ の並べ替えを混合して得られる、より平らな確率列であることを意味します。エントロピーがこの混合操作で減らないことを確かめましょう。

<a id="prop-qinf17-majorization"></a>

<!-- formal-statement-start -->
> **命題（majorizationによるエントロピーの単調性）**
> 同じ長さ $d$ の確率ベクトル $x,y$ が $x\prec y$ を満たすとき、対応する対角密度演算子 $\rho_x,\rho_y$ について

$$
S(\rho_x)\ge S(\rho_y)
$$

> が成り立つ。任意の二つの密度演算子の固有値を零も含めて同じ長さで比較する場合にも同じである。
<!-- formal-statement-end -->

### 証明の見取り図

majorizationを置換ベクトルの確率混合へ書き換え、凹関数 $f(t)=-t\log_2t$ に一成分ずつ凹性不等式を適用します。置換に関する二重和を交換すれば元のエントロピーになります。

<!-- proof-start -->
### 証明

[majorizationと置換混合の同値](../QINF14/index.md#lem-qinf14-permutation-mixture)によって、$x\prec y$ なら置換 $\pi_j$ と非負の重み $w_j$（$\sum_jw_j=1$）が存在して

$$
x_i=\sum_j w_j y_{\pi_j(i)}
$$

と書けます。第3節で示した $f$ の凹性から、零成分を含めて

$$
f(x_i)=f\!\left(\sum_jw_jy_{\pi_j(i)}\right)
\ge\sum_jw_j f(y_{\pi_j(i)}).
$$

$i$ で和を取り、各 $\pi_j$ は成分の置換であることを使えば

$$
S(\rho_x)=\sum_i f(x_i)
\ge\sum_jw_j\sum_i f(y_{\pi_j(i)})
=\sum_jw_jS(\rho_y)=S(\rho_y).
$$

任意の密度演算子でも、エントロピーは固有値列だけの関数なので同じ結論です。$\square$
<!-- proof-end -->

この命題は**majorizationからエントロピーの大小が従う**という一方向の主張です。三成分以上では固有値列がmajorizationで比較不能な場合もあり、エントロピーの大小だけからmajorizationを結論することはできません。

## 8. 演習：固有値・純粋性・相関を往復する

各問の詳細解答では、与えられた行列が密度演算子かを確認し、零固有値の扱いと等号条件を明示します。

<a id="ex-qinf17-a01"></a>
### QINF17-A01 三値確率の情報量

- Level: A

$\rho=\operatorname{diag}(1/2,1/4,1/4)$ のエントロピーを求め、次元上限およびrank上限と比較せよ。

<!-- solution-start -->
### 詳細解答

対角成分は非負で総和 $1/2+1/4+1/4=1$、従って密度演算子です。固有値は表示した三成分で、

$$
S(\rho)=-\frac12(-1)-2\cdot\frac14(-2)
=\frac12+1=\frac32.
$$

全成分が正なのでrankは3、上限は $\log_2 3$ です。$3/2<\log_2 3$ は $2^{3/2}=2\sqrt2<3$ から分かります。$\rho\ne I_3/3$ なので上限の等号にはなりません。
<!-- solution-end -->

<a id="ex-qinf17-a02"></a>
### QINF17-A02 零固有値とrank上限

- Level: A

$\sigma=\operatorname{diag}(0,1/2,0,1/2)$ のrank・エントロピー・四次元上限を求め、零項の扱いを説明せよ。

<!-- solution-start -->
### 詳細解答

各成分は非負、和は1なので密度演算子です。正の固有値は $1/2$ が二個でrank 2。零の二項は $0\log_2 0=0$ とするので、

$$
S(\sigma)=-2\cdot\frac12\log_2\frac12=1=\log_2 2.
$$

rank 2での上限には達しますが、四次元上限 $\log_2 4=2$ には達しません。零固有値の数を無視してrankを4と数えるのが誤りです。
<!-- solution-end -->

<a id="ex-qinf17-a03"></a>
### QINF17-A03 ユニタリで非対角にする

- Level: A

$D=\operatorname{diag}(3/4,1/4)$ と $U=2^{-1/2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}$ とする。$UDU^\dagger$ を求め、対角成分だけから求めた情報量との違いを示せ。

<!-- solution-start -->
### 詳細解答

$U$ は実対称で $U^\dagger U=I$ です。列をそれぞれ $u_1,u_2$ とすると

$$
UDU^\dagger=\frac34u_1u_1^\dagger+\frac14u_2u_2^\dagger
=\begin{pmatrix}1/2&1/4\\1/4&1/2\end{pmatrix}.
$$

元の $D$ の固有値は $3/4,1/4$ で、ユニタリ共役後も同じです。従って

$$
S(UDU^\dagger)=h_2(1/4)=2-\frac34\log_2 3<1.
$$

非対角行列の対角成分は $(1/2,1/2)$ なので、そこだけのShannonエントロピーは1ですが、これはvon Neumannエントロピーではありません。
<!-- solution-end -->

<a id="ex-qinf17-a04"></a>
### QINF17-A04 二値エントロピーの極値

- Level: A

$h_2(p)$ を $0\le p\le1$ で考える。$0<p<1$ で微分し、最大値と等号条件を求めよ。両端の値も確認せよ。

<!-- solution-start -->
### 詳細解答

$\log_2p=\ln p/\ln2$ を微分すると $d(\log_2p)/dp=1/(p\ln2)$ です。積の微分を二項へ適用すると

$$
h_2'(p)=-\log_2p-\frac1{\ln2}
+\log_2(1-p)+\frac1{\ln2}
=\log_2\frac{1-p}{p}.
$$

従って $p<1/2$ では正、$p>1/2$ では負で、唯一の内部最大点は $p=1/2$。値は $h_2(1/2)=1$ です。零項の極限規約から $h_2(0)=h_2(1)=0$ であり、両端は純粋状態の値です。
<!-- solution-end -->

<a id="ex-qinf17-a05"></a>
### QINF17-A05 Bell対と積純粋状態

- Level: A

$|\Phi^+\rangle=(|00\rangle+|11\rangle)/\sqrt2$ と $|00\rangle$ のそれぞれについて、全体のエントロピーと両側縮約のエントロピーを求めよ。

<!-- solution-start -->
### 詳細解答

両者はノルム1なので全体の密度演算子はrank 1の射影です。[上下限定理](#thm-qinf17-entropy-bounds)より全体のエントロピーは双方0です。

Bell対の射影を展開してBob側をトレースすると

$$
\rho_A=\frac12\operatorname{Tr}_B
(|00\rangle\langle00|+|00\rangle\langle11|
+|11\rangle\langle00|+|11\rangle\langle11|)
=I_2/2.
$$

交差項は $\langle1|0\rangle=0$ により消えます。Alice側をトレースしても同じで、双方のエントロピーは1です。$|00\rangle$ は積状態なので縮約は $|0\rangle\langle0|$、両側ともrank 1でエントロピー0です。
<!-- solution-end -->

<a id="ex-qinf17-b01"></a>
### QINF17-B01 独立な二つの混合を合わせる

- Level: B

$\rho=\operatorname{diag}(3/4,1/4)$、$\sigma=I_2/2$ とする。$\rho\otimes\sigma$ の固有値をすべて列挙し、加法性を直接計算で確かめよ。

<!-- solution-start -->
### 詳細解答

各因子は正値・トレース1の対角行列なので、テンソル積は積基底において対角行列になります。四つの固有値は $3/8,3/8,1/8,1/8$ で、総和1です。

$$
\begin{aligned}
S(\rho\otimes\sigma)
&=-2\cdot\frac38\log_2\frac38
-2\cdot\frac18\log_2\frac18\\
&=-\frac34(\log_2 3-3)+\frac34
=3-\frac34\log_2 3.
\end{aligned}
$$

一方、$S(\rho)=2-\frac34\log_2 3$、$S(\sigma)=1$ なので和は同じです。四つの固有値を単に足すだけではなく、その積の対数を使うことが加法性の理由です。
<!-- solution-end -->

<a id="ex-qinf17-b02"></a>
### QINF17-B02 majorizationとエントロピーの方向

- Level: B

$x=(1/2,1/2,0)$、$y=(3/4,1/4,0)$ とする。$x\prec y$ を部分和で検査し、置換混合を一つ構成し、エントロピーの大小を確かめよ。

<!-- solution-start -->
### 詳細解答

二つとも降順・非負・総和1です。第一部分和は $1/2\le3/4$、第二部分和は $1=1$、第三部分和も1なので、[確率ベクトルの優越関係・majorization](../QINF14/index.md#def-qinf14-majorization)により $x\prec y$ です。

第一・第二成分の交換を $P$ とすると

$$
\frac12 y+\frac12 Py
=\frac12(3/4,1/4,0)+\frac12(1/4,3/4,0)
=(1/2,1/2,0)=x.
$$

$S(\rho_x)=1$、$S(\rho_y)=h_2(1/4)=2-\frac34\log_2 3<1$。従って平らな方がエントロピーは大きく、[majorization単調性](#prop-qinf17-majorization)の向きと一致します。
<!-- solution-end -->

<a id="ex-qinf17-b03"></a>
### QINF17-B03 同じ局所状態、異なる全体

- Level: B

$\omega_{AB}=\frac12|00\rangle\langle00|+\frac12|11\rangle\langle11|$ と $\tau_{AB}=|\Phi^+\rangle\langle\Phi^+|$ を比べる。二つの全体状態と双方の縮約についてrank・エントロピーをすべて求め、なぜ積状態の加法性を適用できないか説明せよ。

<!-- solution-start -->
### 詳細解答

$\omega$ は直交射影二個の確率混合で、スペクトルは $(1/2,1/2,0,0)$、rank 2、$S(\omega)=1$ です。$\tau$ はノルム1のベクトルへの射影なのでスペクトル $(1,0,0,0)$、rank 1、$S(\tau)=0$ です。

各々の部分トレースでは、$|00\rangle\langle11|$ のような交差項は $\langle1|0\rangle=0$ で消えるため、両状態とも $\rho_A=\rho_B=I_2/2$ です。各縮約はrank 2、$S_A=S_B=1$。積状態なら $S_{AB}=S_A+S_B=2$ ですが、実際はそれぞれ1と0なので両状態とも積ではありません。局所エントロピーだけで全体状態は決まりません。
<!-- solution-end -->

<a id="ex-qinf17-b04"></a>
### QINF17-B04 非対角qubit族の混合の変化

- Level: B

$0\le t\le1$ に対して $\rho_t=\frac12\begin{pmatrix}1&t\\t&1\end{pmatrix}$ とする。密度演算子の条件と固有値を確認し、$S(\rho_t)$ が $t$ とともにどう変わるかを示せ。端点ではrankを求めよ。

<!-- solution-start -->
### 詳細解答

$\rho_t$ は実対称でトレース1です。$|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$ と $|-\rangle=(|0\rangle-|1\rangle)/\sqrt2$ を作用させると、

$$
\rho_t|+\rangle=\frac{1+t}{2}|+\rangle,
\qquad\rho_t|-\rangle=\frac{1-t}{2}|-\rangle.
$$

$0\le t\le1$ で両固有値は非負なので、確かに密度演算子です。エントロピーは $S(\rho_t)=h_2((1+t)/2)$。A04で得た $h_2'(u)=\log_2((1-u)/u)$ に $u=(1+t)/2$ を代入して連鎖律を使うと、$0<t<1$ では

$$
\frac{d}{dt}S(\rho_t)
=\frac12\log_2\frac{1-t}{1+t}<0.
$$

$t=0$ では固有値 $(1/2,1/2)$ でrank 2、$S=1$。$t=1$ では $(1,0)$ でrank 1、$S=0$。非対角成分が増えるこの族では純粋性が増し、エントロピーが減ります。
<!-- solution-end -->

<a id="ex-qinf17-c01"></a>
### QINF17-C01 三部純粋状態の縮約と古典相関

- Level: C

$0\le p\le1$ とし、三qubitの状態を

$$
|\Psi_p\rangle=\sqrt p\,|000\rangle
+\sqrt{1-p}\,|111\rangle
$$

とする。

1. 正規化を確認し、全体 $ABC$ のエントロピーを求めよ。
2. $\rho_A$、$\rho_B$、$\rho_C$ と二部縮約 $\rho_{AB}$、$\rho_{AC}$、$\rho_{BC}$ を部分トレースで導出し、全てのエントロピーを求めよ。
3. 二部縮約が純粋な二部状態 $|\phi_p\rangle=\sqrt p|00\rangle+\sqrt{1-p}|11\rangle$ の射影とどう違うか説明せよ。$p=0,1,1/2$ を明示して、加法性の適用条件も検討せよ。

<!-- solution-start -->
### 詳細解答

**（1）** $\langle000|111\rangle=0$ であり、$\|\Psi_p\|^2=p+(1-p)=1$。従って $\rho_{ABC}=|\Psi_p\rangle\langle\Psi_p|$ はrank 1で、$S(\rho_{ABC})=0$ です。

**（2）** 射影を四項へ展開すると

$$
\begin{aligned}
\rho_{ABC}={}&p|000\rangle\langle000|
+\sqrt{p(1-p)}|000\rangle\langle111|\\
&+\sqrt{p(1-p)}|111\rangle\langle000|
+(1-p)|111\rangle\langle111|.
\end{aligned}
$$

$C$ をトレースすると交差項は $\operatorname{Tr}(|0\rangle\langle1|)=\langle1|0\rangle=0$ で消え、

$$
\rho_{AB}=p|00\rangle\langle00|+(1-p)|11\rangle\langle11|.
$$

$A,B,C$ のラベルを入れ替えても状態の形は同じなので、$\rho_{AC},\rho_{BC}$ も対応する計算基底で同形です。さらに片側をトレースすると

$$
\rho_A=\rho_B=\rho_C
=p|0\rangle\langle0|+(1-p)|1\rangle\langle1|.
$$

一部縮約の固有値は $(p,1-p)$、二部縮約は $(p,1-p,0,0)$ です。従って六つの縮約はすべて同じ値

$$
S_A=S_B=S_C=S_{AB}=S_{AC}=S_{BC}=h_2(p)
$$

を持ちます。$p=0,1$ ではこの値は0、$p=1/2$ では1です。

**（3）** $|\phi_p\rangle\langle\phi_p|$ には、$0<p<1$ のとき

$$
\sqrt{p(1-p)}\left(|00\rangle\langle11|+|11\rangle\langle00|\right)
$$

という交差項が存在します。三部状態から $C$ を消した $\rho_{AB}$ ではその項が消えるので、全体のエントロピーは前者で0、後者で $h_2(p)>0$ です。ただし両者の単体縮約は同じ対角状態で、どちらも $S_A=S_B=h_2(p)$ です。

$p=0,1$ では交差項は0で、どちらも積純粋状態になります。$p=1/2$ では前者はBell純粋状態で $S_{AB}=0$、後者は古典相関混合で $S_{AB}=1$。$0<p<1$ のとき、$h_2(p)>0$ に対して $S_{AB}=h_2(p)\ne2h_2(p)=S_A+S_B$ なので、$\rho_{AB}$ に[積状態の加法性](#prop-qinf17-tensor)を適用することはできません。
<!-- solution-end -->

## 9. まとめと次の問い

- 密度演算子の**固有値**を確率分布として使い、零項を $0\log_2 0=0$ と定めることで $S(\rho)$ が得られます。基底を変えても値は変わりません。
- rank 1なら $S=0$、全次元で均等なら $S=\log_2 d$。rank $r$ の状態ならより鋭い上限 $\log_2 r$ を持ちます。
- 積状態には $S(\rho\otimes\sigma)=S(\rho)+S(\sigma)$ が成立しますが、相関状態にこの等式を使ってはいけません。
- 純粋二部状態の全体は $S_{AB}=0$ でも、両側縮約は同じ正の固有値を持ち $S_A=S_B$。Bell対と古典相関混合を区別できます。

次のQINF18では、全体と部分系のエントロピーを比較する**条件付きエントロピー・相互情報量**を導入します。古典の場合と異なって条件付きエントロピーが負になり得る理由を、ここで計算したBell対から考え始めます。
