# BHI8 Page時刻の模型依存推定

<!-- definition-example-audit: strict -->

## 1. 山型の基準を「物理時刻」に置くには

[BHI7の次元包絡線](../BHI7/index.md#def-bhi7-page-envelope)は、放射と残存系の有効次元が逆転する付近で山型になります。しかし、その講義の時点別Haar比較では物理時計を使っていません。何秒後に折り返すかを議論するには、まず質量の減少から時刻を定め、二種類のエントロピーの増減を別々に計算する必要があります。

すでに[BHI4の準静的質量分率と時間の定理](../BHI4/index.md#thm-bhi4-fraction-time)から、Schwarzschild型ブラックホールの質量分率と遠方時計が結び付くことを知っています。また、[BHI5の粗視化と精細エントロピーの階層](../BHI5/index.md#prop-bhi5-entropy-hierarchy)により、放射モードを熱的に数えた値と、放射全体の量子状態のエントロピーは一般には一致しません。

本講では**粗視化した放射のエントロピーと残存側の面積エントロピーの交点**を「Page時刻の収支推定」として定め、その求め方と模型依存性を証明します。実際の放射の精細エントロピーがその時刻に極大を取る、という主張にはさらに独立の仮定が要ります。

全節で、四次元・漸近平坦・非回転・非荷電のSchwarzschild型を瞬間静的に近似し、計量符号は $(-,+,+,+)$、自然単位は $G=\hbar=c=k_B=1$ とします。遠方時計を $u$、開始時刻を $u_0$、初期質量を $M_0>0$、質量を $M(u)>0$ とします。対数は自然対数、エントロピーは nat です。正の停止質量 $M_{\rm cut}<M_0$ を先に固定し、準静的近似をその質量以下へ無条件に延長しません。

## 2. 放射の粗視化エントロピーを質量に結び付ける

[BHT9のSchwarzschild面積エントロピー](../../BHT/BHT9/index.md#prop-bht9-schwarzschild-entropy)を瞬間静的近似で評価すると、

$$
S_{\rm BH}(M)=4\pi M^2,
\qquad
\frac{dS_{\rm BH}}{du}=8\pi M(u)\frac{dM}{du}.
$$

[BHI4のエネルギー収支模型](../BHI4/index.md#def-bhi4-energy-ledger)の下で $dM/du=-L(M)<0$ なら、面積エントロピーの減少率は $-dS_{\rm BH}/du=8\pi M L(M)>0$ です。しかし、この値だけから放射の**粗視化**エントロピー生成率は定まりません。放射のモード構成、透過率、粒子種、粗視化の規則が別途必要です。

そこで、生成率の無次元比を $\beta(M)>0$ と表すことにします。分子は放射の粗視化エントロピーの増加率、分母は面積エントロピーの減少率であり、温度の逆数や量子状態の純粋性そのものではありません。

<a id="def-bhi8-entropy-ledger"></a>

<!-- formal-statement-start -->
> **定義（放射エントロピー生成率の収支模型）**
>
> $M_0>M_{\rm cut}>0$ とし、質量軌道 $M:[u_0,u_{\rm cut}]\to[M_{\rm cut},M_0]$ は連続微分可能、$M(u_0)=M_0$、$M(u_{\rm cut})=M_{\rm cut}$、$dM/du<0$ とする。$\beta:[M_{\rm cut},M_0]\to(0,\infty)$ を連続とする。
>
> 初期放射の粗視化エントロピーを零と規格化し、放射の累積粗視化エントロピー $S_{\rm rad}^{\rm coarse}(u)$ を
>
> $$
> S_{\rm rad}^{\rm coarse}(u_0)=0,\qquad
> \frac{dS_{\rm rad}^{\rm coarse}}{du}
> =\beta(M(u))\left(-\frac{dS_{\rm BH}}{du}\right)
> $$
>
> > を満たす量として定める。この式は追加の放射模型の仮定であって、純粋蒸発のユニタリ性から導かれた等式ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi8-entropy-ledger -->
**定義の確認（理想黒体の特別な模型）**：$M_0=10$、$M_{\rm cut}=5$、$C>0$ として $dM/du=-C/M^2$ を使い、$\beta(M)=4/3$ を一定とします。$M^3=M_0^3-3C(u-u_0)$ なので $M$ は指定区間で微分可能、$M$ が5まで減る間は負の導関数を持ちます。$\beta$ は正の連続関数です。[BHI4の理想黒体に限った粗視化計算](../BHI4/index.md#prop-bhi4-horizon-entropy-rate)の後に示した $\dot S_{\rm rad}^{\rm coarse}=(4/3)(-\dot S_{\rm BH})$ をこの特例として採用すると、

$$
S_{\rm rad}^{\rm coarse}(M)
=\frac43\left(4\pi M_0^2-4\pi M^2\right),
\qquad
S_{\rm rad}^{\rm coarse}(M_0)=0.
$$

さらに時間微分すると

$$
\frac{dS_{\rm rad}^{\rm coarse}}{du}
=-\frac{32\pi}{3}M\frac{dM}{du}
=\frac43\left(-8\pi M\frac{dM}{du}\right)>0.
$$

初期条件・正値性・微分方程式をそれぞれ直接確認できました。$4/3$ は**この理想黒体の輸送模型**の係数で、現実の灰色体放射の普遍定数ではありません。
<!-- definition-example-end -->

質量 $m=M(u)$ を時刻の代わりに使うと、$dS_{\rm BH}/dm=8\pi m$ なので、連鎖律と積分の向きから

$$
\frac{dS_{\rm rad}^{\rm coarse}}{dm}
=\frac{(dS_{\rm rad}^{\rm coarse}/du)}{dM/du}
=-8\pi m\beta(m),
\qquad
S_{\rm rad}^{\rm coarse}(m)
=\int_m^{M_0}8\pi x\beta(x)\,dx.
$$

分母 $dM/du$ が零でないことには、定義で仮定した厳密減少を使いました。積分の向きを逆にしたため、放射のエントロピーは $m$ が減るにつれて増えます。この式では灰色体効果や種数の影響は、入力関数 $\beta$ に残っています。

## 3. 交点を定義し、一定係数なら解き切る

物理的な時間上の交点が存在するかどうかは、計算して確かめる必要があります。残存側の $S_{\rm BH}$ は減少し、累積粗視化放射の $S_{\rm rad}^{\rm coarse}$ は増加するので、両者が実際に会えば位置は一意になりそうです。まずその交点を名前で固定します。

<a id="def-bhi8-balance-time"></a>

<!-- formal-statement-start -->
> **定義（Page時刻のエントロピー収支推定）**
>
> [放射エントロピー生成率の収支模型](#def-bhi8-entropy-ledger)で、$u_{\rm P}\in[u_0,u_{\rm cut}]$ が
>
> $$
> S_{\rm rad}^{\rm coarse}(u_{\rm P})
> =S_{\rm BH}(M(u_{\rm P}))
> $$
>
> > を満たすとき、その時刻を **Page時刻の収支推定値**、対応する $M_{\rm P}=M(u_{\rm P})$ を**収支交点質量**と呼ぶ。区間内に交点がなければ推定値は未定義とする。「真の精細エントロピーの極大時刻」を定義したものではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi8-balance-time -->
**定義の確認**：第2節の $\beta=4/3$ の模型で $m=M_0\sqrt{4/7}$ を代入すると、

$$
S_{\rm BH}(m)=4\pi M_0^2\frac47,\qquad
S_{\rm rad}^{\rm coarse}(m)
=\frac43\,4\pi M_0^2\left(1-\frac47\right)
=4\pi M_0^2\frac47.
$$

両辺が一致します。また $\sqrt{4/7}\simeq0.75593>1/2=M_{\rm cut}/M_0$ なので、$M_0=10,M_{\rm cut}=5$ の**実際の指定区間内**に交点があります。初期時刻では粗視化放射が0、残存面積エントロピーが $4\pi M_0^2>0$ です。交点を数式で満たすことと、近似を使える区間内にあることを別々に確認しました。
<!-- definition-example-end -->

次に、[BHI4の質量三乗則](../BHI4/index.md#thm-bhi4-fraction-time)の係数 $C>0$ と生成率比 $\beta>0$ を**ともに一定**とします。$\tau_{\rm formal}=M_0^3/(3C)$ は、質量零への形式外挿で得た時計であり、実際の蒸発寿命と断定しません。

<a id="thm-bhi8-constant-page-time"></a>

<!-- formal-statement-start -->
> **定理（一定生成率比と逆二乗光度のPage収支推定）**
>
> $M_0>M_{\rm cut}>0$、$C,\beta>0$ とする。$M(u_0)=M_0$、$dM/du=-C/M^2$ が $M_{\rm cut}$ に到達するまで成り立ち、[放射エントロピー生成率の収支模型](#def-bhi8-entropy-ledger)で $\beta(M)=\beta$ とする。次の質量と形式時刻比を定める。
>
> $$
> f_{\rm P}:=\sqrt{\frac{\beta}{1+\beta}},\qquad
> \theta_{\rm P}:=1-\left(\frac{\beta}{1+\beta}\right)^{3/2}.
> $$
>
> > この区間内に[収支交点](#def-bhi8-balance-time)が存在する必要十分条件は $M_{\rm cut}\le M_0f_{\rm P}$ である。存在するとき交点は一意で、
>
> $$
> M_{\rm P}=M_0f_{\rm P},\qquad
> u_{\rm P}-u_0=\frac{M_0^3}{3C}\theta_{\rm P},\qquad
> S_{\rm BH}(M_{\rm P})=\frac{\beta}{1+\beta}S_{\rm BH}(M_0).
> $$
<!-- formal-statement-end -->

### 証明の見取り図

熱的なエントロピーを直接時計へ置き換えず、まず質量 $m$ だけで交点を解きます。その後、既習の質量三乗則へ交点質量を代入します。停止質量が交点より大きい場合には式が形式解を与えても、定義された時刻区間には入らないことに注意します。

<!-- proof-start -->
### 証明

$S_0:=4\pi M_0^2>0$、$f:=m/M_0$ と置きます。第2節の積分は $\beta$ が一定なので

$$
S_{\rm rad}^{\rm coarse}(m)
=\int_m^{M_0}8\pi x\beta\,dx
=4\pi\beta(M_0^2-m^2)
=\beta S_0(1-f^2).
$$

一方、面積エントロピーは $S_{\rm BH}(m)=S_0f^2$ です。従って交点方程式を $S_0>0$ で割ると

$$
\beta(1-f^2)=f^2
\ \Longleftrightarrow\
\beta=(1+\beta)f^2
\ \Longleftrightarrow\
f^2=\frac{\beta}{1+\beta}.
$$

正の質量しか扱わないので $f=f_{\rm P}>0$ の根だけが許され、しかも $f_{\rm P}<1$ です。質量は $M_0$ から $M_{\rm cut}$ まで厳密に減るため、根が区間内にあることと $M_{\rm cut}\le M_0f_{\rm P}$ は同値です。根は正の範囲で一つなので、交点も一意です。

最後に[BHI4の分率と経過時刻の定理](../BHI4/index.md#thm-bhi4-fraction-time)を、同じ初期質量・同じ $C$・同じ遠方時計・同じ区間に適用すると、

$$
\frac{u_{\rm P}-u_0}{\tau_{\rm formal}}
=1-\left(\frac{M_{\rm P}}{M_0}\right)^3
=1-\left(\frac{\beta}{1+\beta}\right)^{3/2}.
$$

また $S_{\rm BH}(M_{\rm P})/S_0=f_{\rm P}^2$ は上で求めた $\beta/(1+\beta)$ です。以上で全ての式を得ました。
<!-- proof-end -->

### 3.1 三つの生成率を比較する

次の数値は**入力を明示した模型の計算結果**です。$\beta=4/3$ は第2節の理想黒体、$\beta=1$ および $\beta=2$ は係数の感度を調べる仮想模型です。最後の $\beta=1.48$ も説明用の仮入力であり、特定の現実的な粒子種・灰色体係数を計算した値ではありません。

| 生成率比 $\beta$ | $S_{\rm BH}(M_{\rm P})/S_0$ | $M_{\rm P}/M_0$ | $(u_{\rm P}-u_0)/\tau_{\rm formal}$ |
|---:|---:|---:|---:|
| $1$ | $1/2$ | $0.707107$ | $0.646447$ |
| $4/3$ | $4/7$ | $0.755929$ | $0.568041$ |
| $1.48$（仮入力） | $0.596774$ | $0.772512$ | $0.538985$ |
| $2$ | $2/3$ | $0.816497$ | $0.455669$ |

理想黒体の行ですら、交点は「形式蒸発時間の半分」ではなく約 $0.568$ です。また、$S_{\rm BH}$ が初期値の半分となる質量と、初期**質量**が半分となる時刻は別です。後者は[BHI4の半質量時刻](../BHI4/index.md#thm-bhi4-fraction-time)により $\theta=7/8$ です。

## 4. 生成率と光度が質量依存するとき

粒子種のしきい値や灰色体透過率の変化があると、係数を一定に保てません。ただし質量を変数にした積分を使えば、交点の存在・一意性を**係数の詳細を知らないまま**判定できます。光度は $L(m)=C(m)/m^2$、生成率比は $\beta(m)$ と置き、両関数を正の連続関数と仮定します。

<a id="prop-bhi8-variable-crossing"></a>

<!-- formal-statement-start -->
> **命題（質量依存生成率の交点判定と時間積分）**
>
> $M_0>M_{\rm cut}>0$ とし、$C,\beta:[M_{\rm cut},M_0]\to(0,\infty)$ は連続とする。初期質量 $M_0$ から停止質量 $M_{\rm cut}$ まで $dM/du=-C(M)/M^2$ に従う微分可能な解を考え、[放射エントロピー生成率の収支模型](#def-bhi8-entropy-ledger)を採用する。関数
>
> $$
> F(m):=\int_m^{M_0}8\pi x\beta(x)\,dx-4\pi m^2
> $$
>
> > を定める。このとき区間 $[M_{\rm cut},M_0]$ に収支交点が存在する必要十分条件は $F(M_{\rm cut})\ge0$ であり、存在するとき一意である。唯一の零点 $M_{\rm P}$ に対応する時間は
>
> $$
> u_{\rm P}-u_0=\int_{M_{\rm P}}^{M_0}\frac{x^2}{C(x)}\,dx.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

交点があるかどうかは「放射累積値 − 残存値」の符号で決まります。単調性は $F$ を**質量で**微分して調べ、時間については質量の微分方程式を逆向きに積分します。ここでは一様な生成率を仮定しません。

<!-- proof-start -->
### 証明

$\beta$ の連続性と積分の基本定理から $F$ は連続微分可能で、

$$
F'(m)=-8\pi m\beta(m)-8\pi m
=-8\pi m(1+\beta(m))<0
$$

です。最後の不等号は $m\ge M_{\rm cut}>0$ と $\beta(m)>0$ に依存します。初期点では $F(M_0)=-4\pi M_0^2<0$ です。$m$ を $M_0$ から $M_{\rm cut}$ へ**減らす**と $F$ は厳密増加するので、中間値の定理と厳密単調性より、零点があることと $F(M_{\rm cut})\ge0$ が同値で、零点は高々一つです。

また $dM/du=-C(M)/M^2<0$ なので各正質量で逆関数があり、

$$
\frac{du}{dM}=-\frac{M^2}{C(M)},\qquad
u_{\rm P}-u_0
=\int_{M_0}^{M_{\rm P}}\left(-\frac{x^2}{C(x)}\right)\,dx
=\int_{M_{\rm P}}^{M_0}\frac{x^2}{C(x)}\,dx.
$$

これは[BHI4の質量依存光度係数の積分公式](../BHI4/index.md#prop-bhi4-variable-coefficient)と一致します。証明終わり。
<!-- proof-end -->

### 4.1 係数の上下界から交点時刻を挟む

光度を一定係数 $C(m)=C_0>0$ に固定し、既知の定数 $0<\beta_-\le\beta(m)\le\beta_+$ を満たすとします。任意の質量 $m$ について

$$
\beta_-(S_0-4\pi m^2)
\le S_{\rm rad}^{\rm coarse}(m)
\le\beta_+(S_0-4\pi m^2)
$$

です。定数比の交点質量を $m_\pm=M_0\sqrt{\beta_\pm/(1+\beta_\pm)}$ と書き、**両方が停止質量以上**なら、第4節の単調性から

$$
m_-\le M_{\rm P}\le m_+,\qquad
1-\left(\frac{\beta_+}{1+\beta_+}\right)^{3/2}
\le\frac{u_{\rm P}-u_0}{\tau_{\rm formal}}
\le1-\left(\frac{\beta_-}{1+\beta_-}\right)^{3/2}.
$$

確認のため、$m_-$ で実際の放射累積は $\beta_-$ の一定模型以上なので $F(m_-)\ge0$、$m_+$ では $\beta_+$ の一定模型以下なので $F(m_+)\le0$ です。$F$ は質量に関して厳密減少するため、零点は両者の間です。時間積分の下端が大きいほど経過時間が短いので、時間の不等号は質量とは逆向きになります。

係数を $C(m)$ に変えた場合も**交点質量は $\beta(m)$ だけで決まり**、交点時刻は第4節の積分を通じて $C(m)$ に依存します。つまり、生成率と光度は互いに異なる二つの模型入力です。

## 5. どこに「Page曲線」の物理仮定が入るか

ここまで導いたのは、いずれも正の粗視化エントロピー生成率に関する収支推定です。[BHI6の純粋二部系のエントロピー上界](../BHI6/index.md#thm-bhi6-entropy-budget)から分かる厳密な関係は

$$
S(R)=S(B)\le\min\{\ln d_R,\ln d_B\}
$$

であって、$S(R)=\min\{S_{\rm rad}^{\rm coarse},S_{\rm BH}\}$ ではありません。[BHI7の時点別Page平均](../BHI7/index.md#prop-bhi7-mean-bounds)を蒸発へ翻訳するには、少なくとも次を**追加の物理仮定**として検討する必要があります。

1. 外部に未観測の純粋化系が残らず、放射 $R$ と残存側 $B$ の全体を近似的に純粋な二部系として扱えること。
2. 放射の有効Hilbert空間次元の対数を粗視化放射エントロピーで、残存側の有効次元の対数を面積エントロピーで近似できること。
3. 各時点の実際の状態が、適切なランダム状態の典型的エントロピーに近いこと。異なる時点を結ぶ力学についても別に整合性を要すること。
4. 準静的区間で正の光度と粗視化エントロピー生成率を定義でき、交点が停止質量より前に来ること。

これらを**すべて仮定したときに限り**、次元包絡線に対応する比較用の模式式

$$
S_{\rm fine}^{\rm Page\ benchmark}(u)
\ \approx\ \min\{S_{\rm rad}^{\rm coarse}(u),S_{\rm BH}(M(u))\}
$$

が得られ、その二枝が等しくなる時刻として本講の交点が現れます。記号 $\approx$ は数値を保証した誤差評価ではなく、典型性・有効次元同定を置いた**模型の目安**です。面積エントロピーがHilbert空間次元の対数に等しいことも、この講義で厳密に導いたものではありません。

### 5.1 交点が存在しない模型と、交点があっても精細曲線が違う模型

**停止質量の反例**：$\beta=4/3$、$M_{\rm cut}=0.9M_0$ を取ります。$S_{\rm rad}^{\rm coarse}(M_{\rm cut})/S_0=(4/3)(1-0.9^2)=0.253333\ldots$ に対し、$S_{\rm BH}(M_{\rm cut})/S_0=0.81$ です。従って $F(M_{\rm cut})<0$ で、定理の形式的な交点は停止質量より小さく、**扱う時刻区間にはPage時刻がありません**。失ったのは「交点まで準静的模型を適用できる」という条件であり、代数計算ではありません。

**精細曲線の反例**：[BHI7の積状態とBell対の逐次放出模型](../BHI7/index.md#prop-bhi7-history-nonuniqueness)は、同じ次元系列と純粋な等長発展でも異なる $S(R_k)$ を示しました。今回も $M(u)$ や $\beta(M)$ で粗視化の帳簿を指定しただけでは、放射密度行列の全体相関は指定できません。ここで失われるのは「各時点で典型的なエンタングルメントを持つ」という仮定です。従って収支交点があることは、実際の精細曲線に同じ位置の極大があることの証明ではありません。

### 5.2 放出種・灰色体係数・近似の終端

[BHI4の光度の灰色体積分](../BHI4/index.md#def-bhi4-energy-ledger)では、放出種や透過率は光度の係数 $C(M)$ に入ります。熱的エントロピー流束も同じ透過率・分布を用いて別途積分しなければ、$\beta(M)$ は求まりません。放出種を増やすと $C$ が増える場合は形式時間が短縮されますが、**同時に $\beta$ がどう変わるか**を確認せず、交点の時間比まで同じだと断定できません。

放射が含む粒子が質量を持つ場合、質量とHawking温度の比が変わるので、一定係数の仮定自体が破れ得ます。蒸発の最終段階では瞬間Schwarzschild近似・半古典的放射・単純な放射領域の分割のいずれも検査が必要です。近似が停止する前に交点が来なければ、この講義の推定から後続時間を予測することはできません。

## 6. 参照計算：解析交点と数値的な符号変化を確かめる

下のPythonは**指定した仮想係数**から交点と二枝を計算する参照実装です。最初に $M_0=100,C=10^{-3}$ と置き、$\beta=1,4/3,2$ の解析比を表示します。続いて $\beta(m)=1+(m/M_0)^2$ という質量依存の例で、解析的に得る零点と数値の符号を比較します。描画環境があれば、同じ計算式から二枝のグラフも描きます。乱数、灰色体スペクトルの数値積分、実際の時空発展は用いていません。

    from math import pi, sqrt
    M0, C = 100.0, 1e-3
    tau = M0**3 / (3*C)

    for beta in (1.0, 4.0/3.0, 2.0):
        f = sqrt(beta/(1+beta))
        theta = 1-f**3
        rad = beta*(1-f*f)
        bh = f*f
        assert abs(rad-bh) < 1e-12
        print("beta, f_Page, theta_Page =", beta, f, theta)

    def branch_values(f):
        # beta(m) = 1 + (m/M0)^2
        # S_rad^coarse/S0 = (1-f^2) + (1-f^4)/2
        return 1.5-f*f-0.5*f**4, f*f

    f_exact = sqrt(sqrt(7)-2)
    srad, sbh = branch_values(f_exact)
    assert abs(srad-sbh) < 1e-12
    for f in (0.85, f_exact, 0.75):
        rad, bh = branch_values(f)
        theta = 1-f**3  # constant C only
        print("f, theta, rad/S0, BH/S0 =", f, theta, rad, bh)
    try:
        import matplotlib.pyplot as plt
    except ImportError:
        print("matplotlib is unavailable; numerical checks above are complete")
    else:
        fs = [1.0 - 0.3*j/100 for j in range(101)]
        ts = [(1-f**3) for f in fs]
        rads = [branch_values(f)[0] for f in fs]
        bhs = [branch_values(f)[1] for f in fs]
        plt.plot(ts, rads, label="radiation coarse", linestyle="-")
        plt.plot(ts, bhs, label="remaining BH", linestyle="--")
        plt.axvline(1-f_exact**3, label="balance crossing", linestyle=":")
        plt.xlabel("(u-u0)/tau_formal")
        plt.ylabel("entropy / S0")
        plt.legend()
        plt.show()

グラフの横軸は $u$ ではなく一定 $C$ による無次元時間です。交点の目視と解析式の一致は模型内の数値検算であり、実際の放射の精細エントロピーを観測・計算した結果ではありません。

## 7. 演習と詳細解答

### Level A：収支式と時刻比の意味を判定する

<a id="ex-bhi8-a01"></a>
#### BHI8-A01 理想黒体の交点質量と時刻
- Level: A

$M_0>M_{\rm cut}>0$、$\beta=4/3$、$C>0$ の一定模型で、交点の残存面積エントロピー比、質量比、形式蒸発時間比を求めよ。交点が区間内にある条件も示せ。

<!-- solution-start -->
**詳細解答**

[一定係数の定理](#thm-bhi8-constant-page-time)は、初期質量が正で、光度が $C/M^2$、生成率比が一定かつ正の場合に適用できます。交点式は

$$
\frac43(S_0-S_{\rm BH})=S_{\rm BH}
\ \Longleftrightarrow\
\frac43 S_0=\frac73 S_{\rm BH}
\ \Longleftrightarrow\
S_{\rm BH}/S_0=4/7.
$$

$S_{\rm BH}/S_0=(M/M_0)^2$ なので正の平方根を取り $f_{\rm P}=\sqrt{4/7}$。時間の分率公式に代入して

$$
\theta_{\rm P}=1-f_{\rm P}^3
=1-(4/7)^{3/2}\simeq0.568041.
$$

定義域内に交点があるのは $M_{\rm cut}/M_0\le\sqrt{4/7}$ の場合だけです。
<!-- solution-end -->

<a id="ex-bhi8-a02"></a>
#### BHI8-A02 質量半減と時間半分を区別する
- Level: A

$\dot M=-C/M^2$ で質量が $M_0/2$ となる時刻の $(u-u_0)/\tau_{\rm formal}$ と、形式時計が半分進んだ時点の残存質量比を求めよ。

<!-- solution-start -->
**詳細解答**

[BHI4の分率と時刻の定理](../BHI4/index.md#thm-bhi4-fraction-time)から $\theta=1-f^3$ です。$f=1/2$ なら $\theta=1-(1/2)^3=7/8$。逆に $\theta=1/2$ なら $f^3=1/2$ なので $f=2^{-1/3}\simeq0.793701$ です。$1/2$ の質量分率と $1/2$ の時間分率は同じ出来事ではありません。
<!-- solution-end -->

<a id="ex-bhi8-a03"></a>
#### BHI8-A03 等しい生成率の交点
- Level: A

$\beta=1$ の一定模型で $S_{\rm BH}(M_{\rm P})/S_0$、$M_{\rm P}/M_0$ と $\theta_{\rm P}$ を計算せよ。「生成率が等しいから寿命の半分」という推論を検査せよ。

<!-- solution-start -->
**詳細解答**

[一定係数の定理](#thm-bhi8-constant-page-time)に $\beta=1$ を入れると

$$
S_{\rm BH}/S_0=\frac1{1+1}=\frac12,\qquad
f_{\rm P}=\sqrt{\frac12}=\frac1{\sqrt2}.
$$

時間比は $\theta_{\rm P}=1-f_{\rm P}^3=1-1/(2\sqrt2)\simeq0.646447$ です。エントロピーの分率 $1/2$ と、質量の三乗によって決まる時間の分率 $1/2$ を同一視したことが誤りです。
<!-- solution-end -->

<a id="ex-bhi8-a04"></a>
#### BHI8-A04 停止質量が早すぎる例
- Level: A

$\beta=4/3$、$M_{\rm cut}=0.9M_0$ とする。$F(M_{\rm cut})/S_0$ を求め、区間内の交点の有無を判定せよ。

<!-- solution-start -->
**詳細解答**

[質量依存模型の交点判定](#prop-bhi8-variable-crossing)は一定 $\beta$ にも適用でき、$F(M_{\rm cut})/S_0=\beta(1-f_{\rm cut}^2)-f_{\rm cut}^2$ です。$f_{\rm cut}=0.9$ を代入すると

$$
F(M_{\rm cut})/S_0=\frac43(1-0.81)-0.81
=\frac43(0.19)-0.81
=-0.556666\ldots<0.
$$

従ってこの近似区間には交点がありません。形式的な根は $f_{\rm P}=\sqrt{4/7}\simeq0.756$ ですが、停止分率0.9より小さく、計算範囲外です。
<!-- solution-end -->

<a id="ex-bhi8-a05"></a>
#### BHI8-A05 ちょうど形式時間の半分になる係数
- Level: A

一定係数の収支推定で $\theta_{\rm P}=1/2$ を実現する $\beta>0$ を解け。値を決めるのは光度係数 $C$ か生成率比 $\beta$ か。

<!-- solution-start -->
**詳細解答**

[一定係数の時刻式](#thm-bhi8-constant-page-time)から

$$
1-\left(\frac{\beta}{1+\beta}\right)^{3/2}=\frac12
\ \Longleftrightarrow\
\frac{\beta}{1+\beta}=2^{-2/3}.
$$

両辺に $1+\beta$ を掛けて $\beta(1-2^{-2/3})=2^{-2/3}$、よって

$$
\beta=\frac{1}{2^{2/3}-1}\simeq1.702414.
$$

この比は $C$ に依存しません。ただし絶対時刻 $u_{\rm P}-u_0=\tau_{\rm formal}/2$ は $\tau_{\rm formal}=M_0^3/(3C)$ を通じて $C$ に依存します。
<!-- solution-end -->

### Level B：存在条件・係数依存・推論の限界

<a id="ex-bhi8-b01"></a>
#### BHI8-B01 変化する生成率の交点区間
- Level: B

$M_{\rm cut}=0.6M_0$、$C(m)=C_0>0$、$1\le\beta(m)\le2$ を満たす連続な生成率比を考える。交点の存在と、$M_{\rm P}/M_0$ と $(u_{\rm P}-u_0)/\tau_{\rm formal}$ の上下界を証明せよ。

<!-- solution-start -->
**詳細解答**

まず定数下界 $\beta_-=1$ の交点質量分率は $1/\sqrt2\simeq0.7071$ で、$0.6$ より大きいです。放射の積分値は $\beta\ge1$ から $\beta=1$ の値以上なので、停止点では $F(M_{\rm cut})>0$。従って[交点存在と一意性の命題](#prop-bhi8-variable-crossing)で一意の交点があります。

上界 $\beta_+=2$ の根は $\sqrt{2/3}\simeq0.8165$ です。第4.1節の評価を適用して

$$
\frac1{\sqrt2}\le\frac{M_{\rm P}}{M_0}\le\sqrt{\frac23}.
$$

$u-u_0=\tau_{\rm formal}(1-f^3)$ は $f$ に関して減少するので、

$$
1-(2/3)^{3/2}\le\frac{u_{\rm P}-u_0}{\tau_{\rm formal}}
\le1-(1/2)^{3/2}.
$$

数値では $0.455669\le\theta_{\rm P}\le0.646447$ です。上下界に使ったどちらの定数模型の交点も $f_{\rm cut}=0.6$ より大きいため、停止区間の前提も満たしています。
<!-- solution-end -->

<a id="ex-bhi8-b02"></a>
#### BHI8-B02 交点がないことを一つの値で示す
- Level: B

$\beta(m)=1+(m/M_0)^2$、$M_{\rm cut}=0.9M_0$ とする。$C(m)>0$ は任意の連続関数とし、区間内の交点がないことを、$F(M_{\rm cut})$ の符号から示せ。

<!-- solution-start -->
**詳細解答**

$m=M_0 f$ と置き、積分変数を $x=M_0y$ とすると

$$
\frac{S_{\rm rad}^{\rm coarse}}{S_0}
=\frac{\int_f^1 8\pi M_0^2y(1+y^2)\,dy}{4\pi M_0^2}
=2\int_f^1(y+y^3)\,dy.
$$

原始関数 $y^2/2+y^4/4$ を端点評価して

$$
\frac{S_{\rm rad}^{\rm coarse}}{S_0}
=(1-f^2)+\frac12(1-f^4).
$$

$f=0.9$ では $1-f^2=0.19$、$1-f^4=1-0.6561=0.3439$ なので、放射比は $0.19+0.17195=0.36195$。面積側は $f^2=0.81$ です。従って $F(M_{\rm cut})/S_0=0.36195-0.81=-0.44805<0$。[交点判定の命題](#prop-bhi8-variable-crossing)より交点は区間内にありません。$C(m)$ の形はこの符号判定に現れず、質量から時刻への変換にのみ影響します。
<!-- solution-end -->

<a id="ex-bhi8-b03"></a>
#### BHI8-B03 光度の係数だけを増やす
- Level: B

一定 $\beta>0$ と同じ初期質量 $M_0$ を保ち、光度係数を $C$ から $3C$ へ増やした二つの模型を比較せよ。交点質量、絶対経過時間、各模型自身の $\tau_{\rm formal}$ に対する時間比はどう変わるか。

<!-- solution-start -->
**詳細解答**

[一定係数の収支定理](#thm-bhi8-constant-page-time)の質量分率は $f_{\rm P}=\sqrt{\beta/(1+\beta)}$ で $C$ を含まないため、交点質量は両模型で同一です。絶対経過時間は

$$
u_{\rm P}(C)-u_0=\frac{M_0^3}{3C}(1-f_{\rm P}^3),\quad
u_{\rm P}(3C)-u_0=\frac{M_0^3}{9C}(1-f_{\rm P}^3).
$$

従って後者は前者の $1/3$ です。一方各模型の形式時計も $\tau_{\rm formal}(3C)=\tau_{\rm formal}(C)/3$ となるので、各自の形式時計で割った時間比 $1-f_{\rm P}^3$ は同じです。実際に種数を三倍にしたときも $\beta$ が一定だとは、この数学的比較だけからは言えません。
<!-- solution-end -->

<a id="ex-bhi8-b04"></a>
#### BHI8-B04 収支交点は精細曲線の極大を強制するか
- Level: B

同じ有限次元分割 $R_k\otimes B_k$ を共有する二種類の逐次等長発展で、放射エントロピー履歴が異なり得る理由を説明せよ。さらに、粗視化エントロピーと面積エントロピーの交点を指定しただけでは精細曲線の極大を証明できない理由を述べよ。

<!-- solution-start -->
**詳細解答**

[BHI7の同一次元系列の反例](../BHI7/index.md#prop-bhi7-history-nonuniqueness)は、四量子ビットを順次SWAPで出す際、初期積状態から $S(R_k)=(0,0,0,0,0)$、初期Bell対の配置から $S(R_k)=(0,\ln2,2\ln2,\ln2,0)$ を得ます。どちらも等長SWAPで全系の純粋性を保ち、各 $k$ の部分系次元は同じです。

[純粋二部系の上界](../BHI6/index.md#thm-bhi6-entropy-budget)は $S(R_k)$ の上限を与えるだけで、実際の値を固定しません。粗視化の帳簿は放射の全体相関を入力していないため、収支交点から精細曲線の増減は導けません。失われている仮定は、放射と残存系が各時点で典型的なもつれを持ち、粗視化エントロピーを有効次元の対数へ翻訳できるという条件です。
<!-- solution-end -->

### Level C：質量依存係数と近似停止を統合する

<a id="ex-bhi8-c01"></a>
#### BHI8-C01 非一定生成率・非一定光度で時刻を求める
- Level: C

$M_0>0$、$C_0>0$、$M_{\rm cut}=0.78M_0$ とし、正の質量区間で

$$
\beta(m)=1+(m/M_0)^2,\qquad C(m)=C_0(m/M_0),\qquad
\frac{dM}{du}=-\frac{C(M)}{M^2}
$$

を仮定する。$S_{\rm rad}^{\rm coarse}(M_0)=0$ とする。

1. 放射累積と面積エントロピーの質量分率 $f=m/M_0$ による式を導け。
2. 交点が停止質量より前に存在することを示し、$M_{\rm P}/M_0$ を厳密式で求めよ。
3. $u_{\rm P}-u_0$ を $M_0^3/C_0$ で規格化した値と、参照時間 $\tau_{\rm ref}:=M_0^3/(3C_0)$ で規格化した値を求めよ。光度を一定 $C(m)=C_0$ に入れ替えた場合と比較せよ。
4. 上の結果が実際の精細Page曲線の時刻を特定しているかを判定せよ。

<!-- solution-start -->
**詳細解答**

(1) [放射生成率の収支定義](#def-bhi8-entropy-ledger)から

$$
S_{\rm rad}^{\rm coarse}(m)
=\int_m^{M_0}8\pi x\left(1+\frac{x^2}{M_0^2}\right)\,dx
=4\pi(M_0^2-m^2)+\frac{2\pi}{M_0^2}(M_0^4-m^4).
$$

$S_0=4\pi M_0^2$ で割ると

$$
S_{\rm rad}^{\rm coarse}/S_0=(1-f^2)+\frac12(1-f^4),
\qquad S_{\rm BH}/S_0=f^2.
$$

(2) 交点方程式は $(1-f^2)+(1-f^4)/2=f^2$ です。分母を払って

$$
3-2f^2-f^4=2f^2
\ \Longleftrightarrow\
f^4+4f^2-3=0.
$$

$z=f^2\ge0$ と置き、$z^2+4z-3=0$ を解くと

$$
z=\frac{-4\pm\sqrt{16+12}}{2}
=-2\pm\sqrt7.
$$

負の根 $-2-\sqrt7<0$ は $z=f^2$ と両立しないので、

$$
f_{\rm P}=\sqrt{\sqrt7-2}\simeq0.80359.
$$

$0.78< f_{\rm P}<1$ なので停止前に交点があります。さらに $\beta(m)>0$ で連続、$C(m)>0$ で連続なので[質量依存模型の交点命題](#prop-bhi8-variable-crossing)によって交点は一意です。

(3) [質量依存光度係数の時間積分](../BHI4/index.md#prop-bhi4-variable-coefficient)に $C(x)=C_0x/M_0$ を入れます。$x>0$ なので分母を割ることができ、

$$
u_{\rm P}-u_0
=\int_{M_{\rm P}}^{M_0}\frac{x^2}{C_0 x/M_0}\,dx
=\frac{M_0}{C_0}\int_{M_{\rm P}}^{M_0}x\,dx
=\frac{M_0^3}{2C_0}(1-f_{\rm P}^2).
$$

従って $M_0^3/C_0$ に対する比は $(1-f_{\rm P}^2)/2=(3-\sqrt7)/2\simeq0.177124$、参照時計 $\tau_{\rm ref}$ に対する比は

$$
\frac{u_{\rm P}-u_0}{\tau_{\rm ref}}
=\frac32(1-f_{\rm P}^2)
=\frac32(3-\sqrt7)\simeq0.531374.
$$

もし光度を $C_0$ 一定に変えても $\beta(m)$ は同じなので交点質量は変わりません。一方時間比は[BHI4の三乗則](../BHI4/index.md#thm-bhi4-fraction-time)により

$$
\frac{u_{\rm P}^{\rm(const)}-u_0}{\tau_{\rm ref}}
=1-f_{\rm P}^3
=1-(\sqrt7-2)^{3/2}\simeq0.481.
$$

となり、同じ交点質量でも時計は異なります。

(4) これは粗視化放射と面積エントロピーの交点を、指定した準静的質量方程式に沿って時刻へ換算した結果です。精細放射の密度行列、典型的なもつれ、外部の純粋化系の有無を計算していないため、実際の精細エントロピーの極大時刻とはまだ同定できません。
<!-- solution-end -->

## 8. まとめと次の問い

- **質量**の交点は $\beta$ の質量依存と面積エントロピーで決まる。一定 $\beta$ なら $M_{\rm P}/M_0=\sqrt{\beta/(1+\beta)}$。
- **時刻**はさらに $dM/du=-C(M)/M^2$ に依存する。一定 $C$ なら、形式時刻比は $1-[\beta/(1+\beta)]^{3/2}$ で、普遍的な $1/2$ ではない。
- これらは**粗視化放射と面積エントロピーの収支推定**であり、実際の精細放射のPage曲線を計算したものではない。

次のBHI9では、Hawking対を小さく修正するだけで放射の精細エントロピーを減少させられるかを、放出前後の量子系とエントロピー不等式を指定して検討します。
