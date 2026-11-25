# AFR24 Alpöge–Claudeの形式的RH/Dirichlet GRH証明の依存地図・再現可能な検証

<!-- definition-example-audit: strict -->

[主不等式からRHへの条件付き還元](../AFR23/index.md#thm-afr23-reduction)では、素数冪の重み付き和を評価できれば零点の位置が決まることを示しました。今度は、なぜ保型形式・CM楕円曲線・整数格子・Galoisコホモロジーがその評価に関係するのかを調べます。

本講の中心は、割り切れることと小さいことを同時に利用する論法です。有限次元の模型で計算を閉じてから、研究文献に戻ります。2026年11月20日の[Alpögeの発表](https://alpo.ge/remark.pdf)、[Rubinsteinらのζの場合の解説第2版（11月22日）](https://www.math.uwaterloo.ca/~mrubinst/alpoge_claude_grh/zeta-paper_v2.pdf)（以下 R）、[Zhangの予備ノート（11月22日）](https://www.ihes.fr/~rzhang/files/GRH%20note.pdf)（以下 Z）を使います。ZはAI支援で作成され、著者自身がLeanとの完全な一致を保証していません。Rも主不等式(M)の人間可読な証明を完成させていません。後のRH証明研究講読では、この間を埋める数学を学びます。

## 1. 整除性を対数の不等式にする

ある整数が多くの素数で割れることは、その絶対値が小さすぎないことを意味します。例えば $12=2^2\cdot3$ は $2\cdot3$ で割れるので $\log2+\log3\le\log12$。ここから出発します。

素数 $p$ に対し、非零整数 $D$ が $p^h$ で割れる最大の非負整数 $h$ を $v_p(D)$ と書きます。絶対値の自然対数を取ります。

<a id="prop-afr24-divisibility"></a>

<!-- formal-statement-start -->
> **命題（整除性からの素数重み評価）**
>
> 非零整数 $D$、有限な素数集合 $P$、非負整数 $h_p$ に対し、各 $p\in P$ について $p^{h_p}\mid D$ なら

$$
\sum_{p\in P}h_p\log p\le \log|D|.
$$
<!-- formal-statement-end -->

異なる素数の冪は互いに素なので、全てを掛け合わせてよいことが核心です。

<!-- proof-start -->
### 証明

素因数分解において $p^{h_p}\mid D$ は $v_p(D)\ge h_p$ と同値です。従って

$$
|D|=\left(\prod_{p\in P}p^{h_p}\right) d
$$

と書け、$d$ は正整数です。対数を取って

$$
\log|D|=\sum_{p\in P}h_p\log p+\log d
$$

となり、$\log d\ge0$ から結論を得ます。
<!-- proof-end -->

例えば $D=60$、$P=\{2,5\}$、$h_2=2,h_5=1$ なら左辺は $\log20$、右辺は $\log60$、差は $\log3$ です。$D=0$ では任意の素数冪で割れてしまい、有限な対数上界を作れません。

[文字付き平滑化素数冪和](../AFR23/index.md#def-afr23-smoothed-sum)では重みは一般に整数ではありません。模型として $a,w$ を正整数とし、

$$
h_p=\sum_{j\ge1}\left(\left\lfloor a/p^j\right\rfloor-w\right)_+
$$

と置きます。ここで $z_+=\max(z,0)$、$\lfloor t\rfloor$ は $t$ 以下の最大の整数です。$j$ は正整数、$p$ は素数を動きます。$p^j>a/w$ なら項は0で、寄与する素数冪は有限個です。

$r=p^j$、$t=a/r$ と置きます。$w$ が整数なので、$t<w$ なら二つの正部分はともに0、$t\ge w$ なら $\lfloor t\rfloor\ge w$ です。後者では

$$
(t-w)_+-(\lfloor t\rfloor-w)_+
=t-\lfloor t\rfloor\in[0,1).
$$

各項の差は非負で1未満です。$\log p>0$ を掛けて有限和を取ると

$$
0\le\sum_{p,j}(a/p^j-w)_+\log p-\sum_p h_p\log p
\le\sum_{p^j\le a/w}\log p.
$$

例えば $a=12,w=2,p=2$ では $h_2=4+1=5$、実数重みも $4+1=5$。$p=5$ では整数重み0に対し実数重み $2/5$ です。この丸め誤差も評価しなければなりません。

これは研究証明で使う重みの簡略模型です。実際にはセルごとに異なる重み、分岐する素点、整数格子の指数などが入り、R Part II §6、Part III §§5–6 と Z §3–4 が整除性から評価へ移る箇所です。

## 2. CM・theta持ち上げから周期の整数格子へ

### 2.1 局所の情報をどう組み合わせるか

[五次円分体のArtin計算](../../ANF/ANF20/index.md#prop-anf20-cyclotomic-artin)では不分岐素数の作用を剰余類で表しました。Z §3, Proposition 3.1 はそのような有限アーベル群上の文字平均を利用し、素数冪を選択する。

位数4の巡回群で生成元を $g$、文字（群準同型）$\xi$ を $\xi(g)=i$ で定めます。$i^2=-1$ であり、$k$ は群の元 $g^k$ を指定する整数、$j$ は文字の冪を動く添字です。

$k$ が4の倍数なら各項は1、そうでなければ公比 $\xi(g^k)$ は1でない4乗根です。有限等比和より

$$
\frac14\sum_{j=0}^3 \xi(g^k)^j
=\begin{cases}1&k\equiv0\pmod4,\\0&k\not\equiv0\pmod4.\end{cases}
$$

例えば次の二つの場合に分子は零になります。

$$
\begin{aligned}
k=1&:\quad 1+i-1-i=0,\\
k=2&:\quad 1-1+1-1=0.
\end{aligned}
$$

これは [Dirichlet文字の直交関係](../../ANT/ANT3/index.md#thm-ant3-orthogonality) と同じ等比和の仕組みです。

CM楕円曲線では複素乗法を与える二次体の素数の分解によって局所構造が変わります。[分裂素数でのCM係数分解](../../IWA/IWA19/index.md#thm-iwa19-split)の模型 $\mathbb Q(i)$ では法5で $X^2+1=(X-2)(X+2)$、法3では $0,1,2$ のいずれも根でないため既約です。前者では二つの成分、後者では二次拡大の構造が現れます。研究証明の不分裂素数での評価は、CMの局所形式群（恒等元近傍で群演算を冪級数で記述するもの）とtheta核の係数を結び付けます。単に素数が不分裂というだけでは必要な整除性は導けません。R III.5 の高さ2の対数座標での整性、局所評価と長い軌道での双対性が追加の入力です。

保型側は[実Weil表現の構成](../AFR19/index.md#thm-afr19-real-weil)から、[双対対](../AFR20/index.md#def-afr20-dual-pair)を用いた[大域theta持ち上げ](../AFR20/index.md#def-afr20-global-theta-lift)へ進みます。さらに[seesaw identity](../AFR21/index.md#thm-afr21-seesaw-identity)は絶対可積分な二重積分を別順序に移し、[持ち上げの内積展開](../AFR22/index.md#thm-afr22-kernel-pairing)は反復した核の大きさを比較します。一般のRallis内積公式を用いるには局所データ・収束または正則化・測度の規格化が必要です。Z §4.2–4.4 の特定の保型表現への適用はその入力を別に調べる必要があります。

### 2.2 周期積分による線形写像を整数化する

[周期積分](../AFR21/index.md#def-afr21-period)の値は一般に複素数で、複素関数の第二変数には共役が付きます。以下では、適切な規格化と代数的な構造から数体に値を取る双線形形式が得られた後の整数化だけを模型化します。双線形とは一方の変数を固定すると、他方について線形写像になることです。例えば第一変数について、$a,b\in K$ に対して

$
P(ax+by,w)=aP(x,w)+bP(y,w)
$

が成り立ち、第二変数についても同じ条件を課します。

一般の複素周期積分が複素双線形だという主張ではありません。以下は $K=\mathbb Q$ の場合の完全な模型です。

格子とはここでは有理ベクトル空間の基底の整数係数結合全体です。有限階数の自由Abel群 $M,W$ は有限個の基底を持ち、各元を整数係数で一意に表せます。

$M\otimes\mathbb Q$ と $W\otimes\mathbb Q$ は同じ基底の係数を有理数に拡張した空間です。有限指数部分格子 $M'\subseteq M$ は商 $M/M'$ が有限な部分群です。

整数双対 $C=\operatorname{Hom}_{\mathbb Z}(W,\mathbb Z)$ は整数値を取る加法的写像の群で、和と整数倍は各元で評価して定めます。

$W$ の基底を $e_1,\ldots,e_s$ とすると、整数双対の基底 $e_j^*$ は $e_j^*(e_k)=\delta_{jk}$（$j=k$ なら1、それ以外は0）で定まります。任意の加法的写像 $\ell:W\to\mathbb Z$ は

$$
\ell\left(\sum_{j=1}^s g_j e_j\right)
=\sum_{j=1}^s g_j\ell(e_j)
$$

となるので、双対基底での座標は $(\ell(e_1),\ldots,\ell(e_s))$ です。加法的な有理数値写像について、これらの評価が全て整数であることと整数双対に属することは同値です。

<a id="prop-afr24-period-integral"></a>

<!-- formal-statement-start -->
> **命題（周期積分による線形写像の整数化）**
>
> 有限階数の自由Abel群 $M,W$、有限指数部分格子 $M'\subseteq M$、非零有理数 $d$ を取る。$P$ を $M\otimes\mathbb Q$ と $W\otimes\mathbb Q$ の間の有理双線形形式とし、$P(M',W)\subseteq d\mathbb Z$ と仮定する。
>
> このとき $N=d^{-1}M'$ から $C=\operatorname{Hom}_{\mathbb Z}(W,\mathbb Z)$ への写像

$$
b:N\to C,\qquad b(f)(g)=P(f,g)
$$

> が定義でき、整数線形である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の $f\in N$ は $d^{-1}m'$、$m'\in M'$ と書けます。双線形性から $P(f,g)=d^{-1}P(m',g)$、仮定から $P(m',g)=dz$（$z\in\mathbb Z$）なので $P(f,g)=z$。従って $g\mapsto P(f,g)$ は整数値の加法的写像です。第一変数の双線形性より $b(f_1+f_2)=b(f_1)+b(f_2)$ と $b(cf)=cb(f)$（$c\in\mathbb Z$）が各 $g$ で成立します。
<!-- proof-end -->

例えば $M=W=\mathbb Z^2$、$P(f,g)=f_1g_1+f_2g_2$、$M'=6\mathbb Z\times3\mathbb Z$、$d=3$ とします。標準基底を用い、$u,v,c,e$ を整数とします。二つの自由Abel群の階数は2で、$M/M'$ は18元（法6と法3の剰余類の組）です。$P$ は有理双線形で、

$$
P((6u,3v),(c,e))=3(2uc+ve)\in3\mathbb Z.
$$

したがって[整数化の命題](#prop-afr24-period-integral)を適用できます。$N=2\mathbb Z\times\mathbb Z$ で、

$$
b((2u,v))(g)=2uc+ve.
$$

標準基底 $e_1=(1,0),e_2=(0,1)$ で評価すると $2u,v$ なので、双対基底での像は $(2u,v)$ です。$M$ 全体を $d^{-1}$ 倍すると $(1/3,0)$ の $e_1$ での評価は $1/3$ となり、整数化に失敗します。

Z §1.4, §4.4 は数体 $K$ の整数環 $\mathcal O_K$ に対して

$$
P_\alpha(M'_\alpha,M_W)\subseteq\mathfrak a_\alpha
$$

を得て、次の格子間の写像を作ると説明しています。

$$
N_\alpha=\mathfrak a_\alpha^{-1}M'_\alpha,\qquad C=M_W^\vee.
$$

ここで $\mathfrak a_\alpha$ は分数イデアル、$M'_\alpha$ は局所条件を課した部分格子、添字 $\alpha$ は異なる重みの保型形式を区別します。上の命題はこの整数化の仕組みだけを取り出したものです。

## 3. ノルムの上界と像の次元が必要な理由

[格子の共体積](../../NDA/NDA3/index.md#def-nda3-lattice)とは基底が張る平行多面体の体積です。全階数とは空間の次元と格子の基底の個数が一致することを指し、直交座標でその基底を列に並べた行列の行列式の絶対値が共体積です。[共体積の基底不変性](../../NDA/NDA3/index.md#prop-nda3-covolume-independent)により基底の選び方には依存しません。数体の場合の計算は[整数環とイデアルの共体積](../../ANF/ANF5/index.md#thm-anf5-ideal-covolume)を参照してください。ここでは実Euclid空間で階数 $r$ の格子 $C$ を考え、その体積を $\operatorname{covol}(C)$ とします。

体積が小さいほど平均傾きを大きく測りたいので、本節では

$$
\mu(C)=-\frac{\log\operatorname{covol}(C)}{r}
$$

と定めます（数体や二乗ノルムでは規格化が変わります）。

<a id="prop-afr24-volume"></a>

<!-- formal-statement-start -->
> **命題（独立な整数像による共体積評価）**
>
> $r\ge1$ とし、$r$ 次元実Euclid空間内の全階数格子 $C$ に属する線形独立な $y_1,\ldots,y_r$ が $\|y_i\|\le B_i$（$B_i>0$）を満たすなら

$$
\operatorname{covol}(C)\le\prod_{i=1}^r B_i,
\qquad
\mu(C)\ge-\frac1r\sum_{i=1}^r\log B_i.
$$
<!-- formal-statement-end -->

像の長さだけでなく、全方向を覆うことが必要です。Gram–Schmidt直交化で平行多面体の体積を各直交成分の長さの積にします。

<!-- proof-start -->
### 証明

$C$ の基底を列に並べた行列を $A$、$y_i$ を列に並べた行列を $Y$ とします（直交座標を選ぶ）。格子の基底を $a_1,\ldots,a_r$ とすると、$y_i\in C$ であるため各列は

$$
y_i=\sum_{j=1}^r b_{ji}a_j,\qquad b_{ji}\in\mathbb Z.
$$

従って $Y=AB$ で、$B=(b_{ji})$ は $r\times r$ の整数行列です。$A$ は基底行列なので可逆であり、$y_i$ の線形独立性から $Y$ も可逆です。よって $\det B\ne0$、整数であるため $|\det B|\ge1$ です。

$$
|\det Y|=|\det A|\,|\det B|\ge\operatorname{covol}(C).
$$

次のように直交化します。

$$
z_1=y_1,\qquad
z_i=y_i-\sum_{j<i}\frac{\langle y_i,z_j\rangle}{\|z_j\|^2}z_j.
$$

独立性により全ての $z_j$ は非零です。各列から以前の列の線形結合を引いても行列式は変わりません。また $z_i$ は取り除いた成分と直交するので

$$
\|z_i\|^2\le\|y_i\|^2.
$$

$Z$ を $z_i$ を列に並べた行列とします。列操作から $\det Z=\det Y$、直交性から $Z^{\mathsf T}Z=\operatorname{diag}(\|z_1\|^2,\ldots,\|z_r\|^2)$ です。したがって

$$
(\det Z)^2=\det(Z^{\mathsf T}Z)=\prod_{i=1}^r\|z_i\|^2.
$$

各長さは正なので平方根を取って

$$
|\det Y|=\prod_i\|z_i\|\le\prod_i\|y_i\|\le\prod_i B_i.
$$

対数を取り、$-1/r$ を掛ければ不等号が逆転して傾き評価を得ます。
<!-- proof-end -->

$C=\mathbb Z^2$、$y_1=(2,0)$、$y_2=(1,2)$ なら行列式4、長さの積 $2\sqrt5$ です。従って $1\le4\le2\sqrt5$。逆に $C=\mathbb Z(1,0)+\mathbb Z(0,L)$（$L>0$）で $y_1=y_2=(1,0)$ を取ると、長さはいずれも1なのに共体積 $L$ は任意に大きくできます。

研究証明では異なる $\alpha$ の周期積分による線形写像の像を集めます。Z §4.3 は算術的Hilbert–Samuel公式等による共体積の制御、§4.5 と Proposition 4.3 は像の十分な次元と傾きの比較を説明します。算術的Hilbert–Samuel公式は整数係数の切断の大きさを算術交点数に結び付ける深い定理です。ここではその定理自体も、算術多様体でのHarder–Narasimhan濾過（傾きによる格子の分解）も証明しません。R III.7–8 が必要な共体積・跡・階数・部分空間条件を列挙しています。上の命題は像の方向を数える必要性を示すための有限次元模型です。

## 4. 固有射影とGaloisコホモロジー

整数格子に入る周期積分による線形写像を得ても、Hecke作用素の固有成分を選ぶ操作は分母を作り得ます。

$R=\mathbb Z_3$ とし、格子 $R^2$ の標準基底で作用素を $U=\begin{pmatrix}1&1\\0&4\end{pmatrix}$ と表します。

上三角行列なので固有値は1と4で、分数体 $\mathbb Q_3$ 上では異なる二固有値の固有空間が直和をなします。$I$ は2次単位行列です。[二固有値の整数格子射影](../../IWA/IWA20/index.md#prop-iwa20-projectors)を固有値1に適用すると

$$
P_1=\frac{U-4I}{1-4}=
\begin{pmatrix}1&-1/3\\0&0\end{pmatrix}.
$$

第二基底ベクトルの像は $(-1/3,0)$ で格子を外れます。$3P_1$ なら整数行列です。固有値が法3で一致することと、格子の分解に失敗することとの関係が見えます。対角行列 $\operatorname{diag}(1,4)$ では固有値の合同は同じでも射影は整数行列なので、合同だけで分母が確定するわけではありません。

Galois作用の合同の背後には表現の拡大が現れます。[上三角表現の分裂とコサイクル](../../IWA/IWA20/index.md#prop-iwa20-extension)は右上成分を第1コホモロジーの類として扱います。

有限群の模型で $G=\mathbb Z/6\mathbb Z$、$A=\mathbb F_3$ に自明な作用を入れます。

[連続1次群コホモロジー](../../IWA/IWA18/index.md#def-iwa18-h1)の定義では、コサイクルと余境界はそれぞれ次の式で与えられます。

$
c(g+h)=c(g)+g\cdot c(h),\qquad (\delta t)(g)=g\cdot t-t\quad(t\in A).
$

作用が自明なので前者は加法的準同型、後者は零です。

生成元 $1\bmod6$ の像を $a\in\mathbb F_3$ とすれば

$$
c(1)=a,\qquad c(j)=ja,\qquad 6a=0.
$$

最後の条件は任意の元で満たされるので全3個の類を得ます。

部分群 $H_2=\langle3\rangle$ と $H_3=\langle2\rangle$ の生成元で値を調べると

$$
c(3)=3a=0,\qquad c(2)=2a.
$$

後者が零になるのは $a=0$ の場合に限ります。従って両方へ制限して零となる類はただ一つ。局所条件を一つ増やすだけで核の位数が変わることが分かります。この部分群は実際の数体の局所Galois群を意味するものではありません。

実際の数体では[局所条件付きSelmer群](../../IWA/IWA18/index.md#def-iwa18-local-selmer)を指定し、[Poitou–Tate双対の核の対応](../../IWA/IWA18/index.md#thm-iwa18-poitou-tate)を使うには有限係数・双対係数・分岐素点・局所条件が必要です。[局所像を含めた有限層の位数公式](../../IWA/IWA20/index.md#prop-iwa20-local-count)では、双対で制御した核だけでなく局所像も評価します。円分塔に対する[Ferrero–Washingtonのμ=0定理](../../IWA/IWA7/index.md#thm-iwa7-ferrero-washington)は有限Abel数体の円分 $\mathbb Z_p$ 拡大の類群の成長を制御しますが、それだけで任意のSelmer群の位数を制御できるわけではありません。[指標射影と局所条件の両立](../../IWA/IWA9/index.md#prop-iwa9-character-inertia-compatibility)も該当する条件を確認して使います。

Z §5 の Lemma 5.1 と式(5.1)は射影の分母、Proposition 5.3 は特定の数体とTate twist（円分指標の冪で係数の作用を変えること）に対するコホモロジーの位数を結び付ける経路です。高階数のGalois表現の存在、局所大域整合性、合同とコホモロジーを比較する変形理論、局所p進Hodge理論は追加の深い入力です。有限群の計算からそれらを導いたわけではありません。

## 5. 研究証明を読むための依存地図

ここまでの模型を、R・Zの実際の論証に対応させます。Rはζに特化した解説、ZはDirichlet GRHへの予備的案内です。両者の表記や個別の定理を同一と仮定しないことが重要です。

| 段階 | 対象・必要な入力 | 何が次に渡るか | 読む場所・確認の段階 |
| --- | --- | --- | --- |
| 解析的還元 | 固定文字の中心化和、正係数、区間上界 | 零点を排除する十分条件 | [AFR23の区間判定](../AFR23/index.md#thm-afr23-interval)を証明済み。Z §2、R II.1–5 |
| 素数冪の整除性 | 有限アーベル群の文字平均、素点別の付値 | 重み付き素数冪和と格子指数 | Z Proposition 3.1、R III.5–6。局所整性は追加入力 |
| CM局所模型 | CM型、素数の分岐・分裂、形式群の座標 | theta核係数の付値下界 | R III.5・III.12。Rの局所模型と一般の整性を区別 |
| 反復theta・周期 | 双対対、局所テストベクトル、収束・測度 | 周期積分による線形写像とノルムの評価 | Z §4、R III.4。一般Rallis公式の適用には追加条件 |
| 格子 | 整数化、指数、共体積、十分な像の次元 | 主項と誤差の比較 | Z Proposition 4.3、式(4.11)、R III.6–8 |
| 固有射影 | Hecke固有値の合同、整数格子 | 射影の分母 | Z Lemma 5.1、R III.9 |
| コホモロジー | 円分塔、Tate twist、局所条件、Galois表現 | 分母の一様上界 | Z Proposition 5.3、R III.9 |
| パラメータ | 同じ補助素数を区間全域で使用、誤差の釣合い | (M)と(B),(C)、GRHの区間判定 | R III.11、Z §6。Rの13仮説は未完の自然言語化 |

R III.11 は一つのスケールで(M)を導くための12仮説と、それらを区間全体で供給する第13仮説に整理しています。R III.13 の195項目は既存文献の候補を調べる入口であり、個々の帰属や適用仮定が自動的に保証されるわけではありません。R III.12 のlemniscate模型は具体的な一例であり、一般の(M)の証明ではありません。

対応するLean宣言を追うには名前だけでなく命題の型・依存・量化順を見ます。Rの第2版およびRubinsteinの[検証ページ](https://mrubinst.github.io/grh-lean-verification/)に現れる名前を例に取ります。

| 出典の所在 | Leanで探す名前 | 読むべき内容 |
| --- | --- | --- |
| R III.5 | Quant、weightQuantization、ThmAOp | 局所座標・トーラス合同・付値条件を確認 |
| R III.6 | LocalQuadraticParts.adm2、LinkDIV_at、Count_at、SlopesM_at | 局所整性、格子の指数・階数、傾きの規格化を確認 |
| R III.4 §末尾（85頁付近） | LinkG、closed_linkG_of_duty、linkG_concrete5 | 上界と誤差をどのデータで得るか |
| R III.9 §6 | VWin、vwin_of_row、LinkN、final_alt_alt、linkN_of_twGood_galoisPreconditions | Galoisコホモロジー上界と分母比較を区別 |
| Rubinsteinの最上位依存関係 | UpperTheory.Gal.Int.galoisLocalGlobalStrong_recParameter、UpperTheory.FinalTheorems.everyCharacter | 各文字に対する非零性を得るための入力 |
| 同上 | Formalism.VW.rh_of_every、allChi、rhOfAll | 最終命題の仮定が証明項で供給されるか |

この表は出典中で報告された名前と役割を照合する入口です。全ての行の型・ソース内の完全な依存閉包まで読み終えたという意味ではありません。例えば R III.6 は Val がLeanの単一宣言ではないことを明記しています。数学的な一節とLeanの一宣言を機械的に一対一対応させないようにしましょう。

[主不等式からRHへの条件付き還元](../AFR23/index.md#thm-afr23-reduction)での誤差は

$$
x^{O(\varepsilon)}\left(x/m+xm/k+m+k/n^2\right)
$$

の形です。指数模型を

$$
m=x^{1/2},\qquad k=x^{9/2},\qquad n=x^2
$$

と置くと、各項は

$$
x/m=m=x^{1/2},\quad xm/k=x^{-3},\quad k/n^2=x^{1/2}
$$

となります。実際には整数化や2の冪への調整と一様性を確認します。ここに至る重い算術評価をRが条件として扱っていることと、Leanが最終命題を認証していることは両立します。

## 6. 形式証明を再現可能に読む

### 6.1 最終命題と検査の種類

2026年11月21日の[Lean FROとMathlib Initiativeの共同声明](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/)はRHの命題および証明を認証しています。[Rubinsteinの独立検証](https://mrubinst.github.io/grh-lean-verification/)と[Sutherlandの検証記録](https://math.mit.edu/~drew/grh/)（11月24日05:25 UTC更新）はDirichlet GRHを含めて次の5宣言を確認しています。

| 宣言 | 数学的内容 |
| --- | --- |
| riemannHypothesis | MathlibのRiemannHypothesis |
| riemannZeta_eq_zero_re | 自明零点と極 $s=1$ を除いたζの零点の実部は $1/2$ |
| LFunction_ne_zero_of_half_lt_re | 全ての正の法と文字で $\operatorname{Re}s>1/2$ なら非零。ただし自明文字の極を除く |
| LFunction_eq_zero_re | 全ての正の法と文字で臨界帯内の零点の実部は $1/2$ |
| LFunction_eq_zero_re_of_isPrimitive | 原始文字に限定した前行の結論 |

Mathlibでは極にも関数としての値を与えるので、極を除く条件があります。命題の仮定の中に「RHが真である」といった条件はありません。一般の保型L関数や非アーベル数体のDedekindゼータ関数への一般化はこの5宣言から直接は得られません。一方、アーベル数体のゼータ関数はDirichlet L関数の積で表せるので、その既知の分解式と零点・極の検討を別に使うことができます。

形式証明では命題を型、証明をその型の項として扱います。kernelは項が型を持つかを検査する小さな中核プログラムです。構文の走査は手早い予備検査ですが、証明が依存する公理や最終命題の意味を確定しません。

### 6.2 同じソースを取得し検証結果を照合する

まず発表文書の脚注から14分割アーカイブを取得します。Rubinsteinの検証ページに掲載の各部分のSHA-256一覧と比較し、順番通りに結合します。SHA-256はバイト列から256ビットの値を求めるハッシュ関数で、内容の取り違えの検出に使います（数学的正しさを検査するものではありません）。

次のコマンドはファイル名を part01 から part14 にそろえたディレクトリで実行する例です。原ファイル名とハッシュ一覧が異なる場合には対応を確認してください。アーカイブの取得や展開・実行は信頼できる隔離環境で行います。

~~~bash
cat part{01..14} > lean.tar.gz
sha256sum lean.tar.gz
# 期待する値:
# 9631b4f020199e580ba86178cb56c6e9b09f690c2369a80dc4334aa93f49c7fc
~~~

Rubinsteinの記録ではソースの結合後の大きさは239,275,554バイトです。Lean v4.33.1 (819816b2)、Mathlib 0df444a3 が固定されていることを展開後の lean-toolchain と lake-manifest.json で照合します。ビルド結果を再検査するスクリプトと出力は同ページのリンクから取得できます。大規模な再ビルドは必須ではなく、まず次の検査の違いを説明できるようにします。

| 検査 | 確認対象 | 公開結果 |
| --- | --- | --- |
| ソースハッシュ | 原著者のファイルと同じか | Rubinsteinが2台で照合 |
| コンパイル | 全モジュールが受理されるか | 175,187件、エラー0 |
| 公理一覧 | 最終5命題の推移的な公理依存 | propext、Classical.choice、Quot.soundのみ |
| kernel replay | 完成した各宣言を再検査 | 175,187件、拒否0 |
| 独立kernel | exportした証明項の検査 | Rubinsteinのnanodaは1,484,729宣言を受理 |
| 命題照合 | 独立に定めた問いと証明した型の一致 | Sutherlandのcon-leche、con-ronの比較で5命題を確認 |

Sutherlandの11月24日更新では、隔離した再ビルドで同一のexportを生成し、Lean標準kernel・paranoid kernel・nanoda・con-lecheの検査成功も報告されています。別実装では対象やexport方法が異なり宣言数が違う場合があるため、数値だけで結果を同一視しません。さらに当時進行中だった別のcomparator実行も、完了済みの検査と区別します。

最終命題が依存する全ての宣言を再帰的にたどる集合を依存閉包と呼びます。Rubinsteinの DepCheck.lean はRH単独の閉包を1,478,198宣言と報告しています。これはアーカイブ内のファイル数でも、5宣言全体をexportした件数でもありません。

### 6.3 小さなLean実験

Lean 4で空のファイル Mini.lean を作り、次を入力します。Mathlibを必要としない例です。P は命題の型 Prop に属する任意の命題です。implication の型は P → Q と書き、fun h => h は引数の証明をそのまま返す関数です。

~~~lean
theorem identityProof (P : Prop) : P → P := fun h => h
theorem closedProof : True := True.intro

def Target : Prop := True
theorem targetProof : Target := closedProof
example : Target = True := rfl

#print axioms identityProof
#print axioms targetProof

theorem incomplete : False := by
  sorry

#print axioms incomplete
~~~

Lean v4.33.1を選んだ環境で lean Mini.lean を実行します。identityProof は仮定から同じ仮定を返すだけです。closedProof では True の構成子が証明です。Target は定義を展開すると True なので型が一致し、rfl でその等式を証明できます。前二つの検査には公理依存がないことが期待されます。一方 incomplete は警告を出し、sorryAx が公理依存に現れます。ファイルが処理できたことだけを成功とみなしてはいけません。次に incomplete の sorry を消し、代わりに exact True.intro とすると、True の証明は False の証明にはならないため型検査は失敗するはずです。

RHのファイルでは最終命題に対する #print axioms の出力と、独立にMathlibだけをimportして定義したchallengeの型を照合するのが、この小実験の大規模版です。外部の検証記録では、三つの標準公理のみに依存しており、sorryAx はありません。Leanでの公理依存と、人間が新しい数論的な補題の証明を理解したかは別です。

[Clay Mathematics InstituteのRHページ](https://www.claymath.org/millennium/Riemann-Hypothesis/)の2026年11月25日時点の表示は Active です。賞の公式手続と形式証明の数学的認証を分けて読みます。

## 7. 演習と詳細解答

<a id="ex-afr24-a1"></a>

### A1. 整除性と余り

- Level: A
- ID: AFR24-A1

$D=360$ が $2^3,3^2$ で割れることを確認し、対数の上界との差を求めよ。

<!-- solution-start -->
**詳細解答。** $360=8\cdot9\cdot5$ より二つの素数冪で割れます。[整除性からの素数重み評価](#prop-afr24-divisibility)の左辺は $3\log2+2\log3=\log72$。差は $\log360-\log72=\log5$ です。
<!-- solution-end -->

<a id="ex-afr24-a2"></a>

### A2. 文字平均で選択する

- Level: A
- ID: AFR24-A2

位数3の巡回群で $\omega=\exp(2\pi i/3)$ とする。$(1+\omega^k+\omega^{2k})/3$ を $k=0,1,2$ について求めよ。

<!-- solution-start -->
**詳細解答。** $k=0$ なら1。$k=1,2$ なら $\omega^k\ne1$、$\omega^{3k}=1$ なので

$$
1+\omega^k+\omega^{2k}=\frac{1-\omega^{3k}}{1-\omega^k}=0.
$$

よって値は順に1,0,0です。
<!-- solution-end -->

<a id="ex-afr24-a3"></a>

### A3. 周期積分による線形写像の整数化

- Level: A
- ID: AFR24-A3

$P(f,g)=f_1g_1+2f_2g_2$、$M=W=\mathbb Z^2$、$M'=4\mathbb Z\times2\mathbb Z$ とする。$d=4$ に対して整数化した写像の像を求めよ。

<!-- solution-start -->
**詳細解答。** $f'=(4a,2b)$ とすれば

$$
P(f',g)=4(ag_1+bg_2)
$$

なので[周期積分による線形写像の整数化](#prop-afr24-period-integral)の仮定を満たします。$N=\mathbb Z\times(1/2)\mathbb Z$ であり

$$
P((a,b/2),g)=ag_1+bg_2.
$$

標準基底 $(1,0),(0,1)$ における値はそれぞれ $a,b$ です。従って双対基底で像は $(a,b)$ となり、任意の整数の組が得られるので像は $\mathbb Z^2$ 全体です。
<!-- solution-end -->

<a id="ex-afr24-a4"></a>

### A4. 射影の分母

- Level: A
- ID: AFR24-A4

$\mathbb Z_5^2$ 上の $U=\begin{pmatrix}2&3\\0&7\end{pmatrix}$ から固有値2の射影を計算せよ。

<!-- solution-start -->
**詳細解答。** 固有値2,7は異なるので体 $\mathbb Q_5$ 上で固有空間に直和分解できます。[二固有値の整数格子射影](../../IWA/IWA20/index.md#prop-iwa20-projectors)を使い

$$
P_2=(U-7I)/(2-7)=
\begin{pmatrix}1&-3/5\\0&0\end{pmatrix}.
$$

$3$ は5進単数なので第二列の非零成分の5進付値は $-1$。格子を保ちませんが $5P_2$ は整数格子を保ちます。
<!-- solution-end -->

<a id="ex-afr24-a5"></a>

### A5. 検査の意味を分ける

- Level: A
- ID: AFR24-A5

あるソースがコンパイルでき、最終命題が sorryAx に依存すると報告された。証明が完成したといえるか。またハッシュが一致した場合はどうか。

<!-- solution-start -->
**詳細解答。** コンパイルは未完成証明を警告付きで許す場合があります。sorryAx が依存に含まれるなら、その仮定を解消しない限り証明の完成を確認できません。ハッシュ一致は対象のバイト列を照合した結果なので、未完成の証明であっても成立します。検査対象が違います。
<!-- solution-end -->

<a id="ex-afr24-b1"></a>

### B1. 丸めと素数冪

- Level: B
- ID: AFR24-B1

$a=20,w=3$ とする。$p=2,3,5$ のみについて第1節の $h_p$ と実数重みの差を計算し、整除性から得られる評価を述べよ。

<!-- solution-start -->
**詳細解答。** 打切りは $p^j\le20/3$。素数2では冪2,4だけが寄与し、素数3と5ではそれぞれ一次の冪だけが寄与します。

$$
\begin{aligned}
h_2&=(10-3)+(5-3)=9,\\
h_3&=6-3=3,\\
h_5&=4-3=1.
\end{aligned}
$$

実数重みは2と5では同じです。3では $20/3-3=11/3$ なので差は $2/3$ です。

非零整数 $D$ がこれらの冪で割れるなら[整除性からの素数重み評価](#prop-afr24-divisibility)より

$$
9\log2+3\log3+\log5\le\log|D|.
$$

実数重みを使う左辺はさらに $(2/3)\log3$ を足したものなので $\log|D|+(2/3)\log3$ 以下です。
<!-- solution-end -->

<a id="ex-afr24-b2"></a>

### B2. 独立性を確認して体積を評価する

- Level: B
- ID: AFR24-B2

$C=\mathbb Z^2$、$y_1=(3,4)$、$y_2=(0,2)$ について、生成する部分格子の共体積、長さの積、平均傾きの下界を求めよ。同じ長さで独立性がない場合を説明せよ。

<!-- solution-start -->
**詳細解答。** 二列の行列式は $3\cdot2-4\cdot0=6$、非零なので独立です。二つの独立なベクトルは自らが生成する部分格子の基底なので、[格子の共体積](../../NDA/NDA3/index.md#def-nda3-lattice)は行列式の絶対値6です。長さは5,2なので積は10。[独立な整数像による共体積評価](#prop-afr24-volume)により

$$
\mu(C)\ge-\tfrac12\log10.
$$

実際は共体積1で $\mu(C)=0$ です。独立性を外して $C_L=\mathbb Z(1,0)+\mathbb Z(0,L)$ とし $y_1=(5,0),y_2=(2,0)$ を選ぶと長さは同じですが $L$ を10より大きくできるため、体積評価は成立しません。
<!-- solution-end -->

<a id="ex-afr24-b3"></a>

### B3. 局所条件を追加する

- Level: B
- ID: AFR24-B3

$G=\mathbb Z/12\mathbb Z$ が $\mathbb F_2$ に自明に作用する。$H=\langle4\rangle$、$J=\langle3\rangle$ とし、第1コホモロジーから $H$ への制限の核、両方への制限の核の位数を求めよ。

<!-- solution-start -->
**詳細解答。** [連続1次群コホモロジー](../../IWA/IWA18/index.md#def-iwa18-h1)で作用が自明ならコサイクルは準同型、余境界は零です。生成元の像を $a\in\mathbb F_2$ とします。

$$
c(j)=ja,\qquad c(12)=12a=0.
$$

この条件は任意の元で成立するので全2個の類があります。部分群 $H$ の生成元では

$$
c(4)=4a=0.
$$

従って制限の核は2個です。一方、部分群 $J$ の生成元では

$$
c(3)=3a=a.
$$

この値が零となるのは $a=0$ の場合だけです。両方への核は1個です。この模型は係数が有限で制限が定義できることを使っています。
<!-- solution-end -->

<a id="ex-afr24-b4"></a>

### B4. 最終命題と条件付き証明

- Level: B
- ID: AFR24-B4

第6節のLean実験で identityProof と targetProof の型を説明し、incomplete を使って定義した別の命題の証明に何が伝わるか述べよ。さらに最終RHの5宣言とRの13仮説の違いを説明せよ。

<!-- solution-start -->
**詳細解答。** identityProof は任意の P に対し P の証明から P の証明への関数です。P の証明を無条件に構成してはいません。targetProof は定義を展開すると True の証明であり、仮定はありません。例えば incomplete から False.elim を通して任意の P の証明を作ると、その証明は incomplete を介して sorryAx に依存します。#print axioms は間接依存も調べる必要があります。

公表されたRHの5宣言は条件付きの中間補題ではなく、数学的対象を量化した命題そのものの証明です。Rの13仮説は自然言語解説が(M)の導出に使う入力で、解説稿内では全てを完証していません。Rの未完部分を、そのままLeanの未解消仮定とみなすことはできません。
<!-- solution-end -->

<a id="ex-afr24-c1"></a>

### C1. 模型の上界から零点判定まで

- Level: C
- ID: AFR24-C1

$m,k,n$ の指数模型を $m=x^{1/2}$、$k=x^{9/2}$、$n=x^2$ とする。固定した原始文字 $\psi$ に関し、AFR23の正係数和 $G^\psi$ が任意に大きい $Y$ に対する区間 $[Y,Y^{3/2}]$ 全域で

$$
G^\psi(x)\le A_\varepsilon x^{C\varepsilon}
(x/m+xm/k+m+k/n^2)
$$

を満たすと仮定する。$A_\varepsilon>0$、$C>0$ は $x$ と区間に依存せず、この条件は任意の十分小さい正の $\varepsilon$ で成り立つとする。

指数を整理し、固定した $\psi$ の臨界帯内零点を判定せよ。また、整数格子の模型だけからこの仮定を証明できない理由を二つ挙げよ。

<!-- solution-start -->
**詳細解答。** 各項に代入すると $x^{1-1/2}=x^{1/2}$、$x^{1+1/2-9/2}=x^{-3}$、$x^{1/2}$、$x^{9/2-4}=x^{1/2}$ となります。$x\ge1$ なら $x^{-3}\le x^{1/2}$ なので

$$
G^\psi(x)\le4A_\varepsilon x^{1/2+C\varepsilon}.
$$

$1/2<\theta<1$ を固定して、次の条件を満たす正の $\varepsilon$ を選びます。

$$
C\varepsilon<\theta-1/2.
$$

指数の差が正なので十分大きい $x$ で

$$
4A_\varepsilon\le x^{\theta-1/2-C\varepsilon}
$$

となります。従って十分大きな $Y$ を取れば同一区間全域で

$$
G^\psi(x)\le x^\theta.
$$

任意に遠い区間が得られるので [固定文字に対するGRHの区間判定](../AFR23/index.md#cor-afr23-grh-criterion)の条件を満たします。右側の零点は $\theta$ をその実部より小さく取ることで排除されます。左側の零点も同系の証明にある原始文字の関数等式（共役を含む対称性）によって排除されます。

ここで使ったのは正係数和に対する上界の仮定です。整数化の模型だけでは、例えば実際のtheta周期の素点別整除性や、必要な独立な像を確保する跡・階数の評価が得られません。加えて射影の分母の一様評価や区間全域のパラメータ存在も必要です。模型を確認しただけで上の仮定が証明されたとすることはできません。
<!-- solution-end -->

## 8. 次の学習へ

保型形式・保型表現の講義はここまでです。形式的RH/Dirichlet GRH証明をさらに読みたい場合は、RH証明研究講読（RHP系列）で局所整性、CM、算術格子、Galoisコホモロジー、主不等式(M)の人間可読な証明を個別に学びます。形式証明の依存関係を追うことは、その数学を理解するための出発点です。
