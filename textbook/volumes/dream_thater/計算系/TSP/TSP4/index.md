# TSP4 制限・劣階数・対角テンソルと局所線形写像

前講までに、テンソルを積の和で表す最小項数と、その下界を求めました。今回は逆向きの問いを考えます。与えられたテンソルから、各因子を別々に線形変換するだけで、何個の独立した対角成分を取り出せるでしょうか。この二方向の変換が、後にテンソルの比較を支えることになります。

## 1. 各因子に別々の線形写像を作用させる

係数体を任意の体 $K$ とし、因子数を $d\ge2$ に固定します。空間 $V_a,W_a$ は有限次元の $K$ 上のベクトル空間です。

各因子の位置 $a$ に線形写像 $A_a:V_a\to W_a$ を与えます。積の各位置に対応する写像だけを作用させるので、ここでの「局所」は因子ごとという意味です。位相的な近傍を意味しません。

例えば二つの2次元空間で、第1因子は第1成分を残し、第2因子は第2成分を残すとします。入力の四つの基底の積のうち、添字の組が $(1,2)$ のものだけが残ります。この操作を積の和にも一意に拡張したいわけです。

<a id="def-tsp4-local-map"></a>

<!-- formal-statement-start -->
> **定義（局所線形写像のテンソル積）**
>
> 体 $K$ 上の有限次元空間 $V_a,W_a$ と線形写像 $A_a:V_a\to W_a$（$1\le a\le d$、$d\ge2$）について、次を満たす線形写像を $\bigotimes_a A_a$ とする。
>
$$
\bigotimes_a A_a:\bigotimes_a V_a\longrightarrow\bigotimes_a W_a,
$$
>
$$
(\bigotimes_a A_a)(v_1\otimes\cdots\otimes v_d)
=A_1v_1\otimes\cdots\otimes A_dv_d.
$$
<!-- formal-statement-end -->

存在と一意性は [多因子のテンソル積の普遍性](../TSP1/index.md#def-tsp1-multifactor-product) から従います。右辺で第 $a$ 入力だけを $\lambda x+\mu y$ に替えると、まず $A_a(\lambda x+\mu y)=\lambda A_ax+\mu A_ay$ となり、さらに積のその位置での線形性によって二項に分かれます。したがって右辺は多重線形であり、普遍性の仮定を満たします。

<!-- definition-example-start: def-tsp4-local-map -->
**定義の確認**。$V_1=V_2=K^2$、$W_1=W_2=K$ とし、$A_1(x,y)=x$、$A_2(x,y)=y$ とします。どちらも座標の取り出しなので線形です。

標準基底を $e_i$ とすると、$A_1e_1=A_2e_2=1$ で、$A_1e_2=A_2e_1=0$ です。[多因子テンソル積の存在・基底・一意性](../TSP1/index.md#thm-tsp1-multifactor-basis) により入力は四つの積の和として一意に書けます。各積の出力は

$$
(A_1\otimes A_2)(e_i\otimes e_j)
=(A_1e_i)\otimes(A_2e_j).
$$

$K\otimes K$ を基底 $1\otimes1$ で $K$ と同一視すると、係数は $(i,j)=(1,2)$ で1、他で0になります。従って出力は入力係数 $t_{12}$ であり、係数の線形関数としても確かに線形です。
<!-- definition-example-end -->

一般の基底で、入力の次元を $n_a$、出力の次元を $m_a$ とします。行列 $A_a$ の成分 $(A_a)_{j_ai_a}$ は入力基底 $e^{(a)}_{i_a}$ の像に含まれる出力基底 $f^{(a)}_{j_a}$ の係数です。各位置の基底展開を代入すると、

$$
A_ae^{(a)}_{i_a}=\sum_{j_a=1}^{m_a}(A_a)_{j_ai_a}f^{(a)}_{j_a}.
$$

これらの積を展開し、入力テンソルの各係数 $t_{i_1\ldots i_d}$ を掛けて足します。出力 $s$ の係数は

$$
s_{j_1\ldots j_d}
=\sum_{i_1=1}^{n_1}\cdots\sum_{i_d=1}^{n_d}
 t_{i_1\ldots i_d}\prod_{a=1}^{d}(A_a)_{j_ai_a}.
$$

出力側の添字 $j_a$ は固定し、入力側の添字 $i_a$ を全て足す点が重要です。

## 2. 制限という比較

出力空間を小さくする座標射影だけでなく、線形結合を取ることも許すと、取り出せるテンソルの種類が広がります。この変換による比較を制限（restriction）と呼びます。

<a id="def-tsp4-restriction"></a>

<!-- formal-statement-start -->
> **定義（テンソルの制限）**
>
> 同じ体 $K$ 上の有限次元空間 $V_a,W_a$（$1\le a\le d$、$d\ge2$）のテンソル積の元をそれぞれ $t,s$ とする。各位置に線形写像 $A_a:V_a\to W_a$ が存在して
>
$$
s=(\bigotimes_a A_a)t
$$
>
> が成立するとき、$s$ は $t$ の制限であるといい、$s\preceq t$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsp4-restriction -->
**定義の確認**。三つの $K^2$ に標準基底を取り、$E_{ijk}=e_i\otimes e_j\otimes e_k$ と略記します。$t=E_{111}+E_{122}$ に対し、第1、第3写像を恒等写像、第2写像を $e_1\mapsto e_1,\ e_2\mapsto0$ とします。基底上の指定を線形に延長したので三写像は線形です。積ごとの作用は

$$
E_{111}\mapsto E_{111},\qquad E_{122}\mapsto0.
$$

従って $s=E_{111}$ に対して $s\preceq t$ です。制限は逆向きに書かないよう注意しましょう。
<!-- definition-example-end -->

比較の向きを確認する方法は、最短分解に局所線形写像を作用させることです。各項は依然として一つの積か零なので、必要な項数が増えることはありません。

<a id="thm-tsp4-restriction-bounds"></a>

<!-- formal-statement-start -->
> **定理（制限による階数の単調性）**
>
> 任意の体 $K$ 上の有限次元空間を因子とする同じ因子数 $d\ge2$ のテンソル $s,t$ が $s\preceq t$ を満たすとする。元の因子分けでのテンソル階数について
>
$$
R_K(s)\le R_K(t).
$$
>
> 任意の非空な二分割 $I|J$ に関する平坦化の行列階数についても
>
$$
\operatorname{rank}_K F_{I|J}(s)
\le\operatorname{rank}_K F_{I|J}(t).
$$
<!-- formal-statement-end -->

### 証明の見取り図

[テンソル階数](../TSP2/index.md#def-tsp2-tensor-rank) と [テンソルの平坦化](../TSP3/index.md#def-tsp3-flattening) は異なる量です。前者では各積の像を考え、後者では行側と列側に作用する二つの行列を作ります。

<!-- proof-start -->
### 証明

$r=R_K(t)$ とします。最短分解を

$$
t=\sum_{h=1}^{r}\bigotimes_{a=1}^{d}v_{ah}
$$

と取ります。$r=0$ なら空和、すなわち零テンソルです。[局所線形写像のテンソル積](#def-tsp4-local-map) を作用させると

$$
s=\sum_{h=1}^{r}\bigotimes_{a=1}^{d}A_av_{ah}.
$$

零になる項を除けば高々 $r$ 個の非零の積です。従って階数の定義から第一の不等式が成立します。

次に第1節の係数公式を二組の添字に分けます。$I$ の入力・出力添字の組を $\alpha,\gamma$、$J$ の組を $\beta,\delta$ とします。行側の行列 $P$ と列側の行列 $Q$ を

$$
P_{\gamma,\alpha}=\prod_{a\in I}(A_a)_{j_ai_a},
\qquad
Q_{\delta,\beta}=\prod_{b\in J}(A_b)_{j_bi_b}
$$

と置きます。これらはそれぞれ $\prod_{a\in I}m_a$ 行 $\prod_{a\in I}n_a$ 列と、$\prod_{b\in J}m_b$ 行 $\prod_{b\in J}n_b$ 列です。係数公式は

$$
F_{I|J}(s)_{\gamma,\delta}
=\sum_{\alpha,\beta}P_{\gamma,\alpha}
 F_{I|J}(t)_{\alpha,\beta}Q_{\delta,\beta}
$$

となるので、

$$
F_{I|J}(s)=P F_{I|J}(t) Q^{\mathsf T}.
$$

右から $Q^{\mathsf T}$ を掛けた各列は元の列の線形結合であり、左から $P$ を掛ける操作はその列空間の線形像を取ります。元の列空間の基底の像がその線形像を生成するため、その次元は元の次元以下です。従って第二の不等式が成立します。零次元因子を含む場合も空の添字の和を零、空行列の階数を0として同じ結論になります。
<!-- proof-end -->

もし全ての $A_a$ が可逆なら逆写像も因子ごとに作用させられます。積の基底上で合成が恒等写像になり、線形性によって全体でも恒等写像になります。両方向の制限が得られるため、二つの階数評価はどちらも等号です。

## 3. 対角成分を基準にする

一般のテンソルを直接比較するのは難しいので、標準基底の同じ番号だけを組にしたテンソルを基準にします。$K^0=\{0\}$ とし、空和は零と約束します。

<a id="def-tsp4-diagonal"></a>

<!-- formal-statement-start -->
> **定義（対角テンソル）**
>
> 体 $K$、因子数 $d\ge2$、非負整数 $r$ を取る。各 $K^r$ の標準基底を $e_1,\ldots,e_r$ としたとき、対角テンソルは $(K^r)^{\otimes d}$ の元
>
$$
D_r=\sum_{i=1}^{r}e_i^{\otimes d}
$$
>
> である。ここで $e_i^{\otimes d}$ は $d$ 個の $e_i$ のテンソル積で、$D_0=0$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsp4-diagonal -->
**定義の確認**。$d=3,r=2$ では $D_2=E_{111}+E_{222}$ です。[多因子テンソル積の存在・基底・一意性](../TSP1/index.md#thm-tsp1-multifactor-basis) に従って展開すると、8成分のうち添字が全て1または全て2の二成分だけが1です。分割 $1|23$ の平坦化は

$$
\begin{pmatrix}1&0&0&0\\0&0&0&1\end{pmatrix}.
$$

列に二つの標準基底が現れ、行列階数は2です。
<!-- definition-example-end -->

一般の $r$ でも、任意の非空な二分割で、番号が全て $i$ の列には番号が全て $i$ の行にだけ1が入ります。$r$ 本の独立な列があり、残りの列は零です。従って平坦化の階数は $r$ です。

<a id="thm-tsp4-rank-restriction"></a>

<!-- formal-statement-start -->
> **定理（対角テンソルによる階数の特徴付け）**
>
> 体 $K$ 上の有限次元空間 $V_a$（$1\le a\le d$、$d\ge2$）のテンソル積の元 $t$ について
>
$$
R_K(t)=\min\{r\in\mathbb Z_{\ge0}:t\preceq D_r\}.
$$
>
> 特に $R_K(D_r)=r$ である。
<!-- formal-statement-end -->

### 証明の見取り図

対角テンソルの各標準基底ベクトルの送り先を自由に決めれば、その番号ごとに一つの積を作れます。逆に、制限で取り出したものはその個数以下の積の和になります。

<!-- proof-start -->
### 証明

最短分解の項数を $q=R_K(t)$ とし、

$$
t=\sum_{i=1}^{q}v_{1i}\otimes\cdots\otimes v_{di}
$$

とします。各位置について $A_a:K^q\to V_a$ を $A_ae_i=v_{ai}$ と定め、線形に延長します。すると

$$
(\bigotimes_a A_a)D_q
=\sum_{i=1}^{q}\bigotimes_a v_{ai}=t.
$$

$q=0$ のときも零空間からの零写像により $t=0$ が得られます。従って集合は空でなく、その最小値は $q$ 以下です。

一方、$t\preceq D_r$ なら [制限による階数の単調性](#thm-tsp4-restriction-bounds) と $D_r$ の表示から

$$
R_K(t)\le R_K(D_r)\le r.
$$

ゆえにどの候補 $r$ も $q$ 以上で、最小値は $q$ です。

最後に [平坦化による階数下界](../TSP3/index.md#thm-tsp3-flattening-bound) を $D_r$ の分割 $1|\{2,\ldots,d\}$ に適用します。先ほど確認した階数が $r$ なので $R_K(D_r)\ge r$ となり、上界と合わせて等号です。$r=0$ も両辺0です。
<!-- proof-end -->

## 4. 逆向きの変換を測る

階数は対角テンソルを材料にして $t$ を作る費用です。逆に $t$ を材料にして対角テンソルを作ると、独立な成分をどれだけ取り出せるかを測れます。

<a id="def-tsp4-subrank"></a>

<!-- formal-statement-start -->
> **定義（テンソル劣階数）**
>
> 体 $K$ 上の有限次元空間 $V_a$（$1\le a\le d$、$d\ge2$）のテンソル積の元 $t$ に対して、劣階数（subrank）を
>
$$
Q_K(t)=\max\{r\in\mathbb Z_{\ge0}:D_r\preceq t\}
$$
>
> とする。
<!-- formal-statement-end -->

最大値は存在します。各因子から零空間への写像で $D_0$ を得られます。また [制限による階数の単調性](#thm-tsp4-restriction-bounds) と [対角テンソルによる階数の特徴付け](#thm-tsp4-rank-restriction) から、候補は全て $r\le R_K(t)$ を満たすので有限集合です。

<!-- definition-example-start: def-tsp4-subrank -->
**定義の確認**。$t=E_{111}+2E_{222}$ を $K=\mathbb Q$ 上で考えます。第1因子の写像を $e_1\mapsto e_1,\ e_2\mapsto e_2/2$ とし、残り二因子は恒等写像とすると

$$
(\bigotimes_a A_a)t=E_{111}+E_{222}=D_2.
$$

線形写像の存在により $Q_K(t)\ge2$ です。元の表示は二つの積なので $R_K(t)\le2$。最大値の存在の議論から $Q_K(t)\le2$ でもあり、劣階数はちょうど2です。係数2が非零である体で同じ変換が使えますが、標数2の体ではその項は零になり、2で割ることはできません。
<!-- definition-example-end -->

<a id="thm-tsp4-subrank-bounds"></a>

<!-- formal-statement-start -->
> **定理（劣階数の基本評価）**
>
> 体 $K$ 上の有限次元空間を因子とする同じ因子数 $d\ge2$ のテンソル $s,t$ について、$s\preceq t$ なら $Q_K(s)\le Q_K(t)$ である。また任意の非空な二分割 $I|J$ について
>
$$
0\le Q_K(t)\le\operatorname{rank}_K F_{I|J}(t)
\le R_K(t).
$$
>
> $t$ が非零なら $Q_K(t)\ge1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

制限を二回行えば各位置の写像は合成できます。対角テンソルの平坦化の階数はその番号数に等しいので、取り出せる番号数を制限できます。

<!-- proof-start -->
### 証明

$q=Q_K(s)$ とします。$s=(\bigotimes_a A_a)t$ と $D_q=(\bigotimes_a B_a)s$ を実現する写像を取ります。各単純テンソルに二つの写像を順に作用させると、

$$
(\bigotimes_a B_a)(\bigotimes_a A_a)
(\bigotimes_a v_a)=\bigotimes_a (B_aA_av_a).
$$

[多因子テンソル積の存在・基底・一意性](../TSP1/index.md#thm-tsp1-multifactor-basis) は単純テンソルからなるので、線形写像としても合成は $\bigotimes_a(B_aA_a)$ に等しくなります。従って $D_q\preceq t$ であり、最大値の定義から $q\le Q_K(t)$ です。

$p=Q_K(t)$ とすれば $D_p\preceq t$ です。第3節で確認した平坦化の階数と [制限による階数の単調性](#thm-tsp4-restriction-bounds) から

$$
p=\operatorname{rank}_K F_{I|J}(D_p)
\le\operatorname{rank}_K F_{I|J}(t).
$$

[平坦化による階数下界](../TSP3/index.md#thm-tsp3-flattening-bound) が最後の不等式を与えます。

$t\ne0$ なら、基底展開のある係数 $c=t_{i_1\ldots i_d}$ が非零です。各位置の座標を取り出す線形写像を $L_a:V_a\to K$ とし、第1位置だけ $c^{-1}L_1$ に替えます。係数公式では指定された添字の組以外の項が全て消えるので、出力は

$$
c^{-1}c\,1^{\otimes d}=D_1.
$$

体の非零元は逆元を持つため、これは全ての体で可能です。
<!-- proof-end -->

特に分割 $\{a\}|\{1,\ldots,d\}\setminus\{a\}$ の行数は $\dim V_a$ なので、$Q_K(t)\le\min_a\dim V_a$ です。零テンソルでは階数も劣階数も0です。

## 5. 二因子と三因子で何が違うか

二因子では階数と劣階数が一致します。三因子では各因子の次元が同じであっても一致しない場合があります。

<a id="thm-tsp4-two-factor-subrank"></a>

<!-- formal-statement-start -->
> **定理（二因子の階数と劣階数の一致）**
>
> 体 $K$ 上の有限次元空間 $V,W$ のテンソル積の元 $t$ について
>
$$
Q_K(t)=R_K(t).
$$
<!-- formal-statement-end -->

### 証明の見取り図

最短分解の各側のベクトルが一次独立なら、それぞれを標準基底へ送ることで対角テンソルを取り出せます。二因子では、一方の従属関係を他方へ移して分解の項数を減らせます。

<!-- proof-start -->
### 証明

$r=R_K(t)=0$ なら [劣階数の基本評価](#thm-tsp4-subrank-bounds) から結論が従います。$r>0$ のとき最短分解を

$$
t=\sum_{i=1}^{r}u_i\otimes v_i
$$

とします。もし $u_1,\ldots,u_r$ が一次従属なら、項の番号を入れ替えて $u_r=\sum_{i=1}^{r-1}c_i u_i$ と書けます。これを代入して

$$
t=\sum_{i=1}^{r-1}u_i\otimes(v_i+c_iv_r)
$$

となり、最短性に矛盾します。$v_i$ が一次従属の場合は $v_r=\sum_{i<r}c_iv_i$ を代入して

$$
t=\sum_{i=1}^{r-1}(u_i+c_iu_r)\otimes v_i
$$

となるため、やはり矛盾します。両側の列は一次独立です。

[一般の体上の Steinitz の交換補題と基底延長](../../../代数系/FLD/FLD0/index.md#thm-fld0-steinitz-basis-extension-over-field) により、各列をそれぞれの空間の基底へ延長します。最初の $r$ 個を標準基底 $e_i\in K^r$ へ送り、追加した基底を零へ送る線形写像 $A,B$ を作れます。すると

$$
(A\otimes B)t=\sum_{i=1}^{r}e_i\otimes e_i=D_r.
$$

従って $Q_K(t)\ge r$。基本評価による逆向きの不等式と合わせて一致します。
<!-- proof-end -->

三因子の反例は、前々講の [三因子の階数3の例](../TSP2/index.md#thm-tsp2-three-factor-rank) です。三つの $K^2$ 上で

$$
w=E_{211}+E_{121}+E_{112}
$$

とします。非零なので劣階数は少なくとも1です。各位置を行とする平坦化は、列順を $(1,1),(1,2),(2,1),(2,2)$ とすれば

$$
\begin{pmatrix}0&1&1&0\\1&0&0&0\end{pmatrix}
$$

です。どの位置でも階数2で、劣階数は高々2です。

もし $D_2\preceq w$ なら、三つの写像 $A_a:K^2\to K^2$ が存在します。第 $a$ 因子を行側にした平坦化の式は

$$
F_{a|\mathrm{rest}}(D_2)
=A_a F_{a|\mathrm{rest}}(w) Q^{\mathsf T}.
$$

左辺の列空間は $K^2$ 全体です。右辺の各列は $A_a$ の像に入るため、$A_a$ の像も $K^2$ 全体でなければなりません。二次元から二次元への全射は可逆です。これは三つの位置全てに当てはまります。

逆写像で $w\preceq D_2$ が得られ、[制限による階数の単調性](#thm-tsp4-restriction-bounds) から $R_K(w)\le2$ となります。しかし既習の階数は3です。矛盾により

$$
Q_K(w)=1,\qquad R_K(w)=3.
$$

したがって平坦化の全階数が2でも、二つの対角成分を取り出せるとは限りません。各因子を別々に操作するという制約が、二因子の行列操作と異なる点です。

## 6. 演習

以下、特に指定しない限り体 $K$ は任意、各 $K^n$ には標準基底を取り、$E_{ijk}=e_i\otimes e_j\otimes e_k$ とします。

### Level A

<a id="ex-tsp4-a01"></a>

#### TSP4-A01 局所写像の座標計算
- Level: A
- ID: TSP4-A01

$K^2$ の三因子で $t=E_{111}+E_{212}+E_{222}$ とします。第1写像は $e_1\mapsto e_1,\ e_2\mapsto e_1+e_2$、第2写像は $e_1\mapsto0,\ e_2\mapsto e_2$、第3写像は恒等写像です。出力を基底展開してください。

<!-- solution-start -->
##### 詳細解答

[局所線形写像のテンソル積](#def-tsp4-local-map) を各項に作用させます。最初の二項では第2因子が $e_1$ なので像は零です。残る項は

$$
E_{222}\mapsto(e_1+e_2)\otimes e_2\otimes e_2
=E_{122}+E_{222}.
$$

従って出力は $E_{122}+E_{222}$ です。
<!-- solution-end -->

<a id="ex-tsp4-a02"></a>

#### TSP4-A02 対角テンソルを小さくする
- Level: A
- ID: TSP4-A02

$d=3$ とします。$D_2\preceq D_3$ を実現する三つの線形写像を作り、逆向きの制限が不可能である理由を述べてください。

<!-- solution-start -->
##### 詳細解答

各写像を $P:K^3\to K^2$ とし、$Pe_1=e_1,\ Pe_2=e_2,\ Pe_3=0$ と基底上で指定します。すると

$$
(P\otimes P\otimes P)D_3
=e_1^{\otimes3}+e_2^{\otimes3}+0=D_2.
$$

逆向きなら [制限による階数の単調性](#thm-tsp4-restriction-bounds) と [対角テンソルによる階数の特徴付け](#thm-tsp4-rank-restriction) により $3\le2$ が必要となるので不可能です。
<!-- solution-end -->

<a id="ex-tsp4-a03"></a>

#### TSP4-A03 一つの非零成分を取り出す
- Level: A
- ID: TSP4-A03

実数体上で $t=3E_{121}-2E_{222}$ とします。$D_1\preceq t$ を実現する線形写像を三つ書いてください。

<!-- solution-start -->
##### 詳細解答

第1因子では $e_1\mapsto1/3,\ e_2\mapsto0$、第2因子では $e_1\mapsto0,\ e_2\mapsto1$、第3因子では $e_1\mapsto1,\ e_2\mapsto0$ とし、いずれも $\mathbb R$ への線形写像として延長します。積ごとに作用させると

$$
3E_{121}\mapsto3(1/3)1^{\otimes3}=D_1,
\qquad -2E_{222}\mapsto0.
$$

従って求める制限が成立します。
<!-- solution-end -->

<a id="ex-tsp4-a04"></a>

#### TSP4-A04 階数と劣階数の向き
- Level: A
- ID: TSP4-A04

$K^2$ の三因子上の $t=E_{111}+E_{122}$ の階数と劣階数を求めてください。

<!-- solution-start -->
##### 詳細解答

表示から $R_K(t)\le2$。第2位置を行、第1・第3位置の組を列とする平坦化は

$$
F_{2|13}(t)=
\begin{pmatrix}1&0&0&0\\0&1&0&0\end{pmatrix}.
$$

二つの独立な列があるので [平坦化による階数下界](../TSP3/index.md#thm-tsp3-flattening-bound) から $R_K(t)\ge2$ です。一方、第1位置を行とすると

$$
F_{1|23}(t)=
\begin{pmatrix}1&0&0&1\\0&0&0&0\end{pmatrix}.
$$

列空間の次元は1です。[劣階数の基本評価](#thm-tsp4-subrank-bounds) から $Q_K(t)\le1$ で、$t$ は非零なので $Q_K(t)\ge1$。従って階数2、劣階数1です。
<!-- solution-end -->

### Level B

<a id="ex-tsp4-b01"></a>

#### TSP4-B01 対角テンソルから作る
- Level: B
- ID: TSP4-B01

$K^2$ の三因子上で $t=E_{112}+(e_1+e_2)\otimes e_2\otimes e_1$ とします。$t\preceq D_2$ を明示し、$t\preceq D_1$ が不可能であることを示してください。

<!-- solution-start -->
##### 詳細解答

第1位置の写像は $e_1\mapsto e_1,\ e_2\mapsto e_1+e_2$、第2位置は恒等写像、第3位置は $e_1\mapsto e_2,\ e_2\mapsto e_1$ と定めます。$D_2$ の二項の像はそれぞれ $E_{112}$ と $(e_1+e_2)\otimes e_2\otimes e_1$ です。

第1位置を行に取ると、非零成分は $t_{112}=t_{121}=t_{221}=1$ なので

$$
F_{1|23}(t)=
\begin{pmatrix}0&1&1&0\\0&0&1&0\end{pmatrix}.
$$

第2列は第1標準基底で、第3列から第2列を引くと第2標準基底が得られ、行列階数は2です。[制限による階数の単調性](#thm-tsp4-restriction-bounds) を仮に $t\preceq D_1$ に適用すれば、この階数は $D_1$ の平坦化の階数1以下となるはずです。矛盾なので $D_1$ からは作れません。
<!-- solution-end -->

<a id="ex-tsp4-b02"></a>

#### TSP4-B02 二因子の取り出し
- Level: B
- ID: TSP4-B02

二因子テンソルの係数行列が

$$
M=\begin{pmatrix}1&2&3\\0&1&1\end{pmatrix}
$$

であるとします。任意の体 $K$ 上で $D_2$ を取り出す写像を行列で与えてください。

<!-- solution-start -->
##### 詳細解答

$M$ の最初の二列は一次独立です。実際、線形結合が零なら第2成分から第2列の係数が0、第1成分から第1列の係数が0です。第2因子の写像を

$$
B=\begin{pmatrix}1&0&0\\0&1&0\end{pmatrix}
$$

とすれば、[制限による階数の単調性](#thm-tsp4-restriction-bounds) により

$$
MB^{\mathsf T}=\begin{pmatrix}1&2\\0&1\end{pmatrix}.
$$

第1因子の写像を $A=\begin{pmatrix}1&-2\\0&1\end{pmatrix}$ とすると

$$
AMB^{\mathsf T}=\begin{pmatrix}1&0\\0&1\end{pmatrix}.
$$

右辺は $D_2$ の係数行列です。いずれの操作も2で割らないため標数2でも成立します。第1因子が二次元なので [劣階数の基本評価](#thm-tsp4-subrank-bounds) により劣階数は2です。
<!-- solution-end -->

<a id="ex-tsp4-b03"></a>

#### TSP4-B03 逆写像で戻す
- Level: B
- ID: TSP4-B03

$K^2$ の三因子上で $t=E_{111}+(e_1+e_2)\otimes e_2\otimes(e_1+e_2)$ とします。$D_2\preceq t$ を実現し、階数と劣階数を求めてください。

<!-- solution-start -->
##### 詳細解答

第1と第3位置で $Ae_1=e_1,\ Ae_2=e_2-e_1$ と置き、第2位置は恒等写像 $I$ とします。すると

$$
A(e_1+e_2)=e_1+e_2-e_1=e_2.
$$

第1項の像は $E_{111}$、第2項の像は $E_{222}$ なので

$$
(A\otimes I\otimes A)t=D_2.
$$

従って $Q_K(t)\ge2$。表示は二項なので $R_K(t)\le2$。 [劣階数の基本評価](#thm-tsp4-subrank-bounds) の $Q_K(t)\le R_K(t)$ により両方2です。
<!-- solution-end -->

<a id="ex-tsp4-b04"></a>

#### TSP4-B04 因子を一つ減らさずに合成する
- Level: B
- ID: TSP4-B04

三因子テンソル $t$ から $s$ への制限が写像 $A_a$ で、$s$ から $u$ への制限が写像 $B_a$ で実現されているとします。各写像の合成が定義されることを確認し、$u\preceq t$ を示してください。

<!-- solution-start -->
##### 詳細解答

$t,s,u$ の第 $a$ 因子をそれぞれ $V_a,W_a,X_a$ とすれば、$A_a:V_a\to W_a$、$B_a:W_a\to X_a$ なので $B_aA_a:V_a\to X_a$ は定義された線形写像です。[局所線形写像のテンソル積](#def-tsp4-local-map) の作用を積の基底上で二回計算すると

$$
(\bigotimes_a B_a)(\bigotimes_a A_a)
(e_{i_1}\otimes e_{i_2}\otimes e_{i_3})
=\bigotimes_a B_aA_ae_{i_a}.
$$

左右は線形写像で、全ての積の基底上で一致するので全入力で一致します。従って

$$
u=(\bigotimes_a B_a)s
=(\bigotimes_a(B_aA_a))t.
$$

[テンソルの制限](#def-tsp4-restriction) の条件を満たすので $u\preceq t$ です。
<!-- solution-end -->

### Level C

<a id="ex-tsp4-c01"></a>

#### TSP4-C01 平坦化の上界だけでは取り出せない
- Level: C
- ID: TSP4-C01

四つの $K^2$ のテンソル積で $E_{ijkl}=e_i\otimes e_j\otimes e_k\otimes e_l$ とし、

$$
t=E_{2111}+E_{1211}+E_{1121}+E_{1112}
$$

とします。各一位置を行とする平坦化の階数が2であることを示し、劣階数を求めてください。前講までの結果と本講の単調性を用いて構いません。

<!-- solution-start -->
##### 詳細解答

各位置を行とする平坦化では、行1に残り三位置のうち一つだけが2である三列に1が入り、行2には残り三位置が全て1である列だけに1が入ります。後者の列は $(0,1)^{\mathsf T}$、前者のいずれかは $(1,0)^{\mathsf T}$ です。行数2なので階数は2です。

[劣階数の基本評価](#thm-tsp4-subrank-bounds) から非零の $t$ に対し $1\le Q_K(t)\le2$。

もし $D_2\preceq t$ なら各写像 $A_a:K^2\to K^2$ が存在します。第 $a$ 位置を行とする平坦化に [制限による階数の単調性](#thm-tsp4-restriction-bounds) を適用すると、出力の列は全て $A_a$ の像に属します。

出力 $D_2$ の平坦化は階数2なので、その像は二次元全体です。従って四つの $A_a$ は全て可逆で、逆向きの制限も得られます。

すると $R_K(t)=R_K(D_2)=2$ です。

ここで第4因子だけを $e_1\mapsto1,\ e_2\mapsto0$ で $K$ へ写し、他は恒等写像とします。第四因子が1の三項だけ残り、出力は

$$
w\otimes1,\qquad
w=E_{211}+E_{121}+E_{112}.
$$

仮に $R_K(t)=2$ なら、最短分解の第4因子の像は各項であるスカラー $c_h\in K$ になります。$K$ との積を取り除く写像を、積の基底に対し $E_{ijk}\otimes1\mapsto E_{ijk}$ と線形に指定すると、出力の二項はそれぞれ $c_h u_h\otimes v_h\otimes z_h$ となります。

よって $w$ は高々二項の積の和です。しかし [三因子の階数3の例](../TSP2/index.md#thm-tsp2-three-factor-rank) から $R_K(w)=3$ で矛盾します。

従って $Q_K(t)\ne2$ であり、結論は $Q_K(t)=1$ です。一位置ずつの平坦化の階数が全て2であっても、それらの上界は達成されないことが分かります。
<!-- solution-end -->

## 7. 次に進む

階数は対角テンソルから作る最小の番号数、劣階数は対角テンソルを取り出せる最大の番号数です。次講ではこの比較を、テンソルを足し合わせる操作と掛け合わせる操作に結び付けます。
