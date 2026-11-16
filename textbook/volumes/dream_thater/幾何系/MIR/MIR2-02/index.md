# MIR2-02 quinticのGW不変量と仮想次元

<!-- definition-example-audit: strict -->

## 1. 曲線の次数を定めた後、何を「数」と呼ぶのか

前講では[超平面次数](../MIR2-01/index.md#def-mir2-01-curve-degree)を、種数0の安定写像 $f:C\to X$ に対して $d=\int_Cf^*H$ と定めた。多重被覆なら像が一本の直線でも $d=2$ などになり得る。B側の周期が曲線計数へつながるには、まず**A側で何を積分した数なのか**を明確にする必要がある。

[凸標的の一次GW不変量](../../GW/GW1-13/index.md#def-gw1-13-primary-invariant)は、滑らかなモジュライの基本類へ評価類を積分した。しかしquinticは一般に凸標的ではない。前提の[非凸標的の障害](../../GW/GW1-19/index.md#prop-gw1-19-local-reduction)と[仮想基本類の設計図](../../GW/GW1-20/index.md#def-gw1-20-perfect-obstruction)を使い、「実際の次元」と「積分で使う仮想次元」を分ける。

以下、$X\subset\mathbb P^4_{\mathbb C}$ は**滑らかな五次超曲面**、$H=c_1(\mathcal O_X(1))\in H^2(X;\mathbb Z)$、$d\ge0$ は整数とする。$X$ の複素次元は $3$。曲線類は $d$ で表示し、$d$ は像集合の本数を意味しない。特に断らない限りコホモロジーと積分値は有理係数とする。

## 2. quinticの安定写像と、安定性の境界

[安定写像の定義](../../GW/GW1-08/index.md#def-gw1-08-stable-map)では、節点を持つ連結種数0曲線 $C$、番号付きの相異なる滑らかな標点 $p_1,\ldots,p_k$、各成分で正則な写像 $f:C\to X$ を考え、$(C,p_i,f)$ の自己同型群が有限であることを要求した。特に**定数成分**には、その成分上に標点と節点枝を合わせて三つ以上の特殊点が必要になる。

ここで扱う $\overline{\mathcal M}_{0,k}(X,d)$ は、そのような同型類をパラメータ化する固有Deligne–Mumfordスタックである。曲線類は $\langle H,f_*[C]\rangle=d$ で固定する。スタックとしてのモジュライの存在・固有性は[安定写像モジュライの構成](../../GW/GW1-10/index.md#thm-gw1-10-moduli-existence)を利用する。**滑らかな多様体であるとは仮定しない**。

例えば前講の直線 $L$ の二重被覆 $\mathbb P^1\to L\subset X$ は $d=2$ の安定写像であり、標点 $k=0$ でも非定数なので自己同型は有限である。一方 $d=0,k=2$ の連結種数0曲線は、定数写像について安定にできない。実際、木状の双対グラフに頂点を $v$、辺を $e=v-1$ とすると、全成分の特殊点数の合計は $k+2e=2v$。すべての定数成分に三つ以上必要なら $3v\le2v$ となって矛盾する。同じ議論は $k=0,1$ にも当てはまる。従って $d=0$ では $k\ge3$ に限る。

## 3. 第一Chern類が消える理由と仮想次元

期待次元は[GW1-20の指数計算](../../GW/GW1-20/index.md#def-gw1-20-section-virtual-dim)で扱った、変形方向と障害方向の差である。種数0・複素次元 $m$ の標的では、一般の完全障害理論を使ったときの仮想複素次元は

$$
(m-3)+\langle c_1(TX),\beta\rangle+k
$$

となる。この公式の適用には、標的が滑らかな射影多様体で、安定写像の**自然な**完全障害理論を持つことが必要である。数式を示すだけでは仮想類そのものを構成したことにはならない。

まず $c_1(TX)$ を検算する。滑らかさから法束は $\mathcal O_X(5)$ であり、[超曲面の法束完全列](../../CYG/CYG1-09/index.md#prop-cyg1-09-normal)により

$$
0\longrightarrow TX\longrightarrow T\mathbb P^4|_X
\longrightarrow\mathcal O_X(5)\longrightarrow0.
$$

右辺の $\mathcal O_X(5)$ が現れるのは、五次多項式の微分が法方向の値を与えるためである。[射影空間の標準束](../../CYG/CYG1-09/index.md#prop-cyg1-09-adjunction)の計算と同じく $c_1(T\mathbb P^4|_X)=5H$ であるから、完全列のChern類の加法性を第一次数に適用して $c_1(TX)+5H=5H$ を得る。

<a id="prop-mir2-02-c1-zero"></a>

<!-- formal-statement-start -->
> **命題（quinticの第一Chern類）**  
> 滑らかな五次超曲面 $X\subset\mathbb P^4_{\mathbb C}$ と $H=c_1(\mathcal O_X(1))$ に対して
>
$$
c_1(TX)=0\in H^2(X;\mathbb Z).
$$
<!-- formal-statement-end -->

### 証明の見取り図

標的が滑らかな五次超曲面であることから法束を決め、接束の完全列の第一Chern類を取る。「Calabi–Yauだから零」と逆向きに省略しない。

<!-- proof-start -->
### 証明

[法束完全列](../../CYG/CYG1-09/index.md#prop-cyg1-09-normal)を $r=1,d_1=5,N=4$ に適用する。射影空間のEuler列 $0\to\mathcal O_{\mathbb P^4}\to\mathcal O_{\mathbb P^4}(1)^{\oplus5}\to T\mathbb P^4\to0$ から $c_1(T\mathbb P^4)=5c_1(\mathcal O(1))$。包含による引戻しで $c_1(T\mathbb P^4|_X)=5H$。法束の第一Chern類は $c_1(\mathcal O_X(5))=5H$。接束完全列にChern類の加法性を用いると

$$
c_1(TX)=c_1(T\mathbb P^4|_X)-c_1(\mathcal O_X(5))
=5H-5H=0.
$$

同じ結論は[完全交叉の随伴公式](../../CYG/CYG1-09/index.md#prop-cyg1-09-adjunction)に $n=3,r=1,d_1=5$ を入れて $K_X\simeq\mathcal O_X(5-3-1-1)=\mathcal O_X$ としたことからも確かめられる。
<!-- proof-end -->

次に**期待次元が実際の次元と一致するとは限らない**ことを念頭に、指数を計算する。まず定義域が滑らかな球面の場合、[球面のRiemann–Roch指数](../../GW/GW1-03/index.md#thm-gw1-03-rr-computation)の複素版は

$$
h^0(\mathbb P^1,f^*TX)-h^1(\mathbb P^1,f^*TX)
=3+\langle c_1(TX),d\rangle=3.
$$

非定数写像では球面の座標変更に対応する複素3次元を差し引き、番号付き標点の位置の $k$ 次元を加える。従って $3-3+k=k$。節点を含む安定写像に対しても、定義域変形と節点平滑化を整合させた一般の仮想次元公式が同じ値を与える（構成自体は後述の外部入力）。

<a id="prop-mir2-02-virtual-dimension"></a>

<!-- formal-statement-start -->
> **命題（quintic種数0安定写像の仮想次元）**  
> $X\subset\mathbb P^4_{\mathbb C}$ を滑らかな五次超曲面、$d\ge0$ を超平面次数、$k\ge0$ を標点数とし、$d>0$ または $d=0,\ k\ge3$ と仮定する。種数0の安定写像モジュライ $\overline{\mathcal M}_{0,k}(X,d)$ の自然な安定写像障害理論の**仮想複素次元**は
>
$$
\operatorname{vdim}_{\mathbb C}\overline{\mathcal M}_{0,k}(X,d)
=(3-3)+\langle c_1(TX),d\rangle+k=k.
$$
>
> これは実際のモジュライの各成分が複素次元 $k$ で滑らかだという主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

標的の複素次元 $m=3$ と[第一Chern類の消滅](#prop-mir2-02-c1-zero)を、[安定写像の仮想次元公式](../../GW/GW1-20/index.md#def-gw1-20-section-virtual-dim)で用いた指数計算に代入する。数値の算出と自然な仮想類の存在証明は区別する。

<!-- proof-start -->
### 証明

種数0の指数の一般形は $m-3+\langle c_1(TX),\beta\rangle+k$。いま $m=3$、$\beta=f_*[C]$、[第一Chern類の消滅](#prop-mir2-02-c1-zero)によって $\langle c_1(TX),\beta\rangle=\langle0,\beta\rangle=0$。ゆえに

$$
(3-3)+0+k=k.
$$

滑らかな定義域なら上のRiemann–Rochの計算と一致する。節点を持つ場合には[一般の指数の計算](../../GW/GW1-20/index.md#def-gw1-20-section-virtual-dim)で用いる節点・定義域の寄与を合わせても同じ公式になる。ここでは指数の数値的帰結を証明したのであり、自然な障害理論の大域的構成を再証明していない。
<!-- proof-end -->

**定義域の規約の確認**。$d=0,k=3$ なら仮想複素次元は3、$d=2,k=0$ なら0となる。ただし $d=0,k=0$ に同じ式を代入して「零次元の安定写像モジュライがある」と考えてはならない。安定性条件が先に失われる。

## 4. 自然な仮想基本類で積分する

実際のモジュライが過剰な次元を持つなら、その普通の基本類では期待次数の積分ができない。[有限次元零点模型の仮想類](../../GW/GW1-20/index.md#def-gw1-20-section-virtual-cycle)は、方程式の重複度や障害束を含めて期待次元で交叉する模型だった。一般の安定写像では、[完全障害理論](../../GW/GW1-20/index.md#def-gw1-20-perfect-obstruction)と内在的正規錐が、局所模型を大域的に整合させる役割を担う。

**ここで使う外部数学的入力（仮想類の存在）**。滑らかな射影多様体 $X$、有効曲線類 $\beta$、安定範囲の $g,k$ に対して、安定写像の固有DMスタックには自然な完全障害理論があり、Behrend–Fantechi型の構成によって

$$
[\overline{\mathcal M}_{g,k}(X,\beta)]^{\mathrm{vir}}
\in A_{(1-g)(\dim_{\mathbb C}X-3)+
\langle c_1(TX),\beta\rangle+k}
(\overline{\mathcal M}_{g,k}(X,\beta))_{\mathbb Q}
$$

が定まる。これは単なる点ごとの $H^0,H^1$ の差からは導けない。錐スタック、零切断Gysin写像、貼り合わせと変形に対する適合性の一般証明は本講の射程外であり、一次資料は [Behrend–Fantechi, The Intrinsic Normal Cone](https://arxiv.org/abs/alg-geom/9601010) である。**本講はその出力を使ってquinticの数値次数を厳密に照合する。**

挿入に使う[評価写像](../../GW/GW1-11/index.md#def-gw1-11-evaluation)は $\operatorname{ev}_i(C,p_j,f)=f(p_i)$。$X$ 上のコホモロジー類 $\alpha_i$ を $\operatorname{ev}_i^*\alpha_i$ に引き戻し、モジュライ上で積にする。普通の基本類ではなく仮想類とペアリングした数を新しく定義する。

<a id="def-mir2-02-virtual-gw"></a>

<!-- formal-statement-start -->
> **定義（quintic種数0の一次GW不変量）**  
> $X\subset\mathbb P^4_{\mathbb C}$ を滑らかな五次超曲面、$d\ge0$ を有効な超平面次数、$k\ge0$ を標点数とし、$d>0$ または $d=0,\ k\ge3$ とする。各 $\alpha_i\in H^{r_i}(X;\mathbb Q)$ は斉次類とする。自然な安定写像の仮想基本類に対し、種数0の一次Gromov–Witten不変量を
>
$$
\left\langle\alpha_1,\ldots,\alpha_k\right\rangle_{0,d}^{X}
:=
\int_{[\overline{\mathcal M}_{0,k}(X,d)]^{\mathrm{vir}}}
\prod_{i=1}^{k}\operatorname{ev}_i^*\alpha_i
$$
>
> と定める。ここで $k=0$ の積は単位類であり、積分は実コホモロジー次数 $2k$ の成分とのペアリングで、次数が合わない斉次挿入については零とする。空のモジュライにも零を割り当てる。$d=0,\ k<3$ は定義の**対象外**とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mir2-02-virtual-gw -->

**定義の確認**。$d=0,k=3$ では全成分が定数で、$\overline{\mathcal M}_{0,3}(X,0)\simeq X$。球面上の $H^1(\mathcal O_{\mathbb P^1})=0$ なので写像方向の障害がなく、自然な仮想類は通常の $[X]$ に一致する。三標点の評価写像はすべて $X$ 上の恒等写像となる。$H\in H^2(X)$ を三回挿入すると実次数は $2+2+2=6$、仮想複素次元3の実次元 $2k=6$ に一致する。従って[超平面三重交叉](../../CYG/CYG1-13/index.md#prop-cyg1-13-kahler-ray)から

$$
\langle H,H,H\rangle_{0,0}^{X}
=\int_{[X]}H^3=5.
$$

積分の対象、安定性、評価写像、次数がすべて確認された。**5は次数0での古典交叉数**であり、次数1の直線の本数ではない。

<!-- definition-example-end -->

## 5. 挿入次数は「数になり得るか」の必要条件

上の定義で、$\alpha_i$ の実コホモロジー次数を $r_i$ と書く。評価写像による引戻しは次数を変えず、積の次数は $\sum_i r_i$ である。一方、[仮想次元の命題](#prop-mir2-02-virtual-dimension)より仮想基本類の実次元は $2k$。この一致条件は、**値が非零であるための必要条件**である。

<a id="prop-mir2-02-insertion-degree"></a>

<!-- formal-statement-start -->
> **命題（quinticの一次GW挿入次数の必要条件）**  
> $X\subset\mathbb P^4_{\mathbb C}$ を滑らかな五次超曲面とし、$d>0$ または $d=0,\ k\ge3$ とする。斉次挿入 $\alpha_i\in H^{r_i}(X;\mathbb Q)$ を用いた種数0の一次GW不変量が非零となるためには、
>
$$
\sum_{i=1}^k r_i=2k
$$
>
> が必要である。特に $\alpha_i\in H^{2a_i}(X)$ なら、複素余次元 $a_i$ による条件は $\sum_i a_i=k$ となる。条件が成立しても値が非零とは限らない。
<!-- formal-statement-end -->

### 証明の見取り図

各評価写像の引戻しとカップ積で実次数を足す。積分する仮想類の実次元と一致しない項はペアリングできない。この必要条件から実際の数値を決めることはできない。

<!-- proof-start -->
### 証明

$\operatorname{ev}_i^*\alpha_i\in H^{r_i}(\overline{\mathcal M}_{0,k}(X,d);\mathbb Q)$ だから、積の実次数は $\sum_i r_i$ である。一方、[仮想次元](#prop-mir2-02-virtual-dimension)は複素次元 $k$、ゆえに仮想類の実ホモロジー次数は $2k$。斉次の積分で非零を得るには両者が等しくなければならない。$r_i=2a_i$ の場合は両辺を2で割り $\sum_i a_i=k$ を得る。この計算は整数係数・有理係数のいずれでも次数の整合性を変えない。
<!-- proof-end -->

**必要条件だけの手計算**。$k=3$ の三つの超平面挿入 $(H,H,H)$ は、実次数 $6$ で必要条件に合う。$d>0$ の $\langle H,H,H\rangle_{0,d}$ は値を**まだ計算していない**。一方 $k=1$ の一点類 $[\mathrm{pt}]\in H^6(X)$ は実次数6に対して必要次数2なので、$\langle[\mathrm{pt}]\rangle_{0,d}=0$。$d>0,k=0$ の挿入なし $\langle\,\rangle_{0,d}$ は次数0の類と仮想次元0が一致し、合理的な計数候補になるが、数値が曲線の実本数に一致するとは限らない。

## 6. 次数0の積分と、非凸性が見える被覆の例

次数0では[定数安定写像の積表示](../../GW/GW1-10/index.md#prop-gw1-10-zero-degree)により

$$
\overline{\mathcal M}_{0,k}(X,0)
\simeq X\times\overline{\mathcal M}_{0,k}
\qquad(k\ge3).
$$

種数0の節点木状曲線は $H^1(C,\mathcal O_C)=0$。定数写像の引戻し接束は $T_xX\otimes\mathcal O_C$ なので障害 $H^1(C,f^*TX)=T_xX\otimes H^1(C,\mathcal O_C)=0$。従ってこの場合の自然な仮想類は通常の基本類である。$k=3$ では $\overline{\mathcal M}_{0,3}$ が一点なので、次数0の三点GWは普通の交叉積分になる。

<a id="prop-mir2-02-degree-zero-three-point"></a>

<!-- formal-statement-start -->
> **命題（quinticの次数0・三点一次不変量）**  
> $X\subset\mathbb P^4_{\mathbb C}$ が滑らかな五次超曲面で、$\alpha,\beta,\gamma\in H^*(X;\mathbb Q)$ なら
>
$$
\langle\alpha,\beta,\gamma\rangle_{0,0}^{X}
=\int_X\alpha\smile\beta\smile\gamma.
$$
>
> 特に $\langle H,H,H\rangle_{0,0}^{X}=5$。また $k>3$ の次数0・一次挿入だけのGW不変量は零である。
<!-- formal-statement-end -->

### 証明の見取り図

定数写像では標点の像がすべて同じ点にあり、評価類は $X$ からの引戻しになる。三標点なら曲線側に自由度が残らず、四標点以上では曲線側の正次元が残る。

<!-- proof-start -->
### 証明

上の積表示と障害の消滅により仮想類は積 $X\times\overline{\mathcal M}_{0,k}$ の通常の基本類である。評価写像はどれも第一因子の射影 $\operatorname{pr}_X$ に等しいので、挿入の積は $\operatorname{pr}_X^*(\alpha_1\smile\cdots\smile\alpha_k)$。$k=3$ なら $\overline{\mathcal M}_{0,3}$ は一点、従って積分は主張の $X$ 上の交叉数。$H^3$ の積分値は[三重交叉](../../CYG/CYG1-13/index.md#prop-cyg1-13-kahler-ray)の5である。

$k>3$ ではモジュライの複素次元が $k>3$ なのに、一次挿入の積は $X$ の複素次元3に由来するので、非零ならその実次数は高々6。一方、積分に必要なのは $2k>6$。よって積分は零となる。
<!-- proof-end -->

次に、なぜ正の次数で通常の基本類へ戻れないのかを、**二重被覆**で観察する。滑らかなquinticが直線 $L\simeq\mathbb P^1$ を含み、その法束が $N_{L/X}\simeq\mathcal O_L(-1)^{\oplus2}$ である場合を考える。これはすべての直線についての無条件な主張ではなく、次の計算を行うための仮定である。

法束と接束の完全列

$$
0\longrightarrow TL\simeq\mathcal O(2)
\longrightarrow TX|_L\longrightarrow
N_{L/X}\simeq\mathcal O(-1)^{\oplus2}
\longrightarrow0
$$

を次数2の被覆 $f:\mathbb P^1\to L$ で引き戻すと、$\mathcal O(4)$ と $\mathcal O(-2)^{\oplus2}$ の列になる。[射影直線の線束コホモロジー](../../../代数系/AG/AG3-08/index.md#thm-ag3-08-p1-cohomology)から $H^1(\mathcal O(6))=0$、ゆえにこの拡大は分裂し

$$
f^*TX\simeq\mathcal O(4)\oplus
\mathcal O(-2)\oplus\mathcal O(-2).
$$

したがって $h^0=5$、$h^1=1+1=2$。滑らかな球面の再パラメータ化の三次元を除いた一次自由度は $5-3=2$、指数は $2-2=0$。実際に固定直線への次数2被覆は、二つの二次多項式の係数六個から共通スカラー一個、座標変更三個を引き、局所的に複素2次元の族をなす。よって**実際には二次元の被覆族がありながら、仮想複素次元は零**となる。

<a id="prop-mir2-02-double-cover"></a>

<!-- formal-statement-start -->
> **命題（負の法束を持つ直線の二重被覆）**  
> 滑らかな五次超曲面 $X\subset\mathbb P^4_{\mathbb C}$ が直線 $L\simeq\mathbb P^1$ を含み、$N_{L/X}\simeq\mathcal O_L(-1)^{\oplus2}$ とする。次数2の正則被覆 $f:\mathbb P^1\to L\subset X$ に対し、標点なしの安定写像の一次変形空間の複素次元は2、障害候補空間の複素次元は2で、差は0である。その被覆族は実際に複素2次元であり、仮想複素次元0と異なる。
<!-- formal-statement-end -->

### 証明の見取り図

負の法束を引き戻して $H^1$ が出ることを確認する。負方向の障害を差し引くと、二重被覆を動かす自由度と仮想次元との差が説明できる。

<!-- proof-start -->
### 証明

上の引戻し列の拡大類は $\operatorname{Ext}^1(\mathcal O(-2)^{\oplus2},\mathcal O(4))=H^1(\mathcal O(6))^{\oplus2}=0$ なので、分裂する。$h^0(\mathcal O(4))=5$、$h^1(\mathcal O(4))=0$、$h^0(\mathcal O(-2))=0$、$h^1(\mathcal O(-2))=1$。従って $h^0(f^*TX)=5$、$h^1(f^*TX)=2$。

非定数正則写像であるため球面の無限小自己同型からの写像は単射であり、[再パラメータ化と局所障害の公式](../../GW/GW1-19/index.md#prop-gw1-19-local-reduction)により $5-3=2$ が一次変形次元、$2$ が障害候補次元となる。二つの二次同次式の組は（共通零点なしという開条件下で）$\mathbb P^5$ の開集合をなし、$\operatorname{PGL}_2$ の三次元の座標変更で割ると局所次元 $5-3=2$。一方、[仮想次元の命題](#prop-mir2-02-virtual-dimension)では $d=2,k=0$ だから0。実際の局所族と仮想次元の差を確認した。
<!-- proof-end -->

**なぜ仮定が重要か**。法束が負でなければ、被覆で $H^1(\mathcal O(-2))$ が二つ現れる計算は使えない。逆に $H^1\ne0$ という情報だけでは、仮想類の具体的な数値や被覆族の寄与は決まらない。必要なのは自然な完全障害理論の大域的な仮想類である。

ここで得たものと、まだ得ていないものを分ける。**証明済み**なのは $c_1(TX)=0$、仮想次元 $k$ の指数計算、挿入の次数必要条件、次数0の積分、条件付き二重被覆の変形次元である。**外部の数学的定理に委ねる**のは、非凸な安定写像モジュライの自然な完全障害理論と仮想基本類の大域的構成である。次数 $d>0$ の実際のGW数やミラー対称性の等式は本講では計算していない。次講で因子挿入が次数にどのような係数を生むかを調べる。

## 7. 演習：次数・標点・仮想類を分離する

### Level A：安定性と次元を手で確かめる

<a id="ex-mir2-02-a01"></a>
#### MIR2-02-A01 超曲面の次数と第一Chern類
- Level: A

$\mathbb P^4$ の滑らかな次数 $e$ の超曲面 $X_e$ に対して $c_1(TX_e)$ を超平面類 $H$ で表し、$e=4,5$ を比較せよ。$e=4$ の種数0・次数 $d$・$k$ 標点の期待次元も計算せよ。

<!-- solution-start -->
**詳細解答**。[法束完全列](../../CYG/CYG1-09/index.md#prop-cyg1-09-normal)の法束を $\mathcal O(e)$ とすると、$c_1(T\mathbb P^4|_{X_e})=5H$ から $c_1(TX_e)=(5-e)H$。$e=4$ では $c_1=H$、$e=5$ では $c_1=0$。$X_4$ の複素次元は3なので、$d=\langle H,\beta\rangle$ に対して指数公式は $(3-3)+(5-4)d+k=d+k$。quinticでは同じ計算が $k$ だけとなる。$e$ の項を誤って標的の次元 $4$ に入れない。
<!-- solution-end -->

<a id="ex-mir2-02-a02"></a>
#### MIR2-02-A02 挿入の必要次数
- Level: A

$d=2$ のquinticで、$k=3$ の $(H,H,H)$ と、$k=1$ の一点類 $[\mathrm{pt}]\in H^6(X)$ の一次GW不変量について、次数から非零を排除できるか答えよ。

<!-- solution-start -->
**詳細解答**。[仮想次元](#prop-mir2-02-virtual-dimension)は $k$。三標点では必要な実次数が $2k=6$、三つの $H$ は $2+2+2=6$ で排除されない。ただし数値は決まらない。一標点では $2k=2$ だが $[\mathrm{pt}]$ は実次数6なので、[次数必要条件](#prop-mir2-02-insertion-degree)に反して不変量は零である。
<!-- solution-end -->

<a id="ex-mir2-02-a03"></a>
#### MIR2-02-A03 次数0の三点交叉
- Level: A

$\langle H^2,H,1\rangle_{0,0}^{X}$ と $\langle H,H,H\rangle_{0,0}^{X}$ を計算せよ。$1$ は単位類とする。

<!-- solution-start -->
**詳細解答**。いずれも $d=0,k=3$ の安定範囲にある。[次数0の三点公式](#prop-mir2-02-degree-zero-three-point)により前者は $\int_XH^2\smile H\smile1=\int_XH^3=5$、後者も $\int_XH^3=5$。複素余次元の和はそれぞれ $2+1+0=3$ と $1+1+1=3$、仮想複素次元3に等しい。
<!-- solution-end -->

<a id="ex-mir2-02-a04"></a>
#### MIR2-02-A04 定数写像の安定性
- Level: A

種数0、定数写像、標点数 $k=2$ の安定写像が存在しないことを、節点を増やしても解消できない理由まで示せ。

<!-- solution-start -->
**詳細解答**。連結種数0の節点曲線の双対グラフは木である。成分数を $v\ge1$ とすると節点は $e=v-1$、各成分上の特殊点（標点と節点枝）の総数は $k+2e=2+2(v-1)=2v$。すべての定数成分が安定なら各成分に最低3個必要で $3v\le2v$、$v>0$ と矛盾する。節点を増やしても総特殊点は平均2個のままである。非定数写像 $d>0$ にはこの一律の定数成分条件を課さない。
<!-- solution-end -->

<a id="ex-mir2-02-a05"></a>
#### MIR2-02-A05 実次数と複素余次元
- Level: A

$k=2$ で挿入 $(H^2,1)$ と $(H,H)$ のそれぞれが、次数の必要条件を満たすか調べよ（$d>0$）。

<!-- solution-start -->
**詳細解答**。$H\in H^2(X)$ の複素余次元は1、$H^2\in H^4(X)$ は2、$1$ は0。$k=2$ では複素余次元の和が2である必要がある。$(H^2,1)$ は $2+0=2$、$(H,H)$ は $1+1=2$ でともに条件を満たす。実次数で書けばいずれも $4=2k$。条件を満たすことから数値が等しいとも非零とも結論できない。
<!-- solution-end -->

### Level B：次数一致だけでは足りない理由

<a id="ex-mir2-02-b01"></a>
#### MIR2-02-B01 負の法束の被覆と障害
- Level: B

$N_{L/X}\simeq\mathcal O(-1)^{\oplus2}$ を満たす直線の次数 $m\ge2$ 被覆 $f:\mathbb P^1\to L$ について $h^0(f^*TX),h^1(f^*TX)$ と無標点の指数を求めよ。通常の次元が指数と一致しない機構を説明せよ。

<!-- solution-start -->
**詳細解答**。法束完全列を次数 $m$ の被覆で引き戻すと $0\to\mathcal O(2m)\to f^*TX\to\mathcal O(-m)^{\oplus2}\to0$。拡大類の空間は $H^1(\mathcal O(3m))^{\oplus2}=0$ なので分裂する。[射影直線の線束コホモロジー](../../../代数系/AG/AG3-08/index.md#thm-ag3-08-p1-cohomology)を用いて

$$
h^0=2m+1,\qquad h^1=2(m-1).
$$

標点なしの非定数球面の座標変更は次元3なので、一次変形 $2m+1-3=2m-2$、障害候補 $2m-2$、差は0。次数 $m$ の被覆の二つの同次多項式は $2(m+1)$ 個の係数を持ち、共通スカラーで1、再パラメータ化で3を引いた $2m-2$ 次元の実際の族がある。負の法束の被覆で出現した $H^1(\mathcal O(-m))$ が、指数から過剰な方向を差し引く機構である。$m=1$ ならこの二つの空間の次元は0となる。
<!-- solution-end -->

<a id="ex-mir2-02-b02"></a>
#### MIR2-02-B02 四標点の次数0で何が零になるか
- Level: B

$d=0,k=4$ の一次GW不変量 $\langle H,H,H,H\rangle_{0,0}^{X}$ を求めよ。単に「挿入次数が合わない」と言う解答の問題点を指摘せよ。

<!-- solution-start -->
**詳細解答**。$k=4$ の仮想複素次元は4、四つの $H$ の複素余次元の和も4なので、[挿入次数必要条件](#prop-mir2-02-insertion-degree)だけでは零と判定できない。しかし[次数0の積表示](#prop-mir2-02-degree-zero-three-point)によりモジュライは $X\times\overline{\mathcal M}_{0,4}$、四つの評価類の積は $\operatorname{pr}_X^*(H^4)$。$X$ の複素次元は3なので $H^4\in H^8(X)=0$。よって不変量は零。必要次数の一致は十分条件でないことが分かる。
<!-- solution-end -->

<a id="ex-mir2-02-b03"></a>
#### MIR2-02-B03 零点の有無と仮想類
- Level: B

$Y=\mathbb P^1$ 上の階数1束 $V=\mathcal O(1)$ の恒等的な零切断を考える。(1) 零点集合の実際の複素次元、(2) 期待次元、(3) 局所化された零点サイクルの次数を計算せよ。次に $V=\mathcal O$ に変えると何が変わるか述べよ。

<!-- solution-start -->
**詳細解答**。零切断なので $Z(s)=Y=\mathbb P^1$ は実際の複素次元1。(1) は1。(2) は $n-r=1-1=0$。[GW1-20の局所化された零点サイクル](../../GW/GW1-20/index.md#def-gw1-20-section-virtual-cycle)では零切断の仮想零サイクルは $c_1(V)\cap[Y]$ に一致する。$V=\mathcal O(1)$ なら $\int_{\mathbb P^1}c_1(\mathcal O(1))=1$ なので (3) は1。$V=\mathcal O$ なら $c_1(V)=0$ で (3) は0。台は同じ $\mathbb P^1$ で期待次元も0だが、束（すなわち零点問題の障害理論）が違うため数が変わる。これは特定のquinticのGW不変量を直接計算した例ではない。
<!-- solution-end -->

<a id="ex-mir2-02-b04"></a>
#### MIR2-02-B04 数値と曲線の本数を分離する
- Level: B

$d>0$ の標点なしの有理数 $N_d:=\langle\,\rangle_{0,d}^{X}$ が定義可能な理由を述べ、「$N_2$ は像が二次曲線の本数である」という主張に何が不足するか論ぜよ。

<!-- solution-start -->
**詳細解答**。$d>0,k=0$ は非定数安定写像が存在し得る安定範囲で、[仮想次元](#prop-mir2-02-virtual-dimension)は0。空の挿入積は実次数0なので[次数条件](#prop-mir2-02-insertion-degree)に合い、自然な仮想基本零サイクルの次数として $N_d\in\mathbb Q$ を定義できる。ただし空モジュライなら値は0である。二次被覆 $\mathbb P^1\to L$ の例は、像が直線でも $d=2$ になることを示す。さらに自己同型を持つ写像のスタック積分には有理重みがあり、障害理論の仮想重複度もある。従って次数2であるというだけでは、像が二次曲線であることも、その幾何的な本数と $N_2$ が一致することも言えない。多重被覆による数の整理は後続講義で行う。
<!-- solution-end -->

### Level C：計数へ入る前の総合判定

<a id="ex-mir2-02-c01"></a>
#### MIR2-02-C01 安定性・挿入次数・非凸性の総合問題
- Level: C

滑らかなquintic $X$ とその超平面類 $H$ について次をすべて検算せよ。

1. $d=0$ で $k=2,3,4$ の安定性、仮想複素次元を区別し、$\langle H,H,H\rangle_{0,0}^{X}$ と $\langle H,H,H,H\rangle_{0,0}^{X}$ を求める。
2. $d=2,k=0$ の標点なし不変量と、$d=2,k=1$ の挿入 $H$ は次数だけで排除されるか判定する。
3. $N_{L/X}=\mathcal O(-1)^{\oplus2}$ の直線の二重被覆について、実際の変形次元と仮想次元の差を計算し、(2) のGW数そのものを決定できない理由を述べる。

<!-- solution-start -->
**詳細解答**。

(1) 定数の種数0曲線は各成分に三つの特殊点が必要なので、[木の特殊点計数](#prop-mir2-02-virtual-dimension)と安定性から $k=2$ では対象外。$k=3$ ならモジュライは $X$、仮想複素次元3、[次数0の三点公式](#prop-mir2-02-degree-zero-three-point)から $\int_XH^3=5$。$k=4$ ならモジュライは $X\times\overline{\mathcal M}_{0,4}$、仮想複素次元4だが、一次挿入は $H^4=0$ を与えるので四点値は零。数式 $k$ は安定範囲で初めて使える。

(2) $d=2>0$ は無標点でも安定写像の対象になり、$k=0$ の仮想次元は0。空の挿入は実次数0だから非零の可能性を排除できない。$k=1$ では仮想複素次元1、$H$ は実次数2で必要な $2k=2$ に合う。こちらも次数条件からは排除できず、数値は未決定。

(3) [二重被覆の命題](#prop-mir2-02-double-cover)より $f^*TX=\mathcal O(4)\oplus\mathcal O(-2)^2$、$h^0=5,h^1=2$。球面の座標変更三次元を引くと一次変形は $5-3=2$、障害候補は2で、期待次元は $2-2=0$。実際の次数2被覆族も二次同次式の組の $\mathbb P^5$ から三次元の座標変更を除いた複素2次元である。差は2。仮想零サイクルの次数には大域的な完全障害理論・正規錐・他の成分と境界からの寄与が必要であり、二つの空間の次元を引いただけでは (2) のいずれの数も求まらない。
<!-- solution-end -->
