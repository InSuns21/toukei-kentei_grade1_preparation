# MIR2-12 quinticミラー定理の正確な主張

<!-- definition-example-audit: strict -->

## 1. 二つの母関数を結ぶために何が足りないか

前講までで、[Gromov–WittenのJ関数](../MIR2-09/index.md#def-mir2-09-j-function)は安定写像の仮想基本類を用いて定義できた。他方、[超幾何I関数](../MIR2-10/index.md#def-mir2-10-i-function)は有限個の積から次数ごとに計算でき、[周期との対応](../MIR2-10/index.md#thm-mir2-10-frobenius-match)も証明した。[局所化による固定グラフ和](../MIR2-11/index.md#prop-mir2-11-graph-sum)はGW数を射影空間上の計算に移すが、それだけではI関数とJ関数を一致させる公式にならない。

本講の中心問いは「**どの条件と規格化の下で、何と何が等しいのか**」である。深い比較定理を外部の数学的入力として正確に掲げた上で、その帰結を超幾何級数の出発点から検算する。外部定理の証明を、単なる固定点の数え上げで代用しない。

以下、$X\subset\mathbb P^4_{\mathbb C}$ は**滑らかな五次超曲面**（複素三次元）とし、$H=c_1(\mathcal O_X(1))$、$R_{\mathrm{amb}}=\mathbb Q[H]/(H^4)$ とする。[三重交叉数](../MIR2-02/index.md#prop-mir2-02-degree-zero-three-point)より $\int_XH^3=5$。$w$ は可逆な子孫変数、$z$ はミラー側の局所座標、$Q$ はA側の形式的次数変数、$q$ は鏡像写像後の指数座標であり、これらを同じ文字だからという理由で同一視しない。

必要なのは $H$ が生成する**偶数次ambientコホモロジー部分**である。原始三次コホモロジー全体について同じ四成分の等式を主張するものではない。形式級数の係数は有理数とし、$\operatorname{Log}z$ を読むときは $0<|z|<\delta<1/3125$ の切断円板で分枝を固定する。

## 2. I関数から比較可能な量を作る

[前講のI関数の定義](../MIR2-10/index.md#def-mir2-10-i-function)を、$h=H/w$（$h^4=0$）として書き直す。

$$
I_X(z,w)=w\,e^{hL}\sum_{d\ge0}z^d B_d(h),
\qquad
L=\operatorname{Log}z,\quad
B_d(h)=\frac{\prod_{m=1}^{5d}(5h+m)}
{\prod_{m=1}^{d}(h+m)^5}.
$$

ここで $B_0=1$。$w$ と $H$ は独立な記号であり、$h$ は任意の複素数でなく、四乗すると零になるコホモロジー値の元である。$B_d$ の分母はすべて非零の定数項を持つため、この環で割り算できる。

[Iの定数・一次成分](../MIR2-10/index.md#prop-mir2-10-i01)は

$$
I_0(z)=\sum_{d\ge0}\frac{(5d)!}{(d!)^5}z^d,
\qquad
I_1(z)=5\sum_{d\ge1}
\frac{(5d)!}{(d!)^5}(H_{5d}-H_d)z^d
$$

である。ここで調和数は $H_n=\sum_{m=1}^n1/m$、$H_0=0$。$I_0(0)=1$ なので $I_0^{-1}\in\mathbb Q[[z]]$ が存在する。まず $I_0$ で割って単位類成分を $w$ に正規化し、次に $h$ の係数を消す座標補正を作る。

<a id="def-mir2-12-flat-normalization"></a>

<!-- formal-statement-start -->
> **定義（I関数の平坦座標と正規化）**  
> 上記の滑らかなquinticの超幾何I関数について、形式的な対数 $L=\operatorname{Log}z$ を持つ環で

$$
g(z)=\frac{I_1(z)}{I_0(z)},\qquad
T(z)=L+g(z),\qquad
q(z)=e^{T(z)}=z e^{g(z)}
$$

> と置く。また次の正規化I関数を定める。

$$
\boxed{
\mathcal F_X(z,w):=
e^{-HT(z)/w}\frac{I_X(z,w)}{I_0(z)}
=\frac{w}{I_0(z)}e^{-hg(z)}
\sum_{d\ge0}z^dB_d(h).
}
$$

> $\mathcal F_X(z,w)$ は $R_{\mathrm{amb}}[w,w^{-1}][[z]]$ の元として解釈する。左辺の対数因子は右辺では完全に相殺され、$q=z+O(z^2)$ は一意の形式的逆級数 $z=z(q)$ を持つ。
<!-- formal-statement-end -->

この $T$ と $q$ は[周期比による規格化ミラー座標](../MIR1-15/index.md#def-mir1-15-mirror-coordinate)と同じものである。ここでの $T$ は $2\pi i$ で割る前の対数座標であり、別の規約の $t=T/(2\pi i)$ と混同しない。

<!-- definition-example-start: def-mir2-12-flat-normalization -->

**定義の確認**。 [Iの初期係数](../MIR2-10/index.md#prop-mir2-10-i01)から

$$
I_0=1+120z+113400z^2+O(z^3),\qquad
I_1=770z+810225z^2+O(z^3).
$$

$1/I_0=1-120z-99000z^2+O(z^3)$ を掛けて

$$
g=770z+(810225-120\cdot770)z^2+O(z^3)
=770z+717825z^2+O(z^3)
$$

となる。従って[ミラー写像の既出の係数](../MIR2-10/index.md#prop-mir2-10-mirror-coordinate)と同様に

$$
q=ze^g=z+770z^2+1014275z^3+O(z^4).
$$

原点で $dq/dz=1$ だから逆級数が存在する。また $e^{-hT}e^{hL}=e^{-hg}$ を実際に掛けることで、対数分枝が $\mathcal F_X$ に残らないことも確かめた。

さらに、[I関数の定数・一次成分](../MIR2-10/index.md#prop-mir2-10-i01)を $B_d(h)$ の係数に戻してみる。$I_0$ は $\sum_d z^dB_d(h)$ の定数項、$I_1$ はその $h$ 係数なので、$h^4=0$ の環で

$
\frac{\sum_{d\ge0}z^dB_d(h)}{I_0(z)}
=1+\frac{I_1(z)}{I_0(z)}h+O(h^2)
=1+g(z)h+O(h^2),
\qquad e^{-hg}=1-gh+O(h^2).
$

両者の積は $1+0h+O(h^2)$ となり、$\mathcal F_X$ の単位類成分が $w$、$H$ 一次成分が $0$ であることまで**定義の式から**確認できる。高次の係数は次節で計算する。

<!-- definition-example-end -->

## 3. 規格化すると消える二つの成分

[I関数の係数分解](../MIR2-10/index.md#prop-mir2-10-i01)をさらに二段進めて、$B_d(h)=a_d+b_dh+c_dh^2+e_dh^3$（$h^4=0$）と置く。次数ごとにこの表示が一意であり、$I_0=\sum a_dz^d$、$I_1=\sum b_dz^d$ である。

$a_d,b_d$ の意味を保ったまま、$A(z)=\sum c_dz^d$、$B(z)=\sum e_dz^d$ とする。文字 $B(z)$ と個別次数の $B_d(h)$ は別の対象である。

<a id="prop-mir2-12-normalized-components"></a>

<!-- formal-statement-start -->
> **命題（正規化I関数の低次成分）**  
> 前節の $I_0,I_1,g,T,\mathcal F_X$ と $A,B$ を用い、$h=H/w$ とする。このとき

$$
\boxed{
\mathcal F_X(z,w)=
w\left\{
1+h^2\left(\frac{A}{I_0}-\frac{g^2}{2}\right)
+h^3\left(\frac{B}{I_0}-g\frac{A}{I_0}+\frac{g^3}{3}\right)
\right\}.
}
$$

> 特に単位類成分は厳密に $w$、$H$ 成分は零であり、正の $z$ 次数に対して $H^2/w$ と $H^3/w^2$ しか現れない。
<!-- formal-statement-end -->

### 証明の見取り図

最初に $I_0$ で割ると $h$ の係数は $g=I_1/I_0$ になる。その次に $e^{-hg}$ を掛ければ一次係数が相殺される。二次・三次も積を実際に展開する。

<!-- proof-start -->
### 証明

$h^4=0$ より

$$
\frac{I_X}{wI_0}
=e^{hL}\left(1+gh+\frac{A}{I_0}h^2+
\frac{B}{I_0}h^3\right).
$$

$T=L+g$ を代入すると

$$
e^{-hT}\frac{I_X}{wI_0}
=e^{-hg}\left(1+gh+\frac{A}{I_0}h^2+
\frac{B}{I_0}h^3\right).
$$

指数の有限展開は

$$
e^{-hg}=1-gh+\frac{g^2h^2}{2}-\frac{g^3h^3}{6}.
$$

従って $h$ 係数は $g-g=0$、$h^2$ 係数は $A/I_0-g^2+g^2/2=A/I_0-g^2/2$。$h^3$ 係数は

$$
\frac{B}{I_0}-g\frac{A}{I_0}
+\frac{g^3}{2}-\frac{g^3}{6}
=\frac{B}{I_0}-g\frac{A}{I_0}+\frac{g^3}{3}.
$$

全体に $w$ を戻し、$wh^2=H^2/w$、$wh^3=H^3/w^2$ を使って結論を得る。$\square$
<!-- proof-end -->

**次数1の実演。** [五次積の直接展開](../MIR2-10/index.md#def-mir2-10-i-function)から

$$
B_1(h)=120+770h+575h^2-1150h^3.
$$

$z$ 一次では $I_0^{-1}=1-120z+\cdots$、$g=770z+\cdots$ なので、定数項120と一次項770がそれぞれ相殺される。$g^2=O(z^2)$ に注意して、正規化後は

$$
\boxed{
\mathcal F_X(z,w)
=w+z\left(\frac{575H^2}{w}
-\frac{1150H^3}{w^2}\right)+O(z^2).
}
$$

この段階は純粋な超幾何計算であり、$575$ をGW不変量と結び付けるにはまだ定理が要る。

## 4. J関数を比較する正しい引数

[J関数の定義](../MIR2-09/index.md#def-mir2-09-j-function)では、$\mathbf t=0$ とした正次数の項は追加標点数 $n=0$ のものだけになる。$Q$ をquintic上の超平面次数 $d$ を記録する変数とすると

$$
J_X(0,Q,w)
=w+\sum_{d\ge1}Q^d
(\operatorname{ev}_1)_*
\left(\frac{1}{w-\psi_1}
\cap[\overline{\mathcal M}_{0,1}(X,d)]^{\mathrm{vir}}\right).
$$

仮想類の存在と順像は[非凸quinticの仮想GW理論](../MIR2-02/index.md#def-mir2-02-virtual-gw)に依存する。$d>0$ なので一標点写像は安定であり、$d=0$ の不安定な項を勝手にこの和に含めない。

[子孫の次数判定](../MIR2-09/index.md#prop-mir2-09-dimension-rule)と[一標点の順像係数](../MIR2-09/index.md#prop-mir2-09-quintic-first-coefficient)より、正次数の $Q^d$ 係数の形は

$$
[Q^d]J_X(0,Q,w)=
\frac{dN_d}{5}\frac{H^2}{w}
+E_d\frac{H^3}{w^2},
\qquad d\ge1,
$$

ここで $N_d=\langle\,\rangle_{0,d}^{X}$ は**有理数値の種数0GW不変量**、$E_d$ は別の子孫積分に依存する有理係数である。$N_d$ と「次数 $d$ の埋め込まれた曲線の本数」は定義として同一ではない。

一方、前節の $\mathcal F_X$ は **$z$** の級数である。同じ係数を比較するには、[局所可逆なミラー写像](../MIR1-15/index.md#thm-mir1-15-local-biholomorphism)で得る $q(z)$ をJの次数変数へ代入し、$Q=q(z)$ として比較する必要がある。

## 5. IとJを結ぶ比較結果

ここで初めて、幾何的に定義したJと超幾何的に作ったIをつなぐ。関係は、**Iの規格化とミラー写像を両方行った後の等式**である。

<a id="thm-mir2-12-quintic-mirror"></a>

<!-- formal-statement-start -->
> **定理（quinticの種数0ミラー定理：Givental／Lian–Liu–Yau、外部入力）**  
> $X\subset\mathbb P^4_{\mathbb C}$ を滑らかな五次超曲面、$H=c_1(\mathcal O_X(1))$ とする。$X$ の種数0安定写像の自然な仮想基本類から定義する [J関数](../MIR2-09/index.md#def-mir2-09-j-function)を、$H$ が生成する偶数次ambient部分に制限する。[I関数](../MIR2-10/index.md#def-mir2-10-i-function)から

$$
I_0(z)=\sum_{d\ge0}\frac{(5d)!}{(d!)^5}z^d,\qquad
T(z)=\operatorname{Log}z+\frac{I_1(z)}{I_0(z)},\qquad
q(z)=e^{T(z)}
$$

> と定める。$I_1$ はIの $H/w$ 一次成分から $I_0\operatorname{Log}z$ を除いた正則部分とする。このとき、$Q=q(z)$ の代入に関する形式的なambientコホモロジー値恒等式として

$$
\boxed{
\frac{I_X(z,w)}{I_0(z)}
=e^{HT(z)/w}\,J_X(0,q(z),w).
}
$$

> すなわち、前節で定めた正規化を用いれば

$$
\boxed{\mathcal F_X(z,w)=J_X(0,q(z),w).}
$$

> これは種数0、滑らかな五次超曲面の自然な仮想GW理論についての定理であり、任意のCalabi–Yau三次元多様体に同じ超幾何積の式が使えるという主張ではない。
<!-- formal-statement-end -->

**どこが深いか。** 左辺のIは五次積で明示された代数的級数、右辺のJは仮想基本類で定義した曲線計数の母関数である。[五次束の階数の計算](../MIR2-11/index.md#prop-mir2-11-bundle-rank)、[quinticの仮想類をEuler類へ押し出す定理](../MIR2-11/index.md#thm-mir2-11-quintic-euler)、[仮想局所化の外部定理](../MIR2-11/index.md#thm-mir2-11-virtual-localization)は比較証明の重要な材料になる。しかし、それらの式を単純に足しただけで上記の**全次数・全成分の関数恒等式**が出るわけではない。

証明には、固定グラフの全寄与の組織化、GW母関数の性質や再帰的な特徴付け、境界・自己同型・安定化の整合、ミラー写像とスカラー正規化の決定が必要である。これらを含む比較の核心は **Givental および Lian–Liu–Yau による外部の数学的証明**として用いる。前講で確認した単一辺の $\mu_d$ やEuler類の階数を、比較定理の独立した完全証明だと取り違えない。

**よく使われる同値な規約。** $J_X(bH,Q,w)$ を前述の大きいJの因子方向への制限とすると、種数0の**子孫**因子方程式・string方程式から、適切に形式完備化した設定で

$$
J_X(bH,Q,w)=e^{bH/w}J_X(0,Qe^b,w)
$$

が成り立つ。この方程式は一次挿入の因子公理だけからは直ちに証明できない追加のGW公理であり、ここではその一般論も外部入力とする。$b=T(z)$、$Q=1$ と書く慣習では、右辺の正次数は $q=e^T$ によって展開した後に解釈する。そうするとミラー定理は $I_X/I_0=J_X(T(z)H,1,w)$ とも書ける。**対数を持つ $T$ を無条件に通常の形式べき級数へ代入するのではなく、$q$ で展開した等式として読む。**

参考：A. Givental, [Equivariant Gromov–Witten Invariants](https://arxiv.org/abs/alg-geom/9603021)；B. Lian, K. Liu, S.-T. Yau, [Mirror Principle I](https://arxiv.org/abs/alg-geom/9712011)；T. Coates and A. Givental, [Quantum Riemann–Roch, Lefschetz and Serre](https://annals.math.princeton.edu/2007/165-1/p02)（量子Lefschetzとの関連）。ここでは原論文の全証明を再現したとは主張しない。

## 6. 定理を使って初めて分かる係数

先に**Iのみで**求めた次数1の展開と、[Jの一次順像係数](../MIR2-09/index.md#prop-mir2-09-quintic-first-coefficient)を、今度は定理によって比較できる。$q=z+O(z^2)$ なので $Q=q(z)$ の一次係数は $Q$ の一次係数と等しい。

<a id="prop-mir2-12-degree-one-gw"></a>

<!-- formal-statement-start -->
> **命題（ミラー定理から得られる次数1のGW数）**  
> 前定理の仮定と規約の下で、滑らかなquintic $X$ の無標点種数0GW不変量 $N_1$ は

$$
\boxed{N_1=2875}
$$

> である。この値は仮想曲線計数の値であり、実際の直線本数との独立した照合は別の幾何学的議論を要する。
<!-- formal-statement-end -->

### 証明の見取り図

Iを正規化すると $z$ 一次の $H^2/w$ 係数は575である。ミラー定理でこれをJへ運び、既習の一標点の因子公理による $dN_d/5$ と比較する。

<!-- proof-start -->
### 証明

第3節で超幾何積を展開して

$$
[z^1][H^2/w]\,\mathcal F_X(z,w)=575
$$

を得た。ここで角括弧は指定した形式級数とコホモロジー基底の係数抽出を表す。ミラー定理より $\mathcal F_X=J_X(0,q(z),w)$。$q=z+770z^2+\cdots$ なので、$J_X(0,Q,w)=w+Q A_1(w)+O(Q^2)$ なら

$$
J_X(0,q(z),w)=w+zA_1(w)+O(z^2).
$$

[一標点J係数の命題](../MIR2-09/index.md#prop-mir2-09-quintic-first-coefficient)を $d=1$ に適用すると $A_1(w)$ の $H^2/w$ 係数は $1\cdot N_1/5$。したがって $N_1/5=575$、すなわち $N_1=5\cdot575=2875$。これは定理を使った帰結であり、Iの積の定義だけからGW数を同定したものではない。$\square$
<!-- proof-end -->

この計算では、五次の積の分母にある「5」、三重交叉数の「5」、次数の「$d$」をそれぞれ異なる由来の数として扱った。特に式中の $5$ は、$d=1$ における因子公理の $d$ を代入した結果ではない。

### 典型的な三つの誤り

- **$I=J$ と書く誤り。** $I$ の単位類成分は $wI_0(z)=w(1+120z+\cdots)$ だが、$J_X(0,Q,w)$ の単位類成分は $w$。$I_0$ で割らない等式は一次で破綻する。
- **$I/I_0=J_X(0,z,w)$ と書く誤り。** 左辺には $e^{hL}$ と正次数の $h$ 成分が残り、$J_X(0,Q,w)$ は$H$ の項を持たない。$e^{-hT}$ による除去と $Q=q(z)$ の代入を両方行う。
- **$Q=z$ と置く誤り。** $q=z+770z^2+\cdots$ なので、たとえば $J_X(0,Q,w)=w+a_1Q+a_2Q^2+\cdots$ の $z^2$ 係数は $770a_1+a_2$。$Q=z$ と置けば $770a_1$ を失う。

形式的な恒等式で得た各係数が解析的にどの領域で収束するか、任意のモジュライ境界まで延長できるかは別の問題である。$I_0$ と $q(z)$ の**原点近傍**における正規化を、全複素構造モジュライ空間での大域的同一性へ無断で拡張しない。

## 7. 演習：二つの規格化を区別して使う

### Level A：形式級数と引数の確認

<a id="ex-mir2-12-a01"></a>
#### MIR2-12-A01 I0による正規化
- Level: A

$I_0=1+120z+113400z^2+O(z^3)$ とする。$I_0^{-1}$ を二次まで求め、$I_X$ の単位類成分を $I_0$ で割る理由を述べよ。

<!-- solution-start -->
**詳細解答**。$I_0^{-1}=1+az+bz^2+O(z^3)$ と置いて積を取る。$z$ 係数は $a+120=0$ だから $a=-120$。$z^2$ 係数は $b+120a+113400=0$ なので $b=14400-113400=-99000$。

$$
I_0^{-1}=1-120z-99000z^2+O(z^3).
$$

$I_X$ の単位類成分は $wI_0$ なので割った後は $w$ になる。[J関数の定義](../MIR2-09/index.md#def-mir2-09-j-function)で $\mathbf t=0$ とした単位類成分も $w$ であり、比較するための必要な規格化である。
<!-- solution-end -->

<a id="ex-mir2-12-a02"></a>
#### MIR2-12-A02 鏡像写像の初項
- Level: A

$g(z)=770z+717825z^2+O(z^3)$ から $q=ze^{g(z)}$ を三次まで求めよ。

<!-- solution-start -->
**詳細解答**。指数は

$$
e^g=1+g+\frac{g^2}{2}+O(z^3)
=1+770z+(717825+770^2/2)z^2+O(z^3).
$$

$770^2/2=296450$ なので二次係数は1014275。従って

$$
q=z+770z^2+1014275z^3+O(z^4).
$$

対数 $T=\operatorname{Log}z+g$ 自体は原点で正則ではないが、$q=ze^g$ は原点へ正則に延長する。
<!-- solution-end -->

<a id="ex-mir2-12-a03"></a>
#### MIR2-12-A03 四乗零の指数
- Level: A

$h^4=0$ の環で $e^{-hg}$ を展開し、$(1+gh+ch^2+eh^3)$ と掛けた $h^0,h^1$ 係数を求めよ。$c,e,g$ は可換な形式係数とする。

<!-- solution-start -->
**詳細解答**。指数は $1-gh+g^2h^2/2-g^3h^3/6$ で打ち切れる。定数項は1。$h$ 一次項は第一因子の $-gh$ と第二因子の $gh$ の和なので $-g+g=0$。$h^4$ 以上は零であり、数値収束は要らない。
<!-- solution-end -->

<a id="ex-mir2-12-a04"></a>
#### MIR2-12-A04 Jの次数と安定性
- Level: A

quinticの $J_X(0,Q,w)$ について、$Q^0$ 項と $Q^1$ 項の由来するモジュライ空間を述べよ。$Q^0$ に一標点の定数写像積分を書いてはならない理由を説明せよ。

<!-- solution-start -->
**詳細解答**。$Q^0$ の項は規約として補う $w\mathbf1$ だけである。$\mathbf t=0$ なら追加標点 $n\ge1$ の積分は消え、$n=0,\beta=0$ は定数一標点の不安定な写像なので積分として定義できない。$Q^1$ では正次数の $\overline{\mathcal M}_{0,1}(X,1)$ が安定で、$1/(w-\psi_1)$ の順像を用いる。従って安定な空間と補助された項を混同しない。
<!-- solution-end -->

<a id="ex-mir2-12-a05"></a>
#### MIR2-12-A05 係数の変数変換
- Level: A

$F(Q)=w+A Q+B Q^2+O(Q^3)$、$q(z)=z+770z^2+O(z^3)$ とする。$F(q(z))$ を二次まで求め、$Q=z$ との違いを示せ。

<!-- solution-start -->
**詳細解答**。$q=z+770z^2+O(z^3)$、$q^2=z^2+O(z^3)$ より

$$
F(q(z))=w+A(z+770z^2)+Bz^2+O(z^3)
=w+Az+(770A+B)z^2+O(z^3).
$$

$Q=z$ とした場合は二次が $B$ だけなので、$770A$ を取り落とす。
<!-- solution-end -->

### Level B：式の成立条件を再構成する

<a id="ex-mir2-12-b01"></a>
#### MIR2-12-B01 Iの次数1の成分を検算
- Level: B

$B_1(h)=120+770h+575h^2-1150h^3$、$I_0=1+120z+O(z^2)$、$g=770z+O(z^2)$ とする。$\mathcal F_X=we^{-hg}(\sum_d z^dB_d(h))/I_0$ の $z$ 一次を求めよ。

<!-- solution-start -->
**詳細解答**。$\sum_dz^dB_d=1+zB_1+O(z^2)$、$1/I_0=1-120z+O(z^2)$ より

$$
\frac{\sum z^dB_d}{I_0}
=1+z(B_1-120)+O(z^2)
=1+z(770h+575h^2-1150h^3)+O(z^2).
$$

$e^{-hg}=1-770zh+O(z^2)$（$g^2$ は二次以上）を掛けると一次の $770zh$ は相殺され、

$$
\mathcal F_X
=w+z(575wh^2-1150wh^3)+O(z^2)
=w+z(575H^2/w-1150H^3/w^2)+O(z^2).
$$

単位類の120と $H$ の770がそれぞれ別の正規化で消える。
<!-- solution-end -->

<a id="ex-mir2-12-b02"></a>
#### MIR2-12-B02 H二次・三次の公式
- Level: B

$U=1+gh+ch^2+eh^3$、$h^4=0$ とする。$e^{-hg}U$ の $h^2,h^3$ 係数を積の展開から導け。

<!-- solution-start -->
**詳細解答**。$h^2$ は $c$（$1\cdot ch^2$）、$-g^2$（$-gh\cdot gh$）、$g^2/2$（$g^2h^2/2\cdot1$）の和だから $c-g^2/2$。$h^3$ は

$$
e+(-g)c+(g^2/2)g-g^3/6
=e-gc+g^3(1/2-1/6)=e-gc+g^3/3.
$$

$U$ の係数を $c=A/I_0$、$e=B/I_0$ と置けば[正規化成分の命題](#prop-mir2-12-normalized-components)に一致する。$h^4=0$ なので他の項は存在しない。
<!-- solution-end -->

<a id="ex-mir2-12-b03"></a>
#### MIR2-12-B03 JのH二次係数
- Level: B

quinticで $d>0$ とする。$[Q^d w^{-1}]J_X(0,Q,w)=c_dH^2$ と書ける理由を仮想次元から説明し、[一次因子公理](../MIR2-03/index.md#thm-mir2-03-divisor)と $\int_XH^3=5$ から $c_d$ を $N_d$ で表せ。

<!-- solution-start -->
**詳細解答**。一標点空間の仮想複素次元は1、$X$ の複素次元は3。$\psi^0$ の順像は複素余次元 $3-1=2$ の類で、ambient部分では $H^2$ の倍数と書ける。$\int_XH(c_dH^2)=5c_d$。順像の定義によってこれは $\langle H\rangle_{0,d}^X$ に等しい。$d>0$ だから[quinticの一次因子公理](../MIR2-03/index.md#thm-mir2-03-divisor)が使え、$\langle H\rangle_{0,d}^X=dN_d$。よって

$$
c_d=\frac{dN_d}{5}.
$$

$d=0$ にこの式を拡張すると不安定な一標点空間を使うことになるため許されない。
<!-- solution-end -->

<a id="ex-mir2-12-b04"></a>
#### MIR2-12-B04 外部定理の適用条件を吟味
- Level: B

次の三つについて本講のquinticミラー定理を、そのまま適用できるか判定せよ。(i) 滑らかな五次超曲面の種数0ambient部分、(ii) 特異な五次超曲面の種数0理論、(iii) 滑らかな五次超曲面の種数1不変量。各理由を挙げよ。

<!-- solution-start -->
**詳細解答**。(i) 適用できる。滑らかな五次超曲面、種数0の自然な仮想基本類、ambient部分という明示した仮定を満たす。(ii) そのままは適用できない。滑らかさが失われ、標的の完全障害理論や仮想基本類・変形不変性の扱いが変わり得る。特異標的の理論を別途構成・比較しなければならない。(iii) そのままは適用できない。定理のGW母関数は種数0の $J$ であり、種数1の不変量を表さない。実際、[既出の仮想基本類の一般種数の次数](../MIR2-02/index.md#def-mir2-02-virtual-gw)を使えば、Calabi–Yau三次元では種数 $g$、標点数 $k$、曲線類 $\beta$ に対する仮想複素次元は

$
(1-g)(3-3)+\int_\beta c_1(TX)+k=k
$

となり、**種数1でも仮想次元は同じ $k$** である。適用できない理由は次元の違いではなく、種数1では異なる安定写像のモジュライ空間と境界・障害理論を扱うため、種数0の $I/J$ 恒等式がそれらの不変量を決定しないことにある。
<!-- solution-end -->

### Level C：外部入力と自力計算の接続

<a id="ex-mir2-12-c01"></a>
#### MIR2-12-C01 quinticの最初のGW数と規格化の意味
- Level: C

滑らかなquintic $X$ に対し、以下の条件とデータから、一続きの論証を組み立てよ。

1. $B_1(h)=120+770h+575h^2-1150h^3$、$I_0=1+120z+O(z^2)$、$g=770z+O(z^2)$ から $\mathcal F_X$ の一次を導く。
2. **外部入力として**第5節の種数0quinticミラー定理を適用し、$q=z+O(z^2)$ と $[Q^d w^{-1}H^2]J_X(0,Q,w)=dN_d/5$ を使って $N_1$ を求める。
3. その計算だけでは「一般のquinticには幾何学的な直線がちょうど $N_1$ 本ある」と証明したことにならない理由を述べる。$I=J_X(0,z,w)$ と直接置くと何が破綻するかも指摘せよ。

<!-- solution-start -->
**詳細解答**。

(1) $1/I_0=1-120z+O(z^2)$ を積へ掛けると、$z$ 一次は

$$
B_1-120=770h+575h^2-1150h^3.
$$

さらに $e^{-hg}=1-770zh+O(z^2)$ を掛けるから $h$ 係数が相殺され、$wh^2=H^2/w$、$wh^3=H^3/w^2$ より

$$
\mathcal F_X=w+z(575H^2/w-1150H^3/w^2)+O(z^2).
$$

(2) [quinticミラー定理](#thm-mir2-12-quintic-mirror)は $\mathcal F_X(z,w)=J_X(0,q(z),w)$ を与える。$q=z+O(z^2)$ だから、Jの $Q$ 一次と $\mathcal F_X$ の $z$ 一次を比較できる。[一標点の順像係数](../MIR2-09/index.md#prop-mir2-09-quintic-first-coefficient)から $H^2/w$ 成分は $N_1/5$ であり、先の $575$ と比較して

$$
\frac{N_1}{5}=575,\qquad N_1=2875.
$$

(3) GW不変量は仮想基本類の積分であって、数え上げの各点が横断的な独立の直線に対応することはまだ示していない。幾何学的な本数との一致には、直線をパラメータ化する空間上の零点の横断性・重複度の検証が必要であり、後の MIR2-15 で扱う Grassmann 多様体上の直線計数と区別する。また $I$ の単位類成分は $w(1+120z+\cdots)$、$J_X(0,Q,w)$ は $w$ なので、$I=J_X(0,z,w)$ はすでに $z$ 一次の単位類成分で矛盾する。従って二つの正規化・座標変換は省略できない。
<!-- solution-end -->

## 8. 到達点と次講への橋

本講で**定理として借りた**のは、quinticの種数0ambient GW理論と超幾何I関数の全次数比較である。一方、$I_0$ の除算、$T$ と $q$ の座標変換、正規化後の成分の消滅、一次係数 $575$、および外部定理を入力にした $N_1=2875$ は、式の各手順と仮定を確認して導いた。

次講MIR2-13では、この比較を三次結合の級数へ持ち込む。そこでは $z$ に関する微分と $T=\log q$ に関する微分を連鎖律で結び直す必要がある。「$q$ に直せばよい」で止めず、Jacobian因子と正規化を実際に検算する。
