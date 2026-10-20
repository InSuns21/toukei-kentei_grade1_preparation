# HPDE14 局所parametrixの誤差補正

[HPDE13の有限Hadamard和の残差恒等式](../HPDE13/index.md#prop-hpde13-truncated-defect)は、点源を除いたところにも残りがあることを示しました。次数を増やしても「各有限段階で残差が零」にはなりません。また形式級数には収束の保証がありません。そこで **形式級数 → 滑らかな残差を持つ近似核 → 残差を消した真の核** という二つの障害を別々に除きます。

4次元の時間向き付きLorentz多様体 $(M,g)$（計量符号 $(-,+,+,+)$）上の有限ランクの滑らかな実・複素束 $E$ と、[HPDE5の接続表示](../HPDE5/index.md#thm-hpde5-unique-connection)

$$
P=-\operatorname{tr}_g\nabla^2+B
$$

を用います。形式的自己随伴性は仮定しません。点 $y$ の小さい凸正規近傍を取り、必要ならその中の相対コンパクトな因果凸な時間領域 $D$ へ縮めます。$x,y\in D$ に対し[HPDE13で定義した世界関数](../HPDE13/index.md#def-hpde13-world-function) $\sigma(x,y)$ と

$$
q(x,y)=-2\sigma(x,y)
$$

を使います。$q>0$ は時間的な領域、$q=0$ は光円錐です。[HPDE13のRiesz分布](../HPDE13/index.md#def-hpde13-riesz)を $R_+(2k+2,x;y)$、[Hadamard係数](../HPDE13/index.md#def-hpde13-hadamard-coefficients)を $V_k(x,y)\in\operatorname{Hom}(E_y,E_x)$ と記します。以下は未来側（遅延）で導出し、過去側は時間を反転します。分布と点源の束の意味は[HPDE3の点源](../HPDE3/index.md#def-hpde3-point-source)に従います。

## 1. 近似核には何を要求するのか

例えばMinkowski時空の $P_0=\partial_t^2-\Delta$ では、[HPDE12の3+1次元基本解](../HPDE12/index.md#thm-hpde12-three-dimensional)が厳密に $P_0R_+(2)=\delta_y$ を満たします。曲率や零次項を含む $P$ に対しては、この等式をただ書き写せません。最初に要求するのは、誤差が**滑らかな関数**になることです。

<a id="def-hpde14-local-parametrix"></a>
<!-- formal-statement-start -->
> **定義（因果的な局所近似基本解）**  
> $D$ を4次元の時間向き付きLorentz多様体の因果凸な比較的小さい開領域、$P$ を上記のnormally hyperbolic作用素とする。$D\times D$ 上の二変数束値分布核 $S_+(x,y):E_y\to E_x$ が、各固定した $y$ について

$$
P_xS_+(x,y)=\delta_y\operatorname{id}_{E_y}+F_+(x,y)
$$

> を分布として満たし、$F_+\in C^\infty(D\times D,\operatorname{Hom}(E_y,E_x))$ であり、$S_+(\,\cdot\,,y)$ と $F_+(\,\cdot\,,y)$ の支持がともに $J_D^+(y)$ に含まれるとき、$S_+$ を**因果的な局所近似基本解（parametrix）**という。$J_D^+(y)$ は $D$ の中の未来因果到達集合であり、核と密度の積分規約は[HPDE4の双対・分布延長](../HPDE4/index.md#prop-hpde4-distribution-extension)に従う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde14-local-parametrix -->
**定義の確認**。$D$ をMinkowskiの小さい因果凸領域とし、$P=P_0$、$E$ を自明なスカラー束とします。$S_+=R_+(2)$ なら、$P_0S_+=\delta_y$、$F_+=0$ です。零関数は滑らかで支持は空集合、$R_+(2)$ は未来光円錐上に支持されます。したがって定義の点源条件・滑らかさ・因果支持をそれぞれ満たします。**残差が零でないparametrix**も定義に入ることが重要です。
<!-- definition-example-end -->

滑らかな残差なら、後で積分作用素として反復できます。反対に $N=0$ のHadamard打切りの残差 $(PV_0)R_+(2)$ は一般には円錐面上の分布であり、「近似だから滑らか」とはいえません。この違いが最初の壁です。

## 2. cutoffを置く場所は光円錐から離す

係数を打ち切る代わりに、**高い次数の項だけを円錐のすぐ近くへ押し込める**方法を使います。関数 $\chi\in C^\infty(\mathbb R)$ を $\chi(s)=1$（$|s|\le1/2$）、$\chi(s)=0$（$|s|\ge1$）となるよう選びます。正数列 $\varepsilon_k\downarrow0$ に対し、$k\ge1$ で

$$
\eta_k(x,y)=\chi\!\left(\frac{q(x,y)}{\varepsilon_k}\right),
\qquad \eta_0=1
$$

と置きます。$\eta_k$ は円錐 $q=0$ の近傍で1なので、$\nabla\eta_k$ が非零になるのは $\varepsilon_k/2<|q|<\varepsilon_k$ に限られます。未来Riesz核との積では $q\ge0$ の部分だけが残るので、寄与し得る領域は $\varepsilon_k/2<q<\varepsilon_k$ です。**光円錐上でcutoffを微分して新しいデルタを作ることを避けている**のです。

<a id="def-hpde14-cutoff-hadamard"></a>
<!-- formal-statement-start -->
> **定義（切断付きHadamard核）**  
> 4次元の凸正規近傍内で、[Hadamard係数](../HPDE13/index.md#def-hpde13-hadamard-coefficients) $V_k$、上記の $\chi,\varepsilon_k,\eta_k$ を使い、未来・過去それぞれについて形式的に

$$
S_{\pm}^{\chi}(x,y)
=\sum_{k=0}^{\infty}\eta_k(x,y)V_k(x,y)R_\pm(2k+2,x;y)
$$

> と書く。$\varepsilon_k$ は、この級数が束値分布として収束し、残差のうち高次数部分が任意階微分まで収束するよう選ぶものとする。この選択を伴った核を**切断付きHadamard核**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde14-cutoff-hadamard -->
**定義の確認**。平坦massless模型 $P=P_0$ では $V_0=1$、$V_k=0$（$k\ge1$）です。[HPDE13の平坦係数例](../HPDE13/index.md#thm-hpde13-hadamard-integral)から全高次項が零となり、cutoffの幅によらず次が成立します。

$$
S_+^\chi=R_+(2).
$$

非自明な模型として $P=P_0+m^2$（定数 $m^2>0$）では、[HPDE13の輸送式の具体計算](../HPDE13/index.md#thm-hpde13-hadamard-integral)から $V_k=(-m^2)^k$ です。この場合は、例えば $\varepsilon_k=2^{-k}$ と選べます。なぜこの幅でよいかを、[Riesz分布の明示式](../HPDE13/index.md#def-hpde13-riesz)に照らして確認します。

$$
\eta_kV_kR_+(2k+2)
=c_k(-m^2)^k\chi(q/\varepsilon_k)\,q^{k-1}H_+,
\qquad c_k=\frac1{8\pi\,4^{k-1}(k-1)!\,k!}.
$$

固定した微分次数 $j$ に対し、十分大きい $k$ では $q^{k-1}H_+$ が $C^j$ 級です。$q$ の導関数が有界なコンパクト領域で積を微分すると、高次尾に残る幅の冪は少なくとも

$$
\varepsilon_k^{\,k-1-j}
$$

です。これはcutoffの微分で現れる幅の逆数と、元の核の冪が同時に減ることから従います。

$P$ を作用させる場合やcutoff交換子でも、さらに高々2冪を失うだけです。この模型では幅を $\varepsilon_k=2^{-k}$ と選び、正規化係数 $c_k$ の階乗分母と合わせると、固定した各微分次数に対するノルムの級数は収束します。

したがって切断付きHadamard核は束値分布として収束し、高次の残差は滑らかな関数になります。ただし低次数の円錐特異性そのものは消しません。
<!-- definition-example-end -->

### cutoffの交換子を全部書く

ここで $\nabla_Z$ は $Z=\operatorname{grad}_x\sigma$ に沿う接続微分、$\Box_g=\operatorname{tr}_g\nabla^2$ はスカラーへの波動作用素を表します。$P$ の零次項 $B$ はスカラー $\eta$ と可換なので積の微分で打ち消されます。

<a id="lem-hpde14-cutoff-commutator"></a>
<!-- formal-statement-start -->
> **補題（cutoff交換子の計算）**  
> 上記の $P$、$q=-2\sigma$、$Z=\operatorname{grad}\sigma$ と滑らかな束写像 $W(x,y)$ に対し、$k\ge1$、$\eta_k=\chi(q/\varepsilon_k)$ とすると

$$
[P,\eta_k]W
=-(\Box_g\eta_k)W-2\nabla_{\operatorname{grad}\eta_k}W
$$

> であり、より具体的に

$$
\begin{aligned}
[P,\eta_k]W
&=\left(\frac{4q}{\varepsilon_k^2}\chi''
+\frac{2\Box_g\sigma}{\varepsilon_k}\chi'\right)W\\
&\quad+\frac4{\varepsilon_k}\chi'\,\nabla_ZW
\end{aligned}
$$

> が成り立つ。$\chi',\chi''$ は $q/\varepsilon_k$ で評価する。
<!-- formal-statement-end -->

### 証明の見取り図

[世界関数のアイコナール恒等式](../HPDE13/index.md#lem-hpde13-eikonal)から $g(Z,Z)=2\sigma=-q$ を得ます。$\operatorname{grad}q=-2Z$ を代入すれば、連鎖律の二階微分も計算できます。

<!-- proof-start -->
### 証明

Leibniz則を一度使うと

$$
\nabla_a(\eta W)=(\partial_a\eta)W+\eta\nabla_aW
$$

です。さらに共変微分して計量で縮約すると

$$
\operatorname{tr}_g\nabla^2(\eta W)
=(\Box_g\eta)W+2\nabla_{\operatorname{grad}\eta}W
+\eta\operatorname{tr}_g\nabla^2W
$$

となります。零次項について $B(\eta W)=\eta BW$ なので、$P(\eta W)-\eta PW$ を取ると最初の式が得られます。

次に $q=-2\sigma$ より

$$
\operatorname{grad}q=-2Z,\quad
g(\operatorname{grad}q,\operatorname{grad}q)=4g(Z,Z)=-4q,\quad
\Box_gq=-2\Box_g\sigma.
$$

連鎖律をまず一階、続いて二階に適用すると

$$
\begin{aligned}
\operatorname{grad}\eta_k
&=\varepsilon_k^{-1}\chi'\operatorname{grad}q
=-2\varepsilon_k^{-1}\chi'Z,\\
\Box_g\eta_k
&=\varepsilon_k^{-2}\chi''g(\operatorname{grad}q,\operatorname{grad}q)
+\varepsilon_k^{-1}\chi'\Box_gq\\
&=-4q\varepsilon_k^{-2}\chi''
-2\varepsilon_k^{-1}\chi'\Box_g\sigma.
\end{aligned}
$$

これらを交換子に代入して表示式を得ます。$\chi',\chi''$ は円錐 $q=0$ の開近傍で零なので、交換子から円錐面にデルタ分布は生じません。$\square$
<!-- proof-end -->

## 3. 滑らかな残差を作る

$k\ge1$ なら[HPDE13の明示式](../HPDE13/index.md#def-hpde13-riesz)により、未来円錐内部で

$$
R_+(2k+2)=c_kq^{k-1}H_+,\qquad
c_k=\frac1{8\pi\,4^{k-1}(k-1)!\,k!}
$$

です。$H_+$ は未来円錐内部の階段分布を意味します。$q^{k-1}H_+$ は円錐境界を越えて $C^{k-2}$ 級です（$k=1$ では跳躍）。したがって、固定した導関数次数 $j$ に対し $k$ が十分大きい項は $C^j$ 級になります。任意の大きさの滑らかな係数 $V_k$ が存在しても、$\varepsilon_k$ を各段階で十分小さく選べば高次数の $C^j$ ノルムを抑えられます。

<a id="thm-hpde14-smooth-remainder"></a>
<!-- formal-statement-start -->
> **定理（滑らかな残差を持つ局所近似核の構成）**  
> $(M,g)$ を4次元の時間向き付き滑らかなLorentz多様体、$E\to M$ を有限ランクの滑らかな束、$P=-\operatorname{tr}_g\nabla^2+B$ を滑らかなnormally hyperbolic作用素とする。任意の点の十分小さい凸正規・因果凸な領域 $D$ では、正数列 $\varepsilon_k\downarrow0$ を選んで、[切断付きHadamard核](#def-hpde14-cutoff-hadamard) $S_\pm^\chi$ を二変数分布として定義できる。この核は

$$
P_x S_\pm^\chi(x,y)
=\delta_y\operatorname{id}_{E_y}+F_\pm(x,y)
$$

> を満たし、$F_\pm$ は $D\times D$ 上滑らかで、$S_\pm^\chi(\cdot,y)$ と $F_\pm(\cdot,y)$ の台は $J_D^\pm(y)$ に含まれる。
<!-- formal-statement-end -->

### 証明の見取り図

有限和に作用させると、隣り合うHadamard項の残差が相殺されます。ただしcutoffが次数ごとに違うため、**隣接cutoffの差**と**cutoff微分による追加項**は残ります。どちらも円錐から離れた $q>0$ に台を持ち、そこでRiesz分布は滑らかです。高次項を $\varepsilon_k$ でさらに縮め、すべての導関数について級数を収束させます。

<!-- proof-start -->
### 証明

まず $S_N=\sum_{k=0}^N\eta_kV_kR_+(2k+2)$ とします。[HPDE13の積公式・輸送再帰](../HPDE13/index.md#lem-hpde13-product-formula)による隣接項の相殺をcutoff付きで実行すると、$R_j=R_+(j)$ と略記して

$$
\begin{aligned}
P_xS_N
&=\delta_y\operatorname{id}
+\sum_{k=0}^{N-1}(\eta_k-\eta_{k+1})(P_xV_k)R_{2k+2}\\
&\quad+\eta_N(P_xV_N)R_{2N+2}
+\sum_{k=1}^N[P,\eta_k](V_kR_{2k+2}).
\end{aligned}
$$

この式は、各項を

$$
P(\eta_k V_kR)=\eta_kP(V_kR)+[P,\eta_k](V_kR)
$$

と分けて同じRiesz次数をまとめたものです。$k=0$ の差 $(1-\eta_1)(PV_0)R_2$ は、円錐付近で $\eta_1=1$ なので零分布です。

$k\ge1$ の差 $\eta_k-\eta_{k+1}$ は $q=0$ の近くで零となり、残る場所は $q>0$ です。[cutoff交換子の計算](#lem-hpde14-cutoff-commutator)から、追加項が非零になり得る領域は $\varepsilon_k/2<q<\varepsilon_k$ に限られます。したがって両者は光円錐での特異な分布を含みません。

収束を確かめます。領域 $D$ の閉包をより大きな凸正規近傍に入れておきます。次数について $k\ge j+4$ を仮定します。

元のRiesz項を $j$ 階まで微分し、さらに二階作用素 $P$ を作用させたとき、cutoff幅の冪は粗く見ても

$$
\varepsilon_k^{\,k-3-j}
$$

以上残ります。cutoffの導関数は円錐から離れた帯状の領域でしか非零になりません。その領域で幅の逆数と元の核の冪を対応させると、上の上界が得られます。

係数 $V_k$ とその像 $PV_k$、$PV_{k-1}$ は滑らかです。したがって固定した次数の導関数は、閉包上のノルムでそれぞれ有界です。

ここで**隣接cutoff差の二項を同時に抑える**必要があります。記号を簡単にするため $R_j=R_+(j)$ とし、$k\ge1$ について

$$
\begin{aligned}
A_k&=\eta_kV_kR_{2k+2},\\
B_k&=\eta_k(PV_k)R_{2k+2},\\
C_k&=\eta_k(PV_{k-1})R_{2k},\\
D_k&=[P,\eta_k](V_kR_{2k+2})
\end{aligned}
$$

と置きます。$A_k,B_k,D_k$ だけでなく $C_k$ も小さくするのが要点です。実際、有限和に残る隣接差の第 $k$ 項は

$$
(\eta_k-\eta_{k+1})(PV_k)R_{2k+2}
=B_k-C_{k+1}
$$

だからです。$C_k$ には $q^{k-2}$ が現れますが、$j\le k-4$ ではcutoffの微分後にも正の冪が残り、同じく $\varepsilon_k$ を縮めて抑えられます。

各 $k$ で有限個の $j\le k-4$ について、帰納的に $\varepsilon_k<\min(2^{-k},\varepsilon_{k-1}/2)$ を選び、

$$
\|A_k\|_{C^j}+\|B_k\|_{C^j}
+\|C_k\|_{C^j}+\|D_k\|_{C^j}
\le2^{-k}
$$

となるようにします（有限個の低次数項は分布として個別に扱います）。評価は $D\times D$ の固定コンパクト上で行います。コンパクト増大列については、段階 $k$ までの有限個の条件を課す対角選択を行います。

固定した $j$ に対し、十分大きい $k$ では四項すべてが $C^j$ 級であり、

$$
\|B_k-C_{k+1}\|_{C^j}
\le2^{-k}+2^{-(k+1)}
$$

です。したがって $S_N=\sum_{k=0}^N A_k$ は分布として収束し、残差の交換子級数と隣接差級数は $C^j$ で絶対収束します。さらに最終残差 $B_N\to0$ も $C^j$ で従います。これは任意の $j$ について成立するので、極限残差は滑らかです。

有限個の低次残差は上で確かめたように $q>0$ に台を持つ滑らかな関数なので、極限残差 $F_+$ はすべての次数で滑らかです。各項は未来円錐内に支持を持ち、因果関係は $D\times D$ 内で閉じているため、分布極限と滑らかな極限の台も $J_D^+$ に含まれます。過去側も同じ評価で従います。$\square$
<!-- proof-end -->

**注意**。この構成は通常の意味での「級数がどこでも絶対収束する」という主張ではありません。低次の円錐特異項を分布として保持したまま、高次尾を任意階滑らかに収束させるものです。cutoffを単に座標距離 $|x-y|$ で施すと、離れた光円錐上でその微分が非零になり、非滑らかな円錐項を作ってしまう場合があります。

## 4. Volterra反復はなぜ収束するか

ここから $S=S_+^\chi$、$F=F_+$ と略します。$F$ は滑らかな二変数核なので、密度 $d\mu_g$ を用いて

$$
(Ff)(x)=\int_D F(x,y)f(y)\,d\mu_g(y)
$$

と作用素を作れます。因果性 $F(x,y)=0$（$x\notin J_D^+(y)$）が時間積分の順序を固定します。

<a id="def-hpde14-volterra"></a>
<!-- formal-statement-start -->
> **定義（因果Volterra核と反復積）**  
> 相対コンパクトな小さい因果凸領域 $D$ に滑らかな時間関数 $t$ があり、滑らかな束写像核 $F(x,y)$ が $x\in J_D^+(y)$ の場合にしか非零でないとする。このような $F$ を**因果Volterra核**といい、$F^1=F$ および

$$
F^{n+1}(x,y)=
\int_D F(x,z)F^n(z,y)\,d\mu_g(z)
\qquad(n\ge1)
$$

> でその反復積を定める。束写像は $E_y\to E_z\to E_x$ の順に合成する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde14-volterra -->
**定義の確認**。一次元の時間区間 $(0,T)$ で $F(t,s)=h(t-s)$ とし、$h(a)=e^{-1/a}$（$a>0$）、$h(a)=0$（$a\le0$）とします。$h$ は原点まで全階滑らかです。$F$ は $t\ge s$ に支持され、$F^2(t,s)=\int_s^t h(t-r)h(r-s)\,dr$ と計算できます。積分は $s\le r\le t$ のときだけ残るので、反復のたびに時間の順序が加わることを直接確認できました。一般の束でも写像の入力と出力が合うよう同じ順序を使います。
<!-- definition-example-end -->

<a id="lem-hpde14-volterra-factorial"></a>
<!-- formal-statement-start -->
> **補題（因果Volterra核の階乗評価）**  
> 上記の $D$ の閉包を滑らかな時間座標 $t\in[a,b]$ と有限体積の空間座標領域に含め、$F$ が閉包の近傍まで滑らかで有界な因果核とする。時間切片の密度積分が一様に $V<\infty$ で抑えられ、$\|F\|\le M$ なら、$n\ge1$ について

$$
\|F^n(x,y)\|
\le M^n V^{n-1}
\frac{(t(x)-t(y))_+^{n-1}}{(n-1)!}
$$

> が成り立つ。ただし $n=1$ では右辺の零乗を $1$ と解釈し、$t(x)<t(y)$ では因果性により $F^n(x,y)=0$ である。したがって $\sum_{n=1}^{\infty}(-1)^nF^n$ は局所的にすべての導関数について一様収束する滑らかな因果核である。
<!-- formal-statement-end -->

### 証明の見取り図

単なる幾何級数の収束条件 $MV(b-a)<1$ は不要です。$n-1$ 個の中間時刻の順序積分が、積分区間の長さの $(n-1)$ 乗を $(n-1)!$ で割った量となるからです。

<!-- proof-start -->
### 証明

$n$ 個の核を積分した式は $n-1$ 個の中間点 $z_1,\ldots,z_{n-1}$ を含みます。因果支持により

$$
t(y)\le t(z_{n-1})\le\cdots\le t(z_1)\le t(x).
$$

核のノルムの積は $M^n$ 以下、各時間切片の密度積分は $V$ 以下なので、その積分の絶対値は

$$
M^nV^{n-1}
\int_{t(y)\le s_{n-1}\le\cdots\le s_1\le t(x)}
ds_1\cdots ds_{n-1}
$$

以下です。$u=t(x)-t(y)\ge0$ のとき、積分を最後の変数から順に計算すると $I_0(u)=1$、$I_j(u)=\int_0^u I_{j-1}(s)\,ds$、帰納法で $I_j(u)=u^j/j!$ となり表示式を得ます。$u<0$ なら全反復核が零です。

滑らかさも確認します。$D$ で積分する表示は固定領域上の積分であり、$F$ は境界も含めて滑らかです。$x$ の導関数は先頭の $F(x,z_1)$、$y$ の導関数は末尾の $F(z_{n-1},y)$ にかかります。

任意の固定階微分で両端の微分ノルムを $M_j$ で抑え、残る $n-2$ 個の因子を $M$ で抑えると、$n\ge2$ で次の形の上界を得ます。

$$
C_j\frac{M^{n-2}V^{n-1}(b-a)^{n-1}}{(n-1)!}.
$$

境界に接する積分は因果核の滑らかな零延長によって追加の境界項を生じません。よって各階微分した級数も一様収束し、滑らかな極限になります。$\square$
<!-- proof-end -->

## 5. 真の局所基本解へ：残差を逆から消す

滑らかな因果核の反復積が収束したので、$I+F$ の逆を右から組み立てます。$I$ は二変数デルタ核（試験切断上の恒等作用素）です。$S$ は分布核であり $F$ は滑らかな核なので、因果的なコンパクトダイヤモンド上の積分により $SF^n$ を定義します。$S$ を積分作用素として使う際には、近傍内の試験切断へ適用した結果が滑らかになることを、正規座標のRiesz積分表示から確認します。積分の領域が局所的にコンパクトであるため、必要なら内側で1となる補助cutoffを使えます。

<a id="thm-hpde14-true-local"></a>
<!-- formal-statement-start -->
> **定理（真の局所点源基本解への補正）**  
> 4次元の時間向き付きLorentz多様体の点の十分小さい因果凸な開領域 $D$、滑らかな有限ランク束 $E\to D$、滑らかなnormally hyperbolic作用素 $P$ を考える。[滑らかな残差を持つ近似核](#thm-hpde14-smooth-remainder) $S_\pm$ とその滑らかな因果残差 $F_\pm$ について、より小さいコンパクトな因果ダイヤモンド内では

$$
K_\pm=\sum_{n=1}^\infty(-1)^nF_\pm^n,
\qquad
E_\pm=S_\pm+S_\pm K_\pm
$$

> が意味を持ち、$K_\pm$ は滑らかな因果核、$E_\pm$ は二変数束値分布核であって

$$
P_xE_\pm(x,y)=\delta_y\operatorname{id}_{E_y},
\qquad
\operatorname{supp}E_\pm(\cdot,y)\subset J_D^\pm(y)
$$

> を満たす。したがって $E_\pm$ は真の局所遅延・先進点源基本解である。また $E_\pm-S_\pm$ は局所的に滑らかである。
<!-- formal-statement-end -->

### 証明の見取り図

核の積の向きに注意します。$PS=I+F$ なので、左から $I+F$ を消すには **$S$ の右側** に $(I+F)^{-1}$ を合成する必要があります。[階乗評価](#lem-hpde14-volterra-factorial)が逆核の存在を与えます。

<!-- proof-start -->
### 証明

未来側で書きます。$K_N=\sum_{n=1}^N(-1)^nF^n$ とすると、結合律により

$$
\begin{aligned}
(I+F)(I+K_N)
&=I+\sum_{n=1}^N(-1)^nF^n
+F+\sum_{n=1}^N(-1)^nF^{n+1}\\
&=I+(-1)^NF^{N+1}.
\end{aligned}
$$

残余 $F^{N+1}$ は[階乗評価](#lem-hpde14-volterra-factorial)によって、固定したコンパクトダイヤモンド上で全導関数とともに零へ収束します。したがって $(I+F)(I+K)=I$。

近似核の[残差等式](#def-hpde14-local-parametrix)から $PS=I+F$ です。$E=S(I+K)$ に作用させると

$$
PE=(PS)(I+K)=(I+F)(I+K)=I
$$

となります。途中の積分・極限交換は、因果的な中間変数 $z$ が $J_D^+(y)\cap J_D^-(x)$ のコンパクト部分に制限されることと、上の全階一様収束によって正当化できます。$S$ と $K$ が未来向きに支持されるため、$SK$ も $y\preceq z\preceq x$ のときしか非零ではなく、$E$ の台も未来に含まれます。

最後に $SK$ の滑らかさを確認します。高次のRiesz項は第3節の評価で任意階収束するため、まず有限個の低次項を扱えば十分です。核 $K(z,y)$ は滑らかで、局所的な因果ダイヤモンドを含むコンパクト集合上で積分できます。

積分の外で変わる点 $x$ ごとに正規座標を取り、滑らかに選んだLorentz正規直交枠で

$$
z=\exp_x\xi,\qquad
\xi=(-s,r\omega),\qquad
r\ge0,\quad\omega\in S^2
$$

と書きます。[世界関数の定義](../HPDE13/index.md#def-hpde13-world-function)から

$$
q(x,z)=s^2-r^2
$$

です。

先頭核 $R_+(2)$ の円錐面積分では $s=r$ と置きます。円錐測度の因子と空間極座標の測度を掛けると、滑らかなJacobianを除く積分要素は

$$
\frac1r\,r^2\,dr\,d\omega
=r\,dr\,d\omega
$$

となります。

高次核は円錐内部の領域で積分します。$k\ge1$ なら被積分関数は、滑らかな係数に次の因子を掛けた形です。

$$
(s^2-r^2)^{k-1}r^2,\qquad 0\le r\le s.
$$

局所cutoffの台を含む共通の有限区間を選び、外側で零になるよう被積分関数を延長します。これにより、点 $x,y$ に滑らかに依存する関数を固定領域上で積分する形となり、導関数を積分内へ移せます。

低次項の和も滑らかです。これに任意階で収束する高次尾を合わせて $SK\in C^\infty$ を得ます。特異な部分は $S$ に残るため、$E-S=SK$ は滑らかです。過去側でも因果順序を反転して同じ計算が成り立ちます。$\square$
<!-- proof-end -->

**何が独立に構成されたか**。ここでは先に局所Cauchy問題を解く定理を入力せず、Hadamard核の残差を滑らかにし、その**滑らかな核だけ**をVolterra反復しました。後の大域Green作用素の存在を既知として使ってはいません。

### 別経路：局所Cauchy解の既出の存在結果を使う

<a id="prop-hpde14-cauchy-comparison"></a>
<!-- formal-statement-start -->
> **命題（Cauchy補正との比較）**  
> 4次元の小さい因果凸領域 $D$ 上の滑らかなnormally hyperbolic作用素 $P$ に対し、局所近似核 $S_+(x,y)$ の滑らかな残差を $F_+(x,y)$ とする。$y$ より過去の空間的スライス上でCauchyデータが零であり、次の方程式を満たす滑らかな局所Cauchy解 $w_y$ が存在すると仮定する。

$$
P_xw_y=-F_+(\cdot,y).
$$

> このとき $S_+(\cdot,y)+w_y$ は遅延点源方程式を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

$w_y$ の存在には[HPDE11の局所Cauchy存在](../HPDE11/index.md#thm-hpde11-local-cauchy)を使えます。$F_+$ は滑らかで未来向きなので、零初期データによる補正の支持は[HPDE10の因果支持評価](../HPDE10/index.md#thm-hpde10-finite-propagation)で制御します。

<!-- proof-start -->
### 証明

$F_+(\cdot,y)$ は滑らかで $J^+(y)$ の外では零なので、$y$ より過去のスライス近くでは零です。十分小さい時間スラブを取り、必要なら局所空間cutoffで滑らかな源を延長し、[局所Cauchy存在定理](../HPDE11/index.md#thm-hpde11-local-cauchy)を零初期データで適用して $w_y$ を得ます。源の台は $J^+(y)$ に含まれるので、[因果的な支持制約](../HPDE10/index.md#thm-hpde10-finite-propagation)より $w_y$ は $J^+(y)$ の外で零です。最後に分布として

$$
P_x(S_++w_y)=(\delta_y+F_+)-F_+=\delta_y.
$$

この方法は正しい補正ですが、局所Cauchy存在を**入力に使う**ため、それとは独立な局所存在の証明にはなりません。$\square$
<!-- proof-end -->

## 6. 具体模型で残差の符号を検算する

$P=P_0+m^2$、$m^2>0$ の平坦4次元模型で、[HPDE13の輸送解](../HPDE13/index.md#thm-hpde13-hadamard-integral)は $V_0=1$、$V_1=-m^2$ です。cutoffを付けない最初の二項 $S_1=R_+(2)-m^2R_+(4)$ に対し、[Riesz再帰](../HPDE13/index.md#thm-hpde13-riesz-recurrence)から

$$
\begin{aligned}
PS_1
&=(P_0+m^2)R_2-m^2(P_0+m^2)R_4\\
&=\delta_y+m^2R_2-m^2R_2-m^4R_4\\
&=\delta_y-m^4R_4.
\end{aligned}
$$

$r=|x-y|$、$t=t_x-t_y$ とすると $R_4=H(t-r)/(8\pi)$ なので、残差 $-m^4R_4$ は内部で定数ですが円錐面で跳躍します。したがって**有限和はそのまま滑らかなparametrixではありません**。高次数の $V_k=(-m^2)^k$ と適切なcutoffで全境界残差を滑らかにしてから反復補正します。この模型ではcutoffなしの無限和 $\sum_{k\ge0}(-m^2)^kR_+(2k+2)$ も階乗分母によって束値超関数の意味で収束し、点源方程式を満たします。しかしこの特別な収束を、一般の曲がった時空のHadamard係数の成長にそのまま当てはめることはできません。

## 7. 演習

### Level A

<a id="ex-hpde14-a01"></a>
#### HPDE14-A01 交換子の符号

$P=-\Box_g+B$、滑らかなスカラー $\eta$、束写像 $W$ に対して $[P,\eta]W$ を求めよ。なぜ $B$ が交換子から消えるかも記せ。
- Level: A

<!-- solution-start -->
**詳細解答**。接続のLeibniz則を一回用いると $\nabla_a(\eta W)=(\partial_a\eta)W+\eta\nabla_aW$。さらにもう一回微分して計量で縮約すると

$$
\operatorname{tr}_g\nabla^2(\eta W)
=(\Box_g\eta)W+2\nabla_{\operatorname{grad}\eta}W
+\eta\operatorname{tr}_g\nabla^2W.
$$

$B$ は各ファイバーの線形写像なので $B(\eta W)=\eta BW$。従って $P(\eta W)-\eta PW$ から共通項が消え、

$$
[P,\eta]W=-(\Box_g\eta)W-2\nabla_{\operatorname{grad}\eta}W
$$

が残ります。
<!-- solution-end -->

<a id="ex-hpde14-a02"></a>
#### HPDE14-A02 cutoffの支え

$\chi(s)=1$（$|s|\le1/2$）、$\chi(s)=0$（$|s|\ge1$）、$\eta=\chi(q/\varepsilon)$ とする。$\eta$ の導関数の支持と、$\eta R_+(2)$ の値を求めよ。
- Level: A

<!-- solution-start -->
**詳細解答**。$\chi'$ と $\chi''$ が非零になり得るのは $1/2<|q|/\varepsilon<1$ の領域です。導関数の**支持（非零集合の閉包）**は $\varepsilon/2\le |q|\le\varepsilon$ に含まれます。未来Riesz核の支持 $q\ge0$ と共通するのは $\varepsilon/2\le q\le\varepsilon$ の部分です。一方 $R_+(2)$ は $q=0$ 上に支持され、その開近傍で $\eta=1$ なので、滑らかな乗数を分布に掛ける操作では円錐上の値だけが効くため $\eta R_+(2)=R_+(2)$。cutoffの微分が円錐デルタを生成しない理由もここにあります。
<!-- solution-end -->

<a id="ex-hpde14-a03"></a>
#### HPDE14-A03 円錐に沿う微分可能次数

$q_+^p=q^pH(q)$、$p$ を正整数とする。$q=0$ での滑らかさを調べ、$p=3$ のとき何階まで連続微分可能か述べよ。
- Level: A

<!-- solution-start -->
**詳細解答**。$q>0$ では $d^jq^p/dq^j=p!q^{p-j}/(p-j)!$（$j\le p$）、$q<0$ ではすべて零です。$j\le p-1$ なら右極限も零なので、$p-1$ 階までは導関数が連続です。しかし $j=p$ の右極限は $p!$、左極限は零で跳躍するため $C^p$ ではありません。$p=3$ のとき $C^2$ であり $C^3$ ではありません。$R_+(2k+2)$ の $p=k-1$ と対応します。
<!-- solution-end -->

<a id="ex-hpde14-a04"></a>
#### HPDE14-A04 質量項の初項残差

4次元Minkowski時空で $P=P_0+m^2$ とし、$S_0=R_+(2)$、$S_1=R_+(2)-m^2R_+(4)$ と置く。両残差を計算し、どちらが滑らかか確認せよ。
- Level: A

<!-- solution-start -->
**詳細解答**。[Riesz再帰](../HPDE13/index.md#thm-hpde13-riesz-recurrence)で $P_0R_2=\delta_y$、$P_0R_4=R_2$ です。したがって

$$
PS_0=\delta_y+m^2R_2,\quad
PS_1=\delta_y+m^2R_2-m^2R_2-m^4R_4
=\delta_y-m^4R_4.
$$

$m\ne0$ なら $R_2$ は光円錐上のデルタ、$R_4=H(t-r)/(8\pi)$ は円錐面で跳躍します。よってどちらの残差も $D\times D$ 上の滑らかな関数ではありません。「円錐内部で定数だから滑らか」という判断は境界を見落としています。
<!-- solution-end -->

### Level B

<a id="ex-hpde14-b01"></a>
#### HPDE14-B01 三項のcutoff付き残差

$S_2=\sum_{k=0}^2\eta_kV_kR_{2k+2}$、$\eta_0=1$ とする。Hadamardの輸送再帰を用いて $PS_2-\delta_y$ を、隣接cutoff差・最終残差・交換子に分解せよ。
- Level: B

<!-- solution-start -->
**詳細解答**。[輸送再帰と積公式](../HPDE13/index.md#lem-hpde13-product-formula)は $P(V_0R_2)=\delta_y+(PV_0)R_2$、$P(V_1R_4)=(PV_1)R_4-(PV_0)R_2$、$P(V_2R_6)=(PV_2)R_6-(PV_1)R_4$ を与えます。cutoff積を微分して交換子を別に取り出すと

$$
\begin{aligned}
PS_2-\delta_y
&=(1-\eta_1)(PV_0)R_2
+(\eta_1-\eta_2)(PV_1)R_4\\
&\quad+\eta_2(PV_2)R_6
+[P,\eta_1](V_1R_4)+[P,\eta_2](V_2R_6).
\end{aligned}
$$

最初の項は $\eta_1=1$ が $q=0$ の近傍で成立するため零です。差項と交換子項は $q>0$ でのみ非零なので滑らかですが、最後の $\eta_2(PV_2)R_6$ は $q^1H(q)$ を含み、有限和の段階では一般に $C^\infty$ ではありません。これが無限和への移行で消すべき最終残差です。
<!-- solution-end -->

<a id="ex-hpde14-b02"></a>
#### HPDE14-B02 時間順序積分と階乗

$0\le s\le t\le T$ に対して $F(t,s)=a$、それ以外は $F=0$ とする**積分核の模型**について、時間順序付き積 $F^n(t,s)$ を $t>s$ の範囲で計算せよ。境界 $t=s$ での滑らかさは仮定しない。
- Level: B

<!-- solution-start -->
**詳細解答**。$F^1(t,s)=a$ です。$F^2(t,s)=\int_s^t a^2\,dr=a^2(t-s)$。帰納的に $F^n(t,s)=a^n(t-s)^{n-1}/(n-1)!$ と仮定すると

$$
\begin{aligned}
F^{n+1}(t,s)
&=\int_s^t a\,F^n(r,s)\,dr\\
&=\frac{a^{n+1}}{(n-1)!}\int_s^t(r-s)^{n-1}dr\\
&=\frac{a^{n+1}(t-s)^n}{n!}.
\end{aligned}
$$

したがって $|F^n|\le |a|^nT^{n-1}/(n-1)!$。模型は境界で不連続ですが、階乗の機構を検証するための積分です。定理の滑らかさの仮定と取り違えません。
<!-- solution-end -->

<a id="ex-hpde14-b03"></a>
#### HPDE14-B03 Neumann補正の符号と順序

$PS=I+F$、$K_2=-F+F^2$ とする。$P(S+SK_2)$ を求めよ。一般の束写像核では積の順序を変更できない理由も記せ。
- Level: B

<!-- solution-start -->
**詳細解答**。結合律を用いて $P(S+SK_2)=(PS)(I+K_2)$ と書きます。ここで

$$
\begin{aligned}
(I+F)(I-F+F^2)
&=I-F+F^2+F-F^2+F^3\\
&=I+F^3.
\end{aligned}
$$

よって $P(S+SK_2)=I+F^3$ です。$F(x,z):E_z\to E_x$、$S(z,y):E_y\to E_z$ の合成と、その逆順の合成では入力・出力ファイバーも積分変数も異なります。一般には $SF=FS$ とはいえません。$P$ が左から作用するので $S$ の右に逆を掛ける順序が自然です。
<!-- solution-end -->

<a id="ex-hpde14-b04"></a>
#### HPDE14-B04 因果支持の合成

$F(x,y)$、$G(x,y)$ が滑らかな未来向き因果核であり、$D$ が因果凸でコンパクトな因果ダイヤモンドを持つとする。$(FG)(x,y)=\int_DF(x,z)G(z,y)\,d\mu_g(z)$ の支持が未来因果集合に含まれることを示せ。
- Level: B

<!-- solution-start -->
**詳細解答**。被積分関数が非零なら、$G(z,y)\ne0$ より $z\in J_D^+(y)$、$F(x,z)\ne0$ より $x\in J_D^+(z)$ が必要です。因果曲線を $y\to z$、$z\to x$ の順に連結すると $x\in J_D^+(y)$。したがって $x\notin J_D^+(y)$ ならすべての $z$ で被積分関数が零となり、$(FG)(x,y)=0$ です。因果ダイヤモンドのコンパクト性は積分の局所的な正当化にも使われます。
<!-- solution-end -->

### Level C

<a id="ex-hpde14-c01"></a>
#### HPDE14-C01 局所基本解の補正を再構成する

4次元Lorentz多様体の小さい因果凸領域 $D$ 上で、二変数分布核 $S$ と滑らかな核 $F$ が次を満たすとする。

$$
PS=I+F,\qquad
\operatorname{supp}S(\cdot,y)
\cup\operatorname{supp}F(\cdot,y)
\subset J_D^+(y).
$$

$F$ は領域の閉包の近傍まで滑らかに延長でき、有限な時間幅 $T$、各時間切片の密度積分上界 $V$ がある。さらに $\|F\|\le M$ と仮定する。

(i) $F^n$ の上界と収束、(ii) 真の局所点源基本解の式と点源等式、(iii) 因果支持、(iv) 既証Cauchy存在を使う別法の論理的な位置付けを示せ。
- Level: C

<!-- solution-start -->
**詳細解答**。(i) $F^n(x,y)$ は中間点を $n-1$ 回積分する核です。$y\preceq z_{n-1}\preceq\cdots\preceq z_1\preceq x$ によって各中間時刻が順序付けられ、核の積は $M^n$、空間体積積分は $V^{n-1}$ 以下なので

$$
\|F^n(x,y)\|
\le M^nV^{n-1}\frac{(t(x)-t(y))_+^{n-1}}{(n-1)!}
\le M^nV^{n-1}\frac{T^{n-1}}{(n-1)!}.
$$

導関数では最初・最後の核の該当階微分を評価し、内側には同じ時間単体の積分を適用できます。各階微分の級数も階乗分母により収束します。(ii) $K=\sum_{n\ge1}(-1)^nF^n$ と定め、$E=S+SK$ と置きます。有限部分和 $K_N$ では

$$
(I+F)(I+K_N)=I+(-1)^NF^{N+1}.
$$

右端の余剰項は (i) の評価で零に収束します。したがって

$$
PE=(PS)(I+K)=(I+F)(I+K)=I,
$$

固定した点源 $y$ に対して、上の等式は $P_xE(x,y)=\delta_y\operatorname{id}$ を意味します。

(iii) $SK$ の積分で寄与する中間点は $y\preceq z\preceq x$ です。$x\notin J_D^+(y)$ なら寄与がないので、$S$ の因果支持と合わせて $E$ も未来支持です。

(iv) [HPDE11の局所Cauchy存在](../HPDE11/index.md#thm-hpde11-local-cauchy)を既知として用いる別法では、滑らかな補正 $w_y$ を過去の零初期データから解きます。源と点源等式は

$$
Pw_y=-F(\cdot,y),\qquad
P(S+w_y)=\delta_y
$$

です。ただしこの方法は局所存在を前提にするため、局所存在の独立証明ではありません。
<!-- solution-end -->

## 8. 局所構成から次へ

Hadamardの輸送方程式で決まる特異構造は、cutoffによる平滑残差の生成と、因果時間順序を使った補正を経て**真の局所点源基本解**になりました。円錐上の特異性は近似核が担い、補正は滑らかです。一方、ここでの作用域は小さい因果凸領域に限られます。大域的なCauchy解を単に分割関数で足すと分割関数の導関数に由来する追加項が生じるため、時間スラブ間の一意性と因果的な支持制約を用いる貼り合わせが次の課題になります。
