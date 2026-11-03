# CYG1-14 Calabi–Yauの総合判定とmirror symmetryへの入口

<!-- definition-example-audit: strict -->

## 1. 同じ名前でも、何を確かめたかは違う

これまで、滑らかな射影超曲面の標準束、Chern類、Hodge数を手で計算し、[YauのRicci形式指定定理](../CYG1-10/index.md#thm-cyg1-10-yau)を用いてRicci平坦計量の存在を述べ、ホロノミーと一次変形を調べた。だが個々の結果が正しくても、異なる条件を一度に「Calabi–Yauだから」とまとめれば誤った結論になる。

例えば、標準束が正則自明な五次三次元多様体と、標準束が非自明な2-torsionであるEnriques曲面は、どちらも実係数の第一Chern類が零で、Ricci平坦Kähler計量を**持つ**。この共通点だけから、どちらにも零にならない正則体積形式が存在すると言ってよいだろうか。答えは否である。

本章では、最初に条件の論理的な順序を確かめ、次に具体例を同じ表で判定する。最後に五次三次元多様体の二つのHodge数が交換されるというmirror symmetry（鏡映対称性）の典型的な予想・構成例を、**ここまでで証明した範囲**と分けて読む。

舞台は、断りがなければ滑らかで連結・コンパクトな複素次元 $n\ge1$ のKähler多様体 $X$ である。標準束を $K_X=\det\Omega_X^1$ と書く。

接束の整係数第一Chern類と実係数像は $c_1(X)_{\mathbb Z}$、$c_1(X)_{\mathbb R}$ である。計量 $g$ のRicci形式は $\rho(g)$ とする。

制限・全ホロノミーはそれぞれ $\operatorname{Hol}^0(g)$、$\operatorname{Hol}(g)$ とする。これらの区別は[最初の条件比較](../CYG1-01/index.md#def-cyg1-01-criteria)で導入した。

## 2. 「ある計量」と「この計量」の間を越えない

まず最も危険な飛躍は、コホモロジー類の条件から、手元にある任意の計量の曲率が零だと推論することである。$c_1(X)_{\mathbb R}=0$ は $[\rho(g)/(2\pi)]=0$ を意味するだけで、$\rho(g)=0$ は意味しない。ここで使うのは、Kähler類を固定した**別の計量の存在**を保証する[Yauの定理](../CYG1-10/index.md#thm-cyg1-10-yau)である。その非線形偏微分方程式の存在証明は、この講義群では外部入力とした。

<a id="prop-cyg1-14-decision"></a>

<!-- formal-statement-start -->
> **命題（Calabi–Yau条件の判定順序）**
>
> $X$ を滑らかで連結・コンパクトな複素次元 $n\ge1$ のKähler多様体とする。このとき次の含意が成り立つ。

$$
K_X\simeq\mathcal O_X
\Longrightarrow c_1(X)_{\mathbb Z}=0
\Longrightarrow c_1(X)_{\mathbb R}=0.
$$

> また任意に指定されたKähler類について、次は同値である（存在方向に[YauのRicci形式指定定理](../CYG1-10/index.md#thm-cyg1-10-yau)を使う）。

$$
c_1(X)_{\mathbb R}=0
\quad\Longleftrightarrow\quad
\text{その類にRicci平坦Kähler計量が存在する}.
$$

> 実際に選んだRicci平坦Kähler計量 $g$ については

$$
\operatorname{Hol}^0(g)\subseteq SU(n),\qquad
K_X\simeq\mathcal O_X
\quad\Longleftrightarrow\quad
\operatorname{Hol}(g)\subseteq SU(n).
$$

> 最後の同値は**Ricci平坦性とコンパクト性を仮定した**命題である。いずれも $\operatorname{Hol}(g)=SU(n)$ という等号を保証しない。
<!-- formal-statement-end -->

### 証明の見取り図

標準束の正則枠から第一Chern類が零になる。係数変更ではtorsionを失う。逆の「実係数零からRicci平坦計量を作る」一歩だけは[YauのRicci形式指定定理](../CYG1-10/index.md#thm-cyg1-10-yau)を使う。最後は連結成分のホロノミーと、全閉路に沿って正則体積形式を平行移動できるかを分けて考える。

<!-- proof-start -->
### 証明

零にならない大域正則 $n$ 形式 $\Omega$ があることと $K_X\simeq\mathcal O_X$ は[標準束の自明化判定](../CYG1-02/index.md#prop-cyg1-02-volume-trivialization)で同値である。この正則自明化は連続な複素線束の自明化でもあるから、[第一Chern類の含意](../CYG1-01/index.md#prop-cyg1-01-chern-chain)を適用して $c_1(X)_{\mathbb Z}=0$。係数準同型 $H^2(X;\mathbb Z)\to H^2(X;\mathbb R)$ は零を零へ送るため、次の含意が従う。

続いて、[Ricci形式と実係数第一Chern類の関係](../CYG1-01/index.md#prop-cyg1-01-ricci-holonomy)は

$$
[\rho(g)/(2\pi)]=c_1(X)_{\mathbb R}
$$

である。$\rho(g)=0$ なら右辺は零。一方 $c_1(X)_{\mathbb R}=0$ なら、固定したKähler類と代表形式 $\eta=0$ を[Yauの定理](../CYG1-10/index.md#thm-cyg1-10-yau)へ入力すると、その類に $\rho(g')=0$ を満たす一意のKähler形式 $\omega'$ が存在する。一般には最初の $g$ と $g'$ は異なる。

そのRicci平坦計量について、[制限ホロノミーの判定](../CYG1-11/index.md#prop-cyg1-11-determinant)から $\operatorname{Hol}^0(g)\subseteq SU(n)$。さらに[全ホロノミーと標準束の同値](../CYG1-11/index.md#cor-cyg1-11-canonical-full)は、Ricci平坦性・連結コンパクト性の下で正則体積形式が平行となることを使って成立する。これが最後の同値を与える。$SU(n)$ の**部分群**であることから群全体との等号は従わない。$\square$
<!-- proof-end -->

### 逆向きの失敗を二種類に分ける

1. [Enriques曲面の計算](../CYG1-03/index.md#prop-cyg1-03-enriques-chern)では $c_1(X)_{\mathbb R}=0$ だが $c_1(X)_{\mathbb Z}\ne0$。後者は位数2のtorsionであり、実係数への写像の核に入る。したがって「実係数で零なら整係数でも零」は偽である。
2. [平坦複素トーラスのホロノミー](../CYG1-04/index.md#prop-cyg1-04-flat-holonomy)は $\{I\}$ である。複素次元 $n\ge2$ なら $\{I\}\subsetneq SU(n)$ なので、「全ホロノミーが $SU(n)$ に含まれれば等しい」は偽である。

「$c_1(X)_{\mathbb Z}=0$ なら常に $K_X$ は正則自明」という逆も、この含意鎖だけでは証明されていない。[楕円曲線上の正則非自明な平坦線束](../CYG1-03/index.md#prop-cyg1-03-elliptic-flat-line)は**一般の線束**の反例であるが、その線束は楕円曲線の標準束ではない。ここでそれを標準束自身の反例と取り違えない。

## 3. 五つの対象を条件ごとに判定する

同じ「Calabi–Yau」という語でも、標準束の正則自明性を採用する流儀と、実係数第一Chern類の消失を採用する流儀では集合が違う。次の表ではこの語の代わりに、**検査した条件そのもの**を書く。

| 対象 | 複素次元 | $K_X$ | $c_1(X)_{\mathbb Z}$ | $c_1(X)_{\mathbb R}$ | Ricci平坦計量 | その計量の全Hol |
|---|---:|---|---|---|---|---|
| 滑らかな平面三次曲線 | 1 | 自明 | $0$ | $0$ | 存在 | $\{I\}=SU(1)$ |
| 滑らかな四次K3曲面 | 2 | 自明 | $0$ | $0$ | 存在 | $SU(2)$ への包含までをここでは使用 |
| 滑らかなquintic三次元多様体 | 3 | 自明 | $0$ | $0$ | 存在 | $SU(3)$ への包含までをここでは使用 |
| 複素トーラス $\mathbb C^n/\Lambda$ | $n$ | 自明 | $0$ | $0$ | 平坦な計量あり | $\{I\}$ |
| Enriques曲面 | 2 | 非自明、二乗は自明 | 非零・位数2 | $0$ | 存在 | $SU(2)$ に**含まれない** |

三次曲線・四次曲面・quinticの標準束は、滑らかな $X_d\subset\mathbb P^m$ に対する[随伴公式](../CYG1-02/index.md#thm-cyg1-02-hypersurface-degree)

$$
K_{X_d}\simeq\mathcal O_{X_d}(d-m-1)
$$

へ $(d,m)=(3,2),(4,3),(5,4)$ を代入すると全て指数が零となる。各例の滑らかさは別途確認する必要があり、[四次曲面](../CYG1-05/index.md#prop-cyg1-05-fermat-smooth-canonical)と[五次曲面](../CYG1-08/index.md#prop-cyg1-08-smooth-canonical)ではFermat型でJacobian判定を行った。トーラスでは[商へ降りる正則体積形式](../CYG1-04/index.md#prop-cyg1-04-volume-form)と平坦計量を実際に構成できる。

Enriquesの正則非自明な標準束と非零の整係数torsionは[前章群の具体計算](../CYG1-03/index.md#prop-cyg1-03-enriques-chern)による外部の存在事実とコホモロジーの導出を使う。Yauの定理でRicci平坦計量は存在するが、もし全ホロノミーが $SU(2)$ に含まれるなら、[全ホロノミーの同値定理](../CYG1-11/index.md#cor-cyg1-11-canonical-full)によって $K_X$ が自明となり矛盾する。従って制限Holの包含と**全Holの非包含**は両立する。

上の表の「包含」は「厳密な等号を証明した」という意味ではない。例えば単連結性、既約性、平坦因子の不存在などを調べ、特殊ホロノミーの分類に接続するなら追加の論証が要る。一方、[積Kähler計量のホロノミー](../CYG1-11/index.md#prop-cyg1-11-product)とトーラスでは、真に小さい部分群を具体的に計算できる。

### Hodge数は複素次元をそろえて読む

| 対象 | その次元で特徴的なHodge数 | 根拠 |
|---|---|---|
| 平面三次曲線 | $h^{1,0}=h^{0,1}=1$、$h^{1,1}=1$ | 楕円曲線のHodge分解と $K_X$ の自明性 |
| 四次K3曲面 | $h^{2,0}=1$、$h^{1,1}=20$ | [K3のHodge数計算](../CYG1-05/index.md#prop-cyg1-05-hodge) |
| quintic三次元多様体 | $h^{1,1}=1$、$h^{2,1}=101$ | [quinticのHodge数計算](../CYG1-08/index.md#prop-cyg1-08-hodge-diamond) |
| 複素二次元トーラス | $h^{2,0}=1$、$h^{1,1}=4$ | $h^{p,q}=\binom2p\binom2q$ |
| Enriques曲面 | $h^{2,0}=0$ | $K_X$ 非自明で非零の正則2形式が存在しない |

トーラスの式は平坦座標の $dz^i$、$d\bar z^j$ の外積から得られる。二次元なら $(1,1)$ 型の候補は $dz^i\wedge d\bar z^j$（$i,j=1,2$）の4個で、平坦調和形式として独立である。なお $n=2$ のこの表と $n=3$ の $h^{2,1}$ は、同じ「Hodge数」でも添字も次元も異なる。

## 4. 三次元に限ってHodge数二つからEuler標数を計算する

quinticで得た $h^{1,1}=1$、$h^{2,1}=101$ をmirror symmetryへ持ち込むには、まず何が二数の関係から論理的に導かれるのか確かめたい。一般の複素三次元多様体なら、$h^{1,0}$、$h^{2,0}$ の寄与も消す必要がある。

ここでは $K_X\simeq\mathcal O_X$ に加え $h^{1,0}=h^{2,0}=0$ を仮定する。後者は標準束の自明性**だけでは従わず**、[トーラスがその反例](../CYG1-06/index.md#prop-cyg1-06-torus-counterexample)である。

<a id="prop-cyg1-14-euler-hodge"></a>

<!-- formal-statement-start -->
> **命題（三次元のEuler標数とHodge数）**
>
> $X$ を滑らかで連結・コンパクトな複素三次元Kähler多様体とし、$K_X\simeq\mathcal O_X$ および $h^{1,0}(X)=h^{2,0}(X)=0$ を仮定する。このとき位相的Euler標数は

$$
\chi_{\mathrm{top}}(X)=2\bigl(h^{1,1}(X)-h^{2,1}(X)\bigr)
$$

> に等しい。
<!-- formal-statement-end -->

### 証明の見取り図

Hodge分解を使って $b_k=\sum_{p+q=k}h^{p,q}$ と書く。$K_X$ の自明性は $h^{3,0}=1$ を、Kähler性はHodge対称性とPoincaré双対を与える。これで $b_0,\ldots,b_6$ をすべて二数で表せる。

<!-- proof-start -->
### 証明

連結性から $b_0=1$。[標準束自明から最高型のHodge数が1になる命題](../CYG1-06/index.md#prop-cyg1-06-top-hodge)を $n=3$ に適用して $h^{3,0}=1$。仮定とHodge対称性より

$$
\begin{aligned}
b_1&=h^{1,0}+h^{0,1}=0,\\
b_2&=h^{2,0}+h^{1,1}+h^{0,2}=h^{1,1},\\
b_3&=h^{3,0}+h^{2,1}+h^{1,2}+h^{0,3}
=2+2h^{2,1}.
\end{aligned}
$$

コンパクトで実次元6の向き付け可能な多様体だからPoincaré双対により $b_{6-k}=b_k$、従って $b_4=h^{1,1}$、$b_5=0$、$b_6=1$。交代和の定義から

$$
\begin{aligned}
\chi_{\mathrm{top}}(X)
&=b_0-b_1+b_2-b_3+b_4-b_5+b_6\\
&=1+0+h^{1,1}-(2+2h^{2,1})+h^{1,1}+0+1\\
&=2(h^{1,1}-h^{2,1}).
\end{aligned}
$$

ここで $h^{1,0}=h^{2,0}=0$ を外すと $b_1$ と $b_2$ に追加項が残り、この式は一般には成立しない。$\square$
<!-- proof-end -->

**直接例。** [quinticの計算](../CYG1-08/index.md#prop-cyg1-08-hodge-diamond)では弱Lefschetzの外部入力などを用いて $h^{1,0}=h^{2,0}=0$、$h^{1,1}=1$、$h^{2,1}=101$ を確かめた。ここに代入すると

$$
\chi_{\mathrm{top}}(X)=2(1-101)=-200.
$$

この符号は、[接束のChern類の直接計算](../CYG1-07/index.md#prop-cyg1-07-quintic)による $c_3(TX)=-40H^3$ と $\int_XH^3=5$ からの $-40\cdot5=-200$ に一致する。異なる計算経路の照合が、係数や符号の取り違えを検出する。

## 5. mirror symmetryが交換するもの・しないもの

前節で $101$ は複素構造の一次変形と結び付く。[正則体積形式による収縮同型](../CYG1-12/index.md#thm-cyg1-12-first-order-hodge)は $H^1(X,T_X)\simeq H^{2,1}(X)$ を与え、[quinticの多項式方向の計算](../CYG1-13/index.md#thm-cyg1-13-all-first-order)はこの101方向を具体的な係数変化と接続した。他方、[Kähler錐の計算](../CYG1-13/index.md#prop-cyg1-13-kahler-ray)では $h^{1,1}=1$ がKähler類の実の一次方向を数えた。

mirror symmetryの典型的な予測は、あるCalabi–Yau三次元多様体 $X$ に対して、別の三次元多様体 $Y$ が対応し、複素構造の方向と（複素化された）Kähler方向の役割が入れ替わるというものである。このとき特に期待される**数値の交換**は

$$
h^{1,1}(Y)=h^{2,1}(X),\qquad
h^{2,1}(Y)=h^{1,1}(X).
$$

ただしこの二つの等式**だけ**は「$Y$ がmirrorである」の定義として十分ではない。実際のmirror symmetryには周期、変形空間、曲線の数え上げと量子補正など、追加の構造と対応がある。ここでは数値的帰結を先に調べる。

<a id="prop-cyg1-14-mirror-euler"></a>

<!-- formal-statement-start -->
> **命題（Hodge数交換がEuler標数へ与える帰結）**
>
> $X,Y$ をともに滑らかで連結・コンパクトな複素三次元Kähler多様体とし、両者で標準束が正則自明、$h^{1,0}=h^{2,0}=0$ とする。さらに

$$
h^{1,1}(Y)=h^{2,1}(X),\qquad
h^{2,1}(Y)=h^{1,1}(X)
$$

> が成り立てば、$\chi_{\mathrm{top}}(Y)=-\chi_{\mathrm{top}}(X)$ である。これは**交換を仮定した条件命題**であり、$Y$ の存在を主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

二つの多様体それぞれに、[三次元のEuler標数とHodge数の関係](#prop-cyg1-14-euler-hodge)を適用する。交換された二つの数の差は符号が反転する。

<!-- proof-start -->
### 証明

両者は[三次元のEuler標数とHodge数の関係](#prop-cyg1-14-euler-hodge)の全仮定を満たすので、$a=h^{1,1}(X)$、$b=h^{2,1}(X)$ と置けば

$$
\chi_{\mathrm{top}}(X)=2(a-b).
$$

交換仮定によって $h^{1,1}(Y)=b$、$h^{2,1}(Y)=a$ だから

$$
\chi_{\mathrm{top}}(Y)=2(b-a)=-2(a-b)=-\chi_{\mathrm{top}}(X).
$$

等式の成立は交換を**前提とした計算**であり、交換を実現する幾何学的な $Y$ を構成していない。$\square$
<!-- proof-end -->

quinticの $(h^{1,1},h^{2,1})=(1,101)$ を交換した鏡像候補は $(101,1)$ となり、上の公式からEuler標数は $+200$ でなければならない。**必要な数値条件を検査した**のであって、存在・特異点解消・mirror対応を証明したわけではない。

### Fermat型の一パラメータ族が入口になる理由

Fermat型quinticの族は[前章で滑らかなパラメータを判定した族](../CYG1-13/index.md#prop-cyg1-13-fermat-101)と同じ

$$
X_\psi:\quad F_\psi(z)=\sum_{i=0}^4z_i^5-5\psi z_0z_1z_2z_3z_4=0
\quad\subset\mathbb P^4.
$$

ここで $\mu_5=\{\zeta\in\mathbb C:\zeta^5=1\}$ を五乗して1になる複素数の群とする。各座標に $\zeta_i$ を掛ける変換のうち積が1のものは、$z_i^5$ と $z_0z_1z_2z_3z_4$ をそれぞれ不変にする。射影空間では全座標への共通スカラー倍を同一視するから、次の群を考える。

$$
G=\{(\zeta_0,\ldots,\zeta_4)\in\mu_5^5:
\zeta_0\cdots\zeta_4=1\}/\mu_5^{\mathrm{diag}}.
$$

分母は全成分が同じ五乗根の対角部分群で、五成分の積は $\zeta^5=1$ なので分子に含まれる。$G$ を「位相対称群」と呼ぶのは、各座標へ五乗根を掛ける操作に由来する。

<a id="prop-cyg1-14-phase-group"></a>

<!-- formal-statement-start -->
> **命題（Fermat型族を保つ位相対称群）**
>
> $\psi\in\mathbb C$ とし、$\mathbb P^4_{\mathbb C}$ 上の斉次五次式を次で定める。

$$
F_\psi=\sum_{i=0}^4z_i^5-5\psi z_0z_1z_2z_3z_4.
$$

> $\mu_5=\{\zeta\in\mathbb C:\zeta^5=1\}$、$\mu_5^{\mathrm{diag}}$ を5成分が等しい対角部分群とし、

$$
G=\{(\zeta_i)\in\mu_5^5:\prod_{i=0}^4\zeta_i=1\}
/\mu_5^{\mathrm{diag}}
$$

> と置く。このとき $G$ は各 $X_\psi=\{F_\psi=0\}$ に射影変換として作用し、

$$
|G|=5^3=125.
$$

> $\psi^5\ne1$ なら $X_\psi$ は滑らかである。ただし商 $X_\psi/G$ が滑らかという結論は含まない。
<!-- formal-statement-end -->

### 証明の見取り図

最初の四つの $\zeta_i$ は各5通り、最後の一つは積が1となるよう一意に決まる。射影的に同じ対角変換5個を割る。式が不変なことを各単項式へ代入して確かめる。

<!-- proof-start -->
### 証明

$\zeta_0,\ldots,\zeta_3$ を任意に選ぶと、$\zeta_4=(\zeta_0\zeta_1\zeta_2\zeta_3)^{-1}$ が唯一の選択であり、これも五乗根なので分子の位数は $5^4$。対角部分群は位数5で自由に積の群を割るから

$$
|G|=\frac{5^4}{5}=5^3=125.
$$

各 $i$ について $(\zeta_i z_i)^5=z_i^5$、積の項も $\prod_i(\zeta_i z_i)=(\prod_i\zeta_i)\prod_i z_i=\prod_i z_i$。従って $F_\psi$ は不変で、零集合上の作用はよく定義される。また対角元は射影空間で同じ点を表すから商群の作用となる。最後に $\psi^5\ne1$ の滑らかさは[前章のJacobian計算](../CYG1-13/index.md#prop-cyg1-13-fermat-101)で示したものである。これは**元の $X_\psi$** の滑らかさであり、群作用の固定点を除去する主張ではない。$\square$
<!-- proof-end -->

標準的な「quinticのmirror」の例は、この $G$ による商とその特異点の適切な（crepantな）解消に関係する。一般的な滑らかなパラメータで得られるmirror三次元多様体のHodge数が $(101,1)$ となることは、ここでは**外部の深い結果**として紹介する（構成と証明の学習には[mirror symmetryの講義ノート](https://www.dpmms.cam.ac.uk/~mg475/utah.pdf)を参照）。$G$ の位数125や不変式の確認だけからHodge数を証明したことにはならない。商の固定点・解消で追加されるコホモロジーを数える必要があるからである。

一パラメータ $\psi$ は $X_\psi$ 全体の一次変形101方向の**うちの一方向**に過ぎない。mirror側の $h^{2,1}=1$ と元の族のパラメータ数1が一致することも、群商・解消と変形論を経ずに同一視する根拠にはならない。mirror symmetryの本格的な主張では、周期積分や曲線の数え上げ（Gromov–Witten不変量）を結び付ける。これらの構成・定理の証明は後続の学習課題である。

## 6. 演習――含意と交換を自分で判定する

<a id="ex-cyg1-14-a01"></a>
#### CYG1-14-A01 三つの第一Chern類の判断
- Level: A

$X$ を滑らかな連結コンパクトKähler多様体とする。$K_X\simeq\mathcal O_X$ が与えられた場合、$c_1(X)_{\mathbb Z}$、$c_1(X)_{\mathbb R}$、Ricci平坦Kähler計量の**存在**について、成立する結論とその順番を述べよ。また「与えられた任意のKähler計量がRicci平坦」という結論が出ない理由を述べよ。

<!-- solution-start -->
**詳細解答。** [標準束からChern類への含意](../CYG1-01/index.md#prop-cyg1-01-chern-chain)により、正則自明な線束の第一Chern類は零だから

$$
c_1(X)_{\mathbb Z}=0\ \Longrightarrow\ c_1(X)_{\mathbb R}=0.
$$

後者を[固定Kähler類におけるRicci平坦計量の存在](../CYG1-10/index.md#cor-cyg1-10-ricci-flat)に入力すると、各Kähler類にRicci平坦な代表計量が存在する。一方、最初の任意の計量 $g$ については $[\rho(g)/(2\pi)]=0$ としか分からず、代表形式 $\rho(g)$ 自身が零とはいえない。この「存在」と「指定済みの計量の性質」の区別が必要である。
<!-- solution-end -->

<a id="ex-cyg1-14-a02"></a>
#### CYG1-14-A02 Enriquesの有限位数
- Level: A

Enriques曲面 $S$ について $K_S\not\simeq\mathcal O_S$、$K_S^{\otimes2}\simeq\mathcal O_S$、$c_1(S)_{\mathbb Z}\ne0$ を既知とする。$c_1(S)_{\mathbb R}$ と $H^0(S,K_S)$ を求めよ。

<!-- solution-start -->
**詳細解答。** [有限位数線束の第一Chern類](../CYG1-03/index.md#prop-cyg1-03-torsion-chern)で $L=K_S$、$m=2$ とすると $2c_1(K_S)_{\mathbb Z}=0$。$c_1(S)=-c_1(K_S)$ なので $2c_1(S)_{\mathbb Z}=0$。実ベクトル空間では $2a=0$ なら $a=0$ だから $c_1(S)_{\mathbb R}=0$。

もし $0\ne\Omega\in H^0(S,K_S)$ があれば、$\Omega$ の零因子の有無に注意する。Enriquesでは $K_S^{\otimes2}$ が自明で、$\Omega^{\otimes2}$ はその大域正則切断である。

自明線束の大域切断に対応するコンパクト連結 $S$ 上の正則関数は定数である。その二乗の切断が零でない以上、この定数は非零であり、元の $\Omega$ はどこでも非零となる。

すると[標準束の自明化判定](../CYG1-02/index.md#prop-cyg1-02-volume-trivialization)で $K_S$ は自明となり矛盾する。従って $H^0(S,K_S)=0$。単に「非自明線束に切断はない」とする論法は一般には誤りである。
<!-- solution-end -->

<a id="ex-cyg1-14-a03"></a>
#### CYG1-14-A03 トーラスの全ホロノミー
- Level: A

複素次元3のトーラス $T=\mathbb C^3/\Lambda$ に標準平坦Kähler計量を入れる。全ホロノミーを求め、$SU(3)$ との包含関係を判定せよ。

<!-- solution-start -->
**詳細解答。** 被覆 $\mathbb C^3$ の標準平坦座標ではChristoffel記号がすべて零で、定数ベクトル場は平行である。格子による同一視 $z\mapsto z+\lambda$ の微分は恒等写像なので、商を一周しても平行枠は変わらない。[トーラスの平坦ホロノミー](../CYG1-04/index.md#prop-cyg1-04-flat-holonomy)から

$$
\operatorname{Hol}(g)=\{I_3\}\subsetneq SU(3).
$$

真の包含なのは $SU(3)$ に単位行列以外、例えば $\operatorname{diag}(e^{it},e^{-it},1)$（$0<t<\pi$）が含まれるためである。
<!-- solution-end -->

<a id="ex-cyg1-14-a04"></a>
#### CYG1-14-A04 quinticの二経路のEuler検算
- Level: A

滑らかな五次超曲面 $X\subset\mathbb P^4$ について $c_3(TX)=-40H^3$、$\int_XH^3=5$、$h^{1,1}=1$、$h^{2,1}=101$、$h^{1,0}=h^{2,0}=0$、$K_X\simeq\mathcal O_X$ が与えられている。Euler標数をChern類とHodge数の二通りで求めよ。

<!-- solution-start -->
**詳細解答。** [Chern–Gauss–Bonnetの入力](../CYG1-07/index.md#thm-cyg1-07-gauss-bonnet)を複素三次元 $X$ へ適用すると、トップChern類は三次で

$$
\chi_{\mathrm{top}}(X)=\int_Xc_3(TX)=-40\int_XH^3=-40\cdot5=-200.
$$

一方、[三次元のEuler標数とHodge数の関係](#prop-cyg1-14-euler-hodge)の仮定が全て与えられているので

$$
\chi_{\mathrm{top}}(X)=2(h^{1,1}-h^{2,1})=2(1-101)=-200.
$$

両者は一致する。$h^{1,0}=h^{2,0}=0$ や次元3を外して同じ式を適用してはならない。
<!-- solution-end -->

<a id="ex-cyg1-14-b01"></a>
#### CYG1-14-B01 誤った含意を直す
- Level: B

「$c_1(X)_{\mathbb R}=0$ なら $c_1(X)_{\mathbb Z}=0$、したがって $K_X$ は自明で、任意の計量について $\operatorname{Hol}(g)=SU(n)$」という主張を、仮定を一つずつ点検して修正せよ。$X$ は連結コンパクトKählerとする。

<!-- solution-start -->
**詳細解答。** 第1の矢印は[Enriquesの2-torsion](../CYG1-03/index.md#prop-cyg1-03-enriques-chern)で否定される。実係数化はtorsionを消すから $c_1(X)_{\mathbb R}=0$ であっても整係数の類は非零であり得る。第2の矢印も一般の正則線束については整係数第一Chern類が零だけでは正則な大域枠を保証しない（[平坦線束の例](../CYG1-03/index.md#prop-cyg1-03-elliptic-flat-line)）。この例が標準束そのものの反例と主張してはならない。

$c_1(X)_{\mathbb R}=0$ から正しく言えるのは[Yauの存在定理](../CYG1-10/index.md#cor-cyg1-10-ricci-flat)による各Kähler類での**Ricci平坦計量の存在**である。その計量 $g'$ では[制限Holの包含](../CYG1-11/index.md#prop-cyg1-11-determinant)があるが、全Holについて $SU(n)$ への包含を得るにはさらに $K_X$ の自明性が必要である。仮にその条件を課しても、トーラスの自明ホロノミーが示すように等号は一般には成り立たない。元の任意の $g$ のHolに対する結論もない。
<!-- solution-end -->

<a id="ex-cyg1-14-b02"></a>
#### CYG1-14-B02 三次元トーラスで公式の仮定を試す
- Level: B

複素三次元トーラス $T=\mathbb C^3/\Lambda$ のHodge数を $h^{p,q}=\binom3p\binom3q$ とする。$b_1,b_2,b_3$ とEuler標数を求め、$2(h^{1,1}-h^{2,1})$ との比較から、前節の命題のどの仮定を外したら何が壊れるか説明せよ。

<!-- solution-start -->
**詳細解答。** Hodge分解の $p+q=k$ を用いて

$$
\begin{aligned}
b_1&=h^{1,0}+h^{0,1}=3+3=6,\\
b_2&=h^{2,0}+h^{1,1}+h^{0,2}=3+9+3=15,\\
b_3&=h^{3,0}+h^{2,1}+h^{1,2}+h^{0,3}=1+9+9+1=20.
\end{aligned}
$$

Poincaré双対で $b_4=15,b_5=6,b_6=1$ だから

$$
\chi_{\mathrm{top}}(T)=1-6+15-20+15-6+1=0.
$$

一方 $h^{1,1}=9$、$h^{2,1}=9$ なので $2(9-9)=0$ も数値として一致する。しかしこの一致を[三次元のEuler標数とHodge数の関係](#prop-cyg1-14-euler-hodge)からの帰結として説明してはいけない。この命題は $h^{1,0}=h^{2,0}=0$ を仮定するが、トーラスではともに3である。

実際、追加項を消さずに交代和を計算すると $\chi_{\mathrm{top}}=2(h^{1,1}-h^{2,1})+4(h^{2,0}-h^{1,0})$ となる。このトーラスでは最後の括弧が $3-3=0$ だから同じ式の値になるのであって、証明中の $b_1=0$、$b_2=h^{1,1}$ が成り立つわけではない。
<!-- solution-end -->

<a id="ex-cyg1-14-b03"></a>
#### CYG1-14-B03 位相群の作用と商の未解決部分
- Level: B

$F_\psi=\sum_{i=0}^4z_i^5-5\psi\prod_i z_i$、$\mu_5=\{\zeta:\zeta^5=1\}$ とする。$G=\{(\zeta_i)\in\mu_5^5:\prod_i\zeta_i=1\}/\mu_5^{\mathrm{diag}}$ の位数を求め、$F_\psi$ を不変にすることを示せ。これだけで商のHodge数が求まらない理由も述べよ。

<!-- solution-start -->
**詳細解答。** $\zeta_0,\ldots,\zeta_3$ は自由に $5^4$ 通り、$\zeta_4=(\prod_{i=0}^3\zeta_i)^{-1}$ は一意である。射影空間で自明に作用する対角部分群は五元あるから $|G|=5^4/5=125$。各 $\zeta_i^5=1$ なので $(\zeta_i z_i)^5=z_i^5$、また $\prod_i\zeta_i=1$ なので $\prod_i(\zeta_i z_i)=\prod_i z_i$。よって $F_\psi$ の全項が不変となる。

ただし商写像の群作用には固定点があり得る。元の $X_\psi$ が $\psi^5\ne1$ で滑らかでも、商 $X_\psi/G$ は一般に特異になる。滑らかなmirror候補のHodge数を得るには商の特異点と解消で変化するコホモロジーを調べる追加理論が必要であり、位数125はその代用にならない。
<!-- solution-end -->

<a id="ex-cyg1-14-b04"></a>
#### CYG1-14-B04 101方向と1方向は何が異なるか
- Level: B

滑らかなquintic $X$ で $h^{2,1}=101$、$h^{1,1}=1$ とする。$H^1(X,T_X)$、Kähler錐、複素化Kählerパラメータの三つが何を動かすか説明し、mirror symmetryの数値交換の主張が無障害性や曲線数の一致を自動的に与えるか判定せよ。

<!-- solution-start -->
**詳細解答。** [一次変形空間とHodge群の同型](../CYG1-12/index.md#thm-cyg1-12-first-order-hodge)によって $H^1(X,T_X)\simeq H^{2,1}(X)$ であり、これは**複素構造を動かす接方向**101個を数える。無限小方向が全て有限の変形へ延長できるという無障害性は、別の定理を要する。

[Kähler錐の正半直線](../CYG1-13/index.md#prop-cyg1-13-kahler-ray)では、複素構造を固定した正の実 $(1,1)$ 類は $tH$（$t>0$）という1実方向である。[複素化Kählerパラメータの定義](../CYG1-13/index.md#def-cyg1-13-complexified-kahler)では追加の実の $B$ 場方向を合わせて複素量を作るが、これを複素構造の101個の係数方向と同一視しない。

数値交換は $h^{1,1}(Y)=101$、$h^{2,1}(Y)=1$ のように**次元の候補**を示すだけで、変形の延長、モジュライの滑らかさ、周期対応、曲線数の一致は論理的には従わない。
<!-- solution-end -->

<a id="ex-cyg1-14-c01"></a>
#### CYG1-14-C01 五つの幾何を一枚の判定で比較する
- Level: C

次の五つの滑らかな連結コンパクトKähler多様体を考える。

1. $E\subset\mathbb P^2$：滑らかな三次曲線。
2. $S\subset\mathbb P^3$：滑らかな四次K3曲面。
3. $Q\subset\mathbb P^4$：滑らかな五次三次元多様体。
4. $T=\mathbb C^2/\Lambda$：平坦な複素二次元トーラス。
5. $N$：Enriques曲面。

$N$ では $K_N$ が非自明で二乗は自明、整係数第一Chern類が非零の位数2であることを既知とする。

それぞれの標準束の自明性、実係数第一Chern類、Ricci平坦計量の存在、全Holの $SU(n)$ 包含の可否を判定せよ。さらに $Q$ の $h^{1,1}=1,h^{2,1}=101$ からEuler標数を求め、二つの数を交換した三次元候補の値を述べよ。

<!-- solution-start -->
**詳細解答。** まず[随伴公式](../CYG1-02/index.md#thm-cyg1-02-hypersurface-degree)に各 $(d,m)$ を入れると

$$
K_E\simeq\mathcal O_E(3-2-1)=\mathcal O_E,\quad
K_S\simeq\mathcal O_S(4-3-1)=\mathcal O_S,\quad
K_Q\simeq\mathcal O_Q(5-4-1)=\mathcal O_Q.
$$

複素トーラス $T$ は $dz^1\wedge dz^2$ が格子商へ降りるので $K_T$ 自明。一方 $K_N$ は仮定から非自明である。前四者は $c_1(\cdot)_{\mathbb Z}=0$、従って実係数でも零。$N$ は位数2なので、実係数化すると零となる。よって**五つとも**実係数第一Chern類は零である。

各対象はコンパクトKählerなので[Yauの存在定理](../CYG1-10/index.md#cor-cyg1-10-ricci-flat)からRicci平坦計量が存在する。

正則標準束が自明な $E,S,Q,T$ では、そのRicci平坦計量について[全Holの包含](../CYG1-11/index.md#cor-cyg1-11-canonical-full)が成立する。$T$ の平坦計量ではさらに全Holは自明である。

$N$ では全Holが $SU(2)$ に入れば同じ同値定理により $K_N$ 自明となり矛盾する。なお $E$ は複素次元1で $SU(1)=\{1\}$、$S,T,N$ は次元2、$Q$ は次元3の群を使う。

最後に $Q$ で $h^{1,0}=h^{2,0}=0$ を[quinticのHodge計算](../CYG1-08/index.md#prop-cyg1-08-hodge-diamond)から確認し、[三次元のEuler標数とHodge数の関係](#prop-cyg1-14-euler-hodge)に代入して

$$
\chi_{\mathrm{top}}(Q)=2(1-101)=-200.
$$

交換する候補では $(h^{1,1},h^{2,1})=(101,1)$、同じ仮定を満たせば $\chi_{\mathrm{top}}=2(101-1)=+200$。これは候補の数値整合性であり、幾何的存在の証明ではない。
<!-- solution-end -->

<a id="ex-cyg1-14-c02"></a>
#### CYG1-14-C02 「数字が一致したからmirror」の偽証明
- Level: C

次の「証明」を検査せよ。「quinticでは $h^{2,1}=101$、$h^{1,1}=1$ である。Fermat型族のパラメータは $\psi$ の1個であり、位相群 $G$ の位数は125である。だから商は滑らかで $h^{2,1}=1$、$h^{1,1}=101$ となり、これがmirrorである。さらにEuler標数は $+200$ で、すべての曲線数も対応する。」成立する部分を中間計算で確かめ、残る各飛躍に何の追加理論が必要か述べよ。

<!-- solution-start -->
**詳細解答。** 成立している数値の出発点は[quinticのHodge計算](../CYG1-08/index.md#prop-cyg1-08-hodge-diamond)であり、$(1,101)$。位相群については積1の五乗根が $5^4$ 個、射影的に同じ対角群が5個なので $|G|=5^3=125$ と再計算できる。$\psi$ の1個は族の**選んだ一方向**であり、[全一次変形が101次元である定理](../CYG1-13/index.md#thm-cyg1-13-all-first-order)と矛盾しない。

しかし「商が滑らか」は、群作用の固定点を検査していないので不当である。滑らかなmirrorを得るには商特異点とその適切な解消を調べる必要がある。また商のHodge数は、元の101方向や群の位数だけで決まらず、不変部分と特異点解消の寄与を含むコホモロジー計算を要する。そこで初めて外部のmirror構成により $(101,1)$ を知る。

**仮に**滑らかな三次元候補が $K$ 自明かつ $h^{1,0}=h^{2,0}=0$ でHodge数 $(101,1)$ を持つと確認されたなら、[交換のEuler公式](#prop-cyg1-14-mirror-euler)から

$$
\chi_{\mathrm{top}}=2(101-1)=200
$$

は条件付きで正しい。逆にEuler標数やHodge数だけからmirror関係は確定しない。最後の「全ての曲線数が対応」は、周期・量子コホモロジー・Gromov–Witten不変量などを結ぶ別の深い理論に関わり、この章の数値検算からは全く従わない。
<!-- solution-end -->

## 7. 次に進むための読み方

本講義群で手計算できたのは、超曲面の滑らかさと標準束、Chern数・Hodge数、Ricci平坦**存在定理の条件と帰結**、ホロノミーの包含、一階の変形空間の計算である。quinticの $(1,101)$ を $(101,1)$ へ交換する数値予測は、この蓄積の上に自然に立つ。

そこから先には少なくとも三つの独立した問いがある。

1. 群商とその特異点解消をどう構成し、Hodge数を実際に数えるか。
2. 正則体積形式の周期積分が複素構造の変化をどう記述するか。
3. Kähler方向の量子補正・曲線数え上げと、周期の方程式をどう対応させるか。

これらを証明して初めて、単なる二数の交換から豊かなmirror symmetryへ進む。まずは本章の判定表に戻り、どの矢印を証明し、どの存在定理を外部入力として使い、どの等式を**まだ仮定しているか**を自分で区別できることが、次の学習への出発点になる。
