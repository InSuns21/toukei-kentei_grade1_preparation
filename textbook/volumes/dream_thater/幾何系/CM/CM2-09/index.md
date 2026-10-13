# CM2-09 Hermite計量と局所表示

<!-- definition-example-audit: strict -->

## 1. 正則束に「長さ」を入れると何が変わるか

これまで[正則ベクトル束](../CM2-07/index.md#def-cm2-07-holomorphic-vector-bundle)は、局所枠 $\mathcal E_i=(e_{i1},\ldots,e_{ir})$ と正則遷移行列 $\mathcal E_j=\mathcal E_iG_{ij}$ で記述した。しかし遷移行列だけでは、同じ繊維の二つのベクトルの長さや角度を比較できない。例えば $\mathbb C$ 上で基底を $e'=2e$ と換えれば係数は半分になるが、同じベクトルの長さは変わってはならない。

各繊維へ内積を入れ、それを基点に関して滑らかに変化させたものが **Hermite計量**である。正則束の枠そのものは正則に選ぶ一方、計量の係数は一般に滑らかであって正則ではない。この区別が、次章のChern接続に至る出発点になる。

以下では、内積 $h(v,w)$ は **第一変数について共役線形、第二変数について複素線形**という約束を固定する。局所係数ベクトルは列として書き、行列の随伴を $A^*=\overline A^{\mathsf T}$ と表す。一般の正則枠の交換はユニタリ行列である必要はない。

## 2. 繊維の内積と正値Hermite行列

<a id="def-cm2-09-hermitian-metric"></a>

<!-- formal-statement-start -->
> **定義（正則ベクトル束上のHermite計量）**  
> 複素多様体 $X$ 上の階数 $r\ge1$ の正則ベクトル束 $\pi:E\to X$ に対し、各 $x\in X$ の繊維 $E_x$ に写像 $h_x:E_x\times E_x\to\mathbb C$ を与える。全ての $u,v,w\in E_x$ と $a,b\in\mathbb C$ に対して
>
> - $h_x(au+bv,w)=\overline a h_x(u,w)+\overline b h_x(v,w)$、
> - $h_x(u,av+bw)=a h_x(u,v)+b h_x(u,w)$、
> - $h_x(v,u)=\overline{h_x(u,v)}$、
> - $v\ne0$ なら $h_x(v,v)>0$
>
> が成立し、任意の正則局所枠 $(e_{i1},\ldots,e_{ir})$ に関する $h_x(e_{ia}(x),e_{ib}(x))$ が基点 $x$ の滑らかな関数なら、$h$ を **滑らかなHermite計量**と呼ぶ。計量が定めるノルムは $\|v\|_{h,x}=\sqrt{h_x(v,v)}$ である。
<!-- formal-statement-end -->

正値性は、任意の**非零の複素係数列**に対して確認する。実係数だけを調べても複素内積の正値性を保証したことにはならない。

<!-- definition-example-start: def-cm2-09-hermitian-metric -->
**定義の確認**。自明束 $E=\mathbb C\times\mathbb C^2$ の標準枠で

$$
H(z)=\begin{pmatrix}1+|z|^2&\overline z\\z&1\end{pmatrix},
\qquad
B(z)=\begin{pmatrix}1&0\\z&1\end{pmatrix}
$$

と取ると、$H=B^*B$ が直接の行列積で確認できる。任意の $v=(v_1,v_2)^{\mathsf T}\ne0$ に対し

$$
v^*Hv=(Bv)^*(Bv)
=|v_1|^2+|zv_1+v_2|^2>0.
$$

> 最後の不等式は $B$ が行列式 $1$ を持ち可逆だから成立する。成分は $z,\overline z$ の滑らかな関数であり、$H^*=H$。これで定義の全条件を検証した。なお $H$ の成分 $\overline z$ は正則関数ではない。
<!-- definition-example-end -->

<a id="def-cm2-09-metric-matrix"></a>

<!-- formal-statement-start -->
> **定義（Hermite計量の局所行列）**  
> 正則局所枠 $\mathcal E_i=(e_{i1},\ldots,e_{ir})$ に対して

$$
(H_i)_{ab}(x)=h_x(e_{ia}(x),e_{ib}(x))
$$

> と置く。$H_i(x)=H_i(x)^*$ かつ $v^*H_i(x)v>0$（$v\ne0$）であり、局所切断 $s=\mathcal E_iv$、$t=\mathcal E_iw$ の内積は

$$
h(s,t)=v^*H_iw
$$

> で与えられる。この正値Hermite行列値関数を計量の局所行列と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm2-09-metric-matrix -->
**定義の確認**。$H=\operatorname{diag}(2,3)$ で $s=e_1+ie_2$、$t=2e_1-e_2$ とすると、係数は $v=(1,i)^{\mathsf T}$、$w=(2,-1)^{\mathsf T}$。したがって

$$
h(s,t)=(1,-i)
\begin{pmatrix}2&0\\0&3\end{pmatrix}
\binom{2}{-1}=4+3i,
\qquad h(s,s)=2+3=5.
$$

> $h(t,s)=4-3i=\overline{h(s,t)}$ も成立する。
<!-- definition-example-end -->

## 3. 枠を変えても長さは変わらない

$\mathcal E_j=\mathcal E_iG_{ij}$ なら、[切断係数の変換則](../CM2-07/index.md#def-cm2-07-holomorphic-section)から $v_i=G_{ij}v_j$。したがって、局所行列を単に $G_{ij}^{-1}H_iG_{ij}$ とするのは誤りである。内積の第一変数が共役線形であるため、左側に随伴が現れる。

<a id="prop-cm2-09-frame-transform"></a>

<!-- formal-statement-start -->
> **命題（Hermite行列の枠変更則と座標不変性）**  
> $E\to X$ を階数 $r$ の正則束、$h$ を滑らかなHermite計量とする。重なり $U_i\cap U_j$ で正則局所枠が $\mathcal E_j=\mathcal E_iG_{ij}$ と変わるなら

$$
H_j=G_{ij}^*H_iG_{ij}.
$$

> 逆に、被覆上の滑らかな正値Hermite行列 $H_i$ がこの関係を満たせば、束全体に一意なHermite計量を定める。特に任意の切断 $s=\mathcal E_iv_i=\mathcal E_jv_j$ の長さは局所枠によらない。
<!-- formal-statement-end -->

### 証明の見取り図

新しい基底の各列を旧基底で展開し、内積の二つの変数へ代入する。逆向きは、枠に依存しない値を局所表示で定めて貼り合わせる。

<!-- proof-start -->
### 証明

$j$ 側の第 $a,b$ 基底に対し

$$
e_{ja}=\sum_c e_{ic}(G_{ij})_{ca},
\qquad
e_{jb}=\sum_d e_{id}(G_{ij})_{db}.
$$

内積の共役線形性・線形性を一段ずつ使うと

$$
h(e_{ja},e_{jb})
=\sum_{c,d}\overline{(G_{ij})_{ca}}\,
h(e_{ic},e_{id})(G_{ij})_{db}
=(G_{ij}^*H_iG_{ij})_{ab}.
$$

また $v_i=G_{ij}v_j$ なので

$$
v_i^*H_iv_i
=v_j^*G_{ij}^*H_iG_{ij}v_j
=v_j^*H_jv_j.
$$

逆に局所正値行列 $H_i$ を用いて $h_x(\mathcal E_iv,\mathcal E_iw)=v^*H_i(x)w$ と定める。別の枠では $v_i=G_{ij}v_j$、$w_i=G_{ij}w_j$ だから

$$
v_i^*H_iw_i
=v_j^*G_{ij}^*H_iG_{ij}w_j
=v_j^*H_jw_j.
$$

従って値は一致し、各繊維の内積が貼り合う。各 $H_i$ は滑らかで、可逆な $G_{ij}$ による合同変換は正値性を保つ。全ての局所式が一つの滑らかな計量を定め、局所枠が各繊維の基底だから一意である。$\square$
<!-- proof-end -->

例えば階数一の線束で $e_j=g_{ij}e_i$ なら、$h_i=h(e_i,e_i)$ は正の実関数、$h_j=|g_{ij}|^2h_i$ となる。$e_j=ze_i$ とした重なり $\mathbb C^\times$ で、$h_i=1$ なら $h_j=|z|^2$。**遷移関数が正則でも計量係数に絶対値が入る**。

## 4. 局所の内積を大域へ貼る

正則束には、一般に正則な大域枠がない。しかし計量を作るために大域正則枠は要らない。基点について滑らかに変わる重みを用い、局所内積を混合できる。

<a id="thm-cm2-09-existence"></a>

<!-- formal-statement-start -->
> **定理（正則ベクトル束上のHermite計量の存在）**  
> $X$ をHausdorffかつ第二可算な複素多様体、$E\to X$ を有限階数 $r\ge1$ の正則ベクトル束とする。このとき $E$ には滑らかなHermite計量が存在する。大域正則枠の存在は仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

各正則局所自明化上で標準内積を定め、[滑らかな1の分割](../../GEO/GEO4/index.md#thm-geo4-partition-of-unity)を掛ける。局所有限和なら滑らかで、少なくとも一つの正重みがあるので正値性も保たれる。

<!-- proof-start -->
### 証明

局所正則枠を持つ開被覆 $(U_i)$ を選ぶ。各 $U_i$ の局所枠 $\mathcal E_i$ に対し、$s=\mathcal E_iv$、$t=\mathcal E_iw$ のとき

$$
h^{(i)}_x(s,t)=v^*w
$$

と置く。これは $E|_{U_i}$ の繊維に関する正値内積であり、基点について滑らかである。Hausdorff・第二可算な複素多様体の基礎実多様体には[従属する滑らかな1の分割](../../GEO/GEO4/index.md#thm-geo4-partition-of-unity)がある。従って、必要なら被覆を細分して、$(U_i)$ に従属する非負の滑らかな関数 $(\varphi_i)$ を局所有限に選び、

$$
\operatorname{supp}\varphi_i\subset U_i,
\qquad
\sum_i\varphi_i(x)=1
$$

を満たすようにできる。$x\in X$ の繊維で

$$
h_x(s,t)=\sum_{i:x\in U_i}\varphi_i(x)h^{(i)}_x(s,t)
$$

と置き、各項は $\varphi_i=0$ の領域で零と延長する。$\operatorname{supp}\varphi_i\subset U_i$ により延長は局所的に滑らかであり、局所有限性から和も局所的には有限個の滑らかな項の和である。共役線形性・線形性・共役対称性は各項から従う。

$v\ne0$ のとき、$\sum_i\varphi_i(x)=1$ だから、少なくとも一つの $\varphi_i(x)>0$ がある。その $i$ では $h^{(i)}_x(v,v)>0$、残りは非負なので

$$
h_x(v,v)=\sum_i\varphi_i(x)h^{(i)}_x(v,v)>0.
$$

よって $h$ は全点で正値な滑らかなHermite計量である。$\square$
<!-- proof-end -->

ここで作るのは**滑らかな**計量である。分割の重みは通常正則ではないし、正則である必要もない。射影直線上の非自明な線束にも計量が入ることと、大域非零正則切断が存在しないことは矛盾しない。

## 5. 射影直線の普遍線束：局所枠と計量を一緒に計算する

[射影直線の普遍線束](../CM2-06/index.md#def-cm2-06-tautological-bundle) $S=\mathcal O(-1)$ を、$\mathbb C^2$ の標準内積からの制限で計量化する。$U_0$ の座標を $z=Z_1/Z_0$、$U_\infty$ の座標を $w=Z_0/Z_1=1/z$ とする。

正則枠は $e_0(z)=(1,z)$、$e_\infty(w)=(w,1)$ であり、重なりでは $e_\infty=z^{-1}e_0$。それぞれを実際にノルムに代入すると

$$
h_0(z)=\|e_0(z)\|^2=1+|z|^2,
\qquad
h_\infty(w)=\|e_\infty(w)\|^2=1+|w|^2.
$$

一方、[枠変更則](#prop-cm2-09-frame-transform)を $g_{0\infty}=z^{-1}$ に適用すると

$$
|g_{0\infty}|^2h_0
=|z|^{-2}(1+|z|^2)
=1+|z|^{-2}
=1+|w|^2=h_\infty.
$$

どちらのチャートでも正値で、重なりで内積が一致する。$\mathcal O(-1)$ に大域正則枠がなくても、**大域Hermite計量は存在する**具体例である。

## 6. 双対・テンソル積・行列式にも計量を入れる

既習の[双対・テンソル・行列式束](../CM2-08/index.md#def-cm2-08-dual-bundle)は、繊維ごとに線形代数で構成した。内積も同様に誘導できるが、**双対の行列はただの逆行列ではない**点が重要である。

<a id="def-cm2-09-induced-metrics"></a>

<!-- formal-statement-start -->
> **定義（誘導Hermite計量）**  
> 正値Hermite計量を持つ階数 $r$ の束 $E$ と階数 $s$ の束 $F$ に対し、各線形汎関数 $\lambda$ に $\lambda(v)=h_E(u_\lambda,v)$ で対応するベクトル $u_\lambda$ を取り、双対の計量を $h_{E^\vee}(\lambda,\mu)=h_E(u_\mu,u_\lambda)$ とする。$E\otimes F$ の計量は純テンソルについて

$$
h_{E\otimes F}(u\otimes v,u'\otimes v')
=h_E(u,u')h_F(v,v')
$$

> として線形に延長する。最高外冪 $\det E$ の計量は $r$ 本のベクトルに対して

$$
h_{\det E}(u_1\wedge\cdots\wedge u_r,
v_1\wedge\cdots\wedge v_r)
=\det\bigl(h_E(u_a,v_b)\bigr)_{a,b=1}^r
$$

> とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm2-09-induced-metrics -->
**定義の確認**。$E$ が階数二で計量行列 $H=\operatorname{diag}(2,3)$ を持つとき、$e_1\wedge e_2$ のノルムの二乗は $\det H=6>0$ である。また、標準双対枠の計量行列は $\operatorname{diag}(1/2,1/3)$ となり、$e^1$ のノルムの二乗は $1/2$ である。いずれも正値である。
<!-- definition-example-end -->

<a id="prop-cm2-09-induced-matrices"></a>

<!-- formal-statement-start -->
> **命題（誘導計量の局所行列）**  
> $E,F$ の正則枠でのHermite行列をそれぞれ $H,K$ とする。対応する双対枠、テンソル積枠、行列式枠での誘導計量行列は順に

$$
H^\vee=(H^{-1})^{\mathsf T},
\qquad
H^{E\otimes F}=H\otimes K,
\qquad
h_{\det E}=\det H.
$$

> 各行列は滑らかで正値、正則枠の遷移行列に関して枠変更則を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

双対の係数は線形汎関数なので転置に注意し、テンソルは基底の対を並べる。行列式は外冪の定義を使う。

<!-- proof-start -->
### 証明

$E$ の枠で線形汎関数 $\lambda$ を $\lambda(v)=a^{\mathsf T}v$ と書く。Riesz対応するベクトル $u$ を $\lambda(v)=h_E(u,v)=u^*Hv$ によって定めると

$$
u^*H=a^{\mathsf T},
\qquad
Hu=\overline a,
\qquad
u=H^{-1}\overline a.
$$

別の $\mu(v)=b^{\mathsf T}v$ に対応するベクトルは $H^{-1}\overline b$ なので、双対計量の内積は

$$
h_{E^\vee}(\lambda,\mu)
=h_E(H^{-1}\overline b,H^{-1}\overline a)
=b^{\mathsf T}H^{-1}\overline a
=a^*(H^{-1})^{\mathsf T}b.
$$

引数を逆順にしたのは、双対計量も第一変数が共役線形になるようにするためである。最後の等号はスカラーの添字を入れ替えて確認できる。$H^{-1}$ がHermite正値なので、その転置もHermite正値である。

[双対遷移](../CM2-08/index.md#prop-cm2-08-dual-evaluation)は $G^\vee=G^{-\mathsf T}$、原束の計量は $H_j=G^*H_iG$。逆と転置をこの順に取ると

$$
(H_j^{-1})^{\mathsf T}
=\overline G^{-1}(H_i^{-1})^{\mathsf T}G^{-\mathsf T}
=(G^\vee)^*H_i^\vee G^\vee.
$$

テンソル積では $(e_a\otimes f_b,e_c\otimes f_d)$ の内積が $H_{ac}K_{bd}$ なので、定義の基底順序で $H\otimes K$ となる。[テンソル積遷移](../CM2-08/index.md#prop-cm2-08-tensor-cocycle)との整合は

$$
(G\otimes L)^*(H\otimes K)(G\otimes L)
=(G^*HG)\otimes(L^*KL)
$$

から分かる。正値性は各正値Hermite行列の正の固有値同士の積が正であること、または正規直交基底への合同変換から従う。行列式束では定義のGram行列が $H$ なので $h_{\det E}=\det H>0$。基底変更で

$$
\det(G^*HG)
=\overline{\det G}\,(\det H)\,\det G
=|\det G|^2\det H.
$$

これは行列式線束の遷移係数 $\det G$ に対する枠変更則である。$\square$
<!-- proof-end -->

特に線束 $L$ の正の計量係数を $h_i$ とすれば、双対線束 $L^\vee$ の係数は $h_i^{-1}$。$\mathcal O(-1)$ の先ほどの計量から、$\mathcal O(1)$ の自然な双対計量は $h_0^\vee=(1+|z|^2)^{-1}$ になる。

## 7. 正則枠のままで計量を微分する

一般の滑らかな計量係数 $H(z,\overline z)$ は正則ではないから、[Dolbeault作用素](../CM2-02/index.md#def-cm2-02-dolbeault-operators)で $\partial H$ と $\bar\partial H$ を区別できる。正則枠の交換 $G$ に対しては、$\partial\overline G^{\mathsf T}=0$ である。この性質により、$H^{-1}\partial H$ はきれいな変換則を持つ。

<a id="prop-cm2-09-log-derivative"></a>

<!-- formal-statement-start -->
> **命題（計量行列の対数微分の変換則）**  
> $E$ の正則局所枠の重なりで $\mathcal E_j=\mathcal E_iG_{ij}$、$H_j=G_{ij}^*H_iG_{ij}$ とし、$G_{ij}$ を正則な可逆行列値関数とする。局所行列値 $(1,0)$ 形式を $A_i=H_i^{-1}\partial H_i$ と置く。このとき

$$
A_j=G_{ij}^{-1}A_iG_{ij}
+G_{ij}^{-1}\partial G_{ij}.
$$

> 階数一では $A_i=\partial\log h_i$ となり、$A_j=A_i+g_{ij}^{-1}\partial g_{ij}$ を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

正則 $G$ の複素共役は反正則だから $\partial G^*=0$。積の微分を二項へ分け、$H_j^{-1}$ を左から掛けて約分する。

<!-- proof-start -->
### 証明

[局所微分公式](../CM2-02/index.md#thm-cm2-02-local-formula)を各行列成分へ適用し、$G$ が正則なので $\partial G^*=\partial\overline G^{\mathsf T}=0$ とする。従って積の微分は

$$
\partial H_j
=\partial(G^*H_iG)
=G^*(\partial H_i)G+G^*H_i(\partial G).
$$

ここで $G=G_{ij}$ と略した。可逆行列の積の逆を逆順に取り、

$$
H_j^{-1}=(G^*H_iG)^{-1}
=G^{-1}H_i^{-1}(G^*)^{-1}.
$$

左から掛けると

$$
\begin{aligned}
H_j^{-1}\partial H_j
&=G^{-1}H_i^{-1}(G^*)^{-1}
\bigl(G^*(\partial H_i)G+G^*H_i\partial G\bigr)\\
&=G^{-1}H_i^{-1}(\partial H_i)G
+G^{-1}H_i^{-1}H_i\partial G\\
&=G^{-1}A_iG+G^{-1}\partial G.
\end{aligned}
$$

階数一では $h_i>0$ だから $\partial\log h_i=h_i^{-1}\partial h_i$。スカラーは交換するので、最初の項は $A_i$ となる。$\square$
<!-- proof-end -->

線束の $g$ が正則でない場合、$\partial\overline g\ne0$ の項が上の証明に残る。この変換則は**正則枠**で計算したから成立する。次章ではこの $A_i$ を使って、正則構造と計量の双方を保つ接続を構成する。

## 8. 滑らかな正規直交枠と正則枠を区別する

任意の点の近傍で滑らかな正値行列 $H$ は、例えば滑らかなGram–Schmidt直交化により $H=B^*B$ と分解できる。枠を $\mathcal E'=\mathcal EB^{-1}$ に換えれば、新しい計量行列は

$$
H'=(B^{-1})^*HB^{-1}=I_r.
$$

ただし $B$ は一般に $z,\overline z$ に依存し、**新枠は滑らかでも正則とは限らない**。この違いを線束で検査する。

<a id="prop-cm2-09-holomorphic-unit-obstruction"></a>

<!-- formal-statement-start -->
> **命題（正則な単位枠が存在しない計量の例）**  
> 円板 $D\subset\mathbb C$ 上の自明な正則線束 $D\times\mathbb C$ の標準正則枠 $e$ に $h(e,e)=1+|z|^2$ を与える。このとき、$D$ のどの非空開部分集合にも正則な単位枠 $e'=fe$（$f$ は零点を持たない正則関数）は存在しない。
<!-- formal-statement-end -->

### 証明の見取り図

もし正則な単位枠があれば $|f|^2(1+|z|^2)=1$。一方、零点を持たない正則関数の絶対値の対数は局所的に調和的だが、$\log(1+|z|^2)$ の混合偏導関数は零ではない。

<!-- proof-start -->
### 証明

正則な単位枠 $e'=fe$ があるとすると、[線束の枠変更則](#prop-cm2-09-frame-transform)から

$$
1=h(e',e')=|f|^2(1+|z|^2).
$$

両辺は正だから実対数を取れ、

$$
\log|f|^2+\log(1+|z|^2)=0.
$$

$f$ が非零正則なら各点の小円板で正則な $\log f$ を取り、$\log|f|^2=\log f+\overline{\log f}$。従って $\partial_z\partial_{\overline z}\log|f|^2=0$。他方、$z$ と $\overline z$ をWirtinger微分で独立な変数として扱えば

$$
\partial_{\overline z}\log(1+z\overline z)
=\frac{z}{1+z\overline z},
$$

$$
\partial_z\left(\frac{z}{1+z\overline z}\right)
=\frac{1+z\overline z-z\overline z}{(1+z\overline z)^2}
=\frac{1}{(1+|z|^2)^2}>0.
$$

これは前の対数等式を混合微分した結果の零と矛盾する。したがってそのような正則な単位枠は存在しない。$\square$
<!-- proof-end -->

**滑らかに内積を標準化できること**と**正則な標準化ができること**は別の主張である。計量と正則構造の双方を尊重する微分法が必要になる理由が、既にこの一変数の例に現れている。

## 9. 演習：正値性・枠変更・誘導計量・微分

### Level A

<a id="ex-cm2-09-a01"></a>
#### CM2-09-A01 正値性を分解で確かめる
- Level: A

$\mathbb C$ 上の自明階数二束に、$H(z)=\begin{pmatrix}1+|z|^2&\overline z\\ z&1\end{pmatrix}$ を与える。$H^*=H$、$\det H=1$ と任意の非零複素係数列に対する正値性を示せ。

<!-- solution-start -->
**詳細解答**。転置と複素共役を取ると $(H^*)_{12}=\overline{H_{21}}=\overline z$、$(H^*)_{21}=z$、対角成分は実数である。よって $H^*=H$。行列式は

$$
\det H=(1+|z|^2)\cdot1-\overline z z=1.
$$

$B=\begin{pmatrix}1&0\\z&1\end{pmatrix}$ と置けば直接の積で $H=B^*B$。$v=(a,b)^{\mathsf T}$ に対し

$$
v^*Hv=|a|^2+|za+b|^2.
$$

両項が零なら $a=0$、続いて $b=0$ だから、非零 $v$ では和が正である。成分は実変数 $\operatorname{Re}z,\operatorname{Im}z$ の多項式で滑らか。したがって[Hermite計量の定義](#def-cm2-09-hermitian-metric)を満たす。
<!-- solution-end -->

<a id="ex-cm2-09-a02"></a>
#### CM2-09-A02 基底変更後のノルム
- Level: A

ある局所枠で $H_i=\operatorname{diag}(2,1)$、枠変更が $G_{ij}=\begin{pmatrix}1&z\\0&1\end{pmatrix}$ とする。$H_j$ を求め、$v_j=(1,i)^{\mathsf T}$ のノルムの二乗が二つの枠で一致することを計算せよ。

<!-- solution-start -->
**詳細解答**。[枠変更則](#prop-cm2-09-frame-transform)から

$$
H_iG_{ij}=\begin{pmatrix}2&2z\\0&1\end{pmatrix},
\qquad
G_{ij}^*=\begin{pmatrix}1&0\\\overline z&1\end{pmatrix}.
$$

従って

$$
H_j=\begin{pmatrix}2&2z\\2\overline z&1+2|z|^2\end{pmatrix}.
$$

直接計算すると $v_j^*H_jv_j=2+2iz-2i\overline z+1+2|z|^2$。一方 $v_i=G_{ij}v_j=(1+iz,i)^{\mathsf T}$ なので

$$
v_i^*H_iv_i=2|1+iz|^2+1
=2(1+|z|^2+iz-i\overline z)+1.
$$

二つは同じ値で、さらに $2|1+iz|^2+1>0$ である。
<!-- solution-end -->

<a id="ex-cm2-09-a03"></a>
#### CM2-09-A03 線束の計量を無限遠へ移す
- Level: A

$\mathbb{CP}^1$ 上の線束 $\mathcal O(-1)$ について、$e_\infty=z^{-1}e_0$、$h_0(z)=1+|z|^2$ とする。$w=1/z$ を用いて $h_\infty(w)$ を求め、$w=0$ での正値性を確認せよ。

<!-- solution-start -->
**詳細解答**。線束の[枠変更則](#prop-cm2-09-frame-transform)では $h_\infty=|g|^2h_0$、$g=z^{-1}$。従って

$$
h_\infty(w)=|z|^{-2}(1+|z|^2)
=1+|z|^{-2}=1+|w|^2.
$$

これは無限遠チャートの全域で滑らかな正関数であり、$h_\infty(0)=1>0$ である。$h_0$ と重なりで一致するので大域計量になる。
<!-- solution-end -->

<a id="ex-cm2-09-a04"></a>
#### CM2-09-A04 双対枠の計量行列
- Level: A

$H=\begin{pmatrix}2&i\\-i&1\end{pmatrix}$ をHermite行列とする。正値性を確かめ、双対枠での誘導計量 $H^\vee$ を求めよ。

<!-- solution-start -->
**詳細解答**。対角成分が実、非対角成分が互いに複素共役なので $H^*=H$。任意の $(a,b)^{\mathsf T}$ に対して

$$
(a,b)^*H(a,b)=2\left|a+\frac{i}{2}b\right|^2+\frac12|b|^2.
$$

この式は $2|a|^2+i\overline a b-i\overline b a+|b|^2$ へ展開できるから、非零列で正である。$\det H=2-i(-i)=1$ なので

$$
H^{-1}=\begin{pmatrix}1&-i\\i&2\end{pmatrix},
\qquad
H^\vee=(H^{-1})^{\mathsf T}
=\begin{pmatrix}1&i\\-i&2\end{pmatrix}.
$$

[誘導計量の公式](#prop-cm2-09-induced-matrices)により、これが双対枠の正値Hermite行列である。
<!-- solution-end -->

<a id="ex-cm2-09-a05"></a>
#### CM2-09-A05 テンソル積と行列式の計量
- Level: A

階数二束 $E$ の計量行列を $\operatorname{diag}(2,3)$、線束 $L$ の計量係数を $5$ とする。$E\otimes L$ の計量行列と $\det E$ の計量係数を求めよ。

<!-- solution-start -->
**詳細解答**。[誘導計量の公式](#prop-cm2-09-induced-matrices)を各繊維の局所基底に適用する。線束の行列は $(5)$ なので

$$
H^{E\otimes L}
=\begin{pmatrix}2&0\\0&3\end{pmatrix}\otimes(5)
=\begin{pmatrix}10&0\\0&15\end{pmatrix}.
$$

その正値性は $10,15>0$ から分かる。行列式線束の生成元 $e_1\wedge e_2$ のノルムの二乗は

$$
h_{\det E}=\det\begin{pmatrix}2&0\\0&3\end{pmatrix}=6>0.
$$

前者の階数は $2$、後者の階数は $1$ である。
<!-- solution-end -->

### Level B

<a id="ex-cm2-09-b01"></a>
#### CM2-09-B01 非自明な線束の計量を手で貼る
- Level: B

$S=\mathcal O(-1)$ の二チャートで $e_\infty=z^{-1}e_0$ とする。$\chi:\mathbb C\to[0,1]$ は滑らかで、$|z|\le1$ なら $1$、$|z|\ge2$ なら $0$ とする。$U_0$ 上の正関数を

$$
h_0(z)=\chi(z)+(1-\chi(z))|z|^2
$$

と定める。これが $U_\infty$ に滑らかで正の計量を定めることを示せ。

<!-- solution-start -->
**詳細解答**。$|z|\le1$ では $\chi=1$ だから $h_0=1$。$|z|>0$ では $|z|^2>0$ であり、$\chi+(1-\chi)|z|^2$ は二つの正値 $1,|z|^2$ の非負重みの和（重みの和が $1$）だから正である。従って $U_0$ 全体で滑らかに正。

重なりで[線束の枠変更則](#prop-cm2-09-frame-transform)を適用すると

$$
h_\infty(w)
=|z|^{-2}h_0(z)
=|z|^{-2}\chi(z)+1-\chi(z),
\qquad z=1/w.
$$

$|z|\ge2$、すなわち $0<|w|\le1/2$ では $\chi(z)=0$。ゆえに $h_\infty(w)=1$ となり、$w=0$ へ値 $1$ で滑らかに延長できる。その他の $w\ne0$ では $|z|^{-2}>0$ で正である。こうして大域計量を具体的に貼り合わせられ、[正則大域枠の非存在](../CM2-06/index.md#thm-cm2-06-tautological-nontrivial)とは矛盾しない。
<!-- solution-end -->

<a id="ex-cm2-09-b02"></a>
#### CM2-09-B02 正則な単位枠は作れるか
- Level: B

円板 $D\subset\mathbb C$ 上の自明な線束の正則枠 $e$ に $h(e,e)=e^{|z|^2}$ を与える。滑らかな単位枠を一つ構成し、どの非空開集合にも正則な単位枠が存在しないことを証明せよ。

<!-- solution-start -->
**詳細解答**。$e'=e^{-|z|^2/2}e$ と置けば、係数は滑らかで零にならず、[枠変更則](#prop-cm2-09-frame-transform)によって

$$
h(e',e')=e^{-|z|^2}e^{|z|^2}=1.
$$

一方、正則な単位枠 $e''=fe$ があれば、$f$ は零点のない正則関数で $|f|^2e^{|z|^2}=1$。対数から

$$
\log|f|^2=-|z|^2=-z\overline z.
$$

正則 $f$ は各点近傍で正則対数を持つから $\partial_z\partial_{\overline z}\log|f|^2=0$。右辺は $\partial_{\overline z}(-z\overline z)=-z$ をさらに $\partial_z$ で微分すると $-1$ であり、矛盾する。従って滑らかな単位枠はあるが正則な単位枠はない。
<!-- solution-end -->

<a id="ex-cm2-09-b03"></a>
#### CM2-09-B03 線束の対数微分の二チャート表示
- Level: B

$\mathcal O(-1)$ に $h_0(z)=1+|z|^2$、$h_\infty(w)=1+|w|^2$、$g_{0\infty}(z)=z^{-1}$ を与える。$A_0=\partial\log h_0$ と $A_\infty=\partial\log h_\infty$ をそれぞれの座標で計算し、重なりで $A_\infty=A_0+g^{-1}\partial g$ を確かめよ。

<!-- solution-start -->
**詳細解答**。[局所微分公式](../CM2-02/index.md#thm-cm2-02-local-formula)より

$$
A_0=\frac{\overline z}{1+|z|^2}\,dz,
\qquad
A_\infty=\frac{\overline w}{1+|w|^2}\,dw.
$$

また $g=z^{-1}$ なので $\partial g=-z^{-2}dz$、$g^{-1}\partial g=-z^{-1}dz$。差を計算すると

$$
A_0+g^{-1}\partial g
=\left(\frac{\overline z}{1+|z|^2}-\frac1z\right)dz
=-\frac{1}{z(1+|z|^2)}\,dz.
$$

$z=1/w$、$dz=-w^{-2}dw$、$1+|z|^2=(1+|w|^2)/|w|^2$ を一つずつ代入すると

$$
-\frac{1}{z(1+|z|^2)}\,dz
=\frac{w^{-1}|w|^2}{1+|w|^2}\,dw
=\frac{\overline w}{1+|w|^2}\,dw=A_\infty.
$$

これは[対数微分の変換則](#prop-cm2-09-log-derivative)を二チャートで直接検証したものである。
<!-- solution-end -->

<a id="ex-cm2-09-b04"></a>
#### CM2-09-B04 双対計量と枠変更の整合
- Level: B

自明階数二束に $H_i=\operatorname{diag}(2,3)$ を与え、枠を $\mathcal E_j=\mathcal E_iG$、$G=\operatorname{diag}(z,1)$（$z\ne0$）と交換する。$H_j$、$H_i^\vee$、$H_j^\vee$ を求め、$G^\vee=G^{-\mathsf T}$ による双対枠変更則を確認せよ。

<!-- solution-start -->
**詳細解答**。原束では[枠変更則](#prop-cm2-09-frame-transform)から

$$
H_j=G^*H_iG
=\operatorname{diag}(2|z|^2,3).
$$

[誘導計量行列](#prop-cm2-09-induced-matrices)より、対角行列は転置しても同じだから

$$
H_i^\vee=\operatorname{diag}(1/2,1/3),
\quad
H_j^\vee=\operatorname{diag}(1/(2|z|^2),1/3).
$$

一方 $G^\vee=\operatorname{diag}(z^{-1},1)$ であり、

$$
(G^\vee)^*H_i^\vee G^\vee
=\operatorname{diag}(\overline z^{-1},1)
\operatorname{diag}(1/2,1/3)
\operatorname{diag}(z^{-1},1)
=H_j^\vee.
$$

双対の座標でも同じ内積が得られる。特に複素数 $z$ では $z^{-2}$ でなく $|z|^{-2}$ が現れる。
<!-- solution-end -->

### Level C

<a id="ex-cm2-09-c01"></a>
#### CM2-09-C01 普遍線束・双対計量・局所微分を総合する
- Level: C

$\mathbb{CP}^1$ の普遍線束 $S=\mathcal O(-1)$ を標準内積で計量化する。$U_0$ の座標を $z=Z_1/Z_0$、$U_\infty$ を $w=Z_0/Z_1$ とする。

1. 正則枠 $e_0=(1,z)$、$e_\infty=(w,1)$ の遷移係数と計量係数を求め、内積が貼り合うことを示せ。
2. 双対束 $S^\vee$ の遷移係数と誘導計量を両チャートで求めよ。
3. $S$ の対数微分 $A_0,A_\infty$ を求め、枠変更則を二チャートで確認せよ。
4. $\partial_z\partial_{\overline z}\log h_0$ を求め、どの非空開集合にも正則な単位枠が存在しないことを示せ。

<!-- solution-start -->
**詳細解答**。

(1) $e_\infty(w)=(1/z,1)=z^{-1}(1,z)=z^{-1}e_0$ だから、$g_{0\infty}=z^{-1}$。標準内積に代入すると

$$
h_0(z)=1+|z|^2,\qquad
h_\infty(w)=1+|w|^2.
$$

さらに

$$
|g_{0\infty}|^2h_0
=|z|^{-2}(1+|z|^2)
=1+|w|^2=h_\infty,
$$

で、[計量の貼り合わせ命題](#prop-cm2-09-frame-transform)の仮定が成立する。

(2) [双対遷移の命題](../CM2-08/index.md#prop-cm2-08-dual-evaluation)は線束では $g^\vee=g^{-1}$ なので $g^\vee_{0\infty}=z$。[双対計量行列](#prop-cm2-09-induced-matrices)は階数一で逆数だから

$$
h_0^\vee(z)=\frac{1}{1+|z|^2},
\qquad
h_\infty^\vee(w)=\frac{1}{1+|w|^2}.
$$

実際、$|g^\vee|^2h_0^\vee=|z|^2/(1+|z|^2)=1/(1+|w|^2)=h_\infty^\vee$ である。

(3) $h_0$ の $z$ 微分は $\partial_z h_0=\overline z$ なので

$$
A_0=h_0^{-1}\partial h_0
=\frac{\overline z}{1+|z|^2}\,dz.
$$

同様に $A_\infty=\overline w(1+|w|^2)^{-1}dw$。$g=z^{-1}$ を微分すると $g^{-1}\partial g=-dz/z$ だから

$$
A_0+g^{-1}\partial g
=\left(\frac{\overline z}{1+|z|^2}-\frac1z\right)dz
=-\frac{dz}{z(1+|z|^2)}.
$$

$z=w^{-1}$、$dz=-w^{-2}dw$ を代入すれば、上式は $\overline w(1+|w|^2)^{-1}dw=A_\infty$ になる。[対数微分の変換則](#prop-cm2-09-log-derivative)を具体的に確認できた。

(4) [Wirtinger微分](../CM2-02/index.md#def-cm2-02-wirtinger-operators)に従い

$$
\partial_{\overline z}\log h_0
=\frac{z}{1+z\overline z},
\quad
\partial_z\partial_{\overline z}\log h_0
=\frac{1+z\overline z-z\overline z}{(1+z\overline z)^2}
=\frac{1}{(1+|z|^2)^2}.
$$

これは全点で正であり、零ではない。正則単位枠 $e'=fe_0$ がどこかの非空開集合にあれば $|f|^2h_0=1$、かつ非零正則 $f$ について $\partial_z\partial_{\overline z}\log|f|^2=0$ である。対数を取り混合微分すると $0+1/(1+|z|^2)^2=0$ となり矛盾する。従って滑らかな計量があっても正則な単位枠は存在しない。
<!-- solution-end -->

## 10. 次章：長さを保つ微分の作り方

Hermite計量は滑らかな正値行列 $H_i$ とその合同変換則で記述でき、正則枠を交換すると $H_i^{-1}\partial H_i$ は単純な行列の共役変換だけでなく、$G^{-1}\partial G$ を伴うと分かった。次章ではこれを微分作用素の局所表示として使い、正則構造と計量に両立するChern接続の存在と一意性を証明する。
