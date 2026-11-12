# HOLO20 RTとエントロピー不等式

[HOLO19の相同条件と面積競合](../HOLO19/index.md#def-holo19-homology)によって、与えられた境界領域に対して複数の曲線が許されても、**相同である候補の長さを比較して最小を選ぶ**方法が分かりました。それでは、異なる境界領域 $A,B$ の最小曲線同士にはどのような関係があるでしょうか。

境界量子系のエントロピーには、領域を重ねたときの[強劣加法性](../../../応用系/QINF/QINF19/index.md#thm-qinf19-ssa)が知られています。これは量子系一般の定理であり、本章の前提としてその証明を使うわけではありません。RT処方がその性質と両立するのは、境界のエントロピー公式を一つずつ代入した偶然でしょうか。本章では、同じ静的バルク時間断面に置いた二つのRT面を切り、**交点で別の組に貼り直す**ことで、面積の不等式を直接導きます。式の正しさだけでなく、貼り直した面が正しい境界領域と相同になることも確認します。

本章の主張は**静的・時間反転対称な半古典バルクで古典RT処方が成立する場合の主項**です。$G_N>0$、$\hbar=1$、自然対数を用い、同一の境界cutoff・同一のバルク計量で面積を比較します。境界の密度行列と正則化については[HOLO17の境界エントロピーデータ](../HOLO17/index.md#def-holo17-boundary-data)を前提にします。任意の量子状態の強劣加法性を重力から初めて証明するのではなく、**RT幾何がそれをどう実現するか**を証明します。

## 1. 最小面を貼り直してよい理由

静的な空間断面を $\Sigma$、その正則化された共形境界を $M$ とします。境界部分領域 $X\subset M$ に対して、[HOLO19の相同条件](../HOLO19/index.md#def-holo19-homology)を満たすバルク領域 $R_X\subset\Sigma$ を取り、境界cutoffを除く側の境界を $\gamma_X$ と書きます。すなわち $\partial R_X=X+\gamma_X$（境界鎖の係数は $\mathbb Z_2$）です。曲線が数本あっても、全長を足して考えます。高次元では曲線を余次元1の断面内境界面へ、長さを面積へ置き換えます。

本章で使う「貼り合わせ」は測地線同士を滑らかにつなげる操作ではありません。最小面を切断して作った**折れた、または複数成分の比較用の面**は、一般にはそれ自体が極小面ではありません。しかし最小値を上から評価する競争相手として使えます。まず、二つのバルク領域 $R_A,R_B$ を、その共通部分と和集合へ組み直します。

<a id="def-holo20-cut-paste"></a>

<!-- formal-statement-start -->
> **定義（RT領域の切断・貼合せ候補）**  
> 同じ静的時間断面 $\Sigma$ と同じ境界cutoffの下で、境界領域 $A,B$ に相同な二つの区分的滑らかなRT候補と、それらが囲むバルク領域を選ぶ。これらを $\gamma_A,\gamma_B$ および $R_A,R_B$ と書く。領域の共通部分と和集合を
>
$$
R_{\cap}=R_A\cap R_B,\qquad R_{\cup}=R_A\cup R_B
$$
>
> とし、それらの境界から境界cutoff上の部分を除いたバルク側の面を、それぞれ $\widetilde\gamma_{\cap},\widetilde\gamma_{\cup}$ とする。これらを境界領域 $A\cap B$ と $A\cup B$ の**切断・貼合せ候補**と呼ぶ。面の交点と角を許し、有限個の交点は長さ0として数える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo20-cut-paste -->
**定義を直接確認する。** 境界に沿って三つの隣接区間 $U=[x_0,x_1]$、$V=[x_1,x_2]$、$W=[x_2,x_3]$（$x_0<x_1<x_2<x_3$）を選び、$A=U\cup V$、$B=V\cup W$ とします。境界上の各小区間を「領域に含まれるか」で数えると

| 境界小区間 | $R_A$ の境界トレース | $R_B$ の境界トレース | $R_{\cap}$ | $R_{\cup}$ |
| --- | ---: | ---: | ---: | ---: |
| $U$ | 1 | 0 | 0 | 1 |
| $V$ | 1 | 1 | 1 | 1 |
| $W$ | 0 | 1 | 0 | 1 |
| 外側 | 0 | 0 | 0 | 0 |

となります。「1」は領域がその境界片に接していることです。したがって $R_{\cap}$ の境界側は $V=A\cap B$、$R_{\cup}$ の境界側は $U\cup V\cup W=A\cup B$ です。**バルク側の境界も必ず併せて取る**ので、端点だけ合わせた曲線と違い相同条件が満たされます。具体的な面の内部で曲線が交わるときは、交点で切断した辺を二つの新しい領域の境界に分配します。

この割当てを平面の「二色の弧」の直感に閉じ込めないことが重要です。$R_A,R_B$ を部分集合として扱えば、共通部分・和集合の境界は**実際に存在する領域の境界**なので、穴や非連結成分があっても相同条件を確認できます。ただし、地平線など別の境界がある場合は、元の相同条件と同じ規約でその部分をRT面に含める必要があります。
<!-- definition-example-end -->

## 2. なぜ貼り合わせた二面の総面積は増えないか

二つの領域の所属を組 $(a,b)$、$a,b\in\{0,1\}$ で表示すると、バルクの各小片は $00,10,01,11$ の四種類です。新しい領域への所属は、共通部分が $a\land b$、和集合が $a\lor b$ で決まります。

二つの状態の間にある短い内部境界片の面積を $d\sigma>0$ とします。もとの二領域の境界面では $a$ が切り替われば1回、$b$ が切り替われば1回数えます。新しい二領域でも同じように $\land,\lor$ の切替回数を数えます。

| 接する状態 | 旧境界で数える回数 | 新境界で数える回数 |
| --- | ---: | ---: |
| $00$ と $10$、または $00$ と $01$ | 1 | 1 |
| $10$ と $11$、または $01$ と $11$ | 1 | 1 |
| $00$ と $11$ | 2 | 2 |
| $10$ と $01$ | 2 | 0 |

最後の行では、所属が「$A$ のみ」から「$B$ のみ」に変わっても、共通部分は両側とも0、和集合は両側とも1です。旧面二枚の共有片は新面のどちらにも残りません。どの行でも新しい数え方が旧を超えないので、面積要素を全境界片で足せば次の補題になります。互いに横断的に交わる面の交線は面積0であり、有限個の角を丸める必要があっても、長さ・面積を任意に近づけることができます。

<a id="lem-holo20-perimeter"></a>

<!-- formal-statement-start -->
> **補題（切断・貼合せの面積劣加法性）**  
> 一つのRiemann計量を入れた静的な正則化断面で、有限個の区分的滑らかな境界を持つ二領域 $R_A,R_B$ を考える。境界cutoff上では両領域のトレースを固定し、同じ規約で内部の境界面積を数える。このとき、上の定義で作る四つの境界面の面積について
>
$$
\operatorname{Area}(\widetilde\gamma_{\cap})
+\operatorname{Area}(\widetilde\gamma_{\cup})
\leq
\operatorname{Area}(\gamma_A)
+\operatorname{Area}(\gamma_B)
$$
>
> が成立する。二次元断面では $\operatorname{Area}$ を曲線の長さと読む。面が横断的に交わり共有する正の面積の部分がない通常の場合は等号になり、共有面が打ち消し合う場合は不等号が厳しくなることがある。
<!-- formal-statement-end -->

### 証明の見取り図

四状態の隣接片ごとに旧境界と新境界の重複回数を比較します。特に $10$ と $01$ の間の共有面が取り除かれる以外、境界片は二つの新しい候補に同じ総回数だけ再配置されます。

<!-- proof-start -->
### 証明

同じ計量で測る一つの滑らかな小片を固定し、その両側の所属を $(a_-,b_-)$ と $(a_+,b_+)$ と書きます。旧境界の個数は
$$
n_{\mathrm{old}}
=|a_+-a_-|+|b_+-b_-|.
$$
新境界の個数は
$$
n_{\mathrm{new}}
=|(a_+\land b_+)-(a_-\land b_-)|
+|(a_+\lor b_+)-(a_-\lor b_-)|.
$$
同じ状態間なら両者とも0です。異なる四状態から選ぶ6通りは上の表ですべて列挙しました。したがって $n_{\mathrm{new}}\le n_{\mathrm{old}}$ が点ごとに成り立ちます。測度が正の面片ごとに $n_{\mathrm{new}}d\sigma\le n_{\mathrm{old}}d\sigma$ を積分すれば結果を得ます。横断交点・交線は面積測度0なので寄与せず、区分的滑らかな境界は各面片へ有限分割して足せます。境界cutoffの固定片は双方の式から同じ規約で除きました。必要なら角を丸める近似候補の面積をこの上界へ収束させます。
<!-- proof-end -->

この補題の結論は「二つのRT面を貼り直した**各面**が元の面より短い」ではありません。証明できるのは**二面の面積の和**です。この区別が強劣加法性の不等号の向きを決めます。

## 3. RTの最小性から強劣加法性へ

古典RT処方では、同じ静的断面にある境界領域 $X$ のエントロピーの主項を
$$
S_{\mathrm{RT}}^{(0)}(X)
=\frac{\operatorname{Area}(\gamma_X^{\min})}{4G_N}
$$
で評価します。$\gamma_X^{\min}$ は $X$ と相同な許容面の中で面積最小のものです。次の定理はこの**処方を仮定**した幾何学的な結果です。高次元では $\gamma$ が時間断面内の余次元1面、Lorentz時空内の余次元2面であることに注意してください。

<a id="thm-holo20-ssa"></a>

<!-- formal-statement-start -->
> **定理（静的古典RTの強劣加法性）**  
> 共通の時間反転対称な静的バルク断面 $\Sigma$ と、そこでの同一のUV cutoffを固定する。境界の任意の二つの同時刻空間領域 $A,B$ に対し、$A,B,A\cap B,A\cup B$ に相同な面の最小面積が存在する（または同じ極限で下限がとれる）とし、同じ正の $G_N$ による古典RT処方が適用できると仮定する。領域の境界は区分的滑らかとする。このとき、古典主項は
>
$$
S_{\mathrm{RT}}^{(0)}(A)+S_{\mathrm{RT}}^{(0)}(B)
\ge
S_{\mathrm{RT}}^{(0)}(A\cap B)
+S_{\mathrm{RT}}^{(0)}(A\cup B)
$$
>
> を満たす。全ての項は同一背景・同一cutoffで評価する。
<!-- formal-statement-end -->

### 証明の見取り図

$A$ と $B$ の**最小**面を選ぶところから始めます。[相同条件](../HOLO19/index.md#def-holo19-homology)によってそれぞれが囲む領域があり、その共通部分と和集合は別の二つの境界領域の許容候補になります。新候補は最小とは限らないため、「最小面積 $\le$ 候補面積」を二回適用します。その和を[切断・貼合せの面積劣加法性](#lem-holo20-perimeter)で上から押さえます。

<!-- proof-start -->
### 証明

$\gamma_A^{\min},\gamma_B^{\min}$ を選び、相同条件を満たす $R_A,R_B$ をそれぞれ固定します。境界cutoff上の所属は $A,B$ なので、[RT領域の切断・貼合せ候補](#def-holo20-cut-paste)より
$$
\partial R_{\cap}=(A\cap B)+\widetilde\gamma_{\cap},
\qquad
\partial R_{\cup}=(A\cup B)+\widetilde\gamma_{\cup}
$$
です。したがって両方の貼り合わせ面は各境界領域と相同な許容比較面です。

それぞれの**最小性**（極小性・停留性だけでは不十分）を使うと
$$
\begin{aligned}
4G_N S_{\mathrm{RT}}^{(0)}(A\cap B)
&\le \operatorname{Area}(\widetilde\gamma_{\cap}),\\
4G_N S_{\mathrm{RT}}^{(0)}(A\cup B)
&\le \operatorname{Area}(\widetilde\gamma_{\cup}).
\end{aligned}
$$
二行を足し、[補題](#lem-holo20-perimeter)を適用し、最後に元の二面が最小面であることを代入します。
$$
\begin{aligned}
4G_N\bigl[
S_{\mathrm{RT}}^{(0)}(A\cap B)+S_{\mathrm{RT}}^{(0)}(A\cup B)
\bigr]
&\le \operatorname{Area}(\widetilde\gamma_{\cap})
+\operatorname{Area}(\widetilde\gamma_{\cup})\\
&\le \operatorname{Area}(\gamma_A^{\min})
+\operatorname{Area}(\gamma_B^{\min})\\
&=4G_N\bigl[
S_{\mathrm{RT}}^{(0)}(A)+S_{\mathrm{RT}}^{(0)}(B)
\bigr].
\end{aligned}
$$
$4G_N>0$ で割れば結論です。正則化面を使う場合は同じcutoffで各不等式を成立させ、同一の極限規約で比較します。
<!-- proof-end -->

**三つの隣接領域に翻訳する。** $U,V,W$ が境界上で互いに内部を共有しない三つの領域なら、$A=U\cup V$、$B=V\cup W$ と置くことで
$$
A\cap B=V,\qquad A\cup B=U\cup V\cup W
$$
です。[定理](#thm-holo20-ssa)は通常の形
$$
S^{(0)}_{\mathrm{RT}}(UV)+S^{(0)}_{\mathrm{RT}}(VW)
\ge S^{(0)}_{\mathrm{RT}}(V)+S^{(0)}_{\mathrm{RT}}(UVW)
$$
になります。$UV$ は $U\cup V$ の略記です。重なった二つの領域についての定理なので、**互いに離れた二領域への劣加法性とは別**です。

## 4. 手計算：純AdSの隣接する三つの区間

[HOLO18の単一区間RT係数](../HOLO18/index.md#thm-holo18-interval-coefficient)を、静的純粋 $AdS_3$ の平面境界で使います。$a,b,d>0$ とし、
$$
U=[0,a],\quad V=[a,a+b],\quad W=[a+b,a+b+d]
$$
を取ります。真空の一つの区間長 $\ell$ に対する古典主項は、共通cutoff $\epsilon$ とBrown–Henneaux中央電荷 $c_{\mathrm{BH}}=3L/(2G_3)>0$ により
$$
S_{\mathrm{RT}}^{(0)}(\ell)
=\frac{c_{\mathrm{BH}}}{3}\log\frac{\ell}{\epsilon}
$$
です（長さに依存しない非普遍項を同じ規約で消した主項）。四つの区間長は $a+b,b+d,b,a+b+d$ なので、強劣加法性の左辺から右辺を引くと
$$
\begin{aligned}
\Delta_{\mathrm{SSA}}^{(0)}
&=S^{(0)}(UV)+S^{(0)}(VW)-S^{(0)}(V)-S^{(0)}(UVW)\\
&=\frac{c_{\mathrm{BH}}}{3}
\log\frac{(a+b)(b+d)}{b(a+b+d)}\\
&=\frac{c_{\mathrm{BH}}}{3}
\log\left(1+\frac{ad}{b(a+b+d)}\right).
\end{aligned}
$$
二行目では $\log(\ell/\epsilon)$ の係数が $1+1-1-1=0$ となり、cutoffが消えます。三行目は
$$
(a+b)(b+d)-b(a+b+d)
=ab+ad+b^2+bd-ab-b^2-bd=ad
$$
による変形です。$a,d>0$ なので対数の中は1より大きく、$\Delta_{\mathrm{SSA}}^{(0)}>0$ です。例えば $a=b=d=1$ なら
$$
\Delta_{\mathrm{SSA}}^{(0)}
=\frac{c_{\mathrm{BH}}}{3}\log\frac43>0.
$$

<a id="prop-holo20-interval-ssa"></a>

<!-- formal-statement-start -->
> **命題（純AdSの隣接三区間での強劣加法性の余裕）**  
> $a,b,d>0$ の隣接三区間 $U,V,W$ を純粋 $AdS_3$ の平面境界の同時刻に取り、同一cutoffの静的古典RT処方と $c_{\mathrm{BH}}=3L/(2G_3)>0$ を仮定する。強劣加法性の差は
>
$$
\Delta_{\mathrm{SSA}}^{(0)}
=\frac{c_{\mathrm{BH}}}{3}
\log\left(1+\frac{ad}{b(a+b+d)}\right)>0
$$
>
> であり、固定した $b,d$ に対して $a\downarrow0$ とすると0に近づく。
<!-- formal-statement-end -->

### 証明の見取り図

四つの区間の長さを[既習の単一区間公式](../HOLO18/index.md#thm-holo18-interval-coefficient)へ代入し、cutoffを打ち消したあと、積を展開して差が $ad$ になることを確認します。

<!-- proof-start -->
### 証明

直前の四本の長さの代入から対数比を得ます。分子と分母の差は $ad>0$ なので比は $1+ad/[b(a+b+d)]>1$、従って正です。$a\downarrow0$ では分子 $ad\to0$、分母 $b(a+b+d)\to b(b+d)>0$ なので分数は0へ収束し、$\log(1+x)\to0$ の連続性から差も0へ近づきます。
<!-- proof-end -->

**この例から言えること・言えないこと。** 上の差が正なのはこの真空の三区間模型の事実です。定理は一般には非負だけを保証し、面の位相競合によって等号になる場合もあります。等号を得ることだけを目的に、正則化の異なるエントロピーを混ぜてはいけません。

## 5. 劣加法性・相互情報量・純粋状態の帰結

互いに交わらない境界領域 $X,Y$ を考えます。個別の最小面 $\gamma_X^{\min},\gamma_Y^{\min}$ に対応する領域 $R_X,R_Y$ を重ねて、前節と同じように $R_X\cup R_Y$ の境界を取れば、$X\cup Y$ に相同な比較面を構成できます。[切断・貼合せの面積劣加法性](#lem-holo20-perimeter)より、その面積は二つの元の面積の和以下です。したがって次が成り立ちます。

<a id="prop-holo20-subadditivity"></a>

<!-- formal-statement-start -->
> **命題（静的RTの劣加法性）**  
> [強劣加法性の定理](#thm-holo20-ssa)と同じ静的古典RTの仮定で、同時刻境界領域 $X,Y$ が内部で交わらないなら
>
$$
S_{\mathrm{RT}}^{(0)}(X\cup Y)
\le S_{\mathrm{RT}}^{(0)}(X)+S_{\mathrm{RT}}^{(0)}(Y)
$$
>
> となる。従って古典RT主項で定義した相互情報量は
>
$$
I_{\mathrm{RT}}^{(0)}(X:Y)
=S_{\mathrm{RT}}^{(0)}(X)+S_{\mathrm{RT}}^{(0)}(Y)
-S_{\mathrm{RT}}^{(0)}(X\cup Y)\ge0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

和集合の領域は $X\cup Y$ の比較面を与えます。二つの面積の和が上界になる一方、$X\cup Y$ の**最小面**はその比較面より大きくなれません。

<!-- proof-start -->
### 証明

$R_X\cup R_Y$ の境界cutoff上のトレースは、$X,Y$ が交わらないので $X\cup Y$ です。ゆえに $\widetilde\gamma_{\cup}$ は相同な候補です。[切断・貼合せの面積劣加法性](#lem-holo20-perimeter)により
$$
\operatorname{Area}(\widetilde\gamma_{\cup})
+\operatorname{Area}(\widetilde\gamma_{\cap})
\le
\operatorname{Area}(\gamma_X^{\min})+
\operatorname{Area}(\gamma_Y^{\min}).
$$
$\operatorname{Area}(\widetilde\gamma_{\cap})\ge0$ を引くと
$$
4G_NS_{\mathrm{RT}}^{(0)}(X\cup Y)
\le\operatorname{Area}(\widetilde\gamma_{\cup})
\le 4G_N[S_{\mathrm{RT}}^{(0)}(X)+S_{\mathrm{RT}}^{(0)}(Y)].
$$
正の $4G_N$ で割れば第一式です。第二式は相互情報量の定義へ代入しただけです。
<!-- proof-end -->

[HOLO19の二区間競合](../HOLO19/index.md#prop-holo19-two-pairings)を使うと、同じ長さ $a$ の二区間と隙間 $b$ について
$$
I_{\mathrm{RT}}^{(0)}(X:Y)
=\frac{c_{\mathrm{BH}}}{3}
\max\left\{0,\log\frac{a^2}{b(2a+b)}\right\}
$$
です。$b/a\ge\sqrt2-1$ の非連結相では**古典主項**が0です。しかしこれは「全量子論での相互情報量が厳密に0」を意味しません。[HOLO19の候補計算](../HOLO19/index.md#prop-holo19-two-pairings)は同じcutoffを用いた古典最小面の比較だからです。

さらに、境界**全体が純粋状態**で $S^{(0)}(Z)=S^{(0)}(Z^c)$ が成立するなら、境界を互いに交わらない $X,Y,C$ に分け、$C=(X\cup Y)^c$ と置きます。劣加法性を $Y,C$ に使うと
$$
S^{(0)}(Y)+S^{(0)}(C)\ge S^{(0)}(Y\cup C).
$$
純粋性を $C$ と $Y\cup C$ にそれぞれ使えば
$$
S^{(0)}(Y)+S^{(0)}(X\cup Y)\ge S^{(0)}(X)
$$
です。$X,Y$ を入れ替えた式とも合わせ
$$
|S^{(0)}(X)-S^{(0)}(Y)|\le S^{(0)}(X\cup Y)
$$
を得ます。これはAraki–Lieb型の下界です。**混合熱状態では上の補集合等式を使ってはいけません**。[HOLO19のBTZ相同条件](../HOLO19/index.md#prop-holo19-btz-homology)に地平線が現れる理由も、ここで純粋状態を勝手に仮定できないことと整合します。

## 6. この証明が適用できない場合

- **時間依存・共変HRT：** 二つの面が同じRiemann時間断面上に載るとは限りません。異なる時刻の極値面を「交点で切って長さ比較」することはできず、Lorentz計量での極値面は共通断面上の最小面とも限りません。HRTのエントロピー不等式には、適切なエネルギー条件やmaximinなど別の議論が必要です（後続のHOLO22でその選択条件を扱います）。
- **量子補正：** $S_{\mathrm{RT}}^{(0)}=\operatorname{Area}/(4G_N)$ は古典主項です。$O(G_N^0)$ のバルク量子エントロピーを加える場合、面積の貼合せだけでは各項の符号を決められません。バルク状態のエントロピーと繰り込みを含む別の証明が必要です。HOLO23・24で扱います。
- **相同条件と複数境界：** 二つの面の端点をつなぐだけでは不十分です。地平線・別の境界成分を持つ場合も、$R_{\cap},R_{\cup}$ の**実在とその全境界**を調べ、余分な境界を落とさないことが必要です。
- **カットオフと存在：** $A,B$ のエントロピーを別々のcutoffや別の幾何で比較すること、最小面の存在を確かめず任意の停留面の値から同じ結論を出すことはできません。極限での下限を使うなら、共通規約で不等式を保つ必要があります。

特に、**RTの強劣加法性**と**任意の量子密度行列の強劣加法性**は同じ式でも証明の前提が異なります。本章で閉じたのは前者の静的古典幾何の証明です。

## 7. 演習と詳細解答

全問で必要なら $G_N>0$、同一cutoff、静的古典RT処方を仮定する。個別の設問に別の条件があればそれを優先する。

### Level A：境界と長さの確認

<a id="ex-holo20-a01"></a>
**A1. 新しい二領域のトレース。** 互いに内部を共有しない隣接区間 $U,V,W$ と、$A=U\cup V$、$B=V\cup W$ を取る。境界上の $U,V,W$ で $R_A,R_B,R_A\cap R_B,R_A\cup R_B$ の所属を $(1,0)$ で表し、貼合せ面がどの領域と相同になるか答えよ。
- Level: A
<!-- solution-start -->
**詳細解答。** $U$ では $(R_A,R_B)=(1,0)$ だから積は0、和は1。$V$ では $(1,1)$ だから積も和も1。$W$ では $(0,1)$ だから積は0、和は1。したがって共通部分のトレースは $V$、和集合のトレースは $U\cup V\cup W$。定義によりバルク側の全境界も各々取っているので $\partial R_{\cap}=V+\widetilde\gamma_{\cap}$、$\partial R_{\cup}=(U\cup V\cup W)+\widetilde\gamma_{\cup}$。単なる端点一致より強い相同条件を確認した。
<!-- solution-end -->

<a id="ex-holo20-a02"></a>
**A2. 共有面が消える場合。** 二領域の境界面のある面片の両側の所属が $(1,0)$ と $(0,1)$ である。旧境界と、共通部分・和集合の新境界ではその面片が何回現れるか。長さが $q>0$ の場合の寄与を求めよ。
- Level: A
<!-- solution-start -->
**詳細解答。** 旧境界では $a$ が1から0へ、$b$ が0から1へ変わるので $|1-0|+|0-1|=2$ 回、寄与は $2q$。両側とも $a\land b=0$、$a\lor b=1$ だから新境界での回数は0、寄与は0。ゆえに二面総和はこの片で $2q$ だけ減り、増えることはない。
<!-- solution-end -->

<a id="ex-holo20-a03"></a>
**A3. 強劣加法性の代入。** $S^{(0)}(UV)=7$、$S^{(0)}(VW)=8$、$S^{(0)}(V)=5$、$S^{(0)}(UVW)=9$ とする。この四値が強劣加法性に整合するか、差を計算して答えよ。単位は共通とする。
- Level: A
<!-- solution-start -->
**詳細解答。** 左辺から右辺を引くと $7+8-5-9=1\ge0$。よって整合する。差が正であるだけで、特定のRT相の形や一意性までは決まらない。
<!-- solution-end -->

<a id="ex-holo20-a04"></a>
**A4. 純AdSの具体値。** 純粋 $AdS_3$ の三区間の長さを $a=b=d=1$ として、強劣加法性の差を $c_{\mathrm{BH}}$ で表せ。$\epsilon$ が消える計算も示せ。
- Level: A
<!-- solution-start -->
**詳細解答。** 四区間の長さは $2,2,1,3$。共通cutoffで $S^{(0)}(\ell)=(c_{\mathrm{BH}}/3)\log(\ell/\epsilon)$ だから、差は $(c_{\mathrm{BH}}/3)[\log(2/\epsilon)+\log(2/\epsilon)-\log(1/\epsilon)-\log(3/\epsilon)]$。$-\log\epsilon$ の係数が $1+1-1-1=0$ なので $(c_{\mathrm{BH}}/3)\log(4/3)>0$。中央電荷は正である。
<!-- solution-end -->

<a id="ex-holo20-a05"></a>
**A5. 相同条件の失敗。** 非回転BTZの片側外部環状断面で、補区間 $X^c$ の測地線 $\gamma_{X^c}$ だけを $X$ のRT候補と主張した。この主張が不十分な理由と、必要な追加成分を答えよ。
- Level: A
<!-- solution-start -->
**詳細解答。** [HOLO19のBTZ相同命題](../HOLO19/index.md#prop-holo19-btz-homology)のように $\partial\Sigma=X+X^c+H$、$\partial R_{X^c}=X^c+\gamma_{X^c}$。足すと $\partial(\Sigma+R_{X^c})=X+H+\gamma_{X^c}$。したがって $X$ に相同な補区間候補は $\gamma_{X^c}\cup H$ であり、地平線円 $H$ を落とせない。端点だけ一致しても相同とは言えない。
<!-- solution-end -->

### Level B：証明の再構成・条件の監査

<a id="ex-holo20-b01"></a>
**B1. 六種類の境界片。** 二つの所属状態 $(a,b)$ が異なる全6組について、$n_{\mathrm{old}}$ と $n_{\mathrm{new}}$ を求め、面積劣加法性の補題を再構成せよ。
- Level: B
<!-- solution-start -->
**詳細解答。** $00\leftrightarrow10$ と $00\leftrightarrow01$ は旧・新とも $(1,1)$。$10\leftrightarrow11$ と $01\leftrightarrow11$ も $(1,1)$。$00\leftrightarrow11$ では両座標が変わり旧2、新も $\land$ と $\lor$ が両方変わるため2。$10\leftrightarrow01$ は旧2だが $\land$ は0のまま、$\lor$ は1のままだから新0。従って全6組で $n_{\mathrm{new}}\le n_{\mathrm{old}}$。各面片の面積要素が非負なので $\sum n_{\mathrm{new}}d\sigma\le\sum n_{\mathrm{old}}d\sigma$ を積分して $\operatorname{Area}(\widetilde\gamma_{\cap})+\operatorname{Area}(\widetilde\gamma_{\cup})\le\operatorname{Area}(\gamma_A)+\operatorname{Area}(\gamma_B)$ を得る。角と横断交線は面積0である。
<!-- solution-end -->

<a id="ex-holo20-b02"></a>
**B2. 一般の三区間長。** 純粋 $AdS_3$ の平面境界の隣接三区間の長さを $a,b,d>0$ とする。RT係数から強劣加法性の差を導き、$a\downarrow0$ での極限を求めよ。
- Level: B
<!-- solution-start -->
**詳細解答。** 区間 $UV,VW,V,UVW$ の長さはそれぞれ $a+b,b+d,b,a+b+d$。従って[区間RT公式](../HOLO18/index.md#thm-holo18-interval-coefficient)へ代入し、同じcutoffを消して
$$
\Delta=\frac{c_{\mathrm{BH}}}{3}\log\frac{(a+b)(b+d)}{b(a+b+d)}.
$$
分子から分母を引くと $(a+b)(b+d)-b(a+b+d)=ad$。ゆえに $\Delta=(c_{\mathrm{BH}}/3)\log[1+ad/(b(a+b+d))]>0$。$a\downarrow0$ で分子 $ad\to0$、分母は $b(b+d)>0$ へ向かうので $\Delta\to0$。
<!-- solution-end -->

<a id="ex-holo20-b03"></a>
**B3. 純粋状態なら下界が出る。** 全境界が純粋状態で、互いに素な $X,Y,C$ が全境界を分割する。RTの劣加法性と $S^{(0)}(Z)=S^{(0)}(Z^c)$ から $|S^{(0)}(X)-S^{(0)}(Y)|\le S^{(0)}(X\cup Y)$ を示し、なぜ熱状態に同じ論証を流用できないか説明せよ。
- Level: B
<!-- solution-start -->
**詳細解答。** 劣加法性を互いに素な $Y,C$ に適用して $S(Y)+S(C)\ge S(Y\cup C)$。全体純粋なら $C^c=X\cup Y$、$(Y\cup C)^c=X$ なので $S(C)=S(X\cup Y)$、$S(Y\cup C)=S(X)$。従って $S(X)-S(Y)\le S(X\cup Y)$。$X$ と $Y$ を交換すれば $S(Y)-S(X)\le S(X\cup Y)$。二つの最大は絶対値なので結論。熱混合状態では一般に $S(C)\ne S(X\cup Y)$ であり、置換に用いた補集合の等式が失われる。BTZでは地平線のエントロピーも無視できない。
<!-- solution-end -->

<a id="ex-holo20-b04"></a>
**B4. 何を証明していないか。** 時間依存Lorentz時空で異なる時刻にある二つのHRT極値面について、静的RTの貼り合わせ証明がそのまま成立するか。さらに古典主項に任意符号の補正 $\delta S(X)$ を加えたとき、面積不等式だけで補正込みのSSAを結論できるか。
- Level: B
<!-- solution-start -->
**詳細解答。** 成立すると結論できない。静的証明は二面が**同じ正定値のRiemann時間断面**に載ることを用いて、同じ面積要素を四状態に分類した。異なる時刻のHRT面には共通の領域 $R_A,R_B$ とその交差・和集合をそのまま作れず、極値性も同一断面上での大域的最小性を意味しない。補正込みの差を $\Delta_{\mathrm{tot}}=\Delta_{\mathrm{RT}}^{(0)}+\delta S(A)+\delta S(B)-\delta S(A\cap B)-\delta S(A\cup B)$ と書くと、第一項が非負でも第二項の符号は面積補題からは決まらない。バルク量子エントロピーに対する追加の議論が必要である。
<!-- solution-end -->

### Level C：複数の条件を結ぶ統合問題

<a id="ex-holo20-c01"></a>
**C1. 四状態から物理的結論まで。** 静的な $AdS_3$ 真空で $U=[0,1]$、$V=[1,3]$、$W=[3,6]$ とする。次を全て説明せよ。(i) $R_{UV},R_{VW}$ から $V,UVW$ に相同な比較面を作る。(ii) それらの長さの和の不等式とRTの最小性からSSAを導く。(iii) 単一区間RT公式で差を計算する。(iv) 同じ計算を時間依存HRTや量子補正の完全な証明と呼べない理由を示す。
- Level: C
<!-- solution-start -->
**詳細解答。** (i) 境界上で $UV$ のトレースは $U,V$ で1、$W$ で0、$VW$ のトレースは $U$ で0、$V,W$ で1。従って $R_{\cap}=R_{UV}\cap R_{VW}$ の境界側トレースは $V$、$R_{\cup}=R_{UV}\cup R_{VW}$ は $UVW$。それぞれのバルク側境界を $\widetilde\gamma_V,\widetilde\gamma_{UVW}$ と取れば、領域境界が実際に作られているため相同条件を満たす。

(ii) [面積補題](#lem-holo20-perimeter)により $\operatorname{Length}(\widetilde\gamma_V)+\operatorname{Length}(\widetilde\gamma_{UVW})\le\operatorname{Length}(\gamma_{UV}^{\min})+\operatorname{Length}(\gamma_{VW}^{\min})$。一方、最小性より $\operatorname{Length}(\gamma_V^{\min})\le\operatorname{Length}(\widetilde\gamma_V)$、$\operatorname{Length}(\gamma_{UVW}^{\min})\le\operatorname{Length}(\widetilde\gamma_{UVW})$。合わせ、$4G_3>0$ で割れば $S^{(0)}(V)+S^{(0)}(UVW)\le S^{(0)}(UV)+S^{(0)}(VW)$。

(iii) $a=1,b=2,d=3$、四区間長は $3,5,2,6$。[RT仮定の下でのAdS3区間普遍係数](../HOLO18/index.md#thm-holo18-interval-coefficient)を共通cutoffで用いると
$$
\Delta_{\mathrm{SSA}}^{(0)}
=\frac{c_{\mathrm{BH}}}{3}
\log\frac{3\cdot5}{2\cdot6}
=\frac{c_{\mathrm{BH}}}{3}\log\frac54>0.
$$
分子と分母の差は $15-12=3=ad$ とも確認できる。

(iv) (i)(ii) は**共通の静的Riemann断面と面積最小性**に依存する。時間依存HRT面はその条件を自動では満たさない。また $O(G_N^0)$ の量子補正の符号は(iii)の古典長だけからは分からない。よって本問が再現したのは、同一幾何・同一cutoffでの古典RT主項のSSAである。
<!-- solution-end -->

## 8. 学んだ道具の位置づけ

[HOLO19の面積競合](../HOLO19/index.md#prop-holo19-two-pairings)は「一つの境界領域について候補のどちらが勝つか」を比較しました。本章では「**異なる二つの領域について、最小面の和がどう制約されるか**」を、領域の共通部分・和集合と貼り合わせによって示しました。核心は、相同条件を壊さない領域操作と、**二面の合計面積**に対する不等式です。次のHOLO21ではこの面積項が重力レプリカ計算にどのように現れるかを別の前提で調べます。

参考：M. Headrick and T. Takayanagi, [*A holographic proof of the strong subadditivity of entanglement entropy*](https://arxiv.org/abs/0704.3719) (2007)。一般的な量子エントロピーの定理と、静的RTによる幾何学的実現を区別する。
