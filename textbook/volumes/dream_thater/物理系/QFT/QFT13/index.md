# QFT13 木レベル散乱・交差対称性と光学定理

<!-- definition-example-audit: strict -->

[QFT12の断面積公式](../QFT12/index.md#prop-qft12-cm-cross-section)によって、振幅を測定可能な反応率へ変える準備ができました。しかし四次頂点だけの一定振幅では、入射エネルギーや散乱角によって振幅が変わる仕組みが見えません。また木レベル振幅の二乗は正なのに、単位的な $S$ 行列には虚部が必要になる、という一見した矛盾も残ります。

この章では、一つの実スカラー場の三次・四次相互作用から内部線の運動量が異なる三つの図を数え、外線の入出射を入れ替える操作がなぜ**解析的振幅**についての主張なのかを区別します。最後に $S^\dagger S=I$ から光学定理を導き、木レベルと1ループで摂動次数がどう釣り合うかまで確認します。

時空は $3+1$ 次元、計量は $\eta=\operatorname{diag}(1,-1,-1,-1)$、$\hbar=c=1$ とします。質量 $m>0$ の実スカラー粒子が安定な漸近外線を与える弱結合領域を仮定し、運動量保存デルタを除いた連結振幅を

$$
\langle f|iT|i\rangle_c=i(2\pi)^4\delta^{(4)}(P_f-P_i)\mathcal M_{i\to f},
\qquad S=I+iT
$$

と記します。[QFT11のLSZ外線規格化](../QFT11/index.md#def-qft11-lsz-amputation)を用い、外線の波動関数留数は木レベルで $Z=1$ とします。以下の散乱は $s>4m^2$ の重心系を主に扱い、質量殻 $p_a^2=m^2$ とエネルギー正値を課します。ループの積分は後続講義で扱うため、最後の虚部は $S$ 行列が確率を保存するために必要な値として求めます。

## 1. 一本の内部線が角度依存を作る

相互作用を

$$
\mathcal L_I=-\frac{g}{3!}\phi^3-\frac{\lambda}{4!}\phi^4
$$

とします。$[\phi]=1$、$[g]=1$、$[\lambda]=0$ です。三次項単独ではポテンシャルが下に有界でないため、必要なら正の四次結合などで安定化した模型の真空近傍における摂動展開と解釈します。$m>0$ の一粒子から同質量二粒子への崩壊は質量殻上で禁止されますが、それだけで任意の結合における厳密な真空安定性を証明したわけではありません。

[QFT10の頂点則](../QFT10/index.md#thm-qft10-vertex-factor)から三次頂点は $-ig$、四次頂点は $-i\lambda$ です。三次頂点を二つ結んだ図では、内部四運動量が $p_1+p_2$、$p_1-p_3$、$p_1-p_4$ の三種類あります。[QFT12のMandelstam不変量](../QFT12/index.md#def-qft12-mandelstam)に従い、それぞれの二乗を $s,t,u$ と書きます。

<a id="def-qft13-exchange-channels"></a>

<!-- formal-statement-start -->
> **定義（三つの交換チャネル）**
>
> 等質量 $m>0$ の実スカラーに対する $p_1+p_2\to p_3+p_4$ の散乱で、全ての外線を質量殻上に置き、$p_1,p_2$ を入射、$p_3,p_4$ を出射とする。三次頂点二個を一本の内部線で結ぶ木図を、内部運動量の二乗が

$$
q_s^2=(p_1+p_2)^2=s,\qquad
q_t^2=(p_1-p_3)^2=t,\qquad
q_u^2=(p_1-p_4)^2=u
$$

> となる順に **$s$、$t$、$u$ チャネル交換図**と呼ぶ。これは内部線の運動量割当ての分類であって、三つの異なる実験の断面積を足すという定義ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft13-exchange-channels -->
### 例：直角散乱で三本の内部線を区別する

**定義の確認**：重心系で $p_1=(E,0,0,p)$、$p_2=(E,0,0,-p)$、$p_3=(E,p,0,0)$、$p_4=(E,-p,0,0)$ と置き、$E^2=p^2+m^2$ とします。四本とも質量殻上、正エネルギーで総運動量は保存します。定義の各内部運動量を直接二乗すると

$$
q_s=(2E,0,0,0),\quad q_s^2=4E^2,\qquad
q_t=(0,-p,0,p),\quad q_t^2=-2p^2,\qquad
q_u=(0,p,0,p),\quad q_u^2=-2p^2.
$$

したがって $s=4(m^2+p^2)$、$t=u=-2p^2$ です。方向の交換で $t,u$ は入れ替わりますが、$s$ は変わりません。
<!-- definition-example-end -->

<a id="prop-qft13-tree-amplitude"></a>

<!-- formal-statement-start -->
> **命題（実スカラーの三チャネル木レベル振幅）**
>
> 質量 $m>0$ の実スカラー場の相互作用が $\mathcal L_I=-g\phi^3/3!-\lambda\phi^4/4!$ で、安定な外線とLSZ規格化が摂動的に存在するとする。$2\to2$ の連結振幅の木レベル（四次頂点一次および三次頂点二次）で、内部伝播関数の極を避ければ

$$
\boxed{\displaystyle
\mathcal M_{\rm tree}(s,t,u)
=-\lambda-g^2\left(\frac1{s-m^2+i\varepsilon}
+\frac1{t-m^2+i\varepsilon}
+\frac1{u-m^2+i\varepsilon}\right)}.
$$

> $i\varepsilon$ は内部線のFeynman処方を表し、物理的な等質量弾性領域 $s>4m^2$、$t,u\le0$ では各分母が零でないため $\varepsilon\downarrow0$ とできる。三つの交換振幅は**二乗する前に**足す。
<!-- formal-statement-end -->

### 証明の見取り図

四次頂点一本と、二個の三次頂点を結ぶ三種類の木図を作ります。内部線の $i/(q^2-m^2+i\varepsilon)$ を掛け、$i\mathcal M$ の係数を取り出すと、三つとも同じ符号の分母になります。

<!-- proof-start -->
### 証明

[QFT10の運動量空間頂点則](../QFT10/index.md#prop-qft10-momentum-vertex)で外線四本を四次頂点に結ぶ寄与は $-i\lambda$ です。三次頂点を二つ使う図は、外線四本を二本ずつに分けて各頂点につなぎます。ラベル付き外線の集合の分割は

$$
\{1,2\}|\{3,4\},\quad
\{1,3\}|\{2,4\},\quad
\{1,4\}|\{2,3\}
$$

の三つです。入射 $p_1,p_2$ と出射 $p_3,p_4$ の向きを考慮すると、内部線の四運動量はそれぞれ $q_s=p_1+p_2$、$q_t=p_1-p_3$、$q_u=p_1-p_4$ です。各分割のWick収縮の階乗は [頂点則](../QFT10/index.md#thm-qft10-vertex-factor) の $1/(3!)^2$ とDyson級数の $1/2!$ に対応して相殺され、各ラベル付き木図の係数は1です。

例えば $s$ チャネルでは

$$
(-ig)\frac{i}{s-m^2+i\varepsilon}(-ig)
=-\frac{ig^2}{s-m^2+i\varepsilon}.
$$

$t,u$ でも内部線の運動量だけを変えて同じ計算を行います。四次接触図を足すと

$$
i\mathcal M_{\rm tree}
=-i\lambda-ig^2\sum_{x\in\{s,t,u\}}\frac1{x-m^2+i\varepsilon}.
$$

両辺を $i$ で割って結論を得ます。等質量の物理領域では $s-m^2>3m^2$、$t-m^2\le-m^2$、$u-m^2\le-m^2$ なので分母は消えません。
<!-- proof-end -->

重心系では[QFT12の運動学](../QFT12/index.md#prop-qft12-cm-momentum)から

$$
p^2=\frac{s}{4}-m^2,\qquad
t=-2p^2(1-z),\quad u=-2p^2(1+z),\quad z=\cos\theta.
$$

$z\mapsto-z$ は $t\leftrightarrow u$ を交換します。従って同種スカラーの $\mathcal M_{\rm tree}$ は $z$ の偶関数です。断面積では最終二粒子の $1/2!$ をさらに掛けますが、これは振幅内の三図の数え上げとは別の操作です。

<a id="prop-qft13-angular-scattering"></a>

<!-- formal-statement-start -->
> **命題（三チャネル振幅の角度分布と閾値極限）**
>
> 上の実スカラーの等質量弾性散乱を $s>4m^2$ の重心系で考え、$\lambda,g$ を実数とする。木レベル振幅の最低非零次数で

$$
\frac{d\sigma}{d\Omega}
=\frac{|\mathcal M_{\rm tree}(s,z)|^2}{128\pi^2s},\qquad
\sigma_{\rm tree}=\frac1{64\pi s}\int_{-1}^{1}|\mathcal M_{\rm tree}(s,z)|^2\,dz.
$$

> ここで $z=\cos\theta$、$\mathcal M_{\rm tree}(s,z)=\mathcal M_{\rm tree}(s,-z)$ であり、閾値 $s\downarrow4m^2$ では

$$
\mathcal M_{\rm tree}\longrightarrow-\lambda+\frac{5g^2}{3m^2},\qquad
\sigma_{\rm tree}\longrightarrow
\frac{|-\lambda+5g^2/(3m^2)|^2}{128\pi m^2}.
$$

> この極限は正の入射運動量から取る。木近似は厳密な単位的断面積の保証ではない。
<!-- formal-statement-end -->

### 証明の見取り図

弾性なので位相空間の出入射運動量比は1です。同種終状態因子2を入れた角度分布を全角積分します。閾値では $t,u\to0$、$s\to4m^2$ を三つの分母へ順に代入します。

<!-- proof-start -->
### 証明

[QFT12の微分断面積](../QFT12/index.md#prop-qft12-cm-cross-section)で $p_f/p_i=1$、$S_f=2!$ とすると $d\sigma/d\Omega=|\mathcal M|^2/(128\pi^2s)$ です。振幅は方位角に依存しないので、$d\Omega=d\varphi\,dz$ を積分して

$$
\sigma=\frac{2\pi}{128\pi^2s}\int_{-1}^{1}|\mathcal M(s,z)|^2dz
=\frac1{64\pi s}\int_{-1}^{1}|\mathcal M(s,z)|^2dz.
$$

次に $s\downarrow4m^2$ で $p^2\to0$ なので $t,u\to0$ です。[木振幅](#prop-qft13-tree-amplitude)の括弧内は

$$
\frac1{4m^2-m^2}+\frac1{-m^2}+\frac1{-m^2}
=\frac1{3m^2}-\frac2{m^2}=-\frac5{3m^2}.
$$

したがって振幅は $-\lambda+5g^2/(3m^2)$ に一様に収束し、角度積分はその絶対値二乗の2倍となります。$s\to4m^2$ を代入すれば $2/(64\pi\,4m^2)=1/(128\pi m^2)$ です。
<!-- proof-end -->

## 2. 交差対称性はどの量のどの領域を結ぶか

入射と出射を入れ替えると、単純に $s$ と $t$ の名前が変わるように見えます。しかし正エネルギーの四運動量を符号反転すると、元の物理領域からは外れます。対応づけるべき対象は観測された断面積ではなく、外線の符号を揃えた時間順序四点関数から作る**解析的な不変振幅**です。

<a id="def-qft13-all-incoming"></a>

<!-- formal-statement-start -->
> **定義（全入射表示と交差された運動学）**
>
> $2\to2$ の四運動量 $p_1+p_2=p_3+p_4$ に対し、全外線を入射向きにした四運動量を

$$
k_1=p_1,\quad k_2=p_2,\quad k_3=-p_3,\quad k_4=-p_4,
\qquad \sum_{a=1}^4 k_a=0
$$

> と定める。全入射表示の四点振幅 $A(k_1,k_2,k_3,k_4)$ は各 $k_a^2=m^2$ での切断済み連結四点関数の係数であり、物理的散乱振幅は入出射のエネルギー符号に合わせたその境界値とする。外線の一つを反対側へ移す**交差**は、$k_a$ の符号と外線の粒子・反粒子種を適切に変え、別の物理領域へ解析接続した振幅を比較する操作である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft13-all-incoming -->
### 例：入射2番と出射3番の交換

**定義の確認**：もとの全入射変数は $(p_1,p_2,-p_3,-p_4)$ で、和が零、各二乗は $m^2$ です。2番と3番を置換した組 $(p_1,-p_3,p_2,-p_4)$ も和が零で同じ質量殻条件を満たします。この表示で新しい「最初の二本」を足すと $(p_1-p_3)^2=t$、以前の $s$ は新しい $t$ へ移ります。ただし $-p_3$ はもとの物理領域では負エネルギーです。これをそのまま正エネルギーの入射粒子と呼ばず、別領域で正エネルギーになる境界値へ解析接続する必要があります。
<!-- definition-example-end -->

<a id="prop-qft13-crossing-tree"></a>

<!-- formal-statement-start -->
> **命題（同一実スカラー四点木振幅の交差関係）**
>
> 質量 $m>0$ の同一実スカラー四本の切断済み連結四点木振幅を、$s+t+u=4m^2$ かつ $s,t,u\ne m^2$ で考える。三次・四次相互作用 $-g\phi^3/3!-\lambda\phi^4/4!$ の木レベルで、全入射外線の任意の置換は $s,t,u$ の置換を誘導し、

$$
\mathcal M_{\rm tree}(s,t,u)
=\mathcal M_{\rm tree}(t,s,u)
=\mathcal M_{\rm tree}(u,t,s)
$$

> が分数式の恒等式として成り立つ。別チャネルの**物理的振幅**を対応づけるには、それぞれの正エネルギー質量殻に対応する境界値への解析接続（ループでは極・分岐切断と $i\varepsilon$ の指定）を要する。異種・荷電場なら交差した外線の反粒子種やスピン・統計符号も合わせて変える。
<!-- formal-statement-end -->

### 証明の見取り図

全入射四運動量の対の和の二乗は $s,t,u$ の三通りです。四本の同一場の木図はこの三通りを対称に足すため、置換しても式が変わりません。ただしこれは解析式の同一性であり、物理的位相空間の同一性ではありません。

<!-- proof-start -->
### 証明

$k_1+k_2+k_3+k_4=0$ と $k_a^2=m^2$ を使うと、例えば

$$
(k_1+k_2)^2=s,\qquad
(k_1+k_3)^2=t,\qquad
(k_1+k_4)^2=u.
$$

$k_2\leftrightarrow k_3$ では最初の二つが交換され、第三は変わりません。同様に $k_2\leftrightarrow k_4$ では $s\leftrightarrow u$ です。これらの置換で三変数の任意の置換が生成されます。[木振幅の式](#prop-qft13-tree-amplitude)は定数 $-\lambda$ と $\sum_{x\in\{s,t,u\}}-g^2/(x-m^2+i\varepsilon)$ の和なので不変です。質量殻の恒等式 $s+t+u=4m^2$ は[QFT12の運動学](../QFT12/index.md#prop-qft12-cm-momentum)によります。

一方、元の正エネルギー弾性領域では $s\ge4m^2$、$t,u\le0$ です。$s$ と $t$ を交換した実数組は、元の入射2粒子に対する $s\ge4m^2$ を一般に満たしません。従って同じ物理的散乱角での $d\sigma/d\Omega$ が等しいとは結論できません。木レベルでは極を避けた分数式を複素変数へ延長して比較でき、ループで現れる分岐切断の境界値には追加の解析性仮定が必要です。一般の経路に沿う解析接続の定理は複素解析で扱うもので、ここではその一般構成を前提として使いません。
<!-- proof-end -->

実スカラーは自身が反粒子です。これでも交差を「反応 $s$ の全断面積＝反応 $t$ の全断面積」とすることはできません。[QFT12の入射流束・終状態位相空間](../QFT12/index.md#thm-qft12-rate-formulas)は各物理領域で別々に評価するからです。

## 3. 確率保存から光学定理へ

ここまでは図を低次まで足しただけで、確率が1に保存されることは検証していません。散乱理論の $S$ 行列がユニタリなら、前方への**虚部**が全ての許された終状態への遷移確率を数えます。なぜ虚部なのかは $S=I+iT$ をそのまま展開すると分かります。

<a id="def-qft13-inclusive-sum"></a>

<!-- formal-statement-start -->
> **定義（終状態全体への包摂和）**
>
> 安定な漸近粒子で完全な入出射状態空間を構成できる理論で、初期状態 $i$ から許される全終状態 $X$ への、保存デルタを除いた不変振幅を $\mathcal M_{i\to X}$ とする。相対論的に規格化した外線について、ラベル付き正エネルギー終状態位相空間 $d\Phi_X$ での包摂和を

$$
\mathcal I_i=\sum_X\frac1{S_X}\int d\Phi_X\,
|\mathcal M_{i\to X}|^2
$$

> と定める。$S_X$ は同種終状態の重複計数を除く因子で、和はエネルギー・運動量を保存する全ての粒子数・種・スピンなどにわたる。波束または有限箱での正規化・極限が成立すると仮定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft13-inclusive-sum -->
### 例：等質量スカラーの二体終状態

**定義の確認**：初期全運動量 $P=(\sqrt s,\boldsymbol0)$、$s>4m^2$ とし、終状態を同種実スカラー二粒子だけに制限します。[QFT12の位相空間](../QFT12/index.md#def-qft12-phase-space)は二つの正エネルギー質量殻と保存デルタを含み、同種二粒子なので $S_X=2!$ です。振幅が一定の $\mathcal M=-\lambda$ なら

$$
\mathcal I_i^{(2)}
=\frac{\lambda^2}{2}\int d\Phi_2
=\frac{\lambda^2}{2}\frac{p}{4\pi\sqrt s}
=\frac{\lambda^2}{8\pi}\frac{p}{\sqrt s},
\qquad p=\sqrt{\frac{s}{4}-m^2}.
$$

この例は終状態全体ではなく二体成分を具体的に取り出しています。高次では他の終状態や振幅も含めなければなりません。
<!-- definition-example-end -->

<a id="thm-qft13-optical-theorem"></a>

<!-- formal-statement-start -->
> **定理（S行列の単位性と前方光学定理）**
>
> 正規化した漸近入出射波束で $S=I+iT$ がユニタリであり、その運動量保存デルタを取り除いた連結不変振幅と全終状態位相空間への移行が正当化できるとする。初期二粒子の全四運動量を $P$ とし、入射流束の不変量 $\mathcal F>0$ を[QFT12の定義](../QFT12/index.md#def-qft12-rate-cross-section)と同じものとする。このとき

$$
-i(T-T^\dagger)=T^\dagger T,\qquad
2\operatorname{Im}\mathcal M_{i\to i}(s,t=0)
=\sum_X\frac1{S_X}\int d\Phi_X\,|\mathcal M_{i\to X}|^2.
$$

> 従って右辺が全許容終状態の断面積を含む場合、

$$
\boxed{\displaystyle
\operatorname{Im}\mathcal M_{i\to i}(s,0)
=2\mathcal F\,\sigma_{\rm tot}(s)}.
$$

> ここで $t=0$ は初期状態と同一の運動量・内部状態へ戻る前方の弾性振幅を意味する。一般の長距離相互作用、非存在の厳密な漸近状態、赤外発散などには、上記の仮定を再検討する必要がある。
<!-- formal-statement-end -->

### 証明の見取り図

$S^\dagger S=I$ に $I+iT$ を代入し、初期状態による対角行列要素を取ります。途中で完全な終状態を挿入すると絶対値二乗の和になります。最後に共通の保存デルタを除き、断面積を定義する流束 $4\mathcal F$ で整理します。

<!-- proof-start -->
### 証明

$S^\dagger=I-iT^\dagger$ なので

$$
\begin{aligned}
I&=S^\dagger S=(I-iT^\dagger)(I+iT)\\
&=I+i(T-T^\dagger)+T^\dagger T.
\end{aligned}
$$

従って $-i(T-T^\dagger)=T^\dagger T$ です。正規化された波束 $|i\rangle$ で対角行列要素を取れば、左辺は

$$
-i\bigl(\langle i|T|i\rangle-
\langle i|T|i\rangle^*\bigr)
=2\operatorname{Im}\langle i|T|i\rangle
$$

です。右辺には完全性 $I=\sum_X\int|X\rangle\langle X|$ を挿入し、

$$
\langle i|T^\dagger T|i\rangle
=\sum_X\int\langle i|T^\dagger|X\rangle\langle X|T|i\rangle
=\sum_X\int|\langle X|T|i\rangle|^2
$$

とします。同種終状態をラベル付きで積分するなら $1/S_X$ が必要です。有限箱・有限時間または局在波束の極限で、両辺に共通する全運動量保存デルタと規格化を処理すると、[QFT11の不変外線規格化](../QFT11/index.md#def-qft11-invariant-packet)に対応した式

$$
2\operatorname{Im}\mathcal M_{i\to i}(s,0)
=\sum_X\frac1{S_X}\int d\Phi_X|\mathcal M_{i\to X}|^2
$$

を得ます。右辺は[QFT12の断面積定理](../QFT12/index.md#thm-qft12-rate-formulas)によって $4\mathcal F\,\sigma_{\rm tot}$ なので、両辺を2で割れば $\operatorname{Im}\mathcal M_{i\to i}=2\mathcal F\sigma_{\rm tot}$ です。この操作は確率率と波束極限が存在するという仮定の下で行っており、任意の相互作用についての $S$ 行列構成の証明ではありません。
<!-- proof-end -->

### 摂動次数の整合性

純粋な四次相互作用（$g=0$）の木振幅は[QFT11の四次頂点計算](../QFT11/index.md#prop-qft11-quartic-tree)より $\mathcal M^{(1)}=-\lambda$ で実数です。光学定理を $\lambda$ の次数で比べると

$$
\mathcal M=\lambda M_1+\lambda^2 M_2+O(\lambda^3),\qquad
2\operatorname{Im}(\lambda M_1)=0,
\quad |\mathcal M|^2=\lambda^2|M_1|^2+O(\lambda^3).
$$

つまり木レベルの $\operatorname{Im}\mathcal M=0$ と正の木レベル断面積は**異なる次数**なので矛盾しません。$\lambda^2$ の次数では虚部を持つループ振幅が必要です。

ループの二本の内部線が同時に正エネルギー質量殻へ乗るような寄与は、二体終状態の位相空間と結びつきます。以下ではループ積分そのものを解かず、単位性が要求する虚部を求めます。

<a id="prop-qft13-unitarity-order"></a>

<!-- formal-statement-start -->
> **命題（四次スカラー相互作用で単位性が要求する虚部）**
>
> $m>0$ の同種実スカラーが $\mathcal L_I=-\lambda\phi^4/4!$ に従い、$s>4m^2$ の二粒子弾性散乱が摂動的に定義できるとする。最低次数の振幅が $\mathcal M^{(1)}=-\lambda$ で、$O(\lambda^2)$ の包摂和に寄与する終状態は二粒子だけと仮定する。このとき光学定理が要求する前方の次次数虚部は

$$
\boxed{\displaystyle
\operatorname{Im}\mathcal M^{(2)}(s,0)
=\frac{\lambda^2}{32\pi}
\sqrt{1-\frac{4m^2}{s}}}.
$$

> これは単位性から決まる吸収部分であり、1ループ積分の実部・反項や全振幅を計算した主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

最低次数の終状態二粒子に $1/2!$ を掛け、[QFT12の二体位相空間](../QFT12/index.md#prop-qft12-two-body-phase-space)を積分します。光学定理の左辺は $2\operatorname{Im}\mathcal M^{(2)}$ です。

<!-- proof-start -->
### 証明

同種終状態についての[包摂和の定義](#def-qft13-inclusive-sum)から $\lambda^2$ の係数は

$$
\begin{aligned}
2\operatorname{Im}\mathcal M^{(2)}(s,0)
&=\frac1{2!}\int d\Phi_2\,|-\lambda|^2\\
&=\frac{\lambda^2}{2}\frac{p}{4\pi\sqrt s}
=\frac{\lambda^2p}{8\pi\sqrt s}.
\end{aligned}
$$

$p=\sqrt{s/4-m^2}=(\sqrt s/2)\sqrt{1-4m^2/s}$ を代入し、2で割って

$$
\operatorname{Im}\mathcal M^{(2)}
=\frac{\lambda^2p}{16\pi\sqrt s}
=\frac{\lambda^2}{32\pi}\sqrt{1-\frac{4m^2}{s}}
$$

を得ます。独立の検算として[QFT12の四次散乱全断面積](../QFT12/index.md#prop-qft12-quartic-total)の $\sigma^{(2)}=\lambda^2/(32\pi s)$ を $2\mathcal F=2p\sqrt s$ へ掛けると $\lambda^2p/(16\pi\sqrt s)$ となり、同じ虚部です。
<!-- proof-end -->

この虚部は $s\downarrow4m^2$ で二体位相空間とともに零へ向かいます。ループの分岐点は、木レベルの内部粒子極 $s=m^2$ と異なる解析構造です。また光学定理の包摂和で現れる中間状態は**質量殻上**ですが、木交換図の内部伝播関数は一般に質量殻外です。この二者を取り違えないことが重要です。

## 4. 演習：チャネル交換から単位性の検算まで

特に断らなければ $3+1$ 次元、$\eta=(+---)$、$c=\hbar=1$、$m>0$、正エネルギーの同種実スカラー外線を仮定します。$\mathcal L_I=-g\phi^3/3!-\lambda\phi^4/4!$ の木レベル振幅はこの章の式を用いてよく、結合は実数、十分弱く、漸近散乱状態が摂動的に存在するとします。観測量は示した摂動次数までで計算します。

### Level A：外線と係数を一つずつ確認する

### 演習 QFT13-A1：重心系の三つの内部運動量

等質量 $m$ の弾性 $2\to2$ 散乱で、重心系の運動量の大きさが $p>0$、散乱角が $\theta$ である。三次相互作用の内部運動量の二乗 $s,t,u$ を $p,m,z=\cos\theta$ で表せ。また $s+t+u$ を確かめよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[三つの交換チャネル](#def-qft13-exchange-channels)より $s=(p_1+p_2)^2=4E^2=4(m^2+p^2)$ です。散乱の入出射エネルギーは等しく、空間運動量の内積は $p^2z$ なので

$$
t=(p_1-p_3)^2=2m^2-2(E^2-p^2z)
=-2p^2(1-z).
$$

出射4の方向は3と反対だから $\boldsymbol p_1\cdot\boldsymbol p_4=-p^2z$ となり、$u=-2p^2(1+z)$ です。足すと $4(m^2+p^2)-2p^2(1-z)-2p^2(1+z)=4m^2$ で、[QFT12の質量殻恒等式](../QFT12/index.md#prop-qft12-cm-momentum)と一致します。
<!-- solution-end -->

### 演習 QFT13-A2：三次頂点二つの符号

三次頂点 $-ig$ を二個、Feynman伝播関数 $i/(q^2-m^2+i\varepsilon)$ を一本持つラベル付き木図の寄与を $i\mathcal M_q$ と書け。$q^2=s$ の場合を計算し、$t$ と $u$ に置き換える際の係数を答えよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[頂点因子](../QFT10/index.md#thm-qft10-vertex-factor)と伝播関数を掛けると

$$
i\mathcal M_q=(-ig)^2\frac{i}{q^2-m^2+i\varepsilon}
=(-g^2)\frac{i}{q^2-m^2+i\varepsilon}.
$$

したがって $\mathcal M_s=-g^2/(s-m^2+i\varepsilon)$ です。$t,u$ の図も同じ係数 $-g^2$ で分母のみ $t-m^2+i\varepsilon$、$u-m^2+i\varepsilon$ に変えます。頂点順序の $2!$ はDyson展開の $1/2!$ と相殺され、さらに2を掛けません。
<!-- solution-end -->

### 演習 QFT13-A3：全入射変数の交換

全入射外線を $(k_1,k_2,k_3,k_4)=(p_1,p_2,-p_3,-p_4)$ とし、$k_2$ と $k_3$ を入れ替える。変換後の対の二乗 $(k_1+k_2)^2$、$(k_1+k_3)^2$ が元の $s,t,u$ のどれになるか答え、物理的交差反応と呼ぶ前に必要な注意を述べよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[全入射表示の定義](#def-qft13-all-incoming)では元の $(k_1+k_2)^2=s$、$(k_1+k_3)^2=t$ です。交換後は $k'_2=-p_3$、$k'_3=p_2$ なので $(k_1+k'_2)^2=(p_1-p_3)^2=t$、$(k_1+k'_3)^2=(p_1+p_2)^2=s$ です。ただし $k'_2=-p_3$ は元の物理領域で負エネルギーです。正エネルギー外線を持つ別の物理領域の境界値へ解析接続する必要があり、元の断面積をそのまま同一視できません。
<!-- solution-end -->

### 演習 QFT13-A4：閾値の三つの分母

$s\downarrow4m^2$ の等質量弾性散乱において $1/(s-m^2)+1/(t-m^2)+1/(u-m^2)$ の極限を求めよ。また $m=0$ として同じ計算を行うことの問題点を一つ挙げよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[重心系運動学](../QFT12/index.md#prop-qft12-cm-momentum)から $p^2=s/4-m^2\to0$ なので、$t,u\to0$ です。三つの分母の逆数は $1/(3m^2)$、$-1/m^2$、$-1/m^2$ へそれぞれ収束し、和は $-5/(3m^2)$ です。$m=0$ では $t=0$ となる前方領域で交換伝播関数 $1/t$ が発散し、単純な角度積分や粒子描像に赤外の問題が現れます。正質量の場合の一様極限をそのまま使えません。
<!-- solution-end -->

### 演習 QFT13-A5：単位性の演算子恒等式

$S=I+iT$、$S^\dagger S=I$ から $-i(T-T^\dagger)=T^\dagger T$ を導け。正規化状態 $|i\rangle$ の対角要素を取り、右辺が非負になる理由を示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

積を展開すると $S^\dagger S=I+iT-iT^\dagger+T^\dagger T$ です。これを $I$ と等置し、$i(T-T^\dagger)=-T^\dagger T$ と移項、両辺に $-1$ を掛ければ $-i(T-T^\dagger)=T^\dagger T$ です。対角要素は

$$
2\operatorname{Im}\langle i|T|i\rangle
=\langle i|T^\dagger T|i\rangle
=\langle Ti|Ti\rangle\ge0.
$$

完全な終状態を挿入すれば $\sum_X|\langle X|T|i\rangle|^2$ で、各項が非負です。これが[光学定理](#thm-qft13-optical-theorem)の出発点になります。
<!-- solution-end -->

### Level B：異なる物理領域と摂動次数を結び直す

### 演習 QFT13-B1：角度反転と同種粒子の係数

等質量の同一実スカラーが三次・四次相互作用で $2\to2$ 弾性散乱する。$z\mapsto-z$ の下で木レベルの振幅と $d\sigma/d\Omega$ がどう変わるか説明し、$S_f=2!$ を含む全断面積の $z$ 積分式を導け。$g=0$ でQFT12の定数振幅の結果に戻ることを確認せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[木レベル振幅](#prop-qft13-tree-amplitude)の $s$ は一定、$t=-2p^2(1-z)$ と $u=-2p^2(1+z)$ は $z\mapsto-z$ で交換されます。従って三分母の和も振幅も偶関数で、断面積も偶関数です。[QFT12の断面積公式](../QFT12/index.md#prop-qft12-cm-cross-section)に同一終状態因子2を入れ、弾性の $p_f/p_i=1$ を使えば

$$
\sigma=\frac1{128\pi^2s}\int_0^{2\pi}d\varphi\int_{-1}^{1}dz\,|\mathcal M|^2
=\frac1{64\pi s}\int_{-1}^{1}dz\,|\mathcal M|^2.
$$

$g=0$ なら $|\mathcal M|^2=\lambda^2$、$z$ 積分は $2\lambda^2$ なので $\sigma=\lambda^2/(32\pi s)$ となり[QFT12の四次頂点全断面積](../QFT12/index.md#prop-qft12-quartic-total)と一致します。三つのチャネルを足す際の係数と終状態積分の $1/2!$ を混同しません。
<!-- solution-end -->

### 演習 QFT13-B2：交差した反応で断面積は等しいか

別種の質量 $m_\phi,m_\chi>0$ の実スカラー $\phi,\chi$ に、$\mathcal L_I=-h\phi^2\chi^2/4$ のみがあるとする。木レベルの $\phi\phi\to\chi\chi$ と $\phi\chi\to\phi\chi$ の接触振幅を求め、同じ解析関数でも全断面積が一般に等しくない理由を、閾値と終状態因子を使って説明せよ。両者の二体閾値より上の重心系 $s$ を考えてよい。

- Level: B

<!-- solution-start -->
#### 詳細解答

四点頂点の $2!2!$ 通りのWick収縮は相互作用の $1/4$ と相殺されるため、どちらの反応でも $i\mathcal M=-ih$、つまり $\mathcal M=-h$ です。接触振幅は解析変数に依存しないので交差しても同じ定数ですが、[QFT12の重心系断面積](../QFT12/index.md#prop-qft12-cm-cross-section)では

$$
\begin{aligned}
\sigma(\phi\phi\to\chi\chi)
&=\frac{h^2}{32\pi s}
\frac{\sqrt{\lambda(s,m_\chi^2,m_\chi^2)}}
{\sqrt{\lambda(s,m_\phi^2,m_\phi^2)}},\\
\sigma(\phi\chi\to\phi\chi)
&=\frac{h^2}{16\pi s}.
\end{aligned}
$$

前者の終状態は同種 $\chi$ 二個で $S_f=2!$、後者は区別できる二種で $S_f=1$ です。また前者は $\sqrt s\ge2m_\phi,2m_\chi$、後者は $\sqrt s\ge m_\phi+m_\chi$ が必要で、初期と終状態の $p_f/p_i$ も反応ごとに異なります。**交差対称なのは解析的振幅の関係**であって、断面積の等号ではありません。
<!-- solution-end -->

### 演習 QFT13-B3：純粋な四次頂点の単位性検算

$m>0$、$s>4m^2$ で $\mathcal L_I=-\lambda\phi^4/4!$ とする。$O(\lambda^2)$ の光学定理の右辺を二体位相空間から計算し、$\operatorname{Im}\mathcal M^{(2)}(s,0)$ を求めよ。さらに $2\mathcal F\sigma_{\rm tree}$ を独立に計算し、等しいか確かめよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[包摂和](#def-qft13-inclusive-sum)と[二体位相空間](../QFT12/index.md#prop-qft12-two-body-phase-space)より

$$
\mathcal I_i^{(2)}=\frac{\lambda^2}{2}\frac{p}{4\pi\sqrt s}
=\frac{\lambda^2p}{8\pi\sqrt s}.
$$

[光学定理](#thm-qft13-optical-theorem)で $2\operatorname{Im}\mathcal M^{(2)}=\mathcal I_i^{(2)}$ だから虚部は $\lambda^2p/(16\pi\sqrt s)$ です。$p=(\sqrt s/2)\sqrt{1-4m^2/s}$ を入れると[虚部の命題](#prop-qft13-unitarity-order)の $\lambda^2\sqrt{1-4m^2/s}/(32\pi)$ になります。一方、[QFT12の断面積](../QFT12/index.md#prop-qft12-quartic-total)を使うと

$$
2\mathcal F\sigma_{\rm tree}
=2p\sqrt s\frac{\lambda^2}{32\pi s}
=\frac{\lambda^2p}{16\pi\sqrt s}.
$$

確かに同じです。この検算は1ループの実部や高次散乱を決めません。
<!-- solution-end -->

### 演習 QFT13-B4：木振幅の虚部を見落としたのか

純粋な四次相互作用で $\mathcal M=-\lambda+O(\lambda^2)$ かつ $\sigma_{\rm tree}>0$ とする。「光学定理が成立するなら $\operatorname{Im}(-\lambda)>0$ でなければならない」という主張の誤りを、$S$ 行列の次数展開から説明せよ。また $O(\lambda^2)$ で二体以外の終状態が新たに寄与しない理由を述べよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$T=\lambda T_1+\lambda^2T_2+\cdots$ を[単位性の演算子式](#thm-qft13-optical-theorem)へ代入すると、次数別に

$$
-i(T_1-T_1^\dagger)=0,\qquad
-i(T_2-T_2^\dagger)=T_1^\dagger T_1
$$

です。一次の $T_1$ がHermitianで木振幅が実数であっても、二次の虚部は一次の遷移振幅の絶対値二乗によって非零になれます。

四次頂点一個で $2\to2$ は可能ですが、連結 $2\to4$ には少なくとも四次頂点二個が必要で振幅が $O(\lambda^2)$、その確率は $O(\lambda^4)$ です。また1粒子終状態は $s>4m^2$ ではエネルギー運動量保存を満たせず、奇数粒子終状態は $\phi\mapsto-\phi$ 対称性で禁止されます。従って $O(\lambda^2)$ の包摂和は二体だけです。
<!-- solution-end -->

### Level C：角度積分と全体像を自力で再構成する

### 演習 QFT13-C1：三チャネルの干渉を全角度で積分する

$m>0$、$g,\lambda\in\mathbb R$ とし、同種実スカラーの重心系弾性散乱で $s=5m^2$ とする。三次・四次相互作用の木振幅を $z=\cos\theta$ で書き、$d\sigma/d\Omega$ と全断面積を厳密に求めよ。計算を簡潔にするため $r=g^2/m^2$、$a=-\lambda-r/4$、$b=12r$ と置いてよい。積分に現れる対数の導出を示し、$g=0$ の極限も検算せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

[QFT12の重心系運動量](../QFT12/index.md#prop-qft12-cm-momentum)で $p^2=s/4-m^2=m^2/4$ です。[三チャネルの式](#prop-qft13-tree-amplitude)の分母は

$$
s-m^2=4m^2,\qquad
t-m^2=-\frac{m^2}{2}(3-z),\qquad
u-m^2=-\frac{m^2}{2}(3+z).
$$

よって

$$
\begin{aligned}
\mathcal M(z)
&=-\lambda-r\left(\frac14-\frac2{3-z}-\frac2{3+z}\right)\\
&=-\lambda-\frac r4+\frac{12r}{9-z^2}
=a+\frac b{9-z^2}.
\end{aligned}
$$

$|z|\le1$ では分母が正で極はなく、振幅は実数です。[角度分布の命題](#prop-qft13-angular-scattering)より

$$
\frac{d\sigma}{d\Omega}=\frac1{128\pi^2(5m^2)}
\left(a+\frac b{9-z^2}\right)^2,
\qquad
\sigma=\frac1{320\pi m^2}\int_{-1}^1
\left(a+\frac b{9-z^2}\right)^2dz.
$$

積分は $2a^2+2abJ_1+b^2J_2$ と分けます。まず部分分数分解

$$
\frac1{9-z^2}=\frac16\left(\frac1{3-z}+\frac1{3+z}\right)
$$

を用い、

$$
J_1=\int_{-1}^1\frac{dz}{9-z^2}
=\frac16\left[\log\frac{3+z}{3-z}\right]_{-1}^{1}
=\frac13\log2.
$$

次に微分を直接確認すると

$$
\frac{d}{dz}\left(\frac{z}{18(9-z^2)}
+\frac1{108}\log\frac{3+z}{3-z}\right)
=\frac1{(9-z^2)^2}
$$

なので

$$
J_2=\int_{-1}^1\frac{dz}{(9-z^2)^2}
=\frac1{72}+\frac{\log2}{54}.
$$

以上を合成して

$$
\boxed{\displaystyle
\sigma_{\rm tree}(s=5m^2)
=\frac1{320\pi m^2}
\left(2a^2+\frac{2ab}{3}\log2
+b^2\left[\frac1{72}+\frac{\log2}{54}\right]\right)}.
$$

$g=0$ なら $r=b=0$、$a=-\lambda$ となり $\sigma=2\lambda^2/(320\pi m^2)=\lambda^2/(160\pi m^2)=\lambda^2/(32\pi s)$ です。これは[QFT12の四次相互作用の結果](../QFT12/index.md#prop-qft12-quartic-total)と一致します。三チャネルを**振幅レベルで**足した交差項 $2abJ_1$ は干渉の寄与であり、交換図ごとの確率を単純に足す計算では失われます。
<!-- solution-end -->

## 5. 次へ進む前の確認

- $s,t,u$ はそれぞれ内部線の四運動量の二乗で、交換図は振幅として干渉します。
- 交差対称性は全入射表示の解析振幅を異なる物理領域へ関連づけるものです。流束、同種粒子因子、位相空間まで同一にする主張ではありません。
- 光学定理は $S$ 行列の単位性から得られ、木レベルの実振幅の二乗は次の次数の前方虚部と対応します。

二点関数・LSZ・散乱確率をつなぐQFT Iの総合問題では、安定外線、内部線と質量殻上の中間状態、観測量の規格化、摂動次数の四つを毎回明記してください。ループ積分を実際に正則化し、虚部だけでなく実部とくりこみを扱う段階はQFT IIで学びます。
