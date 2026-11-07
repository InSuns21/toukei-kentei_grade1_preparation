# ITD5 物理的記憶とLandauer原理：消去に必要な仕事

[ITD4の情報付き仕事上限](../ITD4/index.md#thm-itd4-feedback-work-bound)では、測定結果を記憶した装置が、系の状態に応じて仕事を取り出しました。しかし計算に入れたのは制御対象の系への仕事だけでした。同じ装置を繰り返し使うには、結果が「0」でも「1」でも次回のために記憶を所定の状態へ戻さなければなりません。

本章の問いは、**記憶を消すことには、どの仮定の下で、どれだけの仕事と放熱が必要か**です。論理的な「0へ戻す」という指示と、温度を持つ熱浴に接した物理的な二状態系への操作を分けます。最初の分布が偏っているとき、消去に誤りが残るとき、最後のエネルギー準位を変えたときに、同じ $k_{\mathrm B}T\log2$ を機械的に当てはめないようにします。

空でない有限状態集合 $M$ を記憶の物理状態とし、温度 $T>0$ の単一熱浴、Boltzmann定数 $k_{\mathrm B}>0$、$\beta=(k_{\mathrm B}T)^{-1}$ を用います。対数 $\log$ は自然対数、$0\log0=0$ です。外部から記憶へした仕事 $W$ と、浴から記憶へ入った熱 $Q$ を正とし、浴へ捨てた熱は $Q_{\mathrm{bath}}=-Q$ とします。[ITD1の第一法則](../ITD1/index.md#thm-itd1-first-law)は $\Delta U=W+Q$ です。

## 1. 論理的な消去と物理的な操作を区別する

一つの記憶ビットを $M=\{0,1\}$ の二状態で表します。論理的な消去は、入力が0でも1でも出力を0にする写像 $R(0)=R(1)=0$ です。これは入力を一意に復元できない写像ですが、**その写像を書くだけでは、実行に要する仕事は決まりません**。エネルギー準位と熱浴との接触を指定する必要があります。

記憶の確率分布を $p$、エネルギーを $E(m,\lambda)$ とします。物理操作では、制御パラメータ $\lambda$ による準位変更と、温度 $T$ の熱浴との接触を組み合わせます。[ITD1の操作と熱浴接触の模型](../ITD1/index.md#def-itd1-controlled-model)を記憶へそのまま適用でき、浴との各接触には[局所詳細釣合い](../ITD1/index.md#def-itd1-local-detailed-balance)を課します。

<a id="def-itd5-physical-reset"></a>

<!-- formal-statement-start -->
> **定義（有限状態記憶の物理的reset）**  
> 有限集合 $M$、初期分布 $p$、終端分布 $r$、初期と終端のエネルギー $E_i(m)$、$E_f(m)$、温度 $T>0$ を与える。状態を変えない有限回の準位変更と、単一熱浴への局所詳細釣合いを満たす接触からなる操作で、分布を $p$ から $r$ に移すことを物理的resetとする。記憶への平均仕事を $\langle W_{\mathrm{reset}}\rangle$ と書く。
>
> 二状態 $M=\{0,1\}$ で、目標値を0とする場合、終端分布 $r=(1-\varepsilon,\varepsilon)$ の $\varepsilon$ を消去誤り率とする。ここでは $0\le\varepsilon\le1/2$ を考え、$\varepsilon=0$ を無誤差resetとする。操作の達成可能性は各模型の接触核と制御可能な準位に依存する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-itd5-physical-reset -->
### 例：出力を指定する確率行列だけでは費用が分からない

**定義の確認**：入力ビットの分布を $p=(u,1-u)$、$0\le u\le1$ とします。論理的な確率核

$$
R_\varepsilon=\begin{pmatrix}1-\varepsilon&\varepsilon\\1-\varepsilon&\varepsilon\end{pmatrix}
$$

は非負で各行和が1なので、$pR_\varepsilon=(1-\varepsilon,\varepsilon)$ です。すなわち入力によらず誤り率 $\varepsilon$ の出力を指定できます。ただし、行列は仕事、準位、熱浴について何も指定しておらず、**この核を仕事ゼロで行えるという主張ではありません**。後で初期・終期の自由エネルギーから実際の下限を評価します。
<!-- definition-example-end -->

一つの物理ビットのShannonエントロピーを自然対数で表すには、分布の各確率を重みとして対数を平均します。以下では確率的な不確かさと、仕事のエネルギー単位を混同しないようにします。

<a id="def-itd5-memory-entropy"></a>

<!-- formal-statement-start -->
> **定義（記憶の情報エントロピーと二値エントロピー）**  
> 有限集合 $M$ の分布 $p$ に対し、無次元の情報エントロピーを

$$
H(p)=-\sum_{m\in M}p(m)\log p(m)
$$

> とし、熱力学的エントロピーを $S[p]=k_{\mathrm B}H(p)$ とする。二状態分布 $(u,1-u)$ には

$$
h(u)=-u\log u-(1-u)\log(1-u),\qquad 0\le u\le1
$$

> を用いる。端点では $0\log0=0$ とする。$H,h$ は nat 単位であり、bit 単位なら $\log2$ で割る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-itd5-memory-entropy -->
### 例：何を捨てるかは初期分布で違う

**定義の確認**：$(1/2,1/2)$、$(3/4,1/4)$、$(1,0)$ はいずれも非負で和が1の二状態分布です。それぞれ

$$
H(1/2,1/2)=\log2,\quad
H(3/4,1/4)=h(1/4),\quad H(1,0)=0
$$

となります。無誤差resetで失う不確かさは、初期が既に $(1,0)$ なら0、初期が一様なら $\log2$ nat です。記憶容量が1 bitであることと、その記憶が現在1 bitの不確かさを持つことは違います。
<!-- definition-example-end -->

## 2. 仕事の下限：Landauer原理を分布から導く

[ITD3の非平衡自由エネルギー](../ITD3/index.md#def-itd3-noneq-free-energy)は、記憶にも適用できます。$p$ とエネルギー $E$ が与えられたとき

$$
\mathcal F[p,E]=\sum_mp(m)E(m)-k_{\mathrm B}T H(p)
=U[p,E]-TS[p]
$$

です。自由エネルギーの増分が、熱浴を用いたresetに必要な仕事の下限になります。

<a id="thm-itd5-reset-work-bound"></a>

<!-- formal-statement-start -->
> **定理（有限記憶resetの平均仕事下限）**  
> 空でない有限状態集合 $M$、有限な初期・終端エネルギー $E_i,E_f$、分布 $p,r$、単一熱浴の温度 $T>0$ を取る。[物理的reset](#def-itd5-physical-reset)の操作が存在し、接触核がその温度の局所詳細釣合いを満たすとする。記憶のみを仕事・熱の帳簿の系とし、初期・終端で他の装置との相互作用エネルギーを計上しない場合、

$$
\langle W_{\mathrm{reset}}\rangle
\ge\mathcal F[r,E_f]-\mathcal F[p,E_i]
=\Delta U+k_{\mathrm B}T\{H(p)-H(r)\}
$$

> が成り立つ。ここで $\Delta U=U[r,E_f]-U[p,E_i]$ である。等号には過程全体の平均エントロピー生成が0であることが必要十分である。下限の達成は有限時間・有限準位で保証されない。
<!-- formal-statement-end -->

### 証明の見取り図

「情報を消すときは必ず一定の熱が出る」を仮定しません。[ITD3の仕事の一般不等式](../ITD3/index.md#thm-itd3-work-bound)の始終状態を、制御対象を記憶に置き換えて評価します。エネルギー変化とエントロピー減少を別の項として残します。

<!-- proof-start -->
### 証明

任意の有限段数の操作を取り、段階 $j$ の準位変更では状態は固定、浴接触では制御値は固定とします。全準位は有限で $T>0$、各接触は局所詳細釣合いを満たすので、[ITD3の平均仕事下限](../ITD3/index.md#thm-itd3-work-bound)の仮定を満たします。初期分布に $p$、終期に $r$ を代入して

$$
\langle W_{\mathrm{reset}}\rangle
\ge \mathcal F[r,E_f]-\mathcal F[p,E_i]
$$

を得ます。[情報エントロピーの定義](#def-itd5-memory-entropy)を用いて右辺を展開すると

$$
\begin{aligned}
\mathcal F[r,E_f]-\mathcal F[p,E_i]
&=\left\{\sum_mr(m)E_f(m)-k_{\mathrm B}TH(r)\right\}\\
&\quad-\left\{\sum_mp(m)E_i(m)-k_{\mathrm B}TH(p)\right\}\\
&=\Delta U+k_{\mathrm B}T\{H(p)-H(r)\}.
\end{aligned}
$$

ITD3の証明では $\langle W\rangle-\Delta\mathcal F=T\langle\Delta S_{\mathrm{tot}}\rangle\ge0$ でした。よって等号は平均全エントロピー生成が0のとき、かつそのときに限ります。この等号条件は、与えられた制御の集合でそのような経路を実現できるとまでは主張しません。
<!-- proof-end -->

<a id="cor-itd5-landauer"></a>

<!-- formal-statement-start -->
> **系（等エネルギー一様ビットのLandauer下限）**  
> [reset仕事下限](#thm-itd5-reset-work-bound)の仮定の下で、$M=\{0,1\}$、初期・終端とも $E(0)=E(1)=0$、初期分布 $p=(1/2,1/2)$、終端分布 $r=(1,0)$ とする無誤差resetが実現されるなら、

$$
\langle W_{\mathrm{reset}}\rangle\ge k_{\mathrm B}T\log2,
\qquad
\langle Q_{\mathrm{bath}}\rangle\ge k_{\mathrm B}T\log2
$$

> である。有限な準位と通常の正確率の熱浴接触では無誤差状態は一般に有限段で達成されず、右辺は理想的な零誤り極限の下限でもある。仕事は記憶への入力、放熱は浴への出力である。
<!-- formal-statement-end -->

### 証明の見取り図

同じ等エネルギー準位で始終するため $\Delta U=0$ です。エントロピーが $\log2$ natから0へ減るので、仕事の増分は少なくとも $k_{\mathrm B}T\log2$。第一法則で熱へ換算します。

<!-- proof-start -->
### 証明

$U[p,E]=U[r,E]=0$、[記憶エントロピー](#def-itd5-memory-entropy)より $H(p)=\log2$、$H(r)=0$ です。[仕事下限](#thm-itd5-reset-work-bound)に代入すると

$$
\langle W_{\mathrm{reset}}\rangle\ge0+k_{\mathrm B}T(\log2-0).
$$

[ITD1の第一法則](../ITD1/index.md#thm-itd1-first-law)を記憶に適用すると $0=\langle W_{\mathrm{reset}}\rangle+\langle Q\rangle$。したがって $\langle Q_{\mathrm{bath}}\rangle=-\langle Q\rangle=\langle W_{\mathrm{reset}}\rangle$ で、同じ下限を得ます。これは**同じ準位で始終する**条件を用いた等式です。
<!-- proof-end -->

Landauer原理は「測定するたびに $k_{\mathrm B}T\log2$ を払う」でも「書き込むたびに同じ仕事が必要」でもありません。一様な不確かさを持つ記憶を、同じ等エネルギー準位へ戻して無誤差で0にそろえる、という**特定の操作の最小仕事**を述べています。

## 3. 偏った入力と誤りのあるreset

入力が既に0へ偏っていれば失う不確かさは小さくなり、終端に誤りを許せば不確かさを残せます。どちらも[仕事下限](#thm-itd5-reset-work-bound)へ分布を代入すれば正確に計算できます。

<a id="prop-itd5-biased-error"></a>

<!-- formal-statement-start -->
> **命題（偏りと誤りを含む二状態resetの下限）**  
> 単一熱浴 $T>0$ の下で、二状態記憶の初期・終端のエネルギーがともに $E(0)=E(1)=0$ であり、初期分布が $p=(u,1-u)$、終端分布が $r=(1-\varepsilon,\varepsilon)$、$0\le u\le1$、$0\le\varepsilon\le1/2$ とする。[物理的reset](#def-itd5-physical-reset)が実現されるなら、

$$
\langle W_{\mathrm{reset}}\rangle
\ge k_{\mathrm B}T\{h(u)-h(\varepsilon)\},
\qquad
\langle Q_{\mathrm{bath}}\rangle
\ge k_{\mathrm B}T\{h(u)-h(\varepsilon)\}.
$$

> 特に一様入力では $k_{\mathrm B}T\{\log2-h(\varepsilon)\}$、無誤差resetでは $k_{\mathrm B}Th(u)$ が下限である。下限が負のときは、外部からの正の仕事が必須という意味ではなく、適切な制御で仕事を取り出せる余地があることを意味する。
<!-- formal-statement-end -->

### 証明の見取り図

二値エントロピー $h$ は入力と出力の不確かさを同じ尺度で測ります。始終の内部エネルギーが等しいので、その差に $k_{\mathrm B}T$ を掛ければよいのです。

<!-- proof-start -->
### 証明

初期と終期のエネルギーは全状態で0なので $\Delta U=0$ です。[二値エントロピーの定義](#def-itd5-memory-entropy)から $H(p)=h(u)$ と $H(r)=h(1-\varepsilon)=h(\varepsilon)$。後者の等号は二項を交換しただけです。[仕事下限](#thm-itd5-reset-work-bound)へ代入して

$$
\langle W_{\mathrm{reset}}\rangle
\ge k_{\mathrm B}T\{h(u)-h(\varepsilon)\}.
$$

第一法則から $\langle Q_{\mathrm{bath}}\rangle=\langle W_{\mathrm{reset}}\rangle$ です。$u=1/2$ では $h(u)=\log2$、$\varepsilon=0$ では $h(0)=0$ を代入すれば特別な場合も得ます。
<!-- proof-end -->

### 例：1/4の消去誤りを許すと

入力が一様で $\varepsilon=1/4$ なら $r=(3/4,1/4)$ です。

$$
\begin{aligned}
h(1/4)&=-\frac14\log\frac14-\frac34\log\frac34\\
&=2\log2-\frac34\log3,\\
\frac{W_{\min}}{k_{\mathrm B}T}
&=\log2-h(1/4)=\frac34\log3-\log2>0.
\end{aligned}
$$

無誤差の $\log2$ より小さく、$\varepsilon=1/2$ では0になります。逆に初期分布が既に $(1,0)$ なら、無誤差resetで状態を変える必要はなく、下限も0です。$h(u)<h(\varepsilon)$ の場合はエントロピーを**増やす**操作になるので、負の下限と矛盾しません。

## 4. 下限へ近づく実際の準位操作

ここまでの不等式は必要条件です。どのような操作でその下限に近づけるかを構成します。二状態の誤り率を $0<\varepsilon<1/2$ とし、まず初期状態は一様・両準位は0とします。有限な誤り率を選んで、有限の準位差から出発することが重要です。

<a id="prop-itd5-quasistatic-reset"></a>

<!-- formal-statement-start -->
> **命題（有限誤りresetの可逆極限構成）**  
> 二状態記憶、温度 $T>0$ の単一熱浴、初期分布 $(1/2,1/2)$、初期・終端のエネルギー $(0,0)$ を取る。$0<\varepsilon<1/2$ とし、

$$
\Delta_\varepsilon=k_{\mathrm B}T\log\frac{1-\varepsilon}{\varepsilon}>0
$$

> を置く。初めに熱平衡にある記憶の状態1の準位を0から $\Delta_\varepsilon$ まで等温準静的に上げ、次に熱の交換なしに準位を0へ戻すと、終端分布は $(1-\varepsilon,\varepsilon)$ であり、準静的極限の平均仕事は

$$
\langle W_{\mathrm{reset}}\rangle
=k_{\mathrm B}T\{\log2-h(\varepsilon)\}
$$

> となる。$\varepsilon\downarrow0$ で仕事は $k_{\mathrm B}T\log2$ に近づくが、$\Delta_\varepsilon\to+\infty$ なので、この構成は有限準位での厳密な無誤差resetを示さない。
<!-- formal-statement-end -->

### 証明の見取り図

熱浴の下で準位をゆっくり上げると、状態1の平衡占有確率は減少します。分配関数から準静的仕事を求め、最後の瞬間的な準位復帰の仕事も加えると、下限とちょうど一致します。

<!-- proof-start -->
### 証明

操作中のエネルギーを $E_d(0)=0,E_d(1)=d$ とします。[SM3の正準分布](../../SM/SM3/index.md#def-sm3-canonical)と自由エネルギーは

$$
Z_d=1+e^{-\beta d},\qquad
\pi_d(1)=\frac{e^{-\beta d}}{1+e^{-\beta d}},\qquad
F_{\mathrm{eq}}(d)=-k_{\mathrm B}T\log Z_d.
$$

$d=\Delta_\varepsilon$ のとき $e^{-\beta d}=\varepsilon/(1-\varepsilon)$、ゆえに $\pi_d(1)=\varepsilon$、$\pi_d(0)=1-\varepsilon$ です。最初は $\pi_0=(1/2,1/2)$。準静的段階の仕事は平衡自由エネルギーの差なので、

$$
\begin{aligned}
W_1&=F_{\mathrm{eq}}(\Delta_\varepsilon)-F_{\mathrm{eq}}(0)\\
&=-k_{\mathrm B}T\log\frac1{1-\varepsilon}
+k_{\mathrm B}T\log2
=k_{\mathrm B}T\log\{2(1-\varepsilon)\}.
\end{aligned}
$$

最後に状態1の準位を瞬時に $\Delta_\varepsilon$ から0へ戻します。状態分布は変わらず、熱交換はないため、

$$
W_2=(1-\varepsilon)(0-0)+\varepsilon(0-\Delta_\varepsilon)
=-k_{\mathrm B}T\varepsilon\log\frac{1-\varepsilon}{\varepsilon}.
$$

合計は

$$
\begin{aligned}
W_1+W_2
&=k_{\mathrm B}T\left\{\log2+\log(1-\varepsilon)
-\varepsilon\log\frac{1-\varepsilon}{\varepsilon}\right\}\\
&=k_{\mathrm B}T\{\log2+(1-\varepsilon)\log(1-\varepsilon)
+\varepsilon\log\varepsilon\}\\
&=k_{\mathrm B}T\{\log2-h(\varepsilon)\}.
\end{aligned}
$$

最終分布は $r=(1-\varepsilon,\varepsilon)$ で、準位は両方0に戻りました。[偏りと誤りの下限](#prop-itd5-biased-error)と一致するので可逆極限で下限に達します。$\varepsilon\downarrow0$ では $\varepsilon\log\varepsilon\to0$ ですが、必要な $\Delta_\varepsilon$ は発散します。
<!-- proof-end -->

**有限段数との違い**：正の温度・有限な準位では、正準分布の各成分は正です。初期分布が全状態で正で、各熱浴接触が同じ正準分布を不変にするなら、その接触の後も分布は全状態で正のままです。実際、初期分布 $p$ と $\pi$ が全成分正なら $p(m)\ge c\pi(m)$ を満たす $c>0$ があり、接触後は

$$
(pK)(m)\ge c(\pi K)(m)=c\pi(m)>0
$$

です。準位変更は分布を変えません。したがって、有限回のこの種の操作で全支持の入力を厳密な $(1,0)$ へ移すことはできません。上の無誤差結果は極限として読み、到達不能性と仕事下限の証明を混ぜないでください。

偏った入力 $p=(u,1-u)$ から任意の正の終端分布 $r=(1-\varepsilon,\varepsilon)$ への準静的構成もできます。$0<u<1$、$0<\varepsilon<1$ とし、まず準位

$$
E^p(m)=-k_{\mathrm B}T\log\{2p(m)\}
$$

へ瞬間的に変えます。すると $Z_p=2$、$\pi_{E^p}=p$ なので、**変えた直後の分布は既に新しい準位での平衡分布**です。次に $E^p$ から $E^r(m)=-k_{\mathrm B}T\log\{2r(m)\}$ へ等温準静的に移り、最後に両準位を0へ瞬時に戻します。各段階の平均仕事は

$$
\begin{aligned}
W_a&=\sum_mp(m)E^p(m)=k_{\mathrm B}T\{H(p)-\log2\},\\
W_b&=F_{\mathrm{eq}}(E^r)-F_{\mathrm{eq}}(E^p)=0,\\
W_c&=-\sum_mr(m)E^r(m)=k_{\mathrm B}T\{\log2-H(r)\}.
\end{aligned}
$$

従って $W_a+W_b+W_c=k_{\mathrm B}T\{H(p)-H(r)\}$。この構成は、正の分布・自由に制御できる準位・十分遅い等温操作という追加条件の下での**到達可能性の例**です。有限時間の散逸がある操作や、制御できない障壁・記憶への書込み機構の費用まで無料にしたわけではありません。

## 5. 終端のHamiltonianを変えたままなら

記憶を0に偏らせるために状態1の準位を高くしたまま止める方法もあります。しかし、最終準位が最初と違うなら、記憶の平均内部エネルギーも変わります。ここを省くと「消去の仕事」と「準位を変えて蓄えたエネルギー」を取り違えます。

<a id="prop-itd5-energy-gap"></a>

<!-- formal-statement-start -->
> **命題（終端準位を変更した二状態記憶の下限）**  
> 温度 $T>0$ の単一熱浴で、初期分布 $p=(1/2,1/2)$、初期準位 $E_i=(0,0)$、終端分布 $r=(1-\varepsilon,\varepsilon)$、終端準位 $E_f=(0,\Delta)$、$0\le\varepsilon\le1/2$、$\Delta\in\mathbb R$ とする。[物理的reset](#def-itd5-physical-reset)が実現するなら、

$$
\langle W_{\mathrm{reset}}\rangle
\ge \varepsilon\Delta+k_{\mathrm B}T\{\log2-h(\varepsilon)\},
$$

> かつ熱浴へ渡す熱は

$$
\langle Q_{\mathrm{bath}}\rangle
\ge k_{\mathrm B}T\{\log2-h(\varepsilon)\}.
$$

> 仕事と放熱を同一視できるのは $\Delta U=0$ の場合に限る。
<!-- formal-statement-end -->

### 証明の見取り図

終端で状態1が確率 $\varepsilon$ だけ占有されるため、内部エネルギーは $\varepsilon\Delta$ です。これを自由エネルギー差へ足し、第一法則で放熱へ変換します。

<!-- proof-start -->
### 証明

初期平均エネルギーは0、終端は

$$
U[r,E_f]=(1-\varepsilon)\cdot0+\varepsilon\Delta=\varepsilon\Delta
$$

です。[仕事下限](#thm-itd5-reset-work-bound)へ $\Delta U=\varepsilon\Delta$、$H(p)=\log2$、$H(r)=h(\varepsilon)$ を入れて最初の不等式を得ます。第一法則 $\Delta U=\langle W_{\mathrm{reset}}\rangle-\langle Q_{\mathrm{bath}}\rangle$ から

$$
\langle Q_{\mathrm{bath}}\rangle
=\langle W_{\mathrm{reset}}\rangle-\varepsilon\Delta
\ge k_{\mathrm B}T\{\log2-h(\varepsilon)\}
$$

となります。
<!-- proof-end -->

例えば $\varepsilon=1/4$、$\Delta=k_{\mathrm B}T\log3$ とすると、終端分布はその準位の正準分布です。ここで準位を上げたまま終わる仕事と、準位を元に戻す仕事を別々に数える必要があります。[可逆構成](#prop-itd5-quasistatic-reset)の最終quenchを省いた場合は、$W_1=k_{\mathrm B}T\log(3/2)$、終端平均内部エネルギーは $(k_{\mathrm B}T/4)\log3$ です。実際、

$$
\frac{W_1}{k_{\mathrm B}T}
=\frac14\log3+\log2-h(1/4)
=\log\frac32.
$$

一方、同じ終端分布で準位を0に戻すと $W_2=-(k_{\mathrm B}T/4)\log3$ が加わります。片方の操作だけでLandauer下限の達成を判定しません。

## 6. 記憶の相関と装置の境界

これまでの不等式は、記憶の操作だけを系として評価でき、始終時に他の装置との相互作用エネルギーを計上しない場合でした。[ITD4の測定チャネル](../ITD4/index.md#def-itd4-measurement)で作った記憶は、制御対象と相関する場合があります。相関を捨てて記憶の周辺分布だけを見れば、共同操作で利用できる情報を見落とします。

例えば系 $X\in\{0,1\}$ と記憶 $M\in\{0,1\}$ が、確率 $1/2$ ずつ $(X,M)=(0,0),(1,1)$ にある場合を考えます。記憶だけを見れば一様ですが、$X$ が分かれば $M$ の値は確実です。共同操作 $(x,m)\mapsto(x,m\oplus x)$ は、全ての組に対して逆写像がある可逆な置換です。実際、$(0,0)\mapsto(0,0)$、$(1,1)\mapsto(1,0)$ となり、記憶が確実に0へ戻ります。ここで $\oplus$ は0と1の排他的論理和です。

両者の全準位が等しく、可逆な共同操作を理想化すれば、**全体系のエントロピーは操作前後とも $k_{\mathrm B}\log2$** で、無条件に $k_{\mathrm B}T\log2$ の散逸を要求することはできません。記憶のエントロピー減少と同時に、系・記憶間の相関も失われています。この共同操作を「記憶だけの、他を参照しないreset」と同一視してはいけません。

さらに、準位の変更を伴う書込みや測定で、記憶の分布が偏ることもあります。[ITD4の情報付き仕事上限](../ITD4/index.md#thm-itd4-feedback-work-bound)と本章のreset下限を足し合わせるときには、**同じ記憶分布、相関の残存量、装置の始終条件**を指定しなければなりません。ここが次章で扱う全装置循環の出発点です。

## 7. 演習：誤り率・可逆構成・循環収支

各問で仕事は記憶への入力を正とし、熱は浴への放出を正とします。エントロピーは自然対数で表します。

### Level A：記憶の分布を数える

#### A1. 消去誤りのある論理核

$p=(1/4,3/4)$ と、全ての行が $(3/4,1/4)$ の二状態核 $R$ を考える。(1) $pR$ を求め、(2) $R$ の行和と非負性を確認し、(3) この情報だけで仕事ゼロといえるか答えよ。

- Level: A
- ID: ITD5-A1

<!-- solution-start -->
**詳細解答**

行和は $3/4+1/4=1$ で全成分が非負です。出力0の確率は

$$
(pR)(0)=\frac14\frac34+\frac34\frac34=\frac34,
$$

出力1の確率は $(1/4)(1/4)+(3/4)(1/4)=1/4$ です。入力の値に依存しない核ですが、[物理的resetの定義](#def-itd5-physical-reset)ではエネルギーと熱浴接触をさらに指定します。従って、この行列だけで仕事ゼロとはいえません。
<!-- solution-end -->

#### A2. 一様ビットの無誤差消去

初期・終端準位がともに $(0,0)$ の二状態記憶を $p=(1/2,1/2)$ から $(1,0)$ へresetするとする。エントロピー変化と仕事・放熱の下限を求めよ。

- Level: A
- ID: ITD5-A2

<!-- solution-start -->
**詳細解答**

[記憶のエントロピー](#def-itd5-memory-entropy)から、初期 $S_i=k_{\mathrm B}\log2$、終期 $S_f=0$、ゆえに $\Delta S=-k_{\mathrm B}\log2$ です。$\Delta U=0$ なので[Landauer下限](#cor-itd5-landauer)より $W\ge k_{\mathrm B}T\log2$、$Q_{\mathrm{bath}}=W\ge k_{\mathrm B}T\log2$。これは無誤差操作の存在を仮定した下限で、有限準位の達成保証ではありません。
<!-- solution-end -->

#### A3. 偏った記憶の無誤差reset

初期分布 $(3/4,1/4)$、初期・終期準位 $(0,0)$、終端 $(1,0)$ のとき、仕事下限を自然対数の式で求めよ。

- Level: A
- ID: ITD5-A3

<!-- solution-start -->
**詳細解答**

[偏りと誤りを含む二状態resetの下限](#prop-itd5-biased-error)に $u=3/4,\varepsilon=0$ を代入します。

$$
W_{\min}=k_{\mathrm B}Th(3/4)
=k_{\mathrm B}T\left\{2\log2-\frac34\log3\right\}.
$$

$h(3/4)=h(1/4)<\log2$ なので、一様入力からの無誤差消去より必要仕事の下限は小さくなります。初期が偏っているという条件を外して $\log2$ を答えてはいけません。
<!-- solution-end -->

#### A4. 誤りを残す一様記憶

一様入力を終端 $(3/4,1/4)$ にする。両端のエネルギー準位は0とする。仕事下限を計算し、$\varepsilon=1/2$ の場合と比較せよ。

- Level: A
- ID: ITD5-A4

<!-- solution-start -->
**詳細解答**

終端誤り率 $\varepsilon=1/4$ です。[偏りと誤りを含む二状態resetの下限](#prop-itd5-biased-error)より

$$
W_{\min}=k_{\mathrm B}T\{\log2-h(1/4)\}
=k_{\mathrm B}T\left\{\frac34\log3-\log2\right\}>0.
$$

$\varepsilon=1/2$ なら終端も一様なので、$h(1/2)=\log2$ より下限0です。前者では出力の不確かさが減った分だけ追加の自由エネルギーが必要です。
<!-- solution-end -->

#### A5. 最後の準位にエネルギーが残る

初期 $(p,E_i)=((1/2,1/2),(0,0))$、終端 $(r,E_f)=((3/4,1/4),(0,\Delta))$、$\Delta>0$ とする。平均内部エネルギー変化、仕事・放熱の下限を求めよ。

- Level: A
- ID: ITD5-A5

<!-- solution-start -->
**詳細解答**

初期平均エネルギー0、終端は $(3/4)\cdot0+(1/4)\Delta=\Delta/4$、ゆえに $\Delta U=\Delta/4$。[終端準位を変更した二状態記憶の下限](#prop-itd5-energy-gap)より

$$
\begin{aligned}
W&\ge\frac{\Delta}{4}+k_{\mathrm B}T\{\log2-h(1/4)\},\\
Q_{\mathrm{bath}}=W-\frac{\Delta}{4}
&\ge k_{\mathrm B}T\{\log2-h(1/4)\}.
\end{aligned}
$$

エネルギーの増分 $\Delta/4$ を放熱に足してはいけません。
<!-- solution-end -->

### Level B：仮定を変えて導出する

#### B1. 情報を増やす操作なら仕事を取り出せるか

両端準位が0、初期分布 $(3/4,1/4)$、終端分布 $(1/2,1/2)$ の記憶を考える。(1) 仕事下限の符号を求めよ。(2) 正の確率の全状態について平衡に合わせる準位を用いることで、準静的極限で下限に達する操作を説明せよ。

- Level: B
- ID: ITD5-B1

<!-- solution-start -->
**詳細解答**

[偏りと誤りを含む二状態resetの下限](#prop-itd5-biased-error)へ $u=3/4,\varepsilon=1/2$ を入れると

$$
W\ge k_{\mathrm B}T\{h(3/4)-\log2\}<0.
$$

負の下限は「仕事の入力が不要」より強く、可逆操作なら最大 $k_{\mathrm B}T\{\log2-h(3/4)\}$ を取り出せるということです。具体的には最初に

$$
E^p(0)=-k_{\mathrm B}T\log(3/2),\qquad
E^p(1)=-k_{\mathrm B}T\log(1/2)
$$

へ瞬間quenchします。$e^{-\beta E^p}=(3/2,1/2)$、和は2なので新しい正準分布は $(3/4,1/4)$。仕事は $W_a=k_{\mathrm B}T\{h(3/4)-\log2\}$。この準位から等温準静的に $(0,0)$ へ戻す仕事は $F_{\mathrm{eq}}(0)-F_{\mathrm{eq}}(E^p)=0$（両者の分配関数は2）です。終端は一様で、総仕事が下限と一致します。
<!-- solution-end -->

#### B2. 有限の誤り率で可逆resetを組み立てる

初期一様・両端準位0のビットに対し、終端誤り率 $0<\varepsilon<1/2$ を達成する操作を、準位の準静的変更と最後のquenchで構成せよ。各段階の仕事、終端分布、$\varepsilon\downarrow0$ の極限を示せ。

- Level: B
- ID: ITD5-B2

<!-- solution-start -->
**詳細解答**

状態1の準位を $d:0\to\Delta_\varepsilon=k_{\mathrm B}T\log[(1-\varepsilon)/\varepsilon]$ と上げます。平衡占有確率は

$$
\pi_d(1)=\frac{1}{1+e^{\beta d}},
\qquad \pi_{\Delta_\varepsilon}(1)=\varepsilon.
$$

分配関数は初期2、終端 $1/(1-\varepsilon)$ なので、[可逆構成の命題](#prop-itd5-quasistatic-reset)と同じ自由エネルギー計算から $W_1=k_{\mathrm B}T\log[2(1-\varepsilon)]$ です。状態分布を固定して $d\to0$ と戻すquenchの仕事は $W_2=-\varepsilon\Delta_\varepsilon$。従って

$$
\begin{aligned}
W_1+W_2
&=k_{\mathrm B}T\left\{\log2+\log(1-\varepsilon)
-\varepsilon\log\frac{1-\varepsilon}{\varepsilon}\right\}\\
&=k_{\mathrm B}T\{\log2-h(\varepsilon)\}.
\end{aligned}
$$

最後の分布は $(1-\varepsilon,\varepsilon)$ のままです。$\varepsilon\downarrow0$ では $h(\varepsilon)\to0$、仕事は $k_{\mathrm B}T\log2$ に収束しますが、$\Delta_\varepsilon\to+\infty$ です。有限準位で厳密な0誤りを達成したことにはなりません。
<!-- solution-end -->

#### B3. なぜ全支持の記憶を有限段で完全消去できないか

有限状態で $p(m)>0$ が全状態に成立する。温度 $T>0$・有限準位 $E(m)$ の正準分布 $\pi(m)>0$ を不変にする任意の遷移核 $K$ が一回の熱浴接触を表すとする。全支持が保たれることを証明し、有限回のquenchと接触で $(1,0)$ が実現しない理由を述べよ。

- Level: B
- ID: ITD5-B3

<!-- solution-start -->
**詳細解答**

有限状態なので $c=\min_m p(m)/\pi(m)>0$ が取れます。各 $p(m)\ge c\pi(m)$ と核の非負性から

$$
(pK)(z)=\sum_mp(m)K(m,z)
\ge c\sum_m\pi(m)K(m,z)
=c\pi(z)>0.
$$

最後の等号は $\pi K=\pi$ です。quenchでは分布は変わらず、有限準位の新しい正準分布も全成分正です。従って有限回の接触とquenchに同じ議論を帰納的に適用すると、分布は常に全支持です。$(1,0)$ は状態1の確率が0で全支持でないので、この模型で有限回には達成できません。これは[Landauer下限](#cor-itd5-landauer)が無意味ということではなく、可逆な零誤り**極限**を有限操作と区別すべきことを示します。
<!-- solution-end -->

#### B4. 相関を利用した可逆な記憶の初期化

二つの等エネルギービット $X,M$ の初期結合分布を $P(0,0)=P(1,1)=1/2$（他は0）とする。共同写像 $f(x,m)=(x,m\oplus x)$ を全4状態で考える。(1) 可逆性、(2) 終端記憶分布、(3) 始終の結合エントロピーを調べ、「一様な記憶のresetは常に $k_{\mathrm B}T\log2$ の散逸を伴う」という主張の欠けた仮定を説明せよ。

- Level: B
- ID: ITD5-B4

<!-- solution-start -->
**詳細解答**

$f(f(x,m))=(x,(m\oplus x)\oplus x)=(x,m)$ なので $f$ は逆写像を自分自身に持ち、全4状態で一対一です。初期の非零確率点は $(0,0)$ と $(1,1)$ で、写像後は $(0,0)$ と $(1,0)$ に各1/2ずつ移ります。従って終端の $M$ は確率1で0、$X$ は一様のままです。

初期結合分布と終端結合分布は、いずれも確率1/2の状態が二つなので結合エントロピーはともに $\log2$ natです。一方、記憶の周辺エントロピーは $\log2\to0$。失われたのは $X$ と $M$ の完全相関でもあります。外部の $X$ を使う**共同可逆操作**であり、記憶だけを他から独立に熱消去する[Landauer系](#cor-itd5-landauer)の前提ではありません。物理的な可逆操作を実装できるという理想化を別途要し、相関や操作装置の費用を除外して一般化してはいけません。
<!-- solution-end -->

### Level C：測定・抽出・消去の帳簿を接続する

#### C1. 雑音センサーの情報を使い終えた後の記憶

等エネルギー二状態系 $X$ を平衡分布 $(1/2,1/2)$ で開始し、初期化済みの二状態記憶 $M$ に、[ITD4の二値対称測定](../ITD4/index.md#prop-itd4-binary-channel)の結果 $Y$ を記録する。誤り率は $0<\varepsilon<1/2$ とする。測定の反作用はなく、系へのフィードバックはITD4の理想可逆極限に達し、終端の系分布は**各測定結果を固定しても**一様、準位は元の0へ戻るとする。記憶は $Y$ を保持していて、抽出後の系と独立である。記憶の初期・終端準位はともに0とし、最後は記憶を無誤差で0へ戻す理想極限を考える。測定操作自体の仕事はまだ帳簿へ入れていない。

1. 記憶 $M$ の分布と、系の測定情報 $I_{\mathrm{nat}}(X;Y)$ を求めよ。
2. 系へのフィードバックによる平均仕事 $W_X$ と、独立となった記憶へのresetの平均仕事下限 $W_M$ を求めよ。
3. $W_X+W_M$ の下限を求め、完全測定極限と無情報測定極限を検算せよ。
4. この値だけで、測定器・外部制御源まで含む全装置の正確な周期仕事が決まったと言えるか、相関と測定費用の仮定に触れて説明せよ。

- Level: C
- ID: ITD5-C1

<!-- solution-start -->
**詳細解答**

**1. 結果分布と情報**　系 $X$ は一様で測定は対称なので、各 $y\in\{0,1\}$ について

$$
P(Y=y)=\frac12(1-\varepsilon)+\frac12\varepsilon=\frac12.
$$

測定結果を保持した記憶 $M=Y$ の分布も $(1/2,1/2)$ です。[二値対称測定の相互情報量](../ITD4/index.md#prop-itd4-binary-channel)から、相互情報量は

$$
I_{\mathrm{nat}}(X;Y)=\log2-h(\varepsilon).
$$

**2. 系と記憶の仕事**　[ITD4の情報付き仕事上限](../ITD4/index.md#thm-itd4-feedback-work-bound)では、始終で系の準位が0に戻るため $\Delta F_{\mathrm{eq}}=0$。問題文で可逆極限に達すると仮定したので

$$
W_X=-k_{\mathrm B}T I_{\mathrm{nat}}(X;Y)
=-k_{\mathrm B}T\{\log2-h(\varepsilon)\}.
$$

フィードバックの終端は**各結果に条件付けても一様**です。従って記憶値によって系の終端分布が違うことはなく、系と記憶は独立です。記憶は一様のままで初期・終端準位は0なので、[Landauer下限](#cor-itd5-landauer)から

$$
W_M\ge k_{\mathrm B}T\log2
$$

です。無誤差resetの下限は零誤り極限として解釈します。

**3. 差し引き**　系から取り出した仕事を負として足し合わせると

$$
\begin{aligned}
W_X+W_M
&\ge-k_{\mathrm B}T\{\log2-h(\varepsilon)\}
+k_{\mathrm B}T\log2\\
&=k_{\mathrm B}T h(\varepsilon)\ge0.
\end{aligned}
$$

$\varepsilon\downarrow0$ では $h(\varepsilon)\to0$ となり、抽出上限とreset下限はともに $k_{\mathrm B}T\log2$ の大きさで釣り合います。$\varepsilon\uparrow1/2$ では $h(\varepsilon)\to\log2$、測定情報と抽出仕事が0でも記憶に一様な無情報結果が残るため、reset下限は $k_{\mathrm B}T\log2$ のままです。

**4. 装置の境界**　ここでは測定器が結果を記憶へ書き込むまでの仕事、コントローラの操作費用、記憶と浴の初期化・相互作用エネルギーを指定していません。従って計算したのは**系への可逆フィードバック仕事と、終端で独立となった記憶へのreset仕事の下限を足した値**です。無情報の結果をそもそも記録しない設計や、系との相関が残るうちに共同操作を行う設計なら、同じ帳簿は直接使えません。全装置を周期的に戻すには、測定から最後まで全要素の始終状態をそろえる必要があります。
<!-- solution-end -->

## 8. 次に問うこと

本章で得た $k_{\mathrm B}T\log2$ は、温度・分布・準位・記憶単独という境界を明示した結果です。偏った入力や誤りを含むresetでは $k_{\mathrm B}T\{H(p)-H(r)\}$ へ変わり、終端のエネルギーが変われば $\Delta U$ が別に加わります。可逆極限を議論できることと、有限の時間・準位で厳密な無誤差resetを実装できることも別です。

次の課題は、系、記憶、測定器、浴、外部仕事源を**一つの周期的な装置**として追い、途中に残る相関と各段階の仕事・熱を同時に閉じることです。
