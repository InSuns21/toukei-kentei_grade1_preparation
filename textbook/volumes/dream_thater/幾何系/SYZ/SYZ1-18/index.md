# SYZ1-18 滑らかな定理から一般予想への証明地図・総合演習

<!-- definition-example-audit: strict -->

## 1. 何を証明し、どこから先を予想として読むか

特殊Lagrange（SLag）トーラスを双対化すると鏡像が現れる、という構想は一行で書ける。しかし、[較正による体積最小性](../SYZ1-03/index.md#thm-syz1-03-volume-minimization)、[McLeanの変形定理](../SYZ1-06/index.md#thm-syz1-06-mclean-unobstructed)、[二種類の整数アフィン構造](../SYZ1-08/index.md#thm-syz1-08-two-integral-affine)、[semi-flat複素構造](../SYZ1-10/index.md#thm-syz1-10-complex-gluing)は、それぞれ異なる仮定の下で成り立つ。

本講の中心問いは、**それぞれの定理の結論を次の議論の仮定にいつ接続できるか**である。まず局所的な証明を途中式付きでつなぎ直し、次に節点、円板、トロピカル退化で接続が止まる場所を計算する。最後に、個別の計算と一般の鏡像対称性予想を区別する。

ここでは次の三つの論理的な位置を区別する。

1. **定理として証明した主張**：明記した仮定の下で結論が従い、核心証明を本系列または指定した既習講でたどれる。
2. **追加データの下の構成**：例えば滑らかなSLagトーラス束、Hessianポテンシャル、壁関数を入力した場合に計算できるが、その入力の大域的な存在は同時には証明していない。
3. **一般的な期待・予想**：任意の適切なCalabi–Yauに必要なSLag束が存在することや、特異点と全円板補正を組み込む幾何的鏡像の一般的な再構成など、局所模型からは従わないもの。

<a id="def-syz1-18-proof-status"></a>

<!-- formal-statement-start -->
> **定義（証明地図の三分類）**  
> 数学的な主張を組 $(H,C)$ として扱う。ここで $H$ は必要な仮定、$C$ は結論である。本講の証明地図では、既習の定理とその適用条件から $H\Rightarrow C$ が証明されたものを **証明済み**、未証明の追加入力 $D$ を明示して $H\land D\Rightarrow C$ を構成したものを **条件付き構成**、そのような証明がまだ与えられていない大域的な主張を **一般的期待** と呼ぶ。この分類は主張そのものの真偽でなく、本系列で到達した論証範囲を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-18-proof-status -->
### 直接例：変形できることと空間全体を覆うこと

コンパクトで境界のないSLag $L\subset X$ に[McLeanの変形定理](../SYZ1-06/index.md#thm-syz1-06-mclean-unobstructed)を適用すると、局所変形空間の次元は $b_1(L)$ となる。これは必要なコンパクト性と正則性の下での**証明済み**の結論である。$L=T^n$ のとき $b_1(T^n)=n$ と数えられる。

他方、写像 $\pi:X\to B$ が存在し、正則値上のファイバーすべてがSLagトーラスであるという条件は、[滑らかなファイブレーションの定義](../SYZ1-07/index.md#def-syz1-07-regular-fibration)で**追加している**。局所変形空間の次元が $n$ でも、別々の変形が $X$ を重なりなく覆うことは出ない。「$b_1=n$ だから任意の $X$ に大域SLagトーラス束が存在する」という推論は、局所の解空間から大域の全射・非交叉性へ飛んでいる。

**定義の確認**：$H$ と $C$ を分離すると、前者は証明済み、$\pi$ を入力した後の周期構成は条件付き構成、任意の対象で $\pi$ が存在するという主張は一般的期待である。
<!-- definition-example-end -->

## 2. 較正から変形方程式まで：局所解と非線形解

較正とは、向き付き単位接平面上の値が1以下の閉形式である。[較正の定義](../SYZ1-03/index.md#def-syz1-03-calibration)に従い、$n$ 次元部分多様体 $L$ の正の体積形式を $\mathrm{vol}_L$ とすれば

$$
\eta|_L=\mathrm{vol}_L,\qquad
\eta|_{L'}\le\mathrm{vol}_{L'}
$$

が成り立つ。コンパクトで境界なし、同じホモロジー類に属する向き付き $L'$ について、$d\eta=0$ とStokesの定理から $\int_{L'}\eta=\int_L\eta$ である。そこで

$$
\operatorname{Vol}(L')
\ge\int_{L'}\eta
=\int_L\eta
=\operatorname{Vol}(L).
$$

これが**ホモロジー類内での体積最小**の証明である。単に第一変分が0であるという主張より強い。一方、競争相手が同じホモロジー類にいなければ真ん中の積分の等号には根拠がない。

Calabi–Yauで正規化した正則体積形式 $\Omega$ と位相 $\theta$ を固定すると、[SLag較正の定理](../SYZ1-03/index.md#thm-syz1-03-special-lagrangian-calibration)から $\operatorname{Re}(e^{-i\theta}\Omega)$ が上の $\eta$ になる。向きを指定したLagrange $L$ で

$$
\omega|_L=0,\qquad
\operatorname{Im}(e^{-i\theta}\Omega)|_L=0,\qquad
\operatorname{Re}(e^{-i\theta}\Omega)|_L>0
$$

を確認すると、較正と体積形式が一致する。虚部だけを0にしても、向きを逆転した場合は実部が負になり得るので第三条件を消せない。

<a id="prop-syz1-18-calibration-to-mclean"></a>

<!-- formal-statement-start -->
> **命題（較正からMcLean接空間への証明連鎖）**  
> $X$ を規格化された正則体積形式を持つCalabi–Yau $n$ 次元複素多様体とする。
> $L\subset X$ はコンパクト・境界なし・向き付きに埋め込まれたSLagとする。
> 法線場 $V$ に対応する1形式を次で定め、位相は固定する。

$
\alpha=-\iota_V\omega|_L
$

> SLag条件の線形化は
>
$
> d\alpha=0,\qquad d^*\alpha=0
$
>
> であり、線形化の核は調和1形式と一致する。さらに既習の楕円型陰関数定理による非線形の無障害性を適用すると、SLagの局所変形空間は滑らかで接空間の次元が $b_1(L)$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

まずSLagを表す二つの閉形式を法線変形に沿って引き戻し、Cartanの公式で微分する。次に法線場と1形式のHodge星を対応させる。最後に、線形化の核を求める計算と、非線形に実現できることを分けて扱う。

<!-- proof-start -->
### 証明

変形埋め込み $F_t:L\to X$ が $F_0$ で元の包含、速度が $V$ とする。$d\omega=0$ なのでCartanの公式を使い、

$$
\left.\frac{d}{dt}\right|_0F_t^*\omega
=d(\iota_V\omega|_L)=-d\alpha.
$$

また $d\operatorname{Im}(e^{-i\theta}\Omega)=0$ だから

$$
\left.\frac{d}{dt}\right|_0F_t^*\operatorname{Im}(e^{-i\theta}\Omega)
=d\bigl(\iota_V\operatorname{Im}(e^{-i\theta}\Omega)|_L\bigr).
$$

[法線場とHodge星の対応](../SYZ1-05/index.md#prop-syz1-05-hodge-identification)を上の規約で代入すれば、後者は正確に $d(*\alpha)$ となる。Hodge星と余微分の関係から $d(*\alpha)=0$ と $d^*\alpha=0$ は同値である。ゆえに一次の核は

$$
\ker(d\oplus d^*)=
\{\alpha\in\Omega^1(L):d\alpha=0,\ d^*\alpha=0\}
=\mathcal H^1(L).
$$

コンパクト・境界なしでのHodge理論により $\dim\mathcal H^1(L)=b_1(L)$。しかし**核の計算だけでは非線形解の存在は出ない**。[正確な値域と右逆の構成](../SYZ1-06/index.md#lem-syz1-06-right-inverse)を用いる[McLeanの無障害性定理](../SYZ1-06/index.md#thm-syz1-06-mclean-unobstructed)が、非線形SLag方程式の局所解集合をこの核でパラメータ化する。これで主張を得る。
<!-- proof-end -->

### 直接計算：平坦トーラス上の並進

$L=\mathbb R^2/\mathbb Z^2$ とし、$\alpha=a\,dx+b\,dy$（$a,b$ は定数）を取る。$d\alpha=0$ かつ $d^*\alpha=-(\partial_xa+\partial_yb)=0$。独立な $dx,dy$ が調和1形式の基底なので $b_1(L)=2$。複素トーラスの平坦な座標では法線方向への一定並進が実際のSLag変形を与える。この具体例は非線形解を直接持つが、任意の曲がった $L$ に並進座標があるという証明にはならない。

## 3. 二重周期からHessian、双対トーラスへ

ここからは**新しい仮定**として、正則値集合 $B_0$ 上に滑らかなSLagトーラス束 $\pi:X_0\to B_0$ が存在するとする。各ファイバー $L_b\simeq T^n$ の法線変形 $V$ によって作る1形式 $\alpha_V$ と $(n-1)$ 形式から、[二つのコホモロジー対応](../SYZ1-08/index.md#prop-syz1-08-two-cohomology-isomorphisms)が得られる。

$$
T_bB_0\simeq H^1(L_b;\mathbb R),\qquad
T_bB_0\simeq H^{n-1}(L_b;\mathbb R).
$$

サイクルを固定した小さな単連結領域で、両対応の周期を積分すると二組の局所座標ができる。整数サイクル基底の変更が $GL(n,\mathbb Z)$ を与えるため、[二重整数アフィン構造の定理](../SYZ1-08/index.md#thm-syz1-08-two-integral-affine)が適用できる。

この二つを連結する計量は、変形1形式の内積をファイバー上で積分したものである。

$$
g_b(V,W)=\int_{L_b}\alpha_V\wedge *\alpha_W.
$$

正定値性は $\int_{L_b}|\alpha_V|^2\mathrm{vol}_{L_b}>0$（$V\ne0$）で従う。適切なアフィン座標 $u^i$ に関して、[Hessian計量定理](../SYZ1-09/index.md#thm-syz1-09-hessian)は $g_{ij}=\partial_i\partial_j\phi$ と二番目の座標 $t_i=\partial_i\phi$ を与える。Hessian $H$ が正定値なら、勾配写像のJacobianは $H$ で可逆なので局所Legendre双対は

$$
t=\nabla\phi(u),\qquad
\phi^*(t)=t\cdot u-\phi(u),\qquad
\nabla_t^2\phi^*=H^{-1}
$$

と求まる。この最後の式は $\partial t/\partial u=H$、$\partial u/\partial t=H^{-1}$ を連鎖律に代入した結果である。

<a id="prop-syz1-18-semiflat-bridge"></a>

<!-- formal-statement-start -->
> **命題（正定値二次ポテンシャルのsemi-flat双対化）**  
> $U\subset\mathbb R^n$ を単連結な開集合、$H$ を定数の実対称正定値行列とする。
> ポテンシャル $\phi$ と周期1の角 $v$ を持つ局所双対束を次のように定める。

$
\phi(u)=\frac12u^{\mathsf T}Hu,\qquad
\check X=U\times(\mathbb R/\mathbb Z)^n
$

> 複素座標 $z^i=u^i+iv^i$ と次の計量・基本2形式は局所Kähler構造を与える。
>
$
> \check g=\sum_{i,j}H_{ij}(du^i\,du^j+dv^i\,dv^j),\qquad
> \check\omega=\sum_{i,j}H_{ij}\,du^i\wedge dv^j
$
>
> は局所Kähler構造を与え、そのRicci形式は0である。Legendre双対ポテンシャルは $\phi^*(t)=\frac12t^{\mathsf T}H^{-1}t$ である。
<!-- formal-statement-end -->

### 証明の見取り図

正定値性・閉性・複素座標の可積分性・Ricci形式を別々に調べる。双対側のHessianは逆行列の連鎖律から求める。

<!-- proof-start -->
### 証明

$H>0$ なので非零ベクトル $(a,b)$ に対して $a^{\mathsf T}Ha+b^{\mathsf T}Hb>0$ であり、$\check g$ は正定値である。標準複素構造 $J\partial_{u^i}=\partial_{v^i}$ に対して $\check\omega(\cdot,\cdot)=\check g(J\cdot,\cdot)$ となる。$z^i$ は局所正則座標だから可積分であり、$H$ は定数なので $d\check\omega=0$。角の整数平行移動では $du^i,dv^i$ が不変で、両形式は商へ降りる。

複素座標でのHermite計量行列は定数倍を除いて $H$ だから、[Ricci形式と実Monge–Ampère条件](../SYZ1-11/index.md#thm-syz1-11-ricci-ma)により

$$
\rho=-i\partial\bar\partial\log\det H=0.
$$

さらに $\nabla\phi=Hu$ だから $u=H^{-1}t$ となり、

$$
t^{\mathsf T}u-\tfrac12u^{\mathsf T}Hu
=\tfrac12t^{\mathsf T}H^{-1}t.
$$

以上で結論を得た。ここで証明したのは、この局所的な定数Hessian模型であり、一般のSLag束が自動的にこの $H$ を持つことではない。
<!-- proof-end -->

### 直接例：非対角なHessianも計算する

$$
H=\begin{pmatrix}2&1\\1&2\end{pmatrix},
\qquad
\det H=3,\qquad
H^{-1}=\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}.
$$

最初の主小行列式が2、行列式が3なので正定値である。$t_1=2u^1+u^2,\ t_2=u^1+2u^2$、従って $u^1=(2t_1-t_2)/3,\ u^2=(-t_1+2t_2)/3$。実際に二次式を展開すると

$$
\phi^*(t)=\frac13(t_1^2-t_1t_2+t_2^2).
$$

このとき $\det H=3$ は定数なのでRicci形式は0である。一般の変動するHessianでは $d\check\omega=0$ はHessianの対称な三階微分から従う一方、Ricci平坦には $\det H$ の条件を別途調べる必要がある。

双対トーラスの構成にはもう一つ、元のファイバーの周期格子が必要である。[ホロノミーとしての双対化](../SYZ1-10/index.md#prop-syz1-10-holonomy-dual)では、文字 $\operatorname{Hom}(H_1(L_b;\mathbb Z),U(1))$ が双対ファイバーとなる。整数アフィン遷移のため $z^i$ の指数座標がLaurent単項式で貼り合わさることは[複素貼り合わせ定理](../SYZ1-10/index.md#thm-syz1-10-complex-gluing)の結論であり、任意の滑らかな座標変換に対して成り立つわけではない。

## 4. 節点と壁：二種類の停止線を数値で見る

### 4.1 モノドロミーは格子の延長を妨げる

[節点のPicard–Lefschetz公式](../SYZ1-14/index.md#thm-syz1-14-picard-lefschetz)では、選んだ一次ホモロジー基底に対する周回行列の一例が

$$
T=\begin{pmatrix}1&1\\0&1\end{pmatrix}
$$

である。$\det T=1$ だから整数格子を保つが $T\ne I$ である。対応するコホモロジーの周回は、双対評価が不変になるように

$$
(T^{-1})^{\mathsf T}
=\begin{pmatrix}1&0\\-1&1\end{pmatrix}
$$

となる。周期の貼り合わせと格子の変換則を混同して同じ行列を使うと符号が間違う。

<a id="prop-syz1-18-monodromy-stop"></a>

<!-- formal-statement-start -->
> **命題（非自明な周回が示す延長障害）**  
> 穿孔円板 $D^*=D\setminus\{0\}$ 上の階数2整数局所系の正向き一周のモノドロミーが $T=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ とする。この局所系は、同じ局所系の構造を保ったまま、円板 $D$ 上の局所定数整数格子へ延長できない。
<!-- formal-statement-end -->

### 証明の見取り図

円板へ延長した局所定数格子なら、円板の中で収縮する閉路の周回作用は恒等になる。穿孔円板上の与えられた作用と比較する。

<!-- proof-start -->
### 証明

$D$ は単連結だから、その上の局所定数格子の任意の閉路に沿う平行移動は恒等行列である。特に $D^*$ の原点を一周する閉路も、$D$ 内では一点へ縮められるので作用は $I$ のはずである。一方、制限局所系の周回は $T$ であり、$Te_2=e_1+e_2\ne e_2$。$T$ は基底変換しても恒等にはならず、矛盾する。
<!-- proof-end -->

この命題が否定するのは**同じ滑らかな格子局所系のままの延長**である。特異ファイバーを持つ空間の別の幾何構造や、補正された鏡像そのものの存在を否定していない。

### 4.2 壁の貼り合わせには独立な入力が要る

[壁越え文字変換](../SYZ1-16/index.md#def-syz1-16-wall-automorphism)は、Maslov指数0の円板に由来する壁関数を指定した場合の局所代数模型を与える。正則円板の存在、面積・境界ホロノミー、符号付き円板計数は別のデータである。[円板重みの定義](../SYZ1-15/index.md#def-syz1-15-disk-weight)からは、壁関数の全係数まで自動的に決まらない。

形式的な計算として $R=\mathbb C[x^{\pm1},y^{\pm1}][[t]]$ 上の二つの代入

$$
A_t(x,y)=(x(1+ty),y),\qquad
B_t(x,y)=(x,y(1+tx))
$$

を考える。$t$ の次数で検算できるこの例は、[二次散乱補正](../SYZ1-17/index.md#prop-syz1-17-scattering-t2)の縮小模型である。

<a id="prop-syz1-18-scattering-stop"></a>

<!-- formal-statement-start -->
> **命題（二壁の二次不整合と条件付き補正）**  
> 上の $A_t,B_t$ について、合成の順序差は
>
$
> (A_t\circ B_t)-(B_t\circ A_t)
> =(t^2x^2y,-t^2xy^2).
$
>
> さらに $C_t(x,y)=\left(x(1+t^2xy),\,y/(1+t^2xy)\right)$ とすれば、$t^3$ を法として
>
$
> C_t\circ B_t\circ A_t=A_t\circ B_t.
$
>
> この結論は指定された形式的変換の次数2までの整合性についてのみ述べる。
<!-- formal-statement-end -->

### 証明の見取り図

二通りの合成を $t^2$ まで展開し、差を取る。補正の分母は定数項1の形式的単元なので逆数を展開できる。

<!-- proof-start -->
### 証明

$B_t$ の出力を $A_t$ に代入すると

$$
(A_t\circ B_t)(x,y)
=(x+txy+t^2x^2y,\ y+txy).
$$

逆順の代入では

$$
(B_t\circ A_t)(x,y)
=(x+txy,\ y+txy+t^2xy^2).
$$

よって表示した差が得られる。$B_t\circ A_t$ の出力を $(X,Y)$ とすると $XY=xy+O(t)$ なので

$$
X(1+t^2XY)=x+txy+t^2x^2y+O(t^3),
$$

$$
\frac{Y}{1+t^2XY}
=(y+txy+t^2xy^2)(1-t^2xy)+O(t^3)
=y+txy+O(t^3).
$$

従って $C_t\circ B_t\circ A_t$ と $A_t\circ B_t$ は $t^3$ を法として一致する。$1+t^2XY$ の定数項は1であり、形式的冪級数環では可逆である。
<!-- proof-end -->

ここでの補正 $C_t$ は**代数的に必要な変換を計算した**だけで、特定のCalabi–Yauの円板計数がこの係数を与えると証明したわけではない。さらに全次数での整合性は二次の等式からは出ない。

## 5. K3・Gross–Siebert・一般予想をつなぐ判定表

[超Kähler回転](../SYZ1-13/index.md#thm-syz1-13-hyperkahler-rotation)により、適切な計量と複素構造の変更の下で楕円K3の滑らかな楕円ファイバーをSLagとして扱える。これは**同じ複素構造のまま**正則楕円曲線がSLagになるという意味ではない。一般位置の楕円K3では[判別式の次数と24個の節点型ファイバー](../SYZ1-13/index.md#prop-syz1-13-discriminant-24)を比較でき、特異点周囲では前節の非自明なモノドロミーが現れる。

[Gross–Siebertの局所離散Legendre双対](../SYZ1-17/index.md#def-syz1-17-discrete-legendre)は、整数多面体分割と凸区分線形ポテンシャルから双対胞体を得る計算である。一方、[再構成定理の適用範囲](../SYZ1-17/index.md#thm-syz1-17-gross-siebert-scope)では、退化データ、positive/simple等の条件、log構造と整合的な補正といった追加入力が必要になる。代数的退化の再構成と、任意の対象に幾何的SLagファイブレーションが存在するという主張は論理的に別である。

| 具体的主張 | 到達した結論 | 次へ進むための仮定・不足 |
| --- | --- | --- |
| コンパクトSLagの較正・局所変形 | 較正の体積最小性、McLeanの滑らかな局所変形空間 | 大域SLagトーラス束の存在と被覆 |
| 滑らかな束の正則値集合 | 二重周期、整数アフィン構造とHessian計量 | 特異値を含む基底への延長 |
| Hessianデータを備えた局所双対束 | 複素構造、Kähler構造、条件下でRicci平坦計量 | 一般の特異域での補正付き大域貼り合わせ |
| 節点型退化 | shear行列と格子の延長障害 | 特異ファイバーを扱う別の幾何モデル |
| 指定した壁関数の代数模型 | 補正座標と有限次数の整合性 | 幾何的な円板計数・全次数・大域整合 |
| Gross–Siebert型退化データ | 条件付きの代数的再構成の枠組み | 任意のCalabi–Yauの幾何的SYZの一般証明 |

**失敗機構を二つに分ける。** $T\ne I$ は「格子を滑らかなまま特異点へ延長する」段階の障害である。$A_tB_t\ne B_tA_t$ は「壁を経由した座標貼り合わせの経路独立性」への障害である。前者を補正項だけで消したと称したり、後者からモノドロミーが自動的に消えたと結論したりできない。楕円曲線の[完全計算](../SYZ1-12/index.md#thm-syz1-12-moduli-exchange)は滑らかな一次元模型で双対化を検算するが、それだけでK3の特異領域を解決したことにはならない。

## 6. 総合演習

### Level A：各矢印の必要条件を判定する

<a id="ex-syz1-18-a01"></a>
#### SYZ1-18-A01 較正の積分とホモロジー
- Level: A

コンパクトで境界なしの向き付き $L,L'$ が同じホモロジー類を表し、$\eta$ が閉じた較正で $\eta|_L=\mathrm{vol}_L$ とする。体積不等式を全ての不等号・等号の理由とともに導け。また同じホモロジー類の仮定を外したとき、どの等号が保証されなくなるか答えよ。

<!-- solution-start -->
### 詳細解答

較正の定義より、$L'$ の各向き付き接平面で $\eta|_{L'}\le\mathrm{vol}_{L'}$。これを積分すると $\int_{L'}\eta\le\operatorname{Vol}(L')$。$[L']=[L]$ なので境界でつながる鎖上にStokesの定理を使い、$d\eta=0$ から $\int_{L'}\eta=\int_L\eta$。最後に $L$ の較正条件から $\int_L\eta=\operatorname{Vol}(L)$。ゆえに

$$
\operatorname{Vol}(L')\ge\int_{L'}\eta
=\int_L\eta=\operatorname{Vol}(L).
$$

ホモロジー類を外すと、$\int_{L'}\eta=\int_L\eta$ の根拠が失われる。点ごとの較正不等式だけは残る。
<!-- solution-end -->

<a id="ex-syz1-18-a02"></a>
#### SYZ1-18-A02 トーラスの調和1形式
- Level: A

平坦な $T^2$ で $\alpha=(2x+1)\,dx+3\,dy$ を局所座標上で考える。$d\alpha$ と $d^*\alpha$ を計算せよ。周期的なトーラス上の大域1形式となるかも判定せよ。

<!-- solution-start -->
### 詳細解答

$P=2x+1,Q=3$ と書くと

$$
d\alpha=(\partial_xQ-\partial_yP)\,dx\wedge dy=0.
$$

標準平坦計量で $d^*\alpha=-(\partial_xP+\partial_yQ)=-2$。したがって閉じていても余閉ではない。また $P(x+1,y)=P(x,y)+2$ なので $\alpha$ は周期1の商で同一の1形式にならない。局所計算での閉性だけでは大域調和1形式を得られない。
<!-- solution-end -->

<a id="ex-syz1-18-a03"></a>
#### SYZ1-18-A03 二種類の整数アフィン遷移
- Level: A

基底座標を $u'=Au+b$、$A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ と変更する。$A^{-1}$ と $(A^{-1})^{\mathsf T}$ を計算し、接ベクトルと共変ベクトルの変換則を区別せよ。

<!-- solution-start -->
### 詳細解答

$$
A^{-1}=\begin{pmatrix}1&-1\\0&1\end{pmatrix},
\qquad
(A^{-1})^{\mathsf T}=\begin{pmatrix}1&0\\-1&1\end{pmatrix}.
$$

座標微分は $du'=A\,du$ なので、接ベクトルの成分は $v'=Av$。一次形式を $p^{\mathsf T}du=p'^{\mathsf T}du'$ と書くと $p^{\mathsf T}=p'^{\mathsf T}A$、従って $p'=(A^{-1})^{\mathsf T}p$。両者を同じ行列で変換してはいけない。
<!-- solution-end -->

<a id="ex-syz1-18-a04"></a>
#### SYZ1-18-A04 非対角HessianのLegendre変換
- Level: A

$\phi(u)=\frac12u^{\mathsf T}Hu$、$H=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ とする。正定値性、$t=\nabla\phi$、$\phi^*$ を求めよ。

<!-- solution-start -->
### 詳細解答

$H$ の先頭主小行列式は2、行列式は $4-1=3$。対称行列のSylvester判定から正定値である。

$$
t=Hu=(2u^1+u^2,\ u^1+2u^2)^{\mathsf T}.
$$

逆行列は $H^{-1}=\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}$。よって $\phi^*=t^{\mathsf T}H^{-1}t-\frac12t^{\mathsf T}H^{-1}t$ なので

$$
\phi^*(t)=\frac13(t_1^2-t_1t_2+t_2^2).
$$

そのHessianは $H^{-1}$ に一致する。
<!-- solution-end -->

<a id="ex-syz1-18-a05"></a>
#### SYZ1-18-A05 節点の周回と格子の延長
- Level: A

$T=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ について、$\det T$、$T(0,1)^{\mathsf T}$、双対作用 $(T^{-1})^{\mathsf T}$ を計算せよ。円板への滑らかな局所系の延長ができない理由を述べよ。

<!-- solution-start -->
### 詳細解答

$\det T=1$、$T(0,1)^{\mathsf T}=(1,1)^{\mathsf T}$ であり、周回は恒等ではない。

$$
(T^{-1})^{\mathsf T}=\begin{pmatrix}1&0\\-1&1\end{pmatrix}.
$$

円板内で周回路は収縮できる。円板上の局所定数格子の周回作用は恒等でなければならず、$T\ne I$ と矛盾する。したがって同じ格子局所系としての延長は不可能である。
<!-- solution-end -->

### Level B：定理の仮定と失敗箇所を接続する

<a id="ex-syz1-18-b01"></a>
#### SYZ1-18-B01 McLean理論から大域存在への誤推論
- Level: B

コンパクトなSLagトーラス $L$ について $b_1(L)=n$ と分かったとする。局所変形空間の次元、非線形実現に必要な議論、大域ファイブレーションを結論できない理由を順に示せ。

<!-- solution-start -->
### 詳細解答

[線形化](../SYZ1-05/index.md#thm-syz1-05-linearization)で核は $\mathcal H^1(L)$。コンパクト境界なしなのでHodge理論を適用でき、$\dim\mathcal H^1(L)=b_1(L)=n$。次に[無障害性定理](../SYZ1-06/index.md#thm-syz1-06-mclean-unobstructed)は、値域を完全形式へ限定し右逆と楕円型陰関数定理を使って、核の近傍の各パラメータから実際の局所変形を構成する。

しかし得たものは**元の部分多様体の近くの解空間**である。すべての点があるSLagファイバーに属すること（全射性）、異なるファイバーが交わらないこと、特異値を跨いだ大域的な連続性は示していない。従って滑らかな大域写像 $\pi:X\to B$ の存在を結論する推論には不足がある。
<!-- solution-end -->

<a id="ex-syz1-18-b02"></a>
#### SYZ1-18-B02 HessianのKähler条件とRicci条件
- Level: B

$U=\{u^1>0\}\subset\mathbb R^2$ 上で $\phi(u)=\frac12((u^1)^2+(u^2)^2)+\frac{\varepsilon}{6}(u^1)^3$、$\varepsilon>0$ とする。Hessianの正定値、$\check\omega$ の閉性、$\det H$ が定数かどうかを判定し、Ricci平坦性について何が言えるか計算せよ。

<!-- solution-start -->
### 詳細解答

一次・二次微分から

$$
H=\begin{pmatrix}1+\varepsilon u^1&0\\0&1\end{pmatrix},
\qquad \det H=1+\varepsilon u^1>0.
$$

$u^1>0$ により両対角成分が正で、$H$ は正定値である。$\check\omega=(1+\varepsilon u^1)\,du^1\wedge dv^1+du^2\wedge dv^2$ について

$$
d\check\omega=\varepsilon\,du^1\wedge du^1\wedge dv^1=0.
$$

従ってKähler条件は満たす。しかし $\log\det H=\log(1+\varepsilon u^1)$ は定数でなく、二階微分は

$$
\frac{\partial^2}{\partial(u^1)^2}\log\det H
=-\frac{\varepsilon^2}{(1+\varepsilon u^1)^2}\ne0.
$$

[semi-flat Ricci形式の式](../SYZ1-11/index.md#thm-syz1-11-ricci-ma)では、この非零の複素二階微分がRicci形式に寄与するのでRicci平坦ではない。KählerであることとRicci平坦であることを混同できない。
<!-- solution-end -->

<a id="ex-syz1-18-b03"></a>
#### SYZ1-18-B03 壁の二経路と二次補正
- Level: B

$A_t(x,y)=(x(1+ty),y)$、$B_t(x,y)=(x,y(1+tx))$ とする。二経路が何次で初めて違うか求め、$C_t(x,y)=\bigl(x(1+t^2xy),y/(1+t^2xy)\bigr)$ を用いた補正後の等式を次数付きで検算せよ。

<!-- solution-start -->
### 詳細解答

代入をそのまま展開すると

$$
A_tB_t=(x+txy+t^2x^2y,\ y+txy),
$$

$$
B_tA_t=(x+txy,\ y+txy+t^2xy^2).
$$

一次の係数までは一致し、二次の差は $(t^2x^2y,-t^2xy^2)$。後者の座標 $(X,Y)$ に $C_t$ をかけると $XY=xy+O(t)$ なので

$$
C_t(X,Y)
=(X+t^2X^2Y,\ Y-t^2XY^2)+O(t^3)
=(x+txy+t^2x^2y,\ y+txy)+O(t^3).
$$

よって $C_tB_tA_t\equiv A_tB_t\pmod{t^3}$。これは全次数での等式を意味せず、円板計数から $C_t$ が出るという主張でもない。
<!-- solution-end -->

<a id="ex-syz1-18-b04"></a>
#### SYZ1-18-B04 離散双対と再構成の論理的境界
- Level: B

$\psi(u,v)=\max(0,2u,v)$ の傾き双対多面体と凸共役を求めよ。また $xy=t$ の局所退化模型が存在することだけから、一般の幾何的SYZ予想を結論できない理由を二つ以上挙げよ。

<!-- solution-start -->
### 詳細解答

傾きは $(0,0),(2,0),(0,1)$。凸結合 $(p,q)=(2a,b)$ に $a,b\ge0$、$a+b\le1$ を課すので

$$
\Delta_\psi=\{(p,q):p\ge0,\ q\ge0,\ p/2+q\le1\}.
$$

内部では $pu+qv=a(2u)+b v+(1-a-b)0\le\psi(u,v)$、原点で等号。外側で $p<0$ なら $u\to-\infty$、$q<0$ なら $v\to-\infty$、$p/2+q>1$ なら $(u,v)=(s/2,s)$ とすると、$pu+qv-\psi(u,v)$ が $+\infty$ へ発散する。従って $\psi^*$ は $\Delta_\psi$ 上0、外側 $+\infty$。

$xy=t$ は中心ファイバーが二直線、$t\ne0$ のファイバーは $\mathbb C^*$ という**非コンパクトな局所模型**である。コンパクトな偏極退化の大域データ、log貼り合わせ、全次数の整合性を与えておらず、さらに幾何的なSLagトーラス束の存在はこの代数的関係式から出ない。[再構成定理の適用条件](../SYZ1-17/index.md#thm-syz1-17-gross-siebert-scope)を確認する前に大域結論へ進むことはできない。
<!-- solution-end -->

### Level C：証明できる矢印を最後まで再構成する

<a id="ex-syz1-18-c01"></a>
#### SYZ1-18-C01 平坦な模型・特異性・壁の三段階
- Level: C

次の三つは**別々の入力模型**である。互いの存在を無断に推論せず、それぞれを計算せよ。

1. 滑らかな束の局所モデルとして $U\subset\mathbb R^2$、$\phi(u)=\frac12u^{\mathsf T}Hu$、$H=\begin{pmatrix}3&1\\1&2\end{pmatrix}$、周期1の角 $v$ を与える。正定値性、Legendre双対、複素座標、Kähler形式、Ricci形式を求めよ。
2. 別に穿孔円板上の整数格子局所系に $T=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ というモノドロミーを与える。滑らかな格子延長が不可能であることを示し、（1）の構成のどの仮定が使えなくなるかを述べよ。
3. さらに $R=\mathbb C[x^{\pm1},y^{\pm1}][[t]]$ 上で $A_t,B_t,C_t$ を前問と同様に指定する。二経路の差と二次補正を計算し、（1）〜（3）から証明できない一般的主張を二つ挙げよ。

<!-- solution-start -->
### 詳細解答

**1. 滑らかなsemi-flat模型。** $H$ は対称で第一主小行列式が3、行列式が $3\cdot2-1=5$。従って正定値である。勾配と逆写像を計算すると

$$
t=Hu=(3u^1+u^2,\ u^1+2u^2)^{\mathsf T},\qquad
u=\frac15\begin{pmatrix}2&-1\\-1&3\end{pmatrix}t.
$$

よって

$$
\phi^*(t)=\frac1{10}(2t_1^2-2t_1t_2+3t_2^2).
$$

複素座標 $z^i=u^i+iv^i$ として

$$
\check\omega=3\,du^1\wedge dv^1
+du^1\wedge dv^2+du^2\wedge dv^1
+2\,du^2\wedge dv^2.
$$

$\check g$ は同じ $H$ を $du$ と $dv$ の両方に用いる。正定値性と定数係数による閉性からKählerである。$\det H=5$ が定数なので $\rho=-i\partial\bar\partial\log5=0$。角の整数平行移動によって微分形式は不変なので局所トーラス商に降りる。

**2. 節点型の停止線。** $T(0,1)^{\mathsf T}=(1,1)^{\mathsf T}$ なので周回作用は非自明である。もしこの局所系が円板全体の局所定数格子へ延長すれば、円板で収縮可能な周回路の作用は恒等であるはずで矛盾する。（1）の局所チャート自体は穿孔円板の小領域で構成できるが、**同じ滑らかな周期格子を特異点へ延長して一つのsemi-flat模型にする**段階は正当化できない。

**3. 二経路と補正。** $B_t$ の後に $A_t$ を代入した式は

$$
A_tB_t=(x+txy+t^2x^2y,\ y+txy).
$$

逆順では

$$
B_tA_t=(x+txy,\ y+txy+t^2xy^2).
$$

従って差は $(t^2x^2y,-t^2xy^2)$。$B_tA_t=(X,Y)$ と置けば $XY=xy+O(t)$、形式的な逆数の展開は $(1+t^2XY)^{-1}=1-t^2XY+O(t^4)$ だから

$$
C_tB_tA_t
=(x+txy+t^2x^2y,\ y+txy)+O(t^3)
\equiv A_tB_t\pmod{t^3}.
$$

**論理上の結論。** （1）は入力した正定値Hessianを持つ局所模型のKähler・Ricci平坦性、（2）は同じ格子の滑らかな延長障害、（3）は指定した形式的壁変換の二次整合性を証明する。それでも任意のCalabi–Yau上に大域SLagトーラス・ファイブレーションが存在すること、実際の円板計数がこの壁関数を与え全次数で整合すること、特異域を含む鏡像を一般に再構成できることは出ない。これらには本問にない存在・解析・大域貼り合わせの仮定が必要である。
<!-- solution-end -->

## 7. 系列の到達点

較正によりSLagの体積最小性を確認し、McLean理論でコンパクトSLagの局所変形空間を得た。滑らかな束を**別に仮定した場合**には、二組の周期・整数アフィン構造・Hessian計量からsemi-flat双対化を計算できる。節点モノドロミーは滑らかな格子延長の障害を、円板の壁は補正された座標貼り合わせへの新しい入力の必要性を示す。Gross–Siebert型の代数的再構成はさらに別の退化データと仮定を要する。

このように、**証明した命題の仮定を次の矢印へ持ち越す**ことが、特殊Lagrange幾何からSYZ予想までを誤解なく読む方法である。