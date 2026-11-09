# YAU1-13 Ricci平坦Kähler計量の帰結

## 1. 存在定理で「零」を指定すると何が分かるか

前章の[正規化複素Monge–Ampère方程式の存在と一意性](../YAU1-12/index.md#thm-yau1-12-existence)で、正値性と体積の整合条件を満たす解が実際に得られた。これを曲率の問題へ戻そう。目指すのは、**指定したKähler類の中でRicci形式が恒等的に零となる計量**である。

「Ricci平坦」とはRicciテンソル（Kähler計量ではそれに対応するRicci形式）が零であることをいう。**Riemann曲率テンソルの全成分が零**という意味ではない。例えばK3曲面ではRicci平坦計量が存在する一方、全曲率零にはならないことを後で確かめる。

以下、$X$ は滑らか・連結・コンパクト・境界なしの複素次元 $n\ge1$ のKähler多様体とする。$\alpha$ は一つのKähler類、$\omega\in\alpha$ はその正値な代表とし、$V=\int_X\omega^n>0$ と置く。実第一Chern類 $c_1(X)_{\mathbb R}$ は整数係数の $c_1(X)$ を実de Rhamコホモロジーに写したものである。[Ricci形式とChern類の同定](../../KAH/KAH1-12/index.md#thm-kah1-12-ricci-chern)は

$$
[\rho(\omega)]=2\pi c_1(X)_{\mathbb R}
$$

を与える。従って $\rho(\widehat\omega)=0$ という目標を指定できる必要条件は $c_1(X)_{\mathbb R}=0$ である。逆向きの存在も、[既習のRicci平坦系](../../CYG/CYG1-10/index.md#cor-cyg1-10-ricci-flat)として述べられていた。ここではその存在を前章の解析的証明から具体的に再構成し、どの幾何学的対象へ適用できるか調べる。

「実Chern類零」と「標準束 $K_X$ が正則自明」は同じ条件ではない。前者は曲率形式の**コホモロジー類**が零であること、後者は零にならない**大域正則最高次形式**があることを要求する。[標準束と正則体積形式の関係](../../CYG/CYG1-02/index.md#prop-cyg1-02-volume-trivialization)を思い出してほしい。

## 2. Ricciポテンシャルから解の密度を組み立てる

$c_1(X)_{\mathbb R}=0$ と仮定する。すると $\rho(\omega)$ は実閉 $(1,1)$ 形式で、そのde Rham類は零である。[実Ricciポテンシャルの存在命題](../YAU1-02/index.md#prop-yau1-02-real-potential)を $\eta=0$ に適用し、滑らかな実関数 $u$ を

$$
\rho(\omega)+i\partial\bar\partial u=0
$$

となるように取れる。$u$ は定数差だけ不定である。このまま $e^{-u}$ を方程式の右辺に置いてよいわけではない。同じKähler類で体積を変えることはできないため、まず総体積を揃える必要がある。

<a id="lem-yau1-13-normalized-density"></a>

<!-- formal-statement-start -->
> **補題（零Ricci目標の正規化密度と解の構成）**
>
> $X$ を複素次元 $n\ge1$ の滑らかなコンパクト連結Kähler多様体、$\omega$ をKähler形式とし、$c_1(X)_{\mathbb R}=0$ を仮定する。$\rho(\omega)+i\partial\bar\partial u=0$ を満たす滑らかな実関数 $u$ に対し

$$
V=\int_X\omega^n,\qquad
C=\log\frac{V}{\int_Xe^{-u}\omega^n},\qquad
F=-u+C
$$

> と置く。このとき $\int_Xe^F\omega^n=V$ であり、$F$ は $u$ の定数の選び方に依存しない。[正規化Monge–Ampère方程式](../YAU1-12/index.md#thm-yau1-12-existence)の平均ゼロ解 $\varphi$ から定まる $\widehat\omega=\omega+i\partial\bar\partial\varphi$ は次を満たす。

$$
\widehat\omega>0,\qquad
[\widehat\omega]=[\omega],\qquad
\rho(\widehat\omega)=0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

体積の積分から指数の定数を決める。$u$ の定数変更は正規化定数にも同じ変更を生じさせ、$F$ は変わらない。前章の存在定理で正値な解を取り、Ricci差公式へ体積比 $e^F$ を代入すれば符号が相殺する。

<!-- proof-start -->
### 証明

コンパクト性と $u$ の実性から $e^{-u}>0$ は上下に正の界を持ち、積分 $I=\int_Xe^{-u}\omega^n$ は有限かつ正である。よって $C$ は実数として定義され、

$$
\int_Xe^F\omega^n
=e^C\int_Xe^{-u}\omega^n
=\frac VI\,I=V.
$$

$u'=u+a$（$a\in\mathbb R$）と選び直すと

$$
I'=\int_Xe^{-(u+a)}\omega^n=e^{-a}I,\qquad
C'=\log\frac V{e^{-a}I}=C+a,
$$

ゆえに $-u'+C'=-u+C=F$ である。

$F$ は滑らかな実関数で体積が一致する。そこで[前章の存在定理](../YAU1-12/index.md#thm-yau1-12-existence)を、この $X,\omega,F$ に適用すると、滑らかな実関数 $\varphi$ が存在し、

$$
\widehat\omega:=\omega+i\partial\bar\partial\varphi>0,\quad
\widehat\omega^n=e^F\omega^n,\quad
\int_X\varphi\omega^n=0.
$$

$i\partial\bar\partial\varphi=d(i\bar\partial\varphi)$ は実の完全2形式なので $[\widehat\omega]=[\omega]$ である。正値性を確認した後、[Ricci形式の体積比公式](../YAU1-02/index.md#prop-yau1-02-reference-change)を $\omega,\widehat\omega$ に使う。両体積形式は正で、対数が定義できるから、

$$
\begin{aligned}
\rho(\widehat\omega)
&=\rho(\omega)-i\partial\bar\partial
  \log\frac{\widehat\omega^n}{\omega^n}\\
&=\rho(\omega)-i\partial\bar\partial(-u+C)\\
&=\rho(\omega)+i\partial\bar\partial u=0.
\end{aligned}
$$

定数 $C$ の微分が消える点と、Ricci差の**負号**が肝心である。$\square$
<!-- proof-end -->

逆向きは短いが別の論理である。Ricci平坦なKähler形式 $\widehat\omega$ が一つでもあれば、[Ricci–Chern同定](../../KAH/KAH1-12/index.md#thm-kah1-12-ricci-chern)をその形式に使って

$$
2\pi c_1(X)_{\mathbb R}=[\rho(\widehat\omega)]=[0]=0
$$

となる。従って「$c_1(X)_{\mathbb R}=0$」と「少なくとも一つのRicci平坦Kähler形式がある」は同値であり、前者なら任意のKähler類に存在する。

**一意性はどこで使うか。** 同じKähler類にある二つのRicci平坦Kähler形式 $\widehat\omega_1,\widehat\omega_2$ に、[Ricci形式指定の固定類一意性](../../CYG/CYG1-10/index.md#prop-cyg1-10-uniqueness)を $\eta=0$ として適用すると、形式自身が等しい。ポテンシャル表示 $\widehat\omega_j=\omega+i\partial\bar\partial\varphi_j$ では[定数差一意性](../YAU1-04/index.md#thm-yau1-04-uniqueness)により $\varphi_1-\varphi_2$ は定数であり、平均ゼロを課した場合は同じ関数になる。別のKähler類の計量まで唯一だとは主張しない。

## 3. 楕円曲線：零でないRicci形式を零へ戻す

抽象的な指数密度が何をするかを、複素次元1で計算してみよう。$T=\mathbb C/(\mathbb Z+i\mathbb Z)$、$z=x+iy$（$x,y$ は周期1の実変数）、$\omega_0=i\,dz\wedge d\bar z=2\,dx\wedge dy$ とする。これは[複素トーラスの平坦計量](../../CYG/CYG1-04/index.md#prop-cyg1-04-flat-holonomy)の例である。

$0<|\varepsilon|<1$、$f(x)=1+\varepsilon\cos(2\pi x)$ とし、$\omega_\varepsilon=f\omega_0$ と置く。$1-|\varepsilon|\le f\le1+|\varepsilon|$ なので正値であり、実次元2では3形式が存在せず $d\omega_\varepsilon=0$、したがってKählerである。[Wirtinger微分の定義](../../CM/CM2-02/index.md#def-cm2-02-wirtinger-operators)より、$y$ に依存しない滑らかな関数 $h$ には

$$
\partial_z\partial_{\bar z}h
=\frac14(\partial_x^2+\partial_y^2)h
=\frac14 h''(x)
$$

が成り立つ。$\rho(\omega_\varepsilon)=-i\partial\bar\partial\log f$ であり、$x=0$ では

$$
\frac14(\log f)''(0)
=\frac14\left(\frac{f''(0)}{f(0)}
-\frac{f'(0)^2}{f(0)^2}\right)
=-\frac{\pi^2\varepsilon}{1+\varepsilon}\ne0.
$$

つまり $\omega_\varepsilon$ 自身はRicci平坦ではない。同じ類の中で、$u=\log f$ を選べば

$$
\rho(\omega_\varepsilon)+i\partial\bar\partial u=0,\qquad
\int_T\omega_\varepsilon=\int_T\omega_0=2.
$$

$e^{-u}\omega_\varepsilon=f^{-1}f\omega_0=\omega_0$ だから正規化定数は $C=\log(2/2)=0$、$e^F=1/f$ である。$\varphi_0=\varepsilon\cos(2\pi x)/\pi^2$ を試すと

$$
\partial_z\partial_{\bar z}\varphi_0
=\frac14\cdot(-4\pi^2)\frac{\varepsilon}{\pi^2}\cos(2\pi x)
=-\varepsilon\cos(2\pi x),
$$

よって

$$
\omega_\varepsilon+i\partial\bar\partial\varphi_0
=\bigl(f-\varepsilon\cos(2\pi x)\bigr)\omega_0
=\omega_0,\qquad
\omega_0=e^F\omega_\varepsilon.
$$

この $\varphi_0$ は一般には $\omega_\varepsilon$ に関して平均ゼロではない。$dx\,dy$ による積分で $\int_0^1\cos(2\pi x)\,dx=0$、$\int_0^1\cos^2(2\pi x)\,dx=1/2$ を使うと

$$
\frac{1}{\int_T\omega_\varepsilon}
\int_T\varphi_0\omega_\varepsilon
=\frac12\cdot\frac{2\varepsilon}{\pi^2}\cdot
\int_0^1\cos(2\pi x)(1+\varepsilon\cos(2\pi x))\,dx
=\frac{\varepsilon^2}{2\pi^2}.
$$

したがって $\varphi=\varphi_0-\varepsilon^2/(2\pi^2)$ が前章の平均ゼロ解そのものであり、定数変更は計量を変えない。**Ricciが零という条件は、指定した代表 $\omega_\varepsilon$ がすでに零Ricciであることを要求しない**という点が見えた。

## 4. 複素トーラスでは全曲率まで消える

一般にはRicci平坦でもRiemann曲率は残る。しかし複素トーラスでは、存在定理の**一意性**をもう一度使うと、さらに強い結論が出る。

複素トーラス $T=\mathbb C^n/\Lambda$ の $\Lambda$ は実次元 $2n$ の全格子であり、$\mathbb C^n$ の平行移動は商へ降りて正則微分同相写像 $t_a$ を与える。$a\in T$ のリフトを $\widetilde a\in\mathbb C^n$ と選べば $s\mapsto t_{s\widetilde a}$（$0\le s\le1$）は恒等写像から $t_a$ への同位変形である。リフトを変えても端点は同じ写像であり、結論は変わらない。

<a id="prop-yau1-13-torus-rigidity"></a>

<!-- formal-statement-start -->
> **命題（複素トーラスのRicci平坦計量の平行移動不変性）**
>
> $T=\mathbb C^n/\Lambda$ をコンパクト複素トーラス、$\alpha$ をその任意のKähler類とする。$\alpha$ に属する唯一のRicci平坦Kähler形式 $\widehat\omega$ は、任意の平行移動 $t_a$ に対して不変である。

$$
t_a^\ast\widehat\omega=\widehat\omega
\qquad(a\in T).
$$

> したがって $\mathbb C^n$ の標準座標への引き戻しは定数正定値Hermite行列で記述され、対応するRiemann曲率テンソルは零である。
<!-- formal-statement-end -->

### 証明の見取り図

翻訳は恒等写像と同位なのでコホモロジー類を保つ。正則写像による引き戻しはKähler性とRicci形式の零を保つ。すると同じKähler類の二つのRicci平坦形式の一意性で翻訳不変となる。最後に係数関数の翻訳不変性から全係数が定数となる。

<!-- proof-start -->
### 証明

まず $T$ は正定値Hermite行列 $H$ に対して

$$
\omega_H=i\sum_{j,k=1}^nH_{j\bar k}\,dz^j\wedge d\bar z^k
$$

を $\mathbb C^n$ から降ろすことでKähler形式を持つ。係数は一定だから格子移動で不変であり、形式は商へ降りる。任意の非零 $(1,0)$ ベクトル $v$ に対し、正値性は二次形式で直接確認できる。

$$
-i\omega_H(v,\bar v)
=\sum_{j,k=1}^nH_{j\bar k}v^j\overline{v^k}>0.
$$

閉性は係数が定数なので $d\omega_H=0$ から従う。さらに[複素トーラスの正則体積形式](../../CYG/CYG1-04/index.md#prop-cyg1-04-volume-form)から $K_T$ は正則自明で、[標準束からChern類への含意](../../CYG/CYG1-01/index.md#prop-cyg1-01-chern-chain)より $c_1(T)_{\mathbb R}=0$。

ゆえに[Ricci平坦系](../../CYG/CYG1-10/index.md#cor-cyg1-10-ricci-flat)によって、任意のKähler類 $\alpha$ に $\widehat\omega$ が存在し、唯一である。

$t_a$ は上述の同位変形を持つため、de Rhamコホモロジーへの誘導写像が恒等で、

$$
[t_a^\ast\widehat\omega]
=t_a^\ast[\widehat\omega]
=[\widehat\omega]=\alpha.
$$

$t_a$ は正則微分同相なので $t_a^\ast\widehat\omega$ も正値・閉の $(1,1)$ 形式である。局所係数行列の変換によりRicci形式は自然性

$$
\rho(t_a^\ast\widehat\omega)
=t_a^\ast\rho(\widehat\omega)=0
$$

を満たす（この翻訳の正則Jacobianは恒等行列なので、行列式の式を直接引き戻してもよい）。同じ類で同じ零Ricci形式を持つ二つの形式に[固定類一意性](../../CYG/CYG1-10/index.md#prop-cyg1-10-uniqueness)を適用し、$t_a^\ast\widehat\omega=\widehat\omega$ を得る。

$\mathbb C^n$ への引き戻しを $i\sum h_{j\bar k}(z)\,dz^j\wedge d\bar z^k$ と書けば、翻訳の微分は恒等行列なので

$$
h_{j\bar k}(z+\widetilde a)=h_{j\bar k}(z)
\qquad(z,\widetilde a\in\mathbb C^n).
$$

任意の二点 $z,w$ に対して $\widetilde a=w-z$ を選べるから $h_{j\bar k}(w)=h_{j\bar k}(z)$。各係数は定数で正定値である。従ってLevi-Civita接続のChristoffel記号（一定計量の一階微分からなるもの）はこの座標で零であり、その微分と二次積からなるRiemann曲率も零。$\square$
<!-- proof-end -->

これは[既習の一定Hermite計量の平坦性](../../CYG/CYG1-04/index.md#prop-cyg1-04-flat-holonomy)より一歩進み、**与えられた任意のKähler類でのRicci平坦解が必ず一定係数になる**ことを一意性から示している。

## 5. K3とquintic：存在するが「平坦」とは限らない

複素トーラスでの翻訳不変性は特別な対称性に頼った。対称性のない射影超曲面では、Ricci平坦解の存在は言えても明示的な係数行列を容易には書けない。適用に必要なのは、**滑らかでコンパクトなKähler多様体**であることと、**実第一Chern類が零**であることだ。

### Fermat四次K3曲面

$$
S=\{[Z_0:\cdots:Z_3]\in\mathbb P^3:\ \sum_{j=0}^3 Z_j^4=0\}.
$$

同次偏微分 $4Z_j^3$ は射影点で一斉には零にならない。したがって[四次曲面の滑らかさと標準束の命題](../../CYG/CYG1-05/index.md#prop-cyg1-05-fermat-smooth-canonical)の仮定が成り立つ。同命題は、射影性によるコンパクトKähler性と、随伴公式による

$$
\dim_{\mathbb C}S=3-1=2,\qquad
K_S\simeq\mathcal O_S(4-3-1)=\mathcal O_S
$$

も与える。標準束が正則自明なので $c_1(S)_{\mathbb R}=0$。この曲面が単連結でありK3曲面の[定義](../../CYG/CYG1-05/index.md#def-cyg1-05-k3)を満たすことは[四次曲面のK3判定](../../CYG/CYG1-05/index.md#prop-cyg1-05-k3)で確認済みである。

ゆえに[零Ricci目標の補題](#lem-yau1-13-normalized-density)を、**任意に固定した** $S$ のKähler類 $\alpha$ の代表 $\omega\in\alpha$ に適用でき、同類のRicci平坦形式が一意に得られる。ただしこの計量は一般に平坦ではない。実際、[四次K3のEuler標数計算](../../CYG/CYG1-05/index.md#prop-cyg1-05-euler-24)は

$$
\chi(S)=\int_Sc_2(TS)=24.
$$

もしRiemann曲率が全て零ならKählerのChern接続の曲率も零となり、Chern–Weilの $c_2$ 代表形式は零となる。[Chern–Gauss–Bonnet](../../CYG/CYG1-05/index.md#thm-cyg1-05-gauss-bonnet-input)により上の積分は零になるはずで、$24$ と矛盾する。従ってRicciの**跡**が零でも曲率全体は消えない。

### Fermat五次三次元多様体

$$
Q=\{[Z_0:\cdots:Z_4]\in\mathbb P^4:\ \sum_{j=0}^4Z_j^5=0\}.
$$

ここでも偏微分 $5Z_j^4$ の同時零は射影点にならない。[五次超曲面の滑らかさと標準束](../../CYG/CYG1-08/index.md#prop-cyg1-08-smooth-canonical)は、滑らかコンパクトKähler三次元多様体であり、随伴公式から

$$
\dim_{\mathbb C}Q=4-1=3,\qquad
K_Q\simeq\mathcal O_Q(5-4-1)=\mathcal O_Q
$$

と結論している。[弱Lefschetzの定理](../../CYG/CYG1-08/index.md#thm-cyg1-08-weak-lefschetz)の次数零では $H^0(Q;\mathbb Z)\simeq H^0(\mathbb P^4;\mathbb Z)\simeq\mathbb Z$ だから、$Q$ は連結でもある。ゆえに $c_1(Q)_{\mathbb R}=0$ で、任意のKähler類にRicci平坦Kähler計量がちょうど一つ存在する。これは曲率方程式を解いたという**存在・一意性**の結論であって、Fermat多項式から計量成分を直接求めたことではない。

複素次元3という数だけで、全ホロノミーが $SU(3)$ と等しいとまでは言えない。[Ricci平坦とホロノミーの区別](../../CYG/CYG1-11/index.md#thm-cyg1-11-full-parallel)では、制限ホロノミーと全ホロノミー、標準束自明性の追加情報を整理した。ここで証明したのはRicci形式零と固定類での一意性である。

一方、**Riemann平坦でない**ことは別の位相的計算から示せる。[五次三次元多様体のChern数](../../CYG/CYG1-07/index.md#prop-cyg1-07-quintic)では

$$
\chi(Q)=\int_Qc_3(TQ)=-200.
$$

もしRiemann曲率全体が零ならKählerのChern曲率も零であり、最高次Chern形式が零となって積分が $0$ になるはずで、矛盾する。したがってquinticもRicci平坦だがRiemann平坦ではない。

### 実Chern類は零だが標準束が自明でない例

[Enriques曲面の標準束とChern類](../../CYG/CYG1-03/index.md#prop-cyg1-03-enriques-chern)では、$K_E$ が非自明な2-torsion線束となる一方、実第一Chern類は零である。Enriques曲面は射影的でKählerだから、零Ricciの存在定理は使える。しかし $K_E\simeq\mathcal O_E$ と言い換えてはならない。実係数化でtorsionが消えることと、線束自体が自明になることは別である。

## 6. 仮定を一つ外すとどこで止まるか

1. **実第一Chern類が零でない場合。** $\mathbb P^1$ では $c_1(\mathbb P^1)_{\mathbb R}>0$ で、[Ricci–Chern同定](../../KAH/KAH1-12/index.md#thm-kah1-12-ricci-chern)により零Ricci形式を持つKähler計量は存在しない。零目標のRicciポテンシャルを作る前にコホモロジー条件で止まる。
2. **Kähler類を固定しない場合。** トーラスの $\omega_H$ と $2\omega_H$ はともに平坦でRicci平坦だが、体積は $2^n$ 倍であり別のKähler類を表す。同一類の一意性を別類へ拡張してはいけない。
3. **コンパクト性を外した場合。** $\mathbb C$ では $i\,dz\wedge d\bar z$ と $2i\,dz\wedge d\bar z$ はどちらもRicci平坦だが、$H^2_{\mathrm{dR}}(\mathbb C)=0$ なので同じ零の類に属する。前章の体積積分は無限大となり、コンパクト固定類での一意性をそのまま使えない。
4. **Ricci平坦とRiemann平坦を同一視した場合。** 四次K3の $\chi=24$ による反証を見落とす。Riemann曲率が全て消えるという強い結論は零Ricciという縮約条件からは従わない。

## 7. 演習：零Ricci目標を自分で実現する

### Level A

<a id="ex-yau1-13-a01"></a>

#### YAU1-13-A01 零Ricci目標に必要なChern類
- Level: A

コンパクトKähler多様体 $X$ に $\rho(\widehat\omega)=0$ の計量があるとする。$c_1(X)_{\mathbb R}=0$ を証明せよ。逆向きで追加して使う解析定理は何か。

<!-- solution-start -->
**詳細解答。** [Ricci–Chern同定](../../KAH/KAH1-12/index.md#thm-kah1-12-ricci-chern)に $\widehat\omega$ を代入すると

$$
2\pi c_1(X)_{\mathbb R}=[\rho(\widehat\omega)]=0.
$$

$2\pi\ne0$ だから $c_1(X)_{\mathbb R}=0$。逆向きでは、この等式だけでは計量は作れない。[前章のMonge–Ampère存在定理](../YAU1-12/index.md#thm-yau1-12-existence)とRicciポテンシャル・正規化密度が必要である。
<!-- solution-end -->

<a id="ex-yau1-13-a02"></a>

#### YAU1-13-A02 密度を正規化する定数
- Level: A

$V=\int_X\omega^n$、$I=\int_Xe^{-u}\omega^n$ が正であるとき、$\int_Xe^{-u+C}\omega^n=V$ を満たす $C$ を求めよ。$u\mapsto u+a$ で $F=-u+C$ が変わらないことも示せ。

<!-- solution-start -->
**詳細解答。** $e^CI=V$ を解き、$e^C=V/I>0$、ゆえに $C=\log(V/I)$。新たな $I'$ は

$$
I'=\int_Xe^{-u-a}\omega^n=e^{-a}I.
$$

従って $C'=\log(V/I')=C+a$、$-(u+a)+(C+a)=-u+C$ である。
<!-- solution-end -->

<a id="ex-yau1-13-a03"></a>

#### YAU1-13-A03 定数Hermite行列の正値性とRicci形式
- Level: A

$H=\operatorname{diag}(2,3)$ とし、$\mathbb C^2/\Lambda$ 上の $\omega_H=i\sum_{j=1}^2H_{j\bar j}dz^j\wedge d\bar z^j$ を考える。Kähler性とRicci平坦性を、行列が表す条件に戻って確認せよ。

<!-- solution-start -->
**詳細解答。** $(1,0)$ ベクトル $v=(v^1,v^2)\ne0$ では

$$
-i\omega_H(v,\bar v)=2|v^1|^2+3|v^2|^2>0.
$$

係数は定数だから $d\omega_H=0$ で、格子移動でも変わらないので商へ降りる。よってKählerである。$\det H=6>0$ は定数だから[Ricci形式の局所行列式公式](../../KAH/KAH1-11/index.md#thm-kah1-11-local-ricci)により

$$
\rho(\omega_H)=-i\partial\bar\partial\log6=0.
$$

行列式が正であることだけで正値性を代用せず、上の二次形式を確認した。
<!-- solution-end -->

<a id="ex-yau1-13-a04"></a>

#### YAU1-13-A04 余弦のWirtinger二階微分
- Level: A

$z=x+iy$、$h(x)=\varepsilon\cos(2\pi x)/\pi^2$ に対し $\partial_z\partial_{\bar z}h$ を求めよ。

<!-- solution-start -->
**詳細解答。** [Wirtinger作用素](../../CM/CM2-02/index.md#def-cm2-02-wirtinger-operators)から $\partial_z\partial_{\bar z}=\frac14(\partial_x^2+\partial_y^2)$。$h_y=0$、$h_{xx}=-4\varepsilon\cos(2\pi x)$ なので

$$
\partial_z\partial_{\bar z}h
=\frac14(-4\varepsilon\cos(2\pi x)+0)
=-\varepsilon\cos(2\pi x).
$$
<!-- solution-end -->

<a id="ex-yau1-13-a05"></a>

#### YAU1-13-A05 四次曲面と五次超曲面の随伴公式
- Level: A

滑らかな次数 $d$ の超曲面 $X_d\subset\mathbb P^m$ に $K_{X_d}\simeq\mathcal O_{X_d}(d-m-1)$ が成立するとする。$(m,d)=(3,4),(4,5)$ で複素次元と標準束を計算せよ。

<!-- solution-start -->
**詳細解答。** 滑らかな超曲面は余次元1だから複素次元は $m-1$。[随伴公式の次数判定](../../CYG/CYG1-02/index.md#thm-cyg1-02-hypersurface-degree)へ代入すると

$$
\begin{aligned}
(m,d)=(3,4)&:\quad \dim_{\mathbb C}X_4=2,\quad K_{X_4}=\mathcal O_{X_4}(4-3-1)=\mathcal O_{X_4},\\
(m,d)=(4,5)&:\quad \dim_{\mathbb C}X_5=3,\quad K_{X_5}=\mathcal O_{X_5}(5-4-1)=\mathcal O_{X_5}.
\end{aligned}
$$

ここでは滑らかさを仮定している。多項式の次数だけで滑らかさを結論していない。
<!-- solution-end -->

### Level B

<a id="ex-yau1-13-b01"></a>

#### YAU1-13-B01 余弦係数計量から平坦計量へ
- Level: B

$T=\mathbb C/(\mathbb Z+i\mathbb Z)$、$\omega_\varepsilon=(1+\varepsilon\cos2\pi x)i\,dz\wedge d\bar z$（$0<|\varepsilon|<1$）とする。Ricciポテンシャル $u$、正規化 $F$、平均ゼロのMonge–Ampère解 $\varphi$ を求めよ。

<!-- solution-start -->
**詳細解答。** $f=1+\varepsilon\cos2\pi x>0$ より $\rho(\omega_\varepsilon)=-i\partial\bar\partial\log f$、したがって $u=\log f$ を取れる。周期平均から

$$
V=\int_T\omega_\varepsilon=2,\qquad
\int_Te^{-u}\omega_\varepsilon=\int_Ti\,dz\wedge d\bar z=2
$$

であり $C=0$、$F=-\log f$。$\varphi_0=(\varepsilon/\pi^2)\cos2\pi x$ とすると[関数に作用する偏微分作用素](../../CM/CM2-02/index.md#def-cm2-02-wirtinger-operators)の定義から $\partial_z\partial_{\bar z}\varphi_0=-\varepsilon\cos2\pi x$、従って

$$
\omega_\varepsilon+i\partial\bar\partial\varphi_0
=\omega_0=e^F\omega_\varepsilon.
$$

最後に $\omega_\varepsilon=2f\,dx\,dy$、$\int_0^1\cos2\pi x\,dx=0$、$\int_0^1\cos^22\pi x\,dx=1/2$ より

$$
\frac1V\int_T\varphi_0\omega_\varepsilon
=\frac12\cdot\frac{2\varepsilon}{\pi^2}
\left(0+\frac{\varepsilon}{2}\right)
=\frac{\varepsilon^2}{2\pi^2}.
$$

よって $\varphi=\frac{\varepsilon}{\pi^2}\cos2\pi x-\frac{\varepsilon^2}{2\pi^2}$ が平均ゼロである。定数の $\partial\bar\partial$ は零なので方程式は保たれる。
<!-- solution-end -->

<a id="ex-yau1-13-b02"></a>

#### YAU1-13-B02 トーラス上の翻訳剛性を再証明する
- Level: B

$T=\mathbb C^n/\Lambda$ で同じKähler類のRicci平坦形式が唯一とする。平行移動 $t_a$ の同位変形を一つ構成し、Ricci平坦形式の係数が全て定数になることを示せ。

<!-- solution-start -->
**詳細解答。** $a$ のリフト $\widetilde a\in\mathbb C^n$ を選び $H_s([z])=[z+s\widetilde a]$（$0\le s\le1$）と置く。どの格子代表 $z+\lambda$ でも $[z+\lambda+s\widetilde a]=[z+s\widetilde a]$ なので well-defined で、$H_0=\mathrm{id}$、$H_1=t_a$。よって $t_a^\ast$ はde Rhamコホモロジーで恒等である。

$\widehat\omega$ がRicci平坦なら $t_a^\ast\widehat\omega$ も正値・閉で、Ricci形式は $t_a^\ast0=0$、類は同じ。仮定した[固定類一意性](../../CYG/CYG1-10/index.md#prop-cyg1-10-uniqueness)より $t_a^\ast\widehat\omega=\widehat\omega$。持ち上げた係数 $h_{j\bar k}(z)$ は任意の $\widetilde a$ で $h_{j\bar k}(z+\widetilde a)=h_{j\bar k}(z)$。任意の $z,w$ に $\widetilde a=w-z$ を代入して係数は定数。従って計量の一階微分、接続係数、Riemann曲率はすべて零である。
<!-- solution-end -->

<a id="ex-yau1-13-b03"></a>

#### YAU1-13-B03 Enriques曲面と実Chern類
- Level: B

射影Enriques曲面 $E$ の標準束は非自明で $K_E^{\otimes2}\simeq\mathcal O_E$ である。この情報から $c_1(E)_{\mathbb R}$ とRicci平坦Kähler計量の存在を判定せよ。標準束が正則自明かどうかも答えよ。

<!-- solution-start -->
**詳細解答。** [torsion標準束の例](../../CYG/CYG1-03/index.md#prop-cyg1-03-enriques-chern)から、$c_1(K_E)$ は2-torsionである。Chern類の加法性を使うと

$$
2c_1(K_E)=c_1(K_E^{\otimes2})=0.
$$

実ベクトル空間 $H^2(E;\mathbb R)$ では2倍が零なら元は零なので、$c_1(K_E)_{\mathbb R}=0$。$c_1(TE)=-c_1(K_E)$ だから $c_1(E)_{\mathbb R}=0$。射影性からKählerであり、[零Ricci目標の正規化密度と解の構成](#lem-yau1-13-normalized-density)を適用できる。ゆえに各Kähler類に一意のRicci平坦形式がある。しかし $K_E$ は仮定どおり非自明で、実Chern類の消失から正則自明性は結論できない。
<!-- solution-end -->

<a id="ex-yau1-13-b04"></a>

#### YAU1-13-B04 K3はRicci平坦でもRiemann平坦ではない
- Level: B

Fermat四次K3曲面 $S$ の $\int_Sc_2(TS)=24$ を既知とする。Ricci平坦Kähler計量の存在と、どのようなKähler計量もRiemann曲率全体は零にならないことを説明せよ。

<!-- solution-start -->
**詳細解答。** [Fermat四次曲面の滑らかさと標準束](../../CYG/CYG1-05/index.md#prop-cyg1-05-fermat-smooth-canonical)から $c_1(S)_{\mathbb R}=0$ を得る。同命題は射影性によるKähler性も保証する。従って[零Ricci目標の正規化密度と解の構成](#lem-yau1-13-normalized-density)を適用でき、Ricci平坦形式が存在する。

一方、仮にあるKähler計量のRiemann曲率が恒等的に零なら、Kählerの場合のChern接続も平坦である。するとChern–Weilで作る2次Chern形式は零となるので、[Gauss–Bonnetの等式](../../CYG/CYG1-05/index.md#thm-cyg1-05-gauss-bonnet-input)から

$$
\int_Sc_2(TS)=\int_S0=0
$$

になる。しかし既知の値は24で矛盾。RicciはRiemann曲率の縮約であり、縮約が零でも元のテンソルが零とは限らない。
<!-- solution-end -->

### Level C

<a id="ex-yau1-13-c01"></a>

#### YAU1-13-C01 零Ricci形式の存在と固定類一意性を統合する
- Level: C

$X$ を滑らか・コンパクト・連結・境界なしのKähler多様体とする。次の同値性を、必要条件、体積正規化、存在、一意性に分けて証明せよ。

1. $c_1(X)_{\mathbb R}=0$。
2. $X$ にRicci平坦Kähler形式が存在する。

さらに条件1が成り立つなら、任意の**固定Kähler類**にはそれが唯一であることを示せ。

<!-- solution-start -->
**詳細解答。** 2から1は[Ricci–Chern公式](../../KAH/KAH1-12/index.md#thm-kah1-12-ricci-chern)を $\rho(\widehat\omega)=0$ へ適用すれば $2\pi c_1(X)_{\mathbb R}=0$。1から2は任意のKähler類 $\alpha$ を取り、その代表 $\omega$ を固定する。実Ricci類が零なので[ポテンシャルの存在](../YAU1-02/index.md#prop-yau1-02-real-potential)から $\rho(\omega)+i\partial\bar\partial u=0$ となる実 $u$ を得る。

$$
V=\int_X\omega^n,\quad
I=\int_Xe^{-u}\omega^n,\quad
C=\log(V/I),\quad F=-u+C.
$$

$I>0$ で $\int_Xe^F\omega^n=V$。よって[Monge–Ampère存在定理](../YAU1-12/index.md#thm-yau1-12-existence)で $\omega_\varphi>0$、$\omega_\varphi^n=e^F\omega^n$ の解を得る。[Ricci差公式](../YAU1-02/index.md#prop-yau1-02-reference-change)へ $F=-u+C$ を代入すると

$$
\rho(\omega_\varphi)=\rho(\omega)-i\partial\bar\partial F
=\rho(\omega)+i\partial\bar\partial u=0.
$$

完全形式を加えたので $[\omega_\varphi]=[\omega]=\alpha$。固定 $\alpha$ に二つあれば[同じRicci形式の固定類一意性](../../CYG/CYG1-10/index.md#prop-cyg1-10-uniqueness)で両形式は一致する。どの類にも同じ構成ができるが、異なる類の計量の一致までは主張していない。
<!-- solution-end -->

<a id="ex-yau1-13-c02"></a>

#### YAU1-13-C02 三つの幾何と二種類の平坦性
- Level: C

次の対象について、複素次元、$c_1(X)_{\mathbb R}=0$ を示す根拠、任意のKähler類でのRicci平坦計量の存在、Riemann平坦性まで結論できるかを比較せよ。

1. $T=\mathbb C^2/\Lambda$（全格子による複素トーラス）。
2. $S=\{\sum_{j=0}^3Z_j^4=0\}\subset\mathbb P^3$。
3. $Q=\{\sum_{j=0}^4Z_j^5=0\}\subset\mathbb P^4$。

加えて $\mathbb P^1$ で同じ議論が使えない理由を述べよ。

<!-- solution-start -->
**詳細解答。** $T$ の複素次元は2。$dz^1\wedge dz^2$ は格子移動で不変かつ非消失なので[標準束が自明](../../CYG/CYG1-04/index.md#prop-cyg1-04-volume-form)で $c_1(T)_{\mathbb R}=0$。正定値定数Hermite形式がKähler形式を与えるから、[零Ricci目標の補題](#lem-yau1-13-normalized-density)で任意のKähler類にRicci平坦形式がある。さらに[翻訳剛性命題](#prop-yau1-13-torus-rigidity)でその形式は定数係数、従ってRiemann平坦である。

$S$ の複素次元は $3-1=2$。偏微分 $4Z_j^3$ の同時零は射影点でなく、[Fermat四次曲面の滑らかさと標準束](../../CYG/CYG1-05/index.md#prop-cyg1-05-fermat-smooth-canonical)から射影Kählerかつ $K_S=\mathcal O_S(4-4)$。よって $c_1(S)_{\mathbb R}=0$ でRicci平坦解は各類に存在する。ただし[Euler標数24](../../CYG/CYG1-05/index.md#prop-cyg1-05-euler-24)と曲率のChern–Weil表示によりRiemann平坦性は**不可能**である。

$Q$ の複素次元は $4-1=3$。同様に $5Z_j^4$ の同時零は射影点ではなく、[Fermat五次の滑らかさと標準束](../../CYG/CYG1-08/index.md#prop-cyg1-08-smooth-canonical)から射影Kähler、$K_Q=\mathcal O_Q(5-5)$。従って各類にRicci平坦解が唯一存在する。さらに[最高次Chern数の計算](../../CYG/CYG1-07/index.md#prop-cyg1-07-quintic)で $\int_Qc_3(TQ)=-200$ だから、全曲率零なら最高次Chern形式も零という事実と矛盾し、Riemann平坦ではない。

最後に $\mathbb P^1$ では [Ricci–Chern同定](../../KAH/KAH1-12/index.md#thm-kah1-12-ricci-chern)の右辺 $2\pi c_1(\mathbb P^1)_{\mathbb R}$ が非零だから、零Ricci目標は許容されず存在定理を適用できない。
<!-- solution-end -->

## 8. 次の講義へ

これで、零Ricci目標の体積密度の作り方、各Kähler類での存在・一意性、三つの代表的な幾何への適用がつながった。次はYAU1-14で、体積の整合、Kähler正値性、コンパクト性を意図的に外しながら、Ricci形式指定から存在と一意性に至る証明全体を自分で組み直す。
