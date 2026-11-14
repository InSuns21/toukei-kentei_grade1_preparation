# SP11 Poisson の重ね合わせ・間引き・印付き到着

[SP10 の Poisson 過程](../SP10/index.md#thm-sp10-exponential-construction)では、一種類の到着について、独立定常増分と指数待ち時間が同じ仕組みを記述することを学びました。現実には、電話は複数の窓口へ届き、工場の故障は種類ごとに集計されます。二つの到着流を足したり、一つの到着流を色分けしたりすると、Poisson 性は残るでしょうか。

本講では **重ね合わせ → 独立な印による分類 → 分類の逆操作 → 一件ごとに重みを付けた合計** の順に考えます。到着回数を知っている場合と、知らない場合とでは独立性の見え方が異なることが核心です。確率母関数は、非負整数値変数 $K$ に対して $E[z^K]$（$0\le z\le1$）と書きます。

時間は $t\ge0$、区間 $(s,t]$ の到着数を $N_t-N_s$ とします。[SP10 の Poisson 計数](../SP10/index.md#thm-sp10-exponential-construction)でいう率 $\lambda>0$ の過程は、$N_0=0$、独立定常増分、区間長 $h$ の件数が平均 $\lambda h$ の Poisson 分布という条件を持ちます。個々の到着はほぼ確実に同時刻へ重ならない単位跳躍です。

## 1. 独立な到着流を重ねる

率 $2$ の受付窓口と率 $3$ の受付窓口が独立に来客を受けるなら、全体の平均到着数は時間 $t$ あたり $5t$ です。しかし平均が加法的であるだけでは Poisson 分布とは言えません。**すべての区間での分布と独立増分**を調べます。

<a id="thm-sp11-superposition"></a>

<!-- formal-statement-start -->
> **定理（独立 Poisson 過程の重ね合わせ）**  
> 同一確率空間上で $N^{(1)},\ldots,N^{(r)}$ を互いに独立な Poisson 過程とし、各率を $\lambda_j>0$（$j=1,\ldots,r$、$r\ge2$）とする。合成過程を次で定める。

$$
N_t=\sum_{j=1}^rN_t^{(j)}
$$

> このとき $N$ は率 $\Lambda=\sum_{j=1}^r\lambda_j$ の Poisson 過程である。異なる流の到着時刻は確率 $1$ で一致せず、$N$ の跳躍は大きさ $1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

同じ区間における件数の確率母関数を掛けると、Poisson 分布の率が加算されます。離れた区間の増分ベクトルは元の過程の独立性から独立です。最後に、独立な流どうしの到着時刻が一致しないことを別途確認します。

<!-- proof-start -->
### 証明

まず $0\le s<t$、$h=t-s$ とし、$K_j=N_t^{(j)}-N_s^{(j)}$ と置きます。各 $K_j$ は平均 $\lambda_jh$ の Poisson 分布なので、$0\le z\le1$ について

$$
\begin{aligned}
E[z^{K_j}]
&=\sum_{n=0}^{\infty}z^n e^{-\lambda_jh}
  \frac{(\lambda_jh)^n}{n!}\\
&=e^{-\lambda_jh}\exp(\lambda_jhz)
=\exp\{\lambda_jh(z-1)\}.
\end{aligned}
$$

各流の独立性により $K_1,\ldots,K_r$ は独立です。従って $K=\sum_jK_j$ では

$$
E[z^K]=\prod_{j=1}^rE[z^{K_j}]
=\exp\{\Lambda h(z-1)\}.
$$

最後の式を $e^{-\Lambda h}\sum_{n\ge0}(\Lambda hz)^n/n!$ と展開すれば

$$
P(K=n)=e^{-\Lambda h}\frac{(\Lambda h)^n}{n!},
\qquad n=0,1,2,\ldots
$$

が従います。確率母関数の係数を比較できるのは、絶対収束する冪級数で各係数が一意に決まるためです。

独立増分も確認します。互いに素な有限個の時間区間 $I_1,\ldots,I_m$ を取ります。同一流 $j$ について $(N^{(j)}(I_1),\ldots,N^{(j)}(I_m))$ の成分は独立で、異なる $j$ のベクトルも独立です。したがって $r m$ 個の件数の同時確率母関数は各区間・各流の確率母関数の積となり、区間ごとにまとめると $\prod_{\ell=1}^m\exp\{\Lambda |I_\ell|(z_\ell-1)\}$ となります。ゆえに $N(I_1),\ldots,N(I_m)$ は独立です。$N_0=0$ も各流から従います。

単位跳躍を確かめます。[SP10 の到着時刻構成](../SP10/index.md#thm-sp10-exponential-construction)より、各流の第 $n$ 到着時刻 $T_n^{(j)}$ は独立な指数待ち時間の和です。従って各 $T_n^{(j)}$ の分布は密度を持ち、特定の実数時刻を取る確率は $0$ です。独立な二つの流 $j\ne k$ について $T_n^{(j)}$ と $T_m^{(k)}$ も独立なので

$$
P(T_n^{(j)}=T_m^{(k)})
=\int P(T_n^{(j)}=u)\,P_{T_m^{(k)}}(du)=0.
$$

流の組と到着番号は可算個です。これらの一致事象の可算和の確率も $0$ なので、異なる流の到着はほぼ確実に一致しません。元の各流にも同時到着はなく、和の跳躍は $1$ です。
<!-- proof-end -->

**具体例**：率 $2$ と率 $3$ の独立な流を合わせると、単位時間にちょうど二件来る確率は $e^{-5}5^2/2$ です。平均が $5$ になるだけでなく、全区間の計数分布と独立増分がそろって率 $5$ の Poisson 過程になります。

**独立性を外す反例**：率 $\lambda$ の一つの Poisson 過程 $H$ を二度数え、$N^{(1)}=N^{(2)}=H$ とします。各周辺過程は率 $\lambda$ の Poisson 過程ですが、和は $2H_t$ で常に偶数値です。$t>0$ で率 $2\lambda$ の Poisson 分布なら一件到着の確率は $2\lambda t e^{-2\lambda t}>0$ なので一致しません。また各到着時に $2$ 跳びます。**異なる流どうしの独立性がないため、積の確率母関数も使えない**のです。

## 2. 一つの流の到着に印を付ける

次は逆に、率 $\lambda$ の Poisson 到着を「電話／メール」など複数の種類へ分けます。分類を $N_t$ の件数だけから決めるのではなく、**各到着に独立に**印を振ります。

<a id="def-sp11-independent-marking"></a>

<!-- formal-statement-start -->
> **定義（独立な印付き到着）**  
> 率 $\lambda>0$ の Poisson 過程 $N$ の到着時刻を $T_1<T_2<\cdots$ とする。印の種類を有限集合 $K=\{1,\ldots,r\}$（$r\ge2$）で表す。
>
> $q_j\ge0$（$j\in K$）を種類ごとの確率とし、$\sum_jq_j=1$ とする。$K$ 値の印 $J_1,J_2,\ldots$ は相互に独立で、各到着に対して同じ確率分布に従う。すなわち、

$$
P(J_n=j)=q_j\qquad(n\ge1,\ j\in K)
$$

> さらに印の**列全体**が元の計数過程 $N$ と独立であるとき、$(T_n,J_n)_{n\ge1}$ を独立な印付き到着という。種類 $j$ の計数過程は次で定める。

$$
N_t^{[j]}=\sum_{n\ge1}\boldsymbol{1}_{\{T_n\le t\}}\boldsymbol{1}_{\{J_n=j\}}.
$$
<!-- formal-statement-end -->

各到着で新たに印を付けるとき、直前の印もすべての到着時刻も参照しない、という条件です。各有限時刻までの到着数は [SP10 の単純計数過程](../SP10/index.md#def-sp10-simple-counting)として有限なので、上の和には有限個しか非零項がありません。

<!-- definition-example-start: def-sp11-independent-marking -->
### 直接例：六件／時間の流を三種類へ

率 $6$ の Poisson 過程を用意し、元の到着と独立な一様乱数 $U_1,U_2,\ldots$ を独立に発生させます。$U_n<1/2$ を種類1、$1/2\le U_n<5/6$ を種類2、残りを種類3とします。この構成で

$$
(q_1,q_2,q_3)=\left(\frac12,\frac13,\frac16\right).
$$

各 $U_n$ が独立同分布なので印も独立同分布であり、元の流と一様乱数列が独立なら印の列全体も元の流と独立です。確率は非負で合計 $1$、到着ごとにちょうど一つの種類が付きます。したがって定義のすべての条件を満たし、標本路ごとに $\sum_jN_t^{[j]}=N_t$ です。
<!-- definition-example-end -->

各種類を数えれば元の件数が復元できることは明らかですが、種類別の過程まで互いに独立かどうかは別問題です。固定された総件数のもとではむしろ競合します。

<a id="thm-sp11-thinning"></a>

<!-- formal-statement-start -->
> **定理（独立間引きと多種類分割）**  
> 率 $\lambda>0$ の Poisson 過程 $N$ に、[独立な印付き到着](#def-sp11-independent-marking)として有限印集合 $K=\{1,\ldots,r\}$、印確率 $q_1,\ldots,q_r$ を与える。このとき種類別の計数過程 $N^{[1]},\ldots,N^{[r]}$ は**互いに独立**であり、$N^{[j]}$ は率 $\lambda q_j$ の Poisson 過程である（$q_j=0$ の場合は恒等的に $0$ の退化過程とする）。任意の $0\le s<t$ について、$N_t-N_s=n$ という条件の下では種類別の件数は多項分布に従い、その確率は

$$
P\left(N^{[j]}_t-N^{[j]}_s=k_j\ (1\le j\le r)\mid N_t-N_s=n\right)
=\frac{n!}{\prod_{j=1}^r k_j!}\prod_{j=1}^r q_j^{k_j}.
$$

> ただし $k_j$ は非負整数、$\sum_j k_j=n$ とし、$0^0=1$ と約束する。
<!-- formal-statement-end -->

### 証明の見取り図

総件数を $n$ に固定すれば各到着への独立な印付けは多項試行です。総件数を Poisson 分布で混ぜ直すと、その同時確率母関数が種類ごとの積へ分解します。さらに異なる時間区間の独立性を確認して、**一時刻の独立な件数**だけで終わらせないようにします。

<!-- proof-start -->
### 証明

$h=t-s>0$、区間の総件数を $K=N_t-N_s$、種類 $j$ の件数を $K_j=N^{[j]}_t-N^{[j]}_s$ とします。$K=n$ の下ではその区間にちょうど $n$ 個の到着があります。印の列全体は $N$ と独立で、到着順の $n$ 個の印も互いに独立です。従って $(K_1,\ldots,K_r)$ の条件付き分布は、声明の多項分布になります。

次に非負整数 $k_1,\ldots,k_r$ と $n=\sum_j k_j$ を固定します。$K$ が平均 $\lambda h$ の Poisson 分布なので、全確率公式から

$$
\begin{aligned}
P(K_1=k_1,\ldots,K_r=k_r)
&=P(K=n)\frac{n!}{\prod_jk_j!}\prod_jq_j^{k_j}\\
&=e^{-\lambda h}\frac{(\lambda h)^n}{n!}
\frac{n!}{\prod_jk_j!}\prod_jq_j^{k_j}\\
&=\prod_{j=1}^r
\left[e^{-\lambda hq_j}\frac{(\lambda hq_j)^{k_j}}{k_j!}\right].
\end{aligned}
$$

最後の式では $e^{-\lambda h}=\prod_j e^{-\lambda hq_j}$ と $(\lambda h)^n=\prod_j(\lambda h)^{k_j}$ を使いました。よって $K_j$ は互いに独立な平均 $\lambda hq_j$ の Poisson 変数です。

**異なる種類・異なる区間を通した独立性**を調べます。互いに素な時間区間 $I_1,\ldots,I_m$ を取り、$N(I_\ell)$ を元の流の区間件数とします。

元の Poisson 過程は独立増分を持つので、$N(I_\ell)$ は $\ell$ ごとに独立です。元の到着時刻列を固定すると、区間ごとの印は重複しない添字集合に属します。印の列自体が元の過程と独立であり、印どうしも独立なので、条件付きの分類は区間間で独立です。

種類 $j$、区間 $I_\ell$ ごとに $0\le z_{\ell j}\le1$ を取ります。まず元の区間件数を固定した条件付き確率母関数を計算すると

$$
E\left[\prod_{\ell=1}^m\prod_{j=1}^r
z_{\ell j}^{N^{[j]}(I_\ell)}\ \middle|\ N(I_1),\ldots,N(I_m)\right]
=\prod_{\ell=1}^m\left(\sum_{j=1}^r q_jz_{\ell j}\right)^{N(I_\ell)}.
$$

$N(I_\ell)$ は独立で平均 $\lambda|I_\ell|$ の Poisson 分布なので、その確率母関数を各 $\ell$ に適用して

$$
\begin{aligned}
E\left[\prod_{\ell,j}z_{\ell j}^{N^{[j]}(I_\ell)}\right]
&=\prod_{\ell=1}^m
\exp\left\{\lambda|I_\ell|
\left(\sum_{j=1}^rq_jz_{\ell j}-1\right)\right\}\\
&=\prod_{\ell=1}^m\prod_{j=1}^r
\exp\{\lambda q_j|I_\ell|(z_{\ell j}-1)\}.
\end{aligned}
$$

最後は $\sum_jq_j=1$ を使いました。右辺は全ての組 $(\ell,j)$ に対応する Poisson 確率母関数の積です。従ってこれらの区間別・種類別件数はすべて独立であり、種類別の計数過程も互いに独立です。

各 $N^{[j]}$ は、元の単純計数過程の到着の一部だけを数えるため、$0$ から始まり、非減少・右連続、単位跳躍で有限区間に有限個の到着を持ちます。分布は区間長だけに依存し、独立増分も成り立つので、率 $\lambda q_j$ の Poisson 過程です。$q_j=0$ の場合は到着がなく恒等的に $0$ です。
<!-- proof-end -->

**二種類の間引き**は $r=2$、$q_1=p$、$q_2=1-p$ の場合です。元の到着の一部を確率 $p$ で保存し、残りを捨てても、保存流と捨てた流は独立な Poisson 過程になります。

たとえば率 $6$ から保存率 $1/3$ で抽出した流は率 $2$、残りは率 $4$ です。区間長 $t$ に保存件数が $2$、捨てた件数が $1$ となる確率は

$$
\left(e^{-2t}\frac{(2t)^2}{2!}\right)
\left(e^{-4t}\frac{4t}{1!}\right).
$$

一方で、**総件数を $3$ に固定した条件の下**では、保存件数と廃棄件数の和は必ず $3$ ですから独立ではありません。定理の独立性は *Poisson 型に変動する総件数を条件付けない場合* の結論です。

## 3. 二つの独立な流を合わせ、出身を印として戻す

重ね合わせで出身ラベルを記録すれば、分割の逆を実行できます。率 $2$ と率 $3$ の流をまとめた到着がどちらから来たかは、毎回 $2:3$ の比率で決まるのでしょうか。

<a id="prop-sp11-reverse-marking"></a>

<!-- formal-statement-start -->
> **命題（重ね合わせた到着の出身印）**  
> $r\ge2$ 個の互いに独立な Poisson 過程 $N^{(j)}$ の率を $\lambda_j>0$ とし、$\Lambda=\sum_j\lambda_j$ とする。重ね合わせた過程 $N=\sum_jN^{(j)}$ の第 $n$ 到着時刻を $T_n$、その到着が属する流の番号を $J_n$ とする。このとき $J_1,J_2,\ldots$ は独立同分布で、印の確率は

$$
P(J_n=j)=\frac{\lambda_j}{\Lambda}\qquad(n\ge1,\ 1\le j\le r).
$$

> また、印の列全体は重ね合わせた計数過程 $N$ と独立である。
<!-- formal-statement-end -->

### 証明の見取り図

それぞれの流で次の一件までの時間は独立な指数分布です。最初に鳴る時計の種類は各率の比になり、最初に鳴る時刻そのものとは独立です。鳴ったあとも、指数分布の無記憶性で時計を再始動できます。

<!-- proof-start -->
### 証明

まず各流の初到着待ち時間 $W_j$ は率 $\lambda_j$ の独立な指数分布です（[SP10 の指数待ち時間構成](../SP10/index.md#thm-sp10-exponential-construction)）。$W=\min_jW_j$、最小を取る流を $J$ とします。待ち時間は連続分布なので同着の確率は $0$ です。$t>0$ について、流 $j$ の時計が $t$ で鳴る密度 $\lambda_j e^{-\lambda_jt}$ に、他の時計が時刻 $t$ まで鳴らない生存確率を掛けると、$W$ と $J=j$ の同時密度は

$$
\begin{aligned}
f_{W,J}(t,j)
&=\lambda_je^{-\lambda_jt}
\prod_{k\ne j}e^{-\lambda_kt}\\
&=\lambda_je^{-\Lambda t}.
\end{aligned}
$$

つまり $(W,J)$ の時間に関する同時密度は $\lambda_je^{-\Lambda t}$ です。これを $j$ について和を取れば $W$ の密度は $\Lambda e^{-\Lambda t}$、従って

$$
P(J=j\mid W=t)=\frac{\lambda_je^{-\Lambda t}}{\Lambda e^{-\Lambda t}}
=\frac{\lambda_j}{\Lambda}
$$

がほとんどすべての $t>0$ で成り立ちます。よって $J$ と $W$ は独立です。

最初の到着時刻 $W=t$ と出身流 $J=j$ が分かった後、流 $j$ の次の待ち時間は元の流の独立指数待ち時間の次の一個であり、率 $\lambda_j$ の指数分布です。他の流 $k\ne j$ では $W_k>t$ が判明していますが、指数分布の無記憶性から

$$
P(W_k-t>u\mid W_k>t)
=\frac{e^{-\lambda_k(t+u)}}{e^{-\lambda_kt}}
=e^{-\lambda_ku}
$$

となり、残り待ち時間は再び率 $\lambda_k$ の指数分布です。元の流どうしは独立で、その後の新たな待ち時間も独立なので、再始動後の時計の組は過去の到着時刻・印によらず最初と同じ独立指数時計です。以上を到着ごとに繰り返せば、合成流の待ち時間は率 $\Lambda$ の独立指数列で、各回の印は確率 $\lambda_j/\Lambda$ の独立同分布、しかも待ち時間列と独立です。到着時刻と計数過程は待ち時間列から定まるので、印の列全体と $N$ も独立です。
<!-- proof-end -->

この命題は単に一回目のラベル比率を述べているのではありません。**時刻を全部観測していても、どの流の到着だったかは互いに独立な確率 $\lambda_j/\Lambda$ で割り当てられる**ことまで保証しています。

[SP10 の条件付き到着時刻定理](../SP10/index.md#prop-sp10-conditional-arrival-times)によると、$N_t=n$ の条件で時刻 $0<T_1<\cdots<T_n<t$ は区間 $(0,t)$ の一様乱数 $n$ 個の順序統計量です。今の命題により、この条件付き時刻配置と印の列は独立です。したがって「いつ来たか」と「どこから来たか」を別々に再現できます。

## 4. 印に重みを持たせる：複合 Poisson 過程

到着を種類別に数えるだけでなく、一件ごとの荷物の重さや故障による損失を足したい場合があります。その合計は一般に一件ずつ $1$ 増えるわけではなく、通常の計数過程と異なります。

<a id="def-sp11-compound-poisson"></a>

<!-- formal-statement-start -->
> **定義（有限印を持つ複合 Poisson 過程）**  
> 率 $\lambda>0$ の Poisson 過程 $N$ と、それと独立で互いに独立同分布な実数値印 $Y_1,Y_2,\ldots$ を取る。印の取り得る値は有限集合 $\{a_1,\ldots,a_r\}\subset\mathbb R$、$P(Y_n=a_j)=q_j$、$\sum_jq_j=1$ とする。このとき、次で定める過程 $X$ を考える。

$$
X_t=\sum_{n=1}^{N_t}Y_n,\qquad X_0=0
$$

> この $X$ を有限印を持つ複合 Poisson 過程という。空和は $0$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sp11-compound-poisson -->
### 直接例：故障一件の損失が一単位か二単位

故障回数 $N$ が率 $3$ の Poisson 過程で、各故障の損失 $Y_n$ が確率 $2/3$ で $1$、確率 $1/3$ で $2$ になるとします。

各 $Y_n$ は同じ有限集合 $\{1,2\}$ に値を取り、印どうしは独立で、どの故障でも同じ分布を持つと仮定します。$N$ と印の列全体も独立とします。これで[有限印の定義](#def-sp11-compound-poisson)の条件を個別に確認できました。

ある時刻までに損失 $1$ の故障が $2$ 件、損失 $2$ の故障が $1$ 件あれば、総故障数は $3$、合計損失は

$$
X_t=1+1+2=4.
$$

$X$ の跳躍には大きさ $2$ もあるので、$X$ 自身は[単純計数過程](../SP10/index.md#def-sp10-simple-counting)ではありません。
<!-- definition-example-end -->

<a id="prop-sp11-compound-moments"></a>

<!-- formal-statement-start -->
> **命題（有限印の複合 Poisson 過程の分布とモーメント）**  
> 上の[有限印を持つ複合 Poisson 過程](#def-sp11-compound-poisson)について $m_1=E[Y_1]=\sum_jq_ja_j$、$m_2=E[Y_1^2]=\sum_jq_ja_j^2$ と置く。各 $t\ge0$、実数 $u$ に対して、次の特性関数と平均・分散を持つ。

$$
E[e^{iuX_t}]=\exp\left\{\lambda t\left(\sum_j q_j e^{iua_j}-1\right)\right\}.
$$

$$
E[X_t]=\lambda t\,m_1,\qquad \operatorname{Var}(X_t)=\lambda t\,m_2.
$$

> また、$X$ は独立定常増分を持つ。ただし $X_t$ が Poisson 分布に従うとは一般には言えない。
<!-- formal-statement-end -->

### 証明の見取り図

$N_t=n$ と固定すれば合計は独立な印 $n$ 個の和です。印の分布を平均してから Poisson 件数について混ぜると指数関数になります。平均・分散は条件付き期待値と全分散公式で求めます。

<!-- proof-start -->
### 証明

$N_t=n$ の条件では印の和の複素指数は積に分かれるので

$$
E[e^{iuX_t}\mid N_t=n]
=\prod_{k=1}^nE[e^{iuY_k}]
=\left(\sum_{j=1}^rq_je^{iua_j}\right)^n.
$$

$N_t$ の Poisson 確率質量関数で平均すると

$$
\begin{aligned}
E[e^{iuX_t}]
&=\sum_{n=0}^\infty e^{-\lambda t}
\frac{(\lambda t)^n}{n!}
\left(\sum_jq_je^{iua_j}\right)^n\\
&=\exp\left\{\lambda t\left(\sum_jq_je^{iua_j}-1\right)\right\}.
\end{aligned}
$$

有限印のため $m_1,m_2$ は有限です。条件付きの平均と分散は $E[X_t\mid N_t]=m_1N_t$、$\operatorname{Var}(X_t\mid N_t)=(m_2-m_1^2)N_t$ です。Poisson 分布では $E[N_t]=\operatorname{Var}(N_t)=\lambda t$ なので

$$
\begin{aligned}
E[X_t]&=m_1E[N_t]=\lambda t m_1,\\
\operatorname{Var}(X_t)
&=E[\operatorname{Var}(X_t\mid N_t)]
+\operatorname{Var}(E[X_t\mid N_t])\\
&=(m_2-m_1^2)\lambda t+m_1^2\lambda t
=\lambda t m_2.
\end{aligned}
$$

独立定常増分については、互いに素な時間区間に含まれる印は、元の過程を固定したとき互いに異なる添字の印です。元の区間件数も独立で分布は区間長だけに依存するので、区間の印付き和は独立で、分布も区間長だけで決まります。これは[独立間引きの定理](#thm-sp11-thinning)の有限種類に対して $X_t=\sum_j a_jN_t^{[j]}$ と書いても確認できます。
<!-- proof-end -->

直接例の損失 $Y$ について、$m_1=1(2/3)+2(1/3)=4/3$、$m_2=1^2(2/3)+2^2(1/3)=2$ です。ゆえに

$$
E[X_t]=4t,\qquad \operatorname{Var}(X_t)=6t.
$$

もし $X_t$ が平均 $4t$ の Poisson 分布なら分散も $4t$ でなければならず、$t>0$ で矛盾します。**独立定常増分は保たれても、跳躍の大きさが一定の $1$ でなければ普通の Poisson 計数にはなりません。**

## 5. 印の独立性が崩れると何が壊れるか

印付けの仮定を一つだけ変えてみます。元の率 $\lambda$ の Poisson 過程 $N$ に対し、到着全体に共通の一個の Bernoulli 変数 $B$（$P(B=1)=p$、$0<p<1$）を割り当てます。$B$ は $N$ と独立とし、$B=1$ なら全件を保存、$B=0$ なら全件を捨てることにして $R_t=BN_t$ と置きます。

個々の到着が保存される確率は $p$ ですが、印は到着どうしで独立ではありません。実際、$\mu=\lambda t>0$ とすると

$$
P(R_t=0)=(1-p)+p e^{-\mu}.
$$

一方、独立間引きなら率 $p\lambda$ なので零件確率は $e^{-p\mu}$ です。指数関数の厳密な凸性から $(1-p)e^0+p e^{-\mu}>e^{-p\mu}$。したがって $R$ は率 $p\lambda$ の Poisson 過程ではありません。元の流から独立な乱数を**毎回新しく**使う必要があることが分かります。

別の失敗は「一件目を種類1、二件目を種類2、三件目を種類1、…」と交互に付ける場合です。種類1の件数は $\lceil N_t/2\rceil$ で、零件となるのは $N_t=0$ の場合だけです。確率は $e^{-\lambda t}$ で、率 $\lambda/2$ の Poisson 過程が持つ $e^{-\lambda t/2}$ とは違います。ここでは印が到着番号に依存するため、独立同分布という仮定を失っています。

## 6. 演習 Level A：合成・分割・基本確率

#### SP11-A01 重ね合わせた件数
- Level: A

率 $2$ と率 $3$ の互いに独立な Poisson 過程の和を $N$ とする。$P(N_1=2)$、$E[N_2]$、$\operatorname{Var}(N_2)$ を求めよ。

<!-- solution-start -->
### 詳細解答

[重ね合わせの定理](#thm-sp11-superposition)を二つの流に適用すると、合成率は $2+3=5$ です。従って $N_1\sim\operatorname{Poisson}(5)$、$N_2\sim\operatorname{Poisson}(10)$ であり、

$$
P(N_1=2)=e^{-5}\frac{5^2}{2!}
=\frac{25}{2}e^{-5}.
$$

Poisson 分布の平均と分散はどちらも母数なので $E[N_2]=10$、$\operatorname{Var}(N_2)=10$ です。率を加えるのは二つの流が独立であるためです。
<!-- solution-end -->

#### SP11-A02 保存流と廃棄流
- Level: A

率 $6$ の Poisson 到着を、各到着ごと独立に確率 $1/3$ で保存する。区間 $(0,1]$ の保存件数が $2$、廃棄件数が $1$ である確率を求めよ。

<!-- solution-start -->
### 詳細解答

[独立間引きの定理](#thm-sp11-thinning)に率 $\lambda=6$、$p=1/3$ を代入します。保存率は $6/3=2$、廃棄率は $6(2/3)=4$ で、二流は独立です。したがって求める同時確率は

$$
P(R_1=2,D_1=1)
=\left(e^{-2}\frac{2^2}{2!}\right)
\left(e^{-4}\frac{4}{1!}\right)
=8e^{-6}.
$$

同時に合計三件という条件を別に掛ける必要はありません。総件数の変動を織り込んだ同時確率です。
<!-- solution-end -->

#### SP11-A03 三種類の印
- Level: A

率 $6$ の Poisson 過程に、独立に印 $j=1,2,3$ を確率 $1/2,1/3,1/6$ で付ける。長さ $2$ の区間に種類3の到着が零件である確率と、種類2の期待件数を求めよ。

<!-- solution-start -->
### 詳細解答

[独立間引きと多種類分割](#thm-sp11-thinning)より種類3の率は $6(1/6)=1$、種類2の率は $6(1/3)=2$ です。区間長 $2$ に対する平均は順に $2$ と $4$ となり、

$$
P(N^{[3]}_2=0)=e^{-2}\frac{2^0}{0!}=e^{-2},
\qquad E[N^{[2]}_2]=2\cdot2=4.
$$

種類2と種類3の件数が独立であることも、独立な印と元の Poisson 件数を混ぜて導いた定理の結論です。
<!-- solution-end -->

#### SP11-A04 保存された最初の一件
- Level: A

率 $4$ の Poisson 過程の各到着を独立に確率 $1/4$ で保存する。最初の保存到着時刻を $S$ とし、$P(S>t)$（$t\ge0$）と $E[S]$ を求めよ。

<!-- solution-start -->
### 詳細解答

保存流は[独立間引きの定理](#thm-sp11-thinning)から率 $4(1/4)=1$ の Poisson 過程です。$S>t$ は保存件数が時刻 $t$ まで零件という事象なので

$$
P(S>t)=P(R_t=0)=e^{-t}.
$$

従って $S$ は率 $1$ の指数分布を持ち、密度は $f_S(s)=e^{-s}$（$s>0$）です。定義から期待値を積分すると

$$
\begin{aligned}
E[S]&=\int_0^\infty s e^{-s}\,ds\\
&=\left[-s e^{-s}\right]_0^\infty
+\int_0^\infty e^{-s}\,ds=0+1=1.
\end{aligned}
$$

境界項が零になるのは $s e^{-s}\to0$（$s\to\infty$）だからです。

元の流の初到着平均 $1/4$ とは異なります。保存されなかった到着は待ち続ける必要があるからです。
<!-- solution-end -->

#### SP11-A05 総件数が決まったとき
- Level: A

率 $\lambda>0$ の Poisson 過程の各到着を独立に確率 $p\in(0,1)$ で保存する。$N_t=4$ と条件付けたとき、保存件数が $2$ となる確率、保存件数の条件付き平均・分散を求めよ。

<!-- solution-start -->
### 詳細解答

$N_t=4$ とすると四回の到着に独立な Bernoulli 印を付けるので、保存件数 $R_t$ は条件付きで二項分布 $\operatorname{Bin}(4,p)$ です。[多種類分割の定理](#thm-sp11-thinning)の $r=2$ の場合であり、

$$
P(R_t=2\mid N_t=4)=\binom42p^2(1-p)^2
=6p^2(1-p)^2.
$$

各保存印を $B_i$ とすると $R_t=\sum_{i=1}^4 B_i$、$E[B_i]=p$、$\operatorname{Var}(B_i)=p(1-p)$。条件付き独立性を用いて

$$
E[R_t\mid N_t=4]=4p,\qquad
\operatorname{Var}(R_t\mid N_t=4)=4p(1-p).
$$

条件付けを外したときの Poisson 平均・分散 $\lambda pt$ とは別の量です。
<!-- solution-end -->

## 7. 演習 Level B：独立性の証明と破れ方

#### SP11-B01 確率母関数で間引きを再構成
- Level: B

率 $\lambda>0$ の Poisson 過程の長さ $h>0$ の区間における到着数を $K$ とする。各到着を独立に確率 $p\in(0,1)$ で赤、残りを青に分類する。赤件数 $R$、青件数 $D$ の同時確率母関数 $E[z^Rw^D]$ を $0\le z,w\le1$ に対して求め、独立性と両率を導け。

<!-- solution-start -->
### 詳細解答

$K=n$ の条件では $n$ 個の印が独立で、一件の印による因子は $pz+(1-p)w$ です。従って

$$
E[z^Rw^D\mid K=n]=(pz+(1-p)w)^n.
$$

$K\sim\operatorname{Poisson}(\lambda h)$ について平均すると

$$
\begin{aligned}
E[z^Rw^D]
&=\sum_{n=0}^\infty
e^{-\lambda h}\frac{(\lambda h)^n}{n!}
(pz+(1-p)w)^n\\
&=\exp\{\lambda h(pz+(1-p)w-1)\}\\
&=\exp\{\lambda hp(z-1)\}
\exp\{\lambda h(1-p)(w-1)\}.
\end{aligned}
$$

最後は赤件数の率 $\lambda ph$ の Poisson 確率母関数と青件数の率 $\lambda(1-p)h$ の Poisson 確率母関数の積です。結合確率母関数の一意性から $R,D$ は独立で、それぞれ平均 $\lambda ph$、$\lambda(1-p)h$ の Poisson 分布に従います。過程全体の独立性には、これに加えて元の流の区間間独立増分と独立な印列を確認する必要があり、[定理の証明](#thm-sp11-thinning)ではその部分も扱っています。
<!-- solution-end -->

#### SP11-B02 二流の競争
- Level: B

率 $\alpha,\beta>0$ の二つの独立な Poisson 過程の初到着時刻を $W_1,W_2$ とし、$W=\min(W_1,W_2)$、初めに来た流を示す番号を $J\in\{1,2\}$ とする。$P(J=1)$、$P(W>t)$ を求め、$J$ と $W$ が独立であることを同時密度から証明せよ。

<!-- solution-start -->
### 詳細解答

$W_1\sim\operatorname{Exp}(\alpha)$、$W_2\sim\operatorname{Exp}(\beta)$ は独立で、同着の確率は $0$ です。[出身印の命題](#prop-sp11-reverse-marking)の証明と同じく、$W$ が時刻 $u>0$ に流1から起こる密度は、流1が $u$ に到着し流2がその時点まで来ない確率を掛けて

$$
f_{W,J}(u,1)=\alpha e^{-\alpha u}e^{-\beta u}
=\alpha e^{-(\alpha+\beta)u}
$$

です。流2は同様に $\beta e^{-(\alpha+\beta)u}$。これを $u\in(0,\infty)$ で積分すると

$$
P(J=1)=\int_0^\infty \alpha e^{-(\alpha+\beta)u}\,du
=\frac{\alpha}{\alpha+\beta}.
$$

両流とも時刻 $t$ まで来ない確率は

$$
P(W>t)=P(W_1>t)P(W_2>t)
=e^{-(\alpha+\beta)t}.
$$

$W$ の密度 $(\alpha+\beta)e^{-(\alpha+\beta)u}$ に $P(J=1)=\alpha/(\alpha+\beta)$ を掛けると $f_{W,J}(u,1)$ に一致します。$J=2$ についても同様です。よって $J$ と $W$ は独立です。
<!-- solution-end -->

#### SP11-B03 一度だけ抽選する失敗
- Level: B

率 $\lambda>0$ の Poisson 過程 $N$ と独立な $B\sim\operatorname{Bernoulli}(p)$（$0<p<1$）を取る。$R_t=BN_t$、$D_t=(1-B)N_t$ とする。$t>0$ における $P(R_t=0)$ と $\operatorname{Cov}(R_t,D_t)$ を求め、「赤と青は独立な率 $\lambda p,\lambda(1-p)$ の Poisson 変数である」という主張がなぜ誤りか説明せよ。

<!-- solution-start -->
### 詳細解答

$\mu=\lambda t>0$ とします。$B=0$ なら $R_t=0$、$B=1$ なら $R_t=N_t$ です。全確率公式から

$$
P(R_t=0)=(1-p)+pP(N_t=0)=(1-p)+pe^{-\mu}.
$$

独立間引きなら零件確率は $e^{-p\mu}$ ですが、厳密な凸性により二つは一致しません。また $R_tD_t=B(1-B)N_t^2=0$ なので $E[R_tD_t]=0$ です。一方 $B$ と $N_t$ の独立性から

$$
E[R_t]=pE[N_t]=p\mu,\qquad
E[D_t]=(1-p)\mu.
$$

したがって

$$
\operatorname{Cov}(R_t,D_t)
=0-p\mu(1-p)\mu
=-p(1-p)\mu^2<0.
$$

独立なら共分散は零なので、分類別件数も独立ではありません。壊れたのは到着ごとに独立な印を付ける条件です。一回だけ振った $B$ を全到着で共有しているため、流の種類に強い依存を導いています。
<!-- solution-end -->

#### SP11-B04 二種類の損失と分散
- Level: B

率 $\lambda>0$ の Poisson 故障過程の各故障が、独立に確率 $q\in(0,1)$ で損失 $1$、確率 $1-q$ で損失 $3$ を生じる。時刻 $t$ までの総損失 $X_t$ を定め、その平均・分散を導き、$X_t$ が普通の Poisson 件数でない理由を示せ。

<!-- solution-start -->
### 詳細解答

各損失を $Y_n$ とすると $Y_n$ は $1,3$ に値を取る独立同分布の印で、$N$ と独立です。$X_t=\sum_{n=1}^{N_t}Y_n$ は[複合 Poisson の定義](#def-sp11-compound-poisson)を満たします。印の一・二次モーメントは

$$
m_1=q\cdot1+(1-q)\cdot3=3-2q,
\qquad
m_2=q\cdot1^2+(1-q)\cdot3^2=9-8q.
$$

[モーメント命題](#prop-sp11-compound-moments)に適用すると

$$
E[X_t]=\lambda t(3-2q),\qquad
\operatorname{Var}(X_t)=\lambda t(9-8q).
$$

$t>0$ なら差は $\lambda t[(9-8q)-(3-2q)]=6\lambda t(1-q)>0$ です。Poisson 分布では平均と分散が等しいので、$X_t$ は Poisson 分布ではありません。さらに損失 $3$ の故障時には $3$ 跳ぶため、単位跳躍という計数過程の条件も失います。
<!-- solution-end -->

## 8. 演習 Level C：条件付きと無条件の独立性をつなぐ

#### SP11-C01 重ね合わせた二窓口の到着記録
- Level: C

独立な率 $2$ と率 $1$ の Poisson 到着流を窓口 A、B とし、その合成流の時刻 $t=2$ までの総件数を $N_2$、第 $k$ 到着時刻を $T_k$、出身窓口の印を $J_k\in\{\mathrm A,\mathrm B\}$ とする。$N_2=3$ という事象を $H$ とし、条件付き確率は $P(H)>0$ のもとで考える。

1. $P(H)$ と $P(J_1=\mathrm A,\ \#\{k\le3:J_k=\mathrm A\}=2\mid H)$ を求めよ。
2. $H$ のもとで $T_2$ の条件付き密度と条件付き平均を導け。
3. $H$ を観測した後の区間 $(2,3]$ において、窓口 A が零件、窓口 B が一件となる条件付き確率を求めよ。
4. $H$ のもとで A 件数と B 件数の共分散を求め、2流が無条件では独立なのに条件付きでは独立でない理由を説明せよ。

<!-- solution-start -->
### 詳細解答

**1. 件数と印の同時条件付き事象。** [重ね合わせの定理](#thm-sp11-superposition)で合成率は $\Lambda=2+1=3$ です。区間長 $2$ の平均は $6$ なので

$$
P(H)=P(N_2=3)=e^{-6}\frac{6^3}{3!}=36e^{-6}>0.
$$

[出身印の命題](#prop-sp11-reverse-marking)により、各印は独立に $P(J_k=\mathrm A)=2/3=:p$、$P(J_k=\mathrm B)=1/3$ です。$H$ と印の列は独立です。要求された事象では第一到着が A で、残る二到着のうちちょうど一つが A です。その配置は $(\mathrm A,\mathrm A,\mathrm B)$ と $(\mathrm A,\mathrm B,\mathrm A)$ の二通りなので

$$
\begin{aligned}
P(J_1=\mathrm A,\ \#\{k\le3:J_k=\mathrm A\}=2\mid H)
&=2p^2(1-p)\\
&=2\left(\frac23\right)^2\frac13=\frac8{27}.
\end{aligned}
$$

**2. 二番目の到着時刻。** [SP10 の条件付き到着時刻定理](../SP10/index.md#prop-sp10-conditional-arrival-times)で $t=2,n=3$ とすると、$H$ の下で $0<T_1<T_2<T_3<2$ の同時密度は $3!/2^3=3/4$ です。$T_2=u$ を固定し、$T_1$ を $(0,u)$、$T_3$ を $(u,2)$ で積分して

$$
\begin{aligned}
f_{T_2\mid H}(u)
&=\int_0^u\int_u^2\frac34\,dv\,dw\\
&=\frac34\,u(2-u),\qquad 0<u<2.
\end{aligned}
$$

ここでは $w=T_1$、$v=T_3$ を積分変数としています。正規化は $\int_0^2(3/4)u(2-u)\,du=1$ です。平均は

$$
\begin{aligned}
E[T_2\mid H]
&=\frac34\int_0^2u^2(2-u)\,du\\
&=\frac34\left[\frac{2u^3}{3}-\frac{u^4}{4}\right]_0^2\\
&=\frac34\left(\frac{16}{3}-4\right)=1.
\end{aligned}
$$

**3. 未来の一時間。** 各窓口は独立な Poisson 過程で、区間 $(2,3]$ の増分はそれ以前の全観測情報と独立です。従って $H$ で条件付けても、未来の A 件数は平均 $2$、B 件数は平均 $1$ の独立 Poisson 変数です。

$$
P(N^{(\mathrm A)}_3-N^{(\mathrm A)}_2=0,\
N^{(\mathrm B)}_3-N^{(\mathrm B)}_2=1\mid H)
=e^{-2}\cdot(1e^{-1})=e^{-3}.
$$

**4. 条件付きで生じる負の相関。** $H$ の下で A の三件中の件数 $R$ は $\operatorname{Bin}(3,2/3)$、B 件数は $D=3-R$ です。二項分布の分散は $3(2/3)(1/3)=2/3$ なので

$$
\operatorname{Cov}(R,D\mid H)
=\operatorname{Cov}(R,3-R\mid H)
=-\operatorname{Var}(R\mid H)=-\frac23.
$$

無条件では[分割の定理](#thm-sp11-thinning)により A・B の流は独立です。しかし $H$ で総件数を $3$ に固定すると、一方が一件増えれば他方は一件減る必要があります。**条件付きの依存と、無条件の独立は異なる主張**であり、矛盾しません。
<!-- solution-end -->

## 9. まとめと次の接続

- [重ね合わせの定理](#thm-sp11-superposition)：互いに独立な Poisson 流は率の和の Poisson 流になります。独立性を落とすと偶数件数の反例が生じます。
- [独立な印付き到着](#def-sp11-independent-marking)と[間引き定理](#thm-sp11-thinning)：到着ごとに独立な印を付けると、各種類は率 $\lambda q_j$ の互いに独立な Poisson 流になります。
- [出身印の命題](#prop-sp11-reverse-marking)：独立な Poisson 流を合成したときも、出身ラベルは率の比の独立な印として戻せます。
- [複合 Poisson 過程](#def-sp11-compound-poisson)：到着数ではなく各印の合計を追うと、独立定常増分は保たれますが、単位跳躍や Poisson 件数分布は通常失われます。
- 印の条件付き多項分布と、無条件の独立 Poisson 分布を混同してはいけません。

次の SP12 では、到着が起きるたびに状態が遷移する連続時間 Markov 連鎖について、滞在時間と遷移先から $Q$ 行列を構成します。ここで使った「指数時計の競争」と「到着ごとの種類」は、その基礎になる考え方です。
