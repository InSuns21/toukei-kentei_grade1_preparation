# ATOP31 cup積とコホモロジー環

[特異コホモロジー群](../ATOP28/index.md#def-atop28-cohomology) は次数ごとの加法を与え、[有限型コホモロジーのKünneth公式](../ATOP30/index.md#thm-atop30-kunneth-cohomology) は積空間の群を計算する道具でした。しかし、同じ加法群を持つ空間でも、異なる次数の類が互いにどのように関係するかは群だけからは分かりません。今回は二つの評価を一つの評価に組み合わせ、コホモロジーに積を入れます。次講ではこの積が空間の違いを検出することを確かめます。

## 1. 単体を前面と後面に分ける

係数は単位元を持つ[可換環](../../../代数系/RNG/RNG1/index.md#def-rng1-ring) $R$ とします。例えば整数環や有限体を選べます。[特異コチェイン](../ATOP28/index.md#def-atop28-cochain) の係数群を $R$ の加法群としたものを $C^n(X;R)$ と書きます。各次数の[特異鎖群](../ATOP16/index.md#def-atop16-singular-chains)の基底は特異単体です。基底上に指定した値を整数線形に延長することで、任意の鎖を評価できます。負次数は零とします。以下では鎖を $R$ 係数にしても同じコチェインが得られることを使います。実際、各基底上に任意の $R$ の元を指定する自由度は同じで、$R$ 線形への延長と整数係数鎖への制限が互いに逆です。

[特異 $n$ 単体](../ATOP16/index.md#def-atop16-singular-simplex) $\sigma$ の頂点番号を $0,\ldots,n$ とします。$\sigma[i_0,\ldots,i_k]$ は標準 $k$ 単体の頂点を順に指定頂点へ送るアフィン写像と $\sigma$ の合成です。二つのコチェインの次数を $p,q$ とすると、$n=p+q$ 次の単体を、頂点 $p$ を共有する二つの面に分ければ、それぞれを評価できます。例えば $p=q=1$ では三角形の二辺を使います。

$$
0\xrightarrow{\text{前面}}1\xrightarrow{\text{後面}}2
$$

各点を同じ点の対に送る連続写像を対角写像と呼び、標準単体の記号と区別して $\Delta:X\to X\times X$、$\Delta(x)=(x,x)$ と書きます。[特異鎖の誘導準同型](../ATOP16/index.md#def-atop16-induced-chain-map)を $\Delta_\#$ とすれば、$\Delta_\#\sigma=(\sigma,\sigma)$ です。

[Alexander–Whitney写像](../ATOP30/index.md#def-atop30-aw) $A$ を適用すると

$$
A\Delta_\#\sigma
=\sum_{i=0}^{n}\sigma[0,\ldots,i]\otimes\sigma[i,\ldots,n].
$$

次数 $(p,q)$ の成分は $i=p$ の項だけです。二つの評価値は $R$ の積で掛け合わせます。各コチェインへの加法とスカラー倍を評価ごとに定めると、評価の積は各変数について $R$ 線形になります。この性質を双線形と呼びます。

<a id="def-atop31-cup"></a>

<!-- formal-statement-start -->
> **定義（cup積）**
>
> 位相空間 $X$、単位元を持つ可換環 $R$、非負整数 $p,q$ に対し、コチェインのcup積を次の双線形写像とする。
>
$$
\smile:C^p(X;R)\times C^q(X;R)\to C^{p+q}(X;R).
$$
>
> 特異 $(p+q)$ 単体 $\sigma$ 上では
>
$$
(a\smile b)(\sigma)=
a(\sigma[0,\ldots,p])\,b(\sigma[p,\ldots,p+q])
$$
>
> と定め、鎖に対して線形に延長する。負次数のコチェインとの積は零とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-atop31-cup -->
**定義の確認**。$X=\Delta^2$、$R=\mathbb Z$ とし、恒等特異単体を $\sigma$ とします。1コチェイン $a,b$ は、それぞれ $\sigma[0,1]$ に2、$\sigma[1,2]$ に3を割り当て、指定していない特異1単体では零とします。基底上の指定だから確かに1コチェインです。すると

$$
(a\smile b)(\sigma)=2\cdot3=6.
$$

例えば鎖 $2\sigma$ の評価は12です。ここでは鎖の係数を一度だけ掛けます。前面と後面の評価値の積を基底上で定めてから延長するので、係数を二度掛けるわけではありません。

基底上で

$$
\begin{gathered}
((a+a')\smile b)(\sigma)\\
=(a(\sigma[0,1])+a'(\sigma[0,1]))b(\sigma[1,2])
\end{gathered}
$$

となり、分配法則から二つの積の和になります。第二変数についても、後面の値の和を分配できます。一般の鎖 $c=\sum_\sigma r_\sigma\sigma$（有限和）での評価は

$$
(a\smile b)(c)
=\sum_\sigma r_\sigma a(\sigma[0,\ldots,p])
 b(\sigma[p,\ldots,p+q]).
$$

従って鎖に関して線形です。また $r\in R$ に対して前面・後面のどちらの評価値を $r$ 倍しても、積全体が $r$ 倍になります。後面の場合は係数環の可換性を使います。以上で双線形性も確認できました。
<!-- definition-example-end -->

次数0のコチェインは点の値を指定する関数です。0コチェイン $f$ と1コチェイン $a$ を掛けると、道 $\gamma$ に対して

$$
(f\smile a)(\gamma)=f(\gamma(0))a(\gamma),
$$

$$
(a\smile f)(\gamma)=a(\gamma)f(\gamma(1)).
$$

始点と終点のどちらを評価するかが違います。この段階では係数環が可換でも、コチェインの積そのものは可換とは限りません。

## 2. 余境界との関係

[特異余境界作用素](../ATOP28/index.md#def-atop28-coboundary) は $(\delta a)(c)=a(\partial c)$ です。ここで $\partial$ は[特異境界作用素](../ATOP16/index.md#def-atop16-singular-boundary)で、鎖の次数を1下げます。$\delta$ は逆にコチェインの次数を1上げます。[特異コホモロジー群](../ATOP28/index.md#def-atop28-cohomology)で学んだコサイクルは $\delta a=0$ を満たす評価、コバウンダリは $\delta u$ と書ける評価です。積をコホモロジー類に降ろすには、コサイクル同士の積がコサイクルであり、その一方がコバウンダリなら積もコバウンダリになることを確かめる必要があります。その両方を保証するのが、微分積の法則に次数の符号を付けた次の恒等式です。

<a id="thm-atop31-leibniz"></a>

<!-- formal-statement-start -->
> **定理（cup積のLeibniz則）**
>
> 任意の位相空間 $X$ と単位元を持つ可換環 $R$ に対し、$a\in C^p(X;R)$、$b\in C^q(X;R)$ （$p,q\ge0$）なら
>
$$
\delta(a\smile b)=\delta a\smile b+(-1)^p a\smile\delta b.
$$
<!-- formal-statement-end -->

境界の交代和で、前面を削る項と後面を削る項を分けます。共有頂点をずらした二つの余分な項が逆符号で消えるのが核心です。

<!-- proof-start -->
### 証明

$N=p+q+1$ とし、$\sigma$ を特異 $N$ 単体とします。頂点列から $j$ を除くことを $\widehat j$ で表します。まず第一項は

$$
(\delta a\smile b)(\sigma)=
\sum_{j=0}^{p+1}(-1)^j
a(\sigma[0,\ldots,\widehat j,\ldots,p+1])
b(\sigma[p+1,\ldots,N]).
$$

第二項は、後面の先頭 $p$ を局所番号0として境界を取るため、外側の符号と合わせて

$$
((-1)^p a\smile\delta b)(\sigma)=
\sum_{j=p}^{N}(-1)^j
a(\sigma[0,\ldots,p])
b(\sigma[p,\ldots,\widehat j,\ldots,N]).
$$

第一の和の $j=p+1$ と第二の和の $j=p$ は、いずれも

$$
a(\sigma[0,\ldots,p])b(\sigma[p+1,\ldots,N])
$$

を評価します。係数は $(-1)^{p+1}$ と $(-1)^p$ なので相殺します。

残る第一の和の $0\le j\le p$ は、$\sigma$ から頂点 $j$ を削った後に前面を $p$ 次で切る場合です。残る第二の和の $p+1\le j\le N$ は、後面の頂点を削った場合です。

両方合わせて境界の全ての項を一度ずつ数え、その符号は $(-1)^j$ です。従って両辺は全基底上で一致します。

$$
(\delta(a\smile b))(\sigma)=(a\smile b)(\partial\sigma).
$$

$p=0$ または $q=0$ でも和と相殺する二項は同じ範囲で定義されています。
<!-- proof-end -->

例えば0コチェイン $f$ と1コチェイン $a$ の場合、三角形での右辺は、頂点の値を $f_i$、辺の値を $a_{ij}$ と略すと

$$
(f_1-f_0)a_{12}+f_0(a_{12}-a_{02}+a_{01})
=f_1a_{12}-f_0a_{02}+f_0a_{01}.
$$

左辺も三辺の交代和から同じ式になります。

## 3. 類の積と環

コサイクルは余境界が零になるコチェイン、コバウンダリは余境界から得られるコチェインです。これらを使って作る [特異コホモロジー群](../ATOP28/index.md#def-atop28-cohomology) では、コサイクルの代表元をコバウンダリだけ変えても同じ類を表します。積が代表元に依存しないことを最初に確認します。

<a id="thm-atop31-descend"></a>

<!-- formal-statement-start -->
> **定理（cup積のコホモロジーへの降下）**
>
> 位相空間 $X$ と単位元を持つ可換環 $R$ について、コサイクル $a\in C^p(X;R)$、$b\in C^q(X;R)$ に対し
>
$$
[a]\smile[b]=[a\smile b]\in H^{p+q}(X;R)
$$
>
> は代表元の選択に依存せず、コホモロジー群上の双線形写像を定める。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[Leibniz則](#thm-atop31-leibniz) に $\delta a=\delta b=0$ を代入すると、$\delta(a\smile b)=0$ です。$p>0$ で $a$ を $a+\delta u$ に変えると、積の差は

$$
(\delta u)\smile b
=\delta(u\smile b)-(-1)^{p-1}u\smile\delta b
=\delta(u\smile b).
$$

$q>0$ で $b$ を $b+\delta v$ に変えた場合は

$$
a\smile\delta v
=(-1)^p\{\delta(a\smile v)-\delta a\smile v\}
=(-1)^p\delta(a\smile v).
$$

どちらもコバウンダリです。両方を変えるときは第一変数、第二変数の順に変更します。最初の変更後もコサイクルなので第二の計算を適用できます。次数0では前次数の群が零なので代表元の変更はありません。積の双線形性もコチェイン上の双線形性から従います。
<!-- proof-end -->

この積は同じ空間の異なる次数をつなぎます。環として扱うため、結合律、単位元、写像に関する自然性も必要になります。

<a id="thm-atop31-assoc-unit"></a>

<!-- formal-statement-start -->
> **定理（cup積の結合律と単位元）**
>
> 位相空間 $X$ と単位元を持つ可換環 $R$ について、任意の非負次数のコチェイン $a,b,c$ に対して
>
$$
(a\smile b)\smile c=a\smile(b\smile c)
$$
>
> が成立する。各0単体で値 $1_R$ を取る0コチェイン $e$ はコサイクルで、左右の積の単位元である。これらの恒等式はコホモロジー類にも成立する。
<!-- formal-statement-end -->

共有頂点を二つ設ければ、三つの連続する面への分割になります。どちらから括っても三つの評価値は同じです。

<!-- proof-start -->
### 証明

次数を $p,q,r$ とします。$n=p+q+r$ 次単体 $\sigma$ で両辺を評価すると、左辺は

$$
\{a(\sigma[0,\ldots,p])b(\sigma[p,\ldots,p+q])\}
c(\sigma[p+q,\ldots,n])
$$

であり、右辺は

$$
a(\sigma[0,\ldots,p])
\{b(\sigma[p,\ldots,p+q])c(\sigma[p+q,\ldots,n])\}
$$

です。面への制限を重ねると元の単体の該当面への制限となるため、これらの頂点列は一致しています。係数環の結合律で値は等しくなります。次数0の面が含まれてもその面は共有頂点です。

任意の道 $\gamma$ に対し $(\delta e)(\gamma)=1_R-1_R=0$ です。$a$ が $p$ 次なら

$$
(e\smile a)(\sigma)=1_R a(\sigma)=a(\sigma),
$$

$$
(a\smile e)(\sigma)=a(\sigma)1_R=a(\sigma).
$$

従って全鎖上で単位元となります。[コホモロジーへの降下](#thm-atop31-descend) により類上でも結合律と単位元の性質が成立します。
<!-- proof-end -->

[環の公理](../../../代数系/RNG/RNG1/index.md#def-rng1-ring)で必要なのは、加法についての可換群、乗法の結合律、左右の分配律です。各次数の群を直和にまとめ、異なる次数の元の積が次数の和に入るようにする環を次数付き環といいます。ここでは有限個の次数の和だけを元として扱います。

例えば $\alpha=\sum_p\alpha_p$、$\beta=\sum_q\beta_q$ の積の $n$ 次成分を

$$
(\alpha\smile\beta)_n
=\sum_{p+q=n}\alpha_p\smile\beta_q
$$

と定めます。各成分の積は[類上のcup積](#thm-atop31-descend)であり、有限台同士の積は有限台です。

<a id="def-atop31-cohomology-ring"></a>

<!-- formal-statement-start -->
> **定義（コホモロジー環）**
>
> 位相空間 $X$ と単位元を持つ可換環 $R$ に対し、加法群
>
$$
H^*(X;R)=\bigoplus_{n\ge0}H^n(X;R)
$$
>
> に、類上のcup積を分配法則によって有限和に延長した積を入れた次数付き環をコホモロジー環とする。単位元は各点で値 $1_R$ の0コサイクルの類である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-atop31-cohomology-ring -->
**定義の確認**。一点空間 $P$ では [特異コホモロジー群](../ATOP28/index.md#def-atop28-cohomology) の定義例で計算したように、0次は $R$、正次数は零です。

唯一の0単体で値を $u,v\in R$ とする0コチェインを取ります。任意の道は定数なので余境界は $u-u=0$、$v-v=0$ です。負次数からの余境界は零なので各値はただ一つの類に対応します。[cup積](#def-atop31-cup)で $p=q=0$ とすると唯一の点で積は $uv$ になります。従って0次に集中した環の同型

$$
H^*(P;R)\cong R
$$

を得ます。加法・結合律・分配律・単位元は係数環のものに一致し、次数の和は $0+0=0$ です。
<!-- definition-example-end -->

一般の有限和の積は有限個の双線形な積の和です。[結合律と単位元](#thm-atop31-assoc-unit) が各次数で成立するので有限和にも成立します。空間が空のときは零環となります（単位元は零です）。

[特異コホモロジーの誘導準同型](../ATOP28/index.md#thm-atop28-pullback)では、連続写像 $f:X\to Y$ に対し鎖上の写像 $f_\#$、コチェイン上の引戻し $f^\#a=a\circ f_\#$、類上の写像 $f^*[a]=[f^\#a]$ を区別しました。引戻しは $Y$ 上の評価を $X$ 上の評価に移す操作です。これが[環準同型](../../../代数系/RNG/RNG1/index.md#def-rng1-ring-homomorphism)として積を保つことを確かめます。

<a id="thm-atop31-naturality"></a>

<!-- formal-statement-start -->
> **定理（cup積の自然性）**
>
> 連続写像 $f:X\to Y$ と単位元を持つ可換環 $R$ に対し、非負整数 $p,q$ と $a\in C^p(Y;R)$、$b\in C^q(Y;R)$ に対して、コチェインの引戻しはcup積を保存する。
>
$$
f^\#(a\smile b)=f^\#a\smile f^\#b.
$$
>
> 従って誘導写像 $f^*:H^*(Y;R)\to H^*(X;R)$ は次数と単位元を保つ環準同型である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[特異コホモロジーの誘導準同型](../ATOP28/index.md#thm-atop28-pullback) で用いた引戻しを適用します。左辺の特異単体 $\sigma$ での値は $(a\smile b)(f\circ\sigma)$ です。面への制限は後から $f$ を合成する操作と可換なので

$$
(f\circ\sigma)[0,\ldots,p]=f\circ\sigma[0,\ldots,p].
$$

後面でも同様に $(f\circ\sigma)[p,\ldots,p+q]=f\circ\sigma[p,\ldots,p+q]$ です。従って左辺の値は

$$
a(f\circ\sigma[0,\ldots,p])b(f\circ\sigma[p,\ldots,p+q]),
$$

すなわち右辺の評価です。引戻しは各点で値1のコチェインを同じ値1のコチェインに送ります。引戻しと余境界の可換性、および [cup積のコホモロジーへの降下](#thm-atop31-descend) により類上でも積と単位元を保ちます。各次数で加法を保つので環準同型です。
<!-- proof-end -->

特に同相写像とその逆写像の引戻しは、互いに逆な環準同型になります。さらに [コホモロジーのホモトピー不変性](../ATOP28/index.md#thm-atop28-homotopy) を用いると、ホモトピー同値な二つの空間でも引戻しは互いに逆です。従って環の非同型性はホモトピー同値でないことの判定に使えます。

## 4. なぜ類上で符号付きの交換ができるのか

第1節の始点・終点の例から分かるように、コチェインの積はそのままでは可換ではありません。ところが、類を作るときは余境界だけの差を忘れます。この差を[鎖ホモトピー](../ATOP17/index.md#def-atop17-chain-homotopy)の恒等式を係数環上で用いて具体的に表し、次数に応じた交換則を証明します。

<a id="thm-atop31-graded-commutativity"></a>

<!-- formal-statement-start -->
> **定理（cup積の次数付き可換性）**
>
> 任意の位相空間 $X$、単位元を持つ可換環 $R$、非負整数 $p,q$ と類 $\alpha\in H^p(X;R)$、$\beta\in H^q(X;R)$ について
>
$$
\alpha\smile\beta=(-1)^{pq}\beta\smile\alpha
$$
>
> が成立する。
<!-- formal-statement-end -->

前講の積の鎖写像は、単体を二つの面に分ける方法と、二つの単体の積を三角形分割する方法でした。面を直接交換すると鎖上では一致しませんが、分割した積で二つの座標を交換すると、横と縦の順序が逆になり符号が $(-1)^{pq}$ だけ変わります。この厳密な等式と、二つの鎖写像が鎖ホモトピー逆である事実を組み合わせます。

<!-- proof-start -->
### 証明

鎖複体は $R$ 係数とし、$C=C_*(X;R)$、$D=C_*(X\times X;R)$ とします。[テンソル積鎖複体](../ATOP30/index.md#def-atop30-tensor-complex) $C\otimes_R C$（以下 $\otimes$ は $R$ 上）の全次数 $n=i+j$ の成分で、境界を

$$
d(u\otimes v)=du\otimes v+(-1)^i u\otimes dv
\qquad(u\in C_i,\ v\in C_j)
$$

と書きます。各因子の $d$ は特異境界 $\partial$ で、テンソル積の $d$ とともに入力から次数と作用対象を判断します。次数 $i,j$ の鎖に対し、交換写像 $T$ を

$$
T(u\otimes v)=(-1)^{ij}v\otimes u
$$

と置きます。各成分で双線形かつスカラーを左右に移す関係を保つので、テンソル積上の線形写像になります。$T$ は全次数を変えません。$dT$ の二項は

$$
(-1)^{ij}dv\otimes u+
(-1)^{ij+j}v\otimes du.
$$

一方 $Td$ の二項は

$$
(-1)^{(i-1)j}v\otimes du+
(-1)^{i+i(j-1)}dv\otimes u.
$$

指数を2で考えると $(i-1)j$ と $ij+j$ は同じ、$i+i(j-1)=ij$ です。零次数の境界項は零として扱います。従って $T$ は鎖写像です。

積空間の座標交換 $t:X\times X\to X\times X$、$t(x,y)=(y,x)$ が誘導する[鎖写像](../ATOP16/index.md#thm-atop16-chain-map)を $t_\#$ とします。[shuffle写像](../ATOP30/index.md#def-atop30-shuffle) $S:C\otimes C\to D$ について

$$
ST=t_\# S
$$

が成り立ちます。実際、次数 $i,j$ の生成元の各shuffle語の H と V を交換すると、頂点列も座標交換されます。元の語で V が H より先にある組の数を $I$ とすると、交換した語ではその数が $ij-I$ です。従って交換した語の符号に $(-1)^{ij}$ を掛けると $(-1)^{2ij-I}=(-1)^I$ となります。語の交換は全単射なので、両辺の全項が一致します。

[Alexander–Whitney写像](../ATOP30/index.md#def-atop30-aw) を $A:D\to C\otimes C$ とします。[Eilenberg–Zilber定理](../ATOP30/index.md#thm-atop30-eilenberg-zilber) の証明では、次数を1上げる写像 $L$（テンソル積上）と $H$（積空間の鎖上）が構成されました。

$$
dL+Ld=AS-1,\qquad dH+Hd=SA-1.
$$

先ほどの $ST=t_\# S$ を使って、二つの鎖写像の差を次のように分けます。

$$
TA-At_\#=(1-AS)TA+At_\#(SA-1).
$$

実際、右辺の混合項は $-ASTA+At_\#SA=0$ です。ここで「次数0の写像」は各 $n$ 次の鎖を $n$ 次の鎖に送る写像という意味です。[積の二つの鎖写像](../ATOP30/index.md#thm-atop30-product-chain-maps)と上で確認した交換写像の鎖写像性により、$A,S,T,t_\#$ はいずれも境界と可換なので、上の二つのホモトピー恒等式を代入すると

$$
TA-At_\#=d(-LTA+At_\# H)+(-LTA+At_\# H)d.
$$

対角写像 $\Delta:X\to X\times X$ は $t\circ\Delta=\Delta$ を満たします。$F=A\Delta_\#$ と書き、次数を1上げる写像

$$
K=(-LTA+At_\# H)\Delta_\#
$$

を取れば

$$
TF-F=dK+Kd
$$

です。

次にコサイクル $a\in C^p(X;R)$、$b\in C^q(X;R)$ を取ります。テンソル積の全次数 $p+q$ に対する評価 $E$ を、次数 $(p,q)$ の成分で

$$
E(u\otimes v)=a(u)b(v)
$$

とし、他の成分で零とします。これは [テンソル積](../ATOP29/index.md#def-atop29-abelian-tensor) の関係式を $R$ 上で課したものを使う評価です。両変数の加法性は $R$ の分配法則から従い、スカラー $r\in R$ について

$$
a(ru)b(v)=r a(u)b(v)=a(u)b(rv)
$$

なので係数を移す関係も保ちます。従ってテンソル積の商で良定義であり、他の次数成分を零とすることで全次数 $p+q$ の線形評価になります。

$Ed=0$ を確認します。全次数 $p+q+1$ の単純テンソルの境界で $(p,q)$ 成分が出るのは、入力の次数が $(p+1,q)$ または $(p,q+1)$ のときだけです。それぞれの評価は

$$
(\delta a)(u)b(v)=0,\qquad
(-1)^p a(u)(\delta b)(v)=0.
$$

従って全鎖で零となります。

$F$ の $(p,q)$ 成分の評価はcup積の定義そのものなので $EF=a\smile b$ です。$ETF$ では交換前の $(q,p)$ 成分が評価され、係数環の可換性により

$$
ETF=(-1)^{pq}b\smile a.
$$

従って全次数 $p+q$ の鎖に対して

$$
(-1)^{pq}b\smile a-a\smile b
=E(dK+Kd)=EKd.
$$

$p+q>0$ なら $K$ は $(p+q-1)$ 次の鎖を $p+q$ 次へ送り、$E$ と合成した $EK$ は $(p+q-1)$ コチェインです。[特異余境界作用素](../ATOP28/index.md#def-atop28-coboundary)の定義により最後の式はその余境界 $\delta(EK)$ です。$p=q=0$ なら負次数の鎖群が零なので $Kd=0$ であり、差は零です。どちらの場合も類上の差は消えます。
<!-- proof-end -->

[次数付き可換性](#thm-atop31-graded-commutativity)を $\beta=\alpha$ に適用すると、奇数次数の類 $\alpha$ では $(-1)^{p^2}=-1$ なので

$$
\alpha^2=-\alpha^2,\qquad 2\alpha^2=0.
$$

2が可逆な係数環では平方が零と結論できます。より一般には $H^{2p}(X;R)$ の2倍写像が単射であれば十分です。

しかし係数が $\mathbb F_2$ のときには $-1=1$ なので、交換則だけから平方の消滅を結論できません。この違いは次講の実射影空間の計算で重要になります。

## 5. 演習

<a id="ex-atop31-a1"></a>

### 演習 ATOP31-A1：三角形の評価

- Level: A

$X=\Delta^2$ の恒等特異単体 $\sigma$ について、整数係数1コチェイン $a,b$ の値を $a_{01}=2,a_{12}=5,b_{01}=7,b_{12}=3$ とする。$(a\smile b)(\sigma)$ と $(b\smile a)(\sigma)$ を求めよ。

<!-- solution-start -->
**詳細解答**

[cup積](#def-atop31-cup) は前面 $[0,1]$ と後面 $[1,2]$ の評価を掛けます。従って

$$
(a\smile b)(\sigma)=2\cdot3=6,\qquad
(b\smile a)(\sigma)=7\cdot5=35.
$$

任意のコチェインについては、類上の交換則をそのまま適用できません。
<!-- solution-end -->

<a id="ex-atop31-a2"></a>

### 演習 ATOP31-A2：0次と1次

- Level: A

整数係数の0コチェイン $f$ と1コチェイン $a$ について、道 $\gamma$ の始点で $f=2$、終点で $f=5$、$a(\gamma)=3$ とする。二通りのcup積と差を求めよ。

<!-- solution-start -->
**詳細解答**

前面の次数を0にすると始点、後面の次数を0にすると終点が選ばれます。[cup積](#def-atop31-cup) より

$$
(f\smile a)(\gamma)=2\cdot3=6,
\quad (a\smile f)(\gamma)=3\cdot5=15.
$$

後者から前者を引くと9です。[特異余境界作用素](../ATOP28/index.md#def-atop28-coboundary)による $f$ の余境界の値は $5-2=3$ なので、$f$ はコサイクルではありません。
<!-- solution-end -->

<a id="ex-atop31-a3"></a>

### 演習 ATOP31-A3：Leibniz則の符号

- Level: A

1コチェイン $a,b$ の積の余境界を特異3単体 $\sigma$ で評価する。$a_{ij},b_{ij}$ を各辺での値とし、右辺 $\delta a\smile b-a\smile\delta b$ が四つの面の交代和と一致することを示せ。

<!-- solution-start -->
**詳細解答**

[cup積](#def-atop31-cup)と[特異余境界作用素](../ATOP28/index.md#def-atop28-coboundary)を使います。$\delta a$ を前面 $[0,1,2]$、$b$ を後面 $[2,3]$ で評価すると

$$
(\delta a\smile b)(\sigma)=(a_{12}-a_{02}+a_{01})b_{23}.
$$

$a$ を前面 $[0,1]$、$\delta b$ を後面 $[1,2,3]$ で評価すると

$$
(a\smile\delta b)(\sigma)=a_{01}(b_{23}-b_{13}+b_{12}).
$$

差を取ると $a_{01}b_{23}$ が消えます。残りは

$$
a_{12}b_{23}-a_{02}b_{23}+a_{01}b_{13}-a_{01}b_{12}.
$$

これは順に面 $[1,2,3]$、$[0,2,3]$、$[0,1,3]$、$[0,1,2]$ 上のcup積の交代和なので、$\delta(a\smile b)(\sigma)$ です。第一コチェインが1次なので符号は負となります。
<!-- solution-end -->

<a id="ex-atop31-a4"></a>

### 演習 ATOP31-A4：単位元と三つの面

- Level: A

次数 $1,0,1$ のコチェイン $a,f,b$ を取り、特異2単体 $\sigma$ 上で $a_{01}=2,f_1=4,b_{12}=3$ とする。二つの括り方の値を計算し、$f=e$ の場合も求めよ。

<!-- solution-start -->
**詳細解答**

[cup積](#def-atop31-cup)により $(a\smile f)$ は辺 $[0,1]$ 上で $a_{01}f_1=8$ ですから、$(a\smile f)\smile b$ の値は $8\cdot3=24$ です。$f\smile b$ は辺 $[1,2]$ 上で $f_1b_{12}=12$ ですから、$a\smile(f\smile b)$ の値は $2\cdot12=24$ です。[単位元](#thm-atop31-assoc-unit) $e$ は $f_1=1$ なので両方とも6になります。共有頂点の値を一度だけ掛けています。
<!-- solution-end -->

<a id="ex-atop31-b1"></a>

### 演習 ATOP31-B1：代表元を二つ変更する

- Level: B

$a,b$ を次数 $p,q\ge1$ のコサイクルとし、$u,v$ を次数 $p-1,q-1$ のコチェインとする。$(a+\delta u)\smile(b+\delta v)-a\smile b$ を一つの余境界で表せ。

<!-- solution-start -->
**詳細解答**

双線形性により差は

$$
\delta u\smile b+a\smile\delta v+\delta u\smile\delta v.
$$

[Leibniz則](#thm-atop31-leibniz) と $\delta b=\delta a=\delta^2v=0$ により

$$
\delta(u\smile b)=\delta u\smile b,
$$

$$
\delta((-1)^p a\smile v)=a\smile\delta v,
$$

$$
\delta(u\smile\delta v)=\delta u\smile\delta v.
$$

従って求める差は

$$
\delta\{u\smile b+(-1)^p a\smile v+u\smile\delta v\}
$$

です。括弧内の全項は $p+q-1$ 次であり、余境界は $p+q$ 次になります。
<!-- solution-end -->

<a id="ex-atop31-b2"></a>

### 演習 ATOP31-B2：引戻しと定数写像

- Level: B

$Y$ を非空の位相空間、$y\in Y$ とする。非空の位相空間 $X$ から $y$ への定数写像 $f:X\to Y$ による引戻しが、正次数の類を零に送ることを示し、任意の正次数の類を含む積も零に送ることを示せ。

<!-- solution-start -->
**詳細解答**

一点空間 $P$ への写像 $k:X\to P$ と、$y$ を選ぶ写像 $j:P\to Y$ を取ると $f=j\circ k$ です。[特異コホモロジーの誘導準同型](../ATOP28/index.md#thm-atop28-pullback) の反変性より $f^*=k^*j^*$ です。[一点のコホモロジーの計算](../ATOP28/index.md#def-atop28-cohomology)により正次数の群は零なので、$n>0$ に対し

$$
H^n(Y;R)\xrightarrow{j^*}0\xrightarrow{k^*}H^n(X;R)
$$

となります。[cup積の自然性](#thm-atop31-naturality) から正次数の $\alpha$ と任意の $\beta$ について

$$
f^*(\alpha\smile\beta)=f^*\alpha\smile f^*\beta
=0\smile f^*\beta=0.
$$

0次の単位元は単位元に送られる点に注意します。
<!-- solution-end -->

<a id="ex-atop31-b3"></a>

### 演習 ATOP31-B3：shuffleの交換符号

- Level: B

次数 $2,1$ の二つの単体について、shuffle語 HHV, HVH, VHH の符号を求めよ。H と V を交換した語の符号と比較し、次数の交換符号を確かめよ。

<!-- solution-start -->
**詳細解答**

[shuffle写像](../ATOP30/index.md#def-atop30-shuffle) では V が H より前に出る組を数えます。元の語では順に0,1,2組なので符号は $+,-,+$ です。交換後は VVH, VHV, HVV となります。これらでは順に2,1,0組なので符号は $+,-,+$ です。二つの次数の積は $2\cdot1=2$ で、交換符号は $(-1)^2=1$ です。

次数がともに1なら HV と VH が入れ替わり、符号は $+$ と $-$ になります。この場合は $(-1)^{1\cdot1}=-1$ です。全ての組のうち片方の順序を数えるため、一般にも交換後の転倒数は $pq-I$ となります。
<!-- solution-end -->

<a id="ex-atop31-b4"></a>

### 演習 ATOP31-B4：奇数次数の平方

- Level: B

整数係数で $\alpha\in H^3(X;\mathbb Z)$ とする。$H^6(X;\mathbb Z)\cong\mathbb Z/6\mathbb Z$ のとき、$\alpha^2$ の候補を絞れ。係数を $\mathbb F_2$ にしたときは同じ理由で平方が消えるか。

<!-- solution-start -->
**詳細解答**

[cup積の次数付き可換性](#thm-atop31-graded-commutativity) より

$$
\alpha^2=(-1)^9\alpha^2=-\alpha^2,\qquad 2\alpha^2=0.
$$

指定の群同型の下で平方を剰余類 $k$ とすると、条件は $6\mid2k$、すなわち $3\mid k$ です。候補は $0,3$ の二つです。これは必要条件であって、どちらが実現するかは空間の積構造に依存します。

$\mathbb F_2$ では全ての元の2倍が零です。従って交換則は平方が零という追加条件を与えません。
<!-- solution-end -->

<a id="ex-atop31-c1"></a>

### 演習 ATOP31-C1：鎖ホモトピーから積の差を取り出す

- Level: C

可換環 $R$ 上の非負次数の鎖複体 $C,D$ と鎖写像 $F,G:C\to D$ があり、次数を1上げる線形写像 $K$ が

$$
G-F=d_DK+Kd_C
$$

を満たすとする。ここで一般の鎖複体のコチェインは $C^m=\operatorname{Hom}_R(C_m,R)$、余境界は $\delta\phi=\phi\circ d_C$ と定める（$D$ でも同様）。$n\ge1$ とし、$R$ 線形写像 $E:D_n\to R$ が $Ed_D=0$ を満たすとき、$EF,EG$ は $C$ の同じコホモロジー類を表すことを示せ。

さらに本文の交換写像にこれを適用して、$p=1,q=2$ と $p=q=1$ の場合の符号を求めよ。

<!-- solution-start -->
**詳細解答**

$F,G$ は鎖写像なので、任意の $c\in C_{n+1}$ に対して

$$
(EF)(d_Cc)=E(d_DFc)=0,\qquad
(EG)(d_Cc)=E(d_DGc)=0.
$$

従ってどちらもコサイクルです。$c\in C_n$ について差を計算すると

$$
(EG-EF)(c)=E(d_DKc)+EK(d_Cc)=EK(d_Cc).
$$

$EK$ は $C_{n-1}$ の評価です。[特異余境界作用素](../ATOP28/index.md#def-atop28-coboundary) と同じ合成の定義で右辺は $(\delta(EK))(c)$ です。従って差は余境界となり、同じ類を表します。

本文の [次数付き可換性の証明](#thm-atop31-graded-commutativity) では $D=C_*(X;R)\otimes C_*(X;R)$、$F=A\Delta_\#$、$G=TF$ です。次数 $(p,q)$ に限った評価 $E$ は二つのコサイクルを用いるため $Ed_D=0$ でした。

$$
EF=a\smile b,\qquad
EG=(-1)^{pq}b\smile a.
$$

$p=1,q=2$ では $pq=2$ なので符号は正、$p=q=1$ では $pq=1$ なので符号は負です。コチェイン上で等しい必要はなく、差が余境界であることだけで類上の等式が得られます。
<!-- solution-end -->

<a id="ex-atop31-c2"></a>

### 演習 ATOP31-C2：二点の環

- Level: C

離散二点空間 $X=\{x,y\}$ の整数係数コホモロジー環を求めよ。点 $x$ の値が1、点 $y$ の値が0の0コサイクル $u$ と、その逆の値を持つ $v$ について $u^2,v^2,uv,u+v$ を求め、加法群が同じ環 $\mathbb Z[t]/(t^2)$ と比較して、加法群だけから積を読み取れないことを説明せよ。

<!-- solution-start -->
**詳細解答**

標準単体の任意の二点を結ぶ線分は単体の中にあるので、標準単体は道連結です。離散二点空間への連続写像の像も道連結でなければならず、従って定数です。従って各次数に二つの特異単体 $s_n^x,s_n^y$ があり、境界はそれぞれの点の単体だけを使います。[特異境界作用素](../ATOP16/index.md#def-atop16-singular-boundary)より正次数の $n$ に対し

$$
\partial s_n^z=\left(\sum_{i=0}^n(-1)^i\right)s_{n-1}^z
\qquad(z=x,y).
$$

$n$ が奇数なら係数0、偶数なら1です。各次数のコチェイン群は $\mathbb Z^2$ で、余境界は次数が偶数なら零、奇数なら恒等です。[特異コホモロジー群](../ATOP28/index.md#def-atop28-cohomology)の定義に戻ると、0次は核が $\mathbb Z^2$、前からの像が零です。正の奇数次では核が零、正の偶数次では核と前からの像がともに $\mathbb Z^2$ です。従って $H^0(X;\mathbb Z)=\mathbb Z^2$、正次数の群は零となります。

[cup積](#def-atop31-cup) の $p=q=0$ の場合、同じ点の二つの値を掛けるので

$$
u^2=u,\quad v^2=v,\quad uv=0,\quad u+v=e.
$$

0次の任意の類は $mu+nv$ と一意に書け、その積は

$$
(mu+nv)(ru+sv)=mr\,u+ns\,v.
$$

従って環は成分ごとの積を持つ $\mathbb Z\times\mathbb Z$ です。比較として [商環](../../../代数系/RNG/RNG1/index.md#def-rng1-quotient-ring) $\mathbb Z[t]/(t^2)$ を考えます。$(t^2)$ は $t^2$ の倍数全体からなるイデアルです。任意の多項式は定数項と1次項を残して $t^2$ の倍数を除くことができ、次数1以下の多項式で $t^2$ の倍数となるのは零だけです。従って各類は $m+nt$ と一意に表され、加法群として同じ $\mathbb Z^2$ です。しかし $t$ の類は非零で平方が零です。一方 $\mathbb Z\times\mathbb Z$ で平方が零となるのは両成分が零のときだけです。従ってこの二つの環は同型ではありません。これは加法群だけでは環の積を決められないことの代数的な例です。
<!-- solution-end -->

## 6. まとめ

cup積は、単体の前面・後面を二つのコチェインで評価することで定まります。Leibniz則により代表元の選択から独立な積となり、結合律・単位元・自然性を備えたコホモロジー環を得ました。座標交換のshuffle符号と鎖ホモトピーによって、類上では次数付き可換性が成立します。次講ではこの構造をトーラスと射影空間の具体的な環の計算に使います。
