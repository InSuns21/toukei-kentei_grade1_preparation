# MIR2-11 トーラス局所化と固定グラフ

[MIR2-10 の超幾何 I 関数](../MIR2-10/index.md#def-mir2-10-i-function)は積と漸化式から直接計算できた。一方、[MIR2-09 の J 関数](../MIR2-09/index.md#def-mir2-09-j-function)には安定写像の仮想基本類が入る。両者をつなぐには、「曲線全体を積分する」問題を実際に計算できる形へ変換する道具が必要である。

その道具の一つが**トーラス局所化**である。連続的な対角スケーリングで動かない対象（固定点・固定写像）だけへ積分を分解し、固定写像を頂点・辺・次数の付いたグラフで表す。ただし、**一般の滑らかな quintic は射影空間の対角トーラス作用で不変ではない**。最後にこの障害を解き、射影空間の安定写像空間と五次のEuler類を用いる正確な経路を示す。

この講義では、最小の等変積分を手計算し、重み・次数・固定グラフ・自己同型の役割を読み解く。さらにquinticの計算に必要な外部定理を確認し、本講で証明できる範囲との境界を明確にする。

## 1. 動かない点の値から全体を積分する

まず複素一次元トーラス $T=\mathbb C^\times$ が空間 $M$ に作用するとき、通常のコホモロジーに作用の情報を併せた **等変コホモロジー** を考える。形式的な重みを $\lambda$ としておくと、積分の途中では $\lambda$ の逆数が現れるが、最終的な通常の交点数では不自然な分母が打ち消し合う。

<a id="def-mir2-11-equivariant"></a>

<!-- formal-statement-start -->
> **定義（等変コホモロジーと重み）**
>
> $T=\mathbb C^\times$、$M$ を $T$ 空間とする。$ET$ を可縮で $T$ が自由に作用する空間、$BT=ET/T$ とし、有理係数の等変コホモロジーを

$$
H_T^*(M;\mathbb Q)=H^*((ET\times M)/T;\mathbb Q)
$$

> と定める。点に対して $H_T^*(\mathrm{pt};\mathbb Q)=H^*(BT;\mathbb Q)=\mathbb Q[\lambda]$、$\deg_{\mathbb R}\lambda=2$ である。一次元表現 $t\cdot v=t^m v$ の第一等変Chern類（重み）は $m\lambda$ と約束する。一般のトーラス $T=(\mathbb C^\times)^r$ では、各座標の重みを $\lambda_1,\ldots,\lambda_r$ と書く。
<!-- formal-statement-end -->

**定義の確認。** $M=\mathrm{pt}$ では $(ET\times\mathrm{pt})/T=BT$ だから、定義から $\mathbb Q[\lambda]$ が出る。$t\cdot v=t^2v$ は二乗表現なので重みは $2\lambda$、反対の表現 $t^{-1}v$ では $-\lambda$ になる。「点は動かない」ことと、「点上のベクトル（接方向・束の繊維）がどの重みで動くか」を区別する。

<!-- definition-example-start: def-mir2-11-equivariant -->
**直接例。** 射影直線 $\mathbb P^1$ の斉次座標を $[x:y]$ とし、

$$
t\cdot[x:y]=[tx:y]
$$

と作用させる。固定点は $p_0=[0:1]$ と $p_\infty=[1:0]$ の二つだけである。$y\ne0$ の局所座標 $u=x/y$ は $u\mapsto tu$ だから $T_{p_0}\mathbb P^1$ の重みは $+\lambda$。$x\ne0$ の $v=y/x$ は $v\mapsto t^{-1}v$ だから $T_{p_\infty}\mathbb P^1$ の重みは $-\lambda$。対象の全固定点と二つの重みを座標から確認した。
<!-- definition-example-end -->

一般の滑らかなコンパクトな $T$ 多様体では、固定成分の正規方向の重みを分母として積分が分解される。これはAtiyah–Bott／Berline–Vergne（ABBV）局所化公式であり、ここでは**外部定理**として利用する。次の射影直線の場合には式を別に検算する。

<a id="thm-mir2-11-abbv"></a>

<!-- formal-statement-start -->
> **定理（ABBV等変局所化：孤立固定点の場合、外部入力）**
>
> $M$ をコンパクトで滑らかな複素 $T$ 多様体、$M^T$ を有限個の孤立固定点の集合とする。$e_T(T_pM)$ を $T_pM$ の各非零重みの積とする。$\alpha\in H_T^*(M;\mathbb Q)$ について、非零重みを可逆にした係数環で

$$
\boxed{\int_M^T\alpha
=\sum_{p\in M^T}\frac{\alpha|_p}{e_T(T_pM)}}
$$

> が成立する。左辺は等変押し出しであり、分母は **接空間の重み** から定める。一般の正次元固定成分では接空間でなく固定成分の正規束の等変Euler類を用いる。
<!-- formal-statement-end -->

この定理の一般的な証明（等変コホモロジーの局所化同型の構成）は本講では外部入力とする。まず射影直線に限定すれば、何を計算しているかを式だけで検証できる。

$\mathcal O_{\mathbb P^1}(-1)$ は点 $[x:y]$ の斉次ベクトルが張る直線を繊維とし、上の作用を繊維にも作用させる。この線束の双対 $\mathcal O(1)$ の第一等変Chern類を $H$ と置く。$p_0$ では tautological な繊維の重みが $0$、$p_\infty$ では $+\lambda$ なので、双対である $H$ の制限は

$$
H|_{p_0}=0,\qquad H|_{p_\infty}=-\lambda.
$$

この線形化を選んだことが重要である。通常の第一Chern類 $c_1(\mathcal O(1))$ は同じでも、等変リフトの繊維重みは線形化によって変わり得る。

<a id="prop-mir2-11-p1-integration"></a>

<!-- formal-statement-start -->
> **命題（射影直線の局所化の直接検算）**
>
> 上の $T$ 作用と $H=c_1^T(\mathcal O(1))$ の線形化に対して、

$$
H_T^*(\mathbb P^1;\mathbb Q)
=\frac{\mathbb Q[\lambda,H]}{(H(H+\lambda))}
$$

> が成り立つ。任意の多項式 $F(H)\in\mathbb Q[\lambda,H]$ について

$$
\boxed{
\int_{\mathbb P^1}^T F(H)
=\frac{F(0)}{\lambda}-\frac{F(-\lambda)}{\lambda}
}
$$

> であり、とくに $\int^T1=0$、$\int^T H=1$、$\int^T H^2=-\lambda$ となる。
<!-- formal-statement-end -->

射影直線は二つの一次元表現の射影化である。その等変コホモロジーの環を求めるため、一般の**等変射影束公式**をここだけ外部入力として使う。記号の符号を固定したうえで、次の形になる。

<a id="thm-mir2-11-projective-bundle"></a>

<!-- formal-statement-start -->
> **定理（射影直線の等変射影束公式：外部入力）**
>
> $T=\mathbb C^\times$ の一次元表現 $\mathbb C_{\lambda}$ と自明表現 $\mathbb C_0$ の直和 $V$ を考える。$\mathbb P(V)\cong\mathbb P^1$ に誘導される作用と、tautological 線束の双対 $\mathcal O(1)$ の第一等変Chern類 $H$ について

$
H_T^*(\mathbb P(V);\mathbb Q)
\cong\frac{\mathbb Q[\lambda,H]}{(H(H+\lambda))}
$

> が成り立ち、$1,H$ が $\mathbb Q[\lambda]$ 加群の基底となる。
<!-- formal-statement-end -->

この関係式の符号は、$H$ の固定点での値が $0,-\lambda$ であることとも一致する。等変射影束公式そのものの一般証明は、この一講の局所化計算とは分けて扱う。

**証明の見取り図。** [射影直線の等変射影束公式](#thm-mir2-11-projective-bundle)から $H(H+\lambda)=0$ を得て、多項式を $A(\lambda)+B(\lambda)H$ へ簡約する。積分すると定数項は次数が足りず零、$H$ の積分は1。固定点側の差商も同じ $B$ になる。

<!-- proof-start -->
### 証明

$T$ 表現 $\mathbb C_{\lambda}\oplus\mathbb C_0$ の射影化がこの $\mathbb P^1$ である。[等変射影束公式](#thm-mir2-11-projective-bundle)をこの二つの重みに適用すると $H(H+\lambda)=0$ が得られる。この結果を入力として本命題の積分計算を閉じる。

上の関係で $H^2=-\lambda H$ だから、任意の $F$ は一意的に $F(H)=A(\lambda)+B(\lambda)H$ と表せる。相対複素次元は1なので、次数0の $1$ を積分すると負次数になって零。一方 $\mathcal O(1)$ の第一Chern類は通常の射影直線上で次数1であり、等変押し出しも $\int^T H=1$ である。よって $\int^T F(H)=B(\lambda)$。

二固定点へ制限すると

$$
F(0)=A,\qquad F(-\lambda)=A-\lambda B.
$$

従って $(F(0)-F(-\lambda))/\lambda=B$。これは [ABBV公式](#thm-mir2-11-abbv) に接重み $+\lambda,-\lambda$ を代入した式でもある。$F=1,H,H^2$ を順に入れると $0,1,-\lambda$ となり、最後は $H^2=-\lambda H$ とも整合する。$\square$
<!-- proof-end -->

**誤りを防ぐ確認。** $\int_{\mathbb P^1}^T1=1/\lambda-1/\lambda=0$ である。一方 $\int_{\mathbb P^1}^T H=0/\lambda+(-\lambda)/(-\lambda)=1$。分母の符号を同じにすると、最初の式で $2/\lambda$ という誤った値になる。

## 2. 射影空間の固定点と固定された写像

次は $\mathbb P^4$ の対角作用を使う。$T=(\mathbb C^\times)^5$ が

$$
(t_0,\ldots,t_4)\cdot[x_0:\cdots:x_4]
=[t_0x_0:\cdots:t_4x_4]
$$

と作用する。固定点は座標点 $p_i=[0:\cdots:1:\cdots:0]$（$0\le i\le4$）である。$p_i$ 近くの局所座標 $z_j=x_j/x_i$ は $z_j\mapsto (t_j/t_i)z_j$ だから、接空間の四つの重みは $\lambda_j-\lambda_i$（$j\ne i$）と直接分かる。

<a id="prop-mir2-11-p4-weights"></a>

<!-- formal-statement-start -->
> **命題（射影四次元の固定点分母）**
>
> 上の対角作用で、すべての $\lambda_i-\lambda_j$（$i\ne j$）を可逆にすると

$$
\boxed{
e_T(T_{p_i}\mathbb P^4)
=\prod_{j\ne i}(\lambda_j-\lambda_i)
}
$$

> である。特に固定点の寄与は、四つの接重みを掛けたものを分母として持つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$p_i$ のアフィン近傍で $z_j=x_j/x_i$（$j\ne i$）は独立な四座標である。$T$ の作用は各座標を $t_j/t_i$ 倍する。したがって $T_{p_i}\mathbb P^4$ は四つの一次元重み表現の直和であり、等変Euler類はその第一等変Chern類の積になる。$\square$
<!-- proof-end -->

**曲線は点だけでは表せない。** 安定写像 $f:C\to\mathbb P^4$ は、$T$ が標的に作用しても、必要なら定義域 $C$ の自己同型で補正して同じ安定写像を表す場合に「固定」となる。このため、像が座標点にとどまる成分と、二つの座標点を結ぶ座標直線を被覆する成分とが現れる。

ここで頂点に「行き先の座標点」、辺に「どの座標直線を何重に覆うか」を記録する。

<a id="def-mir2-11-fixed-graph"></a>

<!-- formal-statement-start -->
> **定義（種数0の固定グラフの記録）**
>
> $\overline{\mathcal M}_{0,k}(\mathbb P^4,d)$ の $T$ 固定安定写像を、以下のデータを持つ連結グラフ $\Gamma$ で記録する。
>
> - 頂点 $v$ には像である固定点の番号 $i(v)\in\{0,\ldots,4\}$ を付ける。
> - 辺 $e=(v,v')$ には $i(v)\ne i(v')$ と正整数の被覆次数 $d_e$ を付ける。辺は二固定点を結ぶ座標直線への非定数成分を表す。
> - 標点があれば固定点へ写る頂点または辺の端に付け、安定な縮約成分は標点と節点を合わせて少なくとも三つの特別点を持つ。
> - 全次数は $\sum_e d_e=d$。種数0ではグラフは木（連結で閉路なし）である。
>
> 一価・二価の頂点は、縮約された安定成分が存在しない場合も端点を記録するために用い、そこに未定義の $\overline{\mathcal M}_{0,1}$ や $\overline{\mathcal M}_{0,2}$ を割り当てない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mir2-11-fixed-graph -->
**定義の確認。** 一辺だけが $p_0$ と $p_1$ を結び、次数 $d_e=2$、標点がない場合、頂点のラベルは異なり、次数和は2、グラフは木である。対応する非定数写像の代表は

$$
f([u:v])=[u^2:v^2:0:0:0].
$$

標的の対角作用は定義域の再パラメータ化で補えるので、この安定写像は固定される。定数成分がないため、端点の二頂点を「二つの不安定な縮約成分」と解釈しない。
<!-- definition-example-end -->

なぜ木なのか。種数0の連結節点曲線で全成分が有理曲線なら、双対グラフの第一Betti数が全算術種数に寄与する。閉路があれば種数は正になってしまうからである。固定成分の積分では、実際に存在する安定な縮約頂点には $\overline{\mathcal M}_{0,n(v)}$ の積分が残る。これが「固定**点**だけの和」から「固定**グラフ**の和」への変化である。

<a id="prop-mir2-11-cover-automorphisms"></a>

<!-- formal-statement-start -->
> **命題（辺の次数と自己同型係数）**
>
> $i\ne j$、$d\ge1$ とし、座標直線 $\overline{p_ip_j}\cong\mathbb P^1$ への次数 $d$ の全分岐写像を

$$
f_d([u:v])=[u^d:v^d]
$$

> と表す。両端点を保ち $f_d$ と可換な定義域の自己同型がなす群は $\mu_d=\{\zeta\in\mathbb C^\times:\zeta^d=1\}$ で、位数は $d$ である。従って固定グラフのスタック積分には、この辺に由来する $1/d$ の自己同型係数が現れる（他のグラフ対称性とは区別する）。
<!-- formal-statement-end -->

### 証明の見取り図

両端点を固定する $\mathbb P^1$ の自己同型は $[u:v]\mapsto[cu:v]$ である。$d$ 乗写像と可換である条件を直接代入する。

<!-- proof-start -->
### 証明

二つの全分岐点 $[0:1]$、$[1:0]$ を保つ自己同型は $\phi_c([u:v])=[cu:v]$（$c\ne0$）である。$f_d\circ\phi_c([u:v])=[c^du^d:v^d]$ がすべての点で $f_d([u:v])=[u^d:v^d]$ に等しいための必要十分条件は $c^d=1$。その解は相異なる $d$ 個の $d$ 乗根であり、群は $\mu_d$。従って位数は $d$。有限群の自己同型をもつ点をスタックとして積分すると $1/|\mu_d|=1/d$ が掛かる。$\square$
<!-- proof-end -->

**数値例。** $d=2$ では $u\mapsto-u$ と恒等写像の二つ、$d=3$ では $u\mapsto\zeta u$（$\zeta^3=1$）の三つである。この $1/d$ は、後の多重被覆不変量に現れる $1/d^3$ を**この一因子だけで説明するものではない**。残りは変形・障害や法方向などの寄与と併せて計算しなければならない。

## 3. quinticの仮想類をどこで計算するか

滑らかなquintic $X\subset\mathbb P^4$ の定義式 $s\in H^0(\mathbb P^4,\mathcal O(5))$ は、一般には対角トーラスの固有ベクトルではない。そのため「$\overline{\mathcal M}_{0,0}(X,d)$ に $\mathbb P^4$ のトーラス作用がある」と仮定するのは誤りである。

代わりに**作用が確実に存在する射影空間の安定写像空間**を使う。$d\ge1$ では $\overline{\mathcal M}_{0,0}(\mathbb P^4,d)$ は定義され、種数0の射影空間標的なので滑らかな固有スタックである。普遍曲線を $\pi:\mathcal C\to\overline{\mathcal M}_{0,0}(\mathbb P^4,d)$、普遍写像を $f:\mathcal C\to\mathbb P^4$ と書く。

<a id="def-mir2-11-quintic-bundle"></a>

<!-- formal-statement-start -->
> **定義（五次超曲面に対応する束）**
>
> 整数 $d\ge1$ とし、普遍曲線・普遍写像について

$$
E_d=\pi_*f^*\mathcal O_{\mathbb P^4}(5)
$$

> を置く。これは階数 $5d+1$ のベクトル束である。$\mathbb P^4$ の対角作用と $\mathcal O(5)$ の標準線形化から $E_d$ へ等変構造が入る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mir2-11-quintic-bundle -->
**定義の確認。** $d=1$ なら $f^*\mathcal O(5)\cong\mathcal O_{\mathbb P^1}(5)$ で切断空間の基底は $u^5,u^4v,\ldots,v^5$ の6個、従って $\operatorname{rank}E_1=6$。$d=2$ なら $\mathcal O(10)$ の切断は11個で $\operatorname{rank}E_2=11$。二成分で次数が1と2なら各成分の $h^0$ は6と11、節点の一致条件を一つ引いて16となり、次数3の $5\cdot3+1$ と一致する。
<!-- definition-example-end -->

定義中の「束になる」「階数はいくつか」は、種数0が決定的に効くので確認しておく。

<a id="prop-mir2-11-bundle-rank"></a>

<!-- formal-statement-start -->
> **命題（五次束の階数と仮想次元の一致）**
>
> 連結な種数0の節点曲線 $C$ と次数 $d\ge0$ の写像 $f:C\to\mathbb P^4$ に対し、

$$
H^1(C,f^*\mathcal O(5))=0,\qquad
h^0(C,f^*\mathcal O(5))=5d+1
$$

> が成り立つ。従って $d\ge1$ の無標点安定写像空間上で $E_d$ の階数は $5d+1$ であり、

$$
\dim_{\mathbb C}\overline{\mathcal M}_{0,0}(\mathbb P^4,d)
=5d+1
$$

> に一致する。
<!-- formal-statement-end -->

### 証明の見取り図

各既約成分は $\mathbb P^1$ で、引き戻し線束の次数は $5d_a\ge0$。一本の成分の $H^1$ は零で、節点での値を一つずつ一致させても、木の葉を取り除く帰納法により $H^1$ は出ない。最後にRiemann–Rochの $\chi=\deg+1$ を使う。

<!-- proof-start -->
### 証明

各成分 $C_a\cong\mathbb P^1$ において $f^*\mathcal O(5)|_{C_a}\cong\mathcal O_{\mathbb P^1}(5d_a)$、$d_a\ge0$ である。従って $H^1(C_a,\mathcal O(5d_a))=0$、かつ任意の一点で切断の値を指定できる（定数切断でも十分）。

成分が一つなら $H^1=0$、$h^0=5d+1$。複数のとき双対グラフは木だから葉の成分 $C_\ell$ があり、残りを $C'$ とすると $C=C'\cup C_\ell$ は一節点 $q$ で接合する。線束を $L=f^*\mathcal O(5)$ と略すと正規化の短完全列

$$
0\longrightarrow L
\longrightarrow L|_{C'}\oplus L|_{C_\ell}
\longrightarrow L|_q\longrightarrow0
$$

を得る。最後の写像は二つの節点値の差である。$L|_{C_\ell}$ の切断評価は全射だから、$H^0(C',L)\oplus H^0(C_\ell,L)\to L|_q$ も全射。帰納法で $H^1(C',L)=0$、また葉の $H^1$ も零なので、長完全列より $H^1(C,L)=0$。Euler標数は接合のたびに節点の一次元を引くから

$$
\begin{aligned}
h^0(C,L)&=\sum_a(5d_a+1)-\#\{\text{節点}\}\\
&=5d+\#\{\text{成分}\}-(\#\{\text{成分}\}-1)=5d+1.
\end{aligned}
$$

$H^1$ の消滅と一定階数から、cohomology and base change によって $\pi_*L$ はベクトル束になる。最後に射影空間の種数0の安定写像の次元公式

$$
(\dim_{\mathbb C}\mathbb P^4-3)+
\int_d c_1(T\mathbb P^4)+k
=1+5d+k
$$

へ $k=0$ を代入する。射影空間では $T\mathbb P^4$ の大域生成性によって種数0の障害 $H^1(C,f^*T\mathbb P^4)$ も零である。よって期待次元は実際の滑らかなスタックの次元に一致する。$\square$
<!-- proof-end -->



この束の各点の繊維は、定義域上の $f^*\mathcal O(5)$ の切断空間である。quintic方程式 $s$ を引き戻すと、その値が零となる写像は $X$ へ像を持つ。したがって「安定写像が $X$ に含まれる」という条件は $E_d$ の切断の零点条件に直せる。ただし、この零点は一般に横断的ではない。[完全障害理論と仮想基本類の設計](../../GW/GW1-20/index.md#def-gw1-20-perfect-obstruction)が必要になる。

<a id="thm-mir2-11-quintic-euler"></a>

<!-- formal-statement-start -->
> **定理（種数0quinticのEuler類への押し出し：外部入力）**
>
> $X\subset\mathbb P^4$ を滑らかな五次超曲面、$d\ge1$、$j:\overline{\mathcal M}_{0,0}(X,d)\to\overline{\mathcal M}_{0,0}(\mathbb P^4,d)$ を包含とする。自然な完全障害理論から構成した仮想基本類について

$$
\boxed{
j_*[\overline{\mathcal M}_{0,0}(X,d)]^{\mathrm{vir}}
=c_{5d+1}(E_d)\cap
[\overline{\mathcal M}_{0,0}(\mathbb P^4,d)]
}
$$

> が成り立つ。従って [quinticの無標点種数0GW不変量](../MIR2-03/index.md#def-mir2-03-unmarked-number) $N_d$ は右辺を積分した値である。
<!-- formal-statement-end -->

この定理は[零点模型の局所化サイクル](../../GW/GW1-20/index.md#def-gw1-20-section-virtual-cycle)を安定写像の完全障害理論と比較する**外部の仮想類比較**を含む。上で証明した束の階数計算だけからは出ない。適用されるのは種数0、滑らかな五次超曲面、$d\ge1$ のこの設定であり、高種数に同じ $E_d$ の局所自由性を勝手に拡張しない。

この式は重要な回避策も与える。一般の $s$ が等変でなくても、**普通の** $c_{\mathrm{top}}(E_d)$ を計算するために、選んだ等変線形化の **等変** $e_T(E_d)$ を使って射影空間の安定写像空間上で局所化し、最後に重みを零へ戻せばよい。局所化している対象は $\overline{\mathcal M}(X)$ ではなく $\overline{\mathcal M}(\mathbb P^4)$ である。

## 4. 固定グラフの寄与と仮想局所化の境界

[ABBV等変局所化定理](#thm-mir2-11-abbv)は滑らかな空間で使える。しかし一般の安定写像空間や、特に非凸標的の仮想基本類に対して必要なのは、**Graber–Pandharipandeの仮想局所化定理**である。

<a id="thm-mir2-11-virtual-localization"></a>

<!-- formal-statement-start -->
> **定理（Graber–Pandharipande仮想局所化：外部入力）**
>
> $T$ が作用する固有Deligne–Mumfordスタック $\mathcal M$ に、仮想基本類 $[\mathcal M]^{\mathrm{vir}}$ を定める $T$ 等変な完全障害理論があり、固定部分 $\mathcal M^T=\coprod_F F$ に誘導される仮想基本類と移動部分の仮想正規束 $N_F^{\mathrm{vir}}$ が定義されているとする。重みを可逆にした等変Chow群（または対応する有理等変コホモロジー）で

$$
\boxed{
[\mathcal M]^{\mathrm{vir}}
=\sum_F(i_F)_*
\frac{[F]^{\mathrm{vir}}}{e_T(N_F^{\mathrm{vir}})}
}
$$

> が成り立つ。従って等変挿入類 $\alpha$ の積分は固定成分上の $\alpha|_F/e_T(N_F^{\mathrm{vir}})$ の仮想積分の和となる。一般の仮想正規束はベクトル束の差であり、そのEuler類は移動部分の重みから定まる比として読む。
<!-- formal-statement-end -->

この一般定理の証明（内在的正規錐・等変完全障害理論・Gysin写像の整合）は本講の内部では行わない。必要な構成の入口は[完全障害理論](../../GW/GW1-20/index.md#def-gw1-20-perfect-obstruction)にある。本講で計算したのは、**この外部定理をどこへ、どの入力で使うか**である。

今回の無標点種数0の場合、射影空間の安定写像スタック $\mathcal M_d=\overline{\mathcal M}_{0,0}(\mathbb P^4,d)$ は滑らかなので、その固定成分 $F_\Gamma$ に対する普通の正規束 $N_{F_\Gamma/\mathcal M_d}$ で計算できる。[Euler類押し出しの定理](#thm-mir2-11-quintic-euler)と [ABBVの固定成分版](#thm-mir2-11-abbv)を組み合わせると

<a id="prop-mir2-11-graph-sum"></a>

<!-- formal-statement-start -->
> **命題（quintic種数0不変量の固定グラフ表示）**
>
> $d\ge1$ とし、上の $T$ 線形化を用い、相異なる重みの差などの非零重みを可逆にする。すると

$$
\boxed{
N_d
=\left.
\sum_{\Gamma:\,\sum_e d_e=d}
\int_{F_\Gamma}
\frac{e_T(E_d|_{F_\Gamma})}
{e_T(N_{F_\Gamma/\mathcal M_d})}
\right|_{\lambda\to0}
}
$$

> と解釈できる。$F_\Gamma$ とその積分は安定写像**スタック**として取るので、辺の $\mu_{d_e}$ やグラフの対称性に由来する自己同型係数を含む。右辺全体は普通の非等変積分に対応する多項式の定数項であり、**各グラフ寄与を個別に $\lambda=0$ と置くことは要求されないし一般には許されない**。
<!-- formal-statement-end -->

### 証明の見取り図

一般の quintic そのものへ局所化をかけない。まず外部の仮想類比較を使って $N_d=\int_{\mathcal M_d}c_{\mathrm{top}}(E_d)$ とし、この ordinary Euler 類を等変リフトして $\mathcal M_d$ に ABBV を適用する。固定成分は前節のグラフで分類される。

<!-- proof-start -->
### 証明

[quinticのEuler類押し出し](#thm-mir2-11-quintic-euler)を積分すると

$$
N_d=\int_{\mathcal M_d}c_{5d+1}(E_d).
$$

$E_d$ に付けた等変線形化の最高等変Chern類 $e_T(E_d)$ は、重みを0へ戻したとき $c_{5d+1}(E_d)$ になる。$\mathcal M_d$ は固有で滑らかであり、被積分類の複素余次元は $5d+1=\dim_{\mathbb C}\mathcal M_d$ なので、等変積分 $\int_{\mathcal M_d}^T e_T(E_d)$ は $\mathbb Q[\lambda_0,\ldots,\lambda_4]$ の次数0の元、つまり定数 $N_d$ である。

[ABBV公式](#thm-mir2-11-abbv)の固定成分版を $\alpha=e_T(E_d)$、$M=\mathcal M_d$ に適用する。固定成分は固定グラフで分解され、$\alpha|_{F_\Gamma}=e_T(E_d|_{F_\Gamma})$ だから右辺の和になる。等変積分が元から定数なので、個々の重みを分母に持つ式の極は、和の中で相殺する。よって全体の重み零での値は $N_d$。$\square$
<!-- proof-end -->

**辺の重みを一歩具体化する。** $p_i$ と $p_j$ を結ぶ次数 $d$ の辺写像の定義域で、$p_i$ の近くの座標 $z$ に対して標的局所座標は $z^d$。標的の重みが $\lambda_j-\lambda_i$ なので、辺の定義域に誘導される接方向の重みはその $1/d$、すなわち $(\lambda_j-\lambda_i)/d$ となる（有限被覆上で解釈する）。反対の端では符号が反転する。$d$ を無視して重みをそのまま移すと、固定グラフの法Euler類が誤る。

**五次の分子の意味。** $d=1$ の辺では $f^*\mathcal O(5)=\mathcal O_{\mathbb P^1}(5)$ の切断の重みは、採用した双対線形化で

$$
-5\lambda_i,\,
-(4\lambda_i+\lambda_j),\,
-(3\lambda_i+2\lambda_j),\,
-(2\lambda_i+3\lambda_j),\,
-(\lambda_i+4\lambda_j),\,
-5\lambda_j.
$$

これらは単一の辺の $H^0$ に由来し、節点があれば節点値の一致条件も考慮する。従って「五次のEuler類が分子に現れる」動機は見えるが、この六つの重みだけを掛けても、**固定グラフ全体の寄与や [I関数の五次積](../MIR2-10/index.md#def-mir2-10-i-function)の全次数公式を証明したことにはならない**。法束の分母、節点の接合、縮約頂点の積分、自己同型係数をそろえる必要がある。

たとえば辺次数 $d=2$ では自己同型係数は $1/2$、辺端の接重みは $(\lambda_j-\lambda_i)/2$ となる。これらは独立に由来する要素で、互いに取り違えない。

### 何を外部入力にして、何を計算できたか

- **本文内で確認したこと：** 射影直線の固定点計算、$\mathbb P^4$ の接重み、次数 $d$ の辺の $\mu_d$、$E_d$ の階数と $H^1$ 消滅、仮想次元との一致、局所化公式の適用対象の切り分け。
- **明示的な外部定理：** ABBVの一般公式、quintic仮想類のEuler類への押し出し、Graber–Pandharipande仮想局所化の一般証明、およびグラフ上の全ての法束寄与を整理するための理論。
- **次講で必要なこと：** [I関数](../MIR2-10/index.md#def-mir2-10-i-function)を [J関数](../MIR2-09/index.md#def-mir2-09-j-function)へ結び付けるミラー定理は、この固定グラフ表示を述べただけでは従わない。対称性・母関数の特徴付けと座標変換を含む数学的定理を別途必要とする。

参考：Graber–Pandharipande, [Localization of virtual classes](https://arxiv.org/abs/alg-geom/9708001)（仮想局所化の原論文）。本節の外部入力の範囲は同定理と、種数0の凸な射影標的上の五次超曲面Euler類の比較に限定した。

## 5. 演習：固定点から固定グラフへ

### Level A：定義・重み・次数

<a id="ex-mir2-11-a01"></a>
#### MIR2-11-A01 二固定点での積分
- Level: A

$\mathbb P^1$ に第1節の作用を入れ、$H|_{p_0}=0$、$H|_{p_\infty}=-\lambda$ とする。固定点の接重みを求め、[ABBV公式](#thm-mir2-11-abbv)で $\int^T1$ と $\int^T H$ を計算せよ。

<!-- solution-start -->
**詳細解答。** $p_0$ の座標 $x/y$ は $t$ 倍されるので $+\lambda$、$p_\infty$ の $y/x$ は $t^{-1}$ 倍されるので $-\lambda$。従って

$$
\int^T1=\frac1\lambda+\frac1{-\lambda}=0,
\qquad
\int^T H=\frac0\lambda+\frac{-\lambda}{-\lambda}=1.
$$

分母は点の個数ではなく各点の接Euler類であり、符号が逆になる。
<!-- solution-end -->

<a id="ex-mir2-11-a02"></a>
#### MIR2-11-A02 射影四次元の接重み
- Level: A

$\mathbb P^4$ の座標点 $p_2$ における接表現の重み四つとEuler類を求めよ。

<!-- solution-start -->
**詳細解答。** $x_2\ne0$ のチャートで独立な座標は $x_0/x_2,x_1/x_2,x_3/x_2,x_4/x_2$。それぞれ $t_j/t_2$ 倍されるので、重みは $\lambda_0-\lambda_2,\lambda_1-\lambda_2,\lambda_3-\lambda_2,\lambda_4-\lambda_2$。Euler類は

$$
(\lambda_0-\lambda_2)(\lambda_1-\lambda_2)
(\lambda_3-\lambda_2)(\lambda_4-\lambda_2).
$$

$i=j$ の項を含めると零になるため、$j\ne2$ の四因子だけを掛ける。
<!-- solution-end -->

<a id="ex-mir2-11-a03"></a>
#### MIR2-11-A03 辺の自己同型
- Level: A

$f_3([u:v])=[u^3:v^3]$ の両端を保つ自己同型をすべて求め、スタック積分の自己同型係数を述べよ。

<!-- solution-start -->
**詳細解答。** 両端点を保つ定義域自己同型は $\phi_c([u:v])=[cu:v]$。$f_3\phi_c=f_3$ は $c^3=1$ と同値である。従って $\phi_1,\phi_\zeta,\phi_{\zeta^2}$ の三つ（$\zeta=e^{2\pi i/3}$）が自己同型であり、群は $\mu_3$。対応する有限群のスタック積分係数は $1/3$ である。標的の二固定点を交換する操作は、指定した対角トーラスの一般の作用で許される自己同型ではない。
<!-- solution-end -->

<a id="ex-mir2-11-a04"></a>
#### MIR2-11-A04 五次束の階数
- Level: A

次数 $d=2$ の種数0安定写像 $f:C\to\mathbb P^4$ について、定義域が一成分の場合の $h^0(C,f^*\mathcal O(5))$ と $h^1$ を求め、無標点の期待次元と比較せよ。

<!-- solution-start -->
**詳細解答。** 一成分では $C\cong\mathbb P^1$、$f^*\mathcal O(5)\cong\mathcal O_{\mathbb P^1}(10)$。その切断は $u^{10},u^9v,\ldots,v^{10}$ の11個、$H^1=0$。従って束の階数は11。射影空間への種数0無標点写像の期待次元は $(4-3)+5d=1+10=11$ で一致する。これが五次Euler類で零次元積分が得られる理由である。
<!-- solution-end -->

<a id="ex-mir2-11-a05"></a>
#### MIR2-11-A05 木の次数
- Level: A

固定グラフが三頂点 $v_0,v_1,v_2$ と二辺 $(v_0,v_1),(v_1,v_2)$ からなり、ラベルが $0,1,2$、辺次数がそれぞれ2,1である。全次数・第一Betti数を求め、中央頂点が標点なしの一価・二価の縮約安定成分を必ず持つか答えよ。

<!-- solution-start -->
**詳細解答。** 全次数は $2+1=3$。連結グラフの第一Betti数は $E-V+1=2-3+1=0$ なので木である。中央頂点は価数2で、標点もないから、定数写像の縮約成分としては安定性の「三つ以上の特別点」を満たさない。この頂点は二辺の接合位置を記録する不安定頂点として扱うのであり、$\overline{\mathcal M}_{0,2}$ を積分対象として作らない。
<!-- solution-end -->

### Level B：式の再構成と仮定の働き

<a id="ex-mir2-11-b01"></a>
#### MIR2-11-B01 多項式の局所化を二通りで検算
- Level: B

$F(H)=H^2+2\lambda H+3\lambda^2$ とする。[射影直線の命題](#prop-mir2-11-p1-integration)を使って、(i) 環の関係式による簡約、(ii) 固定点公式の両方で $\int_{\mathbb P^1}^T F(H)$ を求めよ。

<!-- solution-start -->
**詳細解答。** (i) $H(H+\lambda)=0$ より $H^2=-\lambda H$。したがって

$$
F(H)=\lambda H+3\lambda^2.
$$

$\int^T H=1$、$\int^T1=0$ から積分は $\lambda$。

(ii) $p_0$ では $F(0)=3\lambda^2$、$p_\infty$ では $F(-\lambda)=\lambda^2-2\lambda^2+3\lambda^2=2\lambda^2$。接Euler類は順に $\lambda,-\lambda$ だから

$$
\frac{3\lambda^2}{\lambda}+\frac{2\lambda^2}{-\lambda}
=3\lambda-2\lambda=\lambda.
$$

一致する。$\int 3\lambda^2$ を普通の積分と同様に単に $3\lambda^2$ と残すのは、積分による次数の減少を無視した誤りである。
<!-- solution-end -->

<a id="ex-mir2-11-b02"></a>
#### MIR2-11-B02 節点での切断の接合
- Level: B

$C=C_1\cup C_2$ を一点で接合した種数0曲線、$f$ の成分次数を1,2とする。$L=f^*\mathcal O(5)$ について正規化の短完全列から $H^1(C,L)$ と $h^0(C,L)$ を求めよ。

<!-- solution-start -->
**詳細解答。** $L|_{C_1}=\mathcal O(5)$、$L|_{C_2}=\mathcal O(10)$ なので $h^0$ はそれぞれ6,11、$H^1$ は双方零。節点を $q$ とすると

$$
0\to L\to L|_{C_1}\oplus L|_{C_2}\to L|_q\to0
$$

で最後の写像は節点での値の差である。$\mathcal O(5)$ の切断評価は全射だから $H^0(C_1,L)\oplus H^0(C_2,L)\to L|_q$ も全射。長完全列から $H^1(C,L)=0$、$h^0(C,L)=6+11-1=16$。全次数3に対する $5\cdot3+1=16$ と一致する。節点条件の「1」を引かないと、階数を17と誤る。
<!-- solution-end -->

<a id="ex-mir2-11-b03"></a>
#### MIR2-11-B03 二重被覆の重みと係数
- Level: B

標的座標直線の $p_i$ 側局所座標が重み $\lambda_j-\lambda_i$ を持ち、写像が $w=z^2$ と書けるとする。定義域端点の接重み、反対側の接重み、被覆を保つ自己同型がなす群を求め、それらが同じ情報でない理由を説明せよ。

<!-- solution-start -->
**詳細解答。** 標的作用で $w$ が重み $\lambda_j-\lambda_i$ を持つ。$w=z^2$ を保つため、有限被覆上での定義域作用は

$
z\longmapsto t^{(\lambda_j-\lambda_i)/2}z
$

と書ける。従って $z$ の接重みは $(\lambda_j-\lambda_i)/2$。反対端の局所座標は $z^{-1}$ だから、重みは $(\lambda_i-\lambda_j)/2$ である。

一方、$z\mapsto-z$ は $z^2$ を変えない。そのため写像を保つ自己同型は $\mu_2$ をなし、スタック係数は $1/2$ となる。前二つは動く**接方向**の重み、最後は写像を保つ**離散自己同型**の位数である。両方に「2」が出ても、法Euler類の重みを自己同型係数で代用してはならない。
<!-- solution-end -->

<a id="ex-mir2-11-b04"></a>
#### MIR2-11-B04 間違った局所化の適用先
- Level: B

一般の滑らかなquintic $X\subset\mathbb P^4$ について「$T=(\mathbb C^\times)^5$ が $X$ を保つから、$\overline{\mathcal M}_{0,0}(X,d)$ に直接ABBVを使える」とする主張の誤りを示せ。代わりに用いる空間・束・外部定理・非等変極限を順に記せ。

<!-- solution-start -->
**詳細解答。** 一般の五次式は、各 $x_i$ を独立に拡大するとモノミアルが異なる文字で変換され、零点集合を保つとは限らない。従って標的 $X$ に想定した $T$ 作用がなく、$X$ の安定写像空間に固定グラフを直接定義できない。

作用する空間を $\mathcal M_d=\overline{\mathcal M}_{0,0}(\mathbb P^4,d)$ に取り替え、束 $E_d=\pi_*f^*\mathcal O(5)$ を用いる。まず[仮想類のEuler類押し出し](#thm-mir2-11-quintic-euler)（外部入力）によって $N_d=\int_{\mathcal M_d}c_{5d+1}(E_d)$ とする。次に $e_T(E_d)$ に[ABBV公式](#thm-mir2-11-abbv)を適用し、固定グラフの和を計算する。最後に全グラフの**和**で等変パラメータの非等変極限を取る。各グラフ項は分母に重み差を含むので、各項を先に重み零にする操作は一般に定義されない。
<!-- solution-end -->

### Level C：道具とその限界を一つの計算で接続

<a id="ex-mir2-11-c01"></a>
#### MIR2-11-C01 局所化からquinticへの橋
- Level: C

以下の設定で順に導け。

(1) $T$ が $\mathbb P^1$ に $t[x:y]=[tx:y]$ と作用し、$H=c_1^T(\mathcal O(1))$ を第1節の線形化で取る。$\int_{\mathbb P^1}^T(H^2+2\lambda H+3\lambda^2)$ を固定点公式で求め、等変環の関係式でも検算せよ。

(2) $\mathbb P^4$ の二座標点 $p_i,p_j$ を結ぶ次数 $d=2$ の辺写像 $f_2$ について、両端点での接重みと自己同型係数を導け。

(3) 種数0無標点で $d=2$ の五次束 $E_2$ の階数と $\overline{\mathcal M}_{0,0}(\mathbb P^4,2)$ の複素次元を求め、Euler類積分が零次元になる理由を説明せよ。

(4) このデータだけで $N_2$ やミラー定理が証明されるか。必要な外部入力と未計算の寄与を明示せよ。

<!-- solution-start -->
**詳細解答。**

(1) $p_0$ の接重みは $\lambda$、$p_\infty$ では $-\lambda$。$H$ の制限は $0,-\lambda$。したがって固定点寄与は

$$
\frac{3\lambda^2}{\lambda}
+\frac{(-\lambda)^2+2\lambda(-\lambda)+3\lambda^2}{-\lambda}
=3\lambda-\frac{2\lambda^2}{\lambda}
=\lambda.
$$

また $H(H+\lambda)=0$ より $H^2=-\lambda H$ であり、被積分類は $\lambda H+3\lambda^2$。$\int^T H=1$、$\int^T1=0$ なので同じ $\lambda$ となる。

(2) 標的の局所座標 $x_j/x_i$ は重み $\lambda_j-\lambda_i$ を持つ。写像が局所的に $w=z^2$ だから、定義域の $z$ の重みは $(\lambda_j-\lambda_i)/2$ である。反対端の $z^{-1}$ の重みは $(\lambda_i-\lambda_j)/2$。$\phi_c([u:v])=[cu:v]$ が $f_2$ を保つ条件は $c^2=1$ なので $\operatorname{Aut}(f_2)=\mu_2$、係数は $1/2$。

(3) 一成分なら $f_2^*\mathcal O(5)=\mathcal O_{\mathbb P^1}(10)$、$H^1=0$、$h^0=11$ で $\operatorname{rank}E_2=11$。一方射影空間への安定写像の次元は $(4-3)+5\cdot2=11$。よって最高Chern類 $c_{11}(E_2)$ は複素余次元11で、積分が数になる。

(4) いいえ。一般のquinticはトーラス不変でないので、まず[仮想類押し出しの定理](#thm-mir2-11-quintic-euler)が必要である。次に[局所化](#prop-mir2-11-graph-sum)で全固定グラフを列挙し、節点の接合、各辺・安定頂点の変形と障害、Euler類の重み積、グラフ全体の自己同型を合算しなければ $N_2$ の数値は出ない。さらに $I$ と $J$ の全次数関係を主張するには別途quinticミラー定理の外部証明が必要である。今回の一辺の計算はその**入力の一部**に過ぎない。
<!-- solution-end -->

## 6. 次講への接続

ここまでで、quinticの数値計数は射影空間上の等変Euler類積分へ還元され、固定グラフで原理的に整理できることが分かった。しかし [I関数の係数公式](../MIR2-10/index.md#prop-mir2-10-i01)が自動的に [GWのJ関数](../MIR2-09/index.md#def-mir2-09-j-function)を計算するわけではない。**MIR2-12** では、どの正規化・鏡像座標で両者が結び付くのかを、定理の正確な仮定と結論として整理する。
