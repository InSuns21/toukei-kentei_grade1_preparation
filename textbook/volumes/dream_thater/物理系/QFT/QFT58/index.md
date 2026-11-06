# QFT58 レプリカ経路積分・分岐被覆とtwist演算子

<!-- definition-example-audit: strict -->

[QFT57の有限cutoffレプリカモーメント](../QFT57/index.md#def-qft57-replica-moments)では、領域の密度演算子を既に持っている場合に限り、整数 $n\ge2$ の $\operatorname{Tr}\rho_A^n$ を計算できました。しかし連続場では、領域ごとの密度行列を最初から用意できるとは限りません。それなら、**整数個の場のコピーをどのように接続すれば、このトレースを経路積分として計算できるのでしょうか。**

まず有限cutoffで行列の添字を一つずつ貼り合わせ、次にEuclid真空の経路積分でその接続を再現します。二次元共形場理論（CFT）では、区間端点の周囲を一周するとコピーの番号が移る幾何を作り、[QFT55のSchwarzianを含む応力テンソル変換](../QFT55/index.md#thm-qft55-stress-transform)から端点のtwist演算子のウェイトを計算します。最後に、整数 $n$ での証明と $n\to1$ の解析接続が別問題であることを明示します。

この章の前提と範囲を固定します。

- 格子の議論では有限次元 $H_A\otimes H_B$ と正規化した密度演算子を使います。場の議論では、まず有限cutoff・有限体積・必要な赤外正則化を保持し、真空のEuclid経路積分が準備できる模型だけを扱います。
- 共形ウェイトの計算では、二次元平面上の局所的なユニタリCFT、正則・反正則の中心電荷 $c,\bar c$、複製された各コピーの同じ真空を仮定します。単一区間 $A=[u,v]$ は実軸上で $u<v$、その長さは $\ell=v-u>0$ とします。端点を丸めるcutoffは $a>0$ です。
- 二次元Euclid面の複素座標は $w=x+i\tau$ とし、[QFT50の複素応力テンソル](../QFT50/index.md#thm-qft50-holomorphic-stress)の規約を継承します。実時間のLorentz規約は $(-,+,+,+)$。$S=-\operatorname{Tr}\rho\ln\rho$ は nat 単位です。
- 整数枚の貼り合わせと、整数上のtwistウェイトは導出します。一方、非整数 $n$ の経路積分そのもの、連続場の一般的な部分トレース、任意の相互作用模型での解析接続の一意性は仮定しません。

## 1. 行列のトレースはどの添字をつなぐか

最初は経路積分を忘れ、[QINF3の部分トレース](../../../応用系/QINF/QINF3/index.md#def-qinf3-partial-trace)が定義された有限系で考えます。$H_A$ の直交基底を $\{|a\rangle\}$、$H_B$ の直交基底を $\{|b\rangle\}$ とし、全状態を $\rho_{AB}$ とします。部分トレースの行列要素は

$$
(\rho_A)_{aa'}=\sum_b(\rho_{AB})_{ab,a'b}.
$$

$B$ の上側と下側の添字は**同じコピー内**で和を取り、$A$ の添字は行列積のため**次のコピー**へ渡します。これが貼り合わせのすべての出発点です。

<a id="def-qft58-replica-sewing"></a>

<!-- formal-statement-start -->
> **定義（有限系の巡回レプリカ貼り合わせ）**
> 有限次元 $H_A\otimes H_B$ の密度演算子 $\rho_{AB}$ と整数 $n\ge2$ に対し、$n$ 個の独立なコピーを用意する。$A$ の基底添字はコピー $j$ の下側をコピー $j+1$ の上側につなぎ、$a_{n+1}=a_1$ とする。$B$ の上下の添字は各コピー内で同一として和を取る。この巡回縮約を $R_n(A)$ と記す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft58-replica-sewing -->
**定義の確認**：$n=2$、$\rho_A=\operatorname{diag}(p,1-p)$（$0\le p\le1$）では接続は $(\rho_A)_{a_1a_2}(\rho_A)_{a_2a_1}$ です。対角性で $a_1=a_2$ の二通りだけが残り、$R_2=p^2+(1-p)^2$。$n=1$ の通常のトレースとは違い、コピーを2枚使ったことが式に残っています。
<!-- definition-example-end -->

<a id="thm-qft58-sewing-trace"></a>

<!-- formal-statement-start -->
> **定理（巡回貼り合わせと縮約モーメントの同一性）**
> 有限次元の密度演算子 $\rho_{AB}\ge0$、$\operatorname{Tr}\rho_{AB}=1$ について、任意の整数 $n\ge2$ で

$$
R_n(A)=\sum_{a_1,\ldots,a_n}\prod_{j=1}^n
  \left(\sum_{b_j}(\rho_{AB})_{a_jb_j,a_{j+1}b_j}\right)
=\operatorname{Tr}\bigl[(\operatorname{Tr}_B\rho_{AB})^n\bigr],
\qquad a_{n+1}=a_1.
$$
<!-- formal-statement-end -->

### 証明の見取り図

各括弧は部分トレースの一つの行列要素です。$A$ の巡回添字を閉じると、ちょうど行列の $n$ 乗の対角和になります。理論の相互作用やGaussian性は使いません。

<!-- proof-start -->
### 証明

[部分トレースの定義](../../../応用系/QINF/QINF3/index.md#def-qinf3-partial-trace)を $j$ 番目の因子に適用すると

$$
\sum_{b_j}(\rho_{AB})_{a_jb_j,a_{j+1}b_j}
=\langle a_j|\rho_A|a_{j+1}\rangle.
$$

有限和なので添字の和の順序を入れ替えられます。$j=1,\ldots,n-1$ の中間添字の和は行列積の定義から

$$
\sum_{a_2,\ldots,a_n}
(\rho_A)_{a_1a_2}\cdots(\rho_A)_{a_na_1}
=(\rho_A^n)_{a_1a_1}.
$$

最後に $a_1$ を和に取れば $\operatorname{Tr}\rho_A^n$ です。$\rho_{AB}$ の正値性はモーメントを密度演算子のものと解釈するために必要ですが、添字の等式自体は任意の有限行列について成立します。
<!-- proof-end -->

たとえば非対角の実対称密度行列

$$
\rho_A=\begin{pmatrix}p&r\\r&1-p\end{pmatrix},
\quad 0\le p\le1,\quad r^2\le p(1-p)
$$

では、巡回和は対角経路二つの $p^2+(1-p)^2$ だけでなく、$0\to1\to0$ と $1\to0\to1$ から $2r^2$ を含みます。単に各コピーの対角確率を掛ける計算ではありません。

## 2. Euclid経路積分に切れ目を入れる

[QFT20のEuclid Gaussian核](../QFT20/index.md#thm-qft20-euclidean-kernel)と[QFT19の有限モードGaussian積分](../QFT19/index.md#thm-qft19-gaussian)では、境界値を固定した積分を計算しました。今は規格化前の真空波動汎関数を、Euclid時間 $\tau<0$ の積分で準備し、複素共役を $\tau>0$ 側で準備します。有限cutoffでは各サイトの座標を $q_A,q_B$ と記せます。境界値の固有基底が使える模型で

$$
\rho_A(q_A^+,q_A^-)
=\frac1{Z_1}\int dq_B\,
  \Psi_0(q_A^+,q_B)\Psi_0(q_A^-,q_B)^*
$$

です。$Z_1=\int dq_Adq_B|\Psi_0(q_A,q_B)|^2$ は未規格化した波動汎関数のノルムで、$\operatorname{Tr}\rho_A=1$ を保証します。ここでは $+$ は $\tau=0^-$ の下岸（ketを準備する側）、$-$ は $\tau=0^+$ の上岸（braを準備する側）の境界値を表す単なるラベルで、電荷の符号ではありません。従って核の行・列の順序は $K_A(q_A^+,q_A^-)$ です。

<a id="def-qft58-cut-path-integral"></a>

<!-- formal-statement-start -->
> **定義（切断付きEuclid真空の経路積分）**
> 境界値で真空を準備できるcutoff付きEuclid場模型で、時刻 $\tau=0$ の区間 $A=[u,v]$ 上だけ上下の境界値を独立に保持し、補領域 $B$ の上下は同じ値で積分する。得られた未規格化した核を $K_A$ とする。切れ目を閉じた一枚の真空規格化因子と正規化した縮約核を、次の式で定める。

$$
Z_1=\int dq_A\,K_A(q_A,q_A),\qquad
\rho_A(q_A^+,q_A^-)=\frac{K_A(q_A^+,q_A^-)}{Z_1}.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft58-cut-path-integral -->
**定義の確認**：二つの二準位の全状態を $|\Psi\rangle=\sqrt p|00\rangle+\sqrt{1-p}|11\rangle$ とし、その振幅を境界値の有限和と見なします。$B$ の添字を一致させて和を取ると $K_A(0,0)=p$、$K_A(1,1)=1-p$、非対角核は0、$Z_1=p+(1-p)=1$ です。切断付きの核と[QFT57の縮約状態](../QFT57/index.md#def-qft57-regulated-reduction)が一致します。
<!-- definition-example-end -->

<a id="def-qft58-branched-cover"></a>

<!-- formal-statement-start -->
> **定義（区間の巡回分岐被覆）**
> 整数 $n\ge2$、$u<v$ に対し、Euclid平面を $A=[u,v]$ に沿って切った同型の $n$ 枚を取る。コピー $j$ の切れ目の下岸をコピー $j+1$ の上岸へ貼り、番号を $n$ で巡回させる。補領域では各コピーを元の一枚のまま接続する。こうして得る曲面を $\mathcal R_n(A)$ と記す。端点 $u,v$ は分岐点であり、局所的な全開き角は $2\pi n$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft58-branched-cover -->
**定義の確認**：$n=2$ なら、$A$ を一度横切ると第1枚から第2枚、再び横切ると第1枚へ戻ります。$u$ の周りを小さく回る座標を $w-u=re^{i\theta}$ とすると、全曲面では $0\le\theta<4\pi$。$z=(w-u)^{1/2}$ はこの二回転の後にのみ元へ戻る局所座標です。$v$ の周りは逆向きのコピー置換になります。
<!-- definition-example-end -->

<a id="thm-qft58-replica-partition"></a>

<!-- formal-statement-start -->
> **定理（整数レプリカの分配関数比）**
> 有限cutoffで前節の境界値積分が存在し、同じ状態を各コピーへ置くとする。$\mathcal R_n(A)$ の貼り合わせ条件で積分した未規格化分配関数を $Z_n(A)$ とすれば、整数 $n\ge2$ に対して

$$
\operatorname{Tr}\rho_A^n=\frac{Z_n(A)}{Z_1^n}.
$$

> 分子は分岐被覆上の積分、分母は切断を閉じた一枚の積分 $n$ 個であり、各々のUV・IR正則化と境界条件を整合的に選ぶ必要がある。
<!-- formal-statement-end -->

### 証明の見取り図

一枚の切断核が $K_A$ です。上側と下側を次のコピーへつないだ $n$ 枚の積分は、核の積を巡回トレースしたものです。各枚から $1/Z_1$ を引き出すので分母は $Z_1^n$ になります。

<!-- proof-start -->
### 証明

[切断付き核](#def-qft58-cut-path-integral)から $\rho_A(q_{j+1},q_j)=K_A(q_{j+1},q_j)/Z_1$ です。トレースでは巡回添字を逆方向に並べても同じ値です。後の下岸から次の上岸へ貼る向きに合わせ、[巡回トレースの定理](#thm-qft58-sewing-trace)の積分版を

$$
\begin{aligned}
\operatorname{Tr}\rho_A^n
&=\int\prod_{j=1}^n dq_j\,
 \rho_A(q_2,q_1)\rho_A(q_3,q_2)\cdots\rho_A(q_1,q_n)\\
&=\frac1{Z_1^n}\int\prod_{j=1}^n dq_j\,
 K_A(q_2,q_1)\cdots K_A(q_1,q_n).
\end{aligned}
$$

$K_A$ は $B$ の上下を既に同一視しています。$j$ 枚目の核の第一引数は下岸、第二引数は上岸です。積の $q_{j+1}$ 積分は $A$ の下岸を次の枚の上岸に接続するため、積分領域がまさに[分岐被覆](#def-qft58-branched-cover)であり、右辺の分子が $Z_n(A)$ です。離散化した有限積分ではこの同一視は厳密です。連続極限での測度の存在・零モード・端点反項については、この有限次元証明だけでは結論できません。
<!-- proof-end -->

ここで大切なのは、**領域境界にDirichlet条件を置いていない**ことです。[QFT56の物理的な境界条件](../QFT56/index.md#def-qft56-half-plane-boundaries)は場の許容状態を変更します。一方この切断は、元の同じ作用のコピー間で値を同一視するだけです。

## 3. 分岐幾何を局所演算子に置き換える

二次元では、区間の端点の周りを回ったときのコピー番号の移り方を、元の平面に置いた複製理論の演算子で表せます。この「点を一周して戻るとラベルがどう入れ替わるか」という規則が**モノドロミー**です。これを用いると、曲面の分岐という幾何の情報を、通常の平面相関関数へ移せます。

<a id="def-qft58-twist-fields"></a>

<!-- formal-statement-start -->
> **定義（巡回twist演算子と逆twist演算子）**
> 整数 $n\ge2$ の同一CFTの積理論において、$n$ 個のコピー $\phi_1,\ldots,\phi_n$ の番号を順に送る規則 $g:j\mapsto j+1\pmod n$ を考える。点 $u$ の周りを反時計回りに一周して場のコピー添字が $g$ に従う局所挿入を $\sigma_n(u)$、逆の規則 $g^{-1}$ を持つ挿入を $\widetilde\sigma_n(v)$ とする。これらを巡回twist、逆twist演算子という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft58-twist-fields -->
**定義の確認**：$n=3$ で $u$ を一周するとラベル $1\to2\to3\to1$ となり、$v$ を一周すると $1\to3\to2\to1$ です。両端点を囲む大きな輪では $g^{-1}g=1$ となり、遠方でコピー番号が元へ戻ります。$n=2$ では $g=g^{-1}$ ですが、端点を区別する幾何の役割は残ります。
<!-- definition-example-end -->

<a id="prop-qft58-twist-geometry"></a>

<!-- formal-statement-start -->
> **命題（分岐被覆とtwist二点挿入）**
> 上記の二次元cutoff付き平面真空の整数レプリカについて、$\sigma_n,\widetilde\sigma_n$ を、分岐被覆と同じ局所接続・端点の正則化を持つように規格化する。分配関数比は複製理論の二点関数として

$$
\frac{Z_n(A)}{Z_1^n}
=\left\langle \sigma_n(u)\widetilde\sigma_n(v)\right\rangle_{\mathrm{rep},a}
$$

> と表せる。右辺の期待値は $n$ コピーの非分岐平面で取る。規格化定数はUV処方に依存しうる。
<!-- formal-statement-end -->

### 証明の見取り図

複製理論を平面の切れ目ごとに分解し、各場のコピー番号を切れ目の片岸で取り直します。すると作用と局所積分は一枚ごとに変わらず、非自明な接続は端点の一周モノドロミーだけに残ります。

<!-- proof-start -->
### 証明

複製された平面の作用は、切れ目以外で $\sum_{j=1}^n S_E[\phi_j]$ です。切れ目の一方の側で $\phi_j$ のラベルを $j+1$ へ一斉に読み替えても、各コピーは同じ作用・同じ測度であり、ラベルの置換は積分変数の名称変更です。切れ目を移動させても作用は変わりません。しかし切れ目の**端点**を囲む輪は置換を避けられず、$u$ で $g$、$v$ で $g^{-1}$ のモノドロミーが残ります。これが[twist演算子の定義](#def-qft58-twist-fields)に一致します。

同じcutoff処方で端点近傍の小円を除外し、その縁で同じ場の接続を課せば、残りの領域の有限cutoff積分は一対一に対応します。よって分配関数比はtwist二点挿入と一致します。端点の小円からの正規化と短距離反項は、演算子の規格化へ含める必要があります。一般の連続測度をこの変数の付け替えだけで構成したものではありません。
<!-- proof-end -->

区間が二つなら端点は四つになります。複製理論では四つのtwist挿入の相関関数になり、その形は中心電荷だけでは固定されません。ここでは**単一区間・平面真空**へ範囲を絞ります。

## 4. 中心電荷からtwistのウェイトを導く

twistのウェイトは、twistを定義しただけでは得られません。分岐面を平面へ戻す座標の取り替えによるSchwarzianを計算し、複製理論の応力テンソルの二点Ward恒等式と係数を比べます。

端点を $u,v$ とした分岐面の一枚の局所座標 $w$ から、次の座標を取ります。

$$
f(w)=\frac{w-u}{w-v},\qquad
\zeta=f(w)^{1/n}.
$$

$f$ は分岐点をそれぞれ $0,\infty$ へ移すMöbius変換で、$\zeta$ の枝の違いが $n$ コピーを表します。$n$ 回の一周で $\zeta$ は元に戻ります。これは局所的な一様化（分岐のない座標への展開）であり、$\zeta$ を一本の値として扱うには枝を指定します。

<a id="lem-qft58-schwarzian-root"></a>

<!-- formal-statement-start -->
> **補題（分岐座標のSchwarzian）**
> $n\ge2$ を整数とし、$w\ne u,v$ で上記の座標を使う。各枝で

$$
\{\zeta,w\}
=\frac12\left(1-\frac1{n^2}\right)
 \frac{(u-v)^2}{(w-u)^2(w-v)^2}.
$$

> Schwarzianは枝に依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

べき写像のSchwarzianをまず計算します。その後、[QFT55の合成則](../QFT55/index.md#lem-qft55-schwarzian-chain)を $w\mapsto f(w)\mapsto f(w)^{1/n}$ に適用します。$f$ はMöbiusなので追加項は零です。

<!-- proof-start -->
### 証明

$G(z)=z^\alpha$ として $\alpha=1/n$、$z\ne0$ で一つの枝を選びます。[正則写像のSchwarzian微分](../QFT55/index.md#def-qft55-schwarzian)を適用すると

$$
\frac{G''}{G'}=\frac{\alpha-1}{z},\qquad
\frac{G'''}{G'}=\frac{(\alpha-1)(\alpha-2)}{z^2}.
$$

引き算を行うと

$$
\{G,z\}
=\frac{(\alpha-1)(\alpha-2)-\frac32(\alpha-1)^2}{z^2}
=\frac{1-\alpha^2}{2z^2}.
$$

[合成則](../QFT55/index.md#lem-qft55-schwarzian-chain)で $\{G\circ f,w\}=f'^2\{G,f\}+\{f,w\}$ です。$f$ はMöbius変換だから $\{f,w\}=0$。さらに

$$
\frac{f'}f
=\frac1{w-u}-\frac1{w-v}
=\frac{u-v}{(w-u)(w-v)}.
$$

よって $\{\zeta,w\}=(1-\alpha^2)(f'/f)^2/2$ です。枝を変えると $\zeta\mapsto e^{2\pi ik/n}\zeta$ となりますが、定数倍のMöbius写像の合成ではSchwarzianは変わりません。
<!-- proof-end -->

<a id="thm-qft58-twist-weight"></a>

<!-- formal-statement-start -->
> **定理（巡回twistの正則・反正則ウェイト）**
> 二次元の各コピーの平面真空で $\langle t(\zeta)\rangle=0$、中心電荷がそれぞれ $c,\bar c$ であり、[QFT55の有限変換則](../QFT55/index.md#thm-qft55-stress-transform)が成立するとする。整数 $n\ge2$ の巡回twistと逆twistは、複製理論での一次場として

$$
h_n=\frac{c}{24}\left(n-\frac1n\right),\qquad
\bar h_n=\frac{\bar c}{24}\left(n-\frac1n\right)
$$

> のウェイトを持つ。特に $c=\bar c$ なら全スケーリング次元は $x_n=h_n+\bar h_n=\frac{c}{12}(n-\frac1n)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$n$ コピーの応力テンソルの総和に[有限共形変換則](../QFT55/index.md#thm-qft55-stress-transform)を適用すると、平面真空の一体期待値が零なのでSchwarzianだけが残ります。端点 $u$ の二次極の係数が、[一次場Ward作用](../QFT50/index.md#thm-qft50-primary-ward)で定まるtwistの $h_n$ と一致します。コピーの数 $n$ を掛け忘れないことが要点です。

<!-- proof-start -->
### 証明

複製理論の正則応力テンソルを $t_{\rm tot}(w)=\sum_{j=1}^n t_j(w)$ と置きます。各枝の $\zeta_j=e^{2\pi ij/n}f(w)^{1/n}$ では $\langle t(\zeta_j)\rangle=0$ なので、[変換則](../QFT55/index.md#thm-qft55-stress-transform)をコピーごとに適用して

$$
\frac{\langle t_{\rm tot}(w)\sigma_n(u)\widetilde\sigma_n(v)\rangle}
     {\langle \sigma_n(u)\widetilde\sigma_n(v)\rangle}
=\sum_{j=1}^n\frac{c}{12}\{\zeta_j,w\}
=\frac{c}{24}\left(n-\frac1n\right)
 \frac{(u-v)^2}{(w-u)^2(w-v)^2}.
$$

他方、複製理論の局所一次場としてのtwistに[一次場Ward作用](../QFT50/index.md#thm-qft50-primary-ward)を使います。両端点のウェイトを $h$ とおくと、二点関数の形は正則部分で $(u-v)^{-2h}$ です。この式を $u,v$ で微分した対数微分は

$$
\partial_u\ln G=-\frac{2h}{u-v},\qquad
\partial_v\ln G=\frac{2h}{u-v}.
$$

よってWard恒等式の右辺は

$$
\begin{aligned}
\frac{\langle t_{\rm tot}(w)\sigma(u)\widetilde\sigma(v)\rangle}{G}
&=\frac{h}{(w-u)^2}+\frac{h}{(w-v)^2}
-\frac{2h}{(u-v)(w-u)}+\frac{2h}{(u-v)(w-v)}\\
&=h\,\frac{(u-v)^2}{(w-u)^2(w-v)^2}.
\end{aligned}
$$

両式の二次極係数を比較して $h=h_n$ を得ます。反正則の成分について同じ計算を $\bar w,\bar u,\bar v,\bar c$ に行うと $\bar h_n$ です。これは整数レプリカの局所幾何による導出であり、非整数枚の面を構成したものではありません。
<!-- proof-end -->

**直接例（自由boson）**：[QFT51の自由boson中心電荷](../QFT51/index.md#thm-qft51-boson-central-charge)は $c=\bar c=1$ です。$n=2$ にすると $h_2=\bar h_2=(2-\tfrac12)/24=1/16$、$x_2=1/8$。$n=3$ では $h_3=(3-\tfrac13)/24=1/9$、$x_3=2/9$。$n=1$ の形式的な値はどちらも0になり、twistが恒等演算子に戻る期待と整合します。ただしこれは整数 $n\ge2$ で得た式を $1$ へ代入した整合性チェックです。

## 5. 区間の二点関数と解析接続の境界

[QFT50の二次元一次場二点関数のWard検算](../QFT50/index.md#prop-qft50-two-point)では、二点因子のべき則と局所Ward作用の整合性を確かめました。平面真空の並進不変性により二点関数は差だけの関数になり、一次場の拡大変換則がそのべき指数を固定します。twistと逆twistも複製理論の一次場なので、単一区間の整数モーメントの長さ依存が求まります。

<a id="prop-qft58-interval-moment"></a>

<!-- formal-statement-start -->
> **命題（単一区間の整数レプリカの普遍指数）**
> 前定理の仮定に加え、平面真空、単一区間 $\ell=v-u\gg a>0$、二点関数の規格化が正しく取れるcutoff付き模型を仮定する。整数 $n\ge2$ で

$$
\operatorname{Tr}\rho_A^n
=C_n\left(\frac{\ell}{a}\right)^{-2x_n}
=C_n\left(\frac{\ell}{a}\right)^{
  -\frac{c+\bar c}{12}\left(n-\frac1n\right)}
$$

> の普遍的な長さ指数を得る。$C_n>0$ は端点cutoff・IR処方・模型に依存しうる定数であり、$c=\bar c$ では指数は $-\frac{c}{6}(n-\frac1n)$ となる。ここでの等式はスケーリング領域での主項で、有限cutoffの非普遍的な補正は省いている。
<!-- formal-statement-end -->

### 証明の見取り図

二点関数は $|u-v|^{-2(h_n+\bar h_n)}$ に比例します。[twist二点表示](#prop-qft58-twist-geometry)でこれをモーメントに戻し、長さの次元をcutoff $a$ で打ち消します。

<!-- proof-start -->
### 証明

平面真空の並進不変性により、正則二点因子は $G(u-v)$ です。各一次場のウェイトを $h_n$ として座標を $\lambda$ 倍すると、[二次元一次場の変換則](../QFT50/index.md#def-qft50-weights)から $G(\lambda(u-v))=\lambda^{-2h_n}G(u-v)$ です。従って $G(z)=D_n^{\mathrm{hol}}z^{-2h_n}$。これは[QFT50の二点Ward検算](../QFT50/index.md#prop-qft50-two-point)の形でもあります。反正則部分も同じ議論を使い、正則・反正則部分を合わせて

$$
\langle\sigma_n(u)\widetilde\sigma_n(v)\rangle
=D_n(u-v)^{-2h_n}(\bar u-\bar v)^{-2\bar h_n}.
$$

実軸上で $\ell>0$、スピンなしの場合 $c=\bar c$ なら二因子は $\ell^{-2x_n}$ です。一般の左右成分についても、大きさの指数は $2(h_n+\bar h_n)$ です。場の次元を持つ係数は $D_n=C_na^{2x_n}$ と書けるので、[分配関数比](#thm-qft58-replica-partition)と[twist二点表示](#prop-qft58-twist-geometry)をつなぐと上式を得ます。$x_n=(c+\bar c)(n-1/n)/24$ を代入すれば指数は $-(c+\bar c)(n-1/n)/12$ です。ここで大域的なスケール不変性を破る質量や他の長さがある場合、同じ純粋なべき則にはなりません。
<!-- proof-end -->

たとえば自由bosonでは $n=2$ のスケーリング主項は $C_2(\ell/a)^{-1/4}$、$n=3$ は $C_3(\ell/a)^{-4/9}$ です。同じ中心電荷でも $C_2,C_3$ はここで計算していません。**twistのウェイトを導くことと、規格化定数まで決めることは別です。**

<a id="prop-qft58-conditional-entropy"></a>

<!-- formal-statement-start -->
> **命題（解析接続を仮定した区間エントロピー係数）**
> $c=\bar c$ の上記スケーリング公式に対し、$n=1$ の近傍で正の微分可能な補間 $C(n)$ があり、$C(1)=1$、さらに整数公式の指数がその近傍へ適切に解析接続され、cutoff補正と $n$ 微分の順序交換が正当化されると**追加仮定**する。このとき主項は

$$
S_A=\frac{c}{3}\ln\frac{\ell}{a}
-\left.\frac{d}{dn}\ln C(n)\right|_{n=1}
+\text{cutoff補正}
$$

> となる。この命題は整数データだけから解析接続の存在・一意性を主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

[QFT57の有限次元レプリカ微分](../QFT57/index.md#thm-qft57-replica-derivative)と同じ形で対数を微分します。ただし今回は「その関数でよい」という追加仮定が必要です。

<!-- proof-start -->
### 証明

$F(n)=\ln C(n)-\frac{c}{6}(n-1/n)\ln(\ell/a)$ とおけば $F(1)=0$ です。仮定の下で $S_A=-F'(1)$ を使えます。$d(n-1/n)/dn=1+1/n^2$ なので

$$
-F'(1)=-\frac{C'(1)}{C(1)}
+\frac{c}{6}(1+1)\ln\frac{\ell}{a}
=-\left.\frac{d}{dn}\ln C(n)\right|_{1}
+\frac{c}{3}\ln\frac{\ell}{a}.
$$

これは条件付き計算です。[QFT57の非一意性の証明](../QFT57/index.md#thm-qft57-replica-derivative)で用いた $\sin(\pi n)$ のような整数で零となる補正は、整数値を変えずに $n=1$ の微分を変えます。連続場の整数レプリカ幾何からは、そのような補正を排除する成長条件・正値性・スペクトル等の追加根拠を自動的には得られません。
<!-- proof-end -->

次章ではこの条件付きの普遍係数を、単一区間のRényi・von Neumannエントロピーの具体的な極限と規格化の関係まで整理します。有限温度、空間円周、物理的境界を持つ場合はさらに別の写像と状態指定が必要です。

## 6. 演習：添字・幾何・Schwarzianを再構成する

<a id="ex-qft58-a01"></a>

### QFT58-A01 三つの対角レプリカ

- Level: A
- 対応目標: 巡回縮約と整数モーメント

$\rho_A=\operatorname{diag}(p,1-p)$（$0<p<1$）の3コピーの巡回添字和を直接書き、$\operatorname{Tr}\rho_A^3$ を求めよ。

<!-- solution-start -->
### 詳細解答

[巡回貼り合わせ](#def-qft58-replica-sewing)では $a_4=a_1$ として

$$
R_3=\sum_{a_1,a_2,a_3\in\{0,1\}}
(\rho_A)_{a_1a_2}(\rho_A)_{a_2a_3}(\rho_A)_{a_3a_1}.
$$

対角行列なので $a_1=a_2=a_3$ の項だけが残ります。全て0なら $p^3$、全て1なら $(1-p)^3$、よって $R_3=p^3+(1-p)^3$。[巡回トレースの定理](#thm-qft58-sewing-trace)と一致します。
<!-- solution-end -->

<a id="ex-qft58-a02"></a>

### QFT58-A02 非対角の巡回路

- Level: A
- 対応目標: 部分トレースは対角確率だけではない

$\rho_A=\begin{pmatrix}1/2&r\\r&1/2\end{pmatrix}$（実数 $|r|\le1/2$）について、巡回縮約 $R_2$ を四つの添字組で計算し、正値性を確認せよ。

<!-- solution-start -->
### 詳細解答

添字組 $(0,0),(0,1),(1,0),(1,1)$ の寄与は順に $1/4,r^2,r^2,1/4$ です。よって

$$
R_2=\tfrac12+2r^2.
$$

固有値は $1/2+r$、$1/2-r$。$|r|\le1/2$ でともに非負、和1です。二乗和は $(1/2+r)^2+(1/2-r)^2=1/2+2r^2$ と一致し、$r=0$ で $1/2$、$|r|=1/2$ で1です。
<!-- solution-end -->

<a id="ex-qft58-a03"></a>

### QFT58-A03 三枚の枝の局所座標

- Level: A
- 対応目標: 開き角とコピー置換

$n=3$、端点 $u=0$ の近傍で $w=re^{i\theta}$ とする。分岐面上の $\theta$ の範囲と、$\zeta=w^{1/3}$ の一周ごとの変化を求めよ。

<!-- solution-start -->
### 詳細解答

[分岐被覆](#def-qft58-branched-cover)の局所全角は $2\pi n=6\pi$。$0\le\theta<6\pi$ で

$$
\zeta=r^{1/3}e^{i\theta/3}.
$$

$\theta$ を $2\pi$ 増やすと $\zeta$ は $e^{2\pi i/3}$ 倍、次の一周で $e^{4\pi i/3}$ 倍、三周で $e^{2\pi i}=1$ 倍になり戻ります。分岐面の局所座標として $\zeta$ は一価です。
<!-- solution-end -->

<a id="ex-qft58-a04"></a>

### QFT58-A04 半乗写像のSchwarzian

- Level: A
- 対応目標: 分岐の応力テンソル補正

$\zeta=w^{1/2}$、$w\ne0$ について $\{\zeta,w\}$ を微分の定義から求め、$n=2$ の自由bosonの $h_2$ を求めよ。

<!-- solution-start -->
### 詳細解答

$\zeta'=\frac12w^{-1/2}$、$\zeta''=-\frac14w^{-3/2}$、$\zeta'''=\frac38w^{-5/2}$ なので $\zeta'''/\zeta'=3/(4w^2)$、$\zeta''/\zeta'=-1/(2w)$。従って

$$
\{\zeta,w\}=\frac3{4w^2}-\frac32\frac1{4w^2}
=\frac3{8w^2}.
$$

二枚の応力テンソルのSchwarzian寄与は $2(c/12)(3/8w^2)=c/(16w^2)$ です。自由bosonの $c=1$ で二次極係数は $h_2=1/16$、[巡回twistの正則・反正則ウェイト](#thm-qft58-twist-weight)の値と一致します。
<!-- solution-end -->

<a id="ex-qft58-a05"></a>

### QFT58-A05 二端点の置換

- Level: A
- 対応目標: twistと逆twistの区別

$n=4$ の区間端点 $u,v$ で置換 $g=(1\,2\,3\,4)$ を用いる。(1) $v$ の周りの置換を求め、(2) 両端点を含む大きな閉曲線の置換を求めよ。

<!-- solution-start -->
### 詳細解答

区間 $A$ の外ではコピーを戻す必要があるので $v$ は逆置換 $g^{-1}=(1\,4\,3\,2)$ を持ちます。$u$ の後に $v$ を回る大きな輪の合成は $g^{-1}\circ g=1$ で、すべてのラベルが元へ戻ります。[twistの定義](#def-qft58-twist-fields)の端点条件を満たすため、二つの端点へ同じ向きの四周期置換を置いてはいけません。
<!-- solution-end -->

<a id="ex-qft58-b01"></a>

### QFT58-B01 一様化とWard係数の再計算

- Level: B
- 対応目標: 位置依存を含むtwistウェイト

$u=0,v=1,n=2$、中心電荷 $c$ の理論で $f(w)=w/(w-1)$ とする。Schwarzianと $t_{\rm tot}$ の一体期待値を計算し、二端点の二点Ward恒等式の係数と突き合わせよ。

<!-- solution-start -->
### 詳細解答

$f'/f=1/w-1/(w-1)=-1/[w(w-1)]$ です。[分岐Schwarzianの補題](#lem-qft58-schwarzian-root)に $n=2$ を入れると

$$
\{\zeta,w\}=\frac38\frac1{w^2(w-1)^2}.
$$

$n=2$ コピーの各真空の $\langle t(\zeta)\rangle=0$ を使い、[有限変換則](../QFT55/index.md#thm-qft55-stress-transform)を足すと

$$
\langle t_{\rm tot}(w)\rangle_{\mathcal R_2}
=2\frac{c}{12}\frac38\frac1{w^2(w-1)^2}
=\frac{c}{16}\frac1{w^2(w-1)^2}.
$$

二点Ward恒等式の一般形は $h(u-v)^2/[(w-u)^2(w-v)^2]$ です。$u=0,v=1$ では分子が1だから $h_2=c/16$ で一致します。応力テンソルの中心電荷を $2c$ としてSchwarzianをもう一度2倍すると、同じ寄与を二度足す誤りになります。
<!-- solution-end -->

<a id="ex-qft58-b02"></a>

### QFT58-B02 整数レプリカと微分の違い

- Level: B
- 対応目標: 解析接続の限界

$\rho_A=\operatorname{diag}(1/3,2/3)$ の $Z(n)$ を計算し、整数で一致する $\widetilde Z(n)=Z(n)+\epsilon\sin(\pi n)$ の $n=1$ 微分を比較せよ。$\widetilde Z$ を別の密度演算子のモーメントとみなしてよいか。

<!-- solution-start -->
### 詳細解答

$Z(n)=3^{-n}+(2/3)^n$、$Z(1)=1$ です。微分すると

$$
Z'(1)=\tfrac13\ln\tfrac13+\tfrac23\ln\tfrac23.
$$

$\sin(\pi k)=0$（全整数 $k$）ですが、$d\sin(\pi n)/dn|_{n=1}=-\pi$ なので $\widetilde Z'(1)=Z'(1)-\epsilon\pi$。従って $-\widetilde Z'(1)$ は真のエントロピー $-Z'(1)$ から $\epsilon\pi$ ずれます。追加項は正の固有値のべきの和という保証がなく、別の密度演算子のモーメントとはみなせません。[QFT57のレプリカ微分定理](../QFT57/index.md#thm-qft57-replica-derivative)は固有値からの拡張が既知のときだけ適用できます。
<!-- solution-end -->

<a id="ex-qft58-b03"></a>

### QFT58-B03 二つの区間のtwist接続

- Level: B
- 対応目標: 単一区間公式の適用範囲

$u_1<v_1<u_2<v_2$ の二つの区間を $A=[u_1,v_1]\cup[u_2,v_2]$ とする。整数 $n$ の分岐被覆に必要なtwistと逆twistを順に記し、なぜ二点関数の普遍指数だけでは $Z_n(A)$ が決まらないか説明せよ。

<!-- solution-start -->
### 詳細解答

端点の左から $\sigma_n(u_1),\widetilde\sigma_n(v_1),\sigma_n(u_2),\widetilde\sigma_n(v_2)$ と置きます。各区間の左端で $g$、右端で $g^{-1}$ だから、全端点を囲む輪では $g^{-1}gg^{-1}g=1$ です。相関関数は

$$
\langle\sigma_n(u_1)\widetilde\sigma_n(v_1)
\sigma_n(u_2)\widetilde\sigma_n(v_2)\rangle.
$$

四点関数には、たとえば $\eta=(v_1-u_1)(v_2-u_2)/[(u_2-u_1)(v_2-v_1)]$ のような共形交差比があり、[QFT54の四点関数とブロック](../QFT54/index.md#def-qft54-reduced-four-point)に従って理論固有の関数が残ります。したがって中心電荷と二点の次元だけでは決まりません。
<!-- solution-end -->

<a id="ex-qft58-b04"></a>

### QFT58-B04 bosonとMajoranaの整数指数

- Level: B
- 対応目標: 中心電荷とcutoff定数を区別する

平面真空、$c=\bar c$ の理論の $n=2,3$ について、$c=1$ の自由bosonと $c=1/2$ の自由Majoranaの $x_n$ と $\ell/a$ の指数を比較せよ。$C_n$ も比で決まるか。

<!-- solution-start -->
### 詳細解答

[QFT53の自由模型の中心電荷](../QFT53/index.md#thm-qft53-majorana-central)を用います。[巡回twistの正則・反正則ウェイト](#thm-qft58-twist-weight)から、全スケーリング次元は $x_n=c(n-1/n)/12$、二点の長さ指数は $-2x_n$ です。

自由bosonは $c=1$、自由Majoranaは $c=1/2$ です。$n=2$ で $n-1/n=3/2$ を代入すると、

$$
\begin{array}{c|cc}
&x_2&-2x_2\\ \hline
\text{boson}&1/8&-1/4\\
\text{Majorana}&1/16&-1/8
\end{array}
$$

$n=3$ では $n-1/n=8/3$ だから、

$$
\begin{array}{c|cc}
&x_3&-2x_3\\ \hline
\text{boson}&2/9&-4/9\\
\text{Majorana}&1/9&-2/9
\end{array}
$$

普遍指数の比は2ですが、$C_n$ は規格化・cutoff・境界条件に依存し、中心電荷の比だけでは決まりません。
<!-- solution-end -->

<a id="ex-qft58-c01"></a>

### QFT58-C01 有限状態から単一区間の普遍係数まで

- Level: C
- 対応目標: 巡回添字・幾何・Ward作用・解析接続の統合

有限次元純粋状態を次のように取る。ただし $0<p<1$ とし、第一系を $A$ とする。

$$
|\Psi_p\rangle=\sqrt p|00\rangle+\sqrt{1-p}|11\rangle.
$$

1. $\operatorname{Tr}\rho_A^n$ を巡回添字から求めよ。
2. 同じ整数レプリカの操作を、cutoff付き二次元場のEuclid真空へ移すときの貼り合わせを記せ。
3. $c=\bar c$ の単一区間で、分岐座標のSchwarzianと応力テンソルのWard作用から $h_n$、二点の長さ指数を求めよ。
4. $n\to1$ で $c/3$ が出る条件と、無条件には言えない二点を挙げよ。

<!-- solution-start -->
### 詳細解答

**(1) 有限系の出発点。** 第二系の直交基底で部分トレースすると $\rho_A=p|0\rangle\langle0|+(1-p)|1\rangle\langle1|$。巡回積の因子は対角なので、$n$ 個の添字が全て0または全て1のときだけ非零です。従って

$$
R_n=\sum_{a_1,\ldots,a_n}\prod_j(\rho_A)_{a_ja_{j+1}}
=p^n+(1-p)^n.
$$

**(2) 切れ目の対応。** Euclid時間 $\tau=0$ の $A$ 上だけ上岸と下岸の境界値を残し、$B$ では同じコピー内で両岸を接続します。$A$ の下岸を次のコピーの上岸へ接続すると、[区間の巡回分岐被覆](#def-qft58-branched-cover)の $\mathcal R_n(A)$ になります。

各核の規格化が $1/Z_1$ なので、[整数レプリカの分配関数比](#thm-qft58-replica-partition)より

$$
R_n=\frac{Z_n(A)}{Z_1^n}.
$$

有限行列のモーメント $p^n+(1-p)^n$ と同じ添字の接続構造ですが、場の作用や未規格化積分の値が同じという主張ではありません。

**(3) 応力テンソル。** $f=(w-u)/(w-v)$、$\zeta=f^{1/n}$ とすれば、[分岐座標のSchwarzian](#lem-qft58-schwarzian-root)から

$$
\{\zeta,w\}=\frac{1-n^{-2}}2
\frac{(u-v)^2}{(w-u)^2(w-v)^2}.
$$

コピーを $n$ 個足すと[有限変換則](../QFT55/index.md#thm-qft55-stress-transform)により $t_{\rm tot}$ の二次極の係数は

$$
\frac{nc}{12}\frac{1-n^{-2}}2
=\frac{c}{24}\left(n-\frac1n\right)=h_n.
$$

反正則側も同じなので $x_n=2h_n=c(n-1/n)/12$。[二次元一次場二点の形](../QFT50/index.md#prop-qft50-two-point)から

$$
\operatorname{Tr}\rho_A^n
=C_n(\ell/a)^{-2x_n}
=C_n(\ell/a)^{-\frac c6(n-1/n)}.
$$

**(4) $n=1$ への接続と限界。** $C(n)$ が $1$ の近傍で正・微分可能、$C(1)=1$ で指数の解析接続と微分・cutoff極限の交換が正当化されるなら

$$
S_A=-\left.\partial_n\ln Z_A(n)\right|_1
=\frac c3\ln(\ell/a)-\left.\partial_n\ln C(n)\right|_1+\cdots.
$$

無条件には言えない点は、(i) 整数の分岐幾何だけから非整数 $n$ の補間や導関数が一意とは決まらないこと、(ii) 連続場の局所領域が一般に有限次元の部分トレースを許すとは限らず、cutoffの除去・端点の正則化を別途制御する必要があることです。定数 $C(n)$ も中心電荷だけで一意には決まりません。
<!-- solution-end -->

## 7. 次に学ぶこと

有限行列の巡回縮約、Euclid切れ目の貼り合わせ、分岐端点のtwist二点関数を一つの鎖としてつなぎました。二次元CFTの中心電荷から整数レプリカのtwistウェイトが決まり、単一区間の**普遍的な長さ指数**が得られます。次はその指数からRényi・von Neumannエントロピーの単一区間公式を、規格化・cutoff・極限を一つずつ確認して導きます。

切れ目は物理的な壁ではなく、twistのウェイトは整数レプリカの局所CFTの結果であり、解析接続は追加の数学的問題です。この三つを分けられることが、計算を「レプリカの手品」で終わらせない条件です。
